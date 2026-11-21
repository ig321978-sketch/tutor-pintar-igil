"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalMosaik,
  bidangPasang,
  garisSudut,
  hasilPasang,
  hubungkan,
  kalimatBagi,
  kalimatPasang,
  kalimatSudut,
  kurangiGaris,
  mulaiLagiMosaik,
  pasangKeping,
  periksaBagi,
  periksaPasang,
  periksaSudut,
  petunjukBagi,
  petunjukPasang,
  petunjukSudut,
  pilihBanyak,
  pilihKeping,
  pilihModeMosaik,
  pilihSisi,
  segitigaSudut,
  tambahGaris,
  targetBagi,
  targetPasang,
  targetSudut,
  type KeadaanMosaik,
  type ModeMosaik,
  type SisiPasang,
} from "./logika";
import { beraturanN, cembungN, type Bidang } from "./logika-cpa";
import { BangunSvg, WARNA_KEPING, muatkan } from "./GambarMosaik";
import { MISI_MOSAIK_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 5 Sub-Bab B: Mosaik Keramik (penutup bab, tema Toko Keramik Bu Dewi). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Pasang (pilih dua keping dari rak dan sisi yang dipertemukan; alat menolak dua keping yang tidak sama besar), Bagi (tarik garis dari titik tengah ke tiap sudut, lalu pilih banyak segitiga;
 * alat menolak garis yang melebihi banyak sudut), dan Sudut (tarik garis dari satu sudut ke sudut yang tidak bersebelahan; alat menolak sudut yang bersebelahan).
 * Semua bangun digambar dari koordinat. Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeMosaik; nama: string; ikon: string }[] = [
  { id: "pasang", nama: "Pasang", ikon: "\u{1F9E9}" },
  { id: "bagi", nama: "Bagi", ikon: "\u{1F53A}" },
  { id: "sudut", nama: "Sudut", ikon: "\u{1F4D0}" },
];

const LEBAR = 300;
const TINGGI = 150;
const poligon = (p: Bidang, f: (t: [number, number]) => [number, number]): string => p.map((t) => f(t).join(",")).join(" ");

/** Bangun n sisi dengan garis dari titik tengah (jumlah garis sungguh sebanyak `garis`, urut dari sudut pertama). */
function GambarBagi({ n, garis }: { n: number; garis: number }) {
  const p = beraturanN(n);
  const f = muatkan([p]);
  const c = f([0, 0]);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={`bangun beraturan ${n} sisi dengan ${garis} garis dari titik tengah`} data-garis={garis}>
      <polygon points={poligon(p, f)} fill="#FDBA74" stroke="#92400E" strokeWidth={2.6} strokeLinejoin="round" />
      {p.slice(0, garis).map((t, i) => (
        <line key={i} x1={c[0]} y1={c[1]} x2={f(t)[0]} y2={f(t)[1]} stroke="#7C2D12" strokeWidth={2.2} data-garis-tarik="1" />
      ))}
      <circle cx={c[0]} cy={c[1]} r={4} fill="#7C2D12" />
    </svg>
  );
}
/** Segi banyak cembung n sisi dengan garis dari sudut pertama ke sudut yang sudah dihubungkan. */
function GambarSudut({ n, hubung }: { n: number; hubung: number[] }) {
  const p = cembungN(n);
  const f = muatkan([p]);
  return (
    <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} className="mx-auto w-full max-w-[300px]" role="img" aria-label={`segi banyak ${n} sisi dengan ${hubung.length} garis dari sudut pertama`} data-garis={hubung.length}>
      <polygon points={poligon(p, f)} fill="#FDBA74" stroke="#92400E" strokeWidth={2.6} strokeLinejoin="round" />
      {hubung.map((i) => (
        <line key={i} x1={f(p[0])[0]} y1={f(p[0])[1]} x2={f(p[i])[0]} y2={f(p[i])[1]} stroke="#7C2D12" strokeWidth={2.2} data-garis-tarik="1" />
      ))}
      {p.map((t, i) => (
        <text key={i} x={f(t)[0]} y={f(t)[1] - 6} textAnchor="middle" fontSize={11} fontWeight={900} fill="#1C01A5">
          {i + 1}
        </text>
      ))}
    </svg>
  );
}
/** Satu keping segitiga siku-siku sama kaki dalam rak, berukuran sebanding panjang kakinya. */
function KepingRak({ a, nomor }: { a: number; nomor: number }) {
  const sisi = 18 + a * 12;
  return (
    <svg viewBox="0 0 60 60" width={sisi} height={sisi} aria-hidden="true">
      <polygon points="4,56 56,56 4,4" fill={WARNA_KEPING[nomor % WARNA_KEPING.length]} stroke="#92400E" strokeWidth={3} strokeLinejoin="round" />
    </svg>
  );
}

export default function SimulasiMosaikKeramik({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanMosaik) => void }) {
  const [k, setK] = useState<KeadaanMosaik>(() => awalMosaik());
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
  const ubah = (baru: KeadaanMosaik, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] w-full rounded-xl border-4 px-1 py-1 text-center text-base font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeMosaik) => {
    ubah(pilihModeMosaik(k, m), m === "pasang" ? "Pilih dua keping dan sisi yang dipertemukan, lalu tekan Pasang." : m === "bagi" ? "Tarik garis dari titik tengah ke tiap sudut." : "Hubungkan sudut pertama dengan sudut yang tidak bersebelahan.");
  };

  const tp = targetPasang(k);
  const tb = targetBagi(k);
  const ts = targetSudut(k);
  const hasil = hasilPasang(k);
  const bidangHasil = k.terpasang && k.sisi !== null && k.pilih.length === 2 ? bidangPasang(tp.rak[k.pilih[0]], k.sisi) : null;

  const pasangK = () => {
    const r = pasangKeping(k);
    if (r.ok) return ubah(r.k);
    if (r.sebab === "beda") return ubah(r.k, "Alat menolak. Kedua keping tidak sama besar, jadi sisinya tidak bisa rapat tanpa celah.");
    salah(r.sebab === "sisi" ? "Pilih dulu sisi yang dipertemukan." : "Pilih dua keping dari rak dulu.");
  };
  const periksaP = () => {
    const r = periksaPasang(k);
    if (r.ok) return ubah(r.k, "Betul! Bangun yang terbentuk sama dengan sasaran.");
    ubah(r.k);
    salah(petunjukPasang(k));
  };
  const garisK = () => {
    const r = tambahGaris(k);
    if (r.ok) return ubah(r.k);
    ubah(r.k, "Alat menolak. Semua sudut sudah punya garis dari titik tengah.");
  };
  const periksaB = () => {
    const r = periksaBagi(k);
    if (r.ok) return ubah(r.k, "Betul! Banyak segitiga sama dengan banyak sisi.");
    ubah(r.k);
    salah(petunjukBagi(k));
  };
  const sudutK = (i: number) => {
    const r = hubungkan(k, i);
    if (r.ok) return ubah(r.k);
    ubah(r.k, "Alat menolak. Sudut yang bersebelahan sudah terhubung oleh sisi, jadi garisnya tidak perlu ditarik.");
  };
  const periksaS = () => {
    const r = periksaSudut(k);
    if (r.ok) return ubah(r.k, "Betul! Semua garis dari satu sudut sudah ditarik.");
    ubah(r.k);
    salah(petunjukSudut(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-mosaik-keramik">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Mosaik Keramik</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_MOSAIK_TEKS}</p>
      </div>

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "pasang" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">Sasaran: {tp.sasaran}. Pilih dua keping dari rak.</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5" role="group" aria-label="Rak keping">
              {tp.rak.map((a, i) => (
                <button key={`${k.pasangKe}-${i}`} type="button" aria-pressed={k.pilih.includes(i)} onClick={() => ubah(pilihKeping(k, i))} className={`flex min-h-[64px] items-center justify-center rounded-xl border-4 bg-white ${k.pilih.includes(i) ? "border-[#DC2626]" : "border-[#FCD34D]"}`} data-kaki={a}>
                  <KepingRak a={a} nomor={i} />
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih sisi yang dipertemukan">
              {(["miring", "tegak"] as SisiPasang[]).map((s) => (
                <button key={s} type="button" className={saklar(k.sisi === s)} aria-pressed={k.sisi === s} onClick={() => ubah(pilihSisi(k, s))}>
                  Sisi {s}
                </button>
              ))}
            </div>
            {bidangHasil ? <BangunSvg bidang={bidangHasil} rupa="benda" label={`hasil pasangan: ${hasil}`} /> : null}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={pasangK}>
                {"\u{1F9E9}"} Pasang
              </button>
              <button type="button" className={tombol} onClick={periksaP}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "bagi" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">Keramik beraturan dengan {tb.n} sisi. Tarik garis ke tiap sudut.</p>
            <GambarBagi n={tb.n} garis={k.garis} />
            <p className="text-center text-xs font-black text-[#1C01A5]" data-garis-teks={k.garis}>
              {k.garis} dari {tb.n} garis
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={garisK}>
                {"➕"} Tarik garis
              </button>
              <button type="button" className={tombol} onClick={() => ubah(kurangiGaris(k))} disabled={k.garis === 0}>
                {"➖"} Hapus garis
              </button>
            </div>
            <p className="text-center text-xs font-black text-[#78350F]">Banyak segitiga yang terbentuk</p>
            <div className="mx-auto grid max-w-[420px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih banyak segitiga">
              {tb.pil.map((t, i) => (
                <button key={`${k.bagiKe}-${t}`} type="button" onClick={() => ubah(pilihBanyak(k, i))} aria-pressed={k.pilihBagi === i} className={pilihan(k.pilihBagi === i)}>
                  {t} segitiga
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaB}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "sudut" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#78350F]">Segi banyak dengan {ts.n} sisi. Hubungkan sudut 1 dengan sudut lain.</p>
            <GambarSudut n={ts.n} hubung={k.hubung} />
            <p className="text-center text-xs font-black text-[#1C01A5]" data-segitiga={segitigaSudut(k)}>
              {k.hubung.length} garis, {segitigaSudut(k)} segitiga
            </p>
            <div className="mx-auto grid max-w-[420px] grid-cols-4 gap-1.5" role="group" aria-label="Pilih sudut">
              {Array.from({ length: ts.n - 1 }, (_, j) => j + 1).map((i) => (
                <button key={`${k.sudutKe}-${i}`} type="button" onClick={() => sudutK(i)} aria-pressed={k.hubung.includes(i)} className={pilihan(k.hubung.includes(i))}>
                  Sudut {i + 1}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#78350F]">Garis yang perlu ditarik: {garisSudut(k)}</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaS}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiMosaik(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "pasang" ? kalimatPasang(k) : k.mode === "bagi" ? kalimatBagi(k) : kalimatSudut(k))}
      </p>
    </div>
  );
}
