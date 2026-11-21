"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalKotak,
  bagiKotak,
  bagiTiga,
  batasKotak,
  daftarBesar,
  kalimatBesar,
  kalimatCong,
  kalimatKotak,
  kalimatTiga,
  ketukLubang,
  mulaiLagiKotak,
  papanCong,
  periksaBesar,
  periksaCong,
  periksaKotak,
  periksaTiga,
  petunjukBesar,
  petunjukCong,
  petunjukKotak,
  pilihBesar,
  pilihModeKotak,
  targetBesar,
  targetCong,
  targetKotak,
  targetTiga,
  ubahKotak,
  ubahTiga,
  type KeadaanKotak,
  type ModeKotak,
} from "./logika";
import { MISI_KOTAK_TEKS, type SasaranKotak } from "./data-sim";
import { ucapkan } from "./logika-cpa";
import { daftarTeks, faktorDari, fpb, persekutuan, type BagiRata } from "./logika-data";

/**
 * Simulasi Kelas 5 Bab 2 Sub-Bab D: Isi Kotak (tema Pasar Kuliner Malam, meja kemas Pak Joko). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Congklak (ketuk lubang yang berisi dua biji; alat menolak lubang berisi satu biji atau kosong), Kotak (atur banyak kotak untuk dua jenis kue; alat menolak Periksa bila ada kue bersisa),
 * Tiga (sama untuk tiga jenis kue), dan Terbesar (pilih FPB dari faktor persekutuan). Semua papan digambar dari data. Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeKotak; nama: string; ikon: string }[] = [
  { id: "congklak", nama: "Congklak", ikon: "\u{1F3B2}" },
  { id: "kotak", nama: "Kotak", ikon: "\u{1F381}" },
  { id: "tiga", nama: "Tiga Jenis", ikon: "\u{1F36A}" },
  { id: "besar", nama: "Terbesar", ikon: "\u{1F3C6}" },
];

/** Panel atur banyak kotak: nama di antara tombol kurang dan tambah tidak terjepit, tabel isi dan sisa tiap jenis. */
function PanelBagi({
  sasaran,
  banyak,
  hasil,
  batas,
  onUbah,
  onPeriksa,
  tombol,
}: {
  sasaran: SasaranKotak;
  banyak: number;
  hasil: BagiRata;
  batas: number;
  onUbah: (arah: 1 | -1) => void;
  onPeriksa: () => void;
  tombol: string;
}) {
  return (
    <div className="space-y-2">
      <div className="mx-auto max-w-[360px] rounded-xl border-2 border-[#FCD34D] bg-white px-2 py-1.5">
        <p className="mb-1 text-center text-xs font-black text-[#1C01A5]">Banyak kotak</p>
        <div className="flex items-center justify-between gap-2">
          <button type="button" className={`${tombol} min-w-[48px] px-2`} aria-label="Kurangi banyak kotak" onClick={() => onUbah(-1)} disabled={banyak <= 1}>
            {"➖"}
          </button>
          <span className="min-w-[3ch] text-center text-2xl font-black text-[#1C01A5]" data-uji="banyak-kotak">
            {banyak}
          </span>
          <button type="button" className={`${tombol} min-w-[48px] px-2`} aria-label="Tambah banyak kotak" onClick={() => onUbah(1)} disabled={banyak >= batas}>
            {"➕"}
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[360px] rounded-xl border-2 border-[#92400E] bg-[#FEF3C7] p-1.5" role="table" aria-label="isi tiap kotak" data-uji="tabel-kotak">
        <div className="grid gap-1 text-[11px] font-black text-[#78350F]" style={{ gridTemplateColumns: "minmax(0, 1.5fr) 44px 60px 44px" }} role="row">
          <span role="columnheader">Jenis</span>
          <span role="columnheader" className="text-center">
            Kue
          </span>
          <span role="columnheader" className="text-center">
            Tiap kotak
          </span>
          <span role="columnheader" className="text-center">
            Sisa
          </span>
        </div>
        {sasaran.bil.map((n, i) => (
          <div key={sasaran.nama[i]} className="mt-0.5 grid items-center gap-1" style={{ gridTemplateColumns: "minmax(0, 1.5fr) 44px 60px 44px" }} role="row" data-baris={i}>
            <span role="cell" className="text-xs font-black leading-tight text-[#1C01A5]">
              {sasaran.nama[i]}
            </span>
            <span role="cell" className="rounded bg-white py-0.5 text-center text-sm font-black text-[#1C01A5]">
              {n}
            </span>
            <span role="cell" className="rounded bg-white py-0.5 text-center text-sm font-black text-[#1C01A5]">
              {hasil.isi[i]}
            </span>
            <span role="cell" className={`rounded py-0.5 text-center text-sm font-black ${hasil.sisa[i] > 0 ? "bg-[#FECACA] text-[#991B1B]" : "bg-[#DCFCE7] text-[#14532D]"}`}>
              {hasil.sisa[i]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button type="button" className={tombol} onClick={onPeriksa}>
          {"\u{2705}"} Periksa kotak
        </button>
      </div>
    </div>
  );
}

export default function SimulasiIsiKotak({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanKotak) => void }) {
  const [k, setK] = useState<KeadaanKotak>(() => awalKotak());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  /** Setiap perubahan keadaan mengosongkan pesan lama; pesan baru hanya bila diberikan. Suara mengeja bilangan. */
  const ubah = (baru: KeadaanKotak, ucap?: string) => {
    setK(baru);
    setCatatan(ucap ?? "");
    if (ucap) speakGuru(ucapkan(ucap));
  };
  const salah = (ucap: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setCatatan(ucap);
    speakGuru(ucapkan(ucap));
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-2 text-sm font-black ${nyala ? "border-[#92400E] bg-[#92400E] text-white" : "border-[#92400E] bg-white text-[#92400E]"}`;

  const ganti = (m: ModeKotak) => {
    ubah(
      pilihModeKotak(k, m),
      m === "congklak"
        ? "Papan congklak: biji merah di faktor bilangan pertama, biji putih di faktor bilangan kedua. Ketuk lubang yang berisi dua biji."
        : m === "kotak"
          ? "Atur banyak kotak sampai semua kue habis terbagi dan kotaknya sebanyak-banyaknya."
          : m === "tiga"
            ? "Sekarang tiga jenis kue. Atur banyak kotak sampai ketiganya habis terbagi."
            : "Pilih faktor persekutuan yang paling besar.",
    );
  };

  /* ------------------------------ Congklak ------------------------------ */
  const tc = targetCong(k);
  const papan = papanCong(k);
  const ketuk = (nomor: number) => {
    const r = ketukLubang(k, nomor);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Lubang itu tidak berisi dua biji, jadi tidak bisa ditandai.");
  };
  const periksaC = () => {
    const r = periksaCong(k);
    if (!r.ok) {
      ubah(r.k);
      return salah(petunjukCong(k));
    }
    const p = persekutuan(tc.bil);
    ubah(r.k, `Betul! Lubang berisi dua biji adalah ${daftarTeks(p)}, jadi itulah faktor persekutuan ${tc.bil[0]} dan ${tc.bil[1]}.`);
  };

  /* ------------------------------ Kotak dan tiga jenis ------------------------------ */
  const tk = targetKotak(k);
  const tt = targetTiga(k);
  const periksaK = () => {
    const r = periksaKotak(k);
    if (r.ok) return ubah(r.k, `Betul! ${tk.bil.map((b, i) => `${b} : ${k.banyakK} = ${b / k.banyakK} ${tk.nama[i].toLowerCase()}`).join(" dan ")} tiap kotak, dan semua kue terpakai.`);
    if (r.ditolak) return ubah(r.k, "Alat menolak. Masih ada kue bersisa, jadi banyak kotak belum membagi semua jenis sampai habis.");
    ubah(r.k);
    salah(petunjukKotak());
  };
  const periksaT = () => {
    const r = periksaTiga(k);
    if (r.ok) return ubah(r.k, `Betul! ${tt.bil.map((b, i) => `${b} : ${k.banyakT} = ${b / k.banyakT} ${tt.nama[i].toLowerCase()}`).join(", ")} tiap kotak, dan semua kue terpakai.`);
    if (r.ditolak) return ubah(r.k, "Alat menolak. Masih ada kue bersisa, jadi banyak kotak belum membagi ketiga jenis sampai habis.");
    ubah(r.k);
    salah(petunjukKotak());
  };

  /* ------------------------------ Terbesar ------------------------------ */
  const tb = targetBesar(k);
  const bersama = daftarBesar(k);
  const periksaB = () => {
    const r = periksaBesar(k);
    if (r.ok) return ubah(r.k, `Betul! Faktor persekutuan ${daftarTeks(bersama)}, yang paling besar ${fpb(tb.bil)}, jadi FPB ${tb.bil[0]} dan ${tb.bil[1]} adalah ${fpb(tb.bil)}.`);
    if (r.ditolak) return ubah(r.k, "Alat menolak. Pilih dulu satu faktor persekutuan sebelum memeriksa.");
    ubah(r.k);
    salah(petunjukBesar());
  };

  return (
    <div className="space-y-2" data-uji="simulasi-isi-kotak">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#92400E] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Isi Kotak</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_KOTAK_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "congklak" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">
              Biji merah: faktor {tc.bil[0]}. Biji putih: faktor {tc.bil[1]}. Tandai lubang yang berisi dua biji.
            </p>
            <div className="mx-auto grid max-w-[360px] grid-cols-8 gap-1 rounded-xl border-4 border-[#6B4423] bg-[#B7814A] p-1.5" role="group" aria-label="papan congklak" data-uji="papan-congklak">
              {papan.map((l) => {
                const nyala = k.pilihLubang.includes(l.nomor);
                return (
                  <button
                    key={l.nomor}
                    type="button"
                    onClick={() => ketuk(l.nomor)}
                    aria-pressed={nyala}
                    aria-label={`Lubang ${l.nomor}`}
                    data-lubang={l.nomor}
                    data-biji={l.biji}
                    className={`flex min-h-[44px] flex-col items-center justify-center rounded-lg border-2 px-0.5 ${nyala ? "border-[#FACC15] bg-[#FDE68A]" : "border-[#3F2A14] bg-[#78350F]"}`}
                  >
                    <span className={`text-sm font-black leading-none ${nyala ? "text-[#78350F]" : "text-[#FEF3C7]"}`}>{l.nomor}</span>
                    <span className="mt-0.5 flex h-2.5 items-center gap-0.5" aria-hidden="true">
                      {l.a ? <span className="block h-2 w-2 rounded-full border border-[#7F1D1D] bg-[#DC2626]" /> : null}
                      {l.b ? <span className="block h-2 w-2 rounded-full border border-[#64748B] bg-white" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaC}>
                {"\u{2705}"} Periksa lubang
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kotak" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">
              {tk.nama[0]} {tk.bil[0]} dan {tk.nama[1]} {tk.bil[1]} dibagi sama rata ke kotak.
            </p>
            <PanelBagi sasaran={tk} banyak={k.banyakK} hasil={bagiKotak(k)} batas={batasKotak(tk.bil)} onUbah={(a) => ubah(ubahKotak(k, a))} onPeriksa={periksaK} tombol={tombol} />
          </div>
        ) : null}

        {k.mode === "tiga" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">
              {tt.nama[0]} {tt.bil[0]}, {tt.nama[1]} {tt.bil[1]}, dan {tt.nama[2]} {tt.bil[2]} dibagi sama rata ke kotak.
            </p>
            <PanelBagi sasaran={tt} banyak={k.banyakT} hasil={bagiTiga(k)} batas={batasKotak(tt.bil)} onUbah={(a) => ubah(ubahTiga(k, a))} onPeriksa={periksaT} tombol={tombol} />
          </div>
        ) : null}

        {k.mode === "besar" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">
              Faktor {tb.bil[0]} dan faktor {tb.bil[1]}. Yang sama adalah faktor persekutuan.
            </p>
            <div className="mx-auto w-full max-w-[360px] space-y-1 rounded-xl border-2 border-[#92400E] bg-[#FEF3C7] p-1.5" data-uji="daftar-faktor">
              {tb.bil.map((n) => (
                <div key={n}>
                  <p className="text-[11px] font-black text-[#78350F]">Faktor {n}</p>
                  <div className="flex flex-wrap gap-1">
                    {faktorDari(n).map((f) => (
                      <span key={f} className={`min-w-[26px] rounded border px-1 py-0.5 text-center text-xs font-black ${bersama.includes(f) ? "border-[#B45309] bg-[#FDE68A] text-[#78350F]" : "border-[#92400E]/40 bg-white text-[#1C01A5]"}`}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mx-auto max-w-[360px]" role="group" aria-label="Pilih FPB">
              <p className="mb-1 text-center text-xs font-black text-[#1C01A5]">Faktor persekutuan: pilih yang terbesar</p>
              <div className="flex flex-wrap justify-center gap-2">
                {bersama.map((f, i) => (
                  <button
                    key={`${k.besarKe}-${f}`}
                    type="button"
                    onClick={() => ubah(pilihBesar(k, i))}
                    aria-pressed={k.pilihBesar === i}
                    className={`min-h-[48px] min-w-[52px] rounded-xl border-4 px-2 text-lg font-black text-[#1C01A5] ${k.pilihBesar === i ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#FCD34D] bg-white"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaB}>
                {"\u{2705}"} Periksa FPB
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiKotak(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "congklak" ? kalimatCong(k) : k.mode === "kotak" ? kalimatKotak(k) : k.mode === "tiga" ? kalimatTiga(k) : kalimatBesar(k))}
      </p>
    </div>
  );
}
