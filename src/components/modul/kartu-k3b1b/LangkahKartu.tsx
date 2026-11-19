"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LABEL_NAMA,
  bilanganDari,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  klaimBenar,
  kunciJawab,
  opsiTabel,
  opsiUraian,
  petunjukKetuk,
  petunjukSalah,
  pilihanAngka,
  pilihanBilangan,
  pilihanJumlah,
  pilihanNamaDari,
  siapLangsung,
  type Cara,
  type Klaim,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type LTabel,
  type LUraian,
  type Nama,
  type Rupa,
} from "./logika-cpa";
import { angkaDariUcapan } from "./periksa";
import { JawabSuaraKartu, PilihanKata, nilaiKunci } from "./JawabKartu";
import { DuaLabel, DuaTabelKata, PapanSvg, Tabel3, TabelKata, teksIsi, type OpsiPapan } from "./GambarKartu";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab B: tempat angka pada bilangan tiga angka. Jenis tugas: angka di sebuah tempat, jumlah yang diwakili sebuah angka, banyak kartu atau balok,
 * menyusun bilangan dari kartu, bentuk uraian (memilih dan melengkapi), tabel tiga tempat diisi angka, nol penjaga tempat, tempat sebuah angka, angka yang sama di dua tempat,
 * dan sama atau berbeda, serta Cari kesalahan (putuskan benar atau salah, pilih alasan). Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan.
 * Rupa: benda beremoji dan kartu angka berwarna di meja label (Concrete), tabel tiga tempat dengan balok SVG polos tanpa emoji (Pictorial), tabel kata saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const HIJAU = "#15803D";

/* ------------------------------ Gambar tugas ------------------------------ */
/** Papan menurut rupa: meja label (benda), tabel dengan balok (diagram), atau tabel kata (lambang). */
function Papan({ rupa, ik, ...o }: Omit<OpsiPapan, "rupa"> & { rupa: Rupa }) {
  if (rupa === "lambang") return <TabelKata {...o} kata={o.banyak !== undefined} />;
  return <PapanSvg {...o} rupa={rupa} ik={rupa === "benda" ? ik : undefined} />;
}

function GambarTugas({ l, rupa }: { l: LangkahDasar; rupa: Rupa }) {
  switch (l.tipe) {
    case "tempat":
    case "mewakili":
      return <Papan rupa={rupa} n={l.n} ik={l.ik} sorot={l.t} />;
    case "banyak":
      return <Papan rupa={rupa} n={l.n} ik={l.ik} sorot={l.t} sembunyi />;
    case "susun":
      return <Papan rupa={rupa} n={bilanganDari(l.h, l.p, l.s)} ik={l.ik} sembunyi={rupa !== "lambang"} banyak={[l.h, l.p, l.s]} />;
    case "uraian":
    case "tabel":
      return <Papan rupa={rupa} n={l.n} ik={l.ik} />;
    case "isi":
      return <Papan rupa={rupa} n={l.n} ik={l.ik} baris={teksIsi(l.n, l.t)} />;
    case "nol":
      return <Papan rupa={rupa} n={l.n} ik={l.ik} kosong={l.t} />;
    case "di":
    case "dua":
      return <Papan rupa={rupa} n={l.n} ik={l.ik} ring={l.d} />;
    case "beda":
      return rupa === "lambang" ? <DuaTabelKata a={l.a} b={l.b} /> : <DuaLabel a={l.a} b={l.b} rupa={rupa} />;
  }
}

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Tugas dengan pilihan khusus ------------------------------ */
/** Pilih bentuk uraian yang tepat di antara tiga. */
function UraianPilihan({ l, rupa, salah, siap }: PK & { l: LUraian }) {
  const [mati, setMati] = useState<number[]>([]);
  const [dapat, setDapat] = useState<number | null>(null);
  const { opsi, benar } = opsiUraian(l.n);
  const ketuk = (i: number) => {
    if (dapat !== null || mati.includes(i)) return;
    if (i === benar) {
      setDapat(i);
      siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="space-y-2">
      <GambarTugas l={l} rupa={rupa} />
      <div className="grid grid-cols-1 gap-2" role="group" aria-label="Pilih bentuk uraian">
        {opsi.map((o, i) => (
          <button
            key={o}
            type="button"
            disabled={mati.includes(i)}
            onClick={() => ketuk(i)}
            className={`min-h-[52px] rounded-2xl border-4 px-3 text-xl font-black disabled:opacity-35 ${dapat === i ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            {l.n} = {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Pilih tabel tiga tempat yang diisi dengan benar di antara tiga. */
function TabelPilihan({ l, rupa, salah, siap }: PK & { l: LTabel }) {
  const [mati, setMati] = useState<number[]>([]);
  const [dapat, setDapat] = useState<number | null>(null);
  const { opsi, benar } = opsiTabel(l.n);
  const ketuk = (i: number) => {
    if (dapat !== null || mati.includes(i)) return;
    if (i === benar) {
      setDapat(i);
      siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
    } else {
      setMati((m) => [...m, i]);
      salah(petunjukKetuk(l));
    }
  };
  return (
    <div className="space-y-2">
      <GambarTugas l={l} rupa={rupa} />
      <div className="grid grid-cols-1 gap-2" role="group" aria-label="Pilih tabel yang benar">
        {opsi.map((o, i) => (
          <button
            key={o.join("-")}
            type="button"
            disabled={mati.includes(i)}
            onClick={() => ketuk(i)}
            aria-label={`Tabel ${i + 1}`}
            className={`rounded-2xl border-4 px-3 py-1.5 disabled:opacity-35 ${dapat === i ? "border-[#15803D] bg-[#F0FDF4]" : "border-[#1C01A5] bg-white"}`}
          >
            <span className="mb-1 block text-left text-xs font-black text-[#1C01A5]">Tabel {i + 1}</span>
            <Tabel3 isi={o} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function GambarKlaim({ k, rupa }: { k: Klaim; rupa: Rupa }) {
  if (k.jenis === "mewakili") return <Papan rupa={rupa} n={k.n} ik={rupa === "benda" ? "\u{1F35E}" : undefined} sorot={k.t} />;
  if (k.jenis === "uraian") return <Papan rupa={rupa} n={k.n} baris={`${k.n} = ${k.bagian.join(" + ")}`} />;
  return (
    <div className="space-y-2">
      <Papan rupa={rupa} n={k.n} />
      <div>
        <p className="mb-0.5 text-center text-xs font-black text-[#831843]">Tabel buatan tokoh</p>
        <Tabel3 isi={k.isi} />
      </div>
    </div>
  );
}
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

function Dasar({ l, rupa, ...pk }: PK & { l: Langkah }) {
  const d = dasarDari(l);
  if (!d) return null;
  switch (d.tipe) {
    case "uraian":
      return <UraianPilihan {...pk} rupa={rupa} l={d} />;
    case "tabel":
      return <TabelPilihan {...pk} rupa={rupa} l={d} />;
    default:
      return <GambarTugas l={d} rupa={rupa} />;
  }
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahKartu({ ls, rupa, bicara, onBenar }: P) {
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
  /** Satu-satunya jalur memeriksa jawaban: `j` kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
  const jawab = (j: string | number, benar: boolean, awalan = "", ditunjukkan = false) => {
    bicara(typeof j === "number" ? kata(j) : (LABEL_NAMA[j as Nama] ?? j));
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const daftarAngka: number[] = kunci === null || kunci.jenis === "nama" ? [] : kunci.jenis === "angka" ? pilihanAngka(kunci.n) : kunci.jenis === "jumlah" ? pilihanJumlah(kunci.n) : pilihanBilangan(kunci.n);
  const pilihanTeks: string[] = kunci === null ? [] : kunci.jenis === "nama" ? pilihanNamaDari(kunci.nama) : daftarAngka.map(String);
  const angkaKunci = kunci !== null && kunci.jenis !== "nama" ? kunci.n : 0;
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraKartu
              kunci={kunci}
              pilihan={pilihanTeks}
              mati={[...mati, ...matiAngka.map(String)]}
              onJawab={(t, benar, terdengar, tunjuk) => {
                const bilangan = kunci.jenis === "nama" ? t : /^\d+$/.test(t) ? Number(t) : (angkaDariUcapan(t)[0] ?? t);
                jawab(bilangan, benar, terdengar && !benar ? `Terdengar ${kunci.jenis === "nama" ? t : typeof bilangan === "number" ? kata(bilangan) : t}. ` : "", tunjuk);
              }}
              onPesan={setPesan}
            />
          ) : kunci.jenis !== "nama" ? (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih jawabannya">
              {daftarAngka.map((n) => (
                <button
                  key={n}
                  type="button"
                  disabled={matiAngka.includes(n)}
                  onClick={() => jawab(n, n === angkaKunci)}
                  className="min-h-[52px] min-w-[72px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
                >
                  {n}
                </button>
              ))}
            </div>
          ) : (
            <PilihanKata pilihan={pilihanTeks} mati={mati} onPilih={(n) => jawab(n, n === nilaiKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
