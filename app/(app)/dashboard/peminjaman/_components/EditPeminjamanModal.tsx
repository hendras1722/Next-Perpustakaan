"use client";

import { useState, useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updatePeminjaman } from "@/actions/peminjaman";
import type { Peminjaman } from "@/types";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

interface EditPeminjamanModalProps {
	data: Peminjaman;
}

export function EditPeminjamanModal({ data }: EditPeminjamanModalProps) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(updatePeminjaman, initialState);

	useEffect(() => {
		if (state?.success) {
			setOpen(false);
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm">Edit</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Peminjaman</DialogTitle>
					<DialogDescription>
						Ubah detail peminjaman buku.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<input type="hidden" name="id_peminjaman" value={data.id} />
					
					{/* ID Anggota di-bypass dari user login */}
					<div className="space-y-2">
						<label htmlFor={`edit-pinjam-${data.id}`} className="text-sm font-medium">Tanggal Pinjam</label>
						<Input id={`edit-pinjam-${data.id}`} name="tgl_pinjam" type="date" defaultValue={state?.inputs?.tgl_pinjam ?? new Date(data.tgl_pinjam).toISOString().split('T')[0]} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-kembali-${data.id}`} className="text-sm font-medium">Tanggal Harus Kembali</label>
						<Input id={`edit-kembali-${data.id}`} name="tgl_hrs_kembali" type="date" defaultValue={state?.inputs?.tgl_hrs_kembali ?? new Date(data.tgl_hrs_kembali).toISOString().split('T')[0]} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-jaminan-${data.id}`} className="text-sm font-medium">Jaminan</label>
						<Input id={`edit-jaminan-${data.id}`} name="jaminan" defaultValue={state?.inputs?.jaminan ?? data.jaminan} required />
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
								"Simpan Perubahan"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
