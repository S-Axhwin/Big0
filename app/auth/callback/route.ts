import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  let { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log(user)
  if (user) {
    // Check if the user exists in the profiles table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    console.log(profile)
    if(!profile) {
      return NextResponse.redirect(`${origin}/protected/welcome`)
    }
  }

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}/protected/welcome`)
      } else {
        return NextResponse.redirect(`${origin}/protected/welcome`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
