# Matematika Kelas 4 · Bab 6 · Simulasi SMISCPA (pola hibrida)

Bab: Piktogram dan Diagram Batang (`mtk-4-bab6`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab6`). Komponen: `src/components/modul/SimulasiK4Bab6.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab6.ts`, teks misi di `misi-teks-k4b6.ts`. Dimuat malas: registri memuat `SimulasiK4Bab6` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k4b6.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **dua sub-bab**: A (piktogram) dan B (diagram batang). Dikerjakan dalam dua gelombang: Gelombang 1 (Sub-Bab A, belum didaftarkan) dan Gelombang 2 (Sub-Bab B dan pendaftaran bab).

Berkas Materi bab ini tidak diubah (`SubBabK4B6A–B.tsx`, `naskah-k4b6.ts`, `data-k4b6.ts`, `paket-k4b6.ts`, dan lainnya). Tokoh skenario: Karel dan Putu (tokoh Materi). Data dari Buku Siswa: mainan Karel 6, 4, 3, 1, 9 (23); warna kesukaan 4, 2, 1, 5 (12); siswa per kelas 28, 24, 32, 20, 16, 12 dengan 1 simbol = 4 siswa; buku dipinjam Senin sampai Kamis 10, 8, 14, 6. Uji mencocokkan data lab dan mesin dengan `data-k4b6.ts`.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Piktogram (Turus, Susun, Baca) | `SimulasiLabPiktogramK4B6.tsx` + `lab-piktogram-k4b6a.ts` | Mesin Piktogram | Turus Kelas Karel (7 adegan) |

Mesin: `mesin-data-k4b6.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k4b6.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab6-ringkas.json`.

Pembantu: `eja-k4b6.ts` (pengeja suara: bilangan sampai 9.999, tanda hitung, lambang simbol), `model-piktogram-k4b6.tsx` (simbol lingkaran polos, deretan simbol, turus kelompok lima, keterangan). Piktogram cukup bentuk polos, tanpa gambar benda.

Metode luar buku dianyam: Turus Kategori / Categorical Tally (Turus), Kunci Piktogram / Pictograph Key (Susun), dan Baca Lalu Banding / Read then Compare (Baca).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Turus: catat 23 mainan Karel tanpa salah; Susun: piktogram warna kesukaan, 1 simbol = 1 siswa; Susun: piktogram siswa per kelas, 1 simbol = 4 siswa; Baca: kelas terbanyak dan banyak siswanya (Kelas 3, 32); Baca: selisih kelas terbanyak dan tersedikit (20) | Pilih banyak simbol tanpa skala (lupa skala, dijelaskan); buku dipinjam dengan 1 simbol = 4 buku (ditolak, tidak utuh) lalu dengan 1 simbol = 2 buku; jumlah siswa warna kesukaan (12) |

Near-miss tidak memenuhi misi: turus dengan satu benda di baris yang salah, turus yang banyaknya cocok tetapi dua benda tertukar, satu benda belum dicatat; piktogram dengan satu simbol kurang atau lebih; simbol sebanyak nilai tetapi keterangan lain; siswa per kelas dengan 1 simbol = 1 atau 2 siswa (tidak muat); hanya kelas terbanyak tanpa nilainya; nilai 8 (banyak simbol saja); selisih 5 (selisih simbol) atau 44 (jumlah); jumlah warna 5 (hanya merah). Keadaan awal (turus kosong, simbol nol, belum menjawab) tidak memenuhi misi mana pun.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Piktogram (A) | Skala → Simbol → Nilai → Banding | mainan Karel (1 simbol = 1, kelereng paling banyak), buku dipinjam (1 simbol = 2, selisih Rabu dan Kamis 8), siswa per kelas (1 simbol = 4, 33 simbol = 132 siswa) |

Data ditulis di pertanyaan (mesin tanpa gambar). Skala: keterangan dari 1, 2, 4 yang membuat semua simbol utuh dan tiap baris paling banyak 10 simbol (tepat satu yang sah). Simbol: nilai menjadi simbol. Nilai: simbol baris lain menjadi nilai. Banding: paling banyak, selisih, atau jumlah. Pengecoh dihitung: lupa skala, salah hitung satu simbol, jumlah dikira selisih, kurang satu simbol.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Turus Kelas Karel (A) | 7 | Turus 9 kelereng; memilih keterangan 1 simbol = 4 siswa (1 terlalu banyak, 3 tidak utuh); Kelas 3, 32 siswa = 8 simbol; Kelas 4 lima simbol = 20 siswa, mainan 23, selisih kelereng dan puzzle 8; Putu lupa skala, 3 × 4 = 12 siswa |

## Kejujuran konsep

- Turus: urutan benda adalah permutasi tetap dari data buku. Lab memeriksa catatan benda demi benda, jadi dua benda tertukar tetap ditolak walau banyak turusnya cocok.
- Susun: lab menolak keterangan yang tidak membagi habis semua nilai (simbol tidak utuh) dan yang membuat satu baris lebih dari 10 simbol. Baris benar bila simbol × skala sama dengan nilai. Uji membandingkan semua data dan semua keterangan dengan hitungan mandiri (pengurangan berulang, bukan pembagian): hanya warna dengan skala 1, siswa per kelas dengan skala 4, dan buku dengan skala 2 yang bisa.
- Baca, mesin, dan skenario: kunci dan semua pengecoh dihitung dari data dan diuji dengan hitungan mandiri (perulangan, pencarian indeks). Setiap sebutan "Kelas N … simbol" di skenario dicocokkan dengan data buku.
- Hanya bilangan bulat; tanpa setengah simbol.
- Konsep Sub-Bab B tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): A tanpa "batang", "sumbu", "tegak", "mendatar", "tinggi". Kedua sub-bab tanpa konsep di luar bab ("rata-rata", "modus", "median", "diagram lingkaran", "persen").

## Coba ini! (ringkas)

- **A:** buku dipinjam dengan 1 simbol = 4 buku; siswa per kelas dengan 1 simbol = 1 siswa; pilih banyak simbol saja untuk Kelas 3; mengapa kelompok lima diberi garis miring.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan semua tampilan lab; berpindah tampilan lab mengosongkan pesan lab agar tidak menyesatkan. Suara memakai `speakGuru`; bilangan dan tanda hitung dieja oleh `ejaK4B6`.

## Uji

- `node --no-warnings scripts/uji-lab-k4b6.mjs`: pengeja; data sama dengan buku; Lab Piktogram (dibandingkan dengan hitungan mandiri, fuzz 20.000 aksi, semua pesan dieja menjadi kata); mesin (kunci dan semua pengecoh dihitung ulang mandiri, letak kunci bervariasi); skenario (kunci dihitung dari data); misi dan near-miss lewat aksi lab; gerbang; data ringkas; konsep tidak bocor; tanpa jaringan, tanpa `correct_index` atau `explanation`
- `node --no-warnings scripts/uji-skenario-umum.mjs`: termasuk skenario Kelas 4 Bab 6A
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab6-ringkas.json`
