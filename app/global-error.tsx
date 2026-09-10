"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";

interface GlobalErrorProps {
  error: Error & { digest?: string };
}

const GlobalError = ({ error }: GlobalErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
};

export default GlobalError;
