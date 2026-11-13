/**
 * Naskah Matematika Kelas 6 Bab 4 — Peluang (mendalam + metode luar).
 * Sumber: Buku Siswa Matematika Kelas VI Bab 4 hlm. 113–144.
 * Sub-Bab A Skala Peluang; Sub-Bab B Membandingkan Peluang Kejadian.
 * Satu sumber: buat-k6-bab4.mjs → kelas6-bab4.json. Tanpa React/jaringan di naskah.
 */
export type GameStage = "Concrete" | "Picture" | "Abstract";
export type GameDef = {
  stage: GameStage; gameType: string; title: string; bookReference: string; objective: string;
  mechanicDescription: string; voiceGuide: string; emoji?: string; targetCount?: number;
  diagramType?: string; numberA?: number; numberB?: number; symbolLarge?: string; wordLarge?: string; mathNotation?: string;
};
export type SubBabNaskah = {
  id: string; codeTitle: string; fullTitle: string; targetDescription: string;
  secondaryBg: string; secondaryBorder: string; secondaryText: string;
  silabus: { teksSuara: string; cp: string; referensi: string };
  videos: never[];
  mindMaps: { stepNumber: number; stepTitle: string; stepDesc: string; icon: string; flowFrom: string; flowTo: string }[];
  infografis: { judul: string; emoji: string; countNum: number; countWord: string; suara: string; teksVisual?: string }[];
  games: GameDef[];
  poin: { ikon: string; nama: string; isi: string; suara: string }[];
  poinSuara: string; cara: { suara: string; potongan: { teks: string; warna: string }[] };
  rumah: string; refleksi: string[];
};

export const K6B4_META = {
  "chapterId": "k6-mat-bab4",
  "phaseCode": "FASE_C",
  "grade": 6,
  "subjectLabel": "MATEMATIKA - KELAS 6 SD",
  "title": "BAB 4: PELUANG",
  "silabusElemen": "🌈 Fase C • Elemen Analisis Data dan Peluang: Skala Peluang & Membandingkan Peluang Kejadian (Kelas 6 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A64 = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Skala Peluang)",
  "fullTitle": "Sub-Bab A: Skala Peluang",
  "targetDescription": "Siswa mengenal peluang lewat skala kualitatif (tidak mungkin–pasti), memprediksi kejadian sehari-hari dan hasil percobaan koin/dadu/bola/roda putar sesuai Buku Siswa Kelas VI Bab 4 Sub-Bab A hlm. 119–128.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Dhien ragu ikut lomba menyanyi. Apakah peluangnya benar-benar nol? METODE LUAR Likelihood Spectrum Scale: lima tangga dari tidak mungkin sampai pasti. METODE LUAR Impossible-Certain Continuum: ujung kiri mustahil, ujung kanan pasti terjadi. METODE LUAR Qualitative Probability Language: kata kurang mungkin, mungkin, sangat mungkin dipakai untuk prediksi harian. METODE LUAR Experimental Relative Frequency: hasil roda putar dicatat lalu dibandingkan dengan prediksi skala. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengenal peluang dengan membuat skala peluang dan melakukan percobaan sederhana.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 4 Sub-Bab A hlm. 119–128; Likelihood Spectrum Scale; Impossible-Certain Continuum; Qualitative Probability Language; Experimental Relative Frequency."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Kejadian",
      "stepDesc": "Baca soal Skala Peluang dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Apa yang ditanya Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa mengenal peluang lewat skala kualitatif (tidak mungkin–pasti), memprediksi kejadian sehari-hari dan hasil percobaa….",
      "icon": "🎯",
      "flowFrom": "Kejadian",
      "flowTo": "Bukti"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Bukti",
      "stepDesc": "Jumlah / data. Pada Skala Peluang, langkah “Bukti” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📊",
      "flowFrom": "Bukti",
      "flowTo": "Skala"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Skala",
      "stepDesc": "5 tangga. Pada Skala Peluang, langkah “Skala” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📶",
      "flowFrom": "Skala",
      "flowTo": "Ujung"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Ujung",
      "stepDesc": "0 atau semua. Pada Skala Peluang, langkah “Ujung” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬅️➡️",
      "flowFrom": "Ujung",
      "flowTo": "Percobaan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Percobaan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Skala Peluang. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🔁",
      "flowFrom": "Percobaan",
      "flowTo": "Refleksi"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Refleksi",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Skala Peluang. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Refleksi",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Tidak mungkin",
      "emoji": "🚫",
      "countNum": 0,
      "countWord": "peluang 0",
      "suara": "Tidak mungkin (peluang 0). Tangga paling kiri. Kejadian sama sekali tidak terjadi — peluang nol. Contoh: dadu biasa menghasilkan angka tujuh. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "🚫 Tidak mungkin: peluang 0"
    },
    {
      "judul": "Kurang mungkin",
      "emoji": "📉",
      "countNum": 1,
      "countWord": "sedikit peluang",
      "suara": "Kurang mungkin (sedikit peluang). Dekat ujung kiri. Bisa terjadi, tapi jarang. Contoh: angka enam muncul sekali dari banyak lemparan dadu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "📉 Kurang mungkin: sedikit peluang"
    },
    {
      "judul": "Mungkin",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "bisa terjadi",
      "suara": "Mungkin (bisa terjadi). Di tengah spektrum. Kejadian bisa terjadi atau tidak. Contoh: hujan sore ini. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "⚖️ Mungkin: bisa terjadi"
    },
    {
      "judul": "Sangat mungkin",
      "emoji": "📈",
      "countNum": 1,
      "countWord": "sering",
      "suara": "Sangat mungkin (sering). Dekat ujung kanan. Sering terjadi, hampir rutin. Contoh: matahari terbit esok pagi. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "📈 Sangat mungkin: sering"
    },
    {
      "judul": "Pasti",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "selalu",
      "suara": "Pasti (selalu). Tangga paling kanan. Selalu terjadi, peluang penuh. Contoh: hari esok datang. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "✅ Pasti: selalu"
    },
    {
      "judul": "Spectrum",
      "emoji": "📶",
      "countNum": 5,
      "countWord": "lima tangga",
      "suara": "Spectrum (lima tangga). Lima tangga Likelihood Spectrum: tidak mungkin → kurang mungkin → mungkin → sangat mungkin → pasti. Urutkan prediksi sebelum menghitung angka.",
      "teksVisual": "📶 Lima tangga Likelihood Spectrum: tidak mungkin →…"
    },
    {
      "judul": "Koin",
      "emoji": "🪙",
      "countNum": 2,
      "countWord": "dua sisi",
      "suara": "Koin (dua sisi). Koin adil punya dua sisi. Gambar dan angka sama mungkin: masing-masing 1 dari 2. Cocokkan dengan tangga “mungkin”. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "🪙 Koin: dua sisi"
    },
    {
      "judul": "Dadu 6",
      "emoji": "🎲",
      "countNum": 6,
      "countWord": "enam sisi",
      "suara": "Dadu 6 (enam sisi). Dadu biasa punya enam sisi. Satu angka tertentu = 1 dari 6 — lebih jarang daripada koin. Bandingkan area peluangnya. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "🎲 Dadu 6: enam sisi"
    },
    {
      "judul": "Roda putar",
      "emoji": "🎡",
      "countNum": 1,
      "countWord": "area ≈ peluang",
      "suara": "Roda putar (area ≈ peluang). Area warna pada roda ≈ peluang. Sektor lebih lebar → lebih mungkin. Prediksi dulu, lalu catat hasil putaran. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Skala Peluang.",
      "teksVisual": "🎡 Roda putar: area ≈ peluang"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "bandingkan",
      "suara": "Siap B (bandingkan). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Skala kualitatif siap.",
      "teksVisual": "➡️ Siap B: bandingkan"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Letak di Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Tangga Peluang",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Kategori Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Mungkin/Tidak",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Kejadian-Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Tangga Benar",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Prediksi Dhien",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Dari Mustahil",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "emoji": "📶",
      "targetCount": 5
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Letak di Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Tangga Peluang",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Kategori Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Mungkin/Tidak",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Kejadian-Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Tangga Benar",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Prediksi Dhien",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Dari Mustahil",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Letak di Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "symbolLarge": "📶",
      "wordLarge": "SKALA",
      "mathNotation": "0→1 kualitatif"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Tangga Peluang",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "symbolLarge": "📶",
      "wordLarge": "SKALA",
      "mathNotation": "0→1 kualitatif"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Kategori Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "symbolLarge": "📶",
      "wordLarge": "SKALA",
      "mathNotation": "0→1 kualitatif"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Mungkin/Tidak",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "symbolLarge": "📶",
      "wordLarge": "SKALA",
      "mathNotation": "0→1 kualitatif"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Kejadian-Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "symbolLarge": "📶",
      "wordLarge": "SKALA",
      "mathNotation": "0→1 kualitatif"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Skala",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde: skala, contoh koin/dadu/bola, refleksi prediksi.",
      "voiceGuide": "Pilih tangga skala yang paling cocok.",
      "symbolLarge": "📶",
      "wordLarge": "SKALA",
      "mathNotation": "0→1 kualitatif"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Peluang",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-a",
      "title": "Peta Konsep",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-a",
      "title": "Cerita Peluang",
      "bookReference": "hlm. 119–128",
      "objective": "Menempatkan kejadian pada skala peluang kualitatif dan membandingkan prediksi dengan bukti/percobaan.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "📶",
      "nama": "Spektrum",
      "isi": "Peluang punya lima tangga kualitatif (Likelihood Spectrum Scale).",
      "suara": "Bukan hanya ya/tidak."
    },
    {
      "ikon": "🚫",
      "nama": "Tidak mungkin",
      "isi": "Tidak ada cara kejadian terjadi; sering karena jumlah nol.",
      "suara": "Ujung kiri."
    },
    {
      "ikon": "✅",
      "nama": "Pasti",
      "isi": "Semua hasil mengarah ke kejadian itu.",
      "suara": "Ujung kanan."
    },
    {
      "ikon": "🔁",
      "nama": "Percobaan",
      "isi": "Catat hasil lalu bandingkan dengan prediksi (Experimental Relative Frequency).",
      "suara": "Data vs dugaan."
    }
  ],
  "poinSuara": "Ingat lima tangga skala peluang dan bedakan prediksi dengan hasil percobaan.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tentukan kejadian.",
        "warna": "#FDE68A"
      },
      {
        "teks": "Lihat bukti atau jumlah.",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Pilih tangga skala.",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Bila perlu, uji dengan percobaan.",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Cari satu kejadian di rumah: letakkan di tangga skala dan jelaskan alasannya.",
  "refleksi": [
    "Apa bedanya tidak mungkin dan kurang mungkin?",
    "Mengapa prediksi perlu dibanding hasil percobaan?",
    "Sebutkan lima tangga Likelihood Spectrum Scale."
  ]
} as const satisfies SubBabNaskah;
export const SUB_B64 = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Membandingkan Peluang)",
  "fullTitle": "Sub-Bab B: Membandingkan Peluang Kejadian",
  "targetDescription": "Siswa membandingkan peluang dua kejadian (permainan dan sehari-hari), mengenali permainan adil/kurang adil, memakai rasio peluang menguntungkan terhadap total sesuai Buku Siswa Kelas VI Bab 4 Sub-Bab B hlm. 129–144.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Dhien ikut lomba: 12 peserta SD, 35 SMP, 27 SMA. METODE LUAR Comparative Probability Ratio: bandingkan a per total dengan b per total. METODE LUAR Fair Game Equal Chance Principle: adil bila peluang tiap pemain sama. METODE LUAR Favorable-to-Total Ratio: peluang = hasil menguntungkan dibagi semua hasil mungkin. METODE LUAR Relative Likelihood Decision: pilih opsi dengan peluang relatif lebih besar, meski belum pasti menang. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan peluang dua kejadian untuk membuat keputusan dan mengenali permainan adil.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 4 Sub-Bab B hlm. 129–144; Comparative Probability Ratio; Fair Game Equal Chance; Favorable-to-Total Ratio; Relative Likelihood Decision."
  },
  "videos": [],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Dua kejadian",
      "stepDesc": "Baca soal Membandingkan Peluang Kejadian dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. A vs B Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa membandingkan peluang dua kejadian (permainan dan sehari-hari), mengenali permainan adil/kurang adil, memakai rasi….",
      "icon": "⚔️",
      "flowFrom": "Dua kejadian",
      "flowTo": "Hitung"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Hitung",
      "stepDesc": "menguntungkan/total. Pada Membandingkan Peluang Kejadian, langkah “Hitung” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➗",
      "flowFrom": "Hitung",
      "flowTo": "Bandingkan"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Bandingkan",
      "stepDesc": "mana lebih besar. Pada Membandingkan Peluang Kejadian, langkah “Bandingkan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🔎",
      "flowFrom": "Bandingkan",
      "flowTo": "Adil?"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Adil?",
      "stepDesc": "peluang sama?. Pada Membandingkan Peluang Kejadian, langkah “Adil?” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⚖️",
      "flowFrom": "Adil?",
      "flowTo": "Keputusan"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Keputusan",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Membandingkan Peluang Kejadian. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🧭",
      "flowFrom": "Keputusan",
      "flowTo": "Ingat"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Ingat",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Membandingkan Peluang Kejadian. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Ingat",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Favorable",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "hasil untung",
      "suara": "Favorable (hasil untung). Favorable = hasil yang diinginkan (pembilang). Contoh: koin gambar = 1 hasil untung. Hitung dulu pembilang sebelum membagi. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita…",
      "teksVisual": "✅ Favorable = hasil yang diinginkan (pembilang)."
    },
    {
      "judul": "Total",
      "emoji": "📦",
      "countNum": 1,
      "countWord": "semua hasil",
      "suara": "Total (semua hasil). Total = semua hasil mungkin (penyebut). Koin: 2; dadu: 6. Tanpa total, rasio peluang tidak bisa dibandingkan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang Kejadian.",
      "teksVisual": "📦 Total: semua hasil"
    },
    {
      "judul": "Rasio",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "untung/total",
      "suara": "Rasio (untung/total). Rasio peluang = favorable ÷ total. Tulis pecahan dulu, baru bandingkan besarnya. Jangan hanya melihat pembilang. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang…",
      "teksVisual": "➗ Rasio: untung/total"
    },
    {
      "judul": "Bandingkan",
      "emoji": "🔎",
      "countNum": 2,
      "countWord": "A vs B",
      "suara": "Bandingkan (A vs B). Bandingkan dua pecahan peluang (Comparative Ratio). Samakan penyebut atau ubah ke desimal singkat, lalu lihat mana lebih besar. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan…",
      "teksVisual": "🔎 Bandingkan dua pecahan peluang (Comparative Ratio)."
    },
    {
      "judul": "Adil",
      "emoji": "⚖️",
      "countNum": 1,
      "countWord": "peluang sama",
      "suara": "Adil (peluang sama). Permainan adil bila peluang tiap pemain sama. Contoh: koin dua sisi. Jika peluang beda, permainan kurang adil. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang Kejadian.",
      "teksVisual": "⚖️ Permainan adil bila peluang tiap pemain sama."
    },
    {
      "judul": "Kurang adil",
      "emoji": "⚠️",
      "countNum": 1,
      "countWord": "peluang beda",
      "suara": "Kurang adil (peluang beda). Peluang tidak sama. Contoh: roda dengan sektor merah jauh lebih lebar. Putuskan dari rasio, bukan dari perasaan. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang…",
      "teksVisual": "⚠️ Kurang adil: peluang beda"
    },
    {
      "judul": "Koin",
      "emoji": "🪙",
      "countNum": 1,
      "countWord": "1 dari 2",
      "suara": "Koin (1 dari 2). Koin adil punya dua sisi. Gambar dan angka sama mungkin: masing-masing 1 dari 2. Cocokkan dengan tangga “mungkin”. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang Kejadian.",
      "teksVisual": "🪙 Koin: 1 dari 2"
    },
    {
      "judul": "Dadu 6",
      "emoji": "🎲",
      "countNum": 1,
      "countWord": "1 dari 6",
      "suara": "Dadu 6 (1 dari 6). Dadu biasa punya enam sisi. Satu angka tertentu = 1 dari 6 — lebih jarang daripada koin. Bandingkan area peluangnya. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang…",
      "teksVisual": "🎲 Dadu 6: 1 dari 6"
    },
    {
      "judul": "4/7 > 3/7",
      "emoji": "🎁",
      "countNum": 4,
      "countWord": "kotak Mantap",
      "suara": "4/7 > 3/7 — kotak Mantap. Pada Membandingkan Peluang Kejadian, cocokkan gambar “4/7 > 3/7” dengan artinya (kotak Mantap), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🎁 4/7 > 3/7: kotak Mantap"
    },
    {
      "judul": "Besar ≠ pasti",
      "emoji": "🧠",
      "countNum": 1,
      "countWord": "masih bisa kalah",
      "suara": "Besar ≠ pasti (masih bisa kalah). Tangga paling kanan. Selalu terjadi, peluang penuh. Contoh: hari esok datang. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Membandingkan Peluang Kejadian.",
      "teksVisual": "🧠 Besar ≠ pasti: masih bisa kalah"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Favorable/Total",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Arti Permainan Adil",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Pilih Peluang Lebih Besar",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Adil/Kurang Adil",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Rasio-Cerita",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Banding Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Rasio Unggul",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Kotak Hadiah",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "emoji": "⚖️",
      "targetCount": 5
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Favorable/Total",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "hitung",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Arti Permainan Adil",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "rumus",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Pilih Peluang Lebih Besar",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "arti",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Adil/Kurang Adil",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "sortir",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Rasio-Cerita",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "jodoh",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Banding Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "memori",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Rasio Unggul",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "ketuk",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "semua",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Kotak Hadiah",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "cerita",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "diagramType": "urut",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Favorable/Total",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "symbolLarge": "➗",
      "wordLarge": "BANDING",
      "mathNotation": "a/n vs b/n"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Arti Permainan Adil",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "symbolLarge": "➗",
      "wordLarge": "BANDING",
      "mathNotation": "a/n vs b/n"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Pilih Peluang Lebih Besar",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "symbolLarge": "➗",
      "wordLarge": "BANDING",
      "mathNotation": "a/n vs b/n"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Adil/Kurang Adil",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "symbolLarge": "➗",
      "wordLarge": "BANDING",
      "mathNotation": "a/n vs b/n"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Rasio-Cerita",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "symbolLarge": "➗",
      "wordLarge": "BANDING",
      "mathNotation": "a/n vs b/n"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Banding Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde: hitung rasio, adil/kurang adil, keputusan relatif.",
      "voiceGuide": "Bandingkan dua peluang lalu putuskan.",
      "symbolLarge": "➗",
      "wordLarge": "BANDING",
      "mathNotation": "a/n vs b/n"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-b",
      "title": "Peta Konsep",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-b",
      "title": "Cerita Peluang",
      "bookReference": "hlm. 129–144",
      "objective": "Membandingkan peluang dua kejadian dengan rasio menguntungkan/total dan menilai keadilan permainan.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➗",
      "nama": "Rasio",
      "isi": "Peluang ≈ hasil menguntungkan dibagi total kemungkinan (Favorable-to-Total).",
      "suara": "Hitung dulu."
    },
    {
      "ikon": "⚖️",
      "nama": "Adil",
      "isi": "Permainan adil bila peluang tiap pemain sama (Fair Game Equal Chance).",
      "suara": "Syarat seimbang."
    },
    {
      "ikon": "🔎",
      "nama": "Bandingkan",
      "isi": "Bandingkan dua rasio untuk tahu mana lebih mungkin (Comparative Probability Ratio).",
      "suara": "A vs B."
    },
    {
      "ikon": "🧭",
      "nama": "Keputusan",
      "isi": "Pilih yang relatif lebih besar, ingat belum pasti menang (Relative Likelihood Decision).",
      "suara": "Bijak."
    }
  ],
  "poinSuara": "Bandingkan peluang dengan rasio, kenali adil atau kurang adil, dan ingat peluang besar belum pasti.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Tulis hasil menguntungkan.",
        "warna": "#FDE68A"
      },
      {
        "teks": "Bagi dengan total.",
        "warna": "#BBF7D0"
      },
      {
        "teks": "Bandingkan dua rasio.",
        "warna": "#BFDBFE"
      },
      {
        "teks": "Putuskan adil atau pilih opsi unggul.",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Buat dua aturan main singkat di rumah: mana yang adil? Mana peluangnya lebih besar?",
  "refleksi": [
    "Kapan permainan disebut adil?",
    "Mengapa 4/7 lebih besar dari 3/7 belum menjamin menang?",
    "Bagaimana Favorable-to-Total membantu keputusan?"
  ]
} as const satisfies SubBabNaskah;
export const SUB_BAB_K6B4 = [SUB_A64, SUB_B64] as const;
