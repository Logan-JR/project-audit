import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/layout/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Audit",
  description: "Project Audit UATF",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
