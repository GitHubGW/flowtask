import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원가입",
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
