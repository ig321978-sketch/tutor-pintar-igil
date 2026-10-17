"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import materiMentah from "@/content/mtk-6-bab3.json";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK6_BAB3 } from "@/lib/modul-resmi-mtk-6-bab3";
import { useState, type ReactNode } from "react";

type GambarMateri = { src: string; alt: string; keterangan: string };
type TabelMateri = { kolom: string[]; baris: string[][] };
type PoinKonsep = {
  judul: string;
  isi: string[];
  contoh?: string;
  gambar?: GambarMateri;
  tabel?: TabelMateri;
};
type Kasus = { judul: string; soal: string; langkah: string[] };
type Istilah = { kata: string; arti: string };
type Pilihan = { kode: string; teks: string };
type SoalBank = {
  id: string;
  idTambahan?: string[];
  tipe: "pg" | "isian";
  soal: string;
  pilihan?: Pilihan[];
  kunci?: string;
  cek?: "bulat" | "lokasi";
  huruf?: string;
  angka?: string;
  pembahasan: string;
};
type MateriBab = {
  judul: string;
  pengantar: { bagian: string; judul: string; paragraf: string[]; gambar?: GambarMateri };
  konsep: { bagian: string; judul: string; poin: PoinKonsep[] };
  contoh: { bagian: string; judul: string; kasus: Kasus[] };
  kamus: { bagian: string; judul: string; istilah: Istilah[] };
  bankSoal: { judul: string; pengantar: string; soal: SoalBank[] };
};

const materi = materiMentah as MateriBab;

function idKuis(kode: string): string {
  const [kartu, indeks] = kode.split("-");
  return idKuisKartuResmi(MODUL_MTK6_BAB3.id, kartu, Number(indeks));
}

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/\s+/g, "").replace(/,/g, ".");
}

function tanpaRibuan(teks: string): string {
  return rapat(teks).replace(/rp/g, "").replace(/\.(?=\d{3}(?!\d))/g, "");
}

function bulat(teks: string, angka: string): boolean {
  return new RegExp(`(?<!\\d)${angka}(?![\\d.])`).test(tanpaRibuan(teks));
}

function tepatIsian(soal: SoalBank, teks: string): boolean {
  if (soal.cek === "lokasi") {
    return rapat(teks).includes(soal.huruf ?? "") && bulat(teks, soal.angka ?? "");
  }
  return bulat(teks, soal.angka ?? "");
}

function Teks({ anak }: { anak: string }) {
  return <span>{anak}</span>;
}

function JudulBagian({ bagian, anak }: { bagian?: string; anak: string }) {
  return (
    <div className="space-y-1">
      {bagian ? <p className="text-xs font-black uppercase tracking-wide text-[#6D28D9]">{bagian}</p> : null}
      <h2 className="text-2xl font-black text-[#1C01A5]">{anak}</h2>
    </div>
  );
}

function P({ anak }: { anak: string }) {
  return <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={anak} /></p>;
}

function Gambar({ src, alt, keterangan }: GambarMateri) {
  return (
    <figure className="space-y-1">
      <img src={src} alt={alt} className="w-full rounded-xl border border-slate-200 bg-white object-cover" />
      <figcaption className="text-xs font-semibold leading-6 text-slate-600">{keterangan}</figcaption>
    </figure>
  );
}

function Tabel({ kolom, baris }: TabelMateri) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {kolom.map((nama) => (
              <th key={nama} className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-black leading-8 text-[#1C01A5]">{nama}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((barisItem) => (
            <tr key={barisItem.join("|")}>
              {barisItem.map((sel, indeks) => (
                <td key={`${indeks}-${sel}`} className="border border-slate-200 px-3 py-2 font-semibold leading-8 text-slate-800">{sel}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Kartu({ children }: { children: ReactNode }) {
  return <section className="space-y-4 rounded-2xl border border-[#DDD6FE] bg-white p-4 shadow-sm">{children}</section>;
}

function SoalInteraktif({ soal, nomor }: { soal: SoalBank; nomor: number }) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [pilihan, setPilihan] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const [buka, setBuka] = useState(false);
  const kirim = () => {
    const tepat = soal.tipe === "pg" ? pilihan === soal.kunci : tepatIsian(soal, isi);
    setStatus(tepat ? "benar" : "salah");
    setBuka(true);
    if (!tepat) return;
    kuis?.tandaiBenar(idKuis(soal.id));
    for (const tambahan of soal.idTambahan ?? []) kuis?.tandaiBenar(idKuis(tambahan));
  };
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-[#FCFBFF] px-3 py-3">
      <p className="text-sm font-black text-[#1C01A5]">Soal {nomor} · {soal.tipe === "pg" ? "Pilihan ganda" : "Isian singkat"}</p>
      <P anak={soal.soal} />
      {soal.tipe === "pg" ? (
        <div className="grid gap-2">
          {(soal.pilihan ?? []).map((item) => (
            <button
              key={item.kode}
              type="button"
              aria-pressed={pilihan === item.kode}
              onClick={() => { setPilihan(item.kode); setStatus(null); }}
              className={`rounded-xl border px-3 py-2 text-left text-sm font-bold leading-7 ${pilihan === item.kode ? "border-[#1C01A5] bg-[#EEF2FF] text-[#1C01A5]" : "border-slate-200 bg-white text-slate-800"}`}
            >
              {item.kode}. {item.teks}
            </button>
          ))}
        </div>
      ) : (
        <label className="block text-sm font-bold leading-8 text-slate-800">
          <span className="sr-only">{soal.soal}</span>
          <input aria-label={soal.soal} value={isi} onChange={(event) => { setIsi(event.target.value); setStatus(null); }} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900" />
        </label>
      )}
      <button type="button" onClick={kirim} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Periksa</button>
      {status === "benar" ? <p className="text-sm font-bold leading-8 text-emerald-800">Benar.</p> : null}
      {status === "salah" ? <p className="text-sm font-bold text-rose-700">Belum tepat. Baca pembahasan, lalu coba lagi.</p> : null}
      {buka ? (
        <div className="rounded-xl bg-[#F8F7FF] px-3 py-2 text-sm font-semibold leading-8 text-slate-800">
          <p className="font-black text-[#1C01A5]">Pembahasan</p>
          <P anak={soal.pembahasan} />
        </div>
      ) : null}
    </div>
  );
}

export default function NaskahMtk6Bab3(_props: { kelas?: string; kelamin?: string }) {
  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Bab 3</p>
        <h1 className="text-3xl font-black text-[#1C01A5]">{materi.judul}</h1>
      </header>

      <Kartu>
        <JudulBagian bagian={materi.pengantar.bagian} anak={materi.pengantar.judul} />
        {materi.pengantar.paragraf.map((kalimat) => <P key={kalimat} anak={kalimat} />)}
        {materi.pengantar.gambar ? <Gambar {...materi.pengantar.gambar} /> : null}
      </Kartu>

      <Kartu>
        <JudulBagian bagian={materi.konsep.bagian} anak={materi.konsep.judul} />
        <ol className="space-y-5">
          {materi.konsep.poin.map((poin, indeks) => (
            <li key={poin.judul} className="space-y-2">
              <h3 className="text-lg font-black text-[#1C01A5]">{indeks + 1}. {poin.judul}</h3>
              {poin.isi.map((kalimat) => <P key={kalimat} anak={kalimat} />)}
              {poin.contoh ? <p className="rounded-xl bg-[#EEF2FF] px-3 py-2 text-sm font-semibold leading-8 text-slate-800"><span className="font-black text-[#1C01A5]">Contoh angka. </span>{poin.contoh}</p> : null}
              {poin.gambar ? <Gambar {...poin.gambar} /> : null}
              {poin.tabel ? <Tabel {...poin.tabel} /> : null}
            </li>
          ))}
        </ol>
      </Kartu>

      <Kartu>
        <JudulBagian bagian={materi.contoh.bagian} anak={materi.contoh.judul} />
        {materi.contoh.kasus.map((kasus) => (
          <div key={kasus.judul} className="space-y-2 rounded-xl border border-slate-200 p-3">
            <h3 className="text-lg font-black text-[#1C01A5]">{kasus.judul}</h3>
            <P anak={kasus.soal} />
            <ol className="list-decimal space-y-1 pl-5 text-sm font-semibold leading-8 text-slate-800">
              {kasus.langkah.map((langkah) => <li key={langkah}>{langkah}</li>)}
            </ol>
          </div>
        ))}
      </Kartu>

      <Kartu>
        <JudulBagian bagian={materi.kamus.bagian} anak={materi.kamus.judul} />
        <dl className="space-y-3">
          {materi.kamus.istilah.map((item) => (
            <div key={item.kata} className="rounded-xl bg-[#F8F7FF] px-3 py-2">
              <dt className="text-base font-black text-[#1C01A5]">{item.kata}</dt>
              <dd className="text-sm font-semibold leading-8 text-slate-800">{item.arti}</dd>
            </div>
          ))}
        </dl>
      </Kartu>

      <Kartu>
        <JudulBagian anak={materi.bankSoal.judul} />
        <P anak={materi.bankSoal.pengantar} />
        {materi.bankSoal.soal.map((soal, indeks) => (
          <SoalInteraktif key={soal.id} soal={soal} nomor={indeks + 1} />
        ))}
      </Kartu>
    </article>
  );
}
