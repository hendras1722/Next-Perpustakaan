"use server";

import { fetchApi } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function getPenerbit(query: string = "") {
	try {
		const res = await fetchApi(`/api/v1/admin/buku/penbuk${query ? `?q=${query}` : ""}`, {
			next: { tags: ["penerbit"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching penerbit:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function createPenerbit(prevState: unknown, formData: FormData) {
	const penerbit_buku = formData.get("penerbit_buku") as string;
	const alamat_penerbit = formData.get("alamat_penerbit") as string;
	const telp_penerbit = formData.get("telp_penerbit") as string;
	const email_penerbit = formData.get("email_penerbit") as string;
	const deskripsi = formData.get("deskripsi") as string;
	
	const inputs = { penerbit_buku, alamat_penerbit, telp_penerbit, email_penerbit, deskripsi };

	try {
		const res = await fetchApi("/api/v1/admin/buku/penbuk/create", {
			method: "POST",
			body: JSON.stringify(inputs),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to create", inputs };
		}
		
		revalidatePath("/dashboard/penerbit");
		return { success: true, message: "Created successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function updatePenerbit(prevState: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const penerbit_buku = formData.get("penerbit_buku") as string;
	const alamat_penerbit = formData.get("alamat_penerbit") as string;
	const telp_penerbit = formData.get("telp_penerbit") as string;
	const email_penerbit = formData.get("email_penerbit") as string;
	const deskripsi = formData.get("deskripsi") as string;

	const inputs = { penerbit_buku, alamat_penerbit, telp_penerbit, email_penerbit, deskripsi };

	try {
		const res = await fetchApi("/api/v1/admin/buku/penbuk/update", {
			method: "PUT",
			body: JSON.stringify({ id, ...inputs }),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to update", inputs };
		}
		
		revalidatePath("/dashboard/penerbit");
		return { success: true, message: "Updated successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function deletePenerbit(id: string) {
	try {
		const res = await fetchApi("/api/v1/admin/buku/penbuk/delete", {
			method: "DELETE",
			body: JSON.stringify({ id }),
		});
		const result = await res.json();
		
		if (res.ok && !result.error) {
			revalidatePath("/dashboard/penerbit");
			return { success: true, message: "Deleted successfully" };
		}
		return { success: false, message: result.msg || "Failed to delete" };
	} catch (error) {
		return { success: false, message: "Internal server error" };
	}
}
