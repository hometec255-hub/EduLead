// Service for scholarships CRUD
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const SCHOLARSHIPS_PATH = '/api/scholarships'

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

export async function getAllScholarships() {
	const response = await fetch(`${API_BASE_URL}${SCHOLARSHIPS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function getScholarshipById(id) {
	const response = await fetch(`${API_BASE_URL}${SCHOLARSHIPS_PATH}/${id}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function createScholarship({ 
	title, 
	description, 
	available_amount, 
	rating, 
	students_enrolled, 
	duration, 
	mode, 
	start_date, 
	level, 
	skills 
}) {
	// Convert comma-separated skills string to array
	const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0) : [];
	
	const response = await fetch(`${API_BASE_URL}${SCHOLARSHIPS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify({ 
			title, 
			description, 
			available_amount, 
			rating, 
			students_enrolled, 
			duration, 
			mode, 
			start_date, 
			level, 
			skills: skillsArray
		})
	})
	return handleJsonResponse(response)
}

export async function updateScholarship({ 
	id, 
	title, 
	description, 
	available_amount, 
	rating, 
	students_enrolled, 
	duration, 
	mode, 
	start_date, 
	level, 
	skills 
}) {
	// Convert comma-separated skills string to array
	const skillsArray = skills ? skills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0) : [];
	
	const response = await fetch(`${API_BASE_URL}${SCHOLARSHIPS_PATH}/${id}`, {
		method: 'PUT',
		headers: getJsonHeaders(),
		body: JSON.stringify({ 
			title, 
			description, 
			available_amount, 
			rating, 
			students_enrolled, 
			duration, 
			mode, 
			start_date, 
			level, 
			skills: skillsArray
		})
	})
	return handleJsonResponse(response)
}

export async function deleteScholarship(id) {
	const response = await fetch(`${API_BASE_URL}${SCHOLARSHIPS_PATH}/${id}`, {
		method: 'DELETE',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export default {
	getAllScholarships,
	getScholarshipById,
	createScholarship,
	updateScholarship,
	deleteScholarship
}
