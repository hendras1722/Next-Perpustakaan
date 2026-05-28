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
import { updatePenerbit } from "@/actions/penerbit";
import type { Penerbit } from "@/types";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

interface EditPenerbitModalProps {
	data: Penerbit;
}

export function EditPenerbitModal({ data }: EditPenerbitModalProps) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(updatePenerbit, initialState);

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
					<DialogTitle>Edit Penerbit</DialogTitle>
					<DialogDescription>
						Ubah detail penerbit buku.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<input type="hidden" name="id" value={data.id} />
					
					<div className="space-y-2">
						<label htmlFor={`edit-nama-${data.id}`} className="text-sm font-medium">Nama Penerbit</label>
						<Input id={`edit-nama-${data.id}`} name="penerbit_buku" defaultValue={state?.inputs?.penerbit_buku ?? data.penerbit_buku} required />
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-alamat-${data.id}`} className="text-sm font-medium">Alamat</label>
						<Input id={`edit-alamat-${data.id}`} name="alamat_penerbit" defaultValue={state?.inputs?.alamat_penerbit ?? data.alamat_penerbit} />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor={`edit-telp-${data.id}`} className="text-sm font-medium">Telepon</label>
							<Input id={`edit-telp-${data.id}`} name="telp_penerbit" defaultValue={state?.inputs?.telp_penerbit ?? data.telp_penerbit} />
						</div>
						<div className="space-y-2">
							<label htmlFor={`edit-email-${data.id}`} className="text-sm font-medium">Email</label>
							<Input id={`edit-email-${data.id}`} name="email_penerbit" type="email" defaultValue={state?.inputs?.email_penerbit ?? data.email_penerbit} />
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor={`edit-deskripsi-${data.id}`} className="text-sm font-medium">Deskripsi</label>
						<Input id={`edit-deskripsi-${data.id}`} name="deskripsi" defaultValue={state?.inputs?.deskripsi ?? data.deskripsi} />
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
