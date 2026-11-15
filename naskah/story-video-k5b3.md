# Video Story Kelas 5 Bab 3 Bilangan Pecahan (Sub-Bab A, B, C): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 4 sampai 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b5.md`). Gambar dirancang khusus tiap sub-bab: `story/k5b3a-*` sampai `k5b3c-*`. Pembungkus: `video-k5b3a.tsx` sampai `video-k5b3c.tsx` (ekspor `VideoK5B3A/B/C({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b3a.mjs` (6.116 pemeriksaan, 0 gagal)
- `scripts/uji-story-k5b3b.mjs` (4.077, 0 gagal)
- `scripts/uji-story-k5b3c.mjs` (12.536, 0 gagal)
- `uji-statis-k5b3` (60) dan `uji-lab-k5b3` (1.723) disesuaikan dan lulus; `uji-skenario-umum` (8.433) tetap lulus.

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 3 ada di Buku Siswa hlm. 63-104 dan Panduan Guru hlm. 97-112. Pembagian: pembuka bab dan Sub-Bab A hlm. 63-75, B hlm. 76-90, C hlm. 91-104 (Refleksi dan Uji Kompetensi 1-10 hlm. 102-104 ikut C). Panduan Guru: A hlm. 97-105, B hlm. 105-107, C hlm. 107-112 (miskonsepsi, diferensiasi, penilaian, kunci, rubrik, remedial, pengayaan). Refleksi A tidak ada di Buku Siswa; butir Refleksi mengikuti Panduan Guru (B nomor 3, sisanya C).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 12 | 60 | 1490 | 12,4 menit |
| A metode luar | 10 | 40 | 1030 | 8,6 menit |
| B materi | 11 | 62 | 1458 | 12,2 menit |
| B metode luar | 10 | 46 | 1032 | 8,6 menit |
| C materi | 12 | 57 | 1536 | 12,8 menit |
| C metode luar | 10 | 41 | 921 | 7,7 menit |

Total 6 video, 65 adegan, 306 ketukan, 7.467 kata, sekitar 62,3 menit suara. Ketiga video materi di atas target 9-11 menit karena padat: A memuat pembuka bab, peta konsep, Mengingat Kembali, Eksplorasi 3.1A-B, tiga cara membandingkan, Ayo Berlatih, miskonsepsi dan diferensiasi; B memuat lima eksplorasi (3.2A-E), persiapan guru, miskonsepsi dan Refleksi 3; C adalah penutup bab (Eksplorasi 3.3A-C, masalah Yohana dan Komang, Uji Kompetensi 1-10, Refleksi, rubrik, remedial, pengayaan).

## Isi
- **A (membandingkan dan mengurutkan, termasuk pembuka bab):** Materi: pembuka bab, peta konsep, Ayo Menyimak, Mengingat Kembali, Eksplorasi 3.1A (lompatan Yohana) dan 3.1B (pita Nisa), tiga cara (garis bilangan, penyebut sama, pembilang sama), cara bilangan bulat, Ayo Berlatih 1a-d dan 2, penutup Panduan Guru. Metode luar: Number Line Fractions, Equivalent Fractions, Mixed to Improper, dan metode baru Benchmark Half Comparison.
- **B (penjumlahan):** Materi: Eksplorasi 3.2A-E (martabak, penghapus, pita, penyebut sama dan berbeda), miskonsepsi, diferensiasi, Refleksi 3. Metode luar: Like Denominators, Common Denominator via LCM, Area Model, dan metode baru Number Line Jumps.
- **C (pengurangan, penutup bab):** Materi: Eksplorasi 3.3A-C, masalah Yohana dan Komang, Ayo Berlatih, Uji Kompetensi 1-10, Refleksi, miskonsepsi, diferensiasi, rubrik, remedial, pengayaan. Metode luar: Like Denominator Subtract, Common Denominator Subtract, Residual Area Model, dan metode baru Add-Up Check.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k5b3a.md` sampai `c.md`.
- **A:** tidak ada kunci yang salah (kunci Ayo Berlatih hlm. 104 benar, termasuk urutan pita 2 1/4, 2 2/5, 2 1/2). Mengingat Kembali, tabel wingko 3.1A, dan titik-titik 3.1B tanpa kunci (video memakai hitungan mandiri: 2/4, KPK 4 dan 5 = 20, KPK 4, 2, 8 = 8, 22/8, 28/8). Panduan Guru hlm. 103 menulis "pembandingnya" (seharusnya pembilangnya) dan tabel 3.2 menyebut "menjumlahkan" padahal A hanya membandingkan; hlm. 99 menyebut Sub-Bab C diawali penjumlahan (seharusnya pengurangan). Cara bilangan bulat (hlm. 74) membiarkan 7/8 tanpa nilai bulat (video memakai 0) dan tidak bisa membandingkan pita Nisa karena bulatnya sama. Beberapa pecahan di gambar Ayo Berlatih tidak tertulis (dibaca dari gambar).
- **B:** Panduan Guru tidak punya kunci untuk B, semua isian dihitung mandiri dan cocok dengan angka cetak. Masalah Lukas (wingko 1/2 + 1/3) tidak pernah diselesaikan di buku (video menjawab 5/6 sebagai hitungan sendiri). Typo "Nia" (seharusnya Nisa) hlm. 76 dan "bilang pecahan" hlm. 90; Panduan Guru hlm. 107 menulis "bagian B ini" pada judul C.
- **C:** kunci Uji Kompetensi 1-10 benar semua. Soal 3.3B bertanya sisa apel Asep (2/8) tetapi langkah buku menghitung sisa apel Lukas (4/8); video menyajikan keduanya. Soal 3.3C bertanya "berapa meter lagi" padahal jaraknya dalam kilometer (video menjawab 3 1/3 km). Cara Asep hlm. 99 menulis "KPK dari 3 dan 6", seharusnya 2 dan 3 (hasil 1/6 tetap benar). Ada kalimat salinan dari penjumlahan di Buku Siswa dan Panduan Guru (Diferensiasi, Refleksi, "bagian B ini").
- Naskah video lama dihapus: `videos` pada `SUB_A53` sampai `SUB_C53` (kini `[]`), `videos` dan `stories` pada `kelas5-bab3.json`, dan cabang `k5b3` serta dua impor yang tak terpakai di `video-visual-k5.tsx` (tidak ada berkas `video-visual-k5b3.tsx`). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k5b3.mjs` disesuaikan; `uji-lab-k5b3.mjs` kini memeriksa angka buku 11/4 dan 3 1/2 di video A baru, bukan naskah lama.

## Audit visual
Seluruh 306 ketukan (6 video) dirender lewat rute pratinjau sementara (sudah dihapus; server dev port 3100 mode webpack karena Turbopack gagal memuat font Google, sudah dihentikan) dengan `Panggung` pada t=999, kotak batas semua teks terlihat diukur terhadap kanvas 300x208 (pecahan bertumpuk pembilang-penyebut diabaikan). Satu temuan: emoji martabak di B eks-a-martabak ketukan 2 menimpa teks Lukas dan nanas; diperbaiki (emoji dihapus pada ketukan itu). Tidak ada teks keluar kanvas atau bertumpuk setelah perbaikan.

## Verifikasi live
Deploy Vercel (commit 47fdadb) Ready. HTML `igiligil.xyz/ruang-belajar/mtk-5-bab3` diunduh, rantai chunk `_next/static` diikuti sampai tuntas (tiga putaran, 81 chunk); satu chunk memuat keempat nama metode baru (Benchmark Half Comparison, Number Line Jumps, Add-Up Check, dan seterusnya) beserta judul video baru, sedangkan id video lama (K5B3A-V1 dan seterusnya) dan teks pembuka video lama tidak ada. Judul lama yang masih tampak (Lompat Jauh Yohana, Penyebut Sama, Kurang Penyebut Sama/Beda) berasal dari bagian lain bab (skenario, peta, infografis, permainan, kutipan metode luar), bukan video.

## Revisi sesuai pola Kelas 4 Bab 1 sampai 6 dan Kelas 5 Bab 1 dan 2 (gaya guru, pemadatan, sapaan, Mind-Map dan Infografis susun tab)
- **Video bergaya guru.** Video yang diputar (materi dan metode luar, A sampai C) tidak lagi menyebut buku, halaman, soal nomor, kunci, rubrik, temuan, maupun Panduan Guru (suara, teks gambar, judul adegan, sumber, subjudul). Judul tanpa "menurut Buku"; subjudul tepat "Materi kurikulum" dan "Empat metode luar"; sumber "Materi: ..." dan "Metode luar: ..." paling panjang 46 huruf. Ayo Berlatih, Uji Kompetensi, dan Pengayaan disajikan sebagai Latihan, Uji, dan Tantangan; miskonsepsi, diferensiasi, dan refleksi menjadi Hati-hati, Tantangan, dan Renungan. Field `kutipan` dan komentar kode tidak diubah.
- **Pemadatan.** Tidak diputar lagi (tetap di berkas materi): A `pembuka-bab`, `peta-konsep`, `mengingat-kembali`; B `pembuka-b`, `persiapan-b`; C `pembuka-c`, `penutup` (rubrik, remedial, pengayaan, penutup bab).
- **Sapaan.** Tiap video dibuka adegan `sapaan` (luar-pembuka menjadi adegan kedua video luar). Daftar hal yang dipelajari sama persis dengan tiga anak cabang pertama Mind-Map.
- **Ukuran yang diputar** (0,5 detik per kata): A materi 1.234 kata (10,3 menit), luar 1.062 (8,8); B materi 1.308 (10,9), luar 1.044 (8,7); C materi 1.366 (11,4), luar 947 (7,9).
- **Mind-Map susun** (11 simpul, tiga cabang): A "Urutan lompatan Yohana", B "Wingko Lukas dan Komang", C "Sisa Kertas Yohana". **Infografis susun:** A "Pita Nisa dalam tiga bentuk" (3x3), B "Contoh menjumlahkan pecahan" (4x3), C "Mengurangkan pecahan" (4x3).
- **Uji:** uji-story-k5b3a (5.666), b (3.962), c (12.086), uji-statis (60), uji-lab (1.723), uji-susun-k5b3 (54), uji-susun-logika (4.621), uji-skenario-umum (8.433), uji-peta-konsep, uji-infografis-ringkas: 0 gagal; `tsc` bersih.
- **Audit peramban** (server dev 3100, 405 px, profil uji Kelas 5): Mind-Map A sampai C diselesaikan lewat skrip, warna cabang biru, oranye, ungu, tanpa label terpotong; Infografis A sampai C terisi penuh, tanpa halaman melebar. Dua perbaikan: sel "2 1/5 + 3 1/5" di B dan "5 2/3 − 2 1/3" di C menyentuh tepi kolom, diganti "1/5 + 3 1/5" (hasil 3 2/5 m) dan "5 2/3 − 1/3" (17/3 − 1/3, hasil 5 1/3 km).
- **Temuan buku yang disajikan benar tanpa menyinggung buku:** C pertanyaan apel menyebut sisa Asep padahal langkahnya menghitung sisa Lukas (video menampilkan keduanya), soal jarak menanyakan meter padahal datanya kilometer, KPK penyebut berbeda tertulis dari 3 dan 6 (video memakai 2 dan 3, hasil sama), diferensiasi dan refleksi Panduan Guru C adalah salinan B; B kalimat "Nia" (maksudnya Nisa) dan hasil wingko 5/6 adalah hitungan sendiri. Sub-bab A tidak punya kunci keliru.
