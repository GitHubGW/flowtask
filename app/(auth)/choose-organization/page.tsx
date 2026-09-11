import { ROUTES } from "@/constants/routes";
import { TaskChooseOrganization } from "@clerk/nextjs";

const ChooseOrganizationPage = () => {
  return (
    <TaskChooseOrganization redirectUrlComplete={ROUTES.WORKFLOWS.INDEX} />
  );
};

export default ChooseOrganizationPage;
