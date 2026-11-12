/**
 * Lab Batang (Kelas 5 Bab 8, Sub-Bab C: Diagram Batang): logika murni. Satu alat, tiga tampilan.
 *  Baca   : judul dilihat, lalu skala, lalu tinggi batang dibaca menjadi nilai (Bar Chart Reading Protocol).
 *  Skala  : langkah sumbu dipilih dan diputuskan baik atau tidak: muat dalam sepuluh garis, lebih dari separuh tinggi,
 *           jarak angka teratur, dan mulai dari nol (Axis Scale Consistency).
 *  Banding: batang ganda dua kelompok dengan skala sama: selisih, tren, lalu memilih penyajian yang tepat
 *           (Comparative Bar Analysis dan Representation Choice).
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 8 Sub-Bab C (medali emas, cara berangkat, perpustakaan, panen lele).
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b8.mjs.
 */

export const GARIS = 10;
/** Langkah skala yang bisa dipilih (mulai dari nol, jarak teratur). */
export const SKALA_LANGKAH = [1, 2, 5, 10, 20, 50];
/** 0 = jarak angka tidak teratur, -1 = mulai bukan dari nol. */
export const SKALA_LONCAT = 0;
export const SKALA_BUKAN_NOL = -1;
export const SKALA_PILIHAN = [...SKALA_LANGKAH, SKALA_LONCAT, SKALA_BUKAN_NOL];
export const MULAI_BUKAN_NOL = 20;
export const NAMA_PENYAJIAN = ["Tabel", "Piktogram", "Diagram batang"] as const;
export const NAMA_TREN = ["naik", "turun", "tetap"] as const;

export type DataBatang = {
  nama: string;
  judul: string;
  kategori: [string, string, string, string];
  nilai: [number, number, number, number];
  /** Langkah skala yang baik untuk data ini. */
  langkah: number;
  /** Kategori yang ditanyakan di tampilan Baca. */
  target: number;
};

export const DATA_BATANG: DataBatang[] = [
  { nama: "medali emas Sea Games", judul: "Medali Emas Indonesia", kategori: ["2013", "2015", "2017", "2019"], nilai: [40, 50, 30, 45], langkah: 5, target: 3 },
  { nama: "cara berangkat sekolah", judul: "Cara Berangkat ke Sekolah", kategori: ["Jalan kaki", "Sepeda", "Angkot", "Motor"], nilai: [60, 30, 20, 40], langkah: 10, target: 1 },
  { nama: "pengunjung perpustakaan", judul: "Pengunjung Perpustakaan", kategori: ["Senin", "Selasa", "Rabu", "Kamis"], nilai: [25, 35, 15, 30], langkah: 5, target: 1 },
  { nama: "panen lele", judul: "Panen Lele per Kolam", kategori: ["Kolam 1", "Kolam 2", "Kolam 3", "Kolam 4"], nilai: [120, 80, 100, 60], langkah: 20, target: 2 },
  { nama: "pemakaian internet", judul: "Jam Internet per Minggu", kategori: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"], nilai: [14, 18, 6, 10], langkah: 2, target: 0 },
  { nama: "kalori makanan", judul: "Kalori Tiap Makanan", kategori: ["Nasi", "Roti", "Mi", "Kentang"], nilai: [180, 100, 140, 120], langkah: 20, target: 3 },
];

export type DataGanda = {
  nama: string;
  judul: string;
  kategori: [string, string, string, string];
  kelompok: [string, string];
  l: [number, number, number, number];
  p: [number, number, number, number];
  langkah: number;
  /** Kategori yang dicari selisihnya. */
  target: number;
  /** Penyajian yang tepat: 0 tabel, 1 piktogram, 2 diagram batang. */
  penyajian: number;
  tujuan: string;
};

export const DATA_GANDA: DataGanda[] = [
  { nama: "siswa tiap tahun", judul: "Siswa Laki-laki dan Perempuan", kategori: ["2020", "2021", "2022", "2023"], kelompok: ["Laki-laki", "Perempuan"], l: [30, 40, 35, 50], p: [25, 45, 35, 40], langkah: 5, target: 3, penyajian: 2, tujuan: "Guru ingin membandingkan dua kelompok pada empat tahun sekilas lewat tinggi rendahnya." },
  { nama: "medali dua jenis", judul: "Medali Emas dan Perak", kategori: ["2015", "2017", "2019", "2021"], kelompok: ["Emas", "Perak"], l: [20, 30, 10, 40], p: [15, 35, 25, 30], langkah: 5, target: 2, penyajian: 0, tujuan: "Panitia ingin menyebut jumlah medali yang tepat untuk tiap tahun, sampai satuan terkecil." },
  { nama: "pengunjung perpustakaan", judul: "Pengunjung Laki-laki dan Perempuan", kategori: ["Senin", "Selasa", "Rabu", "Kamis"], kelompok: ["Laki-laki", "Perempuan"], l: [60, 40, 80, 50], p: [30, 70, 50, 60], langkah: 10, target: 1, penyajian: 1, tujuan: "Pustakawan ingin menempel gambar menarik untuk anak kecil, satu gambar mewakili sepuluh pengunjung." },
  { nama: "pembeli kantin", judul: "Pembeli Kantin Putra dan Putri", kategori: ["Pagi", "Siang", "Sore", "Malam"], kelompok: ["Putra", "Putri"], l: [100, 140, 60, 120], p: [80, 160, 100, 40], langkah: 20, target: 0, penyajian: 2, tujuan: "Pemilik kantin ingin melihat sekilas waktu mana yang paling ramai dan kelompok mana yang lebih banyak." },
  { nama: "peserta lomba", judul: "Peserta Lomba Putra dan Putri", kategori: ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4"], kelompok: ["Putra", "Putri"], l: [14, 18, 10, 6], p: [12, 16, 14, 8], langkah: 2, target: 2, penyajian: 0, tujuan: "Wali kelas ingin mencatat angka rinci tiap kelas, termasuk jumlah yang kecil." },
  { nama: "buku dipinjam", judul: "Buku Dipinjam Tiap Bulan", kategori: ["Januari", "Februari", "Maret", "April"], kelompok: ["Cerita", "Sains"], l: [200, 150, 300, 100], p: [100, 200, 150, 50], langkah: 50, target: 1, penyajian: 1, tujuan: "Perpustakaan ingin poster bergambar buku untuk anak kecil, satu buku mewakili lima puluh." },
];

export const idBaca = (i: number): string => `baca:${i}`;
export const idSkala = (i: number, c: number): string => `skala:${i}:${c}`;
export const idTolak = (i: number, c: number): string => `tolak:${i}:${c}`;
export const idSelisih = (i: number): string => `selisih:${i}`;
export const idTren = (i: number): string => `tren:${i}`;
export const idPilih = (i: number): string => `pilih:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const nilaiTertinggi = (nilai: readonly number[]): number => Math.max(...nilai);
export type AlasanSkala = "baik" | "meluap" | "longgar" | "loncat" | "bukan-nol";
/** Menilai satu pilihan skala untuk nilai tertinggi: muat dalam sepuluh garis, dan lebih dari separuh tinggi. */
export function nilaiSkala(tertinggi: number, c: number): AlasanSkala {
  if (c === SKALA_LONCAT) return "loncat";
  if (c === SKALA_BUKAN_NOL) return "bukan-nol";
  if (tertinggi > GARIS * c) return "meluap";
  if (tertinggi <= (GARIS / 2) * c) return "longgar";
  return "baik";
}
export const skalaBaik = (tertinggi: number, c: number): boolean => nilaiSkala(tertinggi, c) === "baik";
/** Tinggi batang dalam garis: nilai dibagi langkah. */
export const garisBatang = (nilai: number, langkah: number): number => nilai / langkah;

export type PilihanTiga = { opsi: [number, number, number]; benar: number };
const putar3 = <T,>(a: [T, T, T], k: number): [T, T, T] => [a[k % 3], a[(k + 1) % 3], a[(k + 2) % 3]];
/** Tiga pilihan nilai untuk Baca: nilai benar, banyak garis saja, dan satu garis lebih. */
export function opsiBacaBatang(i: number): PilihanTiga {
  const d = DATA_BATANG[i];
  const v = d.nilai[d.target];
  const susun = putar3([v, v / d.langkah, v + d.langkah], i);
  return { opsi: susun, benar: susun.indexOf(v) };
}
export const selisihGanda = (d: DataGanda): number => Math.abs(d.l[d.target] - d.p[d.target]);
/** Tiga pilihan selisih: selisih benar, jumlah kedua kelompok, dan selisih dalam garis. */
export function opsiSelisih(i: number): PilihanTiga {
  const d = DATA_GANDA[i];
  const s = selisihGanda(d);
  const susun = putar3([s, d.l[d.target] + d.p[d.target], s / d.langkah], i);
  return { opsi: susun, benar: susun.indexOf(s) };
}
/** Tren kelompok pertama dari kategori pertama ke terakhir. */
export const trenGanda = (d: DataGanda): "naik" | "turun" | "tetap" => (d.l[3] > d.l[0] ? "naik" : d.l[3] < d.l[0] ? "turun" : "tetap");
/** Putaran yang menaruh pilihan benar (indeks c pada daftar dasar) di posisi i mod 3, supaya letak kunci bervariasi. */
const putaranKe = (c: number, i: number): number => (((c - (i % 3)) % 3) + 3) % 3;
export function opsiTren(i: number): { opsi: [string, string, string]; benar: number } {
  const t = trenGanda(DATA_GANDA[i]);
  const susun = putar3([...NAMA_TREN] as [string, string, string], putaranKe(NAMA_TREN.indexOf(t), i));
  return { opsi: susun, benar: susun.indexOf(t) };
}
export function opsiPenyajian(i: number): { opsi: [string, string, string]; benar: number } {
  const susun = putar3([...NAMA_PENYAJIAN] as [string, string, string], putaranKe(DATA_GANDA[i].penyajian, i));
  return { opsi: susun, benar: susun.indexOf(NAMA_PENYAJIAN[DATA_GANDA[i].penyajian]) };
}
export const namaSkala = (c: number): string => (c === SKALA_LONCAT ? "angka tidak teratur" : c === SKALA_BUKAN_NOL ? "mulai bukan dari nol" : `langkah ${c}`);

/* ------------------------------ Keadaan ------------------------------ */

export type StateBatangK5B8C = {
  baca: { data: number; judul: boolean; skala: boolean };
  skala: { data: number; pilih: number | null };
  banding: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiBatangK5B8C =
  | { t: "B_DATA"; i: number }
  | { t: "B_JUDUL" }
  | { t: "B_SKALA" }
  | { t: "B_JAWAB"; o: number }
  | { t: "S_DATA"; i: number }
  | { t: "S_PILIH"; c: number }
  | { t: "S_JAWAB"; jawab: string }
  | { t: "G_DATA"; i: number }
  | { t: "G_SELISIH"; o: number }
  | { t: "G_TREN"; o: number }
  | { t: "G_PILIH"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBatangK5B8C = (): StateBatangK5B8C => ({
  baca: { data: 0, judul: false, skala: false },
  skala: { data: 0, pilih: null },
  banding: { data: 0 },
  pernah: [],
  pesan: "",
});

export const dataBaca = (x: StateBatangK5B8C): DataBatang => DATA_BATANG[x.baca.data];
export const dataSkala = (x: StateBatangK5B8C): DataBatang => DATA_BATANG[x.skala.data];
export const dataBanding = (x: StateBatangK5B8C): DataGanda => DATA_GANDA[x.banding.data];

function jawabBaca(x: StateBatangK5B8C, o: number): StateBatangK5B8C {
  if (!sah(o, 3)) return x;
  if (!x.baca.judul || !x.baca.skala) {
    return { ...x, pesan: !x.baca.judul ? "Baca judulnya dulu, lalu skalanya, baru tinggi batang." : "Baca skalanya dulu, baru tinggi batang." };
  }
  const i = x.baca.data;
  const d = DATA_BATANG[i];
  const p = opsiBacaBatang(i);
  const v = d.nilai[d.target];
  if (o === p.benar) {
    return { ...x, pernah: catat(x.pernah, idBaca(i)), pesan: `✅ Batang ${d.kategori[d.target]} setinggi ${garisBatang(v, d.langkah)} garis, dan tiap garis ${d.langkah}. ${garisBatang(v, d.langkah)} × ${d.langkah} = ${v}.` };
  }
  return { ...x, pesan: p.opsi[o] === garisBatang(v, d.langkah) ? "Itu banyak garisnya saja. Kalikan dengan nilai tiap garis pada skala." : "Cocokkan puncak batang dengan garis skala yang tepat, bukan garis di atasnya." };
}

function jawabSkala(x: StateBatangK5B8C, jawab: string): StateBatangK5B8C {
  if (jawab !== "baik" && jawab !== "tidak") return x;
  const c = x.skala.pilih;
  if (c === null) return { ...x, pesan: "Pilih dulu skalanya, baru putuskan." };
  const i = x.skala.data;
  const d = DATA_BATANG[i];
  const tinggi = nilaiTertinggi(d.nilai);
  const hasil = nilaiSkala(tinggi, c);
  const baik = hasil === "baik";
  const alasan =
    hasil === "meluap"
      ? `Nilai tertinggi ${tinggi} lebih dari ${GARIS} × ${c} = ${GARIS * c}, jadi batang melewati bingkai.`
      : hasil === "longgar"
        ? `Nilai tertinggi ${tinggi} tidak lebih dari separuh tinggi, yaitu ${GARIS / 2} × ${c} = ${(GARIS / 2) * c}. Batang terlalu pendek dan sulit dibandingkan.`
        : hasil === "loncat"
          ? "Jarak angka pada sumbu harus teratur. Angka yang meloncat-loncat membuat pembaca bingung."
          : "Sumbu harus mulai dari nol. Bila tidak, beda antarbatang dilebih-lebihkan.";
  if ((jawab === "baik") === baik) {
    if (baik) {
      return { ...x, pernah: catat(x.pernah, idSkala(i, c)), pesan: `✅ Langkah ${c}: nilai tertinggi ${tinggi} muat dalam ${GARIS} garis (${GARIS} × ${c} = ${GARIS * c}) dan lebih dari separuhnya, jarak angka teratur, mulai dari nol. Skala yang baik.` };
    }
    return { ...x, pernah: catat(x.pernah, idTolak(i, c)), pesan: `✅ ${namaSkala(c)} tidak baik. ${alasan}` };
  }
  if (baik) return { ...x, pesan: `Skala ini muat dan tidak terlalu longgar: ${tinggi} ada di antara ${(GARIS / 2) * c} dan ${GARIS * c}, jarak teratur, mulai dari nol.` };
  return { ...x, pesan: `Periksa lagi. ${alasan}` };
}

function jawabSelisih(x: StateBatangK5B8C, o: number): StateBatangK5B8C {
  if (!sah(o, 3)) return x;
  const i = x.banding.data;
  const d = DATA_GANDA[i];
  const p = opsiSelisih(i);
  const t = d.target;
  if (o === p.benar) {
    const besar = Math.max(d.l[t], d.p[t]);
    const kecil = Math.min(d.l[t], d.p[t]);
    return { ...x, pernah: catat(x.pernah, idSelisih(i)), pesan: `✅ ${d.kategori[t]}: ${besar} − ${kecil} = ${besar - kecil}. Selisih adalah nilai besar dikurangi nilai kecil, dibaca dari skala yang sama.` };
  }
  return { ...x, pesan: p.opsi[o] === d.l[t] + d.p[t] ? "Itu jumlah kedua kelompok. Selisih dicari dengan mengurangkan nilai kecil dari nilai besar." : "Itu selisih dalam garis. Kalikan dengan nilai tiap garis pada skala." };
}

function jawabTren(x: StateBatangK5B8C, o: number): StateBatangK5B8C {
  if (!sah(o, 3)) return x;
  const i = x.banding.data;
  if (!x.pernah.includes(idSelisih(i))) return { ...x, pesan: "Cari dulu selisihnya, baru tentukan trennya." };
  const d = DATA_GANDA[i];
  const p = opsiTren(i);
  if (o === p.benar) {
    return { ...x, pernah: catat(x.pernah, idTren(i)), pesan: `✅ Dari ${d.kategori[0]} ke ${d.kategori[3]}, batang ${d.kelompok[0]} ${trenGanda(d)}: ${d.l[0]} menjadi ${d.l[3]}.` };
  }
  return { ...x, pesan: `Bandingkan tinggi batang ${d.kelompok[0]} pertama dan terakhir: apakah lebih tinggi, lebih rendah, atau sama?` };
}

function jawabPilih(x: StateBatangK5B8C, o: number): StateBatangK5B8C {
  if (!sah(o, 3)) return x;
  const i = x.banding.data;
  if (!x.pernah.includes(idTren(i))) return { ...x, pesan: "Tentukan dulu trennya, baru pilih penyajian." };
  const d = DATA_GANDA[i];
  const p = opsiPenyajian(i);
  const alasan = [
    "Tabel paling tepat untuk angka rinci dan tepat.",
    "Piktogram menarik dan mudah dibaca anak kecil, asalkan ada kunci.",
    "Diagram batang paling mudah untuk membandingkan tinggi rendah sekilas.",
  ];
  if (o === p.benar) return { ...x, pernah: catat(x.pernah, idPilih(i)), pesan: `✅ ${NAMA_PENYAJIAN[d.penyajian]} paling cocok. ${alasan[d.penyajian]}` };
  return { ...x, pesan: `Pikirkan tujuan pembaca: ${d.tujuan.toLowerCase()}` };
}

export function langkahBatangK5B8C(x: StateBatangK5B8C, a: AksiBatangK5B8C): StateBatangK5B8C {
  switch (a.t) {
    case "B_DATA":
      return sah(a.i, DATA_BATANG.length) ? { ...x, baca: { data: a.i, judul: false, skala: false }, pesan: "" } : x;
    case "B_JUDUL":
      return { ...x, baca: { ...x.baca, judul: true }, pesan: `Judul: ${dataBaca(x).judul}. Judul menjelaskan data apa yang digambar.` };
    case "B_SKALA":
      return { ...x, baca: { ...x.baca, skala: true }, pesan: `Skala: tiap garis ${dataBaca(x).langkah}, mulai dari nol. Sekarang baca tinggi batang.` };
    case "B_JAWAB":
      return jawabBaca(x, a.o);
    case "S_DATA":
      return sah(a.i, DATA_BATANG.length) ? { ...x, skala: { data: a.i, pilih: null }, pesan: "" } : x;
    case "S_PILIH":
      return SKALA_PILIHAN.includes(a.c) ? { ...x, skala: { ...x.skala, pilih: a.c }, pesan: "" } : x;
    case "S_JAWAB":
      return jawabSkala(x, a.jawab);
    case "G_DATA":
      return sah(a.i, DATA_GANDA.length) ? { ...x, banding: { data: a.i }, pesan: "" } : x;
    case "G_SELISIH":
      return jawabSelisih(x, a.o);
    case "G_TREN":
      return jawabTren(x, a.o);
    case "G_PILIH":
      return jawabPilih(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBatangK5B8C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBatangK5B8C = { alat: "batang"; pernah: string[] };
export const keadaanBatangK5B8C = (x: StateBatangK5B8C): KeadaanBatangK5B8C => ({ alat: "batang", pernah: x.pernah });

export const ucapBacaK5B8C = (x: StateBatangK5B8C): string => {
  const d = dataBaca(x);
  return `Diagram batang ${d.nama}. Baca dengan urutan: judul dulu, lalu skala, lalu tinggi batang. Cari nilai ${d.kategori[d.target]}.`;
};
export const ucapSkalaK5B8C = (x: StateBatangK5B8C): string => {
  const d = dataSkala(x);
  return `Data ${d.nama}, nilai tertinggi ${nilaiTertinggi(d.nilai)}. Pilih langkah skala, lalu putuskan baik atau tidak. Skala yang baik muat dalam ${GARIS} garis, lebih dari separuh tinggi, teratur, dan mulai dari nol.`;
};
export const ucapBandingK5B8C = (x: StateBatangK5B8C): string => {
  const d = dataBanding(x);
  return `Diagram batang ganda ${d.nama}, ${d.kelompok[0]} dan ${d.kelompok[1]} dengan skala yang sama. Cari selisih ${d.kategori[d.target]}, tentukan trennya, lalu pilih penyajian yang tepat.`;
};
