# Matematika Kelas 2 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Komponen: `src/components/modul/SimulasiK2Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab4.ts`. Alat:

- `SimulasiLabPosisi.tsx` + `lab-posisi-k2b4.ts` (PhET, baru)
- `SimulasiLabPetunjuk.tsx` + `lab-petunjuk-k2b4.ts` (PhET filter petunjuk, baru)
- `SimulasiPabrikPola.tsx` + `lab-pabrik-k2b4.ts` (PhET, baru)
- `SimulasiMesinPola.tsx` + `mesin-pola-k2b4.ts` (mesin keadaan, baru)
- `SimulasiSkenario.tsx` + `skenario-k2b4.ts` (dua skenario, baru): Panen di Sawah Paman (Sub-Bab A) dan Pesta Pola di Desa (Sub-Bab B)

Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`); `SIMULASI_BAB` tetap kosong. Mind-Map dan Infografis memakai `src/data/kelas2-bab4-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model menggerakkan gambar, kalimat, kalimat lawan, peta kotak, sudut pandang anak, dan tabel pasangan (Lab Posisi); satuan, jumlah ulang, kode huruf, tanda satuan, dan lanjutan berubah bersama (Pabrik Pola) |
| Filter petunjuk | Tinggi | "Gabungkan beberapa petunjuk" adalah penyempitan pilihan. Lab Petunjuk Ganda menunjukkan berapa benda yang masih cocok setiap petunjuk ditambah; dua cara baca (di mana saja, tepat di sebelahnya) |
| Mesin keadaan | Tinggi | Memeriksa pola punya urutan tetap: Cek (pola atau bukan), Ciri (satuan terpendek atau alasan bukan pola), Bukti (unsur berikutnya atau syarat pola). Mesin menolak lompatan |
| Skenario | Tinggi | Panen di Sawah Paman (memakai kata posisi dan petunjuk) dan Pesta Pola di Desa (memeriksa dan melanjutkan pola, mengingat posisi dari Sub-Bab A) |
| Lab 2D | Sebagian | Tidak ada garis potong atau ukur. Papan 3 × 3 dan panggung benda sudah cukup |
| Lab 3D | Tidak | Isi bab bukan bangun ruang |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Posisi benda | Lab Posisi + Lab Petunjuk Ganda + skenario Panen di Sawah Paman | Atas dengan Kalimat lawan menyala (acuan jadi di bawah benda); depan dengan Kalimat lawan; kanan dengan Sudut pandang anak; satu petunjuk menyisakan lebih dari satu benda (cara Di mana saja); dua atau lebih petunjuk menyisakan tepat satu benda (cara Di mana saja); tuntas skenario Panen di Sawah Paman | Coba keenam kata posisi; Peta kotak dengan benda di kiri; cara Tepat di sebelahnya, satu petunjuk cukup; Papan Taman dengan dua petunjuk menyisakan satu benda |
| B · Pola (pencapaian misi) | Pabrik Pola + Mesin Tiga Pemeriksaan + skenario Pesta Pola di Desa | Satuan A A B diulang tiga kali atau lebih menjadi pola; barisan semua sama (dua unsur atau lebih) bukan pola; satuan A B A B memiliki satuan terpendek dua; pola suara tiga unsur (A B C) setelah menekan Dengarkan; tuntas Mesin Tiga Pemeriksaan; tuntas skenario Pesta Pola di Desa | Pola tiga bentuk berbeda; nyalakan Lanjutkan barisan pada pola; pola gerakan dua unsur berbeda |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Posisi: acuan kotak, benda bola, belum ditaruh (`kata = null`), semua perwakilan tambahan mati.
- Lab Petunjuk Ganda: Rak Kamar, cara Di mana saja, belum ada benda Aku, nol petunjuk, sembilan benda cocok.
- Pabrik Pola: jenis Warna, satuan merah dan biru (kode A B), diulang tiga kali, Kode huruf menyala, Tanda satuan dan Lanjutkan mati, belum didengar.
- Mesin Tiga Pemeriksaan: stasiun Cek, barisan pertama (Taplak Panen), belum ada langkah.
- Skenario: adegan pertama (narasi).

## Alat yang ditambah di pola ini

- **Lab Posisi**: satu benda (bola, kucing, buku, burung) ditaruh di salah satu enam tempat di sekitar satu acuan (kotak, meja, kursi, pohon). Anak menyeret benda atau mengetuk tempatnya. Kalimat baku, kalimat lawan (acuan dilihat dari benda), peta kotak polos, sudut pandang anak yang membelakangi kita (kanan dan kiri anak sama dengan kita), dan tabel pasangan berubah bersama. Peta kotak memakai lingkaran merah dan persegi polos (tanpa gambar benda). Benda di belakang tertutup acuan, benda di depan menutupi acuan.
- **Lab Petunjuk Ganda**: papan 3 × 3 berisi sembilan benda (Rak Kamar atau Papan Taman). Anak memilih satu benda sebagai Aku, memilih kata posisi, lalu mengetuk benda acuan. Setiap petunjuk yang cocok menyempitkan daftar. Paling banyak empat petunjuk. Cara **Di mana saja** menganggap "di atas jam" berarti di baris mana pun yang lebih atas; cara **Tepat di sebelahnya** menganggap berarti menempel langsung. Uji brute-force membuktikan: satu petunjuk cara Di mana saja tidak pernah menyisakan satu benda; benda di pojok cukup dua petunjuk; benda di tengah butuh empat; cara Tepat selalu menyisakan satu atau nol benda.
- **Pabrik Pola**: unsur tiap jenis (warna, bentuk, gerakan, suara) tiga macam. Satuan 1 sampai 4 unsur, diulang 2 sampai 5 kali (panjang barisan paling banyak 15). Kode huruf, tanda satuan, lanjutan dua unsur, dan kalimat berubah bersama. Barisan semua sama bukan pola. Satuan A B A B diakui satuan terpendeknya A B. Jenis Suara memiliki tombol Dengarkan (bunyi lewat perangkat, tanpa berkas audio).
- **Mesin Tiga Pemeriksaan**: empat barisan (Taplak Panen, Gelang Kuning, Bendera Hiasan, Gerakan Tarian), dua pola (satuan tiga dan dua unsur) dan dua bukan pola (semua sama, kelompok tidak teratur). Salah jawab atau lompat stasiun hanya mendapat petunjuk. Pengecoh Ciri bukan satuan yang sah, letak jawaban benar berputar.
- **Skenario**: *Panen di Sawah Paman* (tujuh adegan: kata posisi, kata lawan, barisan, sudut pandang, petunjuk gabungan) dan *Pesta Pola di Desa* (delapan adegan: taplak, kaus, kode huruf, bukan pola, gerakan, kursi yang mengingat posisi Sub-Bab A).

## Coba ini! (ringkas)

- **Lab Posisi:** (1) Taruh benda di atas acuan, nyalakan Kalimat lawan. (2) Coba depan lalu belakang: siapa menutupi siapa? (3) Nyalakan Sudut pandang anak, taruh benda di kanan. (4) Ganti acuan, coba enam kata, lihat tabel.
- **Lab Petunjuk Ganda:** (1) Pilih Aku, beri satu petunjuk: berapa yang cocok? (2) Tambah sampai tinggal satu. (3) Bandingkan benda pojok dan tengah. (4) Ganti cara baca ke Tepat di sebelahnya.
- **Pabrik Pola:** (1) Satuan merah, biru: ubah banyak ulang. (2) Satuan semua sama: masih pola? (3) A B A B dengan Tanda satuan. (4) Suara: Dengarkan, lalu Lanjutkan barisan.
- **Mesin Tiga Pemeriksaan:** (1) Ketuk stasiun Bukti sebelum menjawab Cek. (2) Pada Gelang Kuning, apa alasan bukan pola? (3) Jawab salah dengan sengaja dan baca petunjuk.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b4.mjs`: logika Lab Posisi, Lab Petunjuk (termasuk bukti brute-force), Pabrik Pola, Mesin Pola (12.112 cek)
- `node --no-warnings scripts/uji-lab-kelas2.mjs`: misi hibrida Bab 1 sampai Bab 4 (213 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk dua skenario Bab 4 (880 cek)
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas
