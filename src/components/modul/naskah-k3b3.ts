/**
 * Naskah murni Matematika Kelas 3 Bab 3 (Pengukuran Panjang dan Berat): Sub-Bab A (Pengukuran Panjang dengan Satuan
 * Baku), B (Hubungan Antarsatuan Baku Panjang), C (Pengukuran Berat dengan Satuan Baku), dan D (Hubungan Antarsatuan Baku Berat). Sumber: Buku Siswa Matematika Kelas III Kemendikbudristek, Bab 3 hlm. 105-140, serta Buku Panduan
 * Guru Bab 3, diperkaya dengan benda nyata di atas penggaris, geser ke angka nol, batang polos pada penggaris, garis
 * meteran, pita tersusun dari potongan meter, sepuluh sentimeter, dan sentimeter, bagan operasi ukuran gabungan, timbangan digital dan timbangan duduk, serta bandul timbangan kodok.
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

/* ====================================================================== */
/* SUB-BAB C. Pengukuran berat dengan satuan baku                           */
/* ====================================================================== */

const ALUR_C = ["Mengingat berat benda", "Timbangan alat ukur berat", "Satuan baku berat", "Gram untuk benda ringan", "Kilogram untuk benda berat", "Berbagai jenis timbangan", "Memilih timbangan yang tepat", "Menimbang dari angka nol", "Siap menimbang dengan satuan baku"];
const ALUR_D = ["Mengingat satuan baku berat", "Timbangan kodok dan bandul", "Jenis bandul", "Kilogram dan gram", "Kilogram dan ons", "Ons dan gram", "Kilogram ke gram", "Gram ke kilogram", "Siap mengubah satuan berat"];

export const SUB_C33: SubBabNaskah = {
  id: "C",
  codeTitle: "Sub-Bab C (Pengukuran Berat dengan Satuan Baku)",
  fullTitle: "Sub-Bab C: Pengukuran Berat dengan Satuan Baku",
  targetDescription:
    "Siswa mengenal timbangan sebagai alat ukur berat (timbangan digital, timbangan duduk, timbangan kodok, dan timbangan badan), mengenal satuan baku berat gram dan kilogram, menimbang dengan memulai dari angka nol, membaca berat pada layar dan jarum, serta memilih timbangan dan satuan yang tepat untuk benda ringan dan benda berat.",
  secondaryBg: "#DCFCE7",
  secondaryBorder: "#16A34A",
  secondaryText: "#14532D",
  silabus: {
    teksSuara: `Kita belajar mengukur berat dengan satuan baku. Kita mengenal timbangan sebagai alat ukur berat, dan satuan baku gram dan kilogram. Kita belajar menimbang dari angka nol, membaca berat pada layar dan jarum, serta memilih timbangan yang tepat. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menimbang benda dengan berbagai timbangan dan memilih satuan gram atau kilogram.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab C hlm. 124–134) dan Buku Panduan Guru Bab 3 Topik C.",
  },
  videos: [
    {
      id: "K3B3C-V1",
      judul: "Menimbang Isi Tas",
      subjudul: "Aktivitas 2: pengukuran berat",
      adegan: [
        {
          id: "K3B3C-V1-1",
          judul: "Keluarkan isi tas",
          ketukan: [
            "Satu kelompok beranggotakan tiga sampai lima orang.",
            "Keluarkan barang-barang dari tas dan letakkan di atas meja.",
            "Siapkan timbangan digital sebagai alat ukur.",
            "Kita akan mengukur berat setiap barang.",
          ],
          papan: ["Kelompok 3 sampai 5 orang", "Barang dari tas di atas meja", "Timbangan digital", "Ukur berat tiap barang"],
        },
        {
          id: "K3B3C-V1-2",
          judul: "Timbang barangnya",
          ketukan: [
            "Letakkan satu barang di atas timbangan digital.",
            "Lihat angka yang muncul pada layar timbangan.",
            "Angka itu adalah berat barang.",
            "Tulis nama barang dan beratnya pada tabel.",
          ],
          papan: ["Barang di atas timbangan", "Lihat angka pada layar", "Angka = berat barang", "Tulis di tabel"],
        },
        {
          id: "K3B3C-V1-3",
          judul: "Satuan berat",
          ketukan: [
            "Setelah semua barang ditimbang, presentasikan hasilnya.",
            "Satuan apa yang dipakai pada timbangan?",
            "Satuan baku berat adalah gram dan kilogram.",
            "Gram ditulis g dan kilogram ditulis kg.",
          ],
          papan: ["Presentasikan hasilnya", "Satuan pada timbangan?", "Gram dan kilogram", "g dan kg"],
        },
      ],
    },
    {
      id: "K3B3C-V2",
      judul: "Alat Ukur Berat",
      subjudul: "Timbangan di pasar dan di dapur",
      adegan: [
        {
          id: "K3B3C-V2-1",
          judul: "Ke pasar",
          ketukan: [
            "Meutia pergi ke pasar untuk berbelanja.",
            "Penjual menimbang barang dagangannya dengan timbangan.",
            "Timbangan apa yang dipakai penjual di pasar?",
            "Ada timbangan kodok, timbangan duduk, dan timbangan digital.",
          ],
          papan: ["Meutia ke pasar", "Penjual menimbang dagangan", "Timbangan apa?", "Kodok, duduk, digital"],
        },
        {
          id: "K3B3C-V2-2",
          judul: "Nama dan satuan",
          ketukan: [
            "Timbangan kodok memakai bandul sebagai ukuran berat.",
            "Timbangan duduk memakai jarum yang menunjuk angka.",
            "Timbangan digital menampilkan angka pada layar.",
            "Semua timbangan itu memakai satuan gram atau kilogram.",
          ],
          papan: ["Kodok: bandul", "Duduk: jarum", "Digital: layar", "Satuan: g atau kg"],
        },
        {
          id: "K3B3C-V2-3",
          judul: "Gram atau kilogram",
          ketukan: [
            "Gram dipakai untuk benda yang ringan.",
            "Contohnya tepung, gula pasir, pensil, dan buku.",
            "Kilogram dipakai untuk benda yang lebih berat.",
            "Contohnya berat badan, karung beras, dan buah.",
          ],
          papan: ["Gram: benda ringan", "Tepung, gula, pensil, buku", "Kilogram: benda berat", "Berat badan, beras, buah"],
        },
      ],
    },
    {
      id: "K3B3C-V3",
      judul: "Bahan Kue Meutia",
      subjudul: "Membaca dan membandingkan berat",
      adegan: [
        {
          id: "K3B3C-V3-1",
          judul: "Menimbang bahan",
          ketukan: [
            "Meutia membantu ibunya membuat kue.",
            "Bahan kue yang ditimbang adalah gula, tepung, dan telur.",
            "Gula menunjukkan 1.000 gram dan tepung 1.250 gram.",
            "Telur menunjukkan 250 gram.",
          ],
          papan: ["Meutia membuat kue", "Gula, tepung, telur", "Gula 1.000 g, tepung 1.250 g", "Telur 250 g"],
        },
        {
          id: "K3B3C-V3-2",
          judul: "Mulai dari nol",
          ketukan: [
            "Sebelum menimbang, lihat angka awal pada timbangan.",
            "Jarum atau layar harus menunjukkan angka 0.",
            "Bila tidak dimulai dari nol, hasilnya keliru.",
            "Barulah letakkan benda di atas timbangan.",
          ],
          papan: ["Lihat angka awal", "Harus di angka 0", "Bukan dari 0, hasil keliru", "Baru letakkan benda"],
        },
        {
          id: "K3B3C-V3-3",
          judul: "Stroberi tambahan",
          ketukan: [
            "Timbangan pertama menunjukkan stroberi 100 gram.",
            "Timbangan kedua menunjukkan stroberi 500 gram.",
            "Berat stroberi tambahan adalah 500 dikurangi 100.",
            "Jadi stroberi tambahan beratnya 400 gram.",
          ],
          papan: ["Pertama: 100 g", "Kedua: 500 g", "500 − 100", "Tambahan: 400 g"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengingat Berat Benda",
      stepDesc:
        "Berat menunjukkan seberapa berat atau ringan sebuah benda. Kita sudah pernah membandingkan berat benda dengan satuan tidak baku, misalnya dengan batu atau kelereng. Hasilnya bisa berbeda karena ukuran benda pembanding tidak sama. Karena itu kita memerlukan alat ukur dan satuan baku yang sama untuk semua orang.",
      icon: "🔙",
      flowFrom: ALUR_C[0],
      flowTo: ALUR_C[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Timbangan Alat Ukur Berat",
      stepDesc:
        "Timbangan adalah alat untuk mengukur berat benda. Pada Aktivitas 2, setiap kelompok mengeluarkan barang dari tas, meletakkannya di atas timbangan digital, lalu membaca angka pada layar. Hasilnya ditulis pada tabel yang memuat nomor, nama barang, berat barang, dan satuan berat.",
      icon: "⚖️",
      flowFrom: ALUR_C[1],
      flowTo: ALUR_C[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Satuan Baku Berat",
      stepDesc:
        "Ukuran berat benda memiliki satuan baku. Satuan baku yang digunakan adalah gram atau kilogram. Gram dapat ditulis dengan g atau gr, dan kilogram ditulis dengan kg. Karena satuan baku sama untuk semua orang, hasil menimbang sama siapa pun yang menimbang.",
      icon: "📐",
      flowFrom: ALUR_C[2],
      flowTo: ALUR_C[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Gram untuk Benda Ringan",
      stepDesc:
        "Satuan gram digunakan untuk mengukur berat benda yang lebih ringan. Contohnya tepung, gula pasir, pensil, dan buku. Pada timbangan digital kita membaca angka gram pada layar, misalnya telur 250 gram atau stroberi 100 gram. Angka kecil lebih tepat ditulis dengan gram.",
      icon: "🥚",
      flowFrom: ALUR_C[3],
      flowTo: ALUR_C[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Kilogram untuk Benda Berat",
      stepDesc:
        "Satuan kilogram digunakan untuk mengukur berat benda yang lebih berat. Contohnya berat badan, karung berisi beras, dan buah. Pada timbangan duduk, jarum menunjuk angka kilogram. Bila jarum menunjuk angka 3, berat benda adalah 3 kilogram, ditulis 3 kg.",
      icon: "🍉",
      flowFrom: ALUR_C[4],
      flowTo: ALUR_C[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Berbagai Jenis Timbangan",
      stepDesc:
        "Penjual di pasar memakai timbangan kodok dengan bandul, timbangan duduk dengan jarum, atau timbangan digital dengan layar. Untuk berat badan dipakai timbangan badan. Ada juga timbangan besar bertuas untuk barang yang jauh lebih berat. Semua timbangan itu memakai satuan gram atau kilogram.",
      icon: "🛒",
      flowFrom: ALUR_C[5],
      flowTo: ALUR_C[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Memilih Timbangan yang Tepat",
      stepDesc:
        "Pilih timbangan sesuai bendanya. Meutia dan ibu memetik apel, jagung, tomat, kacang-kacangan, wortel, dan stroberi di kebun, lalu memilih timbangan yang cocok untuk sayuran dan buah. Benda ringan seperti tepung dan telur memakai timbangan digital. Berat badan memakai timbangan badan.",
      icon: "✅",
      flowFrom: ALUR_C[6],
      flowTo: ALUR_C[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Menimbang dari Angka Nol",
      stepDesc:
        "Kesalahan yang sering terjadi adalah menimbang tanpa mulai dari angka 0. Sebelum menimbang, pastikan jarum atau layar tepat di angka 0. Lalu letakkan benda, tunggu angka diam, baca beratnya, dan tulis dengan satuan. Pada Ayo Berlatih, gula 1.000 gram, tepung 1.250 gram, dan telur 250 gram.",
      icon: "0️⃣",
      flowFrom: ALUR_C[7],
      flowTo: ALUR_C[8],
    },
  ],
  infografis: [
    { judul: "Berat Benda", emoji: "🏋️", countNum: 2, countWord: "Dua", suara: "Berat menunjukkan seberapa berat atau ringan sebuah benda. Benda ditimbang dengan timbangan." },
    { judul: "Timbangan", emoji: "⚖️", countNum: 3, countWord: "Tiga", suara: "Timbangan adalah alat ukur berat. Ada timbangan digital, timbangan duduk, dan timbangan kodok." },
    { judul: "Satuan Baku Berat", emoji: "📐", countNum: 2, countWord: "Dua", suara: "Satuan baku berat adalah gram dan kilogram. Gram ditulis g dan kilogram ditulis kg." },
    { judul: "Gram", emoji: "🥚", countNum: 4, countWord: "Empat", suara: "Gram dipakai untuk benda yang ringan, seperti tepung, gula pasir, pensil, dan buku." },
    { judul: "Kilogram", emoji: "🍉", countNum: 3, countWord: "Tiga", suara: "Kilogram dipakai untuk benda yang lebih berat, seperti berat badan, karung beras, dan buah." },
    { judul: "Timbangan Digital", emoji: "🔢", countNum: 2, countWord: "Dua", suara: "Timbangan digital menampilkan berat benda sebagai angka pada layar. Baca angka itu dan tulis satuannya." },
    { judul: "Timbangan Duduk", emoji: "🕐", countNum: 2, countWord: "Dua", suara: "Timbangan duduk memakai jarum. Angka yang ditunjuk jarum adalah berat benda dalam kilogram." },
    { judul: "Mulai dari Nol", emoji: "0️⃣", countNum: 3, countWord: "Tiga", suara: "Sebelum menimbang, jarum atau layar harus tepat di angka nol. Baru letakkan benda di atas timbangan." },
    { judul: "Memilih Timbangan", emoji: "✅", countNum: 3, countWord: "Tiga", suara: "Benda ringan memakai timbangan digital. Berat badan memakai timbangan badan. Buah yang berat memakai timbangan duduk." },
    { judul: "Cara Menimbang", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, pastikan angka awal nol. Dua, letakkan benda. Tiga, baca angkanya. Empat, tulis hasilnya dengan satuan." },
  ],
  games: [
    C("read-digital", "Baca Timbangan Digital", "hlm. 124–125 dan 133 (Aktivitas 2 dan Ayo Berlatih 1)", "Membaca berat benda pada layar timbangan digital dalam gram.", "Tiga ronde, tiap ronde dua soal. Benda ditampilkan di atas timbangan digital. Siswa membaca angka pada layar lalu memilih satu dari tiga berat.", "Baca angka pada layar timbangan.", "⚖️", 6),
    C("ready-scale", "Timbangan yang Siap", "hlm. 133 (Buku Panduan Guru: menimbang harus dimulai dari angka 0)", "Menemukan timbangan yang jarumnya tepat di angka 0 sebelum menimbang.", "Tiga ronde, tiap ronde tiga timbangan duduk dan satu perintah. Siswa mengetuk timbangan yang jarumnya tepat di angka 0.", "Ketuk timbangan yang jarumnya di angka nol.", "0️⃣", 3),
    C("read-dial", "Baca Timbangan Jarum", "hlm. 125–126 (timbangan duduk untuk buah)", "Membaca berat buah pada timbangan duduk dari angka yang ditunjuk jarum.", "Tiga ronde, tiap ronde dua soal. Buah ditampilkan di atas timbangan duduk. Siswa membaca angka yang ditunjuk jarum, lalu memilih satu dari tiga berat.", "Baca angka yang ditunjuk jarum.", "🍉", 6),
    C("choose-scale", "Pilih Timbangan", "hlm. 130–131 (timbangan yang tepat untuk sayuran dan buah)", "Memilih timbangan yang tepat untuk menimbang suatu benda.", "Tiga ronde, tiap ronde dua benda. Siswa memilih satu dari tiga timbangan: digital, duduk, atau badan.", "Pilih timbangan yang tepat.", "🛒", 6),
    C("match-object-scale", "Jodohkan Benda dan Timbangan", "hlm. 126–127 (menghubungkan penjual dan alat ukur)", "Menjodohkan benda dengan timbangan yang tepat untuk menimbangnya.", "Tiga ronde, tiap ronde tiga benda dan tiga timbangan. Siswa mengetuk benda, lalu mengetuk timbangan yang cocok.", "Ketuk benda, lalu ketuk timbangannya.", "🔗", 9),
    C("memory-scale-weight", "Memori Timbangan dan Berat", "hlm. 133 (berat bahan kue pada timbangan digital)", "Mencocokkan timbangan digital dengan berat yang ditunjukkan layarnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari timbangan dan beratnya.", "🃏", 12),
    C("tap-scale-weight", "Ketuk Timbangan dengan Berat", "hlm. 133 (gula, tepung, dan telur)", "Menemukan timbangan yang menunjukkan berat yang diminta.", "Tiga ronde, tiap ronde tiga timbangan dan dua pertanyaan. Siswa mengetuk timbangan yang beratnya sama dengan bilangan yang disebut.", "Ketuk timbangan dengan berat itu.", "👆", 6),
    C("tap-all-unit", "Ketuk Semua yang Memakai Satuan Tertentu", "hlm. 125 (gram untuk benda ringan, kilogram untuk benda berat)", "Menemukan semua benda yang ditimbang dengan satuan gram atau kilogram.", "Tiga ronde, tiap ronde empat benda dan satu perintah. Siswa mengetuk semua benda yang cocok dengan satuan yang disebut, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "✔️", 3),
    C("board-grams", "Papan Berat dalam Gram", "hlm. 133 (Ayo Berlatih 1)", "Menulis berat pada timbangan digital dengan angka ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca layar timbangan, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa.", "Isi papan dengan beratnya.", "🗂️", 6),
    C("order-weight", "Urutkan Benda menurut Berat", "hlm. 134 (Ayo Berlatih 2: berat teringan dan terberat)", "Mengurutkan tiga benda menurut berat pada timbangan digital.", "Tiga ronde, tiap ronde tiga timbangan bertanda huruf. Siswa mengetuk timbangan satu per satu dari yang teringan atau terberat.", "Ketuk benda menurut beratnya.", "📶", 9),
    P("read-dial-kg", "Baca Jarum dalam Kilogram", "hlm. 125–126 (timbangan duduk)", "Membaca berat dalam kilogram dari jarum yang tepat di satu angka.", "Tiga ronde, tiap ronde dua soal. Jarum timbangan polos ditampilkan. Siswa memilih satu dari tiga berat dalam kilogram.", "Baca angka yang ditunjuk jarum.", "dial-read", 3, 2),
    P("read-lcd", "Baca Layar Timbangan", "hlm. 133 (angka pada layar timbangan digital)", "Membaca berat dalam gram dari layar timbangan polos.", "Tiga ronde, tiap ronde dua soal. Layar timbangan ditampilkan. Siswa memilih satu dari tiga berat dalam gram.", "Baca angka pada layar.", "lcd-read", 3, 2),
    P("match-dial-weight", "Jodohkan Jarum dan Berat", "hlm. 125–126 (membaca timbangan duduk)", "Menjodohkan jarum timbangan dengan berat dalam kilogram.", "Tiga ronde, tiap ronde tiga jarum dan tiga berat. Siswa mengetuk jarum, lalu mengetuk berat yang cocok.", "Ketuk jarum, lalu ketuk beratnya.", "dial-match", 3, 3),
    P("memory-lcd-weight", "Memori Layar dan Berat", "hlm. 133 (angka pada layar timbangan digital)", "Mencocokkan layar timbangan dengan beratnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari layar dan beratnya.", "lcd-memory", 3, 4),
    P("tap-all-ready", "Ketuk Semua Jarum yang Siap", "hlm. 133 (Buku Panduan Guru: mulai dari angka 0)", "Menemukan semua timbangan yang jarumnya sudah tepat di angka 0.", "Tiga ronde, tiap ronde empat jarum dan satu perintah. Siswa mengetuk semua jarum di angka 0, lalu menekan Periksa.", "Ketuk semua jarum di nol, lalu periksa.", "dial-select", 3, 4),
    P("sort-unit-weight", "Pilah Berat: Gram atau Kilogram", "hlm. 125 (gram untuk benda ringan, kilogram untuk benda berat)", "Memilah nama benda menjadi yang ditimbang dengan gram dan yang ditimbang dengan kilogram.", "Tiga ronde, tiap ronde enam nama benda dan dua kotak. Siswa menyeret atau mengetuk nama benda ke kotak yang tepat.", "Pilah benda ke kotak yang tepat.", "unit-sort", 3, 6),
    P("tap-all-lcd-compare", "Ketuk Semua Layar Lebih atau Kurang", "hlm. 129 (membandingkan berat dua timbangan)", "Menemukan semua layar yang menunjukkan berat lebih atau kurang dari bilangan acuan.", "Tiga ronde, tiap ronde empat layar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa.", "Ketuk semua yang cocok, lalu periksa.", "lcd-select", 3, 4),
    P("order-weigh-steps", "Urutkan Langkah Menimbang", "hlm. 124 (Aktivitas 2: cara menimbang)", "Mengurutkan langkah menimbang dengan timbangan digital, timbangan duduk, dan timbangan badan.", "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah.", "Ketuk langkah menurut urutannya.", "steps-order", 3, 4),
    P("board-lcd", "Papan dari Layar", "hlm. 133 (Ayo Berlatih 1)", "Menulis berat pada layar timbangan dengan angka ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Siswa membaca layar, lalu mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa.", "Isi papan dengan beratnya.", "lcd-board", 3, 2),
    P("difference-lcd", "Selisih Dua Layar", "hlm. 129 (Ayo Berlatih 2: berat stroberi tambahan)", "Menghitung selisih berat dari dua layar timbangan.", "Tiga ronde, tiap ronde dua soal. Dua layar ditampilkan. Siswa memilih satu dari tiga selisih berat dalam gram.", "Pilih selisih berat kedua layar.", "lcd-compare", 3, 2),
    A("choose-unit-weight", "Pilih Satuan Berat", "hlm. 125 dan 128–129 (satuan baku berat)", "Memilih satuan baku yang tepat untuk berat suatu benda.", "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang ditimbang, lalu memilih satu dari tiga satuan.", "Pilih satuan baku yang tepat.", "g kg", "SATUAN", "gram • kilogram"),
    A("scale-text", "Timbangan yang Tepat", "hlm. 126–131 (memilih timbangan)", "Memilih timbangan yang tepat untuk menimbang suatu benda.", "Tiga ronde, tiap ronde dua soal. Siswa membaca benda yang ditimbang, lalu memilih satu dari tiga alat ukur.", "Pilih timbangan yang tepat.", "⚖️", "TIMBANGAN", "digital • duduk • badan"),
    A("complete-weight-sentence", "Lengkapi Kalimat Pengukuran Berat", "hlm. 124–129 (alat ukur, satuan baku, dan cara menimbang)", "Melengkapi kalimat tentang alat ukur berat, satuan baku, dan cara menimbang.", "Tiga soal, tiap soal tiga kalimat, misalnya satuan baku berat adalah gram dan ... Siswa memilih satu dari tiga kata.", "Pilih kata untuk bagian kosong.", "…", "LENGKAPI", "alat • satuan • cara"),
    A("match-scale-text", "Jodohkan Berat dan Timbangan", "hlm. 126–127 dan 131–132 (benda dan timbangannya)", "Menjodohkan benda yang ditimbang dengan timbangan yang tepat.", "Tiga ronde, tiap ronde tiga benda dan tiga timbangan. Siswa mengetuk benda, lalu mengetuk timbangan yang cocok.", "Ketuk benda, lalu ketuk timbangannya.", "= ?", "JODOHKAN", "benda • timbangan"),
    A("memory-weight-size", "Memori Benda dan Berat Wajar", "hlm. 125 dan 128 (perkiraan berat benda)", "Mencocokkan benda dengan berat yang wajar lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): benda dan beratnya. Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari benda dan beratnya.", "kg", "MEMORI", "benda • berat"),
    A("true-false-weight", "Benar atau Salah: Pengukuran Berat", "hlm. 124–129 (timbangan dan satuan baku berat)", "Menilai pernyataan tentang timbangan, satuan baku, dan cara menimbang.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-weight", "Detektif Pengukuran Berat", "hlm. 129 dan 133 (membaca dan menghitung berat)", "Menemukan bilangan berat dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk tentang berat dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-weight", "Peta Konsep Pengukuran Berat", "hlm. 104 (peta konsep Bab 3)", "Melengkapi peta konsep alat ukur berat dan cara menimbang.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "alat • satuan • cara"),
    A("story-weight", "Soal Cerita Berat", "hlm. 129 dan 133 (bahan kue dan stroberi)", "Menyelesaikan soal cerita yang menjumlahkan atau mengurangkan berat dalam gram.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam gram.", "Baca cerita, lalu pilih hasilnya.", "g", "CERITA", "jumlah • selisih"),
    A("sentence-weight", "Susun Kata Pengukuran Berat", "hlm. 124–129 (pengukuran berat)", "Menyusun kalimat tentang pengukuran berat dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat pengukuran berat"),
  ],
  poin: [
    { ikon: "⚖️", nama: "Timbangan", isi: "alat ukur berat", suara: "Timbangan adalah alat untuk mengukur berat benda." },
    { ikon: "📐", nama: "Satuan baku berat", isi: "gram (g) dan kilogram (kg)", suara: "Satuan baku berat adalah gram dan kilogram. Satuan baku sama untuk semua orang." },
    { ikon: "🥚", nama: "Gram", isi: "untuk benda ringan", suara: "Gram dipakai untuk benda yang ringan, seperti tepung, gula pasir, pensil, dan buku." },
    { ikon: "🍉", nama: "Kilogram", isi: "untuk benda berat", suara: "Kilogram dipakai untuk benda yang lebih berat, seperti berat badan, karung beras, dan buah." },
    { ikon: "0️⃣", nama: "Mulai dari nol", isi: "jarum atau layar di angka 0", suara: "Sebelum menimbang, jarum atau layar harus tepat di angka nol." },
  ],
  poinSuara:
    "Ingat selalu! Timbangan adalah alat ukur berat. Satuan baku berat adalah gram dan kilogram. Gram untuk benda yang ringan, kilogram untuk benda yang lebih berat. Sebelum menimbang, pastikan jarum atau layar tepat di angka nol.",
  cara: {
    suara: "Cara menimbang. Pastikan angka awal nol. Letakkan benda di atas timbangan. Baca angka pada jarum atau layar. Lalu tulis hasilnya dengan satuan.",
    potongan: [
      { teks: "angka awal nol", warna: "#BAE6FD" },
      { teks: "letakkan benda", warna: "#FECACA" },
      { teks: "baca angkanya", warna: "#BFDBFE" },
      { teks: "tulis satuan", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: bersama orang tuamu, timbanglah bahan makanan di dapur, misalnya gula, tepung, telur, dan beras. Pastikan timbangan mulai dari angka nol. Tulis hasilnya dengan satuan gram atau kilogram, lalu tentukan bahan yang paling ringan dan yang paling berat.",
  refleksi: [
    "Aku dapat menyebutkan alat ukur berat dan satuan bakunya.",
    "Aku dapat memilih timbangan yang tepat untuk benda ringan dan benda berat.",
    "Aku dapat membaca berat pada layar dan jarum timbangan.",
    "Aku ingat memulai menimbang dari angka nol.",
  ],
};

/* ====================================================================== */
/* SUB-BAB D. Hubungan antarsatuan baku berat                               */
/* ====================================================================== */

export const SUB_D33: SubBabNaskah = {
  id: "D",
  codeTitle: "Sub-Bab D (Hubungan Antarsatuan Baku Berat)",
  fullTitle: "Sub-Bab D: Hubungan Antarsatuan Baku Berat",
  targetDescription:
    "Siswa mengenal timbangan kodok dan bandul (1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg), memahami 1 kg = 1.000 g = 10 ons dan 1 ons = 100 g, mengubah kilogram ke gram dengan mengalikan 1.000 dan gram ke kilogram dengan membagi 1.000 (misalnya 1.753 g = 1 kg 753 g), serta menjumlahkan dan mengurangkan berat pada soal cerita.",
  secondaryBg: "#FEF3C7",
  secondaryBorder: "#D97706",
  secondaryText: "#78350F",
  silabus: {
    teksSuara: `Kita belajar hubungan antarsatuan baku berat. Pedagang di pasar memakai timbangan kodok dengan bandul. Satu kilogram sama dengan seribu gram dan sama dengan sepuluh ons. Satu ons sama dengan seratus gram. Kita belajar mengubah kilogram ke gram dan gram ke kilogram, serta menjumlahkan dan mengurangkan berat. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa menyelesaikan masalah yang berkaitan dengan panjang dan berat benda dengan satuan baku. Pada sub-bab ini siswa menghubungkan kilogram, ons, dan gram serta menghitung berat gabungan.",
    referensi: "Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 3: Pengukuran Panjang dan Berat, Sub-Bab D hlm. 135–140) dan Buku Panduan Guru Bab 3 Topik D.",
  },
  videos: [
    {
      id: "K3B3D-V1",
      judul: "Timbangan Kodok",
      subjudul: "Pedagang dan bandul",
      adegan: [
        {
          id: "K3B3D-V1-1",
          judul: "Di pasar",
          ketukan: [
            "Pedagang di pasar menimbang dagangannya dengan timbangan kodok.",
            "Timbangan kodok dilengkapi bandul sebagai ukuran berat.",
            "Bandul diletakkan di sisi yang lain dari timbangan.",
            "Ada berapa jenis bandul yang dipakai?",
          ],
          papan: ["Pedagang di pasar", "Timbangan kodok", "Bandul = ukuran berat", "Berapa jenis bandul?"],
        },
        {
          id: "K3B3D-V1-2",
          judul: "Jenis bandul",
          ketukan: [
            "Jenis bandul pada timbangan kodok ada lima.",
            "Yaitu setengah ons, satu ons, dan dua ons.",
            "Lalu ada bandul setengah kilogram dan satu kilogram.",
            "Berat benda sama dengan jumlah bandul yang seimbang.",
          ],
          papan: ["Ada lima jenis bandul", "1/2 ons, 1 ons, 2 ons", "1/2 kg dan 1 kg", "Jumlahkan bandulnya"],
        },
        {
          id: "K3B3D-V1-3",
          judul: "Telur dua timbangan",
          ketukan: [
            "Berat telur pada timbangan kodok adalah 1 kilogram.",
            "Berat telur yang sama pada timbangan digital 1.000 gram.",
            "Jumlah telurnya sama, jadi beratnya sama.",
            "Berarti 1 kilogram sama dengan 1.000 gram.",
          ],
          papan: ["Kodok: 1 kg", "Digital: 1.000 g", "Berat telur sama", "1 kg = 1.000 g"],
        },
      ],
    },
    {
      id: "K3B3D-V2",
      judul: "Kilogram, Ons, dan Gram",
      subjudul: "Hubungan antarsatuan berat",
      adegan: [
        {
          id: "K3B3D-V2-1",
          judul: "Kilogram dan ons",
          ketukan: [
            "Satu kilogram sama dengan sepuluh ons.",
            "Karena itu bandul satu kilogram sama dengan sepuluh bandul satu ons.",
            "Setengah kilogram sama dengan lima ons.",
            "Ons dipakai pada timbangan kodok di pasar.",
          ],
          papan: ["1 kg = 10 ons", "1 kg = 10 bandul 1 ons", "1/2 kg = 5 ons", "Ons di timbangan kodok"],
        },
        {
          id: "K3B3D-V2-2",
          judul: "Ons dan gram",
          ketukan: [
            "Satu ons sama dengan seratus gram.",
            "Dua ons sama dengan dua ratus gram.",
            "Setengah ons sama dengan lima puluh gram.",
            "Sepuluh ons sama dengan seribu gram, yaitu satu kilogram.",
          ],
          papan: ["1 ons = 100 g", "2 ons = 200 g", "1/2 ons = 50 g", "10 ons = 1.000 g"],
        },
        {
          id: "K3B3D-V2-3",
          judul: "Kilogram ke gram",
          ketukan: [
            "Untuk mengubah kilogram ke gram, kalikan dengan 1.000.",
            "Misalnya 3 kg sama dengan 3 × 1.000 gram.",
            "Hasilnya adalah 3.000 gram.",
            "Dan 20 kg sama dengan 20.000 gram.",
          ],
          papan: ["kg ke g: kali 1.000", "3 kg = 3 × 1.000 g", "= 3.000 g", "20 kg = 20.000 g"],
        },
      ],
    },
    {
      id: "K3B3D-V3",
      judul: "Mengubah Gram ke Kilogram",
      subjudul: "Tepung Meutia dan buah mangga",
      adegan: [
        {
          id: "K3B3D-V3-1",
          judul: "Tepung Meutia",
          ketukan: [
            "Meutia membantu ibu menimbang tepung untuk membuat kue.",
            "Timbangan digital menunjukkan 1.753 gram.",
            "Kita ubah menjadi kilogram dan gram.",
            "Seribu gram adalah satu kilogram.",
          ],
          papan: ["Meutia menimbang tepung", "Layar: 1.753 g", "Ubah ke kg dan g", "1.000 g = 1 kg"],
        },
        {
          id: "K3B3D-V3-2",
          judul: "Pecah gramnya",
          ketukan: [
            "1.753 gram sama dengan 1.000 gram ditambah 753 gram.",
            "1.000 gram sama dengan 1 kilogram.",
            "Jadi 1.753 gram sama dengan 1 kg 753 gram.",
            "Berat tepung Meutia adalah 1 kg 753 gram.",
          ],
          papan: ["1.753 = 1.000 + 753", "1.000 g = 1 kg", "1.753 g = 1 kg 753 g", "Tepung: 1 kg 753 g"],
        },
        {
          id: "K3B3D-V3-3",
          judul: "Mangga dan jeruk",
          ketukan: [
            "Meutia memanen mangga 8.000 gram dan menjual 4 kilogram.",
            "8.000 gram sama dengan 8 kilogram.",
            "Sisa mangga adalah 8 dikurangi 4, yaitu 4 kilogram.",
            "Dua kantong jeruk 500 gram jadi 1.000 gram, yaitu 1 kg.",
          ],
          papan: ["Mangga 8.000 g", "8.000 g = 8 kg", "8 − 4 = 4 kg", "500 g + 500 g = 1 kg"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Mengingat Satuan Baku Berat",
      stepDesc:
        "Setelah mengukur berat benda dengan timbangan, kita mendapat ukuran berat dengan satuan baku. Satuan baku berat adalah gram dan kilogram. Satuan-satuan ini saling berhubungan. Pertanyaannya, apakah ada hubungan antara kilogram, ons, dan gram, dan bagaimana hubungannya?",
      icon: "🔙",
      flowFrom: ALUR_D[0],
      flowTo: ALUR_D[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Timbangan Kodok dan Bandul",
      stepDesc:
        "Pedagang di pasar menimbang barang dagangannya dengan timbangan kodok. Timbangan ini dilengkapi bandul sebagai ukuran berat benda yang ditimbang. Benda diletakkan pada satu sisi, lalu bandul diletakkan pada sisi lain sampai timbangan seimbang. Jumlah berat bandul adalah berat benda.",
      icon: "🛒",
      flowFrom: ALUR_D[1],
      flowTo: ALUR_D[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Jenis Bandul",
      stepDesc:
        "Jenis bandul yang digunakan timbangan kodok ada lima, yaitu setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram. Setengah ons sama dengan 50 gram, satu ons 100 gram, dua ons 200 gram, setengah kilogram 500 gram, dan satu kilogram 1.000 gram.",
      icon: "🏋️",
      flowFrom: ALUR_D[2],
      flowTo: ALUR_D[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Kilogram dan Gram",
      stepDesc:
        "Berat telur pada timbangan kodok adalah 1 kilogram, dan pada timbangan digital 1.000 gram. Jumlah telur sama sehingga beratnya sama. Maka 1 kilogram sama dengan 1.000 gram. Ditulis 1 kg = 1.000 g. Bilangan 1.000 dibaca seribu.",
      icon: "⚖️",
      flowFrom: ALUR_D[3],
      flowTo: ALUR_D[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Kilogram dan Ons",
      stepDesc:
        "Satu kilogram sama dengan sepuluh ons. Karena itu satu bandul satu kilogram sama beratnya dengan sepuluh bandul satu ons. Setengah kilogram sama dengan lima ons. Ons banyak dipakai pada timbangan kodok di pasar, sedangkan timbangan digital memakai gram.",
      icon: "🔟",
      flowFrom: ALUR_D[4],
      flowTo: ALUR_D[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Ons dan Gram",
      stepDesc:
        "Satu ons sama dengan seratus gram. Maka dua ons sama dengan 200 gram dan tiga ons sama dengan 300 gram. Sepuluh ons sama dengan 1.000 gram, yaitu satu kilogram. Untuk mengubah ons ke gram, kalikan banyak ons dengan 100.",
      icon: "💯",
      flowFrom: ALUR_D[5],
      flowTo: ALUR_D[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Kilogram ke Gram",
      stepDesc:
        "Untuk mengubah kilogram ke gram, kalikan dengan 1.000. Misalnya 3 kg = 3 × 1.000 g = 3.000 g, dan 20 kg = 20.000 g. Bila ada sisa gram, tambahkan: 4 kg 150 g = 4.000 g + 150 g = 4.150 g. Bilangan di belakang kilogram makin besar karena gram satuan yang lebih kecil.",
      icon: "✖️",
      flowFrom: ALUR_D[6],
      flowTo: ALUR_D[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Gram ke Kilogram",
      stepDesc:
        "Untuk mengubah gram ke kilogram, ambil tiap 1.000 gram sebagai 1 kilogram. Tepung Meutia 1.753 gram = 1.000 gram + 753 gram = 1 kg 753 gram. Begitu pula 1.200 gram = 1 kg 200 gram dan 3.000 gram = 3 kg. Berat juga dapat dijumlahkan dan dikurangkan setelah satuannya sama.",
      icon: "➗",
      flowFrom: ALUR_D[7],
      flowTo: ALUR_D[8],
    },
  ],
  infografis: [
    { judul: "Timbangan Kodok", emoji: "🛒", countNum: 2, countWord: "Dua", suara: "Timbangan kodok dipakai pedagang di pasar. Ukuran beratnya memakai bandul." },
    { judul: "Jenis Bandul", emoji: "🏋️", countNum: 5, countWord: "Lima", suara: "Ada lima jenis bandul: setengah ons, satu ons, dua ons, setengah kilogram, dan satu kilogram." },
    { judul: "1 kg = 1.000 g", emoji: "⚖️", countNum: 2, countWord: "Dua", suara: "Satu kilogram sama dengan seribu gram. Dua kilogram sama dengan dua ribu gram." },
    { judul: "1 kg = 10 ons", emoji: "🔟", countNum: 2, countWord: "Dua", suara: "Satu kilogram sama dengan sepuluh ons. Setengah kilogram sama dengan lima ons." },
    { judul: "1 ons = 100 g", emoji: "💯", countNum: 3, countWord: "Tiga", suara: "Satu ons sama dengan seratus gram. Tiga ons sama dengan tiga ratus gram." },
    { judul: "Kilogram ke Gram", emoji: "✖️", countNum: 3, countWord: "Tiga", suara: "Untuk mengubah kilogram ke gram, kalikan dengan seribu. Tiga kilogram sama dengan tiga ribu gram." },
    { judul: "Gram ke Kilogram", emoji: "➗", countNum: 3, countWord: "Tiga", suara: "Untuk mengubah gram ke kilogram, bagi dengan seribu. Tiga ribu gram sama dengan tiga kilogram." },
    { judul: "1.753 gram", emoji: "🔍", countNum: 3, countWord: "Tiga", suara: "Seribu tujuh ratus lima puluh tiga gram sama dengan seribu gram ditambah tujuh ratus lima puluh tiga gram, yaitu satu kilogram tujuh ratus lima puluh tiga gram." },
    { judul: "Garis Berat", emoji: "📈", countNum: 2, countWord: "Dua", suara: "Pada garis berat, tiap seribu gram ditandai satu kilogram. Batang yang sampai angka dua kilogram beratnya dua ribu gram." },
    { judul: "Cara Mengubah", emoji: "📝", countNum: 4, countWord: "Empat", suara: "Empat langkah. Satu, ingat satu kilogram sama dengan seribu gram. Dua, kilogram ke gram kalikan seribu. Tiga, gram ke kilogram bagi seribu. Empat, periksa dengan cara sebaliknya." },
  ],
  games: [
    C("build-bandul", "Rakit Berat dengan Bandul", "hlm. 135–136 (jenis bandul timbangan kodok)", "Merakit berat yang diminta dari bandul 1/2 ons, 1 ons, 2 ons, 1/2 kg, dan 1 kg.", "Tiga ronde, tiap ronde dua soal. Siswa membaca berat yang diminta, lalu menambah atau mengurangi bandul sampai layar menunjukkan berat itu. Banyak jalan yang benar.", "Rakit berat dengan bandul.", "🏋️", 6),
    C("count-bandul", "Hitung Berat Bandul", "hlm. 135 (bandul timbangan kodok)", "Menghitung berat sekumpulan bandul dalam gram.", "Tiga ronde, tiap ronde dua soal. Kumpulan bandul ditampilkan. Siswa memilih satu dari tiga berat. Pengecoh lebih atau kurang lima puluh gram.", "Hitung berat semua bandul.", "🔢", 6),
    C("kg-to-g-bandul", "Ubah Kilogram ke Gram", "hlm. 136 dan 139 (1 kg = 1.000 g, Ayo Berlatih 1)", "Mengubah kilogram ke gram dengan gambar bandul satu kilogram.", "Tiga ronde, tiap ronde dua soal. Bandul satu kilogram ditampilkan. Siswa memilih satu dari tiga hasil dalam gram. Pengecoh lupa mengalikan 1.000.", "Ubah kilogram ke gram.", "✖️", 6),
    C("g-to-kg-bandul", "Ubah Gram ke Kilogram", "hlm. 137 dan 139 (mengubah gram ke kilogram)", "Mengubah gram ke kilogram dengan gambar bandul satu kilogram.", "Tiga ronde, tiap ronde dua soal. Bandul satu kilogram ditampilkan. Siswa memilih satu dari tiga hasil dalam kilogram.", "Ubah gram ke kilogram.", "➗", 6),
    C("match-bandul", "Jodohkan Bandul dan Berat", "hlm. 135–136 (jumlah bandul yang digunakan)", "Menjodohkan kumpulan bandul dengan beratnya dalam gram.", "Tiga ronde, tiap ronde tiga kumpulan bandul dan tiga berat. Siswa mengetuk kumpulan bandul, lalu mengetuk berat yang cocok.", "Ketuk bandul, lalu ketuk beratnya.", "🔗", 9),
    C("memory-bandul", "Memori Bandul dan Berat", "hlm. 135–136 (jumlah bandul yang digunakan)", "Mencocokkan kumpulan bandul dengan beratnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari bandul dan beratnya.", "🃏", 12),
    C("tap-bandul", "Ketuk Bandul dengan Berat", "hlm. 135–136 (jumlah bandul yang digunakan)", "Menemukan kumpulan bandul yang beratnya sama dengan bilangan yang diminta.", "Tiga ronde, tiap ronde tiga kumpulan bandul dan dua pertanyaan. Siswa mengetuk kumpulan yang beratnya sama dengan bilangan yang disebut.", "Ketuk bandul dengan berat itu.", "👆", 6),
    C("tap-all-same-weight", "Ketuk Semua yang Sama Berat", "hlm. 136 (1 kg = 10 ons = 1.000 g)", "Menemukan semua kumpulan bandul yang beratnya sama dengan berat acuan.", "Tiga ronde, tiap ronde empat kumpulan bandul dan satu perintah. Siswa mengetuk semua yang sama beratnya dengan acuan, lalu menekan Periksa.", "Ketuk semua yang sama, lalu periksa.", "✔️", 3),
    C("ons-to-gram", "Ubah Ons ke Gram", "hlm. 136 (1 ons = 100 g)", "Mengubah ons ke gram pada papan ratusan, puluhan, dan satuan.", "Tiga ronde, tiap ronde dua soal. Bandul satu ons ditampilkan. Siswa mengatur angka ratusan, puluhan, dan satuan pada papan dan menekan Periksa.", "Isi papan dengan gramnya.", "🗂️", 6),
    C("order-bandul", "Urutkan Bandul menurut Berat", "hlm. 135–136 (jenis bandul)", "Mengurutkan tiga kumpulan bandul menurut beratnya.", "Tiga ronde, tiap ronde tiga kumpulan bandul bertanda huruf. Siswa mengetuk kumpulan satu per satu dari yang teringan atau terberat.", "Ketuk bandul menurut beratnya.", "📶", 9),
    P("count-weight-line", "Hitung Garis Berat", "hlm. 136–139 (kilogram dan gram)", "Menghitung berat batang pada garis berat dalam gram.", "Tiga ronde, tiap ronde dua soal. Garis berat bertanda tiap 500 g dan batang berwarna ditampilkan. Siswa memilih satu dari tiga berat.", "Hitung berat batang pada garis.", "weight-count", 3, 2),
    P("complete-convert-weight", "Lengkapi Kalimat Ubah Berat", "hlm. 137 (1.753 gram dan mengubah gram ke kilogram)", "Melengkapi kalimat yang mengubah gram menjadi kilogram dan gram.", "Tiga soal, tiap soal tiga kalimat, misalnya 1.250 g = 1.000 g + ... g. Siswa memilih satu dari tiga angka untuk bagian kosong.", "Pilih angka untuk bagian kosong.", "weight-sentence", 3, 3),
    P("match-weight-line", "Jodohkan Garis dan Berat", "hlm. 136–139 (kilogram dan gram)", "Menjodohkan garis berat dengan beratnya dalam kilogram dan gram.", "Tiga ronde, tiap ronde tiga garis dan tiga berat. Siswa mengetuk garis, lalu mengetuk berat yang cocok.", "Ketuk garis, lalu ketuk beratnya.", "weight-match", 3, 3),
    P("memory-weight-line", "Memori Garis dan Berat", "hlm. 136–139 (kilogram dan gram)", "Mencocokkan garis berat dengan beratnya lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari garis dan beratnya.", "weight-memory", 3, 4),
    P("fill-weight-table", "Isi Tabel Ubah Berat", "hlm. 139 (Ayo Berlatih 1: lengkapi ukuran berat)", "Melengkapi tabel berat dalam kilogram, gram, dan ons.", "Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu berat yang tepat. Ada satu kartu pengecoh.", "Isi tabel dengan kartu berat.", "weight-table", 3, 4),
    P("tap-all-same-weight-line", "Ketuk Semua Berat yang Sama", "hlm. 136–139 (satu berat ditulis dengan beberapa cara)", "Menemukan semua garis berat yang sama dengan berat acuan, walau ditulis berbeda.", "Tiga ronde, tiap ronde empat garis dan satu perintah. Siswa mengetuk semua yang sama dengan acuan, lalu menekan Periksa.", "Ketuk semua yang sama, lalu periksa.", "weight-select", 3, 4),
    P("sort-whole-kg", "Pilah Berat: Pas Kilogram atau Bersisa", "hlm. 137 dan 139 (gram dan kilogram)", "Memilah berat dalam gram menjadi yang pas dalam kilogram dan yang masih bersisa gram.", "Tiga ronde, tiap ronde enam berat dan dua kotak. Berat yang habis dibagi 1.000 pas dalam kilogram. Siswa menyeret atau mengetuk berat ke kotak yang tepat.", "Pilah berat ke kotak yang tepat.", "weight-sort", 3, 6),
    P("order-convert-weight-steps", "Urutkan Langkah Mengubah Berat", "hlm. 137 dan 139 (mengubah satuan berat)", "Mengurutkan langkah mengubah satuan berat.", "Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah.", "Ketuk langkah menurut urutannya.", "steps-order", 3, 4),
    P("difference-weight-line", "Selisih Dua Garis Berat", "hlm. 139 (Ayo Berlatih 2: sisa mangga)", "Menghitung selisih berat dari dua batang pada garis berat.", "Tiga ronde, tiap ronde dua soal. Dua batang pada satu garis ditampilkan. Siswa memilih satu dari tiga selisih berat.", "Pilih selisih berat kedua batang.", "weight-compare", 3, 2),
    P("join-weight-lines", "Sambung Dua Garis Berat", "hlm. 140 (Ayo Berlatih 3: dua kantong jeruk)", "Menghitung berat dua batang yang disambung pada garis berat.", "Tiga ronde, tiap ronde dua soal. Dua batang yang disambung ditampilkan. Siswa memilih satu dari tiga berat gabungan.", "Pilih berat setelah disambung.", "weight-join", 3, 2),
    A("kg-to-g-abstract", "Ubah Kilogram ke Gram: Lambang", "hlm. 139 (20 kg = ... gram)", "Mengubah kilogram ke gram dan memilih hasilnya dari tiga pilihan.", "Tiga ronde, tiap ronde dua soal, misalnya 4 kg = ... g. Pengecoh lupa mengalikan 1.000 atau mengalikan 10.000.", "Pilih hasil perubahan kilogram ke gram.", "4 kg", "KG KE G", "kali 1.000"),
    A("g-to-kg-g", "Ubah Gram ke Kilogram dan Gram", "hlm. 137 dan 139 (1.753 gram dan 1.200 gram)", "Menulis berat gram sebagai kilogram dan gram.", "Tiga ronde, tiap ronde dua soal, misalnya 1.200 g = ... kg ... g. Pengecoh salah tambah atau kurang seratus gram.", "Pilih berat dalam kilogram dan gram.", "1.200 g", "KG DAN G", "ribuan • sisa"),
    A("ons-convert", "Ubah Kilogram, Ons, dan Gram", "hlm. 136 (1 kg = 10 ons, 1 ons = 100 g)", "Mengubah antara kilogram, ons, dan gram.", "Tiga ronde, tiap ronde dua soal, misalnya 3 ons = ... g. Siswa memilih satu dari tiga hasil.", "Pilih hasil perubahan satuannya.", "ons", "KG ONS G", "10 ons • 100 g"),
    A("match-weight", "Jodohkan Berat", "hlm. 139 (Ayo Berlatih 1: lengkapi ukuran berat)", "Menjodohkan dua cara menulis berat yang sama.", "Tiga ronde, tiap ronde tiga ukuran dan tiga pasangannya. Siswa mengetuk ukuran, lalu mengetuk pasangannya.", "Ketuk ukuran, lalu ketuk pasangannya.", "= ?", "JODOHKAN", "kg • ons • g"),
    A("memory-weight", "Memori Berat", "hlm. 136 dan 139 (ukuran berat yang sama)", "Mencocokkan dua cara menulis berat yang sama lewat permainan memori.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya.", "Balik dua kartu, cari berat yang sama.", "kg g", "MEMORI", "berat yang sama"),
    A("true-false-unit-weight", "Benar atau Salah: Kilogram dan Gram", "hlm. 136–140 (hubungan satuan berat)", "Menilai pernyataan tentang hubungan kilogram, ons, dan gram.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("detective-unit-weight", "Detektif Satuan Berat", "hlm. 136–139 (ubah satuan berat)", "Menemukan bilangan hasil perubahan satuan berat dari dua petunjuk.", "Empat soal. Siswa membaca petunjuk tentang perubahan satuan dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok.", "Baca petunjuk, lalu pilih bilangannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-unit-weight", "Peta Konsep Satuan Berat", "hlm. 104 (peta konsep Bab 3)", "Melengkapi peta konsep hubungan kilogram, ons, dan gram.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "kg • ons • g"),
    A("story-unit-weight", "Soal Cerita Satuan Berat", "hlm. 139–140 (Ayo Berlatih 2 dan 3: mangga dan jeruk)", "Menyelesaikan soal cerita yang menjumlahkan, mengurangkan, atau mengubah berat.", "Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga hasil dalam kilogram dan gram. Pengecoh salah seratus gram.", "Baca cerita, lalu pilih hasilnya.", "kg g", "CERITA", "jumlah • selisih • ubah"),
    A("sentence-unit-weight", "Susun Kata Satuan Berat", "hlm. 136–139 (hubungan satuan berat)", "Menyusun kalimat tentang hubungan satuan berat dari kartu kata.", "Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh.", "Susun kartu kata menjadi kalimat.", "…", "SUSUN KATA", "kalimat satuan berat"),
  ],
  poin: [
    { ikon: "⚖️", nama: "Kilogram dan gram", isi: "1 kg = 1.000 g", suara: "Satu kilogram sama dengan seribu gram. Dua kilogram sama dengan dua ribu gram." },
    { ikon: "🔟", nama: "Kilogram dan ons", isi: "1 kg = 10 ons", suara: "Satu kilogram sama dengan sepuluh ons. Setengah kilogram sama dengan lima ons." },
    { ikon: "💯", nama: "Ons dan gram", isi: "1 ons = 100 g", suara: "Satu ons sama dengan seratus gram. Tiga ons sama dengan tiga ratus gram." },
    { ikon: "✖️", nama: "Kilogram ke gram", isi: "3 kg = 3 × 1.000 g = 3.000 g", suara: "Untuk mengubah kilogram ke gram, kalikan dengan seribu." },
    { ikon: "➗", nama: "Gram ke kilogram", isi: "1.753 g = 1 kg 753 g", suara: "Untuk mengubah gram ke kilogram, ambil tiap seribu gram sebagai satu kilogram. Seribu tujuh ratus lima puluh tiga gram sama dengan satu kilogram tujuh ratus lima puluh tiga gram." },
  ],
  poinSuara:
    "Ingat selalu! Satu kilogram sama dengan seribu gram dan sama dengan sepuluh ons. Satu ons sama dengan seratus gram. Untuk mengubah kilogram ke gram, kalikan dengan seribu. Untuk mengubah gram ke kilogram, ambil tiap seribu gram sebagai satu kilogram.",
  cara: {
    suara: "Cara mengubah satuan berat. Ingat satu kilogram sama dengan seribu gram. Kilogram ke gram, kalikan seribu. Gram ke kilogram, ambil tiap seribu gram. Lalu periksa dengan cara sebaliknya.",
    potongan: [
      { teks: "1 kg = 1.000 g", warna: "#BAE6FD" },
      { teks: "kg ke g: kali", warna: "#FECACA" },
      { teks: "g ke kg: ambil 1.000", warna: "#BFDBFE" },
      { teks: "periksa", warna: "#FDE68A" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: bersama orang tuamu, timbanglah beberapa bahan makanan dengan timbangan digital dan tulis hasilnya dalam gram. Lalu ubah menjadi kilogram dan gram, misalnya 1.250 gram menjadi 1 kg 250 gram. Jelaskan pada orang tuamu bahwa 1 kilogram sama dengan 1.000 gram.",
  refleksi: [
    "Aku tahu bahwa 1 kilogram sama dengan 1.000 gram dan 10 ons.",
    "Aku dapat mengubah kilogram ke gram dan sebaliknya.",
    "Aku dapat menulis berat dengan kilogram dan gram bersama.",
    "Aku dapat menjumlahkan dan mengurangkan berat.",
  ],
};

export const SUB_BAB_K3B3: SubBabNaskah[] = [SUB_A33, SUB_B33, SUB_C33, SUB_D33];

/** Semua adegan video, urut sub-bab, video, adegan. Dipakai uji. */
export const semuaAdeganK3B3 = SUB_BAB_K3B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
