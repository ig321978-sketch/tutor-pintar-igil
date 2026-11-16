# Rancangan Fresh: Matematika Kelas 1 Bab 2 (Penjumlahan sampai 10)

Status akhir: **sudah dikerjakan sebagai 10 materi dalam 3 Sub-Bab** (A: materi 1 sampai 3, B: 4 sampai 8, C: 9 dan 10), ditambah daftar materi, ulangan harian, dan laporan. Istilah "pelabuhan" dan "Pasar Terapung" di dokumen ini hanya nama kerja awal; di layar dipakai Sub-Bab dan Materi. Peta berkas ada di memori proyek `modul-k1b2-opsi2`. Isi dokumen di bawah adalah rancangan awal (9 skill) dan sebagian sudah berubah.

Status awal: **draf menunggu persetujuan pemilik**. Tidak memakai mesin, katalog, atau pola Opsi 2 K1B1. Acuan kurikulum hanya CP/ATP (jumlah paling banyak 10). Isi buku hanya penanda topik. Prinsip: `docs/blueprint-modul.md`.

## 1. Gagasan baru: "Pasar Terapung"
Alih-alih tahap berurutan yang dikerjakan satu-satu, siswa menjalankan **sebuah perahu dagang** di sungai. Setiap pelajaran penjumlahan adalah satu **pelabuhan** di peta. Satu pelabuhan = satu keterampilan (skill) = satu putaran belajar 5 sampai 8 menit.

Tokoh tetap (aturan IGIL): Lintang, Niko, Tala, Igil. Tanpa teman, kelompok, kelas, buku. Narasi tanpa digit.

## 2. Alur satu pelabuhan (satu skill)
1. **Cerita pendek** (satu adegan, bukan video lima menit): masalah kecil muncul, cerita berhenti, siswa **menebak dulu**.
2. **Eksplorasi**: manipulatif bebas (tanpa skor), satu misi kecil.
3. **Contoh dikerjakan** oleh Igil penuh, lalu **contoh setengah** (siswa mengisi langkah terakhir), lalu **mandiri**. Tahap benda, diagram, lalu lambang berjalan di dalam satu alur ini, bukan tiga layar terpisah.
4. **Cek penguasaan** (lihat bagian 4).
5. **Peta mini** dan **kartu ringkas** (infografis) muncul sebagai hasil, bukan pembuka: siswa melengkapi peta dengan menyeret label dari ingatan.

## 3. Daftar skill (usulan, 9 pelabuhan)
| Kode | Skill | Rentang |
|---|---|---|
| s1 | Menggabungkan dua kelompok | jumlah ≤ 10 |
| s2 | Bertambah (datang lagi) | ≤ 10 |
| s3 | Membaca dan menulis kalimat penjumlahan | ≤ 10 |
| s4 | Pasangan bilangan (bagan gabungan-sebagian) | ≤ 10 |
| s5 | Tukar tempat, hasil tetap | ≤ 10 |
| s6 | Menghitung maju di garis bilangan | tambah 1, 2, 3 |
| s7 | Penjumlahan berulang (kembar) | 1+1 sampai 5+5 |
| s8 | Pasangan yang hasilnya sepuluh | 1+9 sampai 9+1 |
| s9 | Soal cerita (pahami, rencanakan, kerjakan, periksa) | ≤ 10 |

Prasyarat: s1 → s3; s3 → s4, s6, s7, s8; s4 → s5; semua → s9.

## 4. Penguasaan, tanpa menabrak aturan IGIL
Aturan pemilik: **tahap belajar tidak memberi skor, nilai, atau catatan benar-salah.** Maka:
- **Mode belajar**: tidak ada skor tersimpan. Mesin hanya memakai jawaban terakhir di sesi itu untuk memilih bantuan (petunjuk, contoh ulang, kembali ke benda). Tidak ada nyawa, timer, atau hukuman.
- **Penguasaan resmi** lahir hanya dari **cek pelabuhan**: 5 soal berparameter, tanpa petunjuk, lulus bila 4 dari 5 benar. Hanya hasil cek ini (bukan latihan) yang disimpan sebagai status skill.
- **Mode ujian** (nanti, Tahap 6): satu-satunya sumber ranking.
- Usulan keputusan: **4 dari 5**, bukan persen, karena set 5 soal lebih jelas bagi anak kelas 1. (Perlu persetujuan Anda.)

## 5. Miskonsepsi (diagnosis)
Tiap pengecoh dipetakan ke satu kode, misalnya:
- `m-hitung-dobel`: menghitung benda yang sama dua kali.
- `m-lompat-nol`: mulai garis bilangan dihitung sebagai satu lompatan.
- `m-ambil-satu`: hasil sama dengan bilangan pertama (lupa menggabung).
- `m-tanda-tukar`: `+` dibaca sebagai `=`.
- `m-sepuluh-geser`: pasangan sepuluh salah satu angka (mis. 6+3).
Umpan balik dan bantuan dipilih dari kode ini.

## 6. Pengulangan berjarak
Skill yang lulus dijadwalkan ulang 1, 3, 7, 14, 30 hari. Salah pada ulangan: kembali ke kotak 0. Soal ulangan selalu dari generator berparameter (angka baru).

## 7. Hal yang sengaja berbeda dari K1B1
Satu alur menyatu (bukan 7 tahap terpisah). Cerita pendek berhenti-menebak. Peta dan infografis jadi hasil. Penguasaan per skill. Dunia dan alur baru.
Tetap: tokoh, aturan tanpa digit di narasi, orisinalitas, status `draf-perlu-review`, uji kunci jawaban.

## 8. Yang perlu disetujui
1. Konsep Pasar Terapung (peta pelabuhan) menggantikan Pasar Pagi di Kitab Dunia?
2. Daftar 9 skill di atas.
3. Ambang 4 dari 5 hanya pada cek pelabuhan.
4. Boleh membuat pustaka baru `src/lib/belajar/` terpisah dari `src/lib/opsi2/`?
