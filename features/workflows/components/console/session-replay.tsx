"use client";

import * as Sentry from "@sentry/nextjs";
import type Hls from "hls.js";
import { useEffect, useRef, useState } from "react";

import { Spinner } from "@/components/ui/spinner";
import { API } from "@/constants/api";
import { WORKFLOW_LOG_EVENTS } from "@/features/workflows/constants/workflow-log-events";

type ReplayStatus = "loading" | "ready" | "error" | "unsupported" | "timeout";

const REPLAY_POLL_INTERVAL_MS = 2000;
const REPLAY_TIMEOUT_MS = 180000;

const replayStatusMessages: Record<ReplayStatus, string> = {
  loading: "리플레이를 준비하고 있어요…",
  ready: "리플레이가 준비됐어요.",
  error: "리플레이를 불러오지 못했어요. 다시 선택해 주세요.",
  unsupported: "현재 브라우저에서는 리플레이를 재생할 수 없어요.",
  timeout:
    "리플레이 준비가 지연되고 있어요. 잠시 후 다시 선택해 주세요.",
};

export const SessionReplay = ({ sessionId }: { sessionId: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<ReplayStatus>("loading");

  const handleLoadedMetadata = () => {
    setStatus("ready");
  };

  const handleError = () => {
    setStatus("error");
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const abortController = new AbortController();
    const pollingStartedAt = Date.now();
    let hlsPlayer: Hls | undefined;
    let playlistObjectUrl: string | undefined;
    let pollTimer: ReturnType<typeof setTimeout> | undefined;

    const attachReplayPlayer = async (playlist: string) => {
      const { default: HlsPlayer } = await import("hls.js");

      if (abortController.signal.aborted) {
        return;
      }

      const supportsHlsPlayer = HlsPlayer.isSupported();
      const supportsNativeHls = Boolean(
        video.canPlayType("application/vnd.apple.mpegurl")
      );

      if (!supportsHlsPlayer && !supportsNativeHls) {
        setStatus("unsupported");
        return;
      }

      playlistObjectUrl = URL.createObjectURL(
        new Blob([playlist], { type: "application/vnd.apple.mpegurl" })
      );

      if (!supportsHlsPlayer) {
        video.src = playlistObjectUrl;
        return;
      }

      hlsPlayer = new HlsPlayer();

      hlsPlayer.on(HlsPlayer.Events.ERROR, (_event, data) => {
        if (!data.fatal || abortController.signal.aborted) {
          return;
        }

        setStatus("error");
        hlsPlayer?.destroy();
      });

      hlsPlayer.loadSource(playlistObjectUrl);
      hlsPlayer.attachMedia(video);
    };

    const loadReplay = async () => {
      try {
        const response = await fetch(
          API.REPLAY_DETAIL(encodeURIComponent(sessionId)),
          { signal: abortController.signal }
        );

        if (abortController.signal.aborted) {
          return;
        }

        const isReplayPending = response.status === 202;
        const hasPollingTimedOut =
          Date.now() - pollingStartedAt >= REPLAY_TIMEOUT_MS;

        if (isReplayPending && hasPollingTimedOut) {
          setStatus("timeout");
          return;
        }

        if (isReplayPending) {
          pollTimer = setTimeout(loadReplay, REPLAY_POLL_INTERVAL_MS);
          return;
        }

        if (!response.ok) {
          setStatus("error");
          return;
        }

        const playlist = await response.text();
        await attachReplayPlayer(playlist);
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        Sentry.logger.warn(WORKFLOW_LOG_EVENTS.REPLAY_REQUEST_FAILED.message, {
          "event.name": WORKFLOW_LOG_EVENTS.REPLAY_REQUEST_FAILED.name,
          "browserbase.session_id": sessionId,
          "error.message":
            error instanceof Error
              ? error.message
              : WORKFLOW_LOG_EVENTS.REPLAY_REQUEST_FAILED.unknownErrorMessage,
        });

        setStatus("error");
      }
    };

    void loadReplay();

    return () => {
      clearTimeout(pollTimer);
      abortController.abort();
      hlsPlayer?.destroy();

      if (playlistObjectUrl) {
        URL.revokeObjectURL(playlistObjectUrl);
      }
    };
  }, [sessionId]);

  return (
    <div className="relative flex size-full min-h-40 items-center justify-center bg-black">
      <video
        ref={videoRef}
        controls
        playsInline
        aria-label="워크플로우 실행 리플레이"
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        className={status === "ready" ? "size-full" : "hidden"}
      />
      {status !== "ready" && (
        <div
          role="status"
          className="flex flex-col items-center gap-2 p-4 text-center text-xs text-zinc-300"
        >
          {status === "loading" && <Spinner className="size-4" />}
          <span>{replayStatusMessages[status]}</span>
        </div>
      )}
    </div>
  );
};
