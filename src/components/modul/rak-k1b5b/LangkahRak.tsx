"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { angkaJawab, deret, kata, kotakPetunjuk, kotakTetangga, lompatBerikut, pilihanDari, rentangLompat, tetanggaDari, ucapAngka, type Arah, type CariSalah, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI, NAMA_BENDA, WARNA_BENDA } from "./data";
import {
  KARTU_URUT,
  KOTAK_TETANGGA,
  LEBAR_ADEGAN,
  LEBAR_ARAH,
  SEL_KISI,
  TINGGI_ADEGAN,
  letakArah,
  letakKisi,
  letakLompat,
  letakTetangga,
  letakUrut,
  periksaCentang,
  periksaLingkari,
  type Goresan,
} from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 5 Sub-Bab B: kegiatan metode (Metode IGIL menghitung deret nomor satu-satu, Number Line Hop lompat satu-satu,
 * Number Grid kisi satu sampai dua puluh, Before and After sebelum, sesudah, dan di antara), lalu menjawab dengan caranya.
 * Rupa: akuarium berisi hewan air berwarna (Concrete), kotak polos dan garis bilangan (Pictorial), kata dan angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk. Cara menjawab bilangan sampai dua puluh memakai ulang Sub-Bab A (Jawab20).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const UNGU = "#1C01A5";
const HIJAU = "#15803D";
const AIR = "#0369A1";
const KUNING = "#FACC15";
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Satu akuarium kecil (benda) atau kotak polos (diagram/lambang) dengan pelat nomor di bawahnya. */
function Wadah({ x, y, w, h, rupa, jenis, nomor, tanda = "biasa" }: { x: number; y: number; w: number; h: number; rupa: Rupa; jenis: string; nomor: number | null; tanda?: "biasa" | "pilih" | "nyala" }) {
  const garis = tanda === "pilih" ? HIJAU : tanda === "nyala" ? "#B45309" : rupa === "benda" ? AIR : UNGU;
  const lebar = tanda === "biasa" ? 1.8 : 3;
  const teks = nomor === null ? "?" : String(nomor);
  const merah = nomor === null ? "#DC2626" : UNGU;
  if (rupa === "benda") {
    const [isi] = WARNA_BENDA[jenis] ?? ["#BFDBFE"];
    const plat = Math.min(14, h * 0.36);
    return (
      <g>
        <rect x={x - w / 2} y={y - h / 2} width={w} height={h - plat} rx={3} fill={tanda === "pilih" ? "#DCFCE7" : tanda === "nyala" ? "#FEF3C7" : "#E0F2FE"} stroke={garis} strokeWidth={lebar} />
        <rect x={x - w / 2 + 2} y={y - h / 2 + (h - plat) * 0.35} width={w - 4} height={(h - plat) * 0.65 - 2} rx={2} fill={isi} opacity={0.55} />
        <text x={x} y={y - h / 2 + (h - plat) * 0.72} textAnchor="middle" fontSize={Math.min(w, h - plat) * 0.55}>
          {EMOJI[jenis] ?? EMOJI.ikan}
        </text>
        <rect x={x - w / 2 + 1} y={y + h / 2 - plat} width={w - 2} height={plat} rx={2} fill="#FFFFFF" stroke={garis} strokeWidth={1.2} />
        <text x={x} y={y + h / 2 - plat / 2 + 3.5} textAnchor="middle" fontSize={Math.min(10, plat - 2)} fontWeight={900} fill={merah}>
          {teks}
        </text>
      </g>
    );
  }
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={rupa === "lambang" ? 8 : 2} fill={tanda === "pilih" ? "#DCFCE7" : tanda === "nyala" ? "#FEF3C7" : "#FFFFFF"} stroke={garis} strokeWidth={lebar} />
      <text x={x} y={y + Math.min(w, h) * 0.17} textAnchor="middle" fontSize={Math.min(w, h) * 0.46} fontWeight={900} fill={merah}>
        {teks}
      </text>
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
const Judul = ({ teks }: { teks: string }) => (
  <text x={150} y={20} textAnchor="middle" fontSize={11} fontWeight={900} fill={UNGU}>
    {teks}
  </text>
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
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#15803D] bg-[#052E16] px-3 py-0.5 font-mono text-[#4ADE80]">{children}</span>;
const Tanya = () => <span className="rounded-lg bg-[#FFE566] px-2 text-[#DC2626]">?</span>;

/* ------------------------------ Metode IGIL: deret nomor satu-satu ------------------------------ */
function PilihanArah({ mati, onPilih }: { mati: Arah[]; onPilih: (a: Arah) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih arah hitungan">
      {(["maju", "mundur"] as Arah[]).map((a) => (
        <button key={a} type="button" disabled={mati.includes(a)} onClick={() => onPilih(a)} className="min-h-[52px] min-w-[110px] rounded-2xl border-4 border-[#1C01A5] bg-white px-4 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
          {a === "maju" ? "\u{27A1}\u{FE0F} maju" : "\u{2B05}\u{FE0F} mundur"}
        </button>
      ))}
    </div>
  );
}

function Urut({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "urut" }> }) {
  const d = deret(l.dari, l.ke);
  const n = d.length;
  const arah: Arah = l.ke >= l.dari ? "maju" : "mundur";
  const [dapat, setDapat] = useState(0);
  const [mati, setMati] = useState<Arah[]>([]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const letak = d.map((_, i) => letakUrut(i, n));
  const iHilang = l.hilang === null ? -1 : d.indexOf(l.hilang);
  const habis = dapat === n;
  const ketukKartu = (i: number) => {
    if (selesai || kanvas || habis) return;
    if (i < dapat) return;
    if (i !== dapat) {
      salah(dapat === 0 ? "Mulai dari ujung kiri." : `Ketuk berurutan. Sesudah ${d[dapat - 1] === l.hilang ? "yang hilang" : kata(d[dapat - 1])}, yang mana?`);
      return;
    }
    const baru = dapat + 1;
    setDapat(baru);
    const ucap = i === iHilang ? "Nomornya hilang." : kata(d[i]);
    if (baru === n) {
      if (l.jawab === "hilang") {
        setSelesai(true);
        siap(`${ucap} Satu nomor tidak terbaca. Lihat tetangganya.`);
      } else info(`${ucap} Bilangannya makin ${arah === "maju" ? "besar" : "kecil"}. Maju atau mundur?`);
    } else info(ucap);
  };
  const pilihArah = (a: Arah) => {
    if (selesai) return;
    if (a === arah) {
      setSelesai(true);
      siap(`Betul! Hitung ${arah}: ${d.map((x) => kata(x)).join(", ")}.`);
    } else {
      setMati((m) => [...m, a]);
      salah(arah === "maju" ? "Lihat lagi: bilangannya makin besar. Itu hitung maju." : "Lihat lagi: bilangannya makin kecil. Itu hitung mundur.");
    }
  };
  const periksa = () => {
    if (l.jawab === "arah") {
      const r = periksaLingkari(goresan, [0, 1].map(letakArah), [arah === "maju", arah === "mundur"]);
      if (r.benar) {
        setSelesai(true);
        siap(`Betul! Hitung ${arah}.`);
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? "Lingkari satu kata saja." : "Bilangannya makin besar atau makin kecil? Lingkari katanya.");
      }
      return;
    }
    const r = periksaLingkari(goresan, letak, letak.map((_, i) => i === iHilang));
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Nomor itu yang hilang. Lihat tetangganya.");
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari hanya yang nomornya hilang." : "Cari yang nomornya tanda tanya, lalu lingkari.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? (l.jawab === "arah" ? "baca dari kiri, lalu lingkari arahnya" : "lingkari yang nomornya hilang") : `terhitung: ${dapat}`} />
      {rupa === "benda" ? <rect x={letak[0].x - KARTU_URUT.w / 2 - 6} y={letak[0].y + KARTU_URUT.h / 2} width={letak[n - 1].x - letak[0].x + KARTU_URUT.w + 12} height={7} rx={2} fill="#92400E" /> : null}
      {d.map((v, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => ketukKartu(i)))} aria-label={`${i === iHilang ? "nomor hilang" : kata(v)}${i < dapat ? ", sudah dihitung" : ""}`}>
          <Wadah x={letak[i].x} y={letak[i].y} w={KARTU_URUT.w} h={KARTU_URUT.h} rupa={rupa} jenis={l.jenis} nomor={i === iHilang ? null : v} tanda={i < dapat ? "pilih" : "biasa"} />
        </g>
      ))}
      {!kanvas && dapat > 0 && dapat < n ? (
        <text x={letak[dapat - 1].x} y={letak[0].y - KARTU_URUT.h / 2 - 6} textAnchor="middle" fontSize={12} fill={HIJAU}>
          {"\u{25BC}"}
        </text>
      ) : null}
      {kanvas && l.jawab === "arah"
        ? (["maju", "mundur"] as Arah[]).map((a, i) => (
            <g key={a}>
              <rect x={letakArah(i).x - LEBAR_ARAH / 2} y={letakArah(i).y - 16} width={LEBAR_ARAH} height={32} rx={8} fill="#FFFFFF" stroke={UNGU} strokeWidth={2} />
              <text x={letakArah(i).x} y={letakArah(i).y + 5} textAnchor="middle" fontSize={13} fontWeight={900} fill={UNGU}>
                {a}
              </text>
            </g>
          ))
        : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-3">
      <Gambar label="Deret nomor">{gambar}</Gambar>
      {habis && l.jawab === "arah" && !selesai ? <PilihanArah mati={mati} onPilih={pilihArah} /> : null}
    </div>
  );
}

/* ------------------------------ Number Line Hop: lompat satu-satu ------------------------------ */
function Lompat({ l, rupa, kanvas, salah, siap, info }: PK & { l: Extract<Langkah, { tipe: "lompat" }> }) {
  const [a, b] = rentangLompat(l);
  const angkaGaris = Array.from({ length: b - a + 1 }, (_, i) => a + i);
  const letak = angkaGaris.map((_, i) => letakLompat(i, angkaGaris.length));
  const di = (v: number) => letak[v - a];
  const [jejak, setJejak] = useState<number[]>([l.dari]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            mulai <Kotak>{l.dari}</Kotak>, {l.arah} <Kotak>{l.langkah}</Kotak> langkah
          </>
        }
        bawah={
          <>
            mendarat di <Tanya />
          </>
        }
      />
    );
  const pos = jejak[jejak.length - 1];
  const tempat = Array.from({ length: l.langkah }, (_, i) => l.dari + (l.arah === "maju" ? i + 1 : -(i + 1)));
  const lompat = (v: number) => {
    if (selesai || kanvas) return;
    if (v === pos) return;
    if (v !== lompatBerikut(pos, l.arah)) {
      salah(`Lompat satu-satu ${l.arah === "maju" ? "ke kanan, makin besar" : "ke kiri, makin kecil"}.`);
      return;
    }
    const baru = [...jejak, v];
    setJejak(baru);
    if (baru.length - 1 === l.langkah) {
      setSelesai(true);
      siap(`${besar(kata(l.langkah))} langkah. ${besar(kata(v))}.`);
    } else info(kata(v));
  };
  const periksa = () => {
    const p = periksaCentang(goresan, tempat.map(di), 13);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! ${besar(kata(l.langkah))} tempat mendarat.`);
    } else {
      setGoresan([]);
      salah(p.dobel > 0 ? "Satu tempat, satu tanda." : p.nyasar > 0 ? "Beri tanda hanya di tempat mendarat, bukan di tempat mulai." : `Masih ada tempat mendarat yang belum diberi tanda. Hitung ${l.arah} satu-satu.`);
    }
  };
  const y = letak[0].y;
  const gambar = (
    <g>
      <Judul teks={kanvas ? `mulai ${l.dari}, tandai tiap tempat mendarat` : `mulai ${l.dari} · ${l.arah} · langkah: ${jejak.length - 1}`} />
      {rupa === "diagram" ? (
        <g aria-hidden="true">
          <line x1={6} x2={294} y1={y} y2={y} stroke={UNGU} strokeWidth={2} />
          <path d={`M 294 ${y} l -7 -4 v 8 z M 6 ${y} l 7 -4 v 8 z`} fill={UNGU} />
        </g>
      ) : (
        <rect x={4} y={y + 15} width={292} height={7} rx={2} fill="#92400E" aria-hidden="true" />
      )}
      {jejak.slice(1).map((v, i) => {
        const p = di(jejak[i]);
        const q = di(v);
        return <path key={i} d={`M ${p.x} ${y - 16} Q ${(p.x + q.x) / 2} ${y - 46} ${q.x} ${y - 16}`} fill="none" stroke={HIJAU} strokeWidth={2.4} />;
      })}
      {angkaGaris.map((v, i) => {
        const p = letak[i];
        const kini = !kanvas && v === pos;
        return (
          <g key={v} {...(kanvas ? {} : ketuk(() => lompat(v)))} aria-label={`${kata(v)}${v === l.dari ? ", tempat mulai" : ""}${kini ? ", di sini" : ""}`}>
            <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
            {rupa === "benda" ? (
              <Wadah x={p.x} y={p.y} w={24} h={30} rupa={rupa} jenis={l.jenis} nomor={v} tanda={v === l.dari ? "nyala" : jejak.includes(v) ? "pilih" : "biasa"} />
            ) : (
              <g>
                <line x1={p.x} x2={p.x} y1={y - 7} y2={y + 7} stroke={UNGU} strokeWidth={2} />
                <circle cx={p.x} cy={y} r={v === l.dari || kini ? 6 : 3.5} fill={v === l.dari ? KUNING : jejak.includes(v) ? HIJAU : "#FFFFFF"} stroke={UNGU} strokeWidth={1.6} />
                <text x={p.x} y={y + 24} textAnchor="middle" fontSize={12} fontWeight={900} fill={UNGU}>
                  {v}
                </text>
              </g>
            )}
          </g>
        );
      })}
      {rupa === "benda" ? (
        <text x={di(kanvas ? l.dari : pos).x} y={y - 22} textAnchor="middle" fontSize={16} aria-hidden="true">
          {EMOJI[l.jenis] ?? EMOJI.ikan}
        </text>
      ) : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? `Rak akuarium, ${NAMA_BENDA[l.jenis] ?? "hewan air"} melompat` : "Garis bilangan"}>{gambar}</Gambar>;
}

/* ------------------------------ Number Grid: kisi satu sampai dua puluh ------------------------------ */
const ARAH_PETUNJUK = { atas: "atasnya", bawah: "bawahnya", kiri: "kirinya", kanan: "kanannya" } as const;

function Kisi({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "kisi" }> }) {
  const h = kotakPetunjuk(l.kosong, l.petunjuk);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          <>
            {ARAH_PETUNJUK[l.petunjuk]} <Kotak>{h}</Kotak>
          </>
        }
        bawah={
          <>
            kotak kosong = <Tanya />
          </>
        }
      />
    );
  const terang = `Di ${ARAH_PETUNJUK[l.petunjuk]} ada ${kata(h)}.`;
  const pilih = (n: number) => {
    if (selesai || kanvas) return;
    if (n === l.kosong) {
      setSelesai(true);
      siap(`Ini kotak kosongnya. ${terang}`);
    } else salah(`Itu ${kata(n)}. Cari kotak yang nomornya tanda tanya.`);
  };
  const periksa = () => {
    const p = periksaCentang(goresan, [letakKisi(l.kosong)], 14);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! ${terang}`);
    } else {
      setGoresan([]);
      salah(p.nyasar > 0 || p.dobel > 0 ? "Beri satu tanda saja, tepat di kotak yang kosong." : "Kotak kosongnya belum diberi tanda.");
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? "tandai kotak yang kosong" : "kisi satu sampai dua puluh"} />
      {rupa === "benda"
        ? [0, 1].map((r) => <rect key={r} x={0} y={letakKisi(r * 10 + 1).y + SEL_KISI.h / 2} width={300} height={5} rx={2} fill="#92400E" aria-hidden="true" />)
        : null}
      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => {
        const p = letakKisi(n);
        return (
          <g key={n} {...(kanvas ? {} : ketuk(() => pilih(n)))} aria-label={n === l.kosong ? "kotak kosong" : `${kata(n)}${n === h ? ", menyala" : ""}`}>
            <Wadah x={p.x} y={p.y} w={SEL_KISI.w} h={SEL_KISI.h} rupa={rupa} jenis={l.jenis} nomor={n === l.kosong ? null : n} tanda={n === h ? "nyala" : selesai && n === l.kosong ? "pilih" : "biasa"} />
          </g>
        );
      })}
      <text x={150} y={190} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        baris bawah = baris atas tambah sepuluh
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label={rupa === "benda" ? "Rak akuarium dua tingkat" : "Kisi satu sampai dua puluh"}>{gambar}</Gambar>;
}

/* ------------------------------ Before and After: sebelum, sesudah, di antara ------------------------------ */
function Tetangga({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "tetangga" }> }) {
  const isi = tetanggaDari(l);
  const target = kotakTetangga(l.tanya);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang") siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (rupa === "lambang")
    return (
      <KartuTanya
        atas={
          l.tanya === "antara" ? (
            <>
              <Kotak>{l.n - 1}</Kotak> <Tanya /> <Kotak>{l.n + 1}</Kotak>
            </>
          ) : (
            <>
              {l.tanya} <Kotak>{l.n}</Kotak>
            </>
          )
        }
        bawah={
          <>
            = <Tanya />
          </>
        }
      />
    );
  const petunjuk = l.tanya === "sebelum" ? "Sebelum ada di kiri, satu kurang." : l.tanya === "sesudah" ? "Sesudah ada di kanan, satu lebih." : "Di antara ada di tengah.";
  const pilih = (i: number) => {
    if (selesai || kanvas) return;
    if (isi[i] !== null) return;
    if (i === target) {
      setSelesai(true);
      siap(`Ini tempatnya. ${petunjuk}`);
    } else salah(petunjuk);
  };
  const periksa = () => {
    const p = periksaCentang(goresan, [letakTetangga(target)], 30);
    if (p.benar) {
      setSelesai(true);
      siap(`Betul! ${petunjuk}`);
    } else {
      setGoresan([]);
      salah(petunjuk);
    }
  };
  const gambar = (
    <g>
      <Judul teks={kanvas ? `tandai tempat bilangan ${l.tanya === "antara" ? "di antara" : l.tanya}` : `ketuk tempat bilangan ${l.tanya === "antara" ? "di antara" : l.tanya}`} />
      {rupa === "benda" ? <rect x={20} y={letakTetangga(0).y + KOTAK_TETANGGA / 2} width={260} height={8} rx={2} fill="#92400E" aria-hidden="true" /> : null}
      {[0, 1, 2].map((i) => {
        const p = letakTetangga(i);
        const kosong = isi[i] === null;
        return (
          <g key={i} {...(kanvas || !kosong ? {} : ketuk(() => pilih(i)))} aria-label={kosong ? `tempat kosong ${["kiri", "tengah", "kanan"][i]}` : kata(isi[i] ?? 0)}>
            {kosong && rupa !== "benda" ? (
              <rect x={p.x - KOTAK_TETANGGA / 2} y={p.y - KOTAK_TETANGGA / 2} width={KOTAK_TETANGGA} height={KOTAK_TETANGGA} rx={4} fill={selesai && i === target ? "#DCFCE7" : "#FFFFFF"} stroke={UNGU} strokeWidth={2} strokeDasharray="6 4" />
            ) : (
              <Wadah x={p.x} y={p.y} w={KOTAK_TETANGGA} h={KOTAK_TETANGGA} rupa={rupa} jenis={l.jenis} nomor={isi[i]} tanda={selesai && i === target ? "pilih" : !kosong ? "nyala" : "biasa"} />
            )}
          </g>
        );
      })}
      <text x={letakTetangga(0).x} y={185} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        sebelum
      </text>
      <text x={letakTetangga(2).x} y={185} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
        sesudah
      </text>
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return <Gambar label="Tiga tempat berdampingan">{gambar}</Gambar>;
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Lihat tetangganya. Hitung satu-satu dari nomor sebelumnya.",
  lompat: "Hitung lagi lompatnya satu-satu dari tempat mulai.",
  kisi: "Bawahnya tambah sepuluh, kanannya tambah satu.",
  tetangga: "Sesudah berarti satu lebih, sebelum berarti satu kurang.",
};

/* ------------------------------ Cari kesalahan: tokoh sudah menjawab, anak memutuskan lalu memilih alasan ------------------------------ */
const WAJAH = { Igil: "\u{1F9D2}", Kaka: "\u{1F467}", Abang: "\u{1F466}" } as const;

function Cari({ l, rupa, bicara, onBenar }: { l: CariSalah; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak selalu di tombol pertama. */
  const urut = l.alasan.map((_, i) => (i + 1 + (l.alasan[l.benar].teks.length % (l.alasan.length - 1))) % l.alasan.length);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const ucap = (p: string, salah: boolean) => {
    if (salah) {
      setGoyang(true);
      window.setTimeout(() => setGoyang(false), 480);
    }
    setPesan(p);
    bicara(ucapAngka(p));
  };
  const n = l.visual.length;
  const putus = (benar: boolean) => {
    if (benar) ucap(l.tunjuk, true);
    else {
      setTahap("alasan");
      ucap(`Betul, ${l.tokoh} keliru. Sekarang pilih alasan yang benar.`, false);
    }
  };
  const pilih = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      ucap(`Betul! Jawaban yang benar adalah ${kata(l.kunci)}.`, false);
      onBenar();
    } else {
      setMati((m) => [...m, i]);
      ucap(l.alasan[i].tunjuk, true);
    }
  };
  const tombol = "min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-4 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30";
  return (
    <div className={`space-y-3 ${goyang ? "lm-goyang" : ""}`}>
      {rupa !== "lambang" && n > 0 ? (
        <Gambar label="Gambar untuk memeriksa jawaban">
          <Judul teks="lihat gambarnya, lalu periksa jawabannya" />
          {l.visual.map((v, i) => {
            const p = letakUrut(i, n);
            return <Wadah key={i} x={p.x} y={p.y} w={KARTU_URUT.w} h={KARTU_URUT.h} rupa={rupa} jenis={l.jenis} nomor={v} tanda={i === l.nyala ? "nyala" : "biasa"} />;
          })}
        </Gambar>
      ) : null}
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FEF3C7] p-3 text-center text-[#1C01A5]">
        <p className="text-sm font-bold">{l.kisah}</p>
        <p className="mt-1 text-base font-black">
          <span aria-hidden="true">{WAJAH[l.tokoh]} </span>
          {l.klaim}
        </p>
        <button type="button" onClick={() => bicara(ucapAngka(`${l.kisah} ${l.klaim}`))} aria-label="Dengar jawaban" className="mt-1 rounded-full border-2 border-[#15803D] bg-[#DCFCE7] px-3 py-0.5 text-sm">
          {"\u{1F50A}"}
        </button>
      </div>
      {tahap === "putus" ? (
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={`Apakah jawaban ${l.tokoh} benar?`}>
          <button type="button" className={tombol} onClick={() => putus(true)}>
            {"\u{2705}"} Benar
          </button>
          <button type="button" className={tombol} onClick={() => putus(false)}>
            {"\u{274C}"} Salah
          </button>
        </div>
      ) : (
        <div className="space-y-2" role="group" aria-label="Pilih alasan yang benar">
          <p className="text-center text-sm font-black text-[#1C01A5]">Alasan mana yang benar?</p>
          {urut.map((i) => (
            <button key={l.alasan[i].teks} type="button" disabled={tahap === "selesai" ? i !== l.benar : mati.includes(i)} onClick={() => pilih(i)} className={`${tombol} w-full`}>
              {l.alasan[i].teks}
            </button>
          ))}
        </div>
      )}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${tahap === "selesai" ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}

export function LangkahRak(p: P) {
  const l = p.ls.langkah;
  return l.tipe === "cari" ? <Cari l={l} rupa={p.rupa} bicara={p.bicara} onBenar={p.onBenar} /> : <LangkahBiasa {...p} l={l} />;
}

function LangkahBiasa({ ls, rupa, bicara, onBenar, l }: P & { l: Exclude<Langkah, CariSalah> }) {
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
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const tanya = l.tipe === "urut" ? "Nomor berapa yang hilang?" : l.tipe === "lompat" ? "Mendarat di bilangan berapa?" : l.tipe === "kisi" ? "Berapa nomor kotak yang kosong?" : "Bilangan berapa?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "urut" ? <Urut {...pk} l={l} /> : l.tipe === "lompat" ? <Lompat {...pk} l={l} /> : l.tipe === "kisi" ? <Kisi {...pk} l={l} /> : <Tetangga {...pk} l={l} />}
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
