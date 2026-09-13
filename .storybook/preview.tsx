import "../app/globals.css";
import type { Preview } from "@storybook/nextjs-vite";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../app/fonts/PretendardVariable.woff2",
  weight: "45 920",
  variable: "--font-pretendard",
});

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className={`${pretendard.variable} font-sans antialiased`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
