import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./textarea";

const variants = ["default", "filled"] as const;

const sizes = ["small", "medium", "large"] as const;

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "사용자가 여러 줄의 텍스트를 입력할 때 사용하는 공통 Textarea 컴포넌트",
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
    variant: "default",
    size: "medium",
    placeholder: "내용을 입력해 주세요.",
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Controls에서 variant와 size를 변경해 Textarea의 형태를 확인할 수 있습니다.",
      },
    },
  },
};

export const Variants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Textarea가 제공하는 모든 variant의 형태를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {variants.map((variant) => (
        <Textarea
          key={variant}
          variant={variant}
          placeholder={variant}
          aria-label={`${variant} Textarea`}
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
        story: "Textarea가 제공하는 small, medium, large 크기를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      {sizes.map((size) => (
        <Textarea
          key={size}
          size={size}
          placeholder={size}
          aria-label={`${size} Textarea`}
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
        story: "Textarea의 기본, 값 입력, 비활성화, 오류 상태를 비교합니다.",
      },
    },
  },
  render: () => (
    <div className="space-y-3">
      <Textarea placeholder="기본" aria-label="기본 Textarea" />
      <Textarea
        defaultValue="여러 줄의 내용을 입력할 수 있어요."
        aria-label="값이 입력된 Textarea"
      />
      <Textarea
        placeholder="비활성화"
        aria-label="비활성화 Textarea"
        disabled
      />
      <Textarea
        defaultValue="올바르지 않은 값"
        aria-label="오류 Textarea"
        aria-invalid
      />
    </div>
  ),
};
