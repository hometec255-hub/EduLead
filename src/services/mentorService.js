// Service for mentors
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const MENTORS_PATH = '/api/mentors'

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

export async function getAllMentors() {
	const response = await fetch(`${API_BASE_URL}${MENTORS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function getMentorById(id) {
	const response = await fetch(`${API_BASE_URL}${MENTORS_PATH}/${id}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function createMentor(mentorData) {
	const response = await fetch(`${API_BASE_URL}${MENTORS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify(mentorData)
	})
	return handleJsonResponse(response)
}

export async function updateMentor(id, mentorData) {
	const response = await fetch(`${API_BASE_URL}${MENTORS_PATH}/${id}`, {
		method: 'PUT',
		headers: getJsonHeaders(),
		body: JSON.stringify(mentorData)
	})
	return handleJsonResponse(response)
}

export async function deleteMentor(id) {
	const response = await fetch(`${API_BASE_URL}${MENTORS_PATH}/${id}`, {
		method: 'DELETE',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export default {
	getAllMentors,
	getMentorById,
	createMentor,
	updateMentor,
	deleteMentor
}
