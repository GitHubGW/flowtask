import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <Spinner
        className="size-6 text-muted-foreground"
        aria-label="워크플로우 로딩 중"
      />
    </div>
  );
};

export default Loading;
