"use server";

import { fetchApi } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
function getUserIdFromToken(token: string | undefined): string {
	if (!token) return "";
	try {
		const payloadBase64 = token.split(".")[1];
		let base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
		while (base64.length % 4) { base64 += "="; }
		const decoded = JSON.parse(atob(base64));
		return decoded.user_id || "";
	} catch {
		return "";
	}
}

export async function getPeminjaman() {
	try {
		const res = await fetchApi("/api/v1/admin/peminjaman", {
			next: { tags: ["peminjaman"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching peminjaman:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function getDetailPeminjaman(id: string) {
	try {
		const res = await fetchApi(`/api/v1/admin/peminjaman/detail/${id}`, {
			next: { tags: ["peminjaman-detail"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching detail peminjaman:", error);
		return { error: true, msg: "Failed to fetch data", data: null };
	}
}

export async function createPeminjaman(prevState: unknown, formData: FormData) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const id_anggota = getUserIdFromToken(token);

	let tgl_pinjam = formData.get("tgl_pinjam") as string;
	let tgl_hrs_kembali = formData.get("tgl_hrs_kembali") as string;
	const jaminan = formData.get("jaminan") as string;


	if (tgl_pinjam && !tgl_pinjam.includes("T")) tgl_pinjam += "T00:00:00Z";
	if (tgl_hrs_kembali && !tgl_hrs_kembali.includes("T")) tgl_hrs_kembali += "T00:00:00Z";

	const inputs = { id_anggota, tgl_pinjam, tgl_hrs_kembali, jaminan };
	try {
		const res = await fetchApi("/api/v1/admin/peminjaman/create", {
			method: "POST",
			body: JSON.stringify(inputs),
		});
		const result = await res.json();

		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to create", inputs };
		}

		revalidatePath("/dashboard/peminjaman");
		return { success: true, message: "Created successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function updatePeminjaman(prevState: unknown, formData: FormData) {
	const id_peminjaman = formData.get("id_peminjaman") as string;

	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const id_anggota = getUserIdFromToken(token);

	let tgl_pinjam = formData.get("tgl_pinjam") as string;
	let tgl_hrs_kembali = formData.get("tgl_hrs_kembali") as string;
	const jaminan = formData.get("jaminan") as string;

	const inputs = { id_anggota, tgl_pinjam, tgl_hrs_kembali, jaminan };

	if (tgl_pinjam && !tgl_pinjam.includes("T")) tgl_pinjam += "T00:00:00Z";
	if (tgl_hrs_kembali && !tgl_hrs_kembali.includes("T")) tgl_hrs_kembali += "T00:00:00Z";

	try {
		const res = await fetchApi("/api/v1/admin/peminjaman/update", {
			method: "PUT",
			body: JSON.stringify({ id_peminjaman, id_anggota, tgl_pinjam, tgl_hrs_kembali, jaminan }),
		});
		const result = await res.json();

		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to update", inputs };
		}

		revalidatePath("/dashboard/peminjaman");
		return { success: true, message: "Updated successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function deletePeminjaman(id_peminjaman: string) {
	try {
		const res = await fetchApi("/api/v1/admin/peminjaman/delete", {
			method: "DELETE",
			body: JSON.stringify({ id_peminjaman }),
		});
		const result = await res.json();

		if (res.ok && !result.error) {
			revalidatePath("/dashboard/peminjaman");
			return { success: true, message: "Deleted successfully" };
		}
		return { success: false, message: result.msg || "Failed to delete" };
	} catch (error) {
		return { success: false, message: "Internal server error" };
	}
}
