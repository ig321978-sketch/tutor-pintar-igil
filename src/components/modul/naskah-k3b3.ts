/**
 * Naskah murni Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat). Berkas ini baru memuat Sub-Bab A (Pengukuran
 * Panjang dengan Satuan Baku) dan Sub-Bab B (Hubungan Antarsatuan Baku Panjang). Sub-Bab C dan D (berat) ditambahkan
 * pada unit berikutnya. Sumber: Buku Siswa Matematika Kelas III Kemendikbudristek, Bab 3 hlm. 105-123, serta Buku Panduan
 * Guru Bab 3, diperkaya dengan benda nyata di atas penggaris, geser ke angka nol, batang polos pada penggaris, garis
 * meteran, pita tersusun dari potongan meter, sepuluh sentimeter, dan sentimeter, serta bagan operasi ukuran gabungan.
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k3-bab3.mjs) memakainya untuk menulis src/data/kelas3-bab3.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k3b3.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K3B3_META = {
  chapterId: "k3-mat-bab3",
  phaseCode: "FASE_B",
  grade: 3,
  subjectLabel: "MATEMATIKA - KELAS 3 SD",
  title: "BAB 3: PENGUKURAN PANJANG DAN BERAT",
  silabusElemen: "🌈 Fase B • Elemen Pengukuran: Panjang (Sentimeter dan Meter) dan Berat (Gram dan Kilogram) dengan Satuan Baku (Kelas 3 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Mengingat satuan tidak baku", "Mengenal penggaris", "Mengukur dari angka nol", "Membaca panjang benda", "Satuan baku panjang", "Penggaris atau meteran", "Memilih alat ukur yang tepat", "Ukuran yang wajar", "Siap mengukur panjang dengan satuan baku"];
const ALUR_B = ["Mengingat cara memakai meteran", "Seratus sentimeter sama dengan satu meter", "Meter ke sentimeter", "Sentimeter ke meter", "Meter dan sentimeter bersama", "Menjumlahkan ukuran panjang", "Mengurangkan ukuran panjang", "Membandingkan ukuran panjang", "Siap mengubah satuan panjang"];

/* ----------------------- Pembantu penulisan permainan ----------------------- */

const C = (gameType: string, title: string, bookReference: string, objective: string, mechanicDescription: string, voiceGuide: string, emoji: string, targetCount: number): GameNaskah => ({
  stage: "Concrete",
  gameType,
  title,
  bookReference,
  objective,
  mechanicDescription,
  voiceGuide,
  emoji,
  targetCount,
});

const P = (gameType: string, title: string, bookReference: string, objective: string, mechanicDescription: string, voiceGuide: string, diagramType: string, numberA: number, numberB: number): GameNaskah => ({
  stage: "Picture",
  gameType,
  title,
  bookReference,
  objective,
  mechanicDescription,
  voiceGuide,
  diagramType,
  numberA,
  numberB,
});

const A = (gameType: string, title: string, bookReference: string, objective: string, mechanicDescription: string, voiceGuide: string, symbolLarge: string, wordLarge: string, mathNotation: string): GameNaskah => ({
  stage: "Abstract",
  gameType,
  title,
  bookReference,
  objective,
  mechanicDescription,
  voiceGuide,
  symbolLarge,
  wordLarge,
  mathNotation,
});

/* ====================================================================== */
/* SUB-BAB A. Pengukuran panjang dengan satuan baku                         */
/* ====================================================================== */

export const SUB_A33: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Pengukuran Panjang dengan Satuan Baku)",
  fullTitle: "Sub-Bab A: Pengukuran Panjang dengan Satuan Baku",
  targetDescription:
    "Siswa mengenal alat ukur panjang (penggaris, meteran gulung, pengukur tinggi badan) dan satuan baku panjang (sentimeter dan meter), mengukur panjang benda dengan menempatkan ujung benda di angka nol, membaca panjang dari angka di ujung yang lain, serta memilih alat ukur yang tepat untuk benda pendek dan benda panjang.",
  secondaryBg: "#E0E7FF",
  secondaryBorder: "#4F46E5",
  secondaryText: "#312E81",
  silabus: {
    teksSuara: `Kita belajar mengukur panjang dengan satuan baku. Di posyandu, tinggi badan bayi diukur dengan alat ukur. Kita mengenal penggaris, meteran, dan satuan baku sentimeter dan meter. Kita belajar meletakkan ujung benda di angka nol, lalu membaca angka di ujung yang lain. Kita juga memilih alat ukur yang tepat untuk benda pendek dan benda panjang. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa mengukur panjang benda dengan penggaris dan meteran serta memilih alat ukur yang tepat.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab A hlm. 105–119) dan Buku Panduan Guru Bab 3 Topik A.",
  },
  videos: [
    {
      id: "K3B3A-V1",
      judul: "Posyandu dan Alat Ukur",
      subjudul: "Mengenal alat ukur panjang",
      adegan: [
        {
          id: "K3B3A-V1-1",
          judul: "Ke posyandu",
          ketukan: [
            "Posyandu memberikan layanan kesehatan bagi masyarakat.",
            "Di posyandu, tinggi badan dan berat badan bayi diukur.",
            "Alat apa yang dipakai untuk mengukur tinggi badan?",
            "Satuan baku apa yang digunakan?",
          ],
          papan: ["Posyandu", "Mengukur tinggi badan", "Alat ukur apa?", "Satuan baku apa?"],
        },
        {
          id: "K3B3A-V1-2",
          judul: "Satuan tidak baku",
          ketukan: [
            "Panjang meja dapat diukur dengan jengkal tangan atau pensil.",
            "Jengkal tangan setiap orang berbeda-beda.",
            "Hasil ukur dengan benda tidak baku bisa berbeda.",
            "Karena itu kita memerlukan satuan baku yang sama untuk semua.",
          ],
          papan: ["Jengkal dan pensil", "Jengkal berbeda-beda", "Hasil bisa berbeda", "Perlu satuan baku"],
        },
        {
          id: "K3B3A-V1-3",
          judul: "Satuan baku panjang",
          ketukan: [
            "Satuan baku panjang adalah sentimeter dan meter.",
            "Sentimeter ditulis cm dan meter ditulis m.",
            "Penggaris memakai satuan sentimeter.",
            "Meteran memakai satuan meter dan sentimeter.",
          ],
          papan: ["Sentimeter dan meter", "cm dan m", "Penggaris: cm", "Meteran: m dan cm"],
        },
      ],
    },
    {
      id: "K3B3A-V2",
      judul: "Mengukur dengan Penggaris",
      subjudul: "Aktivitas 1: pengukuran panjang",
      adegan: [
        {
          id: "K3B3A-V2-1",
          judul: "Siapkan alat",
          ketukan: [
            "Siapkan pensil, buku, kotak pensil, dan penggaris.",
            "Letakkan benda-benda itu di atas meja.",
            "Penggaris adalah alat ukur dan alat bantu menggambar garis lurus.",
            "Kita akan mengukur panjang tiap benda.",
          ],
          papan: ["Pensil, buku, kotak pensil", "Di atas meja", "Penggaris", "Mengukur panjang benda"],
        },
        {
          id: "K3B3A-V2-2",
          judul: "Mulai dari nol",
          ketukan: [
            "Letakkan ujung penggaris pada salah satu ujung benda.",
            "Pastikan ujung benda tepat di angka 0 sentimeter.",
            "Perhatikan ujung benda yang lain berada di angka berapa.",
            "Angka itu adalah panjang benda.",
          ],
          papan: ["Ujung penggaris di ujung benda", "Ujung benda di angka 0", "Lihat ujung yang lain", "Angka itu panjangnya"],
        },
        {
          id: "K3B3A-V2-3",
          judul: "Tulis hasilnya",
          ketukan: [
            "Misalnya ujung pensil yang lain berada di angka 15.",
            "Panjang pensil adalah 15 sentimeter.",
            "Tulis hasilnya dengan satuan baku, yaitu 15 cm.",
            "Satuan panjang pada penggaris adalah sentimeter.",
          ],
          papan: ["Ujung lain di angka 15", "Panjang pensil 15 cm", "Tulis: 15 cm", "Satuan: sentimeter"],
        },
      ],
    },
    {
      id: "K3B3A-V3",
      judul: "Penggaris atau Meteran",
      subjudul: "Memilih alat ukur yang tepat",
      adegan: [
        {
          id: "K3B3A-V3-1",
          judul: "Benda panjang",
          ketukan: [
            "Meteran dipakai untuk benda yang lebih panjang dari penggaris.",
            "Contohnya televisi, meja, pintu, dan papan tulis.",
            "Alat ukur apa yang tepat untuk mengukur pintu?",
            "Karena pintu lebih panjang dari penggaris, kita pakai meteran.",
          ],
          papan: ["Meteran untuk benda panjang", "Televisi, meja, pintu", "Alat ukur pintu?", "Pintu: meteran"],
        },
        {
          id: "K3B3A-V3-2",
          judul: "Cara memakai meteran",
          ketukan: [
            "Cara memakai meteran sama dengan cara memakai penggaris.",
            "Mulailah dari angka 0.",
            "Meteran memakai satuan meter dan sentimeter.",
            "Meteran juga dapat dipakai untuk mengukur jarak antara dua benda.",
          ],
          papan: ["Sama dengan penggaris", "Mulai dari angka 0", "Meter dan sentimeter", "Mengukur jarak"],
        },
        {
          id: "K3B3A-V3-3",
          judul: "Memilih alat",
          ketukan: [
            "Benda pendek seperti pensil diukur dengan penggaris.",
            "Benda panjang seperti lemari diukur dengan meteran.",
            "Tinggi badan diukur dengan pengukur tinggi badan atau meteran.",
            "Pilih alat ukur yang tepat supaya hasilnya mudah dibaca.",
          ],
          papan: ["Pensil: penggaris", "Lemari: meteran", "Tinggi badan: meteran", "Pilih alat yang tepat"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengingat Satuan Tidak Baku",
      stepDesc:
        "Panjang benda dapat diukur dengan benda lain yang lebih pendek, misalnya jengkal tangan atau pensil. Satu jengkal tangan dan satu pensil dapat dipakai mengukur panjang meja tulis. Tetapi jengkal tangan setiap orang berbeda, sehingga hasil ukur bisa berbeda. Karena itu diperlukan satuan baku yang sama untuk semua orang.",
      icon: "🔙",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Mengenal Penggaris",
      stepDesc:
        "Penggaris atau mistar adalah alat ukur dan alat bantu untuk menggambar garis lurus. Pada penggaris ada angka 0, 1, 2, dan seterusnya. Jarak dari satu angka ke angka berikutnya adalah satu sentimeter. Penggaris dipakai untuk mengukur benda yang pendek, misalnya pensil, penghapus, dan buku tulis.",
      icon: "📏",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Mengukur dari Angka Nol",
      stepDesc:
        "Pada Aktivitas 1, letakkan ujung penggaris pada salah satu ujung benda. Langkah kedua, pastikan ujung benda tepat di angka 0 sentimeter. Setelah itu perhatikan ujung benda yang lain berada di angka berapa. Bila benda tidak mulai dari angka 0, hasil bacaan akan keliru karena panjang yang terbaca terlalu besar.",
      icon: "0️⃣",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Membaca Panjang Benda",
      stepDesc:
        "Setelah ujung benda tepat di angka 0, angka di ujung benda yang lain menunjukkan panjang benda. Bila ujung pensil berada di angka 15, panjang pensil adalah 15 sentimeter. Tuliskan hasil pengukuran bersama satuannya, yaitu 15 cm. Panjang benda dapat dibandingkan dan diurutkan dari yang terpendek sampai yang terpanjang.",
      icon: "🔍",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Satuan Baku Panjang",
      stepDesc:
        "Ukuran panjang benda memiliki satuan baku. Satuan baku yang dapat digunakan adalah sentimeter (cm) dan meter (m). Penggaris memakai sentimeter. Meteran memakai meter dan sentimeter. Karena satuan baku sama untuk semua orang, hasil pengukuran sama siapa pun yang mengukur.",
      icon: "📐",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Penggaris atau Meteran",
      stepDesc:
        "Alat ukur panjang bermacam-macam, di antaranya penggaris, meteran gulung, dan pengukur tinggi badan. Meteran digunakan untuk mengukur benda yang panjangnya melebihi penggaris, misalnya televisi, meja, pintu, atau papan tulis. Cara memakai meteran sama dengan penggaris, yaitu mulai dari angka 0.",
      icon: "🧰",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Memilih Alat Ukur yang Tepat",
      stepDesc:
        "Memilih alat ukur harus sesuai dengan benda. Meutia bertanya alat apa yang tepat mengukur televisi, dan jawabannya meteran karena televisi lebih panjang dari penggaris. Alfa bertanya tentang meja, dan jawabannya juga meteran. Pensil, penghapus, dan buku tulis cukup diukur dengan penggaris. Tinggi badan diukur dengan pengukur tinggi badan atau meteran.",
      icon: "✅",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Ukuran yang Wajar",
      stepDesc:
        "Memperkirakan ukuran membantu kita memilih satuan. Panjang pensil sekitar 15 cm, buku tulis sekitar 30 cm, dan tinggi pintu sekitar 2 m. Panjang lapangan dan jalan lebih tepat ditulis dengan meter. Bila hasil terlalu aneh, misalnya pensil 15 m, periksa lagi satuannya. Dua panjang dapat dibandingkan dengan melihat selisihnya.",
      icon: "🧭",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    { judul: "Satuan Tidak Baku", emoji: "🖐️", countNum: 2, countWord: "Dua", suara: "Jengkal tangan dan pensil dapat mengukur panjang meja. Tetapi jengkal setiap orang berbeda, jadi hasil ukur bisa berbeda." },
    { judul: "Satuan Baku", emoji: "📐", countNum: 2, countWord: "Dua", suara: "Satuan baku panjang adalah sentimeter dan meter. Satuan baku sama untuk semua orang." },
    { judul: "Penggaris", emoji: "📏", countNum: 3, countWord: "Tiga", suara: "Penggaris adalah alat ukur panjang. Jarak dari satu angka ke angka berikutnya adalah satu sentimeter." },
    { judul: "Mulai dari Nol", emoji: "0️⃣", countNum: 3, countWord: "Tiga", suara: "Letakkan ujung benda tepat di angka nol. Lalu lihat ujung benda yang lain berada di angka berapa." },
    { judul: "Membaca Panjang", emoji: "🔍", countNum: 2, countWord: "Dua", suara: "Angka di ujung benda yang lain adalah panjang benda. Ujung pensil di angka lima belas berarti panjang pensil lima belas sentimeter." },
    { judul: "Meteran", emoji: "🧰", countNum: 3, countWord: "Tiga", suara: "Meteran dipakai untuk benda yang lebih panjang dari penggaris, seperti televisi, meja, dan pintu." },
    { judul: "Memilih Alat", emoji: "✅", countNum: 3, countWord: "Tiga", suara: "Benda pendek diukur dengan penggaris. Benda panjang diukur dengan meteran. Pilih alat yang tepat." },
    { judul: "Ukuran Wajar", emoji: "🧭", countNum: 4, countWord: "Empat", suara: "Panjang pensil sekitar lima belas sentimeter. Tinggi pintu sekitar dua meter. Perkirakan dulu supaya satuannya tepat." },
    { judul: "Selisih Panjang", emoji: "↔️", countNum: 2, countWord: "Dua", suara: "Untuk membandingkan dua panjang, kurangkan panjang yang besar dengan yang kecil. Itulah selisihnya." },
    { judul: "Cara Mengukur", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, pilih alat ukur yang tepat. Dua, letakkan ujung benda di angka nol. Tiga, baca angka di ujung yang lain. Empat, tulis hasilnya dengan satuan." },
  ],
  games: [
    C("shift-to-zero", "Geser ke Angka Nol", "hlm. 107 (Aktivitas 1, langkah 4 dan 5)", "Menggeser benda sampai ujung kirinya tepat di angka 0 pada penggaris, lalu membaca panjangnya.", "Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris mulai dari angka selain nol. Siswa menekan geser kiri atau kanan sampai ujung benda di angka 0, lalu memilih panjang benda dari tiga pilihan.", "Geser benda ke angka nol, lalu baca panjangnya.", "📏", 6),
    C("read-length", "Baca Panjang Benda", "hlm. 107–108 (Aktivitas 1: tabel panjang benda)", "Membaca panjang benda yang sudah dimulai dari angka 0 pada penggaris.", "Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris ditampilkan. Siswa memilih satu dari tiga panjang. Pengecoh salah satu sentimeter.", "Baca panjang benda dari penggaris.", "🔍", 6),
    C("tap-end", "Ketuk Ujung Benda", "hlm. 107 (angka di ujung benda yang lain)", "Mengetuk angka pada garis penggaris tempat ujung benda yang lain berhenti.", "Tiga ronde, tiap ronde dua soal. Benda nyata di atas penggaris dimulai dari 0 dan panjangnya paling banyak 10 cm. Siswa mengetuk angka di ujung benda.", "Ketuk angka di ujung benda.", "👆", 6),
    C("choose-tool", "Pilih Alat Ukur", "hlm. 115–117 (penggaris atau meteran)", "Memilih alat ukur yang tepat untuk benda sehari-hari.", "Tiga ronde, tiap ronde dua benda sehari-hari. Siswa memilih satu dari tiga alat ukur: penggaris, meteran, atau timbangan.", "Pilih alat ukur yang tepat.", "📐", 6),
    C("match-object-length", "Jodohkan Benda dan Panjang", "hlm. 111 (Ayo Berlatih 1: panjang benda dengan satuan baku)", "Menjodohkan benda di atas penggaris dengan panjangnya.", "Tiga ronde, tiap ronde tiga benda dan tiga panjang. Siswa mengetuk benda, lalu mengetuk panjang yang cocok.", "Ketuk benda, lalu ketuk panjangnya.", "🔗", 9),
    C("memory-object-length", "Memori Benda dan Panjang", "hlm. 111 (Ayo Berlatih 1)", "Mencocokkan benda di atas penggaris dengan panjangnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari benda dan panjangnya.", "🃏", 12),
    C("tap-object-length", "Ketuk Benda dengan Panjang", "hlm. 111 (Ayo Berlatih 1)", "Menemukan benda yang panjangnya sama dengan bilangan yang diminta.", "Tiga ronde, tiap ronde tiga benda dan dua pertanyaan. Siswa mengetuk benda yang panjangnya sama dengan bilangan yang disebut.", "Ketuk benda dengan panjang itu.", "👆", 6),
    C("tap-all-tool", "Ketuk Semua yang Tepat dengan Alat", "hlm. 113–114 dan 117 (centang benda yang tepat diukur)", "Menemukan semua benda yang tepat diukur dengan penggaris atau meteran.", "Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok dengan alat yang disebut, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("board-length", "Papan Panjang Benda", "hlm. 111 (Ayo Berlatih 1)", "Menulis panjang benda pada papan puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang benda pada penggaris, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa.", "Isi papan dengan panjangnya.", "🗂️", 6),
    C("order-length", "Urutkan Benda menurut Panjang", "hlm. 118 (Ayo Berlatih 3: urutkan tinggi tanaman)", "Mengurutkan tiga benda menurut panjangnya.", "Tiga ronde, tiap ronde tiga benda di atas penggaris bertanda huruf. Siswa mengetuk benda satu per satu dari yang terpendek atau terpanjang.", "Ketuk benda menurut panjangnya.", "📶", 9),
    P("shift-bar-zero", "Geser Batang ke Nol", "hlm. 107 (Aktivitas 1, langkah 4 dan 5)", "Menggeser batang polos sampai ujung kirinya tepat di angka 0, lalu membaca panjangnya.", "Tiga ronde, tiap ronde dua soal. Batang polos di atas penggaris mulai dari angka selain nol. Siswa menekan geser kiri atau kanan sampai ujung batang di angka 0, lalu memilih panjang batang.", "Geser batang ke angka nol, lalu baca panjangnya.", "bar-shift", 3, 2),
    P("read-bar", "Baca Panjang Batang", "hlm. 107–108 (membaca panjang pada penggaris)", "Membaca panjang batang yang dimulai dari angka 0 pada penggaris.", "Tiga ronde, tiap ronde dua soal. Siswa memilih satu dari tiga panjang. Pengecoh salah satu sentimeter.", "Baca panjang batang.", "bar-read", 3, 2),
    P("tap-bar-end", "Ketuk Ujung Batang", "hlm. 107 (angka di ujung yang lain)", "Mengetuk angka pada garis penggaris tempat ujung batang berhenti.", "Tiga ronde, tiap ronde dua soal. Batang polos dimulai dari 0 dan panjangnya paling banyak 10 cm. Siswa mengetuk angka di ujung batang.", "Ketuk angka di ujung batang.", "bar-tap", 3, 2),
    P("match-bar-length", "Jodohkan Batang dan Panjang", "hlm. 111 (Ayo Berlatih 1)", "Menjodohkan batang pada penggaris dengan panjangnya.", "Tiga ronde, tiap ronde tiga batang dan tiga panjang. Siswa mengetuk batang, lalu mengetuk panjang yang cocok.", "Ketuk batang, lalu ketuk panjangnya.", "bar-match", 3, 3),
    P("memory-bar-length", "Memori Batang dan Panjang", "hlm. 111 (Ayo Berlatih 1)", "Mencocokkan batang pada penggaris dengan panjangnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari batang dan panjangnya.", "bar-memory", 3, 4),
    P("sort-length-tool", "Pilah Panjang: Penggaris atau Meteran", "hlm. 115–117 (penggaris atau meteran)", "Memilah ukuran panjang menjadi yang cocok diukur dengan penggaris dan yang cocok dengan meteran.", "Tiga ronde, tiap ronde enam ukuran (cm atau m) dan dua kotak. Panjang sampai 30 cm cocok dengan penggaris, selebihnya meteran. Siswa menyeret atau mengetuk ukuran ke kotak yang tepat.", "Pilah ukuran ke kotak yang tepat.", "length-sort", 3, 6),
    P("tap-all-bar-compare", "Ketuk Semua Batang Lebih atau Kurang", "hlm. 118 (Ayo Berlatih 3: paling pendek dan paling tinggi)", "Menemukan semua batang yang lebih atau kurang panjang dari bilangan acuan.", "Tiga ronde, tiap ronde empat batang dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "bar-select", 3, 4),
    P("order-measure-steps", "Urutkan Langkah Mengukur", "hlm. 107 (Aktivitas 1: langkah mengukur)", "Mengurutkan langkah mengukur panjang benda dengan penggaris atau meteran.", "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah.", "Ketuk langkah menurut urutannya.", "steps-order", 3, 4),
    P("board-bar-length", "Papan Panjang Batang", "hlm. 111 (Ayo Berlatih 1)", "Menulis panjang batang pada papan puluhan dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang batang pada penggaris, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa.", "Isi papan dengan panjangnya.", "bar-board", 3, 2),
    P("bar-difference", "Selisih Dua Batang", "hlm. 118 (Ayo Berlatih 3: urutkan dan bandingkan)", "Menghitung selisih panjang dua batang yang sama-sama dimulai dari angka 0.", "Tiga ronde, tiap ronde dua soal. Dua batang pada satu penggaris ditampilkan. Siswa memilih satu dari tiga selisih panjang.", "Pilih selisih panjang kedua batang.", "bar-compare", 3, 2),
    A("choose-unit", "Pilih Satuan Baku", "hlm. 108 dan 115 (satuan baku sentimeter dan meter)", "Memilih satuan baku yang tepat untuk mengukur panjang suatu benda.", "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang diukur, lalu memilih satu dari tiga satuan.", "Pilih satuan baku yang tepat.", "cm m", "SATUAN", "sentimeter • meter"),
    A("choose-tool-text", "Alat Ukur yang Tepat", "hlm. 109–110 dan 121–122 (nama alat ukur dan satuan)", "Memilih alat ukur yang tepat untuk mengukur suatu bagian atau benda.", "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang diukur, lalu memilih satu dari tiga alat ukur.", "Pilih alat ukur yang tepat.", "📏", "ALAT UKUR", "penggaris • meteran"),
    A("complete-measure-sentence", "Lengkapi Kalimat Pengukuran", "hlm. 107–110 (cara mengukur dan satuan baku)", "Melengkapi kalimat tentang cara mengukur dan alat ukur panjang.", "Tiga soal, tiap soal tiga kalimat, misalnya satuan baku pada penggaris adalah ... Siswa memilih satu dari tiga kata.", "Pilih kata untuk bagian kosong.", "…", "LENGKAPI", "cara • alat • satuan"),
    A("match-tool-text", "Jodohkan Benda dan Alat Ukur", "hlm. 109–111 dan 121–122 (bagian yang diukur dan nama alat ukur)", "Menjodohkan benda atau bagian yang diukur dengan alat ukurnya.", "Tiga ronde, tiap ronde tiga benda dan tiga alat ukur. Siswa mengetuk benda, lalu mengetuk alat ukur yang cocok.", "Ketuk benda, lalu ketuk alat ukurnya.", "= ?", "JODOHKAN", "benda • alat ukur"),
    A("memory-size", "Memori Benda dan Ukuran Wajar", "hlm. 111–122 (memperkirakan panjang)", "Mencocokkan benda dengan ukuran panjang yang wajar lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): benda dan ukurannya. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari benda dan ukurannya.", "cm", "MEMORI", "benda • ukuran"),
    A("true-false-length", "Benar atau Salah: Pengukuran Panjang", "hlm. 105–119 (penggaris, meteran, dan satuan baku)", "Menilai pernyataan tentang pengukuran panjang dengan penggaris dan meteran.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-length", "Detektif Pengukuran", "hlm. 107–118 (membaca dan menghitung panjang)", "Menemukan bilangan panjang dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk tentang angka pada penggaris dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-length", "Peta Konsep Pengukuran Panjang", "hlm. 104 (peta konsep Bab 3)", "Melengkapi peta konsep alat ukur panjang dan cara mengukur.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "alat • satuan • cara"),
    A("story-length", "Soal Cerita Pengukuran", "hlm. 118 (Ayo Berlatih 3: tinggi tanaman dan perbandingan panjang)", "Menyelesaikan soal cerita tentang selisih dan jumlah panjang dalam sentimeter.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam sentimeter.", "Baca cerita, lalu pilih hasilnya.", "cm", "CERITA", "selisih • jumlah"),
    A("sentence-length", "Susun Kata Pengukuran", "hlm. 105–119 (pengertian pengukuran panjang)", "Menyusun kalimat tentang pengukuran panjang dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat pengukuran"),
  ],
  poin: [
    { ikon: "📐", nama: "Satuan baku panjang", isi: "sentimeter (cm) dan meter (m)", suara: "Satuan baku panjang adalah sentimeter dan meter. Satuan baku sama untuk semua orang." },
    { ikon: "0️⃣", nama: "Mulai dari nol", isi: "ujung benda di angka 0", suara: "Letakkan ujung benda tepat di angka nol pada penggaris atau meteran." },
    { ikon: "🔍", nama: "Baca panjang", isi: "angka di ujung yang lain", suara: "Panjang benda adalah angka di ujung benda yang lain, ditulis dengan satuan." },
    { ikon: "📏", nama: "Penggaris", isi: "untuk benda pendek", suara: "Penggaris dipakai untuk mengukur benda yang pendek dan memakai satuan sentimeter." },
    { ikon: "🧰", nama: "Meteran", isi: "untuk benda panjang", suara: "Meteran dipakai untuk benda yang lebih panjang dari penggaris dan memakai satuan meter dan sentimeter." },
  ],
  poinSuara:
    "Ingat selalu! Satuan baku panjang adalah sentimeter dan meter. Letakkan ujung benda tepat di angka nol, lalu baca angka di ujung yang lain. Penggaris dipakai untuk benda pendek. Meteran dipakai untuk benda yang lebih panjang dari penggaris.",
  cara: {
    suara: "Cara mengukur. Pilih alat ukur yang tepat. Letakkan ujung benda di angka nol. Baca angka di ujung yang lain. Lalu tulis hasilnya dengan satuan.",
    potongan: [
      { teks: "pilih alat ukur", warna: "#BAE6FD" },
      { teks: "mulai dari nol", warna: "#FECACA" },
      { teks: "baca ujung lain", warna: "#BFDBFE" },
      { teks: "tulis satuan", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ukurlah panjang pensil, penghapus, dan buku tulismu dengan penggaris. Letakkan ujung benda di angka nol, baca angka di ujung yang lain, lalu tulis hasilnya dengan cm. Ukur juga tinggi pintu rumah dengan meteran bersama orang tuamu dan tulis hasilnya dengan satuan meter dan sentimeter.",
  refleksi: [
    "Aku dapat memilih alat ukur yang tepat untuk benda pendek dan benda panjang.",
    "Aku dapat meletakkan ujung benda di angka nol.",
    "Aku dapat membaca panjang benda dan menulisnya dengan satuan.",
    "Aku dapat membandingkan dan mengurutkan panjang benda.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Hubungan antarsatuan baku panjang                             */
/* ====================================================================== */

export const SUB_B33: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Hubungan Antarsatuan Baku Panjang)",
  fullTitle: "Sub-Bab B: Hubungan Antarsatuan Baku Panjang",
  targetDescription:
    "Siswa memahami bahwa 100 sentimeter sama dengan 1 meter, mengubah meter ke sentimeter dengan mengalikan 100 dan sentimeter ke meter dengan membagi 100, menulis ukuran dengan meter dan sentimeter bersama, serta menjumlahkan dan mengurangkan ukuran panjang pada soal cerita.",
  secondaryBg: "#FCE7F3",
  secondaryBorder: "#DB2777",
  secondaryText: "#831843",
  silabus: {
    teksSuara: `Kita belajar hubungan antarsatuan baku panjang. Meteran memakai satuan meter dan sentimeter. Seratus sentimeter sama dengan satu meter. Kita belajar mengubah meter ke sentimeter dan sebaliknya, menulis ukuran dengan meter dan sentimeter bersama, serta menjumlahkan dan mengurangkan ukuran panjang. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menghubungkan sentimeter dan meter serta menghitung ukuran panjang gabungan.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab B hlm. 119–123) dan Buku Panduan Guru Bab 3 Topik B.",
  },
  videos: [
    {
      id: "K3B3B-V1",
      judul: "Meteran dan Penggaris",
      subjudul: "100 sentimeter sama dengan 1 meter",
      adegan: [
        {
          id: "K3B3B-V1-1",
          judul: "Memakai meteran",
          ketukan: [
            "Pak Guru menjelaskan cara menggunakan meteran.",
            "Cara menggunakan meteran sama dengan cara menggunakan penggaris.",
            "Mulailah dari angka 0.",
            "Satuan apa yang digunakan meteran?",
          ],
          papan: ["Cara memakai meteran", "Sama dengan penggaris", "Mulai dari 0", "Satuan meteran?"],
        },
        {
          id: "K3B3B-V1-2",
          judul: "Seratus sentimeter",
          ketukan: [
            "Perhatikan meteran dari angka 0 sampai angka 100.",
            "Pada gambar, 100 sentimeter sama dengan 1 meter.",
            "Ditulis 100 cm = 1 m atau 1 m = 100 cm.",
            "Dua meter sama dengan 200 sentimeter.",
          ],
          papan: ["Meteran 0 sampai 100", "100 cm = 1 m", "1 m = 100 cm", "2 m = 200 cm"],
        },
        {
          id: "K3B3B-V1-3",
          judul: "Panjang pintu",
          ketukan: [
            "Bapak Meutia mengukur pintu dengan meteran.",
            "Ujung pintu menunjukkan bilangan 200 sentimeter.",
            "Seratus sentimeter sama dengan satu meter.",
            "Jadi, 200 cm sama dengan 2 m.",
          ],
          papan: ["Pintu diukur meteran", "Menunjukkan 200 cm", "100 cm = 1 m", "200 cm = 2 m"],
        },
      ],
    },
    {
      id: "K3B3B-V2",
      judul: "Mengubah Satuan",
      subjudul: "Meter ke sentimeter dan sebaliknya",
      adegan: [
        {
          id: "K3B3B-V2-1",
          judul: "Dari meter ke sentimeter",
          ketukan: [
            "Satu meter sama dengan seratus sentimeter.",
            "Untuk mengubah meter ke sentimeter, kalikan dengan 100.",
            "Misalnya 3 m = 3 × 100 cm = 300 cm.",
            "Dan 4 m sama dengan 400 cm.",
          ],
          papan: ["1 m = 100 cm", "Meter ke cm: kali 100", "3 m = 300 cm", "4 m = 400 cm"],
        },
        {
          id: "K3B3B-V2-2",
          judul: "Dari sentimeter ke meter",
          ketukan: [
            "Untuk mengubah sentimeter ke meter, bagilah dengan 100.",
            "Misalnya 700 cm dibagi 100 sama dengan 7 m.",
            "Dan 900 cm sama dengan 9 m.",
            "Jarak antara dua benda juga dapat diubah dengan cara yang sama.",
          ],
          papan: ["Cm ke meter: bagi 100", "700 cm = 7 m", "900 cm = 9 m", "Jarak juga bisa diubah"],
        },
        {
          id: "K3B3B-V2-3",
          judul: "Meter dan sentimeter",
          ketukan: [
            "Tinggi badan Azizah adalah 1 m 17 cm.",
            "1 m sama dengan 100 cm, jadi 100 + 17 = 117 cm.",
            "Tinggi badan Eri 115 cm, jadi ditulis 1 m 15 cm.",
            "Ukuran panjang dapat ditulis dengan meter dan sentimeter.",
          ],
          papan: ["Azizah 1 m 17 cm", "100 + 17 = 117 cm", "Eri 115 cm = 1 m 15 cm", "Meter dan sentimeter"],
        },
      ],
    },
    {
      id: "K3B3B-V3",
      judul: "Menyambung dan Memotong",
      subjudul: "Menghitung ukuran panjang",
      adegan: [
        {
          id: "K3B3B-V3-1",
          judul: "Menyambung pita",
          ketukan: [
            "Meutia menyambung dua utas pita.",
            "Pita pertama panjangnya 4 m 37 cm.",
            "Pita kedua panjangnya 7 m 43 cm.",
            "Berapa panjang pita setelah disambung?",
          ],
          papan: ["Meutia menyambung pita", "Pita 1: 4 m 37 cm", "Pita 2: 7 m 43 cm", "Panjang gabungan?"],
        },
        {
          id: "K3B3B-V3-2",
          judul: "Jumlahkan",
          ketukan: [
            "Jumlahkan meter dengan meter: 4 + 7 = 11 m.",
            "Jumlahkan sentimeter dengan sentimeter: 37 + 43 = 80 cm.",
            "Panjang pita setelah disambung adalah 11 m 80 cm.",
            "Jumlahkan dulu satuan yang sama.",
          ],
          papan: ["4 m + 7 m = 11 m", "37 cm + 43 cm = 80 cm", "Hasil 11 m 80 cm", "Satuan yang sama"],
        },
        {
          id: "K3B3B-V3-3",
          judul: "Kain katun",
          ketukan: [
            "Penjaga toko punya kain katun 75 m 80 cm.",
            "Ia menjual 38 m 45 cm kain itu.",
            "Kurangkan: 75 m 80 cm dikurangi 38 m 45 cm.",
            "Sisa kain adalah 37 m 35 cm.",
          ],
          papan: ["Kain 75 m 80 cm", "Terjual 38 m 45 cm", "Dikurangkan", "Sisa 37 m 35 cm"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengingat Cara Memakai Meteran",
      stepDesc:
        "Pak Guru menjelaskan bahwa cara menggunakan meteran sama dengan cara menggunakan penggaris. Mulailah dari angka 0, lalu baca angka di ujung benda yang lain. Meteran memakai satuan meter dan sentimeter. Pertanyaannya, apa hubungan antara satuan meter dan satuan sentimeter yang dipakai penggaris dan meteran?",
      icon: "🔙",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Seratus Sentimeter Sama dengan Satu Meter",
      stepDesc:
        "Pada meteran dari angka 0 sampai angka 100, kita dapat melihat bahwa 100 sentimeter sama dengan 1 meter. Ditulis 100 cm = 1 m atau 1 m = 100 cm. Dua meter sama dengan 200 sentimeter, sebab dua kali 100 sentimeter. Hubungan ini adalah dasar semua perubahan satuan panjang.",
      icon: "📏",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Meter ke Sentimeter",
      stepDesc:
        "Untuk mengubah meter ke sentimeter, kalikan dengan 100. Misalnya 3 m = 3 × 100 cm = 300 cm dan 4 m = 400 cm. Bilangan di belakang meter makin besar karena sentimeter adalah satuan yang lebih kecil. Pada Ayo Berlatih, 10 m sama dengan 1.000 cm.",
      icon: "✖️",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Sentimeter ke Meter",
      stepDesc:
        "Untuk mengubah sentimeter ke meter, bagilah dengan 100. Misalnya 700 cm dibagi 100 sama dengan 7 m dan 900 cm sama dengan 9 m. Panjang kebun jagung Paman Meutia 5.000 cm sama dengan 50 m. Meteran juga dapat dipakai untuk mengukur jarak antara dua benda, dan jarak itu dapat diubah satuannya.",
      icon: "➗",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Meter dan Sentimeter Bersama",
      stepDesc:
        "Ukuran panjang dapat ditulis dengan meter dan sentimeter bersama, misalnya 1 m 17 cm. Untuk mengubahnya ke sentimeter: 1 m 17 cm = 100 cm + 17 cm = 117 cm. Sebaliknya 115 cm = 100 cm + 15 cm = 1 m 15 cm. Pada tabel tinggi badan, Azizah 1 m 17 cm, Ubay 1 m 20 cm, Fatim 1 m, dan Lilik 1 m 5 cm.",
      icon: "🧍",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Menjumlahkan Ukuran Panjang",
      stepDesc:
        "Meutia menyambung dua utas pita: 4 m 37 cm dan 7 m 43 cm. Jumlahkan satuan yang sama. Meter dengan meter: 4 + 7 = 11 m. Sentimeter dengan sentimeter: 37 + 43 = 80 cm. Hasilnya 11 m 80 cm. Bila jumlah sentimeter lebih dari 100, ubah 100 cm menjadi 1 meter dan tambahkan ke meter.",
      icon: "➕",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Mengurangkan Ukuran Panjang",
      stepDesc:
        "Penjaga toko punya kain katun 75 m 80 cm dan menjual 38 m 45 cm. Kurangkan satuan yang sama. Meter: 75 − 38 = 37 m. Sentimeter: 80 − 45 = 35 cm. Sisa kain 37 m 35 cm. Bila sentimeter yang dikurangkan lebih besar, kita meminjam 1 meter yang sama dengan 100 cm.",
      icon: "➖",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Membandingkan Ukuran Panjang",
      stepDesc:
        "Untuk membandingkan dua ukuran, ubah keduanya ke satuan yang sama, misalnya sentimeter. Pada tabel tinggi badan, terpendek adalah Fatim dengan 100 cm, dan yang lebih tinggi dari Azizah (117 cm) adalah Ubay (120 cm) dan Sanam (130 cm). Lalu urutkan nama dari yang tertinggi hingga yang terendah.",
      icon: "⚖️",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    { judul: "Meteran", emoji: "📏", countNum: 2, countWord: "Dua", suara: "Meteran dipakai seperti penggaris, mulai dari angka nol. Satuannya meter dan sentimeter." },
    { judul: "100 cm = 1 m", emoji: "💯", countNum: 3, countWord: "Tiga", suara: "Seratus sentimeter sama dengan satu meter. Dua meter sama dengan dua ratus sentimeter." },
    { judul: "Meter ke Sentimeter", emoji: "✖️", countNum: 3, countWord: "Tiga", suara: "Untuk mengubah meter ke sentimeter, kalikan dengan seratus. Tiga meter sama dengan tiga ratus sentimeter." },
    { judul: "Sentimeter ke Meter", emoji: "➗", countNum: 3, countWord: "Tiga", suara: "Untuk mengubah sentimeter ke meter, bagilah dengan seratus. Tujuh ratus sentimeter sama dengan tujuh meter." },
    { judul: "1 m 17 cm", emoji: "🧍", countNum: 3, countWord: "Tiga", suara: "Satu meter tujuh belas sentimeter sama dengan seratus ditambah tujuh belas, yaitu seratus tujuh belas sentimeter." },
    { judul: "Garis Meteran", emoji: "📈", countNum: 2, countWord: "Dua", suara: "Pada garis meteran, tiap seratus sentimeter ditandai satu meter. Batang yang sampai angka dua meter panjangnya dua ratus sentimeter." },
    { judul: "Menjumlahkan", emoji: "➕", countNum: 3, countWord: "Tiga", suara: "Jumlahkan meter dengan meter dan sentimeter dengan sentimeter. Empat meter tiga puluh tujuh senti ditambah tujuh meter empat puluh tiga senti sama dengan sebelas meter delapan puluh senti." },
    { judul: "Mengurangkan", emoji: "➖", countNum: 3, countWord: "Tiga", suara: "Kurangkan meter dengan meter dan sentimeter dengan sentimeter. Tujuh puluh lima meter delapan puluh senti dikurangi tiga puluh delapan meter empat puluh lima senti sama dengan tiga puluh tujuh meter tiga puluh lima senti." },
    { judul: "Membandingkan", emoji: "⚖️", countNum: 2, countWord: "Dua", suara: "Untuk membandingkan, ubah dua ukuran ke satuan yang sama, misalnya sentimeter, lalu bandingkan bilangannya." },
    { judul: "Cara Mengubah", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, ingat satu meter sama dengan seratus sentimeter. Dua, meter ke sentimeter kalikan seratus. Tiga, sentimeter ke meter bagi seratus. Empat, periksa dengan cara sebaliknya." },
  ],
  games: [
    C("build-ribbon", "Rakit Panjang Pita", "hlm. 120–121 (100 cm = 1 m)", "Merakit pita dari potongan 1 meter, 10 sentimeter, dan 1 sentimeter sampai sepanjang yang diminta.", "Tiga ronde, tiap ronde dua soal. Siswa membaca panjang pita dalam sentimeter, lalu merakitnya dengan tombol tambah dan kurang. Sepuluh potongan kecil otomatis ditukar potongan yang lebih besar.", "Rakit pita sepanjang yang diminta.", "🎀", 6),
    C("count-ribbon-cm", "Hitung Panjang dalam Sentimeter", "hlm. 120–121 (meter dan sentimeter)", "Menghitung panjang pita dalam sentimeter dari potongan meter, sepuluh sentimeter, dan sentimeter.", "Tiga ronde, tiap ronde dua soal. Gambar pita ditampilkan. Siswa memilih satu dari tiga panjang. Pengecoh lebih atau kurang sepuluh.", "Hitung panjang pita dalam sentimeter.", "🔢", 6),
    C("meter-to-cm", "Ubah Meter ke Sentimeter", "hlm. 121 (3 m = ... cm)", "Mengubah ukuran meter ke sentimeter dengan gambar pita.", "Tiga ronde, tiap ronde dua soal. Gambar pita berpotongan satu meter ditampilkan. Siswa memilih satu dari tiga hasil. Pengecoh lupa mengalikan 100.", "Ubah meter ke sentimeter.", "✖️", 6),
    C("cm-to-meter", "Ubah Sentimeter ke Meter", "hlm. 121 (900 cm = ... m)", "Mengubah ukuran sentimeter ke meter dengan gambar pita.", "Tiga ronde, tiap ronde dua soal. Gambar pita ditampilkan. Siswa memilih satu dari tiga hasil. Pengecoh salah membagi.", "Ubah sentimeter ke meter.", "➗", 6),
    C("match-ribbon-length", "Jodohkan Pita dan Panjang", "hlm. 120–122 (ukuran panjang)", "Menjodohkan gambar pita dengan panjangnya dalam sentimeter.", "Tiga ronde, tiap ronde tiga pita dan tiga panjang. Siswa mengetuk pita, lalu mengetuk panjang yang cocok.", "Ketuk pita, lalu ketuk panjangnya.", "🔗", 9),
    C("memory-ribbon-length", "Memori Pita dan Panjang", "hlm. 120–122 (ukuran panjang)", "Mencocokkan gambar pita dengan panjangnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari pita dan panjangnya.", "🃏", 12),
    C("tap-ribbon-length", "Ketuk Pita dengan Panjang", "hlm. 122 (tinggi badan dalam meter dan sentimeter)", "Menemukan pita yang panjangnya sama dengan ukuran yang diminta, ditulis dengan meter dan sentimeter.", "Tiga ronde, tiap ronde tiga pita dan dua pertanyaan. Siswa mengetuk pita yang panjangnya sama dengan ukuran yang disebut.", "Ketuk pita dengan panjang itu.", "👆", 6),
    C("tap-all-equal", "Ketuk Semua yang Sama Panjang", "hlm. 120–122 (satu ukuran ditulis dengan beberapa cara)", "Menemukan semua ukuran yang sama panjang dengan ukuran acuan, walau ditulis berbeda.", "Tiga ronde, tiap ronde empat pita dan satu perintah. Siswa mengetuk semua yang sama panjang dengan acuan, lalu menekan Periksa.", "Ketuk semua yang sama, lalu periksa.", "✔️", 3),
    C("board-cm", "Papan Sentimeter", "hlm. 122 (tabel tinggi badan dalam sentimeter)", "Mengubah meter dan sentimeter menjadi sentimeter pada papan ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Gambar pita ditampilkan. Siswa mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa.", "Isi papan dengan sentimeternya.", "🗂️", 6),
    C("order-ribbon", "Urutkan Pita menurut Panjang", "hlm. 122 (urutkan tinggi badan)", "Mengurutkan tiga pita menurut panjangnya.", "Tiga ronde, tiap ronde tiga pita bertanda huruf. Siswa mengetuk pita satu per satu dari yang terpendek atau terpanjang.", "Ketuk pita menurut panjangnya.", "📶", 9),
    P("count-meter-line", "Hitung Garis Meteran", "hlm. 120 (meteran 100 cm = 1 m)", "Menghitung panjang batang pada garis meteran dalam sentimeter.", "Tiga ronde, tiap ronde dua soal. Garis meteran bertanda tiap 50 cm dan batang berwarna ditampilkan. Siswa memilih satu dari tiga panjang.", "Hitung panjang batang pada garis.", "meter-count", 3, 2),
    P("complete-convert-sentence", "Lengkapi Kalimat Ubah Satuan", "hlm. 121 (ubahlah satuan sentimeter ke dalam satuan meter)", "Melengkapi kalimat yang mengubah sentimeter menjadi meter dan sentimeter.", "Tiga soal, tiap soal tiga kalimat, misalnya 117 cm = 100 cm + ... cm. Siswa memilih satu dari tiga angka untuk bagian kosong.", "Pilih angka untuk bagian kosong.", "convert-sentence", 3, 3),
    P("match-line-size", "Jodohkan Garis dan Ukuran", "hlm. 120–122 (ukuran panjang)", "Menjodohkan garis meteran dengan ukuran yang ditulis dengan meter dan sentimeter.", "Tiga ronde, tiap ronde tiga garis dan tiga ukuran. Siswa mengetuk garis, lalu mengetuk ukuran yang cocok.", "Ketuk garis, lalu ketuk ukurannya.", "meter-match", 3, 3),
    P("memory-line-size", "Memori Garis dan Ukuran", "hlm. 120–122 (ukuran panjang)", "Mencocokkan garis meteran dengan ukurannya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari garis dan ukurannya.", "meter-memory", 3, 4),
    P("fill-height-table", "Isi Tabel Ubah Ukuran", "hlm. 122 (tabel tinggi badan Azizah dan teman-temannya)", "Melengkapi tabel ukuran panjang dalam meter dan sentimeter.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu ukuran yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu ukuran.", "size-table", 3, 4),
    P("tap-all-equal-size", "Ketuk Semua Ukuran yang Sama", "hlm. 120–122 (satu ukuran ditulis dengan beberapa cara)", "Menemukan semua ukuran yang sama dengan ukuran acuan, walau ditulis berbeda.", "Tiga ronde, tiap ronde empat ukuran dan satu perintah. Siswa mengetuk semua yang sama dengan acuan, lalu menekan Periksa.", "Ketuk semua yang sama, lalu periksa.", "size-select", 3, 4),
    P("sort-whole-meter", "Pilah Ukuran: Pas Meter atau Bersisa", "hlm. 121–122 (meter dan sentimeter)", "Memilah ukuran sentimeter menjadi yang pas dalam meter dan yang masih bersisa sentimeter.", "Tiga ronde, tiap ronde enam ukuran dan dua kotak. Ukuran yang habis dibagi 100 pas dalam meter. Siswa menyeret atau mengetuk ukuran ke kotak yang tepat.", "Pilah ukuran ke kotak yang tepat.", "size-sort", 3, 6),
    P("order-convert-steps", "Urutkan Langkah Mengubah Satuan", "hlm. 121 (mengubah satuan dan menjumlahkan ukuran)", "Mengurutkan langkah mengubah satuan panjang dan menjumlahkan ukuran.", "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah.", "Ketuk langkah menurut urutannya.", "steps-order", 3, 4),
    P("board-line-cm", "Papan Sentimeter dari Garis", "hlm. 120 (meteran 0 sampai 200 cm)", "Menulis panjang batang pada garis meteran dalam sentimeter pada papan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca garis meteran, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa.", "Isi papan dengan sentimeternya.", "meter-board", 3, 2),
    P("join-two-ribbons", "Sambung Dua Garis", "hlm. 123 (menyambung dua utas pita)", "Menghitung panjang dua batang yang disambung pada garis meteran.", "Tiga ronde, tiap ronde dua soal. Dua batang yang disambung pada garis meteran ditampilkan. Siswa memilih satu dari tiga panjang gabungan.", "Pilih panjang setelah disambung.", "meter-join", 3, 2),
    A("meter-to-cm-abstract", "Ubah Meter ke Sentimeter: Lambang", "hlm. 121 (4 m = ... cm)", "Mengubah meter ke sentimeter dan memilih hasilnya dari tiga pilihan.", "Tiga ronde, tiap ronde dua soal, misalnya 4 m = ... cm. Pengecoh lupa mengalikan 100 atau mengalikan 1.000.", "Pilih hasil perubahan meter ke sentimeter.", "4 m", "METER KE CM", "kali 100"),
    A("cm-to-m-cm", "Ubah Sentimeter ke Meter dan Sentimeter", "hlm. 122 (tabel tinggi badan: Eri 115 cm = 1 m 15 cm)", "Menulis ukuran sentimeter sebagai meter dan sentimeter.", "Tiga ronde, tiap ronde dua soal, misalnya 135 cm = ... m ... cm. Pengecoh salah menaruh angka.", "Pilih ukuran dalam meter dan sentimeter.", "135 cm", "M DAN CM", "ratusan • sisa"),
    A("board-convert", "Papan Ubah Satuan", "hlm. 122 (tinggi badan dalam sentimeter)", "Mengubah meter dan sentimeter menjadi sentimeter pada papan.", "Tiga ronde, tiap ronde dua soal, misalnya 2 m 40 cm = ... cm. Siswa mengatur angka ratusan, puluhan, dan satuan lalu menekan Periksa.", "Isi papan dengan sentimeternya.", "…", "PAPAN", "ratusan • puluhan • satuan"),
    A("match-size", "Jodohkan Ukuran", "hlm. 121–122 (ubah meter dan sentimeter)", "Menjodohkan ukuran meter dengan ukuran sentimeter yang sama.", "Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya.", "Ketuk ukuran, lalu ketuk pasangannya.", "= ?", "JODOHKAN", "m • cm"),
    A("memory-size-b", "Memori Ukuran", "hlm. 121–122 (ukuran yang sama)", "Mencocokkan dua cara menulis ukuran yang sama lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari ukuran yang sama.", "m cm", "MEMORI", "ukuran yang sama"),
    A("true-false-meter", "Benar atau Salah: Meter dan Sentimeter", "hlm. 120–123 (hubungan meter dan sentimeter)", "Menilai pernyataan tentang hubungan meter dan sentimeter serta ukuran gabungan.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-meter", "Detektif Satuan Panjang", "hlm. 120–122 (ubah satuan panjang)", "Menemukan bilangan hasil perubahan satuan dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk tentang perubahan satuan dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-meter", "Peta Konsep Satuan Panjang", "hlm. 104 (peta konsep Bab 3)", "Melengkapi peta konsep hubungan meter dan sentimeter serta ukuran gabungan.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "m • cm • gabungan"),
    A("story-meter", "Soal Cerita Satuan Panjang", "hlm. 123 (menyambung pita, kain katun, dan kebun jagung)", "Menyelesaikan soal cerita yang menjumlahkan, mengurangkan, atau mengubah ukuran panjang.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil. Pengecoh lupa menyimpan atau salah mengubah.", "Baca cerita, lalu pilih hasilnya.", "m cm", "CERITA", "jumlah • selisih • ubah"),
    A("sentence-meter", "Susun Kata Satuan Panjang", "hlm. 120–122 (hubungan meter dan sentimeter)", "Menyusun kalimat tentang hubungan meter dan sentimeter dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat satuan panjang"),
  ],
  poin: [
    { ikon: "💯", nama: "Meter dan sentimeter", isi: "1 m = 100 cm", suara: "Satu meter sama dengan seratus sentimeter. Dua meter sama dengan dua ratus sentimeter." },
    { ikon: "✖️", nama: "Meter ke sentimeter", isi: "3 m = 3 × 100 cm = 300 cm", suara: "Untuk mengubah meter ke sentimeter, kalikan dengan seratus." },
    { ikon: "➗", nama: "Sentimeter ke meter", isi: "700 cm : 100 = 7 m", suara: "Untuk mengubah sentimeter ke meter, bagilah dengan seratus." },
    { ikon: "🧍", nama: "Meter dan sentimeter bersama", isi: "1 m 17 cm = 117 cm", suara: "Ukuran dapat ditulis dengan meter dan sentimeter bersama. Satu meter tujuh belas senti sama dengan seratus tujuh belas sentimeter." },
    { ikon: "➕", nama: "Jumlahkan satuan sama", isi: "4 m 37 cm + 7 m 43 cm = 11 m 80 cm", suara: "Jumlahkan meter dengan meter dan sentimeter dengan sentimeter. Lalu tulis hasilnya." },
  ],
  poinSuara:
    "Ingat selalu! Satu meter sama dengan seratus sentimeter. Untuk mengubah meter ke sentimeter, kalikan dengan seratus. Untuk mengubah sentimeter ke meter, bagi dengan seratus. Saat menjumlahkan atau mengurangkan, hitung satuan yang sama bersama-sama.",
  cara: {
    suara: "Cara mengubah satuan. Ingat satu meter sama dengan seratus sentimeter. Meter ke sentimeter, kalikan seratus. Sentimeter ke meter, bagi seratus. Lalu periksa dengan cara sebaliknya.",
    potongan: [
      { teks: "1 m = 100 cm", warna: "#BAE6FD" },
      { teks: "meter ke cm: kali", warna: "#FECACA" },
      { teks: "cm ke meter: bagi", warna: "#BFDBFE" },
      { teks: "periksa", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ukurlah tinggi badanmu dengan meteran bersama orang tuamu. Tulis hasilnya dengan meter dan sentimeter, lalu ubah menjadi sentimeter saja. Ukur juga lebar pintu dan panjang meja. Tulis tiap hasil dengan dua cara, misalnya 1 m 17 cm dan 117 cm.",
  refleksi: [
    "Aku tahu bahwa 1 meter sama dengan 100 sentimeter.",
    "Aku dapat mengubah meter ke sentimeter dan sebaliknya.",
    "Aku dapat menulis ukuran dengan meter dan sentimeter bersama.",
    "Aku dapat menjumlahkan dan mengurangkan ukuran panjang.",
  ],
};

export const SUB_BAB_K3B3: SubBabNaskah[] = [SUB_A33, SUB_B33];

/** Semua adegan video, urut sub-bab, video, adegan. Dipakai uji. */
export const semuaAdeganK3B3 = SUB_BAB_K3B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
