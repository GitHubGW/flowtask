"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
}

const throttle = 16;
const authEndpoint = "/api/liveblocks-auth";

export const Room = ({ roomId, children }: RoomProps) => {
  return (
    <LiveblocksProvider
      throttle={throttle}
      authEndpoint={authEndpoint}
      resolveUsers={async ({ userIds }) => {
        if (userIds.length === 0) {
          return [];
        }

        const encodedUserIds = encodeURIComponent(userIds.join(","));
        const response = await fetch(`/api/user?userIds=${encodedUserIds}`);

        if (!response.ok) {
          throw new Error("사용자 목록 조회 실패");
        }

        return response.json();
      }}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense
          fallback={
            <div className="flex min-h-svh w-full items-center justify-center">
              <Spinner className="size-6 text-muted-foreground" />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
