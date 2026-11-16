# Matematika Kelas 4 · Bab 1 · Simulasi SMISCPA (pola hibrida)

Bab: Bilangan Cacah sampai 10.000 (`mtk-4-bab1`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab1`). Komponen: `src/components/modul/SimulasiK4Bab1.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab1.ts`, teks misi di `misi-teks-k4b1.ts`. Kelas 4 dimuat malas: registri memuat `SimulasiK4Bab1` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k4b1.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **sembilan sub-bab**: A (membaca dan menulis bilangan sampai 10.000), B (nilai tempat), C (membandingkan dan mengurutkan), D (komposisi dan dekomposisi), E (penjumlahan sampai 1.000), F (pengurangan sampai 1.000), G (perkalian sampai 100), H (pembagian sampai 100), dan I (faktor dan kelipatan). Sub-Bab I menjadi simulasi pencapaian misi bab: skenario Pameran Kelas 4 mengulang membaca, nilai tempat, membandingkan, uraian, menjumlah, mengurang, mengali, membagi, faktor, dan kelipatan.

Berkas Materi bab ini tidak diubah (`SubBabK4B1A–I.tsx`, `data-k4b1.ts`, `naskah-k4b1.ts`, `paket-k4b1.ts`, `kit-k4b1.tsx`, `mesin-k4b1.tsx`, dan lainnya). Tokoh dan angka mengikuti Materi: Helen di minimarket (6.750), jarak 3.286 m, Gunung Semeru 3.676 m, Slamet dan struk 7.350, uang Helen Rp7.300 dan Rp10.000, jeruk Pak Toni (131 + 321, 189 + 245), buku dipinjam (265 − 132, 241 − 129, 253 − 176), donat 12 × 4, kelereng 14 × 5, pensil 12 × 8, permen Pak Wicak (48 : 4), kue 81 : 3, faktor 12 dan 20, serta kelipatan 2, 3, dan 5.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Kemasan (Rakit, Tulis; Bacaan dan Papan) | `SimulasiLabKemasanK4.tsx` + `lab-kemasan-k4b1a.ts` | Mesin Baca | Helen di Minimarket |
| B | Lab Nilai Tempat (Nilai dan Uraian, Tabel) | `SimulasiLabNilaiK4.tsx` + `lab-nilai-k4b1b.ts` | Mesin Nilai | Struk Belanja Azizah |
| C | Lab Banding (Dua Bilangan, Urut, Kartu Digit) | `SimulasiLabBandingK4.tsx` + `lab-banding-k4b1c.ts` | Mesin Banding | Harga di Pasar |
| D | Lab Susun-Urai (Susun, Urai, Uang) | `SimulasiLabSusunK4.tsx` + `lab-susun-k4b1d.ts` | Mesin Susun | Uang Helen |
| E | Lab Jumlah Bersusun (Bersusun, Cara Panjang) | `SimulasiLabJumlahK4.tsx` + `lab-jumlah-k4b1e.ts` | Mesin Jumlah | Jeruk Pak Toni |
| F | Lab Kurang Bersusun (Bersusun, Cara Panjang, Periksa) | `SimulasiLabKurangK4.tsx` + `lab-kurang-k4b1f.ts` | Mesin Kurang | Buku Perpustakaan |
| G | Lab Kali (Array, Belah, Bersusun) | `SimulasiLabKaliK4.tsx` + `lab-kali-k4b1g.ts` | Mesin Kali | Donat dan Koperasi |
| H | Lab Bagi (Wadah, Bersusun, Periksa) | `SimulasiLabBagiK4.tsx` + `lab-bagi-k4b1h.ts` | Mesin Bagi | Permen Pak Wicak |
| I | Lab Faktor (Faktor, Kelipatan) | `SimulasiLabFaktorK4.tsx` + `lab-faktor-k4b1i.ts` | Mesin Faktor | Pameran Kelas 4 |

Mesin: `mesin-data-k4b1-bilangan.ts` (A–D), `mesin-data-k4b1-hitung.ts` (E–F), `mesin-data-k4b1-bagi.ts` (G–I), semuanya dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts` dari Bab 1 Kelas 3. Skenario: `skenario-k4b1-bilangan.ts`, `skenario-k4b1-hitung.ts`, `skenario-k4b1-bagi.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab1-ringkas.json` (sub-bab A sampai I).

Pembantu: `eja-k4b1.ts` (pengeja suara 0 sampai 10.000 dengan titik ribuan, "seribu", rupiah, dan tanda hitung; `ejaK3` hanya sampai 1.000) dan `papan-k4b1.tsx` (papan empat tempat berwarna: ribuan ungu, ratusan hijau, puluhan biru, satuan merah).

Lab 3D tidak dipakai (isi bab bilangan dan operasi). CPA tetap di Concrete, Picture, Abstract; simulasi hanya memakai titik, kotak, keping berwarna, angka polos, dan uang pecahan. Metode: lab 2D bergaya PhET (manipulasi langsung), mesin keadaan, dan skenario kontekstual.

Mengapa laboratorium langsung: kesalahan khas bab ini adalah membaca nol ("tujuh ribu nol ratus tiga"), mengira digit sama dengan nilai, membandingkan dari satuan, lupa menyimpan atau mengambil, membalik 1 − 9 menjadi 9 − 1, menulis 48 : 4 tanpa memeriksa sisa, dan menganggap 5 faktor 12. Di lab, anak membangun bilangannya sendiri dan akibat setiap kesalahan terlihat.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Sepuluh dus ditukar satu peti; rakit 3.286, 7.003, dan 1.025 dengan Bacaan menyala; tulis tinggi Semeru dari kata | Rakit 10.000; tulis 9.045; rakit 2.903 |
| B | Ketuk angka 2 pada 2.150; angka 6 di puluhan dan di ratusan; uraian dengan nol; tabel digit 7.812; menulis nilai penuh (7000) ditolak | Empat bilangan buku di tabel; empat angka 4 pada 4.444; angka 0 pada 2.150 |
| C | Ribuan menentukan walau angka lain lebih besar; satuan menentukan; tanda sama dengan; urut tinggi tiga gunung; bilangan terbesar dari 1, 5, 9, 2 | Urut harga dari termahal; bilangan terkecil dari 3, 0, 7, 4 (ribuan bukan 0); ratusan menentukan |
| D | Susun 6.348; kelompokkan keping tak baku; urai 6.035 dengan nol; urai 3.035 dengan dua cara; uang Rp7.300 | Urai 7.020; Rp10.000 dengan dua cara; 9.999 |
| E | 131 + 321 tanpa menyimpan; 189 + 245 dengan menyimpan; lupa menyimpan ditolak; cara panjang; 124 + 411 + 363 | 328 + 579; jumlah tepat 1.000; 117 + 105 + 242 |
| F | 265 − 132; 241 − 129 dengan mengambil; 253 − 176 dengan dua kali mengambil; membalik 9 − 1 ditolak; periksa dengan penjumlahan | 241 − 175; 304 − 128 (puluhan 0); 1.000 − 1 |
| G | Array 12 × 4; array 12 × 8; cara panjang 12 × 4; 14 × 5 bersusun; lupa menyimpan ditolak | Hasil tepat 100; 45 × 2; cara panjang 16 × 6 |
| H | 48 benda ke 4 wadah habis; percobaan 2, 3, 4, 6, 8 wadah; 48 ke 5 wadah bersisa; 48 : 4 bersusun; 81 : 3 lalu periksa | 36 : 4 (puluhan belum cukup); 47 : 5 bersisa 2; hasil yang terlalu besar ditolak |
| I | Semua faktor 12; 5 bukan faktor 12; semua faktor 20; kelipatan 2 sampai 7 lompatan; kelipatan 5 antara 17 dan 35 | Faktor 24 (delapan faktor); faktor 13 (dua faktor); kelipatan 6 antara 0 dan 40 |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji): A 2 peti dan 9 dus; B papan 5.371; C 5.734 dan 4.312; D 12 keping ratusan; E soal 131 + 321; F soal 265 − 132; G array 3 × 4; H 48 benda dan 3 wadah; I bilangan 12 tanpa yang dicoba. Mesin mulai dari stasiun pertama; skenario dari adegan pertama.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari data kasusnya; letak kunci diputar.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Baca (A) | Rakit → Papan → Baca → Tulis | 3.286, 7.003, 1.025 |
| Mesin Nilai (B) | Tempat → Nilai → Uraian → Tabel | 2.150, 8.463, 4.675 |
| Mesin Banding (C) | Ribuan → Penentu → Tanda → Urut | 8.750 dan 7.500; 4.352 dan 4.365; 3.676 dan 3.726 |
| Mesin Susun (D) | Susun → Urai → Nol → Periksa | 6.348, 6.035, 7.020 |
| Mesin Jumlah (E) | Satuan → Puluhan → Ratusan → Hasil | 131 + 321, 189 + 245, 328 + 579 |
| Mesin Kurang (F) | Satuan → Puluhan → Ratusan → Periksa | 265 − 132, 241 − 129, 253 − 176 |
| Mesin Kali (G) | Array → Urai → Bersusun → Periksa | 12 × 4, 14 × 5, 12 × 8 |
| Mesin Bagi (H) | Puluhan → Satuan → Sisa → Periksa | 48 : 4, 81 : 3, 47 : 5 |
| Mesin Faktor (I) | Bagi → Sisa → Pasangan → Kelipatan | Faktor 12, 20, 24 |

Pengecoh bersumber dari kesalahan umum: membaca nol, memakai satu ribu untuk 1.000, menukar dua angka, menulis nilai penuh di tabel, uraian yang bergeser satu tempat, membandingkan dari satuan, lupa menyimpan, membalik angka atas dan bawah, hasil bagi terlalu besar, sisa yang masih bisa dibagi, dan memasukkan batas ke dalam rentang kelipatan.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Helen di Minimarket (A) | 7 | Tiga peti; 6.750 dibaca; 7.003 dan 1.025 dibaca; bungkus pada 3.286 |
| Struk Belanja Azizah (B) | 7 | Nilai 7.000, 500, 2.000; uraian 2.150; 6 puluhan pada 8.463; kolom ribuan 7.812 diisi 7; 6 ratusan pada 4.675 |
| Harga di Pasar (C) | 7 | Bengkoang 8.750 lebih mahal; tiga tanda; puluhan menentukan 4.352 dan 4.365; urutan naik tiga gunung |
| Uang Helen (D) | 7 | Susun 6.348; uraian dengan nol; uang Rp7.300; uraian cara lain 5.000 + 1.348; sepuluh lembar Rp1.000 |
| Jeruk Pak Toni (E) | 8 | 131 + 321; 9 + 5 ditulis 4 simpan 1; puluhan 8 + 4 + 1; 189 + 245 = 434; tiga bilangan |
| Buku Perpustakaan (F) | 8 | 265 − 132, 241 − 129, 253 − 176; membalik ditolak; satuan menjadi 11; dua kali mengambil; periksa |
| Donat dan Koperasi (G) | 7 | Empat donat per baris; 12 × 4, 14 × 5, 12 × 8; cara panjang 10 × 4 + 2 × 4; menyimpan 4 × 5; 9 puluhan pada 96 |
| Permen Pak Wicak (H) | 7 | Empat wadah; 48 : 4, 81 : 3, 55 : 5; 48 : 5 sisa 3; 7 satuan pada 27; periksa 11 × 5 |
| Pameran Kelas 4 (I, pencapaian bab) | 8 | 6.002 dibaca; 60 pada 8.463; 4.352 < 4.365; 189 + 245, 241 − 129, 14 × 5; uraian 7.020; 48 : 4 = 12; 5 bukan faktor 12; kelipatan 2, 5, dan 3 |

## Kejujuran konsep

- Membaca, nilai tempat, uraian, tanda, urutan, hasil operasi, sisa, faktor, dan kelipatan **dihitung dari data**, tidak ditulis tangan. Bacaan 0 sampai 10.000 dibandingkan pembaca mandiri; tempat bernilai nol dilewati, ribuan 1 dibaca "seribu", dan kata "nol" tidak pernah dibaca.
- Batas buku dipatuhi dan diuji: bilangan sampai 10.000 (A–D), jumlah dan selisih sampai 1.000 (E–F), hasil kali paling besar 100 (G), bilangan yang dibagi sampai 99 (H), dan kelipatan sampai 100 (I). Tanpa bilangan negatif; bilangan atas pengurangan tidak boleh lebih kecil dari bilangan bawah.
- Nilai angka bergantung pada tempat (6 di puluhan 60, di ratusan 600). Tabel nilai tempat diisi digit, bukan nilai penuh.
- Membandingkan dimulai dari ribuan; tempat pertama yang berbeda menentukan. Bilangan empat angka tidak boleh berawalan 0 (kartu digit terkecil).
- Satu bilangan bisa diurai lebih dari satu cara; uraian benar bila jumlahnya sama dengan bilangan semula. Pengelompokan ulang keping (10 jadi 1) tidak mengubah bilangan.
- Menyimpan dan mengambil: satu kolom hanya berisi satu angka; simpanan selalu ikut dijumlahkan; mengambil melewati nol harus bertahap dari kiri, dan tombol Ambil di kolom yang belum waktunya ditolak agar anak tidak buntu.
- Perkalian adalah penjumlahan berulang; cara panjang dan bersusun menghasilkan bilangan yang sama.
- Pembagian bersusun dari puluhan: bila puluhan belum cukup (36 : 4) hasil puluhan 0. Sisa selalu lebih kecil dari pembagi; sisa nol berarti habis dibagi. Periksa: hasil × pembagi + sisa = bilangan awal.
- Faktor adalah pembagi dengan sisa nol; ada sisa berarti bukan faktor. Faktor dihitung dengan pembagian dan dibandingkan pencarian pasangan a × b = n. Rentang kelipatan "lebih dari a dan kurang dari b" tidak memasukkan a dan b.
- Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, dan semua pesan lab): A tanpa nilai tempat dan tanda; B tanpa tanda banding dan operasi; C tanpa komposisi dan operasi; D tanpa menyimpan, mengambil, kali, bagi; E tanpa mengambil dan kurang; F tanpa kali dan bagi; G tanpa bagi, sisa, faktor, kelipatan; H tanpa faktor dan kelipatan.

## Coba ini! (ringkas)

- **A:** tambah dus sampai sepuluh; rakit 7.003 dan 1.025; tulis tinggi Semeru dari kata.
- **B:** angka 6 di puluhan lalu ratusan; uraian dengan nol; coba tulis 7000 di tabel.
- **C:** 4.999 dan 5.111; dua bilangan yang berbeda hanya di satuan; ketuk gunung yang bukan terendah.
- **D:** kelompokkan 12 keping ratusan; urai 3.035 dengan dua cara; susun Rp10.000.
- **E:** 189 + 245 tanpa simpanan; cara panjang; tiga bilangan.
- **F:** 241 − 129 dengan membalik; 253 − 176 dua kali mengambil; 304 − 128.
- **G:** array 12 × 4; cara panjang 12 × 4; 25 × 4 = 100.
- **H:** 48 ke 4 dan 5 wadah; 48 : 4 bersusun; 36 : 4.
- **I:** faktor 12 dan 13; kelipatan 2 tujuh lompatan; rentang kelipatan 5.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua tampilan lab. Suara memakai `speakGuru`; angka, titik ribuan, rupiah, dan tanda hitung dieja oleh `ejaK4B1`.

## Uji

- `node --no-warnings scripts/uji-lab-k4b1.mjs`: pengeja suara (0 sampai 10.000 dibandingkan pembaca mandiri); setiap lab (semua kombinasi kecil dan identitas hitungan mandiri, mis. banyak simpanan sama dengan (ds(a) + ds(b) − ds(a + b)) / 9, ribuan soal diselesaikan lewat tombol, tepat satu pasangan angka diterima per kolom, fuzz 20.000 aksi); sembilan mesin (struktur, permainan penuh, semua jawaban salah ditolak, kunci dan SEMUA pengecoh dihitung ulang mandiri, letak kunci bervariasi); sembilan skenario; struktur misi (tujuh wajib dan tiga bebas per sub-bab, id berawalan huruf sub-bab, teks 10–170 karakter, keadaan awal tidak memenuhi misi mana pun); bukti tiap misi bisa dicapai lewat tombol alat dan near-miss tidak memenuhinya; gerbang (tertutup di awal, terbuka setelah semua wajib, tetap terbuka setelah alat diubah); dan konsep tidak bocor antar sub-bab (6.431 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk sembilan skenario Kelas 4 Bab 1
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab1-ringkas.json`
