// Service for scholarship applications
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const APPLICATIONS_PATH = '/api/applications'

function getJsonHeaders() {
	const token = getToken()
	const headers = { 'Content-Type': 'application/json' }
	if (token) headers['Authorization'] = `Bearer ${token}`
	return headers
}

async function handleJsonResponse(response) {
	let data
	try {
		data = await response.json()
	} catch (_) {
		data = null
	}
	if (!response.ok) {
		const message = data && data.error ? data.error : data && data.message ? data.message : `Request failed (${response.status})`
		const error = new Error(message)
		error.status = response.status
		error.data = data
		throw error
	}
	return data
}

export async function getAllApplications() {
	const response = await fetch(`${API_BASE_URL}${APPLICATIONS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function createApplication({ scholarship_id, student_id, motivation, experience, goals }) {
	const response = await fetch(`${API_BASE_URL}${APPLICATIONS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify({ scholarship_id, student_id, motivation, experience, goals })
	})
	return handleJsonResponse(response)
}

export async function updateApplicationStatus({ id, status }) {
	const response = await fetch(`${API_BASE_URL}${APPLICATIONS_PATH}/${id}`, {
		method: 'PUT',
		headers: getJsonHeaders(),
		body: JSON.stringify({ status })
	})
	return handleJsonResponse(response)
}

export default {
	getAllApplications,
	createApplication,
	updateApplicationStatus
}
