/**
 * Lab Busur (Kelas 5 Bab 6, Sub-Bab C: Mengukur Sudut): logika murni. Satu alat, tiga tampilan.
 *  Pasang  : geser busur sampai pusatnya tepat di titik sudut, putar sampai garis dasarnya berimpit dengan kaki pertama,
 *            lalu periksa (Protractor Reading Protocol).
 *  Baca    : pilih skala yang mulai dari nol di kaki pertama, lalu pilih angka yang ditunjuk kaki kedua (Degree Measure).
 *  Patokan : namai sudut dari ukurannya: nol, lancip, siku-siku, tumpul, lurus, releks, penuh (Benchmark Angles 0, 90, 180, 360).
 * Data dari Buku Siswa Kelas V Bab 6 Sub-Bab C (kipas Pakarena, 125°, jam pukul satu dan pukul tiga, sudut nol, lurus, penuh, releks).
 * Ukuran sudut ditulis dalam derajat bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b6.mjs.
 */

export type Sisi = "kiri" | "kanan";
export type Skala = "dalam" | "luar";
export const SKALA_PILIHAN: Skala[] = ["dalam", "luar"];
/** Skala luar mulai dari nol di sisi kiri, skala dalam mulai dari nol di sisi kanan. */
export const SKALA_UNTUK: Record<Sisi, Skala> = { kiri: "luar", kanan: "dalam" };
export const URAIAN_SKALA = "Skala luar mulai dari nol di sisi kiri. Skala dalam mulai dari nol di sisi kanan.";

export type NamaUkuran = "nol" | "lancip" | "siku" | "tumpul" | "lurus" | "releks" | "penuh";
export const NAMA_UKURAN: NamaUkuran[] = ["nol", "lancip", "siku", "tumpul", "lurus", "releks", "penuh"];
export const SEBUT_UKURAN: Record<NamaUkuran, string> = {
  nol: "sudut nol",
  lancip: "sudut lancip",
  siku: "sudut siku-siku",
  tumpul: "sudut tumpul",
  lurus: "sudut lurus",
  releks: "sudut releks",
  penuh: "sudut penuh",
};
export const RENTANG: Record<NamaUkuran, string> = {
  nol: "tepat 0°",
  lancip: "lebih dari 0° dan kurang dari 90°",
  siku: "tepat 90°",
  tumpul: "lebih dari 90° dan kurang dari 180°",
  lurus: "tepat 180°",
  releks: "lebih dari 180° dan kurang dari 360°",
  penuh: "tepat 360°",
};
/** Nama sudut menurut ukurannya, 0 sampai 360 derajat. */
export const jenisUkuran = (deg: number): NamaUkuran =>
  deg === 0 ? "nol" : deg < 90 ? "lancip" : deg === 90 ? "siku" : deg < 180 ? "tumpul" : deg === 180 ? "lurus" : deg < 360 ? "releks" : "penuh";

/** Tiga sudut untuk dipasangi busur. geser: busur berada sekian langkah dari titik sudut (negatif ke kiri). putar: miring garis dasar. */
export type DataPasang = { nama: string; deg: number; geser: number; putar: number };
export const DATA_PASANG: DataPasang[] = [
  { nama: "sudut kipas Pakarena", deg: 125, geser: 2, putar: 15 },
  { nama: "sudut jarum jam", deg: 30, geser: -1, putar: -30 },
  { nama: "sudut lipatan kertas", deg: 90, geser: 1, putar: -15 },
];
export const GESER_BATAS = 3;
export const PUTAR_BATAS = 45;
export const PUTAR_LANGKAH = 15;

/** Tiga sudut untuk dibaca. sisi: tempat kaki pertama berimpit dengan garis dasar. */
export type DataBaca = { nama: string; deg: number; sisi: Sisi };
export const DATA_BACA: DataBaca[] = [
  { nama: "kipas Pakarena", deg: 125, sisi: "kanan" },
  { nama: "pintu lemari", deg: 50, sisi: "kiri" },
  { nama: "atap rumah", deg: 70, sisi: "kanan" },
];
/** Tiga angka pilihan: ukuran benar, angka pada skala yang satunya (180 dikurangi ukuran), dan ukuran ditambah 10. */
export const opsiBaca = (d: DataBaca): number[] => [d.deg, 180 - d.deg, d.deg + 10].sort((a, b) => a - b);
export const skalaBenar = (d: DataBaca): Skala => SKALA_UNTUK[d.sisi];

/** Tujuh ukuran patokan, dari nol sampai sudut penuh. */
export const DATA_PATOKAN: number[] = [0, 45, 90, 130, 180, 270, 360];

export const idPasang = (i: number): string => `pasang:${i}`;
export const idBaca = (i: number): string => `baca:${i}`;
export const idPatokan = (i: number): string => `patokan:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Keadaan ------------------------------ */

export type StateBusurK5B6C = {
  pasang: { data: number; geser: number; putar: number };
  baca: { data: number; skala: Skala | null };
  patokan: { data: number };
  pernah: string[];
  pesan: string;
};

export type AksiBusurK5B6C =
  | { t: "P_DATA"; i: number }
  | { t: "P_GESER"; d: number }
  | { t: "P_PUTAR"; d: number }
  | { t: "P_CEK" }
  | { t: "B_DATA"; i: number }
  | { t: "B_SKALA"; skala: string }
  | { t: "B_ANGKA"; nilai: number }
  | { t: "T_DATA"; i: number }
  | { t: "T_JAWAB"; nama: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const awalPasang = (i: number): StateBusurK5B6C["pasang"] => ({ data: i, geser: DATA_PASANG[i].geser, putar: DATA_PASANG[i].putar });

export const awalBusurK5B6C = (): StateBusurK5B6C => ({
  pasang: awalPasang(0),
  baca: { data: 0, skala: null },
  patokan: { data: 0 },
  pernah: [],
  pesan: "",
});

export const dataPasang = (x: StateBusurK5B6C): DataPasang => DATA_PASANG[x.pasang.data];
export const dataBaca = (x: StateBusurK5B6C): DataBaca => DATA_BACA[x.baca.data];
export const ukuranPatokan = (x: StateBusurK5B6C): number => DATA_PATOKAN[x.patokan.data];

function geserBusur(x: StateBusurK5B6C, d: number): StateBusurK5B6C {
  if (d !== 1 && d !== -1) return x;
  const baru = x.pasang.geser + d;
  if (Math.abs(baru) > GESER_BATAS) return { ...x, pesan: "Busur sudah di ujung geseran. Geser ke arah sebaliknya." };
  return { ...x, pasang: { ...x.pasang, geser: baru }, pesan: "" };
}

function putarBusur(x: StateBusurK5B6C, d: number): StateBusurK5B6C {
  if (d !== PUTAR_LANGKAH && d !== -PUTAR_LANGKAH) return x;
  const baru = x.pasang.putar + d;
  if (Math.abs(baru) > PUTAR_BATAS) return { ...x, pesan: "Busur sudah di ujung putaran. Putar ke arah sebaliknya." };
  return { ...x, pasang: { ...x.pasang, putar: baru }, pesan: "" };
}

function cekPasang(x: StateBusurK5B6C): StateBusurK5B6C {
  const { geser, putar } = x.pasang;
  if (geser !== 0) {
    return { ...x, pesan: `Pusat busur belum tepat di titik sudut, masih ${geser > 0 ? "di kanan" : "di kiri"} titik sudut. Geser busur ke ${geser > 0 ? "kiri" : "kanan"}.` };
  }
  if (putar !== 0) {
    return { ...x, pesan: `Garis dasar busur belum berimpit dengan kaki pertama, masih miring ke ${putar > 0 ? "kiri" : "kanan"}. Putar busur ke ${putar > 0 ? "kanan" : "kiri"}.` };
  }
  return {
    ...x,
    pernah: catat(x.pernah, idPasang(x.pasang.data)),
    pesan: "✅ Pusat busur tepat di titik sudut dan garis dasar berimpit dengan kaki pertama. Kaki kedua ada di dalam skala, siap dibaca.",
  };
}

function pilihSkala(x: StateBusurK5B6C, skala: string): StateBusurK5B6C {
  if (!(SKALA_PILIHAN as string[]).includes(skala)) return x;
  const d = dataBaca(x);
  const benar = skalaBenar(d);
  if (skala === benar) {
    return { ...x, baca: { ...x.baca, skala: benar }, pesan: `✅ Kaki pertama ada di sisi ${d.sisi}, jadi pakai skala ${benar}, yang mulai dari nol di sisi ${d.sisi}.` };
  }
  return { ...x, baca: { ...x.baca, skala: null }, pesan: `Skala ${skala} mulai dari nol di sisi ${d.sisi === "kiri" ? "kanan" : "kiri"}. Kaki pertama ada di sisi ${d.sisi}, jadi pakai skala ${benar}.` };
}

function pilihAngka(x: StateBusurK5B6C, nilai: number): StateBusurK5B6C {
  const d = dataBaca(x);
  if (!opsiBaca(d).includes(nilai)) return x;
  if (x.baca.skala === null) return { ...x, pesan: "Pilih dulu skala yang mulai dari nol di kaki pertama." };
  if (nilai === d.deg) {
    return { ...x, pernah: catat(x.pernah, idBaca(x.baca.data)), pesan: `✅ Kaki kedua menunjuk ${d.deg} pada skala ${x.baca.skala}. Ukuran sudut ${d.nama} adalah ${d.deg}°.` };
  }
  if (nilai === 180 - d.deg) {
    return { ...x, pesan: `Angka ${nilai} dibaca dari skala yang satunya, yang nolnya di sisi ${d.sisi === "kiri" ? "kanan" : "kiri"}. Baca angka dari nol di kaki pertama.` };
  }
  return { ...x, pesan: "Angka itu tidak ditunjuk kaki kedua. Baca lagi angka pada skala yang kamu pilih." };
}

function jawabPatokan(x: StateBusurK5B6C, nama: string): StateBusurK5B6C {
  if (!(NAMA_UKURAN as string[]).includes(nama)) return x;
  const deg = ukuranPatokan(x);
  const benar = jenisUkuran(deg);
  if (nama === benar) {
    const tambah = benar === "releks" ? " Itu bukan tumpul, karena tumpul masih kurang dari 180°." : "";
    return { ...x, pernah: catat(x.pernah, idPatokan(x.patokan.data)), pesan: `✅ ${deg}° termasuk ${SEBUT_UKURAN[benar]}, yaitu ukuran ${RENTANG[benar]}.${tambah}` };
  }
  return { ...x, pesan: `${deg}° bukan ${SEBUT_UKURAN[nama as NamaUkuran]}. ${SEBUT_UKURAN[nama as NamaUkuran][0].toUpperCase()}${SEBUT_UKURAN[nama as NamaUkuran].slice(1)} adalah ${RENTANG[nama as NamaUkuran]}.` };
}

export function langkahBusurK5B6C(x: StateBusurK5B6C, a: AksiBusurK5B6C): StateBusurK5B6C {
  switch (a.t) {
    case "P_DATA":
      return sah(a.i, DATA_PASANG.length) ? { ...x, pasang: awalPasang(a.i), pesan: "" } : x;
    case "P_GESER":
      return geserBusur(x, a.d);
    case "P_PUTAR":
      return putarBusur(x, a.d);
    case "P_CEK":
      return cekPasang(x);
    case "B_DATA":
      return sah(a.i, DATA_BACA.length) ? { ...x, baca: { data: a.i, skala: null }, pesan: "" } : x;
    case "B_SKALA":
      return pilihSkala(x, a.skala);
    case "B_ANGKA":
      return pilihAngka(x, a.nilai);
    case "T_DATA":
      return sah(a.i, DATA_PATOKAN.length) ? { ...x, patokan: { data: a.i }, pesan: "" } : x;
    case "T_JAWAB":
      return jawabPatokan(x, a.nama);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBusurK5B6C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBusurK5B6C = { alat: "busur"; pernah: string[] };
export const keadaanBusurK5B6C = (x: StateBusurK5B6C): KeadaanBusurK5B6C => ({ alat: "busur", pernah: x.pernah });

export const ucapPasangK5B6C = (x: StateBusurK5B6C): string => {
  const { geser, putar } = x.pasang;
  if (geser === 0 && putar === 0) return `Busur sudah terpasang pada ${dataPasang(x).nama}. Tekan periksa.`;
  return `Pasang busur pada ${dataPasang(x).nama}: pusat busur di titik sudut, garis dasar berimpit dengan kaki pertama.`;
};
export const ucapBacaK5B6C = (x: StateBusurK5B6C): string => {
  const d = dataBaca(x);
  return `Sudut ${d.nama}. Kaki pertama ada di sisi ${d.sisi}. ${URAIAN_SKALA} Pilih skalanya, lalu pilih angka yang ditunjuk kaki kedua.`;
};
export const ucapPatokanK5B6C = (x: StateBusurK5B6C): string => `Sudut berukuran ${ukuranPatokan(x)}°. Pilih namanya.`;
