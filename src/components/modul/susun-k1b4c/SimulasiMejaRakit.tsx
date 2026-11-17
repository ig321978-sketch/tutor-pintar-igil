"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_BENTUK,
  URUT_KALIMAT,
  awalSusun,
  banyakBentuk,
  bawaPanggung,
  jawabJuri,
  juriBenar,
  kalimatKurang,
  kalimatSusun,
  kalimatTambah,
  kata,
  lengkap,
  lepasBagian,
  lepasJenis,
  pasangBagian,
  pasangJenis,
  pilihMainan,
  terpasangJenis,
  type Bentuk,
  type KeadaanSusun,
} from "./logika";
import { EMOJI, MAINAN_SIM, WARNA_BENDA } from "./data";
import { pusatBagian, titikBagian } from "./periksa";

/**
 * Simulasi Kelas 1 Bab 4 Sub-Bab C: Misi Festival bagian satu, meja rakit mainan (sekaligus penutup bab). Eksplorasi bebas tanpa skor:
 * pilih mainan, ketuk bayangan untuk memasang bagian (menyusun) atau ketuk bagian untuk melepasnya (mengurai), pasang atau lepas
 * satu jenis sekaligus, baca kalimat tambah dan kalimat kurang, lalu bawa semua mainan ke panggung dan jawab pertanyaan juri.
 * Mainan berbeda dari Story (robot, mobil hias, pesawat).
 */
const UNGU = "#1C01A5";
const jalur = (pts: readonly { x: number; y: number }[]) => `M ${pts.map((p) => `${p.x} ${p.y}`).join(" L ")} Z`;

export default function SimulasiMejaRakit({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSusun) => void }) {
  const [k, setK] = useState<KeadaanSusun>(() => awalSusun(MAINAN_SIM));
  const [kurang, setKurang] = useState<Bentuk | null>(null);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const m = MAINAN_SIM.find((x) => x.id === k.pilih) ?? MAINAN_SIM[0];
  const terpasang = k.pasang[m.id];

  const ubah = (baru: KeadaanSusun, ucap?: string) => {
    const kejadian = baru.catat.length > k.catat.length ? baru.catat[baru.catat.length - 1] : null;
    const jenisKurang = kejadian && kejadian.startsWith(`${m.id}:kurang:`) ? (kejadian.split(":")[2] as Bentuk) : null;
    setKurang(baru.pilih !== k.pilih ? null : jenisKurang ?? (baru.pasang[m.id].length > k.pasang[m.id].length ? null : kurang));
    setK(baru);
    if (jenisKurang) speakGuru(kalimatKurang(m, jenisKurang));
    else if (kejadian === `${m.id}:kosong`) speakGuru(`${m.nama.charAt(0).toUpperCase() + m.nama.slice(1)} terurai semua. Tidak ada bagian yang tersisa.`);
    else if (ucap) speakGuru(ucap);
  };
  const ketukBagian = (i: number) => {
    if (k.panggung) return;
    const pasang = !terpasang.includes(i);
    const baru = pasang ? pasangBagian(k, MAINAN_SIM, i) : lepasBagian(k, MAINAN_SIM, i);
    ubah(baru, kalimatSusun(baru, MAINAN_SIM));
  };
  const semuaLengkap = MAINAN_SIM.every((x) => lengkap(k, x));
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-35";

  if (k.panggung)
    return (
      <div className="space-y-3">
        <style>{CSS_LEMARI}</style>
        <div className="rounded-2xl border-4 border-[#FACC15] bg-[#7F1D1D] p-3 text-center">
          <p className="text-lg font-black text-[#FEF08A]">{"\u{1F3AA}"} Panggung festival</p>
          <p className="text-sm font-bold text-white">Juri bertanya: mainan ini tersusun dari berapa bagian?</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {MAINAN_SIM.map((x) => {
            const n = x.bagian.length;
            const jawab = k.juri[x.id];
            const tepat = jawab === n;
            return (
              <div key={x.id} className={`rounded-2xl border-4 p-2 text-center ${tepat ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"}`}>
                <p className="text-sm font-black text-[#1C01A5]">{x.nama}</p>
                <p className="text-xs font-bold text-[#1C01A5]/80">{URUT_KALIMAT.filter((b) => banyakBentuk(x.bagian, b) > 0).map((b) => `${banyakBentuk(x.bagian, b)} ${NAMA_BENTUK[b]}`).join(", ")}</p>
                <div className="mt-1 flex justify-center gap-1.5" role="group" aria-label={`Jawab juri untuk ${x.nama}`}>
                  {[n - 1, n, n + 1].map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={jawab === v}
                      onClick={() => {
                        const baru = jawabJuri(k, x.id, v);
                        ubah(baru, v === n ? (juriBenar(baru, MAINAN_SIM) ? "Juri tersenyum dan memberi pita untuk semua mainan. Festival meriah!" : `Betul, ${kata(n)} bagian. Juri memberi pita.`) : "Juri menggeleng. Jumlahkan banyak tiap bentuk.");
                      }}
                      className={`min-h-[44px] min-w-[44px] rounded-xl border-4 text-lg font-black ${jawab === v ? (tepat ? "border-[#15803D] bg-[#BBF7D0]" : "border-[#DC2626] bg-[#FEE2E2]") : "border-[#1C01A5] bg-[#FFE566]"} text-[#1C01A5]`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                {tepat ? <p className="mt-1 text-lg" aria-label="dapat pita">{"\u{1F397}\u{FE0F}"}</p> : null}
              </div>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
          {juriBenar(k, MAINAN_SIM) ? "Semua mainan mendapat pita juri. Misi Festival selesai!" : "Jawab pertanyaan juri untuk tiap mainan."}
        </p>
      </div>
    );

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Meja rakit mainan. Ketuk bayangan untuk memasang bagian, ketuk bagian untuk melepasnya. Lengkapi semua mainan, lalu bawa ke panggung.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih mainan">
        {MAINAN_SIM.map((x) => (
          <button key={x.id} type="button" aria-pressed={k.pilih === x.id} onClick={() => ubah(pilihMainan(k, x.id), kalimatSusun(pilihMainan(k, x.id), MAINAN_SIM))} className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.pilih === x.id ? "border-[#1E3A8A] bg-[#1E3A8A] text-white" : "border-[#1E3A8A] bg-white text-[#1E3A8A]"}`}>
            {x.nama} {lengkap(k, x) ? "\u{2705}" : `${k.pasang[x.id].length}/${x.bagian.length}`}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#1E3A8A] p-2" style={{ background: "#BFDBFE", backgroundImage: "linear-gradient(90deg,rgba(30,58,138,0.12) 1px,transparent 1px),linear-gradient(rgba(30,58,138,0.12) 1px,transparent 1px)", backgroundSize: "20px 20px" }}>
        <svg viewBox="0 0 300 184" className="mx-auto block w-full max-w-[420px] select-none rounded-xl bg-[#F8FAFC]" aria-label={`Meja rakit: ${m.nama}`}>
          {m.bagian.map((b, i) => {
            const ada = terpasang.includes(i);
            const [isi, garis] = WARNA_BENDA[b.jenis] ?? ["#E0E7FF", UNGU];
            const p = pusatBagian(b);
            const f = () => ketukBagian(i);
            return (
              <g key={i} role="button" tabIndex={0} aria-label={`${NAMA_BENTUK[b.bentuk]}${ada ? ", terpasang. Ketuk untuk melepas" : ", bayangan. Ketuk untuk memasang"}`} onClick={f} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && f()} style={{ cursor: "pointer" }}>
                {b.bentuk === "lengkung" ? (
                  <ellipse cx={b.x} cy={b.y} rx={b.w / 2} ry={b.h / 2} fill={ada ? isi : "#E2E8F0"} stroke={ada ? garis : "#94A3B8"} strokeWidth={ada ? 2.6 : 1.6} strokeDasharray={ada ? undefined : "4 3"} />
                ) : (
                  <path d={jalur(titikBagian(b))} fill={ada ? isi : "#E2E8F0"} stroke={ada ? garis : "#94A3B8"} strokeWidth={ada ? 2.6 : 1.6} strokeDasharray={ada ? undefined : "4 3"} strokeLinejoin="round" />
                )}
                {ada ? (
                  <text x={p.x} y={p.y + Math.min(b.w, b.h) * 0.16} textAnchor="middle" fontSize={Math.max(8, Math.min(16, Math.min(b.w, b.h) * 0.5))} pointerEvents="none">
                    {EMOJI[b.jenis]}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
          {URUT_KALIMAT.filter((b) => banyakBentuk(m.bagian, b) > 0).map((b) => (
            <div key={b} className="flex items-center justify-center gap-1 rounded-xl bg-white/90 p-1">
              <button type="button" className={tombol} disabled={terpasangJenis(k, m, b) === 0} onClick={() => { const baru = lepasJenis(k, MAINAN_SIM, b); ubah(baru, kalimatSusun(baru, MAINAN_SIM)); }} aria-label={`Lepas semua ${NAMA_BENTUK[b]}`}>
                {"\u{2796}"}
              </button>
              <span className="min-w-[5.5rem] text-center text-xs font-black text-[#1C01A5]">
                {NAMA_BENTUK[b]} {terpasangJenis(k, m, b)}/{banyakBentuk(m.bagian, b)}
              </span>
              <button type="button" className={tombol} disabled={terpasangJenis(k, m, b) === banyakBentuk(m.bagian, b)} onClick={() => { const baru = pasangJenis(k, MAINAN_SIM, b); ubah(baru, kalimatSusun(baru, MAINAN_SIM)); }} aria-label={`Pasang semua ${NAMA_BENTUK[b]}`}>
                {"\u{2795}"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center">
        <p className="text-xs font-black text-[#1D4ED8]">Kalimat tambah (menyusun)</p>
        <p className="text-xl font-black text-[#1C01A5]">{kalimatTambah(k, m)}</p>
        {kurang ? (
          <>
            <p className="mt-1 text-xs font-black text-[#B91C1C]">Kalimat kurang (mengurai: lepas semua {NAMA_BENTUK[kurang]})</p>
            <p className="text-xl font-black text-[#B91C1C]">
              {m.bagian.length} − {banyakBentuk(m.bagian, kurang)} = {m.bagian.length - banyakBentuk(m.bagian, kurang)}
            </p>
          </>
        ) : null}
        <button
          type="button"
          disabled={!semuaLengkap}
          onClick={() => ubah(bawaPanggung(k, MAINAN_SIM), "Semua mainan dibawa ke panggung festival. Juri datang bertanya.")}
          className="mt-2 min-h-[48px] rounded-full border-4 border-[#B45309] bg-[#FACC15] px-4 text-sm font-black text-[#78350F] disabled:opacity-35"
        >
          {"\u{1F3AA}"} Bawa ke panggung juri
        </button>
        {!semuaLengkap ? <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">Panggung terbuka bila ketiga mainan lengkap.</p> : null}
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatSusun(k, MAINAN_SIM)}
      </p>
    </div>
  );
}
