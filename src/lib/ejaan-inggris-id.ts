/**
 * Ubah kata/frasa Inggris menjadi ejaan yang dibaca benar oleh suara Indonesia (id-ID).
 * Tetap satu suara guru; tidak memakai TTS Inggris.
 *
 * Contoh: Concrete → "konkrit", Inequality → "ini kuo li ti".
 */

/** Frasa panjang dulu agar tidak terpotong kata per kata. */
const FRASA_DASAR: ReadonlyArray<readonly [string, string]> = [
  ["triangle inequality theorem", "trai enggel ini kuo li ti ti o rem"],
  ["triangle inequality", "trai enggel ini kuo li ti"],
  ["leftmost place priority", "lef mous pleis prai o ri ti"],
  ["part-whole place model", "part houl pleis mo del"],
  ["unit symbol consistency", "yu nit sim bol kon sis ten si"],
  ["isoperimetric relationship", "ai so pe ri met rik ri lei syen syip"],
  ["flexible decomposition", "flek si bel de kom po si syen"],
  ["ordering protocol", "or de ring pro to kol"],
  ["right angle benchmark", "rait enggel benci mark"],
  ["equivalent table", "i kui va len tei bel"],
  ["inclusive hierarchy", "in klu sif hai rar ki"],
  ["height-matrix", "hait meitriks"],
  ["composite area", "kom po sit e ri a"],
  ["layer counting", "lei yer kaun ting"],
  ["ordered-ratio", "or derd rei syio"],
  ["additive parts sum", "e di tif parts sam"],
  ["mind mapping", "main maping"],
  ["mind-mapping", "main maping"],
  ["place value", "pleis velyu"],
  ["van hiele", "fan hi le"],
  ["number bond", "nam ber bond"],
  ["ten frame", "ten freim"],
  ["ten-frame", "ten freim"],
  ["fair share", "fer syer"],
  ["times table", "taims tei bel"],
  ["expanded form", "eks pan ded form"],
  ["equal groups", "i kuol grups"],
  ["number line", "nam ber lain"],
  ["dienes blocks", "di nes bloks"],
  ["array model", "a rei mo del"],
  ["area model", "e ri a mo del"],
  ["angle sum", "enggel sam"],
  ["side sum", "said sam"],
  ["unit rate", "yu nit reit"],
  ["error hunt", "e ror hant"],
  ["paper fold", "pei per foul"],
  ["path length", "pat lengt"],
  ["hidden support", "hi den sa port"],
  ["occlusion max", "o klu syen maks"],
  ["visual analysis", "vi syu al a na li sis"],
];
const FRASA = [...FRASA_DASAR].sort((a, b) => b[0].length - a[0].length);

const KATA: Record<string, string> = {
  inequality: "ini kuo li ti",
  theorem: "ti o rem",
  hierarchy: "hai rar ki",
  inclusive: "in klu sif",
  concrete: "konkrit",
  pictorial: "pik to ri al",
  abstract: "abstrak",
  story: "sto ri",
  array: "a rei",
  trapezoid: "tra pe zo it",
  rhombus: "rom bus",
  geoboard: "ji o bord",
  property: "pro per ti",
  matrix: "meitriks",
  placeholder: "pleis houl der",
  regrouping: "ri gruping",
  borrowing: "bo ro wing",
  decomposition: "de kom po si syen",
  composition: "kom po si syen",
  attribute: "a tri byut",
  visual: "vi syu al",
  analysis: "a na li sis",
  measurement: "me syur ment",
  division: "di vi syen",
  multiply: "mal ti plai",
  inverse: "in vers",
  chart: "cart",
  blocks: "bloks",
  dienes: "di nes",
  counting: "kaun ting",
  ordering: "or de ring",
  standard: "stan dard",
  addition: "a di syen",
  subtraction: "sab trak syen",
  fluency: "flu en si",
  number: "nam ber",
  line: "lain",
  order: "or der",
  expanded: "eks pan ded",
  form: "form",
  compare: "kom per",
  leftmost: "lef mous",
  flexible: "flek si bel",
  grouping: "gruping",
  angle: "enggel",
  sum: "sam",
  side: "said",
  area: "e ri a",
  model: "mo del",
  rate: "reit",
  unit: "yu nit",
  path: "pat",
  length: "lengt",
  paper: "pei per",
  fold: "foul",
  error: "e ror",
  hunt: "hant",
  hidden: "hi den",
  support: "sa port",
  occlusion: "o klu syen",
  max: "maks",
  composite: "kom po sit",
  layer: "lei yer",
  benchmark: "benci mark",
  right: "rait",
  protocol: "pro to kol",
  equivalent: "i kui va len",
  table: "tei bel",
  relationship: "ri lei syen syip",
  isoperimetric: "ai so pe ri met rik",
  consistency: "kon sis ten si",
  symbol: "sim bol",
  priority: "prai o ri ti",
  place: "pleis",
  value: "velyu",
  parts: "parts",
  additive: "e di tif",
  ordered: "or derd",
  ratio: "rei syio",
  fair: "fer",
  share: "syer",
  groups: "grups",
  equal: "i kuol",
  times: "taims",
  phet: "fet",
  hots: "hots",
  lots: "lots",
  mots: "mots",
  mapping: "maping",
  mind: "main",
  bond: "bond",
  frame: "freim",
  ten: "ten",
  kite: "kait",
  square: "skuer",
  rectangle: "rek tenggel",
  triangle: "trai enggel",
  pentagon: "pen ta gon",
  hexagon: "hek sa gon",
  circle: "ser kel",
  perimeter: "pe ri mi ter",
  volume: "vo lyum",
  fraction: "frak syen",
  decimal: "de si mal",
  percent: "per sen",
  pattern: "pat tern",
  sequence: "si kuens",
  factor: "fak tor",
  multiple: "mal ti pel",
  prime: "praim",
  vertex: "ver teks",
  vertices: "ver ti sis",
  edge: "ej",
  face: "feis",
  base: "beis",
  height: "hait",
  width: "widt",
  parallel: "pa ra lel",
  perpendicular: "per pen di kyu lar",
  acute: "e kyut",
  obtuse: "ob tyus",
  scalene: "skei lin",
  isosceles: "ai so se lis",
  equilateral: "i kui la te ral",
  method: "me tod",
  strategy: "stra te ji",
  algorithm: "al go rit me",
  estimate: "es ti meit",
  exact: "eg zak",
  approximate: "a prok si meit",
  check: "cek",
  verify: "ve ri fai",
  solve: "solv",
  explain: "eks plein",
  reason: "ri zen",
  justify: "jas ti fai",
  conclude: "kon klud",
  summary: "sa ma ri",
  review: "ri vyu",
  practice: "prak tis",
  exam: "eg zam",
  quiz: "kuis",
  challenge: "ca lenj",
  bonus: "bo nus",
  level: "le vel",
  stage: "steij",
  phase: "feis",
  module: "mo dyul",
  chapter: "cap ter",
  lesson: "le sen",
  topic: "to pik",
  concept: "kon sep",
  skill: "skil",
  mastery: "mas te ri",
  progress: "pro gres",
  score: "skor",
  point: "poin",
  points: "poin",
  badge: "bej",
  reward: "ri word",
  leaderboard: "li der bord",
  ranking: "rengking",
  scholarship: "sko lar syip",
  partner: "partner",
  community: "ko myu ni ti",
  school: "skul",
  teacher: "ti cer",
  student: "stu den",
  parent: "pe ren",
  family: "fe mi li",
  household: "haus hould",
  hiele: "hi le",
  van: "fan",
};

/** Kata Indonesia / umum yang tidak boleh diubah. */
const JANGAN = new Set(
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
    "fase",
    "igil",
    "smicpa",
    "indonesia",
    "matematika",
    "metode",
    "luar",
    "tahap",
    "lalu",
    "pembuka",
    "selalu",
    "derajat",
    "sudut",
    "jumlah",
    "hitung",
    "luas",
    "memakai",
    "ayo",
    "menghitung",
    "lima",
    "apel",
    "meja",
  ].map((k) => k.toLowerCase()),
);

function ejaanCadangan(kata: string): string {
  // Heuristik ringan agar huruf Inggris tidak dibaca mentah ala ejaan ID.
  return kata
    .toLowerCase()
    .replace(/tion\b/g, "syen")
    .replace(/sion\b/g, "syen")
    .replace(/ture\b/g, "cer")
    .replace(/ough/g, "af")
    .replace(/ph/g, "f")
    .replace(/th/g, "t")
    .replace(/ck/g, "k")
    .replace(/qu/g, "ku")
    .replace(/x/g, "ks")
    .replace(/ee/g, "i")
    .replace(/oo/g, "u")
    .replace(/ay\b/g, "ei")
    .replace(/ey\b/g, "i")
    .replace(/igh/g, "ai")
    .replace(/([^aeiou])y\b/g, "$1i")
    .replace(/([bcdfghjklmnpqrstvwxyz])\1/g, "$1");
}

function gantiFrasa(teks: string): string {
  let keluar = teks;
  for (const [asal, ejaan] of FRASA) {
    const pola = new RegExp(asal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    keluar = keluar.replace(pola, ejaan);
  }
  return keluar;
}

function gantiKata(teks: string): string {
  return teks.replace(/\b[A-Za-z][A-Za-z'-]*\b/g, (mentah) => {
    const kecil = mentah.toLowerCase();
    if (JANGAN.has(kecil)) return mentah;
    if (KATA[kecil]) return KATA[kecil];
    // Hanya ubah bila tampak istilah Latin/Inggris (bukan kata ID pendek).
    if (kecil.length >= 5 && /(?:tion|sion|ness|ment|ity|ous|ical|ology|graph|angle|equal|multi)/i.test(kecil)) {
      return ejaanCadangan(kecil);
    }
    return mentah;
  });
}

/** Apakah naskah memuat istilah Inggris yang perlu dieja ulang. */
export function adaIstilahInggris(teks: string): boolean {
  const rendah = teks.toLowerCase();
  if (FRASA.some(([asal]) => rendah.includes(asal))) return true;
  return /\b[A-Za-z][A-Za-z'-]*\b/g.test(teks)
    ? [...teks.matchAll(/\b[A-Za-z][A-Za-z'-]*\b/g)].some((m) => {
        const k = m[0].toLowerCase();
        return !JANGAN.has(k) && (!!KATA[k] || (k.length >= 5 && /(?:tion|sion|ness|ment|ity|angle)/i.test(k)));
      })
    : false;
}

/**
 * Hasil siap diucapkan suara Indonesia: frasa/kata Inggris diganti ejaan fonetik ID.
 * Aman dipanggil berulang; teks tanpa Inggris dikembalikan hampir utuh.
 */
export function ejaanInggrisUntukSuaraId(teks: string): string {
  const bersih = teks.replace(/\s+/g, " ").trim();
  if (!bersih) return "";
  return gantiKata(gantiFrasa(bersih)).replace(/\s+/g, " ").trim();
}
