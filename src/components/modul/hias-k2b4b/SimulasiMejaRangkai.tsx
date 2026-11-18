"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  BUNYI_MEJA,
  HEX_MEJA,
  KARTU_PITA,
  PANJANG_IRAMA,
  PANJANG_PITA,
  WARNA_MEJA,
  adalahPola,
  alasanBukanPola,
  awalMeja,
  kalimatMeja,
  ketukIrama,
  kosongkanIrama,
  kosongkanPita,
  lanjutkanKartu,
  lepasIrama,
  lepasManik,
  pasangManik,
  petunjukKartuKeliru,
  pilihKartu,
  pilihModeMeja,
  periksaIrama,
  periksaPita,
  putuskanKartu,
  satuanPola,
  tandaiSatuan,
  unsurBerikutMeja,
  type KeadaanMeja,
  type ModeMeja,
} from "./logika";
import { MISI_HIAS_TEKS } from "./data-peta";

/**
 * Simulasi Kelas 2 Bab 4 Sub-Bab B: Meja Rangkai (Misi Meja Rangkai), akhir cerita Pameran Kerajinan Sekolah. Eksplorasi bebas tanpa skor, tiga alat:
 * Rangkai (susun pita dari manik berwarna lalu periksa polanya), Irama (ketuk bunyi keras, pelan, diam lalu periksa polanya), dan Periksa (kartu pita:
 * putuskan pola atau bukan, tandai satuan pola, lanjutkan pola). Pola dan data kartu berbeda dari Story.
 */
const MODE: { id: ModeMeja; nama: string; ikon: string }[] = [
  { id: "rangkai", nama: "Rangkai", ikon: "\u{1F9F5}" },
  { id: "irama", nama: "Irama", ikon: "\u{1F44F}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{1F50D}" },
];
const UNGU = "#1C01A5";
const MERAH = "#DC2626";
const NAMA_BUNYI: Record<string, string> = { keras: "Keras", pelan: "Pelan", diam: "Diam" };

/** Satu baris manik (atau bunyi) berjajar. `kurung`: banyak kotak awal yang disorot sebagai satuan. `ketuk`: kotak bisa diketuk. */
function Deret({ unsur, total, bunyi, kurung, ketuk, label }: { unsur: string[]; total: number; bunyi?: boolean; kurung?: number | null; ketuk?: (i: number) => void; label: string }) {
  const d = Math.min(36, 276 / total);
  const s = d * 0.84;
  const x0 = 150 - (d * (total - 1)) / 2;
  const y = 70;
  return (
    <svg viewBox="0 0 300 120" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" aria-label={label}>
      <line x1={12} y1={y} x2={288} y2={y} stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" />
      {Array.from({ length: total }, (_, i) => {
        const cx = x0 + d * i;
        const u = unsur[i];
        const kotakKetuk = ketuk ? <rect x={cx - d / 2} y={y - 34} width={d} height={68} fill="transparent" role="button" tabIndex={0} aria-label={`Kotak ${i + 1}`} style={{ cursor: "pointer" }} onClick={() => ketuk(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ketuk(i)} /> : null;
        if (u === undefined)
          return (
            <g key={i}>
              <rect x={cx - s / 2} y={y - s / 2} width={s} height={s} rx={4} fill="#FFFBEB" stroke="#B45309" strokeWidth={1.4} strokeDasharray="4 3" />
              {kotakKetuk}
            </g>
          );
        if (bunyi)
          return (
            <g key={i}>
              {u === "diam" ? (
                <rect x={cx - s / 2} y={y + 10} width={s} height={8} rx={2} fill="#F1F5F9" stroke="#64748B" strokeWidth={1.4} strokeDasharray="3 2" />
              ) : (
                <rect x={cx - s / 2} y={y + 18 - (u === "keras" ? 46 : 22)} width={s} height={u === "keras" ? 46 : 22} rx={3} fill={u === "keras" ? "#F87171" : "#60A5FA"} stroke={UNGU} strokeWidth={1.6} />
              )}
              {kotakKetuk}
            </g>
          );
        return (
          <g key={i}>
            <circle cx={cx} cy={y} r={s / 2} fill={HEX_MEJA[u] ?? "#CBD5E1"} stroke="#78350F" strokeWidth={1.8} />
            <circle cx={cx - s * 0.14} cy={y - s * 0.16} r={s * 0.12} fill="#FFFFFF" fillOpacity={0.7} />
            {kotakKetuk}
          </g>
        );
      })}
      {kurung ? (
        <g>
          <path d={`M${x0 - s / 2} ${y + 44} L${x0 - s / 2} ${y + 51} L${x0 + d * (kurung - 1) + s / 2} ${y + 51} L${x0 + d * (kurung - 1) + s / 2} ${y + 44}`} fill="none" stroke={MERAH} strokeWidth={2.6} />
          <text x={(x0 - s / 2 + x0 + d * (kurung - 1) + s / 2) / 2} y={y + 64} textAnchor="middle" fontSize={9} fontWeight={900} fill={MERAH}>
            satuan pola
          </text>
        </g>
      ) : null}
    </svg>
  );
}

export default function SimulasiMejaRangkai({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanMeja) => void }) {
  const [k, setK] = useState<KeadaanMeja>(() => awalMeja());
  const [goyang, setGoyang] = useState("");
  const [hasil, setHasil] = useState("");
  /** Banyak kotak satuan yang disorot setelah pemeriksaan berhasil (Rangkai atau Irama). */
  const [sorot, setSorot] = useState<number | null>(null);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanMeja, ucap?: string) => {
    setK(baru);
    setSorot(null);
    if (ucap) {
      setHasil(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    setHasil(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9D174D] bg-[#9D174D] text-white" : "border-[#9D174D] bg-white text-[#9D174D]"}`;
  const ganti = (m: ModeMeja) => {
    setHasil("");
    ubah(pilihModeMeja(k, m), m === "rangkai" ? "Rangkai pita dari manik berwarna, lalu periksa polanya." : m === "irama" ? "Ketuk bunyi keras, pelan, atau diam, lalu periksa polanya." : "Pilih satu kartu pita, lalu periksa polanya.");
  };

  /* ------------------------------ Rangkai ------------------------------ */
  const pasang = (w: string) => {
    const r = pasangManik(k, w);
    if (r.ok) ubah(r.k, kalimatMeja(r.k));
    else salah("rangkai", "Pita sudah penuh. Lepas satu manik, atau kosongkan pita.");
  };
  const periksaRangkai = () => {
    const r = periksaPita(k);
    if (!r.ok) {
      salah("rangkai", alasanBukanPola(k.rangkai));
      return;
    }
    setK(r.k);
    if (r.pola) {
      setSorot(r.satuan);
      const u = unsurBerikutMeja(k.rangkai);
      const t = `Ini pola! Satuannya ${k.rangkai.slice(0, r.satuan ?? 0).join(", ")}. Unsur yang berikutnya ${u}.`;
      setHasil(t);
      speakGuru(t);
    } else {
      setSorot(null);
      const t = alasanBukanPola(k.rangkai);
      setHasil(t);
      speakGuru(t);
    }
  };

  /* ------------------------------ Irama ------------------------------ */
  const ketuk = (b: string) => {
    const r = ketukIrama(k, b);
    if (r.ok) ubah(r.k, kalimatMeja(r.k));
    else salah("irama", "Deret irama sudah penuh. Lepas satu bunyi, atau kosongkan.");
  };
  const periksaBunyi = () => {
    const r = periksaIrama(k);
    if (!r.ok) {
      salah("irama", alasanBukanPola(k.irama));
      return;
    }
    setK(r.k);
    if (r.pola) {
      setSorot(r.satuan);
      const u = unsurBerikutMeja(k.irama);
      const t = `Ini pola suara! Satuannya ${k.irama.slice(0, r.satuan ?? 0).join(", ")}. Bunyi yang berikutnya ${u}.`;
      setHasil(t);
      speakGuru(t);
    } else {
      setSorot(null);
      const t = alasanBukanPola(k.irama);
      setHasil(t);
      speakGuru(t);
    }
  };

  /* ------------------------------ Periksa ------------------------------ */
  const kartu = k.kartu >= 0 ? KARTU_PITA[k.kartu] : null;
  const putus = (jawab: boolean) => {
    const r = putuskanKartu(k, jawab);
    if (r.ok && kartu) ubah(r.k, adalahPola(kartu.unsur) ? `Betul, kartu ${kartu.nama} berpola. Ada satuan yang berulang dan teratur.` : `Betul, kartu ${kartu.nama} bukan pola. ${alasanBukanPola(kartu.unsur)}`);
    else {
      setK(r.k);
      salah("putus", petunjukKartuKeliru(k, "putus"));
    }
  };
  const tandai = (n: number) => {
    const r = tandaiSatuan(k, n);
    if (r.ok && kartu) ubah(r.k, `Tepat! Satuan kartu ${kartu.nama} adalah ${kartu.unsur.slice(0, n).join(", ")}.`);
    else {
      if (k.kartu >= 0) setK(r.k);
      salah("kartu", petunjukKartuKeliru(k, "satuan"));
    }
  };
  const lanjut = (w: string) => {
    const r = lanjutkanKartu(k, w);
    if (r.ok && kartu) ubah(r.k, `Pas! Setelah ${kartu.unsur[kartu.unsur.length - 1]}, yang berikutnya ${w}, mengikuti satuannya.`);
    else {
      if (k.kartu >= 0) setK(r.k);
      salah("lanjut", petunjukKartuKeliru(k, "lanjut"));
    }
  };

  return (
    <div className="space-y-3" data-uji="simulasi-meja-rangkai">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9D174D] bg-[#FDF2F8] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Meja Rangkai</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_HIAS_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "rangkai" ? (
        <div className="space-y-2">
          <div className={goyang === "rangkai" ? "lm-goyang" : ""}>
            <Deret unsur={k.rangkai} total={PANJANG_PITA} kurung={sorot} label="Pita yang sedang dirangkai" />
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih warna manik">
            {WARNA_MEJA.map((w) => (
              <button key={w} type="button" onClick={() => pasang(w)} className="flex min-h-[48px] items-center gap-1.5 rounded-2xl border-4 border-[#78350F] bg-[#FEF3C7] px-3 text-sm font-black text-[#1C01A5]">
                <span aria-hidden="true" className="block h-5 w-5 rounded-full border-2 border-[#78350F]" style={{ background: HEX_MEJA[w] }} />
                {w}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={() => { const r = lepasManik(k); if (r.ok) ubah(r.k, "Satu manik dilepas."); else salah("rangkai", "Pita masih kosong."); }}>
              Lepas satu
            </button>
            <button type="button" className={tombol} onClick={() => ubah(kosongkanPita(k), "Pita dikosongkan. Rangkai lagi dari awal.")} disabled={k.rangkai.length === 0}>
              Kosongkan
            </button>
            <button type="button" className={tombol} onClick={periksaRangkai}>
              {"\u{1F50D}"} Periksa pola
            </button>
          </div>
        </div>
      ) : null}

      {k.mode === "irama" ? (
        <div className="space-y-2">
          <div className={goyang === "irama" ? "lm-goyang" : ""}>
            <Deret unsur={k.irama} total={PANJANG_IRAMA} bunyi kurung={sorot} label="Deret irama yang sedang dibuat" />
          </div>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih bunyi">
            {BUNYI_MEJA.map((b) => (
              <button key={b} type="button" onClick={() => ketuk(b)} className="min-h-[48px] min-w-[88px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)]">
                {b === "diam" ? "\u{1F92B}" : "\u{1F44F}"} {NAMA_BUNYI[b]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={() => { const r = lepasIrama(k); if (r.ok) ubah(r.k, "Satu bunyi dilepas."); else salah("irama", "Deret irama masih kosong."); }}>
              Lepas satu
            </button>
            <button type="button" className={tombol} onClick={() => ubah(kosongkanIrama(k), "Irama dikosongkan. Ketuk lagi dari awal.")} disabled={k.irama.length === 0}>
              Kosongkan
            </button>
            <button type="button" className={tombol} onClick={periksaBunyi}>
              {"\u{1F50D}"} Periksa irama
            </button>
          </div>
        </div>
      ) : null}

      {k.mode === "periksa" ? (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3" role="group" aria-label="Kartu pita">
            {KARTU_PITA.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => ubah(pilihKartu(k, i), `Kartu ${c.nama} dipilih.`)}
                aria-pressed={k.kartu === i}
                className={`rounded-xl border-4 bg-white px-1 py-1.5 text-center text-xs font-black text-[#1C01A5] ${k.kartu === i ? "border-[#DC2626]" : "border-[#F9A8D4]"}`}
              >
                <span className="flex justify-center gap-0.5" aria-hidden="true">
                  {c.unsur.slice(0, 6).map((u, q) => (
                    <span key={q} className="block h-3 w-3 rounded-sm border border-[#78350F]" style={{ background: HEX_MEJA[u] }} />
                  ))}
                </span>
                {c.nama} {k.diputuskan.includes(i) ? "\u{2705}" : ""}
              </button>
            ))}
          </div>
          {kartu ? (
            <div className={`space-y-2 ${goyang === "kartu" ? "lm-goyang" : ""}`}>
              <Deret unsur={kartu.unsur} total={kartu.unsur.length} ketuk={(i) => tandai(i + 1)} kurung={k.satuanDitandai.includes(k.kartu) ? satuanPola(kartu.unsur) : null} label={`Kartu pita ${kartu.nama}`} />
              <p className="text-center text-xs font-bold text-[#1C01A5]/80">Ketuk kotak terakhir dari satuan polanya untuk menandai satuan.</p>
              <div className={`flex flex-wrap justify-center gap-2 ${goyang === "putus" ? "lm-goyang" : ""}`}>
                <button type="button" className={tombol} onClick={() => putus(true)}>
                  Pola
                </button>
                <button type="button" className={tombol} onClick={() => putus(false)}>
                  Bukan pola
                </button>
              </div>
              <div className={`flex flex-wrap items-center justify-center gap-1.5 ${goyang === "lanjut" ? "lm-goyang" : ""}`} role="group" aria-label="Lanjutkan pola">
                <span className="text-xs font-black text-[#1C01A5]">Lanjutkan dengan:</span>
                {WARNA_MEJA.map((w) => (
                  <button key={w} type="button" onClick={() => lanjut(w)} className="flex min-h-[40px] items-center gap-1 rounded-xl border-2 border-[#78350F] bg-[#FEF3C7] px-2 text-xs font-black text-[#1C01A5]">
                    <span aria-hidden="true" className="block h-4 w-4 rounded-full border border-[#78350F]" style={{ background: HEX_MEJA[w] }} />
                    {w}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-white/80 p-4 text-center text-sm font-black text-[#1C01A5]">Ketuk satu kartu pita, lalu periksa polanya.</p>
          )}
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="min-h-[2.5rem] rounded-xl bg-white/85 px-2 py-1 text-center text-sm font-black text-[#9D174D]">
        {hasil || kalimatMeja(k)}
      </p>
    </div>
  );
}
