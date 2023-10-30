import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from "react";
import Provider from "@/app/provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Seven Trumpets',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' dark'}>
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  )
}
