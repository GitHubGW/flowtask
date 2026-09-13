import { TaskChooseOrganization } from "@clerk/nextjs";

import { ROUTES } from "@/constants/routes";

const ChooseOrganizationPage = () => {
  return (
    <TaskChooseOrganization redirectUrlComplete={ROUTES.WORKFLOWS.INDEX} />
  );
};

export default ChooseOrganizationPage;
