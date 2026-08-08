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

interface RoomProps {
  roomId: string;
  children: React.ReactNode;
}

const throttle = 16;

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

export const Room = ({ roomId, children }: RoomProps) => {
  return (
    <LiveblocksProvider
      authEndpoint={API.LIVEBLOCKS_AUTH}
      throttle={throttle}
      resolveUsers={resolveUsers}
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
