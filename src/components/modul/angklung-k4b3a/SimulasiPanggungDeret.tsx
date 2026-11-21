"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_JENIS,
  awalAngklung,
  banyakKe,
  deretKe,
  hurufBesar,
  kalimatJenis,
  kalimatLima,
  kalimatTabel,
  kalimatTata,
  mulaiLagiAngklung,
  periksaJenis,
  periksaLima,
  periksaTabel,
  periksaTata,
  petunjukJenis,
  petunjukLima,
  petunjukTabel,
  petunjukTata,
  pilihJenis,
  pilihModeAngklung,
  targetJenis,
  targetLima,
  targetTabel,
  targetTata,
  teksBeda,
  ubahBeda,
  ubahLima,
  ubahTata,
  type KeadaanAngklung,
  type ModeAngklung,
} from "./logika";
import { MISI_ANGKLUNG_TEKS } from "./data-sim";
import { BarisDeret, Gambar, SusunLima, TabelSelisih, simbolBenda } from "./GambarAngklung";
import { ejaK4B3 } from "../eja-k4b3";

/**
 * Simulasi Kelas 4 Bab 3 Sub-Bab A: Panggung Deret (Misi Deret). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Tata (tata deret keempat dengan menambah angklung; alat menolak memeriksa selama deret keempat masih kosong), Jenis (pilih membesar atau mengecil),
 * Tabel (atur selisih bertanda pada tabel selisih), dan Lima (susun angklung per lima).
 */
const MODE: { id: ModeAngklung; nama: string; ikon: string }[] = [
  { id: "tata", nama: "Tata", ikon: "\u{1F3B6}" },
  { id: "jenis", nama: "Jenis", ikon: "\u{1F3BC}" },
  { id: "tabel", nama: "Tabel", ikon: "\u{1F4CB}" },
  { id: "lima", nama: "Lima", ikon: "\u{270B}" },
];

export default function SimulasiPanggungDeret({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanAngklung) => void }) {
  const [k, setK] = useState<KeadaanAngklung>(() => awalAngklung());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap aksi baru mengosongkan pesan lama; pesan baru hanya bila `ucap` diberikan. */
  const ubah = (baru: KeadaanAngklung, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ejaK4B3(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B3(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#B45309] bg-white px-3 text-sm font-black text-[#92400E] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeAngklung) =>
    ubah(
      pilihModeAngklung(k, m),
      m === "tata" ? "Tata deret keempat di rak sesuai pola." : m === "jenis" ? "Lihat tiga deret, lalu pilih jenis polanya." : m === "tabel" ? "Atur selisih pada tabel selisih." : "Susun angklung per lima sesuai permintaan Bu Ratri.",
    );

  /* ------------------------------ Tata ------------------------------ */
  const pt = targetTata(k);
  const [t1, t2, t3] = deretKe(pt, 3);
  const periksaTataKu = () => {
    const r = periksaTata(k);
    if (r.ok) return ubah(r.k, `Betul! Deret keempat berisi ${banyakKe(pt, 4)} angklung, karena polanya ${pt.d > 0 ? "bertambah" : "berkurang"} ${Math.abs(pt.d)} tiap deret.`);
    ubah(r.k);
    salah(petunjukTata(k));
  };
  /* ------------------------------ Jenis ------------------------------ */
  const pj = targetJenis(k);
  const [j1, j2, j3] = deretKe(pj, 3);
  const periksaJenisKu = () => {
    const r = periksaJenis(k);
    if (r.ok) return ubah(r.k, `Betul! Polanya ${NAMA_JENIS[k.jenisPilih]}, karena tiap deret ${pj.d > 0 ? "bertambah" : "berkurang"} ${Math.abs(pj.d)}.`);
    ubah(r.k);
    salah(petunjukJenis(k));
  };
  /* ------------------------------ Tabel ------------------------------ */
  const pb = targetTabel(k);
  const periksaTabelKu = () => {
    const r = periksaTabel(k);
    if (r.ok) return ubah(r.k, `Betul! Selisih tiap dua deret berurutan adalah ${teksBeda(pb.d)}.`);
    ubah(r.k);
    salah(petunjukTabel(k));
  };
  /* ------------------------------ Lima ------------------------------ */
  const nLima = targetLima(k);
  const periksaLimaKu = () => {
    const r = periksaLima(k);
    if (r.ok) return ubah(r.k, `Betul! ${nLima} angklung terdiri dari ${Math.floor(nLima / 5)} baris penuh berisi lima dan sisa ${nLima % 5}.`);
    ubah(r.k);
    salah(petunjukLima(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-panggung-deret">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Panggung Deret</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_ANGKLUNG_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tata" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#78350F]">Bu Ratri meminta deret keempat sesuai pola</p>
            <Gambar rupa="benda" label="Rak angklung dengan tiga deret dan deret keempat yang ditata" judul="rak angklung" tinggi={176}>
              <BarisDeret y={36} n={t1} rupa="benda" simbol={simbolBenda(pt)} bentuk="kotak" label="deret 1" />
              <BarisDeret y={72} n={t2} rupa="benda" simbol={simbolBenda(pt)} bentuk="kotak" label="deret 2" />
              <BarisDeret y={108} n={t3} rupa="benda" simbol={simbolBenda(pt)} bentuk="kotak" label="deret 3" />
              <BarisDeret y={146} n={k.tataIsi} rupa="benda" simbol={simbolBenda(pt)} bentuk="kotak" label="deret 4" kosong={k.tataIsi === 0} />
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} disabled={k.tataIsi <= 0} onClick={() => ubah(ubahTata(k, -1))}>
                {"➖"} Ambil satu
              </button>
              <button type="button" className={tombol} disabled={k.tataIsi >= 12} onClick={() => ubah(ubahTata(k, 1))}>
                {"➕"} Tambah satu
              </button>
              <button type="button" className={tombol} onClick={periksaTataKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jenis" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label="Tiga deret berurutan" judul="tiga deret di rak" tinggi={176}>
              <BarisDeret y={40} n={j1} rupa="benda" simbol={simbolBenda(pj)} bentuk="kotak" label="deret 1" />
              <BarisDeret y={84} n={j2} rupa="benda" simbol={simbolBenda(pj)} bentuk="kotak" label="deret 2" />
              <BarisDeret y={128} n={j3} rupa="benda" simbol={simbolBenda(pj)} bentuk="kotak" label="deret 3" />
            </Gambar>
            <p className="text-center text-xs font-black text-[#1C01A5]">Pola apa yang terbentuk?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Pilih jenis pola">
              {NAMA_JENIS.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihJenis(k, i))} aria-pressed={k.jenisPilih === i} className={pilihan(k.jenisPilih === i)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaJenisKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tabel" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label="Tabel banyak tiap deret dan selisihnya" judul="papan tabel selisih" tinggi={176}>
              <TabelSelisih p={pb} rupa="benda" kolom={3} tampil={3} selisih simbol={simbolBenda(pb)} teksSel={k.tabelBeda === 0 ? "?" : teksBeda(k.tabelBeda)} />
              <text x={150} y={170} textAnchor="middle" fontSize={10} fontWeight={900} fill="#92400E">
                atur selisih tiap dua deret
              </text>
            </Gambar>
            <div className="mx-auto flex max-w-[420px] items-center justify-center gap-3">
              <button type="button" className={tombol} disabled={k.tabelBeda <= -9} onClick={() => ubah(ubahBeda(k, -1))} aria-label="Selisih turun satu">
                {"➖"}
              </button>
              <span className="min-w-[64px] rounded-xl border-4 border-[#FCD34D] bg-white px-2 py-1 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
                {k.tabelBeda === 0 ? "?" : teksBeda(k.tabelBeda)}
              </span>
              <button type="button" className={tombol} disabled={k.tabelBeda >= 9} onClick={() => ubah(ubahBeda(k, 1))} aria-label="Selisih naik satu">
                {"➕"}
              </button>
              <button type="button" className={tombol} onClick={periksaTabelKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "lima" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#B45309] bg-white px-2 py-1 text-center text-sm font-black text-[#78350F]">Permintaan Bu Ratri: susun {nLima} angklung per lima</p>
            <Gambar rupa="benda" label="Susunan angklung per lima" judul={`${k.limaIsi} angklung disusun per lima`} tinggi={176}>
              <SusunLima n={k.limaIsi} rupa="benda" simbol={simbolBenda({ a: nLima, d: 1 })} bentuk="titik" y0={44} dy={44} />
            </Gambar>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} disabled={k.limaIsi <= 0} onClick={() => ubah(ubahLima(k, -1))}>
                {"➖"} Ambil satu
              </button>
              <button type="button" className={tombol} disabled={k.limaIsi >= 15} onClick={() => ubah(ubahLima(k, 1))}>
                {"➕"} Tambah satu
              </button>
              <button type="button" className={tombol} disabled={k.limaIsi + 5 > 15} onClick={() => ubah(ubahLima(k, 5))}>
                {"➕"} Baris lima
              </button>
              <button type="button" className={tombol} onClick={periksaLimaKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiAngklung(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "tata" ? kalimatTata(k) : k.mode === "jenis" ? kalimatJenis(k) : k.mode === "tabel" ? kalimatTabel(k) : kalimatLima(k)))}
      </p>
    </div>
  );
}
