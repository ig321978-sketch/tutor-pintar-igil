/**
 * Definisi Mesin Bertahap Kelas 6 Bab 2 Sub-Bab C (Penerapan Rasio), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK6B2.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_BAGIAN (C): Jumlah → Satu bagian → Bagian → Waktu   (kasus Penjualan Bibit, Pasar Malam, Karangan Bunga)
 *    Jumlah      : jumlah suku rasio menjadi banyak bagian seluruhnya.
 *    Satu bagian : seluruhnya dibagi banyak bagian.
 *    Bagian      : nilai benda pertama (satu bagian dikali suku pertama).
 *    Waktu       : laju per jam, menit untuk target, atau hasil dalam durasi menit (satuan waktu disamakan dulu).
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas VI Bab 2 Sub-Bab C (bibit hias dan obat, pasar malam, lari dan mengetik).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

export type KasusBagian = {
  id: string;
  nama: string;
  konteks: string;
  /** Rasio ka : kb = a : b dengan jumlah seluruhnya total. */
  ka: string;
  kb: string;
  a: number;
  b: number;
  total: number;
  /** Waktu: wa satuan dalam wm menit. jenis: laju per jam, menit untuk target, atau hasil dalam durasi menit. */
  jenis: "laju" | "target" | "durasi";
  wa: number;
  wm: number;
  satuan: string;
  nilai: number;
};

export const KASUS_BAGIAN: KasusBagian[] = [
  { id: "bibit", nama: "Penjualan Bibit", konteks: "Artus menjual bibit", ka: "bibit hias", kb: "bibit obat", a: 4, b: 5, total: 72, jenis: "laju", wa: 1, wm: 30, satuan: "km", nilai: 0 },
  { id: "pasar", nama: "Pasar Malam", konteks: "Pasar malam dikunjungi banyak orang", ka: "anak-anak", kb: "orang dewasa", a: 9, b: 4, total: 390, jenis: "target", wa: 1, wm: 30, satuan: "km", nilai: 9 },
  { id: "bunga", nama: "Karangan Bunga", konteks: "Ibu merangkai karangan bunga", ka: "bunga merah", kb: "bunga putih", a: 3, b: 7, total: 60, jenis: "durasi", wa: 1200, wm: 60, satuan: "kata", nilai: 180 },
];

export const STASIUN_BAGIAN: StasiunDef[] = [
  { id: "jumlah", nama: "Jumlah", ikon: "➕" },
  { id: "satu", nama: "Satu bagian", ikon: "1️⃣" },
  { id: "bagian", nama: "Bagian", ikon: "🧩" },
  { id: "waktu", nama: "Waktu", ikon: "⏱️" },
];

export function kasusMesinBagian(c: KasusBagian, idx: number): KasusMesin {
  const jml = c.a + c.b;
  const u = c.total / jml;
  let tanyaW = "";
  let kunciW = "";
  let salahW: string[] = [];
  let petW = "";
  let ringW = "";
  if (c.jenis === "laju") {
    const r = (c.wa * 60) / c.wm;
    tanyaW = `${c.wa} ${c.satuan} ditempuh dalam ${c.wm} menit. Samakan satuan waktu: dalam 1 jam, atau 60 menit, ditempuh … ${c.satuan}`;
    kunciW = String(r);
    salahW = [String(c.wa), String(c.wm)];
    petW = "Satu jam sama dengan enam puluh menit. Kalikan jarak dengan pengali yang sama seperti waktunya.";
    ringW = `${c.wa} ${c.satuan} per ${c.wm} menit menjadi ${r} ${c.satuan} per jam`;
  } else if (c.jenis === "target") {
    const mn = (c.nilai * c.wm) / c.wa;
    tanyaW = `${c.wa} ${c.satuan} ditempuh dalam ${c.wm} menit. Untuk ${c.nilai} ${c.satuan} dibutuhkan … menit`;
    kunciW = String(mn);
    salahW = [String(c.nilai), String(c.wm)];
    petW = "Kedua suku rasio dikali bilangan yang sama. Jarak menjadi sekian kali, waktunya juga sekian kali.";
    ringW = `${c.nilai} ${c.satuan} butuh ${mn} menit`;
  } else {
    const h = (c.wa * c.nilai) / c.wm;
    tanyaW = `${c.wa} ${c.satuan} dihasilkan dalam ${c.wm} menit. Dalam ${c.nilai} menit dihasilkan … ${c.satuan}`;
    kunciW = String(h);
    salahW = [String(c.wa), String(c.nilai)];
    petW = "Hitung berapa kali durasinya dibanding waktu dasar, lalu kalikan hasilnya dengan jumlah yang sama.";
    ringW = `${c.nilai} menit menghasilkan ${h} ${c.satuan}`;
  }
  const langkah: LangkahMesin[] = [
    {
      stasiun: "jumlah",
      tanya: `${c.konteks}: ${c.ka} terhadap ${c.kb} adalah ${c.a} : ${c.b}, jumlah seluruhnya ${c.total}. Banyak bagian seluruhnya adalah …`,
      opsi: susunOpsi(String(jml), [String(c.a * c.b), String(c.a)], idx),
      benar: String(jml),
      petunjuk: "Jumlahkan kedua suku rasio untuk mendapat banyak bagian seluruhnya.",
    },
    {
      stasiun: "satu",
      tanya: `Seluruhnya ${c.total} dibagi sama rata menjadi ${jml} bagian. Nilai satu bagian adalah …`,
      opsi: susunOpsi(String(u), [String(c.total), String(u * 2)], idx + 1),
      benar: String(u),
      petunjuk: `Bagi ${c.total} dengan banyak bagian seluruhnya.`,
    },
    {
      stasiun: "bagian",
      tanya: `Satu bagian bernilai ${u}, dan ${c.ka} mendapat ${c.a} bagian. Banyak ${c.ka} adalah …`,
      opsi: susunOpsi(String(u * c.a), [String(u + c.a), String(u * c.b)], idx + 2),
      benar: String(u * c.a),
      petunjuk: `Kalikan nilai satu bagian dengan ${c.a}, yaitu suku untuk ${c.ka}.`,
    },
    {
      stasiun: "waktu",
      tanya: tanyaW,
      opsi: susunOpsi(kunciW, salahW, idx + 3),
      benar: kunciW,
      petunjuk: petW,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.a} : ${c.b} berarti ${jml} bagian. ${c.total} ÷ ${jml} = ${u} per bagian, jadi ${c.ka} ${u * c.a} dan ${c.kb} ${u * c.b}. ${ringW}.`,
    langkah,
  };
}

export const MESIN_BAGIAN: DefMesin = {
  id: "mesin-bagian-k6b2",
  judul: "Mesin Bagian",
  selesaiId: "mesin-bagian",
  stasiun: STASIUN_BAGIAN,
  kasus: KASUS_BAGIAN.map(kasusMesinBagian),
};
