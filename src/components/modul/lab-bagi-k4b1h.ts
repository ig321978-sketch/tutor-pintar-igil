/**
 * Lab Bagi (Kelas 4 Bab 1, Sub-Bab H: Pembagian sampai 100): logika murni. Satu alat, tiga tampilan.
 *  Wadah    : n benda dibagikan bergiliran ke w wadah (satu putaran = satu benda tiap wadah). Isi tiap wadah dan
 *             sisa DIHITUNG. Percobaan 2, 3, 4, 6, dan 8 wadah dicatat: sisa nol berarti habis dibagi.
 *  Bersusun : pembagian dari puluhan ke satuan. Tiap langkah anak memilih hasil dan sisa; lab menolak hasil yang
 *             terlalu besar, sisa yang keliru, atau sisa yang masih bisa dibagi lagi.
 *  Periksa  : hasil × pembagi + sisa dibandingkan dengan bilangan yang dibagi.
 * Faktor dan kelipatan baru dipakai di Sub-Bab I.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const BATAS_H = 100;
export const BENDA_WADAH = [48, 36, 55];
export const MIN_WADAH = 2;
export const MAKS_WADAH = 9;

/** Soal dari buku (hlm. 44–47) dan dua soal lain. 36 : 4 memerlukan "belum cukup" di puluhan. */
export const SOAL_H: [number, number][] = [
  [48, 4],
  [81, 3],
  [55, 5],
  [96, 3],
  [36, 2],
  [47, 5],
  [36, 4],
];

export const kunciH = (n: number, d: number): string => `${n}:${d}`;
export const lambangH = (n: number): string => String(n);

/** Pembagian dari puluhan ke satuan (2 langkah). Hasil dua angka: puluhan dan satuan. */
export function langkahBagi(n: number, d: number): { cur: number; q: number; r: number }[] {
  const t = Math.floor(n / 10);
  const q1 = Math.floor(t / d);
  const r1 = t - q1 * d;
  const cur2 = r1 * 10 + (n % 10);
  const q2 = Math.floor(cur2 / d);
  return [
    { cur: t, q: q1, r: r1 },
    { cur: cur2, q: q2, r: cur2 - q2 * d },
  ];
}

export const hasilBagi = (n: number, d: number): { hasil: number; sisa: number } => ({ hasil: Math.floor(n / d), sisa: n % d });

/* ------------------------------ Keadaan ------------------------------ */

export type StateBagiK4B1H = {
  nWadah: number;
  w: number;
  sisaBenda: number;
  putaran: number;
  n: number;
  d: number;
  langkah: number;
  hasil: (number | null)[];
  digit: number;
  sisa: number;
  periksa: boolean;
  pernah: string[];
  pesan: string;
};

export type AksiBagiK4B1H =
  | { t: "BENDA"; d: 1 | -1 }
  | { t: "WADAH"; d: 1 | -1 }
  | { t: "PUTARAN" }
  | { t: "HABIS" }
  | { t: "ULANG_WADAH" }
  | { t: "SOAL"; i: number }
  | { t: "DIGIT"; d: 1 | -1 }
  | { t: "SISA"; d: 1 | -1 }
  | { t: "TULIS" }
  | { t: "PERIKSA" }
  | { t: "RESET" };

const wadahBaru = (n: number, w: number) => ({ nWadah: n, w, sisaBenda: n, putaran: 0 });
const soalBaru = (n: number, d: number) => ({ n, d, langkah: 0, hasil: [null, null] as (number | null)[], digit: 0, sisa: 0, periksa: false });

export const awalBagiK4B1H = (): StateBagiK4B1H => ({ ...wadahBaru(BENDA_WADAH[0], 3), ...soalBaru(...SOAL_H[0]), pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
export const selesaiH = (x: StateBagiK4B1H): boolean => x.langkah >= 2;
export const hasilTulisH = (x: StateBagiK4B1H): number | null => (selesaiH(x) ? (x.hasil[0] ?? 0) * 10 + (x.hasil[1] ?? 0) : null);
/** Wadah sudah dibagi sampai sisa lebih kecil dari banyak wadah. */
export const wadahSelesai = (x: StateBagiK4B1H): boolean => x.sisaBenda < x.w;

function catat(x: StateBagiK4B1H): StateBagiK4B1H {
  let p = x.pernah;
  if (wadahSelesai(x) && x.putaran > 0) {
    p = tambah(p, `wadah:${x.nWadah}:${x.w}`);
    p = tambah(p, `${x.sisaBenda === 0 ? "habis" : "bersisa"}:${x.nWadah}:${x.w}`);
  }
  if (selesaiH(x)) {
    p = tambah(p, `bagi:${kunciH(x.n, x.d)}`);
    if (langkahBagi(x.n, x.d)[0].q === 0) p = tambah(p, "belum-cukup");
    if (x.periksa) p = tambah(p, `periksa:${kunciH(x.n, x.d)}`);
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahBagiK4B1H(x: StateBagiK4B1H, a: AksiBagiK4B1H): StateBagiK4B1H {
  switch (a.t) {
    case "BENDA": {
      const i = (BENDA_WADAH.indexOf(x.nWadah) + a.d + BENDA_WADAH.length) % BENDA_WADAH.length;
      return { ...x, ...wadahBaru(BENDA_WADAH[i], x.w), pesan: "" };
    }
    case "WADAH": {
      const v = x.w + a.d;
      if (v < MIN_WADAH || v > MAKS_WADAH) return { ...x, pesan: `Banyak wadah ${MIN_WADAH} sampai ${MAKS_WADAH}.` };
      return { ...x, ...wadahBaru(x.nWadah, v), pesan: "" };
    }
    case "PUTARAN": {
      if (wadahSelesai(x)) return { ...x, pesan: `Sisa ${x.sisaBenda} kurang dari ${x.w} wadah, jadi tidak bisa dibagi sama banyak lagi.` };
      return catat({ ...x, sisaBenda: x.sisaBenda - x.w, putaran: x.putaran + 1, pesan: "" });
    }
    case "HABIS": {
      const { hasil, sisa } = hasilBagi(x.nWadah, x.w);
      return catat({
        ...x,
        sisaBenda: sisa,
        putaran: hasil,
        pesan: sisa === 0 ? `✅ ${x.nWadah} dibagi ${x.w} wadah: tiap wadah ${hasil}, sisa 0. Habis dibagi.` : `${x.nWadah} dibagi ${x.w} wadah: tiap wadah ${hasil}, sisa ${sisa}. Sisa ${sisa} kurang dari ${x.w}, jadi tidak habis dibagi.`,
      });
    }
    case "ULANG_WADAH":
      return { ...x, ...wadahBaru(x.nWadah, x.w), pesan: "" };
    case "SOAL":
      if (a.i < 0 || a.i >= SOAL_H.length) return x;
      return { ...x, ...soalBaru(...SOAL_H[a.i]), pesan: "" };
    case "DIGIT":
      return { ...x, digit: (x.digit + a.d + 10) % 10, pesan: "" };
    case "SISA":
      return { ...x, sisa: (x.sisa + a.d + 10) % 10, pesan: "" };
    case "TULIS": {
      if (selesaiH(x)) return { ...x, pesan: "Semua langkah sudah ditulis. Tekan Periksa atau pilih soal lain." };
      const st = langkahBagi(x.n, x.d)[x.langkah];
      const nama = x.langkah === 0 ? "puluhan" : "satuan";
      const q = x.digit;
      const r = x.sisa;
      if (q === st.q && r === st.r) {
        const hasil = x.hasil.map((v, i) => (i === x.langkah ? q : v));
        const langkah = x.langkah + 1;
        const turun = langkah === 1 ? ` Turunkan ${x.n % 10}.${st.r ? ` Sisa ${st.r} dan angka ${x.n % 10} membentuk ${langkahBagi(x.n, x.d)[1].cur}.` : ` Bilangannya ${langkahBagi(x.n, x.d)[1].cur}.`}` : "";
        const awalKosong = x.langkah === 0 && st.q === 0 ? ` ${st.cur} belum cukup dibagi ${x.d}, jadi hasil puluhan 0.` : "";
        return catat({ ...x, hasil, langkah, digit: 0, sisa: 0, pesan: langkah >= 2 ? `✅ Selesai: ${x.n} : ${x.d} = ${st.q + (hasil[0] ?? 0) * 10}${langkahBagi(x.n, x.d)[1].r ? `, sisa ${langkahBagi(x.n, x.d)[1].r}` : ""}.` : `✅ Langkah ${nama} benar.${awalKosong}${turun}` });
      }
      if (q * x.d > st.cur) return { ...x, pernah: tambah(x.pernah, "terlalu-besar"), pesan: `${x.d} × ${q} = ${x.d * q}, lebih besar dari ${st.cur}. Hasilnya terlalu besar.` };
      if (r !== st.cur - q * x.d) return { ...x, pesan: `Sisa = ${st.cur} − ${x.d} × ${q} = ${st.cur - q * x.d}.` };
      return { ...x, pesan: `Sisa ${r} masih bisa dibagi ${x.d} lagi. Hasilnya bisa lebih besar.` };
    }
    case "PERIKSA":
      if (!selesaiH(x)) return { ...x, pesan: "Selesaikan dulu semua langkah, lalu periksa." };
      return catat({ ...x, periksa: true, pesan: "" });
    case "RESET":
      return awalBagiK4B1H();
  }
}

/* ------------------------------ Laporan, percobaan, dan ucapan ------------------------------ */

export type KeadaanBagiK4B1H = { alat: "bagi"; pernah: string[] };
export const keadaanBagiK4B1H = (x: StateBagiK4B1H): KeadaanBagiK4B1H => ({ alat: "bagi", pernah: x.pernah });

/** Tabel percobaan: isi tiap wadah dan sisa untuk 2 sampai 9 wadah. */
export function tabelPercobaan(n: number): { w: number; isi: number; sisa: number }[] {
  return Array.from({ length: MAKS_WADAH - MIN_WADAH + 1 }, (_, i) => {
    const w = MIN_WADAH + i;
    return { w, isi: Math.floor(n / w), sisa: n % w };
  });
}

export function kalimatPeriksaH(x: StateBagiK4B1H): string {
  const h = hasilTulisH(x) ?? 0;
  const { sisa } = hasilBagi(x.n, x.d);
  const jumlah = h * x.d + sisa;
  return `${h} × ${x.d}${sisa ? ` + ${sisa}` : ""} = ${jumlah}${jumlah === x.n ? `, sama dengan ${x.n}. Benar!` : `, bukan ${x.n}.`}`;
}

export function ucapWadahH(x: StateBagiK4B1H): string {
  return `${x.nWadah} benda, ${x.w} wadah. Tiap wadah sekarang ${x.putaran}, sisa benda ${x.sisaBenda}.${wadahSelesai(x) && x.putaran > 0 ? (x.sisaBenda === 0 ? " Sisa nol, habis dibagi." : ` Sisa ${x.sisaBenda} kurang dari ${x.w}.`) : " Bagikan satu putaran lagi."}`;
}

export function ucapBersusunH(x: StateBagiK4B1H): string {
  if (selesaiH(x)) return `${x.n} : ${x.d} = ${hasilTulisH(x)}${hasilBagi(x.n, x.d).sisa ? `, sisa ${hasilBagi(x.n, x.d).sisa}` : ""}.`;
  const st = langkahBagi(x.n, x.d)[x.langkah];
  return `Langkah ${x.langkah === 0 ? "puluhan" : "satuan"}: ${st.cur} dibagi ${x.d}. Pilih hasil dan sisa, lalu tekan Tulis.`;
}
