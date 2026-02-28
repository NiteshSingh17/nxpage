import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NxPage",
  description: "NxPage is a tool that helps you create structured JSON instead of full HTML built specifically for AI agents, crawlers, and automation clients.",
  keywords: ["nextjs", "next.js", "nextjs seo", "nextjs performance", "nextjs bot optimization", "nextjs server", "nextjs turbopack", "turbopack compatible", "ssr optimization", "seo optimization", "bot rendering", "search engine optimization", "googlebot", "crawler optimization", "nextjs build tool", "nextjs self hosted", "node server", "static html cache", "nextjs manifest", "nextjs app router", "chatgpt bot optimizer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
