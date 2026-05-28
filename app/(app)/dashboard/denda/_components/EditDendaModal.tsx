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
import { updateDenda } from "@/actions/denda";
import type { Denda } from "@/types";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

interface EditDendaModalProps {
	data: Denda;
}

export function EditDendaModal({ data }: EditDendaModalProps) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(updateDenda, initialState);

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
					<DialogTitle>Edit Denda</DialogTitle>
					<DialogDescription>
						Ubah detail denda buku.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<input type="hidden" name="id_denda" value={data.id_denda} />
					
					{/* ID Anggota di-bypass dari user login */}
					<div className="space-y-2">
						<label htmlFor={`edit-peminjaman-${data.id_denda}`} className="text-sm font-medium">ID Peminjaman</label>
						<Input id={`edit-peminjaman-${data.id_denda}`} name="id_peminjaman" defaultValue={state?.inputs?.id_peminjaman ?? data.id_peminjaman} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-jumlah-${data.id_denda}`} className="text-sm font-medium">Jumlah Denda</label>
						<Input id={`edit-jumlah-${data.id_denda}`} name="jumlah_denda" type="number" defaultValue={state?.inputs?.jumlah_denda ?? data.jumlah_denda} required />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor={`edit-tgl_pinjam-${data.id_denda}`} className="text-sm font-medium">Tgl Pinjam</label>
							<Input id={`edit-tgl_pinjam-${data.id_denda}`} name="tgl_pinjam" type="date" defaultValue={state?.inputs?.tgl_pinjam ?? new Date(data.tgl_pinjam).toISOString().split('T')[0]} required />
						</div>
						<div className="space-y-2">
							<label htmlFor={`edit-tgl_hrs_kembali-${data.id_denda}`} className="text-sm font-medium">Batas Kembali</label>
							<Input id={`edit-tgl_hrs_kembali-${data.id_denda}`} name="tgl_hrs_kembali" type="date" defaultValue={state?.inputs?.tgl_hrs_kembali ?? new Date(data.tgl_hrs_kembali).toISOString().split('T')[0]} required />
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-tgl_kembali-${data.id_denda}`} className="text-sm font-medium">Tanggal Kembali (Riil)</label>
						<Input id={`edit-tgl_kembali-${data.id_denda}`} name="tgl_kembali" type="date" defaultValue={state?.inputs?.tgl_kembali ?? new Date(data.tgl_kembali).toISOString().split('T')[0]} required />
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
