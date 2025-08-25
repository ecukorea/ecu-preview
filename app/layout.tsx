import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ECU 맛보기",
  description: "빛나는 대학생활을 위한 ECU 맛보기 컨텐츠",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={dmSans.variable}>
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-11D35PTDTR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-11D35PTDTR');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
