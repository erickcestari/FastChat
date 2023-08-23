import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, next: NextRequest) {
  const userNameMaxLenght = 35
  
  const username = request.url.split('/').pop()
  
  if(username && username.length > userNameMaxLenght){
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/user/:path*'
}