"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahBotol } from "./LangkahBotol";
import { PENUTUP_B, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 3 Bab 2 Sub-Bab B: dua belas tugas lanjutan Misi Pos Persediaan
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai Kelas 3 Bab 1 dan Sub-Bab A Bab ini: Concrete = rak kayu pos jaga berdinding papan tegak, kemajuan berupa deret botol air yang terisi;
 * Pictorial = kertas milimeter hijau muda berkisi dan bertitik, kemajuan berupa deret kotak yang terisi; Abstract = lembar catatan jaga bergaris dengan garis tepi merah dan stempel hutan, kemajuan berupa deret stempel pohon pinus.
 * Abstract diakhiri Poin Penting lalu perayaan akhir cerita bab (spanduk PERKEMAHAN SERU MERIAH, api unggun menyala, bintang, konfeti). Tanpa skor.
 */

type Tema = "pos" | "milimeter" | "catatan";
const LATAR: Record<Tema, React.CSSProperties> = {
  pos: {
    backgroundColor: "#F3DDB5",
    backgroundImage: "repeating-linear-gradient(90deg,rgba(120,53,15,0.2) 0 2px,transparent 2px 38px),linear-gradient(180deg,rgba(255,255,255,0.35),transparent 20%)",
  },
  milimeter: {
    backgroundColor: "#ECFDF5",
    backgroundImage: "linear-gradient(rgba(22,163,74,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,0.2) 1px,transparent 1px),radial-gradient(circle,rgba(22,101,52,0.3) 1.2px,transparent 1.6px)",
    backgroundSize: "12px 12px,12px 12px,48px 48px",
  },
  catatan: {
    backgroundColor: "#FFFEF7",
    backgroundImage: "repeating-linear-gradient(0deg,transparent 0 26px,rgba(59,130,246,0.28) 26px 27px),linear-gradient(90deg,transparent 0 34px,rgba(220,38,38,0.45) 34px 36px,transparent 36px)",
  },
};

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "pos")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-end justify-center gap-1 px-2 py-1" aria-label={`Botol ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <svg key={i} viewBox="0 0 12 24" className={`h-5 w-2.5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
            <rect x="4" y="1" width="4" height="3" rx="0.8" fill="#16A34A" stroke="#166534" strokeWidth="0.6" />
            <rect x="2" y="4" width="8" height="18" rx="2.6" fill="#E0F2FE" stroke="#0369A1" strokeWidth="0.9" />
            {i <= nomor ? <rect x="2.9" y={i === nomor ? 12 : 7} width="6.2" height={i === nomor ? 9.2 : 14.2} rx="2" fill="#38BDF8" /> : null}
          </svg>
        ))}
      </div>
    );
  if (tema === "milimeter")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Kotak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 border-2 ${i === nomor ? "animate-pulse border-[#15803D] bg-[#86EFAC]" : i < nomor ? "border-[#15803D] bg-[#16A34A]" : "border-dashed border-[#16A34A]/60 bg-white/70"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Stempel ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={`h-5 w-5 ${i === nomor ? "animate-pulse" : ""}`} aria-hidden="true">
          <circle cx="10" cy="10" r="8.6" fill="none" stroke={i <= nomor ? "#15803D" : "#94A3B8"} strokeWidth="1.4" strokeDasharray={i <= nomor ? undefined : "2.4 2"} />
          {i < nomor ? <polygon points="10,4 14.6,12 5.4,12" fill="#16A34A" /> : null}
          {i < nomor ? <polygon points="10,8 15.2,15.4 4.8,15.4" fill="#15803D" /> : null}
          {i < nomor ? <rect x="9.2" y="15.2" width="1.6" height="2.4" fill="#78350F" /> : null}
        </svg>
      ))}
    </div>
  );
}

/** Perayaan akhir cerita bab: spanduk PERKEMAHAN SERU MERIAH, api unggun menyala, bintang, dan konfeti jatuh. */
function Perayaan() {
  const konfeti = ["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#A855F7", "#EC4899"];
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-[#312E81] bg-[#1E1B4B] px-3 pb-3 pt-4 text-center" data-uji="perayaan-akhir-bab">
      <style>{`
        @keyframes konfeti-jatuh-b { 0% { transform: translateY(-14px) rotate(0deg); opacity: 1; } 100% { transform: translateY(190px) rotate(300deg); opacity: 0.2; } }
        @keyframes api-menyala-b { 0%, 100% { transform: scale(1) rotate(-2deg); } 50% { transform: scale(1.14) rotate(2deg); } }
        @keyframes bintang-kelip-b { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
        @media (prefers-reduced-motion: reduce) { .konfeti-b, .api-b, .bintang-b { animation: none !important; } }
      `}</style>
      {Array.from({ length: 16 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="konfeti-b pointer-events-none absolute top-0 block h-2 w-1.5 rounded-[1px]"
          style={{ left: `${4 + i * 6}%`, background: konfeti[i % konfeti.length], animation: `konfeti-jatuh-b ${2.6 + (i % 5) * 0.5}s linear ${(i % 7) * 0.35}s infinite` }}
        />
      ))}
      <div className="relative mx-auto mb-2 flex max-w-sm flex-wrap justify-center gap-3 text-xl" aria-hidden="true">
        {["\u{2B50}", "\u{1F319}", "\u{2B50}", "\u{2728}", "\u{2B50}"].map((b, i) => (
          <span key={i} className="bintang-b" style={{ animation: `bintang-kelip-b ${1.6 + i * 0.3}s ease-in-out infinite` }}>
            {b}
          </span>
        ))}
      </div>
      <p className="relative mx-auto max-w-sm rounded-md border-4 border-[#FDE68A] bg-[#B91C1C] px-3 py-2 text-lg font-black tracking-wide text-[#FEF3C7] shadow-[0_4px_0_rgba(0,0,0,0.35)]">PERKEMAHAN SERU MERIAH</p>
      <div className="relative mt-2 flex items-end justify-center gap-3" aria-hidden="true">
        <span className="text-3xl">{"\u{26FA}"}</span>
        <span className="api-b text-5xl" style={{ animation: "api-menyala-b 1.1s ease-in-out infinite" }}>
          {"\u{1F525}"}
        </span>
        <span className="text-3xl">{"\u{1F392}"}</span>
      </div>
      <p className="relative mt-2 text-sm font-black text-[#FDE68A]">{PENUTUP_B}</p>
    </div>
  );
}

export default function TahapBotol({
  umum,
  rupa,
  soal,
  pita,
  teksAkhir,
  poinPenting = false,
}: {
  umum: Umum;
  rupa: Rupa;
  soal: SoalMisi[];
  pita: { ikon: string; nama: string; cara: string };
  teksAkhir: string;
  poinPenting?: boolean;
}) {
  const tema: Tema = rupa === "benda" ? "pos" : rupa === "diagram" ? "milimeter" : "catatan";
  const [s, setS] = useState(0);
  const [l, setL] = useState(0);
  const [benar, setBenar] = useState(false);
  const [akhir, setAkhir] = useState(false);
  const so = soal[s];
  const ls = so?.langkah[l];

  useEffect(() => {
    if (!ls || akhir) return;
    umum.speakGuru(l === 0 ? `${NAMA_CARA[so.cara]}. ${so.cerita} ${ls.suara}` : ls.suara);
    // Hanya saat tugas berganti.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, l, akhir]);

  const selesaiTahap = () => {
    umum.hentikan();
    umum.onSelesai();
  };
  const lanjut = () => {
    setBenar(false);
    if (l < so.langkah.length - 1) setL(l + 1);
    else if (s < soal.length - 1) {
      setS(s + 1);
      setL(0);
    } else if (poinPenting) {
      setAkhir(true);
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_B}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-md border-[6px] border-[#94A3B8] bg-white shadow-[0_6px_0_rgba(71,85,105,0.3)]">
        <div className="space-y-3 rounded-sm p-4" style={LATAR.catatan}>
          <p className="text-center text-lg font-black text-[#B91C1C]">{"\u{1F4CC}"} Poin Penting: Kalimat Matematika Pengurangan</p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#94A3B8] bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#15803D] text-[10px] font-black text-[#15803D]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <Perayaan />
          <div className="flex justify-center">
            <button type="button" className={TOMBOL_UTAMA} onClick={selesaiTahap}>
              {teksAkhir}
            </button>
          </div>
        </div>
      </div>
    );
  if (!so || !ls) return null;

  const terakhirSemua = s === soal.length - 1 && l === so.langkah.length - 1;
  const total = soal.reduce((n, x) => n + x.langkah.length, 0);
  const nomor = soal.slice(0, s).reduce((n, x) => n + x.langkah.length, 0) + l + 1;
  const kepala = tema === "pos" ? "rounded-xl border-4 border-[#92400E] bg-[#FFFBEB]" : tema === "milimeter" ? "rounded-md border-2 border-[#16A34A] bg-white" : "rounded-md border-2 border-dashed border-[#94A3B8] bg-white";
  const papan = tema === "pos" ? "rounded-2xl border-4 border-[#92400E]" : tema === "milimeter" ? "rounded-md border-2 border-[#16A34A]" : "rounded-md border-2 border-dashed border-[#94A3B8]";
  const warnaKepala = tema === "milimeter" ? "text-[#166534]" : tema === "pos" ? "text-[#9A3412]" : "text-[#B91C1C]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
        </p>
        <p className="text-base font-black text-[#1C01A5]">{so.judul}</p>
        <p className="text-sm font-bold text-[#1C01A5]/80">{so.cerita}</p>
      </div>

      <Kemajuan tema={tema} nomor={nomor} total={total} />

      <div className="flex justify-center gap-1.5">
        {soal.map((x, i) => (
          <span key={x.cara} className={`rounded-full px-2.5 py-0.5 text-xs font-black ${i === s ? "bg-[#FACC15] text-[#1C01A5]" : i < s ? "bg-[#DCFCE7] text-[#15803D]" : "bg-white/80 text-[#1C01A5]/50"}`}>
            {IKON_CARA[x.cara]} {NAMA_CARA[x.cara]}
          </span>
        ))}
      </div>

      <div className={`bg-white/95 p-3 ${papan}`}>
        <div className="mb-2 flex items-start gap-2">
          <button type="button" onClick={() => umum.speakGuru(ls.suara)} aria-label="Dengar petunjuk" className="shrink-0 rounded-full border-2 border-[#475569] bg-[#F1F5F9] px-2 py-1 text-sm">
            {"\u{1F50A}"}
          </button>
          <div>
            <p className="text-xs font-black text-[#475569]">
              Tugas {nomor} dari {total} · {cariSalah ? "\u{1F50E} Cari kesalahan · " : ""}
              {rupa === "benda" ? `${IKON_METODE[ls.metode]} ` : ""}
              {NAMA_METODE[ls.metode]}
            </p>
            <p className="text-sm font-black text-[#1C01A5]">{ls.judul}</p>
          </div>
        </div>
        <LangkahBotol key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
      </div>

      {benar ? (
        <div className="flex justify-center">
          <button type="button" onClick={lanjut} className={TOMBOL_UTAMA}>
            {terakhirSemua ? (poinPenting ? "LIHAT POIN PENTING ⬇️" : teksAkhir) : l < so.langkah.length - 1 ? "TUGAS BERIKUTNYA ➡️" : `LANJUT: ${NAMA_CARA[soal[s + 1].cara].toUpperCase()} ➡️`}
          </button>
        </div>
      ) : null}
    </div>
  );
  if (tema === "pos")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#92400E] bg-[#92400E] shadow-[0_6px_0_rgba(69,26,3,0.4)]">
        <div className="h-3 bg-[#B7814A]" aria-hidden="true" />
        {isi}
        <div className="h-3 bg-[#B7814A]" aria-hidden="true" />
      </div>
    );
  if (tema === "milimeter") return <div className="rounded-lg border-[6px] border-[#16A34A] bg-[#ECFDF5] shadow-[0_6px_0_rgba(22,101,52,0.3)]">{isi}</div>;
  return <div className="rounded-md border-[6px] border-[#94A3B8] bg-white shadow-[0_6px_0_rgba(71,85,105,0.3)]">{isi}</div>;
}
