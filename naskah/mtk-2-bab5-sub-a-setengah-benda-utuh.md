# Naskah Matematika Kelas 2 SD, Bab 5: Pecahan, Sub-Bab A: Setengah dari Benda Utuh

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b5.ts` dan `src/components/modul/data-k2b5.ts`, oleh `scripts/buat-naskah-md-k2b5.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 5 hlm. 125–154) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab5`, sub-bab A |
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

**Capaian Pembelajaran (CP).** Siswa menunjukkan setengah dari benda utuh dengan membagi benda menjadi dua bagian sama besar, menemukan contoh setengah di sekitar, menjelaskan bahwa bagian yang tidak sama besar bukan setengah, serta menyampaikan pendapat dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 5: Pecahan, Sub-Bab A hlm. 125–134).

**Sasaran.** Siswa membagi satu benda utuh menjadi dua bagian sama besar, menyebut setiap bagian sebagai setengah, menemukan setengah pada benda di sekitar, melipat kertas untuk menemukan setengah dengan beberapa cara, serta membedakan bagian yang sama besar dari bagian yang tidak sama besar.

**Suara Silabus.** Kita belajar pecahan. Bukunya bernama Pecahan, bagian setengah dari benda utuh. Kira membagi martabak manis dengan Tika secara adil, jadi martabaknya harus dipotong menjadi dua bagian yang sama besar. Setiap bagian dinamakan setengah. Kita juga melipat kertas dan memeriksa gambar mana yang menunjukkan setengah. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 33 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang dipotong, dilipat, dituang, dibagi, dan dipasangkan | 4 permainan |
| P. Picture | Diagram polos: bangun berbagi bagian, titik dan garis, tabel pilihan | 3 permainan |
| A. Abstract | Kata dan lambang: kalimat, tabel, petunjuk tertulis, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bangun polos, titik, dan lingkaran polos).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Berbagi Martabak (Adil dan sama besar)

**Adegan 1. Oleh-oleh martabak** (`K2B5A-V1-1`)

1. Ibu memberi Kira oleh-oleh martabak manis.  
   _Papan layar:_ Martabak manis
2. Kira sangat senang. Ia teringat kepada Tika yang juga suka martabak manis.  
   _Papan layar:_ Ingat Tika
3. Kira membawa martabak manisnya ke rumah Tika.  
   _Papan layar:_ Ke rumah Tika
4. Kira ingin membagi martabaknya dengan Tika, dan ingin membaginya sama banyak.  
   _Papan layar:_ Bagi sama banyak

**Adegan 2. Pesan Ibu** (`K2B5A-V1-2`)

1. Ibu berpesan agar Kira membagi martabaknya dengan Tika secara adil.  
   _Papan layar:_ Bagi secara adil
2. Ibu juga berpesan agar Kira berhati-hati saat menggunakan pisau.  
   _Papan layar:_ Hati-hati pisau
3. Kira menggunakan pisau yang aman untuk anak-anak.  
   _Papan layar:_ Pisau yang aman

**Adegan 3. Bagaimana memotongnya?** (`K2B5A-V1-3`)

1. Bagaimana cara kita membagi martabak agar potongannya sama besar?  
   _Papan layar:_ Sama besar?
2. Kalau potongannya tidak sama besar, salah satu teman akan mendapat lebih sedikit.  
   _Papan layar:_ Tidak sama besar
3. Karena itu, kita perlu memotong tepat di tengah martabak.  
   _Papan layar:_ Potong di tengah

### Video 2: Apa Itu Setengah? (Dua bagian sama besar)

**Adegan 1. Memotong menjadi dua** (`K2B5A-V2-1`)

1. Perhatikan martabak manis ini.  
   _Papan layar:_ Martabak utuh
2. Kita dapat memotongnya menjadi dua bagian sama besar.  
   _Papan layar:_ Dua bagian sama besar
3. Kita memotong satu martabak utuh menjadi dua bagian sama besar.  
   _Papan layar:_ Satu jadi dua
4. Setiap hasil potongannya bernilai setengah.  
   _Papan layar:_ Bernilai setengah

**Adegan 2. Setengah di sekitar kita** (`K2B5A-V2-2`)

1. Kita dapat menemukan setengah benda di sekitar.  
   _Papan layar:_ Setengah di sekitar
2. Ada setengah semangka dan setengah kue bolu.  
   _Papan layar:_ Semangka dan bolu
3. Ada juga setengah gelas air dan setengah sendok gula.  
   _Papan layar:_ Gelas dan sendok
4. Lipatan kertas juga dapat menunjukkan setengah.  
   _Papan layar:_ Lipatan kertas
5. Amati sekitarmu, lalu temukan contoh setengah lainnya.  
   _Papan layar:_ Cari contoh lain

**Adegan 3. Ayo melipat kertas** (`K2B5A-V2-3`)

1. Ambil selembar kertas berbentuk persegi.  
   _Papan layar:_ Kertas persegi
2. Lipat kertas itu menjadi dua bagian sama besar.  
   _Papan layar:_ Lipat sama besar
3. Kamu bisa melipatnya tegak, mendatar, atau miring dari pojok ke pojok.  
   _Papan layar:_ Banyak cara melipat
4. Setiap cara menghasilkan setengah. Bentuknya bisa persegi panjang atau segitiga.  
   _Papan layar:_ Setengah bagian

### Video 3: Sama Besar atau Tidak? (Hanya yang sama besar adalah setengah)

**Adegan 1. Memotong lingkaran** (`K2B5A-V3-1`)

1. Kita dapat memotong lingkaran menjadi dua sama besar.  
   _Papan layar:_ Lingkaran dua bagian
2. Garis potongnya bisa tegak, mendatar, atau miring, asalkan lewat titik tengah.  
   _Papan layar:_ Lewat titik tengah
3. Hasilnya selalu setengah.  
   _Papan layar:_ Hasilnya setengah

**Adegan 2. Memotong segi empat** (`K2B5A-V3-2`)

1. Kita juga dapat memotong segi empat menjadi dua sama besar.  
   _Papan layar:_ Segi empat dua bagian
2. Potongan tegak, mendatar, atau dari pojok ke pojok menghasilkan setengah.  
   _Papan layar:_ Tiga cara memotong
3. Setiap potongan itu bernilai setengah.  
   _Papan layar:_ Bernilai setengah

**Adegan 3. Gambar A dan gambar B** (`K2B5A-V3-3`)

1. Perhatikan dua gambar segi empat ini.  
   _Papan layar:_ Gambar A dan B
2. Gambar A dipotong menjadi dua bagian sama besar, jadi gambar A menunjukkan setengah.  
   _Papan layar:_ A: setengah
3. Gambar B dipotong tidak sama besar, jadi gambar B bukan setengah.  
   _Papan layar:_ B: bukan setengah
4. Untuk menunjukkan setengah, satu benda harus dipotong menjadi dua yang sama besar.  
   _Papan layar:_ Dua yang sama besar

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Berbagi Secara Adil** 🤝  
Kira ingin membagi martabaknya dengan Tika secara adil. Adil berarti kedua teman mendapat bagian yang sama besar. Karena itu, kita tidak boleh memotong sembarangan. Bagian yang sama besar adalah awal dari pecahan, dan juga awal dari sikap saling menghargai.

_Alur:_ Berbagi adil → Memotong di tengah

**2. Memotong di Tengah** 🔪  
Supaya sama besar, benda dipotong tepat di tengah. Pada martabak yang bulat, garis potong harus lewat titik tengah. Kalau garis potong bergeser ke tepi, satu bagian menjadi besar dan satu bagian menjadi kecil. Pakai pisau yang aman, dan minta bantuan orang dewasa.

_Alur:_ Memotong di tengah → Dua bagian sama besar

**3. Dua Bagian Sama Besar** 🍰  
Satu benda utuh dipotong menjadi dua bagian sama besar. Setiap bagian yang dihasilkan dinamakan setengah. Dua bagian itu bisa ditumpuk dan akan pas menutup satu sama lain. Itulah ciri utama setengah: dua bagian, sama besar.

_Alur:_ Dua bagian sama besar → Setengah di sekitar

**4. Setengah di Sekitar Kita** 🍉  
Setengah ada di mana-mana. Ada setengah semangka, setengah kue bolu, setengah gelas air, setengah sendok gula, dan setengah lipatan kertas. Setiap kali kita membagi sesuatu menjadi dua bagian yang sama, kita menemukan setengah. Coba cari contoh lainnya di rumah dan di sekolah.

_Alur:_ Setengah di sekitar → Melipat kertas

**5. Berapa Cara Melipat?** 📄  
Selembar kertas persegi dapat dilipat menjadi dua bagian sama besar dengan beberapa cara: lipat tegak, lipat mendatar, dan lipat miring dari pojok ke pojok. Ada dua cara miring, jadi seluruhnya empat cara. Bentuk hasil lipatannya ada yang persegi panjang dan ada yang segitiga. Garis lipat yang pas akan membuat kedua sisi saling menutup.

_Alur:_ Melipat kertas → Lingkaran dan segi empat

**6. Lingkaran dan Segi Empat** ⭕  
Lingkaran dapat dibagi menjadi dua sama besar oleh garis apa pun yang lewat titik tengahnya. Segi empat, misalnya persegi, dapat dibagi oleh garis tegak, mendatar, atau miring dari pojok ke pojok. Segitiga sama kaki dibagi oleh garis dari puncak ke tengah alas. Bangunnya berbeda, tetapi aturannya sama: dua bagian harus sama besar.

_Alur:_ Lingkaran dan segi empat → Sama besar atau tidak

**7. Sama Besar atau Tidak?** ⚖️  
Tidak semua bagian dua adalah setengah. Kalau dua bagian tidak sama besar, bagian itu bukan setengah, walaupun jumlahnya dua. Warna yang berbeda tidak mengubah besar bagian. Periksa dengan melipat atau menumpuk: kalau kedua bagian pas, itu setengah.

_Alur:_ Sama besar atau tidak → Setengah dalam keseharian

**8. Tiga Pertanyaan Pemeriksa** 🔍  
Saat melihat gambar atau benda yang katanya setengah, ajukan tiga pertanyaan. Satu, apakah benda utuh itu dibagi menjadi dua bagian? Dua, apakah kedua bagian sama besar? Tiga, apakah satu bagian itu yang sedang ditunjukkan? Kalau ketiganya iya, itulah setengah.

_Alur:_ Setengah dalam keseharian → Siap menemukan setengah

## 6. Tahap 3: Infografis

**Panel 1. Berbagi Martabak** 🥞 (2, Dua)

> Kira membagi martabak manis dengan Tika. Agar adil, martabak dipotong menjadi dua bagian yang sama besar. Satu bagian untuk Kira dan satu bagian untuk Tika.

**Panel 2. Setengah Itu Apa?** 🍰 (2, Dua)

> Satu benda utuh dipotong menjadi dua bagian sama besar. Setiap hasil potongannya bernilai setengah. Kata kuncinya adalah dua bagian dan sama besar.

**Panel 3. Setengah di Sekitar Kita** 🍉 (5, Lima)

> Kita dapat menemukan setengah di sekitar. Ada setengah semangka, setengah gelas air, setengah sendok gula, setengah kue bolu, dan setengah lipatan kertas.

**Panel 4. Melipat Kertas** 📄 (4, Empat)

> Kertas persegi dapat dilipat menjadi dua bagian sama besar dengan empat cara. Lipat tegak, lipat mendatar, dan dua cara lipat miring dari pojok ke pojok.

**Panel 5. Setengah pada Segi Empat** 🟥 (3, Tiga)

> Segi empat dapat dibagi menjadi dua sama besar dengan garis tegak, garis mendatar, atau garis miring dari pojok ke pojok. Ketiganya menghasilkan setengah.

**Panel 6. Setengah pada Lingkaran** ⭕ (3, Tiga)

> Lingkaran dapat dibagi menjadi dua sama besar oleh garis tegak, mendatar, atau miring, asalkan garis itu lewat titik tengah lingkaran.

**Panel 7. Gambar A dan Gambar B** ✅ (2, Dua)

> Gambar A dibagi menjadi dua bagian sama besar, jadi gambar A menunjukkan setengah. Gambar B dibagi tidak sama besar, jadi gambar B bukan setengah.

**Panel 8. Setengah Gelas Air** 🥛 (2, Dua)

> Setengah gelas air berarti airnya mengisi separuh gelas. Bagian yang berisi air sama tingginya dengan bagian yang kosong. Kalau dituang ke gelas lain yang sama, kedua gelas sama banyak.

**Panel 9. Tiga Pertanyaan Pemeriksa** 🔍 (3, Tiga)

> Tiga pertanyaan pemeriksa setengah. Satu, apakah dibagi menjadi dua bagian. Dua, apakah kedua bagian sama besar. Tiga, apakah yang ditunjukkan satu bagian itu.

**Panel 10. Dua Setengah, Satu Utuh** 🧩 (2, Dua)

> Dua setengah disatukan kembali menjadi satu benda utuh. Setengah ditambah setengah sama dengan satu utuh. Setengah ditulis dengan lambang setengah.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Potongan yang Adil | `choose-fair-cuts` | martabak (2 bagian, 3 dari 6 potongan adil); kue bolu (2 bagian, 3 dari 6 potongan adil); roti (2 bagian, 3 dari 6 potongan adil); pizza (2 bagian, 3 dari 6 potongan adil) |
| 2 | Concrete | Lipat Kertas | `fold-paper-symmetry` | kertas persegi (4 cara); kertas lingkaran (3 cara); kertas segitiga (1 cara) |
| 3 | Concrete | Tuang Setengah | `pour-equal-glasses` | air (8 takaran); jus jeruk (6 takaran); sirup (10 takaran) |
| 4 | Concrete | Cari Setengah di Sekitar | `find-half-objects` | ronde 1: 3 dari 8 tepat setengah; ronde 2: 3 dari 8 tepat setengah |
| 5 | Picture | Warnai Setengah | `color-half-faces` | Warnai setengah dari tiap gambar; Warnai setengah dari tiap gambar; Gambar sudah dibagi menjadi empat bagian sama besar. Warnai setengah dari tiap gambar |
| 6 | Picture | Tarik Garis Jadi Dua | `draw-dividing-line` | persegi panjang, segitiga, lingkaran, trapesium |
| 7 | Picture | Setengah atau Bukan? | `classify-shaded-figures` | 8 gambar, 5 menunjukkan setengah |
| 8 | Abstract | Isi Kalimat Setengah | `fill-sentence-blanks` | ronde 1: 3 kalimat; ronde 2: 3 kalimat |
| 9 | Abstract | Benar atau Salah? | `true-false-statements` | ronde 1: 5 pernyataan (3 benar); ronde 2: 5 pernyataan (3 benar) |
| 10 | Abstract | Peta Konsep Setengah | `concept-map-fill` | Setengah dari benda utuh; Setengah dari kumpulan benda |

### Permainan 1. Potongan yang Adil (Concrete)

- **Rujukan buku.** hlm. 127–128 (Berbagi Sama Banyak; memotong satu martabak utuh menjadi dua bagian sama besar)
- **Tujuan.** Memilih cara memotong benda nyata yang menghasilkan dua bagian sama besar dan menolak yang tidak sama besar.
- **Cara main.** Empat ronde (martabak, kue bolu, roti, pizza). Tiap ronde menampilkan enam gambar benda dengan garis potong berbeda. Siswa mengetuk semua potongan yang adil, yaitu yang membagi benda menjadi dua bagian sama besar, lalu menekan Periksa. Luas bagian dihitung oleh program sehingga potongan yang nyaris tengah pun diperiksa dengan teliti.
- **Ronde.** martabak (2 bagian, 3 dari 6 potongan adil); kue bolu (2 bagian, 3 dari 6 potongan adil); roti (2 bagian, 3 dari 6 potongan adil); pizza (2 bagian, 3 dari 6 potongan adil)
- **Panduan suara.** Ketuk semua potongan yang membagi menjadi dua sama besar.

### Permainan 2. Lipat Kertas (Concrete)

- **Rujukan buku.** hlm. 130 (Ayo Mencoba: lipat kertas menjadi dua bagian sama besar dan tunjukkan setengah)
- **Tujuan.** Menemukan semua cara melipat kertas menjadi dua bagian yang saling menutup pas dan menyebut bentuk hasilnya.
- **Cara main.** Tiga ronde (kertas persegi, kertas lingkaran, kertas segitiga). Siswa memilih garis lipat dari daftar. Bagian yang dilipat tampak menutupi bagian lain. Bila pas, lipatan diterima dan bentuk hasilnya disebut. Bila ada yang menonjol, lipatan ditolak. Persegi punya empat cara, lingkaran banyak cara, segitiga hanya satu cara.
- **Ronde.** kertas persegi (4 cara); kertas lingkaran (3 cara); kertas segitiga (1 cara)
- **Panduan suara.** Pilih garis lipat, lalu lihat apakah kedua sisi menutup pas.

### Permainan 3. Tuang Setengah (Concrete)

- **Rujukan buku.** hlm. 129 (setengah gelas air, setengah sendok gula; menemukan setengah benda di sekitar)
- **Tujuan.** Menuang cairan dari satu wadah penuh ke wadah kedua yang sama sampai kedua wadah sama banyak, yaitu masing-masing setengah.
- **Cara main.** Tiga ronde (gelas air, botol jus, gelas sirup). Satu wadah penuh dan satu kosong. Siswa menekan Tuang untuk memindahkan satu takaran, dan Tuang Balik untuk mengembalikannya. Layar tidak memuat angka. Siswa berhenti ketika tinggi cairan kedua wadah sama, lalu menekan Periksa.
- **Ronde.** air (8 takaran); jus jeruk (6 takaran); sirup (10 takaran)
- **Panduan suara.** Tuang sedikit demi sedikit sampai kedua wadah sama tinggi.

### Permainan 4. Cari Setengah di Sekitar (Concrete)

- **Rujukan buku.** hlm. 129 (setengah semangka, setengah gelas air, setengah kue bolu; amati sekitar dan temukan contoh lain)
- **Tujuan.** Menemukan benda atau wadah yang tinggal tepat setengah di antara benda yang tinggal seperempat, tiga perempat, utuh, atau tidak sama besar.
- **Cara main.** Dua ronde, tiap ronde delapan benda dan gelas (semangka, apel, kue bolu, roti, puding, pizza, jeruk, gelas air, dan gelas jus). Siswa mengetuk semua yang tinggal tepat setengah. Benda yang salah memberi penjelasan bagian yang tersisa.
- **Ronde.** ronde 1: 3 dari 8 tepat setengah; ronde 2: 3 dari 8 tepat setengah
- **Panduan suara.** Ketuk semua benda yang tinggal tepat setengah.

### Permainan 5. Warnai Setengah (Picture)

- **Rujukan buku.** hlm. 132–133 (Ayo Berlatih nomor 1 dan 2: warnailah setengah dari setiap gambar)
- **Tujuan.** Mewarnai bagian gambar sehingga yang diwarnai tepat setengah dari seluruh gambar.
- **Cara main.** Tiga ronde, tiap ronde tiga gambar polos (segitiga, lingkaran, persegi panjang, segi lima, bentuk hati, belah ketupat, persegi). Gambar sudah dibagi menjadi bagian yang sama besar. Pada ronde terakhir gambar dibagi menjadi empat bagian sama besar, dan siswa harus mewarnai dua bagian. Luas yang diwarnai dihitung program, lalu siswa menekan Periksa.
- **Ronde.** Warnai setengah dari tiap gambar; Warnai setengah dari tiap gambar; Gambar sudah dibagi menjadi empat bagian sama besar. Warnai setengah dari tiap gambar
- **Panduan suara.** Ketuk bagian gambar untuk mewarnai sampai tepat setengah.

### Permainan 6. Tarik Garis Jadi Dua (Picture)

- **Rujukan buku.** hlm. 134 (Ayo Berlatih nomor 4: tarik garis sehingga gambar menjadi dua bagian sama besar, lalu warnai setengahnya)
- **Tujuan.** Menarik satu garis lewat dua titik sehingga bangun terbagi menjadi dua bagian sama besar, lalu mewarnai setengahnya.
- **Cara main.** Empat ronde (persegi panjang, segitiga, lingkaran, trapesium). Siswa mengetuk dua titik pada tepi bangun untuk menarik satu garis. Garis yang berimpit dengan tepi atau membuat bagian tidak sama besar ditolak dengan petunjuk. Bila sah, siswa mewarnai satu bagian sebagai setengah.
- **Ronde.** persegi panjang, segitiga, lingkaran, trapesium
- **Panduan suara.** Ketuk dua titik untuk menarik garis, lalu warnai setengahnya.

### Permainan 7. Setengah atau Bukan? (Picture)

- **Rujukan buku.** hlm. 133–134 (Ayo Berlatih nomor 3 dan 5: kelompokkan gambar yang setengah dan bukan setengah dalam tabel)
- **Tujuan.** Mengelompokkan gambar bagian berwarna menjadi yang menunjukkan setengah dan yang bukan setengah.
- **Cara main.** Delapan gambar bertanda huruf A sampai H (persegi panjang, segitiga, lingkaran, bentuk hati, bintang, segi enam). Siswa menyeret atau mengetuk tiap gambar ke kolom Setengah atau Bukan Setengah pada tabel. Gambar yang salah kembali dengan penjelasan bahwa bagian berwarna lebih kecil atau lebih besar dari setengah.
- **Ronde.** 8 gambar, 5 menunjukkan setengah
- **Panduan suara.** Taruh tiap gambar ke kolom Setengah atau Bukan Setengah.

### Permainan 8. Isi Kalimat Setengah (Abstract)

- **Rujukan buku.** hlm. 128 dan 132 (satu benda utuh dipotong menjadi dua bagian sama besar, setiap hasil potongan bernilai setengah)
- **Tujuan.** Melengkapi kalimat tentang setengah dengan banyak bagian, nama pecahan, lambang, dan syarat sama besar.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat dengan bagian kosong. Contoh: satu martabak utuh dipotong menjadi ... bagian sama besar. Siswa memilih satu dari tiga kartu untuk tiap bagian kosong. Kalimat yang lengkap dibacakan Suara Guru.
- **Ronde.** ronde 1: 3 kalimat; ronde 2: 3 kalimat
- **Panduan suara.** Pilih kartu yang tepat untuk bagian kosong.

### Permainan 9. Benar atau Salah? (Abstract)

- **Rujukan buku.** hlm. 128–134 (setengah, sama besar, melipat, lingkaran dan segi empat)
- **Tujuan.** Menilai kebenaran pernyataan tentang setengah dan menjelaskan alasannya.
- **Cara main.** Dua ronde, masing-masing lima pernyataan. Siswa menekan Benar atau Salah. Jawaban yang keliru dijelaskan alasannya dan boleh dicoba lagi.
- **Ronde.** ronde 1: 5 pernyataan (3 benar); ronde 2: 5 pernyataan (3 benar)
- **Panduan suara.** Baca pernyataan, lalu tekan Benar atau Salah.

### Permainan 10. Peta Konsep Setengah (Abstract)

- **Rujukan buku.** hlm. 149 (Coba Pikirkan: isilah diagram setengah)
- **Tujuan.** Melengkapi peta konsep setengah dengan definisi, contoh, bukan contoh, dan pendapat sendiri.
- **Cara main.** Dua peta konsep, satu untuk setengah dari benda utuh dan satu untuk setengah dari kumpulan benda. Tiap peta punya empat kotak: definisi, contoh, bukan contoh, dan pendapatku. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Setengah dari benda utuh; Setengah dari kumpulan benda
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

## 8. Poin Penting dan Catatanku

- 🍰 **Setengah**: satu dari dua bagian sama besar. _Suara:_ Setengah adalah satu dari dua bagian yang sama besar. Satu benda utuh dipotong menjadi dua sama besar, setiap bagian bernilai setengah.
- ⚖️ **Sama besar**: dua bagian harus sama besar. _Suara:_ Dua bagian harus sama besar. Kalau tidak sama besar, bagian itu bukan setengah. Periksa dengan melipat atau menumpuk.
- 📄 **Melipat kertas**: persegi: 4 cara melipat. _Suara:_ Kertas persegi dapat dilipat menjadi dua sama besar dengan empat cara: tegak, mendatar, dan dua cara miring. Garis lipat yang pas membuat kedua sisi saling menutup.
- ⭕ **Lewat titik tengah**: lingkaran dibagi lewat titik tengah. _Suara:_ Lingkaran dibagi dua sama besar oleh garis yang lewat titik tengahnya. Garis yang bergeser dari titik tengah membuat bagian tidak sama besar.
- 🧩 **Dua setengah**: dua setengah sama dengan satu utuh. _Suara:_ Dua setengah disatukan menjadi satu utuh. Setengah ditulis dengan lambang setengah.

**Suara Poin Penting.** Ingat selalu! Setengah adalah satu dari dua bagian yang sama besar. Kalau dua bagian tidak sama besar, itu bukan setengah. Kertas persegi dapat dilipat menjadi setengah dengan empat cara, dan lingkaran dibagi lewat titik tengahnya. Dua setengah disatukan menjadi satu utuh.

**Cara menyebutkan.** Dua bagian sama besar adalah setengah. _Suara:_ Cara menyebutkan. Martabak dipotong menjadi dua bagian sama besar, setiap bagian adalah setengah martabak.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: lipat selembar kertas menjadi dua bagian sama besar dengan sebanyak mungkin cara. Cari lima benda yang dapat dibagi menjadi setengah, misalnya roti, buah, dan air minum. Bagikan satu roti kepada temanmu dengan adil dan sebutkan hasilnya.

**Refleksi (Catatanku).**

- Aku dapat menunjukkan setengah dari benda utuh.
- Aku dapat membedakan bagian yang sama besar dan yang tidak sama besar.
- Aku dapat menemukan setengah benda di sekitarku.
- Aku belajar dengan senang hati.

## 9. Metode dari luar buku yang diadopsi

- **Berbagi adil (fair sharing)**: anak membagi satu benda untuk dua teman dan menyadari bahwa adil berarti sama besar. Dasar pecahan di kurikulum Singapura dan Inggris untuk kelas awal. Permainan Potongan yang Adil menolak potongan yang nyaris tengah dengan menghitung luas bagian.
- **Melipat kertas dan simetri**: dua bagian yang saling menutup pas adalah setengah. Mesin memantulkan bagian yang dilipat ke seberang garis lipat lalu memeriksa apakah hasilnya masuk ke bagian lain. Persegi punya empat cara melipat, lingkaran banyak cara (semua garis lewat titik tengah), segitiga hanya satu cara.
- **Model luas (area model)**: pecahan sebagai bagian dari satu bangun. Gambar yang diwarnai dihitung luasnya oleh program, bukan dicocokkan dengan kunci tetap.
- **Model volume cairan (setengah gelas)**: setengah sebagai ketinggian yang sama. Permainan Tuang Setengah tidak menampilkan angka supaya anak memakai penglihatan.
- **Tiga pertanyaan pemeriksa**: dibagi menjadi dua bagian? sama besar? satu bagian yang ditunjuk? Ketiganya harus ya. Dasar penalaran Benar atau Salah dan Setengah atau Bukan.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata ("setengah", "seperempat") supaya suara perangkat tidak salah membaca lambang pecahan.
- Ronde 1 Potongan yang Adil menilai kandidat dari luas bagian dengan toleransi 1,2 persen. Potongan yang nyaris tengah tetapi berbeda lebih dari itu ditolak dan dijelaskan.

