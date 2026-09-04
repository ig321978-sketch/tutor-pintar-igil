/** Subbab resmi buku siswa Kurikulum Merdeka (Pusat Perbukuan). Hanya daftar isi, bukan naskah buku. */

const PAI = "Pendidikan Agama Islam dan Budi Pekerti";
const IPAS = "Ilmu Pengetahuan Alam dan Sosial (IPAS)";

const SUBBAB_BUKU_SISWA: Record<string, Record<string, Record<string, string[]>>> = {
  "1 SD": {
    Matematika: {
      "Bab 1: Ayo Membilang sampai dengan 10": [
        "Membilang banyak benda sampai 10",
        "Membaca dan menulis lambang bilangan 1 sampai 10",
        "Membandingkan banyak benda sampai 10",
      ],
      "Bab 2: Penjumlahan sampai dengan 10": [
        "Menggabungkan dua kelompok benda",
        "Menulis penjumlahan dengan angka",
        "Menjumlahkan sampai 10",
      ],
      "Bab 3: Pengurangan sampai dengan 10": [
        "Mengambil sebagian dari sekelompok benda",
        "Menulis pengurangan dengan angka",
        "Mengurangi sampai 10",
      ],
      "Bab 4: Mengenal Bentuk": [
        "Mendeskripsikan benda berdasarkan bentuk",
        "Mengenali bangun datar sederhana",
        "Menyusun dan mengurai bentuk bangun",
      ],
      "Bab 5: Ayo Membilang sampai dengan 20": [
        "Membilang sampai 20",
        "Puluhan dan satuan sampai 20",
        "Membaca dan menulis bilangan sampai 20",
      ],
      "Bab 6: Penjumlahan dan Pengurangan sampai dengan 20": [
        "Penjumlahan sampai 20",
        "Pengurangan sampai 20",
        "Soal cerita penjumlahan dan pengurangan",
      ],
      "Bab 7: Mengukur Panjang Benda": [
        "Membandingkan panjang benda",
        "Mengukur panjang dengan satuan tidak baku",
      ],
      "Bab 8: Mengenal Diagram": [
        "Mengumpulkan data sederhana",
        "Membaca diagram gambar",
      ],
    },
  },
  "3 SD": {
    Matematika: {
      "Bab 1: Bilangan Cacah sampai 1.000": [
        "Bilangan dan lambang bilangan cacah sampai 1.000",
        "Nilai tempat bilangan cacah sampai 1.000",
        "Membandingkan dan mengurutkan bilangan cacah sampai 1.000",
        "Penjumlahan bilangan cacah sampai 100",
        "Pengurangan bilangan cacah sampai 100",
        "Perkalian bilangan cacah sampai 100",
        "Pembagian bilangan cacah sampai 100",
      ],
      "Bab 2: Kalimat Matematika": [
        "Kalimat matematika penjumlahan bilangan cacah",
        "Kalimat matematika pengurangan bilangan cacah",
      ],
      "Bab 3: Pengukuran Panjang dan Berat": [
        "Pengukuran panjang dengan satuan baku",
        "Hubungan antarsatuan baku panjang",
        "Pengukuran berat dengan satuan baku",
        "Hubungan antarsatuan baku berat",
      ],
      "Bab 4: Unsur-Unsur Bangun Datar": [
        "Sisi pada bangun datar",
        "Sudut pada bidang datar",
        "Garis tegak lurus dan garis sejajar",
      ],
      "Bab 5: Penyajian Data dalam Tabel": [
        "Mengurutkan dan membandingkan data",
        "Menyajikan data dalam bentuk tabel",
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
