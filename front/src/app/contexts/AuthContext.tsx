'use client'

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  loading: boolean
  redirectAfterAuth: (router: any) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (check localStorage or cookies)
    const savedUser = localStorage.getItem('petmily_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('petmily_user')
      }
    }

    // Check for OAuth token in URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      // Store token and redirect to remove token from URL
      localStorage.setItem('petmily_token', token)
      window.history.replaceState({}, document.title, window.location.pathname)
      
      // You can decode the token here to get user info or make an API call
      // For now, we'll just store the token
      console.log('OAuth token received:', token)
    }

    setLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('petmily_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('petmily_user')
    localStorage.removeItem('petmily_token')
  }

  const redirectAfterAuth = (router: any) => {
    // 가장 최근 방문한 페이지를 확인
    const lastVisitedPage = localStorage.getItem('petmily_last_visited_page')
    
    if (lastVisitedPage && lastVisitedPage !== '/login' && lastVisitedPage !== '/register') {
      // 유효한 페이지로 리다이렉트
      router.push(lastVisitedPage)
    } else {
      // 기본적으로 서비스 페이지로 이동
      router.push('/mall')
    }
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    redirectAfterAuth
  }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
