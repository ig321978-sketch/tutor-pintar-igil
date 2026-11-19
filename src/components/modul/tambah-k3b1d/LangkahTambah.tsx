"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  LANGKAH_SUSUN,
  OBJEK,
  ambilDari,
  barisKartu,
  dasarDari,
  kalimatKunci,
  kalimatTanya,
  kata,
  kunciJawab,
  lebihBesar,
  lebihKecil,
  namaO,
  petunjukKetuk,
  petunjukSalah,
  pilihanKlik,
  pilihanSuara,
  puluhanDari,
  satuanDari,
  siapLangsung,
  type Cara,
  type Langkah,
  type LangkahDasar,
  type LangkahSalah,
  type LangkahSoal,
  type LUrut,
  type Rupa,
} from "./logika-cpa";
import { angkaDariUcapan } from "./periksa";
import { JawabSuaraTambah, PilihanKata, teksKunci } from "./JawabTambah";

/**
 * Satu tugas CPA Kelas 3 Bab 1 Sub-Bab D: penjumlahan sampai seratus. Jenis tugas: susun pendek (satuan dulu, simpan puluhan), susun panjang, tiga bilangan, pasangan bilangan,
 * menghitung maju, cerita penjumlahan, periksa dengan menukar urutan, menyusun langkah berurutan, dan Cari kesalahan (putuskan benar atau salah, pilih alasan, lalu jawab sendiri).
 * Jawaban menurut caranya: pilih, tulis satu angka di kanvas, atau ucapkan satu kata atau bilangan pendek.
 * Rupa: benda beremoji dalam nampan di meja pesanan (Concrete), balok puluhan dan satuan polos tanpa emoji di papan kapur (Pictorial), kartu angka dan kata saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; cara: Cara; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };
const HIJAU = "#15803D";

/* ------------------------------ Gambar bilangan ------------------------------ */
/** Satu bilangan dalam rupanya: nampan berisi sepuluh benda (Concrete) atau balok puluhan polos (Pictorial), lalu satuan lepas. */
function Bilangan({ n, rupa, o, label }: { n: number; rupa: Rupa; o: number; label?: string }) {
  const p = puluhanDari(n);
  const s = satuanDari(n);
  const tulis = label ?? String(n);
  if (rupa === "benda")
    return (
      <div className="flex min-w-[56px] flex-col items-center gap-1" role="img" aria-label={`${kata(n)} ${namaO(o)}`}>
        <div className="flex flex-wrap justify-center gap-1">
          {Array.from({ length: p }, (_, i) => (
            <span key={i} className="grid grid-cols-5 rounded-md border-2 border-[#B45309] bg-[#FEF3C7] p-0.5 text-[11px] leading-none">
              {Array.from({ length: 10 }, (_, j) => (
                <span key={j}>{OBJEK[o].emoji}</span>
              ))}
            </span>
          ))}
        </div>
        {s > 0 ? (
          <div className="flex flex-wrap justify-center text-base leading-none">
            {Array.from({ length: s }, (_, i) => (
              <span key={i}>{OBJEK[o].emoji}</span>
            ))}
          </div>
        ) : null}
        <span className="rounded-full bg-white px-2 text-sm font-black text-[#7C2D12]">{tulis}</span>
      </div>
    );
  return (
    <div className="flex min-w-[56px] flex-col items-center gap-1" role="img" aria-label={`${kata(n)}: ${kata(p)} puluhan dan ${kata(s)} satuan`}>
      <div className="flex items-end gap-1">
        {Array.from({ length: p }, (_, i) => (
          <span key={i} className="block h-10 w-2.5 rounded-sm border border-[#1E3A8A] bg-[#2563EB]" style={{ backgroundImage: "repeating-linear-gradient(180deg,transparent 0 3px,rgba(255,255,255,0.6) 3px 4px)" }} />
        ))}
        {s > 0 ? (
          <span className="ml-1.5 flex w-[34px] flex-wrap gap-0.5">
            {Array.from({ length: s }, (_, i) => (
              <span key={i} className="block h-2.5 w-2.5 border border-[#B45309] bg-[#F59E0B]" />
            ))}
          </span>
        ) : null}
      </div>
      <span className="rounded bg-white px-2 text-sm font-black text-[#1E3A8A]">{tulis}</span>
    </div>
  );
}

const Tanda = ({ t }: { t: string }) => (
  <span className="px-1 text-2xl font-black text-[#B91C1C]" aria-hidden="true">
    {t}
  </span>
);

/** Kartu kata dan angka (Abstract): baris teks dari data tugas, tanpa gambar benda. */
function KartuKata({ baris }: { baris: string[] }) {
  return (
    <div className="mx-auto w-full max-w-[420px] rounded-xl border-4 border-dashed border-[#BE185D] bg-[#FDF2F8] p-3 text-center" role="img" aria-label="Kartu angka dan kata">
      {baris.map((b, i) => (
        <p key={i} className={i === 0 ? "text-2xl font-black tracking-wide text-[#831843]" : "text-sm font-black text-[#9D174D]"}>
          {b}
        </p>
      ))}
    </div>
  );
}

/** Gambar tugas menurut jenis dan rupanya. Pada tugas kanvas Pasangan Bilangan, pecahan bilangan kedua disembunyikan. */
function Tampil({ d, rupa, cara }: { d: LangkahDasar; rupa: Rupa; cara: Cara }) {
  if (rupa === "lambang") return <KartuKata baris={barisKartu(d, cara)} />;
  const o = d.o;
  const bingkai = "flex flex-wrap items-center justify-center gap-1 rounded-xl border-4 p-2";
  const warna = rupa === "benda" ? "border-[#B45309] bg-[#FFF7ED]" : "border-[#1E3A8A] bg-[#F0F9FF]";
  switch (d.tipe) {
    case "susun":
    case "urut":
      return (
        <div className={`${bingkai} ${warna}`}>
          <Bilangan n={d.a} rupa={rupa} o={o} />
          <Tanda t="+" />
          <Bilangan n={d.b} rupa={rupa} o={o} />
          <Tanda t="=" />
          <span className="text-2xl font-black text-[#B91C1C]">?</span>
        </div>
      );
    case "cerita":
      return (
        <div className="space-y-1">
          <p className="rounded-xl border-2 border-[#CA8A04] bg-[#FEF9C3] px-2 py-1 text-center text-sm font-black text-[#713F12]">
            Di rak ada {d.a} {namaO(o)}, lalu Pak Joko menambah {d.b} {namaO(o)}. Berapa {namaO(o)} sekarang?
          </p>
          <div className={`${bingkai} ${warna}`}>
            <Bilangan n={d.a} rupa={rupa} o={o} />
            <Tanda t="+" />
            <Bilangan n={d.b} rupa={rupa} o={o} />
          </div>
        </div>
      );
    case "tiga":
      return (
        <div className={`${bingkai} ${warna}`}>
          <Bilangan n={d.a} rupa={rupa} o={o} />
          <Tanda t="+" />
          <Bilangan n={d.b} rupa={rupa} o={o} />
          <Tanda t="+" />
          <Bilangan n={d.c} rupa={rupa} o={o} />
          <Tanda t="=" />
          <span className="text-2xl font-black text-[#B91C1C]">?</span>
        </div>
      );
    case "tukar":
      return (
        <div className="space-y-1">
          <div className={`${bingkai} ${warna}`}>
            <Bilangan n={d.a} rupa={rupa} o={o} />
            <Tanda t="+" />
            <Bilangan n={d.b} rupa={rupa} o={o} />
            <Tanda t="=" />
            <span className="text-xl font-black text-[#166534]">{d.a + d.b}</span>
          </div>
          <div className={`${bingkai} ${warna}`}>
            <Bilangan n={d.b} rupa={rupa} o={o} />
            <Tanda t="+" />
            <Bilangan n={d.a} rupa={rupa} o={o} />
            <Tanda t="=" />
            <span className="text-2xl font-black text-[#B91C1C]">?</span>
          </div>
        </div>
      );
    case "maju":
      return (
        <div className={`${bingkai} ${warna}`}>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-[#166534]">mulai dari</span>
            <Bilangan n={lebihBesar(d.a, d.b)} rupa={rupa} o={o} />
          </div>
          <Tanda t="+" />
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-[#7C2D12]">maju sebanyak</span>
            <Bilangan n={lebihKecil(d.a, d.b)} rupa={rupa} o={o} />
          </div>
          <Tanda t="=" />
          <span className="text-2xl font-black text-[#B91C1C]">?</span>
        </div>
      );
    case "panjang":
      return (
        <div className="space-y-1">
          <div className={`${bingkai} ${warna}`}>
            <Bilangan n={d.a} rupa={rupa} o={o} />
            <Tanda t="+" />
            <Bilangan n={d.b} rupa={rupa} o={o} />
          </div>
          <div className="mx-auto max-w-[420px] rounded-lg border-2 border-[#1E3A8A] bg-white px-2 py-1 text-center text-sm font-black text-[#1E3A8A]">
            <p>
              {d.a} = {puluhanDari(d.a) * 10} + {satuanDari(d.a)}
            </p>
            <p>
              {d.b} = {puluhanDari(d.b) * 10} + {satuanDari(d.b)}
            </p>
          </div>
        </div>
      );
    case "pasang": {
      const p = ambilDari(d.a);
      return (
        <div className="space-y-1">
          <div className={`${bingkai} ${warna}`}>
            <Bilangan n={d.a} rupa={rupa} o={o} />
            <Tanda t="+" />
            <Bilangan n={d.b} rupa={rupa} o={o} />
          </div>
          <div className="mx-auto max-w-[420px] rounded-lg border-2 border-[#BE185D] bg-white px-2 py-1 text-center text-sm font-black text-[#831843]">
            {cara === "kanvas" ? `${d.b} dipecah menjadi ? dan ?, supaya ${d.a} menjadi puluhan penuh` : `${d.b} dipecah menjadi ${p} dan ${d.b - p}`}
          </div>
        </div>
      );
    }
  }
}

function Tombol({ teks, mati, onClick }: { teks: string; mati?: boolean; onClick: () => void }) {
  return (
    <button type="button" disabled={mati} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}

/* ------------------------------ Tugas dengan kegiatan ------------------------------ */
/** Menyusun langkah susun pendek dengan mengetuk langkah pertama sampai terakhir. */
function UrutLangkah({ l, rupa, salah, siap, info }: PK & { l: LUrut }) {
  const [sudah, setSudah] = useState<number[]>([]);
  const tampil = [2, 0, 3, 1];
  const ketuk = (i: number) => {
    if (sudah.includes(i)) return;
    if (i === sudah.length) {
      const baru = [...sudah, i];
      setSudah(baru);
      if (baru.length === LANGKAH_SUSUN.length) siap(`Betul! ${kalimatKunci(l, "klik", rupa)}`);
      else info("Betul! Langkah berikutnya yang mana?");
    } else salah(petunjukKetuk(l, i));
  };
  return (
    <div className="space-y-2">
      <Tampil d={l} rupa={rupa} cara="klik" />
      <div className="grid grid-cols-1 gap-2" role="group" aria-label="Ketuk langkah susun pendek secara berurutan">
        {tampil.map((i) => (
          <button
            key={LANGKAH_SUSUN[i]}
            type="button"
            disabled={sudah.includes(i)}
            onClick={() => ketuk(i)}
            className={`flex min-h-[52px] items-center gap-2 rounded-2xl border-4 px-2 text-left text-sm font-black ${sudah.includes(i) ? "border-[#15803D] bg-[#F0FDF4] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"}`}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BE185D] text-xs font-black text-white" aria-hidden="true">
              {sudah.includes(i) ? sudah.indexOf(i) + 1 : "?"}
            </span>
            {LANGKAH_SUSUN[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  const betul = l.betul === true;
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
      <Tampil d={l.dasar} rupa={rupa} cara="klik" />
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
  if (d.tipe === "urut") return <UrutLangkah {...pk} rupa={rupa} l={d} />;
  return <Tampil d={d} rupa={rupa} cara={pk.cara} />;
}

/* ------------------------------ Satu tugas ------------------------------ */
export function LangkahTambah({ ls, rupa, bicara, onBenar }: P) {
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
    bicara(typeof j === "number" ? kata(j) : j);
    if (benar) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} ${kalimatKunci(l, cara, rupa)}`);
    else {
      if (typeof j === "string") setMati((s) => [...s, j]);
      else setMatiAngka((s) => [...s, j]);
      salah(`${awalan}${petunjukSalah(l, cara, j, rupa)}`);
    }
  };
  const pk: PK = { rupa, cara, salah, siap, info };
  const pilihanKlikTeks = pilihanKlik(l);
  const pilihanSuaraTeks = pilihanSuara(l, cara);
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} l={l} /> : <Dasar {...pk} l={l} />}</div>
      {siapJawab && !selesai && kunci !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l, cara)}</p>
          {cara === "kanvas" && kunci.jenis === "angka" ? (
            <JawabTulis kunci={kunci.n} onBenar={(t) => jawab(kunci.n, true, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraTambah
              kunci={kunci}
              pilihan={pilihanSuaraTeks}
              mati={[...mati, ...matiAngka.map(kata)]}
              onJawab={(t, benar, terdengar, tunjuk) => jawab(kunci.jenis === "angka" ? (angkaDariUcapan(t)[0] ?? t) : t, benar, terdengar && !benar ? `Terdengar ${t}. ` : "", tunjuk)}
              onPesan={setPesan}
            />
          ) : kunci.jenis === "angka" ? (
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih bilangannya">
              {pilihanKlikTeks.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={matiAngka.includes(Number(s))}
                  onClick={() => jawab(Number(s), Number(s) === kunci.n)}
                  className="min-h-[52px] min-w-[72px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <PilihanKata pilihan={pilihanKlikTeks} mati={mati} onPilih={(n) => jawab(n, n === teksKunci(kunci))} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black" style={{ color: selesai ? HIJAU : "#B45309" }}>
        {pesan}
      </p>
    </div>
  );
}
