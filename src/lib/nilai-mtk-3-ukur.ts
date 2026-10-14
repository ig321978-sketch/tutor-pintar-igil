import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/[.,]/g, ""));
}

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function kata(teks: string, kataCari: string): boolean {
  return new RegExp(`(?:^|\\s)${kataCari}(?:\\s|$)`).test(` ${biasa(teks)} `);
}

export function jawabPensil(teks: string): boolean {
  const k = biasa(teks);
  if (/meja|koin|peta|kota|pintu/.test(k)) return false;
  return kata(teks, "pensil");
}

export function jawabGula(teks: string): boolean {
  const k = biasa(teks);
  return /gula/.test(k) && !/koin/.test(k);
}

export function jawabMeteranPita(teks: string): boolean {
  const k = biasa(teks);
  return k.includes("meteran pita") && !/penggaris|roda/.test(k);
}

export function jawabMeter(teks: string): boolean {
  const k = ` ${biasa(teks)} `;
  if (/sentimeter|milimeter|kilometer/.test(k)) return false;
  if (/(?:^|\s)cm(?:\s|$)|(?:^|\s)mm(?:\s|$)|(?:^|\s)km(?:\s|$)/.test(k)) return false;
  return /(?:^|\s)meter(?:\s|$)/.test(k) || /(?:^|\s)m(?:\s|$)/.test(k);
}

export function jawabGram(teks: string): boolean {
  const k = biasa(teks);
  if (/kilogram|kilo/.test(k)) return false;
  return kata(teks, "gram");
}

export function jawabMeteranRoda(teks: string): boolean {
  const k = biasa(teks);
  return (k.includes("meteran roda") || kata(teks, "roda")) && !/penggaris|pita/.test(k);
}

function ratusSatuan(teks: string, bilangan: string, satuan: string): boolean {
  const k = biasa(teks);
  if (!k.includes(`${bilangan} ratus`)) return false;
  if (new RegExp(`${bilangan} ribu|${bilangan} puluh|${bilangan} belas`).test(k)) return false;
  return k.includes(satuan);
}

export function jawabTigaRatusCm(teks: string): boolean {
  return ratusSatuan(teks, "tiga", "sentimeter") || (angkaUtuh(teks, "300") && /sentimeter|(?:^|\s)cm(?:\s|$)/.test(` ${biasa(teks)} `));
}

export function jawabEmpatRatusCm(teks: string): boolean {
  return ratusSatuan(teks, "empat", "sentimeter") || (angkaUtuh(teks, "400") && /sentimeter|(?:^|\s)cm(?:\s|$)/.test(` ${biasa(teks)} `));
}

export function jawabEmpatRibuGram(teks: string): boolean {
  const k = biasa(teks);
  const ada = k.includes("empat ribu") || angkaUtuh(teks, "4000");
  if (/empat ratus|empat puluh/.test(k)) return false;
  if (/kilogram/.test(k)) return false;
  return ada && (kata(teks, "gram") || kata(teks, "g"));
}

export function jawabTujuhRibuGram(teks: string): boolean {
  const k = biasa(teks);
  const ada = k.includes("tujuh ribu") || angkaUtuh(teks, "7000");
  if (/tujuh ratus|tujuh puluh/.test(k)) return false;
  if (/kilogram/.test(k)) return false;
  return ada && (kata(teks, "gram") || kata(teks, "g"));
}

export function jawabLimaKilo(teks: string): boolean {
  const k = biasa(teks);
  if (/lima puluh|lima ratus|lima ribu|lima belas/.test(k)) return false;
  const lima = kata(teks, "lima") || angkaUtuh(teks, "5");
  return lima && (/kilogram/.test(k) || kata(teks, "kg") || kata(teks, "kilo"));
}

export function jawabTigaMeter(teks: string): boolean {
  const k = biasa(teks);
  if (/tiga puluh|tiga ratus|tiga ribu|tiga belas/.test(k)) return false;
  if (/sentimeter|milimeter|kilometer/.test(k)) return false;
  const tiga = kata(teks, "tiga") || angkaUtuh(teks, "3");
  const meter = kata(teks, "meter") || kata(teks, "m");
  return tiga && meter;
}

export function jawabTimbanganBesar(teks: string): boolean {
  const k = biasa(teks);
  if (!k.includes("timbangan") || !k.includes("besar")) return false;
  if (/dapur/.test(k) && !/bukan/.test(k)) return false;
  return /berat|karung|kilogram|paku/.test(k);
}

export function kotakKoin(teks: string): boolean {
  const k = biasa(teks);
  return /koin/.test(k) && /pensil/.test(k) && /pintu/.test(k) && /kota/.test(k);
}

export function kotakBadan(teks: string): boolean {
  const k = biasa(teks);
  return /koin/.test(k) && /pensil/.test(k) && /badan|tinggi/.test(k) && /kota/.test(k);
}

export function perkiraanBerat(teks: string): boolean {
  const k = biasa(teks);
  const gram = kata(teks, "gram") || kata(teks, "g");
  const kilo = /kilogram/.test(k) || kata(teks, "kg");
  return /koin/.test(k) && /beras|karung/.test(k) && gram && kilo;
}

export function kotakBeras(teks: string): boolean {
  const k = biasa(teks);
  return /koin/.test(k) && /beras|karung/.test(k);
}

export function pasangAlat(teks: string): boolean {
  const k = biasa(teks);
  return /pensil/.test(k) && /lapangan/.test(k) && /beras|karung/.test(k);
}

export function pasangDapur(teks: string): boolean {
  const k = biasa(teks);
  return /tepung/.test(k) && /kain/.test(k) && /pensil/.test(k);
}

export function konversiLimaMeter(teks: string): boolean {
  return angkaUtuh(teks, "500") && angkaUtuh(teks, "4") && angkaUtuh(teks, "2000");
}

export function konversiEnamKilo(teks: string): boolean {
  return angkaUtuh(teks, "6000") && angkaUtuh(teks, "9") && angkaUtuh(teks, "2500");
}

export function konversiDuaMeter(teks: string): boolean {
  return angkaUtuh(teks, "200") && angkaUtuh(teks, "9") && angkaUtuh(teks, "3000");
}

export function konversiEmpatKilo(teks: string): boolean {
  return angkaUtuh(teks, "4000") && angkaUtuh(teks, "6") && angkaUtuh(teks, "1400");
}

export function konversiEnamMeter(teks: string): boolean {
  return angkaUtuh(teks, "600") && angkaUtuh(teks, "8") && angkaUtuh(teks, "4000");
}

export function konversiTujuhKilo(teks: string): boolean {
  return angkaUtuh(teks, "7000") && angkaUtuh(teks, "9") && angkaUtuh(teks, "2300");
}

export function papanBengkel(teks: string): boolean {
  return angkaUtuh(teks, "300") && angkaUtuh(teks, "3") && (kata(teks, "meter") || kata(teks, "m"));
}

export function pesananLengkap(teks: string): boolean {
  return angkaUtuh(teks, "300") && angkaUtuh(teks, "3") && angkaUtuh(teks, "1000");
}

export function nilaiUkur(teks: string, digit: string, ejaan: string, satuan: string[]): boolean {
  const kalimat = biasa(teks);
  const rapat = teks.replace(/[.\s]/g, "");
  const adaDigit = new RegExp(`(?:^|\\D)${digit}(?:\\D|$)`).test(rapat);
  const adaEjaan = kalimat.includes(ejaan);
  if (!adaDigit && !adaEjaan) return false;
  if (!adaDigit) {
    if (!ejaan.includes("ribu") && /ribu/.test(kalimat)) return false;
    if (!ejaan.includes("ratus") && /ratus/.test(kalimat)) return false;
    if (!ejaan.includes("puluh") && /puluh/.test(kalimat)) return false;
  }
  return satuan.some((nama) => new RegExp(`(?:^|\\s|\\d)${nama}(?:\\s|$)`).test(` ${kalimat} `));
}

export function satuanCm(teks: string): boolean {
  const kalimat = ` ${biasa(teks)} `;
  if (/kilometer|(?:^|\s)km(?:\s|$)|(?:^|\s)kg(?:\s|$)|(?:^|\s)gram(?:\s|$)/.test(kalimat)) return false;
  if (/(?:^|\s)meter(?:\s|$)/.test(kalimat) && !/sentimeter/.test(kalimat)) return false;
  return /sentimeter|(?:^|\s)cm(?:\s|$)/.test(kalimat);
}

export function satuanM(teks: string): boolean {
  const kalimat = ` ${biasa(teks)} `;
  if (/sentimeter|kilometer|(?:^|\s)cm(?:\s|$)|(?:^|\s)km(?:\s|$)/.test(kalimat)) return false;
  return /(?:^|\s)meter(?:\s|$)|(?:^|\s)m(?:\s|$)/.test(kalimat);
}

export function satuanKm(teks: string): boolean {
  const kalimat = ` ${biasa(teks)} `;
  if (/sentimeter|(?:^|\s)cm(?:\s|$)/.test(kalimat)) return false;
  return /kilometer|(?:^|\s)km(?:\s|$)/.test(kalimat);
}

export function satuanG(teks: string): boolean {
  const kalimat = ` ${biasa(teks)} `;
  if (/kilogram|(?:^|\s)kg(?:\s|$)/.test(kalimat)) return false;
  return /(?:^|\s)gram(?:\s|$)|(?:^|\s)g(?:\s|$)/.test(kalimat);
}

export function satuanKg(teks: string): boolean {
  const kalimat = ` ${biasa(teks)} `;
  return /kilogram|(?:^|\s)kg(?:\s|$)|(?:^|\s)kilo(?:\s|$)/.test(kalimat);
}

export function alatPenggaris(teks: string): boolean {
  const kalimat = biasa(teks);
  return kalimat.includes("penggaris") && !/meteran|timbangan/.test(kalimat);
}

export function alatMeteran(teks: string): boolean {
  const kalimat = biasa(teks);
  return kalimat.includes("meteran") && !/penggaris|timbangan/.test(kalimat);
}

export function alatTimbangan(teks: string): boolean {
  const kalimat = biasa(teks);
  return kalimat.includes("timbangan") && !/penggaris|meteran/.test(kalimat);
}

export function bengkelTiga(teks: string): boolean {
  const k = biasa(teks);
  if (/pesanan a lebih panjang|papan a lebih panjang/.test(k)) return false;
  const adaB = kata(teks, "b") || angkaUtuh(teks, "250");
  return angkaUtuh(teks, "200") && adaB && angkaUtuh(teks, "3000");
}
