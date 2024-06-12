import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from '@/src/app/(Frontend)/components/templates/Footer'
import { Top } from '@/src/app/(Frontend)/components/templates/Top'

import { Providers } from './providers'
import '/src/app/(Frontend)/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Login-CMS',
  description: 'Pantallas de login y CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="min-h-screen min-w-screen">
            <div className=" flex flex-col h-screen">
              <Top />
              <main className="flex-1">
                <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                  <div className="flex flex-col min-w-0 break-words w-full mb-6rounded-lg bg-gray-50 dark:bg-slate-800 border-0">
                    {children}
                  </div>
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
