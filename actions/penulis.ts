"use server";

import { fetchApi } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function getPenulis(query: string = "") {
	try {
		const res = await fetchApi(`/api/v1/admin/buku/author${query ? `?q=${query}` : ""}`, {
			next: { tags: ["penulis"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching penulis:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function createPenulis(prevState: unknown, formData: FormData) {
	const penulis_buku = formData.get("penulis_buku") as string;
	const biografi = formData.get("biografi") as string;

	const inputs = { penulis_buku, biografi };

	try {
		const res = await fetchApi("/api/v1/admin/buku/penulis/create", {
			method: "POST",
			body: JSON.stringify(inputs),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to create", inputs };
		}
		
		revalidatePath("/dashboard/penulis");
		return { success: true, message: "Created successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function updatePenulis(prevState: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const penulis_buku = formData.get("penulis_buku") as string;
	const biografi = formData.get("biografi") as string;

	const inputs = { penulis_buku, biografi };

	try {
		const res = await fetchApi("/api/v1/admin/buku/penulis/update", {
			method: "PUT",
			body: JSON.stringify({ id, ...inputs }),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to update", inputs };
		}
		
		revalidatePath("/dashboard/penulis");
		return { success: true, message: "Updated successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function deletePenulis(id: string) {
	try {
		const res = await fetchApi("/api/v1/admin/buku/author/delete", {
			method: "DELETE",
			body: JSON.stringify({ id }),
		});
		const result = await res.json();
		
		if (res.ok && !result.error) {
			revalidatePath("/dashboard/penulis");
			return { success: true, message: "Deleted successfully" };
		}
		return { success: false, message: result.msg || "Failed to delete" };
	} catch (error) {
		return { success: false, message: "Internal server error" };
	}
}
