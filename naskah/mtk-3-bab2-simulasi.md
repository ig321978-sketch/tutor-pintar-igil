# Matematika Kelas 3 · Bab 2 · Simulasi SMISCPA (pola hibrida)

Bab: Kalimat Matematika (`mtk-3-bab2`, `FASE_B`, kelas 3). Komponen: `src/components/modul/SimulasiK3Bab2.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k3bab2.ts`, teks misi di `misi-teks-k3b2.ts`. Kelas 3 dimuat malas: registri memuat `SimulasiK3Bab2` lewat `next/dynamic` (`ssr: false`), dan hanya `misi-teks-k3b2.ts` (berkas kecil tanpa impor) yang ikut bundel pemutar.

Jangkauan: bilangan 0 sampai 100 untuk kedua sub-bab. Hasil pengurangan tidak pernah di bawah nol. Sub-Bab A hanya memakai penjumlahan sebagai kalimat soal; pengurangan baru muncul di Sub-Bab B.

Berkas Materi bab ini tidak diubah (`data-k3b2.ts`, `naskah-k3b2.ts`, `paket-k3b2.ts`, `SubBabK3B2.tsx`, `kit-k3b2.tsx`). Tokoh dan istilah mengikuti Materi: Galih dan Andi dengan kelerengnya, Pak Slamet dengan ayamnya, perpustakaan 100 buku, tiket film 95, telur 100, dan televisi 40.

## Alat

| Alat | Berkas | Metode | Dipakai |
|------|--------|--------|---------|
| Lab Neraca Kalimat (tampilan Neraca dan Papan Kemungkinan) | `SimulasiLabKalimatK3.tsx` + `lab-kalimat-k3b2.ts` | PhET (manipulasi langsung) | A (tambah), B (kurang, tambah tetap tersedia) |
| Mesin Kalimat (dua definisi) | `SimulasiMesinBertahapK3.tsx` (dari Bab 1, sudah di HEAD) + `mesin-data-k3b2.ts` | Mesin keadaan | A (Tambah), B (Kurang) |
| Skenario (dua) | `SimulasiSkenario.tsx` + `skenario-k3b2.ts` | Skenario kontekstual | A (Buku Perpustakaan Rani), B (Pasar Pak Slamet) |

Lab 3D tidak dipakai (isi bab bukan bangun ruang). CPA tetap di Concrete, Picture, Abstract. Lab Neraca Kalimat memuat dua tampilan di dalam satu alat, jadi tiap sub-bab tetap tiga alat.

Mengapa neraca: tanda sama dengan adalah salah satu salah paham terbesar anak (dibaca "hasilnya"). Neraca yang miring bila kedua sisi belum sama nilainya membuat arti "=" terlihat dan bisa dicoba, bukan dihafal. Mesin keadaan dipilih karena urutan cerita, kalimat, kebalikan, hitung, periksa memang berurutan dan tidak boleh dilompati. Skenario dipilih karena pemilihan operasi dan banyak kemungkinan paling mudah dipahami dalam cerita.

## Lab Neraca Kalimat

**Tampilan Neraca.** Satu kalimat dengan satu kotak titik-titik. Pengatur ±1 dan ±10 untuk bilangan yang diketahui, bilangan di kanan tanda sama dengan, dan isi kotak. Pilihan letak titik-titik (di tengah atau di depan). Neraca digambar: palang miring ke sisi yang lebih berat, hijau saat seimbang, abu-abu bila pengurangan belum bisa dihitung. Tampilan tambahan: **Bagan** (batang atas dan dua batang di bawahnya, batang yang dicari bertanda tanya sampai diisi) dan **Kebalikan** (operasi untuk mencari isi titik-titik). Tombol **Periksa** (hanya bekerja bila neraca seimbang) dan **Tukar tempat**. Pada Sub-Bab B ada pilihan operasi Kurang atau Tambah.

**Tampilan Papan Kemungkinan.** Hanya jumlah (A) atau bilangan awal (B) yang diketahui. Anak mengatur dua bagian dan mencatat pasangan yang jumlahnya tepat sama. Pasangan yang sama tidak dicatat dua kali.

## Pola hibrida

Satu laboratorium per sub-bab, tiga alat. Gerbang LANJUTKAN KE CONCRETE aktif bila semua misi wajib tercapai, atau anak menekan **Lewati misi** setelah menyentuh simulasi sekali. Misi yang sudah tercapai tidak dicabut. Tiap sub-bab punya paling sedikit tiga misi wajib dan satu tantangan bebas. Sub-Bab B menjadi simulasi pencapaian misi bab. Konsep sub-bab berikutnya tidak dipakai di sub-bab sebelumnya.

| Sub-bab | Alat | Misi wajib | Tantangan bebas |
|---------|------|------------|-----------------|
| A · Kalimat Penjumlahan | Lab Neraca Kalimat (tambah) + Mesin Kalimat Tambah + skenario Buku Perpustakaan Rani | Seimbangkan 8 + … = 19 (titik-titik di tengah); seimbangkan … + 16 = 54 (di depan); Kebalikan menyala pada dua bentuk itu; Periksa pada kalimat seimbang; Papan Kemungkinan jumlah 100 dengan tiga pasangan berbeda; tuntas mesin; tuntas skenario | Tukar tempat pada penjumlahan seimbang (tetap seimbang); jumlah 95 dengan lima pasangan; … + 17 = 17 (isi nol) |
| B · Kalimat Pengurangan (pencapaian bab) | Lab Neraca Kalimat (kurang, tambah tetap tersedia) + Mesin Kalimat Kurang + skenario Pasar Pak Slamet | Seimbangkan 80 − … = 45; seimbangkan … − 45 = 27; Kebalikan menyala pada dua bentuk pengurangan; Periksa pada pengurangan seimbang; satu bagan dua kalimat (80 − … = 45 lalu ganti ke Tambah 45 + … = 80); tuntas mesin; tuntas skenario | Tukar tempat pada pengurangan ditolak; 100 telur dengan tiga pasangan terjual dan sisa; 40 televisi dengan lima pasangan; pengurangan dengan sisa nol |

Keadaan awal alat (tidak boleh langsung memenuhi misi mana pun, diuji):

- Lab Neraca Kalimat: A mulai 30 + … = 50 dan B mulai 32 − … = 15, kotak kosong (0), semua tampilan mati, belum ada riwayat. Papan Kemungkinan: A jumlah 50, B bilangan awal 80, kedua bagian 0, catatan kosong.
- Mesin: stasiun pertama, kasus pertama, belum ada langkah. Skenario: adegan pertama.

## Mesin Kalimat

Lima stasiun: Cerita, Kalimat, Kebalikan, Hitung, Periksa. Mesin menolak langkah yang melompat dan menjawab salah dengan petunjuk, tanpa hukuman. Semua pilihan dan kunci dihitung dari bilangan kasusnya.

| Mesin | Kasus |
|-------|-------|
| Mesin Kalimat Tambah (A) | Kelereng Galih (… + 5 = 17), Galih dan Andi (30 + … = 50), Ikan Pak Ali (… + 16 = 54) |
| Mesin Kalimat Kurang (B) | Ayam yang Dijual (80 − … = 45), Ayam Mula-Mula (… − 45 = 27), Kue Ibu (… − 12 = 26) |

Pengecoh bersumber dari kesalahan umum: salah sepuluh (lupa menyimpan atau mengambil), salah satu, operasi kebalikan terbalik, dan kalimat yang menukar hasil dengan bilangan yang diketahui. Satu pengecoh kalimat pernah ternyata ikut benar secara matematis (… − 27 = 45 pada kasus ayam mula-mula, sebab 72 − 27 = 45), dan uji menangkapnya; kini bilangan awal dipindah ke belakang.

## Skenario

| Skenario | Adegan | Isi |
|----------|--------|-----|
| Buku Perpustakaan Rani (A) | 7 | Menulis kalimat dari cerita; cari, kebalikan, dan periksa; hitung 12 kelereng; pasangan 100 buku (dengan penegasan bahwa jawabannya banyak); isi kantong 8 + … = 19 |
| Pasar Pak Slamet (B) | 8 | Menulis 80 − … = 45; dua cara mencari menurut letak titik-titik; pengurangan tidak boleh ditukar; hitung 24 − 15; pasangan 100 telur; isi keranjang 40 − 25 |

## Kejujuran konsep

- Tanda sama dengan berarti sama nilainya di kedua sisi. Neraca seimbang hanya bila nilai kiri tepat sama dengan nilai kanan; miring ke arah yang lebih berat bila tidak.
- Penjumlahan boleh ditukar tempat (30 + 20 dan 20 + 30 tetap seimbang). Pengurangan tidak: lab menolak dan menjelaskan alasannya (bilangan awal harus di depan, 35 − 80 tidak bisa dihitung).
- Titik-titik di tengah dan di depan dicari dengan cara berbeda pada pengurangan: awal dikurangi sisa, atau yang dikurangkan ditambah sisa. Pada penjumlahan keduanya dengan mengurangkan jumlah.
- Hasil dicari dengan operasi kebalikan lalu diperiksa. Periksa hanya bisa ditekan saat neraca seimbang.
- Bila hanya jumlah (atau bilangan awal) yang diketahui, jawabannya banyak. Papan Kemungkinan tidak menandai satu jawaban sebagai benar. Pada penjumlahan, 60 + 40 dan 40 + 60 dihitung satu pasangan; pada pengurangan terjual dan sisa berbeda peran, jadi urutan dihitung berbeda.
- Semua bilangan 0 sampai 100. Hasil pengurangan tidak negatif. Pengatur menolak keadaan yang membuat kalimat tidak punya jawaban dalam jangkauan itu, dengan pesan penjelas (mis. "Sisa tidak boleh lebih besar dari bilangan awal").
- Ditunjukkan juga satu bagan dibaca dua kalimat: 80 − … = 45 dan 45 + … = 80 memakai tiga bilangan yang sama.
- Gambar hanya neraca, batang bagan, dan teks bilangan, bukan gambar benda, sehingga batas Concrete dan Picture terjaga.

## Coba ini! (ringkas)

- **Lab Neraca Kalimat (A):** buat 8 + … = 19 dan isi sedikit demi sedikit; pindahkan titik-titik ke depan; Tukar tempat pada penjumlahan seimbang; jumlah 100 di Papan Kemungkinan.
- **Lab Neraca Kalimat (B):** 80 − … = 45 lalu titik-titik di depan; ganti ke Tambah pada bagan yang sama; Tukar tempat pada pengurangan; 100 telur di Papan Kemungkinan.
- **Mesin:** ketuk stasiun lanjutan sebelum waktunya dan lihat mesin menolak; bandingkan titik-titik di depan dan di tengah.
- **Skenario:** pilih tindakan yang kurang tepat dulu; main lagi dan ubah pilihan.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`, `LabBertahap`). Tanpa LLM dan tanpa jaringan. Reset Semua mengembalikan kedua tampilan lab. Suara memakai `speakGuru`; angka dan titik-titik dieja ("titik-titik") oleh `ejaK3`.

## Uji

- `node --no-warnings scripts/uji-lab-k3b2.mjs`: semua 40.804 kombinasi kalimat sah dan tunggalnya isi, operasi kebalikan, reducer neraca (batas, tukar tempat, ganti operasi, riwayat, fuzz 30.000 aksi), bagan, Papan Kemungkinan, dua mesin (struktur, permainan penuh, kunci mandiri dihitung ulang), struktur misi, keadaan awal tidak memenuhi misi, bukti tiap misi bisa dicapai lewat tombol alat, gerbang (792 cek)
- `node --no-warnings scripts/uji-skenario-umum.mjs`: skenario, termasuk dua skenario Kelas 3 Bab 2
- `node --no-warnings scripts/uji-peta-konsep.mjs` dan `scripts/uji-infografis-ringkas.mjs`: data ringkas `kelas3-bab2-ringkas.json`
