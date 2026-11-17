"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_CARA_TUTUP,
  URUT_CARA_TUTUP,
  awalTutup,
  bisaCara,
  kalimatTutup,
  kata,
  langkahSelesai,
  laporkan,
  mainLagi,
  majuTutup,
  periksaTambah,
  pilihCara,
  pilihLapak,
  posisiTutup,
  satuan,
  semuaDiperiksa,
  semuaDilaporkan,
  sisaDagang,
  tuntasTutup,
  tutupPasar,
  ulangLangkah,
  type CaraTutup,
  type KeadaanTutup,
} from "./logika";
import { DAGANG_SIM, MISI_TUTUP } from "./data";

/**
 * Simulasi Kelas 1 Bab 6 Sub-Bab C: Misi Pasar Malam, Meja Tutup Lapak (sekaligus penutup bab). Dagangan berbeda dari Story.
 * Eksplorasi bebas tanpa skor: pilih lapak, pilih cara mencari sisa (Mundur, Kurangi satuan, Pikir penjumlahan, Lewat sepuluh),
 * jalankan langkah satu per satu, laporkan sisa, periksa dengan menambah, lalu tutup pasar malam dengan perayaan akhir cerita bab.
 */
const D = DAGANG_SIM;
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const ID_LAPAK = D.map((x) => x.id);

/** Chip dagangan: tampil biasa, diambil (dicoret), kosong (tempat menunggu), atau baru terisi. */
function Chip({ ikon, status }: { ikon: string; status: "biasa" | "ambil1" | "ambil2" | "kosong" | "baru" }) {
  const gaya =
    status === "kosong"
      ? "border-dashed border-[#6366F1] bg-white text-transparent"
      : status === "ambil1"
        ? "border-[#DC2626] bg-[#FEE2E2] opacity-50"
        : status === "ambil2"
          ? "border-[#EA580C] bg-[#FFEDD5] opacity-50"
          : status === "baru"
            ? "border-[#15803D] bg-[#DCFCE7]"
            : "border-[#4338CA] bg-[#EEF2FF]";
  return (
    <span className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 text-[13px] leading-none ${gaya}`} aria-hidden="true">
      {ikon}
      {status === "ambil1" || status === "ambil2" ? <span className={`absolute text-[15px] font-black ${status === "ambil1" ? "text-[#DC2626]" : "text-[#EA580C]"}`}>×</span> : null}
    </span>
  );
}

export default function SimulasiMejaTutup({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTutup) => void }) {
  const [k, setK] = useState<KeadaanTutup>(awalTutup);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanTutup, ucap?: string) => {
    setK(baru);
    if (ucap) speakGuru(ucap);
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#1C01A5] bg-white px-3 text-sm font-black text-[#1C01A5] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#4338CA] bg-[#4338CA] text-white" : "border-[#4338CA] bg-white text-[#4338CA]"}`;

  const x = D.find((d) => d.id === k.lapak);
  const n = x ? langkahSelesai(k.cara, x) : 0;
  const bisa = x ? bisaCara(k.cara, x) : false;
  const tuntas = tuntasTutup(k, D);
  const sudahCaraLapor = x ? (k.lapor[x.id] ?? []).includes(k.cara) : false;
  const sudahLapor = x ? (k.lapor[x.id] ?? []).length > 0 : false;
  const sudahPeriksa = x ? k.periksa.includes(x.id) : false;

  const pilihCaraUcap = (c: CaraTutup) => {
    const baru = pilihCara(k, c);
    ubah(baru, kalimatTutup(baru, D));
  };
  const maju = () => {
    const baru = majuTutup(k, D);
    if (baru === k || !x) return;
    const pos = posisiTutup(k.cara, x, baru.langkah);
    ubah(baru, baru.langkah >= n ? kalimatTutup(baru, D) : String(kata(pos)));
  };

  /** Chip untuk lapak terpilih sesuai cara dan banyak langkah. */
  const chip = (i: number): "biasa" | "ambil1" | "ambil2" | "kosong" | "baru" => {
    if (!x) return "biasa";
    if (k.cara === "pikir") return i < x.jual ? "biasa" : i < x.jual + k.langkah ? "baru" : "kosong";
    if (k.cara === "lewat" && bisa) {
      const s = satuan(x.awal);
      if (i >= 10) return k.langkah > i - 10 ? "ambil1" : "biasa";
      const dariAkhir = 9 - i;
      return k.langkah > s && dariAkhir < k.langkah - s ? "ambil2" : "biasa";
    }
    return bisa && i >= x.awal - k.langkah ? "ambil1" : "biasa";
  };
  const jejak = x && bisa ? Array.from({ length: k.langkah + 1 }, (_, i) => posisiTutup(k.cara, x, i)) : [];

  return (
    <div className="space-y-3">
      <style>{CSS_LEMARI}</style>
      <p className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] p-2 text-center text-sm font-bold text-[#1C01A5]">{MISI_TUTUP}</p>

      {k.tutup ? (
        <div className="relative overflow-hidden rounded-2xl border-4 border-[#FDE047] bg-[#1E1B4B] p-3 text-center">
          <style>{`@keyframes mt-naik{0%{transform:translateY(120px) scale(0.6);opacity:0}30%{opacity:1}100%{transform:translateY(-20px) scale(1.1);opacity:0.2}}`}</style>
          {Array.from({ length: 16 }, (_, i) => (
            <span key={i} className="absolute bottom-0 block h-2 w-2 rounded-full" style={{ left: `${(i * 37) % 100}%`, background: ["#FDE047", "#F472B6", "#67E8F9", "#A3E635"][i % 4], animation: `mt-naik ${2 + (i % 5) * 0.4}s ease-out ${(i % 6) * 0.3}s infinite` }} aria-hidden="true" />
          ))}
          <p className="mx-auto inline-block rounded-lg border-4 border-[#BE123C] bg-white px-3 py-1 text-xl font-black tracking-widest text-[#BE123C]">TUTUP, TERIMA KASIH</p>
          <p className="mt-2 text-base font-black text-[#FEF08A]">Pasar malam resmi ditutup! Misi Pasar Malam dan cerita bab ini selesai.</p>
          <button type="button" className={`${tombol} mt-2`} onClick={() => ubah(mainLagi(k), "Main lagi dari awal.")}>
            {"\u{1F504}"} Main lagi
          </button>
        </div>
      ) : null}

      {/* Meja tutup lapak: empat lapak */}
      <div className="rounded-2xl border-4 border-[#312E81] p-2" style={{ background: "repeating-linear-gradient(90deg,#E0E7FF 0 18px,#EEF2FF 18px 36px)" }}>
        <p className="mb-1 text-center text-xs font-black text-[#312E81]">{"\u{1F3EE}"} Meja tutup lapak (ketuk satu lapak)</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {D.map((d) => {
            const lapor = (k.lapor[d.id] ?? []).length > 0;
            const aktif = k.lapak === d.id;
            return (
              <button
                key={d.id}
                type="button"
                disabled={k.tutup}
                onClick={() => ubah(pilihLapak(k, d.id, D), `${d.nama}. Semula ${kata(d.awal)}, terjual ${kata(d.jual)}.`)}
                aria-label={`${d.nama}, semula ${d.awal}, terjual ${d.jual}${lapor ? ", sisa sudah dilaporkan" : ""}`}
                className={`flex min-h-[92px] flex-col items-center justify-between rounded-xl border-4 p-1 disabled:opacity-60 ${aktif ? "border-[#15803D] bg-[#DCFCE7]" : "border-[#4338CA] bg-white"}`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {d.ikon}
                </span>
                <span className="text-xs font-black text-[#1C01A5]">{d.nama}</span>
                <span className="text-[11px] font-bold text-[#1C01A5]/80">
                  semula {d.awal} · terjual {d.jual}
                </span>
                <span className="flex flex-wrap justify-center gap-0.5 text-[10px] font-black">
                  {lapor ? <span className="rounded-full bg-[#15803D] px-1.5 text-white">sisa {sisaDagang(d)}</span> : null}
                  {k.periksa.includes(d.id) ? <span className="rounded-full bg-[#FACC15] px-1.5 text-[#1C01A5]">diperiksa</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Pilih cara mencari sisa">
        {URUT_CARA_TUTUP.map((c) => (
          <button key={c} type="button" aria-pressed={k.cara === c} disabled={k.tutup} className={saklar(k.cara === c)} onClick={() => pilihCaraUcap(c)}>
            {NAMA_CARA_TUTUP[c]}
          </button>
        ))}
      </div>

      {x ? (
        <div className="rounded-2xl border-4 border-[#4338CA] bg-white p-2 text-center">
          <p className="text-sm font-black text-[#4338CA]">
            {x.ikon} {x.nama}: {x.awal} dikurangi {x.jual}
          </p>
          {bisa ? (
            <>
              <div className="mx-auto mt-2 grid max-w-[290px] grid-cols-10 justify-items-center gap-1" aria-hidden="true">
                {Array.from({ length: x.awal }, (_, i) => (
                  <Chip key={i} ikon={x.ikon} status={chip(i)} />
                ))}
              </div>
              <p className="mt-2 text-3xl font-black text-[#1C01A5]" aria-live="polite">
                {posisiTutup(k.cara, x, k.langkah)}
              </p>
              <p className="text-xs font-bold text-[#1C01A5]/80">
                {k.cara === "mundur" ? `Mundur: ${jejak.join(" → ")}` : null}
                {k.cara === "satuan" ? `Puluhan 1 tetap, satuan ${satuan(x.awal) - k.langkah}` : null}
                {k.cara === "pikir" ? `${x.jual} ditambah ${k.langkah} jadi ${x.jual + k.langkah}, target ${x.awal}` : null}
                {k.cara === "lewat" ? (k.langkah <= satuan(x.awal) ? `Langkah satu: kurangi ${k.langkah} dari ${satuan(x.awal)} sampai tinggal 10` : `Langkah dua: kurangi sisanya dari 10, ${k.langkah - satuan(x.awal)} dari ${x.jual - satuan(x.awal)}`) : null}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                <button type="button" className={tombol} disabled={k.langkah >= n || k.tutup} onClick={maju}>
                  {k.cara === "mundur" ? "Mundur satu" : k.cara === "pikir" ? "Tambah satu" : "Kurangi satu"}
                </button>
                <button type="button" className={tombol} disabled={k.langkah === 0 || k.tutup} onClick={() => ubah(ulangLangkah(k), "Mulai lagi dari awal.")}>
                  {"\u{1F504}"} Ulang langkah
                </button>
                <button type="button" className={tombol} disabled={!tuntas || sudahCaraLapor || k.tutup} onClick={() => ubah(laporkan(k, D), `Sisa ${kata(sisaDagang(x))} dilaporkan ke Pak RT.`)}>
                  {"\u{1F4CB}"} Laporkan sisa
                </button>
                <button type="button" className={tombol} disabled={!sudahLapor || sudahPeriksa || k.tutup} onClick={() => ubah(periksaTambah(k), `${besar(kata(sisaDagang(x)))} ditambah ${kata(x.jual)} sama dengan ${kata(x.awal)}. Cocok.`)}>
                  {"\u{2705}"} Periksa dengan menambah
                </button>
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm font-black text-[#B45309]">{k.cara === "satuan" ? "Satuannya kurang dari yang diambil, jadi cara ini belum bisa. Coba Lewat sepuluh." : "Satuannya cukup, jadi tidak perlu lewat sepuluh. Coba Kurangi satuan."}</p>
          )}
        </div>
      ) : null}

      <div className="flex justify-center">
        <button type="button" className={tombol} disabled={k.tutup || !semuaDiperiksa(k, D)} onClick={() => ubah(tutupPasar(k, D), "Pasar malam resmi ditutup! Semua sisa dagangan sudah dilaporkan dan diperiksa. Hebat!")}>
          {"\u{1F386}"} Tutup pasar malam
        </button>
      </div>
      <p className="text-center text-xs font-bold text-[#1C01A5]/70">
        Dilaporkan {ID_LAPAK.filter((id) => (k.lapor[id] ?? []).length > 0).length} dari {D.length} lapak{semuaDilaporkan(k, D) && !k.tutup ? ". Periksa semuanya dengan menambah." : ""}
      </p>

      <p role="status" aria-live="polite" className="text-center text-sm font-black text-[#1C01A5]">
        {kalimatTutup(k, D)}
      </p>
    </div>
  );
}
