"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { POLA_DADU, acak, angkaJawab, benarPisah, kata, kunciLangkah, labelDobel, pilihanDari, type Cara, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI, NAMA } from "./data";
import { JawabSuara, JawabTulis, KanvasGambar, Pilihan } from "./Jawab";

/**
 * Satu langkah metode (Concrete, Pictorial, Abstract) Kelas 1 Bab 1 Sub-Bab A. Satu komponen untuk semua tipe langkah;
 * rupa menentukan gambar: benda (emoji mainan), diagram (titik, petak, segitiga), lambang (lambang dan nama angka).
 * Cara menjawab angka mengikuti kelompok soal: pilih (klik), tulis di kanvas, atau ucapkan (rekam suara).
 * Tanpa skor: salah = goyang dan petunjuk, coba lagi sampai benar.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benih: number; bicara: (t: string) => void; onBenar: (pesan: string) => void };

/* ------------------------------ Gambar satu benda ------------------------------ */
function Bentuk({ jenis, rupa, nilai, kecil = false }: { jenis: string; rupa: Rupa; nilai?: number; kecil?: boolean }) {
  const s = kecil ? 26 : 34;
  if (rupa === "lambang") {
    const teks = jenis === "kata" ? kata(nilai ?? 0) : String(nilai ?? "");
    return <span className={`font-black text-[#1C01A5] ${jenis === "kata" ? "text-sm" : "text-2xl"}`}>{teks}</span>;
  }
  if (rupa === "diagram") {
    if (jenis === "kotak") return <svg width={s} height={s} viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="1" width="8" height="8" rx="1" fill="#F97316" stroke="#1C01A5" strokeWidth="0.8" /></svg>;
    if (jenis === "segitiga") return <svg width={s} height={s} viewBox="0 0 10 10" aria-hidden="true"><path d="M5 1 L9 9 L1 9 Z" fill="#22C55E" stroke="#1C01A5" strokeWidth="0.8" /></svg>;
    return <svg width={s} height={s} viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="4" fill="#3B82F6" stroke="#1C01A5" strokeWidth="0.8" /></svg>;
  }
  return <span className={kecil ? "text-xl" : "text-3xl"} aria-hidden="true">{EMOJI[jenis] ?? "\u{2B50}"}</span>;
}

const KOTAK = "relative flex min-h-[52px] min-w-[52px] items-center justify-center rounded-xl border-[3px] px-1";

const AKHIR: Record<string, (n: number) => string> = {
  igil: (n) => `Betul! Ada ${kata(n)}.`,
  satu: () => "Betul! Satu benda, satu angka.",
  kardinal: (n) => `Betul! Angka terakhir ${kata(n)}, jadi banyaknya ${kata(n)}.`,
  sekilas: (n) => `Betul! ${kapital(kata(n))}, dikenali sekilas tanpa menghitung.`,
};
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export function LangkahMetode({ ls, rupa, benih, bicara, onBenar }: P) {
  const l = ls.langkah;
  const cara: Cara = ls.cara;
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState<string | null>(null);
  const [mati, setMati] = useState<number[]>([]);
  const [siapPilih, setSiapPilih] = useState(false);

  const salah = (id: string, p: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(null), 480);
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar(p);
  };
  const k = angkaJawab(l);
  const hint = () => (ls.metode === "kardinal" ? "Lihat angka terakhir yang disebut." : ls.metode === "sekilas" ? "Lihat lagi polanya." : l.tipe === "nol" ? "Lihat lagi kotak yang kosong." : "Hitung lagi pelan-pelan, satu per satu.");
  const pilihBanyak = (n: number, awalan = "") => {
    bicara(kata(n));
    if (n === k) tuntas(l.tipe === "baca" ? (l.ke === "kata" ? `Betul! Lambang itu dibaca ${kata(n)}.` : `Betul! Itu lambang ${kata(n)}.`) : AKHIR[ls.metode](n));
    else {
      setMati((m) => [...m, n]);
      salah("pilihan", `${awalan}${hint()}`);
    }
  };
  // Nol dengan cara klik dijawab dengan mengetuk kotaknya; tipe lain yang jawabannya angka memakai panel jawab.
  const pakaiPanel = k !== null && !(l.tipe === "nol" && cara === "klik");
  const siapAwal = l.tipe === "baca" || l.tipe === "nol";
  const rupaPilihan: Rupa = l.tipe === "baca" && l.ke === "kata" ? "benda" : rupa;
  const tanya = l.tipe === "baca" ? (l.ke === "kata" ? "Dibaca apa?" : cara === "kanvas" ? "Tulis lambangnya." : "Lambangnya yang mana?") : l.tipe === "nol" ? "Kotak yang kosong isinya berapa?" : "Berapa banyaknya?";
  const panelJawab =
    pakaiPanel && k !== null && (siapPilih || siapAwal) && !selesai ? (
      <div className={goyang === "pilihan" ? "lm-goyang" : ""}>
        <p className="mb-1 text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
        {cara === "kanvas" ? (
          <JawabTulis kunci={k} onBenar={() => pilihBanyak(k)} onSalah={(p) => salah("pilihan", p)} />
        ) : cara === "suara" ? (
          <JawabSuara
            kunci={k}
            pilihan={pilihanDari(l)}
            rupa={rupaPilihan}
            mati={mati}
            onJawab={(n, terdengar) => pilihBanyak(n, terdengar && n !== k ? `Terdengar ${kata(n)}. ` : "")}
            onPesan={setPesan}
          />
        ) : (
          <Pilihan pilihan={pilihanDari(l)} rupa={rupaPilihan} mati={mati} onPilih={(n) => pilihBanyak(n)} />
        )}
      </div>
    ) : null;

  return (
    <div className="space-y-3">
      <Isi l={l} rupa={rupa} cara={cara} benih={benih} selesai={selesai} goyang={goyang} salah={salah} tuntas={(p) => tuntas(p ?? AKHIR[ls.metode](typeof kunciLangkah(l) === "number" ? (kunciLangkah(l) as number) : 0))} siap={(p) => { setSiapPilih(true); if (p) { setPesan(p); bicara(p); } }} bicara={bicara} />
      {panelJawab}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}

/* ------------------------------ Isi tiap tipe langkah ------------------------------ */
type PI = {
  l: Langkah;
  rupa: Rupa;
  cara: Cara;
  benih: number;
  selesai: boolean;
  goyang: string | null;
  salah: (id: string, p: string) => void;
  tuntas: (p?: string) => void;
  /** Kegiatan selesai, lanjut menjawab banyaknya (pesan opsional, mis. setelah gambar benar). */
  siap: (pesan?: string) => void;
  bicara: (t: string) => void;
};

function Isi(p: PI) {
  switch (p.l.tipe) {
    case "pisah":
      return <Pisah {...p} l={p.l} />;
    case "tunjuk":
      return <Tunjuk {...p} l={p.l} />;
    case "pindah":
    case "laci":
      return <Pindah {...p} l={p.l} />;
    case "pasang":
      return <Pasang {...p} l={p.l} />;
    case "dobel":
      return <Dobel {...p} l={p.l} />;
    case "terakhir":
      return <Terakhir {...p} l={p.l} />;
    case "sekilas":
      return <Sekilas {...p} l={p.l} />;
    case "nol":
      return <Nol {...p} l={p.l} />;
    case "tabel":
      return <Tabel {...p} l={p.l} />;
    case "lingkari":
    case "centang":
    case "titik":
    case "hubung":
      return (
        <KanvasGambar
          l={p.l}
          rupa={p.rupa}
          benih={p.benih}
          selesai={p.selesai}
          goyang={p.goyang === "kanvas"}
          salah={(x) => p.salah("kanvas", x)}
          lulus={(x) => (p.l.tipe === "lingkari" || p.l.tipe === "centang" ? p.siap(x) : p.tuntas(x))}
        />
      );
    case "baca":
      return (
        <div className="flex justify-center">
          <div className="flex min-h-[96px] min-w-[140px] items-center justify-center rounded-3xl border-4 border-[#1C01A5] bg-white px-4 text-5xl font-black text-[#DC2626]">
            {p.l.ke === "kata" ? p.l.n : <span className="text-3xl text-[#1C01A5]">{kata(p.l.n)}</span>}
          </div>
        </div>
      );
  }
}

function Pisah({ l, rupa, selesai, goyang, salah, tuntas, bicara }: PI & { l: Extract<Langkah, { tipe: "pisah" }> }) {
  const [pilih, setPilih] = useState<number | null>(null);
  const [di, setDi] = useState<Record<number, number>>({});
  const sisa = l.jenis.map((j, i) => ({ j, i })).filter((x) => di[x.i] === undefined);
  const taruh = (w: number) => {
    if (pilih === null || selesai) return;
    if (!benarPisah(l, pilih, w)) {
      salah(`w${w}`, `Ini wadah ${NAMA[l.wadah[w]]}. Cari wadah yang sejenis.`);
      return;
    }
    const baru = { ...di, [pilih]: w };
    setDi(baru);
    setPilih(null);
    if (Object.keys(baru).length === l.jenis.length) tuntas("Betul! Semua sudah berkumpul dengan yang sejenis.");
  };
  return (
    <div className="space-y-2">
      <div className="flex min-h-[60px] flex-wrap justify-center gap-2 rounded-2xl border-4 border-dashed border-[#92400E]/50 bg-[#FDE7C8] p-2">
        {sisa.map(({ j, i }) => (
          <button key={i} type="button" onClick={() => { setPilih(i); bicara(NAMA[j]); }} aria-pressed={pilih === i} aria-label={NAMA[j]} className={`${KOTAK} ${pilih === i ? "border-[#1C01A5] bg-[#FFE566]" : "border-transparent bg-white"}`}>
            <Bentuk jenis={j} rupa={rupa} />
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {l.wadah.map((w, wi) => (
          <button key={w} type="button" onClick={() => taruh(wi)} aria-label={`Wadah ${NAMA[w]}`} className={`min-h-[96px] rounded-2xl border-4 border-[#78350F] bg-[#E8C48F] p-2 ${goyang === `w${wi}` ? "lm-goyang" : ""}`}>
            <span className="mb-1 flex items-center justify-center gap-1 text-xs font-black text-[#78350F]">
              <Bentuk jenis={w} rupa={rupa} kecil /> {NAMA[w]}
            </span>
            <span className="flex flex-wrap justify-center gap-1">
              {l.jenis.map((j, i) => (di[i] === wi ? <Bentuk key={i} jenis={j} rupa={rupa} kecil /> : null))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Tunjuk({ l, rupa, benih, selesai, goyang, salah, siap, bicara }: PI & { l: Extract<Langkah, { tipe: "tunjuk" }> }) {
  const [nomor, setNomor] = useState<Record<number, number>>({});
  const urutKartu = useMemo(() => acak(Array.from({ length: l.n }, (_, i) => i + 1), benih), [l.n, benih]);
  const c = Object.keys(nomor).length;
  const ketuk = (i: number) => {
    if (selesai || c >= l.n) return;
    if (nomor[i]) {
      salah(`b${i}`, "Sudah dihitung. Satu benda, satu angka.");
      return;
    }
    if (rupa === "lambang" && urutKartu[i] !== c + 1) {
      salah(`b${i}`, `Cari kartu ${kata(c + 1)} dulu.`);
      return;
    }
    const baru = { ...nomor, [i]: c + 1 };
    setNomor(baru);
    bicara(kata(c + 1));
    if (c + 1 === l.n) siap();
  };
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-2xl bg-[#F0F9FF] p-2">
      {Array.from({ length: l.n }, (_, i) => (
        <button key={i} type="button" onClick={() => ketuk(i)} className={`${KOTAK} ${nomor[i] ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5]/30 bg-white"} ${goyang === `b${i}` ? "lm-goyang" : ""}`}>
          {rupa === "lambang" ? <Bentuk jenis="lambang" rupa={rupa} nilai={urutKartu[i]} /> : <Bentuk jenis={l.jenis} rupa={rupa} />}
          {nomor[i] && rupa !== "lambang" ? <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#DC2626] px-1.5 text-[11px] font-black text-white">{nomor[i]}</span> : null}
        </button>
      ))}
    </div>
  );
}

function Pindah({ l, rupa, selesai, siap, bicara }: PI & { l: Extract<Langkah, { tipe: "pindah" | "laci" }> }) {
  const [masuk, setMasuk] = useState<number[]>([]);
  const ketuk = (i: number) => {
    if (selesai || masuk.includes(i)) return;
    const baru = [...masuk, i];
    setMasuk(baru);
    bicara(kata(baru.length));
    if (baru.length === l.n) siap();
  };
  const luar = Array.from({ length: l.n }, (_, i) => i).filter((i) => !masuk.includes(i));
  return (
    <div className="space-y-2">
      <div className="flex min-h-[60px] flex-wrap justify-center gap-2 rounded-2xl border-4 border-dashed border-[#92400E]/50 bg-[#FDE7C8] p-2">
        {luar.length === 0 ? <span className="self-center text-xs font-bold text-[#78350F]">Semua sudah dipindahkan.</span> : null}
        {luar.map((i) => (
          <button key={i} type="button" onClick={() => ketuk(i)} aria-label={`Pindahkan ${NAMA[l.jenis]}`} className={`${KOTAK} border-transparent bg-white`}>
            <Bentuk jenis={l.jenis} rupa={rupa} />
          </button>
        ))}
      </div>
      {l.tipe === "laci" ? (
        <div className="mx-auto grid w-full max-w-sm grid-cols-5 gap-1 rounded-2xl border-4 border-[#78350F] bg-[#E8C48F] p-1.5" aria-label="Laci sepuluh kotak">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="flex aspect-square items-center justify-center rounded-md border-2 border-[#78350F]/60 bg-white/70">
              {i < masuk.length ? <Bentuk jenis={l.jenis} rupa={rupa} kecil /> : null}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto flex min-h-[80px] w-full max-w-sm flex-wrap items-center justify-center gap-1 rounded-2xl border-4 border-[#78350F] bg-[#E8C48F] p-2" aria-label={`Wadah ${NAMA[l.wadah]}`}>
          <span className="w-full text-center text-xs font-black text-[#78350F]">{NAMA[l.wadah]}: {kata(masuk.length)}</span>
          {masuk.map((i) => (
            <Bentuk key={i} jenis={l.jenis} rupa={rupa} kecil />
          ))}
        </div>
      )}
    </div>
  );
}

function Pasang({ l, rupa, benih, selesai, goyang, salah, tuntas, bicara }: PI & { l: Extract<Langkah, { tipe: "pasang" }> }) {
  const [pilih, setPilih] = useState<number | null>(null);
  const [pas, setPas] = useState<Record<number, number>>({});
  const kartu = useMemo(() => acak(Array.from({ length: l.n }, (_, i) => i + 1), benih + 3), [l.n, benih]);
  const dipakai = new Set(Object.values(pas));
  const ketukKartu = (v: number) => {
    if (selesai || pilih === null) return;
    if (dipakai.has(v)) {
      salah(`k${v}`, "Kartu ini sudah punya pasangan.");
      return;
    }
    if (rupa === "lambang" && v !== pilih + 1) {
      salah(`k${v}`, `Cari lambang untuk ${kata(pilih + 1)}.`);
      return;
    }
    const baru = { ...pas, [pilih]: v };
    setPas(baru);
    setPilih(null);
    bicara(kata(v));
    if (Object.keys(baru).length === l.n) tuntas("Betul! Tiap benda dapat tepat satu angka.");
  };
  const labelKartu = (v: number) => (rupa === "benda" ? kata(v) : String(v));
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col items-center gap-1.5">
        {Array.from({ length: l.n }, (_, i) => (
          <button key={i} type="button" onClick={() => !pas[i] && setPilih(i)} aria-pressed={pilih === i} className={`${KOTAK} w-full gap-2 ${pas[i] ? "border-[#16A34A] bg-[#DCFCE7]" : pilih === i ? "border-[#1C01A5] bg-[#FFE566]" : "border-[#1C01A5]/30 bg-white"}`}>
            {rupa === "lambang" ? <Bentuk jenis="kata" rupa={rupa} nilai={i + 1} /> : <Bentuk jenis={l.jenis} rupa={rupa} kecil />}
            {pas[i] ? <span className="rounded-full bg-[#1C01A5] px-2 text-xs font-black text-white">{"\u{1F517}"} {labelKartu(pas[i])}</span> : null}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-1.5">
        {kartu.map((v) => (
          <button key={v} type="button" onClick={() => ketukKartu(v)} disabled={dipakai.has(v)} className={`${KOTAK} w-full border-[#1C01A5] bg-[#FEF9C3] text-lg font-black text-[#DC2626] disabled:opacity-30 ${goyang === `k${v}` ? "lm-goyang" : ""}`}>
            {labelKartu(v)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Dobel({ l, rupa, selesai, goyang, salah, tuntas }: PI & { l: Extract<Langkah, { tipe: "dobel" }> }) {
  const label = labelDobel(l);
  const ketuk = (i: number) => {
    if (selesai) return;
    if (i === l.salah) tuntas(l.cara === "dobel" ? "Betul! Itu dihitung dua kali. Satu benda hanya satu angka." : "Betul! Itu terlewat. Semua benda harus dapat angka.");
    else salah(`b${i}`, "Yang ini sudah tepat satu angka. Cari yang lain.");
  };
  return (
    <div className="flex flex-wrap justify-center gap-2 rounded-2xl bg-[#FFF1F2] p-2 pt-5">
      {label.map((a, i) => (
        <button key={i} type="button" onClick={() => ketuk(i)} className={`${KOTAK} ${selesai && i === l.salah ? "border-[#DC2626] bg-[#FECACA]" : "border-[#1C01A5]/30 bg-white"} ${goyang === `b${i}` ? "lm-goyang" : ""}`}>
          {rupa === "lambang" ? <span className="text-xl text-[#1C01A5]">{"\u{25A2}"}</span> : <Bentuk jenis={l.jenis} rupa={rupa} />}
          <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 gap-0.5">
            {a.map((n) => (
              <span key={n} className="rounded-full bg-[#DC2626] px-1.5 text-[11px] font-black text-white">
                {n}
              </span>
            ))}
          </span>
        </button>
      ))}
    </div>
  );
}

function Terakhir({ l, rupa, siap }: PI & { l: Extract<Langkah, { tipe: "terakhir" }> }) {
  const [sampai, setSampai] = useState(0);
  const urut = useMemo(() => Array.from({ length: l.n }, (_, i) => (l.arah === "kiri" ? i : l.n - 1 - i)), [l]);
  const siapRef = useRef(siap);
  useEffect(() => {
    siapRef.current = siap;
  }, [siap]);
  const pewaktu = useRef<number[]>([]);
  const putar = () => {
    pewaktu.current.forEach((x) => window.clearTimeout(x));
    setSampai(0);
    pewaktu.current = Array.from({ length: l.n }, (_, i) =>
      window.setTimeout(() => {
        setSampai(i + 1);
        if (i + 1 === l.n) siapRef.current();
      }, 550 * (i + 1)),
    );
  };
  useEffect(() => {
    const t = window.setTimeout(putar, 300);
    const daftar = pewaktu;
    return () => {
      window.clearTimeout(t);
      daftar.current.forEach((x) => window.clearTimeout(x));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const nomorDi = (i: number) => {
    const ke = urut.indexOf(i);
    return ke < sampai ? ke + 1 : null;
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap justify-center gap-2 rounded-2xl bg-[#EFF6FF] p-2 pt-5">
        {Array.from({ length: l.n }, (_, i) => {
          const nmr = nomorDi(i);
          const akhir = nmr === l.n;
          return (
            <div key={i} className={`${KOTAK} ${akhir ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#1C01A5]/20 bg-white"}`}>
              {rupa === "lambang" ? <span className="text-sm font-black text-[#1C01A5]">{nmr ? kata(nmr) : "\u{2026}"}</span> : <Bentuk jenis={l.jenis} rupa={rupa} />}
              {nmr && rupa !== "lambang" ? <span className={`absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-1.5 font-black text-white ${akhir ? "bg-[#DC2626] text-sm" : "bg-[#1C01A5]/70 text-[11px]"}`}>{nmr}</span> : null}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={putar} className="min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-4 text-xs font-black text-[#1C01A5]">
          {"\u{1F501}"} Lihat hitungan dari {l.arah}
        </button>
      </div>
    </div>
  );
}

function Sekilas({ l, rupa, siap }: PI & { l: Extract<Langkah, { tipe: "sekilas" }> }) {
  const [tampil, setTampil] = useState(true);
  const siapRef = useRef(siap);
  useEffect(() => {
    siapRef.current = siap;
  }, [siap]);
  const pewaktu = useRef<number | null>(null);
  const lihat = () => {
    setTampil(true);
    if (pewaktu.current) window.clearTimeout(pewaktu.current);
    pewaktu.current = window.setTimeout(() => {
      setTampil(false);
      siapRef.current();
    }, 1600);
  };
  useEffect(() => () => {
    if (pewaktu.current) window.clearTimeout(pewaktu.current);
  }, []);
  useEffect(() => {
    const t = window.setTimeout(() => {
      setTampil(false);
      siapRef.current();
    }, 1600);
    return () => window.clearTimeout(t);
  }, []);
  const pola = l.pola === "dadu" && POLA_DADU[l.n] ? POLA_DADU[l.n] : null;
  return (
    <div className="space-y-2">
      <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-3xl border-4 border-[#1C01A5] bg-white">
        {rupa === "lambang" ? (
          <span className="text-4xl font-black text-[#1C01A5]">{l.jenis === "lambang" ? kata(l.n) : l.n}</span>
        ) : pola ? (
          <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-2">
            {Array.from({ length: 9 }, (_, s) => {
              const ada = pola.some(([c, b]) => b * 3 + c === s);
              return <div key={s} className="flex items-center justify-center">{ada ? <Bentuk jenis={l.jenis} rupa={rupa} kecil /> : null}</div>;
            })}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1 p-2">
            {Array.from({ length: l.n }, (_, i) => (
              <Bentuk key={i} jenis={l.jenis} rupa={rupa} kecil />
            ))}
          </div>
        )}
        {!tampil ? <div className="absolute inset-0 flex items-center justify-center rounded-[1.25rem] bg-[#1C01A5] text-lg font-black text-[#FFE566]">Berapa tadi?</div> : null}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={lihat} className="min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-4 text-xs font-black text-[#1C01A5]">
          {"\u{1F440}"} Lihat lagi sebentar
        </button>
      </div>
    </div>
  );
}

function Nol({ l, rupa, cara, selesai, goyang, salah, tuntas }: PI & { l: Extract<Langkah, { tipe: "nol" }> }) {
  const ketuk = (i: number) => {
    if (selesai || cara !== "klik") return;
    if (l.kotak[i].n === 0) tuntas("Betul! Kotak itu tidak ada isinya. Banyaknya nol.");
    else salah(`b${i}`, "Kotak ini ada isinya. Cari yang kosong.");
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {l.kotak.map((k, i) => (
        <button key={i} type="button" onClick={() => ketuk(i)} aria-label={`Kotak ${NAMA[k.jenis]}`} className={`flex min-h-[110px] flex-col items-center justify-start rounded-2xl border-4 border-[#78350F] bg-[#FDE68A] p-1 ${goyang === `b${i}` ? "lm-goyang" : ""}`}>
          <span className="text-xs font-black text-[#78350F]">kotak {NAMA[k.jenis]}</span>
          <span className="flex flex-wrap justify-center gap-0.5">
            {Array.from({ length: k.n }, (_, j) => (
              <Bentuk key={j} jenis={k.jenis} rupa={rupa} kecil />
            ))}
          </span>
          {selesai && k.n === 0 ? <span className="mt-1 text-sm font-black text-[#DC2626]">nol</span> : null}
        </button>
      ))}
    </div>
  );
}

function Tabel({ l, rupa, selesai, goyang, salah, tuntas, bicara }: PI & { l: Extract<Langkah, { tipe: "tabel" }> }) {
  const [isi, setIsi] = useState<(number | null)[]>(() => l.baris.map(() => null));
  const [aktif, setAktif] = useState<number | null>(null);
  const tulis = (v: number) => {
    if (aktif === null || selesai) return;
    if (l.baris[aktif].n !== v) {
      salah(`r${aktif}`, "Belum pas. Hitung lagi baris itu.");
      return;
    }
    const baru = isi.map((x, i) => (i === aktif ? v : x));
    setIsi(baru);
    setAktif(null);
    bicara(kata(v));
    if (baru.every((x, i) => x === l.baris[i].n)) tuntas("Betul! Tabelnya lengkap. Yang kosong ditulis nol.");
  };
  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5]">
        <div className="grid grid-cols-[1fr_5rem] bg-[#EDE9FE] text-xs font-black text-[#1C01A5]">
          <span className="px-2 py-1">Isi</span>
          <span className="border-l-2 border-[#1C01A5] px-2 py-1 text-center">Angka</span>
        </div>
        {l.baris.map((b, i) => (
          <div key={i} className="grid grid-cols-[1fr_5rem] border-t-2 border-[#1C01A5]">
            <div className="flex min-h-[52px] flex-wrap items-center gap-1 px-2 py-1">
              {rupa === "lambang" ? (
                <span className="text-sm font-black text-[#1C01A5]">
                  {NAMA[b.jenis]}: {kata(b.n)}
                </span>
              ) : b.n === 0 ? (
                <span className="text-xs font-bold text-[#64748B]">(kosong)</span>
              ) : (
                Array.from({ length: b.n }, (_, j) => <Bentuk key={j} jenis={b.jenis} rupa={rupa} kecil />)
              )}
            </div>
            <button type="button" onClick={() => isi[i] === null && setAktif(i)} aria-label={`Kotak angka baris ${i + 1}`} className={`border-l-2 border-[#1C01A5] text-2xl font-black ${isi[i] !== null ? "bg-[#DCFCE7] text-[#15803D]" : aktif === i ? "bg-[#FFE566] text-[#1C01A5]" : "bg-white text-[#1C01A5]/40"} ${goyang === `r${i}` ? "lm-goyang" : ""}`}>
              {isi[i] ?? "?"}
            </button>
          </div>
        ))}
      </div>
      {aktif !== null ? (
        <div className="grid grid-cols-6 gap-1.5" role="group" aria-label="Pilih angka">
          {Array.from({ length: 11 }, (_, v) => (
            <button key={v} type="button" onClick={() => tulis(v)} className="min-h-[48px] rounded-xl border-[3px] border-[#1C01A5] bg-[#FEF9C3] text-lg font-black text-[#DC2626]">
              {v}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center text-xs font-bold text-[#1C01A5]/70">Ketuk kotak angka yang masih kosong.</p>
      )}
    </div>
  );
}
