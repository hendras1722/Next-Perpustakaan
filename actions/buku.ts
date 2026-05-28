"use server";

import { fetchApi } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function getBuku() {
	try {
		const res = await fetchApi("/api/v1/admin/buku", {
			next: { tags: ["buku"] },
		});
		const result = await res.json();
		return result;
	} catch (error) {
		console.error("Error fetching buku:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function getBukuById(id: string) {
	try {
		const res = await fetchApi(`/api/v1/admin/buku/${id}`, {
			next: { tags: ["buku"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching buku by id:", error);
		return { error: true, msg: "Failed to fetch data", data: null };
	}
}

export async function getPublicBuku() {
	try {
		const res = await fetchApi("/api/v1/buku", {
			next: { tags: ["buku", "public"] },
		});
		const result = await res.json();
		return result;
	} catch (error) {
		console.error("Error fetching public buku:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function getPublicBukuById(id: string) {
	try {
		const res = await fetchApi(`/api/v1/buku/${id}`, {
			next: { tags: ["buku", "public"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching public buku by id:", error);
		return { error: true, msg: "Failed to fetch data", data: null };
	}
}

import { revalidatePath } from "next/cache";

export async function createBuku(prevState: unknown, formData: FormData) {
	const judul_buku = formData.get("judul_buku") as string;
	const id_kategori_buku = formData.get("id_kategori_buku") as string;
	const id_penulis_buku = formData.get("id_penulis_buku") as string;
	const id_penerbit_buku = formData.get("id_penerbit_buku") as string;
	const tahun_terbit = formData.get("tahun_terbit") as string;
	const stok_buku = Number(formData.get("stok_buku"));
	const rak_buku = formData.get("rak_buku") as string;
	const deskripsi_buku = formData.get("deskripsi_buku") as string;
	const isbn = formData.get("isbn") as string;
	const gambar_buku = formData.get("gambar_buku") as string;

	const inputs = { judul_buku, id_kategori_buku, id_penulis_buku, id_penerbit_buku, tahun_terbit, stok_buku, rak_buku, deskripsi_buku, isbn, gambar_buku };

	try {
		const res = await fetchApi("/api/v1/admin/buku/create", {
			method: "POST",
			body: JSON.stringify(inputs),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to create", inputs };
		}
		
		revalidatePath("/dashboard/buku");
		revalidatePath("/buku");
		return { success: true, message: "Created successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function updateBuku(prevState: unknown, formData: FormData) {
	const id = formData.get("id") as string;
	const judul_buku = formData.get("judul_buku") as string;
	const id_kategori_buku = formData.get("id_kategori_buku") as string;
	const id_penulis_buku = formData.get("id_penulis_buku") as string;
	const id_penerbit_buku = formData.get("id_penerbit_buku") as string;
	const tahun_terbit = formData.get("tahun_terbit") as string;
	const stok_buku = Number(formData.get("stok_buku"));
	const rak_buku = formData.get("rak_buku") as string;
	const deskripsi_buku = formData.get("deskripsi_buku") as string;
	const isbn = formData.get("isbn") as string;
	const gambar_buku = formData.get("gambar_buku") as string;

	const inputs = { judul_buku, id_kategori_buku, id_penulis_buku, id_penerbit_buku, tahun_terbit, stok_buku, rak_buku, deskripsi_buku, isbn, gambar_buku };

	try {
		const res = await fetchApi("/api/v1/admin/buku/update", {
			method: "PUT",
			body: JSON.stringify({ id, ...inputs }),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to update", inputs };
		}
		
		revalidatePath("/dashboard/buku");
		revalidatePath("/buku");
		return { success: true, message: "Updated successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function deleteBuku(id: string) {
	try {
		const res = await fetchApi("/api/v1/admin/buku/delete", {
			method: "DELETE",
			body: JSON.stringify({ id }),
		});
		const result = await res.json();
		
		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to delete" };
		}
		
		revalidatePath("/dashboard/buku");
		revalidatePath("/buku");
		return { success: true, message: "Deleted successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error" };
	}
}
