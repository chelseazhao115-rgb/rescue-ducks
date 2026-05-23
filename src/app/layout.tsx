import type { Metadata, Viewport } from "next";
import { ViewportScale } from "@/components/shared/ViewportScale";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rescue Ducks — Light the Lighthouse",
  description:
    "Match IELTS synonyms to generate light energy, relight the lighthouse, and rescue ducks before the storm hits.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ViewportScale />
        {children}
      </body>
    </html>
  );
}
