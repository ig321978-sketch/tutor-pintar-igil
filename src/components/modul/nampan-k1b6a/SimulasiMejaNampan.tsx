"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  ambilSatu,
  awalNampan,
  batasPasang,
  bukaBatang,
  jawabSelisih,
  kalimatNampan,
  kata,
  loncatSatu,
  pasangSatu,
  pilihMode,
  pilihNampan,
  pilihanSelisih,
  selesaiPasang,
  sedikitBanyak,
  selisihNampan,
  siapDua,
  sorotBatang,
  sudahSama,
  tambahSatu,
  ulangLoncat,
  ulangSamakan,
  type KeadaanNampan,
  type ModeNampan,
} from "./logika";
import { MISI_NAMPAN, NAMPAN_SIM } from "./data";

/**
 * Simulasi Kelas 1 Bab 6 Sub-Bab A: Misi Pasar Malam bagian satu, Meja Dua Nampan. Nampan di meja berbeda dari Story.
 * Eksplorasi bebas tanpa skor, empat alat untuk dua nampan pilihan: Pasangkan (satu pasang tiap ketukan, lebihnya dan kurangnya terlihat,
 * lalu pilih selisihnya), Samakan (tambah ke yang sedikit atau ambil dari yang banyak), Batang (sorot kotak yang melebihi), dan Garis
 * (loncat dari bilangan kecil ke bilangan besar).
 */
const D = NAMPAN_SIM;
const MODE: { id: ModeNampan; nama: string; ikon: string }[] = [
  { id: "pasang", nama: "Pasangkan", ikon: "\u{1F91D}" },
  { id: "samakan", nama: "Samakan", ikon: "\u{2696}\u{FE0F}" },
  { id: "batang", nama: "Batang", ikon: "\u{1F4CA}" },
  { id: "garis", nama: "Garis", ikon: "\u{1F4CF}" },
];
const isiDari = (id: string | null) => D.find((x) => x.id === id)?.isi ?? 0;
const nampanDari = (id: string | null) => D.find((x) => x.id === id);

/** Garis bilangan nol sampai dua puluh dengan dua penanda dan loncatan. */
function GarisSim({ kecil, besar, loncat }: { kecil: number; besar: number; loncat: number }) {
  const x = (v: number) => 14 + v * 13.6;
  const y = 52;
  const posisi = kecil + loncat;
  return (
    <svg viewBox="0 0 300 76" className="mx-auto block w-full max-w-[420px]" aria-label="Garis bilangan nol sampai dua puluh">
      <line x1={x(0) - 6} x2={x(20) + 6} y1={y} y2={y} stroke="#1C01A5" strokeWidth={1.8} />
      {Array.from({ length: 21 }, (_, v) => (
        <g key={v}>
          <line x1={x(v)} x2={x(v)} y1={y - 4} y2={y + 4} stroke="#1C01A5" strokeWidth={1.2} />
          <text x={x(v)} y={y + 15} textAnchor="middle" fontSize={7.4} fontWeight={800} fill="#1C01A5">
            {v}
          </text>
        </g>
      ))}
      {Array.from({ length: loncat }, (_, j) => (
        <path key={j} d={`M ${x(kecil + j)} ${y - 4} Q ${(x(kecil + j) + x(kecil + j + 1)) / 2} ${y - 28} ${x(kecil + j + 1)} ${y - 4}`} fill="none" stroke="#15803D" strokeWidth={1.8} />
      ))}
      <circle cx={x(kecil)} cy={y} r={4.8} fill="#2563EB" stroke="#FFFFFF" strokeWidth={1.2} />
      <circle cx={x(besar)} cy={y} r={4.8} fill="#DC2626" stroke="#FFFFFF" strokeWidth={1.2} />
      <circle cx={x(posisi)} cy={y - 10} r={4} fill="#15803D" stroke="#FFFFFF" strokeWidth={1} />
    </svg>
  );
}

export default function SimulasiMejaNampan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanNampan) => void }) {
  const [k, setK] = useState<KeadaanNampan>(() => awalNampan());
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanNampan, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`;
  const dua = siapDua(k);
  const s = dua ? selisihNampan(k, D) : 0;
  const sb = sedikitBanyak(k, D);
  const batas = batasPasang(k, D);
  const kiri = nampanDari(k.kiri);
  const kanan = nampanDari(k.kanan);
  const baris = dua ? [kiri, kanan] : [];

  const ketukNampan = (id: string) => {
    const baru = pilihNampan(k, id);
    ubah(baru, kalimatNampan(baru, D));
  };
  const jawab = (n: number) => {
    const r = jawabSelisih(k, D, n);
    if (r.benar) ubah(r.k, `Betul! Selisihnya ${kata(n)}.`);
    else speakGuru("Belum tepat. Hitung lagi benda yang tidak punya pasangan.");
  };

  /** Satu baris benda: `n` benda dasar, `tambah` benda baru (hijau), dan `ambil` benda yang diambil (pudar). */
  const barisBenda = ({ id, tambah = 0, ambil = 0, pasang = -1, sisaDari = -1 }: { id: string; tambah?: number; ambil?: number; pasang?: number; sisaDari?: number }) => {
    const nm = nampanDari(id);
    if (!nm) return null;
    const total = nm.isi + tambah;
    return (
      <div className="flex items-start gap-1">
        <span className="w-14 shrink-0 text-xs font-black text-[#1C01A5]">{nm.nama}</span>
        <span className="flex flex-wrap gap-[2px]" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => {
            const baru = i >= nm.isi;
            const diambil = !baru && i >= nm.isi - ambil;
            const sisa = sisaDari >= 0 && i >= sisaDari;
            return (
              <span key={i} className={`flex h-5 w-5 items-center justify-center rounded text-[12px] ${baru ? "bg-[#BBF7D0]" : i < pasang ? "bg-[#BBF7D0]" : sisa ? "bg-[#FEF3C7] ring-2 ring-[#B45309]" : "bg-[#F1F5F9]"} ${diambil ? "opacity-25" : ""}`}>
                {nm.ikon}
              </span>
            );
          })}
        </span>
      </div>
    );
  };
  const barisBatang = ({ id, sorot }: { id: string; sorot: boolean }) => {
    const nm = nampanDari(id);
    if (!nm) return null;
    const min = Math.min(isiDari(k.kiri), isiDari(k.kanan));
    return (
      <div className="flex items-center gap-1">
        <span className="w-14 shrink-0 text-xs font-black text-[#1C01A5]">{nm.nama}</span>
        <span className="flex flex-wrap" aria-hidden="true">
          {Array.from({ length: nm.isi }, (_, i) => (
            <span key={i} className={`h-5 w-3.5 border border-[#1C01A5] ${sorot && i >= min ? "bg-[#FACC15]" : "bg-white"}`} />
          ))}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_NAMPAN}</p>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih alat meja nampan">
        {MODE.map((m) => (
          <button key={m.id} type="button" aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)} onClick={() => ubah(pilihMode(k, m.id), kalimatNampan(pilihMode(k, m.id), D))}>
            {m.ikon} {m.nama}
          </button>
        ))}
      </div>

      {/* Meja: nampan-nampan berjajar */}
      <div className="rounded-2xl border-4 border-[#B91C1C] p-2" style={{ background: "repeating-linear-gradient(90deg,#FEE2E2 0 18px,#FFFFFF 18px 36px)" }}>
        <p className="mb-1 text-center text-xs font-black text-[#B91C1C]">{"\u{1F36A}"} Nampan di meja (ketuk dua nampan)</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {D.map((n) => {
            const dipilih = k.kiri === n.id || k.kanan === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => ketukNampan(n.id)}
                aria-pressed={dipilih}
                aria-label={`nampan ${n.nama}`}
                className={`flex min-h-[96px] flex-col items-center justify-between rounded-xl border-4 p-1 ${dipilih ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#6B7280] bg-[#E5E7EB]"}`}
              >
                <span className="text-xs font-black text-[#1C01A5]">{n.nama}</span>
                <span className="grid grid-cols-6 gap-0 text-[11px] leading-[14px]" aria-hidden="true">
                  {Array.from({ length: n.isi }, (_, i) => (
                    <span key={i}>{n.ikon}</span>
                  ))}
                </span>
                <span className="text-[10px] font-black text-[#15803D]">{k.kiri === n.id ? "kiri" : k.kanan === n.id ? "kanan" : " "}</span>
              </button>
            );
          })}
        </div>
      </div>

      {k.mode === "pasang" ? (
        <div className="rounded-2xl border-4 border-[#15803D] bg-white p-2 text-center">
          <p className="text-sm font-black text-[#15803D]">{"\u{1F91D}"} Pasangkan satu-satu</p>
          {dua ? (
            <div className="mt-1 space-y-1 text-left">
              {baris.map((n) => (n ? <React.Fragment key={n.id}>{barisBenda({ id: n.id, pasang: k.dipasang, sisaDari: selesaiPasang(k, D) ? batas : -1 })}</React.Fragment> : null))}
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                <button type="button" className={tombol} disabled={k.dipasang >= batas} onClick={() => {
                  const baru = pasangSatu(k, D);
                  ubah(baru, baru.dipasang >= batas ? kalimatNampan(baru, D) : kata(baru.dipasang));
                }}>
                  {"\u{1F517}"} Pasangkan satu
                </button>
              </div>
              <p className="text-center text-xs font-bold text-[#1C01A5]/80">pasangan: {k.dipasang} · {k.dipasang >= batas ? (s ? "sisa terlihat, pilih selisihnya" : "tanpa sisa, sama banyak") : "belum selesai"}</p>
              {selesaiPasang(k, D) && s > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih selisihnya">
                  <span className="text-xs font-black text-[#15803D]">Selisihnya:</span>
                  {pilihanSelisih(s).map((n) => (
                    <button key={n} type="button" className={tombol} onClick={() => jawab(n)}>
                      {n}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-xs font-bold text-[#1C01A5]/80">Ketuk dua nampan.</p>
          )}
        </div>
      ) : null}

      {k.mode === "samakan" ? (
        <div className="rounded-2xl border-4 border-[#CA8A04] bg-[#FFFBEB] p-2 text-center">
          <p className="text-sm font-black text-[#854D0E]">{"\u{2696}\u{FE0F}"} Samakan banyaknya</p>
          {dua && s > 0 && sb ? (
            <div className="mt-1 space-y-1 text-left">
              {barisBenda({ id: sb.sedikit, tambah: k.tambah })}
              {barisBenda({ id: sb.banyak, ambil: k.ambil })}
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                <button type="button" className={tombol} disabled={sudahSama(k, D)} onClick={() => {
                  const baru = tambahSatu(k, D);
                  ubah(baru, sudahSama(baru, D) ? kalimatNampan(baru, D) : kata(baru.tambah));
                }}>
                  {"\u{2795}"} Tambah satu
                </button>
                <button type="button" className={tombol} disabled={sudahSama(k, D)} onClick={() => {
                  const baru = ambilSatu(k, D);
                  ubah(baru, sudahSama(baru, D) ? kalimatNampan(baru, D) : kata(baru.ambil));
                }}>
                  {"\u{2796}"} Ambil satu
                </button>
                <button type="button" className={tombol} onClick={() => ubah(ulangSamakan(k), "Diulang dari awal.")}>
                  {"\u{1F504}"} Ulang
                </button>
              </div>
              <p className="text-center text-xs font-bold text-[#1C01A5]/80">{sudahSama(k, D) ? "sama banyak!" : `ditambah: ${k.tambah} · diambil: ${k.ambil}`}</p>
            </div>
          ) : (
            <p className="text-xs font-bold text-[#1C01A5]/80">{dua ? "Kedua nampan sama banyak. Pilih dua nampan yang isinya beda." : "Ketuk dua nampan yang isinya beda."}</p>
          )}
        </div>
      ) : null}

      {k.mode === "batang" ? (
        <div className="rounded-2xl border-4 border-[#1D4ED8] bg-[#EFF6FF] p-2 text-center">
          <p className="text-sm font-black text-[#1D4ED8]">{"\u{1F4CA}"} Batang kotak</p>
          {dua && s > 0 ? (
            <div className="mt-1 space-y-1 text-left">
              {baris.map((n) => (n ? <React.Fragment key={n.id}>{barisBatang({ id: n.id, sorot: k.batangSorot })}</React.Fragment> : null))}
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                <button type="button" className={tombol} disabled={k.batangSorot} onClick={() => ubah(sorotBatang(k, D), `Kotak yang melebihi ada ${kata(s)}. Itu selisihnya.`)}>
                  {"\u{1F526}"} Sorot selisih
                </button>
                <button type="button" className={tombol} disabled={!k.batangSorot} onClick={() => ubah(bukaBatang(k), "Sorotan dilepas.")}>
                  {"\u{1F504}"} Lepas sorot
                </button>
              </div>
              <p className="text-center text-xs font-bold text-[#1C01A5]/80">{k.batangSorot ? "kotak emas: yang melebihi batang pendek" : "tekan Sorot selisih"}</p>
            </div>
          ) : (
            <p className="text-xs font-bold text-[#1C01A5]/80">{dua ? "Kedua nampan sama banyak. Pilih dua nampan yang isinya beda." : "Ketuk dua nampan yang isinya beda."}</p>
          )}
        </div>
      ) : null}

      {k.mode === "garis" ? (
        <div className="rounded-2xl border-4 border-[#BE185D] bg-[#FDF2F8] p-2 text-center">
          <p className="text-sm font-black text-[#BE185D]">{"\u{1F4CF}"} Garis bilangan</p>
          {dua && s > 0 && sb ? (
            <div className="mt-1 space-y-1">
              <GarisSim kecil={isiDari(sb.sedikit)} besar={isiDari(sb.banyak)} loncat={k.loncat} />
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                <button type="button" className={tombol} disabled={k.loncat >= s} onClick={() => {
                  const baru = loncatSatu(k, D);
                  ubah(baru, baru.loncat >= s ? kalimatNampan(baru, D) : kata(baru.loncat));
                }}>
                  {"\u{1F438}"} Loncat
                </button>
                <button type="button" className={tombol} onClick={() => ubah(ulangLoncat(k), "Mulai lagi dari bilangan kecil.")}>
                  {"\u{1F504}"} Ulang loncat
                </button>
              </div>
              <p className="text-xs font-bold text-[#1C01A5]/80">loncatan: {k.loncat}</p>
            </div>
          ) : (
            <p className="text-xs font-bold text-[#1C01A5]/80">{dua ? "Kedua nampan sama banyak. Pilih dua nampan yang isinya beda." : "Ketuk dua nampan yang isinya beda."}</p>
          )}
        </div>
      ) : null}

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatNampan(k, D)}
      </p>
    </div>
  );
}
