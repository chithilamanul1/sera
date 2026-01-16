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
            } else {
                // Production Logic

                // 1. If Next URL is absolute (e.g. https://dash.seranex.org/...), just go there.
                if (next.startsWith('http')) {
                    return NextResponse.redirect(next)
                }

                // 2. Use forwardedHost, BUT explicit protection against localhost in PROD
                if (forwardedHost && !forwardedHost.includes('localhost')) {
                    // Special case: if host is dash.seranex.org, ensure we go there
                    if (forwardedHost.includes('dash.seranex.org')) {
                        return NextResponse.redirect(`https://dash.seranex.org${next}`)
                    }
                    return NextResponse.redirect(`https://${forwardedHost}${next}`)
                }

                // 3. Fallback to main domain OR dashboard if 'next' is dashboard-bound
                if (next.includes('dashboard') || next.includes('owner') || next.includes('admin')) {
                    return NextResponse.redirect(`https://dash.seranex.org${next.startsWith('/') ? next : `/${next}`}`)
                }

                return NextResponse.redirect(`https://seranex.org${next.startsWith('/') ? next : `/${next}`}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
