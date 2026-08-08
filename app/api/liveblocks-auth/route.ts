import { ERROR_MESSAGES } from "@/constants/error-messages";
import { getClerkAvatar, getClerkDisplayName } from "@/libs/clerk/user";
import { liveblocks } from "@/libs/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";

export const POST = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return new Response(ERROR_MESSAGES.UNAUTHORIZED, { status: 401 });
  }

  const user = await currentUser();

  if (!user) {
    return new Response(ERROR_MESSAGES.UNAUTHORIZED, { status: 401 });
  }

  const { status, body } = await liveblocks.identifyUser(
    { userId, groupIds: [orgId], organizationId: orgId },
    {
      userInfo: {
        name: getClerkDisplayName(user),
        avatar: getClerkAvatar(user),
      },
    }
  );

  return new Response(body, { status });
};
