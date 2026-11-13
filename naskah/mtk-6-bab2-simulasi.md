# Matematika Kelas 6 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: Rasio (`mtk-6-bab2`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab2`). Komponen: `src/components/modul/SimulasiK6Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab2.ts`, teks misi di `misi-teks-k6b2.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir).

Bab ini punya **tiga sub-bab**: A (Konsep Rasio, hlm. 64-69), B (Kesamaan Rasio, hlm. 70-79), dan C (Penerapan Rasio, hlm. 80-88). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A (Sub-Bab A, Konsep Rasio) selesai. Gelombang B dan C menyusul. Bab belum didaftarkan di registri.**

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

Bilangan 1 sampai 999.999, semua rasio a : b dengan a dan b sampai 40 (dengan dan tanpa spasi), semua pecahan a/b sampai 30, dan uang kelipatan seribu diuji terhadap hitungan mandiri per digit di skrip uji. Titik dua di tengah kalimat (misalnya "Soal bibit: 4 : 6") tidak dianggap rasio. Tokoh skenario: Artus, yang menata bibit di lahan (tokoh dari Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Rasio (Tulis, Sederhana, Arah) | `SimulasiLabRasioK6B2.tsx` + `lab-rasio-k6b2a.ts` | Mesin Rasio | Artus dan Lahan Bibit (8 adegan) |

Mesin: `mesin-rasio-k6b2.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b2.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-rasio-k6b2.tsx` (titik benda emas dan ungu yang dihitung satu per satu, kelompok sama isi untuk penyederhanaan, kotak rasio, dan pilihan tiga jawaban). Data ringkas Mind-Map dan Infografis: `src/data/kelas6-bab2-ringkas.json`. Uji: `scripts/uji-lab-k6b2.mjs`.

Metode luar buku yang dianyam. A: Part-to-Part Ratio Language (Tulis: hitung dua jenis benda, tulis a : b, baca "setiap a ada b"), GCF Simplify Ratio (Sederhana: pilih FPB, bagi suku kiri lalu suku kanan, kelompok sama isi tampak di gambar), dan Ordered-Ratio Protocol (Arah: ka terhadap kb ditulis a : b, kb terhadap ka ditulis b : a, maknanya berbeda).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tulis: 4 pucuk merah dan 6 cemara, rasio 4 : 6 dan kalimat bacaannya; Tulis: 2 pucuk merah dan 3 cemara, rasio 2 : 3 dan kalimatnya; Sederhana: 4 : 6 dengan FPB 2 menjadi 2 : 3; Sederhana: 6 : 9 dengan FPB 3 menjadi 2 : 3; Arah: 2 : 3 lalu dibalik 3 : 2 dan maknanya berbeda | Tulis: keenam soal; Sederhana: keenam soal; Arah: keenam soal |

Near-miss tidak memenuhi misi: rasio dipilih sebelum semua benda terhitung (satu jenis kurang satu), kalimat sebelum rasio, rasio terbalik atau jumlah, kalimat dengan angka atau jenis tertukar, Sederhana tanpa memilih FPB, FPB yang salah, suku kanan yang salah, Arah yang berhenti di tahap tengah, makna "sama", dan riwayat pada soal lain.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Rasio (A) | Tulis → Baca → Pembagi → Hasil | Bibit Pohon (4 : 6 = 2 : 3), Rak Buah (9 : 12 = 3 : 4), Pot Bunga (10 : 4 = 5 : 2) |

Pengecoh dihitung dari kesalahan khas: urutan terbalik atau jumlah (Tulis), angka atau jenis benda tertukar (Baca), dua kali FPB atau satu lebihnya, yang tidak membagi habis kedua suku (Pembagi), dan hanya satu suku yang dibagi (Hasil). Letak kunci bervariasi (diputar, diuji eksak).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Artus dan Lahan Bibit (A) | 8 | Narasi 4 pucuk merah dan 6 cemara; Part-to-Part (setiap 4 pucuk merah ada 6 cemara); ketuk 4 stik; GCF Simplify (4 : 6 dan 6 : 9 menjadi 2 : 3); isi 2 stik untuk satu kelompok 2 : 3; Ordered-Ratio (cemara terhadap pucuk merah 3 : 2); memperbaiki tulisan "2 : 3 sama dengan 3 : 2"; penutup. |

## Kejujuran konsep

- Tulis: benda dihitung satu per satu sampai jumlah tiap jenis cocok; rasio baru bisa dipilih setelah semua benda lengkap, kalimat setelah rasio. Setelah rasio ditulis, menambah benda tidak mengubah keadaan.
- Sederhana: urutan wajib FPB, suku kiri, suku kanan. Pengecoh FPB bukan pembagi yang membagi habis kedua suku (diuji: hanya satu pilihan yang membagi habis). Hasil benar-satunya yang setara lewat perkalian silang.
- Arah: urutan wajib rasio pertama, rasio balik, lalu makna berbeda; riwayat hanya dicatat setelah makna "berbeda" dipilih.
- FPB di uji dihitung mandiri dengan mencoba semua pembagi dari yang terbesar, kesamaan rasio lewat perkalian silang (a*d = b*c), berbeda dari algoritma Euclid di kode.
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa tabel rasio, senilai, jembatan pecahan, harga atau waktu per satuan, bagian terhadap keseluruhan, dan durasi.
- Fuzz 20.000 aksi Lab Rasio: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri mencatat tiap tahap dari rencana). Indeks pecahan, negatif, dan di luar batas diabaikan.
- Emoji: paling baru Emoji 12 dan tanpa urutan ZWJ (diuji pada semua berkas simulasi dan data ringkas). Materi Bab 2 bersih dari emoji di atas Emoji 12.
- Temuan Materi (hanya dilaporkan, tidak diubah): Sub-Bab B memuat angka tidak bulat (Rp16.667 per bibit), Sub-Bab C memuat "4,5 jam" (simulasi memakai kasus bulat dan satuan menit), infografis A memuat sisa templat "Rasio peluang = favorable ÷ total", dan beberapa ronde sortir B memakai label "lancip/tumpul" (sisa templat sudut).
