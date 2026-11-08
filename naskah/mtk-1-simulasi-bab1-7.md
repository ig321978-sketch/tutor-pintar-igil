# Matematika Kelas 1 · Bab 1 sampai 7 · Tab Simulasi

Bab 8 punya naskah sendiri (`mtk-1-bab8-simulasi.md`). Dokumen ini memuat tujuh bab lainnya. Semua simulasi gratis, digambar di perangkat (SVG dan komponen React), tanpa panggilan jaringan dan tanpa LLM. Alur satu layar dengan tombol LANJUTKAN berurutan memakai `simulasi-alur.tsx`; tiap bab dirakit di `SimulasiBab<N>.tsx` dan didaftarkan di `SIMULASI_BAB` pada `IgilModulePlayer.tsx`.

Aturan pemilihan: satu metode tidak dipakai dua kali dengan simulasi yang sama. Dua simulasi PhET di satu bab (Bab 4, Bab 7 memakai Lab 2D lebih dulu) menjelaskan hal yang berbeda.

| Bab | Simulasi 1 | Simulasi 2 | Simulasi 3 |
|-----|------------|------------|------------|
| 1 Membilang sampai 10 | PhET: Laboratorium Bilangan | Mesin keadaan: Katak Maju Mundur | Skenario: Kasir Warung Bu Ani |
| 2 Penjumlahan sampai 10 | PhET: Laboratorium Penjumlahan | Mesin keadaan: Mesin Tambah | Skenario: Kantin Sekolah Pak Rudi |
| 3 Pengurangan sampai 10 | PhET: Laboratorium Pengurangan | Mesin keadaan: Bus Sekolah | Skenario: Pesta Jeruk Tika |
| 4 Mengenal Bentuk | Lab 2D: Papan Paku Bebas | PhET: Laboratorium Ciri Bentuk (dan Menyusun) | Skenario: Arsitek Cilik |
| 5 Membilang sampai 20 | PhET: Laboratorium Puluhan dan Satuan | Mesin keadaan: Odometer Bilangan | (tidak ada; skenario akan mengulang isi Simulasi 1) |
| 6 Jumlah dan kurang sampai 20 | PhET: Garis Bilangan Loncat | Mesin keadaan: Jembatan Sepuluh | Skenario: Loket Pasar Malam |
| 7 Mengukur Panjang | Lab 2D: Meja Ukur | PhET: Bandingkan Panjang | Skenario: Pita untuk Kado |

Lab 3D tidak dipakai di Kelas 1 (tidak ada bangun ruang). Metode itu disimpan untuk Kelas 6 Bab 3 (Kubus dan Balok), dimuat malas.

## Berkas

| Bab | Logika murni (`*.ts`, diuji di Node) | Tampilan |
|-----|--------------------------------------|----------|
| 1 | `lab-bilangan-bab1.ts`, `mesin-katak-bab1.ts` | `SimulasiBilangan.tsx`, `SimulasiKatak.tsx` |
| 2 | `lab-tambah-bab2.ts`, `mesin-tambah-bab2.ts` | `SimulasiTambah.tsx`, `SimulasiMesinTambah.tsx` |
| 3 | `lab-kurang-bab3.ts`, `mesin-bus-bab3.ts` | `SimulasiKurang.tsx`, `SimulasiMesinBus.tsx` |
| 4 | `lab-papan-paku-bab4.ts`, `lab-ciri-bab4.ts` | `SimulasiPapanPaku.tsx`, `SimulasiCiriBentuk.tsx` |
| 5 | `lab-puluhan-bab5.ts`, `mesin-odometer-bab5.ts` | `SimulasiPuluhan.tsx`, `SimulasiOdometer.tsx` |
| 6 | `lab-loncat-bab6.ts`, `mesin-jembatan-bab6.ts` | `SimulasiLoncat.tsx`, `SimulasiJembatan.tsx` |
| 7 | `lab-ukur-bab7.ts`, `lab-banding-panjang-bab7.ts` | `SimulasiMejaUkur.tsx`, `SimulasiBandingPanjang.tsx` |
| 1, 2, 3, 4, 6, 7 | `skenario-umum.ts` (mesin skenario) dan `skenario-kelas1.ts` (cerita) | `SimulasiSkenario.tsx` |

Komponen bersama: `simulasi-alur.tsx` (alur satu layar), `simulasi-bersama.tsx` (kartu, tombol, kotak centang), `komponen-lab.tsx` (pengatur plus minus, garis bilangan, bingkai sepuluh, bagan pasangan, peta stasiun, status dan riwayat mesin).

Uji: `node --no-warnings scripts/uji-skenario-umum.mjs` dan `node --no-warnings scripts/uji-lab-kelas1.mjs`.

## Ringkasan model dan kontrol

**Bab 1.** Laboratorium Bilangan: satu bilangan 0 sampai 10 tampil sebagai benda bernomor, bingkai sepuluh, garis bilangan, bagan pasangan (n = a + b), dan pembanding (>, <, =). Ketuk kotak, garis, atau plus dan minus mengubah semuanya. Katak Maju Mundur: keadaan = batu 0 sampai 10, aksi = maju atau mundur 1 atau 2; mesin menolak langkah ke luar sungai; tiga misi (3→7, 7→2, 2→9).

**Bab 2.** Laboratorium Penjumlahan: dua kelompok (merah, biru), jumlah paling banyak 10, gabungkan, tukar tempat, hitung maju di garis bilangan, bagan pasangan. Mesin Tambah: Pesanan → Kotak A → Kotak B → Gabung → Hasil; isi kotak harus sesuai pesanan, gabung dulu baru jawab; tiga pesanan.

**Bab 3.** Laboratorium Pengurangan: total t, benda dicoret sembarang, sisa t − k di bingkai sepuluh, garis bilangan mundur, bagan pasangan, dan keluarga fakta (dua tambah, dua kurang). Bus Sekolah: di tiap halte turun dulu, naik kemudian, baru berangkat; mesin menolak melebihi tugas halte, bus kosong, bus penuh; catatan perjalanan berupa kalimat tambah dan kurang; dua rute.

**Bab 4.** Papan Paku Bebas: kisi 5 x 5, karet dipasang di paku; mesin mengenali segitiga, persegi, persegi panjang, segiempat lain, banyak sisi; menolak paku segaris dan karet menyilang; karet lengkung tidak punya sisi lurus dan sudut; empat tantangan. Laboratorium Ciri Bentuk: lima bentuk (persegi, persegi panjang, segitiga, lingkaran, setengah lingkaran), putar dan besarkan tanpa mengubah ciri, tampilkan sisi dan sudut, dan Menyusun (2 segitiga → persegi panjang, 2 persegi → persegi panjang, 4 persegi → persegi, 2 setengah lingkaran → lingkaran).

**Bab 5.** Laboratorium Puluhan dan Satuan: bilangan 0 sampai 20 sebagai benda yang bisa diikat sepuluh, dua bingkai sepuluh, tabel nilai tempat, garis bilangan 0 sampai 20, dan perbandingan lewat puluhan lalu satuan. Odometer Bilangan: dua roda (puluhan, satuan); satuan 9 naik = bawa, satuan 0 turun = pinjam; tiga misi (7→13, 13→8, 8→20).

**Bab 6.** Garis Bilangan Loncat: tambah, kurang, selisih; dua cara meloncat (satu-satu atau lewat sepuluh) dengan jumlah lompatan dibandingkan. Jembatan Sepuluh: Soal → Pecah → Genapkan → Sisa; bagian pertama harus menggenapkan bilangan pertama menjadi 10; tiga soal (8+5, 9+7, 6+8).

**Bab 7.** Meja Ukur: pita 12 ruas diukur dengan balok besar, stik, atau klip kecil; boleh sengaja mencoba mulai dari tengah, memberi celah, atau menumpuk, dan mesin menunjukkan hasilnya salah; satuan berbeda memberi bilangan berbeda. Bandingkan Panjang: empat pita dalam stik, sejajarkan ujung kiri, urutkan dari terpendek, bandingkan dua pita.

## Skenario kontekstual

Mesin skenario (`skenario-umum.ts`) membaca adegan dari data: narasi, pilih (satu pilihan benar, tiap pilihan punya akibat cerita), soal (beberapa pertanyaan), hitung (ketuk benda satu per satu lalu pilih banyaknya), isi (isi keranjang sampai tepat, lalu periksa), akhir. Salah tidak menghukum; cerita tidak maju sampai pilihan atau jawaban tepat. `uji-skenario-umum.mjs` memeriksa tiap adegan dapat diselesaikan, jawaban ada di pilihan, hitungan tertulis benar, dan letak jawaban benar bervariasi.

## Ucapan

Tombol suara memakai `speakGuru`. Ucapan yang tetap (adegan skenario, stasiun mesin, "Coba ini!", keadaan awal lab) dicatat saat penulisan dan dibuat statis mengikuti `audio-guru-statis.mdc`. Ucapan yang mengikuti pilihan bebas siswa (angka yang sedang diatur) jatuh ke suara perangkat.
