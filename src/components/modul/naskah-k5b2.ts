/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K5B2_META = {
  "chapterId": "k5-mat-bab2",
  "phaseCode": "FASE_C",
  "grade": 5,
  "subjectLabel": "MATEMATIKA - KELAS 5 SD",
  "title": "BAB 2: KPK DAN FPB",
  "silabusElemen": "🌈 Fase C • Elemen Bilangan: Kelipatan, KPK, Faktor, FPB, serta Faktorisasi Prima (Kelas 5 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A52: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Kelipatan)",
  "fullTitle": "Sub-Bab A: Kelipatan",
  "targetDescription": "Siswa memahami arti kelipatan, mengenal barisan kelipatan melalui permainan tepuk bilangan, serta menandai kelipatan pada tabel sesuai Buku Siswa Kelas V Bab 2. Siswa memakai cara Lompat Hitung, Tabel Seratus, Cek Habis Dibagi.",
  "secondaryBg": "#FFEDD5",
  "secondaryBorder": "#EA580C",
  "secondaryText": "#7C2D12",
  "silabus": {
    "teksSuara": "Kita belajar kelipatan. Kelipatan adalah hasil kali suatu bilangan dengan bilangan bulat positif. Kita bermain tepuk bilangan dan mewarnai tabel. Nol kali bilangan tidak dihitung sebagai kelipatan di buku ini. Kita memakai cara dari luar buku: Lompat Hitung (Skip Counting); Tabel Seratus (Hundred Chart); Cek Habis Dibagi (Divisibility Check). Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, … Tandai kelipatan pada tabel seratus untuk melihat pola. Angka adalah kelipatan jika habis dibagi bilangan itu. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan bilangan kelipatan suatu bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2: KPK dan FPB, Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K5B2A-V1",
      "judul": "Apa Itu Kelipatan",
      "subjudul": "Skip Counting",
      "adegan": [
        {
          "id": "K5B2A-V1-1",
          "judul": "Hasil kali",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ambil bilangan tiga. Mari kita pahami bersama.",
            "Kalikan satu, dua, tiga, dan seterusnya. Mari kita pahami bersama.",
            "Hasilnya tiga, enam, sembilan. Mari kita pahami bersama.",
            "Ingat cara Lompat Hitung: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …"
          ],
          "papan": [
            "×1",
            "×2",
            "×3",
            "kelipatan"
          ]
        },
        {
          "id": "K5B2A-V1-2",
          "judul": "Bukan nol",
          "ketukan": [
            "Nol dikali tiga hasilnya nol. Mari kita pahami bersama.",
            "Di buku ini nol tidak dihitung. Mari kita pahami bersama.",
            "Kita mulai dari satu kali. Mari kita pahami bersama.",
            "Di sini kita memakai ide Skip Counting — Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …"
          ],
          "papan": [
            "0×3",
            "tidak",
            "mulai 1×",
            "aturan"
          ]
        },
        {
          "id": "K5B2A-V1-3",
          "judul": "Cek cepat",
          "ketukan": [
            "Bagaimana mengecek. Mari kita pahami bersama.",
            "Bagi bilangan itu. Mari kita pahami bersama.",
            "Jika habis tanpa sisa, ya. Mari kita pahami bersama.",
            "METODE LUAR · Lompat Hitung: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …"
          ],
          "papan": [
            "bagi",
            "habis?",
            "ya",
            "bukan"
          ]
        }
      ]
    },
    {
      "id": "K5B2A-V2",
      "judul": "Latihan: Tabel Seratus",
      "subjudul": "Hundred Chart",
      "adegan": [
        {
          "id": "K5B2A-V2-1",
          "judul": "Aturan tepuk",
          "ketukan": [
            "Duduk melingkar. Mari kita pahami bersama.",
            "Sebut bilangan berurutan. Mari kita pahami bersama.",
            "Pada kelipatan tiga, bertepuk. Mari kita pahami bersama.",
            "Ingat cara Tabel Seratus: Tandai kelipatan pada tabel seratus untuk melihat pola."
          ],
          "papan": [
            "lingkaran",
            "sebut",
            "tepuk",
            "fokus"
          ]
        },
        {
          "id": "K5B2A-V2-2",
          "judul": "Contoh tiga",
          "ketukan": [
            "Tiga, enam, sembilan. Mari kita pahami bersama.",
            "Itu saatnya tepuk. Mari kita pahami bersama.",
            "Empat dan lima biasa disebut. Mari kita pahami bersama.",
            "Di sini kita memakai ide Hundred Chart — Tandai kelipatan pada tabel seratus untuk melihat pola."
          ],
          "papan": [
            "tepuk",
            "tabel",
            "tabel",
            "tabel"
          ]
        },
        {
          "id": "K5B2A-V2-3",
          "judul": "Ganti bilangan",
          "ketukan": [
            "Bisa kelipatan tujuh. Mari kita pahami bersama.",
            "Bisa kelipatan sembilan. Mari kita pahami bersama.",
            "Aturannya sama. Mari kita pahami bersama.",
            "METODE LUAR · Tabel Seratus: Tandai kelipatan pada tabel seratus untuk melihat pola."
          ],
          "papan": [
            "sama",
            "seru",
            "tabel",
            "tabel"
          ]
        }
      ]
    },
    {
      "id": "K5B2A-V3",
      "judul": "Siap pakai Divisibility Check",
      "subjudul": "Divisibility Check",
      "adegan": [
        {
          "id": "K5B2A-V3-1",
          "judul": "Tabel satu sampai lima puluh",
          "ketukan": [
            "Salin tabel. Mari kita pahami bersama.",
            "Cari kelipatan tiga. Mari kita pahami bersama.",
            "Warnai bilangannya. Mari kita pahami bersama.",
            "Ingat cara Cek Habis Dibagi: Angka adalah kelipatan jika habis dibagi bilangan itu."
          ],
          "papan": [
            "tabel",
            "cari",
            "warnai",
            "pola"
          ]
        },
        {
          "id": "K5B2A-V3-2",
          "judul": "Latihan tujuh dan sembilan",
          "ketukan": [
            "Ulang untuk tujuh. Mari kita pahami bersama.",
            "Ulang untuk sembilan. Mari kita pahami bersama.",
            "Tulis lima kelipatan enam. Mari kita pahami bersama.",
            "Di sini kita memakai ide Divisibility Check — Angka adalah kelipatan jika habis dibagi bilangan itu."
          ],
          "papan": [
            "langkah 1",
            "langkah 2",
            "langkah 3",
            "langkah 4"
          ]
        },
        {
          "id": "K5B2A-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Definisi sudah jelas. Mari kita pahami bersama.",
            "Tepuk dan tabel sudah siap. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Cek Habis Dibagi: Angka adalah kelipatan jika habis dibagi bilangan itu."
          ],
          "papan": [
            "arti",
            "latihan",
            "main",
            "semangat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Kelipatan. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Skip Counting",
      "stepDesc": "Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Hundred Chart",
      "stepDesc": "Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Divisibility Check",
      "stepDesc": "Angka adalah kelipatan jika habis dibagi bilangan itu.",
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
      "judul": "Arti",
      "emoji": "📖",
      "countNum": 1,
      "countWord": "hasil kali",
      "suara": "Kelipatan = hasil kali bilangan."
    },
    {
      "judul": "Contoh 3",
      "emoji": "3️⃣",
      "countNum": 3,
      "countWord": "3,6,9,…",
      "suara": "Kelipatan tiga."
    },
    {
      "judul": "Cek",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "bagi habis",
      "suara": "Tanpa sisa berarti ya."
    },
    {
      "judul": "Bukan 0",
      "emoji": "0️⃣",
      "countNum": 0,
      "countWord": "kecuali",
      "suara": "0×n tidak dihitung."
    },
    {
      "judul": "Tepuk",
      "emoji": "👏",
      "countNum": 1,
      "countWord": "permainan",
      "suara": "Tepuk pada kelipatan."
    },
    {
      "judul": "Tabel",
      "emoji": "▦",
      "countNum": 50,
      "countWord": "1–50",
      "suara": "Warnai kelipatan."
    },
    {
      "judul": "7",
      "emoji": "7️⃣",
      "countNum": 7,
      "countWord": "7,14,21,…",
      "suara": "Contoh kelipatan tujuh."
    },
    {
      "judul": "9",
      "emoji": "9️⃣",
      "countNum": 9,
      "countWord": "9,18,27,…",
      "suara": "Contoh kelipatan sembilan."
    },
    {
      "judul": "Pola",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "tambah n",
      "suara": "Barisan naik tetap."
    },
    {
      "judul": "Siap B",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "persekutuan",
      "suara": "Lanjut kelipatan persekutuan."
    },
    {
      "judul": "Lompat Hitung",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …"
    },
    {
      "judul": "Tabel Seratus",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Tandai kelipatan pada tabel seratus untuk melihat pola."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-kelipatan",
      "title": "Cek Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai Lompat Hitung: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, … Latihan: Mengenali kelipatan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Skip Counting: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "voiceGuide": "Lompat Hitung. Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "emoji": "👏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "lanjut-barisan",
      "title": "Lanjutkan Barisan",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai Lompat Hitung: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, … Latihan: Melanjutkan kelipatan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Skip Counting: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "voiceGuide": "Lompat Hitung. Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "emoji": "📶",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-kelipatan",
      "title": "Arti Kelipatan",
      "bookReference": "hlm. 35",
      "objective": "Pakai Lompat Hitung: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, … Latihan: Memahami definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Skip Counting: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "voiceGuide": "Lompat Hitung. Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-kelipatan",
      "title": "Pilah Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Pakai Lompat Hitung: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, … Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Skip Counting: Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "voiceGuide": "Lompat Hitung. Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kelipatan",
      "title": "Jodohkan Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Menjodohkan.. Ingat Lompat Hitung.",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kelipatan",
      "title": "Memori Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Memori.. Ingat Lompat Hitung.",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-kelipatan",
      "title": "Ketuk Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Mengetuk.. Ingat Lompat Hitung.",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kelipatan",
      "title": "Ketuk Semua Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Ketuk semua.. Ingat Lompat Hitung.",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-tepuk",
      "title": "Cerita Tepuk Bilangan",
      "bookReference": "hlm. 33–37",
      "objective": "Soal cerita.. Ingat Lompat Hitung.",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Pilih.",
      "emoji": "👏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kelipatan",
      "title": "Urutkan Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Mengurutkan.. Ingat Lompat Hitung.",
      "mechanicDescription": "Tiga ronde. Gunakan Lompat Hitung.",
      "voiceGuide": "Lompat Hitung. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "tabel-kelipatan",
      "title": "Tabel Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Pakai Tabel Seratus: Tandai kelipatan pada tabel seratus untuk melihat pola. Latihan: Baca tabel..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Chart: Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-lanjut",
      "title": "Diagram Barisan",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai Tabel Seratus: Tandai kelipatan pada tabel seratus untuk melihat pola. Latihan: Lanjut barisan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Chart: Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "diagramType": "seq",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-a",
      "title": "Jodohkan Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai Tabel Seratus: Tandai kelipatan pada tabel seratus untuk melihat pola. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Chart: Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-a",
      "title": "Memori Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai Tabel Seratus: Tandai kelipatan pada tabel seratus untuk melihat pola. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Hundred Chart: Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "voiceGuide": "Tabel Seratus. Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-a",
      "title": "Tabel Cek Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Isi tabel.. Ingat Tabel Seratus.",
      "mechanicDescription": "Tiga tabel. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pa",
      "title": "Ketuk Semua Diagram A",
      "bookReference": "hlm. 35–37",
      "objective": "Ketuk semua.. Ingat Tabel Seratus.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-a",
      "title": "Pilah Diagram A",
      "bookReference": "hlm. 35–37",
      "objective": "Pilah.. Ingat Tabel Seratus.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-a",
      "title": "Pilih Pernyataan A",
      "bookReference": "hlm. 33–37",
      "objective": "Pilih.. Ingat Tabel Seratus.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pa",
      "title": "Pilih Arti Diagram",
      "bookReference": "hlm. 35",
      "objective": "Definisi.. Ingat Tabel Seratus.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-a",
      "title": "Cerita Diagram A",
      "bookReference": "hlm. 33–37",
      "objective": "Cerita.. Ingat Tabel Seratus.",
      "mechanicDescription": "Tiga ronde. Gunakan Tabel Seratus.",
      "voiceGuide": "Tabel Seratus. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek",
      "title": "Tulis Cek Kelipatan",
      "bookReference": "hlm. 35–37",
      "objective": "Pakai Cek Habis Dibagi: Angka adalah kelipatan jika habis dibagi bilangan itu. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisibility Check: Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "voiceGuide": "Cek Habis Dibagi. Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "symbolLarge": "3×n",
      "wordLarge": "CEK",
      "mathNotation": "kelipatan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-lanjut",
      "title": "Tulis Lanjutan",
      "bookReference": "hlm. 33–37",
      "objective": "Pakai Cek Habis Dibagi: Angka adalah kelipatan jika habis dibagi bilangan itu. Latihan: Menulis lanjut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisibility Check: Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "voiceGuide": "Cek Habis Dibagi. Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "symbolLarge": "+n",
      "wordLarge": "LANJUT",
      "mathNotation": "barisan"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-a",
      "title": "Pilih Definisi",
      "bookReference": "hlm. 35",
      "objective": "Pakai Cek Habis Dibagi: Angka adalah kelipatan jika habis dibagi bilangan itu. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisibility Check: Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "voiceGuide": "Cek Habis Dibagi. Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-a",
      "title": "Urutkan Abstrak A",
      "bookReference": "hlm. 35–37",
      "objective": "Pakai Cek Habis Dibagi: Angka adalah kelipatan jika habis dibagi bilangan itu. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisibility Check: Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "voiceGuide": "Cek Habis Dibagi. Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-a",
      "title": "Jodohkan Notasi A",
      "bookReference": "hlm. 33–37",
      "objective": "Jodohkan.. Ingat Cek Habis Dibagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Jodohkan.",
      "symbolLarge": "×",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-a",
      "title": "Memori Notasi A",
      "bookReference": "hlm. 33–37",
      "objective": "Memori.. Ingat Cek Habis Dibagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Balik kartu.",
      "symbolLarge": "kel",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-a",
      "title": "Benar atau Salah: Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Menilai.. Ingat Cek Habis Dibagi.",
      "mechanicDescription": "Dua ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-a",
      "title": "Detektif Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Petunjuk.. Ingat Cek Habis Dibagi.",
      "mechanicDescription": "Tiga soal. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-a",
      "title": "Peta Konsep Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Peta.. Ingat Cek Habis Dibagi.",
      "mechanicDescription": "Satu peta. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-a",
      "title": "Cerita Angka Kelipatan",
      "bookReference": "hlm. 33–37",
      "objective": "Cerita.. Ingat Cek Habis Dibagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Cek Habis Dibagi.",
      "voiceGuide": "Cek Habis Dibagi. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✖️",
      "nama": "Kelipatan",
      "isi": "Hasil kali bilangan dengan bilangan bulat positif.",
      "suara": "Kelipatan adalah hasil kali."
    },
    {
      "ikon": "👏",
      "nama": "Tepuk",
      "isi": "Bertepuk saat bilangan kelipatan yang dipilih.",
      "suara": "Tepuk pada kelipatan."
    },
    {
      "ikon": "🌍",
      "nama": "Lompat Hitung",
      "isi": "Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "suara": "Lompat Hitung. Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …"
    },
    {
      "ikon": "🌍",
      "nama": "Tabel Seratus",
      "isi": "Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "suara": "Tabel Seratus. Tandai kelipatan pada tabel seratus untuk melihat pola."
    },
    {
      "ikon": "🌍",
      "nama": "Cek Habis Dibagi",
      "isi": "Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "suara": "Cek Habis Dibagi. Angka adalah kelipatan jika habis dibagi bilangan itu."
    }
  ],
  "poinSuara": "Ingat: Lompat Hitung, Tabel Seratus, Cek Habis Dibagi.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pilih bilangan",
        "warna": "#FDE68A"
      },
      {
        "teks": "buat daftar ×",
        "warna": "#BBF7D0"
      },
      {
        "teks": "cek bagi habis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "latih di tabel",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Lompat Hitung pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Lompat Hitung membantumu memahami soal?",
    "Kapan kamu memakai Tabel Seratus?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Skip Counting",
      "namaId": "Lompat Hitung",
      "asal": "Van de Walle",
      "ringkas": "Kelipatan didapat dengan melompat tetap: 3, 6, 9, 12, …",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Hundred Chart",
      "namaId": "Tabel Seratus",
      "asal": "Van de Walle",
      "ringkas": "Tandai kelipatan pada tabel seratus untuk melihat pola.",
      "tahap": [
        "Mind",
        "Infografis",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Divisibility Check",
      "namaId": "Cek Habis Dibagi",
      "asal": "Number sense",
      "ringkas": "Angka adalah kelipatan jika habis dibagi bilangan itu.",
      "tahap": [
        "Concrete",
        "Abstract"
      ]
    }
  ]
};

export const SUB_B52: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Kelipatan Persekutuan)",
  "fullTitle": "Sub-Bab B: Kelipatan Persekutuan dan KPK",
  "targetDescription": "Siswa menemukan kelipatan persekutuan dua bilangan atau lebih, menentukan KPK dengan daftar kelipatan, serta menerapkan KPK pada jadwal latihan bersama sesuai Buku Siswa Kelas V Bab 2. Siswa memakai cara Daftar Kelipatan Bersama, KPK dari Faktor Prima, Diagram Faktor.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar kelipatan persekutuan. Irisan daftar kelipatan dua bilangan disebut kelipatan persekutuan. Yang terkecil disebut KPK. KPK membantu mencari jadwal bertemu berikutnya, seperti latihan renang Nisa dan Yohana. Kita memakai cara dari luar buku: Daftar Kelipatan Bersama (LCM Listing); KPK dari Faktor Prima (Prime Factor KPK); Diagram Faktor (Venn Factors). Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK. Ambil faktor prima dengan pangkat tertinggi, lalu kalikan. Gabungan himpunan faktor prima membantu menemukan KPK. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan kelipatan persekutuan dan KPK dua atau lebih bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2: KPK dan FPB, Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K5B2B-V1",
      "judul": "Kelipatan Persekutuan",
      "subjudul": "LCM Listing",
      "adegan": [
        {
          "id": "K5B2B-V1-1",
          "judul": "Tepuk 2 dan 3",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Kelipatan dua: tepuk tangan. Mari kita pahami bersama.",
            "Kelipatan tiga: ucap hore. Mari kita pahami bersama.",
            "Jika keduanya, tepuk dan hore. Mari kita pahami bersama.",
            "Ingat cara Daftar Kelipatan Bersama: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK."
          ],
          "papan": [
            "tepuk",
            "hore",
            "keduanya",
            "irisan"
          ]
        },
        {
          "id": "K5B2B-V1-2",
          "judul": "Contoh enam",
          "ketukan": [
            "Enam, dua belas, delapan belas. Mari kita pahami bersama.",
            "Semua kelipatan dua dan tiga. Mari kita pahami bersama.",
            "Itu kelipatan persekutuan. Mari kita pahami bersama.",
            "Di sini kita memakai ide LCM Listing — Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK."
          ],
          "papan": [
            "12",
            "18",
            "sama",
            "daftar"
          ]
        },
        {
          "id": "K5B2B-V1-3",
          "judul": "Yang terkecil",
          "ketukan": [
            "Dari daftar yang sama. Mari kita pahami bersama.",
            "Ambil yang paling kecil. Mari kita pahami bersama.",
            "Itu KPK. Mari kita pahami bersama.",
            "METODE LUAR · Daftar Kelipatan Bersama: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK."
          ],
          "papan": [
            "daftar",
            "terkecil",
            "KPK",
            "nama"
          ]
        }
      ]
    },
    {
      "id": "K5B2B-V2",
      "judul": "Latihan: KPK dari Faktor Prima",
      "subjudul": "Prime Factor KPK",
      "adegan": [
        {
          "id": "K5B2B-V2-1",
          "judul": "Contoh 4 dan 5",
          "ketukan": [
            "Tulis kelipatan empat. Mari kita pahami bersama.",
            "Tulis kelipatan lima. Mari kita pahami bersama.",
            "Tandai yang sama. Mari kita pahami bersama.",
            "Ingat cara KPK dari Faktor Prima: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan."
          ],
          "papan": [
            "4,…",
            "5,…",
            "sama",
            "20"
          ]
        },
        {
          "id": "K5B2B-V2-2",
          "judul": "Langkah umum",
          "ketukan": [
            "Buat dua daftar. Mari kita pahami bersama.",
            "Cari irisan. Mari kita pahami bersama.",
            "Pilih terkecil. Mari kita pahami bersama.",
            "Di sini kita memakai ide Prime Factor KPK — Ambil faktor prima dengan pangkat tertinggi, lalu kalikan."
          ],
          "papan": [
            "daftar",
            "irisan",
            "min",
            "KPK"
          ]
        },
        {
          "id": "K5B2B-V2-3",
          "judul": "Tiga bilangan",
          "ketukan": [
            "Bisa tiga bilangan. Mari kita pahami bersama.",
            "Misal tiga, empat, lima. Mari kita pahami bersama.",
            "KPK-nya enam puluh. Mari kita pahami bersama.",
            "METODE LUAR · KPK dari Faktor Prima: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan."
          ],
          "papan": [
            "60",
            "kpk",
            "kpk",
            "kpk"
          ]
        }
      ]
    },
    {
      "id": "K5B2B-V3",
      "judul": "Siap pakai Venn Factors",
      "subjudul": "Venn Factors",
      "adegan": [
        {
          "id": "K5B2B-V3-1",
          "judul": "Nisa dan Yohana",
          "ketukan": [
            "Nisa tiap tiga hari. Mari kita pahami bersama.",
            "Yohana tiap empat hari. Mari kita pahami bersama.",
            "KPK dua belas hari. Mari kita pahami bersama.",
            "Ingat cara Diagram Faktor: Gabungan himpunan faktor prima membantu menemukan KPK."
          ],
          "papan": [
            "3 hari",
            "4 hari",
            "KPK 12",
            "bertemu"
          ]
        },
        {
          "id": "K5B2B-V3-2",
          "judul": "Tanggal",
          "ketukan": [
            "Mulai tiga Agustus. Mari kita pahami bersama.",
            "Tambah dua belas hari. Mari kita pahami bersama.",
            "Hasilnya lima belas Agustus. Mari kita pahami bersama.",
            "Di sini kita memakai ide Venn Factors — Gabungan himpunan faktor prima membantu menemukan KPK."
          ],
          "papan": [
            "3 Agu",
            "+12",
            "15 Agu",
            "terdekat"
          ]
        },
        {
          "id": "K5B2B-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Irisan sudah jelas. Mari kita pahami bersama.",
            "KPK dan jadwal siap. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Diagram Faktor: Gabungan himpunan faktor prima membantu menemukan KPK."
          ],
          "papan": [
            "irisan",
            "KPK",
            "main",
            "semangat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Kelipatan Persekutuan dan KPK. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. LCM Listing",
      "stepDesc": "Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Prime Factor KPK",
      "stepDesc": "Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Venn Factors",
      "stepDesc": "Gabungan himpunan faktor prima membantu menemukan KPK.",
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
      "judul": "Persekutuan",
      "emoji": "🤝",
      "countNum": 1,
      "countWord": "irisan",
      "suara": "Kelipatan yang sama."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1,
      "countWord": "terkecil",
      "suara": "Yang paling kecil."
    },
    {
      "judul": "4 & 5",
      "emoji": "🔢",
      "countNum": 20,
      "countWord": "KPK=20",
      "suara": "Contoh buku."
    },
    {
      "judul": "2 & 3",
      "emoji": "👏",
      "countNum": 6,
      "countWord": "KPK=6",
      "suara": "Tepuk dan hore."
    },
    {
      "judul": "3 & 4",
      "emoji": "🏊",
      "countNum": 12,
      "countWord": "renang",
      "suara": "Nisa dan Yohana."
    },
    {
      "judul": "Tanggal",
      "emoji": "📅",
      "countNum": 15,
      "countWord": "15 Agustus",
      "suara": "3 + 12 hari."
    },
    {
      "judul": "Cara",
      "emoji": "📋",
      "countNum": 1,
      "countWord": "daftar",
      "suara": "Tulis lalu tandai."
    },
    {
      "judul": "3 bilangan",
      "emoji": "3️⃣",
      "countNum": 60,
      "countWord": "3,4,5",
      "suara": "KPK=60."
    },
    {
      "judul": "Pakai",
      "emoji": "🕒",
      "countNum": 1,
      "countWord": "jadwal",
      "suara": "Waktu bertemu lagi."
    },
    {
      "judul": "Siap C",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "faktor",
      "suara": "Lanjut faktor."
    },
    {
      "judul": "Daftar Kelipatan Bersama",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK."
    },
    {
      "judul": "KPK dari Faktor Prima",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Ambil faktor prima dengan pangkat tertinggi, lalu kalikan."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-persekutuan",
      "title": "Cek Kelipatan Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Pakai Daftar Kelipatan Bersama: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK. Latihan: Mengenali irisan kelipatan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan LCM Listing: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "voiceGuide": "Daftar Kelipatan Bersama. Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "emoji": "🤝",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hitung-kpk",
      "title": "Hitung KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Pakai Daftar Kelipatan Bersama: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK. Latihan: Menemukan KPK..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan LCM Listing: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "voiceGuide": "Daftar Kelipatan Bersama. Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "emoji": "🎯",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "jadwal-kpk",
      "title": "Jadwal dengan KPK",
      "bookReference": "hlm. 41–42",
      "objective": "Pakai Daftar Kelipatan Bersama: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK. Latihan: Soal jadwal..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan LCM Listing: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "voiceGuide": "Daftar Kelipatan Bersama. Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "emoji": "📅",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-persekutuan",
      "title": "Pilah Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Pakai Daftar Kelipatan Bersama: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan LCM Listing: Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "voiceGuide": "Daftar Kelipatan Bersama. Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-kpk",
      "title": "Jodohkan KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Menjodohkan.. Ingat Daftar Kelipatan Bersama.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-kpk",
      "title": "Memori KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Memori.. Ingat Daftar Kelipatan Bersama.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-persekutuan",
      "title": "Ketuk Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Mengetuk.. Ingat Daftar Kelipatan Bersama.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-kpk",
      "title": "Ketuk Semua Benar KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Ketuk semua.. Ingat Daftar Kelipatan Bersama.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-renang",
      "title": "Cerita Latihan Renang",
      "bookReference": "hlm. 31–42",
      "objective": "Soal cerita.. Ingat Daftar Kelipatan Bersama.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Pilih.",
      "emoji": "🏊",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-kpk",
      "title": "Urutkan Hasil KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Mengurutkan.. Ingat Daftar Kelipatan Bersama.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Kelipatan Bersama.",
      "voiceGuide": "Daftar Kelipatan Bersama. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-persekutuan",
      "title": "Diagram Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Pakai KPK dari Faktor Prima: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan. Latihan: Baca irisan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor KPK: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "voiceGuide": "KPK dari Faktor Prima. Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "diagramType": "venn",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kpk",
      "title": "Diagram KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Pakai KPK dari Faktor Prima: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan. Latihan: Baca KPK..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor KPK: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "voiceGuide": "KPK dari Faktor Prima. Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "diagramType": "lcm",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-b",
      "title": "Jodohkan Diagram B",
      "bookReference": "hlm. 38–42",
      "objective": "Pakai KPK dari Faktor Prima: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor KPK: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "voiceGuide": "KPK dari Faktor Prima. Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-b",
      "title": "Memori Diagram B",
      "bookReference": "hlm. 38–42",
      "objective": "Pakai KPK dari Faktor Prima: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor KPK: Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "voiceGuide": "KPK dari Faktor Prima. Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-b",
      "title": "Tabel KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Isi tabel.. Ingat KPK dari Faktor Prima.",
      "mechanicDescription": "Tiga tabel. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Faktor Prima. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pb",
      "title": "Ketuk Semua Diagram B",
      "bookReference": "hlm. 38–42",
      "objective": "Ketuk semua.. Ingat KPK dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Faktor Prima. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-b",
      "title": "Pilah Diagram B",
      "bookReference": "hlm. 38–40",
      "objective": "Pilah.. Ingat KPK dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Faktor Prima. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "jadwal-pb",
      "title": "Diagram Jadwal",
      "bookReference": "hlm. 41–42",
      "objective": "Jadwal.. Ingat KPK dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Faktor Prima. Pilih.",
      "diagramType": "cal",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "choose-b",
      "title": "Pilih Pernyataan B",
      "bookReference": "hlm. 38–42",
      "objective": "Pilih.. Ingat KPK dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Faktor Prima. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-b",
      "title": "Cerita Diagram B",
      "bookReference": "hlm. 31–42",
      "objective": "Cerita.. Ingat KPK dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan KPK dari Faktor Prima.",
      "voiceGuide": "KPK dari Faktor Prima. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-persekutuan",
      "title": "Tulis Cek Persekutuan",
      "bookReference": "hlm. 38–40",
      "objective": "Pakai Diagram Faktor: Gabungan himpunan faktor prima membantu menemukan KPK. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Venn Factors: Gabungan himpunan faktor prima membantu menemukan KPK.",
      "voiceGuide": "Diagram Faktor. Gabungan himpunan faktor prima membantu menemukan KPK.",
      "symbolLarge": "6∈",
      "wordLarge": "IRISAN",
      "mathNotation": "cek"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kpk",
      "title": "Tulis Hasil KPK",
      "bookReference": "hlm. 40–42",
      "objective": "Pakai Diagram Faktor: Gabungan himpunan faktor prima membantu menemukan KPK. Latihan: Menulis KPK..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Venn Factors: Gabungan himpunan faktor prima membantu menemukan KPK.",
      "voiceGuide": "Diagram Faktor. Gabungan himpunan faktor prima membantu menemukan KPK.",
      "symbolLarge": "KPK",
      "wordLarge": "HASIL",
      "mathNotation": "lcm"
    },
    {
      "stage": "Abstract",
      "gameType": "write-jadwal",
      "title": "Tulis Jadwal KPK",
      "bookReference": "hlm. 41–42",
      "objective": "Pakai Diagram Faktor: Gabungan himpunan faktor prima membantu menemukan KPK. Latihan: Menulis jadwal..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Venn Factors: Gabungan himpunan faktor prima membantu menemukan KPK.",
      "voiceGuide": "Diagram Faktor. Gabungan himpunan faktor prima membantu menemukan KPK.",
      "symbolLarge": "tgl",
      "wordLarge": "JADWAL",
      "mathNotation": "hari"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-b",
      "title": "Urutkan Abstrak B",
      "bookReference": "hlm. 40–42",
      "objective": "Pakai Diagram Faktor: Gabungan himpunan faktor prima membantu menemukan KPK. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Venn Factors: Gabungan himpunan faktor prima membantu menemukan KPK.",
      "voiceGuide": "Diagram Faktor. Gabungan himpunan faktor prima membantu menemukan KPK.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-b",
      "title": "Jodohkan Notasi B",
      "bookReference": "hlm. 38–42",
      "objective": "Jodohkan.. Ingat Diagram Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "Diagram Faktor. Jodohkan.",
      "symbolLarge": "KPK",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-b",
      "title": "Memori Notasi B",
      "bookReference": "hlm. 38–42",
      "objective": "Memori.. Ingat Diagram Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "Diagram Faktor. Balik kartu.",
      "symbolLarge": "kpk",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-b",
      "title": "Benar atau Salah: KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Menilai.. Ingat Diagram Faktor.",
      "mechanicDescription": "Dua ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "Diagram Faktor. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-b",
      "title": "Detektif KPK",
      "bookReference": "hlm. 31–42",
      "objective": "Petunjuk.. Ingat Diagram Faktor.",
      "mechanicDescription": "Tiga soal. Gunakan Diagram Faktor.",
      "voiceGuide": "Diagram Faktor. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-b",
      "title": "Peta Konsep KPK",
      "bookReference": "hlm. 38–42",
      "objective": "Peta.. Ingat Diagram Faktor.",
      "mechanicDescription": "Satu peta. Gunakan Diagram Faktor.",
      "voiceGuide": "Diagram Faktor. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-b",
      "title": "Cerita Angka KPK",
      "bookReference": "hlm. 31–42",
      "objective": "Cerita.. Ingat Diagram Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Diagram Faktor.",
      "voiceGuide": "Diagram Faktor. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🤝",
      "nama": "Persekutuan",
      "isi": "Kelipatan yang sama dari dua bilangan atau lebih.",
      "suara": "Itu kelipatan persekutuan."
    },
    {
      "ikon": "🎯",
      "nama": "KPK",
      "isi": "Kelipatan persekutuan yang terkecil.",
      "suara": "KPK adalah yang terkecil."
    },
    {
      "ikon": "🌍",
      "nama": "Daftar Kelipatan Bersama",
      "isi": "Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "suara": "Daftar Kelipatan Bersama. Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK."
    },
    {
      "ikon": "🌍",
      "nama": "KPK dari Faktor Prima",
      "isi": "Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "suara": "KPK dari Faktor Prima. Ambil faktor prima dengan pangkat tertinggi, lalu kalikan."
    },
    {
      "ikon": "🌍",
      "nama": "Diagram Faktor",
      "isi": "Gabungan himpunan faktor prima membantu menemukan KPK.",
      "suara": "Diagram Faktor. Gabungan himpunan faktor prima membantu menemukan KPK."
    }
  ],
  "poinSuara": "Ingat: Daftar Kelipatan Bersama, KPK dari Faktor Prima, Diagram Faktor.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Daftar kelipatan",
        "warna": "#FDE68A"
      },
      {
        "teks": "tandai yang sama",
        "warna": "#BBF7D0"
      },
      {
        "teks": "ambil terkecil",
        "warna": "#BFDBFE"
      },
      {
        "teks": "terapkan ke jadwal",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Daftar Kelipatan Bersama pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Daftar Kelipatan Bersama membantumu memahami soal?",
    "Kapan kamu memakai KPK dari Faktor Prima?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "LCM Listing",
      "namaId": "Daftar Kelipatan Bersama",
      "asal": "Elementary number theory pedagogy",
      "ringkas": "Tuliskan kelipatan dua bilangan, cari yang sama terkecil = KPK.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Prime Factor KPK",
      "namaId": "KPK dari Faktor Prima",
      "asal": "Prime factorization method",
      "ringkas": "Ambil faktor prima dengan pangkat tertinggi, lalu kalikan.",
      "tahap": [
        "Mind",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Venn Factors",
      "namaId": "Diagram Faktor",
      "asal": "Visual LCM/GCF",
      "ringkas": "Gabungan himpunan faktor prima membantu menemukan KPK.",
      "tahap": [
        "Infografis",
        "Picture"
      ]
    }
  ]
};

export const SUB_C52: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Faktor)",
  "fullTitle": "Sub-Bab C: Faktor",
  "targetDescription": "Siswa menemukan faktor bilangan melalui pembagian habis dan model kertas berpetak, serta memahami pasangan faktor sesuai Buku Siswa Kelas V Bab 2. Siswa memakai cara Pasangan Faktor, Daftar Pembagi, Model Susunan Persegi Panjang.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar faktor. Faktor adalah bilangan yang membagi habis tanpa sisa. Kita memotong kertas berpetak tanpa sisa dan menemukan pasangan faktor. Satu dan bilangan itu sendiri selalu menjadi faktor. Kita memakai cara dari luar buku: Pasangan Faktor (Factor Pairs); Daftar Pembagi (Divisor List); Model Susunan Persegi Panjang (Array Model). Faktor datang berpasangan yang dikalikan jadi bilangan itu. Urutkan semua pembagi dari kecil ke besar. Susunan baris×kolom menunjukkan pasangan faktor. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan faktor-faktor suatu bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2: KPK dan FPB, Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K5B2C-V1",
      "judul": "Apa Itu Faktor",
      "subjudul": "Factor Pairs",
      "adegan": [
        {
          "id": "K5B2C-V1-1",
          "judul": "Bagi tanpa sisa",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ambil dua belas. Mari kita pahami bersama.",
            "Bagi dengan empat. Mari kita pahami bersama.",
            "Hasil tiga tanpa sisa. Mari kita pahami bersama.",
            "Ingat cara Pasangan Faktor: Faktor datang berpasangan yang dikalikan jadi bilangan itu."
          ],
          "papan": [
            "12",
            "÷4",
            "habis",
            "faktor"
          ]
        },
        {
          "id": "K5B2C-V1-2",
          "judul": "Daftar faktor 12",
          "ketukan": [
            "Satu, dua, tiga, empat. Mari kita pahami bersama.",
            "Enam dan dua belas. Mari kita pahami bersama.",
            "Itu semua faktor dua belas. Mari kita pahami bersama.",
            "Di sini kita memakai ide Factor Pairs — Faktor datang berpasangan yang dikalikan jadi bilangan itu."
          ],
          "papan": [
            "1–4",
            "6,12",
            "lengkap",
            "bukan 5"
          ]
        },
        {
          "id": "K5B2C-V1-3",
          "judul": "Selalu ada",
          "ketukan": [
            "Satu selalu faktor. Mari kita pahami bersama.",
            "Bilangan itu sendiri juga. Mari kita pahami bersama.",
            "Cari yang di tengah. Mari kita pahami bersama.",
            "METODE LUAR · Pasangan Faktor: Faktor datang berpasangan yang dikalikan jadi bilangan itu."
          ],
          "papan": [
            "tengah",
            "daftar",
            "pasangan",
            "pasangan"
          ]
        }
      ]
    },
    {
      "id": "K5B2C-V2",
      "judul": "Latihan: Daftar Pembagi",
      "subjudul": "Divisor List",
      "adegan": [
        {
          "id": "K5B2C-V2-1",
          "judul": "Potong 12 petak",
          "ketukan": [
            "Panjang dua belas petak. Mari kita pahami bersama.",
            "Potong sama panjang. Mari kita pahami bersama.",
            "Tidak boleh ada sisa. Mari kita pahami bersama.",
            "Ingat cara Daftar Pembagi: Urutkan semua pembagi dari kecil ke besar."
          ],
          "papan": [
            "12 petak",
            "sama",
            "tanpa sisa",
            "faktor"
          ]
        },
        {
          "id": "K5B2C-V2-2",
          "judul": "Contoh panjang 3",
          "ketukan": [
            "Panjang tiap bagian tiga. Mari kita pahami bersama.",
            "Dapat empat potong. Mari kita pahami bersama.",
            "Tiga dan empat saling terkait. Mari kita pahami bersama.",
            "Di sini kita memakai ide Divisor List — Urutkan semua pembagi dari kecil ke besar."
          ],
          "papan": [
            "panjang 3",
            "4 potong",
            "3 & 4",
            "faktor"
          ]
        },
        {
          "id": "K5B2C-V2-3",
          "judul": "Faktor 18",
          "ketukan": [
            "Ulang untuk delapan belas. Mari kita pahami bersama.",
            "Temukan semua pembagi. Mari kita pahami bersama.",
            "Isi lingkaran faktor. Mari kita pahami bersama.",
            "METODE LUAR · Daftar Pembagi: Urutkan semua pembagi dari kecil ke besar."
          ],
          "papan": [
            "18",
            "pembagi",
            "lingkaran",
            "urut"
          ]
        }
      ]
    },
    {
      "id": "K5B2C-V3",
      "judul": "Siap pakai Array Model",
      "subjudul": "Array Model",
      "adegan": [
        {
          "id": "K5B2C-V3-1",
          "judul": "Saling berpasangan",
          "ketukan": [
            "Satu dengan delapan belas. Mari kita pahami bersama.",
            "Dua dengan sembilan. Mari kita pahami bersama.",
            "Tiga dengan enam. Mari kita pahami bersama.",
            "Ingat cara Model Susunan Persegi Panjang: Susunan baris×kolom menunjukkan pasangan faktor."
          ],
          "papan": [
            "1↔18",
            "2↔9",
            "3↔6",
            "× = 18"
          ]
        },
        {
          "id": "K5B2C-V3-2",
          "judul": "Cara ingat",
          "ketukan": [
            "Jika tahu satu faktor. Mari kita pahami bersama.",
            "Bagi bilangan utamanya. Mari kita pahami bersama.",
            "Dapat pasangannya. Mari kita pahami bersama.",
            "Di sini kita memakai ide Array Model — Susunan baris×kolom menunjukkan pasangan faktor."
          ],
          "papan": [
            "tahu satu",
            "bagi",
            "pasangan",
            "cepat"
          ]
        },
        {
          "id": "K5B2C-V3-3",
          "judul": "Siap bermain",
          "ketukan": [
            "Definisi sudah jelas. Mari kita pahami bersama.",
            "Petak dan pasangan siap. Mari kita pahami bersama.",
            "Ayo ke permainan. Mari kita pahami bersama.",
            "METODE LUAR · Model Susunan Persegi Panjang: Susunan baris×kolom menunjukkan pasangan faktor."
          ],
          "papan": [
            "arti",
            "model",
            "main",
            "semangat"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Faktor. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Factor Pairs",
      "stepDesc": "Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Divisor List",
      "stepDesc": "Urutkan semua pembagi dari kecil ke besar.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Array Model",
      "stepDesc": "Susunan baris×kolom menunjukkan pasangan faktor.",
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
      "judul": "Arti",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "pembagi habis",
      "suara": "Faktor membagi tanpa sisa."
    },
    {
      "judul": "12",
      "emoji": "📐",
      "countNum": 12,
      "countWord": "1,2,3,4,6,12",
      "suara": "Faktor dua belas."
    },
    {
      "judul": "18",
      "emoji": "🟢",
      "countNum": 18,
      "countWord": "1,2,3,6,9,18",
      "suara": "Faktor delapan belas."
    },
    {
      "judul": "Pasangan",
      "emoji": "🔗",
      "countNum": 1,
      "countWord": "a×b=n",
      "suara": "Saling berpasangan."
    },
    {
      "judul": "Petak",
      "emoji": "📏",
      "countNum": 1,
      "countWord": "tanpa sisa",
      "suara": "Model konkret."
    },
    {
      "judul": "1 dan n",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "selalu",
      "suara": "Selalu menjadi faktor."
    },
    {
      "judul": "Bukan",
      "emoji": "🚫",
      "countNum": 5,
      "countWord": "sisa",
      "suara": "Ada sisa = bukan faktor."
    },
    {
      "judul": "24",
      "emoji": "📘",
      "countNum": 24,
      "countWord": "memuat 8",
      "suara": "Contoh latihan."
    },
    {
      "judul": "Urut",
      "emoji": "📶",
      "countNum": 1,
      "countWord": "kecil→besar",
      "suara": "Tulis terurut."
    },
    {
      "judul": "Bab 2 A–C",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "siap",
      "suara": "Kelipatan, KPK, faktor."
    },
    {
      "judul": "Pasangan Faktor",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Faktor datang berpasangan yang dikalikan jadi bilangan itu."
    },
    {
      "judul": "Daftar Pembagi",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Urutkan semua pembagi dari kecil ke besar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-faktor",
      "title": "Cek Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan yang dikalikan jadi bilangan itu. Latihan: Mengenali faktor..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Pairs: Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "emoji": "➗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "pasangan-faktor",
      "title": "Pasangan Faktor",
      "bookReference": "hlm. 45",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan yang dikalikan jadi bilangan itu. Latihan: Pasangan hasil kali..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Pairs: Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "emoji": "🔗",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-faktor",
      "title": "Arti Faktor",
      "bookReference": "hlm. 44–45",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan yang dikalikan jadi bilangan itu. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Pairs: Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-faktor",
      "title": "Pilah Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Pakai Pasangan Faktor: Faktor datang berpasangan yang dikalikan jadi bilangan itu. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Pairs: Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "voiceGuide": "Pasangan Faktor. Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-faktor",
      "title": "Jodohkan Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Menjodohkan.. Ingat Pasangan Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-faktor",
      "title": "Memori Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Memori.. Ingat Pasangan Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-faktor",
      "title": "Ketuk Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Mengetuk.. Ingat Pasangan Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-faktor",
      "title": "Ketuk Semua Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Ketuk semua.. Ingat Pasangan Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-petak",
      "title": "Cerita Kertas Berpetak",
      "bookReference": "hlm. 43–46",
      "objective": "Soal cerita.. Ingat Pasangan Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Pilih.",
      "emoji": "📏",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-faktor",
      "title": "Urutkan Faktor",
      "bookReference": "hlm. 45–46",
      "objective": "Mengurutkan.. Ingat Pasangan Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pasangan Faktor.",
      "voiceGuide": "Pasangan Faktor. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-bagi",
      "title": "Diagram Bagi Petak",
      "bookReference": "hlm. 43–44",
      "objective": "Pakai Daftar Pembagi: Urutkan semua pembagi dari kecil ke besar. Latihan: Baca potongan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisor List: Urutkan semua pembagi dari kecil ke besar.",
      "voiceGuide": "Daftar Pembagi. Urutkan semua pembagi dari kecil ke besar.",
      "diagramType": "grid",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-pasangan",
      "title": "Diagram Pasangan",
      "bookReference": "hlm. 45",
      "objective": "Pakai Daftar Pembagi: Urutkan semua pembagi dari kecil ke besar. Latihan: Pasangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisor List: Urutkan semua pembagi dari kecil ke besar.",
      "voiceGuide": "Daftar Pembagi. Urutkan semua pembagi dari kecil ke besar.",
      "diagramType": "pair",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-c",
      "title": "Jodohkan Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Pakai Daftar Pembagi: Urutkan semua pembagi dari kecil ke besar. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisor List: Urutkan semua pembagi dari kecil ke besar.",
      "voiceGuide": "Daftar Pembagi. Urutkan semua pembagi dari kecil ke besar.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-c",
      "title": "Memori Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Pakai Daftar Pembagi: Urutkan semua pembagi dari kecil ke besar. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Divisor List: Urutkan semua pembagi dari kecil ke besar.",
      "voiceGuide": "Daftar Pembagi. Urutkan semua pembagi dari kecil ke besar.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-c",
      "title": "Tabel Faktor",
      "bookReference": "hlm. 44–46",
      "objective": "Isi tabel.. Ingat Daftar Pembagi.",
      "mechanicDescription": "Tiga tabel. Gunakan Daftar Pembagi.",
      "voiceGuide": "Daftar Pembagi. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pc",
      "title": "Ketuk Semua Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Ketuk semua.. Ingat Daftar Pembagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Daftar Pembagi. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-c",
      "title": "Pilah Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Pilah.. Ingat Daftar Pembagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Daftar Pembagi. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-c",
      "title": "Pilih Pernyataan C",
      "bookReference": "hlm. 43–46",
      "objective": "Pilih.. Ingat Daftar Pembagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Daftar Pembagi. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pc",
      "title": "Pilih Arti Diagram C",
      "bookReference": "hlm. 44–45",
      "objective": "Definisi.. Ingat Daftar Pembagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Daftar Pembagi. Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-c",
      "title": "Cerita Diagram C",
      "bookReference": "hlm. 43–46",
      "objective": "Cerita.. Ingat Daftar Pembagi.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Pembagi.",
      "voiceGuide": "Daftar Pembagi. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek-f",
      "title": "Tulis Cek Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Pakai Model Susunan Persegi Panjang: Susunan baris×kolom menunjukkan pasangan faktor. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Array Model: Susunan baris×kolom menunjukkan pasangan faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Susunan baris×kolom menunjukkan pasangan faktor.",
      "symbolLarge": "n|d",
      "wordLarge": "CEK",
      "mathNotation": "faktor"
    },
    {
      "stage": "Abstract",
      "gameType": "write-pasangan",
      "title": "Tulis Pasangan",
      "bookReference": "hlm. 45",
      "objective": "Pakai Model Susunan Persegi Panjang: Susunan baris×kolom menunjukkan pasangan faktor. Latihan: Menulis pasangan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Array Model: Susunan baris×kolom menunjukkan pasangan faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Susunan baris×kolom menunjukkan pasangan faktor.",
      "symbolLarge": "a×b",
      "wordLarge": "PASANGAN",
      "mathNotation": "kali"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-c",
      "title": "Pilih Definisi Faktor",
      "bookReference": "hlm. 44–45",
      "objective": "Pakai Model Susunan Persegi Panjang: Susunan baris×kolom menunjukkan pasangan faktor. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Array Model: Susunan baris×kolom menunjukkan pasangan faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Susunan baris×kolom menunjukkan pasangan faktor.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-c",
      "title": "Urutkan Abstrak C",
      "bookReference": "hlm. 45–46",
      "objective": "Pakai Model Susunan Persegi Panjang: Susunan baris×kolom menunjukkan pasangan faktor. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Array Model: Susunan baris×kolom menunjukkan pasangan faktor.",
      "voiceGuide": "Model Susunan Persegi Panjang. Susunan baris×kolom menunjukkan pasangan faktor.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-c",
      "title": "Jodohkan Notasi C",
      "bookReference": "hlm. 43–46",
      "objective": "Jodohkan.. Ingat Model Susunan Persegi Panjang.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Jodohkan.",
      "symbolLarge": "f",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-c",
      "title": "Memori Notasi C",
      "bookReference": "hlm. 43–46",
      "objective": "Memori.. Ingat Model Susunan Persegi Panjang.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Balik kartu.",
      "symbolLarge": "fak",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-c",
      "title": "Benar atau Salah: Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Menilai.. Ingat Model Susunan Persegi Panjang.",
      "mechanicDescription": "Dua ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-c",
      "title": "Detektif Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Petunjuk.. Ingat Model Susunan Persegi Panjang.",
      "mechanicDescription": "Tiga soal. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-c",
      "title": "Peta Konsep Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Peta.. Ingat Model Susunan Persegi Panjang.",
      "mechanicDescription": "Satu peta. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-c",
      "title": "Cerita Angka Faktor",
      "bookReference": "hlm. 43–46",
      "objective": "Cerita.. Ingat Model Susunan Persegi Panjang.",
      "mechanicDescription": "Tiga ronde. Gunakan Model Susunan Persegi Panjang.",
      "voiceGuide": "Model Susunan Persegi Panjang. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "➗",
      "nama": "Faktor",
      "isi": "Bilangan yang membagi habis tanpa sisa.",
      "suara": "Faktor adalah pembagi habis."
    },
    {
      "ikon": "📏",
      "nama": "Model petak",
      "isi": "Potong sama panjang tanpa sisa.",
      "suara": "Panjang bagian = faktor."
    },
    {
      "ikon": "🌍",
      "nama": "Pasangan Faktor",
      "isi": "Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "suara": "Pasangan Faktor. Faktor datang berpasangan yang dikalikan jadi bilangan itu."
    },
    {
      "ikon": "🌍",
      "nama": "Daftar Pembagi",
      "isi": "Urutkan semua pembagi dari kecil ke besar.",
      "suara": "Daftar Pembagi. Urutkan semua pembagi dari kecil ke besar."
    },
    {
      "ikon": "🌍",
      "nama": "Model Susunan Persegi Panjang",
      "isi": "Susunan baris×kolom menunjukkan pasangan faktor.",
      "suara": "Model Susunan Persegi Panjang. Susunan baris×kolom menunjukkan pasangan faktor."
    }
  ],
  "poinSuara": "Ingat: Pasangan Faktor, Daftar Pembagi, Model Susunan Persegi Panjang.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Pilih bilangan",
        "warna": "#FDE68A"
      },
      {
        "teks": "uji pembagi",
        "warna": "#BBF7D0"
      },
      {
        "teks": "catat yang habis",
        "warna": "#BFDBFE"
      },
      {
        "teks": "pasangkan hasil kali",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Pasangan Faktor pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Pasangan Faktor membantumu memahami soal?",
    "Kapan kamu memakai Daftar Pembagi?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Factor Pairs",
      "namaId": "Pasangan Faktor",
      "asal": "Array model",
      "ringkas": "Faktor datang berpasangan yang dikalikan jadi bilangan itu.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Divisor List",
      "namaId": "Daftar Pembagi",
      "asal": "Number sense",
      "ringkas": "Urutkan semua pembagi dari kecil ke besar.",
      "tahap": [
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Array Model",
      "namaId": "Model Susunan Persegi Panjang",
      "asal": "Van de Walle",
      "ringkas": "Susunan baris×kolom menunjukkan pasangan faktor.",
      "tahap": [
        "Infografis",
        "Picture"
      ]
    }
  ]
};

export const SUB_D52: SubBabNaskah = {
  "id": "D",
  "codeTitle": "Sub-Bab D (Faktor Persekutuan)",
  "fullTitle": "Sub-Bab D: Faktor Persekutuan dan FPB",
  "targetDescription": "Siswa menemukan faktor persekutuan dua bilangan atau lebih melalui model congklak, menentukan FPB, serta menerapkan FPB pada masalah bagi rata (vas bunga dan paket bingkisan) sesuai Buku Siswa Kelas V Bab 2. Siswa memakai cara Daftar Faktor Persekutuan, FPB dari Faktor Prima, Ide Selisih / Sisa.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#9D174D",
  "silabus": {
    "teksSuara": "Kita belajar faktor persekutuan. Irisan daftar faktor disebut faktor persekutuan. Yang terbesar disebut FPB. Kita memakai model congklak, lalu membagi mawar ke vas dan membuat paket bingkisan. Kita memakai cara dari luar buku: Daftar Faktor Persekutuan (GCF Listing); FPB dari Faktor Prima (Prime Factor FPB); Ide Selisih / Sisa (Euclid Idea). Faktor yang sama terbesar = FPB. Ambil faktor prima yang sama dengan pangkat terendah. FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan faktor persekutuan dan FPB dua atau lebih bilangan.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2: KPK dan FPB, Sub-Bab D)."
  },
  "videos": [
    {
      "id": "K5B2D-V1",
      "judul": "Congklak Faktor",
      "subjudul": "GCF Listing",
      "adegan": [
        {
          "id": "K5B2D-V1-1",
          "judul": "Dua pemain",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Pemain satu: faktor dua belas. Mari kita pahami bersama.",
            "Pemain dua: faktor delapan belas. Mari kita pahami bersama.",
            "Taruh biji di lubang faktor. Mari kita pahami bersama.",
            "Ingat cara Daftar Faktor Persekutuan: Faktor yang sama terbesar = FPB."
          ],
          "papan": [
            "faktor 12",
            "faktor 18",
            "biji",
            "2 biji"
          ]
        },
        {
          "id": "K5B2D-V1-2",
          "judul": "Hasil irisan",
          "ketukan": [
            "Lubang satu, dua, tiga, enam. Mari kita pahami bersama.",
            "Itu faktor persekutuan. Mari kita pahami bersama.",
            "Ambil yang terbesar. Mari kita pahami bersama.",
            "Di sini kita memakai ide GCF Listing — Faktor yang sama terbesar = FPB."
          ],
          "papan": [
            "1,2,3,6",
            "persekutuan",
            "terbesar",
            "FPB=6"
          ]
        },
        {
          "id": "K5B2D-V1-3",
          "judul": "Definisi",
          "ketukan": [
            "Faktor yang sama disebut persekutuan. Mari kita pahami bersama.",
            "Yang terbesar disebut FPB. Mari kita pahami bersama.",
            "Berguna untuk membagi rata. Mari kita pahami bersama.",
            "METODE LUAR · Daftar Faktor Persekutuan: Faktor yang sama terbesar = FPB."
          ],
          "papan": [
            "sama",
            "FPB",
            "bagi rata",
            "tanpa sisa"
          ]
        }
      ]
    },
    {
      "id": "K5B2D-V2",
      "judul": "Latihan: FPB dari Faktor Prima",
      "subjudul": "Prime Factor FPB",
      "adegan": [
        {
          "id": "K5B2D-V2-1",
          "judul": "Tulis faktor",
          "ketukan": [
            "Tulis semua faktor A. Mari kita pahami bersama.",
            "Tulis semua faktor B. Mari kita pahami bersama.",
            "Tandai yang sama. Mari kita pahami bersama.",
            "Ingat cara FPB dari Faktor Prima: Ambil faktor prima yang sama dengan pangkat terendah."
          ],
          "papan": [
            "faktor A",
            "faktor B",
            "irisan",
            "max"
          ]
        },
        {
          "id": "K5B2D-V2-2",
          "judul": "Contoh 6 dan 12",
          "ketukan": [
            "Faktor enam: satu, dua, tiga, enam. Mari kita pahami bersama.",
            "Faktor dua belas memuat semuanya. Mari kita pahami bersama.",
            "Irisan sampai enam. Mari kita pahami bersama.",
            "Di sini kita memakai ide Prime Factor FPB — Ambil faktor prima yang sama dengan pangkat terendah."
          ],
          "papan": [
            "12",
            "irisan",
            "FPB=6",
            "fpb"
          ]
        },
        {
          "id": "K5B2D-V2-3",
          "judul": "FPB = 1",
          "ketukan": [
            "Kadang tidak ada prima sama. Mari kita pahami bersama.",
            "Contoh lima belas dan dua delapan. Mari kita pahami bersama.",
            "FPB-nya satu. Mari kita pahami bersama.",
            "METODE LUAR · FPB dari Faktor Prima: Ambil faktor prima yang sama dengan pangkat terendah."
          ],
          "papan": [
            "15",
            "28",
            "FPB=1",
            "sah"
          ]
        }
      ]
    },
    {
      "id": "K5B2D-V3",
      "judul": "Siap pakai Euclid Idea",
      "subjudul": "Euclid Idea",
      "adegan": [
        {
          "id": "K5B2D-V3-1",
          "judul": "Mawar Ibu",
          "ketukan": [
            "Dua puluh empat merah. Mari kita pahami bersama.",
            "Delapan belas putih. Mari kita pahami bersama.",
            "Vas maksimal sama rata. Mari kita pahami bersama.",
            "Ingat cara Ide Selisih / Sisa: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai."
          ],
          "papan": [
            "24",
            "18",
            "FPB",
            "6 vas"
          ]
        },
        {
          "id": "K5B2D-V3-2",
          "judul": "Isi tiap vas",
          "ketukan": [
            "Merah dua puluh empat bagi enam. Mari kita pahami bersama.",
            "Empat tangkai. Mari kita pahami bersama.",
            "Putih delapan belas bagi enam. Mari kita pahami bersama.",
            "Di sini kita memakai ide Euclid Idea — FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai."
          ],
          "papan": [
            "24÷6",
            "18÷6",
            "ide",
            "ide"
          ]
        },
        {
          "id": "K5B2D-V3-3",
          "judul": "Paket Dania",
          "ketukan": [
            "Tiga puluh enam, empat delapan, dua empat. Mari kita pahami bersama.",
            "FPB dua belas. Mari kita pahami bersama.",
            "Dua belas paket. Mari kita pahami bersama.",
            "METODE LUAR · Ide Selisih / Sisa: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai."
          ],
          "papan": [
            "36,48,24",
            "FPB 12",
            "paket",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Faktor Persekutuan dan FPB. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. GCF Listing",
      "stepDesc": "Faktor yang sama terbesar = FPB.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Prime Factor FPB",
      "stepDesc": "Ambil faktor prima yang sama dengan pangkat terendah.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Euclid Idea",
      "stepDesc": "FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
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
      "judul": "Persekutuan",
      "emoji": "🤝",
      "countNum": 1,
      "countWord": "irisan faktor",
      "suara": "Faktor yang sama."
    },
    {
      "judul": "FPB",
      "emoji": "🏆",
      "countNum": 1,
      "countWord": "terbesar",
      "suara": "Yang paling besar."
    },
    {
      "judul": "12 & 18",
      "emoji": "🎯",
      "countNum": 6,
      "countWord": "FPB=6",
      "suara": "Contoh congklak."
    },
    {
      "judul": "Congklak",
      "emoji": "🥣",
      "countNum": 1,
      "countWord": "2 biji",
      "suara": "Tandai irisan."
    },
    {
      "judul": "24 & 18",
      "emoji": "🌹",
      "countNum": 6,
      "countWord": "6 vas",
      "suara": "Mawar Ibu."
    },
    {
      "judul": "Isi vas",
      "emoji": "🌸",
      "countNum": 1,
      "countWord": "4 dan 3",
      "suara": "24÷6 dan 18÷6."
    },
    {
      "judul": "36,48,24",
      "emoji": "🎁",
      "countNum": 12,
      "countWord": "12 paket",
      "suara": "Bingkisan."
    },
    {
      "judul": "FPB=1",
      "emoji": "1️⃣",
      "countNum": 1,
      "countWord": "15 & 28",
      "suara": "Tanpa pasangan."
    },
    {
      "judul": "Pakai",
      "emoji": "📦",
      "countNum": 1,
      "countWord": "bagi rata",
      "suara": "Tanpa sisa."
    },
    {
      "judul": "Siap E",
      "emoji": "➡️",
      "countNum": 1,
      "countWord": "prima",
      "suara": "Lanjut faktorisasi."
    },
    {
      "judul": "Daftar Faktor Persekutuan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Faktor yang sama terbesar = FPB."
    },
    {
      "judul": "FPB dari Faktor Prima",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Ambil faktor prima yang sama dengan pangkat terendah."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-persekutuan-f",
      "title": "Cek Faktor Persekutuan",
      "bookReference": "hlm. 46–49",
      "objective": "Pakai Daftar Faktor Persekutuan: Faktor yang sama terbesar = FPB. Latihan: Mengenali irisan faktor..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan GCF Listing: Faktor yang sama terbesar = FPB.",
      "voiceGuide": "Daftar Faktor Persekutuan. Faktor yang sama terbesar = FPB.",
      "emoji": "🤝",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "hitung-fpb",
      "title": "Hitung FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Pakai Daftar Faktor Persekutuan: Faktor yang sama terbesar = FPB. Latihan: Menemukan FPB..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan GCF Listing: Faktor yang sama terbesar = FPB.",
      "voiceGuide": "Daftar Faktor Persekutuan. Faktor yang sama terbesar = FPB.",
      "emoji": "🏆",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-fpb",
      "title": "Arti FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Pakai Daftar Faktor Persekutuan: Faktor yang sama terbesar = FPB. Latihan: Definisi & pemakaian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan GCF Listing: Faktor yang sama terbesar = FPB.",
      "voiceGuide": "Daftar Faktor Persekutuan. Faktor yang sama terbesar = FPB.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-fpb",
      "title": "Pilah Faktor Persekutuan",
      "bookReference": "hlm. 46–49",
      "objective": "Pakai Daftar Faktor Persekutuan: Faktor yang sama terbesar = FPB. Latihan: Memilah..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan GCF Listing: Faktor yang sama terbesar = FPB.",
      "voiceGuide": "Daftar Faktor Persekutuan. Faktor yang sama terbesar = FPB.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-fpb",
      "title": "Jodohkan FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Menjodohkan.. Ingat Daftar Faktor Persekutuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-fpb",
      "title": "Memori FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Memori.. Ingat Daftar Faktor Persekutuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-fpb",
      "title": "Ketuk Faktor Sama",
      "bookReference": "hlm. 46–49",
      "objective": "Mengetuk.. Ingat Daftar Faktor Persekutuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-fpb",
      "title": "Ketuk Semua Benar FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Ketuk semua.. Ingat Daftar Faktor Persekutuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-fpb",
      "title": "Cerita Congklak dan Vas",
      "bookReference": "hlm. 46–52",
      "objective": "Soal cerita.. Ingat Daftar Faktor Persekutuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Pilih.",
      "emoji": "🌸",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "order-fpb",
      "title": "Urutkan Faktor Persekutuan",
      "bookReference": "hlm. 48–49",
      "objective": "Mengurutkan.. Ingat Daftar Faktor Persekutuan.",
      "mechanicDescription": "Tiga ronde. Gunakan Daftar Faktor Persekutuan.",
      "voiceGuide": "Daftar Faktor Persekutuan. Urutkan.",
      "emoji": "📶",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "diagram-irisan-f",
      "title": "Diagram Irisan Faktor",
      "bookReference": "hlm. 48–49",
      "objective": "Pakai FPB dari Faktor Prima: Ambil faktor prima yang sama dengan pangkat terendah. Latihan: Baca irisan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor FPB: Ambil faktor prima yang sama dengan pangkat terendah.",
      "voiceGuide": "FPB dari Faktor Prima. Ambil faktor prima yang sama dengan pangkat terendah.",
      "diagramType": "venn",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-fpb",
      "title": "Diagram FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Pakai FPB dari Faktor Prima: Ambil faktor prima yang sama dengan pangkat terendah. Latihan: Baca FPB..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor FPB: Ambil faktor prima yang sama dengan pangkat terendah.",
      "voiceGuide": "FPB dari Faktor Prima. Ambil faktor prima yang sama dengan pangkat terendah.",
      "diagramType": "gcd",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-d",
      "title": "Jodohkan Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Pakai FPB dari Faktor Prima: Ambil faktor prima yang sama dengan pangkat terendah. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor FPB: Ambil faktor prima yang sama dengan pangkat terendah.",
      "voiceGuide": "FPB dari Faktor Prima. Ambil faktor prima yang sama dengan pangkat terendah.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-d",
      "title": "Memori Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Pakai FPB dari Faktor Prima: Ambil faktor prima yang sama dengan pangkat terendah. Latihan: Memori..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Prime Factor FPB: Ambil faktor prima yang sama dengan pangkat terendah.",
      "voiceGuide": "FPB dari Faktor Prima. Ambil faktor prima yang sama dengan pangkat terendah.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-d",
      "title": "Tabel FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Isi tabel.. Ingat FPB dari Faktor Prima.",
      "mechanicDescription": "Tiga tabel. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Faktor Prima. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pd",
      "title": "Ketuk Semua Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Ketuk semua.. Ingat FPB dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Faktor Prima. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-d",
      "title": "Pilah Diagram D",
      "bookReference": "hlm. 46–49",
      "objective": "Pilah.. Ingat FPB dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Faktor Prima. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-d",
      "title": "Pilih Pernyataan D",
      "bookReference": "hlm. 46–52",
      "objective": "Pilih.. Ingat FPB dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Faktor Prima. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "jenis-pd",
      "title": "Pilih Arti Diagram D",
      "bookReference": "hlm. 48–52",
      "objective": "Definisi.. Ingat FPB dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Faktor Prima. Pilih.",
      "diagramType": "def",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-d",
      "title": "Cerita Diagram D",
      "bookReference": "hlm. 46–52",
      "objective": "Cerita.. Ingat FPB dari Faktor Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan FPB dari Faktor Prima.",
      "voiceGuide": "FPB dari Faktor Prima. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-cek-fp",
      "title": "Tulis Cek Persekutuan",
      "bookReference": "hlm. 46–49",
      "objective": "Pakai Ide Selisih / Sisa: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Euclid Idea: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "voiceGuide": "Ide Selisih / Sisa. FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "symbolLarge": "∈",
      "wordLarge": "CEK",
      "mathNotation": "irisan"
    },
    {
      "stage": "Abstract",
      "gameType": "write-fpb",
      "title": "Tulis Hasil FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Pakai Ide Selisih / Sisa: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai. Latihan: Menulis FPB..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Euclid Idea: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "voiceGuide": "Ide Selisih / Sisa. FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "symbolLarge": "FPB",
      "wordLarge": "HASIL",
      "mathNotation": "gcd"
    },
    {
      "stage": "Abstract",
      "gameType": "choose-def-d",
      "title": "Pilih Definisi FPB",
      "bookReference": "hlm. 48–52",
      "objective": "Pakai Ide Selisih / Sisa: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai. Latihan: Definisi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Euclid Idea: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "voiceGuide": "Ide Selisih / Sisa. FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "symbolLarge": "arti",
      "wordLarge": "DEFINISI",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-d",
      "title": "Urutkan Abstrak D",
      "bookReference": "hlm. 48–49",
      "objective": "Pakai Ide Selisih / Sisa: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Euclid Idea: FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "voiceGuide": "Ide Selisih / Sisa. FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-d",
      "title": "Jodohkan Notasi D",
      "bookReference": "hlm. 46–52",
      "objective": "Jodohkan.. Ingat Ide Selisih / Sisa.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Jodohkan.",
      "symbolLarge": "fpb",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-d",
      "title": "Memori Notasi D",
      "bookReference": "hlm. 46–52",
      "objective": "Memori.. Ingat Ide Selisih / Sisa.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Balik kartu.",
      "symbolLarge": "fpb",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-d",
      "title": "Benar atau Salah: FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Menilai.. Ingat Ide Selisih / Sisa.",
      "mechanicDescription": "Dua ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-d",
      "title": "Detektif FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Petunjuk.. Ingat Ide Selisih / Sisa.",
      "mechanicDescription": "Tiga soal. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-d",
      "title": "Peta Konsep FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Peta.. Ingat Ide Selisih / Sisa.",
      "mechanicDescription": "Satu peta. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-d",
      "title": "Cerita Angka FPB",
      "bookReference": "hlm. 46–52",
      "objective": "Cerita.. Ingat Ide Selisih / Sisa.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Selisih / Sisa.",
      "voiceGuide": "Ide Selisih / Sisa. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "🤝",
      "nama": "Persekutuan",
      "isi": "Faktor yang sama dari dua bilangan atau lebih.",
      "suara": "Itu faktor persekutuan."
    },
    {
      "ikon": "🏆",
      "nama": "FPB",
      "isi": "Faktor persekutuan yang terbesar.",
      "suara": "FPB adalah yang terbesar."
    },
    {
      "ikon": "🌍",
      "nama": "Daftar Faktor Persekutuan",
      "isi": "Faktor yang sama terbesar = FPB.",
      "suara": "Daftar Faktor Persekutuan. Faktor yang sama terbesar = FPB."
    },
    {
      "ikon": "🌍",
      "nama": "FPB dari Faktor Prima",
      "isi": "Ambil faktor prima yang sama dengan pangkat terendah.",
      "suara": "FPB dari Faktor Prima. Ambil faktor prima yang sama dengan pangkat terendah."
    },
    {
      "ikon": "🌍",
      "nama": "Ide Selisih / Sisa",
      "isi": "FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "suara": "Ide Selisih / Sisa. FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai."
    }
  ],
  "poinSuara": "Ingat: Daftar Faktor Persekutuan, FPB dari Faktor Prima, Ide Selisih / Sisa.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Daftar faktor",
        "warna": "#FDE68A"
      },
      {
        "teks": "tandai yang sama",
        "warna": "#BBF7D0"
      },
      {
        "teks": "ambil terbesar",
        "warna": "#BFDBFE"
      },
      {
        "teks": "bagi rata",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Daftar Faktor Persekutuan pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Daftar Faktor Persekutuan membantumu memahami soal?",
    "Kapan kamu memakai FPB dari Faktor Prima?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "GCF Listing",
      "namaId": "Daftar Faktor Persekutuan",
      "asal": "Elementary number theory pedagogy",
      "ringkas": "Faktor yang sama terbesar = FPB.",
      "tahap": [
        "Story",
        "Concrete",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Prime Factor FPB",
      "namaId": "FPB dari Faktor Prima",
      "asal": "Prime factorization method",
      "ringkas": "Ambil faktor prima yang sama dengan pangkat terendah.",
      "tahap": [
        "Mind",
        "Picture",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Euclid Idea",
      "namaId": "Ide Selisih / Sisa",
      "asal": "Euclidean algorithm (disederhanakan)",
      "ringkas": "FPB tidak berubah jika diganti selisih atau sisa pembagian yang sesuai.",
      "tahap": [
        "Infografis",
        "Abstract"
      ]
    }
  ]
};

export const SUB_E52: SubBabNaskah = {
  "id": "E",
  "codeTitle": "Sub-Bab E (Faktor Prima)",
  "fullTitle": "Sub-Bab E: Menentukan KPK dan FPB dengan Faktor Prima",
  "targetDescription": "Siswa mengenal bilangan prima (saringan Eratosthenes), membuat faktorisasi prima dengan pohon faktor, serta menentukan KPK dan FPB melalui faktorisasi prima dan pembagian berulang sesuai Buku Siswa Kelas V Bab 2. Siswa memakai cara Pohon Faktor, Ide Ayakan Prima, Jembatan KPK dan FPB.",
  "secondaryBg": "#EDE9FE",
  "secondaryBorder": "#7C3AED",
  "secondaryText": "#5B21B6",
  "silabus": {
    "teksSuara": "Kita belajar bilangan prima dan faktorisasi prima. Dengan pohon faktor kita mengurai bilangan. FPB diambil dari prima berpasangan. KPK mengambil semua prima dengan pangkat terbesar. Ada juga cara pembagian berulang. Kita memakai cara dari luar buku: Pohon Faktor (Factor Tree); Ide Ayakan Prima (Sieve Idea); Jembatan KPK dan FPB (KPK FPB Bridge). Urai bilangan jadi faktor sampai semua prima. Prima hanya punya faktor 1 dan dirinya. Faktorisasi prima dipakai bersama untuk KPK dan FPB. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menentukan bilangan prima, faktorisasi prima, serta KPK dan FPB dengan faktorisasi prima.",
    "referensi": "Buku Siswa Matematika Kelas V Kemendikbudristek (Bab 2: KPK dan FPB, Sub-Bab E)."
  },
  "videos": [
    {
      "id": "K5B2E-V1",
      "judul": "Bilangan Prima",
      "subjudul": "Factor Tree",
      "adegan": [
        {
          "id": "K5B2E-V1-1",
          "judul": "Definisi",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Prima hanya dibagi satu dan dirinya. Mari kita pahami bersama.",
            "Satu bukan prima. Mari kita pahami bersama.",
            "Dua adalah prima terkecil. Mari kita pahami bersama.",
            "Ingat cara Pohon Faktor: Urai bilangan jadi faktor sampai semua prima."
          ],
          "papan": [
            "1 & n",
            "bukan 1",
            "3,5,7",
            "pohon"
          ]
        },
        {
          "id": "K5B2E-V1-2",
          "judul": "Saringan Eratosthenes",
          "ketukan": [
            "Hapus satu. Mari kita pahami bersama.",
            "Ambil dua, hapus kelipatannya. Mari kita pahami bersama.",
            "Ambil tiga, hapus kelipatannya. Mari kita pahami bersama.",
            "Di sini kita memakai ide Factor Tree — Urai bilangan jadi faktor sampai semua prima."
          ],
          "papan": [
            "hapus 1",
            "hapus ×2",
            "hapus ×3",
            "sisa prima"
          ]
        },
        {
          "id": "K5B2E-V1-3",
          "judul": "Lanjut saring",
          "ketukan": [
            "Lanjut lima dan tujuh. Mari kita pahami bersama.",
            "Sampai tidak ada yang bisa dihapus. Mari kita pahami bersama.",
            "Daftar prima siap. Mari kita pahami bersama.",
            "METODE LUAR · Pohon Faktor: Urai bilangan jadi faktor sampai semua prima."
          ],
          "papan": [
            "×5",
            "×7",
            "selesai",
            "siap"
          ]
        }
      ]
    },
    {
      "id": "K5B2E-V2",
      "judul": "Latihan: Ide Ayakan Prima",
      "subjudul": "Sieve Idea",
      "adegan": [
        {
          "id": "K5B2E-V2-1",
          "judul": "Contoh 12",
          "ketukan": [
            "Dua belas jadi dua kali enam. Mari kita pahami bersama.",
            "Enam jadi dua kali tiga. Mari kita pahami bersama.",
            "Semua prima: dua, dua, tiga. Mari kita pahami bersama.",
            "Ingat cara Ide Ayakan Prima: Prima hanya punya faktor 1 dan dirinya."
          ],
          "papan": [
            "12",
            "2×6",
            "2×3",
            "2×2×3"
          ]
        },
        {
          "id": "K5B2E-V2-2",
          "judul": "Contoh 30",
          "ketukan": [
            "Tiga puluh jadi dua kali lima belas. Mari kita pahami bersama.",
            "Lima belas jadi tiga kali lima. Mari kita pahami bersama.",
            "Hasil dua kali tiga kali lima. Mari kita pahami bersama.",
            "Di sini kita memakai ide Sieve Idea — Prima hanya punya faktor 1 dan dirinya."
          ],
          "papan": [
            "30",
            "2×15",
            "3×5",
            "2×3×5"
          ]
        },
        {
          "id": "K5B2E-V2-3",
          "judul": "Lebih besar",
          "ketukan": [
            "Seratus sembilan enam: dua dua tujuh tujuh. Mari kita pahami bersama.",
            "Tiga ratus: dua dua tiga lima lima. Mari kita pahami bersama.",
            "Urai sampai prima semua. Mari kita pahami bersama.",
            "METODE LUAR · Ide Ayakan Prima: Prima hanya punya faktor 1 dan dirinya."
          ],
          "papan": [
            "196",
            "300",
            "urai",
            "siap"
          ]
        }
      ]
    },
    {
      "id": "K5B2E-V3",
      "judul": "Siap pakai KPK FPB Bridge",
      "subjudul": "KPK FPB Bridge",
      "adegan": [
        {
          "id": "K5B2E-V3-1",
          "judul": "FPB pasangan",
          "ketukan": [
            "Tulis faktorisasi tujuh dua dan seratus lima puluh. Mari kita pahami bersama.",
            "Ambil prima yang berpasangan. Mari kita pahami bersama.",
            "Dua kali tiga. Mari kita pahami bersama.",
            "Ingat cara Jembatan KPK dan FPB: Faktorisasi prima dipakai bersama untuk KPK dan FPB."
          ],
          "papan": [
            "72 & 150",
            "pasangan",
            "2×3",
            "FPB=6"
          ]
        },
        {
          "id": "K5B2E-V3-2",
          "judul": "KPK pangkat max",
          "ketukan": [
            "Ambil semua prima. Mari kita pahami bersama.",
            "Pakai pangkat terbesar. Mari kita pahami bersama.",
            "Dua pangkat tiga, tiga pangkat dua, lima pangkat dua. Mari kita pahami bersama.",
            "Di sini kita memakai ide KPK FPB Bridge — Faktorisasi prima dipakai bersama untuk KPK dan FPB."
          ],
          "papan": [
            "semua prima",
            "pangkat max",
            "2³3²5²",
            "1800"
          ]
        },
        {
          "id": "K5B2E-V3-3",
          "judul": "Pembagian berulang",
          "ketukan": [
            "Bagi bersama dengan prima. Mari kita pahami bersama.",
            "Kalikan semua pembagi untuk KPK. Mari kita pahami bersama.",
            "Yang membagi keduanya untuk FPB. Mari kita pahami bersama.",
            "METODE LUAR · Jembatan KPK dan FPB: Faktorisasi prima dipakai bersama untuk KPK dan FPB."
          ],
          "papan": [
            "bagi berulang",
            "KPK",
            "FPB",
            "main"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Menentukan KPK dan FPB dengan Faktor Prima. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Factor Tree",
      "stepDesc": "Urai bilangan jadi faktor sampai semua prima.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Sieve Idea",
      "stepDesc": "Prima hanya punya faktor 1 dan dirinya.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. KPK FPB Bridge",
      "stepDesc": "Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
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
      "judul": "Prima",
      "emoji": "✨",
      "countNum": 1,
      "countWord": "1 & dirinya",
      "suara": "Bukan bilangan 1."
    },
    {
      "judul": "Saringan",
      "emoji": "🔍",
      "countNum": 1,
      "countWord": "Eratosthenes",
      "suara": "Hapus kelipatan."
    },
    {
      "judul": "12",
      "emoji": "🌳",
      "countNum": 12,
      "countWord": "2×2×3",
      "suara": "Faktorisasi."
    },
    {
      "judul": "30",
      "emoji": "🌳",
      "countNum": 30,
      "countWord": "2×3×5",
      "suara": "Contoh buku."
    },
    {
      "judul": "FPB",
      "emoji": "🏆",
      "countNum": 6,
      "countWord": "pasangan",
      "suara": "Pangkat min."
    },
    {
      "judul": "KPK",
      "emoji": "🎯",
      "countNum": 1800,
      "countWord": "1.800",
      "suara": "Pangkat max."
    },
    {
      "judul": "196",
      "emoji": "2️⃣",
      "countNum": 196,
      "countWord": "2²×7²",
      "suara": "Pohon besar."
    },
    {
      "judul": "300",
      "emoji": "3️⃣",
      "countNum": 300,
      "countWord": "2²×3×5²",
      "suara": "Pohon besar."
    },
    {
      "judul": "Bagi berulang",
      "emoji": "➗",
      "countNum": 1,
      "countWord": "cara lain",
      "suara": "Pembagi prima."
    },
    {
      "judul": "Bab 2 siap",
      "emoji": "✅",
      "countNum": 1,
      "countWord": "A–E",
      "suara": "Materi lengkap."
    },
    {
      "judul": "Pohon Faktor",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Urai bilangan jadi faktor sampai semua prima."
    },
    {
      "judul": "Ide Ayakan Prima",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Prima hanya punya faktor 1 dan dirinya."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "cek-prima",
      "title": "Cek Bilangan Prima",
      "bookReference": "hlm. 53–54",
      "objective": "Pakai Pohon Faktor: Urai bilangan jadi faktor sampai semua prima. Latihan: Mengenali prima..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Tree: Urai bilangan jadi faktor sampai semua prima.",
      "voiceGuide": "Pohon Faktor. Urai bilangan jadi faktor sampai semua prima.",
      "emoji": "✨",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "faktorisasi",
      "title": "Faktorisasi Prima",
      "bookReference": "hlm. 55–56",
      "objective": "Pakai Pohon Faktor: Urai bilangan jadi faktor sampai semua prima. Latihan: Menulis hasil kali prima..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Tree: Urai bilangan jadi faktor sampai semua prima.",
      "voiceGuide": "Pohon Faktor. Urai bilangan jadi faktor sampai semua prima.",
      "emoji": "🌳",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "kpk-fpb-prima",
      "title": "KPK & FPB via Prima",
      "bookReference": "hlm. 56–59",
      "objective": "Pakai Pohon Faktor: Urai bilangan jadi faktor sampai semua prima. Latihan: Hitung lewat faktorisasi..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Tree: Urai bilangan jadi faktor sampai semua prima.",
      "voiceGuide": "Pohon Faktor. Urai bilangan jadi faktor sampai semua prima.",
      "emoji": "🧮",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "arti-prima",
      "title": "Arti Prima & Cara",
      "bookReference": "hlm. 53–59",
      "objective": "Pakai Pohon Faktor: Urai bilangan jadi faktor sampai semua prima. Latihan: Definisi & metode..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Factor Tree: Urai bilangan jadi faktor sampai semua prima.",
      "voiceGuide": "Pohon Faktor. Urai bilangan jadi faktor sampai semua prima.",
      "emoji": "📖",
      "targetCount": 6
    },
    {
      "stage": "Concrete",
      "gameType": "sort-prima",
      "title": "Pilah Prima",
      "bookReference": "hlm. 53–54",
      "objective": "Memilah.. Ingat Pohon Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Pilah.",
      "emoji": "🧺",
      "targetCount": 18
    },
    {
      "stage": "Concrete",
      "gameType": "match-prima",
      "title": "Jodohkan Prima/Faktorisasi",
      "bookReference": "hlm. 53–59",
      "objective": "Menjodohkan.. Ingat Pohon Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Jodohkan.",
      "emoji": "🔗",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "memory-prima",
      "title": "Memori Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Memori.. Ingat Pohon Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Balik kartu.",
      "emoji": "🃏",
      "targetCount": 12
    },
    {
      "stage": "Concrete",
      "gameType": "tap-prima",
      "title": "Ketuk Prima/Hasil",
      "bookReference": "hlm. 53–59",
      "objective": "Mengetuk.. Ingat Pohon Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Ketuk.",
      "emoji": "👆",
      "targetCount": 9
    },
    {
      "stage": "Concrete",
      "gameType": "tap-all-prima",
      "title": "Ketuk Semua Benar Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Ketuk semua.. Ingat Pohon Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Ketuk semua.",
      "emoji": "✔️",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "story-prima",
      "title": "Cerita Saringan & Pohon",
      "bookReference": "hlm. 53–59",
      "objective": "Soal cerita.. Ingat Pohon Faktor.",
      "mechanicDescription": "Tiga ronde. Gunakan Pohon Faktor.",
      "voiceGuide": "Pohon Faktor. Pilih.",
      "emoji": "🔍",
      "targetCount": 6
    },
    {
      "stage": "Picture",
      "gameType": "diagram-saringan",
      "title": "Diagram Saringan",
      "bookReference": "hlm. 53–54",
      "objective": "Pakai Ide Ayakan Prima: Prima hanya punya faktor 1 dan dirinya. Latihan: Baca saringan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Sieve Idea: Prima hanya punya faktor 1 dan dirinya.",
      "voiceGuide": "Ide Ayakan Prima. Prima hanya punya faktor 1 dan dirinya.",
      "diagramType": "sieve",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-pohon",
      "title": "Diagram Pohon Faktor",
      "bookReference": "hlm. 55–56",
      "objective": "Pakai Ide Ayakan Prima: Prima hanya punya faktor 1 dan dirinya. Latihan: Baca pohon..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Sieve Idea: Prima hanya punya faktor 1 dan dirinya.",
      "voiceGuide": "Ide Ayakan Prima. Prima hanya punya faktor 1 dan dirinya.",
      "diagramType": "tree",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "diagram-kpkfpb",
      "title": "Diagram KPK/FPB Prima",
      "bookReference": "hlm. 56–59",
      "objective": "Pakai Ide Ayakan Prima: Prima hanya punya faktor 1 dan dirinya. Latihan: Baca hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Sieve Idea: Prima hanya punya faktor 1 dan dirinya.",
      "voiceGuide": "Ide Ayakan Prima. Prima hanya punya faktor 1 dan dirinya.",
      "diagramType": "lcmgcd",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "match-diagram-e",
      "title": "Jodohkan Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Pakai Ide Ayakan Prima: Prima hanya punya faktor 1 dan dirinya. Latihan: Jodohkan..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan Sieve Idea: Prima hanya punya faktor 1 dan dirinya.",
      "voiceGuide": "Ide Ayakan Prima. Prima hanya punya faktor 1 dan dirinya.",
      "diagramType": "match",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "memory-diagram-e",
      "title": "Memori Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Memori.. Ingat Ide Ayakan Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Balik kartu.",
      "diagramType": "mem",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "table-e",
      "title": "Tabel Prima & KPK/FPB",
      "bookReference": "hlm. 53–59",
      "objective": "Isi tabel.. Ingat Ide Ayakan Prima.",
      "mechanicDescription": "Tiga tabel. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Pilih.",
      "diagramType": "table",
      "numberA": 1,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "tap-all-pe",
      "title": "Ketuk Semua Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Ketuk semua.. Ingat Ide Ayakan Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Ketuk semua.",
      "diagramType": "select",
      "numberA": 1,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "sort-diagram-e",
      "title": "Pilah Diagram E",
      "bookReference": "hlm. 53–54",
      "objective": "Pilah.. Ingat Ide Ayakan Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Pilah.",
      "diagramType": "sort",
      "numberA": 1,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "choose-e",
      "title": "Pilih Pernyataan E",
      "bookReference": "hlm. 53–59",
      "objective": "Pilih.. Ingat Ide Ayakan Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Pilih.",
      "diagramType": "choose",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "story-picture-e",
      "title": "Cerita Diagram E",
      "bookReference": "hlm. 53–59",
      "objective": "Cerita.. Ingat Ide Ayakan Prima.",
      "mechanicDescription": "Tiga ronde. Gunakan Ide Ayakan Prima.",
      "voiceGuide": "Ide Ayakan Prima. Pilih.",
      "diagramType": "story",
      "numberA": 1,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "write-prima",
      "title": "Tulis Cek Prima",
      "bookReference": "hlm. 53–54",
      "objective": "Pakai Jembatan KPK dan FPB: Faktorisasi prima dipakai bersama untuk KPK dan FPB. Latihan: Menulis..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan KPK FPB Bridge: Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "symbolLarge": "p?",
      "wordLarge": "PRIMA",
      "mathNotation": "cek"
    },
    {
      "stage": "Abstract",
      "gameType": "write-fakt",
      "title": "Tulis Faktorisasi",
      "bookReference": "hlm. 55–56",
      "objective": "Pakai Jembatan KPK dan FPB: Faktorisasi prima dipakai bersama untuk KPK dan FPB. Latihan: Menulis uraian..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan KPK FPB Bridge: Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "symbolLarge": "2×3",
      "wordLarge": "FAKTORISASI",
      "mathNotation": "pohon"
    },
    {
      "stage": "Abstract",
      "gameType": "write-kpkfpb",
      "title": "Tulis KPK/FPB Prima",
      "bookReference": "hlm. 56–59",
      "objective": "Pakai Jembatan KPK dan FPB: Faktorisasi prima dipakai bersama untuk KPK dan FPB. Latihan: Menulis hasil..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan KPK FPB Bridge: Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "symbolLarge": "KPK/FPB",
      "wordLarge": "HASIL",
      "mathNotation": "prima"
    },
    {
      "stage": "Abstract",
      "gameType": "order-abstract-e",
      "title": "Urutkan Abstrak E",
      "bookReference": "hlm. 53–59",
      "objective": "Pakai Jembatan KPK dan FPB: Faktorisasi prima dipakai bersama untuk KPK dan FPB. Latihan: Urut..",
      "mechanicDescription": "Tiga ronde. Saat bermain, terapkan KPK FPB Bridge: Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "symbolLarge": "naik",
      "wordLarge": "URUT",
      "mathNotation": "nilai"
    },
    {
      "stage": "Abstract",
      "gameType": "match-abstract-e",
      "title": "Jodohkan Notasi E",
      "bookReference": "hlm. 53–59",
      "objective": "Jodohkan.. Ingat Jembatan KPK dan FPB.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Jodohkan.",
      "symbolLarge": "p",
      "wordLarge": "JODOH",
      "mathNotation": "teks"
    },
    {
      "stage": "Abstract",
      "gameType": "memory-abstract-e",
      "title": "Memori Notasi E",
      "bookReference": "hlm. 53–59",
      "objective": "Memori.. Ingat Jembatan KPK dan FPB.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Balik kartu.",
      "symbolLarge": "prima",
      "wordLarge": "MEMORI",
      "mathNotation": "notasi"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-e",
      "title": "Benar atau Salah: Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Menilai.. Ingat Jembatan KPK dan FPB.",
      "mechanicDescription": "Dua ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Benar/salah.",
      "symbolLarge": "✓ ✗",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "alasan"
    },
    {
      "stage": "Abstract",
      "gameType": "detective-e",
      "title": "Detektif Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Petunjuk.. Ingat Jembatan KPK dan FPB.",
      "mechanicDescription": "Tiga soal. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Pilih.",
      "symbolLarge": "?",
      "wordLarge": "DETEKTIF",
      "mathNotation": "petunjuk"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-e",
      "title": "Peta Konsep Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Peta.. Ingat Jembatan KPK dan FPB.",
      "mechanicDescription": "Satu peta. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Pilih opsi.",
      "symbolLarge": "🗺️",
      "wordLarge": "PETA",
      "mathNotation": "konsep"
    },
    {
      "stage": "Abstract",
      "gameType": "story-abstract-e",
      "title": "Cerita Angka Prima",
      "bookReference": "hlm. 53–59",
      "objective": "Cerita.. Ingat Jembatan KPK dan FPB.",
      "mechanicDescription": "Tiga ronde. Gunakan Jembatan KPK dan FPB.",
      "voiceGuide": "Jembatan KPK dan FPB. Pilih.",
      "symbolLarge": "📖",
      "wordLarge": "CERITA",
      "mathNotation": "teks"
    }
  ],
  "poin": [
    {
      "ikon": "✨",
      "nama": "Prima",
      "isi": "Hanya dibagi satu dan dirinya; satu bukan prima.",
      "suara": "Kenali bilangan prima."
    },
    {
      "ikon": "🌳",
      "nama": "Faktorisasi",
      "isi": "Tulis bilangan sebagai hasil kali prima.",
      "suara": "Pakai pohon faktor."
    },
    {
      "ikon": "🌍",
      "nama": "Pohon Faktor",
      "isi": "Urai bilangan jadi faktor sampai semua prima.",
      "suara": "Pohon Faktor. Urai bilangan jadi faktor sampai semua prima."
    },
    {
      "ikon": "🌍",
      "nama": "Ide Ayakan Prima",
      "isi": "Prima hanya punya faktor 1 dan dirinya.",
      "suara": "Ide Ayakan Prima. Prima hanya punya faktor 1 dan dirinya."
    },
    {
      "ikon": "🌍",
      "nama": "Jembatan KPK dan FPB",
      "isi": "Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "suara": "Jembatan KPK dan FPB. Faktorisasi prima dipakai bersama untuk KPK dan FPB."
    }
  ],
  "poinSuara": "Ingat: Pohon Faktor, Ide Ayakan Prima, Jembatan KPK dan FPB.",
  "cara": {
    "suara": "Ikuti langkah-langkahnya.",
    "potongan": [
      {
        "teks": "Saring prima",
        "warna": "#FDE68A"
      },
      {
        "teks": "buat pohon",
        "warna": "#BBF7D0"
      },
      {
        "teks": "tulis faktorisasi",
        "warna": "#BFDBFE"
      },
      {
        "teks": "ambil min/max",
        "warna": "#FCE7F3"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Pohon Faktor pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Pohon Faktor membantumu memahami soal?",
    "Kapan kamu memakai Ide Ayakan Prima?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Factor Tree",
      "namaId": "Pohon Faktor",
      "asal": "Prime factorization pedagogy",
      "ringkas": "Urai bilangan jadi faktor sampai semua prima.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Sieve Idea",
      "namaId": "Ide Ayakan Prima",
      "asal": "Sieve of Eratosthenes (disederhanakan)",
      "ringkas": "Prima hanya punya faktor 1 dan dirinya.",
      "tahap": [
        "Mind",
        "Infografis",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "KPK FPB Bridge",
      "namaId": "Jembatan KPK dan FPB",
      "asal": "Number theory relation",
      "ringkas": "Faktorisasi prima dipakai bersama untuk KPK dan FPB.",
      "tahap": [
        "Picture",
        "Abstract"
      ]
    }
  ]
};

export const SUB_BAB_K5B2: SubBabNaskah[] = [SUB_A52, SUB_B52, SUB_C52, SUB_D52, SUB_E52];
export const semuaAdeganK5B2 = SUB_BAB_K5B2.flatMap((s) => s.videos.flatMap((v) => v.adegan));
