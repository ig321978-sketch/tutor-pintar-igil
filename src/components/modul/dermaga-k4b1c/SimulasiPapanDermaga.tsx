"use client";

import React, { useEffect, useRef, useState } from "react";
import { ejaK4B1 } from "../eja-k4b1";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_TANDA,
  NAMA_TEMPAT,
  TANDA,
  angkaTempat,
  awalDermaga,
  bilanganTanda,
  geserKartu,
  geserTitik,
  hurufBesar,
  kalimatBanding,
  kalimatGaris,
  kalimatUrut,
  lihatBerikut,
  mulaiLagiDermaga,
  pilihKartu,
  pilihModeDermaga,
  pilihTanda,
  periksaBanding,
  periksaGaris,
  periksaUrut,
  petunjukBanding,
  petunjukGaris,
  petunjukUrut,
  rb,
  targetBanding,
  targetGaris,
  targetUrut,
  tandaBenar,
  bedaPertama,
  type KeadaanDermaga,
  type ModeDermaga,
} from "./logika";
import { MISI_DERMAGA_TEKS } from "./data-sim";
import { Gambar } from "./GambarDermaga";

/**
 * Simulasi K4 Bab 1 Sub-Bab C: Papan Dermaga (Misi Dermaga). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Banding (lihat tempat dari kiri satu per satu, pilih tanda; alat menolak memilih tanda sebelum angka berbeda pertama terlihat),
 * Urut (geser kartu bilangan sampai berurutan naik atau turun), Garis (geser titik pada garis bilangan ke bilangan sasaran).
 */
const MODE: { id: ModeDermaga; nama: string; ikon: string }[] = [
  { id: "banding", nama: "Banding", ikon: "\u{1F448}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F0CF}" },
  { id: "garis", nama: "Garis", ikon: "\u{1F4CF}" },
];
const WARNA_TEMPAT = ["#FECACA", "#FDE68A", "#BBF7D0", "#BFDBFE"];
const ucap = (t: string): string => ejaK4B1(t);
const XG = (i: number): number => 22 + i * 25.6;

export default function SimulasiPapanDermaga({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanDermaga) => void }) {
  const [k, setK] = useState<KeadaanDermaga>(() => awalDermaga());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanDermaga, tampil?: string) => {
    setK(baru);
    if (tampil) {
      setCatatan(tampil);
      speakGuru(ucap(tampil));
    }
  };
  const salah = (tampil: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(tampil);
    speakGuru(ucap(tampil));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0369A1] bg-[#0369A1] text-white" : "border-[#0369A1] bg-white text-[#0369A1]"}`;
  const tanda = (nyala: boolean) => `min-h-[52px] w-full rounded-xl border-4 px-2 py-1 text-center text-3xl font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#93C5FD] bg-white"}`;
  const kartu = (nyala: boolean) => `relative min-h-[60px] min-w-[44px] flex-1 rounded-xl border-4 px-0.5 py-1 text-center text-lg font-black text-[#14532D] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#14532D] bg-white"}`;

  const ganti = (m: ModeDermaga) => {
    ubah(
      pilihModeDermaga(k, m),
      m === "banding" ? "Tekan Lihat tempat berikutnya untuk memeriksa dari tempat paling kiri." : m === "urut" ? "Geser kartu sampai bilangan berurutan." : "Geser titik sampai di bilangan sasaran.",
    );
  };

  /* ------------------------------ Banding ------------------------------ */
  const lihat = () => {
    const r = lihatBerikut(k);
    if (!r.ok) return salah("Keempat tempat sudah dilihat semua.");
    const tb = targetBanding(r.k);
    const i = r.k.lihat - 1;
    const x = angkaTempat(tb.a)[i];
    const y = angkaTempat(tb.b)[i];
    ubah(r.k, x === y ? `Tempat ${NAMA_TEMPAT[i]}: sama, ${x} dan ${y}. Lanjutkan ke kanan.` : `Tempat ${NAMA_TEMPAT[i]}: berbeda, ${x} dan ${y}. Angka berbeda pertama sudah ketemu.`);
  };
  const pilihTandaKu = (t: number) => {
    const r = pilihTanda(k, t);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Angka berbeda pertama belum terlihat, jadi tanda belum bisa dipilih. Tekan Lihat tempat berikutnya dulu.");
    }
    ubah(r.k, `Tanda ${NAMA_TANDA[t]} dipilih. Tekan Periksa.`);
  };
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    const t = targetBanding(k);
    if (r.ok) return ubah(r.k, tandaBenar(k) === 2 ? `Betul! ${rb(t.a)} sama dengan ${rb(t.b)}.` : `Betul! ${rb(t.a)} ${NAMA_TANDA[tandaBenar(k)]} ${rb(t.b)}.`);
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  /* ------------------------------ Urut ------------------------------ */
  const geser = (d: -1 | 1) => {
    const r = geserKartu(k, d);
    if (!r.ok) return salah(k.urutSel < 0 ? "Pilih satu kartu dulu, lalu geser." : "Kartu sudah di ujung, tidak bisa lebih jauh.");
    ubah(r.k);
  };
  const periksaUrutKu = () => {
    const r = periksaUrut(k);
    if (r.ok) return ubah(r.k, "Betul! Bilangan sudah berurutan.");
    ubah(r.k);
    salah(petunjukUrut(k));
  };
  /* ------------------------------ Garis ------------------------------ */
  const geserT = (d: -1 | 1) => {
    const r = geserTitik(k, d);
    if (!r.ok) return salah("Titik sudah di ujung garis, tidak bisa lebih jauh.");
    ubah(r.k, `Titik di ${rb(bilanganTanda(r.k, r.k.titik))}.`);
  };
  const periksaGarisKu = () => {
    const r = periksaGaris(k);
    if (r.ok) return ubah(r.k, `Betul! Titik tepat di ${rb(targetGaris(k).nilai)}.`);
    ubah(r.k);
    salah(petunjukGaris(k));
  };

  const tb = targetBanding(k);
  const tu = targetUrut(k);
  const tg = targetGaris(k);
  const beda = bedaPertama(tb.a, tb.b);

  return (
    <div className="space-y-3" data-uji="simulasi-papan-dermaga">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0369A1] bg-[#F0F9FF] p-2">
        <p className="text-sm font-black text-[#075985]">Misi Papan Dermaga</p>
        <p className="text-xs font-bold text-[#075985]/80">{MISI_DERMAGA_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "banding" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tb.benda}: bandingkan dari tempat paling kiri</p>
            <div className="mx-auto max-w-[420px] space-y-1 rounded-2xl border-4 border-[#6B4423] bg-[#E7C48F] p-2" role="group" aria-label="Dua bilangan dalam bagan tempat angka">
              <div className="grid grid-cols-4 gap-1.5 pl-14">
                {NAMA_TEMPAT.map((n, i) => (
                  <span key={n} className={`text-center text-[10px] font-black ${i < k.lihat ? "text-[#166534]" : "text-[#451A03]"}`}>
                    {n}
                  </span>
                ))}
              </div>
              {[tb.a, tb.b].map((n, r) => (
                <div key={r} className="flex items-center gap-1.5">
                  <span className="w-12 shrink-0 text-center text-[10px] font-black text-[#451A03]">{r === 0 ? "pertama" : "kedua"}</span>
                  <div className="grid flex-1 grid-cols-4 gap-1.5">
                    {angkaTempat(n).map((d, i) => (
                      <span key={i} className="rounded-lg border-2 py-1 text-center text-2xl font-black text-[#1C01A5]" style={{ backgroundColor: WARNA_TEMPAT[i], borderColor: i === beda && i < k.lihat ? "#DC2626" : i < k.lihat ? "#16A34A" : "#6B4423" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-4 gap-1.5 pl-14">
                {NAMA_TEMPAT.map((n, i) => (
                  <span key={n} className="min-h-[1.25rem] text-center text-sm font-black">
                    {i < k.lihat ? <span className={i === beda ? "text-[#DC2626]" : "text-[#16A34A]"}>{i === beda ? "≠" : "="}</span> : null}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={lihat} disabled={k.lihat >= 4}>
                {"\u{1F448}"} Lihat tempat berikutnya
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pilih tanda untuk bilangan pertama dibanding bilangan kedua:</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih tanda">
              {TANDA.map((t, i) => (
                <button key={t} type="button" onClick={() => pilihTandaKu(i)} aria-pressed={k.tandaPilih === i} aria-label={NAMA_TANDA[i]} className={tanda(k.tandaPilih === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBandingKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urut" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tu.benda}: urutkan dari {tu.arah === "naik" ? "yang terkecil ke yang terbesar" : "yang terbesar ke yang terkecil"}</p>
            <div className="mx-auto flex max-w-[420px] gap-1.5" role="group" aria-label="Kartu bilangan">
              {k.susun.map((n, i) => (
                <button key={`${i}-${n}`} type="button" onClick={() => ubah(pilihKartu(k, i))} aria-pressed={k.urutSel === i} className={kartu(k.urutSel === i)}>
                  {rb(n)}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geser(-1)} aria-label="Geser kartu ke kiri">
                {"\u{25C0}"} Geser kiri
              </button>
              <button type="button" className={tombol} onClick={() => geser(1)} aria-label="Geser kartu ke kanan">
                Geser kanan {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={periksaUrutKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "garis" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">
              {tg.benda}: pasang titik di <span className="text-[#DC2626]">{rb(tg.nilai)}</span>
            </p>
            <Gambar label="Garis bilangan dengan titik yang bisa digeser" judul={`tiap petak = ${rb(tg.langkah)}`}>
              <rect x={6} y={24} width={288} height={130} rx={8} fill="#EFF6FF" stroke="#1D4ED8" strokeWidth={3} />
              <line x1={XG(0)} y1={92} x2={XG(10)} y2={92} stroke="#1E3A8A" strokeWidth={3} strokeLinecap="round" />
              {Array.from({ length: 11 }, (_, i) => (
                <g key={i}>
                  <line x1={XG(i)} y1={i % 5 === 0 ? 84 : 86} x2={XG(i)} y2={i % 5 === 0 ? 100 : 98} stroke="#1E3A8A" strokeWidth={2} />
                  {i % 5 === 0 ? (
                    <text x={XG(i)} y={116} textAnchor="middle" fontSize={9} fontWeight={900} fill="#1E3A8A">
                      {rb(bilanganTanda(k, i))}
                    </text>
                  ) : null}
                </g>
              ))}
              <circle cx={XG(k.titik)} cy={92} r={8} fill="#FACC15" stroke="#451A03" strokeWidth={2.4} />
              <text x={XG(k.titik)} y={66} textAnchor="middle" fontSize={11} fontWeight={900} fill="#7C3AED">
                {rb(bilanganTanda(k, k.titik))}
              </text>
              <polygon points={`${XG(k.titik) - 5},${74} ${XG(k.titik) + 5},${74} ${XG(k.titik)},${82}`} fill="#7C3AED" />
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => geserT(-1)} aria-label="Geser titik ke kiri">
                {"\u{25C0}"} Titik ke kiri
              </button>
              <button type="button" className={tombol} onClick={() => geserT(1)} aria-label="Geser titik ke kanan">
                Titik ke kanan {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={periksaGarisKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiDermaga(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "banding" ? kalimatBanding(k) : k.mode === "urut" ? kalimatUrut(k) : kalimatGaris(k)))}
      </p>
    </div>
  );
}
