import type { Metadata, Viewport } from "next"
import { Comfortaa } from "next/font/google"
import "@/styles/globals.css"
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
            <main className='flex-1 min-h-[calc(100vh-3.5rem)] before:dark:hidden before:z-50 before:w-72 before:aspect-square before:bg-red-500/50 before:fixed before:left-2 before:top-12 before:blur-[100px] before:rounded-full after:z-50 after:dark:hidden after:w-72 after:aspect-square after:bg-red-500/50 after:fixed after:right-2 after:-bottom-2 after:blur-[100px] after:rounded-full'>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
