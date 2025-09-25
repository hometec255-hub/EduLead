import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function LogoutButton({ children, className = '', style = {} }) {
  const { logout } = useAuth()

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className={className}
      style={style}
    >
      {children || 'Logout'}
    </button>
  )
}

export default LogoutButton
