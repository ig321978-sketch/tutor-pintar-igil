"use client";

import React, { useMemo, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { acakSusun, angkaJawab, arahDeret, deretLanjut, deretTongkat, kata, pilihanDari, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import {
  JALUR,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  TONGKAT,
  letakSusun,
  periksaLingkariJalur,
  periksaLompat,
  periksaTandaLanjut,
  periksaUrutan,
  puncakTangga,
  pusatJalur,
  tataLanjut,
  titikTongkat,
  xDeret,
  type Goresan,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 1 Sub-Bab C: kegiatan metode (susun berurutan, lengkapi, jalur angka, hitung lanjut, tongkat hitung),
 * lalu menjawab dengan cara kelompoknya. Rupa: kardus dan tangga (Concrete), kartu titik dan diagram (Pictorial), angka saja (Abstract).
 * Tanpa skor: salah = goyang dan petunjuk.
 */

type P = { ls: LangkahSoal; rupa: Rupa; benih: number; bicara: (t: string) => void; onBenar: () => void };
type PK = { l: Langkah; rupa: Rupa; kanvas: boolean; benih: number; salah: (p: string) => void; siap: (p?: string) => void };
const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/85";
const ketuk = (f: () => void) => ({ role: "button" as const, tabIndex: 0, onClick: f, onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(), style: { cursor: "pointer" } });

/** Kartu bernilai n: kardus bernomor (benda), kartu titik (diagram), atau kartu angka (lambang). */
function Kartu({ rupa, n, x, y, sorot = false, redup = false, w = 44 }: { rupa: Rupa; n: number | null; x: number; y: number; sorot?: boolean; redup?: boolean; w?: number }) {
  const h = rupa === "diagram" ? w * 0.8 : w;
  const isi = rupa === "benda" ? "#D6A15E" : rupa === "diagram" ? "#FFFFFF" : "#FEF9C3";
  return (
    <g opacity={redup ? 0.3 : 1}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={rupa === "benda" ? 4 : 8} fill={sorot ? "#FFE566" : isi} stroke={rupa === "benda" ? "#92400E" : "#1C01A5"} strokeWidth={2.2} />
      {rupa === "benda" ? <line x1={x - w / 2} y1={y - h / 2 + 7} x2={x + w / 2} y2={y - h / 2 + 7} stroke="#92400E" strokeWidth={1.4} /> : null}
      {n === null ? (
        <text x={x} y={y + 8} textAnchor="middle" fontSize={22} fontWeight={900} fill="#DC2626">
          ?
        </text>
      ) : rupa === "diagram" ? (
        Array.from({ length: n }, (_, i) => <circle key={i} cx={x - w / 2 + 6 + (i % 5) * ((w - 12) / 4)} cy={y - h / 4 + Math.floor(i / 5) * (h / 2)} r={3.4} fill="#1C01A5" />)
      ) : (
        <text x={x} y={y + (rupa === "benda" ? 10 : 8)} textAnchor="middle" fontSize={rupa === "benda" ? 18 : 22} fontWeight={900} fill={rupa === "benda" ? "#FFFFFF" : "#DC2626"}>
          {n}
        </text>
      )}
    </g>
  );
}

function Kanvas({ gambar, selesai, goresan, setGoresan, periksa }: { gambar: React.ReactNode; selesai: boolean; goresan: Goresan[]; setGoresan: (g: Goresan[]) => void; periksa: () => void }) {
  return (
    <div className="space-y-2">
      <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
      {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
    </div>
  );
}

/** Susun berurutan: ketuk kartu satu per satu, atau tarik garis menghubungkannya. */
function Susun({ l, rupa, kanvas, benih, salah, siap }: PK & { l: Extract<Langkah, { tipe: "susun" }> }) {
  const tampil = useMemo(() => acakSusun(l.deret, benih), [l, benih]);
  const [ke, setKe] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const maju = arahDeret(l.deret) === "maju";
  const ketukKartu = (v: number) => {
    if (selesai || l.deret.indexOf(v) < ke) return;
    if (v !== l.deret[ke]) {
      salah(maju ? "Belum urut. Cari yang satu lebih banyak dari sebelumnya." : "Belum urut. Cari yang satu lebih sedikit dari sebelumnya.");
      return;
    }
    if (ke === l.deret.length - 1) {
      setSelesai(true);
      siap(`Betul! Sudah urut ${maju ? "maju" : "mundur"}.`);
    }
    setKe(ke + 1);
  };
  const periksa = () => {
    const r = periksaUrutan(goresan, l.deret.map((v) => letakSusun(tampil.indexOf(v))));
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Garisnya urut ${maju ? "maju" : "mundur"}.`);
    } else {
      setGoresan([]);
      salah(r.terlewat > 0 ? "Ada yang belum dilewati garis." : `Urutannya belum pas. Mulai dari yang paling ${maju ? "sedikit" : "banyak"}.`);
    }
  };
  const gambar = (
    <g>
      {tampil.map((v, i) => {
        const p = letakSusun(i);
        const sudah = l.deret.indexOf(v) < ke;
        return (
          <g key={v} {...(kanvas ? {} : ketuk(() => ketukKartu(v)))} aria-label={`kartu ${v}`}>
            <Kartu rupa={rupa} n={v} x={p.x} y={p.y} redup={sudah && !kanvas} />
          </g>
        );
      })}
      {!kanvas
        ? l.deret.slice(0, ke).map((v, j) => (
            <g key={`s${v}`}>
              <Kartu rupa={rupa} n={v} x={40 + j * 55} y={104} w={36} sorot />
            </g>
          ))
        : null}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Kartu untuk disusun">
      {gambar}
    </svg>
  );
}

/** Lengkapi deret: tampil saja, jawaban langsung. */
function Lengkapi({ l, rupa }: PK & { l: Extract<Langkah, { tipe: "lengkapi" }> }) {
  const n = l.deret.length;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} 110`} className={SVG} aria-label="Deret dengan satu yang hilang">
      {l.deret.map((v, i) => (
        <Kartu key={i} rupa={rupa} n={v} x={150 - ((n - 1) * 62) / 2 + i * 62} y={55} w={50} sorot={v === null} />
      ))}
    </svg>
  );
}

/** Jalur nol sampai sepuluh: anak tangga (benda), petak (diagram), atau kotak angka (lambang). */
function Jalur({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "jalur" }> }) {
  const [pos, setPos] = useState(l.n);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const k = l.tanya === "sesudah" ? l.n + 1 : l.n - 1;
  const kataMaju = rupa === "benda" ? "Naik" : "Maju";
  const kataMundur = rupa === "benda" ? "Turun" : "Mundur";
  const gerak = (d: 1 | -1) => {
    if (selesai) return;
    if (l.n + d !== k) {
      salah(l.tanya === "sesudah" ? `Sesudah berarti satu lebih banyak. Tekan ${kataMaju}.` : `Sebelum berarti satu lebih sedikit. Tekan ${kataMundur}.`);
      return;
    }
    setPos(k);
    setSelesai(true);
    siap();
  };
  const periksa = () => {
    const r = periksaLingkariJalur(goresan, rupa, k);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Itu ${rupa === "benda" ? "anak tangga" : "tempat"} ${l.tanya}nya.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu saja." : `Lingkari ${l.tanya}nya: ${l.tanya === "sesudah" ? "satu ke kanan" : "satu ke kiri"}.`);
    }
  };
  const tokoh = pusatJalur(rupa, pos);
  const gambar = (
    <g>
      {Array.from({ length: 11 }, (_, n) => {
        const x = JALUR.x0 + n * JALUR.s;
        if (rupa === "benda") {
          const top = puncakTangga(n);
          return (
            <g key={n}>
              <rect x={x} y={top} width={JALUR.s} height={184 - top} fill={n % 2 ? "#D6A15E" : "#E8B979"} stroke="#92400E" strokeWidth={1.3} />
              <text x={x + JALUR.s / 2} y={top + 13} textAnchor="middle" fontSize={11} fontWeight={900} fill="#FFFFFF">
                {n}
              </text>
            </g>
          );
        }
        return (
          <g key={n}>
            <rect x={x} y={JALUR.y} width={JALUR.s} height={JALUR.s} fill={rupa === "lambang" ? "#FFFFFF" : n % 2 ? "#FEF9C3" : "#DBEAFE"} stroke="#1C01A5" strokeWidth={1.4} />
            <text x={x + JALUR.s / 2} y={JALUR.y + 17} textAnchor="middle" fontSize={rupa === "lambang" ? 14 : 11} fontWeight={900} fill={rupa === "lambang" ? "#DC2626" : "#1C01A5"}>
              {n}
            </text>
          </g>
        );
      })}
      {rupa === "benda" ? (
        <text x={tokoh.x} y={tokoh.y - 2} textAnchor="middle" fontSize={20}>
          {"\u{1F467}"}
        </text>
      ) : (
        <path d={`M${tokoh.x - 8} ${JALUR.y - 18} L${tokoh.x + 8} ${JALUR.y - 18} L${tokoh.x} ${JALUR.y - 4} Z`} fill={rupa === "diagram" ? "#7C3AED" : "#1C01A5"} />
      )}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Jalur nol sampai sepuluh">
        {gambar}
      </svg>
      {!selesai ? (
        <div className="flex justify-center gap-2">
          <button type="button" onClick={() => gerak(-1)} className="min-h-[48px] rounded-full border-4 border-[#DC2626] bg-[#FEE2E2] px-5 text-sm font-black text-[#991B1B]">
            {"\u{2B05}\u{FE0F}"} {kataMundur} satu
          </button>
          <button type="button" onClick={() => gerak(1)} className="min-h-[48px] rounded-full border-4 border-[#16A34A] bg-[#DCFCE7] px-5 text-sm font-black text-[#15803D]">
            {kataMaju} satu {"\u{27A1}\u{FE0F}"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Hitung lanjut: mulai dari angka yang diketahui, ketuk tiap langkah (atau beri tanda di kanvas). */
function Lanjut({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "lanjut" }> }) {
  const maju = l.arah === "maju";
  const tata = useMemo(() => tataLanjut(l.mulai, l.langkah, maju), [l, maju]);
  const deret = deretLanjut(l);
  const [ke, setKe] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const maju1 = () => {
    if (ke + 1 >= l.langkah) {
      setSelesai(true);
      siap();
    }
    setKe(ke + 1);
  };
  const ketukBenda = (j: number) => {
    if (selesai) return;
    const harus = maju ? ke : l.mulai - 1 - ke;
    if (j !== harus) {
      salah(maju ? "Ketuk berurutan dari yang paling dekat dengan kotak." : "Ambil berurutan dari yang paling kanan.");
      return;
    }
    maju1();
  };
  const ketukAngka = (n: number) => {
    if (selesai) return;
    if (n !== deret[ke]) {
      salah(maju ? `Lanjutkan ke kanan. Sesudah ${kata(ke === 0 ? l.mulai : deret[ke - 1])}, angka berapa?` : `Lanjutkan ke kiri. Sebelum ${kata(ke === 0 ? l.mulai : deret[ke - 1])}, angka berapa?`);
      return;
    }
    maju1();
  };
  const periksa = () => {
    const r = periksaTandaLanjut(goresan, rupa === "lambang" ? deret.map((n) => ({ x: xDeret(n), y: 100 })) : tata.dihitung);
    if (r.benar) {
      setSelesai(true);
      siap("Betul! Satu tanda untuk tiap langkah.");
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu langkah, satu tanda." : r.nyasar > 0 ? "Beri tanda hanya pada langkah yang dihitung." : "Ada langkah yang belum diberi tanda.");
    }
  };
  const label = (j: number) => (maju ? (j < ke ? String(l.mulai + j + 1) : null) : l.mulai - 1 - j < 0 ? null : null);
  const gambar =
    rupa === "lambang" ? (
      <g>
        {Array.from({ length: 11 }, (_, n) => {
          const aktif = n === l.mulai || deret.slice(0, ke).includes(n);
          return (
            <g key={n} {...(kanvas ? {} : ketuk(() => ketukAngka(n)))} aria-label={`angka ${n}`}>
              <rect x={xDeret(n) - 12} y={86} width={24} height={30} rx={5} fill={n === l.mulai ? "#FFE566" : aktif ? "#BBF7D0" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={1.6} />
              <text x={xDeret(n)} y={107} textAnchor="middle" fontSize={15} fontWeight={900} fill="#DC2626">
                {n}
              </text>
            </g>
          );
        })}
        <text x={150} y={40} textAnchor="middle" fontSize={15} fontWeight={900} fill="#1C01A5">
          Mulai {l.mulai}, {maju ? "maju" : "mundur"} {l.langkah} langkah
        </text>
      </g>
    ) : (
      <g>
        {tata.kotak ? (
          <g>
            <rect x={tata.kotak.x} y={tata.kotak.y} width={tata.kotak.w} height={tata.kotak.h} rx={8} fill={rupa === "benda" ? "#D6A15E" : "#EDE9FE"} stroke={rupa === "benda" ? "#92400E" : "#1C01A5"} strokeWidth={2.5} />
            <text x={tata.kotak.x + tata.kotak.w / 2} y={tata.kotak.y + 40} textAnchor="middle" fontSize={30} fontWeight={900} fill={rupa === "benda" ? "#FFFFFF" : "#DC2626"}>
              {l.mulai}
            </text>
            <text x={tata.kotak.x + tata.kotak.w / 2} y={tata.kotak.y - 6} textAnchor="middle" fontSize={10} fontWeight={800} fill="#1C01A5">
              sudah ada
            </text>
          </g>
        ) : null}
        {tata.baris.map((p, j) => {
          const diambil = !maju && j >= l.mulai - ke;
          const lab = maju ? label(j) : diambil ? String(j) : null;
          return (
            <g key={j} {...(kanvas ? {} : ketuk(() => ketukBenda(j)))} aria-label={`langkah ${j + 1}`}>
              {rupa === "benda" ? (
                <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={22} opacity={diambil ? 0.25 : 1}>
                  {"\u{1F4E6}"}
                </text>
              ) : (
                <circle cx={p.x} cy={p.y} r={9} fill={maju ? "#F97316" : "#3B82F6"} stroke="#1C01A5" strokeWidth={1.4} opacity={diambil ? 0.25 : 1} />
              )}
              {lab !== null ? (
                <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize={12} fontWeight={900} fill={maju ? "#15803D" : "#DC2626"}>
                  {lab}
                </text>
              ) : null}
            </g>
          );
        })}
        {!maju ? (
          <text x={150} y={46} textAnchor="middle" fontSize={13} fontWeight={900} fill="#1C01A5">
            Ada {l.mulai}. Ambil {l.langkah} dari kanan, hitung mundur.
          </text>
        ) : null}
      </g>
    );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={SVG} aria-label="Hitung lanjut">
      {gambar}
    </svg>
  );
}

/** Tongkat hitung: angka nol, lima, sepuluh terlihat (kecuali yang ditutup). Ketuk tiap tempat dari angka yang terlihat. */
function Tongkat({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "tongkat" }> }) {
  const deret = deretTongkat(l);
  const [ke, setKe] = useState(0);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const ketukTitik = (n: number) => {
    if (selesai || kanvas) return;
    if (n !== deret[ke]) {
      salah(`Mulai dari ${kata(l.dari)}, lalu ketuk satu per satu ke arah tanda tanya.`);
      return;
    }
    if (ke + 1 >= deret.length) {
      setSelesai(true);
      siap();
    }
    setKe(ke + 1);
  };
  const periksa = () => {
    if (periksaLompat(goresan, l.dari, l.tutup)) {
      setSelesai(true);
      siap("Betul! Garisnya dari angka yang terlihat ke tanda tanya.");
    } else {
      setGoresan([]);
      salah(`Tarik garis dari ${kata(l.dari)} ke tanda tanya.`);
    }
  };
  const kayu = rupa === "benda";
  const gambar = (
    <g>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={TONGKAT.x0 + i * TONGKAT.r} y={TONGKAT.y} width={TONGKAT.r} height={16} fill={kayu ? (i % 2 ? "#B97F47" : "#D9A066") : i % 2 ? "#FFFFFF" : "#FFE566"} stroke={kayu ? "#78350F" : "#1C01A5"} strokeWidth={1.4} />
      ))}
      {Array.from({ length: 11 }, (_, n) => {
        const t = titikTongkat(n);
        const terlihat = (n === 0 || n === 5 || n === 10) && n !== l.tutup;
        const disebut = deret.slice(0, ke).includes(n) && n !== l.tutup;
        return (
          <g key={n} {...(kanvas ? {} : ketuk(() => ketukTitik(n)))} aria-label={`tempat ${n}`}>
            <line x1={t.x} y1={TONGKAT.y + 16} x2={t.x} y2={TONGKAT.y + 24} stroke={kayu ? "#78350F" : "#1C01A5"} strokeWidth={2} />
            <circle cx={t.x} cy={TONGKAT.y + 8} r={12} fill="transparent" />
            {n === l.tutup ? (
              <text x={t.x} y={TONGKAT.y + 44} textAnchor="middle" fontSize={16} fontWeight={900} fill="#DC2626">
                ?
              </text>
            ) : terlihat ? (
              <text x={t.x} y={TONGKAT.y + 42} textAnchor="middle" fontSize={rupa === "lambang" ? 15 : 13} fontWeight={900} fill="#1C01A5">
                {n}
              </text>
            ) : null}
            {disebut ? <circle cx={t.x} cy={TONGKAT.y - 8} r={5} fill="#16A34A" /> : null}
          </g>
        );
      })}
    </g>
  );
  if (kanvas) return <Kanvas gambar={gambar} selesai={selesai} goresan={goresan} setGoresan={setGoresan} periksa={periksa} />;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} 160`} className={SVG} aria-label="Tongkat hitung">
      {gambar}
    </svg>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Hitung lagi dari tetangganya, maju atau mundur satu-satu.",
  jalur: "Sebelum berarti satu ke kiri. Sesudah berarti satu ke kanan.",
  lanjut: "Mulai dari angka yang diketahui, lalu hitung lanjut satu-satu.",
  tongkat: "Mulai dari angka yang terlihat, lalu hitung satu-satu sampai tanda tanya.",
};

export function LangkahUrut({ ls, rupa, benih, bicara, onBenar }: P) {
  const l = ls.langkah;
  const cara = ls.cara;
  const n = angkaJawab(l);
  const [siapJawab, setSiapJawab] = useState(l.tipe === "lengkapi");
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);

  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const pesanBenar = (m: number): string => {
    switch (l.tipe) {
      case "jalur":
        return `Betul! ${kapital(l.tanya)} ${kata(l.n)} adalah ${kata(m)}.`;
      case "lanjut":
        return `Betul! Dari ${kata(l.mulai)}, hitung ${l.arah} sampai ${kata(m)}.`;
      case "tongkat":
        return `Betul! Angka yang ditutup adalah ${kata(m)}.`;
      default:
        return `Betul! Yang hilang adalah ${kata(m)}.`;
    }
  };
  const siap = (p?: string) => {
    if (n === null) {
      tuntas(p ?? "Betul! Sudah urut.");
      return;
    }
    setSiapJawab(true);
    if (p) {
      setPesan(p);
      bicara(p);
    }
  };
  const jawab = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(pesanBenar(m));
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const pk: PK = { l, rupa, kanvas: cara === "kanvas", benih, salah, siap };
  const tanya = l.tipe === "jalur" ? `Angka berapa ${l.tanya} ${kata(l.n)}?` : l.tipe === "lanjut" ? "Sampai angka berapa?" : l.tipe === "tongkat" ? "Angka berapa yang ditutup?" : "Angka berapa yang hilang?";
  return (
    <div className="space-y-3">
      <div className={goyang && !siapJawab ? "lm-goyang" : ""}>
        {l.tipe === "susun" ? <Susun {...pk} l={l} /> : l.tipe === "lengkapi" ? <Lengkapi {...pk} l={l} /> : l.tipe === "jalur" ? <Jalur {...pk} l={l} /> : l.tipe === "lanjut" ? <Lanjut {...pk} l={l} /> : <Tongkat {...pk} l={l} />}
      </div>
      {siapJawab && !selesai && n !== null ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
          {cara === "kanvas" ? (
            <JawabTulis kunci={n} onBenar={() => jawab(n)} onSalah={salah} />
          ) : cara === "suara" ? (
            <JawabSuara kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar) => jawab(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "")} onPesan={setPesan} />
          ) : (
            <Pilihan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawab(m)} />
          )}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
