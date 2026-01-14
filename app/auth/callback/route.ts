import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                // Determine target URL logic for local:
                if (next.startsWith('http')) {
                    return NextResponse.redirect(next)
                }
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                if (next.startsWith('http')) {
                    return NextResponse.redirect(next)
                }
                // Default prod redirect to dashboard domain
                return NextResponse.redirect(`https://dash.seranex.org${next.startsWith('/') ? next : `/${next}`}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
