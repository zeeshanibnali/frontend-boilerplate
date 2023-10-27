import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/utils/mui/ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next js Boilerplate",
  description: "This is a boilerplate. Build on top of it in sha Allah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
