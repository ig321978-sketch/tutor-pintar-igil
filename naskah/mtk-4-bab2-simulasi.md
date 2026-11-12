# Matematika Kelas 4 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: Pecahan (`mtk-4-bab2`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab2`). Komponen: `src/components/modul/SimulasiK4Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab2.ts`, teks misi di `misi-teks-k4b2.ts`. Dimuat malas: registri memuat `SimulasiK4Bab2` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k4b2.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **lima sub-bab**: A (pecahan berpembilang satu), B (pecahan berpenyebut sama), C (pecahan senilai dan bentuk paling sederhana), D (pecahan desimal persepuluhan dan perseratusan), dan E (desimal perseratusan dan persen). Sub-Bab E menjadi simulasi pencapaian misi bab: skenario Pameran Pecahan Kelas 4 mengulang membandingkan pecahan, penyebut sama, senilai, desimal, dan persen.

Berkas Materi bab ini tidak diubah (`SubBabK4B2A–E.tsx`, `naskah-k4b2.ts`, `paket-k4b2.ts`, dan lainnya). Tokoh dan angka mengikuti Materi: pizza dan roti Tiara (1/4, 1/2), kebun Slamet (2/5, 4/5; 3/6 dan 2/6), coklat Putu dan lipat kertas (1/3 = 2/6, 1/4 = 4/16, 6/12 = 1/2), roti dan biskuit Ibu (3/10, 1/100, 7/100, 25/100), serta diskon, 0,75 = 75%, 0,36 = 36%, 2,46 = 246%, 18% = 0,18, dan 20 dari 50 siswa.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Pecahan (Bagi, Banding, Garis) | `SimulasiLabPecahanK4B2.tsx` + `lab-pecahan-k4b2a.ts` | Mesin Pecahan | Pizza Tiara |
| B | Lab Batang (Baca, Banding, Urut) | `SimulasiLabBatangK4B2.tsx` + `lab-batang-k4b2b.ts` | Mesin Batang | Kebun Slamet |
| C | Lab Senilai (Model, Ubah, Sederhana) | `SimulasiLabSenilaiK4B2.tsx` + `lab-senilai-k4b2c.ts` | Mesin Senilai | Cokelat Helen |
| D | Lab Desimal (Persepuluhan, Perseratusan, Jembatan) | `SimulasiLabDesimalK4B2.tsx` + `lab-desimal-k4b2d.ts` | Mesin Desimal | Roti dan Biskuit Ibu |
| E | Lab Persen (Kisi, Ubah, Cerita) | `SimulasiLabPersenK4B2.tsx` + `lab-persen-k4b2e.ts` | Mesin Persen | Pameran Pecahan Kelas 4 |

Mesin: `mesin-data-k4b2-biasa.ts` (A–C) dan `mesin-data-k4b2-desimal.ts` (D–E), dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts` dari Bab 1 Kelas 3. Skenario: `skenario-k4b2-biasa.ts` (A–C) dan `skenario-k4b2-desimal.ts` (D–E), dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab2-ringkas.json` (sub-bab A sampai E).

Pembantu: `eja-k4b2.ts` (pengeja suara: pecahan "satu per empat", desimal "nol koma nol tujuh", persen, FPB, dan tanda hitung) dan `model-pecahan-k4b2.tsx` (lingkaran, batang, kisi 10 × 10, garis bilangan 0 sampai 1, pengatur −/+, dan tulisan pecahan bertingkat; hanya bentuk polos berwarna).

Lab 3D tidak dipakai. CPA tetap di Concrete, Picture, Abstract; simulasi hanya memakai bentuk polos (lingkaran, batang, kisi, garis) dan angka. Metode: lab 2D bergaya PhET (manipulasi langsung), mesin keadaan, dan skenario kontekstual.

Mengapa laboratorium langsung: kesalahan khas bab ini adalah menyebut potongan tidak sama besar sebagai 1/n, mengira penyebut besar berarti bagian besar, membandingkan pembilang saat penyebut berbeda, mengubah hanya pembilang atau hanya penyebut untuk pecahan senilai, menulis 7/100 sebagai 0,7, dan menggeser koma ke arah yang salah. Di lab, anak membangun pecahannya sendiri dan akibat setiap kesalahan terlihat.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Arsir 1/4 dengan potongan sama besar; coba arsir saat potongan tidak sama besar (ditolak); banding 1/2 dan 1/4; banding 1/5 dan 1/10; garis dibagi 8 lalu ketuk 1/8 | Arsir 1/10; dua model sama banyak bagian (tanda sama dengan); arsir 1/12 |
| B | Baca 3/8; banding 2/5 dan 4/5; penyebut berbeda ditolak; urut penyebut 5 dari terkecil; ketuk yang bukan terkecil (ditolak) | Urut penyebut 6 dari terbesar; pembilang dan penyebut sama (tanda sama dengan); baca 5/6 |
| C | 1/3 dikali 2 menjadi 2/6; 1/4 menjadi 4/16; ubah satu saja dari bentuk senilai (tidak senilai); 6/12 dibagi 6; 4/16 disederhanakan dengan FPB | 3/4 sudah paling sederhana; bagi dengan bilangan yang tidak membagi (ditolak); 1/3 menjadi 4/12 |
| D | 3/10 = 0,3; 1/100 = 0,01; 7/100 = 0,07 (nol di depan); jembatan 25/100 = 0,25; jembatan 5/10 = 0,5 | 10/100 = 0,10 = 0,1; 99/100; 1/10 |
| E | Kisi 36 kotak = 36%; 0,75 dengan cara biasa dan cara langsung; 2,46 = 246%; 18% = 0,18; cerita 20 dari 50 = 40% | 0,05 = 5%; kisi 100 kotak; cerita 3 dari 20 dan 9 dari 25 |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji): A 1/4 tanpa arsir dan banding 1/3 dengan 1/5; B batang 2/5 dan banding 1/4 dengan 3/4; C pecahan 1/3; D 3/10, 25/100, dan jembatan 3/10; E kisi 36 kotak dan 0,75 dengan cara biasa, tanpa riwayat. Mesin mulai dari stasiun pertama; skenario dari adegan pertama.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari data kasusnya; letak kunci diputar.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Pecahan (A) | Bagi → Arsir → Tulis → Banding | 1/4 (dengan 1/2), 1/2 (dengan 1/4), 1/10 (dengan 1/5) |
| Mesin Batang (B) | Penyebut → Pembilang → Tanda → Urut | Penyebut 5 (2, 4, 3), penyebut 6 (3, 2, 5), penyebut 10 (2, 1, 7) |
| Mesin Senilai (C) | Gambar → Ubah → Cek → Sederhana | 1/3 dikali 2, 1/4 dikali 4, 6/12 dibagi 6 |
| Mesin Desimal (D) | Pecahan → Angka → Desimal → Balik | 3/10, 7/100, 25/100 |
| Mesin Persen (E) | Pecahan → Persen → Geser → Balik | 0,75; 0,36; 2,46 |

Pengecoh bersumber dari kesalahan umum: pembilang dan penyebut tertukar, penyebut tidak sesuai banyak angka di belakang koma, 7/100 ditulis 0,7, nol di depan hilang, 0,36 menjadi 3,6, persen dikali 10, dan koma digeser satu atau tiga kali. Semua pengecoh dihitung dan terbukti bernilai lain dari kunci.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Pizza Tiara (A) | 7 | Empat potongan; pembilang dan penyebut 1/4; 1/8 dari kata; potongan tidak sama besar ditolak; 1/2 lebih besar dari 1/4; kue sepuluh bagian |
| Kebun Slamet (B) | 7 | 2/5 dibaca, pembilang 4/5, 2/5 < 4/5; 3/6 lebih luas dari 2/6; cara Adi (pembilang saja untuk 1/2 dan 3/8) keliru; lima dari delapan bagian; urutan 1/7, 4/7, 6/7 |
| Cokelat Helen (C) | 7 | 1/3 = 2/6 dari batang; tiga isian senilai; mengali pembilang saja ditolak; FPB 6 dan 12; 4/16 menjadi 1/4 |
| Roti dan Biskuit Ibu (D) | 7 | Tiga dari sepuluh roti; 3/10 = 0,3, 1/100 = 0,01, 0,25 = 25/100; 7/100 = 0,07; dua angka berarti penyebut 100; 0,4 = 4/10 |
| Pameran Pecahan Kelas 4 (E, pencapaian bab) | 8 | 1/4 > 1/5, 2/5 < 4/5, 3/6 = 1/2; 7/100 = 0,07; 5 dari 10 = 50%; 0,25 = 25%; 2,46 = 246%; 50 × 2 = 100 pada 20 dari 50 |

## Kejujuran konsep

- Perbandingan, kesamaan nilai, FPB, desimal, dan persen **dihitung dari data**, bukan ditulis tangan. Perbandingan pecahan memakai perkalian silang bilangan bulat; desimal dan persen disusun dari bilangan bulat (hasil bagi dan sisa), tanpa bilangan pecahan mesin sehingga tidak ada kesalahan pembulatan. Uji membandingkannya dengan hitungan mandiri (pembagian, `toFixed`, pencarian pembagi).
- Pecahan hanya yang wajar (pembilang kurang dari penyebut) pada A, B, C, dan D. Persen boleh lebih dari 100% (2,46 = 246%) hanya di E.
- Potongan harus sama besar agar bisa disebut 1/n: lab menolak mengarsir bila potongan digambar tidak sama besar. Penyebut makin besar berarti tiap bagian makin kecil.
- Membandingkan lewat pembilang hanya bila penyebut sama. Bila penyebut berbeda, lab menolak dan menjelaskan bahwa bagiannya tidak sama besar; pembilang tidak dicatat sebagai pembanding.
- Pecahan senilai dibuat dengan mengubah pembilang dan penyebut sama-sama (kali atau bagi bilangan sama). Mengubah satu saja terbukti tidak senilai (perkalian silang) dan lab menjelaskannya. Bentuk paling sederhana dihitung dengan FPB (Euclid) dan dibandingkan pencarian pembagi mandiri.
- Satu angka di belakang koma berarti penyebut 10, dua angka berarti penyebut 100. Nol setelah koma tetap ditulis (7/100 = 0,07, bukan 0,7); nol di ujung boleh dihilangkan (0,10 = 0,1).
- Persen artinya per seratus. Cara biasa (lewat pecahan per seratus) dan cara langsung (kali 100% atau geser koma dua kali) menghasilkan hasil yang sama; dari persen ke desimal, koma digeser dua kali ke kiri. Cerita persen hanya untuk penyebut yang membagi 100.
- Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, dan semua pesan lab): A tanpa senilai, desimal, persen, FPB, dan urutan; B tanpa senilai, desimal, persen, dan FPB; C tanpa desimal dan persen; D tanpa persen dan geser koma.

## Coba ini! (ringkas)

- **A:** bagi pizza menjadi 4 bagian sama besar; nyalakan potongan tidak sama besar lalu coba arsir; bandingkan 1/2 dan 1/4; garis dibagi 8 lalu ketuk 1/8.
- **B:** atur batang menjadi 3/8; bandingkan 2/5 dan 4/5; ubah penyebut salah satu batang; ketuk pecahan yang bukan terkecil.
- **C:** 1/3 dikali 2; ubah pembilang saja; 6/12 dibagi 6; sederhanakan 4/16.
- **D:** atur 3/10 pada batang; 7/100 pada kisi (mengapa ada nol); 10 kotak (0,10 = 0,1); jembatan 25/100.
- **E:** kisi 36 kotak; 0,75 dengan dua cara; 2,46 menjadi persen; 20 dari 50 siswa.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua tampilan lab; berpindah tampilan lab mengosongkan pesan lab agar tidak menyesatkan. Suara memakai `speakGuru`; pecahan, desimal, persen, FPB, dan tanda hitung dieja oleh `ejaK4B2`.

## Uji

- `node --no-warnings scripts/uji-lab-k4b2.mjs`: pengeja suara; lima lab (identitas hitungan mandiri untuk semua pasangan kecil, mis. tanda 1/a dan 1/b, senilai lewat perkalian silang dibanding bentuk paling sederhana untuk semua pasangan sampai 24, desimal dan persen dibanding `toFixed`, fuzz 20.000 aksi per lab); lima mesin (struktur, permainan penuh, semua jawaban salah ditolak dengan petunjuk, kunci dan SEMUA pengecoh dihitung ulang mandiri dan terbukti bernilai lain, letak kunci bervariasi); lima skenario (kunci dihitung mandiri); struktur misi (tujuh wajib dan tiga bebas per sub-bab, id berawalan huruf sub-bab, keadaan awal tidak memenuhi misi mana pun); bukti tiap misi bisa dicapai lewat tombol alat dan near-miss tidak memenuhinya; gerbang; dan konsep tidak bocor antar sub-bab, tanpa jaringan, tanpa `correct_index` atau `explanation` (1.266 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk lima skenario Kelas 4 Bab 2
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab2-ringkas.json`
