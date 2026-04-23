import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/dashboard"]
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"]

export default function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  const hasSession = request.cookies.has("better-auth.session_token")

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:ico|png|jpg|jpeg|svg|webp)$).*)"],
}
