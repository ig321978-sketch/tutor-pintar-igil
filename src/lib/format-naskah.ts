const KATA_ANGKA: Record<string, string> = {
  nol: "0",
  kosong: "0",
  satu: "1",
  dua: "2",
  tiga: "3",
  empat: "4",
  lima: "5",
  enam: "6",
  tujuh: "7",
  delapan: "8",
  sembilan: "9",
  sepuluh: "10",
  sebelas: "11",
  "dua belas": "12",
  "tiga belas": "13",
  "empat belas": "14",
  "lima belas": "15",
  "enam belas": "16",
  "tujuh belas": "17",
  "delapan belas": "18",
  "sembilan belas": "19",
  "dua puluh": "20",
  "tiga puluh": "30",
  "empat puluh": "40",
  "lima puluh": "50",
  "enam puluh": "60",
  "tujuh puluh": "70",
  "delapan puluh": "80",
  "sembilan puluh": "90",
  seratus: "100",
  seribu: "1000",
};

const POLA_RUMUS =
  /(?:\d+(?:[.,]\d+)?\s*[+\-−×x÷/=<>^]|[+\-−×÷=]\s*\d|\d+\s*[/÷]\s*\d|\d+\s*%|\d+[a-zA-Z]\b|[²³√π∞])/i;

export type JenisBlokNaskah = "plain" | "uraian" | "rumus";

export type BlokNaskah = {
  jenis: JenisBlokNaskah;
  teks: string;
};

function pecahKalimat(teks: string): string[] {
  return teks
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function adalahBarisRumus(teks: string): boolean {
  const rapat = teks.replace(/\s+/g, " ").trim();
  if (!rapat) return false;
  if (rapat.length > 80 && pecahKalimat(rapat).length >= 3) return false;
  if (POLA_RUMUS.test(rapat)) return true;
  const pulih = pulihkanAngkaTampil(rapat);
  return pulih !== rapat && POLA_RUMUS.test(pulih);
}

export function adalahUraian(teks: string): boolean {
  const rapat = teks.replace(/\s+/g, " ").trim();
  if (!rapat) return false;
  if (adalahBarisRumus(rapat)) return false;
  const kalimat = pecahKalimat(rapat);
  return kalimat.length >= 3 || rapat.length >= 140;
}

function lolosRegex(teks: string): string {
  return teks.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const KATA_ANGKA_POLA = Object.keys(KATA_ANGKA)
  .sort((a, b) => b.length - a.length)
  .map(lolosRegex)
  .join("|");

const POLA_NILAI = `(?:\\d+(?:[.,]\\d+)?|(?:${KATA_ANGKA_POLA}))`;

const POLA_HITUNGAN_KATA =
  /\b(?:plus|tambah|ditambah|minus|dikurangi|dikali|dibagi|sama dengan|persen|pangkat)\b/i;

function gantiKataAngka(mentah: string): string {
  let teks = mentah;
  const daftar = Object.keys(KATA_ANGKA).sort((a, b) => b.length - a.length);
  for (const kata of daftar) {
    const angka = KATA_ANGKA[kata];
    const pola = new RegExp(`(?<![\\p{L}])${lolosRegex(kata)}(?![\\p{L}])`, "giu");
    teks = teks.replace(pola, angka);
  }
  return teks;
}

function gantiOperatorAntaraNilai(teks: string): string {
  const nilai = POLA_NILAI;
  const langkah: Array<[RegExp, string]> = [
    [new RegExp(`(${nilai})\\s+(?:plus|tambah|ditambah)\\s+(${nilai})`, "giu"), "$1 + $2"],
    [new RegExp(`(${nilai})\\s+(?:minus|kurang|dikurangi)\\s+(${nilai})`, "giu"), "$1 − $2"],
    [new RegExp(`(${nilai})\\s+(?:kali|dikali)\\s+(${nilai})`, "giu"), "$1 × $2"],
    [new RegExp(`(${nilai})\\s+(?:dibagi|bagi)\\s+(${nilai})`, "giu"), "$1 ÷ $2"],
    [new RegExp(`(${nilai})\\s+pangkat\\s+(${nilai})`, "giu"), "$1^$2"],
    [new RegExp(`(${nilai})\\s+sama dengan\\s+(${nilai})`, "giu"), "$1 = $2"],
    [new RegExp(`(${nilai})\\s+per\\s+(${nilai})`, "giu"), "$1/$2"],
    [new RegExp(`(${nilai})\\s+persen\\b`, "giu"), "$1%"],
  ];

  let hasil = teks;
  let sebelumnya = "";
  while (hasil !== sebelumnya) {
    sebelumnya = hasil;
    for (const [pola, ganti] of langkah) {
      pola.lastIndex = 0;
      hasil = hasil.replace(pola, ganti);
    }
  }
  return hasil;
}

function gabungPuluhanSatuan(teks: string): string {
  return teks.replace(
    /\b(20|30|40|50|60|70|80|90)\s+([1-9])\b/g,
    (_, puluhan, satuan) => String(Number(puluhan) + Number(satuan)),
  );
}

function pulihkanIdiom(teks: string, cadangan: string[]): string {
  return teks.replace(/§IDIOM(\d+)§/g, (_, indeks) => cadangan[Number(indeks)] ?? "");
}

export function pulihkanAngkaTampil(teks: string): string {
  if (!teks) return teks;

  const idiom: string[] = [];
  let hasil = teks.replace(
    /\b(satu sama lain|satu per satu|satu-satunya|dua-duanya)\b/gi,
    (cocok) => {
      idiom.push(cocok);
      return `§IDIOM${idiom.length - 1}§`;
    },
  );

  hasil = gantiOperatorAntaraNilai(hasil);

  const perluAngka =
    /[+−×÷=/%^]/.test(hasil) ||
    /\d\s*-\s*\d/.test(hasil) ||
    POLA_HITUNGAN_KATA.test(hasil) ||
    (/\d/.test(hasil) && new RegExp(`(?:${KATA_ANGKA_POLA})`, "iu").test(hasil));

  if (perluAngka) {
    hasil = gantiKataAngka(hasil);
    hasil = gabungPuluhanSatuan(hasil);
    hasil = hasil
      .replace(/(\d)\s*-\s*(\d)/g, "$1 − $2")
      .replace(/\s*([+−×÷=])\s*/g, " $1 ")
      .replace(/\s+\/\s+/g, "/")
      .replace(/\s+%\s*/g, "% ")
      .replace(/\s+\^\s*/g, "^");
  }

  return pulihkanIdiom(hasil, idiom).replace(/\s{2,}/g, " ").trim();
}

export function pecahNaskahTampil(teks: string): BlokNaskah[] {
  const baris = teks
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const sumber = baris.length > 0 ? baris : [teks.trim()].filter(Boolean);
  const hasil: BlokNaskah[] = [];

  for (const item of sumber) {
    const tampil = pulihkanAngkaTampil(item);
    if (adalahBarisRumus(tampil) || adalahBarisRumus(item)) {
      hasil.push({ jenis: "rumus", teks: tampil });
      continue;
    }
    if (adalahUraian(item)) {
      let buffer = "";
      for (const satu of pecahKalimat(tampil)) {
        if (adalahBarisRumus(satu)) {
          if (buffer) {
            hasil.push({ jenis: "uraian", teks: buffer });
            buffer = "";
          }
          hasil.push({ jenis: "rumus", teks: pulihkanAngkaTampil(satu) });
          continue;
        }
        const calon = buffer ? `${buffer} ${satu}` : satu;
        if (buffer && pecahKalimat(calon).length > 2) {
          hasil.push({ jenis: "uraian", teks: buffer });
          buffer = satu;
        } else {
          buffer = calon;
        }
      }
      if (buffer) hasil.push({ jenis: "uraian", teks: buffer });
      continue;
    }
    hasil.push({ jenis: "plain", teks: tampil });
  }

  return hasil;
}
