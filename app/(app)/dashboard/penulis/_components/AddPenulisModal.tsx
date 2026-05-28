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
import { createPenulis } from "@/actions/penulis";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function AddPenulisModal() {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(createPenulis, initialState);

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
					Tambah Penulis
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Penulis</DialogTitle>
					<DialogDescription>
						Masukkan informasi penulis buku baru.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<div className="space-y-2">
						<label htmlFor="penulis_buku" className="text-sm font-medium">Nama Penulis</label>
						<Input id="penulis_buku" name="penulis_buku" defaultValue={state?.inputs?.penulis_buku || ""} required />
					</div>
					<div className="space-y-2">
						<label htmlFor="biografi" className="text-sm font-medium">Biografi</label>
						<Input id="biografi" name="biografi" defaultValue={state?.inputs?.biografi || ""} />
					</div>
					<div className="space-y-2">
						<label htmlFor="email_penulis" className="text-sm font-medium">Email</label>
						<Input id="email_penulis" name="email_penulis" type="email" required />
					</div>
					<div className="space-y-2">
						<label htmlFor="alamat_penulis" className="text-sm font-medium">Alamat</label>
						<Input id="alamat_penulis" name="alamat_penulis" required />
					</div>
					<div className="space-y-2">
						<label htmlFor="deskripsi" className="text-sm font-medium">Deskripsi</label>
						<Input id="deskripsi" name="deskripsi" />
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
								"Simpan"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
