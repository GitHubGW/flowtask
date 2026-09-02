import { resend } from "@/libs/resend";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

const FROM_EMAIL = "onboarding@resend.dev";

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
  });

  if (!data || error) {
    throw new Error(error.message || "이메일 전송에 실패했습니다.");
  }

  return {
    success: true,
    message: "이메일 전송에 성공했습니다.",
    id: data.id,
  };
};
