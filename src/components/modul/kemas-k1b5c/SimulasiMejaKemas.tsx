"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalKemas,
  banyakTepat,
  geserTabel,
  ikatKaret,
  kalimatKemas,
  kalimatTempat,
  kata,
  kembalikanSatu,
  kumpulSatu,
  lepasDiMeja,
  lepasIkat,
  nyalakanKalimat,
  pilihBarang,
  sudahRapi,
  tabelTepat,
  type KeadaanKemas,
  type Tempat2,
} from "./logika";
import { BARANG_SIM, EMOJI, WARNA_BENDA } from "./data";
import { BAKI_SATUAN, IKATAN, letakKumpul } from "./periksa";

/**
 * Simulasi Kelas 1 Bab 5 Sub-Bab C: Misi Lapak Ikan bagian satu, Meja Kemas. Eksplorasi bebas tanpa skor: pilih barang, kumpulkan sepuluh
 * dari meja lalu ikat dengan karet (satu puluhan), sisanya satuan; lepas ikatan bila ingin; isi tabel puluhan dan satuan; nyalakan kalimat.
 * Barang dan banyaknya berbeda dari Story.
 */
export default function SimulasiMejaKemas({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKemas) => void }) {
  const [k, setK] = useState<KeadaanKemas>(() => awalKemas(BARANG_SIM));
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const x = BARANG_SIM.find((y) => y.id === k.pilih) ?? BARANG_SIM[0];
  const ik = k.ikat[x.id];
  const kp = k.kumpul[x.id];
  const meja = lepasDiMeja(k, BARANG_SIM);
  const rapi = sudahRapi(k, BARANG_SIM);
  const [isi, garis] = WARNA_BENDA[x.jenis] ?? ["#BFDBFE", "#1D4ED8"];
  const ubah = (baru: KeadaanKemas, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const ambil = () => {
    if (kp >= 10) {
      speakGuru("Sudah sepuluh. Ikat dulu dengan karet.");
      return;
    }
    if (meja === 0) {
      speakGuru("Meja sudah kosong.");
      return;
    }
    ubah(kumpulSatu(k, BARANG_SIM), kp + 1 === 10 ? "Sepuluh! Sekarang ikat dengan karet." : kata(kp + 1));
  };
  const ikat = () => {
    if (kp !== 10) {
      speakGuru(`Baru ${kata(kp)}. Satu ikat harus tepat sepuluh.`);
      return;
    }
    ubah(ikatKaret(k), `Diikat! Sekarang ada ${kata(ik + 1)} puluhan.`);
  };
  const lepas = () => ubah(lepasIkat(k), ik > 0 ? "Ikatan dilepas. Sepuluh barang kembali lepas di meja." : "Belum ada ikatan.");
  const kembali = () => ubah(kembalikanSatu(k), kp > 0 ? `Satu kembali ke meja. Terkumpul ${kata(kp - 1)}.` : "Kumpulan masih kosong.");
  const tabel = (kolom: Tempat2, d: 1 | -1) => {
    const baru = geserTabel(k, kolom, d);
    ubah(baru, `${kata(baru[kolom][x.id] ?? 0)} ${kolom}`);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const pul = k.puluhan[x.id];
  const sat = k.satuan[x.id];
  const tepat = tabelTepat(k, BARANG_SIM);
  /** Barang lepas di meja: baris di atas papan (paling banyak dua puluh). */
  const letakMejaSim = (i: number) => ({ x: 14 + (i % 10) * 28.5, y: 22 + Math.floor(i / 10) * 26 });
  const satuanAkhir = rapi ? meja + kp : 0;
  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">
        Meja kemas. Pilih barang, kumpulkan sepuluh lalu ikat dengan karet, sisanya satuan. Isi tabel puluhan dan satuan.
      </p>
      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih barang">
        {BARANG_SIM.map((y) => (
          <button
            key={y.id}
            type="button"
            aria-pressed={k.pilih === y.id}
            onClick={() => ubah(pilihBarang(k, y.id), kalimatKemas(pilihBarang(k, y.id), BARANG_SIM))}
            className={`min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${k.pilih === y.id ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`}
          >
            {EMOJI[y.jenis]} {y.nama}
            {tabelTepat(k, BARANG_SIM, y.id) ? " \u{2705}" : ""}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border-4 border-[#78350F] p-2" style={{ background: "repeating-linear-gradient(90deg,#D6A06A 0 26px,#C68B52 26px 28px)" }}>
        <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[440px] rounded-xl bg-white/50" aria-label={`Meja kemas ${x.nama}`}>
          {Array.from({ length: meja }, (_, i) => {
            const t = letakMejaSim(i);
            return (
              <g key={`m${i}`} role="button" tabIndex={0} aria-label={`${x.nama} lepas, ketuk untuk dikumpulkan`} onClick={ambil} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && ambil()} style={{ cursor: "pointer" }}>
                <circle cx={t.x} cy={t.y} r={11} fill={isi} stroke={garis} strokeWidth={1.3} />
                <text x={t.x} y={t.y + 4.5} textAnchor="middle" fontSize={13}>
                  {EMOJI[x.jenis]}
                </text>
              </g>
            );
          })}
          {/* Kumpulan isi sepuluh dan karet */}
          <rect x={IKATAN.x} y={IKATAN.y - 30} width={IKATAN.w} height={IKATAN.h + 10} rx={8} fill={kp === 10 ? "#FEF3C7" : "#FFFFFF"} stroke="#B45309" strokeWidth={2} strokeDasharray={kp === 10 ? "0" : "5 4"} />
          <text x={IKATAN.x + IKATAN.w / 2} y={IKATAN.y - 16} textAnchor="middle" fontSize={9} fontWeight={900} fill="#78350F">
            kumpulan: {kp} dari 10
          </text>
          {Array.from({ length: kp }, (_, j) => {
            const t = letakKumpul(j);
            return (
              <g key={`k${j}`}>
                <circle cx={t.x} cy={t.y - 22} r={10} fill={isi} stroke={garis} strokeWidth={1.2} />
                <text x={t.x} y={t.y - 18} textAnchor="middle" fontSize={11}>
                  {EMOJI[x.jenis]}
                </text>
              </g>
            );
          })}
          {/* Ikatan karet (puluhan) */}
          <rect x={BAKI_SATUAN.x} y={BAKI_SATUAN.y - 30} width={BAKI_SATUAN.w} height={BAKI_SATUAN.h + 10} rx={8} fill="#ECFDF5" stroke="#15803D" strokeWidth={2} />
          <text x={BAKI_SATUAN.x + BAKI_SATUAN.w / 2} y={BAKI_SATUAN.y - 16} textAnchor="middle" fontSize={9} fontWeight={900} fill="#14532D">
            ikatan karet: {ik}
          </text>
          {Array.from({ length: ik }, (_, i) => (
            <g key={`i${i}`} transform={`translate(${BAKI_SATUAN.x + 10 + i * 64} ${BAKI_SATUAN.y - 2})`} aria-label="satu ikat isi sepuluh">
              <rect width={58} height={44} rx={8} fill={isi} stroke={garis} strokeWidth={1.4} />
              {Array.from({ length: 10 }, (_, j) => (
                <text key={j} x={7 + (j % 5) * 11} y={16 + Math.floor(j / 5) * 18} textAnchor="middle" fontSize={9}>
                  {EMOJI[x.jenis]}
                </text>
              ))}
              <rect x={27} y={-2} width={4} height={48} rx={2} fill="#DC2626" />
              <text x={29} y={56} textAnchor="middle" fontSize={8} fontWeight={900} fill="#14532D">
                sepuluh
              </text>
            </g>
          ))}
        </svg>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <button type="button" className={tombol} onClick={ambil} disabled={meja === 0 || kp >= 10}>
            {"\u{270B}"} Ambil satu
          </button>
          <button type="button" className={tombol} onClick={kembali} disabled={kp === 0}>
            {"\u{21A9}\u{FE0F}"} Kembalikan satu
          </button>
          <button type="button" className={tombol} onClick={ikat} disabled={kp !== 10}>
            {"\u{1F380}"} Ikat dengan karet
          </button>
          <button type="button" className={tombol} onClick={lepas} disabled={ik === 0}>
            {"\u{2702}\u{FE0F}"} Lepas satu ikatan
          </button>
        </div>
      </div>

      <div className="rounded-2xl border-4 border-[#1C01A5] bg-white p-2 text-center">
        <p className="text-sm font-black text-[#1C01A5]">
          {x.nama}: {ik} ikat · {rapi ? `sisa satuan ${satuanAkhir}` : "masih ada sepuluh yang bisa diikat"}
        </p>
        <table className="mx-auto mt-2 border-collapse text-center" aria-label="Tabel puluhan dan satuan">
          <thead>
            <tr>
              <th className="border-2 border-[#1C01A5] bg-[#1C01A5] px-3 py-1 text-xs font-black text-[#FFE566]">Puluhan</th>
              <th className="border-2 border-[#1C01A5] bg-[#1C01A5] px-3 py-1 text-xs font-black text-[#FFE566]">Satuan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {(["puluhan", "satuan"] as Tempat2[]).map((kol) => (
                <td key={kol} className="border-2 border-[#1C01A5] px-1 py-1">
                  <div className="flex items-center gap-1">
                    <button type="button" className={tombol} onClick={() => tabel(kol, -1)} aria-label={`Kurangi ${kol}`}>
                      {"\u{2796}"}
                    </button>
                    <span className="min-w-[2.2rem] rounded-lg bg-[#FFF7CC] px-1 text-2xl font-black text-[#1C01A5]">{(kol === "puluhan" ? pul : sat) ?? "?"}</span>
                    <button type="button" className={tombol} onClick={() => tabel(kol, 1)} aria-label={`Tambah ${kol}`}>
                      {"\u{2795}"}
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={tombol} aria-pressed={k.kalimat} onClick={() => ubah(nyalakanKalimat(k), !k.kalimat && tepat ? `${kata(x.total)} adalah ${kalimatTempat(x.total)}.` : undefined)}>
            {"\u{1F4AC}"} Kalimat {k.kalimat ? "menyala" : "mati"}
          </button>
          {k.kalimat && pul !== null && sat !== null ? (
            <span className="rounded-xl border-2 border-[#15803D] bg-[#DCFCE7] px-2 py-1 text-sm font-black text-[#14532D]">
              {pul} puluhan {sat} satuan = {pul * 10 + sat}
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs font-bold text-[#1C01A5]/70">
          {tepat ? "Tabel barang ini tepat." : !rapi ? "Ikat dulu semua sepuluhan." : "Cocokkan tabel dengan ikatan dan sisanya."} · Barang dengan tabel tepat: {banyakTepat(k, BARANG_SIM)} dari {BARANG_SIM.length}
        </p>
      </div>
      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatKemas(k, BARANG_SIM)}
      </p>
    </div>
  );
}
