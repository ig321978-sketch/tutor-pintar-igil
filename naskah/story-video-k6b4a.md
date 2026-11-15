# Video Story Kelas 6 Bab 4 (Sub-Bab A Skala Peluang dan Sub-Bab B Membandingkan Peluang): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Berkas: `src/components/modul/story/` dan `video-k6b4a.tsx`. Uji: `node --no-warnings scripts/uji-story-k6b4a.mjs`.

## Mesin (`story/logika-story.ts` murni, `story/mesin-story.tsx` penggambar)
- Adegan adalah data: tiap ketukan = satu kalimat suara + daftar aksi gambar (`tambah`, `ubah`, `hapus`, `bersih`) yang dipicu pada KATA tertentu (`at: "payung"`, `"putih@2"`, atau nomor kata).
- Keadaan gambar dihitung murni dari (adegan, ketukan, kata): aksi ketukan lama selalu tuntas, aksi ketukan berjalan muncul sesuai kata yang sedang diucapkan. Waktu kata diperkirakan dari detik sejak ketukan mulai dan dikalibrasi dari ketukan yang baru selesai (tanpa LLM, tanpa jaringan).
- Primitif baru (teks, kotak, bulat, garis tergambar bertahap, panah, jalur SVG); tidak memakai `video-visual-kit` maupun `AdeganVisual`. Dipasang ke pemutar yang ada (`VideoCerita`, `DaftarVideoCerita`) lewat `keVideoSiap`.
- Gambar dirancang khusus bab (`k6b4a-gambar.ts`), tidak dipakai bab lain. Uji memastikan berkas `k6b4a-*` hanya mengimpor `logika-story` dan berkas k6b4a sendiri.

## Isi
- Video Materi (9 adegan, Buku Siswa hlm. 100–114): pagi Dhien dan berita bencana, tujuan dan peta konsep, mengingat data, poster lomba dan Eksplorasi 4.1, apa itu peluang, lima kejadian pada skala, rak buku dan teka-teki lemari, Latihan 4.1, percobaan roda putar. Tiap adegan mencatat halaman dan kutipan buku (diperiksa terhadap teks PDF bila ada).
- Video Metode Luar (10 adegan): Likelihood Spectrum Scale (aturan separuh) dan penerapannya, Impossible-Certain Continuum dan penerapannya, Qualitative Probability Language dan penerapannya, Experimental Relative Frequency dan data dadu buku, ringkasan.

## Catatan temuan
- Buku menaruh buku putih 3 dari 10 di "mungkin" (penilaian relatif antarwarna, hlm. 108). Simulasi Lab Skala (live) memakai aturan separuh dan menaruhnya di "kurang mungkin". Video metode luar menjelaskan perbedaan itu secara terbuka.
- Buku Panduan Guru: kategori skala boleh ditambah atau dikurangi; yang wajib hanya titik pasti dan titik tidak mungkin.
- Naskah video lama dihapus: `videos` pada `SUB_A64` dan `SUB_B64` (kini `[]`), `videos` dan `stories` pada `kelas6-bab4.json`, serta cabang `k6b4` di `video-visual-k6.tsx`. Bila generator `buat-k6-bab4.mjs` dijalankan lagi, isinya akan kembali dan harus dibuang lagi.

## Sub-Bab B (Membandingkan Peluang Kejadian), berkas `k6b4b-*`
- Video Materi (9 adegan, Buku Siswa hlm. 115–129 dan Buku Panduan Guru): jumlah peserta lomba, Eksplorasi 4.2 koin dan dadu, membandingkan peluang dalam permainan, dua contoh permainan kurang adil, Latihan 4.2, Eksplorasi 4.3 permen, kotak hadiah Toko Sukamaju, Latihan 4.3, refleksi dan Uji Kompetensi dan Penuhi Lingkaran dan pengayaan sandi.
- Video Metode Luar (9 adegan): Favorable-to-Total Ratio, Comparative Probability Ratio (total bersama paling kecil dan silang kali), Fair Game Equal Chance Principle (36 pasangan dua dadu), Relative Likelihood Decision, ringkasan. Contoh memakai angka buku: 1/12 lawan 1/35 (total 420), Latihan 4.3 (total 110).
- Uji: `node --no-warnings scripts/uji-story-k6b4b.mjs`.
- Catatan buku: kunci Buku Panduan Guru untuk soal tantangan Latihan 4.3 nomor 3 (semua "Kotak X") tampak tidak cocok dengan gambar (set pensil dan pensil dengan penghapus lebih besar peluangnya di Kotak Y); soal itu tidak dipakai di video. Alasan Buku Panduan Guru untuk Uji Kompetensi 4c ("dadu 2 memiliki total kemungkinan lebih banyak") terbalik; video memakai alasan yang benar (1 dari 4 lebih besar dari 1 dari 6).

## Revisi sesuai pola Kelas 4 Bab 1 sampai 6, Kelas 5 Bab 1 sampai 9, dan Kelas 6 Bab 1 sampai 3 (gaya guru, pemadatan, sapaan, Mind-Map dan Infografis susun tab)

- **Video bergaya guru.** Video materi dan metode luar sub-bab A dan B tidak lagi menyebut buku, halaman, Panduan Guru, soal nomor, kunci, atau rubrik. Judul tanpa "menurut Buku"; subjudul tepat "Materi kurikulum" dan "Empat metode luar"; sumber "Materi: ..." dan "Metode luar: ...". Eksplorasi menjadi Latihan bersama; latihan dan Uji Kompetensi disajikan sebagai Latihan n dan Uji n; pengayaan menjadi Tantangan; refleksi dan miskonsepsi menjadi Renungan dan Hati-hati. Kutipan buku pada adegan materi A dibuang. Teks ketukan tidak memuat kata terlarang uji-story.
- **Pemadatan.** Tidak diputar lagi (tetap di berkas materi): A `tujuan-peta`. Sub-bab B tidak punya adegan administratif. Tiap video dibuka adegan `sapaan`; daftar hal yang dipelajari sama persis dengan tiga anak cabang pertama Mind-Map.
- **Isi disesuaikan batas konsep.** Di A kata milik B (bandingkan, papan permainan) dibuang dan penutup A tidak menyebut Sub-Bab B. "rak buku" menjadi "rak komik" dan "buku bacaan" menjadi "majalah" karena kata buku dilarang di video.
- **Ukuran yang diputar** (kata per 2 per menit, sapaan termasuk): A materi 1.513 kata (12,6 menit, 9 adegan), luar 1.201 (10,0; 11 adegan); B materi 1.512 (12,6; 10 adegan), luar 1.235 (10,3; 10 adegan).
- **Mind-Map susun** (11 simpul, tiga cabang): A "Mungkinkah Dhien menang?", B "Peluang mana lebih besar?". **Infografis susun:** A "Pakaian di lemari Ayah" (3 baris x 3 kolom), B "Menang, semua, dan sisa" (4 baris x 3 kolom; sel "anak" dan "buah" dipendekkan agar margin teks sel di 405 px tidak kurang dari 5 px).
- **Suara tanpa digit.** Seluruh ucapan video (suara ketukan, sapaan, petunjuk peta dan tabel) memakai angka yang dieja; angka tetap tampil di gambar.
- **Uji:** uji-story-k6b4a (4.874), b (4.090), uji-statis (53), uji-lab (136.568), uji-susun-k6b4 (36), uji-susun-logika (4.621), uji-skenario-umum (8.433), uji-peta-konsep, uji-infografis-ringkas: 0 gagal; `tsc` dan eslint bersih.
- **Uji peramban di 405 px (Kelas 6 Bab 4 A dan B):** Mind-Map dan Infografis terisi penuh, scrollWidth 405, tidak ada sel meluap atau bermargin teks kurang dari 5 px (terkecil 5,7 px di B).
- **Catatan temuan:** Kunci Latihan 4.3 nomor 3 tidak cocok dengan gambar sehingga tidak dipakai; alasan kunci Uji Kompetensi 4c terbalik, video memakai alasan benar (satu dari empat lebih besar dari satu dari enam).
