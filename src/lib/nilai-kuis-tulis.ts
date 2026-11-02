export function adalahGambarJawaban(data: string): boolean {
  return /^data:image\/[a-zA-Z0-9+.-]+;base64,/i.test(data.trim());
}

export function normalisasiJawabanTulis(teks: string): string {
  return teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[‘’ʻ`'´]/g, "")
    .replace(/[➕＋]/g, "+")
    .replace(/[➖－–—−]/g, "-")
    .replace(/[＝]/g, "=")
    .replace(/[^a-z0-9\u0600-\u06FF+=\-\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tanpaSpasi(teks: string): string {
  return normalisasiJawabanTulis(teks).replace(/\s+/g, "");
}

export function jawabanTulisMemuatAlias(
  teks: string,
  alias: string[],
): boolean {
  const biasa = normalisasiJawabanTulis(teks);
  const padat = tanpaSpasi(teks);
  if (!biasa) return false;
  return alias.some((nama) => {
    const kunci = normalisasiJawabanTulis(nama);
    const kunciPadat = tanpaSpasi(nama);
    if (!kunci) return false;
    if (kunci.length <= 2) {
      const pola = kunci.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`(?:^|\\s)${pola}(?:\\s|$)`).test(biasa);
    }
    return (
      biasa.includes(kunci) ||
      (kunciPadat.length >= 2 && padat.includes(kunciPadat))
    );
  });
}

export function kumpulkanAlias(
  daftar: Array<string | string[] | undefined | null>,
): string[] {
  const hasil = new Set<string>();
  for (const item of daftar) {
    const list = Array.isArray(item) ? item : item ? [item] : [];
    for (const nama of list) {
      const bersih = nama.trim();
      if (bersih) hasil.add(bersih);
    }
  }
  return [...hasil];
}

export function aliasDariKuisSuara(
  soal: Array<{ alias?: string[] }>,
): string[] {
  return kumpulkanAlias(soal.map((item) => item.alias));
}

export function jawabanTulisGenerik(teks: string): boolean {
  return /^(sudah|ok|oke|selesai|ya|sip|done|benar|mantap|tidak tahu|ga tau|gak tau)[.!\s]*$/i.test(
    teks.replace(/\s+/g, " ").trim(),
  );
}
