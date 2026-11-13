/**
 * Definisi Mesin Bertahap Kelas 6 Bab 1, Sub-Bab C (Bilangan Desimal), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK6B1.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus (desimal disimpan sebagai bilangan bulat dikali 100).
 *  - MESIN_DESIMAL (C): Ubah → Baca → Tempat → Banding   (kasus Timbangan, Lari, Lompat)
 *    Ubah    : pecahan diubah menjadi desimal lewat penyebut 10 atau 100.
 *    Baca    : bacaan desimal hasil ubah.
 *    Tempat  : tempat sebuah angka pada desimal lain.
 *    Banding : membandingkan dua desimal (termasuk yang sama besar).
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas VI Bab 1 Sub-Bab C (timbangan pasar, jarak lari, lompat jauh).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const SATU = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const kataBulat = (n: number): string => {
  if (n < 10) return SATU[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATU[n - 10]} belas`;
  return n % 10 === 0 ? `${SATU[(n - (n % 10)) / 10]} puluh` : `${SATU[(n - (n % 10)) / 10]} puluh ${SATU[n % 10]}`;
};
const eja1 = (t: string): string => t.split("").map((c) => SATU[Number(c)]).join(" ");
/** Tulisan desimal dari bilangan bulat dikali 100, tanpa nol di ujung. */
export const teksDesimal = (v: number): string => {
  const b = (v - (v % 100)) / 100;
  const f = v % 100;
  if (f === 0) return `${b}`;
  return f % 10 === 0 ? `${b},${(f - (f % 10)) / 10}` : `${b},${f < 10 ? `0${f}` : f}`;
};
export const bacaDesimal = (v: number): string => {
  const [b, f] = teksDesimal(v).split(",");
  return f === undefined ? kataBulat(Number(b)) : `${kataBulat(Number(b))} koma ${eja1(f)}`;
};
export const pengecohBaca = (v: number): string[] => {
  const [b, f] = teksDesimal(v).split(",");
  const sebagaiBilangan = `${kataBulat(Number(b))} koma ${kataBulat(Number(f))}`;
  const d1 = sebagaiBilangan !== bacaDesimal(v) ? sebagaiBilangan : `${kataBulat(Number(b))} ${eja1(f)}`;
  return [d1, `${eja1(f)} koma ${kataBulat(Number(b))}`];
};

export const NAMA_KOLOM_MESIN = ["satuan", "persepuluhan", "perseratusan"] as const;

export type KasusDesimal = {
  id: string;
  nama: string;
  konteks: string;
  satuan: string;
  /** Pecahan a/b, penyebut b membagi 100; t = 10 atau 100 adalah penyebut tujuan. */
  a: number;
  b: number;
  t: number;
  /** Dua tulisan desimal pengecoh untuk hasil pecahan. */
  salah: [string, string];
  /** Desimal untuk tempat (dikali 100), angka yang ditanyakan, dan kolomnya. */
  y: number;
  d: number;
  k: number;
  /** Dua desimal yang dibandingkan (dikali 100) dan tulisannya. */
  v1: number;
  v2: number;
  w1: string;
  w2: string;
};

export const KASUS_DESIMAL: KasusDesimal[] = [
  { id: "timbangan", nama: "Timbangan Pasar", konteks: "Timbangan pasar menimbang jeruk", satuan: "kilogram", a: 1, b: 2, t: 10, salah: ["0,05", "5,0"], y: 370, d: 7, k: 1, v1: 50, v2: 50, w1: "0,5", w2: "0,50" },
  { id: "lari", nama: "Jarak Lari", konteks: "Agam mencatat jarak larinya", satuan: "kilometer", a: 3, b: 5, t: 10, salah: ["0,06", "6,0"], y: 285, d: 5, k: 2, v1: 260, v2: 310, w1: "2,6", w2: "3,1" },
  { id: "lompat", nama: "Lompat Jauh", konteks: "Pak Guru mencatat lompat jauh", satuan: "meter", a: 1, b: 4, t: 100, salah: ["2,5", "0,025"], y: 405, d: 4, k: 0, v1: 450, v2: 405, w1: "4,5", w2: "4,05" },
];

export const STASIUN_DESIMAL: StasiunDef[] = [
  { id: "ubah", nama: "Ubah", ikon: "🔄" },
  { id: "baca", nama: "Baca", ikon: "📖" },
  { id: "tempat", nama: "Tempat", ikon: "🧮" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
];

export function kasusMesinDesimal(c: KasusDesimal, idx: number): KasusMesin {
  const p = c.t / c.b;
  const n = c.a * p;
  const x = n * (100 / c.t);
  const des = teksDesimal(x);
  const kolom = NAMA_KOLOM_MESIN[c.k];
  const lain = NAMA_KOLOM_MESIN.filter((_, k) => k !== c.k);
  const tulisY = teksDesimal(c.y);
  const kunciBanding = c.v1 === c.v2 ? "sama besar" : c.v1 > c.v2 ? `${c.w1} lebih besar` : `${c.w2} lebih besar`;
  const opsiBanding = [`${c.w1} lebih besar`, `${c.w2} lebih besar`, "sama besar"].filter((o) => o !== kunciBanding);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "ubah",
      tanya: `${c.konteks}: ${c.a}/${c.b} ${c.satuan}. Pecahan itu sama dengan … ${c.t === 10 ? "(lewat penyebut 10)" : "(lewat penyebut 100)"}`,
      opsi: susunOpsi(des, [...c.salah], idx),
      benar: des,
      petunjuk: c.t === 10 ? "Ubah penyebut menjadi 10 dengan mengalikan pembilang dan penyebut. Satu angka di belakang koma." : "Ubah penyebut menjadi 100 dengan mengalikan pembilang dan penyebut. Dua angka di belakang koma, nol di depan bila perlu.",
    },
    {
      stasiun: "baca",
      tanya: `${c.a}/${c.b} = ${n}/${c.t}. Desimal ini dibaca …`,
      opsi: susunOpsi(bacaDesimal(x), pengecohBaca(x), idx + 1),
      benar: bacaDesimal(x),
      petunjuk: "Baca bagian bulat, ucapkan koma, lalu baca tiap angka di belakang koma satu per satu.",
    },
    {
      stasiun: "tempat",
      tanya: `Pada ${tulisY}, angka ${c.d} yang ditandai ada di tempat …`,
      opsi: susunOpsi(kolom, [...lain], idx + 2),
      benar: kolom,
      petunjuk: "Kiri koma adalah satuan, lalu ke kanan: persepuluhan, kemudian perseratusan.",
    },
    {
      stasiun: "banding",
      tanya: `${c.w1} dibandingkan dengan ${c.w2}. Pernyataan yang benar adalah …`,
      opsi: susunOpsi(kunciBanding, opsiBanding, idx + 3),
      benar: kunciBanding,
      petunjuk: "Samakan banyak angka di belakang koma, lalu bandingkan dari kiri: satuan, persepuluhan, perseratusan.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.a}/${c.b} = ${n}/${c.t} = ${des}, dibaca ${bacaDesimal(x)}. Pada ${tulisY}, angka ${c.d} ada di tempat ${kolom}. ${c.w1} dan ${c.w2}: ${kunciBanding}.`,
    langkah,
  };
}

export const MESIN_DESIMAL: DefMesin = {
  id: "mesin-desimal-k6b1",
  judul: "Mesin Desimal",
  selesaiId: "mesin-desimal",
  stasiun: STASIUN_DESIMAL,
  kasus: KASUS_DESIMAL.map(kasusMesinDesimal),
};
