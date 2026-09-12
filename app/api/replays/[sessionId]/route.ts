import { ERROR_MESSAGES } from "@/constants/error-messages";
import { BILLING_PLANS } from "@/constants/billing";
import { WORKFLOW_ERROR_MESSAGES } from "@/features/workflows/constants/workflow-error-messages";
import { browserbase } from "@/libs/browserbase";
import { NotFoundError } from "@browserbasehq/sdk";
import { auth } from "@clerk/nextjs/server";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) => {
  const { isAuthenticated, userId, orgId, has } = await auth();

  if (!isAuthenticated || !userId) {
    return Response.json(
      { error: ERROR_MESSAGES.AUTHENTICATION_REQUIRED },
      { status: 401 }
    );
  }

  if (!orgId) {
    return Response.json(
      { error: ERROR_MESSAGES.ORGANIZATION_REQUIRED },
      { status: 403 }
    );
  }

  if (!has({ plan: BILLING_PLANS.PRO })) {
    return Response.json(
      { error: WORKFLOW_ERROR_MESSAGES.PRO_PLAN_REQUIRED },
      { status: 403 }
    );
  }

  const { sessionId } = await params;

  try {
    const session = await browserbase.sessions.retrieve(sessionId);

    if (session.userMetadata?.organizationId !== orgId) {
      return Response.json(
        { error: ERROR_MESSAGES.UNAUTHORIZED },
        { status: 403 }
      );
    }

    const replay = await browserbase.sessions.replays.retrieve(sessionId);
    const firstPage = replay.pages[0];

    if (!firstPage) {
      return new Response(null, {
        status: 202,
        headers: { "Cache-Control": "private, no-store", "Retry-After": "2" },
      });
    }

    const playlist = await browserbase.sessions.replays.retrievePage(
      sessionId,
      firstPage.pageId
    );

    if (playlist.status === 202) {
      return new Response(null, {
        status: 202,
        headers: { "Cache-Control": "private, no-store", "Retry-After": "2" },
      });
    }

    const m3u8 = await playlist.text();

    return new Response(m3u8, {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": "application/vnd.apple.mpegurl",
      },
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return new Response(null, {
        status: 202,
        headers: { "Cache-Control": "private, no-store", "Retry-After": "2" },
      });
    }

    throw error;
  }
};
