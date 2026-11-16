"use client";

import React, { useEffect, useRef, useState } from "react";
import { GESER_Y_KANVAS, ID_TIGA_CERMIN, LEBAR_KANVAS, SKALA_KANVAS, TINGGI_KANVAS, modelTulis } from "@/lib/opsi2/tindakan-abstract-k1b1a";
import { TombolSuaraGuru } from "../tahap-b-gaya";
import { HubungkanGaris, KanvasTulis, PilihKata, TombolPeriksa, type Goresan } from "./primitif";
import { daftarkanKomponen } from "./registri-komponen";
import type { PropsAksi } from "./tipe-aksi";

/**
 * Komponen tindakan Abstract Kelas 1 Bab 1 Sub-Bab A. Satu komponen per id tindakan di
 * src/lib/opsi2/tindakan-abstract-k1b1a.ts. LAMBANG DAN KATA SAJA: lambang bilangan tampil sebagai huruf besar,
 * kata bilangan sebagai tulisan dengan tombol dengar, tanpa gambar atau emoji benda dan tanpa diagram.
 * Suara selalu tanpa digit (kata bilangan dieja oleh pembangkit soal).
 */

const RING_KEDIP = "igil-denyut bg-[#FFF3B0] ring-4 ring-[#FFC800]";
const WARNA_GORESAN = ["#DC2626", "#7C3AED", "#2563EB"];

/** Pilihan yang sudah keliru (hanya bila memang salah). */
const pilihanSalah = (p: PropsAksi): string[] =>
  p.riwayat
    .map((r) => (r && typeof r === "object" ? (r as { pilih?: unknown }).pilih : undefined))
    .filter((x): x is string => typeof x === "string" && x !== p.instans.kunciPilihan);

/** Menampilkan lambang pilihan. Tiga yang terbalik digambar sebagai tiga yang dicerminkan. */
function TampilLambang({ id, label }: { id: string; label: string }) {
  if (id === ID_TIGA_CERMIN) return <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>3</span>;
  return <>{label}</>;
}

/** Kartu pilihan lambang besar (tanpa tombol dengar: lambangnya sendiri adalah jawaban yang dicari). */
function PilihLambang({ p }: { p: PropsAksi }) {
  const salah = pilihanSalah(p);
  const pilihan = p.instans.pilihan ?? [];
  return (
    <div role="group" aria-label="Pilihan lambang" className={`grid gap-2 ${pilihan.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
      {pilihan.map((pl) => {
        const sudahSalah = salah.includes(pl.id);
        const benar = p.terkunci && p.instans.kunciPilihan === pl.id;
        return (
          <button
            key={pl.id}
            type="button"
            disabled={p.terkunci || sudahSalah}
            aria-label={pl.suara}
            onClick={() => p.kirim({ pilih: pl.id })}
            className={`flex min-h-[84px] items-center justify-center rounded-2xl border-4 text-6xl font-black leading-none ${
              benar ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : sudahSalah ? "border-[#CBD5E1] bg-[#F1F5F9] text-[#CBD5E1]" : "border-[#1C01A5] bg-white text-[#1C01A5]"
            }`}
          >
            <TampilLambang id={pl.id} label={pl.label} />
          </button>
        );
      })}
    </div>
  );
}

const TombolDengar = ({ p, teks, label, kedip = false }: { p: PropsAksi; teks: string; label: string; kedip?: boolean }) => (
  <TombolSuaraGuru label={label} onClick={() => p.bicara(teks)} kelas={kedip ? "igil-denyut ring-4 ring-[#FFC800]" : ""} />
);

/* ---------------- a-dengar-pilih ---------------- */
function AksiDengarPilih(p: PropsAksi) {
  const nama = p.instans.data.nama as string;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-3">
        <TombolDengar p={p} teks={nama} label="Dengar nama bilangan" kedip={p.kedip.includes("dengar")} />
        <span className="text-base font-black text-[#1C01A5]/70" aria-hidden="true">
          Ketuk, lalu dengarkan
        </span>
      </div>
      <PilihLambang p={p} />
    </div>
  );
}

/* ---------------- a-lengkapi-kalimat ---------------- */
function AksiLengkapiKalimat(p: PropsAksi) {
  const kata = p.instans.data.kata as string;
  const lambang = p.instans.pilihan?.find((x) => x.id === p.instans.kunciPilihan);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5]/30 bg-[#F5F3FF] px-2 py-3 text-2xl font-black text-[#1C01A5]">
        <span>Lambang</span>
        <span className={`flex h-16 min-w-[64px] items-center justify-center rounded-xl border-4 border-dashed text-5xl ${p.terkunci ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"}`}>{p.terkunci && lambang ? lambang.label : "?"}</span>
        <span>dibaca</span>
        <span className="flex items-center gap-1">
          <span className="rounded-xl bg-[#FFE566] px-3 py-1">{kata}</span>
          <TombolSuaraGuru kecil label={`Dengar: ${kata}`} onClick={() => p.bicara(kata)} kelas={p.kedip.includes("dengar") ? "igil-denyut ring-4 ring-[#FFC800]" : ""} />
        </span>
      </div>
      <PilihLambang p={p} />
    </div>
  );
}

/* ---------------- a-tulis-kanvas dan a-tulis-sepuluh ---------------- */
function awalJalur(d: string, ox: number): { x: number; y: number } {
  const m = d.match(/^M(-?[\d.]+) (-?[\d.]+)/);
  return { x: Number(m?.[1] ?? 0) + ox, y: Number(m?.[2] ?? 0) };
}

function AksiTulis(p: PropsAksi) {
  const n = p.instans.kunci as number;
  const sepuluh = p.instans.data.mode === "sepuluh";
  const model = modelTulis(n);
  const [simpan, setSimpan] = useState<{ g: Goresan[]; putaran: number }>({ g: [], putaran: 0 });
  // Tulisan dikosongkan setiap kali jawaban salah (putaran bertambah), supaya anak mencoba lagi dari awal.
  const goresan = simpan.putaran === p.putaran ? simpan.g : [];
  const tampil: Goresan[] = p.tunjukBenar ? model.map((m) => m.titik) : goresan;
  const berikut = Math.min(goresan.length, model.length - 1);
  const mulai = awalJalur(model[berikut].d, model[berikut].ox);
  const kotakOx = Array.from(new Set(model.map((m) => m.ox)));
  const panduan = (
    <g aria-hidden="true" transform={`scale(${SKALA_KANVAS}) translate(0 ${GESER_Y_KANVAS})`}>
      {sepuluh && kotakOx.map((ox) => <rect key={ox} x={ox - 2} y={-2} width={60} height={94} rx={6} fill="none" stroke="#CBD5E1" strokeWidth={1.5} strokeDasharray="4 3" />)}
      {model.map((m, i) =>
        !sepuluh || i === berikut ? (
          <path
            key={i}
            d={m.d}
            transform={`translate(${m.ox} 0)`}
            fill="none"
            stroke={i === berikut && !p.tunjukBenar ? WARNA_GORESAN[i % WARNA_GORESAN.length] : "#E5E7EB"}
            strokeWidth={i === berikut ? 3 : 5}
            strokeDasharray={i === berikut ? "4 4" : undefined}
            strokeLinecap="round"
            opacity={i === berikut ? 0.8 : 1}
          />
        ) : null,
      )}
      {!p.tunjukBenar && <circle cx={mulai.x} cy={mulai.y} r={4.5} fill="#16A34A" stroke="#fff" strokeWidth={1.5} />}
    </g>
  );
  return (
    <div className="space-y-3">
      <KanvasTulis lebar={LEBAR_KANVAS} tinggi={TINGGI_KANVAS} goresan={tampil} onUbah={(g) => setSimpan({ g, putaran: p.putaran })} terkunci={p.terkunci || !!p.tunjukBenar} panduan={panduan} />
      <div className="flex items-center justify-center gap-3">
        <TombolDengar p={p} teks={model[berikut].petunjuk} label="Dengarkan petunjuk goresan" />
        <TombolPeriksa aktif={!p.terkunci && goresan.length > 0} onClick={() => p.kirim({ goresan })} />
      </div>
    </div>
  );
}

/* ---------------- a-jodohkan-kata ---------------- */
function AksiJodohkan(p: PropsAksi) {
  const kiri = p.instans.data.kiri as { id: string; kata: string }[];
  const kanan = p.instans.data.kanan as { id: string; lambang: string }[];
  const [hubungan, setHubungan] = useState<[string, string][]>([]);
  const benar = (p.tunjukBenar as { hubungan?: [string, string][] } | null)?.hubungan;
  const tampil = benar ?? hubungan;
  const lengkap = tampil.length === kiri.length;
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-8 pt-3" aria-label="Tombol dengar kata">
          {kiri.map((k) => (
            <TombolSuaraGuru key={k.id} kecil label={`Dengar: ${k.kata}`} onClick={() => p.bicara(k.kata)} />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <HubungkanGaris
            kiri={kiri.map((k) => ({ id: k.id, isi: <span className="text-2xl">{k.kata}</span>, label: k.kata }))}
            kanan={kanan.map((l) => ({ id: l.id, isi: <span className="text-5xl">{l.lambang}</span>, label: `Lambang ${l.lambang}` }))}
            hubungan={tampil}
            onUbah={setHubungan}
            kedip={p.kedip}
            terkunci={p.terkunci}
          />
        </div>
      </div>
      <TombolPeriksa aktif={!p.terkunci && lengkap} onClick={() => p.kirim({ hubungan })} />
    </div>
  );
}

/* ---------------- a-urut-goresan ---------------- */
function KartuGoresan({ semua, d, rendah = false }: { semua: string[]; d: string; rendah?: boolean }) {
  const m = d.match(/^M(-?[\d.]+) (-?[\d.]+)/);
  return (
    <svg viewBox="-8 -8 72 106" className={rendah ? "h-16 w-12" : "h-20 w-14"} aria-hidden="true">
      {semua.map((x, i) => (
        <path key={i} d={x} fill="none" stroke="#E5E7EB" strokeWidth={6} strokeLinecap="round" />
      ))}
      <path d={d} fill="none" stroke="#1C01A5" strokeWidth={6} strokeLinecap="round" />
      {m && <circle cx={Number(m[1])} cy={Number(m[2])} r={5} fill="#16A34A" stroke="#fff" strokeWidth={1.5} />}
    </svg>
  );
}

function AksiUrutGoresan(p: PropsAksi) {
  const semua = p.instans.data.semua as string[];
  const kartu = p.instans.data.kartu as { id: string; d: string }[];
  const kunci = p.instans.kunci as string[];
  const [simpan, setSimpan] = useState<{ u: string[]; putaran: number }>({ u: [], putaran: 0 });
  const urutan = simpan.putaran === p.putaran ? simpan.u : [];
  const tampil = p.tunjukBenar ? kunci : urutan;
  const kartuDari = (id: string) => kartu.find((k) => k.id === id);
  const atur = (u: string[]) => setSimpan({ u, putaran: p.putaran });
  return (
    <div className="space-y-3">
      <div role="group" aria-label="Urutan menulis" className="flex items-center justify-center gap-2">
        {kunci.map((_, i) => {
          const k = tampil[i] ? kartuDari(tampil[i]) : undefined;
          return (
            <button
              key={i}
              type="button"
              disabled={p.terkunci || !k}
              aria-label={k ? "Lepas goresan ini" : "Tempat goresan kosong"}
              onClick={() => atur(urutan.slice(0, i))}
              className={`flex h-24 w-[72px] items-center justify-center rounded-2xl border-4 border-dashed ${k ? "border-[#16A34A] bg-[#F0FDF4]" : "border-[#1C01A5]/40 bg-white"}`}
            >
              {k ? <KartuGoresan semua={semua} d={k.d} /> : null}
            </button>
          );
        })}
      </div>
      <div role="group" aria-label="Goresan yang tersedia" className="flex items-center justify-center gap-2">
        {kartu.map((k) => (
          <button
            key={k.id}
            type="button"
            disabled={p.terkunci || tampil.includes(k.id)}
            aria-label="Goresan lambang"
            onClick={() => atur([...urutan, k.id])}
            className={`flex h-24 w-[72px] items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white disabled:opacity-30 ${p.kedip.includes(k.id) ? RING_KEDIP : ""}`}
          >
            <KartuGoresan semua={semua} d={k.d} />
          </button>
        ))}
      </div>
      <TombolPeriksa aktif={!p.terkunci && urutan.length === kunci.length} onClick={() => p.kirim({ urutan })} />
    </div>
  );
}

/* ---------------- a-benar-salah ---------------- */
function AksiBenarSalah(p: PropsAksi) {
  const lambang = p.instans.data.lambang as string;
  const klaim = p.instans.data.klaim as string;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-3 rounded-2xl border-4 border-[#1C01A5]/30 bg-[#F5F3FF] px-3 py-3">
        <span className="flex h-24 min-w-[96px] items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-2 text-7xl font-black text-[#1C01A5]">{lambang}</span>
        <span className="flex items-center gap-1 text-2xl font-black text-[#1C01A5]">
          <span className="rounded-xl bg-[#FFE566] px-3 py-1">{klaim}</span>
          <TombolSuaraGuru kecil label={`Dengar: ${klaim}`} onClick={() => p.bicara(klaim)} />
        </span>
      </div>
      <PilihKata
        pilihan={p.instans.pilihan ?? []}
        salah={pilihanSalah(p)}
        benarId={p.terkunci ? (p.instans.kunciPilihan ?? null) : null}
        kedip={p.kedip}
        aktif
        terkunci={p.terkunci}
        onPilih={(id) => p.kirim({ pilih: id })}
        bicara={p.bicara}
      />
    </div>
  );
}

/* ---------------- a-detektif-arah ---------------- */
type Ubin = { id: string; lambang: string; arah: "benar" | "cermin" | "putar"; miring: number };

function gayaUbin(u: Ubin): React.CSSProperties {
  if (u.arah === "cermin") return { transform: `scaleX(-1) rotate(${u.miring}deg)` };
  if (u.arah === "putar") return { transform: "rotate(180deg)" };
  return { transform: `rotate(${u.miring}deg)` };
}

function AksiDetektif(p: PropsAksi) {
  const ubin = p.instans.data.ubin as Ubin[];
  const salah = pilihanSalahKetuk(p);
  return (
    <div role="group" aria-label="Deretan lambang" className="grid grid-cols-2 gap-3">
      {ubin.map((u) => {
        const benar = p.terkunci && p.instans.kunci === u.id;
        const sudahSalah = salah.includes(u.id);
        return (
          <button
            key={u.id}
            type="button"
            disabled={p.terkunci || sudahSalah}
            aria-label={`Lambang ${u.id.slice(1)}`}
            onClick={() => p.kirim({ pilih: u.id })}
            className={`flex min-h-[96px] items-center justify-center rounded-2xl border-4 text-7xl font-black leading-none ${
              benar ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : sudahSalah ? "border-[#CBD5E1] bg-[#F1F5F9] text-[#CBD5E1]" : "border-[#1C01A5] bg-white text-[#1C01A5]"
            } ${p.kedip.includes(u.id) ? RING_KEDIP : ""}`}
          >
            <span style={{ display: "inline-block", ...gayaUbin(u) }}>{u.lambang}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Ketukan keliru sebelumnya pada soal yang jawabannya `{ pilih: id }` dengan kunci berupa id (bukan kunciPilihan). */
function pilihanSalahKetuk(p: PropsAksi): string[] {
  return p.riwayat.map((r) => (r && typeof r === "object" ? (r as { pilih?: unknown }).pilih : undefined)).filter((x): x is string => typeof x === "string" && x !== p.instans.kunci);
}

/* ---------------- a-memori-kata ---------------- */
type KartuMemori = { id: string; jenis: "kata" | "lambang"; n: number; teks: string };

function AksiMemori(p: PropsAksi) {
  const kartu = p.instans.data.kartu as KartuMemori[];
  const total = kartu.length / 2;
  const [cocok, setCocok] = useState<number[]>([]);
  const [terbuka, setTerbuka] = useState<string[]>([]);
  const penunda = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (penunda.current) clearTimeout(penunda.current);
    },
    [],
  );
  const buka = (k: KartuMemori) => {
    if (p.terkunci || terbuka.length >= 2 || terbuka.includes(k.id) || cocok.includes(k.n)) return;
    if (k.jenis === "kata") p.bicara(k.teks);
    if (terbuka.length === 0) {
      setTerbuka([k.id]);
      return;
    }
    const pertama = kartu.find((x) => x.id === terbuka[0]);
    if (pertama && pertama.n === k.n && pertama.jenis !== k.jenis) {
      const baru = [...cocok, k.n];
      setTerbuka([]);
      setCocok(baru);
      if (baru.length === total) p.kirim({ pasangan: baru.map((n) => [`kata${n}`, `lam${n}`]) });
      return;
    }
    setTerbuka([terbuka[0], k.id]);
    penunda.current = setTimeout(() => setTerbuka([]), 1100);
  };
  return (
    <div role="group" aria-label="Kartu memori" className="grid grid-cols-3 gap-2">
      {kartu.map((k) => {
        const terang = !!p.tunjukBenar || cocok.includes(k.n) || terbuka.includes(k.id);
        const sudah = !!p.tunjukBenar || cocok.includes(k.n);
        return (
          <button
            key={k.id}
            type="button"
            disabled={p.terkunci || sudah}
            aria-label={terang ? (k.jenis === "kata" ? k.teks : `Lambang ${k.teks}`) : "Kartu tertutup"}
            onClick={() => buka(k)}
            className={`flex min-h-[84px] items-center justify-center rounded-2xl border-4 px-1 font-black leading-none ${
              sudah ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : terang ? "border-[#1C01A5] bg-white text-[#1C01A5]" : "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]"
            } ${terang && k.jenis === "lambang" ? "text-5xl" : "text-xl"}`}
          >
            {terang ? k.teks : "?"}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- a-ketuk-semua-lambang ---------------- */
type UbinGaya = { id: string; angka: number; gaya: string };

const GAYA: Record<string, { kelas: string; style?: React.CSSProperties }> = {
  tebal: { kelas: "font-sans font-black" },
  miring: { kelas: "font-sans font-semibold italic" },
  serif: { kelas: "font-serif font-bold" },
  mono: { kelas: "font-mono font-bold" },
  tulis: { kelas: "font-semibold", style: { fontFamily: "'Segoe Print','Bradley Hand','Comic Sans MS',cursive" } },
  bulat: { kelas: "font-sans font-extrabold tracking-widest text-[#B45309]" },
};

function AksiKetukSemua(p: PropsAksi) {
  const ubin = p.instans.data.ubin as UbinGaya[];
  const kunci = p.instans.kunci as string[];
  const [dipilih, setDipilih] = useState<string[]>([]);
  const tampil = p.tunjukBenar ? kunci : dipilih;
  return (
    <div className="space-y-3">
      <div role="group" aria-label="Lambang dalam berbagai gaya" className="grid grid-cols-4 gap-2">
        {ubin.map((u) => {
          const g = GAYA[u.gaya] ?? GAYA.tebal;
          const aktif = tampil.includes(u.id);
          return (
            <button
              key={u.id}
              type="button"
              disabled={p.terkunci}
              aria-pressed={aktif}
              aria-label={`Lambang ${u.angka}`}
              onClick={() => setDipilih(aktif ? dipilih.filter((x) => x !== u.id) : [...dipilih, u.id])}
              className={`flex min-h-[80px] items-center justify-center rounded-2xl border-4 text-5xl leading-none ${g.kelas} ${
                aktif ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : "border-[#1C01A5] bg-white text-[#1C01A5]"
              } ${p.kedip.includes(u.id) ? RING_KEDIP : ""}`}
              style={g.style}
            >
              {u.angka}
            </button>
          );
        })}
      </div>
      <TombolPeriksa aktif={!p.terkunci && dipilih.length > 0} onClick={() => p.kirim({ ids: dipilih })} />
    </div>
  );
}

daftarkanKomponen("a-dengar-pilih", AksiDengarPilih);
daftarkanKomponen("a-tulis-kanvas", AksiTulis);
daftarkanKomponen("a-jodohkan-kata", AksiJodohkan);
daftarkanKomponen("a-urut-goresan", AksiUrutGoresan);
daftarkanKomponen("a-benar-salah", AksiBenarSalah);
daftarkanKomponen("a-detektif-arah", AksiDetektif);
daftarkanKomponen("a-memori-kata", AksiMemori);
daftarkanKomponen("a-ketuk-semua-lambang", AksiKetukSemua);
daftarkanKomponen("a-lengkapi-kalimat", AksiLengkapiKalimat);
daftarkanKomponen("a-tulis-sepuluh", AksiTulis);
