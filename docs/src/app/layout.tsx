import type { Metadata, Viewport } from "next"
import { Comfortaa } from "next/font/google"
import "@/globals.css"
import { siteConfig } from "@/config/site"
import { ThemeProvider } from "@/components/theme-provider"
import { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--comfortaa-font-family",
})

export const metadata: Metadata = siteConfig
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body
        className={cn(
          "min-h-screen antialiased font-comfortaa",
          comfortaa.variable
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <div className='relative flex min-h-screen flex-col bg-background'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
