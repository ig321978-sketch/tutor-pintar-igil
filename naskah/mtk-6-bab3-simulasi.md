# Matematika Kelas 6 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Bab: Kubus dan Balok (`mtk-6-bab3`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab3`). Komponen: `src/components/modul/SimulasiK6Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab3.ts`, teks misi di `misi-teks-k6b3.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir).

Bab ini punya **tiga sub-bab**: A (Mengonstruksi dan Mengurai, hlm. 94-98), B (Visualisasi Spasial, hlm. 99-104), dan C (Lokasi, hlm. 105-112). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A selesai (Mengonstruksi dan Mengurai). Bab `mtk-6-bab3` BELUM terdaftar di `registri-simulasi.ts` (didaftarkan di gelombang C).**

Berkas Materi bab ini tidak diubah (`SubBabK6B3A-C.tsx`, `naskah-k6b3.ts`, `data-k6b3.ts`, `paket-k6b3.ts`, dan lainnya). Pengeja suara memakai `ejaK6B3` (berkas baru `eja-k6b3.ts`) lewat prop `eja` mesin dan di lab.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `2 × 2 × 2 = 8` | dua kali dua kali dua sama dengan delapan |
| `5×3×2` (tanpa spasi) / `3 x 3` | lima kali tiga kali dua / tiga kali tiga |
| `C2`, `A3 ke E5` | ce dua, a tiga ke e lima |
| huruf tunggal `A` sampai `H` | a, be, ce, de, e, ef, ge, ha |
| `Lantai 2`, `Bentuk L` | Lantai dua, Bentuk L (huruf di luar A sampai H dan kata berhuruf besar tidak diubah) |
| `6 − 2 = 4` | enam dikurangi dua sama dengan empat |
| `(3)`, `…` | kurung buka tiga kurung tutup, titik-titik |

Bilangan 0 sampai 9.999 diuji terhadap hitungan mandiri per digit di skrip uji. Materi bab ini tidak memakai satuan panjang (cm, m) maupun pangkat, hanya "kubus satuan" dan "P × L × T", sehingga pengeja tidak menangani satuan. Tokoh skenario: Tigor dan Tenri (Sub-Bab A dan C), Anike (Sub-Bab B), semuanya tokoh dari Materi.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Susunan (Susun, Lapisan, Penyangga) | `SimulasiLabSusunanK6B3.tsx` + `lab-susunan-k6b3a.ts` | Mesin Susunan | Tigor dan Tenri Susun Rumah Kubus (8 adegan) |

Mesin: `mesin-susunan-k6b3.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b3.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-susunan-k6b3.tsx` (tumpukan kubus isometrik dengan tiap kubus digambar satu per satu, kisi per lantai, garis putus merah untuk kubus yang melayang, dan pilihan tiga jawaban). Data ringkas Mind-Map dan Infografis: `src/data/kelas6-bab3-ringkas.json`. Uji: `scripts/uji-lab-k6b3.mjs`.

Metode luar buku yang dianyam. A: Construct-Decompose Protocol (Susun: hitung semua kubus yang tersusun termasuk yang tertutup, cari kubus yang kurang untuk kubus atau balok target, lalu urai lantai teratas dan hitung sisanya), Layer Counting Method (Lapisan: kubus satu lantai penuh p × l, seluruh kubus dikali banyak lantai, lalu sisa bila satu lantai dilepas), dan Hidden Support Rule (Penyangga: cacah kubus lantai kedua yang melayang, putuskan boleh dibangun atau tambah penyangga dulu, lalu hitung seluruh kubus sesudah susunan sah).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Susun: bentuk L (3 kubus, kurang 5 untuk 2 × 2 × 2, sisa 2 sesudah lantai teratas dilepas); Lapisan: kubus kecil 2 × 2 × 2 (4 per lantai, 8, sisa 4); Lapisan: balok kardus 5 × 3 × 2 (15 per lantai, 30, sisa 15); Penyangga: dua kubus bertumpu (sah, 3 kubus); Penyangga: kubus di sudut kosong (1 melayang, tambah penyangga, 5 kubus) | Susun: keenam soal; Lapisan: keenam soal; Penyangga: keenam soal |

Tujuh misi wajib A: lima dari lab di atas, Mesin Susunan, dan skenario Tigor dan Tenri Susun Rumah Kubus. Near-miss tidak memenuhi misi: soal lain pada tampilan yang sama, soal bernomor sama pada tampilan lain, riwayat kosong, alat lain dengan id sama, dan keadaan selesai dengan id sama.

## Soal lab A (enam per tampilan, id `susun:0-5`, `lapisan:0-5`, `penyangga:0-5`)

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Susun | dua kubus ditumpuk (2, kurang 6, sisa 1); bentuk L (3, 5, 2); tangga tiga lantai (6, kurang 6 untuk balok 3 × 2 × 2 = 12, sisa 5); menara kecil (7, 5, 6); kubus penuh 2 × 2 × 2 (8, kurang 10 untuk 3 × 3 × 2 = 18, sisa 4); balok rendah 3 × 2 × 2 (12, kurang 15 untuk 3 × 3 × 3 = 27, sisa 6) | seluruh kubus tersusun, kubus yang kurang, kubus tersisa sesudah lantai teratas diurai |
| Lapisan | 2 × 2 × 2 (4, 8, 4); 3 × 3 × 3 (9, 27, 18); 5 × 3 × 2 (15, 30, 15); 2 × 3 × 4 (6, 24, 18); 4 × 4 × 2 (16, 32, 16); 4 × 3 × 3 (12, 36, 24) | kubus satu lantai, seluruh kubus, kubus tersisa sesudah satu lantai dilepas |
| Penyangga | tiga susunan sah dan tiga melayang (melayang 0, 1, 0, 1, 0, 2; total sah 3, 5, 5, 4, 6, 6) | kubus melayang, keputusan (boleh dibangun, tambah penyangga dulu, atau biarkan), seluruh kubus sesudah susunan sah |

Pengecoh dihitung dari kesalahan khas: hanya lantai dasar, tanpa lantai teratas, atau satu lebih (Hitung); ukuran target utuh atau kubus yang sudah ada (Kurang); total semula atau lantai teratas (Urai); jumlah ukuran atau ukuran kali tinggi (Dasar); lantai dasar saja atau jumlah ketiga ukuran (Total); jumlah mentah tanpa penyangga (Total penyangga). Bila calon habis atau ganda, dipakai bilangan di sekitar kunci, sehingga tidak pernah ada pilihan ganda. Letak kunci diputar (seed berbeda tiap tahap) dan diuji eksak.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Susunan (A) | Hitung → Lapisan → Penyangga → Urai | Rumah Dadu (3 × 2 × 2: 6 per lantai, 12, 1 dari 3 melayang, sisa 6), Gudang Kardus (4 × 3 × 2: 12, 24, 2 dari 5 melayang, sisa 12), Menara Balok (2 × 2 × 3: 4, 12, 2 dari 3 melayang, sisa 8) |

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Tigor dan Tenri Susun Rumah Kubus (A) | 8 | Narasi rumah kubus; Construct-Decompose Protocol (bentuk L: dua kubus berdampingan dan satu naik); ketuk 3 stik; Layer Counting Method (lantai 3 × 2 = 6 dan dua lantai = 12); isi 6 stik untuk lantai kedua; Hidden Support Rule (tambah penyangga dulu); menara 4 + 2 = 6 kubus dan sisa 4 sesudah lantai teratas dilepas; penutup memuat tiga metode luar |

Jenis adegan: narasi, pilih, hitung, soal, isi, akhir (6 jenis); batas jawaban numerik di `uji-skenario-umum.mjs` 100. Letak jawaban benar bervariasi.

## Kejujuran konsep

- Susun: urutan wajib hitung, kurang, urai; riwayat hanya dicatat setelah urai benar. Kubus yang tertutup tetap dihitung, kebutuhan target dikurangi kubus yang sudah ada.
- Lapisan: urutan wajib dasar, total, sisa; riwayat setelah sisa benar. Hitungan mandiri di uji: tiap kubus satuan dicacah satu per satu pada himpunan (x, y, z) dengan tiga lingkaran, bukan rumus p × l × t di kode.
- Penyangga: urutan wajib melayang, keputusan, total; riwayat setelah total benar. Hitungan mandiri di uji: tiap kubus diperiksa apakah kubus di bawahnya ada (himpunan), penyangga ditambah per kubus, lalu dicacah ulang. Keputusan benar bergantung pada jumlah melayang (0 = boleh dibangun).
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa tampak depan, samping, dan atas, siluet, proyeksi, matriks, maksimum, koordinat dan huruf-angka, jarak, jalur, denah, dan lokasi. Lantai atas disebut "lantai teratas" atau "lantai kedua".
- Fuzz 20.000 aksi Lab Susunan: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri mencatat tiap tahap dari cacahan kubus). Indeks pecahan, negatif, di luar batas, `NaN`, dan bukan angka diabaikan (keadaan identik). Pesan sukses lab diawali "✅ " dan hanya bila langkah benar; pesan petunjuk tidak diawali "✅".
- Emoji: paling baru Emoji 12 dan tanpa urutan ZWJ (diuji pada semua berkas simulasi dan data ringkas). Materi Bab 3 bersih dari emoji di atas Emoji 12.
- Temuan Materi (hanya dilaporkan, tidak diubah): infografis A "Siap B" memuat sisa templat peluang; ronde sortir B memakai label bin "lancip/tumpul" (sisa templat sudut); glyph "ʟ" (U+029F) bukan emoji; Sub-Bab C memakai |E−A| tanpa menyatakan A = 1.

## Uji

`node --no-warnings scripts/uji-lab-k6b3.mjs`: data soal diketik ulang dan dicacah mandiri, pengecoh persis dari calon kesalahan khas, letak kunci eksak, alur tiap soal (salah, melompat, indeks tak sah, sesudah selesai), fuzz 20.000 aksi, mesin, skenario, misi (near-miss, tantangan, gerbang), pengeja (0 sampai 9.999), data ringkas, konsep tidak bocor, emoji dan akhir baris. Uji mutasi dijalankan lewat skrip sementara (di luar repo) pada pohon salinan.
