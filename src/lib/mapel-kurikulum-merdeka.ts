/** Mata pelajaran tambahan sesuai Permendikbudristek 12/2024 dan Permendikdasmen 13/2025. */

const AGAMA_SD: Record<string, string[]> = {
  "Pendidikan Agama Islam dan Budi Pekerti": [
    "Bab 1: Mengenal Allah SWT",
    "Bab 2: Rukun Iman dan Rukun Islam",
    "Bab 3: Akhlak Terpuji",
    "Bab 4: Kisah Keteladanan Nabi",
  ],
  "Pendidikan Agama Kristen dan Budi Pekerti": [
    "Bab 1: Mengenal Allah",
    "Bab 2: Alkitab Firman Tuhan",
    "Bab 3: Kasih Kristus",
    "Bab 4: Hidup Bersyukur",
  ],
  "Pendidikan Agama Katolik dan Budi Pekerti": [
    "Bab 1: Allah Bapa yang Mengasihi",
    "Bab 2: Kitab Suci dan Doa",
    "Bab 3: Yesus Sahabatku",
    "Bab 4: Hidup Menggereja",
  ],
  "Pendidikan Agama Hindu dan Budi Pekerti": [
    "Bab 1: Hyang Widhi",
    "Bab 2: Kitab Suci Hindu",
    "Bab 3: Tri Hita Karana",
    "Bab 4: Yadnya dalam Kehidupan",
  ],
  "Pendidikan Agama Buddha dan Budi Pekerti": [
    "Bab 1: Triratna",
    "Bab 2: Kitab Suci Tripitaka",
    "Bab 3: Sila dan Metta",
    "Bab 4: Jalan Menuju Kebahagiaan",
  ],
  "Pendidikan Agama Khonghucu dan Budi Pekerti": [
    "Bab 1: Tian yang Esa",
    "Bab 2: Kitab Suci Ru",
    "Bab 3: Xiao dan Ren",
    "Bab 4: Menjadi Junzi",
  ],
};

const AGAMA_SMP: Record<string, string[]> = {
  "Pendidikan Agama Islam dan Budi Pekerti": [
    "Bab 1: Iman dan Taqwa",
    "Bab 2: Ibadah dan Karakter",
    "Bab 3: Al-Qur'an dan Hadis",
    "Bab 4: Akhlak kepada Sesama",
  ],
  "Pendidikan Agama Kristen dan Budi Pekerti": [
    "Bab 1: Iman kepada Kristus",
    "Bab 2: Gereja dan Pelayanan",
    "Bab 3: Hidup Kudus",
    "Bab 4: Kesaksian Iman",
  ],
  "Pendidikan Agama Katolik dan Budi Pekerti": [
    "Bab 1: Iman Katolik",
    "Bab 2: Sakramen",
    "Bab 3: Ajaran Sosial Gereja",
    "Bab 4: Kerasulan Awam",
  ],
  "Pendidikan Agama Hindu dan Budi Pekerti": [
    "Bab 1: Srada dan Bhakti",
    "Bab 2: Susila Hindu",
    "Bab 3: Yadnya dan Upacara",
    "Bab 4: Tatwa dalam Kehidupan",
  ],
  "Pendidikan Agama Buddha dan Budi Pekerti": [
    "Bab 1: Empat Kebenaran Mulia",
    "Bab 2: Jalan Mulia Berunsur Delapan",
    "Bab 3: Karma dan Kelahiran Kembali",
    "Bab 4: Meditasi dan Karakter",
  ],
  "Pendidikan Agama Khonghucu dan Budi Pekerti": [
    "Bab 1: Zhong dan Shu",
    "Bab 2: Li dan Yue",
    "Bab 3: Keluarga dan Masyarakat",
    "Bab 4: Junzi di Zaman Sekarang",
  ],
};

const AGAMA_SMA: Record<string, string[]> = {
  "Pendidikan Agama Islam dan Budi Pekerti": [
    "Bab 1: Iman, Ilmu, dan Amal",
    "Bab 2: Moderasi Beragama",
    "Bab 3: Fikih Kehidupan",
    "Bab 4: Dakwah dan Keteladanan",
  ],
  "Pendidikan Agama Kristen dan Budi Pekerti": [
    "Bab 1: Teologi dan Iman",
    "Bab 2: Etika Kristen",
    "Bab 3: Gereja dan Masyarakat",
    "Bab 4: Misi dan Pelayanan",
  ],
  "Pendidikan Agama Katolik dan Budi Pekerti": [
    "Bab 1: Iman dan Akal Budi",
    "Bab 2: Moral Katolik",
    "Bab 3: Gereja dalam Dunia",
    "Bab 4: Panggilan Hidup",
  ],
  "Pendidikan Agama Hindu dan Budi Pekerti": [
    "Bab 1: Brahmawidya",
    "Bab 2: Dharma dan Karma",
    "Bab 3: Kepemimpinan Hindu",
    "Bab 4: Hindu dan Peradaban",
  ],
  "Pendidikan Agama Buddha dan Budi Pekerti": [
    "Bab 1: Abhidhamma Dasar",
    "Bab 2: Etika Buddhis",
    "Bab 3: Buddhisme dan Sains",
    "Bab 4: Cinta Kasih Universal",
  ],
  "Pendidikan Agama Khonghucu dan Budi Pekerti": [
    "Bab 1: Filsafat Ru",
    "Bab 2: Etika Sosial",
    "Bab 3: Tian dan Kemanusiaan",
    "Bab 4: Junzi dan Kepemimpinan",
  ],
};

const SENI_SD: Record<string, string[]> = {
  Prakarya: [
    "Bab 1: Kerajinan Bahan Alam",
    "Bab 2: Kerajinan Bahan Buatan",
    "Bab 3: Rekayasa Sederhana",
    "Bab 4: Pengolahan Makanan",
  ],
  "Seni Rupa": [
    "Bab 1: Menggambar",
    "Bab 2: Mewarnai dan Motif",
    "Bab 3: Kolase dan Montase",
    "Bab 4: Karya Tiga Dimensi",
  ],
  "Seni Musik": [
    "Bab 1: Bernyanyi",
    "Bab 2: Irama dan Birama",
    "Bab 3: Alat Musik Sederhana",
    "Bab 4: Ansambel Kelas",
  ],
  "Seni Tari": [
    "Bab 1: Gerak Dasar Tari",
    "Bab 2: Tari Kreasi Anak",
    "Bab 3: Tari Daerah",
    "Bab 4: Pentas Tari",
  ],
  "Seni Teater": [
    "Bab 1: Bermain Peran",
    "Bab 2: Dongeng dan Drama",
    "Bab 3: Suara dan Ekspresi",
    "Bab 4: Pementasan Mini",
  ],
};

const SENI_SMP: Record<string, string[]> = {
  "Seni Rupa": [
    "Bab 1: Gambar Bentuk",
    "Bab 2: Gambar Ilustrasi",
    "Bab 3: Seni Rupa Terapan",
    "Bab 4: Pameran Kelas",
  ],
  "Seni Musik": [
    "Bab 1: Teori Musik Dasar",
    "Bab 2: Vokal",
    "Bab 3: Ansambel",
    "Bab 4: Apresiasi Musik Nusantara",
  ],
  "Seni Tari": [
    "Bab 1: Teknik Gerak",
    "Bab 2: Tari Tradisional",
    "Bab 3: Tari Kreasi",
    "Bab 4: Koreografi Sederhana",
  ],
  "Seni Teater": [
    "Bab 1: Olah Tubuh dan Vokal",
    "Bab 2: Naskah Drama",
    "Bab 3: Penyutradaraan Dasar",
    "Bab 4: Pementasan",
  ],
};

const SENI_SMA: Record<string, string[]> = {
  "Seni Rupa": [
    "Bab 1: Kritik Seni Rupa",
    "Bab 2: Berkarya Dua Dimensi",
    "Bab 3: Berkarya Tiga Dimensi",
    "Bab 4: Pameran dan Portofolio",
  ],
  "Seni Musik": [
    "Bab 1: Analisis Karya Musik",
    "Bab 2: Komposisi",
    "Bab 3: Pertunjukan",
    "Bab 4: Produksi Musik",
  ],
  "Seni Tari": [
    "Bab 1: Kajian Tari Nusantara",
    "Bab 2: Teknik dan Gaya",
    "Bab 3: Koreografi",
    "Bab 4: Pertunjukan Tari",
  ],
  "Seni Teater": [
    "Bab 1: Sejarah Teater",
    "Bab 2: Akting dan Sutradara",
    "Bab 3: Tata Artistik",
    "Bab 4: Produksi Pementasan",
  ],
};

const BAHASA_ASING: Record<string, string[]> = {
  "Bahasa Arab": [
    "Bab 1: Huruf dan Kosakata",
    "Bab 2: Percakapan Dasar",
    "Bab 3: Tata Bahasa Dasar",
    "Bab 4: Teks Fungsional",
  ],
  "Bahasa Jepang": [
    "Bab 1: Hiragana dan Kosakata",
    "Bab 2: Percakapan Sehari-hari",
    "Bab 3: Tata Bahasa Dasar",
    "Bab 4: Budaya Jepang",
  ],
  "Bahasa Jerman": [
    "Bab 1: Kosakata Dasar",
    "Bab 2: Percakapan",
    "Bab 3: Tata Bahasa Dasar",
    "Bab 4: Budaya Jerman",
  ],
  "Bahasa Prancis": [
    "Bab 1: Kosakata Dasar",
    "Bab 2: Percakapan",
    "Bab 3: Tata Bahasa Dasar",
    "Bab 4: Budaya Prancis",
  ],
  "Bahasa Mandarin": [
    "Bab 1: Pinyin dan Hanzi Dasar",
    "Bab 2: Percakapan",
    "Bab 3: Tata Bahasa Dasar",
    "Bab 4: Budaya Tionghoa",
  ],
  "Bahasa Korea": [
    "Bab 1: Hangul dan Kosakata",
    "Bab 2: Percakapan",
    "Bab 3: Tata Bahasa Dasar",
    "Bab 4: Budaya Korea",
  ],
};

const PILIHAN_LANJUT_SMA: Record<string, string[]> = {
  "Bahasa Indonesia Tingkat Lanjut": [
    "Bab 1: Kritik Sastra",
    "Bab 2: Esai dan Opini",
    "Bab 3: Penelitian Bahasa",
    "Bab 4: Produksi Teks Akademik",
  ],
  "Bahasa Inggris Tingkat Lanjut": [
    "Bab 1: Academic Reading",
    "Bab 2: Argumentative Writing",
    "Bab 3: Presentation and Debate",
    "Bab 4: Literary Analysis",
  ],
  "Sejarah Tingkat Lanjut": [
    "Bab 1: Historiografi",
    "Bab 2: Sejarah Lokal dan Lisan",
    "Bab 3: Sejarah Dunia",
    "Bab 4: Penelitian Sejarah",
  ],
};

const IPA_IPS_KELAS_10: Record<string, string[]> = {
  "Ilmu Pengetahuan Alam": [
    "Bab 1: Pengukuran dan Hakikat IPA",
    "Bab 2: Makhluk Hidup dan Lingkungan",
    "Bab 3: Zat dan Perubahannya",
    "Bab 4: Energi, Gaya, dan Bumi",
  ],
  "Ilmu Pengetahuan Sosial": [
    "Bab 1: Manusia, Tempat, dan Lingkungan",
    "Bab 2: Interaksi Sosial",
    "Bab 3: Aktivitas Ekonomi",
    "Bab 4: Kehidupan Berbangsa",
  ],
};

function sisipkanSetelah(
  inti: Record<string, string[]>,
  kunci: string,
  sisipan: Record<string, string[]>,
  ekstraAkhir: Record<string, string[]>,
): Record<string, string[]> {
  const hasil: Record<string, string[]> = {};
  for (const [nama, bab] of Object.entries(inti)) {
    hasil[nama] = bab;
    if (nama === kunci) Object.assign(hasil, sisipan);
  }
  return { ...hasil, ...ekstraAkhir };
}

export function perluasKurikulumMerdeka(
  inti: Record<string, Record<string, string[]>>,
): Record<string, Record<string, string[]>> {
  const hasil: Record<string, Record<string, string[]>> = {};

  for (const [kelas, mapel] of Object.entries(inti)) {
    if (kelas.endsWith(" SD")) {
      const ekstraAkhir = SENI_SD;
      hasil[kelas] = sisipkanSetelah(mapel, "Pendidikan Agama dan Budi Pekerti", AGAMA_SD, ekstraAkhir);
      continue;
    }
    if (kelas.endsWith(" SMP")) {
      hasil[kelas] = sisipkanSetelah(mapel, "Pendidikan Agama dan Budi Pekerti", AGAMA_SMP, SENI_SMP);
      continue;
    }
    if (kelas.startsWith("10 ")) {
      hasil[kelas] = sisipkanSetelah(mapel, "Pendidikan Agama dan Budi Pekerti", AGAMA_SMA, {
        ...IPA_IPS_KELAS_10,
        ...SENI_SMA,
        ...BAHASA_ASING,
      });
      continue;
    }
    hasil[kelas] = sisipkanSetelah(mapel, "Pendidikan Agama dan Budi Pekerti", AGAMA_SMA, {
      ...SENI_SMA,
      ...BAHASA_ASING,
      ...PILIHAN_LANJUT_SMA,
    });
  }

  return hasil;
}

export function labelJenjangKelas(kelas: string): string {
  if (kelas.endsWith(" SMP")) return `Kelas ${kelas.replace(" SMP", " SMP / SLTP")}`;
  if (kelas.endsWith(" SMA")) return `Kelas ${kelas.replace(" SMA", " SMA / SLTA")}`;
  return `Kelas ${kelas}`;
}
