# Video cerita Kelas 2 Bab 1 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A, B, dan C. Slide `BukuCerita` lama diganti video animasi HTML/SVG. Komponen slide lama (`CeritaHitungK2A`, `CeritaNilaiK2B`, `CeritaBandingK2C`) masih ada di berkasnya tetapi tidak dipasang.

## Prinsip

- Gratis dan tanpa panggilan API. Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video, tidak ada layanan berbayar.
- Naskah satu sumber. Isi tiap adegan diambil dari `voiceNarration` pada `CERITA_K2A/B/C` (berkas `gambar-hitung-k2a.tsx`, `gambar-nilai-k2b.tsx`, `gambar-banding-k2c.tsx`). Mengubah kalimat di sana mengubah suara dan teks video sekaligus. Format `id`, `sceneType`, `voiceNarration` di berkas itu tetap dibaca oleh `src/content-master/buat-k2-bab1.mjs`, jadi jangan diubah.
- Satu kalimat = satu ketukan. `kalimatDari()` memecah naskah di tanda titik, tanda tanya, dan tanda seru. Gambar berubah mengikuti kalimat yang sedang dibacakan.
- Suara memakai `speakGuru` modul (guru pilihan siswa, suara perangkat Web Speech `id-ID`, karena JSON Kelas 2 memakai `suaraPerangkatSaja`). Tidak ada audio statis dan tidak ada ElevenLabs.
- Tema warna biru ungu royal, kuning emas, putih.

## Mesin (`src/components/modul/video-cerita.tsx`)

- `VideoCerita`: kartu pemutar dengan layar 300 x 208, kotak keterangan (kalimat yang sedang dibacakan), nomor adegan yang bisa diketuk, tombol Jeda/Lanjut, Ulang, dan Suara hidup/mati.
- Kalimat dibacakan satu per satu. Ketukan berikutnya mulai saat suara selesai, dengan dua pengaman: waktu tampil minimal per ketukan (agar gerakan sempat selesai) dan batas tunggu (panjang kalimat x 150 ms + 6 detik) bila suara perangkat tidak melapor selesai. Bila suara dimatikan atau perangkat tidak punya suara, ketukan berjalan menurut panjang kalimat.
- Layar disembunyikan (pindah tab peramban) memicu jeda otomatis. Pindah tab modul atau sub-bab menghentikan suara dan waktu.
- Pembantu gerak: `Muncul` (muncul membesar), `Gerak` (pindah halus), `Lompat`, `Sorot` (garis putus-putus berkedip), `Papan` (judul pendek di atas layar), `tumbuh()` (bilangan naik berurutan memakai `t`).
- Adegan menerima `{ k, t }`: `k` nomor ketukan, `t` detik sejak ketukan dimulai (hanya bergerak bila `waktu: true`). `minimal` memberi waktu tampil minimal untuk ketukan yang animasinya berurutan.

## Isi video

### Sub-Bab A: Loker Baru Kelas Malosi (6 adegan, 52 ketukan)

1. Loker baru (9): rak loker turun, Malosi dan teman masuk dan melompat senang, tas muncul, Ibu guru meminta tas dimasukkan, rak masih kosong, tanda tanya.
2. Tas bergantian (8): tas masuk loker satu per satu, 1 anak = 1 tas = 1 loker, Malosi giliran terakhir, banyak tas = banyak anak, hitung satu per satu.
3. Menghitung 26 tas (9): penanda emas berjalan, nomor 1 sampai 10 (baris bawah), 11 sampai 20, 21 sampai 26, lencana 26.
4. Kelompok sepuluh (13): sepuluh benda dalam lingkaran, enam wadah berisi sepuluh muncul satu per satu, satu puluhan, lalu 10, 20, 30, 40, 50 bertambah.
5. 10 + 10 + 6 (8): tiap baris rak disorot, 10 + 10 = 20, 20 + 6 = 26.
6. Maju dan mundur (5): dua jalur 20 sampai 30, penanda maju 20 ke 30 lalu mundur 30 ke 20, nama bilangan, Igil mengajak membaca nyaring.

### Sub-Bab B: Balok Malosi (6 adegan, 42 ketukan)

1. Malosi main balok (7): balok berserak, dihitung satu per satu (bernomor), tabel nilai tempat, puluhan dan satuan.
2. Satu puluhan (7): 10 balok menyatu menjadi satu batang, 4 satuan, tabel terisi 1 dan 4, lencana 14.
3. Dua puluhan delapan satuan (6): kolom kiri dan kanan disorot, 2 batang dan 8 balok, tabel 2 dan 8, lencana 28.
4. Cara 1 (6): 26 balok lepas, tiga cara, 0 puluhan 26 satuan, dihitung satu per satu.
5. Cara 2 (7): satu batang dan 16 satuan, periksa 10 + 16 = 26, masih ada 10 balok yang bisa disusun.
6. Cara 3 (9): dua batang dan 6 satuan, paling ringkas, tiga tabel berdampingan, semuanya sama dengan 26.

### Sub-Bab C: Permen Ulang Tahun Kira (6 adegan, 42 ketukan)

1. Stoples permen Kira (7): Kira, stoples, Malosi menebak 20, Halim menebak 30, buktikan dengan menghitung.
2. Menghitung permen (5): dua lingkaran sepuluh, 10 dan 20, sisanya 21 sampai 26 muncul berurutan, lencana 26.
3. Tebakan lebih dekat (7): jalur 20 sampai 30, langkah bernomor 1 sampai 6 (maju) dan 1 sampai 4 (mundur), 4 < 6.
4. Kira dan Tika (7): 26 dan 32, dua tabel nilai tempat terisi, batang dan balok.
5. Kolom puluhan (8): kolom puluhan disorot, 2 puluhan dan 3 puluhan, lebih banyak = lebih besar, 32 > 26 dan 26 < 32.
6. Urutkan kartu (8): kartu 25, 12, 35, 21, yang paling kecil dan paling besar, satuan 1 dan 5, kartu berurut 12, 21, 25, 35.

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx`
- Adegan: `video-cerita-k2a.tsx`, `video-cerita-k2b.tsx`, `video-cerita-k2c.tsx` (di `src/components/modul/`). Masing-masing mengekspor `ADEGAN_VIDEO_K2*` dan komponen `VideoHitungK2A`, `VideoNilaiK2B`, `VideoBandingK2C`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab1-A`, `-B`, `-C`, bidang `Cerita`.
- Gambar bersama yang diekspor dari berkas slide lama: `LokerRak` (kini punya `nomorSampai`), `TasG`, `Permen`, `KelompokPermen`, `CincinSepuluh`, `Stoples`, `JalurKotak`, `KartuAngka`, `jarakPermen`.
- Uji: `scripts/uji-video-cerita.mjs`.

## Batas yang diketahui

- Suara dan ketukan diuji dengan suara tiruan di Chrome desktop berukuran ponsel. Suara asli HP belum diuji. Pada sebagian Android, tombol Jeda tidak menghentikan suara di tengah kalimat (Web Speech `pause()` tidak didukung merata). Gambar tetap berhenti, dan kalimat dilanjutkan saat Lanjut ditekan.
- Satu video berdurasi sekitar 2 sampai 3 menit tergantung kecepatan suara perangkat. Siswa bisa melompat ke adegan lain lewat nomor adegan.
