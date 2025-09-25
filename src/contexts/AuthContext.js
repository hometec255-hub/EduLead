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
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = () => {
    try {
      if (isAuthenticated()) {
        const userData = getUser()
        setUser(userData)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const hasRole = (role) => {
    return user && user.role === role
  }

  const hasAnyRole = (roles) => {
    return user && roles.includes(user.role)
  }

  const value = {
    user,
    isAuthenticated,
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
