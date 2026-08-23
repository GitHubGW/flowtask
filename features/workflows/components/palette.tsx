import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NodeIcon } from "@/features/workflows/components/node-icon";
import { Section } from "@/features/workflows/components/section";
import {
  nodeRegistry,
  type NodeType,
  type StepNodeType,
} from "@/features/workflows/nodes/node-registry";
import type { StepNodeKind } from "@/features/workflows/types";
import { useReactFlow, useStore } from "@xyflow/react";
import { toast } from "sonner";

const sections: { kind: StepNodeKind; label: string }[] = [
  { kind: "trigger", label: "트리거" },
  { kind: "action", label: "액션" },
];

const definitions = Object.values(nodeRegistry);

export const Palette = () => {
  const { getNodes, getViewport, addNodes } = useReactFlow<StepNodeType>();
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);

  const add = (type: NodeType) => {
    const definition = nodeRegistry[type];
    const nodes = getNodes();
    const hasTrigger = nodes.some((node) => node.data.kind === "trigger");

    if (definition.kind === "trigger" && hasTrigger) {
      toast.error("한 개의 트리거 노드만 추가할 수 있습니다.");
      return;
    }

    const count = nodes.filter((node) => node.data.type === type).length;
    const title = definition.label + (count > 0 ? ` (${count})` : "");
    const { x, y, zoom } = getViewport();
    const position = {
      x: (width / 2 - x) / zoom,
      y: (height / 2 - y) / zoom,
    };

    addNodes({
      id: crypto.randomUUID(),
      type: "step",
      position,
      data: { type, kind: definition.kind, title, values: {} },
    });
  };

  return (
    <Section title="툴바">
      <Accordion
        type="multiple"
        defaultValue={sections.map((s) => s.kind)}
        className="px-3 py-2"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.kind}
            value={section.kind}
            className="not-last:border-b-0"
          >
            <AccordionTrigger className="py-2 text-xs font-medium text-muted-foreground hover:no-underline">
              {section.label}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-0.5">
              {definitions
                .filter((def) => def.kind === section.kind)
                .map((def) => (
                  <Button
                    key={def.type}
                    variant="ghost"
                    onClick={() => add(def.type as NodeType)}
                    className="justify-start gap-2.5 px-1.5 text-xs"
                  >
                    <NodeIcon type={def.type as NodeType} />
                    {def.label}
                  </Button>
                ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};
