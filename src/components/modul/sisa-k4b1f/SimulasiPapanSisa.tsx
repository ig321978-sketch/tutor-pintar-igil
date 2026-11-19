"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_TEMPAT,
  ambilKiri,
  awalSisa,
  bawahSusun,
  hurufBesar,
  isiHasil,
  jumlahCek,
  kalimatCek,
  kalimatMaju,
  kalimatSusun,
  kata,
  klaimBenar,
  lompatMaju,
  mulaiLagiSisa,
  periksaCek,
  periksaMaju,
  petunjukCek,
  petunjukMaju,
  petunjukSusun,
  pilihanHasil,
  pilihanMaju,
  pilihMaju,
  pilihModeSisa,
  putusCek,
  selisihMaju,
  selisihTempat,
  sebenarnyaCek,
  tambahCek,
  targetCek,
  targetMaju,
  targetSusun,
  urungLompat,
  type KeadaanSisa,
  type ModeSisa,
} from "./logika";
import { MISI_SISA_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab F: Papan Sisa (Misi Sisa). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Susun (kurangkan dari satuan ke kiri; ambil dari kiri bila angka atas lebih kecil; alat menolak mengisi hasil sebelum mengambil),
 * Maju (hitung maju lewat puluhan bulat dan ratusan bulat; alat menolak lompatan melewati tujuan), dan Cek (tambahkan, lalu putuskan hasil yang dicatat benar atau salah).
 */
const MODE: { id: ModeSisa; nama: string; ikon: string }[] = [
  { id: "susun", nama: "Susun", ikon: "\u{1F4DD}" },
  { id: "maju", nama: "Maju", ikon: "\u{27A1}" },
  { id: "cek", nama: "Cek", ikon: "\u{2705}" },
];
const NAMA_KOLOM = ["Ratusan", "Puluhan", "Satuan"];

/** Garis bilangan berskala dari b ke a dengan titik lompatan yang sudah dibuat. */
function GarisSim({ b, a, posisi, lompat }: { b: number; a: number; posisi: number; lompat: number[] }) {
  const xv = (v: number): number => 30 + ((v - b) / (a - b)) * 240;
  const titik: number[] = [b];
  lompat.reduce((p, j) => {
    titik.push(p + j);
    return p + j;
  }, b);
  return (
    <svg viewBox="0 0 300 120" className="mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90" role="img" aria-label={`Garis bilangan dari ${b} sampai ${a}`}>
      <line x1={30} y1={74} x2={270} y2={74} stroke="#0F766E" strokeWidth={3} strokeLinecap="round" />
      {titik.map((v, i) => (
        <g key={`${v}-${i}`}>
          <circle cx={xv(v)} cy={74} r={i === 0 || v === a ? 6 : 4.4} fill={v === posisi ? "#FACC15" : "#99F6E4"} stroke="#115E59" strokeWidth={1.6} />
          <text x={xv(v)} y={98} textAnchor="middle" fontSize={10} fontWeight={900} fill="#115E59">
            {v}
          </text>
          {i > 0 ? (
            <>
              <path d={`M${xv(titik[i - 1]) + 2} 68 Q${(xv(titik[i - 1]) + xv(v)) / 2} 44 ${xv(v) - 2} 68`} fill="none" stroke="#DC2626" strokeWidth={2} />
              <text x={(xv(titik[i - 1]) + xv(v)) / 2} y={46 - (i % 2) * 12} textAnchor="middle" fontSize={9.4} fontWeight={900} fill="#DC2626">
                +{v - titik[i - 1]}
              </text>
            </>
          ) : null}
        </g>
      ))}
      <circle cx={xv(a)} cy={74} r={8} fill="none" stroke="#1C01A5" strokeWidth={1.6} strokeDasharray="3 2" />
      <text x={150} y={116} textAnchor="middle" fontSize={9.4} fontWeight={900} fill="#B45309">
        tujuan: {a}
      </text>
    </svg>
  );
}

export default function SimulasiPapanSisa({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSisa) => void }) {
  const [k, setK] = useState<KeadaanSisa>(() => awalSisa());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const [hasilCek, setHasilCek] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanSisa, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#0F766E] bg-white text-[#0F766E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#5EEAD4] bg-white"}`;

  const ganti = (m: ModeSisa) => {
    setHasilCek("");
    ubah(pilihModeSisa(k, m), m === "susun" ? "Kurangkan dari satuan ke kiri." : m === "maju" ? "Hitung maju dari bilangan yang kecil." : "Tambahkan hasil dengan bilangan yang dikurangkan.");
  };

  /* ------------------------------ Susun ------------------------------ */
  const ambilKu = () => {
    const r = ambilKiri(k);
    if (!r.ok) return salah(k.kolom < 1 ? "Tidak ada tempat di kiri untuk diambil." : "Angka di atas sudah cukup, jadi tidak perlu mengambil.");
    ubah(r.k, `Ambil satu dari tempat ${NAMA_TEMPAT[k.kolom - 1]}. Angka di atas ${NAMA_TEMPAT[k.kolom]} bertambah sepuluh.`);
  };
  const isiKu = (nilai: number) => {
    const r = isiHasil(k, nilai);
    if (r.ok) return ubah(r.k, r.selesai ? "Betul! Semua tempat sudah terisi. Ada pengurangan berikutnya." : `Betul! Tempat ${NAMA_TEMPAT[k.kolom]} sudah terisi.`);
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  /* ------------------------------ Maju ------------------------------ */
  const lompatKu = (jenis: "puluhan" | "ratusan" | "tujuan") => {
    const r = lompatMaju(k, jenis);
    if (!r.ok) {
      ubah(r.k);
      return salah(k.posisi >= targetMaju(k).a ? "Sudah sampai tujuan. Pilih selisihnya." : "Alat menolak. Lompatan itu melewati tujuan. Coba lompatan yang lebih pendek.");
    }
    ubah(r.k, r.k.posisi === targetMaju(k).a ? "Sudah sampai tujuan. Pilih selisihnya." : undefined);
  };
  const periksaMajuKu = () => {
    const r = periksaMaju(k);
    if (r.ok) return ubah(r.k, `Betul! Selisihnya ${kata(selisihMaju(k))}.`);
    ubah(r.k);
    salah(petunjukMaju(k));
  };
  /* ------------------------------ Cek ------------------------------ */
  const tambahKu = () => {
    ubah(tambahCek(k));
    const tc = targetCek(k);
    const j = jumlahCek(k);
    setHasilCek(`${tc.klaim} + ${tc.b} = ${j} ${j === tc.a ? "(sama dengan bilangan awal)" : "(berbeda dari bilangan awal)"}`);
    const pesan = `Hasil yang dicatat ${kata(tc.klaim)} ditambah ${kata(tc.b)} sama dengan ${kata(j)}, ${j === tc.a ? "sama dengan bilangan awal." : "berbeda dari bilangan awal."}`;
    setCatatan(pesan);
    speakGuru(pesan);
  };
  const putusKu = (p: 0 | 1) => {
    const r = putusCek(k, p);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Tambahkan dulu hasil yang dicatat dengan bilangan yang dikurangkan, baru putuskan.");
    }
    ubah(r.k);
  };
  const periksaCekKu = () => {
    const r = periksaCek(k);
    if (r.ok) {
      setHasilCek("");
      return ubah(r.k, klaimBenar(k) ? "Betul! Hasil yang dicatat memang benar." : `Betul! Hasil yang dicatat keliru. Hasil yang benar ${kata(sebenarnyaCek(k))}.`);
    }
    ubah(r.k);
    salah(petunjukCek(k));
  };

  const ts = targetSusun(k);
  const bw = bawahSusun(k);
  const tm = targetMaju(k);
  const tc = targetCek(k);
  const pilH = pilihanHasil(k);
  const pilM = pilihanMaju(k);
  const dKolom = selisihTempat(k);

  return (
    <div className="space-y-3" data-uji="simulasi-papan-sisa">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0F766E] bg-[#F0FDFA] p-2">
        <p className="text-sm font-black text-[#115E59]">Misi Papan Sisa</p>
        <p className="text-xs font-bold text-[#115E59]/80">{MISI_SISA_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "susun" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">
              {ts.benda}: {ts.a} dikurangi {ts.b}
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1" role="group" aria-label="Papan susun">
              {NAMA_KOLOM.map((n) => (
                <p key={n} className="rounded-md bg-[#99F6E4] py-0.5 text-center text-[11px] font-black text-[#115E59]">
                  {n}
                </p>
              ))}
              {k.atas.map((v, c) => (
                <p key={`a${c}`} data-uji={`atas-${c}`} className={`relative rounded-md border-4 py-1 text-center text-3xl font-black ${k.kolom === c ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#14532D] bg-white"} ${k.ambil[c] || k.ambil[c + 1] ? "text-[#DC2626]" : "text-[#14532D]"}`}>
                  {v}
                  {k.ambil[c] ? <span className="absolute right-1 top-0 text-[10px] font-black leading-none text-[#DC2626]">+10</span> : null}
                  {k.ambil[c + 1] ? <span className="absolute right-1 top-0 text-[10px] font-black leading-none text-[#DC2626]">−1</span> : null}
                </p>
              ))}
              {bw.map((v, c) => (
                <p key={`b${c}`} className="rounded-md border-4 border-[#14532D] bg-white py-1 text-center text-3xl font-black text-[#14532D]">
                  {v}
                </p>
              ))}
              {k.hasil.map((v, c) => (
                <p key={`h${c}`} data-uji={`hasil-${c}`} className="min-h-[52px] rounded-md border-4 border-dashed border-[#15803D] bg-[#F0FDF4] py-1 text-center text-3xl font-black text-[#15803D]">
                  {v < 0 ? "" : v}
                </p>
              ))}
            </div>
            {k.kolom >= 0 ? (
              <>
                <div className="flex justify-center">
                  <button type="button" className={tombol} onClick={ambilKu}>
                    {"\u{1F4E5}"} Ambil dari kiri
                  </button>
                </div>
                <p className="text-center text-xs font-black text-[#1C01A5]">
                  Tempat {NAMA_TEMPAT[k.kolom]}: berapa {k.atas[k.kolom]} dikurangi {bw[k.kolom]}?
                </p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih hasil tempat ini">
                  {pilH.map((p) => (
                    <button key={p} type="button" onClick={() => isiKu(p)} className={pilihan(false)} data-uji={dKolom < 0 ? "pilih-sebelum-ambil" : "pilih-hasil"}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}

        {k.mode === "maju" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">
              {tm.benda}: hitung maju dari {tm.b} sampai {tm.a}
            </p>
            <GarisSim b={tm.b} a={tm.a} posisi={k.posisi} lompat={k.lompat} />
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => lompatKu("puluhan")}>
                Ke puluhan bulat
              </button>
              <button type="button" className={tombol} onClick={() => lompatKu("ratusan")}>
                Ke ratusan bulat
              </button>
              <button type="button" className={tombol} onClick={() => lompatKu("tujuan")}>
                Ke tujuan
              </button>
              <button type="button" className={tombol} onClick={() => ubah(urungLompat(k).k)}>
                Urungkan
              </button>
            </div>
            {k.posisi === tm.a ? (
              <>
                <p className="text-center text-xs font-black text-[#1C01A5]">Berapa selisihnya?</p>
                <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih selisih">
                  {pilM.map((p, i) => (
                    <button key={p} type="button" onClick={() => ubah(pilihMaju(k, i))} aria-pressed={k.majuPilih === i} className={pilihan(k.majuPilih === i)}>
                      {p}
                    </button>
                  ))}
                </div>
              </>
            ) : null}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaMajuKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "cek" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]">{tc.benda}: periksa hasil pengurangan yang dicatat</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Catatan">
              {[
                ["awal", tc.a],
                ["dikurangkan", tc.b],
                ["dicatat", tc.klaim],
              ].map(([n, v]) => (
                <p key={n} className="rounded-xl border-4 border-[#0F766E] bg-white py-1 text-center text-3xl font-black text-[#115E59]">
                  <span className="block text-[11px] text-[#0F766E]">{n}</span>
                  {v}
                </p>
              ))}
            </div>
            {hasilCek ? <p className="rounded-xl border-2 border-dashed border-[#0F766E] bg-white px-2 py-1 text-center text-sm font-black text-[#115E59]">{hasilCek}</p> : null}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={tambahKu}>
                {"\u{2795}"} Tambahkan
              </button>
              <button type="button" className={saklar(k.putus === 0)} onClick={() => putusKu(0)} aria-pressed={k.putus === 0}>
                Hasil dicatat benar
              </button>
              <button type="button" className={saklar(k.putus === 1)} onClick={() => putusKu(1)} aria-pressed={k.putus === 1}>
                Hasil dicatat salah
              </button>
              <button type="button" className={tombol} onClick={periksaCekKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setHasilCek("");
            ubah(mulaiLagiSisa(), "Mulai lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "susun" ? kalimatSusun(k) : k.mode === "maju" ? kalimatMaju(k) : kalimatCek(k)))}
      </p>
    </div>
  );
}
