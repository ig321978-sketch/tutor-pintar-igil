/**
 * Dua definisi Mesin Bertahap Kelas 3 Bab 5 (Penyajian Data dalam Tabel), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data kasusnya, jadi kunci tidak
 * mungkin salah hitung. Letak jawaban benar diputar per kasus dan stasiun.
 *  - MESIN_URUT  (Sub-Bab A): Urutkan -> Ujung -> Jangkauan -> Banyak   (anggota keluarga, nilai ulangan, tumpukan kue)
 *  - MESIN_TABEL (Sub-Bab B): Turus -> Banyak -> Baca -> Banding        (manik, huruf STATISTIKA, nilai ulangan)
 * Pengecoh bersumber dari kesalahan umum: urutan terbalik, data pertama dianggap terkecil, jangkauan ditambah,
 * banyak seluruh data dikira banyak satu nilai, garis miring tidak dihitung, dan nilai acuan ikut dijumlahkan.
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k3b5.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const naik = (d: readonly number[]): number[] => [...d].sort((p, q) => p - q);
const banyak = <T,>(d: readonly T[], v: T): number => d.filter((x) => x === v).length;

/* ------------------------------ Sub-Bab A: Mesin Urut ------------------------------ */

export type KasusUrut = {
  id: string;
  nama: string;
  /** Kalimat pembuka data, mis. "Banyak anggota keluarga lima anak". */
  data: number[];
  konteks: string;
  arah: "kecil" | "besar";
  /** Nilai yang dicacah di stasiun Banyak, beserta kalimat tanyanya. */
  nilai: number;
  tanyaBanyak: string;
};

export const KASUS_URUT: KasusUrut[] = [
  { id: "keluarga", nama: "Anggota keluarga", data: [4, 3, 5, 6, 3], konteks: "Banyak anggota keluarga lima anak", arah: "kecil", nilai: 3, tanyaBanyak: "Berapa anak yang anggota keluarganya 3 orang?" },
  { id: "ulangan", nama: "Nilai ulangan", data: [8, 6, 9, 6, 10, 7, 6], konteks: "Nilai ulangan tujuh siswa", arah: "besar", nilai: 6, tanyaBanyak: "Berapa kali nilai 6 muncul?" },
  { id: "kue", nama: "Tumpukan kue", data: [7, 9, 4, 9, 5], konteks: "Banyak kue lima anak", arah: "kecil", nilai: 9, tanyaBanyak: "Berapa anak yang punya 9 kue?" },
];

export const STASIUN_URUT: StasiunDef[] = [
  { id: "urut", nama: "Urutkan", ikon: "📶" },
  { id: "ujung", nama: "Ujung", ikon: "⬆️" },
  { id: "jangkauan", nama: "Jangkauan", ikon: "📏" },
  { id: "banyak", nama: "Banyak", ikon: "✏️" },
];

export const teksUjung = (kecil: number, besar: number): string => `terkecil ${kecil}, terbesar ${besar}`;

export function kasusMesinUrut(k: KasusUrut, idx: number): KasusMesin {
  const asc = naik(k.data);
  const desc = [...asc].reverse();
  const benarUrut = (k.arah === "kecil" ? asc : desc).join(", ");
  const balik = (k.arah === "kecil" ? desc : asc).join(", ");
  const kecil = asc[0];
  const besar = asc[asc.length - 1];
  const awal = k.data[0];
  const akhir = k.data[k.data.length - 1];
  const f = banyak(k.data, k.nilai);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "urut",
      tanya: `${k.konteks}: ${k.data.join(", ")}. Urutkan dari ${k.arah === "kecil" ? "terkecil" : "terbesar"}.`,
      opsi: susunOpsi(benarUrut, [balik, k.data.join(", ")], idx),
      benar: benarUrut,
      petunjuk: k.arah === "kecil" ? "Mulai dari bilangan paling kecil, lalu naik sampai paling besar. Bilangan yang sama ditulis berdampingan." : "Mulai dari bilangan paling besar, lalu turun sampai paling kecil. Bilangan yang sama ditulis berdampingan.",
    },
    {
      stasiun: "ujung",
      tanya: `Data: ${k.data.join(", ")}. Data terkecil dan data terbesar adalah…`,
      opsi: susunOpsi(teksUjung(kecil, besar), [teksUjung(awal, akhir), teksUjung(besar, kecil)], idx + 1),
      benar: teksUjung(kecil, besar),
      petunjuk: `Data pertama dan terakhir belum tentu terkecil dan terbesar. Lihat data yang sudah diurutkan: ${asc.join(", ")}.`,
    },
    {
      stasiun: "jangkauan",
      tanya: `Data terkecil ${kecil} dan data terbesar ${besar}. Jangkauannya adalah…`,
      opsi: susunOpsi(`${besar} − ${kecil} = ${besar - kecil}`, [`${besar} + ${kecil} = ${besar + kecil}`, `${besar} − ${awal} = ${besar - awal}`], idx + 2),
      benar: `${besar} − ${kecil} = ${besar - kecil}`,
      petunjuk: "Jangkauan adalah selisih data terbesar dan data terkecil. Kurangkan, jangan dijumlahkan, dan pakai data terkecil, bukan data pertama.",
    },
    {
      stasiun: "banyak",
      tanya: `Data: ${k.data.join(", ")}. ${k.tanyaBanyak}`,
      opsi: susunOpsi(String(f), [String(f + 1), String(k.data.length)], idx),
      benar: String(f),
      petunjuk: `Cacah hanya bilangan ${k.nilai}, satu garis turus untuk tiap ${k.nilai}. Ada ${k.data.length} data seluruhnya, tetapi tidak semuanya ${k.nilai}.`,
    },
  ];
  return {
    id: k.id,
    nama: k.nama,
    ringkas: `Urutan ${asc.join(", ")}: terkecil ${kecil}, terbesar ${besar}, jangkauan ${besar} − ${kecil} = ${besar - kecil}, dan ${k.nilai} muncul ${f} kali.`,
    langkah,
  };
}

export const MESIN_URUT: DefMesin = {
  id: "mesin-urut-k3b5",
  judul: "Mesin Urut",
  selesaiId: "mesin-urut",
  stasiun: STASIUN_URUT,
  kasus: KASUS_URUT.map(kasusMesinUrut),
};

/* ------------------------------ Sub-Bab B: Mesin Tabel ------------------------------ */

export type KasusTabelMesin = {
  id: string;
  nama: string;
  /** Asal data dalam kalimat, mis. "deretan manik". */
  asal: string;
  /** "manik", "huruf", atau "siswa". */
  satuan: string;
  /** Label kategori tiap data (warna, huruf, atau nilai). */
  item: string[];
  angka: boolean;
  /** Kategori yang ditanya di stasiun Banyak. */
  kat: string;
  baca: "terbanyak" | "tersedikit";
  banding: { jenis: "selisih"; a: string; b: string } | { jenis: "lebih"; acuan: number };
};

const DATA_ULANGAN = [9, 9, 7, 8, 6, 10, 5, 9, 8, 7, 7, 9, 6, 6, 6, 8, 9, 10, 7, 7];

export const KASUS_TABEL: KasusTabelMesin[] = [
  { id: "manik", nama: "Manik berwarna", asal: "deretan manik", satuan: "manik", item: [..."mbmhmbmhbmmhb"].map((c) => ({ m: "merah", b: "biru", h: "hitam" })[c] as string), angka: false, kat: "biru", baca: "terbanyak", banding: { jenis: "selisih", a: "merah", b: "hitam" } },
  { id: "statistika", nama: "Huruf STATISTIKA", asal: "kata STATISTIKA", satuan: "huruf", item: [..."STATISTIKA"], angka: false, kat: "S", baca: "terbanyak", banding: { jenis: "selisih", a: "T", b: "K" } },
  { id: "nilai", nama: "Nilai ulangan", asal: "data nilai ulangan", satuan: "siswa", item: DATA_ULANGAN.map(String), angka: true, kat: "8", baca: "tersedikit", banding: { jenis: "lebih", acuan: 7 } },
];

export const STASIUN_TABEL: StasiunDef[] = [
  { id: "turus", nama: "Turus", ikon: "✋" },
  { id: "banyak", nama: "Banyak", ikon: "🔢" },
  { id: "baca", nama: "Baca", ikon: "👀" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
];

export function turusMesin(n: number): string {
  const penuh = Math.floor(n / 5);
  const sisa = n % 5;
  return [...Array.from({ length: penuh }, () => "卌"), ...(sisa > 0 ? ["|".repeat(sisa)] : [])].join(" ");
}

/** Baris kategori: urutan muncul; nilai diurutkan dari terkecil. */
export const barisMesin = (k: KasusTabelMesin): string[] => {
  const beda = [...new Set(k.item)];
  return k.angka ? beda.sort((p, q) => Number(p) - Number(q)) : beda;
};

/** Nama kategori dalam kalimat: "manik merah", "huruf T", "nilai 8". */
export const namaKat = (k: KasusTabelMesin, kat: string): string => (k.angka ? `nilai ${kat}` : k.satuan === "huruf" ? `huruf ${kat}` : `manik ${kat}`);

export function kasusMesinTabel(k: KasusTabelMesin, idx: number): KasusMesin {
  const total = k.item.length;
  const penuh = Math.floor(total / 5);
  const sisa = total % 5;
  const baris = barisMesin(k);
  const f = baris.map((b) => banyak(k.item, b));
  const fKat = banyak(k.item, k.kat);
  const ekstrem = k.baca === "terbanyak" ? Math.max(...f) : Math.min(...f);
  const lawan = k.baca === "terbanyak" ? Math.min(...f) : Math.max(...f);
  const kunci = baris[f.indexOf(ekstrem)];
  const kLawan = baris[f.indexOf(lawan)];
  const kLain = baris.find((b) => b !== kunci && b !== kLawan) as string;

  let banding: LangkahMesin;
  if (k.banding.jenis === "selisih") {
    const fa = banyak(k.item, k.banding.a);
    const fb = banyak(k.item, k.banding.b);
    banding = {
      stasiun: "banding",
      tanya: `Berapa lebih banyak ${namaKat(k, k.banding.a)} daripada ${namaKat(k, k.banding.b)}?`,
      opsi: susunOpsi(String(fa - fb), [String(fa + fb), String(fa)], idx + 3),
      benar: String(fa - fb),
      petunjuk: `Baca kolom banyak: ${namaKat(k, k.banding.a)} ${fa} dan ${namaKat(k, k.banding.b)} ${fb}. Selisihnya ${fa} − ${fb}, bukan dijumlahkan.`,
    };
  } else {
    const acuan = k.banding.acuan;
    const lebih = baris.filter((b) => Number(b) > acuan);
    const sLebih = lebih.reduce((s, b) => s + banyak(k.item, b), 0);
    const sTermasuk = baris.filter((b) => Number(b) >= acuan).reduce((s, b) => s + banyak(k.item, b), 0);
    banding = {
      stasiun: "banding",
      tanya: `Berapa siswa bernilai lebih dari ${acuan}?`,
      opsi: susunOpsi(String(sLebih), [String(sTermasuk), String(lebih.length)], idx + 3),
      benar: String(sLebih),
      petunjuk: `Lebih dari ${acuan} berarti nilai ${lebih.join(", ")}. Jumlahkan kolom banyaknya. Nilai ${acuan} sendiri tidak ikut.`,
    };
  }

  const langkah: LangkahMesin[] = [
    {
      stasiun: "turus",
      tanya: `Semua ${k.satuan} pada ${k.asal} dicacah. Turusnya ${turusMesin(total)}. Banyaknya…`,
      opsi: susunOpsi(String(total), [String(penuh * 4 + sisa), String(penuh + sisa)], idx),
      benar: String(total),
      petunjuk: `Satu kelompok lima berisi empat garis tegak dan satu garis miring, jadi nilainya 5. Hitung ${penuh} kelompok lima, lalu tambah ${sisa} garis.`,
    },
    {
      stasiun: "banyak",
      tanya: k.angka ? `Berapa siswa bernilai ${k.kat}?` : k.satuan === "huruf" ? `Huruf ${k.kat} muncul berapa kali?` : `Ada berapa manik ${k.kat}?`,
      opsi: susunOpsi(String(fKat), [String(fKat + 1), String(total)], idx + 1),
      benar: String(fKat),
      petunjuk: `Cacah hanya ${namaKat(k, k.kat)}, satu garis tiap kali muncul. ${total} adalah banyak semua data, bukan banyak ${namaKat(k, k.kat)}.`,
    },
    {
      stasiun: "baca",
      tanya: `Lihat kolom banyak. Yang ${k.baca === "terbanyak" ? "paling banyak" : "paling sedikit"} adalah…`,
      opsi: susunOpsi(namaKat(k, kunci), [namaKat(k, kLawan), namaKat(k, kLain)], idx + 2),
      benar: namaKat(k, kunci),
      petunjuk: k.baca === "terbanyak" ? "Cari angka paling besar di kolom banyak, lalu lihat kategori di barisnya." : "Cari angka paling kecil di kolom banyak, lalu lihat kategori di barisnya.",
    },
    banding,
  ];
  return {
    id: k.id,
    nama: k.nama,
    ringkas: `Tabel ${k.asal}: ${baris.map((b, i) => `${b} ${f[i]}`).join(", ")}. Jumlahnya ${total}.`,
    langkah,
  };
}

export const MESIN_TABEL: DefMesin = {
  id: "mesin-tabel-k3b5",
  judul: "Mesin Tabel",
  selesaiId: "mesin-tabel",
  stasiun: STASIUN_TABEL,
  kasus: KASUS_TABEL.map(kasusMesinTabel),
};

export const SEMUA_MESIN_K3B5: DefMesin[] = [MESIN_URUT, MESIN_TABEL];
