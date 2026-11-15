import type { Aksi, KetukanStory, Obj } from "./logika-story";
import { teks, W } from "./k1b5c-gambar";

/** Penyingkat penulisan naskah Story Sub-Bab C Bab 5 Nilai Tempat Puluhan dan Satuan Kelas 1 (khusus sub-bab ini). */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Nomor kata (mulai 0) ke-`n` yang persis sama dengan `kata`. Galat bila tidak ada, supaya salah ketik pemicu ketahuan. */
export const idx = (suara: string, kata: string, n = 1): number => {
  const kata2 = suara.split(/\s+/).filter(Boolean);
  let c = 0;
  for (let i = 0; i < kata2.length; i += 1) {
    if (norm(kata2[i]) === norm(kata)) {
      c += 1;
      if (c === n) return i;
    }
  }
  throw new Error(`pemicu "${kata}" ke-${n} tidak ada dalam: ${suara}`);
};

/** Nomor kata untuk deretan kata berurutan, dicari mulai setelah kata `setelah` (kemunculan pertama) bila diberikan. */
export const urutKata = (suara: string, daftar: string[], setelah?: string): number[] => {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let dari = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && dari === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  return daftar.map((d) => {
    const p = kata2.indexOf(norm(d), dari);
    if (p < 0) throw new Error(`kata "${d}" tidak ada setelah nomor ${dari} dalam: ${suara}`);
    dari = p + 1;
    return p;
  });
};

/** Nama bilangan 0 sampai 20 dalam kata (tanpa digit), sebagaimana diucapkan guru. */
export const NAMA_BIL = [
  "nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh",
  "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh",
];

/** Kata terakhir pada nama bilangan `n`: kata yang menandai bilangan itu selesai diucapkan. */
export const kataAkhirBil = (n: number): string => NAMA_BIL[n].split(" ").pop() as string;

/**
 * Nomor kata terakhir tiap sebutan bilangan `dari` sampai `sampai` yang diucapkan berurutan (mis. "dua belas": nomor kata "belas"),
 * dicari setelah kata `setelah` (kemunculan pertama) bila diberikan.
 */
export function urutBilangan(suara: string, dari: number, sampai: number, setelah?: string): number[] {
  const kata2 = suara.split(/\s+/).filter(Boolean).map(norm);
  let kursor = setelah ? kata2.indexOf(norm(setelah)) + 1 : 0;
  if (setelah && kursor === 0) throw new Error(`kata "${setelah}" tidak ada dalam: ${suara}`);
  const hasil: number[] = [];
  for (let n = dari; n <= sampai; n += 1) {
    const frasa = NAMA_BIL[n].split(" ");
    let ketemu = -1;
    for (let p = kursor; p + frasa.length <= kata2.length; p += 1) {
      if (frasa.every((f, q) => kata2[p + q] === f)) {
        ketemu = p;
        break;
      }
    }
    if (ketemu < 0) throw new Error(`bilangan "${NAMA_BIL[n]}" tidak ada setelah nomor ${kursor} dalam: ${suara}`);
    hasil.push(ketemu + frasa.length - 1);
    kursor = ketemu + frasa.length;
  }
  return hasil;
}

/**
 * Menghitung benda satu demi satu: saat bilangan ke-i diucapkan (mulai dari `mulai`), benda `ids[i]` menyala (yang sebelumnya padam)
 * dan penghitung `idC` (di (x, y)) berubah menjadi "`label`: bilangan". `buat` = false bila penghitung sudah ada.
 */
export function hitungSatu(suara: string, ids: string[], label: string, idC: string, x: number, y: number, setelah?: string, mulai = 1, buat = true, warna: string = W.merah, u = 14): Aksi[] {
  const pos = urutBilangan(suara, mulai, mulai + ids.length - 1, setelah);
  return ids.flatMap((id, i) => [
    ...(i === 0 && buat ? [tambah(pos[0], teks(idC, x, y, `${label}: ${mulai}`, u, warna))] : [ubah(pos[i], { id: idC, isi: `${label}: ${mulai + i}` })]),
    ...(i > 0 ? [redamkan(pos[i], ids[i - 1])] : []),
    sorotkan(pos[i], id),
  ]);
}

/** Benda `ids[i]` berpindah ke `tujuan(i)` saat bilangan ke-i (mulai dari `mulai`) diucapkan. */
export function pindahBilangan(suara: string, ids: string[], tujuan: (i: number) => { x: number; y: number }, mulai = 1, setelah?: string): Aksi[] {
  const pos = urutBilangan(suara, mulai, mulai + ids.length - 1, setelah);
  return ids.map((id, i) => ubah(pos[i], { id, ...tujuan(i) }));
}

/** Benda `objs[i]` muncul saat bilangan ke-i (mulai dari `mulai`) diucapkan. */
export function munculBilangan(suara: string, objs: Obj[], mulai = 1, setelah?: string): Aksi[] {
  const pos = urutBilangan(suara, mulai, mulai + objs.length - 1, setelah);
  return objs.map((o, i) => tambah(pos[i], o));
}

/** Kalimat hitungan tersusun potongan demi potongan di tengah pada tinggi `y`; potongan ke-i (id `${id}${i}`) muncul saat kata `kata[i]` diucapkan (dicari setelah kata `setelah`). */
export function rangkai(suara: string, id: string, y: number, bagian: string[], kata: string[], setelah?: string, u = 22, jarak = 28): Aksi[] {
  const pos = urutKata(suara, kata, setelah);
  return bagian.map((b, i) => tambah(pos[i], teks(`${id}${i}`, 150 + (i - (bagian.length - 1) / 2) * jarak, y, b, u, b === "+" || b === "=" ? W.biru : W.merah)));
}

/** Kalimat tambah `a + b = hasil` (bilangan sampai dua puluh) yang tersusun mengikuti ucapan "a ditambah b sama dengan hasil". Id `${id}0` sampai `${id}4`. */
export function rumus(suara: string, id: string, y: number, a: number, b: number, setelah?: string, u = 20): Aksi[] {
  return rangkai(suara, id, y, [String(a), "+", String(b), "=", String(a + b)], [NAMA_BIL[a], "ditambah", NAMA_BIL[b], "sama", kataAkhirBil(a + b)], setelah, u);
}
