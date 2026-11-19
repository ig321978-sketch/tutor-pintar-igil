"use client";

import React, { useEffect, useState } from "react";
import type { Umum } from "../SubBabBBanding";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";
import { IKON_CARA, IKON_METODE, NAMA_CARA, NAMA_METODE, type Rupa, type SoalMisi } from "./logika-cpa";
import { LangkahTiket } from "./LangkahTiket";
import { PENUTUP_A, POIN_PENTING, POIN_PENTING_SUARA } from "./data";

/**
 * Tahap Concrete, Pictorial, atau Abstract Kelas 4 Bab 1 Sub-Bab A: dua belas tugas lanjutan Misi Tiket
 * (Klik, Tulis di kanvas, Rekam suara; masing-masing empat metode, tugas Klik memuat Cari kesalahan). Pola visual tiap tahap baru,
 * berbeda dari Kelas 1 sampai 3 dan Sub-Bab lain Bab ini: Concrete = loket beratap rumbia berdinding anyaman, kemajuan berupa deret tiket kecil;
 * Pictorial = kertas denah pulau berpetak biru muda, kemajuan berupa deret petak; Abstract = daftar tiket Bu Maya berkertas bergaris oranye dengan cap tiket, kemajuan berupa deret cap kecil.
 * Abstract diakhiri Poin Penting dan jembatan ke Sub-Bab B. Tanpa skor.
 */

type Tema = "loket" | "denah" | "daftar";
const LATAR: Record<Tema, React.CSSProperties> = {
  loket: {
    backgroundColor: "#F6E3B4",
    backgroundImage: "repeating-linear-gradient(45deg,rgba(161,98,7,0.2) 0 2px,transparent 2px 14px),repeating-linear-gradient(-45deg,rgba(161,98,7,0.14) 0 2px,transparent 2px 14px)",
  },
  denah: {
    backgroundColor: "#E0F2FE",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(14,116,148,0.22) 0 1px,transparent 1px 22px),repeating-linear-gradient(90deg,rgba(14,116,148,0.22) 0 1px,transparent 1px 22px)",
  },
  daftar: {
    backgroundColor: "#FFF7ED",
    backgroundImage: "repeating-linear-gradient(0deg,rgba(194,65,12,0.22) 0 1px,transparent 1px 26px),linear-gradient(90deg,rgba(220,38,38,0.35) 0 2px,transparent 2px)",
    backgroundSize: "auto, 34px 100%",
    backgroundRepeat: "repeat, no-repeat",
  },
};
const PITA_RUMBIA = ["#FDE68A", "#FCD34D", "#F59E0B", "#FDBA74", "#FCA5A5"];

/** Tiket kecil (kotak bertakik) untuk kemajuan Concrete. */
function TiketKecil({ keadaan }: { keadaan: "lalu" | "kini" | "nanti" }) {
  const isi = keadaan === "nanti" ? "transparent" : keadaan === "kini" ? "#FDE68A" : "#FDBA74";
  return (
    <svg viewBox="0 0 22 14" width={22} height={14} aria-hidden="true" className={keadaan === "kini" ? "animate-pulse" : ""}>
      <rect x={1} y={1} width={20} height={12} rx={2} fill={isi} stroke="#9A3412" strokeWidth={1.4} strokeDasharray={keadaan === "nanti" ? "3 2" : undefined} />
      <circle cx={1} cy={7} r={2} fill="#F6E3B4" stroke="#9A3412" strokeWidth={1} />
      <circle cx={21} cy={7} r={2} fill="#F6E3B4" stroke="#9A3412" strokeWidth={1} />
    </svg>
  );
}

function Kemajuan({ tema, nomor, total }: { tema: Tema; nomor: number; total: number }) {
  const n = Array.from({ length: total }, (_, i) => i + 1);
  if (tema === "loket")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Tiket ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <TiketKecil key={i} keadaan={i === nomor ? "kini" : i < nomor ? "lalu" : "nanti"} />
        ))}
      </div>
    );
  if (tema === "denah")
    return (
      <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Petak ${Math.min(nomor, total)} dari ${total}`}>
        {n.map((i) => (
          <span key={i} aria-hidden="true" className={`block h-3.5 w-3.5 border-2 ${i === nomor ? "animate-pulse border-[#0E7494] bg-[#BAE6FD]" : i < nomor ? "border-[#0E7494] bg-[#0E7494]" : "border-dashed border-[#0E7494]/50 bg-transparent"}`} />
        ))}
      </div>
    );
  return (
    <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-1 px-2 py-1" aria-label={`Cap ${Math.min(nomor, total)} dari ${total}`}>
      {n.map((i) => (
        <span key={i} aria-hidden="true" className={`block h-3 w-3 rounded-sm border-2 ${i === nomor ? "animate-pulse border-[#C2410C] bg-[#FED7AA]" : i < nomor ? "border-[#9A3412] bg-[#EA580C]" : "border-dashed border-[#9A3412]/50 bg-transparent"}`} />
      ))}
    </div>
  );
}

export default function TahapTiket({
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
  const tema: Tema = rupa === "benda" ? "loket" : rupa === "diagram" ? "denah" : "daftar";
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
      umum.speakGuru(`Poin penting. ${POIN_PENTING_SUARA.join(" ")} ${PENUTUP_A}`);
    } else selesaiTahap();
    umum.gulir();
  };

  if (akhir)
    return (
      <div className="rounded-xl border-[10px] border-[#C2410C] bg-[#C2410C] shadow-[0_6px_0_rgba(124,45,18,0.4)]">
        <div className="space-y-3 rounded-md p-4" style={LATAR.daftar}>
          <p className="text-center text-lg font-black text-[#7C2D12]">
            {"\u{1F3AB}"} Poin Penting: Membaca dan Menulis Bilangan
          </p>
          <ul className="space-y-1.5">
            {POIN_PENTING.map((p, i) => (
              <li key={p} className="flex items-start gap-2 rounded-md border-2 border-dashed border-[#9A3412] bg-white/90 px-3 py-2 text-sm font-bold text-[#7C2D12]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#DC2626] bg-[#FEE2E2] text-[10px] font-black text-[#991B1B]">{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="rounded-2xl border-4 border-[#FACC15] bg-[#FFFBEB] px-3 py-2 text-center text-sm font-black text-[#78350F]">
            {"\u{1F4E3}"} {PENUTUP_A}
          </p>
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
  const kepala = tema === "loket" ? "rounded-xl border-4 border-[#A16207] bg-white" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#0E7494] bg-white" : "rounded-md border-4 border-[#C2410C] bg-white";
  const papan = tema === "loket" ? "rounded-2xl border-4 border-[#A16207]" : tema === "denah" ? "rounded-md border-2 border-dashed border-[#0E7494]" : "rounded-md border-4 border-[#C2410C]";
  const warnaKepala = tema === "loket" ? "text-[#92400E]" : tema === "denah" ? "text-[#0E7494]" : "text-[#C2410C]";
  const cariSalah = ls.langkah.tipe === "salah";
  const isi = (
    <div className="space-y-3 rounded-2xl p-3" style={LATAR[tema]}>
      <style>{CSS_LEMARI}</style>
      {tema === "loket" ? (
        <div className="mx-auto flex max-w-[420px] items-center gap-1" aria-hidden="true">
          <span className="rounded-sm border-2 border-[#A16207] bg-[#FEF3C7] px-1.5 text-[9px] font-black text-[#92400E]">LOKET TIKET</span>
          {PITA_RUMBIA.map((w) => (
            <span key={w} className="block h-3 flex-1 rounded-sm border border-[#A16207]/60" style={{ backgroundColor: w }} />
          ))}
        </div>
      ) : null}
      <div className={`p-2 ${kepala}`}>
        <p className={`text-xs font-black uppercase tracking-wide ${warnaKepala}`}>
          {pita.ikon} {pita.nama} · {pita.cara}
          {tema === "daftar" ? (
            <span className="ml-1 inline-block -rotate-6 rounded border-2 border-[#C2410C] bg-[#FFEDD5] px-1 text-[10px] text-[#C2410C]" aria-hidden="true">
              {"\u{1F3AB}"} cap
            </span>
          ) : null}
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
        <LangkahTiket key={`${s}-${l}`} ls={ls} rupa={rupa} bicara={umum.speakGuru} onBenar={() => setBenar(true)} />
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
  if (tema === "loket")
    return (
      <div className="overflow-hidden rounded-3xl border-[8px] border-[#A16207] bg-[#F6E3B4] shadow-[0_6px_0_rgba(113,63,18,0.35)]">
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#A16207 0 4px,#FDE68A 4px 24px)" }} aria-hidden="true" />
        {isi}
        <div className="h-3" style={{ backgroundImage: "repeating-linear-gradient(90deg,#A16207 0 4px,#FDE68A 4px 24px)" }} aria-hidden="true" />
      </div>
    );
  if (tema === "denah") return <div className="rounded-lg border-[10px] border-dashed border-[#0E7494] bg-[#E0F2FE] shadow-[0_6px_0_rgba(8,47,73,0.3)]">{isi}</div>;
  return <div className="rounded-xl border-[10px] border-[#C2410C] bg-[#C2410C] shadow-[0_6px_0_rgba(124,45,18,0.4)]">{isi}</div>;
}
