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

export async function getAllMentorships(status = null) {
	const url = status 
		? `${API_BASE_URL}${MENTORSHIPS_PATH}?status=${encodeURIComponent(status)}`
		: `${API_BASE_URL}${MENTORSHIPS_PATH}`
	
	const response = await fetch(url, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

<<<<<<< HEAD
export async function createMentorship({ student_id, mentor_id, request_message, status }) {
    const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({ student_id, mentor_id, request_message, status })
    })
    return handleJsonResponse(response)
}

export async function updateMentorship({ id, mentor_id, request_message, status }) {
    const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}/${id}`, {
        method: 'PUT',
        headers: getJsonHeaders(),
        body: JSON.stringify({ mentor_id, request_message, status })
    })
    return handleJsonResponse(response)
=======
export async function createMentorship({ student_id, mentor_id, request_message }) {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify({ student_id, mentor_id, request_message })
	})
	return handleJsonResponse(response)
}

export async function updateMentorshipStatus(id, status) {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}/${id}/status`, {
		method: 'PATCH',
		headers: getJsonHeaders(),
		body: JSON.stringify({ status })
	})
	return handleJsonResponse(response)
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
}

export async function deleteMentorship(id) {
	const response = await fetch(`${API_BASE_URL}${MENTORSHIPS_PATH}/${id}`, {
		method: 'DELETE',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

// Student request now uses createMentorship with request_message; keeping no separate endpoint

export default {
	getAllMentorships,
	createMentorship,
<<<<<<< HEAD
	updateMentorship,
    deleteMentorship
}
=======
	updateMentorshipStatus,
	deleteMentorship
}
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
