/**
 * Definisi Mesin Bertahap Kelas 4 Bab 1 untuk operasi hitung (Sub-Bab E dan F), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari soal bersusun.
 *  - MESIN_JUMLAH (E): Satuan → Simpan → Ratusan → Hasil   (131 + 321, 189 + 245, 328 + 579)
 *  - MESIN_KURANG (F): Satuan → Puluhan → Ratusan → Periksa (265 − 132, 241 − 129, 253 − 176)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k4b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const dg = (n: number, c: number): number => Math.floor(n / 10 ** c) % 10;
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0 && v !== benar).map(String));

/* ------------------------------ E: Mesin Jumlah ------------------------------ */

export type KasusJumlah = { id: string; suku: number[] };
export const KASUS_JUMLAH: KasusJumlah[] = [
  { id: "131+321", suku: [131, 321] },
  { id: "189+245", suku: [189, 245] },
  { id: "328+579", suku: [328, 579] },
];

export const STASIUN_JUMLAH: StasiunDef[] = [
  { id: "satuan", nama: "Satuan", ikon: "🔴" },
  { id: "simpan", nama: "Puluhan", ikon: "🔵" },
  { id: "ratusan", nama: "Ratusan", ikon: "🟢" },
  { id: "hasil", nama: "Hasil", ikon: "✅" },
];

/** Kolom bersusun penjumlahan: angka, simpanan masuk, jumlah, angka tulis, simpanan keluar. */
export function kolomJumlah(suku: readonly number[]) {
  const out: { angka: number[]; masuk: number; jumlah: number; tulis: number; keluar: number }[] = [];
  let masuk = 0;
  for (let c = 0; c < 3; c += 1) {
    const angka = suku.map((n) => dg(n, c));
    const jumlah = angka.reduce((a, b) => a + b, 0) + masuk;
    out.push({ angka, masuk, jumlah, tulis: jumlah % 10, keluar: Math.floor(jumlah / 10) });
    masuk = Math.floor(jumlah / 10);
  }
  return out;
}
/** Hasil bila simpanan dilupakan: tiap kolom ditulis satuannya saja, tanpa simpanan. */
export const jumlahLupaSimpan = (suku: readonly number[]): number => [0, 1, 2].reduce((s, c) => s + (suku.reduce((a, n) => a + dg(n, c), 0) % 10) * 10 ** c, 0);

const teksTulis = (tulis: number, keluar: number): string => (keluar ? `tulis ${tulis}, simpan ${keluar}` : `tulis ${tulis}, tidak menyimpan`);

export function kasusMesinJumlah(k: KasusJumlah, idx: number): KasusMesin {
  const [s, p, r] = kolomJumlah(k.suku);
  const total = k.suku.reduce((a, b) => a + b, 0);
  const benarS = teksTulis(s.tulis, s.keluar);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "satuan",
      tanya: `Kolom satuan: ${s.angka.join(" + ")} = ${s.jumlah}. Yang dilakukan…`,
      opsi: susunOpsi(benarS, duaPengecoh(benarS, s.keluar ? [`tulis ${s.jumlah}, tidak menyimpan`, teksTulis(s.tulis, 0)] : [teksTulis(s.tulis, 1), teksTulis((s.tulis + 1) % 10, 0)]), idx),
      benar: benarS,
      petunjuk: "Bila jumlah satu kolom sepuluh atau lebih, tulis satuannya dan simpan 1 ke kolom di kirinya. Bila kurang dari sepuluh, tulis saja.",
    },
    {
      stasiun: "simpan",
      tanya: `Kolom puluhan: ${p.angka.join(" + ")}${p.masuk ? ` + simpanan ${p.masuk}` : ""} = …`,
      opsi: susunOpsi(String(p.jumlah), angkaPengecoh(p.jumlah, [p.jumlah - p.masuk, p.jumlah + 1, p.jumlah - 1, p.jumlah + 10]), idx + 1),
      benar: String(p.jumlah),
      petunjuk: p.masuk ? "Jangan lupa simpanan dari kolom satuan ikut dijumlahkan." : "Kolom satuan tidak menyimpan, jadi jumlahkan angka puluhannya saja.",
    },
    {
      stasiun: "ratusan",
      tanya: `Kolom ratusan: ${r.angka.join(" + ")}${r.masuk ? ` + simpanan ${r.masuk}` : ""}. Angka yang ditulis di ratusan…`,
      opsi: susunOpsi(String(r.tulis), angkaPengecoh(r.tulis, [r.tulis - r.masuk, (r.tulis + 1) % 10, (r.tulis + 9) % 10]), idx + 2),
      benar: String(r.tulis),
      petunjuk: "Jumlahkan angka ratusan dan simpanan dari kolom puluhan.",
    },
    {
      stasiun: "hasil",
      tanya: `Jadi ${k.suku.join(" + ")} = …`,
      opsi: susunOpsi(String(total), angkaPengecoh(total, [jumlahLupaSimpan(k.suku), total + 10, total + 100, total - 10]), idx),
      benar: String(total),
      petunjuk: "Gabungkan angka yang ditulis di ratusan, puluhan, dan satuan. Periksa lagi simpanannya.",
    },
  ];
  return { id: k.id, nama: k.suku.join(" + "), ringkas: `${k.suku.join(" + ")} = ${total}${s.keluar || p.keluar ? ", dengan menyimpan" : ", tanpa menyimpan"}.`, langkah };
}

export const MESIN_JUMLAH: DefMesin = { id: "mesin-jumlah-k4b1", judul: "Mesin Jumlah", selesaiId: "mesin-jumlah", stasiun: STASIUN_JUMLAH, kasus: KASUS_JUMLAH.map(kasusMesinJumlah) };

/* ------------------------------ F: Mesin Kurang ------------------------------ */

export type KasusKurang = { id: string; a: number; b: number };
export const KASUS_KURANG: KasusKurang[] = [
  { id: "265-132", a: 265, b: 132 },
  { id: "241-129", a: 241, b: 129 },
  { id: "253-176", a: 253, b: 176 },
];

export const STASIUN_KURANG: StasiunDef[] = [
  { id: "satuan", nama: "Satuan", ikon: "🔴" },
  { id: "puluhan", nama: "Puluhan", ikon: "🔵" },
  { id: "ratusan", nama: "Ratusan", ikon: "🟢" },
  { id: "periksa", nama: "Periksa", ikon: "🔍" },
];

/** Kolom bersusun pengurangan: angka atas (setelah dipinjam), apakah mengambil, dan hasil kolom. */
export function kolomKurang(a: number, b: number) {
  const out: { atasAsli: number; atas: number; bawah: number; dipinjam: boolean; ambil: boolean; hasil: number }[] = [];
  let pinjam = 0;
  for (let c = 0; c < 3; c += 1) {
    const atasAsli = dg(a, c);
    const atas0 = atasAsli - pinjam;
    const bawah = dg(b, c);
    const ambil = atas0 < bawah;
    out.push({ atasAsli, atas: ambil ? atas0 + 10 : atas0, bawah, dipinjam: pinjam === 1, ambil, hasil: (ambil ? atas0 + 10 : atas0) - bawah });
    pinjam = ambil ? 1 : 0;
  }
  return out;
}

export function kasusMesinKurang(k: KasusKurang, idx: number): KasusMesin {
  const [s, p, r] = kolomKurang(k.a, k.b);
  const hasil = k.a - k.b;
  const benarS = s.ambil ? `ambil 1 puluhan, ${s.atas} − ${s.bawah} = ${s.hasil}` : `${s.atasAsli} − ${s.bawah} = ${s.hasil}`;
  const salahS = s.ambil ? [`dibalik ${s.bawah} − ${s.atasAsli} = ${s.bawah - s.atasAsli}`, `${s.atasAsli} − ${s.bawah}, tulis 0`] : [`ambil 1 puluhan, ${s.atasAsli + 10} − ${s.bawah} = ${s.atasAsli + 10 - s.bawah}`, `${s.atasAsli} − ${s.bawah} = ${s.hasil + 1}`];
  const tanyaP = `Kolom puluhan: angka atas ${p.atasAsli}${p.dipinjam ? `, sudah diambil 1 jadi ${p.atasAsli - 1}` : ""}. Dikurangi ${p.bawah}${p.ambil ? ", perlu mengambil dari ratusan" : ""}. Hasilnya…`;
  const tanyaR = `Kolom ratusan: angka atas ${r.atasAsli}${r.dipinjam ? `, sudah diambil 1 jadi ${r.atasAsli - 1}` : ""}. Dikurangi ${r.bawah}. Hasilnya…`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "satuan",
      tanya: `Kolom satuan: ${s.atasAsli} − ${s.bawah}. Langkahnya…`,
      opsi: susunOpsi(benarS, duaPengecoh(benarS, salahS), idx),
      benar: benarS,
      petunjuk: s.ambil ? `${s.atasAsli} kurang dari ${s.bawah}. Jangan dibalik. Ambil 1 puluhan menjadi 10 satuan.` : `${s.atasAsli} cukup untuk dikurangi ${s.bawah}, jadi tidak perlu mengambil.`,
    },
    {
      stasiun: "puluhan",
      tanya: tanyaP,
      opsi: susunOpsi(String(p.hasil), angkaPengecoh(p.hasil, [p.hasil + (p.dipinjam ? 1 : 0), Math.abs(p.atasAsli - p.bawah), p.hasil + 1, p.hasil - 1]), idx + 1),
      benar: String(p.hasil),
      petunjuk: p.dipinjam ? "Puluhan sudah diambil 1 untuk satuan, jadi angka atasnya berkurang satu." : "Kurangkan angka puluhan atas dengan angka puluhan bawah.",
    },
    {
      stasiun: "ratusan",
      tanya: tanyaR,
      opsi: susunOpsi(String(r.hasil), angkaPengecoh(r.hasil, [r.hasil + (r.dipinjam ? 1 : 0), r.hasil + 1, r.hasil + 2]), idx + 2),
      benar: String(r.hasil),
      petunjuk: r.dipinjam ? "Ratusan sudah diambil 1 untuk puluhan, jadi angka atasnya berkurang satu." : "Kurangkan angka ratusan atas dengan angka ratusan bawah.",
    },
    {
      stasiun: "periksa",
      tanya: `Hasilnya ${hasil}. Periksa: ${hasil} + ${k.b} = …`,
      opsi: susunOpsi(String(k.a), angkaPengecoh(k.a, [k.a + 10, k.a - 10, k.a + 100]), idx),
      benar: String(k.a),
      petunjuk: "Hasil ditambah bilangan pengurang harus kembali ke bilangan awal.",
    },
  ];
  return { id: k.id, nama: `${k.a} − ${k.b}`, ringkas: `${k.a} − ${k.b} = ${hasil}. Periksa: ${hasil} + ${k.b} = ${k.a}.`, langkah };
}

export const MESIN_KURANG: DefMesin = { id: "mesin-kurang-k4b1", judul: "Mesin Kurang", selesaiId: "mesin-kurang", stasiun: STASIUN_KURANG, kasus: KASUS_KURANG.map(kasusMesinKurang) };

export const SEMUA_MESIN_K4B1_HITUNG: DefMesin[] = [MESIN_JUMLAH, MESIN_KURANG];
