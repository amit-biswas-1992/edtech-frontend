import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Check if accessing via subdomain
  // Pattern: {subdomain}.localhost or {subdomain}.edtech.localhost
  const parts = hostname.split('.');

  if (parts.length >= 2 && parts[0] !== 'www' && parts[0] !== 'localhost') {
    const subdomain = parts[0];

    // Skip known app routes
    const pathname = request.nextUrl.pathname;
    if (
      pathname.startsWith('/auth') ||
      pathname.startsWith('/builder') ||
      pathname.startsWith('/templates') ||
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api') ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    // Rewrite to preview page
    const url = new URL(`/preview/${subdomain}`, request.url);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
