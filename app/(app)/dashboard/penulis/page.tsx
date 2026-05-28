import { getPenulis, deletePenulis } from "@/actions/penulis";
import { Suspense } from "react";
import { AddPenulisModal } from "./_components/AddPenulisModal";
import { EditPenulisModal } from "./_components/EditPenulisModal";
import { DeleteAction } from "../_components/DeleteAction";
import { Button } from "@/components/ui/button";
import type { Penulis } from "@/types";

async function DataList() {
	const result = await getPenulis();
	const data = result.data || [];

	return (
		<div className="border rounded-lg overflow-hidden bg-card">
			<table className="w-full text-sm text-left">
				<thead className="bg-muted/50 text-muted-foreground border-b">
					<tr>
						<th className="px-6 py-3 font-medium">Nama Penulis</th>
						<th className="px-6 py-3 font-medium">Email</th>
						<th className="px-6 py-3 font-medium text-right">Aksi</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{data.length === 0 ? (
						<tr>
							<td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
								Belum ada data penulis.
							</td>
						</tr>
					) : (
						data.map((item: Penulis) => (
							<tr key={item.id} className="hover:bg-muted/50 transition-colors">
								<td className="px-6 py-4 font-medium">{item.penulis_buku}</td>
								<td className="px-6 py-4">{item.email_penulis}</td>
								<td className="px-6 py-4 text-right flex justify-end gap-2">
									<EditPenulisModal data={item} />
									<DeleteAction id={item.id} onDelete={deletePenulis} />
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default function PenulisPage() {
	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Penulis</h1>
					<p className="text-muted-foreground">Kelola daftar penulis buku.</p>
				</div>
				<AddPenulisModal />
			</div>

			<Suspense fallback={<div className="py-12 text-center text-muted-foreground border rounded-lg bg-card">Memuat data...</div>}>
				<DataList />
			</Suspense>
		</div>
	);
}
