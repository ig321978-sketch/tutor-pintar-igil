/**
 * Pengeja suara Kelas 3 Bab 4: bilangan sampai 999 dan desimal (5,5), tanda hitung, derajat (50°), lambang (⊥, //, ∠),
 * dan satuan (cm, mm) dieja supaya enak dibaca Suara Guru. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k3b4.mjs.
 */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

export function kataBil(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999) return String(n);
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) {
    const s = n % 10;
    return s === 0 ? `${SATUAN[Math.floor(n / 10)]} puluh` : `${SATUAN[Math.floor(n / 10)]} puluh ${SATUAN[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kataBil(sisa)}`;
}

export function ejaK3B4(teks: string): string {
  return teks
    .replace(/∠([A-Z])([A-Z])([A-Z])/g, "sudut $1 $2 $3")
    .replace(/ ⊥ /g, " tegak lurus ")
    .replace(/ \/\/ /g, " sejajar ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ : /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/…/g, "titik-titik")
    .replace(/(\d+),(\d+)/g, (_m, a: string, b: string) => `${a} koma ${b.split("").map((d) => SATUAN[Number(d)]).join(" ")}`)
    .replace(/(\d)°/g, "$1 derajat")
    .replace(/\bcm\b/g, "sentimeter")
    .replace(/\bmm\b/g, "milimeter")
    .replace(/\d+/g, (d) => (/^\d+$/.test(d) && d.length <= 3 && !(d.length > 1 && d.startsWith("0")) ? kataBil(Number(d)) : d));
}
