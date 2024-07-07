import type { Metadata } from "next";
import Header from "./components/header/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "To do list",
  description: "Test assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-svh flex-col items-center justify-between gap-4">
        <Header />
        {children}
      </body>
    </html>
  );
}
