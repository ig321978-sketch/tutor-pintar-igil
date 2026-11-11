# Matematika Kelas 3 · Bab 1 · Simulasi SMISCPA (pola hibrida)

Bab: Bilangan Cacah sampai 1.000 (`mtk-3-bab1`, `FASE_B`, kelas 3). Komponen: `src/components/modul/SimulasiK3Bab1.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k3bab1.ts`, teks misi di `misi-teks-k3b1.ts`. Kelas 3 dimuat malas: registri memuat `SimulasiK3Bab1` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k3b1.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Jangkauan: Sub-Bab A sampai C sampai 999 (1.000 hanya disebut sebagai batas), Sub-Bab D sampai G sampai 100. Istilah memakai "tempat" (ratusan, puluhan, satuan), bukan "rak" atau "rumah".

## Alat

| Alat | Berkas | Metode | Dipakai |
|------|--------|--------|---------|
| Lab Papan Tempat | `SimulasiLabTempatK3.tsx` + `lab-tempat-k3b1.ts` | PhET | A, B, C |
| Lab Urut | `SimulasiLabUrutK3.tsx` + `lab-urut-k3b1.ts` | PhET (manipulasi langsung: ketuk dua kartu untuk menukar) | C |
| Lab Susun (tambah dan kurang) | `SimulasiLabSusunK3.tsx` + `lab-susun-k3b1.ts` | PhET | D (tambah), E (kurang) |
| Lab Kelompok (kali dan bagi) | `SimulasiLabKelompokK3.tsx` + `PanelKaliK3.tsx` + `PanelBagiK3.tsx` + `lab-kelompok-k3b1.ts` | PhET | F (kali), G (kali dan bagi) |
| Mesin berstasiun (enam definisi) | `SimulasiMesinBertahapK3.tsx` + `mesin-bertahap-k3b1.ts` + `mesin-data-k3b1.ts` | Mesin keadaan | A, B, D, E, F, G |
| Skenario (tujuh) | `SimulasiSkenario.tsx` + `skenario-k3b1.ts` | Skenario kontekstual | A sampai G |

Lab 3D tidak dipakai (isi bab bukan bangun ruang). CPA tetap di Concrete, Picture, Abstract.

## Pola hibrida

Satu laboratorium per sub-bab, paling banyak tiga alat. Alat yang sama dipakai ulang dengan misi yang berbeda dan khusus isi sub-bab. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya paling sedikit tiga misi wajib dan satu tantangan bebas. Sub-Bab G menjadi simulasi pencapaian misi bab. Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya.

| Sub-bab | Alat | Misi wajib | Tantangan bebas |
|---------|------|------------|-----------------|
| A · Bilangan dan Lambang | Lab Papan Tempat (Kata, Garis) + Mesin Baca-Tulis + skenario Tongkat Alfa | Buat 160 dengan Kata; buat 703 dengan Kata (nol tetap ditulis); tukar 10 satuan menjadi 1 puluhan; tuntas mesin; tuntas skenario | Buat 900; Garis pada 671; buat 999 |
| B · Nilai Tempat | Lab Papan Tempat (Kata, Nilai) + Mesin Angka dan Nilai + skenario Tiga Kaleng | 251 dengan Nilai (angka 5 bernilai 50); buat 600, 60, 6 (angka sama, nilai beda); 602 (puluhan kosong, diisi nol); tuntas mesin; tuntas skenario | 987; 805; tukar 10 puluhan menjadi 1 ratusan |
| C · Membandingkan dan Mengurutkan | Lab Papan Tempat (Banding) + Lab Urut + skenario Jarak ke Sekolah | Ratusan menentukan; puluhan menentukan; satuan menentukan; urut naik di Lab Urut; tuntas skenario | Dua bilangan persis sama; urut turun; dua himpunan kartu berbeda |
| D · Penjumlahan sampai 100 | Lab Susun Tambah + Mesin Susun Tambah + skenario Alun-Alun | Susun pendek tanpa menyimpan; penjumlahan yang menyimpan; Susun panjang pada yang menyimpan; tuntas mesin; tuntas skenario | Blok pada yang menyimpan; jumlah tepat 100; satuan tepat 10 |
| E · Pengurangan sampai 100 | Lab Susun Kurang + Mesin Susun Kurang + skenario Toko Pak Bandi | Susun pendek tanpa mengambil; pengurangan yang mengambil; Periksa; tuntas mesin; tuntas skenario | Susun panjang pada yang mengambil; dua bilangan sama (hasil nol); Blok pada yang mengambil |
| F · Perkalian sampai 100 | Lab Kelompok Kali + Mesin Kelompok + skenario Kebun Melati | 5 kelompok isi 2 dengan Tambah berulang; 4 × 5 dengan Kalimat; 3 kelompok isi 7 dengan Garis; 5 kelompok isi 6 dengan Tukar; tuntas mesin; tuntas skenario | Hasil tepat 100; dua perkalian berbeda yang hasilnya sama |
| G · Pembagian sampai 100 (pencapaian bab) | Lab Kelompok Kali dan Bagi + Mesin Bagikan Bergiliran + skenario Pencapaian Bab: Pesta Alfa | 12 : 2 dengan Kurang berulang; Nama bilangan pada yang habis dibagi; Periksa pada yang habis dibagi; perkalian lalu dibagi balik dengan salah satu faktornya; tuntas mesin; tuntas skenario | Pembagian yang bersisa (tidak habis dibagi); 100 dibagi sampai habis |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji):

- Lab Papan Tempat: papan kosong, semua tampilan mati.
- Lab Urut: himpunan pertama dalam keadaan tidak urut, arah naik.
- Lab Susun: tambah 23 + 16, kurang 45 − 19, semua tampilan mati.
- Lab Kelompok: kali 1 × 1, bagi 6 : 2, semua tampilan mati.
- Mesin: stasiun pertama, kasus pertama, belum ada langkah. Skenario: adegan pertama.

## Kejujuran konsep

- Nilai tempat tidak tertukar dengan nilai angka: angka 5 pada 251 bernilai 50, pada 805 bernilai 5.
- Nol dibaca tidak disebut tetapi tetap ditulis. Nama bilangan 0 sampai 999 diuji terhadap `NamaBilangan`.
- Penjumlahan menyimpan bila satuan 10 atau lebih. Pengurangan mengambil satu puluhan bila satuan atas lebih kecil. Hasil pengurangan diperiksa dengan penjumlahan.
- Hasil perkalian dan pembagian dihitung mesin (kunci tidak ditulis tangan). Semua 100 perkalian dan 1.000 pembagian diuji.
- Pembagian dengan sisa tidak disebut habis dibagi: kalimatnya "17 : 4 = 4 sisa 1" dan "tidak habis dibagi".
- Batas: tempat paling banyak 9 pada papan, jumlah paling besar 100, faktor paling besar 10, bilangan dibagi paling besar 100.
- Gambar hanya titik dan blok polos, bukan gambar benda, sehingga batas Concrete dan Picture terjaga.

## Coba ini! (ringkas)

- **Papan Tempat:** (A) buat 703, mengapa nol tetap ditulis; tukar sepuluh satuan; Garis pada 160 dan 671. (B) nilai angka yang sama pada tempat berbeda. (C) Banding dua bilangan, tempat mana yang menentukan.
- **Lab Urut:** urutkan himpunan pertama; ganti ke Turun; himpunan ketiga (angka sama, tempat beda).
- **Lab Susun:** 23 + 16 lawan 48 + 16; Blok pada yang menyimpan atau mengambil; Susun panjang atau Periksa.
- **Lab Kelompok:** 5 × 2 lawan 2 × 5; Garis loncat; dua perkalian berbeda berhasil sama; bagi 12 ke 3 wadah, 13 ke 4 wadah, Periksa dengan kali.
- **Mesin:** ketuk stasiun lanjutan sebelum waktunya dan lihat mesin menolak; bandingkan dua kasus.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan. Suara memakai `speakGuru`.

## Uji

- `node --no-warnings scripts/uji-lab-k3b1.mjs`: nama bilangan, fuzz Papan Tempat dan Lab Urut, semua keadaan Lab Susun, semua perkalian dan pembagian, enam mesin (struktur, permainan penuh, kunci mandiri), struktur misi, keadaan awal tidak memenuhi misi, bukti tiap misi bisa dicapai lewat tombol alat, gerbang (5.774 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk tujuh skenario Kelas 3 Bab 1
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas3-bab1-ringkas.json`
