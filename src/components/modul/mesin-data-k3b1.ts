/**
 * Enam definisi Mesin Bertahap Kelas 3 Bab 1. Semua pertanyaan dan jawaban DIHITUNG dari bilangan kasusnya,
 * jadi kunci tidak mungkin salah hitung. Letak jawaban benar diputar per kasus dan stasiun.
 *  - MESIN_BACA   (Sub-Bab A): Papan -> Baca -> Tulis        (671, 160, 703, 900)
 *  - MESIN_NILAI  (Sub-Bab B): Tempat -> Nilai -> Urai       (251, 602, 987, 805)
 *  - MESIN_TAMBAH (Sub-Bab D): Susun -> Satuan -> Simpan -> Puluhan
 *  - MESIN_KURANG (Sub-Bab E): Susun -> Satuan -> Ambil -> Puluhan -> Periksa
 *  - MESIN_KALI   (Sub-Bab F): Kelompok -> Tambah -> Kali -> Tukar
 *  - MESIN_BAGI   (Sub-Bab G): Bagikan -> Kurang -> Bagi -> Periksa
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe (Node tidak bisa me-resolve impor nilai tanpa ekstensi),
 * jadi nama bilangan ditulis ulang di sini dan dibandingkan dengan lab-tempat-k3b1.ts di uji.
 */
import type { DefMesin, KasusMesin, LangkahMesin } from "./mesin-bertahap-k3b1";

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

export function kataBil(n: number): string {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SATUAN[p]} puluh` : `${SATUAN[p]} puluh ${SATUAN[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kataBil(sisa)}`;
}

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const dig = (n: number) => ({ r: Math.floor(n / 100), p: Math.floor((n % 100) / 10), s: n % 10 });
const dariDigit = (r: number, p: number, s: number) => 100 * r + 10 * p + s;

/** Pengecoh bilangan tiga angka: tukar tempat, buang nol, geser. Selalu dua bilangan berbeda dan bukan n. */
export function pengecohBilangan(n: number, utamakanTanpaNol: boolean): number[] {
  const { r, p, s } = dig(n);
  const tanpaNol = Number(String(n).replace(/0/g, "") || "0");
  const kandidat = [
    ...(utamakanTanpaNol ? [tanpaNol] : []),
    dariDigit(r, s, p),
    dariDigit(p, r, s),
    dariDigit(s, p, r),
    ...(utamakanTanpaNol ? [] : [tanpaNol]),
    n + 10,
    n - 10,
    n + 1,
    n - 1,
    n + 100,
    n - 100,
  ];
  const hasil: number[] = [];
  for (const c of kandidat) {
    if (c >= 0 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return hasil;
}

/* ------------------------------ Sub-Bab A ------------------------------ */

function kasusBaca(n: number, idx: number): KasusMesin {
  const { r, p, s } = dig(n);
  const kata = kataBil(n);
  const benarPapan = `${r} | ${p} | ${s}`;
  const salahPapan = [`${s} | ${p} | ${r}`, `${p} | ${r} | ${s}`];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "papan",
      tanya: `Papan memuat ${r} ratusan, ${p} puluhan, dan ${s} satuan. Angka di tiga tempat (ratusan | puluhan | satuan) adalah…`,
      opsi: susunOpsi(benarPapan, salahPapan, idx),
      benar: benarPapan,
      petunjuk: "Baca dari kiri: ratusan dulu, lalu puluhan, lalu satuan. Setiap tempat punya satu angka.",
    },
    {
      stasiun: "baca",
      tanya: `Bilangan ${n} dibaca…`,
      opsi: susunOpsi(kata, pengecohBilangan(n, false).map(kataBil), idx + 1),
      benar: kata,
      petunjuk: "Baca dari kiri. Sebut ratusannya, lalu puluhannya, lalu satuannya. Angka nol tidak disebut.",
    },
    {
      stasiun: "tulis",
      tanya: `Bilangan "${kata}" ditulis dengan angka…`,
      opsi: susunOpsi(String(n), pengecohBilangan(n, true).map(String), idx + 2),
      benar: String(n),
      petunjuk: "Tulis tiap tempat satu angka. Kalau ada tempat yang kosong, isi dengan nol supaya angka lain tidak bergeser.",
    },
  ];
  return { id: `baca-${n}`, nama: `Bilangan ${n}`, ringkas: `${n} dibaca ${kata}. Ditulis ${n}.`, langkah };
}

export const MESIN_BACA: DefMesin = {
  id: "mesin-baca-k3b1",
  judul: "Mesin Baca-Tulis",
  selesaiId: "mesin-baca",
  stasiun: [
    { id: "papan", nama: "Papan", ikon: "🗂️" },
    { id: "baca", nama: "Baca", ikon: "🗣️" },
    { id: "tulis", nama: "Tulis", ikon: "✍️" },
  ],
  kasus: [671, 160, 703, 900].map(kasusBaca),
};

/* ------------------------------ Sub-Bab B ------------------------------ */

type Fokus = "r" | "p" | "s";
const NAMA_FOKUS: Record<Fokus, string> = { r: "ratusan", p: "puluhan", s: "satuan" };
const KALI_FOKUS: Record<Fokus, number> = { r: 100, p: 10, s: 1 };

function kasusNilai(n: number, fokus: Fokus, idx: number): KasusMesin {
  const d = dig(n);
  const angka = d[fokus];
  const nilai = angka * KALI_FOKUS[fokus];
  const urai = `${100 * d.r} + ${10 * d.p} + ${d.s}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tempat",
      tanya: `Pada ${n}, angka ${angka} ada di tempat…`,
      opsi: susunOpsi(NAMA_FOKUS[fokus], (["ratusan", "puluhan", "satuan"] as const).filter((t) => t !== NAMA_FOKUS[fokus]).map(String), idx),
      benar: NAMA_FOKUS[fokus],
      petunjuk: `Hitung tempat dari kanan: satuan, puluhan, ratusan. Angka ${angka} pada ${n} ada di ${NAMA_FOKUS[fokus]}.`,
    },
    {
      stasiun: "nilai",
      tanya: `Nilai angka ${angka} pada ${n} adalah…`,
      opsi: susunOpsi(
        String(nilai),
        [100, 10, 1].map((k) => angka * k).filter((v) => v !== nilai).map(String),
        idx + 1
      ),
      benar: String(nilai),
      petunjuk: `Nilai bergantung pada tempatnya. Angka ${angka} di ${NAMA_FOKUS[fokus]} bernilai ${angka} dikali ${KALI_FOKUS[fokus]}.`,
    },
    {
      stasiun: "urai",
      tanya: `${n} diuraikan menjadi…`,
      opsi: susunOpsi(urai, [`${d.r} + ${d.p} + ${d.s}`, `${10 * d.r} + ${100 * d.p} + ${d.s}`], idx + 2),
      benar: urai,
      petunjuk: "Uraikan dengan nilai tiap angka, bukan angkanya saja: ratusan dikali 100, puluhan dikali 10, satuan apa adanya.",
    },
  ];
  return { id: `nilai-${n}`, nama: `Bilangan ${n}`, ringkas: `${n} = ${urai}. Angka ${angka} bernilai ${nilai}.`, langkah };
}

export const MESIN_NILAI: DefMesin = {
  id: "mesin-nilai-k3b1",
  judul: "Mesin Angka dan Nilai",
  selesaiId: "mesin-nilai",
  stasiun: [
    { id: "tempat", nama: "Tempat", ikon: "📍" },
    { id: "nilai", nama: "Nilai", ikon: "🔢" },
    { id: "urai", nama: "Urai", ikon: "🧩" },
  ],
  kasus: [
    kasusNilai(251, "p", 0),
    kasusNilai(602, "r", 1),
    kasusNilai(987, "s", 2),
    kasusNilai(805, "r", 3),
  ],
};

/* ------------------------------ Sub-Bab D ------------------------------ */

function kasusTambah(a: number, b: number, idx: number): KasusMesin {
  const ap = Math.floor(a / 10);
  const as = a % 10;
  const bp = Math.floor(b / 10);
  const bs = b % 10;
  const ss = as + bs;
  const simpan = ss >= 10;
  const tulis = simpan ? ss - 10 : ss;
  const tp = ap + bp + (simpan ? 1 : 0);
  const hasil = a + b;
  const benarSimpan = simpan ? `Tulis ${tulis}, simpan 1 puluhan` : `Tulis ${ss}, tidak menyimpan`;
  const salahSimpan = simpan ? [`Tulis ${ss}, tidak menyimpan`, `Tulis ${tulis}, tidak menyimpan`] : [`Tulis ${ss}, simpan 1 puluhan`, "Tulis 0, simpan 1 puluhan"];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "susun",
      tanya: `${b} ditulis di bawah ${a}. Satuan ${bs} harus lurus dengan angka berapa?`,
      opsi: susunOpsi(String(as), [String(ap), String(a)], idx),
      benar: String(as),
      petunjuk: "Satuan lurus dengan satuan, puluhan lurus dengan puluhan. Lihat angka paling kanan pada bilangan pertama.",
    },
    {
      stasiun: "satuan",
      tanya: `Jumlahkan satuan dulu: ${as} + ${bs} = ?`,
      opsi: susunOpsi(String(ss), [String(ss - 1), String(ss + 1)], idx + 1),
      benar: String(ss),
      petunjuk: `Hitung lagi satuannya: ${as} ditambah ${bs}.`,
    },
    {
      stasiun: "simpan",
      tanya: `Jumlah satuan ${ss}. Apa yang dilakukan?`,
      opsi: susunOpsi(benarSimpan, salahSimpan, idx + 2),
      benar: benarSimpan,
      petunjuk: simpan
        ? "Sepuluh satuan ditukar dengan satu puluhan. Tulis sisa satuannya, lalu simpan satu puluhan untuk kolom puluhan."
        : "Satuannya kurang dari sepuluh, jadi semuanya ditulis di tempat satuan. Tidak ada puluhan yang disimpan.",
    },
    {
      stasiun: "puluhan",
      tanya: `Jumlahkan puluhan${simpan ? " dan simpanan" : ""}: ${ap} + ${bp}${simpan ? " + 1" : ""} = ?`,
      opsi: susunOpsi(String(tp), [String(tp - 1), String(tp + 1)], idx + 3),
      benar: String(tp),
      petunjuk: simpan ? "Jangan lupa puluhan yang disimpan. Tambahkan 1 ke jumlah puluhan." : "Jumlahkan puluhan dengan puluhan.",
    },
  ];
  return { id: `tambah-${a}-${b}`, nama: `${a} + ${b}`, ringkas: `${a} + ${b} = ${hasil}. ${simpan ? "Satuan menyimpan 1 puluhan." : "Tanpa menyimpan."}`, langkah };
}

export const MESIN_TAMBAH: DefMesin = {
  id: "mesin-tambah-k3b1",
  judul: "Mesin Susun Tambah",
  selesaiId: "mesin-tambah",
  stasiun: [
    { id: "susun", nama: "Susun", ikon: "📚" },
    { id: "satuan", nama: "Satuan", ikon: "1️⃣" },
    { id: "simpan", nama: "Simpan", ikon: "🔁" },
    { id: "puluhan", nama: "Puluhan", ikon: "🔟" },
  ],
  kasus: [
    kasusTambah(23, 16, 0),
    kasusTambah(48, 16, 1),
    kasusTambah(54, 29, 2),
    kasusTambah(61, 27, 3),
  ],
};

/* ------------------------------ Sub-Bab E ------------------------------ */

function kasusKurang(a: number, b: number, idx: number): KasusMesin {
  const ap = Math.floor(a / 10);
  const as = a % 10;
  const bp = Math.floor(b / 10);
  const bs = b % 10;
  const ambil = as < bs;
  const atas = as + (ambil ? 10 : 0);
  const sat = atas - bs;
  const pa = ap - (ambil ? 1 : 0);
  const pul = pa - bp;
  const hasil = a - b;
  const cukup = `Cukup, ${as} tidak kurang dari ${bs}`;
  const takCukup = `Tidak cukup, ${as} kurang dari ${bs}`;
  const abaikan = "Tidak perlu dilihat, langsung kurangi puluhan";
  const langkah: LangkahMesin[] = [
    {
      stasiun: "susun",
      tanya: `${b} ditulis di bawah ${a}. Satuan ${bs} harus lurus dengan angka berapa?`,
      opsi: susunOpsi(String(as), [String(ap), String(a)], idx),
      benar: String(as),
      petunjuk: "Satuan lurus dengan satuan, puluhan lurus dengan puluhan. Lihat angka paling kanan pada bilangan pertama.",
    },
    {
      stasiun: "satuan",
      tanya: `Satuan atas ${as}, satuan bawah ${bs}. Cukupkah untuk dikurangi?`,
      opsi: susunOpsi(ambil ? takCukup : cukup, ambil ? [cukup, abaikan] : [takCukup, abaikan], idx + 1),
      benar: ambil ? takCukup : cukup,
      petunjuk: ambil ? `${as} lebih kecil dari ${bs}, jadi satuan atas belum cukup. Kita perlu mengambil satu puluhan.` : `${as} tidak lebih kecil dari ${bs}, jadi satuan atas sudah cukup.`,
    },
    {
      stasiun: "ambil",
      tanya: ambil ? `Ambil 1 puluhan. Satuan atas menjadi ${atas}. ${atas} − ${bs} = ?` : `Tidak perlu mengambil. ${as} − ${bs} = ?`,
      opsi: susunOpsi(String(sat), [String(sat - 1), String(sat + 1)], idx + 2),
      benar: String(sat),
      petunjuk: ambil ? `Satu puluhan sama dengan sepuluh satuan, jadi ${as} menjadi ${atas}. Kurangkan lagi.` : "Kurangkan satuan atas dengan satuan bawah.",
    },
    {
      stasiun: "puluhan",
      tanya: ambil ? `Puluhan tinggal ${pa} karena satu diambil. ${pa} − ${bp} = ?` : `Puluhan: ${ap} − ${bp} = ?`,
      opsi: susunOpsi(String(pul), [String(pul - 1), String(pul + 1)], idx + 3),
      benar: String(pul),
      petunjuk: ambil ? "Satu puluhan sudah diambil, jadi puluhan atas berkurang satu sebelum dikurangi." : "Kurangkan puluhan atas dengan puluhan bawah.",
    },
    {
      stasiun: "periksa",
      tanya: `Periksa hasilnya: ${hasil} + ${b} = ?`,
      opsi: susunOpsi(String(a), [String(a - 10), String(a + 10)], idx + 4),
      benar: String(a),
      petunjuk: "Hasil ditambah bilangan pengurang harus kembali ke bilangan awal. Coba hitung lagi.",
    },
  ];
  return { id: `kurang-${a}-${b}`, nama: `${a} − ${b}`, ringkas: `${a} − ${b} = ${hasil}. ${ambil ? "Satuan mengambil 1 puluhan." : "Tanpa mengambil."} Periksa: ${hasil} + ${b} = ${a}.`, langkah };
}

export const MESIN_KURANG: DefMesin = {
  id: "mesin-kurang-k3b1",
  judul: "Mesin Susun Kurang",
  selesaiId: "mesin-kurang",
  stasiun: [
    { id: "susun", nama: "Susun", ikon: "📚" },
    { id: "satuan", nama: "Satuan", ikon: "1️⃣" },
    { id: "ambil", nama: "Ambil", ikon: "🔓" },
    { id: "puluhan", nama: "Puluhan", ikon: "🔟" },
    { id: "periksa", nama: "Periksa", ikon: "✅" },
  ],
  kasus: [
    kasusKurang(25, 12, 0),
    kasusKurang(45, 19, 1),
    kasusKurang(62, 28, 2),
    kasusKurang(74, 31, 3),
  ],
};

/* ------------------------------ Sub-Bab F ------------------------------ */

function kasusKali(a: number, b: number, nama: string, idx: number): KasusMesin {
  const p = a * b;
  const benarKel = `${a} kelompok, isi ${b}`;
  const benarKali = `${a} × ${b} = ${p}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "kelompok",
      tanya: `${nama}: ada ${a} wadah, tiap wadah berisi ${b}. Berapa kelompok dan berapa isi tiap kelompok?`,
      opsi: susunOpsi(benarKel, [`${b} kelompok, isi ${a}`, `${a} kelompok, isi ${a}`], idx),
      benar: benarKel,
      petunjuk: "Satu wadah satu kelompok. Banyak kelompok sama dengan banyak wadah. Isi tiap kelompok adalah banyak benda dalam satu wadah.",
    },
    {
      stasiun: "tambah",
      tanya: `Jumlahkan ${b} sebanyak ${a} kali. Hasilnya?`,
      opsi: susunOpsi(String(p), [String(p - b), String(p + b)], idx + 1),
      benar: String(p),
      petunjuk: `Tambahkan ${b} berulang kali, sebanyak ${a} kali. Hitung pelan-pelan satu kelompok demi satu kelompok.`,
    },
    {
      stasiun: "kali",
      tanya: "Perkalian adalah cara singkat penjumlahan berulang. Kalimat mana yang cocok?",
      opsi: susunOpsi(benarKali, [`${a} + ${b} = ${a + b}`, `${a} × ${b} = ${p - b}`], idx + 2),
      benar: benarKali,
      petunjuk: "Banyak kelompok dikali isi tiap kelompok. Hasilnya sama dengan penjumlahan berulang tadi.",
    },
    {
      stasiun: "tukar",
      tanya: `Tukar tempat: ${b} × ${a} = ?`,
      opsi: susunOpsi(String(p), [String(a + b), String(p + a)], idx + 3),
      benar: String(p),
      petunjuk: "Menukar tempat dua bilangan pada perkalian tidak mengubah hasilnya. Hasilnya sama dengan perkalian tadi.",
    },
  ];
  return { id: `kali-${a}-${b}`, nama: `${nama}: ${a} × ${b}`, ringkas: `${a} × ${b} = ${p}, dan ${b} × ${a} = ${p}.`, langkah };
}

export const MESIN_KALI: DefMesin = {
  id: "mesin-kali-k3b1",
  judul: "Mesin Kelompok",
  selesaiId: "mesin-kali",
  stasiun: [
    { id: "kelompok", nama: "Kelompok", ikon: "🍽️" },
    { id: "tambah", nama: "Tambah", ikon: "➕" },
    { id: "kali", nama: "Kali", ikon: "✖️" },
    { id: "tukar", nama: "Tukar", ikon: "🔄" },
  ],
  kasus: [
    kasusKali(5, 2, "Pensil Andi", 0),
    kasusKali(4, 5, "Melati Meutia", 1),
    kasusKali(3, 7, "Kerikil Galih", 2),
    kasusKali(5, 6, "Mobil Alen", 3),
  ],
};

/* ------------------------------ Sub-Bab G ------------------------------ */

function kasusBagi(n: number, k: number, nama: string, idx: number): KasusMesin {
  const q = n / k;
  const benarBagi = `${n} : ${k} = ${q}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "bagikan",
      tanya: `${nama}: ${n} benda dibagikan ke ${k} wadah. Satu putaran, tiap wadah mendapat 1. Berapa benda terpakai?`,
      opsi: susunOpsi(String(k), [String(k + 1), String(k + 2)], idx),
      benar: String(k),
      petunjuk: `Ada ${k} wadah dan tiap wadah mendapat 1 benda. Jadi satu putaran memakai ${k} benda.`,
    },
    {
      stasiun: "kurang",
      tanya: `${k} dikurangkan dari ${n} berulang sampai habis. Berapa kali?`,
      opsi: susunOpsi(String(q), [String(q - 1), String(q + 1)], idx + 1),
      benar: String(q),
      petunjuk: `Kurangi ${n} dengan ${k} terus-menerus dan hitung berapa kali, sampai tidak ada yang tersisa.`,
    },
    {
      stasiun: "bagi",
      tanya: "Kalimat pembagian mana yang cocok?",
      opsi: susunOpsi(benarBagi, [`${n} : ${q} = ${k}`, `${n} − ${k} = ${n - k}`], idx + 2),
      benar: benarBagi,
      petunjuk: "Bilangan yang dibagi ditulis pertama, lalu pembagi. Pembagi adalah banyak wadah.",
    },
    {
      stasiun: "periksa",
      tanya: `Periksa dengan perkalian: ${q} × ${k} = ?`,
      opsi: susunOpsi(String(n), [String(n + k), String(n + q)], idx + 3),
      benar: String(n),
      petunjuk: "Hasil bagi dikali pembagi harus kembali ke bilangan yang dibagi. Coba hitung lagi.",
    },
  ];
  return { id: `bagi-${n}-${k}`, nama: `${nama}: ${n} : ${k}`, ringkas: `${n} : ${k} = ${q}. Periksa: ${q} × ${k} = ${n}.`, langkah };
}

export const MESIN_BAGI: DefMesin = {
  id: "mesin-bagi-k3b1",
  judul: "Mesin Bagikan Bergiliran",
  selesaiId: "mesin-bagi",
  stasiun: [
    { id: "bagikan", nama: "Bagikan", ikon: "🍽️" },
    { id: "kurang", nama: "Kurang", ikon: "➖" },
    { id: "bagi", nama: "Bagi", ikon: "➗" },
    { id: "periksa", nama: "Periksa", ikon: "✅" },
  ],
  kasus: [
    kasusBagi(12, 2, "Biskuit Ibu", 0),
    kasusBagi(15, 3, "Manik-manik", 1),
    kasusBagi(28, 7, "Kelereng Alfa", 2),
    kasusBagi(5, 1, "Satu Wadah", 3),
  ],
};

export const SEMUA_MESIN_K3B1: DefMesin[] = [MESIN_BACA, MESIN_NILAI, MESIN_TAMBAH, MESIN_KURANG, MESIN_KALI, MESIN_BAGI];
