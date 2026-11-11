# Matematika Kelas 1 Bab 3 (Pengurangan sampai 10): SMISCPA

Bab keempat yang memakai alur SMISCPA, setelah Bab 8 (pilot), Bab 1, dan Bab 2. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab3-ringkas.json`. Komponen: `src/components/modul/SimulasiBab3.tsx` (`SimulasiBab3Materi`, `misiAwalBab3`) memakai `SimulasiKurang.tsx` (Laboratorium Pengurangan), `SimulasiMesinBus.tsx` (Bus Sekolah), dan `SimulasiSkenario.tsx` (`SKENARIO_BAB3`, Pesta Jeruk) yang sudah ada.

Empat sub-bab mengikuti `src/data/kelas1-bab3.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Cerita Pengurangan | tiga bagian cerita (mula-mula, berkurang, sisa), menulis dan membaca kalimat −, sisa nol | 1. Laboratorium Pengurangan (benda, kalimat, bingkai) |
| B. Berbagai Cara | pasangan bilangan, hitung mundur, kurang nol dan kurang sama, pengurangan dari sepuluh | 1. Pasangan Bilangan (benda, kalimat, dua pengurangan, bagan); 2. Hitung Mundur (kalimat, garis bilangan); 3. Dari Sepuluh (kalimat, bingkai) |
| C. Hubungan Penjumlahan dan Pengurangan | keluarga fakta, kebalikan tambah dan kurang, memeriksa, mencari yang hilang | 1. Keluarga Bilangan (benda, kalimat, bagan, keluarga fakta); 2. Bus Sekolah (mesin keadaan) |
| D. Soal Cerita Pengurangan | tiga bagian soal, kata kunci kurang, apa yang dicari, jawaban lengkap dan memeriksa | 1. Periksa Jawabanmu (benda, kalimat, keluarga fakta); 2. Pesta Jeruk (skenario) |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah simulasinya disentuh sekali.

## Laboratorium Pengurangan: alat dibuka bertahap

`SimulasiKurang` menerima `tampil`: `benda` (benda yang dicoret), `kalimat`, `garis`, `bingkai`, `dua` (dua pengurangan dari satu pasangan), `bagan` (bagan pasangan), dan `keluarga` (keluarga fakta). Alat yang tidak ada di `tampil` tidak pernah muncul, kartu "Coba ini!" (paling banyak 4 langkah) dan ucapan guru dibuat dari alat yang tampil. `ucapanKurang(t, k, sebutPasangan)` hanya menyebut pasangan tambah bila keluarga fakta tampil. Pembagian mengikuti isi sub-bab: garis mundur dan bingkai dari sepuluh baru muncul di Sub-Bab B, keluarga fakta baru di Sub-Bab C.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Laboratorium Pengurangan | Ketuk satu benda untuk mencoretnya. Lihat sisanya ikut berubah. |
| B, Pasangan Bilangan | Ketuk satu benda untuk mencoretnya. Lihat bagan dan dua pengurangan ikut berubah. |
| B, Hitung Mundur | Tekan plus pada Benda diambil. Lihat lompatan mundur di garis bilangan. |
| B, Dari Sepuluh | Tekan plus pada Semua benda sampai 10. Lihat bingkai sepuluh jadi penuh. |
| C, Keluarga Bilangan | Tekan plus pada Benda diambil. Lihat empat kalimat satu keluarga ikut berubah. |
| C, Bus Sekolah | Tekan Turunkan 1 anak. Lihat isi bus berkurang. |
| D, Periksa Jawabanmu | Coret beberapa benda. Lalu cek dengan kalimat tambah di keluarga fakta. |
| D, Pesta Jeruk | Tekan Mulai pesta! Lalu bantu Bu Lina menghitung sisa jeruknya. |

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu.

- **A:** cabang Tiga bagian, Berkurang, Tulis dan baca, Sisa nol. Infografis: Tiga bagian cerita (mula-mula, berkurang, sisa), Ada sisa atau sisa nol? (banding), Tiga cara melihat sisa (benda, bingkai, goresan).
- **B:** cabang Pasangan, Hitung mundur, Nol dan sama, Dari sepuluh. Infografis: gabungan dan sebagian (dua pengurangan), mundur, kurang nol, kurang sama, 10 − 7, 10 − 3, pasangan sepuluh.
- **C:** cabang Keluarga bilangan, Kebalikan, Periksa, Cari yang hilang. Infografis: keluarga fakta, tambah atau kurang (banding), periksa dan cari yang hilang.
- **D:** cabang Baca, Kata kunci, Apa yang dicari, Jawab dan periksa. Infografis: tiga bagian soal, kata kunci berkurang atau bertambah (banding), tiga hal yang dicari.
- Emoji hanya yang sampai Emoji 12 (sudah diaudit).

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json`.
- `node --no-warnings scripts/uji-lab-kelas1.mjs` dan `scripts/uji-skenario-umum.mjs` (lulus).
- Diperiksa di browser: tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab (A sampai D) terkunci berurutan dan terbuka sesuai syarat; alat yang tampil dan teks Misi cocok; tombol "Turunkan 1 anak" (Bus Sekolah) dan "Mulai pesta!" (Pesta Jeruk) berfungsi.
