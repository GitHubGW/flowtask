import { Stagehand } from "@browserbasehq/stagehand";

export const createStagehandSession = (organizationId: string) => {
  let stagehand: Stagehand | undefined;

  const getStagehand = async () => {
    if (stagehand) {
      return stagehand;
    }

    const BROWSERBASE_API_KEY = process.env.BROWSERBASE_API_KEY;

    if (!BROWSERBASE_API_KEY) {
      throw new Error("BROWSERBASE_API_KEY가 설정되지 않았습니다.");
    }

    stagehand = new Stagehand({
      env: "BROWSERBASE",
      apiKey: BROWSERBASE_API_KEY,
      model: "google/gemini-2.5-flash",
      disablePino: true,
      browserbaseSessionCreateParams: {
        userMetadata: { organizationId },
        browserSettings: { recordSession: true },
      },
    });

    await stagehand.init();
    return stagehand;
  };

  const closeStagehand = async () => {
    await stagehand?.close();
  };

  const getBrowserbaseSessionId = () => {
    return stagehand?.browserbaseSessionID;
  };

  return { getStagehand, closeStagehand, getBrowserbaseSessionId };
};
