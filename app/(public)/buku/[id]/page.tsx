import { getPublicBukuById } from "@/actions/buku";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function BookDetail({ id }: { id: string }) {
	const result = await getPublicBukuById(id);
	
	if (result.error || !result.data) {
		notFound();
	}
	
	const buku = result.data;

	return (
		<div className="grid md:grid-cols-3 gap-12">
			<div className="md:col-span-1">
				<div className="aspect-[3/4] rounded-xl bg-muted overflow-hidden border shadow-sm relative">
					{buku.gambar_buku ? (
						<img src={buku.gambar_buku} alt={buku.judul_buku} className="object-cover w-full h-full" />
					) : (
						<div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
							No Cover
						</div>
					)}
				</div>
			</div>
			<div className="md:col-span-2 space-y-6">
				<div>
					<h1 className="text-4xl font-bold tracking-tight mb-2">{buku.judul_buku}</h1>
					<p className="text-xl text-muted-foreground">Tahun: {buku.tahun_terbit}</p>
				</div>
				
				<div className="prose dark:prose-invert max-w-none">
					<p>{buku.deskripsi_buku || "Tidak ada deskripsi."}</p>
				</div>
				
				<div className="grid sm:grid-cols-2 gap-4 pt-6 border-t">
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-1">ISBN</h3>
						<p className="font-medium">{buku.isbn}</p>
					</div>
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-1">Stok</h3>
						<p className="font-medium">{buku.stok_buku} Eksemplar</p>
					</div>
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-1">Rak</h3>
						<p className="font-medium">{buku.rak_buku}</p>
					</div>
					<div>
						<h3 className="text-sm font-medium text-muted-foreground mb-1">Kondisi</h3>
						<p className="font-medium">{buku.kondisi_buku || "-"}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default async function DetailBukuPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	
	return (
		<div className="min-h-screen bg-background">
			<header className="border-b px-6 py-4">
				<Link href="/buku" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Kembali ke Katalog
				</Link>
			</header>
			
			<main className="container mx-auto p-6 py-12">
				<Suspense fallback={<div className="py-12 text-center text-muted-foreground">Memuat detail buku...</div>}>
					<BookDetail id={id} />
				</Suspense>
			</main>
		</div>
	);
}
