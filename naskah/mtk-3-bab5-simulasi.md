# Matematika Kelas 3 · Bab 5 · Simulasi SMISCPA (pola hibrida)

Bab: Penyajian Data dalam Tabel (`mtk-3-bab5`, `FASE_B`, kelas 3). Komponen: `src/components/modul/SimulasiK3Bab5.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k3bab5.ts`, teks misi di `misi-teks-k3b5.ts`. Kelas 3 dimuat malas: registri memuat `SimulasiK3Bab5` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k3b5.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya dua sub-bab: A (mengurutkan dan membandingkan data: urutan, data terkecil dan terbesar, jangkauan, selisih, dan banyak nilai dengan turus) dan B (menyajikan data dalam bentuk tabel: turus kelompok lima, tabel tiga kolom, data manik dan huruf, serta membaca tabel). Sub-Bab A tidak memakai istilah tabel, kolom, kelompok lima, data huruf, manik, lidi, atau "lebih dari" dan "kurang dari" yang menjumlahkan baris; semuanya diuji. Sub-Bab B menjadi simulasi pencapaian misi bab: skenario Laporan Kelas mengulang terkecil, terbesar, dan jangkauan (A) bersama turus kelompok lima, tabel, lebih dari, dan kurang dari (B).

Berkas Materi bab ini tidak diubah (`data-k3b5.ts`, `naskah-k3b5.ts`, `paket-k3b5.ts`, `SubBabK3B5A–B.tsx`, `kit-k3b5.tsx`, dan lainnya). Tokoh dan istilah mengikuti Materi: Alen, Meutia, Galih, Alfa, Andi, Beni, Citra, Dewi; nilai ulangan buku (20 data); manik merah, biru, hitam; kata STATISTIKA dan MATEMATIKA.

Catatan data: Materi memuat dua data nilai yang berbeda, `DATA_ULANGAN` (cerita: nilai 9 lima kali, nilai 10 dua kali) dan `TABEL_NILAI` (nilai 9 enam kali). Simulasi memakai `DATA_ULANGAN` karena data itulah yang diceritakan di video A-V3 dan B-V3. Dengan data ini nilai 7 dan 9 sama-sama paling sering (5 kali), lebih dari 7 = 3 + 5 + 2 = 10, dan kurang dari 7 = 1 + 4 = 5.

## Alat

| Alat | Berkas | Metode | Dipakai |
|------|--------|--------|---------|
| Lab Data Kelompok (tampilan Kumpul, Bandingkan, Cacah) | `SimulasiLabDataK3.tsx` + `lab-data-k3b5.ts` | PhET (manipulasi langsung) | A |
| Lab Tabel (tampilan Turus, Isi Tabel, Baca) | `SimulasiLabTabelK3.tsx` + `lab-tabel-k3b5.ts` | PhET | B |
| Mesin berstasiun (dua definisi) | `SimulasiMesinBertahapK3.tsx` (dari Bab 1, sudah di HEAD) + `mesin-data-k3b5.ts` | Mesin keadaan | A, B |
| Skenario (dua) | `SimulasiSkenario.tsx` + `skenario-k3b5.ts` | Skenario kontekstual | A, B |

Pembantu: `eja-k3b5.ts` (pengeja suara: bilangan, tanda hitung, titik-titik, dan turus "卌 卌 |||" dieja "dua kelompok lima dan tiga garis") dan `turus-k3b5.tsx` (gambar turus: tiap garis kelima dicoret miring).

Lab 3D tidak dipakai (isi bab data, bukan bangun ruang). CPA tetap di Concrete, Picture, Abstract. Mengapa laboratorium langsung: kesalahan khas bab ini adalah menganggap data pertama sebagai terkecil, menjumlahkan terbesar dan terkecil untuk jangkauan, menulis garis kelima tegak, dan ikut menghitung nilai acuan pada "lebih dari 7". Di lab anak membangun datanya sendiri, dan setiap urutan, jangkauan, banyak nilai, dan jumlah baris dihitung dari data itu, sehingga akibat kesalahannya terlihat.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib dan tiga tantangan bebas. Sub-Bab B menjadi simulasi pencapaian misi bab.

| Sub-bab | Alat | Misi wajib | Tantangan bebas |
|---------|------|------------|-----------------|
| A · Mengurutkan dan Membandingkan Data | Lab Data Kelompok + Mesin Urut + skenario Pemilihan Ketua Kelas | Ubah data lalu urutkan dari terkecil dan dari terbesar; Terkecil dan Terbesar saat data belum diurutkan dan anak pertama bukan yang terkecil; jangkauan tepat 5 dengan Jangkauan menyala; bandingkan dua anak berselisih 4; cacah semua 20 kartu nilai ulangan; tuntas mesin; tuntas skenario | Jangkauan 0 (semua sama banyak); dua anak sama-sama terbanyak; cacah nilai kuis (terkecil 6, bukan 5) |
| B · Menyajikan Data dalam Bentuk Tabel (pencapaian bab) | Lab Tabel + Mesin Tabel + skenario Laporan Kelas | Turus 13 (dua kelompok lima dan tiga garis); tabel manik lengkap dan benar; tabel STATISTIKA lengkap dan benar; baca huruf terbanyak dan tersedikit pada STATISTIKA; baca lebih dari 7 pada tabel nilai; tuntas mesin; tuntas skenario | Turus 20; kurang dari 7; huruf tersedikit MATEMATIKA (tiga huruf sama sedikit) |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji):

- Lab Data Kelompok: Alen 6, Meutia 3, Galih 9, Alfa 4, Andi 7 (anak pertama bukan yang terkecil, jangkauan 6, terbesar tunggal), urutan duduk, semua tampilan mati, belum ada pilihan, kartu belum dicacah.
- Lab Tabel: turus 0, tabel manik kosong, belum ada pertanyaan, acuan 7.
- Mesin: stasiun pertama, kasus pertama. Skenario: adegan pertama.

## Lab Data Kelompok

**Kumpul:** lima anak, banyak benda 1 sampai 12 (titik polos, −1/+1). Pilihan Urutan duduk, Dari terkecil, Dari terbesar (yang sama banyak tetap menurut urutan duduk). **Terkecil dan Terbesar** menandai SEMUA anak yang bernilai terkecil atau terbesar dan memberi keterangan "sama banyak" bila lebih dari satu. **Jangkauan** menampilkan "Jangkauan = terbesar − terkecil = hasil".
**Bandingkan:** ketuk dua anak; kalimat "Meutia punya 4 benda lebih banyak daripada Alen: 7 − 3 = 4" atau "sama banyak, selisihnya 0" dihitung; titik kelebihan disorot kuning.
**Cacah:** 20 kartu nilai ulangan (atau 15 kartu nilai kuis). Tiap kartu diketuk menjadi satu garis turus pada baris nilainya (5 sampai 10); kartu yang sama tidak bisa dicacah dua kali. Setelah semua kartu dicacah: terkecil, terbesar, jangkauan, dan nilai paling sering (nilai 7 dan 9 sama-sama 5 kali) dihitung.

## Lab Tabel

**Turus:** tambah atau hapus garis 0 sampai 20. Garis kelima selalu dicoret miring; kalimat "2 kelompok lima dan 3 garis = 5 + 5 + 3 = 13" dihitung.
**Isi Tabel:** data manik (merah 6, biru 4, hitam 3), huruf STATISTIKA, huruf MATEMATIKA, atau nilai ulangan (baris diurutkan dari terkecil). Tiap benda atau huruf diketuk menjadi turus pada barisnya; kolom Banyak diisi anak (−/+) dan ditandai ✓ bila sama dengan turusnya. Tabel lengkap bila semua sudah dicacah dan semua angka sama dengan turusnya.
**Baca:** hanya untuk tabel yang lengkap. Terbanyak dan tersedikit (yang sama banyak disebut semua), lebih dari dan kurang dari (hanya untuk tabel nilai, acuan 5 sampai 10). Baris yang dijumlahkan disorot; nilai acuan sendiri tidak ikut. Semua jawaban dihitung dari data, bukan dari isian anak.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari data kasusnya; letak kunci diputar.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Urut (A) | Urutkan → Ujung → Jangkauan → Banyak | Anggota keluarga 4, 3, 5, 6, 3; nilai ulangan 8, 6, 9, 6, 10, 7, 6 (dari terbesar); kue 7, 9, 4, 9, 5 |
| Mesin Tabel (B) | Turus → Banyak → Baca → Banding | Manik (13), huruf STATISTIKA (10), nilai ulangan (20) |

Pengecoh bersumber dari kesalahan umum: urutan terbalik, data belum diurutkan, data pertama dan terakhir dianggap terkecil dan terbesar, jangkauan ditambah, data pertama dipakai sebagai terkecil, banyak semua data dikira banyak satu nilai, garis miring kelompok lima tidak dihitung, selisih dijumlahkan, nilai acuan ikut dihitung (15, bukan 10), dan banyak baris dikira banyak siswa.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Pemilihan Ketua Kelas (A) | 7 | Suara Alen 7, Citra 4, Beni 9, Dewi 5; ketuk 9 stik suara Beni; urutan 4, 5, 7, 9; terkecil 4; jangkauan 9 − 4 = 5; ketua dari suara terbanyak; jangkauan bukan 9 + 4 dan bukan 9 − 7; isi 5 stik selisih Beni dan Citra |
| Laporan Kelas (B, pencapaian bab) | 8 | Nilai ulangan 20 siswa; terkecil 5, terbesar 10, 10 − 5 = 5; ketuk 5 stik nilai 9; garis kelima dicoret miring; 卌 卌 ||| = 13; kolom ketiga berisi banyak; T pada STATISTIKA 3 kali; lebih dari 7 = 10 siswa; isi 5 stik kurang dari 7 |

## Kejujuran konsep

- Urutan, data terkecil, data terbesar, jangkauan, selisih, banyak nilai, dan jumlah baris **dihitung dari data**, tidak ditulis tangan. Data hanya 1 sampai 12 (lab A) dan 0 sampai 20 (lab B), tanpa bilangan negatif.
- Data pertama belum tentu terkecil. Bila dua anak sama-sama terkecil atau terbesar, keduanya ditandai dan diberi keterangan "sama banyak", supaya anak tidak mengira hanya ada satu.
- Jangkauan adalah selisih (dikurangi), bukan jumlah. Semua sama banyak berarti jangkauan 0.
- Garis kelima turus selalu dicoret miring di atas empat garis tegak; tidak pernah ada lima garis tegak berjajar.
- Kolom banyak harus sama dengan turusnya. Tabel tidak dianggap lengkap selama ada benda yang belum dicacah atau angka yang belum sama.
- "Lebih dari 7" dan "kurang dari 7" tidak memasukkan nilai 7. Nilai ulangan buku punya dua nilai terbanyak (7 dan 9), jadi lab menyebut keduanya.
- Gambar hanya titik, titik warna (manik), huruf, garis turus, dan angka, bukan gambar benda, sehingga batas Concrete dan Picture terjaga.

## Coba ini! (ringkas)

- **Lab Data Kelompok:** ubah banyak benda Galih lalu urutkan; nyalakan Terkecil dan Terbesar sebelum mengurutkan; buat jangkauan 5 dan 0; cacah nilai ulangan.
- **Lab Tabel:** turus sampai 13; isi kolom banyak berbeda dari turus; lengkapi tabel STATISTIKA; bandingkan lebih dari 7 dan kurang dari 7.
- **Mesin:** ketuk stasiun lanjutan sebelum waktunya dan lihat mesin menolak; bandingkan tiga kasus.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua tampilan lab. Suara memakai `speakGuru`; angka, tanda hitung, dan turus dieja oleh `ejaK3B5`.

## Uji

- `node --no-warnings scripts/uji-lab-k3b5.mjs`: pengeja suara; Lab Data Kelompok (urutan, kestabilan, jangkauan, terkecil dan terbesar dengan yang sama banyak untuk 9.504 kombinasi dibandingkan hitungan mandiri; 144 pasangan Bandingkan; cacah dua set data; batas; fuzz 20.000 aksi); Lab Tabel (frekuensi empat tabel, turus 0 sampai 20, 96 pertanyaan baca tabel dihitung mandiri, lengkap dan hampir lengkap, fuzz 20.000 aksi); dua mesin (struktur, permainan penuh, semua jawaban salah ditolak, kunci dan SEMUA pengecoh dihitung ulang mandiri, letak kunci bervariasi); dua skenario (kunci dihitung ulang dari data); struktur misi; keadaan awal tidak memenuhi misi; bukti tiap misi bisa dicapai lewat aksi alat dan tidak tercapai oleh keadaan yang hampir benar; gerbang; konsep B tidak bocor ke misi, mesin, skenario, ucapan, dan komponen A; dan data ringkas selaras dengan lab (828 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk dua skenario Kelas 3 Bab 5
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas3-bab5-ringkas.json`
