# Matematika Kelas 4 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Bab: Pengukuran Luas dan Volume (`mtk-4-bab4`, `FASE_B`, kelas 4; kode data Materi `k4-mat-bab4`). Komponen: `src/components/modul/SimulasiK4Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k4bab4.ts`, teks misi di `misi-teks-k4b4.ts`. Dimuat malas: registri memuat `SimulasiK4Bab4` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k4b4.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Bab ini punya **dua sub-bab**: A (pengukuran luas) dan B (pengukuran volume). Sub-Bab B menjadi simulasi pencapaian misi bab: skenario Dapur Helen mengulang 1 m² = 10.000 cm², botol A = 4 botol B = 10 botol C, sanitizer, kubus satuan, 1 l = 1.000 ml, 1 cm³ = 1 ml, dan 1 m³ = 1.000 l.

Berkas Materi bab ini tidak diubah (`SubBabK4B4A–B.tsx`, `naskah-k4b4.ts`, `data-k4b4.ts`, `paket-k4b4.ts`, dan lainnya). Angka mengikuti buku: meja Helen ditutup uang kertas, aktivitas lipat, bangun 13 cm² dengan bentuk berbeda, 1 m² = 10.000 cm², botol A = 4B dan A = 10C, botol besar sanitizer = 8 botol kecil, sendok 5 ml, cangkir 240 ml, susu UHT 1.000 ml = 1 l, bangun (i) 24 cm³ dan (ii) 9 cm³, dan 1 m³ = 1.000 l. Tokoh skenario: Helen (tokoh Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Luas (Tutup, Kisi, Ubah) | `SimulasiLabLuasK4B4.tsx` + `lab-luas-k4b4a.ts` | Mesin Luas | Meja Lipat Helen (7 adegan) |
| B | Lab Volume (Tuang, Kubus, Takar) | `SimulasiLabVolumeK4B4.tsx` + `lab-volume-k4b4b.ts` | Mesin Volume | Dapur Helen (8 adegan) |

Mesin: `mesin-data-k4b4.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts` dari Bab 1 Kelas 3. Skenario: `skenario-k4b4.ts`, dijalankan `SimulasiSkenario.tsx`. Data ringkas Mind-Map dan Infografis: `src/data/kelas4-bab4-ringkas.json` (sub-bab A dan B).

Pembantu: `eja-k4b4.ts` (pengeja suara: bilangan sampai 999.999 dengan titik ribuan, satuan cm², m², cm³, m³, ml, l, cm, m, serta tanda hitung) dan `model-ukur-k4b4.tsx` (kisi sel polos untuk meja dan kertas berpetak dengan garis tebal di batas antarubin, batang isi wadah, lapisan kubus satuan sebagai persegi polos, dan gelas takar bergaris; hanya bentuk polos berwarna).

Lab 3D tidak dipakai. CPA tetap di Concrete, Picture, Abstract; simulasi hanya memakai sel, persegi, batang, dan angka. Metode: lab 2D bergaya PhET (manipulasi langsung), mesin keadaan, dan skenario kontekstual. Metode luar buku dianyam: Luas sebagai Menutupi (Tutup), Luas Susunan (Kisi), Tak Baku ke Baku (Tutup lalu Ubah) di A; Volume sebagai Mengisi (Tuang), Model Lapisan (Kubus), dan Ide Pemindahan Air (Takar, celup balok) di B.

Mengapa laboratorium langsung: kesalahan khas bab ini adalah menutup dengan celah atau bertumpuk, menganggap hasil satuan tidak baku yang berbeda berarti luas berbeda, menjumlah baris dan kolom, mengira 1 m² = 100 cm², menghitung satu lapisan kubus saja, mengira 1 l = 100 ml, dan mencampur satuan luas dengan satuan volume. Di lab, anak menutup, mengarsir, menuang, dan menyusun sendiri, dan akibat setiap kesalahan terlihat.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, ditambah mesin dan skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Tutup meja dengan uang kertas tanpa celah (12); tutup meja yang sama dengan origami (6); arsir satu bangun 13 cm²; arsir persegi panjang 3 baris × 4 (12 cm²); ubah 2 m² = 20.000 cm² | Ubin bertumpuk (ditolak dan dijelaskan); dua bangun berbeda bentuk yang sama-sama 13 cm²; 30.000 cm² = 3 m² |
| B | Isi botol A dari botol B (4); isi botol A dari botol C (10); susun dua lapisan berisi 24 kubus satuan (24 cm³); satu lapisan berisi 9 kubus (9 cm³); takar tepat 1.000 ml air = 1 l | Celup balok 50 cm³ (air naik 50 ml); tuang sampai tumpah (ditolak dan dijelaskan); botol besar sanitizer = 8 botol kecil |

Near-miss tidak memenuhi misi: meja dengan satu celah, 12 atau 14 sel, 13 sel yang terpisah, persegi panjang 4 × 3 untuk misi 3 × 4, 200 cm² untuk 2 m², 3 atau 9 tuangan, 24 kubus dalam tiga lapisan, 900 ml air, dan air yang mencapai garis 1.000 ml karena balok tercelup.

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji): A Tutup memakai kartu dengan meja kosong, Kisi kosong, Ubah 1 m² tanpa jawaban; B Tuang botol A dari botol B kosong, Kubus 2 × 2 satu lapisan belum dihitung, Takar gelas kosong; tanpa riwayat. Mesin mulai dari stasiun pertama; skenario dari adegan pertama.

## Mesin berstasiun

Empat stasiun per mesin, tiga kasus. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari data kasusnya; letak kunci diputar.

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Luas (A) | Satuan → Hitung → Luas → Bandingkan | bingkai foto 3 baris × 4 (12 cm², sama dengan kartu 2 × 6); bangun berbaris 4, 4, 3, 2 (13 cm², lebih besar dari persegi panjang 3 × 4); lantai teras 2 × 3 m (6 m², sama dengan karpet 60.000 cm²) |
| Mesin Volume (B) | Satuan → Hitung → Ubah → Bandingkan | susu 10 gelas kecil × 100 ml (1.000 ml = 1 l); bangun kubus 3 × 4, 2 lapisan (24 cm³ = 24 ml); kolam kecil 2 × 2 m, 1 lapisan (4 m³ = 4.000 l) |

Pengecoh bersumber dari kesalahan umum: satuan panjang (cm, m) untuk luas, satuan luas untuk volume, menjumlah baris dan kolom, menghitung tepi, menganggap bangun tak beraturan sebagai persegi panjang, satu lapisan saja, 1 l = 100 ml, dan 1 m³ = 100 l. Semua pengecoh dihitung dan terbukti bernilai lain dari kunci. Teks pertanyaan dieja `ejaK3` (bilangan sampai 9.999), jadi bilangan 10.000 ke atas ditulis "60 ribu" dan satuan di pertanyaan ditulis dengan kata.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Meja Lipat Helen (A) | 7 | Susun uang kertas rapat tanpa celah dan tidak bertumpuk; hitung 2 baris × 3 uang kertas (6); mengapa 4 buku berbeda dari 6 uang kertas (buku lebih besar); persegi panjang 3 × 4 = 12 cm²; 1 m² = 10.000 cm² dan 3 m² = 30.000 cm² |
| Dapur Helen (B, pencapaian bab) | 8 | Taplak 1 m² = 10.000 cm² (100 cm² ditolak); botol A = 4 botol B; A = 10 botol C dan sanitizer 8 botol kecil; kubus gula 2 lapisan × 2 × 3 = 12 cm³; "1.000 ml = 10 l" ditolak; 12 cm³ = 12 ml, air naik 50 ml = 50 cm³, 1 m³ = 1.000 l |

## Kejujuran konsep

- Luas dan volume **dihitung dari data**, bukan ditulis tangan: banyak ubin dari ubin terpasang, luas dari sel yang diarsir, volume dengan menjumlah lapis demi lapis, isi wadah dengan menambah takaran tiap tuangan. Uji membandingkannya dengan hitungan mandiri yang berbeda (luas meja dibagi luas ubin, baris × kolom, baris × kolom × lapisan, isi wadah dibagi isi takaran, 100 × 100 × n).
- Luas = menutup tanpa celah dan tanpa bertumpuk; lab menolak ubin bertumpuk dan ubin yang keluar meja, dan hanya meja tertutup penuh yang diterima.
- Satuan tidak baku: meja yang sama tertutup 24 kartu, 12 uang kertas, atau 6 origami. Banyaknya berbeda karena ukuran ubin berbeda; luas mejanya tetap.
- 1 m² = 100 × 100 = 10.000 cm²; jawaban 100 dijelaskan sebagai panjang satu sisi saja.
- Volume: 1 kubus satuan bersisi 1 cm = 1 cm³ = 1 ml. Muka air naik tepat sebanyak volume balok. Air bersama balok tidak dihitung sebagai 1 l air.
- Hanya bilangan bulat; tanpa liter pecahan.
- Konsep Sub-Bab B tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, logika, semua pesan lab hasil fuzz, dan ucapan): A tanpa "volume", "kubus", "kubik", "cm³", "m³", "ml", "liter", "lapisan", "botol", "tuang", "takar", "pejal", dan "celup".

## Coba ini! (ringkas)

- **A:** tutup meja dengan kartu lalu origami; taruh ubin di atas ubin lain; buat dua bangun berbeda bentuk yang luasnya sama; pilih 100 untuk 1 m².
- **B:** isi botol A dari botol B lalu dari botol C; tuang lagi setelah penuh; ubah lapisan dari 1 ke 2; tuang air lalu celupkan balok.
- **Mesin dan skenario:** ketuk stasiun lanjutan sebelum waktunya; pilih tindakan yang kurang tepat dulu.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan semua tampilan lab; berpindah tampilan lab mengosongkan pesan lab agar tidak menyesatkan. Suara memakai `speakGuru`; satuan, titik ribuan, dan tanda hitung dieja oleh `ejaK4B4`.

## Uji

- `node --no-warnings scripts/uji-lab-k4b4.mjs`: pengeja suara; dua lab (Tutup untuk semua ubin dengan celah, bertumpuk, dan keluar meja; semua persegi panjang di Kisi, bangun 13 sel, bentuk berbeda dan bentuk sama yang digeser, sel terpisah; Ubah untuk semua n dan arah dengan semua pengecoh; Tuang untuk semua kasus sampai tumpah; semua susunan Kubus; Takar dengan beberapa cara mencapai 1.000 ml, tumpah, dan celup; fuzz 20.000 aksi per lab dengan riwayat tidak dicabut, dan semua pesan hasil fuzz dieja menjadi kata); dua mesin (struktur, permainan penuh, semua jawaban salah ditolak dengan petunjuk, kunci dan SEMUA pengecoh dihitung ulang mandiri, letak kunci bervariasi, teks dapat dieja mesin); dua skenario (kunci dihitung mandiri dari data lab); struktur misi (tujuh wajib dan tiga bebas per sub-bab, keadaan awal tidak memenuhi misi mana pun); bukti tiap misi bisa dicapai lewat tombol alat dan near-miss tidak memenuhinya; gerbang; dan konsep tidak bocor, tanpa jaringan, tanpa `correct_index` atau `explanation` (496 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk dua skenario Kelas 4 Bab 4
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas4-bab4-ringkas.json`
