/**
 * Laboratorium Bangun Gabungan (Bab 4, Sub-Bab C): model PhET. Sebuah bangun (kereta, rumah, rumah dari lidi)
 * tersusun dari bagian-bagian. Bagian bisa diuraikan, ditunjuk menurut jenisnya, dihitung per jenis, dan satu
 * jenis bisa diambil untuk melihat sisanya. Jumlah semua jenis selalu sama dengan jumlah bagian.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-kelas1.mjs.
 */

export type Bagian = {
  id: string;
  /** Id jenis bagian, mis. "segiempat". */
  jenis: string;
  nama: string;
  /** Jalur SVG di kotak 0 0 160 90. */
  d: string;
  warna: string;
  /** Lidi digambar sebagai garis tebal, bukan bidang. */
  garis?: boolean;
  /** Geseran saat diuraikan. */
  dx: number;
  dy: number;
};

export type JenisBagian = { id: string; nama: string };

export type Bangun = {
  id: string;
  nama: string;
  /** Satuan hitung: "bagian" atau "lidi". */
  satuan: string;
  jenis: JenisBagian[];
  bagian: Bagian[];
};

const roda = (cx: number, cy: number) => `M${cx - 7} ${cy} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 Z`;

const JENIS_BENTUK: JenisBagian[] = [
  { id: "segiempat", nama: "Segi empat" },
  { id: "segitiga", nama: "Segitiga" },
  { id: "lengkung", nama: "Bentuk lengkung" },
];

export const BANGUN: Bangun[] = [
  {
    id: "kereta",
    nama: "Kereta balok",
    satuan: "bagian",
    jenis: JENIS_BENTUK,
    bagian: [
      { id: "cerobong", jenis: "segiempat", nama: "cerobong", d: "M28 12 H38 V30 H28 Z", warna: "#9CA3AF", dx: 0, dy: -8 },
      { id: "mesin", jenis: "segiempat", nama: "mesin", d: "M18 30 H62 V60 H18 Z", warna: "#34D399", dx: -6, dy: 0 },
      { id: "kabin", jenis: "segiempat", nama: "kabin", d: "M62 22 H88 V60 H62 Z", warna: "#F87171", dx: 0, dy: -4 },
      { id: "jendela", jenis: "segiempat", nama: "jendela kabin", d: "M68 28 H82 V42 H68 Z", warna: "#E0F2FE", dx: 0, dy: -14 },
      { id: "gerbong", jenis: "segiempat", nama: "gerbong", d: "M92 36 H148 V60 H92 Z", warna: "#60A5FA", dx: 8, dy: 0 },
      { id: "moncong", jenis: "segitiga", nama: "moncong", d: "M18 30 L18 60 L2 60 Z", warna: "#FBBF24", dx: -2, dy: 6 },
      { id: "roda1", jenis: "lengkung", nama: "roda depan", d: roda(34, 67), warna: "#7C3AED", dx: -4, dy: 12 },
      { id: "roda2", jenis: "lengkung", nama: "roda tengah", d: roda(76, 67), warna: "#7C3AED", dx: 0, dy: 12 },
      { id: "roda3", jenis: "lengkung", nama: "roda belakang", d: roda(120, 67), warna: "#7C3AED", dx: 6, dy: 12 },
    ],
  },
  {
    id: "rumah",
    nama: "Rumah mainan",
    satuan: "bagian",
    jenis: JENIS_BENTUK,
    bagian: [
      { id: "atap", jenis: "segitiga", nama: "atap", d: "M30 42 L80 8 L130 42 Z", warna: "#F87171", dx: 0, dy: -6 },
      { id: "dinding", jenis: "segiempat", nama: "dinding", d: "M38 42 H122 V82 H38 Z", warna: "#FDE68A", dx: 0, dy: 0 },
      { id: "pintu", jenis: "segiempat", nama: "pintu", d: "M72 56 H92 V82 H72 Z", warna: "#B45309", dx: 52, dy: 6 },
      { id: "jendela", jenis: "segiempat", nama: "jendela", d: "M48 52 H64 V68 H48 Z", warna: "#BAE6FD", dx: -34, dy: 0 },
    ],
  },
  {
    id: "rumah-lidi",
    nama: "Rumah dari lidi",
    satuan: "lidi",
    jenis: [
      { id: "dinding", nama: "Lidi dinding" },
      { id: "atap", nama: "Lidi atap" },
    ],
    bagian: [
      { id: "d-atas", jenis: "dinding", nama: "lidi dinding atas", d: "M50 44 H110", warna: "#D97706", garis: true, dx: 0, dy: -6 },
      { id: "d-kanan", jenis: "dinding", nama: "lidi dinding kanan", d: "M110 44 V84", warna: "#D97706", garis: true, dx: 8, dy: 0 },
      { id: "d-bawah", jenis: "dinding", nama: "lidi dinding bawah", d: "M110 84 H50", warna: "#D97706", garis: true, dx: 0, dy: 6 },
      { id: "d-kiri", jenis: "dinding", nama: "lidi dinding kiri", d: "M50 84 V44", warna: "#D97706", garis: true, dx: -8, dy: 0 },
      { id: "a-kiri", jenis: "atap", nama: "lidi atap kiri", d: "M50 44 L80 12", warna: "#DC2626", garis: true, dx: -8, dy: -4 },
      { id: "a-kanan", jenis: "atap", nama: "lidi atap kanan", d: "M80 12 L110 44", warna: "#DC2626", garis: true, dx: 8, dy: -4 },
    ],
  },
];

export const bangunDari = (id: string): Bangun => BANGUN.find((b) => b.id === id) ?? BANGUN[0];

export type HitungJenis = { id: string; nama: string; jumlah: number };

/** Banyak bagian tiap jenis, berurutan. Jenis yang tidak punya bagian dilewati. */
export function hitungJenis(b: Bangun): HitungJenis[] {
  return b.jenis.map((j) => ({ id: j.id, nama: j.nama, jumlah: b.bagian.filter((p) => p.jenis === j.id).length })).filter((j) => j.jumlah > 0);
}

export const totalBagian = (b: Bangun): number => b.bagian.length;

/** Kalimat jumlah semua jenis, mis. "5 + 1 + 3 = 9". */
export function kalimatTambah(b: Bangun): string {
  const h = hitungJenis(b);
  return `${h.map((j) => j.jumlah).join(" + ")} = ${totalBagian(b)}`;
}

/** Kalimat bila satu jenis diambil, mis. "9 − 3 = 6". Jenis tak dikenal: tanpa pengurangan. */
export function kalimatKurang(b: Bangun, jenisId: string): string | null {
  const j = hitungJenis(b).find((x) => x.id === jenisId);
  if (!j) return null;
  return `${totalBagian(b)} − ${j.jumlah} = ${totalBagian(b) - j.jumlah}`;
}

export function ucapanBangun(b: Bangun, urai: boolean, jenisId: string | null, diambil: boolean): string {
  const h = hitungJenis(b);
  const awal = `${b.nama} tersusun dari ${totalBagian(b)} ${b.satuan}.`;
  const rinci = h.map((j) => `${j.nama} ada ${j.jumlah}.`).join(" ");
  const jumlah = `Jumlah semuanya, ${kalimatTambah(b)}.`;
  const kondisi = urai ? " Bangunnya sedang diuraikan menjadi bagian-bagiannya." : "";
  const kurang = jenisId && diambil ? kalimatKurang(b, jenisId) : null;
  const ambil = kurang ? ` Satu jenis diambil. Sisanya, ${kurang}.` : "";
  return `${awal} ${rinci} ${jumlah}${kondisi}${ambil}`;
}
