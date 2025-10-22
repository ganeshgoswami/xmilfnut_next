import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Handle old video URLs with query parameters
  if (url.pathname.startsWith('/video/') && url.search) {
    const id = url.pathname.split('/')[2];
    const title = url.searchParams.get('title') || '';
    if (id && title) {
      url.pathname = `/video/${id}/${title}`;
      url.search = '';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/video/:path*',
};
