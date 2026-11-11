# Matematika Kelas 1 · Bab 8 · Tahap Simulasi di dalam Materi SMISCPA (empat simulasi, tiga metode)

Komponen: `src/components/modul/SimulasiBab8.tsx` (pembungkus alur per sub-bab, `SimulasiBab8Materi`), dipasang sebagai **tahap 4 (Simulasi)** di dalam Materi pemutar `IgilModulePlayer.tsx`, di antara Infografis dan Concrete. Bab 8 adalah bab pilot SMISCPA, jadi **tab Simulasi tidak ada lagi** di bab ini. Tidak ada pemanggilan jaringan, tidak ada skor, tidak ada poin. Suara memakai Suara Guru pilihan siswa lewat `speakGuru`.

Pembagian ke sub-bab:
- **Sub-Bab A (Mengelompokkan Data):** hanya Simulasi 1 Laboratorium Data (PhET). Sub-bab ini belum mengajarkan diagram, jadi simulasi yang memuat stasiun atau sajian Diagram tidak ditaruh di sini.
- **Sub-Bab B (Diagram Gambar):** Simulasi 2 Pabrik Diagram (PhET), lalu Simulasi 3 Mesin Data Ajaib (mesin keadaan), lalu Simulasi 4 Sekretaris Kelas (skenario). Mesin dan skenario melewati stasiun Diagram, jadi baru muncul setelah Pabrik Diagram.
- Anak cukup menyentuh tiap simulasi sekali; tidak ada yang menahan Concrete.

**Misi.** Tiap simulasi diawali satu kotak kuning "🎯 Misi" di atas simulasi, berisi satu langkah pertama yang harus dicoba, dengan tombol suara. Misi simulasi pertama diucapkan bersama ucapan pembuka tahap, dan misi berikutnya diucapkan saat anak berpindah simulasi:
| Simulasi | Misi |
|---|---|
| Laboratorium Data | Seret semua mainan ke rak yang sama. |
| Pabrik Diagram | Tekan plus sampai ada satu kolom yang paling tinggi. |
| Mesin Data Ajaib | Tekan Tanyakan ke teman-teman, lalu jalankan mesin ke stasiun berikutnya. |
| Sekretaris Kelas | Tekan Siap, Bu Guru! Lalu bantu Bu Guru memilih dengan data. |

| No | Simulasi | Metode | Berkas |
|----|----------|--------|--------|
| 1 | Laboratorium Data: Toko Mainan (Sub-Bab A) | PhET | `SimulasiBab8.tsx` |
| 2 | Pabrik Diagram Gambar (Sub-Bab B) | PhET | `SimulasiBab8.tsx` |
| 3 | Mesin Data Ajaib (Sub-Bab B) | Mesin keadaan (state machine) | `SimulasiMesinData.tsx`, logika `mesin-data-bab8.ts` |
| 4 | Skenario: Sekretaris Kelas (Sub-Bab B) | Skenario kontekstual | `SimulasiSkenarioPesta.tsx`, logika `skenario-pesta-bab8.ts` |

Logika simulasi 3 dan 4 murni (tanpa React) dan diuji terpisah di Node: 54 kasus untuk mesin keadaan dan 76 kasus untuk skenario.

## Penilaian metode untuk Kelas 1 SD
Syarat: gratis, tanpa panggilan API oleh siswa, bisa berjalan di ponsel murah. Semua metode di bawah memenuhi syarat itu secara teknis. Yang membedakan adalah kecocokan dengan isi bab dan usia 6 sampai 7 tahun.

| Bab | PhET (eksplorasi bebas) | Mesin keadaan | Skenario kontekstual | Lab virtual 2D | Lab 3D |
|-----|-------------------------|---------------|----------------------|----------------|--------|
| 1 Membilang sampai 10 | Tinggi (sudah ada) | Rendah | Sedang | Rendah | Tidak cocok |
| 2 Penjumlahan sampai 10 | Tinggi | Sedang (mesin tambah) | Tinggi (warung, belanja) | Rendah | Tidak cocok |
| 3 Pengurangan sampai 10 | Tinggi | Sedang (mesin kurang) | Tinggi | Rendah | Tidak cocok |
| 4 Mengenal Bentuk | Sedang | Rendah | Sedang | **Tinggi** (papan paku dan tangram: susun dan urai) | Tidak cocok (bentuk datar) |
| 5 Membilang sampai 20 | Tinggi (nilai tempat) | Sedang | Sedang | Rendah | Tidak cocok |
| 6 Jumlah dan kurang sampai 20 | Tinggi | **Tinggi** (katak di garis bilangan: posisi = keadaan, loncat = aksi) | Tinggi | Rendah | Tidak cocok |
| 7 Mengukur Panjang | Tinggi | Sedang | Sedang | **Tinggi** (penggaris dan satuan tidak baku di meja maya) | Tidak cocok |
| **8 Mengenal Diagram** | **Tinggi (dibuat)** | **Tinggi (dibuat)** | **Tinggi (dibuat)** | Rendah (tumpang tindih dengan Simulasi 1 dan 2) | Tidak cocok |

Catatan:
- **CPA** sudah menjadi alur Materi, jadi tidak diulang di tab Simulasi.
- **Lab 3D** (three.js bebas lisensi, berjalan lokal) tidak cocok untuk satu pun bab Kelas 1: bab bentuknya datar, dan diagram 3D justru menyesatkan. Metode ini cocok untuk **Kelas 6 Bab 3 Kubus dan Balok** (putar, hitung sisi, rusuk, dan titik sudut). Biayanya: ukuran paket sekitar 600 KB, jadi harus dimuat malas hanya saat tab dibuka.
- **Lab virtual 2D** layak untuk Bab 4 dan Bab 7, bukan Bab 8.

## Standar PhET yang dipakai
1. **Eksplorasi bebas.** Tidak ada nilai, waktu, atau benar-salah. Salah letak hanya dijawab dengan petunjuk.
2. **Sentuh model, perwakilan ikut berubah seketika.** Benda, daftar, turus, tabel, diagram, dan kalimat memakai satu sumber data.
3. **Banyak perwakilan terhubung.** Siswa menyalakan atau mematikan tiap perwakilan (kotak centang), dan menukar bentuknya (tabel menurun atau mendatar, diagram tegak atau mendatar, lambang benda, lingkaran, atau wajah).
4. **Manipulasi langsung.** Seret benda, atau ketuk benda lalu ketuk tujuannya (papan ketik: Enter). Tombol plus dan minus besar.
5. **Reset Semua** mengembalikan model dan semua pilihan tampilan ke awal.
6. **Teks sedikit, kata pendek,** dengan tombol suara di tiap simulasi dan di kartu "Coba ini!".
7. **Batas wajar.** Paling banyak 20 benda atau anak, paling banyak 8 per kelompok, supaya bilangan tetap dalam jangkauan Kelas 1 dan diagram tetap berskala sama.

## Simulasi 1 · Laboratorium Data: Toko Mainan (Sub-Bab A)
Tujuan belajar: mengelompokkan lalu menghitung, daftar, turus, tabel menurun dan mendatar, paling banyak, paling sedikit, jumlah semua.

- **Model:** mainan (pesawat, mobil-mobilan, boneka, bola) di meja atau di rak. Awal: 5, 3, 4, 2 semuanya di meja.
- **Kontrol:** plus dan minus tiap mainan, seret ke rak, Rapikan semua, Acak lagi, Reset Semua.
- **Aturan inti:** daftar, turus, dan tabel hanya menghitung mainan yang sudah masuk rak. Mainan di meja menampilkan "N mainan belum masuk rak, jadi hitungannya belum lengkap". Dengan begitu siswa mengalami sendiri bahwa mengelompokkan membuat data bisa dihitung.
- **Perwakilan:** Daftar ("Ada 5 pesawat."), Turus (empat tegak, satu miring), Tabel (menurun atau mendatar). Baris paling banyak ditandai emas, paling sedikit biru, dan "✅ Semua mainan sudah dikelompokkan" muncul saat lengkap.
- **Salah rak:** rak bergoyang dan muncul petunjuk ("Rak itu untuk boneka. Taruh bola di rak bola."). Benda kembali ke tempat semula.
- **Coba ini!** (1) Seret semua mainan ke rak yang sama. Mana yang paling banyak? (2) Tambah satu bola. Apa yang berubah di daftar, turus, dan tabel? (3) Ubah tabel menjadi mendatar. Apakah datanya sama?

## Simulasi 2 · Pabrik Diagram Gambar (Sub-Bab B)
Tujuan belajar: survei, diagram gambar tegak dan mendatar, satu gambar satu data, mulai dari kotak pertama tanpa celah, membaca paling banyak, paling sedikit, selisih, dan jumlah semua.

- **Model:** pilihan anak untuk 3 atau 4 kategori. Empat topik: Sayur (jagung, wortel, brokoli, kol), Mainan, Buah, Hewan (3 kategori). Awal topik Sayur: 3, 4, 3, 2.
- **Kontrol:** plus dan minus tiap kategori (satu anak), pilihan topik, arah diagram, lambang gambar, kotak centang Tabel dan Kalimat data, Reset Semua.
- **Aturan inti:** gambar selalu diisi dari kotak pertama tanpa celah, skala 1 sampai 8 tetap, sehingga tinggi kolom bisa dibandingkan dengan jujur.
- **Perwakilan:** kerumunan anak berwarna sesuai pilihannya, diagram (tegak atau mendatar; benda, lingkaran polos, atau wajah), tabel (menurun atau mendatar), kalimat data otomatis ("Wortel paling banyak, 4 anak.").
- **Alat bandingkan:** ketuk dua nama pada diagram. Selisih ditandai merah pada kolom yang lebih tinggi dan ditulis sebagai kalimat dengan pengurangannya ("Wortel 2 lebih banyak dari Kol. 4 − 2 = 2"). Ketukan ketiga memulai ulang.
- **Coba ini!** (1) Tambah anak sampai ada satu kolom paling tinggi. (2) Ubah diagram menjadi mendatar. Apakah datanya berubah? (3) Ketuk dua nama untuk mencari selisihnya. (4) Ganti lambang menjadi lingkaran. Apakah banyaknya sama?

## Simulasi 3 · Mesin Data Ajaib (mesin keadaan)
Tujuan belajar: urutan siklus data (tanya, turus, tabel, diagram, cerita) dan mengapa urutan itu penting.

- **Keadaan:** Tanya → Turus → Tabel → Diagram → Cerita → Selesai. Setiap perpindahan punya syarat (guard): semua teman tercatat, semua baris tabel terisi, diagram sama dengan tabel.
- **Peta stasiun:** lima lingkaran dengan panah. Keadaan sekarang bercincin emas, yang sudah dilewati hijau bercentang, yang belum bergembok. Mengetuk stasiun yang boleh dituju memindahkan mesin (mundur selalu boleh dan data tetap).
- **Mesin menolak, dan mengatakan alasannya:** melompat ("Mesin tidak bisa melompat ke Diagram. Selesaikan stasiun Tanya dulu."), maju sebelum lengkap ("Turus belum lengkap. Masih ada 9 teman yang belum dicatat."), mewarnai lebih dari tabel ("Gambar Mangga sudah sama dengan tabel. Jangan lebih."). Penolakan dihitung dan ditampilkan sebagai informasi, bukan nilai.
- **Riwayat mesin:** daftar perpindahan yang berhasil ("Tanya → Turus") dan jumlah penolakan.
- **Dua ronde data:** Buah Kesukaan (Jeruk 4, Apel 3, Mangga 2) dan Hewan Kesukaan (Ayam 3, Bebek 2, Kelinci 5). "Putar lagi" bergantian.
- **Selesai** bila mesin mencapai keadaan Selesai.
- **Coba ini!** (1) Tekan stasiun Diagram sebelum waktunya. Apa kata mesin? (2) Selesaikan semua stasiun sampai Selesai. (3) Putar lagi dengan data baru. Apakah urutannya tetap sama?

## Simulasi 4 · Skenario: Sekretaris Kelas (skenario kontekstual)
Tujuan belajar: memakai data untuk mengambil keputusan nyata, memilih cara mencari data dan cara menyajikannya, dan membaca data (banyaknya, paling banyak, selisih).

- **Cerita:** Bu Guru akan membeli buah (atau mainan) yang paling disukai teman-teman. Anak menjadi Sekretaris Kelas.
- **Tujuh adegan:** Mulai, Cara, Kumpul, Sajikan, Baca, Putuskan, Akhir.
  - **Cara:** menebak, bertanya ke dua teman, atau bertanya ke semua teman dan mencatat. Pilihan yang kurang tepat dijawab dengan akibat dalam cerita, lalu anak mencoba lagi.
  - **Kumpul:** ketuk 14 atau 15 teman satu per satu, jawabannya masuk catatan turus.
  - **Sajikan:** tabel, diagram gambar, atau daftar kalimat. Ketiganya benar. "Diingat di kepala saja" ditolak dengan alasan.
  - **Baca:** tiga pertanyaan Bu Guru dari sajian yang dipilih (banyaknya, paling disukai, selisih).
  - **Putuskan:** beli sama banyak (akibat: yang paling disukai kurang kebagian), beli satu jenis saja (akibat: teman lain kecewa), atau beli sesuai data (pesta berhasil).
  - **Akhir:** ringkasan dan ajakan main lagi dengan data baru.
- **Dua varian data:** Pesta Buah (Jeruk 3, Apel 5, Mangga 2, Belimbing 4) dan Mainan untuk Sudut Bermain (Pesawat 3, Mobil-mobilan 4, Boneka 2, Bola 6). Urutan pilihan diputar antarvarian supaya jawaban benar tidak selalu di tempat yang sama.
- **Selesai** bila skenario mencapai adegan Akhir. Salah pilih tidak menghukum, hanya menambah hitungan "mencoba lagi" yang ditampilkan di akhir sebagai pujian.
- **Coba ini!** (1) Pilih cara yang salah dulu. Apa kata Bu Guru? (2) Sajikan dengan tabel, lalu main lagi dan sajikan dengan diagram. Mana yang lebih mudah dibaca? (3) Coba membeli sama banyak. Apa akibatnya bagi teman-teman?

## Alur satu layar (di dalam pop-up tahap Simulasi)
- Satu simulasi per layar, ditandai "Simulasi 1 dari 1" (Sub-Bab A) atau "Simulasi 1 dari 3" sampai "3 dari 3" (Sub-Bab B), lengkap dengan nama metodenya. Tidak ada loncat bebas antar simulasi.
- Tombol **LANJUTKAN KE SIMULASI BERIKUTNYA** berpindah ke simulasi berikutnya. Di simulasi terakhir tiap sub-bab tombolnya menjadi **LANJUTKAN KE CONCRETE** dan membuka tahap Concrete.
- Tombol LANJUTKAN aktif setelah simulasinya **disentuh sekali** (menyeret atau mengetuk benda, plus atau minus, pilihan tampilan, tombol Rapikan, Acak, Reset, atau tombol di mesin dan skenario; tombol suara tidak dihitung). Semua simulasi memakai syarat ringan yang sama di dalam Materi, supaya tahap ini tidak menahan anak. Selama belum, tampil petunjuk "Mainkan dulu simulasinya, ya."
- Tombol KEMBALI membawa siswa ke simulasi sebelumnya. Keadaan semua simulasi dipertahankan, juga setelah pop-up ditutup dan dibuka lagi (`pertahankan`); keadaan baru dibuang hanya saat anak berpindah sub-bab. Mengetuk area gelap di luar kotak tidak menutup pop-up (`tutupDiLatar` mati).

## Catatan integrasi
- Urutan tab Bab 8: Silabus, Materi, Latihan, Ujian. Simulasi bagian dari alur Materi (SMISCPA, tahap 4), tidak memberi poin, dan tidak mengunci Latihan secara terpisah: Latihan terbuka setelah semua sub-bab Materi selesai, sama seperti sebelumnya.
- Tab Simulasi tetap tampil di bab lain yang sudah punya simulasi (Kelas 1 Bab 3 sampai 7, Kelas 2 Bab 1 sampai 3; Kelas 1 Bab 1 dan 2 sudah dimigrasi) sampai bab itu dimigrasi ke SMISCPA. Registrinya `SIMULASI_BAB` (tab) dan `SIMULASI_MATERI` (di dalam Materi) di `IgilModulePlayer.tsx`.
- Data Mind-Map dan Infografis ringkas bab ini ada di `src/data/kelas1-bab8-ringkas.json`, lihat `naskah/mtk-1-bab8-ringkas-smiscpa.md`.
- Sub-bab tidak memakai kunci jawaban ujian, jadi tidak ada seed SQL.
