"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  LANGKAH_KALI,
  acakTetap,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  petunjukKetuk,
  petunjukSalah,
  pilihanAngkaTugas,
  pilihanKalimat,
  pilihanNamaDari,
  siapLangsung,
  type Cara,
  type LPilihSama,
  type LUrutLangkah,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type Nama,
  type Rupa,
} from "./logika-cpa";
import { angkaDariUcapan } from "./periksa";
import { GambarKlaim, GambarTugas, PilihanKotak } from "./GambarKali";
import { JawabSuaraKali, PilihanKata, teksKunci } from "./JawabKali";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab F: perkalian sampai seratus. Jenis tugas: berapa benda semuanya, banyak kotak atau isi tiap kotak, menulis perkalian, penjumlahan berulang,
 * tanda kali, arti bilangan pada perkalian (kotak atau isi), sama atau berbeda, memilih susunan yang isinya sama, baris dan kolom, memutar susunan, lompat di garis bilangan,
 * urutan langkah mengalikan, dan Cari kesalahan (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: benda beremoji di rak telur (Concrete), kotak dan titik polos tanpa emoji di lembar petak (Pictorial), kartu tulisan saja di papan struk (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const HIJAU = "#15803D";

/** Ucapan jawaban kalimat: angka menjadi kata, tanda menjadi kata (mesin suara tidak membaca tanda). */
const ucapKalimat = (t: string): string =>
  t
    .replace(/\d+/g, (d) => kata(Number(d)))
    .replace(/×/g, "kali")
    .replace(/\+/g, "tambah");

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Tugas dengan kegiatan ------------------------------ */
/** Susun langkah mengalikan dengan mengetuk langkah pertama sampai terakhir. */
function UrutLangkah({ l, rupa, salah, siap, info }: PK & { l: LUrutLangkah }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const tampil = acakTetap(LANGKAH_KALI.length, [0, 1, 2, 3]);
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === LANGKAH_KALI.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info("Betul! Langkah berikutnya yang mana?");
    } else salah(petunjukKetuk(l));
  };
  return (
    <div className="space-y-2" role="group" aria-label="Ketuk langkah mengalikan secara berurutan">
      <div className="grid grid-cols-2 gap-2">
        {tampil.map((i) => (
          <button
            key={LANGKAH_KALI[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center justify-center gap-2 rounded-2xl border-4 px-2 text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {LANGKAH_KALI[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Ketuk satu dari tiga susunan: yang isi semua kotaknya sama banyak. */
function PilihSama({ l, rupa, salah, siap }: PK & { l: LPilihSama }) {
  const [dapat, setDapat] = useState<number | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const ketuk = (i: number) => {
    if (dapat !== null || mati.includes(i)) return;
    if (i === l.benar) {
      setDapat(i);
      siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2" role="group" aria-label="Ketuk susunan yang isinya sama">
      {l.pilihan.map((banyak, i) => (
        <button
          key={i}
          type="button"
          disabled={mati.includes(i)}
          onClick={() => ketuk(i)}
          aria-label={`Susunan ${i + 1}`}
          className={`rounded-2xl border-4 px-3 py-1 disabled:opacity-35 ${dapat === i ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#1C01A5] bg-white"}`}
        >
          <span className="block text-left text-xs font-black text-[#1C01A5]">Susunan {i + 1}</span>
          <PilihanKotak banyak={banyak} isi={l.isi} rupa={rupa} />
        </button>
      ))}
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  const betul = klaimBenar(l.klaim);
  /** Posisi alasan benar ditentukan dari teks tugas (tetap, tanpa acak saat render) supaya tidak selalu di tombol yang sama. */
  const posisi = Array.from(`${l.tokoh}${l.kataTokoh}${l.alasan[l.benar]}`).reduce((t, c) => t + c.charCodeAt(0), 0) % 3;
  const lain = [0, 1, 2].filter((i) => i !== l.benar);
  const urut = [...lain.slice(0, posisi), l.benar, ...lain.slice(posisi)];
  const putus = (benar: boolean) => {
    if (benar === betul) {
      setTahap("alasan");
      info(betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
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
      <GambarKlaim k={l.klaim} rupa={rupa} />
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

function Dasar({ l, rupa, cara, ...pk }: PK & { l: Langkah }) {
  const d: LangkahDasar | null = dasarDari(l);
  if (!d) return null;
  switch (d.tipe) {
    case "urutlangkah":
      return <UrutLangkah {...pk} cara={cara} rupa={rupa} l={d} />;
    case "pilihsama":
      return <PilihSama {...pk} cara={cara} rupa={rupa} l={d} />;
    default:
      return <GambarTugas l={d} rupa={rupa} cara={cara} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahKali({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const kunci = kunciJawab(l, cara);
  /** Tugas dengan jawaban pilihan (klik), semua tugas kanvas, dan semua tugas suara langsung siap dijawab, apa pun rupanya. */
  const [siapJawab, setSiapJawab] = useState(() => siapLangsung(l, rupa, cara));
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<string[]>([]);
  const [matiAngka, setMatiAngka] = useState<number[]>([]);
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata atau kalimat yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : (LABEL_NAMA[j as Nama] ?? ucapKalimat(j)));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const angka = pilihanAngkaTugas(l, cara);
  const pilihanTeks: string[] = kunci === null ? [] : kunci.jenis === "nama" ? pilihanNamaDari(kunci.nama) : kunci.jenis === "kalimat" ? pilihanKalimat(l) : angka.map(kata);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraKali
              kunci={kunci}
              pilihan={pilihanTeks}
              mati={[...mati, ...matiAngka.map(kata)]}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(kunci.jenis === "angka" ? (angka.find((x) => kata(x) === t) ?? angkaDariUcapan(t)[0] ?? t) : t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "angka" ? (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih angkanya">
              {angka.map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={matiAngka.includes(n)}
                  onClick={() => jawab(n, n === kunci.n)}
                  className="min-h-[52px] min-w-[72px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
                >
                  {n}
                </button>
              ))}
            </div>
          ) : (
            <PilihanKata pilihan={pilihanTeks} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
