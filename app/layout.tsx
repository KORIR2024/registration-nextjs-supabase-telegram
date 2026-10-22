import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register for an account securely and quickly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
