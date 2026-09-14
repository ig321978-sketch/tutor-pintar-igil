import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_MTK1_BAB6 = "Bab 6: Nilai Tempat (Puluhan dan Satuan)";

export const MODUL_MTK1_BAB6: ModulResmiPai = {
  id: "mtk-1-bab6",
  judul: JUDUL_MTK1_BAB6,
  pola: /nilai\s+tempat|puluhan\s+dan\s+satuan/,
  motivasi:
    "Angka punya rumah! Puluhan di rumah kiri, satuan di rumah kanan. Satu ikat isinya 10.",
  kunciJawaban: "B,A,C,B,D,A,C,B,A,B",
  sketsaKartu: [
    "Ali dan Nia mengikat stik es krim setiap 10 batang menjadi satu ikat puluhan.",
    "Dua rumah angka: rumah puluhan berisi satu ikat 10 dan rumah satuan berisi 4 stik.",
    "Guru mengikat sedotan, orang tua menaruh sendok di wadah puluhan.",
    "Anak mencocokkan 1 puluhan 7 satuan dengan angka 17 pada lembar evaluasi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: Reguler]
Ali punya 1 ikat (10 stik) dan sisa 4 stik. Total stiknya...
A) 10
B) 14
C) 41
D) 4`,
    `[Soal 2 - PG - Tipe: Reguler]
Setiap 10 benda yang diikat disebut...
A) 1 Puluhan
B) 1 Satuan
C) 10 Puluhan
D) 2 Puluhan`,
    `[Soal 3 - PG - Tipe: Reguler]
Sisa benda yang belum mencapai 10 disebut...
A) Puluhan
B) Ikat
C) Satuan
D) Rumah`,
    `[Soal 4 - PG - Tipe: Reguler]
Angka 13 terdiri dari...
A) 3 puluhan dan 1 satuan
B) 1 puluhan dan 3 satuan
C) 13 puluhan
D) 10 satuan saja`,
    `[Soal 5 - PG - Tipe: Reguler]
Angka 20 terdiri dari...
A) 2 satuan
B) 20 puluhan
C) 1 puluhan dan 10 satuan
D) 2 puluhan dan 0 satuan`,
    `[Soal 6 - PG - Tipe: Reguler]
Pada angka dua digit, tempat puluhan berada di...
A) Sebelah kiri
B) Sebelah kanan
C) Tengah
D) Bawah`,
    `[Soal 7 - PG - Tipe: Reguler]
1 puluhan dan 7 satuan sama dengan...
A) 71
B) 10
C) 17
D) 7`,
    `[Soal 8 - PG - Tipe: Reguler]
Angka 15 terdiri dari...
A) 5 puluhan dan 1 satuan
B) 1 puluhan dan 5 satuan
C) 15 satuan saja
D) 2 puluhan`,
    `[Soal 9 - PG - Tipe: HOTS]
Angka 2 pada bilangan 20 menempati nilai tempat...
A) Puluhan
B) Satuan
C) Ratusan
D) Ikat satuan`,
    `[Soal 10 - PG - Tipe: HOTS]
Manakah yang menunjukkan nilai dari angka 17?
A) 7 puluhan dan 1 satuan
B) 1 puluhan dan 7 satuan
C) 10 puluhan dan 7 satuan
D) 17 puluhan`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Meja Belajar",
      pengantar:
        "Di meja belajar kelas, Ali dan Nia sedang bermain stik es krim. Stiknya banyak dan berantakan, lalu Nia punya ide mengikat setiap 10 stik.",
      labelDaftar: "Percakapan Ali dan Nia",
      kolom: 1,
      item: [
        {
          nama: "Ikat puluhan",
          singkat: "Setiap 10 stik",
          uraian:
            "Nia mengusulkan: setiap 10 stik diikat menjadi satu ikat besar. Guru bilang, satu ikat itu namanya 1 Puluhan.",
          contoh: "1 ikat = 10 stik = 1 puluhan.",
        },
        {
          nama: "Sisa satuan",
          singkat: "4 stik tidak diikat",
          uraian:
            "Ali punya 1 ikat dan sisa 4 stik yang tidak diikat. Itu 1 puluhan dan 4 satuan. Totalnya 14 stik. Mengelompokkan angka seperti memberi mereka rumah.",
          contoh: "1 puluhan + 4 satuan = 14.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Satu ikat stik isinya berapa?",
          alias: ["sepuluh", "10", "sepuluh stik"],
        },
        {
          pertanyaan: "2. Satu ikat isi 10 disebut apa?",
          alias: ["puluhan", "satu puluhan", "1 puluhan"],
        },
        {
          pertanyaan: "3. 1 puluhan dan 4 satuan sama dengan angka berapa?",
          alias: ["empat belas", "14"],
        },
      ],
      voice: [
        [
          "Anak-anak, kita di meja belajar. Ali dan Nia bermain stik es krim.",
          "Ali berkata, Nia, aku punya banyak sekali stik es krim. Susah menghitungnya kalau berantakan seperti ini.",
          "Nia menjawab, aku punya ide! Bagaimana kalau setiap 10 stik, kita ikat menjadi satu ikat besar? Guru bilang, satu ikat itu namanya 1 Puluhan!",
        ],
        [
          "Ali berkata, wah, ide bagus! Aku punya 1 ikat, 10 stik, dan sisa 4 stik yang tidak diikat. Berarti 1 puluhan dan 4 satuan.",
          "Nia berkata, benar, Ali! Jadi totalnya ada 14 stik! Ternyata mengelompokkan angka itu seperti memberi mereka rumah ya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Infografis Rumah Angka",
      pengantar:
        "Angka dua digit punya dua rumah. Rumah kiri untuk puluhan, rumah kanan untuk satuan. Ketuk angka, lalu lihat ikat puluhan dan stik satuannya.",
      labelDaftar: "Nilai tempat 11 sampai 20",
      kolom: 1,
      item: [
        {
          nama: "Konsep dasar",
          singkat: "Kelompok 10",
          uraian:
            "Ketika menghitung benda yang banyak, kita mengelompokkannya setiap 10 benda menjadi 1 Puluhan. Sisa benda yang tidak mencapai 10 disebut Satuan.",
          contoh: "14 = 1 puluhan dan 4 satuan.",
        },
        {
          nama: "Struktur angka",
          singkat: "Kiri puluhan, kanan satuan",
          uraian:
            "Angka dua digit 11 sampai 20 selalu terdiri dari tempat puluhan di sebelah kiri dan tempat satuan di sebelah kanan. 13 sama dengan 10 tambah 3. 20 sama dengan 20 tambah 0.",
          contoh: "13 = 1 puluhan dan 3 satuan. 20 = 2 puluhan dan 0 satuan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Rumah kiri pada angka dua digit untuk apa?",
          alias: ["puluhan", "rumah puluhan"],
        },
        {
          pertanyaan: "2. Angka 13 terdiri dari berapa satuan?",
          alias: ["tiga", "3", "tiga satuan"],
        },
        {
          pertanyaan: "3. Angka 20 terdiri dari berapa puluhan?",
          alias: ["dua", "2", "dua puluhan"],
        },
      ],
      voice: [
        [
          "Anak-anak, selamat datang di infografis Rumah Angka. Lihat angka 14. Rumah puluhan berisi satu ikat isi 10. Rumah satuan berisi 4 stik.",
          "Jadi 14 adalah 1 puluhan dan 4 satuan. Nilainya 10 tambah 4.",
        ],
        [
          "Ingat: 13 sama dengan 10 tambah 3, yaitu 1 puluhan dan 3 satuan. 20 sama dengan 2 puluhan dan 0 satuan. Puluhan di kiri, satuan di kanan.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Ikat Sedotan dan Wadah Sendok",
      pengantar:
        "Nilai tempat makin kuat kalau dipraktikkan dengan benda nyata. Di sekolah kita mengikat sedotan. Di rumah kita menaruh sendok di wadah.",
      labelDaftar: "Dua Tempat Berlatih",
      kolom: 2,
      item: [
        {
          nama: "Ikat Sedotan Puluhan",
          singkat: "Untuk guru",
          uraian:
            "Siapkan sedotan dan karet gelang. Minta anak menghitung 10 sedotan lalu mengikatnya sebagai Puluhan. Sisa sedotan yang tidak diikat disebut Satuan. Tunjuk siswa menyebutkan nilai tempat dari angka yang diminta.",
          contoh: "10 sedotan diikat = 1 puluhan.",
        },
        {
          nama: "Wadah Sendok",
          singkat: "Untuk orang tua",
          uraian:
            "Gunakan sendok di rumah. Kumpulkan 10 sendok dalam satu wadah sebagai puluhan, lalu taruh sisanya di luar wadah sebagai satuan untuk melatih konsep nilai tempat.",
          contoh: "10 sendok di wadah, 4 di luar = 14.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di sekolah, 10 sedotan yang diikat disebut apa?",
          alias: ["puluhan", "satu puluhan", "1 puluhan"],
        },
        {
          pertanyaan: "2. Sedotan sisa yang tidak diikat disebut apa?",
          alias: ["satuan"],
        },
        {
          pertanyaan: "3. Di rumah, 10 sendok di wadah disebut apa?",
          alias: ["puluhan", "satu puluhan", "1 puluhan"],
        },
      ],
      voice: [
        [
          "Di sekolah, siapkan sedotan dan karet gelang. Hitung 10 sedotan, ikat sebagai puluhan. Sisa sedotan yang tidak diikat disebut satuan. Sebutkan nilai tempat dari angka yang diminta guru.",
        ],
        [
          "Di rumah, kumpulkan 10 sendok dalam satu wadah. Itu puluhan. Taruh sisa sendok di luar wadah. Itu satuan. Latih nilai tempat bersama ayah atau ibu.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menunjukkan kemampuan membaca nilai tempat. Cocokkan puluhan dan satuan, isi kotak, tentukan benar atau salah, lalu pilih pernyataan yang tepat.",
      labelDaftar: "Empat Jenis Soal",
      kolom: 1,
      item: [
        {
          nama: "Hubungkan garis",
          singkat: "Mencocokkan",
          uraian:
            "Cocokkan 1 puluhan 7 satuan dengan 17, 1 puluhan 2 satuan dengan 12, dan 2 puluhan 0 satuan dengan 20.",
          contoh: "1 puluhan 7 satuan = 17.",
        },
        {
          nama: "Mengurai nilai tempat",
          singkat: "Isian",
          uraian:
            "Urai 15 dan 18 menjadi puluhan serta satuan. Gabungkan 1 puluhan dan 9 satuan menjadi lambang bilangan.",
          contoh: "15 = 1 puluhan dan 5 satuan. 1 + 9 satuan = 19.",
        },
        {
          nama: "Benar atau salah dan pilihan",
          singkat: "B/S dan PG",
          uraian:
            "Angka 2 pada 20 menempati puluhan, bukan satuan. Angka 12 adalah 1 puluhan dan 2 satuan. Nilai 17 adalah 1 puluhan dan 7 satuan.",
          contoh: "17 = 1 puluhan dan 7 satuan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. 1 puluhan dan 7 satuan sama dengan angka berapa?",
          alias: ["17", "tujuh belas"],
        },
        {
          pertanyaan: "2. 1 puluhan dan 2 satuan sama dengan angka berapa?",
          alias: ["12", "dua belas"],
        },
        {
          pertanyaan: "3. 2 puluhan dan 0 satuan sama dengan angka berapa?",
          alias: ["20", "dua puluh"],
        },
        {
          pertanyaan: "4. Angka 15 terdiri dari berapa puluhan?",
          alias: ["satu", "1", "satu puluhan"],
        },
        {
          pertanyaan: "5. Angka 18 terdiri dari berapa satuan?",
          alias: ["delapan", "8", "delapan satuan"],
        },
        {
          pertanyaan: "6. 1 puluhan ditambah 9 satuan lambang bilangannya berapa?",
          alias: ["19", "sembilan belas"],
        },
        {
          pertanyaan: "7. Benarkah angka 2 pada 20 menempati nilai tempat satuan?",
          alias: ["salah", "tidak", "s"],
        },
        {
          pertanyaan: "8. Benarkah 12 memiliki 1 puluhan dan 2 satuan?",
          alias: ["benar", "ya", "b"],
        },
        {
          pertanyaan: "9. Nilai dari angka 17 adalah apa?",
          alias: [
            "1 puluhan dan 7 satuan",
            "satu puluhan dan tujuh satuan",
            "b",
          ],
        },
        {
          pertanyaan: "10. Angka 13 terdiri dari berapa puluhan dan berapa satuan?",
          alias: [
            "1 puluhan dan 3 satuan",
            "satu puluhan dan tiga satuan",
            "1 dan 3",
          ],
        },
      ],
      voice: [
        [
          "Anak-anak, ini lembar evaluasi Bab 6. Cocokkan puluhan dan satuan dengan angkanya. Urai 15 dan 18. Gabungkan 1 puluhan dan 9 satuan.",
        ],
        [
          "Angka 2 pada 20 menempati puluhan, bukan satuan. Angka 12 adalah 1 puluhan dan 2 satuan. Nilai 17 adalah 1 puluhan dan 7 satuan. Semangat!",
        ],
      ],
    },
  ],
};
