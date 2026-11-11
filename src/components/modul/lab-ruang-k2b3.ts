/**
 * Lereng Gelinding (Kelas 2 Bab 3, Sub-Bab C): model PhET untuk bangun ruang.
 * Lima bangun ruang, dua cara meletakkan. Anak melepas benda di lereng dan melihat apakah menggelinding.
 * Hasil bergantung pada permukaan datar atau lengkung yang menyentuh lereng.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b3.mjs.
 */

export type Ruang = "kubus" | "balok" | "tabung" | "kerucut" | "bola";
export type Posisi = "berdiri" | "rebah";

export const URUT_RUANG: Ruang[] = ["kubus", "balok", "tabung", "kerucut", "bola"];

export const NAMA_RUANG: Record<Ruang, string> = {
  kubus: "Kubus",
  balok: "Balok",
  tabung: "Tabung",
  kerucut: "Kerucut",
  bola: "Bola",
};

export type CiriRuang = { datar: number; lengkung: number; ditumpuk: boolean };

export const CIRI_RUANG: Record<Ruang, CiriRuang> = {
  kubus: { datar: 6, lengkung: 0, ditumpuk: true },
  balok: { datar: 6, lengkung: 0, ditumpuk: true },
  tabung: { datar: 2, lengkung: 1, ditumpuk: true },
  kerucut: { datar: 1, lengkung: 1, ditumpuk: false },
  bola: { datar: 0, lengkung: 1, ditumpuk: false },
};

export type Gerak = "diam" | "menggelinding" | "melingkar";

export type Hasil = { gerak: Gerak; alasan: string };

export const kelompokPermukaan = (r: Ruang): string => {
  const c = CIRI_RUANG[r];
  if (c.lengkung === 0) return "Permukaan datar saja";
  if (c.datar === 0) return "Permukaan lengkung saja";
  return "Permukaan datar dan lengkung";
};

/** Hasil melepas benda di lereng. */
export function lepas(r: Ruang, p: Posisi): Hasil {
  if (r === "bola") return { gerak: "menggelinding", alasan: "Bola hanya punya permukaan lengkung, jadi menggelinding ke mana saja." };
  if (r === "kubus" || r === "balok") {
    return { gerak: "diam", alasan: `${NAMA_RUANG[r]} beralas permukaan datar, jadi diam di lereng dan tidak menggelinding.` };
  }
  if (r === "tabung") {
    return p === "berdiri"
      ? { gerak: "diam", alasan: "Tabung berdiri beralas permukaan datar, jadi diam." }
      : { gerak: "menggelinding", alasan: "Tabung rebah menyentuh lereng dengan permukaan lengkung, jadi menggelinding lurus." };
  }
  return p === "berdiri"
    ? { gerak: "diam", alasan: "Kerucut berdiri beralas permukaan datar, jadi diam." }
    : { gerak: "melingkar", alasan: "Kerucut rebah menyentuh lereng dengan permukaan lengkung, tetapi ujungnya runcing, jadi bergerak membentuk lingkaran." };
}

export const kalimatRuang = (r: Ruang) => {
  const c = CIRI_RUANG[r];
  const datar = c.datar === 0 ? "tidak punya permukaan datar" : `punya ${c.datar} permukaan datar`;
  const lengkung = c.lengkung === 0 ? "tidak punya permukaan lengkung" : `punya ${c.lengkung} permukaan lengkung`;
  return `${NAMA_RUANG[r]} ${datar} dan ${lengkung}. Bangun ruang punya ruang di dalam yang bisa diisi.`;
};

export function ucapanRuang(r: Ruang, p: Posisi, sudahLepas: boolean): string {
  const dasar = `${NAMA_RUANG[r]} ${p === "berdiri" ? "berdiri" : "rebah"}. ${kalimatRuang(r)}`;
  if (!sudahLepas) return `${dasar} Tekan lepas untuk mencobanya di lereng.`;
  return `${dasar} ${lepas(r, p).alasan}`;
}

/** Jarak gelinding dan putaran untuk animasi. Satuan: piksel SVG dan derajat. */
export function gerakAnimasi(g: Gerak): { jarak: number; putar: number } {
  if (g === "menggelinding") return { jarak: 190, putar: 540 };
  if (g === "melingkar") return { jarak: 60, putar: 160 };
  return { jarak: 0, putar: 0 };
}
