"use client";
/**
 * Kubus 3D CSS (preserve-3d) diadopsi dari naskah lama Bab3KubusBalokModule.
 * Dipakai di permainan Materi Kelas 6 Bab 3 — tanpa jaringan.
 */
import React, { useRef, useState } from "react";

export const UKURAN_KUBUS = 36;

export type WarnaKubus = {
  depan: string;
  belakang: string;
  kanan: string;
  kiri: string;
  atas: string;
  bawah: string;
};

export const WARNA_LANGIT: WarnaKubus = {
  depan: "border-sky-900 bg-sky-300 text-sky-950",
  belakang: "border-sky-900 bg-sky-500 text-white",
  kanan: "border-sky-900 bg-sky-400 text-sky-950",
  kiri: "border-sky-900 bg-sky-200 text-sky-950",
  atas: "border-amber-800 bg-amber-300 text-amber-950",
  bawah: "border-slate-600 bg-slate-300 text-slate-800",
};

export const WARNA_L: WarnaKubus = {
  depan: "border-emerald-900 bg-emerald-300 text-emerald-950",
  belakang: "border-emerald-900 bg-emerald-600 text-white",
  kanan: "border-emerald-900 bg-emerald-400 text-emerald-950",
  kiri: "border-emerald-900 bg-emerald-200 text-emerald-950",
  atas: "border-amber-800 bg-amber-300 text-amber-950",
  bawah: "border-slate-600 bg-slate-300 text-slate-800",
};

export const WARNA_ATAS: WarnaKubus = {
  depan: "border-amber-800 bg-amber-300 text-amber-950",
  belakang: "border-amber-900 bg-amber-500 text-amber-950",
  kanan: "border-amber-800 bg-amber-200 text-amber-950",
  kiri: "border-amber-900 bg-amber-400 text-amber-950",
  atas: "border-orange-800 bg-orange-200 text-orange-950",
  bawah: "border-slate-600 bg-slate-300 text-slate-800",
};

function MukaKubus({ transform, kelas, nomor, ukuran }: { transform: string; kelas: string; nomor: string; ukuran: number }) {
  return (
    <div
      className={`absolute flex items-center justify-center border-2 font-black leading-none ${ukuran < 32 ? "text-[9px]" : "text-xs"} ${kelas}`}
      style={{ width: ukuran, height: ukuran, transform, backfaceVisibility: "hidden" }}
    >
      {nomor}
    </div>
  );
}

export function SatuKubus({
  nomor, x, y, z = 0, warna = WARNA_LANGIT, ukuran = UKURAN_KUBUS,
}: {
  nomor: string; x: number; y: number; z?: number; warna?: WarnaKubus; ukuran?: number;
}) {
  const jejak = `${ukuran / 2}px`;
  const muka = [
    { transform: `rotateY(0deg) translateZ(${jejak})`, kelas: warna.depan },
    { transform: `rotateY(180deg) translateZ(${jejak})`, kelas: warna.belakang },
    { transform: `rotateY(90deg) translateZ(${jejak})`, kelas: warna.kanan },
    { transform: `rotateY(-90deg) translateZ(${jejak})`, kelas: warna.kiri },
    { transform: `rotateX(90deg) translateZ(${jejak})`, kelas: warna.atas },
    { transform: `rotateX(-90deg) translateZ(${jejak})`, kelas: warna.bawah },
  ];
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: ukuran, height: ukuran, transformStyle: "preserve-3d",
        transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
      }}
    >
      {muka.map((item) => (
        <MukaKubus key={item.transform} transform={item.transform} kelas={item.kelas} nomor={nomor} ukuran={ukuran} />
      ))}
    </div>
  );
}

/** Matriks tinggi: baris = kedalaman (0 = depan), kolom = kiri→kanan. Nilai = tinggi menara. */
export type MatriksTinggi = number[][];

export function totalKubus(matriks: MatriksTinggi): number {
  return matriks.flat().reduce((a, b) => a + b, 0);
}

/** Tampak depan: tiap kolom = tinggi maksimum di kolom itu (Occlusion Max Rule). */
export function tampakDepan(matriks: MatriksTinggi): number {
  const kolom = Math.max(0, ...matriks.map((r) => r.length));
  let sum = 0;
  for (let x = 0; x < kolom; x += 1) {
    let max = 0;
    for (const row of matriks) max = Math.max(max, row[x] ?? 0);
    sum += max;
  }
  return sum;
}

/** Tampak samping kanan: tiap baris kedalaman = tinggi maksimum di baris itu. */
export function tampakSamping(matriks: MatriksTinggi): number {
  return matriks.reduce((sum, row) => sum + Math.max(0, ...row, 0), 0);
}

/** Tampak atas: banyak petak dengan tinggi > 0. */
export function tampakAtas(matriks: MatriksTinggi): number {
  return matriks.flat().filter((h) => h > 0).length;
}

export function dariMatriks(matriks: MatriksTinggi, ukuran = UKURAN_KUBUS): { nomor: string; x: number; y: number; z: number; warna: WarnaKubus }[] {
  const jarak = ukuran + 2;
  const out: { nomor: string; x: number; y: number; z: number; warna: WarnaKubus }[] = [];
  let n = 1;
  const baris = matriks.length;
  const kolom = Math.max(0, ...matriks.map((r) => r.length));
  const midX = ((kolom - 1) * jarak) / 2;
  const midZ = ((baris - 1) * jarak) / 2;
  for (let d = 0; d < baris; d += 1) {
    for (let x = 0; x < (matriks[d]?.length ?? 0); x += 1) {
      const tinggi = matriks[d][x] ?? 0;
      for (let lantai = 0; lantai < tinggi; lantai += 1) {
        const warna = lantai === 0 ? WARNA_LANGIT : lantai === 1 ? WARNA_L : WARNA_ATAS;
        out.push({
          nomor: String(n++),
          x: x * jarak - midX,
          y: -lantai * jarak,
          z: -(d * jarak - midZ),
          warna,
        });
      }
    }
  }
  return out;
}

/** Bentuk L klasik naskah lama: 3 kubus (2 mendatar + 1 naik). */
export function bentukL(): { nomor: string; x: number; y: number; z: number; warna: WarnaKubus }[] {
  const s = UKURAN_KUBUS + 2;
  const mentah = [
    { nomor: "1", x: 0, y: 0, z: 0, warna: WARNA_LANGIT },
    { nomor: "2", x: s, y: 0, z: 0, warna: WARNA_LANGIT },
    { nomor: "3", x: 0, y: -s, z: 0, warna: WARNA_L },
  ];
  const tx = mentah.reduce((a, k) => a + k.x, 0) / mentah.length;
  const ty = mentah.reduce((a, k) => a + k.y, 0) / mentah.length;
  return mentah.map((k) => ({ ...k, x: k.x - tx, y: k.y - ty }));
}

export function PanggungKubus({
  kubus,
  aria = "Susunan kubus 3 dimensi. Geser untuk memutar.",
  awal = { x: -22, y: 32 },
  tinggiKelas = "h-40",
  petunjuk = true,
}: {
  kubus: { nomor: string; x: number; y: number; z?: number; warna?: WarnaKubus }[];
  aria?: string;
  awal?: { x: number; y: number };
  tinggiKelas?: string;
  petunjuk?: boolean;
}) {
  const [sudut, setSudut] = useState({ x: awal.x, y: awal.y });
  const [halus, setHalus] = useState(true);
  const tarik = useRef<{ x: number; y: number; sx: number; sy: number } | null>(null);

  function mulai(e: React.PointerEvent<HTMLDivElement>) {
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* ok */ }
    setHalus(false);
    tarik.current = { x: e.clientX, y: e.clientY, sx: sudut.x, sy: sudut.y };
  }
  function geser(e: React.PointerEvent<HTMLDivElement>) {
    if (!tarik.current) return;
    setSudut({
      x: Math.max(-85, Math.min(85, tarik.current.sx - (e.clientY - tarik.current.y) * 0.5)),
      y: tarik.current.sy + (e.clientX - tarik.current.x) * 0.55,
    });
  }
  function lepas() { tarik.current = null; }

  return (
    <div className="w-full">
      <div
        className={`relative mx-auto w-full cursor-grab touch-none select-none active:cursor-grabbing ${tinggiKelas}`}
        style={{ perspective: "720px" }}
        onPointerDown={mulai}
        onPointerMove={geser}
        onPointerUp={lepas}
        onPointerCancel={lepas}
        role="img"
        aria-label={aria}
      >
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${sudut.x}deg) rotateY(${sudut.y}deg)`,
            transition: halus ? "transform 0.55s ease" : "none",
          }}
        >
          {kubus.map((item) => (
            <SatuKubus key={item.nomor} nomor={item.nomor} x={item.x} y={item.y} z={item.z ?? 0} warna={item.warna ?? WARNA_LANGIT} />
          ))}
        </div>
      </div>
      {petunjuk ? (
        <div className="mt-1 flex flex-wrap justify-center gap-1.5">
          <button type="button" onClick={() => { setHalus(true); setSudut({ x: awal.x, y: awal.y }); }} className="rounded-full border-2 border-[#1C01A5] bg-white px-2.5 py-0.5 text-[10px] font-black text-[#1C01A5]">Depan</button>
          <button type="button" onClick={() => { setHalus(true); setSudut({ x: -16, y: 90 }); }} className="rounded-full border-2 border-[#1C01A5] bg-white px-2.5 py-0.5 text-[10px] font-black text-[#1C01A5]">Samping</button>
          <button type="button" onClick={() => { setHalus(true); setSudut({ x: -74, y: 16 }); }} className="rounded-full border-2 border-amber-500 bg-amber-200 px-2.5 py-0.5 text-[10px] font-black text-amber-950">Atas</button>
        </div>
      ) : null}
      {petunjuk ? <p className="mt-0.5 text-center text-[10px] font-bold text-slate-500">Tahan & geser untuk memutar</p> : null}
    </div>
  );
}

export function VisualMatriksKubus({
  matriks,
  kecil = false,
  petunjuk,
}: {
  matriks: MatriksTinggi;
  kecil?: boolean;
  /** Default: selalu bisa diputar (penting untuk hitung tersembunyi). */
  petunjuk?: boolean;
}) {
  const ukuran = kecil ? 28 : UKURAN_KUBUS;
  const items = dariMatriks(matriks, ukuran);
  return (
    <PanggungKubus
      kubus={items}
      tinggiKelas={kecil ? "h-32" : "h-44"}
      petunjuk={petunjuk ?? true}
      aria={`Susunan ${totalKubus(matriks)} kubus. Geser untuk memutar.`}
    />
  );
}

export function VisualBentukL({ kecil = false, petunjuk }: { kecil?: boolean; petunjuk?: boolean }) {
  return (
    <PanggungKubus
      kubus={bentukL()}
      tinggiKelas={kecil ? "h-28" : "h-36"}
      petunjuk={petunjuk ?? true}
      aria="Bentuk L dari tiga kubus. Geser untuk memutar."
    />
  );
}

/** Denah berpetak sederhana untuk Sub-Bab C. */
export function DenahPetak({
  kolom = ["A", "B", "C", "D", "E"],
  baris = [1, 2, 3, 4],
  tanda = [],
}: {
  kolom?: string[];
  baris?: number[];
  tanda?: { huruf: string; angka: number; label?: string; warna?: string }[];
}) {
  return (
    <div className="inline-block rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
      <div className="grid gap-1" style={{ gridTemplateColumns: `28px repeat(${kolom.length}, 36px)` }}>
        <div />
        {kolom.map((h) => (
          <div key={h} className="text-center text-xs font-black text-[#1C01A5]">{h}</div>
        ))}
        {baris.map((n) => (
          <React.Fragment key={n}>
            <div className="flex items-center justify-center text-xs font-black text-[#1C01A5]">{n}</div>
            {kolom.map((h) => {
              const t = tanda.find((x) => x.huruf === h && x.angka === n);
              return (
                <div
                  key={`${h}${n}`}
                  className={`flex h-9 items-center justify-center rounded-lg border-2 border-[#1C01A5]/40 text-[10px] font-black ${t ? (t.warna ?? "bg-amber-300 text-amber-950") : "bg-indigo-50 text-[#1C01A5]/50"}`}
                >
                  {t?.label ?? ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/** Jarak Manhattan pada kisi: |Δhuruf| + |Δangka|. */
export function jarakManhattan(a: { huruf: string; angka: number }, b: { huruf: string; angka: number }, abjad = "ABCDEFGH"): number {
  return Math.abs(abjad.indexOf(a.huruf) - abjad.indexOf(b.huruf)) + Math.abs(a.angka - b.angka);
}
