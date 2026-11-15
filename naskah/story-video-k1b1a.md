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
