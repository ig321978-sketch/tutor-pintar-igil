"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  barisKartu,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  siapLangsung,
  ucap,
  type Cara,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika-cpa";
import { JawabSuaraLintasan, PilihanKata, teksKunci } from "./JawabLintasan";
import { GambarBangun, GambarLambang, GambarPilah, GambarSejajar, GambarTegak } from "./GambarLintasan";

/**
 * Satu tugas CPA Kelas 3 Bab 4 Sub-Bab C: metode IGIL (Cek Jarak, Cek Pojok, Sebut Ciri: menulis hubungan dua garis dengan lambang dan menyebut ciri bangun),
 * Grid Paper Check (Cek Kertas Petak: jarak dua tali di kedua ujung), Fold and Match (Lipat dan Cocokkan: pojok kertas di titik temu), dan Shape Sort (Pilah Bangun),
 * tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab), lalu menjawab menurut caranya (pilih pernyataan, tulis satu angka di kanvas, atau ucapkan).
 * Rupa: lapangan berpetak dengan tali dan patok oranye serta benda beremoji festival (Concrete), kertas petak hijau muda dengan garis dan bangun polos (Pictorial),
 * kartu kata, huruf titik, angka, dan lambang di lembar panitia (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara };
const HIJAU = "#15803D";

function Tombol({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
function KartuKata({ judul, baris }: { judul?: string; baris: string[] }) {
  return (
    <div className="rounded-lg border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-3 py-2 text-left">
      {judul ? <span className="block text-[11px] font-black uppercase text-[#B45309]">{judul}</span> : null}
      {baris.map((b) => (
        <span key={b} className="block text-sm font-bold leading-snug text-[#1C01A5]">
          {b}
        </span>
      ))}
    </div>
  );
}
const LembarPanitia = ({ children }: { children: React.ReactNode }) => <div className="mx-auto w-full max-w-[420px] space-y-1.5 rounded-md border-[6px] border-double border-[#B45309] bg-white p-2 font-mono">{children}</div>;
const JUDUL_KARTU: Record<LangkahDasar["tipe"], string> = {
  sejajar: "Garis sejajar pada kertas petak",
  tegak: "Titik temu dua garis",
  bangun: "Bangun datar",
  pilah: "Memilah bangun datar",
  lambang: "Menulis hubungan dua garis",
};

/* ------------------------------ Tampilan tiap jenis tugas ------------------------------ */
function Dasar(props: PK & { l: Langkah }) {
  const d = dasarDari(props.l);
  const { rupa, cara } = props;
  if (rupa === "lambang")
    return (
      <LembarPanitia>
        <KartuKata judul={JUDUL_KARTU[d.tipe]} baris={barisKartu(d, cara)} />
      </LembarPanitia>
    );
  switch (d.tipe) {
    case "sejajar":
      return <GambarSejajar l={d} rupa={rupa} tanya={cara === "kanvas" ? (d.kanvas === "selisih" ? "tidak" : d.kanvas) : cara === "suara" && d.suara === "jarak" ? "kiri" : "tidak"} />;
    case "tegak":
      return <GambarTegak l={d} rupa={rupa} />;
    case "bangun":
      return <GambarBangun bentuk={d.bentuk} rupa={rupa} benda={d.benda} />;
    case "pilah":
      return <GambarPilah l={d} rupa={rupa} />;
    case "lambang":
      return <GambarLambang l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Posisi alasan benar ditentukan dari teks tugas (tetap, tanpa acak saat render) supaya tidak selalu di tombol yang sama. */
  const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  const lain = [0, 1, 2].filter((i) => i !== l.benar);
  const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${l.keliru}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <Dasar l={l.dasar} rupa={rupa} cara={cara} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
        </p>
      </div>
      {tahap === "putus" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <Tombol teks={"\u{2705} benar"} onClick={() => putus(true)} />
            <Tombol teks={"\u{274C} salah"} onClick={() => putus(false)} />
          </div>
        </div>
      ) : tahap === "alasan" ? (
        <div className="space-y-1.5" role="group" aria-label="Pilih alasan">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pilih alasan yang tepat:</p>
          {urut.map((i) => (
            <button key={l.alasan[i]} type="button" disabled={mati.includes(i)} onClick={() => alasan(i)} className="block min-h-[48px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-left text-sm font-black text-[#1C01A5] disabled:opacity-30">
              {l.alasan[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahLintasan({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas hitung, kata, dan semua tugas kanvas dan suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    if (kunci === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  /** Satu-satunya jalur memeriksa jawaban: `j` pernyataan, kata, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : ucap(j));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara);
  const cocokKlik = (n: string): boolean => kunci !== null && n === teksKunci(kunci);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} salah={salah} siap={siap} info={info} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraLintasan kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : (
            <PilihanKata pilihan={pilihan} mati={mati} onPilih={(n) => jawab(n, cocokKlik(n))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
