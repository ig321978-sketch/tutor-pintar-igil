/**
 * Lab Timbangan (Kelas 3 Bab 3, Sub-Bab C): logika murni.
 * Timbangan digital (layar dalam gram) dan timbangan duduk (jarum dalam kilogram), keduanya sampai 5.000 g.
 * Timbangan baru benar bila layar atau jarum tepat di angka 0 sebelum benda diletakkan. Bila tidak, bacaan
 * adalah angka awal ditambah berat benda, jadi bukan berat benda. Berat disimpan dalam gram.
 * Hubungan kilogram dan gram baru dipelajari di Sub-Bab D, jadi di sini kilogram hanya dibaca dari jarum.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b3.mjs.
 */

export type JenisTimbang = "digital" | "duduk";
export type BendaTimbang = { id: string; nama: string; g: number };

export const MAKS_TIMBANG = 5000;
export const NAMA_TIMBANG: Record<JenisTimbang, string> = { digital: "Timbangan digital", duduk: "Timbangan duduk" };

export const BENDA_TIMBANG: BendaTimbang[] = [
  { id: "stroberi", nama: "Stroberi", g: 100 },
  { id: "telur", nama: "Telur", g: 250 },
  { id: "stroberi2", nama: "Stroberi dua kotak", g: 500 },
  { id: "gula", nama: "Gula", g: 1000 },
  { id: "tepung", nama: "Tepung", g: 1250 },
  { id: "jeruk", nama: "Jeruk", g: 2000 },
  { id: "semangka", nama: "Semangka", g: 3000 },
  { id: "beras", nama: "Beras", g: 5000 },
];

export const cariBendaTimbang = (id: string): BendaTimbang => BENDA_TIMBANG.find((b) => b.id === id) ?? BENDA_TIMBANG[0];

export const titikTimbang = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Timbangan duduk hanya terbaca jelas bila berat jatuh tepat di angka kilogram. */
export const tepatAngkaKg = (g: number): boolean => g % 1000 === 0;

export type StateTimbang = {
  jenis: JenisTimbang;
  benda: string;
  ditaruh: boolean;
  /** Bacaan awal tiap timbangan sebelum benda diletakkan, dalam gram. Awalnya tidak nol. */
  awalDigital: number;
  awalDuduk: number;
  /** "jenis:benda" untuk benda yang sudah ditimbang dengan benar (mulai dari nol). */
  pernah: string[];
  pernahSalah: boolean;
  /** Timbangan duduk dipakai pada benda yang jarumnya jatuh di antara dua angka. */
  pernahDiantara: boolean;
  hasil: string;
  pesan: string;
};

export type AksiTimbang = { t: "JENIS"; jenis: JenisTimbang } | { t: "BENDA"; id: string } | { t: "NOL" } | { t: "TARUH" } | { t: "BACA" } | { t: "RESET" };

export const awalTimbang = (): StateTimbang => ({ jenis: "digital", benda: "telur", ditaruh: false, awalDigital: 50, awalDuduk: 1000, pernah: [], pernahSalah: false, pernahDiantara: false, hasil: "", pesan: "" });

export const awalAktif = (x: Pick<StateTimbang, "jenis" | "awalDigital" | "awalDuduk">): number => (x.jenis === "digital" ? x.awalDigital : x.awalDuduk);

/** Bacaan layar atau jarum sekarang dalam gram. */
export const bacaanTimbang = (x: StateTimbang): number => awalAktif(x) + (x.ditaruh ? cariBendaTimbang(x.benda).g : 0);

/** Teks bacaan: digital dalam gram, duduk dalam kilogram (atau di antara dua angka). */
export function teksBacaan(jenis: JenisTimbang, g: number): string {
  if (jenis === "digital") return `${titikTimbang(g)} g`;
  if (g % 1000 === 0) return `${g / 1000} kg`;
  return `antara ${Math.floor(g / 1000)} dan ${Math.floor(g / 1000) + 1} kg`;
}

/** Timbangan yang tepat: benda ringan atau berat yang tidak bulat kilogram dengan digital, kilogram penuh dan berat dengan duduk. */
export const timbanganTepat = (g: number): JenisTimbang => (g >= 2000 && tepatAngkaKg(g) ? "duduk" : "digital");

export function langkahTimbang(x: StateTimbang, a: AksiTimbang): StateTimbang {
  switch (a.t) {
    case "JENIS":
      return a.jenis === x.jenis ? x : { ...x, jenis: a.jenis, ditaruh: false, hasil: "", pesan: "" };
    case "BENDA":
      return !BENDA_TIMBANG.some((b) => b.id === a.id) || a.id === x.benda ? x : { ...x, benda: a.id, ditaruh: false, hasil: "", pesan: "" };
    case "NOL": {
      const nama = x.jenis === "digital" ? "Layar" : "Jarum";
      const y = x.jenis === "digital" ? { ...x, awalDigital: 0 } : { ...x, awalDuduk: 0 };
      return { ...y, hasil: "", pesan: awalAktif(x) === 0 ? `${nama} sudah tepat di angka 0.` : `${nama} diatur ke angka 0. Sekarang aman untuk menimbang.` };
    }
    case "TARUH":
      return { ...x, ditaruh: !x.ditaruh, hasil: "", pesan: "" };
    case "BACA": {
      const b = cariBendaTimbang(x.benda);
      if (!x.ditaruh) return { ...x, pesan: "Letakkan bendanya di atas timbangan dulu." };
      const awal = awalAktif(x);
      const total = awal + b.g;
      if (total > MAKS_TIMBANG) return { ...x, hasil: "", pesan: `Bacaan ${titikTimbang(total)} g melebihi batas timbangan (${titikTimbang(MAKS_TIMBANG)} g). Atur ke nol dulu atau pilih benda lain.` };
      if (awal !== 0) {
        return { ...x, pernahSalah: true, hasil: "", pesan: `${x.jenis === "digital" ? "Layar" : "Jarum"} menunjukkan ${teksBacaan(x.jenis, total)}, tetapi sebelum benda diletakkan sudah ${teksBacaan(x.jenis, awal)}, bukan 0. Bacaan itu bukan berat benda. Atur ke nol dulu.` };
      }
      if (x.jenis === "duduk" && !tepatAngkaKg(b.g)) {
        return { ...x, pernahDiantara: true, hasil: "", pesan: `Jarum berhenti ${teksBacaan("duduk", total)}, tidak tepat di satu angka. Pakai timbangan digital agar mudah dibaca.` };
      }
      const id = `${x.jenis}:${x.benda}`;
      const pernah = x.pernah.includes(id) ? x.pernah : [...x.pernah, id];
      const hasil = `${b.nama} ${teksBacaan(x.jenis, b.g)}`;
      const tepat = timbanganTepat(b.g) === x.jenis;
      const catatan = tepat ? "" : ` Hasilnya benar, tetapi ${NAMA_TIMBANG[timbanganTepat(b.g)].toLowerCase()} lebih cocok untuk benda ini.`;
      return { ...x, pernah, hasil, pesan: `${x.jenis === "digital" ? "Layar" : "Jarum"} menunjukkan ${teksBacaan(x.jenis, b.g)}. ${b.nama} beratnya ${teksBacaan(x.jenis, b.g)}.${catatan}` };
    }
    case "RESET":
      return awalTimbang();
  }
}

export type KeadaanTimbang = {
  alat: "timbang";
  jenis: JenisTimbang;
  benda: string;
  g: number;
  awal: number;
  dinol: boolean;
  ditaruh: boolean;
  pernah: string[];
  pernahSalah: boolean;
  pernahDiantara: boolean;
};

export function keadaanTimbang(x: StateTimbang): KeadaanTimbang {
  return { alat: "timbang", jenis: x.jenis, benda: x.benda, g: cariBendaTimbang(x.benda).g, awal: awalAktif(x), dinol: awalAktif(x) === 0, ditaruh: x.ditaruh, pernah: x.pernah, pernahSalah: x.pernahSalah, pernahDiantara: x.pernahDiantara };
}

export function ucapTimbang(x: StateTimbang): string {
  const awal = awalAktif(x);
  const b = cariBendaTimbang(x.benda);
  if (awal !== 0) return `${x.jenis === "digital" ? "Layar" : "Jarum"} belum di angka nol. Atur ke nol dulu sebelum menimbang.`;
  if (!x.ditaruh) return "Sudah di angka nol. Letakkan benda di atas timbangan.";
  return `${b.nama} beratnya ${x.jenis === "digital" ? `${b.g} gram` : tepatAngkaKg(b.g) ? `${b.g / 1000} kilogram` : "di antara dua angka"}.`;
}
