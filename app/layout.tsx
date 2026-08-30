import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/libs/utils";
import { ROUTES } from "@/constants/routes";
import localFont from "next/font/local";
const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", pretendard.variable)}
    >
      <body>
        <ClerkProvider
          appearance={{ theme: shadcn }}
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
