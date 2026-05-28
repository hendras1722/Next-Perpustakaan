import { getPenerbit, deletePenerbit } from "@/actions/penerbit";
import { Suspense } from "react";
import type { Penerbit } from "@/types";
import { AddPenerbitModal } from "./_components/AddPenerbitModal";
import { EditPenerbitModal } from "./_components/EditPenerbitModal";
import { DeleteAction } from "../_components/DeleteAction";

async function DataList() {
	const result = await getPenerbit();
	const data = result.data || [];

	return (
		<div className="border rounded-lg overflow-hidden bg-card">
			<table className="w-full text-sm text-left">
				<thead className="bg-muted/50 text-muted-foreground border-b">
					<tr>
						<th className="px-6 py-3 font-medium">Nama Penerbit</th>
						<th className="px-6 py-3 font-medium">Kontak</th>
						<th className="px-6 py-3 font-medium text-right">Aksi</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{data.length === 0 ? (
						<tr>
							<td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
								Belum ada data penerbit.
							</td>
						</tr>
					) : (
						data.map((item: Penerbit) => (
							<tr key={item.id} className="hover:bg-muted/50 transition-colors">
								<td className="px-6 py-4 font-medium">{item.penerbit_buku}</td>
								<td className="px-6 py-4">{item.email_penerbit} / {item.telp_penerbit}</td>
								<td className="px-6 py-4 text-right flex justify-end gap-2">
									<EditPenerbitModal data={item} />
									<DeleteAction id={item.id} onDelete={deletePenerbit} />
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default function PenerbitPage() {
	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Penerbit</h1>
					<p className="text-muted-foreground">Kelola daftar penerbit buku.</p>
				</div>
				<AddPenerbitModal />
			</div>

			<Suspense fallback={<div className="py-12 text-center text-muted-foreground border rounded-lg bg-card">Memuat data...</div>}>
				<DataList />
			</Suspense>
		</div>
	);
}
