export type ItemPaketLengkap = {
  lambang?: string;
  nama: string;
  latin?: string;
  artinya?: string;
};

export type PaketLengkap = {
  id: string;
  judul: string;
  jenis: "huruf" | "ayat" | "daftar";
  pola: RegExp;
  item: ItemPaketLengkap[];
};

export type DaftarLengkapTampil = {
  judul: string;
  jenis: PaketLengkap["jenis"];
  item: ItemPaketLengkap[];
};

export const HIJAIYAH: ItemPaketLengkap[] = [
  { lambang: "ا", nama: "Alif" },
  { lambang: "ب", nama: "Ba" },
  { lambang: "ت", nama: "Ta" },
  { lambang: "ث", nama: "Tsa" },
  { lambang: "ج", nama: "Jim" },
  { lambang: "ح", nama: "Ha" },
  { lambang: "خ", nama: "Kha" },
  { lambang: "د", nama: "Dal" },
  { lambang: "ذ", nama: "Dzal" },
  { lambang: "ر", nama: "Ra" },
  { lambang: "ز", nama: "Zai" },
  { lambang: "س", nama: "Sin" },
  { lambang: "ش", nama: "Syin" },
  { lambang: "ص", nama: "Shad" },
  { lambang: "ض", nama: "Dhad" },
  { lambang: "ط", nama: "Tha" },
  { lambang: "ظ", nama: "Zha" },
  { lambang: "ع", nama: "Ain" },
  { lambang: "غ", nama: "Ghain" },
  { lambang: "ف", nama: "Fa" },
  { lambang: "ق", nama: "Qaf" },
  { lambang: "ك", nama: "Kaf" },
  { lambang: "ل", nama: "Lam" },
  { lambang: "م", nama: "Mim" },
  { lambang: "ن", nama: "Nun" },
  { lambang: "و", nama: "Wau" },
  { lambang: "ه", nama: "Ha" },
  { lambang: "ء", nama: "Hamzah" },
  { lambang: "ي", nama: "Ya" },
];

export const HIJAIYAH_30: ItemPaketLengkap[] = [
  ...HIJAIYAH.slice(0, 27),
  { lambang: "لا", nama: "Lam-Alif" },
  ...HIJAIYAH.slice(27),
];

export const FATIHAH: ItemPaketLengkap[] = [
  {
    lambang: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    nama: "Ayat 1",
    latin: "Bismillāhirraḥmānirraḥīm",
    artinya: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
  },
  {
    lambang: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    nama: "Ayat 2",
    latin: "Alḥamdulillāhi rabbil'ālamīn",
    artinya: "Segala puji bagi Allah, Tuhan semesta alam.",
  },
  {
    lambang: "الرَّحْمَٰنِ الرَّحِيمِ",
    nama: "Ayat 3",
    latin: "Arraḥmānirraḥīm",
    artinya: "Yang Maha Pengasih, Maha Penyayang.",
  },
  {
    lambang: "مَالِكِ يَوْمِ الدِّينِ",
    nama: "Ayat 4",
    latin: "Māliki yaumiddīn",
    artinya: "Pemilik hari pembalasan.",
  },
  {
    lambang: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    nama: "Ayat 5",
    latin: "Iyyāka na'budu wa iyyāka nasta'īn",
    artinya: "Hanya kepada Engkau kami menyembah dan hanya kepada Engkau kami mohon pertolongan.",
  },
  {
    lambang: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    nama: "Ayat 6",
    latin: "Ihdinaṣṣirāṭalmustaqīm",
    artinya: "Tunjukilah kami jalan yang lurus.",
  },
  {
    lambang: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    nama: "Ayat 7",
    latin: "Ṣirāṭallażīna an'amta 'alaihim ghairilmagḍūbi 'alaihim walāḍḍāllīn",
    artinya:
      "Yaitu jalan orang yang telah Engkau beri nikmat, bukan jalan orang yang dimurkai, dan bukan jalan orang yang sesat.",
  },
];

const IKHLAS: ItemPaketLengkap[] = [
  {
    lambang: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    nama: "Ayat 1",
    artinya: "Katakanlah, Dialah Allah, Yang Maha Esa.",
  },
  {
    lambang: "اللَّهُ الصَّمَدُ",
    nama: "Ayat 2",
    artinya: "Allah tempat meminta segala sesuatu.",
  },
  {
    lambang: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    nama: "Ayat 3",
    artinya: "Dia tidak beranak dan tidak diperanakkan.",
  },
  {
    lambang: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    nama: "Ayat 4",
    artinya: "Dan tidak ada sesuatu yang setara dengan-Nya.",
  },
];

const FALAQ: ItemPaketLengkap[] = [
  {
    lambang: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
    nama: "Ayat 1",
    artinya: "Katakanlah, aku berlindung kepada Tuhan yang menguasai subuh.",
  },
  {
    lambang: "مِنْ شَرِّ مَا خَلَقَ",
    nama: "Ayat 2",
    artinya: "Dari kejahatan makhluk-Nya.",
  },
  {
    lambang: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
    nama: "Ayat 3",
    artinya: "Dan dari kejahatan malam apabila telah gelap gulita.",
  },
  {
    lambang: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
    nama: "Ayat 4",
    artinya: "Dan dari kejahatan perempuan-perempuan tukang sihir yang meniup pada buhul-buhul.",
  },
  {
    lambang: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    nama: "Ayat 5",
    artinya: "Dan dari kejahatan orang yang dengki apabila ia dengki.",
  },
];

const NAS: ItemPaketLengkap[] = [
  {
    lambang: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    nama: "Ayat 1",
    artinya: "Katakanlah, aku berlindung kepada Tuhan manusia.",
  },
  {
    lambang: "مَلِكِ النَّاسِ",
    nama: "Ayat 2",
    artinya: "Raja manusia.",
  },
  {
    lambang: "إِلَٰهِ النَّاسِ",
    nama: "Ayat 3",
    artinya: "Sembahan manusia.",
  },
  {
    lambang: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    nama: "Ayat 4",
    artinya: "Dari kejahatan bisikan setan yang bersembunyi.",
  },
  {
    lambang: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
    nama: "Ayat 5",
    artinya: "Yang membisikkan kejahatan ke dalam dada manusia.",
  },
  {
    lambang: "مِنَ الْجِنَّةِ وَالنَّاسِ",
    nama: "Ayat 6",
    artinya: "Dari golongan jin dan manusia.",
  },
];

const NAMA_1_20 = [
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
  "sebelas",
  "dua belas",
  "tiga belas",
  "empat belas",
  "lima belas",
  "enam belas",
  "tujuh belas",
  "delapan belas",
  "sembilan belas",
  "dua puluh",
];

const PAKET: PaketLengkap[] = [
  {
    id: "fatihah",
    judul: "7 ayat Surat Al-Fatihah",
    jenis: "ayat",
    pola: /fatihah|fatehah|alfatihah|al[\s-]?fatihah/i,
    item: FATIHAH,
  },
  {
    id: "ikhlas",
    judul: "4 ayat Surat Al-Ikhlas",
    jenis: "ayat",
    pola: /ikhlas|al[\s-]?ikhlas/i,
    item: IKHLAS,
  },
  {
    id: "falaq",
    judul: "5 ayat Surat Al-Falaq",
    jenis: "ayat",
    pola: /falaq|al[\s-]?falaq/i,
    item: FALAQ,
  },
  {
    id: "nas",
    judul: "6 ayat Surat An-Nas",
    jenis: "ayat",
    pola: /(?:^|[^a-z])an[\s-]?nas\b|surat\s+nas\b|surah\s+nas\b/i,
    item: NAS,
  },
  {
    id: "hijaiyah",
    judul: "29 huruf hijaiyah",
    jenis: "huruf",
    pola: /hijaiyah|huruf\s+arab|huruf\s+hijai|cinta al[-\s]?qur/i,
    item: HIJAIYAH,
  },
  {
    id: "rukun-iman",
    judul: "6 rukun iman",
    jenis: "daftar",
    pola: /rukun\s+iman/i,
    item: [
      { nama: "Iman kepada Allah" },
      { nama: "Iman kepada malaikat" },
      { nama: "Iman kepada kitab suci" },
      { nama: "Iman kepada nabi dan rasul" },
      { nama: "Iman kepada hari akhir" },
      { nama: "Iman kepada qada dan qadar" },
    ],
  },
  {
    id: "rukun-islam",
    judul: "5 rukun Islam",
    jenis: "daftar",
    pola: /rukun\s+islam/i,
    item: [
      { nama: "Mengucapkan dua kalimat syahadat" },
      { nama: "Mendirikan salat" },
      { nama: "Menunaikan zakat" },
      { nama: "Berpuasa di bulan Ramadan" },
      { nama: "Naik haji bagi yang mampu" },
    ],
  },
  {
    id: "syahadat",
    judul: "Dua kalimat syahadat",
    jenis: "ayat",
    pola: /syahadat|dua kalimat syahadat/i,
    item: [
      {
        lambang: "أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ",
        nama: "Syahadat tauhid",
        artinya: "Aku bersaksi bahwa tidak ada tuhan selain Allah.",
      },
      {
        lambang: "وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
        nama: "Syahadat rasul",
        artinya: "Dan aku bersaksi bahwa Muhammad adalah utusan Allah.",
      },
    ],
  },
  {
    id: "nabi-25",
    judul: "25 nabi dan rasul",
    jenis: "daftar",
    pola: /nabi dan rasul|25 nabi|rasul panutan/i,
    item: [
      "Adam",
      "Idris",
      "Nuh",
      "Hud",
      "Saleh",
      "Ibrahim",
      "Luth",
      "Ismail",
      "Ishaq",
      "Yaqub",
      "Yusuf",
      "Ayyub",
      "Syuaib",
      "Musa",
      "Harun",
      "Zulkifli",
      "Daud",
      "Sulaiman",
      "Ilyas",
      "Ilyasa",
      "Yunus",
      "Zakaria",
      "Yahya",
      "Isa",
      "Muhammad",
    ].map((nama) => ({ nama })),
  },
  {
    id: "pancasila",
    judul: "5 sila Pancasila",
    jenis: "daftar",
    pola: /pancasila|lima\s+sila|5\s+sila/i,
    item: [
      { nama: "Ketuhanan Yang Maha Esa" },
      { nama: "Kemanusiaan yang adil dan beradab" },
      { nama: "Persatuan Indonesia" },
      {
        nama: "Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan",
      },
      { nama: "Keadilan sosial bagi seluruh rakyat Indonesia" },
    ],
  },
  {
    id: "basmalah",
    judul: "Bacaan basmalah",
    jenis: "ayat",
    pola: /basmalah|bismillah/i,
    item: [
      {
        lambang: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        nama: "Basmalah",
        artinya: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
      },
    ],
  },
  {
    id: "hamdalah",
    judul: "Bacaan hamdalah",
    jenis: "ayat",
    pola: /hamdalah|alhamdulillah/i,
    item: [
      {
        lambang: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        nama: "Hamdalah",
        artinya: "Segala puji bagi Allah, Tuhan semesta alam.",
      },
    ],
  },
  {
    id: "doa-makan",
    judul: "Doa makan",
    jenis: "ayat",
    pola: /doa (sebelum |sesudah )?makan/i,
    item: [
      {
        lambang: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
        nama: "Doa sebelum makan",
        artinya: "Ya Allah, berkahilah rezeki yang Engkau berikan kepada kami dan peliharalah kami dari azab neraka.",
      },
      {
        lambang: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ",
        nama: "Doa sesudah makan",
        artinya: "Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami orang-orang Islam.",
      },
    ],
  },
  {
    id: "doa-tidur",
    judul: "Doa tidur",
    jenis: "ayat",
    pola: /doa (sebelum |bangun )?tidur/i,
    item: [
      {
        lambang: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ",
        nama: "Doa sebelum tidur",
        artinya: "Dengan nama-Mu ya Allah, aku hidup dan aku mati.",
      },
      {
        lambang: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
        nama: "Doa bangun tidur",
        artinya: "Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami, dan kepada-Nya kami dibangkitkan.",
      },
    ],
  },
  {
    id: "bilangan-20",
    judul: "Bilangan 1 sampai 20",
    jenis: "daftar",
    pola: /membilang sampai (dengan )?20\b|bilangan sampai (dengan )?20\b|angka 1 sampai 20/i,
    item: NAMA_1_20.map((nama, i) => ({ lambang: String(i + 1), nama })),
  },
  {
    id: "bilangan-10",
    judul: "Bilangan 1 sampai 10",
    jenis: "daftar",
    pola: /membilang sampai (dengan )?10\b|bilangan sampai (dengan )?10\b|angka 1 sampai 10/i,
    item: NAMA_1_20.slice(0, 10).map((nama, i) => ({
      lambang: String(i + 1),
      nama,
    })),
  },
];

export function cariSemuaPaketLengkap(
  mapel = "",
  materi = "",
): PaketLengkap[] {
  const kunci = `${mapel} ${materi}`.trim();
  if (!kunci) return [];
  return PAKET.filter((item) => item.pola.test(kunci));
}

export function cariPaketLengkap(mapel = "", materi = ""): PaketLengkap | null {
  return cariSemuaPaketLengkap(mapel, materi)[0] ?? null;
}

export function formatBlokLengkap(paket: PaketLengkap): string {
  const baris = paket.item.map((item, i) => {
    const inti = [item.lambang, item.nama].filter(Boolean).join(" | ");
    const latin = item.latin ? `\nLatin: ${item.latin}` : "";
    const arti = item.artinya ? `\nArtinya: ${item.artinya}` : "";
    return `${i + 1}) ${inti}${latin}${arti}`;
  });
  return `LENGKAP: ${paket.judul}\n${baris.join("\n")}`;
}

function adaLambangAngka(naskah: string, lambang: string): boolean {
  return new RegExp(`(?:^|[^0-9])${lambang}(?:[^0-9]|$)`).test(naskah);
}

export function naskahMemuatPaket(teks: string, paket: PaketLengkap): boolean {
  const naskah = teks || "";
  const ketemu = paket.item.filter((item) => {
    if (item.lambang) {
      if (/^\d+$/.test(item.lambang)) return adaLambangAngka(naskah, item.lambang);
      return naskah.includes(item.lambang);
    }
    const nama = item.nama.replace(/^\d+\.\s*/, "").trim();
    return nama.length >= 3 && naskah.toLowerCase().includes(nama.toLowerCase());
  });
  return ketemu.length >= Math.ceil(paket.item.length * 0.9);
}

export function lengkapiNaskahMateri(
  teks: string,
  mapel = "",
  materi = "",
): string {
  const awal = (teks ?? "").trim();
  if (!awal) return awal;
  const paket = cariSemuaPaketLengkap(mapel, materi);
  if (paket.length === 0) return awal;
  let naskah = awal;
  for (const item of paket) {
    if (naskahMemuatPaket(naskah, item)) continue;
    const pola = new RegExp(
      `\\nLENGKAP:\\s*${item.judul.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n[\\s\\S]*?(?=\\nLENGKAP:|$)`,
      "i",
    );
    naskah = naskah.replace(pola, "").trim();
    naskah = `${naskah}\n\n${formatBlokLengkap(item)}`;
  }
  return naskah;
}

function jenisDariJudul(judul: string): PaketLengkap["jenis"] {
  if (/ayat|surat|surah|basmalah|hamdalah|doa|syahadat/i.test(judul)) {
    return "ayat";
  }
  if (/huruf|hijaiyah/i.test(judul)) return "huruf";
  return "daftar";
}

export function parseBlokLengkap(teks: string): DaftarLengkapTampil | null {
  const bersih = teks.replace(/^\uFEFF/, "").trim();
  const kepala = /^LENGKAP:\s*(.+)$/im.exec(bersih);
  if (!kepala) return null;
  const judul = kepala[1].trim();
  const tubuh = bersih.slice(kepala.index! + kepala[0].length);
  const item: ItemPaketLengkap[] = [];
  let terakhir: ItemPaketLengkap | null = null;
  for (const baris of tubuh.split("\n")) {
    const t = baris.trim();
    if (!t) continue;
    if (/^LENGKAP:\s*/i.test(t)) break;
    const latin = /^Latin:\s*(.+)$/i.exec(t);
    if (latin && terakhir) {
      terakhir.latin = latin[1].trim();
      continue;
    }
    const arti = /^Artinya:\s*(.+)$/i.exec(t);
    if (arti && terakhir) {
      terakhir.artinya = arti[1].trim();
      continue;
    }
    const isi = /^\d+\)\s*(.+)$/.exec(t);
    if (!isi) continue;
    const potong = isi[1].split("|").map((x) => x.trim());
    const baru: ItemPaketLengkap =
      potong.length >= 2
        ? { lambang: potong[0], nama: potong[1] }
        : { nama: potong[0] };
    item.push(baru);
    terakhir = baru;
  }
  if (item.length === 0) return null;
  return { judul, jenis: jenisDariJudul(judul), item };
}

export function parseSemuaBlokLengkap(teks: string): DaftarLengkapTampil[] {
  const potong = (teks ?? "").split(/(?=^LENGKAP:\s*)/im);
  return potong
    .map((blok) => parseBlokLengkap(blok))
    .filter((item): item is DaftarLengkapTampil => item !== null);
}

export function potongLengkap(teks: string): {
  tubuh: string;
  lengkap: DaftarLengkapTampil[];
} {
  const naskah = (teks ?? "").trim();
  const cocok = /(?:^|\n)LENGKAP:\s*/i.exec(naskah);
  if (!cocok || cocok.index === undefined) {
    return { tubuh: naskah, lengkap: [] };
  }
  const awal = naskah[cocok.index] === "\n" ? cocok.index + 1 : cocok.index;
  return {
    tubuh: naskah.slice(0, awal).trim(),
    lengkap: parseSemuaBlokLengkap(naskah.slice(awal)),
  };
}

export function teksLisanDaftarLengkap(
  daftar: DaftarLengkapTampil | DaftarLengkapTampil[],
): string {
  const semua = Array.isArray(daftar) ? daftar : [daftar];
  return semua
    .map((paket) => {
      const bagian = [paket.judul];
      for (const item of paket.item) {
        if (item.nama) bagian.push(item.nama);
        if (item.lambang && paket.jenis !== "huruf") bagian.push(item.lambang);
        if (item.latin) bagian.push(item.latin);
        if (item.artinya) bagian.push(`Artinya ${item.artinya}`);
      }
      return bagian.filter(Boolean).join(". ");
    })
    .filter(Boolean)
    .join(" ");
}

export function instruksiPaketLengkap(mapel = "", materi = ""): string {
  const paket = cariSemuaPaketLengkap(mapel, materi);
  const umum =
    "Jika materi punya himpunan tetap (29 huruf, 7 ayat, 5 sila, 6 rukun, 25 nabi, doa utuh), tulis SEMUA anggotanya. DILARANG meringkas dengan dst, selain itu, atau 19 huruf lainnya.";
  if (paket.length === 0) return umum;
  return `${umum}
WAJIB salin blok LENGKAP berikut utuh di akhir naskah (jangan dikurangi):
${paket.map((item) => formatBlokLengkap(item)).join("\n\n")}`;
}
