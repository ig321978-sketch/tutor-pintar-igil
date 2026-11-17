"use client";

import React, { useEffect, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import {
  TOPIK,
  angkaJawab,
  kalimatHasil,
  kata,
  kolomPaling,
  petunjukSalah,
  sesuaikan,
  pilihanDari,
  sasaranKetuk,
  teksTanya,
  type Langkah,
  type LangkahDiagram,
  type LangkahSalah,
  type LangkahSoal,
  type Rupa,
} from "./logika";
import { GambarSurvei } from "./GambarSurvei";
import { LEBAR_ADEGAN, TINGGI_ADEGAN, letakGambar, periksaCentang, periksaLingkari, pusatKartu, pusatKolom, type Goresan } from "./periksa";
import { JawabSuaraIkan, JawabTulisIkan, PilihanIkan } from "../ikan-k1b5a/Jawab20";

/**
 * Satu soal CPA Kelas 1 Bab 8 Sub-Bab B: kegiatan metode (Metode IGIL diagram gambar, Block Graph, Dot Plot, Bar Graph) berupa menyusun gambar dari catatan,
 * mengetuk gambar yang ditanya, memberi tanda di kanvas, atau memilih kolom paling banyak atau paling sedikit; soal Cari kesalahan (putuskan benar atau salah,
 * pilih alasan, lalu jawab); lalu menjawab dengan caranya. Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 * Rupa: benda bergambar (Concrete), bentuk polos dengan sumbu bernomor (Pictorial), kartu kata dan angka (Abstract).
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; kanvas: boolean; diam?: boolean; salah: (p: string) => void; siap: (p?: string) => void; info: (p: string) => void };

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}
function KartuTanya({ atas, bawah }: { atas: React.ReactNode; bawah: React.ReactNode }) {
  return (
    <div className="space-y-2 py-2 text-center font-black text-[#1C01A5]">
      <p className="text-base">{atas}</p>
      <p className="text-xl">{bawah}</p>
    </div>
  );
}
const Kotak = ({ children }: { children: React.ReactNode }) => <span className="mx-0.5 inline-block rounded-xl border-4 border-[#B45309] bg-[#FFFBEB] px-2 py-0.5 text-[#78350F]">{children}</span>;
function Tombol({ teks, mati, onClick, label }: { teks: string; mati?: boolean; onClick: () => void; label?: string }) {
  return (
    <button type="button" disabled={mati} aria-label={label} onClick={onClick} className="min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
      {teks}
    </button>
  );
}
/** Langkah sekali saat soal dibuka (untuk kartu kata yang langsung menjawab). */
function useSiapLangsung(aktif: boolean, siap: () => void) {
  useEffect(() => {
    if (aktif) siap();
    // Hanya saat soal dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ------------------------------ Diagram: susun, ketuk, tanda, atau pilih kolom ------------------------------ */
function SoalDiagram({ l, rupa, kanvas, diam, salah, siap, info }: PK & { l: LangkahDiagram }) {
  const n = l.data.length;
  const jenis = TOPIK[l.topik].jenis;
  const paling = l.tanya.j === "paling";
  const jumlah = l.tanya.j === "jumlah";
  const lamb = rupa === "lambang";
  const susun = l.kegiatan === "susun" && !kanvas && !diam && !lamb && !paling;
  const [tampak, setTampak] = useState<number[]>(susun ? l.data.map(() => 0) : [...l.data]);
  const [tandai, setTandai] = useState<Set<string>>(new Set());
  const [sorot, setSorot] = useState<number | null>(null);
  const [salahKol, setSalahKol] = useState<number | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const target = sasaranKetuk(l);
  useSiapLangsung(lamb && !paling && !diam, () => siap());

  /* Kartu kata (Abstract): angka langsung dijawab. */
  const chip = (
    <>
      {jenis.map((j, k) => (
        <span key={k}>
          {k > 0 ? " · " : ""}
          {j.nama} <Kotak>{l.data[k]}</Kotak>
        </span>
      ))}
    </>
  );
  const gambarSemua = (
    <GambarSurvei
      d={l}
      rupa={rupa}
      jumlah={tampak}
      tandai={tandai}
      sorot={sorot}
      salahKol={salahKol}
      label={`Diagram ${TOPIK[l.topik].nama}`}
    />
  );

  const pilihKolom = (k: number) => {
    if (selesai || diam || kanvas) return;
    if (k === kolomPaling(l)) {
      setSorot(k);
      setSalahKol(null);
      setSelesai(true);
      siap(kalimatHasil(l));
    } else {
      setSalahKol(k);
      salah(l.tanya.j === "paling" && l.tanya.arah === "banyak" ? "Kolom itu bukan yang tertinggi. Bandingkan tinggi tiap kolom, dari garis bawah." : "Kolom itu bukan yang terpendek. Bandingkan tinggi tiap kolom, dari garis bawah.");
    }
  };
  const hitungKolom = (k: number) => {
    if (selesai || diam || kanvas) return;
    const kunci = `${k}:*`;
    if (tandai.has(kunci)) return;
    const baru = new Set(tandai);
    baru.add(kunci);
    const sudah = [...baru].map((x) => Number(x.split(":")[0]));
    setTandai(baru);
    setSorot(k);
    const total = sudah.reduce((s, x) => s + l.data[x], 0);
    if (baru.size === n) {
      setSelesai(true);
      siap(kalimatHasil(l));
    } else info(`${jenis[k].nama} ${kata(l.data[k])}. Jumlahnya ${kata(total)}.`);
  };
  const ketukGambar = (k: number, i: number) => {
    if (selesai || diam || kanvas || susun || lamb || paling) return;
    if (jumlah) {
      hitungKolom(k);
      return;
    }
    const kunci = `${k}:${i}`;
    if (!target.includes(kunci)) {
      salah(l.tanya.j === "selisih" ? "Ketuk hanya gambar kolom tinggi yang melewati kolom pendek." : "Ketuk hanya gambar di kolom yang ditanya.");
      return;
    }
    if (tandai.has(kunci)) return;
    const baru = new Set(tandai);
    baru.add(kunci);
    setTandai(baru);
    if (baru.size === target.length) {
      setSelesai(true);
      siap(kalimatHasil(l));
    } else info(kata(baru.size));
  };
  const ubahTampak = (k: number, beda: 1 | -1) => {
    if (selesai) return;
    const baru = tampak.map((v, i) => (i === k ? Math.min(9, Math.max(0, v + beda)) : v));
    setTampak(baru);
    if (baru.every((v, i) => v === l.data[i])) {
      setSelesai(true);
      siap(kalimatHasil(l));
    } else if (beda > 0 && baru[k] > l.data[k]) salah(`Kolom ${jenis[k].nama} sudah lebih banyak dari catatan. Kurangi satu.`);
    else info(kata(baru[k]));
  };
  const periksa = () => {
    if (paling) {
      const letak = l.data.map((v, k) => (lamb ? pusatKartu(k, n) : pusatKolom(k, n, v)));
      const r = periksaLingkari(goresan, letak, l.data.map((_, k) => k === kolomPaling(l)));
      if (r.benar) {
        setSelesai(true);
        siap(kalimatHasil(l));
      } else {
        setGoresan([]);
        salah(r.lebih > 0 ? "Lingkari satu kolom saja." : `Bandingkan tinggi tiap kolom, lalu lingkari yang paling ${l.tanya.j === "paling" ? l.tanya.arah : "banyak"}.`);
      }
      return;
    }
    const letak = jumlah ? l.data.map((v, k) => pusatKolom(k, n, v)) : target.map((x) => {
      const [k, i] = x.split(":").map(Number);
      return letakGambar(k, i, n, l.data[k]);
    });
    const r = periksaCentang(goresan, letak, jumlah ? 26 : 7);
    if (r.benar) {
      setSelesai(true);
      siap(kalimatHasil(l));
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? (jumlah ? "Satu kolom, satu tanda." : "Satu gambar, satu tanda.") : r.nyasar > 0 ? (jumlah ? "Tanda hanya di atas kolom." : "Tanda hanya di gambar yang ditanya.") : jumlah ? "Masih ada kolom yang belum diberi tanda." : "Masih ada gambar yang belum diberi tanda.");
    }
  };

  /* Abstract: kartu kata. */
  if (lamb && !paling) return <KartuTanya atas={<>Data: {chip}</>} bawah={teksTanya(l)} />;
  if (lamb && diam) return <GambarSurvei d={l} rupa={rupa} label="Kartu data" />;
  if (diam) return gambarSemua;
  if (lamb && kanvas) {
    const gambar = <GambarSurvei d={l} rupa={rupa} label="Kartu data" />;
    return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  }
  if (lamb) return <GambarSurvei d={l} rupa={rupa} sorot={sorot} salahKol={salahKol} onKolom={pilihKolom} label="Kartu data, ketuk salah satu" />;
  if (kanvas) return <Kanvas gambar={<GambarSurvei d={l} rupa={rupa} tandai={tandai} label="Diagram untuk diberi tanda" />} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  if (paling) return <GambarSurvei d={l} rupa={rupa} sorot={sorot} salahKol={salahKol} onKolom={pilihKolom} label="Diagram, ketuk kolom yang dicari" />;
  if (susun)
    return (
      <div className="space-y-2">
        <div className="rounded-2xl border-2 border-dashed border-[#B45309] bg-[#FFFBEB] px-2 py-1.5 text-center text-sm font-black text-[#78350F]">
          Catatan: {jenis.map((j, k) => `${rupa === "benda" ? `${j.ikon} ` : ""}${j.nama} ${l.data[k]}`).join(" · ")}
        </div>
        {gambarSemua}
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4" role="group" aria-label="Tambah atau kurangi gambar tiap kolom">
          {jenis.map((j, k) => (
            <div key={j.nama} className="flex items-center justify-center gap-1 rounded-xl border-2 border-[#1C01A5] bg-white px-1 py-1">
              <button type="button" aria-label={`Kurangi ${j.nama}`} disabled={selesai || tampak[k] === 0} onClick={() => ubahTampak(k, -1)} className="min-h-[40px] min-w-[40px] rounded-full border-2 border-[#1C01A5] bg-white text-lg font-black text-[#1C01A5] disabled:opacity-30">
                −
              </button>
              <span className="text-xs font-black text-[#1C01A5]">{j.nama}</span>
              <button type="button" aria-label={`Tambah ${j.nama}`} disabled={selesai} onClick={() => ubahTampak(k, 1)} className="min-h-[40px] min-w-[40px] rounded-full border-2 border-[#15803D] bg-[#DCFCE7] text-lg font-black text-[#15803D] disabled:opacity-30">
                +
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <GambarSurvei
      d={l}
      rupa={rupa}
      tandai={tandai}
      sorot={sorot}
      onGambar={ketukGambar}
      onKolom={jumlah ? hitungKolom : undefined}
      label={`Diagram ${TOPIK[l.topik].nama}, ketuk yang ditanya`}
    />
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, salah, siap, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar) salah(`Lihat lagi. ${l.keliru}`);
    else {
      setTahap("alasan");
      info(`Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    }
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
      <SoalDiagram l={l.dasar} rupa={rupa} kanvas={false} diam salah={salah} siap={() => undefined} info={info} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#78350F]">
          {l.tokoh}: &ldquo;{sesuaikan(l.kataTokoh, rupa)}&rdquo; Jawabanku {l.jawabTokoh}.
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
              {sesuaikan(l.alasan[i], rupa)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahSurvei({ ls, rupa, bicara, onBenar }: P) {
  const l: Langkah = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const salah = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p0: string) => {
    const p = sesuaikan(p0, rupa);
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const siap = (p?: string) => {
    if (n === null) {
      tuntas(p ?? "Betul!");
      return;
    }
    setSiapJawab(true);
    if (p) info(p);
  };
  const jawab = (m: number, awalan = "", ditunjukkan = false) => {
    bicara(kata(m));
    if (m === n) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}.`);
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${petunjukSalah(l, m)}`);
    }
  };
  const pk: PK = { rupa, kanvas: cara === "kanvas", salah, siap, info };
  const d = l.tipe === "salah" ? l.dasar : l;
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>{l.tipe === "salah" ? <CariSalah {...pk} kanvas={false} l={l} /> : <SoalDiagram {...pk} l={l} />}</div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{teksTanya(d)}</p>
          {cara === "kanvas" ? (
            <JawabTulisIkan kunci={n} onBenar={(t) => jawab(n, "", t)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuaraIkan kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar, t) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "", t)} onPesan={setPesan} />
          ) : (
            <PilihanIkan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}

