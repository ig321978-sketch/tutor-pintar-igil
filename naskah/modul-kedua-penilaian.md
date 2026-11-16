# Modul Kedua (pola SMISCPA): penilaian, penguasaan, dan pengulangan

Berlaku untuk semua Modul Kedua. Kode: `src/lib/modul-kedua/`. Rumus di bawah sama persis dengan kode (`penguasaan.ts`) dan diuji otomatis oleh `scripts/uji-modul-kedua-k1b1.mjs`.

## 1. Nilai satu butir soal

- Salah (setelah 3 percobaan): nilai 0.
- Benar: `nilai = faktorPercobaan x faktorPetunjuk`
  - faktorPercobaan: percobaan ke-1 = 1; ke-2 = 0,5; ke-3 atau lebih = 0,25
  - faktorPetunjuk: tanpa petunjuk = 1; memakai petunjuk (berapa kali pun pada soal itu) = 0,75
- Pra-tes dan pasca-tes: satu kesempatan, tanpa petunjuk, tanpa kunci selama tes.

## 2. Indeks penguasaan (0 sampai 100)

`indeks = 100 x jumlah(bobotLevel x nilaiButir) / jumlah(bobotLevel)`

Bobot level: Dasar 1; Mahir 1,5; Juara 2. Alasan: soal yang lebih sulit lebih menunjukkan penguasaan, tetapi tidak terlalu timpang.

Indeks dihitung terpisah untuk:

- tiap tahap (Peta, Simulasi, Concrete, Pictorial, Abstract, pra-tes, pasca-tes);
- tiap **elemen capaian** (Bilangan: membilang, membaca-menulis, membandingkan, mengurutkan), dari butir Concrete, Pictorial, Abstract, dan pasca-tes;
- tiap **level kognitif** (knowing, applying, reasoning), dari butir yang sama.

Level penalaran yang dikuasai: knowing >= 80, lalu applying >= 80, lalu reasoning >= 80, berurutan.

## 3. Waktu, percobaan, petunjuk

Dicatat per tahap sebagai data terpisah: detik, jumlah percobaan, jumlah petunjuk. **Waktu tidak ikut dalam indeks**, agar adil bagi anak yang membaca lebih pelan atau memakai audio.

## 4. Penguasaan dan remedial

- Target tahap: indeks >= 80.
- Tahap bernilai (Peta, Simulasi, Concrete, Pictorial, Abstract, pasca-tes) yang di bawah 80 memicu remedial otomatis: penjelasan ulang, 5 soal serupa yang lebih mudah, lalu tahap diulang dengan angka baru.
- Maksimal 2 putaran remedial. Setelah itu siswa boleh lanjut, tahap ditandai "belum tuntas" (⚠) di data, supaya tidak terjebak.
- Story dan Infografis tidak dinilai (hanya dicatat selesai).

## 5. Soal acak berparameter

Setiap soal dibangkitkan dari spesifikasi (jenis pembangkit + rentang angka) dengan pengacak berbenih. Benih baru tiap percobaan sehingga angka berubah. Tiap soal membawa `fakta` terstruktur; tes otomatis menghitung ulang kunci dari fakta itu dengan kode terpisah.

## 6. Pengulangan berjarak dan pencampuran

Kotak Leitner sederhana per jenis soal: interval 1, 3, 7, 14, 30 hari. Benar pada percobaan pertama menaikkan kotak; selain itu kembali ke kotak 0. Ulangan menampilkan jenis soal yang jatuh tempo lebih dulu, lalu jenis lain, satu soal per jenis agar tercampur (interleaving).

## 7. Penyimpanan data siswa

Lokal dulu: `localStorage` kunci `igil.modulKedua.<idModul>.v1` (skor, waktu, percobaan, petunjuk, butir, jadwal ulangan). Tidak ada data sensitif; nama diambil dari profil lokal yang sudah ada. Sinkronisasi Supabase belum dibuat.
