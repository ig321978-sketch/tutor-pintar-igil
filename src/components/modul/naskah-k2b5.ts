/**
 * Naskah — rewrite mendalam.
 * Metode luar dianyam ke Story, peta, infografis, poin, dan meta permainan.
 */
import type { SubBabNaskah } from "./naskah-k2b2";

export const K2B5_META = {
  "chapterId": "k2-mat-bab5",
  "phaseCode": "FASE_A",
  "grade": 2,
  "subjectLabel": "MATEMATIKA - KELAS 2 SD",
  "title": "BAB 5: PECAHAN",
  "silabusElemen": "🌈 Fase A • Elemen Bilangan: Pecahan (Kelas 2 SD/MI)",
  "suaraLaju": 0.7,
  "suaraNada": 1
} as const;

export const SUB_A5: SubBabNaskah = {
  "id": "A",
  "codeTitle": "Sub-Bab A (Setengah dari Benda Utuh)",
  "fullTitle": "Sub-Bab A: Setengah dari Benda Utuh",
  "targetDescription": "Siswa membagi satu benda utuh menjadi dua bagian sama besar, menyebut setiap bagian sebagai setengah, menemukan setengah pada benda di sekitar, melipat kertas untuk menemukan setengah dengan beberapa cara, serta membedakan bagian yang sama besar dari bagian yang tidak sama besar. Siswa memakai cara Setengah Benda Utuh, Bagian Sama, Uji Lipat.",
  "secondaryBg": "#DBEAFE",
  "secondaryBorder": "#2563EB",
  "secondaryText": "#1E3A8A",
  "silabus": {
    "teksSuara": "Kita belajar pecahan. Bukunya bernama Pecahan, bagian setengah dari benda utuh. Kira membagi martabak manis dengan Tika secara adil, jadi martabaknya harus dipotong menjadi dua bagian yang sama besar. Setiap bagian dinamakan setengah. Kita juga melipat kertas dan memeriksa gambar mana yang menunjukkan setengah. Kita memakai cara dari luar buku: Setengah Benda Utuh (Halving Whole); Bagian Sama (Equal Parts); Uji Lipat (Fold Test). Bagi benda menjadi dua bagian sama. Setengah hanya jika bagian sama besar. Lipat membuktikan dua bagian sama. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menunjukkan setengah dari benda utuh dengan membagi benda menjadi dua bagian sama besar, menemukan contoh setengah di sekitar, menjelaskan bahwa bagian yang tidak sama besar bukan setengah, serta menyampaikan pendapat dengan percaya diri.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 5 Sub-Bab A)."
  },
  "videos": [
    {
      "id": "K2B5A-V1",
      "judul": "Berbagi Martabak",
      "subjudul": "Halving Whole",
      "adegan": [
        {
          "id": "K2B5A-V1-1",
          "judul": "Oleh-oleh martabak",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Ibu memberi Kira oleh-oleh martabak manis. Mari kita pahami bersama.",
            "Kira sangat senang. Ia teringat kepada Tika yang juga suka martabak manis.",
            "Kira membawa martabak manisnya ke rumah Tika. Mari kita pahami bersama.",
            "Ingat cara Setengah Benda Utuh: Bagi benda menjadi dua bagian sama."
          ],
          "papan": [
            "Martabak manis",
            "Ingat Tika",
            "Ke rumah Tika",
            "Bagi sama banyak"
          ]
        },
        {
          "id": "K2B5A-V1-2",
          "judul": "Pesan Ibu",
          "ketukan": [
            "Ibu berpesan agar Kira membagi martabaknya dengan Tika secara adil. Mari kita pahami bersama.",
            "Ibu juga berpesan agar Kira berhati-hati saat menggunakan pisau. Mari kita pahami bersama.",
            "Kira menggunakan pisau yang aman untuk anak-anak. Mari kita pahami bersama.",
            "Di sini kita memakai ide Halving Whole — Bagi benda menjadi dua bagian sama."
          ],
          "papan": [
            "Bagi secara adil",
            "Hati-hati pisau",
            "Pisau yang aman",
            "setengah"
          ]
        },
        {
          "id": "K2B5A-V1-3",
          "judul": "Bagaimana memotongnya?",
          "ketukan": [
            "Bagaimana cara kita membagi martabak agar potongannya sama besar. Mari kita pahami bersama.",
            "Kalau potongannya tidak sama besar, salah satu teman akan mendapat lebih sedikit.",
            "Karena itu, kita perlu memotong tepat di tengah martabak. Mari kita pahami bersama.",
            "METODE LUAR · Setengah Benda Utuh: Bagi benda menjadi dua bagian sama."
          ],
          "papan": [
            "Sama besar?",
            "Tidak sama besar",
            "Potong di tengah",
            "setengah"
          ]
        }
      ]
    },
    {
      "id": "K2B5A-V2",
      "judul": "Latihan: Bagian Sama",
      "subjudul": "Equal Parts",
      "adegan": [
        {
          "id": "K2B5A-V2-1",
          "judul": "Memotong menjadi dua",
          "ketukan": [
            "Perhatikan martabak manis ini. Mari kita pahami bersama.",
            "Kita dapat memotongnya menjadi dua bagian sama besar. Mari kita pahami bersama.",
            "Kita memotong satu martabak utuh menjadi dua bagian sama besar. Mari kita pahami bersama.",
            "Ingat cara Bagian Sama: Setengah hanya jika bagian sama besar."
          ],
          "papan": [
            "Martabak utuh",
            "Dua bagian sama besar",
            "Satu jadi dua",
            "Bernilai setengah"
          ]
        },
        {
          "id": "K2B5A-V2-2",
          "judul": "Setengah di sekitar kita",
          "ketukan": [
            "Kita dapat menemukan setengah benda di sekitar. Mari kita pahami bersama.",
            "Ada setengah semangka dan setengah kue bolu. Mari kita pahami bersama.",
            "Ada juga setengah gelas air dan setengah sendok gula. Mari kita pahami bersama.",
            "Lipatan kertas juga dapat menunjukkan setengah. Mari kita pahami bersama.",
            "Di sini kita memakai ide Equal Parts — Setengah hanya jika bagian sama besar."
          ],
          "papan": [
            "Setengah di sekitar",
            "Semangka dan bolu",
            "Gelas dan sendok",
            "Lipatan kertas",
            "Cari contoh lain"
          ]
        },
        {
          "id": "K2B5A-V2-3",
          "judul": "Ayo melipat kertas",
          "ketukan": [
            "Ambil selembar kertas berbentuk persegi. Mari kita pahami bersama.",
            "Lipat kertas itu menjadi dua bagian sama besar. Mari kita pahami bersama.",
            "Kamu bisa melipatnya tegak, mendatar, atau miring dari pojok ke pojok.",
            "METODE LUAR · Bagian Sama: Setengah hanya jika bagian sama besar."
          ],
          "papan": [
            "Kertas persegi",
            "Lipat sama besar",
            "Banyak cara melipat",
            "Setengah bagian"
          ]
        }
      ]
    },
    {
      "id": "K2B5A-V3",
      "judul": "Siap pakai Fold Test",
      "subjudul": "Fold Test",
      "adegan": [
        {
          "id": "K2B5A-V3-1",
          "judul": "Memotong lingkaran",
          "ketukan": [
            "Kita dapat memotong lingkaran menjadi dua sama besar. Mari kita pahami bersama.",
            "Garis potongnya bisa tegak, mendatar, atau miring, asalkan lewat titik tengah.",
            "Hasilnya selalu setengah. Mari kita pahami bersama.",
            "Ingat cara Uji Lipat: Lipat membuktikan dua bagian sama."
          ],
          "papan": [
            "Lingkaran dua bagian",
            "Lewat titik tengah",
            "Hasilnya setengah",
            "uji"
          ]
        },
        {
          "id": "K2B5A-V3-2",
          "judul": "Memotong segi empat",
          "ketukan": [
            "Kita juga dapat memotong segi empat menjadi dua sama besar. Mari kita pahami bersama.",
            "Potongan tegak, mendatar, atau dari pojok ke pojok menghasilkan setengah.",
            "Setiap potongan itu bernilai setengah. Mari kita pahami bersama.",
            "Di sini kita memakai ide Fold Test — Lipat membuktikan dua bagian sama."
          ],
          "papan": [
            "Segi empat dua bagian",
            "Tiga cara memotong",
            "Bernilai setengah",
            "uji"
          ]
        },
        {
          "id": "K2B5A-V3-3",
          "judul": "Gambar A dan gambar B",
          "ketukan": [
            "Perhatikan dua gambar segi empat ini. Mari kita pahami bersama.",
            "Gambar A dipotong menjadi dua bagian sama besar, jadi gambar A menunjukkan setengah.",
            "Gambar B dipotong tidak sama besar, jadi gambar B bukan setengah. Mari kita pahami bersama.",
            "METODE LUAR · Uji Lipat: Lipat membuktikan dua bagian sama."
          ],
          "papan": [
            "Gambar A dan B",
            "A: setengah",
            "B: bukan setengah",
            "Dua yang sama besar"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Setengah dari Benda Utuh. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Halving Whole",
      "stepDesc": "Bagi benda menjadi dua bagian sama.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Equal Parts",
      "stepDesc": "Setengah hanya jika bagian sama besar.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Fold Test",
      "stepDesc": "Lipat membuktikan dua bagian sama.",
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
      "judul": "Berbagi Martabak",
      "emoji": "🥞",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Kira membagi martabak manis dengan Tika. Agar adil, martabak dipotong menjadi dua bagian yang sama besar. Satu bagian untuk Kira dan satu bagian untuk Tika."
    },
    {
      "judul": "Setengah Itu Apa?",
      "emoji": "🍰",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Satu benda utuh dipotong menjadi dua bagian sama besar. Setiap hasil potongannya bernilai setengah. Kata kuncinya adalah dua bagian dan sama besar."
    },
    {
      "judul": "Setengah di Sekitar Kita",
      "emoji": "🍉",
      "countNum": 5,
      "countWord": "Lima",
      "suara": "Kita dapat menemukan setengah di sekitar. Ada setengah semangka, setengah gelas air, setengah sendok gula, setengah kue bolu, dan setengah lipatan kertas."
    },
    {
      "judul": "Melipat Kertas",
      "emoji": "📄",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Kertas persegi dapat dilipat menjadi dua bagian sama besar dengan empat cara. Lipat tegak, lipat mendatar, dan dua cara lipat miring dari pojok ke pojok."
    },
    {
      "judul": "Setengah pada Segi Empat",
      "emoji": "🟥",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Segi empat dapat dibagi menjadi dua sama besar dengan garis tegak, garis mendatar, atau garis miring dari pojok ke pojok. Ketiganya menghasilkan setengah."
    },
    {
      "judul": "Setengah pada Lingkaran",
      "emoji": "⭕",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Lingkaran dapat dibagi menjadi dua sama besar oleh garis tegak, mendatar, atau miring, asalkan garis itu lewat titik tengah lingkaran."
    },
    {
      "judul": "Gambar A dan Gambar B",
      "emoji": "✅",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Gambar A dibagi menjadi dua bagian sama besar, jadi gambar A menunjukkan setengah. Gambar B dibagi tidak sama besar, jadi gambar B bukan setengah."
    },
    {
      "judul": "Setengah Gelas Air",
      "emoji": "🥛",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Setengah gelas air berarti airnya mengisi separuh gelas. Bagian yang berisi air sama tingginya dengan bagian yang kosong. Kalau dituang ke gelas lain yang sama, kedua gelas sama banyak."
    },
    {
      "judul": "Tiga Pertanyaan Pemeriksa",
      "emoji": "🔍",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tiga pertanyaan pemeriksa setengah. Satu, apakah dibagi menjadi dua bagian. Dua, apakah kedua bagian sama besar. Tiga, apakah yang ditunjukkan satu bagian itu."
    },
    {
      "judul": "Dua Setengah, Satu Utuh",
      "emoji": "🧩",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Dua setengah disatukan kembali menjadi satu benda utuh. Setengah ditambah setengah sama dengan satu utuh. Setengah ditulis dengan lambang setengah."
    },
    {
      "judul": "Setengah Benda Utuh",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Bagi benda menjadi dua bagian sama."
    },
    {
      "judul": "Bagian Sama",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Setengah hanya jika bagian sama besar."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "choose-fair-cuts",
      "title": "Potongan yang Adil",
      "bookReference": "hlm. 127–128 (Berbagi Sama Banyak; memotong satu martabak utuh menjadi dua bagian sama besar)",
      "objective": "Pakai Setengah Benda Utuh: Bagi benda menjadi dua bagian sama. Latihan: Memilih cara memotong benda nyata yang menghasilkan dua bagian sama besar dan menolak yang tidak sama besar..",
      "mechanicDescription": "Empat ronde (martabak, kue bolu, roti, pizza). Tiap ronde menampilkan enam gambar benda dengan garis potong berbeda. Siswa mengetuk semua potongan yang adil, yaitu yang membagi benda menjadi dua bagian sama besar, lalu menekan Periksa. Luas bagian dihitung oleh program sehingga potongan yang nyaris tengah pun diperiksa dengan teliti. Saat bermain, terapkan Halving Whole: Bagi benda menjadi dua bagian sama.",
      "voiceGuide": "Setengah Benda Utuh. Bagi benda menjadi dua bagian sama.",
      "emoji": "🥞",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "fold-paper-symmetry",
      "title": "Lipat Kertas",
      "bookReference": "hlm. 130 (Ayo Mencoba: lipat kertas menjadi dua bagian sama besar dan tunjukkan setengah)",
      "objective": "Pakai Setengah Benda Utuh: Bagi benda menjadi dua bagian sama. Latihan: Menemukan semua cara melipat kertas menjadi dua bagian yang saling menutup pas dan menyebut bentuk hasilnya..",
      "mechanicDescription": "Tiga ronde (kertas persegi, kertas lingkaran, kertas segitiga). Siswa memilih garis lipat dari daftar. Bagian yang dilipat tampak menutupi bagian lain. Bila pas, lipatan diterima dan bentuk hasilnya disebut. Bila ada yang menonjol, lipatan ditolak. Persegi punya empat cara, lingkaran banyak cara, segitiga hanya satu cara. Saat bermain, terapkan Halving Whole: Bagi benda menjadi dua bagian sama.",
      "voiceGuide": "Setengah Benda Utuh. Bagi benda menjadi dua bagian sama.",
      "emoji": "📄",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "pour-equal-glasses",
      "title": "Tuang Setengah",
      "bookReference": "hlm. 129 (setengah gelas air, setengah sendok gula; menemukan setengah benda di sekitar)",
      "objective": "Pakai Setengah Benda Utuh: Bagi benda menjadi dua bagian sama. Latihan: Menuang cairan dari satu wadah penuh ke wadah kedua yang sama sampai kedua wadah sama banyak, yaitu masing-masing setengah..",
      "mechanicDescription": "Tiga ronde (gelas air, botol jus, gelas sirup). Satu wadah penuh dan satu kosong. Siswa menekan Tuang untuk memindahkan satu takaran, dan Tuang Balik untuk mengembalikannya. Layar tidak memuat angka. Siswa berhenti ketika tinggi cairan kedua wadah sama, lalu menekan Periksa. Saat bermain, terapkan Halving Whole: Bagi benda menjadi dua bagian sama.",
      "voiceGuide": "Setengah Benda Utuh. Bagi benda menjadi dua bagian sama.",
      "emoji": "🥛",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "find-half-objects",
      "title": "Cari Setengah di Sekitar",
      "bookReference": "hlm. 129 (setengah semangka, setengah gelas air, setengah kue bolu; amati sekitar dan temukan contoh lain)",
      "objective": "Pakai Setengah Benda Utuh: Bagi benda menjadi dua bagian sama. Latihan: Menemukan benda atau wadah yang tinggal tepat setengah di antara benda yang tinggal seperempat, tiga perempat, utuh, atau tidak sama besar..",
      "mechanicDescription": "Dua ronde, tiap ronde delapan benda dan gelas (semangka, apel, kue bolu, roti, puding, pizza, jeruk, gelas air, dan gelas jus). Siswa mengetuk semua yang tinggal tepat setengah. Benda yang salah memberi penjelasan bagian yang tersisa. Saat bermain, terapkan Halving Whole: Bagi benda menjadi dua bagian sama.",
      "voiceGuide": "Setengah Benda Utuh. Bagi benda menjadi dua bagian sama.",
      "emoji": "🍉",
      "targetCount": 2
    },
    {
      "stage": "Picture",
      "gameType": "color-half-faces",
      "title": "Warnai Setengah",
      "bookReference": "hlm. 132–133 (Ayo Berlatih nomor 1 dan 2: warnailah setengah dari setiap gambar)",
      "objective": "Mewarnai bagian gambar sehingga yang diwarnai tepat setengah dari seluruh gambar.. Ingat Setengah Benda Utuh.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar polos (segitiga, lingkaran, persegi panjang, segi lima, bentuk hati, belah ketupat, persegi). Gambar sudah dibagi menjadi bagian yang sama besar. Pada ronde terakhir gambar dibagi menjadi empat bagian sama besar, dan siswa harus mewarnai dua bagian. Luas yang diwarnai dihitung program, lalu siswa menekan Periksa. Gunakan Setengah Benda Utuh.",
      "voiceGuide": "Setengah Benda Utuh. Ketuk bagian gambar untuk mewarnai sampai tepat setengah.",
      "diagramType": "shaded-faces",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "draw-dividing-line",
      "title": "Tarik Garis Jadi Dua",
      "bookReference": "hlm. 134 (Ayo Berlatih nomor 4: tarik garis sehingga gambar menjadi dua bagian sama besar, lalu warnai setengahnya)",
      "objective": "Menarik satu garis lewat dua titik sehingga bangun terbagi menjadi dua bagian sama besar, lalu mewarnai setengahnya.. Ingat Setengah Benda Utuh.",
      "mechanicDescription": "Empat ronde (persegi panjang, segitiga, lingkaran, trapesium). Siswa mengetuk dua titik pada tepi bangun untuk menarik satu garis. Garis yang berimpit dengan tepi atau membuat bagian tidak sama besar ditolak dengan petunjuk. Bila sah, siswa mewarnai satu bagian sebagai setengah. Gunakan Setengah Benda Utuh.",
      "voiceGuide": "Setengah Benda Utuh. Ketuk dua titik untuk menarik garis, lalu warnai setengahnya.",
      "diagramType": "dividing-line",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Picture",
      "gameType": "classify-shaded-figures",
      "title": "Setengah atau Bukan?",
      "bookReference": "hlm. 133–134 (Ayo Berlatih nomor 3 dan 5: kelompokkan gambar yang setengah dan bukan setengah dalam tabel)",
      "objective": "Mengelompokkan gambar bagian berwarna menjadi yang menunjukkan setengah dan yang bukan setengah.. Ingat Setengah Benda Utuh.",
      "mechanicDescription": "Delapan gambar bertanda huruf A sampai H (persegi panjang, segitiga, lingkaran, bentuk hati, bintang, segi enam). Siswa menyeret atau mengetuk tiap gambar ke kolom Setengah atau Bukan Setengah pada tabel. Gambar yang salah kembali dengan penjelasan bahwa bagian berwarna lebih kecil atau lebih besar dari setengah. Gunakan Setengah Benda Utuh.",
      "voiceGuide": "Setengah Benda Utuh. Taruh tiap gambar ke kolom Setengah atau Bukan Setengah.",
      "diagramType": "classify-table",
      "numberA": 8,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "fill-sentence-blanks",
      "title": "Isi Kalimat Setengah",
      "bookReference": "hlm. 128 dan 132 (satu benda utuh dipotong menjadi dua bagian sama besar, setiap hasil potongan bernilai setengah)",
      "objective": "Melengkapi kalimat tentang setengah dengan banyak bagian, nama pecahan, lambang, dan syarat sama besar.. Ingat Setengah Benda Utuh.",
      "mechanicDescription": "Dua ronde, tiap ronde tiga kalimat dengan bagian kosong. Contoh: satu martabak utuh dipotong menjadi ... bagian sama besar. Siswa memilih satu dari tiga kartu untuk tiap bagian kosong. Kalimat yang lengkap dibacakan Suara Guru. Gunakan Setengah Benda Utuh.",
      "voiceGuide": "Setengah Benda Utuh. Pilih kartu yang tepat untuk bagian kosong.",
      "symbolLarge": "½",
      "wordLarge": "SETENGAH",
      "mathNotation": "1 dari 2 bagian sama besar"
    },
    {
      "stage": "Abstract",
      "gameType": "true-false-statements",
      "title": "Benar atau Salah?",
      "bookReference": "hlm. 128–134 (setengah, sama besar, melipat, lingkaran dan segi empat)",
      "objective": "Menilai kebenaran pernyataan tentang setengah dan menjelaskan alasannya.. Ingat Setengah Benda Utuh.",
      "mechanicDescription": "Dua ronde, masing-masing lima pernyataan. Siswa menekan Benar atau Salah. Jawaban yang keliru dijelaskan alasannya dan boleh dicoba lagi. Gunakan Setengah Benda Utuh.",
      "voiceGuide": "Setengah Benda Utuh. Baca pernyataan, lalu tekan Benar atau Salah.",
      "symbolLarge": "✔ ✘",
      "wordLarge": "BENAR SALAH",
      "mathNotation": "setengah = dua bagian sama besar"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Setengah",
      "bookReference": "hlm. 149 (Coba Pikirkan: isilah diagram setengah)",
      "objective": "Melengkapi peta konsep setengah dengan definisi, contoh, bukan contoh, dan pendapat sendiri.. Ingat Setengah Benda Utuh.",
      "mechanicDescription": "Dua peta konsep, satu untuk setengah dari benda utuh dan satu untuk setengah dari kumpulan benda. Tiap peta punya empat kotak: definisi, contoh, bukan contoh, dan pendapatku. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Setengah Benda Utuh.",
      "voiceGuide": "Setengah Benda Utuh. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "½",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "definisi • contoh • bukan contoh"
    }
  ],
  "poin": [
    {
      "ikon": "🍰",
      "nama": "Setengah",
      "isi": "satu dari dua bagian sama besar",
      "suara": "Setengah adalah satu dari dua bagian yang sama besar. Satu benda utuh dipotong menjadi dua sama besar, setiap bagian bernilai setengah."
    },
    {
      "ikon": "⚖️",
      "nama": "Sama besar",
      "isi": "dua bagian harus sama besar",
      "suara": "Dua bagian harus sama besar. Kalau tidak sama besar, bagian itu bukan setengah. Periksa dengan melipat atau menumpuk."
    },
    {
      "ikon": "🌍",
      "nama": "Setengah Benda Utuh",
      "isi": "Bagi benda menjadi dua bagian sama.",
      "suara": "Setengah Benda Utuh. Bagi benda menjadi dua bagian sama."
    },
    {
      "ikon": "🌍",
      "nama": "Bagian Sama",
      "isi": "Setengah hanya jika bagian sama besar.",
      "suara": "Bagian Sama. Setengah hanya jika bagian sama besar."
    },
    {
      "ikon": "🌍",
      "nama": "Uji Lipat",
      "isi": "Lipat membuktikan dua bagian sama.",
      "suara": "Uji Lipat. Lipat membuktikan dua bagian sama."
    }
  ],
  "poinSuara": "Ingat: Setengah Benda Utuh, Bagian Sama, Uji Lipat.",
  "cara": {
    "suara": "Cara menyebutkan. Martabak dipotong menjadi dua bagian sama besar, setiap bagian adalah setengah martabak.",
    "potongan": [
      {
        "teks": "Dua bagian",
        "warna": "#FFFFFF"
      },
      {
        "teks": "sama besar",
        "warna": "#FFE566"
      },
      {
        "teks": "adalah",
        "warna": "#FFFFFF"
      },
      {
        "teks": "setengah",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Setengah Benda Utuh pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Setengah Benda Utuh membantumu memahami soal?",
    "Kapan kamu memakai Bagian Sama?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Halving Whole",
      "namaId": "Setengah Benda Utuh",
      "asal": "Early fractions",
      "ringkas": "Bagi benda menjadi dua bagian sama.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Equal Parts",
      "namaId": "Bagian Sama",
      "asal": "Fraction foundation",
      "ringkas": "Setengah hanya jika bagian sama besar.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fold Test",
      "namaId": "Uji Lipat",
      "asal": "Paper folding",
      "ringkas": "Lipat membuktikan dua bagian sama.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_B5: SubBabNaskah = {
  "id": "B",
  "codeTitle": "Sub-Bab B (Setengah dari Kumpulan Benda)",
  "fullTitle": "Sub-Bab B: Setengah dari Kumpulan Benda",
  "targetDescription": "Siswa menemukan setengah dari sekumpulan benda dengan membagi benda menjadi dua kelompok yang sama banyak, memeriksa kelompok yang bukan setengah, menemukan pola setengah dari 4, 6, 8, dan 10, serta menyadari bahwa banyak benda yang tidak bisa dibagi dua sama banyak tidak punya setengah utuh. Siswa memakai cara Setengah Kumpulan, Bagi Rata Kumpulan, Cek Genap.",
  "secondaryBg": "#FCE7F3",
  "secondaryBorder": "#DB2777",
  "secondaryText": "#831843",
  "silabus": {
    "teksSuara": "Kita belajar setengah dari kumpulan benda. Malosi mempunyai empat kelereng dan ingin memberi setengahnya kepada Upe. Kita membagi kelereng menjadi dua kelompok yang sama banyak, satu untuk Upe dan satu untuk Malosi. Kita juga memeriksa kelompok yang bukan setengah dan mencari pola. Kita memakai cara dari luar buku: Setengah Kumpulan (Half of Set); Bagi Rata Kumpulan (Fair Share Set); Cek Genap (Even Check). Ambil setengah dari banyak benda. Bagi dua kelompok sama banyak. Kumpulan genap mudah dibagi dua. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menunjukkan setengah dari sekumpulan benda dengan membagi benda menjadi dua kelompok sama banyak, membedakan kelompok yang menunjukkan setengah dari yang bukan, serta menjelaskan cara menemukan hasilnya.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 5 Sub-Bab B)."
  },
  "videos": [
    {
      "id": "K2B5B-V1",
      "judul": "Kelereng Malosi",
      "subjudul": "Half of Set",
      "adegan": [
        {
          "id": "K2B5B-V1-1",
          "judul": "Malosi dan Upe bermain",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Malosi dan Upe akan bermain kelereng bersama. Mari kita pahami bersama.",
            "Malosi mempunyai 4 kelereng. Upe tidak membawa kelereng. Mari kita pahami bersama.",
            "Malosi ingin memberikan setengah dari kelerengnya kepada Upe. Mari kita pahami bersama.",
            "Ingat cara Setengah Kumpulan: Ambil setengah dari banyak benda."
          ],
          "papan": [
            "Bermain kelereng",
            "Malosi: 4 kelereng",
            "Beri setengah",
            "Upe dapat berapa?"
          ]
        },
        {
          "id": "K2B5B-V1-2",
          "judul": "Membagi bergantian",
          "ketukan": [
            "Mula-mula ada 4 kelereng. Kelereng akan dibagi sama banyak untuk Upe dan Malosi.",
            "Kita ambil 2 kelereng. Satu untuk Upe dan satu untuk Malosi. Tersisa 2 kelereng.",
            "Kita ambil lagi 2 kelereng. Satu untuk Upe dan satu untuk Malosi. Mari kita pahami bersama.",
            "Di sini kita memakai ide Half of Set — Ambil setengah dari banyak benda."
          ],
          "papan": [
            "Ada 4 kelereng",
            "Ambil 2, sisa 2",
            "Ambil 2 lagi",
            "Masing-masing 2"
          ]
        },
        {
          "id": "K2B5B-V1-3",
          "judul": "Jadi, setengahnya",
          "ketukan": [
            "Kita dapat menemukan setengah dari sekumpulan benda. Mari kita pahami bersama.",
            "Kita mengelompokkan benda-benda itu menjadi dua bagian sama banyak. Mari kita pahami bersama.",
            "Jadi, setengah dari 4 kelereng adalah 2 kelereng. Mari kita pahami bersama.",
            "METODE LUAR · Setengah Kumpulan: Ambil setengah dari banyak benda."
          ],
          "papan": [
            "Setengah kumpulan",
            "Dua kelompok sama banyak",
            "Setengah dari 4 = 2",
            "setengah"
          ]
        }
      ]
    },
    {
      "id": "K2B5B-V2",
      "judul": "Latihan: Bagi Rata Kumpulan",
      "subjudul": "Fair Share Set",
      "adegan": [
        {
          "id": "K2B5B-V2-1",
          "judul": "Halim dan enam ikan",
          "ketukan": [
            "Ada 6 ikan dalam akuarium. Mari kita pahami bersama.",
            "Halim akan memasukkan ikan itu ke dalam dua tempat sehingga sama banyak.",
            "Halim akan menemukan setengah dari enam ikan. Mari kita pahami bersama.",
            "Ingat cara Bagi Rata Kumpulan: Bagi dua kelompok sama banyak."
          ],
          "papan": [
            "Ada 6 ikan",
            "Dua tempat sama banyak",
            "Cari setengahnya",
            "bagi"
          ]
        },
        {
          "id": "K2B5B-V2-2",
          "judul": "Setengah dari 6 ikan",
          "ketukan": [
            "Kita membagi 6 ikan menjadi dua kelompok sama banyak. Mari kita pahami bersama.",
            "Masing-masing berisi 3 ikan. Mari kita pahami bersama.",
            "Jadi, setengah dari 6 ikan adalah 3 ikan. Mari kita pahami bersama.",
            "Di sini kita memakai ide Fair Share Set — Bagi dua kelompok sama banyak."
          ],
          "papan": [
            "Dua kelompok sama",
            "Masing-masing 3",
            "Setengah dari 6 = 3",
            "bagi"
          ]
        },
        {
          "id": "K2B5B-V2-3",
          "judul": "Bukan setengah",
          "ketukan": [
            "Sekarang, kita membagi 6 ikan menjadi dua kelompok, tetapi tidak sama banyak.",
            "Satu kelompok berisi 4 ikan dan satu kelompok berisi 2 ikan. Mari kita pahami bersama.",
            "Itu tidak dapat dikatakan setengah dari 6 ikan. Mari kita pahami bersama.",
            "METODE LUAR · Bagi Rata Kumpulan: Bagi dua kelompok sama banyak."
          ],
          "papan": [
            "Tidak sama banyak",
            "4 ikan dan 2 ikan",
            "Bukan setengah",
            "Harus sama banyak"
          ]
        }
      ]
    },
    {
      "id": "K2B5B-V3",
      "judul": "Siap pakai Even Check",
      "subjudul": "Even Check",
      "adegan": [
        {
          "id": "K2B5B-V3-1",
          "judul": "Delapan pensil Tika",
          "ketukan": [
            "Tika mempunyai 8 pensil. Mari kita pahami bersama.",
            "Tika mengelompokkan semua pensilnya menjadi dua bagian sama banyak. Mari kita pahami bersama.",
            "Setiap bagian berisi 4 pensil, jadi setengah dari 8 pensil adalah 4 pensil.",
            "Ingat cara Cek Genap: Kumpulan genap mudah dibagi dua."
          ],
          "papan": [
            "Tika: 8 pensil",
            "Dua bagian sama banyak",
            "Setengah dari 8 = 4",
            "cek"
          ]
        },
        {
          "id": "K2B5B-V3-2",
          "judul": "Mencari pola",
          "ketukan": [
            "Setengah dari 4 adalah 2. Mari kita pahami bersama.",
            "Setengah dari 6 adalah 3, dan setengah dari 8 adalah 4. Mari kita pahami bersama.",
            "Setengah dari 10 adalah 5. Mari kita pahami bersama.",
            "Di sini kita memakai ide Even Check — Kumpulan genap mudah dibagi dua."
          ],
          "papan": [
            "4 → 2",
            "6 → 3 dan 8 → 4",
            "10 → 5",
            "Ada pola setengah"
          ]
        },
        {
          "id": "K2B5B-V3-3",
          "judul": "Kalau banyaknya ganjil",
          "ketukan": [
            "Bagaimana kalau ada 5 kelereng. Mari kita pahami bersama.",
            "Kita bagi satu untuk Upe dan satu untuk Malosi sampai habis. Mari kita pahami bersama.",
            "Tersisa satu kelereng, jadi 5 tidak bisa dibagi dua sama banyak. Mari kita pahami bersama.",
            "METODE LUAR · Cek Genap: Kumpulan genap mudah dibagi dua."
          ],
          "papan": [
            "Ada 5 kelereng",
            "Bagi bergantian",
            "Tersisa satu",
            "5 tak bisa dibagi dua"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Setengah dari Kumpulan Benda. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Half of Set",
      "stepDesc": "Ambil setengah dari banyak benda.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Fair Share Set",
      "stepDesc": "Bagi dua kelompok sama banyak.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Even Check",
      "stepDesc": "Kumpulan genap mudah dibagi dua.",
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
      "judul": "Kelereng Malosi",
      "emoji": "🔵",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Malosi mempunyai empat kelereng. Ia memberi setengah dari kelerengnya kepada Upe. Kelereng dibagi sama banyak, jadi Upe mendapat dua kelereng."
    },
    {
      "judul": "Setengah dari Kumpulan Benda",
      "emoji": "👫",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Setengah dari sekumpulan benda ditemukan dengan membagi benda menjadi dua kelompok yang sama banyak. Setiap kelompok adalah setengah dari seluruh benda."
    },
    {
      "judul": "Satu untukmu, Satu untukku",
      "emoji": "🤝",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Cara membagi adil: satu benda untuk Upe, satu benda untuk Malosi, bergantian sampai benda habis. Setelah itu hitung benda milik masing-masing."
    },
    {
      "judul": "Setengah dari 4",
      "emoji": "🎯",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Empat kelereng dibagi menjadi dua kelompok sama banyak. Masing-masing kelompok berisi dua kelereng. Jadi setengah dari empat adalah dua."
    },
    {
      "judul": "Setengah dari 6 Ikan",
      "emoji": "🐟",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Enam ikan dibagi menjadi dua kelompok sama banyak, masing-masing tiga ikan. Jadi setengah dari enam ikan adalah tiga ikan."
    },
    {
      "judul": "Bukan Setengah",
      "emoji": "❌",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Enam ikan dibagi menjadi kelompok berisi empat ikan dan kelompok berisi dua ikan. Itu bukan setengah karena kedua kelompok tidak sama banyak."
    },
    {
      "judul": "Delapan Pensil Tika",
      "emoji": "✏️",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Tika mempunyai delapan pensil. Ia membaginya menjadi dua kelompok sama banyak, masing-masing empat pensil. Setengah dari delapan adalah empat."
    },
    {
      "judul": "Pola Setengah",
      "emoji": "🔢",
      "countNum": 5,
      "countWord": "Lima",
      "suara": "Setengah dari empat adalah dua. Setengah dari enam adalah tiga. Setengah dari delapan adalah empat. Setengah dari sepuluh adalah lima. Setiap bertambah dua, setengahnya bertambah satu."
    },
    {
      "judul": "Kalau Banyaknya Ganjil",
      "emoji": "❓",
      "countNum": 5,
      "countWord": "Lima",
      "suara": "Lima kelereng dibagi bergantian untuk dua anak. Setiap anak mendapat dua, dan tersisa satu. Lima tidak bisa dibagi dua sama banyak tanpa memecah kelereng."
    },
    {
      "judul": "Periksa dengan Menggabung",
      "emoji": "➕",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk memeriksa, gabungkan kedua kelompok. Dua kelompok berisi tiga ikan digabung menjadi enam ikan, sama dengan jumlah semula. Itu tandanya setengahnya benar."
    },
    {
      "judul": "Setengah Kumpulan",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Ambil setengah dari banyak benda."
    },
    {
      "judul": "Bagi Rata Kumpulan",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Bagi dua kelompok sama banyak."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "share-marbles-two-bowls",
      "title": "Bagi Kelereng Malosi dan Upe",
      "bookReference": "hlm. 135–136 (Malosi dan Upe bermain kelereng; setengah dari 4 kelereng adalah 2 kelereng)",
      "objective": "Pakai Setengah Kumpulan: Ambil setengah dari banyak benda. Latihan: Membagi sekumpulan kelereng ke dua mangkuk sampai sama banyak, lalu menyebut setengah dari seluruh kelereng..",
      "mechanicDescription": "Empat ronde (4, 6, 8, dan 10 kelereng). Siswa menyeret atau mengetuk kelereng dari meja ke mangkuk Upe atau mangkuk Malosi, dan mengetuk kelereng di mangkuk untuk mengembalikannya. Bila meja kosong dan kedua mangkuk sama banyak, siswa memilih banyak kelereng setengahnya. Bila belum sama, layar memberi petunjuk untuk memindahkan. Saat bermain, terapkan Half of Set: Ambil setengah dari banyak benda.",
      "voiceGuide": "Setengah Kumpulan. Ambil setengah dari banyak benda.",
      "emoji": "🔵",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "balance-scale-equal-groups",
      "title": "Neraca Setengah",
      "bookReference": "hlm. 136–137 (membagi kelompok menjadi dua bagian sama banyak; setengah dari 6 ikan)",
      "objective": "Pakai Setengah Kumpulan: Ambil setengah dari banyak benda. Latihan: Menempatkan benda di dua piringan neraca sampai neraca seimbang, yang menunjukkan dua kelompok sama banyak..",
      "mechanicDescription": "Empat ronde (6, 8, 10, dan 12 apel). Siswa menaruh apel dari meja ke piringan kiri atau kanan. Neraca miring ke sisi yang lebih banyak dan datar bila seimbang. Setelah seimbang dan meja kosong, siswa memilih banyak apel di satu piringan sebagai setengahnya. Saat bermain, terapkan Half of Set: Ambil setengah dari banyak benda.",
      "voiceGuide": "Setengah Kumpulan. Ambil setengah dari banyak benda.",
      "emoji": "🍎",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "pair-up-and-halve",
      "title": "Pasang Berdua",
      "bookReference": "hlm. 136–137 (satu untuk Upe dan satu untuk Malosi; kelompok sama banyak), diperkaya pemasangan satu-satu",
      "objective": "Pakai Setengah Kumpulan: Ambil setengah dari banyak benda. Latihan: Memasangkan benda berdua-berdua, menghitung pasangan sebagai setengah, dan menemukan bahwa benda ganjil menyisakan satu..",
      "mechanicDescription": "Empat ronde (6 pensil, 8 jeruk, 7 balon, dan 10 ikan). Siswa mengetuk dua benda berturut-turut untuk memasangkannya. Setelah semua benda berpasangan, banyak pasangan ditanyakan sebagai setengahnya. Pada ronde 7 balon tersisa satu, dan siswa menjawab apakah benda bisa dibagi dua sama banyak. Saat bermain, terapkan Half of Set: Ambil setengah dari banyak benda.",
      "voiceGuide": "Setengah Kumpulan. Ambil setengah dari banyak benda.",
      "emoji": "🍊",
      "targetCount": 4
    },
    {
      "stage": "Concrete",
      "gameType": "double-the-half",
      "title": "Kembalikan Jadi Utuh",
      "bookReference": "hlm. 136–139 (setengah dari sekumpulan benda; setengah dari 8 pensil), diperkaya hubungan balik setengah ke seluruhnya",
      "objective": "Pakai Setengah Kumpulan: Ambil setengah dari banyak benda. Latihan: Menggandakan kelompok setengah menjadi kumpulan utuh dan menyebut banyak seluruh benda..",
      "mechanicDescription": "Empat ronde (setengahnya 3 pensil, 4 jeruk, 5 ikan, dan 2 balon). Layar menampilkan satu kelompok setengah. Siswa menekan Tambah Kelompok untuk menambah kelompok yang sama banyak, lalu memilih banyak seluruh benda dari tiga pilihan. Saat bermain, terapkan Half of Set: Ambil setengah dari banyak benda.",
      "voiceGuide": "Setengah Kumpulan. Ambil setengah dari banyak benda.",
      "emoji": "✏️",
      "targetCount": 4
    },
    {
      "stage": "Picture",
      "gameType": "circle-half-of-dots",
      "title": "Lingkari Setengah",
      "bookReference": "hlm. 138–141 (Ayo Berlatih nomor 1 sampai 4: lingkari atau warnai setengah dari kelompok benda)",
      "objective": "Memilih titik-titik sehingga yang dipilih tepat setengah dari seluruh titik.. Ingat Setengah Kumpulan.",
      "mechanicDescription": "Empat ronde (6, 8, 10, dan 12 titik polos). Siswa mengetuk titik untuk memilih. Titik yang dipilih diberi lingkaran dan dihitung. Setelah menekan Periksa, program memeriksa bahwa yang dipilih dan yang tidak dipilih sama banyak. Gunakan Setengah Kumpulan.",
      "voiceGuide": "Setengah Kumpulan. Ketuk titik sampai yang dipilih tepat setengahnya.",
      "diagramType": "dot-selection",
      "numberA": 4,
      "numberB": 6
    },
    {
      "stage": "Picture",
      "gameType": "dot-array-split-line",
      "title": "Garis Pembagi Titik",
      "bookReference": "hlm. 137–139 (menjadi dua kelompok sama banyak atau tidak sama banyak)",
      "objective": "Memilih garis pemisah yang membagi larik titik menjadi dua kelompok sama banyak, atau menyatakan tidak ada garis yang bisa.. Ingat Setengah Kumpulan.",
      "mechanicDescription": "Empat ronde larik titik (2 baris 4 kolom, 3 baris 4 kolom, 2 baris 5 kolom, dan 3 baris 3 kolom). Siswa mengetuk celah di antara baris atau kolom untuk memasang garis pemisah, dan melihat banyak titik di tiap sisi. Pada larik 3 kali 3 siswa harus menyatakan tidak ada garis yang cocok. Gunakan Setengah Kumpulan.",
      "voiceGuide": "Setengah Kumpulan. Pasang garis pemisah di celah sampai kedua sisi sama banyak.",
      "diagramType": "dot-array",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "one-to-one-link-groups",
      "title": "Satu-Satu Antar Kelompok",
      "bookReference": "hlm. 137 (dua kelompok sama banyak dan tidak sama banyak), diperkaya pemasangan satu-satu",
      "objective": "Menghubungkan titik kelompok kiri dan kanan satu demi satu untuk memutuskan apakah kedua kelompok sama banyak, sehingga menunjukkan setengah.. Ingat Setengah Kumpulan.",
      "mechanicDescription": "Empat ronde dua kelompok titik (4 dan 4, 4 dan 2, 3 dan 3, 5 dan 3). Siswa mengetuk satu titik kiri lalu satu titik kanan untuk menarik garis penghubung. Titik tanpa pasangan terlihat jelas. Siswa lalu memilih Setengah atau Bukan Setengah. Gunakan Setengah Kumpulan.",
      "voiceGuide": "Setengah Kumpulan. Hubungkan satu titik kiri dengan satu titik kanan, lalu putuskan.",
      "diagramType": "link-dots",
      "numberA": 4,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "fill-table-halves",
      "title": "Isi Tabel Setengah",
      "bookReference": "hlm. 136–141 (setengah dari 4, 6, 8, 10 dan hubungan balik)",
      "objective": "Menuliskan setengah dari bilangan dan seluruh benda dari setengahnya dalam tabel.. Ingat Setengah Kumpulan.",
      "mechanicDescription": "Dua ronde. Ronde 1: tulis setengah dari 4, 6, 8, dan 10. Ronde 2: tulis banyak seluruhnya bila setengahnya 2, 5, 3, dan 4. Siswa mengetuk baris tabel, lalu mengetuk kartu angka yang tepat. Gunakan Setengah Kumpulan.",
      "voiceGuide": "Setengah Kumpulan. Ketuk baris tabel, lalu pilih kartu angka yang tepat.",
      "symbolLarge": "6 → 3",
      "wordLarge": "ISI TABEL",
      "mathNotation": "setengah dari 6 adalah 3"
    },
    {
      "stage": "Abstract",
      "gameType": "clue-detective-numbers",
      "title": "Detektif Bilangan",
      "bookReference": "hlm. 135–139 (setengah dari sekumpulan benda; menjelaskan cara menemukan hasilnya)",
      "objective": "Menemukan bilangan dari dua petunjuk tertulis tentang setengahnya.. Ingat Setengah Kumpulan.",
      "mechanicDescription": "Empat ronde, tiap ronde dua petunjuk dan tiga pilihan bilangan. Contoh: setengah dari bilanganku adalah 3. Siswa memilih bilangan yang cocok dengan kedua petunjuk. Petunjuk dibacakan Suara Guru. Gunakan Setengah Kumpulan.",
      "voiceGuide": "Setengah Kumpulan. Baca kedua petunjuk, lalu pilih bilangannya.",
      "symbolLarge": "½ × ? = 3",
      "wordLarge": "DETEKTIF",
      "mathNotation": "dua petunjuk, satu bilangan"
    },
    {
      "stage": "Abstract",
      "gameType": "sort-numbers-two-bins",
      "title": "Bisa Dibagi Dua?",
      "bookReference": "hlm. 137 (setengah dari 6 ikan) dan 138 (coba lagi dengan 8 dan 10), diperkaya bilangan yang menyisakan satu",
      "objective": "Menentukan bilangan yang bisa dibagi dua sama banyak dan yang menyisakan satu.. Ingat Setengah Kumpulan.",
      "mechanicDescription": "Dua ronde, tiap ronde enam bilangan. Siswa menyeret atau mengetuk tiap bilangan ke kotak Bisa Dibagi Dua Sama Banyak atau kotak Tersisa Satu. Bilangan yang salah kembali dengan penjelasan hasil pembagiannya. Gunakan Setengah Kumpulan.",
      "voiceGuide": "Setengah Kumpulan. Taruh tiap bilangan ke kotak yang tepat.",
      "symbolLarge": "7 ?",
      "wordLarge": "BAGI DUA",
      "mathNotation": "bisa dibagi dua sama banyak"
    }
  ],
  "poin": [
    {
      "ikon": "👫",
      "nama": "Setengah kumpulan",
      "isi": "dua kelompok sama banyak",
      "suara": "Setengah dari sekumpulan benda ditemukan dengan membagi benda menjadi dua kelompok yang sama banyak. Setiap kelompok adalah setengahnya."
    },
    {
      "ikon": "🤝",
      "nama": "Satu untukmu",
      "isi": "bagi bergantian sampai habis",
      "suara": "Bagi benda bergantian, satu untukmu dan satu untukku, sampai habis. Lalu hitung benda milik masing-masing."
    },
    {
      "ikon": "🌍",
      "nama": "Bagi Rata Kumpulan",
      "isi": "Bagi dua kelompok sama banyak.",
      "suara": "Bagi Rata Kumpulan. Bagi dua kelompok sama banyak."
    },
    {
      "ikon": "🌍",
      "nama": "Cek Genap",
      "isi": "Kumpulan genap mudah dibagi dua.",
      "suara": "Cek Genap. Kumpulan genap mudah dibagi dua."
    }
  ],
  "poinSuara": "Ingat: Setengah Kumpulan, Bagi Rata Kumpulan, Cek Genap.",
  "cara": {
    "suara": "Cara menyebutkan. Setengah dari 6 ikan adalah 3 ikan.",
    "potongan": [
      {
        "teks": "Setengah dari",
        "warna": "#FFFFFF"
      },
      {
        "teks": "6 ikan",
        "warna": "#FFE566"
      },
      {
        "teks": "adalah",
        "warna": "#FFFFFF"
      },
      {
        "teks": "3 ikan",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Setengah Kumpulan pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Setengah Kumpulan membantumu memahami soal?",
    "Kapan kamu memakai Bagi Rata Kumpulan?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Half of Set",
      "namaId": "Setengah Kumpulan",
      "asal": "Set fractions",
      "ringkas": "Ambil setengah dari banyak benda.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fair Share Set",
      "namaId": "Bagi Rata Kumpulan",
      "asal": "Division link",
      "ringkas": "Bagi dua kelompok sama banyak.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Even Check",
      "namaId": "Cek Genap",
      "asal": "Number sense",
      "ringkas": "Kumpulan genap mudah dibagi dua.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_C5: SubBabNaskah = {
  "id": "C",
  "codeTitle": "Sub-Bab C (Seperempat dari Benda Utuh)",
  "fullTitle": "Sub-Bab C: Seperempat dari Benda Utuh",
  "targetDescription": "Siswa membagi satu benda utuh menjadi empat bagian sama besar, menyebut setiap bagian sebagai seperempat, mendapatkan seperempat dengan memotong atau melipat dua kali, menghubungkan utuh, setengah, dan seperempat, serta membedakan bagian yang seperempat dari yang bukan. Siswa memakai cara Seperempat, Setengah dari Setengah, Lipat Dua Kali.",
  "secondaryBg": "#DCFCE7",
  "secondaryBorder": "#16A34A",
  "secondaryText": "#14532D",
  "silabus": {
    "teksSuara": "Kita belajar seperempat dari benda utuh. Kira ingin memakan martabak bersama Malosi, Upe, dan Tika, jadi martabak dipotong menjadi empat bagian yang sama besar. Setiap bagian dinamakan seperempat. Kita memotong dua kali, melipat kertas, dan menghubungkan utuh, setengah, dan seperempat. Kita memakai cara dari luar buku: Seperempat (Quartering); Setengah dari Setengah (Half of Half); Lipat Dua Kali (Fold Twice). Bagi menjadi empat bagian sama. Seperempat = setengah dari setengah. Lipat dua kali menghasilkan seperempat. Kita melewati enam tahap seru: cerita, peta pikiran, infografis, benda nyata, gambar, dan simbol.",
    "cp": "Siswa menunjukkan seperempat dari benda utuh dengan membagi benda menjadi empat bagian sama besar, menemukan seperempat di sekitar, menghubungkan utuh, setengah, dan seperempat, serta membuat karya dari potongan setengah dan seperempat.",
    "referensi": "Buku Siswa Matematika Kelas II Kemendikbudristek (Bab 5 Sub-Bab C)."
  },
  "videos": [
    {
      "id": "K2B5C-V1",
      "judul": "Martabak untuk Empat Sahabat",
      "subjudul": "Quartering",
      "adegan": [
        {
          "id": "K2B5C-V1-1",
          "judul": "Kira ingin berbagi",
          "ketukan": [
            "Bayangkan situasi nyata di kelas atau di rumah. Kira mempunyai satu martabak manis. Mari kita pahami bersama.",
            "Kira ingin memakannya bersama Malosi, Upe, dan Tika. Mari kita pahami bersama.",
            "Berarti ada empat anak yang akan makan. Mari kita pahami bersama.",
            "Ingat cara Seperempat: Bagi menjadi empat bagian sama."
          ],
          "papan": [
            "Satu martabak",
            "Bersama tiga teman",
            "Empat anak",
            "Empat bagian sama"
          ]
        },
        {
          "id": "K2B5C-V1-2",
          "judul": "Memotong menjadi empat",
          "ketukan": [
            "Perhatikan kue martabak manis ini. Mari kita pahami bersama.",
            "Kita dapat memotongnya menjadi empat bagian sama besar. Mari kita pahami bersama.",
            "Bagaimana cara memotongnya agar menjadi empat bagian sama besar. Mari kita pahami bersama.",
            "Di sini kita memakai ide Quartering — Bagi menjadi empat bagian sama."
          ],
          "papan": [
            "Martabak utuh",
            "Empat bagian sama besar",
            "Bagaimana memotongnya?",
            "seperempat"
          ]
        },
        {
          "id": "K2B5C-V1-3",
          "judul": "Seperempat",
          "ketukan": [
            "Kita memotong satu martabak utuh menjadi empat bagian sama besar. Mari kita pahami bersama.",
            "Setiap hasil potongannya bernilai seperempat. Mari kita pahami bersama.",
            "Setiap sahabat mendapat seperempat martabak. Mari kita pahami bersama.",
            "METODE LUAR · Seperempat: Bagi menjadi empat bagian sama."
          ],
          "papan": [
            "Satu jadi empat",
            "Bernilai seperempat",
            "Tiap sahabat seperempat",
            "seperempat"
          ]
        }
      ]
    },
    {
      "id": "K2B5C-V2",
      "judul": "Latihan: Setengah dari Setengah",
      "subjudul": "Half of Half",
      "adegan": [
        {
          "id": "K2B5C-V2-1",
          "judul": "Apel yang dipotong",
          "ketukan": [
            "Mulai dari satu apel utuh. Mari kita pahami bersama.",
            "Apel dipotong menjadi dua sama besar, dan setiap bagian adalah setengah apel.",
            "Setengah apel dipotong lagi menjadi dua sama besar, dan setiap bagian adalah seperempat apel.",
            "Ingat cara Setengah dari Setengah: Seperempat = setengah dari setengah."
          ],
          "papan": [
            "Satu apel utuh",
            "Setengah apel",
            "Seperempat apel",
            "setengah"
          ]
        },
        {
          "id": "K2B5C-V2-2",
          "judul": "Dua kali memotong",
          "ketukan": [
            "Untuk mendapat seperempat, kita memotong dua kali. Mari kita pahami bersama.",
            "Mula-mula potong menjadi dua bagian sama besar. Kita mendapat setengah bagian.",
            "Lalu potong lagi setiap setengah bagian menjadi dua potong sama besar.",
            "Di sini kita memakai ide Half of Half — Seperempat = setengah dari setengah."
          ],
          "papan": [
            "Potong dua kali",
            "Potong pertama",
            "Potong kedua",
            "Seperempat bagian"
          ]
        },
        {
          "id": "K2B5C-V2-3",
          "judul": "Seperempat di sekitar",
          "ketukan": [
            "Kita dapat menemukan seperempat benda di sekitar kita. Mari kita pahami bersama.",
            "Ada seperempat apel, seperempat puding, dan seperempat kue bolu. Mari kita pahami bersama.",
            "Dua seperempat disatukan menjadi satu setengah. Mari kita pahami bersama.",
            "METODE LUAR · Setengah dari Setengah: Seperempat = setengah dari setengah."
          ],
          "papan": [
            "Seperempat di sekitar",
            "Apel, puding, bolu",
            "2 seperempat = setengah",
            "4 seperempat = utuh"
          ]
        }
      ]
    },
    {
      "id": "K2B5C-V3",
      "judul": "Siap pakai Fold Twice",
      "subjudul": "Fold Twice",
      "adegan": [
        {
          "id": "K2B5C-V3-1",
          "judul": "Lipat menjadi empat",
          "ketukan": [
            "Ambil selembar kertas berbentuk persegi. Mari kita pahami bersama.",
            "Lipat kertas itu menjadi empat bagian sama besar. Mari kita pahami bersama.",
            "Lalu tunjukkan seperempat. Mari kita pahami bersama.",
            "Ingat cara Lipat Dua Kali: Lipat dua kali menghasilkan seperempat."
          ],
          "papan": [
            "Kertas persegi",
            "Lipat jadi empat",
            "Tunjukkan seperempat",
            "lipat"
          ]
        },
        {
          "id": "K2B5C-V3-2",
          "judul": "Banyak cara",
          "ketukan": [
            "Kertas bisa dilipat dua kali dengan beberapa cara. Mari kita pahami bersama.",
            "Bisa dilipat tegak lalu mendatar, dan empat bagiannya berbentuk persegi.",
            "Bisa juga dilipat miring dua kali, dan empat bagiannya berbentuk segitiga.",
            "Di sini kita memakai ide Fold Twice — Lipat dua kali menghasilkan seperempat."
          ],
          "papan": [
            "Dua kali melipat",
            "Tegak lalu mendatar",
            "Miring dua kali",
            "Harus sama besar"
          ]
        },
        {
          "id": "K2B5C-V3-3",
          "judul": "Ayo Berkarya",
          "ketukan": [
            "Ambil empat lembar kertas berbentuk lingkaran. Mari kita pahami bersama.",
            "Lipat satu lingkaran menjadi setengah dan potong. Mari kita pahami bersama.",
            "Lipat tiga lingkaran, masing-masing menjadi seperempat, dan potong. Mari kita pahami bersama.",
            "METODE LUAR · Lipat Dua Kali: Lipat dua kali menghasilkan seperempat."
          ],
          "papan": [
            "Empat lingkaran",
            "Satu jadi setengah",
            "Tiga jadi seperempat",
            "Susun jadi ikan"
          ]
        }
      ]
    }
  ],
  "mindMaps": [
    {
      "stepNumber": 1,
      "stepTitle": "1. Pahami soal",
      "stepDesc": "Baca soal Seperempat dari Benda Utuh. Apa yang ditanyakan?",
      "icon": "❓",
      "flowFrom": "START",
      "flowTo": "2"
    },
    {
      "stepNumber": 2,
      "stepTitle": "2. Quartering",
      "stepDesc": "Bagi menjadi empat bagian sama.",
      "icon": "🧭",
      "flowFrom": "1",
      "flowTo": "3"
    },
    {
      "stepNumber": 3,
      "stepTitle": "3. Half of Half",
      "stepDesc": "Seperempat = setengah dari setengah.",
      "icon": "🛠️",
      "flowFrom": "2",
      "flowTo": "4"
    },
    {
      "stepNumber": 4,
      "stepTitle": "4. Fold Twice",
      "stepDesc": "Lipat dua kali menghasilkan seperempat.",
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
      "judul": "Martabak untuk Empat Sahabat",
      "emoji": "🥞",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Kira, Malosi, Upe, dan Tika makan martabak bersama. Martabak dipotong menjadi empat bagian sama besar, jadi setiap sahabat mendapat satu bagian."
    },
    {
      "judul": "Seperempat Itu Apa?",
      "emoji": "🍕",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Satu benda utuh dipotong menjadi empat bagian sama besar. Setiap hasil potongannya bernilai seperempat. Kata kuncinya adalah empat bagian dan sama besar."
    },
    {
      "judul": "Utuh, Setengah, Seperempat",
      "emoji": "🍎",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Satu apel utuh dipotong menjadi setengah apel. Setengah apel dipotong lagi menjadi seperempat apel. Makin dipotong, bagiannya makin kecil dan makin banyak."
    },
    {
      "judul": "Potong Dua Kali",
      "emoji": "🔪",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Untuk mendapat seperempat, potong dua kali. Potong pertama membuat dua bagian sama besar. Potong kedua membagi tiap bagian menjadi dua sama besar."
    },
    {
      "judul": "Seperempat di Sekitar Kita",
      "emoji": "🍮",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Kita dapat menemukan seperempat benda di sekitar kita. Ada seperempat apel, seperempat puding, dan seperempat kue bolu."
    },
    {
      "judul": "Dua Seperempat",
      "emoji": "➗",
      "countNum": 2,
      "countWord": "Dua",
      "suara": "Dua seperempat disatukan menjadi satu setengah. Jadi setengah sama dengan dua seperempat. Coba dengan dua potong puding."
    },
    {
      "judul": "Empat Seperempat",
      "emoji": "🧩",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Empat seperempat disatukan kembali menjadi satu benda utuh. Jadi satu utuh sama dengan empat seperempat."
    },
    {
      "judul": "Melipat Menjadi Empat",
      "emoji": "📄",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Kertas persegi dapat dilipat dua kali menjadi empat bagian sama besar. Bagiannya bisa persegi kecil, segitiga, atau jalur panjang. Apa pun bentuknya, keempat bagian sama besar."
    },
    {
      "judul": "Ikan dari Lingkaran",
      "emoji": "🐠",
      "countNum": 4,
      "countWord": "Empat",
      "suara": "Ayo Berkarya. Dari empat lingkaran kertas, satu dilipat menjadi setengah dan tiga dilipat menjadi seperempat. Potongannya disusun menjadi ikan yang menarik."
    },
    {
      "judul": "Tiga Pertanyaan Pemeriksa",
      "emoji": "🔍",
      "countNum": 3,
      "countWord": "Tiga",
      "suara": "Tiga pertanyaan pemeriksa seperempat. Satu, apakah dibagi menjadi empat bagian. Dua, apakah keempat bagian sama besar. Tiga, apakah yang ditunjukkan satu bagian itu."
    },
    {
      "judul": "Seperempat",
      "emoji": "🌍",
      "countNum": 1,
      "countWord": "ingat",
      "suara": "Bagi menjadi empat bagian sama."
    },
    {
      "judul": "Setengah dari Setengah",
      "emoji": "🌍",
      "countNum": 2,
      "countWord": "ingat",
      "suara": "Seperempat = setengah dari setengah."
    }
  ],
  "games": [
    {
      "stage": "Concrete",
      "gameType": "choose-fair-four-cuts",
      "title": "Empat Potongan yang Adil",
      "bookReference": "hlm. 142–143 (Kira membagi martabak menjadi 4 bagian sama besar; setiap hasil potongan bernilai seperempat)",
      "objective": "Pakai Seperempat: Bagi menjadi empat bagian sama. Latihan: Memilih cara memotong benda nyata yang menghasilkan empat bagian sama besar dan menolak yang tidak sama besar..",
      "mechanicDescription": "Tiga ronde (martabak, kue bolu, roti, dan puding). Tiap ronde menampilkan enam gambar benda dengan pola garis potong berbeda. Siswa mengetuk semua pola yang membagi benda menjadi empat bagian sama besar, lalu menekan Periksa. Luas tiap bagian dihitung oleh program. Saat bermain, terapkan Quartering: Bagi menjadi empat bagian sama.",
      "voiceGuide": "Seperempat. Bagi menjadi empat bagian sama.",
      "emoji": "🥞",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "fold-twice-paper",
      "title": "Lipat Dua Kali",
      "bookReference": "hlm. 145 (Ayo Mencoba: lipat kertas menjadi empat bagian sama besar dan tunjukkan seperempat)",
      "objective": "Pakai Seperempat: Bagi menjadi empat bagian sama. Latihan: Melipat kertas dua kali dengan lipatan yang pas sampai terbentuk empat bagian sama besar, lalu membuka lipatan dan menunjukkan seperempat..",
      "mechanicDescription": "Dua ronde (kertas persegi dan kertas lingkaran). Siswa memilih garis lipat pertama, lalu garis lipat kedua pada kertas yang sudah terlipat. Lipatan yang tidak menutup pas ditolak. Bila dua lipatan pas, kertas dibuka dan empat bagian sama besar tampak. Siswa mengetuk satu bagian sebagai seperempat. Saat bermain, terapkan Quartering: Bagi menjadi empat bagian sama.",
      "voiceGuide": "Seperempat. Bagi menjadi empat bagian sama.",
      "emoji": "📄",
      "targetCount": 2
    },
    {
      "stage": "Concrete",
      "gameType": "halve-apple-twice",
      "title": "Belah Apel Bertahap",
      "bookReference": "hlm. 144 (satu apel utuh, setengah apel, seperempat apel; seperempat puding dan kue bolu)",
      "objective": "Pakai Seperempat: Bagi menjadi empat bagian sama. Latihan: Membelah benda dua kali berturut-turut dan menyebut utuh, setengah, dan seperempat serta hubungan di antaranya..",
      "mechanicDescription": "Tiga ronde (apel, puding, kue bolu). Siswa menekan Belah untuk membagi benda utuh menjadi dua setengah, lalu menekan tiap setengah untuk membaginya lagi. Siswa mengetuk bagian yang disebut setengah dan seperempat, lalu menjawab berapa seperempat yang sama dengan satu setengah dan satu utuh. Saat bermain, terapkan Quartering: Bagi menjadi empat bagian sama.",
      "voiceGuide": "Seperempat. Bagi menjadi empat bagian sama.",
      "emoji": "🍎",
      "targetCount": 3
    },
    {
      "stage": "Concrete",
      "gameType": "rebuild-whole-from-pieces",
      "title": "Susun Kembali Potongan",
      "bookReference": "hlm. 143–144 (seperempat benda; hasil potongan bernilai seperempat), diperkaya menyatukan kembali potongan",
      "objective": "Pakai Seperempat: Bagi menjadi empat bagian sama. Latihan: Menyusun potongan seperempat pada piring sampai membentuk seperempat, setengah, atau satu utuh, dan menyebut hasilnya..",
      "mechanicDescription": "Tiga ronde (martabak: satu potong, pizza: dua potong, kue bolu: empat potong). Empat potongan seperempat ada di meja. Siswa menyeret atau mengetuk potongan ke piring sesuai tugas. Setelah tugas selesai, siswa menyebut banyak potongan seperempat yang dipakai. Pada ronde terakhir siswa menjawab dengan suara. Saat bermain, terapkan Quartering: Bagi menjadi empat bagian sama.",
      "voiceGuide": "Seperempat. Bagi menjadi empat bagian sama.",
      "emoji": "🍕",
      "targetCount": 3
    },
    {
      "stage": "Picture",
      "gameType": "color-quarter-faces",
      "title": "Warnai Seperempat",
      "bookReference": "hlm. 147 (Ayo Berlatih nomor 1: warnai seperempat dari gambar)",
      "objective": "Mewarnai bagian gambar sehingga yang diwarnai tepat seperempat dari seluruh gambar.. Ingat Seperempat.",
      "mechanicDescription": "Tiga ronde, tiap ronde tiga gambar polos (belah ketupat, persegi, lingkaran, persegi panjang, segi delapan, segi enam). Gambar sudah dibagi menjadi empat bagian sama besar. Pada ronde terakhir dibagi menjadi delapan bagian, dan siswa mewarnai dua bagian. Luas yang diwarnai dihitung program. Gunakan Seperempat.",
      "voiceGuide": "Seperempat. Ketuk bagian gambar sampai yang diwarnai tepat seperempat.",
      "diagramType": "shaded-quarters",
      "numberA": 3,
      "numberB": 3
    },
    {
      "stage": "Picture",
      "gameType": "draw-two-dividing-lines",
      "title": "Tarik Garis Jadi Empat",
      "bookReference": "hlm. 148 (Ayo Berlatih nomor 4: tarik garis pada gambar sehingga menghasilkan seperempat)",
      "objective": "Menarik dua garis lewat titik-titik sehingga bangun terbagi menjadi empat bagian sama besar, lalu mewarnai seperempatnya.. Ingat Seperempat.",
      "mechanicDescription": "Empat ronde (persegi, persegi panjang, lingkaran, belah ketupat). Siswa menarik paling banyak dua garis dengan mengetuk dua titik untuk tiap garis. Dua garis yang tidak membagi empat sama besar ditolak dengan petunjuk, misalnya dua diameter lingkaran yang tidak saling tegak lurus. Bila sah, siswa mewarnai satu bagian. Gunakan Seperempat.",
      "voiceGuide": "Seperempat. Ketuk dua titik untuk tiap garis, lalu warnai seperempat.",
      "diagramType": "two-dividing-lines",
      "numberA": 4,
      "numberB": 4
    },
    {
      "stage": "Picture",
      "gameType": "check-cross-quarter",
      "title": "Centang atau Silang",
      "bookReference": "hlm. 147–148 (Ayo Berlatih nomor 2 dan 3: centang gambar yang seperempat, silang yang bukan)",
      "objective": "Menilai setiap gambar bagian berwarna sebagai seperempat atau bukan dengan tanda centang atau silang.. Ingat Seperempat.",
      "mechanicDescription": "Satu ronde delapan gambar bertanda huruf A sampai H (segitiga, persegi, persegi panjang, lingkaran, segi lima, belah ketupat). Di bawah tiap gambar ada tombol centang dan silang. Jawaban yang keliru dijelaskan, misalnya bagian berwarna adalah setengah, bukan seperempat. Gunakan Seperempat.",
      "voiceGuide": "Seperempat. Beri tanda centang bila seperempat, silang bila bukan.",
      "diagramType": "check-cross",
      "numberA": 8,
      "numberB": 2
    },
    {
      "stage": "Abstract",
      "gameType": "match-word-symbol",
      "title": "Pasangkan Kata dan Lambang",
      "bookReference": "hlm. 128, 143, dan 149 (setengah, seperempat, satu utuh), diperkaya lambang pecahan",
      "objective": "Memasangkan kata pecahan dengan lambangnya dan lambang dengan artinya.. Ingat Seperempat.",
      "mechanicDescription": "Dua ronde, tiap ronde tiga pasangan. Ronde 1: setengah, seperempat, dan satu utuh dengan lambangnya. Ronde 2: lambang dengan arti, yaitu dua bagian sama besar ambil satu, empat bagian sama besar ambil satu, dan tidak dibagi. Siswa mengetuk kartu kiri lalu kartu kanan yang cocok. Gunakan Seperempat.",
      "voiceGuide": "Seperempat. Ketuk kartu kiri, lalu kartu kanan yang cocok.",
      "symbolLarge": "½ ¼ 1",
      "wordLarge": "KATA DAN LAMBANG",
      "mathNotation": "setengah • seperempat • utuh"
    },
    {
      "stage": "Abstract",
      "gameType": "fill-table-relations",
      "title": "Isi Tabel Hubungan",
      "bookReference": "hlm. 144 dan 146 (utuh, setengah, seperempat), diperkaya hubungan antarpecahan",
      "objective": "Menuliskan hubungan banyak bagian dan nama hasil antara utuh, setengah, dan seperempat.. Ingat Seperempat.",
      "mechanicDescription": "Dua ronde. Ronde 1: tulis banyak bagian, misalnya 1 utuh sama dengan berapa setengah dan berapa seperempat. Ronde 2: tulis nama hasilnya, misalnya setengah dari setengah adalah seperempat. Siswa mengetuk baris tabel, lalu mengetuk kartu yang tepat. Gunakan Seperempat.",
      "voiceGuide": "Seperempat. Ketuk baris tabel, lalu pilih kartu yang tepat.",
      "symbolLarge": "2 × ¼ = ½",
      "wordLarge": "ISI TABEL",
      "mathNotation": "utuh • setengah • seperempat"
    },
    {
      "stage": "Abstract",
      "gameType": "concept-map-fill",
      "title": "Peta Konsep Seperempat",
      "bookReference": "hlm. 149 (Coba Pikirkan: isilah diagram seperempat)",
      "objective": "Melengkapi peta konsep seperempat dengan definisi, contoh, bukan contoh, cara memperoleh, dan hubungan dengan setengah.. Ingat Seperempat.",
      "mechanicDescription": "Dua peta konsep, satu untuk seperempat dari benda utuh dan satu untuk hubungan setengah dan seperempat. Tiap peta punya empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. Gunakan Seperempat.",
      "voiceGuide": "Seperempat. Pilih kartu yang tepat untuk kotak yang menyala.",
      "symbolLarge": "¼",
      "wordLarge": "PETA KONSEP",
      "mathNotation": "definisi • contoh • hubungan"
    }
  ],
  "poin": [
    {
      "ikon": "🍕",
      "nama": "Seperempat",
      "isi": "satu dari empat bagian sama besar",
      "suara": "Seperempat adalah satu dari empat bagian yang sama besar. Satu benda utuh dipotong menjadi empat sama besar, setiap bagian bernilai seperempat."
    },
    {
      "ikon": "🔪",
      "nama": "Potong dua kali",
      "isi": "dua kali dua bagian sama besar",
      "suara": "Untuk mendapat seperempat, potong dua kali. Potong menjadi dua sama besar, lalu potong lagi tiap bagian menjadi dua sama besar."
    },
    {
      "ikon": "🌍",
      "nama": "Setengah dari Setengah",
      "isi": "Seperempat = setengah dari setengah.",
      "suara": "Setengah dari Setengah. Seperempat = setengah dari setengah."
    },
    {
      "ikon": "🌍",
      "nama": "Lipat Dua Kali",
      "isi": "Lipat dua kali menghasilkan seperempat.",
      "suara": "Lipat Dua Kali. Lipat dua kali menghasilkan seperempat."
    }
  ],
  "poinSuara": "Ingat: Seperempat, Setengah dari Setengah, Lipat Dua Kali.",
  "cara": {
    "suara": "Cara menyebutkan. Martabak dipotong menjadi empat bagian sama besar, setiap bagian adalah seperempat martabak.",
    "potongan": [
      {
        "teks": "Empat bagian",
        "warna": "#FFFFFF"
      },
      {
        "teks": "sama besar",
        "warna": "#FFE566"
      },
      {
        "teks": "adalah",
        "warna": "#FFFFFF"
      },
      {
        "teks": "seperempat",
        "warna": "#7FCB96"
      }
    ]
  },
  "rumah": "Ayo Mencoba di rumah: terapkan Seperempat pada satu benda atau soal nyata, lalu ceritakan langkahmu.",
  "refleksi": [
    "Bagaimana Seperempat membantumu memahami soal?",
    "Kapan kamu memakai Setengah dari Setengah?",
    "Apa bedanya dengan hanya menghafal rumus atau langkah tanpa arti?"
  ],
  "metodeLuar": [
    {
      "label": "METODE LUAR",
      "nama": "Quartering",
      "namaId": "Seperempat",
      "asal": "Early fractions",
      "ringkas": "Bagi menjadi empat bagian sama.",
      "tahap": [
        "Story",
        "Concrete",
        "Picture"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Half of Half",
      "namaId": "Setengah dari Setengah",
      "asal": "Fraction relation",
      "ringkas": "Seperempat = setengah dari setengah.",
      "tahap": [
        "Mind",
        "Abstract"
      ]
    },
    {
      "label": "METODE LUAR",
      "nama": "Fold Twice",
      "namaId": "Lipat Dua Kali",
      "asal": "Paper folding",
      "ringkas": "Lipat dua kali menghasilkan seperempat.",
      "tahap": [
        "Infografis",
        "Concrete"
      ]
    }
  ]
};

export const SUB_BAB_K2B5: SubBabNaskah[] = [SUB_A5, SUB_B5, SUB_C5];
export const semuaAdeganK2B5 = SUB_BAB_K2B5.flatMap((s) => s.videos.flatMap((v) => v.adegan));
