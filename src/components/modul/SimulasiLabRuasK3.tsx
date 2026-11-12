"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { Cek, CobaIni, KARTU, Pilihan, TOMBOL_BIASA, TOMBOL_UTAMA } from "./simulasi-bersama";
import { KalimatBesar } from "./komponen-lab";
import Atur4 from "./atur-k3b3";
import { ejaK3B4 } from "./eja-k3b4";
import {
  BANGUN_RUAS,
  KURVA_DUA_TITIK,
  MAKS_PJG,
  PANJANG_PENGGARIS,
  RUAS_UKUR,
  awalRuas,
  cariBangunRuas,
  cariRuas,
  keadaanRuas,
  langkahRuas,
  teksCmMm,
  ucapRuas,
  uraianUkuran,
  type JenisGaris,
  type KeadaanRuas,
} from "./lab-ruas-k3b4";

/* ------------------------------------------------------------------------ */
/* Simulasi (K3B4 Sub-Bab A): Lab Ruas Garis. Satu alat, tiga tampilan.         */
/*  Jenis : sinar garis, garis, ruas garis, dan dua titik (satu ruas, banyak kurva). */
/*  Ukur  : ruas garis di atas penggaris bermilimeter, mulai dari angka 0.        */
/*  Sisi  : tandai ruas garis pembatas bangun datar.                              */
/* Logika: lab-ruas-k3b4.ts. Gambar hanya garis, titik, dan angka.                */
/* ------------------------------------------------------------------------ */

const UNGU = "#1C01A5";
const CATATAN = [
  "Perpanjang sinar garis ke kiri dan ke kanan. Apa kata lab? Lalu coba pada garis dan ruas garis.",
  "Hubungkan dua titik P dan Q dengan ruas garis lurus. Berapa kurva yang bisa kamu gambar?",
  "Ukur MN sebelum digeser ke angka 0, lalu sesudahnya. Apa bedanya?",
  "Tandai semua sisi segitiga, lalu segienam. Apa yang sama pada banyak sisi dan banyak sudut titik?",
];

const NAMA_JENIS: Record<JenisGaris, string> = { sinar: "Sinar garis", garis: "Garis", ruas: "Ruas garis" };
const WARNA_KURVA: Record<string, string> = { busur: "#16A34A", s: "#EA580C", gelombang: "#7C3AED", lengkung: "#0891B2" };
const JALUR_KURVA: Record<string, string> = {
  busur: "M40 60 Q150 -10 260 60",
  s: "M40 60 C100 0 200 120 260 60",
  gelombang: "M40 60 Q80 20 120 60 T200 60 T260 60",
  lengkung: "M40 60 Q150 130 260 60",
};

function GambarJenis({ jenis, kiri, kanan }: { jenis: JenisGaris; kiri: number; kanan: number }) {
  const x1 = 90 - 30 * kiri;
  const x2 = 210 + 30 * kanan;
  return (
    <svg viewBox="0 0 300 70" className="mx-auto block h-20 w-full max-w-md" role="img" aria-label={`${NAMA_JENIS[jenis]} diperpanjang ${kiri} langkah ke kiri dan ${kanan} langkah ke kanan`}>
      <defs>
        <marker id="panah-k3b4" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="#DC2626" />
        </marker>
      </defs>
      {jenis === "ruas" ? (
        <>
          <line x1="90" y1="35" x2="210" y2="35" stroke={UNGU} strokeWidth="5" strokeLinecap="round" />
          <circle cx="90" cy="35" r="7" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
          <circle cx="210" cy="35" r="7" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
        </>
      ) : jenis === "sinar" ? (
        <>
          <line x1="90" y1="35" x2={x2 - 4} y2="35" stroke={UNGU} strokeWidth="5" markerEnd="url(#panah-k3b4)" />
          <circle cx="90" cy="35" r="7" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
          {kanan > 0 ? <line x1="210" y1="35" x2={x2 - 4} y2="35" stroke="#16A34A" strokeWidth="5" strokeDasharray="6 4" /> : null}
        </>
      ) : (
        <>
          <line x1={x1 + 4} y1="35" x2={x2 - 4} y2="35" stroke={UNGU} strokeWidth="5" markerStart="url(#panah-k3b4)" markerEnd="url(#panah-k3b4)" />
          {kiri > 0 ? <line x1={x1 + 4} y1="35" x2="90" y2="35" stroke="#16A34A" strokeWidth="5" strokeDasharray="6 4" /> : null}
          {kanan > 0 ? <line x1="210" y1="35" x2={x2 - 4} y2="35" stroke="#16A34A" strokeWidth="5" strokeDasharray="6 4" /> : null}
        </>
      )}
    </svg>
  );
}

function DuaTitik({ kurva, lurus }: { kurva: string[]; lurus: boolean }) {
  return (
    <svg viewBox="0 0 300 120" className="mx-auto block h-32 w-full max-w-md" role="img" aria-label={`Dua titik P dan Q dengan ${lurus ? "satu ruas garis lurus dan " : ""}${kurva.length} kurva`}>
      {kurva.map((id) => (
        <path key={id} d={JALUR_KURVA[id]} fill="none" stroke={WARNA_KURVA[id]} strokeWidth="4" strokeLinecap="round" />
      ))}
      {lurus ? <line x1="40" y1="60" x2="260" y2="60" stroke={UNGU} strokeWidth="5" strokeLinecap="round" /> : null}
      {[
        { x: 40, n: "P" },
        { x: 260, n: "Q" },
      ].map((t) => (
        <g key={t.n}>
          <circle cx={t.x} cy="60" r="7" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
          <text x={t.x} y="88" textAnchor="middle" fontSize="15" fontWeight="900" fill={UNGU}>
            {t.n}
          </text>
        </g>
      ))}
    </svg>
  );
}

function Penggaris({ ruas, awal, tampilBaca }: { ruas: string; awal: number; tampilBaca: boolean }) {
  const r = cariRuas(ruas);
  const sk = 4;
  const kiri = 16;
  const x = (mm: number) => kiri + mm * sk;
  const lebar = kiri * 2 + PANJANG_PENGGARIS * sk;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${lebar} 110`} style={{ minWidth: 620 }} className="block h-28 w-full" role="img" aria-label={`Penggaris bermilimeter dengan ruas ${r.nama}, titik ${r.nama[0]} di ${teksCmMm(awal)}`}>
        <line x1={x(awal)} y1="26" x2={x(awal + r.mm)} y2="26" stroke={UNGU} strokeWidth="5" strokeLinecap="round" />
        {[
          { mm: awal, n: r.nama[0] },
          { mm: awal + r.mm, n: r.nama[1] },
        ].map((t) => (
          <g key={t.n}>
            <circle cx={x(t.mm)} cy="26" r="6" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
            <text x={x(t.mm)} y="14" textAnchor="middle" fontSize="13" fontWeight="900" fill={UNGU}>
              {t.n}
            </text>
          </g>
        ))}
        {tampilBaca ? <line x1={x(r.mm)} y1="32" x2={x(r.mm)} y2="56" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 2" /> : null}
        <rect x={kiri - 6} y="56" width={PANJANG_PENGGARIS * sk + 12} height="48" rx="6" fill="#DBEAFE" stroke={UNGU} strokeWidth="3" />
        {Array.from({ length: PANJANG_PENGGARIS + 1 }, (_, mm) => mm).map((mm) => {
          const cm = mm % 10 === 0;
          const lima = mm % 5 === 0;
          return (
            <g key={mm}>
              <line x1={x(mm)} y1="56" x2={x(mm)} y2={cm ? 80 : lima ? 72 : 66} stroke={UNGU} strokeWidth={cm ? 2 : 1} />
              {cm ? (
                <text x={x(mm)} y="98" textAnchor="middle" fontSize="11" fontWeight="900" fill={UNGU}>
                  {mm / 10}
                </text>
              ) : null}
            </g>
          );
        })}
        <line x1={x(0)} y1="14" x2={x(0)} y2="56" stroke="#16A34A" strokeWidth="2" strokeDasharray="4 3" />
      </svg>
    </div>
  );
}

function GambarBangun({ id, tandai, onTandai }: { id: string; tandai: boolean[]; onTandai: (i: number) => void }) {
  const b = cariBangunRuas(id);
  const n = b.huruf.length;
  const cx = 110;
  const cy = 100;
  const r = n === 3 ? 78 : 72;
  const titik = b.huruf.map((_, i) => {
    const a = (-90 + (360 / n) * i + (n === 4 ? 45 : 0)) * (Math.PI / 180);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  });
  return (
    <svg viewBox="0 0 220 200" className="mx-auto block h-52 w-full max-w-xs" role="group" aria-label={`${b.nama}, ${tandai.filter(Boolean).length} dari ${n} sisi ditandai`}>
      {b.sisi.map((nama, i) => {
        const [x1, y1] = titik[i];
        const [x2, y2] = titik[(i + 1) % n];
        return (
          <g
            key={nama}
            role="button"
            tabIndex={0}
            aria-label={`Sisi ${nama}${tandai[i] ? ", sudah ditandai" : ""}`}
            className="cursor-pointer"
            onClick={() => onTandai(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onTandai(i);
              }
            }}
          >
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth="22" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={tandai[i] ? "#DC2626" : UNGU} strokeWidth={tandai[i] ? 7 : 4} strokeLinecap="round" />
            {tandai[i] ? (
              <text x={(x1 + x2) / 2 + (((x1 + x2) / 2 - cx) * 0.22)} y={(y1 + y2) / 2 + (((y1 + y2) / 2 - cy) * 0.22) + 4} textAnchor="middle" fontSize="12" fontWeight="900" fill="#DC2626">
                {nama}
              </text>
            ) : null}
          </g>
        );
      })}
      {titik.map(([x, y], i) => (
        <g key={b.huruf[i]}>
          <circle cx={x} cy={y} r="6" fill="#FFE566" stroke={UNGU} strokeWidth="3" />
          <text x={x + (x - cx) * 0.18} y={y + (y - cy) * 0.18 + 4} textAnchor="middle" fontSize="13" fontWeight="900" fill={UNGU}>
            {b.huruf[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function SimulasiLabRuasK3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanRuas) => void }) {
  const [x, kirim] = useReducer(langkahRuas, undefined, awalRuas);
  const [lihat, setLihat] = useState<"jenis" | "ukur" | "sisi">("jenis");

  useEffect(() => {
    onKeadaan?.(keadaanRuas(x));
  }, [onKeadaan, x]);

  const r = cariRuas(x.ruas);
  const b = cariBangunRuas(x.bangun);
  const ditandai = x.tandai.filter(Boolean).length;
  const galat = x.pernahSalah && x.hasil === "" && x.pesan.includes("bukan");
  const gayaPesan = (pesan: string, buruk = false) => (pesan ? (buruk ? "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]" : "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]") : "border-[#1C01A5]/30 bg-[#F5F3FF] text-[#1C01A5]");
  const ucap = lihat === "ukur" ? ucapRuas(x) : lihat === "sisi" ? `${b.nama}. ${ditandai} dari ${b.sisi.length} sisi ditandai. ${b.nama.split(" ")[0]} memiliki ${b.sisi.length} sisi.` : x.pesan || "Sinar garis, garis, dan ruas garis berbeda. Perpanjang untuk melihat bedanya.";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Ruas Garis</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Kenali sinar garis, garis, dan ruas garis. Ukur ruas garis dari angka 0. Tandai sisi bangun datar.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK3B4(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "jenis"} onKlik={() => setLihat("jenis")}>
          📍 Jenis
        </Pilihan>
        <Pilihan aktif={lihat === "ukur"} onKlik={() => setLihat("ukur")}>
          📏 Ukur
        </Pilihan>
        <Pilihan aktif={lihat === "sisi"} onKlik={() => setLihat("sisi")}>
          🔺 Sisi
        </Pilihan>
      </div>

      {lihat === "jenis" ? (
        <>
          <div className={`${KARTU} space-y-3`}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih jenis garis">
              {(["sinar", "garis", "ruas"] as JenisGaris[]).map((j) => (
                <Pilihan key={j} aktif={x.jenis === j} onKlik={() => kirim({ t: "JENIS", jenis: j })}>
                  {NAMA_JENIS[j]}
                </Pilihan>
              ))}
            </div>
            <GambarJenis jenis={x.jenis} kiri={x.pjgKiri} kanan={x.pjgKanan} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "PERPANJANG", arah: "kiri" })}>
                ◀ Perpanjang ke kiri
              </button>
              <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "PERPANJANG", arah: "kanan" })}>
                Perpanjang ke kanan ▶
              </button>
            </div>
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gayaPesan(x.pesan, /tidak bisa|ditolak|Ke arah pangkal/.test(x.pesan))}`}>
              {x.pesan ? x.pesan : `🔧 ${x.jenis === "sinar" ? "Sinar garis berpangkal di satu titik (bulat kuning)." : x.jenis === "garis" ? "Garis punya panah di kedua arah: tidak punya ujung." : "Ruas garis punya dua titik ujung dan panjang tetap."} Maksimal ${MAKS_PJG} langkah.`}
            </p>
          </div>
          <div className={`${KARTU} space-y-3`}>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Dua titik P dan Q</p>
            <DuaTitik kurva={x.kurva} lurus={x.ruasLurus} />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih garis penghubung">
              <Cek aktif={x.ruasLurus} onKlik={() => kirim({ t: "RUAS_LURUS" })}>
                Ruas garis lurus
              </Cek>
              {KURVA_DUA_TITIK.map((k) => (
                <Cek key={k.id} aktif={x.kurva.includes(k.id)} onKlik={() => kirim({ t: "KURVA", id: k.id })}>
                  Kurva: {k.nama}
                </Cek>
              ))}
            </div>
            <p className="text-sm font-bold text-[#1C01A5]">
              {x.ruasLurus ? "Ruas garis lurus: hanya 1." : "Ruas garis lurus belum digambar."} Kurva digambar: {x.kurva.length}. {x.kurva.length >= 2 ? "Kurva bisa banyak sekali, tak terhingga." : "Coba gambar lebih dari satu kurva."}
            </p>
          </div>
        </>
      ) : null}

      {lihat === "ukur" ? (
        <>
          <div className={`${KARTU} space-y-3`}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih ruas garis">
              {RUAS_UKUR.map((o) => (
                <Pilihan key={o.id} aktif={x.ruas === o.id} onKlik={() => kirim({ t: "RUAS", id: o.id })}>
                  {o.nama}
                </Pilihan>
              ))}
            </div>
            <Penggaris ruas={x.ruas} awal={x.awal} tampilBaca={x.hasil !== ""} />
            <Atur4 nama={`Titik ${r.nama[0]} (mm)`} nilai={x.awal} warna="#BFDBFE" onUbah={(d) => kirim({ t: "GESER", d })} satuan="milimeter" />
            <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gayaPesan(x.pesan, galat)}`}>
              {x.hasil ? `✅ ${x.hasil}. ` : "🔧 "}
              {x.pesan || (x.awal === 0 ? `Titik ${r.nama[0]} sudah di angka 0. Tekan Baca panjang.` : `Titik ${r.nama[0]} ada di ${teksCmMm(x.awal)}, belum di nol. Geser ke kiri.`)}
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className={TOMBOL_UTAMA} onClick={() => kirim({ t: "BACA" })}>
                🔍 Baca panjang
              </button>
              <Cek aktif={x.tampil.mm} onKlik={() => kirim({ t: "TOGGLE", rep: "mm" })}>
                Dalam mm
              </Cek>
              <Cek aktif={x.tampil.desimal} onKlik={() => kirim({ t: "TOGGLE", rep: "desimal" })}>
                cm desimal
              </Cek>
            </div>
            {x.hasil ? <KalimatBesar teks={`${r.nama} = ${uraianUkuran(r.mm, x.tampil)}`} warna="bg-[#E8F7EE]" /> : null}
            <p className="text-xs font-bold text-[#1C01A5]/70">Satu sentimeter sama dengan 10 milimeter. 5 mm sama dengan 0,5 cm.</p>
          </div>
        </>
      ) : null}

      {lihat === "sisi" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih bangun datar">
            {BANGUN_RUAS.map((o) => (
              <Pilihan key={o.id} aktif={x.bangun === o.id} onKlik={() => kirim({ t: "BANGUN", id: o.id })}>
                {o.nama.split(" ")[0]}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{b.nama}. Ketuk tiap sisi untuk menandainya.</p>
          <GambarBangun id={x.bangun} tandai={x.tandai} onTandai={(i) => kirim({ t: "TANDAI", i })} />
          <p role="status" className={`rounded-2xl border-4 px-3 py-1.5 text-center text-sm font-black ${gayaPesan(x.pesan)}`}>
            {x.pesan ? `✅ ${x.pesan}` : `🔧 Sisi ditandai: ${ditandai} dari ${b.sisi.length}. Ruas garis pembatas bangun dinamakan sisi.`}
          </p>
          <button type="button" className={TOMBOL_BIASA} onClick={() => kirim({ t: "KOSONG_SISI" })}>
            🧹 Hapus tanda
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("jenis");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${["Satu", "Dua", "Tiga", "Empat"][i]}, ${ejaK3B4(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
