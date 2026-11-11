/**
 * Pabrik Pola (Kelas 2 Bab 4, Sub-Bab B): model PhET.
 * Anak menyusun satuan pola (1 sampai 4 unsur) dari tiga unsur tiap jenis, lalu mengatur berapa kali satuan itu
 * diulang. Barisan, kode huruf, tanda satuan, lanjutan, dan kalimat berubah bersama. Pabrik menunjukkan
 * apakah barisannya pola dan berapa satuan terpendeknya. Barisan yang semuanya sama bukan pola.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b4.mjs.
 */

export type JenisPabrik = "warna" | "bentuk" | "gerakan" | "suara";

export const URUT_JENIS: JenisPabrik[] = ["warna", "bentuk", "gerakan", "suara"];

export const NAMA_JENIS: Record<JenisPabrik, string> = { warna: "Warna", bentuk: "Bentuk", gerakan: "Gerakan", suara: "Suara" };

/** Tiga unsur tiap jenis. */
export const PALET: Record<JenisPabrik, string[]> = {
  warna: ["merah", "biru", "kuning"],
  bentuk: ["lingkaran", "persegi", "segitiga"],
  gerakan: ["berdiri", "tanganNaik", "membungkuk"],
  suara: ["keras", "pelan", "diam"],
};

export const NAMA_UNSUR: Record<string, string> = {
  merah: "merah", biru: "biru", kuning: "kuning",
  lingkaran: "lingkaran", persegi: "persegi", segitiga: "segitiga",
  berdiri: "berdiri", tanganNaik: "tangan naik", membungkuk: "membungkuk",
  keras: "tepuk keras", pelan: "tepuk pelan", diam: "diam",
};

export const MAKS_SATUAN = 4;
export const MIN_ULANG = 2;
export const MAKS_ULANG = 5;
export const MAKS_PANJANG = 15;

export const AWAL_JENIS: JenisPabrik = "warna";
export const AWAL_SATUAN: string[] = ["merah", "biru"];
export const AWAL_ULANG = 3;

/** Satuan bawaan saat jenis diganti: dua unsur pertama palet. */
export const satuanBawaan = (jenis: JenisPabrik): string[] => PALET[jenis].slice(0, 2);

/** Paling banyak berapa kali satuan boleh diulang agar barisan muat. */
export const maksUlang = (n: number): number => Math.max(MIN_ULANG, Math.min(MAKS_ULANG, Math.floor(MAKS_PANJANG / Math.max(1, n))));

export const batasUlang = (n: number, ulang: number): number => Math.max(MIN_ULANG, Math.min(maksUlang(n), Math.round(ulang)));

/** Barisan dari satuan yang diulang. */
export const barisan = (satuan: readonly string[], ulang: number): string[] => Array.from({ length: satuan.length * ulang }, (_, i) => satuan[i % satuan.length]);

/** Panjang satuan terpendek p (p <= n/2) sehingga seq[i] sama dengan seq[i mod p]. 0 bila tidak ada. */
export function satuanTerpendek(seq: readonly string[]): number {
  const n = seq.length;
  for (let p = 1; p <= Math.floor(n / 2); p += 1) {
    if (seq.every((t, i) => t === seq[i % p])) return p;
  }
  return 0;
}

/** Pola: berulang teratur dan memuat paling sedikit dua unsur berbeda. */
export const adalahPola = (seq: readonly string[]): boolean => satuanTerpendek(seq) > 0 && new Set(seq).size >= 2;

/** Kode huruf menurut kemunculan pertama: merah biru merah menjadi "ABA". */
export function kodeHuruf(seq: readonly string[]): string {
  const peta = new Map<string, string>();
  return seq
    .map((t) => {
      if (!peta.has(t)) peta.set(t, String.fromCharCode(65 + peta.size));
      return peta.get(t)!;
    })
    .join("");
}

/** Kode huruf dengan spasi: "A A B". */
export const kodeSpasi = (seq: readonly string[]): string => kodeHuruf(seq).split("").join(" ");

/** Unsur berikutnya setelah seq sebanyak n, atau null bila bukan pola. */
export function berikutnya(seq: readonly string[], n = 1): string[] | null {
  const p = satuanTerpendek(seq);
  if (p === 0 || !adalahPola(seq)) return null;
  return Array.from({ length: n }, (_, i) => seq[(seq.length + i) % p]);
}

export type StatusPabrik = { seq: string[]; pola: boolean; terpendek: number; kodeSatuan: string };

export function statusPabrik(satuan: readonly string[], ulang: number): StatusPabrik {
  const seq = barisan(satuan, ulang);
  return { seq, pola: adalahPola(seq), terpendek: satuanTerpendek(seq), kodeSatuan: kodeHuruf(satuan) };
}

export type AturPabrik = { jenis: JenisPabrik; satuan: string[]; ulang: number };

/** Pastikan unsur sesuai jenis dan hitungan di dalam batas. Satuan kosong dikembalikan ke bawaan. */
export function rapikanPabrik(a: AturPabrik): AturPabrik {
  const sah = a.satuan.filter((t) => PALET[a.jenis].includes(t)).slice(0, MAKS_SATUAN);
  const satuan = sah.length > 0 ? sah : satuanBawaan(a.jenis);
  return { jenis: a.jenis, satuan, ulang: batasUlang(satuan.length, a.ulang) };
}

export function gantiJenis(a: AturPabrik, jenis: JenisPabrik): AturPabrik {
  return rapikanPabrik({ jenis, satuan: satuanBawaan(jenis), ulang: a.ulang });
}

export function tambahUnsur(a: AturPabrik, token: string): AturPabrik {
  if (!PALET[a.jenis].includes(token) || a.satuan.length >= MAKS_SATUAN) return a;
  return rapikanPabrik({ ...a, satuan: [...a.satuan, token] });
}

/** Menghapus unsur terakhir. Satuan tidak boleh kosong. */
export function hapusUnsur(a: AturPabrik): AturPabrik {
  if (a.satuan.length <= 1) return a;
  return rapikanPabrik({ ...a, satuan: a.satuan.slice(0, -1) });
}

export const gantiUlang = (a: AturPabrik, ulang: number): AturPabrik => rapikanPabrik({ ...a, ulang });

export const awalPabrik = (): AturPabrik => ({ jenis: AWAL_JENIS, satuan: [...AWAL_SATUAN], ulang: AWAL_ULANG });

export const sebutUnsur = (seq: readonly string[]): string => seq.map((t) => NAMA_UNSUR[t] ?? t).join(", ");

/** Kalimat penjelasan keadaan pabrik. */
export function kalimatPabrik(a: AturPabrik): string {
  const st = statusPabrik(a.satuan, a.ulang);
  const satuan = sebutUnsur(a.satuan);
  if (new Set(a.satuan).size < 2) {
    return a.satuan.length === 1
      ? `Satuan hanya satu unsur: ${satuan}. Semuanya sama, jadi bukan pola. Tambahkan unsur yang berbeda.`
      : `Satuannya ${satuan}. Semua unsurnya sama, jadi bukan pola. Pola butuh paling sedikit dua unsur berbeda.`;
  }
  const ulang = `Diulang ${a.ulang} kali.`;
  if (st.terpendek > 0 && st.terpendek < a.satuan.length) {
    return `Satuan yang kamu susun: ${satuan}. ${ulang} Satuan terpendeknya hanya ${sebutUnsur(a.satuan.slice(0, st.terpendek))}, karena kelompok itu sudah berulang.`;
  }
  return `Satuan polanya: ${satuan}. ${ulang} Kode hurufnya ${kodeSpasi(a.satuan)}.`;
}

/** Ucapan untuk tombol suara, mengikuti kalimat dan, bila menyala, lanjutan. */
export function ucapanPabrik(a: AturPabrik, lanjut: boolean): string {
  const dasar = kalimatPabrik(a);
  if (!lanjut) return dasar;
  const st = statusPabrik(a.satuan, a.ulang);
  const nanti = berikutnya(st.seq, 2);
  return nanti ? `${dasar} Dua unsur berikutnya: ${sebutUnsur(nanti)}.` : `${dasar} Barisan ini bukan pola, jadi tidak ada lanjutannya.`;
}
