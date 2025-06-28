import { NextRequest, NextResponse } from 'next/server';

// Optional matcher paths can be defined later if needed
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Example: simple auth check
  if (pathname.startsWith('/admin')) {
    const isLoggedIn = false; 
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
