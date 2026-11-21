"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalJadwal,
  bunyiJadwal,
  kalimatDaftar,
  kalimatJadwal,
  kalimatKpk,
  kalimatTiga,
  lingkari,
  majukan,
  mulaiLagiJadwal,
  nilaiKpk,
  periksaDaftar,
  periksaKpk,
  periksaTiga,
  petunjukDaftar,
  petunjukJadwal,
  petunjukKpk,
  petunjukTiga,
  pilihModeJadwal,
  pilihTiga,
  targetDaftar,
  targetJadwal,
  targetKpk,
  targetTiga,
  tekanBersama,
  ubahKali,
  ulangWaktu,
  type KeadaanJadwal,
  type ModeJadwal,
} from "./logika";
import { MISI_JADWAL_TEKS, WAKTU_MAKS } from "./data-sim";
import { kelipatan } from "./logika-data";

/**
 * Simulasi Kelas 5 Bab 2 Sub-Bab B: Dua Lonceng (tema Pasar Kuliner Malam). Data berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Daftar (lingkari bilangan yang ada di kedua daftar; alat menolak bilangan yang hanya ada di satu daftar), KPK (atur kelipatan bilangan pertama; alat menolak Periksa
 * bila bilangan itu belum kelipatan bilangan kedua), Jadwal (majukan waktu; alat menolak "Bersama" saat belum kedua lonceng berbunyi), dan Tiga (pilih KPK tiga bilangan;
 * alat menolak bilangan yang bukan kelipatan ketiganya). Pesan lama dikosongkan tiap kali keadaan berganti.
 */
const MODE: { id: ModeJadwal; nama: string; ikon: string }[] = [
  { id: "daftar", nama: "Daftar", ikon: "\u{1F4DD}" },
  { id: "kpk", nama: "KPK", ikon: "\u{1F947}" },
  { id: "jadwal", nama: "Jadwal", ikon: "\u{1F514}" },
  { id: "tiga", nama: "Tiga", ikon: "\u{1F50D}" },
];

/** Jejak waktu: dua jalur lonceng dengan titik pada kelipatan sampai waktu sekarang dan garis penunjuk waktu. */
function Jejak({ a, b, waktu }: { a: number; b: number; waktu: number }) {
  const x = (t: number) => 12 + t * (276 / WAKTU_MAKS);
  return (
    <svg viewBox="0 0 300 76" className="mx-auto w-full max-w-[320px]" role="img" aria-label={`jejak waktu sampai menit ke ${waktu}`} data-waktu={waktu}>
      <rect x={1} y={1} width={298} height={74} rx={8} fill="#FFFFFF" stroke="#B45309" strokeWidth={1.2} strokeDasharray="5 3" />
      <line x1={10} y1={18} x2={290} y2={18} stroke="#EA580C" strokeWidth={1.6} />
      <line x1={10} y1={44} x2={290} y2={44} stroke="#0D9488" strokeWidth={1.6} />
      {kelipatan(a, waktu).map((t) => (
        <circle key={`a${t}`} cx={x(t)} cy={18} r={4} fill="#EA580C" stroke="#7C2D12" strokeWidth={1} />
      ))}
      {kelipatan(b, waktu).map((t) => (
        <circle key={`b${t}`} cx={x(t)} cy={44} r={4} fill="#0D9488" stroke="#134E4A" strokeWidth={1} />
      ))}
      <line x1={x(waktu)} y1={8} x2={x(waktu)} y2={54} stroke="#DC2626" strokeWidth={1.6} strokeDasharray="3 2" />
      {[0, 10, 20, 30].map((t) => (
        <text key={t} x={x(t)} y={68} textAnchor="middle" fontSize={10.5} fontWeight={800} fill="#7C2D12">
          {t}
        </text>
      ))}
    </svg>
  );
}

export default function SimulasiDuaLonceng({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanJadwal) => void }) {
  const [k, setK] = useState<KeadaanJadwal>(() => awalJadwal());
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
  const ubah = (baru: KeadaanJadwal, ucap?: string) => {
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
  const chip = (nyala: boolean) => `min-h-[40px] min-w-[40px] rounded-lg border-2 px-1 text-base font-black text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7] ring-2 ring-[#DC2626]" : "border-[#FCD34D] bg-white"}`;

  const ganti = (m: ModeJadwal) => {
    ubah(
      pilihModeJadwal(k, m),
      m === "daftar"
        ? "Lingkari bilangan yang ada di kedua daftar kelipatan."
        : m === "kpk"
          ? "Atur kelipatan bilangan pertama sampai cocok dengan bilangan kedua."
          : m === "jadwal"
            ? "Majukan waktu, lalu tekan Bersama saat kedua lonceng berbunyi."
            : "Pilih kelipatan persekutuan terkecil dari tiga bilangan.",
    );
  };

  const td = targetDaftar(k);
  const tk = targetKpk(k);
  const tj = targetJadwal(k);
  const bj = bunyiJadwal(k);
  const tt = targetTiga(k);

  const ketukBilangan = (n: number) => {
    const r = lingkari(k, n);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Bilangan itu hanya ada di satu daftar, jadi belum bisa dilingkari. Pilih bilangan yang ada di kedua daftar.");
  };
  const periksaD = () => {
    const r = periksaDaftar(k);
    if (r.ok) return ubah(r.k, "Betul! Semua bilangan yang ada di kedua daftar sudah dilingkari.");
    ubah(r.k);
    salah(petunjukDaftar(k));
  };
  const periksaK = () => {
    const r = periksaKpk(k);
    if (r.ok) return ubah(r.k, "Betul! Itulah KPK, kelipatan persekutuan yang paling kecil.");
    if (r.ditolak) return ubah(r.k, "Alat menolak. Bilangan itu belum kelipatan bilangan kedua, jadi ubah kelipatannya dulu sebelum memeriksa.");
    ubah(r.k);
    salah(petunjukKpk(k));
  };
  const bersama = () => {
    const r = tekanBersama(k);
    if (r.ok) return ubah(r.k, "Betul! Itulah pertemuan pertama kedua lonceng, sebanyak KPK.");
    if (r.ditolak) return ubah(r.k, "Alat menolak. Belum kedua lonceng berbunyi pada waktu itu, jadi majukan waktu lagi.");
    ubah(r.k);
    salah(petunjukJadwal());
  };
  const ketukTiga = (i: number) => {
    const r = pilihTiga(k, i);
    if (r.ok) return ubah(r.k);
    if (r.k !== k) ubah(r.k, "Alat menolak. Bilangan itu bukan kelipatan ketiga-tiganya, jadi pilih bilangan lain.");
  };
  const periksaT = () => {
    const r = periksaTiga(k);
    if (r.ok) return ubah(r.k, "Betul! Itulah KPK tiga bilangan, yang paling kecil di ketiga daftar.");
    ubah(r.k);
    salah(petunjukTiga(k));
  };

  return (
    <div className="space-y-2" data-uji="simulasi-dua-lonceng">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B91C1C] bg-[#FFF1F2] p-2">
        <p className="text-sm font-black text-[#7F1D1D]">Misi Dua Lonceng</p>
        <p className="text-xs font-bold text-[#7F1D1D]/80">{MISI_JADWAL_TEKS}</p>
      </div>

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "daftar" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Lingkari bilangan yang ada di daftar kelipatan {td.a} dan juga di daftar kelipatan {td.b}.
            </p>
            {[td.a, td.b].map((x, i) => (
              <div key={`${k.daftarKe}-${x}-${i}`} className="space-y-0.5">
                <p className="text-xs font-black text-[#1C01A5]">Kelipatan {x}:</p>
                <div className="flex flex-wrap gap-1" role="group" aria-label={`Kelipatan ${x}`}>
                  {kelipatan(x, td.w).map((n) => (
                    <button key={n} type="button" onClick={() => ketukBilangan(n)} aria-pressed={k.lingkar.includes(n)} className={chip(k.lingkar.includes(n))}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaD}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "kpk" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Cari KPK dari {tk.a} dan {tk.b}: atur kelipatan {tk.a} sampai juga kelipatan {tk.b}.
            </p>
            <div className="mx-auto flex max-w-[360px] items-center gap-2" role="group" aria-label="Atur kelipatan">
              <button type="button" className={`${tombol} w-12 shrink-0 text-lg`} onClick={() => ubah(ubahKali(k, -1))} disabled={k.kaliKpk <= 1} aria-label="Kurangi kelipatan">
                {"\u{2796}"}
              </button>
              <div className="min-w-0 flex-1 rounded-xl border-4 border-[#FCD34D] bg-white px-1 py-1 text-center" data-kali={k.kaliKpk}>
                <p className="text-xs font-black leading-tight text-[#1C01A5]">
                  Kelipatan ke {k.kaliKpk} dari {tk.a}
                </p>
                <p className="text-2xl font-black leading-tight text-[#1C01A5]">{nilaiKpk(k)}</p>
              </div>
              <button type="button" className={`${tombol} w-12 shrink-0 text-lg`} onClick={() => ubah(ubahKali(k, 1))} disabled={k.kaliKpk >= 9} aria-label="Tambah kelipatan">
                {"\u{2795}"}
              </button>
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaK}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "jadwal" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Lonceng pertama berbunyi tiap {tj.a} menit, lonceng kedua tiap {tj.b} menit. Pada awal keduanya bersama.
            </p>
            <div className="mx-auto grid max-w-[360px] grid-cols-2 gap-2">
              <div className={`rounded-xl border-4 px-1 py-1 text-center ${bj.a ? "border-[#EA580C] bg-[#FFEDD5]" : "border-[#E2E8F0] bg-white"}`} data-bunyi-a={bj.a ? "1" : "0"}>
                <p className="text-xl leading-none" aria-hidden="true">
                  {"\u{1F514}"}
                </p>
                <p className="text-xs font-black text-[#1C01A5]">Pertama: tiap {tj.a} menit</p>
                <p className="text-xs font-black text-[#9A3412]">{bj.a ? "berbunyi" : "diam"}</p>
              </div>
              <div className={`rounded-xl border-4 px-1 py-1 text-center ${bj.b ? "border-[#0D9488] bg-[#CCFBF1]" : "border-[#E2E8F0] bg-white"}`} data-bunyi-b={bj.b ? "1" : "0"}>
                <p className="text-xl leading-none" aria-hidden="true">
                  {"\u{1F514}"}
                </p>
                <p className="text-xs font-black text-[#1C01A5]">Kedua: tiap {tj.b} menit</p>
                <p className="text-xs font-black text-[#115E59]">{bj.b ? "berbunyi" : "diam"}</p>
              </div>
            </div>
            <Jejak a={tj.a} b={tj.b} waktu={k.waktu} />
            <p className="text-center text-sm font-black text-[#1C01A5]" data-waktu-teks={k.waktu}>
              Waktu: menit ke {k.waktu}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(majukan(k))} disabled={k.waktu >= WAKTU_MAKS}>
                {"\u{23E9}"} Maju satu menit
              </button>
              <button type="button" className={tombol} onClick={bersama}>
                {"\u{1F514}"} Bersama
              </button>
              <button type="button" className={tombol} onClick={() => ubah(ulangWaktu(k))} disabled={k.waktu === 0}>
                {"\u{21A9}\u{FE0F}"} Ulang waktu
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tiga" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#7F1D1D]">
              Pilih kelipatan persekutuan terkecil dari {tt.angka[0]}, {tt.angka[1]}, dan {tt.angka[2]}.
            </p>
            <div className="mx-auto grid max-w-[320px] grid-cols-3 gap-1.5" role="group" aria-label="Pilih bilangan">
              {tt.kandidat.map((n, i) => (
                <button key={`${k.tigaKe}-${n}`} type="button" onClick={() => ketukTiga(i)} aria-pressed={k.tigaPilih === i} className={`min-h-[52px] rounded-xl border-4 px-1 text-xl font-black text-[#1C01A5] ${k.tigaPilih === i ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#FCD34D] bg-white"}`}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaT}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiJadwal(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.25rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "daftar" ? kalimatDaftar(k) : k.mode === "kpk" ? kalimatKpk(k) : k.mode === "jadwal" ? kalimatJadwal(k) : kalimatTiga(k))}
      </p>
    </div>
  );
}
