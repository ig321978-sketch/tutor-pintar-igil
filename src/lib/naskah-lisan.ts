import {
  gantiNamaLengkapKeDepan,
  sapaanTutorRingkas,
  sapaanVoiceTutor,
} from "@/lib/nama-siswa";
import { pecahBlokKartu } from "@/lib/konsep-materi";
import {
  adalahNaskahInfografis,
  teksLisanInfografis,
} from "@/lib/infografis-kelas1";
import {
  naskahTampilanPai1Bab1,
  teksLisanPai1Bab1,
} from "@/lib/naskah-resmi-pai-1-bab1";
import {
  naskahTampilanPai1Bab2,
  teksLisanPai1Bab2,
} from "@/lib/naskah-resmi-pai-1-bab2";
import {
  potongLengkap,
  teksLisanDaftarLengkap,
} from "@/lib/paket-lengkap-materi";
import { ucapkanLatexUntukSuara } from "@/lib/latex-ke-teks";
import {
  ucapkanHurufVariabelTerisolasi,
  ucapkanKeteranganKomponenRumus,
  ucapkanRumusUntukSuara,
} from "@/lib/naskah-suara-rumus";

const LABEL_BARIS =
  /^(judul(?:\s+kartu)?|subjudul(?:\s+visual)?|uraian(?:\s+lisan)?|naskah(?:\s+lisan)?|kartu\s*\d+|baris\s*\d+|visual|voice|teks(?:\s+kartu)?|contoh\s+kartu)\s*[:.\-–]\s*/i;

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

function adalahKeteranganVisual(teks: string): boolean {
  const bersih = teks.replace(/[.!?…]$/, "").trim();
  const kata = bersih.split(/\s+/).filter(Boolean);
  if (kata.length === 0 || kata.length > 16) return false;
  if (/\?$/.test(teks.trim())) return false;
  if (
    /^(contoh|latihan|kunci|di|karena|jumlah|bagian|hitung|jadi|penyelesaian|langkah|hasil)\b/i.test(
      bersih,
    )
  ) {
    return false;
  }
  return /^(seorang|sebuah|seekor|dua|satu|beberapa|sekelompok|anak|tabel|diagram|tumpuk|kelompok)/i.test(
    bersih,
  );
}

export function buangSubjudulVisualKartu(blok: string): string {
  const baris = blok
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  if (baris.length >= 3 && adalahKeteranganVisual(baris[1])) {
    return [baris[0], ...baris.slice(2)].join("\n");
  }
  const kalimat = pecahKalimatSederhana(blok.replace(/\s+/g, " ").trim());
  if (kalimat.length >= 4 && adalahKeteranganVisual(kalimat[1])) {
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

export function bersihkanNaskahLisanCerita(teks: string): string {
  return teks
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, " ")
    .replace(/Al[-\s]?Qur['’`´]an/gi, "Al Quran")
    .replace(/\bLAM-ALIF\b/gi, "Lam Alif")
    .replace(/['’`´]\s*AIN\b/gi, "Ain")
    .replace(/['’`´]\s*GHIN\b/gi, "Ghin")
    .replace(/[“”„«»"'`´‘’]/g, "")
    .replace(/[•·▪]/g, " ")
    .replace(/[()[\]{}]/g, " ")
    .replace(/!+\.+$/g, "!")
    .replace(/\s*[-–—]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function naskahLisan(
  teks: string,
  nama = "",
  opsi?: { tanpaNotasi?: boolean },
): string {
  let aman = nama ? gantiNamaLengkapKeDepan(teks, nama) : teks;
  if (opsi?.tanpaNotasi) {
    return bersihkanNaskahLisanCerita(aman);
  }
  aman = buangLabelBaris(aman);

  aman = aman
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/```[\s\S]*?```/g, " ");
  aman = ucapkanLatexUntukSuara(aman);
  aman = ucapkanKeteranganKomponenRumus(aman);
  aman = aman
    .replace(/`+/g, "")
    .replace(/([)\d|])\s*\*\s*([(\d|\-−|])/g, "$1 × $2")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*(?=[A-Za-z])([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/gi, " ")
    .replace(/\[pause(?:\s+(?:short|long))?\]/gi, " ")
    .replace(/\((?:voice|visual|json|hanya untuk voice|card only)[^)]*\)/gi, " ");

  aman = ucapkanRumusUntukSuara(aman);

  aman = aman
    .replace(/#\s*(\d+)/g, "nomor $1 ")
    .replace(/[_#]+/g, " ")
    .replace(/\b(?:VOICE|JSON|SSML|TTS|HOTS|NULL|UNDEFINED)\b/g, " ")
    .replace(/\$IGIL/gi, "igil")
    .replace(/\bIGIL\b/g, "igil")
    .replace(/Al[-\s]?Qur['’`]an/gi, "Al Quran")
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
    .replace(/&/g, " dan ")
    .replace(/[–—]/g, " ")
    .replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)/g, "$1 dan $2 per $3")
    .replace(/(?<![\d.,]|minus )-(\d+(?:[.,]\d+)?)/g, "minus $1")
    .replace(/(\d+(?:[.,]\d+)?)\s*\+\s*(\d+(?:[.,]\d+)?)/g, "$1 plus $2")
    .replace(/=/g, " sama dengan ")
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, " ")
    .replace(/\n+/g, ". ");
  aman = ucapkanHurufVariabelTerisolasi(aman);
  aman = aman
    .replace(/[.]{2,}/g, ".")
    .replace(/([.!?…])\s*\./g, "$1")
    .replace(/\s+([,.;:!?…])/g, "$1")
    .replace(/,{2,}/g, ",")
    .replace(/\s+/g, " ")
    .replace(/^[.\s]+/, "")
    .trim();

  return aman;
}

function buangBlokKunci(blok: string): string {
  return blok.replace(/\nKunci\b[\s\S]*$/i, "").trim();
}

export function naskahSapaanUntukSuara(
  nama: string,
  mapel = "",
  materi = "",
): string {
  return sapaanVoiceTutor(nama, mapel, materi)
    .split("\n")
    .map((baris) => naskahLisan(baris.replace(/\.{2,}$/g, ""), nama))
    .filter(Boolean)
    .join("\n\n");
}

export function naskahKartuUntukSuara(
  blok: string,
  nama = "",
  opsi?: { buangSubjudulVisual?: boolean },
): string {
  return naskahTutorUntukSuara("", blok, nama, {
    tanpaSapaan: true,
    buangSubjudulVisual: opsi?.buangSubjudulVisual,
  });
}

export function naskahTutorUntukSuara(
  sapaan: string,
  penjelasan: string,
  nama = "",
  opsi?: { buangSubjudulVisual?: boolean; tanpaSapaan?: boolean },
): string {
  if (naskahTampilanPai1Bab1(penjelasan)) {
    const lisan = teksLisanPai1Bab1();
    if (opsi?.tanpaSapaan) return lisan;
    const sapaanAmanBab1 = naskahLisan(
      nama ? sapaanTutorRingkas(nama, sapaan) : sapaan,
      nama,
    );
    return [sapaanAmanBab1, lisan].filter(Boolean).join("\n\n");
  }
  if (naskahTampilanPai1Bab2(penjelasan)) {
    const lisan = teksLisanPai1Bab2();
    if (opsi?.tanpaSapaan) return lisan;
    const sapaanAman = naskahLisan(
      nama ? sapaanTutorRingkas(nama, sapaan) : sapaan,
      nama,
    );
    return [sapaanAman, lisan].filter(Boolean).join("\n\n");
  }
  if (adalahNaskahInfografis(penjelasan)) {
    const lisan = teksLisanInfografis(penjelasan);
    if (opsi?.tanpaSapaan) return lisan;
    const sapaanAman = naskahLisan(
      nama ? sapaanTutorRingkas(nama, sapaan) : sapaan,
      nama,
    );
    return [sapaanAman, lisan].filter(Boolean).join("\n\n");
  }
  const { tubuh, lengkap } = potongLengkap(penjelasan);
  const kartu = pecahBlokKartu(tubuh || penjelasan)
    .map((item) => {
      const tanpaKunci = buangBlokKunci(item);
      const isi = opsi?.buangSubjudulVisual
        ? buangSubjudulVisualKartu(tanpaKunci)
        : tanpaKunci;
      return naskahLisan(isi, nama);
    })
    .filter(Boolean);
  const lisanLengkap = lengkap.length ? teksLisanDaftarLengkap(lengkap) : "";
  if (opsi?.tanpaSapaan) {
    return [...kartu, lisanLengkap].filter(Boolean).join("\n\n");
  }
  const sapaanAman = naskahLisan(
    nama ? sapaanTutorRingkas(nama, sapaan) : sapaan,
    nama,
  );
  return [sapaanAman, ...kartu, lisanLengkap].filter(Boolean).join("\n\n");
}
