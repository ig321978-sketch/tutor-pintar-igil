"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  BENDA,
  NAMA_LANGKAH,
  angkaJawab,
  bendaKe,
  dasarDari,
  isiLangkah,
  isiZona,
  kalimatCerita,
  kalimatKunci,
  kalimatTanya,
  kata,
  pilihanDari,
  petunjukSalah,
  petunjukTanda,
  petunjukZona,
  siapLangsung,
  tandaBenar,
  tandaKata,
  zonaDicari,
  type Cara,
  type Langkah,
  type LangkahBagian,
  type LangkahDasar,
  type LangkahEmpat,
  type LangkahMundur,
  type LangkahPeragakan,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
  type Tanda,
  type Zona,
} from "./logika";
import {
  LEBAR_ADEGAN,
  OP_PUSAT,
  OP_UKURAN,
  R_BULAT,
  TINGGI_ADEGAN,
  Y_AKHIR,
  Y_CERITA,
  Y_DATANG,
  Y_MEJA,
  ZONA_KOTAK,
  ZONA_PUSAT,
  periksaLingkari,
  dxBaris,
  tataBaris,
  titikZona,
  type Goresan,
} from "./periksa";
import { JawabSuaraPembukaan, JawabTulisPembukaan, PilihanPembukaan } from "./Jawab20";

/**
 * Satu tugas CPA Kelas 2 Bab 2 Sub-Bab C: kegiatan metode (Metode IGIL: urutkan empat langkah cerita atau lingkari tanda hitung, Part-Part-Whole: tunjuk bagian atau utuh
 * yang belum diketahui, Act It Out: peragakan benda yang datang atau diambil, Work Backwards: pilih tanda untuk membalik langkah), tugas Cari kesalahan (putuskan benar atau salah,
 * pilih alasan, lalu jawab), lalu menjawab dengan caranya. Rupa: benda berwarna dengan emoji (Concrete), diagram polos (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya. Jawaban bilangan sampai dua puluh memakai Jawab20 (dua kotak untuk dua angka).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const MERAH = "#DC2626";
const COKLAT = "#92400E";
const MINUS = "−";

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
function Gambar({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label={label}>
      {children}
    </svg>
  );
}
function Judul({ teks }: { teks: string }) {
  return (
    <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
      {teks}
    </text>
  );
}
function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk tugas yang langsung menjawab dari gambar yang sudah jadi). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat tugas dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Satu benda (emoji) atau satu petak (polos) ------------------------------ */
type Gaya = { hantu?: boolean; sorot?: boolean; merah?: boolean; hijau?: boolean };
const warnaGaya = (g: Gaya) => (g.hijau ? HIJAU : g.merah ? MERAH : g.sorot ? "#B45309" : null);

function Unit({ rupa, x, y, benda, g = {}, u = 15 }: { rupa: Rupa; x: number; y: number; benda: number; g?: Gaya; u?: number }) {
  const w = warnaGaya(g);
  const rb = Number((u * 0.63).toFixed(1));
  if (rupa === "benda")
    return (
      <g aria-hidden="true">
        <text x={x} y={y + 5} textAnchor="middle" fontSize={u} opacity={g.hantu ? 0.3 : 1}>
          {BENDA[benda].emoji}
        </text>
        {w ? <circle cx={x} cy={y} r={rb} fill="none" stroke={w} strokeWidth={2.2} strokeDasharray={g.hantu ? "3 2" : undefined} /> : null}
        {g.hantu && !w ? <circle cx={x} cy={y} r={rb} fill="none" stroke="#94A3B8" strokeWidth={1.4} strokeDasharray="3 2" /> : null}
      </g>
    );
  return (
    <rect
      x={x - 6}
      y={y - 6}
      width={12}
      height={12}
      rx={1.5}
      fill={g.hantu ? "none" : w ? (g.hijau ? "#DCFCE7" : "#FEE2E2") : "#BFDBFE"}
      stroke={w ?? (g.hantu ? "#64748B" : UNGU)}
      strokeWidth={w ? 2.2 : 1.3}
      strokeDasharray={g.hantu ? "2.5 2" : undefined}
      aria-hidden="true"
    />
  );
}

/** Pernyataan data untuk rupa lambang. */
function Pernyataan({ baris, atas, bawah }: { baris: string[]; atas?: string; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-1 text-center font-black text-[#1C01A5]">
      {atas ? <p className="text-sm text-[#7C3AED]">{atas}</p> : null}
      <ul className="mx-auto grid max-w-md grid-cols-1 gap-1">
        {baris.map((b) => (
          <li key={b} className="rounded-lg border-2 border-[#FCA5A5] bg-[#FEF2F2] px-2 py-1 text-sm text-[#7F1D1D]">
            {b}
          </li>
        ))}
      </ul>
      <div className="text-lg">{bawah}</div>
    </div>
  );
}
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;
const tanyaTanpaTanda = (s: string) => s.replace(/[?]\s*$/, "");

/** Kartu tanda hitung di dalam gambar (untuk dilingkari). */
function KartuTanda({ tanda, merah, hijau }: { tanda: Tanda; merah?: boolean; hijau?: boolean }) {
  const c = OP_PUSAT[tanda];
  return (
    <g aria-hidden="true">
      <rect x={c.x - OP_UKURAN.w / 2} y={c.y - OP_UKURAN.h / 2} width={OP_UKURAN.w} height={OP_UKURAN.h} rx={10} fill={hijau ? "#DCFCE7" : "#FFFBEB"} stroke={merah ? MERAH : hijau ? HIJAU : "#D97706"} strokeWidth={merah || hijau ? 3 : 1.6} />
      <text x={c.x} y={c.y + 8} textAnchor="middle" fontSize={22} fontWeight={900} fill={UNGU}>
        {tanda === "tambah" ? "+" : MINUS}
      </text>
      <text x={c.x} y={c.y + 20} textAnchor="middle" fontSize={8.4} fontWeight={900} fill={COKLAT}>
        {tanda === "tambah" ? "tambah" : "kurang"}
      </text>
    </g>
  );
}
const lingkariTanda = (goresan: Goresan[], l: LangkahDasar) => periksaLingkari(goresan, [OP_PUSAT.tambah, OP_PUSAT.kurang], [tandaBenar(l) === "tambah", tandaBenar(l) === "kurang"]);

/* ------------------------------ Metode IGIL: Empat Langkah Cerita ------------------------------ */
/** Urutan tampil kartu langkah (tidak berurutan): Solusi, Diketahui, Kesimpulan, Ditanya. */
const TAMPIL_LANGKAH = [2, 0, 3, 1];

function UrutLangkah({ l, salah, selesai, onSelesai }: { l: LangkahEmpat; salah: (p: string) => void; selesai: boolean; onSelesai: () => void }) {
  const isi = isiLangkah(l.c);
  const [urut, setUrut] = useState<number[]>([]);
  const [goyang, setGoyang] = useState(-1);
  const ketukKartu = (n: number) => {
    if (selesai || urut.includes(n)) return;
    if (n === urut.length) {
      const baru = [...urut, n];
      setUrut(baru);
      if (baru.length === 4) onSelesai();
    } else {
      setGoyang(n);
      window.setTimeout(() => setGoyang(-1), 480);
      salah(`Itu belum giliran ${NAMA_LANGKAH[n].toLowerCase()}. Ketuk dulu ${NAMA_LANGKAH[urut.length].toLowerCase()}.`);
    }
  };
  return (
    <div className="space-y-1" role="group" aria-label="Empat langkah cerita">
      <p className="text-center text-xs font-black text-[#7F1D1D]">Ketuk berurutan dari langkah pertama</p>
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        {TAMPIL_LANGKAH.map((n) => {
          const nomor = urut.indexOf(n);
          return (
            <button
              key={n}
              type="button"
              onClick={() => ketukKartu(n)}
              aria-pressed={nomor >= 0}
              className={`relative min-h-[64px] rounded-xl border-4 px-2 py-1.5 text-left text-xs font-black leading-tight text-[#1C01A5] ${nomor >= 0 ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#B45309] bg-[#FFFBEB]"} ${goyang === n ? "lm-goyang" : ""}`}
            >
              {nomor >= 0 ? (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#15803D] text-[10px] text-white" aria-hidden="true">
                  {nomor + 1}
                </span>
              ) : null}
              <span className="block text-[11px] uppercase text-[#B45309]">{NAMA_LANGKAH[n]}</span>
              <span className="block">{isi[n]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Dua baris benda cerita: benda pertama dan benda kedua (kurangnya: sebagian benda kedua kosong, lebihnya: kelebihannya disorot, selisih: yang belum berpasangan disorot). */
function GambarCerita({ l, rupa, ops, merah, hijau }: { l: LangkahEmpat; rupa: Rupa; ops: boolean; merah?: Tanda | null; hijau?: Tanda | null }) {
  const { kata: kt, a, b } = l.c;
  const bA = l.c.benda;
  const bB = bendaKe(bA, 1);
  const nB = kt === "kurangnya" ? a : kt === "lebihnya" ? a + b : b;
  const ptsA = tataBaris(a, Y_CERITA[0]);
  const ptsB = tataBaris(nB, Y_CERITA[1]);
  const gayaB = (i: number): Gaya => (kt === "kurangnya" ? (i >= a - b ? { hantu: true } : {}) : kt === "lebihnya" ? (i >= a ? { hijau: true } : {}) : {});
  const gayaA = (i: number): Gaya => (kt === "selisih" && i >= b ? { sorot: true } : {});
  const labelA = rupa === "benda" ? BENDA[bA].nama : `${BENDA[bA].nama}: ${a}`;
  const labelB = rupa === "benda" ? BENDA[bB].nama : kt === "kurangnya" || kt === "lebihnya" ? `${BENDA[bB].nama}: ${b} ${kt}` : `${BENDA[bB].nama}: ${b}`;
  return (
    <g>
      <text x={150} y={Y_CERITA[0] - 16} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
        {labelA}
      </text>
      {ptsA.map((p, i) => (
        <Unit key={`a${i}`} rupa={rupa} x={p.x} y={p.y} benda={bA} g={gayaA(i)} />
      ))}
      <text x={150} y={Y_CERITA[1] - 16} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
        {labelB}
      </text>
      {ptsB.map((p, i) => (
        <Unit key={`b${i}`} rupa={rupa} x={p.x} y={p.y} benda={bB} g={gayaB(i)} />
      ))}
      {ops ? (
        <g>
          <text x={150} y={118} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
            {`kata petunjuk: ${kt}`}
          </text>
          <KartuTanda tanda="tambah" merah={merah === "tambah"} hijau={hijau === "tambah"} />
          <KartuTanda tanda="kurang" merah={merah === "kurang"} hijau={hijau === "kurang"} />
        </g>
      ) : null}
    </g>
  );
}

function Empat({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahEmpat }) {
  const [merah, setMerah] = useState<Tanda | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        atas="Cerita hitungan"
        baris={kalimatCerita(l.c)}
        bawah={
          <>
            {tanyaTanpaTanda(kalimatTanya(l))} <Tanya />
          </>
        }
      />
    );
  const periksa = () => {
    const r = lingkariTanda(goresan, l);
    if (r.benar) {
      setSelesai(true);
      setMerah(null);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih === 0 || r.kurang === 0 ? "Lingkari satu tanda saja, yang cocok dengan kata petunjuknya." : petunjukTanda(l, tandaKata(l.c.kata) === "tambah" ? "kurang" : "tambah"));
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? "lingkari tanda yang cocok" : cara === "klik" && !diam ? "urutkan empat langkah di bawah" : "baca cerita, lihat kata petunjuk"} />
      <GambarCerita l={l} rupa={rupa} ops={kanvas} hijau={selesai ? tandaKata(l.c.kata) : null} merah={merah} />
    </g>
  );
  if (diam) return <Gambar label="Cerita hitungan dua benda">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label="Cerita hitungan dua benda">{gambar}</Gambar>
      {cara === "klik" ? <UrutLangkah l={l} salah={salah} selesai={selesai} onSelesai={() => { setSelesai(true); siap(kalimatKunci(l)); }} /> : null}
    </div>
  );
}

/* ------------------------------ Part-Part-Whole: bagian dan utuh ------------------------------ */
const NAMA_ZONA: Record<Zona, string> = { utuh: "Utuh", kiri: "Bagian pertama", kanan: "Bagian kedua" };

function Bagian({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahBagian }) {
  const sasaran = zonaDicari(l);
  const isi = isiZona(l);
  const [merah, setMerah] = useState<Zona | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [mati, setMati] = useState<Zona[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  const pilihZona = (z: Zona) => {
    if (diam || selesai) return;
    if (z === sasaran) {
      setSelesai(true);
      setMerah(null);
      siap(kalimatKunci(l));
    } else {
      setMerah(z);
      setMati((m) => [...m, z]);
      salah(petunjukZona(l));
    }
  };
  if (rupa === "lambang") {
    const nilai = (z: Zona) => (z === sasaran ? "?" : String(isi[z]));
    return (
      <Pernyataan
        atas="Dua bagian dan satu utuh"
        baris={(["utuh", "kiri", "kanan"] as Zona[]).map((z) => `${NAMA_ZONA[z]}: ${nilai(z)}`)}
        bawah={
          l.angka ? (
            <>
              {tanyaTanpaTanda(kalimatTanya(l))} <Tanya />
            </>
          ) : (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih yang belum diketahui">
              {(["utuh", "kiri", "kanan"] as Zona[]).map((z) => (
                <Tombol key={z} teks={NAMA_ZONA[z]} mati={mati.includes(z) || selesai} onClick={() => pilihZona(z)} />
              ))}
            </div>
          )
        }
      />
    );
  }
  const periksa = () => {
    const zs: Zona[] = ["utuh", "kiri", "kanan"];
    const r = periksaLingkari(goresan, zs.map((z) => ZONA_PUSAT[z]), zs.map((z) => z === sasaran));
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu saja, yang bertanda tanya." : petunjukZona(l));
    }
  };
  const zonaGaya = (z: Zona) => (merah === z ? MERAH : selesai && z === sasaran ? HIJAU : "#D97706");
  const tersembunyi = (z: Zona) => z === sasaran && !selesai;
  const gambar = (
    <g>
      <Judul teks={interaktif ? "ketuk yang belum diketahui" : kanvas ? "lingkari yang belum diketahui" : "dua bagian dan satu utuh"} />
      <line x1={150} y1={84} x2={ZONA_PUSAT.kiri.x} y2={108} stroke={UNGU} strokeWidth={2} />
      <line x1={150} y1={84} x2={ZONA_PUSAT.kanan.x} y2={108} stroke={UNGU} strokeWidth={2} />
      {(["utuh", "kiri", "kanan"] as Zona[]).map((z) => {
        const kt = ZONA_KOTAK[z];
        const c = ZONA_PUSAT[z];
        const n = isi[z];
        const nama = z === "utuh" ? "utuh" : "bagian";
        const bentuk =
          rupa === "benda" ? (
            <>
              <rect x={kt.x} y={kt.y} width={kt.w} height={kt.h} rx={10} fill={selesai && z === sasaran ? "#DCFCE7" : tersembunyi(z) ? "#FEF2F2" : "#FFFBEB"} stroke={zonaGaya(z)} strokeWidth={merah === z || (selesai && z === sasaran) ? 3 : 1.6} strokeDasharray={tersembunyi(z) ? "5 3" : undefined} />
              <text x={kt.x + 8} y={kt.y + 12} fontSize={8.4} fontWeight={900} fill={COKLAT}>
                {nama}
              </text>
              {tersembunyi(z) ? (
                <text x={c.x} y={c.y + 10} textAnchor="middle" fontSize={26} fontWeight={900} fill={MERAH}>
                  ?
                </text>
              ) : (
                titikZona(z, n).map((p, i) => <Unit key={i} rupa="benda" x={p.x} y={p.y} benda={l.benda} />)
              )}
            </>
          ) : (
            <>
              <circle cx={c.x} cy={c.y} r={R_BULAT} fill={selesai && z === sasaran ? "#DCFCE7" : tersembunyi(z) ? "#FEF2F2" : z === "utuh" ? "#FEF08A" : z === "kiri" ? "#DBEAFE" : "#FBCFE8"} stroke={zonaGaya(z)} strokeWidth={merah === z || (selesai && z === sasaran) ? 3.2 : 1.8} strokeDasharray={tersembunyi(z) ? "5 3" : undefined} />
              <text x={c.x} y={c.y + 7} textAnchor="middle" fontSize={20} fontWeight={900} fill={tersembunyi(z) ? MERAH : UNGU}>
                {tersembunyi(z) ? "?" : n}
              </text>
              <text x={z === "utuh" ? c.x + 54 : c.x} y={z === "utuh" ? c.y + 4 : c.y + R_BULAT + 14} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
                {nama}
              </text>
            </>
          );
        return (
          <g key={z} {...(interaktif ? ketuk(() => pilihZona(z)) : {})} aria-label={NAMA_ZONA[z]}>
            {interaktif ? <rect x={kt.x} y={kt.y} width={kt.w} height={kt.h} fill="transparent" /> : null}
            {bentuk}
          </g>
        );
      })}
    </g>
  );
  if (diam) return <Gambar label="Dua bagian dan satu utuh">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Dua bagian dan satu utuh">{gambar}</Gambar>;
}

/* ------------------------------ Act It Out: peragakan cerita ------------------------------ */
function Peragakan({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahPeragakan }) {
  const tambah = l.arah === "tambah";
  const unit = rupa === "diagram" ? "petak" : "benda";
  const total = tambah ? l.a + l.b : l.a;
  const meja = tataBaris(total, Y_MEJA);
  const datang = tataBaris(l.b, Y_DATANG);
  const [pindah, setPindah] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        atas="Cerita hitungan"
        baris={[`${BENDA[l.benda].nama} di meja: ${l.a}.`, `${tambah ? "Datang lagi" : "Diambil"}: ${l.b}.`]}
        bawah={
          <>
            {tanyaTanpaTanda(kalimatTanya(l))} <Tanya />
          </>
        }
      />
    );
  const ketukBenda = () => {
    if (!interaktif || selesai) return;
    const baru = pindah + 1;
    setPindah(baru);
    if (baru >= l.b) {
      setSelesai(true);
      siap(kalimatKunci(l));
    }
  };
  const periksa = () => {
    const pts = tambah ? [...datang, ...meja.slice(0, l.a)] : meja;
    const sasaran = tambah ? [...datang.map(() => true), ...meja.slice(0, l.a).map(() => false)] : meja.map((_, i) => i >= l.a - l.b);
    const r = periksaLingkari(goresan, pts, sasaran);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? `Lingkari hanya ${unit} yang ${tambah ? "datang" : "diambil"}.` : `Lingkari semua ${unit} yang ${tambah ? "datang" : "diambil"}.`);
    }
  };
  /** Benda yang tampil di meja: yang sudah di meja, ditambah yang sudah dipindah (tambah) atau yang masih menunggu diambil (ambil). */
  const tampil = interaktif || selesai ? pindah : diam || cara === "suara" ? l.b : 0;
  const labelMeja = rupa === "benda" ? "di meja" : `${l.a} di meja`;
  const labelB = rupa === "benda" ? (tambah ? "yang datang" : "yang diambil") : `${l.b} ${tambah ? "datang" : "diambil"}`;
  const gambar = (
    <g>
      <Judul teks={interaktif ? `ketuk ${unit} ${tambah ? "yang datang" : "yang diambil"}, satu per satu` : kanvas ? `lingkari ${unit} ${tambah ? "yang datang" : "yang diambil"}` : "peragaan cerita"} />
      <rect x={14} y={Y_MEJA + 10} width={272} height={9} rx={3} fill="#E8C08A" stroke={COKLAT} strokeWidth={1.6} />
      <line x1={30} y1={Y_MEJA + 19} x2={30} y2={Y_MEJA + 40} stroke={COKLAT} strokeWidth={3} />
      <line x1={270} y1={Y_MEJA + 19} x2={270} y2={Y_MEJA + 40} stroke={COKLAT} strokeWidth={3} />
      <text x={150} y={Y_MEJA + 56} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
        {labelMeja}
      </text>
      {tambah ? (
        <g>
          <text x={150} y={Y_DATANG - 18} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={HIJAU}>
            {labelB}
          </text>
          {meja.slice(0, l.a).map((p, i) => (
            <Unit key={`m${i}`} rupa={rupa} x={p.x} y={p.y} benda={l.benda} />
          ))}
          {meja.slice(l.a, l.a + tampil).map((p, i) => (
            <Unit key={`p${i}`} rupa={rupa} x={p.x} y={p.y} benda={l.benda} g={{ hijau: true }} />
          ))}
          {datang.slice(0, l.b - tampil).map((p, i) => (
            <g key={`d${i}`} {...(interaktif ? ketuk(ketukBenda) : {})} aria-label="benda yang datang">
              {interaktif ? <circle cx={p.x} cy={p.y} r={11} fill="transparent" /> : null}
              <Unit rupa={rupa} x={p.x} y={p.y} benda={l.benda} g={{ hijau: true }} />
            </g>
          ))}
          {l.b - tampil > 0 ? (
            <text x={150} y={Y_DATANG + 26} textAnchor="middle" fontSize={14} fill={HIJAU}>
              {"↓"}
            </text>
          ) : null}
        </g>
      ) : (
        <g>
          <text x={150} y={Y_MEJA - 22} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={MERAH}>
            {labelB}
          </text>
          {meja.map((p, i) => {
            const diambil = i >= l.a - l.b;
            const sudah = diambil && i >= l.a - tampil;
            return (
              <g key={i} {...(interaktif && diambil && !sudah ? ketuk(ketukBenda) : {})} aria-label={diambil ? "benda yang diambil" : "benda di meja"}>
                {interaktif && diambil && !sudah ? <circle cx={p.x} cy={p.y} r={10} fill="transparent" /> : null}
                <Unit rupa={rupa} x={p.x} y={p.y} benda={l.benda} g={sudah ? { hantu: true } : diambil ? { merah: true } : {}} />
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
  if (diam) return <Gambar label="Peragaan cerita dengan benda">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Peragaan cerita dengan benda">{gambar}</Gambar>;
}

/* ------------------------------ Work Backwards: berpikir mundur ------------------------------ */
function Mundur({ l, rupa, cara, kanvas, diam, salah, siap }: PK & { l: LangkahMundur }) {
  const ambil = l.arah === "ambil";
  const benar = tandaBenar(l) as Tanda;
  const total = ambil ? l.akhir + l.b : l.akhir;
  const pts = tataBaris(total, Y_AKHIR);
  const [merah, setMerah] = useState<Tanda | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [mati, setMati] = useState<Tanda[]>([]);
  const interaktif = !kanvas && !diam && cara === "klik";
  useSiapLangsung(siapLangsung(l, rupa, cara, diam), () => siap());
  if (rupa === "lambang")
    return (
      <Pernyataan
        atas="Cerita hitungan"
        baris={[`${BENDA[l.benda].nama} ${ambil ? `tinggal ${l.akhir}` : `jadi ${l.akhir}`}.`, `Tadi ${ambil ? "diambil" : "ditambah"}: ${l.b}.`]}
        bawah={
          <>
            {tanyaTanpaTanda(kalimatTanya(l))} <Tanya />
          </>
        }
      />
    );
  const pilihTanda = (t: Tanda) => {
    if (diam || selesai) return;
    if (t === benar) {
      setSelesai(true);
      setMerah(null);
      siap(kalimatKunci(l));
    } else {
      setMerah(t);
      setMati((m) => [...m, t]);
      salah(petunjukTanda(l, t));
    }
  };
  const periksa = () => {
    const r = lingkariTanda(goresan, l);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatKunci(l));
    } else {
      setGoresan([]);
      salah(r.lebih === 0 || r.kurang === 0 ? "Lingkari satu tanda saja." : petunjukTanda(l, benar === "tambah" ? "kurang" : "tambah"));
    }
  };
  const pisah = ambil ? l.akhir : l.akhir - l.b;
  const tengah = (dari: number, sampai: number) => Number(((pts[dari].x + pts[sampai].x) / 2).toFixed(1));
  const label1 = rupa === "benda" ? (ambil ? "tinggal" : "mula-mula?") : ambil ? `tinggal ${l.akhir}` : "mula-mula?";
  const label2 = rupa === "benda" ? (ambil ? "tadi diambil" : "tadi ditambah") : `${ambil ? "diambil" : "ditambah"} ${l.b}`;
  const gambar = (
    <g>
      <Judul teks={interaktif ? "balik langkahnya: pilih tanda di bawah" : kanvas ? "lingkari tanda untuk membalik langkah" : "berpikir mundur dari hasil akhir"} />
      {pisah > 0 ? (
        <text x={tengah(0, pisah - 1)} y={Y_AKHIR - 18} textAnchor="middle" fontSize={8} fontWeight={900} fill={COKLAT}>
          {label1}
        </text>
      ) : null}
      <text x={tengah(pisah, total - 1)} y={Y_AKHIR - 18} textAnchor="middle" fontSize={8} fontWeight={900} fill={ambil ? "#64748B" : HIJAU}>
        {label2}
      </text>
      {pts.map((p, i) => (
        <Unit key={i} u={Math.min(15, dxBaris(total) - 1)} rupa={rupa} x={p.x} y={p.y} benda={l.benda} g={i < pisah ? {} : ambil ? { hantu: true } : { hijau: true }} />
      ))}
      <text x={150} y={Y_AKHIR + 26} textAnchor="middle" fontSize={8.6} fontWeight={900} fill={COKLAT}>
        {ambil ? "yang tadi diambil kita ..." : "yang tadi ditambah kita ..."}
      </text>
      {kanvas ? (
        <g>
          <KartuTanda tanda="tambah" merah={merah === "tambah"} hijau={selesai && benar === "tambah"} />
          <KartuTanda tanda="kurang" merah={merah === "kurang"} hijau={selesai && benar === "kurang"} />
        </g>
      ) : null}
    </g>
  );
  if (diam) return <Gambar label="Hasil akhir dan langkah yang dibalik">{gambar}</Gambar>;
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <Gambar label="Hasil akhir dan langkah yang dibalik">{gambar}</Gambar>
      {interaktif ? (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tanda untuk membalik langkah">
          <Tombol teks={"+ tambah"} mati={mati.includes("tambah") || selesai} onClick={() => pilihTanda("tambah")} />
          <Tombol teks={`${MINUS} kurang`} mati={mati.includes("kurang") || selesai} onClick={() => pilihTanda("kurang")} />
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function Dasar(props: PK & { l: LangkahDasar }) {
  const { l } = props;
  return l.tipe === "empat" ? <Empat {...props} l={l} /> : l.tipe === "bagian" ? <Bagian {...props} l={l} /> : l.tipe === "peragakan" ? <Peragakan {...props} l={l} /> : <Mundur {...props} l={l} />;
}

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
      <Dasar l={l.dasar} rupa={rupa} cara={cara} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#B91C1C] bg-[#FEF2F2] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#7F1D1D]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
          {l.jawabTokoh !== undefined ? ` Jawabanku ${l.jawabTokoh}.` : ""}
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
export function LangkahPembukaan({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const d = dasarDari(l);
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
  const pk: PK = { rupa, cara, kanvas: cara === "kanvas", salah, siap, info };
  const tanya = kalimatTanya(d);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisPembukaan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraPembukaan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanPembukaan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
