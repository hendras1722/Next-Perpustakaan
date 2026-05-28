"use server";

import { cookies } from "next/headers";
import { fetchApi } from "@/utils/api";

export async function loginAction(prevState: unknown, formData: FormData) {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	if (!username || !password) {
		return { success: false, message: "Username and password are required" };
	}

	try {
		const res = await fetchApi("/api/v1/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
		});

		const result = await res.json();

		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Invalid credentials" };
		}

		// Save tokens to cookies
		const cookieStore = await cookies();
		const token = result.data.token;
		if (token) {
			cookieStore.set("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
			});
		}

		return { success: true, message: "Login successful" };
	} catch (error) {
		console.error("Login action error:", error);
		return { success: false, message: "Internal server error" };
	}
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("token");
	return { success: true, message: "Logged out successfully" };
}
