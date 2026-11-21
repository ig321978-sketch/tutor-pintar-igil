"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalBazar,
  diagramBanding,
  diagramBaca,
  diagramPutar,
  diagramSedangDibuat,
  kalimatBaca,
  kalimatBanding,
  kalimatBuat,
  kalimatPutar,
  mulaiLagiBazar,
  naikkanBatang,
  periksaBaca,
  periksaBanding,
  periksaBuat,
  periksaPutar,
  petunjukBaca,
  petunjukBanding,
  petunjukBuat,
  petunjukPutar,
  pilihBaca,
  pilihBanding,
  pilihModeBazar,
  pilihPutar,
  putarDiagram,
  targetBaca,
  targetBanding,
  targetBuat,
  targetPutar,
  turunkanBatang,
  type KeadaanBazar,
  type ModeBazar,
} from "./logika";
import { DiagramSvg } from "./GambarBazar";
import { MISI_BAZAR_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 6 Sub-Bab B: Batang Bazar (penutup bab, tema Bazar Kuliner Sekolah). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Buat (naikkan batang sampai tepat pada garis data; alat menolak batang melewati garis paling atas), Baca (telusuri ujung batang ke sumbu, pilih banyaknya),
 * Banding (adu dua batang, pilih selisih), dan Putar (putar diagram; alat menolak Periksa sebelum diputar). Semua diagram digambar dari data. Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeBazar; nama: string; ikon: string }[] = [
  { id: "buat", nama: "Buat", ikon: "\u{1F4CA}" },
  { id: "baca", nama: "Telusur", ikon: "\u{1F4CF}" },
  { id: "banding", nama: "Banding", ikon: "\u{1F94A}" },
  { id: "putar", nama: "Arah", ikon: "\u{1F504}" },
];

export default function SimulasiBatangBazar({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBazar) => void }) {
  const [k, setK] = useState<KeadaanBazar>(() => awalBazar());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap perubahan keadaan mengosongkan pesan lama; pesan baru hanya bila diberikan. */
  const ubah = (baru: KeadaanBazar, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ucap);
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-2 text-sm font-black ${nyala ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-2 py-2 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeBazar) => {
    ubah(
      pilihModeBazar(k, m),
      m === "buat" ? "Naikkan tiap batang sampai ujungnya tepat pada garis sesuai data." : m === "baca" ? "Telusuri ujung batang ke sumbu angka, lalu pilih banyaknya." : m === "banding" ? "Adu dua batang yang disorot, lalu pilih selisihnya." : "Putar diagram, lalu pilih jenis yang batangnya paling panjang.",
    );
  };

  const tb = targetBuat(k);
  const bc = targetBaca(k);
  const dbc = diagramBaca(k);
  const bd = targetBanding(k);
  const dbd = diagramBanding(k);
  const tp = targetPutar(k);

  const naik = (i: number) => {
    const r = naikkanBatang(k, i);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Batang sudah mencapai garis paling atas pada sumbu, jadi tidak bisa dinaikkan lagi.");
  };
  const periksaB = () => {
    const r = periksaBuat(k);
    if (r.ok) return ubah(r.k, "Betul! Semua batang tepat pada garis datanya.");
    ubah(r.k);
    salah(petunjukBuat(k));
  };
  const periksaR = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, "Betul! Banyaknya sama dengan garis dikali tingkat sumbu.");
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  const periksaD = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, "Betul! Selisih berarti yang besar dikurangi yang kecil.");
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  const periksaP = () => {
    const r = periksaPutar(k);
    if (r.ok) return ubah(r.k, "Betul! Diputar pun datanya sama.");
    if (r.ditolak) return ubah(r.k, "Alat menolak. Diagram belum diputar, jadi tekan Putar dulu sebelum memeriksa.");
    ubah(r.k);
    salah(petunjukPutar(k));
  };

  return (
    <div className="space-y-2" data-uji="simulasi-batang-bazar">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B91C1C] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#7F1D1D]">Misi Batang Bazar</p>
        <p className="text-xs font-bold text-[#7F1D1D]/80">{MISI_BAZAR_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "buat" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Data {tb.judul}: tiap garis {tb.tingkat} {tb.satuan}
            </p>
            <p className="text-center text-xs font-black text-[#1C01A5]">{tb.batang.map((b) => `${b.nama} ${b.banyak}`).join(", ")} {tb.satuan}</p>
            <DiagramSvg d={diagramSedangDibuat(k)} rupa="diagram" />
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Naikkan atau turunkan batang">
              {tb.batang.map((b, i) => (
                <div key={`${k.buatKe}-${b.nama}`} className="rounded-xl border-2 border-[#FCD34D] bg-white px-1.5 py-1.5">
                  <p className="mb-1 text-center text-xs font-black leading-tight text-[#1C01A5]">{b.nama} · garis {k.garis[i]}</p>
                  <div className="flex items-center justify-between gap-1">
                    <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label={`Turunkan batang ${b.nama}`} onClick={() => ubah(turunkanBatang(k, i))} disabled={k.garis[i] === 0}>
                      {"➖"}
                    </button>
                    <span className="min-w-[2ch] text-center text-base font-black leading-tight text-[#1C01A5]">{k.garis[i]}</span>
                    <button type="button" className={`${tombol} min-w-[44px] px-2`} aria-label={`Naikkan batang ${b.nama}`} onClick={() => naik(i)}>
                      {"➕"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaB}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Berapa {dbc.satuan} batang {dbc.batang[bc.b].nama}? Tiap garis {dbc.tingkat} {dbc.satuan}.
            </p>
            <DiagramSvg d={dbc} rupa="diagram" sorot={[bc.b]} />
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih banyaknya">
              {bc.pil.map((t, i) => (
                <button key={`${k.bacaKe}-${t}`} type="button" onClick={() => ubah(pilihBaca(k, i))} aria-pressed={k.pilihBaca === i} className={pilihan(k.pilihBaca === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaR}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Adu batang {dbd.batang[bd.a].nama} dan batang {dbd.batang[bd.b].nama}. Selisihnya berapa {dbd.satuan}?
            </p>
            <DiagramSvg d={dbd} rupa="diagram" sorot={[bd.a, bd.b]} />
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih selisihnya">
              {bd.pil.map((t, i) => (
                <button key={`${k.bandingKe}-${t}`} type="button" onClick={() => ubah(pilihBanding(k, i))} aria-pressed={k.pilihBanding === i} className={pilihan(k.pilihBanding === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaD}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "putar" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Diagram {diagramPutar(k).arah === "tegak" ? "tegak" : "mendatar"}. Tekan Putar, lalu pilih jenis dengan batang paling panjang.
            </p>
            <DiagramSvg d={diagramPutar(k)} rupa="diagram" />
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={() => ubah(putarDiagram(k))}>
                {"\u{1F504}"} Putar
              </button>
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih jenis">
              {tp.pil.map((t, i) => (
                <button key={`${k.putarKe}-${t}`} type="button" onClick={() => ubah(pilihPutar(k, i))} aria-pressed={k.pilihPutar === i} className={pilihan(k.pilihPutar === i)}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaP}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiBazar(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "buat" ? kalimatBuat(k) : k.mode === "baca" ? kalimatBaca(k) : k.mode === "banding" ? kalimatBanding(k) : kalimatPutar(k))}
      </p>
    </div>
  );
}
