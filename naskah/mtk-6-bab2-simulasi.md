# Matematika Kelas 6 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: Rasio (`mtk-6-bab2`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab2`). Komponen: `src/components/modul/SimulasiK6Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab2.ts`, teks misi di `misi-teks-k6b2.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir) dan kini terdaftar.

Bab ini punya **tiga sub-bab**: A (Konsep Rasio, hlm. 64-69), B (Kesamaan Rasio, hlm. 70-79), dan C (Penerapan Rasio, hlm. 80-88). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: ketiga gelombang selesai (A Konsep Rasio, B Kesamaan Rasio, C Penerapan Rasio). Bab `mtk-6-bab2` terdaftar di `registri-simulasi.ts` (tiga kemunculan: materi, misi awal, ringkas).**

Berkas Materi bab ini tidak diubah (`SubBabK6B2A-C.tsx`, `naskah-k6b2.ts`, `data-k6b2.ts`, `paket-k6b2.ts`, dan lainnya). Pengeja suara memakai `ejaK6B2` (berkas baru `eja-k6b2.ts`) lewat prop `eja` mesin dan di lab.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `3 : 5` / `3:5` | tiga banding lima |
| `4 : 6 = 2 : 3` | empat banding enam sama dengan dua banding tiga |
| `Rp8.000` / `Rp 50.000` | delapan ribu rupiah / lima puluh ribu rupiah |
| `10/12 = 5/6` | sepuluh per dua belas sama dengan lima per enam |
| `1/2`, `1/4`, `3/4` | setengah, seperempat, tiga perempat (bentuk lazim) |
| `2 km/jam`, `25 m²`, `3 kg` | dua kilometer per jam, dua puluh lima meter persegi, tiga kilogram |
| `1,5` | satu koma lima |
| `Rp40.000 per bibit` | empat puluh ribu rupiah per bibit |
| `1 km per 30 menit` | satu kilometer per tiga puluh menit |

Bilangan 1 sampai 999.999, semua rasio a : b dengan a dan b sampai 40 (dengan dan tanpa spasi), semua pecahan a/b sampai 30, dan uang kelipatan seribu diuji terhadap hitungan mandiri per digit di skrip uji. Titik dua di tengah kalimat (misalnya "Soal bibit: 4 : 6") tidak dianggap rasio. Tokoh skenario: Artus, yang menata bibit di lahan (tokoh dari Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Rasio (Tulis, Sederhana, Arah) | `SimulasiLabRasioK6B2.tsx` + `lab-rasio-k6b2a.ts` | Mesin Rasio | Artus dan Lahan Bibit (8 adegan) |
| B | Lab Senilai (Tabel, Jembatan, Satuan) | `SimulasiLabSenilaiK6B2.tsx` + `lab-senilai-k6b2b.ts` | Mesin Senilai | Artus, Resep, dan Paket Bibit (8 adegan) |
| C | Lab Bagian (Bagian, Total, Waktu) | `SimulasiLabBagianK6B2.tsx` + `lab-bagian-k6b2c.ts` | Mesin Bagian | Artus, Pasar Malam, dan Lomba Jalan (8 adegan) |

Mesin: `mesin-rasio-k6b2.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b2.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-rasio-k6b2.tsx` (titik benda emas dan ungu yang dihitung satu per satu, kelompok sama isi untuk penyederhanaan, kotak rasio, dan pilihan tiga jawaban). Data ringkas Mind-Map dan Infografis: `src/data/kelas6-bab2-ringkas.json`. Uji: `scripts/uji-lab-k6b2.mjs`.

Model gambar C: `model-bagian-k6b2.tsx` (batang a + b petak sama besar yang memuat nilai satu bagian, dan garis waktu satu jam yang terbagi blok sama panjang). Mesin C: `mesin-bagian-k6b2.ts`.

Model gambar B: `model-senilai-k6b2.tsx` (pecahan bertumpuk, tabel kali dua baris, dan kotak satuan). Mesin B: `mesin-senilai-k6b2.ts`.

Metode luar buku yang dianyam. C: Additive Parts Sum (Bagian: jumlahkan suku rasio menjadi banyak bagian, seluruhnya dibagi banyak bagian, lalu kalikan dengan suku), Part-to-Whole Ratio (Total: bagian terhadap seluruhnya ditulis a : (a + b), dibedakan dari a : b), dan Time-Rate Conversion (Waktu: samakan satuan jam dan menit, cari laju per jam, menit untuk target, dan hasil dalam durasi menit). B: Equivalent Ratio Table (Tabel: kedua suku dikali bilangan sama, menambah bilangan sama ditolak, lalu baris baru disederhanakan kembali), Fraction-Equivalence Bridge (Jembatan: rasio a : b sebagai pecahan, pecahan senilai dengan pengali sama, dicek dengan perkalian silang), dan Unit Rate Method (Satuan: nilai untuk satu satuan, hitung target, lalu bandingkan dengan pembanding). A: Part-to-Part Ratio Language (Tulis: hitung dua jenis benda, tulis a : b, baca "setiap a ada b"), GCF Simplify Ratio (Sederhana: pilih FPB, bagi suku kiri lalu suku kanan, kelompok sama isi tampak di gambar), dan Ordered-Ratio Protocol (Arah: ka terhadap kb ditulis a : b, kb terhadap ka ditulis b : a, maknanya berbeda).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tulis: 4 pucuk merah dan 6 cemara, rasio 4 : 6 dan kalimat bacaannya; Tulis: 2 pucuk merah dan 3 cemara, rasio 2 : 3 dan kalimatnya; Sederhana: 4 : 6 dengan FPB 2 menjadi 2 : 3; Sederhana: 6 : 9 dengan FPB 3 menjadi 2 : 3; Arah: 2 : 3 lalu dibalik 3 : 2 dan maknanya berbeda | Tulis: keenam soal; Sederhana: keenam soal; Arah: keenam soal |
| B | Tabel: 10 : 12 dikali 5 menjadi 50 : 60; Tabel: 5 : 6 menjadi 25 : 30 (pengali, bukan tambahan); Jembatan: 10/12 = 30/36 dengan pengali 3 dan perkalian silang; Satuan: paket 5 bibit Rp40.000 menjadi Rp8.000 per bibit; Satuan: paket A (Rp8.000) dan paket B (Rp7.000) dibanding pembandingnya | Tabel: keenam soal; Jembatan: keenam soal; Satuan: keenam soal |
| C | Bagian: 4 : 5 dengan 72 bibit (9 bagian, 8 per bagian, 32 dan 40); Bagian: 9 : 4 dengan 390 pengunjung (13 bagian, 30 per bagian, 270 dan 120); Total: 4 : 9 dan 5 : 9, berbeda dari 4 : 5; Waktu: 1 km per 30 menit menjadi 2 km per jam dan 9 km butuh 270 menit; Waktu: 1200 kata per jam, 3000 kata butuh 150 menit dan 180 menit menghasilkan 3600 kata | Bagian: keenam soal; Total: keenam soal; Waktu: keenam soal |

Near-miss tidak memenuhi misi: rasio dipilih sebelum semua benda terhitung (satu jenis kurang satu), kalimat sebelum rasio, rasio terbalik atau jumlah, kalimat dengan angka atau jenis tertukar, Sederhana tanpa memilih FPB, FPB yang salah, suku kanan yang salah, Arah yang berhenti di tahap tengah, makna "sama", dan riwayat pada soal lain. B: Tabel tanpa memilih pengali, pengali tambahan, hasil sederhana salah, Jembatan dengan pecahan tambah sama atau perkalian silang salah, Satuan tanpa nilai satuan, perbandingan salah, hanya paket A atau hanya paket B untuk misi hemat, dan riwayat pada soal lain. C: Bagian tanpa jumlah bagian, jumlah bagian dikali (bukan dijumlah), benda kedua yang salah, Total dengan 4 : 5 sebagai rasio terhadap seluruhnya, penjelasan beda yang salah, Waktu tanpa menyamakan satuan, hasil durasi yang salah, dan riwayat pada soal lain.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Rasio (A) | Tulis → Baca → Pembagi → Hasil | Bibit Pohon (4 : 6 = 2 : 3), Rak Buah (9 : 12 = 3 : 4), Pot Bunga (10 : 4 = 5 : 2) |
| Mesin Senilai (B) | Pengali → Isi → Senilai → Satuan | Lahan Bibit (10 : 12 dikali 5 = 50 : 60, 10/12 senilai 30/36, Rp40.000 untuk 5 bibit = Rp8.000), Kopi Wedang (5 : 6 dikali 5 = 25 : 30, 1/2 tidak senilai 4/10, 12 bibit dalam 3 jam = 4 bibit), Adonan Kue (2 : 3 dikali 4 = 8 : 12, 2/3 senilai 8/12, Rp60.000 untuk 3 kg = Rp20.000) |
| Mesin Bagian (C) | Jumlah → Satu bagian → Bagian → Waktu | Penjualan Bibit (4 : 5, 72 ÷ 9 = 8, hias 32; 1 km per 30 menit = 2 km per jam), Pasar Malam (9 : 4, 390 ÷ 13 = 30, anak-anak 270; 9 km = 270 menit), Karangan Bunga (3 : 7, 60 ÷ 10 = 6, bunga merah 18; 1200 kata per jam, 180 menit = 3600 kata) |

Pengecoh dihitung dari kesalahan khas: urutan terbalik atau jumlah (Tulis), angka atau jenis benda tertukar (Baca), dua kali FPB atau satu lebihnya, yang tidak membagi habis kedua suku (Pembagi), dan hanya satu suku yang dibagi (Hasil). Letak kunci bervariasi (diputar, diuji eksak).

Pengecoh B: ditambah atau dibagi (Pengali), ditambah selisih sama atau satu pengali lebih (Isi), "karena angkanya sama-sama naik" dan perkalian silang yang dibalik (Senilai, kunci dihitung dari perkalian silang), nilai seluruhnya atau banyak satuan (Satuan). Pengecoh C: suku dikali atau hanya suku pertama (Jumlah), seluruhnya tanpa dibagi (Satu bagian), suku ditambahkan atau benda tertukar (Bagian), serta satuan yang tidak diubah ke menit atau tidak dikali (Waktu).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Artus, Pasar Malam, dan Lomba Jalan (C) | 8 | Narasi 72 bibit dengan rasio 4 : 5; Additive Parts Sum (4 + 5 = 9 bagian, pengecoh 20); ketuk 9 stik dan 72 ÷ 9 = 8; Part-to-Whole Ratio (4 : 9, bibit hias 32); pasar malam 9 : 4 dengan 390 pengunjung = 270 anak-anak; isi 2 stik untuk 2 km per jam (1 km per 30 menit); Time-Rate Conversion (9 km = 270 menit, 3 jam mengetik = 3600 kata); penutup. |
| Artus, Resep, dan Paket Bibit (B) | 8 | Narasi 10 m² : 12 bibit; Equivalent Ratio Table (50 m² dengan 60 bibit, pengecoh tambah 5); ketuk 5 stik untuk 5 kelompok; Fraction-Equivalence Bridge (10/12 = 30/36 dan 5/6); Unit Rate Method (Rp40.000 untuk 5 bibit = Rp8.000 per bibit); isi 4 stik untuk 4 bibit per jam; memperbaiki "4 : 6 menjadi 6 : 8 dengan menambah 2"; penutup. |
| Artus dan Lahan Bibit (A) | 8 | Narasi 4 pucuk merah dan 6 cemara; Part-to-Part (setiap 4 pucuk merah ada 6 cemara); ketuk 4 stik; GCF Simplify (4 : 6 dan 6 : 9 menjadi 2 : 3); isi 2 stik untuk satu kelompok 2 : 3; Ordered-Ratio (cemara terhadap pucuk merah 3 : 2); memperbaiki tulisan "2 : 3 sama dengan 3 : 2"; penutup. |

## Kejujuran konsep

- Tulis: benda dihitung satu per satu sampai jumlah tiap jenis cocok; rasio baru bisa dipilih setelah semua benda lengkap, kalimat setelah rasio. Setelah rasio ditulis, menambah benda tidak mengubah keadaan.
- Sederhana: urutan wajib FPB, suku kiri, suku kanan. Pengecoh FPB bukan pembagi yang membagi habis kedua suku (diuji: hanya satu pilihan yang membagi habis). Hasil benar-satunya yang setara lewat perkalian silang.
- Arah: urutan wajib rasio pertama, rasio balik, lalu makna berbeda; riwayat hanya dicatat setelah makna "berbeda" dipilih.
- FPB di uji dihitung mandiri dengan mencoba semua pembagi dari yang terbesar, kesamaan rasio lewat perkalian silang (a*d = b*c), berbeda dari algoritma Euclid di kode.
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa tabel rasio, senilai, jembatan pecahan, harga atau waktu per satuan, bagian terhadap keseluruhan, dan durasi.
- Tabel: pengali, suku kanan, lalu sederhana kembali; pengecoh tambah selisih sama ditolak dengan alasan. Jembatan: pecahan senilai, pengali, lalu perkalian silang (dihitung mandiri: hanya pecahan senilai yang setara; pecahan tambah sama dan terbalik tidak). Satuan: nilai satuan, target, lalu perbandingan hemat atau cepat; nilai satuan bulat dan tidak sama dengan pembanding.
- Konsep Sub-Bab C tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa bagian terhadap keseluruhan, jumlah bagian, dan konversi durasi waktu.
- Bagian: urutan wajib jumlah bagian, satu bagian, benda pertama, benda kedua; hasil dicek (dua bagian dijumlah sama dengan seluruhnya). Seluruhnya selalu habis dibagi jumlah suku. Total: bagian terhadap seluruhnya a : (a + b), lalu penjelasan beda dari a : b; pengecoh 4 : 5 ditolak dengan alasan. Waktu: 1 jam = 60 menit, laju per jam, menit untuk target, dan hasil dalam durasi; laju, menit, dan hasil dihitung mandiri dengan mencari bilangan yang memenuhi persamaan, dan semua soal bulat (60 dan durasi habis dibagi menit dasar).
- Sub-Bab C boleh menyentuh A dan B (rasio, nilai satuan, kali kedua suku); bab berikutnya tidak disentuh.
- Fuzz 20.000 aksi Lab Rasio, Lab Senilai, dan Lab Bagian: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri mencatat tiap tahap dari rencana). Indeks pecahan, negatif, dan di luar batas diabaikan.
- Emoji: paling baru Emoji 12 dan tanpa urutan ZWJ (diuji pada semua berkas simulasi dan data ringkas). Materi Bab 2 bersih dari emoji di atas Emoji 12. Pendaftaran bab diuji: `mtk-6-bab2` muncul tiga kali di `registri-simulasi.ts` (materi, misi awal, ringkas) dan satu kali di `registri-bab-baru.ts`.
- Temuan Materi (hanya dilaporkan, tidak diubah): Sub-Bab B memuat angka tidak bulat (Rp16.667 per bibit), Sub-Bab C memuat "4,5 jam" (simulasi memakai kasus bulat dan satuan menit), infografis A memuat sisa templat "Rasio peluang = favorable ÷ total", dan beberapa ronde sortir B memakai label "lancip/tumpul" (sisa templat sudut).
