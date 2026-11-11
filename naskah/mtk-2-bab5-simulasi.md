# Matematika Kelas 2 · Bab 5 · Simulasi SMISCPA (pola hibrida)

Komponen: `src/components/modul/SimulasiK2Bab5.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab5.ts`. Alat:

- `SimulasiLabPotong.tsx` + `lab-potong-k2b5.ts` + `gambar-potong-k2b5.tsx` (PhET lab 2D, baru; dipakai Sub-Bab A dan C)
- `SimulasiMesinBagian.tsx` + `mesin-bagian-k2b5.ts` (mesin keadaan, baru)
- `SimulasiLabKumpulan.tsx` + `lab-kumpulan-k2b5.ts` (PhET, baru)
- `SimulasiMesinKumpulan.tsx` + `mesin-kumpulan-k2b5.ts` (mesin keadaan, baru)
- `SimulasiDindingPecahan.tsx` + `dinding-k2b5.ts` (PhET, baru)
- `SimulasiSkenario.tsx` + `skenario-k2b5.ts` (tiga skenario, baru): Roti Bu Lili (A), Bagi Adil di Kebun Tika (B), Kue Ulang Tahun Upe (C)

Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`); `SIMULASI_BAB` tetap kosong. Mind-Map dan Infografis memakai `src/data/kelas2-bab5-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model menggerakkan gambar, batang perbandingan, tabel, dan kalimat: bentuk dengan garis potong (Lab Potong), kumpulan dengan dua kelompok (Lab Kumpulan), tiga batang sama panjang (Dinding Pecahan) |
| Lab 2D | Tinggi | Garis potong yang digeser per langkah adalah alat ukur di kanvas. Anak melihat sendiri kapan dua bagian sama besar |
| Mesin keadaan | Tinggi | Memeriksa setengah punya urutan tetap: Hitung bagian, Bandingkan besar, Sebut namanya (Mesin Pemeriksa Bagian). Membagi kumpulan juga: Hitung, Cek sama banyak, Hasil (Mesin Pembagi Adil). Mesin menolak lompatan |
| Skenario | Tinggi | Membagi roti, membagi hasil kebun, dan memotong kue ulang tahun adalah keputusan nyata dengan akibat cerita |
| Lab 3D | Tidak | Isi bab bukan bangun ruang |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Kejujuran konsep

- Hanya bagian yang **sama besar** diberi nama pecahan. Dua bagian tidak sama besar bukan setengah. Empat bagian tidak sama besar bukan seperempat. Empat bagian sama besar juga bukan setengah: setengah hanya untuk tepat dua bagian.
- Sama besar diputuskan dari luas bagian dengan toleransi 0,4 persen. Uji celah membuktikan tidak ada susunan garis yang selisih luasnya jatuh di antara 0,4 persen dan 2 persen, jadi tidak ada kasus nyaris sama yang membingungkan.
- Gabungan bagian berwarna diberi nama (setengah, seperempat, utuh) hanya bila semua bagian sama besar. Tiga dari empat bagian sama besar berwarna: tidak diberi nama.
- Setengah dari kumpulan hanya ada bila dua kelompok sama banyak, yaitu bila banyak benda genap. Bilangan ganjil selalu menyisakan satu. Uji brute-force membuktikan tidak ada pembagian ganjil yang sama banyak.

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Setengah dari benda utuh | Lab Potong (satu garis) + Mesin Pemeriksa Bagian + skenario Roti Bu Lili | Persegi dibelah dua sama besar (setengah); dua bagian tidak sama besar (bukan setengah); lingkaran dibelah dua sama besar; tuntas Mesin Pemeriksa Bagian; tuntas skenario Roti Bu Lili | Garis miring pada persegi tetap setengah; segitiga dibelah dua sama besar; warnai satu dari dua bagian sama besar; Batang perbandingan pada dua bagian sama besar; temukan setengah pada tiga bentuk |
| B · Setengah dari kumpulan | Lab Kumpulan + Mesin Pembagi Adil + skenario Bagi Adil di Kebun Tika | Bagi 6 benda menjadi 3 dan 3; bagi 10 benda menjadi 5 dan 5; banyak benda ganjil selalu tersisa satu; tuntas Mesin Pembagi Adil; tuntas skenario Bagi Adil di Kebun Tika | Pasangan satu-satu menyala pada kelompok sama banyak; empat banyak benda berbeda yang berhasil dibagi dua; dua jenis benda berbeda yang berhasil dibagi; Tabel pola menyala pada kelompok sama banyak |
| C · Seperempat (pencapaian misi) | Lab Potong (dua garis) + Dinding Pecahan + skenario Kue Ulang Tahun Upe | Dua garis menghasilkan empat bagian sama besar (seperempat); warnai satu dari empat bagian sama besar; warnai dua dari empat (setengah); di Dinding Pecahan warnai dua seperempat dan satu setengah, panjangnya sama; tuntas skenario Kue Ulang Tahun Upe | Empat bagian tidak sama besar bukan seperempat; lingkaran empat bagian sama besar; empat seperempat sama dengan satu utuh di Dinding; tiga dari empat bagian sama besar belum diberi nama |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Potong: persegi, tanpa garis (satu bagian utuh), tanpa warna, Batang dan Tabel mati. Garis baru muncul di posisi dua langkah dari tengah, jadi anak harus menggesernya sendiri ke tengah.
- Lab Kumpulan: 6 kelereng, semuanya di kelompok kiri, Pasangan dan Tabel mati.
- Dinding Pecahan: tiga batang tanpa warna, Garis banding menyala.
- Mesin Pemeriksa Bagian: stasiun Hitung, bentuk pertama (Roti), belum ada langkah.
- Mesin Pembagi Adil: stasiun Hitung, kumpulan pertama (Kelereng Malosi), belum ada langkah.
- Skenario: adegan pertama (narasi).

## Alat yang ditambah di pola ini

- **Lab Potong**: empat bentuk polos (persegi, persegi panjang, lingkaran, segitiga), garis potong empat arah (tegak, datar, miring naik, miring turun) yang digeser tiga langkah ke kiri atau kanan dari tengah. Sub-Bab A satu garis, Sub-Bab C sampai dua garis. Pemotongan memakai pemangkasan poligon cembung, luas tiap bagian dihitung, lalu dibandingkan. Bagian bisa diwarnai dengan mengetuknya. Perwakilan: gambar, batang perbandingan (lebar sesuai luas), tabel bagian, dan kalimat. Lingkaran dibuat dari 72 sisi dengan sudut kelipatan 5 derajat, supaya garis lewat tengah pada empat arah tepat setengah. Gambar bentuk polos tanpa gambar benda, jadi tidak melanggar batas Concrete dan Picture.
- **Mesin Pemeriksa Bagian**: lima bentuk (Roti, Kue Bolu, Pizza, Roti Segitiga, Puding) dengan tiga stasiun Hitung, Bandingkan, Sebut. Dua bentuk setengah, satu bentuk dua bagian tidak sama besar pada persegi panjang, satu pada segitiga (garis datar di tengah tinggi), dan satu empat bagian sama besar. Pilihan Sebut berputar supaya jawaban benar tidak selalu di tempat yang sama.
- **Lab Kumpulan**: 2 sampai 12 benda (kelereng, apel, pensil, ikan, jeruk, balon). Anak mengetuk benda untuk memindahkannya antar kelompok, atau menekan Bagi satu-satu. Perwakilan: benda, hitungan tiap kelompok, pasangan satu-satu bernomor (benda tanpa pasangan bertanda tanya), tabel pola 2 sampai 12, dan kalimat.
- **Mesin Pembagi Adil**: empat kumpulan (6 kelereng, 5 apel, 10 pensil, 7 balon). Dua genap dan dua ganjil. Stasiun Hitung, Cek (bisa dibagi dua sama banyak?), dan Hasil (setengahnya, atau mengapa tersisa satu).
- **Dinding Pecahan**: tiga batang sama panjang berisi 1, 2, dan 4 bagian. Mewarnai bagian mengubah panjang berwarna dalam satuan seperempat. Pasangan batang yang sama panjang disebut dalam kalimat, dan garis banding putus-putus menunjukkan panjang terpanjang.
- **Skenario**: *Roti Bu Lili* (enam adegan: membagi adil, nama setengah, lipat kertas, dua bagian tidak sama besar, empat bagian bukan setengah), *Bagi Adil di Kebun Tika* (enam adegan: cara membagi, setengah dari 10, 12, dan 2, sembilan jeruk tidak bisa dibagi dua, genap dan ganjil), *Kue Ulang Tahun Upe* (enam adegan: empat bagian sama besar, seperempat, dua seperempat sama dengan setengah, bagian lebih kecil bukan seperempat, setengah dibelah lagi menjadi seperempat).

## Coba ini! (ringkas)

- **Lab Potong A:** (1) Belah persegi dan geser garis sampai dua bagian sama besar. (2) Coba arah miring. (3) Pilih segitiga, cari garis yang membuat dua bagian sama besar. (4) Nyalakan Batang perbandingan.
- **Lab Potong C:** (1) Empat bagian sama besar pada persegi, apa namanya? (2) Warnai dua bagian: samakah dengan setengah? (3) Geser satu garis satu langkah. (4) Coba lingkaran.
- **Lab Kumpulan:** (1) Bagi satu-satu pada 6 benda. (2) Ubah jadi 7. (3) Nyalakan Pasangan satu-satu. (4) Nyalakan Tabel pola.
- **Dinding Pecahan:** (1) Dua seperempat dan satu setengah. (2) Empat seperempat. (3) Satu seperempat saja. (4) Dua setengah.
- **Mesin Pemeriksa Bagian:** (1) Ketuk stasiun Sebut sebelum menghitung. (2) Mengapa Kue Bolu bukan setengah? (3) Mengapa Puding bukan setengah?
- **Mesin Pembagi Adil:** (1) Ketuk stasiun Hasil sebelum menghitung. (2) Mengapa Apel Tika tidak bisa dibagi dua? (3) Bandingkan Kelereng Malosi dan Balon Kira.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b5.mjs`: logika Lab Potong (3.236 susunan, uji celah toleransi), Lab Kumpulan, Dinding Pecahan, kedua mesin, dan misi yang bisa dicapai dari lab sebenarnya (6.833 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk tiga skenario Bab 5
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas
