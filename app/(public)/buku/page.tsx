import { getPublicBuku } from "@/actions/buku";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import type { Buku } from "@/types";

async function BookList() {
	const result = await getPublicBuku();
	const books = result.data || [];

	if (result.error) {
		return (
			<div className="p-4 bg-destructive/10 text-destructive rounded-lg">
				{result.msg}
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{books.map((buku: Buku, index: number) => (
				<div key={`list-buku-${index}`} className="group relative rounded-xl border bg-card p-4 hover:shadow-lg transition-all duration-300">
					<div className="aspect-[3/4] rounded-lg bg-muted mb-4 overflow-hidden relative">
						{buku.gambar_buku ? (
							<img src={buku.gambar_buku} alt={buku.judul_buku} className="object-cover w-full h-full" />
						) : (
							<div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
								No Cover
							</div>
						)}
					</div>
					<h3 className="font-semibold line-clamp-2 mb-1">{buku.judul_buku}</h3>
					<p className="text-sm text-muted-foreground mb-4">ISBN: {buku.isbn}</p>

					<Link href={`/buku/${buku.id_buku}`}>
						<Button className="w-full" variant="secondary">Lihat Detail</Button>
					</Link>
				</div>
			))}

			{books.length === 0 && (
				<div className="col-span-full py-12 text-center text-muted-foreground">
					Belum ada buku tersedia.
				</div>
			)}
		</div>
	);
}

export default function BukuPage() {
	return (
		<div className="min-h-screen bg-background">
			<header className="border-b px-6 py-4 flex items-center justify-between">
				<h1 className="text-2xl font-bold tracking-tight">Perpustakaan</h1>
				<Link href="/login">
					<Button variant="outline">Login Pegawai</Button>
				</Link>
			</header>

			<main className="container mx-auto p-6">
				<div className="mb-8">
					<h2 className="text-3xl font-bold tracking-tight mb-2">Katalog Buku</h2>
					<p className="text-muted-foreground">Temukan koleksi buku terbaik kami.</p>
				</div>

				<Suspense fallback={<div className="py-12 text-center text-muted-foreground">Memuat data...</div>}>
					<BookList />
				</Suspense>
			</main>
		</div>
	);
}
