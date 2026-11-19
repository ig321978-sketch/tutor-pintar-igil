"use client";

import React, { useMemo, useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";

/**
 * Infografis berbentuk tabel dengan label di bawah tiap baris (Kelas 2 Bab 6 dan seterusnya): tabel data Story dengan tiga kolom; tiap baris satu kejadian.
 * Label milik baris itu diletakkan di bawah barisnya dalam urutan acak, jadi anak melihat tabel dan labelnya sekaligus dan tidak tersesat walau halamannya panjang.
 * Satu baris penuh dan beberapa kotak lain terisi sejak awal sebagai contoh (Label Contoh). Label `s` = ucapan guru (tanpa digit) bila tulisan layar memuat angka.
 */
export type Isian = { t: string; s?: string };
export type BarisInfo = { ikon: string; nama: string; isi: readonly [Isian, Isian, Isian]; contoh: readonly number[] };
export type TemaInfo = { bingkai: string; latar: string; aksen: string; teduh: string; ikon: string; judul: string };

const PESAN_AWAL = "Ketuk label di bawah baris, lalu ketuk kotak yang cocok.";

/** Urutan acak yang tetap (benih per baris), dan dijamin berbeda dari urutan kolom bila labelnya lebih dari satu. */
export function acakLabel(kolom: readonly number[], benih: number): number[] {
  const a = [...kolom];
  let s = benih * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i -= 1) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every((v, i) => v === kolom[i])) a.push(a.shift() as number);
  return a;
}

export default function InfografisKartu({
  baris,
  kolom,
  tema,
  suaraAwal,
  pesanSelesai,
  speakGuru,
  onLanjut,
  teksLanjut,
}: {
  baris: readonly BarisInfo[];
  kolom: readonly [string, string, string];
  tema: TemaInfo;
  suaraAwal: string;
  pesanSelesai: string;
  speakGuru: (t: string) => void;
  onLanjut: () => void;
  teksLanjut: string;
}) {
  const [isi, setIsi] = useState<Record<number, number[]>>({});
  const [pilih, setPilih] = useState<{ b: number; c: number } | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [pesan, setPesan] = useState<{ b: number; t: string } | null>(null);

  const urutLabel = useMemo(() => baris.map((r, b) => acakLabel([0, 1, 2].filter((c) => !r.contoh.includes(c)), b + 3)), [baris]);
  const terisi = (b: number, c: number) => baris[b].contoh.includes(c) || (isi[b] ?? []).includes(c);
  const lengkap = (b: number) => [0, 1, 2].every((c) => terisi(b, c));
  const semua = baris.every((_, b) => lengkap(b));
  const suara = (x: Isian) => x.s ?? x.t;

  const ucap = (b: number, t: string) => {
    setPesan({ b, t });
    speakGuru(t);
  };
  const ketukLabel = (b: number, c: number) => {
    setPilih({ b, c });
    ucap(b, suara(baris[b].isi[c]));
  };
  const ketukKotak = (b: number, c: number) => {
    if (terisi(b, c)) {
      ucap(b, baris[b].contoh.includes(c) ? `Ini contoh. ${suara(baris[b].isi[c])}` : suara(baris[b].isi[c]));
      return;
    }
    if (!pilih) {
      setPesan({ b, t: "Pilih satu label dulu, lalu ketuk kotaknya." });
      return;
    }
    if (pilih.b === b && pilih.c === c) {
      setIsi((s) => ({ ...s, [b]: [...(s[b] ?? []), c] }));
      setPilih(null);
      const masihAda = [0, 1, 2].some((x) => x !== c && !terisi(b, x));
      const tersisa = baris.some((_, bb) => [0, 1, 2].some((x) => !(bb === b && x === c) && !terisi(bb, x)));
      const baris1 = `Baris lengkap! ${baris[b].nama}: ${suara(baris[b].isi[0])}, ${suara(baris[b].isi[1])}, ${suara(baris[b].isi[2])}.`;
      ucap(b, masihAda ? "Pas!" : tersisa ? baris1 : `${baris1} ${pesanSelesai}`);
    } else if (pilih.b !== b) {
      setGoyang(`${b}-${c}`);
      window.setTimeout(() => setGoyang(null), 480);
      ucap(b, `Belum pas. Label itu milik baris ${baris[pilih.b].nama}, bukan baris ${baris[b].nama}.`);
    } else {
      setGoyang(`${b}-${c}`);
      window.setTimeout(() => setGoyang(null), 480);
      ucap(b, `Belum pas. Kolomnya keliru. Label ini cocok di kolom ${kolom[pilih.c]}.`);
    }
  };

  const KOL = "3rem repeat(3, minmax(0, 1fr))";
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
        <button type="button" onClick={() => speakGuru(suaraAwal)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
          {"\u{1F50A}"}
        </button>
        <p className="text-sm font-bold leading-snug text-[#1C01A5]">Label tiap baris ada di bawah barisnya. Kotak bertanda contoh sudah terisi.</p>
      </div>

      <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] p-2" style={{ borderColor: tema.bingkai, background: tema.latar }}>
        <p className="mb-1 text-center text-base font-black text-[#1C01A5]">
          {tema.ikon} {tema.judul}
        </p>
        <div className="grid gap-1 text-center text-[10px] font-black leading-tight sm:text-xs" style={{ gridTemplateColumns: KOL }}>
          <span />
          {kolom.map((k) => (
            <span key={k} className="rounded-md px-0.5 py-1 text-white [overflow-wrap:break-word]" style={{ background: tema.aksen }}>
              {k}
            </span>
          ))}
        </div>

        {baris.map((r, b) => {
          const sisa = urutLabel[b].filter((c) => !terisi(b, c));
          const selesai = lengkap(b);
          return (
            <div key={r.nama} className="mt-1.5 rounded-xl border-2 bg-white/60 p-1" style={{ borderColor: tema.aksen }}>
              <div className="grid items-stretch gap-1" style={{ gridTemplateColumns: KOL }}>
                <span className="flex flex-col items-center justify-center text-center text-[8.5px] font-black leading-tight text-[#1C01A5] [overflow-wrap:break-word]">
                  <span className="text-xl" aria-hidden="true">
                    {r.ikon}
                  </span>
                  {r.nama}
                </span>
                {[0, 1, 2].map((c) => {
                  const ok = terisi(b, c);
                  const contoh = r.contoh.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => ketukKotak(b, c)}
                      aria-label={ok ? `${contoh ? "Contoh: " : ""}${r.nama}, ${kolom[c]}: ${r.isi[c].t}` : `Kotak kosong, ${r.nama}, kolom ${kolom[c]}`}
                      className={`relative flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-lg border-2 px-1 text-center text-[10px] font-black leading-tight text-[#1C01A5] [overflow-wrap:break-word] sm:text-xs ${ok ? "lm-muncul" : "border-dashed bg-white/90"} ${goyang === `${b}-${c}` ? "lm-goyang" : ""} ${contoh ? "!pt-3" : ""}`}
                      style={{ borderColor: tema.aksen, background: ok ? tema.teduh : undefined }}
                    >
                      {ok ? r.isi[c].t : "?"}
                      {contoh ? (
                        <span className="pointer-events-none absolute -top-2 right-1 rounded-full bg-[#1C01A5] px-1 text-[8px] font-black leading-3 text-white" aria-hidden="true">
                          contoh
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {selesai ? null : (
                <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5 rounded-lg border-2 border-dashed bg-white/80 p-1.5" style={{ borderColor: tema.aksen }} role="group" aria-label={`Label baris ${r.nama}`}>
                  {sisa.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => ketukLabel(b, c)}
                      aria-pressed={pilih?.b === b && pilih.c === c}
                      className={`rounded-md border-[3px] bg-white px-2 py-1 text-xs font-black text-[#1C01A5] sm:text-sm ${pilih?.b === b && pilih.c === c ? "outline outline-4 outline-[#1C01A5]" : ""}`}
                      style={{ borderColor: tema.aksen }}
                    >
                      {r.isi[c].t}
                    </button>
                  ))}
                </div>
              )}
              <p role="status" aria-live="polite" className="min-h-[1.1rem] text-center text-xs font-black text-[#1C01A5]">
                {pesan?.b === b && !semua ? pesan.t : selesai ? "✓ Baris lengkap" : ""}
              </p>
            </div>
          );
        })}
        <p className="mt-2 text-center text-xs font-black text-[#1C01A5]">{semua ? "" : PESAN_AWAL}</p>
      </div>

      {semua ? (
        <div className="space-y-2">
          <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#15803D]">
            {pesanSelesai}
          </p>
          <div className="flex justify-center">
            <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
              {teksLanjut}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
