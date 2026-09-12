import { WORKFLOW_MESSAGES } from "@/features/workflows/constants/workflow-messages";
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
    throw new Error(WORKFLOW_MESSAGES.SEND_EMAIL_FAILED);
  }

  return {
    success: true,
    message: WORKFLOW_MESSAGES.SEND_EMAIL_SUCCESS,
    id: data.id,
  };
};
