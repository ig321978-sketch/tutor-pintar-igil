"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import {
  BAKSO,
  BATAS_1,
  BATAS_3,
  BELANJA_BERIKUT,
  BELANJA_LAGI,
  BERSAMA,
  IKON_JALUR,
  J1,
  J3,
  JB,
  JUDUL_INFO_1,
  JUDUL_INFO_2,
  KPK_DUA,
  KPK_TIGA,
  PETUNJUK_INFO_1,
  PETUNJUK_INFO_2,
  SELESAI_INFO_1,
  SELESAI_INFO_2,
  SUARA_BERIKUT,
  SUARA_BERSAMA,
  SUARA_JARAK,
  SUARA_KPK,
  SUARA_TIGA,
  TIGA,
  TIK_BAKSO,
  TIK_TIGA,
  TIK_WEDANG,
  WEDANG,
} from "./data-info";
import { xJalur } from "./logika-data";

/**
 * Infografis Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (label kosong): DUA kartu, tiap kartu satu layar tanpa gulir.
 * Kartu 1 = dua jalur lonceng sampai menit ke 36 (wedang Bu Marni tiap 4 menit, bakso Pak Tarno tiap 6 menit; data bersambung dari Story): titik yang berbunyi bersama (12, 24, 36)
 * dan KPK berupa sel kosong "?" yang diketuk. Kartu 2 = jadwal belanja ke pasar induk (jarak antar pertemuan, pertemuan berikutnya) dan tiga jalur lonceng sampai menit ke 60 (KPK tiga bilangan).
 * Komponen sendiri (bukan InfoKartu): gambar jalur digambar sungguh dari kelipatan (titik sebanding dengan waktunya); muat satu layar 344 piksel.
 */
const TEKS = "#1C01A5";
const MERAH = "#DC2626";
const HIJAU = "#15803D";
const COKLAT = "#7C2D12";

function Gelembung({ x, y, buka, isi, label, onKlik }: { x: number; y: number; buka: boolean; isi: string; label: string; onKlik: () => void }) {
  const lebar = Math.max(28, (buka ? isi.length : 1) * 7 + 14);
  return (
    <g role="button" tabIndex={0} aria-label={buka ? `${label}: ${isi}` : `Label kosong ${label}`} onClick={onKlik} onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? onKlik() : undefined)} style={{ cursor: "pointer" }} data-gelembung={label}>
      <rect x={x - lebar / 2} y={y - 10} width={lebar} height={20} rx={6} fill={buka ? "#DCFCE7" : "#FFFFFF"} stroke={buka ? HIJAU : "#B45309"} strokeWidth={1.6} strokeDasharray={buka ? undefined : "3 2"} />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={11.5} fontWeight={900} fill={buka ? "#14532D" : "#B45309"}>
        {buka ? isi : "?"}
      </text>
    </g>
  );
}

export default function InfoJadwalK5B2({ speakGuru, onLanjut, teksLanjut }: { speakGuru: (t: string) => void; onLanjut: () => void; teksLanjut: string }) {
  const [kartu, setKartu] = useState<1 | 2>(1);
  const [bukaB, setBukaB] = useState<number[]>([]);
  const [bukaKpk, setBukaKpk] = useState(false);
  const [bukaJarak, setBukaJarak] = useState(false);
  const [bukaBerikut, setBukaBerikut] = useState(false);
  const [bukaTiga, setBukaTiga] = useState(false);
  const selesai1 = bukaB.length === BERSAMA.length && bukaKpk;
  const selesai2 = bukaJarak && bukaBerikut && bukaTiga;

  const ketukB = (n: number) => {
    speakGuru(SUARA_BERSAMA[n]);
    if (!bukaB.includes(n)) setBukaB((b) => [...b, n]);
  };
  const ketukKpk = () => {
    speakGuru(SUARA_KPK);
    setBukaKpk(true);
  };
  const petunjuk = kartu === 1 ? PETUNJUK_INFO_1 : PETUNJUK_INFO_2;
  const status =
    kartu === 1 ? (selesai1 ? SELESAI_INFO_1 : `Sudah dibuka ${bukaB.length + (bukaKpk ? 1 : 0)} dari ${BERSAMA.length + 1} sel.`) : selesai2 ? SELESAI_INFO_2 : `Sudah dibuka ${[bukaJarak, bukaBerikut, bukaTiga].filter(Boolean).length} dari 3 sel.`;

  const yA = 52;
  const yB = 116;
  const yBel = 64;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(petunjuk)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">{petunjuk}</p>
      </div>

      {kartu === 1 ? (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#B91C1C] bg-[#FFF1F2] p-2 shadow-[0_5px_0_rgba(127,29,29,0.3)]" data-uji="jalur-dua">
          <p className="mb-1 rounded-lg bg-[#B91C1C] py-1 text-center text-sm font-black text-[#FEE2E2]">
            {IKON_JALUR} {JUDUL_INFO_1}
          </p>
          <svg viewBox="0 0 280 166" className="mx-auto w-full max-w-[320px]" role="img" aria-label={`dua jalur lonceng sampai menit ke ${BATAS_1}: wedang tiap ${WEDANG} menit dan bakso tiap ${BAKSO} menit`} data-batas={BATAS_1}>
            <rect x={2} y={2} width={276} height={162} rx={10} fill="#FFFFFF" stroke="#B45309" strokeWidth={1.2} strokeDasharray="5 3" opacity={0.9} />
            <text x={140} y={16} textAnchor="middle" fontSize={11} fontWeight={900} fill={TEKS}>
              Wedang Bu Marni: tiap {WEDANG} menit
            </text>
            <line x1={J1.x0 - 8} y1={yA} x2={J1.x1 + 8} y2={yA} stroke="#EA580C" strokeWidth={2.4} />
            {BERSAMA.map((n) => (
              <line key={`cn${n}`} x1={xJalur(J1, n)} y1={yA + 12} x2={xJalur(J1, n)} y2={yB - 12} stroke={bukaB.includes(n) ? HIJAU : MERAH} strokeWidth={1.6} strokeDasharray="3 3" data-bersama={n} />
            ))}
            {TIK_WEDANG.map((t) => (
              <g key={`a${t}`} data-tik-a={t}>
                <line x1={xJalur(J1, t)} y1={yA - 5} x2={xJalur(J1, t)} y2={yA + 5} stroke="#EA580C" strokeWidth={2} />
                {BERSAMA.includes(t) ? null : (
                  <text x={xJalur(J1, t)} y={yA - 10} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={COKLAT}>
                    {t}
                  </text>
                )}
              </g>
            ))}
            {BERSAMA.map((n) => (
              <Gelembung key={`ga${n}`} x={xJalur(J1, n)} y={yA - 17} buka={bukaB.includes(n)} isi={String(n)} label={`titik bersama ${n} di jalur wedang`} onKlik={() => ketukB(n)} />
            ))}
            <line x1={J1.x0 - 8} y1={yB} x2={J1.x1 + 8} y2={yB} stroke="#0D9488" strokeWidth={2.4} />
            {TIK_BAKSO.map((t) => (
              <g key={`b${t}`} data-tik-b={t}>
                <line x1={xJalur(J1, t)} y1={yB - 5} x2={xJalur(J1, t)} y2={yB + 5} stroke="#0D9488" strokeWidth={2} />
                {BERSAMA.includes(t) ? null : (
                  <text x={xJalur(J1, t)} y={yB + 19} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={COKLAT}>
                    {t}
                  </text>
                )}
              </g>
            ))}
            {BERSAMA.map((n) => (
              <Gelembung key={`gb${n}`} x={xJalur(J1, n)} y={yB + 17} buka={bukaB.includes(n)} isi={String(n)} label={`titik bersama ${n} di jalur bakso`} onKlik={() => ketukB(n)} />
            ))}
            <text x={140} y={158} textAnchor="middle" fontSize={11} fontWeight={900} fill={TEKS}>
              Bakso Pak Tarno: tiap {BAKSO} menit
            </text>
          </svg>
          <div className="mt-1 flex justify-center">
            <button
              type="button"
              onClick={ketukKpk}
              aria-label={bukaKpk ? `KPK ${WEDANG} dan ${BAKSO}: ${KPK_DUA}` : `Sel kosong KPK ${WEDANG} dan ${BAKSO}`}
              className={`min-h-[48px] w-full rounded-xl border-[3px] px-2 py-1 text-sm font-black ${bukaKpk ? "lm-muncul border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#B45309] bg-white text-[#1C01A5]"}`}
            >
              KPK {WEDANG} dan {BAKSO} = <span className="text-[#B45309]">{bukaKpk ? KPK_DUA : "?"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[5px] border-[#B91C1C] bg-[#FFF1F2] p-2 shadow-[0_5px_0_rgba(127,29,29,0.3)]" data-uji="belanja-tiga">
          <p className="mb-1 rounded-lg bg-[#B91C1C] py-1 text-center text-sm font-black text-[#FEE2E2]">
            {"\u{1F4C5}"} {JUDUL_INFO_2}
          </p>
          <svg viewBox="0 0 280 218" className="mx-auto w-full max-w-[320px]" role="img" aria-label={`jadwal belanja tiap ${WEDANG} dan ${BAKSO} hari, dan tiga jalur lonceng tiap ${TIGA.join(", ")} menit sampai menit ke ${BATAS_3}`} data-batas={BATAS_3}>
            <rect x={2} y={2} width={276} height={214} rx={10} fill="#FFFFFF" stroke="#B45309" strokeWidth={1.2} strokeDasharray="5 3" opacity={0.9} />
            <text x={140} y={16} textAnchor="middle" fontSize={11} fontWeight={900} fill={TEKS}>
              Belanja ke pasar induk
            </text>
            <text x={140} y={30} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={COKLAT}>
              Bu Marni tiap {WEDANG} hari, Pak Tarno tiap {BAKSO} hari
            </text>
            <line x1={JB.x0 - 6} y1={yBel} x2={JB.x1 + 6} y2={yBel} stroke={COKLAT} strokeWidth={2.2} />
            <circle cx={xJalur(JB, 0)} cy={yBel} r={5} fill="#EA580C" stroke="#7C2D12" strokeWidth={1.2} />
            <text x={xJalur(JB, 0) + 8} y={yBel - 11} textAnchor="start" fontSize={10.5} fontWeight={800} fill={COKLAT}>
              hari 0
            </text>
            <circle cx={xJalur(JB, BELANJA_LAGI)} cy={yBel} r={4.5} fill={MERAH} stroke="#7F1D1D" strokeWidth={1.2} />
            <circle cx={xJalur(JB, BELANJA_BERIKUT)} cy={yBel} r={4.5} fill={MERAH} stroke="#7F1D1D" strokeWidth={1.2} />
            <Gelembung x={xJalur(JB, BELANJA_LAGI)} y={yBel - 20} buka={bukaJarak} isi={String(BELANJA_LAGI)} label="hari bertemu lagi" onKlik={() => { speakGuru(SUARA_JARAK); setBukaJarak(true); }} />
            <Gelembung x={xJalur(JB, BELANJA_BERIKUT)} y={yBel - 20} buka={bukaBerikut} isi={String(BELANJA_BERIKUT)} label="hari pertemuan berikutnya" onKlik={() => { speakGuru(SUARA_BERIKUT); setBukaBerikut(true); }} />
            <path d={`M${xJalur(JB, 0)} ${yBel + 14} v6 h${xJalur(JB, BELANJA_LAGI) - xJalur(JB, 0)} v-6`} fill="none" stroke={COKLAT} strokeWidth={1.6} />
            <Gelembung x={(xJalur(JB, 0) + xJalur(JB, BELANJA_LAGI)) / 2} y={yBel + 38} buka={bukaJarak} isi={`${BELANJA_LAGI} hari`} label="jarak antar pertemuan" onKlik={() => { speakGuru(SUARA_JARAK); setBukaJarak(true); }} />
            <text x={140} y={126} textAnchor="middle" fontSize={11} fontWeight={900} fill={TEKS}>
              Tiga lonceng: tiap {TIGA[0]}, {TIGA[1]}, dan {TIGA[2]} menit
            </text>
            {TIGA.map((a, i) => {
              const y = 146 + i * 18;
              return (
                <g key={`l${a}`} data-jalur-tiga={a}>
                  <text x={10} y={y + 4} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={TEKS}>
                    {a}
                  </text>
                  <line x1={J3.x0 - 6} y1={y} x2={J3.x1 + 6} y2={y} stroke={["#EA580C", "#CA8A04", "#0D9488"][i]} strokeWidth={2.2} />
                  {TIK_TIGA[i].map((t) => (
                    <line key={t} x1={xJalur(J3, t)} y1={y - 5} x2={xJalur(J3, t)} y2={y + 5} stroke={["#EA580C", "#CA8A04", "#0D9488"][i]} strokeWidth={t === KPK_TIGA ? 3 : 1.8} />
                  ))}
                </g>
              );
            })}
            <line x1={xJalur(J3, KPK_TIGA)} y1={136} x2={xJalur(J3, KPK_TIGA)} y2={185} stroke={bukaTiga ? HIJAU : MERAH} strokeWidth={1.6} strokeDasharray="3 3" data-bersama-tiga={KPK_TIGA} />
            <Gelembung x={xJalur(J3, KPK_TIGA) - 8} y={198} buka={bukaTiga} isi={String(KPK_TIGA)} label="titik bersama tiga lonceng" onKlik={() => { speakGuru(SUARA_TIGA); setBukaTiga(true); }} />
            <text x={30} y={202} textAnchor="start" fontSize={10.5} fontWeight={700} fill={COKLAT}>
              garis putus: berbunyi bersama
            </text>
          </svg>
        </div>
      )}

      <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-sm font-black text-[#1C01A5]">
        {status}
      </p>
      <div className="flex items-center justify-center gap-2">
        {kartu === 2 ? (
          <button type="button" onClick={() => setKartu(1)} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-white px-4 text-sm font-black text-[#1C01A5]" aria-label="Kembali ke dua jalur lonceng">
            {"⬅️"} Kembali
          </button>
        ) : null}
        {kartu === 1 && selesai1 ? (
          <button type="button" onClick={() => setKartu(2)} className={TOMBOL_UTAMA}>
            BERIKUTNYA {"➡️"}
          </button>
        ) : null}
        {kartu === 2 && selesai2 ? (
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        ) : null}
      </div>
      <p className="text-center text-[11px] font-black text-[#6B7280]" aria-label={`Kartu ${kartu} dari 2`}>
        {kartu === 1 ? "● ○" : "○ ●"} Kartu {kartu} dari 2
      </p>
    </div>
  );
}

export { InfoJadwalK5B2 };
