// Auth service for registering and logging in users using the backend API

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // e.g., http://localhost:5000
const AUTH_BASE_PATH = "/api/auth"; // final endpoints: /api/auth/register, /api/auth/login

function getJsonHeaders(token) {
	const headers = { "Content-Type": "application/json" };
	if (token) headers["Authorization"] = `Bearer ${token}`;
	return headers;
}

async function handleJsonResponse(response) {
	let data;
	try {
		data = await response.json();
	} catch (_) {
		data = null;
	}
	if (!response.ok) {
		const message = data && data.message ? data.message : `Request failed (${response.status})`;
		const error = new Error(message);
		error.status = response.status;
		error.data = data;
		throw error;
	}
	return data;
}

export async function registerUser({ name, email, password, role }) {
	const url = `${API_BASE_URL}${AUTH_BASE_PATH}/register`;
	const response = await fetch(url, {
		method: "POST",
		headers: getJsonHeaders(),
		body: JSON.stringify({ name, email, password, role })
	});
	return handleJsonResponse(response);
}

export async function loginUser({ email, password }) {
	const url = `${API_BASE_URL}${AUTH_BASE_PATH}/login`;
	const response = await fetch(url, {
		method: "POST",
		headers: getJsonHeaders(),
		body: JSON.stringify({ email, password })
	});
	return handleJsonResponse(response);
}

// Local storage helpers
const TOKEN_KEY = "auth.token";
const USER_KEY = "auth.user";

export function saveAuth(token, user) {
	if (token) localStorage.setItem(TOKEN_KEY, token);
	if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
	const raw = localStorage.getItem(USER_KEY);
	try {
		return raw ? JSON.parse(raw) : null;
	} catch (_) {
		return null;
	}
}

export function clearAuth() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
}

// JWT token validation
export function isTokenValid() {
	const token = getToken();
	if (!token) return false;
	
	try {
		// Decode JWT token to check expiration
		const payload = JSON.parse(atob(token.split('.')[1]));
		const currentTime = Date.now() / 1000;
		return payload.exp > currentTime;
	} catch (error) {
		return false;
	}
}

// Check if user is authenticated
export function isAuthenticated() {
	return getToken() && getUser() && isTokenValid();
}

// Check if user has specific role
export function hasRole(requiredRole) {
	const user = getUser();
	return user && user.role === requiredRole;
}

// Check if user has any of the required roles
export function hasAnyRole(requiredRoles) {
	const user = getUser();
	return user && requiredRoles.includes(user.role);
}

// Get user role
export function getUserRole() {
	const user = getUser();
	return user ? user.role : null;
}

// Logout user
export function logout() {
	clearAuth();
	window.location.href = '/';
}

export default {
	registerUser,
	loginUser,
	saveAuth,
	getToken,
	getUser,
	clearAuth,
	isTokenValid,
	isAuthenticated,
	hasRole,
	hasAnyRole,
	getUserRole,
	logout
};
