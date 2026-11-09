# Naskah Matematika Kelas 2 SD, Bab 5: Pecahan, Sub-Bab C: Seperempat dari Benda Utuh

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b5.ts` dan `src/components/modul/data-k2b5.ts`, oleh `scripts/buat-naskah-md-k2b5.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 5 hlm. 125–154) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab5`, sub-bab C |
| Berkas data | `src/data/kelas2-bab5.json` (dibangkitkan `src/content-master/buat-k2-bab5.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab5` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan: Pecahan (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Bab 4 | Dilewati sesuai urutan perintah pemilik; modul Bab 4 belum dibuat. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menunjukkan seperempat dari benda utuh dengan membagi benda menjadi empat bagian sama besar, menemukan seperempat di sekitar, menghubungkan utuh, setengah, dan seperempat, serta membuat karya dari potongan setengah dan seperempat.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 5: Pecahan, Sub-Bab C hlm. 142–154).

**Sasaran.** Siswa membagi satu benda utuh menjadi empat bagian sama besar, menyebut setiap bagian sebagai seperempat, mendapatkan seperempat dengan memotong atau melipat dua kali, menghubungkan utuh, setengah, dan seperempat, serta membedakan bagian yang seperempat dari yang bukan.

**Suara Silabus.** Kita belajar seperempat dari benda utuh. Kira ingin memakan martabak bersama Malosi, Upe, dan Tika, jadi martabak dipotong menjadi empat bagian yang sama besar. Setiap bagian dinamakan seperempat. Kita memotong dua kali, melipat kertas, dan menghubungkan utuh, setengah, dan seperempat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG satu layar seperti Kelas 2 Bab 1: tiga cerita disusun berurutan dalam satu pemutar, mulai saat Mulai diketuk (tidak ada putar otomatis) | 3 cerita, 9 adegan, 32 ketukan |
| M. Mind-Map | Peta pikiran "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dengan cabang berwarna. Kartu hanya memuat ikon dan judul, uraiannya dibacakan Suara Guru saat kartu diketuk | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang dipotong, dilipat, dituang, dibagi, dan dipasangkan | 4 permainan |
| P. Picture | Diagram polos: bangun berbagi bagian, titik dan garis, tabel pilihan | 3 permainan |
| A. Abstract | Kata dan lambang: kalimat, tabel, petunjuk tertulis, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bangun polos, titik, dan lingkaran polos).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tampilannya satu layar, sama dengan Kelas 2 Bab 1. Tidak ada adegan yang berjalan sendiri. Siswa mengetuk **▶ Mulai**, lalu ketiga cerita berjalan berurutan sebagai satu video. Nomor adegan bisa diketuk untuk melompat. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Cerita 1: Martabak untuk Empat Sahabat (Empat bagian sama besar)

**Adegan 1. Kira ingin berbagi** (`K2B5C-V1-1`)

1. Kira mempunyai satu martabak manis.  
   _Papan layar:_ Satu martabak
2. Kira ingin memakannya bersama Malosi, Upe, dan Tika.  
   _Papan layar:_ Bersama tiga teman
3. Berarti ada empat anak yang akan makan.  
   _Papan layar:_ Empat anak
4. Kira membagi martabaknya menjadi 4 bagian sama besar.  
   _Papan layar:_ Empat bagian sama

**Adegan 2. Memotong menjadi empat** (`K2B5C-V1-2`)

1. Perhatikan kue martabak manis ini.  
   _Papan layar:_ Martabak utuh
2. Kita dapat memotongnya menjadi empat bagian sama besar.  
   _Papan layar:_ Empat bagian sama besar
3. Bagaimana cara memotongnya agar menjadi empat bagian sama besar?  
   _Papan layar:_ Bagaimana memotongnya?

**Adegan 3. Seperempat** (`K2B5C-V1-3`)

1. Kita memotong satu martabak utuh menjadi empat bagian sama besar.  
   _Papan layar:_ Satu jadi empat
2. Setiap hasil potongannya bernilai seperempat.  
   _Papan layar:_ Bernilai seperempat
3. Setiap sahabat mendapat seperempat martabak.  
   _Papan layar:_ Tiap sahabat seperempat

### Cerita 2: Utuh, Setengah, Seperempat (Potong dua kali)

**Adegan 4. Apel yang dipotong** (`K2B5C-V2-1`)

1. Mulai dari satu apel utuh.  
   _Papan layar:_ Satu apel utuh
2. Apel dipotong menjadi dua sama besar, dan setiap bagian adalah setengah apel.  
   _Papan layar:_ Setengah apel
3. Setengah apel dipotong lagi menjadi dua sama besar, dan setiap bagian adalah seperempat apel.  
   _Papan layar:_ Seperempat apel

**Adegan 5. Dua kali memotong** (`K2B5C-V2-2`)

1. Untuk mendapat seperempat, kita memotong dua kali.  
   _Papan layar:_ Potong dua kali
2. Mula-mula potong menjadi dua bagian sama besar. Kita mendapat setengah bagian.  
   _Papan layar:_ Potong pertama
3. Lalu potong lagi setiap setengah bagian menjadi dua potong sama besar.  
   _Papan layar:_ Potong kedua
4. Sekarang kita mendapat seperempat bagian.  
   _Papan layar:_ Seperempat bagian

**Adegan 6. Seperempat di sekitar** (`K2B5C-V2-3`)

1. Kita dapat menemukan seperempat benda di sekitar kita.  
   _Papan layar:_ Seperempat di sekitar
2. Ada seperempat apel, seperempat puding, dan seperempat kue bolu.  
   _Papan layar:_ Apel, puding, bolu
3. Dua seperempat disatukan menjadi satu setengah.  
   _Papan layar:_ 2 seperempat = setengah
4. Empat seperempat disatukan menjadi satu utuh.  
   _Papan layar:_ 4 seperempat = utuh

### Cerita 3: Melipat dan Berkarya (Seperempat dengan kertas)

**Adegan 7. Lipat menjadi empat** (`K2B5C-V3-1`)

1. Ambil selembar kertas berbentuk persegi.  
   _Papan layar:_ Kertas persegi
2. Lipat kertas itu menjadi empat bagian sama besar.  
   _Papan layar:_ Lipat jadi empat
3. Lalu tunjukkan seperempat.  
   _Papan layar:_ Tunjukkan seperempat

**Adegan 8. Banyak cara** (`K2B5C-V3-2`)

1. Kertas bisa dilipat dua kali dengan beberapa cara.  
   _Papan layar:_ Dua kali melipat
2. Bisa dilipat tegak lalu mendatar, dan empat bagiannya berbentuk persegi.  
   _Papan layar:_ Tegak lalu mendatar
3. Bisa juga dilipat miring dua kali, dan empat bagiannya berbentuk segitiga.  
   _Papan layar:_ Miring dua kali
4. Apa pun caranya, keempat bagian harus sama besar.  
   _Papan layar:_ Harus sama besar

**Adegan 9. Ayo Berkarya** (`K2B5C-V3-3`)

1. Ambil empat lembar kertas berbentuk lingkaran.  
   _Papan layar:_ Empat lingkaran
2. Lipat satu lingkaran menjadi setengah dan potong.  
   _Papan layar:_ Satu jadi setengah
3. Lipat tiga lingkaran, masing-masing menjadi seperempat, dan potong.  
   _Papan layar:_ Tiga jadi seperempat
4. Susun potongannya menjadi bentuk yang menarik, misalnya ikan, lalu warnai.  
   _Papan layar:_ Susun jadi ikan

## 5. Tahap 2: Mind-Map (peta pikiran)

Tampilan "Taman Ide": matahari berwajah Igil di tengah, kartu bernomor di kiri dan kanan dihubungkan cabang berwarna. Setiap kartu hanya memuat nomor, ikon, dan judul langkah. Uraian di bawah dibacakan Suara Guru saat kartu diketuk dan tidak tampil di layar.

**1. Dari Setengah ke Seperempat** 🥞  
Di Sub-Bab A kita membagi benda menjadi dua bagian sama besar. Sekarang kita membagi menjadi empat bagian sama besar. Kira ingin berbagi martabak dengan tiga teman, jadi ada empat anak yang makan. Empat anak berarti empat bagian yang sama besar.

_Alur:_ Dari setengah → Empat bagian sama besar

**2. Empat Bagian Sama Besar** 🍕  
Seperempat muncul ketika satu benda utuh dibagi menjadi empat bagian yang sama besar. Seperti pada setengah, kata kuncinya adalah sama besar. Empat potongan yang sebagian besar dan sebagian kecil bukan seperempat. Periksa ukuran keempat bagian sebelum menyebutnya seperempat.

_Alur:_ Empat bagian sama besar → Seperempat itu apa

**3. Seperempat Itu Apa?** 🔍  
Setiap bagian dari empat bagian sama besar dinamakan seperempat. Setiap sahabat mendapat seperempat martabak. Seperempat ditulis dengan lambang seperempat. Seperempat lebih kecil dari setengah karena potongannya dibagi lagi.

_Alur:_ Seperempat itu apa → Potong dua kali

**4. Potong Dua Kali** 🔪  
Cara mudah mendapat seperempat adalah memotong dua kali. Pertama, potong benda menjadi dua bagian sama besar sehingga kita mendapat setengah. Kedua, potong lagi tiap setengah menjadi dua potong yang sama besar. Sekarang ada empat potong, dan tiap potong adalah seperempat.

_Alur:_ Potong dua kali → Utuh, setengah, seperempat

**5. Utuh, Setengah, Seperempat** 🍎  
Satu apel utuh dipotong dua menjadi setengah apel. Setengah apel dipotong lagi menjadi seperempat apel. Dari utuh ke setengah, lalu ke seperempat, bagiannya makin kecil dan makin banyak. Ketiganya berhubungan: setengah berasal dari utuh, seperempat berasal dari setengah.

_Alur:_ Utuh, setengah, seperempat → Dua seperempat, satu setengah

**6. Dua Seperempat, Satu Setengah** 🧩  
Kalau dua seperempat disatukan, kita mendapat satu setengah. Kalau empat seperempat disatukan, kita mendapat satu utuh. Hubungan ini bisa dicoba dengan potongan puding atau kue bolu. Menyatukan kembali potongan adalah cara memeriksa bahwa pembagian kita benar.

_Alur:_ Dua seperempat, satu setengah → Melipat kertas jadi empat

**7. Melipat Kertas Menjadi Empat** 📄  
Kertas persegi dapat dilipat dua kali. Lipat tegak lalu mendatar menghasilkan empat persegi kecil. Lipat miring dua kali menghasilkan empat segitiga. Lipat tegak dua kali menghasilkan empat jalur panjang. Bentuknya berbeda, tetapi keempat bagian selalu sama besar.

_Alur:_ Melipat kertas jadi empat → Tiga pertanyaan pemeriksa

**8. Tiga Pertanyaan Pemeriksa** ✅  
Saat melihat gambar yang katanya seperempat, ajukan tiga pertanyaan. Satu, apakah benda dibagi menjadi empat bagian? Dua, apakah keempat bagian sama besar? Tiga, apakah yang ditunjukkan satu bagian itu? Kalau ketiganya iya, itulah seperempat.

_Alur:_ Tiga pertanyaan pemeriksa → Siap menemukan seperempat

## 6. Tahap 3: Infografis

**Panel 1. Martabak untuk Empat Sahabat** 🥞 (4, Empat)

> Kira, Malosi, Upe, dan Tika makan martabak bersama. Martabak dipotong menjadi empat bagian sama besar, jadi setiap sahabat mendapat satu bagian.

**Panel 2. Seperempat Itu Apa?** 🍕 (4, Empat)

> Satu benda utuh dipotong menjadi empat bagian sama besar. Setiap hasil potongannya bernilai seperempat. Kata kuncinya adalah empat bagian dan sama besar.

**Panel 3. Utuh, Setengah, Seperempat** 🍎 (3, Tiga)

> Satu apel utuh dipotong menjadi setengah apel. Setengah apel dipotong lagi menjadi seperempat apel. Makin dipotong, bagiannya makin kecil dan makin banyak.

**Panel 4. Potong Dua Kali** 🔪 (2, Dua)

> Untuk mendapat seperempat, potong dua kali. Potong pertama membuat dua bagian sama besar. Potong kedua membagi tiap bagian menjadi dua sama besar.

**Panel 5. Seperempat di Sekitar Kita** 🍮 (3, Tiga)

> Kita dapat menemukan seperempat benda di sekitar kita. Ada seperempat apel, seperempat puding, dan seperempat kue bolu.

**Panel 6. Dua Seperempat** ➗ (2, Dua)

> Dua seperempat disatukan menjadi satu setengah. Jadi setengah sama dengan dua seperempat. Coba dengan dua potong puding.

**Panel 7. Empat Seperempat** 🧩 (4, Empat)

> Empat seperempat disatukan kembali menjadi satu benda utuh. Jadi satu utuh sama dengan empat seperempat.

**Panel 8. Melipat Menjadi Empat** 📄 (4, Empat)

> Kertas persegi dapat dilipat dua kali menjadi empat bagian sama besar. Bagiannya bisa persegi kecil, segitiga, atau jalur panjang. Apa pun bentuknya, keempat bagian sama besar.

**Panel 9. Ikan dari Lingkaran** 🐠 (4, Empat)

> Ayo Berkarya. Dari empat lingkaran kertas, satu dilipat menjadi setengah dan tiga dilipat menjadi seperempat. Potongannya disusun menjadi ikan yang menarik.

**Panel 10. Tiga Pertanyaan Pemeriksa** 🔍 (3, Tiga)

> Tiga pertanyaan pemeriksa seperempat. Satu, apakah dibagi menjadi empat bagian. Dua, apakah keempat bagian sama besar. Tiga, apakah yang ditunjukkan satu bagian itu.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Empat Potongan yang Adil | `choose-fair-four-cuts` | martabak (4 bagian, 3 dari 6 potongan adil); kue bolu (4 bagian, 3 dari 6 potongan adil); roti (4 bagian, 3 dari 6 potongan adil); puding (4 bagian, 3 dari 6 potongan adil) |
| 2 | Concrete | Lipat Dua Kali | `fold-twice-paper` | kertas persegi (4 lipatan pertama); kertas lingkaran (2 lipatan pertama) |
| 3 | Concrete | Belah Apel Bertahap | `halve-apple-twice` | apel, puding, kue bolu |
| 4 | Concrete | Susun Kembali Potongan | `rebuild-whole-from-pieces` | martabak menjadi seperempat; pizza menjadi setengah; kue bolu menjadi satu utuh |
| 5 | Picture | Warnai Seperempat | `color-quarter-faces` | Warnai seperempat dari tiap gambar; Warnai seperempat dari tiap gambar; Gambar sudah dibagi menjadi delapan bagian sama besar. Warnai seperempat dari tiap gambar |
| 6 | Picture | Tarik Garis Jadi Empat | `draw-two-dividing-lines` | persegi, persegi panjang, lingkaran, belah ketupat |
| 7 | Picture | Centang atau Silang | `check-cross-quarter` | 8 gambar, 4 menunjukkan seperempat |
| 8 | Abstract | Pasangkan Kata dan Lambang | `match-word-symbol` | ronde 1: 3 pasangan; ronde 2: 3 pasangan |
| 9 | Abstract | Isi Tabel Hubungan | `fill-table-relations` | ronde 1: tulis banyak bagiannya (4 baris); ronde 2: tulis namanya (4 baris) |
| 10 | Abstract | Peta Konsep Seperempat | `concept-map-fill` | Seperempat dari benda utuh; Setengah dan seperempat |

### Permainan 1. Empat Potongan yang Adil (Concrete)

- **Rujukan buku.** hlm. 142–143 (Kira membagi martabak menjadi 4 bagian sama besar; setiap hasil potongan bernilai seperempat)
- **Tujuan.** Memilih cara memotong benda nyata yang menghasilkan empat bagian sama besar dan menolak yang tidak sama besar.
- **Cara main.** Tiga ronde (martabak, kue bolu, roti, dan puding). Tiap ronde menampilkan enam gambar benda dengan pola garis potong berbeda. Siswa mengetuk semua pola yang membagi benda menjadi empat bagian sama besar, lalu menekan Periksa. Luas tiap bagian dihitung oleh program.
- **Ronde.** martabak (4 bagian, 3 dari 6 potongan adil); kue bolu (4 bagian, 3 dari 6 potongan adil); roti (4 bagian, 3 dari 6 potongan adil); puding (4 bagian, 3 dari 6 potongan adil)
- **Panduan suara.** Ketuk semua pola yang membagi menjadi empat sama besar.

### Permainan 2. Lipat Dua Kali (Concrete)

- **Rujukan buku.** hlm. 145 (Ayo Mencoba: lipat kertas menjadi empat bagian sama besar dan tunjukkan seperempat)
- **Tujuan.** Melipat kertas dua kali dengan lipatan yang pas sampai terbentuk empat bagian sama besar, lalu membuka lipatan dan menunjukkan seperempat.
- **Cara main.** Dua ronde (kertas persegi dan kertas lingkaran). Siswa memilih garis lipat pertama, lalu garis lipat kedua pada kertas yang sudah terlipat. Lipatan yang tidak menutup pas ditolak. Bila dua lipatan pas, kertas dibuka dan empat bagian sama besar tampak. Siswa mengetuk satu bagian sebagai seperempat.
- **Ronde.** kertas persegi (4 lipatan pertama); kertas lingkaran (2 lipatan pertama)
- **Panduan suara.** Pilih lipatan pertama dan kedua, lalu buka kertas dan tunjuk seperempat.

### Permainan 3. Belah Apel Bertahap (Concrete)

- **Rujukan buku.** hlm. 144 (satu apel utuh, setengah apel, seperempat apel; seperempat puding dan kue bolu)
- **Tujuan.** Membelah benda dua kali berturut-turut dan menyebut utuh, setengah, dan seperempat serta hubungan di antaranya.
- **Cara main.** Tiga ronde (apel, puding, kue bolu). Siswa menekan Belah untuk membagi benda utuh menjadi dua setengah, lalu menekan tiap setengah untuk membaginya lagi. Siswa mengetuk bagian yang disebut setengah dan seperempat, lalu menjawab berapa seperempat yang sama dengan satu setengah dan satu utuh.
- **Ronde.** apel, puding, kue bolu
- **Panduan suara.** Belah benda, ketuk setengah dan seperempat, lalu jawab.

### Permainan 4. Susun Kembali Potongan (Concrete)

- **Rujukan buku.** hlm. 143–144 (seperempat benda; hasil potongan bernilai seperempat), diperkaya menyatukan kembali potongan
- **Tujuan.** Menyusun potongan seperempat pada piring sampai membentuk seperempat, setengah, atau satu utuh, dan menyebut hasilnya.
- **Cara main.** Tiga ronde (martabak: satu potong, pizza: dua potong, kue bolu: empat potong). Empat potongan seperempat ada di meja. Siswa menyeret atau mengetuk potongan ke piring sesuai tugas. Setelah tugas selesai, siswa menyebut banyak potongan seperempat yang dipakai. Pada ronde terakhir siswa menjawab dengan suara.
- **Ronde.** martabak menjadi seperempat; pizza menjadi setengah; kue bolu menjadi satu utuh
- **Panduan suara.** Susun potongan seperempat di piring sesuai tugas.

### Permainan 5. Warnai Seperempat (Picture)

- **Rujukan buku.** hlm. 147 (Ayo Berlatih nomor 1: warnai seperempat dari gambar)
- **Tujuan.** Mewarnai bagian gambar sehingga yang diwarnai tepat seperempat dari seluruh gambar.
- **Cara main.** Tiga ronde, tiap ronde tiga gambar polos (belah ketupat, persegi, lingkaran, persegi panjang, segi delapan, segi enam). Gambar sudah dibagi menjadi empat bagian sama besar. Pada ronde terakhir dibagi menjadi delapan bagian, dan siswa mewarnai dua bagian. Luas yang diwarnai dihitung program.
- **Ronde.** Warnai seperempat dari tiap gambar; Warnai seperempat dari tiap gambar; Gambar sudah dibagi menjadi delapan bagian sama besar. Warnai seperempat dari tiap gambar
- **Panduan suara.** Ketuk bagian gambar sampai yang diwarnai tepat seperempat.

### Permainan 6. Tarik Garis Jadi Empat (Picture)

- **Rujukan buku.** hlm. 148 (Ayo Berlatih nomor 4: tarik garis pada gambar sehingga menghasilkan seperempat)
- **Tujuan.** Menarik dua garis lewat titik-titik sehingga bangun terbagi menjadi empat bagian sama besar, lalu mewarnai seperempatnya.
- **Cara main.** Empat ronde (persegi, persegi panjang, lingkaran, belah ketupat). Siswa menarik paling banyak dua garis dengan mengetuk dua titik untuk tiap garis. Dua garis yang tidak membagi empat sama besar ditolak dengan petunjuk, misalnya dua diameter lingkaran yang tidak saling tegak lurus. Bila sah, siswa mewarnai satu bagian.
- **Ronde.** persegi, persegi panjang, lingkaran, belah ketupat
- **Panduan suara.** Ketuk dua titik untuk tiap garis, lalu warnai seperempat.

### Permainan 7. Centang atau Silang (Picture)

- **Rujukan buku.** hlm. 147–148 (Ayo Berlatih nomor 2 dan 3: centang gambar yang seperempat, silang yang bukan)
- **Tujuan.** Menilai setiap gambar bagian berwarna sebagai seperempat atau bukan dengan tanda centang atau silang.
- **Cara main.** Satu ronde delapan gambar bertanda huruf A sampai H (segitiga, persegi, persegi panjang, lingkaran, segi lima, belah ketupat). Di bawah tiap gambar ada tombol centang dan silang. Jawaban yang keliru dijelaskan, misalnya bagian berwarna adalah setengah, bukan seperempat.
- **Ronde.** 8 gambar, 4 menunjukkan seperempat
- **Panduan suara.** Beri tanda centang bila seperempat, silang bila bukan.

### Permainan 8. Pasangkan Kata dan Lambang (Abstract)

- **Rujukan buku.** hlm. 128, 143, dan 149 (setengah, seperempat, satu utuh), diperkaya lambang pecahan
- **Tujuan.** Memasangkan kata pecahan dengan lambangnya dan lambang dengan artinya.
- **Cara main.** Dua ronde, tiap ronde tiga pasangan. Ronde 1: setengah, seperempat, dan satu utuh dengan lambangnya. Ronde 2: lambang dengan arti, yaitu dua bagian sama besar ambil satu, empat bagian sama besar ambil satu, dan tidak dibagi. Siswa mengetuk kartu kiri lalu kartu kanan yang cocok.
- **Ronde.** ronde 1: 3 pasangan; ronde 2: 3 pasangan
- **Panduan suara.** Ketuk kartu kiri, lalu kartu kanan yang cocok.

### Permainan 9. Isi Tabel Hubungan (Abstract)

- **Rujukan buku.** hlm. 144 dan 146 (utuh, setengah, seperempat), diperkaya hubungan antarpecahan
- **Tujuan.** Menuliskan hubungan banyak bagian dan nama hasil antara utuh, setengah, dan seperempat.
- **Cara main.** Dua ronde. Ronde 1: tulis banyak bagian, misalnya 1 utuh sama dengan berapa setengah dan berapa seperempat. Ronde 2: tulis nama hasilnya, misalnya setengah dari setengah adalah seperempat. Siswa mengetuk baris tabel, lalu mengetuk kartu yang tepat.
- **Ronde.** ronde 1: tulis banyak bagiannya (4 baris); ronde 2: tulis namanya (4 baris)
- **Panduan suara.** Ketuk baris tabel, lalu pilih kartu yang tepat.

### Permainan 10. Peta Konsep Seperempat (Abstract)

- **Rujukan buku.** hlm. 149 (Coba Pikirkan: isilah diagram seperempat)
- **Tujuan.** Melengkapi peta konsep seperempat dengan definisi, contoh, bukan contoh, cara memperoleh, dan hubungan dengan setengah.
- **Cara main.** Dua peta konsep, satu untuk seperempat dari benda utuh dan satu untuk hubungan setengah dan seperempat. Tiap peta punya empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Seperempat dari benda utuh; Setengah dan seperempat
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

## 8. Poin Penting dan Catatanku

- 🍕 **Seperempat**: satu dari empat bagian sama besar. _Suara:_ Seperempat adalah satu dari empat bagian yang sama besar. Satu benda utuh dipotong menjadi empat sama besar, setiap bagian bernilai seperempat.
- 🔪 **Potong dua kali**: dua kali dua bagian sama besar. _Suara:_ Untuk mendapat seperempat, potong dua kali. Potong menjadi dua sama besar, lalu potong lagi tiap bagian menjadi dua sama besar.
- 🍎 **Utuh, setengah, seperempat**: utuh → setengah → seperempat. _Suara:_ Satu utuh dipotong menjadi setengah, setengah dipotong menjadi seperempat. Bagiannya makin kecil dan makin banyak.
- 🧩 **Menyatukan kembali**: 2 seperempat = setengah, 4 seperempat = utuh. _Suara:_ Dua seperempat disatukan menjadi satu setengah. Empat seperempat disatukan menjadi satu utuh.
- 📄 **Melipat jadi empat**: lipat dua kali, bagian sama besar. _Suara:_ Kertas dilipat dua kali menjadi empat bagian sama besar. Bentuk bagiannya bisa berbeda, tetapi keempatnya selalu sama besar.

**Suara Poin Penting.** Ingat selalu! Seperempat adalah satu dari empat bagian yang sama besar. Untuk mendapatkannya, potong atau lipat dua kali. Dua seperempat sama dengan satu setengah, dan empat seperempat sama dengan satu utuh. Kalau keempat bagian tidak sama besar, itu bukan seperempat.

**Cara menyebutkan.** Empat bagian sama besar adalah seperempat. _Suara:_ Cara menyebutkan. Martabak dipotong menjadi empat bagian sama besar, setiap bagian adalah seperempat martabak.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: lipat selembar kertas menjadi empat bagian sama besar dengan sebanyak mungkin cara. Potong sebuah roti atau kue menjadi empat bagian sama besar bersama keluargamu. Susun potongan kertas lingkaran menjadi gambar ikan, lalu ceritakan berapa setengah dan berapa seperempat yang kamu pakai.

**Refleksi (Catatanku).**

- Aku dapat menunjukkan seperempat dari benda utuh.
- Aku dapat menghubungkan utuh, setengah, dan seperempat.
- Aku dapat menyusun potongan menjadi karya yang menarik.
- Aku belajar dengan tertib.

## 9. Metode dari luar buku yang diadopsi

- **Potong dua kali (halving twice)**: seperempat adalah setengah dari setengah. Permainan Belah Apel Bertahap dan Lipat Dua Kali menampilkan proses bertahap dengan pertanyaan di setiap langkah.
- **Lipat kertas dua kali dengan beberapa cara**: tegak lalu mendatar menghasilkan empat persegi kecil, miring dua kali menghasilkan empat segitiga, dan tiga lipatan tegak menghasilkan empat jalur. Bentuk berbeda tetapi luasnya sama.
- **Hubungan bagian dan seluruh**: 1 utuh sama dengan 2 setengah dan sama dengan 4 seperempat, 1 setengah sama dengan 2 seperempat. Dasar penjumlahan dan perbandingan pecahan di kelas tinggi.
- **Membagi bangun dengan dua garis**: dua diameter lingkaran hanya membagi empat sama besar bila saling tegak lurus. Mesin menghitung luas keempat bagian, sehingga dua garis yang berpotongan miring ditolak.
- **Kerajinan potongan lingkaran (Ayo Berkarya)**: satu setengah dan tiga seperempat lingkaran disusun menjadi ikan. Menghubungkan pecahan dengan seni.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata ("setengah", "seperempat") supaya suara perangkat tidak salah membaca lambang pecahan.
- Dua garis pada ronde Tarik Garis Jadi Empat diterima hanya bila keempat bagian sama besar menurut luas. Dua diameter lingkaran yang tidak saling tegak lurus ditolak walau menghasilkan empat bagian.

