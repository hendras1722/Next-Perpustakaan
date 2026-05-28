"use client";

import { useState, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createPeminjaman } from "@/actions/peminjaman";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function AddPeminjamanModal() {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(createPeminjaman, initialState);

	useEffect(() => {
		if (state?.success) {
			setOpen(false);
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Tambah Peminjaman
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Peminjaman</DialogTitle>
					<DialogDescription>
						Masukkan detail peminjaman buku baru.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					{/* ID Anggota di-bypass dari user login */}
					<div className="space-y-2">
						<label htmlFor="tgl_pinjam" className="text-sm font-medium">Tanggal Pinjam</label>
						<Input id="tgl_pinjam" name="tgl_pinjam" type="date" defaultValue={state?.inputs?.tgl_pinjam || ""} required />
					</div>
					<div className="space-y-2">
						<label htmlFor="tgl_hrs_kembali" className="text-sm font-medium">Tanggal Harus Kembali</label>
						<Input id="tgl_hrs_kembali" name="tgl_hrs_kembali" type="date" defaultValue={state?.inputs?.tgl_hrs_kembali || ""} required />
					</div>
					<div className="space-y-2">
						<label htmlFor="jaminan" className="text-sm font-medium">Jaminan</label>
						<Input id="jaminan" name="jaminan" defaultValue={state?.inputs?.jaminan || ""} required />
					</div>

					{!state?.success && state?.message && (
						<div className="text-sm text-destructive font-medium bg-destructive/10 p-3 rounded-md">
							{state.message}
						</div>
					)}

					<div className="flex justify-end pt-4">
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Menyimpan...
								</>
							) : (
								"Simpan Peminjaman"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
