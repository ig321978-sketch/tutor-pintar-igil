# Matematika Kelas 6 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: Rasio (`mtk-6-bab2`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab2`). Komponen: `src/components/modul/SimulasiK6Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab2.ts`, teks misi di `misi-teks-k6b2.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir).

Bab ini punya **tiga sub-bab**: A (Konsep Rasio, hlm. 64-69), B (Kesamaan Rasio, hlm. 70-79), dan C (Penerapan Rasio, hlm. 80-88). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A (Konsep Rasio) dan B (Kesamaan Rasio) selesai. Gelombang C menyusul. Bab belum didaftarkan di registri.**

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

Bilangan 1 sampai 999.999, semua rasio a : b dengan a dan b sampai 40 (dengan dan tanpa spasi), semua pecahan a/b sampai 30, dan uang kelipatan seribu diuji terhadap hitungan mandiri per digit di skrip uji. Titik dua di tengah kalimat (misalnya "Soal bibit: 4 : 6") tidak dianggap rasio. Tokoh skenario: Artus, yang menata bibit di lahan (tokoh dari Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Rasio (Tulis, Sederhana, Arah) | `SimulasiLabRasioK6B2.tsx` + `lab-rasio-k6b2a.ts` | Mesin Rasio | Artus dan Lahan Bibit (8 adegan) |
| B | Lab Senilai (Tabel, Jembatan, Satuan) | `SimulasiLabSenilaiK6B2.tsx` + `lab-senilai-k6b2b.ts` | Mesin Senilai | Artus, Resep, dan Paket Bibit (8 adegan) |

Mesin: `mesin-rasio-k6b2.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b2.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-rasio-k6b2.tsx` (titik benda emas dan ungu yang dihitung satu per satu, kelompok sama isi untuk penyederhanaan, kotak rasio, dan pilihan tiga jawaban). Data ringkas Mind-Map dan Infografis: `src/data/kelas6-bab2-ringkas.json`. Uji: `scripts/uji-lab-k6b2.mjs`.

Model gambar B: `model-senilai-k6b2.tsx` (pecahan bertumpuk, tabel kali dua baris, dan kotak satuan). Mesin B: `mesin-senilai-k6b2.ts`.

Metode luar buku yang dianyam. B: Equivalent Ratio Table (Tabel: kedua suku dikali bilangan sama, menambah bilangan sama ditolak, lalu baris baru disederhanakan kembali), Fraction-Equivalence Bridge (Jembatan: rasio a : b sebagai pecahan, pecahan senilai dengan pengali sama, dicek dengan perkalian silang), dan Unit Rate Method (Satuan: nilai untuk satu satuan, hitung target, lalu bandingkan dengan pembanding). A: Part-to-Part Ratio Language (Tulis: hitung dua jenis benda, tulis a : b, baca "setiap a ada b"), GCF Simplify Ratio (Sederhana: pilih FPB, bagi suku kiri lalu suku kanan, kelompok sama isi tampak di gambar), dan Ordered-Ratio Protocol (Arah: ka terhadap kb ditulis a : b, kb terhadap ka ditulis b : a, maknanya berbeda).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tulis: 4 pucuk merah dan 6 cemara, rasio 4 : 6 dan kalimat bacaannya; Tulis: 2 pucuk merah dan 3 cemara, rasio 2 : 3 dan kalimatnya; Sederhana: 4 : 6 dengan FPB 2 menjadi 2 : 3; Sederhana: 6 : 9 dengan FPB 3 menjadi 2 : 3; Arah: 2 : 3 lalu dibalik 3 : 2 dan maknanya berbeda | Tulis: keenam soal; Sederhana: keenam soal; Arah: keenam soal |
| B | Tabel: 10 : 12 dikali 5 menjadi 50 : 60; Tabel: 5 : 6 menjadi 25 : 30 (pengali, bukan tambahan); Jembatan: 10/12 = 30/36 dengan pengali 3 dan perkalian silang; Satuan: paket 5 bibit Rp40.000 menjadi Rp8.000 per bibit; Satuan: paket A (Rp8.000) dan paket B (Rp7.000) dibanding pembandingnya | Tabel: keenam soal; Jembatan: keenam soal; Satuan: keenam soal |

Near-miss tidak memenuhi misi: rasio dipilih sebelum semua benda terhitung (satu jenis kurang satu), kalimat sebelum rasio, rasio terbalik atau jumlah, kalimat dengan angka atau jenis tertukar, Sederhana tanpa memilih FPB, FPB yang salah, suku kanan yang salah, Arah yang berhenti di tahap tengah, makna "sama", dan riwayat pada soal lain. B: Tabel tanpa memilih pengali, pengali tambahan, hasil sederhana salah, Jembatan dengan pecahan tambah sama atau perkalian silang salah, Satuan tanpa nilai satuan, perbandingan salah, hanya paket A atau hanya paket B untuk misi hemat, dan riwayat pada soal lain.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Rasio (A) | Tulis → Baca → Pembagi → Hasil | Bibit Pohon (4 : 6 = 2 : 3), Rak Buah (9 : 12 = 3 : 4), Pot Bunga (10 : 4 = 5 : 2) |
| Mesin Senilai (B) | Pengali → Isi → Senilai → Satuan | Lahan Bibit (10 : 12 dikali 5 = 50 : 60, 10/12 senilai 30/36, Rp40.000 untuk 5 bibit = Rp8.000), Kopi Wedang (5 : 6 dikali 5 = 25 : 30, 1/2 tidak senilai 4/10, 12 bibit dalam 3 jam = 4 bibit), Adonan Kue (2 : 3 dikali 4 = 8 : 12, 2/3 senilai 8/12, Rp60.000 untuk 3 kg = Rp20.000) |

Pengecoh dihitung dari kesalahan khas: urutan terbalik atau jumlah (Tulis), angka atau jenis benda tertukar (Baca), dua kali FPB atau satu lebihnya, yang tidak membagi habis kedua suku (Pembagi), dan hanya satu suku yang dibagi (Hasil). Letak kunci bervariasi (diputar, diuji eksak).

Pengecoh B: ditambah atau dibagi (Pengali), ditambah selisih sama atau satu pengali lebih (Isi), "karena angkanya sama-sama naik" dan perkalian silang yang dibalik (Senilai, kunci dihitung dari perkalian silang), nilai seluruhnya atau banyak satuan (Satuan).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
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
- Fuzz 20.000 aksi Lab Rasio dan Lab Senilai: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri mencatat tiap tahap dari rencana). Indeks pecahan, negatif, dan di luar batas diabaikan.
- Emoji: paling baru Emoji 12 dan tanpa urutan ZWJ (diuji pada semua berkas simulasi dan data ringkas). Materi Bab 2 bersih dari emoji di atas Emoji 12.
- Temuan Materi (hanya dilaporkan, tidak diubah): Sub-Bab B memuat angka tidak bulat (Rp16.667 per bibit), Sub-Bab C memuat "4,5 jam" (simulasi memakai kasus bulat dan satuan menit), infografis A memuat sisa templat "Rasio peluang = favorable ÷ total", dan beberapa ronde sortir B memakai label "lancip/tumpul" (sisa templat sudut).
