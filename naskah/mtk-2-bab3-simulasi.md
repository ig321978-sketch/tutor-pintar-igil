# Matematika Kelas 2 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Komponen: `src/components/modul/SimulasiK2Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab3.ts`. Alat:

- `SimulasiBentukDatar.tsx` + `lab-bentuk-k2b3.ts` (PhET, kini dengan uji Cetakan)
- `SimulasiMesinDetektif.tsx` + `mesin-detektif-k2b3.ts` (mesin keadaan, baru)
- `SimulasiBengkelUrai.tsx` + `lab-urai-k2b3.ts` (lab virtual 2D)
- `SimulasiLabPola.tsx` + `lab-pola-k2b3.ts` (PhET, baru)
- `SimulasiLerengGelinding.tsx` + `lab-ruang-k2b3.ts` (PhET percobaan)
- `SimulasiLabCetak.tsx` + `lab-cetak-k2b3.ts` (PhET, baru)
- `SimulasiSkenario.tsx` + `skenario-k2b3.ts` (skenario, baru)

Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`); `SIMULASI_BAB` kini kosong. Mind-Map dan Infografis memakai `src/data/kelas2-bab3-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model menggerakkan gambar, nomor sisi, tabel, dan kalimat: bentuk dan putaran (Sub-Bab A), banyak sisi dan cara menguraikan segi banyak (Sub-Bab B), bangun ruang dan permukaannya (Sub-Bab C) |
| Mesin keadaan | Tinggi | Mengenali bentuk punya urutan tetap: tepi lurus atau lengkung, lalu ciri (hitung sisi atau uji putar), lalu nama. Mesin menolak lompatan |
| Skenario | Tinggi | Toko Mainan Upe: keputusan menamai bentuk, memilih cara mengurai, dan memprediksi gerak benda |
| Lab 2D | Tinggi | Bengkel Urai: memilih garis potong di kanvas, mesin menghitung dan menamai keping |
| Lab 3D | Tidak | Bangun ruang cukup dipahami lewat percobaan lereng dan cetakan permukaan; tanpa 3D agar ringan di HP |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Bangun datar | Lab Bentuk Datar (dengan Cetakan) + Mesin Tiga Pertanyaan | Segi lima dengan nomor sisi; lingkaran diputar di atas cetakan tetap pas; bentuk lonjong diputar tidak pas; tuntas Mesin Tiga Pertanyaan (empat bentuk misterius) | Segi enam diputar dan ukuran Besar; kurangi sisi sampai segitiga |
| B · Mengurai dan menyusun | Bengkel Urai + Lab Pola Segitiga + Lab Bentuk Datar (mengingat) | Persegi satu diagonal = dua segitiga; persegi satu garis tengah = dua keping bukan segitiga; segi enam dari satu titik = empat segitiga; Lab Pola segi lima dari satu pojok; Lab Pola segi tujuh dari titik tengah | Renggangkan lalu rapatkan keping; segi enam lewat titik tengah = enam segitiga; Bandingkan di segi delapan; ingat segi lima Sub-Bab A |
| C · Bangun ruang (pencapaian misi) | Lereng Gelinding + Lab Cetak Permukaan + skenario Toko Mainan Upe | Bola menggelinding; tabung rebah menggelinding; kerucut rebah bergerak melingkar; cetak kubus = segi empat sama sisi; tuntas skenario sampai adegan akhir | Kubus di lereng diam; cetak sisi besar balok; cetak alas tabung atau kerucut = lingkaran |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Bentuk Datar: segi banyak, enam sisi (`AWAL_SISI`), putaran 0°, ukuran Sedang, nomor sisi dan tabel hidup, Cetakan mati.
- Mesin Tiga Pertanyaan: stasiun Tepi, bentuk pertama (segi lima), belum ada langkah.
- Bengkel Urai: persegi utuh (satu keping), keping rapat.
- Lab Pola Segitiga: empat sisi, dari satu pojok, Bandingkan mati, tabel hidup.
- Lereng Gelinding: bola, berdiri, belum dilepas.
- Lab Cetak Permukaan: kubus, sisi, kertas kosong (belum dicetak).
- Skenario Toko Mainan Upe: adegan pertama (narasi), delapan adegan.

## Alat yang ditambah di pola ini

- **Cetakan** (Lab Bentuk Datar): garis putus-putus pada posisi awal. Segi banyak pas bila putarannya kelipatan sudut antar-pojok (360° dibagi banyak sisi), lingkaran selalu pas, bentuk lonjong hanya pas di kelipatan 180°. Anak melihat sendiri mengapa lingkaran berbeda dari bentuk lengkung lain.
- **Mesin Tiga Pertanyaan**: Tepi, Ciri, Nama. Jalur lurus menghitung sisi; jalur lengkung menguji putar. Salah jawab atau lompat stasiun hanya mendapat petunjuk, tanpa hukuman. Letak jawaban benar berputar menurut bentuk ke-berapa.
- **Lab Pola Segitiga**: segi banyak 3 sampai 8 diurai dengan dua cara. Dari satu pojok menghasilkan banyak sisi dikurangi dua, dari titik tengah menghasilkan sebanyak sisinya. Bandingkan menampilkan dua gambar berdampingan dan selisihnya. Luas segitiga-segitiga selalu menutup segi banyaknya (diuji).
- **Lab Cetak Permukaan**: permukaan datar menghasilkan bangun datar (segi empat sama sisi, segi empat berbeda sisi, lingkaran); permukaan lengkung tidak menghasilkan cetakan rapi. Konsisten dengan Lereng Gelinding dan Lab Bentuk Datar (diuji).
- **Skenario Toko Mainan Upe**: menamai ubin enam sisi, memilih cara mengurai persegi, soal pola segi enam, menebak gerak benda di lereng, soal cetakan, dan menghitung tujuh bola.

## Coba ini! (ringkas)

- **Lab Bentuk Datar:** (1) Atur enam sisi dan hitung lewat nomor. (2) Putar dan besarkan: berubahkah jumlah sisinya? (3) Nyalakan Cetakan, putar lingkaran dan bentuk lonjong: mana yang selalu pas?
- **Mesin Tiga Pertanyaan:** (1) Ketuk stasiun Nama sebelum menjawab Tepi. Apa kata mesin? (2) Pada bentuk lengkung, putar dulu di atas cetakannya. (3) Hitung sisi segi lima dengan menandai satu sisi sebagai awal.
- **Bengkel Urai:** potong persegi dengan satu diagonal, lalu dengan garis tengah. Mana yang menghasilkan segitiga?
- **Lab Pola Segitiga:** (1) Segi lima dari satu pojok: berapa segitiga? (2) Ganti ke titik tengah. (3) Bandingkan segi enam: berapa selisihnya? (4) Tebak segitiga pada segi delapan.
- **Lereng Gelinding:** lepaskan bola, lalu kubus. Rebahkan tabung dan kerucut: apa bedanya?
- **Lab Cetak:** cetak kubus, sisi besar balok, alas tabung, lalu bola. Mengapa bola tidak punya cetakan rapi?
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b3.mjs`: logika Cetakan, Lab Pola, Lab Cetak, mesin detektif (596 cek)
- `node --no-warnings scripts/uji-lab-kelas2.mjs`: misi hibrida Bab 1 sampai Bab 3 (145 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario (706 cek)
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas
