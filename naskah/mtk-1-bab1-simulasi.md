# Matematika Kelas 1 Bab 1 (Bilangan sampai 10): SMISCPA

Bab kedua yang memakai alur SMISCPA, setelah pilot Bab 8. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab1-ringkas.json`. Komponen: `src/components/modul/SimulasiBab1.tsx` (`SimulasiBab1Materi`, `misiAwalBab1`) memakai `SimulasiBilangan.tsx`, `SimulasiKatak`, dan `SimulasiKasir` yang sudah ada.

Empat sub-bab mengikuti `src/data/kelas1-bab1.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Membilang Benda | hitung satu-satu, banyaknya, kenali sekilas, ucapkan dan tulis | 1. Laboratorium Bilangan (benda) |
| B. Membandingkan Banyak | pasangan, bingkai sepuluh, garis bilangan, lebih/kurang/sama | 1. Laboratorium Bilangan (benda, bingkai, garis, banding) |
| C. Urutan Bilangan | garis bilangan, sebelum dan sesudah | 1. Laboratorium Bilangan (benda, garis); 2. Katak Maju Mundur |
| D. Mengurai Bilangan | pasangan bilangan, gabungan | 1. Laboratorium Bilangan (benda, bingkai, pasangan); 2. Kasir Warung |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah siswa menyentuh simulasinya sekali.

## Laboratorium Bilangan: perwakilan dibuka bertahap

`SimulasiBilangan` kini menerima `tampil` (perwakilan yang tersedia: `benda`, `bingkai`, `garis`, `pasangan`, `banding`) dan `awal` (perwakilan yang menyala sejak awal). Dengan begitu sub-bab A hanya memperlihatkan benda, dan perwakilan baru muncul tepat saat sub-bab yang mengajarkannya. Nama bilangan ("lima") tampil di samping angka. Kartu "Coba ini!" dibuat dari perwakilan yang sedang tampil, jadi tidak pernah menyuruh memakai alat yang belum ada.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Laboratorium (hitung) | Ketuk kotak benda ke-5. Lihat angka dan namanya ikut berubah. |
| B, Laboratorium (banding) | Atur bilangan kedua sampai sama banyak dengan bilangan pertama. |
| C, Laboratorium (garis) | Tekan plus tiga kali. Lihat garis bilangan ikut bergerak. |
| C, Katak Maju Mundur | Bantu katak maju dari batu 3 sampai batu 7. |
| D, Laboratorium (pasangan) | Tekan plus pada bagian merah. Lihat bilangan terbagi dua. |
| D, Kasir Warung | Tekan Siap membantu! Lalu bantu Bu Ani menghitung apel. |

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang, kartu) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu.

Keputusan isi dari tinjauan kedalaman:

- **Tanpa turus.** Turus tidak diajarkan di Bab 1 (baru di Bab 8). Infografis Bab 1 memakai benda, titik, bingkai, dan garis bilangan.
- **Sekilas masuk Sub-Bab A.** Mengenali banyak yang kecil tanpa menghitung adalah tujuan sub-bab itu, jadi punya cabang sendiri ("Sekilas"). Cabang "Baca dan tulis" menggantikan dua cabang yang terpisah.
- **Sub-Bab B** menutup dengan panel "Tiga alat membandingkan" (pasangan, bingkai sepuluh, garis bilangan), tiga alat yang memang dipakai di Materi dan Simulasi.
- **Sub-Bab C** memakai dua kelompok apel untuk sebelum dan sesudah 6, bukan turus.
- **Emoji.** Hanya emoji sampai Emoji 12 yang dipakai. 🟰 (Emoji 14) dan 🪜 (Emoji 13) tampil sebagai kotak kosong di Windows 10 dan HP Android lama, jadi diganti 🤝 dan 👣. Bab berikutnya: cek emoji sebelum dipasang.

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json`.
- Diperiksa di browser (tampilan 390 px): tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab terkunci berurutan dan terbuka sesuai syarat; teks Misi cocok dengan tampilan.

## Pola hibrida: simulasi bertahap, misi, tantangan bebas

Bab 1 memakai **satu laboratorium yang bertambah alatnya**, bukan satu alat per simulasi. Satu Lab Bilangan 0 sampai 10 yang alatnya bertambah per sub-bab (benda, bingkai sepuluh, garis bilangan, bagan pasangan, banding), Sub-Bab D (akhir) memakai semua alat plus Kasir Pasar sebagai pencapaian misi.

- Gerbang LANJUTKAN mengikuti **misi wajib** (`src/components/modul/misi-bab1.ts`). Anak boleh menekan **Lewati misi** setelah menyentuh simulasinya sekali. **Tantangan bebas** tidak menahan siapa pun. Misi yang sudah tercapai tidak dicabut.
- Alat melapor lewat `onKeadaan`; keadaan awal tidak boleh memenuhi misi apa pun. Logika murni dan diuji di `scripts/uji-lab-kelas1.mjs`.

| Sub-Bab | Misi wajib | Tantangan bebas |
| --- | --- | --- |
| A | Ketuk kotak benda ke-5. Angka 5 muncul.; Buat bilangan nol: tidak ada benda sama sekali.; Isi semua kotak sampai bilangan 10.; Buat bilangan 7, lalu dengarkan namanya. | Buat bilangan 9. Tinggal satu lagi menjadi 10.; Buat bilangan 2, lalu hitung bendanya satu per satu. |
| B | Atur bilangan pertama dan kedua sampai sama banyak.; Buat bilangan kedua lebih besar dari bilangan pertama.; Buat bilangan pertama lebih besar 5 atau lebih dari bilangan kedua.; Pakai bingkai sepuluh: buat bilangan 8, lalu hitung kotak kosongnya.; Buat bilangan pertama 3 dan bilangan kedua 9. Lihat letaknya di garis bilangan. | Buat dua bilangan yang hanya beda satu.; Bandingkan bilangan paling kecil dengan paling besar: 0 dan 10. |
| C | Ketuk angka 9 di garis bilangan. Makin ke kanan, makin besar.; Geser bilangan ke kiri sampai 1 di garis bilangan.; Antar Katak sampai semua misi sungai selesai. | Mundur sampai nol di garis bilangan.; Buat dua bilangan yang bersebelahan di garis bilangan. |
| D | Pecah bilangan 10 menjadi 6 dan 4 dengan Bagian merah.; Bagi bilangan 8 menjadi dua bagian sama banyak: 4 dan 4.; Pecah bilangan 7 dengan Bagian merah 0. Lihat pasangannya.; Selesaikan skenario Kasir Warung sampai adegan akhir. | Ingat Sub-Bab B: buat dua bilangan sama banyak.; Ingat Sub-Bab C: antar Katak sampai selesai. |
