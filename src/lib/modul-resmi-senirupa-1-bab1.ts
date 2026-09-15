import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_SENIRUPA1_BAB1 = "Bab 1: Menari dengan Garis dan Warna";

export const MODUL_SENIRUPA1_BAB1: ModulResmiPai = {
  id: "senirupa-1-bab1",
  judul: JUDUL_SENIRUPA1_BAB1,
  pola: /menari dengan garis|unsur rupa dasar|garis dan warna|menggambar imajinatif/,
  motivasi:
    "Garis membuat jalan di kertas. Ujung yang bertemu jadi bidang. Merah, kuning, biru adalah warna primer, ibu dari semua warna.",
  kunciJawaban: "B,A,B,A,C,B,A,B,C,A",
  sketsaKartu: [
    "Ali menarik spidol tanpa putus, Nia melihat guratan meliuk di batu.",
    "Garis lurus dan lengkung, plus tiga warna primer.",
    "Anak menggambar garis dan mewarnai bidang di sekolah serta di rumah.",
    "Siswa memilih garis ombak dan menyebut merah-kuning-biru sebagai primer.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Ketika menggambar laut yang sedang diterjang angin kencang dan berombak besar, jenis garis yang paling tepat digunakan untuk menggambarkan suasana ombak tersebut adalah...
A) Garis lurus tegak ke atas yang kaku.
B) Garis bergelombang melengkung naik dan turun secara berulang.
C) Garis titik-titik yang tipis.
D) Garis lurus mendatar yang sangat tenang.`,
    `[Soal 2 - PG - Tipe: HOTS]
Nia hanya memiliki tiga pensil warna di kotaknya, yaitu warna Merah, Kuning, dan Biru. Warna-warna tersebut di dalam ilmu seni rupa disebut sebagai...
A) Warna Primer (Warna Utama).
B) Warna Gelap (Warna Malam).
C) Warna Campuran (Warna Sekunder).
D) Warna Bayangan.`,
    `[Soal 3 - PG - Tipe: HOTS]
Garis yang ujungnya bertemu lagi akan membentuk...
A) Titik yang menghilang.
B) Bidang yang bisa diisi warna.
C) Hanya suara musik.
D) Alat cetak daun.`,
    `[Soal 4 - PG - Tipe: Reguler]
Garis lurus horizontal atau vertikal memberi kesan...
A) Tegak, kaku, stabil, dan tenang.
B) Selalu seperti ular yang bergerak.
C) Selalu seperti ombak besar.
D) Tanpa arah sama sekali.`,
    `[Soal 5 - PG - Tipe: Reguler]
Contoh garis lurus di sekitar kita adalah...
A) Ombak laut yang naik turun.
B) Helai rambut yang meliuk.
C) Tiang bendera atau garis buku.
D) Ular di batu.`,
    `[Soal 6 - PG - Tipe: Reguler]
Garis lengkung atau gelombang memberi kesan...
A) Kaku seperti penggaris.
B) Luwes, bergerak, dan dinamis.
C) Diam seperti patung batu.
D) Hanya warna hitam.`,
    `[Soal 7 - PG - Tipe: Reguler]
Warna primer yang tidak dibuat dari campuran warna lain ada...
A) Tiga: merah, kuning, dan biru.
B) Satu: hanya putih.
C) Tujuh: semua warna pelangi tanpa dasar.
D) Nol, karena semua warna campuran.`,
    `[Soal 8 - PG - Tipe: Reguler]
Dari merah, kuning, dan biru, kita dapat...
A) Menghapus semua gambar.
B) Melahirkan banyak warna lain di dunia.
C) Membuat hanya garis titik.
D) Mengganti kertas menjadi batu.`,
    `[Soal 9 - PG - Tipe: HOTS]
Dunia tidak membosankan karena ada perpaduan...
A) Hanya satu garis kaku tanpa warna.
B) Hanya bunyi ketukan meja.
C) Garis dan warna-warni yang indah.
D) Sampah yang tidak diubah.`,
    `[Soal 10 - PG - Tipe: Reguler]
Menarik spidol tanpa putus dari kiri ke kanan menghasilkan...
A) Sebuah garis, seperti jalan panjang di kertas.
B) Sebuah patung tiga dimensi.
C) Sebuah lagu paduan suara.
D) Sebuah kotak susu.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Jalan Panjang di Kertas Taman",
      pengantar:
        "Di taman sekolah. Ali memegang spidol hitam di atas kertas gambar. Nia memperhatikan guratan di atas batu.",
      labelDaftar: "Percakapan Ali dan Nia tentang garis dan bidang",
      kolom: 1,
      item: [
        {
          nama: "Jalan tanpa putus",
          singkat: "Itu namanya garis",
          uraian:
            "Ali menarik spidol tanpa putus dari kiri ke kanan. Kertas jadi punya jalan panjang. Nia menyebutnya garis. Di jalan raya garisnya lurus, di batu guratannya meliuk seperti ular.",
          contoh: "Tarik tanpa putus. Itu garis.",
        },
        {
          nama: "Ujung yang bertemu",
          singkat: "Menjadi bidang",
          uraian:
            "Jika garis meliuk diputar sampai ujungnya bertemu lagi, dalamnya bisa diisi warna merah atau kuning. Garis tertutup membentuk bidang.",
          contoh: "Ujung bertemu, jadi bidang.",
        },
        {
          nama: "Garis dan warna",
          singkat: "Dunia tidak membosankan",
          uraian:
            "Dunia menjadi indah karena ada perpaduan garis dan warna-warni. Garis membangun bentuk. Warna menghidupkan bidang.",
          contoh: "Garis membentuk. Warna mengisi.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Jalan panjang dari spidol tanpa putus namanya apa?",
          alias: ["garis"],
        },
        {
          pertanyaan: "2. Guratan di batu yang meliuk seperti apa?",
          alias: ["ular", "meliuk", "lengkung"],
        },
        {
          pertanyaan: "3. Garis yang ujungnya bertemu membentuk apa?",
          alias: ["bidang", "bentuk"],
        },
      ],
      voice: [
        [
          "Di taman sekolah, Ali menarik spidol tanpa putus dari kiri ke kanan. Kertas punya jalan panjang.",
          "Nia berkata, Itu namanya garis. Di jalan raya garisnya lurus. Di batu, guratannya meliuk seperti ular.",
        ],
        [
          "Kalau garis diputar sampai ujungnya bertemu, dalamnya bisa diisi warna. Itu namanya bidang. Garis dan warna membuat dunia tidak membosankan.",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Unsur Dasar: Garis dan Warna",
      pengantar:
        "Garis dan warna adalah fondasi karya visual. Kenali garis lurus dan lengkung, lalu tiga warna primer.",
      labelDaftar: "Lurus, lengkung, merah-kuning-biru",
      kolom: 1,
      item: [
        {
          nama: "Garis lurus",
          singkat: "Stabil dan tenang",
          uraian:
            "Garis lurus horizontal atau vertikal memberi kesan tegak, kaku, stabil, dan tenang. Contoh: tiang bendera dan garis buku.",
          contoh: "Tiang bendera. Garis buku.",
        },
        {
          nama: "Garis lengkung",
          singkat: "Luwes dan dinamis",
          uraian:
            "Garis lengkung atau gelombang memberi kesan luwes, bergerak, dan dinamis. Contoh: ombak laut dan helai rambut. Ombak besar digambar dengan gelombang naik-turun.",
          contoh: "Ombak. Rambut. Gelombang.",
        },
        {
          nama: "Warna primer",
          singkat: "Merah, kuning, biru",
          uraian:
            "Warna primer adalah warna murni yang tidak dibuat dari campuran warna lain. Hanya ada tiga: merah, kuning, dan biru. Dari ketiganya lahir banyak warna lain.",
          contoh: "Merah. Kuning. Biru.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Tiang bendera memakai jenis garis apa?",
          alias: ["lurus", "tegak", "vertikal"],
        },
        {
          pertanyaan: "2. Ombak laut paling cocok digambar dengan garis apa?",
          alias: ["lengkung", "gelombang", "meliuk"],
        },
        {
          pertanyaan: "3. Sebut satu warna primer.",
          alias: ["merah", "kuning", "biru"],
        },
      ],
      voice: [
        [
          "Garis lurus terasa tegak, kaku, stabil, dan tenang. Contohnya tiang bendera dan garis buku.",
        ],
        [
          "Garis lengkung atau gelombang terasa luwes dan bergerak. Contohnya ombak dan rambut. Warna primer hanya tiga: merah, kuning, dan biru.",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Menari Garis di Sekolah dan di Rumah",
      pengantar:
        "Kepekaan garis dilatih dengan melihat dulu, meniru, lalu mewarnai bidang. Guru memandu di kelas. Orang tua menemani di rumah.",
      labelDaftar: "Latihan garis dan warna primer",
      kolom: 2,
      item: [
        {
          nama: "Kertas ombak",
          singkat: "Untuk guru",
          uraian:
            "Siswa menarik garis lurus seperti tiang, lalu garis gelombang seperti laut berangin. Tutup satu garis jadi bidang, isi merah atau kuning. Diskusikan: mengapa ombak tidak memakai garis kaku?",
          contoh: "Lurus. Gelombang. Isi warna.",
        },
        {
          nama: "Tiga pensil di rumah",
          singkat: "Untuk orang tua",
          uraian:
            "Siapkan hanya merah, kuning, dan biru. Ajak anak mencari garis lurus di buku dan garis meliuk di tanaman. Tanyakan: ini warna primer atau campuran?",
          contoh: "Merah, kuning, biru saja dulu.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Laut berombak besar memakai garis...?",
          alias: ["gelombang", "lengkung", "meliuk"],
        },
        {
          pertanyaan: "2. Warna primer ada berapa?",
          alias: ["tiga", "3"],
        },
        {
          pertanyaan: "3. Bidang terbentuk jika ujung garis...?",
          alias: ["bertemu", "ketemu", "tertutup"],
        },
      ],
      voice: [
        [
          "Di sekolah, gambar garis lurus seperti tiang, lalu gelombang seperti ombak. Tutup garis jadi bidang, isi merah atau kuning.",
        ],
        [
          "Di rumah, pakai hanya tiga pensil: merah, kuning, dan biru. Cari garis lurus di buku dan garis meliuk di tanaman.",
        ],
      ],
    },
    {
      kode: "D",
      judul: "D. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih garis yang tepat untuk ombak besar, lalu sebut nama tiga pensil Nia dalam ilmu seni rupa.",
      labelDaftar: "Pilihan ganda analisis HOTS",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A",
          singkat: "Pilihan ganda HOTS",
          uraian:
            "Ombak besar: garis bergelombang naik-turun, bukan garis lurus kaku. Merah, kuning, biru disebut warna primer atau warna utama.",
          contoh: "Gelombang untuk ombak. Primer = utama.",
        },
        {
          nama: "Ingat primer",
          singkat: "Bukan campuran",
          uraian:
            "Warna primer bukan warna malam dan bukan hasil campuran. Mereka adalah ibu dari warna lain.",
          contoh: "Merah, kuning, biru: primer.",
        },
      ],
      kuis: [
        {
          pertanyaan: "1. Ombak besar paling tepat digambar dengan garis apa?",
          alias: ["gelombang", "lengkung", "meliuk"],
        },
        {
          pertanyaan: "2. Merah, kuning, biru disebut warna apa?",
          alias: ["primer", "utama"],
        },
      ],
      voice: [
        [
          "Laut berangin dan berombak besar digambar dengan garis bergelombang, naik dan turun, bukan garis lurus yang kaku.",
        ],
        [
          "Merah, kuning, dan biru disebut warna primer atau warna utama. Bukan warna malam, bukan warna campuran.",
        ],
      ],
    },
  ],
};
