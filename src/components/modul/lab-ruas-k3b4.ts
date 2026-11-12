/**
 * Lab Ruas Garis (Kelas 3 Bab 4, Sub-Bab A): logika murni. Satu alat, tiga bagian.
 *  Jenis : sinar garis (satu pangkal, satu arah), garis (dua arah, tanpa ujung), ruas garis (dua ujung, panjang tetap),
 *          dan dua titik: tepat satu ruas lurus tetapi banyak kurva.
 *  Ukur  : ruas garis di atas penggaris bermilimeter (0 sampai 150 mm). Panjang hanya terbaca bila ujung kiri tepat di 0.
 *          1 cm = 10 mm, 5 mm = 0,5 cm.
 *  Sisi  : sisi adalah ruas garis pembatas bangun datar. Tandai semua sisi untuk menghitung banyaknya.
 * Sudut dan garis tegak lurus atau sejajar baru dipelajari di Sub-Bab B dan C, jadi tidak dipakai di sini.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b4.mjs.
 */

export type JenisGaris = "sinar" | "garis" | "ruas";
export const MAKS_PJG = 3;
export const PANJANG_PENGGARIS = 150;

export type RuasUkur = { id: string; nama: string; mm: number };
export const RUAS_UKUR: RuasUkur[] = [
  { id: "ab", nama: "AB", mm: 50 },
  { id: "mn", nama: "MN", mm: 55 },
  { id: "pq", nama: "PQ", mm: 37 },
  { id: "kl", nama: "KL", mm: 82 },
  { id: "rs", nama: "RS", mm: 120 },
  { id: "ef", nama: "EF", mm: 145 },
];
export const cariRuas = (id: string): RuasUkur => RUAS_UKUR.find((r) => r.id === id) ?? RUAS_UKUR[0];

export type KurvaDef = { id: string; nama: string };
export const KURVA_DUA_TITIK: KurvaDef[] = [
  { id: "busur", nama: "Busur" },
  { id: "s", nama: "Huruf S" },
  { id: "gelombang", nama: "Gelombang" },
  { id: "lengkung", nama: "Lengkung bawah" },
];

export type BangunRuas = { id: string; nama: string; huruf: string[]; sisi: string[] };
export const BANGUN_RUAS: BangunRuas[] = [
  { id: "segitiga", nama: "Segitiga EFG", huruf: ["E", "F", "G"], sisi: ["EF", "FG", "EG"] },
  { id: "segiempat", nama: "Segiempat GHIJ", huruf: ["G", "H", "I", "J"], sisi: ["GH", "HI", "IJ", "GJ"] },
  { id: "segilima", nama: "Segilima ABCDE", huruf: ["A", "B", "C", "D", "E"], sisi: ["AB", "BC", "CD", "DE", "AE"] },
  { id: "segienam", nama: "Segienam ABCDEF", huruf: ["A", "B", "C", "D", "E", "F"], sisi: ["AB", "BC", "CD", "DE", "EF", "AF"] },
];
export const cariBangunRuas = (id: string): BangunRuas => BANGUN_RUAS.find((b) => b.id === id) ?? BANGUN_RUAS[0];

/** "5 cm 5 mm", "5 cm", "7 mm". */
export function teksCmMm(mm: number): string {
  const cm = Math.floor(mm / 10);
  const s = mm % 10;
  if (cm === 0) return `${s} mm`;
  return s === 0 ? `${cm} cm` : `${cm} cm ${s} mm`;
}

/** Sentimeter dengan koma: 55 mm menjadi "5,5 cm". */
export function teksDesimalCm(mm: number): string {
  const cm = mm / 10;
  return `${Number.isInteger(cm) ? cm : String(cm).replace(".", ",")} cm`;
}

export type TampilUkur = { mm: boolean; desimal: boolean };

export type StateRuas = {
  jenis: JenisGaris;
  /** Banyak langkah perpanjangan ke kiri dan ke kanan (0 sampai MAKS_PJG). */
  pjgKiri: number;
  pjgKanan: number;
  /** Kurva yang digambar di antara dua titik P dan Q, dan apakah ruas lurusnya digambar. */
  kurva: string[];
  ruasLurus: boolean;
  ruas: string;
  /** Posisi ujung kiri ruas pada penggaris, dalam milimeter. */
  awal: number;
  tampil: TampilUkur;
  bangun: string;
  tandai: boolean[];
  /** "sinar-kanan", "sinar-kiri-tolak", "garis-kiri", "garis-kanan", "ruas-tolak". */
  pernah: string[];
  pernahUkur: string[];
  pernahSalah: boolean;
  pernahLengkap: string[];
  hasil: string;
  pesan: string;
};

export type LangkahMm = 1 | -1 | 10 | -10;
export type AksiRuas =
  | { t: "JENIS"; jenis: JenisGaris }
  | { t: "PERPANJANG"; arah: "kiri" | "kanan" }
  | { t: "KURVA"; id: string }
  | { t: "RUAS_LURUS" }
  | { t: "RUAS"; id: string }
  | { t: "GESER"; d: LangkahMm }
  | { t: "BACA" }
  | { t: "TOGGLE"; rep: keyof TampilUkur }
  | { t: "BANGUN"; id: string }
  | { t: "TANDAI"; i: number }
  | { t: "KOSONG_SISI" }
  | { t: "RESET" };

export const awalRuas = (): StateRuas => ({
  jenis: "sinar",
  pjgKiri: 0,
  pjgKanan: 0,
  kurva: [],
  ruasLurus: false,
  ruas: "ab",
  awal: 20,
  tampil: { mm: false, desimal: false },
  bangun: "segitiga",
  tandai: [false, false, false],
  pernah: [],
  pernahUkur: [],
  pernahSalah: false,
  pernahLengkap: [],
  hasil: "",
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

export function langkahRuas(x: StateRuas, a: AksiRuas): StateRuas {
  switch (a.t) {
    case "JENIS":
      return a.jenis === x.jenis ? x : { ...x, jenis: a.jenis, pjgKiri: 0, pjgKanan: 0, pesan: "" };

    case "PERPANJANG": {
      if (x.jenis === "ruas") {
        return { ...x, pernah: tambah(x.pernah, "ruas-tolak"), pesan: "Ruas garis punya dua titik ujung dan panjang tetap. Ruas garis tidak bisa diperpanjang." };
      }
      if (x.jenis === "sinar") {
        if (a.arah === "kiri") {
          return { ...x, pernah: tambah(x.pernah, "sinar-kiri-tolak"), pesan: "Sinar garis berpangkal di titik sebelah kiri. Ke arah pangkal tidak bisa diperpanjang. Sinar garis hanya dapat diperpanjang ke satu sisi." };
        }
        const pernah = tambah(x.pernah, "sinar-kanan");
        if (x.pjgKanan >= MAKS_PJG) return { ...x, pernah, pesan: "Sinar garis boleh diperpanjang terus ke kanan, tetapi hanya ke satu sisi." };
        return { ...x, pernah, pjgKanan: x.pjgKanan + 1, pesan: "Sinar garis diperpanjang ke satu sisi, ke arah menjauhi pangkal." };
      }
      const pernah = tambah(x.pernah, a.arah === "kiri" ? "garis-kiri" : "garis-kanan");
      const sekarang = a.arah === "kiri" ? x.pjgKiri : x.pjgKanan;
      if (sekarang >= MAKS_PJG) return { ...x, pernah, pesan: "Garis boleh diperpanjang terus ke kedua sisi. Garis tidak punya ujung." };
      return { ...x, pernah, pjgKiri: a.arah === "kiri" ? x.pjgKiri + 1 : x.pjgKiri, pjgKanan: a.arah === "kanan" ? x.pjgKanan + 1 : x.pjgKanan, pesan: "Garis dapat diperpanjang ke kedua sisi dan tidak punya ujung." };
    }

    case "KURVA": {
      if (!KURVA_DUA_TITIK.some((k) => k.id === a.id)) return x;
      const ada = x.kurva.includes(a.id);
      const kurva = ada ? x.kurva.filter((k) => k !== a.id) : [...x.kurva, a.id];
      return { ...x, kurva, pesan: "" };
    }

    case "RUAS_LURUS":
      return { ...x, ruasLurus: !x.ruasLurus, pesan: x.ruasLurus ? "" : "Dua titik berbeda hanya dapat dihubungkan oleh satu ruas garis lurus." };

    case "RUAS": {
      if (!RUAS_UKUR.some((r) => r.id === a.id) || a.id === x.ruas) return x;
      const r = cariRuas(a.id);
      return { ...x, ruas: a.id, awal: Math.min(20, PANJANG_PENGGARIS - r.mm), hasil: "", pesan: "" };
    }

    case "GESER": {
      const r = cariRuas(x.ruas);
      const baru = x.awal + a.d;
      if (baru < 0) return { ...x, awal: 0, pesan: "Ruas garis tidak bisa digeser lebih ke kiri dari angka nol." };
      if (baru + r.mm > PANJANG_PENGGARIS) return { ...x, pesan: "Ujung ruas garis sudah mentok di ujung penggaris." };
      return { ...x, awal: baru, hasil: "", pesan: "" };
    }

    case "BACA": {
      const r = cariRuas(x.ruas);
      if (x.awal !== 0) {
        const kanan = x.awal + r.mm;
        return { ...x, pernahSalah: true, hasil: "", pesan: `Titik ${r.nama[1]} sejajar angka ${teksCmMm(kanan)}, tetapi titik ${r.nama[0]} ada di ${teksCmMm(x.awal)}, bukan angka 0. Bacaan itu bukan panjang ruas garis. Geser sampai titik ${r.nama[0]} tepat di angka 0.` };
      }
      return { ...x, pernahUkur: tambah(x.pernahUkur, r.id), hasil: `${r.nama} = ${teksCmMm(r.mm)}`, pesan: `Titik ${r.nama[0]} di angka 0. Titik ${r.nama[1]} sejajar angka ${teksCmMm(r.mm)}. Panjang ${r.nama} = ${teksCmMm(r.mm)}.` };
    }

    case "TOGGLE":
      return { ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" };

    case "BANGUN": {
      if (!BANGUN_RUAS.some((b) => b.id === a.id) || a.id === x.bangun) return x;
      const b = cariBangunRuas(a.id);
      return { ...x, bangun: a.id, tandai: b.sisi.map(() => false), pesan: "" };
    }

    case "TANDAI": {
      const b = cariBangunRuas(x.bangun);
      if (a.i < 0 || a.i >= b.sisi.length) return x;
      const tandai = x.tandai.map((t, i) => (i === a.i ? !t : t));
      const lengkap = tandai.every(Boolean);
      return {
        ...x,
        tandai,
        pernahLengkap: lengkap ? tambah(x.pernahLengkap, b.id) : x.pernahLengkap,
        pesan: lengkap ? `Semua sisi sudah ditandai: ${b.sisi.join(", ")}. ${b.nama.split(" ")[0]} memiliki ${b.sisi.length} sisi.` : "",
      };
    }

    case "KOSONG_SISI":
      return { ...x, tandai: cariBangunRuas(x.bangun).sisi.map(() => false), pesan: "" };

    case "RESET":
      return awalRuas();
  }
}

export type KeadaanRuas = {
  alat: "ruas";
  jenis: JenisGaris;
  pernah: string[];
  kurva: number;
  ruasLurus: boolean;
  ruas: string;
  mm: number;
  awal: number;
  tampilMm: boolean;
  tampilDesimal: boolean;
  pernahUkur: string[];
  pernahSalah: boolean;
  bangun: string;
  sisiDitandai: number;
  pernahLengkap: string[];
};

export function keadaanRuas(x: StateRuas): KeadaanRuas {
  return {
    alat: "ruas",
    jenis: x.jenis,
    pernah: x.pernah,
    kurva: x.kurva.length,
    ruasLurus: x.ruasLurus,
    ruas: x.ruas,
    mm: cariRuas(x.ruas).mm,
    awal: x.awal,
    tampilMm: x.tampil.mm,
    tampilDesimal: x.tampil.desimal,
    pernahUkur: x.pernahUkur,
    pernahSalah: x.pernahSalah,
    bangun: x.bangun,
    sisiDitandai: x.tandai.filter(Boolean).length,
    pernahLengkap: x.pernahLengkap,
  };
}

/** Uraian ukuran lengkap: "5 cm 5 mm = 55 mm = 5,5 cm". */
export function uraianUkuran(mm: number, tampil: TampilUkur): string {
  const bagian = [teksCmMm(mm)];
  if (tampil.mm) bagian.push(`${mm} mm`);
  if (tampil.desimal) bagian.push(teksDesimalCm(mm));
  return bagian.filter((b, i) => bagian.indexOf(b) === i).join(" = ");
}

export function ucapRuas(x: StateRuas): string {
  const r = cariRuas(x.ruas);
  if (x.awal !== 0) return `Titik ${r.nama[0]} ada di ${teksCmMm(x.awal)}. Geser sampai tepat di angka nol, baru baca titik ${r.nama[1]}.`;
  return `Titik ${r.nama[0]} di angka nol. Panjang ${r.nama} ${teksCmMm(r.mm)}. Satu sentimeter sama dengan sepuluh milimeter.`;
}
