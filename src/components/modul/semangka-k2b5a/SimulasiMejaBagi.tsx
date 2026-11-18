"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSS_LEMARI } from "../lemari-k1b1a/ui";
import {
  awalSemangka,
  belahBenda,
  gambarBelah,
  gambarLipat,
  garisAdilSim,
  hurufBesar,
  isiLagi,
  kalimatSemangka,
  lipatKertas,
  mulaiLagiSemangka,
  periksaTuang,
  petunjukBelah,
  petunjukLipat,
  petunjukTuang,
  pilihBendaBelah,
  pilihGarisBelah,
  pilihGarisLipat,
  pilihKertasLipat,
  pilihModeSemangka,
  totalTuang,
  tumpukBagian,
  tuangSusu,
  type KeadaanSemangka,
  type ModeSemangka,
} from "./logika";
import { BENDA_BAGI, KERTAS_LIPAT, MISI_BAGI_TEKS } from "./data-peta";
import { POLIGON, bagian, bayangan, ruasGaris, type Gbr, type Pt } from "./bagian";

/**
 * Simulasi Kelas 2 Bab 5 Sub-Bab A: Meja Bagi (Misi Meja Bagi). Benda, kertas, dan gelas berbeda dari Story. Eksplorasi bebas tanpa skor, tiga alat:
 * Belah (pilih benda dan garis potong, belah, lalu tumpuk dua bagian untuk memeriksa), Tuang (pindahkan susu antargelas sampai sama tinggi), dan Lipat
 * (pilih kertas dan garis lipat; lipatan pas bila bayangan satu sisi menutup sisi yang lain). Luas bagian dihitung program.
 */
const MODE: { id: ModeSemangka; nama: string; ikon: string }[] = [
  { id: "belah", nama: "Belah", ikon: "\u{1F52A}" },
  { id: "tuang", nama: "Tuang", ikon: "\u{1F95B}" },
  { id: "lipat", nama: "Lipat", ikon: "\u{1F4C4}" },
];
const UNGU = "#1C01A5";
const r1 = (n: number): number => Math.round(n * 10) / 10;
const titik = (p: readonly Pt[], x: number, y: number, s: number, dx = 0, dy = 0): string => p.map(([u, v]) => `${r1(x + (u + dx) * s)},${r1(y + (v + dy) * s)}`).join(" ");

/** Bangun dengan satu garis. `pisah`: kedua bagian digeser menjauh. `bay`: bayangan bagian pertama (lipatan). */
function Papan({ gb, warna, garisWarna, pisah = false, bay = false, hanyaKedua = false, ditumpuk = false }: { gb: Gbr; warna: string; garisWarna: string; pisah?: boolean; bay?: boolean; hanyaKedua?: boolean; ditumpuk?: boolean }) {
  const x = 60;
  const y = 22;
  const s = 180;
  const bag = bagian(gb);
  const g = gb.g[0];
  const dx = g ? g[2] - g[0] : 0;
  const dy = g ? g[3] - g[1] : 0;
  const n = Math.hypot(dx, dy) || 1;
  const geser = pisah && bag.length === 2 ? 0.05 : 0;
  const ruas = g ? ruasGaris(gb.b, g) : null;
  const bayang = bay ? bayangan(gb) : null;
  return (
    <svg viewBox="0 0 300 220" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" aria-label="Meja bagi">
      {bag.length === 1 ? <polygon points={titik(POLIGON[gb.b], x, y, s)} fill={warna} stroke={garisWarna} strokeWidth={2} strokeLinejoin="round" /> : null}
      {bag.length === 2
        ? bag.map((p, i) =>
            hanyaKedua && i === 0 ? null : (
              <polygon
                key={i}
                points={titik(p, x, y, s, ((i === 0 ? -dy : dy) / n) * geser, ((i === 0 ? dx : -dx) / n) * geser)}
                fill={warna}
                stroke={ditumpuk ? "#15803D" : garisWarna}
                strokeWidth={ditumpuk ? 3 : 2}
                strokeLinejoin="round"
              />
            ),
          )
        : null}
      {!pisah && !hanyaKedua && ruas ? <line x1={x + ruas[0][0] * s} y1={y + ruas[0][1] * s} x2={x + ruas[1][0] * s} y2={y + ruas[1][1] * s} stroke={garisWarna} strokeWidth={2.4} strokeDasharray="6 4" /> : null}
      {bayang ? <polygon points={titik(bayang, x, y, s)} fill="rgba(147,51,234,0.25)" stroke="#7C3AED" strokeWidth={2} strokeDasharray="5 3" strokeLinejoin="round" /> : null}
    </svg>
  );
}

function Gelas({ x, isi, total }: { x: number; isi: number; total: number }) {
  const tinggi = 130;
  const h = (isi / total) * tinggi;
  return (
    <g aria-hidden="true">
      <rect x={x} y={20 + tinggi - h} width={64} height={h} fill="#F8FAFC" stroke="none" />
      <path d={`M${x} 20 L${x + 6} ${20 + tinggi} L${x + 58} ${20 + tinggi} L${x + 64} 20`} fill="none" stroke="#0369A1" strokeWidth={3} strokeLinejoin="round" />
      <line x1={x + 2} y1={20 + tinggi - h} x2={x + 62} y2={20 + tinggi - h} stroke="#38BDF8" strokeWidth={2.4} />
    </g>
  );
}

export default function SimulasiMejaBagi({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanSemangka) => void }) {
  const [k, setK] = useState<KeadaanSemangka>(() => awalSemangka());
  const [goyang, setGoyang] = useState(false);
  const [catatan, setCatatan] = useState("");
  /** Tampilan sesudah Belah atau Lipat dicoba: "belah" (dua bagian terpisah), "lipat" (bayangan lipatan), atau kosong. */
  const [tampil, setTampil] = useState<"" | "belah" | "lipat">("");
  const laporRef = useRef(onKeadaan);
  useEffect(() => {
    laporRef.current = onKeadaan;
  }, [onKeadaan]);
  useEffect(() => {
    laporRef.current?.(k);
  }, [k]);
  const ubah = (baru: KeadaanSemangka, ucap?: string) => {
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
  const saklar = (nyala: boolean) => `min-h-[44px] rounded-full border-2 px-3 text-sm font-black ${nyala ? "border-[#15803D] bg-[#15803D] text-white" : "border-[#15803D] bg-white text-[#15803D]"}`;
  const pilihan = (nyala: boolean) => `min-h-[44px] rounded-xl border-4 px-2 py-1 text-center text-xs font-black leading-tight text-[#1C01A5] ${nyala ? "border-[#DC2626] bg-[#FEF3C7]" : "border-[#7DD3FC] bg-white"}`;

  const ganti = (m: ModeSemangka) => {
    setTampil("");
    ubah(pilihModeSemangka(k, m), m === "belah" ? "Belah benda lewat garis pilihan, lalu tumpuk bagiannya." : m === "tuang" ? "Tuang susu dari gelas kiri sampai kedua gelas sama tinggi." : "Lipat kertas lewat garis pilihan sampai kedua sisinya menutup pas.");
  };
  const ketukBenda = (i: number) => {
    setTampil("");
    const baru = pilihBendaBelah(k, i);
    ubah(baru, kalimatSemangka(baru));
  };
  const ketukGaris = (j: number) => {
    setTampil("");
    const baru = pilihGarisBelah(k, j);
    ubah(baru, kalimatSemangka(baru));
  };
  const belah = () => {
    const r = belahBenda(k);
    if (r.perlu === "benda") return salah("Ketuk satu benda di meja dulu.");
    if (r.perlu === "garis") return salah("Pilih garis potongnya dulu.");
    setTampil("belah");
    if (r.ok) ubah(r.k, `Dua bagian sama besar! Setiap bagian ${BENDA_BAGI[k.benda].nama} itu disebut setengah. Tumpuk kedua bagiannya untuk memeriksa.`);
    else {
      ubah(r.k);
      salah(petunjukBelah(k.benda, k.garis));
    }
  };
  const tumpuk = () => {
    const r = tumpukBagian(k);
    if (!r.ok) return salah("Belah dulu benda itu tepat di tengah, baru kedua bagiannya bisa ditumpuk.");
    ubah(r.k, "Kedua bagian ditumpuk dan pas. Itu tanda sama besar, jadi masing-masing setengah.");
  };
  const ketukKertas = (i: number) => {
    setTampil("");
    const baru = pilihKertasLipat(k, i);
    ubah(baru, kalimatSemangka(baru));
  };
  const ketukLipat = (j: number) => {
    setTampil("");
    const baru = pilihGarisLipat(k, j);
    ubah(baru, kalimatSemangka(baru));
  };
  const lipat = () => {
    const r = lipatKertas(k);
    if (r.perlu === "kertas") return salah("Ketuk satu kertas dulu.");
    if (r.perlu === "garis") return salah("Pilih garis lipatnya dulu.");
    setTampil("lipat");
    if (r.ok) ubah(r.k, "Lipatan pas! Bayangan satu sisi menutup sisi yang lain, jadi tiap sisi adalah setengah.");
    else {
      ubah(r.k);
      salah(petunjukLipat(k.kertas, k.lipat));
    }
  };
  const tuang = (arah: 1 | -1) => {
    const baru = tuangSusu(k, arah);
    if (baru === k) return salah(arah === 1 ? "Gelas kiri sudah kosong. Tuang balik bila perlu." : "Gelas kanan masih kosong, belum ada yang bisa dituang balik.");
    ubah(baru);
    setCatatan("");
  };
  const periksa = () => {
    const r = periksaTuang(k);
    if (r.ok) ubah(r.k, "Kedua gelas sama tinggi. Masing-masing setengah dari susu seluruhnya!");
    else {
      ubah(r.k);
      salah(petunjukTuang(k));
    }
  };

  const b = k.benda >= 0 ? BENDA_BAGI[k.benda] : null;
  const kr = k.kertas >= 0 ? KERTAS_LIPAT[k.kertas] : null;
  const belahTerpilih: Gbr | null = b && k.garis >= 0 ? gambarBelah(k.benda, k.garis) : null;
  const lipatTerpilih: Gbr | null = kr && k.lipat >= 0 ? gambarLipat(k.kertas, k.lipat) : null;
  const total = totalTuang(k);
  const sudahSama = k.tuangBenar.includes(k.putaran);

  return (
    <div className="space-y-3" data-uji="simulasi-meja-bagi">
      <style>{CSS_LEMARI}</style>
      <div className="rounded-2xl border-4 border-[#15803D] bg-[#F0FDF4] p-2">
        <p className="text-sm font-black text-[#14532D]">Misi Meja Bagi</p>
        <p className="text-xs font-bold text-[#14532D]/80">{MISI_BAGI_TEKS}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih alat">
        {MODE.map((m) => (
          <button key={m.id} type="button" onClick={() => ganti(m.id)} aria-pressed={k.mode === m.id} className={saklar(k.mode === m.id)}>
            <span aria-hidden="true">{m.ikon}</span> {m.nama}
          </button>
        ))}
      </div>

      {k.mode === "belah" ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4" role="group" aria-label="Pilih benda">
            {BENDA_BAGI.map((x, i) => (
              <button key={x.id} type="button" onClick={() => ketukBenda(i)} aria-pressed={k.benda === i} className={pilihan(k.benda === i)}>
                <span className="block text-2xl" aria-hidden="true">
                  {x.emoji}
                </span>
                {x.nama}
                {k.dibelah.includes(i) ? <span className="block text-[#15803D]">sudah dibelah</span> : null}
              </button>
            ))}
          </div>
          {b ? (
            <>
              <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Pilih garis potong">
                {b.garis.map((g, j) => (
                  <button key={g.nama} type="button" onClick={() => ketukGaris(j)} aria-pressed={k.garis === j} className={pilihan(k.garis === j)}>
                    Garis {g.nama}
                  </button>
                ))}
              </div>
              <Papan
                gb={belahTerpilih ?? { b: b.b, g: [] }}
                warna={b.warna}
                garisWarna={b.garisWarna}
                pisah={tampil === "belah" && !!belahTerpilih}
                ditumpuk={tampil === "belah" && k.ditumpuk.includes(k.benda) && !!belahTerpilih && garisAdilSim(k.benda, k.garis)}
              />
              <div className="flex flex-wrap justify-center gap-2">
                <button type="button" className={tombol} onClick={belah} disabled={!belahTerpilih}>
                  {"\u{1F52A}"} Belah
                </button>
                <button type="button" className={tombol} onClick={tumpuk} disabled={!k.dibelah.includes(k.benda)}>
                  {"\u{1F4DA}"} Tumpuk bagiannya
                </button>
              </div>
            </>
          ) : (
            <p className="rounded-xl bg-white/85 px-2 py-6 text-center text-sm font-black text-[#1C01A5]/70">Ketuk satu benda di atas untuk mulai.</p>
          )}
        </div>
      ) : null}

      {k.mode === "tuang" ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <svg viewBox="0 0 300 180" className="mx-auto block w-full max-w-[420px] touch-none select-none rounded-2xl bg-white/90" aria-label="Dua gelas susu">
            <Gelas x={62} isi={k.gelasA} total={total} />
            <Gelas x={174} isi={k.gelasB} total={total} />
            <text x={94} y={172} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
              gelas kiri
            </text>
            <text x={206} y={172} textAnchor="middle" fontSize={10} fontWeight={900} fill={UNGU}>
              gelas kanan
            </text>
            <text x={150} y={90} textAnchor="middle" fontSize={22}>
              {"\u{27A1}"}
            </text>
          </svg>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className={tombol} onClick={() => tuang(1)} disabled={sudahSama}>
              Tuang {"\u{27A1}"}
            </button>
            <button type="button" className={tombol} onClick={() => tuang(-1)} disabled={sudahSama}>
              {"\u{2B05}"} Tuang balik
            </button>
            <button type="button" className={tombol} onClick={periksa} disabled={sudahSama}>
              {"\u{2705}"} Periksa sama tinggi
            </button>
            {sudahSama ? (
              <button type="button" className={tombol} onClick={() => ubah(isiLagi(k), "Gelas kiri diisi penuh lagi. Takarannya berbeda dari tadi.")}>
                {"\u{1F95B}"} Isi lagi
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {k.mode === "lipat" ? (
        <div className={`space-y-2 ${goyang ? "lm-goyang" : ""}`}>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3" role="group" aria-label="Pilih kertas">
            {KERTAS_LIPAT.map((x, i) => (
              <button key={x.id} type="button" onClick={() => ketukKertas(i)} aria-pressed={k.kertas === i} className={pilihan(k.kertas === i)}>
                {x.nama}
              </button>
            ))}
          </div>
          {kr ? (
            <>
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2" role="group" aria-label="Pilih garis lipat">
                {kr.garis.map((g, j) => (
                  <button key={g.nama} type="button" onClick={() => ketukLipat(j)} aria-pressed={k.lipat === j} className={pilihan(k.lipat === j)}>
                    {hurufBesar(g.nama)}
                  </button>
                ))}
              </div>
              <Papan gb={lipatTerpilih ?? { b: kr.b, g: [] }} warna={kr.warna} garisWarna="#1E3A8A" bay={tampil === "lipat" && !!lipatTerpilih} hanyaKedua={tampil === "lipat" && !!lipatTerpilih} />
              <div className="flex justify-center">
                <button type="button" className={tombol} onClick={lipat} disabled={!lipatTerpilih}>
                  {"\u{1F4C4}"} Lipat
                </button>
              </div>
            </>
          ) : (
            <p className="rounded-xl bg-white/85 px-2 py-6 text-center text-sm font-black text-[#1C01A5]/70">Ketuk satu kertas di atas untuk mulai.</p>
          )}
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={tombol}
          onClick={() => {
            setTampil("");
            ubah(mulaiLagiSemangka(), "Mulai lagi dari awal.");
          }}
        >
          {"\u{1F504}"} Mulai lagi
        </button>
      </div>
      <p role="status" aria-live="polite" className="min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black text-[#1C01A5]">
        {catatan || kalimatSemangka(k)}
      </p>
    </div>
  );
}
