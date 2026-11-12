/**
 * Lab Batang (Kelas 4 Bab 6, Sub-Bab B): logika murni. Satu alat, tiga tampilan.
 *  Bangun  : anak memilih langkah sumbu (1, 2, 4, atau 5; sumbu punya 10 garis) lalu mengatur tinggi tiap batang
 *            (ketuk garis, atau tambah dan kurangi satu). Lab menolak langkah yang membuat batang tidak muat.
 *            Batang benar bila tingginya sama dengan nilai data.
 *  Label   : diagram jadi. Anak memilih judul, label sumbu tegak, label sumbu datar, dan arah (tegak atau mendatar).
 *            Pada diagram tegak, sumbu tegak menunjukkan banyak dan sumbu datar menunjukkan kategori; pada diagram
 *            mendatar sebaliknya. Lab menolak label kosong, judul lain, dan sumbu yang tertukar.
 *  Banding : ketuk satu batang (nilai), dua batang (selisih), atau tombol semua (jumlah). Kunci dan pengecoh (lupa
 *            skala = banyak garis, jumlah dikira selisih, salah satu garis) dihitung dari data.
 * Data dari Buku Siswa Kelas IV Bab 6 (sama dengan data-k4b6.ts, dicocokkan di uji). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b6.mjs.
 */

export type KategoriB = { id: string; label: string; nilai: number };
export type Arah = "tegak" | "mendatar";
export type DataB = {
  id: string;
  judul: string;
  satuan: string;
  /** Nama label sumbu kategori dan sumbu banyak. */
  namaKategori: string;
  namaNilai: string;
  kategori: KategoriB[];
};

export const DATA_TRANSPORT: DataB = {
  id: "transport",
  judul: "Alat transportasi",
  satuan: "siswa",
  namaKategori: "alat transportasi",
  namaNilai: "banyak siswa",
  kategori: [
    { id: "jk", label: "jalan kaki", nilai: 8 },
    { id: "sp", label: "sepeda", nilai: 5 },
    { id: "mo", label: "motor", nilai: 7 },
    { id: "bc", label: "lainnya", nilai: 3 },
  ],
};
export const DATA_KELAS_B: DataB = {
  id: "kelas",
  judul: "Siswa per kelas",
  satuan: "siswa",
  namaKategori: "kelas",
  namaNilai: "banyak siswa",
  kategori: [
    { id: "k1", label: "Kelas 1", nilai: 28 },
    { id: "k2", label: "Kelas 2", nilai: 24 },
    { id: "k3", label: "Kelas 3", nilai: 32 },
    { id: "k4", label: "Kelas 4", nilai: 20 },
    { id: "k5", label: "Kelas 5", nilai: 16 },
    { id: "k6", label: "Kelas 6", nilai: 12 },
  ],
};
export const DATA_BUKU_B: DataB = {
  id: "buku",
  judul: "Buku dipinjam",
  satuan: "buku",
  namaKategori: "hari",
  namaNilai: "banyak buku",
  kategori: [
    { id: "sen", label: "Senin", nilai: 10 },
    { id: "sel", label: "Selasa", nilai: 8 },
    { id: "rab", label: "Rabu", nilai: 14 },
    { id: "kam", label: "Kamis", nilai: 6 },
    { id: "jum", label: "Jumat", nilai: 9 },
    { id: "sab", label: "Sabtu", nilai: 5 },
  ],
};

/** Banyak garis sumbu nilai di atas nol. */
export const GARIS = 10;
export const SKALA_SUMBU: number[] = [1, 2, 4, 5];
export const DATA_BANGUN: DataB[] = [DATA_TRANSPORT, DATA_KELAS_B, DATA_BUKU_B];
/** Diagram jadi di Label dan Banding: data, langkah sumbu, dan arah awal. */
export const DATA_LABEL: { data: DataB; skala: number }[] = [
  { data: DATA_TRANSPORT, skala: 1 },
  { data: DATA_BUKU_B, skala: 2 },
];
export const DATA_BANDING: { data: DataB; skala: number; arah: Arah }[] = [
  { data: DATA_BUKU_B, skala: 2, arah: "mendatar" },
  { data: DATA_TRANSPORT, skala: 1, arah: "tegak" },
  { data: DATA_KELAS_B, skala: 4, arah: "tegak" },
];
export const PILIHAN_JUDUL: string[] = ["Alat transportasi", "Buku dipinjam", "Warna kesukaan"];
export const PILIHAN_LABEL: string[] = ["alat transportasi", "banyak siswa", "hari", "banyak buku"];

/** Label yang benar untuk sumbu tegak dan sumbu datar menurut arah. */
export const labelBenar = (d: DataB, arah: Arah): { tegak: string; datar: string } =>
  arah === "tegak" ? { tegak: d.namaNilai, datar: d.namaKategori } : { tegak: d.namaKategori, datar: d.namaNilai };

/* ------------------------------ Banding ------------------------------ */

export type TanyaBanding = { jenis: "nilai" | "selisih" | "jumlah"; kunci: string; tanya: string; benar: string; opsi: string[]; salah: Record<string, string>; lupa: string[] };

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh berbeda dari kunci, diambil berurutan dari calon (bulat, tidak negatif). */
const duaDari = (benar: number, calon: { v: number; pesan: string; lupa?: boolean }[]): { v: number; pesan: string; lupa?: boolean }[] => {
  const hasil: { v: number; pesan: string; lupa?: boolean }[] = [];
  for (const c of calon) if (Number.isInteger(c.v) && c.v >= 0 && c.v !== benar && !hasil.some((h) => h.v === c.v)) hasil.push(c);
  return hasil.slice(0, 2);
};
function rakit(jenis: TanyaBanding["jenis"], kunci: string, tanya: string, benar: number, calon: { v: number; pesan: string; lupa?: boolean }[], geser: number): TanyaBanding {
  const dua = duaDari(benar, calon);
  return {
    jenis,
    kunci,
    tanya,
    benar: String(benar),
    opsi: putar([String(benar), ...dua.map((c) => String(c.v))], geser % 3),
    salah: Object.fromEntries(dua.map((c) => [String(c.v), c.pesan])),
    lupa: dua.filter((c) => c.lupa).map((c) => String(c.v)),
  };
}

/** Pertanyaan Banding dari batang yang dipilih (satu = nilai, dua = selisih) atau semua batang (jumlah). */
export function tanyaBanding(d: DataB, skala: number, pilih: number[], semua: boolean): TanyaBanding | null {
  const k = d.kategori;
  if (semua) {
    const total = k.reduce((a, x) => a + x.nilai, 0);
    const maks = k.reduce((a, x) => (x.nilai > a.nilai ? x : a));
    return rakit(
      "jumlah",
      "jumlah",
      `Berapa ${d.satuan} semuanya?`,
      total,
      [
        { v: maks.nilai, pesan: `${maks.nilai} hanya batang ${maks.label}. Jumlahkan nilai semua batang.` },
        { v: k.length, pesan: `${k.length} adalah banyak batang. Jumlahkan nilai tiap batang.` },
      ],
      1,
    );
  }
  if (pilih.length === 1) {
    const a = k[pilih[0]];
    const garis = a.nilai / skala;
    return rakit(
      "nilai",
      `nilai:${a.id}`,
      `Berapa ${d.satuan} pada batang ${a.label}?`,
      a.nilai,
      [
        ...(skala > 1 ? [{ v: garis, pesan: `Itu banyak garisnya saja. Tiap garis sumbu bernilai ${skala}, jadi ${garis} × ${skala} = ${a.nilai}.`, lupa: true }] : []),
        { v: a.nilai + skala, pesan: `Ujung batang ${a.label} tidak sampai ${a.nilai + skala}. Ikuti ujung batang lurus ke angka sumbu.` },
        { v: a.nilai - skala, pesan: `Ujung batang ${a.label} melewati ${a.nilai - skala}. Ikuti ujung batang lurus ke angka sumbu.` },
      ],
      pilih[0],
    );
  }
  if (pilih.length === 2) {
    const [i, j] = [...pilih].sort((p, q) => p - q);
    const a = k[i];
    const b = k[j];
    const besar = a.nilai >= b.nilai ? a : b;
    const kecil = besar === a ? b : a;
    const selisih = besar.nilai - kecil.nilai;
    return rakit(
      "selisih",
      `selisih:${a.id}-${b.id}`,
      `Berapa selisih ${d.satuan} ${a.label} dan ${b.label}?`,
      selisih,
      [
        { v: besar.nilai + kecil.nilai, pesan: `Itu jumlah, ${besar.nilai} + ${kecil.nilai}. Selisih berarti ${besar.nilai} − ${kecil.nilai}.` },
        ...(skala > 1 ? [{ v: selisih / skala, pesan: `Itu selisih garisnya saja. Tiap garis bernilai ${skala}. Baca nilai kedua batang dulu, lalu kurangkan.`, lupa: true }] : []),
        { v: selisih + skala, pesan: `Bandingkan lagi ujung kedua batang. ${besar.label} ${besar.nilai}, ${kecil.label} ${kecil.nilai}.` },
      ],
      i + j,
    );
  }
  return null;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateBatangK4B6B = {
  bangun: { data: number; skala: number; tinggi: number[] };
  label: { data: number; arah: Arah; judul: string | null; tegak: string | null; datar: string | null };
  banding: { data: number; pilih: number[]; semua: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiBatangK4B6B =
  | { t: "G_DATA"; i: number }
  | { t: "G_SKALA"; s: number }
  | { t: "G_ATUR"; r: number; garis: number }
  | { t: "G_TAMBAH"; r: number }
  | { t: "G_KURANG"; r: number }
  | { t: "G_ULANG" }
  | { t: "G_CEK" }
  | { t: "L_DATA"; i: number }
  | { t: "L_ARAH"; a: Arah }
  | { t: "L_JUDUL"; v: string }
  | { t: "L_TEGAK"; v: string }
  | { t: "L_DATAR"; v: string }
  | { t: "L_CEK" }
  | { t: "D_DATA"; i: number }
  | { t: "D_PILIH"; r: number }
  | { t: "D_SEMUA" }
  | { t: "D_JAWAB"; nilai: string }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const nolTinggi = (i: number): number[] => DATA_BANGUN[i].kategori.map(() => 0);
const labelKosong = (i: number): StateBatangK4B6B["label"] => ({ data: i, arah: "tegak", judul: null, tegak: null, datar: null });

export const awalBatangK4B6B = (): StateBatangK4B6B => ({
  bangun: { data: 0, skala: 1, tinggi: nolTinggi(0) },
  label: labelKosong(0),
  banding: { data: 0, pilih: [], semua: false },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;
const kecil = (t: string): string => `${t[0].toLowerCase()}${t.slice(1)}`;
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataBangun = (x: StateBatangK4B6B): DataB => DATA_BANGUN[x.bangun.data];
export const dataLabel = (x: StateBatangK4B6B): { data: DataB; skala: number } => DATA_LABEL[x.label.data];
export const bandingAktif = (x: StateBatangK4B6B): { data: DataB; skala: number; arah: Arah } => DATA_BANDING[x.banding.data];
export const tanyaAktif = (x: StateBatangK4B6B): TanyaBanding | null => {
  const b = bandingAktif(x);
  return tanyaBanding(b.data, b.skala, x.banding.pilih, x.banding.semua);
};
export const maksSumbu = (skala: number): number => GARIS * skala;

function cekBangun(x: StateBatangK4B6B): StateBatangK4B6B {
  const d = dataBangun(x);
  const s = x.bangun.skala;
  const takMuat = d.kategori.find((k) => k.nilai > maksSumbu(s));
  if (takMuat)
    return {
      ...x,
      pernah: tambah(x.pernah, "tak-muat"),
      pesan: `${kapital(takMuat.label)} ${takMuat.nilai} tidak muat. Sumbu dengan langkah ${s} hanya sampai ${maksSumbu(s)}. Pilih langkah yang lebih besar.`,
    };
  const salah = d.kategori.map((k, i) => ({ k, t: x.bangun.tinggi[i] })).filter(({ k, t }) => t !== k.nilai);
  if (salah.length > 0) {
    const c = salah[0];
    return { ...x, pesan: `Ada ${salah.length} batang belum tepat. Contoh: batang ${c.k.label} setinggi ${c.t}, padahal datanya ${c.k.nilai}.` };
  }
  const lebihKecil = SKALA_SUMBU.filter((v) => v < s && d.kategori.every((k) => k.nilai <= maksSumbu(v)));
  const saran = lebihKecil.length > 0 ? ` Langkah ${lebihKecil[0]} juga memuat semua batang dan lebih mudah dibaca.` : "";
  return {
    ...x,
    pernah: tambah(x.pernah, `bangun:${d.id}:${s}`),
    pesan: `✅ Diagram batang ${kecil(d.judul)} tepat. Langkah sumbu ${s}, sumbu sampai ${maksSumbu(s)}.${saran}`,
  };
}

function aturTinggi(x: StateBatangK4B6B, r: number, nilai: number): StateBatangK4B6B {
  return { ...x, bangun: { ...x.bangun, tinggi: x.bangun.tinggi.map((v, i) => (i === r ? nilai : v)) }, pesan: "" };
}

function cekLabel(x: StateBatangK4B6B): StateBatangK4B6B {
  const { data: d } = dataLabel(x);
  const l = x.label;
  const kosong = [l.judul === null ? "judul" : "", l.tegak === null ? "label sumbu tegak" : "", l.datar === null ? "label sumbu datar" : ""].filter(Boolean);
  if (kosong.length > 0) return { ...x, pesan: `Label belum lengkap: ${kosong.join(", ")} masih kosong. Tanpa label, pembaca tidak tahu apa yang diukur.` };
  if (l.judul !== d.judul) return { ...x, pesan: `Judul "${l.judul}" tidak cocok. Diagram ini tentang ${kecil(d.judul)}.` };
  const benar = labelBenar(d, l.arah);
  if (l.tegak === benar.tegak && l.datar === benar.datar)
    return {
      ...x,
      pernah: tambah(x.pernah, `label:${d.id}:${l.arah}`),
      pesan: `✅ Label lengkap. Diagram batang ${l.arah}: sumbu tegak ${benar.tegak}, sumbu datar ${benar.datar}.`,
    };
  if (l.tegak === benar.datar && l.datar === benar.tegak)
    return {
      ...x,
      pernah: tambah(x.pernah, "tertukar"),
      pesan:
        l.arah === "mendatar"
          ? `Sumbu tertukar. Pada diagram mendatar, batang memanjang ke samping, jadi ${benar.datar} ada di sumbu datar dan ${benar.tegak} di sumbu tegak.`
          : `Sumbu tertukar. Pada diagram tegak, batang naik ke atas, jadi ${benar.tegak} ada di sumbu tegak dan ${benar.datar} di sumbu datar.`,
    };
  return { ...x, pesan: `Ada label sumbu yang tidak cocok dengan data ${kecil(d.judul)}. Sumbu yang satu untuk ${d.namaKategori}, yang lain untuk ${d.namaNilai}.` };
}

function jawabBanding(x: StateBatangK4B6B, nilai: string): StateBatangK4B6B {
  const q = tanyaAktif(x);
  if (!q || !q.opsi.includes(nilai)) return x;
  const d = bandingAktif(x).data;
  if (nilai !== q.benar) return { ...x, pernah: q.lupa.includes(nilai) ? tambah(x.pernah, "lupa-skala") : x.pernah, pesan: q.salah[nilai] };
  return { ...x, pernah: tambah(x.pernah, `banding:${d.id}:${q.kunci}`), pesan: `✅ Tepat, ${q.benar} ${d.satuan}.` };
}

export function langkahBatangK4B6B(x: StateBatangK4B6B, a: AksiBatangK4B6B): StateBatangK4B6B {
  switch (a.t) {
    case "G_DATA":
      return sah(a.i, DATA_BANGUN.length) ? { ...x, bangun: { data: a.i, skala: x.bangun.skala, tinggi: nolTinggi(a.i) }, pesan: "" } : x;
    case "G_SKALA": {
      if (!SKALA_SUMBU.includes(a.s)) return x;
      const maks = maksSumbu(a.s);
      return { ...x, bangun: { ...x.bangun, skala: a.s, tinggi: x.bangun.tinggi.map((v) => Math.min(v, maks)) }, pesan: "" };
    }
    case "G_ATUR":
      if (!sah(a.r, x.bangun.tinggi.length) || !Number.isInteger(a.garis) || a.garis < 0 || a.garis > GARIS) return x;
      return aturTinggi(x, a.r, a.garis * x.bangun.skala);
    case "G_TAMBAH": {
      if (!sah(a.r, x.bangun.tinggi.length)) return x;
      if (x.bangun.tinggi[a.r] >= maksSumbu(x.bangun.skala)) return { ...x, pesan: `Batang sudah di puncak sumbu, ${maksSumbu(x.bangun.skala)}. Kalau kurang, pilih langkah sumbu yang lebih besar.` };
      return aturTinggi(x, a.r, x.bangun.tinggi[a.r] + 1);
    }
    case "G_KURANG":
      if (!sah(a.r, x.bangun.tinggi.length) || x.bangun.tinggi[a.r] === 0) return x;
      return aturTinggi(x, a.r, x.bangun.tinggi[a.r] - 1);
    case "G_ULANG":
      return { ...x, bangun: { ...x.bangun, tinggi: nolTinggi(x.bangun.data) }, pesan: "" };
    case "G_CEK":
      return cekBangun(x);
    case "L_DATA":
      return sah(a.i, DATA_LABEL.length) ? { ...x, label: labelKosong(a.i), pesan: "" } : x;
    case "L_ARAH":
      return a.a === "tegak" || a.a === "mendatar" ? { ...x, label: { ...x.label, arah: a.a }, pesan: "" } : x;
    case "L_JUDUL":
      return PILIHAN_JUDUL.includes(a.v) ? { ...x, label: { ...x.label, judul: a.v }, pesan: "" } : x;
    case "L_TEGAK":
      return PILIHAN_LABEL.includes(a.v) ? { ...x, label: { ...x.label, tegak: a.v }, pesan: "" } : x;
    case "L_DATAR":
      return PILIHAN_LABEL.includes(a.v) ? { ...x, label: { ...x.label, datar: a.v }, pesan: "" } : x;
    case "L_CEK":
      return cekLabel(x);
    case "D_DATA":
      return sah(a.i, DATA_BANDING.length) ? { ...x, banding: { data: a.i, pilih: [], semua: false }, pesan: "" } : x;
    case "D_PILIH": {
      const n = bandingAktif(x).data.kategori.length;
      if (!sah(a.r, n)) return x;
      const p = x.banding.pilih;
      const pilih = p.includes(a.r) ? p.filter((v) => v !== a.r) : p.length >= 2 ? [p[1], a.r] : [...p, a.r];
      return { ...x, banding: { ...x.banding, pilih, semua: false }, pesan: "" };
    }
    case "D_SEMUA":
      return { ...x, banding: { ...x.banding, pilih: [], semua: true }, pesan: "" };
    case "D_JAWAB":
      return jawabBanding(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBatangK4B6B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBatangK4B6B = { alat: "batang"; pernah: string[] };
export const keadaanBatangK4B6B = (x: StateBatangK4B6B): KeadaanBatangK4B6B => ({ alat: "batang", pernah: x.pernah });

export const ucapBangunK4B6B = (x: StateBatangK4B6B): string => {
  const d = dataBangun(x);
  return `Buat diagram batang ${kecil(d.judul)}. Langkah sumbu sekarang ${x.bangun.skala}, jadi sumbu sampai ${maksSumbu(x.bangun.skala)}. Ketuk garis untuk mengatur tinggi batang, atau tambah dan kurangi satu, lalu periksa.`;
};
export const ucapLabelK4B6B = (x: StateBatangK4B6B): string => {
  const { data } = dataLabel(x);
  return `Beri judul dan label sumbu pada diagram batang ${kecil(data.judul)}. Arah sekarang ${x.label.arah}. Lalu periksa.`;
};
export const ucapBandingK4B6B = (x: StateBatangK4B6B): string => {
  const b = bandingAktif(x);
  const q = tanyaAktif(x);
  return `Diagram batang ${kecil(b.data.judul)}, langkah sumbu ${b.skala}. ${q ? q.tanya : "Ketuk satu batang untuk membaca nilainya, dua batang untuk selisih, atau tombol semua untuk jumlah."}`;
};
