# Matematika Kelas 1 · Bab 8 · Tab Simulasi (bergaya PhET)

Komponen: `src/components/modul/SimulasiBab8.tsx`, dipasang di tab **Simulasi** pemutar `IgilModulePlayer.tsx` (hanya Bab 1 dan Bab 8 yang punya tab ini). Tidak ada pemanggilan jaringan, tidak ada skor, tidak ada poin. Suara memakai Suara Guru pilihan siswa lewat `speakGuru`.

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

## Alur satu layar
- Satu simulasi per layar, ditandai "Simulasi 1 dari 2" dan "Simulasi 2 dari 2". Tidak ada loncat bebas antar simulasi.
- Tombol **LANJUTKAN KE SIMULASI BERIKUTNYA** pindah dari Simulasi 1 ke Simulasi 2. Di Simulasi 2 tombolnya menjadi **LANJUTKAN KE LATIHAN**.
- Tombol LANJUTKAN baru aktif setelah siswa menyentuh simulasinya sekali (menyeret atau mengetuk benda, plus atau minus, pilihan tampilan, atau tombol Rapikan, Acak, dan Reset). Tombol suara tidak dihitung. Selama belum, tampil petunjuk "Mainkan dulu simulasinya, ya.".
- Tombol KEMBALI di Simulasi 2 membawa siswa ke Simulasi 1. Keadaan kedua simulasi dipertahankan selama tab terbuka.

## Catatan integrasi
- Urutan tab Bab 8: Silabus, Materi, Simulasi, Latihan, Ujian. Simulasi tidak memberi poin dan tidak membuka kunci apa pun. Latihan tetap terbuka setelah semua sub-bab Materi selesai, dan tab Latihan tetap bisa dibuka langsung dari bilah tab.
- Tab Simulasi baru tampil di bab yang sudah punya simulasi. Bab 2 sampai 7 belum punya, jadi tabnya belum tampil.
- Sub-bab tidak memakai kunci jawaban, jadi tidak ada data baru di `src/data/` dan tidak ada seed SQL.
