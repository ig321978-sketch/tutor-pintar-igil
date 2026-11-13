# Matematika Kelas 6 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Bab: Peluang (`mtk-6-bab4`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab4`). Komponen: `src/components/modul/SimulasiK6Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab4.ts`, teks misi di `misi-teks-k6b4.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang B (terakhir).

Bab ini punya **dua sub-bab**: A (Skala Peluang, hlm. 119-128) dan B (Membandingkan Peluang Kejadian, hlm. 129-144). Dikerjakan dalam dua gelombang, satu sub-bab per gelombang. Gelombang A tidak mendaftarkan bab; gelombang B mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A (Skala Peluang) selesai; bab belum didaftarkan di `registri-simulasi.ts`.**

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
| `4/7`, `1 / 2` | empat per tujuh, satu per dua (dipakai Sub-Bab B) |
| `2 × 6 = 12` / `3 x 3` | dua kali enam sama dengan dua belas / tiga kali tiga |
| `6 < 10`, `12 > 10` | enam kurang dari sepuluh, dua belas lebih dari sepuluh |
| huruf tunggal `A` sampai `H` | a, be, ce, de, e, ef, ge, ha |
| `6 − 2 = 4`, `(3)`, `…` | enam dikurangi dua sama dengan empat, kurung buka tiga kurung tutup, titik-titik |

Bilangan 0 sampai 9.999 diuji terhadap hitungan mandiri per digit. Materi bab ini tidak memakai persen, desimal, atau satuan. Tokoh skenario: Dhien (dari Materi). Koin digambar sebagai bulatan SVG, bukan emoji (lihat temuan Materi di bawah).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Skala (Tangga, Ujung, Percobaan) | `SimulasiLabSkalaK6B4.tsx` + `lab-skala-k6b4a.ts` | Mesin Skala | Dhien dan Poster Lomba (8 adegan) |

Mesin: `mesin-skala-k6b4.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b4.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-skala-k6b4.tsx` (lima tangga peluang, wadah berisi benda yang digambar satu per satu, roda putar berjuring, deretan catatan putaran, bulatan koin, dan pilihan tiga jawaban).

Metode luar buku yang dianyam. A: Likelihood Spectrum Scale (Tangga: hitung kejadian yang cocok dan semua yang ada, tempatkan di lima tangga), Impossible-Certain Continuum (Ujung: ujung kiri nol, ujung kanan semuanya; berapa bola diganti agar sampai ke ujung), Qualitative Probability Language (kata kurang mungkin, mungkin, sangat mungkin dianyam di mesin dan skenario), dan Experimental Relative Frequency (Percobaan: prediksi dari roda, catat hasil putaran, cocokkan catatan dengan prediksi).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tangga: buku merah 6 dari 10 (sangat mungkin); Tangga: buku hijau 0 dari 10 (ujung kiri); Tangga: dadu semua sisi lima, 8 dari 8 (ujung kanan); Ujung: tas pesta, 4 dari 10 (ganti 6 agar pasti, keluarkan 4 agar tidak mungkin); Percobaan: roda merah (prediksi sangat mungkin, catatan 7 dari 10, cocok) | Tangga: keenam soal; Ujung: keenam soal; Percobaan: keenam soal |

Tujuh misi wajib: lima dari lab di atas, Mesin Skala, dan skenario Dhien dan Poster Lomba. Near-miss tidak memenuhi misi: soal lain pada tampilan yang sama, soal bernomor sama pada tampilan lain, riwayat kosong, alat lain dengan id sama, dan keadaan selesai dengan id sama.

## Soal lab A (enam per tampilan, id `tangga:0-5`, `ujung:0-5`, `percobaan:0-5`)

| Tampilan | Soal | Tiga tahap |
|----------|------|------------|
| Tangga | buku merah (6 dari 10, sangat mungkin); buku kuning (1 dari 10, kurang mungkin); buku hijau (0 dari 10, tidak mungkin); dadu angka lima (8 dari 8, pasti); koin gambar (1 dari 2, mungkin); buku putih (3 dari 10, kurang mungkin) | yang cocok, semua yang ada, tangga |
| Ujung | tas berisi 10, 10, 8, 12, 10, 9 bola dengan 4, 6, 1, 9, 5, 7 bola merah (diganti agar pasti: 6, 4, 7, 3, 5, 2; dikeluarkan agar tidak mungkin: 4, 6, 1, 9, 5, 7) | tangga sekarang, bola diganti agar pasti, bola dikeluarkan agar tidak mungkin |
| Percobaan | enam roda berjuring 8 dengan catatan 10, 4, 20, 10, 6, 6 putaran (selisih tangga catatan dan prediksi 0, 1, 0, 1, 0, 2) | prediksi dari roda, kejadian pada catatan, cocok dengan prediksi atau tidak |

Pengecoh dihitung dari kesalahan khas, tanpa ganda: semua yang ada, yang tidak cocok, atau satu lebih (yang cocok); hanya yang cocok, yang tidak cocok, atau satu lebih (semua yang ada); dua tangga terdekat, kesalahan khas bergeser satu tangga (tangga); bola yang sudah merah, semua bola, atau satu lebih (agar pasti); bola biru, semua bola, atau satu lebih (agar tidak mungkin); banyak putaran, putaran yang bukan target, atau satu lebih (catatan). Bila calon habis atau ganda, dipakai bilangan di sekitar jawaban. Letak kunci diputar dan memakai ketiga posisi di enam soal.

Percobaan dibuat mengajarkan Experimental Relative Frequency: roda kuning dengan 4 putaran menyimpang satu tangga dari prediksi, roda yang sama dengan 20 putaran cocok; roda biru langka menyimpang dua tangga karena putarannya sedikit.

## Mesin (4 stasiun x 3 kasus)

Mesin Skala: Hitung (yang cocok dari semua yang ada dan yang bukan), Tangga, Ujung (bola diganti agar pasti), Catat (tangga catatan percobaan). Kasus: Rak Buku Dhien (6 dari 10; 4 dari 5 putaran), Tas Bola (4 dari 12; 1 dari 6 putaran), Roda Putar (4 dari 9; 4 dari 8 putaran). Kunci diputar tiap kasus dan tiap stasiun, dihitung dari data kasus.

## Skenario Dhien dan Poster Lomba (8 adegan, 6 jenis)

Narasi buka, pilih (kapan peluang benar-benar nol), soal (rak buku: semua buku 10, merah sangat mungkin, kuning kurang mungkin), hitung (6 stik buku merah), isi (6 stik untuk bola biru yang diganti agar merah pasti), pilih (prediksi dulu sebelum memutar roda), soal (catatan 2 dari 4 mungkin, 3 dari 20 kurang mungkin, makin banyak putaran makin dekat), dan akhir. Letak kunci pilih berbeda (kedua adegan pilih berbeda) dan letak kunci soal memakai ketiga posisi.

## Konsep yang dijaga

Sub-Bab A tidak menyebut konsep Sub-Bab B: adil atau kurang adil, rasio menguntungkan terhadap total, pemain atau permainan, samakan total, KPK, keputusan, pecahan atau desimal, tanda garis miring antara dua bilangan, dan kata banding atau membandingkan dua peluang. Diuji dengan regex pada misi, mesin, skenario, ringkas, kode tampilan, model, logika, pesan fuzz, dan ucapan. Misi dan ringkas memakai kata "cocokkan" untuk catatan dan prediksi.

## Pengamanan

Logika murni bilangan bulat; pesan sukses atau netral lab diawali "✅ "; indeks pecahan dan di luar batas diabaikan; riwayat "pernah" hanya dari langkah terakhir yang benar; EMOJI MAKSIMAL EMOJI 12 diuji (tanpa titik kode di atas U+1FA95, tanpa U+1F7F0, tanpa ZWJ); tanpa `correct_index` atau `explanation` di klien; tanpa LLM dan jaringan; tanpa Poin Kualifikasi; tidak memblokir anak (gerbang punya Lewati misi). Batas jawaban numerik di `uji-skenario-umum.mjs` diatur per skenario (K6 Bab 4A: 100).

## Uji

`node --no-warnings scripts/uji-lab-k6b4.mjs`: soal diketik ulang lalu dibandingkan dengan kode; hitungan mandiri (menyebut benda satu per satu, memasangkan benda cocok dengan benda lain, mengganti bola satu per satu); pengecoh persis dari calon kesalahan khas; letak kunci eksak; alur tiap soal; fuzz 20.000 aksi dengan orakel mandiri; mesin; skenario; misi (near-miss); pengeja (0-9.999); data ringkas; konsep bocor; kemurnian; pendaftaran bab; emoji dan akhir baris. Skenario juga masuk `uji-skenario-umum.mjs`.

## Temuan Materi (dilaporkan, tidak diubah)

1. Emoji koin di atas batas: `naskah-k6b4.ts` dan `kelas6-bab4.json` memuat U+1FA99 (Emoji 13) pada panel infografis "Koin" Sub-Bab A. Simulasi tidak memakainya dan menggambar koin sebagai bulatan SVG.
2. `data-k6b4.ts` baris 210: ronde sortir Sub-Bab B memakai label bin "lancip/tumpul" (sisa templat sudut), dan `RONDE_HITUNG_CB` memakai nama field `derajat`.
3. Naskah tidak menetapkan ambang tangga skala; ambang separuh adalah keputusan simulasi (lihat tabel di atas).
4. Materi menulis peluang sebagai pecahan (1/2, 4/7, 1/12) tetapi tidak mengajarkan cara membandingkan pecahan di Bab 4; Sub-Bab B memakai "samakan total".
