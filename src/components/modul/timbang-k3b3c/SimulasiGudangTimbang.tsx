"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  angkatBenda,
  awalTimbang,
  geserLayar,
  kalimatNol,
  kalimatPilih,
  kalimatSelisih,
  kalimatTimbang,
  kalimatTolak,
  kata,
  letakkanBenda,
  mulaiLagiTimbang,
  namaSatuan,
  periksaBaca,
  periksaPilih,
  periksaSelisih,
  petunjukBaca,
  petunjukPilih,
  petunjukSelisih,
  pilihanBaca,
  pilihanSelisih,
  pilihBaca,
  pilihJenis,
  pilihModeTimbang,
  pilihSatuan,
  pilihSelisih,
  putarJarum,
  selisihDari,
  sudahNol,
  targetPilih,
  targetSelisih,
  targetTimbang,
  tekanNol,
  ukuranKata,
  type KeadaanTimbang,
  type ModeTimbang,
} from "./logika";
import { MISI_TIMBANG_TEKS, NAMA_JENIS } from "./data-sim";
import { Duduk, Layar } from "./LangkahTimbang";

/**
 * Simulasi Kelas 3 Bab 3 Sub-Bab C: Gudang Timbang (Misi Pakan). Berat dan benda berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Nol (putar jarum timbangan duduk dan setel layar timbangan digital ke nol; alat menolak menimbang sebelum nol), Timbang (letakkan benda, baca berat, pilih ukuran bersatuan),
 * Pilih (pilih jenis timbangan dan satuan untuk satu benda), dan Selisih (kurangi dua berat).
 */
const MODE: { id: ModeTimbang; nama: string; ikon: string }[] = [
  { id: "nol", nama: "Nol", ikon: "\u{2B55}" },
  { id: "timbang", nama: "Timbang", ikon: "\u{2696}" },
  { id: "pilih", nama: "Pilih", ikon: "\u{1F9EE}" },
  { id: "selisih", nama: "Selisih", ikon: "\u{2796}" },
];

const SVG = "mx-auto block w-full max-w-[360px] rounded-2xl bg-[#FEF3C7]";

export default function SimulasiGudangTimbang({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTimbang) => void }) {
  const [k, setK] = useState<KeadaanTimbang>(() => awalTimbang());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanTimbang, ucap?: string) => {
    setK(baru);
    if (ucap) {
      setCatatan(ucap);
      speakGuru(ucap);
    }
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeTimbang) => {
    ubah(
      pilihModeTimbang(k, m),
      m === "nol"
        ? "Putar jarum dan setel layar sampai tepat di nol."
        : m === "timbang"
          ? "Setel timbangan ke nol, letakkan benda, lalu baca beratnya."
          : m === "pilih"
            ? "Pilih jenis timbangan dan satuan untuk benda itu."
            : "Kurangi berat yang besar dengan berat yang kecil.",
    );
  };
  const putar = (d: number) => {
    const r = putarJarum(k, d);
    if (!r.ok) return salah("Jarum hanya bisa berputar dari nol sampai sembilan.");
    ubah(r.k, r.k.jarum === 0 ? "Jarum tepat di nol." : undefined);
  };
  const geser = (d: number) => {
    const r = geserLayar(k, d);
    if (!r.ok) return salah("Layar hanya bisa bergeser dari nol sampai sembilan puluh gram.");
    ubah(r.k, r.k.layar === 0 ? "Layar tepat di nol." : undefined);
  };
  const tt = targetTimbang(k);
  const tp = targetPilih(k);
  const ts = targetSelisih(k);
  const letak = () => {
    const r = letakkanBenda(k);
    if (r.alasan === "nol") {
      ubah(r.k);
      return salah(kalimatTolak(tt));
    }
    if (r.alasan === "sudah") return salah("Benda sudah ada di timbangan.");
    ubah(r.k, `Benda diletakkan. Baca angkanya, lalu pilih ukuran bersatuan.`);
  };
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, `Betul! Beratnya ${ukuranKata(tt.angka, tt.satuan)}.`);
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  const periksaPilihKu = () => {
    const r = periksaPilih(k);
    if (r.ok) return ubah(r.k, `Betul! ${tp.benda} ditimbang dengan ${NAMA_JENIS[["digital", "duduk", "badan"].indexOf(tp.jenis)]}, satuannya ${namaSatuan(tp.satuan)}.`);
    ubah(r.k);
    salah(petunjukPilih(k));
  };
  const periksaSelisihKu = () => {
    const r = periksaSelisih(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(Math.max(ts.wa, ts.wb))} dikurangi ${kata(Math.min(ts.wa, ts.wb))} sama dengan ${kata(selisihDari(ts))}.`);
    ubah(r.k);
    salah(petunjukSelisih(k));
  };

  const pilBaca = pilihanBaca(k);
  const pilSel = pilihanSelisih(k);
  const nolDuduk = k.jarum === 0;
  const nolLayar = k.layar === 0;
  /** Timbangan yang dipakai pada mode Timbang menampilkan berat benda hanya bila benda sudah diletakkan. */
  const bacaJarum = k.diletakkan && tt.alat === "duduk" ? tt.angka : k.jarum;
  const bacaLayar = k.diletakkan && tt.alat === "digital" ? tt.angka : k.layar;

  return (
    <div className="space-y-3" data-uji="simulasi-gudang-timbang">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Gudang Timbang</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_TIMBANG_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "nol" ? (
          <div className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <svg viewBox="0 0 300 200" className={SVG} role="img" aria-label="Timbangan duduk berjarum">
                  <Duduk nilai={k.jarum} rupa="benda" nama="" benda={false} cy={104} />
                  <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={nolDuduk ? "#15803D" : "#B45309"}>
                    {nolDuduk ? "jarum tepat di nol" : "jarum belum di nol"}
                  </text>
                </svg>
                <div className="flex justify-center gap-2" role="group" aria-label="Putar jarum">
                  <button type="button" className={tombol} onClick={() => putar(-1)}>
                    {"\u{21BA}"} Mundur
                  </button>
                  <button type="button" className={tombol} onClick={() => putar(1)}>
                    {"\u{21BB}"} Maju
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <svg viewBox="0 0 300 200" className={SVG} role="img" aria-label="Timbangan digital berlayar">
                  <Layar angka={k.layar} rupa="benda" nama="" benda={false} />
                  <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={nolLayar ? "#15803D" : "#B45309"}>
                    {nolLayar ? "layar tepat di nol" : "layar belum di nol"}
                  </text>
                </svg>
                <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Setel layar">
                  <button type="button" className={tombol} onClick={() => geser(-1)}>
                    {"\u{2212}"}10 g
                  </button>
                  <button type="button" className={tombol} onClick={() => geser(1)}>
                    +10 g
                  </button>
                  <button type="button" className={tombol} onClick={() => ubah(tekanNol(k), "Layar tepat di nol.")}>
                    Tekan nol
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {k.mode === "timbang" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-4 border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]">
              Timbang {tt.benda} di {tt.alat === "duduk" ? "timbangan duduk" : "timbangan digital"}
            </p>
            <svg viewBox="0 0 300 200" className={SVG} role="img" aria-label="Timbangan dengan benda">
              {tt.alat === "duduk" ? <Duduk nilai={bacaJarum} rupa="benda" emoji={k.diletakkan ? tt.emoji : undefined} nama={tt.benda} benda={k.diletakkan} /> : <Layar angka={bacaLayar} rupa="benda" emoji={k.diletakkan ? tt.emoji : undefined} nama={tt.benda} benda={k.diletakkan} />}
              <text x={150} y={190} textAnchor="middle" fontSize={11} fontWeight={900} fill={sudahNol(k, tt.alat) || k.diletakkan ? "#15803D" : "#B45309"}>
                {k.diletakkan ? "benda sudah diletakkan" : sudahNol(k, tt.alat) ? "sudah di nol, siap menimbang" : "belum di nol"}
              </text>
            </svg>
            <div className="flex flex-wrap justify-center gap-2">
              {tt.alat === "duduk" ? (
                <>
                  <button type="button" className={tombol} disabled={k.diletakkan} onClick={() => putar(-1)}>
                    {"\u{21BA}"} Mundur
                  </button>
                  <button type="button" className={tombol} disabled={k.diletakkan} onClick={() => putar(1)}>
                    {"\u{21BB}"} Maju
                  </button>
                </>
              ) : (
                <>
                  <button type="button" className={tombol} disabled={k.diletakkan} onClick={() => geser(-1)}>
                    {"\u{2212}"}10 g
                  </button>
                  <button type="button" className={tombol} disabled={k.diletakkan} onClick={() => geser(1)}>
                    +10 g
                  </button>
                  <button type="button" className={tombol} disabled={k.diletakkan} onClick={() => ubah(tekanNol(k), "Layar tepat di nol.")}>
                    Tekan nol
                  </button>
                </>
              )}
              <button type="button" className={tombol} onClick={letak}>
                {"\u{2B07}"} Letakkan benda
              </button>
              <button type="button" className={tombol} disabled={!k.diletakkan} onClick={() => ubah(angkatBenda(k), "Benda diangkat dari timbangan.")}>
                {"\u{2B06}"} Angkat benda
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa berat benda itu, lengkap dengan satuannya?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih ukuran">
              {pilBaca.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihBaca(k, i))} aria-pressed={k.bacaPilih === i} className={pilihan(k.bacaPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBacaKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pilih" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-4 border-[#78350F] bg-[#FEF3C7] px-2 py-2 text-center text-xl font-black text-[#1C01A5]">
              <span aria-hidden="true">{tp.emoji}</span> {tp.benda}
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pilih jenis timbangan:</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jenis timbangan">
              {NAMA_JENIS.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihJenis(k, i))} aria-pressed={k.pilihJenis === i} className={pilihan(k.pilihJenis === i)}>
                  {p}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pilih satuannya:</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Pilih satuan">
              {["gram", "kilogram"].map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihSatuan(k, i))} aria-pressed={k.pilihSatuan === i} className={pilihan(k.pilihSatuan === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPilihKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "selisih" ? (
          <div className="space-y-2">
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-2">
              {[
                { n: ts.na, w: ts.wa },
                { n: ts.nb, w: ts.wb },
              ].map((x) => (
                <div key={x.n} className="rounded-xl border-4 border-[#6B4423] bg-[#FDE7C2] p-2 text-center">
                  <p className="text-xs font-black text-[#7C2D12]">{x.n}</p>
                  <p className="text-2xl font-black text-[#15803D]">
                    {x.w} {ts.satuan}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa selisih kedua berat?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih selisih">
              {pilSel.map((p, i) => (
                <button key={p} type="button" onClick={() => ubah(pilihSelisih(k, i))} aria-pressed={k.selisihPilih === i} className={pilihan(k.selisihPilih === i)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSelisihKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTimbang(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "nol" ? kalimatNol(k) : k.mode === "timbang" ? kalimatTimbang(k) : k.mode === "pilih" ? kalimatPilih(k) : kalimatSelisih(k))}
      </p>
    </div>
  );
}
