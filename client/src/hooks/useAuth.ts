'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useState ,useEffect} from 'react'

export default function useAuth(shouldRedirect:boolean) {
  const {status,data:session} = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if(session?.error === 'RefreshAccessTokenError'){
      signOut({callbackUrl:'/signin',redirect:shouldRedirect})
    }
    if(session === null || status !== 'authenticated' || session === undefined){
        router.replace('/signin')
    }
   setIsAuthenticated(true)
  }, [session,status])
  
  return [isAuthenticated,session];
}
