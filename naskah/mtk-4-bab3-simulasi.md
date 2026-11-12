# Matematika Kelas 4 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Bab: Pola Gambar dan Pola Bilangan (`mtk-4-bab3`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab3`). Komponen: `src/components/modul/SimulasiK4Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab3.ts`, teks misi di `misi-teks-k4b3.ts`. Dimuat malas: registri memuat `SimulasiK4Bab3` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k4b3.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **dua sub-bab**: A (pola gambar membesar dan mengecil) dan B (pola bilangan membesar dan mengecil). Sub-Bab B menjadi simulasi pencapaian misi bab: skenario Pameran Pola Kelas 4 mengulang pola gambar, beda, pola mengecil, telur peternak, dan produksi TV.

Berkas Materi bab ini tidak diubah (`SubBabK4B3A–B.tsx`, `naskah-k4b3.ts`, `data-k4b3.ts`, `paket-k4b3.ts`, dan lainnya). Angka mengikuti buku: jeruk 2, 4, 6 sampai kumpulan ke-7 = 14; permen 9, 7, 5 sampai kumpulan ke-5 = 1; pola 3, 5, 7, 9, 11; 1, 4, 7, 10; 23, 18, 13, 8; 32, 28, 24, 20, 16; 7, 19, 31, 43; telur 20, 28, 36 (hari ke-5 = 52); rak buku 5, 9, 13 (rak ke-5 = 21); kursi 20, 23, 26 (baris ke-5 = 32); dan produksi TV 70, 64, 58 (Juni = 40). Tokoh skenario (Dina, Raka) baru, karena Materi tidak memakai tokoh bernama.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Pola Gambar (Lanjut, Tabel, Buat) | `SimulasiLabPolaGambarK4B3.tsx` + `lab-pola-gambar-k4b3a.ts` | Mesin Pola Gambar | Jeruk dan Permen Dina |
| B | Lab Pola Bilangan (Selisih, Aturan, Tabel) | `SimulasiLabPolaBilanganK4B3.tsx` + `lab-pola-bilangan-k4b3b.ts` | Mesin Pola Bilangan | Pameran Pola Kelas 4 |

Mesin: `mesin-data-k4b3.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts` dari Bab 1 Kelas 3. Skenario: `skenario-k4b3.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab3-ringkas.json` (sub-bab A dan B).

Pembantu: `eja-k4b3.ts` (pengeja suara: "+2" dibaca "tambah dua", "−5" dibaca "kurang lima", "ke-7" dibaca "ketujuh", serta tanda hitung) dan `model-pola-k4b3.tsx` (kumpulan titik polos disusun baris berisi lima, deretan kumpulan, pengatur selisih bertanda, dan batang nilai; hanya bentuk polos berwarna).

Lab 3D tidak dipakai. CPA tetap di Concrete, Picture, Abstract; simulasi hanya memakai titik, batang, angka, dan bentuk polos. Metode: lab 2D bergaya PhET (manipulasi langsung), mesin keadaan, dan skenario kontekstual. Metode luar buku dianyam: Pola Bertambah dan Struktur Visual (titik dikelompokkan per lima) di A; Barisan Aritmetika Sederhana, Mesin Fungsi (tampilan Aturan), dan Tabel Nilai di B. Pola berulang bertipe unit (AB-AB) tidak dibuat karena data buku bab ini hanya berisi pola bertambah dan berkurang.

Mengapa laboratorium langsung: kesalahan khas bab ini adalah menghitung selisih dari kumpulan pertama dan ketiga, melanjutkan ke arah yang salah (menambah pada pola mengecil), memberi tanda beda yang terbalik, menyebut pola "membesar" karena bilangannya besar, dan meneruskan pola mengecil sampai di bawah nol. Di lab, anak membangun kumpulan, tabel, dan rantai sendiri, dan akibat setiap kesalahan terlihat.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Lanjutkan jeruk 2, 4, 6 (8 titik); lanjutkan permen 9, 7, 5 (3 titik); tabel jeruk sampai kumpulan ke-7 (14); tabel permen sampai kumpulan ke-5 (1); buat pola membesar selisih +3 dan satu pola mengecil | Selisih 0 (tetap, bukan membesar atau mengecil); lanjutkan permen setelah 1 (ditolak: habis); lanjutkan bintang 12, 9, 6 |
| B | Beda 1, 4, 7, 10 (+3) setelah mengetuk semua pasangan; beda 23, 18, 13, 8 (−5); tetapkan beda dengan tanda terbalik (ditolak dan dijelaskan); aturan +8 telur sampai hari ke-5 (52); tabel nilai rak buku sampai rak ke-5 (21) | Aturan −6 produksi TV sampai bulan ke-6 (40); tabel kursi sampai baris ke-5 (32); beda 7, 19, 31, 43 (+12) |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji): A Lanjut pada kotak 3, 6, 9 dengan kumpulan berikutnya kosong, Tabel jeruk tiga baris, Buat 2 dengan selisih +1 belum diperiksa; B Selisih pada 3, 5, 7, 9, 11 tanpa pasangan diketuk, Aturan pada lompat katak 1, 4, 7, Tabel pada kursi tiga baris; tanpa riwayat. Mesin mulai dari stasiun pertama; skenario dari adegan pertama.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari data kasusnya; letak kunci diputar.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Pola Gambar (A) | Hitung → Selisih → Jenis → Lanjut | jeruk 2, 4, 6; permen 9, 7, 5; bintang 12, 9, 6 |
| Mesin Pola Bilangan (B) | Selisih → Jenis → Lanjut → Dua Langkah | 3, 5, 7, 9, 11; 32, 28, 24, 20, 16; 7, 19, 31, 43 |

Stasiun Hitung memakai struktur visual: kumpulan ke-2 disusun dua baris, dan anak menggabungkan kedua baris. Pengecoh bersumber dari kesalahan umum: tanda selisih terbalik, selisih suku pertama dan ketiga (dua kali beda), melanjutkan ke arah yang salah, menambah satu saja, dan melangkah satu kali saat diminta dua. Semua pengecoh dihitung dan terbukti bernilai lain dari kunci, dan tidak ada pilihan negatif.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Jeruk dan Permen Dina (A) | 8 | Hitung kumpulan ketiga (6); selisih +2 (pengecoh 6 − 2 = 4); isi kumpulan keempat (8); tabel kumpulan kelima sampai ketujuh (10, 12, 14); permen mengecil; isi permen kumpulan kelima (1, lalu habis) |
| Pameran Pola Kelas 4 (B, pencapaian bab) | 8 | Rekap jeruk (8); 3, 5, 7, 9, 11 lalu 13 dan 23, 18, 13, 8 lalu 3; beda 1, 4, 7, 10 = +3; 32, 28, 24, 20, 16 lalu 12; telur hari ke-5 = 52 dan TV Juni = 40; "70, 64, 58 membesar karena bilangannya besar" ditolak |

## Kejujuran konsep

- Beda dan jenis pola **dihitung dari data**, bukan ditulis tangan: beda = selisih dua suku berurutan dan harus tetap untuk semua pasangan. Uji membandingkannya dengan hitungan mandiri yang berbeda (beda dari suku pertama dan terakhir dibagi banyak langkah, suku ke-n dengan rumus a + (n − 1) × d, jenis dari jumlah semua selisih), sedangkan kode memakai penjumlahan langkah demi langkah.
- Membesar berarti beda tambah, mengecil berarti beda kurang, dan selisih 0 berarti tetap (bukan keduanya). Jenis pola tidak ditentukan oleh besar kecilnya bilangan.
- Tanpa bilangan negatif (belum dipelajari di kelas 4): beda ditulis "+2" atau "−2" sebagai operasi tambah atau kurang, dan diucapkan "tambah dua" atau "kurang dua". Banyak benda dan suku tidak pernah kurang dari nol; pola mengecil berhenti di nol dan lab menjelaskan bahwa bendanya habis.
- Selisih dibaca dari dua kumpulan atau suku yang berurutan. Di Lab B, beda baru boleh ditetapkan setelah semua pasangan diketuk; tanda terbalik ditolak dan dijelaskan.
- Mesin aturan hanya menumbuhkan rantai bila keluarannya cocok dengan catatan buku, dan mengubah aturan memulai rantai lagi, sehingga setiap rantai panjang pasti memakai beda yang benar.
- Konsep Sub-Bab B tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, logika, semua pesan lab hasil fuzz, dan ucapan): A tanpa "pola bilangan", "barisan", "suku", "aturan", "masukan", "keluaran", "mesin fungsi", dan "tabel nilai"; A memakai "kumpulan" dan "selisih", dengan nilai paling besar 20 dan selisih paling besar 3 agar titik bisa dihitung.

## Coba ini! (ringkas)

- **A:** pilih jeruk lalu susun kumpulan berikutnya; isi tabel jeruk sampai kumpulan ke-7; lanjutkan permen setelah 1; atur selisih 0.
- **B:** ketuk semua pasangan 23, 18, 13, 8; tetapkan beda +5 untuk pola itu; pasang aturan yang salah untuk telur; isi rak buku sampai rak ke-5.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan semua tampilan lab; berpindah tampilan lab mengosongkan pesan lab agar tidak menyesatkan. Suara memakai `speakGuru`; beda bertanda, urutan, dan tanda hitung dieja oleh `ejaK4B3`.

## Uji

- `node --no-warnings scripts/uji-lab-k4b3.mjs`: pengeja suara; dua lab (beda, jenis, dan suku ke-n dibanding hitungan mandiri untuk semua pola; tabel dan rantai selalu cocok rumus; Buat diuji untuk semua pasangan awal dan selisih; pola mengecil berhenti sebelum kurang dari nol; fuzz 20.000 aksi per lab dengan riwayat tidak dicabut, dan semua pesan hasil fuzz dieja menjadi kata); dua mesin (struktur, permainan penuh, semua jawaban salah ditolak dengan petunjuk, kunci dan SEMUA pengecoh dihitung ulang mandiri, letak kunci bervariasi); dua skenario (kunci dihitung mandiri); struktur misi (tujuh wajib dan tiga bebas per sub-bab, keadaan awal tidak memenuhi misi mana pun); bukti tiap misi bisa dicapai lewat tombol alat dan near-miss tidak memenuhinya; gerbang; dan konsep tidak bocor, tanpa jaringan, tanpa `correct_index` atau `explanation` (636 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk dua skenario Kelas 4 Bab 3
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab3-ringkas.json`
