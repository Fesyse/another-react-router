import type { Metadata } from "next"
import { Comfortaa } from "next/font/google"
import "@/globals.css"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"

const comfortaa = Comfortaa({ subsets: ["latin"] })

export const metadata: Metadata = siteConfig

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={comfortaa.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
