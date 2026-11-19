"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { Papan, Tali } from "./LangkahPapan";
import { MISI_PAPAN_TEKS, PENANDA_SIM } from "./data-sim";
import {
  SUARA_MODE,
  awalPapan,
  geserKatak,
  kalimatPapan,
  kumpulanUrut,
  ketukUrut,
  mulaiLagiPapan,
  pasangKartu,
  pasangPuluhan,
  pasangBanding,
  periksaGaris,
  periksaKartu,
  pilihModePapan,
  pilihTanda,
  tugasGaris,
  type Hasil,
  type KeadaanPapan,
  type ModePapan,
} from "./logika";
import { bentukKartu, urutanKartu } from "./logika-cpa";

/**
 * Simulasi Kelas 2 Bab 7 Sub-Bab B: Papan Pengumuman (Misi Papan Pengumuman). Empat alat tanpa skor: Tali (geser katak maju atau mundur di tali jemuran berangka),
 * Banding (pilih kata untuk dua bilangan), Urut (ketuk kartu bilangan dari yang paling kecil), Kartu (pasang dua kartu angka menjadi bilangan terbesar atau terkecil).
 */
const MODE: { id: ModePapan; nama: string; ikon: string }[] = [
  { id: "garis", nama: "Tali", ikon: "\u{1F9F7}" },
  { id: "banding", nama: "Banding", ikon: "\u{2696}" },
  { id: "urut", nama: "Urut", ikon: "\u{1F522}" },
  { id: "kartu", nama: "Kartu", ikon: "\u{1F0CF}" },
];

function Kanvas({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 160" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export default function SimulasiPapanPengumuman({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanPapan) => void }) {
  const [k, setK] = useState<KeadaanPapan>(() => awalPapan());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanPapan, ucap?: string) => {
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
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const ganti = (m: ModePapan) => ubah(pilihModePapan(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "garis") ubah({ ...k, pos: tugasGaris(k).mulai }, "Katak kembali ke tempat mulai.");
    else if (k.mode === "banding") ubah({ ...k, bandingIndeks: k.bandingIndeks + 1 }, "Ini pasangan bilangan yang lain. Pilih kata yang tepat.");
    else if (k.mode === "urut") ubah({ ...k, urutKetuk: [] }, "Urutan diulang. Ketuk dari yang paling kecil.");
    else ubah({ ...k, kartuPuluhan: null }, "Pilihan dibatalkan. Ketuk satu kartu lagi.");
  };

  const t = tugasGaris(k);
  const [pa, pb] = pasangBanding(k);
  const item = kumpulanUrut(k);
  const kartuUrut = urutanKartu(item);
  const kp = pasangKartu(k);
  const satuan = k.kartuPuluhan === null ? null : kp.a + kp.b - k.kartuPuluhan;
  return (
    <div className="space-y-3" data-uji="simulasi-papan-pengumuman">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FEF3C7] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Papan Pengumuman</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_PAPAN_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#16A34A] bg-[#F0FDF4] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "garis" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">
              Katak mulai dari {t.mulai}, {t.arah} {t.langkah} langkah. Geser katak, lalu tekan Periksa.
            </p>
            <Kanvas label="Tali jemuran berangka dengan katak">
              <Tali dari={t.dari} sampai={t.sampai} rupa="benda" kepik={k.pos} penanda={PENANDA_SIM} />
            </Kanvas>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => terapkan(geserKatak(k, -1))}>
                Geser ke kiri
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(geserKatak(k, 1))}>
                Geser ke kanan
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaGaris(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "banding" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Bandingkan dua bilangan, lalu pilih kata yang tepat</p>
            <Kanvas label="Dua papan bilangan">
              <Papan n={pa} x={8} y={24} w={130} rupa="benda" />
              <Papan n={pb} x={162} y={24} w={130} rupa="benda" />
              <text x={150} y={72} textAnchor="middle" fontSize={22} fontWeight={900} fill="#DC2626">
                ?
              </text>
            </Kanvas>
            <div className="mt-2 grid grid-cols-3 gap-2" role="group" aria-label="Pilih kata perbandingan">
              <button type="button" className={tombol} onClick={() => terapkan(pilihTanda(k, "besar"))}>
                lebih besar dari {">"}
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(pilihTanda(k, "kecil"))}>
                lebih kecil dari {"<"}
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(pilihTanda(k, "sama"))}>
                sama dengan {"="}
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "urut" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">Ketuk kartu dari yang paling kecil sampai yang paling besar</p>
            <div className="grid grid-cols-2 gap-2" role="group" aria-label="Kartu bilangan">
              {kartuUrut.map((i) => (
                <button
                  key={item[i]}
                  type="button"
                  disabled={k.urutKetuk.includes(i)}
                  onClick={() => terapkan(ketukUrut(k, i))}
                  className={`flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border-4 px-3 text-2xl font-black ${k.urutKetuk.includes(i) ? "border-[#15803D] bg-[#DCFCE7] text-[#14532D]" : "border-[#92400E] bg-[#FEF3C7] text-[#78350F]"}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6D28D9] text-xs font-black text-white" aria-hidden="true">
                    {k.urutKetuk.includes(i) ? k.urutKetuk.indexOf(i) + 1 : "?"}
                  </span>
                  {item[i]}
                </button>
              ))}
            </div>
          </>
        ) : null}
        {k.mode === "kartu" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#166534]">
              Ketuk kartu untuk tempat puluhan supaya terbentuk bilangan {kp.target === "besar" ? "terbesar" : "terkecil"}, lalu tekan Periksa
            </p>
            <div className="flex justify-center gap-3">
              {[kp.a, kp.b].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => ubah(pasangPuluhan(k, n))}
                  aria-pressed={k.kartuPuluhan === n}
                  className={`rounded-xl border-4 px-6 py-2 text-3xl font-black ${k.kartuPuluhan === n ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#92400E] bg-[#FEF3C7] text-[#78350F]"}`}
                >
                  {n}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center gap-3 text-sm font-black text-[#1C01A5]">
              <span className="rounded-lg border-2 border-dashed border-[#1C01A5] px-4 py-1">puluhan: {k.kartuPuluhan ?? "?"}</span>
              <span className="rounded-lg border-2 border-dashed border-[#DC2626] px-4 py-1">satuan: {satuan ?? "?"}</span>
            </div>
            {k.kartuPuluhan !== null && satuan !== null ? <p className="mt-1 text-center text-lg font-black text-[#4C1D95]">terbentuk {bentukKartu(k.kartuPuluhan, satuan)}</p> : null}
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaKartu(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiPapan(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatPapan(k)}
      </p>
    </div>
  );
}
