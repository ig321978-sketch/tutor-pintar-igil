# Naskah Matematika Kelas 2 SD, Bab 4: Posisi Benda dan Pola di Sekitar Kita, Sub-Bab A: Posisi Benda

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b4.ts` dan `src/components/modul/data-k2b4.ts`, oleh `scripts/buat-naskah-md-k2b4.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 101–124) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab4`, sub-bab A |
| Berkas data | `src/data/kelas2-bab4.json` (dibangkitkan `src/content-master/buat-k2-bab4.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab4` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Geometri dan Aljabar: Posisi Benda dan Pola (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 4. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa menggunakan kata atas, bawah, depan, belakang, kanan, dan kiri untuk menjelaskan posisi benda terhadap benda lain, menentukan kanan dan kiri sesuai arah pandang pembaca, serta menyampaikan pendapat dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 4: Posisi Benda dan Pola di Sekitar Kita, Sub-Bab A hlm. 101–113).

**Sasaran.** Siswa menggunakan kata atas, bawah, depan, belakang, kanan, dan kiri untuk menjelaskan letak sebuah benda terhadap benda lain, menentukan kanan dan kiri sesuai sudut pandang pembaca gambar, memakai pasangan kata yang berlawanan, serta menggabungkan beberapa petunjuk posisi untuk menemukan sebuah benda.

**Suara Silabus.** Kita belajar posisi benda. Kira dan teman-temannya membantu Paman memanen padi di sawah, dan kita menceritakan di mana setiap orang dan benda berada. Kita memakai enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Kita juga belajar bahwa kanan dan kiri pada gambar mengikuti posisi kita yang melihat gambar. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 32 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata yang diseret, ditemukan, dirangkai, disusun, dan ditirukan | 4 permainan |
| P. Picture | Diagram polos: peta kotak, lingkaran dan persegi, bangun polos, dan barisan bangun | 3 permainan |
| A. Abstract | Kata, huruf, dan petunjuk tertulis: kalimat, tebakan, kode huruf, peta konsep | 3 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (bangun polos, titik, dan lingkaran polos).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Waktu Panen Telah Tiba (Kira dan teman membantu Paman)

**Adegan 1. Ke sawah bersama Paman** (`K2B4A-V1-1`)

1. Waktu panen padi telah tiba.  
   _Papan layar:_ Waktu panen
2. Kira dan teman-temannya membantu Paman di sawah. Mereka membantu Paman memanen padi.  
   _Papan layar:_ Membantu Paman
3. Mereka melihat para petani bekerja keras memanen padi.  
   _Papan layar:_ Petani bekerja keras

**Adegan 2. Padi dan nasi** (`K2B4A-V1-2`)

1. Padi adalah makanan pokok yang diolah menjadi nasi.  
   _Papan layar:_ Padi jadi nasi
2. Para petani menanam padi sehingga kita dapat memakan nasi yang enak.  
   _Papan layar:_ Petani menanam padi
3. Paman berpesan agar kita tidak menyia-nyiakan nasi.  
   _Papan layar:_ Jangan sia-siakan nasi
4. Kita harus menghargai jerih payah para petani.  
   _Papan layar:_ Hargai petani

**Adegan 3. Siapa di sebelah mana?** (`K2B4A-V1-3`)

1. Enam sekawan berdiri berderet di sawah. Dari kiri ke kanan: Upe, Lili, Halim, Kira, Malosi, dan Tika.  
   _Papan layar:_ Berderet di sawah
2. Siapakah yang di sebelah kanan Lili? Yang di sebelah kanan Lili adalah Halim.  
   _Papan layar:_ Kanan Lili: Halim
3. Siapakah yang di sebelah kiri Malosi? Yang di sebelah kiri Malosi adalah Kira.  
   _Papan layar:_ Kiri Malosi: Kira
4. Hewan apa yang sedang terbang di atas padi? Burung terbang di atas padi.  
   _Papan layar:_ Di atas padi: burung

### Video 2: Atas, Bawah, Depan, Belakang (Posisi benda di sekitar kita)

**Adegan 1. Kupu-kupu dan bunga** (`K2B4A-V2-1`)

1. Kita dapat menunjukkan posisi benda di sekitar kita.  
   _Papan layar:_ Posisi benda
2. Kupu-kupu hinggap di atas bunga.  
   _Papan layar:_ Kupu-kupu di atas bunga
3. Bunga ada di bawah kupu-kupu.  
   _Papan layar:_ Bunga di bawah kupu-kupu

**Adegan 2. Burung dan ulat** (`K2B4A-V2-2`)

1. Burung berjalan di depan ulat.  
   _Papan layar:_ Burung di depan
2. Ulat bergerak di belakang burung.  
   _Papan layar:_ Ulat di belakang
3. Depan dan belakang adalah dua posisi yang berlawanan.  
   _Papan layar:_ Depan lawan belakang

**Adegan 3. Kata yang berlawanan** (`K2B4A-V2-3`)

1. Atas berlawanan dengan bawah.  
   _Papan layar:_ Atas lawan bawah
2. Depan berlawanan dengan belakang.  
   _Papan layar:_ Depan lawan belakang
3. Kanan berlawanan dengan kiri.  
   _Papan layar:_ Kanan lawan kiri
4. Kalau bola di atas meja, berarti meja di bawah bola.  
   _Papan layar:_ Bola atas, meja bawah

### Video 3: Kanan dan Kiri (Sesuai posisi pembaca)

**Adegan 1. Burung dan rumput** (`K2B4A-V3-1`)

1. Burung berdiri di sebelah kiri rumput.  
   _Papan layar:_ Burung di kiri rumput
2. Rumput ada di sebelah kanan burung.  
   _Papan layar:_ Rumput di kanan burung
3. Kanan dan kiri pada gambar sesuai dengan posisi pembaca.  
   _Papan layar:_ Sesuai posisi pembaca

**Adegan 2. Anak yang membelakangi kita** (`K2B4A-V3-2`)

1. Seorang anak berdiri membelakangi kita.  
   _Papan layar:_ Anak membelakangi kita
2. Ia berkata, ayam di sebelah kiri saya.  
   _Papan layar:_ Ayam di kiri saya
3. Ia juga berkata, rumput di sebelah kanan saya.  
   _Papan layar:_ Rumput di kanan saya
4. Ia menghadap ke arah yang sama dengan kita, jadi kiri anak itu sama dengan kiri kita.  
   _Papan layar:_ Arah sama dengan kita

**Adegan 3. Ayo bermain petunjuk** (`K2B4A-V3-3`)

1. Ayo bermain dalam kelompok tiga orang.  
   _Papan layar:_ Main bertiga
2. Siswa pertama membaca petunjuk.  
   _Papan layar:_ Siswa 1 membaca
3. Siswa kedua memindahkan benda sesuai petunjuk, dan siswa ketiga menebak posisi akhir benda.  
   _Papan layar:_ Siswa 2 memindahkan
4. Ambil buku, taruh di atas meja, pindahkan ke sebelah kanan meja, lalu pindahkan ke bawah meja. Di manakah buku sekarang?  
   _Papan layar:_ Buku di bawah meja

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Posisi di Sekitar Kita** 📍  
Setiap benda berada di suatu tempat. Posisi benda adalah letak suatu benda terhadap benda lain. Posisi selalu butuh benda acuan: bola ada di atas meja, bukan sekadar bola ada di atas. Kira dan teman-temannya melihat padi, burung, dan para petani, dan mereka dapat menceritakan posisi semuanya.

_Alur:_ Posisi di sekitar → Atas dan bawah

**2. Atas dan Bawah** ↕️  
Atas dan bawah menunjukkan tinggi rendahnya letak. Kupu-kupu hinggap di atas bunga, dan bunga ada di bawah kupu-kupu. Buku di atas meja, sepatu di bawah tempat tidur. Kalau benda pertama di atas benda kedua, maka benda kedua di bawah benda pertama.

_Alur:_ Atas dan bawah → Depan dan belakang

**3. Depan dan Belakang** 🐛  
Depan dan belakang menunjukkan jarak dari kita. Benda yang lebih dekat dengan kita atau lebih dulu berjalan ada di depan. Burung berjalan di depan ulat, dan ulat bergerak di belakang burung. Pada gambar, benda yang menutupi benda lain berada di depan, dan benda yang tertutup berada di belakang.

_Alur:_ Depan dan belakang → Kanan dan kiri

**4. Kanan dan Kiri** ↔️  
Kanan dan kiri menunjukkan letak di samping. Tangan kanan kita memegang pensil bila kita menulis, dan tangan kiri ada di sisi lainnya. Burung berdiri di sebelah kiri rumput, jadi rumput ada di sebelah kanan burung. Latihlah dengan mengangkat tangan kananmu, lalu tangan kirimu.

_Alur:_ Kanan dan kiri → Sudut pandang

**5. Sudut Pandang Pembaca** 👀  
Pada gambar, kanan dan kiri sesuai dengan posisi pembaca, yaitu kita yang melihat gambar. Kalau ada anak yang membelakangi kita, ia menghadap ke arah yang sama dengan kita, jadi kanan dan kirinya sama dengan kanan dan kiri kita. Kalau anak itu menghadap kita, kanan dan kirinya terbalik terhadap kita. Karena itu, tentukan dulu siapa yang melihat.

_Alur:_ Sudut pandang → Kata berlawanan

**6. Kata yang Berlawanan** 🔁  
Enam kata posisi terdiri dari tiga pasangan yang berlawanan: atas dengan bawah, depan dengan belakang, dan kanan dengan kiri. Bila kita tahu posisi benda pertama terhadap benda kedua, kita langsung tahu posisi benda kedua terhadap benda pertama dengan memakai kata lawannya.

_Alur:_ Kata berlawanan → Kalimat posisi

**7. Menyusun Kalimat Posisi** 📝  
Kalimat posisi yang lengkap memuat tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan. Contohnya, kucing duduk di bawah meja. Benda yang diceritakan adalah kucing, kata posisinya di bawah, dan benda acuannya meja. Untuk kanan dan kiri kita menyebut di sebelah kanan atau di sebelah kiri.

_Alur:_ Kalimat posisi → Gabung petunjuk

**8. Gabungkan Beberapa Petunjuk** 🔍  
Satu petunjuk posisi sering belum cukup untuk menebak sebuah benda. Aku di atas ikan, bisa jadi banyak benda. Tetapi bila ditambah, aku di sebelah kanan jam, hanya satu benda yang cocok. Menebak dengan menggabungkan petunjuk melatih kita berpikir teliti dan sabar.

_Alur:_ Gabung petunjuk → Siap bercerita posisi

## 6. Tahap 3: Infografis

**Panel 1. Enam Kata Posisi** 📍 (6, Enam)

> Ada enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Dengan enam kata ini kita dapat menceritakan di mana sebuah benda berada.

**Panel 2. Atas dan Bawah** 🦋 (2, Dua)

> Kupu-kupu hinggap di atas bunga. Bunga ada di bawah kupu-kupu. Atas dan bawah menunjukkan tinggi rendahnya letak benda.

**Panel 3. Depan dan Belakang** 🐛 (2, Dua)

> Burung berjalan di depan ulat. Ulat bergerak di belakang burung. Benda yang menutupi benda lain ada di depan.

**Panel 4. Kanan dan Kiri** ↔️ (2, Dua)

> Burung berdiri di sebelah kiri rumput. Rumput ada di sebelah kanan burung. Kanan dan kiri menunjukkan letak di samping.

**Panel 5. Sudut Pandang Pembaca** 👀 (2, Dua)

> Kanan dan kiri pada gambar sesuai dengan posisi pembaca. Anak yang membelakangi kita menghadap ke arah yang sama dengan kita, jadi kanan dan kirinya sama dengan kanan dan kiri kita.

**Panel 6. Kata yang Berlawanan** 🔁 (3, Tiga)

> Ada tiga pasangan kata berlawanan: atas dengan bawah, depan dengan belakang, dan kanan dengan kiri.

**Panel 7. Benda Acuan** 🎯 (3, Tiga)

> Kalimat posisi punya tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan. Contohnya, buku di atas meja.

**Panel 8. Posisi di Kamar** 🛏️ (4, Empat)

> Di kamar, boneka ada di atas tempat tidur, sepatu di bawah tempat tidur, kotak di sebelah kiri tempat tidur, dan mobil-mobilan di depan meja.

**Panel 9. Tebak dari Petunjuk** 🔍 (2, Dua)

> Aku di atas ikan, dan aku di sebelah kanan jam. Satu petunjuk belum cukup, tetapi dua petunjuk membawa kita ke satu benda.

**Panel 10. Posisi Setelah Dipindah** 📚 (4, Empat)

> Buku diambil, ditaruh di atas meja, dipindah ke sebelah kanan meja, lalu dipindah ke bawah meja. Posisi buku sekarang adalah di bawah meja.

## 7. Tahap 4, 5, dan 6: sepuluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Taruh di Tempatnya | `place-object-by-position` | kotak (bola atas, kucing kiri, buku depan); meja (boneka kanan, sepatu bawah, tas belakang); kursi (kucing bawah, bola belakang, boneka atas, buku kanan); pohon (burung atas, kelinci kanan, bola kiri, ayam depan) |
| 2 | Concrete | Pindahkan Benda Sesuai Petunjuk | `follow-move-instructions` | buku dan meja: atas, depan, kanan, bawah; pensil dan kursi: atas, bawah, kanan, kiri; bola dan kotak: kiri, atas, belakang |
| 3 | Concrete | Temukan di Kamar | `find-by-position-clue` | ronde 1: sepatu bawah tempat tidur, boneka atas tempat tidur, kotak kiri tempat tidur; ronde 2: tas atas kursi, kotak kanan kursi, meja kiri kursi; ronde 3: buku atas meja, mobil-mobilan depan meja, kursi kanan meja; ronde 4: bola depan mobil-mobilan, meja belakang mobil-mobilan, tempat tidur atas sepatu |
| 4 | Concrete | Tempel Stiker di Taman | `place-stickers-by-sentence` | Kupu-kupu terbang di depan Kira; Kelinci ada di sebelah kanan pohon; Burung terbang di atas pohon; Bola ada di sebelah kiri pohon; Halim berlari di belakang Kira; Deretan bunga ada di depan Kira |
| 5 | Picture | Peta Kotak | `tap-cell-by-position` | ronde 1: lingkaran di baris 2 kolom 2, atas, kiri, bawah, kanan; ronde 2: lingkaran di baris 1 kolom 1, kanan, bawah; ronde 3: lingkaran di baris 3 kolom 2, atas, kiri, kanan; ronde 4: lingkaran di baris 2 kolom 3, kiri, atas, bawah |
| 6 | Picture | Pilih Kata Posisi | `choose-word-for-diagram` | ronde 1: atas, bawah, kiri, kanan; ronde 2: kanan, depan, kiri, belakang; ronde 3: bawah, belakang, atas, depan |
| 7 | Picture | Susun Bangun di Petak | `place-shapes-by-sentence` | ronde 1: segitiga kiri persegi, lingkaran atas persegi; ronde 2: bintang bawah persegi, bentuk hati kanan persegi; ronde 3: lingkaran kanan segitiga, bintang atas segitiga, bentuk hati bawah lingkaran |
| 8 | Abstract | Lengkapi Kalimat Posisi | `complete-opposite-sentences` | ronde 1: 3 kalimat; ronde 2: 3 kalimat |
| 9 | Abstract | Tebak Aku Apa? | `riddle-by-position-clues` | soal 1: 2 petunjuk, jawaban lukisan; soal 2: 2 petunjuk, jawaban pot; soal 3: 3 petunjuk, jawaban burung; soal 4: 2 petunjuk, jawaban rumput |
| 10 | Abstract | Peta Konsep Posisi | `concept-map-fill` | Posisi benda; Kanan dan kiri |

### Permainan 1. Taruh di Tempatnya (Concrete)

- **Rujukan buku.** hlm. 104–106 (posisi benda atas, bawah, depan, belakang, kanan, kiri; Ayo Mencoba: menemukan benda di sekitar)
- **Tujuan.** Menaruh benda pada posisi yang diminta terhadap benda acuan.
- **Cara main.** Empat ronde (kotak, meja, kursi, pohon). Tiap ronde punya tiga atau empat petunjuk, misalnya taruh bola di atas kotak. Siswa menyeret benda ke salah satu dari enam tempat di sekitar benda acuan, atau mengetuk benda lalu mengetuk tempatnya. Tempat yang salah memberi petunjuk. Tempat yang benar membuat kalimat lengkapnya dibacakan.
- **Ronde.** kotak (bola atas, kucing kiri, buku depan); meja (boneka kanan, sepatu bawah, tas belakang); kursi (kucing bawah, bola belakang, boneka atas, buku kanan); pohon (burung atas, kelinci kanan, bola kiri, ayam depan)
- **Panduan suara.** Seret benda ke posisi yang diminta.

### Permainan 2. Pindahkan Benda Sesuai Petunjuk (Concrete)

- **Rujukan buku.** hlm. 112 (Ayo Bermain: petunjuk memindahkan buku dan pensil, lalu menebak posisi akhir)
- **Tujuan.** Memindahkan satu benda beberapa kali sesuai petunjuk berurutan, lalu menyebut posisi akhirnya.
- **Cara main.** Tiga ronde (buku dan meja, pensil dan kursi, bola dan kotak). Tiap ronde punya tiga atau empat petunjuk berurutan, misalnya pindahkan ke sebelah kanan meja. Siswa menjalankan petunjuk satu per satu. Setelah petunjuk terakhir, siswa memilih kata posisi akhir benda dari tiga pilihan.
- **Ronde.** buku dan meja: atas, depan, kanan, bawah; pensil dan kursi: atas, bawah, kanan, kiri; bola dan kotak: kiri, atas, belakang
- **Panduan suara.** Pindahkan benda sesuai petunjuk satu per satu.

### Permainan 3. Temukan di Kamar (Concrete)

- **Rujukan buku.** hlm. 109 (Ayo Berlatih nomor 3: temukan benda-benda yang posisinya sebagai berikut)
- **Tujuan.** Menemukan benda di kamar dari petunjuk posisi terhadap benda lain.
- **Cara main.** Empat ronde, tiap ronde tiga pertanyaan pada gambar kamar berisi tempat tidur, meja, kursi, kotak, boneka, sepatu, tas, buku, mobil-mobilan, dan bola. Siswa mengetuk benda yang cocok dengan petunjuk. Kunci dihitung oleh program dari koordinat benda, sehingga gambar dan jawaban selalu sama.
- **Ronde.** ronde 1: sepatu bawah tempat tidur, boneka atas tempat tidur, kotak kiri tempat tidur; ronde 2: tas atas kursi, kotak kanan kursi, meja kiri kursi; ronde 3: buku atas meja, mobil-mobilan depan meja, kursi kanan meja; ronde 4: bola depan mobil-mobilan, meja belakang mobil-mobilan, tempat tidur atas sepatu
- **Panduan suara.** Ketuk benda yang cocok dengan petunjuk posisi.

### Permainan 4. Tempel Stiker di Taman (Concrete)

- **Rujukan buku.** hlm. 122 (Ayo Berkarya: gunting dan tempelkan gambar sesuai petunjuk)
- **Tujuan.** Menempel stiker pada gambar taman sesuai enam kalimat petunjuk posisi.
- **Cara main.** Satu ronde dengan enam stiker: kupu-kupu, kelinci, burung, bola, Halim, dan deretan bunga. Siswa membaca kalimat petunjuk, lalu menyeret stiker ke tempat di sekitar Kira atau pohon. Dua petunjuk memakai depan Kira. Stiker yang salah tempat kembali dengan petunjuk.
- **Ronde.** Kupu-kupu terbang di depan Kira; Kelinci ada di sebelah kanan pohon; Burung terbang di atas pohon; Bola ada di sebelah kiri pohon; Halim berlari di belakang Kira; Deretan bunga ada di depan Kira
- **Panduan suara.** Baca petunjuk, lalu tempelkan stikernya.

### Permainan 5. Peta Kotak (Picture)

- **Rujukan buku.** hlm. 106 dan 113 (menentukan posisi atas, bawah, kanan, dan kiri pada gambar)
- **Tujuan.** Menentukan kotak yang berada di atas, bawah, kiri, atau kanan sebuah lingkaran biru pada peta 3 kali 3.
- **Cara main.** Empat ronde. Pada tiap ronde lingkaran biru ada di kotak yang berbeda, lalu dua sampai empat pertanyaan seperti kotak mana di atas lingkaran biru. Siswa mengetuk kotak yang tepat. Kunci dihitung dari baris dan kolom. Peta datar hanya memuat atas, bawah, kiri, dan kanan.
- **Ronde.** ronde 1: lingkaran di baris 2 kolom 2, atas, kiri, bawah, kanan; ronde 2: lingkaran di baris 1 kolom 1, kanan, bawah; ronde 3: lingkaran di baris 3 kolom 2, atas, kiri, kanan; ronde 4: lingkaran di baris 2 kolom 3, kiri, atas, bawah
- **Panduan suara.** Ketuk kotak yang diminta.

### Permainan 6. Pilih Kata Posisi (Picture)

- **Rujukan buku.** hlm. 107 (Ayo Berlatih nomor 1: lingkari kata yang menunjukkan posisi)
- **Tujuan.** Memilih kata posisi sebuah lingkaran terhadap sebuah persegi pada diagram.
- **Cara main.** Tiga ronde, tiap ronde empat diagram. Lingkaran dapat berada di atas, bawah, kiri, atau kanan persegi, menutupi persegi (di depan), atau tertutup persegi (di belakang). Siswa memilih satu dari tiga kata. Kunci dihitung dari koordinat kedua bangun.
- **Ronde.** ronde 1: atas, bawah, kiri, kanan; ronde 2: kanan, depan, kiri, belakang; ronde 3: bawah, belakang, atas, depan
- **Panduan suara.** Lihat diagram, lalu pilih kata yang tepat.

### Permainan 7. Susun Bangun di Petak (Picture)

- **Rujukan buku.** hlm. 108–111 (Ayo Berlatih nomor 2, 4, dan 5: lengkapi dan ceritakan posisi benda)
- **Tujuan.** Menempatkan bangun polos pada petak 3 kali 3 sesuai kalimat posisi.
- **Cara main.** Tiga ronde, tiap ronde dua sampai tiga kalimat, misalnya segitiga di sebelah kiri persegi. Siswa mengetuk bangun, lalu mengetuk petak. Susunan diperiksa dari baris dan kolom. Semua susunan yang memenuhi kalimat diterima, tidak hanya satu.
- **Ronde.** ronde 1: segitiga kiri persegi, lingkaran atas persegi; ronde 2: bintang bawah persegi, bentuk hati kanan persegi; ronde 3: lingkaran kanan segitiga, bintang atas segitiga, bentuk hati bawah lingkaran
- **Panduan suara.** Ketuk bangun, lalu ketuk petak sesuai kalimat.

### Permainan 8. Lengkapi Kalimat Posisi (Abstract)

- **Rujukan buku.** hlm. 108 dan 110 (Ayo Berlatih nomor 2 dan 4: lengkapi kalimat dengan kata posisi)
- **Tujuan.** Melengkapi kalimat posisi dengan kata yang berlawanan.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat. Contoh: bola ada di atas meja, jadi meja ada di ... bola. Siswa memilih satu dari tiga kata untuk bagian kosong. Kalimat yang lengkap dibacakan Suara Guru.
- **Ronde.** ronde 1: 3 kalimat; ronde 2: 3 kalimat
- **Panduan suara.** Pilih kata yang tepat untuk bagian kosong.

### Permainan 9. Tebak Aku Apa? (Abstract)

- **Rujukan buku.** hlm. 113 (Coba Pikirkan: coba tebak, apa aku?)
- **Tujuan.** Menemukan sebuah benda dari dua atau tiga petunjuk posisi pada kotak kata 3 kali 3.
- **Cara main.** Empat soal pada dua kotak kata. Siswa membaca petunjuk seperti aku di atas ikan dan aku di sebelah kanan jam, lalu memilih satu dari tiga nama. Hanya satu nama yang cocok dengan semua petunjuk, dan jawaban dihitung dari kotak kata.
- **Ronde.** soal 1: 2 petunjuk, jawaban lukisan; soal 2: 2 petunjuk, jawaban pot; soal 3: 3 petunjuk, jawaban burung; soal 4: 2 petunjuk, jawaban rumput
- **Panduan suara.** Baca semua petunjuk, lalu pilih namanya.

### Permainan 10. Peta Konsep Posisi (Abstract)

- **Rujukan buku.** hlm. 102 (peta konsep posisi benda dan pola di sekitar kita)
- **Tujuan.** Melengkapi peta konsep posisi benda dengan definisi, contoh, pasangan kata berlawanan, dan pendapat sendiri.
- **Cara main.** Dua peta konsep, satu untuk posisi benda dan satu untuk kanan dan kiri. Tiap peta punya empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Posisi benda; Kanan dan kiri
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

## 8. Poin Penting dan Catatanku

- 📍 **Enam kata posisi**: atas, bawah, depan, belakang, kanan, kiri. _Suara:_ Ada enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Dengan enam kata ini kita menceritakan letak benda.
- 🎯 **Benda acuan**: posisi selalu terhadap benda lain. _Suara:_ Posisi selalu dilihat terhadap benda lain yang disebut benda acuan. Buku di atas meja, acuannya meja.
- 👀 **Pembaca gambar**: kanan kiri sesuai pembaca. _Suara:_ Pada gambar, kanan dan kiri sesuai dengan posisi pembaca. Anak yang membelakangi kita menghadap arah yang sama dengan kita.
- 🔁 **Kata berlawanan**: atas–bawah, depan–belakang, kanan–kiri. _Suara:_ Tiga pasangan kata berlawanan adalah atas dengan bawah, depan dengan belakang, dan kanan dengan kiri.
- 🔍 **Gabung petunjuk**: dua petunjuk membawa ke satu benda. _Suara:_ Satu petunjuk belum tentu cukup. Gabungkan dua atau tiga petunjuk posisi supaya hanya satu benda yang cocok.

**Suara Poin Penting.** Ingat selalu! Ada enam kata posisi: atas, bawah, depan, belakang, kanan, dan kiri. Posisi selalu dilihat terhadap benda acuan. Kanan dan kiri pada gambar sesuai dengan posisi pembaca. Kata posisi berpasangan dengan lawannya, dan beberapa petunjuk dapat digabung untuk menebak benda.

**Cara menyebutkan.** Benda di kata posisi benda acuan. _Suara:_ Cara menyebutkan. Buku ada di atas meja. Benda yang diceritakan, kata posisi, lalu benda acuan.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: temukan satu benda untuk tiap kata posisi di kamarmu, lalu tulis kalimatnya, misalnya sepatu ada di bawah tempat tidur. Mainkan Ayo Bermain bersama dua temanmu: satu membaca petunjuk, satu memindahkan benda, satu menebak posisi akhirnya.

**Refleksi (Catatanku).**

- Aku bisa mendeskripsikan posisi benda.
- Aku bisa memakai kata atas, bawah, depan, belakang, kanan, dan kiri.
- Aku belajar dengan senang hati.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Benda acuan (frame of reference)**: posisi selalu dinyatakan terhadap benda lain. Kalimat posisi dibangun dari tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan. Dasar permainan Taruh di Tempatnya.
- **Pasangan arah berlawanan**: atas dengan bawah, depan dengan belakang, kanan dengan kiri. Dari satu posisi anak langsung menurunkan posisi lawannya (inversi relasi). Dasar permainan Lengkapi Kalimat Posisi.
- **Sudut pandang (perspektif) pembaca**: kanan dan kiri pada gambar mengikuti pembaca, sedangkan anak yang membelakangi kita menghadap arah yang sama dengan kita. Tidak semua kesalahan kanan-kiri berasal dari hafalan, tetapi dari lupa menentukan siapa yang melihat.
- **Peta kotak (grid) dan baris-kolom**: posisi atas, bawah, kiri, kanan dibaca sebagai pergeseran satu baris atau satu kolom. Dasar permainan Peta Kotak, Susun Bangun di Petak, dan Tebak Aku Apa?, yang kuncinya dihitung dari baris dan kolom.
- **Koordinat benda di gambar**: relasi atas, bawah, kiri, kanan, depan, dan belakang dihitung dari kotak pembatas benda, jarak bersandar, dan lapisan. Gambar kamar dan kunci Temukan di Kamar sama karena berasal dari data yang sama.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Kanan dan kiri pada gambar mengikuti pembaca. Anak yang membelakangi kita menghadap arah yang sama dengan kita. Permainan tidak memakai gambar anak yang menghadap kita, karena itu menuntut membalik arah dan melampaui tingkat kelas 2.

