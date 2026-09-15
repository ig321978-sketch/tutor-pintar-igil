import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_BINDO1_BAB7 = "Bab 7: Rumah Kedua";

export const MODUL_BINDO1_BAB7: ModulResmiPai = {
  id: "bindo-1-bab7",
  judul: JUDUL_BINDO1_BAB7,
  pola: /rumah kedua|aku ingin/,
  motivasi:
    "Sekolah adalah rumah kedua. Guru, satpam, kepala sekolah, dan murid punya tugas. Kita jaga kebersihan gedung bersama mereka.",
  kunciJawaban: "B,B,A,C,B,A,B,C,A,B",
  sketsaKartu: [
    "Ali dan Nia mengantar buku tugas di depan ruang guru, membicarakan warga sekolah.",
    "Kartu suku kata P: padi, pipa, putih, pena, pohon.",
    "Wawancara mini peran warga sekolah dan peta rumah kedua di rumah.",
    "Siswa menilai peran kepala sekolah dan menyusun suku kata sepeda serta guru.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Siapakah warga sekolah yang memiliki tugas utama memimpin seluruh aturan, program kegiatan, dan menjaga keteraturan sekolah?
A) Penjaga Kantin Sekolah
B) Kepala Sekolah
C) Petugas Perpustakaan
D) Murid piket saja`,
    `[Soal 2 - PG - Tipe: HOTS]
Ali berkata murid juga punya tugas menjaga kebersihan gedung sekolah. Artinya...
A) Hanya satpam yang boleh menyapu.
B) Semua warga sekolah, termasuk murid, bertanggung jawab agar belajar aman dan nyaman.
C) Kepala sekolah membersihkan semua kelas sendirian.
D) Buku tugas tidak perlu diantar.`,
    `[Soal 3 - PG - Tipe: Reguler]
Kata pa-di diurai menjadi...
A) Pa-di
B) Pi-di
C) Pu-di
D) Pe-di`,
    `[Soal 4 - PG - Tipe: Reguler]
Kata pe-na paling tepat merujuk pada...
A) Tanaman tinggi di halaman.
B) Warna bendera.
C) Alat untuk menulis.
D) Padi di sawah.`,
    `[Soal 5 - PG - Tipe: Reguler]
Kata pu-tih, pi-pa, dan po-hon huruf awalnya sama, yaitu...
A) T
B) P
C) H
D) I`,
    `[Soal 6 - PG - Tipe: Reguler]
Suku kata acak ni-se-pa-d yang benar adalah...
A) Sepeda
B) Pedas
C) Panas
D) Padi`,
    `[Soal 7 - PG - Tipe: Reguler]
Suku kata acak ru-gu yang benar adalah...
A) Rugu
B) Guru
C) Ugur
D) Ugru`,
    `[Soal 8 - PG - Tipe: Reguler]
Pak Satpam di sekolah bertugas utama untuk...
A) Memimpin rapat guru.
B) Mengajar matematika.
C) Menjaga keamanan gerbang dan halaman.
D) Menjual buku di perpustakaan.`,
    `[Soal 9 - PG - Tipe: HOTS]
Ibu Guru disebut Ali sebagai Ibu Pa-kar. Maknanya guru adalah...
A) Orang yang ahli dan membantu kita belajar.
B) Orang yang hanya menjaga gerbang.
C) Orang yang memasak di kantin.
D) Orang yang tidak perlu disapa.`,
    `[Soal 10 - PG - Tipe: Reguler]
Kata po-hon diurai menjadi...
A) Pa-hon
B) Po-hon
C) Pi-hon
D) Pe-hon`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Dialog di Depan Ruang Guru",
      pengantar:
        "Di depan ruang guru. Ali dan Nia mengantarkan buku tugas kelas. Mereka menyadari banyak orang membantu mereka belajar.",
      labelDaftar: "Percakapan Ali dan Nia tentang warga sekolah",
      kolom: 1,
      item: [
        {
          nama: "Banyak penolong",
          singkat: "Ibu Guru, satpam, kepala sekolah",
          uraian:
            "Ada Ibu Pakar Guru, Pak Satpam, dan Ibu Kepala Sekolah. Masing-masing punya tugas supaya murid belajar aman dan nyaman.",
          contoh: "Setiap warga sekolah punya tugas.",
        },
        {
          nama: "Rumah kedua",
          singkat: "Sekolah",
          uraian:
            "Nia menyebut sekolah seperti rumah kedua. Kita dihormati dan dilindungi di sini, seperti di rumah.",
          contoh: "Sekolah = rumah kedua.",
        },
        {
          nama: "Tugas murid",
          singkat: "Jaga kebersihan",
          uraian:
            "Murid juga punya tugas: menjaga kebersihan gedung sekolah bersama warga yang lain.",
          contoh: "Jaga bersih, belajar nyaman.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sekolah disebut sebagai apa oleh Nia?",
          alias: ["rumah kedua", "rumah"],
        },
        {
          pertanyaan: "2. Sebut satu warga sekolah selain guru.",
          alias: ["satpam", "kepala sekolah", "kepala"],
        },
        {
          pertanyaan: "3. Tugas murid di gedung sekolah apa?",
          alias: ["kebersihan", "bersih", "menjaga"],
        },
      ],
      voice: [
        [
          "Di depan ruang guru, Ali dan Nia mengantar buku tugas. Ali berkata, Nia, di sekolah ini ternyata banyak sekali orang yang membantu kita belajar ya. Ada Ibu pa-kar Guru, ada Pak Satpam, dan Ibu Kepala Sekolah.",
          "Nia mengangguk. Betul, Ali! Sekolah ini sudah seperti rumah kedua kita. Semua warga sekolah punya tugas penting masing-masing agar kita semua bisa belajar dengan aman dan nyaman.",
        ],
        [
          "Ali menyimpulkan, Kalau begitu, kita sebagai murid juga punya tugas untuk menjaga kebersihan gedung sekolah ini bersama mereka, ya!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Suku Kata Pa Pi Pu Pe Po",
      pengantar:
        "Latih bunyi /p/ pada kata pa-di, pi-pa, pu-tih, pe-na, po-hon. Perluas kosakata nama profesi di sekolah dan fungsinya melalui deskripsi teks pendek.",
      labelDaftar: "Suku kata P dan peran sosial",
      kolom: 1,
      item: [
        {
          nama: "Pa-di dan po-hon",
          singkat: "Tumbuhan",
          uraian: "Pa-di di sawah. Po-hon di halaman sekolah. Bunyi /p/ ledakan kecil di bibir, tanpa getar pita suara.",
          contoh: "Pa-di, po-hon.",
        },
        {
          nama: "Pi-pa, pu-tih, pe-na",
          singkat: "Benda",
          uraian: "Pi-pa saluran air. Pu-tih warna. Pe-na alat tulis. Urai: pi-pa, pu-tih, pe-na.",
          contoh: "Pe-na di tas.",
        },
        {
          nama: "Profesi sekolah",
          singkat: "Tugas masing-masing",
          uraian:
            "Kepala sekolah memimpin aturan dan program. Guru mengajar. Satpam menjaga keamanan. Murid menjaga kebersihan dan belajar sungguh-sungguh.",
          contoh: "Kepala sekolah memimpin sekolah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Sebut satu kata berawalan pa.",
          alias: ["padi", "pakar", "pagi"],
        },
        {
          pertanyaan: "2. Siapa yang memimpin seluruh aturan sekolah?",
          alias: ["kepala sekolah", "kepala"],
        },
        {
          pertanyaan: "3. Pe-na dipakai untuk apa?",
          alias: ["menulis", "tulis", "alat tulis"],
        },
      ],
      voice: [
        [
          "Suku kata P: pa-di, pi-pa, pu-tih, pe-na, po-hon. Bibir tertutup lalu terbuka untuk bunyi /p/.",
        ],
        [
          "Kepala sekolah memimpin. Guru mengajar. Satpam menjaga. Murid menjaga kebersihan. Sekolah rumah kedua kita.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Kenali Warga Sekolah di Sekolah dan di Rumah",
      pengantar:
        "Membaca dan menulis suku kata P dipraktikkan lewat mengenal orang-orang yang menolong kita belajar.",
      labelDaftar: "Dua tempat berlatih",
      kolom: 2,
      item: [
        {
          nama: "Wawancara mini",
          singkat: "Untuk guru",
          uraian:
            "Siswa bertanya kepada satpam, petugas perpustakaan, atau penjaga kantin: apa tugas Bapak/Ibu? Tulis jawaban dalam suku kata pendek di kartu.",
          contoh: "Tugas Bapak menjaga gerbang.",
        },
        {
          nama: "Peta rumah kedua",
          singkat: "Untuk orang tua",
          uraian:
            "Anak menggambar denah sekolah: ruang guru, gerbang, perpustakaan, kelas. Tuliskan siapa yang bekerja di setiap tempat.",
          contoh: "Gerbang: Pak Satpam. Kantor: Kepala Sekolah.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Di gerbang sekolah, siapa yang menjaga?",
          alias: ["satpam", "penjaga"],
        },
        {
          pertanyaan: "2. Di ruang kelas, siapa yang mengajar?",
          alias: ["guru", "ibu guru", "pak guru"],
        },
        {
          pertanyaan: "3. Sekolah disebut rumah ke berapa?",
          alias: ["kedua", "dua", "rumah kedua"],
        },
      ],
      voice: [
        [
          "Di sekolah, tanya kepada satpam atau petugas perpustakaan. Apa tugas Bapak Ibu? Tulis jawabannya pelan-pelan.",
        ],
        [
          "Di rumah, gambar peta sekolah. Gerbang, ruang guru, kelas, perpustakaan. Tuliskan siapa yang bekerja di sana. Sekolah rumah kedua.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Saatnya menilai peran warga sekolah dan menyusun suku kata acak menjadi kata yang benar.",
      labelDaftar: "Peran dan suku kata acak",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Menilai peran",
          uraian:
            "Yang memimpin seluruh aturan, program, dan keteraturan sekolah adalah kepala sekolah, bukan penjaga kantin atau petugas perpustakaan.",
          contoh: "Kepala sekolah memimpin sekolah.",
        },
        {
          nama: "Kelompok B",
          singkat: "Menyusun suku kata",
          uraian: "ni-se-pa-d menjadi sepeda. ru-gu menjadi guru.",
          contoh: "Sepeda. Guru.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Siapa yang memimpin aturan dan program sekolah?",
          alias: ["kepala sekolah", "kepala"],
        },
        {
          pertanyaan: "2. ni-se-pa-d menjadi kata apa?",
          alias: ["sepeda"],
        },
        {
          pertanyaan: "3. ru-gu menjadi kata apa?",
          alias: ["guru"],
        },
      ],
      voice: [
        [
          "Kelompok A: yang memimpin seluruh aturan dan program sekolah adalah kepala sekolah.",
        ],
        [
          "Kelompok B: susun suku kata. ni-se-pa-d menjadi sepeda. ru-gu menjadi guru.",
        ],
      ],
    },
  ],
};
