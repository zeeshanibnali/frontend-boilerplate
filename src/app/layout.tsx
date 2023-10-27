"use client";

import { useEffect, useMemo } from "react";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/utils/mui/ThemeRegistry";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTranslation } from "react-i18next";

import "./globals.css";
import initializeI18N from "@/utils/i18n";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Next js Boilerplate",
//   description: "This is a boilerplate. Build on top of it in sha Allah",
// };

const queryClient = new QueryClient();
initializeI18N();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const direction = useMemo(
    () => (i18n.language?.startsWith("ar") ? "rtl" : "ltr"),
    [i18n.language],
  );

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      document.documentElement.setAttribute("lang", lng);
    });
  }, [i18n]);

  return (
    <html lang="ar">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body
        style={{
          direction: direction,
        }}
        className={inter.className}
      >
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
