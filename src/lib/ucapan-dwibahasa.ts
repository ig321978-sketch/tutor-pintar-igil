/**
 * Pecah naskah guru menjadi segmen id-ID / en-US supaya Web Speech
 * melafalkan kata Inggris dengan mesin suara Inggris, bukan id-ID.
 */

export type BahasaUcapan = "id-ID" | "en-US";

export type SegmenUcapan = {
  teks: string;
  lang: BahasaUcapan;
};

/** Frasa Inggris (urutan panjang dulu) yang wajib dibaca en-US. */
const FRASA_INGGRIS = [
  "triangle inequality theorem",
  "triangle inequality",
  "leftmost place priority",
  "part-whole place model",
  "unit symbol consistency",
  "isoperimetric relationship",
  "flexible decomposition",
  "ordering protocol",
  "right angle benchmark",
  "equivalent table",
  "inclusive hierarchy",
  "height-matrix",
  "composite area",
  "layer counting",
  "ordered-ratio",
  "additive parts sum",
  "side sum",
  "angle sum",
  "unit rate",
  "error hunt",
  "paper fold",
  "path length",
  "hidden support",
  "occlusion max",
  "area model",
  "array model",
  "place value",
  "mind mapping",
  "mind-mapping",
  "van hiele",
  "number bond",
  "ten frame",
  "ten-frame",
  "fair share",
  "times table",
  "expanded form",
  "equal groups",
  "number line",
  "dienes blocks",
].sort((a, b) => b.length - a.length);

/** Kata Inggris tunggal yang sering muncul di naskah IGIL. */
const KATA_INGGRIS = new Set(
  [
    "inequality",
    "theorem",
    "hierarchy",
    "inclusive",
    "concrete",
    "pictorial",
    "abstract",
    "story",
    "array",
    "trapezoid",
    "rhombus",
    "geoboard",
    "property",
    "matrix",
    "placeholder",
    "regrouping",
    "borrowing",
    "decomposition",
    "composition",
    "attribute",
    "visual",
    "analysis",
    "measurement",
    "division",
    "multiply",
    "inverse",
    "chart",
    "blocks",
    "dienes",
    "counting",
    "ordering",
    "standard",
    "addition",
    "subtraction",
    "fluency",
    "number",
    "line",
    "order",
    "expanded",
    "form",
    "compare",
    "leftmost",
    "flexible",
    "grouping",
    "angle",
    "sum",
    "side",
    "area",
    "model",
    "rate",
    "unit",
    "path",
    "length",
    "paper",
    "fold",
    "error",
    "hunt",
    "hidden",
    "support",
    "occlusion",
    "max",
    "composite",
    "layer",
    "benchmark",
    "right",
    "protocol",
    "equivalent",
    "table",
    "relationship",
    "isoperimetric",
    "consistency",
    "symbol",
    "priority",
    "place",
    "value",
    "parts",
    "additive",
    "ordered",
    "ratio",
    "fair",
    "share",
    "groups",
    "equal",
    "times",
    "phet",
    "hots",
    "lots",
    "mots",
    "mapping",
    "mind",
    "bond",
    "frame",
    "ten",
    "theorem",
    "inclusive",
    "hierarchy",
    "kite",
    "square",
    "rectangle",
    "triangle",
    "pentagon",
    "hexagon",
    "circle",
    "perimeter",
    "volume",
    "fraction",
    "decimal",
    "percent",
    "ratio",
    "pattern",
    "sequence",
    "factor",
    "multiple",
    "prime",
    "composite",
    "vertex",
    "vertices",
    "edge",
    "face",
    "base",
    "height",
    "width",
    "length",
    "parallel",
    "perpendicular",
    "acute",
    "obtuse",
    "right",
    "scalene",
    "isosceles",
    "equilateral",
    "theorem",
    "lemma",
    "proof",
    "method",
    "strategy",
    "algorithm",
    "estimate",
    "exact",
    "approximate",
    "check",
    "verify",
    "solve",
    "explain",
    "reason",
    "justify",
    "conclude",
    "summary",
    "review",
    "practice",
    "exam",
    "quiz",
    "challenge",
    "bonus",
    "level",
    "stage",
    "phase",
    "module",
    "chapter",
    "lesson",
    "topic",
    "concept",
    "skill",
    "mastery",
    "progress",
    "score",
    "point",
    "points",
    "badge",
    "reward",
    "leaderboard",
    "ranking",
    "scholarship",
    "partner",
    "community",
    "school",
    "teacher",
    "student",
    "parent",
    "family",
    "household",
  ].map((k) => k.toLowerCase()),
);

/** Kata Indonesia / campuran yang jangan dianggap Inggris meski Latin. */
const BUKAN_INGGRIS = new Set(
  [
    "dan",
    "atau",
    "yang",
    "dengan",
    "untuk",
    "dari",
    "pada",
    "ini",
    "itu",
    "ada",
    "tidak",
    "sudah",
    "belum",
    "juga",
    "karena",
    "maka",
    "jika",
    "bila",
    "saat",
    "ketika",
    "setelah",
    "sebelum",
    "antara",
    "oleh",
    "akan",
    "bisa",
    "dapat",
    "harus",
    "perlu",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "kelas",
    "bab",
    "siswa",
    "guru",
    "sekolah",
    "poin",
    "latihan",
    "ujian",
    "materi",
    "silabus",
    "praktikum",
    "segitiga",
    "persegi",
    "panjang",
    "pendek",
    "besar",
    "kecil",
    "banyak",
    "sedikit",
    "hitung",
    "jumlah",
    "kurang",
    "tambah",
    "bagi",
    "kali",
    "hasil",
    "jawab",
    "soal",
    "benar",
    "salah",
    "coba",
    "lihat",
    "baca",
    "tulis",
    "gambar",
    "tabel",
    "diagram",
    "peta",
    "cerita",
    "angka",
    "bilangan",
    "pecahan",
    "desimal",
    "persen",
    "sudut",
    "sisi",
    "alas",
    "tinggi",
    "luas",
    "keliling",
    "volume",
    "fase",
    "blok",
    "rapor",
    "beasiswa",
    "komunitas",
    "igil",
    "smicpa",
    "indonesia",
    "jakarta",
    "matematika",
    "bahasa",
    "merdeka",
    "kurikulum",
    "sub",
    "bab",
    "ayah",
    "ibu",
    "anak",
    "teman",
    "rumah",
    "kantin",
    "pagi",
    "siang",
    "sore",
    "malam",
    "hari",
    "minggu",
    "bulan",
    "tahun",
    "metode",
    "cara",
    "langkah",
    "ingat",
    "contoh",
    "latihan",
    "ayo",
    "mari",
    "yuk",
    "baik",
    "bagus",
    "hebat",
    "pintar",
    "semangat",
  ].map((k) => k.toLowerCase()),
);

const POLA_MORFEM_INGGRIS =
  /(tion|sion|ness|ment|ough|ight|ough|sch|thr|^th|ph|ck$|ous$|ive$|ical$|ology|graph|metry|angle|equal|multi|sub|pre|post|anti)/i;

function bersihKata(mentah: string): string {
  return mentah.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
}

function adalahKataInggris(mentah: string): boolean {
  const kata = bersihKata(mentah);
  if (kata.length < 2) return false;
  if (!/^[A-Za-z][A-Za-z'-]*$/.test(kata)) return false;
  const kecil = kata.toLowerCase();
  if (BUKAN_INGGRIS.has(kecil)) return false;
  if (KATA_INGGRIS.has(kecil)) return true;
  // Morfem Inggris (tion, ness, …) — bukan sekadar huruf kapital (agar "Jumlah"/"Tahap" tidak ikut).
  if (POLA_MORFEM_INGGRIS.test(kecil) && kecil.length >= 5) return true;
  return false;
}

function tandaiFrasa(teks: string): { teks: string; frasa: string[] } {
  const frasa: string[] = [];
  let keluar = teks;
  for (const polaFrasa of FRASA_INGGRIS) {
    const pola = new RegExp(polaFrasa.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    keluar = keluar.replace(pola, (cocok) => {
      const i = frasa.length;
      frasa.push(cocok);
      // Placeholder tanpa huruf Latin agar tidak dicocokkan ulang oleh frasa lebih pendek.
      return `⟦${i}⟧`;
    });
  }
  return { teks: keluar, frasa };
}

function gabungSama(sebelum: SegmenUcapan[]): SegmenUcapan[] {
  const hasil: SegmenUcapan[] = [];
  for (const s of sebelum) {
    const teks = s.teks.replace(/\s+/g, " ");
    if (!teks.trim()) continue;
    const akhir = hasil[hasil.length - 1];
    if (akhir && akhir.lang === s.lang) {
      akhir.teks = `${akhir.teks}${teks.startsWith(" ") || akhir.teks.endsWith(" ") ? "" : " "}${teks}`.replace(
        /\s+/g,
        " ",
      );
    } else {
      hasil.push({ teks, lang: s.lang });
    }
  }
  return hasil.map((s) => ({ ...s, teks: s.teks.trim() })).filter((s) => s.teks.length > 0);
}

/**
 * Pecah naskah menjadi segmen bahasa. Segmen en-US hanya berisi kata/frasa Inggris;
 * tanda baca mengikuti segmen di sekitarnya.
 */
export function pecahSegmenDwibahasa(teks: string): SegmenUcapan[] {
  const mentah = teks.replace(/\s+/g, " ").trim();
  if (!mentah) return [];

  const { teks: bertanda, frasa } = tandaiFrasa(mentah);
  const potongan = bertanda.split(/(⟦\d+⟧)/g).filter((p) => p.length > 0);
  const segmen: SegmenUcapan[] = [];

  for (const potong of potongan) {
    const cocokFrasa = /^⟦(\d+)⟧$/.exec(potong);
    if (cocokFrasa) {
      const isi = frasa[Number(cocokFrasa[1])];
      if (isi) segmen.push({ teks: isi, lang: "en-US" });
      continue;
    }
    const token = potong.split(/(\s+)/);
    let penyangga = "";
    let langPenyangga: BahasaUcapan = "id-ID";

    const siram = () => {
      if (!penyangga) return;
      segmen.push({ teks: penyangga, lang: langPenyangga });
      penyangga = "";
    };

    for (const t of token) {
      if (!t) continue;
      if (/^\s+$/.test(t)) {
        penyangga += t;
        continue;
      }
      const en = adalahKataInggris(t);
      const lang: BahasaUcapan = en ? "en-US" : "id-ID";
      if (!penyangga) {
        langPenyangga = lang;
        penyangga = t;
      } else if (lang === langPenyangga) {
        penyangga += t;
      } else {
        siram();
        langPenyangga = lang;
        penyangga = t;
      }
    }
    siram();
  }

  return gabungSama(segmen);
}

export function adaSegmenInggris(teks: string): boolean {
  return pecahSegmenDwibahasa(teks).some((s) => s.lang === "en-US");
}
