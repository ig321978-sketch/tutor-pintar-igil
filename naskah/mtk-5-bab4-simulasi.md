# Matematika Kelas 5 · Bab 4 · Simulasi SMISCPA (pola hibrida)

Bab: Keliling Bangun Datar (`mtk-5-bab4`, `FASE_C`, kelas 5; kode data Materi `k5-mat-bab4`). Komponen: `src/components/modul/SimulasiK5Bab4.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k5bab4.ts`, teks misi di `misi-teks-k5b4.ts`. Dimuat malas lewat `registri-simulasi.ts` (belum didaftarkan sampai gelombang terakhir).

Bab ini punya **lima sub-bab**: A (konsep keliling), B (keliling segitiga), C (keliling segi empat), D (keliling segi banyak), E (keliling bangun gabungan). Dikerjakan dalam lima gelombang, satu sub-bab per gelombang. Gelombang A sampai D tidak didaftarkan di registri; gelombang E mendaftarkan bab dan menjadi pencapaian bab (skenario E menyentuh konsep A sampai E).

**Status: Gelombang A (Sub-Bab A, Apakah Keliling Bangun Datar Itu?) dan Gelombang B (Sub-Bab B, Keliling Segitiga) selesai. C sampai E belum.**

Berkas Materi bab ini tidak diubah (`SubBabK5B4A–E.tsx`, `naskah-k5b4.ts`, `data-k5b4.ts`, `paket-k5b4.ts`, dan lainnya). Pengeja suara memakai `ejaK5B4` (berkas baru `eja-k5b4.ts`) lewat prop `eja` mesin dan di lab. `ejaK5B1` tidak dipakai karena tidak mengeja satuan panjang dan kurung.

## Pengeja suara

| Tulisan | Dibaca |
|---------|--------|
| `16 cm` | enam belas sentimeter |
| `20 m` | dua puluh meter |
| `4 + 4 + 4 + 4 = 16` | empat ditambah empat ditambah empat ditambah empat sama dengan enam belas |
| `2 × (5 + 3)` | dua dikali kurung buka lima ditambah tiga kurung tutup |

Kata bilangan sama dengan `kataK5B1` (diuji 0 sampai 1200 dan 999.999). Tokoh skenario dari naskah: Ayah dan Ibu (A), Asep (B).

## Alat

| Sub-bab | Lab (tampilan) | Berkas | Mesin | Skenario |
|---------|----------------|--------|-------|----------|
| A | Lab Jalur (Jalan, Pagar, Banding) | `SimulasiLabJalurK5B4.tsx` + `lab-jalur-k5b4a.ts` | Mesin Jalur | Pagar dan Bingkai (7 adegan) |
| B | Lab Segitiga (Jumlah, Sama, Ukur) | `SimulasiLabSegitigaK5B4.tsx` + `lab-segitiga-k5b4b.ts` | Mesin Segitiga | Bendera Pita Segitiga (7 adegan) |

Mesin: `mesin-data-k5b4.ts`, dijalankan `SimulasiMesinBertahapK3.tsx` dan `mesin-bertahap-k3b1.ts`. Skenario: `skenario-k5b4.ts`, dijalankan `SimulasiSkenario.tsx`. Model gambar: `model-jalur-k5b4.tsx` (bangun polos yang sisinya ditelusuri, tanah berpetak dengan ruas pagar emas, kisi petak untuk isi) dan `model-segitiga-k5b4.tsx` (segitiga polos digambar dari tiga sisi, tanda sisi sama, penggaris dengan batang yang diukur). Data ringkas Mind-Map dan Infografis: `src/data/kelas5-bab4-ringkas.json`. Uji: `scripts/uji-lab-k5b4.mjs`.

Metode luar buku yang dianyam. A: Path Length (keliling sebagai panjang jalur: sisi ditelusuri satu per satu dari sudut awal sampai kembali, lalu dijumlahkan), Fencing Context (pagar dan bingkai dipasang di tepi: ruas pagar dipasang satu per sisi petak di tepi tanah), dan Perimeter vs Area (jalur tepi dibedakan dari isi petak, tanpa rumus perkalian). B: Side Sum (ketiga sisi diketuk lalu dijumlah), Equilateral Shortcut (diperiksa dulu apakah ketiga sisi sama panjang, baru boleh 3 × sisi; segitiga sama kaki tetap dijumlah), dan Measure Then Sum (panjang tiap sisi dibaca pada penggaris dulu, baru dijumlah).

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya tujuh misi wajib (lima dari lab, mesin, skenario) dan tiga tantangan bebas.

| Sub-bab | Misi wajib dari lab | Tantangan bebas |
|---------|---------------------|-----------------|
| A | Jalan: persegi sisi 4 cm; Jalan: persegi panjang 5 cm dan 3 cm; Pagar: tanah 6 petak panjang dan 4 petak lebar (20 ruas); Banding: bingkai foto pada bangun 5 dan 3 (pilih jalur tepi, lalu 16 cm); Banding: jalur tepi dan isi bangun 5 dan 3 (16 cm, 15 petak) serta bangun 6 dan 2 (16 cm, 12 petak) | Jalan: persegi panjang 6 cm dan 4 cm; Pagar: tanah 4 petak panjang dan 3 petak lebar (14 ruas); Banding: bangun 2 dan 2 (8 cm, 4 petak) |
| B | Jumlah: segitiga 5, 4, 7 (16 cm); Jumlah: segitiga 3, 4, 5 (12 cm); Sama: sama sisi 5 (15 cm, 3 × 5); Sama: sama sisi 6 (18 cm); Ukur: segitiga sama kaki 8, 5, 5 dibaca pada penggaris lalu dijumlah (18 cm) | Sama: sama sisi 7 (21 cm); Sama: sama kaki 6, 6, 4 (16 cm, tidak boleh dikali 3); Jumlah: segitiga 6, 8, 10 (24 cm) |

Tanah 5 petak panjang dan 3 petak lebar di Pagar hanya latihan, bukan misi. Jumlah segitiga sama kaki 6, 6, 4 dan Ukur segitiga kedua (7, 4, 6) di Sub-Bab B hanya latihan. Near-miss tidak memenuhi misi: sisi terlewat atau diulang, melompat sisi, berhenti sebelum kembali ke sudut awal, ruas pagar kurang satu di salah satu tepi, pagar lengkap tetapi belum diperiksa, keperluan yang salah untuk bingkai foto, jalur yang dipilih adalah isi atau jumlah dua sisi saja, hanya salah satu dari jalur atau isi yang dihitung.

Near-miss tidak memenuhi misi B: keliling dipilih sebelum ketiga sisi diketuk, hanya dua sisi diketuk, tiga kali sisi pertama pada segitiga yang sisinya berbeda, jumlah dua sisi saja, jawaban pemeriksaan sisi sama yang salah atau dilewati, sama kaki dikali 3 (18), sisi dikali sisi atau dua kali sisi pada sama sisi, sisi belum diukur semua, angka penggaris meleset, atau keliling ukur salah.

## Mesin berstasiun

| Mesin | Stasiun | Kasus |
|-------|---------|-------|
| Mesin Jalur (A) | Jalur → Arti → Pagar → Beda | Pagar Ayah (sisi 6, 4, 6, 4 = 20 m; pagar kebun memakai jalur tepi; tanah 5 dan 3 petak = 16 ruas; bangun 4 dan 3: jalur 14 cm, isi 12 petak), Bingkai Ibu (persegi sisi 3 = 12 m; bingkai memakai jalur tepi; tanah 4 dan 2 petak = 12 ruas; bangun 6 dan 2: jalur 16 cm, isi 12 petak), Benteng Baluwarti (sisi 9, 5, 9, 5 = 28 m; menanam rumput di halaman memakai isi; tanah 6 dan 4 petak = 20 ruas; bangun 4 dan 2: jalur 12 cm, isi 8 petak) |
| Mesin Segitiga (B) | Jumlah → Sama → Kaki → Ukur | Segitiga buku (5, 4, 7 = 16 cm; sama sisi 5 = 15 cm; sama kaki 8, 5, 5 = 18 cm; ukur 3, 4, 5 = 12 cm), Segitiga enam (6, 8, 10 = 24 cm; sama sisi 6 = 18 cm; sama kaki 6, 6, 4 = 16 cm; ukur 7, 4, 6 = 17 cm), Segitiga tujuh (4, 6, 9 = 19 cm; sama sisi 7 = 21 cm; sama kaki 7, 7, 3 = 17 cm; ukur 5, 9, 8 = 22 cm) |

Data ditulis di pertanyaan (mesin tanpa gambar). Pengecoh dihitung: isi petak, jumlah tiga sisi, atau jumlah dua sisi saja (Jalur); jalur tepi dan isi tertukar serta banyak sudut (Arti); isi petak dan jumlah dua sisi (Pagar); jalur dan isi tertukar atau isi disamakan dengan jalur (Beda). Letak kunci bervariasi.

Pengecoh B dihitung: tiga kali sisi pertama dan jumlah dua sisi saja (Jumlah, Kaki, Ukur); dua kali sisi dan sisi kali sisi (Sama).

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Pagar dan Bingkai (A) | 7 | Narasi Ayah (kebun 6 m dan 4 m); panjang kayu pagar sama dengan jumlah semua sisi di tepi (pengecoh: isi dan banyak sudut); pagar 20 m dan persegi sisi 3 m = 12 m; ketuk 20 stik ruas pagar; isi 12 stik untuk bingkai persegi 3 cm; dua bangun jalur sama 16 cm dan isi berbeda (15 dan 12); penutup |
| Bendera Pita Segitiga (B) | 7 | Narasi Asep; pita 5, 4, 7 = 16 dan sama sisi 5 = 15 (pengecoh tiga kali sisi pertama, dua sisi, dua kali sisi, sisi kali sisi); alasan boleh dikali 3 (ketiga sisi sama panjang); ketuk 18 stik pita sama sisi 6; isi 12 stik untuk segitiga 3, 4, 5; sama kaki 6, 6, 4 tidak boleh dikali 3 (jumlahkan, 16 cm); penutup |

## Kejujuran konsep

- Jalan: sisi harus diketuk berurutan (melompat dan mengulang ditolak), dan keliling baru tercatat setelah anak menekan Kembali ke sudut awal. Jumlah dihitung dengan penjumlahan di kode; uji memakai penelusuran titik demi titik di kisi (kembali ke asal, jarak sama dengan jumlah).
- Pagar: banyak ruas per tepi dibatasi panjang tepi; pagar lengkap dicatat hanya bila keempat tepi penuh dan diperiksa. Keliling tanah dihitung di kode dengan menjumlah sisi, diuji dengan menghitung sisi petak yang hanya dimiliki satu petak. Isi dihitung dengan perkalian di kode, diuji dengan menghitung petak satu per satu. Data dipilih agar keliling dan isi tidak pernah sama.
- Banding: pilihan jalur dan isi dihitung dengan pengecoh klasik (isi dan jalur tertukar, jumlah dua sisi); semua pengecoh dihitung ulang dan salah. Kesimpulan jalur sama, isi beda baru muncul setelah keempat hitungan (dua bangun) selesai.
- Jumlah: ketiga sisi diketuk (urutan bebas, tiap sisi sekali) sebelum keliling dipilih. Sama: pemeriksaan ketiga sisi sama dihitung dengan membandingkan sisi; 3 × sisi hanya dibenarkan bila ya, dan sama kaki menolak dikali 3. Ukur: tiap sisi dibaca pada penggaris (angka meleset diberi arah terlalu kecil atau terlalu besar); keliling baru bisa dipilih setelah ketiganya diukur. Semua segitiga diuji sah (sisi terpanjang kurang dari jumlah dua sisi lain) dan keliling diuji dengan berjalan satu sentimeter demi satu sentimeter di tepi.
- Hanya bilangan bulat. Mesin, skenario, dan ringkas dihitung ulang mandiri.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab A (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pembungkus, pesan lab hasil fuzz, dan ucapan): tanpa lambang kali, kurung, rumus, segitiga, sama sisi, sama kaki, segi lima, enam, delapan, banyak, empat, beraturan, gabungan, sekat, bungkus, dan denah. Luas dibandingkan lewat hitungan petak, bukan perkalian.
- Konsep sub-bab berikutnya tidak dipakai di Sub-Bab B (diuji pada misi, mesin, skenario, data ringkas, kode tampilan, model, logika, pesan lab hasil fuzz, dan ucapan): tanpa persegi, persegi panjang, segi empat, segi lima sampai delapan, segi banyak, beraturan, gabungan, sekat, bungkus, denah, kurung, serta 2 × dan 4 ×. Lambang × dan tambah boleh dipakai di B.
- Fuzz 20.000 aksi: batas terjaga, riwayat tidak dicabut dan hanya bila tercapai, semua pesan bisa dieja. Uji mutasi pada logika lab: satu angka diubah, uji gagal.
