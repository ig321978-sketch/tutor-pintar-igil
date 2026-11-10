/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K2B6_META = {
  "chapterId": "k2-mat-bab6",
  "phaseCode": "FASE_A",
  "grade": 2,
  "subjectLabel": "MATEMATIKA - KELAS 2 SD",
  "title": "BAB 6: PENGUKURAN",
  "silabusElemen": "🌈 Fase A • Elemen Pengukuran: Berat dan Waktu (Kelas 2 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A6: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Berat)",
  "fullTitle": "Sub-Bab A: Berat",
  "targetDescription": "Siswa membandingkan berat benda dengan timbangan jungkat-jungkit, gantungan baju, dan kedua tangan memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan, mengurutkan benda menurut beratnya, serta mengukur berat benda dengan satuan tidak baku (balok mainan, kelereng, koin, dan bola tenis) sambil memahami bahwa hasil ukur bergantung pada alat ukur yang dipakai. Siswa memakai cara Banding Berat, Satuan Tak Baku Berat, Lebih Berat Lebih Ringan.",
  "secondaryBg": "#FEF3C7",
  "secondaryBorder": "#D97706",
  "secondaryText": "#78350F",
  "silabus": {
    "teksSuara": "Kita belajar berat. Enam sekawan piket membersihkan kelas, dan mereka mengangkat benda yang berat dan benda yang ringan. Kita membandingkan berat dua benda dengan timbangan jungkat-jungkit, gantungan baju, dan kedua tangan. Kita memakai kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan. Kita juga mengukur berat boneka dengan bola tenis dan kelereng, lalu belajar bahwa hasil ukur bergantung pada alat ukur. Kita memakai cara dari luar buku: Banding Berat (Compare Mass); Satuan Tak Baku Berat (Nonstandard Mass); Lebih Berat Lebih Ringan (Heavier Lighter). Mana yang lebih berat dengan neraca/pegang. Pakai benda acuan sebelum satuan baku. Bahasa banding untuk berat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membandingkan berat benda secara langsung dengan kata lebih berat, lebih ringan, sama berat, paling berat, dan paling ringan, mengurutkan benda menurut beratnya, mengukur berat benda dengan satuan tidak baku, serta menyampaikan hasilnya dengan percaya diri.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 6 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K2B6A-V1",
      "judul": "Piket Membersihkan Kelas",
      "subjudul": "Compare Mass",
      "adegan": [
        {
          "id": "K2B6A-V1-1",
          "judul": "Giliran piket",
          "ketukan": [
            "Hari ini enam sekawan mendapat giliran piket membersihkan kelas.",
            "Upe dan Halim mengangkat meja bersama, karena meja itu berat. Mari kita pahami bersama.",
            "Malosi mengangkat dan menggeser kursi. Tika mengelap kaca jendela, dan Kira menyapu lantai.",
            "Ingat cara Banding Berat: Mana yang lebih berat dengan neraca/pegang."
          ],
          "papan": [
            "Giliran piket",
            "Meja diangkat berdua",
            "Kursi, jendela, lantai",
            "Tanggung jawab"
          ]
        },
        {
          "id": "K2B6A-V1-2",
          "judul": "Berat atau ringan?",
          "ketukan": [
            "Benda apa yang paling berat di kelas? Meja yang diangkat berdua itu. Mari kita pahami bersama.",
            "Benda apa yang paling ringan? Kemoceng yang dipegang Lili itu. Mari kita pahami bersama.",
            "Kita tahu karena meja perlu dua orang untuk mengangkatnya, sedangkan kemoceng cukup satu tangan.",
            "Di sini kita memakai ide Compare Mass — Mana yang lebih berat dengan neraca/pegang."
          ],
          "papan": [
            "Paling berat: meja",
            "Paling ringan: kemoceng",
            "Dua orang atau satu tangan",
            "Berat: tarikan ke bawah"
          ]
        },
        {
          "id": "K2B6A-V1-3",
          "judul": "Bercerita dengan kata berat",
          "ketukan": [
            "Kita ceritakan benda-benda itu dengan kata lebih berat, paling berat, dan paling ringan.",
            "Meja lebih berat dari kursi. Kursi lebih berat dari kemoceng. Mari kita pahami bersama.",
            "Jadi meja paling berat, dan kemoceng paling ringan. Mari kita pahami bersama.",
            "METODE LUAR · Banding Berat: Mana yang lebih berat dengan neraca/pegang."
          ],
          "papan": [
            "Kata berat",
            "Meja, kursi, kemoceng",
            "Meja paling berat",
            "Besar belum tentu berat"
          ]
        }
      ]
    },
    {
      "id": "K2B6A-V2",
      "judul": "Latihan: Satuan Tak Baku Berat",
      "subjudul": "Nonstandard Mass",
      "adegan": [
        {
          "id": "K2B6A-V2-1",
          "judul": "Timbangan jungkat-jungkit",
          "ketukan": [
            "Kita dapat membandingkan berat dua benda dengan tiga cara. Mari kita pahami bersama.",
            "Cara pertama memakai timbangan jungkat-jungkit. Ini papan yang bagian tengahnya diam, dan ujungnya naik turun.",
            "Taruh apel di satu ujung dan anggur di ujung yang lain. Ujung apel turun, karena apel lebih berat dari anggur.",
            "Ingat cara Satuan Tak Baku Berat: Pakai benda acuan sebelum satuan baku."
          ],
          "papan": [
            "Tiga cara",
            "Jungkat-jungkit",
            "Apel turun, anggur naik",
            "Berat di bawah, ringan di atas"
          ]
        },
        {
          "id": "K2B6A-V2-2",
          "judul": "Gantungan baju dan dua tangan",
          "ketukan": [
            "Cara kedua memakai gantungan baju. Gantung satu benda di tiap ujung, lalu lihat ujung mana yang turun.",
            "Semangka dan apel. Ujung semangka turun, jadi semangka lebih berat dari apel.",
            "Cara ketiga memakai kedua tangan kita. Angkat satu benda di tiap tangan, lalu rasakan mana yang lebih berat.",
            "Di sini kita memakai ide Nonstandard Mass — Pakai benda acuan sebelum satuan baku."
          ],
          "papan": [
            "Gantungan baju",
            "Semangka lebih berat",
            "Dua tangan",
            "Jeruk sama berat dengan apel"
          ]
        },
        {
          "id": "K2B6A-V2-3",
          "judul": "Paling berat, paling ringan",
          "ketukan": [
            "Ada empat buah: semangka, apel Malang, jeruk Medan, dan anggur. Mari kita pahami bersama.",
            "Semangka lebih berat dari apel, dan apel lebih berat dari anggur. Mari kita pahami bersama.",
            "Jadi semangka paling berat di antara ketiganya. Mari kita pahami bersama.",
            "METODE LUAR · Satuan Tak Baku Berat: Pakai benda acuan sebelum satuan baku."
          ],
          "papan": [
            "Empat buah",
            "Semangka, apel, anggur",
            "Semangka paling berat",
            "Anggur paling ringan"
          ]
        }
      ]
    },
    {
      "id": "K2B6A-V3",
      "judul": "Siap pakai Heavier Lighter",
      "subjudul": "Heavier Lighter",
      "adegan": [
        {
          "id": "K2B6A-V3-1",
          "judul": "Satuan tidak baku",
          "ketukan": [
            "Kita dapat mengukur berat benda memakai benda kecil lain yang ukurannya sama. Itu disebut satuan tidak baku.",
            "Contohnya mainan balok, kelereng, koin, dan bola tenis. Mari kita pahami bersama.",
            "Tika ingin mengukur berat bonekanya memakai bola tenis. Mari kita pahami bersama.",
            "Ingat cara Lebih Berat Lebih Ringan: Bahasa banding untuk berat."
          ],
          "papan": [
            "Satuan tidak baku",
            "Balok, kelereng, koin, bola",
            "Boneka Tika",
            "Taruh satu per satu"
          ]
        },
        {
          "id": "K2B6A-V3-2",
          "judul": "Satu, dua, tiga, empat",
          "ketukan": [
            "Tika menaruh satu bola tenis. Boneka masih lebih berat dari satu bola tenis.",
            "Tika menaruh dua bola tenis. Boneka masih lebih berat dari dua bola tenis.",
            "Tika menaruh tiga bola tenis. Boneka masih lebih berat dari tiga bola tenis.",
            "Di sini kita memakai ide Heavier Lighter — Bahasa banding untuk berat."
          ],
          "papan": [
            "1 bola tenis",
            "2 bola tenis",
            "3 bola tenis",
            "4 bola tenis: seimbang"
          ]
        },
        {
          "id": "K2B6A-V3-3",
          "judul": "Alat ukur yang berbeda",
          "ketukan": [
            "Tika mengukur boneka itu lagi memakai kelereng. Mari kita pahami bersama.",
            "Ternyata berat satu boneka sama dengan sepuluh kelereng. Mari kita pahami bersama.",
            "Berat boneka adalah empat bola tenis, dan juga sepuluh kelereng. Mari kita pahami bersama.",
            "METODE LUAR · Lebih Berat Lebih Ringan: Bahasa banding untuk berat."
          ],
          "papan": [
            "Pakai kelereng",
            "10 kelereng",
            "4 bola tenis atau 10 kelereng",
            "Bergantung alat ukur"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Berat. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Compare Mass",
      "stepDesc": "Mana yang lebih berat dengan neraca/pegang.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Nonstandard Mass",
      "stepDesc": "Pakai benda acuan sebelum satuan baku.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Heavier Lighter",
      "stepDesc": "Bahasa banding untuk berat.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar soal.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal? Bandingkan dengan perkiraan.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Ulangi ide utamanya dengan kalimatmu sendiri.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut main",
      "stepDesc": "Siap melatih di permainan Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Tiga Cara Menimbang",
      "emoji": "⚖️",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Ada tiga cara membandingkan berat dua benda: timbangan jungkat-jungkit, gantungan baju, dan kedua tangan kita."
    },
    {
      "judul": "Posisi pada Timbangan",
      "emoji": "↕️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Posisi benda yang lebih berat berada lebih bawah. Posisi benda yang lebih ringan berada lebih atas."
    },
    {
      "judul": "Tiga Kata Perbandingan",
      "emoji": "🔤",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Untuk dua benda kita memakai tiga kata: lebih berat, lebih ringan, dan sama berat."
    },
    {
      "judul": "Paling Berat dan Paling Ringan",
      "emoji": "🏆",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk tiga benda atau lebih kita memakai paling berat dan paling ringan. Semangka paling berat, anggur paling ringan."
    },
    {
      "judul": "Besar Belum Tentu Berat",
      "emoji": "🎈",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Balon yang besar sangat ringan, dan batu yang kecil terasa berat. Jangan menebak berat hanya dari besarnya benda."
    },
    {
      "judul": "Empat Satuan Tidak Baku",
      "emoji": "🎾",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat contoh satuan tidak baku: mainan balok, kelereng, koin, dan bola tenis. Semuanya benda kecil yang ukurannya sama."
    },
    {
      "judul": "Cara Mengukur Berat",
      "emoji": "🧸",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat langkah mengukur berat. Satu, tebak dulu. Dua, taruh satuan satu per satu. Tiga, berhenti saat seimbang. Empat, tulis hasilnya."
    },
    {
      "judul": "Satu Boneka, Dua Hasil",
      "emoji": "🔁",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Berat satu boneka sama dengan empat bola tenis, dan juga sama dengan sepuluh kelereng. Alat ukurnya berbeda, hasilnya berbeda."
    },
    {
      "judul": "Satuan Ringan, Hitungan Banyak",
      "emoji": "🔢",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Kelereng lebih ringan daripada bola tenis. Karena itu kita memerlukan lebih banyak kelereng, yaitu sepuluh, dibanding bola tenis, yaitu empat."
    },
    {
      "judul": "Rantai Perbandingan",
      "emoji": "🥭",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu pepaya sama dengan dua mangga. Satu mangga sama dengan dua manggis. Jadi satu pepaya sama dengan empat manggis."
    },
    {
      "judul": "Banding Berat",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Mana yang lebih berat dengan neraca/pegang."
    },
    {
      "judul": "Satuan Tak Baku Berat",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Pakai benda acuan sebelum satuan baku."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "lift-two-hands-compare",
      "title": "Angkat dengan Dua Tangan",
      "bookReference": "hlm. 160–162 (membandingkan dengan kedua tangan; Ayo Mencoba nomor 1 sampai 4)",
      "objective": "Pakai Banding Berat: Mana yang lebih berat dengan neraca/pegang. Latihan: Merasakan dan menentukan benda yang lebih berat, lebih ringan, atau sama berat dengan kedua tangan..",
      "mechanicDescription": "Empat ronde, tiap ronde tiga pasang benda, misalnya semangka dan apel, jeruk dan anggur, buku dan pensil. Siswa menekan Angkat dua-duanya, melihat tangan yang memegang benda lebih berat turun lebih rendah, lalu memilih satu dari tiga pernyataan. Dua pasang sama berat. Kunci dihitung dari tabel berat benda. Saat bermain, terapkan Compare Mass: Mana yang lebih berat dengan neraca/pegang.",
      "voiceGuide": "Banding Berat. Mana yang lebih berat dengan neraca/pegang.",
      "emoji": "🤲",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "seesaw-place-and-compare",
      "title": "Jungkat-Jungkit",
      "bookReference": "hlm. 158–159 (timbangan jungkat-jungkit; posisi benda yang lebih berat berada lebih bawah)",
      "objective": "Pakai Banding Berat: Mana yang lebih berat dengan neraca/pegang. Latihan: Menaruh dua benda pada timbangan jungkat-jungkit dan membaca sisi yang turun..",
      "mechanicDescription": "Empat ronde, tiap ronde dua benda. Siswa mengetuk benda, lalu mengetuk piringan kiri atau kanan. Piringan yang berisi benda lebih berat turun. Setelah kedua benda terpasang, siswa memilih yang lebih berat. Satu ronde sama berat. Siswa boleh menukar tempat benda. Saat bermain, terapkan Compare Mass: Mana yang lebih berat dengan neraca/pegang.",
      "voiceGuide": "Banding Berat. Mana yang lebih berat dengan neraca/pegang.",
      "emoji": "⚖️",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "guess-then-prove-hanger",
      "title": "Gantungan Baju: Tebak dan Buktikan",
      "bookReference": "hlm. 161–162 (Ayo Mencoba nomor 2 dan 3: tebak benda yang lebih berat, lalu buktikan)",
      "objective": "Pakai Banding Berat: Mana yang lebih berat dengan neraca/pegang. Latihan: Menebak benda yang lebih berat, lalu membuktikannya dengan gantungan baju..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua pasang benda. Siswa memilih tebakan dulu. Setelah memilih, gantungan dilepas dan miringnya membuktikan jawaban. Tebakan yang meleset diberi penjelasan dan boleh dipilih ulang. Saat bermain, terapkan Compare Mass: Mana yang lebih berat dengan neraca/pegang.",
      "voiceGuide": "Banding Berat. Mana yang lebih berat dengan neraca/pegang.",
      "emoji": "🧥",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-by-weight-tap",
      "title": "Urutkan dari Ringan ke Berat",
      "bookReference": "hlm. 175 dan 177 (urutan benda dari yang paling ringan)",
      "objective": "Pakai Banding Berat: Mana yang lebih berat dengan neraca/pegang. Latihan: Mengurutkan tiga atau empat benda dari paling ringan atau dari paling berat..",
      "mechanicDescription": "Empat ronde, tiga atau empat benda, dua ronde dari paling ringan dan dua ronde dari paling berat. Siswa mengetuk benda satu per satu sesuai urutan. Benda yang salah memberi petunjuk. Kunci dihitung dari tabel berat benda. Saat bermain, terapkan Compare Mass: Mana yang lebih berat dengan neraca/pegang.",
      "voiceGuide": "Banding Berat. Mana yang lebih berat dengan neraca/pegang.",
      "emoji": "📶",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "sort-heavier-lighter-reference",
      "title": "Pilah: Lebih Berat atau Lebih Ringan",
      "bookReference": "hlm. 165–167 (warnai yang paling berat dan paling ringan; lengkapi kalimat)",
      "objective": "Memilah benda yang lebih berat dan yang lebih ringan dari sebuah benda acuan.. Ingat Banding Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde satu benda acuan dan enam benda lain. Siswa menyeret atau mengetuk benda ke kotak Lebih berat dari acuan atau Lebih ringan dari acuan. Benda yang salah kembali dengan petunjuk. Gunakan Banding Berat.",
      "voiceGuide": "Banding Berat. Pilah benda ke kotak yang tepat.",
      "emoji": "📦",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "balance-with-informal-units",
      "title": "Timbang dengan Satuan",
      "bookReference": "hlm. 168–170 (Tika mengukur berat boneka dengan bola tenis dan kelereng)",
      "objective": "Menambah satuan tidak baku satu per satu sampai timbangan seimbang.. Ingat Banding Berat.",
      "mechanicDescription": "Empat ronde: boneka dengan bola tenis, boneka dengan kelereng, buku dengan bola tenis, dan gunting dengan koin. Siswa menekan tombol tambah satuan di piringan kanan sampai neraca seimbang. Neraca miring sesuai berat sehingga siswa tahu harus menambah atau mengurangi. Gunakan Banding Berat.",
      "voiceGuide": "Banding Berat. Tambah satuan sampai timbangan seimbang.",
      "emoji": "🎾",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "count-units-on-scale",
      "title": "Berapa Satuan?",
      "bookReference": "hlm. 172–173 (Ayo Berlatih nomor 1: tuliskan hasil pengukuran)",
      "objective": "Membaca hasil pengukuran berat dari gambar timbangan yang seimbang.. Ingat Banding Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua gambar neraca seimbang, misalnya tas dengan bola tenis atau penggaris dengan koin. Siswa memilih banyak satuan dari tiga pilihan angka. Kunci dihitung dari berat benda dan berat satuan. Gunakan Banding Berat.",
      "voiceGuide": "Banding Berat. Hitung satuan di piringan, lalu pilih angkanya.",
      "emoji": "🔢",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "tap-heaviest-lightest",
      "title": "Cari yang Paling Berat dan Paling Ringan",
      "bookReference": "hlm. 165 dan 176 (warnai benda yang paling berat dan paling ringan)",
      "objective": "Menemukan benda yang paling berat dan paling ringan di antara beberapa benda.. Ingat Banding Berat.",
      "mechanicDescription": "Empat ronde, kelompok empat atau lima benda. Tiap ronde punya dua pertanyaan: paling berat, lalu paling ringan. Siswa mengetuk bendanya. Letak benda yang benar berpindah-pindah. Gunakan Banding Berat.",
      "voiceGuide": "Banding Berat. Ketuk benda yang paling berat atau paling ringan.",
      "emoji": "🏆",
      "targetCount": 8
    },
    {
      "stage": "Concrete",
      "gameType": "match-object-to-measure",
      "title": "Jodohkan Hasil Ukur",
      "bookReference": "hlm. 172–173 (tabel hasil percobaan dan hasil pengukuran)",
      "objective": "Menjodohkan benda dengan hasil pengukuran beratnya.. Ingat Banding Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga benda dan tiga hasil ukur, misalnya boneka dengan empat bola tenis. Siswa mengetuk benda, lalu mengetuk hasil ukurnya. Pasangan yang benar terkunci. Gunakan Banding Berat.",
      "voiceGuide": "Banding Berat. Ketuk benda, lalu ketuk hasil ukurnya.",
      "emoji": "🔗",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "pack-basket-heavy-first",
      "title": "Tata Keranjang Belanja",
      "bookReference": "hlm. 159 (benda yang lebih berat berada lebih bawah), diperkaya konteks belanja",
      "objective": "Menaruh belanjaan yang berat di dasar keranjang dan yang ringan di atasnya.. Ingat Banding Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga belanjaan. Siswa mengetuk belanjaan satu per satu mulai yang paling berat, sehingga tumpukan di keranjang tidak menekan barang ringan. Urutan salah memberi petunjuk. Gunakan Banding Berat.",
      "voiceGuide": "Banding Berat. Taruh yang paling berat di dasar keranjang dulu.",
      "emoji": "🧺",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "read-balance-diagram",
      "title": "Baca Neraca Balok",
      "bookReference": "hlm. 158–160 (posisi benda yang lebih berat lebih bawah)",
      "objective": "Pakai Satuan Tak Baku Berat: Pakai benda acuan sebelum satuan baku. Latihan: Membaca kemiringan neraca yang memuat balok berhuruf..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga neraca dengan balok A, B, C, D, E, F tanpa gambar benda. Siswa membaca sisi yang turun, lalu memilih pernyataan yang tepat. Sebagian neraca seimbang. Kunci dihitung dari bobot balok. Saat bermain, terapkan Nonstandard Mass: Pakai benda acuan sebelum satuan baku.",
      "voiceGuide": "Satuan Tak Baku Berat. Pakai benda acuan sebelum satuan baku.",
      "diagramType": "balance-blocks",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "order-letters-from-balances",
      "title": "Urutan dari Beberapa Neraca",
      "bookReference": "hlm. 159–160 (semangka lebih berat dari apel dan anggur) dalam bentuk diagram huruf",
      "objective": "Pakai Satuan Tak Baku Berat: Pakai benda acuan sebelum satuan baku. Latihan: Mengurutkan balok berhuruf dari beberapa neraca yang membandingkan dua balok..",
      "mechanicDescription": "Tiga ronde dengan tiga atau empat balok. Tiap ronde menampilkan dua sampai tiga neraca yang masing-masing membandingkan dua balok. Siswa mengetuk huruf dari yang paling ringan atau paling berat. Hanya satu urutan yang cocok dengan semua neraca. Saat bermain, terapkan Nonstandard Mass: Pakai benda acuan sebelum satuan baku.",
      "voiceGuide": "Satuan Tak Baku Berat. Pakai benda acuan sebelum satuan baku.",
      "diagramType": "balance-chain",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "bar-model-weight",
      "title": "Batang Berat",
      "bookReference": "hlm. 158–165 (membandingkan berat) dalam model batang",
      "objective": "Pakai Satuan Tak Baku Berat: Pakai benda acuan sebelum satuan baku. Latihan: Membaca batang yang menunjukkan berat dan menemukan yang paling tinggi dan paling rendah..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga sampai empat batang berhuruf dengan tinggi berbeda. Siswa mengetuk batang yang paling berat dan batang yang paling ringan. Kunci dihitung dari tinggi batang. Saat bermain, terapkan Nonstandard Mass: Pakai benda acuan sebelum satuan baku.",
      "voiceGuide": "Satuan Tak Baku Berat. Pakai benda acuan sebelum satuan baku.",
      "diagramType": "bar-model",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "count-dots-balanced",
      "title": "Hitung Titik di Neraca",
      "bookReference": "hlm. 168–170 (mengukur berat dengan satuan) dalam diagram titik",
      "objective": "Pakai Satuan Tak Baku Berat: Pakai benda acuan sebelum satuan baku. Latihan: Menghitung titik satuan yang seimbang dengan satu balok..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua neraca seimbang. Satu balok di kiri dan sejumlah titik di kanan. Siswa menghitung titik dan memilih banyaknya dari tiga angka. Saat bermain, terapkan Nonstandard Mass: Pakai benda acuan sebelum satuan baku.",
      "voiceGuide": "Satuan Tak Baku Berat. Pakai benda acuan sebelum satuan baku.",
      "diagramType": "dot-balance",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "tally-dots",
      "title": "Goresan Titik",
      "bookReference": "hlm. 168–170 (hasil pengukuran) dalam goresan tally",
      "objective": "Menuliskan hasil pengukuran sebagai goresan tally.. Ingat Satuan Tak Baku Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Siswa menekan Goresan sebanyak titik yang sama berat dengan satu balok, lalu menekan Periksa. Setiap lima goresan dikelompokkan. Gunakan Satuan Tak Baku Berat.",
      "voiceGuide": "Satuan Tak Baku Berat. Tambah goresan sebanyak titiknya.",
      "diagramType": "tally",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-weight-table",
      "title": "Tabel Hasil Ukur",
      "bookReference": "hlm. 162 dan 172 (tabel tebakan dan tabel hasil percobaan)",
      "objective": "Mengisi tabel hasil pengukuran berat dari diagram.. Ingat Satuan Tak Baku Berat.",
      "mechanicDescription": "Dua ronde dengan tabel berisi empat baris. Di atas tabel ada empat neraca seimbang: satu balok berhuruf dan sejumlah titik. Siswa menghitung titik, mengetuk baris, lalu mengetuk kartu angka yang tepat. Kartu angka yang sama dapat dipakai lagi bila diperlukan. Gunakan Satuan Tak Baku Berat.",
      "voiceGuide": "Satuan Tak Baku Berat. Isi tabel dengan kartu angka.",
      "diagramType": "table",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-balance-sentence",
      "title": "Jodohkan Neraca dan Kalimat",
      "bookReference": "hlm. 159–160 (kalimat perbandingan dari gambar neraca)",
      "objective": "Menjodohkan gambar neraca dengan kalimat perbandingannya.. Ingat Satuan Tak Baku Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga neraca berhuruf dan tiga kalimat, misalnya A lebih berat dari B. Siswa mengetuk neraca, lalu mengetuk kalimat yang cocok. Gunakan Satuan Tak Baku Berat.",
      "voiceGuide": "Satuan Tak Baku Berat. Ketuk neraca, lalu ketuk kalimatnya.",
      "diagramType": "balance-sentence",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "sort-balance-diagrams",
      "title": "Pilah Diagram Neraca",
      "bookReference": "hlm. 158–160 (membandingkan dua benda) dalam diagram",
      "objective": "Memilah diagram neraca menurut sisi yang lebih berat.. Ingat Satuan Tak Baku Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam diagram neraca. Siswa menyeret atau mengetuk diagram ke kotak Kiri lebih berat, Sama berat, atau Kanan lebih berat. Gunakan Satuan Tak Baku Berat.",
      "voiceGuide": "Satuan Tak Baku Berat. Pilah diagram ke kotak yang tepat.",
      "diagramType": "balance-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "number-line-dots",
      "title": "Garis Angka Titik",
      "bookReference": "hlm. 168–170 (hasil pengukuran) pada garis bilangan",
      "objective": "Menandai banyak titik yang sama berat dengan satu balok pada garis angka.. Ingat Satuan Tak Baku Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal pada garis angka satu sampai sepuluh. Siswa mengetuk bulatan angka yang tepat. Jawaban yang salah memberi petunjuk. Gunakan Satuan Tak Baku Berat.",
      "voiceGuide": "Satuan Tak Baku Berat. Ketuk angka yang diminta pada garis.",
      "diagramType": "number-line",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "balance-chart-dots",
      "title": "Seimbangkan Bagan",
      "bookReference": "hlm. 168–171 (menambah satuan sampai seimbang) dalam bagan titik",
      "objective": "Menambah titik sampai neraca bagan seimbang dengan satu balok.. Ingat Satuan Tak Baku Berat.",
      "mechanicDescription": "Tiga ronde, tiap ronde satu balok bertuliskan huruf. Siswa menambah titik satu per satu sampai neraca seimbang. Bagan miring sesuai bobot sehingga siswa tahu harus menambah atau mengurangi. Gunakan Satuan Tak Baku Berat.",
      "voiceGuide": "Satuan Tak Baku Berat. Tambah titik sampai neraca seimbang.",
      "diagramType": "balance-chart",
      "numberA": 3,
      "numberB": 1
    },
    {
      "stage": "Abstract",
      "gameType": "complete-weight-sentences",
      "title": "Lengkapi Kalimat Berat",
      "bookReference": "hlm. 162–163 dan 166–167 (lengkapi kalimat dengan lebih berat, lebih ringan, sama berat)",
      "objective": "Pakai Lebih Berat Lebih Ringan: Bahasa banding untuk berat. Latihan: Melengkapi kalimat perbandingan berat dengan kata yang tepat..",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat, misalnya semangka ... apel. Siswa memilih satu dari tiga kata hubungan. Kalimat yang lengkap dibacakan Suara Guru. Saat bermain, terapkan Heavier Lighter: Bahasa banding untuk berat.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Bahasa banding untuk berat.",
      "symbolLarge": "> < =",
      "wordLarge": "LEBIH BERAT",
      "mathNotation": "lebih berat • lebih ringan • sama berat"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-weight",
      "title": "Benar atau Salah: Berat",
      "bookReference": "hlm. 158–171 (membandingkan dan mengukur berat)",
      "objective": "Pakai Lebih Berat Lebih Ringan: Bahasa banding untuk berat. Latihan: Menilai pernyataan tentang berat, timbangan, dan satuan tidak baku..",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan tentang benda dihitung dari tabel berat. Setiap jawaban diberi penjelasan singkat. Saat bermain, terapkan Heavier Lighter: Bahasa banding untuk berat.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Bahasa banding untuk berat.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "build-weight-sentence",
      "title": "Susun Kalimat Berat",
      "bookReference": "hlm. 159–160 dan 170 (kalimat perbandingan dan hasil pengukuran)",
      "objective": "Pakai Lebih Berat Lebih Ringan: Bahasa banding untuk berat. Latihan: Menyusun kata menjadi kalimat tentang berat..",
      "mechanicDescription": "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan. Saat bermain, terapkan Heavier Lighter: Bahasa banding untuk berat.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Bahasa banding untuk berat.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • makna"
    },
    {
      "stage": "Abstract",
      "gameType": "chain-multiplication-weights",
      "title": "Hitung Cerdas Berat",
      "bookReference": "hlm. 176 dan 188 (satu pepaya sama dengan berapa manggis; berat 1, 2, dan 3 jeruk sama dengan berapa stroberi)",
      "objective": "Pakai Lebih Berat Lebih Ringan: Bahasa banding untuk berat. Latihan: Menghitung berat dengan rantai perbandingan dan penjumlahan berulang..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal cerita, misalnya satu mangga sama dengan dua manggis dan satu pepaya sama dengan dua mangga, berapa manggis sama dengan satu pepaya. Siswa memilih satu dari tiga angka. Kunci dihitung dari tabel berat. Saat bermain, terapkan Heavier Lighter: Bahasa banding untuk berat.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Bahasa banding untuk berat.",
      "symbolLarge": "2 + 2",
      "wordLarge": "HITUNG",
      "mathNotation": "kali banyaknya sama dengan tambah berulang"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-multiples-table",
      "title": "Tabel Kelipatan Berat",
      "bookReference": "hlm. 188 (Evaluasi nomor 3: berat 1, 2, dan 3 jeruk sama dengan berapa stroberi)",
      "objective": "Mengisi tabel kelipatan berat dua benda.. Ingat Lebih Berat Lebih Ringan.",
      "mechanicDescription": "Dua ronde dengan tabel berisi empat baris, misalnya satu, dua, tiga, dan empat jeruk dengan banyak stroberi. Siswa mengetuk baris, lalu mengetuk kartu angka. Gunakan Lebih Berat Lebih Ringan.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Isi tabel dengan kartu angka.",
      "symbolLarge": "1 2 3 4",
      "wordLarge": "TABEL",
      "mathNotation": "setiap tambah satu, tambah sebanyak yang sama"
    },
    {
      "stage": "Abstract",
      "gameType": "compare-measure-numbers",
      "title": "Mana Lebih Berat dari Angka",
      "bookReference": "hlm. 175 (berat benda dibandingkan 9 kelereng)",
      "objective": "Membandingkan dua benda dari hasil ukur dengan satuan yang sama.. Ingat Lebih Berat Lebih Ringan.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal. Dua benda diukur dengan satuan yang sama, misalnya A lima kelereng dan B delapan kelereng. Siswa memilih benda yang lebih berat atau sama berat. Satuan yang sama membuat angka dapat dibandingkan. Gunakan Lebih Berat Lebih Ringan.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Bandingkan angkanya, lalu pilih jawabannya.",
      "symbolLarge": "5 < 8",
      "wordLarge": "BANDINGKAN",
      "mathNotation": "satuan sama, angka lebih besar, lebih berat"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-weight-clues",
      "title": "Detektif Berat",
      "bookReference": "hlm. 165–167 (lebih berat dari, lebih ringan dari)",
      "objective": "Menemukan sebuah benda dari dua petunjuk perbandingan berat.. Ingat Lebih Berat Lebih Ringan.",
      "mechanicDescription": "Empat soal. Siswa membaca dua petunjuk, misalnya aku lebih berat dari apel dan lebih ringan dari semangka, lalu memilih satu dari tiga nama. Hanya satu nama yang cocok dengan kedua petunjuk. Gunakan Lebih Berat Lebih Ringan.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Baca semua petunjuk, lalu pilih namanya.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Berat",
      "bookReference": "hlm. 156 (peta konsep pengukuran: berat)",
      "objective": "Melengkapi peta konsep membandingkan berat dan satuan tidak baku.. Ingat Lebih Berat Lebih Ringan.",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Lebih Berat Lebih Ringan.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "berat • alat • satuan"
    },
    {
      "stage": "Abstract",
      "gameType": "order-by-measure-numbers",
      "title": "Urutkan dari Angka",
      "bookReference": "hlm. 175 nomor 3h dan hlm. 177 (urutan berat dari yang paling ringan)",
      "objective": "Mengurutkan benda dari hasil ukur dengan satuan yang sama.. Ingat Lebih Berat Lebih Ringan.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga atau empat benda dengan hasil ukur satuan yang sama, misalnya buku 15 koin. Siswa mengetuk benda dari yang paling ringan atau paling berat menurut angkanya. Gunakan Lebih Berat Lebih Ringan.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Ketuk menurut angka, dari kecil atau dari besar.",
      "symbolLarge": "4 < 6 < 15",
      "wordLarge": "URUTKAN",
      "mathNotation": "angka kecil, lebih ringan"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-true-weight",
      "title": "Ketuk Semua yang Benar",
      "bookReference": "hlm. 158–171 (membandingkan dan mengukur berat)",
      "objective": "Memilih semua pernyataan benar tentang timbangan dan satuan tidak baku.. Ingat Lebih Berat Lebih Ringan.",
      "mechanicDescription": "Tiga ronde, tiap ronde lima pernyataan dengan beberapa yang benar. Siswa mengetuk semua yang benar, lalu menekan Periksa. Pernyataan yang salah dijelaskan. Gunakan Lebih Berat Lebih Ringan.",
      "voiceGuide": "Lebih Berat Lebih Ringan. Ketuk semua yang benar, lalu periksa.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA BENAR",
      "mathNotation": "boleh lebih dari satu"
    }
  ],
  "poin": [
    {
      "ikon": "⚖️",
      "nama": "Tiga cara menimbang",
      "isi": "jungkat-jungkit, gantungan baju, tangan",
      "suara": "Kita membandingkan berat dengan timbangan jungkat-jungkit, gantungan baju, atau kedua tangan."
    },
    {
      "ikon": "↕️",
      "nama": "Posisi timbangan",
      "isi": "berat di bawah, ringan di atas",
      "suara": "Posisi benda yang lebih berat berada lebih bawah, dan posisi benda yang lebih ringan berada lebih atas."
    },
    {
      "ikon": "🌍",
      "nama": "Banding Berat",
      "isi": "Mana yang lebih berat dengan neraca/pegang.",
      "suara": "Banding Berat. Mana yang lebih berat dengan neraca/pegang."
    },
    {
      "ikon": "🌍",
      "nama": "Satuan Tak Baku Berat",
      "isi": "Pakai benda acuan sebelum satuan baku.",
      "suara": "Satuan Tak Baku Berat. Pakai benda acuan sebelum satuan baku."
    },
    {
      "ikon": "🌍",
      "nama": "Lebih Berat Lebih Ringan",
      "isi": "Bahasa banding untuk berat.",
      "suara": "Lebih Berat Lebih Ringan. Bahasa banding untuk berat."
    }
  ],
  "poinSuara": "Ingat: Banding Berat, Satuan Tak Baku Berat, Lebih Berat Lebih Ringan.",
  "cara": {
    "suara": "Cara menyebutkan. Semangka lebih berat dari apel. Sebut benda pertama, kata perbandingan, lalu benda yang dibandingkan.",
    "potongan": [
      {
        "teks": "Benda",
        "warna": "#FFFFFF"
      },
      {
        "teks": "kata perbandingan",
        "warna": "#FFE566"
      },
      {
        "teks": "dari",
        "warna": "#FFFFFF"
      },
      {
        "teks": "benda lain",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Banding Berat pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Banding Berat membantumu memahami soal?",
    "Kapan kamu memakai Satuan Tak Baku Berat?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Compare Mass",
      "namaId": "Banding Berat",
      "asal": "Measurement",
      "ringkas": "Mana yang lebih berat dengan neraca/pegang.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Nonstandard Mass",
      "namaId": "Satuan Tak Baku Berat",
      "asal": "Measurement progression",
      "ringkas": "Pakai benda acuan sebelum satuan baku.",
      "tahap": [
        "Mind",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Heavier Lighter",
      "namaId": "Lebih Berat Lebih Ringan",
      "asal": "Comparative language",
      "ringkas": "Bahasa banding untuk berat.",
      "tahap": [
        "Abstract",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B6: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Waktu)",
  "fullTitle": "Sub-Bab B: Waktu",
  "targetDescription": "Siswa membaca dan menunjukkan pukul tepat pada jam analog dengan jarum pendek (jam) dan jarum panjang (menit), mengenal jam digital, mengelompokkan kegiatan sehari-hari menurut pagi, siang, sore, dan malam, mengurutkan kegiatan menurut waktunya, serta membandingkan dua kegiatan dengan kata lebih lama dan lebih sebentar. Siswa memakai cara Membaca Jam, Lama Kegiatan, Urutan Waktu Sehari.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar waktu. Jam membantu kita mengetahui waktu sehari-hari. Kita belajar membaca jam analog, yaitu jarum pendek menunjukkan jam dan jarum panjang menunjukkan menit. Kita juga mengenal jam digital. Kita mengikuti kegiatan Tika dari pagi sampai malam, lalu membandingkan kegiatan yang lebih lama dan yang lebih sebentar, seperti berolahraga dan mandi. Kita memakai cara dari luar buku: Membaca Jam (Clock Reading); Lama Kegiatan (Duration Sense); Urutan Waktu Sehari (Day Sequence). Jarum pendek jam, jarum panjang menit. Perkirakan lama suatu kegiatan. Pagi–siang–sore–malam. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa membaca jam tepat pada jam analog, mengenal jam digital, menunjukkan kegiatan menurut pagi, siang, sore, dan malam, mengurutkan kegiatan, serta membandingkan lama kegiatan dengan kata lebih lama dan lebih sebentar.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 6 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K2B6B-V1",
      "judul": "Jam dan Jarumnya",
      "subjudul": "Clock Reading",
      "adegan": [
        {
          "id": "K2B6B-V1-1",
          "judul": "Bagian-bagian jam",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Jam membantu kita mengetahui waktu sehari-hari. Mari kita pahami bersama.",
            "Jam analog mempunyai jarum pendek, jarum panjang, dan angka satu sampai dua belas.",
            "Jam digital menunjukkan waktu dengan angka, misalnya nol lima titik nol nol.",
            "Ingat cara Membaca Jam: Jarum pendek jam, jarum panjang menit."
          ],
          "papan": [
            "Jam membantu kita",
            "Jam analog",
            "Jam digital 05.00",
            "membaca"
          ]
        },
        {
          "id": "K2B6B-V1-2",
          "judul": "Pukul lima tepat",
          "ketukan": [
            "Jarum pendek menunjukkan jam. Mari kita pahami bersama.",
            "Jarum panjang menunjukkan menit. Mari kita pahami bersama.",
            "Jarum pendek di angka lima dan jarum panjang di angka dua belas menunjukkan pukul lima tepat.",
            "Di sini kita memakai ide Clock Reading — Jarum pendek jam, jarum panjang menit."
          ],
          "papan": [
            "Pendek: jam",
            "Panjang: menit",
            "Pukul 5 tepat",
            "Halim bangun pukul 5"
          ]
        },
        {
          "id": "K2B6B-V1-3",
          "judul": "Membaca pukul tepat",
          "ketukan": [
            "Kalau jarum panjang di angka dua belas, kita membaca jam dari jarum pendek.",
            "Jarum pendek di angka enam, berarti pukul enam. Mari kita pahami bersama.",
            "Jarum pendek di angka tujuh, berarti pukul tujuh. Mari kita pahami bersama.",
            "METODE LUAR · Membaca Jam: Jarum pendek jam, jarum panjang menit."
          ],
          "papan": [
            "Panjang di angka 12",
            "Pukul 6",
            "Pukul 7",
            "Pukul 12 tepat"
          ]
        }
      ]
    },
    {
      "id": "K2B6B-V2",
      "judul": "Latihan: Lama Kegiatan",
      "subjudul": "Duration Sense",
      "adegan": [
        {
          "id": "K2B6B-V2-1",
          "judul": "Pagi hari",
          "ketukan": [
            "Tika sarapan pukul enam pagi. Mari kita pahami bersama.",
            "Tika dan teman-teman belajar di sekolah mulai pukul tujuh pagi. Mari kita pahami bersama.",
            "Pagi hari adalah waktu saat matahari baru terbit, dan kita bersiap berangkat sekolah.",
            "Ingat cara Lama Kegiatan: Perkirakan lama suatu kegiatan."
          ],
          "papan": [
            "Sarapan pukul 6",
            "Sekolah pukul 7",
            "Matahari terbit",
            "lama"
          ]
        },
        {
          "id": "K2B6B-V2-2",
          "judul": "Siang dan sore",
          "ketukan": [
            "Tika dan teman-teman makan di kantin pukul dua belas siang. Mari kita pahami bersama.",
            "Siang hari matahari berada paling tinggi di langit. Mari kita pahami bersama.",
            "Tika bermain bersama adik pukul empat sore. Mari kita pahami bersama.",
            "Di sini kita memakai ide Duration Sense — Perkirakan lama suatu kegiatan."
          ],
          "papan": [
            "Kantin pukul 12",
            "Siang: matahari tinggi",
            "Bermain pukul 4",
            "Sore: matahari turun"
          ]
        },
        {
          "id": "K2B6B-V2-3",
          "judul": "Malam hari",
          "ketukan": [
            "Tika tidur sejak pukul sembilan malam. Mari kita pahami bersama.",
            "Malam hari langit gelap, dan kita beristirahat. Mari kita pahami bersama.",
            "Satu hari terdiri dari pagi, siang, sore, dan malam. Mari kita pahami bersama.",
            "METODE LUAR · Lama Kegiatan: Perkirakan lama suatu kegiatan."
          ],
          "papan": [
            "Tidur pukul 9",
            "Langit gelap",
            "Pagi, siang, sore, malam",
            "Waktu yang tepat"
          ]
        }
      ]
    },
    {
      "id": "K2B6B-V3",
      "judul": "Siap pakai Day Sequence",
      "subjudul": "Day Sequence",
      "adegan": [
        {
          "id": "K2B6B-V3-1",
          "judul": "Kira berolahraga",
          "ketukan": [
            "Sekarang hari Minggu. Setiap hari Minggu, Kira selalu berolahraga. Mari kita pahami bersama.",
            "Ia berlari mengelilingi taman dekat rumahnya. Mari kita pahami bersama.",
            "Kira berolahraga mulai pukul enam sampai pukul tujuh pagi. Mari kita pahami bersama.",
            "Ingat cara Urutan Waktu Sehari: Pagi–siang–sore–malam."
          ],
          "papan": [
            "Hari Minggu",
            "Lari di taman",
            "Pukul 6 sampai 7",
            "Mandi agar segar"
          ]
        },
        {
          "id": "K2B6B-V3-2",
          "judul": "Lebih lama atau lebih sebentar?",
          "ketukan": [
            "Manakah kegiatan yang lebih lama? Berolahraga atau mandi. Mari kita pahami bersama.",
            "Kira berolahraga satu jam, sedangkan mandinya hanya lima belas menit. Mari kita pahami bersama.",
            "Berolahraga lebih lama dari mandi. Mari kita pahami bersama.",
            "Di sini kita memakai ide Day Sequence — Pagi–siang–sore–malam."
          ],
          "papan": [
            "Olahraga atau mandi?",
            "1 jam dan 15 menit",
            "Olahraga lebih lama",
            "Mandi lebih sebentar"
          ]
        },
        {
          "id": "K2B6B-V3-3",
          "judul": "Membandingkan waktu",
          "ketukan": [
            "Kita dapat membandingkan waktu dua kegiatan. Mari kita pahami bersama.",
            "Kita memakai kata lebih lama dan lebih sebentar. Mari kita pahami bersama.",
            "Tidur malam lebih lama dari menyikat gigi. Mari kita pahami bersama.",
            "METODE LUAR · Urutan Waktu Sehari: Pagi–siang–sore–malam."
          ],
          "papan": [
            "Bandingkan waktu",
            "Lebih lama, lebih sebentar",
            "Tidur lebih lama",
            "Cuci tangan sebentar"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Waktu. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Clock Reading",
      "stepDesc": "Jarum pendek jam, jarum panjang menit.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Duration Sense",
      "stepDesc": "Perkirakan lama suatu kegiatan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Day Sequence",
      "stepDesc": "Pagi–siang–sore–malam.",
      "icon": "✨",
      "flowFrom": "3",
      "flowTo": "5"
    },
    {
      "stepNumber": 5,
      "stepTitle": "5. Kerjakan",
      "stepDesc": "Terapkan cara itu pada angka atau gambar soal.",
      "icon": "✏️",
      "flowFrom": "4",
      "flowTo": "6"
    },
    {
      "stepNumber": 6,
      "stepTitle": "6. Cek masuk akal",
      "stepDesc": "Apakah hasilnya masuk akal? Bandingkan dengan perkiraan.",
      "icon": "✅",
      "flowFrom": "5",
      "flowTo": "7"
    },
    {
      "stepNumber": 7,
      "stepTitle": "7. Simpulkan",
      "stepDesc": "Ulangi ide utamanya dengan kalimatmu sendiri.",
      "icon": "💬",
      "flowFrom": "6",
      "flowTo": "8"
    },
    {
      "stepNumber": 8,
      "stepTitle": "8. Lanjut main",
      "stepDesc": "Siap melatih di permainan Concrete sampai Abstract.",
      "icon": "🎮",
      "flowFrom": "7",
      "flowTo": "END"
    }
  ],
  "infografis": [
    {
      "judul": "Bagian Jam Analog",
      "emoji": "⏰",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Jam analog punya tiga bagian penting: jarum pendek, jarum panjang, dan angka satu sampai dua belas."
    },
    {
      "judul": "Jarum Pendek dan Panjang",
      "emoji": "🕐",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Jarum pendek menunjukkan jam. Jarum panjang menunjukkan menit."
    },
    {
      "judul": "Pukul Tepat",
      "emoji": "🕔",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Pukul tepat artinya jarum panjang di angka dua belas, dan jarum pendek menunjukkan jamnya. Jarum pendek di angka lima berarti pukul lima tepat."
    },
    {
      "judul": "Jam Analog dan Digital",
      "emoji": "🔢",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Jam analog memakai jarum, dan jam digital memakai angka. Pukul lima tepat ditulis nol lima titik nol nol."
    },
    {
      "judul": "Empat Bagian Hari",
      "emoji": "🌅",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Satu hari terdiri dari empat bagian: pagi, siang, sore, dan malam."
    },
    {
      "judul": "Kegiatan Tika",
      "emoji": "📅",
      "countNum": 5,
      "countWord": "Lima",
      "suara": "Tika sarapan pukul enam pagi, belajar pukul tujuh pagi, makan di kantin pukul dua belas siang, bermain pukul empat sore, dan tidur pukul sembilan malam."
    },
    {
      "judul": "Waktu dan Bagian Hari",
      "emoji": "🌤️",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Pada jam digital dua puluh empat jam, nol enam titik nol nol dan nol tujuh titik nol nol termasuk pagi. Dua belas titik nol nol termasuk siang. Enam belas titik nol nol, yaitu pukul empat sore, termasuk sore. Dua puluh satu titik nol nol, yaitu pukul sembilan malam, termasuk malam."
    },
    {
      "judul": "Lebih Lama, Lebih Sebentar",
      "emoji": "⏳",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Berolahraga lebih lama dari mandi. Mandi lebih sebentar dari berolahraga. Dua kata ini membandingkan lamanya kegiatan."
    },
    {
      "judul": "Lama Beberapa Kegiatan",
      "emoji": "⌛",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Mencuci tangan hanya sekitar satu menit. Mandi sekitar lima belas menit. Berolahraga satu jam. Tidur malam sekitar delapan jam."
    },
    {
      "judul": "Jarum Bergerak Satu Jam",
      "emoji": "🗓️",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Dari pukul enam sampai pukul tujuh, jarum pendek bergerak satu jam. Kira berolahraga selama satu jam."
    },
    {
      "judul": "Membaca Jam",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Jarum pendek jam, jarum panjang menit."
    },
    {
      "judul": "Lama Kegiatan",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Perkirakan lama suatu kegiatan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "read-clock-concrete",
      "title": "Pukul Berapa?",
      "bookReference": "hlm. 178 dan 183 (Halim bangun tidur; tulis waktu yang sesuai dengan kegiatan)",
      "objective": "Pakai Membaca Jam: Jarum pendek jam, jarum panjang menit. Latihan: Membaca pukul tepat pada model jam dinding..",
      "mechanicDescription": "Empat ronde, tiap ronde tiga jam dinding berbeda, misalnya pukul enam, tujuh, dan dua belas. Siswa memilih pukul yang tepat dari tiga pilihan. Pilihan lain berupa jam sebelum dan sesudahnya, sehingga siswa harus melihat jarum pendek dengan teliti. Saat bermain, terapkan Clock Reading: Jarum pendek jam, jarum panjang menit.",
      "voiceGuide": "Membaca Jam. Jarum pendek jam, jarum panjang menit.",
      "emoji": "⏰",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "set-clock-hands",
      "title": "Putar Jarum Jam",
      "bookReference": "hlm. 181 dan 183 (gambarkan jarum jam yang sesuai dengan cerita)",
      "objective": "Pakai Membaca Jam: Jarum pendek jam, jarum panjang menit. Latihan: Mengarahkan jarum pendek jam dinding ke pukul yang diminta..",
      "mechanicDescription": "Empat ronde, tiap ronde tiga tugas, misalnya Tika sarapan pukul enam pagi. Siswa mengetuk angka di muka jam atau menekan tombol jam, lalu menekan Periksa. Jarum panjang tetap di angka dua belas. Saat bermain, terapkan Clock Reading: Jarum pendek jam, jarum panjang menit.",
      "voiceGuide": "Membaca Jam. Jarum pendek jam, jarum panjang menit.",
      "emoji": "🕕",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "sort-activities-day-parts",
      "title": "Pilah Kegiatan Menurut Bagian Hari",
      "bookReference": "hlm. 179–181 dan 184 (kegiatan pagi, siang, sore, malam)",
      "objective": "Pakai Membaca Jam: Jarum pendek jam, jarum panjang menit. Latihan: Memilah kegiatan sehari-hari ke pagi, siang, sore, dan malam..",
      "mechanicDescription": "Tiga ronde, tiap ronde enam kartu kegiatan dengan waktunya, misalnya sarapan pukul enam. Siswa menyeret atau mengetuk kartu ke kotak Pagi, Siang, Sore, atau Malam. Kunci dihitung dari jam kegiatan. Saat bermain, terapkan Clock Reading: Jarum pendek jam, jarum panjang menit.",
      "voiceGuide": "Membaca Jam. Jarum pendek jam, jarum panjang menit.",
      "emoji": "🌤️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "match-activity-clock",
      "title": "Jodohkan Kegiatan dan Jam",
      "bookReference": "hlm. 183–184 (tulis waktu yang sesuai dengan kegiatan; tarik garis waktu kegiatan)",
      "objective": "Pakai Membaca Jam: Jarum pendek jam, jarum panjang menit. Latihan: Menjodohkan kegiatan dengan jam yang menunjukkan waktunya..",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kegiatan dan empat jam dinding. Siswa mengetuk kegiatan, lalu mengetuk jam yang cocok. Muka jam tiap ronde berbeda sehingga hanya satu pasangan yang cocok. Saat bermain, terapkan Clock Reading: Jarum pendek jam, jarum panjang menit.",
      "voiceGuide": "Membaca Jam. Jarum pendek jam, jarum panjang menit.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "which-takes-longer",
      "title": "Mana Lebih Lama?",
      "bookReference": "hlm. 182 dan 185–186 (beri tanda centang pada kegiatan yang lebih lama)",
      "objective": "Menentukan kegiatan yang lebih lama atau lebih sebentar dari dua kegiatan.. Ingat Membaca Jam.",
      "mechanicDescription": "Empat ronde, tiap ronde dua pasang kegiatan, misalnya menyisir rambut dan mandi, tidur malam dan menyikat gigi. Siswa mengetuk kegiatan yang lebih lama atau yang lebih sebentar. Petunjuk salah memberi lama kegiatan secara singkat. Gunakan Membaca Jam.",
      "voiceGuide": "Membaca Jam. Ketuk kegiatan yang lebih lama atau lebih sebentar.",
      "emoji": "⏳",
      "targetCount": 8
    },
    {
      "stage": "Concrete",
      "gameType": "order-my-day",
      "title": "Urutkan Hariku",
      "bookReference": "hlm. 186 (urutkan gambar sesuai dengan waktu kegiatan)",
      "objective": "Mengurutkan kegiatan menurut waktunya, dari yang paling awal.. Ingat Membaca Jam.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kegiatan dari pagi sampai malam. Siswa mengetuk kegiatan satu per satu dari yang paling awal. Kegiatan yang salah memberi petunjuk jamnya. Gunakan Membaca Jam.",
      "voiceGuide": "Membaca Jam. Ketuk kegiatan dari yang paling awal.",
      "emoji": "📅",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "day-timeline-place",
      "title": "Garis Waktu Hariku",
      "bookReference": "hlm. 181 dan 189 (kegiatan pagi, siang, sore, dan malam; Ayo Berkarya)",
      "objective": "Menaruh satu kegiatan pada tiap bagian hari di garis waktu.. Ingat Membaca Jam.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat kegiatan dan empat tempat: pagi, siang, sore, malam. Siswa mengetuk kegiatan lalu mengetuk tempatnya. Setiap tempat menerima satu kegiatan. Gunakan Membaca Jam.",
      "voiceGuide": "Membaca Jam. Ketuk kegiatan, lalu ketuk bagian harinya.",
      "emoji": "🗓️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "memory-activity-clock",
      "title": "Memori Kegiatan dan Jam",
      "bookReference": "hlm. 179–181 (kegiatan Tika dan jamnya)",
      "objective": "Mencocokkan kartu kegiatan dengan kartu jam yang menunjukkan waktunya.. Ingat Membaca Jam.",
      "mechanicDescription": "Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu. Pasangan yang cocok tetap terbuka, yang tidak cocok kembali tertutup. Pasangan berupa kegiatan dan jam dinding. Gunakan Membaca Jam.",
      "voiceGuide": "Membaca Jam. Balik dua kartu, cari kegiatan dan jamnya.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "clock-forward-hours",
      "title": "Majukan Jam",
      "bookReference": "hlm. 182 (Kira berolahraga mulai pukul 6 sampai pukul 7)",
      "objective": "Memajukan jam satu jam setiap ketukan dan menghitung lamanya kegiatan.. Ingat Membaca Jam.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua cerita, misalnya Kira berolahraga pukul enam sampai pukul tujuh. Siswa menekan Maju 1 jam sampai jam selesai, lalu memilih berapa jam yang sudah berlalu. Siswa boleh mengulang dari awal. Gunakan Membaca Jam.",
      "voiceGuide": "Membaca Jam. Majukan jam, lalu hitung berapa jamnya.",
      "emoji": "▶️",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "find-clock-on-wall",
      "title": "Temukan Jam di Dinding",
      "bookReference": "hlm. 178–181 (membaca pukul tepat pada beberapa jam)",
      "objective": "Menemukan jam yang menunjukkan pukul tertentu di antara empat jam.. Ingat Membaca Jam.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat jam dinding dan dua pertanyaan, misalnya ketuk jam yang menunjukkan pukul enam. Siswa mengetuk jam yang tepat. Gunakan Membaca Jam.",
      "voiceGuide": "Membaca Jam. Ketuk jam yang menunjukkan pukul yang diminta.",
      "emoji": "🖼️",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "read-digital-from-diagram",
      "title": "Baca Jam Digital dari Gambar",
      "bookReference": "hlm. 178 (jam analog dan jam digital)",
      "objective": "Pakai Lama Kegiatan: Perkirakan lama suatu kegiatan. Latihan: Menuliskan pukul tepat pada diagram jam dalam bentuk jam digital..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga diagram jam. Siswa memilih jam digital yang sama, misalnya nol enam titik nol nol. Dua pilihan lain berupa jam sebelum dan sesudahnya. Saat bermain, terapkan Duration Sense: Perkirakan lama suatu kegiatan.",
      "voiceGuide": "Lama Kegiatan. Perkirakan lama suatu kegiatan.",
      "diagramType": "clock-to-digital",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "draw-clock-hands-digital",
      "title": "Gambar Jarum Jam",
      "bookReference": "hlm. 181 dan 183 (gambarkan jarum jam sesuai cerita)",
      "objective": "Pakai Lama Kegiatan: Perkirakan lama suatu kegiatan. Latihan: Mengarahkan jarum pendek diagram jam ke pukul yang ditulis sebagai jam digital..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga jam digital, misalnya 09.00. Siswa mengetuk angka di muka jam atau memakai tombol jam, lalu menekan Periksa. Saat bermain, terapkan Duration Sense: Perkirakan lama suatu kegiatan.",
      "voiceGuide": "Lama Kegiatan. Perkirakan lama suatu kegiatan.",
      "diagramType": "digital-to-clock",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "bar-model-duration",
      "title": "Batang Lama Kegiatan",
      "bookReference": "hlm. 182 dan 185–186 (lebih lama dan lebih sebentar) dalam model batang",
      "objective": "Pakai Lama Kegiatan: Perkirakan lama suatu kegiatan. Latihan: Membaca batang lama kegiatan dan menemukan yang paling lama dan paling sebentar..",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga sampai empat batang berhuruf, satu kotak sama dengan satu jam. Siswa mengetuk batang yang paling lama dan batang yang paling sebentar. Saat bermain, terapkan Duration Sense: Perkirakan lama suatu kegiatan.",
      "voiceGuide": "Lama Kegiatan. Perkirakan lama suatu kegiatan.",
      "diagramType": "bar-duration",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "match-clock-digital",
      "title": "Jodohkan Jam dan Angka Digital",
      "bookReference": "hlm. 178 (jam analog dan jam digital)",
      "objective": "Pakai Lama Kegiatan: Perkirakan lama suatu kegiatan. Latihan: Menjodohkan diagram jam dengan jam digitalnya..",
      "mechanicDescription": "Tiga ronde, tiap ronde empat diagram jam dan empat jam digital. Siswa mengetuk diagram jam, lalu mengetuk jam digital yang cocok. Saat bermain, terapkan Duration Sense: Perkirakan lama suatu kegiatan.",
      "voiceGuide": "Lama Kegiatan. Perkirakan lama suatu kegiatan.",
      "diagramType": "clock-digital-match",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "order-clock-diagrams",
      "title": "Urutkan Gambar Jam",
      "bookReference": "hlm. 186 (urutkan gambar sesuai dengan waktu kegiatan)",
      "objective": "Mengurutkan diagram jam menurut waktunya dalam satu hari.. Ingat Lama Kegiatan.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat diagram jam dengan keterangan pagi, siang, sore, atau malam. Siswa mengetuk diagram dari waktu yang paling awal dalam satu hari. Gunakan Lama Kegiatan.",
      "voiceGuide": "Lama Kegiatan. Ketuk jam dari waktu yang paling awal.",
      "diagramType": "clock-order",
      "numberA": 3,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-clock-day-parts",
      "title": "Pilah Jam ke Bagian Hari",
      "bookReference": "hlm. 188–189 (kelompokkan waktu kegiatan: pagi, sore, malam)",
      "objective": "Memilah diagram jam menurut pagi, siang, sore, dan malam.. Ingat Lama Kegiatan.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam diagram jam dengan jam digital 24 jam. Siswa menyeret atau mengetuk diagram ke kotak Pagi, Siang, Sore, atau Malam. Gunakan Lama Kegiatan.",
      "voiceGuide": "Lama Kegiatan. Pilah jam ke bagian hari yang tepat.",
      "diagramType": "clock-sort",
      "numberA": 3,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "count-hour-blocks",
      "title": "Hitung Kotak Jam",
      "bookReference": "hlm. 182 (mulai pukul 6 sampai pukul 7) pada jalur jam",
      "objective": "Menghitung banyak jam dari kotak pada jalur jam.. Ingat Lama Kegiatan.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua jalur jam. Tiap kotak satu jam. Siswa menghitung kotak dari pukul mulai sampai pukul selesai, lalu memilih banyaknya jam. Gunakan Lama Kegiatan.",
      "voiceGuide": "Lama Kegiatan. Hitung kotak jam dari mulai sampai selesai.",
      "diagramType": "hour-track",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "fill-clock-table",
      "title": "Tabel Jam dan Bagian Hari",
      "bookReference": "hlm. 184 dan 188–189 (tarik garis waktu kegiatan; kelompokkan waktu)",
      "objective": "Mengisi tabel jam digital dan bagian harinya.. Ingat Lama Kegiatan.",
      "mechanicDescription": "Dua ronde dengan tabel berisi empat baris. Siswa mengetuk baris, lalu mengetuk kartu pagi, siang, sore, atau malam yang tepat. Gunakan Lama Kegiatan.",
      "voiceGuide": "Lama Kegiatan. Isi tabel dengan kartu bagian hari.",
      "diagramType": "table-day-part",
      "numberA": 2,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "tally-hours",
      "title": "Goresan Jam",
      "bookReference": "hlm. 182 (lama kegiatan dalam jam) dalam goresan tally",
      "objective": "Menuliskan lama kegiatan dalam jam sebagai goresan tally.. Ingat Lama Kegiatan.",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal, misalnya dari pukul 6 sampai pukul 9. Siswa menekan Goresan sebanyak jam yang berlalu, lalu menekan Periksa. Setiap lima goresan dikelompokkan. Gunakan Lama Kegiatan.",
      "voiceGuide": "Lama Kegiatan. Tambah goresan sebanyak jamnya.",
      "diagramType": "tally-hours",
      "numberA": 3,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "number-line-hours",
      "title": "Garis Angka Jam",
      "bookReference": "hlm. 178 (angka satu sampai dua belas pada jam)",
      "objective": "Menandai angka jam pada garis angka satu sampai dua belas.. Ingat Lama Kegiatan.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal, misalnya tandai angka yang ditunjuk jarum pendek pada pukul enam. Siswa mengetuk bulatan angka yang tepat. Gunakan Lama Kegiatan.",
      "voiceGuide": "Lama Kegiatan. Ketuk angka jam pada garis.",
      "diagramType": "number-line-12",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Abstract",
      "gameType": "complete-time-sentences",
      "title": "Lengkapi Kalimat Waktu",
      "bookReference": "hlm. 179–183 (kegiatan Tika; Olahraga Minggu)",
      "objective": "Pakai Urutan Waktu Sehari: Pagi–siang–sore–malam. Latihan: Melengkapi kalimat waktu dengan bagian hari atau kata lebih lama dan lebih sebentar..",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat, misalnya Tika sarapan pukul 6 ... Siswa memilih satu dari tiga kata. Kalimat yang lengkap dibacakan Suara Guru. Saat bermain, terapkan Day Sequence: Pagi–siang–sore–malam.",
      "voiceGuide": "Urutan Waktu Sehari. Pagi–siang–sore–malam.",
      "symbolLarge": "06.00",
      "wordLarge": "PAGI SIANG",
      "mathNotation": "pagi • siang • sore • malam"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-time",
      "title": "Benar atau Salah: Waktu",
      "bookReference": "hlm. 178–186 (jam, bagian hari, lama kegiatan)",
      "objective": "Pakai Urutan Waktu Sehari: Pagi–siang–sore–malam. Latihan: Menilai pernyataan tentang jam, bagian hari, dan lama kegiatan..",
      "mechanicDescription": "Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Pernyataan tentang lama dan bagian hari dihitung dari data kegiatan. Setiap jawaban diberi penjelasan singkat. Saat bermain, terapkan Day Sequence: Pagi–siang–sore–malam.",
      "voiceGuide": "Urutan Waktu Sehari. Pagi–siang–sore–malam.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "periksa dengan alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "build-time-sentence",
      "title": "Susun Kalimat Waktu",
      "bookReference": "hlm. 178–182 (kalimat tentang jam dan kegiatan)",
      "objective": "Pakai Urutan Waktu Sehari: Pagi–siang–sore–malam. Latihan: Menyusun kata menjadi kalimat tentang waktu..",
      "mechanicDescription": "Empat kalimat. Kartu kata diketuk berurutan. Satu kartu pengecoh tidak dipakai. Kalimat yang benar dibacakan. Saat bermain, terapkan Day Sequence: Pagi–siang–sore–malam.",
      "voiceGuide": "Urutan Waktu Sehari. Pagi–siang–sore–malam.",
      "symbolLarge": "Aa",
      "wordLarge": "SUSUN KATA",
      "mathNotation": "kata • kalimat • makna"
    },
    {
      "stage": "Abstract",
      "gameType": "hours-between",
      "title": "Hitung Berapa Jam",
      "bookReference": "hlm. 182 (mulai pukul 6 sampai pukul 7)",
      "objective": "Pakai Urutan Waktu Sehari: Pagi–siang–sore–malam. Latihan: Menghitung lama kegiatan dari pukul mulai sampai pukul selesai..",
      "mechanicDescription": "Tiga ronde, tiap ronde dua soal cerita, misalnya Tika belajar mulai pukul 7 sampai pukul 12. Siswa memilih satu dari tiga angka. Kunci dihitung dari jam mulai dan jam selesai. Saat bermain, terapkan Day Sequence: Pagi–siang–sore–malam.",
      "voiceGuide": "Urutan Waktu Sehari. Pagi–siang–sore–malam.",
      "symbolLarge": "7 → 12",
      "wordLarge": "BERAPA JAM",
      "mathNotation": "selesai kurang mulai"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-activity-table",
      "title": "Tabel Kegiatan dan Bagian Hari",
      "bookReference": "hlm. 179–181 dan 184 (kegiatan Tika dan bagian harinya)",
      "objective": "Mengisi tabel kegiatan dan bagian harinya.. Ingat Urutan Waktu Sehari.",
      "mechanicDescription": "Dua ronde dengan tabel berisi empat baris, misalnya sarapan dengan pagi. Siswa mengetuk baris, lalu mengetuk kartu bagian hari. Kunci dihitung dari jam kegiatan. Gunakan Urutan Waktu Sehari.",
      "voiceGuide": "Urutan Waktu Sehari. Isi tabel dengan kartu bagian hari.",
      "symbolLarge": "A → B",
      "wordLarge": "TABEL",
      "mathNotation": "kegiatan • waktu • bagian hari"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-day-part",
      "title": "Pilih Bagian Hari",
      "bookReference": "hlm. 188–189 (kelompokkan waktu kegiatan)",
      "objective": "Menentukan bagian hari dari jam digital 24 jam.. Ingat Urutan Waktu Sehari.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga soal, misalnya pukul 07.00 termasuk pagi. Siswa memilih satu dari tiga bagian hari. Kunci dihitung dari jam digital. Gunakan Urutan Waktu Sehari.",
      "voiceGuide": "Urutan Waktu Sehari. Baca jam digitalnya, lalu pilih bagian harinya.",
      "symbolLarge": "07.00",
      "wordLarge": "BAGIAN HARI",
      "mathNotation": "pagi 04-10 • siang 11-14 • sore 15-17 • malam 18-03"
    },
    {
      "stage": "Abstract",
      "gameType": "riddle-time-clues",
      "title": "Detektif Waktu",
      "bookReference": "hlm. 179–183 (kegiatan dan waktunya)",
      "objective": "Menemukan kegiatan dari dua petunjuk waktu.. Ingat Urutan Waktu Sehari.",
      "mechanicDescription": "Empat soal. Siswa membaca dua petunjuk, misalnya aku terjadi di pagi hari dan jarum pendek ada di angka enam, lalu memilih satu dari tiga kegiatan. Hanya satu yang cocok dengan kedua petunjuk. Gunakan Urutan Waktu Sehari.",
      "voiceGuide": "Urutan Waktu Sehari. Baca semua petunjuk, lalu pilih kegiatannya.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu jawaban"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Waktu",
      "bookReference": "hlm. 156 (peta konsep pengukuran: waktu)",
      "objective": "Melengkapi peta konsep membaca jam dan waktu kegiatan.. Ingat Urutan Waktu Sehari.",
      "mechanicDescription": "Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Urutan Waktu Sehari.",
      "voiceGuide": "Urutan Waktu Sehari. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "⇄",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "jam • bagian hari • lama"
    },
    {
      "stage": "Abstract",
      "gameType": "order-digital-times",
      "title": "Urutkan Jam Digital",
      "bookReference": "hlm. 186 (urutkan menurut waktu kegiatan)",
      "objective": "Mengurutkan jam digital 24 jam dari yang paling awal.. Ingat Urutan Waktu Sehari.",
      "mechanicDescription": "Tiga ronde, tiap ronde empat jam digital. Siswa mengetuk jam dari yang paling awal sampai yang paling akhir dalam satu hari. Gunakan Urutan Waktu Sehari.",
      "voiceGuide": "Urutan Waktu Sehari. Ketuk jam dari yang paling awal.",
      "symbolLarge": "05.00 → 21.00",
      "wordLarge": "URUTKAN",
      "mathNotation": "angka kecil lebih awal"
    },
    {
      "stage": "Abstract",
      "gameType": "select-all-day-part",
      "title": "Ketuk Semua Jam yang Cocok",
      "bookReference": "hlm. 188–189 (kelompokkan waktu: pagi, sore, malam)",
      "objective": "Memilih semua jam digital yang termasuk satu bagian hari.. Ingat Urutan Waktu Sehari.",
      "mechanicDescription": "Tiga ronde, tiap ronde enam jam digital dan satu bagian hari (pagi, malam, lalu sore). Siswa mengetuk semua jam yang termasuk bagian hari itu, lalu menekan Periksa. Gunakan Urutan Waktu Sehari.",
      "voiceGuide": "Urutan Waktu Sehari. Ketuk semua jam yang cocok, lalu periksa.",
      "symbolLarge": "✔✔",
      "wordLarge": "SEMUA COCOK",
      "mathNotation": "boleh lebih dari satu"
    }
  ],
  "poin": [
    {
      "ikon": "🕐",
      "nama": "Dua jarum",
      "isi": "pendek: jam, panjang: menit",
      "suara": "Jarum pendek menunjukkan jam, dan jarum panjang menunjukkan menit."
    },
    {
      "ikon": "🕔",
      "nama": "Pukul tepat",
      "isi": "panjang di angka 12",
      "suara": "Pukul tepat artinya jarum panjang di angka dua belas, dan jarum pendek menunjukkan jamnya."
    },
    {
      "ikon": "🌍",
      "nama": "Membaca Jam",
      "isi": "Jarum pendek jam, jarum panjang menit.",
      "suara": "Membaca Jam. Jarum pendek jam, jarum panjang menit."
    },
    {
      "ikon": "🌍",
      "nama": "Lama Kegiatan",
      "isi": "Perkirakan lama suatu kegiatan.",
      "suara": "Lama Kegiatan. Perkirakan lama suatu kegiatan."
    },
    {
      "ikon": "🌍",
      "nama": "Urutan Waktu Sehari",
      "isi": "Pagi–siang–sore–malam.",
      "suara": "Urutan Waktu Sehari. Pagi–siang–sore–malam."
    }
  ],
  "poinSuara": "Ingat: Membaca Jam, Lama Kegiatan, Urutan Waktu Sehari.",
  "cara": {
    "suara": "Cara menyebutkan. Tika sarapan pukul enam pagi. Sebut kegiatan, kata pukul, jam, lalu bagian harinya.",
    "potongan": [
      {
        "teks": "Kegiatan",
        "warna": "#FFFFFF"
      },
      {
        "teks": "pukul",
        "warna": "#FFE566"
      },
      {
        "teks": "jam",
        "warna": "#FFFFFF"
      },
      {
        "teks": "bagian hari",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Membaca Jam pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Membaca Jam membantumu memahami soal?",
    "Kapan kamu memakai Lama Kegiatan?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Clock Reading",
      "namaId": "Membaca Jam",
      "asal": "Time pedagogy",
      "ringkas": "Jarum pendek jam, jarum panjang menit.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Duration Sense",
      "namaId": "Lama Kegiatan",
      "asal": "Time sense",
      "ringkas": "Perkirakan lama suatu kegiatan.",
      "tahap": [
        "Mind",
        "Infografis"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Day Sequence",
      "namaId": "Urutan Waktu Sehari",
      "asal": "Temporal order",
      "ringkas": "Pagi–siang–sore–malam.",
      "tahap": [
        "Abstract",
        "Story"
      ]
    }
  ]
};

export const SUB_BAB_K2B6: SubBabNaskah[] = [SUB_A6, SUB_B6];
export const semuaAdeganK2B6 = SUB_BAB_K2B6.flatMap((s) => s.videos.flatMap((v) => v.adegan));
