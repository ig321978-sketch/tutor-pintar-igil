"use client";

import React, { useEffect, useRef, useState } from "react";
import { BendaSeret, TombolSuaraGuru, letakMeja } from "./tahap-b-gaya";
import { Anak } from "./CeritaBandingB";
import { kata } from "./SubBabBBanding";
import { BendaSvg, NAMA_BENDA, SimbolSvg, TabelMendatar, TabelMenurun, Turus, type JenisBenda } from "./data-8-dasar";

/* ------------------------------------------------------------------------ */
/* Tab Simulasi Bab 8, bergaya PhET. Dua simulasi, tanpa skor, tanpa waktu,   */
/* tanpa benar-salah. Anak menyentuh model, dan semua perwakilan data ikut    */
/* berubah seketika:                                                          */
/*  1 Laboratorium Data (Sub-Bab A): benda, daftar, turus, tabel              */
/*  2 Pabrik Diagram Gambar (Sub-Bab B): survei, diagram, tabel, kalimat      */
/* Tidak ada pemanggilan jaringan. Suara memakai Suara Guru pilihan siswa.    */
/* Naskah: naskah/mtk-1-bab8-simulasi.md                                      */
/* ------------------------------------------------------------------------ */

const MAKS_JENIS = 8;
const MAKS_TOTAL = 20;
const WARNA_KOLOM = ["#FDE047", "#FB923C", "#4ADE80", "#60A5FA"];
const RAMBUT = ["#1F2937", "#7A4A1E", "#111827", "#4B2E1A"];

const sebut = (n: number) => kata(n).toLowerCase();

/**
 * Zona tujuan di titik layar. Benda yang sedang diseret berada tepat di bawah jari dan hidup di dalam
 * zona asalnya (meja atau rak), jadi dilewati supaya yang terbaca adalah zona di bawahnya.
 */
function zonaTujuan(x: number, y: number): string | null {
  for (const el of document.elementsFromPoint(x, y)) {
    if (el.closest('[role="button"]')) continue;
    const z = el.closest("[data-zona]");
    if (z) return z.getAttribute("data-zona");
  }
  return null;
}

const KARTU = "rounded-2xl border-4 border-[#1C01A5] bg-white p-3";
const TOMBOL_UTAMA =
  "rounded-full border-2 border-indigo-950 bg-amber-400 px-4 py-2 text-sm font-black text-indigo-950 shadow-[0_3px_0_rgba(30,27,75,0.35)] active:translate-y-0.5";
const TOMBOL_BIASA =
  "rounded-full border-2 border-[#1C01A5] bg-white px-4 py-2 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] active:translate-y-0.5";

/* ------------------------------ Komponen umum ---------------------------- */

function Pilihan({ aktif, onKlik, children, label }: { aktif: boolean; onKlik: () => void; children: React.ReactNode; label?: string }) {
  return (
    <button
      type="button"
      aria-pressed={aktif}
      aria-label={label}
      onClick={onKlik}
      className={`rounded-full border-2 px-3 py-1.5 text-xs font-black transition-colors ${
        aktif ? "border-indigo-950 bg-[#1C01A5] text-[#FFE566]" : "border-[#1C01A5]/40 bg-white text-[#1C01A5]"
      }`}
    >
      {children}
    </button>
  );
}

function Cek({ aktif, onKlik, children }: { aktif: boolean; onKlik: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={aktif}
      onClick={onKlik}
      className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 text-xs font-black ${
        aktif ? "border-indigo-950 bg-amber-300 text-indigo-950" : "border-[#1C01A5]/40 bg-white text-[#1C01A5]"
      }`}
    >
      <span aria-hidden="true">{aktif ? "☑" : "☐"}</span>
      {children}
    </button>
  );
}

function Pencacah({
  nama,
  jenis,
  n,
  tambahLabel,
  kurangLabel,
  onTambah,
  onKurang,
  tambahMati,
  warna,
}: {
  nama: string;
  jenis: JenisBenda;
  n: number;
  tambahLabel: string;
  kurangLabel: string;
  onTambah: () => void;
  onKurang: () => void;
  tambahMati: boolean;
  warna?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-2xl border-2 border-[#1C01A5] px-2 py-1.5" style={{ backgroundColor: warna ?? "#F5F3FF" }}>
      <BendaSvg jenis={jenis} kelas="h-9 w-9" />
      <span className="min-w-0 flex-1 text-xs font-black leading-tight text-[#1C01A5]">{nama}</span>
      <button
        type="button"
        aria-label={kurangLabel}
        disabled={n <= 0}
        onClick={onKurang}
        className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30"
      >
        –
      </button>
      <span className="w-6 shrink-0 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
        {n}
      </span>
      <button
        type="button"
        aria-label={tambahLabel}
        disabled={tambahMati}
        onClick={onTambah}
        className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

function CobaIni({ judul, langkah, onDengar }: { judul: string; langkah: string[]; onDengar: () => void }) {
  return (
    <div className="rounded-2xl border-4 border-dashed border-[#F0AB00] bg-[#FFFDF2] p-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-black text-[#1C01A5]">🔎 {judul}</h4>
        <TombolSuaraGuru kecil label="Dengarkan: Coba ini" onClick={onDengar} />
      </div>
      <ol className="mt-1 space-y-1 text-sm font-bold leading-snug text-[#1C01A5]">
        {langkah.map((l, i) => (
          <li key={l} className="flex gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-xs font-black">{i + 1}</span>
            <span>{l}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ======================================================================== */
/* Simulasi 1. Laboratorium Data                                            */
/* ======================================================================== */

type Item = { id: number; jenis: JenisBenda; rak: boolean };

const MAINAN: JenisBenda[] = ["pesawat", "mobil", "boneka", "bola"];
const AWAL_MAINAN: Record<string, number> = { pesawat: 5, mobil: 3, boneka: 4, bola: 2 };

function buatItem(isi: Record<string, number>): Item[] {
  let id = 1;
  return MAINAN.flatMap((j) => Array.from({ length: isi[j] ?? 0 }, () => ({ id: id++, jenis: j, rak: false })));
}

function SimulasiData({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [item, setItem] = useState<Item[]>(() => buatItem(AWAL_MAINAN));
  const idBaru = useRef(1000);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState("");
  const [lihatDaftar, setLihatDaftar] = useState(true);
  const [lihatTurus, setLihatTurus] = useState(true);
  const [lihatTabel, setLihatTabel] = useState(true);
  const [arahTabel, setArahTabel] = useState<"menurun" | "mendatar">("menurun");
  const jam = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (jam.current) window.clearTimeout(jam.current);
    },
    []
  );

  const per = MAINAN.map((j) => ({
    j,
    nama: NAMA_BENDA[j],
    total: item.filter((i) => i.jenis === j).length,
    rak: item.filter((i) => i.jenis === j && i.rak).length,
  }));
  const ada = per.filter((p) => p.total > 0);
  const total = item.length;
  const belum = item.filter((i) => !i.rak).length;
  const lengkap = total > 0 && belum === 0;
  const jumlahRak = ada.reduce((a, p) => a + p.rak, 0);
  const maxN = ada.length ? Math.max(...ada.map((p) => p.rak)) : 0;
  const minN = ada.length ? Math.min(...ada.map((p) => p.rak)) : 0;
  const semuaSama = ada.length > 1 && maxN === minN;
  const terbanyak = lengkap && !semuaSama ? ada.filter((p) => p.rak === maxN) : [];
  const tersedikit = lengkap && !semuaSama ? ada.filter((p) => p.rak === minN) : [];

  const sebutNama = (daftar: typeof ada) => daftar.map((p) => p.nama).join(" dan ");

  const cerita = () => {
    if (total === 0) return "Belum ada mainan. Tekan plus untuk menambah mainan.";
    if (!lengkap) return `Masih ada ${sebut(belum)} mainan di meja. Kelompokkan dulu ke rak yang sama, supaya mudah dihitung.`;
    const baris = ada.map((p) => `Ada ${sebut(p.rak)} ${p.nama}.`).join(" ");
    const banding = semuaSama
      ? `Semua mainan sama banyak, masing-masing ${sebut(maxN)}.`
      : `Yang paling banyak ${sebutNama(terbanyak)}, ${sebut(maxN)}. Yang paling sedikit ${sebutNama(tersedikit)}, ${sebut(minN)}.`;
    return `${baris} ${banding} Jumlah semuanya ${sebut(jumlahRak)}.`;
  };

  const ubah = (j: JenisBenda, delta: number) => {
    setKabar("");
    if (delta > 0) {
      if (total >= MAKS_TOTAL || per.find((p) => p.j === j)!.total >= MAKS_JENIS) return;
      setItem((daftar) => [...daftar, { id: idBaru.current++, jenis: j, rak: false }]);
      return;
    }
    setItem((daftar) => {
      const cari = (sudahRak: boolean) => {
        for (let k = daftar.length - 1; k >= 0; k--) if (daftar[k].jenis === j && daftar[k].rak === sudahRak) return k;
        return -1;
      };
      const k = cari(false) >= 0 ? cari(false) : cari(true);
      return k < 0 ? daftar : daftar.filter((_, i) => i !== k);
    });
    setTerpilih(null);
  };

  const tempatkan = (id: number, zona: string) => {
    const it = item.find((i) => i.id === id);
    if (!it) return;
    setTerpilih(null);
    if (zona === "sim-meja") {
      setKabar("");
      setItem((daftar) => daftar.map((i) => (i.id === id ? { ...i, rak: false } : i)));
      return;
    }
    const j = zona.slice("sim-rak-".length);
    if (j === it.jenis) {
      setKabar("");
      setItem((daftar) => daftar.map((i) => (i.id === id ? { ...i, rak: true } : i)));
      return;
    }
    setKabar(`Rak itu untuk ${NAMA_BENDA[j as JenisBenda]}. Taruh ${NAMA_BENDA[it.jenis]} di rak ${NAMA_BENDA[it.jenis]}.`);
    setGoyang(j);
    if (jam.current) window.clearTimeout(jam.current);
    jam.current = window.setTimeout(() => setGoyang(null), 900);
  };

  const klikZona = (e: React.MouseEvent, zona: string) => {
    if ((e.target as HTMLElement).closest('[role="button"]')) return;
    if (terpilih === null) {
      if (zona !== "sim-meja") setKabar("Pilih dulu satu mainan, lalu ketuk raknya.");
      return;
    }
    tempatkan(terpilih, zona);
  };

  const reset = () => {
    setItem(buatItem(AWAL_MAINAN));
    setTerpilih(null);
    setKabar("");
    setLihatDaftar(true);
    setLihatTurus(true);
    setLihatTabel(true);
    setArahTabel("menurun");
  };

  const meja = item.filter((i) => !i.rak);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Data: Toko Mainan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Kelompokkan mainan di rak. Lihat daftar, turus, dan tabel ikut berubah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan datanya" onClick={() => speakGuru(cerita())} />
      </div>

      <div className={KARTU}>
        <p className="mb-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Atur mainan di toko (paling banyak {MAKS_TOTAL})</p>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          {per.map((p) => (
            <Pencacah
              key={p.j}
              nama={p.nama}
              jenis={p.j}
              n={p.total}
              tambahLabel={`Tambah satu ${p.nama}`}
              kurangLabel={`Kurangi satu ${p.nama}`}
              tambahMati={total >= MAKS_TOTAL || p.total >= MAKS_JENIS}
              onTambah={() => ubah(p.j, 1)}
              onKurang={() => ubah(p.j, -1)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2 rounded-3xl border-4 border-[#A8672D] bg-[#FBE3BC] p-3 shadow-[0_5px_0_rgba(120,70,20,0.35)]">
        <div
          data-zona="sim-meja"
          onClick={(e) => klikZona(e, "sim-meja")}
          className="min-h-[92px] rounded-2xl border-4 border-dashed border-[#1C01A5]/60 bg-white/80 px-2 py-2"
        >
          <p className="text-center text-xs font-black text-[#1C01A5]">
            Meja • {belum === 0 ? "kosong" : `${belum} mainan berserakan`} • seret ke rak
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1" role="group" aria-label="Mainan di meja">
            {meja.map((i) => (
              <BendaSeret
                key={i.id}
                id={`sim-${i.id}`}
                label={`Mainan ${NAMA_BENDA[i.jenis]}`}
                onKetuk={() => setTerpilih(i.id)}
                onLepas={(_, x, y) => {
                  const z = zonaTujuan(x, y);
                  if (z && z.startsWith("sim-rak-")) tempatkan(i.id, z);
                }}
                gaya={letakMeja(i.id)}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${terpilih === i.id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <BendaSvg jenis={i.jenis} kelas="h-9 w-9" />
                </span>
              </BendaSeret>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 min-[460px]:grid-cols-4">
          {per.map((p) => {
            const rak = item.filter((i) => i.jenis === p.j && i.rak);
            return (
              <div
                key={`${p.j}-${goyang === p.j ? "x" : "o"}`}
                data-zona={`sim-rak-${p.j}`}
                onClick={(e) => klikZona(e, `sim-rak-${p.j}`)}
                className={`flex min-h-[104px] flex-col items-center justify-between rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1 py-1 ${
                  goyang === p.j ? "igil-goyang" : ""
                } ${p.total === 0 ? "opacity-50" : ""}`}
              >
                <button
                  type="button"
                  data-kepala="1"
                  aria-label={`Rak ${p.nama}, berisi ${rak.length}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (terpilih === null) {
                      setKabar("Pilih dulu satu mainan, lalu ketuk raknya.");
                      return;
                    }
                    tempatkan(terpilih, `sim-rak-${p.j}`);
                  }}
                  className="rounded-md border-0 bg-transparent px-1 text-[11px] font-black leading-tight text-[#1C01A5]"
                >
                  {p.nama}
                </button>
                <div className="flex flex-wrap items-center justify-center gap-0.5" role="group" aria-label={`Isi rak ${p.nama}`}>
                  {rak.map((i) => (
                    <BendaSeret
                      key={i.id}
                      id={`sim-${i.id}`}
                      label={`Mainan ${NAMA_BENDA[i.jenis]} di rak`}
                      onKetuk={() => setTerpilih(i.id)}
                      onLepas={(_, x, y) => {
                        const z = zonaTujuan(x, y);
                        if (z === "sim-meja") tempatkan(i.id, z);
                        else if (z && z !== `sim-rak-${i.jenis}`) tempatkan(i.id, z);
                      }}
                      kelas="rounded-full"
                    >
                      <span className={`block rounded-full ${terpilih === i.id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                        <BendaSvg jenis={i.jenis} kelas="h-6 w-6" />
                      </span>
                    </BendaSeret>
                  ))}
                </div>
                <span className="rounded-full bg-white px-2 text-sm font-black text-[#1C01A5]">{rak.length}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <button type="button" className={TOMBOL_UTAMA} onClick={() => setItem((d) => d.map((i) => ({ ...i, rak: true })))}>
            🧺 Rapikan semua
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={() => setItem((d) => d.map((i) => ({ ...i, rak: false })))}>
            🔀 Acak lagi
          </button>
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset Semua
          </button>
        </div>
        {kabar ? (
          <p role="status" className="rounded-2xl border-4 border-[#E98989] bg-[#FDECEC] px-3 py-1.5 text-center text-sm font-black text-[#7F1D1D]">
            🤔 {kabar}
          </p>
        ) : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilkan:</span>
          <Cek aktif={lihatDaftar} onKlik={() => setLihatDaftar((v) => !v)}>
            Daftar
          </Cek>
          <Cek aktif={lihatTurus} onKlik={() => setLihatTurus((v) => !v)}>
            Turus
          </Cek>
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((v) => !v)}>
            Tabel
          </Cek>
        </div>

        <p
          role="status"
          className={`rounded-2xl border-2 px-3 py-1.5 text-center text-sm font-black ${
            total === 0
              ? "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"
              : lengkap
                ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
                : "border-[#F0AB00] bg-[#FFF7CC] text-[#7C4A03]"
          }`}
        >
          {total === 0
            ? "Belum ada mainan. Tekan + untuk menambah."
            : lengkap
              ? `✅ Semua mainan sudah dikelompokkan • jumlah semuanya ${jumlahRak}`
              : `🧺 ${belum} mainan belum masuk rak, jadi hitungannya belum lengkap`}
        </p>

        {lihatDaftar ? (
          <div className="space-y-1" role="group" aria-label="Daftar mainan">
            <p className="text-center text-sm font-black text-[#1C01A5]">Daftar Mainan di Toko</p>
            {ada.length === 0 ? <p className="text-center text-sm font-bold text-[#1C01A5]/60">…</p> : null}
            {ada.map((p) => (
              <p
                key={p.j}
                className={`flex items-center gap-2 rounded-xl px-2 py-1 text-base font-black text-[#1C01A5] ${
                  terbanyak.includes(p) ? "bg-[#FFE566]" : tersedikit.includes(p) ? "bg-[#DBEAFE]" : "bg-[#F5F3FF]"
                } ${p.rak === 0 ? "opacity-50" : ""}`}
              >
                <BendaSvg jenis={p.j} kelas="h-6 w-6" />
                <span>
                  Ada {p.rak} {p.nama}.
                </span>
                {terbanyak.includes(p) ? <span className="ml-auto text-[11px]">paling banyak</span> : null}
                {tersedikit.includes(p) ? <span className="ml-auto text-[11px]">paling sedikit</span> : null}
              </p>
            ))}
          </div>
        ) : null}

        {lihatTurus ? (
          <div className="space-y-1" role="group" aria-label="Turus mainan">
            <p className="text-center text-sm font-black text-[#1C01A5]">Turus • 1 mainan = 1 goresan</p>
            {ada.map((p) => (
              <div key={p.j} className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-2 py-1">
                <BendaSvg jenis={p.j} kelas="h-6 w-6" />
                <span className="w-24 shrink-0 text-xs font-black text-[#1C01A5]">{p.nama}</span>
                <span className="min-w-0 flex-1">
                  {p.rak > 0 ? <Turus n={p.rak} /> : <span className="text-xs font-black text-[#1C01A5]/40">…</span>}
                </span>
                <span className="w-7 text-right text-lg font-black text-[#1C01A5]">{p.rak}</span>
              </div>
            ))}
          </div>
        ) : null}

        {lihatTabel ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2" role="group" aria-label="Bentuk tabel">
              <Pilihan aktif={arahTabel === "menurun"} onKlik={() => setArahTabel("menurun")}>
                ⬇ Tabel menurun
              </Pilihan>
              <Pilihan aktif={arahTabel === "mendatar"} onKlik={() => setArahTabel("mendatar")}>
                ➡ Tabel mendatar
              </Pilihan>
            </div>
            {ada.length === 0 ? null : arahTabel === "menurun" ? (
              <TabelMenurun judul="Tabel Mainan Toko" kepala={["Mainan", "Banyaknya"]} baris={ada.map((p): [string, number] => [p.nama, p.rak])} kecil />
            ) : (
              <TabelMendatar judul="Tabel Mainan Toko" labelNama="Mainan" labelBanyak="Banyaknya" nama={ada.map((p) => p.nama)} nilai={ada.map((p) => p.rak)} kecil />
            )}
          </div>
        ) : null}
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, seret semua mainan ke rak yang sama. Mana yang paling banyak? Dua, tambah satu bola. Apa yang berubah di daftar, turus, dan tabel? Tiga, ubah tabel menjadi mendatar. Apakah datanya sama?"
          )
        }
        langkah={[
          "Seret semua mainan ke rak yang sama. Mana yang paling banyak?",
          "Tambah satu bola. Apa yang berubah di daftar, turus, dan tabel?",
          "Ubah tabel menjadi mendatar. Apakah datanya sama?",
        ]}
      />
    </div>
  );
}

/* ======================================================================== */
/* Simulasi 2. Pabrik Diagram Gambar                                        */
/* ======================================================================== */

type KunciTema = "sayur" | "mainan" | "buah" | "hewan";
type Kategori = { nama: string; jenis: JenisBenda };

const TEMA: Record<KunciTema, { label: string; emoji: string; judul: string; kat: Kategori[]; awal: number[] }> = {
  sayur: {
    label: "Sayur",
    emoji: "🥕",
    judul: "Diagram Sayur Kesukaan",
    kat: [
      { nama: "Jagung", jenis: "jagung" },
      { nama: "Wortel", jenis: "wortel" },
      { nama: "Brokoli", jenis: "brokoli" },
      { nama: "Kol", jenis: "kol" },
    ],
    awal: [3, 4, 3, 2],
  },
  mainan: {
    label: "Mainan",
    emoji: "🧸",
    judul: "Diagram Mainan Kesukaan",
    kat: [
      { nama: "Pesawat", jenis: "pesawat" },
      { nama: "Mobil-mobilan", jenis: "mobil" },
      { nama: "Boneka", jenis: "boneka" },
      { nama: "Bola", jenis: "bola" },
    ],
    awal: [4, 3, 2, 5],
  },
  buah: {
    label: "Buah",
    emoji: "🍊",
    judul: "Diagram Buah Kesukaan",
    kat: [
      { nama: "Jeruk", jenis: "jeruk" },
      { nama: "Apel", jenis: "apel" },
      { nama: "Mangga", jenis: "mangga" },
      { nama: "Belimbing", jenis: "belimbing" },
    ],
    awal: [6, 3, 4, 5],
  },
  hewan: {
    label: "Hewan",
    emoji: "🐔",
    judul: "Diagram Hewan Kesukaan",
    kat: [
      { nama: "Ayam", jenis: "ayam" },
      { nama: "Bebek", jenis: "bebek" },
      { nama: "Kelinci", jenis: "kelinci" },
    ],
    awal: [4, 2, 5],
  },
};

type Lambang = "benda" | "bulat" | "wajah";

function Lambangnya({ lambang, jenis, k }: { lambang: Lambang; jenis: JenisBenda; k: number }) {
  if (lambang === "benda") return <BendaSvg jenis={jenis} kelas="h-5 w-5 igil-muncul" />;
  return <SimbolSvg jenis={lambang === "wajah" ? "wajah" : "bulat"} warna={WARNA_KOLOM[k % WARNA_KOLOM.length]} kelas="h-5 w-5 igil-muncul" />;
}

function DiagramSim({
  arah,
  kat,
  jumlah,
  lambang,
  banding,
  sorotMax,
  sorotMin,
  onPilih,
}: {
  arah: "tegak" | "mendatar";
  kat: Kategori[];
  jumlah: number[];
  lambang: Lambang;
  banding: number[];
  sorotMax: number[];
  sorotMin: number[];
  onPilih: (k: number) => void;
}) {
  const baris = Array.from({ length: MAKS_JENIS }, (_, j) => j);
  const lo = banding.length === 2 ? Math.min(jumlah[banding[0]], jumlah[banding[1]]) : 0;
  const hi = banding.length === 2 ? Math.max(jumlah[banding[0]], jumlah[banding[1]]) : 0;
  const tinggiKe = banding.length === 2 ? (jumlah[banding[0]] >= jumlah[banding[1]] ? banding[0] : banding[1]) : -1;

  const sel = (k: number, j: number, lebar: string) => {
    const isi = j < jumlah[k];
    const selisih = banding.length === 2 && tinggiKe === k && j >= lo && j < hi;
    return (
      <span
        key={j}
        className={`flex h-7 ${lebar} items-center justify-center border border-[#C4B5FD] ${selisih ? "bg-[#FEE2E2] ring-2 ring-inset ring-[#EF4444]" : "bg-white"}`}
      >
        {isi ? <Lambangnya lambang={lambang} jenis={kat[k].jenis} k={k} /> : null}
      </span>
    );
  };

  const label = (k: number, lebar: string) => {
    const dipilih = banding.includes(k);
    const tanda = sorotMax.includes(k) ? "bg-[#FFE566]" : sorotMin.includes(k) ? "bg-[#DBEAFE]" : "bg-[#E9D8F3]";
    return (
      <button
        type="button"
        aria-label={`Bandingkan ${kat[k].nama}`}
        aria-pressed={dipilih}
        onClick={() => onPilih(k)}
        className={`${lebar} ${tanda} px-0.5 py-1 text-center text-[10px] font-black leading-tight text-[#1C01A5] ${dipilih ? "ring-4 ring-[#1C01A5]" : ""}`}
      >
        {kat[k].nama}
      </button>
    );
  };

  const ringkas = kat.map((c, i) => `${c.nama} ${jumlah[i]}`).join(", ");

  if (arah === "tegak") {
    return (
      <div
        className="grid gap-x-1"
        style={{ gridTemplateColumns: `1.5rem repeat(${kat.length}, 3.6rem)` }}
        role="group"
        aria-label={`Diagram gambar tegak: ${ringkas}`}
      >
        <div className="flex flex-col-reverse" style={{ gridRow: 1, gridColumn: 1 }}>
          {baris.map((j) => (
            <span key={j} className="flex h-7 w-6 items-center justify-center rounded-md bg-[#E9D8F3] text-[11px] font-black text-[#1C01A5]">
              {j + 1}
            </span>
          ))}
        </div>
        {kat.map((c, k) => (
          <div
            key={c.nama}
            className={`flex flex-col-reverse rounded-md ${sorotMax.includes(k) ? "ring-4 ring-[#F0AB00]" : ""}`}
            style={{ gridRow: 1, gridColumn: k + 2 }}
          >
            {baris.map((j) => sel(k, j, "w-full"))}
          </div>
        ))}
        {kat.map((c, k) => (
          <div key={`nama-${c.nama}`} className="flex" style={{ gridRow: 2, gridColumn: k + 2 }}>
            {label(k, "flex w-full items-center justify-center")}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-0.5" role="group" aria-label={`Diagram gambar mendatar: ${ringkas}`}>
      {kat.map((c, k) => (
        <div key={c.nama} className={`flex items-center justify-center gap-0.5 rounded-md ${sorotMax.includes(k) ? "ring-4 ring-[#F0AB00]" : ""}`}>
          {label(k, "w-[4.6rem] shrink-0 rounded-md")}
          <div className="flex">{baris.map((j) => sel(k, j, "w-7"))}</div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-0.5">
        <span className="w-[4.6rem] shrink-0" />
        <div className="flex">
          {baris.map((j) => (
            <span key={j} className="flex h-6 w-7 items-center justify-center rounded-md bg-[#E9D8F3] text-[11px] font-black text-[#1C01A5]">
              {j + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SimulasiDiagram({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [tema, setTema] = useState<KunciTema>("sayur");
  const [jumlah, setJumlah] = useState<number[]>(TEMA.sayur.awal);
  const [arah, setArah] = useState<"tegak" | "mendatar">("tegak");
  const [lambang, setLambang] = useState<Lambang>("benda");
  const [lihatTabel, setLihatTabel] = useState(true);
  const [lihatKalimat, setLihatKalimat] = useState(true);
  const [arahTabel, setArahTabel] = useState<"menurun" | "mendatar">("menurun");
  const [banding, setBanding] = useState<number[]>([]);

  const t = TEMA[tema];
  const kat = t.kat;
  const total = jumlah.reduce((a, b) => a + b, 0);
  const maxN = Math.max(...jumlah);
  const minN = Math.min(...jumlah);
  const semuaSama = kat.length > 1 && maxN === minN;
  const ada = total > 0 && !semuaSama;
  const idxMax = ada ? jumlah.map((n, i) => (n === maxN ? i : -1)).filter((i) => i >= 0) : [];
  const idxMin = ada ? jumlah.map((n, i) => (n === minN ? i : -1)).filter((i) => i >= 0) : [];
  const nama = (idx: number[]) => idx.map((i) => kat[i].nama).join(" dan ");

  const kalimat = (): string[] => {
    if (total === 0) return [];
    const baris: string[] = [];
    if (semuaSama) baris.push(`Semua sama banyak, masing-masing ${maxN} anak.`);
    else {
      baris.push(`${nama(idxMax)} ${idxMax.length > 1 ? "sama banyak dan " : ""}paling banyak, ${maxN} anak.`);
      baris.push(`${nama(idxMin)} ${idxMin.length > 1 ? "sama banyak dan " : ""}paling sedikit, ${minN} anak.`);
    }
    baris.push(`Semuanya ada ${total} anak.`);
    return baris;
  };

  /** Hasil membandingkan dua kolom: kalimat tulis dan kalimat suara (angka dieja). */
  const bandingan = (): { tulis: string; suara: string } | null => {
    if (banding.length !== 2) return null;
    const [a, b] = banding;
    if (jumlah[a] === jumlah[b]) {
      return {
        tulis: `${kat[a].nama} dan ${kat[b].nama} sama banyak, ${jumlah[a]} anak.`,
        suara: `${kat[a].nama} dan ${kat[b].nama} sama banyak, ${sebut(jumlah[a])} anak.`,
      };
    }
    const besar = jumlah[a] > jumlah[b] ? a : b;
    const kecil = besar === a ? b : a;
    const selisih = jumlah[besar] - jumlah[kecil];
    return {
      tulis: `${kat[besar].nama} ${selisih} lebih banyak dari ${kat[kecil].nama}. (${jumlah[besar]} − ${jumlah[kecil]} = ${selisih})`,
      suara: `${kat[besar].nama} ${sebut(selisih)} lebih banyak dari ${kat[kecil].nama}. ${sebut(jumlah[besar])} dikurangi ${sebut(jumlah[kecil])} sama dengan ${sebut(selisih)}.`,
    };
  };

  const suaraCerita = () => {
    if (total === 0) return "Belum ada data. Tekan plus untuk mencatat pilihan teman.";
    const isi = kat.map((c, i) => `${c.nama} ${sebut(jumlah[i])} anak`).join(", ");
    const ujung = semuaSama
      ? `Semua sama banyak, masing-masing ${sebut(maxN)} anak.`
      : `${nama(idxMax)} paling banyak, ${sebut(maxN)} anak. ${nama(idxMin)} paling sedikit, ${sebut(minN)} anak.`;
    const hasilBanding = bandingan();
    return `${t.judul}. ${isi}. ${ujung} Semuanya ada ${sebut(total)} anak.${hasilBanding ? ` ${hasilBanding.suara}` : ""}`;
  };

  const ubah = (k: number, delta: number) => {
    setJumlah((daftar) => {
      const jml = daftar.reduce((a, b) => a + b, 0);
      if (delta > 0 && (jml >= MAKS_TOTAL || daftar[k] >= MAKS_JENIS)) return daftar;
      if (delta < 0 && daftar[k] <= 0) return daftar;
      return daftar.map((n, i) => (i === k ? n + delta : n));
    });
  };

  const gantiTema = (kunci: KunciTema) => {
    setTema(kunci);
    setJumlah(TEMA[kunci].awal);
    setBanding([]);
  };

  const pilihBanding = (k: number) => {
    setBanding((b) => {
      if (b.includes(k)) return b.filter((x) => x !== k);
      if (b.length >= 2) return [k];
      return [...b, k];
    });
  };

  const reset = () => {
    setTema("sayur");
    setJumlah(TEMA.sayur.awal);
    setArah("tegak");
    setLambang("benda");
    setLihatTabel(true);
    setLihatKalimat(true);
    setArahTabel("menurun");
    setBanding([]);
  };

  const bk = bandingan()?.tulis ?? null;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Pabrik Diagram Gambar</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Catat pilihan teman. Diagram, tabel, dan kalimat langsung berubah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan diagramnya" onClick={() => speakGuru(suaraCerita())} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Pilih topik survei">
          <span className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Survei:</span>
          {(Object.keys(TEMA) as KunciTema[]).map((k) => (
            <Pilihan key={k} aktif={tema === k} onKlik={() => gantiTema(k)} label={`Topik ${TEMA[k].label}`}>
              {TEMA[k].emoji} {TEMA[k].label}
            </Pilihan>
          ))}
        </div>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
          Tekan + untuk satu anak yang memilihnya (paling banyak {MAKS_TOTAL} anak)
        </p>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          {kat.map((c, k) => (
            <Pencacah
              key={c.nama}
              nama={c.nama}
              jenis={c.jenis}
              n={jumlah[k]}
              warna={`${WARNA_KOLOM[k % WARNA_KOLOM.length]}55`}
              tambahLabel={`Tambah satu anak suka ${c.nama}`}
              kurangLabel={`Kurangi satu anak suka ${c.nama}`}
              tambahMati={total >= MAKS_TOTAL || jumlah[k] >= MAKS_JENIS}
              onTambah={() => ubah(k, 1)}
              onKurang={() => ubah(k, -1)}
            />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-2xl bg-[#F5F3FF] px-2 py-1.5" role="img" aria-label={`${total} anak sudah ditanya`}>
          {total === 0 ? <span className="text-xs font-black text-[#1C01A5]/50">Belum ada anak yang ditanya</span> : null}
          {kat.flatMap((c, k) =>
            Array.from({ length: jumlah[k] }, (_, i) => (
              <span key={`${c.nama}-${i}`} className="igil-muncul flex flex-col items-center rounded-lg px-0.5" style={{ backgroundColor: `${WARNA_KOLOM[k % WARNA_KOLOM.length]}88` }}>
                <svg viewBox="-24 -28 48 50" className="block h-7 w-7" aria-hidden="true">
                  <Anak x={0} y={0} rambut={RAMBUT[(k + i) % RAMBUT.length]} pita={(k + i) % 3 === 1} />
                </svg>
                <BendaSvg jenis={c.jenis} kelas="h-3.5 w-3.5" />
              </span>
            ))
          )}
        </div>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1.5" role="group" aria-label="Arah diagram">
            <Pilihan aktif={arah === "tegak"} onKlik={() => setArah("tegak")}>
              ⬆ Tegak
            </Pilihan>
            <Pilihan aktif={arah === "mendatar"} onKlik={() => setArah("mendatar")}>
              ➡ Mendatar
            </Pilihan>
          </div>
          <div className="flex items-center gap-1.5" role="group" aria-label="Lambang gambar">
            <Pilihan aktif={lambang === "benda"} onKlik={() => setLambang("benda")}>
              {t.emoji} Benda
            </Pilihan>
            <Pilihan aktif={lambang === "bulat"} onKlik={() => setLambang("bulat")}>
              ● Lingkaran
            </Pilihan>
            <Pilihan aktif={lambang === "wajah"} onKlik={() => setLambang("wajah")}>
              🙂 Wajah
            </Pilihan>
          </div>
        </div>

        <p className="text-center text-sm font-black text-[#1C01A5]">{t.judul}</p>
        <div className="overflow-x-auto px-1.5 pb-1.5 pt-1.5">
          <div className="mx-auto w-max">
            <DiagramSim arah={arah} kat={kat} jumlah={jumlah} lambang={lambang} banding={banding} sorotMax={idxMax} sorotMin={idxMin} onPilih={pilihBanding} />
          </div>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]">
          Satu gambar mewakili 1 anak • kolom paling tinggi = paling banyak
        </p>
        <div className="flex items-center justify-center gap-3 text-[11px] font-black text-[#1C01A5]">
          <span className="rounded bg-[#FFE566] px-2 py-0.5">paling banyak</span>
          <span className="rounded bg-[#DBEAFE] px-2 py-0.5">paling sedikit</span>
          <span className="rounded bg-[#FEE2E2] px-2 py-0.5 ring-2 ring-[#EF4444]">selisih</span>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-[#1C01A5]/50 bg-[#F5F3FF] px-3 py-2 text-center text-sm font-black text-[#1C01A5]" role="status">
          {bk ?? "🔍 Ketuk dua nama pada diagram untuk membandingkan."}
        </div>
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilkan:</span>
          <Cek aktif={lihatTabel} onKlik={() => setLihatTabel((v) => !v)}>
            Tabel
          </Cek>
          <Cek aktif={lihatKalimat} onKlik={() => setLihatKalimat((v) => !v)}>
            Kalimat data
          </Cek>
        </div>
        {lihatTabel ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2" role="group" aria-label="Bentuk tabel">
              <Pilihan aktif={arahTabel === "menurun"} onKlik={() => setArahTabel("menurun")}>
                ⬇ Tabel menurun
              </Pilihan>
              <Pilihan aktif={arahTabel === "mendatar"} onKlik={() => setArahTabel("mendatar")}>
                ➡ Tabel mendatar
              </Pilihan>
            </div>
            {arahTabel === "menurun" ? (
              <TabelMenurun judul={`Tabel ${t.label} Kesukaan`} kepala={["Nama", "Banyak anak"]} baris={kat.map((c, i): [string, number] => [c.nama, jumlah[i]])} kecil />
            ) : (
              <TabelMendatar judul={`Tabel ${t.label} Kesukaan`} labelNama="Nama" labelBanyak="Banyak anak" nama={kat.map((c) => c.nama)} nilai={jumlah} kecil />
            )}
          </div>
        ) : null}
        {lihatKalimat ? (
          <div className="space-y-1" role="group" aria-label="Kalimat data">
            <p className="text-center text-sm font-black text-[#1C01A5]">Ceritakan datamu</p>
            {total === 0 ? <p className="text-center text-sm font-bold text-[#1C01A5]/60">Tekan + untuk mulai mencatat.</p> : null}
            {kalimat().map((l) => (
              <p key={l} className="rounded-xl bg-[#FFF7CC] px-3 py-1.5 text-sm font-black text-[#1C01A5]">
                {l}
              </p>
            ))}
          </div>
        ) : null}
        <div className="flex justify-center">
          <button type="button" className={TOMBOL_BIASA} onClick={reset}>
            ↺ Reset Semua
          </button>
        </div>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, tambah anak sampai satu kolom paling tinggi. Dua, ubah diagram menjadi mendatar. Apakah datanya berubah? Tiga, ketuk dua nama pada diagram untuk mencari selisihnya. Empat, ganti lambang gambar menjadi lingkaran. Apakah banyaknya sama?"
          )
        }
        langkah={[
          "Tambah anak sampai ada satu kolom yang paling tinggi.",
          "Ubah diagram menjadi mendatar. Apakah datanya berubah?",
          "Ketuk dua nama pada diagram untuk mencari selisihnya.",
          "Ganti lambang menjadi lingkaran. Apakah banyaknya sama?",
        ]}
      />
    </div>
  );
}

/* ======================================================================== */
/* Pembungkus tab Simulasi Bab 8                                            */
/* ======================================================================== */

export default function SimulasiBab8({ speakGuru, onKeLatihan }: { speakGuru: (t: string) => void; onKeLatihan: () => void }) {
  const [aktif, setAktif] = useState<"A" | "B">("A");
  return (
    <section className="mx-auto mt-4 w-[98%] space-y-4 rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-3 md:p-6" aria-label="Laboratorium Simulasi Bab 8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="rounded-full bg-[#1C01A5] px-3 py-1 text-xs font-black text-[#FFE566]">LABORATORIUM SIMULASI • BAB 8</span>
          <p className="mt-1 text-sm font-bold text-[#1C01A5]/80">Bermain bebas. Tidak ada nilai dan tidak ada salah. Ayo bereksperimen!</p>
        </div>
        <TombolSuaraGuru
          label="Dengarkan petunjuk simulasi"
          onClick={() =>
            speakGuru(
              "Selamat datang di Laboratorium Simulasi. Di sini kamu boleh bermain bebas. Geser, ketuk, dan tekan plus atau minus. Lihat apa yang berubah. Tidak ada nilai dan tidak ada yang salah."
            )
          }
        />
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih simulasi">
        {(
          [
            { id: "A", judul: "Simulasi 1", sub: "Sub-Bab A • Laboratorium Data" },
            { id: "B", judul: "Simulasi 2", sub: "Sub-Bab B • Pabrik Diagram" },
          ] as const
        ).map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={aktif === s.id}
            onClick={() => setAktif(s.id)}
            className={`rounded-2xl border-4 px-3 py-1.5 text-left font-black ${
              aktif === s.id ? "border-[#F0AB00] bg-[#1C01A5] text-[#FFE566]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]"
            }`}
          >
            <span className="block text-sm leading-tight">{s.judul}</span>
            <span className="block text-[10px] uppercase tracking-wide opacity-80">{s.sub}</span>
          </button>
        ))}
      </div>

      {aktif === "A" ? <SimulasiData speakGuru={speakGuru} /> : <SimulasiDiagram speakGuru={speakGuru} />}

      <div className="flex justify-end pt-1">
        <button type="button" onClick={onKeLatihan} className={`${TOMBOL_UTAMA} px-6 py-3`}>
          LANJUTKAN KE LATIHAN ➡️
        </button>
      </div>
    </section>
  );
}
