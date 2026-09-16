import type { ModulResmiPai } from "@/lib/modul-resmi-pai";

function pg(soal: string[]): string {
  return soal.join("\n\n");
}

export const JUDUL_PAI2_BAB4 = "Bab 4: Alhamdulillah, Aku Bisa Wudu";

export const MODUL_PAI2_BAB4: ModulResmiPai = {
  id: "pai-2-bab4",
  judul: JUDUL_PAI2_BAB4,
  pola: /aku bisa wudu|aku bisa salat|alhamdulillah, aku bisa/,
  motivasi:
    "Wudu menyucikan hadas kecil. Rukun: niat, wajah, tangan sampai siku, usap kepala, kaki sampai mata kaki, tertib. Hemat air. Dahulukan kanan. Doa setelah wudu menghadap kiblat.",
  kunciJawaban: "B,B,S,B,A,B,C,A,B,B",
  sketsaKartu: [
    "Anak menghafal rukun wudu dan hal yang membatalkan.",
    "Anak praktik wudu hemat air dari telapak tangan sampai kaki.",
    "Anak mengurutkan gerakan wudu pada lembar evaluasi.",
  ],
  latihan: pg([
    `[Soal 1 - PG - Tipe: HOTS]
Di bawah ini yang termasuk perkara yang dapat membatalkan keabsahan wudu adalah...
A) Makan kurma setelah wudu.
B) Mengeluarkan gas dari dubur (buang angin/kentut).
C) Berbicara dengan teman sekelas.
D) Senyum kepada guru.`,
    `[Soal 2 - PG - Tipe: HOTS]
Batasan membasuh tangan yang wajib menurut rukun wudu adalah sampai ke...
A) Pergelangan tangan saja.
B) Siku tangan.
C) Pundak atas.
D) Ujung jari saja.`,
    `[Soal 3 - PG - Tipe: HOTS]
Membasuh kedua telinga luar dan dalam termasuk rukun wudu yang wajib. Pernyataan ini...
A) Benar.
B) Salah; telinga termasuk sunah, rukunnya mengusap sebagian kepala.
C) Benar hanya di malam hari.
D) Tidak ada wudunya.`,
    `[Soal 4 - PG - Tipe: HOTS]
Saat berwudu kita disunahkan mendahulukan anggota kanan daripada kiri. Pernyataan ini...
A) Salah.
B) Benar; kanan dahulu kemudian kiri.
C) Benar hanya untuk kaki.
D) Tidak sunah sama sekali.`,
    `[Soal 5 - PG - Tipe: Reguler]
Melakukan gerakan wudu secara berurutan disebut...
A) Tertib.
B) Hadas.
C) Kentut.
D) Berlebih-lebihan.`,
    `[Soal 6 - PG - Tipe: Reguler]
Wudu menyucikan diri dari...
A) Hadas besar saja.
B) Hadas kecil sebelum salat.
C) Hanya debu sepatu.
D) Hanya lapar.`,
    `[Soal 7 - PG - Tipe: Reguler]
Doa setelah wudu dibaca sambil menghadap...
A) Jendela.
B) Teman.
C) Arah kiblat.
D) Kran air.`,
    `[Soal 8 - PG - Tipe: HOTS]
Anak berwudu tetapi lupa membasuh tangan sampai siku. Salatnya...
A) Tidak sah karena rukun wudu terlewat.
B) Tetap sah.
C) Sah jika ia tersenyum.
D) Sah jika airnya banyak.`,
    `[Soal 9 - PG - Tipe: HOTS]
Mengapa harus hemat air meski kran melimpah?
A) Supaya cepat selesai tanpa basuh.
B) Menghamburkan air dibenci Allah; peduli lingkungan.
C) Supaya wudu batal.
D) Supaya tidak perlu niat.`,
    `[Soal 10 - PG - Tipe: Reguler]
Urutan wajib setelah membasuh wajah adalah...
A) Kaki dulu.
B) Membasuh tangan sampai siku, lalu usap kepala, lalu kaki.
C) Telinga saja tanpa tangan.
D) Tidur lelap.`,
  ]),
  kartu: [
    {
      kode: "A",
      judul: "A. Ketentuan, Doa, dan Rukun Wudu",
      pengantar:
        "Infografis: wudu menyucikan hadas kecil. Rukun: niat, wajah, tangan sampai siku, usap rambut, kaki sampai mata kaki, tertib. Batal jika buang air, buang angin, atau tidur lelap.",
      labelDaftar: "Fungsi, rukun, dan hal membatalkan",
      kolom: 1,
      item: [
        {
          nama: "Fungsi wudu",
          singkat: "Suci sebelum salat",
          uraian:
            "Sebelum menghadap Allah dalam salat, tubuh harus suci. Wudu memakai air suci mensucikan untuk menghilangkan hadas kecil.",
          contoh: "Hadas kecil hilang dengan wudu.",
        },
        {
          nama: "Enam rukun",
          singkat: "Tidak boleh terlewat",
          uraian:
            "1 Niat. 2 Basuh wajah. 3 Basuh tangan hingga siku. 4 Usap sebagian kepala. 5 Basuh kaki hingga mata kaki. 6 Tertib, berurutan. Lupa siku: salat tidak sah.",
          contoh: "Niat, wajah, siku, kepala, kaki, tertib.",
        },
        {
          nama: "Yang membatalkan",
          singkat: "Wudu ulang",
          uraian:
            "Buang air kecil atau besar, buang angin, dan tidur lelap membatalkan wudu. Setelah batal, wajib berwudu lagi sebelum salat.",
          contoh: "Kentut? Wudu lagi.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Apakah sah salat seorang anak yang berwudu tetapi lupa tidak membasuh kedua tangannya sampai siku? Mengapa?",
          alias: ["tidak", "tidak sah", "rukun", "siku", "terlewat"],
        },
      ],
      kuisTulis: {
        pertanyaan:
          "Melakukan gerakan wudu secara berurutan dari awal sampai akhir disebut dengan istilah ........................",
        alias: ["tertib"],
      },
      voice: [
        [
          "Anak-anak muslim yang salih, sebelum kita menghadap Allah dalam ibadah salat, tubuh kita harus dalam keadaan bersih dan suci. Caranya adalah dengan berwudu menggunakan air yang bersih dan suci mensucikan.",
          "Wudu memiliki aturan wajib yang disebut Rukun Wudu. Rukun wudu ini tidak boleh ada yang terlewat ya, mulai dari membaca niat di dalam hati, membasuh wajah, mencuci kedua tangan sampai siku, mengusap sebagian kepala, hingga mencuci kedua kaki sampai mata kaki.",
          "Semuanya harus dilakukan secara tertib atau berurutan dari nomor satu sampai terakhir. Jangan lupa, jagalah wudumu agar tidak batal karena buang angin atau buang air!",
        ],
      ],
    },
    {
      kode: "B",
      judul: "B. Praktik Tata Cara Wudu sesuai Sunah",
      pengantar:
        "Infografis urutan sempurna: telapak dan kumur, hidung, wajah, tangan kanan-kiri sampai siku, kepala dan telinga, kaki kanan-kiri sampai mata kaki. Hemat air. Doa menghadap kiblat.",
      labelDaftar: "Gerakan sunah dan tata krama air",
      kolom: 1,
      item: [
        {
          nama: "Urutan praktik",
          singkat: "Kanan dahulu",
          uraian:
            "Cuci telapak sambil basmalah, kumur tiga kali, bersih hidung, basuh wajah merata, tangan kanan lalu kiri sampai siku, usap kepala dan telinga, kaki kanan lalu kiri sampai mata kaki, sela-sela jari.",
          contoh: "Kanan dulu, lalu kiri.",
        },
        {
          nama: "Tata krama air",
          singkat: "Jangan boros",
          uraian:
            "Buka kran kecil saja. Gunakan air secukupnya. Menghambur-hamburkan air dibenci Allah, meski air di sekolah melimpah.",
          contoh: "Kran kecil. Air cukup.",
        },
        {
          nama: "Setelah wudu",
          singkat: "Doa ke kiblat",
          uraian:
            "Alhamdulillah wudu selesai. Doa setelah wudu dibaca sambil menghadap kiblat, arah Kakbah.",
          contoh: "Doa menghadap kiblat.",
        },
      ],
      kuis: [
        {
          pertanyaan:
            "Saat berwudu, anggota tubuh bagian mana yang harus kita dahulukan antara kanan dan kiri?",
          alias: ["kanan", "sebelah kanan"],
        },
      ],
      kuisTulis: {
        pertanyaan: "Doa setelah wudu dibaca sambil menghadap ke arah ........................",
        alias: ["kiblat", "kakbah", "ka'bah", "kabah"],
      },
      voice: [
        [
          "Yuk, sekarang kita praktik berwudu dengan sempurna di tempat wudu sekolah! Nyalakan kran airnya kecil saja ya, tidak perlu sampai memuncrat ke mana-mana agar kita hemat air.",
          "Pertama, cuci telapak tangan sambil membaca Basmalah. Kedua, berkumurlah tiga kali untuk membersihkan mulut, lalu hirup air sedikit ke hidung. Nah, sekarang masuk ke bagian wajib: basuhlah seluruh wajahmu merata dari batas tumbuhnya rambut hingga bawah dagu.",
          "Lanjutkan dengan mencuci tangan kanan lalu kiri sampai melewati siku. Usap kepala dan bersihkan kedua telinga luar dalam. Terakhir, cuci kaki kanan lalu kiri sampai melewati mata kaki dan bersihkan sela-sela jari kakimu. Alhamdulillah, wudu kita selesai!",
        ],
      ],
    },
    {
      kode: "C",
      judul: "C. Lembar Evaluasi Siswa",
      pengantar:
        "Pilih hal yang membatalkan dan batas siku, tentukan benar-salah telinga dan kanan-kiri, urutkan empat gerakan wajib, lalu jelaskan hemat air dan peduli lingkungan.",
      labelDaftar: "Pilihan, benar-salah, urutan, dan esai",
      kolom: 1,
      item: [
        {
          nama: "Kelompok A dan B",
          singkat: "Batal dan siku",
          uraian:
            "Kentut membatalkan wudu. Tangan wajib sampai siku. Telinga bukan rukun wajib, salah jika disebut rukun. Mendahulukan kanan: benar, sunah.",
          contoh: "Kentut batal. Sampai siku. Kanan sunah.",
        },
        {
          nama: "Kelompok C dan D",
          singkat: "Urut dan hemat",
          uraian:
            "1 Niat dan wajah. 2 Tangan sampai siku. 3 Usap kepala. 4 Kaki sampai mata kaki. Hemat air meski melimpah: Allah benci boros, jaga lingkungan.",
          contoh: "Wajah, siku, kepala, kaki. Jangan boros.",
        },
      ],
      kuis: [
        { pertanyaan: "Yang membatalkan wudu?", alias: ["kentut", "angin"] },
        { pertanyaan: "Tangan wajib sampai?", alias: ["siku"] },
        { pertanyaan: "Telinga termasuk rukun wajib?", alias: ["salah", "tidak"] },
        { pertanyaan: "Kanan didahulukan?", alias: ["benar"] },
        { pertanyaan: "Urutan pertama wajib?", alias: ["niat", "wajah"] },
        { pertanyaan: "Mengapa hemat air?", alias: ["boros", "lingkung", "allah"] },
      ],
      voice: [
        [
          "Kentut membatalkan wudu. Tangan wajib sampai siku. Telinga sunah, kanan didahulukan.",
        ],
        [
          "Urutan: niat dan wajah, tangan siku, usap kepala, kaki. Hemat air, peduli lingkungan.",
        ],
      ],
    },
  ],
};
