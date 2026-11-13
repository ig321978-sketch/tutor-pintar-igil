# Matematika Kelas 5 · Bab 9 · Simulasi SMISCPA (pola hibrida)

Bab: Bilangan Cacah sampai 1.000.000 (`mtk-5-bab9`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab9`). Komponen: `src/components/modul/SimulasiK5Bab9.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab9.ts`, teks misi di `misi-teks-k5b9.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir).

Bab ini punya **tiga sub-bab**: A (membaca, menulis, dan nilai tempat), B (membandingkan dan mengurutkan), dan C (komposisi dan dekomposisi). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A (Sub-Bab A, Membaca, Menulis, dan Nilai Tempat) dan gelombang B (Sub-Bab B, Membandingkan dan Mengurutkan) selesai. Gelombang C menyusul. Bab belum didaftarkan di registri.**

Berkas Materi bab ini tidak diubah (`SubBabK5B9A–C.tsx`, `naskah-k5b9.ts`, `data-k5b9.ts`, `paket-k5b9.ts`, dan lainnya). Pengeja suara memakai `ejaK5B9` (berkas baru `eja-k5b9.ts`) lewat prop `eja` mesin dan di lab. Pengeja ini mengeja bilangan sampai satu juta (titik pemisah ribuan dibaca sebagai satu bilangan) serta tanda tambah, kurang, kali, bagi, sama dengan, lebih besar, lebih kecil, dan kurung.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `979.875` | sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima |
| `9 × 100.000 = 900.000` | sembilan dikali seratus ribu sama dengan sembilan ratus ribu |
| `999.999 + 1 = 1.000.000` | sembilan ratus sembilan puluh sembilan ribu sembilan ratus sembilan puluh sembilan ditambah satu sama dengan satu juta |

Kata bilangan diuji untuk semua bilangan 1 sampai 1.000.000 terhadap hitungan mandiri per digit di skrip uji. Tokoh skenario A: Nisa, yang melihat lemari Jepara bersama Ibu (tokoh dari Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Nilai Tempat (Baca, Tabel, Nilai) | `SimulasiLabNilaiK5B9.tsx` + `lab-nilai-k5b9a.ts` | Mesin Nilai Tempat | Nisa dan Lemari Jepara (8 adegan) |
| B | Lab Banding (Banding, Urut, Simbol) | `SimulasiLabBandingK5B9.tsx` + `lab-banding-k5b9b.ts` | Mesin Banding | Lukas dan Sepatu (8 adegan, menyentuh tabel nilai tempat A) |

Mesin: `mesin-nilai-k5b9.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b9.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-nilai-k5b9.tsx` (tabel nilai tempat enam kolom dari ratus ribuan sampai satuan, kolom kosong bertanda tanya, kolom yang ditandai bergaris emas, kolom yang ditunjuk salah bergaris merah, dan kolom jutaan ketujuh untuk satu juta). Model B: `model-banding-k5b9.tsx` (dua baris angka dalam tabel tempat; kolom yang sudah dilewati karena sama berlatar hijau, penunjuk bergaris emas, dan kolom pertama yang berbeda bergaris merah). Mesin B: `mesin-banding-k5b9.ts`. Skenario B: `skenario-k5b9.ts` (`SKENARIO_K5B9B`). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab9-ringkas.json`. Uji: `scripts/uji-lab-k5b9.mjs`.

Metode luar buku yang dianyam. A: Indonesian Number-Name Mapping (Baca: kelompok sebelum titik dibaca lebih dulu dan diikuti kata ribu, lalu kelompok sesudahnya, nol tidak diucapkan), Place Value Chart Protocol (Tabel: bilangan dalam kata ditulis ke enam kolom tempat, kolom yang tidak diucapkan diisi nol, hasil dibaca ulang), dan Digit-Place Value Link (Nilai: nilai angka sama dengan angka dikali nilai tempatnya; 999.999 ditambah 1 menjadi satu juta, batas bab). B: Leftmost Place Priority (Banding: penunjuk dimulai dari kolom paling kiri), Digit-by-Digit Comparison (Banding: bila angka sama, geser ke kanan, dan berhenti di kolom pertama yang berbeda; mencoba dari satuan ditolak dengan contoh yang menyesatkan), dan Ordering Protocol (Urut: bilangan diurutkan naik atau turun dengan membandingkan tetangga berulang, lalu Simbol: lebih besar dari, lebih kecil dari, atau sama dengan).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Baca: harga lemari 979.875 dibaca dari kiri (kelompok kiri lalu kanan); Baca: harga sepeda motor 500.040 yang bernol di tengah; Tabel: bilangan dalam kata ditulis ke enam kolom sampai benar; Tabel: kolom yang tertukar pada tabel teman ditemukan; Nilai: nilai angka 9 di ratus ribuan (900.000) dan 999.999 + 1 dibaca satu juta | Baca: keenam bilangan dibaca benar; Tabel: keenam tabel benar dan kolom salah keenam tabel teman ditemukan; Nilai: tempat dan nilai angka keenam bilangan benar |
| B | Banding: sepatu Lukas dan Komang (kolom kiri langsung beda); Banding: dua ponsel (geser tiga kolom, beda di ratusan); Banding: mencoba dari satuan pada nomor undian dan melihat mengapa ditolak; Urut: tiga harga sepatu naik dan tiga harga ponsel turun; Simbol: lebih kecil dari untuk dua harga motor dan sama dengan untuk dua bilangan yang sama | Banding: keenam pasangan benar; Urut: keenam kelompok (naik dan turun, tiga dan empat bilangan) benar; Simbol: keenam pasangan benar, termasuk dua pasangan yang sama |

Near-miss tidak memenuhi misi: membaca kelompok kanan sebelum kelompok kiri benar, kelompok kiri atau kanan yang salah (digit dalam kelompok tertukar), mencatat bacaan bilangan lain saja, tabel dengan kolom kosong, satu kolom salah, dua kolom bertetangga tertukar (puluh ribuan dan ratus ribuan), menunjuk kolom teman sebelum tabel sendiri benar, menunjuk kolom yang justru benar, menunjuk hanya satu dari dua kolom yang salah, nilai sebelum tempat benar, nilai angka saja atau nilai tempat saja, satu juta sebelum menekan tambah satu, dan bacaan seratus ribu atau sepuluh juta. Sub-Bab B: berhenti di kolom yang masih sama, memilih hasil sebelum berhenti di kolom beda, menggeser melewati kolom beda, hasil banding salah (atas dan bawah tertukar, atau sama besar), mencoba dari satuan pada pasangan yang hasilnya kebetulan sama (tidak dicatat), susunan awal diperiksa tanpa diurutkan, urutan arah berlawanan, kebalikan urutan, satu urutan naik saja tanpa urutan turun, tanda salah (termasuk tanda selain sama dengan untuk bilangan yang sama), dan pasangan lain.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Nilai Tempat (A) | Baca → Tulis → Tempat → Nilai | Lemari Jepara (979.875; angka 7 yang pertama di puluh ribuan; angka 9 di ribuan bernilai 9.000), Sensus Gianyar (963.000; angka 6 di puluh ribuan; angka 9 di ratus ribuan bernilai 900.000), Nol Penyangga (500.040; angka 4 di puluhan; bernilai 40) |

| Mesin Banding (B) | Kolom → Banding → Urut → Simbol | Harga Sepatu (432.543 dan 342.231 beda di ratus ribuan; urut naik 232.231, 342.231, 432.543), Beda Ratusan (599.198 dan 599.047 beda di ratusan; urut turun 599.198, 599.047, 432.543), Beda Puluhan (789.867 dan 789.876 beda di puluhan; urut naik 676.785, 789.867, 789.876; simbol dengan urutan terbalik) |

Pengecoh dihitung dari kesalahan khas: kelompok atau angka bertetangga tertukar dan nol yang terlewat (Baca dan Tulis; bacaan pengecoh adalah bacaan bilangan pengecoh), tempat di sebelah tempat yang benar (Tempat), serta angka saja dan nilai tempat saja (Nilai). Pengecoh Mesin Banding: kolom di sebelah kolom beda, satuan, atau ratus ribuan (Kolom); bilangan lain dan sama besar (Banding); urutan kebalikan dan dua bilangan pertama yang berpindah (Urut); dua hubungan lain (Simbol). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Nisa dan Lemari Jepara (A) | 8 | Narasi Nisa dan harga lemari; membaca 979.875 (pengecoh: sembilan juta, dan kata ribu terlewat); ketuk 6 stik untuk 6 angka; tempat angka 7 (puluh ribuan) dan angka 5 (satuan); nilai angka 9 (900.000) dan angka 7 (70.000); lima ratus ribu empat puluh ditulis 500.040 (pengecoh 540 dan 50.040) dan alasan nol tetap ditulis; 999.999 + 1 dibaca satu juta (pengecoh seratus ribu dan sepuluh juta); penutup. |
| Lukas dan Sepatu (B) | 8 | Narasi Lukas yang mengajak memakai tabel nilai tempat; mulai dari kolom paling kiri (pengecoh satuan, dan kolom mana saja); sepatu termahal Lukas dan termurah Nisa; ketuk 4 stik untuk 599.198 dan 599.047 (tiga kolom sama, kolom keempat beda); 599.198 lebih besar dan kolom ratusan yang menentukan; 789.876 dan 789.867 (satuan menyesatkan, puluhan menentukan); urut naik 232.231, 342.231, 432.543 dan tanda lebih kecil dari; penutup. |

## Kejujuran konsep

- Baca: kelompok kiri dan kanan dipilih dari tiga pilihan; pengecohnya dihitung dari dua digit yang tertukar dalam kelompok yang sama dan dicek mandiri. Kelompok kanan hanya bisa dipilih setelah kelompok kiri benar. Bacaan lengkap dicocokkan mandiri dengan pembaca per digit untuk semua bilangan 1 sampai 1.000.000.
- Tabel: bilangan dalam kata ditulis ke enam kolom (tombol naik dan turun, kolom kosong tidak boleh); kolom kosong ditolak, tabel salah disebut kolomnya, dan dua kolom bertetangga yang tertukar disebut tertukar. Tabel teman: empat dari enam punya dua kolom tertukar dan dua punya satu kolom berganti angka; semua kolom yang berbeda harus ditunjuk (dihitung mandiri dari digit), dan menunjuk kolom yang benar ditolak.
- Nilai: tempat angka lebih dulu, baru nilainya; nilai dihitung mandiri dari angka dikali sepuluh pangkat banyak nol di belakangnya. Satu juta hanya bisa dibaca setelah tambah satu ditekan.
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa membandingkan, lebih besar atau lebih kecil, mengurutkan, menyusun, menguraikan, dan bentuk panjang.
- Fuzz 20.000 aksi Lab Nilai Tempat: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri memeriksa tiap id baru, termasuk kemajuan kelompok kiri, tabel sendiri sebelum tabel teman, dan tempat sebelum nilai). Indeks pecahan, negatif, dan di luar batas diabaikan.
- Emoji: paling baru Emoji 12 (diuji pada semua berkas simulasi dan data ringkas Bab 9). Temuan Materi: `naskah-k5b9.ts` dan `kelas5-bab9.json` memuat emoji di atas Emoji 12; tidak diubah dan hanya dilaporkan.
- Banding (B): penunjuk dimulai di kolom paling kiri dan hanya bergeser bila angka di kolom itu sama; menggeser dari kolom yang beda ditolak, berhenti di kolom yang masih sama ditolak, dan hasil hanya bisa dipilih setelah berhenti di kolom pertama yang berbeda. Kolom pertama yang beda dan hasil banding dihitung mandiri dari selisih bilangan dan teks berpanjang enam (40.000 pasangan acak), bukan dari perbandingan kolom seperti di kode.
- Satuan (B): mencoba membandingkan dari satuan hanya dicatat bila hasilnya memang menyesatkan (pasangan 3 sampai 6 dari enam pasangan, dihitung mandiri dari angka satuan); pada pasangan yang hasilnya kebetulan sama pesan tetap menolak caranya tanpa mencatat.
- Urut (B): daftar selalu permutasi susunan awal; urutan hanya diterima bila sama dengan urutan mandiri (sortir numerik); penyelesai mandiri memakai urutan gelembung lewat aksi turunkan; pesan penolakan menyebut pasangan tetangga pertama yang salah. Arah naik dan turun serta tiga dan empat bilangan diuji, dan susunan awal tidak pernah sudah urut.
- Simbol (B): hubungan dihitung mandiri dari selisih; dua dari enam pasangan sama besar, dan letak kunci berputar.
- Konsep Sub-Bab C tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa menyusun, menguraikan, bentuk panjang, dan penukaran tempat.
- Fuzz 20.000 aksi Lab Banding: batas terjaga (penunjuk tidak pernah melewati kolom beda, daftar urut tetap permutasi), riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri memeriksa tiap id baru), dan indeks pecahan atau di luar batas diabaikan.
