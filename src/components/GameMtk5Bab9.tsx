"use client";

import { useState } from "react";
import { mainkanSuara, type JenisSuara } from "@/lib/suara-web-audio";

let suaraNyala = true;

function bunyi(jenis: JenisSuara) {
  if (suaraNyala) mainkanSuara(jenis);
}

export function SaklarSuaraPermainan() {
  const [nyala, setNyala] = useState(suaraNyala);
  return (
    <button
      type="button"
      onClick={() => {
        suaraNyala = !suaraNyala;
        setNyala(suaraNyala);
        if (suaraNyala) bunyi("click");
      }}
      className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200"
    >
      {nyala ? "Suara permainan nyala" : "Suara permainan mati"}
    </button>
  );
}

const RAK = ["Ratus ribuan", "Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];

export function GameRak() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "Puluh ribuan";
  return (
    <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">Permainan enam rak</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Pada tiket 175.408, angka 7 berdiri di rak mana?</p>
      <p className="mt-2 text-center text-3xl font-black tracking-wide text-[#1C01A5]">175.408</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {RAK.map((nama) => (
          <button
            key={nama}
            type="button"
            onClick={() => {
              setPilih(nama);
              bunyi(nama === "Puluh ribuan" ? "fanfare" : "wrong");
            }}
            className={`rounded-xl px-3 py-2 text-sm font-black ${pilih === nama ? (tepat && nama === "Puluh ribuan" ? "bg-emerald-600 text-white" : nama === pilih && !tepat ? "bg-rose-600 text-white" : "bg-white") : "bg-white text-[#1C01A5]"}`}
          >
            {nama}
          </button>
        ))}
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Tepat. Angka 7 ada di rak puluh ribuan. Nilainya 70.000.</p> : null}
      {pilih && !tepat ? <p className="mt-3 text-sm font-bold text-rose-800">Hitung dari kiri: 1, lalu 7. Rak kedua adalah puluh ribuan.</p> : null}
    </article>
  );
}

export function GameBanding() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "640.500";
  return (
    <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
      <p className="text-sm font-black text-amber-950">Permainan tiket lebih mahal</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Rak kiri kedua bilangan sama-sama 6. Geser ke rak puluh ribuan.</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {["640.500", "604.500"].map((harga) => (
          <button
            key={harga}
            type="button"
            onClick={() => {
              setPilih(harga);
              bunyi(harga === "640.500" ? "fanfare" : "wrong");
            }}
            className={`rounded-2xl px-4 py-5 text-2xl font-black ${pilih === harga ? (harga === "640.500" ? "bg-emerald-600 text-white" : "bg-rose-600 text-white") : "bg-white text-[#1C01A5]"}`}
          >
            {harga}
          </button>
        ))}
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">640.500 lebih mahal. Di rak puluh ribuan, 4 lebih besar daripada 0.</p> : null}
      {pilih && !tepat ? <p className="mt-3 text-sm font-bold text-rose-800">Jangan berhenti di angka 6. Rak berikutnya yang memutuskan.</p> : null}
    </article>
  );
}

const URUTAN_BENAR = ["150.000", "501.000", "510.000"];

export function GameUrut() {
  const [sisa, setSisa] = useState(["510.000", "150.000", "501.000"]);
  const [susun, setSusun] = useState<string[]>([]);
  const [cek, setCek] = useState(false);
  const tepat = cek && susun.length === 3 && susun.every((item, indeks) => item === URUTAN_BENAR[indeks]);
  return (
    <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">Permainan urut harga</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Ketuk harga dari yang paling murah sampai yang paling mahal.</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.join("  →  ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((harga) => (
          <button
            key={harga}
            type="button"
            onClick={() => {
              bunyi("click");
              setSisa((lama) => lama.filter((item) => item !== harga));
              setSusun((lama) => [...lama, harga]);
              setCek(false);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-violet-200"
          >
            {harga}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setSusun((lama) => {
              const akhir = lama[lama.length - 1];
              if (akhir) setSisa((kartu) => [...kartu, akhir]);
              return lama.slice(0, -1);
            });
            setCek(false);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button
          type="button"
          onClick={() => {
            const cocok = susun.length === 3 && susun.every((item, indeks) => item === URUTAN_BENAR[indeks]);
            setCek(true);
            bunyi(cocok ? "fanfare" : "wrong");
          }}
          className="rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white"
        >
          Periksa urutan
        </button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">150.000, lalu 501.000, lalu 510.000.</p> : null}
      {cek && !tepat ? <p className="mt-3 text-sm font-bold text-rose-800">Bandingkan rak ratus ribuan dulu. 1 lebih kecil daripada 5.</p> : null}
    </article>
  );
}

export function GameSusun() {
  const [jumlah, setJumlah] = useState(0);
  const tepat = jumlah === 130000;
  const ubah = (langkah: number) => {
    const berikut = Math.max(0, Math.min(300000, jumlah + langkah));
    setJumlah(berikut);
    bunyi(berikut === 130000 ? "coin" : "pop");
  };
  return (
    <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
      <p className="text-sm font-black text-emerald-950">Permainan susun uang</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Leni butuh 130.000. Tambahkan lembar seratus ribuan atau sepuluh ribuan.</p>
      <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">{String(jumlah).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => ubah(100000)} className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-black text-white">+100.000</button>
        <button type="button" onClick={() => ubah(-100000)} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">−100.000</button>
        <button type="button" onClick={() => ubah(10000)} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white">+10.000</button>
        <button type="button" onClick={() => ubah(-10000)} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">−10.000</button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">1 lembar 100.000 dan 3 lembar 10.000. Jumlahnya 130.000.</p> : null}
    </article>
  );
}

export function GameUrai() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "benar";
  return (
    <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
      <p className="text-sm font-black text-rose-950">Permainan urai bilangan</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">670.008 diurai ke rak yang benar. Pilih uraiannya.</p>
      <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">670.008</p>
      <div className="mt-3 grid gap-2">
        <button type="button" onClick={() => { setPilih("benar"); bunyi("fanfare"); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === "benar" ? "bg-emerald-600 text-white" : "bg-white text-[#1C01A5]"}`}>6 ratus ribuan, 7 puluh ribuan, dan 8 satuan</button>
        <button type="button" onClick={() => { setPilih("salah"); bunyi("wrong"); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === "salah" ? "bg-rose-600 text-white" : "bg-white text-[#1C01A5]"}`}>6 puluh ribuan, 7 ribuan, dan 8 ratusan</button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Rak kosong tetap nol. Yang berisi hanya ratus ribuan, puluh ribuan, dan satuan.</p> : null}
      {pilih === "salah" ? <p className="mt-3 text-sm font-bold text-rose-800">Angka 6 ada di rak paling kiri, yaitu ratus ribuan.</p> : null}
    </article>
  );
}
