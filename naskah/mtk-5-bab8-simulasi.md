# Matematika Kelas 5 · Bab 8 · Simulasi SMISCPA (pola hibrida)

Bab: Data (Tabel Frekuensi, Piktogram, dan Diagram Batang) (`mtk-5-bab8`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab8`). Komponen: `src/components/modul/SimulasiK5Bab8.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab8.ts`, teks misi di `misi-teks-k5b8.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir).

Bab ini punya **tiga sub-bab**: A (mengumpulkan data), B (piktogram), dan C (diagram batang). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A (Sub-Bab A, Mengumpulkan Data) selesai. B dan C menyusul. Bab belum didaftarkan di registri.**

Berkas Materi bab ini tidak diubah (`SubBabK5B8A–C.tsx`, `naskah-k5b8.ts`, `data-k5b8.ts`, `paket-k5b8.ts`, dan lainnya). Pengeja suara memakai `ejaK5B8` (berkas baru `eja-k5b8.ts`) lewat prop `eja` mesin dan di lab. Pengeja ini mengeja tanda tambah, kurang, kali, bagi, sama dengan, lebih besar, lebih kecil, dan kurung.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `7 + 5 + 3 + 2 = 17` | tujuh ditambah lima ditambah tiga ditambah dua sama dengan tujuh belas |
| `6 − 2 = 4` | enam dikurangi dua sama dengan empat |
| `5 + 3 > 7` | lima ditambah tiga lebih besar dari tujuh |
| `ada 14 jawaban.` | ada empat belas jawaban. |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 360 dan beberapa bilangan besar). Tokoh skenario A: Anggi, penjual donat (tokoh dari Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Data (Turus, Tabel, Mode) | `SimulasiLabDataK5B8.tsx` + `lab-data-k5b8a.ts` | Mesin Data | Anggi dan Donat (8 adegan) |

Mesin: `mesin-data-k5b8.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b8.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-data-k5b8.tsx` (turus satu kategori: empat garis tegak biru dan satu garis miring emas per kelompok lima, garis sisa berdiri sendiri). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab8-ringkas.json`. Uji: `scripts/uji-lab-k5b8.mjs`.

Metode luar buku yang dianyam. A: Data Collection Cycle (tanya, catat, ringkas, baca makna; muncul di skenario dan misi), Tally Mark Protocol (Turus: tiap jawaban mentah dicatat satu garis pada kategori yang tepat, lima garis menjadi satu kelompok), Frequency Table Construction (Tabel: frekuensi diisi dari turus, jumlah frekuensi harus sama dengan banyak data, rekap yang salah ditemukan lewat selisih jumlahnya), dan Data-Informed Decision (Mode: frekuensi terbesar disebut mode, lalu keputusan dipilih dengan alasan dari tabel, bukan menebak).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Turus: data sayuran favorit sampai ada kelompok lima penuh; Turus: semua jawaban penjualan donat Anggi dicatat sampai habis; Tabel: frekuensi donat Anggi benar dan jumlahnya sama dengan banyak data; Tabel: kategori yang salah pada rekap teman ditunjuk; Mode: rasa donat tertinggi dan keputusan yang punya alasan | Turus: keenam data dicatat sampai habis; Tabel: keenam tabel benar; Mode: mode dan keputusan keenam data benar, termasuk dua data dengan dua kategori sama tinggi |

Near-miss tidak memenuhi misi: mencatat kategori yang salah (tidak mengubah apa pun), mencatat kurang satu jawaban, mencatat data lain saja, tabel donat dengan satu frekuensi kurang atau lebih satu, dua kategori tertukar (jumlah benar tetapi isinya salah), menunjuk kategori salah rekap sebelum tabel benar, menunjuk kategori yang justru benar, mode tanpa keputusan, keputusan salah (termasuk menebak), dan mode pada data lain.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Data (A) | Turus → Frekuensi → Tabel → Keputusan | Donat Anggi (cokelat 7, keju 5, stroberi 3, kacang 2, banyak data 17; turus 7 = 1 kelompok lima dan 2 garis; keju muncul 3 kali dalam daftar sepuluh jawaban; frekuensi kacang yang hilang 2; keputusan cokelat), Sayuran Favorit (bayam 8, wortel 6, kangkung 4, sawi 2, banyak data 20; turus 8 = 1 kelompok lima dan 3 garis; wortel muncul 4 kali; frekuensi kangkung yang hilang 4; keputusan bayam), Cara Berangkat (jalan kaki 9, sepeda 5, angkot 4, motor 2, banyak data 20; turus 9 = 1 kelompok lima dan 4 garis; jalan kaki muncul 5 kali; frekuensi sepeda yang hilang 5; keputusan jalan kaki) |

Pengecoh dihitung dari kesalahan khas: menukar banyak kelompok dengan banyak garis dan kelompok lebih satu (Turus); hitungan lebih atau kurang satu dan banyak data (Frekuensi); jumlah tiga kategori dan banyak data (Tabel); kategori terendah dan peringkat kedua (Keputusan). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Anggi dan Donat (A) | 8 | Narasi Anggi dan siklus kumpulkan data; arti data (kumpulan fakta; pengecoh: tebakan, dan hanya angka); turus dikelompokkan lima supaya mudah dihitung lima-lima dan 8 = 5 + 3 (pengecoh 2 dan 4); ketuk 5 stik untuk pembeli donat keju; isi 2 stik untuk frekuensi donat kacang; tabel donat dengan jumlah 17 (pengecoh 15 dan 19) dan mode cokelat; keputusan menambah bahan cokelat (pengecoh: kacang, dan menebak); penutup. |

## Kejujuran konsep

- Turus: tiap jawaban mentah harus dicatat pada kategori yang tepat, urutan tetap. Kategori salah ditolak dan tidak mengubah turus. Hasil turus keenam data dihitung mandiri dari jawaban mentah dengan Map, dan teks turus (`||||/` per kelompok) dihitung balik; kelompok lima tercatat tepat saat turus satu kategori mencapai lima.
- Tabel: tabel dianggap benar hanya bila setiap frekuensi sama dengan hitungan mandiri; satu kategori kurang atau lebih satu, dan dua kategori tertukar (jumlah benar), ditolak dengan pesan jumlah. Rekap teman hanya bisa diperiksa setelah tabel benar; kategori yang salah ditunjuk lewat selisih jumlah rekap dengan banyak data.
- Mode: mode dihitung mandiri lewat urutan menurun (bukan perbandingan maksimum seperti di kode); dua data (cara berangkat dan olahraga) punya dua kategori sama tinggi, dan menunjuk salah satunya saja ditolak. Keputusan baru bisa dipilih setelah mode benar; pilihan menebak selalu salah.
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa piktogram, kunci atau legenda, simbol, diagram, batang, sumbu, dan skala.
- Fuzz 20.000 aksi Lab Data: batas terjaga (turus dan tally selalu cocok dengan jawaban yang sudah dicatat), riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri memeriksa tiap id baru dari jawaban benar bersyarat), semua pesan bisa dieja. Uji mutasi (skrip sementara di luar repositori): 42 dari 46 mutan terbunuh pada logika lab, mesin, skenario, misi, dan pengeja; empat mutan yang tersisa setara (`m.includes(k)` sama dengan `k === m[0]` bila tidak seri; `lastIndexOf` sama dengan `indexOf` untuk terendah karena tak ada data dengan dua terendah; penggantian tally dengan ekspresi identik; dan rotasi letak kunci mesin yang hanya mengubah urutan tampil).
- Emoji: paling baru Emoji 12 (diuji pada semua berkas simulasi dan data ringkas Bab 8).
- Pendaftaran: belum. `registri-simulasi.ts` belum memuat `mtk-5-bab8`; itu dikerjakan di gelombang C.
