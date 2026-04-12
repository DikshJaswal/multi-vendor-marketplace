import "./globals.css";
import { ReactNode } from "react";
import Providers from "@/components/Providers";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <ScrollToTop />
          {children}
        </Providers>
      </body>
    </html>
  );
}