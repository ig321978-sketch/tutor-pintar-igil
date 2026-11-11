/**
 * Laboratorium Soal Cerita (Kelas 2 Bab 2, Sub-Bab C): model PhET.
 * Satu cerita (jenis + bilangan) menggerakkan teks cerita, model batang, dan empat langkah
 * Diketahui, Ditanya, Solusi, Kesimpulan secara bersamaan. Enam jenis cerita:
 * jumlah, selisih, lebihnya, kurangnya, bilangan awal, dan tiga bilangan. Semua hasil 0 sampai 20.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b2.mjs.
 */

export const MAKS_CERITA = 20;

export type JenisCerita = "jumlah" | "selisih" | "lebihnya" | "kurangnya" | "awal" | "tiga";

export const URUT_JENIS: JenisCerita[] = ["jumlah", "selisih", "lebihnya", "kurangnya", "awal", "tiga"];

export const NAMA_JENIS: Record<JenisCerita, string> = {
  jumlah: "Jumlah",
  selisih: "Selisih",
  lebihnya: "Lebihnya",
  kurangnya: "Kurangnya",
  awal: "Bilangan awal",
  tiga: "Tiga bilangan",
};

/** x dan y dipakai semua jenis; z hanya jenis tiga. Arti x dan y menurut jenis ada di labelCerita. */
export type Cerita = { jenis: JenisCerita; x: number; y: number; z: number };

/** Keadaan awal. Bukan target misi mana pun. */
export const AWAL_CERITA: Cerita = { jenis: "jumlah", x: 9, y: 6, z: 3 };

/** Nama pengatur bilangan menurut jenis cerita. */
export function labelCerita(j: JenisCerita): { x: string; y: string; z: string } {
  switch (j) {
    case "jumlah":
    case "selisih":
      return { x: "Jambu Tika", y: "Jambu Kira", z: "" };
    case "lebihnya":
      return { x: "Donat Tika", y: "Lebihnya (Kira)", z: "" };
    case "kurangnya":
      return { x: "Donat Tika", y: "Kurangnya (Malosi)", z: "" };
    case "awal":
      return { x: "Sisa jeruk Halim", y: "Diberikan ke Lili", z: "" };
    case "tiga":
      return { x: "Boneka Tika", y: "Boneka Kira", z: "Boneka Lili" };
  }
}

/** Batas atas bilangan kedua. Hasil selalu tetap di 0 sampai 20. */
export function batasY(c: Cerita): number {
  switch (c.jenis) {
    case "selisih":
      return MAKS_CERITA;
    case "kurangnya":
      return c.x;
    default:
      return MAKS_CERITA - c.x;
  }
}

/** Batas atas bilangan ketiga (hanya jenis tiga). */
export const batasZ = (c: Cerita): number => (c.jenis === "tiga" ? MAKS_CERITA - c.x - c.y : 0);

export function rapikanCerita(c: Cerita): Cerita {
  const x = Math.max(0, Math.min(MAKS_CERITA, Math.round(c.x)));
  const dasar = { ...c, x };
  const y = Math.max(0, Math.min(batasY(dasar), Math.round(c.y)));
  const diY = { ...dasar, y };
  const z = c.jenis === "tiga" ? Math.max(0, Math.min(batasZ(diY), Math.round(c.z))) : Math.max(0, Math.min(MAKS_CERITA, Math.round(c.z)));
  return { ...diY, z };
}

export function hasilCerita(c: Cerita): number {
  switch (c.jenis) {
    case "selisih":
      return Math.abs(c.x - c.y);
    case "kurangnya":
      return c.x - c.y;
    case "tiga":
      return c.x + c.y + c.z;
    default:
      return c.x + c.y;
  }
}

/** Operasi yang dipilih dari kata kuncinya, beserta alasannya. */
export function operasiCerita(c: Cerita): { op: "tambah" | "kurang"; alasan: string } {
  switch (c.jenis) {
    case "jumlah":
      return { op: "tambah", alasan: "Kata jumlah berarti digabung, jadi ditambah." };
    case "selisih":
      return { op: "kurang", alasan: "Kata selisih berarti beda banyaknya: bilangan besar dikurangi bilangan kecil." };
    case "lebihnya":
      return { op: "tambah", alasan: "Yang dicari punya lebih banyak, jadi ditambah." };
    case "kurangnya":
      return { op: "kurang", alasan: "Yang dicari punya lebih sedikit, jadi dikurangi." };
    case "awal":
      return { op: "tambah", alasan: "Yang dicari adalah banyak sebelum diberikan, jadi operasinya dibalik: ditambah." };
    case "tiga":
      return { op: "tambah", alasan: "Jumlahkan dua bilangan dulu, lalu tambahkan bilangan yang ketiga." };
  }
}

/** Teks cerita dan kata kunci yang disorot di dalamnya. */
export function ceritaTeks(c: Cerita): { teks: string; kunci: string } {
  switch (c.jenis) {
    case "jumlah":
      return { teks: `Tika punya ${c.x} jambu. Kira punya ${c.y} jambu. Berapa jumlah jambu Tika dan Kira?`, kunci: "jumlah" };
    case "selisih":
      return { teks: `Tika punya ${c.x} jambu. Kira punya ${c.y} jambu. Berapa selisih jambu Tika dan Kira?`, kunci: "selisih" };
    case "lebihnya":
      return { teks: `Tika punya ${c.x} donat. Donat Kira ${c.y} lebihnya dari donat Tika. Berapa donat Kira?`, kunci: "lebihnya" };
    case "kurangnya":
      return { teks: `Tika punya ${c.x} donat. Donat Malosi ${c.y} kurangnya dari donat Tika. Berapa donat Malosi?`, kunci: "kurangnya" };
    case "awal":
      return { teks: `Halim memberikan ${c.y} jeruk kepada Lili. Sekarang jeruk Halim tersisa ${c.x}. Berapa jeruk Halim semula?`, kunci: "semula" };
    case "tiga":
      return { teks: `Tika membawa ${c.x} boneka. Kira membawa ${c.y} boneka. Lili membawa ${c.z} boneka. Berapa jumlah semua boneka?`, kunci: "jumlah semua" };
  }
}

/* ------------------------------ Empat langkah ------------------------------ */

export function diketahui(c: Cerita): string[] {
  switch (c.jenis) {
    case "jumlah":
    case "selisih":
      return [`Jambu Tika = ${c.x}`, `Jambu Kira = ${c.y}`];
    case "lebihnya":
      return [`Donat Tika = ${c.x}`, `Donat Kira = ${c.y} lebihnya dari Tika`];
    case "kurangnya":
      return [`Donat Tika = ${c.x}`, `Donat Malosi = ${c.y} kurangnya dari Tika`];
    case "awal":
      return [`Diberikan ke Lili = ${c.y}`, `Sisa jeruk Halim = ${c.x}`];
    case "tiga":
      return [`Boneka Tika = ${c.x}`, `Boneka Kira = ${c.y}`, `Boneka Lili = ${c.z}`];
  }
}

export function ditanya(c: Cerita): string {
  switch (c.jenis) {
    case "jumlah":
      return "Berapa jumlah jambu Tika dan Kira?";
    case "selisih":
      return "Berapa selisih jambu Tika dan Kira?";
    case "lebihnya":
      return "Berapa donat Kira?";
    case "kurangnya":
      return "Berapa donat Malosi?";
    case "awal":
      return "Berapa jeruk Halim semula?";
    case "tiga":
      return "Berapa jumlah semua boneka?";
  }
}

/** Baris solusi. Baris terakhir selalu memuat hasil akhir. */
export function solusi(c: Cerita): string[] {
  const h = hasilCerita(c);
  switch (c.jenis) {
    case "selisih":
      return [`${Math.max(c.x, c.y)} − ${Math.min(c.x, c.y)} = ${h}`];
    case "kurangnya":
      return [`${c.x} − ${c.y} = ${h}`];
    case "awal":
      return [`… − ${c.y} = ${c.x}`, `Dibalik: ${c.x} + ${c.y} = ${h}`];
    case "tiga":
      return [`${c.x} + ${c.y} = ${c.x + c.y}`, `${c.x + c.y} + ${c.z} = ${h}`];
    default:
      return [`${c.x} + ${c.y} = ${h}`];
  }
}

export function kesimpulan(c: Cerita): string {
  const h = hasilCerita(c);
  switch (c.jenis) {
    case "jumlah":
      return `Jadi jumlah jambu Tika dan Kira adalah ${h} jambu.`;
    case "selisih":
      return h === 0 ? "Jadi jambu Tika dan Kira sama banyak. Selisihnya 0 jambu." : `Jadi selisih jambu Tika dan Kira adalah ${h} jambu.`;
    case "lebihnya":
      return `Jadi donat Kira ada ${h} donat.`;
    case "kurangnya":
      return `Jadi donat Malosi ada ${h} donat.`;
    case "awal":
      return `Jadi jeruk Halim semula ada ${h} jeruk.`;
    case "tiga":
      return `Jadi jumlah semua boneka adalah ${h} boneka.`;
  }
}

/* ------------------------------- Model batang ------------------------------ */

/**
 * ada: yang sudah ada (merah). baru: yang datang lagi atau lebihnya (biru). cari: yang dicari (hijau).
 * kurang: bagian yang kurang atau diberikan (garis putus-putus). tiga: bilangan ketiga (emas).
 */
export type KelasBagian = "ada" | "baru" | "cari" | "kurang" | "tiga";
export type BagianBatang = { nilai: number; kelas: KelasBagian };
export type Batang = { nama: string; bagian: BagianBatang[]; total?: number };

const tanpaNol = (b: BagianBatang[]) => b.filter((x) => x.nilai > 0);

/** Batang menurut skala tetap 0 sampai 20 supaya panjangnya bisa dibandingkan. */
export function batangCerita(c: Cerita): Batang[] {
  const h = hasilCerita(c);
  switch (c.jenis) {
    case "jumlah":
      return [
        { nama: "Tika", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }]) },
        { nama: "Kira", bagian: tanpaNol([{ nilai: c.y, kelas: "baru" }]) },
        { nama: "Jumlah", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }, { nilai: c.y, kelas: "baru" }]), total: h },
      ];
    case "selisih": {
      const kecil = Math.min(c.x, c.y);
      const tikaPanjang = c.x >= c.y;
      const panjang = tanpaNol([{ nilai: kecil, kelas: "ada" }, { nilai: h, kelas: "cari" }]);
      const pendek = tanpaNol([{ nilai: kecil, kelas: "ada" }]);
      return [
        { nama: "Tika", bagian: tikaPanjang ? panjang : pendek, total: c.x },
        { nama: "Kira", bagian: tikaPanjang ? pendek : panjang, total: c.y },
      ];
    }
    case "lebihnya":
      return [
        { nama: "Tika", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }]) },
        { nama: "Kira", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }, { nilai: c.y, kelas: "cari" }]), total: h },
      ];
    case "kurangnya":
      return [
        { nama: "Tika", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }]) },
        { nama: "Malosi", bagian: tanpaNol([{ nilai: h, kelas: "cari" }, { nilai: c.y, kelas: "kurang" }]), total: h },
      ];
    case "awal":
      return [
        { nama: "Sisa", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }]) },
        { nama: "Semula", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }, { nilai: c.y, kelas: "kurang" }]), total: h },
      ];
    case "tiga":
      return [{ nama: "Semua", bagian: tanpaNol([{ nilai: c.x, kelas: "ada" }, { nilai: c.y, kelas: "baru" }, { nilai: c.z, kelas: "tiga" }]), total: h }];
  }
}

/** Ucapan guru untuk keadaan sekarang. Titik-titik dibaca "titik-titik". */
export function ucapanCerita(c: Cerita): string {
  const isi = solusi(c)
    .map((s) => s.replace(/…/g, "titik-titik"))
    .join(". ");
  return `${ceritaTeks(c).teks} ${operasiCerita(c).alasan} Solusi: ${isi}. ${kesimpulan(c)}`;
}
