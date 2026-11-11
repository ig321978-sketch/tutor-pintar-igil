# Matematika Kelas 1 Bab 6 (Penjumlahan dan Pengurangan sampai dengan 20): SMISCPA

Bab ketujuh yang memakai alur SMISCPA, setelah Bab 8 (pilot), Bab 1, Bab 2, Bab 3, Bab 4, dan Bab 5. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab6-ringkas.json`. Komponen: `src/components/modul/SimulasiBab6.tsx` (`SimulasiBab6Materi`, `misiAwalBab6`) memakai tiga laboratorium yang diperluas (`SimulasiBanding.tsx`, `SimulasiLoncat.tsx`) atau sudah ada (`SimulasiJembatan.tsx`, `SimulasiSkenario.tsx`), serta satu laboratorium baru: `SimulasiBelasan.tsx` (logika murni di `lab-belasan-bab6.ts`).

Tiga sub-bab mengikuti `src/data/kelas1-bab6.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Konsep Lebih dari, Kurang dari, dan Selisih | pasangkan satu-satu, lebihnya dan kurangnya, beda atau selisih (besar dikurangi kecil), selisih di model batang dan garis bilangan | 1. Selisih Dua Kelompok (pasangkan, model batang, selisih); 2. Selisih di Garis Bilangan |
| B. Penjumlahan Kurang dari 20 | menghitung maju, menghitung dengan 10, penjumlahan berulang, pasangan bilangan, nilai tempat, soal cerita | 1. Loncat Menjumlah (satu-satu atau lewat sepuluh); 2. Jembatan Sepuluh (mesin keadaan); 3. Menjumlah Belasan dan Satuan (benda, tabel, pasangan bilangan) |
| C. Pengurangan Kurang dari 20 | menghitung mundur, pasangan bilangan, nilai tempat, periksa dengan penjumlahan, soal cerita | 1. Loncat Mengurang; 2. Mengurang Belasan dan Satuan (benda, tabel, pasangan bilangan, periksa); 3. Loket Pasar Malam (skenario) |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah simulasinya disentuh sekali. Jembatan Sepuluh dan Loket Pasar Malam dulu bermode `tuntas` di tab; di dalam Materi keduanya ikut `sentuh` seperti simulasi lain, tetapi seluruh langkahnya tetap bisa dimainkan.

## Alat yang diubah atau baru

- **`SimulasiBanding`** (dari Bab 5) mendapat dua perwakilan baru, `selisih` dan `batang`. `batang` adalah model batang 20 kotak untuk tiap anak; kotak emas hanya ada di batang yang lebih panjang dan itulah selisihnya (`role="img"` dengan keterangan untuk pembaca layar). `selisih` menulis `besar − kecil = selisih` (`kalimatKurangSelisih`) dan kalimat lebihnya, kurangnya, dan selisihnya (`kalimatSelisih`). Sub-Bab A hanya menyalakan `pasang`, `batang`, dan `selisih`: tanpa tanda banding dan tanpa urutan, karena belum diajarkan di bab ini.
- **`SimulasiLoncat`** menerima `ops`: A memakai `["selisih"]` (titik merah dan biru menandai dua bilangan, panah emas adalah jaraknya), B memakai `["tambah"]`, C memakai `["kurang"]`. Pemilih operasi hanya muncul bila `ops` lebih dari satu. Ada Reset semua dan langkah "Coba ini!" yang menyesuaikan operasi.
- **`SimulasiBelasan` (baru, `lab-belasan-bab6.ts`)**: bilangan awal belasan dan satuan yang ditambah atau dikurangi, hasil tetap belasan. `tampil`: `benda` (satu puluhan diikat, satuan lepas merah, satuan yang ditambah hijau atau yang dikurangi putus-putus), `tabel` (nilai tempat sebelum dan sesudah, puluhan tetap, satuan berubah), `pecah` (tiga kalimat pasangan bilangan: `12 = 10 + 2`, `2 + 3 = 5`, `10 + 5 = 15`), `periksa` (hanya untuk mengurang: hasil ditambah yang dikurangkan kembali ke bilangan awal). Batas: penjumlahan dengan bilangan awal 10 sampai 18, hasil sampai 19; pengurangan dengan bilangan awal 11 sampai 19, hasil tidak kurang dari 10 (tanpa meminjam).
- **`SimulasiJembatan`** dan **`SimulasiSkenario`** (`SKENARIO_BAB6`) dipakai apa adanya. Tokoh skenario diganti ke 🎟️ karena emoji pekerja sebelumnya memakai urutan ZWJ yang lebih baru dari Emoji 12.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Selisih Dua Kelompok | Tekan plus pada jeruk Kira beberapa kali. Lihat jeruk yang tidak berpasangan dan selisihnya. |
| A, Selisih di Garis Bilangan | Atur bilangan pertama dan kedua. Lihat jarak dari yang kecil ke yang besar di garis bilangan. |
| B, Loncat Menjumlah | Tekan plus pada Loncat maju, lalu bandingkan loncat satu-satu dengan lewat sepuluh. Lihat mana yang lebih sedikit lompatannya. |
| B, Jembatan Sepuluh | Tekan Baca soal. Lihat bilangan mana yang akan dipecah. |
| B, Menjumlah Belasan dan Satuan | Tekan plus pada Ditambah. Lihat satuannya berubah, puluhannya tetap. |
| C, Loncat Mengurang | Tekan plus pada Loncat mundur sampai 6. Bandingkan loncat satu-satu dengan lewat sepuluh. |
| C, Mengurang Belasan dan Satuan | Tekan plus pada Dikurangi. Lihat satuannya berkurang, puluhannya tetap. |
| C, Loket Pasar Malam | Tekan Buka loket! Lalu bantu Kak Tiket menghitung tiketnya. |

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang, 8 kartu) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu, memakai cerita dari buku (donat Ibu 7 dan Tika 6, bunga dan kupu-kupu, boneka Wei dan Kira, pensil Upe dan Malosi, apel Tika, bolu kukus, pensil warna Wei dan Kira).

- **A:** cabang Pasangkan satu-satu, Lebihnya dan kurangnya, Beda atau selisih, Garis dan batang. Infografis: Pasangkan donat, Lebihnya atau kurangnya? (banding), Beda atau selisih.
- **B:** cabang Menghitung maju, Menghitung dengan 10, Penjumlahan berulang, Pasangan dan nilai tempat. Infografis: Tiga cara menghitung 7 + 6, 12 + 3 dengan dua jalan (banding, tabel nilai tempat), Soal cerita penjumlahan.
- **C:** cabang Menghitung mundur, Pasangan bilangan, Nilai tempat, Periksa dan cerita. Infografis: Tiga cara menghitung 15 − 3, Kurang lalu periksa (banding), Soal cerita pengurangan.
- Visual infografis memakai teks dan tabel menurun, tanpa gambar benda, sesuai batas Concrete dan Picture. Emoji hanya yang sampai Emoji 12 (sudah diaudit).

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json` (dua ringkasan cabang Bab 5 yang melebihi 8 kata ikut dipendekkan).
- `node --no-warnings scripts/uji-lab-kelas1.mjs`: bagian baru memeriksa selisih, kalimat selisih, dan ucapan banding untuk semua pasangan 0 sampai 20; serta belasan untuk dua operasi dengan semua kombinasi bilangan awal dan b (termasuk yang di luar batas, harus dijepit): puluhan tetap 1, satuan tabel, tiga kalimat pecah, kalimat periksa, ucapan, hasil selalu 10 sampai 19.
- Diperiksa di browser: tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab (A sampai C) terkunci berurutan dan terbuka sesuai syarat; alat yang tampil, gerbang Lanjut, dan teks Misi cocok dengan tabel di atas.
