"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  PATOKAN,
  TRIO_URUT,
  awalPesta,
  bandingDua,
  bukaTabel,
  isiTukar,
  kalimatPesta,
  kata,
  mulaiLagiPesta,
  pasangTanda,
  patokanTerdekat,
  pilihModePesta,
  pilihNampan,
  puluhSatuan,
  taksirNampan,
  tukarSepuluh,
  ulangUrut,
  urutPilih,
  type KeadaanPesta,
  type ModePesta,
  type Tanda,
} from "./logika";
import { KUE, MISI_PESTA, NAMA_SIM, NAMPAN_SIM } from "./data";
import { KOTAK, LEPAS, tataBenda } from "./periksa";

/**
 * Simulasi Kelas 2 Bab 1 Sub-Bab C: Meja Pesta (Misi Meja Pesta bagian satu). Nampan di meja berbeda dari Story. Eksplorasi bebas tanpa skor,
 * tiga alat untuk satu meja: Banding (perkiraan dulu dengan patokan, dua nampan dibandingkan lewat tabel puluhan dan satuan, lalu pasang tanda
 * lebih besar, lebih kecil, atau sama dengan), Urut (tiga nampan dari yang paling sedikit), dan Tukar (sepuluh kue lepas ditukar satu kotak sepuluh).
 */
const D = NAMPAN_SIM;
const NAMA = NAMA_SIM;
const MODE: { id: ModePesta; nama: string; ikon: string }[] = [
  { id: "banding", nama: "Banding", ikon: "\u{2696}\u{FE0F}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F522}" },
  { id: "tukar", nama: "Tukar", ikon: "\u{1F501}" },
];
const UNGU = "#1C01A5";
const TANDA: { t: Tanda; teks: string; nama: string }[] = [
  { t: "lebih", teks: ">", nama: "lebih besar" },
  { t: "kurang", teks: "<", nama: "lebih kecil" },
  { t: "sama", teks: "=", nama: "sama dengan" },
];
const lambang = (h: Tanda): string => (h === "lebih" ? ">" : h === "kurang" ? "<" : "=");

/** Satu tumpukan kotak sepuluh dan kue lepas (p kotak dan s kue) di dalam kotak gambar 120 x 70. */
function Tumpukan({ p, s, kue, sorot }: { p: number; s: number; kue: number; sorot?: boolean }) {
  const t = tataBenda(p * 10 + Math.min(s, 9));
  const lepas = Array.from({ length: s }, (_, j) => ({ x: 8 + (j % 5) * LEPAS.jarak, y: 32 + Math.floor(j / 5) * LEPAS.jarak }));
  return (
    <svg viewBox="0 0 120 72" className="mx-auto block h-[72px] w-[120px]" aria-hidden="true">
      {t.kotak.slice(0, p).map((k, i) => (
        <g key={i}>
          <rect x={6 + k.x * 0.96} y={4} width={KOTAK.w * 0.96} height={KOTAK.h} rx={3} fill="#FDBA74" stroke={sorot ? "#B45309" : UNGU} strokeWidth={sorot ? 2.6 : 1.3} />
          <text x={6 + (k.x + KOTAK.w / 2) * 0.96} y={15.5} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
            10
          </text>
        </g>
      ))}
      {lepas.map((l, j) => (
        <text key={j} x={6 + l.x} y={l.y + 3} textAnchor="middle" fontSize={LEPAS.u}>
          {KUE[kue].emoji}
        </text>
      ))}
    </svg>
  );
}

export default function SimulasiMejaPesta({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPesta) => void }) {
  const [k, setK] = useState<KeadaanPesta>(() => awalPesta());
  const [goyang, setGoyang] = useState("");
  const [hasilTanda, setHasilTanda] = useState<Tanda | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPesta, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9D174D] bg-[#9D174D] text-white" : "border-[#9D174D] bg-white text-[#9D174D]"}`;

  const ketukNampan = (i: number) => {
    const baru = pilihNampan(k, i, D);
    setHasilTanda(null);
    setMati([]);
    ubah(baru, kalimatPesta(baru, D, NAMA));
  };
  const fokus = k.pilih.length > 0 ? k.pilih[k.pilih.length - 1] : -1;
  const taksir = (patokan: number) => {
    if (fokus < 0) {
      speakGuru("Ketuk satu nampan dulu, lalu pilih patokannya.");
      return;
    }
    const r = taksirNampan(k, fokus, patokan, D);
    if (r.ok) ubah(r.k, `Betul, nampan ${NAMA[fokus]} kira-kira hampir ${kata(patokan)}. Sekarang hitung untuk membuktikannya.`);
    else {
      setMati((m) => [...m, patokan]);
      salah(`p${patokan}`, patokan > patokanTerdekat(D[fokus].n) ? "Patokan itu terlalu besar. Pilih patokan yang jaraknya paling pendek." : "Patokan itu terlalu kecil. Pilih patokan yang jaraknya paling pendek.");
    }
  };
  const tandai = (t: Tanda) => {
    const r = pasangTanda(k, t, D);
    if (r.perlu === "pasangan") {
      speakGuru("Ketuk dua nampan dulu.");
      return;
    }
    if (r.perlu === "tabel") {
      salah(`t${t}`, "Buka tabel puluhan dan satuan dulu. Bandingkan puluhannya lebih dulu.");
      return;
    }
    if (r.ok) {
      setHasilTanda(t);
      ubah(r.k, kalimatPesta(r.k, D, NAMA));
    } else {
      ubah(r.k);
      salah(`t${t}`, "Tandanya belum tepat. Lihat puluhannya dulu, lalu satuannya kalau puluhannya sama. Mulut tanda terbuka ke bilangan yang lebih besar.");
    }
  };
  const ketukUrut = (i: number) => {
    if (!TRIO_URUT.includes(i)) return;
    const r = urutPilih(k, i, D);
    if (r.ok) ubah(r.k, kalimatPesta(r.k, D, NAMA));
    else if (!k.urut.includes(i)) salah(`u${i}`, "Bukan yang paling sedikit di antara sisanya. Lihat kotak sepuluhnya dulu, lalu kue lepasnya.");
  };

  const [a, b] = k.pilih;
  const bisaBuka = k.pilih.length === 2 && !k.tabel;
  const tukar = isiTukar(k);

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_PESTA}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja pesta">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihModePesta(k, m.id), kalimatPesta(pilihModePesta(k, m.id), D, NAMA))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#DC2626] p-2" style={{ backgroundColor: "#FFF1F2", backgroundImage: "repeating-linear-gradient(0deg,rgba(220,38,38,0.16) 0 20px,transparent 20px 40px),repeating-linear-gradient(90deg,rgba(220,38,38,0.16) 0 20px,transparent 20px 40px)" }}>
        {k.mode === "banding" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#7F1D1D]">Ketuk dua nampan untuk dibandingkan</p>
            <div className="mx-auto grid max-w-md grid-cols-3 gap-2" role="group" aria-label="Nampan di meja pesta">
              {D.map((x, i) => {
                const { p, s } = puluhSatuan(x.n);
                const pilih = k.pilih.includes(i);
                return (
                  <button
                    key={x.id}
                    type="button"
                    aria-pressed={pilih}
                    onClick={() => ketukNampan(i)}
                    className={`rounded-xl border-4 bg-white p-1 text-center text-xs font-black text-[#1C01A5] ${pilih ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#92400E]"}`}
                  >
                    <Tumpukan p={p} s={s} kue={x.kue} sorot={pilih} />
                    <span className="block">
                      {KUE[x.kue].emoji} {NAMA[i]}
                    </span>
                    {k.taksir.includes(i) ? <span className="block text-[10px] text-[#15803D]">kira-kira {patokanTerdekat(x.n)}</span> : null}
                  </button>
                );
              })}
            </div>

            <div className="mx-auto max-w-md space-y-1 rounded-xl bg-white/90 p-2 text-center">
              <p className="text-xs font-black text-[#7F1D1D]">Perkiraan dulu: nampan yang terakhir diketuk kira-kira hampir berapa?</p>
              <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih patokan">
                {PATOKAN.map((p) => (
                  <button key={p} type="button" disabled={mati.includes(p)} onClick={() => taksir(p)} className={`${tombol} min-w-[56px] ${goyang === `p${p}` ? "lm-goyang" : ""}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-auto max-w-md space-y-1 rounded-xl bg-white/90 p-2 text-center">
              <button type="button" className={tombol} disabled={!bisaBuka} onClick={() => ubah(bukaTabel(k), "Tabel puluhan dan satuan dibuka. Bandingkan puluhannya dulu.")}>
                {"\u{1F4CB}"} Buka tabel puluhan dan satuan
              </button>
              {k.tabel && a !== undefined && b !== undefined ? (
                <table className="mx-auto w-full max-w-xs border-collapse text-sm font-black text-[#1C01A5]">
                  <thead>
                    <tr>
                      <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Nampan</th>
                      <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Bilangan</th>
                      <th className="border-2 border-[#1C01A5] bg-[#FEF08A] px-1 py-1">Puluhan</th>
                      <th className="border-2 border-[#1C01A5] bg-[#EDE9FE] px-1 py-1">Satuan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[a, b].map((i) => (
                      <tr key={i}>
                        <td className="border-2 border-[#1C01A5] px-1 py-1">{NAMA[i]}</td>
                        <td className="border-2 border-[#1C01A5] px-1 py-1">{D[i].n}</td>
                        <td className="border-2 border-[#1C01A5] bg-[#FEF9C3] px-1 py-1">{puluhSatuan(D[i].n).p}</td>
                        <td className="border-2 border-[#1C01A5] px-1 py-1">{puluhSatuan(D[i].n).s}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
              <p className="text-xs font-black text-[#7F1D1D]">Pasang tanda untuk nampan pertama dan kedua:</p>
              <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih tanda">
                {TANDA.map((x) => (
                  <button key={x.t} type="button" onClick={() => tandai(x.t)} className={`${tombol} ${goyang === `t${x.t}` ? "lm-goyang" : ""}`} aria-label={x.nama}>
                    {x.teks} {x.nama}
                  </button>
                ))}
              </div>
              {hasilTanda && a !== undefined && b !== undefined && bandingDua(D[a].n, D[b].n) === hasilTanda ? (
                <p className="text-lg font-black text-[#15803D]">
                  {D[a].n} {lambang(hasilTanda)} {D[b].n}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {k.mode === "urut" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#7F1D1D]">Ketuk nampan dari yang paling sedikit</p>
            <div className="mx-auto grid max-w-md grid-cols-3 gap-2" role="group" aria-label="Tiga nampan untuk diurutkan">
              {TRIO_URUT.map((i) => {
                const { p, s } = puluhSatuan(D[i].n);
                const sudah = k.urut.includes(i);
                return (
                  <button key={i} type="button" disabled={sudah} onClick={() => ketukUrut(i)} className={`rounded-xl border-4 bg-white p-1 text-center text-xs font-black text-[#1C01A5] ${goyang === `u${i}` ? "lm-goyang" : ""} ${sudah ? "border-[#15803D] opacity-50" : "border-[#92400E]"}`}>
                    <Tumpukan p={p} s={s} kue={D[i].kue} />
                    <span className="block">
                      {KUE[D[i].kue].emoji} {NAMA[i]}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mx-auto flex max-w-md items-center justify-center gap-1.5 rounded-xl bg-white/90 p-2" aria-label="Urutan dari paling sedikit">
              {TRIO_URUT.map((_, q) => (
                <span key={q} className={`flex min-h-[44px] min-w-[84px] items-center justify-center rounded-lg border-2 px-1 text-sm font-black ${k.urut[q] !== undefined ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-dashed border-[#92400E] text-[#92400E]/70"}`}>
                  {k.urut[q] !== undefined ? `${KUE[D[k.urut[q]].kue].emoji} ${D[k.urut[q]].n}` : q + 1}
                </span>
              ))}
            </div>
            {k.urut.length === TRIO_URUT.length ? (
              <p className="text-center text-lg font-black text-[#15803D]">
                {k.urut.map((i) => D[i].n).join(" < ")}
              </p>
            ) : null}
          </div>
        ) : null}

        {k.mode === "tukar" ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#7F1D1D]">Tukar sepuluh kue lepas dengan satu kotak sepuluh</p>
            <div className="mx-auto max-w-xs rounded-xl border-4 border-[#92400E] bg-white p-2 text-center">
              <svg viewBox="0 0 140 80" className="mx-auto block h-[110px] w-full max-w-[220px]" role="img" aria-label={`${kata(tukar.p)} kotak sepuluh dan ${kata(tukar.s)} kue lepas`}>
                {Array.from({ length: tukar.p }, (_, i) => (
                  <g key={i}>
                    <rect x={6 + i * 27} y={4} width={KOTAK.w} height={KOTAK.h} rx={3} fill="#FDBA74" stroke={UNGU} strokeWidth={1.3} />
                    <text x={6 + i * 27 + 12} y={15.5} textAnchor="middle" fontSize={9} fontWeight={900} fill={UNGU}>
                      10
                    </text>
                  </g>
                ))}
                {Array.from({ length: tukar.s }, (_, j) => (
                  <text key={j} x={12 + (j % 8) * 15.5} y={46 + Math.floor(j / 8) * 16} textAnchor="middle" fontSize={13}>
                    {KUE[5].emoji}
                  </text>
                ))}
              </svg>
              <p className="text-sm font-black text-[#1C01A5]">
                {tukar.p} puluhan dan {tukar.s} satuan = {tukar.p * 10 + tukar.s} kue
              </p>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} disabled={k.sudahTukar} onClick={() => ubah(tukarSepuluh(k), kalimatPesta(tukarSepuluh(k), D, NAMA))}>
                {"\u{1F501}"} Tukar sepuluh lepas jadi satu kotak
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {k.mode === "urut" ? (
          <button type="button" className={tombol} onClick={() => ubah(ulangUrut(k), "Urutan diulang. Ketuk nampan yang paling sedikit lebih dulu.")}>
            {"\u{21A9}\u{FE0F}"} Ulangi urutan
          </button>
        ) : null}
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasilTanda(null);
            setMati([]);
            ubah(mulaiLagiPesta(), "Meja pesta dirapikan. Main lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Main lagi
        </button>
      </div>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatPesta(k, D, NAMA)}
      </p>
    </div>
  );
}
