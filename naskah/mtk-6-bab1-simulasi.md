# Matematika Kelas 6 · Bab 1 · Simulasi SMISCPA (pola hibrida)

Bab: Pecahan dan Desimal (`mtk-6-bab1`, `FASE_C`, kelas 6; kode data Materi `k6-mat-bab1`). Komponen: `src/components/modul/SimulasiK6Bab1.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k6bab1.ts`, teks misi di `misi-teks-k6b1.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang C (terakhir).

Bab ini punya **tiga sub-bab**: A (Perkalian Pecahan), B (Pembagian Pecahan), dan C (Bilangan Desimal). Dikerjakan dalam tiga gelombang, satu sub-bab per gelombang. Gelombang A dan B tidak mendaftarkan bab; gelombang C mendaftarkan bab dan menjadi pencapaian bab.

**Status: gelombang A (Perkalian Pecahan) dan B (Pembagian Pecahan) selesai. Gelombang C menyusul. Bab belum didaftarkan di registri.**

Berkas Materi bab ini tidak diubah (`SubBabK6B1A–C.tsx`, `naskah-k6b1.ts`, `data-k6b1.ts`, `paket-k6b1.ts`, dan lainnya). Pengeja suara memakai `ejaK6B1` (berkas baru `eja-k6b1.ts`) lewat prop `eja` mesin dan di lab. Pengeja ini mengeja bilangan bulat sampai 999.999, pecahan `a/b`, bilangan desimal bertanda koma, tanda kali, bagi, tambah, kurang, sama dengan, lebih dari, kurang dari, dan kurung.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `3/5` | tiga per lima |
| `1/2`, `1/4`, `3/4` | setengah, seperempat, tiga perempat (bentuk lazim) |
| `2 × 3/5 = 6/5` | dua dikali tiga per lima sama dengan enam per lima |
| `(2×3)/(1×5)` | kurung buka dua dikali tiga kurung tutup per kurung buka satu dikali lima kurung tutup |
| `0,5` / `0,50` / `2,85` | nol koma lima / nol koma lima nol / dua koma delapan lima (angka di belakang koma satu per satu) |
| `3 : 1/4` | tiga dibagi seperempat |
| `m²` | meter persegi |

Bilangan 1 sampai 999.999, semua pecahan `a/b` dengan a dan b sampai 30, dan desimal dengan bagian bulat 0 sampai 99 diuji terhadap hitungan mandiri per digit di skrip uji. Tokoh skenario A: Agam, yang membantu Ayah menyiram kebun (tokoh dari Materi).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Kali Pecahan (Luas, Panah, Tukar) | `SimulasiLabKaliK6B1.tsx` + `lab-kali-k6b1a.ts` | Mesin Kali Pecahan | Agam dan Kebun Ayah (8 adegan) |
| B | Lab Bagi Pecahan (Potong, Silang, Muat) | `SimulasiLabBagiK6B1.tsx` + `lab-bagi-k6b1b.ts` | Mesin Bagi Pecahan | Agam, Gelas, dan Sirup (8 adegan) |

Mesin: `mesin-kali-k6b1.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k6b1.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar B: `model-bagi-k6b1.tsx` (batang yang dipotong lagi: tiap utuh berisi b kotak, sesudah dipotong b × c kotak kecil, satu dari c bagian sama berwarna ungu). Mesin B: `mesin-bagi-k6b1.ts`. Model gambar A: `model-kali-k6b1.tsx` (pecahan bertumpuk dengan kotak merah untuk bilangan asli a/1, dan petak berisi n kotak sama besar yang diarsir ember demi ember: ember ganjil emas, ember genap ungu). Data ringkas Mind-Map dan Infografis: `src/data/kelas6-bab1-ringkas.json`. Uji: `scripts/uji-lab-k6b1.mjs`.

Metode luar buku yang dianyam. B: Partition Division (Potong: tiap potongan dipotong lagi menjadi c bagian sama, penyebut dikali c, pembilang tetap), Reciprocal dan Cross-Arrow Divide Protocol (Silang: pembagi dibalik, bagi menjadi kali, atas kali atas dan bawah kali bawah, hasil disederhanakan bila bisa), dan Measurement Division (Muat: bilangan asli dibagi pecahan kurang dari satu menghitung berapa kali pembagi muat, hasil membesar, lalu dicek dengan perkalian). A: Area Model Multiplication (Luas: tiap ember mengarsir kotak, pembilang bertambah, penyebut tetap karena ukuran kotak tidak berubah), Whole-as-Fraction dan Straight-Arrow Multiply (Panah: bilangan asli ditulis a/1 dengan kotak merah, atas dikali atas, bawah dikali bawah, hasil disederhanakan bila bisa), dan Commutative Multiply Check (Tukar: pecahan kali bilangan asli, lalu urutan dibalik dan hasilnya dicek sama).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Luas: dua ember kecil, 2 × 3/5 = 6/5; Luas: lima ember penuh, 5 × 3/5 = 3 (petak utuh); Panah: 2 × 3/5 dengan 2 ditulis 2/1 lalu panah lurus; Panah: 4 × 2/5 = 8/5 (lebih dari satu); Tukar: 2/3 × 15 = 10, disederhanakan, lalu urutan dibalik dan dicek | Luas: keenam soal; Panah: keenam soal; Tukar: keenam soal |
| B | Potong: setengah dibagi tiga sama dengan satu per enam; Silang: setengah dibagi tiga lewat kebalikan; Silang: enam dibagi tiga perempat (balik, kali, sederhanakan); Muat: tiga dibagi seperempat sama dengan dua belas, dicek; Muat: enam dibagi tiga perempat sama dengan delapan, dicek | Potong, Silang, Muat: keenam soal masing-masing |

Near-miss tidak memenuhi misi: pembilang dipilih sebelum semua ember dipakai (ember kurang satu), penyebut sebelum pembilang, pembilang atau penyebut yang salah (jumlah, penyebut ikut dikali, satu ember saja), Panah tanpa menulis a/1, a/1 yang salah (tertukar atau sama), bawah yang salah, berhenti sebelum menyederhanakan, Tukar yang berhenti di tahap tengah, cek urutan dengan jawaban "beda", dan riwayat pada soal lain.

Near-miss B: langkah yang dilompati (misalnya cek sebelum hasil, atau panah silang sebelum pembagi dibalik), kebalikan yang tidak dibalik atau berpenyebut sama, atas atau bawah yang dijumlah, hasil yang tidak disederhanakan pada soal 6 : 3/4, dan cek yang berhenti sebelum hasil kali kembali ke bilangan awal.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Kali Pecahan (A) | Tulis a/1 → Atas → Bawah → Hasil | Ember Kebun (2 × 3/5 = 6/5), Gelas Sirup (4 × 2/5 = 8/5), Pohon Manalagi (15 × 2/3 = 30/3 = 10) |

Mesin B: **Mesin Bagi Pecahan** (Kebalikan → Silang → Hasil → Cek) dengan kasus Gelas Sirup (1/2 : 3 = 1/6), Muat Gelas Kecil (3 : 1/4 = 12), dan Bolu Pasar (6 : 3/4 = 24/3 = 8). Pengecoh B: pembagi tidak dibalik atau penyebut sama, atas yang dikali dengan penyebut atau dijumlah, hasil yang tidak dibalik atau terbalik atas-bawah, serta hasil dan pembagi sebagai pengecoh cek.

Pengecoh A dihitung dari kesalahan khas: a/1 tertukar atau pembilang sama dengan penyebut (Tulis), pembilang dijumlah atau hanya satu pecahan (Atas), satu lebihnya atau penyebut ikut dikali (Bawah), dan penyebut ikut dikali atau pembilang saja (Hasil). Letak kunci bervariasi (diputar, diuji eksak).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Agam dan Kebun Ayah (A) | 8 | Narasi ember kecil 3/5 meter persegi; dua ember (pengecoh 6/10 dan 5/5); ketuk 5 stik untuk 5 ember, 5 × 3/5 = 15/5 = 3; Whole-as-Fraction dan Panah Lurus (2 = 2/1 lalu 6/5); pohon manalagi 2/3 × 15 = 10 dan 1/4 × 20 = 5 (Commutative Multiply Check); isi 4 gelas, 4 × 2/5 = 8/5 liter; memperbaiki tulisan 2 × 3/5 = 6/10 (penyebut tidak ikut dikali); penutup. |
| Agam, Gelas, dan Sirup (B) | 8 | Narasi 1/2 liter untuk 3 gelas; Partition Division 1/2 : 3 = 1/6 liter (pengecoh 3/2 dan 1/5); ketuk 3 stik untuk 3 gelas; kebalikan 3/1 adalah 1/3 dan 1/2 × 1/3 = 1/6; 3 : 1/4 = 12 dan 6 : 3/4 = 24/3 = 8 (Measurement Division); isi 8 stik untuk 8 pembeli bolu; memperbaiki 3 : 1/4 = 3/4 yang belum dibalik, dicek 12 × 1/4 = 3; penutup. |

## Kejujuran konsep

- Luas: ember ditambah satu per satu sampai k ember; pembilang (semua kotak terarsir) baru bisa dipilih setelah ember lengkap, penyebut setelah pembilang. Penyebut tetap karena ukuran kotak tidak berubah; pengecoh penyebut ikut dikali atau dijumlah ditolak dengan alasan. Hasil dikaitkan dengan petak: lebih dari satu, tepat utuh, atau kurang dari satu.
- Panah: urutan wajib a/1, atas, bawah, lalu menyederhanakan hanya untuk soal yang bisa disederhanakan (tiga dari enam). Tahap yang sudah lewat diabaikan, tahap yang belum waktunya ditolak dengan pesan.
- Tukar: hasil kali atas, lalu hasil utuh (hint memakai perkalian, bukan pembagian), lalu cek urutan terbalik; hasil riwayat hanya dicatat setelah cek benar.
- Penyederhanaan di uji dihitung mandiri lewat penyebut terkecil dan perkalian silang, berbeda dari gcd di kode.
- Lab B memakai satu mesin langkah: soal selesai hanya bila semua langkah soal itu benar berurutan (Potong: penyebut, pembilang, sederhana bila perlu; Silang: kebalikan, atas, bawah, sederhana bila perlu; Muat: arti, hasil, cek). Langkah yang sudah lewat diabaikan, yang belum waktunya ditolak dengan pesan, dan langkah yang tidak ada pada soal itu (misalnya sederhana pada hasil yang sudah sederhana) diabaikan. Riwayat hanya dari langkah terakhir yang benar.
- Hasil Sub-Bab B dicek mandiri di uji lewat perkalian silang (hasil × pembagi = bilangan awal), bukan lewat pembagian di kode.
- Konsep Sub-Bab C (desimal, koma, persepuluhan, perseratusan) tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan).
- Konsep Sub-Bab B dan C tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa pembagian, kebalikan, panah menyilang, dan desimal.
- Fuzz 20.000 aksi Lab Bagi Pecahan (orakel mandiri mencatat langkah dan tahap dari rencana, termasuk alat, nama langkah, dan pilihan asing). Fuzz 20.000 aksi Lab Kali Pecahan: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri mencatat tiap tahap dari rencana). Indeks pecahan, negatif, dan di luar batas diabaikan.
- Emoji: paling baru Emoji 12 (diuji pada semua berkas simulasi dan data ringkas Bab 1). Temuan Materi: `naskah-k6b1.ts` dan `kelas6-bab1.json` memuat satu emoji di atas Emoji 12 (U+1FAB4); tidak diubah dan hanya dilaporkan.
