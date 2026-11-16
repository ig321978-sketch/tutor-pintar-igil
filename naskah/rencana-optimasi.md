# Rencana optimasi IGIL: hemat token dan aman hak cipta

Keputusan pemilik: buku resmi Kurikulum Merdeka hanya ACUAN (tidak boleh untuk penggunaan komersial, jadi diperlakukan ketat); tokoh tetap enam (Malosi, Kira, Upe, Wei, Halim, Igil); topik generator soal dipilih Claude dari daftar bab; konten lama tetap tayang (status "disetujui") sampai ditinjau.

## Aturan
- Mengikuti buku: topik, urutan, capaian, tingkat kesulitan, rentang angka, jenis konteks. Wajib orisinal: kalimat, dialog, soal, ilustrasi, nama tokoh. Ubah juga angka dan konteks contoh agar tidak identik dengan buku.
- Tiap item konten baru memuat `rujukan` dan `status`; tanpa acuan: `TODO-RUJUKAN`.
- `bahan-sd/` dan `sumber/` internal, masuk .gitignore (repo publik).
- Konten draf tidak di-commit atau dideploy tanpa persetujuan.

## Paket 1 (pengamanan, ekstraksi, pemindaian) — dikerjakan
1. .gitignore: `/bahan-sd/`, `/sumber/`.
2. Ekstrak teks PDF: `pdftotext -layout` ke `sumber/ekstrak/*.txt` (halaman dipisah form feed).
3. `scripts/buat-indeks-sumber.mjs` membuat `sumber/indeks.json` (judul bab dan halaman; Kelas 1, 2, 6 masih `TODO-RUJUKAN`).
4. `scripts/uji-orisinalitas.mjs`: runtun 5 kata sama, minimal 2 runtun per kalimat, dan nama diri buku.
5. Pemindaian konten lama (lihat hasil di laporan sesi). Menunggu persetujuan sebelum mengubah konten.

## Paket 2 (rujukan dan status pada tipe yang ada) — belum
Tambah `rujukan` dan `status` ke tipe adegan; konten lama otomatis "disetujui"; validasi item baru; bank konteks orisinal. Tanpa menulis ulang komponen.

## Paket 3 (generator soal, pemeriksa, skill) — belum
Generator soal berparameter memakai pola yang ada; uji kunci jawaban; subagen pemeriksa (Haiku) hanya untuk daftar periksa; perbarui skill `standar-modul-smiscpa`.

## Plugin code intelligence — saran saja, tanpa dipasang.
