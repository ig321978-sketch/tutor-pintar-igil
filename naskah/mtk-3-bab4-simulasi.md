# Matematika Kelas 3 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Bab: Unsur-Unsur Bangun Datar (`mtk-3-bab4`, `FASE_B`, kelas 3). Komponen: `src/components/modul/SimulasiK3Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k3bab4.ts`, teks misi di `misi-teks-k3b4.ts`. Kelas 3 dimuat malas: registri memuat `SimulasiK3Bab4` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k3b4.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya tiga sub-bab: A (sisi bangun datar: ruas garis, ukuran dalam cm dan mm), B (sudut pada bidang datar), dan C (garis tegak lurus dan sejajar, serta bangun datar sederhana). Sub-Bab A tidak memakai sudut, derajat, ⊥, atau //; Sub-Bab B tidak memakai ⊥ dan //. Sub-Bab C menjadi simulasi pencapaian misi bab: skenario Pagar Taman mengulang ruas garis (55 mm), sudut siku-siku, garis, dan bangun.

Berkas Materi bab ini tidak diubah (`data-k3b4.ts`, `naskah-k3b4.ts`, `paket-k3b4.ts`, `SubBabK3B4A–C.tsx`, `kit-k3b4.tsx`, `mesin-k3b4.tsx`, dan lainnya). Tokoh dan istilah mengikuti Materi: segitiga EFG, ruas garis MN 5 cm 5 mm, sudut AOB, AB ⊥ BC, EF // GH, jarak 2 dan 4 petak.

## Alat

| Alat | Berkas | Metode | Dipakai |
|------|--------|--------|---------|
| Lab Ruas Garis (tampilan Jenis, Ukur, Sisi) | `SimulasiLabRuasK3.tsx` + `lab-ruas-k3b4.ts` | PhET (manipulasi langsung) | A |
| Lab Sudut (tampilan Strip, Busur, Satuan) | `SimulasiLabSudutK3.tsx` + `lab-sudut-k3b4.ts` | PhET | B |
| Lab Dua Garis (tampilan Dua Garis, Bangun) | `SimulasiLabGarisK3.tsx` + `lab-garis-k3b4.ts` | PhET | C |
| Mesin berstasiun (tiga definisi) | `SimulasiMesinBertahapK3.tsx` (dari Bab 1, sudah di HEAD) + `mesin-data-k3b4.ts` | Mesin keadaan | A, B, C |
| Skenario (tiga) | `SimulasiSkenario.tsx` + `skenario-k3b4.ts` | Skenario kontekstual | A, B, C |

Pembantu: `eja-k3b4.ts` (pengeja suara untuk derajat, ⊥, //, ∠, desimal 5,5, cm, dan mm; `ejaK3` Bab 1 dan `ejaK3B3` tidak menangani semuanya) dan `atur-k3b3.tsx` (pengatur −10, −1, +1, +10 dari Bab 3, sudah di HEAD).

Lab 3D tidak dipakai (isi bab bangun datar, bukan bangun ruang). CPA tetap di Concrete, Picture, Abstract. Mengapa laboratorium langsung: kesalahan terbesar pada pengukuran adalah tidak mulai dari nol, dan pada garis adalah menyebut dua garis sejajar atau tegak lurus karena tampak; pada lab, hubungan dua garis dihitung dari arahnya dan kesalahan itu bisa dicoba dengan akibat yang terlihat.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib dan tiga atau empat tantangan bebas. Sub-Bab C menjadi simulasi pencapaian misi bab.

| Sub-bab | Alat | Misi wajib | Tantangan bebas |
|---------|------|------------|-----------------|
| A · Sisi Bangun Datar | Lab Ruas Garis + Mesin Ruas Garis + skenario Peta Alfa | Sinar garis ke satu sisi (arah pangkal ditolak) dan garis ke dua sisi; dua titik: satu ruas lurus dan tiga kurva berbeda; ukur MN dari nol dengan mm dan cm desimal (5 cm 5 mm = 55 mm = 5,5 cm); baca saat belum di nol dan lihat bacaannya keliru; tandai semua sisi segitiga dan segilima; tuntas mesin; tuntas skenario | Ukur PQ 3 cm 7 mm = 3,7 cm; coba perpanjang ruas garis dan lihat lab menolak; tandai semua sisi segienam |
| B · Sudut | Lab Sudut + Mesin Sudut + skenario Pintu Meutia | Putar sampai 90° dengan pojok kertas; sudut 50° dengan busur derajat; temukan sudut lancip, siku-siku, tumpul, dan lurus dengan Jenis sudut menyala; sudut refleks 300° dengan pasangan 60°; sudut 90° diukur 3 irisan besar dan 6 irisan kecil; tuntas mesin; tuntas skenario | 180° dan dua sudut siku-siku; kaki berimpit 0°; sudut 135°; sudut refleks 230° dan pasangan 130° |
| C · Garis Tegak Lurus dan Sejajar (pencapaian bab) | Lab Dua Garis + Mesin Garis + skenario Pagar Taman | Dua garis tegak lurus dengan Lambang; dua garis sejajar dengan Lambang dan Jarak petak; dua garis yang bukan keduanya dengan jarak atau kedudukan di ujung kiri dan kanan berbeda; rakit dua batang (belum tertutup) dan tiga batang (segitiga); lingkaran dengan Sudut menyala; tuntas mesin; tuntas skenario | Sejajar pada garis miring; dua garis berimpit bukan dua garis sejajar; ciri persegi lengkap; segienam dari enam batang |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji):

- Lab Ruas Garis: sinar garis, ruas AB (50 mm) dengan titik A di 20 mm (bukan nol), belum ada riwayat, semua tampilan mati.
- Lab Sudut: sudut 30°, semua tampilan mati, belum ada riwayat jenis dan satuan.
- Lab Dua Garis: garis biru mendatar, garis merah miring 45° melalui titik tengah (bukan sejajar dan bukan tegak lurus), semua tampilan mati, belum ada batang.
- Mesin: stasiun pertama, kasus pertama, belum ada langkah. Skenario: adegan pertama.

## Lab Ruas Garis

**Jenis:** sinar garis berpangkal di titik kiri dan hanya bisa diperpanjang ke kanan (ke arah pangkal ditolak); garis bisa diperpanjang ke dua sisi dan tidak punya ujung; ruas garis tidak bisa diperpanjang. Dua titik P dan Q: satu ruas garis lurus dan empat kurva yang bisa dipilih (banyak kurva).
**Ukur:** enam ruas (AB 50, MN 55, PQ 37, KL 82, RS 120, EF 145 mm) di atas penggaris 0 sampai 150 mm. Digeser per 1 dan 10 mm. **Baca panjang** dari nol: panjang tercatat dan bisa ditampilkan dalam mm dan dalam cm desimal. Bukan dari nol: lab menjelaskan bahwa bacaan titik akhir bukan panjang ruas garis.
**Sisi:** segitiga EFG, segiempat GHIJ, segilima, dan segienam. Ketuk tiap sisi untuk menandainya; banyak sisi sama dengan banyak titik sudut.

## Lab Sudut

Kaki OA tetap, kaki OB diputar 0° sampai 360° (±1, ±10, ±45). **Strip:** dibandingkan dengan pojok kertas lipat (90°). **Busur:** derajat dibaca hanya sampai 180°; sudut refleks dibaca lewat pasangan (360° dikurangi sudut refleks). **Jenis sudut** dihitung dari perbandingan dengan 90° dan 180°. **Satuan:** sudut 30° sampai 180° ditutup irisan besar (30°) atau irisan kecil (15°); sudut yang sama menjadi bilangan berbeda, sehingga derajat diperlukan.

## Lab Dua Garis

**Dua Garis:** garis biru dan merah pada kertas berpetak 8 × 8. Arah tiap garis 0°, 45°, 90°, atau 135° (putar per 45°); garis merah digeser −3 sampai 3 petak. Hubungan dihitung dari arah: sejajar bila arahnya sama dan tidak berimpit, tegak lurus bila perkalian titik vektor arah nol, berimpit bila sejajar dengan geser 0, selebihnya bukan keduanya. Tegak lurus diberi tanda kotak kecil di titik potong. Jarak petak di ujung kiri dan kanan dihitung (dengan tanda: garis yang bersilang bukan sejajar walau selisihnya tampak sama besar).
**Bangun:** segitiga, persegi panjang, persegi, segilima, dan lingkaran, dengan tampilan banyak sisi, banyak sudut, sisi sama panjang, dan sudut siku-siku (lingkaran: tanpa sisi lurus dan tanpa sudut). **Rakit dari batang:** satu dan dua batang tidak membatasi bangun, tiga batang atau lebih membentuk bangun tertutup dengan banyak sisi sama dengan banyak sudut.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari data kasusnya.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Ruas Garis (A) | Jenis → Nol → Baca → Ubah | AB 5 cm, MN 5 cm 5 mm, PQ 3 cm 7 mm |
| Mesin Sudut (B) | Letak → Baca → Jenis → Periksa | 50°, 120°, 300° (refleks dibaca lewat pasangan 60°) |
| Mesin Garis (C) | Cek → Hubungan → Lambang → Bukti | AB ⊥ BC, EF // GH (jarak 2 dan 2), PQ dan RS bukan sejajar (jarak 2 dan 4) |

Pengecoh bersumber dari kesalahan umum: salah seratus (1 cm = 100 mm), salah nol (5,05 cm), satu lebih, skala busur yang salah (180° dikurangi), 360° ditambah pasangan, lambang ⊥ dan // yang tertukar, dan jarak berbeda yang disebut sejajar.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Peta Alfa (A) | 7 | Sinar senter sebagai sinar garis; 1 cm = 10 mm, 5 mm = 0,5 cm; ketuk 6 sisi segienam; MN dari angka 2 bukan dari nol; isi ruas 12 cm |
| Pintu Meutia (B) | 7 | Pintu makin lebar, sudut makin besar; 90°, 180°, dan pasangan 300° dan 60°; 6 irisan kecil 15°; baca skala busur yang benar; isi 3 irisan besar 30° |
| Pagar Taman (C, pencapaian bab) | 8 | Tiang dan palang tegak lurus; arti ⊥ dan //; ketuk 5 tiang; jarak 2 dan 4 petak bukan sejajar; palang 5 cm 5 mm = 55 mm; sudut sambungan 90° siku-siku |

## Kejujuran konsep

- Sinar garis hanya diperpanjang ke satu sisi, garis ke dua sisi tanpa ujung, dan ruas garis punya dua ujung dan panjang tetap. Dua titik berbeda hanya punya satu ruas lurus, tetapi banyak kurva.
- Mengukur dimulai dari angka 0. Bila tidak, lab menjelaskan bacaannya (bukan hanya menolak). 1 cm = 10 mm dan 5 mm = 0,5 cm, jadi 5 cm 5 mm = 55 mm = 5,5 cm; tidak ada 5,05 dan tidak ada 505.
- Sisi adalah ruas garis pembatas bangun datar, dan banyak sisi sama dengan banyak titik sudut. Lingkaran dibatasi garis lengkung, tidak punya sisi lurus dan tidak punya sudut. Kurang dari tiga batang tidak membentuk bangun tertutup.
- Sudut ditulis dengan titik sudut di tengah (∠AOB). Jenis sudut: lancip kurang dari 90°, siku-siku tepat 90°, tumpul antara 90° dan 180°, lurus tepat 180° (dua sudut siku-siku), refleks antara 180° dan 360°. Kaki berimpit (0°) dan putaran penuh (360°) tidak disebut jenis sudut bernama.
- Busur derajat hanya sampai 180°, jadi sudut refleks dibaca lewat pasangan dan ukurannya 360° dikurangi pasangan itu. Sepasang sudut yang jumlahnya 360° dihitung, tidak ditulis tangan.
- Sudut yang sama menjadi bilangan berbeda bila diukur dengan satuan tidak baku yang berbeda (90° = 3 irisan besar = 6 irisan kecil), sehingga satuan baku diperlukan.
- Tegak lurus berarti bertemu pada sudut siku-siku. Sejajar berarti jaraknya selalu sama dan tidak pernah bertemu. Hubungan dua garis **dihitung dari arahnya**. Dua garis yang berimpit hanya terlihat satu garis dan tidak disebut dua garis sejajar. Garis miring yang bersilang bisa tampak berjarak sama di ujung kiri dan kanan, tetapi tandanya berlawanan, jadi bukan sejajar.
- Gambar hanya garis, titik, busur, juring, dan bangun polos, bukan gambar benda, sehingga batas Concrete dan Picture terjaga.

## Coba ini! (ringkas)

- **Lab Ruas Garis:** perpanjang sinar ke kiri dan ke kanan; gambar banyak kurva antara P dan Q; ukur MN sebelum dan sesudah digeser ke nol; tandai sisi segitiga dan segienam.
- **Lab Sudut:** 90° dengan pojok kertas; 50° dengan busur; 300° dan pasangan 60°; 90° dengan irisan besar dan kecil.
- **Lab Dua Garis:** tegak lurus dengan tanda kotak; sejajar dengan jarak yang sama; garis miring 45° dari garis biru; 2 dan 3 batang.
- **Mesin:** ketuk stasiun lanjutan sebelum waktunya dan lihat mesin menolak; bandingkan dua kasus.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua tampilan lab. Suara memakai `speakGuru`; angka, derajat, lambang, desimal, dan satuan dieja oleh `ejaK3B4`.

## Uji

- `node --no-warnings scripts/uji-lab-k3b4.mjs`: pengeja suara; Lab Ruas Garis (teks ukuran dapat dibalik untuk semua 0 sampai 150 mm, semua ruas dan posisi penggaris, sinar, garis, ruas, dua titik, semua sisi bangun, fuzz 20.000 aksi); Lab Sudut (jenis, pasangan, baca busur, dan banding siku untuk semua 0 sampai 360°, irisan, fuzz); Lab Dua Garis (relasi, titik potong, dan selisih ujung untuk 112 kombinasi arah dan geser dibandingkan klasifikasi mandiri, titik siku-siku selalu di dalam kertas, ciri bangun, rakit batang, fuzz); tiga mesin (struktur, permainan penuh, kunci dihitung ulang mandiri); struktur misi; keadaan awal tidak memenuhi misi; bukti tiap misi bisa dicapai lewat tombol alat dan tidak tercapai oleh keadaan yang hampir benar; gerbang; dan konsep tidak bocor antar sub-bab (1.131 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk tiga skenario Kelas 3 Bab 4
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas3-bab4-ringkas.json`
