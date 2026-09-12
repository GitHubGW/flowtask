import { SITE } from "@/constants/site";

export const Footer = () => {
  return (
    <footer className="mt-auto border-slate-900/10 py-5 text-center text-base text-slate-900">
      © 2026 {SITE.AUTHOR}. All rights reserved.
    </footer>
  );
};
