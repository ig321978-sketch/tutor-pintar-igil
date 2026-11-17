"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { KanvasTulis, TombolPeriksa } from "../opsi2/primitif";
import { JawabSuara, JawabTulis, Pilihan } from "../lemari-k1b1a/Jawab";
import { KATA_BANDING, angkaJawab, bolehPasang, kata, kunciLangkah, namaBenda, pilihanDari, sisaPasangan, type KataBanding, type Langkah, type LangkahSoal, type Rupa } from "./logika";
import { EMOJI } from "./data";
import {
  BINGKAI,
  GARIS,
  LEBAR_ADEGAN,
  TINGGI_ADEGAN,
  penandaGaris,
  periksaCoretSatu,
  periksaGarisPasang,
  periksaLingkariSatu,
  periksaSatuLagi,
  pusatBingkai,
  pusatSel,
  tataPasang,
  tataSatu,
  xAngka,
  type Goresan,
} from "./periksa";

/**
 * Satu soal CPA Kelas 1 Bab 1 Sub-Bab B: kegiatan metode (memasangkan, bingkai sepuluh, garis, satu lebih atau sedikit),
 * lalu menjawab dengan cara kelompoknya (pilih, tulis di kanvas, atau ucapkan). Rupa menentukan gambar: emoji mainan (Concrete),
 * titik dan garis (Pictorial), atau angka dan kata (Abstract). Tanpa skor: salah = goyang dan petunjuk, coba lagi.
 */

type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
const WARNA_A = "#3B82F6";
const WARNA_B = "#F97316";
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Gambar satu benda di SVG ------------------------------ */
function Benda({ rupa, jenis, x, y, warna, angkaG, redup = false, sorot = false, u = 24 }: { rupa: Rupa; jenis: string; x: number; y: number; warna: string; angkaG?: number; redup?: boolean; sorot?: boolean; u?: number }) {
  const op = redup ? 0.25 : 1;
  const cincin = sorot ? <circle cx={x} cy={y} r={u * 0.62} fill="#FFE566" stroke="#DC2626" strokeWidth={2.5} /> : null;
  if (rupa === "lambang")
    return (
      <g opacity={op}>
        <rect x={x - 22} y={y - 18} width={44} height={36} rx={8} fill={sorot ? "#FFE566" : "#FFFFFF"} stroke="#1C01A5" strokeWidth={2} />
        <text x={x} y={y + 9} textAnchor="middle" fontSize={24} fontWeight={900} fill="#DC2626">
          {angkaG}
        </text>
      </g>
    );
  if (rupa === "diagram")
    return (
      <g opacity={op}>
        {cincin}
        <circle cx={x} cy={y} r={u * 0.36} fill={warna} stroke="#1C01A5" strokeWidth={1.6} />
      </g>
    );
  return (
    <g opacity={op}>
      {cincin}
      <text x={x} y={y + u * 0.35} textAnchor="middle" fontSize={u}>
        {EMOJI[jenis] ?? "\u{2B50}"}
      </text>
    </g>
  );
}

const SVG = "mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl";
const ketuk = (f: () => void) => ({
  role: "button" as const,
  tabIndex: 0,
  onClick: f,
  onKeyDown: (e: React.KeyboardEvent) => (e.key === "Enter" || e.key === " ") && f(),
  style: { cursor: "pointer" },
});

/* ------------------------------ Isi kegiatan ------------------------------ */
type PK = {
  l: Langkah;
  rupa: Rupa;
  kanvas: boolean;
  suara: boolean;
  salah: (p: string) => void;
  /** Kegiatan selesai: lanjut ke jawaban (atau tuntas bila tanpa jawaban). */
  siap: (p?: string) => void;
  bicara: (t: string) => void;
};

/** Memasangkan dua barisan. Klik: ketuk atas lalu bawah. Suara: tombol Pasangkan berjalan sendiri. Kanvas: tarik garis. */
function Pasang({ l, rupa, kanvas, suara, salah, siap }: PK & { l: Extract<Langkah, { tipe: "pasang" }> }) {
  const { atas, bawah } = useMemo(() => tataPasang(l.a, l.b, l.renggang), [l]);
  const [pasangan, setPasangan] = useState<[number, number][]>([]);
  const [pilih, setPilih] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const pewaktu = useRef<number[]>([]);
  useEffect(() => () => pewaktu.current.forEach((t) => window.clearTimeout(t)), []);
  const sisa = sisaPasangan(l.a, l.b);
  const lengkap = (ps: [number, number][]) => {
    setSelesai(true);
    siap(sisa.baris === null ? "Semua punya pasangan, tidak ada yang bersisa." : `Ada ${kata(sisa.nomor.length)} yang tidak punya pasangan.`);
    return ps;
  };
  const ketukAtas = (i: number) => {
    if (selesai || pasangan.some(([p]) => p === i)) return;
    setPilih(i);
  };
  const ketukBawah = (j: number) => {
    if (selesai) return;
    if (pilih === null) {
      salah(`Ketuk ${rupa === "benda" ? namaBenda(l.ja) : "titik"} di atas dulu.`);
      return;
    }
    if (!bolehPasang(pasangan, pilih, j, l.a, l.b)) {
      salah("Yang ini sudah punya pasangan. Pilih yang lain.");
      return;
    }
    const baru: [number, number][] = [...pasangan, [pilih, j]];
    setPasangan(baru);
    setPilih(null);
    if (baru.length === Math.min(l.a, l.b)) lengkap(baru);
  };
  const otomatis = () => {
    const n = Math.min(l.a, l.b);
    pewaktu.current = Array.from({ length: n }, (_, i) =>
      window.setTimeout(() => {
        setPasangan((s) => [...s, [i, i]]);
        if (i === n - 1) lengkap([]);
      }, 450 * (i + 1)),
    );
    if (n === 0) lengkap([]);
  };
  const periksa = () => {
    const r = periksaGarisPasang(goresan, atas, bawah);
    if (r.benar) {
      setSelesai(true);
      siap(sisa.baris === null ? "Betul! Semua punya pasangan." : `Betul! Yang bersisa menyala: ada ${kata(sisa.nomor.length)}.`);
    } else {
      setGoresan([]);
      salah(r.dobel > 0 ? "Satu benda hanya boleh punya satu garis." : r.nyasar > 0 ? "Tarik garis dari benda atas tepat ke benda bawah." : "Masih ada yang belum punya garis.");
    }
  };
  const bersisa = (baris: "atas" | "bawah", i: number) => selesai && sisa.baris === baris && sisa.nomor.includes(i);

  if (rupa === "lambang")
    return (
      <div className="flex items-center justify-center gap-6 py-2">
        {[l.a, l.b].map((n, i) => (
          <div key={i} className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#FFE566] bg-white text-5xl font-black text-[#DC2626] shadow-[0_5px_0_rgba(0,0,0,0.25)]">
            {n}
          </div>
        ))}
      </div>
    );

  const gambar = (
    <g>
      {pasangan.map(([i, j], n) => (
        <line key={n} x1={atas[i].x} y1={atas[i].y + 14} x2={bawah[j].x} y2={bawah[j].y - 14} stroke="#16A34A" strokeWidth={3} strokeLinecap="round" />
      ))}
      {atas.map((p, i) => (
        <g key={`a${i}`} {...(kanvas ? {} : ketuk(() => ketukAtas(i)))} aria-label={`atas ${i + 1}`}>
          <Benda rupa={rupa} jenis={l.ja} x={p.x} y={p.y} warna={WARNA_A} sorot={pilih === i || bersisa("atas", i)} />
        </g>
      ))}
      {bawah.map((p, j) => (
        <g key={`b${j}`} {...(kanvas ? {} : ketuk(() => ketukBawah(j)))} aria-label={`bawah ${j + 1}`}>
          <Benda rupa={rupa} jenis={l.jb} x={p.x} y={p.y} warna={WARNA_B} sorot={bersisa("bawah", j)} />
        </g>
      ))}
    </g>
  );
  if (kanvas)
    return (
      <div className="space-y-2">
        <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
        {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
      </div>
    );
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={`${SVG} bg-white/80`} aria-label="Dua barisan untuk dipasangkan">
        {gambar}
      </svg>
      {suara && !selesai && pasangan.length === 0 ? (
        <div className="flex justify-center">
          <button type="button" onClick={otomatis} className="min-h-[48px] rounded-full border-4 border-[#1C01A5] bg-[#FFE566] px-5 text-sm font-black text-[#1C01A5]">
            {"\u{1F517}"} Pasangkan
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Dua bingkai sepuluh. Klik atau suara: isi (benda), hitung titik (diagram), atau nyalakan kotak angka (lambang). Kanvas: lingkari. */
function Bingkai({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "bingkai" }> }) {
  const target = [l.a, l.b];
  const [isi, setIsi] = useState<[number, number]>(kanvas || rupa === "diagram" ? [l.a, l.b] : [0, 0]);
  const [hitung, setHitung] = useState<[number, number]>([0, 0]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const cek = (i2: [number, number], h2: [number, number]) => {
    const penuh = rupa === "diagram" ? h2[0] === l.a && h2[1] === l.b : i2[0] === l.a && i2[1] === l.b;
    if (penuh && !selesai) {
      setSelesai(true);
      siap(`Bingkai pertama ${kata(l.a)}, bingkai kedua ${kata(l.b)}.`);
    }
  };
  const tambahIsi = (k: 0 | 1) => {
    if (selesai || isi[k] >= target[k]) return;
    const baru: [number, number] = k === 0 ? [isi[0] + 1, isi[1]] : [isi[0], isi[1] + 1];
    setIsi(baru);
    cek(baru, hitung);
  };
  const ketukSel = (k: 0 | 1, i: number) => {
    if (selesai) return;
    if (rupa === "diagram") {
      if (i !== hitung[k]) {
        salah("Hitung berurutan, mulai dari kotak pertama baris atas.");
        return;
      }
      const baru: [number, number] = k === 0 ? [hitung[0] + 1, hitung[1]] : [hitung[0], hitung[1] + 1];
      setHitung(baru);
      cek(isi, baru);
    } else if (rupa === "lambang") {
      if (i !== isi[k]) {
        salah("Nyalakan kotak berurutan dari angka satu.");
        return;
      }
      if (i >= target[k]) {
        salah(`Berhenti di angka ${kata(target[k])}.`);
        return;
      }
      tambahIsi(k);
    }
  };
  const k = l.tanya === "banyak" ? (l.a >= l.b ? 0 : 1) : l.a <= l.b ? 0 : 1;
  const periksa = () => {
    const r = periksaLingkariSatu(goresan, [pusatBingkai(0), pusatBingkai(1)], k);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Bingkai itu ${l.tanya === "banyak" ? "lebih penuh" : "lebih kosong"}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu bingkai saja." : `Lingkari bingkai yang ${l.tanya === "banyak" ? "lebih penuh" : "lebih kosong"}.`);
    }
  };
  const jenis = [l.ja, l.jb];
  const gambar = (
    <g>
      {([0, 1] as const).map((b) => (
        <g key={b}>
          <text x={pusatBingkai(b).x} y={BINGKAI.y - 10} textAnchor="middle" fontSize={rupa === "lambang" ? 18 : 13} fontWeight={900} fill={rupa === "lambang" ? "#DC2626" : "#1C01A5"}>
            {rupa === "lambang" ? target[b] : rupa === "benda" ? `${namaBenda(jenis[b])}` : `bingkai ${b + 1}`}
          </text>
          {Array.from({ length: 10 }, (_, i) => {
            const c = pusatSel(b, i);
            const terisi = i < isi[b];
            return (
              <g key={i} {...(!kanvas && rupa !== "benda" ? ketuk(() => ketukSel(b, i)) : {})} aria-label={`kotak ${i + 1}`}>
                <rect x={c.x - BINGKAI.sel / 2} y={c.y - BINGKAI.sel / 2} width={BINGKAI.sel} height={BINGKAI.sel} fill={rupa === "lambang" && terisi ? (b === 0 ? "#BFDBFE" : "#FED7AA") : "#FFFFFF"} stroke="#1C01A5" strokeWidth={1.5} />
                {rupa === "lambang" ? (
                  <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={13} fontWeight={900} fill={terisi ? "#1C01A5" : "#94A3B8"}>
                    {i + 1}
                  </text>
                ) : terisi ? (
                  <Benda rupa={rupa} jenis={jenis[b]} x={c.x} y={c.y} warna={b === 0 ? WARNA_A : WARNA_B} u={20} />
                ) : null}
                {rupa === "diagram" && i < hitung[b] ? (
                  <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize={10} fontWeight={900} fill="#FFFFFF">
                    {i + 1}
                  </text>
                ) : null}
              </g>
            );
          })}
          {rupa === "benda" && !kanvas
            ? Array.from({ length: target[b] - isi[b] }, (_, i) => (
                <g key={`h${i}`} {...ketuk(() => tambahIsi(b))} aria-label={`masukkan ${namaBenda(jenis[b])}`}>
                  <Benda rupa="benda" jenis={jenis[b]} x={BINGKAI.x[b] + 12 + (i % 5) * 26} y={140 + Math.floor(i / 5) * 26} warna="" u={20} />
                </g>
              ))
            : null}
        </g>
      ))}
    </g>
  );
  if (kanvas)
    return (
      <div className="space-y-2">
        <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
        {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
      </div>
    );
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={`${SVG} bg-white/80`} aria-label="Dua bingkai sepuluh">
      {gambar}
    </svg>
  );
}

/** Garis nol sampai sepuluh: ubin lantai (benda), garis bilangan (diagram), atau deret angka (lambang). */
function Garis({ l, rupa, kanvas, salah, siap }: PK & { l: Extract<Langkah, { tipe: "garis" }> }) {
  const [taruh, setTaruh] = useState<(number | null)[]>(kanvas ? [l.a, l.b] : [null, null]);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  const giliran = taruh[0] === null ? 0 : 1;
  const angkaG = [l.a, l.b];
  const jenis = [l.ja, l.jb];
  const ketukAngka = (n: number) => {
    if (selesai || kanvas) return;
    if (n !== angkaG[giliran]) {
      salah(rupa === "lambang" ? `Cari angka ${kata(angkaG[giliran])}.` : "Hitung lagi barisannya, lalu ketuk angka banyaknya.");
      return;
    }
    const baru = giliran === 0 ? [n, null] : [taruh[0], n];
    setTaruh(baru);
    if (giliran === 1) {
      setSelesai(true);
      siap(`${kapital(kata(l.a))} dan ${kata(l.b)} sudah di tempatnya.`);
    }
  };
  const k = l.tanya === "banyak" ? (l.a >= l.b ? 0 : 1) : l.a <= l.b ? 0 : 1;
  const periksa = () => {
    const r = periksaLingkariSatu(goresan, penandaGaris(l.a, l.b), k);
    if (r.benar) {
      setSelesai(true);
      siap(`Betul! Letaknya lebih ${l.tanya === "banyak" ? "kanan" : "kiri"}.`);
    } else {
      setGoresan([]);
      salah(r.lebih > 0 ? "Lingkari satu saja." : `Lingkari yang letaknya lebih ${l.tanya === "banyak" ? "kanan" : "kiri"}.`);
    }
  };
  const tanda = penandaGaris(l.a, l.b);
  const gambar = (
    <g>
      {rupa === "diagram" ? <line x1={GARIS.x0 - 10} y1={GARIS.y} x2={xAngka(10) + 10} y2={GARIS.y} stroke="#1C01A5" strokeWidth={3} /> : null}
      {Array.from({ length: 11 }, (_, n) => (
        <g key={n} {...(kanvas ? {} : ketuk(() => ketukAngka(n)))} aria-label={`angka ${n}`}>
          {rupa === "benda" ? <rect x={xAngka(n) - 12} y={GARIS.y - 12} width={24} height={24} rx={3} fill={n % 2 ? "#FDE68A" : "#FCD34D"} stroke="#92400E" strokeWidth={1.4} /> : null}
          {rupa === "lambang" ? <rect x={xAngka(n) - 12} y={GARIS.y - 14} width={24} height={28} rx={5} fill="#FFFFFF" stroke="#1C01A5" strokeWidth={1.6} /> : null}
          {rupa === "diagram" ? <line x1={xAngka(n)} y1={GARIS.y - 7} x2={xAngka(n)} y2={GARIS.y + 7} stroke="#1C01A5" strokeWidth={2} /> : null}
          <text x={xAngka(n)} y={rupa === "diagram" ? GARIS.y + 24 : GARIS.y + 5} textAnchor="middle" fontSize={rupa === "lambang" ? 15 : 12} fontWeight={900} fill={rupa === "lambang" ? "#DC2626" : "#1C01A5"}>
            {n}
          </text>
          <rect x={xAngka(n) - 13} y={GARIS.y - 40} width={26} height={70} fill="transparent" />
        </g>
      ))}
      {[0, 1].map((g) =>
        taruh[g] !== null ? (
          <g key={g}>
            <line x1={tanda[g].x} y1={tanda[g].y + 14} x2={tanda[g].x} y2={GARIS.y - 12} stroke={g === 0 ? WARNA_A : WARNA_B} strokeWidth={2} strokeDasharray="3 3" />
            {rupa === "benda" ? <Benda rupa="benda" jenis={jenis[g]} x={tanda[g].x} y={tanda[g].y} warna="" u={22} /> : rupa === "diagram" ? <circle cx={tanda[g].x} cy={tanda[g].y} r={9} fill={g === 0 ? WARNA_A : WARNA_B} stroke="#1C01A5" strokeWidth={1.6} /> : (
              <text x={tanda[g].x} y={tanda[g].y + 6} textAnchor="middle" fontSize={18} fontWeight={900} fill={g === 0 ? WARNA_A : WARNA_B}>
                {"\u{25BC}"}
              </text>
            )}
          </g>
        ) : null,
      )}
      {!kanvas
        ? [0, 1].map((g) => (
            <g key={`k${g}`} opacity={g === giliran || taruh[g] !== null ? 1 : 0.45}>
              <rect x={g === 0 ? 8 : 154} y={8} width={138} height={44} rx={10} fill={g === giliran && !selesai ? "#FFF7CC" : "#FFFFFF"} stroke={g === 0 ? WARNA_A : WARNA_B} strokeWidth={2.5} />
              {rupa === "lambang" ? (
                <text x={g === 0 ? 77 : 223} y={36} textAnchor="middle" fontSize={16} fontWeight={900} fill="#1C01A5">
                  {kata(angkaG[g])}
                </text>
              ) : angkaG[g] === 0 ? (
                <text x={g === 0 ? 77 : 223} y={35} textAnchor="middle" fontSize={12} fontWeight={800} fill="#64748B">
                  kosong
                </text>
              ) : (
                Array.from({ length: angkaG[g] }, (_, i) =>
                  rupa === "benda" ? (
                    <text key={i} x={(g === 0 ? 8 : 154) + 12 + (i % 5) * 26} y={(angkaG[g] > 5 ? 26 : 38) + Math.floor(i / 5) * 18} fontSize={angkaG[g] > 5 ? 15 : 20}>
                      {EMOJI[jenis[g]]}
                    </text>
                  ) : (
                    <circle key={i} cx={(g === 0 ? 8 : 154) + 18 + (i % 5) * 24} cy={(angkaG[g] > 5 ? 21 : 30) + Math.floor(i / 5) * 18} r={7} fill={g === 0 ? WARNA_A : WARNA_B} stroke="#1C01A5" strokeWidth={1.2} />
                  ),
                )
              )}
            </g>
          ))
        : null}
    </g>
  );
  if (kanvas)
    return (
      <div className="space-y-2">
        <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
        {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
      </div>
    );
  return (
    <div className="space-y-1">
      {!selesai ? (
        <p className="text-center text-xs font-black text-[#1C01A5]">
          {rupa === "lambang" ? `Ketuk angka ${kata(angkaG[giliran])}.` : `Ketuk angka untuk barisan ${giliran === 0 ? "biru" : "oranye"}.`}
        </p>
      ) : null}
      <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={`${SVG} bg-white/80`} aria-label="Garis angka nol sampai sepuluh">
        {gambar}
      </svg>
    </div>
  );
}

/** Satu lebih banyak atau satu lebih sedikit. */
function Satu({ l, rupa, kanvas, suara, salah, siap }: PK & { l: Extract<Langkah, { tipe: "satu" }> }) {
  const lebih = l.arah === "lebih";
  const tata = useMemo(() => tataSatu(l.a, lebih), [l.a, lebih]);
  const [n, setN] = useState(l.a);
  const [ambil, setAmbil] = useState<number | null>(null);
  const [goresan, setGoresan] = useState<Goresan[]>([]);
  const [selesai, setSelesai] = useState(false);
  useEffect(() => {
    if (rupa === "lambang" && kanvas) siap();
    // Hanya saat langkah dibuka.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const k = lebih ? l.a + 1 : l.a - 1;
  const beri = () => {
    if (selesai || !lebih) return;
    setN(l.a + 1);
    setSelesai(true);
    siap(`Sekarang satu lebih banyak dari ${kata(l.a)}.`);
  };
  const ambilSatu = (i: number) => {
    if (selesai) return;
    if (lebih) {
      salah("Ketuk kotak hadiah untuk memberi satu lagi.");
      return;
    }
    setAmbil(i);
    setN(l.a - 1);
    setSelesai(true);
    siap(`Sekarang satu lebih sedikit dari ${kata(l.a)}.`);
  };
  const periksa = () => {
    if (lebih) {
      if (tata.kosong && periksaSatuLagi(goresan, tata.kosong)) {
        setSelesai(true);
        siap("Betul! Ada satu lagi di kotak kosong.");
      } else {
        setGoresan([]);
        salah("Gambar satu saja, tepat di kotak kosong.");
      }
    } else {
      const r = periksaCoretSatu(goresan, tata.benda);
      if (r.benar) {
        setSelesai(true);
        siap("Betul! Satu sudah dicoret.");
      } else {
        setGoresan([]);
        salah(r.kena > 1 ? "Coret satu saja." : "Coret tepat di satu benda.");
      }
    }
  };

  if (rupa === "lambang") {
    const pilihAngka = (m: number) => {
      if (selesai) return;
      if (m === k) {
        setSelesai(true);
        siap();
      } else salah(lebih ? "Satu lebih banyak adalah angka sesudahnya, di sebelah kanan." : "Satu lebih sedikit adalah angka sebelumnya, di sebelah kiri.");
    };
    return (
      <div className="space-y-3 py-1">
        <p className="text-center text-2xl font-black text-[#1C01A5]">
          Satu lebih {lebih ? "banyak" : "sedikit"} dari <span className="rounded-xl bg-[#FFE566] px-3 text-[#DC2626]">{l.a}</span> adalah ...
        </p>
        {!kanvas && !suara ? (
          <div className="flex flex-wrap justify-center gap-1" role="group" aria-label="Deret angka">
            {Array.from({ length: 11 }, (_, m) => (
              <button key={m} type="button" onClick={() => pilihAngka(m)} className={`h-11 w-9 rounded-lg border-2 text-lg font-black ${m === l.a ? "border-[#FFE566] bg-[#FFE566] text-[#1C01A5]" : selesai && m === k ? "border-[#16A34A] bg-[#BBF7D0] text-[#15803D]" : "border-[#1C01A5]/40 bg-white text-[#1C01A5]"}`}>
                {m}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  const gambar = (
    <g>
      {tata.benda.map((p, i) => (
        <g key={i} {...(kanvas ? {} : ketuk(() => ambilSatu(i)))} aria-label={`benda ${i + 1}`}>
          <Benda rupa={rupa} jenis={l.ja} x={p.x} y={p.y} warna={WARNA_A} redup={ambil === i} />
          {ambil === i ? <line x1={p.x - 12} y1={p.y + 12} x2={p.x + 12} y2={p.y - 12} stroke="#DC2626" strokeWidth={3} /> : null}
        </g>
      ))}
      {tata.kosong ? (
        <g>
          <rect x={tata.kosong.x} y={tata.kosong.y} width={tata.kosong.w} height={tata.kosong.h} rx={6} fill={n > l.a ? "#DCFCE7" : "#FFFFFF"} stroke="#16A34A" strokeWidth={2} strokeDasharray="4 3" />
          {n > l.a ? <Benda rupa={rupa} jenis={l.ja} x={tata.kosong.x + 13} y={tata.kosong.y + 18} warna={WARNA_A} /> : null}
        </g>
      ) : null}
      {lebih && !kanvas && !selesai ? (
        <g {...ketuk(beri)} aria-label="Kotak hadiah, beri satu lagi">
          <text x={150} y={178} textAnchor="middle" fontSize={34}>
            {"\u{1F381}"}
          </text>
        </g>
      ) : null}
    </g>
  );
  if (kanvas)
    return (
      <div className="space-y-2">
        <KanvasTulis lebar={LEBAR_ADEGAN} tinggi={TINGGI_ADEGAN} goresan={goresan} onUbah={setGoresan} terkunci={selesai} panduan={gambar} />
        {!selesai ? <TombolPeriksa aktif={goresan.length > 0} onClick={periksa} /> : null}
      </div>
    );
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={`${SVG} bg-white/80`} aria-label="Barisan untuk satu lebih atau satu sedikit">
      {gambar}
    </svg>
  );
}

/* ------------------------------ Satu soal: kegiatan lalu jawaban ------------------------------ */
const PETUNJUK: Record<string, string> = {
  igil: "Pasangkan lagi. Lihat mana yang bersisa.",
  bingkai: "Lihat lagi, bingkai mana yang lebih penuh.",
  garis: "Lihat lagi, mana yang letaknya lebih kanan.",
  satu: "Satu lebih banyak adalah angka sesudahnya. Satu lebih sedikit adalah angka sebelumnya.",
};

export function LangkahBanding({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
  const cara = ls.cara;
  const [siapJawab, setSiapJawab] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const [matiKata, setMatiKata] = useState<string[]>([]);
  const k = kunciLangkah(l);
  const n = angkaJawab(l);
  const tanpaKegiatan = rupa === "lambang" && (l.tipe === "pasang" || (l.tipe === "satu" && cara === "suara"));

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
  const label = (i: 0 | 1) => (rupa === "lambang" ? String(i === 0 ? (l as { a: number }).a : (l as { b: number }).b) : rupa === "benda" ? namaBenda(i === 0 ? l.ja : (l as { jb: string }).jb) : i === 0 ? "Baris atas" : "baris bawah");
  /** Nama kelompok untuk diucapkan: angka dieja dengan kata. */
  const sebut = (i: 0 | 1) => (rupa === "lambang" ? kata(Number(label(i))) : label(i));
  const pesanBenar = (): string => {
    if (typeof k === "string") return `Betul! ${kapital(sebut(0))} ${k} ${k === "sama banyak" ? "dengan" : "dari"} ${sebut(1)}.`;
    if (n === null) return "Betul! Yang bersisa sudah menyala.";
    if (l.tipe === "satu") return `Betul! ${kapital(kata(n))} adalah satu lebih ${l.arah === "lebih" ? "banyak" : "sedikit"} dari ${kata(l.a)}.`;
    if (l.tipe === "pasang" && l.tanya === "sisa") return `Betul! Ada ${kata(n)} yang tidak punya pasangan.`;
    if (l.tipe === "pasang" && l.tanya === "sama") return `Betul! Sama banyak, masing-masing ${kata(n)}.`;
    return `Betul! Yang ${l.tanya === "banyak" ? "lebih banyak" : "lebih sedikit"} ada ${kata(n)}.`;
  };
  const siap = (p?: string) => {
    if (n === null && typeof k !== "string") {
      tuntas(p ?? pesanBenar());
      return;
    }
    if (rupa === "lambang" && l.tipe === "satu" && cara === "klik") {
      tuntas(pesanBenar());
      return;
    }
    setSiapJawab(true);
    if (p) {
      setPesan(p);
      bicara(p);
    }
  };
  const jawabAngka = (m: number, awalan = "") => {
    bicara(kata(m));
    if (m === n) tuntas(pesanBenar());
    else {
      setMati((s) => [...s, m]);
      salah(`${awalan}${PETUNJUK[ls.metode]}`);
    }
  };
  const jawabKata = (w: KataBanding) => {
    bicara(w);
    if (w === k) tuntas(pesanBenar());
    else {
      setMatiKata((s) => [...s, w]);
      salah(PETUNJUK.igil);
    }
  };

  const pk: PK = { l, rupa, kanvas: cara === "kanvas", suara: cara === "suara", salah, siap, bicara };
  const siapTampil = siapJawab || tanpaKegiatan;
  const tanya =
    typeof k === "string"
      ? null
      : l.tipe === "satu"
        ? `Berapa satu lebih ${l.arah === "lebih" ? "banyak" : "sedikit"} dari ${kata(l.a)}?`
        : l.tipe === "pasang" && l.tanya === "sisa"
          ? "Berapa yang tidak punya pasangan?"
          : l.tipe === "pasang" && l.tanya === "sama"
            ? "Sama banyak. Berapa banyaknya?"
            : `Berapa yang ${l.tanya === "banyak" ? "lebih banyak" : "lebih sedikit"}?`;

  return (
    <div className="space-y-3">
      <div className={goyang && !siapTampil ? "lm-goyang" : ""}>
        {l.tipe === "pasang" ? <Pasang {...pk} l={l} /> : l.tipe === "bingkai" ? <Bingkai {...pk} l={l} /> : l.tipe === "garis" ? <Garis {...pk} l={l} /> : <Satu {...pk} l={l} />}
      </div>
      {siapTampil && !selesai ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          {typeof k === "string" ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                {kapital(label(0))} ... {label(1)}
              </p>
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih kata banding">
                {KATA_BANDING.map((w) => (
                  <button key={w} type="button" disabled={matiKata.includes(w)} onClick={() => jawabKata(w)} className="min-h-[52px] rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30">
                    {w}
                  </button>
                ))}
              </div>
            </>
          ) : n !== null ? (
            <>
              <p className="text-center text-sm font-black text-[#1C01A5]">{tanya}</p>
              {cara === "kanvas" ? (
                <JawabTulis kunci={n} onBenar={() => jawabAngka(n)} onSalah={salah} />
              ) : cara === "suara" ? (
                <JawabSuara kunci={n} pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onJawab={(m, terdengar) => jawabAngka(m, terdengar && m !== n ? `Terdengar ${kata(m)}. ` : "")} onPesan={setPesan} />
              ) : (
                <Pilihan pilihan={pilihanDari(l)} rupa={rupa} mati={mati} onPilih={(m) => jawabAngka(m)} />
              )}
            </>
          ) : null}
        </div>
      ) : null}
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
