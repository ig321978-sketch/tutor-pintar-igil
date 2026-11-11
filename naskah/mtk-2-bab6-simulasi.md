# Matematika Kelas 2 · Bab 6 · Simulasi SMISCPA (pola hibrida)

Komponen: `src/components/modul/SimulasiK2Bab6.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab6.ts`. Alat:

- `SimulasiLabNeraca.tsx` + `lab-neraca-k2b6.ts` + `gambar-lab-k2b6.tsx` (PhET + lab 2D, baru; Sub-Bab A)
- `SimulasiLabSatuan.tsx` + `lab-satuan-k2b6.ts` (lab 2D, baru; Sub-Bab A)
- `SimulasiMesinTebak.tsx` + `mesin-tebak-k2b6.ts` (mesin keadaan, baru; Sub-Bab A)
- `SimulasiLabJam.tsx` + `lab-jam-k2b6.ts` (PhET, baru; Sub-Bab B)
- `SimulasiLabHari.tsx` + `lab-hari-k2b6.ts` (lab 2D, garis waktu 24 jam, baru; Sub-Bab B)
- `SimulasiSkenario.tsx` + `skenario-k2b6.ts`: Hari Minggu Kira (Sub-Bab B, simulasi pencapaian misi bab)

Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`); `SIMULASI_BAB` tetap kosong. Mind-Map dan Infografis memakai `src/data/kelas2-bab6-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model menggerakkan gambar, neraca, daftar catatan, titik, tabel, dan kalimat (Lab Neraca). Jam juga satu model: jarum, angka digital, bagian hari, dan kalimat berubah bersama (Lab Jam) |
| Lab 2D | Tinggi | Menimbang dengan satuan tak baku (Lab Satuan) dan menyusun kegiatan di garis waktu 24 jam (Lab Hariku) adalah alat ukur di kanvas |
| Mesin keadaan | Tinggi | Membuktikan berat punya urutan tetap: Tebak, Timbang, Tulis. Mesin menolak menimbang sebelum menebak dan menulis sebelum menimbang |
| Skenario | Tinggi | Menyusun hari Minggu adalah keputusan nyata dengan akibat cerita |
| Lab 3D | Tidak | Isi bab bukan bangun ruang |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Kejujuran konsep

- Berat dibandingkan dengan neraca (sisi turun = lebih berat), bukan dengan tebakan. Besar belum tentu berat: balon besar lebih ringan dari batu kecil, kelapa lebih ringan dari batu. Kontra-contoh itu muncul di Lab Neraca bila Ukuran asli dinyalakan, dan di Mesin Tebak.
- Kesimpulan "paling berat" atau "paling ringan" dari beberapa catatan hanya diberikan bila memang terbukti: kelas benda sama berat digabung, catatan disambung transitif, dan puncak atau dasar harus satu benda tunggal. Diuji pada 8.064 himpunan catatan.
- Hasil ukur bergantung pada satuan. Satuan lebih ringan butuh hitungan lebih banyak (1 boneka = 4 bola tenis = 10 kelereng). Kalimat membandingkan dua hasil hanya setelah dua hasil ada.
- Jarum jam yang sama muncul dua kali sehari (pukul 5 pagi dan 5 sore). Pembedanya bagian hari dan jam digital, bukan jarum. Angka digital hanya ditulis bila Jam digital menyala.
- Kapan (urutan, mulai) berbeda dari berapa lama. Garis waktu menunjukkan keduanya terpisah.

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Berat | Lab Neraca + Lab Satuan + Mesin Tebak dan Buktikan | Dua benda berbeda berat, piringan berat turun; dua benda sama berat, neraca seimbang; benda besar yang lebih ringan dari benda kecil (Ukuran asli menyala); ukur boneka dengan bola tenis sampai seimbang; dua hasil berbeda untuk benda yang sama; tuntas Mesin Tebak dan Buktikan | Coba tiga cara menimbang; temukan paling berat dan paling ringan dari tiga benda; ukur dengan koin (hitungan terbanyak); ukur tiga benda dengan satu satuan; nyalakan Titik pada neraca seimbang |
| B · Waktu (pencapaian misi) | Lab Jam + Lab Hariku + skenario Hari Minggu Kira | Jam tepat pukul 5; Jam digital pukul 4 sore terbaca 16.00; dua waktu dengan jarum sama; urutkan kegiatan dari bangun sampai tidur; bandingkan dua kegiatan beda lama; tuntas skenario Hari Minggu Kira | Bagian hari untuk pagi, siang, sore, malam; ketuk tiga angka di muka jam; dua kegiatan sama lama; kegiatan menit lawan jam; berolahraga selama satu jam |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Neraca: neraca kosong, Jungkat-jungkit, Ukuran asli mati, Titik dan Tabel mati.
- Lab Satuan: benda dan satuan pertama terpilih dengan banyak satuan nol, belum ada hasil.
- Mesin Tebak: stasiun Tebak, kasus pertama (Semangka dan Apel), belum ada langkah.
- Lab Jam: jam bukan 5 dan bukan 4 sore, Jam digital dan Bagian hari mati.
- Lab Hariku: tidak ada kegiatan terpilih, Urut menurut waktu mati.
- Skenario: adegan pertama (narasi).

## Alat yang ditambah di pola ini

- **Lab Neraca**: sembilan benda (semangka, kelapa, batu, apel, jeruk, buku, pensil, anggur, balon) dengan berat nyata. Tiga cara menimbang (jungkat-jungkit, gantungan baju, dua tangan). Perwakilan: gambar benda di piringan, daftar catatan, Titik, Tabel, dan kalimat.
- **Lab Satuan**: tiga benda (stroberi, boneka, tas) dan empat satuan tak baku (bola tenis, kelereng, koin, balok mainan), sampai 30 satuan. Hasil dipertahankan ketika benda atau satuan diganti, supaya dua hasil bisa dibandingkan.
- **Mesin Tebak dan Buktikan**: lima kasus (semangka lawan apel, balon lawan batu, apel lawan jeruk, kelapa lawan batu, pensil lawan anggur). Pilihan Tebak dan Tulis diputar supaya jawaban benar tidak selalu di tempat yang sama.
- **Lab Jam**: jam 0 sampai 23. Mengetuk angka mempertahankan paruh hari. Jam digital dan Bagian hari bisa dinyalakan atau dimatikan. Jam kembar (pagi dan sore) ditampilkan berdampingan.
- **Lab Hariku**: dua belas kegiatan (bangun tidur, sarapan, berolahraga, mandi pagi, sekolah, makan di kantin, mencuci tangan, bermain, mandi sore, makan malam, menyikat gigi, tidur malam), maksimal dua dipilih, garis waktu 24 jam dengan pita bagian hari, dan jam mulai serta selesai untuk kegiatan berdurasi jam penuh.
- **Skenario**: *Hari Minggu Kira* (delapan adegan: urutan kegiatan, menghitung lama, jam selesai, dan perbandingan lama).

## Coba ini! (ringkas)

- **Lab Neraca:** (1) Taruh semangka dan apel. Sisi mana yang turun? (2) Nyalakan Ukuran asli, taruh balon dan batu. Mana yang lebih besar? Mana yang lebih berat? (3) Taruh apel dan jeruk. (4) Coba gantungan baju dan dua tangan.
- **Lab Satuan:** (1) Ukur boneka dengan bola tenis. (2) Ganti dengan kelereng. Mana hitungannya lebih banyak? Mengapa? (3) Ukur tas dengan koin.
- **Mesin Tebak:** (1) Ketuk Timbang sebelum menebak. (2) Tebak balon lebih berat, lalu buktikan. (3) Bandingkan kelapa dan batu.
- **Lab Jam:** (1) Atur ke pukul 5, lalu geser ke 5 sore. Apa yang sama? Apa yang beda? (2) Nyalakan Jam digital. (3) Ketuk angka 9.
- **Lab Hariku:** (1) Nyalakan Urut menurut waktu. Apa yang pertama dan terakhir? (2) Bandingkan sekolah dan bermain. Mana yang lebih lama? (3) Bandingkan mandi pagi dengan mandi sore.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b6.mjs`: Lab Neraca (termasuk kesimpulan ekstrem), Lab Satuan, Mesin Tebak, Lab Jam, Lab Hariku, misi brute-force dan konstruktif, serta gerbang (6.524 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk Hari Minggu Kira
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas
