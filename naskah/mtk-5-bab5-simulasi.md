# Matematika Kelas 5 · Bab 5 · Simulasi SMISCPA (pola hibrida)

Bab: Luas Daerah Bangun Datar (`mtk-5-bab5`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab5`). Komponen: `src/components/modul/SimulasiK5Bab5.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab5.ts`, teks misi di `misi-teks-k5b5.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang D.

Bab ini punya **empat sub-bab**: A (konsep luas daerah), B (luas daerah bangun datar, rumus), C (luas bangun gabungan), D (hubungan keliling dan luas). Dikerjakan dalam empat gelombang, satu sub-bab per gelombang. Gelombang A sampai C tidak didaftarkan di registri; gelombang D mendaftarkan bab dan menjadi pencapaian bab (skenario D menyentuh konsep A sampai D).

**Status: keempat gelombang selesai. Gelombang A (Sub-Bab A, Apakah Luas Daerah Itu?), B (Luas Daerah Bangun Datar), C (Luas Daerah Bangun Gabungan), dan D (Hubungan Keliling dan Luas Daerah, pencapaian bab). Bab didaftarkan di gelombang D.**

Berkas Materi bab ini tidak diubah (`SubBabK5B5A–D.tsx`, `naskah-k5b5.ts`, `data-k5b5.ts`, `paket-k5b5.ts`, dan lainnya). Pengeja suara memakai `ejaK5B5` (berkas baru `eja-k5b5.ts`) lewat prop `eja` mesin dan di lab. `ejaK5B4` tidak dipakai karena tidak mengeja ² dan ½.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `10 cm²` | sepuluh sentimeter persegi |
| `12 m²` | dua belas meter persegi |
| `16 cm`, `20 m` | enam belas sentimeter, dua puluh meter |
| `½ × 6 × 4 = 12` | setengah dikali enam dikali empat sama dengan dua belas |
| `(5 + 3) × 4 ÷ 2` | kurung buka lima ditambah tiga kurung tutup dikali empat dibagi dua |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999). Tokoh skenario dari naskah: Lukas dan Yohana (A), Komang (B), Yohana dan Komang (C), Bapak (D).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Petak (Tutup, Baris, Potong) | `SimulasiLabPetakK5B5.tsx` + `lab-petak-k5b5a.ts` | Mesin Petak | Ubin Alun-Alun (7 adegan) |
| B | Lab Rumus (Kali, Setengah, Trapesium) | `SimulasiLabRumusK5B5.tsx` + `lab-rumus-k5b5b.ts` | Mesin Rumus | Taman Bentuk-Bentuk (7 adegan) |
| C | Lab Gabungan (Uraikan, Silang, Tumpang) | `SimulasiLabGabunganK5B5.tsx` + `lab-gabungan-k5b5c.ts` | Mesin Gabungan | Denah Yohana dan Komang (8 adegan) |
| D | Lab Kawat (Kawat, Pilih, Urut) | `SimulasiLabKawatK5B5.tsx` + `lab-kawat-k5b5d.ts` | Mesin Kawat | Kawat Bapak (8 adegan, menyentuh A sampai D) |

Mesin: `mesin-data-k5b5.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b5.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-petak-k5b5.tsx` (A: kisi petak polos yang bisa diketuk, susunan baris dan kolom, bangun tangga dengan garis putus pembatas persegi panjang tujuan) dan `model-rumus-k5b5.tsx` (B: persegi panjang, persegi, jajargenjang dengan garis tinggi putus-putus, segitiga, belah ketupat, layang-layang dengan persegi panjang putus-putus, trapesium dengan trapesium kedua yang diputar menjadi jajargenjang) dan `model-gabungan-k5b5.tsx` (C: bagian bangun gabungan berjajar dengan garis emas bila sudah dihitung, denah L yang dipotong mendatar atau tegak, dua persegi panjang yang saling menumpuk dengan bagian yang menumpuk berwarna emas) dan `model-kawat-k5b5.tsx` (D: kerangka kawat persegi panjang dengan batang luas yang dibandingkan dengan luas terbesar). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab5-ringkas.json`. Uji: `scripts/uji-lab-k5b5.mjs`.

Metode luar buku yang dianyam. A: Unit Square Covering (Tutup: ketuk petak satuan sampai daerah tertutup rapat tanpa celah, lalu pilih luasnya dengan satuan cm² atau m²), Array Model (Baris: atur baris dan kolom, banyak petak sama dengan petak tiap baris dikali banyak baris), dan Area Conservation, cara Yohana (Potong: petak yang menonjol di luar garis putus dipindah ke lubang di dalamnya; luas tetap). B: Base × Height Unification dan Shear Principle (Kali: luas persegi panjang, persegi, dan jajargenjang adalah alas dikali tinggi; pada jajargenjang yang dipakai tinggi tegak lurus, bukan sisi miring), Dissection Method (Setengah: dua segitiga, belah ketupat, atau layang-layang yang sama menyusun persegi panjang, jadi luas satu bangun setengahnya), dan dua trapesium yang disusun menjadi jajargenjang beralas jumlah dua sisi sejajar (Trapesium). C: Composite Area Strategy dan Additive Decomposition (Uraikan: urai bangun menjadi bagian yang punya rumus, hitung luas tiap bagian, lalu jumlahkan; tidak ada bagian terlewat atau dobel), validasi silang cara Yohana dan cara Komang (Silang: denah L dipotong mendatar dan tegak, kedua cara menghasilkan luas yang sama), dan bagian yang menumpuk dihitung satu kali (Tumpang). D: Isoperimetric Relationship dan Fixed Perimeter Maximize Area (Kawat: kawat 60 cm tetap, panjang ditambah lebar 30 cm, luas berubah dan terbesar pada persegi; Pilih: pagar dan kawat memakai keliling, ubin dan pasir memakai luas; Urut: lima kerangka berkeliling sama diurutkan dari luas terkecil).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tutup: daerah 5 dan 2 (10 cm²); Tutup: daerah 3 dan 3 (9 m²); Baris: 4 baris 2 kolom (8 petak); Baris: 6 baris 3 kolom (18 petak); Potong: tangga tiga tingkat menjadi 2 baris 3 kolom (luas tetap 6) | Tutup: daerah 4 dan 2 (8 cm²); Baris: 5 baris 4 kolom (20 petak); Potong: tangga empat tingkat menjadi 2 baris 5 kolom (luas tetap 10) |
| B | Kali: persegi panjang 5 dan 2 (10 cm²); Kali: persegi sisi 4 (16 cm²); Kali: jajargenjang alas 8, pilih tinggi 3 bukan sisi miring 5 (24 cm²); Setengah: segitiga alas 6 tinggi 4 (12 cm²); Trapesium: sisi sejajar 5 dan 3, tinggi 4 (16 cm²) | Setengah: belah ketupat diagonal 6 dan 4 (12 cm²); Setengah: layang-layang diagonal 8 dan 6 (24 cm²); Kali: jajargenjang alas 6, tinggi 4, sisi miring 5 (24 cm²) |
| C | Uraikan: denah rumah 12 + 8 = 20; Uraikan: papan nama jajargenjang 24 + segitiga 12 = 36; Uraikan: taman tiga bagian 15 + 10 + 5 = 30; Silang: denah L 5 kali 4 takik 2 kali 2, cara 1 dan cara 2 sama dengan 16; Tumpang: dua persegi panjang 4 kali 3 menumpuk, bagian menumpuk 6, gabungan 18 | Uraikan: ruang tamu 16 + 9 = 25; Uraikan: pintu gerbang 20 + 8 = 28; Silang: denah L 6 kali 4 takik 2 kali 2 (20) |
| D | Kawat: kerangka 20 dan 10 (200 cm²); Kawat: kerangka 25 dan 5 (125 cm², lebih kecil walau keliling sama); Kawat: persegi 15 dan 15 (225 cm², terbesar); Pilih: pagar kebun dan kerangka kawat memakai keliling, ubin lantai dan pasir lapangan memakai luas (keempatnya satu misi); Urut: lima kerangka dari luas terkecil (56, 125, 176, 216, 225) | Kawat: kerangka 18 dan 12 (216); Kawat: kerangka 28 dan 2 (56); Kawat: kerangka 22 dan 8 (176) |

Near-miss tidak memenuhi misi A: menutup dengan celah (tiap petak yang dilewatkan diuji), menutup tetapi belum diperiksa, memilih luas sebelum rapat, membuka petak setelah diperiksa, memilih jumlah baris dan kolom atau jumlah tepi sebagai luas, susunan Baris yang tidak sesuai tugas (termasuk tertukar) walau banyak petaknya benar, baris dikali baris, mengambil petak yang sudah pas, menaruh di luar garis putus atau di tempat terisi, dan pemindahan yang belum selesai.

Near-miss tidak memenuhi misi B: luas dipilih sebelum memilih tinggi pada jajargenjang, sisi miring dipilih sebagai tinggi, sisi miring dikali alas (40), alas ditambah tinggi, Setengah tanpa menggandakan dulu, lupa setengah (luas persegi panjang utuh), jumlah dua ukuran, Trapesium tanpa menyusun jajargenjang, tanpa memilih alas, alas satu sisi sejajar saja (memilih alas yang salah mencabut alas yang benar), jajargenjang utuh tanpa setengah, dan jumlah semua ukuran. Trapesium 7 dan 5 tinggi 3 hanya latihan, bukan misi.

Near-miss tidak memenuhi misi C: total sebelum semua bagian dihitung, satu bagian terlewat (tiap bagian diuji), total yang kurang (bagian terlewat) atau kelebihan (bagian dobel), luas bagian dengan rumus yang salah, Silang dengan hanya satu cara, kedua cara tanpa memeriksa sama, memilih beda, cara yang diganti salah mencabut tanda, Tumpang tanpa menghitung bagian menumpuk, gabungan dua luas dijumlah saja, gabungan hanya satu bangun, dan bagian menumpuk yang salah. Pasangan Tumpang 5 kali 2 dan 3 kali 2 hanya latihan.

Near-miss tidak memenuhi misi D: mengatur kerangka tanpa menekan Catat (tiap bentuk harus dicatat), mencatat kerangka lain, kerangka 10 dan 20 dihitung sama dengan 20 dan 10 (dicatat dengan sisi yang lebih panjang), hanya tiga dari empat kebutuhan Pilih, jawaban keliling dan luas yang tertukar, urutan Urut yang belum lengkap atau terbalik (memilih kerangka yang bukan terkecil ditolak tanpa mengubah urutan).

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Petak (A) | Tutup → Baris → Satuan → Potong | Alun-Alun (tutup 5 petak tiap baris, 2 baris = 10; 3 baris 4 kolom = 12; 6 dan 2 ubin = 12 m²; kolom 2, 3, 1 jadi 2 baris 3 kolom, luas 6), Ubin Lukas (3 dan 3 = 9; 2 baris 5 kolom = 10; 4 dan 3 ubin = 12 m²; kolom 4, 2, 3 jadi 3 baris 3 kolom, luas 9), Cara Yohana (4 dan 2 = 8; 5 baris 3 kolom = 15; 3 dan 2 ubin = 6 cm²; kolom 1, 2, 3, 4 jadi 2 baris 5 kolom, luas 10) |
| Mesin Rumus (B) | Dasar → Setengah → Trapesium → Tinggi | Petak Kebun (persegi panjang 5 dan 2 = 10; segitiga 6 dan 4 = 12; trapesium 5, 3, tinggi 4 = 16; jajargenjang alas 6 tinggi 4 sisi miring 5 = 24), Papan Bendera (8 dan 3 = 24; belah ketupat diagonal 10 dan 4 = 20; trapesium 6, 4, tinggi 3 = 15; jajargenjang alas 8 tinggi 3 sisi miring 5 = 24), Kolam Hias (persegi sisi 6 = 36; layang-layang diagonal 8 dan 6 = 24; trapesium 7, 5, tinggi 2 = 12; jajargenjang alas 9 tinggi 2 sisi miring 4 = 18) |
| Mesin Kawat (D) | Pasangan → Beda → Terbesar → Pilih | Kerangka Panjang (20 dan 10: lebar 10, luas 200; persegi 15 kali 15 luas 225 lebih besar; memagari kebun memakai keliling), Kerangka Pipih (25 dan 5: lebar 5, luas 125; menutup lantai dengan ubin memakai luas), Kerangka Sedang (18 dan 12: lebar 12, luas 216; membuat kerangka dari kawat memakai keliling) |
| Mesin Gabungan (C) | Bagian → Rumus → Jumlah → Silang | Denah Rumah (persegi panjang 4 dan 3 dan 4 dan 2: 12 dan 8, jumlah 20; denah L 5 kali 4 takik 2 kali 2 = 16), Papan Nama (jajargenjang 6 dan 4 = 24, segitiga 6 dan 4 = 12, jumlah 36; denah L 6 kali 4 takik 2 kali 2 = 20), Taman Tiga Bagian (persegi panjang 5 dan 3 = 15, persegi panjang 5 dan 2 = 10, segitiga 5 dan 2 = 5, jumlah 30; denah L 7 kali 4 takik 3 kali 2 = 22) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh Mesin Rumus dihitung: jumlah ukuran (Dasar); persegi panjang utuh tanpa setengah dan jumlah dua ukuran (Setengah); jajargenjang utuh tanpa setengah dan jumlah semua ukuran (Trapesium); sisi miring dikali alas dan alas ditambah tinggi (Tinggi). Pengecoh Mesin Kawat dihitung: enam puluh dikurangi panjang dan tiga puluh (Pasangan); keliling 60 dan 30 dipakai sebagai luas (Beda); kerangka lain dan sama besar karena kelilingnya sama (Terbesar); yang lain dan banyak sudut (Pilih). Pengecoh Mesin Gabungan dihitung: sesuai jenis bangun, yaitu jumlah dua ukuran, lupa setengah pada segitiga, jajargenjang dibagi dua, dan dua kali jumlah ukuran (Bagian dan Rumus); satu bagian terlewat dan satu bagian dihitung dua kali (Jumlah); persegi panjang besar tanpa takik dan satu bagian saja (Silang). Pengecoh Mesin Petak dihitung: petak satu baris ditambah satu kolom dan jumlah tepi (Tutup); baris ditambah kolom dan baris dikali baris (Baris); satuan panjang dan jumlah panjang dengan satuan persegi (Satuan); luas berkurang atau bertambah sebanyak petak yang dipindah (Potong). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Kawat Bapak (D) | 8 | Narasi Bapak; ketuk 12 stik lantai 4 dan 3 (konsep A); persegi panjang 8 dan 3 = 24 dan segitiga 6 dan 4 = 12 (konsep B); 12 + 8 = 20 dan dua 12 menumpuk 6 = 18 (konsep C); syarat kawat panjang ditambah lebar 30 (pengecoh: dikali 60, dikurangi 30); 20 kali 10 = 200 dan 25 kali 5 = 125 (pengecoh 60, 30, 150); persegi 15 kali 15 = 225 paling besar (pengecoh 125 dan 200); penutup. Batas jawaban skenario D di `uji-skenario-umum.mjs` 300 karena luas 200 dan 225 |
| Denah Yohana dan Komang (C) | 8 | Narasi Yohana; dua cara membagi denah yang sama memberi luas sama (pengecoh: berbeda, tergantung orang); denah 12 + 8 = 20 m² dan papan nama 24 + 12 = 36 m²; denah L cara pertama 10 + 6 = 16 dan 5 kali 4 dikurangi takik 2 kali 2 = 16 m²; ketuk 25 stik ruang tamu 16 + 9; isi 16 stik denah L; dua persegi panjang 12 m² menumpuk 6 m² sama dengan 18 m² (pengecoh 24 dan 12); penutup |
| Taman Bentuk-Bentuk (B) | 7 | Narasi Komang; tinggi jajargenjang alas 8 m adalah garis tegak lurus 3 m, bukan sisi miring 5 m (pengecoh: sisi miring, alas lagi); persegi sisi 4 m = 16 m² dan jajargenjang 8 dan 3 = 24 m² (pengecoh 40 dan 11); ketuk 12 stik untuk segitiga 6 dan 4 (½ × 6 × 4); isi 16 stik untuk trapesium 5 dan 3 tinggi 4; jawaban 24 m² untuk segitiga lupa setengah (pengecoh: ditambah tinggi, dikali sisi miring); penutup |
| Ubin Alun-Alun (A) | 7 | Narasi Lukas; arti luas daerah (pengecoh: panjang tepi dan banyak sudut); kamar 5 m dan 2 m = 10 ubin dan persegi sisi 3 m = 9 ubin; ketuk 12 stik untuk lantai pos jaga 4 m dan 3 m; isi 18 stik untuk serambi 6 m dan 3 m; cara Yohana, luas tetap enam petak (pengecoh: bertambah atau berkurang); penutup |

## Kejujuran konsep

- Tutup: luas baru tercatat bila semua petak diketuk, tutupan diperiksa, lalu luas yang benar dipilih; membuka satu petak membatalkan pemeriksaan. Luas dihitung di kode dengan perkalian, diuji dengan mencacah petak satu per satu dan dengan penjumlahan berulang. Data dipilih agar jumlah panjang tepi dan jumlah baris dan kolom tidak pernah sama dengan luas.
- Baris: banyak petak hanya diterima bila susunan sama persis dengan tugas (baris dan kolom tidak boleh tertukar), dibatasi delapan baris dan delapan kolom.
- Potong: pemindahan hanya satu petak sekali (ambil petak yang menonjol, taruh di lubang), luas selalu tetap (diuji pada tiap langkah dan pada fuzz), selesai bila tidak ada petak yang menonjol. Banyak petak menonjol dan lubang dihitung mandiri dengan himpunan petak kisi yang dibangun dari bawah.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa setengah dan lambang ½, segitiga, jajargenjang, trapesium, belah ketupat, layang-layang, alas, tinggi, diagonal, rumus, gabungan, uraikan, tumpang tindih, silang, kawat, dan keliling. Perkalian baris dikali kolom boleh karena itu Array Model.
- Kali: pada jajargenjang, luas baru diterima setelah tinggi yang tegak lurus dipilih; memilih sisi miring sebagai tinggi menolak luas yang benar. Pada persegi panjang dan persegi, tinggi sudah diketahui.
- Setengah: luas satu bangun hanya diterima setelah dua bangun disusun menjadi persegi panjang; hasil kali selalu genap (diuji), jadi tanpa pecahan. Trapesium: urutan susun, pilih alas (jumlah dua sisi sejajar), lalu luas.
- Luas B dihitung mandiri dengan rumus tali sepatu dari titik sudut (bukan alas kali tinggi atau setengahnya seperti di kode), dan data dipilih agar semua pengecoh salah.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa gabungan, uraikan, tumpang tindih, silang, kawat, dan keliling.
- Uraikan: total hanya diterima setelah luas semua bagian dipilih benar (satu bagian terlewat atau diganti salah mencabut tandanya); pengecoh total dihitung dari bagian terkecil, terlewat atau dobel. Silang: kedua cara harus benar sebelum anak boleh menyatakan hasilnya sama, dan memilih beda ditolak. Tumpang: bagian menumpuk dihitung dulu, lalu luas gabungan.
- Luas C dihitung mandiri dengan cacah petak dan himpunan petak kisi (denah L, dua cara memotong, irisan dua persegi panjang) dan titik sudut (jajargenjang, segitiga), bukan dengan rumus dan pengurangan di kode. Dua cara Silang dipilih agar bagiannya berbeda tetapi jumlahnya sama.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab C (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa kawat dan keliling.
- Kawat: panjang 1 sampai 29, lebar selalu 30 dikurangi panjang, keliling selalu 60 (diuji dengan mencacah sisi petak di tepi untuk semua panjang), luas dihitung mandiri dengan cacah petak dan penjumlahan berulang, tidak pernah sama dengan 60 atau 30. Kerangka p kali l dan l kali p dicatat sama (sisi yang lebih panjang). Tiap bentuk baru tercatat setelah anak menekan Catat bentuk ini.
- Urut: urutan jawaban dari pengurutan luas hasil cacah petak; urutan di layar sengaja diacak; memilih kerangka yang bukan terkecil ditolak. Sub-Bab D menyentuh semua konsep sebelumnya, jadi tidak ada uji bocor ke D; skenario D diuji menyentuh konsep A (ubin), B (rumus), C (menumpuk), dan D (kawat dan keliling).
- Fuzz 20.000 aksi: batas terjaga, luas tetap, riwayat tidak dicabut dan hanya bila tercapai, semua pesan bisa dieja. Uji mutasi pada logika lab dan mesin: satu angka diubah, uji gagal.
