"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { NAMA_JENIS, TANGRAM, banyakGabung, gabung, geser, pusat, skala, urai, type Keping, type Titik } from "./bentuk";
import {
  BANGUN_SIM,
  BAYANGAN_SIM,
  awalPuzzle,
  cobaTumpuk,
  garisBoleh,
  hasilUraiSim,
  kalimatPuzzle,
  pasangKeping,
  pasangTangram,
  pilihBangun,
  pilihBayangan,
  pilihGaris,
  pilihModePuzzle,
  ulangSusun,
  ulangTangram,
  type KeadaanPuzzle,
  type ModePuzzle,
} from "./logika";
import { GAMBAR_KEPING, MISI_PAPAN_TEKS, WARNA_KAYU } from "./data";

/**
 * Simulasi Kelas 2 Bab 3 Sub-Bab B: Papan Puzzle (Misi Papan Puzzle bagian satu). Bangun dan bayangan berbeda dari Story. Eksplorasi bebas tanpa skor,
 * tiga alat untuk satu papan: Urai (segi lima, persegi, atau segi enam diurai dengan garis dari satu pojok atau titik tengah, banyak keping tampil),
 * Susun (keping dipasang ke bayangan tanpa bertumpuk, dan boleh mencoba menumpuk) dan Tangram (tujuh keping mengisi persegi besar).
 */
const MODE: { id: ModePuzzle; nama: string; ikon: string }[] = [
  { id: "urai", nama: "Urai", ikon: "\u{2702}\u{FE0F}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F9E9}" },
  { id: "tangram", nama: "Tangram", ikon: "\u{1F9F1}" },
];
const NAMA_BANGUN: Record<number, string> = { 4: "Persegi", 5: "Segi lima", 6: "Segi enam" };
const NAMA_GARIS: Record<string, string> = { pojok: "Dari satu pojok", pusat: "Dari titik tengah", miring: "Garis miring", tengah: "Garis tengah" };
const NAMA_BAYANGAN: Record<string, string> = { enamSegitiga: "Enam segitiga", atasBawah: "Atas dan bawah", pendek: "Segitiga besar" };
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });
const poin = (t: readonly Titik[]) => t.map((p) => `${p.x},${p.y}`).join(" ");
const kecil = (t: readonly Titik[], cx: number, cy: number, f: number): Titik[] => {
  const c = pusat(t);
  return geser(skala(t, f, c.x, c.y), cx - c.x, cy - c.y);
};

function Kep({ k, i, kosong, sorot, merah }: { k: Keping; i: number; kosong?: boolean; sorot?: boolean; merah?: boolean }) {
  const c = pusat(k.titik);
  return (
    <g>
      <polygon points={poin(k.titik)} fill={kosong ? "#F5E6CC" : WARNA_KAYU[i % WARNA_KAYU.length]} stroke={merah ? "#DC2626" : sorot ? "#B45309" : "#92400E"} strokeWidth={sorot || merah ? 3 : 1.6} strokeDasharray={kosong ? "4 3" : undefined} strokeLinejoin="round" />
      {!kosong ? (
        <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize={10}>
          {GAMBAR_KEPING[i % GAMBAR_KEPING.length]}
        </text>
      ) : null}
    </g>
  );
}

export default function SimulasiPapanPuzzle({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPuzzle) => void }) {
  const [k, setK] = useState<KeadaanPuzzle>(() => awalPuzzle());
  const [pilih, setPilih] = useState<number | null>(null);
  const [pilihT, setPilihT] = useState<string | null>(null);
  const [goyang, setGoyang] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPuzzle, ucap?: string) => {
    setK(baru);
    setPilih(null);
    setPilihT(null);
    if (ucap) speakGuru(ucap);
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;

  const u = useMemo(() => urai(k.n, k.garis, 150, 82, 58), [k.n, k.garis]);
  const hasil = hasilUraiSim(k);
  const slot = useMemo(() => gabung(k.kind, 150, 62, k.kind === "pendek" ? 22 : 24), [k.kind]);
  const baki = useMemo(() => gabung(k.kind, 0, 0, 1).keping, [k.kind]);
  const total = banyakGabung(k.kind);

  const pasang = (s: number) => {
    if (pilih === null) {
      speakGuru("Ketuk satu keping di bawah dulu, lalu ketuk bayangan tempatnya.");
      return;
    }
    const r = pasangKeping(k, pilih, s);
    if (r.ok) ubah(r.k, kalimatPuzzle(r.k));
    else salah(`s${s}`, k.terpasang.some((x) => x.s === s) ? "Tempat itu sudah terisi. Keping tidak boleh bertumpuk." : "Bentuk keping itu belum pas dengan bayangan di sini. Hitung banyak sisinya.");
  };
  const SK = 24;
  const slotT = useMemo(() => TANGRAM.map((t) => ({ ...t, titik: geser(skala(t.titik, SK), 16, 44) })), []);
  const bakiT = useMemo(
    () =>
      TANGRAM.map((t, i) => ({ ...t, titik: kecil(t.titik.map((p) => ({ x: p.x * 12, y: p.y * 12 })), 160 + (i % 3) * 62, 52 + Math.floor(i / 3) * 56, 1) })),
    [],
  );
  const pasangT = (slotId: string) => {
    if (pilihT === null) {
      speakGuru("Ketuk satu keping tangram dulu, lalu ketuk tempatnya di persegi besar.");
      return;
    }
    const r = pasangTangram(k, pilihT, slotId);
    if (r.ok) ubah(r.k, kalimatPuzzle(r.k));
    else salah(`t${slotId}`, k.tangram.includes(slotId) ? "Tempat itu sudah terisi. Keping tidak boleh bertumpuk." : "Ukuran atau bentuk keping itu belum pas dengan tempatnya. Coba keping lain.");
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_PAPAN_TEKS}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat papan puzzle">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihModePuzzle(k, m.id), kalimatPuzzle(pilihModePuzzle(k, m.id)))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#92400E] p-2" style={{ backgroundColor: "#E7C08E", backgroundImage: "repeating-linear-gradient(90deg,rgba(146,64,14,0.16) 0 2px,transparent 2px 30px)" }}>
        {k.mode === "urai" ? (
          <div className="space-y-2">
            <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bangun">
              {BANGUN_SIM.map((n) => (
                <button key={n} type="button" aria-pressed={k.n === n} className={saklar(k.n === n)} onClick={() => ubah(pilihBangun(k, n), kalimatPuzzle(pilihBangun(k, n)))}>
                  {NAMA_BANGUN[n]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih garis">
              {garisBoleh(k.n).map((g) => (
                <button key={g} type="button" aria-pressed={k.garis === g} className={`${tombol} ${k.garis === g ? "bg-[#FEF3C7]" : ""}`} onClick={() => ubah(pilihGaris(k, g), kalimatPuzzle(pilihGaris(k, g)))}>
                  {"\u{1F58A}\u{FE0F}"} {NAMA_GARIS[g]}
                </button>
              ))}
            </div>
            <svg viewBox="0 0 300 150" className="mx-auto block w-full max-w-[420px] rounded-xl bg-white/80" aria-label="Bangun yang diurai">
              {u.keping.map((p, i) => (
                <Kep key={i} k={p} i={i} />
              ))}
              {u.garis.map((g, i) => (
                <line key={i} x1={g[0].x} y1={g[0].y} x2={g[1].x} y2={g[1].y} stroke="#DC2626" strokeWidth={2.6} strokeLinecap="round" />
              ))}
            </svg>
            <p className="rounded-xl bg-white/90 p-2 text-center text-lg font-black text-[#15803D]">
              {k.garis === "pojok" ? `${k.n} − 2 = ${hasil.banyak} ${NAMA_JENIS[hasil.jenis]}` : k.garis === "pusat" ? `${k.n} sisi = ${hasil.banyak} ${NAMA_JENIS[hasil.jenis]}` : `${hasil.banyak} ${NAMA_JENIS[hasil.jenis]}`}
            </p>
          </div>
        ) : null}

        {k.mode === "susun" ? (
          <div className="space-y-2">
            <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih bayangan">
              {BAYANGAN_SIM.map((g) => (
                <button key={g} type="button" aria-pressed={k.kind === g} className={saklar(k.kind === g)} onClick={() => ubah(pilihBayangan(k, g), "Bayangan baru. Ketuk satu keping, lalu ketuk bayangan tempatnya.")}>
                  {NAMA_BAYANGAN[g]}
                </button>
              ))}
            </div>
            <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-xl bg-[#1E293B]" aria-label="Menyusun keping pada bayangan">
              {slot.keping.map((s, i) => {
                const isi = k.terpasang.find((x) => x.s === i);
                return (
                  <g key={i} {...ketuk(() => pasang(i))} aria-label={`Tempat keping ${i + 1}`} className={goyang === `s${i}` ? "lm-goyang" : ""}>
                    {isi ? <Kep k={s} i={isi.p} /> : <Kep k={s} i={i} kosong />}
                  </g>
                );
              })}
              {baki.map((b, p) => {
                if (k.terpasang.some((x) => x.p === p)) return null;
                const cx = 150 + (p - (baki.length - 1) / 2) * 44;
                return (
                  <g key={p} {...ketuk(() => setPilih(p))} aria-label={`Keping ${p + 1}`}>
                    <Kep k={{ jenis: b.jenis, titik: kecil(b.titik, cx, 160, 12) }} i={p} sorot={pilih === p} />
                  </g>
                );
              })}
            </svg>
            <div className="flex flex-wrap justify-center gap-1.5">
              <button type="button" className={tombol} onClick={() => ubah(cobaTumpuk(k), "Keping tidak bisa ditumpuk. Pakai semua keping, dan sisinya harus menempel tanpa menutupi keping lain.")}>
                {"\u{1F4DA}"} Coba tumpuk keping
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangSusun(k), "Keping dikembalikan. Susun lagi dari awal.")}>
                {"\u{21A9}\u{FE0F}"} Ulangi susunan
              </button>
            </div>
            <p className="text-center text-sm font-black text-[#7C2D12]">
              Terpasang {k.terpasang.length} dari {total} keping
            </p>
          </div>
        ) : null}

        {k.mode === "tangram" ? (
          <div className="space-y-2">
            <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-xl bg-[#1E293B]" aria-label="Tangram: tujuh keping mengisi persegi besar">
              {slotT.map((s, i) => {
                const terisi = k.tangram.includes(s.id);
                return (
                  <g key={s.id} {...ketuk(() => pasangT(s.id))} aria-label={`Tempat tangram ${i + 1}`} className={goyang === `t${s.id}` ? "lm-goyang" : ""}>
                    <Kep k={{ jenis: s.jenis, titik: s.titik }} i={i} kosong={!terisi} />
                  </g>
                );
              })}
              {bakiT.map((t, i) =>
                k.tangramPakai.includes(t.id) ? null : (
                  <g key={t.id} {...ketuk(() => setPilihT(t.id))} aria-label={`Keping tangram ${t.nama}`}>
                    <Kep k={{ jenis: t.jenis, titik: t.titik }} i={i} sorot={pilihT === t.id} />
                  </g>
                ),
              )}
            </svg>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={() => ubah(ulangTangram(k), "Keping tangram dikembalikan. Susun lagi dari awal.")}>
                {"\u{21A9}\u{FE0F}"} Ulangi tangram
              </button>
            </div>
            <p className="text-center text-sm font-black text-[#7C2D12]">
              Terpasang {k.tangram.length} dari {TANGRAM.length} keping
            </p>
          </div>
        ) : null}
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatPuzzle(k)}
      </p>
    </div>
  );
}
