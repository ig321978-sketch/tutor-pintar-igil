# Matematika Kelas 5 · Bab 1 · Simulasi SMISCPA (pola hibrida)

Bab: Bilangan Cacah sampai 100.000 (`mtk-5-bab1`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab1`). Komponen: `src/components/modul/SimulasiK5Bab1.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab1.ts`, teks misi di `misi-teks-k5b1.ts`. Dimuat malas: registri akan memuat `SimulasiK5Bab1` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k5b1.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **empat sub-bab**: A (membaca, menulis, nilai tempat), B (membandingkan dan mengurutkan), C (komposisi dan dekomposisi), D (operasi hitung). Dikerjakan dalam empat gelombang, satu sub-bab per gelombang. Gelombang 1 sampai 3 belum didaftarkan di registri; Gelombang 4 menambah Sub-Bab D (pencapaian bab) dan mendaftarkan bab.

**Status: Gelombang 1 (Sub-Bab A) dan Gelombang 2 (Sub-Bab B), belum didaftarkan.**

Berkas Materi bab ini tidak diubah (`SubBabK5B1A–D.tsx`, `naskah-k5b1.ts`, `data-k5b1.ts`, `paket-k5b1.ts`, dan lainnya). Tokoh skenario: Yohana (A) dan Lukas (B), tokoh buku. Data dari Buku Siswa: tulisan Yohana 14.500; penduduk 26.932 (laki-laki 13.354, perempuan 13.578); obat 66.500; bilangan 87.986 (7 di ribuan); kartu 88.976, 40.350, 25.786; 20.040 dari naskah (nol penjaga). Sub-Bab B: banding 78.897 dan 87.897, 56.560 dan 57.000, 45.230 dan 46.001 (naskah), 56.475 dan 43.217, 13.234 kembar; skor dakon 56.560, 65.750, 57.000, 75.360; urut 56.475, 43.217, 78.897, 87.897; 85.350, 85.450, 85.550; garis sekitar acuan 40.000 dengan 38.500, 40.200, 39.999 (naskah). Uji mencocokkan data lab, mesin, skenario, dan ringkas dengan `data-k5b1.ts`.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Nilai Tempat (Tulis, Baca, Nilai) | `SimulasiLabTempatK5B1.tsx` + `lab-tempat-k5b1a.ts` | Mesin Nilai Tempat | Papan Data Desa (7 adegan) |
| B | Lab Banding (Banding, Garis, Urut) | `SimulasiLabBandingK5B1.tsx` + `lab-banding-k5b1b.ts` | Mesin Banding | Lomba Dakon (7 adegan) |

Mesin: `mesin-data-k5b1.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b1.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab1-ringkas.json`.

Pembantu: `model-banding-k5b1.tsx` (garis bilangan sepuluh ruas yang bisa diketuk, penanda huruf polos, label acuan), `eja-k5b1.ts` (pengeja suara bilangan sampai 100.000, termasuk bilangan bertitik ribuan, dan tanda hitung), `model-tempat-k5b1.tsx` (tabel enam kolom dengan titik polos sebanyak digit, kartu digit polos). `SimulasiMesinBertahapK3.tsx` mendapat prop opsional `eja` (bawaan `ejaK3`, yang hanya sampai 1.000); bab ini memberi `ejaK5B1` agar 14.500 terbaca "empat belas ribu lima ratus". Bab lain tidak berubah.

Metode luar buku dianyam. A: Tabel Nilai Tempat (Tulis), Membaca Bilangan Besar per periode (Baca), dan Balok Dienes Perluas: tiap tempat sepuluh dari tempat kanannya (Nilai dan pesan Tulis). B: Banding Digit per Tempat (Banding: kolom diperiksa dari kiri sampai ketemu penentu), Urutan di Garis Bilangan (Garis) dan Bilangan Acuan (acuan di Garis), serta urut naik dan turun (Urut).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas. Simulasi tidak memberi Poin Kualifikasi.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tulis: 14.500 dari kata; Tulis: 40.350 dengan nol penjaga; Baca: bacaan penduduk 26.932; Nilai: digit 7 pada 87.986 (ribuan, 7.000); Nilai: digit 4 pada 40.350 (puluh ribuan, 40.000) | Tulis 100.000 (enam tempat); pilih bacaan digit satu per satu (dijelaskan); nol di satuan 40.350 bernilai 0 |
| B | Banding: 78.897 dan 87.897 (penentu puluh ribuan); Banding: 56.560 dan 57.000 (penentu ribuan); Garis: 38.500, 39.999, 40.200 di ruasnya terhadap acuan 40.000; Urut: skor dakon naik; Urut: 56.475, 43.217, 78.897, 87.897 turun | Mulai dari kolom satuan (dijelaskan); 13.234 sama dengan 13.234; urut tiga bilangan dan cari yang tengah (85.450) |

Near-miss tidak memenuhi misi: 1.450 atau 15.400 untuk 14.500; 4.035 (nol hilang, dijelaskan), 40.305, 41.350, 43.050 untuk 40.350; bilangan benar yang belum diperiksa; 40.350 saat targetnya lain; bacaan 29.632 (dua digit bertukar) atau digit satu per satu; tempat salah, digit saja (7), atau nilai sebelum tempat dipilih; 4.000 atau 4 untuk 40.000; nol di ribuan untuk tantangan nol di satuan. B: tanda salah, tanda sebelum penentu ditemukan, kolom dilompati, pasangan lain, 40.200 diletakkan di kiri acuan (satu ruas bergeser), urutan terbalik arah, dua bilangan tertukar, urutan belum lengkap, dan dakon diurut turun saat diminta naik. Keadaan awal (tabel kosong, kolom belum dibuka, garis kosong, belum diketuk, belum menjawab) tidak memenuhi misi mana pun.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Nilai Tempat (A) | Tulis → Tempat → Nilai → Baca | 14.500 (1 di puluh ribuan = 10.000), 87.986 (7 di ribuan = 7.000), 40.350 (3 di ratusan = 300) |
| Mesin Banding (B) | Sejajar → Penentu → Tanda → Urut | 78.897 dan 87.897 (urut turun dengan 56.475), 56.560 dan 57.000 (naik dengan 65.750), 40.200 dan 38.500 (naik dengan 39.999) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: satu digit hilang (bilangan dibagi sepuluh), ribuan dan ratusan bertukar, tempat tetangga, digit saja, nilai di tempat tetangga, digit dibaca satu per satu. Digit fokus dipilih yang muncul sekali agar tidak ambigu. Mesin Banding: Sejajar menanyakan digit puluh ribuan kedua bilangan (pengecoh digit ribuan, satuan); Penentu menanyakan tempat pertama dari kiri yang berbeda (pengecoh satuan dan tempat tetangga); Tanda memilih kalimat < > = (pengecoh dua tanda lain); Urut menyusun tiga bilangan naik atau turun (pengecoh arah terbalik, urutan menurut satuan, tukar dua bilangan).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Papan Data Desa (A) | 7 | menulis 26.932 dari kata; banyak digit 13.578 (5 stik); digit puluhan 13.354 (5 stik); nilai 9 pada 26.932 (900), digit puluh ribuan 13.578, guna nol; 4.035 dibetulkan menjadi 40.350 |
| Lomba Dakon (B) | 7 | 56.560 < 57.000 (dibandingkan dari kiri); 2 tempat diperiksa sampai penentu (2 stik); digit penentu 75.360 (7 stik); skor terbesar, 45.230 dan 46.001, 43.217 di kiri acuan 50.000, bilangan tengah 85.450; urut naik skor dakon |

## Kejujuran konsep

- Tulis: bilangan anak dihitung dari digit kolom; lab menolak bilangan di atas 100.000 dan digit lebih dari sembilan. Pesan membacakan bilangan anak, jadi anak membandingkan sendiri bacaan dan target.
- Baca, Nilai, mesin, skenario, dan ringkas: kunci dan semua pengecoh dihitung dari bilangan dan diuji dengan hitungan mandiri yang berbeda (digit dibaca dari teks angka, tempat dihitung dari kanan, nilai dibentuk dengan menempelkan nol). Kata bilangan di empat tempat (lab, mesin, pengeja, data Materi) dibandingkan untuk semua bilangan 1 sampai 100.000.
- Banding: tanda dicari dengan membandingkan teks lima digit (urutan kamus) dan penentu dengan menyusuri teks, berbeda dari kode (angka dan findIndex). Garis: ruas dicari dengan penjumlahan berulang; setiap bilangan digeser satu ruas ke kiri atau kanan harus ditolak. Urut: urutan dicari dengan sisip satu per satu, bukan sort. Tanda sebelum penentu ditemukan ditolak walau benar.
- Hanya bilangan bulat.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab B (tanpa uraian, komposisi, menukar, jumlah, selisih, operasi hitung, perkiraan, menyimpan, meminjam, dan tanpa lambang + − × ÷ ≈; "kurang dari" dan "lebih dari" adalah bacaan tanda banding). Sub-Bab A juga bebas konsep B (tanpa membandingkan, urut, acuan, garis bilangan, dan tanpa lambang < >).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa membandingkan, mengurutkan, acuan, uraian, komposisi, menukar, jumlah, selisih, operasi hitung, perkiraan, menyimpan, meminjam, dan tanpa lambang < > + − × ÷ ≈ di teks.

## Coba ini! (ringkas)

- **A:** naikkan satu kolom melewati sembilan; tulis 40.350 tanpa nol; pilih bacaan digit satu per satu; ketuk kedua digit delapan pada 87.986.
- **B:** ketuk kolom satuan lebih dulu; pilih tanda sebelum penentu ketemu; letakkan 40.200 di kiri acuan; urut skor dakon dari yang terbesar.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan semua tampilan lab; berpindah tampilan lab mengosongkan pesan lab agar tidak menyesatkan. Suara memakai `speakGuru`; bilangan dan tanda hitung dieja oleh `ejaK5B1`.

## Uji

- `node --no-warnings scripts/uji-lab-k5b1.mjs` (2.220 cek): kata dan lambang 1 sampai 100.000; pengeja; data sama dengan buku; Lab Nilai Tempat (dibandingkan dengan hitungan mandiri, fuzz 20.000 aksi, semua pesan dieja menjadi kata); mesin (kunci dan semua pengecoh dihitung ulang mandiri, letak kunci bervariasi); skenario (kunci dihitung dari data); misi dan near-miss lewat aksi lab; gerbang; data ringkas; konsep tidak bocor; tanpa jaringan, tanpa `correct_index` atau `explanation`
- `node --no-warnings scripts/uji-skenario-umum.mjs`: termasuk skenario Kelas 5 Bab 1 A dan B
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas5-bab1-ringkas.json`
