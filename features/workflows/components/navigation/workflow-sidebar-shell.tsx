"use client";

import { Dialog } from "radix-ui";
import type { ComponentProps } from "react";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/libs/utils";

type WorkflowSidebarShellProps = ComponentProps<typeof Sidebar>;

export const WorkflowSidebarShell = ({
  children,
  className,
  side = "left",
  ...props
}: WorkflowSidebarShellProps) => {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (!isMobile) {
    return (
      <Sidebar side={side} className={className} {...props}>
        {children}
      </Sidebar>
    );
  }

  return (
    <Dialog.Root open={openMobile} onOpenChange={setOpenMobile}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px]" />
        <Dialog.Content
          data-slot="sidebar"
          data-mobile="true"
          data-side={side}
          className={cn(
            "fixed inset-y-0 z-50 flex h-svh w-[min(20rem,calc(100vw-3rem))] flex-col bg-sidebar text-sidebar-foreground shadow-xl outline-none",
            side === "left" ? "left-0" : "right-0",
            className
          )}
        >
          <Dialog.Title className="sr-only">워크플로우 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">
            조직과 워크플로우를 선택할 수 있는 메뉴입니다.
          </Dialog.Description>
          <div
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
            className="flex size-full flex-col bg-sidebar"
          >
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
