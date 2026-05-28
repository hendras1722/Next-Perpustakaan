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
import { updatePenulis } from "@/actions/penulis";
import type { Penulis } from "@/types";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function EditPenulisModal({ data }: { data: Penulis }) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(updatePenulis, initialState);

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
					<DialogTitle>Edit Penulis</DialogTitle>
					<DialogDescription>
						Ubah informasi penulis buku.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<input type="hidden" name="id" value={data.id} />
					<div className="space-y-2">
						<label htmlFor={`edit-penulis-${data.id}`} className="text-sm font-medium">Nama Penulis</label>
						<Input id={`edit-penulis-${data.id}`} name="penulis_buku" defaultValue={state?.inputs?.penulis_buku ?? data.penulis_buku} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-email-${data.id}`} className="text-sm font-medium">Email Penulis</label>
						<Input id={`edit-email-${data.id}`} type="email" name="email_penulis" defaultValue={state?.inputs?.email_penulis ?? data.email_penulis} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-alamat-${data.id}`} className="text-sm font-medium">Alamat</label>
						<Input id={`edit-alamat-${data.id}`} name="alamat_penulis" defaultValue={data.alamat_penulis} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-deskripsi-${data.id}`} className="text-sm font-medium">Deskripsi</label>
						<Input id={`edit-deskripsi-${data.id}`} name="deskripsi" defaultValue={data.deskripsi} />
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
