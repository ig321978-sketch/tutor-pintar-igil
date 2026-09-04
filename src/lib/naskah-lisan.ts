import {
  gantiNamaLengkapKeDepan,
  sapaanTutorRingkas,
} from "@/lib/nama-siswa";

/** Ubah naskah pelajaran menjadi teks yang lebih aman dibaca keras. */
export function naskahLisan(teks: string, nama = ""): string {
  const amanNama = nama ? gantiNamaLengkapKeDepan(teks, nama) : teks;
  return amanNama
    .replace(/\$IGIL/gi, "igil")
    .replace(/\bIGIL\b/g, "igil")
    .replace(/[–—]/g, " ")
    .replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)/g, "$1 dan $2 per $3")
    .replace(/(\d+)\s*\/\s*(\d+)/g, "$1 per $2")
    .replace(/(?<![\d.,])-(\d+(?:[.,]\d+)?)/g, "minus $1")
    .replace(/(\d)\s*\+\s*(\d)/g, "$1 plus $2")
    .replace(/×\s*/g, "kali ")
    .replace(/\bx\s+(?=\d)/gi, "kali ")
    .replace(/÷/g, " dibagi ")
    .replace(/=/g, " sama dengan ")
    .replace(/\n+/g, ". ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?…])/g, "$1")
    .trim();
}

export function naskahTutorUntukSuara(
  sapaan: string,
  penjelasan: string,
  nama = "",
): string {
  const sapaanAman = nama ? sapaanTutorRingkas(nama, sapaan) : sapaan;
  const blok = [sapaanAman, ...penjelasan.split(/\n\n+/)]
    .map((item) => naskahLisan(item, nama))
    .filter(Boolean);
  return blok.join("\n\n");
}
