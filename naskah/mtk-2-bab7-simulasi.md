# Matematika Kelas 2 · Bab 7 · Simulasi SMISCPA (pola hibrida)

Bab 7: Ayo Membilang sampai dengan 100. Komponen: `src/components/modul/SimulasiK2Bab7.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab7.ts`. Alat:

- `SimulasiLabSeratus.tsx` + `lab-seratus-k2b7.ts` (PhET, baru; Sub-Bab A)
- `SimulasiLabTabel.tsx` + `lab-tabel-k2b7.ts` (lab 2D di Tabel Seratus, baru; Sub-Bab A)
- `SimulasiMesinTebakBanyak.tsx` + `mesin-tebak-banyak-k2b7.ts` (mesin keadaan, baru; Sub-Bab A)
- `SimulasiLabGaris.tsx` + `lab-garis-k2b7.ts` (PhET, garis bilangan sampai 100, baru; Sub-Bab B)
- `SimulasiLabBanding.tsx` + `lab-banding-k2b7.ts` (lab 2D, banding dan urut, baru; Sub-Bab B)
- `SimulasiSkenario.tsx` + `skenario-k2b7.ts`: Kelereng Kira (Sub-Bab B, simulasi pencapaian misi bab)

Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`); `SIMULASI_BAB` tetap kosong. Mind-Map dan Infografis memakai `src/data/kelas2-bab7-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model menggerakkan batang, benda, papan nilai tempat, pasangan bilangan, nama, dan kalimat (Lab Seratus). Posisi dan langkah juga satu model: garis, lengkung lompatan, papan sebelum dan sesudah, dan kalimat berubah bersama (Lab Garis Seratus) |
| Lab 2D | Tinggi | Tabel Seratus adalah kanvas yang bisa dijelajahi (turun tambah sepuluh, kanan tambah satu). Membandingkan dua bilangan dan mengurutkan beberapa bilangan adalah alat susun di kanvas (Lab Banding dan Urut) |
| Mesin keadaan | Tinggi | Memperkirakan punya urutan tetap: Tebak, Kelompokkan, Hitung. Mesin menolak mengelompokkan atau menghitung sebelum menebak, dan menghitung sebelum semua sepuluh diikat |
| Skenario | Tinggi | Permainan kelereng adalah keputusan nyata dengan akibat cerita, dan memuat jebakan 59 dengan 61 |
| Lab 3D | Tidak | Isi bab bukan bangun ruang |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Kejujuran konsep

- Mengikat sepuluh satuan lepas menjadi satu puluhan tidak mengubah banyaknya. Catatan "Banyaknya tetap n" muncul setiap kali mengikat atau membuka. Diuji pada semua keadaan dengan 10 sampai 19 satuan lepas dan 0 sampai 8 puluhan.
- Papan nilai tempat dan pasangan bilangan hanya tampil bila satuan lepas kurang dari sepuluh (sudah terikat). Bila masih ada sepuluh lepas, keduanya menunggu dengan penjelasan, supaya papan tidak menulis "satuan 12".
- Angka tertukar bernilai beda: 62 punya enam puluhan, 26 hanya dua puluhan.
- Tabel Seratus: ujung baris adalah batas. Penanda tidak melompat dari 10 ke 11 sebagai "tambah satu" tanpa penjelasan, karena 11 ada di awal baris di bawah. Bilangan sekolom berselisih sepuluh dan satuannya sama (diuji untuk semua 100 kotak).
- Menebak tidak pernah salah. Mesin hanya membandingkan selisih: tebakan yang paling dekat tunggal pada tiap kumpulan (tidak ada seri).
- Maju adalah lebihnya, mundur adalah kurangnya. Garis berhenti di 1 dan 100. Puluhan berubah hanya bila lompatan melewati puluhan penuh (diuji untuk semua posisi dan langkah).
- Membandingkan: puluhan dulu, satuan hanya bila puluhan sama. Jebakan 59 lawan 61 (satuan 9 lebih dari 1, tetapi 61 lebih besar) dijelaskan secara khusus. Kalimat jebakan hanya muncul bila satuan memang melawan puluhan (diuji untuk semua 10.000 pasangan).
- Urutan keliru tetap tampil bersama alasan di tempat pertama yang keliru, sampai anak menekan Ulang urutan. Urutan tampilan himpunan tidak pernah sudah terurut. Dari semua permutasi tiap himpunan, hanya satu yang dinyatakan benar.

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Menghitung, membaca, menulis | Lab Seratus + Tabel Seratus + Mesin Tebak Banyak | Buat seratus (sepuluh puluhan, nol satuan); ikat sepuluh satuan lepas menjadi satu puluhan; Papan nilai tempat menunjukkan 53; 62 lalu 26; lompat turun empat kali berturut-turut di Tabel Seratus; tuntas Mesin Tebak Banyak | Pasangan bilangan 67; Nama bilangan 90; buka satu puluhan; Tetangga di kotak 55; Satu kolom di kotak 47 |
| B · Membandingkan (pencapaian misi) | Lab Garis Seratus + Lab Banding dan Urut + skenario Kelereng Kira | 58 maju 2 langkah; 75 mundur 3 langkah; maju melewati puluhan penuh dengan Papan nilai tempat menyala; Aturan: 56 lawan 65 (puluhan menentukan); 54 lawan 58 (satuan menentukan); urutkan 57, 76, 83 dari yang paling kecil; tuntas skenario Kelereng Kira | Jebakan 59 lawan 61; dua bilangan sama besar; Tanda untuk 91 dan 19; urutkan dari yang paling besar; urutkan lima bilangan dari yang paling kecil |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Seratus: nol puluhan dan nol satuan, hanya Batang dan kotak menyala.
- Tabel Seratus: penanda di 23, Tetangga, Jejak, dan Satu kolom mati.
- Mesin Tebak Banyak: stasiun Tebak, kumpulan pertama (ikan hias, 62), belum ada langkah.
- Lab Garis Seratus: penanda di 50, satu langkah, Lengkung dan Papan mati, belum ada lompatan.
- Lab Banding dan Urut: 47 dan 38, mode Banding, Papan, Aturan, dan Tanda mati. Pasangan hanya dicatat saat Aturan menyala.
- Skenario: adegan pertama (narasi).

## Alat yang ditambah di pola ini

- **Lab Seratus**: puluhan 0 sampai 10 dan satuan lepas 0 sampai 19, banyaknya sampai 100. Ikat dan buka. Tiga benda (kue cubit, kelereng, rambutan) dengan wadahnya. Lima perwakilan yang bisa dinyalakan sendiri-sendiri.
- **Tabel Seratus**: tabel 1 sampai 100 sepuluh kolom, empat tombol panah, ketuk kotak. Tetangga (hijau), Jejak, dan Satu kolom. Larian turun berturut-turut dihitung untuk misi lompat.
- **Mesin Tebak Banyak**: lima kumpulan (ikan hias 62, jeruk 38, anggur 85, titik 47, titik 76). Tiga tebakan tiap kumpulan, pilihan banyak seluruhnya memuat jawaban benar, angka tertukar, dan sepuluh lebihnya atau kurangnya. Urutan pilihan diputar supaya jawaban benar tidak selalu di tempat yang sama.
- **Lab Garis Seratus**: jendela 13 bilangan yang mengikuti penanda (kupu-kupu), lengkung lompatan (biru maju, merah mundur), Pengatur posisi dan langkah (1 sampai 10), papan nilai tempat sebelum dan sesudah.
- **Lab Banding dan Urut**: dua bilangan dengan tombol −10, −1, +1, +10; batang; papan; Aturan; Tanda. Mode Urut dengan tiga himpunan (3, 4, dan 5 bilangan; himpunan empat memuat 62 dan 26) dan dua arah.
- **Skenario**: *Kelereng Kira* (tujuh adegan: puluhan dan satuan, jebakan 59 dengan 61, maju dan mundur, mengurutkan, dan tanda).

## Coba ini! (ringkas)

- **Lab Seratus:** (1) Tambah satuan sampai sepuluh, lalu ikat. Berubahkah banyaknya? (2) Papan nilai tempat: buat 5 puluhan dan 3 satuan. (3) Buat 62, lalu 26. (4) Tambah puluhan sampai sepuluh.
- **Tabel Seratus:** (1) Turun empat kali. (2) Satu kolom di kotak 47. (3) Geser kanan sampai ujung baris. (4) Tetangga di kotak 55.
- **Mesin Tebak Banyak:** (1) Ikat sekarang sebelum menebak. (2) Tebak, lalu ikat. (3) Pilih tebakan yang jauh. (4) Tebakan mana paling dekat?
- **Lab Garis Seratus:** (1) 58 maju 2. (2) 75 mundur 3. (3) Papan nilai tempat, maju 4 dari 58. (4) 99 maju 2.
- **Lab Banding dan Urut:** (1) Aturan: 56 dan 65. (2) 54 dan 58. (3) 59 dan 61. (4) Urutkan 57, 76, 83.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b7.mjs`: Lab Seratus, Tabel Seratus, Mesin Tebak Banyak, Lab Garis Seratus, Lab Banding dan Urut, misi brute-force dan konstruktif, dan gerbang (91.392 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk Kelereng Kira
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas
