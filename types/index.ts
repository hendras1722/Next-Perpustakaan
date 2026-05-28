
export interface JenBuku {
	id: string;
	jenis_buku: string;
	deskripsi: string;
	updated_at: string;
}

export interface Buku {
	id?: string;
	id_buku: string;
	buku_id?: string;
	judul_buku: string;
	id_kategori_buku: string;
	id_penulis_buku: string;
	id_penerbit_buku: string;
	tahun_terbit: string;
	stok_buku: number;
	rak_buku?: string;
	deskripsi_buku?: string;
	kondisi_buku?: string;
	harga_buku?: number;
	isbn?: string;
	gambar_buku?: string;
	created_at?: string;
	updated_at?: string;
	deleted_at?: string | null;
	kategori_buku?: string;
	penulis_buku?: string;
	penerbit_buku?: string;
}

export interface JenisBuku {
	id: string;
	jenis_buku: string;
	deskripsi: string;
}

export interface Penulis {
	id: string;
	penulis_buku: string;
	alamat_penulis: string;
	email_penulis: string;
	deskripsi: string;
}

export interface Penerbit {
	id: string;
	penerbit_buku: string;
	alamat_penerbit: string;
	telp_penerbit: string;
	email_penerbit: string;
	deskripsi: string;
}

export interface Peminjaman {
	id: string;
	id_anggota: string;
	tgl_pinjam: string;
	tgl_hrs_kembali: string;
	jaminan: string;
}

export interface Denda {
	id_denda: string;
	id_anggota: string;
	id_peminjaman: string;
	jumlah_denda: number;
	tgl_pinjam: string;
	tgl_hrs_kembali: string;
	tgl_kembali: string;
}
