import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const axiosBE = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 5000,
});
