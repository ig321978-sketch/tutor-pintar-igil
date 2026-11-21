"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { ejaK4B6 } from "../eja-k4b6";
import {
  awalJajanan,
  dataBanding,
  dataGambar,
  dataJumlah,
  hurufBesar,
  kalimatBanding,
  kalimatBaca,
  kalimatGambar,
  kalimatJumlah,
  mulaiLagiJajanan,
  opsiBaca,
  opsiJumlah,
  periksaBanding,
  periksaBaca,
  periksaGambar,
  periksaJumlah,
  petunjukBanding,
  petunjukBaca,
  petunjukGambar,
  petunjukJumlah,
  petunjukSkala,
  pilihBaca,
  pilihJumlah,
  pilihModeJajanan,
  pilihSkalaGambar,
  sasaranBaca,
  totalMasuk,
  ubahBanding,
  ubahIkon,
  ubahMasuk,
  type KeadaanJajanan,
  type ModeJajanan,
} from "./logika";
import { MISI_JAJANAN_TEKS, SKALA_GAMBAR } from "./data-sim";
import type { Pik } from "./logika-data";
import { PapanPik } from "./GambarJajanan";

/**
 * Simulasi Kelas 4 Bab 6 Sub-Bab A: Piktogram Jajanan (Misi Jajanan). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Gambar (pilih keterangan lalu tambah ikon sesuai tabel; alat menolak keterangan yang tidak habis membagi data), Baca (pilih banyak data satu baris),
 * Banding (tandai paling banyak dan paling sedikit), dan Jumlah (masukkan semua baris lalu pilih jumlahnya). Semua piktogram digambar dari data.
 */
const MODE: { id: ModeJajanan; nama: string; ikon: string }[] = [
  { id: "gambar", nama: "Gambar", ikon: "\u{1F4CB}" },
  { id: "baca", nama: "Baca", ikon: "\u{1F522}" },
  { id: "banding", nama: "Banding", ikon: "\u{1F3C6}" },
  { id: "jumlah", nama: "Jumlah", ikon: "\u{2795}" },
];
const NAMA_TANDA = ["", "paling banyak", "paling sedikit"];

export default function SimulasiPiktogramJajanan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJajanan) => void }) {
  const [k, setK] = useState<KeadaanJajanan>(() => awalJajanan());
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
  const ubah = (baru: KeadaanJajanan, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (timer.current) window.clearTimeout(timer.current);
    // Pesan "Betul!" tidak menempel pada papan berikutnya: hilang setelah beberapa detik.
    if (ucap && ucap.startsWith("Betul!")) timer.current = window.setTimeout(() => setCatatan(""), 4500);
    if (ucap) speakGuru(ejaK4B6(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ejaK4B6(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#B91C1C] bg-white px-3 text-sm font-black text-[#991B1B] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B91C1C] bg-[#B91C1C] text-white" : "border-[#B91C1C] bg-white text-[#B91C1C]"}`;
  const pilihan = (nyala: boolean) => `min-h-[48px] w-full min-w-0 rounded-xl border-4 px-2 py-2 text-center text-[13px] font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCA5A5] bg-white"}`;

  const ganti = (m: ModeJajanan) =>
    ubah(
      pilihModeJajanan(k, m),
      m === "gambar" ? "Pilih keterangan, lalu tambah ikon sesuai tabel." : m === "baca" ? "Baca piktogram dan pilih banyak data satu baris." : m === "banding" ? "Tandai baris paling banyak dan paling sedikit." : "Masukkan semua baris, lalu pilih jumlahnya.",
    );

  /* ------------------------------ Gambar ------------------------------ */
  const dg = dataGambar(k);
  const s0 = k.gambarSkala || 1;
  const pg: Pik = { ...dg, skala: s0, seri: dg.seri.map((x, i) => ({ ...x, banyak: k.gambarIkon[i] * s0 })) };
  const pilihSkala = (s: number) => {
    const r = pilihSkalaGambar(k, s);
    ubah(r.k, r.ok ? `Keterangan dipilih: satu ikon sama dengan ${s} ${dg.satuan}.` : undefined);
    if (!r.ok) salah(petunjukSkala(k, s));
  };
  const ikon = (i: number, d: 1 | -1) => {
    if (k.gambarSkala === 0) return salah("Pilih keterangan dulu, lalu tambah ikonnya.");
    ubah(ubahIkon(k, i, d));
  };
  const periksaGambarKu = () => {
    const r = periksaGambar(k);
    if (r.ok) return ubah(r.k, "Betul! Banyak ikon sama dengan banyak data dibagi keterangan.");
    ubah(r.k);
    salah(petunjukGambar(k));
  };
  /* ------------------------------ Baca ------------------------------ */
  const sb = sasaranBaca(k);
  const ob = opsiBaca(k);
  const periksaBacaKu = () => {
    const r = periksaBaca(k);
    if (r.ok) return ubah(r.k, `Betul! ${hurufBesar(sb.p.seri[sb.i].nama)} punya ${sb.p.seri[sb.i].banyak / sb.p.skala} ikon, dan ikon dikali keterangan sama dengan ${sb.p.seri[sb.i].banyak} ${sb.p.satuan}.`);
    ubah(r.k);
    salah(petunjukBaca(k));
  };
  /* ------------------------------ Banding ------------------------------ */
  const db = dataBanding(k);
  const periksaBandingKu = () => {
    const r = periksaBanding(k);
    if (r.ok) return ubah(r.k, "Betul! Ikon paling banyak berarti data paling banyak, dan ikon paling sedikit berarti data paling sedikit.");
    ubah(r.k);
    salah(petunjukBanding(k));
  };
  /* ------------------------------ Jumlah ------------------------------ */
  const dj = dataJumlah(k);
  const oj = opsiJumlah(k);
  const periksaJumlahKu = () => {
    const r = periksaJumlah(k);
    if (r.ok) return ubah(r.k, "Betul! Semua baris dijumlahkan, dan jumlah seluruhnya sudah tepat.");
    ubah(r.k);
    salah(petunjukJumlah(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-piktogram-jajanan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B91C1C] bg-[#FFF1F2] p-2">
        <p className="text-sm font-black text-[#991B1B]">Misi Piktogram Jajanan</p>
        <p className="text-xs font-bold text-[#991B1B]/80">{MISI_JAJANAN_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "gambar" ? (
          <div className="space-y-2">
            <p className="rounded-xl border-2 border-dashed border-[#B91C1C] bg-white px-2 py-1 text-center text-sm font-black text-[#991B1B]">Tabel: {dg.seri.map((x) => `${x.nama} ${x.banyak}`).join(", ")} ({dg.satuan})</p>
            <PapanPik p={pg} rupa="benda" legenda={k.gambarSkala === 0 ? "tanya" : "tampil"} judul="papan kosong untuk digambar" />
            <p className="text-center text-xs font-black text-[#1C01A5]">Pilih keterangan: satu ikon sama dengan</p>
            <div key={`sk${k.gambarKe}`} className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-2" role="group" aria-label="Pilih keterangan">
              {SKALA_GAMBAR.map((s) => (
                <button key={s} type="button" onClick={() => pilihSkala(s)} aria-pressed={k.gambarSkala === s} className={pilihan(k.gambarSkala === s)}>
                  {s} {dg.satuan}
                </button>
              ))}
            </div>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-2" role="group" aria-label="Tambah ikon">
              {dg.seri.map((x, i) => (
                <div key={`${x.nama}-${i}`} className="rounded-xl border-2 border-[#FCA5A5] bg-white px-1 pt-1">
                  <span className="block truncate text-center text-xs font-black leading-tight text-[#1C01A5]">{x.nama}</span>
                  <div className="grid grid-cols-2">
                    <button type="button" aria-label={`Kurangi ikon ${x.nama}`} onClick={() => ikon(i, -1)} className="min-h-[44px] text-xl font-black text-[#991B1B]">
                      −
                    </button>
                    <button type="button" aria-label={`Tambah ikon ${x.nama}`} onClick={() => ikon(i, 1)} className="min-h-[44px] text-xl font-black text-[#991B1B]">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaGambarKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "baca" ? (
          <div className="space-y-2">
            <PapanPik p={sb.p} rupa="benda" tandai={[sb.i]} />
            <p className="text-center text-xs font-black text-[#1C01A5]">
              Berapa {sb.p.satuan} {sb.p.seri[sb.i].nama}?
            </p>
            <div key={`ba${k.bacaKe}`} className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-2" role="group" aria-label="Pilih banyak data">
              {ob.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihBaca(k, i))} aria-pressed={k.bacaPilih === i} className={pilihan(k.bacaPilih === i)}>
                  {n} {sb.p.satuan}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBacaKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "banding" ? (
          <div className="space-y-2">
            <PapanPik p={db} rupa="benda" tandai={k.bandingTanda.map((t, i) => (t > 0 ? i : -1)).filter((i) => i >= 0)} />
            <p className="text-center text-xs font-black text-[#1C01A5]">Ketuk baris untuk menandai</p>
            <div key={`bd${k.bandingKe}`} className="mx-auto grid max-w-[420px] grid-cols-2 gap-2 px-2" role="group" aria-label="Tandai baris">
              {db.seri.map((x, i) => (
                <button key={`${x.nama}-${i}`} type="button" onClick={() => ubah(ubahBanding(k, i))} aria-pressed={k.bandingTanda[i] > 0} className={pilihan(k.bandingTanda[i] > 0)}>
                  {x.nama}
                  {k.bandingTanda[i] > 0 ? ` · ${NAMA_TANDA[k.bandingTanda[i]]}` : ""}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaBandingKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jumlah" ? (
          <div className="space-y-2">
            <PapanPik p={dj} rupa="benda" tandai={k.jumlahMasuk.map((m, i) => (m ? i : -1)).filter((i) => i >= 0)} />
            <p className="text-center text-xs font-black text-[#1C01A5]">
              Keranjang: {totalMasuk(k)} {dj.satuan}
            </p>
            <div key={`jm${k.jumlahKe}`} className="mx-auto grid max-w-[420px] grid-cols-2 gap-2 px-2" role="group" aria-label="Masukkan baris">
              {dj.seri.map((x, i) => (
                <button key={`${x.nama}-${i}`} type="button" onClick={() => ubah(ubahMasuk(k, i))} aria-pressed={k.jumlahMasuk[i]} className={pilihan(k.jumlahMasuk[i])}>
                  {k.jumlahMasuk[i] ? "✔ " : "+ "}
                  {x.nama}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]">Berapa {dj.satuan} seluruhnya?</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-2 px-2" role="group" aria-label="Pilih jumlah">
              {oj.map((n, i) => (
                <button key={n} type="button" onClick={() => ubah(pilihJumlah(k, i))} aria-pressed={k.jumlahPilih === i} className={pilihan(k.jumlahPilih === i)}>
                  {n} {dj.satuan}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaJumlahKu}>
                {"✅"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJajanan(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {hurufBesar(catatan || (k.mode === "gambar" ? kalimatGambar(k) : k.mode === "baca" ? kalimatBaca(k) : k.mode === "banding" ? kalimatBanding(k) : kalimatJumlah(k)))}
      </p>
    </div>
  );
}
