// Service for students CRUD
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
const STUDENTS_PATH = '/api/students'

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

export async function getAllStudents() {
	const response = await fetch(`${API_BASE_URL}${STUDENTS_PATH}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function getStudentById(id) {
	const response = await fetch(`${API_BASE_URL}${STUDENTS_PATH}/${id}`, {
		method: 'GET',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export async function createStudent({ student_name, date_of_birth, education_level, interests }) {
	const response = await fetch(`${API_BASE_URL}${STUDENTS_PATH}`, {
		method: 'POST',
		headers: getJsonHeaders(),
		body: JSON.stringify({ student_name, date_of_birth, education_level, interests })
	})
	return handleJsonResponse(response)
}

export async function updateStudent({ id, student_name, date_of_birth, education_level, interests }) {
	const response = await fetch(`${API_BASE_URL}${STUDENTS_PATH}/${id}`, {
		method: 'PUT',
		headers: getJsonHeaders(),
		body: JSON.stringify({ student_name, date_of_birth, education_level, interests })
	})
	return handleJsonResponse(response)
}

export async function deleteStudent(id) {
	const response = await fetch(`${API_BASE_URL}${STUDENTS_PATH}/${id}`, {
		method: 'DELETE',
		headers: getJsonHeaders()
	})
	return handleJsonResponse(response)
}

export default {
	getAllStudents,
	getStudentById,
	createStudent,
	updateStudent,
	deleteStudent
}
