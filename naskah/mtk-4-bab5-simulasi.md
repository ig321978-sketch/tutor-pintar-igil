# Matematika Kelas 4 · Bab 5 · Simulasi SMISCPA (pola hibrida)

Bab: Bangun Datar (`mtk-4-bab5`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab5`). Komponen: `src/components/modul/SimulasiK4Bab5.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab5.ts`, teks misi di `misi-teks-k4b5.ts`. Dimuat malas: registri memuat `SimulasiK4Bab5` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k4b5.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **dua sub-bab**: A (ciri-ciri bangun datar) dan B (komposisi dan dekomposisi). Dikerjakan dalam dua gelombang: Gelombang 1 (Sub-Bab A, belum didaftarkan) dan Gelombang 2 (Sub-Bab B dan pendaftaran bab). Sub-Bab B menjadi simulasi pencapaian misi bab: skenario Bengkel Kertas Helen mengulang ciri bangun (rumah segilima, sudut siku-siku) sambil menyusun dan mengurai.

Berkas Materi bab ini tidak diubah (`SubBabK4B5A–B.tsx`, `naskah-k4b5.ts`, `data-k4b5.ts`, `paket-k4b5.ts`, dan lainnya). Tokoh skenario: Helen (tokoh Materi). Contoh buku: segitiga KLM siku di K, persegi ↔ 2 segitiga, segienam → 6 segitiga, trapesium dari 3 segitiga, tangram, dan peta yang dibagi menjadi bangun datar.

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Ciri (Paku, Pilah, Kenali) | `SimulasiLabCiriK4B5.tsx` + `lab-ciri-k4b5a.ts` | Mesin Ciri | Papan Paku Helen (7 adegan) |
| B | Lab Susun (Susun, Urai, Tangram) | `SimulasiLabSusunK4B5.tsx` + `lab-susun-k4b5b.ts` | Mesin Susun-Urai | Bengkel Kertas Helen (8 adegan) |

Mesin: `mesin-data-k4b5.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k4b5.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab5-ringkas.json` (sub-bab A dan B).

Pembantu: `eja-k4b5.ts` (pengeja suara: bilangan sampai 9.999, derajat, cm, tanda hitung), `model-bangun-k4b5.tsx` (A: papan paku, bangun polos dari panjang sisi dan sudut, jalur lurus atau lengkung) dan `model-susun-k4b5.tsx` (B: papan petak berisi segitiga perempat untuk keping dan siluet, bangun yang dipotong dari titik ke titik). Hanya titik, garis, dan bentuk polos berwarna.

Metode luar buku dianyam: van Hiele Visual–Analisis (Kenali lalu Paku), Pilah Ciri / Attribute Sort (Pilah), dan Papan Paku / Geoboard (Paku) di A; Susun Bangun / Compose Shapes (Susun), Urai Bangun / Decompose Shapes (Urai), dan Tangram (Tangram) di B.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Kenali: kelompokkan tujuh gambar (bukan segi banyak, segitiga, segiempat, segilima, segienam); Paku: segitiga siku-siku; Paku: persegi; Paku: trapesium (tepat satu pasang sisi sejajar); Pilah: enam segitiga menurut sudut | Belah ketupat yang bukan persegi; tiga paku segaris (ditolak dan dijelaskan); pilah segitiga menurut sisi |
| B | Susun: dua segitiga menjadi persegi; dua segitiga menjadi jajargenjang; tiga segitiga menjadi trapesium; Urai: segienam beraturan menjadi enam segitiga; Tangram: siluet segitiga besar dengan lebih dari satu keping | Urai persegi dengan dua cara (dua segitiga dan dua persegi panjang); keping bertumpuk (ditolak dan dijelaskan); persegi besar dari ketujuh keping tangram |

Near-miss tidak memenuhi misi: segitiga lancip atau tumpul untuk misi siku-siku, persegi panjang atau belah ketupat untuk misi persegi, jajargenjang, persegi, atau layang-layang untuk misi trapesium, pilahan dengan satu salah atau satu belum dipilah, lingkaran atau garis terbuka sebagai segi banyak; satu keping persegi atau empat segitiga untuk misi persegi, segitiga besar untuk misi jajargenjang, dua segitiga dan satu persegi untuk misi trapesium, segienam lima bagian, siluet segitiga dengan satu keping atau masih bercelah, enam keping untuk persegi besar. Keadaan awal (papan kosong, pilahan kosong, bangun utuh, siluet kosong) tidak memenuhi misi mana pun.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Ciri (A) | Sisi → Sudut → Sejajar → Nama | penggaris segitiga (segitiga siku-siku), kaca jendela (persegi panjang, pengecoh persegi), permukaan meja kelompok (trapesium, pengecoh jajargenjang) |
| Mesin Susun-Urai (B) | Jenis → Bagian → Nama → Luas | kertas persegi Helen diurai menjadi 2 segitiga siku-siku; hiasan segienam diurai menjadi 6 segitiga sama sisi; 3 segitiga sama sisi disusun menjadi trapesium (luas total tetap) |

Semua kunci dan pengecoh dihitung dari koordinat titik sudut kasus (kisi persegi atau kisi segitiga).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Papan Paku Helen (A) | 7 | Segi banyak tertutup dan lurus; enam sisi = segienam; KLM siku di K; persegi 4 sudut siku, persegi panjang 2 pasang sejajar, trapesium 1 pasang; persegi + segitiga = 7 sisi |
| Bengkel Kertas Helen (B, pencapaian bab) | 8 | Persegi dipotong diagonal = 2 segitiga siku-siku; menyusun = komposisi; segienam = 6 segitiga; trapesium dari 3 segitiga sama sisi; rumah 5 sisi, 1 sudut siku-siku, tangram 7 keping; peta dibagi = dekomposisi |

## Kejujuran konsep

- A: ciri di Paku **dihitung dari koordinat bulat** (kuadrat panjang, hasil kali titik, hasil kali silang). Uji membandingkan semua segitiga dan semua urutan segiempat di papan 5 × 5 dengan hitungan mandiri yang berbeda (arccos, Math.hypot, kemiringan pecahan, perpotongan berparameter). Segitiga sama sisi dan segi banyak beraturan selain persegi mustahil di papan persegi; Pilah memakai bangun dari panjang sisi dan sudut bulat.
- B: tiap petak dibagi empat segitiga perempat. Tepi bangun gabungan dihitung dari ruas yang hanya dimiliki satu perempat, lalu dinamai dari ciri. Uji membandingkan semua susunan dua keping dan 30.000 susunan tiga keping dengan hitungan mandiri (sambungan lewat sisi, selubung cembung, luas).
- Urai memakai kisi segitiga untuk trapesium dan segienam, sehingga segitiga sama sisi dihitung tepat dengan bilangan bulat (a² + ab + b²). Potongan lurus yang melewati titik tengah boleh membelah dua bagian sekaligus. Uji memeriksa semua satu dan dua potongan: luas tetap, tiap bagian cembung, nama bagian sama dengan hitungan mandiri.
- Tangram: tujuh keping baku menutup persegi 4 × 4 tanpa bertumpuk; putar dan balik menjaga bentuk dan luas; pencarian menyeluruh mandiri menemukan cara menutup siluet segitiga besar dengan beberapa keping.
- Lab menyebut nama paling khusus (misalnya "persegi") tanpa menyatakan persegi bukan persegi panjang; tidak ada misi yang bergantung pada hal itu.
- Hanya bilangan bulat dalam logika; desimal hanya untuk menggambar dan untuk hitungan mandiri di uji.
- Konsep Sub-Bab B tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): A tanpa "komposisi", "tangram", "keping", "potong", "gabung", "urai", "susun", "iris", "pecah".

## Coba ini! (ringkas)

- **A:** bentuk persegi panjang lalu persegi; pasang karet di tiga paku segaris; pilah menurut sisi; mengapa lingkaran bukan segi banyak.
- **B:** buat rumah dari 2 persegi dan 2 segitiga; urai persegi dengan dua cara; potong trapesium menjadi segitiga sama sisi; tutup segitiga besar dengan cara lain.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan semua tampilan lab; berpindah tampilan lab mengosongkan pesan lab agar tidak menyesatkan. Suara memakai `speakGuru`; bilangan, derajat, dan tanda hitung dieja oleh `ejaK4B5`.

## Uji

- `node --no-warnings scripts/uji-lab-k4b5.mjs` (530 cek): pengeja; Lab Ciri dan Lab Susun (dibandingkan dengan hitungan mandiri, fuzz 20.000 aksi per lab, semua pesan dieja menjadi kata); dua mesin (kunci dan semua pengecoh dihitung ulang mandiri, letak kunci bervariasi); dua skenario (kunci dihitung dari data); misi dan near-miss lewat tombol alat; gerbang; data ringkas; konsep tidak bocor; tanpa jaringan, tanpa `correct_index` atau `explanation`
- `node --no-warnings scripts/uji-skenario-umum.mjs`: termasuk dua skenario Kelas 4 Bab 5
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab5-ringkas.json`
