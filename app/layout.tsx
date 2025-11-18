import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Tripzy - Travel Smarter",
  description: "Book buses, hotels, and flights with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <body className="antialiased">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "var(--font-nunito)",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
