# Matematika Kelas 4 · Bab 5 · Simulasi SMISCPA (pola hibrida)

Bab: Bangun Datar (`mtk-4-bab5`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab5`). Komponen: `src/components/modul/SimulasiK4Bab5.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab5.ts`, teks misi di `misi-teks-k4b5.ts`.

**Status: Gelombang 1 (Sub-Bab A).** Bab belum didaftarkan di `registri-simulasi.ts`; Gelombang 2 menambah Sub-Bab B (Komposisi dan Dekomposisi, pencapaian bab) lalu mendaftarkan bab.

Berkas Materi bab ini tidak diubah (`SubBabK4B5A–B.tsx`, `naskah-k4b5.ts`, `data-k4b5.ts`, `paket-k4b5.ts`, dan lainnya). Tokoh skenario: Helen (tokoh Materi). Contoh buku: segitiga KLM siku di K.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Ciri (Paku, Pilah, Kenali) | `SimulasiLabCiriK4B5.tsx` + `lab-ciri-k4b5a.ts` | Mesin Ciri | Papan Paku Helen (7 adegan) |

Mesin: `mesin-data-k4b5.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k4b5.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab5-ringkas.json`.

Pembantu: `eja-k4b5.ts` (pengeja suara: bilangan sampai 9.999, derajat, cm, tanda hitung) dan `model-bangun-k4b5.tsx` (papan paku berupa titik dan garis, bangun polos dari panjang sisi dan sudut, jalur lurus atau lengkung; hanya bentuk polos).

Metode luar buku dianyam: van Hiele Visual–Analisis (dari melihat bentuk ke menyebut ciri: Kenali lalu Paku), Pilah Ciri / Attribute Sort (Pilah menurut sudut, sisi, beraturan), dan Papan Paku / Geoboard (Paku).

## Misi

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Kenali: kelompokkan tujuh gambar (bukan segi banyak, segitiga, segiempat, segilima, segienam); Paku: segitiga siku-siku; Paku: persegi; Paku: trapesium (tepat satu pasang sisi sejajar); Pilah: enam segitiga menurut sudut | Belah ketupat yang bukan persegi; tiga paku segaris (ditolak dan dijelaskan); pilah segitiga menurut sisi |

Ditambah Mesin Ciri dan skenario Papan Paku Helen (tujuh wajib). Near-miss tidak memenuhi misi: segitiga lancip atau tumpul untuk misi siku-siku, persegi panjang atau belah ketupat untuk misi persegi, jajargenjang, persegi, atau layang-layang untuk misi trapesium, persegi untuk tantangan belah ketupat, pilahan dengan satu salah atau satu belum dipilah, lingkaran atau garis terbuka sebagai segi banyak. Keadaan awal (papan kosong, pilahan kosong) tidak memenuhi misi mana pun.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Ciri (A) | Sisi → Sudut → Sejajar → Nama | penggaris segitiga (segitiga siku-siku), kaca jendela (persegi panjang, pengecoh persegi), permukaan meja kelompok (trapesium, pengecoh jajargenjang) |

Semua kunci dan pengecoh dihitung dari koordinat titik sudut kasus.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Papan Paku Helen (A) | 7 | Segi banyak tertutup dan lurus (lingkaran dan garis terbuka ditolak); hitung enam sisi = segienam; KLM siku di K; persegi 4 sudut siku, persegi panjang 2 pasang sejajar, trapesium 1 pasang; persegi + segitiga = 7 sisi |

## Kejujuran konsep

- Ciri di Paku **dihitung dari koordinat bulat**: kuadrat panjang sisi (sisi sama), hasil kali titik (lancip, siku, tumpul), hasil kali silang (sejajar, sudut ke dalam, karet bersilang, paku segaris). Uji membandingkan SEMUA segitiga (2.300) dan semua urutan segiempat di papan 5 × 5 dengan hitungan mandiri yang berbeda (arccos, Math.hypot, kemiringan pecahan, perpotongan berparameter), serta 20.000 segilima/segienam acak.
- Segitiga sama sisi dan segi banyak beraturan selain persegi mustahil di papan persegi; lab tidak memaksakannya. Pilah sisi dan beraturan memakai bangun dari panjang sisi bulat (dan sudut derajat bulat), dicek dengan ketaksamaan segitiga, jumlah sudut, dan penutupan bangun.
- Jenis sudut segitiga di Pilah dihitung dari kuadrat sisi terpanjang dibanding jumlah kuadrat dua sisi lain; uji memakai aturan kosinus. Gambar meletakkan sudut terbesar di kiri bawah dengan satu sisi mendatar agar mudah dibandingkan dengan pojok buku.
- Lab menyebut nama paling khusus (misalnya "persegi") tanpa menyatakan persegi bukan persegi panjang; tidak ada misi yang bergantung pada hal itu.
- Konsep Sub-Bab B tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa "komposisi", "tangram", "keping", "potong", "gabung", "urai", "susun", "iris", "pecah".

## Uji

- `node --no-warnings scripts/uji-lab-k4b5.mjs` (319 cek pada Gelombang 1)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: termasuk Papan Paku Helen
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab5-ringkas.json`
