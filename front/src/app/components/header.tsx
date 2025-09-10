'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Header() {
  const { isAuthenticated, user, loading, logout } = useAuth()
  const router = useRouter()

  const handleGetToService = () => {
    if (isAuthenticated) {
      // 로그인된 상태면 서비스 페이지로 이동 (mall 페이지)
      router.push('/mall')
    } else {
      // 로그인되지 않은 상태면 로그인 페이지로 이동
      router.push('/login')
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }
  return (
    <header className="w-full fixed top-0 left-0 z-60 bg-slate-300/50 backdrop-blur-md shadow-sm">
      <div className="max-w-[100rem] mx-auto py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/icons/dog-paw.png" alt="Petmily Logo" width={28} height={28} />
          <Link href="/" className="font-bold text-black text-xl" style={{fontFamily:'Josefin Sans, sans-serif'}}>Petmily</Link>
        </div>

        {/* Center: Navigation */}
        <nav className="md:flex gap-25 text-[18px] font-[10] text-black" style={{fontFamily: 'Inter, sans-serif'}}>
          <Link href="/how-it-works" className="text-lg transition font-bold">How it works</Link>
          <Link href="/about" className="text-lg transition font-bold">About Us</Link>
          <Link href="/features" className="text-lg transition font-bold">Features</Link>
          <Link href="/pricing" className="text-lg transition font-bold">Pricing</Link>
        </nav>

        {/* Right: Button + Avatar */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleGetToService}
            disabled={loading}
            className="bg-[#C59172] hover:bg-[#b07a5c] hover:cursor-pointer text-white text-sm font-semibold text-[14px] px-4 py-2 mr-5 rounded transition disabled:opacity-50 disabled:cursor-not-allowed" 
            style={{fontFamily:'Inter, sans-serif'}}
          >
            {loading ? 'Loading...' : 'Get to Service'}
          </button>
          <div className="relative group">
            <Image
              src={user?.avatar || "/images/user_ex.png"}
              alt={user?.name || "User Avatar"}
              width={50}
              height={50}
              className="rounded-full border-none border-white shadow cursor-pointer"
            />
            {isAuthenticated && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  {user?.name || 'User'}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
