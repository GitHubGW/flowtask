"use client";

import { Spinner } from "@/components/ui/spinner";
import { API } from "@/constants/api";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import type { ResolveUsersArgs } from "@liveblocks/node";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

interface WorkflowRoomProviderProps {
  children: React.ReactNode;
}

const LIVEBLOCKS_THROTTLE_MS = 16;

const resolveUsers = async ({ userIds }: ResolveUsersArgs) => {
  if (userIds.length === 0) {
    return [];
  }

  const encodedUserIds = encodeURIComponent(userIds.join(","));
  const response = await fetch(`${API.USER}?userIds=${encodedUserIds}`);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.NO_USER_FOUND);
  }

  return response.json();
};

export const WorkflowRoomProvider = ({
  children,
}: WorkflowRoomProviderProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <LiveblocksProvider
      authEndpoint={API.LIVEBLOCKS_AUTH}
      throttle={LIVEBLOCKS_THROTTLE_MS}
      resolveUsers={resolveUsers}
    >
      <RoomProvider id={id}>
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
