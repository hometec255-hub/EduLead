import { isAuthenticated, logout, getToken } from '../services/authService'

// Global API interceptor for handling authentication
export function setupApiInterceptor() {
  // Store original fetch
  const originalFetch = window.fetch

  // Override fetch with authentication handling
  window.fetch = async (url, options = {}) => {
    // Add authorization header if user is authenticated
    if (isAuthenticated()) {
      const token = getToken()
      if (token) {
        options.headers = {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        }
      }
    }

    try {
      const response = await originalFetch(url, options)
      
      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        console.warn('Unauthorized access detected, logging out user')
        logout()
        return response
      }

      // Handle 403 Forbidden responses
      if (response.status === 403) {
        console.warn('Access forbidden, user may not have required permissions')
        // Don't logout on 403, just return the response
        return response
      }

      return response
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }
}

// Initialize the interceptor
setupApiInterceptor()
