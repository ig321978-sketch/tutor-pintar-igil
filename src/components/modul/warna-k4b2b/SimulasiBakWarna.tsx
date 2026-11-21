"use client";

import React, { useEffect, useRef, useState } from "react";
import { ejaK4B2 } from "../eja-k4b2";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_TANDA,
  TANDA,
  awalWarna,
  geserKartu,
  geserTitik,
  hitungBak,
  hurufBesar,
  kalimatBanding,
  kalimatGaris,
  kalimatIsi,
  kalimatUrut,
  ketukBagian,
  mulaiLagiWarna,
  pec,
  periksaBanding,
  periksaGaris,
  periksaIsi,
  periksaUrut,
  petunjukBanding,
  petunjukGaris,
  petunjukIsi,
  petunjukUrut,
  pilihKartu,
  pilihModeWarna,
  pilihTanda,
  targetBanding,
  targetGaris,
  targetIsi,
  targetUrut,
  type KeadaanWarna,
  type ModeWarna,
} from "./logika";
import { MISI_WARNA_TEKS } from "./data-sim";
import { xTanda } from "./geometri";
import { Batang, Gambar, PecSvg, TeksPecahan } from "./GambarWarna";

/**
 * Simulasi K4 Bab 2 Sub-Bab B: Bak Warna (Misi Warna). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Banding (hitung isi kedua bak lebih dulu; alat menolak memilih tanda sebelum kedua bak dihitung, lalu pilih tanda),
 * Isi (ketuk bagian bak sebanyak pembilang pecahan sasaran), Urut (geser kartu pecahan sampai berurutan naik atau turun),
 * Garis (geser titik pada garis dari nol sampai satu ke pecahan sasaran). Semua digambar sebagai kisi tetap dengan bagian sama besar.
 * Pesan lama dikosongkan setiap kali soal atau alat berganti.
 */
const MODE: { id: ModeWarna; nama: string; ikon: string }[] = [
  { id: "banding", nama: "Banding", ikon: "\u{1F4A7}" },
  { id: "isi", nama: "Isi", ikon: "\u{1F3A8}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F455}" },
  { id: "garis", nama: "Garis", ikon: "\u{1F458}" },
];
const ucap = (t: string): string => ejaK4B2(t);
const WARNA_BAK = ["#3B82F6", "#EF4444"];
const X0 = 24;
const LEBAR = 252;

export default function SimulasiBakWarna({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanWarna) => void }) {
  const [k, setK] = useState<KeadaanWarna>(() => awalWarna());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Ubah keadaan. Tanpa teks baru, pesan lama dikosongkan supaya tidak menempel pada soal berikutnya. */
  const ubah = (baru: KeadaanWarna, tampil?: string) => {
    setK(baru);
    setCatatan(tampil ?? "");
    if (tampil) speakGuru(ucap(tampil));
  };
  const salah = (tampil: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(tampil);
    speakGuru(ucap(tampil));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#C2410C] bg-[#C2410C] text-white" : "border-[#C2410C] bg-white text-[#C2410C]"}`;
  const tanda = (nyala: boolean) => `min-h-[52px] w-full rounded-xl border-4 px-2 py-1 text-center text-3xl font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#93C5FD] bg-white"}`;
  const kartu = (nyala: boolean) => `relative min-h-[64px] w-full rounded-xl border-4 px-0.5 py-1 text-center text-xl font-black text-[#14532D] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#14532D] bg-white"}`;

  const ganti = (m: ModeWarna) => {
    ubah(
      pilihModeWarna(k, m),
      m === "banding" ? "Tekan Hitung isi pada kedua bak untuk melihat pecahannya." : m === "isi" ? "Ketuk bagian bak sampai isinya sesuai pecahan sasaran." : m === "urut" ? "Geser kartu sampai pecahan berurutan." : "Geser titik sampai di pecahan sasaran.",
    );
  };

  /* ------------------------------ Banding ------------------------------ */
  const hitung = (i: 0 | 1) => {
    const r = hitungBak(k, i);
    if (!r.ok) return salah("Bak itu sudah dihitung.");
    const t = targetBanding(r.k);
    ubah(r.k, `${i === 0 ? "Bak pertama" : "Bak kedua"} terisi ${pec(i === 0 ? t.a : t.b, t.q)}.`);
  };
  const pilihTandaKu = (t: number) => {
    const r = pilihTanda(k, t);
    if (!r.ok) {
      setK(r.k);
      return salah("Alat menolak. Kedua bak belum dihitung, jadi tanda belum bisa dipilih. Tekan Hitung isi pada kedua bak dulu.");
    }
    ubah(r.k, `Tanda ${NAMA_TANDA[t]} dipilih. Tekan Periksa.`);
  };
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, "Betul! Pasangan bak berikutnya sudah siap.");
    setK(r.k);
    salah(petunjukBanding(k));
  };
  /* ------------------------------ Isi ------------------------------ */
  const ketuk = (i: number) => {
    const r = ketukBagian(k, i);
    if (r.ok) ubah(r.k);
  };
  const periksaIsiKu = () => {
    const r = periksaIsi(k);
    if (r.ok) return ubah(r.k, "Betul! Bak berikutnya sudah siap.");
    setK(r.k);
    salah(petunjukIsi(k));
  };
  /* ------------------------------ Urut ------------------------------ */
  const geser = (d: -1 | 1) => {
    const r = geserKartu(k, d);
    if (!r.ok) return salah(k.urutSel < 0 ? "Pilih satu kartu dulu, lalu geser." : "Kartu sudah di ujung, tidak bisa lebih jauh.");
    ubah(r.k);
  };
  const periksaUrutKu = () => {
    const r = periksaUrut(k);
    if (r.ok) return ubah(r.k, "Betul! Kartu berikutnya sudah siap.");
    setK(r.k);
    salah(petunjukUrut(k));
  };
  /* ------------------------------ Garis ------------------------------ */
  const tg = targetGaris(k);
  const geserT = (d: -1 | 1) => {
    const r = geserTitik(k, d);
    if (!r.ok) return salah("Titik sudah di ujung garis, tidak bisa lebih jauh.");
    ubah(r.k, `Titik di tanda ke ${ucap(String(r.k.titik))}.`);
  };
  const periksaGarisKu = () => {
    const r = periksaGaris(k);
    if (r.ok) return ubah(r.k, "Betul! Garis berikutnya sudah siap.");
    setK(r.k);
    salah(petunjukGaris(k));
  };

  const tb = targetBanding(k);
  const ti = targetIsi(k);
  const tu = targetUrut(k);
  const lihat = [k.lihatA, k.lihatB];

  return (
    <div className="space-y-3" data-uji="simulasi-bak-warna">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#C2410C] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#9A3412]">Misi Bak Warna</p>
        <p className="text-xs font-bold text-[#9A3412]/80">{MISI_WARNA_TEKS}</p>
      </div>

      <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "banding" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tb.benda}: bandingkan lewat pembilangnya</p>
            <Gambar label="Dua bak pewarna berpetak sama besar" judul="dua bak pewarna">
              <rect x={6} y={22} width={288} height={170} rx={8} fill="#FEF3C7" stroke="#B45309" strokeWidth={4} />
              {[tb.a, tb.b].map((n, r) => {
                const y = 34 + r * 78;
                return (
                  <g key={r}>
                    <Batang p={n} q={tb.q} x0={30} y={y + 8} lebar={196} tinggi={34} rupa="benda" warna={WARNA_BAK[r]} />
                    <text x={128} y={y + 62} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#451A03">
                      {r === 0 ? "bak pertama" : "bak kedua"}
                    </text>
                    {lihat[r] ? (
                      <PecSvg x={264} y={y + 26} p={n} q={tb.q} u={17} warna="#1C01A5" warnaP="#DC2626" />
                    ) : (
                      <text x={264} y={y + 34} textAnchor="middle" fontSize={24} fontWeight={900} fill="#9CA3AF">
                        ?
                      </text>
                    )}
                  </g>
                );
              })}
            </Gambar>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={tombol} onClick={() => hitung(0)} disabled={k.lihatA}>
                {"\u{1F4A7}"} Hitung isi bak pertama
              </button>
              <button type="button" className={tombol} onClick={() => hitung(1)} disabled={k.lihatB}>
                {"\u{1F4A7}"} Hitung isi bak kedua
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pilih tanda untuk bak pertama dibanding bak kedua:</p>
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

        {k.mode === "isi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">
              {ti.benda}: isi sampai pecahannya <span className="inline-block align-middle text-lg text-[#DC2626]"><TeksPecahan teks={pec(ti.p, ti.q)} /></span>
            </p>
            <div className="mx-auto max-w-[420px] rounded-xl border-4 border-[#6B4423] bg-[#B7814A] p-1.5" role="group" aria-label={`Bak dengan ${ucap(String(ti.q))} bagian sama besar`}>
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${ti.q}, minmax(0, 1fr))` }}>
                {Array.from({ length: ti.q }, (_, i) => (
                  <button key={i} type="button" onClick={() => ketuk(i)} aria-pressed={k.isi.includes(i)} aria-label={`Bagian ke ${ucap(String(i + 1))}`} className="min-h-[64px] border border-[#475569]" style={{ backgroundColor: k.isi.includes(i) ? "#3B82F6" : "#FFFFFF" }} />
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaIsiKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "urut" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tu.benda}: urutkan dari {tu.arah === "naik" ? "yang terkecil ke yang terbesar" : "yang terbesar ke yang terkecil"}</p>
            <div className="mx-auto grid max-w-[420px] gap-1.5" style={{ gridTemplateColumns: `repeat(${k.susun.length}, minmax(0, 1fr))` }} role="group" aria-label="Kartu pecahan">
              {k.susun.map((n, i) => (
                <button key={`${i}-${n}`} type="button" onClick={() => ubah(pilihKartu(k, i))} aria-pressed={k.urutSel === i} aria-label={ucap(pec(n, tu.q))} className={kartu(k.urutSel === i)}>
                  <TeksPecahan teks={pec(n, tu.q)} />
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" className={tombol} onClick={() => geser(-1)} aria-label="Geser kartu ke kiri">
                {"\u{25C0}"} Kiri
              </button>
              <button type="button" className={tombol} onClick={() => geser(1)} aria-label="Geser kartu ke kanan">
                Kanan {"\u{25B6}"}
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
              {tg.benda}: pasang titik di <span className="inline-block align-middle text-lg text-[#DC2626]"><TeksPecahan teks={pec(tg.p, tg.q)} /></span>
            </p>
            <Gambar label="Garis dari nol sampai satu dengan titik yang bisa digeser" judul="garis dari nol sampai satu">
              <rect x={6} y={24} width={288} height={130} rx={8} fill="#FFF7ED" stroke="#C2410C" strokeWidth={3} />
              <line x1={X0} y1={92} x2={X0 + LEBAR} y2={92} stroke="#7C2D12" strokeWidth={3} strokeLinecap="round" />
              {Array.from({ length: tg.q + 1 }, (_, i) => (
                <line key={i} x1={xTanda(tg.q, i, X0, LEBAR)} y1={i === 0 || i === tg.q ? 82 : 86} x2={xTanda(tg.q, i, X0, LEBAR)} y2={i === 0 || i === tg.q ? 102 : 98} stroke="#7C2D12" strokeWidth={2} />
              ))}
              <text x={X0} y={120} textAnchor="middle" fontSize={11} fontWeight={900} fill="#7C2D12">
                0
              </text>
              <text x={X0 + LEBAR} y={120} textAnchor="middle" fontSize={11} fontWeight={900} fill="#7C2D12">
                1
              </text>
              <circle cx={xTanda(tg.q, k.titik, X0, LEBAR)} cy={92} r={8} fill="#FACC15" stroke="#451A03" strokeWidth={2.4} />
              <polygon points={`${xTanda(tg.q, k.titik, X0, LEBAR) - 5},${70} ${xTanda(tg.q, k.titik, X0, LEBAR) + 5},${70} ${xTanda(tg.q, k.titik, X0, LEBAR)},${78}`} fill="#7C3AED" />
            </Gambar>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" className={tombol} onClick={() => geserT(-1)} aria-label="Geser titik ke kiri">
                {"\u{25C0}"} Kiri
              </button>
              <button type="button" className={tombol} onClick={() => geserT(1)} aria-label="Geser titik ke kanan">
                Kanan {"\u{25B6}"}
              </button>
              <button type="button" className={tombol} onClick={periksaGarisKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiWarna(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "banding" ? kalimatBanding(k) : k.mode === "isi" ? kalimatIsi(k) : k.mode === "urut" ? kalimatUrut(k) : kalimatGaris(k)))}
      </p>
    </div>
  );
}
