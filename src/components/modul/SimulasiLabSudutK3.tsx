"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import { ejaK3B4 } from "./eja-k3b4";
import {
  IRISAN,
  SUDUT_SATUAN,
  awalSudut,
  bacaBusur,
  bandingSiku,
  banyakIrisan,
  jenisSudut,
  keadaanSudut,
  langkahSudut,
  pasanganSudut,
  ucapSatuan,
  ucapSudut,
  type Irisan,
  type KeadaanSudut,
  type LangkahSudut,
} from "./lab-sudut-k3b4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B4 Sub-Bab B): Lab Sudut. Satu alat, tiga tampilan.              */
/*  Strip  : putar kaki OB, bandingkan dengan pojok kertas lipat (90°).          */
/*  Busur  : baca derajat, jenis sudut, dan pasangan 360° untuk sudut refleks.   */
/*  Satuan : sudut yang sama diukur dengan irisan besar dan irisan kecil.        */
/* Logika: lab-sudut-k3b4.ts. Gambar hanya kaki, busur, dan angka.               */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const CATATAN = [
  "Putar kaki OB sampai tepat 90°, lalu nyalakan Pojok kertas. Apa yang kamu lihat?",
  "Nyalakan Busur derajat dan buat sudut 50°. Skala mana yang kamu baca?",
  "Putar sampai 300°. Mengapa busur derajat membaca 60°?",
  "Di Satuan, ukur 90° dengan irisan besar dan irisan kecil. Mengapa bilangannya berbeda?",
];
const LANGKAH: LangkahSudut[] = [-45, -10, -1, 1, 10, 45];
const NAMA_JENIS: Record<string, string> = { berimpit: "kaki berimpit", lancip: "lancip", "siku-siku": "siku-siku", tumpul: "tumpul", lurus: "lurus", refleks: "refleks", penuh: "putaran penuh" };

const rad = (d: number) => (d * Math.PI) / 180;
const pt = (cx: number, cy: number, r: number, d: number): [number, number] => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];

/** Juring dari sudut 0° ke `d` derajat (berlawanan arah jarum jam), jari-jari r. */
function juring(cx: number, cy: number, r: number, dari: number, ke: number): string {
  if (ke - dari <= 0) return "";
  if (ke - dari >= 360) return `M ${cx} ${cy} m ${r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0 a ${r} ${r} 0 1 0 ${2 * r} 0`;
  const [x1, y1] = pt(cx, cy, r, dari);
  const [x2, y2] = pt(cx, cy, r, ke);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${ke - dari > 180 ? 1 : 0} 0 ${x2} ${y2} Z`;
}

function GambarSudut({ sudut, pojok, busur }: { sudut: number; pojok: boolean; busur: boolean }) {
  const cx = 130;
  const cy = 105;
  const R = 86;
  const [bx, by] = pt(cx, cy, R, sudut);
  const [px, py] = pt(cx, cy, R, 90);
  return (
    <svg viewBox="0 0 260 210" className="mx-auto block h-56 w-full max-w-sm" role="img" aria-label={`Sudut AOB ${sudut} derajat`}>
      {busur ? (
        <g>
          <path d={`M ${cx - 74} ${cy} A 74 74 0 0 1 ${cx + 74} ${cy}`} fill="#FEF9C3" stroke="#B45309" strokeWidth="2" />
          {Array.from({ length: 19 }, (_, i) => i * 10).map((d) => {
            const [x1, y1] = pt(cx, cy, d % 30 === 0 ? 62 : 68, d);
            const [x2, y2] = pt(cx, cy, 74, d);
            const [tx, ty] = pt(cx, cy, 54, d);
            return (
              <g key={d}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#B45309" strokeWidth={d % 30 === 0 ? 2 : 1} />
                {d % 30 === 0 ? (
                  <text x={tx} y={ty + 3} textAnchor="middle" fontSize="8" fontWeight="900" fill="#7C2D12">
                    {d}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      ) : null}
      <path d={juring(cx, cy, 30, 0, sudut)} fill="#FDE68A" fillOpacity="0.8" stroke="#B45309" strokeWidth="1.5" />
      {pojok ? (
        <g>
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#16A34A" strokeWidth="3" strokeDasharray="5 4" />
          <path d={`M ${cx + 16} ${cy} L ${cx + 16} ${cy - 16} L ${cx} ${cy - 16}`} fill="none" stroke="#16A34A" strokeWidth="2.5" />
        </g>
      ) : null}
      <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={UNGU} strokeWidth="5" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={bx} y2={by} stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="6" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
      <text x={cx - 12} y={cy + 18} fontSize="13" fontWeight="900" fill={UNGU}>
        O
      </text>
      <text x={cx + R + 4} y={cy + 4} fontSize="13" fontWeight="900" fill={UNGU}>
        A
      </text>
      <text x={bx + (bx - cx) * 0.08 + 2} y={by + (by - cy) * 0.08 + 4} fontSize="13" fontWeight="900" fill="#DC2626">
        B
      </text>
    </svg>
  );
}

function GambarSatuan({ sudut, irisan }: { sudut: number; irisan: Irisan }) {
  const cx = 130;
  const cy = 105;
  const u = IRISAN[irisan];
  const n = sudut / u;
  const warna = ["#FDE68A", "#FCA5A5", "#BFDBFE", "#BBF7D0"];
  return (
    <svg viewBox="0 0 260 150" className="mx-auto block h-40 w-full max-w-sm" role="img" aria-label={`Sudut ${sudut} derajat ditutup ${n} irisan ${irisan}`}>
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={juring(cx, cy, 92, i * u, (i + 1) * u)} fill={warna[i % 4]} stroke={UNGU} strokeWidth="2" />
      ))}
      <line x1={cx} y1={cy} x2={cx + 100} y2={cy} stroke={UNGU} strokeWidth="4" />
      <circle cx={cx} cy={cy} r="5" fill="#FFE566" stroke={UNGU} strokeWidth="2.5" />
    </svg>
  );
}

export default function SimulasiLabSudutK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSudut) => void }) {
  const [x, kirim] = useReducer(langkahSudut, undefined, awalSudut);
  const [lihat, setLihat] = useState<"strip" | "busur" | "satuan">("strip");

  useEffect(() => {
    onKeadaan?.(keadaanSudut(x));
  }, [onKeadaan, x]);

  const jenis = jenisSudut(x.sudut);
  const baca = bacaBusur(x.sudut);
  const ucap = lihat === "satuan" ? ucapSatuan(x) : ucapSudut(x);
  const tombolSudut = (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Putar kaki OB">
      <span className="mr-1 text-sm font-black text-[#1C01A5]">Putar OB:</span>
      {LANGKAH.map((d) => (
        <button key={d} type="button" aria-label={`${d > 0 ? "Tambah" : "Kurangi"} ${Math.abs(d)} derajat`} onClick={() => kirim({ t: "PUTAR", d })} className={`h-9 rounded-full border-4 border-[#1C01A5] px-2 text-sm font-black text-[#1C01A5] ${d > 0 ? "bg-[#FFE566]" : "bg-white"}`}>
          {d > 0 ? `+${d}°` : `−${Math.abs(d)}°`}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Sudut</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Putar kaki OB untuk membentuk sudut AOB. Bandingkan, ukur, dan kenali jenisnya.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "strip"} onKlik={() => setLihat("strip")}>
          📎 Strip
        </Pilihan>
        <Pilihan aktif={lihat === "busur"} onKlik={() => setLihat("busur")}>
          🧭 Busur
        </Pilihan>
        <Pilihan aktif={lihat === "satuan"} onKlik={() => setLihat("satuan")}>
          🍕 Satuan
        </Pilihan>
      </div>

      {lihat !== "satuan" ? (
        <>
          <div className={`${KARTU} space-y-3`}>
            <GambarSudut sudut={x.sudut} pojok={x.tampil.pojok} busur={lihat === "busur" && x.tampil.busur} />
            <p className="text-center text-2xl font-black text-[#1C01A5]" aria-live="polite">
              ∠AOB = {x.sudut}°
            </p>
            {tombolSudut}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan sudut">
              {lihat === "strip" ? (
                <Cek aktif={x.tampil.pojok} onKlik={() => kirim({ t: "TOGGLE", rep: "pojok" })}>
                  Pojok kertas
                </Cek>
              ) : (
                <>
                  <Cek aktif={x.tampil.busur} onKlik={() => kirim({ t: "TOGGLE", rep: "busur" })}>
                    Busur derajat
                  </Cek>
                  <Cek aktif={x.tampil.pasangan} onKlik={() => kirim({ t: "TOGGLE", rep: "pasangan" })}>
                    Pasangan
                  </Cek>
                </>
              )}
              <Cek aktif={x.tampil.jenis} onKlik={() => kirim({ t: "TOGGLE", rep: "jenis" })}>
                Jenis sudut
              </Cek>
            </div>
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${x.pesan ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
              {x.pesan ? `⛔ ${x.pesan}` : `🔧 Dibandingkan pojok kertas lipat (90°), sudut ini ${bandingSiku(x.sudut)}.`}
            </p>
          </div>
          {x.tampil.jenis ? <KalimatBesar teks={`Sudut ${x.sudut}° adalah ${NAMA_JENIS[jenis]}`} warna="bg-[#FFF7CC]" /> : null}
          {x.tampil.pojok && lihat === "strip" && x.sudut === 180 ? <KalimatBesar teks="180° = 90° + 90°: dua sudut siku-siku" warna="bg-[#E8F7EE]" /> : null}
          {x.tampil.busur && lihat === "busur" ? (
            <KalimatBesar teks={baca.langsung ? `Busur membaca ${baca.baca}°` : `Busur hanya sampai 180°. Baca pasangan ${baca.baca}°`} warna="bg-[#E8F7EE]" />
          ) : null}
          {x.tampil.pasangan ? <KalimatBesar teks={`${x.sudut}° + ${pasanganSudut(x.sudut)}° = 360°`} warna="bg-[#EDE9FE]" /> : null}
        </>
      ) : (
        <div className={`${KARTU} space-y-3`}>
          <GambarSatuan sudut={x.sudutS} irisan={x.irisan} />
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Atur sudut dan irisan">
            <button type="button" aria-label="Kurangi sudut 30 derajat" onClick={() => kirim({ t: "SUDUT_S", d: -1 })} className={TOMBOL_BIASA}>
              ◀ 30°
            </button>
            <span className="text-xl font-black text-[#1C01A5]">Sudut {x.sudutS}°</span>
            <button type="button" aria-label="Tambah sudut 30 derajat" onClick={() => kirim({ t: "SUDUT_S", d: 1 })} className={TOMBOL_BIASA}>
              30° ▶
            </button>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih irisan">
            <Pilihan aktif={x.irisan === "besar"} onKlik={() => kirim({ t: "IRISAN", irisan: "besar" })}>
              🍕 Irisan besar (30°)
            </Pilihan>
            <Pilihan aktif={x.irisan === "kecil"} onKlik={() => kirim({ t: "IRISAN", irisan: "kecil" })}>
              🥧 Irisan kecil (15°)
            </Pilihan>
          </div>
          <KalimatBesar teks={`${x.sudutS}° = ${banyakIrisan(x.sudutS, x.irisan)} irisan ${x.irisan}`} warna="bg-[#FFF7CC]" />
          <p className="text-sm font-bold text-[#1C01A5]">
            Dengan irisan besar: {banyakIrisan(x.sudutS, "besar")} satuan. Dengan irisan kecil: {banyakIrisan(x.sudutS, "kecil")} satuan. Sudut yang sama menjadi bilangan berbeda, jadi perlu satuan baku: derajat.
          </p>
          <p className="text-xs font-bold text-[#1C01A5]/70">Sudut untuk irisan: {SUDUT_SATUAN.join("°, ")}°.</p>
        </div>
      )}

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("strip");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
