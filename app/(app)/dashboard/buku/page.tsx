import { getBuku, deleteBuku } from "@/actions/buku";
import { getJenisBuku } from "@/actions/jenisBuku";
import { getPenulis } from "@/actions/penulis";
import { getPenerbit } from "@/actions/penerbit";
import { Suspense } from "react";
import { AddBukuModal } from "./_components/AddBukuModal";
import { DeleteAction } from "../_components/DeleteAction";
import type { Buku, JenisBuku, Penulis, Penerbit } from "@/types";

async function DataList({ books, categories, authors }: { books: Buku[], categories: JenisBuku[], authors: Penulis[] }) {
	const data = books || [];

	return (
		<div className="border rounded-lg overflow-hidden bg-card">
			<table className="w-full text-sm text-left">
				<thead className="bg-muted/50 text-muted-foreground border-b">
					<tr>
						<th className="px-6 py-3 font-medium">Judul Buku</th>
						<th className="px-6 py-3 font-medium">Jenis</th>
						<th className="px-6 py-3 font-medium">Penulis</th>
						<th className="px-6 py-3 font-medium">Stok</th>
						<th className="px-6 py-3 font-medium text-right">Aksi</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{data.length === 0 ? (
						<tr>
							<td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
								Belum ada data buku.
							</td>
						</tr>
					) : (
						data.map((item: Buku) => {
							const categoryName = categories.find(c => c.id === item.id_kategori_buku)?.jenis_buku;
							const authorName = authors.find(a => a.id === item.id_penulis_buku)?.penulis_buku;
							
							return (
								<tr key={item.id_buku} className="hover:bg-muted/50 transition-colors">
									<td className="px-6 py-4 font-medium">{item.judul_buku}</td>
									<td className="px-6 py-4">{categoryName || item.kategori_buku || item.id_kategori_buku}</td>
									<td className="px-6 py-4">{authorName || item.penulis_buku || item.id_penulis_buku}</td>
									<td className="px-6 py-4">{item.stok_buku}</td>
								<td className="px-6 py-4 text-right flex justify-end gap-2">
									{/* Placeholder for EditBukuModal */}
									<DeleteAction id={item.id_buku} onDelete={deleteBuku} />
								</td>
							</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}

export default async function BukuPage() {
	const [bukuRes, jenisRes, penulisRes, penerbitRes] = await Promise.all([
		getBuku(),
		getJenisBuku(),
		getPenulis(),
		getPenerbit()
	]);

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Buku</h1>
					<p className="text-muted-foreground">Kelola katalog utama buku perpustakaan.</p>
				</div>
				<AddBukuModal 
					categories={jenisRes?.data || []} 
					authors={penulisRes?.data || []} 
					publishers={penerbitRes?.data || []} 
				/>
			</div>

			<Suspense fallback={<div className="py-12 text-center text-muted-foreground border rounded-lg bg-card">Memuat data...</div>}>
				<DataList 
					books={bukuRes?.data || []} 
					categories={jenisRes?.data || []} 
					authors={penulisRes?.data || []} 
				/>
			</Suspense>
		</div>
	);
}
