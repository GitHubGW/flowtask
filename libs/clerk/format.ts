import type { User } from "@clerk/backend";

export const formatUserName = (user: User) => {
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return fullName || user.username || "Unknown";
};
