/**
 * Dua definisi Mesin Kalimat Kelas 3 Bab 2 (Kalimat Matematika), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts.
 * Lima stasiun: Cerita -> Kalimat -> Kebalikan -> Hitung -> Periksa.
 *  - MESIN_KALIMAT_TAMBAH (Sub-Bab A): … + 5 = 17, 30 + … = 50, … + 16 = 54
 *  - MESIN_KALIMAT_KURANG (Sub-Bab B): 80 − … = 45, … − 45 = 27, … − 12 = 26
 * Semua pilihan dan kunci DIHITUNG dari bilangan kasusnya, jadi kunci tidak mungkin salah hitung.
 * Letak jawaban benar diputar per kasus dan stasiun.
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k3b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

export type OpMesin = "+" | "−";

/** x op y = z, dengan x atau y belum diketahui. Nama tiap bilangan dipakai di stasiun Cerita. */
export type KasusKalimat = {
  id: string;
  nama: string;
  op: OpMesin;
  x: number;
  y: number;
  hilang: "x" | "y";
  cerita: string;
  namaX: string;
  namaY: string;
  namaZ: string;
};

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

export const hasilKasus = (k: KasusKalimat): number => (k.op === "+" ? k.x + k.y : k.x - k.y);
export const jawabKasus = (k: KasusKalimat): number => (k.hilang === "x" ? k.x : k.y);
const diketahui = (k: KasusKalimat): number => (k.hilang === "x" ? k.y : k.x);

/** Kalimat Matematika kasus. `kotak` adalah tulisan di tempat yang belum diketahui. */
export function kalimatKasus(k: KasusKalimat, kotak: string | number = "…", op: OpMesin = k.op): string {
  const z = hasilKasus(k);
  return k.hilang === "x" ? `${kotak} ${op} ${k.y} = ${z}` : `${k.x} ${op} ${kotak} = ${z}`;
}

/** Operasi kebalikan yang benar dan dua yang keliru. */
export function kebalikanKasus(k: KasusKalimat): { benar: string; salah: [string, string]; petunjuk: string } {
  const z = hasilKasus(k);
  const d = diketahui(k);
  if (k.op === "+") {
    return {
      benar: `${z} − ${d}`,
      salah: [`${z} + ${d}`, `${d} − ${z}`],
      petunjuk: `${z} adalah jumlah semuanya dan ${d} salah satu bagiannya. Bagian yang lain dicari dengan mengurangkan jumlah dengan bagian yang diketahui.`,
    };
  }
  if (k.hilang === "y") {
    return {
      benar: `${k.x} − ${z}`,
      salah: [`${k.x} + ${z}`, `${z} − ${k.x}`],
      petunjuk: `${k.x} adalah bilangan awal dan ${z} sisanya. Bilangan yang dikurangkan dicari dengan mengurangkan bilangan awal dengan sisa.`,
    };
  }
  const besar = Math.max(k.y, z);
  const kecil = Math.min(k.y, z);
  return {
    benar: `${k.y} + ${z}`,
    salah: [`${besar} − ${kecil}`, `${kecil} − ${besar}`],
    petunjuk: `Bilangan awal belum diketahui. Bilangan awal sama dengan bilangan yang dikurangkan ditambah sisa, jadi ${k.y} dan ${z} dijumlahkan.`,
  };
}

/** Dua pengecoh nilai: salah sepuluh dan salah satu. Selalu berbeda, 0 sampai 100, dan bukan kuncinya. */
export function pengecohNilai(j: number): [number, number] {
  const a = j + 10 <= 100 ? j + 10 : j - 10;
  const b = j >= 2 ? j - 1 : j + 1;
  return [a, b];
}

export const STASIUN_KALIMAT: StasiunDef[] = [
  { id: "cerita", nama: "Cerita", ikon: "📖" },
  { id: "kalimat", nama: "Kalimat", ikon: "✍️" },
  { id: "kebalikan", nama: "Kebalikan", ikon: "🔄" },
  { id: "hitung", nama: "Hitung", ikon: "🧮" },
  { id: "periksa", nama: "Periksa", ikon: "✅" },
];

export function kasusMesinKalimat(k: KasusKalimat, idx: number): KasusMesin {
  const z = hasilKasus(k);
  const j = jawabKasus(k);
  const lawan: OpMesin = k.op === "+" ? "−" : "+";
  const namaHilang = k.hilang === "x" ? k.namaX : k.namaY;
  const namaTahu = k.hilang === "x" ? k.namaY : k.namaX;
  const kal = kalimatKasus(k);
  // Pengecoh kalimat: hasil dan bilangan yang diketahui tertukar, serta tanda yang dibalik.
  // Pada pengurangan, "… − z = y" ternyata ikut benar (bilangan yang sama), jadi bilangan awal dipindah ke belakang.
  const tukar = k.hilang === "x" ? (k.op === "−" ? `${k.y} − … = ${z}` : `… + ${z} = ${k.y}`) : `${z} ${k.op} … = ${k.x}`;
  const balik = kebalikanKasus(k);
  const [p1, p2] = pengecohNilai(j);
  const benarPeriksa = kalimatKasus(k, j);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "cerita",
      tanya: `${k.cerita} Bilangan mana yang belum diketahui?`,
      opsi: susunOpsi(namaHilang, [namaTahu, k.namaZ], idx),
      benar: namaHilang,
      petunjuk: "Baca lagi ceritanya. Cari bilangan yang tidak disebutkan angkanya. Itulah yang ditulis dengan titik-titik.",
    },
    {
      stasiun: "kalimat",
      tanya: `Kalimat Matematika untuk cerita ${k.nama} adalah…`,
      opsi: susunOpsi(kal, [tukar, kalimatKasus(k, "…", lawan)], idx + 1),
      benar: kal,
      petunjuk:
        k.op === "+"
          ? `Benda digabung, jadi tandanya tambah. ${z} adalah jumlah semuanya, letaknya di kanan tanda sama dengan.`
          : `Benda berkurang, jadi tandanya kurang. ${z} adalah sisanya, letaknya di kanan tanda sama dengan.`,
    },
    {
      stasiun: "kebalikan",
      tanya: `Untuk mengisi titik-titik pada ${kal}, kita menghitung…`,
      opsi: susunOpsi(balik.benar, balik.salah, idx + 2),
      benar: balik.benar,
      petunjuk: balik.petunjuk,
    },
    {
      stasiun: "hitung",
      tanya: `${balik.benar} = …`,
      opsi: susunOpsi(String(j), [String(p1), String(p2)], idx),
      benar: String(j),
      petunjuk: "Hitung satuannya dulu, lalu puluhannya. Ingat simpanan atau puluhan yang diambil.",
    },
    {
      stasiun: "periksa",
      tanya: "Isi titik-titiknya, lalu hitung lagi. Kalimat mana yang benar?",
      opsi: susunOpsi(benarPeriksa, [kalimatKasus(k, p1), kalimatKasus(k, p2)], idx + 1),
      benar: benarPeriksa,
      petunjuk: `Hitung sisi kirinya. Hasilnya harus tepat ${z}, sama dengan sisi kanan.`,
    },
  ];
  return { id: k.id, nama: k.nama, ringkas: `${kal}. Cari dengan ${balik.benar} = ${j}. Periksa: ${benarPeriksa}.`, langkah };
}

export const KASUS_TAMBAH: KasusKalimat[] = [
  {
    id: "kelereng-galih",
    nama: "Kelereng Galih",
    op: "+",
    x: 12,
    y: 5,
    hilang: "x",
    cerita: "Galih menyimpan sejumlah kelereng di rumah. Ia membeli 5 kelereng lagi, sehingga jumlahnya 17 butir.",
    namaX: "Kelereng di rumah",
    namaY: "Kelereng yang dibeli",
    namaZ: "Jumlah kelereng sekarang",
  },
  {
    id: "galih-andi",
    nama: "Galih dan Andi",
    op: "+",
    x: 30,
    y: 20,
    hilang: "y",
    cerita: "Galih membawa 30 kelereng dan Andi membawa sejumlah kelereng. Jika digabung, jumlahnya 50 butir.",
    namaX: "Kelereng Galih",
    namaY: "Kelereng Andi",
    namaZ: "Jumlah kelereng berdua",
  },
  {
    id: "ikan-pak-ali",
    nama: "Ikan Pak Ali",
    op: "+",
    x: 38,
    y: 16,
    hilang: "x",
    cerita: "Pak Ali punya sejumlah ikan di kolam. Ia membeli 16 ikan lagi, sehingga jumlahnya 54 ekor.",
    namaX: "Ikan semula",
    namaY: "Ikan yang dibeli",
    namaZ: "Jumlah ikan sekarang",
  },
];

export const KASUS_KURANG: KasusKalimat[] = [
  {
    id: "ayam-dijual",
    nama: "Ayam yang Dijual",
    op: "−",
    x: 80,
    y: 35,
    hilang: "y",
    cerita: "Pak Slamet punya 80 ekor ayam. Sebagian dijual ke pasar dan tersisa 45 ekor.",
    namaX: "Ayam mula-mula",
    namaY: "Ayam yang dijual",
    namaZ: "Ayam yang tersisa",
  },
  {
    id: "ayam-mula",
    nama: "Ayam Mula-Mula",
    op: "−",
    x: 72,
    y: 45,
    hilang: "x",
    cerita: "Hari ini Pak Slamet menjual 45 ekor ayam. Ayam yang tersisa di kandang ada 27 ekor.",
    namaX: "Ayam mula-mula",
    namaY: "Ayam yang dijual",
    namaZ: "Ayam yang tersisa",
  },
  {
    id: "kue-ibu",
    nama: "Kue Ibu",
    op: "−",
    x: 38,
    y: 12,
    hilang: "x",
    cerita: "Ibu membuat sejumlah kue. Sebanyak 12 kue dimakan dan tersisa 26 kue.",
    namaX: "Kue yang dibuat",
    namaY: "Kue yang dimakan",
    namaZ: "Kue yang tersisa",
  },
];

export const MESIN_KALIMAT_TAMBAH: DefMesin = {
  id: "mesin-kalimat-tambah-k3b2",
  judul: "Mesin Kalimat Tambah",
  selesaiId: "mesin-kalimat-tambah",
  stasiun: STASIUN_KALIMAT,
  kasus: KASUS_TAMBAH.map(kasusMesinKalimat),
};

export const MESIN_KALIMAT_KURANG: DefMesin = {
  id: "mesin-kalimat-kurang-k3b2",
  judul: "Mesin Kalimat Kurang",
  selesaiId: "mesin-kalimat-kurang",
  stasiun: STASIUN_KALIMAT,
  kasus: KASUS_KURANG.map(kasusMesinKalimat),
};

export const SEMUA_MESIN_K3B2: DefMesin[] = [MESIN_KALIMAT_TAMBAH, MESIN_KALIMAT_KURANG];
