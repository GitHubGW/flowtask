import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Check, Sparkles } from "lucide-react";

import { Badge } from "./badge";

const variants = [
  "primary",
  "brand",
  "secondary",
  "success",
  "warning",
  "destructive",
  "outline",
] as const;

const sizes = ["small", "medium", "large"] as const;

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "상태나 유형 등 짧은 정보를 눈에 띄게 표시할 때 사용하는 공통 Badge 컴포넌트",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "유형",
    },
    size: {
      control: "select",
      options: sizes,
      description: "크기",
    },
    asChild: {
      control: false,
    },
  },
  args: {
    children: "배지",
    variant: "primary",
    size: "medium",
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controls에서 variant와 size를 변경해 Badge의 형태를 확인할 수 있습니다.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Badge가 제공하는 모든 variant의 색상과 강조 수준을 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Badge가 제공하는 small, medium, large 크기를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center gap-3">
      {sizes.map((size) => (
        <Badge key={size} size={size} variant="brand">
          {size}
        </Badge>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "상태나 기능을 더 명확하게 전달할 수 있도록 아이콘과 함께 사용하는 형태를 보여줍니다.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center gap-3">
      <Badge variant="success">
        <Check data-icon="inline-start" />
        완료
      </Badge>
      <Badge variant="brand">
        <Sparkles data-icon="inline-start" />
        Pro
      </Badge>
    </div>
  ),
};
