# Matematika Kelas 5 · Bab 5 · Simulasi SMISCPA (pola hibrida)

Bab: Luas Daerah Bangun Datar (`mtk-5-bab5`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab5`). Komponen: `src/components/modul/SimulasiK5Bab5.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab5.ts`, teks misi di `misi-teks-k5b5.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **empat sub-bab**: A (konsep luas daerah), B (luas daerah bangun datar, rumus), C (luas bangun gabungan), D (hubungan keliling dan luas). Dikerjakan dalam empat gelombang, satu sub-bab per gelombang. Gelombang A sampai C tidak didaftarkan di registri; gelombang D mendaftarkan bab dan menjadi pencapaian bab (skenario D menyentuh konsep A sampai D).

**Status: Gelombang A (Sub-Bab A, Apakah Luas Daerah Itu?) selesai. B sampai D belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B5A–D.tsx`, `naskah-k5b5.ts`, `data-k5b5.ts`, `paket-k5b5.ts`, dan lainnya). Pengeja suara memakai `ejaK5B5` (berkas baru `eja-k5b5.ts`) lewat prop `eja` mesin dan di lab. `ejaK5B4` tidak dipakai karena tidak mengeja ² dan ½.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `10 cm²` | sepuluh sentimeter persegi |
| `12 m²` | dua belas meter persegi |
| `16 cm`, `20 m` | enam belas sentimeter, dua puluh meter |
| `½ × 6 × 4 = 12` | setengah dikali enam dikali empat sama dengan dua belas |
| `(5 + 3) × 4 ÷ 2` | kurung buka lima ditambah tiga kurung tutup dikali empat dibagi dua |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999). Tokoh skenario dari naskah: Lukas dan Yohana (A).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Petak (Tutup, Baris, Potong) | `SimulasiLabPetakK5B5.tsx` + `lab-petak-k5b5a.ts` | Mesin Petak | Ubin Alun-Alun (7 adegan) |

Mesin: `mesin-data-k5b5.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b5.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-petak-k5b5.tsx` (kisi petak polos yang bisa diketuk, susunan baris dan kolom, bangun tangga dengan garis putus pembatas persegi panjang tujuan). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab5-ringkas.json`. Uji: `scripts/uji-lab-k5b5.mjs`.

Metode luar buku yang dianyam. A: Unit Square Covering (Tutup: ketuk petak satuan sampai daerah tertutup rapat tanpa celah, lalu pilih luasnya dengan satuan cm² atau m²), Array Model (Baris: atur baris dan kolom, banyak petak sama dengan petak tiap baris dikali banyak baris), dan Area Conservation, cara Yohana (Potong: petak yang menonjol di luar garis putus dipindah ke lubang di dalamnya; luas tetap).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tutup: daerah 5 dan 2 (10 cm²); Tutup: daerah 3 dan 3 (9 m²); Baris: 4 baris 2 kolom (8 petak); Baris: 6 baris 3 kolom (18 petak); Potong: tangga tiga tingkat menjadi 2 baris 3 kolom (luas tetap 6) | Tutup: daerah 4 dan 2 (8 cm²); Baris: 5 baris 4 kolom (20 petak); Potong: tangga empat tingkat menjadi 2 baris 5 kolom (luas tetap 10) |

Near-miss tidak memenuhi misi: menutup dengan celah (tiap petak yang dilewatkan diuji), menutup tetapi belum diperiksa, memilih luas sebelum rapat, membuka petak setelah diperiksa, memilih jumlah baris dan kolom atau jumlah tepi sebagai luas, susunan Baris yang tidak sesuai tugas (termasuk tertukar) walau banyak petaknya benar, baris dikali baris, mengambil petak yang sudah pas, menaruh di luar garis putus atau di tempat terisi, dan pemindahan yang belum selesai.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Petak (A) | Tutup → Baris → Satuan → Potong | Alun-Alun (tutup 5 petak tiap baris, 2 baris = 10; 3 baris 4 kolom = 12; 6 dan 2 ubin = 12 m²; kolom 2, 3, 1 jadi 2 baris 3 kolom, luas 6), Ubin Lukas (3 dan 3 = 9; 2 baris 5 kolom = 10; 4 dan 3 ubin = 12 m²; kolom 4, 2, 3 jadi 3 baris 3 kolom, luas 9), Cara Yohana (4 dan 2 = 8; 5 baris 3 kolom = 15; 3 dan 2 ubin = 6 cm²; kolom 1, 2, 3, 4 jadi 2 baris 5 kolom, luas 10) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: petak satu baris ditambah satu kolom dan jumlah tepi (Tutup); baris ditambah kolom dan baris dikali baris (Baris); satuan panjang dan jumlah panjang dengan satuan persegi (Satuan); luas berkurang atau bertambah sebanyak petak yang dipindah (Potong). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Ubin Alun-Alun (A) | 7 | Narasi Lukas; arti luas daerah (pengecoh: panjang tepi dan banyak sudut); kamar 5 m dan 2 m = 10 ubin dan persegi sisi 3 m = 9 ubin; ketuk 12 stik untuk lantai pos jaga 4 m dan 3 m; isi 18 stik untuk serambi 6 m dan 3 m; cara Yohana, luas tetap enam petak (pengecoh: bertambah atau berkurang); penutup |

## Kejujuran konsep

- Tutup: luas baru tercatat bila semua petak diketuk, tutupan diperiksa, lalu luas yang benar dipilih; membuka satu petak membatalkan pemeriksaan. Luas dihitung di kode dengan perkalian, diuji dengan mencacah petak satu per satu dan dengan penjumlahan berulang. Data dipilih agar jumlah panjang tepi dan jumlah baris dan kolom tidak pernah sama dengan luas.
- Baris: banyak petak hanya diterima bila susunan sama persis dengan tugas (baris dan kolom tidak boleh tertukar), dibatasi delapan baris dan delapan kolom.
- Potong: pemindahan hanya satu petak sekali (ambil petak yang menonjol, taruh di lubang), luas selalu tetap (diuji pada tiap langkah dan pada fuzz), selesai bila tidak ada petak yang menonjol. Banyak petak menonjol dan lubang dihitung mandiri dengan himpunan petak kisi yang dibangun dari bawah.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa setengah dan lambang ½, segitiga, jajargenjang, trapesium, belah ketupat, layang-layang, alas, tinggi, diagonal, rumus, gabungan, uraikan, tumpang tindih, silang, kawat, dan keliling. Perkalian baris dikali kolom boleh karena itu Array Model.
- Fuzz 20.000 aksi: batas terjaga, luas tetap, riwayat tidak dicabut dan hanya bila tercapai, semua pesan bisa dieja. Uji mutasi pada logika lab dan mesin: satu angka diubah, uji gagal.
