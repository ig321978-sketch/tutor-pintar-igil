# Matematika Kelas 2 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Komponen: `src/components/modul/SimulasiK2Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab2.ts`. Alat: `SimulasiCaraHitung.tsx` + `lab-cara-k2b2.ts` (PhET), `SimulasiMesinSimpan.tsx` + `mesin-simpan-k2b2.ts` (mesin keadaan), `SimulasiLabCerita.tsx` + `lab-cerita-k2b2.ts` (PhET soal cerita), `SimulasiSkenario.tsx` + `skenario-k2b2.ts` (skenario). Didaftarkan di `SIMULASI_MATERI`, `SIMULASI_MISI_AWAL`, dan `RINGKAS_BAB` (`registri-simulasi.ts`), sudah tidak ada di `SIMULASI_BAB`. Mind-Map dan Infografis memakai `src/data/kelas2-bab2-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu model (a, b, operasi) menggerakkan garis, pasangan, bersusun, selisih, dan keluarga bilangan sekaligus. Soal cerita punya model sendiri (jenis, x, y, z) dengan model batang |
| Mesin keadaan | Tinggi | Urutan simpan (tambah) dan urai (kurang) dengan syarat perpindahan |
| Skenario | Tinggi | Soal cerita: kata kunci, langkah, hitung, kesimpulan, dan balik operasi untuk bilangan awal |
| Lab 2D | Tidak | Bukan ukur atau susun di kanvas |
| Lab 3D | Tidak | Bukan bangun ruang |
| CPA di sini | Tidak | CPA tetap di tahap Concrete, Picture, Abstract |

## Pola hibrida

Satu laboratorium yang alatnya bertambah per sub-bab (maksimal tiga alat per sub-bab). Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut.

| Sub-bab | Alat laboratorium | Misi wajib | Tantangan bebas |
|---------|-------------------|------------|-----------------|
| A · Berbagai cara penjumlahan | Lab Cara Hitung (garis, pasangan, bersusun; hanya tambah) + Mesin Simpan | 12 + 6 (enam lompatan di garis); 9 + 7 (bagan pasangan); 18 + 2 (satuan 10 harus disimpan); tuntas Mesin Simpan | Hasil tepat 20 selain 18 + 2; hitung 13 + 7 hanya dengan bersusun |
| B · Berbagai cara pengurangan | Semua Lab Cara Hitung (ditambah Selisih dan Periksa, pilihan Hitung mundur / Tambah sampai pas) + Mesin Urai | 18 − 12 dengan hitung mundur; 16 − 9 dengan selisih; 12 − 8 di bersusun (urai); 14 − 6 dengan Periksa; tuntas Mesin Urai | Tambah sampai pas; hasil 20 − x; ingat Sub-Bab A |
| C · Soal cerita (pencapaian misi) | Lab Soal Cerita + Lab Cara Hitung + skenario Jambu dan Burung | Lebihnya 12 dan 6; selisih 12 dan 18; kurangnya 12 dan 5; bilangan awal (sisa 12, diberikan 4); tuntas skenario sampai adegan akhir | Tiga bilangan 5, 7, 8; tiga bilangan yang dua pertamanya berjumlah 10; ingat Sub-Bab B |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun):

- Lab Cara Hitung: `a=8`, `b=5`, operasi tambah (di Sub-Bab B, `opAwal` kurang: `a=15`, `b=7`).
- Mesin Simpan dan Urai: mulai dari Soal, misi pertama 8 + 5 (Mesin Simpan) atau 18 − 12 (Mesin Urai), belum ada langkah.
- Lab Soal Cerita: jenis Jumlah, `x=9`, `y=6`, `z=3`.
- Skenario Jambu dan Burung: adegan pertama (narasi), delapan adegan.

## Alat yang ditambah di pola ini

- **Selisih** (Lab Cara Hitung): dua baris titik polos dipasangkan satu-satu. Yang tidak berpasangan adalah hasil kurang. Titik polos, bukan benda, sesuai batas Picture.
- **Tambah sampai pas** (Garis, hanya kurang): dari bilangan kecil melompat maju ke bilangan besar. Hasilnya sama dengan hitung mundur.
- **Periksa** (keluarga bilangan): satu tiga-serangkai menghasilkan empat kalimat (dua bila dua bilangan sama), jadi penjumlahan dan pengurangan saling memeriksa.
- **Lab Soal Cerita**: enam jenis (jumlah, selisih, lebihnya, kurangnya, bilangan awal, tiga bilangan). Kata kunci ditandai, model batang berskala 0–20, empat langkah diketahui, ditanya, solusi, kesimpulan. Pindah jenis mempertahankan bilangan agar anak melihat soal yang sama dibaca dengan kata lain.
- **Adegan bilangan awal** di skenario: balik operasi (`12 + 4 = 16`) untuk mencari bilangan awal.

## Coba ini! (ringkas)

- **Lab Cara Hitung:** (1) 8 + 5 di tiga tampilan, sama hasilnya? (2) Ganti ke kurang, 14 − 6: apa yang berubah di garis? (3) Matikan satu perwakilan. Apakah hitungannya berubah?
- **Mesin Simpan dan Urai:** (1) Maju ke Hasil sebelum Tukar. Apa kata mesin? (2) Di 8 + 5, simpan sekali. Apa yang tertulis di puluhan? (3) Di 14 − 6, urai dulu. Mengapa satuan jadi cukup?
- **Lab Soal Cerita:** ganti jenis tanpa mengubah bilangan. Kata kunci mana yang berubah? Batang mana yang tetap?
- **Skenario:** pilih kata kunci yang salah, lihat akibatnya; main lagi dan ubah pilihan operasi.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan model dan semua pilihan tampilan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b2.mjs`: logika lab cara, mesin per sub-bab, ruang keadaan cerita (100 cek)
- `node --no-warnings scripts/uji-lab-kelas2.mjs`: misi hibrida Bab 1 dan Bab 2 (84 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas
