import { pecahBlokKartu } from "@/lib/konsep-materi";
import { buangSubjudulVisualKartu } from "@/lib/naskah-lisan";
import { rapikanNaskahModul } from "@/lib/rapikan-naskah-modul";

export type GayaKotakBuku = "contoh" | "ingat" | "catatan" | "ayo";

export type BlokNaskahModul =
  | { jenis: "judul"; tingkat: 2 | 3 | 4; teks: string }
  | { jenis: "paragraf"; teks: string }
  | { jenis: "rumus"; latex: string; keterangan?: string }
  | { jenis: "daftar"; berurutan: boolean; item: string[] }
  | { jenis: "mermaid"; sumber: string }
  | { jenis: "kode"; bahasa: string; sumber: string }
  | { jenis: "kotak"; gaya: GayaKotakBuku; judul: string; teks: string }
  | { jenis: "tabel"; header: string[]; baris: string[][] };

export type SegmenTeks =
  | { jenis: "teks"; isi: string }
  | { jenis: "tebal"; isi: string }
  | { jenis: "miring"; isi: string }
  | { jenis: "kode"; isi: string }
  | { jenis: "tautan"; isi: string; url: string }
  | { jenis: "rumus"; isi: string };

const POLA_KOTAK =
  /^(?:\*{0,2}|_{0,2}|#{2,4}\s+)?(contoh(?:\s+soal(?:\s+\d+)?)?|ingat|catatan|penting|perhatikan|ayo(?:\s+mencoba)?|tahukah kamu|tips|kesimpulan|rangkuman|latihan|kunci)\s*[:.]?\s*(?:\*{0,2}|_{0,2})?\s*(.*)$/i;

const POLA_KETERANGAN =
  /^(?:di mana|dimana|dengan|keterangan|yaitu|notasi|variabel)\b/i;

function gayaKotak(nama: string): GayaKotakBuku {
  const n = nama.toLowerCase();
  if (n.startsWith("contoh") || n.startsWith("latihan")) return "contoh";
  if (n.startsWith("ayo") || n.startsWith("tips")) return "ayo";
  if (
    n.startsWith("ingat") ||
    n.startsWith("penting") ||
    n.startsWith("perhatikan")
  ) {
    return "ingat";
  }
  return "catatan";
}

export function latexLayakSebagaiRumus(isi: string): boolean {
  const potong = isi.trim();
  if (!potong) return false;
  if (/\\begin\{(?:array|aligned|pmatrix|bmatrix)\}/.test(potong)) {
    return potong.length <= 900;
  }
  if (potong.length > 280) return false;
  const perintah = potong.match(/\\[a-zA-Z]+/g)?.length ?? 0;
  const kataBiasa = potong
    .split(/\s+/)
    .filter((kata) => /[A-Za-zÀ-ÿ]{3,}/.test(kata) && !kata.startsWith("\\"));
  const simbol = /[\\^_{}=+\-×÷±≤≥≠√]|\\frac|\\sqrt|\d/.test(potong);
  if (kataBiasa.length >= 5 && perintah === 0) return false;
  if (!simbol && kataBiasa.length >= 3) return false;
  return (
    simbol ||
    perintah > 0 ||
    /^[A-Za-z]\s*=/.test(potong) ||
    potong.length <= 28
  );
}

function blokPagar(mentah: string): BlokNaskahModul | null {
  const teks = mentah.trim();
  const cocok = /^(```|~~~)([^\n]*)\n?([\s\S]*?)\s*\1$/.exec(teks);
  const bahasa = (cocok?.[2] ?? "").trim().toLowerCase();
  const sumber = (cocok?.[3] ?? teks.replace(/^(```|~~~)|```$|~~~$/g, "")).trim();
  if (bahasa === "svg" || /^<svg\b/i.test(sumber)) return null;
  if (bahasa === "mermaid") return { jenis: "mermaid", sumber };
  return { jenis: "kode", bahasa: bahasa || "teks", sumber };
}

function pecahTabel(baris: string[]): BlokNaskahModul | null {
  if (baris.length < 2) return null;
  if (!baris.every((item) => item.includes("|"))) return null;
  const pecah = (item: string) =>
    item
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((sel) => sel.trim());
  const header = pecah(baris[0]);
  const pemisah = pecah(baris[1]);
  if (!pemisah.every((sel) => /^:?-{3,}:?$/.test(sel))) return null;
  return {
    jenis: "tabel",
    header,
    baris: baris.slice(2).map(pecah),
  };
}

function mungkinJudul(teks: string): boolean {
  const t = teks.replace(/\*+/g, "").replace(/^#+\s*/, "").trim();
  if (t.length < 4 || t.length > 72) return false;
  if (/^[a-zà-ÿ]/.test(t)) return false;
  if (/^[-*+] /.test(t) || /^\d+[.)] /.test(t)) return false;
  if (/\$|https?:/i.test(t)) return false;
  if ((t.match(/[,;:]/g) ?? []).length > 1) return false;
  const tanpaRibuan = t.replace(/\d{1,3}(?:\.\d{3})+/g, "0");
  const kata = tanpaRibuan.replace(/[.:!?…]$/, "").split(/\s+/).filter(Boolean);
  if (kata.length === 0 || kata.length > 10) return false;
  if (
    /^(amati|hitung|jelaskan|bayangkan|pernahkah|jika|ketika|untuk|pada|dalam|sebuah|seorang|ada|ini|itu|kamu|mari|ayo|lihat|coba|seorang|pernah|hasil|langkah|penyelesaian|kunci)\b/i.test(
      t,
    )
  ) {
    return false;
  }
  return (tanpaRibuan.match(/[.!?]/g) ?? []).length <= 1;
}

function buangMarkupJudul(teks: string): string {
  return teks.replace(/^\*{1,2}|\*{1,2}$/g, "").replace(/^#+\s*/, "").trim();
}

function pecahBarisAlur(baris: string[]): BlokNaskahModul[] {
  const hasil: BlokNaskahModul[] = [];
  let paragraf: string[] = [];
  let daftar: { berurutan: boolean; item: string[] } | null = null;

  const tuangParagraf = () => {
    if (paragraf.length === 0) return;
    const teks = paragraf.join("\n").trim();
    paragraf = [];
    if (!teks) return;
    const kotak = POLA_KOTAK.exec(teks.replace(/\n/g, " "));
    if (kotak) {
      hasil.push({
        jenis: "kotak",
        gaya: gayaKotak(kotak[1]),
        judul: kotak[1].replace(/\s+/g, " ").trim(),
        teks: (kotak[2] || "").trim(),
      });
      return;
    }
    if (/^>\s*/.test(teks)) {
      hasil.push({
        jenis: "kotak",
        gaya: "catatan",
        judul: "Catatan",
        teks: teks.replace(/^>\s?/gm, "").trim(),
      });
      return;
    }
    hasil.push({ jenis: "paragraf", teks: teks.replace(/\n+/g, " ") });
  };

  const tuangDaftar = () => {
    if (!daftar || daftar.item.length === 0) return;
    hasil.push({
      jenis: "daftar",
      berurutan: daftar.berurutan,
      item: daftar.item,
    });
    daftar = null;
  };

  for (const mentah of baris) {
    const item = mentah.trim();
    if (!item || /^(-{3,}|\*{3,}|_{3,})$/.test(item)) {
      tuangParagraf();
      tuangDaftar();
      continue;
    }

    const judulMd = /^(#{2,4})\s+(.*)$/.exec(item);
    if (judulMd) {
      tuangParagraf();
      tuangDaftar();
      const isiJudul = judulMd[2].trim();
      const kotakJudul = POLA_KOTAK.exec(isiJudul);
      if (kotakJudul) {
        hasil.push({
          jenis: "kotak",
          gaya: gayaKotak(kotakJudul[1]),
          judul: kotakJudul[1].replace(/\s+/g, " ").trim(),
          teks: (kotakJudul[2] || "").trim(),
        });
        continue;
      }
      const tingkat = Math.min(4, Math.max(2, judulMd[1].length)) as 2 | 3 | 4;
      hasil.push({ jenis: "judul", tingkat, teks: isiJudul });
      continue;
    }

    const poin =
      /^[-*+]\s+(.+)$/.exec(item) || /^\d+[.)]\s+(.+)$/.exec(item);
    if (poin) {
      tuangParagraf();
      const berurutan = /^\d+[.)]\s+/.test(item);
      if (!daftar || daftar.berurutan !== berurutan) {
        tuangDaftar();
        daftar = { berurutan, item: [] };
      }
      daftar.item.push(poin[1].trim());
      continue;
    }

    tuangDaftar();
    const kotakBaris = POLA_KOTAK.exec(item.replace(/\*+/g, "").trim());
    if (kotakBaris) {
      tuangParagraf();
      hasil.push({
        jenis: "kotak",
        gaya: gayaKotak(kotakBaris[1]),
        judul: kotakBaris[1].replace(/\s+/g, " ").trim(),
        teks: (kotakBaris[2] || "").trim(),
      });
      continue;
    }
    paragraf.push(item);
  }

  tuangParagraf();
  tuangDaftar();
  return hasil;
}

function pecahAlurTeks(teks: string): BlokNaskahModul[] {
  const hasil: BlokNaskahModul[] = [];
  for (const chunk of teks.split(/\n{2,}/)) {
    let baris = chunk
      .split("\n")
      .map((item) => item.trimEnd())
      .filter((item) => item.trim());
    if (baris.length === 0) continue;
    const tabel = pecahTabel(baris);
    if (tabel) {
      hasil.push(tabel);
      continue;
    }
    const kotakAwal = POLA_KOTAK.exec(baris[0].replace(/\*+/g, "").trim());
    if (kotakAwal) {
      const sisa = [kotakAwal[2], ...baris.slice(1)]
        .map((item) => item.trim())
        .filter(Boolean)
        .join("\n");
      hasil.push({
        jenis: "kotak",
        gaya: gayaKotak(kotakAwal[1]),
        judul: kotakAwal[1].replace(/\s+/g, " ").trim(),
        teks: sisa,
      });
      continue;
    }
    if (
      baris.length >= 2 &&
      !/^#{2,4}\s+/.test(baris[0]) &&
      mungkinJudul(baris[0])
    ) {
      hasil.push({
        jenis: "judul",
        tingkat: 3,
        teks: buangMarkupJudul(baris[0]),
      });
      baris = baris.slice(1);
    }
    hasil.push(...pecahBarisAlur(baris));
  }
  return hasil;
}

function gabungkanKeteranganRumus(blok: BlokNaskahModul[]): BlokNaskahModul[] {
  const hasil: BlokNaskahModul[] = [];
  for (let i = 0; i < blok.length; i += 1) {
    const sekarang = blok[i];
    const berikutnya = blok[i + 1];
    if (
      sekarang.jenis === "rumus" &&
      berikutnya?.jenis === "paragraf" &&
      (POLA_KETERANGAN.test(berikutnya.teks) ||
        (berikutnya.teks.length <= 90 && /\$|[A-Za-z]\s*=/.test(berikutnya.teks)))
    ) {
      hasil.push({
        ...sekarang,
        keterangan: berikutnya.teks,
      });
      i += 1;
      continue;
    }
    if (
      sekarang.jenis === "kotak" &&
      !sekarang.teks &&
      berikutnya?.jenis === "paragraf"
    ) {
      hasil.push({ ...sekarang, teks: berikutnya.teks });
      i += 1;
      continue;
    }
    hasil.push(sekarang);
  }
  return hasil;
}

function promosiJudulImplisit(blok: BlokNaskahModul[]): BlokNaskahModul[] {
  return blok.map((item, indeks) => {
    if (item.jenis !== "paragraf") return item;
    const berikutnya = blok[indeks + 1];
    if (!berikutnya) return item;
    if (!mungkinJudul(item.teks)) return item;
    if (
      berikutnya.jenis === "paragraf" ||
      berikutnya.jenis === "rumus" ||
      berikutnya.jenis === "daftar" ||
      berikutnya.jenis === "kotak"
    ) {
      return { jenis: "judul", tingkat: 3, teks: buangMarkupJudul(item.teks) };
    }
    return item;
  });
}

export function pecahBlokNaskahModul(mentah: string): BlokNaskahModul[] {
  const teks = pecahBlokKartu(rapikanNaskahModul(mentah), 0)
    .map((blok) => buangSubjudulVisualKartu(blok))
    .join("\n\n")
    .trim();
  if (!teks) return [];

  const kasar = teks.split(
    /(```[\s\S]*?```|~~~[\s\S]*?~~~|(?:^|\n)\s*\$\$[\s\S]*?\$\$\s*(?=\n|$))/,
  );
  const blok: BlokNaskahModul[] = [];

  for (const bagian of kasar) {
    if (!bagian) continue;
    const potong = bagian.trim();
    if (/^(```|~~~)/.test(potong)) {
      const pagar = blokPagar(potong);
      if (pagar) blok.push(pagar);
      continue;
    }
    if (potong.startsWith("$$")) {
      const latex = potong.replace(/^\$\$\s*|\s*\$\$$/g, "").trim();
      if (latexLayakSebagaiRumus(latex)) {
        blok.push({ jenis: "rumus", latex });
      } else {
        blok.push(...pecahAlurTeks(latex));
      }
      continue;
    }
    blok.push(...pecahAlurTeks(bagian));
  }

  return gabungkanKeteranganRumus(promosiJudulImplisit(blok));
}

export function pecahSegmenTeks(teks: string): SegmenTeks[] {
  const hasil: SegmenTeks[] = [];
  const pola =
    /\$\$([\s\S]+?)\$\$|\$([^$\n]+)\$|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;
  let terakhir = 0;
  let cocok: RegExpExecArray | null;
  while ((cocok = pola.exec(teks))) {
    if (cocok.index > terakhir) {
      hasil.push({ jenis: "teks", isi: teks.slice(terakhir, cocok.index) });
    }
    if (cocok[1] != null || cocok[2] != null) {
      const latex = (cocok[1] ?? cocok[2]).trim();
      if (latexLayakSebagaiRumus(latex)) {
        hasil.push({ jenis: "rumus", isi: latex });
      } else {
        hasil.push({ jenis: "teks", isi: latex });
      }
    } else if (cocok[3] != null && cocok[4] != null) {
      hasil.push({ jenis: "tautan", isi: cocok[3], url: cocok[4] });
    } else if (cocok[5] != null) {
      hasil.push({ jenis: "tebal", isi: cocok[5] });
    } else if (cocok[6] != null) {
      hasil.push({ jenis: "miring", isi: cocok[6] });
    } else if (cocok[7] != null) {
      hasil.push({ jenis: "kode", isi: cocok[7] });
    }
    terakhir = cocok.index + cocok[0].length;
  }
  if (terakhir < teks.length) {
    hasil.push({ jenis: "teks", isi: teks.slice(terakhir) });
  }
  return hasil.filter((item) => item.isi !== "");
}
