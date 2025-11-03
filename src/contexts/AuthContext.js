import React, { createContext, useContext, useEffect, useState } from 'react'
import { isAuthenticated, getUser, getUserRole, logout } from '../services/authService'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      if (isAuthenticated()) {
        const userData = getUser()
        setUser(userData)
        setIsAuthenticatedState(true)
      } else {
        setUser(null)
        setIsAuthenticatedState(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      setIsAuthenticatedState(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticatedState(true)
  }

  const logoutUser = () => {
    logout()
    setUser(null)
    setIsAuthenticatedState(false)
  }

  const hasRole = (role) => {
    return user && user.role === role
  }

  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role)
  }

  const value = {
    user,
    isAuthenticated: isAuthenticatedState,
    isLoading,
    login,
    logout: logoutUser,
    hasRole,
    hasAnyRole,
    refreshAuth: checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
