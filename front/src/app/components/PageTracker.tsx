'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // 로그인/회원가입 페이지가 아닌 경우에만 저장
    if (pathname && !pathname.startsWith('/login') && !pathname.startsWith('/register')) {
      localStorage.setItem('petmily_last_visited_page', pathname)
    }
  }, [pathname])

  return null // 이 컴포넌트는 UI를 렌더링하지 않음
}
