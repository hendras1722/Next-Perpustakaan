import { getDenda, deleteDenda } from "@/actions/denda";
import { Suspense } from "react";
import type { Denda } from "@/types";
import { AddDendaModal } from "./_components/AddDendaModal";
import { EditDendaModal } from "./_components/EditDendaModal";
import { DeleteAction } from "../_components/DeleteAction";

async function DataList() {
	const result = await getDenda();
	const data = result.data || [];

	return (
		<div className="border rounded-lg overflow-hidden bg-card">
			<table className="w-full text-sm text-left">
				<thead className="bg-muted/50 text-muted-foreground border-b">
					<tr>
						<th className="px-6 py-3 font-medium">ID Anggota</th>
						<th className="px-6 py-3 font-medium">Jumlah Denda</th>
						<th className="px-6 py-3 font-medium">Tgl Kembali</th>
						<th className="px-6 py-3 font-medium text-right">Aksi</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{data.length === 0 ? (
						<tr>
							<td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
								Belum ada data denda.
							</td>
						</tr>
					) : (
						data.map((item: Denda) => (
							<tr key={item.id_denda} className="hover:bg-muted/50 transition-colors">
								<td className="px-6 py-4 font-medium">{item.id_anggota}</td>
								<td className="px-6 py-4">Rp {item.jumlah_denda.toLocaleString("id-ID")}</td>
								<td className="px-6 py-4">{new Date(item.tgl_kembali).toLocaleDateString("id-ID")}</td>
								<td className="px-6 py-4 text-right flex justify-end gap-2">
									<EditDendaModal data={item} />
									<DeleteAction id={item.id_denda} onDelete={deleteDenda} />
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default function DendaPage() {
	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Denda</h1>
					<p className="text-muted-foreground">Kelola catatan denda keterlambatan.</p>
				</div>
				<AddDendaModal />
			</div>

			<Suspense fallback={<div className="py-12 text-center text-muted-foreground border rounded-lg bg-card">Memuat data...</div>}>
				<DataList />
			</Suspense>
		</div>
	);
}
