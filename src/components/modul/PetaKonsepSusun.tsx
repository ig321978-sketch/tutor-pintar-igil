"use client";

import React, { useMemo, useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { BendaSeret, LencanaSuara, TombolSuaraGuru, zonaDi } from "./tahap-b-gaya";
import {
  acakTab,
  awalSusun,
  jumlahPasang,
  kembalikanTab,
  letakkanTab,
  pilihTab,
  semuaPasang,
  tabDiBaki,
  tabDiTempat,
  tabPeta,
  tempatPeta,
  type DataPetaSusun,
  type KeadaanSusun,
  type SimpulPeta,
  type TabSusun,
} from "./susun-logika";

/* ------------------------------------------------------------------------ */
/* Mind-Map susun (tahap 2). Peta konsep berisi simpul putih bernomor. Tab      */
/* jawabannya acak di baki. Siswa menyeret atau mengetuk tab, lalu menaruhnya   */
/* di nomor yang cocok. Tab yang belum cocok kembali ke baki. Tanpa skor.       */
/* Logika: susun-logika.ts. Tanpa jaringan, tanpa LLM.                         */
/* ------------------------------------------------------------------------ */

export const IGIL_PETA_SUSUN_UI = "peta-susun-v1";

const GARIS = "#1C01A5";
const WARNA_TINGKAT = [
  { tepi: "#2563EB", isi: "#DBEAFE" },
  { tepi: "#7C3AED", isi: "#EDE9FE" },
  { tepi: "#0F766E", isi: "#CCFBF1" },
];

function anak(d: DataPetaSusun, id: string | null): SimpulPeta[] {
  return d.simpul.filter((s) => s.induk === id);
}

function TabKartu({ t, dipegang, kecil = false }: { t: TabSusun; dipegang?: boolean; kecil?: boolean }) {
  return (
    <span
      className={`flex items-center gap-1 rounded-full border-4 bg-[#FFF7CC] font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
        kecil ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"
      } ${dipegang ? "border-[#F0AB00] ring-4 ring-[#F0AB00]/60" : "border-[#1C01A5]"}`}
    >
      {t.ikon ? (
        <span className="text-lg leading-none" aria-hidden="true">
          {t.ikon}
        </span>
      ) : null}
      {t.teks}
    </span>
  );
}

export default function PetaKonsepSusun({
  data,
  judul,
  benih = 1,
  maskot,
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  data: DataPetaSusun;
  /** Judul sub-bab, dipakai untuk label aksesibilitas. */
  judul: string;
  /** Benih pengacakan tetap (mis. nomor sub-bab) supaya urutan tab sama di server dan klien. */
  benih?: number;
  maskot?: React.ReactNode;
  speakGuru: (teks: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const tabs = useMemo(() => tabPeta(data), [data]);
  const tempat = useMemo(() => tempatPeta(data), [data]);
  const urutBaki = useMemo(() => acakTab(tabs, benih), [tabs, benih]);
  const [k, setK] = useState<KeadaanSusun>(awalSusun);
  const [tegur, setTegur] = useState(false);

  const total = tempat.length;
  const siap = semuaPasang(tempat, k);
  const baki = urutBaki.filter((t) => tabDiBaki(tabs, k).includes(t));
  const dipilih = k.dipilih ? tabs.find((t) => t.id === k.dipilih) ?? null : null;

  const terapkan = (baru: KeadaanSusun) => {
    setK(baru);
    setTegur(false);
    if (baru.kabar && baru.kabar.jenis !== "info") speakGuru(baru.kabar.teks);
  };

  const ketukTab = (id: string) => {
    const baru = pilihTab(tabs, k, id);
    setK(baru);
    setTegur(false);
    const t = tabs.find((x) => x.id === id);
    if (t && baru.dipilih === id) speakGuru(`${t.teks}. Ketuk nomor yang cocok.`);
  };

  const ketukTempat = (tempatId: string) => {
    if (k.pasang[tempatId]) {
      setK((s) => kembalikanTab(s, tempatId));
      return;
    }
    if (!k.dipilih) {
      setK((s) => ({ ...s, kabar: { jenis: "info", teks: "Pilih tab dulu di bawah, lalu ketuk nomor ini." } }));
      return;
    }
    terapkan(letakkanTab(tabs, tempat, k, k.dipilih, tempatId));
  };

  const lepasTab = (id: string, x: number, y: number) => {
    const zona = zonaDi(x, y);
    if (zona && zona.startsWith("susun-")) terapkan(letakkanTab(tabs, tempat, k, id, zona.slice("susun-".length)));
  };

  const ulang = () => {
    setK(awalSusun());
    setTegur(false);
  };

  const lanjut = () => {
    if (!siap) {
      setTegur(true);
      speakGuru(`Pasang semua tab dulu, ya. Tinggal ${total - jumlahPasang(k)} lagi.`);
      return;
    }
    onLanjut();
  };

  const renderNode = (s: SimpulPeta, tingkat: number): React.ReactNode => {
    const tab = tabDiTempat(tabs, k, s.id);
    const warna = WARNA_TINGKAT[Math.min(tingkat, WARNA_TINGKAT.length) - 1];
    const anakAnak = anak(data, s.id);
    return (
      <li key={s.id} className="relative">
        <span aria-hidden="true" className="pointer-events-none absolute -left-3 top-[1.1rem] h-1 w-3 rounded-full" style={{ backgroundColor: GARIS, opacity: 0.45 }} />
        <button
          type="button"
          data-zona={`susun-${s.id}`}
          aria-label={tab ? `Nomor ${s.nomor}: ${tab.teks}. Ketuk untuk mengembalikan tab` : `Nomor ${s.nomor}, kosong. Ketuk untuk menaruh tab yang dipegang`}
          onClick={() => ketukTempat(s.id)}
          className={`flex min-h-[2.4rem] max-w-full items-center gap-2 rounded-2xl border-4 px-2 py-1 text-left ${tab ? "igil-muncul" : dipilih ? "border-dashed" : ""}`}
          style={{ borderColor: tab ? "#16A34A" : warna.tepi, backgroundColor: tab ? "#DCFCE7" : "#FFFFFF" }}
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
            style={{ backgroundColor: tab ? "#16A34A" : warna.tepi }}
            aria-hidden="true"
          >
            {tab ? "✔" : s.nomor}
          </span>
          {tab ? (
            <span className="text-sm font-black leading-tight text-[#14532D]">
              {tab.ikon ? <span aria-hidden="true">{tab.ikon} </span> : null}
              {tab.teks}
            </span>
          ) : (
            <span className="text-xs font-black text-[#1C01A5]/50">{dipilih ? "taruh di sini" : "…"}</span>
          )}
        </button>
        {anakAnak.length > 0 ? (
          <ul className="relative ml-4 mt-1.5 space-y-1.5 border-l-4 pl-3" style={{ borderColor: "rgba(28,1,165,0.45)" }}>
            {anakAnak.map((c) => renderNode(c, tingkat + 1))}
          </ul>
        ) : null}
      </li>
    );
  };

  const akar = anak(data, null);
  const status = siap ? "🌟 Hebat! Peta konsepmu sudah lengkap." : `Tab terpasang: ${jumlahPasang(k)} dari ${total}`;

  return (
    <div data-igil-peta-ui={IGIL_PETA_SUSUN_UI} role="region" aria-label={`Mind-Map ${judul}`}>
      <BingkaiTahap tahap={2} className="space-y-2.5">
        {dipilih ? (
          <div
            role="status"
            className="igil-muncul sticky top-0 z-20 flex items-center gap-2 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2.5 py-1.5 shadow-[0_4px_0_rgba(28,1,165,0.25)]"
          >
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[10px] font-black uppercase tracking-wide text-[#7C4A03]">✋ Tab di tanganmu • ketuk nomor yang cocok</span>
              <span className="block text-base font-black text-[#1C01A5]">{dipilih.teks}</span>
            </span>
            <TombolSuaraGuru kecil label={`Dengarkan tab ${dipilih.teks}`} onClick={() => speakGuru(dipilih.teks)} />
            <button
              type="button"
              onClick={() => setK((s) => pilihTab(tabs, s, dipilih.id))}
              className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-xs font-black text-[#1C01A5]"
            >
              Lepas
            </button>
          </div>
        ) : null}

        <div className="flex items-end gap-2">
          {maskot}
          <button
            type="button"
            onClick={() => speakGuru(data.petunjuk)}
            aria-label={`Dengarkan: ${data.petunjuk}`}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-left text-sm font-black leading-snug text-[#1C01A5]"
          >
            <span className="min-w-0 flex-1">{data.petunjuk}</span>
            <LencanaSuara kelas="h-8 w-8" />
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => speakGuru(data.pusat.suara)}
            aria-label={`Pusat peta: ${data.pusat.judul}. Ketuk untuk mendengar`}
            className="flex items-center gap-2 rounded-full border-4 border-[#FFE566] bg-[#B45309] px-5 py-2 shadow-[0_5px_0_rgba(28,1,165,0.3)]"
          >
            <span className="text-3xl leading-none" aria-hidden="true">
              {data.pusat.ikon}
            </span>
            <span className="text-xl font-black leading-tight text-white">{data.pusat.judul}</span>
          </button>
        </div>
        <span aria-hidden="true" className="mx-auto block h-3 w-1 rounded-full" style={{ backgroundColor: GARIS, opacity: 0.45 }} />

        <ul className="ml-3 space-y-1.5 border-l-4 pl-3" style={{ borderColor: "rgba(28,1,165,0.45)" }} aria-label={`Simpul peta ${data.pusat.judul}`}>
          {akar.map((s) => renderNode(s, 1))}
        </ul>

        <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white/90 px-2.5 py-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            {baki.length === 0 ? "Semua tab sudah di tempatnya" : "Tab: seret atau ketuk, lalu ke nomor yang cocok"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Baki tab">
            {baki.map((t) => (
              <BendaSeret
                key={t.id}
                id={t.id}
                label={`Tab ${t.teks}${k.dipilih === t.id ? ", sedang dipegang" : ""}`}
                onKetuk={ketukTab}
                onMulaiSeret={() => speakGuru(`${t.teks}. Taruh di nomor yang cocok.`)}
                onLepas={lepasTab}
                kelas="rounded-full"
              >
                <TabKartu t={t} dipegang={k.dipilih === t.id} />
              </BendaSeret>
            ))}
          </div>
        </div>

        {k.kabar && k.kabar.jenis !== "info" ? (
          <p
            role="status"
            className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${
              k.kabar.jenis === "benar" ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"
            }`}
          >
            {k.kabar.jenis === "benar" ? "✅ " : "🤔 "}
            {k.kabar.teks}
          </p>
        ) : null}

        <p
          className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black leading-snug ${
            siap ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-dashed border-[#1C01A5]/40 bg-white/80 text-[#1C01A5]"
          }`}
        >
          {status}
        </p>
      </BingkaiTahap>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
        <button
          type="button"
          onClick={ulang}
          className="rounded-2xl border-2 border-[#1C01A5] bg-white px-4 py-2.5 text-xs font-black text-[#1C01A5] shadow-md md:text-sm"
        >
          ↺ Ulangi peta
        </button>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={lanjut}
            aria-disabled={!siap}
            className={`rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md md:text-sm ${siap ? "" : "opacity-50"}`}
          >
            {teksLanjut}
          </button>
          {siap ? null : (
            <p role="status" className={`text-xs font-black ${tegur ? "text-[#7F1D1D]" : "text-[#1C01A5]/80"}`}>
              Pasang semua tab dulu, ya.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
