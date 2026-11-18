"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  arahPapan,
  arahSatuan,
  awalTimbang,
  bendaDuaSatuan,
  catatTabel,
  hurufBesar,
  kalimatBesarRingan,
  kalimatPapan,
  kalimatSatuan,
  kalimatSusun,
  kata,
  ketukSusun,
  kosongkanPapan,
  mulaiLagiTimbang,
  petunjukSusun,
  pilihBendaSatuan,
  pilihModeTimbang,
  pilihSatuan,
  susunLagi,
  taruhKanan,
  taruhKiri,
  ubahJumlah,
  type Arah,
  type KeadaanTimbang,
  type ModeTimbang,
} from "./logika";
import { BENDA_SIM, MISI_TIMBANG_TEKS, SATUAN_SIM, SUSUN_SIM } from "./data-peta";

/**
 * Simulasi Kelas 2 Bab 6 Sub-Bab A: Pos Timbang (Misi Pos Timbang). Benda lomba dan satuan berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Jungkat (taruh dua benda di papan jungkat-jungkit dan lihat yang turun), Satuan (timbang satu benda dengan satuan tidak baku sampai seimbang, lalu catat di tabel),
 * dan Susun (ketuk benda dari yang paling berat). Berat benda tidak ditulis: hanya papan yang menunjukkan.
 */
const MODE: { id: ModeTimbang; nama: string; ikon: string }[] = [
  { id: "jungkat", nama: "Jungkat", ikon: "\u{2696}" },
  { id: "satuan", nama: "Satuan", ikon: "\u{1F3B2}" },
  { id: "susun", nama: "Susun", ikon: "\u{1F4E6}" },
];

/** Papan jungkat-jungkit: sisi yang turun berada lebih bawah. `kiri` dan `kanan` adalah isi emoji di ujung papan. */
function Papan({ tilt, kiri, kanan, banyakKanan = 1, jungkat = true }: { tilt: Arah; kiri: string; kanan: string; banyakKanan?: number; jungkat?: boolean }) {
  const dy = tilt === "kiri" ? 11 : tilt === "kanan" ? -11 : 0;
  const yK = 100 + dy;
  const yR = 100 - dy;
  return (
    <svg viewBox="0 0 300 160" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" aria-label="Papan timbang">
      <polygon points="138,128 150,102 162,128" fill="#9CA3AF" stroke="#475569" strokeWidth={1.6} />
      <line x1={50} y1={yK} x2={250} y2={yR} stroke={jungkat ? "#D6A15E" : "#475569"} strokeWidth={jungkat ? 8 : 4} strokeLinecap="round" />
      <text x={62} y={yK - 6} fontSize={30} textAnchor="middle" aria-hidden="true">
        {kiri}
      </text>
      {Array.from({ length: Math.max(1, banyakKanan) }, (_, i) => {
        const baris = Math.floor(i / 5);
        const isi = Math.min(5, banyakKanan - baris * 5);
        return (
          <text key={i} x={238 + ((i % 5) - (isi - 1) / 2) * (banyakKanan > 1 ? 11 : 0) - (banyakKanan > 1 ? 14 : 0)} y={yR - 6 - baris * 15} fontSize={banyakKanan > 1 ? 15 : 30} textAnchor="middle" aria-hidden="true">
            {kanan}
          </text>
        );
      })}
      <text x={62} y={150} textAnchor="middle" fontSize={9} fontWeight={800} fill="#64748B">
        sisi kiri
      </text>
      <text x={238} y={150} textAnchor="middle" fontSize={9} fontWeight={800} fill="#64748B">
        sisi kanan
      </text>
    </svg>
  );
}

export default function SimulasiPosTimbang({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTimbang) => void }) {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeTimbang) => {
    ubah(pilihModeTimbang(k, m), m === "jungkat" ? "Taruh dua benda di papan dan lihat yang turun." : m === "satuan" ? "Timbang satu benda dengan satuan sampai papan seimbang." : "Ketuk benda dari yang paling berat. Papan boleh dipakai untuk memeriksa.");
  };
  const taruh = (sisi: "kiri" | "kanan", i: number) => {
    const baru = sisi === "kiri" ? taruhKiri(k, i) : taruhKanan(k, i);
    if (baru === k) return salah("Satu benda tidak bisa ada di dua sisi sekaligus. Pilih benda yang lain.");
    const besarRingan = baru.besarRingan && !k.besarRingan;
    ubah(baru, besarRingan ? `${kalimatPapan(baru)} ${kalimatBesarRingan(baru)}` : kalimatPapan(baru));
  };
  const ketukBendaSatuan = (i: number) => {
    const baru = pilihBendaSatuan(k, i);
    ubah(baru, kalimatSatuan(baru));
  };
  const ketukSatuan = (j: number) => {
    const baru = pilihSatuan(k, j);
    ubah(baru, kalimatSatuan(baru));
  };
  const ubahSatuan = (arah: 1 | -1) => {
    if (k.benda < 0 || k.satuan < 0) return salah("Pilih benda dan satuannya dulu.");
    const baru = ubahJumlah(k, arah);
    if (baru === k) return salah(arah === 1 ? "Piringan kanan sudah penuh. Kurangi bila perlu." : "Piringan kanan sudah kosong.");
    ubah(baru, kalimatSatuan(baru));
  };
  const catat = () => {
    const r = catatTabel(k);
    if (!r.ok) return salah("Catat hanya bila papan seimbang. Tambah atau kurangi satuan dulu.");
    ubah(r.k, "Hasil ukur dicatat di tabel.");
  };
  const ketukSusunBenda = (i: number) => {
    const r = ketukSusun(k, i);
    if (r.ok) return ubah(r.k, kalimatSusun(r.k));
    if (r.k !== k) {
      ubah(r.k);
      return salah(petunjukSusun(k, i));
    }
  };

  const tilt = k.mode === "jungkat" ? arahPapan(k) : arahSatuan(k);
  const bd = k.mode === "satuan" && k.benda >= 0 ? BENDA_SIM[k.benda] : null;
  const st = k.mode === "satuan" && k.satuan >= 0 ? SATUAN_SIM[k.satuan] : null;
  const duaSatuan = bendaDuaSatuan(k);
  const urutPilih = k.susunPilih;

  return (
    <div className="space-y-3" data-uji="simulasi-pos-timbang">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Pos Timbang</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_TIMBANG_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "jungkat" ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <Papan tilt={tilt} kiri={k.kiri >= 0 ? BENDA_SIM[k.kiri].emoji : ""} kanan={k.kanan >= 0 ? BENDA_SIM[k.kanan].emoji : ""} />
          <p className="text-center text-xs font-black text-[#1C01A5]">Benda untuk sisi kiri</p>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5" role="group" aria-label="Benda untuk sisi kiri">
            {BENDA_SIM.map((x, i) => (
              <button key={x.id} type="button" onClick={() => taruh("kiri", i)} aria-pressed={k.kiri === i} className={pilihan(k.kiri === i)}>
                <span className="block text-2xl" aria-hidden="true">
                  {x.emoji}
                </span>
                {x.nama}
              </button>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Benda untuk sisi kanan</p>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5" role="group" aria-label="Benda untuk sisi kanan">
            {BENDA_SIM.map((x, i) => (
              <button key={x.id} type="button" onClick={() => taruh("kanan", i)} aria-pressed={k.kanan === i} className={pilihan(k.kanan === i)}>
                <span className="block text-2xl" aria-hidden="true">
                  {x.emoji}
                </span>
                {x.nama}
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button type="button" className={tombol} onClick={() => ubah(kosongkanPapan(k), "Papan dikosongkan.")}>
              {"\u{1F9F9}"} Kosongkan papan
            </button>
          </div>
        </div>
      ) : null}

      {k.mode === "satuan" ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <Papan tilt={tilt} kiri={bd ? bd.emoji : ""} kanan={st ? st.emoji : ""} banyakKanan={st ? Math.max(1, k.jumlah) : 1} jungkat={false} />
          <p className="text-center text-xs font-black text-[#1C01A5]">Benda yang ditimbang</p>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5" role="group" aria-label="Pilih benda">
            {BENDA_SIM.map((x, i) => (
              <button key={x.id} type="button" onClick={() => ketukBendaSatuan(i)} aria-pressed={k.benda === i} className={pilihan(k.benda === i)}>
                <span className="block text-2xl" aria-hidden="true">
                  {x.emoji}
                </span>
                {x.nama}
              </button>
            ))}
          </div>
          <p className="text-center text-xs font-black text-[#1C01A5]">Satuan tidak baku</p>
          <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Pilih satuan">
            {SATUAN_SIM.map((x, j) => (
              <button key={x.id} type="button" onClick={() => ketukSatuan(j)} aria-pressed={k.satuan === j} className={pilihan(k.satuan === j)}>
                <span className="block text-2xl" aria-hidden="true">
                  {x.emoji}
                </span>
                {x.nama}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={() => ubahSatuan(1)}>
              {"\u{2795}"} Tambah satuan
            </button>
            <button type="button" className={tombol} onClick={() => ubahSatuan(-1)}>
              {"\u{2796}"} Kurangi satuan
            </button>
            <button type="button" className={tombol} onClick={catat}>
              {"\u{1F4DD}"} Catat di tabel
            </button>
          </div>
          <div className="rounded-xl border-2 border-[#15803D] bg-white p-2" aria-label="Tabel hasil ukur">
            <p className="text-center text-xs font-black text-[#14532D]">Tabel hasil ukur</p>
            {k.tabel.length === 0 ? (
              <p className="text-center text-xs font-bold text-[#1C01A5]/60">Belum ada hasil yang dicatat.</p>
            ) : (
              <ul className="space-y-0.5">
                {k.tabel.map((id) => {
                  const [bi, si] = id.split("-").map(Number);
                  return (
                    <li key={id} className="text-center text-xs font-black text-[#1C01A5]">
                      {BENDA_SIM[bi].emoji} {hurufBesar(BENDA_SIM[bi].nama)}: {kata(BENDA_SIM[bi].w / SATUAN_SIM[si].w)} {SATUAN_SIM[si].nama}
                    </li>
                  );
                })}
              </ul>
            )}
            {duaSatuan.length > 0 ? <p className="text-center text-xs font-black text-[#15803D]">Satu benda, dua hasil ukur. Satuan yang lebih ringan perlu jumlah lebih banyak.</p> : null}
          </div>
        </div>
      ) : null}

      {k.mode === "susun" ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Ketuk dari yang paling berat">
            {SUSUN_SIM.map((i) => {
              const nomor = urutPilih.indexOf(i) + 1;
              return (
                <button key={i} type="button" onClick={() => ketukSusunBenda(i)} disabled={nomor > 0} className={`${pilihan(nomor > 0)} disabled:opacity-100`}>
                  <span className="block text-3xl" aria-hidden="true">
                    {BENDA_SIM[i].emoji}
                  </span>
                  {BENDA_SIM[i].nama}
                  {nomor > 0 ? <span className="block text-[#15803D]">nomor {kata(nomor)}</span> : null}
                </button>
              );
            })}
          </div>
          {urutPilih.length > 0 ? (
            <div className="mx-auto flex max-w-[420px] flex-col-reverse items-center gap-1 rounded-xl bg-white/85 p-2" aria-label="Tumpukan benda">
              {urutPilih.map((i, n) => (
                <span key={i} className="rounded-md border-2 border-[#C2410C] bg-[#FED7AA] px-3 py-1 text-sm font-black text-[#7C2D12]" style={{ width: `${100 - n * 15}%` }}>
                  {BENDA_SIM[i].emoji} {BENDA_SIM[i].nama}
                </span>
              ))}
            </div>
          ) : null}
          {urutPilih.length === SUSUN_SIM.length ? (
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={() => ubah(susunLagi(k), "Susun lagi dari awal.")}>
                {"\u{1F501}"} Susun lagi
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiTimbang(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "jungkat" ? kalimatPapan(k) : k.mode === "satuan" ? kalimatSatuan(k) : kalimatSusun(k))}
      </p>
    </div>
  );
}
