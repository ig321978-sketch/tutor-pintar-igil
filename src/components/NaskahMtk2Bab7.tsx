"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB7 } from "@/lib/modul-resmi-mtk-2-bab7";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

function GambarCerita({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB7.id, kode, indeks);
}

function UmpanBenar({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
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
            className={`min-h-12 rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
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
                    className={`min-h-12 rounded-xl px-4 py-2 text-sm font-black ${
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
      <button type="button" onClick={periksa} className="mt-3 min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]">
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
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk dari yang paling sedikit.</p> : null}
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
            className="min-h-12 rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
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
          className="min-h-12 rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]">
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

function AdeganLaut({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(180deg,#bae6fd_0%,#38bdf8_45%,#0369a1_100%)] px-3 py-4">
      <p className="absolute bottom-2 left-2 text-4xl" aria-hidden>
        🦉🤿
      </p>
      <div className="pl-14 text-white">{children}</div>
    </div>
  );
}

function BarisKerang({ puluhan, satuan }: { puluhan: number; satuan: number }) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-1">
      {Array.from({ length: puluhan }, (_, i) => (
        <span key={`p${i}`} className="rounded-lg bg-amber-100 px-1.5 py-1 text-center text-[10px] font-black text-amber-900">
          🐚10
        </span>
      ))}
      {Array.from({ length: satuan }, (_, i) => (
        <span key={`s${i}`} className="text-lg">
          ⚪
        </span>
      ))}
    </div>
  );
}

function PetiHarta({ puluhan, satuan, label }: { puluhan: number; satuan: number; label: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-2 py-2 text-center">
      <p className="text-xs font-black text-amber-900">{label}</p>
      <p className="mt-1 text-lg leading-none">{"📦".repeat(puluhan)}</p>
      <p className="text-lg leading-none">{"⚪".repeat(satuan)}</p>
      <p className="mt-1 text-[10px] font-bold text-slate-600">
        {puluhan} puluhan + {satuan} satuan
      </p>
    </div>
  );
}

function PapanNilai({ puluhan, satuan }: { puluhan: number; satuan: number }) {
  return (
    <div className="mx-auto grid max-w-xs grid-cols-2 overflow-hidden rounded-xl border-2 border-[#1C01A5]">
      <div className="bg-sky-50 px-3 py-2 text-center">
        <p className="text-[10px] font-black uppercase text-[#1C01A5]">Puluhan</p>
        <p className="text-3xl font-black text-blue-700">{puluhan}</p>
        <p className="text-xs font-bold text-slate-600">Nilainya {puluhan * 10}</p>
      </div>
      <div className="bg-emerald-50 px-3 py-2 text-center">
        <p className="text-[10px] font-black uppercase text-[#1C01A5]">Satuan</p>
        <p className="text-3xl font-black text-emerald-700">{satuan}</p>
        <p className="text-xs font-bold text-slate-600">Nilainya {satuan}</p>
      </div>
    </div>
  );
}

function KuisSortirPuluhan() {
  const kuis = useKuisMateri();
  const kunci: Record<string, "6 Puluhan" | "8 Puluhan"> = {
    n64: "6 Puluhan",
    n84: "8 Puluhan",
    n69: "6 Puluhan",
    n81: "8 Puluhan",
  };
  const kartu = [
    { id: "n64", tampil: "64" },
    { id: "n84", tampil: "84" },
    { id: "n69", tampil: "69" },
    { id: "n81", tampil: "81" },
  ];
  const [wadah, setWadah] = useState<Record<string, "6 Puluhan" | "8 Puluhan" | "">>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = kartu.every((item) => wadah[item.id] === kunci[item.id]);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("B", 9));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Tarik kartu ke keranjang 6 Puluhan atau 8 Puluhan.</p>
      {kartu.map((item) => (
        <div key={item.id} className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-sky-50 px-3 py-2">
          <span className="text-sm font-black text-[#1C01A5]">🦀 {item.tampil}</span>
          {(["6 Puluhan", "8 Puluhan"] as const).map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setStatus(null);
                setWadah((lama) => ({ ...lama, [item.id]: label }));
              }}
              className={`min-h-12 rounded-xl px-3 text-xs font-black ${
                wadah[item.id] === label ? "bg-emerald-500 text-white" : "bg-[#1C01A5] text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      ))}
      <button type="button" onClick={periksa} className="mt-3 min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="64 dan 69 punya 6 puluhan. 84 dan 81 punya 8 puluhan." />
        <UmpanBenar status={status} teks="Tepat! Lihat angka depannya." />
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

const MISI_PALUNG: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Gerbang 1 · ikat puluhan",
    narasi: "Gerbang 1 menampilkan 5 ikat puluhan dan 9 kubus satuan. Ketuk kode angka untuk membuka gerbang!",
    mode: "pilih",
    anak: <BarisKerang puluhan={5} satuan={9} />,
    alias: ["A"],
    pilihan: [
      { huruf: "A", teks: "59" },
      { huruf: "B", teks: "95" },
      { huruf: "C", teks: "509" },
    ],
    benarHuruf: "A",
    bersama: "5 puluhan = 50. Ditambah 9 satuan = 59.",
  },
  {
    warna: "biru",
    misi: "Gerbang 2 · sonar bacaan",
    narasi: 'Sonar mendeteksi bilangan "Sembilan puluh satu". Pilih lambang bilangan yang tepat!',
    mode: "pilih",
    alias: ["C"],
    pilihan: [
      { huruf: "A", teks: "19" },
      { huruf: "B", teks: "90" },
      { huruf: "C", teks: "91" },
    ],
    benarHuruf: "C",
    bersama: "Sembilan puluh satu ditulis 91.",
  },
  {
    warna: "ungu",
    misi: "Gerbang 3 · gabung 70 dan 6",
    narasi: "Untuk membuka Gerbang 3, tarik kartu 70 dan 6 agar bergabung membentuk bilangan 76!",
    mode: "pilih",
    anak: <p className="text-center text-lg font-black text-[#1C01A5]">70 + 6 → ?</p>,
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "706" },
      { huruf: "B", teks: "76" },
      { huruf: "C", teks: "67" },
    ],
    benarHuruf: "B",
    bersama: "70 puluhan ditambah 6 satuan = 76.",
  },
  {
    warna: "kuning",
    misi: "Gerbang 4 · jalur mutiara",
    narasi: "Ada dua jalur terowongan: Jalur Kiri 69 mutiara dan Jalur Kanan 71 mutiara. Pilih jalur yang lebih banyak!",
    mode: "pilih",
    anak: (
      <div className="grid grid-cols-2 gap-2 text-center text-sm font-black text-white">
        <p className="rounded-xl bg-rose-500 px-2 py-3">🔴 Kiri 69</p>
        <p className="rounded-xl bg-sky-600 px-2 py-3">🔵 Kanan 71</p>
      </div>
    ),
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "Jalur Kiri (69)" },
      { huruf: "B", teks: "Jalur Kanan (71)" },
    ],
    benarHuruf: "B",
    bersama: "71 lebih dari 69 karena 7 puluhan lebih dari 6 puluhan.",
  },
  {
    warna: "hijau",
    misi: "Gerbang 5 · lompat 10",
    narasi: "Balon udara penyelamat naik mengikuti pola lompat 10: 63 → 73 → 83 → [ ? ]. Ketuk angka berikutnya!",
    mode: "pilih",
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "84" },
      { huruf: "B", teks: "93" },
      { huruf: "C", teks: "100" },
    ],
    benarHuruf: "B",
    bersama: "Setiap lompat tambah 10. 83 + 10 = 93.",
  },
  {
    warna: "biru",
    misi: "Gerbang 6 · kode Arka",
    narasi: 'Arka berkata: "Pada bilangan 80, angka satuannya adalah 0 dan angka puluhannya adalah 8." Apakah kode Arka Benar atau Salah?',
    mode: "pilih",
    anak: <PapanNilai puluhan={8} satuan={0} />,
    alias: ["A"],
    pilihan: [
      { huruf: "A", teks: "Benar" },
      { huruf: "B", teks: "Salah" },
    ],
    benarHuruf: "A",
    bersama: "80: angka depan 8 puluhan, angka belakang 0 satuan.",
  },
  {
    warna: "ungu",
    misi: "Gerbang 7 · ucap 98",
    narasi: "Gerbang 7 bertuliskan angka 98. Ucapkan nama bilangan ini dengan lantang ke mikrofon agar gerbang terbuka!",
    mode: "suara",
    anak: <p className="text-center text-5xl font-black text-[#1C01A5]">98</p>,
    alias: ["sembilan puluh delapan", "98"],
    bersama: "98 dibaca sembilan puluh delapan.",
  },
  {
    warna: "kuning",
    misi: "Gerbang 8 · sepuluh puluhan",
    narasi: "Kapal selam berada di kedalaman 90, lalu turun 10 lagi hingga mencapai 10 puluhan. Sebutkan nama bilangan untuk 10 puluhan!",
    mode: "suara",
    alias: ["seratus", "100", "satu ratus"],
    bersama: "10 puluhan = 100, dibaca seratus.",
  },
  {
    warna: "hijau",
    misi: "Gerbang 9 · sonar kanvas",
    narasi: "Sonar menangkap 8 kerang puluhan dan 3 mutiara satuan. Tuliskan angka totalnya di layar kanvas sonar!",
    mode: "kanvas",
    anak: <BarisKerang puluhan={8} satuan={3} />,
    alias: ["83", "delapan puluh tiga"],
    bersama: "80 + 3 = 83.",
  },
  {
    warna: "biru",
    misi: "Gerbang 10 · rambu terbesar",
    narasi: "Lingkari bilangan yang PALING BESAR di antara tiga rambu karang ini pada kanvas: 67 – 76 – 70.",
    mode: "kanvas",
    anak: <p className="text-center text-2xl font-black text-[#1C01A5]">[ 67 ] – [ 76 ] – [ 70 ]</p>,
    alias: ["76", "tujuh puluh enam"],
    bersama: "76 paling besar. Puluhannya 7, satuannya 6.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiKapalSelam() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_PALUNG[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;

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
        Bantu Penyelam IGIL di 10 gerbang. Peta kedalaman 50 m sampai 100 m. Bar sonar ⭐⭐⭐⭐⭐.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🚢
        </span>
        {NOMOR_IKAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`min-h-12 rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_PALUNG[indeks].warna]
              }`}
              aria-label={`Gerbang ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏅
        </span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">Sonar {bintang}/10</p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Misi {aktif + 1} · {misi.misi}
        </p>
        <NamaDialog nama="Penyelam IGIL" />
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.anak ? <div className="mt-3">{misi.anak}</div> : null}
        {kini.petunjuk >= 3 ? <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p> : null}
        {kini.petunjuk > 0 && !kini.selesai ? <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Coba lagi, ya.</p> : null}
        {kini.selesai ? <p className="mt-3 text-sm font-black text-emerald-800">Gerbang terbuka! Pilih gerbang lain.</p> : null}
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
              alias={kumpulkanAlias(misi.alias)}
              konteks={misi.bersama}
              sesudahNilai={(benar) => catat(aktif, benar)}
              visual={misi.anak}
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
      </article>
    </div>
  );
}

function LembarKerja() {
  return (
    <div className="mt-4 space-y-4">
      <KuisPilih
        id={idKuis("D", 0)}
        soal="Nala memiliki kartu angka 6 dan 9. Jika Nala menyusun kedua kartu itu menjadi bilangan dua angka yang PALING BESAR, maka nilai tempatnya adalah..."
        benar="B"
        umpanBenar="Benar! 96 paling besar. 9 puluhan dan 6 satuan."
        pesanSalah="Letakkan angka terbesar di depan."
        anak={<p className="text-center text-3xl font-black text-[#1C01A5]">6 · 9 → ?</p>}
        pilihan={[
          { huruf: "A", teks: "6 Puluhan dan 9 Satuan (69)" },
          { huruf: "B", teks: "9 Puluhan dan 6 Satuan (96)" },
          { huruf: "C", teks: "9 Puluhan dan 9 Satuan (99)" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="Di atas meja terdapat 6 kantong puluhan (60 kelereng) dan 14 kelereng satuan. Jika 10 kelereng satuan dimasukkan ke kantong puluhan baru, berapakah jumlah seluruh kelereng sekarang?"
        benar="B"
        umpanBenar="Benar! 6 puluhan + 1 puluhan baru = 7 puluhan dan sisa 4 satuan = 74."
        pesanSalah="10 satuan jadi 1 puluhan. Sisa 4 satuan. 70 + 4 = 74."
        anak={<BarisKerang puluhan={6} satuan={14} />}
        pilihan={[
          { huruf: "A", teks: "64 kelereng" },
          { huruf: "B", teks: "74 kelereng" },
          { huruf: "C", teks: "84 kelereng" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="Aku adalah sebuah bilangan di antara 70 dan 80. Angka satuanku sama dengan angka puluhanku. Bilangan berapakah aku?"
        benar="B"
        umpanBenar="Benar! 77. Puluhan 7, satuan 7."
        pesanSalah="Antara 70 dan 80, angka yang sama di depan dan belakang."
        pilihan={[
          { huruf: "A", teks: "70" },
          { huruf: "B", teks: "77" },
          { huruf: "C", teks: "88" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="Seekor katak laut melompat mundur 5 langkah: 95 → 90 → 85 → [ P ] → 75. Berapakah bilangan P?"
        benar="B"
        umpanBenar="Benar! 85 kurang 5 sama dengan 80."
        pesanSalah="Tiap lompat mundur kurang 5."
        anak={<p className="text-center text-lg font-black text-[#1C01A5]">95 → 90 → 85 → ? → 75</p>}
        pilihan={[
          { huruf: "A", teks: "84" },
          { huruf: "B", teks: "80" },
          { huruf: "C", teks: "70" },
        ]}
      />
      <KuisCocok
        id={idKuis("D", 4)}
        soal="Pasangkan kotak deskripsi dengan bilangan yang tepat."
        baris={[
          { id: "delapan", tampil: "🐚 8 Puluhan + 0 Satuan", benar: "80" },
          { id: "sepuluh", tampil: "🌟 10 Puluhan", benar: "100" },
          { id: "balik", tampil: "🦀 5 Satuan + 7 Puluhan", benar: "75" },
        ]}
        label={["80", "100", "75"]}
        umpanBenar="80, 100, dan 75. Hati-hati urutan dibalik!"
        pesanSalah="Puluhan di depan. 7 puluhan dan 5 satuan = 75."
      />
      <KuisBenarSalah
        id={idKuis("D", 5)}
        soal='Arka 89 kerang, Nala 91 kerang, Toti 85 kerang. Arka berkata: "Urutan kerang dari yang paling banyak adalah Nala, Arka, lalu Toti." Apakah pernyataan Arka benar atau salah?'
        benar="benar"
        umpanBenar="Benar. 91 > 89 > 85."
        pesanSalah="Bandingkan puluhan dulu, lalu satuan."
      />
      <div>
        <p className="text-sm font-semibold text-slate-700">
          Penyelam IGIL sudah punya 90 mutiara. Butuh tambah berapa mutiara lagi supaya genap menjadi 100? Ucapkan jawabannya ke mikrofon!
        </p>
        <BarisKerang puluhan={9} satuan={0} />
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="Sudah 90. Tambah berapa supaya 100?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["sepuluh", "10"])}
          petunjuk="Ucapkan sepuluh."
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">Di antara 64 dan 69, bilangan manakah yang lebih besar? Sebutkan nama bilangannya dengan jelas!</p>
        <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">64 · 69</p>
        <SoalRekamSuara
          id={idKuis("D", 7)}
          pertanyaan="Mana yang lebih besar, 64 atau 69?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam puluh sembilan", "69"])}
          petunjuk="Ucapkan enam puluh sembilan."
        />
      </div>
      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="Suatu bilangan terdiri dari 3 Satuan dan 9 Puluhan. Hati-hati jangan terbalik! Tuliskan lambang bilangannya."
        alias={kumpulkanAlias(["93"])}
        konteks="9 puluhan di depan, 3 satuan di belakang. 93."
      />
      <KuisTulisKartu
        id={idKuis("D", 9)}
        hanyaKanvas
        pertanyaan="Pada Tabel 100, setiap turun satu kotak nilainya bertambah 10. Tuliskan angka yang tepat di bawah 72."
        alias={kumpulkanAlias(["82"])}
        konteks="72 tambah 10 sama dengan 82."
        visual={
          <div className="mx-auto w-24 overflow-hidden rounded-xl border-2 border-[#1C01A5] text-center text-lg font-black text-[#1C01A5]">
            <p className="border-b border-[#1C01A5]/20 py-1">62</p>
            <p className="border-b border-[#1C01A5]/20 py-1">72</p>
            <p className="bg-amber-50 py-1">?</p>
          </div>
        }
      />
    </div>
  );
}

export default function NaskahMtk2Bab7({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB7;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🤿🐚🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Sub-Bab 7.1: Menghitung, Membaca, dan Menulis Bilangan (51–100)"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Halo penyelam cilik! Bersama Penyelam IGIL, kita akan menghitung harta karun mutiara dari angka 51 sampai 100.",
            "Agar cepat dan tidak salah hitung, kita kumpulkan setiap 10 mutiara ke dalam 1 kerang besar!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab7-cerita.jpg"
            alt="Enam kerang bertuliskan 10 dan empat mutiara lepas, panah ke angka 64. Penyelam IGIL di kiri bawah."
          />
          <AdeganLaut>
            <p className="text-sm font-semibold">
              Dasar laut terang. Di tengah berjajar 7 kerang besar berisi 10 mutiara, dan 3 mutiara satuan di atas pasir putih.
            </p>
          </AdeganLaut>
          <BarisKerang puluhan={7} satuan={3} />
          <Dialog nama="Nala" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Wah, mutiaranya banyak sekali! Kalau lebih dari 50, bagaimana cara menghitungnya supaya tidak lupa, Penyelam IGIL?”
          </Dialog>
          <Dialog nama="Arka" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Lihat, setiap kerang besar sudah berisi 10 mutiara! Ada 7 kerang besar, berarti nilainya 70.”
          </Dialog>
          <Dialog nama="Penyelam IGIL" warna="border-sky-300 bg-sky-50">
            “Tepat sekali, Arka! Ditambah 3 mutiara di luar kerang, jumlahnya menjadi 73 dan dibaca tujuh puluh tiga!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            pertanyaanSuara="Jika ada 8 kerang puluhan dan 5 mutiara satuan, angkanya adalah 85. Bagaimana cara membaca bilangan 85? Ucapkan ke mikrofon!"
            aliasSuara={["delapan puluh lima", "85"]}
            petunjukSuara="Ucapkan delapan puluh lima."
          />
          <KuisTulisKartu
            id={idKuis("A", 1)}
            hanyaKanvas
            pertanyaan="Hitung jumlah seluruh bintang laut ini, lalu tuliskan lambang bilangannya pada kotak kanvas tulis!"
            alias={kumpulkanAlias(["68"])}
            konteks="6 kantong jaring × 10 = 60. Ditambah 8 bintang laut = 68."
            visual={
              <div>
                <div className="flex flex-wrap justify-center gap-1">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className="rounded-lg bg-sky-100 px-1.5 py-1 text-[10px] font-black text-sky-900">
                      🕸️10
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-center text-xl">⭐⭐⭐⭐⭐⭐⭐⭐</p>
              </div>
            }
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab 7.2: Nilai Tempat Puluhan dan Satuan sampai 100"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Setiap angka pada bilangan dua angka punya rumah nilai tempatnya sendiri: angka di depan menempati Puluhan, dan angka di belakang menempati Satuan.",
            "Khusus saat mencapai 10 puluhan, kita mengenal bilangan 100 (seratus)!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab7-tempat.jpg"
            alt="Peti 82 terbelah jadi 8 puluhan sama dengan 80 dan 2 satuan sama dengan 2. Sepuluh batang puluhan menjadi 100."
          />
          <AdeganLaut>
            <p className="text-sm font-semibold">
              Penyu Toti membawa dua papan karang: Karang Puluhan berisi 9 ikat rumput laut, Karang Satuan berisi 6 rumput laut lepas.
            </p>
          </AdeganLaut>
          <PapanNilai puluhan={9} satuan={6} />
          <Dialog nama="Arka" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Penyu Toti, di Karang Puluhan ada 9 ikat rumput laut, dan di Karang Satuan ada 6 lembar!”
          </Dialog>
          <Dialog nama="Penyu Toti" warna="border-emerald-200 bg-emerald-50">
            “Berarti bilangannya adalah 96! Angka 9 menempati Puluhan yang nilainya 90, dan angka 6 menempati Satuan.”
          </Dialog>
          <Dialog nama="Penyelam IGIL" warna="border-sky-300 bg-sky-50">
            “Dan kalau kita punya 10 ikat puluhan penuh tanpa sisa satuan, jumlahnya pas menjadi 100 (seratus)!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            pertanyaanSuara="Pada bilangan 79, angka 7 menempati nilai tempat apa: Puluhan atau Satuan? Jawab dengan suaramu!"
            aliasSuara={["puluhan"]}
            petunjukSuara="Ucapkan puluhan."
          />
          <KuisTulisKartu
            id={idKuis("A", 3)}
            hanyaKanvas
            pertanyaan="Tuliskan angka yang tepat untuk mengisi kotak Puluhan dan kotak Satuan dari bilangan 84!"
            alias={kumpulkanAlias(["8 4", "84", "8 dan 4"])}
            konteks="84: 8 puluhan dan 4 satuan."
            visual={
              <div>
                <p className="text-center text-4xl font-black text-[#1C01A5]">84</p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-center text-sm font-black text-[#1C01A5]">
                  <p className="rounded-xl border-2 border-dashed border-[#1C01A5] py-3">? Puluhan</p>
                  <p className="rounded-xl border-2 border-dashed border-[#1C01A5] py-3">? Satuan</p>
                </div>
              </div>
            }
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab 7.3: Membandingkan Bilangan dan Membilang Lompat sampai 100"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Untuk membandingkan dua bilangan antara 51 sampai 100, bandingkan angka Puluhannya dulu! Jika puluhannya sama, baru kita bandingkan angka Satuannya.",
            "Kita juga bisa menghitung cepat dengan membilang lompat 2, 5, atau 10!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab7-lompat.jpg"
            alt="Lumba-lumba melompati gelembung 60, 70, 80, 90, 100 dan tanda 75 lebih dari 69."
          />
          <AdeganLaut>
            <p className="text-sm font-semibold">
              Dua kapal selam kecil. Kapal Merah mengumpulkan 81 koin emas. Kapal Biru mengumpulkan 79 koin emas.
            </p>
          </AdeganLaut>
          <div className="grid grid-cols-2 gap-2 text-center text-sm font-black text-white">
            <p className="rounded-xl bg-rose-500 px-2 py-3">🔴 Kapal Merah 81</p>
            <p className="rounded-xl bg-sky-600 px-2 py-3">🔵 Kapal Biru 79</p>
          </div>
          <Dialog nama="Nala" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Arka, lihat angka belakangnya! Di Kapal Biru angka satuannya 9, di Kapal Merah cuma 1. Apakah 79 lebih banyak dari 81?”
          </Dialog>
          <Dialog nama="Penyelam IGIL" warna="border-sky-300 bg-sky-50">
            “Eits, jangan terkecoh angka belakang! Lihat Puluhannya dulu: Kapal Merah punya 8 puluhan (80), sedangkan Kapal Biru baru 7 puluhan (70). Jadi 81 lebih dari 79!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 4)}
            pertanyaanSuara="Manakah yang jumlahnya lebih banyak: 68 atau 86? Sebutkan angkanya ke mikrofon!"
            aliasSuara={["delapan puluh enam", "86"]}
            petunjukSuara="Ucapkan delapan puluh enam."
          />
          <KuisTulisKartu
            id={idKuis("A", 5)}
            hanyaKanvas
            pertanyaan="Lengkapi gelembung angka yang kosong dengan menuliskan bilangannya di kanvas!"
            alias={kumpulkanAlias(["80"])}
            konteks="Lompat 10: 50, 60, 70, 80, 90, 100."
            visual={<p className="text-center text-lg font-black text-[#1C01A5]">50 – 60 – 70 – [ ? ] – 90 – 100</p>}
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan palung</p>
        <div className="space-y-3">
          <KuisPilih
            id={idKuis("A", 6)}
            soal="Ketuk peti yang jumlahnya 65!"
            benar="B"
            umpanBenar="Benar! Peti B: 6 puluhan + 5 satuan = 65."
            pesanSalah="6 puluhan = 60. Ditambah 5 satuan = 65."
            anak={
              <div className="grid grid-cols-3 gap-2">
                <PetiHarta puluhan={5} satuan={6} label="A" />
                <PetiHarta puluhan={6} satuan={5} label="B" />
                <PetiHarta puluhan={6} satuan={6} label="C" />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Peti A" },
              { huruf: "B", teks: "Peti B" },
              { huruf: "C", teks: "Peti C" },
            ]}
          />
          <KuisCocok
            id={idKuis("A", 7)}
            soal="Tarik garis penghubung antara kuda laut dan gelembung bacaannya."
            baris={[
              { id: "lima", tampil: "🐴 59", benar: "Lima puluh sembilan" },
              { id: "sembilan", tampil: "🐴 95", benar: "Sembilan puluh lima" },
              { id: "seratus", tampil: "🐴 100", benar: "Seratus" },
            ]}
            label={["Lima puluh sembilan", "Sembilan puluh lima", "Seratus"]}
            umpanBenar="59 lima puluh sembilan. 95 sembilan puluh lima. 100 seratus."
            pesanSalah="Baca puluhan dulu, lalu satuan."
          />
          <KuisBenarSalah
            id={idKuis("A", 8)}
            soal='Penyu Toti membawa kartu: "Bilangan 72 nilainya lebih kecil dari 69 karena angka 2 lebih kecil dari 9." Benar atau Salah?'
            benar="salah"
            umpanBenar="Salah. 72 lebih besar karena 7 puluhan lebih dari 6 puluhan."
            pesanSalah="Jangan terkecoh satuan. Cek puluhan dulu."
          />
          <KuisSusun
            id={idKuis("A", 9)}
            soal="Urutkan 4 gelembung mutiara dari yang Paling Sedikit ke Paling Banyak."
            pool={[
              { kunci: "84", tampil: "84" },
              { kunci: "58", tampil: "58" },
              { kunci: "91", tampil: "91" },
              { kunci: "73", tampil: "73" },
            ]}
            benar={["58", "73", "84", "91"]}
            umpanBenar="58, lalu 73, lalu 84, lalu 91."
            pesanSalah="Mulai dari puluhan yang paling kecil."
          />
          <KuisPilih
            id={idKuis("A", 10)}
            soal="Lumba-lumba melompat setiap 5 angka: 65 → 70 → 75 → [ ? ]. Ketuk batu karang tempat mendarat berikutnya!"
            benar="B"
            umpanBenar="Benar! 75 tambah 5 sama dengan 80."
            pesanSalah="Lompat 5 dari 75."
            anak={<p className="text-center text-lg font-black text-[#1C01A5]">65 → 70 → 75 → ?</p>}
            pilihan={[
              { huruf: "A", teks: "76" },
              { huruf: "B", teks: "80" },
              { huruf: "C", teks: "85" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📊🐚🔢
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Infografis 1: Mengelompokkan Puluhan sampai 100"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Ingat rumus cepat menghitung benda sampai 100: hitung dulu berapa kelompok puluhannya, lalu tambahkan satuannya. Kalau ada 10 kelompok puluhan, itu sama dengan 100!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <AdeganLaut>
            <p className="text-sm font-black">🐚 1 Kerang Puluhan = 10 Mutiara · 10 Puluhan = 100 Seratus</p>
          </AdeganLaut>
          <p className="text-center text-sm font-black text-[#1C01A5]">🐚 × 7 + ⚪ × 4 → 70 + 4 = 74 (Tujuh puluh empat)</p>
          <BarisKerang puluhan={7} satuan={4} />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            pertanyaanSuara="Sepuluh kelompok puluhan sama dengan bilangan berapa?"
            aliasSuara={["seratus", "100"]}
            petunjukSuara="Ucapkan seratus."
          />
          <KuisTulisKartu
            id={idKuis("B", 1)}
            hanyaKanvas
            pertanyaan="Ada 9 kerang puluhan (90) dan 2 mutiara satuan (2). Tuliskan lambang bilangannya di kotak kanvas!"
            alias={kumpulkanAlias(["92"])}
            konteks="90 + 2 = 92."
            visual={<BarisKerang puluhan={9} satuan={2} />}
          />
        </div>

        <JudulSubBab
          judul="Infografis 2: Peta Nilai Tempat Dua Angka"
          kelas={kelas}
          kelamin={kelamin}
          naskah={["Jangan sampai tertukar ya! Angka di sebelah kiri adalah Puluhan, dan angka di sebelah kanan adalah Satuan."]}
        />
        <div className="mt-4 space-y-3">
          <p className="text-center text-sm font-black text-[#1C01A5]">Contoh 87</p>
          <PapanNilai puluhan={8} satuan={7} />
          <p className="text-center text-sm font-semibold text-slate-700">80 + 7 = 87. Awas: 59 berbeda dengan 95.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            pertanyaanSuara="Pada bilangan 63, berapakah nilai dari angka 6 yang menempati puluhan: enam atau enam puluh?"
            aliasSuara={["enam puluh", "60"]}
            petunjukSuara="Ucapkan enam puluh."
          />
          <KuisTulisKartu
            id={idKuis("B", 3)}
            hanyaKanvas
            pertanyaan="Lengkapi bentuk panjang ini di kanvas tulis: 78 = 70 + [ ? ]!"
            alias={kumpulkanAlias(["8", "delapan"])}
            konteks="78 = 70 + 8."
            visual={<p className="text-center text-lg font-black text-[#1C01A5]">78 = 70 + ?</p>}
          />
        </div>

        <JudulSubBab
          judul="Infografis 3: Jurus Membandingkan dan Hitung Lompat"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Saat membandingkan dua bilangan, selalu ikuti 2 langkah: pertama cek Puluhannya, kedua jika puluhannya sama barulah cek Satuannya!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <p className="text-sm font-black text-[#1C01A5]">🥇 Langkah 1: 91 vs 89 → 9 puluhan &gt; 8 puluhan, jadi 91 lebih dari 89.</p>
          <p className="text-sm font-black text-[#1C01A5]">🥈 Langkah 2: 74 vs 78 → puluhan sama 7, satuan 4 &lt; 8, jadi 74 kurang dari 78.</p>
          <p className="text-sm font-semibold text-slate-700">🐸 Lompat 2: 62, 64, 66, 68, 70. Lompat 5: 75, 80, 85, 90, 95.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 4)}
            pertanyaanSuara="Antara 74 dan 78, bilangan manakah yang kurang dari yang lain?"
            aliasSuara={["tujuh puluh empat", "74"]}
            petunjukSuara="Ucapkan tujuh puluh empat."
          />
          <KuisTulisKartu
            id={idKuis("B", 5)}
            hanyaKanvas
            pertanyaan="Lengkapi hitung lompat 2 ini di kanvas: 82, 84, [ ? ], 88!"
            alias={kumpulkanAlias(["86"])}
            konteks="82, 84, 86, 88. Lompat 2."
            visual={<p className="text-center text-lg font-black text-[#1C01A5]">82, 84, ?, 88</p>}
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan infografis</p>
        <div className="space-y-3">
          <KuisCocok
            id={idKuis("B", 6)}
            soal="Potongan Papan Seratus di sekitar 75. Tarik 65 ke kotak atas (kurang 10) dan 85 ke kotak bawah (tambah 10)!"
            baris={[
              { id: "atas", tampil: "Kotak atas 75 (kurang 10)", benar: "65" },
              { id: "bawah", tampil: "Kotak bawah 75 (tambah 10)", benar: "85" },
            ]}
            label={["65", "85"]}
            umpanBenar="Atas 65, bawah 85."
            pesanSalah="Naik kurang 10. Turun tambah 10."
          />
          <KuisPilih
            id={idKuis("B", 7)}
            soal="Pilih tanda kata yang tepat: 83 [ ... ] 88"
            benar="B"
            umpanBenar="Benar! 83 kurang dari 88."
            pesanSalah="Puluhan sama. Satuan 3 lebih kecil dari 8."
            anak={<p className="text-center text-2xl font-black text-[#1C01A5]">83 ⚖️ 88</p>}
            pilihan={[
              { huruf: "A", teks: "Lebih dari" },
              { huruf: "B", teks: "Kurang dari" },
              { huruf: "C", teks: "Sama dengan" },
            ]}
          />
          <KuisPilih
            id={idKuis("B", 8)}
            soal="Dari deret hitung lompat 5: 55 - 60 - 65 - 68 - 75, ketuk 1 angka yang SALAH!"
            benar="B"
            umpanBenar="Benar! 68 bukan lompat 5. Seharusnya 70."
            pesanSalah="Lompat 5: 55, 60, 65, 70, 75."
            pilihan={[
              { huruf: "A", teks: "65" },
              { huruf: "B", teks: "68" },
              { huruf: "C", teks: "75" },
            ]}
          />
          <KuisSortirPuluhan />
          <KuisPilih
            id={idKuis("B", 10)}
            soal="Satu lingkaran kecil berisi 10 ikan. Kerumunan ikan kira-kira 6 kali lipat lingkaran itu. Pilih taksiran yang paling mendekati!"
            benar="B"
            umpanBenar="Benar! 6 kali 10 = 60 ikan."
            pesanSalah="6 kelompok puluhan = 60."
            anak={<p className="text-center text-3xl">🐟 × 6</p>}
            pilihan={[
              { huruf: "A", teks: "20 ikan" },
              { huruf: "B", teks: "60 ikan" },
              { huruf: "C", teks: "100 ikan" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚢⭐🏅
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Sepuluh gerbang · sonar palung</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiKapalSelam />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Menghitung benda sampai 100 lebih mudah dengan mengelompokkannya sepuluh-sepuluh. 10 puluhan = 100 / seratus.",
          "Pada bilangan dua angka seperti 85, angka depan adalah Puluhan (8 puluhan = 80) dan angka belakang adalah Satuan (5 satuan = 5).",
          "Bandingkan angka Puluhannya terlebih dahulu sebelum melihat Satuannya, dan gunakan hitung lompat 2, 5, atau 10 untuk membilang berurutan dengan cepat.",
        ]}
        penutup='Kalimat kunci: “Sepuluh-sepuluh. Depan puluhan. Cek puluhan dulu.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Tantangan Para Juara · Membilang sampai 100</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)} />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB7.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Sepuluh-sepuluh. Depan puluhan."
          alias={kumpulkanAlias(["sepuluh", "puluhan"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
