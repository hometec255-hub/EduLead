import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated, hasAnyRole, getUserRole, logout } from '../services/authService'

function RequireRole({ roles, children }) {
	// Check if user is authenticated with valid token
	if (!isAuthenticated()) {
		// Clear any invalid auth data
		logout()
		return <Navigate to="/login" replace />
	}

	// Check role-based access
	const allowedRoles = Array.isArray(roles) ? roles : [roles]
	if (!hasAnyRole(allowedRoles)) {
		// User doesn't have required role, redirect to appropriate dashboard
		const userRole = getUserRole()
		const roleToPath = {
			student: '/student/applications',
			mentor: '/mentor',
			institution: '/institution',
			admin: '/admin'
		}
		const redirectPath = roleToPath[userRole] || '/'
		return <Navigate to={redirectPath} replace />
	}

	return children
}

export default RequireRole
