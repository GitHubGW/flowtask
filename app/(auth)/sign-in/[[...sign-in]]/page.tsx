import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

const SignInPage = () => {
  return <SignIn />;
};

export default SignInPage;
