"use server";

import { fetchApi } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function getJenisBuku(query: string = "") {
	try {
		const res = await fetchApi(`/api/v1/admin/buku/jenbuk${query ? `?q=${query}` : ""}`, {
			next: { tags: ["jenis-buku"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching jenis buku:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function createJenisBuku(prevState: unknown, formData: FormData) {
	const jenis_buku = formData.get("jenis_buku") as string;
	const deskripsi = formData.get("deskripsi") as string;

	const inputs = { jenis_buku, deskripsi };

	try {
		const res = await fetchApi("/api/v1/admin/buku/jenbuk/create", {
			method: "POST",
			body: JSON.stringify(inputs),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to create", inputs };
		}
		
		revalidatePath("/dashboard/jenis-buku");
		return { success: true, message: "Created successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function updateJenisBuku(prevState: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const jenis_buku = formData.get("jenis_buku") as string;
	const deskripsi = formData.get("deskripsi") as string;

	const inputs = { jenis_buku, deskripsi };

	try {
		const res = await fetchApi("/api/v1/admin/buku/jenbuk/update", {
			method: "PUT",
			body: JSON.stringify({ id, ...inputs }),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to update", inputs };
		}
		
		revalidatePath("/dashboard/jenis-buku");
		return { success: true, message: "Updated successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function deleteJenisBuku(id: string) {
	try {
		const res = await fetchApi("/api/v1/admin/buku/jenbuk/delete", {
			method: "DELETE",
			body: JSON.stringify({ id }),
		});
		const result = await res.json();
		
		if (res.ok && !result.error) {
			revalidatePath("/dashboard/jenis-buku");
			return { success: true, message: "Deleted successfully" };
		}
		return { success: false, message: result.msg || "Failed to delete" };
	} catch (error) {
		return { success: false, message: "Internal server error" };
	}
}
