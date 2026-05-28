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
import { createJenisBuku } from "@/actions/jenisBuku";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function AddJenisBukuModal() {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(createJenisBuku, initialState);

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
					Tambah Jenis Buku
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Tambah Jenis Buku</DialogTitle>
					<DialogDescription>
						Masukkan informasi jenis buku baru ke perpustakaan.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<div className="space-y-2">
						<label htmlFor="jenis_buku" className="text-sm font-medium">Jenis Buku</label>
						<Input id="jenis_buku" name="jenis_buku" defaultValue={state?.inputs?.jenis_buku || ""} required />
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
								"Simpan"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
