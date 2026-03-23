import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Skip known hosting domains — these are NOT subdomains
  if (
    hostname.endsWith('.vercel.app') ||
    hostname.endsWith('.netlify.app') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1'
  ) {
    return NextResponse.next();
  }

  // Check if accessing via subdomain on a custom domain
  // Pattern: {subdomain}.yourdomain.com or {subdomain}.localhost
  const parts = hostname.split('.');

  // Need at least 3 parts for subdomain: sub.domain.tld
  // Or 2 parts for localhost: sub.localhost
  const isLocalhost = parts[parts.length - 1] === 'localhost';
  const hasSubdomain = isLocalhost ? parts.length >= 2 : parts.length >= 3;

  if (hasSubdomain && parts[0] !== 'www') {
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
      pathname === '/' ||
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
