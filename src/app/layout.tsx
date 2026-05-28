import type { Metadata, Viewport } from "next";
import { ViewportScale } from "@/components/shared/ViewportScale";
import { AudioUnlocker } from "@/components/shared/AudioUnlocker";
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
        <div className="desktop-app-shell">
          <ViewportScale />
          <AudioUnlocker />
          {children}
        </div>
        <main className="mobile-device-blocker" aria-label="Desktop browser required">
          <section className="mobile-device-card">
            <div className="mobile-device-mark">Rescue Ducks</div>
            <h1>请用电脑浏览器打开</h1>
            <p>
              Rescue Ducks 目前是 PC 端横屏游戏。为了保证单词光球、拖拽点击和音效体验正常，
              请在电脑上的 Chrome、Edge 或 Safari 中游玩。
            </p>
          </section>
        </main>
      </body>
    </html>
  );
}
