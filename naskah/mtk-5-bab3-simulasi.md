# Matematika Kelas 5 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Bab: Bilangan Pecahan (`mtk-5-bab3`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab3`). Komponen: `src/components/modul/SimulasiK5Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab3.ts`, teks misi di `misi-teks-k5b3.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **tiga sub-bab**: A (membandingkan dan mengurutkan pecahan), B (penjumlahan pecahan), C (pengurangan pecahan). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak didaftarkan di registri; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: Gelombang A (Sub-Bab A, Membandingkan dan Mengurutkan Pecahan) selesai. B dan C belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B3A–C.tsx`, `naskah-k5b3.ts`, `data-k5b3.ts`, `paket-k5b3.ts`, dan lainnya). Pengeja suara memakai `ejaK5B3` (berkas baru `eja-k5b3.ts`) lewat prop `eja` mesin dan di lab. `ejaK5B1` tidak dipakai karena tidak mengeja pecahan.

## Pengeja pecahan

| Tulisan | Dibaca |
|---------|--------|
| `3/4` | tiga per empat |
| `2 3/4` | dua dan tiga per empat |
| `1/2 < 1/5` | satu per dua lebih kecil dari satu per lima |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999). Uji juga mengeja semua pecahan p/q sampai 30/30 dan semua campuran dengan bulat 1 sampai 5, tanpa digit tersisa. Tokoh skenario dari buku: Yohana (A).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Banding Pecahan (Garis, Banding, Campuran) | `SimulasiLabBandingK5B3.tsx` + `lab-banding-k5b3a.ts` | Mesin Banding | Lompat Jauh Yohana (7 adegan) |

Mesin: `mesin-data-k5b3.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b3.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-banding-k5b3.tsx` (garis bilangan yang dibagi sama panjang, batang pecahan polos, batang bulat untuk campuran). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab3-ringkas.json`. Uji: `scripts/uji-lab-k5b3.mjs`.

Metode luar buku yang dianyam. A: Pecahan di Garis Bilangan (letak pecahan di garis, kanan lebih besar), Pecahan Senilai (penyebut disamakan lewat batang yang dibagi lebih halus), dan Campuran ke Biasa (tiap bulat berisi sebanyak penyebut bagian, lalu bagian pecahannya).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Garis: letakkan 7/8, 11/4, dan 7/2 (lompatan Yohana); Banding: 1/2 dan 1/5 (samakan penyebut, pilih tanda); Banding: 1/2 dan 3/5; Campuran: 2 3/4 menjadi 11/4; Campuran: 3 1/2 menjadi 7/2 | Banding: 3/8 dan 5/8 (penyebut sudah sama); Banding: 1/3 dan 2/6 (senilai, tanda sama dengan); Campuran: 4 1/4 menjadi 17/4 |

Pasangan 2/3 dan 3/4 hanya latihan, bukan misi. Near-miss tidak memenuhi misi: hanya dua lompatan di garis, titik meleset satu bagian atau belum diperiksa; tanda salah, tanda dipilih sebelum penyebut disamakan, penyebut yang bukan kelipatan kedua penyebut; bagian pada bulat yang salah, banyak bagian seluruhnya yang salah (hanya bulat dikali penyebut, atau semua angka digabung), atau seluruhnya dipilih sebelum bagian bulat ditentukan.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Banding (A) | Garis → Banding → Campuran → Urut | Lompatan Yohana (titik ke-11 pada seperempat = 11/4; 11/4 dan 7/2, yang lebih besar 7/2; 3 1/2 = 7/2; urutan 7/8, 11/4, 7/2), Pembilang sama (7/5; 1/2 dan 1/5 lebih besar 1/2; 1 1/2 = 3/2; urutan 1/5, 1/3, 1/2), Penyebut sama (13/8; 3/8 dan 5/8 lebih besar 5/8; 4 1/4 = 17/4; urutan 3/8, 1/2, 5/8) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: pembilang dan penyebut tertukar serta satu bagian kurang (Garis), pecahan lain dan "sama besar" (Banding), lupa pembilang serta semua angka digabung (Campuran), urutan terbalik dan dua pecahan pertama tertukar (Urut).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Lompat Jauh Yohana (A) | 7 | 2 3/4 menjadi 11/4 (pengecoh 6/4 dan 5/4); 11 potongan seperempat meter (11 stik); 7 potongan setengah meter untuk 3 1/2 (isi 7 stik); 1/2 lebih besar dari 1/5, penyebut sama untuk 1/2 dan 3/5 adalah 10, 3/8 lebih kecil dari 5/8; lompatan terjauh 3 1/2 |

## Kejujuran konsep

- Garis: titik dipilih pada garis yang tiap bulatnya dibagi q bagian. Pecahan p/q benar bila titik ke-p dari nol. Titik yang meleset ditolak dengan arah geser. Urutan ketiga lompatan dihitung dengan perkalian silang di kode dan diuji terhadap penyamaan penyebut.
- Banding: tanda dihitung dengan perkalian silang, diuji terhadap penyamaan penyebut dengan daftar kelipatan untuk 14.641 pasangan pecahan. Penyebut sama terkecil diuji terhadap irisan daftar kelipatan. Pecahan senilai diuji terhadap pengulangan pembilang. Pengecoh penyebut dihitung dan bukan kelipatan kedua penyebut.
- Campuran: banyak bagian dihitung dengan perkalian (bulat × penyebut + pembilang) dan diuji terhadap penambahan bagian satu per satu. Pengecoh klasik: lupa pembilang, semua angka digabung, bulat dan penyebut digabung.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa jumlah, kurang, tambah, kurangi, penjumlahan, pengurangan, dan KPK, serta tanpa lambang tambah dan kurang di teks.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut, semua pesan bisa dieja. Uji mutasi pada logika lab: satu angka diubah, uji gagal.
