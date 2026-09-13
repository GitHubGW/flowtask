import "./globals.css";

import { koKR } from "@clerk/localizations/ko-KR";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { cn } from "@/libs/utils";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    default: SITE.NAME,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("antialiased", pretendard.variable)}
    >
      <body>
        <ClerkProvider
          appearance={{ theme: shadcn }}
          localization={koKR}
          taskUrls={{ "choose-organization": ROUTES.CHOOSE_ORGANIZATION }}
        >
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
