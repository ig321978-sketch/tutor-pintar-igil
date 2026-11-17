"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  angkaJawab,
  barisPita,
  hasilUkur,
  kalimatUkur,
  kata,
  petunjukSalah,
  pilihanDari,
  type Langkah,
  type LangkahDasar,
  type LangkahPetak,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahTaruh,
  type Rupa,
} from "./logika";
import { EMOJI, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  BAR,
  BARIS_PITA,
  BARIS_SATUAN,
  LEBAR_ADEGAN,
  SATUAN_KECIL,
  SEL,
  TINGGI_ADEGAN,
  X_UJUNG,
  kiriSatuan,
  letakSatuan,
  letakSel,
  periksaCentang,
  periksaLingkari,
  pusatPita,
  ujungKanan,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 7 Sub-Bab B: kegiatan metode (Metode IGIL menaruh satuan rapat dari ujung, Unit Iteration memindahkan satu satuan berulang,
 * Estimate and Check dengan perkiraan lalu selisih, Grid Measuring pada pita di kertas berpetak), soal Cari kesalahan (putuskan benar atau salah,
 * pilih alasan, lalu jawab), lalu menjawab dengan caranya. Tanpa satuan baku: hanya jengkal, tongkat kayu, sedotan, dan kotak.
 * Rupa: kayu, tali, pita, dan satuan berwarna dengan gambar benda (Concrete), kotak dan batang polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const warnaBenda = (j: string): [string, string] => WARNA_BENDA[j] ?? ["#E5E7EB", "#6B7280"];

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
      <p className="text-lg">{atas}</p>
      <p className="text-2xl">{bawah}</p>
    </div>
  );
}
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#B45309] bg-[#FFFBEB] px-3 py-0.5 text-[#78350F]">{children}</span>;
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

/* ------------------------------ Taruh satuan dari ujung: Metode IGIL, Unit Iteration, Estimate and Check ------------------------------ */
function SatuanGambar({ i, k, rupa, satuan, jejak, celah }: { i: number; k: number; rupa: Rupa; satuan: string; jejak?: boolean; celah?: boolean }) {
  const x = kiriSatuan(i, k);
  const w = k * SATUAN_KECIL;
  const y = BARIS_SATUAN.y;
  const h = BARIS_SATUAN.h;
  if (celah) return <rect x={x + 1} y={y} width={w - 2} height={h} rx={3} fill="#FEE2E2" stroke={MERAH} strokeWidth={1.4} strokeDasharray="4 3" />;
  if (jejak) return <rect x={x + 1} y={y} width={w - 2} height={h} rx={rupa === "benda" ? 6 : 1} fill="none" stroke={rupa === "benda" ? warnaBenda(satuan)[1] : UNGU} strokeWidth={1.2} strokeDasharray="3 3" opacity={0.55} />;
  const [isi, garis] = warnaBenda(satuan);
  return (
    <g>
      <rect x={x + 0.5} y={y} width={w - 1} height={h} rx={rupa === "benda" ? 6 : 1} fill={rupa === "benda" ? isi : "#DBEAFE"} stroke={rupa === "benda" ? garis : UNGU} strokeWidth={1.5} />
      {rupa === "benda" ? (
        <text x={x + w / 2} y={y + h / 2 + 4.5} textAnchor="middle" fontSize={k > 1 ? 15 : 12}>
          {EMOJI[satuan] ?? ""}
        </text>
      ) : null}
    </g>
  );
}

function Taruh({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahTaruh }) {
  const n = hasilUkur(l);
  const pindah = l.mode === "pindah";
  const [ditaruh, setDitaruh] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !diam, () => siap());
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.kira !== undefined ? (
            <>
              perkiraan <Kotak>{l.kira}</Kotak> hasil ukur <Kotak>{n}</Kotak>
            </>
          ) : pindah ? (
            <>
              ditaruh <Kotak>1</Kotak> kali, dipindahkan <Kotak>{n - 1}</Kotak> kali
            </>
          ) : l.k > 1 ? (
            <>
              benda <Kotak>{l.panjang}</Kotak> satuan pendek, alat <Kotak>{l.k}</Kotak> satuan pendek
            </>
          ) : (
            <>
              nomor satuan terakhir <Kotak>{n}</Kotak>
            </>
          )
        }
        bawah={
          <>
            {l.kira !== undefined ? "selisih" : l.k > 1 ? "banyak alat panjang" : "banyak satuan"} = <Tanya />
          </>
        }
      />
    );
  const celahAda = l.celah !== undefined;
  const satuanTampak = (i: number) => celahAda && i === l.celah;
  const tampilSemua = kanvas || diam;
  const jumlahPasang = tampilSemua ? n : ditaruh;
  const periksa = () => {
    const letak = Array.from({ length: n }, (_, i) => letakSatuan(i, l.k));
    const r = periksaCentang(goresan, letak, 10);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatUkur(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu satuan, satu tanda." : r.nyasar > 0 ? "Tanda hanya di atas satuan." : "Masih ada satuan yang belum diberi tanda.");
    }
  };
  const tekan = () => {
    if (selesai || tampilSemua || ditaruh >= n) return;
    const baru = ditaruh + 1;
    setDitaruh(baru);
    if (baru === n) {
      setSelesai(true);
      siap(l.kira !== undefined ? `${kalimatUkur(l)} Perkiraan tadi ${kata(l.kira)}.` : kalimatUkur(l));
    } else info(kata(baru));
  };
  const [bi, bg] = warnaBenda(l.benda);
  const nama = NAMA_BENDA[l.benda] ?? "benda";
  const kosongAkhir = ujungKanan(l.panjang);
  const gambar = (
    <g>
      <Judul teks={kanvas ? "beri tanda tiap satuan" : pindah ? "pindahkan satu satuan, ujung ke ujung" : "taruh satuan rapat dari ujung"} />
      {l.kira !== undefined ? (
        <text x={150} y={42} textAnchor="middle" fontSize={10} fontWeight={900} fill={MERAH}>
          perkiraan: {l.kira} satuan
        </text>
      ) : null}
      {rupa === "benda" ? (
        <g>
          <rect x={X_UJUNG} y={BAR.y} width={l.panjang * SATUAN_KECIL} height={BAR.h} rx={6} fill={bi} stroke={bg} strokeWidth={2} />
          <text x={X_UJUNG + 13} y={BAR.y + BAR.h / 2 + 5} textAnchor="middle" fontSize={15}>
            {EMOJI[l.benda] ?? ""}
          </text>
          <text x={kosongAkhir - 4} y={BAR.y - 5} textAnchor="end" fontSize={9} fontWeight={900} fill={bg}>
            {nama}
          </text>
        </g>
      ) : (
        <rect x={X_UJUNG} y={BAR.y} width={l.panjang * SATUAN_KECIL} height={BAR.h} rx={1} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
      )}
      <line x1={X_UJUNG} x2={X_UJUNG} y1={BAR.y - 4} y2={BARIS_SATUAN.y + BARIS_SATUAN.h + 6} stroke={MERAH} strokeWidth={1.4} strokeDasharray="4 3" />
      <line x1={kosongAkhir} x2={kosongAkhir} y1={BAR.y - 4} y2={BARIS_SATUAN.y + BARIS_SATUAN.h + 6} stroke={MERAH} strokeWidth={1.4} strokeDasharray="4 3" />
      {pindah ? (
        <g>
          {Array.from({ length: jumlahPasang }, (_, i) => (
            <SatuanGambar key={i} i={i} k={l.k} rupa={rupa} satuan={l.satuan} jejak={i < jumlahPasang - 1 || tampilSemua} />
          ))}
          {!tampilSemua && jumlahPasang > 0 ? <SatuanGambar i={jumlahPasang - 1} k={l.k} rupa={rupa} satuan={l.satuan} /> : null}
          {Array.from({ length: jumlahPasang }, (_, i) => (
            <line key={`t${i}`} x1={kiriSatuan(i + 1, l.k)} x2={kiriSatuan(i + 1, l.k)} y1={BAR.y + BAR.h} y2={BARIS_SATUAN.y} stroke={HIJAU} strokeWidth={1.2} />
          ))}
        </g>
      ) : (
        Array.from({ length: celahAda ? n : jumlahPasang }, (_, i) => <SatuanGambar key={i} i={i} k={l.k} rupa={rupa} satuan={l.satuan} celah={satuanTampak(i)} />)
      )}
      {!tampilSemua && !selesai && ditaruh < n ? <rect x={kiriSatuan(ditaruh, l.k) + 1} y={BARIS_SATUAN.y} width={l.k * SATUAN_KECIL - 2} height={BARIS_SATUAN.h} rx={4} fill="none" stroke={UNGU} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} /> : null}
    </g>
  );
  if (diam) return <Gambar label="Benda dan satuan ukur">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label={rupa === "benda" ? `${nama} diukur dengan ${NAMA_BENDA[l.satuan] ?? "satuan"}` : "Batang polos diukur dengan kotak satuan"}>{gambar}</Gambar>
      <div className="flex justify-center">
        <Tombol teks={`${pindah ? "Pindahkan satu" : "Taruh satu"} ${rupa === "benda" ? "satuan" : "kotak"}`} mati={selesai || ditaruh >= n} onClick={tekan} />
      </div>
    </div>
  );
}

/* ------------------------------ Grid Measuring: dua pita di kertas berpetak ------------------------------ */
const PITA_WARNA = [
  ["#FCA5A5", "#B91C1C"],
  ["#93C5FD", "#1D4ED8"],
];
function Petak({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahPetak }) {
  const mana = l.tanya === "panjang" || l.tanya === "pendek";
  const target = mana ? barisPita(l) : -1;
  const panjangPita = [l.a, l.b];
  const baris = l.tanya === "hitung" ? [0] : [0, 1];
  const panjangBaris = l.a > l.b ? 0 : 1;
  const extra = l.tanya === "selisih" ? Array.from({ length: Math.abs(l.a - l.b) }, (_, i) => Math.min(l.a, l.b) + i) : [];
  const [diketuk, setDiketuk] = useState<number[]>([]);
  const [pilih, setPilih] = useState(-1);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(rupa === "lambang" && !mana && !diam, () => siap());
  const pilihPita = (b: number) => {
    if (selesai || diam || kanvas) return;
    setPilih(b);
    if (b === target) {
      setSelesai(true);
      siap(`Betul! Pita ${b === 0 ? "merah" : "biru"} lebih ${l.tanya}.`);
    } else salah(l.tanya === "panjang" ? "Bandingkan dari ujung kiri. Pita itu lebih pendek karena kotaknya lebih sedikit." : "Bandingkan dari ujung kiri. Pita itu lebih panjang karena kotaknya lebih banyak.");
  };
  const ketukSel = (b: number, i: number) => {
    if (selesai || kanvas || diam || mana) return;
    if (l.tanya === "hitung") {
      if (diketuk.includes(i)) return;
      if (i !== diketuk.length) {
        salah("Mulai dari ujung kiri, satu kotak untuk satu langkah. Jangan ada yang terlewat.");
        return;
      }
      const baru = [...diketuk, i];
      setDiketuk(baru);
      if (baru.length === l.a) {
        setSelesai(true);
        siap(`${kata(l.a)} kotak tertutup pita.`);
      } else info(kata(baru.length));
      return;
    }
    if (b !== panjangBaris || i < Math.min(l.a, l.b)) {
      salah("Bagian itu sama panjang dengan pita pendek. Ketuk kotak pita panjang yang lebih.");
      return;
    }
    if (diketuk.includes(i)) return;
    const baru = [...diketuk, i];
    setDiketuk(baru);
    if (baru.length === extra.length) {
      setSelesai(true);
      siap(`${kata(extra.length)} kotak lebihnya.`);
    } else info(kata(baru.length));
  };
  const periksa = () => {
    if (mana) {
      const letak = [0, 1].map((b) => pusatPita(b, panjangPita[b]));
      const r = periksaLingkari(goresan, letak, [target === 0, target === 1]);
      if (r.benar) {
        setSelesai(true);
        siap(`Betul! Itu pita yang lebih ${l.tanya}.`);
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? "Lingkari satu pita saja." : `Bandingkan dari ujung kiri, lalu lingkari pita yang lebih ${l.tanya}.`);
      }
      return;
    }
    const letak = (l.tanya === "hitung" ? Array.from({ length: l.a }, (_, i) => letakSel(0, i)) : extra.map((i) => letakSel(panjangBaris, i)));
    const r = periksaCentang(goresan, letak, 10);
    if (r.benar) {
      setSelesai(true);
      siap(l.tanya === "hitung" ? `${kata(l.a)} kotak tertutup pita.` : `${kata(extra.length)} kotak lebihnya.`);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu kotak, satu tanda." : r.nyasar > 0 ? (l.tanya === "hitung" ? "Tanda hanya di kotak yang tertutup pita." : "Tanda hanya di kotak yang lebih dari pita pendek.") : "Masih ada kotak yang belum diberi tanda.");
    }
  };
  if (rupa === "lambang" && !mana)
    return (
      <KartuTanya
        atas={
          l.tanya === "hitung" ? (
            <>
              pita berakhir di kotak nomor <Kotak>{l.a}</Kotak>
            </>
          ) : (
            <>
              pita merah <Kotak>{l.a}</Kotak> kotak, pita biru <Kotak>{l.b}</Kotak> kotak
            </>
          )
        }
        bawah={
          <>
            {l.tanya === "hitung" ? "banyak kotak" : "selisih"} = <Tanya />
          </>
        }
      />
    );
  if (rupa === "lambang" && !kanvas && !diam)
    return (
      <div className="space-y-2 py-2 text-center">
        <p className="text-sm font-black text-[#1C01A5]">Bandingkan dua pita di kertas berpetak.</p>
        <div className="flex justify-center gap-3" role="group" aria-label="Pilih pita">
          {[0, 1].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => pilihPita(b)}
              className={`min-h-[64px] min-w-[120px] rounded-2xl border-4 px-2 text-xl font-black text-[#78350F] ${selesai && b === target ? "border-[#15803D] bg-[#DCFCE7]" : pilih === b ? "border-[#DC2626] bg-[#FEE2E2]" : "border-[#B45309] bg-[#FFFBEB]"}`}
            >
              {b === 0 ? "merah" : "biru"} {panjangPita[b]} kotak
            </button>
          ))}
        </div>
      </div>
    );
  const lewatAda = l.lewat === true;
  const tampilSemua = kanvas || diam;
  const warnaSel = (b: number, i: number): string => {
    const [isi] = PITA_WARNA[b];
    if (i >= panjangPita[b]) return rupa === "benda" ? "#ECFCCB" : "#FFFFFF";
    if (l.tanya === "hitung") {
      if (lewatAda) return i === 0 ? (rupa === "benda" ? "#ECFCCB" : "#FFFFFF") : isi;
      return tampilSemua || diketuk.includes(i) ? isi : "transparent";
    }
    return isi;
  };
  const lamb = rupa === "lambang";
  const gambar = (
    <g>
      <Judul teks={kanvas ? (mana ? `lingkari pita yang lebih ${l.tanya}` : "beri tanda tiap kotak") : mana ? `ketuk pita yang lebih ${l.tanya}` : l.tanya === "hitung" ? "ketuk kotak dari ujung kiri" : "ketuk kotak yang lebih"} />
      {lamb ? (
        <g>
          {[0, 1].map((b) => {
            const c = { x: b === 0 ? 80 : 220, y: 100 };
            return (
              <g key={b}>
                <rect x={c.x - 55} y={c.y - 30} width={110} height={60} rx={10} fill="#FFFBEB" stroke="#B45309" strokeWidth={2.4} />
                <text x={c.x} y={c.y + 6} textAnchor="middle" fontSize={16} fontWeight={900} fill="#78350F">
                  {b === 0 ? "merah" : "biru"} {panjangPita[b]}
                </text>
              </g>
            );
          })}
        </g>
      ) : (
        baris.map((b) => {
          const y = BARIS_PITA[b];
          const [, garis] = PITA_WARNA[b];
          return (
            <g key={b} {...(mana && !kanvas && !diam ? ketuk(() => pilihPita(b)) : {})} aria-label={`pita ${b === 0 ? "merah" : "biru"}`}>
              {Array.from({ length: 12 }, (_, i) => (
                <rect key={i} x={X_UJUNG + i * SEL} y={y} width={SEL} height={SEL} fill={warnaSel(b, i)} stroke={rupa === "benda" ? "#65A30D" : UNGU} strokeWidth={0.9} {...(!mana && !kanvas && !diam ? ketuk(() => ketukSel(b, i)) : {})} />
              ))}
              <rect x={X_UJUNG} y={y} width={panjangPita[b] * SEL} height={SEL} fill="none" stroke={mana && (selesai && b === target ? true : pilih === b) ? (selesai ? HIJAU : MERAH) : garis} strokeWidth={mana && pilih === b ? 3.5 : 2} pointerEvents="none" />
              {rupa === "benda" ? (
                <text x={X_UJUNG + 11} y={y + 15.5} textAnchor="middle" fontSize={13} pointerEvents="none">
                  {EMOJI.pita}
                </text>
              ) : null}
              {extra.length > 0 && b === panjangBaris
                ? extra.map((i) => (
                    <rect key={`e${i}`} x={X_UJUNG + i * SEL + 1} y={y + 1} width={SEL - 2} height={SEL - 2} fill={diketuk.includes(i) ? "#FDE047" : "none"} stroke={diketuk.includes(i) ? "#CA8A04" : "none"} strokeWidth={1.2} pointerEvents="none" />
                  ))
                : null}
            </g>
          );
        })
      )}
    </g>
  );
  if (diam) return <Gambar label="Pita di kertas berpetak">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Pita di kertas berpetak" : "Kotak polos di kertas berpetak"}>{gambar}</Gambar>;
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "taruh" ? <Taruh {...props} l={l} /> : <Petak {...props} l={l} />;
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
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#78350F]">
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
export function LangkahLantai({ ls, rupa, bicara, onBenar }: P) {
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
    d.tipe === "taruh"
      ? d.kira !== undefined
        ? "Berapa selisih perkiraan dan hasil?"
        : d.k > 1
          ? "Berapa satuan alat itu yang menutupi benda?"
          : "Berapa satuan yang menutupi benda?"
      : d.tanya === "hitung"
        ? "Berapa kotak pita itu?"
        : "Berapa kotak selisihnya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
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
