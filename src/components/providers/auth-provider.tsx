'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabaseBrowserClient } from '@/lib/supabase-browser'

type AuthContextValue = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const init = async () => {
      setIsLoading(true)
      const {
        data: { session: currentSession },
      } = await supabaseBrowserClient.auth.getSession()

      if (!mounted) return

      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setIsLoading(false)
    }

    void init()

    const {
      data: { subscription },
    } = supabaseBrowserClient.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true)
    const { error } = await supabaseBrowserClient.auth.signInWithPassword({
      email,
      password,
    })
    setIsLoading(false)
    if (error) {
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    setIsLoading(true)
    const { error } = await supabaseBrowserClient.auth.signUp({
      email,
      password,
    })
    setIsLoading(false)
    if (error) {
      throw error
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    const { error } = await supabaseBrowserClient.auth.signOut()
    setIsLoading(false)
    if (error) {
      throw error
    }
  }

  const getAccessToken = async () => {
    const {
      data: { session: currentSession },
    } = await supabaseBrowserClient.auth.getSession()
    return currentSession?.access_token ?? null
  }

  const value: AuthContextValue = {
    user,
    session,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    getAccessToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

