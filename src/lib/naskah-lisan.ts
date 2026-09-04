import {
  gantiNamaLengkapKeDepan,
  sapaanTutorRingkas,
} from "@/lib/nama-siswa";

const LABEL_BARIS =
  /^(judul(?:\s+kartu)?|subjudul(?:\s+visual)?|uraian(?:\s+lisan)?|naskah(?:\s+lisan)?|kartu\s*\d+|baris\s*\d+|visual|voice|teks(?:\s+kartu)?|contoh(?:\s+kartu)?)\s*[:.\-–]\s*/i;

function pecahKalimatSederhana(teks: string): string[] {
  return teks
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buangLabelBaris(teks: string): string {
  return teks
    .split(/\n/)
    .map((baris) => baris.replace(LABEL_BARIS, "").trim())
    .filter((baris) => {
      if (!baris) return false;
      if (/^\[(?:soal|pause|kartu|tipe)[^\]]*\]$/i.test(baris)) return false;
      return true;
    })
    .join("\n");
}

function buangSubjudulVisualKartu(blok: string): string {
  const baris = blok
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (baris.length >= 3) {
    return [baris[0], ...baris.slice(2)].join("\n");
  }
  const kalimat = pecahKalimatSederhana(blok.replace(/\s+/g, " ").trim());
  if (kalimat.length >= 4) {
    return [kalimat[0], ...kalimat.slice(2)].join(" ");
  }
  return blok;
}

export function bersihkanLabelNaskah(teks: string): string {
  return teks
    .split(/\n\n+/)
    .map((blok) =>
      buangLabelBaris(blok)
        .replace(/\[pause(?:\s+(?:short|long))?\]/gi, " ")
        .trim(),
    )
    .filter(Boolean)
    .join("\n\n");
}

export function naskahLisan(teks: string, nama = ""): string {
  let aman = nama ? gantiNamaLengkapKeDepan(teks, nama) : teks;
  aman = buangLabelBaris(aman);

  aman = aman
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`+/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/[_*#]+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/\[pause(?:\s+(?:short|long))?\]/gi, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\((?:voice|visual|json|hanya untuk voice|card only)[^)]*\)/gi, " ")
    .replace(/\b(?:VOICE|JSON|SSML|TTS|HOTS|NULL|UNDEFINED)\b/g, " ")
    .replace(/\$IGIL/gi, "igil")
    .replace(/\bIGIL\b/g, "igil")
    .replace(/Al[-\s]?Qur['’`]an/gi, "Alquran")
    .replace(/\bQ\.?\s*S\.?\s*/gi, "surah ")
    .replace(/\bH\.?\s*R\.?\s*/gi, "hadis ")
    .replace(/(?<=\s)S\.?\s*A\.?\s*W\.?(?=\s|[.,!?…]|$)/gi, "salallahu alaihi wasalam")
    .replace(/(?<=\s)S\.?\s*W\.?\s*T\.?(?=\s|[.,!?…]|$)/gi, "subhanahu wataala")
    .replace(/(?<=\s)A\.?\s*S\.?(?=\s|[.,!?…]|$)/g, "alaihissalam")
    .replace(/(?<=\s)R\.?\s*A\.?(?=\s|[.,!?…]|$)/g, "")
    .replace(/\bdll\.?/gi, "dan lain-lain")
    .replace(/\bdst\.?/gi, "dan seterusnya")
    .replace(/\btsb\.?/gi, "tersebut")
    .replace(/\bdgn\b/gi, "dengan")
    .replace(/\byg\b/gi, "yang")
    .replace(/\bkm\/jam\b/gi, "kilometer per jam")
    .replace(/\bm\/s\b/gi, "meter per sekon")
    .replace(/°\s*C\b/g, " derajat celcius")
    .replace(/%/g, " persen")
    .replace(/&/g, " dan ")
    .replace(/[–—]/g, " ")
    .replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)/g, "$1 dan $2 per $3")
    .replace(/(\d+)\s*\/\s*(\d+)/g, "$1 per $2")
    .replace(/(?<![\d.,])-(\d+(?:[.,]\d+)?)/g, "minus $1")
    .replace(/(\d)\s*\+\s*(\d)/g, "$1 plus $2")
    .replace(/×\s*/g, "kali ")
    .replace(/\bx\s+(?=\d)/gi, "kali ")
    .replace(/÷/g, " dibagi ")
    .replace(/=/g, " sama dengan ")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, " ")
    .replace(/[<>]/g, " ")
    .replace(/\n+/g, ". ")
    .replace(/[.]{2,}/g, ".")
    .replace(/\s+([,.;:!?…])/g, "$1")
    .replace(/\s+/g, " ")
    .replace(/^[.\s]+/, "")
    .trim();

  return aman;
}

export function naskahTutorUntukSuara(
  sapaan: string,
  penjelasan: string,
  nama = "",
  opsi?: { buangSubjudulVisual?: boolean; tanpaSapaan?: boolean },
): string {
  const kartu = penjelasan
    .split(/\n\n+/)
    .map((item) => {
      const isi = opsi?.buangSubjudulVisual
        ? buangSubjudulVisualKartu(item)
        : item;
      return naskahLisan(isi, nama);
    })
    .filter(Boolean);
  if (opsi?.tanpaSapaan) return kartu.join("\n\n");
  const sapaanAman = naskahLisan(
    nama ? sapaanTutorRingkas(nama, sapaan) : sapaan,
    nama,
  );
  return [sapaanAman, ...kartu].filter(Boolean).join("\n\n");
}
