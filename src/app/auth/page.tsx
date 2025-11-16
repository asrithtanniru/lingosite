'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'

export default function AuthPage() {
  const router = useRouter()
  const { signInWithEmail, signUpWithEmail, isLoading, user } = useAuth()
  const [signupError, setSignupError] = useState<string | null>(null)
  const [signinError, setSigninError] = useState<string | null>(null)

  // Redirect signed-in users to the dashboard via an effect
  useEffect(() => {
    if (!user) return
    router.replace('/dashboard')
  }, [router, user])

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-main border-2 border-border flex items-center justify-center rounded-base">
            <span className="text-main-foreground font-heading text-2xl">L</span>
          </div>
          <span className="text-3xl font-heading tracking-tight">LingoSite</span>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <form
                  className="space-y-4"
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    setSigninError(null)
                    const formData = new FormData(e.currentTarget)
                    const email = String(formData.get('signin-email') || '')
                    const password = String(formData.get('signin-password') || '')
                    try {
                      await signInWithEmail(email, password)
                      router.push('/dashboard')
                    } catch (error) {
                      console.error(error)
                      setSigninError('Failed to sign in. Please check your credentials.')
                    }
                  }}
                >
                  <div className="space-y-2">
                    <label htmlFor="signin-email" className="text-sm font-base">
                      Email
                    </label>
                    <Input
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signin-password" className="text-sm font-base">
                      Password
                    </label>
                    <Input
                      id="signin-password"
                      name="signin-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 border-2 border-border rounded-base" />
                      <span className="font-base">Remember me</span>
                    </label>
                    <a href="#" className="font-base hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  {signinError && (
                    <p className="text-sm text-red-600" role="alert">
                      {signinError}
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                <form
                  className="space-y-4"
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    setSignupError(null)
                    const formData = new FormData(e.currentTarget)
                    const email = String(formData.get('signup-email') || '')
                    const password = String(formData.get('signup-password') || '')
                    const confirm = String(formData.get('signup-confirm') || '')
                    if (password !== confirm) {
                      setSignupError('Passwords do not match.')
                      return
                    }
                    try {
                      await signUpWithEmail(email, password)
                      router.push('/dashboard')
                    } catch (error) {
                      console.error(error)
                      setSignupError('Failed to sign up. Please try again.')
                    }
                  }}
                >
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="text-sm font-base">
                      Full Name
                    </label>
                    <Input
                      id="signup-name"
                      name="signup-name"
                      type="text"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-base">
                      Email
                    </label>
                    <Input
                      id="signup-email"
                      name="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-base">
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      name="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-confirm" className="text-sm font-base">
                      Confirm Password
                    </label>
                    <Input
                      id="signup-confirm"
                      name="signup-confirm"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="text-sm text-foreground/70">
                    By signing up, you agree to our{' '}
                    <a href="#" className="font-base hover:underline">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-base hover:underline">
                      Privacy Policy
                    </a>
                  </div>
                  {signupError && (
                    <p className="text-sm text-red-600" role="alert">
                      {signupError}
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-secondary-background px-4 text-foreground/70 font-base">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="noShadow" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button variant="noShadow" className="w-full">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-foreground/70">
          <Link href="/" className="font-base hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
