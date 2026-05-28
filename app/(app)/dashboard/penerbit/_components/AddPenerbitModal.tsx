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
import { createPenerbit } from "@/actions/penerbit";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function AddPenerbitModal() {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(createPenerbit, initialState);

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
					Tambah Penerbit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Penerbit</DialogTitle>
					<DialogDescription>
						Masukkan detail penerbit buku baru.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<div className="space-y-2">
						<label htmlFor="penerbit_buku" className="text-sm font-medium">Nama Penerbit</label>
						<Input id="penerbit_buku" name="penerbit_buku" defaultValue={state?.inputs?.penerbit_buku || ""} required />
					</div>
					<div className="space-y-2">
						<label htmlFor="alamat_penerbit" className="text-sm font-medium">Alamat</label>
						<Input id="alamat_penerbit" name="alamat_penerbit" defaultValue={state?.inputs?.alamat_penerbit || ""} />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="telp_penerbit" className="text-sm font-medium">Telepon</label>
							<Input id="telp_penerbit" name="telp_penerbit" defaultValue={state?.inputs?.telp_penerbit || ""} />
						</div>
						<div className="space-y-2">
							<label htmlFor="email_penerbit" className="text-sm font-medium">Email</label>
							<Input id="email_penerbit" name="email_penerbit" type="email" defaultValue={state?.inputs?.email_penerbit || ""} />
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor="deskripsi" className="text-sm font-medium">Deskripsi</label>
						<Input id="deskripsi" name="deskripsi" defaultValue={state?.inputs?.deskripsi || ""} />
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
								"Simpan Penerbit"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
