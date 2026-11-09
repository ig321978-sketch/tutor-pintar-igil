# Suara Guru seragam — PILOT Materi Kelas 1 SD, Bab 1, Sub-Bab A

Ruang lingkup pilot: **hanya tab Materi, Sub-Bab A, Matematika Kelas 1 SD Bab 1** (cerita video, peta pikiran, infografis, Concrete, Picture, Abstract, dan semua tombol suara di sana). Silabus, Sub-Bab B sampai D, Latihan, Ujian, dan semua bab lain tidak berubah.

## 1. Mengapa suara beda antara desktop dan HP

Web Speech API tidak membawa suara sendiri. Peramban memakai suara yang terpasang di perangkat, jadi hasilnya berbeda:

| Perangkat | Suara Bahasa Indonesia yang biasanya ada |
|---|---|
| Android (Chrome) | Satu suara Google "Indonesian (Indonesia)" |
| iPhone dan Mac (Safari) | Damayanti |
| Windows (Chrome) | "Google Bahasa Indonesia" (jaringan) dan Microsoft Andika (suara pria) |
| Windows (Edge) | Gadis dan Ardi (online), Andika |
| Perangkat tanpa paket bahasa | Tidak ada. Ucapan jatuh ke suara bahasa Inggris |

Penyebab lain di kode lama, sekarang tidak dipakai lagi di pilot:

1. **Jalur ganda.** Kalimat yang punya berkas audio statis diputar dari berkas, sisanya dari suara perangkat. Pada HP, pemutaran berkas kadang ditolak peramban lalu jatuh ke suara perangkat, sehingga satu halaman bisa bercampur dua suara.
2. **Laju dan nada guru berbeda** (Bu Sari nada 1,15 laju 0,9; Pak Budi nada 0,82), dan beberapa suara jaringan Chrome desktop mengabaikan nada.
3. **Pemilihan suara bergantung urutan daftar perangkat.** Aturan lama juga menganggap Andika (suara pria) sebagai suara wanita.
4. **Ucapan pertama** sering keluar sebelum daftar suara selesai dimuat, jadi memakai suara lain.
5. **Naskah panjang** berhenti di tengah pada suara jaringan Chrome (batas sekitar 15 detik).

## 2. Batas yang tidak bisa dilewati

Dengan Web Speech API, **suara yang persis sama di semua perangkat tidak mungkin**: perangkat tanpa suara Indonesia tetap tanpa suara Indonesia, dan iPhone akan selalu terdengar seperti Damayanti. Yang bisa diseragamkan adalah semua hal lain, dan itu sudah dilakukan di pilot. Suara yang benar-benar identik hanya bisa lewat rekaman statis (berkas MP3 dibuat sekali, diputar di semua perangkat). Itu jalur lain dan tidak dipakai di pilot ini.

## 3. Aturan suara seragam

Parameter dasar dari permintaan (suara lembut):

```js
u.lang = 'id-ID'; u.rate = 0.85; u.pitch = 1.1; speechSynthesis.speak(u);
```

| Hal | Aturan |
|---|---|
| Bahasa | `id-ID` |
| Laju | 0,85 untuk pria dan wanita |
| Nada wanita | 1,1 |
| Nada pria | 1,0 bila perangkat punya suara pria asli (Andika, Ardi). Bila tidak, suara dasar yang sama dengan wanita dipakai dengan nada diturunkan ke 0,8. |
| Pemilihan suara | Tetap, tidak bergantung urutan daftar: suara Indonesia yang sesuai gender, suara lokal (jalan tanpa sinyal) didahulukan, lalu urut nama. |
| Gender | Hanya guru yang dipilih siswa di PILIH GURU PENGAJAR, dibaca ulang setiap kali suara diputar. |
| Berkas audio statis | Tidak dipakai di pilot. Tidak ada ElevenLabs. |
| Naskah panjang | Dipecah per kalimat (maksimal 170 huruf) dan diucapkan berurutan. |
| Suara belum dimuat | Menunggu daftar suara (maksimal 1,2 detik) sebelum ucapan pertama. |
| Tanpa suara Indonesia | Perangkat tetap dicoba dengan `id-ID`, dan info suara memberi tahu cara memasang suara. |

Catatan: permintaan hanya memberi nada 1,1. **Nada pria 0,8 dan 1,0 adalah pilihan saya** supaya guru pria terdengar berbeda dari guru wanita. Semua angka ada di satu tempat: `SUARA_SERAGAM` di `src/lib/suara-guru-seragam.ts`.

## 4. Di mana berjalan

- `ucapkanGuruModul(teks, { seragam: true })` di `src/lib/suara-guru-modul.ts`.
- `IgilModulePlayer.tsx`: `suaraSeragam = bab === "mtk-1-bab1" && activeSubBab === "A" && activeMainTab === "materi"` memasang opsi itu pada `speakGuru`, yang dipakai semua komponen Materi.
- `VideoTamanBermain.tsx` memakai opsi yang sama.
- `PilihGuru.tsx`: contoh suara untuk Kelas 1 SD memakai jalur yang sama, jadi yang didengar saat memilih guru sama dengan yang diputar di Materi pilot.
- `InfoSuaraGuru.tsx`: kotak kecil di atas Tahap 1 Story yang menampilkan guru terpilih, nama suara perangkat, laju, nada, dan tombol "Coba suara". Dipakai untuk membandingkan perangkat saat pilot. Boleh dihapus setelah pilot selesai.

## 5. Cara memperluas setelah pilot

Ubah syarat `suaraSeragam` di pemutar (misalnya semua Materi Kelas 1), lalu `PilihGuru` untuk semua kelas. Modul lama yang memanggil `ucapkanGuruModul` sendiri (Kelas 1 Bab 2 sampai 5, Kelas 4, Kelas 5) cukup ditambah `seragam: true`.

## 6. Pengujian

- `node --no-warnings scripts/uji-suara-seragam.mjs`: aturan pemilihan untuk perangkat Android, Android lama, iPhone, Mac, Windows Chrome, Windows Edge, Windows tanpa paket Indonesia, dan perangkat dengan suara pria saja. Hasil tidak berubah walau urutan daftar suara diacak.
- Di peramban: semua tombol suara di Materi Sub-Bab A dan video memakai parameter yang sama (`id-ID`, 0,85, 1,1). Sub-Bab B dan Silabus tetap memakai parameter lama.
