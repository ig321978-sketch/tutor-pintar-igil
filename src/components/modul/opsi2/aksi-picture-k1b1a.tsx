"use client";

import React, { useState } from "react";
import { eja } from "@/components/modul/story/kit/dasar";
import { TombolSuaraGuru } from "../tahap-b-gaya";
import { HubungkanGaris, PapanBenda, Letak, PilihKata, TombolPeriksa, type ItemHubung } from "./primitif";
import { daftarkanKomponen } from "./registri-komponen";
import type { PropsAksi } from "./tipe-aksi";

/**
 * Komponen tindakan Picture Kelas 1 Bab 1 Sub-Bab A. Satu komponen per id tindakan di
 * src/lib/opsi2/tindakan-picture-k1b1a.ts. Layar hanya diagram polos: titik atau lingkaran, petak bingkai sepuluh,
 * turus (goresan), dan kartu lambang. Tanpa gambar atau emoji benda, tanpa memindahkan benda. Titik merah = yang ada.
 */

const MERAH = "#DC2626";
const BIRU = "#1C01A5";
const RING_KEDIP = "igil-denyut bg-[#FFF3B0] ring-4 ring-[#FFC800]";

type TitikXY = { x: number; y: number };
type TitikId = TitikXY & { id: string };

const daftarString = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const bentukBenar = (p: PropsAksi): Record<string, unknown> | null => (p.tunjukBenar && typeof p.tunjukBenar === "object" ? (p.tunjukBenar as Record<string, unknown>) : null);

/** Pilihan yang sudah keliru (hanya yang bukan kunci). */
const pilihanSalah = (p: PropsAksi): string[] =>
  p.riwayat
    .map((r) => (r && typeof r === "object" ? (r as { pilih?: unknown }).pilih : undefined))
    .filter((x): x is string => typeof x === "string" && x !== p.instans.kunciPilihan);

const Bantuan = ({ teks }: { teks: string }) => (
  <p className="text-center text-sm font-black text-[#1C01A5]/70" aria-hidden="true">
    {teks}
  </p>
);

/** Kartu pilihan banyaknya (lambang + tombol dengar). Aktif bila tindakan sebelumnya sudah lengkap. */
function BagianPilih({ p, aktif, onPilih }: { p: PropsAksi; aktif: boolean; onPilih: (id: string) => void }) {
  return (
    <PilihKata
      pilihan={p.instans.pilihan ?? []}
      salah={pilihanSalah(p)}
      benarId={p.terkunci ? (p.instans.kunciPilihan ?? null) : null}
      kedip={[]}
      aktif={aktif}
      terkunci={p.terkunci}
      onPilih={onPilih}
      bicara={p.bicara}
      kolom={(p.instans.pilihan?.length ?? 0) === 3 ? 3 : 2}
    />
  );
}

/* ------------------------------ Diagram bersama ------------------------------ */

/** Kumpulan titik polos pada kotak 2:1. Titik dengan id di `kedip` berkedip. Id titik: `<kartu>-t<nomor>`. */
function KumpulanTitik({ titik, kartu, kedip = [] }: { titik: TitikXY[]; kartu: string; kedip?: string[] }) {
  return (
    <svg viewBox="0 0 100 50" role="img" aria-label="Kumpulan titik" className="h-full w-full">
      {titik.map((t, i) => {
        const k = kedip.includes(`${kartu}-t${i + 1}`);
        return (
          <circle
            key={i}
            cx={t.x}
            cy={t.y / 2}
            r={6.5}
            fill={k ? "#FFC800" : MERAH}
            stroke={k ? "#92400E" : "#7F1D1D"}
            strokeWidth={1.5}
            className={k ? "igil-denyut" : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        );
      })}
    </svg>
  );
}

/** Satu titik yang dapat diketuk. `on` = sudah ditandai (cincin biru); `awal` = titik pertama hitungan. */
function TitikTombol({ on, awal = false, kedip, aktif, label, onKetuk }: { on: boolean; awal?: boolean; kedip: boolean; aktif: boolean; label: string; onKetuk: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      disabled={!aktif}
      onClick={onKetuk}
      className={`relative flex h-12 min-h-[48px] w-12 min-w-[48px] items-center justify-center rounded-full ${kedip ? RING_KEDIP : ""}`}
    >
      <span className={`block h-7 w-7 rounded-full bg-[#DC2626] ${on ? "ring-4 ring-[#1C01A5] ring-offset-2" : ""} ${awal ? "ring-[6px]" : ""}`} />
      {awal && (
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-black leading-none text-[#1C01A5]" aria-hidden="true">
          Mulai
        </span>
      )}
    </button>
  );
}

/** Bingkai sepuluh (dua baris lima). `gaya` "warna": petak diwarnai; "titik": titik di dalam petak. Tanpa `onKetuk` = hanya tampilan. */
function Bingkai({ terisi, gaya, onKetuk, kedip = [], terkunci = true, label }: { terisi: string[]; gaya: "warna" | "titik"; onKetuk?: (id: string) => void; kedip?: string[]; terkunci?: boolean; label: string }) {
  return (
    <div role="group" aria-label={label} className="mx-auto grid w-full max-w-[340px] grid-cols-5 gap-1 rounded-xl border-4 border-[#1C01A5] bg-white p-1.5">
      {Array.from({ length: 10 }, (_, i) => {
        const id = `l${i + 1}`;
        const isi = terisi.includes(id);
        const kelas = `flex aspect-square min-h-[48px] items-center justify-center rounded-md border-2 border-[#1C01A5]/50 ${gaya === "warna" && isi ? "bg-[#DC2626]" : "bg-[#FFFBEB]"} ${kedip.includes(id) ? RING_KEDIP : ""}`;
        const dalam = gaya === "titik" && isi ? <span className="block h-3/5 w-3/5 rounded-full bg-[#DC2626]" /> : null;
        if (!onKetuk) {
          return (
            <div key={id} className={kelas}>
              {dalam}
            </div>
          );
        }
        return (
          <button key={id} type="button" disabled={terkunci} aria-label={`Petak ${i + 1} ${isi ? "berwarna" : "kosong"}`} aria-pressed={isi} onClick={() => onKetuk(id)} className={kelas}>
            {dalam}
          </button>
        );
      })}
    </div>
  );
}

/** Menambah atau mencabut id dari daftar. */
const balik = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar.filter((x) => x !== id) : [...daftar, id]);

/* ---------------- p-warnai-bingkai ---------------- */
function AksiWarnaiBingkai(p: PropsAksi) {
  const [ids, setIds] = useState<string[]>([]);
  const tampil = bentukBenar(p) ? daftarString(bentukBenar(p)?.ids) : ids;
  const ketuk = (id: string) => {
    if (p.terkunci) return;
    if (!ids.includes(id)) p.bicara(eja(ids.length + 1));
    setIds(balik(ids, id));
  };
  return (
    <div className="space-y-3">
      <Bingkai terisi={tampil} gaya="warna" onKetuk={ketuk} kedip={p.kedip} terkunci={p.terkunci} label="Bingkai sepuluh" />
      {tampil.length === 0 && <Bantuan teks="Ketuk petak untuk mewarnai" />}
      <TombolPeriksa aktif={!p.terkunci && ids.length > 0} onClick={() => p.kirim({ ids })} />
    </div>
  );
}

/* ---------------- p-tandai-titik ---------------- */
function AksiTandaiTitik(p: PropsAksi) {
  const titik = (p.instans.data.titik as { id: string }[]) ?? [];
  const [ids, setIds] = useState<string[]>([]);
  const tampil = bentukBenar(p) ? daftarString(bentukBenar(p)?.ids) : ids;
  const ketuk = (id: string) => {
    if (p.terkunci) return;
    if (!ids.includes(id)) p.bicara(eja(ids.length + 1));
    setIds(balik(ids, id));
  };
  return (
    <div className="space-y-3">
      <div role="group" aria-label="Deret titik" className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white p-3">
        {titik.map((t, i) => (
          <TitikTombol key={t.id} on={tampil.includes(t.id)} kedip={p.kedip.includes(t.id)} aktif={!p.terkunci} label={`Titik ${i + 1}`} onKetuk={() => ketuk(t.id)} />
        ))}
      </div>
      {tampil.length === 0 && <Bantuan teks="Ketuk titik untuk menandai" />}
      <TombolPeriksa aktif={!p.terkunci && ids.length > 0} onClick={() => p.kirim({ ids })} />
    </div>
  );
}

/* ---------------- p-hubungkan-lambang ---------------- */
function AksiHubungkanLambang(p: PropsAksi) {
  const kiriData = (p.instans.data.kiri as { id: string; titik: TitikXY[] }[]) ?? [];
  const kananData = (p.instans.data.kanan as { id: string; lambang: string }[]) ?? [];
  const [hubungan, setHubungan] = useState<[string, string][]>([]);
  const dariBenar = bentukBenar(p)?.garis;
  const tampil: [string, string][] = Array.isArray(dariBenar) ? (dariBenar as [string, string][]) : hubungan;
  const kiri: ItemHubung[] = kiriData.map((k, i) => ({
    id: k.id,
    label: `Kumpulan titik ${i + 1}`,
    isi: (
      <span className="block h-full w-full p-1">
        <KumpulanTitik titik={k.titik} kartu={k.id} />
      </span>
    ),
  }));
  const kanan: ItemHubung[] = kananData.map((k) => ({ id: k.id, label: `Lambang ${eja(Number(k.lambang))}`, isi: <span aria-hidden="true">{k.lambang}</span> }));
  return (
    <div className="space-y-3">
      <HubungkanGaris kiri={kiri} kanan={kanan} hubungan={tampil} onUbah={setHubungan} kedip={p.kedip} terkunci={p.terkunci} />
      {tampil.length < kiri.length && <Bantuan teks="Ketuk kumpulan titik, lalu lambangnya" />}
      <TombolPeriksa aktif={!p.terkunci && hubungan.length === kiri.length} onClick={() => p.kirim({ garis: hubungan })} />
    </div>
  );
}

/* ---------------- p-pilih-diagram ---------------- */
function AksiPilihDiagram(p: PropsAksi) {
  const kartu = (p.instans.data.kartu as { id: string; titik: TitikXY[] }[]) ?? [];
  const salah = pilihanSalah(p);
  return (
    <div role="group" aria-label="Tiga kartu titik" className="grid grid-cols-3 gap-2">
      {kartu.map((k) => {
        const pil = (p.instans.pilihan ?? []).find((x) => x.id === k.id);
        const benar = p.terkunci && p.instans.kunciPilihan === k.id;
        const sudahSalah = salah.includes(k.id);
        return (
          <div key={k.id} className="flex flex-col items-center gap-1">
            <button
              type="button"
              disabled={p.terkunci || sudahSalah}
              aria-label={pil?.suara ?? k.id}
              onClick={() => p.kirim({ pilih: k.id })}
              className={`min-h-[84px] w-full rounded-2xl border-4 p-1 ${benar ? "border-[#16A34A] bg-[#DCFCE7]" : sudahSalah ? "border-[#CBD5E1] bg-[#F1F5F9]" : "border-[#1C01A5] bg-white"}`}
            >
              <KumpulanTitik titik={k.titik} kartu={k.id} kedip={p.kedip} />
            </button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-[#1C01A5]">{pil?.label}</span>
              <TombolSuaraGuru kecil label={`Dengar: ${pil?.suara ?? ""}`} onClick={() => p.bicara(pil?.suara ?? "")} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- p-lengkapi-turus ---------------- */

/** Letak satu goresan turus (indeks 0 sampai 9). Empat goresan tegak, goresan kelima miring memotongnya. */
function garisTurus(i: number): { x1: number; y1: number; x2: number; y2: number } {
  const x0 = Math.floor(i / 5) * 130 + 14;
  const pos = i % 5;
  if (pos < 4) return { x1: x0 + pos * 22, y1: 10, x2: x0 + pos * 22, y2: 60 };
  return { x1: x0 - 8, y1: 52, x2: x0 + 74, y2: 18 };
}

function Turus({ jumlah, awal, kedip }: { jumlah: number; awal: number; kedip: string[] }) {
  return (
    <svg viewBox="0 0 260 70" role="img" aria-label="Turus" className="mx-auto w-full max-w-[340px] rounded-2xl border-4 border-[#1C01A5] bg-white">
      {Array.from({ length: 10 }, (_, i) => {
        const g = garisTurus(i);
        const ada = i < jumlah;
        const k = !ada && kedip.includes(`g${i + 1}`);
        const kelebihan = ada && kedip.includes(`g${i + 1}`);
        return (
          <line
            key={i}
            {...g}
            strokeLinecap="round"
            strokeWidth={ada ? 7 : 5}
            stroke={ada ? (kelebihan ? "#FFC800" : i < awal ? BIRU : MERAH) : k ? "#FFC800" : "#CBD5E1"}
            strokeDasharray={ada ? undefined : "2 9"}
            className={k || kelebihan ? "igil-denyut" : undefined}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        );
      })}
    </svg>
  );
}

function AksiLengkapiTurus(p: PropsAksi) {
  const awal = (p.instans.data.awal as number) ?? 1;
  const [k, setK] = useState(awal);
  const benar = bentukBenar(p);
  const tampil = benar && typeof benar.isi === "number" ? benar.isi : k;
  const gores = () => {
    if (p.terkunci || k >= 10) return;
    setK(k + 1);
    p.bicara(eja(k + 1));
  };
  const hapus = () => {
    if (!p.terkunci && k > awal) setK(k - 1);
  };
  const tombol = "min-h-[52px] min-w-[96px] rounded-full border-4 px-6 text-lg font-black disabled:opacity-40";
  return (
    <div className="space-y-3">
      <Turus jumlah={tampil} awal={awal} kedip={p.kedip} />
      <div className="flex items-center justify-center gap-3">
        <button type="button" disabled={p.terkunci || k >= 10} onClick={gores} className={`${tombol} border-[#FFE566] bg-[#1C01A5] text-[#FFE566]`}>
          Gores
        </button>
        <button type="button" disabled={p.terkunci || k <= awal} onClick={hapus} className={`${tombol} border-[#1C01A5] bg-white text-[#1C01A5]`}>
          Hapus
        </button>
      </div>
      <TombolPeriksa aktif={!p.terkunci && k > awal} onClick={() => p.kirim({ isi: k })} />
    </div>
  );
}

/* ---------------- p-titik-tersebar ---------------- */
function AksiTitikTersebar(p: PropsAksi) {
  const titik = (p.instans.data.titik as TitikId[]) ?? [];
  const [ditandai, setDitandai] = useState<string[]>([]);
  const tampil = bentukBenar(p) ? titik.map((t) => t.id) : ditandai;
  const lengkap = tampil.length === titik.length;
  const ketuk = (id: string) => {
    if (p.terkunci || ditandai.includes(id)) return;
    setDitandai([...ditandai, id]);
    p.bicara(eja(ditandai.length + 1));
  };
  return (
    <div className="space-y-3">
      <PapanBenda label="Titik tersebar" kelas="bg-white border-[#1C01A5]">
        {titik.map((t, i) => (
          <Letak key={t.id} x={t.x} y={t.y}>
            <TitikTombol on={tampil.includes(t.id)} kedip={p.kedip.includes(t.id)} aktif={!p.terkunci} label={`Titik ${i + 1}`} onKetuk={() => ketuk(t.id)} />
          </Letak>
        ))}
      </PapanBenda>
      {!lengkap && <Bantuan teks="Ketuk tiap titik, sekali saja" />}
      <BagianPilih p={p} aktif={lengkap} onPilih={(id) => p.kirim({ ditandai, pilih: id })} />
    </div>
  );
}

/* ---------------- p-salin-pola ---------------- */
function AksiSalinPola(p: PropsAksi) {
  const contoh = daftarString(p.instans.data.contoh);
  const [ids, setIds] = useState<string[]>([]);
  const tampil = bentukBenar(p) ? daftarString(bentukBenar(p)?.ids) : ids;
  const ketuk = (id: string) => {
    if (!p.terkunci) setIds(balik(ids, id));
  };
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-center text-sm font-black text-[#1C01A5]">Contoh</p>
        <Bingkai terisi={contoh} gaya="warna" label="Pola contoh" />
      </div>
      <div className="space-y-1">
        <p className="text-center text-sm font-black text-[#1C01A5]">Salin di sini</p>
        <Bingkai terisi={tampil} gaya="warna" onKetuk={ketuk} kedip={p.kedip} terkunci={p.terkunci} label="Bingkai kosong untuk disalin" />
      </div>
      <TombolPeriksa aktif={!p.terkunci && ids.length > 0} onClick={() => p.kirim({ ids })} />
    </div>
  );
}

/* ---------------- p-ketuk-semua-diagram ---------------- */
function AksiKetukSemuaDiagram(p: PropsAksi) {
  const kartu = (p.instans.data.kartu as { id: string; titik: TitikXY[] }[]) ?? [];
  const [ids, setIds] = useState<string[]>([]);
  const tampil = bentukBenar(p) ? daftarString(bentukBenar(p)?.ids) : ids;
  return (
    <div className="space-y-3">
      <div role="group" aria-label="Enam kartu titik" className="grid grid-cols-3 gap-2">
        {kartu.map((k, i) => {
          const dipilih = tampil.includes(k.id);
          return (
            <button
              key={k.id}
              type="button"
              disabled={p.terkunci}
              aria-label={`Kartu ${i + 1}`}
              aria-pressed={dipilih}
              onClick={() => setIds(balik(ids, k.id))}
              className={`min-h-[72px] rounded-2xl border-4 p-1 ${dipilih ? "border-[#16A34A] bg-[#DCFCE7]" : "border-[#1C01A5] bg-white"} ${p.kedip.includes(k.id) ? RING_KEDIP : ""}`}
            >
              <KumpulanTitik titik={k.titik} kartu={k.id} />
            </button>
          );
        })}
      </div>
      {tampil.length === 0 && <Bantuan teks="Ketuk kartu yang cocok" />}
      <TombolPeriksa aktif={!p.terkunci && ids.length > 0} onClick={() => p.kirim({ ids })} />
    </div>
  );
}

/* ---------------- p-papan-lambang ---------------- */
function AksiPapanLambang(p: PropsAksi) {
  const terisi = daftarString(p.instans.data.terisi);
  const papan = daftarString(p.instans.data.papan);
  const kunci = p.instans.kunci as number;
  const salah = p.riwayat
    .map((r) => (r && typeof r === "object" ? (r as { pilih?: unknown }).pilih : undefined))
    .filter((x): x is number => typeof x === "number" && x !== kunci);
  return (
    <div className="space-y-3">
      <Bingkai terisi={terisi} gaya="titik" kedip={p.kedip} label="Diagram titik dalam bingkai sepuluh" />
      <div role="group" aria-label="Papan lambang nol sampai sepuluh" className="grid grid-cols-4 gap-2">
        {papan.map((l) => {
          const angka = Number(l);
          const benar = p.terkunci && angka === kunci;
          const sudahSalah = salah.includes(angka);
          return (
            <button
              key={l}
              type="button"
              disabled={p.terkunci || sudahSalah}
              aria-label={eja(angka)}
              onClick={() => p.kirim({ pilih: angka })}
              className={`min-h-[56px] rounded-2xl border-4 text-2xl font-black ${benar ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : sudahSalah ? "border-[#CBD5E1] bg-[#F1F5F9] text-[#94A3B8] line-through" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`}
            >
              {l}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- p-titik-melingkar ---------------- */
function AksiTitikMelingkar(p: PropsAksi) {
  const titik = (p.instans.data.titik as TitikId[]) ?? [];
  const n = titik.length;
  const [urutan, setUrutan] = useState<string[]>([]);
  const [lokal, setLokal] = useState<string[]>([]);
  const benar = bentukBenar(p);
  const tampil = benar ? titik.map((t) => t.id) : urutan;
  const awal = tampil[0] ?? null;
  const lengkap = tampil.length === n;
  const indeks = (id: string): number => Number(id.slice(1)) - 1;
  const ketuk = (id: string) => {
    if (p.terkunci || urutan.includes(id)) return;
    if (urutan.length === 0) {
      setUrutan([id]);
      setLokal([]);
      p.bicara(eja(1));
      return;
    }
    const s = indeks(urutan[0]);
    const sekarang = indeks(urutan[urutan.length - 1]);
    const arah = urutan.length === 1 ? 0 : (indeks(urutan[1]) - s + n) % n === 1 ? 1 : -1;
    const calon = arah === 0 ? [(sekarang + 1) % n, (sekarang - 1 + n) % n] : [(((sekarang + arah) % n) + n) % n];
    if (calon.includes(indeks(id))) {
      setUrutan([...urutan, id]);
      setLokal([]);
      p.bicara(eja(urutan.length + 1));
    } else setLokal(calon.map((c) => `t${c + 1}`));
  };
  return (
    <div className="space-y-3">
      <PapanBenda tinggi={260} label="Titik melingkar" kelas="bg-white border-[#1C01A5]">
        {titik.map((t, i) => (
          <Letak key={t.id} x={t.x} y={t.y}>
            <TitikTombol on={tampil.includes(t.id)} awal={t.id === awal} kedip={p.kedip.includes(t.id) || lokal.includes(t.id)} aktif={!p.terkunci} label={`Titik ${i + 1}`} onKetuk={() => ketuk(t.id)} />
          </Letak>
        ))}
      </PapanBenda>
      {!lengkap && <Bantuan teks={awal ? "Terus searah, kembali ke awal" : "Ketuk satu titik sebagai awal"} />}
      <BagianPilih p={p} aktif={lengkap} onPilih={(id) => p.kirim({ awal, urutan, pilih: id })} />
    </div>
  );
}

daftarkanKomponen("p-warnai-bingkai", AksiWarnaiBingkai);
daftarkanKomponen("p-tandai-titik", AksiTandaiTitik);
daftarkanKomponen("p-hubungkan-lambang", AksiHubungkanLambang);
daftarkanKomponen("p-pilih-diagram", AksiPilihDiagram);
daftarkanKomponen("p-lengkapi-turus", AksiLengkapiTurus);
daftarkanKomponen("p-titik-tersebar", AksiTitikTersebar);
daftarkanKomponen("p-salin-pola", AksiSalinPola);
daftarkanKomponen("p-ketuk-semua-diagram", AksiKetukSemuaDiagram);
daftarkanKomponen("p-papan-lambang", AksiPapanLambang);
daftarkanKomponen("p-titik-melingkar", AksiTitikMelingkar);
