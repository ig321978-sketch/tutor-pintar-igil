/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 6 Sub-Bab B "Diagram Batang Pak Dodi" (membaca dan membandingkan diagram batang), akhir cerita Bazar Kuliner Sekolah.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bazar-k4b6b.mjs.
 * Jawaban benar DIHITUNG dari data diagram (logika-data.ts dan diagram-data.ts): banyak, garis tempat batang berhenti, selisih, dan jumlah.
 * Empat metode tiap misi: IGIL "Telusuri Garis, Adu Batang, Putar Diagram" (tugas tingkat sumbu dan arah diagram), Follow the Line (Telusuri Garis), Bar Duel (Adu Batang),
 * dan Flip the Chart (Putar Diagram). Jawaban: memilih (klik), menulis satu angka 1 sampai 9 di kanvas, dan mengucapkan satu kata (nama jenis, tegak, mendatar) atau bilangan pendek.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { DIAGRAM } from "./diagram-data";
import { garisBatang, indeksTerbanyak, indeksTersedikit, jumlahBatang, namaDiGaris, selisihBatang, type Diagram } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Nama bilangan 0 sampai 99 dalam kata (tanpa digit). */
export const kataBil = (n: number): string => {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return `${SATUAN[p]} puluh${s ? ` ${SATUAN[s]}` : ""}`;
};
export const kata = kataBil;
const URUTAN = ["", "pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh", "kedelapan", "kesembilan"];
/** Urutan garis dengan kata: 4 menjadi "keempat". */
export const urutan = (n: number): string => URUTAN[n] ?? `ke ${kataBil(n)}`;

/** Ubah teks berangka menjadi ucapan tanpa digit: "5 buah" menjadi "lima buah", tanda kali, sama dengan, dan kurang dieja. Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return t
    .replace(/\s*×\s*/g, " kali ")
    .replace(/\s*=\s*/g, " sama dengan ")
    .replace(/\s+-\s+/g, " dikurangi ")
    .replace(/\s*\+\s*/g, " ditambah ")
    .replace(/\d+/g, (m) => kataBil(Number(m)))
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Tingkat (IGIL, klik atau kanvas): angka sumbu naik berapa tiap garis. */
export type LTingkat = { tipe: "tingkat"; d: string; pil?: Pil };
/** Arah (IGIL, suara): diagram tegak atau mendatar. */
export type KataArah = "tegak" | "mendatar";
export type LSebut = { tipe: "sebut"; d: string; kata: KataArah };
/** Telusuri Garis (Follow the Line): dari batang ke sumbu. banyak (klik), garis (kanvas atau suara), nama (suara atau klik). */
export type HasilTelusur = "banyak" | "garis" | "nama";
export type LTelusur = { tipe: "telusur"; d: string; b: number; hasil: HasilTelusur; pil?: Pil };
/** Adu Batang (Bar Duel): selisih (klik), selisihGaris (kanvas atau suara), tinggi dan pendek (nama, suara atau klik). */
export type HasilAdu = "selisih" | "selisihGaris" | "tinggi" | "pendek";
export type LAdu = { tipe: "adu"; d: string; a: number; b: number; hasil: HasilAdu; pil?: Pil };
/** Putar Diagram (Flip the Chart): terpanjang dan terpendek (nama), jumlah (klik), garis (kanvas atau suara). `diputar`: diagram tegak yang diputar menjadi mendatar (hanya kalimat). */
export type HasilPutar = "terpanjang" | "terpendek" | "jumlah" | "garis";
export type LPutar = { tipe: "putar"; d: string; hasil: HasilPutar; b?: number; diputar?: boolean; pil?: Pil };
export type LangkahDasar = LTingkat | LSebut | LTelusur | LAdu | LPutar;
/** Tugas yang boleh dibungkus Cari kesalahan (jawaban tokoh adalah salah satu pilihan klik). */
export type DasarSalah = LTingkat | LTelusur | LAdu | LPutar;
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "telusur" | "adu" | "putar";
export const URUT_METODE: Metode[] = ["igil", "telusur", "adu", "putar"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Telusuri Garis, Adu Batang, Putar Diagram",
  telusur: "Follow the Line: Telusuri Garis",
  adu: "Bar Duel: Adu Batang",
  putar: "Flip the Chart: Putar Diagram",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", telusur: "\u{1F4CF}", adu: "\u{1F94A}", putar: "\u{1F504}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", telusur: "Follow the Line", adu: "Bar Duel", putar: "Flip the Chart" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const diagramDari = (l: Langkah): Diagram => DIAGRAM[dasarDari(l).d];
export const sorotBatang = (d: LangkahDasar): number[] => {
  switch (d.tipe) {
    case "telusur":
      return d.hasil === "nama" ? [] : [d.b];
    case "adu":
      return d.hasil === "selisih" || d.hasil === "selisihGaris" ? [d.a, d.b] : [];
    case "putar":
      return d.hasil === "garis" && d.b !== undefined ? [d.b] : [];
    default:
      return [];
  }
};
/** Garis bantu (garis ke-k) yang digambar untuk tugas Telusuri Garis jenis nama dan banyak: mencari jenis di garis itu, atau menelusuri ujung batang. */
export const garisBantu = (d: LangkahDasar): number | null => {
  const di = DIAGRAM[d.d];
  if (d.tipe === "telusur" && d.hasil === "nama") return garisBatang(di, d.b);
  return null;
};

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });
const teksBanyak = (di: Diagram, n: number): string => `${n} ${di.satuan}`;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data diagram. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  const di = DIAGRAM[l.d];
  switch (l.tipe) {
    case "tingkat":
      return cara === "klik" ? sebutan(teksBanyak(di, di.tingkat)) : cara === "kanvas" ? angka(di.tingkat) : null;
    case "sebut":
      return cara === "suara" ? sebutan(l.kata) : null;
    case "telusur":
      if (l.hasil === "banyak") return cara === "klik" ? sebutan(teksBanyak(di, di.batang[l.b].banyak)) : null;
      if (l.hasil === "garis") return cara === "kanvas" || cara === "suara" ? angka(garisBatang(di, l.b)) : null;
      return cara === "suara" || cara === "klik" ? sebutan(di.batang[l.b].nama.toLowerCase()) : null;
    case "adu":
      if (l.hasil === "selisih") return cara === "klik" ? sebutan(teksBanyak(di, selisihBatang(di, l.a, l.b))) : null;
      if (l.hasil === "selisihGaris") return cara === "kanvas" || cara === "suara" ? angka(selisihBatang(di, l.a, l.b) / di.tingkat) : null;
      return cara === "suara" || cara === "klik" ? sebutan(di.batang[l.hasil === "tinggi" ? indeksTerbanyak(di) : indeksTersedikit(di)].nama.toLowerCase()) : null;
    case "putar":
      if (l.hasil === "jumlah") return cara === "klik" ? sebutan(teksBanyak(di, jumlahBatang(di))) : null;
      if (l.hasil === "garis") return (cara === "kanvas" || cara === "suara") && l.b !== undefined ? angka(garisBatang(di, l.b)) : null;
      return cara === "suara" || cara === "klik" ? sebutan(di.batang[l.hasil === "terpanjang" ? indeksTerbanyak(di) : indeksTersedikit(di)].nama.toLowerCase()) : null;
  }
}
/** Apakah tugas langsung siap dijawab? Semua tugas, kecuali Cari kesalahan. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Pengecoh bilangan untuk jawaban suara: bilangan di dekat jawaban, 1 sampai 9 dan berbeda dari jawaban benar. */
export function pengecoh(l: Langkah, cara: Cara): number[] {
  const k = kunciJawab(dasarDari(l), cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  return [n + 1, n - 1, n + 2, n - 2].filter((c) => Number.isInteger(c) && c >= 1 && c <= 9 && c !== n);
}
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "sebut") return [];
  return d.pil ? [...d.pil] : [];
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  if (d.tipe === "sebut") return sisipkan(k.nama, ["miring", k.nama === "tegak" ? "mendatar" : "tegak"], k.nama.length);
  const lain = DIAGRAM[d.d].batang.map((b) => b.nama.toLowerCase()).filter((n) => n !== k.nama);
  return sisipkan(k.nama, lain.slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}
/** Pilihan klik ditampilkan berhuruf awal kapital untuk nama jenis. */
export const tampilPilihan = (t: string): string => (/^\d/.test(t) ? t : kapital(t));

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan data" : "diagram");
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
const nm = (di: Diagram, i: number): string => di.batang[i].nama;
const panjangTinggi = (di: Diagram): string => (di.arah === "tegak" ? "tingginya" : "panjangnya");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(ucapkan(kalimatKunciMentah(l, cara)));
}
function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  void cara;
  const d = dasarDari(l);
  const di = DIAGRAM[d.d];
  switch (d.tipe) {
    case "tingkat":
      return `Angka pada sumbu naik ${di.tingkat} ${di.satuan} tiap garis.`;
    case "sebut":
      return d.kata === "tegak" ? "Batang berdiri ke atas, jadi diagram ini disebut diagram batang tegak." : "Batang terbaring ke samping, jadi diagram ini disebut diagram batang mendatar.";
    case "telusur": {
      const n = di.batang[d.b].banyak;
      const g = garisBatang(di, d.b);
      if (d.hasil === "banyak") return `Batang ${nm(di, d.b)} berhenti di garis ${urutan(g)}, dan tiap garis ${di.tingkat} ${di.satuan}, jadi ${g} × ${di.tingkat} = ${n} ${di.satuan}.`;
      if (d.hasil === "garis") return `Batang ${nm(di, d.b)} berhenti di garis ${urutan(g)} dari nol, karena ${n} ${di.satuan} dibagi ${di.tingkat} sama dengan ${g}.`;
      return `Garis ${urutan(g)} berarti ${g} × ${di.tingkat} = ${n} ${di.satuan}, yaitu batang ${nm(di, d.b)}.`;
    }
    case "adu": {
      if (d.hasil === "tinggi") return `Batang ${nm(di, indeksTerbanyak(di))} paling ${di.arah === "tegak" ? "tinggi" : "panjang"}, jadi paling banyak.`;
      if (d.hasil === "pendek") return `Batang ${nm(di, indeksTersedikit(di))} paling pendek, jadi paling sedikit.`;
      const [ba, bb] = [di.batang[d.a].banyak, di.batang[d.b].banyak];
      const besar = Math.max(ba, bb);
      const kecil = Math.min(ba, bb);
      if (d.hasil === "selisih") return `Selisih dicari dengan mengurangkan: ${besar} - ${kecil} = ${besar - kecil} ${di.satuan}.`;
      return `Selisihnya ${besar - kecil} ${di.satuan}, dan tiap garis ${di.tingkat} ${di.satuan}, jadi ${(besar - kecil) / di.tingkat} garis.`;
    }
    case "putar": {
      if (d.hasil === "terpanjang") return `Batang ${nm(di, indeksTerbanyak(di))} paling panjang, jadi paling banyak, dan diputar pun datanya sama.`;
      if (d.hasil === "terpendek") return `Batang ${nm(di, indeksTersedikit(di))} paling pendek, jadi paling sedikit, dan diputar pun datanya sama.`;
      if (d.hasil === "jumlah") return `Semua banyak dijumlahkan: ${di.batang.map((b) => b.banyak).join(" + ")} = ${jumlahBatang(di)} ${di.satuan}.`;
      const b = d.b ?? 0;
      return `Batang ${nm(di, b)} berhenti di garis ${urutan(garisBatang(di, b))} dari nol, tegak maupun mendatar.`;
    }
  }
}
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}
const lambangBaca = (rupa: Rupa): boolean => rupa === "lambang";
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const di = DIAGRAM[l.d];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  const pt = panjangTinggi(di);
  switch (l.tipe) {
    case "tingkat":
      return `${aw}: lihat ${g} ini. Angka pada sumbu naik sama banyak tiap garis. Tiap garis naik berapa ${di.satuan}? ${akhir}`;
    case "sebut":
      return `${aw}: lihat ${g} ini. ${l.kata === "tegak" ? "Batang berdiri ke atas dan yang dibaca adalah tingginya." : "Batang terbaring ke samping dan yang dibaca adalah panjangnya."} Diagram batang ini disebut diagram apa? Ucapkan satu kata.`;
    case "telusur":
      if (l.hasil === "banyak") return `${aw}: lihat ${g} ini. ${lambangBaca(rupa) ? `Kartu mencatat garis tempat batang ${nm(di, l.b)} berhenti.` : `Telusuri garis dari ujung batang ${nm(di, l.b)} sampai sumbu angka.`} Berapa ${di.satuan} banyaknya? ${akhir}`;
      if (l.hasil === "garis") return `${aw}: lihat ${g} ini. Hitung garis dari nol sampai ujung batang ${nm(di, l.b)}. Batang itu berhenti di garis ke berapa? ${akhir}`;
      return `${aw}: lihat ${g} ini. Ada batang yang ujungnya tepat di garis ${urutan(garisBatang(di, l.b))}. Batang jenis apa itu? ${akhir}`;
    case "adu":
      if (l.hasil === "selisih") return `${aw}: lihat ${g} ini. Adu batang ${nm(di, l.a)} dan batang ${nm(di, l.b)}. Selisihnya berapa ${di.satuan}? ${akhir}`;
      if (l.hasil === "selisihGaris") return `${aw}: lihat ${g} ini. Adu batang ${nm(di, l.a)} dan batang ${nm(di, l.b)}. Selisih ${pt} ada berapa garis? ${akhir}`;
      return `${aw}: lihat ${g} ini. Adu semua batang. Jenis apa yang paling ${l.hasil === "tinggi" ? "banyak" : "sedikit"}? ${akhir}`;
    case "putar":
      if (l.hasil === "jumlah") return `${aw}: lihat ${g} ini. ${l.diputar ? "Diagram diputar menjadi mendatar, datanya tetap sama. " : ""}Semua batang dijumlahkan. Jumlahnya berapa ${di.satuan}? ${akhir}`;
      if (l.hasil === "garis") return `${aw}: lihat ${g} ini. ${l.diputar ? "Diagram diputar menjadi mendatar, datanya tetap sama. " : ""}Batang ${nm(di, l.b ?? 0)} berhenti di garis ke berapa dari nol? ${akhir}`;
      return `${aw}: lihat ${g} ini. ${l.diputar ? "Diagram diputar menjadi mendatar, datanya tetap sama. " : ""}Jenis apa yang batangnya paling ${l.hasil === "terpanjang" ? "panjang" : "pendek"}? ${akhir}`;
  }
}
/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  void cara;
  return kapKal(ucapkan(kalimatTanyaMentah(dasarDari(l))));
}
function kalimatTanyaMentah(d: LangkahDasar): string {
  const di = DIAGRAM[d.d];
  switch (d.tipe) {
    case "tingkat":
      return `Tiap garis naik berapa ${di.satuan}?`;
    case "sebut":
      return "Diagram batang ini disebut diagram apa?";
    case "telusur":
      return d.hasil === "banyak" ? `Berapa ${di.satuan} banyaknya?` : d.hasil === "garis" ? "Batang itu berhenti di garis ke berapa?" : "Batang jenis apa itu?";
    case "adu":
      return d.hasil === "selisih" ? `Selisihnya berapa ${di.satuan}?` : d.hasil === "selisihGaris" ? "Selisihnya ada berapa garis?" : `Jenis apa yang paling ${d.hasil === "tinggi" ? "banyak" : "sedikit"}?`;
    case "putar":
      return d.hasil === "jumlah" ? `Jumlahnya berapa ${di.satuan}?` : d.hasil === "garis" ? "Batang itu berhenti di garis ke berapa?" : `Jenis apa yang batangnya paling ${d.hasil === "terpanjang" ? "panjang" : "pendek"}?`;
  }
}
/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "tingkat":
      return "Bandingkan dua angka yang bersebelahan pada sumbu, lalu lihat selisihnya.";
    case "sebut":
      return "Perhatikan ke arah mana batang memanjang dari sumbu, lalu ucapkan satu kata.";
    case "telusur":
      return "Periksa dulu tingkat sumbu, lalu telusuri garis dari batang sampai bertemu angka pada sumbu. Jangan hanya menghitung garis.";
    case "adu":
      return "Cari banyak tiap batang pada sumbu yang sama, lalu bandingkan. Selisih berarti yang besar dikurangi yang kecil.";
    case "putar":
      return "Bacalah batang dari sumbu yang benar. Arah diagram berubah, tetapi data tiap batang tetap sama.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
const barisData = (di: Diagram): string[] => di.batang.map((b) => `${b.nama}: ${b.banyak} ${di.satuan}`);
const barisSumbu = (di: Diagram): string => `angka pada sumbu: ${[0, ...Array.from({ length: Math.min(3, Math.round(Math.max(...di.batang.map((b) => b.banyak)) / di.tingkat)) }, (_, k) => (k + 1) * di.tingkat)].join(", ")}, dan seterusnya`;
const barisTingkat = (di: Diagram): string => `tiap garis naik: ${di.tingkat} ${di.satuan}`;
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). Baris pertama dan terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  void cara;
  const di = DIAGRAM[l.d];
  const judul = `tabel panitia: ${di.judul.toLowerCase()} (${di.satuan})`;
  switch (l.tipe) {
    case "tingkat":
      return [judul, barisSumbu(di), `tiap garis naik berapa ${di.satuan}: ?`];
    case "sebut":
      return [judul, l.kata === "tegak" ? "batang tumbuh ke atas dari sumbu bawah, tingginya yang dibaca" : "batang tumbuh ke kanan dari sumbu samping, panjangnya yang dibaca", "arah diagram batang: ?"];
    case "telusur":
      if (l.hasil === "banyak") return [judul, barisTingkat(di), `${nm(di, l.b)}: berhenti di garis ${urutan(garisBatang(di, l.b))}`, `banyak ${nm(di, l.b).toLowerCase()}: ?`];
      if (l.hasil === "garis") return [judul, barisTingkat(di), `${nm(di, l.b)}: ${di.batang[l.b].banyak} ${di.satuan}`, "berhenti di garis ke: ?"];
      return [judul, barisTingkat(di), ...barisData(di), `jenis di garis ${urutan(garisBatang(di, l.b))}: ?`];
    case "adu":
      if (l.hasil === "selisih") return [judul, barisTingkat(di), `${nm(di, l.a)}: garis ${urutan(garisBatang(di, l.a))}`, `${nm(di, l.b)}: garis ${urutan(garisBatang(di, l.b))}`, "selisih: ?"];
      if (l.hasil === "selisihGaris") return [judul, barisTingkat(di), `${nm(di, l.a)}: ${di.batang[l.a].banyak} ${di.satuan}`, `${nm(di, l.b)}: ${di.batang[l.b].banyak} ${di.satuan}`, "selisih dalam garis: ?"];
      return [judul, ...barisData(di), l.hasil === "tinggi" ? "paling banyak: ?" : "paling sedikit: ?"];
    case "putar":
      if (l.hasil === "jumlah") return [judul, ...barisData(di), "jumlah semua: ?"];
      if (l.hasil === "garis") return [judul, barisTingkat(di), `${nm(di, l.b ?? 0)}: ${di.batang[l.b ?? 0].banyak} ${di.satuan}`, "berhenti di garis ke: ?"];
      return [judul, ...barisData(di), l.hasil === "terpanjang" ? "batang paling panjang: ?" : "batang paling pendek: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
/** Keterangan di bawah gambar Concrete dan Pictorial: judul diagram dan hal yang dicari. */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  const di = DIAGRAM[d.d];
  return [`${di.judul} (${di.satuan})`, kartu[kartu.length - 1]];
}

/** Bilangan dengan titik ribuan (bilangan di sini kecil, jadi tampil apa adanya). */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export { namaDiGaris };
