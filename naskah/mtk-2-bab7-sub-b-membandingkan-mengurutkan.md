# Naskah Matematika Kelas 2 SD, Bab 7: Ayo Membilang sampai dengan 100, Sub-Bab B: Membandingkan Bilangan

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k2b7.ts` dan `src/components/modul/data-k2b7.ts`, oleh `scripts/buat-naskah-md-k2b7.mjs`. Isi mengikuti Buku Siswa Matematika Kelas II (Kemendikbudristek, Kurikulum Merdeka, Bab 7 hlm. 191–224) dan diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

| Butir | Isi |
|---|---|
| Modul | `mtk-2-bab7`, sub-bab B |
| Berkas data | `src/data/kelas2-bab7.json` (dibangkitkan `src/content-master/buat-k2-bab7.mjs`, lalu `npm run sync:keys`) |
| Kode bab di server | `k2-mat-bab7` (belum ada seed server karena soal belum ada) |
| Fase dan kelas | `FASE_A`, kelas 2 SD |
| Elemen | 🌈 Fase A • Elemen Bilangan: Bilangan sampai dengan 100 (Kelas 2 SD/MI) |
| Poin Kualifikasi per bab | Latihan 30 dan Ujian 70 (terbit setelah soalnya ada). Praktikum 50 terbit sekali per blok empat bab. |
| Suara Guru | Murni Web Speech API bawaan perangkat (`id-ID`), **laju 0,70 dan nada 1**. Tanpa berkas audio statis, tanpa ElevenLabs. |
| Panggilan API saat siswa belajar | Nol. Seluruh tahap Materi berjalan di klien. |
| Tab Simulasi, Latihan, Ujian | Belum diisi. Latihan dan Ujian menampilkan kartu "sedang disiapkan". Tab Simulasi tidak tampil. |
| Jumlah sub-bab | Dua (A dan B), sesuai daftar isi buku Bab 7. |
| Jumlah permainan | 30 per sub-bab: 10 Concrete, 10 Picture, 10 Abstract. Penomoran di layar 1 sampai 30. |

## 2. Capaian dan tujuan pembelajaran

**Capaian Pembelajaran (CP).** Siswa membandingkan dua bilangan sampai 100 dengan memperhatikan puluhan dan satuan, menentukan bilangan yang lebih dari dan kurang dari bilangan lain, mengurutkan bilangan, serta menyampaikan alasannya dengan percaya diri.

**Rujukan.** Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 7: Ayo Membilang sampai dengan 100, Sub-Bab B hlm. 209–224).

**Sasaran.** Siswa menentukan bilangan yang lebih dari atau kurang dari bilangan lain dengan menghitung maju dan mundur pada garis bilangan, membandingkan dua bilangan dengan melihat banyak puluhan lebih dulu lalu satuannya, memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, serta mengurutkan tiga bilangan atau lebih dari yang paling kecil atau paling besar.

**Suara Silabus.** Kita belajar membandingkan bilangan. Kita menghitung maju dan mundur seperti kupu-kupu dan capung untuk mencari bilangan yang lebih dari dan kurang dari. Lalu kita membandingkan kelereng Halim dan Malosi dengan melihat banyak puluhan lebih dulu, dan satuannya bila puluhannya sama. Kita memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, lalu mengurutkan bilangan dari yang paling kecil. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.

## 3. Peta enam tahap SMICPA dan bobotnya

| Tahap | Isi | Banyak butir |
|---|---|---|
| S. Story | Video animasi HTML/SVG, tiga video. Tiap video diputar satu per satu saat diketuk (tidak ada putar otomatis) | 3 video, 9 adegan, 36 ketukan |
| M. Mind-Map | Peta pikiran berurutan, tiap cabang bisa diketuk dan uraiannya tampil di layar | 8 langkah |
| I. Infografis | Poster rangkuman, suara di tiap panel | 10 panel |
| C. Concrete | Benda nyata: maju mundur, siapa lebih banyak, susun kartu, pilah kumpulan | 10 permainan |
| P. Picture | Diagram polos: garis bilangan, dua papan nilai tempat, model batang, tanda perbandingan, tabel seratus | 10 permainan |
| A. Abstract | Kata dan angka: kalimat, benar-salah, tabel, detektif, peta konsep, urutkan | 10 permainan |

Bobot mengikuti isi buku. Aturan Concrete dan Picture berlaku: benda berwarna hanya di Concrete, Picture hanya diagram tanpa gambar benda (batang, kotak, papan nilai tempat, titik, goresan, garis bilangan).

## 4. Tahap 1: Story (video animasi, menggantikan slide)

Tidak ada video yang berjalan sendiri. Siswa mengetuk **▶ Putar** pada satu video. Video itu berjalan, dan video lain berhenti. Setiap kalimat adalah satu ketukan: dibacakan Suara Guru perangkat, dan gambar berubah mengikuti kalimat yang sedang dibacakan. Ada tombol Jeda, Ulang, dan Suara hidup atau mati.

### Video 1: Kupu-kupu dan Capung (Lebih dari dan kurang dari)

**Adegan 1. Kupu-kupu di bilangan 58** (`K2B7B-V1-1`)

1. Lihat garis angka ini. Kupu-kupu berada di antara bilangan lima puluh tujuh dan lima puluh sembilan.  
   _Papan layar:_ Antara 57 dan 59
2. Jadi kupu-kupu berada di bilangan lima puluh delapan.  
   _Papan layar:_ Kupu-kupu di 58
3. Kupu-kupu maju dua langkah ke depan. Kita menghitung maju: lima puluh sembilan, enam puluh.  
   _Papan layar:_ Maju dua langkah
4. Jadi kupu-kupu berada di bilangan enam puluh. Dua lebihnya dari lima puluh delapan adalah enam puluh.  
   _Papan layar:_ 2 lebihnya dari 58: 60

**Adegan 2. Capung di bilangan 75** (`K2B7B-V1-2`)

1. Sekarang amati capung. Capung berada di antara bilangan tujuh puluh empat dan tujuh puluh enam.  
   _Papan layar:_ Antara 74 dan 76
2. Jadi capung berada di bilangan tujuh puluh lima.  
   _Papan layar:_ Capung di 75
3. Capung mundur tiga langkah ke belakang. Kita menghitung mundur: tujuh puluh empat, tujuh puluh tiga, tujuh puluh dua.  
   _Papan layar:_ Mundur tiga langkah
4. Jadi capung berada di bilangan tujuh puluh dua. Tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua.  
   _Papan layar:_ 3 kurangnya dari 75: 72

**Adegan 3. Lebih dari dan kurang dari** (`K2B7B-V1-3`)

1. Lebihnya berarti maju, dan kurangnya berarti mundur.  
   _Papan layar:_ Lebih: maju, kurang: mundur
2. Aku adalah bilangan. Aku dua lebihnya dari bilangan tujuh puluh enam. Aku adalah tujuh puluh delapan.  
   _Papan layar:_ 2 lebihnya dari 76: 78
3. Aku adalah bilangan. Aku satu kurangnya dari bilangan enam puluh tujuh. Aku adalah enam puluh enam.  
   _Papan layar:_ 1 kurangnya dari 67: 66
4. Garis bilangan membantu kita melompat maju dan mundur dengan teliti.  
   _Papan layar:_ Garis bilangan membantu

### Video 2: Kelereng Halim dan Malosi (Siapa yang lebih banyak?)

**Adegan 1. Lima puluh enam dan enam puluh lima** (`K2B7B-V2-1`)

1. Halim mempunyai lima puluh enam butir kelereng. Malosi memiliki enam puluh lima butir kelereng.  
   _Papan layar:_ Halim 56, Malosi 65
2. Kelereng siapa yang lebih banyak? Kita masukkan kelereng ke dalam kantong, setiap kantong berisi sepuluh kelereng.  
   _Papan layar:_ 1 kantong: 10 kelereng
3. Bilangan lima puluh enam mempunyai lima puluhan dan enam satuan. Bilangan enam puluh lima mempunyai enam puluhan dan lima satuan.  
   _Papan layar:_ 56: 5 puluhan, 6 satuan
4. Enam puluhan lebih banyak dari lima puluhan. Jadi bilangan enam puluh lima lebih besar dari lima puluh enam, dan kelereng Malosi lebih banyak.  
   _Papan layar:_ 65 lebih besar dari 56

**Adegan 2. Puluhan yang sama** (`K2B7B-V2-2`)

1. Sekarang bandingkan bilangan lima puluh empat dan lima puluh delapan.  
   _Papan layar:_ Banding 54 dan 58
2. Keduanya mempunyai lima puluhan. Karena puluhannya sama, kita lihat satuannya.  
   _Papan layar:_ Puluhan sama: lihat satuan
3. Lima puluh empat mempunyai empat satuan, dan lima puluh delapan mempunyai delapan satuan.  
   _Papan layar:_ 4 satuan dan 8 satuan
4. Delapan satuan lebih banyak dari empat satuan. Jadi lima puluh delapan lebih besar dari lima puluh empat.  
   _Papan layar:_ 58 lebih besar dari 54

**Adegan 3. Kata perbandingan** (`K2B7B-V2-3`)

1. Ada tiga kata untuk membandingkan dua bilangan: lebih besar dari, lebih kecil dari, dan sama dengan.  
   _Papan layar:_ Tiga kata banding
2. Enam puluh lima lebih besar dari lima puluh enam. Lima puluh enam lebih kecil dari enam puluh lima.  
   _Papan layar:_ 65 lebih besar dari 56
3. Dua bilangan yang puluhan dan satuannya sama, adalah bilangan yang sama dengan.  
   _Papan layar:_ Sama: sama dengan
4. Kita juga dapat memakai tanda. Tanda itu selalu terbuka ke arah bilangan yang lebih besar.  
   _Papan layar:_ Tanda: > < =

### Video 3: Mengurutkan Bilangan (Dari yang paling kecil)

**Adegan 1. Tiga bilangan** (`K2B7B-V3-1`)

1. Amati tiga bilangan ini: tujuh puluh enam, delapan puluh tiga, dan lima puluh tujuh.  
   _Papan layar:_ 76, 83, dan 57
2. Bilangan tujuh puluh enam mempunyai tujuh puluhan dan enam satuan. Delapan puluh tiga mempunyai delapan puluhan dan tiga satuan. Lima puluh tujuh mempunyai lima puluhan dan tujuh satuan.  
   _Papan layar:_ Lihat puluhannya
3. Yang puluhannya paling banyak adalah delapan puluh tiga. Jadi delapan puluh tiga paling besar.  
   _Papan layar:_ 83: puluhan terbanyak
4. Yang puluhannya paling sedikit adalah lima puluh tujuh. Jadi lima puluh tujuh paling kecil.  
   _Papan layar:_ 57: puluhan tersedikit

**Adegan 2. Dari yang paling kecil** (`K2B7B-V3-2`)

1. Sekarang urutkan bilangan dari yang paling kecil.  
   _Papan layar:_ Urutkan dari terkecil
2. Pertama lima puluh tujuh, karena puluhannya paling sedikit.  
   _Papan layar:_ Pertama: 57
3. Kedua tujuh puluh enam, lalu ketiga delapan puluh tiga.  
   _Papan layar:_ Kedua: 76, ketiga: 83
4. Urutannya dari yang paling kecil adalah lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga.  
   _Papan layar:_ 57, 76, 83

**Adegan 3. Teka-teki Kira** (`K2B7B-V3-3`)

1. Kira menuliskan satu bilangan. Kira berkata, jika aku tambahkan empat pada puluhan dan tiga pada satuan, hasilnya adalah lima puluh lima.  
   _Papan layar:_ Teka-teki Kira
2. Kita mundur dulu. Lima puluh lima adalah lima puluhan dan lima satuan.  
   _Papan layar:_ 55: 5 puluhan, 5 satuan
3. Empat puluhan kita kurangi dari lima puluhan, tinggal satu puluhan. Tiga satuan kita kurangi dari lima satuan, tinggal dua satuan.  
   _Papan layar:_ Kurangi 4 puluhan, 3 satuan
4. Jadi bilangan yang ditulis Kira adalah satu puluhan dan dua satuan, yaitu dua belas.  
   _Papan layar:_ Bilangan Kira: 12

## 5. Tahap 2: Mind-Map (peta pikiran)

**1. Garis Bilangan** 📏  
Garis bilangan menunjukkan bilangan berurutan dari kiri ke kanan. Bilangan di sebelah kanan lebih besar dan bilangan di sebelah kiri lebih kecil. Kupu-kupu berada di antara lima puluh tujuh dan lima puluh sembilan, jadi ia berada di lima puluh delapan. Dengan garis bilangan kita bisa menemukan bilangan yang hilang dengan melihat tetangganya.

_Alur:_ Garis bilangan → Menghitung maju

**2. Menghitung Maju** ➡️  
Menghitung maju berarti bergerak ke kanan pada garis bilangan, dan kita memakainya untuk mencari bilangan yang lebihnya. Kupu-kupu di lima puluh delapan maju dua langkah: lima puluh sembilan, enam puluh. Jadi dua lebihnya dari lima puluh delapan adalah enam puluh. Setiap langkah menambah satu.

_Alur:_ Menghitung maju → Menghitung mundur

**3. Menghitung Mundur** ⬅️  
Menghitung mundur berarti bergerak ke kiri pada garis bilangan, dan kita memakainya untuk mencari bilangan yang kurangnya. Capung di tujuh puluh lima mundur tiga langkah: tujuh puluh empat, tujuh puluh tiga, tujuh puluh dua. Jadi tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua. Setiap langkah mengurangi satu.

_Alur:_ Menghitung mundur → Bandingkan puluhan dulu

**4. Bandingkan Puluhan Dulu** 🔟  
Untuk membandingkan dua bilangan, lihat banyak puluhannya lebih dulu. Lima puluh enam mempunyai lima puluhan dan enam puluh lima mempunyai enam puluhan. Enam puluhan lebih banyak dari lima puluhan, jadi enam puluh lima lebih besar. Puluhan menentukan besar bilangan karena satu puluhan bernilai sepuluh satuan.

_Alur:_ Bandingkan puluhan dulu → Puluhan sama, lihat satuan

**5. Puluhan Sama, Lihat Satuan** 🔍  
Bila banyak puluhannya sama, kita membandingkan satuannya. Lima puluh empat dan lima puluh delapan sama-sama punya lima puluhan. Satuan delapan lebih banyak dari satuan empat, jadi lima puluh delapan lebih besar dari lima puluh empat. Bila puluhan dan satuannya sama, kedua bilangan sama besar.

_Alur:_ Puluhan sama, lihat satuan → Kata perbandingan

**6. Kata dan Tanda Perbandingan** ⚖️  
Ada tiga kata untuk membandingkan dua bilangan: lebih besar dari, lebih kecil dari, dan sama dengan. Enam puluh lima lebih besar dari lima puluh enam. Lima puluh enam lebih kecil dari enam puluh lima. Tanda lebih besar, tanda lebih kecil, dan tanda sama dengan menuliskan kata itu dengan singkat. Tanda lebih besar dan lebih kecil selalu terbuka ke arah bilangan yang lebih besar.

_Alur:_ Kata perbandingan → Mengurutkan bilangan

**7. Mengurutkan Bilangan** 📶  
Untuk mengurutkan tiga bilangan atau lebih, bandingkan puluhannya. Bilangan yang puluhannya paling banyak adalah yang paling besar, dan bilangan yang puluhannya paling sedikit adalah yang paling kecil. Dari tujuh puluh enam, delapan puluh tiga, dan lima puluh tujuh, urutan dari yang paling kecil adalah lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga.

_Alur:_ Mengurutkan bilangan → Teka-teki bilangan

**8. Teka-Teki Bilangan** 🧠  
Kita dapat membuat dan memecahkan teka-teki bilangan. Aku adalah bilangan, aku dua lebihnya dari tujuh puluh enam, jadi aku tujuh puluh delapan. Aku satu kurangnya dari enam puluh tujuh, jadi aku enam puluh enam. Untuk teka-teki Kira, kita mundur dari hasil: lima puluh lima dikurangi empat puluhan dan tiga satuan menjadi dua belas. Membuat teka-teki sendiri melatih kita berpikir teliti.

_Alur:_ Teka-teki bilangan → Siap membandingkan

## 6. Tahap 3: Infografis

**Panel 1. Garis Bilangan** 📏 (2, Dua)

> Pada garis bilangan, bilangan di kanan lebih besar dan bilangan di kiri lebih kecil.

**Panel 2. Lebihnya dan Kurangnya** ↔️ (2, Dua)

> Dua lebihnya dari lima puluh delapan adalah enam puluh, karena maju dua langkah. Tiga kurangnya dari tujuh puluh lima adalah tujuh puluh dua, karena mundur tiga langkah.

**Panel 3. Bandingkan Puluhan Dulu** 🔟 (2, Dua)

> Lima puluh enam punya lima puluhan dan enam puluh lima punya enam puluhan. Puluhan yang lebih banyak berarti bilangan yang lebih besar.

**Panel 4. Puluhan Sama, Lihat Satuan** 🔍 (2, Dua)

> Lima puluh empat dan lima puluh delapan sama-sama punya lima puluhan. Kita lihat satuannya: delapan lebih banyak dari empat.

**Panel 5. Tiga Kata Perbandingan** 🔤 (3, Tiga)

> Tiga kata perbandingan adalah lebih besar dari, lebih kecil dari, dan sama dengan.

**Panel 6. Tiga Tanda Perbandingan** 🐊 (3, Tiga)

> Tanda lebih besar, tanda lebih kecil, dan tanda sama dengan. Tanda lebih besar dan lebih kecil terbuka ke arah bilangan yang lebih besar.

**Panel 7. Mengurutkan Tiga Bilangan** 📶 (3, Tiga)

> Urutan dari yang paling kecil: lima puluh tujuh, tujuh puluh enam, dan delapan puluh tiga.

**Panel 8. Paling Besar, Paling Kecil** 🏆 (2, Dua)

> Bilangan yang puluhannya paling banyak adalah yang paling besar. Bilangan yang puluhannya paling sedikit adalah yang paling kecil.

**Panel 9. Kartu Bilangan** 🃏 (2, Dua)

> Dengan dua kartu tiga dan tujuh, bilangan terbesar adalah tujuh puluh tiga dan bilangan terkecil adalah tiga puluh tujuh. Kartu yang lebih besar ditaruh di tempat puluhan untuk bilangan terbesar.

**Panel 10. Teka-Teki Kira** 🧠 (3, Tiga)

> Kira berkata, jika aku tambahkan empat pada puluhan dan tiga pada satuan, hasilnya lima puluh lima. Kita mundur, dan bilangan Kira adalah dua belas.

## 7. Tahap 4, 5, dan 6: tiga puluh permainan

| No | Tahap | Permainan | Jenis | Ronde |
|---|---|---|---|---|
| 1 | Concrete | Maju dan Mundur | `step-forward-backward` | ronde 1: 58 maju 2 langkah = 60, 75 mundur 3 langkah = 72; ronde 2: 64 maju 3 langkah = 67, 83 mundur 2 langkah = 81; ronde 3: 91 maju 4 langkah = 95, 50 mundur 1 langkah = 49 |
| 2 | Concrete | Di Mana Aku? | `find-between-number` | ronde 1: di antara 57 dan 59 = 58, di antara 74 dan 76 = 75, di antara 63 dan 65 = 64; ronde 2: di antara 82 dan 84 = 83, di antara 91 dan 93 = 92, di antara 69 dan 71 = 70; ronde 3: di antara 51 dan 53 = 52, di antara 78 dan 80 = 79, di antara 96 dan 98 = 97 |
| 3 | Concrete | Siapa Lebih Banyak? | `compare-collections-names` | ronde 1: Halim 56 dan Malosi 65: lebih kecil, Kira 54 dan Tika 58: lebih kecil; ronde 2: Kira 43 dan Tika 38: lebih besar, Upe 77 dan Lili 72: lebih besar; ronde 3: Malosi 65 dan Halim 56: lebih besar, Upe 47 dan Kira 47: sama dengan |
| 4 | Concrete | Ketuk yang Paling Banyak dan Paling Sedikit | `tap-most-least` | ronde 1: 56, 65, 48; terbesar 65, terkecil 48; ronde 2: 72, 27, 70; terbesar 72, terkecil 27; ronde 3: 91, 19, 90; terbesar 91, terkecil 19 |
| 5 | Concrete | Susun Dua Kartu | `two-cards-biggest-smallest` | ronde 1: kartu 3 dan 7, paling besar = 73; ronde 2: kartu 5 dan 2, paling kecil = 25; ronde 3: kartu 8 dan 6, paling besar = 86; ronde 4: kartu 4 dan 9, paling kecil = 49 |
| 6 | Concrete | Urutkan Tiga Kantong | `order-three-collections` | ronde 1: 57, 76, 83 (dari paling kecil; tampil 76, 83, 57); ronde 2: 56, 65, 74 (dari paling kecil; tampil 65, 56, 74); ronde 3: 86, 79, 77 (dari paling besar; tampil 77, 86, 79) |
| 7 | Concrete | Jodohkan Kiri dan Kanan | `match-pair-relation` | ronde 1: 56 lebih kecil 65, 48 sama dengan 48, 73 lebih besar 37; ronde 2: 81 lebih besar 18, 62 sama dengan 62, 29 lebih kecil 92; ronde 3: 54 lebih kecil 58, 70 sama dengan 70, 99 lebih besar 90 |
| 8 | Concrete | Memori Banyak Benda | `memory-compare-numbers` | ronde 1: pasangan 27, 38, 52, 64; ronde 2: pasangan 35, 46, 53, 61; ronde 3: pasangan 43, 57, 68, 62 |
| 9 | Concrete | Pilah: Lebih atau Kurang dari Acuan | `sort-more-less-reference` | ronde 1: acuan 60; 45, 72, 58, 81, 63, 39; ronde 2: acuan 75; 68, 82, 90, 71, 79, 64; ronde 3: acuan 40; 35, 47, 29, 58, 33, 62 |
| 10 | Concrete | Ketuk Semua yang Memenuhi | `select-all-more-than` | ronde 1: lebih besar dari 65: 72, 66, 80 dari 58, 72, 66, 65, 80, 49; ronde 2: lebih kecil dari 50: 42, 48, 31 dari 42, 57, 48, 50, 31, 64; ronde 3: lebih besar dari 80: 85, 81, 92 dari 79, 85, 81, 80, 92, 68 |
| 11 | Picture | Garis Bilangan: Antara, Lebih, Kurang | `number-line-between-more-less` | ronde 1: di antara 57 dan 59 = 58, 2 lebihnya dari 58 = 60, 3 kurangnya dari 75 = 72; ronde 2: di antara 82 dan 84 = 83, 3 lebihnya dari 64 = 67, 2 kurangnya dari 91 = 89; ronde 3: di antara 69 dan 71 = 70, 4 lebihnya dari 46 = 50, 5 kurangnya dari 98 = 93 |
| 12 | Picture | Bandingkan Dua Papan | `compare-place-value-boards` | ronde 1: 65 lebih besar 56, 58 lebih besar 54; ronde 2: 73 lebih besar 37, 44 sama dengan 44; ronde 3: 81 lebih kecil 87, 90 lebih besar 19 |
| 13 | Picture | Urutkan Papan | `order-boards` | ronde 1: 57, 76, 83 (dari paling kecil; tampil 57, 76, 83); ronde 2: 56, 65, 74 (dari paling kecil; tampil 56, 65, 74); ronde 3: 86, 71, 68, 59 (dari paling besar; tampil 59, 68, 86, 71) |
| 14 | Picture | Ketuk Model Terbesar dan Terkecil | `tap-bigger-model` | ronde 1: 34, 43, 28; terbesar 43, terkecil 28; ronde 2: 75, 57, 70; terbesar 75, terkecil 57; ronde 3: 92, 29, 90; terbesar 92, terkecil 29 |
| 15 | Picture | Pilah Model terhadap Acuan | `sort-models-reference` | ronde 1: acuan 50; 42, 67, 51, 38, 59, 46; ronde 2: acuan 30; 24, 41, 33, 18, 27, 52; ronde 3: acuan 80; 72, 91, 85, 66, 78, 94 |
| 16 | Picture | Jodohkan Papan dan Tanda | `match-boards-symbol` | ronde 1: 34 < 43, 60 = 60, 91 > 19; ronde 2: 52 > 25, 77 = 77, 68 < 86; ronde 3: 81 > 18, 55 = 55, 39 < 93 |
| 17 | Picture | Tetangga di Tabel Seratus | `hundred-chart-neighbors` | ronde 1: kotak kosong 52, 57, 64, 68; ronde 2: kotak kosong 71, 75, 79, 88, 93; ronde 3: kotak kosong 54, 66, 80, 85, 97 |
| 18 | Picture | Langkah pada Garis Diagram | `step-on-diagram-line` | ronde 1: 62 maju 3 langkah = 65, 88 mundur 4 langkah = 84; ronde 2: 47 maju 5 langkah = 52, 71 mundur 2 langkah = 69; ronde 3: 95 maju 4 langkah = 99, 60 mundur 3 langkah = 57 |
| 19 | Picture | Memori Papan dan Bilangan | `memory-boards-numerals` | ronde 1: pasangan 26, 41, 63, 85; ronde 2: pasangan 32, 54, 77, 98; ronde 3: pasangan 39, 58, 70, 92 |
| 20 | Picture | Ketuk Semua Model terhadap Acuan | `select-all-models-reference` | ronde 1: lebih besar dari 60: 67, 71, 64 dari 53, 67, 71, 60, 48, 64; ronde 2: lebih kecil dari 45: 39, 44, 28 dari 39, 52, 44, 45, 28, 61; ronde 3: lebih besar dari 70: 74, 82, 77 dari 69, 74, 82, 70, 63, 77 |
| 21 | Abstract | Lengkapi Kalimat Banding | `complete-compare-sentences` | ronde 1: 58 lebih besar 54; 43 lebih kecil 67; 72 sama dengan 72; ronde 2: 35 lebih kecil 53; 88 lebih besar 80; 90 sama dengan 90 |
| 22 | Abstract | Benar atau Salah: Perbandingan | `true-false-compare` | ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 4 benar |
| 23 | Abstract | Susun Kalimat Banding | `build-compare-sentence` | ronde 1: Bilangan 65 lebih besar dari bilangan 56; ronde 2: Jika puluhannya sama lihat satuannya; ronde 3: Kupu-kupu maju dua langkah ke depan; ronde 4: Capung mundur tiga langkah ke belakang |
| 24 | Abstract | Aku Adalah Bilangan | `riddle-i-am-a-number` | ronde 1: 2 lebihnya dari 76 = 78, 1 kurangnya dari 67 = 66; ronde 2: 3 lebihnya dari 45 = 48, 2 kurangnya dari 90 = 88; ronde 3: 4 lebihnya dari 58 = 62, 3 kurangnya dari 71 = 68 |
| 25 | Abstract | Tabel Lebihnya dan Kurangnya | `fill-more-less-table` | ronde 1: 2 lebihnya dari: 58=60, 74=76, 45=47, 89=91; ronde 2: 3 kurangnya dari: 75=72, 60=57, 91=88, 34=31 |
| 26 | Abstract | Tulis Dua Angka | `write-two-digits` | ronde 1: 1 kurangnya dari 80 = 79, 2 lebihnya dari 45 = 47; ronde 2: 1 lebihnya dari 59 = 60, 3 kurangnya dari 70 = 67; ronde 3: 2 kurangnya dari 53 = 51, 4 lebihnya dari 62 = 66 |
| 27 | Abstract | Detektif Bilangan Besar Kecil | `riddle-number-clues-compare` | soal 1: Aku lebih besar dari 65. Aku lebih kecil dari 70. Satuanku 8. jawaban 68; soal 2: Aku lebih besar dari 80. Aku lebih kecil dari 90. Jumlah puluhan dan satuanku 12. jawaban 84; soal 3: Aku lebih kecil dari 50. Satuanku 9. Puluhanku 3. jawaban 39; soal 4: Aku lebih besar dari 40. Aku lebih kecil dari 50. Satuanku 2 lebihnya dari puluhanku. jawaban 46 |
| 28 | Abstract | Peta Konsep Banding | `concept-map-fill` | Membandingkan dua bilangan; Lebih dari dan kurang dari |
| 29 | Abstract | Urutkan Lima Bilangan | `order-numerals` | ronde 1: 56, 60, 65, 71, 79 (dari paling kecil; tampil 65, 71, 56, 79, 60); ronde 2: 86, 79, 77, 68 (dari paling besar; tampil 77, 86, 79, 68); ronde 3: 19, 29, 90, 91 (dari paling kecil; tampil 91, 19, 90, 29) |
| 30 | Abstract | Ketuk Semua terhadap Acuan | `select-all-compare-reference` | ronde 1: lebih besar dari 55: 59, 61, 70 dari 48, 59, 55, 61, 52, 70; ronde 2: lebih kecil dari 90: 87, 78, 85 dari 87, 94, 90, 78, 99, 85; ronde 3: lebih besar dari 35: 38, 42, 51 dari 29, 38, 35, 42, 33, 51 |

### Permainan 1. Maju dan Mundur (Concrete)

- **Rujukan buku.** hlm. 209–210 (kupu-kupu maju dua langkah, capung mundur tiga langkah)
- **Tujuan.** Menentukan bilangan yang lebih dari atau kurang dari dengan menghitung maju dan mundur.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya kupu-kupu di 58 maju dua langkah, capung di 75 mundur tiga langkah. Siswa menekan Maju atau Mundur satu langkah demi satu langkah pada garis angka. Bila melewati perintah, tekan Ulang.
- **Ronde.** ronde 1: 58 maju 2 langkah = 60, 75 mundur 3 langkah = 72; ronde 2: 64 maju 3 langkah = 67, 83 mundur 2 langkah = 81; ronde 3: 91 maju 4 langkah = 95, 50 mundur 1 langkah = 49
- **Panduan suara.** Maju atau mundur sesuai perintah.

### Permainan 2. Di Mana Aku? (Concrete)

- **Rujukan buku.** hlm. 209–210 (kupu-kupu berada di antara 57 dan 59)
- **Tujuan.** Menemukan bilangan yang berada di antara dua bilangan.
- **Cara main.** Tiga ronde, tiap ronde tiga soal, misalnya aku berada di antara 74 dan 76. Siswa mengetuk bilangan itu pada garis angka. Letak jawaban berpindah di garis.
- **Ronde.** ronde 1: di antara 57 dan 59 = 58, di antara 74 dan 76 = 75, di antara 63 dan 65 = 64; ronde 2: di antara 82 dan 84 = 83, di antara 91 dan 93 = 92, di antara 69 dan 71 = 70; ronde 3: di antara 51 dan 53 = 52, di antara 78 dan 80 = 79, di antara 96 dan 98 = 97
- **Panduan suara.** Ketuk bilangan yang berada di antaranya.

### Permainan 3. Siapa Lebih Banyak? (Concrete)

- **Rujukan buku.** hlm. 211–212 (kelereng Halim dan Malosi)
- **Tujuan.** Membandingkan banyak benda milik dua anak.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Dua anak punya kumpulan kelereng berisi kantong penuh dan kelereng lepas, misalnya Halim 56 dan Malosi 65. Siswa memilih siapa yang lebih banyak atau sama banyak.
- **Ronde.** ronde 1: Halim 56 dan Malosi 65: lebih kecil, Kira 54 dan Tika 58: lebih kecil; ronde 2: Kira 43 dan Tika 38: lebih besar, Upe 77 dan Lili 72: lebih besar; ronde 3: Malosi 65 dan Halim 56: lebih besar, Upe 47 dan Kira 47: sama dengan
- **Panduan suara.** Lihat kantongnya, lalu pilih yang lebih banyak.

### Permainan 4. Ketuk yang Paling Banyak dan Paling Sedikit (Concrete)

- **Rujukan buku.** hlm. 214 (bilangan yang paling besar dan paling kecil)
- **Tujuan.** Menemukan kumpulan benda yang paling banyak dan paling sedikit.
- **Cara main.** Tiga ronde, tiap ronde tiga kumpulan benda dan dua pertanyaan: paling banyak, lalu paling sedikit. Siswa mengetuk kumpulannya. Letak kunci berpindah.
- **Ronde.** ronde 1: 56, 65, 48; terbesar 65, terkecil 48; ronde 2: 72, 27, 70; terbesar 72, terkecil 27; ronde 3: 91, 19, 90; terbesar 91, terkecil 19
- **Panduan suara.** Ketuk kumpulan yang paling banyak atau sedikit.

### Permainan 5. Susun Dua Kartu (Concrete)

- **Rujukan buku.** hlm. 215 (Ayo Mencoba: kartu bilangan 1–9 dan papan nilai tempat)
- **Tujuan.** Menyusun dua kartu angka menjadi bilangan terbesar atau terkecil.
- **Cara main.** Empat ronde: kartu 3 dan 7, 5 dan 2, 8 dan 6, 4 dan 9. Siswa mengetuk kartu lalu mengetuk tempat puluhan atau satuan. Susunan yang salah diberi petunjuk dan kartu kembali.
- **Ronde.** ronde 1: kartu 3 dan 7, paling besar = 73; ronde 2: kartu 5 dan 2, paling kecil = 25; ronde 3: kartu 8 dan 6, paling besar = 86; ronde 4: kartu 4 dan 9, paling kecil = 49
- **Panduan suara.** Ketuk kartu, lalu ketuk tempatnya.

### Permainan 6. Urutkan Tiga Kantong (Concrete)

- **Rujukan buku.** hlm. 214 (urutkan tiga bilangan dari yang paling kecil)
- **Tujuan.** Mengurutkan tiga kumpulan benda dari yang paling sedikit atau paling banyak.
- **Cara main.** Tiga ronde, tiap ronde tiga kantong bertanda huruf, misalnya 76, 83, dan 57. Siswa mengetuk kantong satu per satu menurut urutan banyaknya.
- **Ronde.** ronde 1: 57, 76, 83 (dari paling kecil; tampil 76, 83, 57); ronde 2: 56, 65, 74 (dari paling kecil; tampil 65, 56, 74); ronde 3: 86, 79, 77 (dari paling besar; tampil 77, 86, 79)
- **Panduan suara.** Ketuk kantong menurut urutan banyaknya.

### Permainan 7. Jodohkan Kiri dan Kanan (Concrete)

- **Rujukan buku.** hlm. 212–213 (membandingkan dua bilangan)
- **Tujuan.** Menjodohkan dua kumpulan benda dengan pernyataan perbandingannya.
- **Cara main.** Tiga ronde, tiap ronde tiga pasang kumpulan benda dan tiga pernyataan: kiri lebih banyak, sama banyak, dan kanan lebih banyak. Siswa mengetuk pasangan, lalu pernyataan yang cocok.
- **Ronde.** ronde 1: 56 lebih kecil 65, 48 sama dengan 48, 73 lebih besar 37; ronde 2: 81 lebih besar 18, 62 sama dengan 62, 29 lebih kecil 92; ronde 3: 54 lebih kecil 58, 70 sama dengan 70, 99 lebih besar 90
- **Panduan suara.** Ketuk pasangan, lalu ketuk pernyataannya.

### Permainan 8. Memori Banyak Benda (Concrete)

- **Rujukan buku.** hlm. 212–213 (bilangan dan puluhan satuannya)
- **Tujuan.** Mencocokkan kumpulan benda dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kumpulan benda dan lambang bilangannya. Siswa membalik dua kartu.
- **Ronde.** ronde 1: pasangan 27, 38, 52, 64; ronde 2: pasangan 35, 46, 53, 61; ronde 3: pasangan 43, 57, 68, 62
- **Panduan suara.** Balik dua kartu, cari benda dan bilangannya.

### Permainan 9. Pilah: Lebih atau Kurang dari Acuan (Concrete)

- **Rujukan buku.** hlm. 216 (lingkari bilangan yang lebih besar)
- **Tujuan.** Memilah kumpulan benda yang lebih banyak dan yang lebih sedikit dari sebuah acuan.
- **Cara main.** Tiga ronde, tiap ronde satu bilangan acuan (60, 75, 40) dan enam kumpulan benda. Siswa menyeret atau mengetuk kumpulan ke kotak Lebih dari acuan atau Kurang dari acuan.
- **Ronde.** ronde 1: acuan 60; 45, 72, 58, 81, 63, 39; ronde 2: acuan 75; 68, 82, 90, 71, 79, 64; ronde 3: acuan 40; 35, 47, 29, 58, 33, 62
- **Panduan suara.** Pilah kumpulan ke kotak yang tepat.

### Permainan 10. Ketuk Semua yang Memenuhi (Concrete)

- **Rujukan buku.** hlm. 216–217 (bilangan yang lebih besar atau lebih kecil)
- **Tujuan.** Memilih semua kumpulan benda yang lebih banyak atau lebih sedikit dari sebuah acuan.
- **Cara main.** Tiga ronde, tiap ronde enam kumpulan benda dan satu perintah, misalnya lebih dari 65. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa.
- **Ronde.** ronde 1: lebih besar dari 65: 72, 66, 80 dari 58, 72, 66, 65, 80, 49; ronde 2: lebih kecil dari 50: 42, 48, 31 dari 42, 57, 48, 50, 31, 64; ronde 3: lebih besar dari 80: 85, 81, 92 dari 79, 85, 81, 80, 92, 68
- **Panduan suara.** Ketuk semua yang memenuhi, lalu periksa.

### Permainan 11. Garis Bilangan: Antara, Lebih, Kurang (Picture)

- **Rujukan buku.** hlm. 209–210 (di antara, lebih dari, dan kurang dari pada garis bilangan)
- **Tujuan.** Menemukan bilangan di antara, yang lebihnya, dan yang kurangnya pada garis bilangan.
- **Cara main.** Tiga ronde, tiap ronde tiga soal: di antara dua bilangan, sekian lebihnya, dan sekian kurangnya. Siswa mengetuk bilangan yang tepat pada garis bilangan.
- **Ronde.** ronde 1: di antara 57 dan 59 = 58, 2 lebihnya dari 58 = 60, 3 kurangnya dari 75 = 72; ronde 2: di antara 82 dan 84 = 83, 3 lebihnya dari 64 = 67, 2 kurangnya dari 91 = 89; ronde 3: di antara 69 dan 71 = 70, 4 lebihnya dari 46 = 50, 5 kurangnya dari 98 = 93
- **Panduan suara.** Ketuk bilangan yang diminta pada garis.

### Permainan 12. Bandingkan Dua Papan (Picture)

- **Rujukan buku.** hlm. 212–213 (bandingkan puluhan lalu satuan)
- **Tujuan.** Membandingkan dua bilangan pada dua papan nilai tempat.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Dua papan nilai tempat A dan B ditampilkan, dan siswa memilih papan yang lebih besar atau sama besar.
- **Ronde.** ronde 1: 65 lebih besar 56, 58 lebih besar 54; ronde 2: 73 lebih besar 37, 44 sama dengan 44; ronde 3: 81 lebih kecil 87, 90 lebih besar 19
- **Panduan suara.** Bandingkan puluhan dulu, lalu satuannya.

### Permainan 13. Urutkan Papan (Picture)

- **Rujukan buku.** hlm. 214 dan 222 (urutkan bilangan)
- **Tujuan.** Mengurutkan papan nilai tempat dari bilangan terkecil atau terbesar.
- **Cara main.** Tiga ronde, tiap ronde tiga atau empat papan. Siswa mengetuk papan satu per satu menurut urutan.
- **Ronde.** ronde 1: 57, 76, 83 (dari paling kecil; tampil 57, 76, 83); ronde 2: 56, 65, 74 (dari paling kecil; tampil 56, 65, 74); ronde 3: 86, 71, 68, 59 (dari paling besar; tampil 59, 68, 86, 71)
- **Panduan suara.** Ketuk papan menurut urutan bilangannya.

### Permainan 14. Ketuk Model Terbesar dan Terkecil (Picture)

- **Rujukan buku.** hlm. 214 (bilangan paling besar dan paling kecil)
- **Tujuan.** Menemukan model batang dan kotak yang paling besar dan paling kecil.
- **Cara main.** Tiga ronde, tiap ronde tiga model dan dua pertanyaan: terbesar, lalu terkecil. Siswa mengetuk modelnya.
- **Ronde.** ronde 1: 34, 43, 28; terbesar 43, terkecil 28; ronde 2: 75, 57, 70; terbesar 75, terkecil 57; ronde 3: 92, 29, 90; terbesar 92, terkecil 29
- **Panduan suara.** Ketuk model yang terbesar atau terkecil.

### Permainan 15. Pilah Model terhadap Acuan (Picture)

- **Rujukan buku.** hlm. 216 (lebih besar dan lebih kecil dari sebuah bilangan)
- **Tujuan.** Memilah model menurut lebih besar atau lebih kecil dari bilangan acuan.
- **Cara main.** Tiga ronde, tiap ronde bilangan acuan (50, 30, 80) dan enam model. Siswa menyeret atau mengetuk model ke kotak yang tepat.
- **Ronde.** ronde 1: acuan 50; 42, 67, 51, 38, 59, 46; ronde 2: acuan 30; 24, 41, 33, 18, 27, 52; ronde 3: acuan 80; 72, 91, 85, 66, 78, 94
- **Panduan suara.** Pilah model ke kotak yang tepat.

### Permainan 16. Jodohkan Papan dan Tanda (Picture)

- **Rujukan buku.** hlm. 212–213 (lebih besar, lebih kecil, sama dengan)
- **Tujuan.** Menjodohkan dua papan dengan tanda perbandingan yang tepat.
- **Cara main.** Tiga ronde, tiap ronde tiga pasang papan dan tiga kartu tanda lebih besar, lebih kecil, dan sama dengan. Siswa mengetuk pasangan papan lalu kartu tandanya.
- **Ronde.** ronde 1: 34 < 43, 60 = 60, 91 > 19; ronde 2: 52 > 25, 77 = 77, 68 < 86; ronde 3: 81 > 18, 55 = 55, 39 < 93
- **Panduan suara.** Ketuk pasangan papan, lalu ketuk tandanya.

### Permainan 17. Tetangga di Tabel Seratus (Picture)

- **Rujukan buku.** hlm. 209 (tabel bilangan 51 sampai 100)
- **Tujuan.** Menemukan bilangan yang hilang pada tabel seratus dari bilangan tetangganya.
- **Cara main.** Tiga ronde, tiap ronde empat atau lima kotak kosong pada tabel sepuluh kolom. Siswa memilih satu dari tiga angka untuk kotak yang menyala.
- **Ronde.** ronde 1: kotak kosong 52, 57, 64, 68; ronde 2: kotak kosong 71, 75, 79, 88, 93; ronde 3: kotak kosong 54, 66, 80, 85, 97
- **Panduan suara.** Isi kotak yang menyala dengan bilangan yang tepat.

### Permainan 18. Langkah pada Garis Diagram (Picture)

- **Rujukan buku.** hlm. 210 (maju dua langkah, mundur tiga langkah)
- **Tujuan.** Maju dan mundur satu langkah pada garis bilangan diagram.
- **Cara main.** Tiga ronde, tiap ronde dua soal. Bulatan penanda berada di sebuah bilangan, dan siswa menekan Maju atau Mundur sesuai perintah.
- **Ronde.** ronde 1: 62 maju 3 langkah = 65, 88 mundur 4 langkah = 84; ronde 2: 47 maju 5 langkah = 52, 71 mundur 2 langkah = 69; ronde 3: 95 maju 4 langkah = 99, 60 mundur 3 langkah = 57
- **Panduan suara.** Maju atau mundur sesuai perintah.

### Permainan 19. Memori Papan dan Bilangan (Picture)

- **Rujukan buku.** hlm. 212–213 (bilangan dan puluhan satuannya)
- **Tujuan.** Mencocokkan papan nilai tempat dengan lambang bilangannya.
- **Cara main.** Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): papan nilai tempat dan lambang bilangannya.
- **Ronde.** ronde 1: pasangan 26, 41, 63, 85; ronde 2: pasangan 32, 54, 77, 98; ronde 3: pasangan 39, 58, 70, 92
- **Panduan suara.** Balik dua kartu, cari papan dan bilangannya.

### Permainan 20. Ketuk Semua Model terhadap Acuan (Picture)

- **Rujukan buku.** hlm. 216–217 (bilangan yang lebih besar atau lebih kecil)
- **Tujuan.** Memilih semua model yang lebih besar atau lebih kecil dari sebuah acuan.
- **Cara main.** Tiga ronde, tiap ronde enam model dan satu perintah, misalnya lebih besar dari 60. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa.
- **Ronde.** ronde 1: lebih besar dari 60: 67, 71, 64 dari 53, 67, 71, 60, 48, 64; ronde 2: lebih kecil dari 45: 39, 44, 28 dari 39, 52, 44, 45, 28, 61; ronde 3: lebih besar dari 70: 74, 82, 77 dari 69, 74, 82, 70, 63, 77
- **Panduan suara.** Ketuk semua model yang memenuhi, lalu periksa.

### Permainan 21. Lengkapi Kalimat Banding (Abstract)

- **Rujukan buku.** hlm. 212–213 (bilangan 65 lebih besar dari bilangan 56)
- **Tujuan.** Melengkapi kalimat perbandingan dua bilangan dengan kata yang tepat.
- **Cara main.** Dua ronde, tiap ronde tiga kalimat, misalnya bilangan 58 ... bilangan 54. Siswa memilih lebih besar dari, lebih kecil dari, atau sama dengan. Kalimat lengkap dibacakan.
- **Ronde.** ronde 1: 58 lebih besar 54; 43 lebih kecil 67; 72 sama dengan 72; ronde 2: 35 lebih kecil 53; 88 lebih besar 80; 90 sama dengan 90
- **Panduan suara.** Pilih kata yang tepat untuk bagian kosong.

### Permainan 22. Benar atau Salah: Perbandingan (Abstract)

- **Rujukan buku.** hlm. 209–217 (membandingkan dan lebih dari, kurang dari)
- **Tujuan.** Menilai pernyataan tentang perbandingan, lebihnya, dan kurangnya.
- **Cara main.** Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan dihitung dari bilangan, dan tiap jawaban diberi penjelasan singkat.
- **Ronde.** ronde 1: 5 pernyataan, 3 benar; ronde 2: 5 pernyataan, 4 benar
- **Panduan suara.** Baca pernyataan, lalu pilih benar atau salah.

### Permainan 23. Susun Kalimat Banding (Abstract)

- **Rujukan buku.** hlm. 209–213 (kalimat perbandingan dan menghitung maju mundur)
- **Tujuan.** Menyusun kata menjadi kalimat tentang perbandingan dan langkah maju atau mundur.
- **Cara main.** Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.
- **Ronde.** ronde 1: Bilangan 65 lebih besar dari bilangan 56; ronde 2: Jika puluhannya sama lihat satuannya; ronde 3: Kupu-kupu maju dua langkah ke depan; ronde 4: Capung mundur tiga langkah ke belakang
- **Panduan suara.** Ketuk kata menjadi kalimat yang benar.

### Permainan 24. Aku Adalah Bilangan (Abstract)

- **Rujukan buku.** hlm. 217 nomor 4 dan 5 (aku dua lebihnya dari 76; aku satu kurangnya dari 67)
- **Tujuan.** Menemukan bilangan dari petunjuk lebihnya atau kurangnya.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya aku dua lebihnya dari bilangan 76. Siswa memilih satu dari tiga bilangan.
- **Ronde.** ronde 1: 2 lebihnya dari 76 = 78, 1 kurangnya dari 67 = 66; ronde 2: 3 lebihnya dari 45 = 48, 2 kurangnya dari 90 = 88; ronde 3: 4 lebihnya dari 58 = 62, 3 kurangnya dari 71 = 68
- **Panduan suara.** Baca teka-tekinya, lalu pilih bilangannya.

### Permainan 25. Tabel Lebihnya dan Kurangnya (Abstract)

- **Rujukan buku.** hlm. 209–210 (2 lebihnya dari 58; 3 kurangnya dari 75)
- **Tujuan.** Mengisi tabel bilangan yang sekian lebihnya atau kurangnya.
- **Cara main.** Dua ronde dengan tabel berisi empat baris: 2 lebihnya dari bilangan dan 3 kurangnya dari bilangan. Siswa mengetuk baris, lalu mengetuk kartu angka.
- **Ronde.** ronde 1: 2 lebihnya dari: 58=60, 74=76, 45=47, 89=91; ronde 2: 3 kurangnya dari: 75=72, 60=57, 91=88, 34=31
- **Panduan suara.** Isi tabel dengan kartu angka.

### Permainan 26. Tulis Dua Angka (Abstract)

- **Rujukan buku.** hlm. 208 dan 217 (tulis lambang bilangan)
- **Tujuan.** Menuliskan bilangan hasil lebihnya atau kurangnya pada papan dua angka.
- **Cara main.** Tiga ronde, tiap ronde dua soal, misalnya satu kurangnya dari 80. Siswa mengatur angka puluhan dan angka satuan, lalu menekan Periksa.
- **Ronde.** ronde 1: 1 kurangnya dari 80 = 79, 2 lebihnya dari 45 = 47; ronde 2: 1 lebihnya dari 59 = 60, 3 kurangnya dari 70 = 67; ronde 3: 2 kurangnya dari 53 = 51, 4 lebihnya dari 62 = 66
- **Panduan suara.** Atur angka puluhan dan satuan, lalu periksa.

### Permainan 27. Detektif Bilangan Besar Kecil (Abstract)

- **Rujukan buku.** hlm. 217 (aku adalah bilangan) dan 223 (buatlah pertanyaan untuk menunjukkan satu bilangan)
- **Tujuan.** Menemukan bilangan dari petunjuk lebih besar, lebih kecil, puluhan, dan satuan.
- **Cara main.** Empat soal. Siswa membaca tiga petunjuk, misalnya aku lebih besar dari 65, lebih kecil dari 70, dan satuanku 8, lalu memilih satu dari tiga bilangan.
- **Ronde.** soal 1: Aku lebih besar dari 65. Aku lebih kecil dari 70. Satuanku 8. jawaban 68; soal 2: Aku lebih besar dari 80. Aku lebih kecil dari 90. Jumlah puluhan dan satuanku 12. jawaban 84; soal 3: Aku lebih kecil dari 50. Satuanku 9. Puluhanku 3. jawaban 39; soal 4: Aku lebih besar dari 40. Aku lebih kecil dari 50. Satuanku 2 lebihnya dari puluhanku. jawaban 46
- **Panduan suara.** Baca semua petunjuk, lalu pilih bilangannya.

### Permainan 28. Peta Konsep Banding (Abstract)

- **Rujukan buku.** hlm. 192 (peta konsep: membandingkan bilangan; lebih dari dan kurang dari)
- **Tujuan.** Melengkapi peta konsep membandingkan dua bilangan serta lebih dari dan kurang dari.
- **Cara main.** Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.
- **Ronde.** Membandingkan dua bilangan; Lebih dari dan kurang dari
- **Panduan suara.** Pilih kartu yang tepat untuk kotak yang menyala.

### Permainan 29. Urutkan Lima Bilangan (Abstract)

- **Rujukan buku.** hlm. 214 dan 222 nomor 5 (urutkan bilangan mulai dari yang paling kecil)
- **Tujuan.** Mengurutkan empat atau lima bilangan dari yang paling kecil atau paling besar.
- **Cara main.** Tiga ronde, tiap ronde empat atau lima bilangan, misalnya 65, 71, 56, 79, 60. Siswa mengetuk bilangan satu per satu menurut urutan.
- **Ronde.** ronde 1: 56, 60, 65, 71, 79 (dari paling kecil; tampil 65, 71, 56, 79, 60); ronde 2: 86, 79, 77, 68 (dari paling besar; tampil 77, 86, 79, 68); ronde 3: 19, 29, 90, 91 (dari paling kecil; tampil 91, 19, 90, 29)
- **Panduan suara.** Ketuk bilangan menurut urutannya.

### Permainan 30. Ketuk Semua terhadap Acuan (Abstract)

- **Rujukan buku.** hlm. 216–217 (lingkari bilangan yang lebih besar)
- **Tujuan.** Memilih semua bilangan yang lebih besar atau lebih kecil dari sebuah acuan.
- **Cara main.** Tiga ronde, tiap ronde enam bilangan dan satu perintah, misalnya lebih besar dari 55. Siswa mengetuk semua yang memenuhi, lalu menekan Periksa.
- **Ronde.** ronde 1: lebih besar dari 55: 59, 61, 70 dari 48, 59, 55, 61, 52, 70; ronde 2: lebih kecil dari 90: 87, 78, 85 dari 87, 94, 90, 78, 99, 85; ronde 3: lebih besar dari 35: 38, 42, 51 dari 29, 38, 35, 42, 33, 51
- **Panduan suara.** Ketuk semua yang memenuhi, lalu periksa.

## 8. Poin Penting dan Catatanku

- 📏 **Garis bilangan**: kanan lebih besar, kiri lebih kecil. _Suara:_ Pada garis bilangan, bilangan di sebelah kanan lebih besar dan bilangan di sebelah kiri lebih kecil.
- ↔️ **Lebihnya dan kurangnya**: maju untuk lebih, mundur untuk kurang. _Suara:_ Menghitung maju untuk mencari lebihnya, dan menghitung mundur untuk mencari kurangnya.
- 🔟 **Bandingkan puluhan dulu**: puluhan sama, lihat satuan. _Suara:_ Untuk membandingkan dua bilangan, lihat puluhannya lebih dulu. Bila puluhannya sama, lihat satuannya.
- ⚖️ **Kata perbandingan**: lebih besar, lebih kecil, sama dengan. _Suara:_ Kata perbandingan bilangan adalah lebih besar dari, lebih kecil dari, dan sama dengan.
- 📶 **Mengurutkan bilangan**: dari yang paling kecil. _Suara:_ Untuk mengurutkan bilangan, bandingkan puluhannya. Puluhan paling sedikit adalah bilangan paling kecil.

**Suara Poin Penting.** Ingat selalu! Pada garis bilangan, bilangan di kanan lebih besar. Menghitung maju mencari lebihnya dan menghitung mundur mencari kurangnya. Untuk membandingkan dua bilangan, lihat puluhannya lebih dulu, lalu satuannya bila puluhannya sama. Kita memakai kata lebih besar dari, lebih kecil dari, dan sama dengan, lalu mengurutkan bilangan dari yang paling kecil.

**Cara menyebutkan.** Bilangan kata perbandingan dari bilangan lain. _Suara:_ Cara menyebutkan. Enam puluh lima lebih besar dari lima puluh enam. Sebut bilangan pertama, kata perbandingan, lalu bilangan kedua.

**Ayo Mencoba di rumah.** Ayo Mencoba di rumah: ambil dua kartu bilangan dari satu sampai sembilan, susun menjadi bilangan dua angka, lalu bandingkan dengan bilangan temanmu. Ceritakan bilangan siapa yang lebih besar dan mengapa. Buat juga satu teka-teki, aku adalah bilangan yang satu kurangnya dari bilangan tertentu, lalu minta temanmu menjawabnya.

**Refleksi (Catatanku).**

- Aku dapat membandingkan dua bilangan.
- Aku dapat mengurutkan bilangan sampai dengan 100.
- Aku belajar dengan tertib.
- Aku menyampaikan pendapat dengan percaya diri.

## 9. Metode dari luar buku yang diadopsi

- **Garis bilangan maju dan mundur**: lebihnya berarti maju (kanan), kurangnya berarti mundur (kiri). Kupu-kupu dan capung memperagakan sehingga arah mudah diingat.
- **Bandingkan puluhan lebih dulu**: puluhan menentukan besar bilangan, satuan hanya dilihat bila puluhan sama. Dasar permainan Siapa Lebih Banyak dan Bandingkan Dua Papan.
- **Tanda perbandingan sebagai mulut buaya**: tanda terbuka ke arah bilangan yang lebih besar. Dasar permainan Jodohkan Papan dan Tanda.
- **Kartu angka dan papan nilai tempat**: dua kartu disusun menjadi bilangan terbesar atau terkecil dengan menaruh angka terbesar di tempat puluhan (Susun Dua Kartu).
- **Memori pasangan (concentration)**: mencocokkan kumpulan benda atau papan dengan lambang bilangannya melatih ingatan dan nilai tempat sekaligus.
- **Pilah terhadap acuan**: membandingkan banyak bilangan sekaligus dengan satu bilangan acuan (pilah ke kotak lebih besar dan lebih kecil).
- **Teka-teki mundur (inverse operation)**: teka-teki Kira diselesaikan dengan mengurangi dari hasil, melatih berpikir terbalik.

## 10. Batas yang diketahui

- Soal Latihan (30 poin), soal Ujian (70 poin), dan Simulasi belum dibuat. Pemilik akan menugaskannya terpisah. Sampai saat itu tab Latihan dan Ujian menampilkan kartu "sedang disiapkan".
- Suara dan ketukan video diuji dengan suara perangkat di Chrome desktop berukuran ponsel. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata).
- Laju 0,70 dan nada 1 sama untuk Bu Sari dan Pak Budi. Beda guru hanya pada suara yang dipilih perangkat (wanita atau pria). Perangkat yang hanya punya satu suara Indonesia akan membuat kedua guru terdengar serupa.
- Ucapan memakai kata, bukan lambang, supaya suara perangkat tidak salah membaca.
- Tiga puluh permainan per sub-bab memakai sepuluh jenis per tahap. Mesin yang sama (urut ketuk, pilih bertahap, jodohkan, ketuk semua, memori) dipakai lintas tahap dengan isi yang berbeda: benda nyata di Concrete, diagram di Picture, kata dan angka di Abstract.
- Tanda perbandingan (>, <, =) selalu diucapkan dengan kata (lebih besar dari, lebih kecil dari, sama dengan) oleh Suara Guru. Garis bilangan memakai kupu-kupu (emoji) dan capung (gambar SVG).

