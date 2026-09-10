import type { IsiCacheMateri } from "@/lib/jenis-cache-materi";
import { gabungNaskahDariEditor } from "@/lib/batas-naskah";

export const JUDUL_PAI1_BAB2 = "Bab 2: Mengenal Rukun Iman";

export const TEKS_KARTU_IMAN =
  "Iman artinya percaya dengan hati yang yakin, diucapkan dengan lisan, dan dibuktikan dengan perbuatan. Anak muslim yang salih percaya kepada Allah dan utusan-Nya. Rukun Iman ada 6 perkara yang menjadi tiang kokoh di hati.";

export const TEKS_KARTU_ASMAUL =
  "Allah memiliki nama-nama yang sangat indah. Nama itu disebut Asmaul Husna. Dua di antaranya yang kita pelajari hari ini adalah Ar-Rahman dan Ar-Rahim.";

export const TEKS_KARTU_AMAL =
  "Iman bukan hanya tersimpan di hati. Iman yang benar terlihat dari ucapan yang lembut dan perbuatan yang baik. Kalau hati percaya Allah Maha Pengasih, tangan kita ikut mengasihi teman, hewan, dan tanaman.";

export const RUKUN_IMAN_PAI1_BAB2 = [
  {
    nomor: 1,
    nama: "Iman kepada Allah SWT",
    singkat: "Percaya Allah Tuhan semesta alam",
    uraian:
      "Allah yang menciptakan matahari, hujan, ibu, ayah, dan kita. Tidak ada yang menyerupai-Nya.",
    contoh: "Kita berdoa hanya kepada Allah, bukan kepada benda.",
  },
  {
    nomor: 2,
    nama: "Iman kepada Malaikat Allah",
    singkat: "Percaya makhluk halus yang taat",
    uraian:
      "Malaikat tidak pernah membantah Allah. Mereka mencatat kebaikan dan menjaga kita.",
    contoh: "Kita berbicara sopan karena malaikat mendengar ucapan kita.",
  },
  {
    nomor: 3,
    nama: "Iman kepada Kitab-Kitab Allah",
    singkat: "Percaya wahyu tertulis dari Allah",
    uraian:
      "Allah mengirim kitab sebagai surat cinta dan pedoman. Kitab terakhir adalah Al-Qur'an.",
    contoh: "Kita menjaga Al-Qur'an, tidak melempar atau menginjaknya.",
  },
  {
    nomor: 4,
    nama: "Iman kepada Rasul-Rasul Allah",
    singkat: "Percaya utusan Allah kepada manusia",
    uraian:
      "Rasul mengajarkan cara menyembah Allah. Nabi Muhammad adalah rasul terakhir dan teladan kita.",
    contoh: "Kita meniru Nabi yang jujur, penyayang, dan tidak pernah berbohong.",
  },
  {
    nomor: 5,
    nama: "Iman kepada Hari Kiamat",
    singkat: "Percaya dunia suatu hari berakhir",
    uraian:
      "Semua akan kembali kepada Allah. Kebaikan dan keburukan akan ditimbang dengan adil.",
    contoh: "Kita berbuat baik hari ini, karena setiap amal akan bertemu lagi.",
  },
  {
    nomor: 6,
    nama: "Iman kepada Qada dan Qadar",
    singkat: "Percaya ketentuan Allah yang bijaksana",
    uraian:
      "Ada hal yang sudah Allah rencanakan. Kita tetap berusaha, lalu menerima hasil dengan hati yang tenang.",
    contoh: "Kalah bermain tetap tersenyum, lalu berlatih lagi lebih rajin.",
  },
] as const;

export const ASMAUL_HUSNA_PAI1_BAB2 = [
  {
    arab: "الرَّحْمَٰنُ",
    latin: "Ar-Rahman",
    arti: "Maha Pengasih",
    uraian:
      "Allah mengasihi semua makhluk di dunia: manusia, hewan, tumbuhan, bahkan orang yang belum mengenal-Nya. Kasih ini seperti payung besar yang menaungi siapa saja.",
    contoh: "Hujan turun untuk semua kebun, bukan hanya kebun anak yang salat.",
  },
  {
    arab: "الرَّحِيمُ",
    latin: "Ar-Rahim",
    arti: "Maha Penyayang",
    uraian:
      "Allah menyayangi orang-orang yang beriman dengan kasih yang istimewa. Kasih ini seperti selimut hangat yang diberikan kepada anak yang menjaga hatinya.",
    contoh: "Anak yang jujur dan penyayang merasakan ketenangan di hati.",
  },
] as const;

export const AMAL_IMAN_PAI1_BAB2 = [
  {
    nama: "Hati yang yakin",
    uraian:
      "Kita percaya Allah melihat kita meski tidak ada orang dewasa di dekat kita.",
    contoh: "Pensil teman tidak diambil, karena Allah tetap melihat.",
  },
  {
    nama: "Lisan yang lembut",
    uraian:
      "Karena malaikat mencatat ucapan, kita memilih kata yang tidak menyakiti.",
    contoh: "Memanggil teman dengan namanya, bukan julukan yang mengejek.",
  },
  {
    nama: "Tangan yang menolong",
    uraian:
      "Karena Allah Ar-Rahman mengasihi semua makhluk, kita ikut berbagi dan menjaga.",
    contoh: "Membagi bekal, menyiram tanaman, dan tidak menyakiti kucing.",
  },
] as const;

export function naskahTampilanPai1Bab2(teks?: string): boolean {
  const naskah = teks ?? "";
  if (/\[Soal\s+\d+/i.test(naskah)) return false;
  return (
    /Rukun Iman/i.test(naskah) &&
    /Ar-?Rahman/i.test(naskah) &&
    /Ar-?Rahim/i.test(naskah) &&
    /Qada dan Qadar/i.test(naskah)
  );
}

export function teksLisanPai1Bab2(): string {
  const rukun = RUKUN_IMAN_PAI1_BAB2.map(
    (item) =>
      `${item.nomor}. ${item.nama}. ${item.uraian} Contoh ${item.contoh}`,
  ).join(" ");
  const asmaul = ASMAUL_HUSNA_PAI1_BAB2.map(
    (item) =>
      `${item.latin}. Artinya ${item.arti}. ${item.uraian} Contoh ${item.contoh}`,
  ).join(" ");
  const amal = AMAL_IMAN_PAI1_BAB2.map(
    (item) => `${item.nama}. ${item.uraian} Contoh ${item.contoh}`,
  ).join(" ");
  return [
    JUDUL_PAI1_BAB2,
    "A. Pengertian Iman.",
    TEKS_KARTU_IMAN,
    "Enam Rukun Iman.",
    rukun,
    "B. Mengenal Allah melalui Asmaul Husna.",
    TEKS_KARTU_ASMAUL,
    asmaul,
    "C. Iman yang Terlihat dalam Perbuatan.",
    TEKS_KARTU_AMAL,
    amal,
  ].join(" ");
}

function naskahKurikulum(): string {
  return gabungNaskahDariEditor({
    kepala: `Judul: ${JUDUL_PAI1_BAB2}\nWaktu: 4 JP`,
    bagian: [
      {
        nomor: 1,
        judul: "A. Pengertian Iman",
        tubuh: [
          TEKS_KARTU_IMAN,
          "",
          "LENGKAP: 6 Rukun Iman",
          ...RUKUN_IMAN_PAI1_BAB2.map(
            (item) =>
              `${item.nomor}. ${item.nama}: ${item.uraian} Contoh: ${item.contoh}`,
          ),
        ].join("\n"),
      },
      {
        nomor: 2,
        judul: "B. Mengenal Allah melalui Asmaul Husna",
        tubuh: [
          TEKS_KARTU_ASMAUL,
          "",
          ...ASMAUL_HUSNA_PAI1_BAB2.map(
            (item) =>
              `${item.latin} (${item.arab}): ${item.arti}. ${item.uraian} Contoh: ${item.contoh}`,
          ),
        ].join("\n"),
      },
      {
        nomor: 3,
        judul: "C. Iman yang Terlihat dalam Perbuatan",
        tubuh: [
          TEKS_KARTU_AMAL,
          "",
          ...AMAL_IMAN_PAI1_BAB2.map(
            (item) => `${item.nama}: ${item.uraian} Contoh: ${item.contoh}`,
          ),
        ].join("\n"),
      },
    ],
  });
}

function naskahLatihan(): string {
  return `[Soal 1 - PG - Tipe: Reguler]
Iman artinya...
A) Berlari
B) Percaya
C) Tidur
D) Bermain

[Soal 2 - PG - Tipe: Reguler]
Rukun Iman ada...
A) 4 perkara
B) 5 perkara
C) 6 perkara
D) 7 perkara

[Soal 3 - PG - Tipe: Reguler]
Rukun Iman yang pertama adalah iman kepada...
A) Malaikat
B) Rasul
C) Allah SWT
D) Hari Kiamat

[Soal 4 - PG - Tipe: Reguler]
Rukun Iman yang keenam adalah iman kepada...
A) Kitab-Kitab Allah
B) Qada dan Qadar
C) Malaikat
D) Rasul

[Soal 5 - PG - Tipe: Reguler]
Ar-Rahman artinya Allah Maha...
A) Melihat
B) Mendengar
C) Pengasih
D) Kuasa

[Soal 6 - PG - Tipe: Reguler]
Ar-Rahim artinya Allah Maha...
A) Penyayang
B) Besar
C) Tahu
D) Hidup

[Soal 7 - PG - Tipe: Reguler]
Kitab terakhir yang wajib kita imani adalah...
A) Dongeng
B) Al-Qur'an
C) Majalah
D) Kamus

[Soal 8 - PG - Tipe: Reguler]
Rasul terakhir yang menjadi teladan kita adalah...
A) Nabi Adam
B) Nabi Musa
C) Nabi Isa
D) Nabi Muhammad

[Soal 9 - PG - Tipe: HOTS]
Hujan membasahi kebun semua orang. Ini mencontohkan nama Allah...
A) Ar-Rahim saja
B) Ar-Rahman
C) Nama malaikat
D) Nama rasul

[Soal 10 - PG - Tipe: HOTS]
Anak berkata "saya beriman", tetapi menyakiti kucing. Iman yang benar seharusnya...
A) Hanya diucapkan
B) Disembunyikan
C) Terlihat dari perbuatan baik
D) Diganti dengan marah`;
}

export function naskahPai1Bab2(): IsiCacheMateri {
  const kurikulum = naskahKurikulum();
  return {
    curriculum_view: kurikulum,
    global_best_view: kurikulum,
    sketsaKartu: [
      "Enam tiang rumah di hati anak yang menulis Rukun Iman.",
      "Payung besar Ar-Rahman menaungi semua makhluk.",
      "Selimut hangat Ar-Rahim untuk anak yang beriman.",
      "Anak berbagi bekal dan menyayangi kucing di halaman sekolah.",
    ].join("\n\n"),
    svgCode: "",
    pertanyaan: naskahLatihan(),
    kunciJawaban: "B,C,C,B,C,A,B,D,B,C",
    motivasi:
      "Ayo kokohkan iman: percaya kepada Allah, kenali Asmaul Husna, dan tunjukkan kasih sayang setiap hari.",
    referensiUrl: "",
  };
}
