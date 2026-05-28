import { getPeminjaman, deletePeminjaman } from "@/actions/peminjaman";
import { Suspense } from "react";
import type { Peminjaman } from "@/types";
import { AddPeminjamanModal } from "./_components/AddPeminjamanModal";
import { EditPeminjamanModal } from "./_components/EditPeminjamanModal";
import { DetailPeminjamanModal } from "./_components/DetailPeminjamanModal";
import { DeleteAction } from "../_components/DeleteAction";

async function DataList() {
	const result = await getPeminjaman();
	const data = result.data || [];

	return (
		<div className="border rounded-lg overflow-hidden bg-card">
			<table className="w-full text-sm text-left">
				<thead className="bg-muted/50 text-muted-foreground border-b">
					<tr>
						<th className="px-6 py-3 font-medium">ID Anggota</th>
						<th className="px-6 py-3 font-medium">Tgl Pinjam</th>
						<th className="px-6 py-3 font-medium">Tgl Hrs Kembali</th>
						<th className="px-6 py-3 font-medium text-right">Aksi</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{data.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
								Belum ada data peminjaman.
							</td>
						</tr>
					) : (
						data.map((item: Peminjaman) => (
							<tr key={item.id} className="hover:bg-muted/50 transition-colors">
								<td className="px-6 py-4 font-medium">{item.id_anggota}</td>
								<td className="px-6 py-4">{new Date(item.tgl_pinjam).toLocaleDateString("id-ID")}</td>
								<td className="px-6 py-4">{new Date(item.tgl_hrs_kembali).toLocaleDateString("id-ID")}</td>
								<td className="px-6 py-4 text-right flex justify-end gap-2">
									<DetailPeminjamanModal id={item.id} />
									<EditPeminjamanModal data={item} />
									<DeleteAction id={item.id} onDelete={deletePeminjaman} />
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default function PeminjamanPage() {
	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Peminjaman</h1>
					<p className="text-muted-foreground">Kelola catatan peminjaman buku.</p>
				</div>
				<AddPeminjamanModal />
			</div>

			<Suspense fallback={<div className="py-12 text-center text-muted-foreground border rounded-lg bg-card">Memuat data...</div>}>
				<DataList />
			</Suspense>
		</div>
	);
}
