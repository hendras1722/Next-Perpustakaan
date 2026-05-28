import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	const headers = new Headers(options.headers || {});
	
	// Only set Content-Type if not sending FormData
	if (!(options.body instanceof FormData)) {
		headers.set("Content-Type", "application/json");
	}
	
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	const res = await fetch(`${API_BASE_URL}${endpoint}`, {
		...options,
		headers,
	});

	return res;
}
