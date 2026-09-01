import { ASSETS } from "@/constants/assets";
import type { User } from "@clerk/nextjs/server";

export const getClerkDisplayName = (user: User) => {
  const fullName = [user.lastName, user.firstName].filter(Boolean).join(" ");
  return fullName || "익명";
};

export const getClerkAvatar = (user: User) => {
  return user.hasImage ? user.imageUrl : ASSETS.DEFAULT_AVATAR;
};
