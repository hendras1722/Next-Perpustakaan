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
import { createDenda } from "@/actions/denda";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function AddDendaModal() {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(createDenda, initialState);

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
					Tambah Denda
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Denda</DialogTitle>
					<DialogDescription>
						Masukkan data denda baru.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					{/* ID Anggota di-bypass dari user login */}
					<div className="space-y-2">
						<label htmlFor="id_peminjaman" className="text-sm font-medium">ID Peminjaman</label>
						<Input id="id_peminjaman" name="id_peminjaman" defaultValue={state?.inputs?.id_peminjaman || ""} required />
					</div>
					<div className="space-y-2">
						<label htmlFor="jumlah_denda" className="text-sm font-medium">Jumlah Denda</label>
						<Input id="jumlah_denda" name="jumlah_denda" type="number" defaultValue={state?.inputs?.jumlah_denda || ""} required />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="tgl_pinjam" className="text-sm font-medium">Tgl Pinjam</label>
							<Input id="tgl_pinjam" name="tgl_pinjam" type="date" defaultValue={state?.inputs?.tgl_pinjam || ""} required />
						</div>
						<div className="space-y-2">
							<label htmlFor="tgl_hrs_kembali" className="text-sm font-medium">Batas Kembali</label>
							<Input id="tgl_hrs_kembali" name="tgl_hrs_kembali" type="date" defaultValue={state?.inputs?.tgl_hrs_kembali || ""} required />
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor="tgl_kembali" className="text-sm font-medium">Tanggal Kembali (Riil)</label>
						<Input id="tgl_kembali" name="tgl_kembali" type="date" defaultValue={state?.inputs?.tgl_kembali || ""} required />
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
								"Simpan Denda"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
