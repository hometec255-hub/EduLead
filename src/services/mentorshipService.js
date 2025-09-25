// Service for mentorships
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const MENTORSHIPS_PATH = '/api/mentorships'

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

export async function getAllMentorships() {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function createMentorship({ student_id, topic, description, start_date, end_date }) {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify({ student_id, topic, description, start_date, end_date })
	})
	return handleJsonResponse(response)
}

export async function updateMentorship({ id, topic, description, start_date, end_date }) {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}/${id}`, {
		method: 'PUT',
		headers: getJsonHeaders(),
		body: JSON.stringify({ topic, description, start_date, end_date })
	})
	return handleJsonResponse(response)
}

export async function deleteMentorship(id) {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}/${id}`, {
		method: 'DELETE',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export default {
	getAllMentorships,
	createMentorship,
	updateMentorship,
	deleteMentorship
}
