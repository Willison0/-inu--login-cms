'use client'

import { useTheme } from 'next-themes'

export function Footer() {
  const { resolvedTheme } = useTheme()

  return (
    <footer className="text-gray-900 bg-gray-200 dark:bg-slate-700 dark:text-slate-300">
      <div className="container px-5 md:py-12 mx-auto flex md:items-center md:flex-row md:flex-nowrap flex-wrap flex-col"></div>

      <div className="py-4 flex flex-col md:flex-row space-y-2 md:space-y-0">
        <aside className="flex w-full md:w-1/2 items-center justify-center md:ml-auto text-sm tracking-widest space-x-8"></aside>
      </div>
    </footer>
  )
}
