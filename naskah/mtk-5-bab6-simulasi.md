# Matematika Kelas 5 · Bab 6 · Simulasi SMISCPA (pola hibrida)

Bab: Sudut (`mtk-5-bab6`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab6`). Komponen: `src/components/modul/SimulasiK5Bab6.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab6.ts`, teks misi di `misi-teks-k5b6.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **empat sub-bab**: A (sudut siku-siku), B (pengertian dan jenis sudut), C (mengukur sudut), D (melukis sudut). Dikerjakan dalam empat gelombang, satu sub-bab per gelombang. Gelombang A sampai C tidak didaftarkan di registri; gelombang D mendaftarkan bab dan menjadi pencapaian bab (skenario D menyentuh konsep A sampai D).

**Status: Gelombang A (Sub-Bab A, Sudut Siku-Siku), B (Sub-Bab B, Pengertian dan Jenis Sudut), dan C (Sub-Bab C, Mengukur Sudut) selesai. D belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B6A–D.tsx`, `naskah-k5b6.ts`, `data-k5b6.ts`, `paket-k5b6.ts`, dan lainnya). Pengeja suara memakai `ejaK5B6` (berkas baru `eja-k5b6.ts`) lewat prop `eja` mesin dan di lab. Pengeja ini mengeja tanda derajat (°), sudut (∠), dan siku-siku (∟).

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `90°` | sembilan puluh derajat |
| `∟ = 90°` | siku-siku sama dengan sembilan puluh derajat |
| `∠ ABC` | sudut ABC |
| `45° < 90°` | empat puluh lima derajat lebih kecil dari sembilan puluh derajat |
| `16 cm`, `20 m` | enam belas sentimeter, dua puluh meter |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999; semua bilangan 0 sampai 360 dengan tanda derajat). Tokoh skenario: Pak Tukang (A), Yohana (B), dan Sitti (C).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Pojok (Lipat, Banding, Detektif) | `SimulasiLabPojokK5B6.tsx` + `lab-pojok-k5b6a.ts` | Mesin Pojok | Bingkai Pak Tukang (7 adegan) |
| B | Lab Sudut (Bagian, Jenis, Jam) | `SimulasiLabSudutK5B6.tsx` + `lab-sudut-k5b6b.ts` | Mesin Sudut | Yohana dan Kotak Pensil (7 adegan) |
| C | Lab Busur (Pasang, Baca, Patokan) | `SimulasiLabBusurK5B6.tsx` + `lab-busur-k5b6c.ts` | Mesin Busur | Kipas Tari Pakarena (8 adegan) |

Mesin: `mesin-data-k5b6.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b6.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-pojok-k5b6.tsx` (pojok benda dengan patokan siku-siku bergaris putus emas, dan kertas yang dilipat) dan `model-sudut-k5b6.tsx` (B: sudut dengan bagian yang disorot emas, patokan siku-siku bergaris putus, dan jam dinding dengan dua jarum) dan `model-busur-k5b6.tsx` (C: busur derajat di atas sudut dengan skala luar dan skala dalam, dan sudut berukuran nol sampai 360 derajat). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab6-ringkas.json`. Uji: `scripts/uji-lab-k5b6.mjs`.

Metode luar buku yang dianyam. A: Paper Fold Benchmark (Lipat: lipatan pertama membuat tepi lurus, lipatan kedua harus menimpa lipatan pertama dengan rapi, digeser dulu sampai tegak lurus; pojoknya menjadi patokan 90°), Right Angle Benchmark (Banding: patokan ditempel ke pojok benda, lalu pilih berimpit, lebih sempit, atau lebih lebar), dan Angle Detective (Detektif: periksa enam pojok benda di sekitar dengan patokan, pilah siku-siku atau bukan). B: Vertex-Ray Model (Bagian: satu bagian gambar sudut disorot, anak menamai titik sudut, kaki sudut, atau daerah sudut; keempat bagian harus benar) dan Acute-Right-Obtuse Classification (Jenis: buka atau tutup kaki sudut sampai lancip, siku-siku, atau tumpul, lalu tekan Cek sudut; Jam: jenis sudut antara jarum pendek dan jarum panjang pada pukul bulat). C: Protractor Reading Protocol (Pasang: geser busur sampai pusatnya tepat di titik sudut, putar sampai garis dasarnya berimpit dengan kaki pertama, lalu periksa), Degree Measure (Baca: pilih skala yang mulai dari nol di kaki pertama, lalu pilih angka yang ditunjuk kaki kedua), dan Benchmark Angles (Patokan: namai sudut berukuran 0, 45, 90, 130, 180, 270, 360 derajat sebagai nol, lancip, siku-siku, tumpul, lurus, releks, dan penuh).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Lipat: kertas HVS menjadi patokan; Banding: pojok buku, pojok bingkai foto, dan pojok ubin lantai siku-siku; Banding: ujung gunting terbuka lancip; Banding: bukaan kipas lipat tumpul; Detektif: keenam pojok dipilah benar | Lipat: kertas koran; Banding: pojok atap rumah (tumpul); Banding: keenam pojok benar |
| B | Bagian: namai keempat bagian huruf V; Jenis: buat lancip, siku-siku, dan tumpul (tiga misi); Jam: pukul dua (lancip) | Bagian: namai keempat bagian gunting terbuka; Jam: pukul tiga (siku-siku); Jam: pukul empat (tumpul) |
| C | Pasang: kipas Pakarena; Baca: kipas Pakarena (125°) dan atap rumah (70°), kaki pertama di kanan, skala dalam; Baca: pintu lemari (50°), kaki pertama di kiri, skala luar; Patokan: nol, siku-siku, lurus, penuh (0°, 90°, 180°, 360°); Patokan: 270° releks, bukan tumpul | Pasang: sudut jarum jam; Pasang: sudut lipatan kertas; Patokan: ketujuh ukuran benar |

Near-miss tidak memenuhi misi: lipat kedua tanpa lipat pertama, lipat kedua tanpa menggeser sampai berimpit, melewati posisi tegak lurus, menjawab Banding tanpa menempel patokan (walau jawabannya benar), jawaban tertukar (lancip dan tumpul), hanya dua dari tiga pojok siku-siku, dan lima dari enam pojok Detektif atau pojok keenam salah jawab. Sub-Bab B: menamai kurang dari empat bagian atau salah nama, mengatur sudut tanpa menekan Cek sudut, tugas lancip pada sudut siku-siku atau tumpul, tugas siku-siku pada sudut yang lebih sempit atau lebih lebar, tugas tumpul pada sudut yang tidak melewati siku, jawaban jam tertukar, dan pukul delapan, satu, atau lima yang tidak dihitung sebagai misi. Sub-Bab C: memeriksa busur tanpa menggeser atau tanpa memutar (dua petunjuk berbeda, dengan arahnya), melewati titik tepat, memilih angka sebelum memilih skala, memilih skala yang salah (dilepas lagi), memilih angka dari skala yang satunya (180 dikurangi ukuran), hanya satu dari dua sudut berkaki pertama di kanan, tiga dari empat patokan, menamai sudut penuh sebagai releks, dan menamai 270 sebagai tumpul, lurus, atau penuh.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Pojok (A) | Temukan → Patokan → Banding → Putuskan | Bingkai Foto (empat pojok, tiga berimpit dengan patokan, satu tidak; pojok keempat lebih sempit, lancip; pojok pertama dipakai), Pintu Lemari (dua berimpit; pojok keempat lebih lebar, tumpul; pojok ketiga lebih sempit, diganti karena lancip), Papan Meja (tidak ada yang berimpit; pojok pertama lancip; pojok kedua lebih lebar, diganti karena tumpul) |

Mesin Sudut (B): Tunjuk → Banding → Jenis → Jam, dengan kasus Jam Dinding (titik pusat tempat dua jarum bertemu = titik sudut; sudut lebih sempit dari patokan, lancip; pukul delapan tumpul), Gunting (salah satu bilah = kaki sudut; lebih lebar, tumpul; pukul tiga siku-siku), dan Kipas Lipat (daerah di antara dua tulang terluar = daerah sudut; sama besar, siku-siku; pukul dua lancip). Pengecoh Mesin Sudut adalah dua nama bagian lain, dua hubungan lain, dan dua jenis lain.

Mesin Busur (C): Pasang → Skala → Baca → Jenis, dengan kasus Kipas Pakarena (busur 2 langkah di kanan titik sudut; kaki pertama di kanan, skala dalam; kipas 125°; 125° adalah sudut tumpul), Jarum Jam (1 langkah; kaki pertama di kiri, skala luar; 30°; 180° adalah sudut lurus), dan Lipatan Kertas (3 langkah; kaki pertama di kanan, skala dalam; 90° dibaca sama pada kedua skala; 270° adalah sudut releks). Pengecoh dihitung: langkah bertambah atau berkurang satu (Pasang), skala yang satunya dan skala mana saja (Skala), angka skala yang satunya (180 dikurangi ukuran) dan ukuran lebih 10 atau kurang 10 (Baca), dan dua nama sudut bersebelahan dalam urutan nol, lancip, siku-siku, tumpul, lurus, releks, penuh (Jenis).

Ukuran pojok hanya ada di data (untuk menimbang), tidak tertulis di layar. Pengecoh dihitung dari banyak pojok dan banyak pojok siku (Temukan dan Patokan), serta dua jenis lain (Banding dan Putuskan). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Bingkai Pak Tukang (A) | 7 | Narasi Pak Tukang; arti siku-siku (pengecoh: lebih sempit dan lebih lebar dari patokan); besar siku-siku 90 (pengecoh 45 dan 180) dan banyak lipatan 2 (pengecoh 1 dan 3); ketuk 4 stik untuk pojok bingkai persegi panjang; isi 2 stik untuk pojok penggaris segitiga yang bukan siku-siku (3 pojok, 1 siku-siku); pojok yang masuk ke dalam patokan adalah lancip (pengecoh: tumpul dan siku-siku); penutup |
| Yohana dan Kotak Pensil (B) | 7 | Narasi Yohana; arti sudut (pengecoh: garis melengkung dan satu titik tanpa garis); titik sudut dan kaki sudut pada huruf V; ketuk 4 stik untuk 2 kaki gunting dan 2 kaki jam; isi 3 stik untuk titik sudut segitiga; pukul dua sudut lancip (pengecoh: tumpul dan siku-siku); penutup |
| Kipas Tari Pakarena (C) | 8 | Narasi Sitti; satuan sudut derajat (pengecoh: sentimeter dan liter); pusat busur di titik sudut dan dasar berimpit kaki; kipas 125° (pengecoh 55 dan 180) dan jam pukul tiga 90° (pengecoh 30 dan 180); ketuk 4 stik untuk patokan 0°, 90°, 180°, 360°; isi 2 stik untuk dua sudut lurus yang membentuk satu sudut penuh; sudut 270° releks (pengecoh: tumpul dan lurus); penutup. Batas jawaban skenario C di `uji-skenario-umum.mjs` 200 karena kipas 125 |

## Kejujuran konsep

- Lipat: pojok baru menjadi patokan bila lipat pertama dilakukan, lipatan kedua digeser sampai tegak lurus, lalu dilipat; geser dibatasi sepuluh derajat ke kiri dan kanan, kelipatan lima. Jumlah geseran dihitung mandiri.
- Banding: jawaban ditolak sebelum patokan ditempel; jenis pojok ditimbang dengan hasil kali titik dua sisi (bukan dengan perbandingan dengan 90 seperti di kode), dan pesan salah menjelaskan hubungan sisi dengan patokan. Pojok yang bukan siku-siku berbeda paling sedikit 20 dari 90 supaya terlihat.
- Detektif: tiga pojok siku-siku dan tiga bukan.
- Ukuran selain 90 tidak pernah tertulis di layar, ucapan, pesan, mesin, skenario, atau data ringkas; ukuran hanya untuk menggambar dan menimbang (derajat dan busur dibahas di sub-bab C).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa titik sudut, kaki sudut, kaki, vertex, sinar, busur, skala, releks, sudut nol, sudut lurus, sudut penuh, melukis, dan mengukur. Lancip dan tumpul hanya disebut secara kualitatif (lebih sempit dan lebih lebar dari patokan), sesuai Materi A.
- Bagian: urutan sorot tiap sudut memuat keempat bagian tepat sekali; kaki pertama dan kedua sama-sama bernama kaki sudut; setelah lengkap, menamai lagi diabaikan.
- Jenis: sudut diatur 15 sampai 165 dengan langkah 15; 90 dapat dicapai; tiga tugas pada sebelas sudut diperiksa satu per satu (33 kombinasi), dan pesan salah menyarankan arah yang benar (lebih sempit atau lebih lebar).
- Jam: jenis sudut antara dua jarum pada pukul 2, 3, 4, 8, 1, 5 ditimbang dengan vektor jarum, bukan dengan rumus di kode; pukul 6 dan 12 (sudut lurus dan penuh) tidak dipakai karena dibahas di Sub-Bab C. Sudut antara jarum diuji sama dengan sudut vektor.
- Sub-Bab B tidak memakai konsep sub-bab berikutnya (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa busur, skala, releks, sudut nol, sudut lurus, sudut penuh, melukis, mengukur, dan ukuran derajat selain 90. Penamaan sudut dengan tiga huruf tidak dipakai karena tidak ada di Materi B.
- Pasang: busur baru dianggap terpasang bila pusatnya tepat (geser nol) dan dasarnya berimpit (putar nol); pesan penolakan menyebut sisi yang salah dan arah perbaikannya (arah geser dan putar sama dengan arah gambar). Banyak geser dan putar yang dibutuhkan dihitung mandiri.
- Baca: bacaan tiap skala dihitung dari geometri (sinar pada sudut phi dari sumbu kanan; skala dalam membaca phi, skala luar membaca 180 dikurangi phi), bukan dari tabel di kode. Skala yang benar adalah yang bacaannya sama dengan ukuran sudut, dan itu selalu skala yang nol di sisi kaki pertama. Angka dari skala yang satunya (180 dikurangi ukuran) dijelaskan di pesan. Sudut 90 membaca sama di kedua skala sehingga tidak dipakai di Baca.
- Patokan: nama sudut ditimbang dengan kuadran (tanda sin dan cos pada lingkaran satuan), bukan dengan perbandingan ukuran; semua ukuran 0 sampai 360 diuji. Sudut releks 270 ditolak bila dinamai tumpul.
- Sub-Bab C tidak memakai konsep Sub-Bab D (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa melukis, lukis, dan konstruksi.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai, semua pesan bisa dieja. Uji mutasi pada logika lab, mesin, skenario, misi, pengeja, dan data ringkas: satu angka atau satu syarat diubah, uji gagal.
