"use client";

import { useEffect, useState } from "react";
import type { Adegan, DataModul } from "@/lib/modul-kedua/tipe";
import { berhenti, suaraNyala, ucapkan } from "./suara";

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

function Latar({ jenis }: { jenis: Adegan["latar"] }) {
  if (jenis === "pantai")
    return (
      <g>
        <rect width="400" height="260" fill="#bae6fd" />
        <circle cx="330" cy="50" r="26" fill="#fbbf24" />
        <rect y="110" width="400" height="55" fill="#38bdf8" />
        <rect y="165" width="400" height="95" fill="#fde68a" />
        <path d="M 60 120 L 120 120 L 108 138 L 72 138 Z" fill="#b45309" />
        <line x1="90" y1="120" x2="90" y2="80" stroke="#78350f" strokeWidth="3" />
        <polygon points="90,82 90,116 122,116" fill="#fef3c7" />
      </g>
    );
  return (
    <g>
      <rect width="400" height="260" fill="#e0f2fe" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={i * 50} y="0" width="50" height="34" fill={i % 2 ? "#fff" : "#ef4444"} />
      ))}
      <rect y="34" width="400" height="6" fill="#7f1d1d" opacity="0.3" />
      <rect y="200" width="400" height="60" fill="#d6b88a" />
    </g>
  );
}

function Benda({ emoji, jumlah, hitung }: { emoji: string; jumlah: number; hitung?: boolean }) {
  if (jumlah === 0)
    return (
      <g>
        <text x="200" y="104" textAnchor="middle" fontSize="54">
          🧺
        </text>
        <text className="ikan" style={{ animationDelay: "0.6s" }} x="200" y="64" textAnchor="middle" fontSize="40" fontWeight="900" fill="#b91c1c">
          0
        </text>
      </g>
    );
  const baris = jumlah > 5 ? 2 : 1;
  const perBaris = Math.ceil(jumlah / baris);
  return (
    <g>
      <rect x="40" y="46" width="320" height={baris * 44 + 12} rx="18" fill="#fff" opacity="0.8" />
      {Array.from({ length: jumlah }, (_, i) => {
        const r = Math.floor(i / perBaris);
        const k = i % perBaris;
        const x = 200 + (k - (perBaris - 1) / 2) * 58;
        const y = 90 + r * 44;
        const delay = `${(i * (hitung ? 1.1 : 0.3)).toFixed(2)}s`;
        return (
          <g key={i}>
            <text className="ikan" style={{ animationDelay: delay }} x={x} y={y} textAnchor="middle" fontSize="32">
              {emoji}
            </text>
            {hitung ? (
              <text className="ikan" style={{ animationDelay: delay }} x={x} y={y - 30} textAnchor="middle" fontSize="16" fontWeight="900" fill="#b91c1c">
                {i + 1}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function AdeganSvg({ a }: { a: Adegan }) {
  return (
    <svg viewBox="0 0 400 260" className="w-full rounded-3xl border-4 border-indigo-900" role="img" aria-label={a.visual}>
      <style>{`.ikan{animation:igilMuncul .5s both}@keyframes igilMuncul{from{opacity:0;transform:translateY(8px) scale(.6)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.ikan{animation:none}}`}</style>
      <Latar jenis={a.latar} />
      {a.benda ? <Benda emoji={a.benda.emoji} jumlah={a.benda.jumlah} hitung={a.benda.hitung} /> : null}
      {a.tokoh.map((t) => (t.nama === "Igil" ? <Igil key={t.nama} x={t.x} /> : <Anak key={t.nama} nama={t.nama} x={t.x} />))}
    </svg>
  );
}

export default function TahapStory({ data, saatSelesai }: { data: DataModul; saatSelesai: () => void }) {
  const adegan = data.story.adegan;
  const [i, setI] = useState(0);
  const [status, setStatus] = useState<"belum" | "main" | "jeda" | "selesai">("belum");
  const a = adegan[i];

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
      <p aria-live="polite" className="min-h-20 rounded-2xl border-4 border-amber-400 bg-amber-50 p-3 text-lg font-bold leading-snug text-indigo-950">
        {a.narasi}
      </p>
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
                Adegan {n + 1} ({x.durasiDetik} dtk, latar {x.latar})
              </b>
              <br />
              <i>Visual:</i> {x.visual}
              <br />
              <i>Narasi:</i> {x.narasi}
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
