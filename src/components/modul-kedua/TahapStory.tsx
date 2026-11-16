"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { Adegan, DataModul } from "@/lib/modul-kedua/tipe";
import { IkonG } from "./Ikon";
import { berhenti, suaraDidukung, suaraNyala, ucapkan } from "./suara";

/** Tahap S (Story): animasi adegan SVG + narasi suara (Web Speech) + subtitle. Isi cerita dibaca dari berkas data. */

const TOKOH: Record<string, { kulit: string; baju: string; rambut: string; topi?: string }> = {
  Malosi: { kulit: "#c68642", baju: "#ef4444", rambut: "#1f1308" },
  Kira: { kulit: "#e0ac69", baju: "#8b5cf6", rambut: "#111827" },
  Upe: { kulit: "#8d5524", baju: "#10b981", rambut: "#0f0a05" },
  Wei: { kulit: "#f1c27d", baju: "#3b82f6", rambut: "#111827" },
  Halim: { kulit: "#c68642", baju: "#f59e0b", rambut: "#1f1308", topi: "#111827" },
};

function Anak({ nama, x }: { nama: string; x: number }) {
  const t = TOKOH[nama];
  const cx = x * 4;
  return (
    <g>
      <rect x={cx - 15} y={168} width={30} height={40} rx={9} fill={t.baju} />
      <circle cx={cx} cy={150} r={18} fill={t.kulit} />
      <path d={`M ${cx - 18} 148 Q ${cx} 118 ${cx + 18} 148 Q ${cx} 138 ${cx - 18} 148`} fill={t.rambut} />
      {t.topi ? <rect x={cx - 16} y={128} width={32} height={10} rx={4} fill={t.topi} /> : null}
      {nama === "Kira" ? <circle cx={cx + 14} cy={132} r={6} fill={t.rambut} /> : null}
      <circle cx={cx - 6} cy={152} r={2.4} fill="#111" />
      <circle cx={cx + 6} cy={152} r={2.4} fill="#111" />
      <path d={`M ${cx - 6} 160 Q ${cx} 166 ${cx + 6} 160`} stroke="#111" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x={cx} y={226} textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">
        {nama}
      </text>
    </g>
  );
}

function Igil({ x }: { x: number }) {
  const cx = x * 4;
  return (
    <g>
      <ellipse cx={cx} cy={178} rx={24} ry={30} fill="#92400e" />
      <ellipse cx={cx} cy={186} rx={14} ry={18} fill="#fde68a" />
      <polygon points={`${cx - 22},152 ${cx - 14},140 ${cx - 8},152`} fill="#92400e" />
      <polygon points={`${cx + 22},152 ${cx + 14},140 ${cx + 8},152`} fill="#92400e" />
      <circle cx={cx - 10} cy={162} r={9} fill="#fff" />
      <circle cx={cx + 10} cy={162} r={9} fill="#fff" />
      <circle cx={cx - 10} cy={162} r={4} fill="#111" />
      <circle cx={cx + 10} cy={162} r={4} fill="#111" />
      <polygon points={`${cx - 4},170 ${cx + 4},170 ${cx},178`} fill="#f97316" />
      <text x={cx} y={226} textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e1b4b">
        Igil
      </text>
    </g>
  );
}

function Latar() {
  return (
    <g>
      <rect width="400" height="260" fill="#bae6fd" />
      <circle cx="360" cy="30" r="20" fill="#fbbf24" />
      <ellipse cx="70" cy="30" rx="30" ry="11" fill="#fff" opacity="0.9" />
      <ellipse cx="96" cy="26" rx="22" ry="9" fill="#fff" opacity="0.9" />
      <rect y="150" width="400" height="110" fill="#86efac" />
      <rect y="150" width="400" height="6" fill="#4ade80" />
      <rect x="4" y="106" width="9" height="50" fill="#92400e" />
      <circle cx="8" cy="98" r="24" fill="#22c55e" />
      <rect x="388" y="112" width="9" height="44" fill="#92400e" />
      <circle cx="392" cy="104" r="22" fill="#22c55e" />
    </g>
  );
}

/** Kelompok benda yang muncul dan dihitung satu per satu; bilangan terakhir ditampilkan besar. */
function KelompokBenda({ adegan }: { adegan: Adegan }) {
  const g = adegan.kelompok;
  if (g.length === 0) return null;
  const total = g.reduce((t, k) => t + Math.max(k.jumlah, 1), 0);
  const d = Math.min(0.9, (adegan.durasiDetik * 0.55) / Math.max(total, 1));
  const lebarSlot = 368 / g.length;
  const mulaiKelompok = g.reduce<number[]>((acc, k, gi) => {
    acc.push(gi === 0 ? 0.6 : acc[gi - 1] + Math.max(g[gi - 1].jumlah, 1) * d + 0.5);
    return acc;
  }, []);
  return (
    <g>
      <rect x="14" y="10" width="372" height="136" rx="16" fill="#fff" opacity="0.78" />
      {g.map((k, gi) => {
        const t0 = mulaiKelompok[gi];
        const cx = 16 + lebarSlot * gi + lebarSlot / 2;
        const baris = k.jumlah > 5 ? 2 : 1;
        const perBaris = Math.ceil(k.jumlah / baris) || 1;
        const sz = Math.min(k.wadah ? 22 : 52, (lebarSlot - 10) / perBaris);
        const lebarIsi = perBaris * sz;
        const x0 = cx - lebarIsi / 2;
        const yBaris = k.wadah ? 46 : Math.max(50, 52 + (88 - baris * (sz + 12)) / 2);
        const waktuBadge = (t0 + k.jumlah * d + 0.1).toFixed(2) + "s";
        return (
          <g key={gi}>
            {k.wadah ? <IkonG nama="keranjang" x={cx - 32} y={80} s={64} /> : null}
            {Array.from({ length: k.jumlah }, (_, i) => {
              const r = Math.floor(i / perBaris);
              const c = i % perBaris;
              const x = x0 + c * sz;
              const y = yBaris + r * (sz + 12);
              const delay = (t0 + i * d).toFixed(2) + "s";
              return (
                <g key={i} className="muncul" style={{ animationDelay: delay }}>
                  <IkonG nama={k.ikon} x={x} y={y} s={sz - 2} variasi={i} />
                  <text x={x + (sz - 2) / 2} y={y - 2} textAnchor="middle" fontSize="11" fontWeight="900" fill="#b91c1c">
                    {i + 1}
                  </text>
                </g>
              );
            })}
            {k.jumlah === 0 ? (
              <text className="muncul" style={{ animationDelay: waktuBadge }} x={cx} y={74} textAnchor="middle" fontSize="16" fontWeight="900" fill="#64748b">
                kosong
              </text>
            ) : null}
            <g className="muncul" style={{ animationDelay: waktuBadge }}>
              <circle cx={cx} cy="30" r="17" fill="#1e1b4b" />
              <text x={cx} y="37" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fde68a">
                {k.jumlah}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}

function AdeganSvg({ a }: { a: Adegan }) {
  return (
    <svg viewBox="0 0 400 260" className="w-full rounded-3xl border-4 border-indigo-900" role="img" aria-label={a.visual}>
      <style>{`.muncul{animation:igilMuncul .5s both}@keyframes igilMuncul{from{opacity:0;transform:translateY(6px) scale(.5)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.muncul{animation:none}}`}</style>
      <Latar />
      <KelompokBenda adegan={a} />
      {a.tokoh.map((t) => (t.nama === "Igil" ? <Igil key={t.nama} x={t.x} /> : <Anak key={t.nama} nama={t.nama} x={t.x} />))}
    </svg>
  );
}

const tidakLangganan = () => () => {};

export default function TahapStory({ data, saatSelesai }: { data: DataModul; saatSelesai: () => void }) {
  const adegan = data.story.adegan;
  const [i, setI] = useState(0);
  const [status, setStatus] = useState<"belum" | "main" | "jeda" | "selesai">("belum");
  const a = adegan[i];
  const adaSuara = useSyncExternalStore(tidakLangganan, suaraDidukung, () => false);

  useEffect(() => {
    if (status !== "main") return;
    let batal = false;
    let pengaman: ReturnType<typeof setTimeout> | undefined;
    const maju = () => {
      if (batal) return;
      if (i < adegan.length - 1) setI(i + 1);
      else setStatus("selesai");
    };
    const suara = suaraNyala() && ucapkan(a.narasi, () => {
      if (pengaman) clearTimeout(pengaman);
      pengaman = setTimeout(maju, 700);
    });
    // Tanpa suara: pindah adegan menurut durasi storyboard. Dengan suara: pengaman bila onend tidak pernah datang.
    if (!suara) pengaman = setTimeout(maju, a.durasiDetik * 1000);
    else pengaman = setTimeout(maju, 45000);
    return () => {
      batal = true;
      if (pengaman) clearTimeout(pengaman);
      berhenti();
    };
  }, [status, i, a, adegan.length]);

  const total = adegan.reduce((s, x) => s + x.durasiDetik, 0);

  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-black text-indigo-950">S: Cerita 🎬 {data.story.judul}</h2>
      <AdeganSvg key={a.id} a={a} />
      <p aria-live="polite" className="rounded-2xl border-4 border-amber-400 bg-amber-50 p-3 text-center text-2xl font-black leading-snug text-indigo-950">
        {a.caption}
      </p>
      <details open={!adaSuara} className="rounded-2xl border-2 border-indigo-200 bg-white p-2 text-base text-indigo-950">
        <summary className="min-h-10 cursor-pointer py-2 font-black">📖 Tampilkan teks cerita</summary>
        <p className="font-bold leading-snug">{a.narasi}</p>
      </details>
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Adegan sebelumnya"
          disabled={i === 0}
          onClick={() => {
            setI(i - 1);
            setStatus("jeda");
          }}
          className="h-16 w-16 rounded-2xl border-4 border-indigo-900 bg-white text-2xl font-black disabled:opacity-40"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={() => setStatus(status === "main" ? "jeda" : status === "selesai" ? "main" : "main")}
          className="h-16 flex-1 rounded-2xl border-4 border-emerald-700 bg-emerald-500 text-xl font-black text-white"
        >
          {status === "main" ? "⏸ Jeda" : status === "belum" ? "▶ Mulai cerita" : status === "selesai" ? "↺ Putar lagi" : "▶ Lanjut"}
        </button>
        <button
          type="button"
          aria-label="Adegan berikutnya"
          disabled={i === adegan.length - 1}
          onClick={() => {
            setI(i + 1);
            setStatus("jeda");
          }}
          className="h-16 w-16 rounded-2xl border-4 border-indigo-900 bg-white text-2xl font-black disabled:opacity-40"
        >
          ⏭
        </button>
      </div>
      <p className="text-center text-sm font-bold text-indigo-900">
        Adegan {i + 1} dari {adegan.length}
      </p>

      {status === "selesai" || i === adegan.length - 1 ? (
        <div className="space-y-2 rounded-3xl border-4 border-violet-500 bg-violet-50 p-4">
          <p className="text-xl font-black text-violet-950">Pertanyaan dari Igil 🦉</p>
          <p className="text-lg font-bold text-indigo-950">{data.story.pertanyaanPemantik}</p>
          <button type="button" onClick={saatSelesai} className="min-h-16 w-full rounded-2xl border-4 border-indigo-900 bg-indigo-700 text-xl font-black text-white">
            Ayo cari jawabannya ➜
          </button>
        </div>
      ) : (
        <button type="button" onClick={saatSelesai} className="min-h-12 w-full rounded-2xl border-2 border-indigo-300 bg-white text-base font-bold text-indigo-700">
          Lewati cerita
        </button>
      )}

      <details className="rounded-2xl border-2 border-indigo-200 bg-white p-3 text-sm text-indigo-950">
        <summary className="min-h-10 cursor-pointer py-2 font-black">Naskah video (storyboard, untuk produksi) · {total} detik</summary>
        <ol className="mt-2 space-y-3">
          {adegan.map((x, n) => (
            <li key={x.id} className="rounded-xl bg-indigo-50 p-2">
              <b>
                Adegan {n + 1} ({x.durasiDetik} dtk)
              </b>
              <br />
              <i>Visual:</i> {x.visual}<br /><i>Teks layar:</i> {x.caption}
              <br />
              <i>Narasi:</i> {x.narasi}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
