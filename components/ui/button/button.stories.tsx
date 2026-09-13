import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "./button";

const variants = [
  "primary",
  "secondary",
  "ghost",
  "destructive",
  "link",
  "brand",
] as const;

const textSizes = ["small", "medium", "large"] as const;

const iconSizes = ["icon-small", "icon-medium", "icon-large"] as const;

const sizes = [...textSizes, ...iconSizes];

const shapes = ["default", "pill"] as const;

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자가 주요 동작을 실행할 때 사용하는 공통 Button 컴포넌트",
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
    shape: {
      control: "select",
      options: shapes,
      description: "모서리 형태",
    },
    fullWidth: {
      control: "boolean",
      description: "부모 요소의 전체 너비 사용 여부",
    },
    asChild: {
      control: false,
    },
  },
  args: {
    children: "버튼",
    variant: "primary",
    size: "medium",
    shape: "default",
    fullWidth: false,
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controls에서 variant, size, shape를 변경해 Button의 형태를 확인할 수 있습니다.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Button이 제공하는 모든 variant의 색상과 강조 수준을 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Button이 제공하는 텍스트 버튼과 아이콘 버튼의 크기를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center gap-3">
        {textSizes.map((size) => (
          <Button key={size} size={size} variant="brand">
            {size}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        {iconSizes.map((size) => (
          <Button key={size} size={size} variant="secondary" aria-label={size}>
            <Plus />
          </Button>
        ))}
      </div>
    </div>
  ),
};

export const Shapes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Button이 제공하는 모서리 형태를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center gap-3">
      {shapes.map((shape) => (
        <Button key={shape} shape={shape} variant="brand">
          {shape}
        </Button>
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
          "동작을 더 명확하게 전달할 수 있도록 아이콘과 함께 사용하는 형태를 보여줍니다.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center gap-3">
      <Button variant="secondary">
        <Plus data-icon="inline-start" />
        노드 추가
      </Button>
      <Button variant="brand" shape="pill">
        시작하기
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button size="icon-medium" variant="destructive" aria-label="삭제">
        <Trash2 />
      </Button>
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Button의 기본 상태와 비활성화 상태를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center gap-3">
      <Button variant="brand">기본</Button>
      <Button variant="brand" disabled>
        비활성화
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "부모 요소의 전체 너비를 사용하는 Button을 보여줍니다.",
      },
    },
  },
  render: () => (
    <div className="w-80">
      <Button fullWidth variant="brand">
        시작하기
      </Button>
    </div>
  ),
};
