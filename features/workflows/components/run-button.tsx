import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const RunButton = () => {
  return (
    <Button size="sm" variant="secondary" onClick={() => {}}>
      <Play fill="primary" />
      Run
    </Button>
  );
};
