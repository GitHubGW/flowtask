import { liveblocks } from "@/libs/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";

export const POST = async () => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { status, body } = await liveblocks.identifyUser(
    { userId, groupIds: [orgId], organizationId: orgId },
    {
      userInfo: {
        name: user.firstName ?? user.fullName ?? user.username ?? "익명 사용자",
        avatar: user.imageUrl,
      },
    }
  );

  return new Response(body, { status });
};
