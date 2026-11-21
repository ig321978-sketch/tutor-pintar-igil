"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalAdonan,
  hasilPisah,
  hurufBesar,
  kalimatCoret,
  kalimatCoretBenar,
  kalimatKurang,
  kalimatPisah,
  kalimatSamakan,
  kalimatSamakanBenar,
  kata,
  ketukCoret,
  kurangkanSamakan,
  mulaiLagiAdonan,
  penyebutPisah,
  periksaCoret,
  periksaKurang,
  periksaPisah,
  petunjukBukanKpk,
  petunjukCoret,
  petunjukKosong,
  petunjukKurang,
  petunjukPisah,
  petunjukTolakSamakan,
  pilihModeAdonan,
  sasaranCoret,
  sasaranKurang,
  sasaranPisah,
  sasaranSamakan,
  ubahKurang,
  ubahPisahB,
  ubahPisahN,
  ubahSamakan,
  type KeadaanAdonan,
  type ModeAdonan,
} from "./logika";
import { MISI_ADONAN_TEKS } from "./data-sim";
import { ucapkan } from "./logika-cpa";
import { gcd, ikonRoti } from "./logika-data";
import { TeksPec } from "./GambarAdonan";

/**
 * Simulasi Kelas 5 Bab 3 Sub-Bab C: Sisa Adonan (Misi Adonan). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Coret (ketuk bagian loyang yang diambil pelanggan; alat menolak bagian yang kosong), Samakan (setel penyebut bersama lalu Kurangkan; alat menolak penyebut yang belum
 * bisa dibagi kedua penyebut), Kurang (atur pembilang hasil pada penyebut sama), dan Pisah (atur bilangan bulat dan pembilang hasil).
 * Bagian loyang pada alat Coret digambar dari data (satu tombol tiap bagian).
 */
const MODE: { id: ModeAdonan; nama: string; ikon: string }[] = [
  { id: "coret", nama: "Coret", ikon: "\u{1F370}" },
  { id: "samakan", nama: "Samakan", ikon: "\u{1F517}" },
  { id: "kurang", nama: "Kurang", ikon: "\u{2796}" },
  { id: "pisah", nama: "Pisah", ikon: "\u{2702}\u{FE0F}" },
];

const KECIL = "min-h-[44px] w-full rounded-lg border-2 border-[#BE185D] bg-white text-xl font-black text-[#831843]";

/** Pengatur angka: nama di atas (tidak terjepit), tombol kurang, angka, tombol tambah. */
function Stepper({ judul, nilai, onKurang, onTambah }: { judul: string; nilai: string; onKurang: () => void; onTambah: () => void }) {
  return (
    <div className="mx-auto grid max-w-[300px] grid-cols-3 items-center gap-2 px-1" role="group" aria-label={judul}>
      <span className="col-span-3 text-center text-[12px] font-black leading-tight text-[#1C01A5]">{judul}</span>
      <button type="button" aria-label={`Kurangi ${judul.toLowerCase()}`} onClick={onKurang} className={KECIL}>
        −
      </button>
      <span className="block text-center text-2xl font-black text-[#1C01A5]">{nilai}</span>
      <button type="button" aria-label={`Tambah ${judul.toLowerCase()}`} onClick={onTambah} className={KECIL}>
        +
      </button>
    </div>
  );
}

export default function SimulasiSisaAdonan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanAdonan) => void }) {
  const [k, setK] = useState<KeadaanAdonan>(() => awalAdonan());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap aksi baru mengosongkan pesan lama; pesan baru hanya bila `ucap` diberikan. */
  const ubah = (baru: KeadaanAdonan, ucap?: string) => {
    setK(baru);
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" hanya diucapkan, tidak menempel di layar: sasaran sudah berganti, jadi teks lama langsung hilang.
    setCatatan(ucap && ucap.startsWith("Betul!") ? "" : (ucap ?? ""));
    if (ucap) speakGuru(ucapkan(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucapkan(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#BE185D] bg-white px-3 text-sm font-black text-[#831843] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#BE185D] bg-[#BE185D] text-white" : "border-[#BE185D] bg-white text-[#BE185D]"}`;
  const papan = "rounded-xl border-2 border-dashed border-[#BE185D] bg-white px-2 py-1 text-center text-sm font-black text-[#831843]";

  const ganti = (m: ModeAdonan) =>
    ubah(
      pilihModeAdonan(k, m),
      m === "coret"
        ? "Ketuk bagian loyang yang diambil pelanggan, lalu tekan Periksa."
        : m === "samakan"
          ? "Setel penyebut bersama dengan tombol tambah dan kurang, lalu tekan Kurangkan."
          : m === "kurang"
            ? "Atur pembilang hasil dengan tombol tambah dan kurang."
            : "Atur bilangan bulat dan pembilang hasil dengan tombol tambah dan kurang.",
    );

  /* ------------------------------ Coret ------------------------------ */
  const sc = sasaranCoret(k);
  const ketukCoretKu = (i: number) => {
    const r = ketukCoret(k, i);
    if (r.hasil === "kosong") return salah(petunjukKosong());
    ubah(r.k);
  };
  const periksaCoretKu = () => {
    const r = periksaCoret(k);
    if (r.ok) return ubah(r.k, kalimatCoretBenar(sc));
    ubah(r.k);
    salah(petunjukCoret(k));
  };
  /* ------------------------------ Samakan ------------------------------ */
  const ss = sasaranSamakan(k);
  const kurangkanSamakanKu = () => {
    const r = kurangkanSamakan(k);
    if (r.hasil === "tolak") {
      ubah(r.k);
      return salah(petunjukTolakSamakan());
    }
    if (r.hasil === "bukanKpk") {
      ubah(r.k);
      return salah(petunjukBukanKpk());
    }
    ubah(r.k, kalimatSamakanBenar(ss));
  };
  /* ------------------------------ Kurang ------------------------------ */
  const sk = sasaranKurang(k);
  const periksaKurangKu = () => {
    const r = periksaKurang(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(sk.a)} per ${kata(sk.q)} dikurangi ${kata(sk.c)} per ${kata(sk.q)} sama dengan ${kata(sk.a - sk.c)} per ${kata(sk.q)}, dan penyebut tetap.`);
    ubah(r.k);
    salah(petunjukKurang(k));
  };
  /* ------------------------------ Pisah ------------------------------ */
  const sp = sasaranPisah(k);
  const mp = penyebutPisah(sp);
  const periksaPisahKu = () => {
    const r = periksaPisah(k);
    if (r.ok) {
      const h = hasilPisah(sp);
      return ubah(r.k, `Betul! Bilangan bulat dan pecahannya sudah dikurangkan, lalu digabung.${gcd(h.n, h.m) > 1 ? " Hasilnya bisa disederhanakan lagi." : ""}`);
    }
    ubah(r.k);
    salah(petunjukPisah(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-sisa-adonan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#BE185D] bg-[#FFF1F2] p-2">
        <p className="text-sm font-black text-[#831843]">Misi Sisa Adonan</p>
        <p className="text-xs font-bold text-[#831843]/80">{MISI_ADONAN_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "coret" ? (
          <div className="space-y-2">
            <p className={papan}>
              Loyang {sc.q} bagian, berisi {sc.a}. Pelanggan mengambil {sc.c} bagian.
            </p>
            <div key={`co${k.coretKe}`} className="mx-auto grid max-w-[420px] gap-1 px-2" style={{ gridTemplateColumns: `repeat(${sc.q}, minmax(0, 1fr))` }} role="group" aria-label="Bagian loyang">
              {Array.from({ length: sc.q }, (_, i) => {
                const isi = i < sc.a;
                const coret = k.coretPilih.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => ketukCoretKu(i)}
                    aria-pressed={coret}
                    aria-label={isi ? `Bagian ${i + 1}${coret ? ", dicoret" : ""}` : `Bagian ${i + 1}, kosong`}
                    className={`relative flex min-h-[52px] items-center justify-center rounded-lg border-2 text-xl ${isi ? (coret ? "border-[#B91C1C] bg-[#FEE2E2]" : "border-[#BE185D] bg-[#FFFBEB]") : "border-dashed border-[#94A3B8] bg-white"}`}
                  >
                    {isi ? <span style={{ opacity: coret ? 0.4 : 1 }}>{ikonRoti("kue")}</span> : null}
                    {coret ? (
                      <span className="absolute text-2xl font-black text-[#DC2626]" aria-hidden="true">
                        ✖
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Dicoret: {k.coretPilih.length} bagian</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaCoretKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "samakan" ? (
          <div className="space-y-2">
            <p className={papan}>
              <span className="inline-flex flex-wrap items-center justify-center gap-1.5 text-lg">
                <TeksPec teks={`${ss.a}/${ss.p}`} /> <span>−</span> <TeksPec teks={`${ss.c}/${ss.q}`} />
              </span>
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Samakan penyebutnya, lalu kurangkan</p>
            <div key={`sa${k.samakanKe}`}><Stepper judul="Penyebut bersama" nilai={String(k.samakanV)} onKurang={() => ubah(ubahSamakan(k, -1))} onTambah={() => ubah(ubahSamakan(k, 1))} /></div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={kurangkanSamakanKu}>
                {"➖"} Kurangkan
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kurang" ? (
          <div className="space-y-2">
            <p className={papan}>
              <span className="inline-flex flex-wrap items-center justify-center gap-1.5 text-lg">
                <TeksPec teks={`${sk.a}/${sk.q}`} /> <span>−</span> <TeksPec teks={`${sk.c}/${sk.q}`} /> <span>=</span>
                {k.kurangN < 0 ? <span>?</span> : <TeksPec teks={`${k.kurangN}/${sk.q}`} />}
              </span>
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Penyebutnya sama, atur pembilang hasil</p>
            <div key={`ku${k.kurangKe}`}><Stepper judul="Pembilang hasil" nilai={k.kurangN < 0 ? "?" : String(k.kurangN)} onKurang={() => ubah(ubahKurang(k, -1))} onTambah={() => ubah(ubahKurang(k, 1))} /></div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKurangKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "pisah" ? (
          <div className="space-y-2">
            <p className={papan}>
              <span className="inline-flex flex-wrap items-center justify-center gap-1.5 text-lg">
                <TeksPec teks={`${sp.b1} ${sp.a1}/${sp.p}`} /> <span>−</span> <TeksPec teks={`${sp.b2} ${sp.a2}/${sp.q}`} />
              </span>
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Penyebut bersama: {mp}. Atur bulat dan pembilang hasil.</p>
            <div key={`pi${k.pisahKe}`} className="space-y-2">
              <Stepper judul="Bilangan bulat hasil" nilai={k.pisahB < 0 ? "?" : String(k.pisahB)} onKurang={() => ubah(ubahPisahB(k, -1))} onTambah={() => ubah(ubahPisahB(k, 1))} />
              <Stepper judul="Pembilang pecahan hasil" nilai={k.pisahN < 0 ? "?" : String(k.pisahN)} onKurang={() => ubah(ubahPisahN(k, -1))} onTambah={() => ubah(ubahPisahN(k, 1))} />
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPisahKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiAdonan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "coret" ? kalimatCoret(k) : k.mode === "samakan" ? kalimatSamakan() : k.mode === "kurang" ? kalimatKurang(k) : kalimatPisah(k)))}
      </p>
    </div>
  );
}
