"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import { kalimatKunci, kalimatTanya, kunciJawab, petunjukSalah, pilihanKlik, pilihanSuara, siapLangsung, teksKunciKlik, ucapkan, type Cara, type Langkah, type LangkahSalah, type LangkahSoal, type Rupa } from "./logika-cpa";
import { JawabSuaraAngklung, PilihanGambar, PilihanKata } from "./JawabAngklung";
import { TampilDasar, simbolBenda } from "./GambarAngklung";

/**
 * Satu tugas CPA Kelas 4 Bab 3 Sub-Bab A: metode IGIL (jenis pola, selisih, tambah atau kurang dari tiga deret), Draw the Next (Gambar Berikutnya: banyak deret keempat),
 * Difference Table (Tabel Selisih: selisih bertanda dan deret kelima), dan Group by Five (Susun Per Lima: banyak seluruhnya dan sisa), tugas Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab),
 * lalu menjawab menurut caranya (pilih jawaban, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan). Rupa: angklung beremoji di rak (Concrete), titik dan kotak polos di kertas pola (Pictorial),
 * kartu kata dan angka di daftar Bu Ratri (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya tanpa menyebut jawabannya.
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

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, cara, salah, siap, info }: PK & { l: LangkahSalah; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Posisi alasan benar ditentukan dari teks tugas (tetap, tanpa acak saat render) supaya tidak selalu di tombol yang sama. */
  const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  const lain = [0, 1, 2].filter((i) => i !== l.benar);
  const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
  /** Arahan tanpa menyebut alasan atau hasil yang benar. */
  const arahan = `Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${arahan}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      siap(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${arahan}`);
    }
  };
  return (
    <div className="space-y-2">
      <TampilDasar l={l.dasar} rupa={rupa} cara={cara} />
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
export function LangkahAngklung({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Semua tugas kecuali Cari kesalahan langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(ucapkan(p));
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(ucapkan(p));
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(ucapkan(p));
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
  /** Satu-satunya jalur memeriksa jawaban: `j` pecahan, tanda, urutan, atau kata yang dipilih atau diucapkan, atau angka yang ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(ucapkan(String(j)));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j)}`);
    }
  };
  const pk: PK = { rupa, cara };
  const pilihan: string[] = cara === "klik" ? pilihanKlik(l) : pilihanSuara(l, cara);
  const cocokKlik = (n: string): boolean => n === teksKunciKlik(l);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} salah={salah} siap={siap} info={info} /> : <TampilDasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraAngklung kunci={kunci} pilihan={pilihan} mati={mati} onJawab={(t, benar, terdengar, tunjuk) => jawab(t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)} onPesan={setPesan} />
          ) : l.tipe === "lengkapi" && rupa !== "lambang" ? (
            <PilihanGambar pilihan={pilihan} mati={mati} rupa={rupa} simbol={simbolBenda(l.p)} onPilih={(n) => jawab(n, cocokKlik(n))} />
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
