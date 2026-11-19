"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalIkat,
  bilanganPapan,
  bilanganTulis,
  ikatSepuluh,
  kalimatIkat,
  kalimatKira,
  kalimatPapan,
  kalimatTukar,
  kalimatTulis,
  lepasDi,
  lepasIkat,
  mulaiLagiIkat,
  periksaPapan,
  periksaTulis,
  petunjukPapan,
  petunjukTulis,
  pilihAngka,
  pilihJenis,
  pilihKira,
  pilihModeIkat,
  tukarAngka,
  ubahPapan,
  type KeadaanIkat,
  type ModeIkat,
} from "./logika";
import { BENDA_SIM, MISI_IKAT_TEKS } from "./data-peta";

/**
 * Simulasi Kelas 2 Bab 7 Sub-Bab A: Gudang Ikat (Misi Gudang Ikat). Benda dan banyak benda berbeda dari Story. Eksplorasi bebas tanpa skor, empat alat:
 * Ikat (ikat benda sepuluh-sepuluh menjadi puluhan), Papan (taruh puluhan dan satuan di papan puluhan dan satuan), Tulis (pilih angka puluhan dan satuan, atau tukar angkanya)
 * dan Kira (buat perkiraan lebih dulu, lalu buktikan dengan mengikat). Banyak benda tidak ditulis: anak mengikat untuk mengetahuinya.
 */
const MODE: { id: ModeIkat; nama: string; ikon: string }[] = [
  { id: "ikat", nama: "Ikat", ikon: "\u{1F9F6}" },
  { id: "papan", nama: "Papan", ikon: "\u{1F4CB}" },
  { id: "tulis", nama: "Tulis", ikon: "\u{1F4DD}" },
  { id: "kira", nama: "Kira", ikon: "\u{1F914}" },
];
const TALI = "#CA8A04";

/** Meja gudang: ikat yang sudah dibuat di baris atas, benda lepas di bawahnya. */
function Meja({ k }: { k: KeadaanIkat }) {
  const b = BENDA_SIM[k.jenis];
  const p = k.diikat[k.jenis];
  const s = lepasDi(k, k.jenis);
  return (
    <svg viewBox="0 0 300 170" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-[#FEF3C7]" aria-label={`Meja gudang dengan ${b.nama}`}>
      <rect x={2} y={2} width={296} height={166} rx={10} fill="#E7D3A8" stroke="#B45309" strokeWidth={2} />
      {Array.from({ length: p }, (_, q) => {
        const x = 8 + q * 57;
        return (
          <g key={q} aria-hidden="true">
            <rect x={x} y={8} width={50} height={26} rx={6} fill="#FFFBEB" stroke={TALI} strokeWidth={2.4} />
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={x + 9 + (i % 5) * 8} cy={16 + Math.floor(i / 5) * 10} r={2.6} fill="#92400E" />
            ))}
            <rect x={x + 21} y={17} width={8} height={7} rx={2} fill={TALI} />
          </g>
        );
      })}
      {p === 0 ? (
        <text x={150} y={25} textAnchor="middle" fontSize={9} fontWeight={800} fill="#92400E">
          belum ada ikat
        </text>
      ) : null}
      {Array.from({ length: s }, (_, i) => (
        <text key={i} x={18 + (i % 14) * 19.5} y={62 + Math.floor(i / 14) * 20} fontSize={15} textAnchor="middle" aria-hidden="true">
          {b.emoji}
        </text>
      ))}
      <text x={150} y={163} textAnchor="middle" fontSize={9} fontWeight={800} fill="#78350F">
        {s === 0 ? "tidak ada benda lepas" : "benda lepas ada di bawah"}
      </text>
    </svg>
  );
}

export default function SimulasiGudangIkat({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanIkat) => void }) {
  const [k, setK] = useState<KeadaanIkat>(() => awalIkat());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanIkat, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#B45309] bg-[#B45309] text-white" : "border-[#B45309] bg-white text-[#B45309]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;
  const angka = (nyala: boolean) => `min-h-[44px] min-w-[40px] rounded-lg border-2 px-2 text-base font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#1C01A5] bg-white text-[#1C01A5]"}`;

  const ganti = (m: ModeIkat) => {
    ubah(
      pilihModeIkat(k, m),
      m === "ikat" ? "Ikat benda sepuluh-sepuluh sampai tidak ada lagi yang bisa diikat." : m === "papan" ? "Ikat benda dulu untuk mengetahui banyaknya, lalu taruh puluhan dan satuan di papan." : m === "tulis" ? "Pilih angka puluhan di kiri dan angka satuan di kanan." : "Buat perkiraan banyak benda dulu, lalu buktikan dengan mengikat.",
    );
  };
  const ketukJenis = (i: number) => {
    const baru = pilihJenis(k, i);
    ubah(baru, baru === k ? undefined : `Sekarang ${BENDA_SIM[i].nama}.`);
  };
  const ikat = () => {
    const r = ikatSepuluh(k);
    if (!r.ok) return salah("Benda yang lepas tinggal kurang dari sepuluh, jadi tidak ada lagi yang bisa diikat. Itu satuannya.");
    ubah(r.k, k.mode === "kira" ? kalimatKira(r.k) : kalimatIkat(r.k));
  };
  const lepas = () => {
    const r = lepasIkat(k);
    if (!r.ok) return salah("Belum ada ikat yang bisa dilepas.");
    ubah(r.k, "Satu ikat dilepas menjadi sepuluh benda lepas.");
  };
  const ubahPapanKolom = (kolom: "puluhan" | "satuan", arah: 1 | -1) => {
    const r = ubahPapan(k, kolom, arah);
    if (!r.ok) return salah(arah === 1 ? "Satu kolom paling banyak sembilan. Sepuluh satuan menjadi satu puluhan." : "Kolom itu sudah nol.");
    ubah(r.k, kalimatPapan(r.k));
  };
  const periksaPapanKu = () => {
    const r = periksaPapan(k);
    if (r.ok) return ubah(r.k, `Betul! ${kalimatPapan(r.k)}`);
    ubah(r.k);
    salah(petunjukPapan(k));
  };
  const angkaTulis = (kolom: "puluhan" | "satuan", n: number) => {
    const baru = pilihAngka(k, kolom, n);
    ubah(baru, kalimatTulis(baru));
  };
  const periksaTulisKu = () => {
    const r = periksaTulis(k);
    if (r.ok) return ubah(r.k, `Betul! ${kalimatTulis(r.k)}`);
    ubah(r.k);
    salah(petunjukTulis(k));
  };
  const tukar = () => {
    const r = tukarAngka(k);
    if (!r.ok) return salah("Pilih angka puluhan dan angka satuan dulu, baru ditukar.");
    ubah(r.k, kalimatTukar(r.k));
  };
  const kiraKu = (n: number) => {
    const r = pilihKira(k, n);
    if (!r.ok) return salah("Perkiraan hanya bisa dibuat sekali, sebelum benda diikat. Pilih tumpukan lain atau mulai lagi.");
    ubah(r.k, kalimatKira(r.k));
  };

  const b = BENDA_SIM[k.jenis];
  const n = bilanganTulis(k);
  return (
    <div className="space-y-3" data-uji="simulasi-gudang-ikat">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#B45309] bg-[#FFFBEB] p-2">
        <p className="text-sm font-black text-[#78350F]">Misi Gudang Ikat</p>
        <p className="text-xs font-bold text-[#78350F]/80">{MISI_IKAT_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pilih tumpukan benda">
        {BENDA_SIM.map((x, i) => (
          <button key={x.id} type="button" onClick={() => ketukJenis(i)} aria-pressed={k.jenis === i} className={pilihan(k.jenis === i)}>
            <span className="block text-2xl" aria-hidden="true">
              {x.emoji}
            </span>
            {x.nama}
          </button>
        ))}
      </div>

      <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
        <Meja k={k} />

        {k.mode === "ikat" || k.mode === "kira" ? (
          <div className="space-y-2">
            {k.mode === "kira" ? (
              <div className="space-y-1" role="group" aria-label="Pilih perkiraan">
                <p className="text-center text-xs font-black text-[#1C01A5]">Kira-kira ada berapa {b.nama}?</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {b.kira.map((x) => (
                    <button key={x} type="button" onClick={() => kiraKu(x)} aria-pressed={k.kira[k.jenis] === x} disabled={k.kira[k.jenis] >= 0 && k.kira[k.jenis] !== x} className={`${angka(k.kira[k.jenis] === x)} min-w-[64px]`}>
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={ikat}>
                {"\u{1F9F6}"} Ikat sepuluh
              </button>
              <button type="button" className={tombol} onClick={lepas}>
                {"\u{21A9}"} Lepas satu ikat
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "papan" ? (
          <div className="space-y-2">
            <div className="mx-auto grid max-w-[420px] grid-cols-2 gap-2 rounded-xl border-4 border-[#B45309] bg-white p-2" aria-label="Papan puluhan dan satuan">
              {(["puluhan", "satuan"] as const).map((kol) => (
                <div key={kol} className="space-y-1 rounded-lg bg-[#FEF9C3] p-1.5 text-center">
                  <p className="text-xs font-black uppercase text-[#B45309]">{kol}</p>
                  <p className="text-4xl font-black text-[#1C01A5]">{kol === "puluhan" ? k.papanP : k.papanS}</p>
                  <div className="flex justify-center gap-1.5">
                    <button type="button" className={angka(false)} onClick={() => ubahPapanKolom(kol, -1)} aria-label={`Kurangi ${kol}`}>
                      {"\u{2796}"}
                    </button>
                    <button type="button" className={angka(false)} onClick={() => ubahPapanKolom(kol, 1)} aria-label={`Tambah ${kol}`}>
                      {"\u{2795}"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-black text-[#1C01A5]">Bilangan di papan: {bilanganPapan(k)}</p>
            <div className="flex justify-center">
              <button type="button" className={tombol} onClick={periksaPapanKu}>
                {"\u{2705}"} Periksa
              </button>
            </div>
          </div>
        ) : null}

        {k.mode === "tulis" ? (
          <div className="space-y-2">
            {(["puluhan", "satuan"] as const).map((kol) => (
              <div key={kol} className="space-y-1" role="group" aria-label={`Angka ${kol}`}>
                <p className="text-center text-xs font-black text-[#1C01A5]">Angka {kol}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((x) => (
                    <button key={x} type="button" className={angka((kol === "puluhan" ? k.tulisP : k.tulisS) === x)} onClick={() => angkaTulis(kol, x)} aria-pressed={(kol === "puluhan" ? k.tulisP : k.tulisS) === x}>
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p className="text-center text-2xl font-black text-[#1C01A5]" aria-label="Bilangan yang ditulis">
              {n < 0 ? "?" : n}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" className={tombol} onClick={periksaTulisKu}>
                {"\u{2705}"} Periksa
              </button>
              <button type="button" className={tombol} onClick={tukar}>
                {"\u{1F500}"} Tukar angka
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" className={tombol} onClick={() => ubah(mulaiLagiIkat(), "Mulai lagi dari awal.")}>
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || (k.mode === "ikat" ? kalimatIkat(k) : k.mode === "papan" ? kalimatPapan(k) : k.mode === "tulis" ? kalimatTulis(k) : kalimatKira(k))}
      </p>
    </div>
  );
}
