import type { AdeganStory, Obj } from "./logika-story";
import { DUA, E, UKUR, WARNA_ISI, W, bentukDatar, emo, judul, kartu, kotak, keranjangAnyam, lencana, orang, slot, teks, type Bentuk } from "./k1b4b-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/* Video metode global Sub-Bab B "Teras Penuh Barang": pembuka dan Attribute Sort (Pilah Ciri). */

export const NAMA_METODE = ["Attribute Sort", "Guess My Rule", "Odd One Out"];
export const NAMA_METODE_ID = ["Pilah Ciri", "Tebak Aturan", "Cari yang Beda"];
export const WARNA_METODE = [W.langit, W.hijauMuda, W.pink];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Bahan festival sudah rapi di keranjang. Abang bercerita, anak-anak di negara lain juga punya cara seru untuk memilah benda. Kita lihat tiga metode global.";
const SUARA_O2 = "Tiga metode itu adalah Attribute Sort, Guess My Rule, dan Odd One Out.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Pilah Ciri, Tebak Aturan, dan Cari yang Beda.";
const SUARA_O4 = "Semua metode membantu kita melihat ciri benda, yaitu bentuk, warna, dan ukuran.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk memilah",
  sumber: "Metode global: pembuka",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global")),
      tambah("keranjang.", ...[90, 150, 210].map((x, i) => emo(`kj${i}`, x, 74, E.keranjang, 30))),
      tambah("Abang", ...orang("ab", 40, 150, E.abang, "Abang")),
      tambah("negara", emo("gl", 250, 146, E.dunia, 40)),
      tambah("tiga", ...kartu("pk", 90, 160, 120, 24, W.emas, ["3 metode global"], 10)),
    ),
    k(SUARA_O2, bersih(0), tambah(0, judul("Tiga metode")), ...NAMA_METODE.map((m, i) => tambah(["Attribute", "Guess", "Odd"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(SUARA_O3, bersih(0), tambah(0, judul("Nama dalam bahasa Indonesia")), ...NAMA_METODE_ID.map((m, i) => tambah(["Pilah", "Tebak", "Cari"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11)))),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Ciri benda")),
      tambah("bentuk,", bentukDatar("c0", "segitiga", WARNA_ISI.merah, 14, 60, 90), bentukDatar("c1", "segi empat", WARNA_ISI.merah, 12, 60, 126), teks("c0n", 60, 160, "bentuk", 10)),
      tambah("warna,", bentukDatar("c2", "lengkung", WARNA_ISI.merah, 12, 150, 92), bentukDatar("c3", "lengkung", WARNA_ISI.biru, 12, 150, 124), teks("c2n", 150, 160, "warna", 10)),
      tambah("ukuran.", bentukDatar("c4", "segi empat", WARNA_ISI.biru, 16, 240, 92), bentukDatar("c5", "segi empat", WARNA_ISI.biru, 8, 240, 128), teks("c4n", 240, 160, "ukuran", 10)),
    ),
  ],
};

/* ------------------------------ 2. Attribute Sort: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Attribute Sort, atau Pilah Ciri. Ciri adalah sifat benda yang bisa kita lihat.";
const SUARA_A2 = "Ciri bisa berupa bentuk, warna, atau ukuran. Pilih satu ciri sebagai aturan.";
const SUARA_A3 = "Lalu periksa tiap benda. Benda yang cocok dengan aturan masuk ke tempat yang sama.";
const SUARA_A4 = "Beri nama tiap tempat, lalu hitung isi tiap tempat. Begitulah cara memilah dengan ciri.";
/** Lima benda contoh: biru tiga, merah dua. */
const CONTOH: { b: Bentuk; w: "merah" | "biru" }[] = [
  { b: "lengkung", w: "biru" },
  { b: "segitiga", w: "merah" },
  { b: "segi empat", w: "biru" },
  { b: "lengkung", w: "merah" },
  { b: "segitiga", w: "biru" },
];
const ID_CONTOH = CONTOH.map((_, i) => `e${i}`);
const letakContoh = (): Titik2[] => {
  const n = { merah: 0, biru: 0 };
  return CONTOH.map((c) => {
    const p = slot(DUA[c.w === "merah" ? 0 : 1], n[c.w]);
    n[c.w] += 1;
    return p;
  });
};
type Titik2 = { x: number; y: number };
const CHIP = ["bentuk", "warna", "ukuran"].flatMap((c, i) => [`ch${i}-k`, `ch${i}-t0`]);

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Attribute Sort: pilah menurut ciri",
  sumber: "Metode global: Attribute Sort",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("Ciri@2", ...CONTOH.map((c, i) => bentukDatar(ID_CONTOH[i], c.b, WARNA_ISI[c.w], UKUR.besar, 50 + i * 50, 76))),
      tambah("lihat.", emo("mt", 280, 76, E.mata, 16)),
    ),
    k(
      SUARA_A2,
      tambah("bentuk,", ...kartu("ch0", 20, 100, 80, 20, W.krem, ["bentuk"], 9.5)),
      tambah("warna,", ...kartu("ch1", 110, 100, 80, 20, W.merahMuda, ["warna"], 9.5)),
      tambah("ukuran.", ...kartu("ch2", 200, 100, 80, 20, W.lavender, ["ukuran"], 9.5)),
      sorotkan("satu", "ch1-k"),
      tambah("satu", teks("sc", 150, 138, "1 ciri jadi aturan: warna", 10, W.merah)),
    ),
    k(
      SUARA_A3,
      hapus(0, ...CHIP, "sc", "mt"),
      tambah(0, ...keranjangAnyam("w-merah", DUA[0], "merah", W.merahMuda), ...keranjangAnyam("w-biru", DUA[1], "biru", W.langit)),
      sorotkan("periksa", ...ID_CONTOH),
      ubah("masuk", ...letakContoh().map((p, i) => ({ id: ID_CONTOH[i], x: p.x, y: p.y, sorot: false }))),
    ),
    k(
      SUARA_A4,
      sorotkan("nama", "w-merah-nm-k", "w-biru-nm-k"),
      tambah("hitung", ...lencana("w-merah", DUA[0], 2), ...lencana("w-biru", DUA[1], 3)),
      tambah("Begitulah", emo("ok", 150, 76, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ 3. Attribute Sort: terapan ------------------------------ */
const SUARA_B1 = "Di toples Mamah ada delapan kancing baju. Igil memilih satu ciri, yaitu warna.";
const SUARA_B2 = "Igil menyiapkan dua keranjang kecil, yaitu kuning dan hijau. Ia memeriksa kancing satu per satu.";
const SUARA_B3 = "Kancing kuning ada enam. Kancing hijau ada dua.";
const SUARA_B4 = "Enam dan dua, semuanya delapan kancing. Tidak ada kancing yang tertinggal di toples.";
/** Delapan kancing: kuning enam, hijau dua. */
const KANCING = ["kuning", "hijau", "kuning", "kuning", "kuning", "hijau", "kuning", "kuning"];
const ID_KANCING = KANCING.map((_, i) => `kn${i}`);
const letakKancing = (): Titik2[] => {
  const n: Record<string, number> = { kuning: 0, hijau: 0 };
  return KANCING.map((w) => {
    const p = slot(DUA[w === "kuning" ? 0 : 1], n[w]);
    n[w] += 1;
    return p;
  });
};
const keKeranjang = (w: string) => KANCING.map((c, i) => (c === w ? i : -1)).filter((i) => i >= 0).map((i) => ({ id: ID_KANCING[i], ...letakKancing()[i], sorot: false }));

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Attribute Sort: kancing di toples",
  sumber: "Metode global: Attribute Sort, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0)),
      tambah("toples", kotak("tp", 100, 54, 100, 46, "#E0F2FE", W.biru, { rx: 10, tebal: 2, z: -2 }), kotak("tp-t", 106, 49, 88, 7, "#94A3B8", W.biru, { rx: 3, z: -1 })),
      tambah("Mamah", ...orang("mm", 40, 84, E.mamah, "Mamah")),
      tambah("delapan", ...KANCING.map((w, i) => ({ ...bentukDatar(ID_KANCING[i], "lengkung", WARNA_ISI[w], 8, 114 + (i % 4) * 24, 67 + Math.floor(i / 4) * 21) })), teks("jm", 150, 124, "8 kancing", 10)),
      tambah("Igil", ...orang("ig", 262, 84, E.igil, "Igil")),
      tambah("satu", teks("sc", 150, 140, "1 ciri: warna", 10, W.merah)),
    ),
    k(
      SUARA_B2,
      hapus(0, "jm", "sc"),
      tambah("dua", teks("dk", 150, 109, "2 keranjang kecil", 9, W.coklat)),
      tambah("kuning", ...keranjangAnyam("m-kuning", DUA[0], "kuning", "#FEF08A")),
      tambah("hijau.", ...keranjangAnyam("m-hijau", DUA[1], "hijau", W.hijauMuda)),
      sorotkan("satu", "kn0"),
    ),
    k(
      SUARA_B3,
      hapus(0, "dk"),
      ubah("kuning", ...keKeranjang("kuning")),
      tambah("enam.", ...lencana("m-kuning", DUA[0], 6)),
      ubah("hijau", ...keKeranjang("hijau")),
      tambah("dua.", ...lencana("m-hijau", DUA[1], 2)),
    ),
    k(
      SUARA_B4,
      tambah("semuanya", ...kartu("jw", 108, 58, 84, 22, W.emas, ["6 + 2 = 8"], 12)),
      tambah("tertinggal", teks("kos", 150, 93, "toples kosong", 9, W.hijau)),
    ),
  ],
};
