"use client";

import { Poppins, Reenie_Beanie } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/CommonComponents/ThemeProvider";
import QueryProvider from "@/QueryProvider";
import SessionProvider from "@/app/SessionProvider";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const reenie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reenie",
});

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const setregisterStepOneData = useAppStore((s) => s.setregisterStepOneData);
  const setregisterPasswordData = useAppStore((s) => s.setregisterPasswordData);

  useEffect(() => {
    const allowedRoutes = ["/auth/new-account", "/auth/create-password"];
    if (!allowedRoutes.includes(pathname)) {
      setregisterStepOneData({ name: "", lastName: "", email: "" });
      setregisterPasswordData({ password: "", confirmPassword: "" });
    }
  }, [pathname, setregisterStepOneData, setregisterPasswordData]);

  return (
    <body className={`${poppins.variable} ${reenie.variable} antialiased`}>
      <ThemeProvider>
        <SessionProvider>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </body>
  );
}
