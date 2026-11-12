"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import Atur4 from "./atur-k3b3";
import { ejaK3B3 } from "./eja-k3b3";
import {
  BANDUL,
  BENDA_KODOK,
  MAKS_BANDUL,
  arahKodok,
  awalKodok,
  banyakBandul,
  cariBendaKodok,
  hitungSusunan,
  jumlahBandulG,
  keadaanKodok,
  keadaanUbah,
  langkahKodok,
  susunanBenda,
  teksKgG,
  teksOns,
  teksSusunan,
  teksUbahBerat,
  titikKodok,
  ucapKodok,
  ucapUbah,
  type ArahNeraca,
  type KeadaanKodok,
  type KeadaanUbah,
  type LangkahKodok,
} from "./lab-kodok-k3b3";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B3 Sub-Bab D): Lab Timbangan Kodok. Satu alat, dua tampilan.      */
/*  Bandul : benda ditimbang dengan bandul 1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg.   */
/*           Seimbang bila jumlah bandul tepat sama dengan berat benda.           */
/*  Ubah   : berat dalam gram diubah ke kilogram dan gram, dan ke ons.            */
/* Logika: lab-kodok-k3b3.ts.                                                    */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const CATATAN = [
  "Seimbangkan tepung 750 g. Lalu cari susunan bandul yang berbeda. Berapa susunan yang kamu temukan?",
  "Ganti ke Ubah Berat, buat 1.000 g, dan nyalakan Ons. Berapa ons sama dengan 1 kg?",
  "Buat 1.753 g dan nyalakan Kilogram dan gram. Apa yang terjadi pada seribu gram pertama?",
  "Buat 4 kg 150 g dan nyalakan Gram. Mengapa kilogramnya dikali 1.000?",
];

const MIRING: Record<ArahNeraca, number> = { seimbang: 0, "benda-berat": 9, "bandul-berat": -9 };

function Kodok({ benda, g, jumlahG, arah }: { benda: string; g: number; jumlahG: number; arah: ArahNeraca }) {
  const sudut = MIRING[arah];
  const naik = Math.sin((sudut * Math.PI) / 180) * 64;
  const warna = arah === "seimbang" ? "#15803D" : UNGU;
  return (
    <svg viewBox="0 0 240 150" className="mx-auto block h-40 w-full max-w-sm" role="img" aria-label={`Timbangan kodok. ${benda} ${g} gram, bandul ${jumlahG} gram. ${arah === "seimbang" ? "Seimbang." : arah === "benda-berat" ? "Benda lebih berat." : "Bandul lebih berat."}`}>
      <polygon points="120,138 100,146 140,146" fill={UNGU} />
      <line x1="120" y1="40" x2="120" y2="138" stroke={UNGU} strokeWidth="5" strokeLinecap="round" />
      <g style={{ transform: `rotate(${sudut}deg)`, transformOrigin: "120px 40px", transition: "transform 0.4s" }}>
        <line x1="56" y1="40" x2="184" y2="40" stroke={warna} strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="120" cy="40" r="7" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
      {[
        { x: 56, y: 40 + naik, nilai: `${titikKodok(g)} g`, isi: benda, warna: "#FEF3C7", garis: "#B45309" },
        { x: 184, y: 40 - naik, nilai: `${titikKodok(jumlahG)} g`, isi: "bandul", warna: "#DBEAFE", garis: "#1D4ED8" },
      ].map((p) => (
        <g key={p.x} style={{ transition: "all 0.4s" }}>
          <line x1={p.x} y1={p.y} x2={p.x - 22} y2={p.y + 38} stroke={UNGU} strokeWidth="2" />
          <line x1={p.x} y1={p.y} x2={p.x + 22} y2={p.y + 38} stroke={UNGU} strokeWidth="2" />
          <rect x={p.x - 34} y={p.y + 38} width="68" height="34" rx="8" fill={p.warna} stroke={p.garis} strokeWidth="3" />
          <text x={p.x} y={p.y + 52} textAnchor="middle" fontSize="10" fontWeight="900" fill="#7C2D12">
            {p.isi}
          </text>
          <text x={p.x} y={p.y + 67} textAnchor="middle" fontSize="14" fontWeight="900" fill={UNGU}>
            {p.nilai}
          </text>
        </g>
      ))}
      <text x="120" y="22" textAnchor="middle" fontSize="18" fontWeight="900" fill={warna}>
        {arah === "seimbang" ? "=" : arah === "benda-berat" ? ">" : "<"}
      </text>
    </svg>
  );
}

export default function SimulasiLabKodokK3({
  speakGuru,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  onKeadaan?: (k: KeadaanKodok | KeadaanUbah) => void;
}) {
  const [x, kirim] = useReducer(langkahKodok, undefined, awalKodok);
  const [lihat, setLihat] = useState<"bandul" | "ubah">("bandul");

  useEffect(() => {
    onKeadaan?.(lihat === "bandul" ? keadaanKodok(x) : keadaanUbah(x));
  }, [onKeadaan, lihat, x]);

  const b = cariBendaKodok(x.benda);
  const arah = arahKodok(x);
  const jumlahG = jumlahBandulG(x.jumlah);
  const catatan = susunanBenda(x.pernah, x.benda);
  const cara = hitungSusunan(b.g);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Timbangan Kodok</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Seimbangkan benda dengan bandul, lalu ubah kilogram, ons, dan gram.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B3(lihat === "bandul" ? ucapKodok(x) : ucapUbah(x)))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "bandul"} onKlik={() => setLihat("bandul")}>
          🛒 Bandul
        </Pilihan>
        <Pilihan aktif={lihat === "ubah"} onKlik={() => setLihat("ubah")}>
          🔁 Ubah Berat
        </Pilihan>
      </div>

      {lihat === "bandul" ? (
        <>
          <div className={`${KARTU} space-y-3`}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih benda">
              {BENDA_KODOK.map((o) => (
                <Pilihan key={o.id} aktif={x.benda === o.id} onKlik={() => kirim({ t: "BENDA", id: o.id })}>
                  {o.nama} {titikKodok(o.g)} g
                </Pilihan>
              ))}
            </div>
            <Kodok benda={b.nama} g={b.g} jumlahG={jumlahG} arah={arah} />
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${arah === "seimbang" ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
              {x.pesan ? `⛔ ${x.pesan}` : `🔧 ${arah === "seimbang" ? `Seimbang! ${b.nama} ${titikKodok(b.g)} g = ${teksSusunan(x.jumlah)}.` : arah === "benda-berat" ? `Bandul ${titikKodok(jumlahG)} g, benda masih lebih berat. Tambah bandul.` : `Bandul ${titikKodok(jumlahG)} g, lebih berat dari benda. Kurangi bandul.`}`}
            </p>
          </div>

          <div className={`${KARTU} space-y-2`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bandul (paling banyak {MAKS_BANDUL} tiap jenis)</p>
            {BANDUL.map((d, i) => (
              <div key={d.id} className="flex items-center gap-2 rounded-2xl border-2 border-[#1C01A5] bg-[#FEF9C3] px-2 py-1.5">
                <span className="min-w-0 flex-1 text-sm font-black text-[#1C01A5]">
                  {d.nama} <span className="text-xs font-bold text-[#1C01A5]/70">({titikKodok(d.g)} g)</span>
                </span>
                <button type="button" aria-label={`Kurangi bandul ${d.nama}`} onClick={() => kirim({ t: "BANDUL", i, d: -1 })} className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none text-[#1C01A5]">
                  –
                </button>
                <span className="w-7 shrink-0 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
                  {x.jumlah[i]}
                </span>
                <button type="button" aria-label={`Tambah bandul ${d.nama}`} onClick={() => kirim({ t: "BANDUL", i, d: 1 })} className="h-9 w-9 shrink-0 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5]">
                  +
                </button>
              </div>
            ))}
            <p className="text-sm font-bold text-[#1C01A5]">
              Jumlah bandul: {banyakBandul(x.jumlah)} buah, {titikKodok(jumlahG)} g ({teksOns(jumlahG)}, {teksKgG(jumlahG)}).
            </p>
            <p className="text-xs font-bold text-[#15803D]">
              {catatan === 0 ? `Berat ${b.nama.toLowerCase()} bisa dibuat dengan banyak susunan bandul. Coba temukan lebih dari satu.` : `${catatan} susunan seimbang untuk ${b.nama.toLowerCase()} sudah ketemu. Masih ada susunan lain.`}
            </p>
            <p className="text-xs font-bold text-[#1C01A5]/60">Ada {cara} susunan bandul yang mungkin untuk {titikKodok(b.g)} g (tiap jenis paling banyak {MAKS_BANDUL}).</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "KOSONG" })}>
                🧹 Kosongkan bandul
              </button>
              <button
                type="button"
                className={TOMBOL_BIASA}
                onClick={() => {
                  kirim({ t: "RESET" });
                  setLihat("bandul");
                }}
              >
                🔁 Reset Semua
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`${KARTU} space-y-3`}>
            <Atur4 nama="Kilogram" nilai={Math.floor(x.total / 1000)} warna="#FEE2E2" onUbah={(d: LangkahKodok) => kirim({ t: "UBAH", satuan: "kg", d })} satuan="kilogram" />
            <Atur4 nama="Gram" nilai={x.total % 1000} warna="#DBEAFE" onUbah={(d: LangkahKodok) => kirim({ t: "UBAH", satuan: "g", d })} satuan="gram" />
            <KalimatBesar teks={`${teksKgG(x.total)}`} />
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${x.pesan ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]"}`}>
              {x.pesan ? `⛔ ${x.pesan}` : "🔧 Satu kilogram sama dengan seribu gram, dan sama dengan sepuluh ons."}
            </p>
          </div>
          <div className={`${KARTU} space-y-3`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tampilan</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan berat">
              <Cek aktif={x.tampil.gram} onKlik={() => kirim({ t: "TOGGLE", rep: "gram" })}>
                Gram
              </Cek>
              <Cek aktif={x.tampil.ons} onKlik={() => kirim({ t: "TOGGLE", rep: "ons" })}>
                Ons
              </Cek>
              <Cek aktif={x.tampil.kgg} onKlik={() => kirim({ t: "TOGGLE", rep: "kgg" })}>
                Kilogram dan gram
              </Cek>
            </div>
            {x.tampil.gram ? <KalimatBesar teks={`${titikKodok(x.total)} g`} warna="bg-[#E8F7EE]" /> : null}
            {x.tampil.ons ? <KalimatBesar teks={teksOns(x.total)} warna="bg-[#EDE9FE]" /> : null}
            {x.tampil.kgg ? <KalimatBesar teks={teksKgG(x.total)} warna="bg-[#FFF7CC]" /> : null}
            <p className="rounded-xl bg-[#EDE9FE] px-3 py-1.5 text-center text-sm font-black text-[#1C01A5]">{teksUbahBerat(x.total)}</p>
            <button
              type="button"
              className={TOMBOL_BIASA}
              onClick={() => {
                kirim({ t: "RESET" });
                setLihat("bandul");
              }}
            >
              🔁 Reset Semua
            </button>
          </div>
        </>
      )}

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
