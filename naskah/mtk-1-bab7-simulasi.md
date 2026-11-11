# Matematika Kelas 1 Bab 7 (Mengukur Panjang Benda): SMISCPA

Bab kedelapan yang memakai alur SMISCPA, setelah Bab 8 (pilot) dan Bab 1 sampai 6. Simulasi ada di dalam Materi (tahap 4), tab Simulasi tidak ada lagi untuk bab ini. Mind-Map dan Infografis dibaca dari `src/data/kelas1-bab7-ringkas.json`. Komponen: `src/components/modul/SimulasiBab7.tsx` (`SimulasiBab7Materi`, `misiAwalBab7`) memakai `SimulasiMejaUkur.tsx` (diperluas), `SimulasiBandingPanjang.tsx` (diperluas), `SimulasiSkenario.tsx` yang sudah ada, serta satu laboratorium baru: `SimulasiPosisi.tsx` (logika murni di `lab-posisi-bab7.ts`).

Dua sub-bab mengikuti `src/data/kelas1-bab7.json`.

| Sub-bab | Isi | Simulasi (urut) |
| --- | --- | --- |
| A. Membandingkan dan Mengurutkan Panjang Benda | lebih tinggi dan lebih pendek (dua benda), sama tinggi, paling tinggi dan paling pendek (tiga benda atau lebih), urutan dan dua urutan yang benar, garis awal yang sama, posisi tinggi dan rendah | 1. Bandingkan Dua Pita; 2. Paling Panjang dan Urutan (pensil); 3. Tinggi dan Rendah (kupu-kupu) |
| B. Mengukur Panjang Benda | tebak dulu, alat ukur tidak baku, empat cara mengukur yang benar dan satu jenis alat, menulis angka dan nama alat ukur, alat berbeda hasil berbeda, kertas berpetak, jarak aman | 1. Meja Ukur (lab 2D); 2. Bandingkan Hasil Ukur (pensil di kertas berpetak); 3. Pita untuk Kado (skenario) |

Semua langkah `mode: "sentuh"`: tombol lanjut aktif setelah simulasinya disentuh sekali. Skenario Pita untuk Kado dulu bermode `tuntas` di tab; di dalam Materi ia ikut `sentuh`, tetapi seluruh adegannya tetap bisa dimainkan.

## Batas Sub-Bab A dan B

Sub-Bab A hanya membandingkan dengan mata. Karena itu semua alat A **tanpa angka dan tanpa satuan**: pita dan pensil digambar sebagai batang polos (bukan deretan stik), tombol plus dan minus tidak menampilkan bilangan, dan kalimatnya hanya "lebih panjang dari", "lebih pendek dari", "sama panjang", "paling panjang", dan "paling pendek". Mengukur dengan satuan baru diajarkan di Sub-Bab B, jadi angka, satuan, dan selisih dalam kotak hanya muncul di B.

## Alat yang diubah atau baru

- **`SimulasiBandingPanjang`** menerima `tampil` (`sejajar`, `urut`, `paling`, `dua`), `jumlah` (2 atau 4 benda), `gaya` (`benda`: pita atau pensil; `satuan`: stik atau kotak; `angka`: berangka atau tidak), `awal`, dan `judul`. Bawaan sama dengan lama (empat pita dalam stik, berangka). Dengan `angka: false` batang digambar polos; dengan `satuan: "kotak"` ada kisi kertas berpetak di latar. Ada Reset semua dan langkah "Coba ini!" yang menyesuaikan alat yang tampil.
  - A1: dua pita (Merah dan Biru), `sejajar` dan `dua`, tanpa angka.
  - A2: empat pensil, `sejajar`, `paling`, `urut`, dan `dua`, tanpa angka.
  - B2: empat pensil dalam kotak, awal 5, 9, 3, 6 (pensil A, B, C di buku: 5, 9, 3 kotak), `sejajar`, `paling`, dan `dua`. Kalimatnya "Pensil Biru lebih panjang 4 kotak dari pensil Merah".
- **`SimulasiPosisi` (baru, `lab-posisi-bab7.ts`)**: tiga kupu-kupu (kuning 3, merah 6, hijau 9 di awal, mengikuti cerita buku) naik atau turun satu langkah (1 sampai 10), tanpa angka. Kartu hasil: paling tinggi dan paling rendah (yang sama disebut semuanya, bila ketiganya sama disebut sama tinggi). Ketuk dua kupu-kupu untuk "terbang lebih tinggi" dan "terbang lebih rendah". Ada Reset semua dan "Coba ini!".
- **`SimulasiMejaUkur`** (satuan: balok besar, stik, klip kecil) mendapat dua tambahan:
  - **Tebak dulu**: pengatur "Tebakanmu" sebelum mengukur. Setelah pita pas, kartu menulis "Tebakanmu 3 stik, hasil ukurnya 4 stik. Selisihnya 4 − 3 = 1" (`kalimatTebak`), sama dengan panel Tebakan dan Hasil di Infografis.
  - **Campur alat ukur**: cara salah keempat. Satuan bergantian dengan satuan lain (`satuanLain`), kotak berwarna dua jenis, dan pesannya "Pakai satu jenis alat ukur dari awal sampai akhir". Bersama Mulai dari tengah, Beri celah, dan Tumpuk satuan, ini melengkapi cara salah yang dibahas buku.
  - Ada Reset semua. Tabel "Pita yang sama, satuan berbeda" tetap menunjukkan alat berbeda, hasil berbeda.
- **`SimulasiSkenario`** (`SKENARIO_BAB7`) dipakai apa adanya. Tokoh Kak Dewi diganti ke 🎁 karena emoji seniman sebelumnya memakai urutan ZWJ yang lebih baru dari Emoji 12.

## Misi tiap simulasi

| Simulasi | Misi |
| --- | --- |
| A, Bandingkan Dua Pita | Ketuk kedua pita. Lihat siapa yang lebih panjang dan siapa yang lebih pendek. |
| A, Paling Panjang dan Urutan | Tekan plus pada satu pensil. Lihat siapa yang paling panjang dan siapa yang paling pendek. |
| A, Tinggi dan Rendah | Tekan plus pada kupu-kupu kuning sampai lebih tinggi dari merah. Lihat siapa yang paling tinggi. |
| B, Meja Ukur | Tebak dulu panjang pita. Lalu letakkan stik satu per satu sampai pas di ujung pita. Lihat selisih tebakanmu. |
| B, Bandingkan Hasil Ukur | Ketuk pensil Merah dan pensil Biru. Lihat berapa kotak bedanya. |
| B, Pita untuk Kado | Tekan Ayo mengukur! Lalu bantu Kak Dewi memilih pita. |

## Mind-Map dan Infografis

Tiap sub-bab: satu peta (pusat, 4 cabang, 8 kartu) dan satu infografis (3 panel). Isinya hanya merangkum yang diajarkan sub-bab itu, dengan cerita dari buku (pohon pisang A sampai D, pensil warna, kupu-kupu, meja diukur dengan sedotan dan jengkal, buku diukur dengan stik es krim dan koin, pensil di kertas berpetak, jarak aman).

- **A:** cabang Dua benda, Sama tinggi, Paling dan urutan, Tinggi dan rendah. Infografis: Kata untuk dua pohon, Dua benda atau banyak benda? (banding), Urutan, garis awal, dan posisi.
- **B:** cabang Tebak dulu, Alat ukur, Cara yang benar, Hasil ukur. Infografis: Empat cara mengukur yang benar, Alat ukur berbeda hasil berbeda (banding), Menulis dan memeriksa hasil (tabel pensil di kertas berpetak).
- Visual infografis memakai teks dan tabel menurun, tanpa gambar benda, sesuai batas Concrete dan Picture. Emoji hanya yang sampai Emoji 12 (sudah diaudit).

## Pengujian

- `node scripts/uji-peta-konsep.mjs` dan `node scripts/uji-infografis-ringkas.mjs` membaca semua `kelas*-bab*-ringkas.json`.
- `node --no-warnings scripts/uji-lab-kelas1.mjs`: bagian baru memeriksa kalimat banding tanpa angka (tidak boleh memuat angka atau satuan) dan berangka (pensil dalam kotak) untuk semua pasangan, kalimat paling (termasuk kembar), ucapan dua pita, seluruh logika posisi kupu-kupu (batas, kembar, semua pasangan, pilih dua), tebakan, dan campur alat ukur untuk tiga satuan dan jumlah 0 sampai 9 (campur mati sama persis dengan susunan lama, campur menyala dianggap salah cara bila lebih dari satu, deretan tetap rapat).
- Diperiksa di browser: tidak ada tab Simulasi; Mind-Map, Infografis, dan Simulasi tiap sub-bab terkunci berurutan dan terbuka sesuai syarat; alat yang tampil, gerbang Lanjut, dan teks Misi cocok dengan tabel di atas, dan simulasi Sub-Bab A tidak memuat angka.
