"use client";

import React, { useState } from "react";
import { CSS_LEMARI, TOMBOL_UTAMA } from "../lemari-k1b1a/ui";

/**
 * Infografis berbentuk kartu geser (Kelas 2 Bab 6 dan seterusnya): satu kartu = satu kejadian dari Story dengan gambar besar dan tiga isian pendek.
 * Satu baris penuh dan beberapa kotak lain terisi sejak awal sebagai contoh (Label Contoh); sisanya ditempel anak. Setelah semua kartu lengkap,
 * poster tabel ringkasan tampil sebagai hasil. Label `s` = ucapan guru (tanpa digit) bila tulisan layar memuat angka.
 */
export type Isian = { t: string; s?: string };
export type BarisInfo = { ikon: string; nama: string; isi: readonly [Isian, Isian, Isian]; contoh: readonly number[] };
export type TemaInfo = { bingkai: string; latar: string; aksen: string; teduh: string; ikon: string; judul: string };

const PESAN_AWAL = "Ketuk label, lalu ketuk kotak yang cocok.";

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
  const [no, setNo] = useState(0);
  const [poster, setPoster] = useState(false);
  const [isi, setIsi] = useState<Record<number, number[]>>({});
  const [pilih, setPilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [pesan, setPesan] = useState(PESAN_AWAL);

  const b = baris[no];
  const terisi = (c: number, n = no) => baris[n].contoh.includes(c) || (isi[n] ?? []).includes(c);
  const lengkap = (n: number) => [0, 1, 2].every((c) => terisi(c, n));
  const semua = baris.every((_, n) => lengkap(n));
  const sisa = [0, 1, 2].filter((c) => !terisi(c));
  const suara = (x: Isian) => x.s ?? x.t;

  const ucap = (t: string) => {
    setPesan(t);
    speakGuru(t);
  };
  const ketukLabel = (c: number) => {
    setPilih(c);
    ucap(suara(b.isi[c]));
  };
  const ketukKotak = (c: number) => {
    if (terisi(c)) {
      ucap(b.contoh.includes(c) ? `Ini contoh. ${suara(b.isi[c])}` : suara(b.isi[c]));
      return;
    }
    if (pilih === null) {
      setPesan("Pilih satu label dulu, lalu ketuk kotaknya.");
      return;
    }
    if (pilih === c) {
      setIsi((s) => ({ ...s, [no]: [...(s[no] ?? []), c] }));
      setPilih(null);
      const masihAda = [0, 1, 2].some((x) => x !== c && !terisi(x));
      ucap(masihAda ? "Pas!" : `Kartu lengkap! ${b.nama}: ${suara(b.isi[0])}, ${suara(b.isi[1])}, ${suara(b.isi[2])}.`);
    } else {
      setGoyang(c);
      window.setTimeout(() => setGoyang(null), 480);
      ucap(`Belum pas. Label ini cocok di kotak ${kolom[pilih]}.`);
    }
  };
  const pindah = (arah: -1 | 1) => {
    if (arah === 1 && !lengkap(no)) {
      setPesan("Selesaikan kartu ini dulu, ya.");
      return;
    }
    const baru = no + arah;
    if (baru >= baris.length) {
      setPoster(true);
      speakGuru(pesanSelesai);
      return;
    }
    if (baru < 0) return;
    setNo(baru);
    setPilih(null);
    setPesan(PESAN_AWAL);
  };

  const intro = (teks: string, ucapan: string) => (
    <div className="flex items-start gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2">
      <button type="button" onClick={() => speakGuru(ucapan)} className="shrink-0 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-1 text-sm" aria-label="Dengar petunjuk">
        {"\u{1F50A}"}
      </button>
      <p className="text-sm font-bold leading-snug text-[#1C01A5]">{teks}</p>
    </div>
  );

  if (poster && semua) {
    return (
      <div className="space-y-3">
        <style>{CSS_LEMARI}</style>
        <div className="mx-auto w-full max-w-xl rounded-2xl border-[6px] p-2" style={{ borderColor: tema.bingkai, background: tema.latar }}>
          <p className="mb-1 text-center text-base font-black text-[#1C01A5]">
            {tema.ikon} {tema.judul}
          </p>
          <div className="grid gap-1 text-center text-[11px] font-black leading-tight sm:text-xs" style={{ gridTemplateColumns: "2.6rem repeat(3, minmax(0, 1fr))" }}>
            <span />
            {kolom.map((k) => (
              <span key={k} className="rounded-md px-1 py-1 text-white" style={{ background: tema.aksen }}>
                {k}
              </span>
            ))}
            {baris.map((r) => (
              <React.Fragment key={r.nama}>
                <span className="flex items-center justify-center rounded-md border-2 bg-white text-xl" style={{ borderColor: tema.aksen }} aria-label={r.nama}>
                  {r.ikon}
                </span>
                {r.isi.map((x, c) => (
                  <span key={c} className="flex items-center justify-center rounded-md border-2 px-1 py-1.5 text-[#1C01A5]" style={{ borderColor: tema.aksen, background: c === 2 ? tema.teduh : "#FFFFFF" }}>
                    {x.t}
                  </span>
                ))}
              </React.Fragment>
            ))}
          </div>
          <p role="status" aria-live="polite" className="mt-2 text-center text-sm font-black text-[#15803D]">
            {pesanSelesai}
          </p>
          <div className="mt-1 flex justify-center">
            <button type="button" onClick={() => setPoster(false)} className="rounded-lg border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
              {"⬅️"} Kembali ke kartu
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="button" onClick={onLanjut} className={TOMBOL_UTAMA}>
            {teksLanjut}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      {intro("Tempel label sisanya. Kotak bertanda contoh sudah terisi.", suaraAwal)}
      <div className="mx-auto max-w-xl rounded-2xl border-[6px] p-3" style={{ borderColor: tema.bingkai, background: tema.latar }}>
        <div className="mb-1 flex items-center justify-between text-xs font-black text-[#1C01A5]">
          <span>
            {tema.ikon} Kartu {no + 1} dari {baris.length}
          </span>
          <span className="flex gap-1" aria-hidden="true">
            {baris.map((_, n) => (
              <span key={n} className="block h-2.5 w-2.5 rounded-full border border-[#1C01A5]" style={{ background: n === no ? "#1C01A5" : lengkap(n) ? "#86EFAC" : "#FFFFFF" }} />
            ))}
          </span>
        </div>
        <p className="text-center text-4xl leading-tight" aria-hidden="true">
          {b.ikon}
        </p>
        <p className="mb-2 text-center text-base font-black text-[#1C01A5]">{b.nama}</p>
        {[0, 1, 2].map((c) => {
          const ok = terisi(c);
          const contoh = b.contoh.includes(c);
          return (
            <div key={c} className="mb-1.5">
              <p className="mb-0.5 text-[11px] font-black" style={{ color: tema.aksen }}>
                {kolom[c]}
              </p>
              <button
                type="button"
                onClick={() => ketukKotak(c)}
                aria-label={ok ? `${contoh ? "Contoh: " : ""}${kolom[c]}: ${b.isi[c].t}` : `Kotak ${kolom[c]} kosong`}
                className={`relative flex min-h-[46px] w-full items-center justify-center rounded-xl border-[3px] px-2 py-1.5 text-center text-base font-black leading-tight text-[#1C01A5] ${ok ? "lm-muncul" : "border-dashed bg-white/90"} ${goyang === c ? "lm-goyang" : ""} ${contoh ? "!pt-3.5" : ""}`}
                style={{ borderColor: tema.aksen, background: ok ? tema.teduh : undefined }}
              >
                {ok ? b.isi[c].t : "?"}
                {contoh ? (
                  <span className="pointer-events-none absolute -top-2 right-2 rounded-full bg-[#1C01A5] px-1.5 text-[9px] font-black leading-4 text-white" aria-hidden="true">
                    contoh
                  </span>
                ) : null}
              </button>
            </div>
          );
        })}
        <p role="status" aria-live="polite" className="mt-2 mb-1 min-h-[2.5rem] text-center text-sm font-black text-[#1C01A5]">
          {pesan}
        </p>
        <div className="mt-2 flex min-h-[48px] flex-wrap items-center justify-center gap-2 rounded-xl border-[3px] border-dashed bg-white/80 p-2" style={{ borderColor: tema.aksen }} role="group" aria-label="Label yang belum ditempel">
          {sisa.length === 0 ? (
            <span className="text-sm font-black text-[#15803D]">Semua label di kartu ini sudah menempel.</span>
          ) : (
            sisa.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => ketukLabel(c)}
                aria-pressed={pilih === c}
                className={`rounded-lg border-[3px] bg-white px-3 py-1.5 text-base font-black text-[#1C01A5] ${pilih === c ? "outline outline-4 outline-[#1C01A5]" : ""}`}
                style={{ borderColor: tema.aksen }}
              >
                {b.isi[c].t}
              </button>
            ))
          )}
        </div>
        <div className="mt-1 flex justify-between gap-2">
          <button type="button" onClick={() => pindah(-1)} className="rounded-lg border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
            {"⬅️"} Kartu sebelumnya
          </button>
          <button type="button" onClick={() => pindah(1)} className="rounded-lg border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
            {no === baris.length - 1 ? "Lihat poster" : "Kartu berikutnya"} {"➡️"}
          </button>
        </div>
      </div>
    </div>
  );
}
