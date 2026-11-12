/**
 * Lab Penggaris (Kelas 3 Bab 3, Sub-Bab A): logika murni.
 * Satu benda di atas penggaris (sampai 30 cm) atau meteran (sampai 300 cm). Benda mulai dari angka tertentu.
 * Panjang hanya terbaca dengan benar bila ujung kiri benda tepat di angka 0. Bila tidak, bacaan ujung kanan
 * adalah angka awal ditambah panjang, jadi bukan panjang benda. Semua ukuran dalam sentimeter (hubungan
 * meter dan sentimeter baru dipelajari di Sub-Bab B). Tanpa skor, tanpa waktu.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b3.mjs.
 */

export type AlatUkur = "penggaris" | "meteran";
export type BendaUkur = { id: string; nama: string; cm: number };

export const BATAS_ALAT: Record<AlatUkur, number> = { penggaris: 30, meteran: 300 };
export const NAMA_ALAT_UKUR: Record<AlatUkur, string> = { penggaris: "Penggaris", meteran: "Meteran" };

export const BENDA_UKUR: BendaUkur[] = [
  { id: "penghapus", nama: "Penghapus", cm: 5 },
  { id: "krayon", nama: "Krayon", cm: 9 },
  { id: "pensil", nama: "Pensil", cm: 15 },
  { id: "buku", nama: "Buku tulis", cm: 30 },
  { id: "meja", nama: "Meja", cm: 120 },
  { id: "lemari", nama: "Lemari", cm: 150 },
  { id: "pintu", nama: "Pintu", cm: 200 },
  { id: "papan", nama: "Papan tulis", cm: 240 },
];

export const cariBenda = (id: string): BendaUkur => BENDA_UKUR.find((b) => b.id === id) ?? BENDA_UKUR[0];

/** Alat yang tepat: benda sampai 30 cm dengan penggaris, selebihnya meteran. */
export const alatTepatUkur = (cm: number): AlatUkur => (cm <= BATAS_ALAT.penggaris ? "penggaris" : "meteran");

export type StatePenggaris = {
  jenis: AlatUkur;
  benda: string;
  /** Angka tempat ujung kiri benda berada. */
  awal: number;
  /** "alat:benda" untuk benda yang sudah diukur dengan benar (mulai dari nol, alat yang tepat). */
  pernah: string[];
  pernahSalah: boolean;
  pernahTerlalu: boolean;
  /** Hasil baca terakhir yang benar, mis. "Pensil 15 cm". */
  hasil: string;
  pesan: string;
};

export type LangkahGeser = 1 | -1 | 10 | -10;
export type AksiPenggaris = { t: "ALAT"; jenis: AlatUkur } | { t: "BENDA"; id: string } | { t: "GESER"; d: LangkahGeser } | { t: "BACA" } | { t: "RESET" };

/** Awal: pensil 15 cm di penggaris, ujung kirinya di angka 3 (bukan nol). */
export const awalPenggaris = (): StatePenggaris => ({ jenis: "penggaris", benda: "pensil", awal: 3, pernah: [], pernahSalah: false, pernahTerlalu: false, hasil: "", pesan: "" });

export const muat = (x: Pick<StatePenggaris, "jenis" | "benda">): boolean => cariBenda(x.benda).cm <= BATAS_ALAT[x.jenis];

/** Angka tempat ujung kanan benda berada. */
export const ujungKanan = (x: Pick<StatePenggaris, "benda" | "awal">): number => x.awal + cariBenda(x.benda).cm;

const awalBawaan = (jenis: AlatUkur, cm: number): number => {
  const sisa = Math.max(0, BATAS_ALAT[jenis] - cm);
  return Math.min(sisa, jenis === "penggaris" ? 3 : 30);
};

export function langkahPenggaris(x: StatePenggaris, a: AksiPenggaris): StatePenggaris {
  switch (a.t) {
    case "ALAT": {
      if (a.jenis === x.jenis) return x;
      const y: StatePenggaris = { ...x, jenis: a.jenis, hasil: "", pesan: "" };
      const b = cariBenda(y.benda);
      if (!muat(y)) return { ...y, awal: 0, pernahTerlalu: true, pesan: `${b.nama} (${b.cm} cm) lebih panjang dari ${NAMA_ALAT_UKUR[y.jenis].toLowerCase()} (${BATAS_ALAT[y.jenis]} cm). Pakai alat yang lebih panjang.` };
      return { ...y, awal: awalBawaan(y.jenis, b.cm) };
    }
    case "BENDA": {
      if (!BENDA_UKUR.some((b) => b.id === a.id) || a.id === x.benda) return x;
      const y: StatePenggaris = { ...x, benda: a.id, hasil: "", pesan: "" };
      const b = cariBenda(a.id);
      if (!muat(y)) return { ...y, awal: 0, pernahTerlalu: true, pesan: `${b.nama} (${b.cm} cm) lebih panjang dari ${NAMA_ALAT_UKUR[y.jenis].toLowerCase()} (${BATAS_ALAT[y.jenis]} cm). Pakai alat yang lebih panjang.` };
      return { ...y, awal: awalBawaan(y.jenis, b.cm) };
    }
    case "GESER": {
      if (!muat(x)) return { ...x, pesan: "Benda ini tidak muat di alat ini, jadi tidak bisa digeser. Ganti alatnya." };
      const b = cariBenda(x.benda);
      const baru = x.awal + a.d;
      if (baru < 0) return { ...x, awal: 0, pesan: "Benda tidak bisa digeser lebih ke kiri dari angka nol." };
      if (baru + b.cm > BATAS_ALAT[x.jenis]) return { ...x, pesan: "Ujung benda sudah mentok di ujung alat ukur." };
      return { ...x, awal: baru, hasil: "", pesan: "" };
    }
    case "BACA": {
      const b = cariBenda(x.benda);
      if (!muat(x)) return { ...x, pesan: `${b.nama} tidak muat di ${NAMA_ALAT_UKUR[x.jenis].toLowerCase()}. Ganti alatnya dulu.` };
      if (x.awal !== 0) {
        return { ...x, pernahSalah: true, hasil: "", pesan: `Ujung kanan di angka ${ujungKanan(x)}, tetapi benda mulai dari angka ${x.awal}, bukan nol. Bacaan itu bukan panjang benda. Geser benda sampai ujung kirinya tepat di angka 0.` };
      }
      const id = `${x.jenis}:${x.benda}`;
      const tepat = alatTepatUkur(b.cm) === x.jenis;
      const pernah = tepat && !x.pernah.includes(id) ? [...x.pernah, id] : x.pernah;
      const catatan = tepat ? "" : ` Hasilnya benar, tetapi ${NAMA_ALAT_UKUR[alatTepatUkur(b.cm)].toLowerCase()} lebih tepat untuk benda sepanjang ini.`;
      return { ...x, pernah, hasil: `${b.nama} ${b.cm} cm`, pesan: `Ujung kiri di 0, ujung kanan di ${b.cm}. Panjang ${b.nama.toLowerCase()} ${b.cm} cm.${catatan}` };
    }
    case "RESET":
      return awalPenggaris();
  }
}

export type KeadaanPenggaris = {
  alat: "penggaris";
  jenis: AlatUkur;
  benda: string;
  cm: number;
  awal: number;
  dinol: boolean;
  muat: boolean;
  pernah: string[];
  pernahSalah: boolean;
  pernahTerlalu: boolean;
};

export function keadaanPenggaris(x: StatePenggaris): KeadaanPenggaris {
  return { alat: "penggaris", jenis: x.jenis, benda: x.benda, cm: cariBenda(x.benda).cm, awal: x.awal, dinol: x.awal === 0 && muat(x), muat: muat(x), pernah: x.pernah, pernahSalah: x.pernahSalah, pernahTerlalu: x.pernahTerlalu };
}

export function ucapPenggaris(x: StatePenggaris): string {
  const b = cariBenda(x.benda);
  if (!muat(x)) return `${b.nama} ${b.cm} sentimeter terlalu panjang untuk ${NAMA_ALAT_UKUR[x.jenis].toLowerCase()}. Pakai alat yang lebih panjang.`;
  if (x.awal !== 0) return `Ujung kiri ${b.nama.toLowerCase()} ada di angka ${x.awal}. Geser sampai tepat di angka nol, baru baca ujung yang lain.`;
  return `Ujung kiri di angka nol. Ujung kanan di angka ${b.cm}. Panjang ${b.nama.toLowerCase()} ${b.cm} sentimeter.`;
}
