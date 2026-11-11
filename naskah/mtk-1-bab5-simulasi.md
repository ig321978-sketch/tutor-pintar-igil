# Matematika Kelas 1 Bab 5 (Ayo Membilang sampai dengan 20): SMISCPA

Bab keenam yang memakai alur SMISCPA, setelah Bab 8 (pilot), Bab 1, Bab 2, Bab 3, dan Bab 4. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab5-ringkas.json`. Komponen: `src/components/modul/SimulasiBab5.tsx` (`SimulasiBab5Materi`, `misiAwalBab5`) memakai `SimulasiPuluhan.tsx` dan `SimulasiOdometer.tsx` yang sudah ada, serta dua laboratorium baru: `SimulasiDeret.tsx` dan `SimulasiBanding.tsx`.

Empat sub-bab mengikuti `src/data/kelas1-bab5.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Menghitung, Membaca, dan Menulis Bilangan sampai 20 | sepuluh dulu lalu sisanya, nama dan lambang 11 sampai 20 (kata belas), dua puluh = dua kotak penuh, 10 + sisa, letak di garis bilangan, tebak lalu buktikan | 1. Laboratorium Bilangan sampai 20 (benda, ikat sepuluh, dua bingkai, kalimat sepuluh, garis) |
| B. Menghitung Maju dan Mundur | maju dan mundur satu demi satu, bilangan yang hilang, sebelum, sesudah, di antara, kisi 1 sampai 20, garis bilangan dua arah | 1. Maju dan Mundur (garis, urutan); 2. Ulat dan Kisi Bilangan (kisi, ulat, tetangga) |
| C. Nilai Tempat Puluhan dan Satuan | sepuluh benda = satu puluhan, satuan, papan nilai tempat, angka kiri dan kanan, angka sama nilai berbeda | 1. Laboratorium Puluhan dan Satuan (benda, ikat, tabel); 2. Odometer Bilangan (mesin keadaan) |
| D. Membandingkan dan Mengurutkan Bilangan | lebih banyak, lebih sedikit, sama banyak, pasangkan satu-satu, paling banyak dan paling sedikit, mengurutkan, puluhan dulu lalu satuan, garis bilangan | 1. Banding Dua Kelompok (pasangkan, tanda); 2. Paling Banyak dan Urutan (benda, paling, urut, garis); 3. Puluhan Dulu, Baru Satuan (tabel, garis, bandingkan) |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah simulasinya disentuh sekali. Odometer dulu bermode `tuntas` (tiga misi harus selesai); di dalam Materi ia ikut `sentuh` seperti simulasi lain, tetapi tiga misi di dalamnya tetap bisa dimainkan.

## Alat yang diubah atau baru

- **`SimulasiPuluhan`** menerima `tampil`: `benda`, `ikat`, `bingkai`, `kalimat`, `tabel`, `garis`, `banding`. Setiap sub-bab hanya menyalakan yang sudah diajarkan:
  - A: `benda`, `ikat`, `bingkai`, `kalimat`, `garis`. Tanpa kata puluhan dan satuan: judul "Laboratorium Bilangan sampai 20", kotak diikat tertulis "Sepuluh (diikat)", dan kalimat `10 + 3 = 13` (`kalimatSepuluh`). Ucapan memakai "sepuluh ditambah ... sama dengan ..." (`ucapanPuluhan(n, ikat, false)`).
  - C: `benda`, `ikat`, `tabel`. Memakai kata puluhan dan satuan dan tabel nilai tempat.
  - D: `tabel`, `garis`, `banding`. Bilangan kedua dan kalimat "puluhan dulu, lalu satuan".
  Perwakilan yang tampil bisa dinyalakan atau dimatikan; ada Reset semua; langkah "Coba ini!" disusun dari alat yang tampil.
- **`SimulasiDeret` (baru, `lab-deret-bab5.ts`)**: satu bilangan 1 sampai 20 yang maju atau mundur satu langkah. Titik awal bisa diubah (ketuk angka di garis atau kotak di kisi). `tampil`: `garis` (panah hijau maju, panah emas mundur, titik awal biru, titik sekarang merah), `urutan` (jejak 12 → 13 → 14), `kisi` (empat baris, lima kotak, kotak yang sudah dilewati kuning muda), `ulat` (lima bilangan berurutan, bilangan sekarang bisa disembunyikan), `tetangga` (sebelum, sekarang, sesudah). Di ujung kisi tombol berhenti dengan petunjuk pendek, tanpa hukuman. Ada Reset semua.
- **`SimulasiBanding` (baru, `lab-banding-bab5.ts`)**: jeruk Kira, Tika, dan Wei (0 sampai 20). `tampil`: `pasang` (dua anak dipasangkan satu-satu, kolom yang tidak berpasangan ditandai emas), `tanda` (`12 < 15` dan kalimat lebih banyak atau lebih sedikit), `benda` (tiga baris jeruk), `paling` (paling banyak dan paling sedikit, yang sama banyak disebut semuanya), `urut` (dari terkecil dan dari terbesar), `garis` (tiga titik K, T, W). Sub-Bab D1 memakai pilihan dua anak (Kira dan Tika, Kira dan Wei, Tika dan Wei). Ada Reset semua.
- **`SimulasiOdometer`** dipakai apa adanya di Sub-Bab C, karena puluhan dan satuan baru diajarkan di sana.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Laboratorium Bilangan sampai 20 | Tekan plus pada Bilangan sampai lebih dari 10. Lihat bingkai kedua mulai terisi. |
| B, Maju dan Mundur | Tekan Maju beberapa kali, lalu tekan Mundur. Lihat panah di garis bilangan. |
| B, Ulat dan Kisi Bilangan | Ketuk satu kotak di kisi. Lihat bilangan sebelum dan sesudahnya. |
| C, Laboratorium Puluhan dan Satuan | Tekan plus sampai 10, lalu centang Ikat sepuluh. Lihat tabelnya. |
| C, Odometer Bilangan | Tekan Satuan naik sampai melewati 9. Lihat apa yang terjadi pada puluhan. |
| D, Banding Dua Kelompok | Tekan plus pada jeruk Kira beberapa kali. Lihat siapa yang punya sisa tidak berpasangan. |
| D, Paling Banyak dan Urutan | Ubah jumlah jeruk Wei. Lihat siapa yang paling banyak dan siapa yang paling sedikit. |
| D, Puluhan Dulu, Baru Satuan | Centang Bandingkan. Lihat angka mana yang dibandingkan lebih dulu. |

Sub-Bab A hanya satu simulasi karena satu laboratorium sudah memuat semua perwakilan yang diajarkannya. Tidak ada simulasi ke-2 yang dibuat-buat.

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang, 8 kartu) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu.

- **A:** cabang Sepuluh dulu, Nama dan lambang, Dua puluh, Garis bilangan. Infografis: Sepuluh dulu, lalu sisanya (10 + 3 = 13), Nama dan lambang bilangan (belas), Tebak, lalu buktikan (banding).
- **B:** cabang Menghitung maju, Menghitung mundur, Bilangan yang hilang, Kisi 1 sampai 20. Infografis: Maju atau mundur? (banding), Sebelum, sesudah, di antara, Kisi 1 sampai 20.
- **C:** cabang Satu puluhan, Satuan, Papan nilai tempat, Angka sama, nilai beda. Infografis: Puluhan dan satuan (1 puluhan + 3 satuan = 13), Membaca papan nilai tempat (tabel bilangan 15), Angka 1 di bilangan 11 (banding).
- **D:** cabang Lebih banyak, lebih sedikit; Paling banyak, paling sedikit; Mengurutkan; Cara membandingkan bilangan. Infografis: Lebih banyak, lebih sedikit, sama; Urutan bilangan (banding); Tiga cara membandingkan.
- Visual infografis memakai teks dan tabel menurun, tanpa gambar benda, sesuai batas Concrete dan Picture. Emoji hanya yang sampai Emoji 12 (sudah diaudit).

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json`.
- `node --no-warnings scripts/uji-lab-kelas1.mjs`: bagian baru memeriksa kalimat dan ucapan Sub-Bab A tanpa istilah puluhan dan satuan untuk bilangan 0 sampai 20; maju, mundur, ujung kisi, ringkasan, urutan, tetangga, ulat, dan kisi untuk 1 sampai 20; serta pasangkan, kalimat dua, paling banyak dan sedikit (termasuk yang sama banyak), dan urutan untuk semua pasangan 0 sampai 20.
- Diperiksa di browser: tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab (A sampai D) terkunci berurutan dan terbuka sesuai syarat; alat yang tampil dan teks Misi cocok dengan tabel di atas.
