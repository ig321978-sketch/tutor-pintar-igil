import { pengacak, type Pengacak } from "./acak";
import { kataBilangan, paramInt, paramRentang, sebagaiDaftar, sebagaiObjek, suaraSpec } from "./bantu";
import { registrasiTindakan } from "./registri";
import { PERCOBAAN_TANPA_PILIHAN, type Hasil, type Pengecoh, type Pilihan, type SoalInstans, type SoalSpec } from "./tipe";
import { KANVAS_TULIS, MODEL_TULIS_O2K1A, PETUNJUK_GORES_O2K1A, awalLabO2K1A, goresanTulis, jumlahGoresan, langkahLabO2K1A, sudahTertulis } from "../../components/modul/o2k1a-lab";

/**
 * Sepuluh tindakan Abstract Kelas 1 Bab 1 Sub-Bab A (naskah/aturan-kuis-cpa-opsi2.md bagian 6):
 * LAMBANG DAN KATA SAJA (lambang bilangan, kata bilangan, kartu). Tanpa gambar atau emoji benda dan tanpa diagram
 * sebagai pengganti soal. Bilangan nol sampai sepuluh. Suara selalu tanpa digit (bilangan dieja); lambang hanya
 * tampil sebagai gambar lambang di layar. Jalur gerak tulis memakai model yang sama dengan Story dan Simulasi
 * (components/modul/o2k1a-lab.ts), jadi yang ditiru anak sama dengan yang diperagakan.
 */

/* ------------------------------ Bantu bersama ------------------------------ */

const lam = (n: number): string => String(n);
const jumlahPilihan = (spec: SoalSpec): number => Math.min(4, Math.max(3, paramInt(spec.param, "jumlahPilihan", 3)));
const unik = (a: string[]): boolean => new Set(a).size === a.length;

/** Kekeliruan nyata anak saat membaca dan menulis lambang: tertukar rupa (6 dan 9, 2 dan 5), tertukar bentuk, nol dan sepuluh. */
export const KONFUSI: Record<number, { angka: number; alasan: string }[]> = {
  0: [{ angka: 10, alasan: "nol dikira sepuluh" }, { angka: 6, alasan: "nol bulat dikira enam" }],
  1: [{ angka: 7, alasan: "satu dikira tujuh" }, { angka: 10, alasan: "satu dikira sepuluh" }],
  2: [{ angka: 5, alasan: "dua dan lima tertukar" }, { angka: 3, alasan: "dua dikira tiga" }],
  3: [{ angka: 8, alasan: "tiga dikira delapan" }, { angka: 2, alasan: "tiga dikira dua" }],
  4: [{ angka: 9, alasan: "empat dan sembilan tertukar" }, { angka: 7, alasan: "empat dikira tujuh" }],
  5: [{ angka: 2, alasan: "lima dan dua tertukar" }, { angka: 6, alasan: "lima dikira enam" }],
  6: [{ angka: 9, alasan: "enam dan sembilan tertukar" }, { angka: 0, alasan: "enam dikira nol" }],
  7: [{ angka: 1, alasan: "tujuh dikira satu" }, { angka: 4, alasan: "tujuh dikira empat" }],
  8: [{ angka: 3, alasan: "delapan dikira tiga" }, { angka: 0, alasan: "delapan dikira nol" }],
  9: [{ angka: 6, alasan: "sembilan dan enam tertukar" }, { angka: 4, alasan: "sembilan dikira empat" }],
  10: [{ angka: 1, alasan: "sepuluh hanya ditulis satu" }, { angka: 0, alasan: "sepuluh hanya ditulis nol" }],
};

/** Id pilihan lambang tiga yang tertulis terbalik (cermin). Label tampilnya digambar komponen sebagai tiga yang dicerminkan. */
export const ID_TIGA_CERMIN = "3c";

function dasar(spec: SoalSpec, bentuk: SoalInstans["bentuk"], suara: string, penjelasan: string, data: SoalInstans["data"], kunci: unknown): SoalInstans {
  return { nomor: spec.nomor, tindakan: spec.tindakan, tahap: "abstract", suara, layar: suara, bentuk, data, kunci, percobaan: PERCOBAAN_TANPA_PILIHAN, penjelasan };
}

function denganPilihan(s: SoalInstans, p: { pilihan: Pilihan[]; pengecoh: Pengecoh[]; kunciPilihan: string }): SoalInstans {
  return { ...s, pilihan: p.pilihan, kunciPilihan: p.kunciPilihan, pengecoh: p.pengecoh, percobaan: p.pilihan.length };
}

/** Pilihan lambang untuk bilangan n: satu benar dan sisanya pengecoh dari kekeliruan nyata (KONFUSI), dilengkapi bilangan lain. */
function opsiLambang(rng: Pengacak, n: number, jumlah: number): { pilihan: Pilihan[]; pengecoh: Pengecoh[]; kunciPilihan: string } {
  const calon: { id: string; label: string; suara: string; alasan: string }[] = [];
  if (n === 3) calon.push({ id: ID_TIGA_CERMIN, label: "Ɛ", suara: "tiga terbalik", alasan: "tiga ditulis terbalik (cermin)" });
  for (const k of KONFUSI[n]) calon.push({ id: lam(k.angka), label: lam(k.angka), suara: kataBilangan(k.angka), alasan: k.alasan });
  const sisa = rng.kocok(Array.from({ length: 11 }, (_, i) => i).filter((i) => i !== n));
  for (const i of sisa) calon.push({ id: lam(i), label: lam(i), suara: kataBilangan(i), alasan: "salah mengenali lambang" });
  const dipakai: typeof calon = [];
  for (const c of calon) {
    if (dipakai.length >= jumlah - 1) break;
    if (dipakai.some((d) => d.id === c.id)) continue;
    dipakai.push(c);
  }
  const semua = rng.kocok([{ id: lam(n), label: lam(n), suara: kataBilangan(n), alasan: "" }, ...dipakai]);
  return {
    pilihan: semua.map((s): Pilihan => ({ id: s.id, label: s.label, suara: s.suara })),
    pengecoh: dipakai.map((d) => ({ id: d.id, alasan: d.alasan })),
    kunciPilihan: lam(n),
  };
}

/** Tiga bilangan berbeda: yang pertama mudah tertukar dengan yang kedua (6 dan 9, 2 dan 5, dan seterusnya). */
function tigaBilangan(rng: Pengacak, lo: number, hi: number): number[] {
  const a = rng.int(lo, hi);
  const mitra = KONFUSI[a].map((k) => k.angka).filter((x) => x >= lo && x <= hi);
  const b = mitra.length > 0 ? rng.pilih(mitra) : a;
  const hasil = [a];
  if (b !== a) hasil.push(b);
  const lain = rng.kocok(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((x) => !hasil.includes(x)));
  while (hasil.length < 3) hasil.push(lain.shift() as number);
  return rng.kocok(hasil);
}

const pilihanBenar = (s: SoalInstans, jawaban: unknown): boolean => sebagaiObjek(jawaban).pilih === s.kunciPilihan;

/* ---------------- Jalur tulis (dipakai nomor 2 dan 10) ---------------- */

/** Kanvas tulis 256 x 220: dua kali satuan jalur (lebar 128, tinggi 110, atas pada -8). */
export const SKALA_KANVAS = 2;
export const LEBAR_KANVAS = KANVAS_TULIS.w * SKALA_KANVAS;
export const TINGGI_KANVAS = KANVAS_TULIS.tinggi * SKALA_KANVAS;
/** Pergeseran sumbu y dari satuan jalur ke kanvas (sebelum dikalikan SKALA_KANVAS). */
export const GESER_Y_KANVAS = -KANVAS_TULIS.y0;

export type GoresanModel = { d: string; ox: number; petunjuk: string; titik: { x: number; y: number }[] };

const keKanvas = (x: number, y: number): { x: number; y: number } => ({ x: Math.round(x * SKALA_KANVAS), y: Math.round((y - KANVAS_TULIS.y0) * SKALA_KANVAS) });

/** Goresan model untuk lambang n (sepuluh: dua lambang), dengan titik pada satuan kanvas. */
export function modelTulis(n: number): GoresanModel[] {
  return goresanTulis(n).map((g) => ({ d: g.d, ox: g.ox, petunjuk: g.petunjuk, titik: g.titik.map(([x, y]) => keKanvas(x, y)) }));
}

const panjangGaris = (g: { x: number; y: number }[]): number => g.reduce((s, t, i) => (i === 0 ? 0 : s + Math.hypot(t.x - g[i - 1].x, t.y - g[i - 1].y)), 0);

function bacaGoresan(v: unknown): { x: number; y: number }[][] | null {
  if (!Array.isArray(v)) return null;
  const hasil: { x: number; y: number }[][] = [];
  for (const g of v) {
    if (!Array.isArray(g) || g.length === 0 || g.length > 5000) return null;
    const baris: { x: number; y: number }[] = [];
    for (const t of g) {
      const o = sebagaiObjek(t);
      if (typeof o.x !== "number" || typeof o.y !== "number" || !Number.isFinite(o.x) || !Number.isFinite(o.y)) return null;
      baris.push({ x: o.x, y: o.y });
    }
    hasil.push(baris);
  }
  return hasil;
}

/**
 * Menilai tulisan anak: titik jari diputar ulang pada pemeriksa jalur Simulasi (arah dan urutan goresan harus benar).
 * Coretan berlebihan ditolak (panjang tinta paling banyak tiga kali panjang model).
 */
export function periksaTulisan(n: number, jawaban: unknown): boolean {
  const g = bacaGoresan(sebagaiObjek(jawaban).goresan);
  if (!g || g.length === 0 || g.length > jumlahGoresan(n) + 2) return false;
  const model = modelTulis(n);
  const panjangModel = model.reduce((s, m) => s + panjangGaris(m.titik), 0);
  const tinta = g.reduce((s, x) => s + panjangGaris(x), 0);
  if (tinta > panjangModel * 3 + 80) return false;
  let keadaan = { ...awalLabO2K1A(), n };
  for (const goresan of g) {
    for (const t of goresan) keadaan = langkahLabO2K1A(keadaan, { t: "TITIK", x: t.x / SKALA_KANVAS, y: t.y / SKALA_KANVAS + KANVAS_TULIS.y0 });
    keadaan = langkahLabO2K1A(keadaan, { t: "ANGKAT" });
  }
  return sudahTertulis(keadaan);
}

const jawabanTulisBenar = (n: number): unknown => ({ goresan: modelTulis(n).map((m) => m.titik) });

function periksaTulis(s: SoalInstans, jawaban: unknown): Hasil {
  if (periksaTulisan(s.kunci as number, jawaban)) return { benar: true };
  const ada = bacaGoresan(sebagaiObjek(jawaban).goresan);
  const pesan = !ada || ada.length === 0 ? "Tulis dulu di kanvas." : "Ikuti garis, mulai dari titik hijau.";
  return { benar: false, petunjuk: { sasaran: [], pesan } };
}

/** Teks petunjuk goresan (tanpa angka) untuk lambang n, dibacakan komponen. */
export function petunjukTulis(n: number): string[] {
  return (n === 10 ? ["1", "0"] : [lam(n)]).flatMap((a) => PETUNJUK_GORES_O2K1A[a]);
}

/* ---------------- 1. Dengarkan nama bilangan lalu pilih lambangnya ---------------- */
registrasiTindakan({
  id: "a-dengar-pilih",
  tahap: "abstract",
  nama: "Dengarkan nama bilangan lalu pilih lambangnya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const n = rng.int(lo, hi);
    const s = dasar(spec, "pilihan", suaraSpec(spec), `Bilangan itu dibaca ${kataBilangan(n)}. Lambangnya ada di kartu hijau.`, { nama: kataBilangan(n) }, n);
    return denganPilihan(s, opsiLambang(rng, n, jumlahPilihan(spec)));
  },
  periksa(s, jawaban) {
    if (pilihanBenar(s, jawaban)) return { benar: true };
    return { benar: false, petunjuk: { sasaran: ["dengar"], pesan: "Dengarkan lagi, lihat bentuknya." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunciPilihan }),
});

/* ---------------- 2. Tulis lambang yang disebut di kanvas ---------------- */
registrasiTindakan({
  id: "a-tulis-kanvas",
  tahap: "abstract",
  nama: "Tulis lambang yang disebut di kanvas",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 9]);
    const n = rng.int(lo, hi);
    return dasar(spec, "tulisan", suaraSpec(spec, { n }), `Lambang ${kataBilangan(n)} ditulis dengan gerak ini.`, { lambang: lam(n), mode: "semua" }, n);
  },
  periksa: periksaTulis,
  jawabanBenar: (s) => jawabanTulisBenar(s.kunci as number),
});

/* ---------------- 3. Jodohkan kata bilangan dengan lambangnya ---------------- */
registrasiTindakan({
  id: "a-jodohkan-kata",
  tahap: "abstract",
  nama: "Jodohkan kata bilangan dengan lambangnya",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const tiga = tigaBilangan(rng, lo, hi);
    const kiri = tiga.map((n) => ({ id: `k${n}`, kata: kataBilangan(n) }));
    const kanan = rng.kocok(tiga).map((n) => ({ id: `l${n}`, lambang: lam(n) }));
    return dasar(spec, "garis", suaraSpec(spec), "Setiap kata cocok dengan satu lambang.", { kiri, kanan }, tiga);
  },
  periksa(s, jawaban) {
    const mentah = sebagaiObjek(jawaban).hubungan;
    const pasangan = Array.isArray(mentah) ? mentah.filter((p): p is [string, string] => Array.isArray(p) && p.length === 2 && typeof p[0] === "string" && typeof p[1] === "string") : [];
    const kiri = (s.data.kiri as { id: string }[]).map((k) => k.id);
    const terhubung = pasangan.map((p) => p[0]);
    if (pasangan.length !== kiri.length || !unik(terhubung) || !kiri.every((k) => terhubung.includes(k))) {
      return { benar: false, petunjuk: { sasaran: kiri.filter((k) => !terhubung.includes(k)), pesan: "Hubungkan semua kartu dulu." } };
    }
    const salah = pasangan.filter(([a, b]) => `l${a.slice(1)}` !== b).map((p) => p[0]);
    if (salah.length === 0) return { benar: true };
    return { benar: false, petunjuk: { sasaran: salah, pesan: "Dengarkan katanya, cari lambangnya." } };
  },
  jawabanBenar: (s) => ({ hubungan: (s.kunci as number[]).map((n) => [`k${n}`, `l${n}`]) }),
});

/* ---------------- 4. Urutkan goresan penulisan sebuah lambang ---------------- */
registrasiTindakan({
  id: "a-urut-goresan",
  tahap: "abstract",
  nama: "Urutkan goresan penulisan sebuah lambang",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [2, 9]);
    const n = rng.int(Math.max(2, lo), Math.min(9, hi));
    const model = MODEL_TULIS_O2K1A[lam(n)];
    const urut = model.map((d, i) => ({ id: `g${i + 1}`, d }));
    let kartu = rng.kocok(urut);
    if (kartu.every((k, i) => k.id === urut[i].id)) kartu = [...urut.slice(1), urut[0]];
    const kunci = urut.map((u) => u.id);
    return dasar(spec, "urutan", suaraSpec(spec, { n }), `Begitulah urutan menulis lambang ${kataBilangan(n)}.`, { lambang: lam(n), semua: model, kartu }, kunci);
  },
  periksa(s, jawaban) {
    const urutan = sebagaiDaftar(sebagaiObjek(jawaban).urutan);
    const kunci = s.kunci as string[];
    if (urutan.length !== kunci.length) return { benar: false, petunjuk: { sasaran: [], pesan: "Susun semua goresannya dulu." } };
    const salah = urutan.findIndex((x, i) => x !== kunci[i]);
    if (salah < 0) return { benar: true };
    return { benar: false, petunjuk: { sasaran: [kunci[salah]], pesan: "Goresan berkedip ditulis pada giliran ini." } };
  },
  jawabanBenar: (s) => ({ urutan: s.kunci as string[] }),
});

/* ---------------- 5. Benar atau salah: lambang ini dibaca ... ---------------- */
registrasiTindakan({
  id: "a-benar-salah",
  tahap: "abstract",
  nama: "Benar atau salah: lambang ini dibaca sekian",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const n = rng.int(lo, hi);
    const benar = rng.int(0, 1) === 1;
    const mitra = KONFUSI[n].map((k) => k.angka).filter((x) => x >= lo && x <= hi);
    const klaim = benar || mitra.length === 0 ? n : rng.pilih(mitra);
    const adaBenar = klaim === n;
    const penjelasan = adaBenar ? `Lambang itu memang dibaca ${kataBilangan(n)}.` : `Lambang itu dibaca ${kataBilangan(n)}, bukan ${kataBilangan(klaim)}.`;
    const kunciPilihan = adaBenar ? "benar" : "salah";
    const lain = adaBenar ? "salah" : "benar";
    const s = dasar(spec, "pilihan", suaraSpec(spec, { n: klaim }), penjelasan, { lambang: lam(n), klaim: kataBilangan(klaim) }, kunciPilihan);
    return denganPilihan(s, {
      pilihan: [
        { id: "benar", label: "Benar", suara: "Benar" },
        { id: "salah", label: "Salah", suara: "Salah" },
      ],
      kunciPilihan,
      pengecoh: [{ id: lain, alasan: adaBenar ? "mengira bacaannya keliru" : "mengira lambang dibaca seperti yang disebut" }],
    });
  },
  periksa(s, jawaban) {
    if (pilihanBenar(s, jawaban)) return { benar: true };
    return { benar: false, petunjuk: { sasaran: [], pesan: "Lihat lambangnya, dengar katanya lagi." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunciPilihan }),
});

/* ---------------- 6. Detektif: temukan lambang yang tertulis salah arah ---------------- */
type Ubin = { id: string; lambang: string; arah: "benar" | "cermin" | "putar"; miring: number };

registrasiTindakan({
  id: "a-detektif-arah",
  tahap: "abstract",
  nama: "Detektif: temukan lambang yang tertulis salah arah",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const n = rng.pilih([2, 3, 4, 5, 6, 7, 9]);
    const arahSalah: Ubin["arah"] = n === 6 || n === 9 ? rng.pilih(["cermin", "putar"] as const) : "cermin";
    const tempat = rng.int(0, 3);
    const ubin: Ubin[] = Array.from({ length: 4 }, (_, i) => ({ id: `t${i + 1}`, lambang: lam(n), arah: i === tempat ? arahSalah : "benar", miring: rng.pilih([-6, 0, 6]) }));
    return dasar(spec, "ketuk", suaraSpec(spec, { n }), `Satu lambang ${kataBilangan(n)} menghadap arah yang keliru.`, { ubin }, `t${tempat + 1}`);
  },
  periksa(s, jawaban) {
    if (sebagaiObjek(jawaban).pilih === s.kunci) return { benar: true };
    const ubin = s.data.ubin as Ubin[];
    return { benar: false, petunjuk: { sasaran: ubin.filter((u) => u.arah === "benar").map((u) => u.id), pesan: "Tiga yang berkedip sudah benar." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunci }),
});

/* ---------------- 7. Memori: pasangkan kartu lambang dengan kartu kata ---------------- */
registrasiTindakan({
  id: "a-memori-kata",
  tahap: "abstract",
  nama: "Memori: cocokkan kartu lambang dengan kartu kata",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const tiga = tigaBilangan(rng, lo, hi);
    const kartu = rng.kocok(tiga.flatMap((n) => [{ id: `kata${n}`, jenis: "kata", n, teks: kataBilangan(n) }, { id: `lam${n}`, jenis: "lambang", n, teks: lam(n) }]));
    return dasar(spec, "garis", suaraSpec(spec), "Setiap lambang cocok dengan katanya.", { kartu }, [...tiga].sort((a, b) => a - b));
  },
  periksa(s, jawaban) {
    const mentah = sebagaiObjek(jawaban).pasangan;
    const pasangan = Array.isArray(mentah) ? mentah.filter((p): p is [string, string] => Array.isArray(p) && p.length === 2 && typeof p[0] === "string" && typeof p[1] === "string") : [];
    const kunci = s.kunci as number[];
    const dipakai = pasangan.map((p) => `${p[0]}|${p[1]}`);
    const benar = pasangan.length === kunci.length && unik(dipakai) && kunci.every((n) => pasangan.some(([a, b]) => a === `kata${n}` && b === `lam${n}`));
    return benar ? { benar: true } : { benar: false, petunjuk: { sasaran: [], pesan: "Cocokkan semua kartu dulu." } };
  },
  jawabanBenar: (s) => ({ pasangan: (s.kunci as number[]).map((n) => [`kata${n}`, `lam${n}`]) }),
});

/* ---------------- 8. Ketuk semua lambang yang dibaca n (beberapa gaya tulisan) ---------------- */
export const GAYA_LAMBANG = ["tebal", "miring", "serif", "mono", "tulis", "bulat"] as const;
type UbinGaya = { id: string; angka: number; gaya: string };

registrasiTindakan({
  id: "a-ketuk-semua-lambang",
  tahap: "abstract",
  nama: "Ketuk semua lambang yang dibaca sekian",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const n = rng.int(lo, hi);
    const k = rng.int(2, 4);
    const mitra = KONFUSI[n].map((x) => x.angka).filter((x) => x >= lo && x <= hi);
    const lain = rng.kocok(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((x) => x !== n && !mitra.includes(x)));
    const pengecoh = [...mitra, ...lain].slice(0, 8 - k);
    const urut = rng.kocok([...Array.from({ length: k }, () => n), ...pengecoh]);
    const gaya = rng.kocok([...GAYA_LAMBANG]);
    const ubin: UbinGaya[] = urut.map((angka, i) => ({ id: `t${i + 1}`, angka, gaya: gaya[i % gaya.length] }));
    const sasaran = ubin.filter((u) => u.angka === n);
    if (sasaran.length > 1 && sasaran.every((u) => u.gaya === sasaran[0].gaya)) sasaran[1].gaya = GAYA_LAMBANG[(GAYA_LAMBANG.indexOf(sasaran[0].gaya as (typeof GAYA_LAMBANG)[number]) + 1) % GAYA_LAMBANG.length];
    return dasar(spec, "himpunan", suaraSpec(spec, { n }), `Gaya tulisan beda, bacanya tetap ${kataBilangan(n)}.`, { ubin, sasaran: kataBilangan(n) }, sasaran.map((u) => u.id));
  },
  periksa(s, jawaban) {
    const kunci = s.kunci as string[];
    const ids = sebagaiDaftar(sebagaiObjek(jawaban).ids);
    const kelebihan = ids.filter((x) => !kunci.includes(x));
    const kurang = kunci.filter((x) => !ids.includes(x));
    if (unik(ids) && kelebihan.length === 0 && kurang.length === 0) return { benar: true };
    if (kelebihan.length > 0) return { benar: false, petunjuk: { sasaran: kelebihan, pesan: "Lambang yang berkedip bukan itu." } };
    return { benar: false, petunjuk: { sasaran: kurang.slice(0, 1), pesan: "Masih ada yang belum diketuk." } };
  },
  jawabanBenar: (s) => ({ ids: s.kunci as string[] }),
});

/* ---------------- 9. Lengkapi kalimat: Lambang ... dibaca enam ---------------- */
registrasiTindakan({
  id: "a-lengkapi-kalimat",
  tahap: "abstract",
  nama: "Lengkapi kalimat: lambang yang hilang",
  buat(spec, benih) {
    const rng = pengacak(benih);
    const [lo, hi] = paramRentang(spec.param, "rentang", [0, 10]);
    const n = rng.int(lo, hi);
    const s = dasar(spec, "pilihan", suaraSpec(spec, { n }), `Lambang yang hilang adalah lambang ${kataBilangan(n)}.`, { kata: kataBilangan(n) }, n);
    return denganPilihan(s, opsiLambang(rng, n, jumlahPilihan(spec)));
  },
  periksa(s, jawaban) {
    if (pilihanBenar(s, jawaban)) return { benar: true };
    return { benar: false, petunjuk: { sasaran: ["dengar"], pesan: "Dengarkan katanya, cari lambangnya." } };
  },
  jawabanBenar: (s) => ({ pilih: s.kunciPilihan }),
});

/* ---------------- 10. Tulis sepuluh: lambang satu lalu nol ---------------- */
registrasiTindakan({
  id: "a-tulis-sepuluh",
  tahap: "abstract",
  nama: "Tulis sepuluh: lambang satu lalu nol",
  buat(spec) {
    return dasar(spec, "tulisan", suaraSpec(spec), "Sepuluh ditulis dua lambang: satu, lalu nol.", { lambang: "10", mode: "sepuluh" }, 10);
  },
  periksa: periksaTulis,
  jawabanBenar: (s) => jawabanTulisBenar(s.kunci as number),
});
