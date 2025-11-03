// Service for users (minimal)
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const USERS_PATH = '/api/users'

function getJsonHeaders() {
	const token = getToken()
	const headers = { 'Content-Type': 'application/json' }
	if (token) headers['Authorization'] = `Bearer ${token}`
	return headers
}

async function handleJsonResponse(response) {
	let data
	try { data = await response.json() } catch (_) { data = null }
	if (!response.ok) {
		const message = data && data.error ? data.error : data && data.message ? data.message : `Request failed (${response.status})`
		const error = new Error(message)
		error.status = response.status
		error.data = data
		throw error
	}
	return data
}

export async function getAllUsers() {
	const response = await fetch(`${API_BASE_URL}${USERS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	// Gracefully handle missing endpoint for some environments
	if (response.status === 404) {
		return []
	}
	return handleJsonResponse(response)
}

export default { getAllUsers }
