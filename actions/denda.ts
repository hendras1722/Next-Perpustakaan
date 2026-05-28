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

export async function getDenda() {
	try {
		const res = await fetchApi("/api/v1/admin/denda", {
			next: { tags: ["denda"] },
		});
		return await res.json();
	} catch (error) {
		console.error("Error fetching denda:", error);
		return { error: true, msg: "Failed to fetch data", data: [] };
	}
}

export async function createDenda(prevState: unknown, formData: FormData) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const id_anggota = getUserIdFromToken(token);

	const jumlah_denda = Number(formData.get("jumlah_denda"));
	let tgl_pinjam = formData.get("tgl_pinjam") as string;
	let tgl_hrs_kembali = formData.get("tgl_hrs_kembali") as string;
	let tgl_kembali = formData.get("tgl_kembali") as string;
	const id_peminjaman = formData.get("id_peminjaman") as string;

	const inputs = { jumlah_denda, tgl_pinjam, tgl_hrs_kembali, tgl_kembali, id_peminjaman, id_anggota };

	if (tgl_pinjam && !tgl_pinjam.includes("T")) tgl_pinjam += "T00:00:00Z";
	if (tgl_hrs_kembali && !tgl_hrs_kembali.includes("T")) tgl_hrs_kembali += "T00:00:00Z";
	if (tgl_kembali && !tgl_kembali.includes("T")) tgl_kembali += "T00:00:00Z";

	try {
		const res = await fetchApi("/api/v1/admin/denda/create", {
			method: "POST",
			body: JSON.stringify({ jumlah_denda, tgl_pinjam, tgl_hrs_kembali, tgl_kembali, id_peminjaman, id_anggota }),
		});
		const result = await res.json();

		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to create", inputs };
		}

		revalidatePath("/dashboard/denda");
		return { success: true, message: "Created successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function updateDenda(prevState: unknown, formData: FormData) {
	const id_denda = formData.get("id_denda") as string;

	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;
	const id_anggota = getUserIdFromToken(token);

	const jumlah_denda = Number(formData.get("jumlah_denda"));
	let tgl_pinjam = formData.get("tgl_pinjam") as string;
	let tgl_hrs_kembali = formData.get("tgl_hrs_kembali") as string;
	let tgl_kembali = formData.get("tgl_kembali") as string;
	const id_peminjaman = formData.get("id_peminjaman") as string;

	const inputs = { jumlah_denda, tgl_pinjam, tgl_hrs_kembali, tgl_kembali, id_peminjaman, id_anggota };

	if (tgl_pinjam && !tgl_pinjam.includes("T")) tgl_pinjam += "T00:00:00Z";
	if (tgl_hrs_kembali && !tgl_hrs_kembali.includes("T")) tgl_hrs_kembali += "T00:00:00Z";
	if (tgl_kembali && !tgl_kembali.includes("T")) tgl_kembali += "T00:00:00Z";

	try {
		const res = await fetchApi("/api/v1/admin/denda/update", {
			method: "PUT",
			body: JSON.stringify({ id_denda, jumlah_denda, tgl_pinjam, tgl_hrs_kembali, tgl_kembali, id_peminjaman, id_anggota }),
		});
		const result = await res.json();

		if (!res.ok || result.error) {
			return { success: false, message: result.msg || "Failed to update", inputs };
		}

		revalidatePath("/dashboard/denda");
		return { success: true, message: "Updated successfully" };
	} catch (error) {
		return { success: false, message: "Internal server error", inputs };
	}
}

export async function deleteDenda(id_denda: string) {
	try {
		const res = await fetchApi("/api/v1/admin/denda/delete", {
			method: "DELETE",
			body: JSON.stringify({ id_denda }),
		});
		const result = await res.json();

		if (res.ok && !result.error) {
			revalidatePath("/dashboard/denda");
			return { success: true, message: "Deleted successfully" };
		}
		return { success: false, message: result.msg || "Failed to delete" };
	} catch (error) {
		return { success: false, message: "Internal server error" };
	}
}
