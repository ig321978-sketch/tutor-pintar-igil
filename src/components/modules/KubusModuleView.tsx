"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import dataMentah from "@/data/modules/kurikulum-merdeka-bab3-kubus.json";
import { idLatihanMtk6Bab3 } from "@/lib/kuis-materi";
import { useEffect, useState } from "react";

const KUNCI_JEJAK = "igil-modul-mat-6-bab3";

type SoalFormatif = {
  id: string;
  bagian: string;
  soal: string;
  opsi: string[];
  kunciJawaban: string;
  pembahasan: string;
};
type CabangPeta = { judul: string; anak: string[] };
type BentukDua = "berdampingan" | "bertumpuk";
type BentukTiga = "lurus" | "siku" | "bertingkat" | "menara";
type Arah = "depan" | "kanan" | "atas";
type KubusWarna = { x: number; y: number; z: number; nama: string; warna: string };

type ModulKubus = {
  id: string;
  jenjang: string;
  kelas: number;
  fase: string;
  mataPelajaran: string;
  bab: number;
  judul: string;
  sumber: string;
  capaianPembelajaran: string;
  pembuka: string[];
  tujuanPembelajaran: string[];
  pertanyaanPemantik: string[];
  kataKunci: string[];
  petaKonsep: CabangPeta[];
  fokusPeta: string[];
  bangun: { nomor: number; nama: string }[];
  kontainer: string;
  gudang: { kardus: number; rusuk: number[]; lantaiCm: number; tinggiCm: number };
  refleksi: string[];
  anike: KubusWarna[];
  soalLima: { depan: string[][]; kanan: string[][]; atas: string[][] };
  refleksiSpasial: string[];
  refleksiLokasi: string[];
  latihanFormatif: SoalFormatif[];
};

type JejakKubus = {
  jawaban: Record<string, string>;
  bentukDua: BentukDua;
  bentukTiga: BentukTiga;
  batang: boolean[];
  sisiTegak: number;
  arahAnike: Arah;
  simulasiDicoba: boolean;
  awalPetak: string;
  akhirPetak: string;
};

function adalahModul(data: unknown): data is ModulKubus {
  if (!data || typeof data !== "object") return false;
  const calon = data as ModulKubus;
  return (
    calon.id === "mat-6-bab3" &&
    Array.isArray(calon.latihanFormatif) &&
    calon.latihanFormatif.length > 0 &&
    (calon.bangun?.length ?? 0) === 8 &&
    (calon.gudang?.rusuk?.length ?? 0) === 3 &&
    calon.gudang.kardus > 0
  );
}

const modul = adalahModul(dataMentah) ? dataMentah : null;
const BATANG = ["Belakang bawah", "Belakang atas", "Kiri", "Kanan"] as const;

function ribuan(nilai: number): string {
  return Math.round(nilai).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function koma(nilai: number): string {
  const bulat = Math.round(nilai);
  if (Math.abs(nilai - bulat) < 1e-6) return String(bulat);
  return nilai.toFixed(1).replace(".", ",");
}

function kalimatFokus(daftar: string[]): string {
  if (daftar.length <= 1) return daftar[0] ?? "";
  if (daftar.length === 2) return `${daftar[0]} serta ${daftar[1]}`;
  return `${daftar.slice(0, -1).join(", ")}, serta ${daftar[daftar.length - 1]}`;
}

const HURUF_PETAK = ["A", "B", "C", "D", "E", "F", "G"];

function pecahPetak(kode: string): { huruf: string; angka: number } | null {
  if (!/^[A-G][0-9]$/.test(kode)) return null;
  return { huruf: kode[0] ?? "", angka: Number(kode.slice(1)) };
}

function PetakDiam({
  huruf,
  angka,
  tanda,
}: {
  huruf: string[];
  angka: number[];
  tanda: { huruf: string; angka: number; isi: string; warna: string }[];
}) {
  return (
    <div className="inline-grid gap-1" style={{ gridTemplateColumns: `auto repeat(${huruf.length}, 2.5rem)` }}>
      <span />
      {huruf.map((nama) => (
        <span key={nama} className="text-center text-xs font-black text-[#1C01A5]">{nama}</span>
      ))}
      {angka.map((bilangan) => (
        <span key={bilangan} className="contents">
          <span className="flex items-center pr-1 text-xs font-black text-[#1C01A5]">{bilangan}</span>
          {huruf.map((nama) => {
            const isi = tanda.find((titik) => titik.huruf === nama && titik.angka === bilangan);
            return (
              <span key={`${nama}${bilangan}`} className="flex h-10 w-10 items-center justify-center rounded-md border border-[#1C01A5]/20 bg-white text-sm font-black" style={{ color: isi?.warna }}>
                {isi?.isi ?? ""}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

function bacaJejak(): JejakKubus | null {
  if (typeof window === "undefined") return null;
  try {
    const mentah = window.localStorage.getItem(KUNCI_JEJAK);
    if (!mentah) return null;
    const data = JSON.parse(mentah) as Partial<JejakKubus>;
    const bentukDua = data.bentukDua === "bertumpuk" ? "bertumpuk" : "berdampingan";
    const bentukTiga = data.bentukTiga === "siku" || data.bentukTiga === "bertingkat" || data.bentukTiga === "menara" ? data.bentukTiga : "lurus";
    const batang = Array.isArray(data.batang) ? BATANG.map((_, indeks) => Boolean(data.batang?.[indeks])) : BATANG.map(() => false);
    const sisi = data.sisiTegak === 20 || data.sisiTegak === 30 || data.sisiTegak === 50 ? data.sisiTegak : 50;
    const arahAnike = data.arahAnike === "kanan" || data.arahAnike === "atas" ? data.arahAnike : "depan";
    return {
      jawaban: data.jawaban && typeof data.jawaban === "object" ? data.jawaban : {},
      bentukDua,
      bentukTiga,
      batang,
      sisiTegak: sisi,
      arahAnike,
      simulasiDicoba: Boolean(data.simulasiDicoba),
      awalPetak: typeof data.awalPetak === "string" ? data.awalPetak : "",
      akhirPetak: typeof data.akhirPetak === "string" ? data.akhirPetak : "",
    };
  } catch {
    return null;
  }
}

function Kotak({ warna = "#F0AB00" }: { warna?: string }) {
  return <span className="inline-block h-9 w-9 rounded-sm border-2 border-[#1C01A5]" style={{ background: warna }} />;
}

function Kolom({ tinggi, warna, warnaTiap }: { tinggi: number; warna?: string; warnaTiap?: string[] }) {
  return (
    <span className="flex flex-col-reverse gap-1">
      {Array.from({ length: tinggi }, (_, indeks) => (
        <Kotak key={indeks} warna={warnaTiap?.[indeks] ?? warna} />
      ))}
    </span>
  );
}

function gridTampak(kubus: KubusWarna[], arah: Arah): string[][] {
  const maxX = Math.max(...kubus.map((kotak) => kotak.x));
  const maxY = Math.max(...kubus.map((kotak) => kotak.y));
  const maxZ = Math.max(...kubus.map((kotak) => kotak.z));
  if (arah === "atas") {
    return Array.from({ length: maxY + 1 }, (_, urut) => {
      const y = maxY - urut;
      return Array.from({ length: maxX + 1 }, (_, x) => {
        const tertinggi = kubus.filter((kotak) => kotak.x === x && kotak.y === y).sort((a, b) => b.z - a.z)[0];
        return tertinggi?.nama ?? "";
      });
    });
  }
  if (arah === "kanan") {
    return Array.from({ length: maxZ + 1 }, (_, urut) => {
      const z = maxZ - urut;
      return Array.from({ length: maxY + 1 }, (_, urutY) => {
        const y = urutY;
        const terkanan = kubus.filter((kotak) => kotak.y === y && kotak.z === z).sort((a, b) => b.x - a.x)[0];
        return terkanan?.nama ?? "";
      });
    });
  }
  return Array.from({ length: maxZ + 1 }, (_, urut) => {
    const z = maxZ - urut;
    return Array.from({ length: maxX + 1 }, (_, x) => {
      const terdepan = kubus.filter((kotak) => kotak.x === x && kotak.z === z).sort((a, b) => a.y - b.y)[0];
      return terdepan?.nama ?? "";
    });
  });
}

function PapanTampak({ baris, warnaNama }: { baris: string[][]; warnaNama: Record<string, string> }) {
  return (
    <div className="inline-flex flex-col gap-1">
      {baris.map((barisIni, indeksBaris) => (
        <div key={indeksBaris} className="flex gap-1">
          {barisIni.map((nama, indeks) => (
            <span
              key={indeks}
              className="h-9 w-9 rounded-sm border-2 border-[#1C01A5]"
              style={{ background: nama ? warnaNama[nama] ?? "#E2E8F0" : "#FFFFFF" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function MataDadu({ mata, kosong = false }: { mata: number; kosong?: boolean }) {
  const posisi: Record<number, string[]> = {
    1: ["col-start-2 row-start-2"],
    2: ["col-start-1 row-start-1", "col-start-3 row-start-3"],
    3: ["col-start-1 row-start-1", "col-start-2 row-start-2", "col-start-3 row-start-3"],
    4: ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-1 row-start-3", "col-start-3 row-start-3"],
    5: ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-2 row-start-2", "col-start-1 row-start-3", "col-start-3 row-start-3"],
    6: ["col-start-1 row-start-1", "col-start-3 row-start-1", "col-start-1 row-start-2", "col-start-3 row-start-2", "col-start-1 row-start-3", "col-start-3 row-start-3"],
  };
  return (
    <span className={`grid h-16 w-16 grid-cols-3 grid-rows-3 rounded-xl border-2 border-[#1C01A5] p-1 ${kosong ? "bg-slate-100" : "bg-white"}`} aria-label={kosong ? "sisi kosong" : `${mata} mata`}>
      {kosong ? null : posisi[mata]?.map((kelas) => <span key={kelas} className={`h-3 w-3 self-center justify-self-center rounded-full bg-[#1C01A5] ${kelas}`} />)}
    </span>
  );
}

function Susunan({ kolom, warna }: { kolom: number[]; warna?: string }) {
  return (
    <div className="flex items-end gap-1" aria-hidden="true">
      {kolom.map((tinggi, indeks) => (
        <Kolom key={indeks} tinggi={tinggi} warna={warna} />
      ))}
    </div>
  );
}

function BangunNomor({ nomor }: { nomor: number }) {
  const umum = "h-16 w-16";
  if (nomor === 1) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 1">
        <ellipse cx="32" cy="14" rx="16" ry="6" fill="#5EEAD4" stroke="#1C01A5" strokeWidth="2" />
        <path d="M16 14 v32 a16 6 0 0 0 32 0 v-32" fill="#99F6E4" stroke="#1C01A5" strokeWidth="2" />
        <ellipse cx="32" cy="46" rx="16" ry="6" fill="none" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (nomor === 2) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 2">
        <polygon points="32,8 14,48 50,48" fill="#FDE68A" stroke="#1C01A5" strokeWidth="2" />
        <ellipse cx="32" cy="48" rx="18" ry="6" fill="#FCD34D" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (nomor === 3) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 3">
        <polygon points="18,24 32,16 46,24 32,32" fill="#BFDBFE" stroke="#1C01A5" strokeWidth="2" />
        <polygon points="18,24 32,32 32,50 18,42" fill="#93C5FD" stroke="#1C01A5" strokeWidth="2" />
        <polygon points="46,24 32,32 32,50 46,42" fill="#60A5FA" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (nomor === 4) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 4">
        <polygon points="8,28 32,18 56,28 32,38" fill="#DDD6FE" stroke="#1C01A5" strokeWidth="2" />
        <polygon points="8,28 32,38 32,52 8,42" fill="#C4B5FD" stroke="#1C01A5" strokeWidth="2" />
        <polygon points="56,28 32,38 32,52 56,42" fill="#A78BFA" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (nomor === 5) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 5">
        <polygon points="14,46 32,14 50,46" fill="#FECACA" stroke="#1C01A5" strokeWidth="2" />
        <polygon points="50,46 32,14 58,28 58,46" fill="#FCA5A5" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (nomor === 6) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 6">
        <circle cx="32" cy="32" r="18" fill="#86EFAC" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (nomor === 7) {
    return (
      <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 7">
        <polygon points="32,10 16,50 48,50" fill="#BBF7D0" stroke="#1C01A5" strokeWidth="2" />
        <polygon points="32,10 48,50 54,40" fill="#86EFAC" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className={umum} role="img" aria-label="Bangun 8">
      <polygon points="32,12 48,22 44,40 20,40 16,22" fill="#FDBA74" stroke="#1C01A5" strokeWidth="2" />
      <polygon points="48,22 58,30 54,46 44,40" fill="#FB923C" stroke="#1C01A5" strokeWidth="2" />
    </svg>
  );
}

function KartuSoal({
  nomor,
  soal,
  pilihan,
  onPilih,
}: {
  nomor: number;
  soal: SoalFormatif;
  pilihan: string | undefined;
  onPilih: (opsi: string) => void;
}) {
  const sudah = pilihan !== undefined;
  const benar = pilihan === soal.kunciJawaban;
  return (
    <fieldset className="space-y-3 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
      <legend className="px-1 text-sm font-black text-[#1C01A5]">Soal {nomor}</legend>
      <p className="text-base font-semibold leading-8 text-slate-800">{soal.soal}</p>
      <div className="grid gap-2">
        {soal.opsi.map((opsi) => {
          const aktif = pilihan === opsi;
          const warna = !aktif
            ? "border-slate-200 bg-white text-slate-800"
            : opsi === soal.kunciJawaban
              ? "border-emerald-600 bg-emerald-50 text-emerald-900"
              : "border-rose-600 bg-rose-50 text-rose-900";
          return (
            <button
              key={opsi}
              type="button"
              aria-pressed={aktif}
              onClick={() => onPilih(opsi)}
              className={`rounded-2xl border-2 px-4 py-3 text-left text-base font-bold ${warna}`}
            >
              {opsi}
            </button>
          );
        })}
      </div>
      {sudah ? (
        <div
          aria-live="polite"
          className={`rounded-2xl px-4 py-3 text-sm font-semibold leading-7 ${benar ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-900"}`}
        >
          <p className="font-black">{benar ? "Benar." : "Belum tepat."}</p>
          <p>{soal.pembahasan}</p>
        </div>
      ) : null}
    </fieldset>
  );
}

function kolomBentuk(bentuk: BentukDua | BentukTiga): number[] {
  if (bentuk === "berdampingan" || bentuk === "lurus") return bentuk === "lurus" ? [1, 1, 1] : [1, 1];
  if (bentuk === "bertumpuk") return [2];
  if (bentuk === "siku") return [1, 1, 1];
  if (bentuk === "bertingkat") return [2, 1];
  return [3];
}

export default function KubusModuleView() {
  const kuis = useKuisMateri();
  const [siap, setSiap] = useState(false);
  const [jawaban, setJawaban] = useState<Record<string, string>>({});
  const [bentukDua, setBentukDua] = useState<BentukDua>("berdampingan");
  const [bentukTiga, setBentukTiga] = useState<BentukTiga>("lurus");
  const [batang, setBatang] = useState<boolean[]>(BATANG.map(() => false));
  const [sisiTegak, setSisiTegak] = useState(50);
  const [arahAnike, setArahAnike] = useState<Arah>("depan");
  const [simulasiDicoba, setSimulasiDicoba] = useState(false);
  const [awalPetak, setAwalPetak] = useState("");
  const [akhirPetak, setAkhirPetak] = useState("");

  useEffect(() => {
    const jejak = bacaJejak();
    if (jejak) {
      setJawaban(jejak.jawaban);
      setBentukDua(jejak.bentukDua);
      setBentukTiga(jejak.bentukTiga);
      setBatang(jejak.batang);
      setSisiTegak(jejak.sisiTegak);
      setArahAnike(jejak.arahAnike);
      setSimulasiDicoba(jejak.simulasiDicoba);
      setAwalPetak(jejak.awalPetak);
      setAkhirPetak(jejak.akhirPetak);
    }
    setSiap(true);
  }, []);

  const jumlahBenar = modul ? modul.latihanFormatif.filter((soal) => jawaban[soal.id] === soal.kunciJawaban).length : 0;
  const tuntas = modul ? jumlahBenar === modul.latihanFormatif.length : false;

  useEffect(() => {
    if (!siap || !modul) return;
    const jejak: JejakKubus = { jawaban, bentukDua, bentukTiga, batang, sisiTegak, arahAnike, simulasiDicoba, awalPetak, akhirPetak };
    try {
      window.localStorage.setItem(KUNCI_JEJAK, JSON.stringify({ ...jejak, tuntas }));
    } catch {
      return;
    }
  }, [siap, jawaban, bentukDua, bentukTiga, batang, sisiTegak, arahAnike, simulasiDicoba, awalPetak, akhirPetak, tuntas]);

  const tandai = kuis?.tandaiBenar;
  useEffect(() => {
    if (!siap || !tandai || !modul) return;
    for (const soal of modul.latihanFormatif) {
      if (jawaban[soal.id] === soal.kunciJawaban) tandai(idLatihanMtk6Bab3(soal.id));
    }
  }, [siap, tandai, jawaban]);

  if (!modul) {
    return <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800">Data modul kubus belum lengkap.</p>;
  }

  const pilih = (soal: SoalFormatif, opsi: string) => {
    setJawaban((lama) => ({ ...lama, [soal.id]: opsi }));
    if (opsi === soal.kunciJawaban) kuis?.tandaiBenar(idLatihanMtk6Bab3(soal.id));
  };
  const soalBagian = (bagian: string) => modul.latihanFormatif.filter((soal) => soal.bagian === bagian);
  let nomor = 0;
  const kartu = (daftar: SoalFormatif[]) =>
    daftar.map((soal) => {
      nomor += 1;
      return <KartuSoal key={soal.id} nomor={nomor} soal={soal} pilihan={jawaban[soal.id]} onPilih={(opsi) => pilih(soal, opsi)} />;
    });

  const volumeSatu = modul.gudang.rusuk.reduce((hasil, rusuk) => hasil * rusuk, 1);
  const volumeSemua = volumeSatu * modul.gudang.kardus;
  const lapis = Math.floor(modul.gudang.tinggiCm / sisiTegak);
  const tinggiPakai = lapis * sisiTegak;
  const luasCm = volumeSemua / tinggiPakai;
  const luasM = luasCm / 10000;
  const kardusPasang = batang.filter(Boolean).length * 2;
  const lantaiTiga = bentukTiga === "menara" ? 3 : bentukTiga === "bertingkat" ? 2 : 1;
  const titikAwal = pecahPetak(awalPetak);
  const titikAkhir = pecahPetak(akhirPetak);
  const langkahMendatar = titikAwal && titikAkhir ? Math.abs(HURUF_PETAK.indexOf(titikAkhir.huruf) - HURUF_PETAK.indexOf(titikAwal.huruf)) : null;
  const langkahTegak = titikAwal && titikAkhir ? Math.abs(titikAkhir.angka - titikAwal.angka) : null;
  const pilihPetak = (kode: string) => {
    setSimulasiDicoba(true);
    if (!awalPetak || akhirPetak) {
      setAwalPetak(kode);
      setAkhirPetak("");
      return;
    }
    if (kode === awalPetak) return;
    setAkhirPetak(kode);
  };

  return (
    <article className="space-y-6">
      <header className="space-y-3 rounded-3xl bg-[#1C01A5] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F0AB00]">
          {modul.mataPelajaran} · Kelas {modul.kelas} {modul.jenjang} · Fase {modul.fase} · Bab {modul.bab}
        </p>
        <h2 className="text-3xl font-black">{modul.judul}</h2>
        <p className="text-sm font-semibold text-white/80">{modul.sumber}</p>
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-[#F0AB00]">Capaian pembelajaran</p>
          <p className="mt-1 text-base font-semibold leading-8">{modul.capaianPembelajaran}</p>
        </div>
      </header>

      <section className="space-y-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Pembuka bab</p>
        {modul.pembuka.map((kalimat) => (
          <p key={kalimat} className="text-base font-semibold leading-8 text-slate-900">{kalimat}</p>
        ))}
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Tujuan pembelajaran</h3>
        <ul className="list-disc space-y-1 pl-5 text-base font-semibold leading-8 text-slate-800">
          {modul.tujuanPembelajaran.map((tujuan) => <li key={tujuan}>{tujuan}</li>)}
        </ul>
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Pertanyaan pemantik</h3>
        <ul className="list-disc space-y-1 pl-5 text-base font-semibold leading-8 text-slate-800">
          {modul.pertanyaanPemantik.map((pertanyaan) => <li key={pertanyaan}>{pertanyaan}</li>)}
        </ul>
      </section>

      <section className="space-y-2 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Kata kunci</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.kataKunci.join(", ")}.</p>
      </section>

      <section className="space-y-3 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-5">
        <h3 className="text-lg font-black text-[#1C01A5]">Peta konsep</h3>
        <p className="mx-auto w-fit rounded-full bg-[#1C01A5] px-4 py-1 text-sm font-black text-white">Kubus dan Balok</p>
        <div className="grid gap-3 md:grid-cols-3">
          {modul.petaKonsep.map((cabang) => (
            <div key={cabang.judul} className={`space-y-2 rounded-2xl p-3 ${modul.fokusPeta.includes(cabang.judul) ? "bg-[#F0AB00]/30" : "bg-[#EEF2FF]"}`}>
              <p className="text-sm font-black text-[#1C01A5]">{cabang.judul}</p>
              {cabang.anak.map((anak) => <p key={anak} className="text-sm font-semibold text-slate-800">{anak}</p>)}
            </div>
          ))}
        </div>
        <p className="text-sm font-bold text-[#1C01A5]">Bagian yang dikerjakan sekarang: {kalimatFokus(modul.fokusPeta)}.</p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Ayo Mengingat Kembali</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">Di kelas sebelumnya kamu belajar bangun ruang. Sebutkan nama bangun 1 sampai 8.</p>
        <div className="grid grid-cols-4 gap-3">
          {modul.bangun.map((bangun) => (
            <div key={bangun.nomor} className="flex flex-col items-center rounded-2xl bg-[#F8F7FF] p-2">
              <BangunNomor nomor={bangun.nomor} />
              <p className="text-sm font-black text-[#1C01A5]">{bangun.nomor}</p>
            </div>
          ))}
        </div>
        {kartu(soalBagian("Ayo Mengingat Kembali"))}
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-black text-[#1C01A5]">A. Mengonstruksi dan Mengurai</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">{modul.kontainer}</p>
        <p className="text-sm font-black text-[#1C01A5]">Eksplorasi 3.1 Mengonstruksi dan Mengurai Gabungan Kubus</p>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Kubus yang sama ukurannya mewakili kontainer. Dua kubus dapat berdampingan atau bertumpuk. Bentuknya tetap satu.
        </p>
        <div className="space-y-4 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
          <h3 className="text-xl font-black text-[#1C01A5]">Dua Kubus</h3>
          <div className="flex flex-wrap gap-2">
            {(["berdampingan", "bertumpuk"] as BentukDua[]).map((bentuk) => (
              <button
                key={bentuk}
                type="button"
                aria-pressed={bentukDua === bentuk}
                onClick={() => {
                  setBentukDua(bentuk);
                  setSimulasiDicoba(true);
                }}
                className={`rounded-full px-4 py-2 text-sm font-black ${bentukDua === bentuk ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
              >
                {bentuk}
              </button>
            ))}
          </div>
          <Susunan kolom={kolomBentuk(bentukDua)} />
          <p className="text-lg font-black text-[#1C01A5]">2 kubus · 1 bentuk</p>
        </div>
        {kartu(soalBagian("Eksplorasi 3.1").slice(0, 1))}
        <div className="space-y-4 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
          <h3 className="text-xl font-black text-[#1C01A5]">Tiga Kubus</h3>
          <div className="flex flex-wrap gap-2">
            {(["lurus", "siku", "bertingkat", "menara"] as BentukTiga[]).map((bentuk) => (
              <button
                key={bentuk}
                type="button"
                aria-pressed={bentukTiga === bentuk}
                onClick={() => {
                  setBentukTiga(bentuk);
                  setSimulasiDicoba(true);
                }}
                className={`rounded-full px-4 py-2 text-sm font-black ${bentukTiga === bentuk ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
              >
                {bentuk}
              </button>
            ))}
          </div>
          {bentukTiga === "siku" ? (
            <div className="flex items-end gap-1" aria-hidden="true">
              <Kolom tinggi={1} />
              <span className="flex flex-col gap-1">
                <Kotak />
                <Kotak />
              </span>
            </div>
          ) : (
            <Susunan kolom={kolomBentuk(bentukTiga)} />
          )}
          <p className="text-lg font-black text-[#1C01A5]">3 kubus · {lantaiTiga} lantai</p>
        </div>
        {kartu(soalBagian("Eksplorasi 3.1").slice(1, 4))}
        <p className="text-base font-semibold leading-8 text-slate-800">
          Dua balok untuk bangunan satu tingkat dapat ditempel memanjang atau berdampingan. Sisi balok tidak semua sama, jadi kedua tempelan itu berbeda.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-black text-[#1C01A5]">(a) berdampingan</p>
            <Susunan kolom={[1, 1]} warna="#FB923C" />
          </div>
          <div className="space-y-2 rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-black text-[#1C01A5]">(b) memanjang</p>
            <Susunan kolom={[1, 1, 1, 1]} warna="#FDBA74" />
          </div>
        </div>
        {kartu(soalBagian("Eksplorasi 3.1").slice(4))}
        <p className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-base font-semibold leading-8 text-slate-800">
          Bangun ruang dapat digabung dan diurai. Tembok, misalnya, tersusun dari banyak batu bata.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h3 className="text-xl font-black text-[#1C01A5]">Latihan 3.1</h3>
          <p className="text-sm font-black text-[#1C01A5]">{jumlahBenar}/{modul.latihanFormatif.length} benar</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-black text-[#1C01A5]">(a)</p>
            <Susunan kolom={[3]} warna="#FB923C" />
          </div>
          <div className="space-y-2 rounded-2xl bg-orange-50 p-4">
            <p className="text-sm font-black text-[#1C01A5]">(b)</p>
            <Susunan kolom={[1, 2]} warna="#FDBA74" />
          </div>
        </div>
        {kartu(soalBagian("Latihan 3.1").slice(0, 2))}
        <p className="text-base font-semibold leading-8 text-slate-800">
          Contoh kardus satuan punya rusuk 1, 1, dan 1. Tumpukan berikutnya memakai batang 1 × 2. Pasang batangnya, lalu hitung kardusnya.
        </p>
        <div className="space-y-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
          <h3 className="text-xl font-black text-[#1C01A5]">Tumpukan Kardus</h3>
          <div className="flex flex-wrap gap-2">
            {BATANG.map((nama, indeks) => (
              <button
                key={nama}
                type="button"
                aria-pressed={batang[indeks]}
                onClick={() => {
                  setBatang((lama) => lama.map((nyala, urut) => (urut === indeks ? !nyala : nyala)));
                  setSimulasiDicoba(true);
                }}
                className={`rounded-full px-4 py-2 text-sm font-black ${batang[indeks] ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
              >
                {nama}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-end gap-4">
            {BATANG.map((nama, indeks) => (
              <div key={nama} className="space-y-1">
                <Susunan kolom={batang[indeks] ? [1, 1] : [0]} />
                <p className="text-xs font-bold text-slate-600">{nama}</p>
              </div>
            ))}
          </div>
          <p className="text-lg font-black text-[#1C01A5]">{kardusPasang} kardus terpasang</p>
        </div>
        {kartu(soalBagian("Latihan 3.1").slice(2, 3))}
        <div className="flex items-end gap-2 rounded-2xl bg-[#F8F7FF] p-4" aria-label="Empat kubus warna">
          <div className="flex flex-col-reverse gap-1">
            <Kotak warna="#C4B5FD" />
            <Kotak warna="#F9A8D4" />
          </div>
          <Kotak warna="#FDE047" />
          <Kotak warna="#86EFAC" />
        </div>
        {kartu(soalBagian("Latihan 3.1").slice(3, 4))}
        <p className="text-base font-semibold leading-8 text-slate-800">
          Pak Hasan punya {modul.gudang.kardus} kardus berukuran {modul.gudang.rusuk.join(" cm × ")} cm. Gudang berukuran 3 m × 3 m dan tinggi 3,1 m. Kardus boleh ditumpuk ke segala arah. Lantai yang terpakai ingin dibuat sesedikit mungkin.
        </p>
        {kartu(soalBagian("Latihan 3.1").slice(4))}
        <div className="space-y-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
          <h3 className="text-xl font-black text-[#1C01A5]">Gudang Pak Hasan</h3>
          <div className="flex flex-wrap gap-2">
            {modul.gudang.rusuk.map((sisi) => (
              <button
                key={sisi}
                type="button"
                aria-pressed={sisiTegak === sisi}
                onClick={() => {
                  setSisiTegak(sisi);
                  setSimulasiDicoba(true);
                }}
                className={`rounded-full px-4 py-2 text-sm font-black ${sisiTegak === sisi ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
              >
                {sisi} cm tegak
              </button>
            ))}
          </div>
          <p className="text-base font-semibold leading-8 text-slate-800">
            {lapis} lapis × {sisiTegak} cm = {tinggiPakai} cm. Volume {ribuan(volumeSemua)} cm³ : {tinggiPakai} cm = {ribuan(luasCm)} cm² = {koma(luasM)} m².
          </p>
        </div>
        <div className="space-y-2 rounded-3xl bg-[#F8F7FF] p-4">
          <h4 className="text-lg font-black text-[#1C01A5]">Ayo Berefleksi</h4>
          {modul.refleksi.map((kalimat) => (
            <p key={kalimat} className="text-base font-semibold leading-8 text-slate-800">{kalimat}</p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-black text-[#1C01A5]">B. Visualisasi Spasial</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Bangunan terlihat berbeda dari sisi yang berbeda. Arsitek menggambar tampak dari beberapa arah agar orang lain dapat membangun rancangannya. Lawang Sewu di Semarang, misalnya, tidak terlihat sama dari setiap sisi.
        </p>
        {kartu(soalBagian("B. Permasalahan"))}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Eksplorasi 3.2 Melihat dari Berbagai Sisi</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Anike menggambar satu susunan kubus dari depan, dari kanan, dan dari atas. Tigor dan Tenri ingat Fort Rotterdam: gambar mereka berbeda karena sisinya berbeda.
        </p>
        <div className="flex items-end gap-1" aria-label="Susunan kubus Anike">
          <Kolom tinggi={1} warna="#60A5FA" />
          <Kolom tinggi={2} warnaTiap={["#F87171", "#4ADE80"]} />
          <Kolom tinggi={1} warna="#FACC15" />
        </div>
        <div className="space-y-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
          <h3 className="text-xl font-black text-[#1C01A5]">Tampak Anike</h3>
          <div className="flex flex-wrap gap-2">
            {(["depan", "kanan", "atas"] as Arah[]).map((arah) => (
              <button
                key={arah}
                type="button"
                aria-pressed={arahAnike === arah}
                onClick={() => {
                  setArahAnike(arah);
                  setSimulasiDicoba(true);
                }}
                className={`rounded-full px-4 py-2 text-sm font-black ${arahAnike === arah ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
              >
                {arah}
              </button>
            ))}
          </div>
          <PapanTampak
            baris={gridTampak(modul.anike, arahAnike)}
            warnaNama={Object.fromEntries(modul.anike.map((kotak) => [kotak.nama, kotak.warna]))}
          />
          <p className="text-sm font-bold text-slate-600">Tampak {arahAnike} dihitung dari susunan kubus di atas.</p>
        </div>
        {kartu(soalBagian("Eksplorasi 3.2").slice(0, 3))}
        <div className="flex items-end gap-1" aria-label="Dua kubus hijau dan dua kubus merah">
          <Kolom tinggi={2} warna="#4ADE80" />
          <Kolom tinggi={1} warna="#F87171" />
          <Kolom tinggi={1} warna="#F87171" />
        </div>
        {kartu(soalBagian("Eksplorasi 3.2").slice(3))}
        <p className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-base font-semibold leading-8 text-slate-800">
          Orang bisa berdebat karena melihat sisi yang berbeda dari hal yang sama. Melihat tampak yang lebih banyak membantu menyusun kubus kembali.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Latihan 3.2</h3>
        <div className="flex flex-wrap items-end gap-6">
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1C01A5]">Depan</p>
            <Kotak warna="#60A5FA" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1C01A5]">Kanan</p>
            <Kotak warna="#FACC15" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1C01A5]">Atas</p>
            <Kotak warna="#F87171" />
          </div>
        </div>
        {kartu(soalBagian("Latihan 3.2").slice(0, 1))}
        <div className="flex flex-wrap items-end gap-6">
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1C01A5]">Depan</p>
            <Kotak warna="#F87171" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1C01A5]">Kanan</p>
            <Kotak warna="#FACC15" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-[#1C01A5]">Atas</p>
            <Kotak warna="#4ADE80" />
          </div>
        </div>
        {kartu(soalBagian("Latihan 3.2").slice(1, 2))}
        <div className="grid gap-3 sm:grid-cols-3">
          {(["depan", "kanan", "atas"] as Arah[]).map((arah) => (
            <div key={arah} className="space-y-2 rounded-2xl bg-[#F8F7FF] p-3">
              <p className="text-sm font-black text-[#1C01A5]">{arah}</p>
              <PapanTampak
                baris={modul.soalLima[arah]}
                warnaNama={{ biru: "#60A5FA", merah: "#F87171", kuning: "#FACC15", hijau: "#4ADE80" }}
              />
            </div>
          ))}
        </div>
        {kartu(soalBagian("Latihan 3.2").slice(2, 4))}
        <div className="flex flex-wrap items-end gap-6">
          <div className="space-y-2">
            <p className="text-sm font-black text-[#1C01A5]">Dadu pertama</p>
            <span className="flex items-end gap-2">
              {[[6, "atas"], [4, "depan"], [5, "kanan"]].map(([mata, arah]) => (
                <span key={arah} className="space-y-1 text-center">
                  <MataDadu mata={Number(mata)} />
                  <span className="block text-xs font-bold text-slate-600">{arah}</span>
                </span>
              ))}
            </span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-black text-[#1C01A5]">Dadu yang sama, dilihat dari arah lain</p>
            <span className="flex items-end gap-2">
              <span className="space-y-1 text-center">
                <MataDadu mata={6} />
                <span className="block text-xs font-bold text-slate-600">atas</span>
              </span>
              <span className="space-y-1 text-center">
                <MataDadu mata={2} />
                <span className="block text-xs font-bold text-slate-600">depan</span>
              </span>
              <span className="space-y-1 text-center">
                <MataDadu mata={0} kosong />
                <span className="block text-xs font-bold text-slate-600">kanan</span>
              </span>
            </span>
          </div>
        </div>
        {kartu(soalBagian("Latihan 3.2").slice(4))}
        <div className="space-y-2 rounded-3xl bg-[#F8F7FF] p-4">
          <h4 className="text-lg font-black text-[#1C01A5]">Ayo Berefleksi</h4>
          {modul.refleksiSpasial.map((kalimat) => (
            <p key={kalimat} className="text-base font-semibold leading-8 text-slate-800">{kalimat}</p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-2xl font-black text-[#1C01A5]">C. Lokasi</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Peta dibagi petak. Garis tegak diberi huruf, garis mendatar diberi bilangan. Letak suatu tempat ditulis (huruf, bilangan).
        </p>
        <PetakDiam huruf={["A", "B", "C", "D", "E"]} angka={[3, 2, 1]} tanda={[{ huruf: "C", angka: 2, isi: "●", warna: "#F0AB00" }]} />
        {kartu(soalBagian("C. Permasalahan"))}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Eksplorasi 3.3 Letak pada Petak</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Lokasi adalah perpotongan garis huruf dan garis bilangan. Baca hurufnya lebih dulu, lalu bilangannya.
        </p>
        <PetakDiam
          huruf={["A", "B", "C", "D", "E", "F"]}
          angka={[5, 4, 3, 2, 1]}
          tanda={[
            { huruf: "B", angka: 4, isi: "X", warna: "#1C01A5" },
            { huruf: "D", angka: 1, isi: "O", warna: "#1C01A5" },
          ]}
        />
        {kartu(soalBagian("Eksplorasi 3.3").slice(0, 2))}
        <p className="text-base font-semibold leading-8 text-slate-800">
          Pada permainan pesan, langkah hanya boleh ke kiri, kanan, atas, atau bawah. Langkah menyilang tidak dipakai.
        </p>
        {kartu(soalBagian("Eksplorasi 3.3").slice(2, 3))}
        <p className="text-base font-semibold leading-8 text-slate-800">
          Kubus hijau, kerucut ungu, dan bola kuning diletakkan pada perpotongan petak.
        </p>
        <PetakDiam
          huruf={["A", "B", "C", "D", "E", "F"]}
          angka={[4, 3, 2, 1, 0]}
          tanda={[
            { huruf: "C", angka: 0, isi: "■", warna: "#3F6212" },
            { huruf: "D", angka: 2, isi: "▲", warna: "#7E22CE" },
            { huruf: "E", angka: 1, isi: "●", warna: "#CA8A04" },
          ]}
        />
        <p className="text-sm font-bold text-slate-600">■ kubus hijau, ▲ kerucut ungu, ● bola kuning.</p>
        {kartu(soalBagian("Eksplorasi 3.3").slice(3))}
        <div className="space-y-2 rounded-3xl bg-[#F8F7FF] p-4">
          <h4 className="text-lg font-black text-[#1C01A5]">Latihan 3.3</h4>
          <p className="text-base font-semibold leading-8 text-slate-800">
            Gambar denah kelas pada buku petak. Tandai tempat dudukmu dan dua teman, lalu tulis letaknya.
          </p>
          <p className="text-base font-semibold leading-8 text-slate-800">
            Pada petak 3 × 3, dua orang bergiliran menaruh tanda. Siapa yang lebih dulu membuat garis tiga, dia yang menang.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Eksplorasi 3.4 Jalur dan Jarak</h3>
        <p className="text-base font-semibold leading-8 text-slate-800">
          Jarak terpendek adalah langkah mendatar ditambah langkah tegak. Huruf bertambah ke kanan. Bilangan bertambah ke atas. Titik P ada di (B,5) dan titik Q ada di (E,1).
        </p>
        {kartu(soalBagian("Eksplorasi 3.4"))}
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-black text-[#1C01A5]">Latihan 3.4</h3>
        {kartu(soalBagian("Latihan 3.4").slice(0, 2))}
        <p className="text-base font-semibold leading-8 text-slate-800">
          Sebuah kubus di (F,1) digeser ke (D,2). Kubus tidak diangkat. Ia direbahkan ke salah satu sisi tegaknya. Panjang rusuknya sama dengan satu petak. Titik P menandai salah satu sudut kubus.
        </p>
        {kartu(soalBagian("Latihan 3.4").slice(2))}
        {kartu(soalBagian("C. Refleksi"))}
        <div className="space-y-3 rounded-3xl border-2 border-[#F0AB00] bg-[#FFF9EB] p-5">
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Praktikum mandiri</p>
          <h3 className="text-xl font-black text-[#1C01A5]">Mengukur Jarak pada Petak</h3>
          <p className="text-sm font-semibold leading-7 text-slate-700">Pilih titik awal, lalu titik akhir. Emas adalah titik 1. Biru adalah titik 2.</p>
          <div className="inline-grid gap-1" style={{ gridTemplateColumns: `auto repeat(${HURUF_PETAK.length}, 2.25rem)` }}>
            <span />
            {HURUF_PETAK.map((nama) => (
              <span key={nama} className="text-center text-xs font-black text-[#1C01A5]">{nama}</span>
            ))}
            {[6, 5, 4, 3, 2, 1].map((bilangan) => (
              <span key={bilangan} className="contents">
                <span className="flex items-center pr-1 text-xs font-black text-[#1C01A5]">{bilangan}</span>
                {HURUF_PETAK.map((nama) => {
                  const kode = `${nama}${bilangan}`;
                  const awal = kode === awalPetak;
                  const akhir = kode === akhirPetak;
                  return (
                    <button
                      key={kode}
                      type="button"
                      aria-pressed={awal || akhir}
                      onClick={() => pilihPetak(kode)}
                      className={`h-9 w-9 rounded-md text-xs font-black ${awal ? "bg-[#F0AB00] text-[#1C01A5]" : akhir ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5]"}`}
                    >
                      {awal ? "1" : akhir ? "2" : ""}
                    </button>
                  );
                })}
              </span>
            ))}
          </div>
          <button type="button" onClick={() => { setAwalPetak(""); setAkhirPetak(""); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5]">
            Kosongkan
          </button>
          {langkahMendatar !== null && langkahTegak !== null ? (
            <p className="text-lg font-black text-[#1C01A5]">
              {langkahMendatar} langkah mendatar + {langkahTegak} langkah tegak = {langkahMendatar + langkahTegak} langkah
            </p>
          ) : (
            <p className="text-sm font-bold text-slate-600">Jarak muncul setelah dua titik terpilih.</p>
          )}
        </div>
        <div className="space-y-2 rounded-3xl bg-[#F8F7FF] p-4">
          <h4 className="text-lg font-black text-[#1C01A5]">Ayo Berefleksi</h4>
          {modul.refleksiLokasi.map((kalimat) => (
            <p key={kalimat} className="text-base font-semibold leading-8 text-slate-800">{kalimat}</p>
          ))}
        </div>
      </section>

      {tuntas ? (
        <section className="rounded-3xl bg-emerald-600 px-5 py-4 text-white">
          <p className="text-lg font-black">Bagian A, B, dan C tuntas.</p>
          <p className="mt-1 text-sm font-semibold leading-7">
            {jumlahBenar} soal benar{simulasiDicoba ? " dan praktikum sudah dicoba" : ""}. Status tersimpan di perangkat ini.
          </p>
        </section>
      ) : null}
    </article>
  );
}
