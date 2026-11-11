# Matematika Kelas 2 · Bab 3 · Tab Simulasi (tiga simulasi, dua metode)

Komponen: `src/components/modul/SimulasiK2Bab3.tsx`, didaftarkan di `SIMULASI_BAB["mtk-2-bab3"]`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi, tanpa kuis. Suara lewat `speakGuru`.

Bab ini tentang bentuk: A bentuk datar (segitiga, segi empat, segi lima, segi enam, lingkaran), B mengurai dan menyusun bentuk, C bangun ruang (kubus, balok, tabung, kerucut, bola). Isinya eksplorasi bentuk, jadi semua simulasi bersifat bermain bebas, tanpa benar-salah.

| No | Simulasi | Metode | Berkas |
|----|----------|--------|--------|
| 1 | Laboratorium Bentuk Datar | PhET | `SimulasiBentukDatar.tsx`, `lab-bentuk-k2b3.ts` |
| 2 | Bengkel Urai dan Susun | Lab virtual 2D | `SimulasiBengkelUrai.tsx`, `lab-urai-k2b3.ts` |
| 3 | Lereng Gelinding | PhET (percobaan) | `SimulasiLerengGelinding.tsx`, `lab-ruang-k2b3.ts` |

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu bentuk menggerakkan gambar, nomor sisi, tabel ciri, dan kalimat; ciri tetap saat diputar atau dibesarkan |
| Lab virtual 2D | Tinggi | Anak memilih garis potong di kanvas; mesin menghitung dan menamai keping; merenggangkan lalu merapatkan menunjukkan menyusun |
| Mesin keadaan | Tidak | Bab ini tidak punya proses berurutan dengan syarat pindah |
| Skenario | Tidak | Tidak ada keputusan dengan akibat cerita; hindari kuis |
| Lab 3D | Tidak | Bangun ruang hanya Sub-Bab C dan cukup lewat percobaan menggelinding; 3D terlalu berat untuk HP siswa |
| CPA di tab ini | Tidak | CPA tetap di Materi |

## Simulasi 1 · Laboratorium Bentuk Datar (PhET)

Tujuan: sisi dan sudut menentukan nama segi banyak; bentuk lengkung tidak punya sisi lurus dan sudut; memutar dan membesarkan tidak mengubah ciri.

- **Model:** jenis (segi banyak atau bentuk lengkung), banyak sisi 3–6, lingkaran atau lonjong, putaran kelipatan 30°, ukuran kecil/sedang/besar.
- **Kontrol:** plus/minus banyak sisi, tombol putar kiri dan kanan, pilihan ukuran, kotak centang perwakilan, Reset Semua.
- **Perwakilan:** gambar, nomor sisi, titik sudut, tabel ciri (sisi lurus, sudut, garis lengkung), kalimat. Tiap perwakilan bisa dimatikan.
- **Coba ini!** (1) Atur 6 sisi, hitung sisinya lewat nomor. (2) Putar dan besarkan. Apakah jumlah sisi berubah? (3) Pindah ke bentuk lengkung. Berapa sisi lurusnya? (4) Kurangi sisi sampai 3. Apa namanya?

## Simulasi 2 · Bengkel Urai dan Susun (Lab virtual 2D)

Tujuan: satu bentuk dapat diurai menjadi bentuk lain; cara membelah memengaruhi hasil; keping yang dirapatkan menyusun bentuk semula.

- **Model:** bentuk (persegi, persegi panjang, segi enam) dan himpunan garis potong (diagonal, garis tengah, atau garis antar titik sudut). Pemotongan setengah bidang, jadi urutan ketuk tidak memengaruhi hasil.
- **Kontrol:** ketuk garis putus-putus di kanvas (atau tombol di bawahnya), contoh cepat, renggang/rapatkan keping, Bentuk utuh, Reset Semua.
- **Perwakilan:** kanvas keping berwarna menurut nama, nomor keping, tabel keping (nama dan banyaknya), kalimat "Jadi ada N keping".
- **Perbandingan:** segi enam dari satu titik menjadi 4 segitiga (6 − 2), lewat tengah menjadi 6 segitiga.
- **Coba ini!** (1) Persegi, 1 diagonal: bentuk kepingnya? (2) Tambah diagonal kedua: berapa keping? (3) Segi enam: bandingkan "Dari satu titik" dan "Lewat tengah". (4) Rapatkan keping: bentuk kembali seperti semula?

## Simulasi 3 · Lereng Gelinding (PhET percobaan)

Tujuan: bangun ruang punya permukaan datar atau lengkung; permukaan lengkung yang menyentuh lereng membuat benda menggelinding.

- **Model:** bangun ruang (kubus, balok, tabung, kerucut, bola) dan letaknya (berdiri atau rebah). Hasil: diam, menggelinding, atau bergerak melingkar (kerucut rebah).
- **Kontrol:** pilih bangun, pilih berdiri atau rebah, Lepas di lereng, Taruh lagi, kotak centang kalimat dan tabel, Reset Semua.
- **Perwakilan:** gambar bergerak di lereng, kalimat ciri, tabel semua bangun (datar, lengkung, bisa ditumpuk) dengan baris bangun terpilih disorot.
- **Coba ini!** (1) Lepas bola, lalu kubus. Apa bedanya? (2) Tabung berdiri lalu rebah. Apa yang berubah? (3) Kerucut rebah: ke mana geraknya? (4) Dari tabel, bangun mana yang hanya punya permukaan datar?

## Alur

Satu layar per simulasi. LANJUTKAN setelah disentuh sekali. Tanpa LLM. Logika murni diuji di `scripts/uji-lab-k2b3.mjs`.
