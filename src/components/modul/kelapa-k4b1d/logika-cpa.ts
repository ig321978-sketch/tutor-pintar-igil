/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab D "Kios Kelapa Pak Darwis" (menyusun dan menguraikan bilangan empat angka dengan lebih dari satu cara):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kelapa-k4b1d.mjs.
 * Jawaban beragam: memilih uraian atau bilangan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (ribuan, ratusan, puluhan, satuan, sama, berbeda) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Pecah Bilangan, Susun Bilangan, Bagan Bagian Utuh", Break Apart (Pecah Bilangan), Build Up (Susun Bilangan), Part-Part-Whole (Bagan Bagian Utuh).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan dan penulisan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999.999 dalam kata (tanpa digit): seribu, dua ribu tiga ratus lima, sepuluh ribu. */
export function kataBil(n: number): string {
  if (n < 0 || n > 999999 || !Number.isInteger(n)) return String(n);
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  if (n < 1000) {
    const r = Math.floor(n / 100);
    const sisa = n % 100;
    const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
    return sisa === 0 ? ratus : `${ratus} ${kataBil(sisa)}`;
  }
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const ribu = rb === 1 ? "seribu" : `${kataBil(rb)} ribu`;
  return sisa === 0 ? ribu : `${ribu} ${kataBil(sisa)}`;
}
export const kata = kataBil;
/** Bilangan dengan titik ribuan: 4358 menjadi "4.358". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Ubah teks berangka menjadi ucapan tanpa digit: "6.000 + 300 + 4" menjadi "enam ribu ditambah tiga ratus ditambah empat". */
export function ucapkan(t: string): string {
  return t
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d{1,3}(?:\.\d{3})+|\d+/g, (d) => ` ${kataBil(Number(d.replace(/\./g, "")))} `)
    .replace(/\s+/g, " ")
    .trim();
}
export const ORDINAL = ["pertama", "kedua", "ketiga", "keempat", "kelima", "keenam"] as const;

/* ------------------------------ Tempat angka ------------------------------ */
export type Tempat = "ribuan" | "ratusan" | "puluhan" | "satuan";
export const URUT_TEMPAT: readonly Tempat[] = ["ribuan", "ratusan", "puluhan", "satuan"];
/** Harga satu angka di tiap tempat. */
export const HARGA: Record<Tempat, number> = { ribuan: 1000, ratusan: 100, puluhan: 10, satuan: 1 };
/** Angka bilangan `n` di tempat `t` (bilangan sampai 9.999). */
export const angkaDi = (n: number, t: Tempat): number => Math.floor(n / HARGA[t]) % 10;
/** Bagian bertempat dari ribuan ke satuan; tempat yang angkanya nol tidak ditulis: 4.607 menjadi 4.000, 600, 7. */
export const bagianTempat = (n: number): number[] => URUT_TEMPAT.map((t) => angkaDi(n, t) * HARGA[t]).filter((x) => x > 0);
export const teksUrai = (n: number): string => bagianTempat(n).map(rb).join(" + ");
/** Tempat yang angkanya nol, dari ribuan ke satuan. */
export const tempatNol = (n: number): Tempat[] => URUT_TEMPAT.filter((t) => angkaDi(n, t) === 0);
export const banyakNol = (n: number): number => tempatNol(n).length;
/** Bagian dua cara: satu bagian `a` (kelipatan seribu) dan bagian lainnya. */
export const teksDua = (n: number, a: number): string => `${rb(a)} + ${rb(n - a)}`;
/** Satuan kata untuk bagan: "ribu" atau "ratus". */
export const namaSatuan = (s: 1000 | 100): string => (s === 1000 ? "ribu" : "ratus");

/* ------------------------------ Jenis tugas ------------------------------ */
/** Break Apart: uraikan `n` menurut tempat angkanya. Kanvas: angka di `tempat`; suara: tempat dari angka itu. Angka di `tempat` selalu bukan nol dan berbeda dari angka lain pada `n`. */
export type LUrai = { tipe: "urai"; benda: string; n: number; tempat: Tempat };
/** Build Up: susun bagian-bagian bertempat menjadi `n`. Kanvas: banyak tempat yang diisi nol; suara: tempat yang diisi nol (tepat satu). */
export type LSusun = { tipe: "susun"; benda: string; n: number };
/** Part-Part-Whole: utuh = bagian + bagian lain. Klik: bagian lain; kanvas dan suara angka: banyak `satuan` pada bagian lain; suara kata: apakah bagian + klaim sama dengan utuh. */
export type LBagan = { tipe: "bagan"; benda: string; utuh: number; bagian: number; satuan: 1000 | 100; klaim?: number };
/** Lebih dari satu cara: `n` = `a` + bagian lain. Klik: pilih uraian dua bagian; kanvas: ribuan pada bagian lain; suara: apakah `a` + klaim sama dengan `n`. */
export type LLain = { tipe: "lain"; benda: string; n: number; a: number; klaim: number };
/** Pecahan uang Rp 100, 500, 1.000, dan 2.000 (lembar atau keping), dan banyak tiap pecahan pada satu uraian uang. */
export type Pecahan = 2000 | 1000 | 500 | 100;
export const URUT_PECAHAN: readonly Pecahan[] = [2000, 1000, 500, 100];
export type IsiUang = Record<Pecahan, number>;
/** Uang yang ada di kotak kios: tujuh lembar Rp 2.000, lima keping Rp 1.000, dua keping Rp 500, dan empat keping Rp 100. */
export const STOK_UANG: IsiUang = { 2000: 7, 1000: 5, 500: 2, 100: 4 };
export const jumlahUang = (u: IsiUang): number => URUT_PECAHAN.reduce((t, p) => t + u[p] * p, 0);
export const jenisUang = (p: Pecahan): string => (p === 2000 ? "lembar" : "keping");
/** Uraian uang dalam tulisan: "3 lembar 2.000 + 1 keping 1.000 + 3 keping 100" (pecahan yang banyaknya nol tidak ditulis; `tanya` ditulis "?"). */
export const teksUang = (u: IsiUang, tanya?: Pecahan): string =>
  URUT_PECAHAN.filter((p) => u[p] > 0 || p === tanya)
    .map((p) => `${p === tanya ? "?" : u[p]} ${jenisUang(p)} ${rb(p)}`)
    .join(" + ");
/** Uraian uang dalam kata tanpa digit: "tiga lembar uang dua ribu, satu keping uang seribu, dan tiga keping uang seratus". */
export function kataUang(u: IsiUang): string {
  const bagian = URUT_PECAHAN.filter((p) => u[p] > 0).map((p) => `${kataBil(u[p])} ${jenisUang(p)} uang ${kataBil(p)}`);
  return bagian.length < 2 ? bagian.join("") : `${bagian.slice(0, -1).join(", ")}, dan ${bagian[bagian.length - 1]}`;
}
/** Uang: uraikan `n` rupiah dengan pecahan uang yang ada. `isi` = satu uraian yang benar (jumlahnya `n`, tidak melebihi stok).
 * Klik: pilih uraian yang jumlahnya `n`; kanvas: banyak lembar atau keping pecahan `tanya` pada `isi`; suara: apakah uraian `klaim` jumlahnya `n`. */
export type LUang = { tipe: "uang"; benda: string; n: number; isi: IsiUang; tanya: Pecahan; klaim?: IsiUang };
export type LangkahDasar = LUrai | LSusun | LBagan | LLain | LUang;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LUrai | LSusun | LBagan | LLain;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pecah" | "susun" | "bagan";
export const URUT_METODE: Metode[] = ["igil", "pecah", "susun", "bagan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pecah Bilangan, Susun Bilangan, Bagan Bagian Utuh",
  pecah: "Break Apart: Pecah Bilangan",
  susun: "Build Up: Susun Bilangan",
  bagan: "Part-Part-Whole: Bagan Bagian Utuh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", pecah: "\u{1F528}", susun: "\u{1F9F1}", bagan: "\u{1F4CA}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", pecah: "Break Apart", susun: "Build Up", bagan: "Part-Part-Whole" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
export const sisaBagan = (l: LBagan): number => l.utuh - l.bagian;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "urai":
      return cara === "klik" ? nama(teksUrai(l.n)) : cara === "kanvas" ? angka(angkaDi(l.n, l.tempat)) : nama(l.tempat);
    case "susun":
      return cara === "klik" ? nama(rb(l.n)) : cara === "kanvas" ? angka(banyakNol(l.n)) : nama(tempatNol(l.n)[0]);
    case "bagan":
      if (cara === "klik") return nama(rb(sisaBagan(l)));
      if (cara === "kanvas" || l.klaim === undefined) return angka(sisaBagan(l) / l.satuan);
      return nama(l.bagian + l.klaim === l.utuh ? "sama" : "berbeda");
    case "lain":
      return cara === "klik" ? nama(teksDua(l.n, l.a)) : cara === "kanvas" ? angka(Math.floor((l.n - l.a) / 1000)) : nama(l.a + l.klaim === l.n ? "sama" : "berbeda");
    case "uang":
      if (cara === "klik") return nama(teksUang(l.isi));
      if (cara === "kanvas") return angka(l.isi[l.tanya]);
      return nama(jumlahUang(l.klaim ?? l.isi) === l.n ? "sama" : "berbeda");
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh bilangan satu angka (jawaban kanvas atau suara), antara satu dan sembilan. */
export function pengecohAngka(n: number): number[] {
  const hasil: number[] = [];
  for (const c of [n + 1, n - 1, n + 2, n - 2, n + 3, n - 3]) if (c >= 1 && c <= 9 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const unik = (a: string[]): string[] => a.filter((x, i) => a.indexOf(x) === i);

/** Uraian keliru yang lazim: satu angka ditulis di tempat yang salah (puluhan hilang, satuan terlalu besar). */
export function uraiKeliru(n: number): string[] {
  const bagian = bagianTempat(n);
  const benar = bagian.join(" + ");
  const hasil: string[] = [];
  bagian.forEach((_, i) => {
    const b = bagian.map((x, q) => (q === i ? (x >= 10 ? x / 10 : x * 10) : x));
    hasil.push(b.map(rb).join(" + "));
  });
  return unik(hasil).filter((s) => s !== benar);
}
/** Susunan keliru yang lazim: nol hilang, angka dirapatkan ke kiri, atau dua angka bertukar. */
export function susunKeliru(n: number): string[] {
  const s = String(n);
  const tanpaNol = s.replace(/0/g, "");
  const hasil: number[] = [];
  const rapat = Number(tanpaNol.padEnd(s.length, "0"));
  if (rapat !== n) hasil.push(rapat);
  if (tanpaNol.length < s.length) hasil.push(Number(tanpaNol));
  for (let i = 1; i + 1 < s.length; i += 1) {
    if (s[i] === s[i + 1]) continue;
    const t = s.split("");
    [t[i], t[i + 1]] = [t[i + 1], t[i]];
    const v = Number(t.join(""));
    if (v !== n && !hasil.includes(v)) hasil.push(v);
  }
  return unik(hasil.map(rb)).filter((x) => x !== rb(n));
}
/** Bagian lain yang keliru: bergeser seribu atau seratus. */
export function baganKeliru(l: LBagan): string[] {
  const sisa = sisaBagan(l);
  const calon = l.satuan === 1000 ? [sisa + 1000, sisa - 1000, sisa + 100, sisa - 100] : [sisa + 100, sisa - 100, sisa + 1000, sisa - 1000];
  return unik(calon.filter((c) => c >= 100 && c <= 9900 && c !== sisa).map(rb));
}
/** Uraian dua bagian yang keliru: jumlahnya tidak sama dengan bilangan. */
export function lainKeliru(l: LLain): string[] {
  const sisa = l.n - l.a;
  const calon = [`${rb(l.a)} + ${rb(sisa + 100)}`, `${rb(l.a)} + ${rb(sisa - 1000)}`, `${rb(l.a)} + ${rb(sisa + 1000)}`, `${rb(l.a + 1000)} + ${rb(sisa)}`];
  return unik(calon.filter((c) => !/-/.test(c) && c !== teksDua(l.n, l.a)));
}
/** Uraian uang yang keliru: satu pecahan bergeser satu lembar atau keping (tidak melebihi stok), jumlahnya tidak sama dengan `n`. Selalu dari pecahan terkecil ke terbesar supaya tetap. */
export function uangKeliru(l: LUang): string[] {
  const hasil: string[] = [];
  for (const p of [...URUT_PECAHAN].reverse())
    for (const d of [1, -1]) {
      const v = l.isi[p] + d;
      if (v < 0 || v > STOK_UANG[p]) continue;
      const u = { ...l.isi, [p]: v };
      if (jumlahUang(u) !== l.n) hasil.push(teksUang(u));
    }
  return unik(hasil).filter((x) => x !== teksUang(l.isi));
}
const kelirunya = (d: LangkahDasar): string[] => (d.tipe === "urai" ? uraiKeliru(d.n) : d.tipe === "susun" ? susunKeliru(d.n) : d.tipe === "bagan" ? baganKeliru(d) : d.tipe === "uang" ? uangKeliru(d) : lainKeliru(d));
const benihDasar = (d: LangkahDasar): number => (d.tipe === "bagan" ? d.utuh + d.bagian : d.n);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh yang keliru (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const awal = l.tipe === "salah" && !l.betul ? [l.jawabTokoh] : [];
  const kandidat = kelirunya(d).filter((x) => x !== k.nama);
  const geser = benihDasar(d) % Math.max(1, kandidat.length);
  const putar = [...kandidat.slice(geser), ...kandidat.slice(0, geser)];
  const lain = unik([...awal, ...putar]).slice(0, 2);
  return sisipkan(k.nama, lain, benihDasar(d));
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") return sisipkan(kataBil(k.n), pengecohAngka(k.n).slice(0, 2).map(kataBil), k.n);
  if (k.nama === "sama" || k.nama === "berbeda") return [k.nama === "sama" ? "berbeda" : "sama", k.nama];
  const dasar = dasarDari(l);
  const lain = URUT_TEMPAT.filter((t) => t !== k.nama);
  const geser = benihDasar(dasar) % 3;
  const dua = [lain[geser % 3], lain[(geser + 1) % 3]];
  return sisipkan(k.nama as string, dua, benihDasar(dasar));
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (uraian atau bilangan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "urai": {
      const a = angkaDi(d.n, d.tempat);
      if (cara === "klik") return `Bilangan diuraikan menurut tempat angkanya, dari ribuan sampai satuan: ${ucapkan(teksUrai(d.n))}.`;
      if (cara === "kanvas") return `Angka di tempat ${d.tempat} adalah ${kataBil(a)}.`;
      return `Angka ${kataBil(a)} berada di tempat ${d.tempat}, jadi harganya ${kataBil(a * HARGA[d.tempat])}.`;
    }
    case "susun": {
      if (cara === "klik") return `Semua bagian digabung dan tempat yang kosong diisi nol, jadi hasilnya ${kataBil(d.n)}.`;
      if (cara === "kanvas") return `Ada ${kataBil(banyakNol(d.n))} tempat tanpa bagian, dan tiap tempat itu diisi nol.`;
      return `Tempat ${tempatNol(d.n)[0]} tidak punya bagian, jadi diisi nol.`;
    }
    case "bagan": {
      const sisa = sisaBagan(d);
      if (cara === "klik") return `Bagian yang lain didapat dengan mengurangkan: ${kataBil(d.utuh)} dikurangi ${kataBil(d.bagian)} sama dengan ${kataBil(sisa)}.`;
      if (cara === "kanvas" || d.klaim === undefined) return `Bagian yang lain adalah ${kataBil(sisa)}, yaitu ${kataBil(sisa / d.satuan)} ${namaSatuan(d.satuan)}.`;
      return d.bagian + d.klaim === d.utuh
        ? `Kedua bagian jika dijumlahkan sama dengan ${kataBil(d.utuh)}, jadi sama dengan bilangan utuh.`
        : `Kedua bagian jika dijumlahkan menjadi ${kataBil(d.bagian + d.klaim)}, berbeda dari bilangan utuh, jadi ada yang keliru.`;
    }
    case "uang": {
      if (cara === "klik") return `Jumlah uang dihitung dari banyaknya tiap pecahan: ${kataUang(d.isi)} jumlahnya ${kataBil(d.n)} rupiah, sama dengan uang yang dibayar.`;
      if (cara === "kanvas") {
        const lain = jumlahUang(d.isi) - d.isi[d.tanya] * d.tanya;
        return `Pecahan lain jumlahnya ${kataBil(lain)} rupiah, sisanya ${kataBil(d.n - lain)} rupiah, jadi ada ${kataBil(d.isi[d.tanya])} ${jenisUang(d.tanya)} uang ${kataBil(d.tanya)}.`;
      }
      const j = jumlahUang(d.klaim ?? d.isi);
      return j === d.n ? `Jumlah uraian itu ${kataBil(j)} rupiah, sama dengan uang yang dibayar.` : `Jumlah uraian itu ${kataBil(j)} rupiah, berbeda dari ${kataBil(d.n)} rupiah, jadi uraiannya keliru.`;
    }
    case "lain": {
      if (cara === "klik") return `${kapital(kataBil(d.a))} ditambah ${kataBil(d.n - d.a)} sama dengan ${kataBil(d.n)}, jadi itu cara lain yang benar.`;
      if (cara === "kanvas") return `Bagian yang hilang adalah ${kataBil(d.n - d.a)}, jadi ribuannya ${kataBil(Math.floor((d.n - d.a) / 1000))}.`;
      return d.a + d.klaim === d.n
        ? `${kapital(kataBil(d.a))} ditambah ${kataBil(d.klaim)} sama dengan ${kataBil(d.n)}, jadi sama dengan bilangan di atas.`
        : `${kapital(kataBil(d.a))} ditambah ${kataBil(d.klaim)} menjadi ${kataBil(d.a + d.klaim)}, berbeda dari bilangan di atas, jadi uraian itu keliru.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "urai":
      if (cara === "klik") return `${aw}: lihat bilangan pada ${g} ini. Uraikan bilangan itu menurut tempat angkanya. Pilih uraian yang benar.`;
      if (cara === "kanvas") return `${aw}: lihat bilangan pada ${g} ini. Angka di tempat ${l.tempat} berapa? ${akhir}`;
      return `${aw}: lihat bilangan pada ${g} ini. Angka ${kataBil(angkaDi(l.n, l.tempat))} berada di tempat apa? Ucapkan satu kata: ribuan, ratusan, puluhan, atau satuan.`;
    case "susun":
      if (cara === "klik") return `${aw}: lihat bagian-bagian pada ${g} ini. Susun bagian itu menjadi satu bilangan. Pilih bilangan yang benar.`;
      if (cara === "kanvas") return `${aw}: lihat bagian-bagian pada ${g} ini. Susun menjadi satu bilangan. Ada berapa tempat yang diisi nol? ${akhir}`;
      return `${aw}: lihat bagian-bagian pada ${g} ini. Susun menjadi satu bilangan. Tempat apa yang diisi nol? Ucapkan satu kata: ribuan, ratusan, puluhan, atau satuan.`;
    case "bagan":
      if (cara === "klik") return `${aw}: ${g} ini adalah bagan bagian utuh, utuh sama dengan bagian ditambah bagian. Berapa bagian yang lain? Pilih jawabannya.`;
      if (cara === "kanvas") return `${aw}: ${g} ini adalah bagan bagian utuh. Bagian yang lain berapa ${namaSatuan(l.satuan)}? ${akhir}`;
      return l.klaim === undefined
        ? `${aw}: ${g} ini adalah bagan bagian utuh. Bagian yang lain berapa ${namaSatuan(l.satuan)}? ${akhir}`
        : `${aw}: ${g} ini adalah bagan bagian utuh. Apakah kedua bagian jika dijumlahkan sama dengan bilangan utuh? Ucapkan satu kata: sama atau berbeda.`;
    case "uang":
      if (cara === "klik") return `${aw}: lihat uang yang ada pada ${g} ini. Satu jumlah uang bisa diuraikan dengan pecahan yang berbeda. Pilih uraian yang jumlahnya sama dengan uang yang dibayar.`;
      if (cara === "kanvas") return `${aw}: lihat uang pada ${g} ini. Uang yang dibayar sudah diuraikan, tetapi satu pecahan belum terisi. Berapa ${jenisUang(l.tanya)} uang ${kataBil(l.tanya)}? ${akhir}`;
      return `${aw}: lihat uraian uang pada ${g} ini. Apakah jumlahnya sama dengan uang yang dibayar? Ucapkan satu kata: sama atau berbeda.`;
    case "lain":
      if (cara === "klik") return `${aw}: lihat bilangan pada ${g} ini. Satu bilangan bisa diuraikan dengan lebih dari satu cara. Pilih uraian dua bagian yang sama dengan bilangan itu.`;
      if (cara === "kanvas") return `${aw}: lihat bilangan pada ${g} ini. Bilangan itu sama dengan satu bagian ditambah bagian yang ribuannya hilang. Ribuan pada bagian yang hilang berapa? ${akhir}`;
      return `${aw}: lihat bilangan pada ${g} ini. Apakah kedua bagian jika dijumlahkan sama dengan bilangan di atas? Ucapkan satu kata: sama atau berbeda.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "urai":
      return cara === "klik" ? "Uraian mana yang benar?" : cara === "kanvas" ? `Angka di tempat ${d.tempat} berapa?` : "Angka itu ada di tempat apa?";
    case "susun":
      return cara === "klik" ? "Bilangan mana yang tersusun?" : cara === "kanvas" ? "Berapa tempat yang diisi nol?" : "Tempat apa yang diisi nol?";
    case "bagan":
      if (cara === "klik") return "Berapa bagian yang lain?";
      if (cara === "kanvas" || d.klaim === undefined) return `Bagian yang lain berapa ${namaSatuan(d.satuan)}?`;
      return "Sama atau berbeda dengan bilangan utuh?";
    case "uang":
      return cara === "klik" ? "Uraian mana yang jumlahnya sama?" : cara === "kanvas" ? `Berapa ${jenisUang(d.tanya)} uang ${kataBil(d.tanya)}?` : "Sama atau berbeda dengan uang yang dibayar?";
    case "lain":
      return cara === "klik" ? "Uraian mana yang sama dengan bilangan itu?" : cara === "kanvas" ? "Berapa ribuan pada bagian yang hilang?" : "Sama atau berbeda dengan bilangan di atas?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: uraian, kata, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "urai":
      return cara === "klik"
        ? "Tiap angka ditulis sesuai tempatnya: angka di ribuan dikali seribu, di ratusan dikali seratus, di puluhan dikali sepuluh. Periksa tempat tiap angka, dan bagian yang nol tidak ditulis."
        : "Baca tempat angka dari kiri: ribuan, ratusan, puluhan, lalu satuan. Cari angka yang ditanyakan pada bilangan itu.";
    case "susun":
      return cara === "klik"
        ? "Taruh tiap bagian pada tempatnya, dari ribuan sampai satuan. Tempat yang tidak punya bagian diisi nol, jangan dilewati."
        : "Periksa tiap tempat dari ribuan sampai satuan. Tempat yang tidak punya bagian berarti diisi nol.";
    case "bagan":
      return cara === "suara" && l.klaim !== undefined
        ? "Jumlahkan kedua bagian, lalu bandingkan dengan bilangan utuh. Bila jumlahnya persis sama ucapkan sama, bila tidak ucapkan berbeda."
        : "Bagian yang lain didapat dengan mengurangkan bilangan utuh dengan bagian yang sudah diketahui, bukan menjumlahkan.";
    case "uang":
      return cara === "klik"
        ? "Banyaknya tiap pecahan dikali harga pecahannya, lalu semuanya dijumlahkan. Pilih uraian yang jumlahnya persis sama dengan uang yang dibayar."
        : cara === "kanvas"
          ? "Jumlahkan dulu pecahan yang sudah ada, kurangkan dari uang yang dibayar, lalu bagi sisanya dengan harga satu lembar atau keping yang ditanyakan."
          : "Hitung jumlah semua pecahan pada uraian, lalu bandingkan dengan uang yang dibayar. Bila persis sama ucapkan sama, bila tidak ucapkan berbeda.";
    case "lain":
      return cara === "klik"
        ? "Dua bagian yang benar jika dijumlahkan persis sama dengan bilangan itu. Jumlahkan tiap pilihan, lalu pilih yang tepat."
        : cara === "kanvas"
          ? "Kurangkan bilangan itu dengan bagian yang sudah ada, lalu lihat angka di tempat ribuan hasilnya."
          : "Jumlahkan kedua bagian, lalu bandingkan dengan bilangan di atas. Bila persis sama ucapkan sama, bila tidak ucapkan berbeda.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "urai":
      return [`bilangan: ${rb(l.n)}`, "uraikan menurut tempat angka", cara === "klik" ? "uraian yang benar: ?" : cara === "kanvas" ? `angka di ${l.tempat}: ?` : `angka ${angkaDi(l.n, l.tempat)} ada di tempat: ?`];
    case "susun":
      return [`bagian: ${bagianTempat(l.n).map(rb).join(" + ")}`, "susun menjadi satu bilangan", cara === "klik" ? "bilangan yang tersusun: ?" : cara === "kanvas" ? "tempat yang diisi nol: ?" : "tempat yang diisi nol: apa?"];
    case "bagan":
      return [
        `utuh: ${rb(l.utuh)}`,
        `bagian: ${rb(l.bagian)}`,
        cara === "suara" && l.klaim !== undefined ? `bagian lain: ${rb(l.klaim)}` : cara === "klik" ? "bagian lain: ?" : `bagian lain berapa ${namaSatuan(l.satuan)}: ?`,
        ...(cara === "suara" && l.klaim !== undefined ? ["jumlahnya: sama atau berbeda?"] : []),
      ];
    case "uang":
      return [
        `uang yang dibayar: Rp ${rb(l.n)}`,
        cara === "klik" ? `uang yang ada: ${teksUang(STOK_UANG)}` : cara === "kanvas" ? `uraian: ${teksUang(l.isi, l.tanya)}` : `uraian: ${teksUang(l.klaim ?? l.isi)}`,
        cara === "klik" ? "uraian yang jumlahnya sama: ?" : cara === "kanvas" ? `banyak ${jenisUang(l.tanya)} ${rb(l.tanya)}: ?` : "jumlahnya: sama atau berbeda?",
      ];
    case "lain":
      return [
        `bilangan: ${rb(l.n)}`,
        cara === "klik" ? "uraian dua bagian: ?" : cara === "kanvas" ? `${rb(l.n)} = ${rb(l.a)} + ?` : `${rb(l.n)} = ${rb(l.a)} + ${rb(l.klaim)}`,
        cara === "klik" ? "pilih yang sama dengan bilangan" : cara === "kanvas" ? "ribuan bagian yang hilang: ?" : "jumlahnya: sama atau berbeda?",
      ];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
