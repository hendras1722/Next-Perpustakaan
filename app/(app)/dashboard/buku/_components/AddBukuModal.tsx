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
import { createBuku } from "@/actions/buku";
import type { JenisBuku, Penulis, Penerbit } from "@/types";

const initialState = {
	success: false,
	message: "",
};

interface AddBukuModalProps {
	categories: JenisBuku[];
	authors: Penulis[];
	publishers: Penerbit[];
}

export function AddBukuModal({ categories, authors, publishers }: AddBukuModalProps) {
	const [open, setOpen] = useState(false);
	const [state, formAction, isPending] = useActionState(createBuku, initialState);

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
					Tambah Buku
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Tambah Buku</DialogTitle>
					<DialogDescription>
						Masukkan informasi detail buku baru.
					</DialogDescription>
				</DialogHeader>
				<form action={formAction} className="space-y-4 pt-4">
					<div className="space-y-2">
						<label htmlFor="judul_buku" className="text-sm font-medium">Judul Buku</label>
						<Input id="judul_buku" name="judul_buku" required />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="id_kategori_buku" className="text-sm font-medium">Kategori</label>
							<select 
								id="id_kategori_buku" 
								name="id_kategori_buku" 
								className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								required
							>
								<option value="">Pilih Kategori</option>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.jenis_buku}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label htmlFor="id_penulis_buku" className="text-sm font-medium">Penulis</label>
							<select 
								id="id_penulis_buku" 
								name="id_penulis_buku" 
								className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								required
							>
								<option value="">Pilih Penulis</option>
								{authors.map((author) => (
									<option key={author.id} value={author.id}>
										{author.penulis_buku}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="id_penerbit_buku" className="text-sm font-medium">Penerbit</label>
							<select 
								id="id_penerbit_buku" 
								name="id_penerbit_buku" 
								className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								required
							>
								<option value="">Pilih Penerbit</option>
								{publishers.map((pub) => (
									<option key={pub.id} value={pub.id}>
										{pub.penerbit_buku}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<label htmlFor="tahun_terbit" className="text-sm font-medium">Tahun Terbit</label>
							<Input id="tahun_terbit" name="tahun_terbit" required />
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<label htmlFor="stok_buku" className="text-sm font-medium">Stok</label>
							<Input id="stok_buku" name="stok_buku" type="number" required />
						</div>
						<div className="space-y-2">
							<label htmlFor="rak_buku" className="text-sm font-medium">Rak Buku</label>
							<Input id="rak_buku" name="rak_buku" required />
						</div>
					</div>
					<div className="space-y-2">
						<label htmlFor="deskripsi_buku" className="text-sm font-medium">Deskripsi Buku</label>
						<Input id="deskripsi_buku" name="deskripsi_buku" />
					</div>
					<div className="space-y-2">
						<label htmlFor="isbn" className="text-sm font-medium">ISBN</label>
						<Input id="isbn" name="isbn" />
					</div>
					<div className="space-y-2">
						<label htmlFor="gambar_buku" className="text-sm font-medium">URL Gambar</label>
						<Input id="gambar_buku" name="gambar_buku" />
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
								"Simpan Buku"
							)}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
