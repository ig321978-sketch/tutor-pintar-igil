import type { AdeganStory } from "./logika-story";
import { W, anak, bagan, bagianEq, emo, judul, kartu } from "./k3b2A-gambar";
import { eja, hapus, idKartu, idx, k, sorotkan, tambah, ubah } from "./k3b2A-bantu";

/** Satu contoh: a tambah titik-titik sama dengan c (titik di belakang), atau titik-titik tambah b sama dengan c (titik di depan). */
function contoh(o: { id: string; ke: string; a?: number; b?: number; c: number; sumber: string }): AdeganStory {
  const depan = o.a === undefined;
  const diketahui = (depan ? o.b : o.a) as number;
  const jawab = o.c - diketahui;
  const bentuk = depan ? ["…", "+", String(diketahui), "=", String(o.c)] : [String(diketahui), "+", "…", "=", String(o.c)];
  const s1 = `Contoh ${o.ke}: ${depan ? `titik-titik tambah ${eja(diketahui)}` : `${eja(diketahui)} tambah titik-titik`} sama dengan ${eja(o.c)}.`;
  const s2 = `Bilangan yang diketahui adalah ${eja(diketahui)} dan ${eja(o.c)}.`;
  const s3 = `Kurangkan jumlahnya: ${eja(o.c)} dikurangi ${eja(diketahui)} sama dengan ${eja(jawab)}.`;
  const s4 = `Jadi, titik-titik diisi ${eja(jawab)}. Kita periksa: ${depan ? `${eja(jawab)} tambah ${eja(diketahui)}` : `${eja(diketahui)} tambah ${eja(jawab)}`} sama dengan ${eja(o.c)}.`;
  const w1 = s1.split(" ");
  const tmb = w1.indexOf("tambah");
  const sm = w1.indexOf("sama");
  const pemicu1 = [2, tmb, tmb + 1, sm, sm + 2];
  const w2 = s2.split(" ");
  const w3 = s3.split(" ");
  const dk = w3.indexOf("dikurangi");
  const sm3 = w3.indexOf("sama");
  const pemicu3 = [2, dk, dk + 1, sm3, sm3 + 2];
  const titik = depan ? 0 : 2;
  const tahu = depan ? 2 : 0;
  const peri = depan ? [jawab, "+", diketahui, "=", o.c] : [diketahui, "+", jawab, "=", o.c];
  const warna = (b: string) => (b === "…" || b === "?" ? W.merahMuda : b === "+" || b === "=" || b === "−" ? W.emas : W.krem);
  return {
    id: o.id,
    judul: `Contoh ${o.ke}`,
    sumber: o.sumber,
    latar: "#F5F3FF",
    ketukan: [
      k(s1, tambah(0, judul(`Contoh ${o.ke}`)), ...bentuk.map((b, i) => tambah(pemicu1[i], bagianEq("eq", i, b, 62, 24, warna(b))))),
      k(
        s2,
        sorotkan(w2.indexOf("adalah") + 1, `eq${tahu}-k`),
        sorotkan(w2.indexOf("dan"), "eq4-k"),
        tambah(w2.indexOf("dan"), ...kartu("kd", 40, 104, 220, 24, W.hijauMuda, ["bilangan yang diketahui"], 10.5)),
      ),
      k(
        s3,
        hapus(0, ...idKartu("kd")),
        ...[String(o.c), "−", String(diketahui), "=", "?"].map((b, i) => tambah(pemicu3[i], bagianEq("eb", i, b, 130, 24, warna(b)))),
      ),
      k(
        s4,
        ubah(idx(s4, "diisi"), { id: "eb4-t", isi: String(jawab) }, { id: `eq${titik}-t`, isi: String(jawab) }),
        sorotkan(idx(s4, "diisi"), `eq${titik}-k`),
        tambah(idx(s4, "periksa:"), ...kartu("pk", 40, 168, 220, 28, W.hijauMuda, [peri.join(" ")], 12)),
      ),
    ],
  };
}

export const ADEGAN_CONTOH_8 = contoh({ id: "contoh-8", ke: "pertama", a: 8, c: 19, sumber: "Materi: contoh titik di belakang" });
export const ADEGAN_CONTOH_23 = contoh({ id: "contoh-23", ke: "kedua", a: 23, c: 45, sumber: "Materi: contoh dua puluh tiga" });
export const ADEGAN_CONTOH_DEPAN = contoh({ id: "contoh-depan", ke: "ketiga", b: 16, c: 54, sumber: "Materi: contoh titik di depan" });
export const ADEGAN_CONTOH_36 = contoh({ id: "contoh-36", ke: "keempat", b: 36, c: 68, sumber: "Materi: contoh titik di depan lagi" });

/* ------------------------------ Banyak kemungkinan ------------------------------ */
const SUARA_K1 = "Wei punya seratus bintang. Sebagian ia simpan, sisanya ia pakai untuk hadiah.";
const SUARA_K2 = "Kalau hanya jumlahnya yang diketahui, pasangan bilangannya ada banyak.";
const SUARA_K3 = "Enam puluh tambah empat puluh. Tujuh puluh lima tambah dua puluh lima. Lima puluh lima tambah empat puluh lima.";
const SUARA_K4 = "Semuanya sama-sama seratus. Jadi jawabannya tidak hanya satu.";

export const ADEGAN_KEMUNGKINAN: AdeganStory = {
  id: "kemungkinan-100",
  judul: "Banyak kemungkinan",
  sumber: "Materi: banyak kemungkinan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Bintang Wei")),
      tambah(idx(SUARA_K1, "Wei"), ...anak("wei", 40, 76)),
      tambah(idx(SUARA_K1, "seratus"), ...bagan(44, "100", "?", "?", 0.5, 30, 80, 200)),
      tambah(idx(SUARA_K1, "simpan,"), ...kartu("sm", 80, 124, 96, 20, W.langit, ["disimpan"], 9)),
      tambah(idx(SUARA_K1, "hadiah."), ...kartu("hd", 182, 124, 98, 20, W.merahMuda, ["dipakai"], 9)),
    ),
    k(SUARA_K2, tambah(idx(SUARA_K2, "banyak"), emo("bn", 150, 178, "\u{1F500}", 34))),
    k(
      SUARA_K3,
      tambah(idx(SUARA_K3, "Enam"), ...kartu("m1", 80, 150, 140, 14, W.hijauMuda, ["60 + 40 = 100"], 9)),
      tambah(idx(SUARA_K3, "Tujuh"), ...kartu("m2", 80, 168, 140, 14, W.hijauMuda, ["75 + 25 = 100"], 9)),
      tambah(idx(SUARA_K3, "Lima", 2), ...kartu("m3", 80, 186, 140, 14, W.hijauMuda, ["55 + 45 = 100"], 9)),
    ),
    k(SUARA_K4, hapus(0, "bn"), tambah(idx(SUARA_K4, "sama-sama"), emo("ok", 262, 164, "✅", 30)), tambah(idx(SUARA_K4, "satu."), emo("tn", 38, 164, "\u{1F4A1}", 30))),
  ],
};
