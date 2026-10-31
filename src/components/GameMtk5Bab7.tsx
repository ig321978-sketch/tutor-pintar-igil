"use client";

import { useState } from "react";

type JenisSuara = "click" | "scan" | "rotate" | "wrong" | "fanfare";
type Kelompok = "segitiga" | "segi-empat";
type KunciBangun =
  | "samaSisi"
  | "samaKaki"
  | "sikuSembarang"
  | "persegi"
  | "persegiPanjang"
  | "jajargenjang"
  | "belahKetupat"
  | "layang"
  | "trapesiumSamaKaki";

interface ProfilBangun {
  kunci: KunciBangun;
  nama: string;
  kelompok: Kelompok;
  sisi: string;
  sejajar: string;
  sudut: string;
  diagonal: string;
  lipat: number;
  putar: number;
  titik: string;
  warna: string;
  garisLipat: Array<[number, number, number, number]>;
  garisDiagonal: Array<[number, number, number, number]>;
}

const BANGUN: Record<KunciBangun, ProfilBangun> = {
  samaSisi: {
    kunci: "samaSisi",
    nama: "Segitiga sama sisi",
    kelompok: "segitiga",
    sisi: "3 sisi sama panjang",
    sejajar: "Tidak ada sisi sejajar",
    sudut: "3 sudut lancip, masing-masing 60°",
    diagonal: "Segitiga tidak punya diagonal",
    lipat: 3,
    putar: 3,
    titik: "130,30 195,142 65,142",
    warna: "#7c3aed",
    garisLipat: [
      [130, 30, 130, 142],
      [195, 142, 97.5, 86],
      [65, 142, 162.5, 86],
    ],
    garisDiagonal: [],
  },
  samaKaki: {
    kunci: "samaKaki",
    nama: "Segitiga sama kaki",
    kelompok: "segitiga",
    sisi: "2 sisi sama panjang",
    sejajar: "Tidak ada sisi sejajar",
    sudut: "2 sudut pada kaki alas sama besar",
    diagonal: "Segitiga tidak punya diagonal",
    lipat: 1,
    putar: 1,
    titik: "130,28 205,172 55,172",
    warna: "#2563eb",
    garisLipat: [[130, 28, 130, 172]],
    garisDiagonal: [],
  },
  sikuSembarang: {
    kunci: "sikuSembarang",
    nama: "Siku-siku sembarang",
    kelompok: "segitiga",
    sisi: "Ketiga sisi berbeda, ada satu sudut siku",
    sejajar: "Tidak ada sisi sejajar",
    sudut: "1 sudut 90° dan 2 sudut lancip yang tidak sama",
    diagonal: "Segitiga tidak punya diagonal",
    lipat: 0,
    putar: 1,
    titik: "48,36 48,172 198,172",
    warna: "#e11d48",
    garisLipat: [],
    garisDiagonal: [],
  },
  persegi: {
    kunci: "persegi",
    nama: "Persegi",
    kelompok: "segi-empat",
    sisi: "4 sisi sama panjang",
    sejajar: "2 pasang sisi berhadapan sejajar",
    sudut: "4 sudut siku",
    diagonal: "2 diagonal sama panjang dan saling tegak lurus",
    lipat: 4,
    putar: 4,
    titik: "70,45 190,45 190,165 70,165",
    warna: "#4f46e5",
    garisLipat: [
      [130, 45, 130, 165],
      [70, 105, 190, 105],
      [70, 45, 190, 165],
      [190, 45, 70, 165],
    ],
    garisDiagonal: [
      [70, 45, 190, 165],
      [190, 45, 70, 165],
    ],
  },
  persegiPanjang: {
    kunci: "persegiPanjang",
    nama: "Persegi panjang",
    kelompok: "segi-empat",
    sisi: "2 pasang sisi berhadapan sama panjang",
    sejajar: "2 pasang sisi berhadapan sejajar",
    sudut: "4 sudut siku",
    diagonal: "2 diagonal sama panjang, tidak tegak lurus",
    lipat: 2,
    putar: 2,
    titik: "40,58 220,58 220,152 40,152",
    warna: "#0284c7",
    garisLipat: [
      [130, 58, 130, 152],
      [40, 105, 220, 105],
    ],
    garisDiagonal: [
      [40, 58, 220, 152],
      [220, 58, 40, 152],
    ],
  },
  jajargenjang: {
    kunci: "jajargenjang",
    nama: "Jajargenjang",
    kelompok: "segi-empat",
    sisi: "2 pasang sisi berhadapan sama panjang",
    sejajar: "2 pasang sisi berhadapan sejajar",
    sudut: "Sudut berhadapan sama besar, belum tentu siku",
    diagonal: "2 diagonal tidak sama panjang",
    lipat: 0,
    putar: 2,
    titik: "78,48 228,48 182,162 32,162",
    warna: "#d97706",
    garisLipat: [],
    garisDiagonal: [
      [78, 48, 182, 162],
      [228, 48, 32, 162],
    ],
  },
  belahKetupat: {
    kunci: "belahKetupat",
    nama: "Belah ketupat",
    kelompok: "segi-empat",
    sisi: "4 sisi sama panjang",
    sejajar: "2 pasang sisi berhadapan sejajar",
    sudut: "Sudut berhadapan sama besar",
    diagonal: "2 diagonal saling tegak lurus dan sama-sama sumbu simetri",
    lipat: 2,
    putar: 2,
    titik: "130,28 210,105 130,182 50,105",
    warna: "#7c3aed",
    garisLipat: [
      [130, 28, 130, 182],
      [50, 105, 210, 105],
    ],
    garisDiagonal: [
      [130, 28, 130, 182],
      [50, 105, 210, 105],
    ],
  },
  layang: {
    kunci: "layang",
    nama: "Layang-layang",
    kelompok: "segi-empat",
    sisi: "2 pasang sisi berurutan sama panjang",
    sejajar: "Tidak ada sisi sejajar",
    sudut: "1 pasang sudut berhadapan sama besar",
    diagonal: "2 diagonal saling tegak lurus. Satu di antaranya sumbu simetri",
    lipat: 1,
    putar: 1,
    titik: "130,20 198,88 130,188 62,88",
    warna: "#e11d48",
    garisLipat: [[130, 20, 130, 188]],
    garisDiagonal: [
      [130, 20, 130, 188],
      [62, 88, 198, 88],
    ],
  },
  trapesiumSamaKaki: {
    kunci: "trapesiumSamaKaki",
    nama: "Trapesium sama kaki",
    kelompok: "segi-empat",
    sisi: "1 pasang kaki miring sama panjang",
    sejajar: "Satu pasang sisi sejajar",
    sudut: "Sudut pada sisi sejajar yang sama besar",
    diagonal: "2 diagonal sama panjang",
    lipat: 1,
    putar: 1,
    titik: "78,52 182,52 222,162 38,162",
    warna: "#0f766e",
    garisLipat: [[130, 52, 130, 162]],
    garisDiagonal: [
      [78, 52, 222, 162],
      [182, 52, 38, 162],
    ],
  },
};

const URUT_SEGITIGA: KunciBangun[] = ["samaSisi", "samaKaki", "sikuSembarang"];
const URUT_SEGI_EMPAT: KunciBangun[] = [
  "persegi",
  "persegiPanjang",
  "jajargenjang",
  "belahKetupat",
  "layang",
  "trapesiumSamaKaki",
];

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
    if (jenis === "click" || jenis === "rotate") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = jenis === "rotate" ? "triangle" : "sine";
      osc.frequency.setValueAtTime(jenis === "rotate" ? 420 : 520, sekarang);
      osc.frequency.exponentialRampToValueAtTime(jenis === "rotate" ? 680 : 250, sekarang + 0.07);
      gain.gain.setValueAtTime(0.12, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.07);
      return;
    }
    if (jenis === "scan") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(350, sekarang);
      osc.frequency.linearRampToValueAtTime(780, sekarang + 0.14);
      gain.gain.setValueAtTime(0.12, sekarang);
      gain.gain.linearRampToValueAtTime(0.01, sekarang + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(sekarang);
      osc.stop(sekarang + 0.14);
      return;
    }
    if (jenis === "wrong") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(180, sekarang);
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
      nada(frekuensi, sekarang + indeks * 0.1, 0.32, "triangle", 0.14);
    });
  } catch {
    /* Browser boleh menolak audio. Permainan tetap jalan. */
  }
}

function pusatTitik(titik: string) {
  const pasangan = titik.split(" ").map((bagian) => bagian.split(",").map(Number));
  const jumlah = pasangan.length;
  return {
    x: pasangan.reduce((total, bagian) => total + bagian[0], 0) / jumlah,
    y: pasangan.reduce((total, bagian) => total + bagian[1], 0) / jumlah,
  };
}

function menempel(putar: number, derajat: number) {
  if (derajat % 360 === 0) return true;
  if (putar <= 1) return false;
  return derajat % (360 / putar) === 0;
}

const TITIK_KELUARGA: Record<string, { titik: string; warna: string }> = {
  Persegi: { titik: BANGUN.persegi.titik, warna: BANGUN.persegi.warna },
  "Belah ketupat": { titik: BANGUN.belahKetupat.titik, warna: BANGUN.belahKetupat.warna },
  "Persegi panjang": { titik: BANGUN.persegiPanjang.titik, warna: BANGUN.persegiPanjang.warna },
  Jajargenjang: { titik: BANGUN.jajargenjang.titik, warna: BANGUN.jajargenjang.warna },
  "Layang-layang": { titik: BANGUN.layang.titik, warna: BANGUN.layang.warna },
  Trapesium: { titik: BANGUN.trapesiumSamaKaki.titik, warna: BANGUN.trapesiumSamaKaki.warna },
  "Segi empat": { titik: "36,55 188,24 228,168 18,146", warna: "#64748b" },
};

export function SketsaBangun({ nama, className }: { nama: string; className?: string }) {
  const gambar = TITIK_KELUARGA[nama];
  if (!gambar) return null;
  return (
    <svg viewBox="0 0 260 210" className={className} aria-hidden>
      <polygon points={gambar.titik} fill={gambar.warna} fillOpacity="0.9" stroke="#1C01A5" strokeWidth="10" strokeLinejoin="round" />
    </svg>
  );
}

function GambarBangun({
  kunci,
  lipat,
  diagonal,
  derajat,
}: {
  kunci: KunciBangun;
  lipat: boolean;
  diagonal: boolean;
  derajat: number;
}) {
  const profil = BANGUN[kunci];
  const pusat = pusatTitik(profil.titik);
  return (
    <svg viewBox="0 0 260 210" className="mx-auto w-full max-w-[240px]" aria-hidden>
      <polygon points={profil.titik} fill="none" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 4" />
      <g transform={`rotate(${derajat} ${pusat.x} ${pusat.y})`}>
        <polygon points={profil.titik} fill={profil.warna} fillOpacity="0.82" stroke="#1C01A5" strokeWidth="3" strokeLinejoin="round" />
        {lipat ? profil.garisLipat.map((garis) => (
          <line key={garis.join("-")} x1={garis[0]} y1={garis[1]} x2={garis[2]} y2={garis[3]} stroke="#fef08a" strokeWidth="2.5" strokeDasharray="5 4" />
        )) : null}
        {diagonal ? profil.garisDiagonal.map((garis) => (
          <line key={`d-${garis.join("-")}`} x1={garis[0]} y1={garis[1]} x2={garis[2]} y2={garis[3]} stroke="#ffffff" strokeWidth="2.5" />
        )) : null}
        <circle cx={pusat.x} cy={pusat.y} r="4.5" fill="#1C01A5" stroke="#ffffff" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function namaSudut(a: number, b: number, c: number) {
  if (a === 90 || b === 90 || c === 90) return "Siku-siku. Ada sudut 90°.";
  if (a > 90 || b > 90 || c > 90) return "Tumpul. Ada sudut lebih dari 90°.";
  return "Lancip. Semua sudut kurang dari 90°.";
}

function namaSisi(a: number, b: number, c: number) {
  if (a === 60 && b === 60 && c === 60) return "Sama sisi. Tiga sudutnya sama, jadi tiga sisinya sama.";
  if (a === b || b === c || a === c) return "Sama kaki. Dua sudutnya sama, jadi dua sisinya sama.";
  return "Sembarang. Tiga sudutnya berbeda, jadi tiga sisinya berbeda.";
}

export function GameRadarSudut() {
  const [sudutA, setSudutA] = useState(60);
  const [sudutB, setSudutB] = useState(60);
  const sudutC = 180 - sudutA - sudutB;
  const contoh = [
    { nama: "Sama sisi", a: 60, b: 60 },
    { nama: "Siku sama kaki", a: 90, b: 45 },
    { nama: "Tumpul sama kaki", a: 110, b: 35 },
    { nama: "Lancip sembarang", a: 70, b: 60 },
  ];
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game radar sudut layang</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Geser dua sudut. Sudut ketiga mengikuti supaya jumlahnya 180°.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {contoh.map((item) => (
          <button
            key={item.nama}
            type="button"
            onClick={() => {
              mainkanSuara("scan");
              setSudutA(item.a);
              setSudutB(item.b);
            }}
            className="rounded-full bg-sky-50 px-3 py-2 text-sm font-black text-sky-950 ring-2 ring-sky-200"
          >
            {item.nama}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-lg font-black text-[#1C01A5]">{sudutA}° + {sudutB}° + {sudutC}° = 180°</p>
      <label className="mt-3 block text-sm font-bold text-slate-700">Sudut A: {sudutA}°
        <input
          type="range"
          min={30}
          max={110}
          step={5}
          value={sudutA}
          onChange={(event) => {
            const berikutnya = Number(event.target.value);
            if (berikutnya + sudutB < 170) setSudutA(berikutnya);
          }}
          className="mt-1 w-full accent-[#1C01A5]"
        />
      </label>
      <label className="mt-2 block text-sm font-bold text-slate-700">Sudut B: {sudutB}°
        <input
          type="range"
          min={25}
          max={100}
          step={5}
          value={sudutB}
          onChange={(event) => {
            const berikutnya = Number(event.target.value);
            if (sudutA + berikutnya < 170) setSudutB(berikutnya);
          }}
          className="mt-1 w-full accent-amber-500"
        />
      </label>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <p className="rounded-xl bg-sky-50 px-3 py-2 text-sm font-black text-sky-950">{namaSudut(sudutA, sudutB, sudutC)}</p>
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-black text-amber-950">{namaSisi(sudutA, sudutB, sudutC)}</p>
      </div>
      {sudutA === 60 && sudutB === 60 ? <p className="mt-2 text-sm font-bold text-slate-700">Sama sisi juga boleh disebut sama kaki.</p> : null}
    </div>
  );
}

export function GameLaserLipat({ kelompok }: { kelompok: Kelompok }) {
  const urutan = kelompok === "segitiga" ? URUT_SEGITIGA : URUT_SEGI_EMPAT;
  const [kunci, setKunci] = useState<KunciBangun>(kelompok === "segitiga" ? "samaKaki" : "jajargenjang");
  const [derajat, setDerajat] = useState(0);
  const [lipat, setLipat] = useState(true);
  const [diagonal, setDiagonal] = useState(false);
  const profil = BANGUN[kunci];
  const ketemu = menempel(profil.putar, derajat);
  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">{kelompok === "segitiga" ? "Game laser lipat segitiga" : "Game laser lipat segi empat"}</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Putar bangun sampai garis putus-putusnya ketemu lagi. Garis kuning adalah lipatan.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {urutan.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              mainkanSuara("click");
              setKunci(item);
              setDerajat(0);
            }}
            className={`rounded-full px-3 py-2 text-sm font-black ${kunci === item ? "bg-indigo-700 text-white" : "bg-indigo-50 text-indigo-950 ring-2 ring-indigo-200"}`}
          >
            {BANGUN[item].nama}
          </button>
        ))}
      </div>
      <GambarBangun kunci={kunci} lipat={lipat} diagonal={diagonal && kelompok === "segi-empat"} derajat={derajat} />
      <div className="mt-3 flex flex-wrap gap-2">
        {[0, 90, 120, 180, 270, 360].map((nilai) => (
          <button
            key={nilai}
            type="button"
            onClick={() => {
              mainkanSuara("rotate");
              setDerajat(nilai);
            }}
            className={`rounded-full px-3 py-2 text-sm font-black ${derajat === nilai ? "bg-amber-400 text-slate-950" : "bg-slate-100 text-slate-800"}`}
          >
            {nilai}°
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => { mainkanSuara("scan"); setLipat((nyala) => !nyala); }} className={`rounded-full px-3 py-2 text-sm font-black ${lipat ? "bg-amber-400 text-slate-950" : "bg-white text-slate-800 ring-2 ring-slate-200"}`}>
          {lipat ? "Garis lipat nyala" : "Nyalakan garis lipat"}
        </button>
        {kelompok === "segi-empat" ? (
          <button type="button" onClick={() => { mainkanSuara("scan"); setDiagonal((nyala) => !nyala); }} className={`rounded-full px-3 py-2 text-sm font-black ${diagonal ? "bg-indigo-700 text-white" : "bg-white text-slate-800 ring-2 ring-slate-200"}`}>
            {diagonal ? "Diagonal nyala" : "Nyalakan diagonal"}
          </button>
        ) : null}
      </div>
      <p className={`mt-3 rounded-xl px-3 py-2 text-sm font-black ${ketemu ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
        {ketemu ? "Bingkai ketemu lagi." : "Belum menempel pada bingkai."}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <p className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-950">{profil.lipat} simetri lipat</p>
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-950">{profil.putar} simetri putar</p>
      </div>
      <p className="mt-2 text-sm font-bold text-slate-700">{profil.sisi}. {profil.sejajar}.</p>
      <p className="mt-1 text-sm font-bold text-slate-700">{profil.sudut}. {profil.diagonal}.</p>
      {kelompok === "segi-empat" ? <p className="mt-2 text-sm font-semibold text-slate-600">Pada bab ini jajargenjang juga trapesium, tetapi bukan trapesium sama kaki.</p> : null}
    </div>
  );
}

const KASUS_BINGKAI: Array<{
  kelompok: "trapesium" | "ketupat";
  jawaban: KunciBangun;
  petunjuk: string[];
  bantuan: string;
}> = [
  {
    kelompok: "trapesium",
    jawaban: "trapesiumSamaKaki",
    petunjuk: [
      "Hanya satu pasang sisi yang sejajar.",
      "Dua kaki miringnya sama panjang.",
      "Dua diagonalnya sama panjang.",
      "Punya simetri lipat.",
    ],
    bantuan: "Kakinya sama panjang, dan sisi sejajarnya hanya satu pasang.",
  },
  {
    kelompok: "trapesium",
    jawaban: "jajargenjang",
    petunjuk: [
      "Dua pasang sisi berhadapan sejajar dan sama panjang.",
      "Sudutnya belum tentu siku.",
      "Tidak ada simetri lipat.",
      "Dua diagonalnya tidak sama panjang.",
    ],
    bantuan: "Seperti persegi panjang yang didorong miring.",
  },
  {
    kelompok: "ketupat",
    jawaban: "belahKetupat",
    petunjuk: [
      "Keempat sisinya sama panjang.",
      "Dua diagonalnya saling tegak lurus.",
      "Sudutnya belum tentu siku.",
      "Ada 2 simetri lipat dan 2 simetri putar.",
    ],
    bantuan: "Sisinya sama seperti persegi, tetapi sudutnya belum tentu siku.",
  },
  {
    kelompok: "ketupat",
    jawaban: "layang",
    petunjuk: [
      "Dua pasang sisi berurutan sama panjang.",
      "Tidak ada sisi yang sejajar.",
      "Dua diagonalnya saling tegak lurus.",
      "Hanya satu pasang sudut berhadapan yang sama besar.",
    ],
    bantuan: "Beni sering menerbangkannya dengan benang saat angin senja.",
  },
];

const PILIHAN_KASUS: Record<"trapesium" | "ketupat", KunciBangun[]> = {
  trapesium: ["trapesiumSamaKaki", "jajargenjang", "layang"],
  ketupat: ["persegi", "persegiPanjang", "jajargenjang", "belahKetupat", "layang", "trapesiumSamaKaki"],
};

export function GameTebakBingkai({ kelompok }: { kelompok: "trapesium" | "ketupat" }) {
  const kasus = KASUS_BINGKAI.filter((item) => item.kelompok === kelompok);
  const [indeks, setIndeks] = useState(0);
  const [tebak, setTebak] = useState<KunciBangun | "">("");
  const sekarang = kasus[indeks];
  const tepat = tebak === sekarang.jawaban;
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game tebak bingkai</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Baca empat ciri, lalu pilih nama bangunnya.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {kasus.map((item, urut) => (
          <button
            key={item.jawaban}
            type="button"
            onClick={() => {
              mainkanSuara("click");
              setIndeks(urut);
              setTebak("");
            }}
            className={`rounded-full px-3 py-2 text-sm font-black ${indeks === urut ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200"}`}
          >
            Bingkai {urut + 1}
          </button>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {sekarang.petunjuk.map((baris) => (
          <li key={baris} className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-800">{baris}</li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        {PILIHAN_KASUS[kelompok].map((kunci) => (
          <button
            key={kunci}
            type="button"
            onClick={() => {
              setTebak(kunci);
              mainkanSuara(kunci === sekarang.jawaban ? "fanfare" : "wrong");
            }}
            className={`rounded-full px-3 py-2 text-sm font-black ${tebak === kunci ? (tepat ? "bg-emerald-700 text-white" : "bg-rose-600 text-white") : "bg-white text-slate-800 ring-2 ring-slate-200"}`}
          >
            {BANGUN[kunci].nama}
          </button>
        ))}
      </div>
      {tebak ? (
        <p className={`mt-3 rounded-xl px-3 py-2 text-sm font-black ${tepat ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
          {tepat ? `Tepat. Bangun itu ${BANGUN[sekarang.jawaban].nama}.` : `Belum. ${sekarang.bantuan}`}
        </p>
      ) : null}
    </div>
  );
}

const UJI_KELUARGA = [
  {
    kalimat: "Setiap persegi pasti merupakan persegi panjang.",
    benar: true,
    alasan: "Persegi punya 4 sudut siku dan sisi berhadapan sama panjang.",
  },
  {
    kalimat: "Setiap persegi pasti merupakan belah ketupat.",
    benar: true,
    alasan: "Persegi punya 4 sisi sama panjang, jadi syarat belah ketupat terpenuhi.",
  },
  {
    kalimat: "Setiap jajargenjang pasti merupakan persegi panjang.",
    benar: false,
    alasan: "Jajargenjang sudutnya belum tentu siku.",
  },
  {
    kalimat: "Persegi panjang dan belah ketupat termasuk jajargenjang.",
    benar: true,
    alasan: "Keduanya punya dua pasang sisi berhadapan yang sejajar dan sama panjang.",
  },
] as const;

export function GameUbahKeluarga() {
  const [siku, setSiku] = useState(false);
  const [sisiSama, setSisiSama] = useState(false);
  const [indeks, setIndeks] = useState(0);
  const [umpan, setUmpan] = useState("");
  const kunci: KunciBangun = siku && sisiSama
    ? "persegi"
    : siku
      ? "persegiPanjang"
      : sisiSama
        ? "belahKetupat"
        : "jajargenjang";
  const nama = siku && sisiSama
    ? "Persegi. Sudutnya siku dan keempat sisinya sama."
    : siku
      ? "Persegi panjang. Sudutnya sudah siku."
      : sisiSama
        ? "Belah ketupat. Keempat sisinya sama, sudutnya belum tentu siku."
        : "Jajargenjang. Belum diubah.";
  const soal = UJI_KELUARGA[indeks];
  const pilih = (jawabanBenar: boolean) => {
    const cocok = jawabanBenar === soal.benar;
    mainkanSuara(cocok ? "fanfare" : "wrong");
    setUmpan(cocok ? `Tepat. ${soal.alasan}` : `Belum. ${soal.alasan}`);
  };
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game ubah jajargenjang</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Nyalakan satu ciri, atau keduanya, lalu lihat nama barunya.</p>
      <GambarBangun kunci={kunci} lipat={false} diagonal derajat={0} />
      <p className="text-center text-sm font-black text-[#1C01A5]">{nama}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            mainkanSuara("scan");
            setSiku((nyala) => !nyala);
          }}
          className={`rounded-full px-3 py-2 text-sm font-black ${siku ? "bg-indigo-700 text-white" : "bg-indigo-50 text-indigo-950 ring-2 ring-indigo-200"}`}
        >
          {siku ? "Sudut siku nyala" : "Jadikan sudut siku"}
        </button>
        <button
          type="button"
          onClick={() => {
            mainkanSuara("scan");
            setSisiSama((nyala) => !nyala);
          }}
          className={`rounded-full px-3 py-2 text-sm font-black ${sisiSama ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200"}`}
        >
          {sisiSama ? "Empat sisi sama nyala" : "Samakan keempat sisi"}
        </button>
      </div>
      <div className="mt-4 rounded-2xl bg-slate-50 p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-black uppercase text-amber-800">Uji keluarga {indeks + 1} dari {UJI_KELUARGA.length}</p>
          <button
            type="button"
            onClick={() => {
              mainkanSuara("click");
              setIndeks((urut) => (urut + 1) % UJI_KELUARGA.length);
              setUmpan("");
            }}
            className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-800 ring-2 ring-slate-200"
          >
            Pernyataan berikut
          </button>
        </div>
        <p className="mt-2 text-sm font-black text-slate-900">{soal.kalimat}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => pilih(true)} className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-black text-white">Pernyataan benar</button>
          <button type="button" onClick={() => pilih(false)} className="rounded-full bg-rose-600 px-3 py-2 text-sm font-black text-white">Pernyataan salah</button>
        </div>
        {umpan ? <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-950">{umpan}</p> : null}
      </div>
    </div>
  );
}
