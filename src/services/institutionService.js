// Service for institutions CRUD
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const INSTITUTIONS_PATH = '/api/institutions'

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

export async function getAllInstitutions() {
	const response = await fetch(`${API_BASE_URL}${INSTITUTIONS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function getInstitutionById(id) {
	const response = await fetch(`${API_BASE_URL}${INSTITUTIONS_PATH}/${id}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function createInstitution({ name, country, website }) {
	const response = await fetch(`${API_BASE_URL}${INSTITUTIONS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify({ name, country, website })
	})
	return handleJsonResponse(response)
}

export async function updateInstitution({ id, name, country, website }) {
	const response = await fetch(`${API_BASE_URL}${INSTITUTIONS_PATH}/${id}`, {
		method: 'PUT',
		headers: getJsonHeaders(),
		body: JSON.stringify({ name, country, website })
	})
	return handleJsonResponse(response)
}

export async function deleteInstitution(id) {
	const response = await fetch(`${API_BASE_URL}${INSTITUTIONS_PATH}/${id}`, {
		method: 'DELETE',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export default {
	getAllInstitutions,
	getInstitutionById,
	createInstitution,
	updateInstitution,
	deleteInstitution
}
