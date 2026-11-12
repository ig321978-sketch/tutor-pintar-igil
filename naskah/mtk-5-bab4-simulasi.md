# Matematika Kelas 5 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Bab: Keliling Bangun Datar (`mtk-5-bab4`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab4`). Komponen: `src/components/modul/SimulasiK5Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab4.ts`, teks misi di `misi-teks-k5b4.ts`. Dimuat malas lewat `registri-simulasi.ts` (didaftarkan di gelombang terakhir, E).

Bab ini punya **lima sub-bab**: A (konsep keliling), B (keliling segitiga), C (keliling segi empat), D (keliling segi banyak), E (keliling bangun gabungan). Dikerjakan dalam lima gelombang, satu sub-bab per gelombang. Gelombang A sampai D tidak didaftarkan di registri; gelombang E mendaftarkan bab dan menjadi pencapaian bab (skenario E menyentuh konsep A sampai E).

**Status: Gelombang A, B, C, D, dan E (Sub-Bab E, Keliling Bangun Gabungan, pencapaian bab) selesai. Bab didaftarkan di `registri-simulasi.ts` (`SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, `RINGKAS_BAB`) dan `naskah/igil-module-player-peta.md`.**

Berkas Materi bab ini tidak diubah (`SubBabK5B4A–E.tsx`, `naskah-k5b4.ts`, `data-k5b4.ts`, `paket-k5b4.ts`, dan lainnya). Pengeja suara memakai `ejaK5B4` (berkas baru `eja-k5b4.ts`) lewat prop `eja` mesin dan di lab. `ejaK5B1` tidak dipakai karena tidak mengeja satuan panjang dan kurung.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `16 cm` | enam belas sentimeter |
| `20 m` | dua puluh meter |
| `4 + 4 + 4 + 4 = 16` | empat ditambah empat ditambah empat ditambah empat sama dengan enam belas |
| `2 × (5 + 3)` | dua dikali kurung buka lima ditambah tiga kurung tutup |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999). Tokoh skenario dari naskah: Ayah dan Ibu (A), Asep (B), Komang (C), Ibu (D), Asep dan Komang (E).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Jalur (Jalan, Pagar, Banding) | `SimulasiLabJalurK5B4.tsx` + `lab-jalur-k5b4a.ts` | Mesin Jalur | Pagar dan Bingkai (7 adegan) |
| B | Lab Segitiga (Jumlah, Sama, Ukur) | `SimulasiLabSegitigaK5B4.tsx` + `lab-segitiga-k5b4b.ts` | Mesin Segitiga | Bendera Pita Segitiga (7 adegan) |
| C | Lab Segi Empat (Persegi Panjang, Persegi, Beda) | `SimulasiLabSegiEmpatK5B4.tsx` + `lab-segiempat-k5b4c.ts` | Mesin Segi Empat | Kebun dan Papan Tulis (7 adegan) |
| D | Lab Segi Banyak (Beraturan, Beda, Tabel) | `SimulasiLabSegiBanyakK5B4.tsx` + `lab-segibanyak-k5b4d.ts` | Mesin Segi Banyak | Taman Segi Banyak (7 adegan) |
| E | Lab Denah (Luar, Bungkus, Hilang) | `SimulasiLabDenahK5B4.tsx` + `lab-denah-k5b4e.ts` | Mesin Gabungan | Denah Rumah Asep dan Komang (8 adegan, menyentuh A sampai E) |

Mesin: `mesin-data-k5b4.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b4.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-jalur-k5b4.tsx` (bangun polos yang sisinya ditelusuri, tanah berpetak dengan ruas pagar emas, kisi petak untuk isi) dan `model-segitiga-k5b4.tsx` (segitiga polos digambar dari tiga sisi, tanda sisi sama, penggaris dengan batang yang diukur) dan `model-segiempat-k5b4.tsx` (persegi panjang dan persegi polos dengan tanda sisi sama, kisi petak untuk luas) dan `model-segibanyak-k5b4.tsx` (segi-n beraturan polos dengan tanda sisi sama, segi banyak bersisi tidak sama dengan sisi yang ditebalkan saat dijumlah) dan `model-denah-k5b4.tsx` (denah bersudut siku dengan sisi luar, sekat dalam berupa garis putus, persegi panjang pembungkus bergaris putus merah, dan sisi hilang bertanda tanya). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab4-ringkas.json`. Uji: `scripts/uji-lab-k5b4.mjs`.

Metode luar buku yang dianyam. A: Path Length (keliling sebagai panjang jalur: sisi ditelusuri satu per satu dari sudut awal sampai kembali, lalu dijumlahkan), Fencing Context (pagar dan bingkai dipasang di tepi: ruas pagar dipasang satu per sisi petak di tepi tanah), dan Perimeter vs Area (jalur tepi dibedakan dari isi petak, tanpa rumus perkalian). B: Side Sum (ketiga sisi diketuk lalu dijumlah), Equilateral Shortcut (diperiksa dulu apakah ketiga sisi sama panjang, baru boleh 3 × sisi; segitiga sama kaki tetap dijumlah), dan Measure Then Sum (panjang tiap sisi dibaca pada penggaris dulu, baru dijumlah). C: Rectangle Formula (panjang dan lebar dijumlah dulu, lalu dikali 2 karena ada dua panjang dan dua lebar; dicek dengan menjumlah keempat sisi), Square Shortcut (keempat sisi sama, 4 × sisi), dan Not Area Product (panjang dikali lebar adalah luas, bukan keliling). D: Regular n-gon (banyak sisi ditentukan dulu, lalu n × sisi, dicek dengan menjumlah n sisi), Irregular Side Sum (sisi tidak sama diketuk dan dijumlah satu per satu, dikali n ditolak), dan Table Pattern (tabel sisi tetap diisi baris demi baris sampai pola n × sisi terlihat). E: Outer Path Only (hanya sisi luar dijumlah, sekat dalam yang berupa garis putus ditolak), Bounding Rectangle (denah dibungkus persegi panjang; cocok hanya bila tanpa lekukan ke dalam, tidak cocok untuk denah U), dan Missing Length (sisi tidak diketahui dicari dari selisih sisi besar dan sisi kecil yang sejajar, lalu semua sisi dijumlah).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Jalan: persegi sisi 4 cm; Jalan: persegi panjang 5 cm dan 3 cm; Pagar: tanah 6 petak panjang dan 4 petak lebar (20 ruas); Banding: bingkai foto pada bangun 5 dan 3 (pilih jalur tepi, lalu 16 cm); Banding: jalur tepi dan isi bangun 5 dan 3 (16 cm, 15 petak) serta bangun 6 dan 2 (16 cm, 12 petak) | Jalan: persegi panjang 6 cm dan 4 cm; Pagar: tanah 4 petak panjang dan 3 petak lebar (14 ruas); Banding: bangun 2 dan 2 (8 cm, 4 petak) |
| B | Jumlah: segitiga 5, 4, 7 (16 cm); Jumlah: segitiga 3, 4, 5 (12 cm); Sama: sama sisi 5 (15 cm, 3 × 5); Sama: sama sisi 6 (18 cm); Ukur: segitiga sama kaki 8, 5, 5 dibaca pada penggaris lalu dijumlah (18 cm) | Sama: sama sisi 7 (21 cm); Sama: sama kaki 6, 6, 4 (16 cm, tidak boleh dikali 3); Jumlah: segitiga 6, 8, 10 (24 cm) |
| C | Persegi Panjang: 5 dan 3 (16 cm, jumlah 8 lalu dikali 2); Persegi Panjang: 4 dan 2 (12 cm); Persegi: sisi 3 (12 cm, 4 × 3); Persegi: sisi 5 (20 cm); Beda: persegi panjang 8 dan 4 (keliling 24 cm dan luas 32 petak, bukan 32) | Persegi Panjang: 7 dan 2 (18 cm); Persegi: sisi 6 (24 cm); Beda: persegi sisi 2 (keliling 8 cm, luas 4 petak) |
| D | Beraturan: segi lima sisi 3 (15 cm); Beraturan: segi enam sisi 4 (24 cm); Beda: segi lima bersisi 2, 3, 4, 5, 6 (20 cm, tidak dikali 5); Tabel: sisi 2 cm diisi penuh (segitiga 6, persegi 8, segi lima 10, segi enam 12, segi delapan 16); Beraturan: segi delapan sisi 2 (16 cm) | Beraturan: segi enam sisi 3 (18 cm); Beraturan: segi tujuh sisi 3 (21 cm); Beda: segi lima bersisi 2, 2, 3, 4, 5 (16 cm) |
| E | Luar: denah L (36 m); Luar: denah T (30 m); Bungkus: denah L (cocok, 2 × (12 + 6) = 36 m); Bungkus: denah U (tidak cocok, keliling 36 m lebih panjang dari pembungkus 30 m); Hilang: denah L, dua sisi dicari dari 12 − 6 dan 6 − 4 lalu dijumlah (36 m) | Luar: denah persegi panjang 8 dan 4 dengan satu sekat tengah (24 m); Bungkus: denah T (cocok, 30 m); Hilang: denah kedua, sisi 10 − 7 dan 5 − 3 lalu dijumlah (30 m) |

Tanah 5 petak panjang dan 3 petak lebar di Pagar hanya latihan, bukan misi. Jumlah segitiga sama kaki 6, 6, 4 dan Ukur segitiga kedua (7, 4, 6) di Sub-Bab B hanya latihan. Near-miss tidak memenuhi misi: sisi terlewat atau diulang, melompat sisi, berhenti sebelum kembali ke sudut awal, ruas pagar kurang satu di salah satu tepi, pagar lengkap tetapi belum diperiksa, keperluan yang salah untuk bingkai foto, jalur yang dipilih adalah isi atau jumlah dua sisi saja, hanya salah satu dari jalur atau isi yang dihitung.

Near-miss tidak memenuhi misi E: keliling dipilih sebelum semua sisi luar diketuk, sekat dalam ikut dijumlah (46), satu sisi luar terlewat, hanya mengetuk sekat, jawaban cocok yang salah (denah L dianggap tidak cocok atau denah U dianggap cocok), jawaban cocok dilewati, pembungkus dipaksakan pada denah U (30), luas pembungkus (72), keliling dipilih sebelum kedua sisi hilang dilengkapi, hanya satu sisi hilang, sisi hilang dijumlah (18), sisi hilang dianggap sisi besar (12), atau sisi hilang belum dijumlah (28) atau dijumlah dua kali (44).

Near-miss tidak memenuhi misi D: keliling dipilih sebelum banyak sisi benar, banyak sisi yang salah (satu kurang atau satu lebih), banyak sisi ditambah panjang sisi (8), sisi dikali sisi (9), sisi berbeda dikali 5 (10), satu sisi terlewat (14), sisi belum diketuk semua, tabel kurang satu baris, atau tabel diisi dengan banyak sisi ditambah sisi.

Near-miss tidak memenuhi misi C: dikali 2 sebelum panjang dan lebar dijumlah, jumlah yang dipilih adalah luas atau dua panjang, keliling belum dikali 2 (8), kurung hilang (2 × 5 + 3 = 13), luas (15) dipilih sebagai keliling, persegi dengan sisi kali sisi (9) atau dua sisi, hanya keliling atau hanya luas pada Beda, atau keliling dan luas tertukar.

Near-miss tidak memenuhi misi B: keliling dipilih sebelum ketiga sisi diketuk, hanya dua sisi diketuk, tiga kali sisi pertama pada segitiga yang sisinya berbeda, jumlah dua sisi saja, jawaban pemeriksaan sisi sama yang salah atau dilewati, sama kaki dikali 3 (18), sisi dikali sisi atau dua kali sisi pada sama sisi, sisi belum diukur semua, angka penggaris meleset, atau keliling ukur salah.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Jalur (A) | Jalur → Arti → Pagar → Beda | Pagar Ayah (sisi 6, 4, 6, 4 = 20 m; pagar kebun memakai jalur tepi; tanah 5 dan 3 petak = 16 ruas; bangun 4 dan 3: jalur 14 cm, isi 12 petak), Bingkai Ibu (persegi sisi 3 = 12 m; bingkai memakai jalur tepi; tanah 4 dan 2 petak = 12 ruas; bangun 6 dan 2: jalur 16 cm, isi 12 petak), Benteng Baluwarti (sisi 9, 5, 9, 5 = 28 m; menanam rumput di halaman memakai isi; tanah 6 dan 4 petak = 20 ruas; bangun 4 dan 2: jalur 12 cm, isi 8 petak) |
| Mesin Segitiga (B) | Jumlah → Sama → Kaki → Ukur | Segitiga buku (5, 4, 7 = 16 cm; sama sisi 5 = 15 cm; sama kaki 8, 5, 5 = 18 cm; ukur 3, 4, 5 = 12 cm), Segitiga enam (6, 8, 10 = 24 cm; sama sisi 6 = 18 cm; sama kaki 6, 6, 4 = 16 cm; ukur 7, 4, 6 = 17 cm), Segitiga tujuh (4, 6, 9 = 19 cm; sama sisi 7 = 21 cm; sama kaki 7, 7, 3 = 17 cm; ukur 5, 9, 8 = 22 cm) |
| Mesin Segi Empat (C) | Persegi Panjang → Persegi → Rumus → Beda | Segi empat buku (5 dan 3 = 16 cm; persegi sisi 3 = 12 cm; 2 × (5 + 3); beda 8 dan 4: keliling 24, luas 32), Kebun dan papan (4 dan 2 = 12 cm; persegi sisi 5 = 20 cm; 2 × (4 + 2); beda 6 dan 2: keliling 16, luas 12), Lapangan kecil (7 dan 2 = 18 cm; persegi sisi 6 = 24 cm; 2 × (8 + 4); beda 9 dan 3: keliling 24, luas 27) |
| Mesin Segi Banyak (D) | Beraturan → Beda → Tabel → Banyak sisi | Segi lima (beraturan 5 × 3 = 15; sisi 2, 3, 4, 5, 6 = 20; tabel sisi 2 segi lima = 10; segi lima punya 5 sisi), Segi enam (6 × 4 = 24; sisi 2, 3, 4, 3, 5, 6 = 23; tabel sisi 3 segi enam = 18; 6 sisi), Segi delapan (8 × 2 = 16; sisi 3, 4, 2, 5, 5 = 19; tabel sisi 2 segi delapan = 16; 8 sisi) |
| Mesin Gabungan (E) | Luar → Bungkus → Hilang → Cek | Denah buku (sisi luar 4, 4, 4, 6, 4, 4, 4, 2, 4, 8, 6, 4 = 54 m dan sekat 3 dan 5; bungkus 12 dan 6 = 36 m; sisi hilang 12 − 6 = 6; cek persegi panjang 8 dan 4: keliling 24, luas 32), Denah dua kamar (8, 4, 8, 4 = 24 m dan sekat 4; bungkus 8 dan 4 = 24 m; sisi hilang 10 − 7 = 3; cek 9 dan 3: keliling 24, luas 27), Denah rumah Komang (enam sisi luar 6 = 36 m dan sekat 3 dan 3; bungkus 10 dan 5 = 30 m; sisi hilang 9 − 4 = 5; cek 7 dan 3: keliling 20, luas 21) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: isi petak, jumlah tiga sisi, atau jumlah dua sisi saja (Jalur); jalur tepi dan isi tertukar serta banyak sudut (Arti); isi petak dan jumlah dua sisi (Pagar); jalur dan isi tertukar atau isi disamakan dengan jalur (Beda). Letak kunci bervariasi.

Pengecoh E dihitung: sekat ikut dijumlah dan satu sisi luar terlewat (Luar); luas dan jumlah dua sisi pembungkus (Bungkus); dijumlah dan sisi besar saja (Hilang); keliling dan luas tertukar atau luas disamakan dengan keliling (Cek).

Pengecoh D dihitung: banyak sisi ditambah sisi dan sisi kali sisi (Beraturan); banyak sisi kali sisi pertama dan satu sisi terlewat (Beda); banyak sisi ditambah sisi dan banyak sisi kali banyak sisi (Tabel); satu kurang dan satu lebih (Banyak sisi).

Pengecoh C dihitung: belum dikali 2 dan panjang dikali lebar (Persegi Panjang); sisi kali sisi dan dua kali sisi (Persegi); panjang kali lebar dan kurung hilang (Rumus); keliling dan luas tertukar atau luas disamakan dengan keliling (Beda).

Pengecoh B dihitung: tiga kali sisi pertama dan jumlah dua sisi saja (Jumlah, Kaki, Ukur); dua kali sisi dan sisi kali sisi (Sama).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Pagar dan Bingkai (A) | 7 | Narasi Ayah (kebun 6 m dan 4 m); panjang kayu pagar sama dengan jumlah semua sisi di tepi (pengecoh: isi dan banyak sudut); pagar 20 m dan persegi sisi 3 m = 12 m; ketuk 20 stik ruas pagar; isi 12 stik untuk bingkai persegi 3 cm; dua bangun jalur sama 16 cm dan isi berbeda (15 dan 12); penutup |
| Kebun dan Papan Tulis (C) | 7 | Narasi Komang; kebun 5 m dan 3 m = 16 m (pengecoh 8 dan 15) dan taman persegi sisi 3 m = 12 m (pengecoh 9); alasan dikali 2 (ada dua panjang dan dua lebar); ketuk 18 stik pagar kebun 7 m dan 2 m; isi 20 stik untuk bingkai persegi 5 dm; 8 × 4 = 32 adalah luas, keliling 24 m; penutup |
| Taman Segi Banyak (D) | 7 | Narasi Ibu; segi lima sisi 3 m = 15 m dan segi enam sisi 4 m = 24 m (pengecoh 8, 9, 10, 16); petak segi lima bersisi 2, 3, 4, 5, 6 tidak dikali 5, semua sisi dijumlah (20 m); ketuk 18 stik pagar segi enam sisi 3 m; isi 16 stik untuk kolam segi delapan sisi 2 m; pola tabel 10, 12, 16 (banyak sisi dikali panjang sisi); penutup |
| Denah Rumah Asep dan Komang (E) | 8 | Narasi Asep dan Komang; pagar memakai keliling bukan luas atau sudut (A); segitiga sama sisi 5 m = 15, persegi panjang 5 m dan 3 m = 16, segi enam beraturan sisi 4 m = 24 (B sampai D); sekat tidak dijumlah; ketuk 30 stik batas luar rumah 10 m dan 5 m; isi 6 stik untuk sisi hilang 12 − 6; jumlah sisi luar denah L = 36 (pengecoh 46 dengan sekat dan 28 tanpa sisi hilang) dan pembungkus 12 dan 6 = 36; penutup |
| Bendera Pita Segitiga (B) | 7 | Narasi Asep; pita 5, 4, 7 = 16 dan sama sisi 5 = 15 (pengecoh tiga kali sisi pertama, dua sisi, dua kali sisi, sisi kali sisi); alasan boleh dikali 3 (ketiga sisi sama panjang); ketuk 18 stik pita sama sisi 6; isi 12 stik untuk segitiga 3, 4, 5; sama kaki 6, 6, 4 tidak boleh dikali 3 (jumlahkan, 16 cm); penutup |

## Kejujuran konsep

- Jalan: sisi harus diketuk berurutan (melompat dan mengulang ditolak), dan keliling baru tercatat setelah anak menekan Kembali ke sudut awal. Jumlah dihitung dengan penjumlahan di kode; uji memakai penelusuran titik demi titik di kisi (kembali ke asal, jarak sama dengan jumlah).
- Pagar: banyak ruas per tepi dibatasi panjang tepi; pagar lengkap dicatat hanya bila keempat tepi penuh dan diperiksa. Keliling tanah dihitung di kode dengan menjumlah sisi, diuji dengan menghitung sisi petak yang hanya dimiliki satu petak. Isi dihitung dengan perkalian di kode, diuji dengan menghitung petak satu per satu. Data dipilih agar keliling dan isi tidak pernah sama.
- Banding: pilihan jalur dan isi dihitung dengan pengecoh klasik (isi dan jalur tertukar, jumlah dua sisi); semua pengecoh dihitung ulang dan salah. Kesimpulan jalur sama, isi beda baru muncul setelah keempat hitungan (dua bangun) selesai.
- Jumlah: ketiga sisi diketuk (urutan bebas, tiap sisi sekali) sebelum keliling dipilih. Sama: pemeriksaan ketiga sisi sama dihitung dengan membandingkan sisi; 3 × sisi hanya dibenarkan bila ya, dan sama kaki menolak dikali 3. Ukur: tiap sisi dibaca pada penggaris (angka meleset diberi arah terlalu kecil atau terlalu besar); keliling baru bisa dipilih setelah ketiganya diukur. Semua segitiga diuji sah (sisi terpanjang kurang dari jumlah dua sisi lain) dan keliling diuji dengan berjalan satu sentimeter demi satu sentimeter di tepi.
- Persegi Panjang: jumlah panjang dan lebar harus benar dulu sebelum dikali 2; hasil dicek dengan menjumlah keempat sisi. Persegi: 4 × sisi, pengecoh luas. Beda: keliling dan luas dihitung, tercatat hanya setelah keduanya benar (urutan bebas). Keliling diuji dengan berjalan di tepi dan dengan menghitung sisi petak yang hanya dimiliki satu petak; luas dengan menghitung petak. Data dipilih agar keliling dan luas tidak pernah sama.
- Beraturan: banyak sisi harus benar dulu sebelum keliling; hasil dicek dengan menjumlah n sisi. Beda: semua sisi diketuk (urutan bebas, tiap sisi sekali) sebelum keliling dipilih; dikali n ditolak. Tabel: tiap baris dihitung n × sisi, tercatat hanya bila semua baris terisi; selisih dua baris diuji sama dengan selisih banyak sisi dikali sisi (dihitung dengan berjalan di tepi). Data dipilih agar n × sisi tidak sama dengan n + sisi atau sisi × sisi.
- Denah dihitung sebagai poligon bersudut siku pada kisi bulat. Keliling luar dijumlah dari panjang sisi (selisih koordinat) di kode; diuji dengan mengubah denah menjadi petak (titik tengah petak di dalam poligon, aturan genap-ganjil) lalu menghitung sisi petak yang hanya dimiliki satu petak, dan dengan berjalan satu meter demi satu meter di tepi. Cocok-bungkus di kode: keliling luar sama dengan keliling pembungkus; diuji dengan memeriksa tiap baris dan kolom petak menyambung (tanpa lekukan ke dalam). Sekat diuji berada di dalam denah (petak di kedua sisinya di dalam). Sisi hilang diuji dari koordinat: sejajar dan sama dengan selisih sisi besar dan kecil.
- Luar: semua sisi luar diketuk sebelum keliling dipilih, mengetuk sekat hanya memberi penjelasan. Bungkus: cocok atau tidak harus benar dulu sebelum keliling. Hilang: kedua sisi hilang dilengkapi dulu sebelum keliling; tiap riwayat dicatat hanya bila tercapai.
- Pencapaian bab: skenario E diuji menyentuh konsep keliling dan luas (A), segitiga sama sisi (B), persegi panjang (C), segi enam beraturan (D), serta sekat, bungkus, dan sisi hilang (E).
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa lambang kali, kurung, rumus, segitiga, sama sisi, sama kaki, segi lima, enam, delapan, banyak, empat, beraturan, gabungan, sekat, bungkus, dan denah. Luas dibandingkan lewat hitungan petak, bukan perkalian.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa persegi, persegi panjang, segi empat, segi lima sampai delapan, segi banyak, beraturan, gabungan, sekat, bungkus, denah, kurung, serta 2 × dan 4 ×. Lambang × dan tambah boleh dipakai di B.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab C (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa segi lima sampai delapan, segi banyak, beraturan, n ×, gabungan, sekat, bungkus, denah, dan sisi hilang.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab D (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa gabungan, sekat, bungkus, denah, sisi hilang, sisi luar, dan Baluwarti.
- Sub-Bab E memakai semua konsep sebelumnya, jadi tidak ada pembatasan konsep. Pendaftaran bab diuji: tiga peta registri memuat `mtk-5-bab4`, simulasi dimuat malas tanpa SSR dan tanpa menarik komponen lab ke bundel awal, peta pemutar mencatat Bab 4, dan `registri-bab-baru.ts` memuat `mtk-5-bab4`.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai, semua pesan bisa dieja. Uji mutasi pada logika lab: satu angka diubah, uji gagal.
