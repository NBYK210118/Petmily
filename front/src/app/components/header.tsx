'use client'

import { useCallback, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { ChevronDown, ShoppingBag, User, Smartphone, Target, Settings, LogOut } from 'lucide-react'

export default function Header() {
  const { isAuthenticated, user, loading, logout } = useAuth()
  const router = useRouter()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesOpen || isUserMenuOpen) {
        setIsServicesOpen(false)
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isServicesOpen, isUserMenuOpen])

  const handleGetToService = useCallback(() => {
    if (isAuthenticated) {
      // 로그인된 상태면 서비스 페이지로 이동 (mall 페이지)
      router.push('/mall')
    } else {
      // 로그인되지 않은 상태면 로그인 페이지로 이동
      router.push('/login')
    }
  }, [isAuthenticated, router])

  const handleLogout = useCallback(() => {
    logout()
    router.push('/')
  }, [logout, router])
  return (
    <header className="w-full fixed top-0 left-0 z-60 bg-slate-300/50 backdrop-blur-md shadow-sm">
      <div className="max-w-[100rem] mx-auto py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Image src="/icons/dog-paw.png" alt="Petmily Logo" width={28} height={28} />
          <Link href="/" className="font-bold text-black text-xl" style={{fontFamily:'Josefin Sans, sans-serif'}}>Petmily</Link>
        </div>

        {/* Center: Navigation */}
        <nav className="md:flex gap-6 text-[18px] font-[10] text-black" style={{fontFamily: 'Inter, sans-serif'}}>
          <Link href="/how-it-works" className="text-lg transition font-bold hover:text-[#C59172]">How it works</Link>
          <Link href="/about" className="text-lg transition font-bold hover:text-[#C59172]">About Us</Link>
          <Link href="/features" className="text-lg transition font-bold hover:text-[#C59172]">Features</Link>
          <Link href="/pricing" className="text-lg transition font-bold hover:text-[#C59172]">Pricing</Link>
          
          {/* Services Dropdown - Only show when authenticated */}
          {isAuthenticated && (
            <div className="relative group">
              <button
                className="text-lg transition font-bold hover:text-[#C59172] flex items-center gap-1"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Services Dropdown Menu */}
              {isServicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link href="/mall" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <ShoppingBag className="h-4 w-4 text-[#C59172]" />
                    Mall
                  </Link>
                  <Link href="/walker" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="h-4 w-4 text-[#C59172]" />
                    Walker
                  </Link>
                  <Link href="/mobile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Smartphone className="h-4 w-4 text-[#C59172]" />
                    Mobile
                  </Link>
                  <Link href="/onboarding" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Target className="h-4 w-4 text-[#C59172]" />
                    Onboarding
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Right: Button + Avatar */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleGetToService}
            disabled={loading}
            className="bg-[#C59172] hover:bg-[#b07a5c] text-white text-sm font-semibold text-[14px] px-4 py-2 mr-5 rounded transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" 
            style={{fontFamily:'Inter, sans-serif'}}
          >
{loading ? 'Loading...' : (isAuthenticated ? 'Go to Mall' : 'Get Started')}
          </button>
          <div className="relative group">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2"
            >
              <Image
                src={user?.avatar || "/images/user_ex.png"}
                alt={user?.name || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-300 hover:border-[#C59172] transition-colors"
              />
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
                  <div className="text-xs text-gray-500">{user?.email || ''}</div>
                </div>
                
                <div className="py-1">
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="h-4 w-4 text-[#C59172]" />
                    프로필
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="h-4 w-4 text-[#C59172]" />
                    설정
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsUserMenuOpen(false)
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut className="h-4 w-4 text-[#C59172]" />
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
