"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  barisPasang,
  indeksPaling,
  indeksPosisi,
  kalimatBanding,
  kata,
  petunjukSalah,
  pilihanDari,
  puluhan,
  sisiBanding,
  urutkan,
  type Langkah,
  type LangkahBanding,
  type LangkahDasar,
  type LangkahMenara,
  type LangkahPasang,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahUrut,
  type Rupa,
} from "./logika";
import { EMOJI, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  DASAR_MENARA,
  GARIS_URUT,
  KARTU_BARIS,
  KARTU_URUT,
  KOTAK_BANDING,
  KUBUS,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  letakBanding,
  letakBaris,
  letakDipasang,
  letakIsiBanding,
  letakKartu,
  letakMenara,
  letakPasang,
  letakSlot,
  periksaCentang,
  periksaLingkari,
  pusatMenara,
  xGaris,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 5 Sub-Bab D: kegiatan metode (Metode IGIL puluhan dulu lalu satuan, One-to-One Matching memindahkan benda
 * ke pasangannya, Cube Towers membandingkan menara, Number Line Order memindahkan kartu ke tempat urut), soal Cari kesalahan
 * (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab dengan caranya.
 * Rupa: ikan, ember, dan kubus mainan berwarna (Concrete), kotak, titik, dan garis polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Cara menjawab bilangan sampai dua puluh memakai ulang Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const AIR = "#0369A1";
const MERAH = "#DC2626";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const emoji = (j: string) => EMOJI[j] ?? EMOJI.ikan;
const emojiLain = (j: string) => (j === "udang" ? EMOJI.siput : EMOJI.udang);

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
const Gambar = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
    {children}
  </svg>
);
const Judul = ({ teks }: { teks: string }) => (
  <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
);
function KartuTanya({ atas, bawah }: { atas: React.ReactNode; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p className="text-2xl">{bawah}</p>
    </div>
  );
}
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#DB2777] bg-[#FDF2F8] px-3 py-0.5 text-[#9D174D]">{children}</span>;
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk rupa lambang yang langsung menjawab). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Metode IGIL: puluhan dulu, lalu satuan ------------------------------ */
function Kumpulan({ i, n, rupa, jenis, tanda }: { i: number; n: number; rupa: Rupa; jenis: string; tanda: "biasa" | "pilih" | "salah" }) {
  const c = letakBanding(i);
  const p = puluhan(n);
  const garis = tanda === "pilih" ? HIJAU : tanda === "salah" ? MERAH : rupa === "benda" ? AIR : UNGU;
  const isi = rupa === "benda" ? (WARNA_BENDA[jenis] ?? ["#BFDBFE"])[0] : "#FFFFFF";
  return (
    <g>
      <rect x={c.x - KOTAK_BANDING.w / 2} y={c.y - KOTAK_BANDING.h / 2} width={KOTAK_BANDING.w} height={KOTAK_BANDING.h} rx={rupa === "benda" ? 14 : 4} fill={rupa === "benda" ? "#E0F2FE" : "#FFFFFF"} stroke={garis} strokeWidth={tanda === "biasa" ? 2 : 3.5} />
      {Array.from({ length: p }, (_, j) => (
        <rect key={j} x={c.x - 34} y={c.y - 54 + j * 32} width={68} height={28} rx={rupa === "benda" ? 9 : 1} fill={rupa === "benda" ? "rgba(146,64,14,0.12)" : "none"} stroke={rupa === "benda" ? "#92400E" : UNGU} strokeWidth={1.6} strokeDasharray={rupa === "benda" ? "3 2" : undefined} />
      ))}
      {Array.from({ length: n }, (_, j) => {
        const t = letakIsiBanding(j, n);
        return rupa === "benda" ? (
          <text key={j} x={c.x + t.x} y={c.y + t.y + 4} textAnchor="middle" fontSize={10}>
            {emoji(jenis)}
          </text>
        ) : (
          <rect key={j} x={c.x + t.x - 5} y={c.y + t.y - 5} width={10} height={10} fill={isi} stroke={UNGU} strokeWidth={1.2} />
        );
      })}
    </g>
  );
}

function Banding({ l, rupa, kanvas, diam, salah, siap }: PK & { l: LangkahBanding }) {
  const target = sisiBanding(l);
  const bedaPuluhan = puluhan(l.a) !== puluhan(l.b);
  const [tahap, setTahap] = useState<"puluhan" | "pilih" | "selesai">("puluhan");
  const [mati, setMati] = useState<string[]>([]);
  const [salahDi, setSalahDi] = useState(-1);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [bantu, setBantu] = useState("");
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>{l.a}</Kotak> dan <Kotak>{l.b}</Kotak>
          </>
        }
        bawah={
          <>
            lebih {l.tanya} = <Tanya />
          </>
        }
      />
    );
  const jawabPuluhan = (beda: boolean) => {
    if (beda === bedaPuluhan) {
      setTahap("pilih");
      setBantu(beda ? "Betul, puluhannya beda. Yang punya ikatan sepuluh lebih banyak, lebih banyak." : "Betul, puluhannya sama. Sekarang lihat satuannya, sisa di luar ikatan.");
    } else {
      setMati((m) => [...m, beda ? "beda" : "sama"]);
      salah(bedaPuluhan ? `Hitung ikatan sepuluhnya: kiri ${kata(puluhan(l.a))}, kanan ${kata(puluhan(l.b))}. Banyak ikatannya beda.` : `Hitung ikatan sepuluhnya: keduanya ${kata(puluhan(l.a))}. Banyak ikatannya sama.`);
    }
  };
  const pilih = (i: number) => {
    if (tahap !== "pilih" || kanvas || diam) return;
    if (i === target) {
      setTahap("selesai");
      setSalahDi(-1);
      siap(kalimatBanding(l.a, l.b));
    } else {
      setSalahDi(i);
      salah(bedaPuluhan ? `Kumpulan itu ikatan sepuluhnya ${i === 0 ? (puluhan(l.a) > puluhan(l.b) ? "lebih banyak" : "lebih sedikit") : puluhan(l.b) > puluhan(l.a) ? "lebih banyak" : "lebih sedikit"}. Cari yang lebih ${l.tanya}.` : `Puluhannya sama, jadi lihat satuan. Kumpulan itu sisanya lebih ${l.tanya === "banyak" ? "sedikit" : "banyak"}.`);
    }
  };
  const periksa = () => {
    const r = periksaLingkari(goresan, [0, 1].map(letakBanding), [target === 0, target === 1]);
    if (r.benar) {
      setTahap("selesai");
      siap(kalimatBanding(l.a, l.b));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu kumpulan saja." : bedaPuluhan ? "Bandingkan ikatan sepuluhnya dulu, lalu lingkari." : "Ikatan sepuluhnya sama. Bandingkan sisanya, lalu lingkari.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? `lingkari yang lebih ${l.tanya}` : "ikatan sepuluh dulu, lalu sisanya"} />
      {[0, 1].map((i) => (
        <g key={i} {...(kanvas || diam ? {} : ketuk(() => pilih(i)))} aria-label={`kumpulan ${i === 0 ? "kiri" : "kanan"}${rupa === "benda" ? `, ${NAMA_BENDA[l.jenis] ?? "ikan"}` : ""}`}>
          <Kumpulan i={i} n={i === 0 ? l.a : l.b} rupa={rupa} jenis={l.jenis} tanda={tahap === "selesai" && i === target ? "pilih" : salahDi === i ? "salah" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (diam) return <Gambar label="Dua kumpulan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={tahap === "selesai"} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label="Dua kumpulan untuk dibandingkan">{gambar}</Gambar>
      {tahap === "puluhan" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Langkah satu: banyak ikatan sepuluhnya sama atau beda?</p>
          <div className="flex justify-center gap-2">
            <Tombol teks="sama" mati={mati.includes("sama")} onClick={() => jawabPuluhan(false)} />
            <Tombol teks="beda" mati={mati.includes("beda")} onClick={() => jawabPuluhan(true)} />
          </div>
        </div>
      ) : tahap === "pilih" ? (
        <p className="text-center text-sm font-black text-[#15803D]">
          {bantu} Langkah dua: ketuk kumpulan yang lebih {l.tanya}.
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------ One-to-One Matching: pindahkan ke pasangannya ------------------------------ */
function Pasang({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahPasang }) {
  const min = Math.min(l.a, l.b);
  const [pindah, setPindah] = useState<number[]>([]);
  const [salahBaris, setSalahBaris] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const mana = l.tanya !== "sisa";
  const target = mana ? barisPasang(l as LangkahPasang & { tanya: "banyak" | "sedikit" }) : -1;
  const lambangLangsung = rupa === "lambang" && !mana && !diam;
  useSiapLangsung(lambangLangsung, () => siap());
  const habis = pindah.length >= min;
  const pilihBaris = (b: number) => {
    if (selesai || !mana || diam) return;
    if (rupa !== "lambang" && !habis && !kanvas) {
      salah("Pindahkan dulu tiap benda atas ke pasangannya.");
      return;
    }
    if (b === target) {
      setSelesai(true);
      setSalahBaris(-1);
      siap(`Betul! Baris ${b === 0 ? "atas" : "bawah"} lebih ${l.tanya}.`);
    } else {
      setSalahBaris(b);
      const sisa = (b === 0 ? l.a : l.b) > (b === 0 ? l.b : l.a);
      salah(sisa ? "Baris itu masih punya sisa, jadi lebih banyak." : "Baris itu habis duluan, jadi lebih sedikit.");
    }
  };
  if (rupa === "lambang" && !mana)
    return (
      <KartuTanya
        atas={
          <>
            pasangkan <Kotak>{l.a}</Kotak> dan <Kotak>{l.b}</Kotak>
          </>
        }
        bawah={
          <>
            tanpa pasangan = <Tanya />
          </>
        }
      />
    );
  if (rupa === "lambang" && !kanvas && !diam)
    return (
      <div className="flex justify-center gap-3 py-2" role="group" aria-label="Pilih bilangan">
        {[0, 1].map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => pilihBaris(b)}
            className={`min-h-[64px] min-w-[96px] rounded-2xl border-4 text-3xl font-black text-[#9D174D] ${selesai && b === target ? "border-[#15803D] bg-[#DCFCE7]" : salahBaris === b ? "border-[#DC2626] bg-[#FEE2E2]" : "border-[#DB2777] bg-[#FDF2F8]"}`}
          >
            {b === 0 ? l.a : l.b}
          </button>
        ))}
      </div>
    );
  const ketukAtas = (i: number) => {
    if (selesai || kanvas || diam || pindah.includes(i)) return;
    if (pindah.length >= l.b) {
      info(`Baris bawah sudah habis. Yang ini tidak punya pasangan.`);
      return;
    }
    const baru = [...pindah, i];
    setPindah(baru);
    if (baru.length === min) {
      const s = Math.abs(l.a - l.b);
      if (mana) info(`${besar(kata(min))} pasang. ${s ? `Sisa ${kata(s)} tanpa pasangan.` : "Tidak ada sisa."} Ketuk kartu baris yang lebih ${l.tanya}.`);
      else {
        setSelesai(true);
        siap(`${besar(kata(min))} pasang. Sisa ${kata(s)} tanpa pasangan.`);
      }
    } else info(kata(baru.length));
  };
  const sisaLetak = Array.from({ length: Math.abs(l.a - l.b) }, (_, j) => letakPasang(l.a > l.b ? 0 : 1, min + j));
  const periksa = () => {
    if (mana) {
      const r = periksaLingkari(goresan, [0, 1].map(letakBaris), [target === 0, target === 1]);
      if (r.benar) {
        setSelesai(true);
        siap(`Betul! Baris ${target === 0 ? "atas" : "bawah"} lebih ${l.tanya}.`);
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? (rupa === "lambang" ? "Lingkari satu bilangan saja." : "Lingkari satu kartu baris saja.") : rupa === "lambang" ? `Pasangkan satu-satu dalam pikiranmu. Lingkari bilangan yang lebih ${l.tanya}.` : `Baris yang punya sisa lebih banyak. Lingkari kartu baris yang lebih ${l.tanya}.`);
      }
      return;
    }
    const p = periksaCentang(goresan, sisaLetak, 10);
    if (p.benar) {
      setSelesai(true);
      siap("Betul! Itu yang tidak punya pasangan.");
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu benda, satu tanda." : p.nyasar > 0 ? "Yang sudah berpasangan jangan diberi tanda." : "Masih ada yang tanpa pasangan belum diberi tanda.");
    }
  };
  const garisPasang = kanvas || diam;
  const benda = (b: number, i: number) => {
    const tergeser = b === 0 && pindah.includes(i);
    const pos = tergeser ? letakDipasang(pindah.indexOf(i)) : letakPasang(b, i);
    const sisa = i >= min && (garisPasang || habis);
    return (
      <g key={`${b}-${i}`} {...(b === 0 && !kanvas && !diam ? ketuk(() => ketukAtas(i)) : {})} aria-label={`${b === 0 ? "atas" : "bawah"} ${kata(i + 1)}${tergeser ? ", sudah dipasangkan" : ""}`}>
        <circle cx={pos.x} cy={pos.y} r={9.5} fill={sisa ? "#FEF3C7" : "transparent"} stroke={sisa ? "#B45309" : "none"} strokeWidth={1.4} />
        {rupa === "benda" ? (
          <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize={14}>
            {b === 0 ? emoji(l.jenis) : emojiLain(l.jenis)}
          </text>
        ) : (
          <circle cx={pos.x} cy={pos.y} r={7} fill={b === 0 ? "#F87171" : "#60A5FA"} stroke={UNGU} strokeWidth={1.2} />
        )}
      </g>
    );
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? (mana ? `lingkari kartu baris yang lebih ${l.tanya}` : "tandai yang tanpa pasangan") : `dipasangkan: ${pindah.length}`} />
      {rupa === "benda" ? (
        <g aria-hidden="true">
          <rect x={48} y={BARIS_Y(0) - 16} width={246} height={32} rx={16} fill="#BAE6FD" opacity={0.6} />
          <rect x={48} y={BARIS_Y(1) - 16} width={246} height={32} rx={16} fill="#BAE6FD" opacity={0.6} />
        </g>
      ) : null}
      {garisPasang
        ? Array.from({ length: min }, (_, i) => <line key={i} x1={letakPasang(0, i).x} x2={letakPasang(1, i).x} y1={letakPasang(0, i).y + 9} y2={letakPasang(1, i).y - 9} stroke={HIJAU} strokeWidth={1.6} strokeDasharray="3 2" />)
        : null}
      {[0, 1].map((b) => {
        const t = letakBaris(b);
        return (
          <g key={b} {...(mana && !kanvas && !diam ? ketuk(() => pilihBaris(b)) : {})} aria-label={`kartu baris ${b === 0 ? "atas" : "bawah"}`}>
            <rect x={t.x - KARTU_BARIS.w / 2} y={t.y - KARTU_BARIS.h / 2} width={KARTU_BARIS.w} height={KARTU_BARIS.h} rx={6} fill={selesai && b === target ? "#DCFCE7" : salahBaris === b ? "#FEE2E2" : "#FFFFFF"} stroke={UNGU} strokeWidth={2} />
            <text x={t.x} y={t.y + 4} textAnchor="middle" fontSize={rupa === "lambang" ? 14 : 10} fontWeight={900} fill={UNGU}>
              {rupa === "lambang" ? (b === 0 ? l.a : l.b) : b === 0 ? "atas" : "bawah"}
            </text>
          </g>
        );
      })}
      {rupa === "lambang" ? null : (
        <>
          {Array.from({ length: l.a }, (_, i) => benda(0, i))}
          {Array.from({ length: l.b }, (_, i) => benda(1, i))}
        </>
      )}
    </g>
  );
  if (diam) return <Gambar label="Dua baris berpasangan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? `Dua ember berisi ${NAMA_BENDA[l.jenis] ?? "ikan"} dan hewan lain` : "Titik merah dan titik biru"}>{gambar}</Gambar>;
}
const BARIS_Y = (b: number) => letakPasang(b, 0).y;

/* ------------------------------ Cube Towers: menara kubus ------------------------------ */
const WARNA_KUBUS = ["#60A5FA", "#FACC15"];
function Menara({ l, rupa, kanvas, diam, salah, siap }: PK & { l: LangkahMenara }) {
  const target = indeksPaling(l.isi, l.tanya);
  const [pilih, setPilih] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            {l.isi.map((n, i) => (
              <Kotak key={i}>{n}</Kotak>
            ))}
          </>
        }
        bawah={
          <>
            paling {l.tanya} = <Tanya />
          </>
        }
      />
    );
  const ketukMenara = (i: number) => {
    if (selesai || kanvas || diam) return;
    setPilih(i);
    if (i === target) {
      setSelesai(true);
      siap(`Betul! Menara itu paling ${l.tanya === "banyak" ? "tinggi" : "rendah"}, jadi paling ${l.tanya}.`);
    } else {
      const lain = l.isi.some((n, j) => j !== i && (l.tanya === "banyak" ? n > l.isi[i] : n < l.isi[i]));
      salah(lain ? `Masih ada menara yang lebih ${l.tanya === "banyak" ? "tinggi" : "rendah"} dari menara itu.` : "Bandingkan lagi tingginya.");
    }
  };
  const periksa = () => {
    const r = periksaLingkari(
      goresan,
      l.isi.map((n, i) => pusatMenara(i, n)),
      l.isi.map((_, i) => i === target),
    );
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Itu menara paling ${l.tanya}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu menara saja." : `Cari menara yang paling ${l.tanya === "banyak" ? "tinggi" : "rendah"}, lalu lingkari.`);
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? `lingkari menara paling ${l.tanya}` : `ketuk menara paling ${l.tanya}`} />
      <line x1={20} x2={280} y1={DASAR_MENARA + 1} y2={DASAR_MENARA + 1} stroke={rupa === "benda" ? "#92400E" : UNGU} strokeWidth={rupa === "benda" ? 5 : 2} />
      {l.isi.map((n, i) => {
        const m = letakMenara(i);
        const tanda = selesai && i === target ? HIJAU : pilih === i ? MERAH : null;
        return (
          <g key={i} {...(kanvas || diam ? {} : ketuk(() => ketukMenara(i)))} aria-label={`menara ${["kiri", "tengah", "kanan"][i]}`}>
            <rect x={m.x - 22} y={DASAR_MENARA - n * KUBUS.h - 24} width={44} height={n * KUBUS.h + 24} fill="transparent" stroke={tanda ?? "none"} strokeWidth={3} rx={6} />
            {Array.from({ length: n }, (_, j) => (
              <rect
                key={j}
                x={m.x - KUBUS.w / 2}
                y={DASAR_MENARA - (j + 1) * KUBUS.h}
                width={KUBUS.w}
                height={KUBUS.h}
                rx={rupa === "benda" ? 1.5 : 0}
                fill={rupa === "benda" ? WARNA_KUBUS[Math.floor(j / 10) % 2] : "#FFFFFF"}
                stroke={rupa === "benda" ? "#1E3A8A" : UNGU}
                strokeWidth={j % 10 === 9 ? 2 : 0.9}
              />
            ))}
            {rupa === "benda" ? (
              <text x={m.x} y={DASAR_MENARA - n * KUBUS.h - 6} textAnchor="middle" fontSize={14}>
                {emoji(l.jenis)}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
  if (diam) return <Gambar label="Tiga menara">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Tiga menara kubus mainan" : "Tiga menara kotak polos"}>{gambar}</Gambar>;
}

/* ------------------------------ Number Line Order: pindahkan kartu ke tempat urut ------------------------------ */
function IsiKartu({ x, y, n, rupa, jenis, tanda }: { x: number; y: number; n: number; rupa: Rupa; jenis: string; tanda: "biasa" | "pilih" | "kosong" }) {
  const w = KARTU_URUT.w;
  const h = KARTU_URUT.h;
  if (tanda === "kosong") return <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={6} fill="#FFFFFF" stroke={UNGU} strokeWidth={1.6} strokeDasharray="5 4" />;
  const garis = tanda === "pilih" ? HIJAU : rupa === "benda" ? AIR : UNGU;
  if (rupa === "benda")
    return (
      <g>
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8} fill="#E0F2FE" stroke={garis} strokeWidth={2.2} />
        {Array.from({ length: n }, (_, j) => (
          <text key={j} x={x - 24 + (j % 5) * 12} y={y - 13 + Math.floor(j / 5) * 11} textAnchor="middle" fontSize={8.5}>
            {emoji(jenis)}
          </text>
        ))}
      </g>
    );
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={rupa === "lambang" ? 10 : 3} fill="#FFFFFF" stroke={garis} strokeWidth={2.2} />
      <text x={x} y={y + 9} textAnchor="middle" fontSize={26} fontWeight={900} fill={UNGU}>
        {n}
      </text>
    </g>
  );
}

function Urut({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahUrut }) {
  const n = l.isi.length;
  const u = urutkan(l.isi, l.arah);
  const kunci = u[indeksPosisi(l.tanya, n)];
  const target = l.isi.indexOf(kunci);
  const [taruh, setTaruh] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const ketukKartu = (i: number) => {
    if (selesai || kanvas || diam || taruh.includes(i)) return;
    const harus = u[taruh.length];
    if (l.isi[i] !== harus) {
      salah(l.arah === "naik" ? `Itu belum yang terkecil. Masih ada yang lebih sedikit dari ${kata(l.isi[i])}.` : `Itu belum yang terbesar. Masih ada yang lebih banyak dari ${kata(l.isi[i])}.`);
      return;
    }
    const baru = [...taruh, i];
    setTaruh(baru);
    if (baru.length === n) {
      setSelesai(true);
      siap(`Urutannya ${u.map((x) => kata(x)).join(", ")}.`);
    } else info(kata(l.isi[i]));
  };
  const periksa = () => {
    const r = periksaLingkari(
      goresan,
      l.isi.map((_, i) => letakKartu(i, n)),
      l.isi.map((_, i) => i === target),
    );
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Itu bilangannya.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu bilangan saja." : `Urutkan ${l.arah === "naik" ? "dari yang terkecil" : "dari yang terbesar"} dulu, lalu cari yang ${l.tanya === "tengah" ? "di tengah" : l.tanya === "pertama" ? "paling depan" : "paling belakang"}.`);
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? `${l.arah === "naik" ? "terkecil" : "terbesar"} dulu · lingkari yang ${l.tanya}` : `pindahkan ${l.arah === "naik" ? "dari terkecil" : "dari terbesar"} ⇒`} />
      {l.isi.map((v, i) => {
        const t = letakKartu(i, n);
        return taruh.includes(i) ? (
          <g key={i}>
            <IsiKartu x={t.x} y={t.y} n={v} rupa={rupa} jenis={l.jenis} tanda="kosong" />
          </g>
        ) : (
          <g key={i} {...(kanvas || diam ? {} : ketuk(() => ketukKartu(i)))} aria-label={rupa === "benda" ? `akuarium ${["pertama", "kedua", "ketiga", "keempat"][i]}` : kata(v)}>
            <IsiKartu x={t.x} y={t.y} n={v} rupa={rupa} jenis={l.jenis} tanda="biasa" />
          </g>
        );
      })}
      {kanvas || diam
        ? null
        : Array.from({ length: n }, (_, s) => {
            const t = letakSlot(s, n);
            const i = taruh[s];
            return (
              <g key={`s${s}`}>
                {i === undefined ? <IsiKartu x={t.x} y={t.y} n={0} rupa={rupa} jenis={l.jenis} tanda="kosong" /> : <IsiKartu x={t.x} y={t.y} n={l.isi[i]} rupa={rupa} jenis={l.jenis} tanda={selesai && i === target ? "pilih" : "biasa"} />}
                <text x={t.x} y={t.y - KARTU_URUT.h / 2 - 5} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
                  {s === 0 ? "depan" : s === n - 1 ? "belakang" : "tengah"}
                </text>
              </g>
            );
          })}
      {rupa === "diagram" && !kanvas && !diam ? (
        <g aria-hidden="true">
          <line x1={GARIS_URUT.x0} x2={GARIS_URUT.x1} y1={GARIS_URUT.y} y2={GARIS_URUT.y} stroke={UNGU} strokeWidth={1.6} />
          {Array.from({ length: 21 }, (_, v) => (
            <line key={v} x1={xGaris(v)} x2={xGaris(v)} y1={GARIS_URUT.y - (v % 5 ? 3 : 5)} y2={GARIS_URUT.y + (v % 5 ? 3 : 5)} stroke={UNGU} strokeWidth={1} />
          ))}
          {[0, 10, 20].map((v) => (
            <text key={v} x={xGaris(v)} y={GARIS_URUT.y + 15} textAnchor="middle" fontSize={8} fontWeight={900} fill={UNGU}>
              {v}
            </text>
          ))}
          {taruh.map((i) => (
            <g key={i}>
              <circle cx={xGaris(l.isi[i])} cy={GARIS_URUT.y} r={4.5} fill={HIJAU} />
              <text x={xGaris(l.isi[i])} y={GARIS_URUT.y - 8} textAnchor="middle" fontSize={8} fontWeight={900} fill={HIJAU}>
                {l.isi[i]}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </g>
  );
  if (diam) return <Gambar label="Bilangan yang diurutkan">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Akuarium yang dipindahkan ke rak lapak" : "Kartu bilangan dan tempat urut"}>{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "banding" ? <Banding {...props} l={l} /> : l.tipe === "pasang" ? <Pasang {...props} l={l} /> : l.tipe === "menara" ? <Menara {...props} l={l} /> : <Urut {...props} l={l} />;
}

function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar) salah(`Lihat lagi. ${l.keliru}`);
    else {
      setTahap("alasan");
      info(`Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    }
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <Dasar l={l.dasar} rupa={rupa} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo; Jawabanku {l.jawabTokoh}.
        </p>
      </div>
      {tahap === "putus" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <Tombol teks={"\u{2705} benar"} onClick={() => putus(true)} />
            <Tombol teks={"\u{274C} salah"} onClick={() => putus(false)} />
          </div>
        </div>
      ) : tahap === "alasan" ? (
        <div className="space-y-1.5" role="group" aria-label="Pilih alasan">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pilih alasan yang tepat:</p>
          {urut.map((i) => (
            <button key={l.alasan[i]} type="button" disabled={mati.includes(i)} onClick={() => alasan(i)} className="block min-h-[48px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] disabled:opacity-30">
              {l.alasan[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahLapak({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    bicara(kata(m));
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${petunjukSalah(l, m)}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const d = l.tipe === "salah" ? l.dasar : l;
  const tanya =
    d.tipe === "banding"
      ? `Berapa yang lebih ${d.tanya}?`
      : d.tipe === "pasang"
        ? "Berapa yang tidak punya pasangan?"
        : d.tipe === "menara"
          ? `Berapa yang paling ${d.tanya}?`
          : `Bilangan berapa yang ${d.tanya === "tengah" ? "di tengah" : d.tanya === "pertama" ? "paling depan" : "paling belakang"}?`;
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanIkan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
