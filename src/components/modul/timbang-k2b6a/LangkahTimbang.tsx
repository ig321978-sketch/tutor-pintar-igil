"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  OBJEK,
  barisBanding,
  barisBatang,
  barisNeraca,
  barisPasang,
  barisRantai,
  barisSatuan,
  dasarDari,
  huruf,
  jumlahSatuan,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  nomorBatang,
  nomorSeimbang,
  petunjukKetuk,
  petunjukSalah,
  petunjukUrut,
  pilihanKata,
  pilihanSuara,
  siapLangsung,
  sisiTurun,
  tertinggi,
  urutBenar,
  type Arah,
  type Benda,
  type Cara,
  type LBatang,
  type LDasar,
  type LIgil,
  type LTitik,
  type Langkah,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraTimbang, PilihanKata, teksKunci } from "./JawabTimbang";

/**
 * Satu tugas CPA Kelas 2 Bab 6 Sub-Bab A: metode IGIL (Angkat, Timbang, Bandingkan: papan jungkat-jungkit atau neraca balok, satu benda dengan satuan), Bar Model (batang tiap benda),
 * Dot Balance (titik tiap piringan), Heavy First (hasil timbang berpasangan lalu urutkan, atau rantai perbandingan), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan,
 * lalu jawab), lalu menjawab menurut caranya (pilih kata, tulis satu angka di kanvas, atau ucapkan). Rupa: benda beremoji di lapangan (Concrete), balok berhuruf, batang, dan titik polos
 * di lembar berkisi (Pictorial), kartu kata dan angka di papan taktik (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const TINTA = "#334155";

function Gambar({ label, judul, children }: { label: string; judul: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" className={SVG} aria-label={label}>
      <text x={150} y={15} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
        {judul}
      </text>
      {children}
    </svg>
  );
}
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Benda, titik, neraca ------------------------------ */
/** Satu benda yang berdiri di (x, y = dasar benda). Concrete: emoji; Pictorial: balok berhuruf polos. `bintang`: tanda bintang di atasnya. */
function Item({ b, rupa, x, y, h, s = 1, bintang = false }: { b: Benda; rupa: Rupa; x: number; y: number; h: string; s?: number; bintang?: boolean }) {
  if (rupa === "benda") {
    const fs = (b.besar ? 30 : 19) * s;
    const ob = b.o !== undefined ? OBJEK[b.o] : null;
    return (
      <g aria-hidden="true">
        <text x={x} y={y} fontSize={fs} textAnchor="middle">
          {ob?.emoji ?? ""}
        </text>
        {bintang ? (
          <text x={x} y={y - fs - 1} fontSize={10 * s} textAnchor="middle" fill="#DC2626" fontWeight={900}>
            {"\u{2605}"}
          </text>
        ) : null}
      </g>
    );
  }
  return (
    <g aria-hidden="true">
      <rect x={x - 9 * s} y={y - 15 * s} width={18 * s} height={14 * s} rx={2} fill="#EDE9FE" stroke={UNGU} strokeWidth={1.4} />
      <text x={x} y={y - 4.6 * s} textAnchor="middle" fontSize={9 * s} fontWeight={900} fill={UNGU}>
        {h}
      </text>
      {bintang ? (
        <text x={x} y={y - 16 * s} fontSize={10 * s} textAnchor="middle" fill="#DC2626" fontWeight={900}>
          {"\u{2605}"}
        </text>
      ) : null}
    </g>
  );
}
/** Titik tumpuk di piringan: paling banyak lima per baris, tengah di (x, y = baris bawah). */
function Titik({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden="true">
      {Array.from({ length: n }, (_, i) => {
        const baris = Math.floor(i / 5);
        const isi = Math.min(5, n - baris * 5);
        return <circle key={i} cx={x + ((i % 5) - (isi - 1) / 2) * 5.2} cy={y - baris * 5.4} r={2.2} fill="#F59E0B" stroke="#92400E" strokeWidth={0.8} />;
      })}
    </g>
  );
}
type Isi = (x: number, py: number) => React.ReactNode;
/**
 * Alat timbang berpusat (cx, cy) berskala s. `tilt` = sisi yang turun. bentuk "jungkat": papan kayu bertumpuan segitiga (benda di ujung papan); "neraca": palang dengan dua piringan.
 * `kiri` dan `kanan` menggambar isi di ujung palang (x, py = ujung palang).
 */
function Neraca({ cx, cy, s = 1, tilt, bentuk, kiri, kanan }: { cx: number; cy: number; s?: number; tilt: Arah; bentuk: "jungkat" | "neraca"; kiri: Isi; kanan: Isi }) {
  const dy = 7;
  const dL = tilt === "kiri" ? dy : tilt === "kanan" ? -dy : 0;
  const dR = -dL;
  const half = bentuk === "jungkat" ? 54 : 50;
  const pan = (px: number, py: number) => (
    <g>
      <line x1={px} y1={py} x2={px - 11} y2={py + 16} stroke="#64748B" strokeWidth={1} />
      <line x1={px} y1={py} x2={px + 11} y2={py + 16} stroke="#64748B" strokeWidth={1} />
      <rect x={px - 13} y={py + 16} width={26} height={4} rx={1.5} fill="#CBD5E1" stroke="#475569" strokeWidth={1.2} />
    </g>
  );
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      {bentuk === "jungkat" ? (
        <polygon points="-10,22 0,2 10,22" fill="#9CA3AF" stroke="#475569" strokeWidth={1.4} />
      ) : (
        <>
          <line x1={0} y1={0} x2={0} y2={38} stroke="#475569" strokeWidth={3} />
          <rect x={-14} y={38} width={28} height={4} rx={1.5} fill="#94A3B8" stroke="#475569" strokeWidth={1.2} />
        </>
      )}
      <line x1={-half} y1={dL} x2={half} y2={dR} stroke={bentuk === "jungkat" ? "#D6A15E" : "#475569"} strokeWidth={bentuk === "jungkat" ? 6 : 3.4} strokeLinecap="round" />
      {bentuk === "neraca" ? (
        <>
          {pan(-half, dL)}
          {pan(half, dR)}
        </>
      ) : null}
      {kiri(-half, dL)}
      {kanan(half, dR)}
    </g>
  );
}
/** Keterangan benda (Concrete): emoji dan nama benda yang dipakai gambar. */
function Keterangan({ benda, rupa }: { benda: number[]; rupa: Rupa }) {
  if (rupa !== "benda") return null;
  const unik = [...new Set(benda)].sort((a, b) => a - b);
  return (
    <ul className="flex flex-wrap justify-center gap-1" aria-label="Nama benda">
      {unik.map((o) => (
        <li key={o} className="rounded-full border-2 border-[#D6A15E] bg-[#FFFBEB] px-2 py-0.5 text-[11px] font-black text-[#92400E]">
          <span aria-hidden="true">{OBJEK[o].emoji}</span> {OBJEK[o].nama}
        </li>
      ))}
    </ul>
  );
}
const bendaDari = (l: LangkahDasar2): number[] => {
  const semua: Benda[] =
    l.tipe === "igil" ? (l.mode === "banding" ? [l.kiri, l.kanan] : [l.benda, l.satuan]) : l.tipe === "batang" ? l.items : l.tipe === "titik" ? l.pasang.flat() : l.mode === "urut" ? l.items : [l.a, l.b, l.c];
  return semua.map((b) => b.o).filter((o): o is number => o !== undefined);
};
type LangkahDasar2 = LIgil | LBatang | LTitik | LDasar;

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris, tanda, onTap, aktif, benar }: { judul?: string; baris: string[]; tanda?: string; onTap?: () => void; aktif?: boolean; benar?: boolean }) {
  const isi = (
    <>
      {tanda ? <span className="mr-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1C01A5] text-xs font-black text-white">{tanda}</span> : null}
      <span className="inline-block align-middle">
        {judul ? <span className="block text-[11px] font-black uppercase text-[#DC2626]">{judul}</span> : null}
        {baris.map((b) => (
          <span key={b} className="block text-sm font-bold leading-snug text-[#1C01A5]">
            {b}
          </span>
        ))}
      </span>
    </>
  );
  const kelas = `rounded-lg border-2 px-2 py-1.5 text-left ${benar ? "border-[#16A34A] bg-[#DCFCE7]" : aktif ? "border-[#2563EB] bg-[#DBEAFE]" : "border-[#64748B] bg-white"}`;
  return onTap ? (
    <button type="button" onClick={onTap} className={`${kelas} min-h-[48px] w-full`}>
      {isi}
    </button>
  ) : (
    <div className={kelas}>{isi}</div>
  );
}
const PapanTaktik = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-xl border-[6px] border-[#94A3B8] bg-[#F8FAFC] p-2">{children}</div>;

/* ------------------------------ Metode IGIL: Angkat, Timbang, Bandingkan ------------------------------ */
function Igil({ l, rupa }: PK & { l: LIgil }) {
  if (l.mode === "banding") {
    const t = sisiTurun(l.kiri.w, l.kanan.w);
    if (rupa === "lambang")
      return (
        <PapanTaktik>
          <KartuKata judul="Papan jungkat-jungkit" baris={barisBanding(l.kiri, l.kanan)} />
        </PapanTaktik>
      );
    const jungkat = rupa === "benda";
    return (
      <div className="space-y-2">
        <Gambar label={jungkat ? "Papan jungkat-jungkit" : "Neraca balok"} judul={jungkat ? "benda mana yang turun?" : "balok mana yang turun?"}>
          <Neraca
            cx={150}
            cy={jungkat ? 110 : 90}
            s={1.45}
            tilt={t}
            bentuk={jungkat ? "jungkat" : "neraca"}
            kiri={(x, py) => <Item b={l.kiri} rupa={rupa} x={x} y={jungkat ? py - 3 : py + 15} h="P" />}
            kanan={(x, py) => <Item b={l.kanan} rupa={rupa} x={x} y={jungkat ? py - 3 : py + 15} h="Q" />}
          />
          <text x={150} y={188} textAnchor="middle" fontSize={9} fontWeight={800} fill="#64748B">
            sisi kiri dan sisi kanan
          </text>
        </Gambar>
        <Keterangan benda={bendaDari(l)} rupa={rupa} />
      </div>
    );
  }
  const n = jumlahSatuan(l);
  if (rupa === "lambang")
    return (
      <PapanTaktik>
        <KartuKata judul="Satu benda dan satuannya" baris={barisSatuan(l)} />
      </PapanTaktik>
    );
  const jarak = Math.min(15, 54 / Math.max(1, n / 2));
  return (
    <div className="space-y-2">
      <Gambar label="Satu benda dan satuannya seimbang" judul="papan seimbang: hitung satuannya">
        <Neraca
          cx={150}
          cy={90}
          s={1.45}
          tilt="datar"
          bentuk="neraca"
          kiri={(x, py) => <Item b={l.benda} rupa={rupa} x={x} y={py + 15} h="P" />}
          kanan={(x, py) => (
            <g>
              {Array.from({ length: n }, (_, i) => {
                const baris = Math.floor(i / 5);
                const isi = Math.min(5, n - baris * 5);
                const sx = x + ((i % 5) - (isi - 1) / 2) * jarak * 0.7;
                const sy = py + 15 - baris * 11;
                return rupa === "benda" ? (
                  <text key={i} x={sx} y={sy} fontSize={11} textAnchor="middle" aria-hidden="true">
                    {l.satuan.o !== undefined ? OBJEK[l.satuan.o].emoji : ""}
                  </text>
                ) : (
                  <rect key={i} x={sx - 4.5} y={sy - 9} width={9} height={9} rx={1} fill="#FDE68A" stroke={UNGU} strokeWidth={1} />
                );
              })}
            </g>
          )}
        />
        <text x={150} y={188} textAnchor="middle" fontSize={9} fontWeight={800} fill="#64748B">
          {rupa === "benda" ? "satuan: benda kecil yang sama" : "satuan: kotak kecil yang sama"}
        </text>
      </Gambar>
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Bar Model: Model Batang ------------------------------ */
function Batang({ l, rupa, cara, diam, salah, siap }: PK & { l: LBatang }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const benar = nomorBatang(l);
  const pilih = (i: number) => {
    if (!klik || dapat !== null) return;
    if (i === benar) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukKetuk(l, i));
  };
  if (rupa === "lambang")
    return (
      <PapanTaktik>
        <p className="text-center text-xs font-black text-[#DC2626]">{klik ? "Ketuk kartu batang yang dimaksud" : "Satu batang untuk tiap benda"}</p>
        {l.items.map((b, i) => (
          <KartuKata key={i} tanda={huruf(i)} baris={[barisBatang(b, i)]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />
        ))}
      </PapanTaktik>
    );
  const max = tertinggi(l.items);
  const satu = Math.min(14, Math.floor(118 / max));
  const lebar = 34;
  const jeda = l.items.length <= 3 ? 30 : 18;
  const total = l.items.length * lebar + (l.items.length - 1) * jeda;
  const x0 = (300 - total) / 2;
  const alas = 168;
  return (
    <div className="space-y-2">
      <Gambar label="Batang tiap benda" judul={klik ? (l.cari === "terberat" ? "ketuk batang benda yang paling berat" : "ketuk batang benda yang paling ringan") : "satu kotak untuk satu satuan berat"}>
        <line x1={x0 - 10} y1={alas} x2={x0 + total + 10} y2={alas} stroke={TINTA} strokeWidth={2} />
        {l.items.map((b, i) => {
          const x = x0 + i * (lebar + jeda);
          const tinggi = b.w * satu;
          const warna = rupa === "benda" && b.o !== undefined ? OBJEK[b.o].warna : "#BFDBFE";
          const tepi = rupa === "benda" && b.o !== undefined ? OBJEK[b.o].garis : "#1D4ED8";
          return (
            <g key={i} {...(klik ? ketuk(() => pilih(i)) : {})} aria-label={`Batang ${huruf(i)}`}>
              <rect x={x - 4} y={alas - tinggi - 4} width={lebar + 8} height={tinggi + 24} fill="transparent" />
              <rect x={x} y={alas - tinggi} width={lebar} height={tinggi} fill={dapat === i ? "#BBF7D0" : warna} stroke={dapat === i ? HIJAU : tepi} strokeWidth={dapat === i ? 3 : 1.6} />
              {Array.from({ length: b.w - 1 }, (_, k) => (
                <line key={k} x1={x} y1={alas - (k + 1) * satu} x2={x + lebar} y2={alas - (k + 1) * satu} stroke={tepi} strokeWidth={0.8} opacity={0.6} />
              ))}
              {rupa === "benda" ? (
                <text x={x + lebar / 2} y={alas + 17} fontSize={17} textAnchor="middle" aria-hidden="true">
                  {b.o !== undefined ? OBJEK[b.o].emoji : ""}
                </text>
              ) : (
                <text x={x + lebar / 2} y={alas + 15} fontSize={11} fontWeight={900} textAnchor="middle" fill={UNGU}>
                  {huruf(i)}
                </text>
              )}
            </g>
          );
        })}
      </Gambar>
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Dot Balance: Neraca Titik ------------------------------ */
function NeracaTitik({ p, rupa, cx, cy, s, huruf: hh }: { p: [Benda, Benda]; rupa: Rupa; cx: number; cy: number; s: number; huruf: [string, string] }) {
  return (
    <Neraca
      cx={cx}
      cy={cy}
      s={s}
      tilt={sisiTurun(p[0].w, p[1].w)}
      bentuk="neraca"
      kiri={(x, py) => (
        <g>
          <Item b={p[0]} rupa={rupa} x={x} y={py - 4} h={hh[0]} />
          <Titik x={x} y={py + 13} n={p[0].w} />
        </g>
      )}
      kanan={(x, py) => (
        <g>
          <Item b={p[1]} rupa={rupa} x={x} y={py - 4} h={hh[1]} />
          <Titik x={x} y={py + 13} n={p[1].w} />
        </g>
      )}
    />
  );
}
function Titiks({ l, rupa, cara, diam, salah, siap }: PK & { l: LTitik }) {
  const klik = cara === "klik" && !diam;
  const [dapat, setDapat] = useState<number | null>(null);
  const benar = nomorSeimbang(l);
  const pilih = (i: number) => {
    if (!klik || dapat !== null) return;
    if (i === benar) {
      setDapat(i);
      siap(kalimatKunci(l, "klik", rupa));
    } else salah(petunjukKetuk(l, i));
  };
  if (cara === "klik") {
    if (rupa === "lambang")
      return (
        <PapanTaktik>
          {l.pasang.map((p, i) => (
            <KartuKata key={i} tanda={huruf(i)} baris={[barisNeraca(p, i)]} onTap={klik ? () => pilih(i) : undefined} benar={dapat === i} />
          ))}
        </PapanTaktik>
      );
    const n = l.pasang.length;
    return (
      <div className="space-y-2">
        <Gambar label="Neraca dengan titik" judul="ketuk neraca yang seimbang">
          {l.pasang.map((p, i) => {
            const cx = (300 / n) * (i + 0.5);
            return (
              <g key={i} {...(klik ? ketuk(() => pilih(i)) : {})} aria-label={`Neraca ${huruf(i)}`}>
                <rect x={cx - 48} y={30} width={96} height={140} fill={dapat === i ? "#BBF7D0" : "transparent"} opacity={0.7} rx={8} />
                <NeracaTitik p={p} rupa={rupa} cx={cx} cy={78} s={0.56} huruf={["P", "Q"]} />
                <text x={cx} y={176} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
                  {huruf(i)}
                </text>
              </g>
            );
          })}
        </Gambar>
        <Keterangan benda={bendaDari(l)} rupa={rupa} />
        {klik ? (
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih neraca">
            {l.pasang.map((_, i) => (
              <Tombol key={i} teks={`Neraca ${huruf(i)}`} onClick={() => pilih(i)} mati={dapat !== null} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
  const p = l.pasang[0];
  if (rupa === "lambang")
    return (
      <PapanTaktik>
        <KartuKata judul="Neraca titik" baris={[barisNeraca(p, 0)]} />
      </PapanTaktik>
    );
  return (
    <div className="space-y-2">
      <Gambar label="Neraca dengan titik" judul={cara === "kanvas" ? "hitung titik tiap piringan" : "piringan kiri di mana?"}>
        <NeracaTitik p={p} rupa={rupa} cx={150} cy={88} s={1.45} huruf={["P", "Q"]} />
      </Gambar>
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
    </div>
  );
}

/* ------------------------------ Heavy First: Berat di Dasar ------------------------------ */
function Chip({ b, i, rupa, nomor, onTap, mati }: { b: Benda; i: number; rupa: Rupa; nomor: number; onTap?: () => void; mati?: boolean }) {
  const isi = rupa === "benda" && b.o !== undefined ? `${OBJEK[b.o].emoji} ${OBJEK[b.o].nama}` : `Benda ${huruf(i)}`;
  return (
    <button type="button" disabled={mati || !onTap} onClick={onTap} className={`min-h-[48px] min-w-[80px] rounded-2xl border-4 px-2 text-sm font-black ${nomor > 0 ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"} shadow-[0_3px_0_rgba(28,1,165,0.25)]`}>
      {nomor > 0 ? <span className="mr-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#16A34A] text-[11px] text-white">{nomor}</span> : null}
      {isi}
    </button>
  );
}
function DasarUrut({ l, rupa, cara, diam, salah, siap, info }: PK & { l: LDasar & { mode: "urut" } }) {
  const klik = cara === "klik" && !diam;
  const [pilih, setPilih] = useState<number[]>([]);
  const urut = urutBenar(l);
  const ketukBenda = (i: number) => {
    if (!klik || pilih.includes(i)) return;
    if (i === urut[pilih.length]) {
      const baru = [...pilih, i];
      setPilih(baru);
      if (baru.length === l.items.length) siap(kalimatKunci(l, "klik", rupa));
      else info("Betul. Ketuk benda berikutnya yang paling berat.");
    } else salah(petunjukUrut(l, pilih.length, i));
  };
  const bintang = cara === "suara" ? l.tanda : -1;
  const n = l.pasang.length;
  return (
    <div className="space-y-2">
      {rupa === "lambang" ? (
        <PapanTaktik>
          {barisPasang(l).map((b, i) => (
            <KartuKata key={`${b}-${i}`} baris={[b]} />
          ))}
          {cara === "suara" ? <KartuKata judul="Benda bertanda bintang" baris={[`\u{2605} benda ${huruf(l.tanda)}`]} /> : null}
        </PapanTaktik>
      ) : (
        <Gambar label="Hasil timbang berpasangan" judul="siapa yang lebih berat? lihat yang turun">
          {l.pasang.map(([p, q], i) => {
            const cx = (300 / n) * (i + 0.5);
            return (
              <Neraca
                key={i}
                cx={cx}
                cy={72}
                s={n >= 3 ? 0.66 : 0.8}
                tilt={sisiTurun(l.items[p].w, l.items[q].w)}
                bentuk="neraca"
                kiri={(x, py) => <Item b={l.items[p]} rupa={rupa} x={x} y={py + 15} h={huruf(p)} s={n >= 3 ? (rupa === "benda" ? 0.8 : 1.35) : 1} bintang={bintang === p} />}
                kanan={(x, py) => <Item b={l.items[q]} rupa={rupa} x={x} y={py + 15} h={huruf(q)} s={n >= 3 ? (rupa === "benda" ? 0.8 : 1.35) : 1} bintang={bintang === q} />}
              />
            );
          })}
        </Gambar>
      )}
      {rupa !== "lambang" ? <Keterangan benda={bendaDari(l)} rupa={rupa} /> : null}
      {cara === "klik" ? (
        <div className="space-y-1">
          <p className="text-center text-xs font-bold text-[#1C01A5]/80">Ketuk dari yang paling berat sampai yang paling ringan.</p>
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Urutkan benda">
            {l.items.map((b, i) => (
              <Chip key={i} b={b} i={i} rupa={rupa} nomor={pilih.indexOf(i) + 1} onTap={() => ketukBenda(i)} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
function DasarRantai({ l, rupa }: PK & { l: LDasar & { mode: "rantai" } }) {
  if (rupa === "lambang")
    return (
      <PapanTaktik>
        {barisRantai(l).map((b) => (
          <KartuKata key={b} baris={[b]} />
        ))}
        <KartuKata judul="Pertanyaan" baris={["1 benda P sama dengan berapa benda R?"]} />
      </PapanTaktik>
    );
  const baris = (cy: number, kiri: Benda, kananB: Benda, n: number, hk: string, hr: string, sk: number, sr: number) => (
    <Neraca
      cx={150}
      cy={cy}
      s={0.95}
      tilt="datar"
      bentuk="neraca"
      kiri={(x, py) => <Item b={kiri} rupa={rupa} x={x} y={py + 15} h={hk} s={sk} />}
      kanan={(x, py) => (
        <g>
          {Array.from({ length: n }, (_, i) => (
            <Item key={i} b={kananB} rupa={rupa} x={x + (i - (n - 1) / 2) * 14 * sr} y={py + 15} h={hr} s={sr} />
          ))}
        </g>
      )}
    />
  );
  return (
    <div className="space-y-2">
      <Gambar label="Rantai perbandingan" judul="satu benda sama berat dengan beberapa benda lain">
        {baris(56, l.a, l.b, l.r1, "P", "Q", 1.1, 0.8)}
        {baris(142, l.b, l.c, l.r2, "Q", "R", 0.9, 0.62)}
      </Gambar>
      <Keterangan benda={bendaDari(l)} rupa={rupa} />
    </div>
  );
}

function Dasar(props: PK & { l: Langkah }) {
  const l = dasarDari(props.l);
  if (l.tipe === "igil") return <Igil {...props} l={l} />;
  if (l.tipe === "batang") return <Batang {...props} l={l} />;
  if (l.tipe === "titik") return <Titiks {...props} l={l} />;
  return l.mode === "urut" ? <DasarUrut {...props} l={l} /> : <DasarRantai {...props} l={l} />;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${l.keliru}`);
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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} diam salah={salah} siap={() => undefined} info={info} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
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

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahTimbang({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas hitung, kata, dan semua tugas kanvas dan suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
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
    if (kunci === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  /** Satu-satunya jalur memeriksa jawaban: `j` kata yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const pilihan: string[] = cara === "klik" ? pilihanKata(l) : pilihanSuara(l, cara);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraTimbang kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : (
            <PilihanKata pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
