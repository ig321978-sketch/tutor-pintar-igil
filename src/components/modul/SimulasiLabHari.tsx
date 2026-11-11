"use client";

import React, { useEffect, useMemo, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, TOMBOL_BIASA } from "./simulasi-bersama";
import { KalimatBesar, eja } from "./komponen-lab";
import { JamMuka } from "./diagram-k2b6";
import {
  PITA_BAGIAN,
  awalHari,
  daftarTampil,
  jam12Hari,
  kalimatHari,
  kegiatanLab,
  ketukKegiatan,
  laporanHari,
  lamaTeks,
  lewatTengahMalam,
  nomorUrut,
  nyalakanUrut,
  resetHari,
  sebutMulai,
  segmenKegiatan,
  selesaiJam,
  type KegiatanLab,
} from "./lab-hari-k2b6";
import type { KeadaanLabHari } from "./misi-k2bab6";

/* ------------------------------------------------------------------------ */
/* Simulasi (K2B6 Sub-Bab B): Lab Hariku — lab 2D di atas garis waktu 24 jam.   */
/* Memisahkan dua pertanyaan: KAPAN (urutan, bagian hari) dan BERAPA LAMA       */
/* (lama kegiatan). Yang mulai lebih dulu belum tentu lebih lama. Logika:        */
/* lab-hari-k2b6.ts.                                                             */
/* ------------------------------------------------------------------------ */

const LEBAR = 300;
const x = (jam: number) => (jam / 24) * LEBAR;
const WARNA_PITA: Record<string, string> = { malam: "#C7D2FE", pagi: "#FEF3C7", siang: "#FDE68A", sore: "#FDBA74" };
const WARNA_PILIH = ["#1C01A5", "#F0AB00"];
const NAMA_PILIH = ["kegiatan pertama (ungu)", "kegiatan kedua (emas)"];

function GarisWaktu({ pilih }: { pilih: KegiatanLab[] }) {
  return (
    <svg viewBox={`0 0 ${LEBAR} 84`} className="block h-auto w-full" role="img" aria-label="Garis waktu 24 jam. Pita menunjukkan malam, pagi, siang, dan sore. Batang menunjukkan kapan dan berapa lama kegiatan yang dipilih.">
      {PITA_BAGIAN.map((p, i) => (
        <g key={i}>
          <rect x={x(p.dari)} y="6" width={x(p.sampai) - x(p.dari)} height="22" fill={WARNA_PITA[p.bagian]} stroke="#1C01A5" strokeWidth="1.2" />
          <text x={(x(p.dari) + x(p.sampai)) / 2} y="21" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1C01A5">
            {p.bagian}
          </text>
        </g>
      ))}
      {[0, 6, 12, 18, 24].map((j) => (
        <g key={j}>
          <line x1={x(j)} y1="28" x2={x(j)} y2="34" stroke="#1C01A5" strokeWidth="1.5" />
          <text x={Math.min(Math.max(x(j), 6), LEBAR - 6)} y="45" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1C01A5">
            {j}
          </text>
        </g>
      ))}
      {pilih.map((k, i) =>
        segmenKegiatan(k).map((s, n) => (
          <rect
            key={`${k.id}-${n}`}
            x={x(s.dari)}
            y={52 + i * 15}
            width={Math.max(3, x(s.sampai) - x(s.dari))}
            height="11"
            rx="2"
            fill={WARNA_PILIH[i]}
            stroke="#1C01A5"
            strokeWidth="1.2"
          />
        ))
      )}
    </svg>
  );
}

function Rincian({ k, urutan }: { k: KegiatanLab; urutan: number }) {
  const selesai = selesaiJam(k);
  return (
    <div className="space-y-1 rounded-2xl border-4 p-2 text-center" style={{ borderColor: WARNA_PILIH[urutan] }}>
      <p className="text-sm font-black text-[#1C01A5]">
        <span aria-hidden="true">{k.ikon}</span> {k.nama}
      </p>
      <div className="flex items-center justify-center gap-2">
        <div>
          <JamMuka jam={k.jam24} kelas="w-16" label={`Jam mulai ${k.nama}: ${sebutMulai(k)}`} />
          <p className="text-[11px] font-black text-[#1C01A5]">mulai</p>
        </div>
        {selesai !== null ? (
          <>
            <span className="text-lg font-black text-[#1C01A5]" aria-hidden="true">
              ➜
            </span>
            <div>
              <JamMuka jam={selesai} kelas="w-16" label={`Jam selesai ${k.nama}: pukul ${jam12Hari(selesai)}`} />
              <p className="text-[11px] font-black text-[#1C01A5]">selesai{lewatTengahMalam(k) ? " (besok)" : ""}</p>
            </div>
          </>
        ) : null}
      </div>
      <p className="text-xs font-black text-[#1C01A5]">
        {sebutMulai(k)} • lama {lamaTeks(k.menit)}
      </p>
      {selesai === null ? <p className="text-[11px] font-bold text-[#1C01A5]/70">Lamanya bukan jam penuh, jadi tidak ada jam selesai di muka jam.</p> : null}
    </div>
  );
}

export default function SimulasiLabHari({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLabHari) => void }) {
  const [l, setL] = useState(awalHari);

  const lap = useMemo(() => laporanHari(l), [l]);
  useEffect(() => {
    onKeadaan?.(lap);
  }, [onKeadaan, lap]);

  const pilih = l.pilih.map(kegiatanLab);
  const teks = kalimatHari(l);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Hariku</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ketuk satu atau dua kegiatan. Lihat kapan mulainya dan berapa lamanya di garis waktu.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan kalimat ini" onClick={() => speakGuru(eja(teks))} />
      </div>

      <div className={`${KARTU} space-y-3`}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Tampilan">
          <span className="text-xs font-black text-[#1C01A5]">Tampilkan:</span>
          <Cek aktif={l.urut} onKlik={() => setL((s) => nyalakanUrut(s, !s.urut))}>
            Urut menurut waktu
          </Cek>
        </div>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Kegiatan sehari-hari">
          {daftarTampil(l).map((k) => {
            const i = l.pilih.indexOf(k.id);
            return (
              <button
                key={k.id}
                type="button"
                aria-pressed={i >= 0}
                onClick={() => setL((s) => ketukKegiatan(s, k.id))}
                className="relative flex min-h-14 items-center gap-2 rounded-2xl border-4 bg-white px-2 py-1 text-left"
                style={{ borderColor: i >= 0 ? WARNA_PILIH[i] : "rgba(28,1,165,0.25)", backgroundColor: i >= 0 ? "#F5F3FF" : "white" }}
              >
                <span className="text-2xl" aria-hidden="true">
                  {k.ikon}
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-black text-[#1C01A5]">{k.nama}</span>
                  <span className="block text-[11px] font-bold text-[#1C01A5]/70">{sebutMulai(k)}</span>
                </span>
                {l.urut ? (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1C01A5] px-1 text-[11px] font-black text-white" aria-label={`urutan ke-${nomorUrut(k)}`}>
                    {nomorUrut(k)}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {l.urut ? <p className="text-center text-[11px] font-bold text-[#1C01A5]/70">Kegiatan yang mulai pada jam yang sama berbagi nomor, karena tidak ada yang lebih dulu.</p> : null}
      </div>

      <div className={`${KARTU} space-y-3`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis waktu 24 jam</p>
        <GarisWaktu pilih={pilih} />
        {pilih.length > 0 ? (
          <p className="text-center text-[11px] font-bold text-[#1C01A5]/70">{pilih.map((k, i) => `${NAMA_PILIH[i]}: ${k.nama}`).join(" • ")}</p>
        ) : null}
        {pilih.length > 0 ? (
          <div className={`grid gap-2 ${pilih.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
            {pilih.map((k, i) => (
              <Rincian key={k.id} k={k} urutan={i} />
            ))}
          </div>
        ) : null}
        <KalimatBesar teks={teks} />
      </div>

      <div className="flex justify-center">
        <button type="button" className={TOMBOL_BIASA} onClick={() => setL(resetHari())}>
          ↺ Reset Semua
        </button>
      </div>

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            "Coba ini. Satu, nyalakan urut menurut waktu. Kegiatan apa yang pertama dan yang terakhir? Dua, bandingkan tidur malam dengan bangun tidur. Mana yang mulai lebih dulu? Mana yang lebih lama? Tiga, bandingkan mandi pagi dengan mandi sore. Apa yang sama? Empat, pilih berolahraga. Lihat jarum pendek di jam mulai dan jam selesai."
          )
        }
        langkah={[
          "Nyalakan Urut menurut waktu. Kegiatan apa yang pertama dan yang terakhir?",
          "Bandingkan tidur malam dengan bangun tidur. Mana yang mulai lebih dulu? Mana yang lebih lama?",
          "Bandingkan mandi pagi dengan mandi sore. Apa yang sama?",
          "Pilih berolahraga. Lihat jarum pendek di jam mulai dan jam selesai.",
        ]}
      />
    </div>
  );
}
