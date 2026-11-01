"use client";

import { useState } from "react";

const fmtRibuan = (n: number): string => n.toLocaleString("id-ID");

const angkaKeKata = (n: number): string => {
  if (n === 0) return "nol";
  if (n === 100000) return "seratus ribu";
  const s = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
  const ratusan = (v: number): string => {
    if (v === 0) return "";
    if (v < 12) return s[v];
    if (v < 20) return `${s[v - 10]} belas`;
    if (v < 100) return `${s[Math.floor(v / 10)]} puluh${v % 10 > 0 ? " " + s[v % 10] : ""}`;
    const r = Math.floor(v / 100);
    return `${r === 1 ? "seratus" : s[r] + " ratus"}${v % 100 > 0 ? " " + ratusan(v % 100) : ""}`;
  };
  const rb = Math.floor(n / 1000);
  const sisa = n % 1000;
  const teksRb = rb > 0 ? (rb === 1 ? "seribu" : `${ratusan(rb)} ribu`) : "";
  const teksSisa = sisa > 0 ? ratusan(sisa) : "";
  return `${teksRb}${teksRb && teksSisa ? " " : ""}${teksSisa}`.trim();
};

export const PictorialPlaceValueBlocks = ({ value, caption }: { value: number; caption?: string }) => {
  const v = Math.max(0, Math.min(99999, value));
  const digits = [
    { label: "Puluh Ribuan", unit: 10000, d: Math.floor(v / 10000) % 10, icon: "📦", bg: "bg-rose-50 border-rose-300", badge: "bg-rose-600" },
    { label: "Ribuan", unit: 1000, d: Math.floor(v / 1000) % 10, icon: "🧱", bg: "bg-amber-50 border-amber-300", badge: "bg-amber-600" },
    { label: "Ratusan", unit: 100, d: Math.floor(v / 100) % 10, icon: "🟦", bg: "bg-emerald-50 border-emerald-300", badge: "bg-emerald-600" },
    { label: "Puluhan", unit: 10, d: Math.floor(v / 10) % 10, icon: "📏", bg: "bg-sky-50 border-sky-300", badge: "bg-sky-600" },
    { label: "Satuan", unit: 1, d: v % 10, icon: "🟣", bg: "bg-purple-50 border-purple-300", badge: "bg-purple-600" },
  ];
  return (
    <div className="space-y-3 rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
      {caption ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <span className="text-xs font-black uppercase text-indigo-900">{caption}</span>
          <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-0.5 text-xs font-black text-amber-900">
            Lambang: {fmtRibuan(v)}
          </span>
        </div>
      ) : null}
      <div className="grid grid-cols-5 gap-1.5 md:gap-2.5">
        {digits.map((col) => (
          <div key={col.label} className={`flex flex-col justify-between rounded-xl border-2 p-2 text-center ${col.bg}`}>
            <div>
              <div className={`rounded px-1 py-0.5 text-[9px] font-black uppercase text-white md:text-[10px] ${col.badge}`}>
                {col.label}
              </div>
              <div className="mt-0.5 text-[10px] font-bold text-slate-500">(@{fmtRibuan(col.unit)})</div>
            </div>
            <div className="my-1.5 flex min-h-[60px] flex-wrap items-center justify-center gap-1 rounded-lg border border-slate-200/70 bg-white/90 p-1">
              {col.d === 0 ? (
                <span className="text-[10px] font-bold italic text-slate-300">0 blok</span>
              ) : (
                Array.from({ length: col.d }).map((_, idx) => (
                  <span key={idx} className="select-none text-xs leading-none">
                    {col.icon}
                  </span>
                ))
              )}
            </div>
            <div className="border-t border-slate-200/80 pt-1">
              <div className="text-base font-black text-slate-900">{col.d}</div>
              <div className="text-[10px] font-extrabold text-slate-600">={fmtRibuan(col.d * col.unit)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-bold text-white">
        Dibaca: &quot;{angkaKeKata(v)}&quot;
      </div>
    </div>
  );
};

export const PictorialMateriBab1Kelas5 = ({ subbab }: { subbab: "A" | "B" | "C" | "D" }) => {
  const [subAIdx, setSubAIdx] = useState(0);
  const subAItems = [
    { label: "📘 Buku Yohana (14.500)", val: 14500, desc: "Empat buku tulis Yohana seharga empat belas ribu lima ratus rupiah." },
    { label: "💊 Obat Adik Asep (66.500)", val: 66500, desc: "Harga obat batuk Rp66.500,00: kiri titik dibaca enam puluh enam ribu, kanan titik lima ratus." },
    { label: "🌳 Kayu Tanam (26.932)", val: 26932, desc: "Jumlah penduduk Kecamatan Kayu Tanam 26.932 jiwa dengan 5 gerbong nilai tempat terisi penuh." },
    { label: "🥑 Jus Alpukat Nisa (9.050)", val: 9050, desc: "Sembilan ribu lima puluh rupiah: gerbong ratusan wajib diisi 0 sebagai penjaga nilai tempat." },
  ];
  const [isSortedAsc, setIsSortedAsc] = useState(false);
  const dakonItems = [
    { code: "Dakon A (Hijau)", price: 56560, pr: 5, r: 6, color: "bg-emerald-500" },
    { code: "Dakon B (Merah)", price: 65750, pr: 6, r: 5, color: "bg-rose-500" },
    { code: "Dakon C (Kuning)", price: 57000, pr: 5, r: 7, color: "bg-amber-500" },
    { code: "Dakon D (Biru)", price: 75360, pr: 7, r: 5, color: "bg-blue-600" },
  ];
  const renderedDakon = isSortedAsc ? [...dakonItems].sort((a, b) => a.price - b.price) : dakonItems;
  const [komangMode, setKomangMode] = useState<1 | 2 | 3>(1);
  const [opTab, setOpTab] = useState<"tambah" | "kurang" | "kaliBagi">("tambah");

  if (subbab === "A") {
    return (
      <div className="space-y-4 rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-indigo-800">
              Pictorial Sub-bab A • Nilai Tempat dan Gerbang Titik Ribuan
            </span>
            <h3 className="mt-1 text-lg font-black text-slate-900">Membedah Bilangan ke Dalam 5 Gerbong Balok Visual</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {subAItems.map((item, idx) => (
              <button key={item.label} type="button" onClick={() => setSubAIdx(idx)} className={`rounded-xl px-3 py-1.5 text-xs font-black transition ${subAIdx === idx ? "bg-amber-400 text-slate-950 shadow" : "border border-slate-300 bg-white text-slate-700"}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs font-semibold text-slate-600">{subAItems[subAIdx].desc}</p>
        <PictorialPlaceValueBlocks value={subAItems[subAIdx].val} caption={`Diagram Balok Nilai Tempat: ${subAItems[subAIdx].label}`} />
        <div className="grid grid-cols-1 items-center gap-2.5 rounded-2xl bg-slate-900 p-4 text-center text-white md:grid-cols-3">
          <div className="rounded-xl border border-amber-400/40 bg-slate-800 p-2.5">
            <div className="text-[10px] font-bold uppercase text-amber-300">1. Rak kiri titik</div>
            <div className="text-xl font-black">{Math.floor(subAItems[subAIdx].val / 1000)}</div>
            <div className="text-[11px] capitalize text-amber-200">&quot;{angkaKeKata(Math.floor(subAItems[subAIdx].val / 1000))}&quot;</div>
          </div>
          <div className="rounded-xl bg-amber-400 p-2.5 font-black text-slate-950">
            <div className="text-[10px] uppercase">2. Tanda Titik ( . )</div>
            <div className="text-base">Ucapkan Kata &quot;RIBU&quot;</div>
          </div>
          <div className="rounded-xl border border-emerald-400/40 bg-slate-800 p-2.5">
            <div className="text-[10px] font-bold uppercase text-emerald-300">3. Rak kanan titik</div>
            <div className="text-xl font-black">{String(subAItems[subAIdx].val % 1000).padStart(3, "0")}</div>
            <div className="text-[11px] capitalize text-emerald-200">&quot;{angkaKeKata(subAItems[subAIdx].val % 1000)}&quot;</div>
          </div>
        </div>
      </div>
    );
  }

  if (subbab === "B") {
    return (
      <div className="space-y-4 rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-emerald-800">
              Pictorial Sub-bab B • Membandingkan dan Mengurutkan
            </span>
            <h3 className="mt-1 text-lg font-black text-slate-900">Diagram Batang Perbandingan 4 Papan Dakon</h3>
          </div>
          <button type="button" onClick={() => setIsSortedAsc(!isSortedAsc)} className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white shadow hover:bg-emerald-500">
            {isSortedAsc ? "Tampilkan Urutan Awal" : "Urutkan Bar dari Termurah ke Termahal"}
          </button>
        </div>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
          <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-4 text-xs">
            <div className="text-sm font-black text-indigo-900">Cara visual membandingkan digit dari kiri:</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <strong>Langkah 1 (Cek tiang puluh ribuan):</strong> Dakon A (<strong>5</strong>6.560) dan Dakon C (<strong>5</strong>7.000) sama-sama memiliki angka puluh ribuan paling kecil yaitu <strong>5</strong> (50.000). Dakon D paling besar yaitu <strong>7</strong> (75.360).
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-2.5">
              <strong>Langkah 2 (Geser ke tiang ribuan):</strong> Antara Dakon A dan Dakon C, bandingkan angka ribuannya: <strong>6.000 &lt; 7.000</strong>. Maka <strong>Dakon A (Rp56.560)</strong> adalah yang paling murah.
            </div>
          </div>
          <div className="space-y-2.5 rounded-2xl bg-slate-900 p-4 text-white">
            {renderedDakon.map((item, idx) => (
              <div key={item.code} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span>{isSortedAsc ? `#${idx + 1} ` : ""}{item.code}</span>
                  <span className="font-black text-amber-300">Rp{fmtRibuan(item.price)},00</span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-lg bg-slate-800">
                  <div style={{ width: `${(item.price / 80000) * 100}%` }} className={`flex h-full items-center px-2.5 text-[10px] font-black text-white transition-all duration-500 ${item.color}`}>
                    Puluh Ribuan: {item.pr} | Ribuan: {item.r}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (subbab === "C") {
    return (
      <div className="space-y-4 rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
        <div>
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-amber-800">
            Pictorial Sub-bab C • Komposisi dan Dekomposisi
          </span>
          <h3 className="mt-1 text-lg font-black text-slate-900">Visualisasi Tumpukan Pecahan Uang</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs">
            <div className="font-black uppercase text-indigo-900">1. Komposisi (menyatukan pecahan uang)</div>
            <div className="space-y-1 rounded-xl border border-indigo-200 bg-indigo-50/70 p-3">
              <div className="font-black text-indigo-950">Dompet Asep → Total Rp38.600,00</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="rounded bg-rose-600 px-2 py-1 font-bold text-white">3× [Rp10.000] = 30.000</span>
                <span className="rounded bg-amber-500 px-2 py-1 font-bold text-slate-950">8× [Rp1.000] = 8.000</span>
                <span className="rounded bg-emerald-600 px-2 py-1 font-bold text-white">6× (Rp100) = 600</span>
              </div>
            </div>
            <div className="space-y-1 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
              <div className="font-black text-amber-950">Dompet Lukas → Total Rp63.500,00</div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="rounded bg-rose-600 px-2 py-1 font-bold text-white">6× [Rp10.000] = 60.000</span>
                <span className="rounded bg-amber-500 px-2 py-1 font-bold text-slate-950">3× [Rp1.000] = 3.000</span>
                <span className="rounded bg-emerald-600 px-2 py-1 font-bold text-white">5× (Rp100) = 500</span>
              </div>
            </div>
          </div>
          <div className="space-y-3 rounded-2xl bg-slate-900 p-4 text-xs text-white">
            <div className="font-black uppercase text-amber-300">2. Dekomposisi 3 cara membayar Rp45.600 (uang Komang)</div>
            <div className="flex gap-2">
              {([1, 2, 3] as const).map((m) => (
                <button key={m} type="button" onClick={() => setKomangMode(m)} className={`flex-1 rounded-xl py-2 font-black ${komangMode === m ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-300"}`}>
                  Cara #{m}
                </button>
              ))}
            </div>
            <div className="space-y-1.5 rounded-xl border border-slate-700 bg-slate-800 p-3.5">
              {komangMode === 1 ? (
                <>
                  <div className="font-black text-emerald-300">Cara 1 (standar nilai tempat):</div>
                  <div>4 lembar [Rp10.000] = Rp40.000</div>
                  <div>5 lembar [Rp1.000] = Rp5.000</div>
                  <div>6 keping (Rp100) = Rp600 → Total = Rp45.600,00</div>
                </>
              ) : null}
              {komangMode === 2 ? (
                <>
                  <div className="font-black text-amber-300">Cara 2 (1 lembar 10.000 dipecah jadi 10 lembar 1.000):</div>
                  <div>3 lembar [Rp10.000] = Rp30.000</div>
                  <div>15 lembar [Rp1.000] = Rp15.000</div>
                  <div>6 keping (Rp100) = Rp600 → Total = Rp45.600,00</div>
                </>
              ) : null}
              {komangMode === 3 ? (
                <>
                  <div className="font-black text-sky-300">Cara 3 (1 lembar 1.000 dipecah jadi 10 keping 100):</div>
                  <div>4 lembar [Rp10.000] = Rp40.000</div>
                  <div>4 lembar [Rp1.000] = Rp4.000</div>
                  <div>16 keping (Rp100) = Rp1.600 → Total = Rp45.600,00</div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-3xl border-2 border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-black uppercase text-rose-800">
            Pictorial Sub-bab D • Operasi Hitung Sampai 100.000
          </span>
          <h3 className="mt-1 text-lg font-black text-slate-900">Diagram Bar Model Penjumlahan, Pengurangan, Perkalian, dan Pembagian</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {([
            { id: "tambah", label: "Bakti Sosial Nisa" },
            { id: "kurang", label: "Ayam Taliwang Lukas" },
            { id: "kaliBagi", label: "Angpau dan Bagi Rata Yohana" },
          ] as const).map((b) => (
            <button key={b.id} type="button" onClick={() => setOpTab(b.id)} className={`rounded-xl px-3 py-1.5 text-xs font-black ${opTab === b.id ? "bg-indigo-600 text-white shadow" : "border border-slate-300 bg-white text-slate-700"}`}>
              {b.label}
            </button>
          ))}
        </div>
      </div>
      {opTab === "tambah" ? (
        <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="font-black uppercase text-indigo-900">1. Cara Yohana (dekomposisi bersusun panjang):</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono leading-relaxed">
              Uang Ibu (57.500) = 50.000 + 7.000 + 500 + 0 + 0
              <br />
              Uang Ayah (22.000) = 20.000 + 2.000 + 0 + 0 + 0
              <br />
              ------------------------------------------------- (+)
              <br />
              Total Dana Nisa = 70.000 + 9.000 + 500 = <strong>Rp79.500</strong>
            </div>
          </div>
          <div className="space-y-2 rounded-2xl bg-slate-900 p-4 text-white">
            <div className="font-black uppercase text-amber-300">2. Diagram bar model penjumlahan Nisa:</div>
            <div className="flex gap-1 pt-2">
              <div className="w-[72%] rounded-l-xl bg-indigo-500 px-2 py-3 text-center font-black">Uang Ibu: Rp57.500</div>
              <div className="w-[28%] rounded-r-xl bg-emerald-500 px-2 py-3 text-center font-black text-slate-950">Ayah: Rp22.000</div>
            </div>
            <div className="rounded-xl bg-amber-400 py-2 text-center font-black text-slate-950">Digabung menjadi = Rp79.500,00</div>
          </div>
        </div>
      ) : null}
      {opTab === "kurang" ? (
        <div className="space-y-3 rounded-2xl bg-slate-900 p-4 text-xs text-white">
          <div className="font-black uppercase text-amber-300">Diagram bar model kuliner Lukas (uang Rp47.900):</div>
          <div className="w-full rounded-xl bg-emerald-500 py-2 text-center font-black text-slate-950">Modal uang Lukas = Rp47.900,00 (dipecah: 40.000 + 7.000 + 800 + 100)</div>
          <div className="flex h-8 overflow-hidden rounded-xl">
            <div className="w-[68%] bg-amber-400" />
            <div className="w-[27%] bg-sky-400" />
            <div className="w-[5%] bg-rose-500" />
          </div>
          <div className="flex justify-between gap-2 text-[10px] font-black">
            <span className="text-amber-300">Ayam Taliwang Rp32.500</span>
            <span className="text-sky-300">Plecing Rp13.250</span>
            <span className="text-rose-300">Sisa Rp2.150</span>
          </div>
          <div className="rounded-xl bg-slate-800 p-3 text-slate-200">
            Total makanan = Rp32.500 + Rp13.250 = <strong>Rp45.750,00</strong>.
            <br />
            Sisa uang Lukas = Rp47.900 − Rp45.750 = <strong>Rp2.150,00</strong>.
          </div>
        </div>
      ) : null}
      {opTab === "kaliBagi" ? (
        <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="font-black uppercase text-rose-800">Matriks perkalian 12 angpau × Rp5.000:</div>
            <p className="text-slate-600">Pisahkan pengali 12 menjadi 10 puluhan + 2 satuan:</p>
            <div className="space-y-1 rounded-xl border border-rose-200 bg-rose-50 p-3 font-bold">
              <div>10 × Rp5.000 = Rp50.000</div>
              <div>2 × Rp5.000 = Rp10.000</div>
              <div className="border-t border-rose-300 pt-1 font-black text-rose-900">Total uang Yohana = Rp50.000 + Rp10.000 = Rp60.000,00</div>
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="font-black uppercase text-indigo-900">Diagram pembagian Rp64.000 ÷ 4 anak:</div>
            <p className="text-slate-600">Pecah Rp64.000 menjadi Rp40.000 + Rp24.000 lalu bagi 4:</p>
            <div className="grid grid-cols-4 gap-1.5 pt-1 text-center font-black">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="rounded-xl border border-indigo-200 bg-indigo-50 p-2">
                  <div className="text-[10px] text-slate-500">Anak #{n}</div>
                  <div className="text-indigo-700">10rb + 6rb</div>
                  <div className="text-emerald-700">= Rp16.000</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
