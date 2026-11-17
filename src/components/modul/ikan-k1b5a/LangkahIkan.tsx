"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { alasanSalah, angkaJawab, geserManik, kata, kataSepuluh, klaimSalah, petunjukBanyak, petunjukKira, pilihanDari, pilihanNama, tebakanDekat, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  BINGKAI,
  JARI_MANIK,
  KANTONG,
  LEBAR_ADEGAN,
  LEBAR_NAMA,
  SEKAT,
  TINGGI_ADEGAN,
  TOPLES,
  WADAH,
  letakKantong,
  letakKotak,
  letakManik,
  letakNama,
  letakPetak,
  letakSekat,
  letakToples,
  periksaCentang,
  periksaLingkari,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "./Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 5 Sub-Bab A: kegiatan metode (Metode IGIL memindahkan ikan satu per satu ke dua wadah bersekat sepuluh,
 * Double Ten Frame dua bingkai sepuluh, Rekenrek manik hitung, Estimation Jar toples tebakan), lalu menjawab dengan caranya.
 * Rupa: hewan air berwarna (Concrete), titik polos (Pictorial), kata dan angka saja (Abstract). Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const HIJAU = "#15803D";
const AIR = "#0369A1";

/** Satu hewan air: emoji di lingkaran air berwarna (benda) atau titik polos (diagram). */
function Hewan({ jenis, rupa, x, y, r = 12, tanda = "biasa", nomor }: { jenis: string; rupa: Rupa; x: number; y: number; r?: number; tanda?: "biasa" | "pilih" | "pudar"; nomor?: number }) {
  const op = tanda === "pudar" ? 0.3 : 1;
  const [isi, garis] = WARNA_BENDA[jenis] ?? ["#BFDBFE", AIR];
  return (
    <g opacity={op}>
      {rupa === "benda" ? (
        <>
          <circle cx={x} cy={y} r={r} fill={isi} stroke={tanda === "pilih" ? HIJAU : garis} strokeWidth={tanda === "pilih" ? 3 : 1.6} />
          <text x={x} y={y + r * 0.42} textAnchor="middle" fontSize={r * 1.25}>
            {EMOJI[jenis] ?? EMOJI.ikan}
          </text>
        </>
      ) : (
        <circle cx={x} cy={y} r={r * 0.72} fill={tanda === "pilih" ? "#BBF7D0" : UNGU} stroke={tanda === "pilih" ? HIJAU : UNGU} strokeWidth={2} />
      )}
      {nomor !== undefined ? (
        <g>
          <circle cx={x + r * 0.75} cy={y - r * 0.75} r={6.5} fill={MERAH} stroke="#FFFFFF" strokeWidth={1.2} />
          <text x={x + r * 0.75} y={y - r * 0.75 + 3} textAnchor="middle" fontSize={7.5} fontWeight={900} fill="#FFFFFF">
            {nomor}
          </text>
        </g>
      ) : null}
    </g>
  );
}

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

/** Rupa lambang: kartu tulisan besar dengan pertanyaan. */
function KartuTanya({ atas, bawah }: { atas: React.ReactNode; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-xl">{atas}</p>
      <p className="text-2xl">{bawah}</p>
    </div>
  );
}
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#1C01A5] bg-[#FEF9C3] px-3 py-0.5">{children}</span>;
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;

/** Kantong plastik ikan (kiri) dan dua wadah bersekat sepuluh (kanan). */
function KantongWadah({ rupa }: { rupa: Rupa }) {
  return (
    <g aria-hidden="true">
      <path
        d={`M ${KANTONG.x + 14} ${KANTONG.y} L ${KANTONG.x + KANTONG.w - 14} ${KANTONG.y} Q ${KANTONG.x + KANTONG.w + 4} ${KANTONG.y + KANTONG.h * 0.6} ${KANTONG.x + KANTONG.w - 8} ${KANTONG.y + KANTONG.h} L ${KANTONG.x + 8} ${KANTONG.y + KANTONG.h} Q ${KANTONG.x - 4} ${KANTONG.y + KANTONG.h * 0.6} ${KANTONG.x + 14} ${KANTONG.y} Z`}
        fill={rupa === "benda" ? "rgba(186,230,253,0.55)" : "#F8FAFC"}
        stroke={rupa === "benda" ? AIR : "#64748B"}
        strokeWidth={2}
      />
      <text x={KANTONG.x + KANTONG.w / 2} y={KANTONG.y + 14} textAnchor="middle" fontSize={10} fontWeight={900} fill={AIR}>
        kantong
      </text>
      {WADAH.map((w, f) => (
        <g key={f}>
          <rect x={w.x} y={w.y} width={w.w} height={w.h} rx={6} fill={rupa === "benda" ? "#E0F2FE" : "#FFFFFF"} stroke={UNGU} strokeWidth={2} />
          {Array.from({ length: 10 }, (_, c) => {
            const p = letakSekat(f * 10 + c);
            return <rect key={c} x={p.x - SEKAT / 2} y={p.y - SEKAT / 2} width={SEKAT} height={SEKAT} fill="none" stroke="#94A3B8" strokeWidth={1} />;
          })}
          <text x={w.x + w.w / 2} y={w.y - 4} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
            {f === 0 ? "wadah pertama" : "wadah kedua"}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ------------------------------ Metode IGIL: satu-satu ke wadah bersekat sepuluh ------------------------------ */
function Jaring({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "jaring" }> }) {
  const [urut, setUrut] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  if (rupa === "lambang") return <JaringKata l={l} kanvas={kanvas} salah={salah} siap={siap} info={info} rupa={rupa} />;
  const awal = kanvas ? 10 : 0;
  const diKantong = l.ikan - awal;
  const nama = rupa === "benda" ? NAMA_BENDA[l.jenis] ?? "ikan" : "titik";
  const pindah = (i: number) => {
    if (selesai || kanvas || urut.includes(i)) return;
    const baru = [...urut, i];
    setUrut(baru);
    if (baru.length === l.ikan) {
      setSelesai(true);
      siap(l.ikan > 10 ? `Kantong kosong. Wadah pertama sepuluh, wadah kedua ${kata(l.ikan - 10)}.` : "Kantong kosong. Semua sudah dihitung.");
    } else if (baru.length === 10) info("Sepuluh! Wadah pertama penuh. Lanjut ke wadah kedua.");
  };
  const periksa = () => {
    const p = periksaCentang(goresan, Array.from({ length: diKantong }, (_, i) => letakKantong(i)), 14);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Sepuluh di wadah, ${kata(diKantong)} di kantong.`);
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu ikan, satu tanda." : p.nyasar > 0 ? "Beri tanda tepat di tiap isi kantong." : "Masih ada isi kantong yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <KantongWadah rupa={rupa} />
      {Array.from({ length: awal }, (_, j) => {
        const p = letakSekat(j);
        return <Hewan key={`w${j}`} jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={10} />;
      })}
      {Array.from({ length: diKantong }, (_, i) => {
        const j = urut.indexOf(i);
        const p = j >= 0 ? letakSekat(j) : letakKantong(i);
        return (
          <g key={i} {...(kanvas || j >= 0 ? {} : ketuk(() => pindah(i)))} aria-label={`${nama}${j >= 0 ? `, sudah di wadah, hitungan ${j + 1}` : ", di kantong"}`}>
            <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
            <Hewan jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={j >= 0 ? 10 : 12} />
          </g>
        );
      })}
      <text x={150} y={14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {kanvas ? "tandai tiap isi kantong" : `terhitung: ${urut.length}`}
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kantong dan dua wadah bersekat sepuluh">{gambar}</Gambar>;
}

/** Kartu kata satu baris atau dua baris (belasan). */
function KartuKata({ n, x, y, tanda }: { n: number; x: number; y: number; tanda: "biasa" | "pilih" | "awal" }) {
  const t = kata(n);
  const dua = t.includes(" ");
  const [a, b] = dua ? t.split(" ") : [t, ""];
  return (
    <g>
      <rect x={x - 27} y={y - 22} width={54} height={44} rx={8} fill={tanda === "pilih" ? "#BBF7D0" : tanda === "awal" ? "#FEF9C3" : "#FFFFFF"} stroke={tanda === "pilih" ? HIJAU : UNGU} strokeWidth={tanda === "biasa" ? 1.8 : 3} />
      <text x={x} y={dua ? y - 3 : y + 4} textAnchor="middle" fontSize={a.length > 7 ? 9.5 : 11} fontWeight={900} fill={UNGU}>
        {a}
      </text>
      {dua ? (
        <text x={x} y={y + 11} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
          {b}
        </text>
      ) : null}
    </g>
  );
}

/** Metode IGIL rupa lambang: kartu kata hitungan, diketuk berurutan (satu kartu satu hitungan). */
function JaringKata({ l, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "jaring" }> }) {
  const mulai = l.ikan >= 10 ? 10 : 1;
  const kartu = Array.from({ length: l.ikan - mulai + 1 }, (_, i) => mulai + i);
  const [dapat, setDapat] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const letak = kartu.map((_, i) => letakPetak(i));
  /** Kanvas: kartu sepuluh sudah menjadi awal hitungan; tanda pada kartu sesudahnya. */
  const lewat = kanvas && mulai === 10 ? 1 : 0;
  const ketukKartu = (i: number) => {
    if (selesai || kanvas || i < dapat) return;
    if (i !== dapat) {
      salah(`Ketuk berurutan. Sesudah ${dapat === 0 ? "awal" : kata(kartu[dapat - 1])}, kartu mana?`);
      return;
    }
    const baru = dapat + 1;
    setDapat(baru);
    if (baru === kartu.length) {
      setSelesai(true);
      siap(`Hitungan terakhir ${kata(l.ikan)}.`);
    }
  };
  const periksa = () => {
    const p = periksaCentang(goresan, letak.slice(lewat), 22);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Hitungan terakhir ${kata(l.ikan)}.`);
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu kartu, satu tanda." : p.nyasar > 0 ? "Beri tanda tepat di kartu." : "Masih ada kartu yang belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <text x={150} y={22} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {kanvas ? (lewat ? "mulai dari sepuluh, tandai kartu sesudahnya" : "tandai tiap kartu") : `kartu terhitung: ${dapat}`}
      </text>
      {kartu.map((n, i) => (
        <g key={n} {...(kanvas ? {} : ketuk(() => ketukKartu(i)))} aria-label={`${kata(n)}${i < dapat ? ", sudah dihitung" : ""}`}>
          <KartuKata n={n} x={letak[i].x} y={letak[i].y} tanda={i < dapat ? "pilih" : i < lewat ? "awal" : "biasa"} />
        </g>
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Kartu kata hitungan">{gambar}</Gambar>;
}

/* ------------------------------ Double Ten Frame ------------------------------ */
function PilihanNama({ n, mati, onPilih }: { n: number; mati: number[]; onPilih: (m: number) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih nama bilangan">
      {pilihanNama(n).map((m) => (
        <button key={m} type="button" disabled={mati.includes(m)} onClick={() => onPilih(m)} className="min-h-[52px] rounded-2xl border-4 border-[#1C01A5] bg-white px-4 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
          {kata(m)}
        </button>
      ))}
    </div>
  );
}

function Bingkai({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "bingkai" }> }) {
  const [mati, setMati] = useState<number[]>([]);
  const [penuh, setPenuh] = useState(false);
  const [lanjut, setLanjut] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const nama = l.jawab === "nama";
  const opsi = pilihanNama(l.isi);
  useEffect(() => {
    if (rupa === "lambang" && !nama) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pilih = (m: number) => {
    if (selesai) return;
    if (m === l.isi) {
      setSelesai(true);
      siap(`Betul! Itu ${kataSepuluh(l.isi)}, dibaca ${kata(l.isi)}.`);
    } else {
      setMati((s) => [...s, m]);
      salah(rupa === "lambang" ? `Itu ${kata(m)}. Baca sepuluh dan sisanya, lalu sebut namanya.` : `Itu ${kata(m)}. Bingkai penuh sepuluh, lalu hitung isi bingkai kedua.`);
    }
  };
  const periksaNama = () => {
    const r = periksaLingkari(goresan, opsi.map((_, i) => letakNama(i)), opsi.map((m) => m === l.isi));
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Dibaca ${kata(l.isi)}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu nama saja." : "Nama bilangannya belum dilingkari.");
    }
  };
  if (rupa === "lambang")
    return (
      <div className="space-y-3">
        <KartuTanya
          atas={
            <>
              <Kotak>10</Kotak> dan <Kotak>{l.isi - 10}</Kotak>
            </>
          }
          bawah={nama ? <>nama bilangannya?</> : <>= <Tanya /></>}
        />
        {nama && !kanvas ? <PilihanNama n={l.isi} mati={mati} onPilih={pilih} /> : null}
        {nama && kanvas ? (
          <Kanvas
            gambar={opsi.map((m, i) => (
              <g key={m}>
                <rect x={letakNama(i).x - LEBAR_NAMA / 2} y={letakNama(i).y - 16} width={LEBAR_NAMA} height={32} rx={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
                <text x={letakNama(i).x} y={letakNama(i).y + 5} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
                  {kata(m)}
                </text>
              </g>
            ))}
            selesai={selesai}
            goresan={goresan}
            setGoresan={setGoresan}
            periksa={periksaNama}
          />
        ) : null}
      </div>
    );
  const sisa = Math.max(0, l.isi - 10);
  const ketukPenuh = () => {
    if (selesai || nama || penuh) return;
    if (l.isi < 10) return;
    setPenuh(true);
    if (sisa === 0) {
      setSelesai(true);
      siap("Bingkai pertama penuh, bingkai kedua kosong.");
    } else info("Sepuluh! Sekarang hitung lanjut isi bingkai kedua.");
  };
  const ketukKotak = (j: number) => {
    if (selesai || nama) return;
    if (j < 10) {
      ketukPenuh();
      return;
    }
    if (!penuh) {
      salah("Ketuk bingkai yang penuh dulu. Isinya sepuluh.");
      return;
    }
    if (lanjut.includes(j) || j >= l.isi) return;
    const baru = [...lanjut, j];
    setLanjut(baru);
    if (baru.length === sisa) {
      setSelesai(true);
      siap(`Sepuluh dan ${kata(sisa)}.`);
    }
  };
  const gambar = (
    <g>
      <text x={150} y={30} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {nama ? "dua bingkai sepuluh" : penuh ? `sepuluh, lalu ${lanjut.length}` : "ketuk bingkai yang penuh"}
      </text>
      {BINGKAI.map((b, f) => (
        <rect key={f} x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill={f === 0 && penuh ? "#DCFCE7" : rupa === "benda" ? "#E0F2FE" : "#FFFFFF"} stroke={UNGU} strokeWidth={2.4} />
      ))}
      {Array.from({ length: 20 }, (_, j) => {
        const p = letakKotak(j);
        const terisi = j < l.isi;
        const n = lanjut.indexOf(j);
        return (
          <g key={j} {...(nama || kanvas ? {} : ketuk(() => ketukKotak(j)))} aria-label={terisi ? `isi bingkai${n >= 0 ? `, hitungan ${11 + n}` : ""}` : "kotak kosong"}>
            <rect x={p.x - 13} y={p.y - 13} width={26} height={26} fill="transparent" stroke="#94A3B8" strokeWidth={1} />
            {terisi ? <Hewan jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={10} tanda={n >= 0 ? "pilih" : "biasa"} /> : null}
          </g>
        );
      })}
      {nama && kanvas
        ? opsi.map((m, i) => (
            <g key={m}>
              <rect x={letakNama(i).x - LEBAR_NAMA / 2} y={letakNama(i).y - 16} width={LEBAR_NAMA} height={32} rx={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
              <text x={letakNama(i).x} y={letakNama(i).y + 5} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
                {kata(m)}
              </text>
            </g>
          ))
        : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksaNama} />;
  return (
    <div className="space-y-3">
      <Gambar label="Dua bingkai sepuluh">{gambar}</Gambar>
      {nama ? <PilihanNama n={l.isi} mati={mati} onPilih={pilih} /> : null}
    </div>
  );
}

/* ------------------------------ Rekenrek: manik hitung ------------------------------ */
function Manik({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "manik" }> }) {
  const semua = l.tanya === "semua";
  const bawah = l.sasaran - 10;
  const [t, setT] = useState<[number, number]>(semua ? [10, bawah] : [0, 0]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return semua ? (
      <KartuTanya
        atas={
          <>
            <Kotak>sepuluh</Kotak> dan <Kotak>{kata(bawah)}</Kotak>
          </>
        }
        bawah={
          <>
            = <Tanya />
          </>
        }
      />
    ) : (
      <KartuTanya
        atas={<Kotak>{kata(l.sasaran)}</Kotak>}
        bawah={
          <>
            = 10 dan <Tanya />
          </>
        }
      />
    );
  const geser = (baris: 0 | 1, i: number) => {
    if (selesai || kanvas) return;
    const baru: [number, number] = [...t];
    baru[baris] = geserManik(t[baris], i);
    setT(baru);
    if (baru[0] === 10 && baru[1] === bawah) {
      setSelesai(true);
      siap(`Sepuluh dan ${kata(bawah)} menjadi ${kata(l.sasaran)}.`);
    } else if (baru[0] + baru[1] === l.sasaran) info("Banyaknya sudah pas, tetapi penuhi baris atas dulu sampai sepuluh.");
    else if (baris === 0 && baru[0] === 10 && t[0] !== 10) info("Baris atas penuh, sepuluh. Lanjut di baris bawah.");
  };
  const periksa = () => {
    const titik = [0, 1].flatMap((b) => Array.from({ length: 10 }, (_, i) => letakManik(b, i, t[b])));
    const r = periksaLingkari(goresan, titik, titik.map((_, n) => n >= 10 && n - 10 < bawah));
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Di baris bawah ada ${kata(bawah)}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari hanya manik yang tergeser di baris bawah." : "Masih ada manik tergeser di baris bawah yang belum dilingkari.");
    }
  };
  const gambar = (
    <g>
      <rect x={6} y={40} width={288} height={124} rx={10} fill={rupa === "benda" ? "#FDE7C8" : "#FFFFFF"} stroke={rupa === "benda" ? "#92400E" : "#64748B"} strokeWidth={rupa === "benda" ? 5 : 2} />
      <text x={150} y={26} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {kanvas ? "lingkari manik tergeser di baris bawah" : `sasaran: ${kata(l.sasaran)} · atas ${t[0]}, bawah ${t[1]}`}
      </text>
      {[0, 1].map((b) => (
        <g key={b}>
          <line x1={10} x2={290} y1={letakManik(b, 0, 0).y} y2={letakManik(b, 0, 0).y} stroke="#475569" strokeWidth={2} />
          {Array.from({ length: 10 }, (_, i) => {
            const p = letakManik(b, i, t[b]);
            const merah = i < 5;
            const isi = rupa === "benda" ? (merah ? "#EF4444" : "#FFFBEB") : merah ? UNGU : "#FFFFFF";
            return (
              <g key={i} {...(kanvas ? {} : ketuk(() => geser(b as 0 | 1, i)))} aria-label={`manik baris ${b === 0 ? "atas" : "bawah"} nomor ${i + 1}${i < t[b] ? ", tergeser" : ""}`}>
                <circle cx={p.x} cy={p.y} r={JARI_MANIK + 2} fill="transparent" />
                <circle cx={p.x} cy={p.y} r={JARI_MANIK} fill={isi} stroke={rupa === "benda" ? "#7F1D1D" : UNGU} strokeWidth={1.6} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Manik hitung dua baris">{gambar}</Gambar>;
}

/* ------------------------------ Estimation Jar: toples tebakan ------------------------------ */
function Toples({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "toples" }> }) {
  const [tebak, setTebak] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const [urut, setUrut] = useState<number[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const dekat = tebakanDekat(l.tebakan, l.ikan);
  const banding = (tb: number) => `Tebakanmu ${kata(tb)}. ${Math.abs(tb - l.ikan) <= 2 ? "Dekat sekali!" : "Hitungan membuktikan."}`;
  const pilihTebak = (i: number) => {
    if (tebak !== null || mati.includes(i)) return;
    if (rupa === "lambang") {
      if (i === dekat) {
        setTebak(i);
        siap(`Betul! ${kata(l.tebakan[i]).replace(/^./, (c) => c.toUpperCase())} paling dekat dengan ${kata(l.ikan)}.`);
      } else {
        setMati((m) => [...m, i]);
        salah(`Bandingkan jaraknya dengan ${kata(l.ikan)}. Ada tebakan yang lebih dekat.`);
      }
      return;
    }
    setTebak(i);
    info(`Tebakanmu kira-kira ${kata(l.tebakan[i])}. Sekarang buktikan dengan menghitung.`);
  };
  const tombolTebak = (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih tebakan">
      {l.tebakan.map((tb, i) => (
        <button
          key={tb}
          type="button"
          aria-pressed={tebak === i}
          disabled={(tebak !== null && tebak !== i) || mati.includes(i)}
          onClick={() => pilihTebak(i)}
          className={`min-h-[48px] rounded-full border-4 px-4 text-base font-black disabled:opacity-30 ${tebak === i ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#B45309] bg-[#FFFBEB] text-[#78350F]"}`}
        >
          {rupa === "lambang" ? tb : `kira-kira ${kata(tb)}`}
        </button>
      ))}
    </div>
  );
  if (rupa === "lambang")
    return (
      <div className="space-y-3">
        <KartuTanya atas={<>tebakan: {l.tebakan.join(", ")}</>} bawah={<>hasil hitung: <Kotak>{kata(l.ikan)}</Kotak></>} />
        {tombolTebak}
      </div>
    );
  const hitung = (i: number) => {
    if (selesai || kanvas || urut.includes(i)) return;
    if (tebak === null) {
      salah("Tebak dulu, baru hitung.");
      return;
    }
    const baru = [...urut, i];
    setUrut(baru);
    if (baru.length === l.ikan) {
      setSelesai(true);
      siap(`Ada ${kata(l.ikan)}. ${banding(l.tebakan[tebak])}`);
    }
  };
  const periksa = () => {
    if (tebak === null) {
      setGoresan([]);
      salah("Tebak dulu, baru hitung.");
      return;
    }
    const p = periksaCentang(goresan, Array.from({ length: l.ikan }, (_, i) => letakToples(i)), 16);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! Satu tanda untuk tiap isi. ${banding(l.tebakan[tebak])}`);
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu isi, satu tanda." : p.nyasar > 0 ? "Beri tanda tepat di tiap isi toples." : "Masih ada isi toples yang belum diberi tanda.");
    }
  };
  const nama = rupa === "benda" ? NAMA_BENDA[l.jenis] ?? "isi" : "titik";
  const gambar = (
    <g>
      <rect x={TOPLES.x + 50} y={TOPLES.y - 18} width={TOPLES.w - 100} height={20} rx={5} fill={rupa === "benda" ? "#F59E0B" : "#FFFFFF"} stroke={UNGU} strokeWidth={2} />
      <rect x={TOPLES.x} y={TOPLES.y} width={TOPLES.w} height={TOPLES.h} rx={26} fill={rupa === "benda" ? "rgba(186,230,253,0.5)" : "#F8FAFC"} stroke={UNGU} strokeWidth={2.4} />
      <text x={150} y={14} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        {tebak === null ? "tebak dulu banyaknya" : kanvas ? "tandai tiap isi toples" : `terhitung: ${urut.length}`}
      </text>
      {Array.from({ length: l.ikan }, (_, i) => {
        const p = letakToples(i);
        const n = urut.indexOf(i);
        return (
          <g key={i} {...(kanvas ? {} : ketuk(() => hitung(i)))} aria-label={`${nama}${n >= 0 ? `, hitungan ${n + 1}` : ""}`}>
            <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
            <Hewan jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={13} tanda={n >= 0 ? "pilih" : "biasa"} nomor={n >= 0 ? n + 1 : undefined} />
          </g>
        );
      })}
    </g>
  );
  return (
    <div className="space-y-3">
      {tombolTebak}
      {kanvas ? <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} /> : <Gambar label="Toples tebakan">{gambar}</Gambar>}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
const huruf = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const WARNA_TOKOH: Record<string, string> = { Igil: "#DBEAFE", Kaka: "#FCE7F3", Abang: "#FEF3C7" };

/** Adegan jawaban tokoh: kantong dan wadah (hitung ulang) atau dua bingkai sepuluh; rupa lambang memakai kartu kata. */
function AdeganSalah({ l, rupa }: { l: Extract<Langkah, { tipe: "salah" }>; rupa: Rupa }) {
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            <Kotak>sepuluh</Kotak> dan <Kotak>{kata(l.n - 10)}</Kotak>
          </>
        }
        bawah={<>jadi {kata(l.n)}</>}
      />
    );
  if (l.kesalahan === "ulang")
    return (
      <Gambar label="Wadah pertama penuh sepuluh, sisanya di kantong">
        <KantongWadah rupa={rupa} />
        {Array.from({ length: 10 }, (_, j) => {
          const p = letakSekat(j);
          return <Hewan key={j} jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={10} />;
        })}
        {Array.from({ length: l.n - 10 }, (_, i) => {
          const p = letakKantong(i);
          return <Hewan key={i} jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={12} />;
        })}
      </Gambar>
    );
  return (
    <Gambar label="Dua bingkai sepuluh">
      {BINGKAI.map((b, f) => (
        <rect key={f} x={b.x} y={b.y} width={b.w} height={b.h} rx={6} fill={f === 0 ? "#DCFCE7" : rupa === "benda" ? "#E0F2FE" : "#FFFFFF"} stroke={UNGU} strokeWidth={2.4} />
      ))}
      {Array.from({ length: l.n }, (_, j) => {
        const p = letakKotak(j);
        return <Hewan key={j} jenis={l.jenis} rupa={rupa} x={p.x} y={p.y} r={10} />;
      })}
      <text x={150} y={36} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
        dua bingkai sepuluh
      </text>
    </Gambar>
  );
}

function CariSalah({ l, rupa, salah, siap, info, bicara }: PK & { l: Extract<Langkah, { tipe: "salah" }>; bicara: (t: string) => void }) {
  const [langkah, setLangkah] = useState<"nilai" | "alasan" | "selesai">("nilai");
  const [matiAlasan, setMatiAlasan] = useState<number[]>([]);
  const nama = rupa === "benda" ? NAMA_BENDA[l.jenis] ?? "ikan" : "titik";
  const klaim = klaimSalah(l, nama);
  const alasan = alasanSalah(l, nama);
  const warna = WARNA_TOKOH[l.tokoh] ?? "#E0F2FE";
  useEffect(() => {
    bicara(`${l.tokoh} berkata: ${klaim.ucap}`);
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nilai = (benar: boolean) => {
    if (benar) salah(petunjukKira(l, nama));
    else {
      setLangkah("alasan");
      info(`Betul, jawaban ${l.tokoh} keliru. Apa alasannya?`);
    }
  };
  const pilihAlasan = (i: number) => {
    if (langkah !== "alasan" || matiAlasan.includes(i)) return;
    if (alasan[i].benar) {
      setLangkah("selesai");
      siap(`Betul! ${alasan[i].teks}. Sekarang pilih banyak yang benar.`);
    } else {
      setMatiAlasan((m) => [...m, i]);
      salah(alasan[i].petunjuk);
    }
  };
  const tombol = "min-h-[52px] rounded-2xl border-4 border-[#1C01A5] bg-white px-4 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30";
  return (
    <div className="space-y-3">
      <AdeganSalah l={l} rupa={rupa} />
      <div className="rounded-2xl border-4 border-[#B45309] px-3 py-2 text-center" style={{ backgroundColor: warna }}>
        <p className="text-xs font-black text-[#B45309]">{l.tokoh} menjawab:</p>
        <p className="text-lg font-black text-[#1C01A5]">{klaim.tampil}</p>
      </div>
      {langkah === "nilai" ? (
        <div className="space-y-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-3" role="group" aria-label="Benar atau salah">
            <button type="button" className={tombol} onClick={() => nilai(true)}>
              Benar
            </button>
            <button type="button" className={tombol} onClick={() => nilai(false)}>
              Salah
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">{langkah === "alasan" ? "Pilih alasan yang benar" : "Alasan yang benar sudah dipilih"}</p>
          <div className="flex flex-col gap-2" role="group" aria-label="Pilih alasan">
            {alasan.map((a, i) => (
              <button key={a.teks} type="button" disabled={matiAlasan.includes(i) || (langkah === "selesai" && !a.benar)} onClick={() => pilihAlasan(i)} className={`${tombol} text-left ${langkah === "selesai" && a.benar ? "border-[#15803D] bg-[#DCFCE7]" : ""}`}>
                {huruf(a.teks)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung lagi satu per satu. Sepuluh dulu, lalu sisanya.",
  bingkai: "Bingkai penuh berisi sepuluh. Hitung lanjut isi bingkai kedua.",
  manik: "Baris atas berisi sepuluh. Lihat manik yang tergeser di baris bawah.",
  toples: "Hitung lagi isi toples yang sudah bernomor.",
};

export function LangkahIkan({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
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
  const jawab = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(`Betul! Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${l.tipe === "salah" ? petunjukBanyak(l.kesalahan) : PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const tanya = l.tipe === "manik" && l.tanya === "bawah" ? "Berapa sisanya?" : "Berapa banyaknya?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "jaring" ? <Jaring {...pk} l={l} /> : l.tipe === "bingkai" ? <Bingkai {...pk} l={l} /> : l.tipe === "manik" ? <Manik {...pk} l={l} /> : l.tipe === "salah" ? <CariSalah {...pk} l={l} bicara={bicara} /> : <Toples {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={() => jawab(n)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "")} onPesan={setPesan} />
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
