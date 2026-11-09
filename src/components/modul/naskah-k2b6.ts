/**
 * Naskah murni Matematika Kelas 2 Bab 6 (Pengukuran), Sub-Bab A (Berat) dan B (Waktu).
 * Sumber: Buku Siswa Matematika Kelas II Kemendikbudristek, Bab 6 hlm. 155-190, diperkaya dengan metode dari luar buku:
 * tebak lalu buktikan (prediksi, uji, penjelasan), kata "besar belum tentu berat", satu benda dua hasil ukur,
 * rantai perbandingan (satu pepaya sama dengan dua mangga, satu mangga sama dengan dua manggis), model batang dan
 * titik, goresan tally, garis waktu satu hari, jalur jam untuk menghitung selisih, dan kode huruf A B C.
 *
 * Satu sumber kebenaran: komponen Tahap SMICPA membaca berkas ini, dan pembangkit master
 * (src/content-master/buat-k2-bab6.mjs) memakainya untuk menulis src/data/kelas2-bab6.json.
 * Tanpa React, tanpa jaringan. Jenis tipe dipakai bersama naskah-k2b2.ts. Uji: scripts/uji-data-k2b6.mjs.
 */
import type { GameNaskah, SubBabNaskah } from "./naskah-k2b2";

export const K2B6_META = {
  chapterId: "k2-mat-bab6",
  phaseCode: "FASE_A",
  grade: 2,
  subjectLabel: "MATEMATIKA - KELAS 2 SD",
  title: "BAB 6: PENGUKURAN",
  silabusElemen: "🌈 Fase A • Elemen Pengukuran: Berat dan Waktu (Kelas 2 SD/MI)",
  /** Suara Guru: Web Speech API perangkat saja. Laju 0,70 dan nada 1 (permintaan pemilik). */
  suaraLaju: 0.7,
  suaraNada: 1,
} as const;

const SUARA_AKHIR_SILABUS = "Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.";

const ALUR_A = ["Apa itu berat", "Tiga cara menimbang", "Posisi pada timbangan", "Kata perbandingan", "Besar belum tentu berat", "Tebak lalu buktikan", "Satuan tidak baku", "Hasil bergantung alat ukur", "Siap menimbang"];
const ALUR_B = ["Jam membantu kita", "Jarum pendek dan panjang", "Pukul tepat", "Jam analog dan digital", "Bagian hari", "Urutan kegiatan", "Lebih lama, lebih sebentar", "Menyusun hariku", "Siap membaca waktu"];

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
/* SUB-BAB A. Berat                                                         */
/* ====================================================================== */

export const SUB_A6: SubBabNaskah = {
  id: "A",
  codeTitle: "Sub-Bab A (Berat)",
  fullTitle: "Sub-Bab A: Berat",
  targetDescription:
    "Siswa membandingkan berat benda dengan timbangan jungkat-jungkit, gantungan baju, dan kedua tangan memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan, mengurutkan benda menurut beratnya, serta mengukur berat benda dengan satuan tidak baku (balok mainan, kelereng, koin, dan bola tenis) sambil memahami bahwa hasil ukur bergantung pada alat ukur yang dipakai.",
  secondaryBg: "#FEF3C7",
  secondaryBorder: "#D97706",
  secondaryText: "#78350F",
  silabus: {
    teksSuara: `Kita belajar berat. Enam sekawan piket membersihkan kelas, dan mereka mengangkat benda yang berat dan benda yang ringan. Kita membandingkan berat dua benda dengan timbangan jungkat-jungkit, gantungan baju, dan kedua tangan. Kita memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan. Kita juga mengukur berat boneka dengan bola tenis dan kelereng, lalu belajar bahwa hasil ukur bergantung pada alat ukur. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membandingkan berat benda secara langsung dengan kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan, mengurutkan benda menurut beratnya, mengukur berat benda dengan satuan tidak baku, serta menyampaikan hasilnya dengan percaya diri.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 6: Pengukuran, Sub-Bab A hlm. 158–177).",
  },
  videos: [
    {
      id: "K2B6A-V1",
      judul: "Piket Membersihkan Kelas",
      subjudul: "Enam sekawan mengangkat benda",
      adegan: [
        {
          id: "K2B6A-V1-1",
          judul: "Giliran piket",
          ketukan: [
            "Hari ini enam sekawan mendapat giliran piket membersihkan kelas.",
            "Upe dan Halim mengangkat meja bersama, karena meja itu berat.",
            "Malosi mengangkat dan menggeser kursi. Tika mengelap kaca jendela, dan Kira menyapu lantai.",
            "Lili membersihkan debu di atas meja dengan kemoceng. Mereka bertanggung jawab dengan tugas masing-masing.",
          ],
          papan: ["Giliran piket", "Meja diangkat berdua", "Kursi, jendela, lantai", "Tanggung jawab"],
        },
        {
          id: "K2B6A-V1-2",
          judul: "Berat atau ringan?",
          ketukan: [
            "Benda apa yang paling berat di kelas? Meja yang diangkat berdua itu.",
            "Benda apa yang paling ringan? Kemoceng yang dipegang Lili itu.",
            "Kita tahu karena meja perlu dua orang untuk mengangkatnya, sedangkan kemoceng cukup satu tangan.",
            "Berat adalah seberapa kuat benda ditarik ke bawah. Makin berat bendanya, makin besar tenaga yang kita perlukan.",
          ],
          papan: ["Paling berat: meja", "Paling ringan: kemoceng", "Dua orang atau satu tangan", "Berat: tarikan ke bawah"],
        },
        {
          id: "K2B6A-V1-3",
          judul: "Bercerita dengan kata berat",
          ketukan: [
            "Kita ceritakan benda-benda itu dengan kata lebih berat, paling berat, dan paling ringan.",
            "Meja lebih berat dari kursi. Kursi lebih berat dari kemoceng.",
            "Jadi meja paling berat, dan kemoceng paling ringan.",
            "Benda yang besar belum tentu paling berat. Karena itu kita perlu membandingkan dengan cara yang tepat.",
          ],
          papan: ["Kata berat", "Meja, kursi, kemoceng", "Meja paling berat", "Besar belum tentu berat"],
        },
      ],
    },
    {
      id: "K2B6A-V2",
      judul: "Tiga Cara Membandingkan Berat",
      subjudul: "Jungkat-jungkit, gantungan baju, dua tangan",
      adegan: [
        {
          id: "K2B6A-V2-1",
          judul: "Timbangan jungkat-jungkit",
          ketukan: [
            "Kita dapat membandingkan berat dua benda dengan tiga cara.",
            "Cara pertama memakai timbangan jungkat-jungkit. Ini papan yang bagian tengahnya diam, dan ujungnya naik turun.",
            "Taruh apel di satu ujung dan anggur di ujung yang lain. Ujung apel turun, karena apel lebih berat dari anggur.",
            "Posisi benda yang lebih berat berada lebih bawah. Posisi benda yang lebih ringan berada lebih atas.",
          ],
          papan: ["Tiga cara", "Jungkat-jungkit", "Apel turun, anggur naik", "Berat di bawah, ringan di atas"],
        },
        {
          id: "K2B6A-V2-2",
          judul: "Gantungan baju dan dua tangan",
          ketukan: [
            "Cara kedua memakai gantungan baju. Gantung satu benda di tiap ujung, lalu lihat ujung mana yang turun.",
            "Semangka dan apel. Ujung semangka turun, jadi semangka lebih berat dari apel.",
            "Cara ketiga memakai kedua tangan kita. Angkat satu benda di tiap tangan, lalu rasakan mana yang lebih berat.",
            "Jeruk dan apel terasa sama berat. Kedua tangan tidak turun dan tidak naik.",
          ],
          papan: ["Gantungan baju", "Semangka lebih berat", "Dua tangan", "Jeruk sama berat dengan apel"],
        },
        {
          id: "K2B6A-V2-3",
          judul: "Paling berat, paling ringan",
          ketukan: [
            "Ada empat buah: semangka, apel Malang, jeruk Medan, dan anggur.",
            "Semangka lebih berat dari apel, dan apel lebih berat dari anggur.",
            "Jadi semangka paling berat di antara ketiganya.",
            "Anggur lebih ringan dari apel, dan lebih ringan dari semangka. Jadi anggur paling ringan.",
          ],
          papan: ["Empat buah", "Semangka, apel, anggur", "Semangka paling berat", "Anggur paling ringan"],
        },
      ],
    },
    {
      id: "K2B6A-V3",
      judul: "Tika Mengukur Berat Boneka",
      subjudul: "Memakai satuan tidak baku",
      adegan: [
        {
          id: "K2B6A-V3-1",
          judul: "Satuan tidak baku",
          ketukan: [
            "Kita dapat mengukur berat benda memakai benda kecil lain yang ukurannya sama. Itu disebut satuan tidak baku.",
            "Contohnya mainan balok, kelereng, koin, dan bola tenis.",
            "Tika ingin mengukur berat bonekanya memakai bola tenis.",
            "Ia menaruh bola tenis satu per satu di piringan yang lain.",
          ],
          papan: ["Satuan tidak baku", "Balok, kelereng, koin, bola", "Boneka Tika", "Taruh satu per satu"],
        },
        {
          id: "K2B6A-V3-2",
          judul: "Satu, dua, tiga, empat",
          ketukan: [
            "Tika menaruh satu bola tenis. Boneka masih lebih berat dari satu bola tenis.",
            "Tika menaruh dua bola tenis. Boneka masih lebih berat dari dua bola tenis.",
            "Tika menaruh tiga bola tenis. Boneka masih lebih berat dari tiga bola tenis.",
            "Tika menaruh empat bola tenis, dan timbangan seimbang. Berat satu boneka sama dengan empat bola tenis.",
          ],
          papan: ["1 bola tenis", "2 bola tenis", "3 bola tenis", "4 bola tenis: seimbang"],
        },
        {
          id: "K2B6A-V3-3",
          judul: "Alat ukur yang berbeda",
          ketukan: [
            "Tika mengukur boneka itu lagi memakai kelereng.",
            "Ternyata berat satu boneka sama dengan sepuluh kelereng.",
            "Berat boneka adalah empat bola tenis, dan juga sepuluh kelereng.",
            "Hasil pengukuran bisa berbeda-beda, karena bergantung pada benda yang kita pakai sebagai alat ukur.",
          ],
          papan: ["Pakai kelereng", "10 kelereng", "4 bola tenis atau 10 kelereng", "Bergantung alat ukur"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Apa Itu Berat?",
      stepDesc:
        "Berat adalah seberapa kuat sebuah benda ditarik ke bawah. Benda yang berat terasa sulit diangkat, dan benda yang ringan terasa mudah diangkat. Upe dan Halim mengangkat meja berdua karena meja itu berat, sedangkan Lili cukup memegang kemoceng dengan satu tangan karena kemoceng itu ringan. Dua kata ini, berat dan ringan, adalah kata pertama untuk bercerita tentang berat.",
      icon: "🏋️",
      flowFrom: ALUR_A[0],
      flowTo: ALUR_A[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Tiga Cara Membandingkan Berat",
      stepDesc:
        "Kita dapat membandingkan berat dua benda dengan timbangan jungkat-jungkit, gantungan baju, atau kedua tangan kita. Timbangan jungkat-jungkit adalah papan yang bagian tengahnya diam dan ujungnya naik turun. Gantungan baju bekerja dengan cara yang sama bila tiap ujungnya diberi satu benda. Kedua tangan cocok untuk benda kecil yang aman diangkat. Apa pun alatnya, kita selalu membandingkan dua benda yang ditaruh di sisi yang berbeda.",
      icon: "⚖️",
      flowFrom: ALUR_A[1],
      flowTo: ALUR_A[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Posisi pada Timbangan",
      stepDesc:
        "Posisi benda yang lebih berat berada lebih bawah, dan posisi benda yang lebih ringan berada lebih atas. Kalau kedua sisi sejajar dan datar, kedua benda sama berat. Jadi kita cukup melihat ke mana timbangan miring untuk tahu benda mana yang lebih berat. Apel pada timbangan turun, anggur naik, jadi apel lebih berat dari anggur.",
      icon: "↕️",
      flowFrom: ALUR_A[2],
      flowTo: ALUR_A[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Kata Perbandingan Berat",
      stepDesc:
        "Ada lima kata untuk bercerita tentang berat. Lebih berat dan lebih ringan membandingkan dua benda. Sama berat dipakai bila timbangan seimbang. Paling berat dan paling ringan dipakai untuk membandingkan tiga benda atau lebih. Semangka lebih berat dari apel, dan apel lebih berat dari anggur, jadi semangka paling berat dan anggur paling ringan.",
      icon: "🔤",
      flowFrom: ALUR_A[3],
      flowTo: ALUR_A[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Besar Belum Tentu Berat",
      stepDesc:
        "Ukuran besar belum tentu berarti berat. Balon yang besar sangat ringan, sedangkan batu kecil terasa berat. Kupu-kupu lebih ringan dari burung walaupun sayapnya lebar. Karena itu kita tidak boleh menebak berat hanya dari besarnya benda. Kita harus merasakan dengan tangan atau membuktikan dengan timbangan.",
      icon: "🎈",
      flowFrom: ALUR_A[4],
      flowTo: ALUR_A[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Tebak Lalu Buktikan",
      stepDesc:
        "Seorang ilmuwan cilik selalu menebak dulu, lalu membuktikan. Langkahnya empat: ambil dua benda, tebak benda mana yang lebih berat, timbang dengan kedua tangan, gantungan baju, atau jungkat-jungkit, lalu tulis hasilnya di tabel. Bila tebakanmu meleset, tidak apa-apa. Dari tebakan yang meleset kita belajar bahwa perasaan kita bisa keliru, dan timbangan membantu kita menjadi lebih teliti.",
      icon: "🔬",
      flowFrom: ALUR_A[5],
      flowTo: ALUR_A[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Satuan Tidak Baku",
      stepDesc:
        "Kita juga dapat mengukur berat sebuah benda memakai benda kecil lain yang ukurannya sama, misalnya mainan balok, kelereng, koin, atau bola tenis. Ini disebut satuan tidak baku. Taruh benda yang diukur di satu piringan, lalu taruh satuan di piringan yang lain satu per satu sampai timbangan seimbang. Banyaknya satuan adalah hasil pengukuran. Satuan yang dipakai harus sama dan satu jenis, supaya hitungannya adil.",
      icon: "🎾",
      flowFrom: ALUR_A[6],
      flowTo: ALUR_A[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Hasil Bergantung pada Alat Ukur",
      stepDesc:
        "Berat satu boneka sama dengan empat bola tenis, dan juga sama dengan sepuluh kelereng. Bonekanya sama, tetapi hasilnya berbeda, karena kelereng lebih ringan daripada bola tenis. Satuan yang lebih ringan memerlukan jumlah yang lebih banyak. Kita juga dapat menyusun rantai perbandingan: satu pepaya sama dengan dua mangga, dan satu mangga sama dengan dua manggis, jadi satu pepaya sama dengan empat manggis.",
      icon: "🧸",
      flowFrom: ALUR_A[7],
      flowTo: ALUR_A[8],
    },
  ],
  infografis: [
    {
      judul: "Tiga Cara Menimbang",
      emoji: "⚖️",
      countNum: 3,
      countWord: "Tiga",
      suara: "Ada tiga cara membandingkan berat dua benda: timbangan jungkat-jungkit, gantungan baju, dan kedua tangan kita.",
    },
    {
      judul: "Posisi pada Timbangan",
      emoji: "↕️",
      countNum: 2,
      countWord: "Dua",
      suara: "Posisi benda yang lebih berat berada lebih bawah. Posisi benda yang lebih ringan berada lebih atas.",
    },
    {
      judul: "Tiga Kata Perbandingan",
      emoji: "🔤",
      countNum: 3,
      countWord: "Tiga",
      suara: "Untuk dua benda kita memakai tiga kata: lebih berat, lebih ringan, dan sama berat.",
    },
    {
      judul: "Paling Berat dan Paling Ringan",
      emoji: "🏆",
      countNum: 2,
      countWord: "Dua",
      suara: "Untuk tiga benda atau lebih kita memakai paling berat dan paling ringan. Semangka paling berat, anggur paling ringan.",
    },
    {
      judul: "Besar Belum Tentu Berat",
      emoji: "🎈",
      countNum: 2,
      countWord: "Dua",
      suara: "Balon yang besar sangat ringan, dan batu yang kecil terasa berat. Jangan menebak berat hanya dari besarnya benda.",
    },
    {
      judul: "Empat Satuan Tidak Baku",
      emoji: "🎾",
      countNum: 4,
      countWord: "Empat",
      suara: "Empat contoh satuan tidak baku: mainan balok, kelereng, koin, dan bola tenis. Semuanya benda kecil yang ukurannya sama.",
    },
    {
      judul: "Cara Mengukur Berat",
      emoji: "🧸",
      countNum: 4,
      countWord: "Empat",
      suara: "Empat langkah mengukur berat. Satu, tebak dulu. Dua, taruh satuan satu per satu. Tiga, berhenti saat seimbang. Empat, tulis hasilnya.",
    },
    {
      judul: "Satu Boneka, Dua Hasil",
      emoji: "🔁",
      countNum: 2,
      countWord: "Dua",
      suara: "Berat satu boneka sama dengan empat bola tenis, dan juga sama dengan sepuluh kelereng. Alat ukurnya berbeda, hasilnya berbeda.",
    },
    {
      judul: "Satuan Ringan, Hitungan Banyak",
      emoji: "🔢",
      countNum: 2,
      countWord: "Dua",
      suara: "Kelereng lebih ringan daripada bola tenis. Karena itu kita memerlukan lebih banyak kelereng, yaitu sepuluh, dibanding bola tenis, yaitu empat.",
    },
    {
      judul: "Rantai Perbandingan",
      emoji: "🥭",
      countNum: 3,
      countWord: "Tiga",
      suara: "Satu pepaya sama dengan dua mangga. Satu mangga sama dengan dua manggis. Jadi satu pepaya sama dengan empat manggis.",
    },
  ],
  games: [
    C("lift-two-hands-compare", "Angkat dengan Dua Tangan", "hlm. 160–162 (membandingkan dengan kedua tangan; Ayo Mencoba nomor 1 sampai 4)", "Merasakan dan menentukan benda yang lebih berat, lebih ringan, atau sama berat dengan kedua tangan.", "Empat ronde, tiap ronde tiga pasang benda, misalnya semangka dan apel, jeruk dan anggur, buku dan pensil. Siswa menekan Angkat dua-duanya, melihat tangan yang memegang benda lebih berat turun lebih rendah, lalu memilih satu dari tiga pernyataan. Dua pasang sama berat. Kunci dihitung dari tabel berat benda.", "Angkat kedua benda, lalu pilih yang lebih berat.", "🤲", 12),
    C("seesaw-place-and-compare", "Jungkat-Jungkit", "hlm. 158–159 (timbangan jungkat-jungkit; posisi benda yang lebih berat berada lebih bawah)", "Menaruh dua benda pada timbangan jungkat-jungkit dan membaca sisi yang turun.", "Empat ronde, tiap ronde dua benda. Siswa mengetuk benda, lalu mengetuk piringan kiri atau kanan. Piringan yang berisi benda lebih berat turun. Setelah kedua benda terpasang, siswa memilih yang lebih berat. Satu ronde sama berat. Siswa boleh menukar tempat benda.", "Taruh benda di piringan, lalu lihat yang turun.", "⚖️", 4),
    C("guess-then-prove-hanger", "Gantungan Baju: Tebak dan Buktikan", "hlm. 161–162 (Ayo Mencoba nomor 2 dan 3: tebak benda yang lebih berat, lalu buktikan)", "Menebak benda yang lebih berat, lalu membuktikannya dengan gantungan baju.", "Tiga ronde, tiap ronde dua pasang benda. Siswa memilih tebakan dulu. Setelah memilih, gantungan dilepas dan miringnya membuktikan jawaban. Tebakan yang meleset diberi penjelasan dan boleh dipilih ulang.", "Tebak dulu, lalu lihat gantungannya.", "🧥", 6),
    C("order-by-weight-tap", "Urutkan dari Ringan ke Berat", "hlm. 175 dan 177 (urutan benda dari yang paling ringan)", "Mengurutkan tiga atau empat benda dari paling ringan atau dari paling berat.", "Empat ronde, tiga atau empat benda, dua ronde dari paling ringan dan dua ronde dari paling berat. Siswa mengetuk benda satu per satu sesuai urutan. Benda yang salah memberi petunjuk. Kunci dihitung dari tabel berat benda.", "Ketuk benda sesuai urutan beratnya.", "📶", 4),
    C("sort-heavier-lighter-reference", "Pilah: Lebih Berat atau Lebih Ringan", "hlm. 165–167 (warnai yang paling berat dan paling ringan; lengkapi kalimat)", "Memilah benda yang lebih berat dan yang lebih ringan dari sebuah benda acuan.", "Tiga ronde, tiap ronde satu benda acuan dan enam benda lain. Siswa menyeret atau mengetuk benda ke kotak Lebih berat dari acuan atau Lebih ringan dari acuan. Benda yang salah kembali dengan petunjuk.", "Pilah benda ke kotak yang tepat.", "📦", 3),
    C("balance-with-informal-units", "Timbang dengan Satuan", "hlm. 168–170 (Tika mengukur berat boneka dengan bola tenis dan kelereng)", "Menambah satuan tidak baku satu per satu sampai timbangan seimbang.", "Empat ronde: boneka dengan bola tenis, boneka dengan kelereng, buku dengan bola tenis, dan gunting dengan koin. Siswa menekan tombol tambah satuan di piringan kanan sampai neraca seimbang. Neraca miring sesuai berat sehingga siswa tahu harus menambah atau mengurangi.", "Tambah satuan sampai timbangan seimbang.", "🎾", 4),
    C("count-units-on-scale", "Berapa Satuan?", "hlm. 172–173 (Ayo Berlatih nomor 1: tuliskan hasil pengukuran)", "Membaca hasil pengukuran berat dari gambar timbangan yang seimbang.", "Tiga ronde, tiap ronde dua gambar neraca seimbang, misalnya tas dengan bola tenis atau penggaris dengan koin. Siswa memilih banyak satuan dari tiga pilihan angka. Kunci dihitung dari berat benda dan berat satuan.", "Hitung satuan di piringan, lalu pilih angkanya.", "🔢", 6),
    C("tap-heaviest-lightest", "Cari yang Paling Berat dan Paling Ringan", "hlm. 165 dan 176 (warnai benda yang paling berat dan paling ringan)", "Menemukan benda yang paling berat dan paling ringan di antara beberapa benda.", "Empat ronde, kelompok empat atau lima benda. Tiap ronde punya dua pertanyaan: paling berat, lalu paling ringan. Siswa mengetuk bendanya. Letak benda yang benar berpindah-pindah.", "Ketuk benda yang paling berat atau paling ringan.", "🏆", 8),
    C("match-object-to-measure", "Jodohkan Hasil Ukur", "hlm. 172–173 (tabel hasil percobaan dan hasil pengukuran)", "Menjodohkan benda dengan hasil pengukuran beratnya.", "Tiga ronde, tiap ronde tiga benda dan tiga hasil ukur, misalnya boneka dengan empat bola tenis. Siswa mengetuk benda, lalu mengetuk hasil ukurnya. Pasangan yang benar terkunci.", "Ketuk benda, lalu ketuk hasil ukurnya.", "🔗", 9),
    C("pack-basket-heavy-first", "Tata Keranjang Belanja", "hlm. 159 (benda yang lebih berat berada lebih bawah), diperkaya konteks belanja", "Menaruh belanjaan yang berat di dasar keranjang dan yang ringan di atasnya.", "Tiga ronde, tiap ronde tiga belanjaan. Siswa mengetuk belanjaan satu per satu mulai yang paling berat, sehingga tumpukan di keranjang tidak menekan barang ringan. Urutan salah memberi petunjuk.", "Taruh yang paling berat di dasar keranjang dulu.", "🧺", 3),
    P("read-balance-diagram", "Baca Neraca Balok", "hlm. 158–160 (posisi benda yang lebih berat lebih bawah)", "Membaca kemiringan neraca yang memuat balok berhuruf.", "Tiga ronde, tiap ronde tiga neraca dengan balok A, B, C, D, E, F tanpa gambar benda. Siswa membaca sisi yang turun, lalu memilih pernyataan yang tepat. Sebagian neraca seimbang. Kunci dihitung dari bobot balok.", "Lihat sisi yang turun, lalu pilih pernyataannya.", "balance-blocks", 3, 3),
    P("order-letters-from-balances", "Urutan dari Beberapa Neraca", "hlm. 159–160 (semangka lebih berat dari apel dan anggur) dalam bentuk diagram huruf", "Mengurutkan balok berhuruf dari beberapa neraca yang membandingkan dua balok.", "Tiga ronde dengan tiga atau empat balok. Tiap ronde menampilkan dua sampai tiga neraca yang masing-masing membandingkan dua balok. Siswa mengetuk huruf dari yang paling ringan atau paling berat. Hanya satu urutan yang cocok dengan semua neraca.", "Baca semua neraca, lalu ketuk huruf berurutan.", "balance-chain", 3, 4),
    P("bar-model-weight", "Batang Berat", "hlm. 158–165 (membandingkan berat) dalam model batang", "Membaca batang yang menunjukkan berat dan menemukan yang paling tinggi dan paling rendah.", "Tiga ronde, tiap ronde tiga sampai empat batang berhuruf dengan tinggi berbeda. Siswa mengetuk batang yang paling berat dan batang yang paling ringan. Kunci dihitung dari tinggi batang.", "Ketuk batang yang paling tinggi atau paling rendah.", "bar-model", 3, 4),
    P("count-dots-balanced", "Hitung Titik di Neraca", "hlm. 168–170 (mengukur berat dengan satuan) dalam diagram titik", "Menghitung titik satuan yang seimbang dengan satu balok.", "Tiga ronde, tiap ronde dua neraca seimbang. Satu balok di kiri dan sejumlah titik di kanan. Siswa menghitung titik dan memilih banyaknya dari tiga angka.", "Hitung titik di piringan kanan.", "dot-balance", 3, 2),
    P("tally-dots", "Goresan Titik", "hlm. 168–170 (hasil pengukuran) dalam goresan tally", "Menuliskan hasil pengukuran sebagai goresan tally.", "Tiga ronde, tiap ronde dua soal. Siswa menekan Goresan sebanyak titik yang sama berat dengan satu balok, lalu menekan Periksa. Setiap lima goresan dikelompokkan.", "Tambah goresan sebanyak titiknya.", "tally", 3, 2),
    P("fill-weight-table", "Tabel Hasil Ukur", "hlm. 162 dan 172 (tabel tebakan dan tabel hasil percobaan)", "Mengisi tabel hasil pengukuran berat dari diagram.", "Dua ronde dengan tabel berisi empat baris. Di atas tabel ada empat neraca seimbang: satu balok berhuruf dan sejumlah titik. Siswa menghitung titik, mengetuk baris, lalu mengetuk kartu angka yang tepat. Kartu angka yang sama dapat dipakai lagi bila diperlukan.", "Isi tabel dengan kartu angka.", "table", 2, 4),
    P("match-balance-sentence", "Jodohkan Neraca dan Kalimat", "hlm. 159–160 (kalimat perbandingan dari gambar neraca)", "Menjodohkan gambar neraca dengan kalimat perbandingannya.", "Tiga ronde, tiap ronde tiga neraca berhuruf dan tiga kalimat, misalnya A lebih berat dari B. Siswa mengetuk neraca, lalu mengetuk kalimat yang cocok.", "Ketuk neraca, lalu ketuk kalimatnya.", "balance-sentence", 3, 3),
    P("sort-balance-diagrams", "Pilah Diagram Neraca", "hlm. 158–160 (membandingkan dua benda) dalam diagram", "Memilah diagram neraca menurut sisi yang lebih berat.", "Tiga ronde, tiap ronde enam diagram neraca. Siswa menyeret atau mengetuk diagram ke kotak Kiri lebih berat, Sama berat, atau Kanan lebih berat.", "Pilah diagram ke kotak yang tepat.", "balance-sort", 3, 6),
    P("number-line-dots", "Garis Angka Titik", "hlm. 168–170 (hasil pengukuran) pada garis bilangan", "Menandai banyak titik yang sama berat dengan satu balok pada garis angka.", "Tiga ronde, tiap ronde tiga soal pada garis angka satu sampai sepuluh. Siswa mengetuk bulatan angka yang tepat. Jawaban yang salah memberi petunjuk.", "Ketuk angka yang diminta pada garis.", "number-line", 3, 3),
    P("balance-chart-dots", "Seimbangkan Bagan", "hlm. 168–171 (menambah satuan sampai seimbang) dalam bagan titik", "Menambah titik sampai neraca bagan seimbang dengan satu balok.", "Tiga ronde, tiap ronde satu balok bertuliskan huruf. Siswa menambah titik satu per satu sampai neraca seimbang. Bagan miring sesuai bobot sehingga siswa tahu harus menambah atau mengurangi.", "Tambah titik sampai neraca seimbang.", "balance-chart", 3, 1),
    A("complete-weight-sentences", "Lengkapi Kalimat Berat", "hlm. 162–163 dan 166–167 (lengkapi kalimat dengan lebih berat, lebih ringan, sama berat)", "Melengkapi kalimat perbandingan berat dengan kata yang tepat.", "Dua ronde, tiap ronde tiga kalimat, misalnya semangka ... apel. Siswa memilih satu dari tiga kata hubungan. Kalimat yang lengkap dibacakan Suara Guru.", "Pilih kata yang tepat untuk bagian kosong.", "> < =", "LEBIH BERAT", "lebih berat • lebih ringan • sama berat"),
    A("true-false-weight", "Benar atau Salah: Berat", "hlm. 158–171 (membandingkan dan mengukur berat)", "Menilai pernyataan tentang berat, timbangan, dan satuan tidak baku.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan tentang benda dihitung dari tabel berat. Setiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("build-weight-sentence", "Susun Kalimat Berat", "hlm. 159–160 dan 170 (kalimat perbandingan dan hasil pengukuran)", "Menyusun kata menjadi kalimat tentang berat.", "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • makna"),
    A("chain-multiplication-weights", "Hitung Cerdas Berat", "hlm. 176 dan 188 (satu pepaya sama dengan berapa manggis; berat 1, 2, dan 3 jeruk sama dengan berapa stroberi)", "Menghitung berat dengan rantai perbandingan dan penjumlahan berulang.", "Tiga ronde, tiap ronde dua soal cerita, misalnya satu mangga sama dengan dua manggis dan satu pepaya sama dengan dua mangga, berapa manggis sama dengan satu pepaya. Siswa memilih satu dari tiga angka. Kunci dihitung dari tabel berat.", "Baca soal, lalu pilih jawabannya.", "2 + 2", "HITUNG", "kali banyaknya sama dengan tambah berulang"),
    A("fill-multiples-table", "Tabel Kelipatan Berat", "hlm. 188 (Evaluasi nomor 3: berat 1, 2, dan 3 jeruk sama dengan berapa stroberi)", "Mengisi tabel kelipatan berat dua benda.", "Dua ronde dengan tabel berisi empat baris, misalnya satu, dua, tiga, dan empat jeruk dengan banyak stroberi. Siswa mengetuk baris, lalu mengetuk kartu angka.", "Isi tabel dengan kartu angka.", "1 2 3 4", "TABEL", "setiap tambah satu, tambah sebanyak yang sama"),
    A("compare-measure-numbers", "Mana Lebih Berat dari Angka", "hlm. 175 (berat benda dibandingkan 9 kelereng)", "Membandingkan dua benda dari hasil ukur dengan satuan yang sama.", "Tiga ronde, tiap ronde dua soal. Dua benda diukur dengan satuan yang sama, misalnya A lima kelereng dan B delapan kelereng. Siswa memilih benda yang lebih berat atau sama berat. Satuan yang sama membuat angka dapat dibandingkan.", "Bandingkan angkanya, lalu pilih jawabannya.", "5 < 8", "BANDINGKAN", "satuan sama, angka lebih besar, lebih berat"),
    A("riddle-weight-clues", "Detektif Berat", "hlm. 165–167 (lebih berat dari, lebih ringan dari)", "Menemukan sebuah benda dari dua petunjuk perbandingan berat.", "Empat soal. Siswa membaca dua petunjuk, misalnya aku lebih berat dari apel dan lebih ringan dari semangka, lalu memilih satu dari tiga nama. Hanya satu nama yang cocok dengan kedua petunjuk.", "Baca semua petunjuk, lalu pilih namanya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-fill", "Peta Konsep Berat", "hlm. 156 (peta konsep pengukuran: berat)", "Melengkapi peta konsep membandingkan berat dan satuan tidak baku.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "berat • alat • satuan"),
    A("order-by-measure-numbers", "Urutkan dari Angka", "hlm. 175 nomor 3h dan hlm. 177 (urutan berat dari yang paling ringan)", "Mengurutkan benda dari hasil ukur dengan satuan yang sama.", "Tiga ronde, tiap ronde tiga atau empat benda dengan hasil ukur satuan yang sama, misalnya buku 15 koin. Siswa mengetuk benda dari yang paling ringan atau paling berat menurut angkanya.", "Ketuk menurut angka, dari kecil atau dari besar.", "4 < 6 < 15", "URUTKAN", "angka kecil, lebih ringan"),
    A("select-all-true-weight", "Ketuk Semua yang Benar", "hlm. 158–171 (membandingkan dan mengukur berat)", "Memilih semua pernyataan benar tentang timbangan dan satuan tidak baku.", "Tiga ronde, tiap ronde lima pernyataan dengan beberapa yang benar. Siswa mengetuk semua yang benar, lalu menekan Periksa. Pernyataan yang salah dijelaskan.", "Ketuk semua yang benar, lalu periksa.", "✔✔", "SEMUA BENAR", "boleh lebih dari satu"),
  ],
  poin: [
    {
      ikon: "⚖️",
      nama: "Tiga cara menimbang",
      isi: "jungkat-jungkit, gantungan baju, tangan",
      suara: "Kita membandingkan berat dengan timbangan jungkat-jungkit, gantungan baju, atau kedua tangan.",
    },
    {
      ikon: "↕️",
      nama: "Posisi timbangan",
      isi: "berat di bawah, ringan di atas",
      suara: "Posisi benda yang lebih berat berada lebih bawah, dan posisi benda yang lebih ringan berada lebih atas.",
    },
    {
      ikon: "🔤",
      nama: "Kata perbandingan",
      isi: "lebih berat, lebih ringan, sama berat, paling berat, paling ringan",
      suara: "Kata perbandingan berat adalah lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan.",
    },
    {
      ikon: "🎾",
      nama: "Satuan tidak baku",
      isi: "balok, kelereng, koin, bola tenis",
      suara: "Mainan balok, kelereng, koin, dan bola tenis dapat dipakai sebagai satuan tidak baku untuk mengukur berat.",
    },
    {
      ikon: "🧸",
      nama: "Hasil bergantung alat ukur",
      isi: "satuan lebih ringan, hitungan lebih banyak",
      suara: "Satu boneka sama dengan empat bola tenis, dan juga sepuluh kelereng. Hasil pengukuran bergantung pada alat ukur yang dipakai.",
    },
  ],
  poinSuara:
    "Ingat selalu! Kita membandingkan berat dengan jungkat-jungkit, gantungan baju, atau kedua tangan. Benda yang lebih berat berada lebih bawah. Kita memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan. Berat juga dapat diukur dengan satuan tidak baku, dan hasilnya bergantung pada alat ukur.",
  cara: {
    suara: "Cara menyebutkan. Semangka lebih berat dari apel. Sebut benda pertama, kata perbandingan, lalu benda yang dibandingkan.",
    potongan: [
      { teks: "Benda", warna: "#FFFFFF" },
      { teks: "kata perbandingan", warna: "#FFE566" },
      { teks: "dari", warna: "#FFFFFF" },
      { teks: "benda lain", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ambil lima benda kecil di rumahmu, tebak benda mana yang lebih berat, lalu buktikan dengan kedua tangan atau gantungan baju, dan tulis hasilnya pada tabel. Dengan bantuan orang tua, ukur satu benda ringan memakai kelereng atau koin, lalu ceritakan hasilnya.",
  refleksi: [
    "Aku dapat membandingkan berat benda.",
    "Aku dapat menghitung berat benda dengan satuan tidak baku.",
    "Aku belajar dengan tertib.",
    "Aku menyampaikan pendapat dengan percaya diri.",
  ],
};

/* ====================================================================== */
/* SUB-BAB B. Waktu                                                         */
/* ====================================================================== */

export const SUB_B6: SubBabNaskah = {
  id: "B",
  codeTitle: "Sub-Bab B (Waktu)",
  fullTitle: "Sub-Bab B: Waktu",
  targetDescription:
    "Siswa membaca dan menunjukkan pukul tepat pada jam analog dengan jarum pendek (jam) dan jarum panjang (menit), mengenal jam digital, mengelompokkan kegiatan sehari-hari menurut pagi, siang, sore, dan malam, mengurutkan kegiatan menurut waktunya, serta membandingkan dua kegiatan dengan kata lebih lama dan lebih sebentar.",
  secondaryBg: "#DCFCE7",
  secondaryBorder: "#16A34A",
  secondaryText: "#14532D",
  silabus: {
    teksSuara: `Kita belajar waktu. Jam membantu kita mengetahui waktu sehari-hari. Kita belajar membaca jam analog, yaitu jarum pendek menunjukkan jam dan jarum panjang menunjukkan menit. Kita juga mengenal jam digital. Kita mengikuti kegiatan Tika dari pagi sampai malam, lalu membandingkan kegiatan yang lebih lama dan yang lebih sebentar, seperti berolahraga dan mandi. ${SUARA_AKHIR_SILABUS}`,
    cp: "Siswa membaca jam tepat pada jam analog, mengenal jam digital, menunjukkan kegiatan menurut pagi, siang, sore, dan malam, mengurutkan kegiatan, serta membandingkan lama kegiatan dengan kata lebih lama dan lebih sebentar.",
    referensi: "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 6: Pengukuran, Sub-Bab B hlm. 178–190).",
  },
  videos: [
    {
      id: "K2B6B-V1",
      judul: "Jam dan Jarumnya",
      subjudul: "Halim bangun tidur pukul lima",
      adegan: [
        {
          id: "K2B6B-V1-1",
          judul: "Bagian-bagian jam",
          ketukan: [
            "Jam membantu kita mengetahui waktu sehari-hari.",
            "Jam analog mempunyai jarum pendek, jarum panjang, dan angka satu sampai dua belas.",
            "Jam digital menunjukkan waktu dengan angka, misalnya nol lima titik nol nol.",
          ],
          papan: ["Jam membantu kita", "Jam analog", "Jam digital 05.00"],
        },
        {
          id: "K2B6B-V1-2",
          judul: "Pukul lima tepat",
          ketukan: [
            "Jarum pendek menunjukkan jam.",
            "Jarum panjang menunjukkan menit.",
            "Jarum pendek di angka lima dan jarum panjang di angka dua belas menunjukkan pukul lima tepat.",
            "Halim bangun tidur pukul lima pagi. Kita mengetahuinya dengan melihat kedua jarum.",
          ],
          papan: ["Pendek: jam", "Panjang: menit", "Pukul 5 tepat", "Halim bangun pukul 5"],
        },
        {
          id: "K2B6B-V1-3",
          judul: "Membaca pukul tepat",
          ketukan: [
            "Kalau jarum panjang di angka dua belas, kita membaca jam dari jarum pendek.",
            "Jarum pendek di angka enam, berarti pukul enam.",
            "Jarum pendek di angka tujuh, berarti pukul tujuh.",
            "Jarum pendek dan jarum panjang sama-sama di angka dua belas, berarti pukul dua belas tepat.",
          ],
          papan: ["Panjang di angka 12", "Pukul 6", "Pukul 7", "Pukul 12 tepat"],
        },
      ],
    },
    {
      id: "K2B6B-V2",
      judul: "Kegiatan Tika Sehari-hari",
      subjudul: "Pagi, siang, sore, dan malam",
      adegan: [
        {
          id: "K2B6B-V2-1",
          judul: "Pagi hari",
          ketukan: [
            "Tika sarapan pukul enam pagi.",
            "Tika dan teman-teman belajar di sekolah mulai pukul tujuh pagi.",
            "Pagi hari adalah waktu saat matahari baru terbit, dan kita bersiap berangkat sekolah.",
          ],
          papan: ["Sarapan pukul 6", "Sekolah pukul 7", "Matahari terbit"],
        },
        {
          id: "K2B6B-V2-2",
          judul: "Siang dan sore",
          ketukan: [
            "Tika dan teman-teman makan di kantin pukul dua belas siang.",
            "Siang hari matahari berada paling tinggi di langit.",
            "Tika bermain bersama adik pukul empat sore.",
            "Sore hari matahari mulai turun.",
          ],
          papan: ["Kantin pukul 12", "Siang: matahari tinggi", "Bermain pukul 4", "Sore: matahari turun"],
        },
        {
          id: "K2B6B-V2-3",
          judul: "Malam hari",
          ketukan: [
            "Tika tidur sejak pukul sembilan malam.",
            "Malam hari langit gelap, dan kita beristirahat.",
            "Satu hari terdiri dari pagi, siang, sore, dan malam.",
            "Setiap kegiatan punya waktu yang tepat.",
          ],
          papan: ["Tidur pukul 9", "Langit gelap", "Pagi, siang, sore, malam", "Waktu yang tepat"],
        },
      ],
    },
    {
      id: "K2B6B-V3",
      judul: "Olahraga Hari Minggu",
      subjudul: "Lebih lama atau lebih sebentar",
      adegan: [
        {
          id: "K2B6B-V3-1",
          judul: "Kira berolahraga",
          ketukan: [
            "Sekarang hari Minggu. Setiap hari Minggu, Kira selalu berolahraga.",
            "Ia berlari mengelilingi taman dekat rumahnya.",
            "Kira berolahraga mulai pukul enam sampai pukul tujuh pagi.",
            "Setelah berolahraga, Kira mandi agar badannya segar kembali.",
          ],
          papan: ["Hari Minggu", "Lari di taman", "Pukul 6 sampai 7", "Mandi agar segar"],
        },
        {
          id: "K2B6B-V3-2",
          judul: "Lebih lama atau lebih sebentar?",
          ketukan: [
            "Manakah kegiatan yang lebih lama? Berolahraga atau mandi?",
            "Kira berolahraga satu jam, sedangkan mandinya hanya lima belas menit.",
            "Berolahraga lebih lama dari mandi.",
            "Mandi lebih sebentar dari berolahraga.",
          ],
          papan: ["Olahraga atau mandi?", "1 jam dan 15 menit", "Olahraga lebih lama", "Mandi lebih sebentar"],
        },
        {
          id: "K2B6B-V3-3",
          judul: "Membandingkan waktu",
          ketukan: [
            "Kita dapat membandingkan waktu dua kegiatan.",
            "Kita memakai kata lebih lama dan lebih sebentar.",
            "Tidur malam lebih lama dari menyikat gigi.",
            "Mencuci tangan lebih sebentar dari bermain bola.",
          ],
          papan: ["Bandingkan waktu", "Lebih lama, lebih sebentar", "Tidur lebih lama", "Cuci tangan sebentar"],
        },
      ],
    },
  ],
  mindMaps: [
    {
      stepNumber: 1,
      stepTitle: "1. Jam Membantu Kita",
      stepDesc:
        "Jam membantu kita mengetahui waktu sehari-hari. Dengan jam kita tahu kapan harus bangun, sarapan, berangkat sekolah, bermain, dan tidur. Halim bangun tidur tepat pada waktunya karena ia melihat jam. Kebiasaan melihat jam membuat kita disiplin dan tidak terlambat.",
      icon: "⏰",
      flowFrom: ALUR_B[0],
      flowTo: ALUR_B[1],
    },
    {
      stepNumber: 2,
      stepTitle: "2. Jarum Pendek dan Jarum Panjang",
      stepDesc:
        "Jam analog mempunyai dua jarum. Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit. Kita selalu melihat jarum pendek dulu untuk mengetahui jam berapa, lalu melihat jarum panjang untuk mengetahui menitnya. Jarum pendek bergerak pelan, dan jarum panjang bergerak lebih cepat.",
      icon: "🕐",
      flowFrom: ALUR_B[1],
      flowTo: ALUR_B[2],
    },
    {
      stepNumber: 3,
      stepTitle: "3. Pukul Tepat",
      stepDesc:
        "Bila jarum panjang menunjuk angka dua belas, waktunya adalah pukul tepat. Jam ditentukan oleh jarum pendek. Jarum pendek di angka lima dan jarum panjang di angka dua belas berarti pukul lima tepat. Jarum pendek di angka enam dan jarum panjang di angka dua belas berarti pukul enam tepat. Kita menyebutnya dengan pukul dan angkanya.",
      icon: "🕔",
      flowFrom: ALUR_B[2],
      flowTo: ALUR_B[3],
    },
    {
      stepNumber: 4,
      stepTitle: "4. Jam Analog dan Jam Digital",
      stepDesc:
        "Jam analog menunjukkan waktu dengan jarum, dan jam digital menunjukkan waktu dengan angka. Pada jam digital, dua angka pertama adalah jam dan dua angka sesudah titik adalah menit. Pukul lima tepat ditulis nol lima titik nol nol. Pukul enam pagi ditulis nol enam titik nol nol. Jam digital sering memakai dua puluh empat jam, jadi pukul empat sore ditulis enam belas titik nol nol, dan pukul sembilan malam ditulis dua puluh satu titik nol nol. Keduanya menunjukkan waktu yang sama dengan jam analog.",
      icon: "🔢",
      flowFrom: ALUR_B[3],
      flowTo: ALUR_B[4],
    },
    {
      stepNumber: 5,
      stepTitle: "5. Pagi, Siang, Sore, Malam",
      stepDesc:
        "Satu hari dibagi menjadi pagi, siang, sore, dan malam. Pagi hari matahari baru terbit, siang hari matahari paling tinggi, sore hari matahari mulai turun, dan malam hari langit gelap. Jarum pendek berputar dua kali dalam satu hari, jadi pukul enam bisa pukul enam pagi atau pukul enam sore. Karena itu kita menambahkan kata pagi, siang, sore, atau malam.",
      icon: "🌅",
      flowFrom: ALUR_B[4],
      flowTo: ALUR_B[5],
    },
    {
      stepNumber: 6,
      stepTitle: "6. Mengurutkan Kegiatan",
      stepDesc:
        "Kegiatan sehari-hari terjadi satu per satu menurut waktunya. Tika sarapan pukul enam pagi, belajar pukul tujuh pagi, makan di kantin pukul dua belas siang, bermain pukul empat sore, dan tidur pukul sembilan malam. Untuk mengurutkan kegiatan, lihat jam dan bagian harinya. Waktu yang lebih awal berada lebih dulu.",
      icon: "📅",
      flowFrom: ALUR_B[5],
      flowTo: ALUR_B[6],
    },
    {
      stepNumber: 7,
      stepTitle: "7. Lebih Lama dan Lebih Sebentar",
      stepDesc:
        "Kegiatan ada yang memerlukan waktu lama dan ada yang sebentar. Kira berolahraga satu jam, sedangkan mandi hanya lima belas menit. Jadi berolahraga lebih lama dari mandi, dan mandi lebih sebentar dari berolahraga. Mencuci tangan sangat sebentar, dan tidur malam sangat lama. Kita memakai kata lebih lama dan lebih sebentar untuk membandingkan dua kegiatan.",
      icon: "⏳",
      flowFrom: ALUR_B[6],
      flowTo: ALUR_B[7],
    },
    {
      stepNumber: 8,
      stepTitle: "8. Menyusun Hariku",
      stepDesc:
        "Kita dapat menyusun satu hari dengan jadwal yang rapi. Tuliskan satu kegiatan untuk pagi, siang, sore, dan malam, lengkap dengan jamnya. Untuk menghitung lama sebuah kegiatan, hitung berapa jam jarum pendek bergerak dari mulai sampai selesai. Dari pukul enam sampai pukul tujuh, jarum pendek bergerak satu jam. Jadwal yang rapi membantu kita belajar, bermain, dan beristirahat dengan seimbang.",
      icon: "🗓️",
      flowFrom: ALUR_B[7],
      flowTo: ALUR_B[8],
    },
  ],
  infografis: [
    {
      judul: "Bagian Jam Analog",
      emoji: "⏰",
      countNum: 3,
      countWord: "Tiga",
      suara: "Jam analog punya tiga bagian penting: jarum pendek, jarum panjang, dan angka satu sampai dua belas.",
    },
    {
      judul: "Jarum Pendek dan Panjang",
      emoji: "🕐",
      countNum: 2,
      countWord: "Dua",
      suara: "Jarum pendek menunjukkan jam. Jarum panjang menunjukkan menit.",
    },
    {
      judul: "Pukul Tepat",
      emoji: "🕔",
      countNum: 2,
      countWord: "Dua",
      suara: "Pukul tepat artinya jarum panjang di angka dua belas, dan jarum pendek menunjukkan jamnya. Jarum pendek di angka lima berarti pukul lima tepat.",
    },
    {
      judul: "Jam Analog dan Digital",
      emoji: "🔢",
      countNum: 2,
      countWord: "Dua",
      suara: "Jam analog memakai jarum, dan jam digital memakai angka. Pukul lima tepat ditulis nol lima titik nol nol.",
    },
    {
      judul: "Empat Bagian Hari",
      emoji: "🌅",
      countNum: 4,
      countWord: "Empat",
      suara: "Satu hari terdiri dari empat bagian: pagi, siang, sore, dan malam.",
    },
    {
      judul: "Kegiatan Tika",
      emoji: "📅",
      countNum: 5,
      countWord: "Lima",
      suara: "Tika sarapan pukul enam pagi, belajar pukul tujuh pagi, makan di kantin pukul dua belas siang, bermain pukul empat sore, dan tidur pukul sembilan malam.",
    },
    {
      judul: "Waktu dan Bagian Hari",
      emoji: "🌤️",
      countNum: 4,
      countWord: "Empat",
      suara: "Pada jam digital dua puluh empat jam, nol enam titik nol nol dan nol tujuh titik nol nol termasuk pagi. Dua belas titik nol nol termasuk siang. Enam belas titik nol nol, yaitu pukul empat sore, termasuk sore. Dua puluh satu titik nol nol, yaitu pukul sembilan malam, termasuk malam.",
    },
    {
      judul: "Lebih Lama, Lebih Sebentar",
      emoji: "⏳",
      countNum: 2,
      countWord: "Dua",
      suara: "Berolahraga lebih lama dari mandi. Mandi lebih sebentar dari berolahraga. Dua kata ini membandingkan lamanya kegiatan.",
    },
    {
      judul: "Lama Beberapa Kegiatan",
      emoji: "⌛",
      countNum: 3,
      countWord: "Tiga",
      suara: "Mencuci tangan hanya sekitar satu menit. Mandi sekitar lima belas menit. Berolahraga satu jam. Tidur malam sekitar delapan jam.",
    },
    {
      judul: "Jarum Bergerak Satu Jam",
      emoji: "🗓️",
      countNum: 2,
      countWord: "Dua",
      suara: "Dari pukul enam sampai pukul tujuh, jarum pendek bergerak satu jam. Kira berolahraga selama satu jam.",
    },
  ],
  games: [
    C("read-clock-concrete", "Pukul Berapa?", "hlm. 178 dan 183 (Halim bangun tidur; tulis waktu yang sesuai dengan kegiatan)", "Membaca pukul tepat pada model jam dinding.", "Empat ronde, tiap ronde tiga jam dinding berbeda, misalnya pukul enam, tujuh, dan dua belas. Siswa memilih pukul yang tepat dari tiga pilihan. Pilihan lain berupa jam sebelum dan sesudahnya, sehingga siswa harus melihat jarum pendek dengan teliti.", "Lihat jarum pendek, lalu pilih pukulnya.", "⏰", 12),
    C("set-clock-hands", "Putar Jarum Jam", "hlm. 181 dan 183 (gambarkan jarum jam yang sesuai dengan cerita)", "Mengarahkan jarum pendek jam dinding ke pukul yang diminta.", "Empat ronde, tiap ronde tiga tugas, misalnya Tika sarapan pukul enam pagi. Siswa mengetuk angka di muka jam atau menekan tombol jam, lalu menekan Periksa. Jarum panjang tetap di angka dua belas.", "Putar jarum pendek ke pukul yang diminta.", "🕕", 12),
    C("sort-activities-day-parts", "Pilah Kegiatan Menurut Bagian Hari", "hlm. 179–181 dan 184 (kegiatan pagi, siang, sore, malam)", "Memilah kegiatan sehari-hari ke pagi, siang, sore, dan malam.", "Tiga ronde, tiap ronde enam kartu kegiatan dengan waktunya, misalnya sarapan pukul enam. Siswa menyeret atau mengetuk kartu ke kotak Pagi, Siang, Sore, atau Malam. Kunci dihitung dari jam kegiatan.", "Pilah kegiatan ke bagian hari yang tepat.", "🌤️", 3),
    C("match-activity-clock", "Jodohkan Kegiatan dan Jam", "hlm. 183–184 (tulis waktu yang sesuai dengan kegiatan; tarik garis waktu kegiatan)", "Menjodohkan kegiatan dengan jam yang menunjukkan waktunya.", "Tiga ronde, tiap ronde empat kegiatan dan empat jam dinding. Siswa mengetuk kegiatan, lalu mengetuk jam yang cocok. Muka jam tiap ronde berbeda sehingga hanya satu pasangan yang cocok.", "Ketuk kegiatan, lalu ketuk jamnya.", "🔗", 12),
    C("which-takes-longer", "Mana Lebih Lama?", "hlm. 182 dan 185–186 (beri tanda centang pada kegiatan yang lebih lama)", "Menentukan kegiatan yang lebih lama atau lebih sebentar dari dua kegiatan.", "Empat ronde, tiap ronde dua pasang kegiatan, misalnya menyisir rambut dan mandi, tidur malam dan menyikat gigi. Siswa mengetuk kegiatan yang lebih lama atau yang lebih sebentar. Petunjuk salah memberi lama kegiatan secara singkat.", "Ketuk kegiatan yang lebih lama atau lebih sebentar.", "⏳", 8),
    C("order-my-day", "Urutkan Hariku", "hlm. 186 (urutkan gambar sesuai dengan waktu kegiatan)", "Mengurutkan kegiatan menurut waktunya, dari yang paling awal.", "Tiga ronde, tiap ronde empat kegiatan dari pagi sampai malam. Siswa mengetuk kegiatan satu per satu dari yang paling awal. Kegiatan yang salah memberi petunjuk jamnya.", "Ketuk kegiatan dari yang paling awal.", "📅", 3),
    C("day-timeline-place", "Garis Waktu Hariku", "hlm. 181 dan 189 (kegiatan pagi, siang, sore, dan malam; Ayo Berkarya)", "Menaruh satu kegiatan pada tiap bagian hari di garis waktu.", "Tiga ronde, tiap ronde empat kegiatan dan empat tempat: pagi, siang, sore, malam. Siswa mengetuk kegiatan lalu mengetuk tempatnya. Setiap tempat menerima satu kegiatan.", "Ketuk kegiatan, lalu ketuk bagian harinya.", "🗓️", 3),
    C("memory-activity-clock", "Memori Kegiatan dan Jam", "hlm. 179–181 (kegiatan Tika dan jamnya)", "Mencocokkan kartu kegiatan dengan kartu jam yang menunjukkan waktunya.", "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu. Pasangan yang cocok tetap terbuka, yang tidak cocok kembali tertutup. Pasangan berupa kegiatan dan jam dinding.", "Balik dua kartu, cari kegiatan dan jamnya.", "🃏", 12),
    C("clock-forward-hours", "Majukan Jam", "hlm. 182 (Kira berolahraga mulai pukul 6 sampai pukul 7)", "Memajukan jam satu jam setiap ketukan dan menghitung lamanya kegiatan.", "Tiga ronde, tiap ronde dua cerita, misalnya Kira berolahraga pukul enam sampai pukul tujuh. Siswa menekan Maju 1 jam sampai jam selesai, lalu memilih berapa jam yang sudah berlalu. Siswa boleh mengulang dari awal.", "Majukan jam, lalu hitung berapa jamnya.", "▶️", 6),
    C("find-clock-on-wall", "Temukan Jam di Dinding", "hlm. 178–181 (membaca pukul tepat pada beberapa jam)", "Menemukan jam yang menunjukkan pukul tertentu di antara empat jam.", "Tiga ronde, tiap ronde empat jam dinding dan dua pertanyaan, misalnya ketuk jam yang menunjukkan pukul enam. Siswa mengetuk jam yang tepat.", "Ketuk jam yang menunjukkan pukul yang diminta.", "🖼️", 6),
    P("read-digital-from-diagram", "Baca Jam Digital dari Gambar", "hlm. 178 (jam analog dan jam digital)", "Menuliskan pukul tepat pada diagram jam dalam bentuk jam digital.", "Tiga ronde, tiap ronde tiga diagram jam. Siswa memilih jam digital yang sama, misalnya nol enam titik nol nol. Dua pilihan lain berupa jam sebelum dan sesudahnya.", "Lihat jarum, lalu pilih jam digitalnya.", "clock-to-digital", 3, 3),
    P("draw-clock-hands-digital", "Gambar Jarum Jam", "hlm. 181 dan 183 (gambarkan jarum jam sesuai cerita)", "Mengarahkan jarum pendek diagram jam ke pukul yang ditulis sebagai jam digital.", "Tiga ronde, tiap ronde tiga jam digital, misalnya 09.00. Siswa mengetuk angka di muka jam atau memakai tombol jam, lalu menekan Periksa.", "Arahkan jarum pendek sesuai jam digitalnya.", "digital-to-clock", 3, 3),
    P("bar-model-duration", "Batang Lama Kegiatan", "hlm. 182 dan 185–186 (lebih lama dan lebih sebentar) dalam model batang", "Membaca batang lama kegiatan dan menemukan yang paling lama dan paling sebentar.", "Tiga ronde, tiap ronde tiga sampai empat batang berhuruf, satu kotak sama dengan satu jam. Siswa mengetuk batang yang paling lama dan batang yang paling sebentar.", "Ketuk batang yang paling panjang atau paling pendek.", "bar-duration", 3, 4),
    P("match-clock-digital", "Jodohkan Jam dan Angka Digital", "hlm. 178 (jam analog dan jam digital)", "Menjodohkan diagram jam dengan jam digitalnya.", "Tiga ronde, tiap ronde empat diagram jam dan empat jam digital. Siswa mengetuk diagram jam, lalu mengetuk jam digital yang cocok.", "Ketuk jam, lalu ketuk jam digitalnya.", "clock-digital-match", 3, 4),
    P("order-clock-diagrams", "Urutkan Gambar Jam", "hlm. 186 (urutkan gambar sesuai dengan waktu kegiatan)", "Mengurutkan diagram jam menurut waktunya dalam satu hari.", "Tiga ronde, tiap ronde empat diagram jam dengan keterangan pagi, siang, sore, atau malam. Siswa mengetuk diagram dari waktu yang paling awal dalam satu hari.", "Ketuk jam dari waktu yang paling awal.", "clock-order", 3, 4),
    P("sort-clock-day-parts", "Pilah Jam ke Bagian Hari", "hlm. 188–189 (kelompokkan waktu kegiatan: pagi, sore, malam)", "Memilah diagram jam menurut pagi, siang, sore, dan malam.", "Tiga ronde, tiap ronde enam diagram jam dengan jam digital 24 jam. Siswa menyeret atau mengetuk diagram ke kotak Pagi, Siang, Sore, atau Malam.", "Pilah jam ke bagian hari yang tepat.", "clock-sort", 3, 6),
    P("count-hour-blocks", "Hitung Kotak Jam", "hlm. 182 (mulai pukul 6 sampai pukul 7) pada jalur jam", "Menghitung banyak jam dari kotak pada jalur jam.", "Tiga ronde, tiap ronde dua jalur jam. Tiap kotak satu jam. Siswa menghitung kotak dari pukul mulai sampai pukul selesai, lalu memilih banyaknya jam.", "Hitung kotak jam dari mulai sampai selesai.", "hour-track", 3, 2),
    P("fill-clock-table", "Tabel Jam dan Bagian Hari", "hlm. 184 dan 188–189 (tarik garis waktu kegiatan; kelompokkan waktu)", "Mengisi tabel jam digital dan bagian harinya.", "Dua ronde dengan tabel berisi empat baris. Siswa mengetuk baris, lalu mengetuk kartu pagi, siang, sore, atau malam yang tepat.", "Isi tabel dengan kartu bagian hari.", "table-day-part", 2, 4),
    P("tally-hours", "Goresan Jam", "hlm. 182 (lama kegiatan dalam jam) dalam goresan tally", "Menuliskan lama kegiatan dalam jam sebagai goresan tally.", "Tiga ronde, tiap ronde dua soal, misalnya dari pukul 6 sampai pukul 9. Siswa menekan Goresan sebanyak jam yang berlalu, lalu menekan Periksa. Setiap lima goresan dikelompokkan.", "Tambah goresan sebanyak jamnya.", "tally-hours", 3, 2),
    P("number-line-hours", "Garis Angka Jam", "hlm. 178 (angka satu sampai dua belas pada jam)", "Menandai angka jam pada garis angka satu sampai dua belas.", "Tiga ronde, tiap ronde tiga soal, misalnya tandai angka yang ditunjuk jarum pendek pada pukul enam. Siswa mengetuk bulatan angka yang tepat.", "Ketuk angka jam pada garis.", "number-line-12", 3, 3),
    A("complete-time-sentences", "Lengkapi Kalimat Waktu", "hlm. 179–183 (kegiatan Tika; Olahraga Minggu)", "Melengkapi kalimat waktu dengan bagian hari atau kata lebih lama dan lebih sebentar.", "Dua ronde, tiap ronde tiga kalimat, misalnya Tika sarapan pukul 6 ... Siswa memilih satu dari tiga kata. Kalimat yang lengkap dibacakan Suara Guru.", "Pilih kata yang tepat untuk bagian kosong.", "06.00", "PAGI SIANG", "pagi • siang • sore • malam"),
    A("true-false-time", "Benar atau Salah: Waktu", "hlm. 178–186 (jam, bagian hari, lama kegiatan)", "Menilai pernyataan tentang jam, bagian hari, dan lama kegiatan.", "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan tentang lama dan bagian hari dihitung dari data kegiatan. Setiap jawaban diberi penjelasan singkat.", "Baca pernyataan, lalu pilih benar atau salah.", "✓ ✗", "BENAR SALAH", "periksa dengan alasan"),
    A("build-time-sentence", "Susun Kalimat Waktu", "hlm. 178–182 (kalimat tentang jam dan kegiatan)", "Menyusun kata menjadi kalimat tentang waktu.", "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan.", "Ketuk kata menjadi kalimat yang benar.", "Aa", "SUSUN KATA", "kata • kalimat • makna"),
    A("hours-between", "Hitung Berapa Jam", "hlm. 182 (mulai pukul 6 sampai pukul 7)", "Menghitung lama kegiatan dari pukul mulai sampai pukul selesai.", "Tiga ronde, tiap ronde dua soal cerita, misalnya Tika belajar mulai pukul 7 sampai pukul 12. Siswa memilih satu dari tiga angka. Kunci dihitung dari jam mulai dan jam selesai.", "Baca cerita, lalu pilih berapa jamnya.", "7 → 12", "BERAPA JAM", "selesai kurang mulai"),
    A("fill-activity-table", "Tabel Kegiatan dan Bagian Hari", "hlm. 179–181 dan 184 (kegiatan Tika dan bagian harinya)", "Mengisi tabel kegiatan dan bagian harinya.", "Dua ronde dengan tabel berisi empat baris, misalnya sarapan dengan pagi. Siswa mengetuk baris, lalu mengetuk kartu bagian hari. Kunci dihitung dari jam kegiatan.", "Isi tabel dengan kartu bagian hari.", "A → B", "TABEL", "kegiatan • waktu • bagian hari"),
    A("choose-day-part", "Pilih Bagian Hari", "hlm. 188–189 (kelompokkan waktu kegiatan)", "Menentukan bagian hari dari jam digital 24 jam.", "Tiga ronde, tiap ronde tiga soal, misalnya pukul 07.00 termasuk pagi. Siswa memilih satu dari tiga bagian hari. Kunci dihitung dari jam digital.", "Baca jam digitalnya, lalu pilih bagian harinya.", "07.00", "BAGIAN HARI", "pagi 04-10 • siang 11-14 • sore 15-17 • malam 18-03"),
    A("riddle-time-clues", "Detektif Waktu", "hlm. 179–183 (kegiatan dan waktunya)", "Menemukan kegiatan dari dua petunjuk waktu.", "Empat soal. Siswa membaca dua petunjuk, misalnya aku terjadi di pagi hari dan jarum pendek ada di angka enam, lalu memilih satu dari tiga kegiatan. Hanya satu yang cocok dengan kedua petunjuk.", "Baca semua petunjuk, lalu pilih kegiatannya.", "?", "DETEKTIF", "dua petunjuk, satu jawaban"),
    A("concept-map-fill", "Peta Konsep Waktu", "hlm. 156 (peta konsep pengukuran: waktu)", "Melengkapi peta konsep membaca jam dan waktu kegiatan.", "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala.", "Pilih kartu yang tepat untuk kotak yang menyala.", "⇄", "PETA KONSEP", "jam • bagian hari • lama"),
    A("order-digital-times", "Urutkan Jam Digital", "hlm. 186 (urutkan menurut waktu kegiatan)", "Mengurutkan jam digital 24 jam dari yang paling awal.", "Tiga ronde, tiap ronde empat jam digital. Siswa mengetuk jam dari yang paling awal sampai yang paling akhir dalam satu hari.", "Ketuk jam dari yang paling awal.", "05.00 → 21.00", "URUTKAN", "angka kecil lebih awal"),
    A("select-all-day-part", "Ketuk Semua Jam yang Cocok", "hlm. 188–189 (kelompokkan waktu: pagi, sore, malam)", "Memilih semua jam digital yang termasuk satu bagian hari.", "Tiga ronde, tiap ronde enam jam digital dan satu bagian hari (pagi, malam, lalu sore). Siswa mengetuk semua jam yang termasuk bagian hari itu, lalu menekan Periksa.", "Ketuk semua jam yang cocok, lalu periksa.", "✔✔", "SEMUA COCOK", "boleh lebih dari satu"),
  ],
  poin: [
    {
      ikon: "🕐",
      nama: "Dua jarum",
      isi: "pendek: jam, panjang: menit",
      suara: "Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit.",
    },
    {
      ikon: "🕔",
      nama: "Pukul tepat",
      isi: "panjang di angka 12",
      suara: "Pukul tepat artinya jarum panjang di angka dua belas, dan jarum pendek menunjukkan jamnya.",
    },
    {
      ikon: "🔢",
      nama: "Jam digital",
      isi: "05.00 = pukul 5 tepat",
      suara: "Jam digital menulis waktu dengan angka. Nol lima titik nol nol sama dengan pukul lima tepat.",
    },
    {
      ikon: "🌅",
      nama: "Empat bagian hari",
      isi: "pagi, siang, sore, malam",
      suara: "Satu hari dibagi menjadi pagi, siang, sore, dan malam. Setiap kegiatan punya bagian harinya.",
    },
    {
      ikon: "⏳",
      nama: "Lebih lama, lebih sebentar",
      isi: "bandingkan lama dua kegiatan",
      suara: "Kita membandingkan lama dua kegiatan dengan kata lebih lama dan lebih sebentar. Berolahraga lebih lama dari mandi.",
    },
  ],
  poinSuara:
    "Ingat selalu! Jarum pendek menunjukkan jam dan jarum panjang menunjukkan menit. Pukul tepat bila jarum panjang di angka dua belas. Jam digital menulis waktu dengan angka. Satu hari terdiri dari pagi, siang, sore, dan malam, dan kita membandingkan kegiatan dengan kata lebih lama dan lebih sebentar.",
  cara: {
    suara: "Cara menyebutkan. Tika sarapan pukul enam pagi. Sebut kegiatan, kata pukul, jam, lalu bagian harinya.",
    potongan: [
      { teks: "Kegiatan", warna: "#FFFFFF" },
      { teks: "pukul", warna: "#FFE566" },
      { teks: "jam", warna: "#FFFFFF" },
      { teks: "bagian hari", warna: "#7FCB96" },
    ],
  },
  rumah:
    "Ayo Mencoba di rumah: ceritakan empat kegiatanmu hari ini, satu untuk pagi, siang, sore, dan malam. Gambar jarum jam yang sesuai untuk tiap kegiatan, lalu tuliskan jam digitalnya. Ceritakan juga kegiatan yang lebih lama dan yang lebih sebentar.",
  refleksi: [
    "Aku dapat membaca jam tepat.",
    "Aku dapat menunjukkan kegiatan sesuai waktu.",
    "Aku dapat membandingkan lebih lama dan lebih sebentar pada kegiatan.",
    "Aku belajar dengan tertib.",
  ],
};

export const SUB_BAB_K2B6: SubBabNaskah[] = [SUB_A6, SUB_B6];

/** Semua adegan video (untuk uji panjang ketukan dan papan). */
export const semuaAdeganK2B6 = SUB_BAB_K2B6.flatMap((s) => s.videos.flatMap((v) => v.adegan));
