const BATAS_KLIP_AWAL = 900;
const BATAS_KLIP = 2200;

function pecahKalimat(teks: string, batas: number): string[] {
  const bagian = teks
    .split(/(?<=[.!?…])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
  const hasil: string[] = [];
  let buffer = "";
  for (const kalimat of bagian) {
    const calon = buffer ? `${buffer} ${kalimat}` : kalimat;
    if (calon.length <= batas) {
      buffer = calon;
      continue;
    }
    if (buffer) hasil.push(buffer);
    if (kalimat.length <= batas) {
      buffer = kalimat;
      continue;
    }
    for (let i = 0; i < kalimat.length; i += batas) {
      hasil.push(kalimat.slice(i, i + batas));
    }
    buffer = "";
  }
  if (buffer) hasil.push(buffer);
  return hasil;
}

function kemasBlok(sumber: string[], batas: number): string[] {
  const hasil: string[] = [];
  let buffer = "";
  for (const item of sumber) {
    const calon = buffer ? `${buffer}\n\n${item}` : item;
    if (calon.length <= batas) {
      buffer = calon;
      continue;
    }
    if (buffer) hasil.push(buffer);
    if (item.length <= batas) {
      buffer = item;
      continue;
    }
    hasil.push(...pecahKalimat(item, batas));
    buffer = "";
  }
  if (buffer) hasil.push(buffer);
  return hasil;
}

/** Pecah naskah lisan jadi klip pendek agar TTS pertama cepat mulai. */
export function pecahKlipSuara(naskah: string): string[] {
  const blok = naskah
    .split(/\n\n+/)
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (blok.length === 0) {
    const satu = naskah.replace(/\s+/g, " ").trim();
    return satu ? pecahKalimat(satu, BATAS_KLIP_AWAL) : [];
  }

  const awal = kemasBlok([blok[0]], BATAS_KLIP_AWAL);
  const sisa = kemasBlok(blok.slice(1), BATAS_KLIP);
  return [...awal, ...sisa].filter(Boolean);
}
