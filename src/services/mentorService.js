<<<<<<< HEAD
import { getToken } from './authService'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

function getJsonHeaders() {
    const token = getToken()
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
}

async function tryFetch(url) {
    try {
        const res = await fetch(url, { headers: getJsonHeaders() })
        if (!res.ok) return { ok: false, status: res.status }
        const data = await res.json().catch(() => null)
        return { ok: true, data: Array.isArray(data) ? data : [] }
    } catch (_) {
        return { ok: false, status: 0 }
    }
}

export async function getAllMentors() {
    // 1) Preferred: dedicated mentors endpoint
    let r = await tryFetch(`${API_BASE_URL}/api/mentors`)
    if (r.ok) return r.data

    // 2) Query users by role if supported by backend
    r = await tryFetch(`${API_BASE_URL}/api/users?role=mentor`)
    if (r.ok) return r.data

    // 3) Fallback to empty array when unavailable
    return []
}

export async function getMentorById(id) {
    const res = await fetch(`${API_BASE_URL}/api/mentors/${id}`, {
        headers: getJsonHeaders()
    })
    return handleJsonResponse(res)
}

function buildJsonResponseError(message, status, data) {
    const err = new Error(message)
    err.status = status
    err.data = data
    return err
}

async function handleJsonResponse(response) {
    let data
    try { data = await response.json() } catch (_) { data = null }
    if (!response.ok) {
        const message = (data && (data.error || data.message)) || `Request failed (${response.status})`
        throw buildJsonResponseError(message, response.status, data)
    }
    return data
}

export async function createMentor({ name, expertise, description, contact_info }) {
    const res = await fetch(`${API_BASE_URL}/api/mentors`, {
        method: 'POST',
        headers: getJsonHeaders(),
        body: JSON.stringify({ name, expertise, description, contact_info })
    })
    return handleJsonResponse(res)
}

export async function updateMentor({ id, name, expertise, description, contact_info }) {
    const res = await fetch(`${API_BASE_URL}/api/mentors/${id}`, {
        method: 'PUT',
        headers: getJsonHeaders(),
        body: JSON.stringify({ name, expertise, description, contact_info })
    })
    return handleJsonResponse(res)
}

export async function deleteMentor(id) {
    const res = await fetch(`${API_BASE_URL}/api/mentors/${id}`, {
        method: 'DELETE',
        headers: getJsonHeaders()
    })
    return handleJsonResponse(res)
}

export default { 
    getAllMentors,
    getMentorById,
    createMentor,
    updateMentor,
    deleteMentor
}


=======
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
>>>>>>> e7557214bff6219c7ae5cdd5af0e24deace49d26
