'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface AuhtProps{
    children:React.ReactNode
}

export default function NextAuthProvider({children}:AuhtProps) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
