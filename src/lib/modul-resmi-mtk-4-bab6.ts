import type { ModulResmiPai } from "@/lib/modul-resmi-pai";
import { kuisDariMisi } from "@/lib/misi-kebun-mtk-1";
import { MISI_MTK4_BAB6 } from "@/lib/misi-mtk-4-bab6";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK4_BAB6 = "Bab 6: Piktogram dan Diagram Batang";

export const MODUL_MTK4_BAB6: ModulResmiPai = {
  id: "mtk-4-bab6",
  judul: JUDUL_MTK4_BAB6,
  pola: /^bab 6: piktogram dan diagram batang$/,
  motivasi:
    "Nisa, Farhan, dan Cinta menghitung mangga terjual bersama burung hantu Igil di lapak mangga.",
  kunciJawaban: "C,B,C,D,A,C,B,B,A,C",
  sketsaKartu: [
    "Nisa, Farhan, dan Cinta menyusun gambar mangga dan batang bersama Igil.",
    "Piktogram dengan kunci, lalu diagram batang tegak.",
    "Sepuluh pos di lapak mangga.",
    "Poin penting dan lembar evaluasi piktogram dan diagram batang.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: MOTS]
Di kelas ada 8 hiasan dinding, 2 papan tulis, 1 jam dinding, dan 1 lemari. Yang paling banyak...
A) Jam dinding
B) Lemari
C) Hiasan dinding
D) Papan tulis`,
    `[Soal 2 - PG - Tipe: MOTS]
Mainan Karel: 6 mobil, 4 robot, 3 pesawat, 1 puzzle, dan 9 kelereng. Yang paling banyak...
A) Mobil
B) Kelereng
C) Robot
D) Puzzle`,
    `[Soal 3 - PG - Tipe: MOTS]
Satu gambar = 4 siswa. Kelas IV ada 8 gambar. Banyak siswa...
A) 8
B) 12
C) 32
D) 4`,
    `[Soal 4 - PG - Tipe: MOTS]
Mawar 5, kertas 9, sepatu 4, matahari 3. Bunga yang paling banyak...
A) Mawar
B) Sepatu
C) Matahari
D) Kertas`,
    `[Soal 5 - PG - Tipe: MOTS]
Sabtu 14 buku. Selasa 6 buku. Selisihnya...
A) 8
B) 20
C) 14
D) 6`,
    `[Soal 6 - PG - Tipe: MOTS]
Buku di meja guru ada 4. Satu gambar = 1 buku. Banyak gambar yang dibuat...
A) 8
B) 2
C) 4
D) 1`,
    `[Soal 7 - PG - Tipe: HOTS]
Satu gambar = 4 siswa. Ada 6 gambar. Banyak siswa...
A) 10
B) 24
C) 6
D) 4`,
    `[Soal 8 - PG - Tipe: MOTS]
Lomba IPA diikuti 6 siswa. Pengetahuan Umum juga 6 siswa. Pernyataan yang benar...
A) IPA lebih banyak
B) Keduanya sama banyak
C) Selisihnya 6
D) Tidak ada data`,
    `[Soal 9 - PG - Tipe: HOTS]
Catur diikuti 5 siswa. Renang diikuti 2 siswa. Selisihnya...
A) 3
B) 7
C) 5
D) 2`,
    `[Soal 10 - PG - Tipe: HOTS]
Meja guru: buku 4, taplak 1, spidol 3, penghapus 1, pulpen 2. Berapa kategori yang paling sedikit?
A) 1
B) 4
C) 2
D) 3`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Naskah Bergambar",
      pengantar: "Nisa, Farhan, Cinta, dan Igil mencatat mangga di lapak.",
      labelDaftar: "Empat adegan lapak mangga",
      kolom: 1,
      item: [
        { nama: "Gambar satu-satu", singkat: "Hitung gambar", uraian: "Hiasan dinding 8, jam dinding 1, lemari 1. Kelereng Karel 9. Jumlah mainan Karel 23.", contoh: "Gambar dalam satu baris harus sama." },
        { nama: "Baca kunci", singkat: "Satu atau empat", uraian: "Warna kesukaan: ungu 4, kuning 2, hitam 1, merah 5. Jumlah 12. Kelas IV: 8 gambar × 4 = 32 siswa.", contoh: "Piktogram disebut juga diagram gambar." },
        { nama: "Batang tegak", singkat: "Lebih tinggi", uraian: "Sepak bola 9 siswa. Catur 2. Lomba matematika 15. Puisi 3. IPA dan Pengetahuan Umum sama-sama 6.", contoh: "Sumbu angka wajib ada." },
        { nama: "Batang mendatar", singkat: "Lebih panjang", uraian: "Bunga kertas 9, matahari 3, melati 8. Kertas + anggrek = 16. Sepeda motor 14 siswa.", contoh: "Data yang sama bisa jadi gambar atau batang." },
      ],
      kuis: [
        { pertanyaan: "Hiasan dinding ada berapa?", alias: ["8"] },
        { pertanyaan: "Kelereng Karel ada berapa?", alias: ["9"] },
        { pertanyaan: "Ungu, kuning, hitam, dan merah. Jumlah siswanya?", alias: ["12"] },
        { pertanyaan: "8 gambar × 4 siswa. Kelas IV ada berapa siswa?", alias: ["32"] },
        { pertanyaan: "Sepak bola diikuti berapa siswa?", alias: ["9"] },
        { pertanyaan: "Lomba matematika diikuti berapa siswa?", alias: ["15"] },
        { pertanyaan: "Renang diikuti berapa siswa?", alias: ["2"] },
        { pertanyaan: "Bunga kertas 9 dan anggrek 7. Jumlahnya?", alias: ["16"] },
        { pertanyaan: "Piktogram juga disebut...", alias: ["diagram gambar"] },
        { pertanyaan: "Pasangkan benda dengan banyaknya.", alias: ["8", "9", "1"] },
        { pertanyaan: "Susun bunga dari yang paling sedikit.", alias: ["3", "4", "5", "9"] },
        { pertanyaan: "Periksa tiga pernyataan data.", alias: ["benar", "salah"] },
        { pertanyaan: "6 gambar, kunci 4. Banyak siswa?", alias: ["24"] },
      ],
      voice: [[
        "Hari ini kita menyajikan data dengan gambar dan batang.",
        "Piktogram memakai gambar dan kunci. Diagram batang memakai persegi panjang.",
        "Baca kuncinya dulu. Lalu cari yang paling banyak, yang paling sedikit, atau jumlahnya.",
      ]],
    },
    {
      kode: "B",
      judul: "B. Latihan di dalam sub-bab",
      pengantar: "Peta dan latihan tiap bagian ada di dalam materi data.",
      labelDaftar: "Latihan di dalam gambar dan batang",
      kolom: 1,
      item: [
        { nama: "Peta gambar", singkat: "Gambar sama", uraian: "Hiasan dinding 8. Jam dinding dan lemari sama-sama 1. Kelereng Karel 9.", contoh: "Gambar dalam satu baris harus sama." },
        { nama: "Peta kunci", singkat: "Kali dengan kunci", uraian: "Warna kesukaan berjumlah 12. Kelas IV 8 × 4 = 32. Kelas I dan II masing-masing 24.", contoh: "Piktogram adalah diagram gambar." },
        { nama: "Peta tegak", singkat: "Lebih tinggi", uraian: "Sepak bola 9. Matematika 15. Puisi 3. IPA dan Pengetahuan Umum sama-sama 6.", contoh: "Sumbu angka wajib ada." },
        { nama: "Peta mendatar", singkat: "Lebih panjang", uraian: "Kertas 9, matahari 3. Motor 14, mobil 3. Renang 2, menyanyi paling banyak.", contoh: "Satu data boleh disajikan dengan tiga cara." },
      ],
      kuis: [
        { pertanyaan: "Alat ke sekolah yang paling banyak adalah...", alias: ["sepeda motor"] },
        { pertanyaan: "Pasangkan hari dengan banyak bukunya.", alias: ["14", "3", "6"] },
        { pertanyaan: "Susun benda meja dari yang paling sedikit.", alias: ["1", "2", "3", "4"] },
        { pertanyaan: "Periksa tiga pernyataan batang.", alias: ["benar", "salah"] },
        { pertanyaan: "Catur 5 dan renang 2. Jumlahnya?", alias: ["7"] },
      ],
      voice: [[
        "Peta data ada di dalam materi, pada tiap bagian.",
        "Gambar dibaca dari kuncinya. Batang tegak dibaca dari tingginya. Batang mendatar dibaca dari panjangnya.",
      ]],
    },
    {
      kode: "C",
      judul: "C. Pos Lapak Mangga",
      pengantar: "Sepuluh soal piktogram dan diagram batang. Selesai sepuluh pos, mangga terkumpul sepuluh.",
      labelDaftar: "Sepuluh pos mangga",
      kolom: 1,
      item: [
        {
          nama: "Pos data",
          singkat: "Gambar dan batang",
          uraian: "Kunci gambar, ujung batang, dan selisih.",
          contoh: "Dua soal suara dan dua soal tulis.",
        },
      ],
      kuis: kuisDariMisi(MISI_MTK4_BAB6),
      voice: [[
        "Igil menjaga sepuluh pos di lapak mangga.",
        "Ada piktogram dan diagram batang. Dua pos dijawab dengan suara, dua pos ditulis.",
      ]],
    },
    {
      kode: "D",
      judul: "E. Lembar Evaluasi Siswa",
      pengantar: "Sepuluh soal menyajikan dan membaca data.",
      labelDaftar: "Lembar evaluasi mangga",
      kolom: 1,
      item: [
        {
          nama: "Catatan lapak",
          singkat: "Baca lalu bandingkan",
          uraian: "Lomba matematika 15 siswa. Sabtu 14 buku. Kertas dan anggrek 16. Enam gambar kali 4 sama dengan 24 siswa.",
          contoh: "Data yang sama tinggi berarti sama banyak.",
        },
      ],
      kuis: [
        { pertanyaan: "Lomba matematika diikuti berapa siswa?", alias: ["15"] },
        { pertanyaan: "Bunga yang paling sedikit?", alias: ["matahari"] },
        { pertanyaan: "Sabtu ada berapa buku?", alias: ["14"] },
        { pertanyaan: "Piktogram juga disebut...", alias: ["diagram gambar"] },
        { pertanyaan: "Pasangkan benda dengan banyaknya.", alias: ["9", "8", "1"] },
        { pertanyaan: "Kertas 9 dan anggrek 7. Jumlahnya?", alias: ["16"] },
        { pertanyaan: "Batang mendatar yang lebih panjang berarti...", alias: ["lebih banyak"] },
        { pertanyaan: "Meja guru: berapa kategori yang paling sedikit?", alias: ["2"] },
        { pertanyaan: "6 gambar, kunci 4. Banyak siswa?", alias: ["24"] },
        { pertanyaan: "Siswa kelas IV yang berangkat sekolah ada berapa?", alias: ["30"] },
      ],
      voice: [[
        "Sepuluh soal data. Baca kuncinya dulu, atau lihat ujung batangnya.",
        "Piktogram memakai gambar. Diagram batang memakai persegi panjang.",
      ]],
    },
  ],
};
