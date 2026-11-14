"use client";

import React, { useMemo, useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { BendaSeret, LencanaSuara, TombolSuaraGuru, zonaDi } from "./tahap-b-gaya";
import {
  acakTab,
  awalSusun,
  idSel,
  jumlahPasang,
  kembalikanTab,
  letakkanTab,
  pilihTab,
  semuaPasang,
  tabDiBaki,
  tabDiTempat,
  tabTabel,
  tempatTabel,
  type DataTabelSusun,
  type KeadaanSusun,
} from "./susun-logika";

/* ------------------------------------------------------------------------ */
/* Infografis tabel susun (tahap 3). Tabel ringkasan dengan sel kosong. Tab     */
/* isi sel acak di baki. Siswa menyeret atau mengetuk tab, lalu menaruhnya di   */
/* baris dan kolom yang benar. Yang belum cocok kembali ke baki. Tanpa skor.    */
/* Logika: susun-logika.ts. Tanpa jaringan, tanpa LLM.                         */
/* ------------------------------------------------------------------------ */

export const IGIL_TABEL_SUSUN_UI = "tabel-susun-v1";

export default function InfografisTabelSusun({
  data,
  benih = 1,
  maskot,
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  data: DataTabelSusun;
  /** Benih pengacakan tetap supaya urutan tab sama di server dan klien. */
  benih?: number;
  maskot?: React.ReactNode;
  speakGuru: (teks: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const tabs = useMemo(() => tabTabel(data), [data]);
  const tempat = useMemo(() => tempatTabel(data), [data]);
  const urutBaki = useMemo(() => acakTab(tabs, benih + 7), [tabs, benih]);
  const [k, setK] = useState<KeadaanSusun>(awalSusun);
  const [tegur, setTegur] = useState(false);

  const total = tempat.length;
  const siap = semuaPasang(tempat, k);
  const bakiSemua = tabDiBaki(tabs, k);
  const baki = urutBaki.filter((t) => bakiSemua.includes(t));
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
    if (t && baru.dipilih === id) speakGuru(`${t.teks}. Ketuk kotak tabel yang cocok.`);
  };

  const ketukSel = (tempatId: string) => {
    if (k.pasang[tempatId]) {
      setK((s) => kembalikanTab(s, tempatId));
      return;
    }
    if (!k.dipilih) {
      setK((s) => ({ ...s, kabar: { jenis: "info", teks: "Pilih tab dulu di bawah, lalu ketuk kotak tabel ini." } }));
      return;
    }
    terapkan(letakkanTab(tabs, tempat, k, k.dipilih, tempatId));
  };

  const lepasTab = (id: string, x: number, y: number) => {
    const zona = zonaDi(x, y);
    if (zona && zona.startsWith("sel-")) terapkan(letakkanTab(tabs, tempat, k, id, zona.slice("sel-".length)));
  };

  const lanjut = () => {
    if (!siap) {
      setTegur(true);
      speakGuru(`Isi semua kotak tabel dulu, ya. Tinggal ${total - jumlahPasang(k)} lagi.`);
      return;
    }
    onLanjut();
  };

  const status = siap ? "🌟 Hebat! Tabelmu sudah lengkap." : `Kotak terisi: ${jumlahPasang(k)} dari ${total}`;
  const kolomGrid = `minmax(4.5rem,0.9fr) repeat(${data.kolom.length}, minmax(0,1fr))`;

  return (
    <div data-igil-tabel-ui={IGIL_TABEL_SUSUN_UI} role="region" aria-label={`Infografis ${data.judul}`}>
      <BingkaiTahap tahap={3} className="space-y-2.5">
        {dipilih ? (
          <div
            role="status"
            className="igil-muncul sticky top-0 z-20 flex items-center gap-2 rounded-2xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2.5 py-1.5 shadow-[0_4px_0_rgba(28,1,165,0.25)]"
          >
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[10px] font-black uppercase tracking-wide text-[#7C4A03]">✋ Tab di tanganmu • ketuk kotak yang cocok</span>
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
            onClick={() => speakGuru(`${data.suara} ${data.petunjuk}`)}
            aria-label={`Dengarkan: ${data.petunjuk}`}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-left text-sm font-black leading-snug text-[#1C01A5]"
          >
            <span className="min-w-0 flex-1">{data.petunjuk}</span>
            <LencanaSuara kelas="h-8 w-8" />
          </button>
        </div>

        <p className="text-center text-lg font-black leading-tight text-[#1C01A5]">{data.judul}</p>

        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white" role="table" aria-label={data.judul}>
          <div role="row" className="grid bg-[#1C01A5] text-center text-xs font-black text-[#FFE566]" style={{ gridTemplateColumns: kolomGrid }}>
            <div role="columnheader" className="px-1 py-1.5 text-left">
              {data.pojok}
            </div>
            {data.kolom.map((c) => (
              <div key={c} role="columnheader" className="border-l-2 border-[#FFE566]/40 px-1 py-1.5 leading-tight">
                {c}
              </div>
            ))}
          </div>
          {data.baris.map((b, bi) => (
            <div key={b.label} role="row" className="grid border-t-2 border-[#1C01A5]/30" style={{ gridTemplateColumns: kolomGrid }}>
              <div role="rowheader" className="flex items-center gap-1 bg-[#EEF2FF] px-1.5 py-1 text-xs font-black leading-tight text-[#1C01A5]">
                {b.ikon ? <span aria-hidden="true">{b.ikon}</span> : null}
                {b.label}
              </div>
              {b.sel.map((_, ki) => {
                const id = idSel(bi, ki);
                const tab = tabDiTempat(tabs, k, id);
                return (
                  <div key={id} role="cell" className="border-l-2 border-[#1C01A5]/30 p-0.5">
                    <button
                      type="button"
                      data-zona={`sel-${id}`}
                      aria-label={tab ? `${b.label}, ${data.kolom[ki]}: ${tab.teks}. Ketuk untuk mengembalikan tab` : `${b.label}, ${data.kolom[ki]}, kosong. Ketuk untuk menaruh tab yang dipegang`}
                      onClick={() => ketukSel(id)}
                      className={`flex min-h-[2.6rem] w-full items-center justify-center rounded-xl border-2 px-1 py-0.5 text-center text-xs font-black leading-tight ${
                        tab ? "igil-muncul border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : dipilih ? "border-dashed border-[#1C01A5]/60 bg-white text-[#1C01A5]/50" : "border-dashed border-[#1C01A5]/30 bg-white text-[#1C01A5]/40"
                      }`}
                    >
                      {tab ? tab.teks : dipilih ? "taruh" : "…"}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white/90 px-2.5 py-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            {baki.length === 0 ? "Semua tab sudah di kotaknya" : "Tab: seret atau ketuk, lalu ke kotak tabel yang cocok"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Baki tab">
            {baki.map((t) => (
              <BendaSeret
                key={t.id}
                id={t.id}
                label={`Tab ${t.teks}${k.dipilih === t.id ? ", sedang dipegang" : ""}`}
                onKetuk={ketukTab}
                onMulaiSeret={() => speakGuru(`${t.teks}. Taruh di kotak tabel yang cocok.`)}
                onLepas={lepasTab}
                kelas="rounded-full"
              >
                <span
                  className={`flex items-center rounded-full border-4 bg-[#FFF7CC] px-2.5 py-1 text-xs font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
                    k.dipilih === t.id ? "border-[#F0AB00] ring-4 ring-[#F0AB00]/60" : "border-[#1C01A5]"
                  }`}
                >
                  {t.teks}
                </span>
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
          onClick={() => {
            setK(awalSusun());
            setTegur(false);
          }}
          className="rounded-2xl border-2 border-[#1C01A5] bg-white px-4 py-2.5 text-xs font-black text-[#1C01A5] shadow-md md:text-sm"
        >
          ↺ Ulangi tabel
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
              Isi semua kotak tabel dulu, ya.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
