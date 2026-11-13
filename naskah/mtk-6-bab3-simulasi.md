# Matematika Kelas 6 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Bab: Kubus dan Balok (`mtk-6-bab3`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab3`). Komponen: `src/components/modul/SimulasiK6Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab3.ts`, teks misi di `misi-teks-k6b3.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir) dan kini terdaftar.

Bab ini punya **tiga sub-bab**: A (Mengonstruksi dan Mengurai, hlm. 94-98), B (Visualisasi Spasial, hlm. 99-104), dan C (Lokasi, hlm. 105-112). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: ketiga gelombang selesai (A Mengonstruksi dan Mengurai, B Visualisasi Spasial, C Lokasi). Bab `mtk-6-bab3` terdaftar di `registri-simulasi.ts` (tiga kemunculan: materi, misi awal, ringkas).**

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
| B | Lab Tampak (Matriks, Tampak, Atas) | `SimulasiLabTampakK6B3.tsx` + `lab-tampak-k6b3b.ts` | Mesin Tampak | Anike Menggambar Tiga Arah (8 adegan) |
| C | Lab Petak (Lokasi, Jarak, Jalur) | `SimulasiLabPetakK6B3.tsx` + `lab-petak-k6b3c.ts` | Mesin Petak | Tigor dan Tenri di Denah Kelas (8 adegan) |

Mesin: `mesin-susunan-k6b3.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b3.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-susunan-k6b3.tsx` (tumpukan kubus isometrik dengan tiap kubus digambar satu per satu, kisi per lantai, garis putus merah untuk kubus yang melayang, dan pilihan tiga jawaban). Model gambar B: `model-tampak-k6b3.tsx` (tumpukan kubus isometrik dari matriks tinggi dengan baris depan paling dekat, kisi tinggi tiap petak, dan tiga tampak datar yang dibangun dari himpunan petak kubus). Mesin B: `mesin-tampak-k6b3.ts`. Model gambar C: `model-petak-k6b3.tsx` (kisi 6 kali 6 dengan huruf A sampai F menurun di sisi kiri, angka 1 sampai 6 mendatar di sisi atas, titik berhuruf, dan jalur lurus mendatar dulu lalu menurun atau menaik). Mesin C: `mesin-petak-k6b3.ts`. Data ringkas Mind-Map dan Infografis: `src/data/kelas6-bab3-ringkas.json`. Uji: `scripts/uji-lab-k6b3.mjs`.

Metode luar buku yang dianyam. A: Construct-Decompose Protocol (Susun: hitung semua kubus yang tersusun termasuk yang tertutup, cari kubus yang kurang untuk kubus atau balok target, lalu urai lantai teratas dan hitung sisanya), Layer Counting Method (Lapisan: kubus satu lantai penuh p × l, seluruh kubus dikali banyak lantai, lalu sisa bila satu lantai dilepas), dan Hidden Support Rule (Penyangga: cacah kubus lantai kedua yang melayang, putuskan boleh dibangun atau tambah penyangga dulu, lalu hitung seluruh kubus sesudah susunan sah).

Metode luar B: Height-Matrix Silhouette (Matriks: catat tinggi baris depan, baris belakang, lalu jumlahkan semua tinggi), Occlusion Max Rule (Tampak: dari depan tiap kolom, dari samping tiap baris menampilkan tinggi terbesar, lalu jumlahkan), dan Orthographic Projection Protocol (Atas: dari atas hanya petak terisi yang terlihat, tinggi tidak, lalu pilih susunan yang cocok dengan ketiga tampak).

Metode luar C: Grid Coordinate Naming (Lokasi: huruf baris dibaca dari sisi kiri, angka kolom dari sisi atas, ditulis huruf dulu lalu angka, misalnya C2), Manhattan Path Distance (Jarak: selisih huruf dihitung sebagai langkah petak, ditambah selisih angka, hanya gerak kanan, kiri, naik, atau turun), dan Shortest Grid Path (Jalur: langkah terpendek, jalur yang sah, lalu banyak jalur yang sama pendek dengan menambah dua tetangga di tiap petak).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Susun: bentuk L (3 kubus, kurang 5 untuk 2 × 2 × 2, sisa 2 sesudah lantai teratas dilepas); Lapisan: kubus kecil 2 × 2 × 2 (4 per lantai, 8, sisa 4); Lapisan: balok kardus 5 × 3 × 2 (15 per lantai, 30, sisa 15); Penyangga: dua kubus bertumpu (sah, 3 kubus); Penyangga: kubus di sudut kosong (1 melayang, tambah penyangga, 5 kubus) | Susun: keenam soal; Lapisan: keenam soal; Penyangga: keenam soal |
| B | Matriks: contoh Anike [[2,1],[3,4]] (10 kubus); Tampak: depan [[1,2],[3,1]] (3 dan 2, 5 petak); Tampak: samping [[2,1],[1,2]] (2 dan 2, 4 petak); Atas: empat kubus ditumpuk (1 petak dari atas, 4 kubus); Atas: rekonstruksi contoh Anike (depan 7, samping 6, atas 4) | Matriks: keenam soal; Tampak: keenam soal; Atas: keenam soal |
| C | Lokasi: Makassar di C2 (huruf dulu, bukan 2C); Jarak: A3 ke E5 (4, 2, 6); Jarak: F1 ke D2 (2, 1, 3); Jalur: A1 ke B2 (2 langkah, 2 jalur); Jalur: A1 ke C3 (4 langkah, 6 jalur) | Lokasi: keenam soal; Jarak: keenam soal; Jalur: keenam soal |

Tujuh misi wajib tiap sub-bab: lima dari lab di atas, mesinnya (Mesin Susunan, Mesin Tampak), dan skenarionya (Tigor dan Tenri Susun Rumah Kubus, Anike Menggambar Tiga Arah). Near-miss tidak memenuhi misi: soal lain pada tampilan yang sama, soal bernomor sama pada tampilan lain, riwayat kosong, alat lain dengan id sama, dan keadaan selesai dengan id sama.

## Soal lab A (enam per tampilan, id `susun:0-5`, `lapisan:0-5`, `penyangga:0-5`)

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Susun | dua kubus ditumpuk (2, kurang 6, sisa 1); bentuk L (3, 5, 2); tangga tiga lantai (6, kurang 6 untuk balok 3 × 2 × 2 = 12, sisa 5); menara kecil (7, 5, 6); kubus penuh 2 × 2 × 2 (8, kurang 10 untuk 3 × 3 × 2 = 18, sisa 4); balok rendah 3 × 2 × 2 (12, kurang 15 untuk 3 × 3 × 3 = 27, sisa 6) | seluruh kubus tersusun, kubus yang kurang, kubus tersisa sesudah lantai teratas diurai |
| Lapisan | 2 × 2 × 2 (4, 8, 4); 3 × 3 × 3 (9, 27, 18); 5 × 3 × 2 (15, 30, 15); 2 × 3 × 4 (6, 24, 18); 4 × 4 × 2 (16, 32, 16); 4 × 3 × 3 (12, 36, 24) | kubus satu lantai, seluruh kubus, kubus tersisa sesudah satu lantai dilepas |
| Penyangga | tiga susunan sah dan tiga melayang (melayang 0, 1, 0, 1, 0, 2; total sah 3, 5, 5, 4, 6, 6) | kubus melayang, keputusan (boleh dibangun, tambah penyangga dulu, atau biarkan), seluruh kubus sesudah susunan sah |

Pengecoh dihitung dari kesalahan khas: hanya lantai dasar, tanpa lantai teratas, atau satu lebih (Hitung); ukuran target utuh atau kubus yang sudah ada (Kurang); total semula atau lantai teratas (Urai); jumlah ukuran atau ukuran kali tinggi (Dasar); lantai dasar saja atau jumlah ketiga ukuran (Total); jumlah mentah tanpa penyangga (Total penyangga). Bila calon habis atau ganda, dipakai bilangan di sekitar kunci, sehingga tidak pernah ada pilihan ganda. Letak kunci diputar (seed berbeda tiap tahap) dan diuji eksak.

## Soal lab B (enam per tampilan, id `matriks:0-5`, `tampak:0-5`, `atas:0-5`)

Baris pertama matriks paling depan, kolom pertama paling kiri, tinggi 0 berarti petak kosong. Tampak depan = jumlah tinggi terbesar tiap kolom, tampak samping = jumlah tinggi terbesar tiap baris, tampak atas = banyak petak terisi.

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Matriks | [[2,1],[3,4]] (10), [[1,3],[2,1]] (7), [[2,2],[2,2]] (8), [[2,0],[2,2]] (6), [[3,1],[1,2]] (7), [[1,2],[4,1]] (8) | tinggi baris depan, tinggi baris belakang, seluruh kubus |
| Tampak | tiga soal dari depan dan tiga dari samping (5, 4, 7 dan 4, 5, 6) | tinggi terbesar garis pertama, garis kedua, jumlah petak tampak |
| Atas | [[4]], [[2,0],[2,2]], [[1,3],[2,1]], [[2,1],[3,4]], [[3,1],[0,2]], [[1,2],[2,1]] | petak terisi dari atas, seluruh kubus, susunan yang cocok dengan ketiga tampak |

Pengecoh: pasangan tinggi terbalik atau satu lebih (Matriks); jumlah mentah, tinggi terkecil (Tampak); seluruh kubus dan tampak lain (Atas, Total). Rekonstruksi: tiap soal punya tiga calon susunan, satu cocok pada ketiga tampak dan dua cocok pada dua dari tiga tampak (near-miss, dicek dengan proyeksi kubus). Susunan kunci disembunyikan selama rekonstruksi.

## Soal lab C (enam per tampilan, id `lokasi:0-5`, `jarak:0-5`, `jalur:0-5`)

Kisi: huruf A sampai F menurun, angka 1 sampai 6 mendatar; letak ditulis huruf dulu, misalnya C2.

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Lokasi | C2 (Makassar), A3, E5, F1, D2, B6 | huruf baris, angka kolom, cara menulis letak |
| Jarak | A3-E5 (4, 2, 6); F1-D2 (2, 1, 3); B6-D3 (2, 3, 5); C2-C4 (0, 2, 2); A1-E1 (4, 0, 4); B3-B3 (0, 0, 0) | selisih huruf, selisih angka, jarak |
| Jalur | A1-B2 (2 langkah, 2 jalur); A1-B3 (3, 3); A1-C3 (4, 6); C2-C4 (2, 1); E1-C3 (4, 6); A1-C4 (5, 10) | langkah terpendek, jalur sah dan terpendek, banyak jalur terpendek |

Pengecoh: nomor huruf sebagai angka (sumbu tertukar), urutan terbalik (2C), dan huruf di sebelahnya (Lokasi); selisih sumbu lain dan jumlah selisih (Selisih); yang terbesar saja (seolah serong), satu selisih saja, dan jumlah semua koordinat (Jarak); banyak jalur, hasil kali selisih (Jalur). Pilihan jalur: satu jalur sah dan terpendek, satu serong (atau berakhir di petak keliru bila lurus), dan satu memutar. Tiap pilihan dinilai oleh penilai mandiri di uji yang menjalankan langkahnya satu per satu: tepat satu sah (tanpa serong, sampai di tujuan, panjang sama dengan jarak).

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Susunan (A) | Hitung → Lapisan → Penyangga → Urai | Rumah Dadu (3 × 2 × 2: 6 per lantai, 12, 1 dari 3 melayang, sisa 6), Gudang Kardus (4 × 3 × 2: 12, 24, 2 dari 5 melayang, sisa 12), Menara Balok (2 × 2 × 3: 4, 12, 2 dari 3 melayang, sisa 8) |
| Mesin Tampak (B) | Matriks → Depan → Samping → Atas | Susunan Anike ([[2,1],[3,4]]: 10 kubus, depan 7, samping 6, atas 4), Tumpukan Empat ([[4]]: 4, 4, 4, 1), Pagar Kubus ([[2,0],[2,2]]: 6, 4, 4, 3) |

| Mesin Petak (C) | Baca → Selisih → Jarak → Jalur | Kursi Tenri (A1-C3: selisih huruf 2, jarak 4, 6 jalur), Rak Buku (A3-D5: 3, 5, 10 jalur), Kubus Pindah (F1-D2: 2, 3, 3 jalur) |

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Tigor dan Tenri Susun Rumah Kubus (A) | 8 | Narasi rumah kubus; Construct-Decompose Protocol (bentuk L: dua kubus berdampingan dan satu naik); ketuk 3 stik; Layer Counting Method (lantai 3 × 2 = 6 dan dua lantai = 12); isi 6 stik untuk lantai kedua; Hidden Support Rule (tambah penyangga dulu); menara 4 + 2 = 6 kubus dan sisa 4 sesudah lantai teratas dilepas; penutup memuat tiga metode luar |
| Anike Menggambar Tiga Arah (B) | 8 | Narasi susunan 2 kali 2; Orthographic Projection Protocol (dari atas hanya petak terisi); ketuk 4 stik (tumpuk empat, 1 petak dari atas); Height-Matrix Silhouette (10 kubus, 4 petak dari atas); Occlusion Max Rule (kolom kiri 3, tampak depan 7); kesalahan menjumlahkan semua tinggi (10, benar 7); isi 7 stik tampak depan; penutup memuat tiga metode luar |
| Tigor dan Tenri di Denah Kelas (C) | 8 | Narasi denah berpetak dengan C2; Grid Coordinate Naming (E5, bukan 5E); ketuk 4 stik (A1 ke A5); Manhattan Path Distance (selisih huruf 4, jarak A3 ke E5 enam); serong tidak boleh (A3 ke B4 dua langkah); isi 3 stik untuk F1 ke D2; Shortest Grid Path (A1 ke B3: 3 langkah, 3 jalur); penutup memuat tiga metode luar |

Jenis adegan: narasi, pilih, hitung, soal, isi, akhir (6 jenis); batas jawaban numerik di `uji-skenario-umum.mjs` 100. Letak jawaban benar bervariasi.

## Kejujuran konsep

- Susun: urutan wajib hitung, kurang, urai; riwayat hanya dicatat setelah urai benar. Kubus yang tertutup tetap dihitung, kebutuhan target dikurangi kubus yang sudah ada.
- Lapisan: urutan wajib dasar, total, sisa; riwayat setelah sisa benar. Hitungan mandiri di uji: tiap kubus satuan dicacah satu per satu pada himpunan (x, y, z) dengan tiga lingkaran, bukan rumus p × l × t di kode.
- Penyangga: urutan wajib melayang, keputusan, total; riwayat setelah total benar. Hitungan mandiri di uji: tiap kubus diperiksa apakah kubus di bawahnya ada (himpunan), penyangga ditambah per kubus, lalu dicacah ulang. Keputusan benar bergantung pada jumlah melayang (0 = boleh dibangun).
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa tampak depan, samping, dan atas, siluet, proyeksi, matriks, maksimum, koordinat dan huruf-angka, jarak, jalur, denah, dan lokasi. Lantai atas disebut "lantai teratas" atau "lantai kedua".
- Fuzz 20.000 aksi Lab Susunan: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri mencatat tiap tahap dari cacahan kubus). Indeks pecahan, negatif, di luar batas, `NaN`, dan bukan angka diabaikan (keadaan identik). Pesan sukses lab diawali "✅ " dan hanya bila langkah benar; pesan petunjuk tidak diawali "✅".
- Matriks: urutan wajib baris depan, baris belakang, total; riwayat setelah total benar. Tampak: urutan wajib garis pertama, garis kedua, jumlah. Atas: urutan wajib petak terisi, seluruh kubus, rekonstruksi; riwayat setelah rekonstruksi benar. Hitungan mandiri di uji: kubus dicacah satu per satu pada (kolom, baris, lantai) dan tampak adalah banyak pasangan berbeda yang terlihat dari satu arah ((kolom, lantai) untuk depan, (baris, lantai) untuk samping, (kolom, baris) untuk atas), bukan rumus maksimum di kode.
- Konsep Sub-Bab C tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa koordinat, lokasi, huruf, jarak, jalur, denah, diagonal, dan petak berhuruf (C2).
- Fuzz 20.000 aksi Lab Tampak dengan orakel mandiri, sama seperti Lab Susunan.
- Lokasi: urutan wajib huruf, angka, tulis; riwayat setelah tulis benar. Jarak: urutan wajib selisih huruf, selisih angka, jarak. Jalur: urutan wajib langkah, jalur, banyak jalur. Hitungan mandiri di uji: huruf diubah menjadi nomor lewat kode karakter, jarak dicari dengan penelusuran lebar (BFS) pada kisi 6 kali 6 dengan empat arah, banyak jalur terpendek dicacah dengan DFS yang hanya melangkah ke petak yang lebih dekat ke tujuan. Jarak dan banyak jalur kode dibandingkan dengan BFS dan DFS itu untuk semua 1.296 pasangan titik.
- Sub-Bab C boleh menyentuh A dan B (kubus dipindah pada denah); bab berikutnya tidak disentuh.
- Fuzz 20.000 aksi Lab Petak dengan orakel mandiri, sama seperti dua lab lain.
- Pendaftaran bab diuji: `mtk-6-bab3` muncul tiga kali di `registri-simulasi.ts` dan satu kali di `registri-bab-baru.ts`; registri tidak menarik komponen lab ke bundel awal.
- Emoji: paling baru Emoji 12 dan tanpa urutan ZWJ (diuji pada semua berkas simulasi dan data ringkas). Materi Bab 3 bersih dari emoji di atas Emoji 12.
- Temuan Materi (hanya dilaporkan, tidak diubah): infografis A "Siap B" memuat sisa templat peluang; ronde sortir B memakai label bin "lancip/tumpul" (sisa templat sudut); glyph "ʟ" (U+029F) bukan emoji; Sub-Bab C memakai |E−A| tanpa menyatakan A = 1.

## Uji

`node --no-warnings scripts/uji-lab-k6b3.mjs`: data soal diketik ulang dan dicacah mandiri, pengecoh persis dari calon kesalahan khas, letak kunci eksak, alur tiap soal (salah, melompat, indeks tak sah, sesudah selesai), fuzz 20.000 aksi, mesin, skenario, misi (near-miss, tantangan, gerbang), pengeja (0 sampai 9.999), data ringkas, konsep tidak bocor, emoji dan akhir baris. Uji mutasi dijalankan lewat skrip sementara (di luar repo) pada pohon salinan: A 64 dari 64 mutan terbunuh (satu mutan setara dilaporkan), B 58 dari 58 terbunuh (dua yang awalnya selamat ditutup dengan uji nama garis dan label metode per adegan).
