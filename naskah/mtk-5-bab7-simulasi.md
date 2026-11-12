# Matematika Kelas 5 · Bab 7 · Simulasi SMISCPA (pola hibrida)

Bab: Membandingkan Ciri-Ciri Bangun Datar (`mtk-5-bab7`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab7`). Komponen: `src/components/modul/SimulasiK5Bab7.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab7.ts`, teks misi di `misi-teks-k5b7.ts`. Dimuat malas lewat `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`); bab didaftarkan di gelombang terakhir.

Bab ini punya **dua sub-bab**: A (ciri segitiga) dan B (ciri segi empat). Dikerjakan dalam dua gelombang, satu sub-bab per gelombang. Gelombang A tidak didaftarkan di registri; gelombang B mendaftarkan bab dan menjadi pencapaian bab.

**Status: Gelombang A selesai (Sub-Bab A, Ciri Segitiga). Bab belum didaftarkan di registri.**

Berkas Materi bab ini tidak diubah (`SubBabK5B7A–B.tsx`, `naskah-k5b7.ts`, `data-k5b7.ts`, `paket-k5b7.ts`, dan lainnya). Pengeja suara memakai `ejaK5B7` (berkas baru `eja-k5b7.ts`) lewat prop `eja` mesin dan di lab. Pengeja ini mengeja tanda derajat (°), sudut (∠), siku-siku (∟), dan tanda banding (lebih besar, lebih kecil, tidak sama dengan).

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `180°` | seratus delapan puluh derajat |
| `5 + 6 = 11` | lima ditambah enam sama dengan sebelas |
| `5 + 4 > 12` | lima ditambah empat lebih besar dari dua belas |
| `180° ÷ 3 = 60°` | seratus delapan puluh derajat dibagi tiga sama dengan enam puluh derajat |
| `a ≠ b` | a tidak sama dengan b |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 360 dan beberapa bilangan besar). Tokoh skenario: Yohana (A).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Segitiga (Sedotan, Sudut, Sisi) | `SimulasiLabSegitigaK5B7.tsx` + `lab-segitiga-k5b7a.ts` | Mesin Segitiga | Yohana di Candi Sewu (7 adegan) |

Mesin: `mesin-data-k5b7.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b7.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-segitiga-k5b7.tsx` (tiga sedotan yang menutup menjadi segitiga atau tergantung dengan celah emas; segitiga dengan dua sudut alas dan sudut ketiga; segitiga dengan panjang sisi berlabel dan pasangan sisi yang sedang diimpit disorot emas). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab7-ringkas.json`. Uji: `scripts/uji-lab-k5b7.mjs`.

Metode luar buku yang dianyam. A: Triangle Inequality Theorem (Sedotan: tiga pasangan diuji, jumlah dua sisi harus lebih dari sisi ketiga; satu pasangan gagal berarti tidak bisa; jumlah yang sama dengan sisi ketiga hanya menjadi garis lurus), Angle Sum Property (Sudut: sudut ketiga dari 180 dikurangi dua sudut; dua sudut siku-siku atau dua sudut tumpul tidak menyisakan sudut ketiga), Side-Angle Classification (jenis menurut sudut: lancip, siku-siku, tumpul; jenis menurut sisi: sama kaki, sama sisi, sembarang), dan Inclusive Triangle Hierarchy (Sisi: segitiga sama sisi juga sama kaki, tetapi sama kaki belum tentu sama sisi).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Sedotan: 5-6-7 bisa; Sedotan: 5-4-12 tidak bisa; Sedotan: 3-4-7 tidak bisa (garis lurus); Sudut: potongan ketiga tumpul dan potongan keempat (dua siku-siku) bukan segitiga; Sisi: hiasan 6-6-6 sama sisi dan jawaban hierarki | Sedotan: keenam sedotan benar; Sudut: keenam potongan benar; Sisi: hierarki keenam hiasan benar |

Near-miss tidak memenuhi misi: menjawab Sedotan tanpa menguji ketiga pasangan, jawaban tertukar (bisa dan tidak), hanya salah satu dari dua potongan Sudut, menjawab Sudut tanpa menghitung, menjawab Sisi tanpa mengimpit ketiga pasangan, jenis Sisi salah, hierarki tanpa jenis, dan hierarki salah jawab.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Segitiga (A) | Syarat → Sudut → Sisi → Hierarki | Atap Candi (sedotan 5, 6, 7: tiga pasangan lolos; sudut 50° dan 60°: sudut ketiga 70°, lancip; sisi 6, 6, 9: sama kaki; sisi 8, 8, 8: sama sisi dan juga sama kaki), Gapura Candi (sedotan 5, 4, 12: dua pasangan lolos; sudut 90° dan 35°: sudut ketiga 55°, siku-siku; sisi 4, 5, 7: sembarang; sisi 7, 7, 4: sama kaki, belum tentu sama sisi), Pagar Candi (sedotan 3, 4, 7: dua pasangan lolos; sudut 30° dan 40°: sudut ketiga 110°, tumpul; sisi 9, 9, 9: sama sisi; sisi 4, 5, 7: sembarang, bukan sama kaki) |

Pengecoh dihitung dari kesalahan khas: banyak pasangan yang lolos (Syarat), menjumlahkan dua sudut dan lupa mengurangi dari 180 (Sudut), serta dua jenis lain (Sisi dan Hierarki). Letak kunci bervariasi.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Yohana di Candi Sewu (A) | 7 | Narasi Yohana di Candi Sewu; sedotan 5, 4, dan 12 tidak bisa karena 5 + 4 = 9 kurang dari 12 (pengecoh: tiga sedotan saja, dan 5 + 4 lebih dari 12); jumlah tiga sudut 180 (pengecoh 90 dan 360) dan sudut ketiga 70 dari 50 dan 60 (pengecoh 110 dan 10); ketuk 3 stik untuk simetri lipat segitiga sama sisi; isi 1 stik untuk simetri lipat segitiga sama kaki; Komang dan Nisa: segitiga sama sisi juga sama kaki (pengecoh: bukan sama kaki, dan sama kaki pasti sama sisi); penutup. |

## Kejujuran konsep

- Sedotan: tiga pasangan diuji satu per satu dengan pesan yang menyebut jumlah dan sisi lawannya; jawaban ditolak sebelum ketiganya diuji. Syarat segitiga dihitung mandiri dengan rumus Heron (luas kuadrat positif), bukan dengan membandingkan jumlah dua sisi seperti di kode; 3.375 trio sisi 1 sampai 15 diuji sama. Banyak pasangan yang lolos dihitung mandiri dari sisi terurut.
- Sudut: jawaban ditolak sebelum sudut ketiga dihitung. Jenis menurut sudut ditimbang dengan tanda kosinus sudut terbesar (bukan dengan perbandingan dengan 90 seperti di kode); semua pasangan sudut kelipatan 5 diuji. Dua siku-siku menyisakan 0 dan dua tumpul berjumlah lebih dari 180, jadi bukan segitiga.
- Sisi: jawaban ditolak sebelum ketiga pasangan sisi diimpit. Jenis menurut sisi dihitung mandiri dari banyak panjang berbeda, dan simetri lipat dari banyak permutasi sisi yang mempertahankan panjang (3, 1, 0), bukan dari rumus di kode.
- Hierarki: pertanyaan hanya muncul setelah jenis benar. Sama sisi juga sama kaki (ya), sama kaki belum tentu sama sisi (tidak), sembarang bukan sama kaki (tidak).
- Konsep Sub-Bab B tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa segi empat, trapesium, jajargenjang, persegi, belah ketupat, layang-layang, diagonal, dan sisi sejajar.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai (orakel mandiri memeriksa tiap id baru), semua pesan bisa dieja. Uji mutasi pada logika lab, mesin, skenario, misi, pengeja, data ringkas, dan komponen: satu angka atau satu syarat diubah, uji gagal (tiga mutan yang tersisa setara: `n >= 2` sama dengan `n === 3` karena banyak pasangan sama hanya 0, 1, atau 3, dan spasi ganda dalam ucapan dirapikan pengeja).
