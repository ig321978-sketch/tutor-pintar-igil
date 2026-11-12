# Matematika Kelas 5 · Bab 6 · Simulasi SMISCPA (pola hibrida)

Bab: Sudut (`mtk-5-bab6`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab6`). Komponen: `src/components/modul/SimulasiK5Bab6.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab6.ts`, teks misi di `misi-teks-k5b6.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **empat sub-bab**: A (sudut siku-siku), B (pengertian dan jenis sudut), C (mengukur sudut), D (melukis sudut). Dikerjakan dalam empat gelombang, satu sub-bab per gelombang. Gelombang A sampai C tidak didaftarkan di registri; gelombang D mendaftarkan bab dan menjadi pencapaian bab (skenario D menyentuh konsep A sampai D).

**Status: Gelombang A (Sub-Bab A, Sudut Siku-Siku) selesai. B sampai D belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B6A–D.tsx`, `naskah-k5b6.ts`, `data-k5b6.ts`, `paket-k5b6.ts`, dan lainnya). Pengeja suara memakai `ejaK5B6` (berkas baru `eja-k5b6.ts`) lewat prop `eja` mesin dan di lab. Pengeja ini mengeja tanda derajat (°), sudut (∠), dan siku-siku (∟).

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `90°` | sembilan puluh derajat |
| `∟ = 90°` | siku-siku sama dengan sembilan puluh derajat |
| `∠ ABC` | sudut ABC |
| `45° < 90°` | empat puluh lima derajat lebih kecil dari sembilan puluh derajat |
| `16 cm`, `20 m` | enam belas sentimeter, dua puluh meter |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999; semua bilangan 0 sampai 360 dengan tanda derajat). Tokoh skenario: Pak Tukang (A).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Pojok (Lipat, Banding, Detektif) | `SimulasiLabPojokK5B6.tsx` + `lab-pojok-k5b6a.ts` | Mesin Pojok | Bingkai Pak Tukang (7 adegan) |

Mesin: `mesin-data-k5b6.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b6.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-pojok-k5b6.tsx` (pojok benda dengan patokan siku-siku bergaris putus emas, dan kertas yang dilipat). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab6-ringkas.json`. Uji: `scripts/uji-lab-k5b6.mjs`.

Metode luar buku yang dianyam. A: Paper Fold Benchmark (Lipat: lipatan pertama membuat tepi lurus, lipatan kedua harus menimpa lipatan pertama dengan rapi, digeser dulu sampai tegak lurus; pojoknya menjadi patokan 90°), Right Angle Benchmark (Banding: patokan ditempel ke pojok benda, lalu pilih berimpit, lebih sempit, atau lebih lebar), dan Angle Detective (Detektif: periksa enam pojok benda di sekitar dengan patokan, pilah siku-siku atau bukan).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Lipat: kertas HVS menjadi patokan; Banding: pojok buku, pojok bingkai foto, dan pojok ubin lantai siku-siku; Banding: ujung gunting terbuka lancip; Banding: bukaan kipas lipat tumpul; Detektif: keenam pojok dipilah benar | Lipat: kertas koran; Banding: pojok atap rumah (tumpul); Banding: keenam pojok benar |

Near-miss tidak memenuhi misi: lipat kedua tanpa lipat pertama, lipat kedua tanpa menggeser sampai berimpit, melewati posisi tegak lurus, menjawab Banding tanpa menempel patokan (walau jawabannya benar), jawaban tertukar (lancip dan tumpul), hanya dua dari tiga pojok siku-siku, dan lima dari enam pojok Detektif atau pojok keenam salah jawab.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Pojok (A) | Temukan → Patokan → Banding → Putuskan | Bingkai Foto (empat pojok, tiga berimpit dengan patokan, satu tidak; pojok keempat lebih sempit, lancip; pojok pertama dipakai), Pintu Lemari (dua berimpit; pojok keempat lebih lebar, tumpul; pojok ketiga lebih sempit, diganti karena lancip), Papan Meja (tidak ada yang berimpit; pojok pertama lancip; pojok kedua lebih lebar, diganti karena tumpul) |

Ukuran pojok hanya ada di data (untuk menimbang), tidak tertulis di layar. Pengecoh dihitung dari banyak pojok dan banyak pojok siku (Temukan dan Patokan), serta dua jenis lain (Banding dan Putuskan). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Bingkai Pak Tukang (A) | 7 | Narasi Pak Tukang; arti siku-siku (pengecoh: lebih sempit dan lebih lebar dari patokan); besar siku-siku 90 (pengecoh 45 dan 180) dan banyak lipatan 2 (pengecoh 1 dan 3); ketuk 4 stik untuk pojok bingkai persegi panjang; isi 2 stik untuk pojok penggaris segitiga yang bukan siku-siku (3 pojok, 1 siku-siku); pojok yang masuk ke dalam patokan adalah lancip (pengecoh: tumpul dan siku-siku); penutup |

## Kejujuran konsep

- Lipat: pojok baru menjadi patokan bila lipat pertama dilakukan, lipatan kedua digeser sampai tegak lurus, lalu dilipat; geser dibatasi sepuluh derajat ke kiri dan kanan, kelipatan lima. Jumlah geseran dihitung mandiri.
- Banding: jawaban ditolak sebelum patokan ditempel; jenis pojok ditimbang dengan hasil kali titik dua sisi (bukan dengan perbandingan dengan 90 seperti di kode), dan pesan salah menjelaskan hubungan sisi dengan patokan. Pojok yang bukan siku-siku berbeda paling sedikit 20 dari 90 supaya terlihat.
- Detektif: tiga pojok siku-siku dan tiga bukan.
- Ukuran selain 90 tidak pernah tertulis di layar, ucapan, pesan, mesin, skenario, atau data ringkas; ukuran hanya untuk menggambar dan menimbang (derajat dan busur dibahas di sub-bab C).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa titik sudut, kaki sudut, kaki, vertex, sinar, busur, skala, releks, sudut nol, sudut lurus, sudut penuh, melukis, dan mengukur. Lancip dan tumpul hanya disebut secara kualitatif (lebih sempit dan lebih lebar dari patokan), sesuai Materi A.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai, semua pesan bisa dieja. Uji mutasi pada logika lab, mesin, skenario, misi, pengeja, dan data ringkas: satu angka atau satu syarat diubah, uji gagal.
