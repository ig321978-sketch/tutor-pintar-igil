/**
 * Naskah Matematika Kelas 6 Bab 3 — Kubus dan Balok (mendalam + metode luar + kubus 3D).
 * Sumber buku: Kemendikbudristek Bab 3 hlm. 89–112. Sub-Bab A–C (Materi).
 * Visual 3D diadopsi dari naskah lama Bab3KubusBalokModule (CSS preserve-3d).
 * Satu sumber: buat-k6-bab3.mjs → kelas6-bab3.json. Tanpa React/jaringan di naskah.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K6B3_META = {
  "chapterId": "k6-mat-bab3",
  "phaseCode": "FASE_C",
  "grade": 6,
  "subjectLabel": "MATEMATIKA - KELAS 6 SD",
  "title": "BAB 3: KUBUS DAN BALOK",
  "silabusElemen": "🌈 Fase C • Elemen Geometri: Mengonstruksi & Mengurai, Visualisasi Spasial, dan Lokasi (Kelas 6 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A63: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Mengonstruksi & Mengurai)",
  "fullTitle": "Sub-Bab A: Mengonstruksi dan Mengurai",
  "targetDescription": "Siswa menyusun dan mengurai kubus/balok, menghitung kubus satuan termasuk yang tersembunyi, memakai model 3D sesuai Buku Siswa Kelas VI Bab 3 Sub-Bab A hlm. 94–98.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Tigor dan Tenri menyusun kubus menjadi rumah kecil. METODE LUAR Construct-Decompose Protocol: susun berdampingan atau bertingkat, lalu urai kembali. METODE LUAR Layer Counting Method: hitung lantai dasar dulu, lalu lantai atas. METODE LUAR Hidden Support Rule: kubus atas tidak boleh melayang; selalu ada penyangga di bawahnya. Bentuk L dari tiga kubus bisa dipandang dari arah berbeda tetap sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa mengonstruksi dan mengurai kubus, balok, serta gabungannya.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 3 Sub-Bab A hlm. 94–98; Naskah IGIL lama · Kubus 3D CSS; Construct-Decompose; Layer Counting; Hidden Support Rule."
  },
  "videos": [
    {
      "id": "K6B3A-V1",
      "judul": "Susun Kubus Jadi Rumah",
      "subjudul": "Konstruksi",
      "adegan": [
        {
          "id": "K6B3A-V1-1",
          "judul": "Dua kubus",
          "ketukan": [
            "Dua kubus bisa berdampingan atau ditumpuk.",
            "Gambar berbeda bisa susunan yang sama dari arah lain.",
            "METODE LUAR · Construct-Decompose Protocol.",
            "Arsitek merancang dari unit kontainer."
          ],
          "papan": [
            "2 kubus",
            "samping/tumpuk",
            "Construct",
            "arah beda"
          ]
        },
        {
          "id": "K6B3A-V1-2",
          "judul": "Tiga kubus & bentuk L",
          "ketukan": [
            "Tiga kubus: satu lantai atau bertingkat.",
            "Bentuk L: dua mendatar plus satu naik.",
            "Naskah lama: panggung kubus 3D bisa diputar.",
            "Hitung: selalu 3 kubus satuan."
          ],
          "papan": [
            "3 kubus",
            "bentuk L",
            "putar 3D",
            "total 3"
          ]
        },
        {
          "id": "K6B3A-V1-3",
          "judul": "Balok & gabungan",
          "ketukan": [
            "Dua balok disusun seperti dinding.",
            "Bangun ruang bisa digabung dan diurai.",
            "Seperti tembok dari batu bata.",
            "Siap hitung lapisan."
          ],
          "papan": [
            "balok",
            "gabung/urai",
            "bata",
            "lapisan"
          ]
        }
      ]
    },
    {
      "id": "K6B3A-V2",
      "judul": "Hitung Kubus Tersembunyi",
      "subjudul": "Layer",
      "adegan": [
        {
          "id": "K6B3A-V2-1",
          "judul": "Lapisan dasar",
          "ketukan": [
            "METODE LUAR · Layer Counting Method.",
            "Lantai 1 = panjang × lebar petak.",
            "Itulah semua penyangga, termasuk tertutup.",
            "Jangan hanya hitung yang kelihatan."
          ],
          "papan": [
            "lapisan 1",
            "P×L",
            "penyangga",
            "jangan kelihatan saja"
          ]
        },
        {
          "id": "K6B3A-V2-2",
          "judul": "Hidden Support",
          "ketukan": [
            "METODE LUAR · Hidden Support Rule.",
            "Kubus lantai atas tidak boleh melayang.",
            "Di bawahnya pasti ada kubus penopang.",
            "Total = semua lantai."
          ],
          "papan": [
            "tidak melayang",
            "ada penopang",
            "total semua",
            "Hidden Support"
          ]
        },
        {
          "id": "K6B3A-V2-3",
          "judul": "Contoh 2×2×2",
          "ketukan": [
            "Kubus besar 2×2×2 = 8 satuan.",
            "3×3×3 = 27 satuan.",
            "Balok 5×3×2 = 30 satuan.",
            "Rumus P × L × T bila penuh rapat."
          ],
          "papan": [
            "8",
            "27",
            "30",
            "P×L×T"
          ]
        }
      ]
    },
    {
      "id": "K6B3A-V3",
      "judul": "Latihan & Siap B",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K6B3A-V3-1",
          "judul": "Putar model 3D",
          "ketukan": [
            "Di permainan, geser untuk memutar kubus.",
            "Tombol Depan, Samping, Atas membantu.",
            "Hitung nomor di setiap muka bila perlu.",
            "Adopsi visual naskah lama IGIL."
          ],
          "papan": [
            "geser putar",
            "3 tombol",
            "nomor muka",
            "naskah lama"
          ]
        },
        {
          "id": "K6B3A-V3-2",
          "judul": "Kesalahan umum",
          "ketukan": [
            "Salah: hanya hitung muka depan.",
            "Salah: lupa kubus tersembunyi.",
            "Salah: mengira kubus atas melayang OK.",
            "Cek Layer Counting."
          ],
          "papan": [
            "bukan hanya depan",
            "hitung tersembunyi",
            "tidak melayang",
            "cek lapisan"
          ]
        },
        {
          "id": "K6B3A-V3-3",
          "judul": "Siap B",
          "ketukan": [
            "Konstruksi siap.",
            "Berikutnya: tampak depan, samping, atas.",
            "Gambar 2D dari model 3D.",
            "Ayo Sub-Bab B!"
          ],
          "papan": [
            "A siap",
            "proyeksi",
            "2D dari 3D",
            "ke B"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Ambil unit",
      "stepDesc": "Baca soal Mengonstruksi dan Mengurai dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Kubus/balok Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyusun dan mengurai kubus/balok, menghitung kubus satuan termasuk yang tersembunyi, memakai model 3D sesuai Buku….",
      "icon": "🧊",
      "flowFrom": "Ambil unit",
      "flowTo": "Susun"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Susun",
      "stepDesc": "Samping/tumpuk. Pada Mengonstruksi dan Mengurai, langkah “Susun” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "🧱",
      "flowFrom": "Susun",
      "flowTo": "Lapisan"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Lapisan",
      "stepDesc": "Layer Counting. Pada Mengonstruksi dan Mengurai, langkah “Lapisan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📚",
      "flowFrom": "Lapisan",
      "flowTo": "Penyangga"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Penyangga",
      "stepDesc": "Hidden Support. Pada Mengonstruksi dan Mengurai, langkah “Penyangga” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "⬇️",
      "flowFrom": "Penyangga",
      "flowTo": "Hitung total"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Hitung total",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Mengonstruksi dan Mengurai. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🔢",
      "flowFrom": "Hitung total",
      "flowTo": "Urai"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Urai",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Mengonstruksi dan Mengurai. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Urai",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Construct",
      "emoji": "🧱",
      "countNum": 1,
      "countWord": "susun unit",
      "suara": "Construct — susun unit. Pada Mengonstruksi dan Mengurai, cocokkan gambar “Construct” dengan artinya (susun unit), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧱 Construct: susun unit"
    },
    {
      "judul": "Decompose",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "urai unit",
      "suara": "Decompose — urai unit. Pada Mengonstruksi dan Mengurai, cocokkan gambar “Decompose” dengan artinya (urai unit), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita…",
      "teksVisual": "🧩 Decompose: urai unit"
    },
    {
      "judul": "Bentuk L",
      "emoji": "ʟ",
      "countNum": 3,
      "countWord": "3 kubus",
      "suara": "Bentuk L — 3 kubus. Tiga kubus: satu lantai atau bertingkat. Bentuk L: dua mendatar plus satu naik. Ingat: 3 kubus; bentuk L; putar 3D. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Mengonstruksi dan Mengurai.",
      "teksVisual": "ʟ Bentuk L: 3 kubus"
    },
    {
      "judul": "Layer Count",
      "emoji": "📚",
      "countNum": 1,
      "countWord": "lantai demi lantai",
      "suara": "Layer Count — lantai demi lantai. Pada Mengonstruksi dan Mengurai, cocokkan gambar “Layer Count” dengan artinya (lantai demi lantai), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📚 Layer Count: lantai demi lantai"
    },
    {
      "judul": "Hidden Support",
      "emoji": "⬇️",
      "countNum": 1,
      "countWord": "tidak melayang",
      "suara": "Hidden Support — tidak melayang. Kubus lantai atas tidak boleh melayang. Di bawahnya pasti ada kubus penopang. Ingat: tidak melayang; ada penopang; total semua.",
      "teksVisual": "⬇️ Hidden Support: tidak melayang"
    },
    {
      "judul": "2×2×2",
      "emoji": "🧊",
      "countNum": 8,
      "countWord": "8 satuan",
      "suara": "2×2×2 — 8 satuan. Kubus besar 2×2×2 = 8 satuan. 3×3×3 = 27 satuan. Ingat: 8; 27; 30. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Mengonstruksi dan Mengurai.",
      "teksVisual": "🧊 2×2×2: 8 satuan"
    },
    {
      "judul": "3×3×3",
      "emoji": "🧊",
      "countNum": 27,
      "countWord": "27 satuan",
      "suara": "3×3×3 — 27 satuan. Pada Mengonstruksi dan Mengurai, cocokkan gambar “3×3×3” dengan artinya (27 satuan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Mengonstruksi dan…",
      "teksVisual": "🧊 3×3×3: 27 satuan"
    },
    {
      "judul": "5×3×2",
      "emoji": "📦",
      "countNum": 30,
      "countWord": "30 satuan",
      "suara": "5×3×2 — 30 satuan. Pada Mengonstruksi dan Mengurai, cocokkan gambar “5×3×2” dengan artinya (30 satuan), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Mengonstruksi dan…",
      "teksVisual": "📦 5×3×2: 30 satuan"
    },
    {
      "judul": "Putar 3D",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "geser panggung",
      "suara": "Putar 3D — geser panggung. Pada Mengonstruksi dan Mengurai, cocokkan gambar “Putar 3D” dengan artinya (geser panggung), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🔄 Putar 3D: geser panggung"
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "tampak 3 arah",
      "suara": "Siap B (tampak 3 arah). Skala kualitatif sudah siap. Berikutnya bandingkan dua peluang dengan rasio untung/total, lalu putuskan adil atau kurang adil. Konstruksi siap.",
      "teksVisual": "➡️ Siap B: tampak 3 arah"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-a-c",
      "title": "Hitung Kubus 3D",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-a-c",
      "title": "Arti Layer Counting",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-a-c",
      "title": "Pilih Total Satuan",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-a-c",
      "title": "Pilah Melayang/Tidak",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-a-c",
      "title": "Jodohkan Bentuk-Jumlah",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-a-c",
      "title": "Memori Susunan",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-a-c",
      "title": "Ketuk Total Kubus",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-a-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-a-c",
      "title": "Cerita Rumah Kubus",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-a-c",
      "title": "Urutkan Volume",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "emoji": "🧊",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-a-p",
      "title": "Diagram Hitung Kubus 3D",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "hitung",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "rumus-a-p",
      "title": "Diagram Arti Layer Counting",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "rumus",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "arti-a-p",
      "title": "Diagram Pilih Total Satuan",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "arti",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sortir-a-p",
      "title": "Diagram Pilah Melayang/Tidak",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "sortir",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-a-p",
      "title": "Diagram Jodohkan Bentuk-Jumlah",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "jodoh",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memori-a-p",
      "title": "Diagram Memori Susunan",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "memori",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-a-p",
      "title": "Diagram Ketuk Total Kubus",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "ketuk",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "semua-a-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "semua",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "cerita-a-p",
      "title": "Diagram Cerita Rumah Kubus",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "cerita",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "urut-a-p",
      "title": "Diagram Urutkan Volume",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "diagramType": "urut",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-a-a",
      "title": "Tulis Hitung Kubus 3D",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "symbolLarge": "🧊",
      "wordLarge": "KONSTRUKSI",
      "mathNotation": "P×L×T"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-a-a",
      "title": "Tulis Arti Layer Counting",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "symbolLarge": "🧊",
      "wordLarge": "KONSTRUKSI",
      "mathNotation": "P×L×T"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-a-a",
      "title": "Tulis Pilih Total Satuan",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "symbolLarge": "🧊",
      "wordLarge": "KONSTRUKSI",
      "mathNotation": "P×L×T"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-a-a",
      "title": "Tulis Pilah Melayang/Tidak",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "symbolLarge": "🧊",
      "wordLarge": "KONSTRUKSI",
      "mathNotation": "P×L×T"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-a-a",
      "title": "Tulis Jodohkan Bentuk-Jumlah",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "symbolLarge": "🧊",
      "wordLarge": "KONSTRUKSI",
      "mathNotation": "P×L×T"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-a-a",
      "title": "Tulis Memori Susunan",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde: hitung 3D, lapisan, total P×L×T.",
      "voiceGuide": "Putar model lalu hitung kubus satuan.",
      "symbolLarge": "🧊",
      "wordLarge": "KONSTRUKSI",
      "mathNotation": "P×L×T"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-a",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-a",
      "title": "Detektif Kubus",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
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
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-a",
      "title": "Cerita Bangun",
      "bookReference": "hlm. 94–98",
      "objective": "Susun/urai kubus dengan Construct-Decompose, Layer Counting, dan Hidden Support; pakai model 3D.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🧱",
      "nama": "Susun",
      "isi": "Gabungkan kubus/balok berdampingan atau bertingkat (Construct-Decompose).",
      "suara": "Unit bangunan."
    },
    {
      "ikon": "📚",
      "nama": "Lapisan",
      "isi": "Hitung lantai dasar dulu, lalu tingkat (Layer Counting Method).",
      "suara": "Jangan hanya muka."
    },
    {
      "ikon": "⬇️",
      "nama": "Penyangga",
      "isi": "Kubus atas selalu bertumpu (Hidden Support Rule).",
      "suara": "Tidak melayang."
    },
    {
      "ikon": "🔄",
      "nama": "3D",
      "isi": "Putar model seperti naskah lama untuk melihat semua sisi.",
      "suara": "Geser panggung."
    }
  ],
  "poinSuara": "Ingat: susun atau urai unit, hitung per lapisan termasuk yang tersembunyi, dan kubus atas selalu punya penyangga.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Ambil unit",
        "warna": "#FDE68A"
      },
      {
        "teks": "susun/tumpuk",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung lapisan",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cek penyangga",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: susun 8 kubus gula atau dadu menjadi kubus 2×2×2, lalu urai kembali sambil menghitung.",
  "refleksi": [
    "Mengapa kubus di belakang/bawah sering terlewat saat menghitung?",
    "Apa arti Hidden Support Rule?",
    "Berapa kubus pada bentuk L?"
  ]
};
export const SUB_B63: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Visualisasi Spasial)",
  "fullTitle": "Sub-Bab B: Visualisasi Spasial",
  "targetDescription": "Siswa menggambar dan membaca tampak depan, samping, dan atas dari susunan kubus memakai matriks tinggi sesuai Buku Siswa Kelas VI Bab 3 Sub-Bab B hlm. 99–104.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Anike menggambar susunan kubus dari tiga arah. METODE LUAR Orthographic Projection Protocol: tampak depan, samping, atas tanpa perspektif. METODE LUAR Height-Matrix Silhouette: catat tinggi tiap petak alas. METODE LUAR Occlusion Max Rule: dari depan, tiap kolom menampilkan tinggi maksimum. Dari atas hanya tahu petak terisi, bukan tingginya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyusun bangun ruang dari model 2D dan sebaliknya, serta membaca tampak tiga arah.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 3 Sub-Bab B hlm. 99–104; Orthographic Projection; Height-Matrix Silhouette; Occlusion Max Rule; naskah lama proyeksi 3 arah."
  },
  "videos": [
    {
      "id": "K6B3B-V1",
      "judul": "Tiga Arah Pandang",
      "subjudul": "Proyeksi",
      "adegan": [
        {
          "id": "K6B3B-V1-1",
          "judul": "Depan-samping-atas",
          "ketukan": [
            "Arsitek butuh gambar 2D pasti.",
            "METODE LUAR · Orthographic Projection Protocol.",
            "Tampak depan, samping, atas.",
            "Efek kedalaman hilang: jadi petak datar."
          ],
          "papan": [
            "3 arah",
            "Orthographic",
            "2D datar",
            "denah"
          ]
        },
        {
          "id": "K6B3B-V1-2",
          "judul": "Tampak atas",
          "ketukan": [
            "Dari atas: petak mana yang terisi.",
            "TIDAK terlihat berapa tinggi menara.",
            "Empat kubus ditumpuk lurus → dari atas 1 petak.",
            "Jebakan umum anak SD."
          ],
          "papan": [
            "petak terisi",
            "bukan tinggi",
            "tumpuk → 1",
            "jebakan"
          ]
        },
        {
          "id": "K6B3B-V1-3",
          "judul": "Matriks tinggi",
          "ketukan": [
            "METODE LUAR · Height-Matrix Silhouette.",
            "Contoh 2×2: depan [2,1], belakang [3,4].",
            "Catat angka tinggi tiap petak.",
            "Siap hitung siluet."
          ],
          "papan": [
            "matriks",
            "tinggi petak",
            "contoh 2×2",
            "siluet"
          ]
        }
      ]
    },
    {
      "id": "K6B3B-V2",
      "judul": "Occlusion Max",
      "subjudul": "Siluet",
      "adegan": [
        {
          "id": "K6B3B-V2-1",
          "judul": "Dari depan",
          "ketukan": [
            "METODE LUAR · Occlusion Max Rule.",
            "Tiap kolom: ambil tinggi maksimum.",
            "Depan 1 dan belakang 3 → tampak 3.",
            "Jumlahkan maksimum tiap kolom."
          ],
          "papan": [
            "max per kolom",
            "1&3 → 3",
            "Occlusion",
            "jumlah max"
          ]
        },
        {
          "id": "K6B3B-V2-2",
          "judul": "Dari samping",
          "ketukan": [
            "Tiap baris kedalaman: ambil max tinggi.",
            "Pandangan menyamping merangkum baris.",
            "Rekonstruksi: cocokkan tiga tampak.",
            "Bisa lebih dari satu susunan cocok."
          ],
          "papan": [
            "max per baris",
            "samping",
            "rekonstruksi",
            "bisa jamak"
          ]
        },
        {
          "id": "K6B3B-V2-3",
          "judul": "Putar & cocokkan",
          "ketukan": [
            "Putar model 3D, lalu tekan Atas/Depan/Samping.",
            "Bandingkan dengan gambar Anike.",
            "Warnai petak sesuai tinggi.",
            "Latihan mata arsitek."
          ],
          "papan": [
            "putar 3D",
            "tombol arah",
            "warnai",
            "latihan"
          ]
        }
      ]
    },
    {
      "id": "K6B3B-V3",
      "judul": "Latihan & Siap C",
      "subjudul": "Ayo",
      "adegan": [
        {
          "id": "K6B3B-V3-1",
          "judul": "Dadu berwarna",
          "ketukan": [
            "Kubus sisi warna berbeda dari 3 arah.",
            "Catat warna muka yang terlihat.",
            "Proyeksi membantu komunikasi bangunan.",
            "Fort Rotterdam: arah pandang mengubah gambar."
          ],
          "papan": [
            "warna muka",
            "3 arah",
            "komunikasi",
            "Fort"
          ]
        },
        {
          "id": "K6B3B-V3-2",
          "judul": "Kesalahan",
          "ketukan": [
            "Salah: dari atas mengira tahu tinggi.",
            "Salah: menambah semua tinggi tanpa max.",
            "Salah: lupa kubus terhalang di depan.",
            "Pakai Occlusion Max."
          ],
          "papan": [
            "atas ≠ tinggi",
            "bukan jumlah mentah",
            "terhalang",
            "pakai max"
          ]
        },
        {
          "id": "K6B3B-V3-3",
          "judul": "Siap C",
          "ketukan": [
            "Proyeksi siap.",
            "Berikutnya: lokasi di petak dan jarak jalur.",
            "Huruf × angka seperti peta Makassar.",
            "Ayo Sub-Bab C!"
          ],
          "papan": [
            "B siap",
            "petak",
            "koordinat",
            "ke C"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Model 3D",
      "stepDesc": "Baca soal Visualisasi Spasial dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Susunan kubus Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menggambar dan membaca tampak depan, samping, dan atas dari susunan kubus memakai matriks tinggi sesuai Buku Siswa….",
      "icon": "🧊",
      "flowFrom": "Model 3D",
      "flowTo": "Matriks tinggi"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Matriks tinggi",
      "stepDesc": "Height-Matrix. Pada Visualisasi Spasial, langkah “Matriks tinggi” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "▦",
      "flowFrom": "Matriks tinggi",
      "flowTo": "Tampak depan"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Tampak depan",
      "stepDesc": "max per kolom. Pada Visualisasi Spasial, langkah “Tampak depan” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "👀",
      "flowFrom": "Tampak depan",
      "flowTo": "Tampak samping"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Tampak samping",
      "stepDesc": "max per baris. Pada Visualisasi Spasial, langkah “Tampak samping” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➡️",
      "flowFrom": "Tampak samping",
      "flowTo": "Tampak atas"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Tampak atas",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Visualisasi Spasial. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "⬇️",
      "flowFrom": "Tampak atas",
      "flowTo": "Cocokkan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cocokkan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Visualisasi Spasial. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Cocokkan",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Orthographic",
      "emoji": "📐",
      "countNum": 1,
      "countWord": "3 tampak datar",
      "suara": "Orthographic — 3 tampak datar. Pada Visualisasi Spasial, cocokkan gambar “Orthographic” dengan artinya (3 tampak datar), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "📐 Orthographic: 3 tampak datar"
    },
    {
      "judul": "Height-Matrix",
      "emoji": "▦",
      "countNum": 1,
      "countWord": "tinggi per petak",
      "suara": "Height-Matrix — tinggi per petak. Pada Visualisasi Spasial, cocokkan gambar “Height-Matrix” dengan artinya (tinggi per petak), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "▦ Height-Matrix: tinggi per petak"
    },
    {
      "judul": "Occlusion Max",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "ambil maksimum",
      "suara": "Occlusion Max — ambil maksimum. Pada Visualisasi Spasial, cocokkan gambar “Occlusion Max” dengan artinya (ambil maksimum), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "👀 Occlusion Max: ambil maksimum"
    },
    {
      "judul": "Tampak atas",
      "emoji": "⬇️",
      "countNum": 1,
      "countWord": "bukan tinggi",
      "suara": "Tampak atas — bukan tinggi. Dari atas: petak mana yang terisi. TIDAK terlihat berapa tinggi menara. Ingat: petak terisi; bukan tinggi; tumpuk → 1. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Visualisasi…",
      "teksVisual": "⬇️ Tampak atas: bukan tinggi"
    },
    {
      "judul": "Tumpuk 4",
      "emoji": "🗼",
      "countNum": 1,
      "countWord": "atas = 1 petak",
      "suara": "Tumpuk 4 — atas = 1 petak. Pada Visualisasi Spasial, cocokkan gambar “Tumpuk 4” dengan artinya (atas = 1 petak), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🗼 Tumpuk 4: atas = 1 petak"
    },
    {
      "judul": "Depan [2,1]",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "siluet kolom",
      "suara": "Depan [2,1] — siluet kolom. Pada Visualisasi Spasial, cocokkan gambar “Depan [2,1]” dengan artinya (siluet kolom), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "👀 Depan [2,1]: siluet kolom"
    },
    {
      "judul": "Belakang [3,4]",
      "emoji": "👀",
      "countNum": 1,
      "countWord": "max kolom",
      "suara": "Belakang [3,4] — max kolom. Pada Visualisasi Spasial, cocokkan gambar “Belakang [3,4]” dengan artinya (max kolom), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "👀 Belakang [3,4]: max kolom"
    },
    {
      "judul": "Putar 3D",
      "emoji": "🔄",
      "countNum": 1,
      "countWord": "cek arah",
      "suara": "Putar 3D — cek arah. Pada Visualisasi Spasial, cocokkan gambar “Putar 3D” dengan artinya (cek arah), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Visualisasi Spasial.",
      "teksVisual": "🔄 Putar 3D: cek arah"
    },
    {
      "judul": "Rekonstruksi",
      "emoji": "🧩",
      "countNum": 1,
      "countWord": "dari 3 gambar",
      "suara": "Rekonstruksi — dari 3 gambar. Pada Visualisasi Spasial, cocokkan gambar “Rekonstruksi” dengan artinya (dari 3 gambar), lalu sebut satu contoh dari ceritamu.",
      "teksVisual": "🧩 Rekonstruksi: dari 3 gambar"
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "lokasi petak",
      "suara": "Siap C — lokasi petak. Proyeksi siap. Berikutnya: lokasi di petak dan jarak jalur. Ingat: B siap; petak; koordinat. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Visualisasi Spasial.",
      "teksVisual": "➡️ Siap C: lokasi petak"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-b-c",
      "title": "Hitung Tampak Depan 3D",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-b-c",
      "title": "Arti Occlusion Max",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-b-c",
      "title": "Pilih Tampak Atas",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-b-c",
      "title": "Pilah Arah Benar/Salah",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-b-c",
      "title": "Jodohkan Matriks-Tampak",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-b-c",
      "title": "Memori Proyeksi",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-b-c",
      "title": "Ketuk Jumlah Petak",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-b-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-b-c",
      "title": "Cerita Anike Gambar",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-b-c",
      "title": "Urutkan Siluet",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "emoji": "👀",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-b-p",
      "title": "Diagram Hitung Tampak Depan 3D",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "hitung",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "rumus-b-p",
      "title": "Diagram Arti Occlusion Max",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "rumus",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "arti-b-p",
      "title": "Diagram Pilih Tampak Atas",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "arti",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sortir-b-p",
      "title": "Diagram Pilah Arah Benar/Salah",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "sortir",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-b-p",
      "title": "Diagram Jodohkan Matriks-Tampak",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "jodoh",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memori-b-p",
      "title": "Diagram Memori Proyeksi",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "memori",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-b-p",
      "title": "Diagram Ketuk Jumlah Petak",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "ketuk",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "semua-b-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "semua",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "cerita-b-p",
      "title": "Diagram Cerita Anike Gambar",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "cerita",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "urut-b-p",
      "title": "Diagram Urutkan Siluet",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "diagramType": "urut",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-b-a",
      "title": "Tulis Hitung Tampak Depan 3D",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "symbolLarge": "👀",
      "wordLarge": "PROYEKSI",
      "mathNotation": "max kolom"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-b-a",
      "title": "Tulis Arti Occlusion Max",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "symbolLarge": "👀",
      "wordLarge": "PROYEKSI",
      "mathNotation": "max kolom"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-b-a",
      "title": "Tulis Pilih Tampak Atas",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "symbolLarge": "👀",
      "wordLarge": "PROYEKSI",
      "mathNotation": "max kolom"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-b-a",
      "title": "Tulis Pilah Arah Benar/Salah",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "symbolLarge": "👀",
      "wordLarge": "PROYEKSI",
      "mathNotation": "max kolom"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-b-a",
      "title": "Tulis Jodohkan Matriks-Tampak",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "symbolLarge": "👀",
      "wordLarge": "PROYEKSI",
      "mathNotation": "max kolom"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-b-a",
      "title": "Tulis Memori Proyeksi",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde: depan, samping, atas dari matriks tinggi.",
      "voiceGuide": "Putar kubus lalu hitung petak tampak.",
      "symbolLarge": "👀",
      "wordLarge": "PROYEKSI",
      "mathNotation": "max kolom"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-b",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-b",
      "title": "Detektif Kubus",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
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
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-b",
      "title": "Cerita Bangun",
      "bookReference": "hlm. 99–104",
      "objective": "Baca tampak 3 arah dengan Orthographic, Height-Matrix, dan Occlusion Max pada model 3D.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "📐",
      "nama": "Orthographic",
      "isi": "Gambar tampak tanpa perspektif (Orthographic Projection).",
      "suara": "Depan/samping/atas."
    },
    {
      "ikon": "▦",
      "nama": "Matriks",
      "isi": "Catat tinggi tiap petak alas (Height-Matrix Silhouette).",
      "suara": "Angka = menara."
    },
    {
      "ikon": "👀",
      "nama": "Max",
      "isi": "Dari satu arah, ambil tinggi maksimum (Occlusion Max Rule).",
      "suara": "Bukan jumlah mentah."
    },
    {
      "ikon": "⬇️",
      "nama": "Atas",
      "isi": "Tampak atas hanya petak terisi, bukan ketinggian.",
      "suara": "Jebakan umum."
    }
  ],
  "poinSuara": "Ingat: catat matriks tinggi, dari depan atau samping ambil maksimum, dari atas hanya hitung petak terisi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Buat/lihat 3D",
        "warna": "#FDE68A"
      },
      {
        "teks": "isi matriks tinggi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung max siluet",
        "warna": "#BFDBFE"
      },
      {
        "teks": "cocokkan 3 tampak",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: susun 4–6 kubus, gambar tampak depan dan atas di kertas kotak-kotak.",
  "refleksi": [
    "Mengapa empat kubus ditumpuk hanya tampak satu petak dari atas?",
    "Apa Occlusion Max Rule?",
    "Mengapa tampak atas tidak memberi tahu tinggi?"
  ]
};
export const SUB_C63: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Lokasi)",
  "fullTitle": "Sub-Bab C: Lokasi",
  "targetDescription": "Siswa menyatakan lokasi pada sistem berpetak (huruf, angka), menentukan jalur, dan menghitung jarak Manhattan sesuai Buku Siswa Kelas VI Bab 3 Sub-Bab C hlm. 105–112.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#15803D",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Makassar di peta pada petak C2. METODE LUAR Grid Coordinate Naming: garis vertikal huruf, horizontal bilangan. METODE LUAR Manhattan Path Distance: jarak = selisih huruf plus selisih angka. Hanya gerak kanan-kiri atau depan-belakang, bukan diagonal. Banyak jalur bisa sama pendeknya. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menyatakan lokasi pada sistem berpetak serta mendeskripsikan jalur dan jarak horizontal-vertikal.",
    "referensi": "Buku Siswa Matematika Kelas VI Bab 3 Sub-Bab C hlm. 105–112; Grid Coordinate Naming; Manhattan Path Distance; Shortest Grid Path."
  },
  "videos": [
    {
      "id": "K6B3C-V1",
      "judul": "Petak Huruf & Angka",
      "subjudul": "Koordinat",
      "adegan": [
        {
          "id": "K6B3C-V1-1",
          "judul": "Sistem berpetak",
          "ketukan": [
            "Vertikal = huruf A, B, C…",
            "Horizontal = bilangan 1, 2, 3…",
            "METODE LUAR · Grid Coordinate Naming.",
            "Makassar contoh: C2."
          ],
          "papan": [
            "huruf vertikal",
            "angka horizontal",
            "Grid Naming",
            "C2"
          ]
        },
        {
          "id": "K6B3C-V1-2",
          "judul": "Letak benda",
          "ketukan": [
            "Setiap perpotongan = satu lokasi.",
            "Tuliskan pasangan (huruf, angka).",
            "Denah kelas: kursi teman.",
            "Kubus di (F,1) dipindah ke (D,2)."
          ],
          "papan": [
            "perpotongan",
            "(huruf,angka)",
            "denah kelas",
            "pindah kubus"
          ]
        },
        {
          "id": "K6B3C-V1-3",
          "judul": "Pesan berantai",
          "ketukan": [
            "Pesan hanya ke tetangga sisi.",
            "Bukan diagonal.",
            "Hitung berapa langkah anak.",
            "Ini fondasi jarak petak."
          ],
          "papan": [
            "tetangga sisi",
            "bukan diagonal",
            "langkah",
            "fondasi"
          ]
        }
      ]
    },
    {
      "id": "K6B3C-V2",
      "judul": "Jalur & Jarak",
      "subjudul": "Manhattan",
      "adegan": [
        {
          "id": "K6B3C-V2-1",
          "judul": "Manhattan",
          "ketukan": [
            "METODE LUAR · Manhattan Path Distance.",
            "Dari (A,3) ke (E,5): |E−A|+|5−3|=4+2=6.",
            "Hanya kanan/kiri/atas/bawah.",
            "Diagonal tidak dihitung sekali."
          ],
          "papan": [
            "|Δh|+|Δa|",
            "A3→E5=6",
            "4 arah",
            "Manhattan"
          ]
        },
        {
          "id": "K6B3C-V2-2",
          "judul": "Banyak jalur pendek",
          "ketukan": [
            "METODE LUAR · Shortest Grid Path.",
            "Beberapa urutan gerak bisa sama panjang.",
            "Contoh: kanan-kanan-atas sama atas-kanan-kanan.",
            "Pengayaan: hitung banyak cara."
          ],
          "papan": [
            "banyak jalur",
            "sama pendek",
            "urut beda",
            "pengayaan"
          ]
        },
        {
          "id": "K6B3C-V2-3",
          "judul": "Kubus digeser",
          "ketukan": [
            "Kubus di (F,1) ke (D,2) direbahkan sisi.",
            "Jarak petak = 2+1=3 langkah minimal.",
            "Pahami denah sebelum menghitung volume lagi.",
            "Gabungkan A–C."
          ],
          "papan": [
            "F1→D2",
            "jarak 3",
            "denah dulu",
            "A–C"
          ]
        }
      ]
    },
    {
      "id": "K6B3C-V3",
      "judul": "Rangkum A–C",
      "subjudul": "Bab 3",
      "adegan": [
        {
          "id": "K6B3C-V3-1",
          "judul": "Alur bab",
          "ketukan": [
            "A: susun/urai + hitung 3D.",
            "B: tampak tiga arah.",
            "C: lokasi dan jarak petak.",
            "Tigor siap seperti arsitek kecil."
          ],
          "papan": [
            "A konstruksi",
            "B proyeksi",
            "C lokasi",
            "arsitek"
          ]
        },
        {
          "id": "K6B3C-V3-2",
          "judul": "Label metode",
          "ketukan": [
            "Construct-Decompose, Layer, Hidden Support.",
            "Orthographic, Height-Matrix, Occlusion Max.",
            "Grid Naming, Manhattan, Shortest Path.",
            "Visual kubus 3D naskah lama + buku."
          ],
          "papan": [
            "metode A",
            "metode B",
            "metode C",
            "3D+buku"
          ]
        },
        {
          "id": "K6B3C-V3-3",
          "judul": "Materi siap",
          "ketukan": [
            "Tab Materi Bab 3 Sub-Bab A sampai C siap.",
            "Latihan dan ujian menyusul instruksi terpisah.",
            "Mainkan permainan kubus 3D.",
            "Hebat, master kubus dan balok!"
          ],
          "papan": [
            "Materi A–C",
            "tanpa Latihan dulu",
            "main 3D",
            "hebat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Baca sumbu",
      "stepDesc": "Baca soal Lokasi dengan teliti. Tandai apa yang diketahui dan apa yang ditanyakan. Ucapkan pertanyaan dengan kalimatmu sendiri sebelum menghitung. Huruf & angka Jangan buru-buru ke angka; pastikan dulu makna ceritanya. Tujuan belajarnya: Siswa menyatakan lokasi pada sistem berpetak (huruf, angka), menentukan jalur, dan menghitung jarak Manhattan sesuai Buk….",
      "icon": "🔤",
      "flowFrom": "Baca sumbu",
      "flowTo": "Tulis lokasi"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Tulis lokasi",
      "stepDesc": "(H, N). Pada Lokasi, langkah “Tulis lokasi” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📍",
      "flowFrom": "Tulis lokasi",
      "flowTo": "Pilih jalur"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Pilih jalur",
      "stepDesc": "4 arah. Pada Lokasi, langkah “Pilih jalur” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "➡️",
      "flowFrom": "Pilih jalur",
      "flowTo": "Hitung jarak"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Hitung jarak",
      "stepDesc": "Manhattan. Pada Lokasi, langkah “Hitung jarak” dipakai supaya kamu melihat hubungan antar bilangan atau benda dengan jelas. Coba contoh dari cerita, lalu ulangi dengan angka lain agar polanya terlihat. Jika bingung, kembali ke langkah sebelumnya lalu maju lagi pelan-pelan.",
      "icon": "📏",
      "flowFrom": "Hitung jarak",
      "flowTo": "Banding jalur"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Banding jalur",
      "stepDesc": "Sekarang terapkan cara yang sudah dipilih pada Lokasi. Gambar dulu atau tulis langkahnya satu per satu, jangan lompat. Kalau tersendat, kembali ke cara sebelumnya lalu coba lagi. Hasil sementara ditulis rapi supaya mudah diperiksa.",
      "icon": "🔀",
      "flowFrom": "Banding jalur",
      "flowTo": "Terapkan"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Terapkan",
      "stepDesc": "Periksa apakah jawabanmu masuk akal untuk Lokasi. Bandingkan dengan perkiraan kasar, hitung ulang dengan cara lain, atau balik operasi. Jika hasilnya jauh dari dugaan, cari di mana langkahnya keliru. Pemeriksaan ini melatih kejujuran berpikir, bukan hanya kecepatan.",
      "icon": "✅",
      "flowFrom": "Terapkan",
      "flowTo": "Latihan Concrete–Abstract"
    }
  ],
  "infografis": [
    {
      "judul": "Huruf",
      "emoji": "🔤",
      "countNum": 1,
      "countWord": "sumbu vertikal",
      "suara": "Huruf — sumbu vertikal. Pada Lokasi, cocokkan gambar “Huruf” dengan artinya (sumbu vertikal), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "🔤 Huruf: sumbu vertikal"
    },
    {
      "judul": "Angka",
      "emoji": "🔢",
      "countNum": 1,
      "countWord": "sumbu horizontal",
      "suara": "Angka — sumbu horizontal. Pada Lokasi, cocokkan gambar “Angka” dengan artinya (sumbu horizontal), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "🔢 Angka: sumbu horizontal"
    },
    {
      "judul": "C2",
      "emoji": "📍",
      "countNum": 1,
      "countWord": "contoh Makassar",
      "suara": "C2 — contoh Makassar. Pada Lokasi, cocokkan gambar “C2” dengan artinya (contoh Makassar), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "📍 C2: contoh Makassar"
    },
    {
      "judul": "Manhattan",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "|Δh|+|Δa|",
      "suara": "Manhattan — |Δh|+|Δa|. Dari (A,3) ke (E,5): |E−A|+|5−3|=4+2=6. Hanya kanan/kiri/atas/bawah. Ingat: |Δh|+|Δa|; A3→E5=6; 4 arah. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "📏 Manhattan: |Δh|+|Δa|"
    },
    {
      "judul": "A3→E5",
      "emoji": "➡️",
      "countNum": 6,
      "countWord": "jarak 6",
      "suara": "A3→E5 — jarak 6. Pada Lokasi, cocokkan gambar “A3→E5” dengan artinya (jarak 6), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "➡️ A3→E5: jarak 6"
    },
    {
      "judul": "4 arah",
      "emoji": "⬆️",
      "countNum": 1,
      "countWord": "bukan diagonal",
      "suara": "4 arah — bukan diagonal. Pada Lokasi, cocokkan gambar “4 arah” dengan artinya (bukan diagonal), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "⬆️ 4 arah: bukan diagonal"
    },
    {
      "judul": "Shortest Path",
      "emoji": "🔀",
      "countNum": 1,
      "countWord": "banyak cara",
      "suara": "Shortest Path — banyak cara. Pada Lokasi, cocokkan gambar “Shortest Path” dengan artinya (banyak cara), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "🔀 Shortest Path: banyak cara"
    },
    {
      "judul": "F1→D2",
      "emoji": "🧊",
      "countNum": 3,
      "countWord": "jarak 3",
      "suara": "F1→D2 — jarak 3. Pada Lokasi, cocokkan gambar “F1→D2” dengan artinya (jarak 3), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "🧊 F1→D2: jarak 3"
    },
    {
      "judul": "Denah kelas",
      "emoji": "🏫",
      "countNum": 1,
      "countWord": "kursi teman",
      "suara": "Denah kelas — kursi teman. Pada Lokasi, cocokkan gambar “Denah kelas” dengan artinya (kursi teman), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "🏫 Denah kelas: kursi teman"
    },
    {
      "judul": "Bab 3 A–C",
      "emoji": "🎉",
      "countNum": 1,
      "countWord": "Materi siap",
      "suara": "Bab 3 A–C — Materi siap. Pada Lokasi, cocokkan gambar “Bab 3 A–C” dengan artinya (Materi siap), lalu sebut satu contoh dari ceritamu. Lihat poster: apa yang digambar, apa artinya, lalu hubungkan ke soal cerita Lokasi.",
      "teksVisual": "🎉 Bab 3 A–C: Materi siap"
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "hitung-c-c",
      "title": "Hitung Jarak Petak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "rumus-c-c",
      "title": "Arti Manhattan",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-c-c",
      "title": "Pilih Koordinat",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sortir-c-c",
      "title": "Pilah Jalur Sah/Tidak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jodoh-c-c",
      "title": "Jodohkan Titik-Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "memori-c-c",
      "title": "Memori Lokasi",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "ketuk-c-c",
      "title": "Ketuk Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "semua-c-c",
      "title": "Ketuk Semua Benar",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "cerita-c-c",
      "title": "Cerita Peta Makassar",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "urut-c-c",
      "title": "Urutkan Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "emoji": "📍",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "hitung-c-p",
      "title": "Diagram Hitung Jarak Petak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "hitung",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "rumus-c-p",
      "title": "Diagram Arti Manhattan",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "rumus",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "arti-c-p",
      "title": "Diagram Pilih Koordinat",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "arti",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sortir-c-p",
      "title": "Diagram Pilah Jalur Sah/Tidak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "sortir",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "jodoh-c-p",
      "title": "Diagram Jodohkan Titik-Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "jodoh",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "memori-c-p",
      "title": "Diagram Memori Lokasi",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "memori",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "ketuk-c-p",
      "title": "Diagram Ketuk Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "ketuk",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "semua-c-p",
      "title": "Diagram Ketuk Semua Benar",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "semua",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "cerita-c-p",
      "title": "Diagram Cerita Peta Makassar",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "cerita",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "urut-c-p",
      "title": "Diagram Urutkan Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "diagramType": "urut",
      "numberA": 2,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "hitung-c-a",
      "title": "Tulis Hitung Jarak Petak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "symbolLarge": "📍",
      "wordLarge": "LOKASI",
      "mathNotation": "|Δh|+|Δa|"
    },
    {
      "stage": "Abstract",
      "gameType": "rumus-c-a",
      "title": "Tulis Arti Manhattan",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "symbolLarge": "📍",
      "wordLarge": "LOKASI",
      "mathNotation": "|Δh|+|Δa|"
    },
    {
      "stage": "Abstract",
      "gameType": "arti-c-a",
      "title": "Tulis Pilih Koordinat",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "symbolLarge": "📍",
      "wordLarge": "LOKASI",
      "mathNotation": "|Δh|+|Δa|"
    },
    {
      "stage": "Abstract",
      "gameType": "sortir-c-a",
      "title": "Tulis Pilah Jalur Sah/Tidak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "symbolLarge": "📍",
      "wordLarge": "LOKASI",
      "mathNotation": "|Δh|+|Δa|"
    },
    {
      "stage": "Abstract",
      "gameType": "jodoh-c-a",
      "title": "Tulis Jodohkan Titik-Jarak",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "symbolLarge": "📍",
      "wordLarge": "LOKASI",
      "mathNotation": "|Δh|+|Δa|"
    },
    {
      "stage": "Abstract",
      "gameType": "memori-c-a",
      "title": "Tulis Memori Lokasi",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde: baca koordinat, jarak, jalur pendek.",
      "voiceGuide": "Baca denah lalu pilih jarak atau lokasi.",
      "symbolLarge": "📍",
      "wordLarge": "LOKASI",
      "mathNotation": "|Δh|+|Δa|"
    },
    {
      "stage": "Abstract",
      "gameType": "bs-c",
      "title": "Benar atau Salah",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Dua ronde menilai pernyataan.",
      "voiceGuide": "Benar atau salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "det-c",
      "title": "Detektif Kubus",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga soal petunjuk.",
      "voiceGuide": "Pilih dari petunjuk.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "peta-c",
      "title": "Peta Konsep",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Satu peta konsep.",
      "voiceGuide": "Pilih isi kotak.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "cerita-q-c",
      "title": "Cerita Bangun",
      "bookReference": "hlm. 105–112",
      "objective": "Tentukan lokasi dan jarak dengan Grid Naming dan Manhattan Path pada denah berpetak.",
      "mechanicDescription": "Tiga ronde cerita.",
      "voiceGuide": "Baca lalu pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🔤",
      "nama": "Grid",
      "isi": "Huruf vertikal, angka horizontal (Grid Coordinate Naming).",
      "suara": "Contoh C2."
    },
    {
      "ikon": "📏",
      "nama": "Manhattan",
      "isi": "Jarak = |Δhuruf| + |Δangka| (Manhattan Path Distance).",
      "suara": "4 arah."
    },
    {
      "ikon": "🔀",
      "nama": "Jalur",
      "isi": "Beberapa jalur bisa sama pendek (Shortest Grid Path).",
      "suara": "Urutan beda."
    },
    {
      "ikon": "🚫",
      "nama": "Diagonal",
      "isi": "Gerak diagonal tidak diizinkan pada eksperimen pesan berantai.",
      "suara": "Hanya sisi."
    }
  ],
  "poinSuara": "Ingat: tulis lokasi huruf-angka, jarak Manhattan tanpa diagonal, dan beberapa jalur bisa sama pendeknya.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Baca sumbu",
        "warna": "#FDE68A"
      },
      {
        "teks": "tulis (H,N)",
        "warna": "#BBF7D0"
      },
      {
        "teks": "hitung |Δh|+|Δa|",
        "warna": "#BFDBFE"
      },
      {
        "teks": "pilih jalur pendek",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: buat denah meja belajar berpetak, tandai dua benda, hitung jarak Manhattan-nya.",
  "refleksi": [
    "Bagaimana menulis lokasi kursi di denah kelas?",
    "Hitung jarak (A,3) ke (E,5).",
    "Mengapa diagonal tidak dihitung satu langkah?"
  ]
};

export const SUB_BAB_K6B3: SubBabNaskah[] = [SUB_A63, SUB_B63, SUB_C63];
export const semuaAdeganK6B3 = SUB_BAB_K6B3.flatMap((s) => s.videos.flatMap((v) => v.adegan));
