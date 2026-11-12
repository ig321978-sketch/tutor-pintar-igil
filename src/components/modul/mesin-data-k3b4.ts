/**
 * Tiga definisi Mesin Bertahap Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data kasusnya, jadi kunci tidak
 * mungkin salah hitung. Letak jawaban benar diputar per kasus dan stasiun.
 *  - MESIN_RUAS  (Sub-Bab A): Jenis -> Nol -> Baca -> Ubah       (AB 5 cm, MN 5 cm 5 mm, PQ 3 cm 7 mm)
 *  - MESIN_SUDUT (Sub-Bab B): Letak -> Baca -> Jenis -> Periksa  (50°, 120°, 300°)
 *  - MESIN_GARIS (Sub-Bab C): Cek -> Hubungan -> Lambang -> Bukti (AB ⊥ BC, EF // GH, PQ dan RS bukan sejajar)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k3b4.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

/* ------------------------------ Sub-Bab A: Mesin Ruas ------------------------------ */

export type KasusRuas = { id: string; nama: string; mm: number };
export const KASUS_RUAS: KasusRuas[] = [
  { id: "ab", nama: "AB", mm: 50 },
  { id: "mn", nama: "MN", mm: 55 },
  { id: "pq", nama: "PQ", mm: 37 },
];

export function teksCmMmMesin(mm: number): string {
  const cm = Math.floor(mm / 10);
  const s = mm % 10;
  if (cm === 0) return `${s} mm`;
  return s === 0 ? `${cm} cm` : `${cm} cm ${s} mm`;
}

export const teksDesimalMesin = (mm: number): string => `${Number.isInteger(mm / 10) ? mm / 10 : String(mm / 10).replace(".", ",")} cm`;

export const STASIUN_RUAS: StasiunDef[] = [
  { id: "jenis", nama: "Jenis", ikon: "📏" },
  { id: "nol", nama: "Nol", ikon: "0️⃣" },
  { id: "baca", nama: "Baca", ikon: "🔍" },
  { id: "ubah", nama: "Ubah", ikon: "🔄" },
];

export function kasusMesinRuas(k: KasusRuas, idx: number): KasusMesin {
  const cm = Math.floor(k.mm / 10);
  const s = k.mm % 10;
  const titik = s === 0 ? `tepat pada angka ${cm}` : `pada angka ${cm} dan ${s} garis kecil sesudahnya`;
  const desimal = idx % 2 === 1;
  const ubah: LangkahMesin = desimal
    ? {
        stasiun: "ubah",
        tanya: `${teksCmMmMesin(k.mm)} sama dengan … cm`,
        opsi: susunOpsi(teksDesimalMesin(k.mm), [`${cm},0${s} cm`, `${k.mm} cm`], idx + 3),
        benar: teksDesimalMesin(k.mm),
        petunjuk: `${s} mm sama dengan 0,${s} cm, karena 1 cm = 10 mm. Jadi ${cm} cm ${s} mm = ${teksDesimalMesin(k.mm)}. Jangan menyisipkan nol.`,
      }
    : {
        stasiun: "ubah",
        tanya: `${teksCmMmMesin(k.mm)} sama dengan … mm`,
        opsi: susunOpsi(`${k.mm} mm`, [`${cm * 100 + s} mm`, `${k.mm + 10} mm`], idx + 3),
        benar: `${k.mm} mm`,
        petunjuk: `Satu sentimeter sama dengan sepuluh milimeter. ${cm} cm = ${cm * 10} mm, lalu tambahkan ${s} mm.`,
      };
  const langkah: LangkahMesin[] = [
    {
      stasiun: "jenis",
      tanya: `Gambar ${k.nama} punya dua titik ujung dan panjang tertentu. Namanya…`,
      opsi: susunOpsi("ruas garis", ["sinar garis", "garis"], idx),
      benar: "ruas garis",
      petunjuk: "Ruas garis punya dua titik ujung dan panjang tetap. Sinar garis berpangkal di satu titik. Garis tidak punya ujung.",
    },
    {
      stasiun: "nol",
      tanya: `Untuk mengukur ${k.nama}, titik ${k.nama[0]} diletakkan tepat di angka…`,
      opsi: susunOpsi("0", ["1", String(cm)], idx + 1),
      benar: "0",
      petunjuk: "Mengukur selalu dimulai dari angka 0. Kalau titik awal di angka lain, bacaan di titik akhir terlalu besar.",
    },
    {
      stasiun: "baca",
      tanya: `Titik ${k.nama[0]} di angka 0 dan titik ${k.nama[1]} berada ${titik}. Panjang ${k.nama} adalah…`,
      opsi: susunOpsi(teksCmMmMesin(k.mm), [teksCmMmMesin(k.mm + 10), teksCmMmMesin(k.mm + 1)], idx + 2),
      benar: teksCmMmMesin(k.mm),
      petunjuk: "Baca angka sentimeternya dulu, lalu hitung garis kecil sesudahnya. Satu garis kecil sama dengan satu milimeter.",
    },
    ubah,
  ];
  return { id: `ruas-${k.id}`, nama: `${k.nama} ${teksCmMmMesin(k.mm)}`, ringkas: `${k.nama} = ${teksCmMmMesin(k.mm)} = ${k.mm} mm = ${teksDesimalMesin(k.mm)}.`, langkah };
}

export const MESIN_RUAS: DefMesin = { id: "mesin-ruas-k3b4", judul: "Mesin Ruas Garis", selesaiId: "mesin-ruas", stasiun: STASIUN_RUAS, kasus: KASUS_RUAS.map(kasusMesinRuas) };

/* ------------------------------ Sub-Bab B: Mesin Sudut ------------------------------ */

export type KasusSudut = { id: string; d: number };
export const KASUS_SUDUT: KasusSudut[] = [
  { id: "lima-puluh", d: 50 },
  { id: "seratus-dua-puluh", d: 120 },
  { id: "tiga-ratus", d: 300 },
];

export function jenisSudutMesin(d: number): string {
  if (d < 90) return "lancip";
  if (d === 90) return "siku-siku";
  if (d < 180) return "tumpul";
  if (d === 180) return "lurus";
  return "refleks";
}

/** Kalimat banding yang benar untuk menentukan jenis, dan dua kalimat salah. */
export function bandingSudut(d: number): { benar: string; salah: [string, string] } {
  const acuan = d > 180 ? 180 : 90;
  const op = d < acuan ? "<" : d === acuan ? "=" : ">";
  const ops = ["<", "=", ">"].filter((o) => o !== op);
  return { benar: `${d}° ${op} ${acuan}°`, salah: [`${d}° ${ops[0]} ${acuan}°`, `${d}° ${ops[1]} ${acuan}°`] };
}

export const STASIUN_SUDUT: StasiunDef[] = [
  { id: "letak", nama: "Letak", ikon: "📍" },
  { id: "baca", nama: "Baca", ikon: "🧭" },
  { id: "jenis", nama: "Jenis", ikon: "🔺" },
  { id: "periksa", nama: "Periksa", ikon: "✅" },
];

export function kasusMesinSudut(k: KasusSudut, idx: number): KasusMesin {
  const jenis = jenisSudutMesin(k.d);
  const refleks = k.d > 180;
  const semuaJenis = ["lancip", "siku-siku", "tumpul", "lurus", "refleks"];
  const lain = semuaJenis.filter((j) => j !== jenis);
  const banding = bandingSudut(k.d);
  const baca: LangkahMesin = refleks
    ? {
        stasiun: "baca",
        tanya: `Busur derajat hanya sampai 180°, jadi ia membaca sudut pasangan ${360 - k.d}°. Sudut refleks ∠AOB adalah…`,
        opsi: susunOpsi(`${k.d}°`, [`${180 - (360 - k.d)}°`, `${360 + (360 - k.d)}°`], idx + 1),
        benar: `${k.d}°`,
        petunjuk: "Sudut refleks sama dengan 360° dikurangi sudut pasangannya. Jadi 360° dikurangi pasangan memberi sudut refleks.",
      }
    : {
        stasiun: "baca",
        tanya: `Kaki OA berimpit dengan garis nol skala luar. Kaki OB melewati angka ${k.d} pada skala luar dan ${180 - k.d} pada skala dalam. Sudut AOB adalah…`,
        opsi: susunOpsi(`${k.d}°`, [`${180 - k.d}°`, `${k.d + 10}°`], idx + 1),
        benar: `${k.d}°`,
        petunjuk: "Baca skala yang dimulai dari garis nol di kaki OA. Skala yang satunya dimulai dari ujung yang lain.",
      };
  const langkah: LangkahMesin[] = [
    {
      stasiun: "letak",
      tanya: "Untuk mengukur ∠AOB, titik tengah busur derajat diletakkan di titik…",
      opsi: susunOpsi("O, titik sudut", ["A, ujung kaki", "B, ujung kaki"], idx),
      benar: "O, titik sudut",
      petunjuk: "Titik tengah busur derajat diletakkan di titik sudut, yaitu O. Pada ∠AOB titik sudutnya selalu huruf di tengah.",
    },
    baca,
    {
      stasiun: "jenis",
      tanya: `Sudut ${k.d}° adalah sudut…`,
      opsi: susunOpsi(jenis, [lain[idx % 4], lain[(idx + 2) % 4]], idx + 2),
      benar: jenis,
      petunjuk: "Bandingkan dengan 90° dan 180°. Kurang dari 90° lancip, tepat 90° siku-siku, antara 90° dan 180° tumpul, tepat 180° lurus, lebih dari 180° refleks.",
    },
    {
      stasiun: "periksa",
      tanya: `Kalimat mana yang benar untuk memeriksa jenis sudut ${k.d}°?`,
      opsi: susunOpsi(banding.benar, banding.salah, idx),
      benar: banding.benar,
      petunjuk: `Bandingkan ${k.d}° dengan ${k.d > 180 ? "180°" : "90°"}. Tanda < berarti kurang dari, = sama dengan, dan > lebih dari.`,
    },
  ];
  return { id: `sudut-${k.id}`, nama: `Sudut ${k.d}°`, ringkas: `Sudut ${k.d}° adalah sudut ${jenis}. ${banding.benar}.`, langkah };
}

export const MESIN_SUDUT: DefMesin = { id: "mesin-sudut-k3b4", judul: "Mesin Sudut", selesaiId: "mesin-sudut", stasiun: STASIUN_SUDUT, kasus: KASUS_SUDUT.map(kasusMesinSudut) };

/* ------------------------------ Sub-Bab C: Mesin Garis ------------------------------ */

export type KasusGaris =
  | { id: string; tipe: "tegak"; a: string; b: string; titik: string }
  | { id: string; tipe: "sejajar" | "bukan"; a: string; b: string; jarak: [number, number] };

export const KASUS_GARIS: KasusGaris[] = [
  { id: "tegak-lurus", tipe: "tegak", a: "AB", b: "BC", titik: "B" },
  { id: "sejajar", tipe: "sejajar", a: "EF", b: "GH", jarak: [2, 2] },
  { id: "bukan", tipe: "bukan", a: "PQ", b: "RS", jarak: [2, 4] },
];

export const STASIUN_GARIS: StasiunDef[] = [
  { id: "cek", nama: "Cek", ikon: "🔎" },
  { id: "hubungan", nama: "Hubungan", ikon: "🔗" },
  { id: "lambang", nama: "Lambang", ikon: "✍️" },
  { id: "bukti", nama: "Bukti", ikon: "✅" },
];

export function kasusMesinGaris(k: KasusGaris, idx: number): KasusMesin {
  const hubungan = k.tipe === "tegak" ? "tegak lurus" : k.tipe === "sejajar" ? "sejajar" : "bukan keduanya";
  const lainHub = ["tegak lurus", "sejajar", "bukan keduanya"].filter((h) => h !== hubungan);
  const lambangBenar = k.tipe === "tegak" ? `${k.a} ⊥ ${k.b}` : k.tipe === "sejajar" ? `${k.a} // ${k.b}` : "tidak ada lambang ⊥ atau //";
  const lambangSalah: [string, string] = k.tipe === "tegak" ? [`${k.a} // ${k.b}`, `${k.a} = ${k.b}`] : k.tipe === "sejajar" ? [`${k.a} ⊥ ${k.b}`, `${k.a} = ${k.b}`] : [`${k.a} // ${k.b}`, `${k.a} ⊥ ${k.b}`];
  const cek: LangkahMesin =
    k.tipe === "tegak"
      ? { stasiun: "cek", tanya: `Untuk memeriksa ${k.a} dan ${k.b}, kita letakkan … di titik ${k.titik}.`, opsi: susunOpsi("pojok kertas lipat", ["timbangan", "jam dinding"], idx), benar: "pojok kertas lipat", petunjuk: "Pojok kertas yang dilipat dua kali adalah sudut siku-siku. Letakkan di pertemuan kedua garis untuk memeriksa tegak lurus." }
      : { stasiun: "cek", tanya: `Untuk memeriksa ${k.a} dan ${k.b}, kita hitung … di kedua ujung.`, opsi: susunOpsi("jarak petak", ["berat garis", "warna garis"], idx), benar: "jarak petak", petunjuk: "Pada kertas berpetak, hitung petak di antara kedua garis di ujung kiri dan di ujung kanan." };
  let bukti: LangkahMesin;
  if (k.tipe === "tegak") {
    bukti = { stasiun: "bukti", tanya: `Pertemuan ${k.a} dan ${k.b} membentuk sudut…`, opsi: susunOpsi("90° (siku-siku)", ["45°", "180°"], idx), benar: "90° (siku-siku)", petunjuk: "Garis tegak lurus bertemu pada sudut siku-siku, yaitu tepat 90°, dan diberi tanda kotak kecil." };
  } else {
    const [kiri, kanan] = k.jarak;
    const sama = kiri === kanan;
    const benar = `${sama ? "sama" : "berbeda"}, jadi ${sama ? "sejajar" : "bukan sejajar"}`;
    const salah: [string, string] = [`${sama ? "berbeda" : "sama"}, jadi ${sama ? "sejajar" : "sejajar"}`, `${sama ? "sama" : "berbeda"}, jadi ${sama ? "bukan sejajar" : "sejajar"}`];
    bukti = { stasiun: "bukti", tanya: `Jarak di ujung kiri ${kiri} petak dan di ujung kanan ${kanan} petak. Jarak keduanya…`, opsi: susunOpsi(benar, salah, idx), benar, petunjuk: "Garis sejajar jaraknya selalu sama. Bila jarak di kedua ujung berbeda, garisnya bukan sejajar." };
  }
  const langkah: LangkahMesin[] = [
    cek,
    { stasiun: "hubungan", tanya: `Hubungan ${k.a} dan ${k.b} adalah…`, opsi: susunOpsi(hubungan, lainHub, idx + 1), benar: hubungan, petunjuk: "Tegak lurus bila bertemu pada sudut siku-siku. Sejajar bila jaraknya selalu sama dan tidak pernah bertemu. Selain itu bukan keduanya." },
    { stasiun: "lambang", tanya: `Lambang yang tepat untuk ${k.a} dan ${k.b} adalah…`, opsi: susunOpsi(lambangBenar, lambangSalah, idx + 2), benar: lambangBenar, petunjuk: "Lambang ⊥ dibaca tegak lurus dan lambang // dibaca sejajar. Bila bukan keduanya, tidak ada lambang yang dipakai." },
    bukti,
  ];
  return { id: `garis-${k.id}`, nama: `${k.a} dan ${k.b}`, ringkas: `${k.a} dan ${k.b}: ${hubungan}.`, langkah };
}

export const MESIN_GARIS: DefMesin = { id: "mesin-garis-k3b4", judul: "Mesin Garis", selesaiId: "mesin-garis", stasiun: STASIUN_GARIS, kasus: KASUS_GARIS.map(kasusMesinGaris) };

export const SEMUA_MESIN_K3B4: DefMesin[] = [MESIN_RUAS, MESIN_SUDUT, MESIN_GARIS];
