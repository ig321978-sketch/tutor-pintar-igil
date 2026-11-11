# Matematika Kelas 2 · Bab 8 · Simulasi SMISCPA (pola hibrida)

Bab 8: Berbagai Diagram. Komponen: `src/components/modul/SimulasiK2Bab8.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab8.ts`, logika murni semua alat di `lab-data-k2b8.ts` (satu berkas mandiri, hanya `import type`). Alat:

- `SimulasiLabTurus.tsx` (PhET, baru; Sub-Bab A)
- `SimulasiMesinCatat.tsx` (mesin keadaan, baru; Sub-Bab A)
- `SimulasiLabBaca.tsx` (lab 2D, baru; Sub-Bab A)
- `SimulasiLabGambar.tsx` (PhET, baru; Sub-Bab B)
- `SimulasiMesinSusun.tsx` (mesin keadaan, baru; Sub-Bab B)
- `SimulasiSkenario.tsx` + `skenario-k2b8.ts`: Survei Kira (Sub-Bab B, simulasi pencapaian misi bab)
- `diagram-lab-k2b8.tsx`: potongan tampilan bersama (lambang polos, turus berjajar atau berkelompok lima)

Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`); `SIMULASI_BAB` tetap kosong. Mind-Map dan Infografis memakai `src/data/kelas2-bab8-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`. Diuji di `scripts/uji-lab-k2b8.mjs` dan `scripts/uji-skenario-umum.mjs`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model (banyak data tiap jenis) menggerakkan benda, turus, tabel, kelompok lima, dan kalimat (Lab Turus). Model yang sama menggerakkan diagram gambar, tabel, turus, judul, dan keterangan, dengan lambang yang bisa diganti (Lab Diagram Gambar) |
| Lab 2D | Tinggi | Membaca data nyata adalah menjelajahi kanvas: ketuk dua baris, lihat lebihnya dan kurangnya, paling banyak, paling sedikit, dan selisih (Lab Baca Turus) |
| Mesin keadaan | Tinggi | Mencatat punya urutan tetap: Catat, Hitung, Baca. Menyusun diagram juga: Judul, Keterangan, Gambar, Baca. Mesin menolak melompat dan menyebut sebabnya |
| Skenario | Tinggi | Survei kelas adalah keputusan nyata dengan akibat cerita: mencatat, membaca, membandingkan, dan menyajikan |
| Lab 3D | Tidak | Isi bab bukan bangun ruang |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Kejujuran konsep

- Satu garis turus selalu satu benda. Lima benda ditulis empat garis dengan satu coretan miring (kelompok lima). Teks kelompok diuji untuk 0 sampai 15 (`penuh * 5 + sisa = n`).
- Kelompok lima bisa dimatikan: garis berjajar tanpa coretan sulit dihitung. Misi bebas "Matikan Kelompok lima, buat 9" membuat anak merasakannya sendiri.
- Kolom Banyak pada tabel selalu sama dengan banyak turus dan banyak benda pada baris itu (satu model, tiga perwakilan).
- Dua baris yang sama panjang tidak punya satu pun yang "paling". Pada data bunga, paling sedikit adalah lili dan aster (4 dan 4), dan kalimat menulis "tidak ada satu, lili dan aster sama banyak" (diuji untuk semua set).
- Arah lebihnya dan kurangnya benar untuk semua pasangan semua set: bebek 11 satu lebihnya dari ayam 10, ayam satu kurangnya dari bebek. Selisih ditulis besar dikurangi kecil.
- Pada Lab Diagram Gambar, mengganti lambang tidak mengubah banyaknya. Semua gambar sama bentuk dan sama ukuran, satu gambar mewakili satu. Sub-Bab B tidak memakai gambar benda berwarna (batas Concrete dan Picture): hanya lambang polos (bintang, lingkaran, hati, wajah senyum).
- Diagram wajib berjudul dan berketerangan. Lab menyorot ini bila Judul dan keterangan dimatikan, dan Mesin Susun menolak menggambar sebelum keduanya.
- Mesin Catat menolak baris yang salah (menyebut baris yang benar), menghitung sebelum semua data tercatat, dan membaca sebelum menghitung. Jenis yang paling banyak tunggal di tiap ronde, dan aliran data tetap (bercampur, tidak berurutan per jenis).
- Mesin Susun menolak Periksa bila gambar belum sama dengan tabel, dan menyebut baris pertama yang berbeda berikut selisihnya ("Tambah 7 gambar" atau "Kurangi 2 gambar").

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Diagram Turus | Lab Turus + Mesin Catat Turus + Lab Baca Turus | Satu jenis tepat 5 (satu kelompok lima); tepat 10 (dua kelompok lima); tabel buah 2, 6, 4, 3; tuntas Mesin Catat Turus; bebek dan ayam di Lab Baca; Paling banyak dan paling sedikit pada data hewan | Lili dan aster sama banyak; kambing dan sapi (dua lebihnya); Selisih; Benda menyala; Kelompok lima mati dengan 9 |
| B · Diagram Gambar (pencapaian misi) | Lab Diagram Gambar + Mesin Susun Diagram + skenario Survei Kira | Ganti lambang saat sudah ada data; warna merah 7 dan hitam 2; Turus dan Diagram gambar bersamaan dengan 8; tuntas Mesin Susun Diagram; tuntas skenario Survei Kira | Dua baris sama banyak; satu baris 12 (batas lab); permainan karet 4 dan benteng 7; jumlah semua 20 |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Turus: data buah, semua nol, hanya Turus dan Kelompok lima menyala.
- Mesin Catat Turus: stasiun Catat, ronde pertama (buah, sembilan data), belum ada garis.
- Lab Baca Turus: data hewan, tidak ada baris dipilih, Paling dan Selisih mati.
- Lab Diagram Gambar: data warna, semua nol, lambang bintang, hanya Diagram gambar menyala.
- Mesin Susun Diagram: stasiun Judul, diagram pertama (warna 7, 3, 5, 2), belum ada langkah.
- Skenario: adegan pertama (narasi).

## Alat yang ditambah di pola ini

- **Lab Turus**: tiga data (buah, hewan, mainan), empat jenis, 0 sampai 15 tiap jenis. Tiga perwakilan (Turus, Benda, Tabel) dan Kelompok lima. Ganti data mengosongkan banyaknya, pilihan tampilan tetap.
- **Mesin Catat Turus**: tiga ronde (buah, hewan, mainan), sembilan data tiap ronde, datang satu per satu dalam urutan campur tetap. Pilihan jumlah dan pilihan paling banyak diputar menurut ronde supaya jawaban benar tidak selalu di tempat yang sama. Tombol "Langsung hitung" dan "Langsung baca" membiarkan anak mencoba melompat dan melihat penolakan mesin.
- **Lab Baca Turus**: empat data nyata (hewan, bunga, sayur, mainan). Ketuk dua baris (A dan B). Sorot paling banyak dan paling sedikit, dan batang selisih (bagian lebihnya berwarna emas).
- **Lab Diagram Gambar**: empat data (warna, permainan, kaleng, cara berangkat), 0 sampai 12 tiap baris, empat lambang. Empat perwakilan (Diagram gambar, Tabel, Turus, Judul dan keterangan).
- **Mesin Susun Diagram**: tiga diagram (warna, permainan, cara berangkat). Tiga pilihan judul, keterangan (satu, dua, atau lima), dan paling banyak, diputar menurut ronde. Tombol "Langsung menggambar" membiarkan anak mencoba melompat.
- **Skenario**: *Survei Kira* (tujuh adegan: mencatat turus, paling banyak, lebihnya dan jumlah, sama banyak, serta judul dan keterangan).

## Coba ini! (ringkas)

- **Lab Turus:** (1) Tambah satu jenis sampai 5. (2) Tambah sampai 10. (3) Matikan Kelompok lima, buat 9. (4) Nyalakan Tabel dan buat datamu.
- **Mesin Catat Turus:** (1) Ketuk baris yang salah. (2) Langsung hitung sebelum selesai mencatat. (3) Perhatikan kelompok lima terbentuk. (4) Pilih jenis yang bukan paling banyak.
- **Lab Baca Turus:** (1) Bebek dan ayam. (2) Paling banyak dan paling sedikit. (3) Bunga: adakah satu yang paling sedikit? (4) Selisih kambing dan sapi.
- **Lab Diagram Gambar:** (1) Ganti lambang. (2) Turus dan Diagram gambar bersamaan. (3) Dua jenis sama banyak. (4) Matikan Judul dan keterangan.
- **Mesin Susun Diagram:** (1) Langsung menggambar. (2) Judul milik data lain. (3) Keterangan salah. (4) Gambar kurang satu lalu Periksa.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.
