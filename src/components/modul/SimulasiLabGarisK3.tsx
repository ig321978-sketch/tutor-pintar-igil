"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { ejaK3B4 } from "./eja-k3b4";
import {
  BANGUN_C,
  KANAN_X,
  KIRI_X,
  MAKS_BATANG,
  PETAK,
  TITIK_BIRU,
  awalGaris,
  cariBangunC,
  ceritaRelasi,
  keadaanGaris,
  langkahGaris,
  namaRakit,
  rakitTertutup,
  relasiGaris,
  teksJarak,
  selisihUjung,
  titikMerah,
  titikPotong,
  ucapBangun,
  ucapGaris,
  vektor,
  type ArahGaris,
  type KeadaanGaris,
  type Relasi,
  type StateGaris,
} from "./lab-garis-k3b4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B4 Sub-Bab C): Lab Dua Garis. Satu alat, dua tampilan.           */
/*  Dua Garis : garis biru dan merah pada kertas berpetak. Putar dan geser;      */
/*              hubungan dihitung dari arahnya (sejajar, tegak lurus, bukan).    */
/*  Bangun    : ciri bangun datar sederhana dan merakit bangun dari batang.      */
/* Logika: lab-garis-k3b4.ts. Gambar hanya garis, petak, dan bangun polos.        */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const BIRU = "#2563EB";
const MERAH = "#DC2626";
const SEL = 36;
const PAD = 16;
const CATATAN = [
  "Putar garis merah sampai tegak lurus dengan garis biru. Apa yang muncul di pertemuannya?",
  "Putar garis merah sampai sejajar, lalu geser. Berapa jarak di ujung kiri dan di ujung kanan?",
  "Putar garis merah 45° dari garis biru. Mengapa jaraknya berbeda di kedua ujung?",
  "Di Bangun, rakit 2 batang lalu 3 batang. Mengapa 2 batang belum membentuk bangun?",
];

const px = (x: number) => PAD + x * SEL;
const py = (y: number) => PAD + (PETAK - y) * SEL;
const NAMA_RELASI: Record<Relasi, string> = { sejajar: "sejajar (//)", "tegak-lurus": "tegak lurus (⊥)", bukan: "bukan sejajar dan bukan tegak lurus", berimpit: "berimpit (satu garis)" };

function Garis({ titik, arah, warna }: { titik: [number, number]; arah: ArahGaris; warna: string }) {
  const [dx, dy] = vektor(arah);
  const t = 20;
  return <line x1={px(titik[0] - t * dx)} y1={py(titik[1] - t * dy)} x2={px(titik[0] + t * dx)} y2={py(titik[1] + t * dy)} stroke={warna} strokeWidth="5" strokeLinecap="round" clipPath="url(#petak-k3b4)" />;
}

function Kertas({ x }: { x: StateGaris }) {
  const relasi = relasiGaris(x.ab, x.ar, x.g);
  const merah = titikMerah(x.ar, x.g);
  const potong = titikPotong(x.ab, x.ar, x.g);
  const sel = selisihUjung(x.ab, x.ar, x.g);
  const vertikal = x.ab === 90 && x.ar === 90;
  const lebar = PAD * 2 + PETAK * SEL;
  const siku = potong && relasi === "tegak-lurus" ? potong : null;
  const kotak = (() => {
    if (!siku) return null;
    const norm = (v: [number, number]): [number, number] => {
      const m = Math.hypot(v[0], v[1]);
      return [v[0] / m, -v[1] / m];
    };
    const a = norm(vektor(x.ab));
    const b = norm(vektor(x.ar));
    const s = 14;
    const o: [number, number] = [px(siku[0]), py(siku[1])];
    return `M ${o[0] + a[0] * s} ${o[1] + a[1] * s} L ${o[0] + a[0] * s + b[0] * s} ${o[1] + a[1] * s + b[1] * s} L ${o[0] + b[0] * s} ${o[1] + b[1] * s}`;
  })();
  return (
    <svg viewBox={`0 0 ${lebar} ${lebar}`} className="mx-auto block h-72 w-full max-w-sm" role="img" aria-label={`Kertas berpetak dengan garis biru dan garis merah: ${NAMA_RELASI[relasi]}`}>
      <defs>
        <clipPath id="petak-k3b4">
          <rect x={PAD} y={PAD} width={PETAK * SEL} height={PETAK * SEL} />
        </clipPath>
      </defs>
      <rect x={PAD} y={PAD} width={PETAK * SEL} height={PETAK * SEL} fill="#FFFBEB" stroke={UNGU} strokeWidth="2" />
      {Array.from({ length: PETAK + 1 }, (_, i) => i).map((i) => (
        <g key={i}>
          <line x1={px(i)} y1={PAD} x2={px(i)} y2={PAD + PETAK * SEL} stroke="#C4B5FD" strokeWidth="1" />
          <line x1={PAD} y1={py(i)} x2={PAD + PETAK * SEL} y2={py(i)} stroke="#C4B5FD" strokeWidth="1" />
        </g>
      ))}
      <Garis titik={TITIK_BIRU} arah={x.ab} warna={BIRU} />
      <Garis titik={merah} arah={x.ar} warna={MERAH} />
      {kotak ? <path d={kotak} fill="none" stroke={UNGU} strokeWidth="2.5" /> : null}
      {x.tampil.pojok && potong ? (
        <g>
          <circle cx={px(potong[0])} cy={py(potong[1])} r="6" fill="#FFE566" stroke={UNGU} strokeWidth="2.5" />
          <text x={px(potong[0]) + 9} y={py(potong[1]) - 9} fontSize="11" fontWeight="900" fill={UNGU}>
            {relasi === "tegak-lurus" ? "pas: 90°" : "tidak pas"}
          </text>
        </g>
      ) : null}
      {x.tampil.jarak && sel && relasi !== "berimpit"
        ? (vertikal
            ? [1, 7].map((y) => (
                <g key={`h${y}`}>
                  <line x1={px(TITIK_BIRU[0])} y1={py(y)} x2={px(merah[0])} y2={py(y)} stroke="#16A34A" strokeWidth="3" strokeDasharray="4 3" />
                  <text x={(px(TITIK_BIRU[0]) + px(merah[0])) / 2} y={py(y) - 5} textAnchor="middle" fontSize="12" fontWeight="900" fill="#15803D">
                    {Math.abs(merah[0] - TITIK_BIRU[0])}
                  </text>
                </g>
              ))
            : [
                { xx: KIRI_X, v: sel.kiri },
                { xx: KANAN_X, v: sel.kanan },
              ].map(({ xx, v }) => {
                const yb = py(TITIK_BIRU[1] + (vektor(x.ab)[1] / vektor(x.ab)[0]) * (xx - TITIK_BIRU[0]));
                return (
                  <g key={`v${xx}`}>
                    <line x1={px(xx)} y1={yb} x2={px(xx)} y2={yb - v * SEL} stroke="#16A34A" strokeWidth="3" strokeDasharray="4 3" />
                    <text x={px(xx) + 12} y={yb - (v * SEL) / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="900" fill="#15803D">
                      {Math.abs(v)}
                    </text>
                  </g>
                );
              }))
        : null}
    </svg>
  );
}

function Rakitan({ n }: { n: number }) {
  const cx = 110;
  const cy = 90;
  const r = 66;
  if (n <= 0) return <p className="py-6 text-center text-sm font-bold text-[#1C01A5]/60">Belum ada batang.</p>;
  if (n >= 3) {
    const titik = Array.from({ length: n }, (_, i) => {
      const a = (-90 + (360 / n) * i) * (Math.PI / 180);
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
    });
    return (
      <svg viewBox="0 0 220 180" className="mx-auto block h-44 w-full max-w-xs" role="img" aria-label={`${n} batang membentuk bangun tertutup`}>
        <polygon points={titik.map((p) => p.join(",")).join(" ")} fill="#FEF9C3" stroke={UNGU} strokeWidth="5" strokeLinejoin="round" />
        {titik.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#FFE566" stroke={UNGU} strokeWidth="2.5" />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 220 180" className="mx-auto block h-44 w-full max-w-xs" role="img" aria-label={`${n} batang, belum tertutup`}>
      {n === 1 ? (
        <line x1="50" y1="120" x2="170" y2="120" stroke={UNGU} strokeWidth="6" strokeLinecap="round" />
      ) : (
        <>
          <line x1="50" y1="140" x2="110" y2="50" stroke={UNGU} strokeWidth="6" strokeLinecap="round" />
          <line x1="110" y1="50" x2="170" y2="140" stroke={UNGU} strokeWidth="6" strokeLinecap="round" />
          <text x="110" y="168" textAnchor="middle" fontSize="12" fontWeight="900" fill="#B91C1C">
            ada celah: belum tertutup
          </text>
        </>
      )}
    </svg>
  );
}

function GambarBangunC({ id }: { id: string }) {
  return (
    <svg viewBox="0 0 220 150" className="mx-auto block h-36 w-full max-w-xs" role="img" aria-label={`Gambar ${cariBangunC(id).nama}`}>
      {id === "segitiga" ? <polygon points="110,20 190,130 30,130" fill="#FEF9C3" stroke={UNGU} strokeWidth="5" strokeLinejoin="round" /> : null}
      {id === "persegi-panjang" ? <rect x="30" y="35" width="160" height="85" fill="#FEF9C3" stroke={UNGU} strokeWidth="5" /> : null}
      {id === "persegi" ? <rect x="55" y="20" width="110" height="110" fill="#FEF9C3" stroke={UNGU} strokeWidth="5" /> : null}
      {id === "segilima" ? <polygon points="110,15 190,70 160,132 60,132 30,70" fill="#FEF9C3" stroke={UNGU} strokeWidth="5" strokeLinejoin="round" /> : null}
      {id === "lingkaran" ? <circle cx="110" cy="75" r="58" fill="#FEF9C3" stroke={UNGU} strokeWidth="5" /> : null}
    </svg>
  );
}

export default function SimulasiLabGarisK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanGaris) => void }) {
  const [x, kirim] = useReducer(langkahGaris, undefined, awalGaris);
  const [lihat, setLihat] = useState<"garis" | "bangun">("garis");

  useEffect(() => {
    onKeadaan?.(keadaanGaris(x));
  }, [onKeadaan, x]);

  const relasi = relasiGaris(x.ab, x.ar, x.g);
  const b = cariBangunC(x.bangun);
  const warnaRelasi = relasi === "tegak-lurus" || relasi === "sejajar" ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]";
  const ucap = lihat === "garis" ? ucapGaris(x) : x.rakit > 0 ? namaRakit(x.rakit) : ucapBangun(x);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Dua Garis</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Putar dan geser garis pada kertas berpetak. Lihat hubungan dua garis, lalu kenali bangun datar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "garis"} onKlik={() => setLihat("garis")}>
          🛤️ Dua Garis
        </Pilihan>
        <Pilihan aktif={lihat === "bangun"} onKlik={() => setLihat("bangun")}>
          ⬜ Bangun
        </Pilihan>
      </div>

      {lihat === "garis" ? (
        <>
          <div className={`${KARTU} space-y-3`}>
            <Kertas x={x} />
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${warnaRelasi}`}>
              🔧 {ceritaRelasi(x)}
            </p>
            {x.tampil.lambang && lambangTeks(relasi) ? <KalimatBesar teks={lambangTeks(relasi)} warna="bg-[#FFF7CC]" /> : null}
            {x.tampil.jarak ? (
              <p className="rounded-xl bg-[#E8F7EE] px-3 py-1.5 text-center text-sm font-black text-[#14532D]">
                {teksJarak(x)}
              </p>
            ) : null}
            {x.pesan ? <p className="text-sm font-bold text-[#7F1D1D]">⛔ {x.pesan}</p> : null}
          </div>
          <div className={`${KARTU} space-y-3`}>
            <div className="space-y-1.5">
              <p className="text-xs font-black uppercase tracking-wide text-[#2563EB]">Garis biru</p>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className={TOMBOL_BIASA} aria-label="Putar garis biru ke kiri 45 derajat" onClick={() => kirim({ t: "PUTAR", garis: "biru", d: -45 })}>
                  ⟲ 45°
                </button>
                <span className="text-sm font-black text-[#1C01A5]">arah {NAMA_ARAH[x.ab]}</span>
                <button type="button" className={TOMBOL_BIASA} aria-label="Putar garis biru ke kanan 45 derajat" onClick={() => kirim({ t: "PUTAR", garis: "biru", d: 45 })}>
                  45° ⟳
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-black uppercase tracking-wide text-[#DC2626]">Garis merah</p>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className={TOMBOL_BIASA} aria-label="Putar garis merah ke kiri 45 derajat" onClick={() => kirim({ t: "PUTAR", garis: "merah", d: -45 })}>
                  ⟲ 45°
                </button>
                <span className="text-sm font-black text-[#1C01A5]">arah {NAMA_ARAH[x.ar]}</span>
                <button type="button" className={TOMBOL_BIASA} aria-label="Putar garis merah ke kanan 45 derajat" onClick={() => kirim({ t: "PUTAR", garis: "merah", d: 45 })}>
                  45° ⟳
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button type="button" className={TOMBOL_BIASA} aria-label="Geser garis merah satu petak ke bawah atau kiri" onClick={() => kirim({ t: "GESER", d: -1 })}>
                  {x.ar === 90 ? "◀ 1 petak" : "▼ 1 petak"}
                </button>
                <span className="text-sm font-black text-[#1C01A5]">geser {x.g > 0 ? `+${x.g}` : x.g}</span>
                <button type="button" className={TOMBOL_BIASA} aria-label="Geser garis merah satu petak ke atas atau kanan" onClick={() => kirim({ t: "GESER", d: 1 })}>
                  {x.ar === 90 ? "1 petak ▶" : "1 petak ▲"}
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan">
              <Cek aktif={x.tampil.lambang} onKlik={() => kirim({ t: "TOGGLE", rep: "lambang" })}>
                Lambang
              </Cek>
              <Cek aktif={x.tampil.jarak} onKlik={() => kirim({ t: "TOGGLE", rep: "jarak" })}>
                Jarak petak
              </Cek>
              <Cek aktif={x.tampil.pojok} onKlik={() => kirim({ t: "TOGGLE", rep: "pojok" })}>
                Pojok kertas
              </Cek>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${KARTU} space-y-3`}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun datar">
              {BANGUN_C.map((o) => (
                <Pilihan key={o.id} aktif={x.bangun === o.id} onKlik={() => kirim({ t: "BANGUN", id: o.id })}>
                  {o.nama}
                </Pilihan>
              ))}
            </div>
            <GambarBangunC id={x.bangun} />
            <p className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">{b.ciri}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ciri yang ditampilkan">
              <Cek aktif={x.tampilB.sisi} onKlik={() => kirim({ t: "TOGGLE_B", rep: "sisi" })}>
                Sisi
              </Cek>
              <Cek aktif={x.tampilB.sudut} onKlik={() => kirim({ t: "TOGGLE_B", rep: "sudut" })}>
                Sudut
              </Cek>
              <Cek aktif={x.tampilB.sama} onKlik={() => kirim({ t: "TOGGLE_B", rep: "sama" })}>
                Sisi sama
              </Cek>
              <Cek aktif={x.tampilB.siku} onKlik={() => kirim({ t: "TOGGLE_B", rep: "siku" })}>
                Siku-siku
              </Cek>
            </div>
            <ul className="space-y-1 text-sm font-bold text-[#1C01A5]">
              {x.tampilB.sisi ? <li>Banyak sisi: {b.sisi === 0 ? "tidak ada sisi lurus (garis lengkung)" : b.sisi}</li> : null}
              {x.tampilB.sudut ? <li>Banyak sudut: {b.sudut === 0 ? "0, lingkaran tidak punya sudut" : b.sudut}</li> : null}
              {x.tampilB.sama ? <li>{b.sama}</li> : null}
              {x.tampilB.siku ? <li>Sudut siku-siku: {b.siku}</li> : null}
            </ul>
          </div>
          <div className={`${KARTU} space-y-3`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Rakit dari batang</p>
            <Rakitan n={x.rakit} />
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={TOMBOL_BIASA} aria-label="Ambil satu batang" onClick={() => kirim({ t: "RAKIT", d: -1 })}>
                – Batang
              </button>
              <span className="text-xl font-black text-[#1C01A5]" aria-live="polite">
                {x.rakit} batang
              </span>
              <button type="button" className={TOMBOL_BIASA} aria-label="Tambah satu batang" onClick={() => kirim({ t: "RAKIT", d: 1 })}>
                + Batang
              </button>
            </div>
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${rakitTertutup(x.rakit) ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
              🔧 {x.pesan || namaRakit(x.rakit)} (paling banyak {MAKS_BATANG} batang)
            </p>
          </div>
        </>
      )}

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("garis");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}

const NAMA_ARAH: Record<ArahGaris, string> = { 0: "mendatar (0°)", 45: "miring kanan (45°)", 90: "tegak (90°)", 135: "miring kiri (135°)" };

function lambangTeks(r: Relasi): string {
  return r === "tegak-lurus" ? "AB ⊥ CD, dibaca AB tegak lurus CD" : r === "sejajar" ? "AB // CD, dibaca AB sejajar CD" : "";
}
