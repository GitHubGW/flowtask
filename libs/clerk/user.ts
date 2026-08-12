import { ASSETS } from "@/constants/assets";
import type { User } from "@clerk/nextjs/server";

export const getClerkDisplayName = (user: User) => {
  return user.firstName ?? user.lastName ?? user.username ?? "익명";
};

export const getClerkAvatar = (user: User) => {
  return user.imageUrl ?? ASSETS.DEFAULT_AVATAR;
};
