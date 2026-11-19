"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  NAMA_KOLOM,
  awalResepsi,
  bulatkanGenap,
  hurufBesar,
  jumlahBulat,
  jumlahkanKolom,
  kalimatGenap,
  kalimatSusun,
  kalimatTukar,
  kata,
  mulaiLagiResepsi,
  periksaGenap,
  periksaTukar,
  petunjukGenap,
  petunjukSusun,
  petunjukTukar,
  pilihArahGenap,
  pilihKolom,
  pilihModeResepsi,
  pilihSimpanSusun,
  pilihTulisSusun,
  targetGenap,
  targetSusun,
  targetTukar,
  tukarBalok,
  type KeadaanResepsi,
  type ModeResepsi,
} from "./logika";
import { MISI_RESEPSI_TEKS } from "./data-sim";

/**
 * Simulasi Kelas 4 Bab 1 Sub-Bab E: Meja Resepsi (Misi Resepsi). Data sasaran berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Susun (jumlahkan bersusun dari kolom satuan: tulis satu angka dan simpan bila perlu; alat menolak kolom lain lebih dulu dan hasil kolom yang belum benar),
 * Tukar (jumlahkan balok tiap tempat, lalu tukar sepuluh butir menjadi satu batang dan sepuluh batang menjadi satu kotak; alat menolak bila belum sepuluh),
 * dan Genap (bulatkan dulu, lalu pilih ditambah atau dikurangi; alat menolak menyesuaikan sebelum membulatkan).
 */
const MODE: { id: ModeResepsi; nama: string; ikon: string }[] = [
  { id: "susun", nama: "Susun", ikon: "\u{1F4DD}" },
  { id: "tukar", nama: "Tukar", ikon: "\u{1F9E9}" },
  { id: "genap", nama: "Genap", ikon: "\u{1F501}" },
];
const KOLOM_URUT = [2, 1, 0] as const;
const kotakBalok = "block h-3.5 w-3.5 rounded-[3px] border-2 border-[#BE185D] bg-[#FBCFE8]";
const batangBalok = "block h-5 w-1.5 rounded-[2px] border-2 border-[#0369A1] bg-[#BAE6FD]";
const butirBalok = "block h-2.5 w-2.5 rounded-full border-2 border-[#A16207] bg-[#FEF08A]";

export default function SimulasiMejaResepsi({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanResepsi) => void }) {
  const [k, setK] = useState<KeadaanResepsi>(() => awalResepsi());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanResepsi, ucap?: string) => {
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
  const tombol = "min-h-[44px] rounded-full border-2 border-[#14532D] bg-white px-3 text-sm font-black text-[#14532D] disabled:opacity-40";
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] min-w-[40px] flex-1 rounded-xl border-4 px-1 py-1 text-center text-lg font-black leading-tight text-[#14532D] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#86EFAC] bg-white"}`;

  const ganti = (m: ModeResepsi) => {
    ubah(
      pilihModeResepsi(k, m),
      m === "susun" ? "Jumlahkan bersusun, mulai dari kolom satuan." : m === "tukar" ? "Tukar sepuluh balok menjadi satu balok di kirinya." : "Bulatkan dulu, lalu pilih ditambah atau dikurangi.",
    );
  };

  /* ------------------------------ Susun ------------------------------ */
  const ts = targetSusun(k);
  const kolomKu = (i: number) => {
    const r = pilihKolom(k, i);
    if (r.ok) return;
    ubah(r.k);
    salah(`Alat menolak. Mulai dari kolom ${NAMA_KOLOM[k.kol]}, lalu ke kolom di kirinya.`);
  };
  const jumlahkanKu = () => {
    const r = jumlahkanKolom(k);
    if (r.ok) {
      ubah(r.k, r.selesai ? "Betul! Penjumlahan itu selesai." : `Betul! Sekarang kolom ${NAMA_KOLOM[r.k.kol]}.`);
      return;
    }
    ubah(r.k);
    salah(petunjukSusun(k));
  };
  /* ------------------------------ Tukar ------------------------------ */
  const tt = targetTukar(k);
  const tukarKu = (dari: 0 | 1) => {
    const r = tukarBalok(k, dari);
    if (!r.ok) {
      ubah(r.k);
      return salah(`Alat menolak. Di tempat ${NAMA_KOLOM[dari]} belum ada sepuluh balok untuk ditukar.`);
    }
    ubah(r.k, dari === 0 ? "Sepuluh butir ditukar satu batang." : "Sepuluh batang ditukar satu kotak.");
  };
  const periksaTukarKu = () => {
    const r = periksaTukar(k);
    if (r.ok) return ubah(r.k, "Betul! Semua tempat sudah berisi satu angka.");
    ubah(r.k);
    salah(petunjukTukar(k));
  };
  /* ------------------------------ Genap ------------------------------ */
  const tg = targetGenap(k);
  const arahKu = (a: 0 | 1) => {
    const r = pilihArahGenap(k, a);
    if (!r.ok) {
      ubah(r.k);
      return salah("Alat menolak. Bulatkan dulu bilangan yang hampir bulat, baru menyesuaikan hasilnya.");
    }
    ubah(r.k);
  };
  const periksaGenapKu = () => {
    const r = periksaGenap(k);
    if (r.ok) return ubah(r.k, `Betul! ${kata(tg.a).charAt(0).toUpperCase()}${kata(tg.a).slice(1)} ditambah ${kata(tg.b)} sama dengan ${kata(tg.a + tg.b)}.`);
    ubah(r.k);
    salah(petunjukGenap(k));
  };

  return (
    <div className="space-y-3" data-uji="simulasi-meja-resepsi">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Meja Resepsi</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_RESEPSI_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        {k.mode === "susun" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">Jumlahkan bersusun, mulai dari kolom satuan di kanan</p>
            <div className="mx-auto grid max-w-[300px] grid-cols-[20px_repeat(3,1fr)] items-center gap-1 rounded-2xl border-4 border-[#15803D] bg-white p-2 text-center font-mono text-2xl font-black text-[#14532D]" role="group" aria-label="Kolom penjumlahan">
              <span />
              {KOLOM_URUT.map((i) => (
                <button key={`h${i}`} type="button" onClick={() => kolomKu(i)} aria-pressed={k.kol === i} aria-label={`Kolom ${NAMA_KOLOM[i]}`} className={`rounded-lg border-2 px-0 py-1 font-sans text-[10px] font-black ${k.kol === i ? "border-[#DC2626] bg-[#FEF3C7] text-[#991B1B]" : "border-[#86EFAC] bg-[#F0FDF4] text-[#15803D]"}`}>
                  {NAMA_KOLOM[i]}
                </button>
              ))}
              <span />
              {KOLOM_URUT.map((i) => (
                <span key={`c${i}`} className="h-7 text-base text-[#DC2626]" aria-label={k.masuk[i] > 0 ? `Simpanan satu di ${NAMA_KOLOM[i]}` : undefined}>
                  {k.masuk[i] > 0 ? k.masuk[i] : ""}
                </span>
              ))}
              <span />
              {KOLOM_URUT.map((i) => (
                <span key={`a${i}`}>{Math.floor(ts.a / 10 ** i) % 10}</span>
              ))}
              <span>+</span>
              {KOLOM_URUT.map((i) => (
                <span key={`b${i}`}>{Math.floor(ts.b / 10 ** i) % 10}</span>
              ))}
              <span className="col-span-4 h-0.5 bg-[#14532D]" />
              <span />
              {KOLOM_URUT.map((i) => (
                <span key={`t${i}`} className={k.tulis[i] >= 0 ? "text-[#15803D]" : k.kol === i && k.pilihTulis >= 0 ? "text-[#DC2626]" : "text-[#14532D]/30"}>
                  {k.tulis[i] >= 0 ? k.tulis[i] : k.kol === i && k.pilihTulis >= 0 ? k.pilihTulis : "?"}
                </span>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#14532D]">Angka yang ditulis di kolom {NAMA_KOLOM[k.kol]}:</p>
            <div className="mx-auto flex max-w-[420px] flex-wrap gap-1" role="group" aria-label="Pilih angka yang ditulis">
              {Array.from({ length: 10 }, (_, d) => (
                <button key={d} type="button" onClick={() => ubah(pilihTulisSusun(k, d))} aria-pressed={k.pilihTulis === d} className={pilihan(k.pilihTulis === d)}>
                  {d}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" aria-pressed={k.pilihSimpan === 0} className={saklar(k.pilihSimpan === 0)} onClick={() => ubah(pilihSimpanSusun(k, 0))}>
                Simpan nol
              </button>
              <button type="button" aria-pressed={k.pilihSimpan === 1} className={saklar(k.pilihSimpan === 1)} onClick={() => ubah(pilihSimpanSusun(k, 1))}>
                Simpan satu
              </button>
              <button type="button" className={tombol} onClick={jumlahkanKu}>
                {"\u{2705}"} Jumlahkan kolom
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tukar" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">Balok dari dua bilangan digabung. Tukar sepuluh balok menjadi satu balok di kirinya.</p>
            <div className="mx-auto grid max-w-[360px] grid-cols-3 gap-2" role="group" aria-label="Balok tiap tempat">
              {KOLOM_URUT.map((i) => (
                <div key={i} className="min-h-[96px] rounded-xl border-4 border-[#86EFAC] bg-white p-1.5 text-center">
                  <p className="text-[10px] font-black text-[#15803D]">{NAMA_KOLOM[i]}</p>
                  <div className="flex flex-wrap items-end justify-center gap-0.5 py-1" aria-hidden="true">
                    {Array.from({ length: k.tukar[i] }, (_, q) => (
                      <span key={q} className={i === 2 ? kotakBalok : i === 1 ? batangBalok : butirBalok} data-balok={NAMA_KOLOM[i]} />
                    ))}
                  </div>
                  <p className="text-lg font-black text-[#14532D]">{k.tukar[i]}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#14532D]/80">
              {tt.a} + {tt.b}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => tukarKu(0)}>
                Tukar 10 butir jadi 1 batang
              </button>
              <button type="button" className={tombol} onClick={() => tukarKu(1)}>
                Tukar 10 batang jadi 1 kotak
              </button>
              <button type="button" className={tombol} onClick={periksaTukarKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "genap" ? (
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#14532D]">Satu bilangan hampir bulat. Bulatkan dulu, jumlahkan, lalu sesuaikan.</p>
            <div className="mx-auto flex max-w-[360px] items-center justify-center gap-2 rounded-2xl border-4 border-[#15803D] bg-white p-3 font-mono text-2xl font-black text-[#14532D]">
              <span>{tg.a}</span>
              <span>+</span>
              <span className={k.bulat ? "text-[#15803D]" : ""}>{k.bulat ? tg.bulat : tg.b}</span>
              <span>=</span>
              <span className="text-[#DC2626]">{k.bulat ? jumlahBulat(k) : "?"}</span>
            </div>
            {k.bulat ? <p className="text-center text-sm font-black text-[#14532D]">{tg.b} dibulatkan menjadi {tg.bulat}. Hasilnya harus disesuaikan.</p> : null}
            <div className="mx-auto grid max-w-[360px] grid-cols-2 gap-2" role="group" aria-label="Pilih penyesuaian">
              <button type="button" onClick={() => arahKu(0)} aria-pressed={k.arah === 0} className={pilihan(k.arah === 0)}>
                Ditambah
              </button>
              <button type="button" onClick={() => arahKu(1)} aria-pressed={k.arah === 1} className={pilihan(k.arah === 1)}>
                Dikurangi
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={() => ubah(bulatkanGenap(k), `Dibulatkan menjadi ${kata(tg.bulat)}. Sekarang sesuaikan hasilnya.`)}>
                Bulatkan
              </button>
              <button type="button" className={tombol} onClick={periksaGenapKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiResepsi(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#14532D]">
        {hurufBesar(catatan || (k.mode === "susun" ? kalimatSusun(k) : k.mode === "tukar" ? kalimatTukar(k) : kalimatGenap(k)))}
      </p>
    </div>
  );
}
