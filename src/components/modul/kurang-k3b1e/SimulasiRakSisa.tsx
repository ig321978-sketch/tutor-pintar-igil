"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { RakSvg } from "./LangkahKurang";
import { MISI_SISA_TEKS } from "./data-sim";
import {
  SUARA_MODE,
  ambilBatang,
  ambilButir,
  awalSisa,
  isiRak,
  kalimatSisa,
  mulaiLagiSisa,
  pecahBatang,
  periksaBlok,
  periksaKosong,
  periksaPanjang,
  periksaPeriksa,
  periksaSusun,
  pilihModeSisa,
  pilihVonis,
  pinjamSusun,
  sisaRak,
  terjual,
  tugasBlok,
  tugasPanjang,
  tugasPeriksa,
  tugasSusun,
  ubahJumlah,
  ubahPanjang,
  ubahSusun,
  ubahTerjual,
  ulangBlok,
  uraianPanjang,
  type Hasil,
  type KeadaanSisa,
  type ModeSisa,
} from "./logika";
import { puluh, sat } from "./logika-cpa";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab E: Rak Sisa (Misi Rak Sisa). Lima alat tanpa skor: Susun (susun pendek dengan tombol Pinjam), Panjang (susun panjang),
 * Pinjam (batang dipecah menjadi sepuluh butir lalu diambil), Periksa (hasil ditambah bilangan yang dikurangkan, cocok atau tidak), Kosong (hasil nol).
 */
const MODE: { id: ModeSisa; nama: string; ikon: string }[] = [
  { id: "susun", nama: "Susun", ikon: "\u{1F4DD}" },
  { id: "panjang", nama: "Panjang", ikon: "\u{1F9E9}" },
  { id: "pinjam", nama: "Pinjam", ikon: "\u{1F4E6}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{2705}" },
  { id: "kosong", nama: "Kosong", ikon: "\u{2B55}" },
];

/** Satu kolom hasil dengan tombol tambah di atas dan kurang di bawah angka. */
function KolomAtur({ nama, nilai, onTambah, onKurang, kali = 1 }: { nama: string; nilai: number; onTambah: () => void; onKurang: () => void; kali?: number }) {
  const tombol = "min-h-[40px] w-14 rounded-full border-2 border-[#1C01A5] bg-white text-lg font-black text-[#1C01A5]";
  return (
    <div className="flex flex-col items-center gap-1" role="group" aria-label={nama}>
      <button type="button" className={tombol} aria-label={`Tambah ${nama}`} onClick={onTambah}>
        +
      </button>
      <span className="flex h-12 w-14 items-center justify-center rounded-lg border-4 border-[#B45309] bg-[#FEF08A] text-3xl font-black text-[#1C01A5]">{nilai * kali}</span>
      <button type="button" className={tombol} aria-label={`Kurangi ${nama}`} onClick={onKurang}>
        -
      </button>
      <span className="text-[11px] font-black text-[#92400E]">{nama}</span>
    </div>
  );
}

/** Batang puluhan (tinggi) dan butir satuan (kotak kecil, sepuluh per baris) untuk satu kumpulan. */
function BlokSvg({ batang, butir, warna, judul }: { batang: number; butir: number; warna: string; judul: string }) {
  return (
    <svg viewBox="0 0 300 74" className="block h-auto w-full" role="img" aria-label={`${judul}: ${batang} batang, ${butir} butir`}>
      <text x={4} y={12} fontSize={10} fontWeight={900} fill="#92400E">
        {judul}
      </text>
      {Array.from({ length: batang }, (_, i) => (
        <g key={`p${i}`}>
          <rect x={6 + i * 16} y={20} width={11} height={44} fill={warna} stroke="#1C01A5" strokeWidth={1} />
          {Array.from({ length: 9 }, (_, j) => (
            <line key={j} x1={6 + i * 16} x2={17 + i * 16} y1={20 + 4.4 * (j + 1)} y2={20 + 4.4 * (j + 1)} stroke="#1C01A5" strokeWidth={0.4} />
          ))}
        </g>
      ))}
      {Array.from({ length: butir }, (_, i) => (
        <rect key={`s${i}`} x={170 + (i % 10) * 12} y={20 + Math.floor(i / 10) * 14} width={10} height={10} fill="#F59E0B" stroke="#1C01A5" strokeWidth={1} />
      ))}
      <line x1={160} x2={160} y1={18} y2={66} stroke="#CBD5E1" strokeWidth={1.2} strokeDasharray="3 3" />
    </svg>
  );
}

export default function SimulasiRakSisa({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSisa) => void }) {
  const [k, setK] = useState<KeadaanSisa>(() => awalSisa());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
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
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 text-sm font-black ${nyala ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#B45309] bg-[#FFF7ED] text-[#78350F]"}`;
  const ganti = (m: ModeSisa) => ubah(pilihModeSisa(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "susun") ubah({ ...k, susunP: 0, susunS: 0, susunPinjam: false }, "Isian dikosongkan. Kurangi lagi dari satuan.");
    else if (k.mode === "panjang") ubah({ ...k, panjangP: 0, panjangS: 0 }, "Isian dikosongkan. Uraikan lagi puluhan dan satuannya.");
    else if (k.mode === "pinjam") ubah(ulangBlok(k), "Rak dikembalikan seperti semula. Ambil lagi dari awal.");
    else if (k.mode === "periksa") ubah({ ...k, jumP: 0, jumS: 0, vonis: null }, "Pilihan dibatalkan. Tambahkan lagi hasilnya.");
    else ubah({ ...k, kosongP: 0, kosongS: 0 }, "Yang terjual dikembalikan ke nol.");
  };

  const ts = tugasSusun(k);
  const tp = tugasPanjang(k);
  const up = uraianPanjang(tp.a, tp.b);
  const tb = tugasBlok(k);
  const tc = tugasPeriksa(k);

  return (
    <div className="space-y-3" data-uji="simulasi-rak-sisa">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Rak Sisa</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_SISA_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#B45309] bg-[#FFF7ED] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "susun" ? (
          <>
            <p className="mb-2 text-center text-xs font-black text-[#78350F]">Susun pendek: kurangi satuan dulu, lalu puluhan. Satuan atas kecil? Tekan Pinjam.</p>
            <div className="mx-auto w-fit space-y-1">
              <div className="flex items-end justify-end gap-2 text-4xl font-black text-[#1C01A5]">
                <span className="w-8" />
                <span className="flex h-12 w-14 items-center justify-center">
                  {k.susunPinjam ? (
                    <>
                      <span className="mr-1 text-2xl text-[#1C01A5]/40 line-through">{puluh(ts.a)}</span>
                      <span className="text-3xl text-[#DC2626]">{puluh(ts.a) - 1}</span>
                    </>
                  ) : (
                    puluh(ts.a)
                  )}
                </span>
                <span className="flex h-12 w-14 items-center justify-center">
                  {k.susunPinjam ? <span className="mr-0.5 text-xl text-[#DC2626]">1</span> : null}
                  {sat(ts.a)}
                </span>
              </div>
              <div className="flex items-end justify-end gap-2 text-4xl font-black text-[#1C01A5]">
                <span className="w-8 text-[#B45309]">{"\u{2212}"}</span>
                <span className="flex h-12 w-14 items-center justify-center">{puluh(ts.b)}</span>
                <span className="flex h-12 w-14 items-center justify-center">{sat(ts.b)}</span>
              </div>
              <div className="h-1 rounded bg-[#1C01A5]" />
              <div className="flex items-start justify-end gap-2">
                <span className="w-8" />
                <KolomAtur nama="puluhan" nilai={k.susunP} onTambah={() => ubah(ubahSusun(k, "puluhan", 1))} onKurang={() => ubah(ubahSusun(k, "puluhan", -1))} />
                <KolomAtur nama="satuan" nilai={k.susunS} onTambah={() => ubah(ubahSusun(k, "satuan", 1))} onKurang={() => ubah(ubahSusun(k, "satuan", -1))} />
              </div>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => terapkan(pinjamSusun(k))}>
                Pinjam
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(periksaSusun(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "panjang" ? (
          <>
            <p className="mb-2 text-center text-xs font-black text-[#78350F]">Susun panjang: kurangi puluhan dengan puluhan, satuan dengan satuan, lalu gabungkan.</p>
            <div className="mx-auto max-w-[320px] space-y-1 rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
              <p>
                {tp.a} = {up.puluhAtas} + {up.satuanAtas}
              </p>
              <p>
                {tp.b} = {up.puluhBawah} + {up.satuanBawah}
              </p>
              <p className="text-xs text-[#B45309]">{up.pinjam ? "Satuan atas kecil, jadi satu puluhan dipinjam." : "Satuan atas cukup, tanpa pinjam."}</p>
            </div>
            <div className="mt-2 flex items-start justify-center gap-4">
              <KolomAtur nama="hasil puluhan" nilai={k.panjangP} kali={10} onTambah={() => ubah(ubahPanjang(k, "puluhan", 1))} onKurang={() => ubah(ubahPanjang(k, "puluhan", -1))} />
              <KolomAtur nama="hasil satuan" nilai={k.panjangS} onTambah={() => ubah(ubahPanjang(k, "satuan", 1))} onKurang={() => ubah(ubahPanjang(k, "satuan", -1))} />
            </div>
            <p className="mt-1 text-center text-sm font-black text-[#1C01A5]">
              Digabung: {k.panjangP * 10} + {k.panjangS} = {k.panjangP * 10 + k.panjangS}
            </p>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaPanjang(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "pinjam" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">
              Rak berisi {tb.a}. Ambil {puluh(tb.b)} batang dan {sat(tb.b)} butir. Butir kurang? Pecah satu batang.
            </p>
            <BlokSvg batang={k.blokBatang} butir={k.blokButir} warna="#3B82F6" judul="Rak" />
            <BlokSvg batang={k.ambilBatang} butir={k.ambilButir} warna="#EF4444" judul="Terambil" />
            <div className="mt-2 grid grid-cols-3 gap-1">
              <button type="button" className={tombol} onClick={() => terapkan(pecahBatang(k))}>
                Pecah batang
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(ambilBatang(k))}>
                Ambil batang
              </button>
              <button type="button" className={tombol} onClick={() => terapkan(ambilButir(k))}>
                Ambil butir
              </button>
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaBlok(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "periksa" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Periksa: hasil ditambah bilangan yang dikurangkan. Cocok dengan bilangan awal?</p>
            <div className="mx-auto max-w-[320px] rounded-xl bg-white px-3 py-2 text-center text-xl font-black text-[#1C01A5]">
              <p>
                {tc.a} {"\u{2212}"} {tc.b} = {tc.hasil}
              </p>
              <p className="text-base text-[#B45309]">
                {tc.hasil} + {tc.b} = ?
              </p>
            </div>
            <div className="mt-2 flex items-start justify-center gap-4">
              <KolomAtur nama="puluhan" nilai={k.jumP} onTambah={() => ubah(ubahJumlah(k, "puluhan", 1))} onKurang={() => ubah(ubahJumlah(k, "puluhan", -1))} />
              <KolomAtur nama="satuan" nilai={k.jumS} onTambah={() => ubah(ubahJumlah(k, "satuan", 1))} onKurang={() => ubah(ubahJumlah(k, "satuan", -1))} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Cocok atau tidak">
              <button type="button" aria-pressed={k.vonis === "cocok"} className={pilihan(k.vonis === "cocok")} onClick={() => ubah(pilihVonis(k, "cocok"))}>
                Cocok dengan {tc.a}
              </button>
              <button type="button" aria-pressed={k.vonis === "tidak"} className={pilihan(k.vonis === "tidak")} onClick={() => ubah(pilihVonis(k, "tidak"))}>
                Tidak cocok
              </button>
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaPeriksa(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "kosong" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#78350F]">Atur yang terjual sampai rak kosong. Sisanya harus nol.</p>
            <RakSvg a={isiRak(k)} b={terjual(k)} judul={`${isiRak(k)} \u{2212} ${terjual(k)} = ${sisaRak(k)}`} />
            <div className="mt-2 flex items-start justify-center gap-4">
              <KolomAtur nama="terjual puluhan" nilai={k.kosongP} kali={10} onTambah={() => ubah(ubahTerjual(k, "puluhan", 1))} onKurang={() => ubah(ubahTerjual(k, "puluhan", -1))} />
              <KolomAtur nama="terjual satuan" nilai={k.kosongS} onTambah={() => ubah(ubahTerjual(k, "satuan", 1))} onKurang={() => ubah(ubahTerjual(k, "satuan", -1))} />
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaKosong(k))}>
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
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiSisa(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatSisa(k)}
      </p>
    </div>
  );
}
