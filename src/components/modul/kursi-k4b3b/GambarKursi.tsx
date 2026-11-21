"use client";

import React from "react";
import { aturanTeks, barisKartu, dasarDari, hasilMesin, hasilTugas, judulKartu, polaSuku, susunBaris, tigaPertama, type Cara, type Langkah, type LangkahDasar, type LMesin, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 4 Bab 3 Sub-Bab B "Barisan Kursi Pak Gunawan" (pola bilangan): baris benda panggung beremoji sebanyak bilangannya (Concrete) atau baris titik polos sebanyak bilangannya (Pictorial),
 * rantai loncat, mesin aturan, dan tabel urutan digambar tepat sesuai data, serta kartu kata dan angka (Abstract). Tanpa skor dan tanpa jaringan.
 */

/** Benda panggung beremoji (Concrete); kunci adalah nama benda pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  angklung: "\u{1F3B6}",
  lampu: "\u{1F4A1}",
  balon: "\u{1F388}",
  bel: "\u{1F514}",
  drum: "\u{1F941}",
  bintang: "\u{2B50}",
  mikrofon: "\u{1F3A4}",
  piano: "\u{1F3B9}",
};
const emojiDari = (nama: string): string => EMOJI_BENDA[nama] ?? "\u{1F3B6}";

const BIRU = "#1C01A5";
const COKLAT = "#9A3412";
const KOLOM_BENDA = 7;
const KOLOM_TITIK = 16;

/** Satu baris benda beremoji (Concrete): kisi tetap sepuluh kolom (tidak membungkus sendiri), `n` benda sungguhan, dengan label dan bilangannya di sebelah kiri. */
export function BarisBenda({ nama, n, label }: { nama: string; n: number; label: string }) {
  const emoji = emojiDari(nama);
  return (
    <div className="flex items-start gap-1.5" role="img" aria-label={`${label}: ${n} ${nama}`} data-banyak={n}>
      <span className="w-12 shrink-0 text-right text-xs font-black leading-tight text-[#9A3412]">
        {label}
        <span className="block text-base leading-none text-[#1C01A5]">{n}</span>
      </span>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${KOLOM_BENDA}, 18px)`, gridAutoRows: "18px", gap: 2 }} data-kolom={KOLOM_BENDA}>
        {Array.from({ length: n }, (_, i) => (
          <span key={i} aria-hidden="true" data-benda="1" className="flex items-center justify-center text-sm leading-none">
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Beberapa baris benda: tiga bilangan pertama pola (label "baris 1" dan seterusnya). */
function TumpukBenda({ nama, suku, label }: { nama: string; suku: number[]; label?: string[] }) {
  return (
    <div className="mx-auto w-fit max-w-full space-y-1.5 rounded-xl border-2 border-[#B45309]/50 bg-[#FFFBEB] p-2" data-baris={suku.length}>
      {suku.map((n, i) => (
        <BarisBenda key={i} nama={nama} n={n} label={label?.[i] ?? `baris ${i + 1}`} />
      ))}
    </div>
  );
}

/** Baris titik polos (Pictorial): tiap bilangan menjadi satu rangkaian baris titik, `n` titik sungguhan (paling banyak enam belas per baris). */
export function TitikSvg({ suku, label }: { suku: number[]; label?: string[] }) {
  const pitch = 9;
  const x0 = 50;
  let y = 8;
  const unsur: React.ReactNode[] = [];
  suku.forEach((n, q) => {
    const baris = susunBaris(n, KOLOM_TITIK);
    unsur.push(
      <text key={`t${q}`} x={4} y={y + 8} fontSize={10} fontWeight={900} fill={COKLAT}>
        {label?.[q] ?? `baris ${q + 1}`}
      </text>,
      <text key={`n${q}`} x={4} y={y + 20} fontSize={12} fontWeight={900} fill={BIRU}>
        {n}
      </text>,
    );
    baris.forEach((banyak, r) => {
      for (let i = 0; i < banyak; i += 1) unsur.push(<circle key={`${q}-${r}-${i}`} cx={x0 + i * pitch + 4} cy={y + r * pitch + 4} r={3.2} fill="#60A5FA" stroke="#1D4ED8" strokeWidth={0.8} data-titik="1" />);
    });
    y += Math.max(baris.length * pitch, 22) + 6;
  });
  return (
    <svg viewBox={`0 0 300 ${y + 4}`} className="mx-auto w-full max-w-[420px]" role="img" aria-label={`titik: ${suku.join(", ")}`} data-titik-total={suku.reduce((s, n) => s + n, 0)}>
      <rect x={2} y={2} width={296} height={y} rx={10} fill="#EFF6FF" stroke="#1D4ED8" strokeWidth={1.2} strokeDasharray="5 3" />
      {unsur}
    </svg>
  );
}

const WARNA_RUPA = {
  benda: { garis: "#B45309", isi: "#FEF3C7", tebal: "#92400E" },
  diagram: { garis: "#1D4ED8", isi: "#DBEAFE", tebal: "#1E3A8A" },
} as const;

/** Rantai loncat: lingkaran bilangan dengan busur loncatan di antaranya. `etiket` tulisan di tiap busur ("?" bila beda belum diketahui), `tanya` menambah lingkaran putus-putus "?" sebagai bilangan berikutnya. */
export function RantaiSvg({ suku, etiket = "?", tanya = false, rupa }: { suku: number[]; etiket?: string; tanya?: boolean; rupa: "benda" | "diagram" }) {
  const w = WARNA_RUPA[rupa];
  const banyak = suku.length + (tanya ? 1 : 0);
  const jarak = banyak <= 3 ? 90 : 70;
  const x0 = (300 - (banyak - 1) * jarak) / 2;
  const titik = Array.from({ length: banyak }, (_, i) => x0 + i * jarak);
  return (
    <svg viewBox="0 0 300 84" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`rantai loncat: ${suku.join(", ")}${tanya ? ", ?" : ""}`} data-lingkaran={banyak}>
      <rect x={3} y={2} width={294} height={80} rx={10} fill={w.isi} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.55} />
      {titik.slice(0, -1).map((x, i) => (
        <g key={`b${i}`}>
          <path d={`M${x} 42 Q${x + jarak / 2} 6 ${titik[i + 1]} 42`} fill="none" stroke={w.garis} strokeWidth={1.8} strokeDasharray={tanya && i === banyak - 2 ? "4 3" : undefined} />
          <text x={x + jarak / 2} y={17} textAnchor="middle" fontSize={11} fontWeight={900} fill="#DC2626">
            {etiket}
          </text>
        </g>
      ))}
      {titik.map((x, i) => (
        <g key={`c${i}`}>
          <circle cx={x} cy={56} r={14} fill="#FFFFFF" stroke={w.garis} strokeWidth={2} strokeDasharray={tanya && i === banyak - 1 ? "4 3" : undefined} />
          <text x={x} y={61} textAnchor="middle" fontSize={suku[i] !== undefined && suku[i] >= 100 ? 9 : 12} fontWeight={900} fill={BIRU}>
            {i < suku.length ? suku[i] : "?"}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Mesin aturan: bilangan masuk, kotak mesin berisi aturan (atau "?"), dan bilangan keluar (atau "?"). */
export function MesinSvg({ masuk, aturan, kali, keluar, rupa }: { masuk: number; aturan: string; kali: number; keluar: string; rupa: "benda" | "diagram" }) {
  const w = WARNA_RUPA[rupa];
  return (
    <svg viewBox="0 0 300 104" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`mesin aturan ${aturan}, masuk ${masuk}, dipakai ${kali} kali, keluar ${keluar}`} data-aturan={aturan} data-kali={kali}>
      <rect x={3} y={2} width={294} height={100} rx={10} fill={w.isi} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.55} />
      <circle cx={40} cy={50} r={20} fill="#FFFFFF" stroke={w.garis} strokeWidth={2} />
      <text x={40} y={55} textAnchor="middle" fontSize={masuk >= 100 ? 11 : 15} fontWeight={900} fill={BIRU}>
        {masuk}
      </text>
      <text x={40} y={84} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.tebal}>
        masuk
      </text>
      <path d="M62 50 L96 50" stroke={w.garis} strokeWidth={2.4} />
      <polygon points="96,44 106,50 96,56" fill={w.garis} />
      <rect x={106} y={20} width={88} height={60} rx={8} fill="#FFFFFF" stroke={w.garis} strokeWidth={3} />
      <text x={150} y={37} textAnchor="middle" fontSize={9} fontWeight={900} fill={w.tebal}>
        mesin
      </text>
      <text x={150} y={62} textAnchor="middle" fontSize={20} fontWeight={900} fill="#DC2626">
        {aturan}
      </text>
      <text x={150} y={96} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.tebal}>
        {`dipakai ${kali} kali`}
      </text>
      <path d="M194 50 L228 50" stroke={w.garis} strokeWidth={2.4} />
      <polygon points="228,44 238,50 228,56" fill={w.garis} />
      <circle cx={262} cy={50} r={20} fill="#FFFFFF" stroke={w.garis} strokeWidth={2} strokeDasharray={keluar === "?" ? "4 3" : undefined} />
      <text x={262} y={55} textAnchor="middle" fontSize={keluar.length >= 3 ? 11 : 15} fontWeight={900} fill={BIRU}>
        {keluar}
      </text>
      <text x={262} y={84} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.tebal}>
        keluar
      </text>
    </svg>
  );
}

/** Tabel urutan: baris atas nomor urutan (satu, dua, tiga, dan urutan yang ditanyakan), baris bawah bilangan pola (tiga bilangan pertama dan "?"). */
export function TabelSvg({ suku, n, rupa }: { suku: number[]; n: number; rupa: "benda" | "diagram" }) {
  const w = WARNA_RUPA[rupa];
  const urutan = [1, 2, 3, n];
  const isi = [...suku.slice(0, 3).map(String), "?"];
  const lebar = 56;
  const x0 = 64;
  return (
    <svg viewBox="0 0 300 80" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`tabel urutan ${urutan.join(", ")} dengan bilangan ${isi.join(", ")}`} data-urutan={n}>
      <rect x={3} y={2} width={294} height={76} rx={10} fill={w.isi} stroke={w.garis} strokeWidth={1.2} strokeDasharray="5 3" opacity={0.55} />
      {[0, 1].map((r) => (
        <g key={r}>
          <rect x={6} y={10 + r * 32} width={56} height={28} fill={w.garis} opacity={0.2} stroke={w.garis} strokeWidth={1.2} />
          <text x={34} y={28 + r * 32} textAnchor="middle" fontSize={10} fontWeight={900} fill={w.tebal}>
            {r === 0 ? "urutan" : "bilangan"}
          </text>
          {(r === 0 ? urutan.map(String) : isi).map((t, i) => (
            <g key={i}>
              <rect x={x0 + i * lebar} y={10 + r * 32} width={lebar - 2} height={28} fill="#FFFFFF" stroke={w.garis} strokeWidth={1.4} strokeDasharray={t === "?" ? "4 3" : undefined} />
              <text x={x0 + i * lebar + (lebar - 2) / 2} y={29 + r * 32} textAnchor="middle" fontSize={14} fontWeight={900} fill={t === "?" ? "#DC2626" : BIRU}>
                {t}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/** Kartu kata dan angka (Abstract): satu baris satu keterangan, tanpa emoji. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#CA8A04] bg-white p-2" role="group" aria-label="Kartu kata">
      <p className="text-xs font-black uppercase tracking-wide text-[#A16207]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#CA8A04] bg-[#FEFCE8] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          {b}
        </p>
      ))}
    </div>
  );
}

const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#9A3412]">
        {b}
      </p>
    ))}
  </div>
);

/** Keterangan di bawah gambar Concrete dan Pictorial (baris pertama dan terakhir kartu kata). */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return [kartu[0], kartu[kartu.length - 1]];
}

const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { beda: "kartu beda", rantai: "kartu rantai", mesin: "kartu mesin", tabel: "kartu tabel", sebut: "kartu kata" };

/** Isi gambar menurut jenis tugas dan rupa (benda beremoji atau titik polos). */
function Bagian({ d, rupa, cara }: { d: LangkahDasar; rupa: "benda" | "diagram"; cara: Cara }) {
  const tiga = tigaPertama(d);
  const baris = (suku: number[], label?: string[]) => (rupa === "benda" ? <TumpukBenda nama={d.benda} suku={suku} label={label} /> : <TitikSvg suku={suku} label={label} />);
  switch (d.tipe) {
    case "beda":
      return (
        <>
          {baris(tiga)}
          <RantaiSvg suku={tiga} rupa={rupa} />
        </>
      );
    case "rantai":
      return (
        <>
          {baris(tiga)}
          <RantaiSvg suku={tiga} tanya rupa={rupa} />
        </>
      );
    case "mesin": {
      const m: LMesin = d;
      const operasi = cara === "suara" && !!m.operasi;
      return (
        <>
          {baris(operasi ? [m.a, hasilTugas(m)] : [m.a], operasi ? ["masuk", "keluar"] : ["masuk"])}
          <MesinSvg masuk={m.a} aturan={operasi ? "?" : aturanTeks(m.d, m.arah)} kali={m.kali} keluar={operasi ? String(hasilMesin(m.a, m.d, m.arah, m.kali)) : "?"} rupa={rupa} />
        </>
      );
    }
    case "tabel":
      return (
        <>
          {baris(tiga)}
          <TabelSvg suku={polaSuku(d.a, d.d, d.arah, 3)} n={d.n} rupa={rupa} />
        </>
      );
    case "sebut":
      return d.kata === "beda" ? (
        <>
          {baris(tiga)}
          <RantaiSvg suku={tiga} rupa={rupa} />
        </>
      ) : (
        baris(tiga)
      );
  }
}

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: baris benda beremoji (Concrete), baris titik polos (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={barisKartu(d, cara)} />;
  return (
    <div className="space-y-1.5">
      <Bagian d={d} rupa={rupa} cara={cara} />
      <Keterangan baris={ketGambar(d, cara)} />
    </div>
  );
}
