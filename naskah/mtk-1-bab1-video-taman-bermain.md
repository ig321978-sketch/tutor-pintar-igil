# Video cerita "Di Taman Bermain" — Matematika Kelas 1 SD, Bab 1, Sub-Bab A

Video animasi ini menggantikan slide gambar pada **Tahap 1: Story** di tab Materi Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan 0 sampai 10). Sub-Bab B, C, dan D tetap memakai slide cerita masing-masing.

## 1. Sumber dan cara kerja

- **Sumber:** animasi HTML/SVG gratis `di-taman-bermain.html` (karya gratis, tanpa layanan video berbayar), dipindahkan menjadi komponen React `src/components/modul/VideoTamanBermain.tsx`.
- **Berjalan di perangkat siswa.** Latar, anak, benda, dan gerakan digambar dengan SVG dan CSS. Tidak ada berkas video, tidak ada panggilan API, tidak ada panggilan AI.
- **Suara Guru murni Web Speech API perangkat** (`id-ID`), memakai guru pilihan siswa (Bu Sari atau Pak Budi). Tidak mencari berkas audio statis, tidak memakai ElevenLabs, dan tidak mencatat ucapan ke naskah penulisan (opsi `perangkatSaja`).
- **Pemasangan:** `VIDEO_CERITA["mtk-1-bab1-A"]` di `IgilModulePlayer.tsx`. Sub-bab lain bisa diberi video yang sama caranya: buat komponen, lalu daftarkan dengan kunci `<bab>-<sub-bab>`.

## 2. Alur video (7 bagian)

Tiap kalimat tampil di bawah layar video dan dibacakan. Video berlanjut setelah suara selesai dan waktu minimal terlewati. Bila suara dimatikan atau tidak tersedia, waktu tampil dihitung dari panjang kalimat.

| Bagian | Isi | Kalimat yang dibacakan |
|---|---|---|
| 1 | Enam anak masuk ke taman: Malosi, Upe, Kira, Wei, Halim, Tika. Mereka melompat gembira. | "Malosi dan teman-temannya bermain di taman." "Mereka sangat senang, dan bermain dengan aman." |
| 2 | Menghitung **5 kursi**, satu per satu, tiap benda diberi nomor. | "Ayo kita hitung benda-benda di taman. Mulai dari kursi!" "satu ... lima." "Ada lima kursi." |
| 3 | Menghitung **7 layang-layang**. | "Sekarang layang-layang di langit." "satu ... tujuh." "Ada tujuh layang-layang." |
| 4 | **4 sepeda** dan **4 burung** muncul bersama: sama banyak. | "Ada empat sepeda dan empat burung." "Jumlah sepeda sama banyak dengan jumlah burung!" |
| 5 | Menghitung **10 bola** dari satu keranjang. | "Satu keranjang berisi bola. Ayo hitung!" "satu ... sepuluh." "Ada sepuluh bola." |
| 6 | **Keranjang kosong** diberi angka **0**. | "Keranjang yang satunya kosong. Tidak ada isinya. Itu dibaca nol." |
| 7 | Anak-anak melompat, video berakhir. | "Hebat! Kita sudah belajar membilang dari nol sampai sepuluh. Sampai jumpa!" |

Cakupan belajar: membilang dengan korespondensi satu-satu (satu benda, satu angka), banyak benda sampai 10, dua kumpulan yang sama banyak, dan nol sebagai "tidak ada".

## 3. Kontrol untuk siswa

- **▶ Mulai** (di layar awal), **⏸ Jeda / ▶ Lanjut** (menjeda animasi dan suara), **↻ Ulang** (memutar dari awal, kapan saja), **🔊 Suara: hidup / mati**.
- **Penanda kemajuan** "Bagian x dari 7" dan tujuh batang kecil.
- Video berhenti dan suaranya dihentikan bila siswa pindah tab (Latihan, Ujian) atau pindah sub-bab, dan otomatis dijeda bila layar peramban disembunyikan.
- Tombol **LANJUTKAN KE MIND-MAPPING** di bawah video tidak berubah. Video tidak mengunci tahap berikutnya.

## 4. Tampilan dan keterbacaan

- Layar video 16:9 dengan bingkai biru ungu IGIL. Kalimat dibacakan ditampilkan di kotak kuning di bawah layar dengan huruf besar, supaya terbaca di HP.
- Kursi, layang-layang, sepeda, dan bola memakai ikon mainan IGIL (SVG); burung dan keranjang digambar khusus. Tidak memakai emoji benda, supaya tampil sama di semua perangkat.
- Ukuran memakai satuan kontainer (`cqw`) dengan batas minimum, jadi tetap terbaca di layar 320 sampai desktop. Sepuluh bola muat satu baris dan tidak menutupi kepala anak pada layar HP umum (lebar 360 sampai 430 px).
- Siswa yang memilih "kurangi gerak" di perangkat tidak melihat awan bergeser dan anak melompat.

## 5. Yang diuji

- Putar penuh: kalimat dan nomor benda muncul berurutan sampai "Selesai", penanda berpindah dari Bagian 1 sampai 7.
- Jeda menahan animasi dan suara; Lanjut meneruskan. Suara mati menghentikan ucapan tanpa menghentikan video. Ulang memutar dari awal, juga setelah video selesai.
- Pindah tab menghentikan video dan ucapan; kembali ke Materi menampilkan layar awal lagi.
- Tidak ada galat konsol dan tidak ada permintaan audio statis maupun API suara.
