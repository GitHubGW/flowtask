import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Spinner className="size-6 text-muted-foreground" />
    </div>
  );
};

export default Loading;
