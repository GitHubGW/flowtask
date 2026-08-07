import { auth, clerkClient } from "@clerk/nextjs/server";

export const GET = async (request: Request) => {
  const { orgId } = await auth();

  if (!orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userIds =
    new URL(request.url).searchParams
      .get("userIds")
      ?.split(",")
      .filter(Boolean) ?? [];

  const client = await clerkClient();
  const { data } = await client.users.getUserList({
    userId: userIds,
    organizationId: [orgId],
    limit: userIds.length,
  });

  const usersById = new Map(data.map((user) => [user.id, user]));

  const resolvedUsers = userIds.map((userId) => {
    const user = usersById.get(userId);

    if (!user) {
      return { name: "익명", avatar: "" };
    }

    const name = user.firstName ?? user.lastName ?? user.username ?? "익명";
    const avatar = user.imageUrl;

    return { name, avatar };
  });

  return Response.json(resolvedUsers);
};
