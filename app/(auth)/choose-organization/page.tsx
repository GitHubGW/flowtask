import { TaskChooseOrganization } from "@clerk/nextjs";
import type { Metadata } from "next";

import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "조직 설정",
};

const ChooseOrganizationPage = () => {
  return (
    <TaskChooseOrganization redirectUrlComplete={ROUTES.WORKFLOWS.INDEX} />
  );
};

export default ChooseOrganizationPage;
