"use client";

import { useState } from "react";
import SempoaEnam from "@/components/SempoaEnam";
import { bacaanCacah, titikRibuan } from "@/lib/bacaan-cacah";
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

const RAK_PUTAR = ["Ratus ribuan", "Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
const NILAI_RAK = [100000, 10000, 1000, 100, 10, 1];
const TARGET_LAMPU = 648370;

function nilaiDigit(digit: number[]): number {
  return digit.reduce((total, angka, indeks) => total + angka * NILAI_RAK[indeks], 0);
}

export function GameSensus() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "merah";
  return (
    <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">Permainan sempoa penumpang</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Sempoa ini membaca 537.420. Lalu bandingkan dua pangkalan. Tiga rak kiri mereka sama.</p>
      <SempoaEnam nilai={537420} />
      <p className="text-center text-sm font-black text-[#1C01A5]">537.420 = {bacaanCacah(537420)}</p>
      <p className="mt-3 text-sm font-semibold text-slate-700">Pangkalan Merah 418.265 penumpang. Pangkalan Biru 418.192 penumpang. Mana yang lebih banyak?</p>
      <div className="mt-3 grid gap-2">
        <button type="button" onClick={() => { setPilih("merah"); bunyi("fanfare"); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === "merah" ? "bg-emerald-600 text-white" : "bg-white text-[#1C01A5]"}`}>
          418.265 lebih banyak. Rak ratusannya 2, lawannya 1.
        </button>
        <button type="button" onClick={() => { setPilih("biru"); bunyi("wrong"); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === "biru" ? "bg-rose-600 text-white" : "bg-white text-[#1C01A5]"}`}>
          418.192 lebih banyak karena 92 lebih besar di ujung kanan.
        </button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Tepat. Ratus ribuan, puluh ribuan, dan ribuan sama-sama 4, 1, dan 8. Yang memutuskan adalah rak ratusan.</p> : null}
      {pilih === "biru" ? <p className="mt-3 text-sm font-bold text-rose-800">Jangan lompat ke ujung kanan. Geser dari kiri sampai ada rak yang beda.</p> : null}
    </article>
  );
}

export function GamePutar() {
  const [digit, setDigit] = useState([6, 4, 8, 3, 0, 0]);
  const nilai = nilaiDigit(digit);
  const tepat = nilai === TARGET_LAMPU;
  const putar = (indeks: number, arah: number) => {
    const berikut = digit.map((angka, posisi) => (posisi === indeks ? (angka + arah + 10) % 10 : angka));
    setDigit(berikut);
    bunyi(nilaiDigit(berikut) === TARGET_LAMPU ? "fanfare" : "dial");
  };
  return (
    <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
      <p className="text-sm font-black text-amber-950">Permainan putar rak</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Harga lampu geladak adalah 648.370. Putar tiap rak sampai sempoanya sama.</p>
      <SempoaEnam nilai={nilai} />
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {RAK_PUTAR.map((nama, indeks) => (
          <div key={nama} className="rounded-xl bg-white px-1 py-2 text-center ring-2 ring-amber-200">
            <p className="text-[10px] font-black uppercase text-slate-600">{nama}</p>
            <button type="button" onClick={() => putar(indeks, 1)} className="mt-1 w-full rounded-lg bg-amber-100 text-sm font-black text-[#1C01A5]">▲</button>
            <p className="py-1 text-2xl font-black text-[#1C01A5]">{digit[indeks]}</p>
            <button type="button" onClick={() => putar(indeks, -1)} className="w-full rounded-lg bg-amber-100 text-sm font-black text-[#1C01A5]">▼</button>
          </div>
        ))}
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">648.370 tepat. Bacanya {bacaanCacah(TARGET_LAMPU)}.</p> : <p className="mt-3 text-center text-sm font-black text-[#1C01A5]">Sekarang {titikRibuan(nilai)}. Target 648.370.</p>}
    </article>
  );
}

const BARANG = [
  { nama: "Lampu geladak", harga: 286415, tempat: "Puluh ribuan, nilainya 80.000" },
  { nama: "Tali tambang", harga: 174830, tempat: "Ratusan, nilainya 800" },
  { nama: "Teropong", harga: 531248, tempat: "Satuan, nilainya 8" },
  { nama: "Pelampung", harga: 158206, tempat: "Ribuan, nilainya 8.000" },
  { nama: "Kait jangkar", harga: 132785, tempat: "Puluhan, nilainya 80" },
];

export function GameDetektor() {
  const [aktif, setAktif] = useState(0);
  return (
    <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">Permainan detektor angka 8</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Ketuk barang di kios Farhan. Mesin mencari di rak mana angka 8 berdiri.</p>
      <div className="mt-3 grid gap-2">
        {BARANG.map((barang, indeks) => (
          <button
            key={barang.nama}
            type="button"
            onClick={() => { setAktif(indeks); bunyi("click"); }}
            className={`flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold ${aktif === indeks ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
          >
            <span>{barang.nama}</span>
            <span>{titikRibuan(barang.harga)}</span>
          </button>
        ))}
      </div>
      <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-black text-emerald-800">Angka 8 pada {BARANG[aktif].nama}: {BARANG[aktif].tempat}.</p>
    </article>
  );
}

export function GameUrutHarga() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "benar";
  return (
    <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
      <p className="text-sm font-black text-emerald-950">Permainan urut harga kios</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Farhan 462.815, Saka 351.240, Leni 248.670. Urutkan dari yang termahal.</p>
      <div className="mt-3 grid gap-2">
        <button type="button" onClick={() => { setPilih("benar"); bunyi("coin"); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === "benar" ? "bg-emerald-600 text-white" : "bg-white text-[#1C01A5]"}`}>
          Farhan, lalu Saka, lalu Leni
        </button>
        <button type="button" onClick={() => { setPilih("salah"); bunyi("wrong"); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${pilih === "salah" ? "bg-rose-600 text-white" : "bg-white text-[#1C01A5]"}`}>
          Saka, lalu Farhan, lalu Leni
        </button>
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-800">Rak ratus ribuan memutuskan: 4, lalu 3, lalu 2.</p> : null}
      {pilih === "salah" ? <p className="mt-3 text-sm font-bold text-rose-800">Lihat angka paling kiri. 4 lebih besar daripada 3.</p> : null}
    </article>
  );
}

const MUSIM = [
  { tahun: "2021", jumlah: 348210 },
  { tahun: "2022", jumlah: 381560 },
  { tahun: "2023", jumlah: 419250 },
  { tahun: "2024", jumlah: 427680 },
  { tahun: "2025", jumlah: 58340 },
];

export function GameGrafik() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "2025";
  return (
    <article className="rounded-2xl border-2 border-slate-300 bg-slate-900 p-4 text-white">
      <p className="text-sm font-black text-amber-300">Permainan grafik penumpang</p>
      <p className="mt-1 text-sm font-semibold text-slate-200">Lima tahun kapal senja. Batang paling pendek adalah penumpang paling sedikit.</p>
      <div className="mt-3 flex h-44 items-end justify-between gap-2 border-b border-l border-slate-600 px-2">
        {MUSIM.map((musim) => (
          <div key={musim.tahun} className="flex w-full flex-col items-center">
            <span className="text-[10px] font-black text-amber-200">{titikRibuan(musim.jumlah)}</span>
            <div className={`mt-1 w-full rounded-t-lg ${musim.tahun === "2025" ? "bg-rose-400" : "bg-sky-400"}`} style={{ height: `${Math.max(16, (musim.jumlah / 450000) * 120)}px` }} />
            <span className="mt-1 text-xs font-bold">{musim.tahun}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold">Tahun mana penumpangnya paling sedikit?</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-3">
        {["2021", "2024", "2025"].map((tahun) => (
          <button
            key={tahun}
            type="button"
            onClick={() => { setPilih(tahun); bunyi(tahun === "2025" ? "fanfare" : "wrong"); }}
            className={`rounded-xl px-3 py-2 text-sm font-black ${pilih === tahun ? (tahun === "2025" ? "bg-emerald-500 text-slate-950" : "bg-rose-500 text-white") : "bg-slate-800"}`}
          >
            {tahun}
          </button>
        ))}
      </div>
      {tepat ? <p className="mt-3 text-sm font-black text-emerald-300">2025 hanya 58.340. Batangnya paling pendek, jadi penumpangnya paling sedikit.</p> : null}
      {pilih && !tepat ? <p className="mt-3 text-sm font-bold text-rose-300">Cari batang yang paling pendek, bukan yang paling tinggi.</p> : null}
    </article>
  );
}

const LEMBAR = [
  { nilai: 100000, maks: 2, nama: "100.000" },
  { nilai: 50000, maks: 2, nama: "50.000" },
  { nilai: 10000, maks: 2, nama: "10.000" },
  { nilai: 2000, maks: 4, nama: "2.000" },
  { nilai: 100, maks: 4, nama: "100" },
];
const TARGET_TEROPONG = 262400;

export function GameDompet() {
  const [lembar, setLembar] = useState<Record<number, number>>({ 100000: 1 });
  const total = LEMBAR.reduce((jumlah, item) => jumlah + item.nilai * (lembar[item.nilai] ?? 0), 0);
  const tepat = total === TARGET_TEROPONG;
  const ubah = (nilai: number, langkah: number, maks: number) => {
    const kini = lembar[nilai] ?? 0;
    const berikut = Math.max(0, Math.min(maks, kini + langkah));
    if (berikut === kini) return;
    const jumlahBaru = total + (berikut - kini) * nilai;
    setLembar((lama) => ({ ...lama, [nilai]: berikut }));
    bunyi(jumlahBaru === TARGET_TEROPONG ? "fanfare" : "cash");
  };
  return (
    <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
      <p className="text-sm font-black text-rose-950">Permainan susun lembar</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">Farhan ingin teropong seharga 262.400. Tambah atau kurangi lembar sampai jumlahnya pas. Tiap lembar punya batas.</p>
      <p className={`mt-3 rounded-2xl px-3 py-3 text-center text-sm font-black ${tepat ? "bg-emerald-600 text-white" : "bg-slate-900 text-white"}`}>
        {titikRibuan(total)} / 262.400
        <span className="mt-1 block text-xs font-bold">{tepat ? "Jumlahnya pas." : total < TARGET_TEROPONG ? `Masih kurang ${titikRibuan(TARGET_TEROPONG - total)}.` : `Kelebihan ${titikRibuan(total - TARGET_TEROPONG)}.`}</span>
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {LEMBAR.map((item) => (
          <div key={item.nilai} className="flex items-center justify-between rounded-xl bg-white px-3 py-2">
            <div>
              <p className="text-sm font-black text-[#1C01A5]">{item.nama}</p>
              <p className="text-xs font-bold text-slate-500">paling banyak {item.maks} · {titikRibuan((lembar[item.nilai] ?? 0) * item.nilai)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => ubah(item.nilai, -1, item.maks)} className="h-8 w-8 rounded-full bg-slate-200 text-lg font-black">−</button>
              <span className="w-4 text-center font-black">{lembar[item.nilai] ?? 0}</span>
              <button type="button" onClick={() => ubah(item.nilai, 1, item.maks)} className="h-8 w-8 rounded-full bg-[#1C01A5] text-lg font-black text-white">+</button>
            </div>
          </div>
        ))}
      </div>
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
