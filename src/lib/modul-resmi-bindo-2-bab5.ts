import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO2_BAB5 = "Bab 5: Berteman dalam Keragaman";

export const MODUL_BINDO2_BAB5: ModulResmiPai = {
  id: "bindo-2-bab5",
  judul: JUDUL_BINDO2_BAB5,
  pola: /berteman dalam keragaman|subjek dan predikat|dua pilar utama kalimat/,
  motivasi:
    "Kalimat minimal = subjek + predikat. Subjek siapa pelakunya, predikat apa yang dikerjakan atau keadaannya. Kalimat berita ditutup titik. Berteman itu saling menolong.",
  kunciJawaban: "B,C,S,B,B,A,C,B,A,B",
  sketsaKartu: [
    "Anak memisahkan subjek Made dan predikat menari.",
    "Anak menulis kalimat berita berteman lalu menutupnya dengan titik.",
    "Anak mengerjakan evaluasi subjek-predikat dan tanda titik.",
    "Anak menarik garis S-P, menggeser keranjang, mengurutkan Nia-Made, dan menulis subjek di kanvas.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Kelinci melompat gembira. Kata yang menjadi subjek adalah...
A) Melompat
B) Kelinci
C) Gembira
D) Titik`,
    `[Soal 2 - PG - Tipe: HOTS]
Ali menulis cerita. Predikat kalimat itu adalah...
A) Ali
B) Cerita
C) Menulis
D) Titik tanya`,
    `[Soal 3 - PG - Tipe: HOTS]
Kalimat berita wajib diakhiri tanda tanya. Pernyataan ini...
A) Benar.
B) Salah; kalimat berita diakhiri tanda titik.
C) Benar hanya di puisi.
D) Tanda tanya untuk semua kalimat.`,
    `[Soal 4 - PG - Tipe: HOTS]
Kata tidur dan sedih bisa menjadi predikat. Pernyataan ini...
A) Salah.
B) Benar; predikat bisa tindakan atau keadaan.
C) Benar hanya untuk tidur.
D) Predikat hanya nama orang.`,
    `[Soal 5 - PG - Tipe: Reguler]
Rumus kalimat minimal adalah...
A) Tanda tanya saja.
B) Subjek + predikat.
C) Hanya predikat.
D) Hanya subjek.`,
    `[Soal 6 - PG - Tipe: Reguler]
Nia membaca. Subjeknya adalah...
A) Nia
B) Membaca
C) Titik
D) Buku`,
    `[Soal 7 - PG - Tipe: Reguler]
Kalimat "Made menari." memakai tanda...
A) Tanya
B) Koma saja
C) Titik
D) Seru wajib`,
    `[Soal 8 - PG - Tipe: Reguler]
Melompat, memasak, dan menulis biasanya menjadi...
A) Subjek
B) Predikat
C) Tanda titik
D) Nama tempat`,
    `[Soal 9 - PG - Tipe: HOTS]
Nia meminjamkan penghapus kepada Made. Kalimat itu penting untuk berteman karena...
A) Menunjukkan tindakan menolong dengan subjek dan predikat yang jelas.
B) Supaya kita marah.
C) Supaya tidak ada predikat.
D) Supaya tanda tanya hilang.`,
    `[Soal 10 - PG - Tipe: Reguler]
Tokoh atau pelaku dalam kalimat disebut...
A) Predikat
B) Subjek
C) Opini
D) Bait`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Fondasi Kalimat",
      pengantar:
        "Infografis dua pilar: subjek siapa pelakunya, predikat apa yang dikerjakan. Kalimat minimal = S + P. Contoh: Nia membaca.",
      labelDaftar: "Subjek, predikat, dan rumus minimal",
      kolom: 1,
      item: [
        {
          nama: "Subjek (S)",
          singkat: "Siapa pelakunya",
          uraian:
            "Subjek adalah tokoh atau siapa yang melakukan perbuatan. Bisa nama orang, hewan, atau benda: Ali, Nia, Made, kucing, kelinci.",
          contoh: "Kelinci melompat. Subjek = Kelinci.",
        },
        {
          nama: "Predikat (P)",
          singkat: "Apa yang dikerjakan",
          uraian:
            "Predikat adalah tindakan atau keadaan tokoh. Contoh tindakan: bermain, membaca, melompat, menulis. Contoh keadaan: tidur, sedih, gembira.",
          contoh: "Ali menulis. Predikat = menulis.",
        },
        {
          nama: "Rumus dasar",
          singkat: "S + P sudah lengkap",
          uraian:
            "Kalimat minimal = subjek + predikat. Nia membaca. Made menari. Maknanya sudah dipahami. Kalimat berita ditutup tanda titik.",
          contoh: "Made menari.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Jika ada kalimat: Kelinci melompat gembira. Manakah kata yang bertindak sebagai subjek?",
          alias: ["kelinci"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tentukan predikat dari kalimat: Ali menulis cerita. P =",
        alias: ["menulis", "menulis cerita"],
      },
      voice: [
        [
          "Halo anak-anak hebat kelas 2! Saat kita berbicara atau menulis cerita untuk teman, kita memakai deretan kata yang disebut kalimat. Agar tidak membingungkan, kalimat harus punya minimal dua pilar.",
          "Pilar pertama subjek, disingkat S: siapa yang melakukan perbuatan. Bisa nama orang, hewan, atau benda. Pilar kedua predikat, disingkat P: tindakan atau apa yang dikerjakan tokoh.",
          "Contoh: Made menari. Made subjeknya, menari predikatnya. Yuk, kita latihan memisahkan tokoh dan tindakannya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Kalimat Berita yang Santun",
      pengantar:
        "Infografis kalimat berita: menyampaikan kabar, diakhiri titik, memakai S+P. Berteman dalam keragaman: beda suku, sama-sama saling menolong.",
      labelDaftar: "Titik, kabar, dan berteman",
      kolom: 1,
      item: [
        {
          nama: "Tanda titik",
          singkat: "Penutup kalimat berita",
          uraian:
            "Kalimat berita menyampaikan kabar, bukan bertanya. Wajib diakhiri titik, bukan tanda tanya. Contoh: Nia meminjamkan penghapus.",
          contoh: "Nia menolong Made.",
        },
        {
          nama: "S + P dalam kabar",
          singkat: "Tokoh dan tindakan jelas",
          uraian:
            "Kabar yang rapi punya subjek dan predikat. Teman dari suku atau bahasa berbeda tetap bisa dipahami jika kalimatnya jelas: Made menerima penghapus.",
          contoh: "Made berterima kasih.",
        },
        {
          nama: "Berteman dalam keragaman",
          singkat: "Beda, tetap rukun",
          uraian:
            "Di kelas ada Ali, Nia, Made, Joko. Nama dan bahasa bisa berbeda. Yang sama: kita saling menolong. Tulis kabar baik dengan S+P dan titik.",
          contoh: "Kami bermain bersama.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Kalimat berita diakhiri tanda apa? Apakah boleh memakai tanda tanya?",
          alias: ["titik", "tidak", "bukan tanya", "titik titik"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Tulis satu kalimat berita S+P tentang menolong teman, diakhiri titik.",
        alias: ["menolong", "meminjamkan", "berterima kasih", "bermain", "."],
      },
      voice: [
        [
          "Kalimat berita itu kabar, bukan pertanyaan. Karena itu ditutup tanda titik. Jangan pakai tanda tanya kecuali kita benar-benar bertanya.",
          "Supaya teman dari daerah lain paham, tulislah subjek dan predikat dengan jelas. Nia meminjamkan. Made berterima kasih.",
          "Berteman dalam keragaman artinya berbeda nama dan bahasa, tetapi sama-sama saling menolong.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih subjek kelinci dan predikat menulis, tentukan benar-salah tanda tanya serta predikat keadaan, jodohkan S-P-titik, lalu jelaskan mengapa S+P menjaga kerukunan.",
      labelDaftar: "Pilihan, benar-salah, mencocokkan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "S, P, dan titik",
          uraian:
            "Kelinci = subjek. Menulis = predikat. Berita memakai titik, bukan tanya. Tidur dan sedih boleh jadi predikat keadaan.",
          contoh: "Kelinci. Menulis. Titik. Predikat keadaan.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Rumus dan rukun",
          uraian:
            "S = Ali, Nia, kucing. P = membaca, berlari. Titik menutup berita. Kalimat S+P yang santun membuat teman paham saat kita menolong.",
          contoh: "S+P. Titik. Menolong.",
        },
      ],
      kuis: [
        { pertanyaan: "Subjek kelinci melompat?", alias: ["kelinci"] },
        { pertanyaan: "Predikat Ali menulis?", alias: ["menulis"] },
        { pertanyaan: "Berita pakai tanya?", alias: ["salah", "titik"] },
        { pertanyaan: "Tidur bisa predikat?", alias: ["benar"] },
        { pertanyaan: "Rumus minimal?", alias: ["subjek", "predikat"] },
        { pertanyaan: "Mengapa S+P penting berteman?", alias: ["paham", "tolong", "rukun"] },
      ],
      voice: [
        ["Kelinci subjek. Menulis predikat. Berita ditutup titik."],
        ["Predikat bisa tindakan atau keadaan. Kalimat jelas menjaga kerukunan."],
      ],
    },
    {
      kode: "D",
      judul: "D. Kartu Evaluasi Ekstra",
      pengantar:
        "Tanpa keyboard. Tarik garis S-P-titik, geser kata ke keranjang subjek atau predikat, urutkan Nia menolong Made, coretkan huruf subjek, lalu tekan BENAR atau SALAH.",
      labelDaftar: "Tarik garis, keranjang, urutan, kanvas, detektif",
      kolom: 1,
      item: [
        {
          nama: "Permainan A sampai C",
          singkat: "Garis, keranjang, urutan",
          uraian:
            "S: Ali, Nia, kucing. P: membaca, berlari. Titik: penutup berita. Keranjang S: Made, burung, Joko. P: melompat, memasak. Urutan: Nia melihat, meminjamkan, Made berterima kasih.",
          contoh: "S pelaku. P tindakan. Titik.",
        },
        {
          nama: "Permainan D dan E",
          singkat: "Kanvas dan detektif",
          uraian:
            "S-U-B-J-E-K. Berita tidak memakai tanda tanya. Tidur dan sedih boleh predikat.",
          contoh: "Coretkan K. SALAH lalu BENAR.",
        },
      ],
      kuis: [
        { pertanyaan: "Tarik garis S P titik?", alias: ["subjek", "predikat", "titik"] },
        { pertanyaan: "Keranjang S atau P?", alias: ["made", "melompat"] },
        { pertanyaan: "Urutan Nia Made?", alias: ["melihat", "meminjamkan", "terima"] },
        { pertanyaan: "Berita pakai tanya?", alias: ["salah"] },
        { pertanyaan: "Tidur predikat?", alias: ["benar"] },
      ],
      kuisTulis: {
        pertanyaan: "Coretkan dua huruf terakhir S-U-B-J-E-__-__.",
        alias: ["subjek", "k", "ek"],
      },
      voice: [
        [
          "Tanpa keyboard. Tarik garis subjek, predikat, dan tanda titik. Geser Made ke subjek, melompat ke predikat.",
          "Urutkan: Nia melihat Made kebingungan, Nia meminjamkan penghapus, Made berterima kasih. Coretkan K untuk kata subjek.",
          "Detektif: berita tidak ditutup tanda tanya. Tidur dan sedih boleh menjadi predikat.",
        ],
      ],
    },
  ],
};
