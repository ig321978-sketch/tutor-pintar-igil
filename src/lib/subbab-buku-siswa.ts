/** Subbab resmi buku siswa Kurikulum Merdeka (Pusat Perbukuan). Hanya daftar isi, bukan naskah buku. */

const PAI = "Pendidikan Agama Islam dan Budi Pekerti";
const IPAS = "Ilmu Pengetahuan Alam dan Sosial (IPAS)";

const SUBBAB_BUKU_SISWA: Record<string, Record<string, Record<string, string[]>>> = {
  "1 SD": {
    [PAI]: {
      "Bab 1: Aku Cinta Al-Qur’an": [
        "A. Mengenal Huruf Hijaiyah",
        "B. Mengenal Harakat",
        "C. Menghafal Surah Al-Fatihah",
      ],
      "Bab 2: Mengenal Rukun Iman": [
        "A. Pengertian Iman",
        "B. Mengenal Allah melalui Asmaul Husna",
        "C. Iman yang Terlihat dalam Perbuatan",
      ],
      "Bab 3: Perilaku Terpuji (Akhlak Mulia)": [
        "A. Membaca Basmalah dan Hamdalah",
        "B. Sayang kepada Keluarga dan Teman",
      ],
      "Bab 4: Mengenal Bersuci (Thaharah)": [
        "A. Arti Bersuci",
        "B. Macam-Macam Bersuci",
      ],
      "Bab 5: Kisah Teladan Nabi Muhammad SAW": [
        "A. Kelahiran Nabi Muhammad SAW",
        "B. Sifat Jujur Nabi Muhammad SAW",
      ],
      "Bab 6: Mengenal Surah Al-Ikhlas": [
        "A. Membaca dan Menghafal Surah Al-Ikhlas",
        "B. Kandungan Surah Al-Ikhlas",
      ],
      "Bab 7: Rukun Islam": [
        "A. Lima Pilar Rukun Islam",
        "B. Menyanyikan Lagu Rukun Islam",
      ],
      "Bab 8: Bersyukur dan Berterima Kasih": [
        "A. Mengucapkan Terima Kasih",
        "B. Menjaga Lingkungan sebagai Syukur",
      ],
      "Bab 9: Tata Cara Berwudu": [
        "A. Praktik Berwudu secara Tertib",
        "B. Mengapa Wudu Harus Tertib",
      ],
      "Bab 10: Kisah Nabi Adam AS": [
        "A. Nabi Adam Manusia dan Nabi Pertama",
        "B. Pelajaran dari Kisah Nabi Adam",
      ],
    },
    Matematika: {
      "Bab 1: Ayo Membilang sampai dengan 10": [
        "Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan",
        "Sub-Bab B: Membandingkan Banyak Benda",
        "Sub-Bab C: Menghitung Maju dan Mundur",
        "Sub-Bab D: Pasangan Bilangan",
        "Misi penjaga kebun angka",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 1: Ayo Berhitung!": [
        "Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan",
        "Sub-Bab B: Membandingkan Banyak Benda",
        "Sub-Bab C: Menghitung Maju dan Mundur",
        "Sub-Bab D: Pasangan Bilangan",
        "Misi penjaga kebun angka",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 2: Penjumlahan sampai dengan 10": [
        "Piknik seru di pantai",
        "Ayo menjumlahkan",
        "Kapal pengumpul harta laut",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 3: Pengurangan sampai dengan 10": [
        "Pesta ulang tahun yang hilang",
        "Ayo mengurangi",
        "Toko roti Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 4: Mengenal Bentuk": [
        "Sub-Bab A: Mendeskripsikan Benda Berdasarkan Bentuk",
        "Sub-Bab B: Mengelompokkan Benda",
        "Sub-Bab C: Menyusun dan Mengurai Bentuk Bangun",
        "Misi detektif bentuk",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 5: Ayo Membilang sampai dengan 20": [
        "Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan",
        "Sub-Bab B: Menghitung Maju dan Mundur",
        "Sub-Bab C: Nilai Tempat",
        "Sub-Bab D: Membandingkan Bilangan",
        "Misi lomba bendera",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 6: Penjumlahan dan Pengurangan sampai dengan 20": [
        "Sub-Bab A: Mengenal Konsep Lebih dari, Kurang dari, dan Selisih",
        "Sub-Bab B: Penjumlahan yang Hasilnya Kurang dari 20",
        "Sub-Bab C: Pengurangan yang Hasilnya Kurang dari 20",
        "Misi selamatkan anak kucing",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 7: Mengukur Panjang Benda": [
        "Sub-Bab A: Membandingkan dan Mengurutkan Panjang Benda",
        "Sub-Bab B: Mengukur Panjang Benda",
        "Misi pesta layang-layang",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 8: Mengenal Diagram": [
        "Sub-Bab A: Mengelompokkan Data",
        "Sub-Bab B: Diagram Gambar",
        "Misi bereskan kantin",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
    },
  },
  "2 SD": {
    Matematika: {
      "Bab 1: Ayo Membilang sampai dengan 50": [
        "Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai dengan 50",
        "Sub-Bab B: Nilai Tempat",
        "Sub-Bab C: Membandingkan Dua Bilangan atau Lebih",
        "Misi penjaga loker kelas",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 2: Penjumlahan dan Pengurangan": [
        "Sub-Bab A: Berbagai Cara Melakukan Penjumlahan",
        "Sub-Bab B: Berbagai Cara Melakukan Pengurangan",
        "Sub-Bab C: Soal Cerita Penjumlahan dan Pengurangan",
        "Keranjang panen Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 3: Bentuk di Sekitar Kita": [
        "Sub-Bab A: Bangun Datar",
        "Sub-Bab B: Mengurai dan Menyusun Bangun Datar",
        "Sub-Bab C: Bangun Ruang",
        "Sisir madu Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 4: Posisi Benda dan Pola di Sekitar Kita": [
        "Sub-Bab A: Posisi Benda",
        "Sub-Bab B: Pola",
        "Ikat padi Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 5: Pecahan": [
        "Sub-Bab 5.1: Setengah dari Benda Utuh",
        "Sub-Bab 5.2: Seperempat dari Benda Utuh",
        "Sub-Bab 5.3: Setengah dari Kumpulan Benda",
        "Restoran Berbagi Adil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 6: Pengukuran": [
        "Sub-Bab 6.1: Membandingkan Berat Benda",
        "Sub-Bab 6.2: Mengukur Berat dengan Satuan Tak Baku",
        "Sub-Bab 6.3: Membaca Jam dan Durasi Waktu",
        "Misi Kereta Kargo Tepat Waktu",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
    },
  },
  "3 SD": {
    Matematika: {
      "Bab 1: Bilangan sampai 10.000": [
        "Membaca bilangan ribuan",
        "Nilai tempat ribuan sampai satuan",
        "Membandingkan bilangan",
        "Mengurutkan bilangan",
        "Bilangan dengan angka nol",
        "Papan Skor Kejuaraan Pandu",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 2: Penjumlahan dan Pengurangan": [
        "Penjumlahan tanpa menyimpan",
        "Penjumlahan dengan menyimpan",
        "Pengurangan tanpa meminjam",
        "Pengurangan dengan meminjam",
        "Soal cerita di perpustakaan",
        "Giliran Rak Hulu",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 3: Perkalian": [
        "Perkalian sebagai penjumlahan berulang",
        "Sifat pertukaran",
        "Sifat pengelompokan",
        "Perkalian dua angka",
        "Soal cerita perkalian",
        "Pos Balon Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 4: Pembagian": [
        "Pembagian sama banyak",
        "Pengurangan berulang",
        "Pembagian tanpa sisa",
        "Pembagian dengan sisa",
        "Hubungan perkalian dan pembagian",
        "Pos Es Lilin Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 5: Pecahan Sederhana": [
        "Pecahan setengah",
        "Pecahan sepertiga",
        "Pecahan seperempat",
        "Pembilang dan penyebut",
        "Membandingkan pecahan",
        "Pos Kertas Lipat Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 6: Pengukuran Panjang dan Berat": [
        "Satuan panjang",
        "Satuan berat",
        "Alat ukur",
        "Konversi panjang",
        "Konversi berat",
        "Pos Jalan Sehat Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
      "Bab 7: Waktu dan Durasi": [
        "Membaca jam",
        "Menit dan detik",
        "Lama kegiatan",
        "Jam mulai dan selesai",
        "Kalender",
        "Pos Panggung Igil",
        "Poin penting",
        "Lembar evaluasi siswa",
      ],
    },
  },
  "4 SD": {
    Matematika: {
      "Bab 1: Bilangan Cacah sampai 10.000": [
        "Membaca dan menulis bilangan cacah sampai 10.000",
        "Nilai tempat bilangan cacah sampai 10.000",
        "Membandingkan dan mengurutkan bilangan cacah sampai 10.000",
        "Komposisi dan dekomposisi bilangan cacah sampai 10.000",
        "Penjumlahan bilangan cacah sampai 1.000",
        "Pengurangan bilangan cacah sampai 1.000",
        "Perkalian bilangan cacah sampai 100",
        "Pembagian bilangan cacah sampai 100",
        "Faktor dan kelipatan",
      ],
      "Bab 2: Pecahan": [
        "Pecahan dengan pembilang satu",
        "Pecahan dengan penyebut sama",
        "Pecahan senilai",
        "Pecahan desimal persepuluhan dan perseratusan",
        "Menghubungkan pecahan desimal perseratusan dengan persen",
      ],
      "Bab 3: Pola Gambar dan Pola Bilangan": [
        "Pola gambar",
        "Pola bilangan",
      ],
      "Bab 4: Pengukuran Luas dan Volume": [
        "Pengukuran luas",
        "Pengukuran volume",
      ],
      "Bab 5: Bangun Datar": [
        "Ciri-ciri bangun datar",
        "Komposisi dan dekomposisi bangun datar",
      ],
      "Bab 6: Piktogram dan Diagram Batang": [
        "Piktogram",
        "Diagram batang",
      ],
    },
  },
  "5 SD": {
    Matematika: {
      "Bab 1: Bilangan Cacah Sampai 100.000": [
        "Membaca, menulis, dan nilai tempat sampai 100.000",
        "Membandingkan dan mengurutkan sampai 100.000",
        "Komposisi dan dekomposisi sampai 100.000",
        "Operasi hitung bilangan cacah sampai 100.000",
      ],
      "Bab 2: KPK dan FPB": [
        "Kelipatan",
        "Kelipatan persekutuan",
        "Faktor",
        "Faktor persekutuan",
        "Menentukan KPK dan FPB",
      ],
      "Bab 3: Bilangan Pecahan": [
        "Membandingkan dan mengurutkan pecahan",
        "Penjumlahan pecahan",
        "Pengurangan pecahan",
      ],
      "Bab 4: Keliling Bangun Datar": [
        "Pengertian keliling",
        "Keliling segitiga",
        "Keliling segi empat",
        "Keliling segi banyak",
        "Keliling bangun gabungan",
      ],
      "Bab 5: Luas Daerah Bangun Datar": [
        "Konsep luas daerah",
        "Luas bangun datar",
        "Luas bangun gabungan",
        "Hubungan keliling dan luas",
      ],
      "Bab 6: Sudut": [
        "Pengertian sudut",
        "Sudut siku-siku",
        "Mengukur dan membandingkan sudut",
        "Melukis sudut",
      ],
      "Bab 7: Membandingkan Ciri-Ciri Bangun Datar": [
        "Ciri-ciri segitiga",
        "Ciri-ciri segi empat",
      ],
      "Bab 8: Data": [
        "Mengumpulkan data",
        "Piktogram",
        "Diagram batang",
      ],
      "Bab 9: Bilangan Cacah Sampai 1.000.000": [
        "Membaca, menulis, dan nilai tempat sampai 1.000.000",
        "Mengurutkan dan membandingkan sampai 1.000.000",
        "Komposisi dan dekomposisi sampai 1.000.000",
      ],
    },
  },
  "6 SD": {
    Matematika: {
      "Bab 1: Pecahan dan Desimal": [
        "Perkalian bilangan asli dengan pecahan",
        "Perkalian pecahan dengan bilangan asli",
        "Pembagian pecahan dengan bilangan asli",
        "Pembagian bilangan asli dengan pecahan",
        "Mengubah pecahan menjadi desimal",
        "Membandingkan dan mengurutkan bilangan desimal",
      ],
      "Bab 2: Rasio": [
        "Membandingkan benda",
        "Pengertian rasio",
        "Kesamaan rasio",
        "Rasio satuan",
        "Rasio bagian terhadap bagian dan terhadap keseluruhan",
        "Rasio pada durasi waktu",
      ],
      "Bab 3: Kubus dan Balok": [
        "Mengonstruksi dan mengurai",
        "Visualisasi spasial",
        "Lokasi pada sistem berpetak",
        "Jalur dan jarak",
      ],
      "Bab 4: Peluang": ["Skala peluang", "Membandingkan peluang kejadian"],
    },
  },
};

const ALIAS_MAPEL: Record<string, string> = {
  "pendidikan agama dan budi pekerti": PAI,
  "pendidikan agama islam dan budi pekerti": PAI,
  ipas: IPAS,
  "ilmu pengetahuan alam dan sosial": IPAS,
  "ilmu pengetahuan alam dan sosial (ipas)": IPAS,
};

function normalisasi(teks: string): string {
  return teks
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^bab\s*\d+\s*[:.\-–]\s*/i, "")
    .replace(/^unit\s*\d+\s*[:.\-–]\s*/i, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function subbabBukuSiswa(
  kelas: string,
  mapel: string,
  materi: string,
): string[] {
  const dataKelas = SUBBAB_BUKU_SISWA[kelas];
  if (!dataKelas) return [];

  const namaMapel =
    ALIAS_MAPEL[mapel.trim().toLowerCase()] ?? mapel.trim();
  const dataMapel = dataKelas[namaMapel];
  if (!dataMapel) return [];

  const kunci = normalisasi(materi);
  if (!kunci) return [];

  let cadangan: string[] = [];
  for (const [bab, subbab] of Object.entries(dataMapel)) {
    const kunciBab = normalisasi(bab);
    if (kunciBab === kunci) return subbab;
    if (kunciBab.includes(kunci) || kunci.includes(kunciBab)) {
      cadangan = subbab;
    }
  }
  return cadangan;
}

export function kerangkaNaskahBuku(
  kelas: string,
  mapel: string,
  materi: string,
): string {
  const subbab = subbabBukuSiswa(kelas, mapel, materi);
  if (subbab.length > 0) {
    const daftar = subbab
      .map((item, indeks) => `${indeks + 1}. ${item}`)
      .join("\n");
    return `KERANGKA WAJIB dari daftar isi buku siswa Pusat Perbukuan (${mapel}, ${kelas}, ${materi}):
${daftar}
Jumlah kartu penjelasan HARUS ${subbab.length}, tidak boleh kurang atau lebih. Judul kartu mengikuti nama subbab di atas, urutan sama. DILARANG menambah, menggabungkan, atau mengganti subbab dengan tema bebas. Jika kerangka memuat penjumlahan, pengurangan, perkalian, atau pembagian, masing-masing WAJIB menjadi kartu sendiri.`;
  }

  return `Ikuti subbab resmi buku siswa Kurikulum Merdeka Pusat Perbukuan untuk ${kelas}, ${mapel}, materi ${materi}. Urutan kartu = urutan subbab A, B, C di buku itu. DILARANG membuat peta konsep atau kartu tematik yang tidak ada di daftar isi bab tersebut.`;
}
