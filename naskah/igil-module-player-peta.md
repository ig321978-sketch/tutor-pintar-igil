# Peta `IgilModulePlayer.tsx`

Jangan baca seluruh file (±4000 baris) kecuali sedang menyentuh bagian yang relevan.
Registri simulasi ada di `src/components/modul/registri-simulasi.ts` — bab baru didaftarkan di sana, bukan di pemutar.

| Rentang (kira-kira) | Isi |
|---|---|
| 1–120 | Import (data bab, komponen sub-bab, suara, gaya) |
| 296–400 | Tipe tab, kode sub-bab, daftar bab yang bisa diputar |
| 428–560 | `MATERI_BAB` (teks/materi Kelas 1–2 lama) |
| 577–890 | `MODUL_SUBBAB` (paket Kelas 3–6, lazy) |
| 895–973 | Gaya tombol tab |
| 975–994 | `TAHAP_SILABUS` / `TAHAP_SILABUS_SMISCPA` (daftar tahap di Silabus) |
| — | Registri: lihat `registri-simulasi.ts` (`SIMULASI_MATERI`, `RINGKAS_BAB`, `SIMULASI_BAB`, `TAHAP_SIMULASI`) |
| 1052–1488 | State, efek, handler progres / suara / kunci tahap |
| 1489–1576 | Kerangka halaman utama modul |
| 1577–1639 | Banner judul |
| 1640–1694 | Tombol tab utama (Silabus / Materi / Simulasi / Latihan / Ujian) |
| 1695–2056 | Halaman Silabus |
| 2057–2140 | Halaman Materi (tab sub-bab) |
| 2141–2263 | Story |
| 2264–2328 | Mind-Map (`PetaKonsep` bila ada `RINGKAS_BAB`) |
| 2329–2528 | Infografis (`InfografisRingkas` bila ada ringkas) |
| 2529–2564 | Simulasi di dalam Materi (SMISCPA) |
| 2565–3016 | Concrete |
| 3017–3488 | Pictorial / Picture |
| 3489–3789 | Abstract |
| 3790–4029 | Tab Simulasi (bab belum migrasi) |
| 4030–akhir | Latihan & Ujian |

Saat menambah bab SMISCPA: tulis komponen `SimulasiBabN` / `SimulasiK2BabN`, JSON `kelas*-bab*-ringkas.json`, daftarkan di `registri-simulasi.ts`. Jangan menambah entri di `IgilModulePlayer` kecuali mengubah kerangka UI bersama.

Migrasi Kelas 2: Bab 1–8 sudah di `SIMULASI_MATERI` + `RINGKAS_BAB` (`SIMULASI_BAB` kosong). Seluruh Kelas 2 sudah memakai pola hibrida.

Migrasi Kelas 3: Bab 1 sampai Bab 5 sudah (`SimulasiK3Bab1` sampai `SimulasiK3Bab5`, dimuat malas lewat `next/dynamic` di registri).

Migrasi Kelas 4: Bab 1 sudah (`SimulasiK4Bab1`, sembilan sub-bab A sampai I, dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 4: Bab 2 sudah (`SimulasiK4Bab2`, lima sub-bab A sampai E: pecahan pembilang satu, penyebut sama, senilai, desimal, dan persen; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 4: Bab 3 sudah (`SimulasiK4Bab3`, dua sub-bab A dan B: pola gambar dan pola bilangan; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 4: Bab 4 sudah (`SimulasiK4Bab4`, dua sub-bab A dan B: pengukuran luas dan pengukuran volume; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 4: Bab 5 sudah (`SimulasiK4Bab5`, dua sub-bab A dan B: ciri-ciri bangun datar serta komposisi dan dekomposisi; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 4: Bab 6 sudah (`SimulasiK4Bab6`, dua sub-bab A dan B: piktogram serta diagram batang; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 1 sudah (`SimulasiK5Bab1`, empat sub-bab A sampai D: nilai tempat, membandingkan dan mengurutkan, komposisi dan dekomposisi, serta operasi hitung; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 2 sudah (`SimulasiK5Bab2`, lima sub-bab A sampai E: kelipatan, kelipatan persekutuan dan KPK, faktor, faktor persekutuan dan FPB, serta KPK dan FPB dengan faktor prima; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 3 sudah (`SimulasiK5Bab3`, tiga sub-bab A sampai C: membandingkan dan mengurutkan pecahan, penjumlahan pecahan, dan pengurangan pecahan; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 4 sudah (`SimulasiK5Bab4`, lima sub-bab A sampai E: konsep keliling, keliling segitiga, keliling segi empat, keliling segi banyak, dan keliling bangun gabungan; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 5 sudah (`SimulasiK5Bab5`, empat sub-bab A sampai D: konsep luas daerah, luas daerah bangun datar dengan rumus, luas bangun gabungan, dan hubungan keliling dan luas; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 6 sudah (`SimulasiK5Bab6`, empat sub-bab A sampai D: sudut siku-siku, pengertian dan jenis sudut, mengukur sudut dengan busur derajat, dan melukis sudut; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 7 sudah (`SimulasiK5Bab7`, dua sub-bab A dan B: membandingkan ciri segitiga, dan membandingkan ciri segi empat; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 8 sudah (`SimulasiK5Bab8`, tiga sub-bab A, B, dan C: mengumpulkan data, piktogram, dan diagram batang; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 5: Bab 9 sudah (`SimulasiK5Bab9`, tiga sub-bab A, B, dan C: membaca, menulis, dan nilai tempat, membandingkan dan mengurutkan, serta komposisi dan dekomposisi bilangan sampai 1.000.000; dimuat malas lewat `next/dynamic` di registri).
Migrasi Kelas 6: Bab 1 sudah (`SimulasiK6Bab1`, tiga sub-bab A, B, dan C: perkalian pecahan, pembagian pecahan, dan bilangan desimal; dimuat malas lewat `next/dynamic` di registri).
