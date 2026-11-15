# Story video Kelas 1 Bab 8: Mengenal Diagram

# Naskah singkat: Story Kelas 1 Bab 8 Sub-Bab A (Mengelompokkan Data)

Berkas: `src/components/modul/story/k1b8A-*.ts` (video, materi-1..4, luar-1, luar-2, gambar, bantu), `src/components/modul/video-k1b8a.tsx` (`VideoK1B8A`), `scripts/uji-story-k1b8A.mjs`, `.tmp-k1b8s/A.json`.
Ekspor: `VIDEO_MATERI_K1B8A` (id `k1b8A-materi`), `VIDEO_LUAR_K1B8A` (id `k1b8A-luar`). Tokoh: Kira, Upe, Wei, Halim, Malosi, Igil. Semua aksi siswa berupa aksi layar (ketuk, pilih kartu, ucapkan lagi). Data selalu tergambar di layar; jumlah semua benda di satu adegan paling banyak dua puluh.

## Video materi: 19 adegan, 107 ketukan, 1340 kata, sekitar 11,2 menit
sapaan (daftar: Mengelompokkan benda, Turus dan tabel data, Membandingkan data);
toko-berantakan (mainan toko Halim berserakan: kereta 6, mobil 4, boneka 5, bola 3; arti mengelompokkan);
toko-rapi (mainan dipindah ke rak menurut jenis, empat baris);
hitung-kelompok (hitung satu per satu tiap kelompok, angka di atas benda; data);
daftar-mainan (daftar, contoh data, paling banyak kereta enam, paling sedikit bola tiga, boneka lebih banyak dari mobil, jumlah semuanya 18);
bola-warna (bola Upe merah 7, kuning 4, hijau 6; paling banyak, paling sedikit, urutan);
turus-merah (satu bola satu goresan, goresan kelima miring memotong empat goresan, tujuh goresan);
turus-lain (bola kuning 4 goresan, bola hijau 6 goresan, hijau lebih banyak dua);
tabel-menurun (judul, baris ke samping, kolom ke bawah, isi tabel, cara membaca);
tabel-mendatar (tabel menurun dan mendatar bersebelahan, data sama, pilih kartu mendatar);
hewan-pilihan (enam tokoh memilih hewan di layar: kucing 3, kelinci 2, burung 1);
hewan-tabel (data pilihan dalam tabel, paling banyak kucing, paling sedikit burung, selisih dua, jumlah semuanya enam);
sama-banyak (apel 5, jeruk 5, pisang 3; sama banyak; jumlah semuanya 13);
selisih-bola (merah 7 dipasangkan dengan kuning 4, empat garis pasangan, tiga merah tanpa pasangan disorot, lebih banyak tiga);
jumlah-semua (hitung 17 bola satu per satu, angka 1 sampai 17; kartu jumlah semuanya);
latihan-satu (paling banyak: apel 4, pisang 7, jeruk 5; pilih kartu); latihan-dua (membaca turus delapan goresan; pilih bilangan); latihan-tiga (selisih dari tabel: mobil 5, boneka 8, bola 3; pilih bilangan);
penutup.

## Video metode luar (subjudul "Tiga metode luar"): 9 adegan, 43 ketukan, 512 kata, sekitar 4,3 menit
Nama (Indonesia saja): Turus, Diagram Gambar, Banding Kategori.
sapaan; luar-pembuka;
luar-turus (kelereng biru 8, satu ketukan satu goresan, goresan kelima miring) + luar-turus-terapan (turus kucing 9 dan burung 6, pilih yang lebih banyak, selisih tiga);
luar-diagram (diagram hewan: kucing 5, kelinci 3, burung 4; satu gambar satu data; bagian diagram: judul, nama baris, gambar, angka) + luar-diagram-terapan (apel 4, jeruk 6, pisang 2; pilih paling sedikit);
luar-banding (kucing 5, kelinci 3, burung 5; lebih banyak, lebih sedikit, sama banyak, selisih) + luar-banding-terapan (mobil 6 dan boneka 4; pilih yang lebih banyak, selisih dua, jumlah semuanya sepuluh);
luar-ringkas.

## Peta (Mind-Map susun): pusat "Mana yang paling banyak?", 3 cabang (3, 3, 2 anak), 11 simpul; teks paling panjang 25 huruf. Cabang pertama sama dengan daftar sapaan persis (Mengelompokkan benda, Turus dan tabel data, Membandingkan data).
## Tabel (Infografis susun): 4 baris x 3 kolom (Banyak, Urutan, Kata); baris Kereta 6, Boneka 5, Mobil 4, Bola 3 (urutan pertama sampai keempat; kata banyak, tengah, tengah, sedikit); sel paling panjang 7 huruf; jumlah semua mainan 18.

## Uji (scripts/uji-story-k1b8A.mjs)
Menghitung ulang dari gambar: benda per kelompok (id `e{huruf}{i}`: berurutan, satu jenis gambar, tidak saling menimpa, banyak <= 20, jumlah semua <= 20, angka banyaknya sama dengan jumlah benda); angka hitungan satu per satu sama dengan bilangan yang diucapkan; turus (`t{huruf}-g{i}`: goresan berurutan dan berjajar, goresan kelima miring memotong empat goresan, jumlah goresan sama dengan banyak benda di akhir adegan, goresan muncul tepat pada nama bilangannya); tabel menurun dan mendatar (nama baris dan angka dibaca dari gambar, dua tabel pada satu layar memuat data yang sama); diagram gambar (jumlah gambar tiap baris sama dengan angka, satu gambar satu data); setiap kalimat di suara dicocokkan dengan data yang tergambar: "X ada N", "ada N X", "X lebih banyak/sedikit (N) dari Y" (arah dan selisih), "X dan Y sama banyak", "X paling banyak/sedikit" (benar-benar maksimum/minimum tanpa seri), "jumlah semuanya N" (sama dengan penjumlahan semua kelompok); pilihan jawaban dan isi tiap adegan; peta dan tabel susun (tabel dihitung ulang dari mainan di toko). Tanpa kalimat hitung (tambah, kurang, kali, bagi), tanpa bilangan > 20.

## Temuan data (kelas1-bab8.json subBabs.A)
- targetDescription memuat kalimat "Memakai Turus, Diagram Gambar, Banding Kategori." dua kali.
- Nama metode ganda Inggris (Tally Marks, Pictograph, Compare Categories) di judul langkah mindMaps dan di mekanik game; langkah 7 dan 8 hanya "7." dan "8." dengan ikon bumi dan flowTo "7"/"8"/"END"; langkah 4 dan 5 kembar (Compare Categories). infografisData countNum 1, 2, 3 dan countWord "METODE LUAR · Tally Marks" janggal. Tidak dipakai; namaId saja.
- Data cerita: jumlah mainan 12 + 8 + 10 + 6 = 36 > 20 (melanggar batas <= 20). Diganti kereta 6, mobil 4, boneka 5, bola 3 (jumlah 18). "Pesawat" diganti kereta (gambar kereta tersedia). Bola merah 7, kuning 4, hijau 6 (jumlah 17) dan tabel Bola Upe dipakai apa adanya. Kalimat "Pesawat 12" dan "Mainan 12" tidak dimuat.
- Game data (kelereng 12, 15, 17 butir; "jumlah semua anak delapan belas"; "6 + 4 + 7"; "7 + 4 + 6 = 17"; abstractSlides "Boneka 3, Gasing 5, Kelereng 4, Bola 6") tidak dimuat; yang dimuat hanya data <= 20 dan dihitung ulang uji.
- Tokoh "Paman" (toko mainan Paman, pesanan Paman) diganti Halim; Tika tidak ada. Pesanan Paman (seret ke keranjang) diganti aksi layar: pilih kartu dan ketuk.
- Survei teman/kelas (abstractSlides "mainan kesukaan", hewan kesukaan di kelas) diganti data di layar: Malosi, Kira, Upe, Wei, Halim, Igil masing-masing punya hewan pilihan di layar (kucing, kelinci, burung).
- Perintah fisik ("gurat angka di kanvas", "lingkari", menggambar/menulis di buku, benda nyata, "Buku Siswa hlm.") tidak dimuat; semua aksi siswa berupa ketuk, pilih kartu, ucapkan lagi.
- Kata "turus" (nama metode luar Turus sekaligus istilah isi sub-bab) dipakai di video materi sebagai istilah isi; uji hanya melarang nama metode luar lain (Diagram Gambar, Banding Kategori) di video materi.
- Larangan "kelompok" di uji Bab 7 diganti: yang ditolak hanya ajakan kerja kelompok (kerja kelompok, berkelompok, diskusi kelompok, kelompokmu, bersama kelompok), karena "mengelompokkan" dan "kelompok" adalah istilah isi sub-bab. Larangan tambahan: tanya teman, survei, karet gelang, uang tabungan, paman, Tika. Kata "coret" dihindari di suara (goresan kelima "miring, memotong empat goresan"), larangan lama tetap.
- Konsep selisih: "lebih banyak tiga dari ..." (tanpa kalimat pengurangan bersusun); selisih ditunjukkan dengan memasangkan satu-satu (garis pasangan, kelebihan disorot).

# Naskah singkat: Story Kelas 1 Bab 8 Sub-Bab B (Diagram Gambar)

Berkas: `src/components/modul/story/k1b8B-*.ts` (video, materi-1..4, luar-1, luar-2, gambar, bantu), `src/components/modul/video-k1b8b.tsx` (`VideoK1B8B`), `scripts/uji-story-k1b8B.mjs`, `.tmp-k1b8s/B.json`.
Ekspor: `VIDEO_MATERI_K1B8B` (id `k1b8B-materi`), `VIDEO_LUAR_K1B8B` (id `k1b8B-luar`).
Tokoh: Malosi, Kira, Upe, Wei, Halim, Igil. Semua data ada di layar (sayur, mainan, buah, hewan, bola warna); semua aksi siswa berupa aksi layar (hitung, ketuk pilihan, ucapkan lagi). Satu gambar = satu data; jumlah semua paling banyak 15.

## Video materi: 21 adegan, 103 ketukan, 1146 kata, sekitar 9,6 menit
sapaan (daftar: Membaca diagram gambar, Membuat tabel dan diagram, Membandingkan data diagram); data-tercampur (12 sayur tersebar lalu dikumpulkan rapi: jagung 3, wortel 4, brokoli 3, kol 2); satu-gambar (satu gambar jagung = satu anak, contoh salah); diagram-tegak (judul, sumbu angka, keterangan, kolom dihitung satu per satu); bagian-diagram (judul, nama kolom, gambar, angka, keterangan disorot satu per satu); baca-tegak (wortel empat, paling banyak wortel, paling sedikit kol); diagram-mendatar (data sama dengan tegak); turus (13 jawaban mainan di layar, goresan kelima miring: bola 6, mobil 4, boneka 3, jumlah 13); tabel-menurun (judul, baris, kolom, jumlah); tabel-mendatar (data sama); tabel-ke-diagram; paling-banyak (bola paling banyak, boneka paling sedikit); lebih-banyak (bola lebih banyak tiga dari boneka, selisih; mobil lebih banyak satu dari boneka); sama-banyak (apel 4, jeruk 4, pisang 2); jumlah-semua (6 + 4 = 10, 10 + 3 = 13, hitung 13 gambar satu per satu); pilihan-hewan (enam tokoh memilih hewan di layar, pengganti survei teman: kucing 3, kelinci 2, ikan 1, jumlah 6); diagram-hewan (diagram mendatar dari data tadi); latihan-satu (diagram tegak kue, donat empat); latihan-dua (diagram mendatar ternak, ayam paling sedikit, lebihnya dua); latihan-tiga (tabel bunga, jumlah semuanya dua belas); penutup.

## Video metode luar ("Tiga metode luar"): 9 adegan, 40 ketukan, 428 kata, sekitar 3,6 menit
Nama (Indonesia saja): Turus, Diagram Gambar, Banding Kategori. sapaan; luar-pembuka; luar-turus (15 bola warna: merah 7, biru 5, hijau 3); luar-turus-terapan (bola kuning 8, pilih jawaban); luar-diagram (data yang sama menjadi diagram mendatar, satu gambar = satu data); luar-diagram-terapan (hewan di taman: burung 4, kupu 2, lebah 3, pilih yang paling banyak); luar-banding (merah lebih banyak dua dari biru, biru lebih banyak dua dari hijau, merah lebih banyak empat dari hijau, jumlah 15); luar-banding-terapan (sapi 4, kuda 4, domba 2, pilih yang sama banyak); luar-ringkas.

## Peta (Mind-Map susun): pusat "Sayur apa paling disukai?", 3 cabang (3, 3, 2 anak), 11 simpul
Cabang 1 = daftar sapaan persis (Membaca diagram gambar; Membuat tabel dan diagram; Membandingkan data diagram); cabang 2 langkah (Hitung gambar tiap kolom; Turus, tabel, lalu gambar; Bandingkan tinggi kolom); cabang 3 hasil (Data terbaca dengan mudah; Sayur terbanyak diketahui). Teks paling panjang 26 huruf (Membandingkan data diagram), pusat 25 huruf, suara dan petunjuk tanpa digit.

## Tabel (Infografis susun): 4 baris x 3 kolom
Pojok "Buah", kolom Turus, Gambar, Angka; baris Apel (||||/, 5 gambar, 5), Jeruk (||||, 4 gambar, 4), Pisang (|||, 3 gambar, 3), Mangga (||, 2 gambar, 2); jumlah 14. Sel paling panjang 8 huruf, satu angka per sel; turus, gambar, dan angka tiap baris dihitung ulang oleh uji.

## Uji hitung ulang (scripts/uji-story-k1b8B.mjs)
Dari gambar: tiap diagram (gambar bernomor berurutan, satu jenis, satu karakter, rapat dari garis dasar, searah, angka sumbu 1..M sejajar gambar, angka banyak, keterangan "1 gambar = 1 ..."), tiap turus (goresan berurutan, kelima miring menutup empat tegak, angka banyak), tiap tabel (banyak per baris, jumlah semua); data identik pada semua kelompok yang terlihat bersamaan; tiap kalimat suara ("jagung ada tiga", "paling banyak/sedikit" benar-benar maksimum/minimum tanpa kembar, "lebih banyak tiga dari", "sama banyak", "jumlah semuanya tiga belas") dan teks gambar (persamaan, selisih, jumlah) dicocokkan dengan data; jawaban latihan; data lintas adegan (turus = tabel menurun = tabel mendatar = diagram). Sudah diuji dengan mutasi (salah satu kalimat diubah, uji gagal).

## Temuan data (kelas1-bab8.json subBabs.B)
- targetDescription memuat kalimat "Memakai Turus, Diagram Gambar, Banding Kategori." dua kali; nama metode ganda Inggris (Tally Marks, Pictograph, Compare Categories) di judul langkah mindMaps, countWord infografis, dan mechanicDescription tidak dipakai; hanya namaId.
- Pernyataan ringkas metode "Gambar mewakili banyak data" bertentangan dengan inti sub-bab (satu gambar mewakili satu data); diganti "satu gambar mewakili satu data" di video, dan uji melarang frasa "mewakili banyak data".
- mindMap janggal: langkah 2 sampai 5 berjudul Inggris, langkah 4 dan 5 kembar (Compare Categories), langkah 6 mengalir ke "7", langkah 7 hanya berjudul "7." dengan ikon 🌍 dan isi kembar; langkah 1 menyuruh "tanya temanmu". Tidak dipakai.
- Survei teman diganti data di layar: S1 (Upe menanyakan sayur kesukaan teman-temannya), S4 (Tika bertanya mainan kesukaan teman), game 1 "Survei Sayur Kesukaan" (ketuk teman), concrete slide "Survei Sayur Kesukaan", Ayo Berkarya bertanya kepada teman. Diganti enam tokoh tetap yang memilih hewan di layar (kucing 3, kelinci 2, ikan 1).
- Benda fisik dan uang diganti aksi layar: S5 karet gelang (Malosi 5, Halim 3, Upe 4), S6 uang tabungan (mewarnai lingkaran), game 10 ronde 2 (siswa memilih berapa kali ia menabung), "guratkan angkanya di kanvas", "Buku Siswa hlm.". Diganti bola, mainan, buah, hewan bergambar di layar; data 5, 3, 4 tidak dipakai.
- Nama di luar enam tokoh tetap: Tika (S4), Pak Budi (Kandang Pak Budi, game 4). Tidak dipakai; kandang plus-minus diganti diagram hewan.
- abstractSlides memuat kalimat pengurangan "5 – 3 = 2" dan "5 + 3 + 4 = 12"; kalimat pengurangan bersusun tidak dipakai (selisih dinyatakan "lebih banyak tiga dari"); penjumlahan dipakai hanya untuk jumlah semua data, hasil paling banyak 15.
- Data sumber memakai bilangan sampai 19 (numberA slide gambar); semua data video dibatasi jumlah semua paling banyak 15.
- "Turus" dan "Diagram Gambar" adalah nama metode luar sekaligus istilah isi sub-bab, jadi video materi memakainya. Uji materi melarang hanya nama "Banding Kategori" dan frasa "metode luar" (bukan nama Turus dan Diagram Gambar, tidak seperti Bab 7); kata "coretan" dari data diganti "goresan" (uji melarang "coret").
- Istilah isi yang diperbolehkan: paling banyak, paling sedikit, lebih banyak, lebih sedikit, sama banyak, selisih, jumlah semuanya, turus, tabel, diagram gambar, baris, kolom.
- Nama berkas pembungkus: video-k1b8b.tsx (huruf kecil, sesuai registri); berkas story memakai k1b8B-*.
