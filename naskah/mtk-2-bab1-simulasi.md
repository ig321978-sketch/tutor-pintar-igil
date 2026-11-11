# Matematika Kelas 2 · Bab 1 · Tab Simulasi (tiga simulasi, tiga metode)

Komponen: `src/components/modul/SimulasiK2Bab1.tsx` (pembungkus alur), dipasang di tab **Simulasi** pemutar `IgilModulePlayer.tsx` lewat `SIMULASI_BAB["mtk-2-bab1"]`. Tidak ada pemanggilan jaringan, tidak ada skor, tidak ada Poin Kualifikasi. Suara memakai Suara Guru pilihan siswa lewat `speakGuru`.

| No | Simulasi | Metode | Berkas |
|----|----------|--------|--------|
| 1 | Laboratorium Bilangan 50 | PhET | `SimulasiLab50.tsx`, logika `lab-bilangan-k2b1.ts` |
| 2 | Mesin Tukar Puluhan | Mesin keadaan | `SimulasiMesinTukar.tsx`, logika `mesin-tukar-k2b1.ts` |
| 3 | Skenario: Stoples Permen Kira | Skenario kontekstual | `SimulasiSkenario.tsx` + `skenario-k2b1.ts` |

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu bilangan 0–50 menggerakkan batang, satuan, tabel, garis, dan banding |
| Mesin keadaan | Tinggi | Menulis ulang bilangan (ikat 10 satuan) berurutan dengan syarat |
| Skenario | Tinggi | Cerita stoples permen Sub-Bab C (tebak, hitung, banding, urut) |
| Lab 2D | Tidak | Bukan ukur/susun di kanvas |
| Lab 3D | Tidak | Bukan bangun ruang |
| CPA di tab ini | Tidak | CPA tetap di Materi |

## Simulasi 1 · Laboratorium Bilangan 50 (PhET)

Tujuan: membilang sampai 50 sebagai puluhan dan satuan; membaca tabel nilai tempat; membandingkan dua bilangan (puluhan dulu).

- **Model:** bilangan `n` (0–50). Opsional bilangan kedua `m` saat Bandingkan aktif.
- **Kontrol:** plus/minus besar, ketuk batang atau satuan, ketuk titik di garis (segmen 0–50), Ikat sepuluh (tampilan), Bandingkan, Reset Semua.
- **Perwakilan terhubung:** batang puluhan (bukan 50 benda lepas), satuan lepas (0–9), tabel P|S, kalimat nilai, nama bilangan, garis bilangan, hasil banding.
- **Coba ini!** (1) Atur ke 26. Berapa puluhan dan satuan? (2) Nyalakan Bandingkan, atur bilangan kedua ke 32. Mana yang dibandingkan lebih dulu? (3) Atur ke 50. Apa yang terjadi di batang?

## Simulasi 2 · Mesin Tukar Puluhan (mesin keadaan)

Tujuan: sepuluh satuan diganti satu puluhan sampai bentuk ringkas (satuan < 10).

- **Keadaan:** Mulai → Tukar → Ringkas → Selesai.
- **Aksi:** Ikat 10 (satuan ≥ 10), Buka 10 (puluhan ≥ 1), maju stasiun bila syarat terpenuhi.
- **Misi:** 26 (awal 0p+26s), 34 (1p+24s), 48 (2p+28s).
- **Coba ini!** (1) Di 0 puluhan 26 satuan, ikat dua kali. Apa yang muncul? (2) Coba maju ke Ringkas sebelum satuan < 10. Apa kata mesin? (3) Buka satu puluhan, lalu ikat lagi. Apakah jumlahnya sama?

## Simulasi 3 · Stoples Permen Kira (skenario)

Tujuan: tebak, hitung dengan kelompok sepuluh, bandingkan tebakan, bandingkan dua bilangan, urutkan.

- **Cerita:** ulang tahun Kira; Malosi tebak 20, Halim tebak 30; permen ternyata 26; Tika punya 32; urutkan kartu.
- **Adegan:** narasi → pilih cara hitung → hitung sisa satuan → soal total dan tebakan dekat → pilih banding 26 vs 32 → soal urut → akhir.
- **Coba ini!** (1) Pilih cara yang salah dulu. Apa akibatnya? (2) Bandingkan puluhan dulu. (3) Urutkan dari yang paling kecil.

## Alur satu layar

Satu simulasi per layar ("Simulasi 1 dari 3" …). LANJUTKAN aktif setelah disentuh (PhET) atau tuntas (mesin/skenario). Reset Semua di PhET. Tanpa LLM/jaringan.
