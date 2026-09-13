import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const variants = ["default", "filled"] as const;

const sizes = ["small", "medium", "large"] as const;

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자가 텍스트나 값을 입력할 때 사용하는 공통 Input 컴포넌트",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "유형",
      table: {
        type: { summary: "default | filled" },
      },
    },
    size: {
      control: "select",
      options: sizes,
      description: "크기",
      table: {
        type: { summary: "small | medium | large" },
      },
    },
  },
  args: {
    type: "text",
    variant: "default",
    size: "medium",
    placeholder: "내용을 입력해 주세요.",
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controls에서 variant와 size를 변경해 Input의 형태를 확인할 수 있습니다.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Input이 제공하는 모든 variant의 형태를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {variants.map((variant) => (
        <Input
          key={variant}
          variant={variant}
          placeholder={variant}
          aria-label={`${variant} Input`}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Input이 제공하는 small, medium, large 크기를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {sizes.map((size) => (
        <Input
          key={size}
          size={size}
          placeholder={size}
          aria-label={`${size} Input`}
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Input의 기본, 값 입력, 비활성화, 오류 상태를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      <Input placeholder="기본" aria-label="기본 Input" />
      <Input defaultValue="입력된 값" aria-label="값이 입력된 Input" />
      <Input placeholder="비활성화" aria-label="비활성화 Input" disabled />
      <Input
        defaultValue="올바르지 않은 값"
        aria-label="오류 Input"
        aria-invalid
      />
    </div>
  ),
};
