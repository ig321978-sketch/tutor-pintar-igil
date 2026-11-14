# Video Story Kelas 5 Bab 4 Keliling Bangun Datar (Sub-Bab A, B, C, D, E): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Kelas 5 Bab 5 sampai 9 serta Kelas 6 Bab 1 sampai 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k5b5.md`). Gambar dirancang khusus tiap sub-bab: `story/k5b4a-*` sampai `k5b4e-*`. Pembungkus: `video-k5b4a.tsx` sampai `video-k5b4e.tsx` (ekspor `VideoK5B4A/B/C/D/E({ speakGuru })` tidak berubah).

Uji (pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri dan geometri gambar, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k5b4a.mjs` (4.659 pemeriksaan, 0 gagal)
- `scripts/uji-story-k5b4b.mjs` (5.129, 0 gagal)
- `scripts/uji-story-k5b4c.mjs` (5.654, 0 gagal)
- `scripts/uji-story-k5b4d.mjs` (3.236, 0 gagal)
- `scripts/uji-story-k5b4e.mjs` (8.911, 0 gagal)
- `uji-statis-k5b4` (78) dan `uji-lab-k5b4` (3.226) disesuaikan dan lulus.

Halaman Buku Siswa = halaman PDF dikurangi 16; Buku Panduan Guru = PDF dikurangi 12. Bab 4 ada di Buku Siswa hlm. 105-130 dan Panduan Guru hlm. 113-176. Pembagian: pembuka bab dan Sub-Bab A hlm. 105-114, B hlm. 115-117, C hlm. 118-121, D hlm. 122-124, E hlm. 125-130 (Uji Kompetensi hlm. 130 ikut E). Panduan Guru: A hlm. 113-127, B hlm. 128-137, C hlm. 138-153, D hlm. 154-159, E hlm. 160-176 (miskonsepsi, penilaian, kunci, rubrik, remedial, pengayaan). Buku Siswa Bab 4 tidak punya halaman Refleksi tersendiri di A-D; butir Refleksi dibagi menurut isi Panduan Guru (A tanpa butir, B nomor 3-5, C nomor 6-12, D nomor 13-15, E nomor 16-20).

## Ukuran (perkiraan suara 0,5 detik per kata)
| Video | Adegan | Ketukan | Kata | Durasi |
|---|---|---|---|---|
| A materi | 11 | 54 | 1275 | 10,6 menit |
| A metode luar | 10 | 40 | 883 | 7,4 menit |
| B materi | 11 | 52 | 1173 | 9,8 menit |
| B metode luar | 10 | 41 | 889 | 7,4 menit |
| C materi | 11 | 56 | 1278 | 10,7 menit |
| C metode luar | 10 | 42 | 906 | 7,5 menit |
| D materi | 11 | 56 | 1173 | 9,8 menit |
| D metode luar | 10 | 41 | 952 | 7,9 menit |
| E materi | 13 | 70 | 1592 | 13,3 menit |
| E metode luar | 10 | 43 | 979 | 8,2 menit |

Total 10 video, 107 adegan, 495 ketukan, 11.100 kata, sekitar 92,6 menit suara. Video E materi di atas target karena isinya padat (penutup bab: Eksplorasi 4.5, dua miskonsepsi, diferensiasi, Uji Kompetensi 1-5, rubrik, remedial, pengayaan, Refleksi 16-20); video A materi sedikit di atas 10 menit karena memuat pembuka bab dan peta konsep.

## Isi
- **A (apakah keliling itu, termasuk pembuka bab):** Materi: pembuka bab, peta konsep, Benteng Baluwarti, pagar dan bingkai, Eksplorasi 4.1A (rute Nisa, Lukas, Yohana, Asep) dan 4.1B, mengukur dengan penggaris, kesimpulan keliling. Metode luar: Path Length, Fencing Context, Perimeter vs Area, dan metode baru Closed Loop Test.
- **B (keliling segitiga):** Materi: Eksplorasi 4.2A (sembarang 3-5-6 dan 7-4-5), 4.2B (sama sisi), 4.2C (sama kaki), rangkuman, Refleksi 3-5. Metode luar: Side Sum, Equilateral Shortcut, Measure Then Sum, dan metode baru String Unrolling.
- **C (keliling segi empat):** Materi: Eksplorasi 4.3A-E (tujuh bangun), ringkasan rumus, Refleksi 6-12. Metode luar: Rectangle Formula, Square Shortcut, Not Area Product, dan metode baru Straight Line Unrolling.
- **D (keliling segi banyak):** Materi: Eksplorasi 4.4 (segi lima dan segi enam), Ayo Merangkum, sisi tidak sama panjang, Refleksi 13-15. Metode luar: Regular n-gon, Irregular Side Sum, Table Pattern, dan metode baru Inverse Perimeter Division.
- **E (keliling bangun gabungan, penutup bab):** Materi: Eksplorasi 4.5 (Cara Asep dan Cara Komang), miskonsepsi, diferensiasi, Uji Kompetensi 1-5, rubrik, remedial, pengayaan, Refleksi 16-20. Metode luar: Outer Path Only, Bounding Rectangle, Missing Length, dan metode baru Closed Path Balance.

## Catatan temuan buku
Lengkap di catatan sesi `temuan-k5b4a.md` sampai `e.md`.
- **A:** tidak ada kunci yang salah. Gambar 4.4 dan 4.5 tertukar penomorannya antara Buku Siswa dan Panduan Guru; pertanyaan "cara mana yang paling kalian sukai" tanpa kunci (video memakai arahan Panduan Guru hlm. 124); rute Yohana hanya garis di tengah lapangan (ruas digambar sendiri sehingga 6 x 50 = 300 m); typo "Berpikur", "eisien", "deinisikan", "sembaran", "mengeliling".
- **B:** tidak ada kunci yang salah. Panduan Guru hlm. 129 menulis "Eksplorasi 4.3" untuk pemanasan padahal 4.2; langkah 2 Tabel 4.5 berbunyi "segitiga sembarang" padahal Eksplorasi 4.2B tentang sama sisi; nomor langkah "4." muncul dua kali di Tabel 4.4; segitiga pertama tanpa angka di Buku Siswa (3, 5, 6 hanya di Panduan Guru hlm. 130).
- **C:** kunci layang-layang di Panduan Guru hlm. 146 salah (tertulis 16 lalu 14, seharusnya 2+2+4+4 = 12; video memakai 12 dan menyebut kutipan keliru sebagai catatan guru); kotak kesimpulan trapesium dan segi empat sembarang di Buku Siswa hlm. 121 salah (tertulis 4 x panjang sisi, seharusnya jumlah keempat sisi); Panduan Guru hlm. 145 menyebut sisi sama layang-layang "berhadapan" (seharusnya bersebelahan); trapesium bersisi 2, 5, 3, 4 tidak ada secara geometri (hanya skema, keliling 14 tetap benar); salin-tempel "persegi panjang" di Tabel 4.8, typo "mengidentiikasi".
- **D:** tidak ada kunci yang salah. Panduan Guru hlm. 157 langkah 8 menyuruh menyimpulkan rumus segi lima padahal bangunnya segi enam; sisi segi enam di Buku Siswa hlm. 123 masih "... cm" (3 cm hanya di gambar Panduan Guru); segi delapan tanpa gambar atau ukuran; typo "bangun bangun".
- **E:** kunci pengayaan salah: soal bertanya 18 galon, kunci memakai 20 galon (100 m) dan menyimpulkan cukup; keliling 94 m benar, dengan 18 galon hanya 90 m sehingga tidak cukup (minimal 19 galon). Miskonsepsi 2: gambar menulis 20 cm di sisi atas tetapi hitungan memakai 18, dan teks menulis CE = 10 tetapi penjumlahan memakai 9 (82 cm hanya cocok dengan 18 dan 9). Video menyajikan angka kunci lalu catatan guru dengan hitungan mandiri. Kunci Uji Kompetensi 24, 20, 80, 72, 46 cm terverifikasi benar. Lain-lain: Panduan Guru menulis "Subbab D" untuk Refleksi 16-17, denah bernomor 4.5 di Panduan Guru tetapi 4.6 di Buku Siswa, typo "mengggunakan".
- Naskah video lama dihapus: `videos` pada `SUB_A54` sampai `SUB_E54` (kini `[]`), `videos` dan `stories` pada `kelas5-bab4.json`, cabang `k5b4` dan impor di `video-visual-k5.tsx`, serta berkas `video-visual-k5b4.tsx` (tidak dipakai tempat lain). Bila generator bab dijalankan lagi, isinya akan kembali dan harus dibuang lagi. `uji-statis-k5b4.mjs` disesuaikan; `uji-lab-k5b4.mjs` tidak perlu diubah.

## Audit visual
Seluruh 495 ketukan (10 video) dirender lewat rute pratinjau sementara (sudah dihapus) dengan `Panggung` pada t=999 dan kotak batas semua teks yang terlihat diukur terhadap kanvas 300x208. Temuan awal 23, semua diperbaiki kecuali 2: teks sumber terlalu panjang keluar kanvas (B luar pintas-terapan dan E luar br-terapan, dipersingkat), label "5 cm" di A luar fencing-terapan keluar kiri (digeser), emoji penggaris menimpa kartu di B eks-b-sama-sisi dan tombol Ya di B refleksi (disembunyikan atau dipindah), kartu "tetap 3 cm" menimpa selisih tabel di D luar4d-tabel (dihapus pada ketukan itu), emoji timbangan menimpa teks di E luar-cpb-terapan (digeser dan disembunyikan pada ketukan berikutnya). Dua sisanya sengaja dibiarkan setelah dilihat langsung: tanda tanya yang menyentuh emoji (A kesimpulan-keliling) dan emoji percakapan yang menyentuh teks 1,7 satuan (D akhir-d); keduanya terbaca jelas. Tidak ada teks keluar kanvas setelah perbaikan.
