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
import { updateJenisBuku } from "@/actions/jenisBuku";
import type { JenisBuku } from "@/types";

const initialState: any = {
	success: false,
	message: "",
	inputs: null,
};

export function EditJenisBukuModal({ data }: { data: JenisBuku }) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(updateJenisBuku, initialState);

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
					<DialogTitle>Edit Jenis Buku</DialogTitle>
					<DialogDescription>
						Ubah informasi jenis buku.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<input type="hidden" name="id" value={data.id} />
					<div className="space-y-2">
						<label htmlFor={`edit-jenis-${data.id}`} className="text-sm font-medium">Jenis Buku</label>
						<Input id={`edit-jenis-${data.id}`} name="jenis_buku" defaultValue={state?.inputs?.jenis_buku ?? data.jenis_buku} required />
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
