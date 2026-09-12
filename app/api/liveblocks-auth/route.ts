import { ERROR_MESSAGES } from "@/constants/error-messages";
import { getClerkAvatar, getClerkDisplayName } from "@/libs/clerk/user";
import { liveblocks } from "@/libs/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";

export const POST = async () => {
  const { isAuthenticated, userId, orgId } = await auth();

  if (!isAuthenticated || !userId) {
    return Response.json(
      { error: ERROR_MESSAGES.AUTHENTICATION_REQUIRED },
      { status: 401 }
    );
  }

  if (!orgId) {
    return Response.json(
      { error: ERROR_MESSAGES.ORGANIZATION_REQUIRED },
      { status: 403 }
    );
  }

  const user = await currentUser();

  if (!user) {
    return Response.json(
      { error: ERROR_MESSAGES.USER_NOT_FOUND },
      { status: 401 }
    );
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
