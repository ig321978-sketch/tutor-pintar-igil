"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB5 } from "@/lib/modul-resmi-mtk-2-bab5";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

function GambarCerita({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB5.id, kode, indeks);
}

function UmpanBenar({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Lambang({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <span className="inline-flex flex-col items-center px-1 align-middle font-black leading-none text-[#1C01A5]">
      <span className="text-xl">{atas}</span>
      <span className="my-0.5 block h-0.5 w-7 bg-[#1C01A5]" />
      <span className="text-xl">{bawah}</span>
    </span>
  );
}

function KuisPilih({
  id,
  soal,
  pilihan,
  benar,
  anak,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3">{anak}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              if (item.huruf === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              item.huruf,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={pesanSalah} />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function KuisSusun({
  id,
  soal,
  pool,
  benar,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  pool: { kunci: string; tampil: ReactNode }[];
  benar: string[];
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((item) => !susun.includes(item.kunci));
  const periksa = () => {
    const ok = susun.length === benar.length && susun.every((item, indeks) => item === benar[indeks]);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-xl bg-white px-3 py-3">
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk urutannya.</p> : null}
        {susun.map((kunci) => {
          const item = pool.find((calon) => calon.kunci === kunci);
          return (
            <span key={kunci} className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white">
              {item?.tampil}
            </span>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, item.kunci]);
            }}
            className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
          >
            {item.tampil}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setSusun((lama) => lama.slice(0, -1));
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={susun.join(" - ") || undefined} pesanSalah={pesanSalah} />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function KuisCocok({
  id,
  soal,
  baris,
  label,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  baris: { id: string; tampil: ReactNode; benar: string }[];
  label: string[];
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = baris.every((item) => pilih[item.id] === item.benar);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-sky-50 p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      <div className="mt-3 grid gap-3">
        {baris.map((item) => (
          <div key={item.id} className="rounded-xl bg-white px-3 py-3">
            <div className="text-sm font-black text-[#1C01A5]">{item.tampil}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {label.map((teks) => {
                const terpilih = pilih[item.id] === teks;
                const dasar = terpilih ? "bg-emerald-500 text-white" : "bg-[#1C01A5] text-white hover:bg-[#16017a]";
                return (
                  <button
                    key={teks}
                    type="button"
                    onClick={() => {
                      setStatus(null);
                      setPilih((lama) => ({ ...lama, [item.id]: teks }));
                    }}
                    className={`rounded-xl px-4 py-2 text-sm font-black ${
                      status ? kelasTombolHasilKuis(pilih[item.id] ?? "", teks, item.benar, dasar) : dasar
                    }`}
                  >
                    {teks}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={periksa} className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={baris.map((item) => pilih[item.id]).filter(Boolean).join(" · ") || undefined}
          pesanSalah={pesanSalah}
        />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function KuisBenarSalah({
  id,
  soal,
  benar,
  anak,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  benar: "benar" | "salah";
  anak?: ReactNode;
  umpanBenar: string;
  pesanSalah: string;
}) {
  return (
    <KuisPilih
      id={id}
      soal={soal}
      benar={benar === "benar" ? "A" : "B"}
      anak={anak}
      umpanBenar={umpanBenar}
      pesanSalah={pesanSalah}
      pilihan={[
        { huruf: "A", teks: "Benar" },
        { huruf: "B", teks: "Salah" },
      ]}
    />
  );
}

function JudulSubBab({
  judul,
  kelas,
  kelamin,
  naskah,
}: {
  judul: string;
  kelas: string;
  kelamin?: KelaminGuru;
  naskah: string[];
}) {
  return (
    <>
      <h5 className="mt-5 text-left text-base font-black tracking-wide text-[#1C01A5] sm:text-lg">{judul}</h5>
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah([naskah], 2_000, 3_000)} />
      </div>
    </>
  );
}

function Dialog({ nama, warna, children }: { nama: string; warna: string; children: ReactNode }) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <NamaDialog nama={nama} />
      <div className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{children}</div>
    </article>
  );
}

function AdeganDapur({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(180deg,#fff7ed_0%,#ffedd5_55%,#fed7aa_100%)] px-3 py-4">
      <p className="absolute bottom-2 left-2 text-4xl" aria-hidden>
        🦉👨‍🍳
      </p>
      <div className="pl-14">{children}</div>
    </div>
  );
}

function RotiTiga({ jenis }: { jenis: "kecil-besar" | "sama" | "miring" }) {
  if (jenis === "sama") {
    return (
      <svg viewBox="0 0 120 70" className="mx-auto h-16 w-28" aria-hidden>
        <rect x="8" y="14" width="48" height="42" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <rect x="64" y="14" width="48" height="42" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
      </svg>
    );
  }
  if (jenis === "miring") {
    return (
      <svg viewBox="0 0 120 70" className="mx-auto h-16 w-28" aria-hidden>
        <path d="M10 54 L58 10 L58 54 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
        <path d="M66 12 L110 54 L66 54 Z" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 70" className="mx-auto h-16 w-28" aria-hidden>
      <rect x="8" y="22" width="24" height="30" rx="4" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
      <rect x="44" y="10" width="68" height="48" rx="6" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
    </svg>
  );
}

function LingkaranBagian({ potong, diwarnai }: { potong: 2 | 4; diwarnai: number }) {
  const r = 48;
  const irisan = (i: number) => {
    const mulai = (Math.PI * 2 * i) / potong - Math.PI / 2;
    const selesai = (Math.PI * 2 * (i + 1)) / potong - Math.PI / 2;
    const x1 = 60 + r * Math.cos(mulai);
    const y1 = 60 + r * Math.sin(mulai);
    const x2 = 60 + r * Math.cos(selesai);
    const y2 = 60 + r * Math.sin(selesai);
    return `M60 60 L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`;
  };
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
      <circle cx="60" cy="60" r={r} fill="#fff7ed" stroke="#9a3412" strokeWidth="3" />
      {Array.from({ length: potong }, (_, i) => (
        <path key={i} d={irisan(i)} fill={i < diwarnai ? "#f59e0b" : "#fff7ed"} stroke="#9a3412" strokeWidth="2" />
      ))}
    </svg>
  );
}

function PersegiEmpat({ mode }: { mode: "silang" | "diagonal" | "tidak-sama" | "putar" }) {
  if (mode === "tidak-sama") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
        <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#1C01A5" strokeWidth="3" />
        <line x1="28" y1="8" x2="28" y2="92" stroke="#1C01A5" strokeWidth="2" />
        <line x1="48" y1="8" x2="48" y2="92" stroke="#1C01A5" strokeWidth="2" />
        <line x1="78" y1="8" x2="78" y2="92" stroke="#1C01A5" strokeWidth="2" />
        <rect x="8" y="8" width="20" height="84" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }
  if (mode === "diagonal") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
        <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#1C01A5" strokeWidth="3" />
        <line x1="8" y1="8" x2="92" y2="92" stroke="#1C01A5" strokeWidth="3" />
        <line x1="92" y1="8" x2="8" y2="92" stroke="#1C01A5" strokeWidth="3" />
        <path d="M8 8 L50 50 L92 8 Z" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }
  if (mode === "putar") {
    return (
      <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
        <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#1C01A5" strokeWidth="3" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#1C01A5" strokeWidth="2" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="#1C01A5" strokeWidth="2" />
        <rect x="50" y="50" width="42" height="42" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-hidden>
      <rect x="8" y="8" width="84" height="84" fill="#fff" stroke="#1C01A5" strokeWidth="3" />
      <line x1="50" y1="8" x2="50" y2="92" stroke="#1C01A5" strokeWidth="2" />
      <line x1="8" y1="50" x2="92" y2="50" stroke="#1C01A5" strokeWidth="2" />
      <rect x="8" y="8" width="42" height="42" fill="#38bdf8" opacity="0.7" />
    </svg>
  );
}

function BiskuitKanvas() {
  return (
    <svg viewBox="0 0 140 140" className="mx-auto h-32 w-32" aria-hidden>
      <rect x="18" y="18" width="104" height="104" rx="12" fill="#fbbf24" stroke="#92400e" strokeWidth="4" />
      <circle cx="48" cy="50" r="6" fill="#78350f" />
      <circle cx="92" cy="58" r="6" fill="#78350f" />
      <circle cx="70" cy="90" r="6" fill="#78350f" />
    </svg>
  );
}

function KetupatPutus() {
  return (
    <svg viewBox="0 0 120 120" className="mx-auto h-28 w-28" aria-hidden>
      <path d="M60 10 L110 60 L60 110 L10 60 Z" fill="#bbf7d0" stroke="#166534" strokeWidth="3" />
      <line x1="60" y1="10" x2="60" y2="110" stroke="#166534" strokeWidth="2" strokeDasharray="6 6" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="#166534" strokeWidth="2" strokeDasharray="6 6" />
    </svg>
  );
}

function SegitigaTidakSama() {
  return (
    <svg viewBox="0 0 140 110" className="mx-auto h-24 w-32" aria-hidden>
      <path d="M70 8 L128 100 L12 100 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
      <line x1="40" y1="48" x2="100" y2="48" stroke="#9a3412" strokeWidth="3" />
      <text x="70" y="38" textAnchor="middle" fontSize="11" fontWeight="800" fill="#be123c">
        kecil
      </text>
      <text x="70" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1C01A5">
        lebar
      </text>
    </svg>
  );
}

function KuisBagiApel() {
  const kuis = useKuisMateri();
  const [wadah, setWadah] = useState<("rara" | "bimo" | "meja")[]>(["meja", "meja", "meja", "meja"]);
  const [angka, setAngka] = useState("");
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const pindah = (indeks: number) => {
    setStatus(null);
    setWadah((lama) =>
      lama.map((isi, i) => {
        if (i !== indeks) return isi;
        if (isi === "meja") return "rara";
        if (isi === "rara") return "bimo";
        return "meja";
      }),
    );
  };
  const isi = (nama: "rara" | "bimo" | "meja") => wadah.filter((item) => item === nama).length;
  const periksa = () => {
    const ok = isi("rara") === 2 && isi("bimo") === 2 && angka === "2";
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("A", 10));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">
        Ada 4 apel. Ketuk apel untuk masuk ke keranjang Rara atau Bimo. Lalu pilih setengah dari 4.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {(
          [
            ["meja", "Meja"],
            ["rara", "Keranjang Rara"],
            ["bimo", "Keranjang Bimo"],
          ] as const
        ).map(([kunci, judul]) => (
          <div key={kunci} className="rounded-xl bg-amber-50 px-3 py-2 text-center">
            <p className="text-xs font-black uppercase text-[#9A3412]">{judul}</p>
            <div className="mt-1 flex flex-wrap justify-center gap-1">
              {wadah.map((isiWadah, indeks) =>
                isiWadah === kunci ? (
                  <button key={indeks} type="button" onClick={() => pindah(indeks)} className="text-2xl">
                    🍎
                  </button>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {["1", "2", "4"].map((nilai) => (
          <button
            key={nilai}
            type="button"
            onClick={() => {
              setStatus(null);
              setAngka(nilai);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-black ${angka === nilai ? "bg-emerald-500 text-white" : "bg-[#1C01A5] text-white"}`}
          >
            {nilai} apel
          </button>
        ))}
      </div>
      <button type="button" onClick={periksa} className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={angka || undefined} pesanSalah="Bagi 4 apel jadi 2 dan 2. Setengahnya 2." />
        <UmpanBenar status={status} teks="Benar! Setengah dari 4 apel adalah 2 apel." />
      </div>
    </article>
  );
}

function KuisKetukKue() {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState(0);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, "C");
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Ketuk + 1/4 kue sampai piring penuh. Berapa kali kamu mengetuk?</p>
      <LingkaranBagian potong={4} diwarnai={isi} />
      <button
        type="button"
        onClick={() => setIsi((lama) => Math.min(4, lama + 1))}
        className="mt-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-black text-amber-950"
      >
        + 1/4 kue
      </button>
      <p className="mt-2 text-sm font-black text-[#1C01A5]">Terisi {isi} dari 4</p>
      <div className="mt-3 grid gap-2">
        {[
          { huruf: "A", teks: "2 kali" },
          { huruf: "B", teks: "3 kali" },
          { huruf: "C", teks: "4 kali" },
        ].map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              if (item.huruf === "C") kuis?.tandaiBenar(idKuis("B", 10));
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(pilih, item.huruf, "C", "bg-[#1C01A5] text-white")}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah="Empat kali seperempat menjadi satu utuh." />
        <UmpanBenar status={status} teks="Benar! 4 kali seperempat menjadi 1 kue utuh." />
      </div>
    </article>
  );
}

type WarnaPetak = "hijau" | "biru" | "kuning" | "ungu";
type MisiPetak = {
  warna: WarnaPetak;
  misi: string;
  narasi: string;
  mode: "suara" | "kanvas" | "pilih";
  anak?: ReactNode;
  alias: string[];
  labelPertama?: string;
  labelKedua?: string;
  benarPilih?: "pertama" | "kedua";
  pilihan?: { huruf: string; teks: string }[];
  benarHuruf?: string;
  bersama: string;
};

const NOMOR_IKAT = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-300 bg-emerald-50",
  biru: "border-sky-300 bg-sky-50",
  kuning: "border-amber-300 bg-amber-50",
  ungu: "border-violet-300 bg-violet-50",
};

const MISI_RESTORAN: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Wortel adil",
    narasi: "2 kelinci memesan 1 wortel dibagi setengah. Pilih potongan yang adil.",
    mode: "pilih",
    anak: (
      <div className="grid gap-2 sm:grid-cols-2">
        <p className="text-center text-3xl">🥕🥕</p>
        <p className="text-center text-3xl">🥕 ·</p>
      </div>
    ),
    alias: ["pertama"],
    labelPertama: "A. Sama besar",
    labelKedua: "B. Satu panjang, satu pendek",
    benarPilih: "pertama",
    bersama: "Dua kelinci. Potong sama besar. Itu setengah.",
  },
  {
    warna: "ungu",
    misi: "Pizza 4 beruang",
    narasi: "4 beruang memesan 1 pizza. Ketuk loyang yang terbagi 4 sama besar.",
    mode: "pilih",
    anak: <LingkaranBagian potong={4} diwarnai={0} />,
    alias: ["pertama"],
    labelPertama: "4 juring sama besar",
    labelKedua: "4 potong beda ukuran",
    benarPilih: "pertama",
    bersama: "Empat tamu. Empat potong sama besar.",
  },
  {
    warna: "biru",
    misi: "Enam kue mangkuk",
    narasi: "Pelanggan memesan setengah dari 6 kue mangkuk. Berapa kue yang ditarik?",
    mode: "pilih",
    anak: <p className="text-center text-2xl">🧁🧁🧁 🧁🧁🧁</p>,
    alias: ["kedua"],
    labelPertama: "2 kue",
    labelKedua: "3 kue",
    benarPilih: "kedua",
    bersama: "Setengah dari 6 adalah 3.",
  },
  {
    warna: "ungu",
    misi: "Puding Bimo",
    narasi: "Koki Bimo memotong puding. Atas kecil, bawah lebar. Apakah itu setengah?",
    mode: "pilih",
    anak: <SegitigaTidakSama />,
    alias: ["kedua"],
    labelPertama: "Setuju",
    labelKedua: "Tidak setuju",
    benarPilih: "kedua",
    bersama: "Tidak sama besar. Bukan setengah.",
  },
  {
    warna: "hijau",
    misi: "Tiket apel Rara",
    narasi: "Rara mengambil 1 potong dari 4 potong apel yang sama besar. Tiket pecahannya?",
    mode: "pilih",
    anak: <LingkaranBagian potong={4} diwarnai={1} />,
    pilihan: [
      { huruf: "A", teks: "1/2" },
      { huruf: "B", teks: "1/4" },
      { huruf: "C", teks: "4/1" },
    ],
    benarHuruf: "B",
    alias: ["B"],
    bersama: "Satu dari empat sama besar. Itu seperempat atau satu per empat.",
  },
  {
    warna: "biru",
    misi: "Anggur 12",
    narasi: "Ada 12 anggur. Koki Igil memberi setengahnya, yaitu 6. Apakah hitungannya benar?",
    mode: "pilih",
    anak: <p className="text-center text-xl">🍇🍇🍇🍇🍇🍇 · 🍇🍇🍇🍇🍇🍇</p>,
    alias: ["pertama"],
    labelPertama: "Benar",
    labelKedua: "Salah",
    benarPilih: "pertama",
    bersama: "Setengah dari 12 adalah 6.",
  },
  {
    warna: "kuning",
    misi: "Ikan panggang",
    narasi: "Kucing Mochi mengambil 1 bagian dari 2 bagian ikan yang sama besar. Ucapkan nama pecahannya.",
    mode: "suara",
    anak: <LingkaranBagian potong={2} diwarnai={1} />,
    alias: ["setengah", "satu per dua", "1/2"],
    bersama: "Satu dari dua sama besar. Itu setengah.",
  },
  {
    warna: "kuning",
    misi: "Sepuluh biskuit",
    narasi: "Ada 10 biskuit. Pelanggan minta setengahnya. Sebutkan angkanya.",
    mode: "suara",
    anak: <p className="text-center text-xl">🍪🍪🍪🍪🍪 🍪🍪🍪🍪🍪</p>,
    alias: ["5", "lima"],
    bersama: "Setengah dari 10 adalah 5.",
  },
  {
    warna: "kuning",
    misi: "Roti lapis 4",
    narasi: "Gambar 2 garis potong pada roti persegi supaya jadi 4 bagian sama besar. Lalu tulis 1/4.",
    mode: "kanvas",
    anak: <BiskuitKanvas />,
    alias: ["1/4", "1 / 4", "seperempat", "satu per empat"],
    bersama: "Dua garis silang. Empat bagian sama. Tulis 1/4.",
  },
  {
    warna: "kuning",
    misi: "Papan menu",
    narasi: "Tuliskan lambang pecahan satu per dua pada papan menu.",
    mode: "kanvas",
    anak: (
      <p className="text-center text-lg font-black text-[#1C01A5]">
        Menu: <Lambang atas="1" bawah="2" />
      </p>
    ),
    alias: ["1/2", "1 / 2", "setengah", "satu per dua"],
    bersama: "Tulis 1/2.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiRestoran() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_RESTORAN[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;
  const daun = Object.values(jejak).reduce((jumlah, item) => jumlah + item.daun, 0);

  const catat = (indeks: number, benar: boolean) => {
    setJejak((lama) => {
      const sebelumnya = lama[indeks] ?? { petunjuk: 0, selesai: false, daun: 0 };
      if (sebelumnya.selesai) return lama;
      if (benar) {
        return { ...lama, [indeks]: { ...sebelumnya, selesai: true, daun: daunDariPetunjuk(sebelumnya.petunjuk) } };
      }
      return { ...lama, [indeks]: { ...sebelumnya, petunjuk: Math.min(3, sebelumnya.petunjuk + 1) } };
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Koki Igil di 10 pesanan. Pilih satu meja, dengarkan misinya, lalu jawab.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🍽️
        </span>
        {NOMOR_IKAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_RESTORAN[indeks].warna]
              }`}
              aria-label={`Pesanan ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏆
        </span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang kepuasan {bintang}/10 · Daun rapi {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Pesanan {aktif + 1} · {misi.misi}
        </p>
        <NamaDialog nama="Koki Igil" />
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.anak ? <div className="mt-3">{misi.anak}</div> : null}
        {kini.petunjuk >= 3 ? <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p> : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Coba lagi, ya.</p>
        ) : null}
        {kini.selesai ? <p className="mt-3 text-sm font-black text-emerald-800">Pelanggan tersenyum! Pilih pesanan lain.</p> : null}
        {misi.mode === "suara" ? (
          <div className="mt-3" key={`suara-${aktif}`}>
            <SoalRekamSuara
              id={idKuis("C", aktif)}
              pertanyaan={misi.narasi}
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, misi.alias)}
              petunjuk="Jawab dengan suara, lalu kirim."
              sesudahNilai={(benar) => catat(aktif, benar)}
            />
          </div>
        ) : null}
        {misi.mode === "kanvas" ? (
          <div className="mt-3" key={`kanvas-${aktif}`}>
            <KuisTulisKartu
              id={idKuis("C", aktif)}
              hanyaKanvas
              pertanyaan={misi.narasi}
              alias={misi.alias}
              konteks={misi.bersama}
              sesudahNilai={(benar) => catat(aktif, benar)}
            />
          </div>
        ) : null}
        {misi.mode === "pilih" && misi.pilihan && misi.benarHuruf ? (
          <div className="mt-3 grid gap-2">
            {misi.pilihan.map((item) => (
              <button
                key={item.huruf}
                type="button"
                disabled={kini.selesai}
                onClick={() => {
                  const benar = item.huruf === misi.benarHuruf;
                  catat(aktif, benar);
                  if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
                }}
                className="min-h-12 rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white"
              >
                {item.huruf}. {item.teks}
              </button>
            ))}
          </div>
        ) : null}
        {misi.mode === "pilih" && !misi.pilihan ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={kini.selesai}
              onClick={() => {
                const benar = misi.benarPilih === "pertama";
                catat(aktif, benar);
                if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
              }}
              className="min-h-12 rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white"
            >
              {misi.labelPertama}
            </button>
            <button
              type="button"
              disabled={kini.selesai}
              onClick={() => {
                const benar = misi.benarPilih === "kedua";
                catat(aktif, benar);
                if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
              }}
              className="min-h-12 rounded-xl bg-amber-500 px-3 py-2 text-sm font-black text-amber-950"
            >
              {misi.labelKedua}
            </button>
          </div>
        ) : null}
      </article>
    </div>
  );
}

function LembarKerja() {
  return (
    <div className="mt-4 space-y-4">
      <KuisPilih
        id={idKuis("D", 0)}
        soal="Gambar A dan B dibagi 4 sama besar, 1 bagian biru. Gambar C tidak sama lebar. Bagian biru yang keduanya seperempat ada pada..."
        benar="A"
        umpanBenar="Benar! A dan B sama besar. C tidak adil."
        pesanSalah="Cari dua gambar yang potongannya sama besar."
        anak={
          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <p className="text-center text-xs font-black">A</p>
              <PersegiEmpat mode="silang" />
            </div>
            <div>
              <p className="text-center text-xs font-black">B</p>
              <PersegiEmpat mode="diagonal" />
            </div>
            <div>
              <p className="text-center text-xs font-black">C</p>
              <PersegiEmpat mode="tidak-sama" />
            </div>
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "A dan B" },
          { huruf: "B", teks: "A dan C" },
          { huruf: "C", teks: "B dan C" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="Rara makan setengah semangka. Bimo makan seperempat dari semangka yang sama besar. Siapa yang makan lebih besar?"
        benar="A"
        umpanBenar="Tepat! Setengah lebih besar daripada seperempat."
        pesanSalah="Bandingkan ukurannya. Setengah lebih lebar."
        anak={
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <p className="text-center text-xs font-black">Rara</p>
              <LingkaranBagian potong={2} diwarnai={1} />
            </div>
            <div>
              <p className="text-center text-xs font-black">Bimo</p>
              <LingkaranBagian potong={4} diwarnai={1} />
            </div>
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "Rara" },
          { huruf: "B", teks: "Bimo" },
          { huruf: "C", teks: "sama besar" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="Satu segitiga kecil bernilai seperempat. Berapa segitiga supaya menjadi utuh?"
        benar="C"
        umpanBenar="Benar! Empat seperempat menjadi satu utuh."
        pesanSalah="Seperempat artinya 4 bagian."
        pilihan={[
          { huruf: "A", teks: "2 segitiga" },
          { huruf: "B", teks: "3 segitiga" },
          { huruf: "C", teks: "4 segitiga" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="Ibu punya 8 apel. Setengah diberikan kepada Nenek. Rara makan 1 apel dari sisa Ibu. Apel Ibu yang tersisa..."
        benar="B"
        umpanBenar="Benar! Setengah dari 8 adalah 4. Sisa 4 dikurangi 1 sama dengan 3."
        pesanSalah="Setengah dulu, lalu kurangi 1."
        anak={<p className="text-center text-2xl">🍎🍎🍎🍎 🍎🍎🍎🍎</p>}
        pilihan={[
          { huruf: "A", teks: "4 apel" },
          { huruf: "B", teks: "3 apel" },
          { huruf: "C", teks: "2 apel" },
        ]}
      />
      <KuisCocok
        id={idKuis("D", 4)}
        soal="Pasangkan kumpulan benda dengan jumlah setengahnya."
        baris={[
          { id: "lebah", tampil: "🐝🐝🐝🐝", benar: "2" },
          { id: "ikan", tampil: "🐟🐟🐟🐟🐟🐟🐟🐟", benar: "4" },
          { id: "balon", tampil: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈", benar: "5" },
        ]}
        label={["2", "4", "5"]}
        umpanBenar="Semua cocok! Setengah dari 4, 8, dan 10."
        pesanSalah="Bagi tiap kumpulan jadi 2 kelompok sama banyak."
      />
      <KuisBenarSalah
        id={idKuis("D", 5)}
        soal='Segitiga dipotong mendatar. Atas kecil, bawah lebar. Bimo bilang, "Bagian atas bernilai setengah." Apakah Bimo benar?'
        benar="salah"
        anak={<SegitigaTidakSama />}
        umpanBenar="Salah. Kedua bagian tidak sama besar."
        pesanSalah="Lihat ukurannya. Atas kecil, bawah lebar."
      />
      <div>
        <p className="text-sm font-semibold text-slate-700">Setengah dari sosis Bimo adalah 3 potong. Berapa seluruh sosis mula-mula?</p>
        <p className="mt-2 text-center text-2xl">🌭🌭🌭 | ☐ ☐ ☐</p>
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="Jika setengahnya 3, berapa seluruh sosis Bimo? Jawab dengan suaramu."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["6", "enam"])}
          petunjuk="Ucapkan angkanya."
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">Lingkaran dibagi 4 sama besar. Satu bagian kuning. Disebut pecahan apakah bagian kuning?</p>
        <LingkaranBagian potong={4} diwarnai={1} />
        <SoalRekamSuara
          id={idKuis("D", 7)}
          pertanyaan="Ucapkan nama pecahan bagian yang kuning."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["seperempat", "satu per empat", "1/4"])}
          petunjuk="Ucapkan seperempat atau satu per empat."
        />
      </div>
      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="Ada 6 kupu-kupu. Lingkari setengahnya, lalu tuliskan angkanya."
        alias={kumpulkanAlias(["3", "tiga"])}
        konteks="Setengah dari 6 adalah 3."
        visual={<p className="text-center text-2xl">🦋🦋🦋 🦋🦋🦋</p>}
      />
      <KuisTulisKartu
        id={idKuis("D", 9)}
        hanyaKanvas
        pertanyaan="Ada 12 telur, dibagi 2 sama banyak. Tuliskan setengah dari 12."
        alias={kumpulkanAlias(["6", "enam"])}
        konteks="Setengah dari 12 adalah 6."
        visual={<p className="text-center text-xl">🥚🥚🥚🥚🥚🥚 | 🥚🥚🥚🥚🥚🥚</p>}
      />
    </div>
  );
}

export default function NaskahMtk2Bab5({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB5;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai latar="bg-sky-50/80">
        <p className="text-center text-4xl" aria-hidden>
          👨‍🍳🥞🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Menunjukkan setengah dari benda utuh.",
            "Menunjukkan seperempat dari benda utuh.",
            "Menunjukkan setengah dari kumpulan benda.",
            "Membedakan potongan sama besar dan tidak sama besar.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab 5.1: Setengah dari Benda Utuh"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Halo koki cilik. Hari ini kita belajar pecahan setengah bersama Koki Igil.",
            "Jika satu benda utuh dibagi menjadi dua bagian yang sama besar, setiap bagian disebut setengah atau satu per dua.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-setengah.jpg"
            alt="Apel utuh dibelah tepat di tengah. Satu belahan bernilai satu per dua. Koki Igil menonton."
          />
          <AdeganDapur>
            <p className="text-sm font-semibold text-slate-700">
              Koki Igil, Rara, dan Bimo berdiri di meja kayu. Ada 1 loyang martabak manis bulat.
            </p>
          </AdeganDapur>
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-cerita.jpg"
            alt="Koki Igil memakai topi koki. Rara dan Bimo di depan meja. Satu martabak manis bulat."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Koki Igil, martabaknya cuma ada satu, tapi Rara dan Bimo sama-sama mau makan!”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Kalau dipotong asal-asalan, nanti ada yang dapat potongan kecil, dong?”
          </Dialog>
          <Dialog nama="Koki Igil" warna="border-amber-300 bg-amber-50">
            “Tenang! Kita potong tepat di tengah supaya jadi 2 bagian sama besar. Satu bagian untuk Rara ini namanya setengah atau satu per dua!”
          </Dialog>
          <p className="text-center text-lg font-black text-[#1C01A5]">
            setengah = <Lambang atas="1" bawah="2" />
          </p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            pertanyaanSuara="Jika satu martabak utuh dipotong menjadi dua bagian sama besar, disebut apakah satu bagian potongan itu?"
            aliasSuara={["setengah", "satu per dua", "1/2"]}
            petunjukSuara="Ucapkan setengah atau satu per dua."
          />
          <KuisTulisKartu
            id={idKuis("A", 1)}
            hanyaKanvas
            pertanyaan="Gambarkan satu garis lurus tepat di tengah biskuit. Lalu tuliskan 1/2."
            alias={kumpulkanAlias(["1/2", "1 / 2", "setengah", "satu per dua"])}
            konteks="Garis di tengah. Dua bagian sama besar. Tulis 1/2."
            visual={<BiskuitKanvas />}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab 5.2: Seperempat dari Benda Utuh"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Sekarang kita kenal pecahan seperempat.",
            "Kalau satu benda utuh kita bagi menjadi empat bagian yang sama besar, satu bagiannya disebut seperempat atau satu per empat.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-seperempat.jpg"
            alt="Pizza dipotong menyilang menjadi 4. Satu potong diangkat, bernilai satu per empat."
          />
          <AdeganDapur>
            <p className="text-sm font-semibold text-slate-700">
              Meja dapur: 1 semangka bundar dan 4 piring kecil untuk Koki Igil, Rara, Bimo, dan Mochi.
            </p>
          </AdeganDapur>
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-martabak.jpg"
            alt="Semangka di meja. Empat piring untuk Koki Igil, Rara, Bimo, dan kucing Mochi."
          />
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Wah, sekarang ada 4 orang yang mau makan semangka: aku, Rara, Koki Igil, dan Mochi!”
          </Dialog>
          <Dialog nama="Koki Igil" warna="border-amber-300 bg-amber-50">
            “Supaya adil, 1 semangka ini kita potong menjadi 4 bagian sama besar. Satu potongan di piring Bimo ini nilainya seperempat atau satu per empat!”
          </Dialog>
          <Dialog nama="Mochi" warna="border-orange-200 bg-orange-50">
            “Meong! Piringku juga sama besar, ya.”
          </Dialog>
          <p className="text-center text-lg font-black text-[#1C01A5]">
            seperempat = <Lambang atas="1" bawah="4" />
          </p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            pertanyaanSuara="Satu semangka dibagi menjadi 4 bagian sama besar. Disebut pecahan apakah satu bagiannya?"
            aliasSuara={["seperempat", "satu per empat", "1/4"]}
            petunjukSuara="Ucapkan seperempat atau satu per empat."
          />
          <KuisTulisKartu
            id={idKuis("A", 3)}
            hanyaKanvas
            pertanyaan="Tuliskan lambang pecahan satu per empat pada kotak tulis."
            alias={kumpulkanAlias(["1/4", "1 / 4", "seperempat", "satu per empat"])}
            konteks="Satu dari empat. Tulis 1/4."
            visual={<LingkaranBagian potong={4} diwarnai={1} />}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab 5.3: Setengah dari Kumpulan Benda"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Pecahan setengah tidak hanya untuk satu benda yang dipotong.",
            "Kita juga bisa mencari setengah dari kumpulan benda. Bagi benda-benda itu ke dalam 2 wadah sama banyak.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <p className="text-center text-2xl" aria-hidden>
            🍓🍓🍓 | 🍓🍓🍓
          </p>
          <AdeganDapur>
            <p className="text-sm font-semibold text-slate-700">Di atas meja Koki Igil ada 8 kue donat cokelat dan 2 kotak kue biru dan kuning.</p>
          </AdeganDapur>
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab5-kelereng.jpg"
            alt="Delapan donat cokelat. Dua kotak kue. Koki Igil, Rara, dan Bimo berbagi."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Koki Igil, ada 8 donat di meja. Rara mau membawa setengahnya untuk bekal.”
          </Dialog>
          <Dialog nama="Koki Igil" warna="border-amber-300 bg-amber-50">
            “Yuk kita bagi 8 donat ini ke dalam 2 kotak satu per satu sampai habis! Lihat, masing-masing kotak berisi 4 donat. Jadi, setengah dari 8 donat adalah 4 donat!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 4)}
            pertanyaanSuara="Jika ada 6 permen dibagi sama banyak ke 2 toples, berapa isi permen di satu toples?"
            aliasSuara={["3", "tiga"]}
            petunjukSuara="Sebutkan angkanya."
          />
          <KuisTulisKartu
            id={idKuis("A", 5)}
            hanyaKanvas
            pertanyaan="Lingkari setengah dari 10 jeruk, lalu tuliskan angkanya."
            alias={kumpulkanAlias(["5", "lima"])}
            konteks="Setengah dari 10 adalah 5."
            visual={<p className="text-center text-2xl">🍊🍊🍊🍊🍊 🍊🍊🍊🍊🍊</p>}
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan dapur</p>
        <div className="space-y-3">
          <KuisPilih
            id={idKuis("A", 6)}
            soal="Ketuk roti yang menunjukkan pecahan setengah."
            benar="B"
            umpanBenar="Benar! Roti B dipotong di tengah, sama besar."
            pesanSalah="Cari dua bagian yang sama besar."
            anak={
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <p className="text-center text-xs font-black">A</p>
                  <RotiTiga jenis="kecil-besar" />
                </div>
                <div>
                  <p className="text-center text-xs font-black">B</p>
                  <RotiTiga jenis="sama" />
                </div>
                <div>
                  <p className="text-center text-xs font-black">C</p>
                  <RotiTiga jenis="miring" />
                </div>
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Roti A, kecil dan besar" },
              { huruf: "B", teks: "Roti B, sama besar" },
              { huruf: "C", teks: "Roti C, miring tidak sama" },
            ]}
          />
          <KuisCocok
            id={idKuis("A", 7)}
            soal="Pasangkan kue berarsir dengan label pecahannya."
            baris={[
              { id: "pizza", tampil: <>🍕 pizza <Lambang atas="1" bawah="2" /></>, benar: "Setengah" },
              { id: "bolu", tampil: <>🍰 bolu <Lambang atas="1" bawah="4" /></>, benar: "Seperempat" },
              { id: "cokelat", tampil: <>🍫 cokelat <Lambang atas="1" bawah="2" /></>, benar: "Setengah" },
            ]}
            label={["Setengah", "Seperempat"]}
            umpanBenar="Pizza dan cokelat setengah. Bolu seperempat."
            pesanSalah="Lihat angkanya. 2 di bawah itu setengah. 4 di bawah itu seperempat."
          />
          <KuisBenarSalah
            id={idKuis("A", 8)}
            soal="Koki Igil memotong 1 apel jadi 4. Satu potong sangat besar, 3 potong kecil. Potongan ini disebut seperempat. Benar atau salah?"
            benar="salah"
            anak={<p className="text-center text-3xl">🍎 ▬ · · ·</p>}
            umpanBenar="Salah. Seperempat harus 4 bagian sama besar."
            pesanSalah="Lihat ukurannya. Harus sama besar."
          />
          <KuisSusun
            id={idKuis("A", 9)}
            soal="Susun 2 keping setengah ke piring sampai menjadi 1 utuh."
            pool={[
              { kunci: "keping-kiri", tampil: "keping 1/2" },
              { kunci: "keping-kanan", tampil: "keping 1/2" },
            ]}
            benar={["keping-kiri", "keping-kanan"]}
            umpanBenar="Benar! Dua keping setengah menjadi 1 utuh."
            pesanSalah="Masukkan kedua keping setengah ke piring."
          />
          <KuisBagiApel />
        </div>
      </KartuBingkai>

      <KartuBingkai latar="bg-violet-50/80">
        <p className="text-center text-4xl" aria-hidden>
          📊🍕🍓
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Infografis 1: Mengenal Setengah"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Perhatikan ringkasan pecahan setengah. Syarat utamanya: harus dibagi menjadi 2 bagian yang sama besar.",
            "Angka 1 di atas artinya 1 bagian yang dipilih. Angka 2 di bawah artinya jumlah seluruh potongan yang sama besar.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <AdeganDapur>
            <p className="text-sm font-black text-[#1C01A5]">1 benda utuh → dibagi 2 sama besar → 2 bagian setengah</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              <Lambang atas="1" bawah="2" /> = 1 bagian yang diwarnai, dari 2 bagian sama besar.
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Kertas persegi dipotong diagonal tepat di tengah. Dua segitiga sama besar. Satu segitiga bernilai satu per dua.
            </p>
          </AdeganDapur>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            pertanyaanSuara="Pada pecahan satu per dua, angka berapakah yang berada di bagian bawah?"
            aliasSuara={["2", "dua"]}
            petunjukSuara="Ucapkan dua."
          />
          <KuisTulisKartu
            id={idKuis("B", 1)}
            hanyaKanvas
            pertanyaan="Warnai 1 belahan lingkaran, lalu tuliskan 1/2."
            alias={kumpulkanAlias(["1/2", "1 / 2", "setengah"])}
            konteks="Satu dari dua. Tulis 1/2."
            visual={<LingkaranBagian potong={2} diwarnai={0} />}
          />
        </div>

        <JudulSubBab
          judul="Infografis 2: Mengenal Seperempat"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Pada pecahan seperempat, satu benda utuh dibagi menjadi 4 bagian yang sama besar.",
            "Kalau ukurannya tidak sama besar, itu bukan seperempat.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <AdeganDapur>
            <p className="text-sm font-black text-[#1C01A5]">1 persegi utuh → dibagi 4 sama besar → 4 bagian seperempat</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              <Lambang atas="1" bawah="4" /> = 1 bagian yang diwarnai, dari 4 bagian sama besar.
            </p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <div>
                <p className="text-center text-xs font-black text-emerald-700">Sama besar = 1/4</p>
                <PersegiEmpat mode="silang" />
              </div>
              <div>
                <p className="text-center text-xs font-black text-rose-700">Beda ukuran = bukan 1/4</p>
                <PersegiEmpat mode="tidak-sama" />
              </div>
            </div>
          </AdeganDapur>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            pertanyaanSuara="Supaya menjadi pecahan seperempat, satu kue utuh harus dipotong menjadi berapa bagian yang sama besar?"
            aliasSuara={["4", "empat"]}
            petunjukSuara="Ucapkan empat."
          />
          <KuisTulisKartu
            id={idKuis("B", 3)}
            hanyaKanvas
            pertanyaan="Tebalkan garis putus-putus pada ketupat, lalu tuliskan 1/4."
            alias={kumpulkanAlias(["1/4", "1 / 4", "seperempat"])}
            konteks="Dua garis silang. Empat bagian sama. Tulis 1/4."
            visual={<KetupatPutus />}
          />
        </div>

        <JudulSubBab
          judul="Infografis 3: Setengah dari Kumpulan Benda"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Untuk mencari setengah dari banyak benda, bagilah benda tersebut menjadi 2 kelompok yang sama banyak.",
            "Jumlah benda di satu kelompok itulah nilai setengahnya.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <AdeganDapur>
            <p className="text-center text-2xl">🍓🍓🍓 | 🍓🍓🍓</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Jumlah awal: 6 stroberi. Bagi ke 2 piring sama banyak.</p>
            <p className="text-lg font-black text-[#1C01A5]">
              Setengah dari 6 adalah 3. <Lambang atas="1" bawah="2" /> dari 6 = 3.
            </p>
          </AdeganDapur>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 4)}
            pertanyaanSuara="Berapakah setengah dari 4 bintang?"
            aliasSuara={["2", "dua"]}
            petunjukSuara="Ucapkan dua."
          />
          <KuisTulisKartu
            id={idKuis("B", 5)}
            hanyaKanvas
            pertanyaan="Ada 8 kelereng dibagi 2 kelompok sama banyak. Tuliskan setengah dari 8."
            alias={kumpulkanAlias(["4", "empat"])}
            konteks="Setengah dari 8 adalah 4."
            visual={<p className="text-center text-2xl">🔵🔵🔵🔵 🔵🔵🔵🔵</p>}
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan ringkasan</p>
        <div className="space-y-3">
          <KuisPilih
            id={idKuis("B", 6)}
            soal="Persegi diarsir seperempat di kiri atas. Pilih gambar yang juga seperempat, meski posisinya diputar."
            benar="B"
            umpanBenar="Benar! Satu dari empat petak, di kanan bawah, tetap seperempat."
            pesanSalah="Cari 1 petak dari 4 petak sama besar."
            anak={
              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <p className="text-center text-xs font-black">soal</p>
                  <PersegiEmpat mode="silang" />
                </div>
                <div>
                  <p className="text-center text-xs font-black">A</p>
                  <LingkaranBagian potong={2} diwarnai={1} />
                </div>
                <div>
                  <p className="text-center text-xs font-black">B</p>
                  <PersegiEmpat mode="putar" />
                </div>
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Setengah lingkaran" },
              { huruf: "B", teks: "1 petak dari 4, kanan bawah" },
              { huruf: "C", teks: "4 potong tidak sama" },
            ]}
          />
          <KuisPilih
            id={idKuis("B", 7)}
            soal="Pilih potongan semangka yang lebih besar: setengah atau seperempat?"
            benar="A"
            umpanBenar="Benar! Setengah lebih besar daripada seperempat."
            pesanSalah="Setengah menutupi lebih banyak."
            anak={
              <div className="grid gap-2 sm:grid-cols-2">
                <LingkaranBagian potong={2} diwarnai={1} />
                <LingkaranBagian potong={4} diwarnai={1} />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "potongan 1/2" },
              { huruf: "B", teks: "potongan 1/4" },
              { huruf: "C", teks: "sama besar" },
            ]}
          />
          <KuisCocok
            id={idKuis("B", 8)}
            soal="Cocokkan kartu setengah kumpulan dengan angkanya."
            baris={[
              { id: "sepuluh", tampil: "Setengah dari 10", benar: "5" },
              { id: "enam", tampil: "Setengah dari 6", benar: "3" },
              { id: "dua", tampil: "Setengah dari 2", benar: "1" },
            ]}
            label={["5", "3", "1"]}
            umpanBenar="Semua cocok!"
            pesanSalah="Bagi dua sama banyak."
          />
          <KuisPilih
            id={idKuis("B", 9)}
            soal="Dari 3 gambar, ketuk 1 gambar yang pembagiannya TIDAK sama besar."
            benar="C"
            umpanBenar="Tepat! Gambar C potongannya beda ukuran."
            pesanSalah="Cari yang tidak adil."
            anak={
              <div className="grid gap-2 sm:grid-cols-3">
                <PersegiEmpat mode="silang" />
                <LingkaranBagian potong={4} diwarnai={0} />
                <PersegiEmpat mode="tidak-sama" />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Persegi 4 sama" },
              { huruf: "B", teks: "Lingkaran 4 sama" },
              { huruf: "C", teks: "Persegi 4 tidak sama" },
            ]}
          />
          <KuisKetukKue />
        </div>
      </KartuBingkai>

      <KartuBingkai latar="bg-amber-50/80">
        <p className="text-center text-4xl" aria-hidden>
          🍽️⭐🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Sepuluh pesanan · bintang kepuasan pelanggan</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiRestoran />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Setengah: satu bagian dari benda utuh yang dibagi 2 sama besar.",
          "Seperempat: satu bagian dari benda utuh yang dibagi 4 sama besar.",
          "Setengah kumpulan: bagi menjadi 2 kelompok sama banyak.",
          "Angka atas: bagian yang diambil. Angka bawah: semua potongan sama besar.",
          "Potongan tidak sama besar bukan setengah dan bukan seperempat.",
          "Dua keping setengah menjadi 1 utuh. Empat keping seperempat juga 1 utuh.",
          "Setengah lebih besar daripada seperempat dari benda yang sama.",
        ]}
        penutup='Kalimat kunci: “Sama besar, sama banyak.”'
      />

      <KartuBingkai latar="bg-rose-50/80">
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Tantangan Para Juara · Pecahan</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)} />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB5.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Sama besar, sama banyak."
          alias={kumpulkanAlias(["sama besar", "sama banyak"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
