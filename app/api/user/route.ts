import { ASSETS } from "@/constants/assets";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { getClerkAvatar, getClerkDisplayName } from "@/libs/clerk/user";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const GET = async (request: Request) => {
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

  const userIds = new URL(request.url).searchParams.get("userIds");
  const userIdsArray = userIds?.split(",").filter(Boolean) ?? [];

  if (userIdsArray.length === 0) {
    return Response.json([]);
  }

  const client = await clerkClient();
  const { data } = await client.users.getUserList({
    userId: userIdsArray,
    organizationId: [orgId],
    limit: userIdsArray.length,
  });

  const usersById = new Map(data.map((user) => [user.id, user]));

  const resolvedUsers = userIdsArray.map((userId) => {
    const user = usersById.get(userId);

    if (!user) {
      return {
        name: "익명",
        avatar: ASSETS.DEFAULT_AVATAR,
      };
    }

    return {
      name: getClerkDisplayName(user),
      avatar: getClerkAvatar(user),
    };
  });

  return Response.json(resolvedUsers);
};
