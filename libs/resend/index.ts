import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY가 설정되지 않았습니다.");
}

export const resend = new Resend(RESEND_API_KEY);
