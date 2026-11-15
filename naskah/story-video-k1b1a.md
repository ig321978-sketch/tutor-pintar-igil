# Video Story Kelas 1 Bab 1 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10): pilot mesin Story baru

Pilot pertama mesin Story untuk Kelas 1 (sub-bab B sampai D masih memakai Cerita lama dari `kelas1-bab1.json`). Mesin sama dengan Kelas 4 sampai 6 (`story/logika-story.ts`, `story/mesin-story.tsx`, sapaan `story/sapaan.ts`). Gambar dan adegan: `story/k1b1a-*.ts`; pembungkus `video-k1b1a.tsx` (ekspor `VideoK1B1A`). Penyambungan ke pemutar: `modul/registri-cerita-baru.ts` (`CERITA_BARU`, kunci `mtk-1-bab1-A`), dipakai `IgilModulePlayer.tsx` hanya untuk tahap Story; tahap lain sub-bab A tetap data lama.

## Gaya guru
Judul tanpa rujukan buku; subjudul "Materi kurikulum" dan "Tiga metode luar"; sumber adegan "Materi: ..." atau "Metode luar: ..."; tanpa kata buku, halaman, kunci, rubrik, dan sejenisnya. Sapaan guru di adegan pertama kedua video. Suara tanpa digit. Hanya bilangan 0 sampai 10. Tokoh: Malosi, Kira, Upe, Wei, dan Igil si burung hantu. Benda berhitung: bola, balon, kelereng, layang-layang, pensil, apel (kata "buku" terlarang di uji).

## Ukuran
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| materi | 13 | 71 | 890 | 7,4 menit |
| metode luar (One-to-One, Cardinality, Subitizing) | 9 | 36 | 430 | 3,6 menit |

Uji: `node --no-warnings scripts/uji-story-k1b1a.mjs` (termasuk pemeriksaan hitungan benda, titik kartu, dan angka tulisan terhadap kata bilangan di suara), `scripts/uji-susun-k1b1.mjs`.

## Mind-Map dan Infografis susun tab (`kelas1-bab1-ringkas.json`, subBab.A)
- Peta: pusat "Ada berapa bola di taman?", 11 simpul; cabang Tiga hal yang dipelajari (Menghitung benda, Membaca angka, Menulis angka), Cara melakukannya (3), Hasil yang diharapkan (2).
- Tabel: "Banyak benda dan angkanya"; kolom Angka, Dibaca, Bendanya; 4 baris (Kosong, Tiga, Enam, Sepuluh). Margin teks sel di 405 px minimal 5,3 px ("Enam balon" paling sempit).

## Catatan
- Data lama `kelas1-bab1.json` A-S5 menyebut keranjang berisi sepuluh bola; video baru memakai lima bola di keranjang pertama.
- Tokoh digambar dengan emoji 🧒 berlabel nama; ayunan, perosotan, dan jungkat-jungkit dari garis dan kotak sederhana.

# Video Story Kelas 1 Bab 1 Sub-Bab B (Membandingkan Banyak Benda)

Paket Story untuk Sub-Bab B, meniru pilot Sub-Bab A. Gambar dan adegan: `story/k1b1b-*.ts`; pembungkus `video-k1b1b.tsx` (ekspor `VideoK1B1B`). Ekspor video: `VIDEO_MATERI_K1B1B` (id `k1b1b-materi`) dan `VIDEO_LUAR_K1B1B` (id `k1b1b-luar`) di `story/k1b1b-video.ts`. Penyambungan ke registri dan pemutar dilakukan koordinator.

## Gaya guru
Judul "Membandingkan Banyak Benda" dan "Membandingkan Banyak Benda: Metode dari Luar"; subjudul "Materi kurikulum" dan "Tiga metode luar"; sumber adegan "Materi: ..." atau "Metode luar: ..."; tanpa kata buku, halaman, kunci, rubrik, dan sejenisnya. Sapaan guru di adegan pertama kedua video (daftar: Memasangkan benda, Mengenal banyak dan sedikit, Memilih tanda yang tepat). Suara tanpa digit. Hanya bilangan 0 sampai 10 (paling besar yang tampil: sembilan, dan sepuluh pada Bingkai dan Garis Bilangan). Tokoh: Malosi, Kira, Upe, Wei, dan Igil. Tanda dijelaskan dengan "mulut buaya" (terbuka ke kelompok yang lebih banyak).

## Adegan materi (14)
sapaan; cerita-taman; pasangkan (3 sepeda dan 3 burung, sama banyak); lebih-banyak (6 kursi, 4 balon); lebih-sedikit (5 kelereng Kira, 8 kelereng Malosi); tertipu (5 bola rapat dan 5 bola renggang); tanda-banyak (7 > 4, 5 > 4); tanda-sedikit (4 < 8); tanda-sama (6 = 6, dua cara menulis, tiga tanda); nol (0 < 3); latihan-satu (pensil 4 dan 5); latihan-dua (7 > 3, 2 < 9); latihan-tiga (4 = 4); penutup.

## Adegan metode luar (9)
sapaan; luar-pembuka; luar-nama dan luar-nama-terapan (Number Names, Nama Bilangan: ucapkan nama dan tulis lambang, empat dan lima); luar-bingkai dan luar-bingkai-terapan (Ten Frame, Bingkai Sepuluh: bingkai enam kursi dan empat balon); luar-garis dan luar-garis-terapan (Number Line Mini, Garis Bilangan Kecil: katak melompat dari lima ke delapan); luar-ringkas.

## Ukuran
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| materi | 14 | 74 | 995 | 8,3 menit |
| metode luar | 9 | 36 | 470 | 3,9 menit |

Uji: `node --no-warnings scripts/uji-story-k1b1b.mjs` (memeriksa banyak benda tiap kelompok, garis pasangan satu per satu, arah tanda > < =, bingkai, garis bilangan, kata terlarang, tanpa digit di suara), dan `scripts/uji-susun-k1b1.mjs .tmp-k1b1as/B.json`.

## Mind-Map dan Infografis susun tab (`.tmp-k1b1as/B.json`)
- Peta: pusat "Mana yang lebih banyak?", 11 simpul; Tiga hal yang dipelajari (Memasangkan benda, Mengenal banyak dan sedikit, Memilih tanda yang tepat), Cara melakukannya (3), Hasil yang diharapkan (2).
- Tabel: "Memasangkan dua kelompok"; kolom Sisanya, Kiri, Tanda; 3 baris (3 dan 3, 6 dan 4, 4 dan 6). Sel terpanjang 9 huruf.

## Catatan
- Kalimat "lebih banyak/sedikit" dan "membandingkan" diizinkan di uji B (isi sub-bab); tambah dan kurang tetap terlarang.
- Data lama menyebut benda "sepeda dan burung", "kursi dan balon", "kelereng", "pensil"; video baru memakai semuanya. Tokoh digambar dengan emoji.

# Video Story Kelas 1 Bab 1 Sub-Bab C (Menghitung Maju dan Mundur)

Meniru pilot Sub-Bab A. Gambar dan adegan: `story/k1b1c-*.ts` (gambar, bantu, materi-1..3, luar-1..2, video); pembungkus `video-k1b1c.tsx` (ekspor `VideoK1B1C`); uji `scripts/uji-story-k1b1c.mjs`. Ekspor `VIDEO_MATERI_K1B1C` (id `k1b1c-materi`) dan `VIDEO_LUAR_K1B1C` (id `k1b1c-luar`). Penyambungan ke pemutar (registri cerita baru, kunci `mtk-1-bab1-C`) dilakukan koordinator.

## Gaya guru
Judul tanpa rujukan buku; subjudul "Materi kurikulum" dan "Tiga metode luar"; sumber adegan "Materi: ..." atau "Metode luar: ..."; tanpa kata buku, halaman, kunci, rubrik, dan sejenisnya. Suara tanpa digit. Hanya bilangan 1 sampai 10: menghitung maju, mundur, sebelum dan sesudah, melengkapi urutan; tanpa tambah dan kurang formal. Tokoh: Malosi, Kira, Upe, Wei, Igil.

## Isi video materi (14 adegan, 71 ketukan, 996 kata, sekitar 8,3 menit)
1. sapaan (Menghitung maju, Menghitung mundur, Melengkapi urutan)
2. cerita-tangga: Malosi, Kira, Upe, Wei, Igil di taman; tangga sepuluh anak tangga
3. hitung-maju: Upe naik tangga satu sampai sepuluh; deretan angka
4. hitung-mundur: Upe turun sepuluh sampai satu; petak umpet
5. mulai-mana-saja: maju dari empat, mundur dari delapan di deretan angka
6. sebelum-sesudah: katak di batu enam (sebelum lima, sesudah tujuh)
7. hitung-berantai: Upe tiga, Kira empat, Malosi lima, Wei enam
8. hubungkan-titik: titik satu sampai sepuluh membentuk perahu layar
9. lengkapi-maju (tiga, ?, lima dan empat, lima, ?, tujuh, delapan)
10. lengkapi-mundur (delapan, tujuh, ?, lima dan lima, empat, ?, dua, satu)
11. Latihan 1 (lima, ?, tujuh, delapan), Latihan 2 (sembilan, delapan, ?, enam), Latihan 3 (naik dan turun satu anak tangga dari enam)
12. penutup

## Isi video metode luar (9 adegan, 36 ketukan, 495 kata, sekitar 4,1 menit)
sapaan; pembuka tiga metode; CPA Concrete (Benda Nyata Dulu): konsep dan terapan tangga balok; CPA Pictorial (Gambar Representasi): konsep tangga bergambar dan terapan katak di garis bilangan; CPA Abstract (Simbol Matematika): konsep angka saja dan terapan melengkapi urutan dengan angka; ringkasan.

## Mind-Map dan Infografis susun tab (`.tmp-k1b1as/C.json`)
- Peta: pusat "Upe naik dan turun tangga", 11 simpul; Tiga hal yang dipelajari (Menghitung maju, Menghitung mundur, Melengkapi urutan), Cara melakukannya (3), Hasil yang diharapkan (2); teks paling panjang 28 huruf.
- Tabel: "Sebelum dan sesudah bilangan"; kolom Angka, Sebelum, Sesudah; baris Tiga, Lima, Enam, Delapan; sel hanya satu angka.

## Catatan
- Data lama `kelas1-bab1.json` C-S5 menyebut "buku gambar" dan metodeLuar menyebut "tanda operasi"; video baru memakai "kertas bergambar" dan "angka saja" (kata buku dan operasi ditolak uji).
- Tokoh digambar dengan emoji berlabel nama; tangga dari kotak bertinggi naik sepuluh.

# Video Story Kelas 1 Bab 1 Sub-Bab D (Pasangan Bilangan)

Mesin Story sama dengan pilot Sub-Bab A. Gambar dan adegan: `story/k1b1d-*.ts` (gambar dan helper khusus: `k1b1d-gambar.ts`, `k1b1d-bantu.ts`); pembungkus `video-k1b1d.tsx` (ekspor `VideoK1B1D`); ekspor video `VIDEO_MATERI_K1B1D` (id `k1b1d-materi`) dan `VIDEO_LUAR_K1B1D` (id `k1b1d-luar`). Penyambungan ke pemutar dan registri dilakukan koordinator (kunci `mtk-1-bab1-D`).

## Gaya guru
Judul "Pasangan Bilangan" (luar: "Pasangan Bilangan: Metode dari Luar"); subjudul "Materi kurikulum" dan "Tiga metode luar"; sumber adegan "Materi: ..." atau "Metode luar: ...". Bahasa "bagian" dan "utuh", tanpa tanda tambah atau kurang. Tokoh: Malosi, Kira, Upe, Wei, Igil. Benda: kue (donat, bolu, kue mangkuk), bola, mobil-mobilan, kancing, kelereng, keping bingkai sepuluh, layang-layang. Hanya bilangan sampai sepuluh. Suara tanpa digit.

## Adegan video materi (17 adegan, 95 ketukan, 1245 kata, sekitar 10,4 menit)
1. Sapaan (daftar: Memisahkan satu bilangan, Menggabungkan dua bagian, Mencari pasangan bilangan)
2. Cerita di taman (bagian dan utuh diperkenalkan lewat Igil)
3. Lima kue Kira: dua donat dan tiga bolu dipisahkan ke dua piring, digabung lagi
4. Bagian dan utuh: ikatan bilangan lima, dua, tiga
5. Bola Upe dan Wei: tiga hijau dan empat merah digabung di keranjang, jadi tujuh
6. Ikatan bilangan tujuh (digabung dan dipisah)
7. Delapan mobil Upe: tiga dan lima, dua dan enam, satu dan tujuh, empat dan empat
8. Pasangan enam dengan kancing: satu dan lima, dua dan empat, tiga dan tiga
9. Pohon pasangan dua tingkat: kelereng Malosi, delapan jadi lima dan tiga, lima jadi dua dan tiga, tiga jadi dua dan satu
10. Pasangan lima dan tujuh
11. Karya bingkai sepuluh: enam keping kuning dan empat keping biru
12. Semua pasangan sepuluh (lima pasangan)
13. Sembilan kue mangkuk Malosi: enam dan tiga
14. Latihan 1 (menggabungkan dua dan lima layang-layang)
15. Latihan 2 (empat keping kuning, berapa keping biru: pasangan sepuluh)
16. Latihan 3 (mana yang bukan pasangan tujuh)
17. Penutup

## Adegan video metode luar (9 adegan, 38 ketukan, 463 kata, sekitar 3,9 menit)
Sapaan, pembuka (tiga tahap berurutan, Bruner), CPA Concrete (Benda Nyata Dulu) konsep dan terapan (enam kelereng ke dua mangkuk), CPA Pictorial (Gambar Representasi) konsep dan terapan (sepuluh bulatan dan ikatan sepuluh, enam, empat), CPA Abstract (Simbol Matematika) konsep dan terapan (menulis lima pasangan sepuluh dengan angka), ringkasan.

## Mind-Map dan Infografis susun tab (`D.json`, untuk `kelas1-bab1-ringkas.json` subBab.D)
- Peta: pusat "Bagaimana membagi lima kue?", 11 simpul; Tiga hal yang dipelajari (Memisahkan satu bilangan, Menggabungkan dua bagian, Mencari pasangan bilangan), Cara melakukannya (3), Hasil yang diharapkan (2).
- Tabel: "Pasangan dari bilangan utuh"; kolom Bagian, Bagian lain, Bendanya; 4 baris (Lima, Tujuh, Delapan, Sepuluh); sel pendek (satu angka atau satu kata).

## Uji
`node --no-warnings scripts/uji-story-k1b1d.mjs` (hitungan benda, pasangan yang menjumlah benar, warna keping, garis pemisah, ikatan, pohon pasangan), `node --no-warnings scripts/uji-susun-k1b1.mjs .tmp-k1b1as/D.json`.

## Catatan
- Data lama D-S1 sampai D-S5, Eksplorasi 1 sampai 4, dan slide abstrak dipakai sebagai urutan isi; bahasa "tanda operasi" pada metode Simbol Matematika diganti "angka dan tulisan" agar tidak membocorkan tambah atau kurang.
- Di data lama abstrak, simbol slide pertama ("5 jadi 2 dan 3", wordLarge "PASANGAN BILANGAN 5 & 6") tidak serasi; video memakai pasangan lima, enam, tujuh, delapan, sembilan, dan sepuluh secara berurutan.
- Mind-Map lama D (stepTitle "6." kosong, flowTo "5") janggal; peta baru dibuat dari nol.
