# Aturan kuis Concrete, Picture, dan Abstract (Opsi 2)

Status: **disetujui pemilik** (aturan pokok: tepat 10 soal bernomor 1 sampai 10 per tahap, tindakan berbeda, batas tegas per tahap). Tiga butir di bagian 5 sudah dijawab pemilik. Lahir dari arahan pemilik: soal dan kuis di tahap Concrete, Pictorial, dan Abstract harus punya **batasan yang tegas**, dan variasi soal harus berupa **perbedaan tindakan**, bukan hanya perbedaan angka. Berlaku untuk semua sub-bab Opsi 2 (mulai Tahap 3 Kelas 1 Bab 1 Sub-Bab A).

## 1. Prinsip
0. **Tepat 10 soal per tahap.** Concrete, Picture, dan Abstract masing-masing terdiri dari 10 soal saja, bernomor 1 sampai 10 (keputusan pemilik). Tiap nomor adalah satu soal dengan satu putaran; tidak ada ronde berulang, babak tambahan, atau soal cadangan.
0b. **Tanpa penilaian.** Tahap Concrete, Pictorial, dan Abstract tidak memberi nilai, skor, poin, peringkat, atau pencatatan benar-salah (keputusan pemilik). Penilaian hanya ada pada tahap Latihan dan Ujian. Yang ada di CPA hanya umpan balik belajar (petunjuk dan penjelasan) dan tombol lanjut.
1. **Variasi = tindakan berbeda.** Dua soal yang hanya berbeda angka adalah SOAL YANG SAMA. Kesepuluh soal di satu tahap memakai tindakan yang berbeda satu sama lain (nomor 1 sampai 10 = sepuluh tindakan berbeda). Angka hanyalah parameter di dalam satu tindakan.
2. **Batas tegas per tahap.** Setiap tahap punya daftar tindakan yang BOLEH dan daftar yang DILARANG. Soal di luar daftar ditolak uji.
3. **Satu soal, satu kunci.** Tiap soal punya satu jawaban benar yang dihitung ulang secara independen. Pengecoh dibuat dari kekeliruan nyata anak (terlewat, terhitung dua kali, tertukar lambang), bukan acak.
4. **Tidak keluar topik.** Soal hanya memakai konsep sub-bab itu dan yang sudah diajarkan sebelumnya; tidak membocorkan sub-bab berikutnya. Rentang angka sesuai rentang sub-bab.

## 2. Batas tegas tiap tahap
| Tahap | Boleh | Dilarang |
|---|---|---|
| **Concrete** | Benda keseharian berwarna (gambar) yang diklik, diseret, dipisahkan, atau digabung. | Diagram abstrak (bingkai sepuluh, garis bilangan, tabel), lambang sebagai jawaban utama. |
| **Picture** | Diagram saja: bingkai sepuluh, titik atau lingkaran polos, garis bilangan, batang, tally, tabel. Anak mewarnai, menandai, menghubungkan, mengisi, memilih. | Gambar atau emoji benda, memindahkan benda. |
| **Abstract** | Lambang dan kata: angka, kata bilangan, kartu angka, tanda. | Gambar benda atau diagram sebagai pengganti soal. |

## 3. Katalog tindakan (contoh untuk topik bilangan nol sampai sepuluh)
Tiap soal memakai SATU tindakan dari katalog tahapnya. Soal nomor 1 sampai 10 = sepuluh tindakan berbeda (nomor di bawah ini boleh diurutkan ulang menurut tingkat kesulitan, tetapi tiap tahap tetap memakai sepuluh tindakan yang berbeda).

**Concrete (benda gambar):** (1) seret benda ke wadah sampai tepat n; (2) pisahkan sebagian benda dari kumpulan (mis. ambil m dari n); (3) klik benda satu per satu sambil menghitung; (4) pilah benda ke dua wadah menurut ciri; (5) pasangkan satu benda dengan satu benda; (6) tata benda menjadi baris lima; (7) kurangi benda sampai sisa n; (8) tebak banyaknya dari tayangan sekilas lalu periksa; (9) gabungkan dua kumpulan menjadi satu; (10) bagi kumpulan menjadi dua bagian sama.

**Picture (diagram):** (1) warnai n petak pada bingkai sepuluh; (2) tandai n titik pada deret; (3) hubungkan kumpulan titik dengan lambangnya; (4) pilih diagram titik yang sesuai; (5) lengkapi tally; (6) geser penanda di garis bilangan ke n; (7) pilih kumpulan titik yang paling banyak; (8) ketuk n lingkaran; (9) urutkan diagram dari sedikit ke banyak; (10) temukan diagram yang berbeda.

**Abstract (lambang):** (1) pilih lambang yang benar; (2) tulis lambang di kanvas; (3) susun kartu angka berurutan; (4) jodohkan kata bilangan dengan lambang; (5) isi lambang yang hilang pada deret; (6) benar atau salah pernyataan; (7) detektif: temukan lambang yang keliru; (8) memori kartu lambang dan kata; (9) urutkan lambang; (10) ketuk semua lambang yang bernilai sama.

Katalog ini diubah per topik (tindakan nyata Kelas 4 tentu berbeda dari Kelas 1), tetapi batas tegas per tahap tetap.

## 4. Penegakan otomatis (diusulkan)
- Tiap soal memuat field `nomor` (1 sampai 10), `tindakan` (id dari katalog tahap), dan `batas` (tahap, rentang angka).
- Uji: (a) tiap tahap tepat 10 soal bernomor 1 sampai 10 tanpa lompat atau kembar; (b) tidak ada dua soal dalam satu tahap dengan `tindakan` sama; (c) `tindakan` termasuk katalog tahapnya; (d) soal memakai hanya benda (Concrete), diagram (Picture), atau lambang (Abstract) sesuai batas tahap, mis. Picture tanpa emoji benda; (e) angka dalam rentang; (f) kunci dihitung ulang; (g) pengecoh dibuat dari kekeliruan yang dicatat, tanpa duplikat; (h) tidak ada kata atau konsep sub-bab berikutnya.
- Satu soal = satu putaran. Angka boleh diacak per percobaan, tetapi tindakannya tidak berubah.

## 5. Keputusan pemilik
1. **Percobaan:** sebanyak jumlah pilihan jawaban yang ada. Soal dengan tiga pilihan boleh dicoba tiga kali, empat pilihan empat kali, dan seterusnya. Soal tanpa pilihan (seret, warnai, tulis) memakai batas bawaan tiga percobaan. Setelah percobaan habis, jawaban benar ditunjukkan. Petunjuk (bentuk tindakan, mis. benda atau bagian yang benar berkedip) tetap bawaan karena belum diputuskan lain. Tahap CPA TIDAK dinilai (lihat butir berikut), jadi percobaan hanya sarana belajar: tidak ada skor, nilai, poin, atau catatan benar-salah yang dihitung.
2. **Tindakan favorit dan terlarang:** diserahkan kepada perancang (Claude), dengan ketentuan di bawah.
3. **Urutan soal 1 sampai 10:** bebas (tidak harus dari mudah ke sulit). Pengacakan urutan tindakan boleh, tetapi nomor tetap 1 sampai 10.

### Ketentuan tindakan (keputusan perancang atas butir 2)
- **Dianjurkan:** tindakan yang nyata dilakukan anak dengan benda keseharian: seret, pisahkan, gabungkan, pilah, pasangkan, tata, hitung dengan mengetuk, tebak sekilas. Untuk bab pecahan Kelas 4 dan seterusnya: potong benda menjadi bagian sama (klik lalu pisahkan bagian), tempelkan bagian, bandingkan bagian.
- **Dilarang:** tindakan yang bisa diselesaikan tanpa memahami konsep (mis. mengetuk acak sampai benar, atau menjawab dengan menghitung waktu tanpa melihat soal); tindakan yang butuh membaca teks panjang (anak Kelas 1 sulit membaca); tindakan dengan batas waktu atau skor lomba; dan tindakan yang memakai konsep di luar sub-bab (membocorkan sub-bab berikutnya).
- **Syarat tiap tindakan:** ada satu hasil yang bisa diperiksa mesin dan dihitung ulang, ada umpan balik yang menunjuk letak kekeliruan (tanpa memarahi), dan bisa dijalankan dengan jari di layar HP.
