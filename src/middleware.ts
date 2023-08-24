import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(request: NextRequest, next: NextRequest) {
  const userNameMaxLenght = 15
  
  const username = request.url.split('/').pop()
  
  if(username && username.length > userNameMaxLenght){
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/user/:path*'
}