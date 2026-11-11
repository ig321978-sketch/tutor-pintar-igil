# Matematika Kelas 2 · Bab 2 · Tab Simulasi (tiga simulasi, tiga metode)

Komponen: `src/components/modul/SimulasiK2Bab2.tsx`, didaftarkan di `SIMULASI_BAB["mtk-2-bab2"]`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara lewat `speakGuru`.

| No | Simulasi | Metode | Berkas |
|----|----------|--------|--------|
| 1 | Laboratorium Cara Hitung | PhET | `SimulasiCaraHitung.tsx`, `lab-cara-k2b2.ts` |
| 2 | Mesin Simpan dan Urai | Mesin keadaan | `SimulasiMesinSimpan.tsx`, `mesin-simpan-k2b2.ts` |
| 3 | Skenario: Jambu dan Burung | Skenario | `SimulasiSkenario.tsx` + `skenario-k2b2.ts` |

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model a,b,op menggerakkan garis, pasangan, dan bersusun |
| Mesin keadaan | Tinggi | Urutan simpan (tambah) / urai (kurang) dengan syarat |
| Skenario | Tinggi | Soal cerita: diketahui → ditanya → solusi → kesimpulan |
| Lab 2D / Lab 3D | Tidak | Bukan ukur/susun/bangun ruang |
| CPA di tab ini | Tidak | CPA tetap di Materi |

## Simulasi 1 · Laboratorium Cara Hitung (PhET)

Tujuan: melihat bahwa menghitung maju/mundur, pasangan, dan bersusun memberi hasil sama (sampai 20).

- **Model:** `a`, `b`, operasi tambah atau kurang (hasil 0–20).
- **Kontrol:** plus/minus, pilih operasi, kotak centang perwakilan, Reset Semua.
- **Perwakilan:** garis bilangan (lompatan), bagan pasangan, tabel bersusun P|S (dengan catatan simpan/urai bila perlu).
- **Coba ini!** (1) 8 + 5 di ketiga tampilan. Sama hasilnya? (2) Ganti ke kurang: 14 − 6. Apa yang berubah di garis? (3) Matikan satu perwakilan. Apakah hitungannya berubah?

## Simulasi 2 · Mesin Simpan dan Urai

Tujuan: sepuluh satuan disimpan jadi puluhan (tambah); satu puluhan diurai jadi sepuluh satuan (kurang).

- **Keadaan:** Soal → Susun → Tukar → Hasil → Selesai.
- **Misi:** 8+5 (simpan), 14−6 (urai), 9+7 (simpan).
- **Coba ini!** (1) Maju ke Hasil sebelum Tukar. Apa kata mesin? (2) Di 8+5, simpan sekali. Apa yang tertulis di puluhan? (3) Di 14−6, urai dulu. Mengapa satuan jadi cukup?

## Simulasi 3 · Jambu dan Burung (skenario)

Tujuan: kata lebihnya/kurangnya/selisih/jumlah; langkah diketahui–ditanya–solusi–kesimpulan.

- **Cerita:** jambu Tika–Kira dan burung di dahan.
- **Adegan:** narasi → pilih kata kunci → pilih langkah → soal hitung → hitung benda → pilih kesimpulan → akhir.
- **Coba ini!** (1) Pilih kata kunci yang salah. Apa akibatnya? (2) Selesaikan sampai kesimpulan. (3) Main lagi dan ubah pilihan operasi.

## Alur

Satu layar per simulasi. LANJUTKAN setelah disentuh (PhET) atau tuntas (mesin/skenario). Tanpa LLM.
