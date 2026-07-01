import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataRescue Pro - Expert Data Recovery Services",
  description: "Professional data recovery services for pendrives, HDDs, memory cards, SSDs, RAID arrays, and more. Recover your lost data with our certified experts. Free consultation available.",
  keywords: ["data recovery", "pendrive recovery", "HDD recovery", "memory card recovery", "SSD recovery", "RAID recovery", "file recovery", "deleted file recovery"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "DataRescue Pro - Expert Data Recovery Services",
    description: "Professional data recovery for any storage device. Pendrive, HDD, SSD, Memory Card & more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}