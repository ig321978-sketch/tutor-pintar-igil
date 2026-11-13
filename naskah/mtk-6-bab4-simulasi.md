# Matematika Kelas 6 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Bab: Peluang (`mtk-6-bab4`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab4`). Komponen: `src/components/modul/SimulasiK6Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab4.ts`, teks misi di `misi-teks-k6b4.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang B (terakhir) dan kini terdaftar.

Bab ini punya **dua sub-bab**: A (Skala Peluang, hlm. 119-128) dan B (Membandingkan Peluang Kejadian, hlm. 129-144). Dikerjakan dalam dua gelombang, satu sub-bab per gelombang. Gelombang A tidak mendaftarkan bab; gelombang B mendaftarkan bab dan menjadi pencapaian bab.

**Status: kedua gelombang selesai (A Skala Peluang, B Membandingkan Peluang Kejadian). Bab `mtk-6-bab4` terdaftar di `registri-simulasi.ts` (tiga kemunculan: materi, misi awal, ringkas) dan tercatat di `igil-module-player-peta.md`.**

Berkas Materi bab ini tidak diubah (`SubBabK6B4A-B.tsx`, `naskah-k6b4.ts`, `data-k6b4.ts`, `paket-k6b4.ts`, dan lainnya). Pengeja suara memakai `ejaK6B4` (berkas baru `eja-k6b4.ts`) lewat prop `eja` mesin dan di lab.

## Logika: peluang hanya pasangan bilangan bulat

Peluang dipakai sebagai pasangan **k dari n**: k kejadian yang cocok dari n kemungkinan yang ada. Tidak ada pecahan atau desimal yang dihitung di logika. Aturan tangga (Likelihood Spectrum Scale), ditetapkan simulasi karena naskah tidak memberi ambang:

| Keadaan | Tangga |
|---------|--------|
| k = 0 | Tidak mungkin (ujung kiri) |
| 2 × k < n | Kurang mungkin |
| 2 × k = n | Mungkin (tepat separuh) |
| 2 × k > n dan k < n | Sangat mungkin |
| k = n | Pasti (ujung kanan) |

Cocok dengan contoh naskah: buku merah 6 dari 10 sangat mungkin, buku kuning 1 dari 10 kurang mungkin, buku hijau 0 dari 10 tidak mungkin, dadu delapan sisi semuanya angka lima pasti, koin gambar 1 dari 2 mungkin. Uji menghitung tangga dengan cara lain: memasangkan satu benda cocok dengan satu benda lain sampai salah satunya habis.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `6 dari 10` | enam dari sepuluh |
| `4/7`, `1 / 2` | empat per tujuh, satu per dua (dipakai Sub-Bab B; `1/12` dan `1/35` dibaca satu per dua belas, satu per tiga puluh lima) |
| `2 × 6 = 12` / `3 x 3` | dua kali enam sama dengan dua belas / tiga kali tiga |
| `6 < 10`, `12 > 10` | enam kurang dari sepuluh, dua belas lebih dari sepuluh |
| huruf tunggal `A` sampai `H` | a, be, ce, de, e, ef, ge, ha |
| `6 − 2 = 4`, `(3)`, `…` | enam dikurangi dua sama dengan empat, kurung buka tiga kurung tutup, titik-titik |

Bilangan 0 sampai 9.999 diuji terhadap hitungan mandiri per digit. Materi bab ini tidak memakai persen, desimal, atau satuan. Tokoh skenario: Dhien (Sub-Bab A dan B), dengan Tigor dan Ibu dalam cerita (dari Materi). Koin digambar sebagai bulatan SVG, bukan emoji (lihat temuan Materi di bawah).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Skala (Tangga, Ujung, Percobaan) | `SimulasiLabSkalaK6B4.tsx` + `lab-skala-k6b4a.ts` | Mesin Skala | Dhien dan Poster Lomba (8 adegan) |
| B | Lab Banding (Rasio, Banding, Adil) | `SimulasiLabBandingK6B4.tsx` + `lab-banding-k6b4b.ts` | Mesin Banding | Dhien dan Kotak Hadiah (8 adegan) |

Mesin: `mesin-skala-k6b4.ts` dan `mesin-banding-k6b4.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario (A dan B): `skenario-k6b4.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-skala-k6b4.tsx` (lima tangga peluang, wadah berisi benda yang digambar satu per satu, roda putar berjuring, deretan catatan putaran, bulatan koin, dan pilihan tiga jawaban). Model gambar B: `model-banding-k6b4.tsx` (wadah dengan hasil menguntungkan bergaris tebal dan yang lain pudar, deretan hasil permainan berwarna biru muda untuk pemain A dan emas untuk pemain B, dan dua batang peluang pada total yang sama yang baru muncul sesudah soal selesai agar jawaban tidak terbaca dari gambar); roda dan pilihan tiga jawaban dipakai ulang dari model A.

Metode luar buku yang dianyam. A: Likelihood Spectrum Scale (Tangga: hitung kejadian yang cocok dan semua yang ada, tempatkan di lima tangga), Impossible-Certain Continuum (Ujung: ujung kiri nol, ujung kanan semuanya; berapa bola diganti agar sampai ke ujung), Qualitative Probability Language (kata kurang mungkin, mungkin, sangat mungkin dianyam di mesin dan skenario), dan Experimental Relative Frequency (Percobaan: prediksi dari roda, catat hasil putaran, cocokkan catatan dengan prediksi).

Metode luar B: Favorable-to-Total Ratio (Rasio: hasil menguntungkan, semua hasil, dan hasil yang tidak menguntungkan; peluang k dari n ditulis k/n), Comparative Probability Ratio (Banding: samakan total dengan bilangan terkecil yang habis dibagi kedua total, hitung hasil menguntungkan pada total itu, lalu pilih yang lebih mungkin), Relative Likelihood Decision (peluang lebih besar berarti lebih mungkin, bukan pasti; pesan lab menyebut hasil lain yang masih bisa muncul), dan Fair Game Equal Chance Principle (Adil: hitung hasil menang tiap pemain; adil bila sama banyak dari total yang sama).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tangga: buku merah 6 dari 10 (sangat mungkin); Tangga: buku hijau 0 dari 10 (ujung kiri); Tangga: dadu semua sisi lima, 8 dari 8 (ujung kanan); Ujung: tas pesta, 4 dari 10 (ganti 6 agar pasti, keluarkan 4 agar tidak mungkin); Percobaan: roda merah (prediksi sangat mungkin, catatan 7 dari 10, cocok) | Tangga: keenam soal; Ujung: keenam soal; Percobaan: keenam soal |
| B | Rasio: kotak Mantap (4 dari 7, 7, tidak menguntungkan 3); Banding: koin dan dadu (1 dari 2 lawan 1 dari 6, total bersama 6, koin 3 dan dadu 1); Banding: Spektakuler lawan Mantap (3 dari 7 lawan 4 dari 7, total bersama 7, Mantap lebih mungkin); Adil: ganjil lawan genap pada dadu (3 dan 3, adil); Adil: angka enam lawan angka satu sampai lima (1 dan 5, kurang adil, pemain B diuntungkan) | Rasio: keenam soal; Banding: keenam soal; Adil: keenam soal |

Tujuh misi wajib: lima dari lab di atas, mesinnya (Mesin Skala, Mesin Banding), dan skenarionya (Dhien dan Poster Lomba, Dhien dan Kotak Hadiah). Near-miss tidak memenuhi misi: soal lain pada tampilan yang sama, soal bernomor sama pada tampilan lain, riwayat kosong, alat lain dengan id sama, dan keadaan selesai dengan id sama.

## Soal lab A (enam per tampilan, id `tangga:0-5`, `ujung:0-5`, `percobaan:0-5`)

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Tangga | buku merah (6 dari 10, sangat mungkin); buku kuning (1 dari 10, kurang mungkin); buku hijau (0 dari 10, tidak mungkin); dadu angka lima (8 dari 8, pasti); koin gambar (1 dari 2, mungkin); buku putih (3 dari 10, kurang mungkin) | yang cocok, semua yang ada, tangga |
| Ujung | tas berisi 10, 10, 8, 12, 10, 9 bola dengan 4, 6, 1, 9, 5, 7 bola merah (diganti agar pasti: 6, 4, 7, 3, 5, 2; dikeluarkan agar tidak mungkin: 4, 6, 1, 9, 5, 7) | tangga sekarang, bola diganti agar pasti, bola dikeluarkan agar tidak mungkin |
| Percobaan | enam roda berjuring 8 dengan catatan 10, 4, 20, 10, 6, 6 putaran (selisih tangga catatan dan prediksi 0, 1, 0, 1, 0, 2) | prediksi dari roda, kejadian pada catatan, cocok dengan prediksi atau tidak |

Pengecoh dihitung dari kesalahan khas, tanpa ganda: semua yang ada, yang tidak cocok, atau satu lebih (yang cocok); hanya yang cocok, yang tidak cocok, atau satu lebih (semua yang ada); dua tangga terdekat, kesalahan khas bergeser satu tangga (tangga); bola yang sudah merah, semua bola, atau satu lebih (agar pasti); bola biru, semua bola, atau satu lebih (agar tidak mungkin); banyak putaran, putaran yang bukan target, atau satu lebih (catatan). Bila calon habis atau ganda, dipakai bilangan di sekitar jawaban. Letak kunci diputar dan memakai ketiga posisi di enam soal.

Percobaan dibuat mengajarkan Experimental Relative Frequency: roda kuning dengan 4 putaran menyimpang satu tangga dari prediksi, roda yang sama dengan 20 putaran cocok; roda biru langka menyimpang dua tangga karena putarannya sedikit.

## Soal lab B (enam per tampilan, id `rasio:0-5`, `banding:0-5`, `adil:0-5`)

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Rasio | koin gambar (1, 2, 1); dadu angka enam (1, 6, 5); kotak Mantap (4, 7, 3); kotak Spektakuler (3, 7, 4); dadu genap (3, 6, 3); roda merah (5, 8, 3) | hasil menguntungkan, semua hasil, hasil yang tidak menguntungkan |
| Banding | koin lawan dadu (1/2 lawan 1/6, total 6, 3 dan 1); Spektakuler lawan Mantap (3/7 lawan 4/7, total 7); SMP lawan SD (1/35 lawan 1/12, total 420, 12 dan 35); genap lawan koin (3/6 lawan 1/2, total 6, 3 dan 3, sama); tas biru lawan hijau (2/5 lawan 3/10, total 10, 4 dan 3); dua roda (5/8 lawan 3/4, total 8, 5 dan 6) | total bersama paling kecil, hasil menguntungkan pertama pada total itu, yang lebih mungkin (pemenang a, b, b, sama, a, b) |
| Adil | dadu ganjil lawan genap (3 dan 3, adil); satu lawan lima (1 dan 5, pemain B); kecil lawan besar (3 dan 3, adil); empat lawan dua (4 dan 2, pemain A); roda seimbang (4 dan 4, adil); roda berat sebelah (3 dan 5, pemain B) | hasil menang pemain A, hasil menang pemain B, adil atau kurang adil dan siapa diuntungkan |

Pengecoh dihitung dari kesalahan khas, tanpa ganda: semua hasil, hasil yang tidak menguntungkan, atau satu lebih (Rasio); jumlah dua total, hasil kali dua total, atau total yang lebih besar (total bersama); k semula, k dikali faktor yang keliru, atau hasil peluang kedua (setara); hasil menang pemain lain atau semua hasil (Adil). Soal Banding membandingkan dengan menyamakan total, sedangkan uji memakai silang kali sebagai cara berbeda. Letak kunci diputar dan memakai ketiga posisi di enam soal; pemenang tidak selalu yang pertama.

## Mesin (4 stasiun x 3 kasus)

Mesin Skala: Hitung (yang cocok dari semua yang ada dan yang bukan), Tangga, Ujung (bola diganti agar pasti), Catat (tangga catatan percobaan). Kasus: Rak Buku Dhien (6 dari 10; 4 dari 5 putaran), Tas Bola (4 dari 12; 1 dari 6 putaran), Roda Putar (4 dari 9; 4 dari 8 putaran). Kunci diputar tiap kasus dan tiap stasiun, dihitung dari data kasus.

Mesin Banding: Rasio (hasil yang tidak menguntungkan, peluang besar belum pasti), Samakan (total bersama paling kecil), Banding (yang lebih mungkin pada total yang sama, atau sama mungkin), Adil (adil atau kurang adil dari hasil menang dua pemain). Kasus: Kotak Hadiah (Mantap 4 dari 7 lawan Spektakuler 3 dari 7, total 7; Dhien dan Ibu memilih warna piring, 4 lawan 3, kurang adil), Koin dan Dadu (dadu angka 6 1 dari 6 lawan koin gambar 1 dari 2, total 6, koin lebih mungkin; gambar lawan angka, 1 lawan 1, adil), dan Lomba Dhien (kategori SMP 1 dari 35 lawan SD 1 dari 12, total 420, SD lebih mungkin; satu lawan tiga nomor undian, kurang adil).

## Skenario Dhien dan Poster Lomba (8 adegan, 6 jenis)

Narasi buka, pilih (kapan peluang benar-benar nol), soal (rak buku: semua buku 10, merah sangat mungkin, kuning kurang mungkin), hitung (6 stik buku merah), isi (6 stik untuk bola biru yang diganti agar merah pasti), pilih (prediksi dulu sebelum memutar roda), soal (catatan 2 dari 4 mungkin, 3 dari 20 kurang mungkin, makin banyak putaran makin dekat), dan akhir. Letak kunci pilih berbeda (kedua adegan pilih berbeda) dan letak kunci soal memakai ketiga posisi.

## Skenario Dhien dan Kotak Hadiah (8 adegan, 6 jenis)

Narasi buka (12 peserta SD, 35 SMP, 27 SMA), pilih (Favorable-to-Total Ratio: peluang angka 6 pada dadu ditulis 1 dari 6), soal (kotak Mantap: 4 piring biru, 7 piring, 4/7), hitung (4 stik piring biru), isi (Comparative Probability Ratio: koin 1 dari 2 menjadi 3 dari 6, 3 stik), soal (Relative Likelihood Decision: Mantap lebih mungkin dari Spektakuler, koin dari dadu, peluang besar belum pasti), pilih (Fair Game Equal Chance Principle: angka 6 lawan 1 sampai 5 kurang adil), dan akhir. Letak kunci kedua pilih berbeda dan letak kunci tiga soal dalam tiap adegan soal memakai ketiga posisi.

## Konsep yang dijaga

Sub-Bab A tidak menyebut konsep Sub-Bab B: adil atau kurang adil, rasio menguntungkan terhadap total, pemain atau permainan, samakan total, KPK, keputusan, pecahan atau desimal, tanda garis miring antara dua bilangan, dan kata banding atau membandingkan dua peluang. Diuji dengan regex pada misi, mesin, skenario, ringkas, kode tampilan, model, logika, pesan fuzz, dan ucapan. Misi dan ringkas memakai kata "cocokkan" untuk catatan dan prediksi.

Sub-Bab B boleh memakai tangga, k dari n, dan catatan dari A. Bab 4 adalah bab terakhir Materi Kelas 6 (tidak ada naskah Bab 5), sehingga B hanya dijaga dari persen, desimal, dan rumus peluang formal (kombinasi, permutasi, ruang sampel, frekuensi harapan).

## Pengamanan

Logika murni bilangan bulat; pesan sukses atau netral lab diawali "✅ "; indeks pecahan dan di luar batas diabaikan; riwayat "pernah" hanya dari langkah terakhir yang benar; EMOJI MAKSIMAL EMOJI 12 diuji (tanpa titik kode di atas U+1FA95, tanpa U+1F7F0, tanpa ZWJ); tanpa `correct_index` atau `explanation` di klien; tanpa LLM dan jaringan; tanpa Poin Kualifikasi; tidak memblokir anak (gerbang punya Lewati misi). Batas jawaban numerik di `uji-skenario-umum.mjs` diatur per skenario (K6 Bab 4A dan 4B: 100). Batang peluang di Lab Banding baru muncul sesudah soal selesai (diuji) sehingga gambar tidak membocorkan jawaban.

## Uji

`node --no-warnings scripts/uji-lab-k6b4.mjs`: soal diketik ulang lalu dibandingkan dengan kode; hitungan mandiri (menyebut benda satu per satu, memasangkan benda cocok dengan benda lain, mengganti bola satu per satu); pengecoh persis dari calon kesalahan khas; letak kunci eksak; alur tiap soal; fuzz 20.000 aksi dengan orakel mandiri; mesin; skenario; misi (near-miss); pengeja (0-9.999); data ringkas; konsep bocor; kemurnian; pendaftaran bab; emoji dan akhir baris. Skenario A dan B juga masuk `uji-skenario-umum.mjs`. Untuk Sub-Bab B: peluang dicacah dengan predikat per hasil, total bersama dicari dengan mencoba kelipatan dari 1, hasil pada total bersama dicacah dengan menambah k tiap kelompok n, dan pemenang ditentukan dengan silang kali.

## Temuan Materi (dilaporkan, tidak diubah)

1. Emoji koin di atas batas: `naskah-k6b4.ts` dan `kelas6-bab4.json` memuat U+1FA99 (Emoji 13) pada panel infografis "Koin" Sub-Bab A. Simulasi tidak memakainya dan menggambar koin sebagai bulatan SVG.
2. `data-k6b4.ts` baris 210: ronde sortir Sub-Bab B memakai label bin "lancip/tumpul" (sisa templat sudut), dan `RONDE_HITUNG_CB` memakai nama field `derajat`.
3. Naskah tidak menetapkan ambang tangga skala; ambang separuh adalah keputusan simulasi (lihat tabel di atas).
4. Materi menulis peluang sebagai pecahan (1/2, 4/7, 1/12) tetapi tidak mengajarkan cara membandingkan pecahan di Bab 4; Sub-Bab B memakai "samakan total".
