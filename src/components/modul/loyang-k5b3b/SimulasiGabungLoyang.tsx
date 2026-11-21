"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ucapkan } from "./logika-cpa";
import {
  awalLoyang,
  hasilCampur,
  hurufBesar,
  kalimatCampur,
  kalimatGabung,
  kalimatSamakan,
  kalimatSederhana,
  kalimatTerimaGabung,
  mulaiLagiLoyang,
  periksaCampur,
  periksaGabung,
  periksaSamakan,
  periksaSederhana,
  petunjukCampur,
  petunjukGabung,
  petunjukSamakan,
  petunjukSederhana,
  pilihModeLoyang,
  pilihSederhana,
  sasaranCampur,
  sasaranGabung,
  sasaranSamakan,
  sasaranSederhana,
  ubahCampN,
  ubahCampW,
  ubahGabungD,
  ubahGabungN,
  ubahSamaM,
  type KeadaanLoyang,
  type ModeLoyang,
} from "./logika";
import { MISI_LOYANG_TEKS } from "./data-sim";
import { BarPecahan, PapanLoyang } from "./GambarLoyang";
import { tCamp, tPec, type BarisBar } from "./logika-data";

/**
 * Simulasi Kelas 5 Bab 3 Sub-Bab B: Gabung Loyang (Misi Loyang). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Gabung (atur pembilang dan penyebut hasil dua bagian loyang; alat menolak penyebut yang diubah),
 * Samakan (pilih KPK dua penyebut beda; alat menolak bilangan yang bukan kelipatan kedua penyebut),
 * Campur (atur bilangan bulat dan pembilang hasil dua pecahan campuran; alat menolak pembilang yang belum kurang dari penyebut),
 * dan Sederhana (pilih bentuk paling sederhana; alat menolak bila belum memilih). Bar pecahan digambar dari data (tataBar).
 */
const MODE: { id: ModeLoyang; nama: string; ikon: string }[] = [
  { id: "gabung", nama: "Gabung", ikon: "\u{1F35E}" },
  { id: "samakan", nama: "Samakan", ikon: "\u{1F517}" },
  { id: "campur", nama: "Campur", ikon: "\u{1F9C1}" },
  { id: "sederhana", nama: "Sederhana", ikon: "\u{2B50}" },
];

/** Pengatur angka: nama di baris sendiri di atas tombol kurang dan tambah (tidak terjepit). */
function Pengatur({ nama, isi, kurang, tambah, aKurang, aTambah }: { nama: string; isi: string; kurang: () => void; tambah: () => void; aKurang: string; aTambah: string }) {
  const kecil = "min-h-[44px] w-full rounded-lg border-2 border-[#9A3412] bg-white text-xl font-black text-[#7C2D12]";
  return (
    <div className="grid min-w-0 grid-cols-3 items-center gap-2 px-1" role="group" aria-label={nama}>
      <span className="col-span-3 text-center text-[12px] font-black leading-tight text-[#1C01A5]">{nama}</span>
      <button type="button" aria-label={aKurang} onClick={kurang} className={kecil}>
        −
      </button>
      <span className="block text-center text-2xl font-black text-[#1C01A5]">{isi}</span>
      <button type="button" aria-label={aTambah} onClick={tambah} className={kecil}>
        +
      </button>
    </div>
  );
}

export default function SimulasiGabungLoyang({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanLoyang) => void }) {
  const [k, setK] = useState<KeadaanLoyang>(() => awalLoyang());
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
  const ubah = (baru: KeadaanLoyang, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada sasaran berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(ucapkan(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucapkan(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#9A3412] bg-white px-3 text-sm font-black text-[#7C2D12] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9A3412] bg-[#9A3412] text-white" : "border-[#9A3412] bg-white text-[#9A3412]"}`;
  const kartuPilih = (nyala: boolean) => `min-h-[56px] w-full min-w-0 rounded-xl border-4 px-1 py-2 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#B45309] bg-[#FEF3C7]" : "border-[#FDBA74] bg-white"}`;
  const papanKata = "rounded-xl border-2 border-dashed border-[#9A3412] bg-white px-2 py-1 text-center text-sm font-black text-[#7C2D12]";

  const ganti = (m: ModeLoyang) =>
    ubah(
      pilihModeLoyang(k, m),
      m === "gabung"
        ? "Atur pembilang dan penyebut hasil, lalu tekan Periksa."
        : m === "samakan"
          ? "Atur KPK kedua penyebut dengan tombol tambah dan kurang."
          : m === "campur"
            ? "Atur bilangan bulat dan pembilang hasil, lalu tekan Periksa."
            : "Pilih kartu pecahan campuran yang paling sederhana.",
    );

  /* ------------------------------ Gabung ------------------------------ */
  const xg = sasaranGabung(k);
  const barisGabung: BarisBar[] = [
    { label: tPec(xg.a, xg.d), w: 0, n: xg.a, d: xg.d },
    { label: tPec(xg.b, xg.d), w: 0, n: xg.b, d: xg.d },
    { label: tPec(k.gabungN, k.gabungD), w: 0, n: Math.min(k.gabungN, k.gabungD), d: k.gabungD },
  ];
  const periksaGabungKu = () => {
    const r = periksaGabung(k);
    if (r.ok) return ubah(r.k, kalimatTerimaGabung(xg));
    ubah(r.k);
    salah(petunjukGabung(k));
  };
  /* ------------------------------ Samakan ------------------------------ */
  const xs = sasaranSamakan(k);
  const bisaPratinjau = k.samaM > 0 && k.samaM <= 24 && k.samaM % xs.p === 0 && k.samaM % xs.q === 0;
  const barisSama: BarisBar[] = [
    { label: tPec(xs.a, xs.p), w: 0, n: xs.a, d: xs.p },
    { label: tPec(xs.b, xs.q), w: 0, n: xs.b, d: xs.q },
    ...(bisaPratinjau
      ? [
          { label: tPec((xs.a * k.samaM) / xs.p, k.samaM), w: 0, n: (xs.a * k.samaM) / xs.p, d: k.samaM },
          { label: tPec((xs.b * k.samaM) / xs.q, k.samaM), w: 0, n: (xs.b * k.samaM) / xs.q, d: k.samaM },
        ]
      : []),
  ];
  const periksaSamakanKu = () => {
    const r = periksaSamakan(k);
    if (r.ok) return ubah(r.k, "Betul! Itu KPK yang tepat, jadi kedua pecahan bisa disamakan penyebutnya.");
    ubah(r.k);
    salah(petunjukSamakan(k));
  };
  /* ------------------------------ Campur ------------------------------ */
  const xc = sasaranCampur(k);
  const barisCamp: BarisBar[] = [
    { label: tCamp({ w: xc.w1, n: xc.n1, d: xc.d }), w: xc.w1, n: xc.n1, d: xc.d },
    { label: tCamp({ w: xc.w2, n: xc.n2, d: xc.d }), w: xc.w2, n: xc.n2, d: xc.d },
  ];
  const periksaCampurKu = () => {
    const r = periksaCampur(k);
    if (r.ok) {
      const h = hasilCampur(xc);
      return ubah(r.k, `Betul! Hasilnya ${tCamp({ w: h.w, n: h.n, d: xc.d })}, bilangan bulat dan pecahannya sudah digabung.`);
    }
    ubah(r.k);
    salah(petunjukCampur(k));
  };
  /* ------------------------------ Sederhana ------------------------------ */
  const xd = sasaranSederhana(k);
  const periksaSederhanaKu = () => {
    const r = periksaSederhana(k);
    if (r.ok) return ubah(r.k, "Betul! Itu pecahan campuran yang paling sederhana.");
    ubah(r.k);
    salah(petunjukSederhana(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-gabung-loyang">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9A3412] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Gabung Loyang</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_LOYANG_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "gabung" ? (
          <div className="space-y-2">
            <p className={papanKata}>Gabungkan {tPec(xg.a, xg.d)} dan {tPec(xg.b, xg.d)}</p>
            <PapanLoyang baris={barisGabung} bahan="roti" judul="gabung dua bagian loyang" label={`Bar ${barisGabung.map((b) => b.label).join(", ")}`} />
            <div key={`ga${k.gabungKe}`} className="mx-auto grid max-w-[420px] grid-cols-2 gap-3 px-1">
              <Pengatur key="gn" nama="Pembilang hasil" isi={String(k.gabungN)} kurang={() => ubah(ubahGabungN(k, -1))} tambah={() => ubah(ubahGabungN(k, 1))} aKurang="Kurangi pembilang" aTambah="Tambah pembilang" />
              <Pengatur key="gd" nama="Penyebut hasil" isi={String(k.gabungD)} kurang={() => ubah(ubahGabungD(k, -1))} tambah={() => ubah(ubahGabungD(k, 1))} aKurang="Kurangi penyebut" aTambah="Tambah penyebut" />
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaGabungKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "samakan" ? (
          <div className="space-y-2">
            <p className={papanKata}>Samakan {tPec(xs.a, xs.p)} dan {tPec(xs.b, xs.q)}</p>
            <BarPecahan baris={barisSama} judul="samakan penyebut" label={`Bar ${barisSama.map((b) => b.label).join(", ")}`} />
            <div key={`sa${k.samaKe}`} className="mx-auto grid max-w-[300px] grid-cols-1 px-1">
              <Pengatur key="sm" nama="KPK kedua penyebut" isi={k.samaM <= 0 ? "?" : String(k.samaM)} kurang={() => ubah(ubahSamaM(k, -1))} tambah={() => ubah(ubahSamaM(k, 1))} aKurang="Kurangi KPK" aTambah="Tambah KPK" />
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSamakanKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "campur" ? (
          <div className="space-y-2">
            <p className={papanKata}>Jumlahkan {tCamp({ w: xc.w1, n: xc.n1, d: xc.d })} dan {tCamp({ w: xc.w2, n: xc.n2, d: xc.d })}</p>
            <PapanLoyang baris={barisCamp} bahan="kue" judul="dua pecahan campuran" label={`Bar ${barisCamp.map((b) => b.label).join(", ")}`} />
            <p className="text-center text-base font-black text-[#1C01A5]">Hasil: {tCamp({ w: k.campW, n: k.campN, d: xc.d })}</p>
            <div key={`ca${k.campKe}`} className="mx-auto grid max-w-[420px] grid-cols-2 gap-3 px-1">
              <Pengatur key="cw" nama="Bilangan bulat hasil" isi={String(k.campW)} kurang={() => ubah(ubahCampW(k, -1))} tambah={() => ubah(ubahCampW(k, 1))} aKurang="Kurangi bilangan bulat" aTambah="Tambah bilangan bulat" />
              <Pengatur key="cn" nama={`Pembilang (penyebut ${xc.d})`} isi={String(k.campN)} kurang={() => ubah(ubahCampN(k, -1))} tambah={() => ubah(ubahCampN(k, 1))} aKurang="Kurangi pembilang hasil" aTambah="Tambah pembilang hasil" />
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaCampurKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sederhana" ? (
          <div className="space-y-2">
            <p className={papanKata}>Sederhanakan {tPec(xd.n, xd.d)}</p>
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk satu kartu pecahan campuran</p>
            <div key={`se${k.sedKe}`} className="mx-auto grid max-w-[420px] grid-cols-2 gap-2 px-2" role="group" aria-label="Pilih bentuk paling sederhana">
              {xd.kartu.map((c, i) => (
                <button key={c} type="button" onClick={() => ubah(pilihSederhana(k, i))} aria-pressed={k.sedPilih === i} aria-label={`Kartu ${c}`} className={kartuPilih(k.sedPilih === i)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSederhanaKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiLoyang(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "gabung" ? kalimatGabung(k) : k.mode === "samakan" ? kalimatSamakan(k) : k.mode === "campur" ? kalimatCampur(k) : kalimatSederhana(k)))}
      </p>
    </div>
  );
}
