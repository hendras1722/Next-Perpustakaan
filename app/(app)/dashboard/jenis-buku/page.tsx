import { getJenisBuku, deleteJenisBuku } from "@/actions/jenisBuku";
import { Suspense } from "react";
import { AddJenisBukuModal } from "./_components/AddJenisBukuModal";
import { EditJenisBukuModal } from "./_components/EditJenisBukuModal";
import { DeleteAction } from "../_components/DeleteAction";
import { Button } from "@/components/ui/button";
import type { JenisBuku } from "@/types";

async function DataList() {
	const result = await getJenisBuku();
	const data = result.data || [];

	return (
		<div className="border rounded-lg overflow-hidden bg-card">
			<table className="w-full text-sm text-left">
				<thead className="bg-muted/50 text-muted-foreground border-b">
					<tr>
						<th className="px-6 py-3 font-medium">Jenis Buku</th>
						<th className="px-6 py-3 font-medium">Deskripsi</th>
						<th className="px-6 py-3 font-medium text-right">Aksi</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{data.length === 0 ? (
						<tr>
							<td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
								Belum ada data jenis buku.
							</td>
						</tr>
					) : (
						data.map((item: JenisBuku) => (
							<tr key={item.id} className="hover:bg-muted/50 transition-colors">
								<td className="px-6 py-4 font-medium">{item.jenis_buku}</td>
								<td className="px-6 py-4">{item.deskripsi}</td>
								<td className="px-6 py-4 text-right flex justify-end gap-2">
									<EditJenisBukuModal data={item} />
									<DeleteAction id={item.id} onDelete={deleteJenisBuku} />
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}

export default function JenisBukuPage() {
	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Jenis Buku</h1>
					<p className="text-muted-foreground">Kelola daftar jenis buku perpustakaan.</p>
				</div>
				<AddJenisBukuModal />
			</div>

			<Suspense fallback={<div className="py-12 text-center text-muted-foreground border rounded-lg bg-card">Memuat data...</div>}>
				<DataList />
			</Suspense>
		</div>
	);
}
