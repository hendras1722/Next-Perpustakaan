"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { getDetailPeminjaman } from "@/actions/peminjaman";

export function DetailPeminjamanModal({ id }: { id: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const [detail, setDetail] = useState<any>(null);
	const [loading, setLoading] = useState(false);

	const handleOpen = async (open: boolean) => {
		setIsOpen(open);
		if (open && !detail) {
			setLoading(true);
			const res = await getDetailPeminjaman(id);
			if (res && res.data) {
				setDetail(res.data);
			}
			setLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					Detail
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Detail Peminjaman</DialogTitle>
					<DialogDescription>
						Informasi detail mengenai peminjaman ini.
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4 py-4">
					{loading ? (
						<div className="text-center text-muted-foreground py-8">Memuat data...</div>
					) : detail ? (
						<div className="text-sm space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-muted-foreground">ID Anggota</p>
									<p className="font-medium">{detail.id_anggota}</p>
								</div>
								<div>
									<p className="text-muted-foreground">Jaminan</p>
									<p className="font-medium">{detail.jaminan}</p>
								</div>
								<div>
									<p className="text-muted-foreground">Tanggal Pinjam</p>
									<p className="font-medium">{new Date(detail.tgl_pinjam).toLocaleDateString("id-ID")}</p>
								</div>
								<div>
									<p className="text-muted-foreground">Tanggal Harus Kembali</p>
									<p className="font-medium">{new Date(detail.tgl_hrs_kembali).toLocaleDateString("id-ID")}</p>
								</div>
							</div>
							
							<div className="mt-6">
								<p className="text-muted-foreground mb-2">Data Teknis (Raw):</p>
								<div className="p-3 bg-muted rounded-md overflow-x-auto text-xs font-mono">
									<pre>{JSON.stringify(detail, null, 2)}</pre>
								</div>
							</div>
						</div>
					) : (
						<div className="text-center text-red-500 py-8">Gagal memuat detail data.</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
