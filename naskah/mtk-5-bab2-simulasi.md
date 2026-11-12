# Matematika Kelas 5 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: KPK dan FPB (`mtk-5-bab2`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab2`). Komponen: `src/components/modul/SimulasiK5Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab2.ts`, teks misi di `misi-teks-k5b2.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **lima sub-bab**: A (kelipatan), B (kelipatan persekutuan dan KPK), C (faktor), D (faktor persekutuan dan FPB), E (KPK dan FPB dengan faktor prima). Dikerjakan dalam lima gelombang, satu sub-bab per gelombang. Gelombang A sampai D tidak didaftarkan di registri; gelombang E mendaftarkan bab.

**Status: Gelombang A (Sub-Bab A, Kelipatan) selesai. B sampai E belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B2A–E.tsx`, `naskah-k5b2.ts`, `data-k5b2.ts`, `paket-k5b2.ts`, dan lainnya). Pengeja suara memakai `ejaK5B1` (sampai 999.999) lewat prop `eja` mesin. Tokoh skenario dari buku: Nisa (A).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Lompat Kelipatan (Lompat, Tabel, Cek) | `SimulasiLabKelipatanK5B2.tsx` + `lab-kelipatan-k5b2a.ts` | Mesin Kelipatan | Tepuk Kelipatan Nisa (7 adegan) |

Mesin: `mesin-data-k5b2.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b2.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-kelipatan-k5b2.tsx` (garis bilangan dengan busur lompatan, tabel seratus yang bisa diwarnai, titik polos dalam kelompok sama banyak). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab2-ringkas.json`. Uji: `scripts/uji-lab-k5b2.mjs`.

Metode luar buku yang dianyam. A: Lompat Hitung (kelipatan sebagai pendaratan berjarak sama dari nol), pola Tabel Seratus (warna jatuh berjarak sama), dan Cek Sisa (bilangan dikelompokkan sama banyak, sisa nol berarti kelipatan).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Lompat: lima pendaratan jarak 3 (3, 6, 9, 12, 15); Lompat: lima pendaratan jarak 7; Tabel: semua kelipatan 4 di tabel seratus; Cek: 12 titik dalam kelompok berisi 3, sisa 0, kelipatan; Cek: 14 titik dalam kelompok berisi 3, sisa 2, bukan kelipatan | Lompat: sepuluh pendaratan jarak 3 (terakhir 30); Tabel: kelipatan 9 (pola diagonal); Cek: 25 dalam kelompok berisi 4, sisa 1, bukan kelipatan |

Near-miss tidak memenuhi misi: empat pendaratan atau jarak lain; kelipatan 4 kurang satu atau kelebihan satu bilangan (lab menyebut bilangan yang kelebihan beserta sisanya, atau kelipatan terkecil yang terlewat); kelipatan 5 saat targetnya 4; belum diperiksa; putusan "ya" atau "bukan" yang salah, sisa yang salah (termasuk menyebut hasil bagi), atau putusan sebelum sisa ditentukan.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Kelipatan (A) | Lompat → Tabel → Cek → Lanjut | jarak 3 (pendaratan ke-4 = 12, 24 di tabel, 22 bersisa 1, lanjut 15), jarak 7 (ke-6 = 42, 63, 30 bersisa 2, lanjut 35), jarak 9 (ke-7 = 63, 90, 40 bersisa 4, lanjut 45) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: jarak ditambah k dan satu pendaratan kurang (Lompat), bilangan tetangga (Tabel), menyangka kelipatan dan sisa tertukar (Cek), tambah satu dan satu kurang (Lanjut).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Tepuk Kelipatan Nisa (A) | 7 | tepuk di 9 dan 12 pada hitungan 9 sampai 13; banyak tepukan 3 sampai 18 (6 stik); tepukan sampai 30 (10 stik); 3 × 7, kelipatan 3 setelah 12, sisa 14 dibagi 3; 14 bukan kelipatan 3 (sisa 2) |

## Kejujuran konsep

- Lompat: pendaratan dihitung dengan penjumlahan jarak (jarak kali k di kode), diuji terhadap penjumlahan berulang. Satu kali tekan satu pendaratan, paling banyak sepuluh. Nol disebut titik awal dan bukan kelipatan (aturan buku).
- Tabel: kunci kelipatan dibentuk dengan lompatan dan dibandingkan dengan bilangan yang diwarnai. Setiap bilangan bukan kelipatan (1 sampai 100) yang kelebihan diuji ditolak dengan sisanya, dan setiap kelipatan yang terlewat diuji ditolak.
- Cek: hasil bagi dan sisa dihitung di kode dengan pembagian, diuji terhadap pengurangan berulang. Pengecoh sisa: hasil bagi dan sisa palsu, semuanya dihitung dan salah.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri (penjumlahan dan pengurangan berulang).
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa persekutuan, KPK, FPB, faktor, pembagi, prima, irisan, pohon, jadwal, bertemu, terkecil, dan terbesar.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut, semua pesan bisa dieja.
