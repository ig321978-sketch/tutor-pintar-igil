"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_SATUAN,
  awalUbin,
  hurufBesar,
  kalimatBaris,
  kalimatSatuan,
  kalimatTangga,
  kalimatTutup,
  luasSim,
  mulaiLagiUbin,
  periksaBaris,
  periksaSatuan,
  periksaTangga,
  periksaTutup,
  petunjukBaris,
  petunjukSatuan,
  petunjukTangga,
  petunjukTutup,
  pilihModeUbin,
  pilihSatuan,
  targetBaris,
  targetSatuan,
  targetTangga,
  targetTutup,
  teksRibu,
  ubahBaris,
  ubahTangga,
  ubahTutup,
  type KeadaanUbin,
  type ModeUbin,
} from "./logika";
import { BARIS_MAKS, MISI_UBIN_TEKS, TANGGA_MAKS } from "./data-sim";
import { Gambar, KisiBerlabel, KisiUbin, TanggaSatuan, tinggiKisi } from "./GambarUbin";
import { ejaK4B4 } from "../eja-k4b4";

/**
 * Simulasi Kelas 4 Bab 4 Sub-Bab A: Lantai Ubin (Misi Ubin). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Tutup (pasang ubin satu per satu atau satu baris sampai pas dengan lantai; alat menolak memeriksa selama lantai masih kosong), Baris (isi luas dari baris kali kolom dengan satuannya),
 * Tangga (ubah meter persegi ke sentimeter persegi), dan Satuan (pilih satuan luas yang tepat untuk benda). Ubin digambar sungguh sebanyak baris kali kolom.
 */
const MODE: { id: ModeUbin; nama: string; ikon: string }[] = [
  { id: "tutup", nama: "Tutup", ikon: "\u{1F9F1}" },
  { id: "baris", nama: "Baris", ikon: "\u{1F4CA}" },
  { id: "tangga", nama: "Tangga", ikon: "\u{1F4F6}" },
  { id: "satuan", nama: "Satuan", ikon: "\u{1F4CF}" },
];

export default function SimulasiLantaiUbin({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanUbin) => void }) {
  const [k, setK] = useState<KeadaanUbin>(() => awalUbin());
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
  const ubah = (baru: KeadaanUbin, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ejaK4B4(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B4(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#0284C7] bg-white px-3 text-sm font-black text-[#075985] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0284C7] bg-[#0284C7] text-white" : "border-[#0284C7] bg-white text-[#0284C7]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full rounded-xl border-4 px-2 py-1 text-center text-lg font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeUbin) =>
    ubah(
      pilihModeUbin(k, m),
      m === "tutup" ? "Pasang ubin sampai lantai tertutup pas." : m === "baris" ? "Hitung luas lantai dari baris dan kolom." : m === "tangga" ? "Ubah meter persegi ke sentimeter persegi pada tangga satuan." : "Pilih satuan luas yang tepat untuk benda itu.",
    );

  /* ------------------------------ Tutup ------------------------------ */
  const gt = targetTutup(k);
  const periksaTutupKu = () => {
    const r = periksaTutup(k);
    if (r.ok) return ubah(r.k, `Betul! ${gt.b} baris kali ${gt.k} kolom sama dengan ${luasSim(gt)} ubin, jadi luasnya ${luasSim(gt)} ${gt.u}.`);
    ubah(r.k);
    salah(petunjukTutup(k));
  };
  /* ------------------------------ Baris ------------------------------ */
  const gb = targetBaris(k);
  const periksaBarisKu = () => {
    const r = periksaBaris(k);
    if (r.ok) return ubah(r.k, `Betul! ${gb.b} × ${gb.k} = ${luasSim(gb)}, jadi luasnya ${luasSim(gb)} ${gb.u}.`);
    ubah(r.k);
    salah(petunjukBaris(k));
  };
  /* ------------------------------ Tangga ------------------------------ */
  const mt = targetTangga(k);
  const periksaTanggaKu = () => {
    const r = periksaTangga(k);
    if (r.ok) return ubah(r.k, `Betul! ${mt} m² sama dengan ${teksRibu(mt * 10000)} cm², karena 1 m² sama dengan 10.000 cm².`);
    ubah(r.k);
    salah(petunjukTangga(k));
  };
  /* ------------------------------ Satuan ------------------------------ */
  const bs = targetSatuan(k);
  const periksaSatuanKu = () => {
    const r = periksaSatuan(k);
    if (r.ok) return ubah(r.k, `Betul! ${bs.benda.charAt(0).toUpperCase()}${bs.benda.slice(1)} diukur dengan ${bs.u}.`);
    ubah(r.k);
    salah(petunjukSatuan(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-lantai-ubin">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0284C7] bg-[#F0F9FF] p-2">
        <p className="text-sm font-black text-[#075985]">Misi Lantai Ubin</p>
        <p className="text-xs font-bold text-[#075985]/80">{MISI_UBIN_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "tutup" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#0284C7] bg-white px-2 py-1 text-center text-sm font-black text-[#075985]">Bu Sinta meminta lantai ditutup ubin sampai pas</p>
            <Gambar rupa="benda" label={`Lantai ${gt.b} baris ${gt.k} kolom, ${k.tutupIsi} ubin sudah terpasang`} judul="lantai tepi kolam" tinggi={176}>
              <KisiUbin b={gt.b} k={gt.k} terpasang={k.tutupIsi} rupa="benda" y0={26} tinggi={100} />
              <text x={150} y={26 + tinggiKisi(gt.b, gt.k, 260, 100) + 20} textAnchor="middle" fontSize={10} fontWeight={900} fill="#0369A1">
                ubin yang putus-putus belum dipasang
              </text>
            </Gambar>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className={tombol} disabled={k.tutupIsi <= 0} onClick={() => ubah(ubahTutup(k, -1))}>
                {"➖"} Ambil satu
              </button>
              <button type="button" className={tombol} disabled={k.tutupIsi >= luasSim(gt)} onClick={() => ubah(ubahTutup(k, 1))}>
                {"➕"} Tambah satu
              </button>
              <button type="button" className={tombol} disabled={k.tutupIsi >= luasSim(gt)} onClick={() => ubah(ubahTutup(k, gt.k))}>
                {"➕"} Satu baris
              </button>
              <button type="button" className={tombol} onClick={periksaTutupKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baris" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`Lantai ${gb.b} baris ${gb.k} kolom ubin`} judul="lantai ubin tepi kolam" tinggi={176}>
              <KisiBerlabel g={{ b: gb.b, k: gb.k, u: gb.u }} rupa="benda" />
              <text x={150} y={168} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0369A1">
                satu ubin = 1 {gb.u}
              </text>
            </Gambar>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa luas lantai?</p>
            <div className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-2">
              <button type="button" className={tombol} disabled={k.barisIsi <= 0} onClick={() => ubah(ubahBaris(k, -1))} aria-label="Luas turun satu">
                {"➖"}
              </button>
              <span className="min-w-[96px] rounded-xl border-4 border-[#7DD3FC] bg-white px-2 py-1 text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
                {k.barisIsi === 0 ? "?" : k.barisIsi} {gb.u}
              </span>
              <button type="button" className={tombol} disabled={k.barisIsi >= BARIS_MAKS} onClick={() => ubah(ubahBaris(k, 1))} aria-label="Luas naik satu">
                {"➕"}
              </button>
              <button type="button" className={tombol} onClick={periksaBarisKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tangga" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`${mt} meter persegi diubah ke sentimeter persegi`} judul="tangga satuan luas kolam" tinggi={190}>
              <TanggaSatuan m={mt} arah="turun" rupa="benda" isi={k.tanggaIsi === 0 ? "?" : teksRibu(k.tanggaIsi * 10000)} />
            </Gambar>
            <p className="text-center text-xs font-black text-[#1C01A5]">Atur banyak sepuluh ribu sentimeter persegi</p>
            <div className="mx-auto flex max-w-[420px] flex-wrap items-center justify-center gap-2">
              <button type="button" className={tombol} disabled={k.tanggaIsi <= 0} onClick={() => ubah(ubahTangga(k, -1))} aria-label="Hasil turun sepuluh ribu">
                {"➖"}
              </button>
              <span className="min-w-[112px] rounded-xl border-4 border-[#7DD3FC] bg-white px-2 py-1 text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
                {k.tanggaIsi === 0 ? "?" : teksRibu(k.tanggaIsi * 10000)} cm²
              </span>
              <button type="button" className={tombol} disabled={k.tanggaIsi >= TANGGA_MAKS} onClick={() => ubah(ubahTangga(k, 1))} aria-label="Hasil naik sepuluh ribu">
                {"➕"}
              </button>
              <button type="button" className={tombol} onClick={periksaTanggaKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "satuan" ? (
          <div className="space-y-2">
            <Gambar rupa="benda" label={`${bs.benda}, benda yang diukur luasnya`} judul="benda yang diukur" tinggi={130}>
              {bs.u === "m²" ? (
                <rect x={50} y={36} width={200} height={70} rx={6} fill="#BAE6FD" stroke="#0369A1" strokeWidth={2} data-ukuran="besar" />
              ) : (
                <rect x={127} y={50} width={46} height={32} rx={3} fill="#FFFFFF" stroke="#0369A1" strokeWidth={2} data-ukuran="kecil" />
              )}
              <text x={150} y={bs.u === "m²" ? 76 : 108} textAnchor="middle" fontSize={11} fontWeight={900} fill="#0C4A6E">
                {bs.benda}
              </text>
              <text x={150} y={124} textAnchor="middle" fontSize={10} fontWeight={900} fill="#0369A1">
                pilih satuan luasnya
              </text>
            </Gambar>
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-1.5" role="group" aria-label="Pilih satuan luas">
              {NAMA_SATUAN.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihSatuan(k, i))} aria-pressed={k.satuanPilih === i} className={pilihan(k.satuanPilih === i)}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaSatuanKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiUbin(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "tutup" ? kalimatTutup(k) : k.mode === "baris" ? kalimatBaris(k) : k.mode === "tangga" ? kalimatTangga(k) : kalimatSatuan(k)))}
      </p>
    </div>
  );
}
