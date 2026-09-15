import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB8 = "Bab 8: Di Sekitar Kita";

export const MODUL_BINDO1_BAB8: ModulResmiPai = {
  id: "bindo-1-bab8",
  judul: JUDUL_BINDO1_BAB8,
  pola: /di sekitar kita|di sekitar rumah/,
  motivasi:
    "Alam di sekitar sekolah penuh cerita. Baca paragraf utuh. Berhenti di titik. Naikkan nada di tanda tanya. Matahari, cicak, dan nyamuk jadi bahan bacaan.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan Nia di taman sekolah siang hari, memandang matahari, cicak, dan nyamuk.",
    "Kartu suku kompleks: nyamuk, cicak, cuci, comel, nyanyi.",
    "Membaca nyaring satu paragraf dengan titik dan tanda tanya di sekolah serta mengamati alam di rumah.",
    "Siswa menjawab pemahaman bacaan tentang matahari terbit dan bunga mawar mekar.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Bacaan: "Matahari terbit di sebelah timur pada pagi hari. Cahayanya yang hangat menerangi bumi. Bunga-bunga mawar mulai mekar indah di taman sekolah. Burung-burung pipit berkicau riang di atas dahan." Kapan waktu matahari tersebut terbit menyinari taman?
A) Malam hari yang sunyi
B) Pagi hari yang cerah
C) Sore hari sebelum hujan
D) Tengah malam`,
    `[Soal 2 - PG - Tipe: HOTS]
Berdasarkan bacaan yang sama, perubahan apa yang terjadi pada tanaman bunga di taman saat matahari mulai terbit?
A) Kelopak bunga mawar menjadi layu dan rontok ke tanah.
B) Kelopak bunga mawar mulai mekar dengan sangat indah.
C) Bunga-bunga mawar dipetik oleh burung pipit.
D) Bunga mawar berubah menjadi nyamuk.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata nya-muk diurai dengan bunyi awal...
A) Nya
B) Na
C) Ma
D) Ka`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata ci-cak merujuk pada...
A) Burung di dahan.
B) Bunga di taman.
C) Hewan kecil yang merayap di batang atau dinding.
D) Matahari di langit.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kata cu-ci dan co-mel huruf awalnya sama, yaitu...
A) U
B) C
C) M
D) N`,
    `[Soal 6 - PG - Tipe: Reguler]
Tanda titik (.) pada akhir kalimat memberi isyarat pembaca untuk...
A) Berhenti sejenak.
B) Terus berteriak.
C) Menutup buku.
D) Menghapus kalimat.`,
    `[Soal 7 - PG - Tipe: HOTS]
Tanda tanya (?) pada akhir kalimat memberi isyarat...
A) Marah kepada teman.
B) Nada bertanya, bukan memberitahu.
C) Lagu wajib dinyanyikan.
D) Semua huruf menjadi kapital.`,
    `[Soal 8 - PG - Tipe: Reguler]
Kata nya-la pada kalimat "Nyala cahayanya" berhubungan dengan...
A) Gelap gulita.
B) Kuman di tanah.
C) Cahaya yang terang.
D) Tali sepatu.`,
    `[Soal 9 - PG - Tipe: Reguler]
Cicak merayap diam-diam untuk menangkap...
A) Nyamuk
B) Matahari
C) Bola
D) Buku`,
    `[Soal 10 - PG - Tipe: Reguler]
Membaca satu paragraf pendek utuh di bab ini berarti anak...
A) Hanya mengeja satu huruf.
B) Menyusun kalimat dengan intonasi titik dan tanda tanya.
C) Menutup telinga.
D) Menulis tanpa membaca.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Taman Sekolah",
      pengantar:
        "Taman sekolah di siang hari yang cerah. Ali dan Nia memandang langit, batang pohon, dan hewan kecil di sekitar mereka.",
      labelDaftar: "Percakapan Ali dan Nia tentang alam sekitar",
      kolom: 1,
      item: [
        {
          nama: "Nya-la cahaya",
          singkat: "Matahari",
          uraian:
            "Matahari bersinar cerah. Nyala cahayanya membuat halaman terang benderang.",
          contoh: "Matahari: nya-la cahaya.",
        },
        {
          nama: "Ci-cak dan nya-muk",
          singkat: "Hewan di batang",
          uraian:
            "Di batang pohon, seekor cicak merayap diam-diam untuk menangkap nyamuk. Alam penuh cerita hewan dan tumbuhan.",
          contoh: "Cicak menangkap nyamuk.",
        },
        {
          nama: "Cerita di sekitar",
          singkat: "Baca dunia nyata",
          uraian:
            "Halaman sekolah menjadi buku terbuka. Anak membaca benda, hewan, dan cuaca sebagai kalimat yang hidup.",
          contoh: "Lihat, baca, ceritakan.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Apa yang membuat halaman terang benderang?",
          alias: ["matahari", "cahaya", "nyala"],
        },
        {
          pertanyaan: "2. Hewan apa yang merayap di batang pohon?",
          alias: ["cicak", "ci-cak"],
        },
        {
          pertanyaan: "3. Cicak hendak menangkap apa?",
          alias: ["nyamuk", "nya-muk"],
        },
      ],
      voice: [
        [
          "Di taman siang yang cerah, Ali berkata, Nia, lihat ke atas langit! Matahari bersinar cerah sekali siang ini. Nya-la cahayanya membuat halaman kita menjadi terang benderang.",
          "Nia menjawab, Iya, Ali! Dan lihat di batang pohon itu, ada seekor ci-cak sedang merayap diam-diam untuk menangkap nya-muk.",
        ],
        [
          "Ali tersenyum. Wah, alam di sekitar sekolah kita penuh dengan cerita seru hewan dan tumbuhan ya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata N, Y, C dan Paragraf Utuh",
      pengantar:
        "Tahap akhir membaca kelas 1: latih gabungan huruf seperti nya-muk, nya-la, ci-cak, cu-ci, co-mel. Anak diharapkan mampu membaca satu paragraf pendek utuh dengan intonasi titik (.) dan tanda tanya (?).",
      labelDaftar: "Suku kompleks dan sintesis kalimat",
      kolom: 1,
      item: [
        {
          nama: "Nya-muk dan nya-la",
          singkat: "Gabungan ny",
          uraian: "Ny bukan N lalu Y yang terpisah jauh. Ucapkan nya sebagai satu bunyi. Nya-muk, nya-la, nya-nyi.",
          contoh: "Nya-muk. Nya-la.",
        },
        {
          nama: "Ci-cak, cu-ci, co-mel",
          singkat: "Huruf C",
          uraian: "C di awal suku: ci-cak, cu-ci, co-mel. Latih lidah agar /c/ tidak menjadi /s/ atau /k/.",
          contoh: "Ci-cak. Cu-ci. Co-mel.",
        },
        {
          nama: "Paragraf pendek",
          singkat: "Titik dan tanya",
          uraian:
            "Baca utuh: Matahari terbit di sebelah timur pada pagi hari. Berhenti di titik. Naikkan nada jika ada tanda tanya. Pahami isi, jangan hanya mengeja.",
          contoh: "Berhenti di titik. Tanya di tanda tanya.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Nya-muk huruf awal gabungannya bunyi apa?",
          alias: ["nya", "ny", "nyamuk"],
        },
        {
          pertanyaan: "2. Ci-cak huruf awalnya apa?",
          alias: ["c", "ci", "cicak"],
        },
        {
          pertanyaan: "3. Tanda titik menyuruh kita apa?",
          alias: ["berhenti", "stop", "jeda"],
        },
      ],
      voice: [
        [
          "Suku gabungan. Nya-muk, nya-la, nya-nyi. Ci-cak, cu-ci, co-mel. Ucapkan pelan, lalu cepat.",
        ],
        [
          "Baca paragraf. Matahari terbit di sebelah timur pada pagi hari. Titik, berhenti. Jika ada tanda tanya, nada naik. Pahami ceritanya.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Baca Alam di Sekolah dan di Rumah",
      pengantar:
        "Membaca, menulis, dan berbicara disatukan. Anak membaca paragraf, lalu menulis satu kalimat tentang apa yang dilihat di sekitar.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Membaca nyaring taman",
          singkat: "Untuk guru",
          uraian:
            "Bacakan paragraf matahari-mawar-pipit. Siswa menirukan intonasi. Tanyakan: kapan? apa yang mekar? siapa yang berkicau? Tulis jawaban pendek di papan.",
          contoh: "Pagi hari. Mawar mekar. Pipit berkicau.",
        },
        {
          nama: "Satu kalimat dari jendela",
          singkat: "Untuk orang tua",
          uraian:
            "Amati matahari, tanaman, atau hewan kecil di sekitar rumah. Anak mengucapkan lalu menulis satu kalimat bertitik. Contoh: Cicak di dinding menangkap nyamuk.",
          contoh: "Tulis satu kalimat. Akhiri dengan titik.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Matahari terbit pada waktu apa?",
          alias: ["pagi", "pagi hari"],
        },
        {
          pertanyaan: "2. Bunga mawar di taman mulai apa?",
          alias: ["mekar", "indah"],
        },
        {
          pertanyaan: "3. Kalimat berita diakhiri tanda apa?",
          alias: ["titik", "."],
        },
      ],
      voice: [
        [
          "Di sekolah, baca nyaring paragraf taman. Kapan matahari terbit? Pagi hari. Apa yang mekar? Bunga mawar. Siapa berkicau? Burung pipit.",
        ],
        [
          "Di rumah, lihat ke luar. Tulis satu kalimat. Cicak di dinding menangkap nyamuk. Akhiri dengan titik.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Bacalah teks pendek dengan teliti. Jawab berdasarkan isi bacaan, bukan tebakan di luar teks.",
      labelDaftar: "Membaca pemahaman paragraf",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pemahaman paragraf HOTS",
          uraian:
            "Matahari terbit di sebelah timur pada pagi hari. Bunga mawar mulai mekar indah. Bukan malam, bukan layu, bukan dipetik burung.",
          contoh: "Pagi hari. Mawar mekar.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Kapan matahari terbit menyinari taman menurut teks?",
          alias: ["pagi", "pagi hari", "cerah"],
        },
        {
          pertanyaan: "2. Apa yang terjadi pada bunga mawar saat matahari terbit?",
          alias: ["mekar", "indah", "mulai mekar"],
        },
      ],
      voice: [
        [
          "Baca teks. Matahari terbit di sebelah timur pada pagi hari. Cahayanya yang hangat menerangi bumi. Bunga-bunga mawar mulai mekar indah di taman sekolah. Burung-burung pipit berkicau riang di atas dahan.",
          "Soal satu: kapan matahari terbit? Pagi hari yang cerah. Soal dua: bunga mawar mulai mekar dengan sangat indah.",
        ],
      ],
    },
  ],
};
