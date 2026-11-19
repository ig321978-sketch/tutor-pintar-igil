"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalBandul,
  beratPasang,
  jawabGkg,
  jawabKgg,
  jawabJumlah,
  jawabKurang,
  kalimatGkg,
  kalimatJumlah,
  kalimatKgg,
  kalimatKurang,
  kalimatRakit,
  kata,
  kosongkanRakit,
  mulaiLagiBandul,
  nilaiEmpat,
  pasangBandul,
  periksaGkg,
  periksaJumlah,
  periksaKgg,
  periksaKurang,
  periksaRakit,
  petunjukGkg,
  petunjukJumlah,
  petunjukKgg,
  petunjukKurang,
  petunjukRakit,
  pilihBendaBandul,
  pilihModeBandul,
  sebutBerat,
  targetGkg,
  targetJumlah,
  targetKgg,
  targetKurang,
  targetRakit,
  ubahGkg,
  ubahJumlah,
  ubahKgg,
  ubahKurang,
  type Empat,
  type KeadaanBandul,
  type ModeBandul,
} from "./logika";
import { BENDA_BANDUL, MISI_BANDUL_TEKS } from "./data-sim";
import { fmtBerat, fmtG, fmtKg, ribuan } from "./logika-cpa";
import { EMAS, GrupBandul } from "./GambarBandul";

/**
 * Simulasi Kelas 3 Bab 3 Sub-Bab D: Meja Bandul (Misi Meja Bandul), simulasi penutup bab. Benda yang ditimbang (apel, kaleng susu, karung dedak) dan berat sasaran berbeda dari Story.
 * Eksplorasi bebas tanpa skor, lima alat: Rakit (pasang bandul timbangan kodok sampai seimbang), Kg ke g (kali seribu), g ke kg (ambil tiap seribu gram), Jumlah dan Kurang (dua berat).
 */
const MODE: { id: ModeBandul; nama: string; ikon: string }[] = [
  { id: "rakit", nama: "Rakit", ikon: "\u{2696}\u{FE0F}" },
  { id: "kgg", nama: "Kg ke g", ikon: "\u{2716}\u{FE0F}" },
  { id: "gkg", nama: "g ke kg", ikon: "\u{2797}" },
  { id: "jumlah", nama: "Jumlah", ikon: "\u{2795}" },
  { id: "kurang", nama: "Kurang", ikon: "\u{2796}" },
];
const JENIS: { nama: string }[] = [{ nama: "1/2 ons" }, { nama: "1 ons" }, { nama: "2 ons" }, { nama: "1/2 kg" }, { nama: "1 kg" }];

/** Timbangan kodok: balok miring ke sisi yang lebih berat, seimbang bila berat bandul sama dengan berat benda. */
function Timbangan({ emoji, pasang, berat, target }: { emoji: string; pasang: readonly number[]; berat: number; target: number }) {
  const sel = berat - target;
  const dy = berat === 0 || sel === 0 ? 0 : sel < 0 ? 9 : -9;
  const dl = dy * 0.88;
  const dr = -dy * 0.88;
  const ada = pasang.filter((n) => n > 0).length;
  const baris = Math.max(1, Math.ceil(ada / 2));
  return (
    <svg viewBox="0 0 300 200" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" role="img" aria-label={sel === 0 && berat > 0 ? "Timbangan seimbang" : "Timbangan belum seimbang"}>
      <rect x={128} y={186} width={44} height={6} rx={3} fill="#92400E" />
      <rect x={147} y={40} width={6} height={148} fill="#B45309" />
      <line x1={50} y1={40 + dy} x2={250} y2={40 - dy} stroke="#92400E" strokeWidth={4} strokeLinecap="round" />
      <circle cx={150} cy={40} r={6} fill="#FBBF24" stroke="#92400E" strokeWidth={1.6} />
      <g transform={`translate(0 ${dl})`}>
        <line x1={62} y1={40} x2={22} y2={142} stroke="#78350F" strokeWidth={1.2} />
        <line x1={62} y1={40} x2={102} y2={142} stroke="#78350F" strokeWidth={1.2} />
        <rect x={18} y={142} width={88} height={7} rx={3} fill="#D6A15E" stroke="#92400E" strokeWidth={1.2} />
        {[0, 1, 2].map((i) => (
          <text key={i} x={40 + i * 22} y={136} textAnchor="middle" fontSize={21} aria-hidden="true">
            {emoji}
          </text>
        ))}
        <text x={62} y={166} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#92400E" aria-hidden="true">
          benda
        </text>
      </g>
      <g transform={`translate(0 ${dr})`}>
        <line x1={238} y1={40} x2={198} y2={142} stroke="#78350F" strokeWidth={1.2} />
        <line x1={238} y1={40} x2={278} y2={142} stroke="#78350F" strokeWidth={1.2} />
        <rect x={194} y={142} width={88} height={7} rx={3} fill="#D6A15E" stroke="#92400E" strokeWidth={1.2} />
        <GrupBandul set={pasang} x0={204} y0={134 - baris * 28} logam={EMAS} />
        <text x={238} y={166} textAnchor="middle" fontSize={8.6} fontWeight={900} fill="#92400E" aria-hidden="true">
          bandul
        </text>
      </g>
    </svg>
  );
}

export default function SimulasiMejaBandul({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBandul) => void }) {
  const [k, setK] = useState<KeadaanBandul>(() => awalBandul());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanBandul, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#0E7490] bg-[#0E7490] text-white" : "border-[#0E7490] bg-white text-[#0E7490]"}`;
  const langkahAngka = "min-h-[44px] min-w-[44px] rounded-lg border-2 border-[#1C01A5] bg-white px-2 text-base font-black text-[#1C01A5]";

  const benda = BENDA_BANDUL[k.benda];
  const ganti = (m: ModeBandul) => {
    ubah(
      pilihModeBandul(k, m),
      m === "rakit"
        ? "Pasang bandul sampai timbangan seimbang dengan berat benda."
        : m === "kgg"
          ? "Ubah kilogram ke gram dengan dikalikan seribu."
          : m === "gkg"
            ? "Ubah gram ke kilogram dengan mengambil tiap seribu gram."
            : m === "jumlah"
              ? "Jumlahkan dua berat setelah satuannya sama."
              : "Kurangkan dua berat setelah satuannya sama.",
    );
  };
  const pasang = (j: number, arah: 1 | -1) => {
    const r = pasangBandul(k, j, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu jenis bandul paling banyak sembilan." : "Bandul jenis itu belum dipasang.");
    ubah(r.k);
  };
  const periksaRakitKu = () => {
    const r = periksaRakit(k);
    if (r.ok) return ubah(r.k, `Betul! Timbangan seimbang pada ${sebutBerat(targetRakit(k).g)}.`);
    ubah(r.k);
    salah(petunjukRakit(k));
  };
  const periksaKggKu = () => {
    const r = periksaKgg(k);
    if (r.ok) return ubah(r.k, `Betul! ${sebutBerat(jawabKgg(k))}, yaitu ${kata(jawabKgg(k))} gram.`);
    ubah(r.k);
    salah(petunjukKgg(k));
  };
  const periksaGkgKu = () => {
    const r = periksaGkg(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(jawabGkg(k))} gram sama dengan ${sebutBerat(jawabGkg(k))}.`);
    ubah(r.k);
    salah(petunjukGkg(k));
  };
  const periksaJumlahKu = () => {
    const r = periksaJumlah(k);
    if (r.ok) return ubah(r.k, `Betul! Jumlah beratnya ${sebutBerat(jawabJumlah(k))}.`);
    ubah(r.k);
    salah(petunjukJumlah(k));
  };
  const periksaKurangKu = () => {
    const r = periksaKurang(k);
    if (r.ok) return ubah(r.k, `Betul! Sisa beratnya ${sebutBerat(jawabKurang(k))}.`);
    ubah(r.k);
    salah(petunjukKurang(k));
  };

  const stepper = (label: readonly string[], onUbah: (t: number, arah: 1 | -1) => void) => (
    <div className="mx-auto grid w-full max-w-[420px] grid-cols-4 gap-1" role="group" aria-label="Atur angka tiap tempat">
      {label.map((nama, t) => (
        <div key={nama} className="flex flex-col items-center gap-1">
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, 1)} aria-label={`Tambah angka ${nama}`}>
            {"\u{2795}"}
          </button>
          <button type="button" className={langkahAngka} onClick={() => onUbah(t, -1)} aria-label={`Kurangi angka ${nama}`}>
            {"\u{2796}"}
          </button>
          <span className="text-center text-[11px] font-black text-[#0E7490]">{nama}</span>
        </div>
      ))}
    </div>
  );
  const kotakAngka = (d: Empat, warna: string) => (
    <div className="mx-auto flex max-w-[420px] justify-center gap-2" aria-label="Angka yang diatur">
      {d.map((x, i) => (
        <span key={i} className="flex h-14 w-12 items-center justify-center rounded-xl border-4 bg-white text-3xl font-black" style={{ borderColor: warna, color: warna }}>
          {x}
        </span>
      ))}
    </div>
  );
  const ubahDigit = (f: (k: KeadaanBandul, t: number, arah: 1 | -1) => { k: KeadaanBandul; ok: boolean }) => (t: number, arah: 1 | -1) => {
    const r = f(k, t, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu tempat paling banyak sembilan." : "Tempat itu sudah nol.");
    ubah(r.k);
  };
  const LABEL_GRAM = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
  const LABEL_KG = ["kilogram", "ratusan g", "puluhan g", "satuan g"] as const;

  const tr = targetRakit(k);
  const tk = targetKgg(k);
  const tg = targetGkg(k);
  const tj = targetJumlah(k);
  const tu = targetKurang(k);
  const berat = beratPasang(k);

  return (
    <div className="space-y-3" data-uji="simulasi-meja-bandul">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#0E7490] bg-[#ECFEFF] p-2">
        <p className="text-sm font-black text-[#155E75]">Misi Meja Bandul</p>
        <p className="text-xs font-bold text-[#155E75]/80">{MISI_BANDUL_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih benda yang ditimbang">
        {BENDA_BANDUL.map((x, i) => (
          <button key={x.id} type="button" onClick={() => ubah(pilihBendaBandul(k, i), `Benda yang ditimbang sekarang ${x.nama}.`)} aria-pressed={k.benda === i} className={saklar(k.benda === i)}>
            <span aria-hidden="true">{x.emoji}</span> {x.nama}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "rakit" ? (
          <div className="space-y-2">
            <Timbangan emoji={benda.emoji} pasang={k.pasang} berat={berat} target={tr.g} />
            <p className="text-center text-sm font-black text-[#155E75]">
              Berat benda: {fmtG(tr.g)} ({fmtBerat(tr.g)}) · berat bandul: {fmtG(berat)}
            </p>
            <div className="mx-auto grid max-w-[420px] gap-1" role="group" aria-label="Pasang bandul">
              {JENIS.map((j, i) => (
                <div key={j.nama} className="flex items-center justify-between rounded-xl border-2 border-[#92400E] bg-[#FEF3C7] px-2 py-1">
                  <span className="text-sm font-black text-[#78350F]">Bandul {j.nama}</span>
                  <span className="flex items-center gap-2">
                    <button type="button" className={langkahAngka} onClick={() => pasang(i, -1)} aria-label={`Kurangi bandul ${j.nama}`}>
                      {"\u{2796}"}
                    </button>
                    <span className="w-6 text-center text-lg font-black text-[#1C01A5]">{k.pasang[i]}</span>
                    <button type="button" className={langkahAngka} onClick={() => pasang(i, 1)} aria-label={`Tambah bandul ${j.nama}`}>
                      {"\u{2795}"}
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(kosongkanRakit(k), "Bandul dikosongkan.")}>
                {"\u{21A9}"} Kosongkan
              </button>
              <button type="button" className={tombol} onClick={periksaRakitKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kgg" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#0E7490] bg-white p-2 text-center">
              <p className="text-xs font-black text-[#155E75]">Ubah kilogram ke gram (kali 1.000):</p>
              <p className="text-xl font-black text-[#1C01A5]">
                {fmtKg(tk.kg, tk.g)} = {nilaiEmpat(k.kgg) === 0 ? "…" : ribuan(nilaiEmpat(k.kgg))} g
              </p>
            </div>
            {kotakAngka(k.kgg, "#2563EB")}
            {stepper(LABEL_GRAM, ubahDigit(ubahKgg))}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKggKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "gkg" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#0E7490] bg-white p-2 text-center">
              <p className="text-xs font-black text-[#155E75]">Ubah gram ke kilogram (ambil tiap 1.000 g):</p>
              <p className="text-xl font-black text-[#1C01A5]">
                {fmtG(tg.g)} = {nilaiEmpat(k.gkg) === 0 ? "… kg … g" : fmtBerat(nilaiEmpat(k.gkg))}
              </p>
            </div>
            {kotakAngka(k.gkg, "#16A34A")}
            {stepper(LABEL_KG, ubahDigit(ubahGkg))}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaGkgKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jumlah" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#0E7490] bg-white p-2 text-center">
              <p className="text-xs font-black text-[#155E75]">Dua berat dicampur:</p>
              <p className="text-xl font-black text-[#1C01A5]">
                {fmtBerat(tj.a)} {"+"} {fmtBerat(tj.b)} = {nilaiEmpat(k.jumlah) === 0 ? "…" : fmtBerat(nilaiEmpat(k.jumlah))}
              </p>
            </div>
            {kotakAngka(k.jumlah, "#DC2626")}
            {stepper(LABEL_KG, ubahDigit(ubahJumlah))}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaJumlahKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kurang" ? (
          <div className="space-y-2">
            <div className="rounded-xl border-4 border-[#0E7490] bg-white p-2 text-center">
              <p className="text-xs font-black text-[#155E75]">Berat semula dikurangi berat yang diambil:</p>
              <p className="text-xl font-black text-[#1C01A5]">
                {fmtBerat(tu.a)} {"−"} {fmtBerat(tu.b)} = {nilaiEmpat(k.kurang) === 0 ? "…" : fmtBerat(nilaiEmpat(k.kurang))}
              </p>
            </div>
            {kotakAngka(k.kurang, "#7C3AED")}
            {stepper(LABEL_KG, ubahDigit(ubahKurang))}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaKurangKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiBandul(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "rakit" ? kalimatRakit(k) : k.mode === "kgg" ? kalimatKgg(k) : k.mode === "gkg" ? kalimatGkg(k) : k.mode === "jumlah" ? kalimatJumlah(k) : kalimatKurang(k))}
      </p>
    </div>
  );
}
