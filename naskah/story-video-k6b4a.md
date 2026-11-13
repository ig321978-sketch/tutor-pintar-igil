# Video Story Kelas 6 Bab 4 Sub-Bab A (Skala Peluang): percontohan mesin Story baru

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
- Naskah video lama Sub-Bab A (`SUB_A64.videos`, `kelas6-bab4.json`) tidak lagi dipakai; dihapus bersama Sub-Bab B bila pemilik menyetujui gaya ini.
