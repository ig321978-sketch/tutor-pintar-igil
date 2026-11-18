"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalUbin,
  hitungUlang,
  kalimatUbin,
  kata,
  ketukSisi,
  lihatNama,
  mulaiLagiUbin,
  namaBentuk,
  pasangUbin,
  petunjukPasang,
  pilahUbin,
  pilihModeUbin,
  pilihUbin,
  semuaTerpasang,
  titikUbin,
  ukuranLengkung,
  type KeadaanUbin,
  type ModeUbin,
  type UbinSim,
  type Wadah,
} from "./logika";
import { MISI_PETAK, UBIN_SIM } from "./data-peta";

/**
 * Simulasi Kelas 2 Bab 3 Sub-Bab A: Petak Ubin (Misi Petak Ubin). Ubin di keranjang berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat untuk
 * satu keranjang: Hitung (sisi bertanda awal bendera, ketuk sisi berurutan berputar, lalu lihat nama), Pilah (tepi lurus ke keranjang kuning, tepi
 * lengkung ke keranjang hijau), dan Pasang (ubin ke petak papan permainan yang bentuknya tepat).
 */
const D = UBIN_SIM;
const MODE: { id: ModeUbin; nama: string; ikon: string }[] = [
  { id: "hitung", nama: "Hitung", ikon: "\u{1F522}" },
  { id: "pilah", nama: "Pilah", ikon: "\u{1F9FA}" },
  { id: "pasang", nama: "Pasang", ikon: "\u{1F9E9}" },
];
const UNGU = "#1C01A5";
const MERAH = "#DC2626";

/** Satu bentuk ubin berpusat di (x, y) dengan jari-jari r: segi banyak sebagai poligon, bentuk lengkung sebagai elips. */
function Bentuk({ u, r, x = 0, y = 0, isi, garis = UNGU, tebal = 2, putus = false, op = 1 }: { u: UbinSim; r: number; x?: number; y?: number; isi?: string; garis?: string; tebal?: number; putus?: boolean; op?: number }) {
  const t = titikUbin(u.bentuk, r);
  const umum = { fill: isi ?? "none", stroke: garis, strokeWidth: tebal, strokeDasharray: putus ? "5 3" : undefined, strokeLinejoin: "round" as const, opacity: op };
  if (t) return <polygon points={t.map((p) => `${x + p.x},${y + p.y}`).join(" ")} {...umum} />;
  const { rx, ry } = ukuranLengkung(u.bentuk, r);
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} {...umum} />;
}

/** Gambar kecil sebuah ubin (untuk keranjang dan petak). */
function Mini({ u, r = 20, isi, putus, garis }: { u: UbinSim; r?: number; isi?: string; putus?: boolean; garis?: string }) {
  return (
    <svg viewBox="0 0 60 56" className="mx-auto block h-[52px] w-[56px]" aria-hidden="true">
      <Bentuk u={u} r={r} x={30} y={28} isi={isi} putus={putus} garis={garis} tebal={putus ? 1.8 : 2} />
    </svg>
  );
}

export default function SimulasiPetakUbin({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanUbin) => void }) {
  const [k, setK] = useState<KeadaanUbin>(() => awalUbin());
  const [goyang, setGoyang] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanUbin, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const salah = (id: string, ucap: string) => {
    setGoyang(id);
    window.setTimeout(() => setGoyang(""), 480);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const u = k.pilih >= 0 ? D[k.pilih] : null;

  const pegang = (i: number) => {
    if (k.dipasang.includes(i)) return;
    const baru = pilihUbin(k, i, D);
    ubah(baru, kalimatUbin(baru, D));
  };
  const ganti = (m: ModeUbin) => ubah(pilihModeUbin(k, m), m === "hitung" ? "Hitung sisi ubin mulai dari tanda awal." : m === "pilah" ? "Pilah ubin menurut tepinya, lurus atau melengkung." : "Pasang ubin pada petak yang bentuknya tepat.");

  const ketukSisiKe = (i: number) => {
    const r = ketukSisi(k, i, D);
    if (r.ok) {
      ubah(r.k, r.selesai ? `Selesai, kembali ke tanda awal. ${besarAwal(D[k.pilih].nama)} punya ${kata(D[k.pilih].sisi)} sisi. Ketuk lihat nama.` : kata(i + 1));
      return;
    }
    if (r.perlu === "pilih") salah("sisi", "Ketuk satu ubin di keranjang dulu.");
    else if (r.perlu === "lengkung") salah("sisi", "Tepinya melengkung, jadi tidak ada sisi lurus untuk dihitung. Ini bentuk lengkung.");
    else if (r.perlu === "sudah") salah("sisi", "Sisi ubin ini sudah terhitung semua. Ketuk hitung ulang bila mau mengulang.");
    else {
      ubah(r.k);
      salah("sisi", k.langkah === 0 ? "Mulai dari sisi yang bertanda bendera, lalu hitung berputar." : `Itu melompat. Sesudah sisi ke-${kata(k.langkah)} lanjut ke sisi di sebelahnya, supaya tidak ada sisi yang terhitung dua kali.`);
    }
  };
  const besarAwal = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
  const nama = () => {
    const r = lihatNama(k, D);
    if (r.ok) ubah(r.k, `${besarAwal(D[k.pilih].nama)} termasuk ${namaBentuk(D[k.pilih])}.`);
    else salah("nama", r.perlu === "pilih" ? "Ketuk satu ubin di keranjang dulu." : "Hitung sisinya dulu dengan tanda awal, baru ubin ini bisa diberi nama.");
  };
  const pilah = (w: Wadah) => {
    const r = pilahUbin(k, w, D);
    if (r.ok) ubah(r.k, `Betul, ${D[k.pilih].nama} masuk keranjang ${w === "kuning" ? "kuning untuk tepi lurus" : "hijau untuk tepi lengkung"}.`);
    else if (r.perlu === "pilih") salah(w, "Ketuk satu ubin dulu, lalu pilih keranjangnya.");
    else {
      ubah(r.k);
      salah(w, w === "kuning" ? "Tepi ubin ini melengkung, jadi bukan segi banyak. Coba keranjang hijau." : "Tepi ubin ini lurus, jadi segi banyak. Coba keranjang kuning.");
    }
  };
  const pasang = (petak: number) => {
    const r = pasangUbin(k, petak, D);
    if (r.ok) {
      ubah(r.k, semuaTerpasang(r.k, D) ? "Semua petak terisi pas. Papan permainan siap dibuka." : `Pas! ${besarAwal(D[petak].nama)} masuk petaknya.`);
    } else if (r.perlu === "pilih") salah(`p${petak}`, "Ketuk satu ubin di keranjang dulu, lalu ketuk petaknya.");
    else if (r.perlu === "terisi") salah(`p${petak}`, "Petak ini sudah terisi. Pilih petak yang masih kosong.");
    else if (u) {
      ubah(r.k);
      salah(`p${petak}`, petunjukPasang(u, D[petak]));
    }
  };

  /* ------------------------------ Panel Hitung ------------------------------ */
  const R = 62;
  const pusat = { x: 150, y: 104 };
  const hitung = () => {
    if (!u) return <p className="rounded-xl bg-white/80 p-6 text-center text-sm font-black text-[#1C01A5]">Ketuk satu ubin di keranjang, lalu hitung sisinya.</p>;
    const t = titikUbin(u.bentuk, R);
    const selesai = k.dihitung.includes(k.pilih);
    return (
      <svg viewBox="0 0 300 208" className={`mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90 ${goyang === "sisi" ? "lm-goyang" : ""}`} aria-label={`Ubin ${u.nama}, hitung sisinya`}>
        {t ? (
          <>
            <polygon points={t.map((p) => `${pusat.x + p.x},${pusat.y + p.y}`).join(" ")} fill={u.warna} stroke="none" />
            {t.map((a, i) => {
              const b = t[(i + 1) % t.length];
              const x1 = pusat.x + a.x;
              const y1 = pusat.y + a.y;
              const x2 = pusat.x + b.x;
              const y2 = pusat.y + b.y;
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const dx = mx - pusat.x;
              const dy = my - pusat.y;
              const l = Math.hypot(dx, dy) || 1;
              const sudah = i < k.langkah;
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={sudah ? MERAH : UNGU} strokeWidth={sudah ? 5 : 3} strokeLinecap="round" />
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth={22} strokeLinecap="round" role="button" tabIndex={0} aria-label={`Sisi ${i + 1}`} style={{ cursor: "pointer" }} onClick={() => ketukSisiKe(i)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ketukSisiKe(i)} />
                  {sudah ? (
                    <text x={mx + (dx / l) * 14} y={my + (dy / l) * 14 + 4} textAnchor="middle" fontSize={13} fontWeight={900} fill={MERAH}>
                      {i + 1}
                    </text>
                  ) : null}
                  {i === 0 ? (
                    <g aria-hidden="true">
                      <line x1={mx + (dx / l) * 2} y1={my + (dy / l) * 2} x2={mx + (dx / l) * 24} y2={my + (dy / l) * 24} stroke="#78350F" strokeWidth={2} />
                      <polygon points={`${mx + (dx / l) * 24},${my + (dy / l) * 24} ${mx + (dx / l) * 24 + 12},${my + (dy / l) * 24 + 4} ${mx + (dx / l) * 24},${my + (dy / l) * 24 + 9}`} fill="#FACC15" stroke="#78350F" strokeWidth={1.2} />
                    </g>
                  ) : null}
                </g>
              );
            })}
          </>
        ) : (
          <g role="button" tabIndex={0} aria-label="Tepi melengkung" style={{ cursor: "pointer" }} onClick={() => ketukSisiKe(0)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ketukSisiKe(0)}>
            <Bentuk u={u} r={R} x={pusat.x} y={pusat.y} isi={u.warna} tebal={4} />
          </g>
        )}
        <text x={150} y={16} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={UNGU}>
          {u.jenis === "lengkung" ? "tepi melengkung: tidak ada sisi" : selesai ? "semua sisi terhitung" : "mulai dari bendera, hitung berputar"}
        </text>
        {selesai ? (
          <text x={150} y={200} textAnchor="middle" fontSize={13} fontWeight={900} fill="#15803D">
            {u.sisi} sisi
          </text>
        ) : null}
      </svg>
    );
  };

  return (
    <div className="space-y-3" data-uji="simulasi-petak-ubin">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Petak Ubin</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_PETAK}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#78350F] bg-[#FEF3C7] p-2">
        <p className="mb-1 text-center text-xs font-black text-[#78350F]">Keranjang ubin: ketuk satu ubin</p>
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
          {D.map((x, i) => {
            const terpasang = k.dipasang.includes(i);
            return (
              <button
                key={x.id}
                type="button"
                disabled={terpasang}
                onClick={() => pegang(i)}
                aria-pressed={k.pilih === i}
                aria-label={`Ubin ${x.nama}`}
                className={`rounded-xl border-4 bg-white p-0.5 text-center text-[10px] font-black leading-tight text-[#1C01A5] disabled:opacity-30 ${k.pilih === i ? "border-[#DC2626]" : "border-[#D6A15E]"}`}
              >
                <Mini u={x} isi={x.warna} />
                <span aria-hidden="true">{x.emoji}</span> {x.nama}
              </button>
            );
          })}
        </div>
      </div>

      {k.mode === "hitung" ? (
        <div className="space-y-2">
          {hitung()}
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={nama} disabled={!u}>
              {"\u{1F3F7}\u{FE0F}"} Lihat nama
            </button>
            <button type="button" className={tombol} onClick={() => ubah(hitungUlang(k), "Hitung lagi dari tanda awal.")} disabled={!u || u.jenis === "lengkung"}>
              {"\u{1F501}"} Hitung ulang
            </button>
          </div>
          {u && k.namaDilihat.includes(k.pilih) ? (
            <p className="rounded-xl border-2 border-[#15803D] bg-[#DCFCE7] px-2 py-1 text-center text-sm font-black text-[#14532D]">
              {besarAwal(u.nama)}: {namaBentuk(u)}
            </p>
          ) : null}
        </div>
      ) : null}

      {k.mode === "pilah" ? (
        <div className="space-y-2">
          {u ? (
            <div className="mx-auto w-28 rounded-xl border-2 border-[#1C01A5] bg-white/90 p-1 text-center text-xs font-black text-[#1C01A5]">
              <Mini u={u} r={22} isi={u.warna} />
              {u.nama}
            </div>
          ) : (
            <p className="text-center text-sm font-black text-[#1C01A5]">Ketuk satu ubin dulu, lalu pilih keranjangnya.</p>
          )}
          <div className="grid grid-cols-2 gap-2">
            {(["kuning", "hijau"] as Wadah[]).map((w) => {
              const isi = w === "kuning" ? k.kuning : k.hijau;
              return (
                <button
                  key={w}
                  type="button"
                  onClick={() => pilah(w)}
                  aria-label={w === "kuning" ? "Keranjang kuning, tepi lurus" : "Keranjang hijau, tepi lengkung"}
                  className={`min-h-[96px] rounded-2xl border-4 p-1.5 text-center text-xs font-black text-[#1C01A5] ${w === "kuning" ? "border-[#CA8A04] bg-[#FEF08A]" : "border-[#15803D] bg-[#BBF7D0]"} ${goyang === w ? "lm-goyang" : ""}`}
                >
                  {w === "kuning" ? "Keranjang kuning: tepi lurus (segi banyak)" : "Keranjang hijau: tepi lengkung"}
                  <span className="mt-1 flex flex-wrap justify-center gap-0.5">
                    {isi.map((i) => (
                      <span key={i} className="rounded bg-white/80 px-1">
                        {D[i].emoji}
                      </span>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {k.mode === "pasang" ? (
        <div className="rounded-2xl border-4 border-[#CA8A04] bg-[#FDE68A] p-2">
          <p className="mb-1 text-center text-xs font-black text-[#78350F]">Papan permainan di lantai taman: ketuk petak yang bentuknya tepat</p>
          <div className="grid grid-cols-4 gap-1.5">
            {D.map((x, i) => {
              const isi = k.dipasang.includes(i);
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => pasang(i)}
                  aria-label={isi ? `Petak ${kata(i + 1)} sudah terisi` : `Petak ${kata(i + 1)} kosong`}
                  className={`rounded-xl border-2 bg-[#FFFBEB] p-0.5 ${isi ? "border-[#15803D]" : "border-dashed border-[#92400E]"} ${goyang === `p${i}` ? "lm-goyang" : ""}`}
                >
                  <Mini u={x} r={21} isi={isi ? x.warna : undefined} putus={!isi} garis={isi ? UNGU : "#92400E"} />
                </button>
              );
            })}
          </div>
          {semuaTerpasang(k, D) ? <p className="mt-1 text-center text-sm font-black text-[#14532D]">Semua petak terisi pas!</p> : null}
        </div>
      ) : null}

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiUbin(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {kalimatUbin(k, D)}
      </p>
    </div>
  );
}
