import type { Metadata } from "next"
import { Providers } from "./components/providers"
import { Poppins } from "next/font/google"
import { StarsBackground } from "./components/stars-background"
import "./globals.css"

// Load Poppins font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "Pyramid Game",
  description: "A social ranking game inspired by the Korean drama",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${poppins.variable}`}>
      <body className="antialiased magical-bg min-h-screen flex flex-col items-center justify-center w-full">
        <StarsBackground />
        <div className="w-full max-w-[1920px] mx-auto flex-1 flex flex-col">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
