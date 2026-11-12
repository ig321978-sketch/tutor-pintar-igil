/**
 * Empat definisi Mesin Bertahap Kelas 3 Bab 3 (Pengukuran Panjang dan Berat), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasusnya, jadi kunci tidak
 * mungkin salah hitung. Letak jawaban benar diputar per kasus dan stasiun.
 *  - MESIN_UKUR         (Sub-Bab A): Alat -> Nol -> Baca -> Tulis            (pensil 15, buku 30, lemari 150 cm)
 *  - MESIN_UBAH_PANJANG (Sub-Bab B): Hubungan -> Cara -> Hitung -> Periksa    (3 m, 700 cm, 1 m 17 cm)
 *  - MESIN_TIMBANG      (Sub-Bab C): Nol -> Timbangan -> Baca -> Satuan       (telur 250 g, semangka 3 kg, tepung 1.250 g)
 *  - MESIN_UBAH_BERAT   (Sub-Bab D): Hubungan -> Cara -> Hitung -> Periksa    (3 kg, 1.753 g, 4 kg 150 g)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k3b3.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
export const titikMesin = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Sub-Bab A: Mesin Ukur ------------------------------ */

export type KasusUkur = { id: string; nama: string; cm: number };
export const KASUS_UKUR: KasusUkur[] = [
  { id: "pensil", nama: "Pensil", cm: 15 },
  { id: "buku", nama: "Buku tulis", cm: 30 },
  { id: "lemari", nama: "Lemari", cm: 150 },
];

export const alatUkurTepat = (cm: number): "Penggaris" | "Meteran" => (cm <= 30 ? "Penggaris" : "Meteran");

export const STASIUN_UKUR: StasiunDef[] = [
  { id: "alat", nama: "Alat", ikon: "🧰" },
  { id: "nol", nama: "Nol", ikon: "0️⃣" },
  { id: "baca", nama: "Baca", ikon: "🔍" },
  { id: "tulis", nama: "Tulis", ikon: "✍️" },
];

export function kasusMesinUkur(k: KasusUkur, idx: number): KasusMesin {
  const alat = alatUkurTepat(k.cm);
  const nama = k.nama.toLowerCase();
  const langkah: LangkahMesin[] = [
    {
      stasiun: "alat",
      tanya: `Untuk mengukur ${nama} yang panjangnya ${k.cm} cm, alat ukur yang tepat adalah…`,
      opsi: susunOpsi(alat, ["Penggaris", "Meteran", "Timbangan"].filter((a) => a !== alat), idx),
      benar: alat,
      petunjuk: alat === "Penggaris" ? "Benda sampai 30 cm cukup diukur dengan penggaris. Timbangan untuk mengukur berat, bukan panjang." : "Benda yang lebih panjang dari 30 cm diukur dengan meteran. Timbangan untuk mengukur berat, bukan panjang.",
    },
    {
      stasiun: "nol",
      tanya: `Sebelum membaca panjang ${nama}, ujung kiri benda diletakkan di angka…`,
      opsi: susunOpsi("0", ["3", String(k.cm)], idx + 1),
      benar: "0",
      petunjuk: "Ujung benda harus tepat di angka 0. Kalau mulai dari angka lain, bacaan di ujung yang lain terlalu besar.",
    },
    {
      stasiun: "baca",
      tanya: `Ujung kiri ${nama} di angka 0 dan ujung kanan di angka ${k.cm}. Panjang ${nama} adalah…`,
      opsi: susunOpsi(`${k.cm} cm`, [`${k.cm + 1} cm`, `${k.cm - 1} cm`], idx + 2),
      benar: `${k.cm} cm`,
      petunjuk: "Setelah ujung kiri di angka 0, angka di ujung kanan itulah panjang benda. Baca angkanya dengan teliti.",
    },
    {
      stasiun: "tulis",
      tanya: `Hasil pengukuran ${nama} ditulis dengan satuan…`,
      opsi: susunOpsi(`${k.cm} cm`, [`${k.cm} g`, `${k.cm} detik`], idx),
      benar: `${k.cm} cm`,
      petunjuk: "Panjang ditulis dengan satuan baku panjang, yaitu sentimeter (cm). Gram untuk berat dan detik untuk waktu.",
    },
  ];
  return { id: `ukur-${k.id}`, nama: k.nama, ringkas: `${k.nama} diukur dengan ${alat.toLowerCase()} dari angka 0. Panjangnya ${k.cm} cm.`, langkah };
}

export const MESIN_UKUR: DefMesin = { id: "mesin-ukur-k3b3", judul: "Mesin Ukur", selesaiId: "mesin-ukur", stasiun: STASIUN_UKUR, kasus: KASUS_UKUR.map(kasusMesinUkur) };

/* ------------------------------ Sub-Bab B: Mesin Ubah Panjang ------------------------------ */

export type KasusUbahPanjang =
  | { id: string; tipe: "m-cm"; m: number }
  | { id: string; tipe: "cm-m"; cm: number }
  | { id: string; tipe: "mcm-cm"; m: number; s: number };

export const KASUS_UBAH_PANJANG: KasusUbahPanjang[] = [
  { id: "tiga-meter", tipe: "m-cm", m: 3 },
  { id: "tujuh-ratus", tipe: "cm-m", cm: 700 },
  { id: "azizah", tipe: "mcm-cm", m: 1, s: 17 },
];

export const STASIUN_UBAH: StasiunDef[] = [
  { id: "hubungan", nama: "Hubungan", ikon: "🔗" },
  { id: "cara", nama: "Cara", ikon: "🧭" },
  { id: "hitung", nama: "Hitung", ikon: "🧮" },
  { id: "periksa", nama: "Periksa", ikon: "✅" },
];

export function kasusMesinUbahPanjang(k: KasusUbahPanjang, idx: number): KasusMesin {
  const hubungan: LangkahMesin = {
    stasiun: "hubungan",
    tanya: "Satu meter sama dengan berapa sentimeter?",
    opsi: susunOpsi("100 cm", ["10 cm", "1.000 cm"], idx),
    benar: "100 cm",
    petunjuk: "Pada meteran dari angka 0 sampai 100, panjangnya 100 sentimeter, yaitu 1 meter. Jadi 1 m = 100 cm.",
  };
  if (k.tipe === "m-cm") {
    const hasil = k.m * 100;
    return {
      id: k.id,
      nama: `${k.m} m ke cm`,
      ringkas: `${k.m} m = ${k.m} × 100 cm = ${titikMesin(hasil)} cm.`,
      langkah: [
        hubungan,
        { stasiun: "cara", tanya: `Untuk mengubah ${k.m} m ke sentimeter, kita hitung…`, opsi: susunOpsi(`${k.m} × 100`, [`${k.m} : 100`, `${k.m} + 100`], idx + 1), benar: `${k.m} × 100`, petunjuk: "Meter ke sentimeter: kalikan dengan 100. Sentimeter satuan yang lebih kecil, jadi bilangannya makin besar." },
        { stasiun: "hitung", tanya: `${k.m} × 100 = …`, opsi: susunOpsi(titikMesin(hasil), [titikMesin(hasil / 10), titikMesin(hasil * 10)], idx + 2), benar: titikMesin(hasil), petunjuk: `Kalikan ${k.m} dengan 100: tambahkan dua nol di belakangnya.` },
        { stasiun: "periksa", tanya: "Periksa dengan cara sebaliknya. Kalimat mana yang benar?", opsi: susunOpsi(`${titikMesin(hasil)} : 100 = ${k.m}`, [`${titikMesin(hasil)} : 100 = ${k.m * 10}`, `${titikMesin(hasil)} × 100 = ${k.m}`], idx), benar: `${titikMesin(hasil)} : 100 = ${k.m}`, petunjuk: "Sentimeter ke meter: bagi 100. Hasilnya harus kembali ke bilangan semula." },
      ],
    };
  }
  if (k.tipe === "cm-m") {
    const hasil = k.cm / 100;
    return {
      id: k.id,
      nama: `${k.cm} cm ke m`,
      ringkas: `${k.cm} cm : 100 = ${hasil} m.`,
      langkah: [
        hubungan,
        { stasiun: "cara", tanya: `Untuk mengubah ${k.cm} cm ke meter, kita hitung…`, opsi: susunOpsi(`${k.cm} : 100`, [`${k.cm} × 100`, `${k.cm} − 100`], idx + 1), benar: `${k.cm} : 100`, petunjuk: "Sentimeter ke meter: bagi dengan 100. Meter satuan yang lebih besar, jadi bilangannya makin kecil." },
        { stasiun: "hitung", tanya: `${k.cm} : 100 = …`, opsi: susunOpsi(String(hasil), [String(hasil * 10), String(hasil * 100)], idx + 2), benar: String(hasil), petunjuk: `Bagi ${k.cm} dengan 100: hilangkan dua nol di belakangnya.` },
        { stasiun: "periksa", tanya: "Periksa dengan cara sebaliknya. Kalimat mana yang benar?", opsi: susunOpsi(`${hasil} × 100 = ${k.cm}`, [`${hasil} × 10 = ${k.cm}`, `${hasil} : 100 = ${k.cm}`], idx), benar: `${hasil} × 100 = ${k.cm}`, petunjuk: "Meter ke sentimeter: kali 100. Hasilnya harus kembali ke bilangan semula." },
      ],
    };
  }
  const hasil = k.m * 100 + k.s;
  return {
    id: k.id,
    nama: `${k.m} m ${k.s} cm ke cm`,
    ringkas: `${k.m} m ${k.s} cm = ${k.m * 100} cm + ${k.s} cm = ${hasil} cm.`,
    langkah: [
      hubungan,
      { stasiun: "cara", tanya: `Untuk menulis ${k.m} m ${k.s} cm dengan sentimeter saja, kita hitung…`, opsi: susunOpsi(`${k.m * 100} + ${k.s}`, [`${k.m * 100} × ${k.s}`, `${k.m * 100} − ${k.s}`], idx + 1), benar: `${k.m * 100} + ${k.s}`, petunjuk: `${k.m} m sama dengan ${k.m * 100} cm. Lalu tambahkan sentimeter yang ada, ${k.s} cm.` },
      { stasiun: "hitung", tanya: `${k.m * 100} + ${k.s} = …`, opsi: susunOpsi(String(hasil), [String(hasil - 10), String(hasil + 100)], idx + 2), benar: String(hasil), petunjuk: "Jumlahkan seratus dengan sentimeternya. Hati-hati dengan puluhan dan satuan." },
      { stasiun: "periksa", tanya: "Periksa dengan cara sebaliknya. Kalimat mana yang benar?", opsi: susunOpsi(`${hasil} − ${k.m * 100} = ${k.s}`, [`${hasil} − ${k.m * 100} = ${k.s + 10}`, `${hasil} + ${k.m * 100} = ${k.s}`], idx), benar: `${hasil} − ${k.m * 100} = ${k.s}`, petunjuk: "Kurangkan meternya lagi. Sisanya harus kembali ke sentimeter semula." },
    ],
  };
}

export const MESIN_UBAH_PANJANG: DefMesin = { id: "mesin-ubah-panjang-k3b3", judul: "Mesin Ubah Panjang", selesaiId: "mesin-ubah-panjang", stasiun: STASIUN_UBAH, kasus: KASUS_UBAH_PANJANG.map(kasusMesinUbahPanjang) };

/* ------------------------------ Sub-Bab C: Mesin Timbang ------------------------------ */

export type KasusTimbang = { id: string; nama: string; g: number };
export const KASUS_TIMBANG: KasusTimbang[] = [
  { id: "telur", nama: "Telur", g: 250 },
  { id: "semangka", nama: "Semangka", g: 3000 },
  { id: "tepung", nama: "Tepung", g: 1250 },
];

/** Digital untuk benda ringan atau berat yang tidak bulat kilogram. Duduk untuk benda berat yang bulat kilogram. */
export const timbanganTepatMesin = (g: number): "Timbangan digital" | "Timbangan duduk" => (g >= 2000 && g % 1000 === 0 ? "Timbangan duduk" : "Timbangan digital");

export const STASIUN_TIMBANG: StasiunDef[] = [
  { id: "nol", nama: "Nol", ikon: "0️⃣" },
  { id: "timbangan", nama: "Timbangan", ikon: "⚖️" },
  { id: "baca", nama: "Baca", ikon: "🔍" },
  { id: "satuan", nama: "Satuan", ikon: "🏷️" },
];

export function kasusMesinTimbang(k: KasusTimbang, idx: number): KasusMesin {
  const tepat = timbanganTepatMesin(k.g);
  const duduk = tepat === "Timbangan duduk";
  const nama = k.nama.toLowerCase();
  const baca = duduk ? `${k.g / 1000} kg` : `${titikMesin(k.g)} g`;
  const bacaSalah: [string, string] = duduk ? [`${k.g / 1000 + 1} kg`, `${k.g / 1000 - 1} kg`] : [`${titikMesin(k.g + 50)} g`, `${titikMesin(k.g - 50)} g`];
  const nolSalah = duduk ? ["1", String(k.g / 1000)] : ["50", String(k.g)];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "nol",
      tanya: `Sebelum menimbang ${nama}, ${duduk ? "jarum" : "layar"} harus menunjukkan angka…`,
      opsi: susunOpsi("0", nolSalah, idx),
      benar: "0",
      petunjuk: "Timbangan harus mulai dari angka 0. Kalau tidak, bacaannya sudah tertambah dan hasilnya keliru.",
    },
    {
      stasiun: "timbangan",
      tanya: `Untuk menimbang ${nama} yang beratnya ${titikMesin(k.g)} g, timbangan yang tepat adalah…`,
      opsi: susunOpsi(tepat, ["Timbangan digital", "Timbangan duduk", "Penggaris"].filter((t) => t !== tepat), idx + 1),
      benar: tepat,
      petunjuk: duduk ? "Benda berat dengan berat bulat kilogram cocok ditimbang dengan timbangan duduk berjarum. Penggaris mengukur panjang." : "Benda ringan atau berat yang tidak bulat kilogram mudah dibaca di timbangan digital. Penggaris mengukur panjang.",
    },
    {
      stasiun: "baca",
      tanya: `${duduk ? "Jarum" : "Layar"} menunjukkan ${baca} setelah dimulai dari nol. Berat ${nama} adalah…`,
      opsi: susunOpsi(baca, bacaSalah, idx + 2),
      benar: baca,
      petunjuk: "Bila timbangan mulai dari nol, angka yang ditunjukkan jarum atau layar itulah beratnya. Baca dengan teliti.",
    },
    {
      stasiun: "satuan",
      tanya: `Berat ${nama} ditulis dengan satuan…`,
      opsi: susunOpsi(baca, [duduk ? `${k.g / 1000} cm` : `${titikMesin(k.g)} cm`, duduk ? `${k.g / 1000} m` : `${titikMesin(k.g)} m`], idx),
      benar: baca,
      petunjuk: "Berat ditulis dengan satuan baku berat, yaitu gram (g) atau kilogram (kg). Sentimeter dan meter untuk panjang.",
    },
  ];
  return { id: `timbang-${k.id}`, nama: k.nama, ringkas: `${k.nama} ditimbang dengan ${tepat.toLowerCase()} dari angka 0. Beratnya ${baca}.`, langkah };
}

export const MESIN_TIMBANG: DefMesin = { id: "mesin-timbang-k3b3", judul: "Mesin Timbang", selesaiId: "mesin-timbang", stasiun: STASIUN_TIMBANG, kasus: KASUS_TIMBANG.map(kasusMesinTimbang) };

/* ------------------------------ Sub-Bab D: Mesin Ubah Berat ------------------------------ */

export type KasusUbahBerat =
  | { id: string; tipe: "kg-g"; kg: number }
  | { id: string; tipe: "g-kgg"; g: number }
  | { id: string; tipe: "kgg-g"; kg: number; s: number };

export const KASUS_UBAH_BERAT: KasusUbahBerat[] = [
  { id: "tiga-kg", tipe: "kg-g", kg: 3 },
  { id: "tepung-meutia", tipe: "g-kgg", g: 1753 },
  { id: "empat-kg", tipe: "kgg-g", kg: 4, s: 150 },
];

export const STASIUN_UBAH_BERAT: StasiunDef[] = [
  { id: "hubungan", nama: "Hubungan", ikon: "🔗" },
  { id: "cara", nama: "Cara", ikon: "🧭" },
  { id: "hitung", nama: "Hitung", ikon: "🧮" },
  { id: "periksa", nama: "Periksa", ikon: "✅" },
];

export function kasusMesinUbahBerat(k: KasusUbahBerat, idx: number): KasusMesin {
  const hubunganSoal: [string, string, [string, string], string][] = [
    ["Satu kilogram sama dengan berapa gram?", "1.000 g", ["100 g", "10 g"], "Satu kilogram sama dengan seribu gram. Pada timbangan kodok, bandul 1 kg beratnya 1.000 g."],
    ["Satu kilogram sama dengan berapa ons?", "10 ons", ["100 ons", "1 ons"], "Satu kilogram sama dengan sepuluh ons. Sepuluh bandul satu ons sama beratnya dengan satu bandul satu kilogram."],
    ["Satu ons sama dengan berapa gram?", "100 g", ["10 g", "1.000 g"], "Satu ons sama dengan seratus gram. Sepuluh ons sama dengan seribu gram."],
  ];
  const h = hubunganSoal[idx % hubunganSoal.length];
  const hubungan: LangkahMesin = { stasiun: "hubungan", tanya: h[0], opsi: susunOpsi(h[1], h[2], idx), benar: h[1], petunjuk: h[3] };
  if (k.tipe === "kg-g") {
    const hasil = k.kg * 1000;
    return {
      id: k.id,
      nama: `${k.kg} kg ke g`,
      ringkas: `${k.kg} kg = ${k.kg} × 1.000 g = ${titikMesin(hasil)} g.`,
      langkah: [
        hubungan,
        { stasiun: "cara", tanya: `Untuk mengubah ${k.kg} kg ke gram, kita hitung…`, opsi: susunOpsi(`${k.kg} × 1.000`, [`${k.kg} : 1.000`, `${k.kg} + 1.000`], idx + 1), benar: `${k.kg} × 1.000`, petunjuk: "Kilogram ke gram: kalikan dengan 1.000. Gram satuan yang lebih kecil, jadi bilangannya makin besar." },
        { stasiun: "hitung", tanya: `${k.kg} × 1.000 = …`, opsi: susunOpsi(titikMesin(hasil), [titikMesin(hasil / 10), titikMesin(hasil * 10)], idx + 2), benar: titikMesin(hasil), petunjuk: `Kalikan ${k.kg} dengan 1.000: tambahkan tiga nol di belakangnya.` },
        { stasiun: "periksa", tanya: "Periksa dengan cara sebaliknya. Kalimat mana yang benar?", opsi: susunOpsi(`${titikMesin(hasil)} : 1.000 = ${k.kg}`, [`${titikMesin(hasil)} : 1.000 = ${k.kg * 10}`, `${titikMesin(hasil)} : 100 = ${k.kg}`], idx), benar: `${titikMesin(hasil)} : 1.000 = ${k.kg}`, petunjuk: "Gram ke kilogram: ambil tiap 1.000 gram sebagai 1 kilogram. Hasilnya harus kembali ke bilangan semula." },
      ],
    };
  }
  if (k.tipe === "g-kgg") {
    const kg = Math.floor(k.g / 1000);
    const s = k.g % 1000;
    const hasil = `${kg} kg ${s} g`;
    return {
      id: k.id,
      nama: `${titikMesin(k.g)} g ke kg dan g`,
      ringkas: `${titikMesin(k.g)} g = ${titikMesin(kg * 1000)} g + ${s} g = ${hasil}.`,
      langkah: [
        hubungan,
        { stasiun: "cara", tanya: `Untuk mengubah ${titikMesin(k.g)} g ke kilogram dan gram, kita hitung…`, opsi: susunOpsi(`${titikMesin(k.g)} − 1.000`, [`${titikMesin(k.g)} + 1.000`, `${titikMesin(k.g)} × 1.000`], idx + 1), benar: `${titikMesin(k.g)} − 1.000`, petunjuk: "Ambil tiap 1.000 gram sebagai 1 kilogram. Sisanya tetap dalam gram." },
        { stasiun: "hitung", tanya: `${titikMesin(k.g)} g sama dengan…`, opsi: susunOpsi(hasil, [`${kg} kg ${s % 100} g`, `${kg * 10 + Math.floor(s / 100)} kg ${s % 100} g`], idx + 2), benar: hasil, petunjuk: "Seribu gram menjadi 1 kilogram. Sisa gramnya ditulis di belakang. Jangan memotong angkanya." },
        { stasiun: "periksa", tanya: "Periksa dengan cara sebaliknya. Kalimat mana yang benar?", opsi: susunOpsi(`${titikMesin(kg * 1000)} + ${s} = ${titikMesin(k.g)}`, [`${titikMesin(kg * 1000)} + ${s} = ${titikMesin(k.g + 100)}`, `${titikMesin(kg * 1000)} + ${s} = ${titikMesin(k.g - 100)}`], idx), benar: `${titikMesin(kg * 1000)} + ${s} = ${titikMesin(k.g)}`, petunjuk: "Jumlahkan lagi gramnya. Hasilnya harus kembali ke berat semula." },
      ],
    };
  }
  const hasil = k.kg * 1000 + k.s;
  return {
    id: k.id,
    nama: `${k.kg} kg ${k.s} g ke g`,
    ringkas: `${k.kg} kg ${k.s} g = ${titikMesin(k.kg * 1000)} g + ${k.s} g = ${titikMesin(hasil)} g.`,
    langkah: [
      hubungan,
      { stasiun: "cara", tanya: `Untuk menulis ${k.kg} kg ${k.s} g dengan gram saja, kita hitung…`, opsi: susunOpsi(`${k.kg} × 1.000 + ${k.s}`, [`${k.kg} × 100 + ${k.s}`, `${k.kg} + ${k.s}`], idx + 1), benar: `${k.kg} × 1.000 + ${k.s}`, petunjuk: "Ubah kilogramnya ke gram dengan mengalikan 1.000, lalu tambahkan gram yang ada." },
      { stasiun: "hitung", tanya: `${k.kg} × 1.000 + ${k.s} = …`, opsi: susunOpsi(titikMesin(hasil), [titikMesin(k.kg * 100 + k.s), titikMesin(k.kg * 1000 + k.s / 10)], idx + 2), benar: titikMesin(hasil), petunjuk: "Hitung kilogramnya dulu, baru tambahkan gramnya. Jaga letak titik ribuan." },
      { stasiun: "periksa", tanya: "Periksa dengan cara sebaliknya. Kalimat mana yang benar?", opsi: susunOpsi(`${titikMesin(hasil)} − ${titikMesin(k.kg * 1000)} = ${k.s}`, [`${titikMesin(hasil)} − ${titikMesin(k.kg * 1000)} = ${k.s * 10}`, `${titikMesin(hasil)} + ${titikMesin(k.kg * 1000)} = ${k.s}`], idx), benar: `${titikMesin(hasil)} − ${titikMesin(k.kg * 1000)} = ${k.s}`, petunjuk: "Kurangkan kilogramnya lagi. Sisanya harus kembali ke gram semula." },
    ],
  };
}

export const MESIN_UBAH_BERAT: DefMesin = { id: "mesin-ubah-berat-k3b3", judul: "Mesin Ubah Berat", selesaiId: "mesin-ubah-berat", stasiun: STASIUN_UBAH_BERAT, kasus: KASUS_UBAH_BERAT.map(kasusMesinUbahBerat) };

export const SEMUA_MESIN_K3B3: DefMesin[] = [MESIN_UKUR, MESIN_UBAH_PANJANG, MESIN_TIMBANG, MESIN_UBAH_BERAT];
