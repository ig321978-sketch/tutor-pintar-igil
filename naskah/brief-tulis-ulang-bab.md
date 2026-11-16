# Brief baku: tulis ulang tahap SMISCPA dengan naskah orisinal IGIL

Berlaku untuk Kelas 4 sampai 6 (pilot: Kelas 4 Bab 1 Sub-Bab A). Struktur bab, urutan sub-bab, topik, capaian, tingkat kesulitan, dan rentang angka TETAP. Yang diganti: cerita, dialog, soal, konteks, tokoh, dan ilustrasi.

## Standar
1. Buku resmi (`bahan-sd/`, ekstrak di `sumber/ekstrak/`, indeks `sumber/indeks.json`) hanya ACUAN untuk topik dan rentang angka. Baca ekstrak per bab, jangan PDF utuh. Dilarang menyalin atau memparafrasakan dekat kalimat, soal, atau angka contoh buku. Ubah juga konteks dan angka contoh.
2. Tokoh HANYA Malosi, Kira, Upe, Wei, Halim, Igil, tanpa gelar "Pak/Bu/Ibu". Tanpa kerja kelompok, kelas, buku, teman. Tanpa benda fisik nyata (ganti aksi digital). Suara atau narasi tanpa digit (angka dieja). Kalimat pendek. Video: lebih banyak gambar daripada teks. Emoji paling tinggi U+1FA95. Nama Inggris metode jangan dipakai. Narasi tidak menyebut "buku".
3. Pola Story baru: ikuti Kelas 3 Bab 2 (`src/components/modul/story/k3b2A-*`, `video-k3b2a.tsx`, `scripts/uji-story-k3b2A.mjs`, `naskah/story-video-k3b2.md`): dua video per sub-bab (materi kurikulum dan metode luar bergaya guru), `adeganSapaan`, adegan sebagai data.
4. Soal: hitung ulang kunci secara independen di uji. Angka dalam rentang bab, tetapi berbeda dari contoh buku.
5. Setiap item konten memuat rujukan (judul buku, kelas, bab, halaman acuan) di komentar atau field `sumber`, bukan kutipan. Status: draf sampai pemilik menyetujui.
6. Uji harus tidak lagi menegaskan teks buku: tanpa `kutipan`, tanpa pencocokan PDF.
7. Gerbang mutu: `node scripts/uji-orisinalitas.mjs --dir <folder> --awalan <awalan> --n 5` harus 0 temuan untuk berkas Anda, ditambah `npx tsc --noEmit`, eslint berkas yang diubah, dan semua skrip uji bab yang terkait lulus.

## Aturan kerja
- Checkout dipakai bersama. Ubah hanya berkas pada tugas Anda. Jangan commit, jangan stash/checkout/reset, jangan push. Jangan menjalankan dev server (port 3000 mungkin sudah berjalan).
- Bahasa Indonesia untuk semua teks dan laporan. Laporan ringkas: berkas, hasil uji, hal meragukan.
- Gunakan codebase-memory-mcp untuk mencari struktur kode.
