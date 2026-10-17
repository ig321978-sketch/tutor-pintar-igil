import type { ReactNode } from "react";

function Bingkai({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <figure className="space-y-2 rounded-2xl border border-[#DDD6FE] bg-[#FCFBFF] p-3">
      <figcaption className="text-sm font-black text-[#1C01A5]">{judul}</figcaption>
      {children}
    </figure>
  );
}

function Kotak({ x, y, isi = "" }: { x: number; y: number; isi?: string }) {
  return (
    <g>
      <rect x={x} y={y} width="36" height="28" rx="4" fill="#FB8C00" stroke="#E65100" strokeWidth="2" />
      {isi ? <text x={x + 18} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="700" fill="white">{isi}</text> : null}
    </g>
  );
}

export function IkonKubus() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden="true">
      <polygon points="8,18 24,10 40,18 24,26" fill="#BBDEFB" stroke="#1C01A5" strokeWidth="2" />
      <polygon points="8,18 24,26 24,40 8,32" fill="#90CAF9" stroke="#1C01A5" strokeWidth="2" />
      <polygon points="24,26 40,18 40,32 24,40" fill="#1C01A5" stroke="#1C01A5" strokeWidth="2" />
    </svg>
  );
}

export function IkonBalok() {
  return (
    <svg viewBox="0 0 64 48" className="h-10 w-14 shrink-0" aria-hidden="true">
      <polygon points="6,20 28,12 58,20 36,28" fill="#E1BEE7" stroke="#6A1B9A" strokeWidth="2" />
      <polygon points="6,20 36,28 36,40 6,32" fill="#CE93D8" stroke="#6A1B9A" strokeWidth="2" />
      <polygon points="36,28 58,20 58,32 36,40" fill="#8E24AA" stroke="#6A1B9A" strokeWidth="2" />
    </svg>
  );
}

export function IkonPetak() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" aria-hidden="true">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="white" stroke="#2E7D32" strokeWidth="2" />
      <path d="M18 6 V42 M30 6 V42 M6 18 H42 M6 30 H42" stroke="#A5D6A7" strokeWidth="2" />
      <circle cx="24" cy="24" r="4" fill="#C62828" />
    </svg>
  );
}

export function PetaPikiran() {
  const cabang = [
    { judul: "Menyusun", warna: "#E65100", latar: "#FFF3E0", isi: ["2 kubus menempel = 1 bentuk", "3 kubus, 1 lantai = 2 bentuk", "Kolom 2 + 2 + 2 + 1 = 7"] },
    { judul: "Melihat", warna: "#1C01A5", latar: "#EEF2FF", isi: ["Depan, samping, dan atas", "Lawan dadu berjumlah 7", "6 berhadapan dengan 1"] },
    { judul: "Lokasi", warna: "#2E7D32", latar: "#E8F5E9", isi: ["Huruf ke kanan, bilangan ke belakang", "Jarak = mendatar + tegak", "3 kanan dan 4 atas = 35 cara"] },
  ];
  return (
    <Bingkai judul="Peta pikiran">
      <div className="flex justify-center">
        <p className="rounded-full bg-[#1C01A5] px-5 py-2 text-sm font-black text-white">Kubus dan Balok</p>
      </div>
      <div className="mx-auto h-5 w-px bg-[#1C01A5]" aria-hidden="true" />
      <div className="grid gap-3 md:grid-cols-3">
        {cabang.map((item) => (
          <div key={item.judul} className="space-y-2 rounded-xl border p-3" style={{ borderColor: item.warna, background: item.latar }}>
            <p className="text-sm font-black" style={{ color: item.warna }}>{item.judul}</p>
            <ul className="space-y-1 text-sm font-semibold leading-6 text-slate-800">
              {item.isi.map((baris) => <li key={baris}>{baris}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Bingkai>
  );
}

export function InfografisAngka() {
  const kartu = [
    { angka: "5", satuan: "sisi", keterangan: "Prisma segitiga" },
    { angka: "5", satuan: "titik sudut", keterangan: "Limas segi empat" },
    { angka: "12", satuan: "rusuk", keterangan: "Balok dan kubus" },
    { angka: "7", satuan: "kubus", keterangan: "Kolom 2 + 2 + 2 + 1" },
    { angka: "0,3", satuan: "m²", keterangan: "Lantai gudang" },
    { angka: "35", satuan: "cara", keterangan: "(A,1) ke (D,5)" },
  ];
  return (
    <Bingkai judul="Infografis angka bab">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {kartu.map((item) => (
          <div key={item.keterangan} className="rounded-xl bg-white px-3 py-2 text-center shadow-sm">
            <p className="text-3xl font-black text-[#1C01A5]">{item.angka}</p>
            <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">{item.satuan}</p>
            <p className="text-xs font-semibold leading-5 text-slate-700">{item.keterangan}</p>
          </div>
        ))}
      </div>
    </Bingkai>
  );
}

export function DiagramGelinding() {
  return (
    <Bingkai judul="Simbol: digelindingkan atau ditumpuk">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white p-2">
          <p className="text-xs font-black text-[#1565C0]">Bisa digelindingkan</p>
          <svg viewBox="0 0 280 90" className="h-24 w-full" role="img" aria-label="Bola, tabung, dan kerucut">
            <circle cx="40" cy="48" r="26" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            <text x="40" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1B5E20">Bola</text>
            <ellipse cx="120" cy="68" rx="28" ry="10" fill="#80CBC4" stroke="#00695C" strokeWidth="2" />
            <rect x="92" y="28" width="56" height="40" fill="#4DB6AC" stroke="#00695C" strokeWidth="2" />
            <ellipse cx="120" cy="28" rx="28" ry="10" fill="#B2DFDB" stroke="#00695C" strokeWidth="2" />
            <text x="120" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#004D40">Tabung</text>
            <polygon points="210,70 240,18 270,70" fill="#FFE082" stroke="#F9A825" strokeWidth="2" />
            <ellipse cx="240" cy="70" rx="30" ry="10" fill="#FFD54F" stroke="#F9A825" strokeWidth="2" />
            <text x="240" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#F57F17">Kerucut</text>
          </svg>
        </div>
        <div className="rounded-xl bg-white p-2">
          <p className="text-xs font-black text-[#E65100]">Bisa ditumpuk</p>
          <svg viewBox="0 0 280 90" className="h-24 w-full" role="img" aria-label="Kubus, balok, prisma, dan limas">
            <rect x="16" y="28" width="40" height="40" rx="3" fill="#90CAF9" stroke="#1C01A5" strokeWidth="2" />
            <text x="36" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1C01A5">Kubus</text>
            <rect x="78" y="36" width="62" height="32" rx="3" fill="#CE93D8" stroke="#6A1B9A" strokeWidth="2" />
            <text x="109" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6A1B9A">Balok</text>
            <polygon points="168,68 190,28 212,68" fill="#EF9A9A" stroke="#C62828" strokeWidth="2" />
            <text x="190" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#C62828">Prisma</text>
            <polygon points="236,68 258,22 280,68" fill="#C5E1A5" stroke="#558B2F" strokeWidth="2" />
            <text x="258" y="84" textAnchor="middle" fontSize="11" fontWeight="700" fill="#33691E">Limas</text>
          </svg>
        </div>
      </div>
    </Bingkai>
  );
}

export function DiagramRusuk() {
  return (
    <Bingkai judul="Diagram balok: sisi, titik sudut, rusuk">
      <svg viewBox="0 0 360 160" className="h-40 w-full" role="img" aria-label="Balok dengan 6 sisi, 8 titik sudut, dan 12 rusuk">
        <polygon points="40,50 160,50 160,120 40,120" fill="#E3F2FD" stroke="#1C01A5" strokeWidth="3" />
        <polygon points="40,50 80,24 200,24 160,50" fill="#BBDEFB" stroke="#1C01A5" strokeWidth="3" />
        <polygon points="160,50 200,24 200,94 160,120" fill="#90CAF9" stroke="#1C01A5" strokeWidth="3" />
        <line x1="80" y1="24" x2="80" y2="94" stroke="#1C01A5" strokeWidth="3" />
        <line x1="80" y1="94" x2="200" y2="94" stroke="#1C01A5" strokeWidth="3" />
        <line x1="40" y1="120" x2="80" y2="94" stroke="#1C01A5" strokeWidth="3" />
        {[[40, 50], [160, 50], [160, 120], [40, 120], [80, 24], [200, 24], [200, 94]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#C62828" />
        ))}
        <circle cx="80" cy="94" r="5" fill="#C62828" />
        <text x="230" y="46" fontSize="16" fontWeight="700" fill="#1C01A5">6 sisi</text>
        <text x="230" y="78" fontSize="16" fontWeight="700" fill="#C62828">8 titik sudut</text>
        <text x="230" y="110" fontSize="16" fontWeight="700" fill="#E65100">12 rusuk</text>
      </svg>
      <p className="text-xs font-semibold leading-6 text-slate-600">Titik merah adalah pojokan. Garis biru adalah rusuk. Bidang yang terlihat mewakili sisi.</p>
    </Bingkai>
  );
}

export function DiagramSusun() {
  return (
    <Bingkai judul="Diagram menyusun kubus">
      <div className="grid gap-3 md:grid-cols-3">
        <svg viewBox="0 0 160 110" className="h-28 w-full rounded-xl bg-white" role="img" aria-label="Dua kubus, satu bentuk">
          <Kotak x={20} y={36} />
          <Kotak x={62} y={36} />
          <text x="80" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1C01A5">2 kubus · 1 bentuk</text>
        </svg>
        <svg viewBox="0 0 200 150" className="h-36 w-full rounded-xl bg-white" role="img" aria-label="Tiga kubus lurus dan siku, dua bentuk">
          <Kotak x={8} y={16} />
          <Kotak x={48} y={16} />
          <Kotak x={88} y={16} />
          <text x="150" y="34" fontSize="12" fontWeight="700" fill="#E65100">lurus</text>
          <Kotak x={8} y={70} />
          <Kotak x={48} y={70} />
          <Kotak x={48} y={104} />
          <text x="100" y="90" fontSize="12" fontWeight="700" fill="#E65100">siku</text>
        </svg>
        <svg viewBox="0 0 140 150" className="h-36 w-full rounded-xl bg-white" role="img" aria-label="Menara tiga kubus, satu bentuk">
          <Kotak x={52} y={8} />
          <Kotak x={52} y={40} />
          <Kotak x={52} y={72} />
          <text x="70" y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1C01A5">3 lantai · 1 bentuk</text>
        </svg>
      </div>
    </Bingkai>
  );
}

export function DiagramLawanDadu() {
  const pasangan = [
    ["6", "1"],
    ["5", "2"],
    ["3", "4"],
  ];
  return (
    <Bingkai judul="Diagram sisi dadu yang berhadapan">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {pasangan.map(([kiri, kanan]) => (
          <div key={kiri} className="flex items-center gap-2 rounded-full bg-white px-3 py-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C01A5] text-lg font-black text-white">{kiri}</span>
            <span className="text-sm font-black text-[#6D28D9]" aria-hidden="true">↔</span>
            <span className="sr-only">berhadapan dengan</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E65100] text-lg font-black text-white">{kanan}</span>
            <span className="text-xs font-black text-slate-600">= 7</span>
          </div>
        ))}
      </div>
    </Bingkai>
  );
}

export function DiagramJarak() {
  return (
    <Bingkai judul="Diagram jarak = mendatar + tegak">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-white p-3 text-center">
          <p className="text-xs font-black text-[#1C01A5]">(A,3) ke (E,5)</p>
          <p className="mt-2 text-2xl font-black text-slate-800"><span className="text-[#1565C0]">4</span> + <span className="text-[#2E7D32]">2</span> = <span className="text-[#1C01A5]">6</span></p>
          <p className="text-xs font-semibold text-slate-600">4 langkah mendatar, 2 langkah tegak</p>
        </div>
        <div className="rounded-xl bg-white p-3 text-center">
          <p className="text-xs font-black text-[#1C01A5]">P(B,5) ke Q(E,1)</p>
          <p className="mt-2 text-2xl font-black text-slate-800"><span className="text-[#1565C0]">3</span> + <span className="text-[#C62828]">4</span> = <span className="text-[#1C01A5]">7</span></p>
          <p className="text-xs font-semibold text-slate-600">3 langkah kanan, 4 langkah bawah</p>
        </div>
      </div>
    </Bingkai>
  );
}

export function DiagramCara() {
  const baris = [
    ["(A,2) 1", "(B,2) 2", "(C,2) 3"],
    ["(B,1) 1", "(B,3) 3", "(C,3) 6"],
    ["(D,5)", "3 kanan + 4 atas", "35 cara"],
  ];
  return (
    <Bingkai judul="Peta banyak cara terpendek">
      <div className="grid gap-2">
        {baris.map((kelompok) => (
          <div key={kelompok.join("-")} className="grid grid-cols-3 gap-2">
            {kelompok.map((sel) => (
              <p key={sel} className="rounded-lg bg-white px-2 py-2 text-center text-xs font-black leading-5 text-[#1C01A5]">{sel}</p>
            ))}
          </div>
        ))}
      </div>
    </Bingkai>
  );
}

export function AlurGudang() {
  const langkah = ["20×30×50", "30.000 cm³", "× 30 kardus", "900.000 cm³", ": 300 cm", "0,3 m²"];
  return (
    <Bingkai judul="Infografis alur volume gudang">
      <ol className="flex flex-wrap items-center gap-2">
        {langkah.map((item, indeks) => (
          <li key={item} className="flex items-center gap-2">
            <span className={`rounded-xl px-3 py-2 text-sm font-black ${indeks === langkah.length - 1 ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}>{item}</span>
            {indeks < langkah.length - 1 ? <span aria-hidden="true" className="font-black text-[#6D28D9]">→</span> : null}
          </li>
        ))}
      </ol>
    </Bingkai>
  );
}

const VISUAL: Record<string, () => ReactNode> = {
  gelinding: DiagramGelinding,
  rusuk: DiagramRusuk,
  susun: DiagramSusun,
  lawan: DiagramLawanDadu,
  jarak: DiagramJarak,
  cara: DiagramCara,
  gudang: AlurGudang,
};

export function VisualBab({ kode }: { kode?: string }) {
  if (!kode) return null;
  const Gambar = VISUAL[kode];
  if (!Gambar) return null;
  return <Gambar />;
}
