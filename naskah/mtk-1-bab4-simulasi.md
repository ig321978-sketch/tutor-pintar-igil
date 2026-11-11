# Matematika Kelas 1 Bab 4 (Mengenal Bentuk): SMISCPA

Bab kelima yang memakai alur SMISCPA, setelah Bab 8 (pilot), Bab 1, Bab 2, dan Bab 3. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab4-ringkas.json`. Komponen: `src/components/modul/SimulasiBab4.tsx` (`SimulasiBab4Materi`, `misiAwalBab4`) memakai `SimulasiCiriBentuk.tsx`, `SimulasiPapanPaku.tsx`, `SimulasiSkenario.tsx` (`SKENARIO_BAB4`, Arsitek Cilik) yang sudah ada, serta dua laboratorium baru: `SimulasiKelompok.tsx` dan `SimulasiBangunGabungan.tsx`.

Tiga sub-bab mengikuti `src/data/kelas1-bab4.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Mendeskripsikan Benda Berdasarkan Bentuk | bentuk lengkung, segitiga, segi empat; hitung sisi lurus dan sudut; bentuk tidak berubah karena posisi atau ukuran | 1. Laboratorium Ciri Bentuk (empat bentuk dasar); 2. Papan Paku Bebas (lab 2D) |
| B. Mengelompokkan Benda | satu aturan (bentuk, warna, ukuran), memeriksa cocok atau tidak, memberi nama, menghitung anggota, ganti aturan | 1. Kelompok Satu Aturan (nampan, tabel hitung); 2. Satu Balok, Banyak Kelompok (nampan, ciri balok, kalimat jumlah) |
| C. Menyusun dan Mengurai Bentuk Bangun | menggabung bentuk jadi bangun baru, mengurai, menghitung bagian tiap jenis, menghitung lidi | 1. Menyusun Bentuk; 2. Bangun Gabungan (kereta, rumah, rumah dari lidi); 3. Arsitek Cilik (skenario) |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah simulasinya disentuh sekali. Arsitek Cilik dulu bermode `tuntas`, kini ikut `sentuh` seperti simulasi lain di Materi.

## Alat yang diubah atau baru

- **`SimulasiCiriBentuk`** menerima `tampil`: `ciri` dan `menyusun`. Sub-Bab A hanya `ciri` dan memakai empat bentuk (persegi, persegi panjang, segitiga, lingkaran); setengah lingkaran baru muncul di tab lama karena belum diajarkan di A. Kartu ciri menampilkan "Masuk kelompok" (`kelompokBentuk`: Bentuk lengkung, Segitiga, Segi empat) agar sejalan dengan kosakata Sub-Bab A. Sub-Bab C hanya `menyusun`, dengan kalimat "Matikan pilihan untuk menguraikannya lagi" supaya mengurai ikut terasa. `ucapanSusun` ada di `lab-ciri-bab4.ts`.
- **`SimulasiPapanPaku`** menerima `tampilSiku` (bawaan `true`). Sub-Bab A mematikannya: kartu "Sudut siku" disembunyikan dan ucapan tidak menyebut sudut siku, karena itu belum diajarkan. `ucapanBentuk(papan, lengkung, denganSiku)`.
- **`SimulasiKelompok` (baru, `lab-kelompok-bab4.ts`)**: sembilan balok dengan tiga ciri (bentuk lengkung, segitiga, segi empat; warna merah, biru, kuning; ukuran besar, kecil). Sebaran tiap aturan berbeda (bentuk 4, 2, 3; warna 3, 4, 2; ukuran 5, 4) agar mengganti aturan terasa. `tampil`: `benda` (nampan), `tabel` (tabel hitung dengan baris Semua), `ciri` (tiga ciri satu balok beserta kelompoknya menurut tiga aturan), `kalimat` (kalimat jumlah, mis. 3 + 4 + 2 = 9). Balok yang diketuk disorot di nampan dan di tabel. Ada Reset semua.
- **`SimulasiBangunGabungan` (baru, `lab-gabung-bab4.ts`)**: tiga bangun, yaitu kereta balok (5 segi empat, 1 segitiga, 3 lengkung = 9 bagian), rumah mainan (3 segi empat, 1 segitiga = 4 bagian), rumah dari lidi (4 lidi dinding, 2 lidi atap = 6 lidi). Uraikan bangun menggeser bagian; ketuk jenis menyorot bagiannya; Ambil jenis yang ditunjuk memudarkan bagian itu dan menulis pengurangan (mis. 9 − 3 = 6); tabel hitung dan kalimat jumlah ikut berubah. Ada Reset semua.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Laboratorium Ciri Bentuk | Tekan Putar 90°. Lihat apakah jumlah sisi dan sudutnya berubah. |
| A, Papan Paku Bebas | Ketuk empat paku, lalu tekan Tutup bentuk. Lihat nama bentuknya. |
| B, Kelompok Satu Aturan | Ketuk Warna. Lihat balok yang sama pindah ke nampan baru. |
| B, Satu Balok, Banyak Kelompok | Ketuk satu balok. Lihat kelompoknya menurut bentuk, warna, dan ukuran. |
| C, Menyusun Bentuk | Pilih 2 segitiga, lalu centang Gabungkan bagian. Bentuk apa yang lahir? |
| C, Bangun Gabungan | Tekan Uraikan bangun. Lihat bagian-bagian kereta. |
| C, Arsitek Cilik | Tekan Ayo membangun! Lalu bantu Pak Arsitek memilih bentuk. |

Arsitek Cilik ditaruh di Sub-Bab C karena adegannya memuat ciri bentuk (A) dan menggabung dua segitiga (C); anak sudah mengenal keduanya saat sampai di sana.

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang, 8 kartu) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu, memakai kata "bentuk lengkung, segitiga, segi empat" dari buku.

- **A:** cabang Bentuk lengkung, Segitiga, Segi empat, Bentuk tetap sama. Infografis: Tiga bentuk di sekitar kita (ciri sisi dan sudut), Segitiga tegak atau terbalik? (banding), Cara mendeskripsikan benda (lihat, raba, hitung, sebut).
- **B:** cabang Satu aturan, Cocok atau tidak, Hitung kelompok, Ganti aturan. Infografis: Tiga ciri tiap benda, Satu kue dua kelompok (banding: menurut bentuk dan menurut warna), Menghitung kelompok (3 + 3 = 6 dan 2 + 2 + 2 = 6).
- **C:** cabang Menyusun, Mengurai, Hitung bagian, Hitung lidi. Infografis: Dua cara menggabung (banding: sisi tegak atau sisi miring), Kereta dari bentuk (5 + 1 + 3 = 9), Susun dan urai itu hitungan (5 + 1 + 3 = 9, 9 − 3 = 6, lidi 4 + 2 = 6).
- Visual infografis memakai teks dan tabel menurun, tanpa gambar benda, sesuai batas Concrete dan Picture. Emoji hanya yang sampai Emoji 12 (sudah diaudit).

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json`.
- `node --no-warnings scripts/uji-lab-kelas1.mjs`: bagian baru memeriksa sebaran dan jumlah kelompok, kalimat jumlah, jumlah jenis bangun gabungan, kalimat tambah dan kurang, kelompok bentuk, ucapan susun, dan ucapan Papan Paku tanpa sudut siku.
- Diperiksa di browser: tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab (A sampai C) terkunci berurutan dan terbuka sesuai syarat; alat yang tampil dan teks Misi cocok; Papan Paku tanpa kartu sudut siku; tombol "Ayo membangun!" (Arsitek Cilik) berfungsi.
