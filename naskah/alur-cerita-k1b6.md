# Alur cerita Kelas 1 Bab 6: Pasar Malam Kampung (Sub-Bab A sampai C)

Tokoh tetap: Igil (adik, anak perempuan, penasaran dan terburu-buru), Kaka (anak perempuan berpita, teliti dan mencatat), Abang (menggambar, mencoba cara baru), Mamah (memberi masalah, menanyakan alasan). Tamu: Pak RT dan pembeli.
Latar: pasar malam kampung (lapak kue, loket karcis, lampion, balon). Tema dipilih sesi ini; berbeda dari Bab 1 "Misi Rumah Rapi", Bab 2 "Kebun Sayur Mamah", Bab 3 "Kereta ke Rumah Nenek",
Bab 4 "Festival Mainan Kardus", Bab 5 "Akuarium Ikan Hias Abang". Materi bab: penjumlahan dan pengurangan sampai dengan 20 (data `src/data/kelas1-bab6.json`, naskah `naskah/mtk-1-bab6-sub-*.md`).
Semua angka sampai dua puluh; hasil tidak lebih dari dua puluh. Tanpa perkalian dan pembagian; tanpa lambang lebih besar atau lebih kecil (cukup kata).

| Sub-Bab | Judul cerita | Masalah nyata | Penyelesaian (metode) | Hasil dan jembatan |
|---|---|---|---|---|
| A (Lebih dari, Kurang dari, Selisih) | Dua Nampan Kue | Mamah menata dua belas kue cubit dan delapan kue pukis; Pak RT bertanya nampan mana lebih banyak dan berapa bedanya; Igil keliru menjumlahkan | Pasangkan satu-satu, lebihnya dan kurangnya, selisih = besar dikurangi kecil, menyamakan, model batang dan garis bilangan (lampion tujuh dan sepuluh), bilangan belum diketahui (lebihnya menambah, kurangnya mengurang). Global: Bar Model, Number Line Difference, Equalizing | Dua nampan sama banyak; Abang membuka loket karcis dan rombongan datang bergelombang (jembatan ke B) |
| B (Penjumlahan Kurang dari 20) | Loket Karcis | Karcis delapan dan tujuh digabung supaya kursi komidi putar cukup; Igil menyebut bilangan awal dua kali | Hitung maju dari bilangan sesudahnya, genapkan sepuluh (sembilan dan lima), belasan ditambah satuan dengan nilai tempat, pilih cara. Global: Doubles Plus One, Part-Whole Model, Number Line Jumps | Semua karcis tercatat; malam larut, lonceng penutup, setiap lapak harus melaporkan sisa (jembatan ke C) |
| C (Pengurangan Kurang dari 20, akhir) | Tutup Pasar Malam | Sisa dagangan harus dilaporkan: enam belas kue dimakan tiga, delapan belas balon lepas empat; Igil lupa puluhan | Hitung mundur dari bilangan sesudahnya, kurangi satuannya puluhan tetap, periksa dengan menambah, pilih cara. Global: Think Addition, Fact Family, Subtract Through Ten | Laporan lengkap, lampion dilepas, pasar malam ditutup (akhir cerita bab, perayaan di Abstract) |

Naskah suara tetap: `naskah/story-naskah-k1b6a.md`, `story-naskah-k1b6b.md`, `story-naskah-k1b6c.md` (materi dan metode global). Hasil Story (hindari sebagai jawaban CPA bila memungkinkan): A: 4, 3, 11, 20(salah); B: 15, 14, 17, 16, 13; C: 13, 12, 14, 16, 18.

## Soal "Cari kesalahan" (minimal satu per tahap; ide dasar, angka boleh disesuaikan agar jawaban tidak kembar dan tidak sama dengan hasil Story)
- A Concrete: Abang memasangkan 13 jeruk dan 9 apel dan berkata jeruk lebihnya 5 (benar empat; alasan benar: yang tanpa pasangan hanya empat).
- A Pictorial: batang merah 9 kotak, biru 15 kotak; Igil bilang selisihnya 24 (menjumlahkan; benar 15 dikurangi 9 sama dengan 6).
- A Abstract: Kaka menulis 17 – 12 = 6 (benar 5; alasan benar: 12 ditambah 5 menjadi 17). Boleh satu soal di mana tokoh benar.
- B Concrete: Igil menghitung maju 6 + 5 dengan menyebut enam lagi, jadi 10 (benar 11; mulai dari bilangan sesudahnya).
- B Pictorial: Abang memecah 9 + 7 menjadi 9 + 1 = 10 lalu 10 + 7 = 17 (benar 10 + 6 = 16; yang tersisa enam bukan tujuh).
- B Abstract: Kaka menulis 14 + 5 = 18 (benar 19; satuan 4 + 5 = 9, puluhan tetap satu).
- C Concrete: Igil menjawab 14 apel dimakan 3 sisa 17 (menambah; benar 11, dimakan berarti berkurang).
- C Pictorial: tabel puluhan dan satuan untuk 17 – 5, Kaka mengisi 0 puluhan dan 2 satuan (lupa puluhan; benar 1 puluhan 2 satuan).
- C Abstract: Abang memeriksa 19 – 6 = 13 dengan 13 + 6 = 19 (tokoh benar) dan satu lagi di mana tokoh keliru (mis. 15 – 8 = 6, periksa 6 + 8 = 14, tidak cocok; benar 7).
Alasan benar tidak selalu tombol pertama. Petunjuk salah menjelaskan kesalahan tokoh.

## Pola visual (baru, berbeda dari Bab 1 sampai 5)

- Sub-Bab A (`src/components/modul/nampan-k1b6a/`): Mind-map untaian lampu bohlam bergantung; Infografis papan menu kapur di tiang lapak; Simulasi Meja Dua Nampan; Concrete alas anyaman bambu (tampah); Pictorial taplak kotak-kotak merah putih; Abstract kertas koran pembungkus.
- Sub-Bab B (`src/components/modul/karcis-k1b6b/`): Mind-map komidi putar bertiang; Infografis lembar karcis bergigi; Simulasi Loket Karcis; Concrete tikar pandan; Pictorial denah arena pasar malam bergaris; Abstract layar kasir LCD hijau.
- Sub-Bab C (`src/components/modul/tutup-k1b6c/`): Mind-map kincir ria dengan gondola; Infografis papan laporan Pak RT berpenjepit; Simulasi Meja Tutup Lapak; Concrete tiang balon dan tali; Pictorial peta malam bertaburan lampion; Abstract langit malam berkembang api. (Rincian akhir ditulis pelaksana.)
