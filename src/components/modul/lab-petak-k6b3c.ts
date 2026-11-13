/**
 * Lab Petak (Kelas 6 Bab 3, Sub-Bab C: Lokasi): logika murni. Satu alat, tiga tampilan.
 *  Lokasi : tulis letak sebuah titik pada kisi, huruf (baris menurun) dulu lalu angka (kolom mendatar) (Grid Coordinate Naming).
 *  Jarak  : selisih huruf ditambah selisih angka, hanya gerak kanan, kiri, naik, atau turun (Manhattan Path Distance).
 *  Jalur  : langkah terpendek, jalur yang sah, dan banyak jalur yang sama pendek (Shortest Grid Path).
 * Kisi: huruf A sampai F dari atas ke bawah, angka 1 sampai 6 dari kiri ke kanan. Letak ditulis seperti "C2".
 * Semua hitungan memakai bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k6b3.mjs.
 */

/** Letak pada kisi, huruf lalu angka, misalnya "C2". */
export type Titik = string;
export type SoalLokasi = { nama: string; t: Titik };
export type SoalJarak = { nama: string; dari: Titik; ke: Titik };
export type SoalJalur = { nama: string; dari: Titik; ke: Titik };

export const HURUF_KISI = "ABCDEF";
export const BANYAK_BARIS = 6;
export const BANYAK_KOLOM = 6;

export const SOAL_LOKASI: SoalLokasi[] = [
  { nama: "kota Makassar", t: "C2" },
  { nama: "meja guru", t: "A3" },
  { nama: "papan tulis", t: "E5" },
  { nama: "pintu kelas", t: "F1" },
  { nama: "kursi Tenri", t: "D2" },
  { nama: "jendela belakang", t: "B6" },
];

export const SOAL_JARAK: SoalJarak[] = [
  { nama: "Tigor ke Tenri", dari: "A3", ke: "E5" },
  { nama: "kubus dipindah", dari: "F1", ke: "D2" },
  { nama: "rak ke meja", dari: "B6", ke: "D3" },
  { nama: "satu kolom sama", dari: "C2", ke: "C4" },
  { nama: "satu baris sama", dari: "A1", ke: "E1" },
  { nama: "titik sama", dari: "B3", ke: "B3" },
];

export const SOAL_JALUR: SoalJalur[] = [
  { nama: "satu belokan", dari: "A1", ke: "B2" },
  { nama: "dua kolom", dari: "A1", ke: "B3" },
  { nama: "dua kali dua", dari: "A1", ke: "C3" },
  { nama: "lurus", dari: "C2", ke: "C4" },
  { nama: "naik ke kanan", dari: "E1", ke: "C3" },
  { nama: "tiga kolom", dari: "A1", ke: "C4" },
];

export const idLokasi = (i: number): string => `lokasi:${i}`;
export const idJarak = (i: number): string => `jarak:${i}`;
export const idJalur = (i: number): string => `jalur:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const hurufDari = (t: Titik): string => t[0];
export const angkaDari = (t: Titik): number => Number(t.slice(1));
/** Nomor baris dari 0: A = 0, B = 1, dan seterusnya. */
export const barisDari = (t: Titik): number => HURUF_KISI.indexOf(t[0]);
const selang = (a: number, b: number): number => (a > b ? a - b : b - a);

export const selisihHuruf = (p: Titik, q: Titik): number => selang(barisDari(p), barisDari(q));
export const selisihAngka = (p: Titik, q: Titik): number => selang(angkaDari(p), angkaDari(q));
export const jarakPetak = (p: Titik, q: Titik): number => selisihHuruf(p, q) + selisihAngka(p, q);

/** Banyak jalur terpendek: tiap petak diisi jumlah dua tetangga yang lebih dekat ke awal (menambah tetangga). */
export const banyakJalur = (p: Titik, q: Titik): number => {
  const dh = selisihHuruf(p, q);
  const da = selisihAngka(p, q);
  const kisi: number[][] = Array.from({ length: dh + 1 }, () => Array.from({ length: da + 1 }, () => 1));
  for (let i = 1; i <= dh; i += 1) for (let j = 1; j <= da; j += 1) kisi[i][j] = kisi[i - 1][j] + kisi[i][j - 1];
  return kisi[dh][da];
};

const arahAngka = (p: Titik, q: Titik): string => (angkaDari(q) >= angkaDari(p) ? "kanan" : "kiri");
const arahHuruf = (p: Titik, q: Titik): string => (barisDari(q) >= barisDari(p) ? "turun" : "naik");

/** Jalur terpendek yang sah: gerak mendatar dulu, lalu gerak menurun atau menaik. Contoh "kanan 2 lalu turun 1". */
export const teksJalurSah = (p: Titik, q: Titik): string => {
  const bagian: string[] = [];
  if (selisihAngka(p, q) > 0) bagian.push(`${arahAngka(p, q)} ${selisihAngka(p, q)}`);
  if (selisihHuruf(p, q) > 0) bagian.push(`${arahHuruf(p, q)} ${selisihHuruf(p, q)}`);
  return bagian.join(" lalu ");
};
/** Jalur yang salah: serong bila bisa (diagonal tidak diizinkan), selain itu berakhir di petak yang keliru. */
export const teksJalurSalah = (p: Titik, q: Titik): string => {
  const dh = selisihHuruf(p, q);
  const da = selisihAngka(p, q);
  const m = dh < da ? dh : da;
  if (m > 0) {
    const sisa = dh > m ? `${arahHuruf(p, q)} ${dh - m}` : da > m ? `${arahAngka(p, q)} ${da - m}` : "";
    return `serong ${arahAngka(p, q)}-${arahHuruf(p, q)} ${m}${sisa ? ` lalu ${sisa}` : ""}`;
  }
  return da > 0 ? `${teksJalurSah(p, q)} lalu turun 1` : `${teksJalurSah(p, q)} lalu kanan 1`;
};
/** Jalur yang sampai tetapi memutar, jadi lebih panjang dari jarak terpendek. */
export const teksJalurPanjang = (p: Titik, q: Titik): string => `${teksJalurSah(p, q)} lalu ${barisDari(q) < BANYAK_BARIS - 1 ? "turun 1 lalu naik 1" : "naik 1 lalu turun 1"}`;

/** Dua pengecoh bilangan: berbeda dari jawaban dan satu sama lain, tidak negatif; cadangan di sekitar jawaban. */
export const pengecohAngka = (benar: number, calon: number[]): [number, number] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2, benar + 4]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return [hasil[0], hasil[1]];
};
/** Dua pengecoh huruf kisi di dekat jawaban, tanpa ganda. */
export const pengecohHuruf = (h: string): [string, string] => {
  const b = HURUF_KISI.indexOf(h);
  const hasil: string[] = [];
  for (const k of [b + 1, b - 1, b + 2, b - 2]) {
    if (k >= 0 && k < BANYAK_BARIS && k !== b && !hasil.includes(HURUF_KISI[k])) hasil.push(HURUF_KISI[k]);
    if (hasil.length === 2) break;
  }
  return [hasil[0], hasil[1]];
};
/** Dua pengecoh angka kolom: nomor huruf (sumbu tertukar), dan angka di sekitar jawaban, dalam 1 sampai 6. */
export const pengecohAngkaKolom = (t: Titik): [number, number] => {
  const a = angkaDari(t);
  const hasil: number[] = [];
  for (const c of [barisDari(t) + 1, a + 1, a - 1, a + 2, a - 2]) {
    if (c >= 1 && c <= BANYAK_KOLOM && c !== a && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return [hasil[0], hasil[1]];
};

const putar3 = <T,>(a: [T, T, T], r: number): [T, T, T] => [a[r % 3], a[(r + 1) % 3], a[(r + 2) % 3]];
export type Pilih3<T> = { opsi: [T, T, T]; benar: number };
function susun3<T>(dasar: [T, T, T], r: number): Pilih3<T> {
  const opsi = putar3(dasar, r);
  return { opsi, benar: opsi.indexOf(dasar[0]) };
}
const angka3 = (benar: number, calon: number[], r: number): Pilih3<number> => {
  const [p, q] = pengecohAngka(benar, calon);
  return susun3([benar, p, q], r);
};

/** Huruf titik. */
export const opsiHurufLokasi = (i: number): Pilih3<string> => {
  const h = hurufDari(SOAL_LOKASI[i].t);
  return susun3([h, ...pengecohHuruf(h)], i);
};
/** Angka titik. */
export const opsiAngkaLokasi = (i: number): Pilih3<number> => {
  const t = SOAL_LOKASI[i].t;
  return susun3([angkaDari(t), ...pengecohAngkaKolom(t)], i + 1);
};
/** Cara menulis letak. Pengecoh: urutan terbalik (angka dulu), dan huruf di sebelahnya. */
export const opsiTulisLokasi = (i: number): Pilih3<string> => {
  const t = SOAL_LOKASI[i].t;
  const b = barisDari(t);
  const sebelah = HURUF_KISI[b < BANYAK_BARIS - 1 ? b + 1 : b - 1];
  return susun3([t, `${angkaDari(t)}${hurufDari(t)}`, `${sebelah}${angkaDari(t)}`], i + 2);
};

/** Selisih huruf, dihitung sebagai langkah petak. Pengecoh: selisih angka (sumbu tertukar), dan jumlah kedua selisih. */
export const opsiSelisihHuruf = (i: number): Pilih3<number> => {
  const s = SOAL_JARAK[i];
  return angka3(selisihHuruf(s.dari, s.ke), [selisihAngka(s.dari, s.ke), jarakPetak(s.dari, s.ke)], i);
};
/** Selisih angka. Pengecoh: selisih huruf, dan jumlah kedua selisih. */
export const opsiSelisihAngka = (i: number): Pilih3<number> => {
  const s = SOAL_JARAK[i];
  return angka3(selisihAngka(s.dari, s.ke), [selisihHuruf(s.dari, s.ke), jarakPetak(s.dari, s.ke)], i + 1);
};
/** Jarak. Pengecoh: yang terbesar saja (seolah diagonal), satu selisih saja, dan jumlah semua koordinat. */
export const opsiJarak = (i: number): Pilih3<number> => {
  const s = SOAL_JARAK[i];
  const dh = selisihHuruf(s.dari, s.ke);
  const da = selisihAngka(s.dari, s.ke);
  const semua = barisDari(s.dari) + 1 + angkaDari(s.dari) + barisDari(s.ke) + 1 + angkaDari(s.ke);
  return angka3(dh + da, [dh > da ? dh : da, dh, semua], i + 2);
};

/** Langkah terpendek. Pengecoh: banyak jalur, dan selisih huruf saja. */
export const opsiLangkah = (i: number): Pilih3<number> => {
  const s = SOAL_JALUR[i];
  return angka3(jarakPetak(s.dari, s.ke), [banyakJalur(s.dari, s.ke), selisihHuruf(s.dari, s.ke), selisihAngka(s.dari, s.ke)], i);
};
/** Jalur yang sah dan terpendek. Pengecoh: jalur serong (atau salah tempat), dan jalur yang memutar. */
export const opsiJalur = (i: number): Pilih3<string> => {
  const s = SOAL_JALUR[i];
  return susun3([teksJalurSah(s.dari, s.ke), teksJalurSalah(s.dari, s.ke), teksJalurPanjang(s.dari, s.ke)], i + 1);
};
/** Banyak jalur terpendek. Pengecoh: langkah terpendek, dan hasil kali kedua selisih. */
export const opsiBanyakJalur = (i: number): Pilih3<number> => {
  const s = SOAL_JALUR[i];
  const dh = selisihHuruf(s.dari, s.ke);
  const da = selisihAngka(s.dari, s.ke);
  return angka3(banyakJalur(s.dari, s.ke), [jarakPetak(s.dari, s.ke), dh * da, jarakPetak(s.dari, s.ke) + 1], i + 2);
};

/* ------------------------------ Keadaan ------------------------------ */

/** Tahap Lokasi: 0 huruf, 1 angka, 2 tulis, 3 selesai. Jarak: 0 selisih huruf, 1 selisih angka, 2 jarak, 3 selesai. Jalur: 0 langkah, 1 jalur, 2 banyak jalur, 3 selesai. */
export type StatePetakK6B3C = {
  lokasi: { data: number; tahap: number };
  jarak: { data: number; tahap: number };
  jalur: { data: number; tahap: number };
  pernah: string[];
  pesan: string;
};

export type AksiPetakK6B3C =
  | { t: "L_DATA"; i: number }
  | { t: "L_HURUF"; o: number }
  | { t: "L_ANGKA"; o: number }
  | { t: "L_TULIS"; o: number }
  | { t: "J_DATA"; i: number }
  | { t: "J_HURUF"; o: number }
  | { t: "J_ANGKA"; o: number }
  | { t: "J_JARAK"; o: number }
  | { t: "R_DATA"; i: number }
  | { t: "R_LANGKAH"; o: number }
  | { t: "R_JALUR"; o: number }
  | { t: "R_BANYAK"; o: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalPetakK6B3C = (): StatePetakK6B3C => ({
  lokasi: { data: 0, tahap: 0 },
  jarak: { data: 0, tahap: 0 },
  jalur: { data: 0, tahap: 0 },
  pernah: [],
  pesan: "",
});

export const soalLokasi = (x: StatePetakK6B3C): SoalLokasi => SOAL_LOKASI[x.lokasi.data];
export const soalJarak = (x: StatePetakK6B3C): SoalJarak => SOAL_JARAK[x.jarak.data];
export const soalJalur = (x: StatePetakK6B3C): SoalJalur => SOAL_JALUR[x.jalur.data];

/* ------------------------------ Lokasi ------------------------------ */

function pilihHurufLokasi(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.lokasi.tahap !== 0) return x;
  const i = x.lokasi.data;
  const t = SOAL_LOKASI[i].t;
  const p = opsiHurufLokasi(i);
  if (o === p.benar) return { ...x, lokasi: { ...x.lokasi, tahap: 1 }, pesan: `✅ Titik berada di baris ${hurufDari(t)}, dibaca dari sumbu huruf yang menurun. Sekarang cari angkanya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Huruf ada di sisi kiri kisi dan menunjukkan barisnya, dari atas ke bawah.` };
}

function pilihAngkaLokasi(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.lokasi.tahap > 1) return x;
  const i = x.lokasi.data;
  if (x.lokasi.tahap < 1) return { ...x, pesan: "Tentukan dulu huruf titiknya." };
  const t = SOAL_LOKASI[i].t;
  const p = opsiAngkaLokasi(i);
  if (o === p.benar) return { ...x, lokasi: { ...x.lokasi, tahap: 2 }, pesan: `✅ Titik berada di kolom ${angkaDari(t)}, dibaca dari angka di sisi atas kisi. Sekarang tulis letaknya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Angka ada di sisi atas kisi dan menunjukkan kolomnya, dari kiri ke kanan.` };
}

function pilihTulisLokasi(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.lokasi.tahap > 2) return x;
  const i = x.lokasi.data;
  if (x.lokasi.tahap < 2) return { ...x, pesan: "Tentukan dulu huruf dan angka titiknya." };
  const t = SOAL_LOKASI[i].t;
  const p = opsiTulisLokasi(i);
  if (o === p.benar) {
    return {
      ...x,
      lokasi: { ...x.lokasi, tahap: 3 },
      pernah: catat(x.pernah, idLokasi(i)),
      pesan: `✅ Letak titik ditulis ${t}: huruf ${hurufDari(t)} dulu, lalu angka ${angkaDari(t)}.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Tulis huruf barisnya lebih dulu, lalu angka kolomnya.` };
}

/* ------------------------------ Jarak ------------------------------ */

function pilihSelisihHuruf(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.jarak.tahap !== 0) return x;
  const i = x.jarak.data;
  const s = SOAL_JARAK[i];
  const p = opsiSelisihHuruf(i);
  if (o === p.benar) return { ...x, jarak: { ...x.jarak, tahap: 1 }, pesan: `✅ Dari baris ${hurufDari(s.dari)} ke baris ${hurufDari(s.ke)} ada ${selisihHuruf(s.dari, s.ke)} langkah petak. Sekarang selisih angkanya.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung berapa petak dari baris ${hurufDari(s.dari)} ke baris ${hurufDari(s.ke)}, satu petak satu langkah.` };
}

function pilihSelisihAngka(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.jarak.tahap > 1) return x;
  const i = x.jarak.data;
  if (x.jarak.tahap < 1) return { ...x, pesan: "Hitung dulu selisih huruf." };
  const s = SOAL_JARAK[i];
  const p = opsiSelisihAngka(i);
  if (o === p.benar) return { ...x, jarak: { ...x.jarak, tahap: 2 }, pesan: `✅ Dari kolom ${angkaDari(s.dari)} ke kolom ${angkaDari(s.ke)} ada ${selisihAngka(s.dari, s.ke)} langkah petak. Sekarang jumlahkan kedua selisih.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Hitung berapa petak dari kolom ${angkaDari(s.dari)} ke kolom ${angkaDari(s.ke)}.` };
}

function pilihJarak(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.jarak.tahap > 2) return x;
  const i = x.jarak.data;
  if (x.jarak.tahap < 2) return { ...x, pesan: "Hitung dulu kedua selisih." };
  const s = SOAL_JARAK[i];
  const p = opsiJarak(i);
  if (o === p.benar) {
    return {
      ...x,
      jarak: { ...x.jarak, tahap: 3 },
      pernah: catat(x.pernah, idJarak(i)),
      pesan: `✅ ${s.dari} ke ${s.ke}: selisih huruf ${selisihHuruf(s.dari, s.ke)} ditambah selisih angka ${selisihAngka(s.dari, s.ke)} sama dengan ${jarakPetak(s.dari, s.ke)} langkah. Hanya gerak kanan, kiri, naik, atau turun.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jarak adalah selisih huruf ditambah selisih angka, bukan yang terbesar saja dan bukan jalan serong.` };
}

/* ------------------------------ Jalur ------------------------------ */

function pilihLangkah(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.jalur.tahap !== 0) return x;
  const i = x.jalur.data;
  const s = SOAL_JALUR[i];
  const p = opsiLangkah(i);
  if (o === p.benar) return { ...x, jalur: { ...x.jalur, tahap: 1 }, pesan: `✅ ${s.dari} ke ${s.ke} butuh paling sedikit ${jarakPetak(s.dari, s.ke)} langkah. Sekarang pilih jalur yang sah dan terpendek.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Langkah terpendek adalah selisih huruf ditambah selisih angka.` };
}

function pilihJalur(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.jalur.tahap > 1) return x;
  const i = x.jalur.data;
  if (x.jalur.tahap < 1) return { ...x, pesan: "Hitung dulu langkah terpendek." };
  const s = SOAL_JALUR[i];
  const p = opsiJalur(i);
  if (o === p.benar) return { ...x, jalur: { ...x.jalur, tahap: 2 }, pesan: `✅ ${teksJalurSah(s.dari, s.ke)} sampai di ${s.ke} dengan ${jarakPetak(s.dari, s.ke)} langkah, tanpa serong dan tanpa memutar. Sekarang hitung banyak jalur yang sama pendek.` };
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Jalur yang sah hanya bergerak kanan, kiri, naik, atau turun, sampai di ${s.ke}, dan tidak lebih panjang dari ${jarakPetak(s.dari, s.ke)} langkah.` };
}

function pilihBanyak(x: StatePetakK6B3C, o: number): StatePetakK6B3C {
  if (!sah(o, 3) || x.jalur.tahap > 2) return x;
  const i = x.jalur.data;
  if (x.jalur.tahap < 2) return { ...x, pesan: "Pilih dulu jalur yang sah dan terpendek." };
  const s = SOAL_JALUR[i];
  const p = opsiBanyakJalur(i);
  if (o === p.benar) {
    return {
      ...x,
      jalur: { ...x.jalur, tahap: 3 },
      pernah: catat(x.pernah, idJalur(i)),
      pesan: `✅ Ada ${banyakJalur(s.dari, s.ke)} jalur terpendek dari ${s.dari} ke ${s.ke}, dihitung dengan menambah dua tetangga di tiap petak. Urutan gerak yang berbeda bisa sama pendek.`,
    };
  }
  return { ...x, pesan: `${p.opsi[o]} belum tepat. Isi tiap petak dengan jumlah dua petak tetangga yang lebih dekat ke awal, mulai dari 1 di tepi.` };
}

/* ------------------------------ Pengatur aksi ------------------------------ */

export function langkahPetakK6B3C(x: StatePetakK6B3C, a: AksiPetakK6B3C): StatePetakK6B3C {
  switch (a.t) {
    case "L_DATA":
      return sah(a.i, SOAL_LOKASI.length) ? { ...x, lokasi: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "L_HURUF":
      return pilihHurufLokasi(x, a.o);
    case "L_ANGKA":
      return pilihAngkaLokasi(x, a.o);
    case "L_TULIS":
      return pilihTulisLokasi(x, a.o);
    case "J_DATA":
      return sah(a.i, SOAL_JARAK.length) ? { ...x, jarak: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "J_HURUF":
      return pilihSelisihHuruf(x, a.o);
    case "J_ANGKA":
      return pilihSelisihAngka(x, a.o);
    case "J_JARAK":
      return pilihJarak(x, a.o);
    case "R_DATA":
      return sah(a.i, SOAL_JALUR.length) ? { ...x, jalur: { data: a.i, tahap: 0 }, pesan: "" } : x;
    case "R_LANGKAH":
      return pilihLangkah(x, a.o);
    case "R_JALUR":
      return pilihJalur(x, a.o);
    case "R_BANYAK":
      return pilihBanyak(x, a.o);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPetakK6B3C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPetakK6B3C = { alat: "petak"; pernah: string[] };
export const keadaanPetakK6B3C = (x: StatePetakK6B3C): KeadaanPetakK6B3C => ({ alat: "petak", pernah: x.pernah });

export const ucapLokasiK6B3C = (x: StatePetakK6B3C): string => {
  const s = soalLokasi(x);
  return `Soal ${s.nama}: cari titik pada kisi. Pilih huruf barisnya, angka kolomnya, lalu tulis letaknya dengan huruf lebih dulu.`;
};
export const ucapJarakK6B3C = (x: StatePetakK6B3C): string => {
  const s = soalJarak(x);
  return `Soal ${s.nama}: dari ${s.dari} ke ${s.ke}. Hitung selisih huruf, selisih angka, lalu jumlahkan. Hanya boleh kanan, kiri, naik, atau turun.`;
};
export const ucapJalurK6B3C = (x: StatePetakK6B3C): string => {
  const s = soalJalur(x);
  return `Soal ${s.nama}: dari ${s.dari} ke ${s.ke}. Cari langkah terpendek, pilih jalur yang sah, lalu hitung banyak jalur yang sama pendek.`;
};
