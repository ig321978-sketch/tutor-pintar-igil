"use client";

import { useEffect, useRef, useState } from "react";

const LEBAR_DASAR = 1000;

export type TingkatSertifikat = {
  id: string;
  title: string;
  grade: string;
  subject: string;
  skillsVerified: readonly string[];
};

export type PenerimaSertifikat = { nama: string; kelas: string; kota: string };

const NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function tanggalPanjang(tanggal: Date): string {
  return `${tanggal.getDate()} ${NAMA_BULAN[tanggal.getMonth()]} ${tanggal.getFullYear()}`;
}

/** Kode deterministik: ID siswa + ID blok bab. Tanpa database, tetap dapat diverifikasi ulang. */
export function kodeVerifikasi(
  awalan: string,
  penerima: PenerimaSertifikat,
  idBlok: string,
  tanggal: Date,
): string {
  const benih = `${penerima.nama.trim().toLowerCase()}|${penerima.kelas.trim().toLowerCase()}|${penerima.kota
    .trim()
    .toLowerCase()}|${idBlok}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < benih.length; i += 1) {
    h ^= benih.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  let h2 = 0x9e3779b1;
  for (let i = benih.length - 1; i >= 0; i -= 1) {
    h2 ^= benih.charCodeAt(i);
    h2 = Math.imul(h2, 0x85ebca6b) >>> 0;
  }
  const hash = (h.toString(36) + h2.toString(36)).toUpperCase().slice(0, 8);
  const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
  return `${awalan}-${tanggal.getFullYear()}${bulan}-${hash}`;
}

type PropsSertifikat = {
  penerima: PenerimaSertifikat;
  tingkat: TingkatSertifikat;
  tanggal: Date;
  kode: string;
  penerbit: string;
  pendiri: string;
  pratinjau: boolean;
};

const WARNA = { biru: "#1C01A5", emas: "#F0AB00", emasMuda: "#FFE566", putih: "#FFFFFF" };

function bungkusTeks(ctx: CanvasRenderingContext2D, teks: string, lebarMaks: number): string[] {
  const kata = teks.split(/\s+/);
  const baris: string[] = [];
  let sekarang = "";
  for (const k of kata) {
    const coba = sekarang ? `${sekarang} ${k}` : k;
    if (ctx.measureText(coba).width > lebarMaks && sekarang) {
      baris.push(sekarang);
      sekarang = k;
    } else {
      sekarang = coba;
    }
  }
  if (sekarang) baris.push(sekarang);
  return baris;
}

/** Render sertifikat A4 landscape (1754x1240) langsung di browser. Biaya server Rp 0. */
function gambarKeCanvas(kanvas: HTMLCanvasElement, p: PropsSertifikat) {
  const L = 1754;
  const T = 1240;
  kanvas.width = L;
  kanvas.height = T;
  const ctx = kanvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = WARNA.putih;
  ctx.fillRect(0, 0, L, T);

  const grad = ctx.createLinearGradient(0, 0, L, T);
  grad.addColorStop(0, "#312e81");
  grad.addColorStop(0.5, "#4c1d95");
  grad.addColorStop(1, "#1e1b4b");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, L, T);

  ctx.fillStyle = WARNA.putih;
  ctx.fillRect(40, 40, L - 80, T - 80);
  ctx.strokeStyle = WARNA.emas;
  ctx.lineWidth = 8;
  ctx.strokeRect(62, 62, L - 124, T - 124);
  ctx.strokeStyle = WARNA.biru;
  ctx.lineWidth = 2;
  ctx.strokeRect(80, 80, L - 160, T - 160);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = WARNA.biru;
  ctx.beginPath();
  ctx.arc(L / 2, 170, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = WARNA.emasMuda;
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.font = "64px 'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif";
  ctx.fillStyle = WARNA.putih;
  ctx.fillText("🦉", L / 2, 194);

  ctx.fillStyle = WARNA.emas;
  ctx.font = "800 26px Arial, Helvetica, sans-serif";
  ctx.fillText("IGIL · INTERACTIVE & GAMIFIED INTELLIGENT LEARNING", L / 2, 268);

  ctx.fillStyle = WARNA.biru;
  ctx.font = "900 44px Arial, Helvetica, sans-serif";
  ctx.fillText("SERTIFIKAT KELULUSAN & KETUNTASAN", L / 2, 328);
  ctx.fillText("KOMPETENSI KURIKULUM MERDEKA", L / 2, 380);

  ctx.fillStyle = "#475569";
  ctx.font = "600 26px Arial, Helvetica, sans-serif";
  ctx.fillText("Dengan bangga diberikan kepada", L / 2, 440);

  ctx.fillStyle = WARNA.biru;
  ctx.font = "900 78px Georgia, 'Times New Roman', serif";
  let ukuran = 78;
  while (ctx.measureText(p.penerima.nama).width > L - 360 && ukuran > 36) {
    ukuran -= 4;
    ctx.font = `900 ${ukuran}px Georgia, 'Times New Roman', serif`;
  }
  ctx.fillText(p.penerima.nama, L / 2, 530);
  ctx.strokeStyle = WARNA.emas;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(L / 2 - 420, 552);
  ctx.lineTo(L / 2 + 420, 552);
  ctx.stroke();

  ctx.fillStyle = "#334155";
  ctx.font = "700 28px Arial, Helvetica, sans-serif";
  ctx.fillText(`${p.penerima.kelas} · ${p.penerima.kota}`, L / 2, 596);

  ctx.fillStyle = WARNA.biru;
  ctx.font = "900 34px Arial, Helvetica, sans-serif";
  const judul = bungkusTeks(ctx, p.tingkat.title, L - 360);
  judul.forEach((b, i) => ctx.fillText(b, L / 2, 656 + i * 42));
  const yAwalSkill = 656 + judul.length * 42 + 8;

  ctx.fillStyle = "#475569";
  ctx.font = "600 24px Arial, Helvetica, sans-serif";
  ctx.fillText(`${p.tingkat.subject} · Predikat LULUS SEMPURNA (100%)`, L / 2, yAwalSkill);

  ctx.textAlign = "left";
  ctx.font = "600 23px Arial, Helvetica, sans-serif";
  let y = yAwalSkill + 46;
  for (const skill of p.tingkat.skillsVerified.slice(0, 4)) {
    ctx.fillStyle = WARNA.emas;
    ctx.fillText("★", 250, y);
    ctx.fillStyle = "#1e1b4b";
    const baris = bungkusTeks(ctx, skill, L - 560);
    baris.slice(0, 2).forEach((b, i) => ctx.fillText(b, 290, y + i * 30));
    y += Math.min(baris.length, 2) * 30 + 10;
  }

  ctx.textAlign = "center";
  const yBawah = T - 190;
  ctx.fillStyle = "#334155";
  ctx.font = "600 22px Arial, Helvetica, sans-serif";
  ctx.fillText(`Tanggal ketuntasan: ${tanggalPanjang(p.tanggal)}`, 420, yBawah);
  ctx.fillStyle = WARNA.biru;
  ctx.font = "800 24px 'Courier New', monospace";
  ctx.fillText(p.kode, 420, yBawah + 40);
  ctx.fillStyle = "#64748b";
  ctx.font = "600 18px Arial, Helvetica, sans-serif";
  ctx.fillText("Kode Verifikasi Unik", 420, yBawah + 68);

  const cx = L / 2;
  const cy = yBawah - 6;
  ctx.fillStyle = WARNA.emas;
  ctx.beginPath();
  for (let i = 0; i < 24; i += 1) {
    const sudut = (Math.PI * 2 * i) / 24;
    const r = i % 2 === 0 ? 92 : 80;
    ctx.lineTo(cx + Math.cos(sudut) * r, cy + Math.sin(sudut) * r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = WARNA.biru;
  ctx.beginPath();
  ctx.arc(cx, cy, 66, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = WARNA.emasMuda;
  ctx.font = "900 44px Arial, Helvetica, sans-serif";
  ctx.fillText("100%", cx, cy + 8);
  ctx.font = "800 12px Arial, Helvetica, sans-serif";
  ctx.fillText("LULUS SEMPURNA", cx, cy + 32);
  ctx.fillText("★ ★ ★", cx, cy - 26);

  ctx.strokeStyle = WARNA.biru;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(L - 700, yBawah + 6);
  ctx.lineTo(L - 240, yBawah + 6);
  ctx.stroke();
  ctx.fillStyle = WARNA.biru;
  ctx.font = "800 22px Arial, Helvetica, sans-serif";
  ctx.fillText(p.pendiri, L - 470, yBawah + 38);
  ctx.fillStyle = "#64748b";
  ctx.font = "600 18px Arial, Helvetica, sans-serif";
  ctx.fillText(p.penerbit, L - 470, yBawah + 64);

  if (p.pratinjau) {
    ctx.save();
    ctx.translate(L / 2, T / 2);
    ctx.rotate(-Math.PI / 9);
    ctx.fillStyle = "rgba(28, 1, 165, 0.10)";
    ctx.font = "900 190px Arial, Helvetica, sans-serif";
    ctx.fillText("PRATINJAU", 0, 60);
    ctx.restore();
  }
}

const GAYA_CETAK = `
@media print {
  @page { size: A4 landscape; margin: 0; }
  html, body { background: #fff !important; }
  body * { visibility: hidden !important; }
  #sertifikat-cetak, #sertifikat-cetak * { visibility: visible !important; }
  #sertifikat-cetak {
    position: fixed !important; left: 0; top: 0;
    width: 100vw !important; height: 100vh !important; transform: none !important;
    margin: 0 !important; border-radius: 0 !important; box-shadow: none !important;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
}
`;

export function SertifikatDigital(props: PropsSertifikat) {
  const { penerima, tingkat, tanggal, kode, penerbit, pendiri, pratinjau } = props;
  const [status, setStatus] = useState("");
  const pembungkus = useRef<HTMLDivElement>(null);
  const sertifikat = useRef<HTMLDivElement>(null);
  const [skala, setSkala] = useState(1);
  const [tinggiLuar, setTinggiLuar] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = pembungkus.current;
    if (!el) return;
    const hitung = () => {
      const lebarTersedia = el.clientWidth - (window.innerWidth >= 640 ? 24 : 16);
      const s = Math.min(1, lebarTersedia / LEBAR_DASAR);
      setSkala(s);
      setTinggiLuar((sertifikat.current?.offsetHeight ?? 0) * s);
    };
    hitung();
    const pengamat = new ResizeObserver(hitung);
    pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  function unduhPng() {
    const kanvas = document.createElement("canvas");
    gambarKeCanvas(kanvas, props);
    kanvas.toBlob((blob) => {
      if (!blob) {
        setStatus("Gambar belum bisa dibuat. Coba lagi.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const tautan = document.createElement("a");
      tautan.href = url;
      tautan.download = `${kode}.png`;
      document.body.appendChild(tautan);
      tautan.click();
      tautan.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 2000);
      setStatus("Gambar sertifikat tersimpan di perangkatmu.");
    }, "image/png");
  }

  return (
    <div className="space-y-3">
      <style>{GAYA_CETAK}</style>

      <div ref={pembungkus} className="rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-2 sm:p-3">
        <div style={{ height: tinggiLuar, overflow: "hidden" }}>
        <div
          ref={sertifikat}
          id="sertifikat-cetak"
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-[1.6%] shadow-xl"
          style={{
            containerType: "inline-size",
            width: LEBAR_DASAR,
            transform: `scale(${skala})`,
            transformOrigin: "top left",
          }}
        >
          <div className="relative aspect-[297/210] w-full bg-white" style={{ padding: "1.6cqw" }}>
            <div
              className="absolute border-amber-400"
              style={{ inset: "1cqw", borderWidth: "0.45cqw", borderStyle: "solid" }}
            />
            <div
              className="absolute border-[#1C01A5]"
              style={{ inset: "2cqw", borderWidth: "0.12cqw", borderStyle: "solid" }}
            />

            <div className="relative flex h-full flex-col items-center text-center" style={{ padding: "2.2cqw 4cqw 2cqw" }}>
              <div
                className="flex items-center justify-center rounded-full border-amber-300 bg-[#1C01A5]"
                style={{ width: "6.4cqw", height: "6.4cqw", borderWidth: "0.35cqw", borderStyle: "solid", fontSize: "3.4cqw" }}
                aria-hidden="true"
              >
                🦉
              </div>
              <p className="font-black tracking-wide text-amber-500" style={{ fontSize: "1.25cqw", marginTop: "0.8cqw" }}>
                IGIL · INTERACTIVE &amp; GAMIFIED INTELLIGENT LEARNING
              </p>
              <h2 className="font-black leading-tight text-[#1C01A5]" style={{ fontSize: "2.5cqw", marginTop: "0.6cqw" }}>
                SERTIFIKAT KELULUSAN &amp; KETUNTASAN
                <br />
                KOMPETENSI KURIKULUM MERDEKA
              </h2>
              <p className="font-semibold text-slate-500" style={{ fontSize: "1.3cqw", marginTop: "1cqw" }}>
                Dengan bangga diberikan kepada
              </p>
              <p
                className="max-w-full break-words border-b-amber-400 font-black text-[#1C01A5]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "4.4cqw",
                  lineHeight: 1.1,
                  borderBottomWidth: "0.3cqw",
                  borderBottomStyle: "solid",
                  padding: "0 3cqw 0.3cqw",
                }}
              >
                {penerima.nama}
              </p>
              <p className="font-bold text-slate-600" style={{ fontSize: "1.45cqw", marginTop: "0.5cqw" }}>
                {penerima.kelas} · {penerima.kota}
              </p>
              <p className="font-black text-[#1C01A5]" style={{ fontSize: "1.8cqw", marginTop: "0.9cqw", lineHeight: 1.2 }}>
                {tingkat.title}
              </p>
              <p className="font-semibold text-slate-500" style={{ fontSize: "1.2cqw", marginTop: "0.3cqw" }}>
                {tingkat.subject} · Predikat{" "}
                <span className="font-black text-[#1C01A5]">LULUS SEMPURNA (100%)</span>
              </p>

              <ul className="w-full text-left" style={{ marginTop: "0.9cqw", paddingInline: "5cqw" }}>
                {tingkat.skillsVerified.slice(0, 4).map((skill) => (
                  <li
                    key={skill}
                    className="flex items-start font-semibold text-indigo-950"
                    style={{ fontSize: "1.15cqw", gap: "0.7cqw", marginTop: "0.35cqw", lineHeight: 1.25 }}
                  >
                    <span className="text-amber-500" aria-hidden="true">
                      ★
                    </span>
                    <span className="min-w-0 flex-1">{skill}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex w-full items-end justify-between" style={{ paddingInline: "2cqw" }}>
                <div className="text-left" style={{ width: "30cqw" }}>
                  <p className="font-semibold text-slate-600" style={{ fontSize: "1.1cqw" }}>
                    Tanggal ketuntasan: {tanggalPanjang(tanggal)}
                  </p>
                  <p className="break-all font-mono font-black text-[#1C01A5]" style={{ fontSize: "1.3cqw", marginTop: "0.3cqw" }}>
                    {kode}
                  </p>
                  <p className="font-semibold text-slate-400" style={{ fontSize: "0.95cqw" }}>
                    Kode Verifikasi Unik
                  </p>
                </div>

                <div
                  className="flex shrink-0 flex-col items-center justify-center rounded-full border-amber-400 bg-[#1C01A5] text-center text-amber-200"
                  style={{ width: "10.5cqw", height: "10.5cqw", borderWidth: "0.5cqw", borderStyle: "solid", outline: "0.35cqw solid #F0AB00", outlineOffset: "0.25cqw" }}
                >
                  <span className="font-black leading-none" style={{ fontSize: "0.9cqw" }} aria-hidden="true">
                    ★ ★ ★
                  </span>
                  <span className="font-black leading-none text-amber-300" style={{ fontSize: "2.7cqw", marginTop: "0.3cqw" }}>
                    100%
                  </span>
                  <span className="font-black leading-tight" style={{ fontSize: "0.85cqw", marginTop: "0.2cqw" }}>
                    LULUS
                    <br />
                    SEMPURNA
                  </span>
                </div>

                <div className="text-center" style={{ width: "30cqw" }}>
                  <div className="border-b-2 border-[#1C01A5]" style={{ height: "2.2cqw" }} />
                  <p className="font-black text-[#1C01A5]" style={{ fontSize: "1.15cqw", marginTop: "0.3cqw" }}>
                    {pendiri}
                  </p>
                  <p className="font-semibold text-slate-400" style={{ fontSize: "0.95cqw" }}>
                    {penerbit}
                  </p>
                </div>
              </div>
            </div>

            {pratinjau ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span
                  className="select-none font-black text-[#1C01A5]/10"
                  style={{ fontSize: "13cqw", transform: "rotate(-20deg)" }}
                >
                  PRATINJAU
                </span>
              </div>
            ) : null}
          </div>
        </div>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 rounded-2xl border-amber-400 bg-amber-400 px-4 py-3 text-base font-black text-indigo-950 shadow-md hover:bg-amber-300"
        >
          <span aria-hidden="true">🖨️</span> Cetak / Simpan PDF
        </button>
        <button
          type="button"
          onClick={unduhPng}
          className="flex items-center justify-center gap-2 rounded-2xl border-[#1C01A5] bg-white px-4 py-3 text-base font-black text-[#1C01A5] shadow-md hover:bg-indigo-50"
        >
          <span aria-hidden="true">🖼️</span> Unduh Gambar (.PNG)
        </button>
      </div>
      <p className="text-center text-xs font-semibold text-indigo-950/70" role="status" aria-live="polite">
        {status || "Dibuat langsung di perangkatmu. Tanpa biaya server dan tanpa unggah data."}
      </p>
    </div>
  );
}
