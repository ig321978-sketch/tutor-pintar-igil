"use client";

import React, { useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { BendaSeret, LencanaSuara, TombolSuaraGuru, zonaDi } from "./tahap-b-gaya";
import {
  awalPeta,
  jumlahTersusun,
  kartuDiBaki,
  kartuDiCabang,
  ketukCabang,
  kembalikan,
  letakkan,
  pilihKartu,
  semuaDibuka,
  semuaTersusun,
  type CabangPeta,
  type DataPeta,
  type KeadaanPeta,
} from "./peta-konsep-logika";

/* ------------------------------------------------------------------------ */
/* Mind-Map data-driven (tahap 2 SMISCPA). Satu tampilan untuk semua kelas.   */
/* Data: pusat, 3 sampai 4 cabang, dan kartu. Anak mengetuk cabang untuk      */
/* membukanya, lalu menyusun kartu ke cabang yang cocok. Tanpa skor dan       */
/* tanpa hukuman. Ciri tiap kelas hanya warna dan maskot.                     */
/* Logika: peta-konsep-logika.ts. Tanpa jaringan, tanpa LLM.                  */
/* ------------------------------------------------------------------------ */

export const IGIL_PETA_KONSEP_UI = "peta-konsep-v1";

export type KelasPeta = 1 | 2 | 3 | 4 | 5 | 6;

type WarnaCabang = { isi: string; tepi: string; kartu: string };

const WARNA_DASAR: WarnaCabang[] = [
  { isi: "#BFDBFE", tepi: "#2563EB", kartu: "#EFF6FF" },
  { isi: "#FBCFE8", tepi: "#DB2777", kartu: "#FDF2F8" },
  { isi: "#FDE68A", tepi: "#D97706", kartu: "#FFFBEB" },
  { isi: "#BBF7D0", tepi: "#16A34A", kartu: "#F0FDF4" },
  { isi: "#DDD6FE", tepi: "#7C3AED", kartu: "#F5F3FF" },
  { isi: "#FED7AA", tepi: "#EA580C", kartu: "#FFF7ED" },
];

/** Ciri tiap kelas: warna pusat dan urutan warna cabang. Bentuk tampilan sama untuk semua. */
const PUSAT_KELAS: Record<KelasPeta, string> = {
  1: "#1C01A5",
  2: "#5B21B6",
  3: "#0F766E",
  4: "#B45309",
  5: "#9D174D",
  6: "#1E3A8A",
};

export const warnaCabang = (kelas: KelasPeta, urutan: number): WarnaCabang =>
  WARNA_DASAR[(urutan + kelas - 1) % WARNA_DASAR.length];

const GARIS = "#1C01A5";
const TINGGI_PENGAIT = "1.75rem";

function KartuCabang({
  cabang,
  urutan,
  warna,
  dibuka,
  aktif,
  menunggu,
  jumlah,
  terakhirBaris,
  kolom,
  sendirian,
  onKetuk,
}: {
  cabang: CabangPeta;
  urutan: number;
  warna: WarnaCabang;
  dibuka: boolean;
  aktif: boolean;
  menunggu: boolean;
  jumlah: number;
  terakhirBaris: boolean;
  kolom: 0 | 1;
  sendirian: boolean;
  onKetuk: () => void;
}) {
  return (
    <li
      data-zona={`peta-${cabang.id}`}
      className={`relative ${sendirian ? "col-span-2 mx-auto w-[calc(50%-0.375rem)] min-w-[9.5rem]" : ""}`}
    >
      {/* Penyambung ke batang tengah. Batang berhenti tepat di pengait cabang terakhir. */}
      {sendirian ? null : kolom === 0 ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[0.5rem] top-0 w-1 rounded-full"
            style={{ backgroundColor: GARIS, opacity: 0.45, height: terakhirBaris ? TINGGI_PENGAIT : "calc(100% + 0.75rem)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-[0.5rem] w-2 rounded-full"
            style={{ top: `calc(${TINGGI_PENGAIT} - 0.125rem)`, height: "0.25rem", backgroundColor: GARIS, opacity: 0.45 }}
          />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-[0.5rem] w-2 rounded-full"
          style={{ top: `calc(${TINGGI_PENGAIT} - 0.125rem)`, height: "0.25rem", backgroundColor: GARIS, opacity: 0.45 }}
        />
      )}
      <button
        type="button"
        aria-expanded={dibuka}
        aria-current={aktif ? "true" : undefined}
        aria-label={`Cabang ${urutan + 1}: ${cabang.judul}${dibuka ? ", sudah dibuka" : ", ketuk untuk membuka"}${menunggu ? ". Ketuk untuk menaruh kartu di sini" : ""}`}
        onClick={onKetuk}
        className={`igil-tanpa-tepi relative flex w-full flex-col items-center gap-1 rounded-3xl border-4 px-2 py-2.5 text-center shadow-[0_4px_0_rgba(28,1,165,0.18)] transition-transform ${
          aktif ? "scale-[1.03] ring-4 ring-[#F0AB00]" : ""
        } ${menunggu ? "border-dashed" : ""}`}
        style={{ backgroundColor: dibuka ? warna.isi : warna.kartu, borderColor: warna.tepi }}
      >
        <span className="text-3xl leading-none" aria-hidden="true">
          {cabang.ikon}
        </span>
        <span className="text-base font-black leading-tight text-[#1C01A5]">{cabang.judul}</span>
        {dibuka ? (
          <span className="rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2 text-[11px] font-black text-[#166534]">
            ✔ Dibuka{jumlah > 0 ? ` · ${jumlah} kartu` : ""}
          </span>
        ) : (
          <span className="text-[11px] font-black text-[#1C01A5]/70">{menunggu ? "Taruh kartu di sini" : "Ketuk untuk membuka"}</span>
        )}
      </button>
    </li>
  );
}

export default function PetaKonsep({
  data,
  judul,
  kelas = 1,
  maskot,
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  data: DataPeta;
  /** Judul sub-bab, tampil di lencana kuning. */
  judul: string;
  kelas?: KelasPeta;
  maskot?: React.ReactNode;
  speakGuru: (teks: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [k, setK] = useState<KeadaanPeta>(awalPeta);
  const [sudahSiap, setSudahSiap] = useState(false);
  const [tegur, setTegur] = useState(false);
  const kls = (Math.min(6, Math.max(1, kelas || 1)) as KelasPeta);

  const total = data.cabang.length;
  const dibukaSemua = semuaDibuka(data, k);
  const siap = sudahSiap || dibukaSemua;
  const baki = kartuDiBaki(data, k);
  const cabangAktif = k.aktif ? data.cabang.find((c) => c.id === k.aktif) ?? null : null;
  const urutanAktif = cabangAktif ? data.cabang.indexOf(cabangAktif) : 0;
  const warnaAktif = warnaCabang(kls, urutanAktif);
  const dipilih = k.dipilih ? data.kartu.find((x) => x.id === k.dipilih) ?? null : null;

  /** Terapkan keadaan baru, dan bacakan kabar yang bermakna (bukan petunjuk "ketuk cabang"). */
  const terapkan = (baru: KeadaanPeta, bicara?: string) => {
    setK(baru);
    if (semuaDibuka(data, baru)) setSudahSiap(true);
    if (bicara) speakGuru(bicara);
    setTegur(false);
  };

  const klikCabang = (c: CabangPeta) => {
    const pertama = !k.dibuka.includes(c.id) && !k.dipilih;
    const baru = ketukCabang(data, k, c.id);
    terapkan(baru, pertama ? `${c.judul}. ${c.suara}` : baru.kabar && baru.kabar.jenis !== "info" ? baru.kabar.teks : undefined);
  };

  const lepasKartu = (kartuId: string, x: number, y: number) => {
    const zona = zonaDi(x, y);
    if (zona && zona.startsWith("peta-")) {
      const baru = letakkan(data, k, kartuId, zona.slice("peta-".length));
      terapkan(baru, baru.kabar?.teks);
    }
  };

  const ulang = () => {
    setK(awalPeta());
    setTegur(false);
  };

  const lanjut = () => {
    if (!siap) {
      setTegur(true);
      speakGuru("Ketuk semua cabangnya dulu, ya.");
      return;
    }
    onLanjut();
  };

  const status = !siap
    ? `Cabang dibuka: ${k.dibuka.length} dari ${total}`
    : semuaTersusun(data, k)
      ? "🌟 Hebat! Petamu sudah lengkap."
      : `🌟 Semua cabang sudah dibuka. Kartu tersusun: ${jumlahTersusun(k)} dari ${data.kartu.length}.`;

  return (
    <div data-igil-peta-ui={IGIL_PETA_KONSEP_UI} data-igil-peta-kelas={kls}>
      <BingkaiTahap tahap={2} className="space-y-2.5">
        <div className="flex items-end gap-2">
          {maskot}
          <button
            type="button"
            onClick={() => speakGuru(data.petunjuk)}
            aria-label={`Dengarkan: ${data.petunjuk}`}
            className="igil-tanpa-tepi flex min-w-0 flex-1 items-center gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-left text-sm font-black leading-snug text-[#1C01A5]"
          >
            <span className="min-w-0 flex-1">{data.petunjuk}</span>
            <LencanaSuara kelas="h-8 w-8" />
          </button>
        </div>

        <div className="mx-auto w-fit max-w-full rounded-[2rem] border-4 border-[#1C01A5] bg-[#FFE566] px-4 py-1.5 text-center shadow-[0_4px_0_rgba(28,1,165,0.25)]">
          <p className="text-[10px] font-black tracking-widest text-[#1C01A5]/70">MIND-MAP</p>
          <p className="text-base font-black leading-tight text-[#1C01A5]">{judul}</p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => speakGuru(data.pusat.suara)}
            aria-label={`Pusat peta: ${data.pusat.judul}. Ketuk untuk mendengar`}
            className="igil-tanpa-tepi flex items-center gap-2 rounded-full border-4 border-[#FFE566] px-5 py-2 shadow-[0_5px_0_rgba(28,1,165,0.3)]"
            style={{ backgroundColor: PUSAT_KELAS[kls] }}
          >
            <span className="text-3xl leading-none" aria-hidden="true">
              {data.pusat.ikon}
            </span>
            <span className="text-xl font-black leading-tight text-white">{data.pusat.judul}</span>
          </button>
        </div>
        <span aria-hidden="true" className="mx-auto block h-3 w-1 rounded-full" style={{ backgroundColor: GARIS, opacity: 0.45 }} />

        <ul className="grid grid-cols-2 gap-x-3 gap-y-3" aria-label={`Cabang peta ${data.pusat.judul}`}>
          {data.cabang.map((c, i) => {
            const barisTerakhir = Math.floor(i / 2) === Math.floor((total - 1) / 2);
            const sendirian = total % 2 === 1 && i === total - 1;
            return (
              <KartuCabang
                key={c.id}
                cabang={c}
                urutan={i}
                warna={warnaCabang(kls, i)}
                dibuka={k.dibuka.includes(c.id)}
                aktif={k.aktif === c.id}
                menunggu={k.dipilih !== null}
                jumlah={kartuDiCabang(data, k, c.id).length}
                terakhirBaris={barisTerakhir}
                kolom={(i % 2) as 0 | 1}
                sendirian={sendirian}
                onKetuk={() => klikCabang(c)}
              />
            );
          })}
        </ul>

        <div
          data-zona={cabangAktif ? `peta-${cabangAktif.id}` : undefined}
          className="rounded-3xl border-4 px-3 py-2.5"
          style={{
            borderColor: cabangAktif ? warnaAktif.tepi : "rgba(28,1,165,0.3)",
            backgroundColor: cabangAktif ? warnaAktif.kartu : "rgba(255,255,255,0.8)",
            borderStyle: cabangAktif ? "solid" : "dashed",
          }}
          aria-live="polite"
        >
          {cabangAktif ? (
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-lg font-black leading-tight text-[#1C01A5]">
                    <span aria-hidden="true">{cabangAktif.ikon} </span>
                    {cabangAktif.judul}
                  </p>
                  <p className="text-sm font-bold leading-snug text-[#1C01A5]/85">{cabangAktif.ringkas}</p>
                </div>
                <TombolSuaraGuru kecil label={`Dengarkan cabang ${cabangAktif.judul}`} onClick={() => speakGuru(`${cabangAktif.judul}. ${cabangAktif.suara}`)} />
              </div>
              <div className="flex min-h-[2.5rem] flex-wrap items-center gap-1.5 rounded-2xl border-2 border-dashed border-[#1C01A5]/40 bg-white/80 px-2 py-1.5">
                {kartuDiCabang(data, k, cabangAktif.id).length === 0 ? (
                  <span className="text-xs font-black text-[#1C01A5]/60">Belum ada kartu di sini. Pilih kartu di bawah, lalu ketuk cabangnya.</span>
                ) : null}
                {kartuDiCabang(data, k, cabangAktif.id).map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    aria-label={`${x.teks}. Ketuk untuk mengembalikan ke baki`}
                    onClick={() => setK((s) => kembalikan(data, s, x.id))}
                    className="igil-muncul inline-flex items-center gap-1 rounded-full border-2 border-[#16A34A] bg-[#DCFCE7] px-2.5 py-1 text-sm font-black text-[#14532D]"
                  >
                    <span aria-hidden="true">{x.ikon}</span>
                    {x.teks}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-sm font-black text-[#1C01A5]/80">👆 Ketuk salah satu cabang untuk membukanya.</p>
          )}
        </div>

        <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white/90 px-2.5 py-2">
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
            {baki.length === 0 ? "Semua kartu sudah di cabangnya" : "Kartu: seret atau ketuk, lalu ke cabang yang cocok"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Baki kartu">
            {baki.map((x) => (
              <BendaSeret
                key={x.id}
                id={x.id}
                label={`Kartu ${x.teks}${k.dipilih === x.id ? ", sedang dipegang" : ""}`}
                onKetuk={() => terapkan(pilihKartu(data, k, x.id))}
                onLepas={(id, px, py) => lepasKartu(id, px, py)}
                kelas="rounded-2xl"
              >
                <span
                  className={`flex items-center gap-1.5 rounded-2xl border-4 bg-[#FFF7CC] px-3 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] ${
                    k.dipilih === x.id ? "border-[#F0AB00] ring-4 ring-[#F0AB00]/60" : "border-[#1C01A5]"
                  }`}
                >
                  <span className="text-xl leading-none" aria-hidden="true">
                    {x.ikon}
                  </span>
                  {x.teks}
                </span>
              </BendaSeret>
            ))}
          </div>
        </div>

        {k.kabar && (k.kabar.jenis !== "info" || dipilih) ? (
          <p
            role="status"
            className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${
              k.kabar.jenis === "benar"
                ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
                : k.kabar.jenis === "coba"
                  ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"
                  : "border-[#F0AB00] bg-[#FFF7CC] text-[#7C4A03]"
            }`}
          >
            {k.kabar.jenis === "benar" ? "✅ " : k.kabar.jenis === "coba" ? "🤔 " : "👉 "}
            {k.kabar.teks}
          </p>
        ) : null}

        <div className="flex items-center justify-center gap-2" aria-label={`${k.dibuka.length} dari ${total} cabang dibuka`}>
          {data.cabang.map((c) => (
            <span key={c.id} className="text-2xl" aria-hidden="true">
              {k.dibuka.includes(c.id) ? "⭐" : "☆"}
            </span>
          ))}
        </div>
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
              Ketuk semua cabangnya dulu, ya.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
