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
