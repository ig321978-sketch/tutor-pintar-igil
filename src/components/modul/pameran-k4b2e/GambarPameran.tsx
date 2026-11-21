"use client";

import React from "react";
import { barisKartu, dasarDari, desimalDari, judulKartu, kisiSel, persenDari, type Cara, type Langkah, type LangkahDasar, type LJembatan, type Rupa } from "./logika-cpa";

/**
 * Gambar tugas CPA Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti" (desimal perseratusan dan persen): kisi seratus benda batik beremoji (Concrete; kotak terjual berwarna sebanyak persennya),
 * kisi seratus polos dan panah geser koma (Pictorial), dan kartu kata dan angka (Abstract). Tanpa skor dan tanpa jaringan.
 */

/** Benda pameran batik beremoji (Concrete); kunci adalah nama benda pada data. Emoji paling tinggi U+1FA95 tanpa ZWJ. */
export const EMOJI_BENDA: Record<string, string> = {
  kaus: "\u{1F455}",
  gaun: "\u{1F457}",
  tas: "\u{1F45C}",
  pita: "\u{1F380}",
  topi: "\u{1F452}",
  lampion: "\u{1F3EE}",
};
const emojiDari = (nama: string): string => EMOJI_BENDA[nama] ?? "\u{1F455}";

const BIRU = "#1C01A5";
const COKLAT = "#9A3412";

/** Kisi seratus benda beremoji (Concrete): 10 kolom x 10 baris tetap (tidak membungkus sendiri); `p` benda pertama berwarna (terjual), sisanya pudar. */
export function KisiBenda({ nama, p }: { nama: string; p: number }) {
  const sel = kisiSel(p);
  return (
    <div
      className="mx-auto w-fit max-w-full rounded-xl border-2 border-[#C2410C]/50 bg-[#FFF7ED] p-2"
      role="img"
      aria-label={`${p} ${nama} terjual dari seratus`}
      data-kolom={10}
      data-terjual={p}
      style={{ display: "grid", gridTemplateColumns: "repeat(10, 22px)", gridAutoRows: "22px", gap: 2, justifyContent: "center" }}
    >
      {sel.map((terjual, i) => (
        <span key={i} aria-hidden="true" data-terjual-sel={terjual ? "1" : "0"} className={`flex items-center justify-center text-base leading-none ${terjual ? "" : "opacity-25 grayscale"}`}>
          {emojiDari(nama)}
        </span>
      ))}
    </div>
  );
}

/** Kisi seratus polos (Pictorial): 10 x 10 kotak sama besar; `p` kotak pertama (baris demi baris) berwarna. */
export function KisiSvg({ p }: { p: number }) {
  const sel = kisiSel(p);
  const s = 12;
  const x0 = (300 - 10 * s) / 2;
  return (
    <svg viewBox="0 0 300 136" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`kisi seratus kotak, ${p} kotak berwarna`}>
      <rect x={4} y={3} width={292} height={130} rx={10} fill="#FFFBEB" stroke="#C2410C" strokeWidth={1.5} strokeDasharray="5 3" />
      {sel.map((w, i) => (
        <rect key={i} x={x0 + (i % 10) * s} y={8 + Math.floor(i / 10) * s} width={s} height={s} fill={w ? "#FDBA74" : "#FFFFFF"} stroke={COKLAT} strokeWidth={0.8} data-sel={w ? "1" : "0"} />
      ))}
    </svg>
  );
}

/** Sumber bilangan pada jembatan (Pictorial): satu kotak untuk tiap angka, koma, dan tanda persen; panah geser dua tempat bila `arah` ditampilkan. */
export function GeserSvg({ d, tampilArah }: { d: LJembatan; tampilArah: boolean }) {
  const sumber = d.arah === "kanan" ? desimalDari(d.p) : persenDari(d.p);
  const huruf = Array.from(sumber);
  const lebar = 26;
  const x0 = (300 - huruf.length * lebar) / 2;
  const idxKoma = huruf.indexOf(",");
  const ke = d.arah === "kanan" ? 2 : -2;
  return (
    <svg viewBox="0 0 300 64" className="mx-auto w-full max-w-[420px]" role="img" aria-label={`bilangan ${sumber}`}>
      <rect x={4} y={3} width={292} height={58} rx={10} fill="#FFFBEB" stroke="#C2410C" strokeWidth={1.5} strokeDasharray="5 3" />
      {huruf.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * lebar} y={26} width={lebar - 2} height={28} rx={4} fill={c === "," ? "#FDBA74" : "#FFFFFF"} stroke={BIRU} strokeWidth={1.4} />
          <text x={x0 + i * lebar + (lebar - 2) / 2} y={46} textAnchor="middle" fontSize={16} fontWeight={900} fill={BIRU}>
            {c}
          </text>
        </g>
      ))}
      {tampilArah && d.arah === "kanan" && idxKoma >= 0 ? (
        <path d={`M${x0 + idxKoma * lebar + 12} 24 Q${x0 + (idxKoma + ke / 2) * lebar + 12} 4 ${x0 + (idxKoma + ke) * lebar + 12} 24`} fill="none" stroke="#DC2626" strokeWidth={2} strokeDasharray="4 2" />
      ) : null}
      {tampilArah && d.arah === "kiri" ? (
        <path d={`M${x0 + (huruf.length - 1) * lebar + 12} 24 Q${x0 + (huruf.length - 2) * lebar + 12} 4 ${x0 + (huruf.length - 3) * lebar + 12} 24`} fill="none" stroke="#DC2626" strokeWidth={2} strokeDasharray="4 2" />
      ) : null}
    </svg>
  );
}

/** Teks dengan pecahan bertingkat: "35/100" tampil sebagai pembilang di atas penyebut dengan garis pecahan di antaranya. */
export function IsiBaris({ teks }: { teks: string }) {
  const bagian = teks.split(/(\d+\/\d+)/);
  return (
    <>
      {bagian.map((b, i) => {
        const m = /^(\d+)\/(\d+)$/.exec(b);
        if (!m) return <React.Fragment key={i}>{b}</React.Fragment>;
        return (
          <span key={i} className="mx-0.5 inline-flex flex-col items-center align-middle leading-none" data-pecahan={b}>
            <span className="px-0.5">{m[1]}</span>
            <span className="h-px w-full bg-current" />
            <span className="px-0.5">{m[2]}</span>
          </span>
        );
      })}
    </>
  );
}

/** Kartu kata dan angka (Abstract): satu baris satu keterangan, tanpa emoji. */
export function KartuKata({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="mx-auto max-w-[420px] space-y-1 rounded-md border-4 border-[#CA8A04] bg-white p-2" role="group" aria-label="Kartu kata">
      <p className="text-xs font-black uppercase tracking-wide text-[#A16207]">{judul}</p>
      {baris.map((b, i) => (
        <p key={`${i}${b}`} className="rounded-md border-2 border-dashed border-[#CA8A04] bg-[#FEFCE8] px-2 py-1 text-sm font-bold text-[#1C01A5]">
          <IsiBaris teks={b} />
        </p>
      ))}
    </div>
  );
}

const Keterangan = ({ baris }: { baris: string[] }) => (
  <div className="mx-auto max-w-[420px] space-y-0.5 text-center">
    {baris.map((b) => (
      <p key={b} className="text-xs font-black text-[#9A3412]">
        <IsiBaris teks={b} />
      </p>
    ))}
  </div>
);

/** Keterangan di bawah gambar Concrete dan Pictorial. Tugas kisi tidak menyebut banyak kotak berwarna (anak menghitungnya dari gambar). */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return d.tipe === "kisi" ? [kartu[kartu.length - 1]] : [kartu[0], kartu[kartu.length - 1]];
}

const NAMA_KARTU: Record<LangkahDasar["tipe"], string> = { ubah: "kartu desimal", perseratus: "kartu pecahan", kisi: "kartu kisi", jembatan: "kartu geser koma", sebut: "kartu kata" };

/** Gambar dasar sebuah tugas menurut jenis tugas dan rupanya: kisi benda beremoji (Concrete), kisi polos dan geser koma (Pictorial), atau kartu kata (Abstract). */
export function TampilDasar({ l, rupa, cara }: { l: Langkah; rupa: Rupa; cara: Cara }) {
  const d: LangkahDasar = dasarDari(l);
  const kartu = barisKartu(d, cara);
  if (rupa === "lambang") return <KartuKata judul={judulKartu(rupa, NAMA_KARTU[d.tipe])} baris={kartu} />;
  const ket = <Keterangan baris={ketGambar(d, cara)} />;
  if (rupa === "benda")
    return (
      <div className="space-y-1.5">
        <KisiBenda nama={d.benda} p={d.p} />
        {ket}
      </div>
    );
  return (
    <div className="space-y-1.5">
      <KisiSvg p={d.p} />
      {d.tipe === "jembatan" ? <GeserSvg d={d} tampilArah={cara !== "suara"} /> : null}
      {ket}
    </div>
  );
}
