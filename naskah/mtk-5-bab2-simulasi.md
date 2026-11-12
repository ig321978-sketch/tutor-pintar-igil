# Matematika Kelas 5 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: KPK dan FPB (`mtk-5-bab2`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab2`). Komponen: `src/components/modul/SimulasiK5Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab2.ts`, teks misi di `misi-teks-k5b2.ts`. Dimuat malas lewat `registri-simulasi.ts` (`next/dynamic`, `ssr: false`).

Bab ini punya **lima sub-bab**: A (kelipatan), B (kelipatan persekutuan dan KPK), C (faktor), D (faktor persekutuan dan FPB), E (KPK dan FPB dengan faktor prima). Dikerjakan dalam lima gelombang, satu sub-bab per gelombang. Gelombang A sampai D tidak didaftarkan di registri; gelombang E mendaftarkan bab (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`) dan mencatatnya di `naskah/igil-module-player-peta.md`.

**Status: semua lima gelombang selesai (Sub-Bab A sampai E). Bab didaftarkan di registri.**

Berkas Materi bab ini tidak diubah (`SubBabK5B2A–E.tsx`, `naskah-k5b2.ts`, `data-k5b2.ts`, `paket-k5b2.ts`, dan lainnya). Pengeja suara memakai `ejaK5B1` (sampai 999.999) lewat prop `eja` mesin. Tokoh skenario dari buku: Nisa (A) dan Yohana bersama Nisa (B), Lukas (C), Amelia (D), dan Nisa (E).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Lompat Kelipatan (Lompat, Tabel, Cek) | `SimulasiLabKelipatanK5B2.tsx` + `lab-kelipatan-k5b2a.ts` | Mesin Kelipatan | Tepuk Kelipatan Nisa (7 adegan) |
| B | Lab Dua Jalur (Jalur, Irisan, Jadwal) | `SimulasiLabJalurK5B2.tsx` + `lab-jalur-k5b2b.ts` | Mesin KPK | Jadwal Renang Yohana (7 adegan) |
| C | Lab Susunan Faktor (Susun, Pasangan, Tanda) | `SimulasiLabFaktorK5B2.tsx` + `lab-faktor-k5b2c.ts` | Mesin Faktor | Potong Petak Lukas (7 adegan) |
| D | Lab Faktor Bersama (Daftar, Bagi, Jembatan) | `SimulasiLabBersamaK5B2.tsx` + `lab-bersama-k5b2d.ts` | Mesin FPB | Vas Mawar Amelia (7 adegan) |
| E | Lab Pohon Prima (Prima, Pohon, Gabung) | `SimulasiLabPrimaK5B2.tsx` + `lab-prima-k5b2e.ts` | Mesin Prima | Kebun Sekolah Nisa (8 adegan, pencapaian bab) |

Mesin: `mesin-data-k5b2.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b2.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-kelipatan-k5b2.tsx` (garis bilangan dengan busur lompatan, tabel seratus yang bisa diwarnai, titik polos dalam kelompok sama banyak) `model-jalur-k5b2.tsx` (dua garis bilangan sejajar dengan penanda pendaratan sama, kartu angka polos), dan `model-faktor-k5b2.tsx` (titik polos dalam baris sama banyak, titik sisa berwarna lain di baris tambahan) dan `model-bersama-k5b2.tsx` (deretan kotak polos untuk kelompok, emas bila rata dan putus-putus bila ada sisa). Lab E memakai kartu angka polos dan daun pohon faktor dari `model-jalur-k5b2.tsx`, tanpa model baru. Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab2-ringkas.json`. Uji: `scripts/uji-lab-k5b2.mjs`.

Metode luar buku yang dianyam. A: Lompat Hitung (kelipatan sebagai pendaratan berjarak sama dari nol), pola Tabel Seratus (warna jatuh berjarak sama), dan Cek Sisa (bilangan dikelompokkan sama banyak, sisa nol berarti kelipatan). B: Dua Pelompat Berlomba (pendaratan sama pertama adalah KPK), Daftar Kelipatan Bersama atau irisan dua daftar (yang terkecil adalah KPK), dan Jadwal Bertemu Lagi (KPK menjadi lama hari, ditambahkan pada tanggal mulai). C: Model Susunan (faktor adalah banyak baris yang memakai semua titik tanpa sisa), Pasangan Faktor (berhenti saat kandidat dikali dirinya sendiri melebihi bilangan), dan Cek Sisa (faktor membagi tanpa sisa, 1 dan bilangan itu selalu faktor). D: Daftar Faktor Persekutuan (irisan dua daftar faktor, yang terbesar adalah FPB), Bagi Rata (FPB adalah banyak kelompok terbanyak yang masih rata, tanpa sisa), dan Jembatan KPK dan FPB (FPB dikali KPK sama dengan hasil kali dua bilangan, dipakai untuk memeriksa). E: Saringan Prima (prima punya tepat dua faktor, 1 bukan prima), Pohon Faktor (pecah sampai semua daun prima, berhenti hanya di bilangan prima), dan Aturan Min dan Max (KPK mengambil jumlah terbanyak tiap faktor prima, FPB jumlah paling sedikit).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Lompat: lima pendaratan jarak 3 (3, 6, 9, 12, 15); Lompat: lima pendaratan jarak 7; Tabel: semua kelipatan 4 di tabel seratus; Cek: 12 titik dalam kelompok berisi 3, sisa 0, kelipatan; Cek: 14 titik dalam kelompok berisi 3, sisa 2, bukan kelipatan | Lompat: sepuluh pendaratan jarak 3 (terakhir 30); Tabel: kelipatan 9 (pola diagonal); Cek: 25 dalam kelompok berisi 4, sisa 1, bukan kelipatan |
| B | Jalur: 3 dan 4 bertemu di 12; Jalur: 3 dan 5 bertemu di 15; Irisan: tandai semua bilangan di kedua daftar kelipatan 4 dan 5 lalu pilih yang terkecil (20); Jadwal: Nisa (3 hari) dan Yohana (4 hari), 12 hari, 15 Agustus; Jadwal: Dinda (5 hari) dan Amelia (2 hari), 10 hari, 11 Agustus | Jalur 4 dan 5 (bertemu di 20); Irisan 6 dan 8 (24); Irisan 2 dan 3 (6, 12, 18 di kedua daftar) |
| C | Susun: semua susunan penuh 12 (1, 2, 3, 4, 6, 12 baris); Susun: semua susunan penuh 18; Susun: 24 titik dalam 5 baris disimpan (sisa 4, 5 bukan faktor 24); Pasangan: semua pasangan faktor 18 sampai kandidat 4 (1×18, 2×9, 3×6, 4 dan 5 bukan faktor); Tanda: semua faktor 24 termasuk 1 dan 24 | Susun: semua susunan penuh 24 (8 faktor); Pasangan 36 (kandidat 6 berpasangan dengan dirinya sendiri); Tanda: semua faktor 36 |
| D | Daftar: faktor persekutuan 12 dan 18 lalu FPB (6); Daftar: 15 dan 28 (hanya 1, FPB 1); Bagi: 24 mawar merah dan 18 mawar putih ke 6 vas (4 merah, 3 putih); Bagi: 36 susu, 48 lolipop, 24 biskuit ke 12 paket; Jembatan: 12 dan 18 (FPB 6, KPK 36, 6 × 36 = 12 × 18 = 216) | Daftar 8 dan 12 (FPB 4); Daftar 6 dan 12 (FPB 6, sama dengan bilangan terkecil); Jembatan 24 dan 18 (6 × 72 = 24 × 18 = 432) |
| E | Prima: 17 prima (dua faktor); Prima: 1 bukan prima (satu faktor); Pohon: 196 sampai semua daun prima (2 × 2 × 7 × 7); Gabung: KPK 72 dan 150 dari faktor prima (1800); Gabung: FPB 72 dan 150 (6) | Prima 49 (7 × 7, ganjil tetapi bukan prima); Pohon 300 (2 × 2 × 3 × 5 × 5); Gabung KPK 27 dan 81 (81) |

Near-miss tidak memenuhi misi A: empat pendaratan atau jarak lain; kelipatan 4 kurang satu atau kelebihan satu bilangan (lab menyebut bilangan yang kelebihan beserta sisanya, atau kelipatan terkecil yang terlewat); kelipatan 5 saat targetnya 4; belum diperiksa; putusan "ya" atau "bukan" yang salah, sisa yang salah (termasuk menyebut hasil bagi), atau putusan sebelum sisa ditentukan.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Kelipatan (A) | Lompat → Tabel → Cek → Lanjut | jarak 3 (pendaratan ke-4 = 12, 24 di tabel, 22 bersisa 1, lanjut 15), jarak 7 (ke-6 = 42, 63, 30 bersisa 2, lanjut 35), jarak 9 (ke-7 = 63, 90, 40 bersisa 4, lanjut 45) |
| Mesin KPK (B) | Jalur → Irisan → KPK → Jadwal | 2 dan 3 (3 pendaratan, 2 bilangan di kedua daftar, KPK 6, 10 Agustus), 4 dan 5 (5 pendaratan, 1 bilangan, KPK 20, 22 Agustus), 6 dan 8 (4 pendaratan, 1 bilangan, KPK 24, 25 Agustus) |
| Mesin Faktor (C) | Susun → Pasangan → Daftar → Cek | 18 (3 baris, 6 titik tiap baris; 2 berpasangan dengan 9; 6 faktor; 4 bukan faktor, sisa 2), 24 (4 baris, 6; 3 dengan 8; 8 faktor; 5, sisa 4), 36 (9 baris, 4; 4 dengan 9; 9 faktor; 8, sisa 4) |
| Mesin FPB (D) | Daftar → FPB → Bagi → Jembatan | 12 dan 18 (4 faktor persekutuan, FPB 6, 2 merah tiap vas, KPK 36), 36 dan 48 (6, 12, 3, 144), 18 dan 30 (4, 6, 3, 90) |
| Mesin Prima (E) | Prima → Pohon → Pasangan → Hasil | 72 dan 150 (17 prima, 2 × 2 × 2 × 3 × 3, faktor 2 diambil 3 kali untuk KPK, FPB 6), 42 dan 60 (29, 2 × 3 × 7, 2 kali, FPB 6), 27 dan 81 (23, 3 × 3 × 3, 4 kali, FPB 27) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung. A: jarak ditambah k dan satu pendaratan kurang (Lompat), bilangan tetangga (Tabel), menyangka kelipatan dan sisa tertukar (Cek), tambah satu dan satu kurang (Lanjut). B: satu pendaratan lebih dan pendaratan pelompat lain (Jalur), satu lebih dan satu kurang (Irisan), jumlah dua bilangan dan hasil kali atau dua kali KPK (KPK), lama hari sebagai tanggal dan tanggal mulai ditambah jumlah selang (Jadwal). C: satu titik lebih tiap baris dan banyak baris (Susun), selisih dan satu lebih (Pasangan), dua kurang dan satu lebih (Daftar), menyangka faktor dan sisa palsu (Cek). D: satu lebih dan satu kurang (Daftar), 1 dan KPK (FPB), bunga putih tiap vas dan dua kali (Bagi), hasil kali dan jumlah (Jembatan). E: dua bilangan bukan prima (Prima), ada daun yang belum prima dan hasil kali salah (Pohon), jumlah paling sedikit dan jumlah semua (Pasangan), KPK dan 1 (Hasil).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Tepuk Kelipatan Nisa (A) | 7 | tepuk di 9 dan 12 pada hitungan 9 sampai 13; banyak tepukan 3 sampai 18 (6 stik); tepukan sampai 30 (10 stik); 3 × 7, kelipatan 3 setelah 12, sisa 14 dibagi 3; 14 bukan kelipatan 3 (sisa 2) |
| Jadwal Renang Yohana (B) | 7 | dua daftar kelipatan 3 dan 4 sampai 12 (12 ada di kedua daftar); 3 hari renang Yohana dalam 12 hari (3 stik); 4 hari renang Nisa (4 stik); KPK 3 dan 4, 3 Agustus + 12 hari = 15 Agustus, kelipatan persekutuan kedua 24; KPK bukan jumlah 7 dan bukan 24 |
| Potong Petak Lukas (C) | 7 | 12 petak dalam 5 baris (sisa 2, 5 bukan faktor 12); banyak faktor 12 (6 stik); banyak faktor 18 (6 stik); pasangan 3 untuk 12 (4), 2 × 9, banyak faktor 24 (8); faktor 24 yang terlewat (1 dan 24) |
| Vas Mawar Amelia (D) | 7 | faktor 24 dan 18 serta yang terbesar di kedua daftar (6); 4 faktor persekutuan (4 stik); 4 mawar merah tiap vas (4 stik); 3 mawar putih tiap vas, FPB 24 dan 18, paket terbanyak 12; 12 bukan faktor 18 (sisa 6) |
| Kebun Sekolah Nisa (E, pencapaian bab) | 8 | 18 kelipatan 6 (A); 2 hari yang sama dalam 36 hari, KPK 6 dan 9 = 18 (B); faktor 16 (5 stik, C); FPB 24 dan 36 = 12, KPK 6 dan 9, 7 prima (D, E); faktorisasi prima 12 = 2 × 2 × 3 dan 4 belum prima (E); KPK untuk jadwal bertemu lagi |

## Kejujuran konsep

- Lompat: pendaratan dihitung dengan penjumlahan jarak (jarak kali k di kode), diuji terhadap penjumlahan berulang. Satu kali tekan satu pendaratan, paling banyak sepuluh. Nol disebut titik awal dan bukan kelipatan (aturan buku).
- Tabel: kunci kelipatan dibentuk dengan lompatan dan dibandingkan dengan bilangan yang diwarnai. Setiap bilangan bukan kelipatan (1 sampai 100) yang kelebihan diuji ditolak dengan sisanya, dan setiap kelipatan yang terlewat diuji ditolak.
- Cek: hasil bagi dan sisa dihitung di kode dengan pembagian, diuji terhadap pengurangan berulang. Pengecoh sisa: hasil bagi dan sisa palsu, semuanya dihitung dan salah.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri (penjumlahan dan pengurangan berulang).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa persekutuan, KPK, FPB, faktor, pembagi, prima, irisan, pohon, jadwal, bertemu, terkecil, dan terbesar.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut, semua pesan bisa dieja.
- Jalur: pendaratan tiap pelompat dihitung dari jarak, bilangan yang sama dibandingkan dua daftar. Riwayat KPK baru dicatat saat kedua pelompat mendarat di KPK, baik A dulu, B dulu, maupun bergantian; satu pelompat saja tidak pernah memenuhi. Pendaratan sama berikutnya disebut kelipatan persekutuan yang bukan terkecil.
- Irisan: kunci adalah bilangan di kedua daftar sepuluh kelipatan. KPK diuji terhadap pencarian kelipatan pertama yang habis dibagi (pengurangan berulang) dan terhadap hasil kali dibagi pembagi persekutuan terbesar (Euclid dengan pengurangan). Semua bilangan yang hanya ada di satu daftar diuji ditolak dan disebut daftarnya; setiap bilangan terlewat diuji ditolak.
- Jadwal: tanggal dihitung hari demi hari dari tanggal mulai dan tetap di bulan Agustus. Pengecoh: dua kali KPK dan jumlah selang (hari), lama hari sebagai tanggal dan tanggal mulai ditambah jumlah selang (tanggal).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa faktor, pembagi, FPB, prima, pohon, dan terbesar.
- Susun: banyak titik tiap baris dan sisa dihitung dengan pembagian, diuji terhadap pengurangan berulang. Setiap faktor diuji disimpan dalam urutan naik dan turun, tiap faktor yang terlewat diuji belum lengkap, dan setiap banyak baris yang bersisa diuji ditolak dengan sisanya.
- Pasangan: pasangan dan faktor diuji terhadap perkalian mandiri (penjumlahan berulang). Kandidat berhenti di bilangan terbesar yang kuadratnya tidak melebihi n (3 untuk 12, 4 untuk 18, 6 untuk 36), jadi 36 punya pasangan kembar 6 dan 6. Jawaban salah tidak maju.
- Tanda: setiap bilangan bukan faktor diuji ditolak dengan sisanya, dan setiap faktor terlewat diuji ditolak (1 dan bilangan itu sendiri dijelaskan khusus).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab C (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa persekutuan, FPB, prima, faktorisasi, pohon, dan terbesar.
- Daftar: faktor persekutuan diuji terhadap keterbagian mandiri (pengurangan berulang), dan FPB terhadap Euclid dengan pengurangan. Setiap faktor yang hanya ada di satu daftar diuji ditolak dengan menyebut bilangan asalnya, dan setiap faktor persekutuan yang terlewat diuji ditolak (1 dijelaskan khusus). Pengecoh FPB: KPK dan jumlah dua bilangan.
- Bagi: setiap banyak kelompok dari 1 sampai benda paling sedikit dicoba dan dinyatakan. Yang rata dan sama dengan FPB tercatat; yang rata tetapi kurang dari FPB dijawab masih bisa lebih banyak; yang bersisa dijelaskan dengan benda pertama yang tidak rata dan sisanya. Hanya mencoba tanpa menyatakan tidak tercatat.
- Jembatan: FPB dikali KPK diuji sama dengan hasil kali dua bilangan (penjumlahan berulang), untuk 12 dan 18, 24 dan 18, 8 dan 12, serta 15 dan 28, 6 dan 12, 36 dan 48, 18 dan 30. Periksa hanya diterima setelah FPB dan KPK sama-sama benar.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab D (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa prima, faktorisasi, pohon, ayakan, Eratosthenes, dan pangkat.
- Prima: banyak faktor dihitung dengan perulangan pembagi, diuji terhadap penghitungan ulang mandiri. Jawaban sebelum mencari faktor ditolak. 1 punya satu faktor sehingga bukan prima, dan 49 (ganjil) punya tiga faktor sehingga bukan prima.
- Pohon: tiap langkah menjaga hasil kali semua daun sama dengan bilangan awal (diuji juga lewat fuzz 20.000 aksi). Bilangan prima yang bukan faktor ditolak dengan sisanya, daun prima tidak dapat dipilih, dan riwayat hanya tercatat saat semua daun prima, baik memilih daun pertama dan prima terkecil maupun daun terakhir dan prima terbesar.
- Gabung: kunci jumlah ambil dihitung dengan menghitung kemunculan tiap prima, diuji terhadap pencarian kelipatan pertama yang habis dibagi (KPK) dan Euclid dengan pengurangan (FPB); KPK × FPB diuji sama dengan hasil kali dua bilangan. Tiap bilangan prima yang diambil satu kali lebih atau kurang diuji ditolak, begitu pula cara KPK untuk FPB dan sebaliknya (dengan penjelasan). FPB 15 dan 28 dengan nol faktor prima menghasilkan 1.
- Sub-Bab E adalah pencapaian bab: skenarionya menyentuh konsep Sub-Bab A sampai E (diuji lewat kata kunci), dan Sub-Bab E tidak dibatasi konsep berikutnya.
- Pendaftaran bab: `registri-simulasi.ts` memuat `mtk-5-bab2` di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (diuji di `uji-lab-k5b2.mjs`).
