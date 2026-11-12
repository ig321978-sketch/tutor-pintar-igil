# Matematika Kelas 5 · Bab 3 · Simulasi SMISCPA (pola hibrida)

Bab: Bilangan Pecahan (`mtk-5-bab3`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab3`). Komponen: `src/components/modul/SimulasiK5Bab3.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab3.ts`, teks misi di `misi-teks-k5b3.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **tiga sub-bab**: A (membandingkan dan mengurutkan pecahan), B (penjumlahan pecahan), C (pengurangan pecahan). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak didaftarkan di registri; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: Gelombang A (Sub-Bab A, Membandingkan dan Mengurutkan Pecahan) dan Gelombang B (Sub-Bab B, Penjumlahan Pecahan) selesai. C belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B3A–C.tsx`, `naskah-k5b3.ts`, `data-k5b3.ts`, `paket-k5b3.ts`, dan lainnya). Pengeja suara memakai `ejaK5B3` (berkas baru `eja-k5b3.ts`) lewat prop `eja` mesin dan di lab. `ejaK5B1` tidak dipakai karena tidak mengeja pecahan.

## Pengeja pecahan

| Tulisan | Dibaca |
|---------|--------|
| `3/4` | tiga per empat |
| `2 3/4` | dua dan tiga per empat |
| `1/2 < 1/5` | satu per dua lebih kecil dari satu per lima |
| `KPK` | kelipatan persekutuan terkecil |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999). Uji juga mengeja semua pecahan p/q sampai 30/30 dan semua campuran dengan bulat 1 sampai 5, tanpa digit tersisa. Tokoh skenario dari buku: Yohana (A), Komang dan Lukas (B).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Banding Pecahan (Garis, Banding, Campuran) | `SimulasiLabBandingK5B3.tsx` + `lab-banding-k5b3a.ts` | Mesin Banding | Lompat Jauh Yohana (7 adegan) |
| B | Lab Jumlah Arsir (Sama, Beda, Hasil) | `SimulasiLabJumlahK5B3.tsx` + `lab-jumlah-k5b3b.ts` | Mesin Jumlah | Martabak dan Wingko Komang (7 adegan) |

Mesin: `mesin-data-k5b3.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b3.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-banding-k5b3.tsx` (garis bilangan yang dibagi sama panjang, batang pecahan polos, batang bulat untuk campuran) dan `model-jumlah-k5b3.tsx` (satu batang dengan dua arsiran yang bertemu, batang bulat). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab3-ringkas.json`. Uji: `scripts/uji-lab-k5b3.mjs`.

Metode luar buku yang dianyam. A: Pecahan di Garis Bilangan (letak pecahan di garis, kanan lebih besar), Pecahan Senilai (penyebut disamakan lewat batang yang dibagi lebih halus), dan Campuran ke Biasa (tiap bulat berisi sebanyak penyebut bagian, lalu bagian pecahannya). B: Model Arsir Daerah (dua arsiran digabung pada satu batang dengan bagian sama besar), Jumlah Penyebut Sama (pembilang dijumlahkan, penyebut tetap), dan Samakan Penyebut dengan KPK (kedua batang dihaluskan menjadi bagian sebanyak KPK).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Garis: letakkan 7/8, 11/4, dan 7/2 (lompatan Yohana); Banding: 1/2 dan 1/5 (samakan penyebut, pilih tanda); Banding: 1/2 dan 3/5; Campuran: 2 3/4 menjadi 11/4; Campuran: 3 1/2 menjadi 7/2 | Banding: 3/8 dan 5/8 (penyebut sudah sama); Banding: 1/3 dan 2/6 (senilai, tanda sama dengan); Campuran: 4 1/4 menjadi 17/4 |
| B | Sama: 1/8 + 2/8 (martabak); Sama: 2/10 + 3/10 (penghapus); Beda: 1/2 + 1/3 (wingko, KPK 6); Beda: 1/4 + 1/6 (KPK 12); Hasil: 6/9 disederhanakan menjadi 2/3 | Beda: 3/4 + 1/8 (KPK 8); Beda: 2/5 + 1/10 (hasil 5/10 masih bisa disederhanakan); Hasil: 7/5 menjadi 1 2/5 |

Pasangan 2/3 dan 3/4 (A) serta 1/3 + 1/12, 1/5 + 1/2, 2/3 + 1/6 (B) hanya latihan, bukan misi. Near-miss tidak memenuhi misi B: pembilang dikalikan atau penyebut dijumlahkan (3/16), penyebut dipilih sebelum pembilang, KPK yang bukan kelipatan kedua penyebut atau kelipatan persekutuan yang bukan terkecil (hasil kali), hasil memakai pembilang asli tanpa menyamakan penyebut (2/5), bentuk yang belum paling sederhana (hanya pembilang atau penyebut dibagi, atau dibagi sebagian), campuran dengan bulat dan sisa tertukar.

Near-miss tidak memenuhi misi A: hanya dua lompatan di garis, titik meleset satu bagian atau belum diperiksa; tanda salah, tanda dipilih sebelum penyebut disamakan, penyebut yang bukan kelipatan kedua penyebut; bagian pada bulat yang salah, banyak bagian seluruhnya yang salah (hanya bulat dikali penyebut, atau semua angka digabung), atau seluruhnya dipilih sebelum bagian bulat ditentukan.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Banding (A) | Garis → Banding → Campuran → Urut | Lompatan Yohana (titik ke-11 pada seperempat = 11/4; 11/4 dan 7/2, yang lebih besar 7/2; 3 1/2 = 7/2; urutan 7/8, 11/4, 7/2), Pembilang sama (7/5; 1/2 dan 1/5 lebih besar 1/2; 1 1/2 = 3/2; urutan 1/5, 1/3, 1/2), Penyebut sama (13/8; 3/8 dan 5/8 lebih besar 5/8; 4 1/4 = 17/4; urutan 3/8, 1/2, 5/8) |
| Mesin Jumlah (B) | Sama → Beda → Sederhana → Campuran | Martabak (1/8 + 2/8 = 3/8; 1/2 + 1/3 = 5/6; 6/9 menjadi 2/3; 7/5 = 1 2/5), Penghapus (2/10 + 3/10 = 5/10; 1/4 + 1/6 = 5/12; 5/10 menjadi 1/2; 9/7 = 1 2/7), Wingko (3/7 + 2/7 = 5/7; 3/4 + 1/8 = 7/8; 4/12 menjadi 1/3; 4/3 = 1 1/3) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: pembilang dan penyebut tertukar serta satu bagian kurang (Garis), pecahan lain dan "sama besar" (Banding), lupa pembilang serta semua angka digabung (Campuran), urutan terbalik dan dua pecahan pertama tertukar (Urut).

Pengecoh B dihitung: penyebut ikut dijumlahkan dan pembilang dikalikan (Sama), pembilang dan penyebut dijumlahkan, penyebut belum disamakan (Beda), hanya pembilang atau penyebut dibagi serta pembagi sebagian (Sederhana), bulat dan sisa tertukar (Campuran).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Martabak dan Wingko Komang (B) | 7 | 1/8 + 2/8 = 3/8 (pengecoh 3/16 dan 2/8); 3 potong martabak (3 stik); wingko 3 potong dan 2 potong menjadi 5 potong dari 6 (isi 5 stik); 1/2 + 1/3 = 5/6, KPK 4 dan 6 adalah 12, 1/4 + 1/6 = 5/12; 4/9 + 2/9 = 6/9 disederhanakan menjadi 2/3 |
| Lompat Jauh Yohana (A) | 7 | 2 3/4 menjadi 11/4 (pengecoh 6/4 dan 5/4); 11 potongan seperempat meter (11 stik); 7 potongan setengah meter untuk 3 1/2 (isi 7 stik); 1/2 lebih besar dari 1/5, penyebut sama untuk 1/2 dan 3/5 adalah 10, 3/8 lebih kecil dari 5/8; lompatan terjauh 3 1/2 |

## Kejujuran konsep

- Garis: titik dipilih pada garis yang tiap bulatnya dibagi q bagian. Pecahan p/q benar bila titik ke-p dari nol. Titik yang meleset ditolak dengan arah geser. Urutan ketiga lompatan dihitung dengan perkalian silang di kode dan diuji terhadap penyamaan penyebut.
- Banding: tanda dihitung dengan perkalian silang, diuji terhadap penyamaan penyebut dengan daftar kelipatan untuk 14.641 pasangan pecahan. Penyebut sama terkecil diuji terhadap irisan daftar kelipatan. Pecahan senilai diuji terhadap pengulangan pembilang. Pengecoh penyebut dihitung dan bukan kelipatan kedua penyebut.
- Campuran: banyak bagian dihitung dengan perkalian (bulat × penyebut + pembilang) dan diuji terhadap penambahan bagian satu per satu. Pengecoh klasik: lupa pembilang, semua angka digabung, bulat dan penyebut digabung.
- B, Sama: pembilang dihitung dengan penjumlahan, penyebut tetap. Pengecoh dihitung: hasil kali pembilang, penyebut dijumlahkan atau dikalikan.
- B, Beda: KPK dihitung dengan perulangan kelipatan terbesar dari dua penyebut dan diuji terhadap irisan daftar kelipatan (121 pasang penyebut sampai 12). Penjumlahan dengan KPK dan penyederhanaan diuji terhadap hitungan mandiri (penjumlahan satu per satu dan pembagi dicoba dari besar ke kecil) untuk semua pasangan pembilang dan penyebut sampai 12. KPK yang salah dijelaskan berbeda: bukan kelipatan kedua penyebut, atau kelipatan keduanya tetapi bukan yang terkecil.
- B, Hasil: bentuk paling sederhana dihitung dengan FPB; pengecoh yang bernilai sama harus belum paling sederhana. Campuran dihitung dari hasil bagi dan sisa.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab B (pengurangan, kurang, kurangi, dan lambang kurang; diuji pada teks misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan). Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa jumlah, kurang, tambah, kurangi, penjumlahan, pengurangan, dan KPK, serta tanpa lambang tambah dan kurang di teks.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut, semua pesan bisa dieja. Uji mutasi pada logika lab: satu angka diubah, uji gagal.
