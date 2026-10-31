const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

function diBawahSeribu(nilai: number): string {
  if (nilai <= 0) return "";
  if (nilai < 12) return SATUAN[nilai] ?? "";
  if (nilai < 20) return `${SATUAN[nilai - 10]} belas`;
  if (nilai < 100) {
    const puluh = Math.floor(nilai / 10);
    const sisa = nilai % 10;
    return `${SATUAN[puluh]} puluh${sisa > 0 ? ` ${SATUAN[sisa]}` : ""}`;
  }
  const ratus = Math.floor(nilai / 100);
  const sisa = nilai % 100;
  const awal = ratus === 1 ? "seratus" : `${SATUAN[ratus]} ratus`;
  return sisa > 0 ? `${awal} ${diBawahSeribu(sisa)}` : awal;
}

export function bacaanCacah(nilai: number): string {
  const n = Math.max(0, Math.min(1_000_000, Math.floor(nilai)));
  if (n === 0) return "nol";
  if (n === 1_000_000) return "satu juta";
  const ribuan = Math.floor(n / 1000);
  const sisa = n % 1000;
  const kiri = ribuan === 0 ? "" : ribuan === 1 ? "seribu" : `${diBawahSeribu(ribuan)} ribu`;
  const kanan = sisa > 0 ? diBawahSeribu(sisa) : "";
  return `${kiri}${kiri && kanan ? " " : ""}${kanan}`.trim();
}

export function titikRibuan(nilai: number): string {
  return String(Math.max(0, Math.floor(nilai))).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
