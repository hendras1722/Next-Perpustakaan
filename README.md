# Aplikasi Next.js Perpustakaan

Aplikasi manajemen perpustakaan (Buku, Jenis Buku, Penerbit) yang dibangun menggunakan [Next.js](https://nextjs.org) (App Router) dan [Bun](https://bun.sh/) sebagai _package manager_ dan _runtime_.

## Implementasi

Proyek ini mengadopsi beberapa pendekatan modern dalam pengembangan aplikasi web:

- **Next.js App Router**: Menggunakan arsitektur App Router terbaru dari Next.js untuk _routing_ yang lebih baik, memanfaatkan Server Components secara _default_ untuk meminimalisir ukuran _bundle_ JavaScript di _client-side_.
- **Server Actions**: Manipulasi data (seperti menambah, mengedit, menghapus buku/jenis buku/penerbit) ditangani menggunakan Server Actions, sehingga tidak perlu membuat rute API (`/api/*`) secara terpisah. Ini memberikan keamanan dan performa yang lebih baik.
- **Komponen UI Modular**: Menggunakan **Radix UI** dipadukan dengan **Tailwind CSS v4** untuk membuat komponen yang *accessible*, fleksibel, dan mudah dikustomisasi (melalui *utility-first classes*).

## 📂 Struktur Halaman

Aplikasi ini dibagi menjadi beberapa _route groups_ utama untuk memudahkan organisasi kode:

- `(public)`: Halaman yang dapat diakses publik.
  - `/buku`: Daftar buku yang tersedia.
- `(auth)`: Halaman otentikasi.
  - Halaman login dan register untuk pengguna.
- `(app)`: Halaman internal / *dashboard* yang memerlukan otentikasi.
  - `/dashboard`: Halaman utama dasbor.
  - `/dashboard/jenis-buku`: Manajemen data jenis buku (CRUD).
  - `/dashboard/penerbit`: Manajemen data penerbit (CRUD).
- `api`: Rute API tradisional (jika ada *endpoint* yang diperlukan di luar Server Actions).

## 🛠️ Teknologi yang Digunakan

- **Framework**: Next.js 16 (App Router)
- **Runtime & Package Manager**: Bun
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Linter & Formatter**: Biome

## 🔗 Repository & Demo

- **Repository**: [https://github.com/hendras1722/Next-Perpustakaan](https://github.com/hendras1722/Next-Perpustakaan)
- **Demo**: [Video Project Perpustakaan](https://drive.google.com/file/d/1evATogHWP8VAv5tJdd_GBgY71hzCHJiP/view?usp=sharing)

---

## Panduan Instalasi (Development)

### Prasyarat

Pastikan Anda telah menginstal [Bun](https://bun.sh/). Jika belum, instal dengan:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Instalasi & Menjalankan Aplikasi

1. Clone repository ini dan masuk ke folder proyek:
   ```bash
   git clone https://github.com/hendras1722/Next-Perpustakaan.git
   cd Next-Perpustakaan/frontend
   ```

2. Instal dependensi menggunakan Bun:
   ```bash
   bun install
   ```

3. (Opsional) Inisialisasi database jika diperlukan:
   ```bash
   bun run db:init
   ```

4. Jalankan *development server*:
   ```bash
   bun run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di *browser* Anda.

### Code Formatting & Linting

Proyek ini menggunakan [Biome](https://biomejs.dev/) untuk linting dan formatting yang sangat cepat.

- Cek linting: `bun run lint`
- Format kode: `bun run format`
