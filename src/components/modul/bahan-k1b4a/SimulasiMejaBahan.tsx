"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  BANYAK_SUDUT,
  LABEL_COCOK,
  NAMA_BENTUK,
  URUT_LABEL,
  awalBahan,
  beriLabel,
  bisaGelinding,
  gelindingkan,
  kalimatBahan,
  kata,
  labelTepat,
  pilihBahan,
  putarBahan,
  tampilSisi,
  tampilSudut,
  ubahSkala,
  type KeadaanBahan,
  type LabelBahan,
} from "./logika";
import { BAHAN_SIM, EMOJI, WARNA_BENDA } from "./data";
import { jalurPoligon, jariLengkung, sudutBenda, tengahSisi } from "./periksa";

/**
 * Simulasi Kelas 1 Bab 4 Sub-Bab A: Misi Festival bagian satu, meja periksa bahan. Eksplorasi bebas tanpa skor: pilih bahan bekas,
 * putar, besarkan atau kecilkan, tampilkan sisi lurus dan sudut (bernomor), coba gelindingkan, lalu beri label roda, atap, atau badan.
 * Banyak sisi dan sudut tetap walau bahan diputar atau diubah ukurannya. Bahan berbeda dari Story.
 */
const IKON_LABEL: Record<LabelBahan, string> = { roda: "\u{1F697}", atap: "\u{1F3E0}", badan: "\u{1F4E6}" };

export default function SimulasiMejaBahan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBahan) => void }) {
  const [k, setK] = useState<KeadaanBahan>(() => awalBahan(BAHAN_SIM));
  const [gulir, setGulir] = useState(0);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const b = BAHAN_SIM.find((x) => x.id === k.pilih) ?? BAHAN_SIM[0];
  const benda = { ...b.benda, putar: k.putar[b.id], skala: k.skala[b.id] };
  const r = 22 + k.skala[b.id] * 14;
  const cx = 150;
  const cy = 92;
  const sudut = sudutBenda(benda, cx, cy, r);
  const sisi = tengahSisi(sudut);
  const [isi, garis] = WARNA_BENDA[b.benda.jenis] ?? ["#E0E7FF", "#1C01A5"];
  const n = BANYAK_SUDUT[b.benda.bentuk];

  const ubah = (baru: KeadaanBahan, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const coba = () => {
    ubah(gelindingkan(k), bisaGelinding(b.benda.bentuk) ? "Menggelinding! Tepinya lengkung, tanpa sudut." : "Tidak bisa menggelinding. Sudutnya membuat bahan ini berhenti.");
    setGulir((g) => g + 1);
  };
  const label = (l: LabelBahan) => {
    const pas = LABEL_COCOK[b.benda.bentuk] === l;
    ubah(beriLabel(k, l), pas ? `Label ${l} untuk ${b.nama}.` : l === "roda" ? "Roda harus bisa menggelinding. Bahan ini punya sudut." : l === "atap" ? "Atap memakai bentuk segitiga. Hitung sudutnya dulu." : "Badan memakai bentuk segi empat. Hitung sudutnya dulu.");
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5]";
  return (
    <div className="space-y-3">
      <style>{`${CSS_LEMARI}
@keyframes mb-gelinding{0%{transform:translateX(0) rotate(0)}50%{transform:translateX(70px) rotate(240deg)}100%{transform:translateX(0) rotate(0)}}
@keyframes mb-goyah{0%,100%{transform:rotate(0)}30%{transform:rotate(-6deg)}60%{transform:rotate(5deg)}}`}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Meja periksa bahan. Pilih bahan, putar atau ubah ukurannya, tampilkan sisi dan sudut, coba gelindingkan, lalu beri label.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bahan">
        {BAHAN_SIM.map((x) => (
          <button key={x.id} type="button" aria-pressed={k.pilih === x.id} onClick={() => ubah(pilihBahan(k, x.id), kalimatBahan(pilihBahan(k, x.id), BAHAN_SIM))} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.pilih === x.id ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`}>
            {EMOJI[x.benda.jenis]} {x.nama}
            {k.label[x.id] ? ` · ${IKON_LABEL[k.label[x.id] as LabelBahan]}` : ""}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#78350F] p-2" style={{ background: "#E7C9A0", backgroundImage: "repeating-linear-gradient(0deg,rgba(120,53,15,0.15) 0 2px,transparent 2px 18px)" }}>
        <svg viewBox="0 0 300 184" className="mx-auto block w-full max-w-[420px] rounded-xl bg-[#FFFBEB]" aria-label={`Meja: ${b.nama}`}>
          <line x1={10} y1={176} x2={290} y2={176} stroke="#78350F" strokeWidth={4} />
          <g key={gulir} style={gulir ? { transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box", animation: `${bisaGelinding(b.benda.bentuk) ? "mb-gelinding 1.4s" : "mb-goyah 0.6s"} ease-in-out` } : undefined}>
            {b.benda.bentuk === "lengkung" ? (
              (() => {
                const j = jariLengkung(benda, r);
                return <ellipse cx={cx} cy={cy} rx={j.rx} ry={j.ry} transform={`rotate(${benda.putar ?? 0} ${cx} ${cy})`} fill={isi} stroke={k.sisi ? "#16A34A" : garis} strokeWidth={4} />;
              })()
            ) : (
              <path d={jalurPoligon(sudut)} fill={isi} stroke={garis} strokeWidth={3} strokeLinejoin="round" />
            )}
            <text x={cx} y={cy + 8} textAnchor="middle" fontSize={20}>
              {EMOJI[b.benda.jenis]}
            </text>
            {k.sisi
              ? sudut.map((p, i) => {
                  const q = sudut[(i + 1) % sudut.length];
                  return <line key={`s${i}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#16A34A" strokeWidth={5} strokeLinecap="round" opacity={0.85} />;
                })
              : null}
            {k.sisi
              ? sisi.map((p, i) => (
                  <g key={`ns${i}`}>
                    <rect x={p.x - 8} y={p.y - 8} width={16} height={16} rx={4} fill="#16A34A" />
                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={10} fontWeight={900} fill="#FFFFFF">
                      {i + 1}
                    </text>
                  </g>
                ))
              : null}
            {k.sudut
              ? sudut.map((p, i) => (
                  <g key={`nd${i}`}>
                    <circle cx={p.x} cy={p.y} r={8} fill="#DC2626" stroke="#FFFFFF" strokeWidth={1.5} />
                    <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize={9} fontWeight={900} fill="#FFFFFF">
                      {i + 1}
                    </text>
                  </g>
                ))
              : null}
          </g>
        </svg>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button type="button" className={tombol} onClick={() => ubah(putarBahan(k), `Diputar. ${n === 0 ? "Tetap tanpa sudut." : `Sudutnya tetap ${kata(n)}.`}`)}>
            {"\u{1F504}"} Putar
          </button>
          <button type="button" className={tombol} onClick={() => ubah(ubahSkala(k, 1), k.skala[b.id] === 3 ? "Sudah paling besar." : "Lebih besar. Bentuknya tetap sama.")}>
            {"\u{2795}"} Besar
          </button>
          <button type="button" className={tombol} onClick={() => ubah(ubahSkala(k, -1), k.skala[b.id] === 1 ? "Sudah paling kecil." : "Lebih kecil. Bentuknya tetap sama.")}>
            {"\u{2796}"} Kecil
          </button>
          <button type="button" aria-pressed={k.sisi} className={`${tombol} ${k.sisi ? "!bg-[#DCFCE7]" : ""}`} onClick={() => ubah(tampilSisi(k), k.sisi ? undefined : n === 0 ? "Tidak ada sisi lurus. Tepinya melengkung." : `Sisi lurusnya ${kata(n)}.`)}>
            {"\u{1F4CF}"} Sisi lurus
          </button>
          <button type="button" aria-pressed={k.sudut} className={`${tombol} ${k.sudut ? "!bg-[#FEE2E2]" : ""}`} onClick={() => ubah(tampilSudut(k), k.sudut ? undefined : n === 0 ? "Tidak ada sudut." : `Sudutnya ${kata(n)}.`)}>
            {"\u{1F53B}"} Sudut
          </button>
          <button type="button" className={tombol} onClick={coba}>
            {"\u{1F3B3}"} Gelindingkan
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center">
        <p className="text-sm font-black text-[#1C01A5]">
          {b.nama}: {NAMA_BENTUK[b.benda.bentuk]} · sisi lurus {n} · sudut {n} · {bisaGelinding(b.benda.bentuk) ? "menggelinding" : "tidak menggelinding"}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5" role="group" aria-label="Beri label">
          {URUT_LABEL.map((l) => (
            <button key={l} type="button" aria-pressed={k.label[b.id] === l} onClick={() => label(l)} className={`min-h-[44px] rounded-xl border-4 px-3 text-sm font-black ${k.label[b.id] === l ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#B45309] bg-[#FFFBEB] text-[#78350F]"}`}>
              {IKON_LABEL[l]} {l}
            </button>
          ))}
        </div>
        <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">Label tepat: {labelTepat(k, BAHAN_SIM)} dari {BAHAN_SIM.length}</p>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatBahan(k, BAHAN_SIM)}
      </p>
    </div>
  );
}
