"use client";

import { useState } from "react";

function GrupTurus({ jumlah }: { jumlah: number }) {
  const grup = Math.floor(jumlah / 5);
  const sisa = jumlah % 5;
  const kotak = [
    ...Array.from({ length: grup }, () => 5),
    ...(sisa > 0 ? [sisa] : []),
  ];
  return (
    <div className="flex flex-wrap items-end gap-3">
      {kotak.map((isi, indeks) => (
        <svg key={`${indeks}-${isi}`} viewBox="0 0 72 64" className="h-16 w-16" aria-hidden>
          {[0, 1, 2, 3].slice(0, Math.min(isi, 4)).map((garis) => (
            <line key={garis} x1={12 + garis * 12} y1="8" x2={12 + garis * 12} y2="56" stroke="#1C01A5" strokeWidth="4" strokeLinecap="round" />
          ))}
          {isi >= 5 ? <line x1="8" y1="50" x2="60" y2="12" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" /> : null}
        </svg>
      ))}
    </div>
  );
}

export function GameTurus() {
  const [jumlah, setJumlah] = useState(0);
  const tepat = jumlah === 9;
  return (
    <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
      <p className="text-sm font-black text-amber-950">Permainan turus</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Omar butuh 9 teman untuk paduan burung. Tambahkan satu garis untuk setiap teman.</p>
      <p className="mt-2 text-3xl font-black text-[#1C01A5]">{jumlah}</p>
      <div className="mt-3 min-h-16">
        <GrupTurus jumlah={jumlah} />
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => setJumlah((nilai) => Math.min(15, nilai + 1))} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Tambah 1</button>
        <button type="button" onClick={() => setJumlah((nilai) => Math.max(0, nilai - 1))} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">Kurangi 1</button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Tepat. Satu kelompok 5 dan empat garis lagi. Jumlahnya 9.</p> : null}
    </article>
  );
}

export function GamePiktogram() {
  const [jumlah, setJumlah] = useState(0);
  const nilai = jumlah * 4;
  const tepat = nilai === 16;
  return (
    <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
      <p className="text-sm font-black text-rose-950">Permainan piktogram</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Kunci: 1 burung kertas = 4 tamu. Susun burung sampai nilainya 16.</p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2" aria-label={`${jumlah} burung, nilai ${nilai}`}>
        {Array.from({ length: jumlah }, (_, indeks) => (
          <span key={indeks} className="text-4xl" aria-hidden>🐦</span>
        ))}
      </div>
      <p className="mt-2 text-lg font-black text-[#1C01A5]">{jumlah} burung = {nilai} tamu</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => setJumlah((nilaiLama) => Math.min(8, nilaiLama + 1))} className="rounded-full bg-rose-600 px-4 py-2 text-sm font-black text-white">Tambah burung</button>
        <button type="button" onClick={() => setJumlah((nilaiLama) => Math.max(0, nilaiLama - 1))} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">Kurangi</button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Tepat. 4 burung mewakili 16 tamu.</p> : null}
    </article>
  );
}

export function GameBatang() {
  const [nilai, setNilai] = useState(4);
  const tepat = nilai === 18;
  return (
    <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">Permainan tinggi batang</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Jalak sore hari ada 18. Samakan tinggi batang dengan angka itu. Skala 0 sampai 20.</p>
      <svg viewBox="0 0 220 160" className="mx-auto mt-2 w-full max-w-xs" role="img" aria-label={`Batang setinggi ${nilai}`}>
        <line x1="40" y1="20" x2="40" y2="130" stroke="#1C01A5" strokeWidth="3" />
        <line x1="40" y1="130" x2="190" y2="130" stroke="#1C01A5" strokeWidth="3" />
        {[0, 10, 20].map((angka) => (
          <text key={angka} x="8" y={130 - angka * 5 + 4} fill="#1C01A5" fontSize="12" fontWeight="700">{angka}</text>
        ))}
        <rect x="80" y={130 - nilai * 5} width="48" height={nilai * 5} fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
        <text x="104" y="148" textAnchor="middle" fill="#1C01A5" fontSize="13" fontWeight="700">{nilai}</text>
      </svg>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => setNilai((lama) => Math.min(20, lama + 2))} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">Naik 2</button>
        <button type="button" onClick={() => setNilai((lama) => Math.max(0, lama - 2))} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">Turun 2</button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Tinggi batang sudah 18. Pembaca tidak akan salah hitung.</p> : null}
    </article>
  );
}

export function GameSkala() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "sama";
  return (
    <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">Permainan skala</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Dua diagram sama-sama menulis 11. Skala kirinya sampai 12. Skala kanannya sampai 40.</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <SkalaMini judul="Skala 12" puncak={12} nilai={11} />
        <SkalaMini judul="Skala 40" puncak={40} nilai={11} />
      </div>
      <div className="mt-3 grid gap-2">
        {[
          ["kiri", "Kiri lebih banyak karena batangnya lebih tinggi"],
          ["sama", "Banyaknya sama, yaitu 11"],
          ["kanan", "Kanan lebih banyak karena diagramnya lebih lebar"],
        ].map(([kode, teks]) => (
          <button key={kode} type="button" onClick={() => setPilih(kode)} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === kode ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}>{teks}</button>
        ))}
      </div>
      {pilih && !tepat ? <p className="mt-3 text-sm font-bold text-rose-800">Lihat angka di ujung batang, bukan tinggi gambarnya.</p> : null}
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Benar. Keduanya 11. Skala yang berbeda mengubah tinggi gambar.</p> : null}
    </article>
  );
}

function SkalaMini({ judul, puncak, nilai }: { judul: string; puncak: number; nilai: number }) {
  const tinggi = Math.round((nilai / puncak) * 90);
  return (
    <div className="rounded-xl bg-white p-2 text-center">
      <p className="text-xs font-black text-[#1C01A5]">{judul}</p>
      <svg viewBox="0 0 80 120" className="mx-auto h-28" aria-hidden>
        <line x1="16" y1="8" x2="16" y2="104" stroke="#1C01A5" strokeWidth="2" />
        <line x1="16" y1="104" x2="70" y2="104" stroke="#1C01A5" strokeWidth="2" />
        <rect x="28" y={104 - tinggi} width="24" height={tinggi} fill="#a78bfa" />
        <text x="40" y="116" textAnchor="middle" fill="#1C01A5" fontSize="11" fontWeight="700">{nilai}</text>
      </svg>
    </div>
  );
}

export function GameKeputusan() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "anggur";
  const anggur = [1, 3, 5, 8];
  const jeruk = [10, 7, 4, 2];
  return (
    <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
      <p className="text-sm font-black text-emerald-950">Permainan keputusan</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Empat sore terakhir. Es mana yang perlu ditambah besok sore?</p>
      <table className="mt-3 w-full text-center text-sm font-bold text-[#1C01A5]">
        <thead>
          <tr>
            <th className="p-1">Es</th>
            {["I", "II", "III", "IV"].map((hari) => <th key={hari} className="p-1">{hari}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-1">Anggur</td>
            {anggur.map((nilai) => <td key={`a-${nilai}`} className="p-1">{nilai}</td>)}
          </tr>
          <tr>
            <td className="p-1">Jeruk</td>
            {jeruk.map((nilai) => <td key={`j-${nilai}`} className="p-1">{nilai}</td>)}
          </tr>
        </tbody>
      </table>
      <div className="mt-3 grid gap-2">
        {[
          ["jeruk", "Jeruk, karena angkanya dulu besar"],
          ["anggur", "Anggur, karena terus naik"],
          ["sama", "Keduanya, karena totalnya sama"],
        ].map(([kode, teks]) => (
          <button key={kode} type="button" onClick={() => setPilih(kode)} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === kode ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}>{teks}</button>
        ))}
      </div>
      {pilih && !tepat ? <p className="mt-3 text-sm font-bold text-rose-800">Lihat arah angkanya dari sore I ke sore IV.</p> : null}
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Anggur naik 1, 3, 5, 8. Jeruk turun. Besok, anggur perlu lebih banyak.</p> : null}
    </article>
  );
}
