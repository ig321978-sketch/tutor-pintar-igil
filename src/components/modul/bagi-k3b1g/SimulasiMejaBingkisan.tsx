"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import { Keranjang, Teks, Tumpukan } from "./LangkahBagi";
import { LEBAR_ADEGAN, TINGGI_ADEGAN } from "./periksa";
import { MISI_BAGI_TEKS } from "./data-sim";
import {
  SUARA_MODE,
  awalBagi,
  bagikanPutaran,
  kalimatBagi,
  kartuKeluarga,
  kataBil,
  ketukKartu,
  lompatMundur,
  mulaiLagiBagi,
  periksaBagi,
  periksaKeluarga,
  periksaKurang,
  periksaPeriksa,
  periksaTulis,
  pilihModeBagi,
  posisiKurang,
  sisaTumpukan,
  tugasBagi,
  tugasKeluarga,
  tugasKurang,
  tugasPeriksa,
  tugasTulis,
  ubahHitung,
  ubahIsi,
  ubahKali,
  ubahTulis,
  ulangBagi,
  ulangKeluarga,
  ulangKurang,
  ulangPeriksa,
  ulangTulis,
  type Hasil,
  type KeadaanBagi,
  type ModeBagi,
} from "./logika";

/**
 * Simulasi Kelas 3 Bab 1 Sub-Bab G: Meja Bingkisan (Misi Meja Bingkisan). Lima alat tanpa skor: Bagi (bagikan bergiliran ke keranjang sampai habis), Kurang (lompat mundur di garis bilangan),
 * Tulis (tulis bilangan yang dibagi, pembagi, dan hasil bagi), Keluarga (pilih kalimat keluarga fakta), Periksa (isi hasil kali pembagi dan hasil bagi).
 */
const MODE: { id: ModeBagi; nama: string; ikon: string }[] = [
  { id: "bagi", nama: "Bagi", ikon: "\u{1F9FA}" },
  { id: "kurang", nama: "Kurang", ikon: "\u{2796}" },
  { id: "tulis", nama: "Tulis", ikon: "\u{270D}" },
  { id: "keluarga", nama: "Keluarga", ikon: "\u{1F46A}" },
  { id: "periksa", nama: "Periksa", ikon: "\u{2716}" },
];

const KERTAS = "mx-auto block w-full max-w-[420px] rounded-2xl bg-white/90";

function Pencacah({ nama, nilai, langkah, onUbah }: { nama: string; nilai: number; langkah: number[]; onUbah: (d: number) => void }) {
  const tombol = "min-h-[44px] min-w-[44px] rounded-full border-2 border-[#9A3412] bg-white px-2 text-sm font-black text-[#9A3412] disabled:opacity-40";
  const turun = [...langkah].sort((a, b) => b - a);
  const naik = [...langkah].sort((a, b) => a - b);
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      <span className="text-sm font-black text-[#7C2D12]">{nama}</span>
      {turun.map((d) => (
        <button key={`-${d}`} type="button" className={tombol} aria-label={`Kurangi ${nama} sebanyak ${kataBil(d)}`} onClick={() => onUbah(-d)}>
          -{d}
        </button>
      ))}
      <span className="w-10 text-center text-xl font-black text-[#1C01A5]">{nilai}</span>
      {naik.map((d) => (
        <button key={`+${d}`} type="button" className={tombol} aria-label={`Tambah ${nama} sebanyak ${kataBil(d)}`} onClick={() => onUbah(d)}>
          +{d}
        </button>
      ))}
    </div>
  );
}

/** Gambar bagi rata: tumpukan yang tersisa dan isi tiap keranjang. */
function GambarBagi({ n, g, putaran, ikon }: { n: number; g: number; putaran: number; ikon: string }) {
  const sisa = Math.max(0, n - g * putaran);
  const w = (280 - 5 * (g - 1)) / g;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={KERTAS} role="img" aria-label={`Tumpukan ${n} bingkisan dan ${g} keranjang`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#FFF7ED" stroke="#C2410C" strokeWidth={2} />
      <Teks x={150} y={16} u={9} isi={sisa === 0 ? "tumpukan habis" : `tumpukan: ${sisa}`} warna="#9A3412" />
      {sisa > 0 ? <Tumpukan n={sisa} x={14} y={22} w={272} h={64} rupa="benda" ikon={ikon} /> : null}
      <Keranjang g={g} y={98} h={90} rupa="benda" />
      {Array.from({ length: g }, (_, i) => (putaran > 0 ? <Tumpukan key={i} n={putaran} x={10 + i * (w + 5) + 3} y={118} w={w - 6} h={46} rupa="benda" ikon={ikon} /> : null))}
    </svg>
  );
}

/** Garis bilangan mundur: tanda tiap g, penanda di posisi sekarang, dan busur lompatan. */
function GambarKurang({ n, g, lompat }: { n: number; g: number; lompat: number }) {
  const q = n / g;
  const sx = (v: number): number => 22 + (v * 256) / n;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={KERTAS} role="img" aria-label={`Garis bilangan dari ${n} mundur sebesar ${g}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#EFF6FF" stroke="#2563EB" strokeWidth={2} />
      <line x1={sx(0)} y1={122} x2={sx(n)} y2={122} stroke="#1C01A5" strokeWidth={2} />
      {Array.from({ length: q + 1 }, (_, i) => i * g).map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={117} x2={sx(v)} y2={127} stroke="#1C01A5" strokeWidth={1.6} />
          <Teks x={sx(v)} y={141} u={9} isi={String(v)} />
        </g>
      ))}
      {Array.from({ length: lompat }, (_, i) => {
        const dari = n - g * i;
        return <path key={i} d={`M${sx(dari)} 118 Q${(sx(dari) + sx(dari - g)) / 2} 76 ${sx(dari - g)} 118`} fill="none" stroke="#DC2626" strokeWidth={2} />;
      })}
      <circle cx={sx(Math.max(0, n - g * lompat))} cy={122} r={5} fill="#DC2626" stroke="#FFFFFF" strokeWidth={1.4} />
      <Teks x={150} y={180} u={10} isi={`mulai dari ${n}, tiap lompatan ${g}`} warna="#1E3A8A" />
    </svg>
  );
}

/** Gambar tulis pembagian: g keranjang berisi sama banyak. */
function GambarTulis({ n, g, ikon }: { n: number; g: number; ikon: string }) {
  const q = n / g;
  const w = (280 - 5 * (g - 1)) / g;
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} ${TINGGI_ADEGAN}`} className={KERTAS} role="img" aria-label={`${g} keranjang berisi sama banyak, jumlah seluruhnya ${n}`}>
      <rect x={2} y={2} width={296} height={196} rx={8} fill="#FFF7ED" stroke="#C2410C" strokeWidth={2} />
      <Teks x={150} y={18} u={10} isi={`${g} keranjang, tiap keranjang ${q}`} warna="#9A3412" />
      <Keranjang g={g} y={30} h={150} rupa="benda" />
      {Array.from({ length: g }, (_, i) => (
        <Tumpukan key={i} n={q} x={10 + i * (w + 5) + 3} y={52} w={w - 6} h={118} rupa="benda" ikon={ikon} />
      ))}
    </svg>
  );
}

/** Rumah segitiga keluarga fakta: tiga bilangan. */
function GambarKeluarga({ a, b }: { a: number; b: number }) {
  return (
    <svg viewBox={`0 0 ${LEBAR_ADEGAN} 120`} className={KERTAS} role="img" aria-label={`Rumah segitiga tiga bilangan ${a}, ${b}, dan ${a * b}`}>
      <rect x={2} y={2} width={296} height={116} rx={8} fill="#F5F3FF" stroke="#6D28D9" strokeWidth={2} />
      <polygon points="150,10 96,100 204,100" fill="#FEF9C3" stroke="#1C01A5" strokeWidth={2} />
      <Teks x={150} y={52} u={20} isi={String(a * b)} warna="#DC2626" />
      <Teks x={122} y={90} u={18} isi={String(a)} />
      <Teks x={178} y={90} u={18} isi={String(b)} />
    </svg>
  );
}

export default function SimulasiMejaBingkisan({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanBagi) => void }) {
  const [k, setK] = useState<KeadaanBagi>(() => awalBagi());
  const [catatan, setCatatan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanBagi, ucap?: string) => {
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
  const terapkan = (r: Hasil) => {
    if (r.ok) ubah(r.k, r.pesan);
    else {
      ubah(r.k);
      salah(r.pesan);
    }
  };
  const tombol = "min-h-[44px] rounded-full border-2 border-[#9A3412] bg-white px-3 text-sm font-black text-[#9A3412] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#9A3412] bg-[#9A3412] text-white" : "border-[#9A3412] bg-white text-[#9A3412]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 text-base font-black ${nyala ? "border-[#DC2626] bg-[#FEF08A] text-[#78350F]" : "border-[#9A3412] bg-[#FFF7ED] text-[#7C2D12]"}`;
  const ganti = (m: ModeBagi) => ubah(pilihModeBagi(k, m), SUARA_MODE[m]);
  const ulang = () => {
    if (k.mode === "bagi") ubah(ulangBagi(k), "Bingkisan dikembalikan ke tumpukan. Bagikan lagi dari awal.");
    else if (k.mode === "kurang") ubah(ulangKurang(k), "Penanda kembali ke awal. Lompat mundur lagi.");
    else if (k.mode === "tulis") ubah(ulangTulis(k), "Isian dikosongkan. Tulis pembagiannya lagi.");
    else if (k.mode === "keluarga") ubah(ulangKeluarga(k), "Pilihan dibatalkan. Pilih kalimat lagi.");
    else ubah(ulangPeriksa(k), "Hasil kali dikembalikan. Hitung lagi.");
  };

  const tb = tugasBagi(k);
  const tk = tugasKurang(k);
  const tt = tugasTulis(k);
  const tf = tugasKeluarga(k);
  const tp = tugasPeriksa(k);
  const kartu = kartuKeluarga(tf.a, tf.b);

  return (
    <div className="space-y-3" data-uji="simulasi-meja-bingkisan">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#9A3412] bg-[#FFF7ED] p-2">
        <p className="text-sm font-black text-[#7C2D12]">Misi Meja Bingkisan</p>
        <p className="text-xs font-bold text-[#7C2D12]/80">{MISI_BAGI_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border-[6px] border-[#C2410C] bg-[#FFFBEB] p-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "bagi" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">
              Bagikan {tb.n} bingkisan ke {tb.g} keranjang, satu putaran tiap tekan. Sisa di tumpukan: {sisaTumpukan(k)}
            </p>
            <GambarBagi n={tb.n} g={tb.g} putaran={k.bagiPutaran} ikon={tb.ikon} />
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <button type="button" className={tombol} disabled={sisaTumpukan(k) === 0} onClick={() => terapkan(bagikanPutaran(k))}>
                Bagikan satu putaran
              </button>
            </div>
            <div className="mt-2 space-y-1">
              <Pencacah nama="Isi tiap keranjang:" nilai={k.bagiIsi} langkah={[1]} onUbah={(d) => ubah(ubahIsi(k, d > 0 ? 1 : -1))} />
              <div className="flex justify-center">
                <button type="button" className={tombol} onClick={() => terapkan(periksaBagi(k))}>
                  Periksa
                </button>
              </div>
            </div>
          </>
        ) : null}
        {k.mode === "kurang" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">
              Mulai dari {tk.n}, lompat mundur {tk.g} tiap tekan sampai nol. Posisi: {posisiKurang(k)}
            </p>
            <GambarKurang n={tk.n} g={tk.g} lompat={k.kurangLompat} />
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
              <button type="button" className={tombol} disabled={posisiKurang(k) === 0} onClick={() => terapkan(lompatMundur(k))}>
                Lompat mundur
              </button>
            </div>
            <div className="mt-2 space-y-1">
              <Pencacah nama="Banyak lompatan:" nilai={k.kurangHitung} langkah={[1]} onUbah={(d) => ubah(ubahHitung(k, d > 0 ? 1 : -1))} />
              <div className="flex justify-center">
                <button type="button" className={tombol} onClick={() => terapkan(periksaKurang(k))}>
                  Periksa
                </button>
              </div>
            </div>
          </>
        ) : null}
        {k.mode === "tulis" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">Lihat gambar, lalu tulis pembagiannya: bilangan yang dibagi : pembagi = hasil bagi</p>
            <GambarTulis n={tt.n} g={tt.g} ikon={tt.ikon} />
            <div className="mt-2 space-y-1">
              <Pencacah nama="Dibagi:" nilai={k.tulisA} langkah={[1, 10]} onUbah={(d) => ubah(ubahTulis(k, "a", d))} />
              <Pencacah nama="Pembagi:" nilai={k.tulisB} langkah={[1]} onUbah={(d) => ubah(ubahTulis(k, "b", d))} />
              <Pencacah nama="Hasil bagi:" nilai={k.tulisC} langkah={[1]} onUbah={(d) => ubah(ubahTulis(k, "c", d))} />
              <p className="text-center text-2xl font-black text-[#1C01A5]">
                {k.tulisA} : {k.tulisB} = {k.tulisC}
              </p>
              <div className="flex justify-center">
                <button type="button" className={tombol} onClick={() => terapkan(periksaTulis(k))}>
                  Periksa
                </button>
              </div>
            </div>
          </>
        ) : null}
        {k.mode === "keluarga" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">Pilih semua kalimat keluarga fakta, lalu tekan Periksa</p>
            <GambarKeluarga a={tf.a} b={tf.b} />
            <div className="mt-2 grid grid-cols-2 gap-2" role="group" aria-label="Pilih kalimat keluarga fakta">
              {kartu.map((c, i) => (
                <button key={`${c.teks}-${i}`} type="button" aria-pressed={k.keluargaPilih.includes(i)} className={pilihan(k.keluargaPilih.includes(i))} onClick={() => ubah(ketukKartu(k, i))}>
                  {c.teks}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-center">
              <button type="button" className={tombol} onClick={() => terapkan(periksaKeluarga(k))}>
                Periksa
              </button>
            </div>
          </>
        ) : null}
        {k.mode === "periksa" ? (
          <>
            <p className="mb-1 text-center text-xs font-black text-[#7C2D12]">Periksa dengan kali: pembagi kali hasil bagi harus sama dengan bilangan yang dibagi</p>
            <div className="rounded-2xl bg-white/90 p-3 text-center">
              <p className="text-2xl font-black text-[#1C01A5]">
                {tp.n} : {tp.g} = {tp.q}
              </p>
              <p className="text-2xl font-black text-[#DC2626]">
                {tp.g} × {tp.q} = {k.periksaKali}
              </p>
            </div>
            <div className="mt-2 space-y-1">
              <Pencacah nama="Hasil kali:" nilai={k.periksaKali} langkah={[1, 10]} onUbah={(d) => ubah(ubahKali(k, d))} />
              <div className="flex justify-center">
                <button type="button" className={tombol} onClick={() => terapkan(periksaPeriksa(k))}>
                  Periksa
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={ulang}>
          {"\u{1F504}"} Ulangi
        </button>
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiBagi(), "Mulai lagi dari awal.")}>
          Mulai dari awal
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatBagi(k)}
      </p>
    </div>
  );
}

