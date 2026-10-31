"use client";

import { useState, type ReactNode } from "react";

type JenisSuara = "click" | "dial" | "cash" | "coin" | "wrong" | "fanfare";

let mesinSuara: AudioContext | null = null;

function konteksSuara(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const induk = window.AudioContext
    ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!induk) return null;
  if (!mesinSuara) mesinSuara = new induk();
  if (mesinSuara.state === "suspended") void mesinSuara.resume();
  return mesinSuara;
}

function mainkanSuara(jenis: JenisSuara) {
  try {
    const ctx = konteksSuara();
    if (!ctx) return;
    const sekarang = ctx.currentTime;
    const nada = (frekuensi: number, waktu: number, durasi: number, bentuk: OscillatorType, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = bentuk;
      osc.frequency.setValueAtTime(frekuensi, waktu);
      gain.gain.setValueAtTime(volume, waktu);
      gain.gain.exponentialRampToValueAtTime(0.008, waktu + durasi);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(waktu);
      osc.stop(waktu + durasi);
    };
    if (jenis === "click" || jenis === "dial") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = jenis === "dial" ? "triangle" : "sine";
      osc.frequency.setValueAtTime(jenis === "dial" ? 620 : 480, sekarang);
      osc.frequency.exponentialRampToValueAtTime(260, sekarang + 0.06);
      gain.gain.setValueAtTime(0.12, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.06);
      return;
    }
    if (jenis === "cash") {
      nada(783.99, sekarang, 0.18, "triangle", 0.16);
      nada(1046.5, sekarang + 0.06, 0.18, "triangle", 0.16);
      return;
    }
    if (jenis === "coin") {
      nada(987.77, sekarang, 0.24, "sine", 0.16);
      nada(1318.51, sekarang + 0.08, 0.24, "sine", 0.16);
      return;
    }
    if (jenis === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(175, sekarang);
      osc.frequency.linearRampToValueAtTime(115, sekarang + 0.24);
      gain.gain.setValueAtTime(0.12, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.24);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.24);
      return;
    }
    [523.25, 659.25, 783.99, 1046.5].forEach((frekuensi, indeks) => {
      nada(frekuensi, sekarang + indeks * 0.1, 0.32, "triangle", 0.16);
    });
  } catch {
    /* Browser boleh menolak audio. Permainan tetap jalan. */
  }
}

const SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];

function bacaDiBawahSeribu(nilai: number): string {
  if (nilai <= 0) return "";
  if (nilai < 12) return SATUAN[nilai] ?? "";
  if (nilai < 20) return `${SATUAN[nilai - 10]} belas`;
  if (nilai < 100) {
    const puluh = Math.floor(nilai / 10);
    const sisa = nilai % 10;
    return `${SATUAN[puluh]} puluh${sisa > 0 ? ` ${SATUAN[sisa]}` : ""}`;
  }
  const ratus = Math.floor(nilai / 100);
  const sisa = nilai % 100;
  const depan = ratus === 1 ? "seratus" : `${SATUAN[ratus]} ratus`;
  return `${depan}${sisa > 0 ? ` ${bacaDiBawahSeribu(sisa)}` : ""}`;
}

export function bacaBilangan(nilai: number): string {
  if (nilai === 0) return "nol";
  if (nilai === 100000) return "seratus ribu";
  const ribuan = Math.floor(nilai / 1000);
  const sisa = nilai % 1000;
  let hasil = "";
  if (ribuan === 1) hasil = "seribu";
  else if (ribuan > 1) hasil = `${bacaDiBawahSeribu(ribuan)} ribu`;
  if (sisa > 0) hasil += `${hasil ? " " : ""}${bacaDiBawahSeribu(sisa)}`;
  return hasil.trim();
}

function tulisRibuan(nilai: number): string {
  return nilai.toLocaleString("id-ID");
}

function ucapkan(teks: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const suara = new SpeechSynthesisUtterance(teks);
  suara.lang = "id-ID";
  suara.rate = 0.95;
  window.speechSynthesis.speak(suara);
}

const WARNA_RAK = ["#e11d48", "#d97706", "#16a34a", "#2563eb", "#7c3aed"];
const NAMA_RAK = ["Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];

function SempoaRak({ nilai }: { nilai: number }) {
  const aman = Math.max(0, Math.min(99999, nilai));
  const angka = [
    Math.floor(aman / 10000) % 10,
    Math.floor(aman / 1000) % 10,
    Math.floor(aman / 100) % 10,
    Math.floor(aman / 10) % 10,
    aman % 10,
  ];
  return (
    <svg viewBox="0 0 360 168" className="mx-auto w-full max-w-[360px]" aria-hidden>
      <rect x="15" y="132" width="330" height="14" rx="6" fill="#1C01A5" />
      {angka.map((banyak, kolom) => {
        const tengah = 48 + kolom * 66;
        return (
          <g key={NAMA_RAK[kolom]}>
            <rect x={tengah - 3} y="18" width="6" height="116" rx="3" fill="#94a3b8" />
            {Array.from({ length: banyak }, (_, manik) => (
              <rect
                key={manik}
                x={tengah - 16}
                y={122 - manik * 11}
                width="32"
                height="8"
                rx="4"
                fill={WARNA_RAK[kolom]}
                stroke="#ffffff"
              />
            ))}
            <text x={tengah} y="143" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700">{angka[kolom]}</text>
            <text x={tengah} y="160" textAnchor="middle" fill="#1C01A5" fontSize="8" fontWeight="700">{NAMA_RAK[kolom]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function KartuGame({ judul, anak, children }: { judul: string; anak: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border-2 border-sky-300 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">{anak}</p>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

const RAK_BRANKAS = [
  { nama: "Puluh ribuan", kali: 10000, warna: "border-rose-300 bg-rose-50" },
  { nama: "Ribuan", kali: 1000, warna: "border-amber-300 bg-amber-50" },
  { nama: "Ratusan", kali: 100, warna: "border-emerald-300 bg-emerald-50" },
  { nama: "Puluhan", kali: 10, warna: "border-sky-300 bg-sky-50" },
  { nama: "Satuan", kali: 1, warna: "border-violet-300 bg-violet-50" },
];

export function GameBrankasRak() {
  const [target, setTarget] = useState(74520);
  const [roda, setRoda] = useState([0, 0, 0, 0, 0]);
  const kini = roda[0] * 10000 + roda[1] * 1000 + roda[2] * 100 + roda[3] * 10 + roda[4];
  const terbuka = kini === target;

  const putar = (indeks: number, arah: 1 | -1) => {
    const berikut = [...roda];
    berikut[indeks] = (berikut[indeks] + (arah === 1 ? 1 : 9)) % 10;
    const jumlah = berikut[0] * 10000 + berikut[1] * 1000 + berikut[2] * 100 + berikut[3] * 10 + berikut[4];
    setRoda(berikut);
    mainkanSuara(jumlah === target ? "fanfare" : "dial");
  };

  return (
    <KartuGame judul="Game rak: brankas lima roda" anak="Putar tiap rak sampai angkanya sama dengan sandi.">
      <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-3 py-3 text-center">
        <p className="text-xs font-black uppercase text-amber-900">Sandi yang harus dibuka</p>
        <p className="mt-1 text-lg font-black capitalize text-[#1C01A5]">{bacaBilangan(target)}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => { mainkanSuara("click"); ucapkan(bacaBilangan(target)); }} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Bacakan sandi</button>
        <button type="button" onClick={() => { mainkanSuara("click"); setTarget(12000 + Math.floor(Math.random() * 87000)); setRoda([0, 0, 0, 0, 0]); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300">Sandi baru</button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {RAK_BRANKAS.map((rak, indeks) => (
          <div key={rak.nama} className={`rounded-2xl border-2 p-2 text-center ${rak.warna}`}>
            <p className="text-[10px] font-black leading-tight text-slate-700">{rak.nama}</p>
            <button type="button" onClick={() => putar(indeks, 1)} className="mt-2 w-full rounded-lg bg-white text-sm font-black text-[#1C01A5] ring-1 ring-slate-200">Naik</button>
            <p className="py-1 text-3xl font-black text-[#1C01A5]">{roda[indeks]}</p>
            <button type="button" onClick={() => putar(indeks, -1)} className="w-full rounded-lg bg-white text-sm font-black text-[#1C01A5] ring-1 ring-slate-200">Turun</button>
            <p className="mt-1 text-[11px] font-bold text-slate-600">{tulisRibuan(roda[indeks] * rak.kali)}</p>
          </div>
        ))}
      </div>
      <SempoaRak nilai={kini} />
      <p className={`rounded-2xl px-3 py-3 text-center text-sm font-black ${terbuka ? "bg-emerald-100 text-emerald-900" : "bg-[#1C01A5] text-white"}`}>
        {tulisRibuan(kini)} · {bacaBilangan(kini)}
        {terbuka ? " · Brankas terbuka." : ""}
      </p>
    </KartuGame>
  );
}

export function GameRadarBanding() {
  const [kiri, setKiri] = useState(68450);
  const [kanan, setKanan] = useState(68910);
  const [pilih, setPilih] = useState<">" | "<" | null>(null);
  const tepat = pilih !== null && ((kiri > kanan && pilih === ">") || (kiri < kanan && pilih === "<"));

  const baru = () => {
    mainkanSuara("click");
    const dasar = Math.floor(20 + Math.random() * 75) * 1000;
    const a = dasar + Math.floor(100 + Math.random() * 800);
    let b = dasar + Math.floor(100 + Math.random() * 800);
    if (b === a) b += 120;
    setKiri(a);
    setKanan(b);
    setPilih(null);
  };

  return (
    <KartuGame judul="Game radar: banding dari kiri" anak="Lihat rak puluh ribuan dulu. Kalau sama, geser ke kanan.">
      <button type="button" onClick={baru} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300">Dua bilangan baru</button>
      <div className="grid gap-3 sm:grid-cols-3 sm:items-center">
        <p className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-3 py-4 text-center">
          <span className="block text-xs font-black text-indigo-800">Kiri</span>
          <span className="block text-3xl font-black text-[#1C01A5]">{tulisRibuan(kiri)}</span>
        </p>
        <div className="flex justify-center gap-2">
          {([">", "<"] as const).map((tanda) => (
            <button key={tanda} type="button" onClick={() => { setPilih(tanda); mainkanSuara((kiri > kanan && tanda === ">") || (kiri < kanan && tanda === "<") ? "fanfare" : "wrong"); }} className="rounded-2xl bg-[#1C01A5] px-4 py-3 text-lg font-black text-white">{tanda}</button>
          ))}
        </div>
        <p className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-3 py-4 text-center">
          <span className="block text-xs font-black text-amber-800">Kanan</span>
          <span className="block text-3xl font-black text-[#1C01A5]">{tulisRibuan(kanan)}</span>
        </p>
      </div>
      {pilih ? (
        <p className={`rounded-2xl px-3 py-3 text-sm font-bold ${tepat ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {tepat
            ? `${tulisRibuan(kiri)} ${pilih} ${tulisRibuan(kanan)}.`
            : `Coba lagi. Tanda yang cocok adalah ${kiri > kanan ? ">" : "<"}.`}
        </p>
      ) : null}
    </KartuGame>
  );
}

const LEMBAR = [
  { pecahan: 50000, nama: "50.000", warna: "bg-sky-700" },
  { pecahan: 20000, nama: "20.000", warna: "bg-emerald-700" },
  { pecahan: 10000, nama: "10.000", warna: "bg-violet-700" },
  { pecahan: 5000, nama: "5.000", warna: "bg-amber-600" },
  { pecahan: 2000, nama: "2.000", warna: "bg-slate-700" },
  { pecahan: 1000, nama: "1.000", warna: "bg-teal-700" },
] as const;

const KOSONG: Record<number, number> = { 50000: 0, 20000: 0, 10000: 0, 5000: 0, 2000: 0, 1000: 0 };

export function GameKasirUang() {
  const [harga, setHarga] = useState(87000);
  const [lembar, setLembar] = useState<Record<number, number>>({ ...KOSONG });
  const total = LEMBAR.reduce((jumlah, item) => jumlah + item.pecahan * (lembar[item.pecahan] ?? 0), 0);
  const pas = total === harga;

  return (
    <KartuGame judul="Game kasir: susun pecahan uang" anak="Tambah lembar sampai jumlahnya sama dengan harga.">
      <div className="flex flex-wrap gap-2">
        {[64000, 78000, 87000, 96000].map((pilihan) => (
          <button key={pilihan} type="button" onClick={() => { mainkanSuara("click"); setHarga(pilihan); setLembar({ ...KOSONG }); }} className={`rounded-full px-3 py-2 text-sm font-black ${harga === pilihan ? "bg-amber-400 text-slate-950" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}>Rp{tulisRibuan(pilihan)}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {LEMBAR.map((item) => (
          <div key={item.pecahan} className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-3">
            <p className={`rounded-xl px-2 py-2 text-center text-sm font-black text-white ${item.warna}`}>Rp{item.nama}</p>
            <div className="mt-2 flex items-center justify-between">
              <button type="button" onClick={() => { mainkanSuara("click"); setLembar((lama) => ({ ...lama, [item.pecahan]: Math.max(0, (lama[item.pecahan] ?? 0) - 1) })); }} className="h-8 w-8 rounded-lg bg-white font-black text-[#1C01A5] ring-1 ring-slate-200">-</button>
              <span className="text-sm font-black text-slate-800">{lembar[item.pecahan] ?? 0} lembar</span>
              <button type="button" onClick={() => { const berikut = total + item.pecahan; setLembar((lama) => ({ ...lama, [item.pecahan]: (lama[item.pecahan] ?? 0) + 1 })); mainkanSuara(berikut === harga ? "fanfare" : "cash"); }} className="h-8 w-8 rounded-lg bg-[#1C01A5] font-black text-white">+</button>
            </div>
          </div>
        ))}
      </div>
      <p className={`rounded-2xl px-3 py-3 text-center text-sm font-black ${pas ? "bg-emerald-100 text-emerald-900" : "bg-[#1C01A5] text-white"}`}>
        Terkumpul Rp{tulisRibuan(total)} · harga Rp{tulisRibuan(harga)}
        {pas ? " · Pas." : total < harga ? ` · Kurang Rp${tulisRibuan(harga - total)}.` : ` · Lebih Rp${tulisRibuan(total - harga)}.`}
      </p>
    </KartuGame>
  );
}

type OperasiKargo = "+" | "-" | "x" | ":";

export function GameKargoHitung() {
  const [operasi, setOperasi] = useState<OperasiKargo>("+");
  const [kiri, setKiri] = useState(45000);
  const [kanan, setKanan] = useState(28500);
  const kaliAtauBagi = operasi === "x" || operasi === ":";
  let hasil = 0;
  let catatan = "";
  if (operasi === "+") hasil = kiri + kanan;
  else if (operasi === "-") {
    if (kiri >= kanan) hasil = kiri - kanan;
    else {
      hasil = kanan - kiri;
      catatan = "Yang lebih besar dikurangi yang lebih kecil.";
    }
  } else if (operasi === "x") hasil = kiri * kanan;
  else {
    hasil = Math.floor(kiri / kanan);
    const sisa = kiri % kanan;
    if (sisa > 0) catatan = `Sisa ${tulisRibuan(sisa)}.`;
  }
  const tanda = operasi === "x" ? "×" : operasi === ":" ? "÷" : operasi;

  const ganti = (berikut: OperasiKargo) => {
    mainkanSuara("click");
    setOperasi(berikut);
    if (berikut === "x") {
      setKiri(15000);
      setKanan(4);
    } else if (berikut === ":") {
      setKiri(84000);
      setKanan(4);
    } else {
      setKiri(45000);
      setKanan(28500);
    }
  };

  return (
    <KartuGame judul="Game kargo: tambah, kurang, kali, bagi" anak="Geser kedua nilai. Hasilnya berubah langsung.">
      <div className="flex flex-wrap gap-2">
        {([
          ["+", "Tambah"],
          ["-", "Kurang"],
          ["x", "Kali"],
          [":", "Bagi"],
        ] as const).map(([kode, label]) => (
          <button key={kode} type="button" onClick={() => ganti(kode)} className={`rounded-full px-3 py-2 text-sm font-black ${operasi === kode ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-sky-200"}`}>{label}</button>
        ))}
      </div>
      <label className="block text-sm font-bold text-slate-700">
        Nilai pertama: {tulisRibuan(kiri)}
        <input type="range" min={operasi === "x" ? 5000 : 20000} max={operasi === "x" ? 24000 : operasi === ":" ? 96000 : 60000} step={operasi === ":" ? 1000 : 500} value={kiri} onChange={(event) => setKiri(Number(event.target.value))} className="mt-1 w-full accent-[#1C01A5]" />
      </label>
      <label className="block text-sm font-bold text-slate-700">
        {kaliAtauBagi ? `Pengali atau pembagi: ${kanan}` : `Nilai kedua: ${tulisRibuan(kanan)}`}
        <input type="range" min={kaliAtauBagi ? 2 : 10000} max={kaliAtauBagi ? 4 : 39000} step={kaliAtauBagi ? 1 : 500} value={kanan} onChange={(event) => setKanan(Number(event.target.value))} className="mt-1 w-full accent-amber-500" />
      </label>
      <p className="rounded-2xl bg-[#1C01A5] px-3 py-4 text-center text-xl font-black text-white">
        {tulisRibuan(kiri)} {tanda} {kaliAtauBagi ? kanan : tulisRibuan(kanan)} = <span className="text-emerald-300">{tulisRibuan(hasil)}</span>
      </p>
      {catatan ? <p className="text-center text-sm font-bold text-slate-600">{catatan}</p> : null}
    </KartuGame>
  );
}
