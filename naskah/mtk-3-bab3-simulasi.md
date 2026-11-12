# Matematika Kelas 3 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Bab: Pengukuran Panjang dan Berat (`mtk-3-bab3`, `FASE_B`, kelas 3). Komponen: `src/components/modul/SimulasiK3Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k3bab3.ts`, teks misi di `misi-teks-k3b3.ts`. Kelas 3 dimuat malas: registri memuat `SimulasiK3Bab3` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k3b3.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Jangkauan: panjang sampai 300 cm di Sub-Bab A dan sampai 100 m (10.000 cm) di Sub-Bab B. Berat sampai 5.000 g di Sub-Bab C dan sampai 20.000 g (20 kg) di Sub-Bab D. Ribuan ditulis dengan titik (`1.000`, dibaca seribu). Sub-Bab A hanya memakai sentimeter dan Sub-Bab C hanya memakai gram dan kilogram yang dibaca dari alat; hubungan satuannya baru muncul di Sub-Bab B dan D.

Berkas Materi bab ini tidak diubah (`data-k3b3.ts`, `naskah-k3b3.ts`, `paket-k3b3.ts`, `SubBabK3B3A–D.tsx`, `kit-k3b3.tsx`, `mesin-k3b3.tsx`, dan lainnya). Tokoh dan istilah mengikuti Materi: Alfa dan posyandu, Meutia dengan pita, kain, dan bahan kue, stroberi 100 g dan 500 g, tinggi badan Azizah 1 m 17 cm, tepung 1.753 g, mangga 8.000 g.

## Alat

| Alat | Berkas | Metode | Dipakai |
|------|--------|--------|---------|
| Lab Penggaris | `SimulasiLabPenggarisK3.tsx` + `lab-penggaris-k3b3.ts` | PhET (manipulasi langsung) | A |
| Lab Meteran | `SimulasiLabMeteranK3.tsx` + `lab-meteran-k3b3.ts` | PhET | B |
| Lab Timbangan (digital dan duduk) | `SimulasiLabTimbangK3.tsx` + `lab-timbang-k3b3.ts` | PhET | C |
| Lab Timbangan Kodok (tampilan Bandul dan Ubah Berat) | `SimulasiLabKodokK3.tsx` + `lab-kodok-k3b3.ts` | PhET | D |
| Mesin berstasiun (empat definisi) | `SimulasiMesinBertahapK3.tsx` (dari Bab 1, sudah di HEAD) + `mesin-data-k3b3.ts` | Mesin keadaan | A sampai D |
| Skenario (empat) | `SimulasiSkenario.tsx` + `skenario-k3b3.ts` | Skenario kontekstual | A sampai D |

Pembantu: `atur-k3b3.tsx` (pengatur −10, −1, +1, +10) dan `eja-k3b3.ts` (pengeja suara sampai 99.999, titik ribuan, dan satuan; `ejaK3` Bab 1 hanya sampai 1.000).

Lab 3D tidak dipakai (isi bab bukan bangun ruang). CPA tetap di Concrete, Picture, Abstract. Mengapa laboratorium langsung: kesalahan terbesar pada pengukuran adalah tidak mulai dari nol; pada lab, kesalahan itu bisa dicoba dan akibatnya terlihat (bacaan tidak sama dengan panjang atau berat benda), bukan hanya dihafal.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib dan tiga atau empat tantangan bebas. Sub-Bab D menjadi simulasi pencapaian misi bab (skenario Pasar Meutia mengulang panjang dan berat). Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya.

| Sub-bab | Alat | Misi wajib | Tantangan bebas |
|---------|------|------------|-----------------|
| A · Pengukuran Panjang | Lab Penggaris + Mesin Ukur + skenario Posyandu Alfa | Ukur pensil dari nol; baca saat belum di nol dan lihat bacaannya keliru; ukur benda panjang dengan meteran dari nol; tiga benda berbeda dengan alat yang tepat; tuntas mesin; tuntas skenario | Buku tulis 30 cm (pas sampai ujung penggaris); pasang benda panjang di penggaris dan lihat lab menolak; lima benda berbeda |
| B · Hubungan Satuan Panjang | Lab Meteran + Mesin Ubah Panjang + skenario Pita Meutia | Pita 1 m 17 cm menjadi 117 cm; 400 cm dibagi 100 sama dengan 4 m; tambah sentimeter sampai 100 cm ditukar 1 m; sambung 4 m 37 cm + 7 m 43 cm; potong 75 m 80 cm − 38 m 45 cm; tuntas mesin; tuntas skenario | Sambung dengan simpan (sentimeter lebih dari 100); potong dengan pinjam 1 m; 10 m sama dengan 1.000 cm |
| C · Pengukuran Berat | Lab Timbangan + Mesin Timbang + skenario Bahan Kue Meutia | Atur timbangan ke nol; telur di digital dari nol; semangka di timbangan duduk dari nol; baca saat belum di nol dan lihat hasilnya keliru; tiga benda berbeda dari nol; tuntas mesin; tuntas skenario | Gula 1.000 g; stroberi 100 g dan 500 g (selisih); tepung di timbangan duduk, jarum di antara dua angka |
| D · Hubungan Satuan Berat (pencapaian bab) | Lab Timbangan Kodok + Mesin Ubah Berat + skenario Pasar Meutia | Seimbangkan tepung 750 g dengan bandul; dua susunan bandul berbeda untuk satu benda; 1.000 g dengan Gram dan Ons (1 kg = 10 ons = 1.000 g); 1.753 g = 1 kg 753 g; 4 kg 150 g = 4.150 g; tuntas mesin; tuntas skenario | Tiga susunan berbeda; 8.000 g = 8 kg; jeruk 2.000 g dengan tepat lima bandul |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji):

- Lab Penggaris: pensil 15 cm di penggaris, ujung kirinya di angka 3 (bukan nol), belum ada pengukuran.
- Lab Meteran: pita kosong (0 cm), satu pita, semua tampilan mati.
- Lab Timbangan: timbangan digital menunjukkan 50 g dan jarum timbangan duduk di 1 kg sebelum ada benda (keduanya bukan nol), telur, belum diletakkan.
- Lab Timbangan Kodok: tepung 750 g, tanpa bandul, berat yang diubah 0, semua tampilan mati.
- Mesin: stasiun pertama, kasus pertama, belum ada langkah. Skenario: adegan pertama.

## Lab Penggaris

Benda (penghapus 5, krayon 9, pensil 15, buku tulis 30, meja 120, lemari 150, pintu 200, papan tulis 240 cm) digambar sebagai batang polos di atas penggaris (sampai 30 cm, digeser per 1 cm) atau meteran (sampai 300 cm, digeser per 1 dan per 10 cm). Tombol **Baca panjang**: dari nol, panjang terbaca dan tercatat; bukan dari nol, lab menjelaskan bahwa ujung kanan di angka awal ditambah panjang dan itu bukan panjang benda. Benda yang lebih panjang dari alat ditolak. Alat yang tepat (sampai 30 cm penggaris, selebihnya meteran) menentukan pengukuran mana yang dihitung untuk misi; pengukuran dengan alat yang kurang tepat tetap benar tetapi diberi catatan.

## Lab Meteran

Pita disimpan sebagai sentimeter (0 sampai 10.000) dan digambar dari potongan 1 m (merah), 10 cm (biru), dan 1 cm (kuning). Sepuluh potongan kecil otomatis tertukar satu potongan yang lebih besar, seperti penukaran tiga kemasan di Kelas 3 Bab 1. Satu pita: tampilan Meter dan cm, Sentimeter, Garis meteran (sampai 4 m), dan Ubah satuan (kali 100 atau bagi 100). Dua pita: Sambung atau Potong dengan Langkah hitung per satuan, menukar 100 cm menjadi 1 m, atau meminjam 1 m. Sambungan lebih dari 100 m dan pemotongan pita yang lebih panjang ditolak.

## Lab Timbangan

Timbangan digital (layar dalam gram) dan timbangan duduk (jarum, satu putaran 5 kg). Awalnya keduanya tidak di nol. **Atur ke 0**, **Letakkan benda**, **Baca berat**. Bila tidak dari nol, bacaan adalah angka awal ditambah berat benda, jadi hasilnya keliru dan lab menjelaskannya. Timbangan duduk hanya terbaca jelas pada berat bulat kilogram; selain itu jarum berhenti di antara dua angka dan lab menyarankan timbangan digital. Bacaan lebih dari 5.000 g ditolak.

## Lab Timbangan Kodok

**Bandul:** lima jenis bandul (½ ons 50 g, 1 ons 100 g, 2 ons 200 g, ½ kg 500 g, 1 kg 1.000 g), masing-masing paling banyak 10. Timbangan seimbang bila jumlah bandul tepat sama dengan berat benda. Banyak susunan yang benar; susunan seimbang yang berbeda dicatat per benda (tidak dicatat dua kali), dan lab menunjukkan banyak susunan yang mungkin (dihitung, mis. tepung 750 g punya puluhan susunan). **Ubah Berat:** berat dalam gram (0 sampai 20.000) dengan tampilan Gram, Ons, dan Kilogram dan gram, serta penjelasan kali 1.000 atau ambil tiap 1.000.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari bilangan kasusnya.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Ukur (A) | Alat → Nol → Baca → Tulis | pensil 15 cm, buku tulis 30 cm, lemari 150 cm |
| Mesin Ubah Panjang (B) | Hubungan → Cara → Hitung → Periksa | 3 m ke cm, 700 cm ke m, 1 m 17 cm ke cm |
| Mesin Timbang (C) | Nol → Timbangan → Baca → Satuan | telur 250 g, semangka 3 kg, tepung 1.250 g |
| Mesin Ubah Berat (D) | Hubungan → Cara → Hitung → Periksa | 3 kg ke g, 1.753 g ke kg dan g, 4 kg 150 g ke g |

Pengecoh bersumber dari kesalahan umum: angka di ujung kanan sebelum digeser, satu lebih dan satu kurang, lupa mengalikan 100 atau 1.000 (atau mengalikan 10 kali lebih banyak), salah memotong angka (1.753 g menjadi 17 kg 53 g), timbangan atau penggaris yang salah, dan satuan panjang pada berat.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Posyandu Alfa (A) | 7 | Alat untuk tinggi badan 90 cm; cara mengukur dari nol; hitung 9 cm; penghapus dari angka 3 (8 − 3 = 5); isi batang 14 cm |
| Pita Meutia (B) | 8 | 3 m ke 300 cm; 700 cm, 1 m 17 cm; hitung 6 potongan; cara menyambung; isi 5 m; sisa kain 37 m 35 cm |
| Bahan Kue Meutia (C) | 7 | Layar 50 g sebelum ada benda; telur 250 g, timbangan duduk 3 kg; gram untuk tepung dan kilogram untuk beras; isi 8 kantong 100 g |
| Pasar Meutia (D, pencapaian bab) | 8 | Hubungan kg, ons, g; tepung 750 g dengan bandul; 1.753 g; 8 kg mangga; sambung kain 11 m 80 cm; sepuluh bandul 1 ons sama dengan 1 kg |

## Kejujuran konsep

- Pengukuran selalu dimulai dari angka nol. Bila tidak, bacaan di ujung adalah angka awal ditambah panjang atau berat, dan lab menyebutkannya, bukan sekadar menolak.
- Alat dan satuan dipilih sesuai benda: penggaris sampai 30 cm dan meteran selebihnya; timbangan untuk berat, bukan panjang; gram untuk benda ringan dan kilogram untuk benda berat. Pengukuran dengan alat yang kurang tepat tetap benar tetapi diberi catatan.
- 1 m = 100 cm. Meter ke sentimeter dikali 100, sentimeter ke meter dibagi 100. 1 m 17 cm = 100 cm + 17 cm = 117 cm. Seratus sentimeter ditukar satu meter di lab dan di langkah hitung.
- Sambung dan potong dihitung per satuan sama (meter dengan meter, sentimeter dengan sentimeter), dengan menukar 100 cm menjadi 1 m atau meminjam 1 m yang sama dengan 100 cm.
- 1 kg = 1.000 g = 10 ons dan 1 ons = 100 g. Kilogram ke gram dikali 1.000, gram ke kilogram diambil tiap 1.000 (1.753 g = 1 kg 753 g).
- Berat benda adalah jumlah bandul yang membuat timbangan seimbang, dan susunan bandul yang benar lebih dari satu. Papan tidak menandai satu susunan sebagai satu-satunya jawaban.
- Timbangan duduk hanya terbaca jelas pada berat bulat kilogram; selain itu lab jujur menyatakan jarum berada di antara dua angka.
- Gambar hanya batang, potongan polos, layar, jarum, dan angka, bukan gambar benda, sehingga batas Concrete dan Picture terjaga.

## Coba ini! (ringkas)

- **Lab Penggaris:** baca pensil sebelum digeser; geser ke nol dan baca lagi; pintu di penggaris lalu di meteran; buku tulis 30 cm.
- **Lab Meteran:** tambah sentimeter sampai 100; 3 m dengan Ubah satuan; sambung 4 m 37 cm dan 7 m 43 cm; potong dengan pinjam.
- **Lab Timbangan:** timbang telur sebelum dan sesudah diatur ke nol; semangka di timbangan duduk; tepung di timbangan duduk.
- **Lab Timbangan Kodok:** seimbangkan tepung 750 g dengan beberapa susunan; 1.000 g dengan Ons; 1.753 g; 4 kg 150 g.
- **Mesin:** ketuk stasiun lanjutan sebelum waktunya dan lihat mesin menolak; bandingkan dua kasus.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua tampilan lab. Suara memakai `speakGuru`; angka, titik ribuan, tanda hitung, dan satuan dieja oleh `ejaK3B3`.

## Uji

- `node --no-warnings scripts/uji-lab-k3b3.mjs`: pengeja suara (0 sampai 20.000 unik), empat lab (semua posisi awal penggaris dan meteran, semua pasangan benda dan timbangan, 4.000-an pasangan sambung dan potong, `teksMC`, `teksKgG`, dan `teksOns` dapat dibalik untuk semua nilai, jumlah susunan bandul dicek dengan pencacahan mandiri, fuzz 20.000 aksi tiap lab), empat mesin (struktur, permainan penuh, kunci dihitung ulang mandiri), struktur misi, keadaan awal tidak memenuhi misi, bukti tiap misi bisa dicapai lewat tombol alat dan tidak tercapai oleh keadaan yang hampir benar, gerbang, dan konsep tidak bocor antar sub-bab (1.643 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk empat skenario Kelas 3 Bab 3
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas3-bab3-ringkas.json`
