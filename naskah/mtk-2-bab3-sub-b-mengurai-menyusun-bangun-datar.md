# Naskah Matematika Kelas 2 SD, Bab 3: Bentuk di Sekitar Kita, Sub-Bab B: Mengurai dan Menyusun Bangun Datar

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b3.ts` dan `src/components/modul/data-k2b3.ts`, oleh `scripts/buat-naskah-md-k2b3.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 65–100) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab3`, sub-bab B |
| Berkas data | `src/data/kelas2-bab3.json` (dibangkitkan `src/content-master/buat-k2-bab3.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab3` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Geometri (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa mengurai satu bangun datar menjadi beberapa bangun datar, menyusun beberapa bangun datar menjadi satu bentuk, menjelaskan bahwa cara yang dipakai memengaruhi hasil, serta membuat bentuk kreatif dengan tangram.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 3: Bentuk di Sekitar Kita, Sub-Bab B hlm. 81–89 dan Ayo Berkarya hlm. 99).

**Sasaran.** Siswa mengurai satu bangun datar menjadi beberapa bentuk baru dengan menarik garis, menyusun beberapa bangun datar menjadi satu bentuk, menjelaskan bahwa cara mengurai dan menyusun memengaruhi hasilnya, menghitung jenis keping hasil uraian, menemukan pola banyak segitiga pada segi banyak, serta bermain tangram.

**Suara Silabus.** Kita belajar mengurai dan menyusun bangun datar. Bukunya bernama Bentuk di Sekitar Kita, bagian mengurai dan menyusun. Kita mengurai satu bangun datar menjadi beberapa bentuk baru, dan menyusun beberapa bangun datar menjadi satu bentuk. Cara yang kita pakai memengaruhi hasilnya. Kita juga bermain tangram. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 36 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diketuk, diseret, digunting, dan dihitung | 4 permainan |
| P. Picture | Diagram polos: bentuk, titik dan garis, model bangun ruang, tabel | 3 permainan |
| A. Abstract | Kata dan angka: tabel, petunjuk tertulis, kalimat, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bentuk polos dan model bangun ruang polos tanpa hiasan benda).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Mengurai Bangun Datar (Satu bangun menjadi banyak bagian)

**Adegan 1. Satu bangun, banyak bagian** (`K2B3B-V1-1`)

1. Sekarang kita belajar mengurai sebuah bangun datar.  
   _Papan layar:_ Mengurai bangun
2. Mengurai artinya membagi satu bangun menjadi beberapa bentuk yang lebih kecil.  
   _Papan layar:_ Satu jadi banyak
3. Kita bisa menarik garis untuk menguraikannya.  
   _Papan layar:_ Tarik garis
4. Bentuk apa yang dihasilkan jika kita urai bangun ini?  
   _Papan layar:_ Apa hasilnya?

**Adegan 2. Dua segitiga dan satu segi empat** (`K2B3B-V1-2`)

1. Kita urai bangun ini dengan menarik dua garis.  
   _Papan layar:_ Tarik dua garis
2. Hasilnya dua segitiga dan satu segi empat.  
   _Papan layar:_ 2 segitiga + 1 segi empat
3. Kita juga bisa menguraikan bangun yang sama dengan cara lain.  
   _Papan layar:_ Cara lain
4. Dengan cara lain, hasilnya dua segitiga dan dua segi empat.  
   _Papan layar:_ 2 segitiga + 2 segi empat

**Adegan 3. Cara memengaruhi hasil** (`K2B3B-V1-3`)

1. Ketika mengurai sebuah bangun datar, kita dapat memakai beberapa cara.  
   _Papan layar:_ Banyak cara
2. Cara yang kita pakai akan memengaruhi hasilnya.  
   _Papan layar:_ Cara memengaruhi hasil
3. Sebuah persegi bisa diurai dengan garis miring menjadi dua segitiga.  
   _Papan layar:_ Persegi → 2 segitiga
4. Persegi yang sama bisa diurai dengan garis lurus di tengah menjadi dua segi empat.  
   _Papan layar:_ Persegi → 2 segi empat

### Video 2: Menyusun Bangun Datar (Banyak bangun menjadi satu)

**Adegan 1. Beberapa bangun jadi satu** (`K2B3B-V2-1`)

1. Sekarang kita belajar menyusun bangun datar.  
   _Papan layar:_ Menyusun bangun
2. Menyusun artinya menggabungkan beberapa bangun datar menjadi satu bentuk baru.  
   _Papan layar:_ Banyak jadi satu
3. Ada dua segitiga dan satu segi empat.  
   _Papan layar:_ 2 segitiga + 1 segi empat
4. Bentuk apa yang dihasilkan jika kita menyusunnya?  
   _Papan layar:_ Apa hasilnya?

**Adegan 2. Dua segitiga dan satu segi empat** (`K2B3B-V2-2`)

1. Kita susun dua segitiga di kiri dan kanan segi empat.  
   _Papan layar:_ Segitiga kiri dan kanan
2. Hasilnya sebuah segi enam yang memanjang.  
   _Papan layar:_ Hasil: segi enam
3. Kita bisa menyusunnya dengan cara lain.  
   _Papan layar:_ Cara lain
4. Kali ini, kedua segitiga disusun di atas dan di bawah segi empat.  
   _Papan layar:_ Segitiga atas dan bawah

**Adegan 3. Cara memengaruhi hasil** (`K2B3B-V2-3`)

1. Ketika menyusun bangun datar, kita dapat menemukan beberapa bentuk yang berbeda.  
   _Papan layar:_ Hasil berbeda-beda
2. Cara kita menyusunnya akan memengaruhi hasilnya.  
   _Papan layar:_ Cara memengaruhi hasil
3. Dua segitiga siku-siku yang sama bisa disusun menjadi sebuah persegi.  
   _Papan layar:_ 2 segitiga → persegi
4. Dua segitiga yang sama juga bisa disusun menjadi sebuah segitiga yang lebih besar.  
   _Papan layar:_ 2 segitiga → segitiga besar

### Video 3: Bermain Tangram (Tujuh keping, seribu bentuk)

**Adegan 1. Mengenal tangram** (`K2B3B-V3-1`)

1. Tangram adalah permainan menyusun bangun datar.  
   _Papan layar:_ Permainan tangram
2. Satu persegi besar dipotong menjadi tujuh keping.  
   _Papan layar:_ 7 keping
3. Ada lima segitiga, satu persegi, dan satu segi empat miring.  
   _Papan layar:_ 5 segitiga, persegi, miring
4. Keping-keping itu bisa disusun menjadi rumah, perahu, kucing, dan banyak bentuk lain.  
   _Papan layar:_ Banyak bentuk

**Adegan 2. Aturan main** (`K2B3B-V3-2`)

1. Aturan tangram, pakai semua keping.  
   _Papan layar:_ Pakai semua keping
2. Keping tidak boleh bertumpuk.  
   _Papan layar:_ Tidak bertumpuk
3. Keping harus saling menempel pada sisinya.  
   _Papan layar:_ Sisi saling menempel
4. Kita boleh memutar dan membalik keping.  
   _Papan layar:_ Putar dan balik

**Adegan 3. Mengurai dan menyusun berkaitan** (`K2B3B-V3-3`)

1. Mengurai dan menyusun adalah dua kegiatan yang saling berlawanan.  
   _Papan layar:_ Saling berlawanan
2. Persegi besar diurai menjadi tujuh keping.  
   _Papan layar:_ Mengurai: 1 → 7
3. Tujuh keping disusun kembali menjadi persegi besar.  
   _Papan layar:_ Menyusun: 7 → 1
4. Banyak keping tetap tujuh, apa pun bentuk hasil susunannya.  
   _Papan layar:_ Tetap 7 keping

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Mengurai: Satu Jadi Banyak** ✂️  
Mengurai berarti membagi satu bangun datar menjadi beberapa bentuk yang lebih kecil. Kita menguraikannya dengan menarik garis. Hasil uraian bisa berupa segitiga, segi empat, atau bentuk lain. Bayangkan memotong kertas sesuai garis: bentuknya berubah menjadi bagian-bagian baru.

_Alur:_ Mengurai → Tarik garis pengurai

**2. Tarik Garis Pengurai** 📏  
Garis pengurai biasanya dari satu pojok ke pojok lain, atau dari pojok ke titik di sisi, atau dari titik tengah ke pojok. Garis tidak boleh saling bersilangan di tengah supaya hasilnya rapi. Setelah menarik garis, hitung bagiannya, lalu sebut nama tiap bagian berdasarkan banyak sisinya.

_Alur:_ Tarik garis pengurai → Hasil bergantung cara

**3. Hasil Bergantung pada Cara** 🎯  
Satu bangun datar bisa diurai dengan cara yang berbeda, dan hasilnya ikut berbeda. Bangun yang sama bisa menjadi dua segitiga dan satu segi empat, atau dua segitiga dan dua segi empat. Tidak ada satu cara yang paling benar. Yang penting, hasilnya sesuai dengan garis yang kita tarik.

_Alur:_ Hasil bergantung cara → Persegi dua cara

**4. Persegi Bisa Diurai Dua Cara** ◩  
Sebuah persegi dapat diurai dengan garis miring dari pojok ke pojok. Hasilnya dua segitiga yang sama besar. Persegi yang sama dapat diurai dengan garis lurus di tengah. Hasilnya dua segi empat yang sama besar. Dua cara, dua hasil berbeda, dari satu bangun yang sama.

_Alur:_ Persegi dua cara → Menyusun

**5. Menyusun: Banyak Jadi Satu** 🧩  
Menyusun berarti menggabungkan beberapa bangun datar menjadi satu bentuk baru. Dua segitiga dan satu segi empat bisa disusun menjadi segi enam yang memanjang. Dua segitiga siku-siku yang sama bisa disusun menjadi persegi, segitiga yang lebih besar, atau segi empat miring. Cara menyusun memengaruhi hasilnya.

_Alur:_ Menyusun → Rapat tanpa tumpang

**6. Rapat, Tanpa Celah, Tanpa Tumpang** ⬛  
Saat menyusun, keping harus saling menempel pada sisinya. Tidak boleh ada celah, dan tidak boleh ada keping yang bertumpuk. Keping boleh diputar atau dibalik. Aturan ini sama dengan aturan tangram, permainan dari Tiongkok yang memakai tujuh keping dan sudah dimainkan ratusan tahun.

_Alur:_ Rapat tanpa tumpang → Segi banyak jadi segitiga

**7. Segi Banyak Jadi Segitiga** 🔺  
Segi banyak apa pun bisa diurai menjadi segitiga. Dari satu pojok, segitiga punya 1 keping, segi empat 2, segi lima 3, dan segi enam 4. Polanya banyak sisi dikurangi 2. Kalau garis ditarik dari titik tengah ke setiap pojok, segi lima menjadi 5 segitiga dan segi enam menjadi 6 segitiga. Segitiga adalah batu bata dasar semua segi banyak.

_Alur:_ Segi banyak jadi segitiga → Tangram dan pola blok

**8. Tangram dan Pola Blok** 🧠  
Tangram membantu kita berlatih mengurai dan menyusun. Satu persegi besar dipotong menjadi tujuh keping, lalu disusun lagi menjadi rumah, perahu, kucing, atau bentuk kreasimu. Di banyak sekolah di dunia, anak memakai pola blok untuk latihan serupa. Berlatih menyusun bentuk melatih mata untuk melihat bagian di dalam sebuah bangun.

_Alur:_ Tangram dan pola blok → Mengurai dan menyusun siap dipakai

## 6. Tahap 3: Infografis

**Panel 1. Mengurai Satu Bangun** ✂️ (2, Dua)

> Mengurai berarti membagi satu bangun datar menjadi beberapa bentuk yang lebih kecil. Kita menarik garis, lalu melihat bentuk apa yang dihasilkan. Satu persegi dengan satu garis miring menjadi dua segitiga.

**Panel 2. Persegi Diurai Dua Cara** ◩ (2, Dua)

> Persegi dapat diurai dengan garis miring menjadi dua segitiga. Persegi yang sama dapat diurai dengan garis lurus di tengah menjadi dua segi empat. Dua cara, dua hasil berbeda.

**Panel 3. Dua Segitiga dan Satu Segi Empat** 🔷 (3, Tiga)

> Sebuah bangun diurai dengan dua garis menjadi dua segitiga dan satu segi empat. Dengan cara lain, bangun yang sama bisa menjadi dua segitiga dan dua segi empat. Cara menentukan hasil.

**Panel 4. Menyusun Beberapa Bangun** 🧩 (3, Tiga)

> Menyusun berarti menggabungkan beberapa bangun datar menjadi satu bentuk baru. Dua segitiga dan satu segi empat bisa disusun menjadi segi enam yang memanjang.

**Panel 5. Dua Segitiga, Tiga Bentuk** 🔺 (3, Tiga)

> Dua segitiga siku-siku yang sama bisa disusun menjadi tiga bentuk. Sisi miring ditempelkan, jadinya persegi. Sisi pendek ditempelkan menghadap, jadinya segitiga yang lebih besar. Sisi pendek ditempelkan berlawanan, jadinya segi empat miring.

**Panel 6. Cara Memengaruhi Hasil** 🎯 (2, Dua)

> Baik saat mengurai maupun saat menyusun, cara yang kita pakai memengaruhi hasilnya. Satu bangun bisa punya banyak uraian. Beberapa keping bisa punya banyak susunan.

**Panel 7. Segi Banyak Dibagi Jadi Segitiga** 🔺 (4, Empat)

> Dari satu pojok, segitiga menjadi satu keping, segi empat menjadi dua segitiga, segi lima menjadi tiga segitiga, dan segi enam menjadi empat segitiga. Banyak segitiga sama dengan banyak sisi dikurangi dua.

**Panel 8. Dari Titik Tengah** ⬡ (6, Enam)

> Kalau garis ditarik dari titik tengah ke setiap pojok, segi lima menjadi lima segitiga dan segi enam menjadi enam segitiga. Banyak segitiga sama dengan banyak sisinya.

**Panel 9. Tangram Tujuh Keping** 🐱 (7, Tujuh)

> Tangram terdiri dari tujuh keping: lima segitiga, satu persegi, dan satu segi empat miring. Satu persegi besar diurai menjadi tujuh keping, lalu disusun menjadi rumah, perahu, kucing, atau bentukmu sendiri.

**Panel 10. Aturan Bermain dan Tips** 📜 (4, Empat)

> Aturan menyusun: pakai semua keping, jangan bertumpuk, sisi harus menempel, dan boleh diputar atau dibalik. Tips: mulai dari keping yang paling besar, lalu isi bagian yang tersisa dengan keping yang lebih kecil.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Gunting Kertas | `cut-paper-along-lines` | Persegi: 2 segitiga; Persegi: 2 segi empat; Persegi panjang: 2 segitiga; Persegi panjang: 2 segitiga dan 1 segi empat |
| 2 | Concrete | Susun Keping di Papan | `drag-pieces-to-silhouette` | persegi dari 2 segitiga; rumah; perahu; pohon cemara |
| 3 | Concrete | Bongkar Bangunan Mainan | `tap-pieces-apart-and-count` | rumah: 1 segitiga dan 1 segi empat; perahu: 2 segitiga dan 1 segi empat; pohon cemara: 3 segitiga dan 1 segi empat |
| 4 | Concrete | Dua Segitiga, Tiga Bentuk | `explore-join-two-triangles` | persegi; segitiga yang lebih besar; segi empat miring |
| 5 | Picture | Garis Pengurai | `draw-dividing-lines` | Belah ketupat: 3 segitiga; Segi lima: 5 segitiga; Segi enam: 6 segitiga; Persegi panjang: 2 segitiga dan 2 segi empat |
| 6 | Picture | Hasil Susunan yang Mungkin | `select-possible-composites` | 2 segitiga siku-siku yang sama (bisa: persegi, segitiga besar, segi empat miring); 1 persegi dan 1 segitiga (bisa: rumah, rumah miring); 2 segitiga dan 1 segi empat (bisa: segi enam mendatar, segi enam tegak) |
| 7 | Picture | Hitung Keping | `count-pieces-from-diagram` | Persegi: 2 segitiga; Persegi panjang: 2 segitiga dan 1 segi empat; Segi enam: 3 segi empat; Segi lima: 5 segitiga |
| 8 | Abstract | Isi Kalimat Uraian | `fill-sentence-blanks` | ronde 1: 3 kalimat; ronde 2: 3 kalimat |
| 9 | Abstract | Mengurai atau Menyusun? | `sort-statements-two-bins` | ronde 1: 4 kalimat; ronde 2: 4 kalimat |
| 10 | Abstract | Tabel Pola Segitiga | `pattern-table-triangles` | garis dari satu pojok ke pojok lain: 1, 2, 3, 4; garis dari titik tengah ke setiap pojok: 3, 4, 5, 6 |

### Permainan 1. Gunting Kertas (Concrete)

- **Rujukan buku.** hlm. 81–82 (mengurai bangun datar; contoh persegi diurai menjadi dua segitiga atau dua segi empat)
- **Tujuan.** Mengurai kertas dengan menggunting sepanjang garis putus-putus dan menamai keping hasilnya.
- **Cara main.** Empat ronde (persegi menjadi 2 segitiga, persegi menjadi 2 segi empat, persegi panjang menjadi 2 segitiga, dan persegi panjang menjadi 2 segitiga dan 1 segi empat). Siswa mengetuk garis putus-putus untuk menggunting. Keping terpisah dan diberi nama. Bila hasilnya belum sesuai, kertas bisa disatukan lagi.
- **Ronde.** Persegi: 2 segitiga; Persegi: 2 segi empat; Persegi panjang: 2 segitiga; Persegi panjang: 2 segitiga dan 1 segi empat
- **Panduan suara.** Ketuk garis putus-putus untuk menggunting, lalu lihat kepingnya.

### Permainan 2. Susun Keping di Papan (Concrete)

- **Rujukan buku.** hlm. 83–84 (menyusun bangun datar; dua segitiga dan satu segi empat)
- **Tujuan.** Menyusun keping bangun datar menjadi bentuk yang diminta dengan menyeretnya ke bayangan.
- **Cara main.** Empat ronde (persegi dari 2 segitiga, rumah, perahu, dan pohon cemara). Keping ada di nampan, bayangan bentuk ada di papan. Siswa menyeret keping ke tempat yang sesuai bentuknya, atau mengetuk keping lalu mengetuk tempatnya. Tempat yang salah ditolak disertai petunjuk.
- **Ronde.** persegi dari 2 segitiga; rumah; perahu; pohon cemara
- **Panduan suara.** Seret keping ke bayangan yang bentuknya sama.

### Permainan 3. Bongkar Bangunan Mainan (Concrete)

- **Rujukan buku.** hlm. 81–85 (mengurai bangun datar menjadi bentuk baru, lalu menyebut hasilnya)
- **Tujuan.** Membongkar bangunan mainan menjadi kepingnya dan menghitung banyak segitiga dan segi empat.
- **Cara main.** Tiga ronde (rumah, perahu, pohon cemara). Siswa mengetuk tiap keping sehingga keping terlepas dari bangunan. Setelah semua terlepas, siswa mengatur banyak segitiga dan banyak segi empat, lalu menekan periksa.
- **Ronde.** rumah: 1 segitiga dan 1 segi empat; perahu: 2 segitiga dan 1 segi empat; pohon cemara: 3 segitiga dan 1 segi empat
- **Panduan suara.** Ketuk keping untuk membongkar, lalu hitung segitiga dan segi empat.

### Permainan 4. Dua Segitiga, Tiga Bentuk (Concrete)

- **Rujukan buku.** hlm. 84 (Ayo Mencoba 2: susun dua segitiga dengan cara berbeda) dan hlm. 83
- **Tujuan.** Menemukan tiga bentuk berbeda dari dua segitiga siku-siku yang sama dengan menempelkan sisi yang berbeda.
- **Cara main.** Satu ronde penjelajahan. Siswa menekan tiga tombol tempel: sisi miring, sisi pendek menghadap, dan sisi pendek berlawanan. Tiap tombol menampilkan bentuk hasil. Siswa menamai tiap hasil dari tiga pilihan sampai ketiganya ditemukan.
- **Ronde.** persegi; segitiga yang lebih besar; segi empat miring
- **Panduan suara.** Coba tiga cara menempel, lalu beri nama tiap hasil.

### Permainan 5. Garis Pengurai (Picture)

- **Rujukan buku.** hlm. 87–89 (Ayo Berlatih nomor 4 dan 5; Coba Pikirkan: buat garis agar menjadi 3, 5, atau 6 segitiga dan 2 segitiga 2 segi empat)
- **Tujuan.** Menarik garis pada bangun datar supaya terurai menjadi keping yang diminta.
- **Cara main.** Empat ronde (belah ketupat menjadi 3 segitiga, segi lima menjadi 5 segitiga, segi enam menjadi 6 segitiga, dan persegi panjang menjadi 2 segitiga dan 2 segi empat). Siswa mengetuk dua titik untuk menarik garis. Garis yang bersilangan ditolak. Layar menghitung keping hasil, lalu siswa menekan periksa.
- **Ronde.** Belah ketupat: 3 segitiga; Segi lima: 5 segitiga; Segi enam: 6 segitiga; Persegi panjang: 2 segitiga dan 2 segi empat
- **Panduan suara.** Ketuk dua titik untuk menarik garis, lalu periksa hasilnya.

### Permainan 6. Hasil Susunan yang Mungkin (Picture)

- **Rujukan buku.** hlm. 83–85 (menyusun bangun datar; Ayo Berlatih nomor 2: tarik garis hasil susunan)
- **Tujuan.** Memilih semua bentuk yang bisa dibuat dari keping-keping yang diberikan.
- **Cara main.** Tiga ronde (dua segitiga siku-siku, satu persegi dan satu segitiga, serta dua segitiga dan satu segi empat). Tiap ronde ada empat bentuk. Siswa memilih semua bentuk yang bisa disusun dari keping, lalu menekan periksa. Bentuk yang tidak mungkin punya luas berbeda dari jumlah keping.
- **Ronde.** 2 segitiga siku-siku yang sama (bisa: persegi, segitiga besar, segi empat miring); 1 persegi dan 1 segitiga (bisa: rumah, rumah miring); 2 segitiga dan 1 segi empat (bisa: segi enam mendatar, segi enam tegak)
- **Panduan suara.** Pilih semua bentuk yang bisa disusun dari kepingnya.

### Permainan 7. Hitung Keping (Picture)

- **Rujukan buku.** hlm. 81 dan 86–88 (mengurai bangun datar; hasil uraian)
- **Tujuan.** Menghitung banyak segitiga dan segi empat dari diagram bangun yang sudah diurai.
- **Cara main.** Empat ronde (persegi dengan satu diagonal, persegi panjang dengan dua garis, segi enam dengan tiga garis dari titik tengah, dan segi lima dengan lima garis dari titik tengah). Siswa mengatur banyak segitiga dan segi empat dengan tombol tambah dan kurang, lalu menekan periksa.
- **Ronde.** Persegi: 2 segitiga; Persegi panjang: 2 segitiga dan 1 segi empat; Segi enam: 3 segi empat; Segi lima: 5 segitiga
- **Panduan suara.** Hitung segitiga dan segi empat pada diagram, lalu periksa.

### Permainan 8. Isi Kalimat Uraian (Abstract)

- **Rujukan buku.** hlm. 81–84 (kalimat: kita dapat mengurai bangun menjadi 2 segitiga dan 1 segi empat)
- **Tujuan.** Melengkapi kalimat tentang hasil mengurai dan menyusun dengan angka dan nama bentuk yang tepat.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat dengan bagian kosong. Contoh: persegi diurai dengan garis miring menjadi ... segitiga. Siswa memilih satu dari tiga kartu untuk tiap bagian kosong.
- **Ronde.** ronde 1: 3 kalimat; ronde 2: 3 kalimat
- **Panduan suara.** Pilih kartu yang tepat untuk bagian kosong kalimat.

### Permainan 9. Mengurai atau Menyusun? (Abstract)

- **Rujukan buku.** hlm. 81–85 (mengurai: satu menjadi banyak; menyusun: banyak menjadi satu)
- **Tujuan.** Menentukan kalimat yang menggambarkan kegiatan mengurai dan kalimat yang menggambarkan kegiatan menyusun.
- **Cara main.** Dua ronde, masing-masing empat kalimat. Siswa menyeret atau mengetuk kalimat ke kotak Mengurai (satu menjadi banyak) atau kotak Menyusun (banyak menjadi satu). Kalimat yang salah kembali disertai penjelasan.
- **Ronde.** ronde 1: 4 kalimat; ronde 2: 4 kalimat
- **Panduan suara.** Satu menjadi banyak berarti mengurai. Banyak menjadi satu berarti menyusun.

### Permainan 10. Tabel Pola Segitiga (Abstract)

- **Rujukan buku.** hlm. 89 (Coba Pikirkan nomor 2 sampai 4: 3, 5, dan 6 segitiga), diperkaya pola triangulasi
- **Tujuan.** Menemukan pola banyak segitiga pada segi banyak: banyak sisi dikurangi dua dari satu pojok, dan sama dengan banyak sisi dari titik tengah.
- **Cara main.** Dua ronde. Ronde 1: garis dari satu pojok untuk segitiga, segi empat, segi lima, dan segi enam. Ronde 2: garis dari titik tengah. Siswa mengetuk baris tabel, lalu memilih kartu angka yang tepat.
- **Ronde.** garis dari satu pojok ke pojok lain: 1, 2, 3, 4; garis dari titik tengah ke setiap pojok: 3, 4, 5, 6
- **Panduan suara.** Ketuk baris tabel, lalu pilih banyak segitiganya.

## 8. Poin Penting dan Catatanku

- ✂️ **Mengurai**: satu bangun menjadi beberapa bentuk. _Suara:_ Mengurai berarti membagi satu bangun datar menjadi beberapa bentuk yang lebih kecil dengan menarik garis.
- 🧩 **Menyusun**: beberapa bangun menjadi satu bentuk. _Suara:_ Menyusun berarti menggabungkan beberapa bangun datar menjadi satu bentuk baru. Keping harus menempel pada sisinya dan tidak boleh bertumpuk.
- 🎯 **Cara memengaruhi hasil**: cara beda, hasil beda. _Suara:_ Cara mengurai atau menyusun memengaruhi hasilnya. Persegi bisa menjadi dua segitiga atau dua segi empat.
- 🔺 **Pola segitiga**: dari pojok: sisi − 2 • dari tengah: sisi. _Suara:_ Dari satu pojok, banyak segitiga sama dengan banyak sisi dikurangi dua. Dari titik tengah, banyak segitiga sama dengan banyak sisi.
- 🐱 **Tangram**: 7 keping, pakai semuanya. _Suara:_ Tangram terdiri dari tujuh keping. Pakai semua keping, jangan bertumpuk, dan sisi harus menempel.

**Suara Poin Penting.** Ingat selalu! Mengurai berarti satu bangun menjadi beberapa bentuk. Menyusun berarti beberapa bangun menjadi satu bentuk. Cara yang dipakai memengaruhi hasilnya. Dari satu pojok, banyak segitiga sama dengan banyak sisi dikurangi dua. Dari titik tengah, banyak segitiga sama dengan banyak sisi. Pada tangram, pakai semua keping dan jangan bertumpuk.

**Cara menyebutkan.** Persegi diurai menjadi 2 segitiga. _Suara:_ Cara menyebutkan hasil uraian. Persegi diurai dengan garis miring menjadi dua segitiga.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: gunting selembar kertas berbentuk persegi, lalu gunting menjadi dua segitiga atau dua segi empat. Susun kembali menjadi bentuk lain. Kalau ada kertas bekas, buat tangram dan susun menjadi bentuk kesukaanmu, lalu ceritakan kepada keluargamu.

**Refleksi (Catatanku).**

- Aku dapat mengurai satu bangun datar menjadi beberapa bangun datar.
- Aku dapat menyusun beberapa bangun datar menjadi satu bentuk.
- Aku dapat menjelaskan bahwa cara yang dipakai memengaruhi hasilnya.
- Aku belajar dengan tertib.

## 9. Metode dari luar buku yang diadopsi

- **Tangram (Tiongkok)**: tujuh keping dari satu persegi. Aturan: pakai semua keping, tidak bertumpuk, sisi menempel, boleh diputar dan dibalik. Keping dibangkitkan dari koordinat dan luasnya diperiksa.
- **Dekomposisi dan komposisi bangun** (composing and decomposing shapes) dari kurikulum geometri Amerika Serikat dan Singapura: satu bangun menjadi banyak, banyak menjadi satu.
- **Triangulasi sederhana**: dari satu pojok, segi n menjadi n − 2 segitiga. Dari titik tengah, segi n menjadi n segitiga. Pola ini ditemukan siswa lewat tabel.
- **Pemeriksaan luas** sebagai alasan sebuah bentuk tidak mungkin disusun dari keping tertentu (luas keping digabung harus sama).
- **Mengurai dengan garis yang tidak bersilangan**: mesin mendata keping dari graf bidang, sehingga hasil bisa benar lebih dari satu cara (siswa diajak menemukan lebih dari satu uraian).

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Permainan Gunting Kertas ronde 4 dan Garis Pengurai menerima setiap uraian yang benar, bukan satu cara tetap. Ada tiga cara sah untuk 2 segitiga dan 1 segi empat.

