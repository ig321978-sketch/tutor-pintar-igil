"use client";

import { useKuisMateri } from "@/components/KuisMateriContext";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import { MODUL_MTK6_BAB1 } from "@/lib/modul-resmi-mtk-6-bab1";
import {
  desimalDuaKomaSembilan,
  desimalLimaKomaDelapan,
  desimalNolKomaSembilan,
  desimalSatuKomaLima,
  desimalSeperlima,
  desimalSetengah,
  desimalTigaDelapanKomaLima,
  desimalTigaKomaEnam,
  desimalTigaKomaTujuh,
  desimalTigaPerEmpat,
  enamPerLima,
  jumlahDelapan,
  jumlahDuaPuluh,
  jumlahEnam,
  jumlahEnamPuluhLima,
  jumlahLimaBelas,
  jumlahSepuluh,
  jumlahTiga,
  jumlahTigaPuluh,
  limaPerTigaPuluhDua,
  seperenam,
  sepersembilan,
  sepertiga,
} from "@/lib/nilai-mtk-6-bab1";
import { useId, useLayoutEffect, useRef, useState, type ReactNode, type Ref } from "react";

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK6_BAB1.id, kode, indeks);
}

function rapat(teks: string): string {
  return teks.toLowerCase().replace(/\s+/g, "").replace(/,/g, ".");
}

function utuh(teks: string, angka: string): boolean {
  return new RegExp(`(?<!\\d)${angka}(?!\\d)`).test(rapat(teks));
}

function pecahan(teks: string, bentuk: string): boolean {
  const aman = bentuk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`).test(rapat(teks).replace("per", "/"));
}

function desimalUtuh(teks: string, angka: string): boolean {
  const aman = angka.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`).test(rapat(teks));
}

function limaBelasPerDua(teks: string): boolean {
  const s = rapat(teks);
  return pecahan(teks, "15/2") || /(?<!\d)7\.5(?!\d)/.test(s) || /71\/2/.test(s);
}

function namaAtauAngka(teks: string, nama: string, angka: string, cek?: (nilai: string) => boolean): boolean {
  return teks.toLowerCase().includes(nama) || (cek ? cek(teks) : utuh(teks, angka));
}

function Pecahan({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <span className="mx-[0.15em] inline-flex translate-y-px flex-col items-center align-middle text-[0.82em] leading-none" aria-label={`${atas} per ${bawah}`}>
      <span className="border-b border-current px-[0.2em] pb-px">{atas}</span>
      <span className="px-[0.2em] pt-px">{bawah}</span>
    </span>
  );
}

function Teks({ anak }: { anak: string }) {
  const potongan = anak.split(/(\([^)]+\)\/\([^)]+\)|\([^)]+\)\/[A-Za-z0-9]+|[A-Za-z0-9]+\/[A-Za-z0-9]+)/g);
  return potongan.map((bagian, indeks) => {
    const duaKurung = bagian.match(/^\(([^)]+)\)\/\(([^)]+)\)$/);
    if (duaKurung) return <Pecahan key={indeks} atas={duaKurung[1]} bawah={duaKurung[2]} />;
    const kurung = bagian.match(/^\(([^)]+)\)\/([A-Za-z0-9]+)$/);
    if (kurung) return <Pecahan key={indeks} atas={kurung[1]} bawah={kurung[2]} />;
    const biasa = bagian.match(/^([A-Za-z0-9]+)\/([A-Za-z0-9]+)$/);
    if (biasa) return <Pecahan key={indeks} atas={biasa[1]} bawah={biasa[2]} />;
    return <span key={indeks}>{bagian}</span>;
  });
}

function JudulBagian({ anak }: { anak: string }) {
  return <h2 className="text-2xl font-black text-[#1C01A5]">{anak}</h2>;
}

function Kegiatan({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">{label}</p>
      <div className="space-y-2 text-sm font-semibold leading-8 text-slate-800">{children}</div>
    </div>
  );
}

function Gambar({ src, alt, keterangan }: { src: string; alt: string; keterangan: string }) {
  return (
    <figure className="space-y-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-xl border border-slate-200 bg-white object-cover" />
      <figcaption className="text-xs font-semibold leading-6 text-slate-600"><Teks anak={keterangan} /></figcaption>
    </figure>
  );
}

function Rumus({ anak }: { anak: string }) {
  return <p className="rounded-xl bg-[#F8F7FF] px-4 py-3 text-base font-black leading-8 text-[#1C01A5]"><Teks anak={anak} /></p>;
}

function Tabel({ kolom, baris }: { kolom: string[]; baris: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {kolom.map((nama) => (
              <th key={nama} className="border border-slate-200 bg-slate-50 px-3 py-2 text-left font-black leading-8 text-[#1C01A5]"><Teks anak={nama} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((barisItem) => (
            <tr key={barisItem.join("|")}>
              {barisItem.map((sel, indeks) => (
                <td key={`${indeks}-${sel}`} className="border border-slate-200 px-3 py-2 font-semibold leading-8 text-slate-800"><Teks anak={sel} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AngkaSusun({ atas, bawah, bingkai, refAtas, refBawah }: { atas: string; bawah: string; bingkai?: boolean; refAtas?: Ref<HTMLSpanElement>; refBawah?: Ref<HTMLSpanElement> }) {
  return (
    <span className={bingkai ? "rounded-md border-[3px] border-red-600 bg-white px-2 py-1" : "bg-white px-1.5 py-1"}>
      <span className="flex min-w-6 flex-col items-center leading-none text-slate-900">
        <span ref={refAtas} className="whitespace-nowrap text-lg font-black">{atas}</span>
        <span className="my-1 h-0.5 w-full min-w-5 bg-slate-900" />
        <span ref={refBawah} className="whitespace-nowrap text-lg font-black">{bawah}</span>
      </span>
    </span>
  );
}

function GambarPasangan({
  kiriAtas,
  kiriBawah,
  kananAtas,
  kananBawah,
  operasi,
  arah,
  hasilAtas,
  hasilBawah,
  akhirAtas,
  akhirBawah,
  catatan,
}: {
  kiriAtas: string;
  kiriBawah: string;
  kananAtas: string;
  kananBawah: string;
  operasi: string;
  arah: "lurus" | "silang" | "ubah";
  hasilAtas?: string;
  hasilBawah?: string;
  akhirAtas?: string;
  akhirBawah?: string;
  catatan?: string;
}) {
  const bungkus = useRef<HTMLDivElement>(null);
  const kiriAtasRef = useRef<HTMLSpanElement>(null);
  const kiriBawahRef = useRef<HTMLSpanElement>(null);
  const kananAtasRef = useRef<HTMLSpanElement>(null);
  const kananBawahRef = useRef<HTMLSpanElement>(null);
  const penanda = useId().replace(/:/g, "");
  const [garis, setGaris] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);
  const labelKiri = arah === "ubah" ? "" : "1";
  const labelKanan = arah === "ubah" ? "" : "2";

  useLayoutEffect(() => {
    const ukur = () => {
      const akar = bungkus.current;
      const elemen = [kiriAtasRef.current, kiriBawahRef.current, kananAtasRef.current, kananBawahRef.current];
      if (!akar || elemen.some((item) => !item)) return;
      const kotak = akar.getBoundingClientRect();
      if (kotak.width < 8) return;
      const tepi = (el: HTMLSpanElement, sisi: "kiri" | "kanan") => {
        const batas = el.getBoundingClientRect();
        return {
          x: (sisi === "kiri" ? batas.left : batas.right) - kotak.left,
          y: batas.top + batas.height / 2 - kotak.top,
        };
      };
      const renggang = (dari: { x: number; y: number }, ke: { x: number; y: number }) => {
        const dx = ke.x - dari.x;
        const dy = ke.y - dari.y;
        const panjang = Math.hypot(dx, dy) || 1;
        const jarak = 4;
        return {
          x1: dari.x + (dx / panjang) * jarak,
          y1: dari.y + (dy / panjang) * jarak,
          x2: ke.x - (dx / panjang) * jarak,
          y2: ke.y - (dy / panjang) * jarak,
        };
      };
      const kiriAtasTitik = tepi(kiriAtasRef.current!, "kanan");
      const kiriBawahTitik = tepi(kiriBawahRef.current!, "kanan");
      const kananAtasTitik = tepi(kananAtasRef.current!, "kiri");
      const kananBawahTitik = tepi(kananBawahRef.current!, "kiri");
      if (arah === "ubah") {
        setGaris([
          renggang(tepi(kiriAtasRef.current!, "kanan"), tepi(kananAtasRef.current!, "kiri")),
          renggang(tepi(kiriBawahRef.current!, "kanan"), tepi(kananBawahRef.current!, "kiri")),
        ]);
        return;
      }
      if (arah === "silang") {
        setGaris([
          renggang(kananBawahTitik, kiriAtasTitik),
          renggang(kananAtasTitik, kiriBawahTitik),
        ]);
        return;
      }
      setGaris([
        renggang(kananAtasTitik, kiriAtasTitik),
        renggang(kananBawahTitik, kiriBawahTitik),
      ]);
    };
    ukur();
    const akar = bungkus.current;
    if (!akar || typeof ResizeObserver === "undefined") return;
    const pengamat = new ResizeObserver(ukur);
    pengamat.observe(akar);
    return () => pengamat.disconnect();
  }, [arah, kiriAtas, kiriBawah, kananAtas, kananBawah]);

  const sisi = (atas: string, bawah: string, judulAtas: string, judulBawah: string, refAtas: Ref<HTMLSpanElement>, refBawah: Ref<HTMLSpanElement>, bingkai?: boolean) => (
    <span className="inline-flex flex-col items-center">
      <span className="mb-1 min-h-4 text-[0.65rem] font-bold leading-4 text-slate-500">{judulAtas}</span>
      <AngkaSusun atas={atas} bawah={bawah} bingkai={bingkai} refAtas={refAtas} refBawah={refBawah} />
      <span className="mt-1 min-h-4 text-[0.65rem] font-bold leading-4 text-slate-500">{judulBawah}</span>
    </span>
  );

  return (
    <div className="space-y-2" aria-label={`${kiriAtas} per ${kiriBawah} ${operasi} ${kananAtas} per ${kananBawah}`}>
      <div className="flex w-max min-w-full justify-center">
      <div className="flex items-center gap-x-2">
        <div ref={bungkus} className="relative z-0 inline-flex items-center">
          {sisi(kiriAtas, kiriBawah, `Pembilang${labelKiri}`, `Penyebut${labelKiri}`, kiriAtasRef, kiriBawahRef, true)}
          <span className={`relative z-30 bg-white font-black text-slate-900 ${arah === "ubah" ? "mx-1 rounded-full px-1.5 text-sm text-green-700" : "mx-1 flex h-8 w-8 items-center justify-center rounded-full text-xl"}`}>{operasi}</span>
          {sisi(kananAtas, kananBawah, `Pembilang${labelKanan}`, `Penyebut${labelKanan}`, kananAtasRef, kananBawahRef)}
          <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible" aria-hidden>
            <defs>
              <marker id={penanda} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#16a34a" />
              </marker>
            </defs>
            {garis.map((item) => (
              <line key={`${item.x1}-${item.y1}-${item.x2}-${item.y2}`} x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} stroke="#16a34a" strokeWidth="2.5" markerEnd={`url(#${penanda})`} />
            ))}
          </svg>
        </div>
        {hasilAtas && hasilBawah ? (
          <>
            <span className="text-xl font-black text-slate-900">=</span>
            <span className="inline-flex flex-col items-center">
              <span className="mb-1 min-h-4" />
              <AngkaSusun atas={hasilAtas} bawah={hasilBawah} />
              <span className="mt-1 min-h-4" />
            </span>
          </>
        ) : null}
        {akhirAtas && akhirBawah ? (
          <>
            <span className="text-xl font-black text-slate-900">=</span>
            <span className="inline-flex flex-col items-center">
              <span className="mb-1 min-h-4" />
              <AngkaSusun atas={akhirAtas} bawah={akhirBawah} />
              <span className="mt-1 min-h-4" />
            </span>
          </>
        ) : null}
        {akhirAtas && !akhirBawah ? (
          <>
            <span className="text-xl font-black text-slate-900">=</span>
            <span className="text-2xl font-black text-slate-900">{akhirAtas}</span>
          </>
        ) : null}
      </div>
      </div>
      {catatan ? <p className="text-center text-sm font-bold leading-8 text-slate-800"><Teks anak={catatan} /></p> : null}
    </div>
  );
}

function GambarBanding() {
  return (
    <div className="flex flex-col items-center gap-3" aria-label="2,9 dan 2,49. Bandingkan persepuluhan.">
      <div className="flex items-start gap-8">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black tracking-wide text-slate-900">2,<span className="rounded-md border-[3px] border-red-600 px-1">9</span></span>
          <span className="mt-1 text-xl font-black leading-none text-green-700">↑</span>
          <span className="text-[0.65rem] font-bold text-green-700">persepuluhan</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black tracking-wide text-slate-900">2,<span className="rounded-md border-[3px] border-red-600 px-1">4</span>9</span>
          <span className="mt-1 text-xl font-black leading-none text-green-700">↑</span>
          <span className="text-[0.65rem] font-bold text-green-700">persepuluhan</span>
        </div>
      </div>
      <p className="text-center text-sm font-bold text-slate-800">9 lebih besar dari 4, jadi 2,9 lebih besar.</p>
    </div>
  );
}

function GambarBerulang() {
  const pecahan = (atas: string, bawah: string) => (
    <span className="inline-flex flex-col items-center">
      <span className="mb-1 min-h-4 text-[0.65rem] font-bold leading-4 text-slate-500">Pembilang</span>
      <AngkaSusun atas={atas} bawah={bawah} bingkai />
      <span className="mt-1 min-h-4 text-[0.65rem] font-bold leading-4 text-slate-500">Penyebut</span>
    </span>
  );
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      <div className="flex items-center gap-2">
        {pecahan("1", "3")}
        <span className="text-2xl font-black text-slate-900">=</span>
        <span className="flex flex-col items-center">
          <span className="text-2xl font-black text-slate-900">0,<span className="text-green-700">333</span>…</span>
          <span className="text-lg font-black leading-none text-green-700">↑</span>
          <span className="text-[0.65rem] font-bold text-green-700">berulang</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        {pecahan("1", "6")}
        <span className="text-2xl font-black text-slate-900">=</span>
        <span className="flex flex-col items-center">
          <span className="text-2xl font-black text-slate-900">0,1<span className="text-green-700">666</span>…</span>
          <span className="text-lg font-black leading-none text-green-700">↑</span>
          <span className="text-[0.65rem] font-bold text-green-700">berulang</span>
        </span>
      </div>
    </div>
  );
}

function Infografis({ judul, aturan, gambar, kolom, baris }: { judul: string; aturan: string; gambar: ReactNode; kolom: string[]; baris: string[][] }) {
  return (
    <div className="space-y-3 rounded-2xl border-2 border-[#F0AB00] bg-[#FFFBF0] px-4 py-4">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Infografis</p>
      <h3 className="text-lg font-black text-[#1C01A5]">{judul}</h3>
      <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={aturan} /></p>
      <div className="overflow-x-auto rounded-xl border border-[#1C01A5]/15 bg-white px-3 py-4">
        {gambar}
      </div>
      <Tabel kolom={kolom} baris={baris} />
    </div>
  );
}

function TabelEmber({ baris, keterangan }: { baris: number; keterangan: string }) {
  const pola = ["penuh", "penuh", "penuh", "kosong", "kosong"] as const;
  return (
    <div className="space-y-1">
      <table className="border-collapse text-xs">
        <tbody>
          {Array.from({ length: baris }, (_, indeks) => (
            <tr key={indeks}>
              <th className="border border-slate-300 bg-white px-2 py-1 text-left font-black text-[#1C01A5]">Ember {indeks + 1}</th>
              {pola.map((jenis, kolom) => (
                <td key={kolom} className={`h-8 w-8 border ${jenis === "penuh" ? "border-sky-600 bg-sky-300" : "border-slate-300 bg-white"}`} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs font-semibold leading-6 text-slate-600"><Teks anak={keterangan} /></p>
    </div>
  );
}

function KantongPermen() {
  return (
    <figure className="space-y-1">
      <div className="flex flex-wrap gap-3" aria-label="Empat kantong, tiap kantong berisi enam permen">
        {Array.from({ length: 4 }, (_, kantong) => (
          <div key={kantong} className="w-[5.5rem] rounded-md border-2 border-slate-500 bg-white px-2 py-1.5">
            <div className="mb-1 h-1 border-b border-dashed border-slate-400" />
            <div className="grid grid-cols-3 gap-1 py-1">
              {["bg-rose-300", "bg-sky-400", "bg-lime-400", "bg-red-500", "bg-orange-400", "bg-emerald-400"].map((warna, permen) => (
                <span key={permen} className={`mx-auto h-2.5 w-4 rounded-full ${warna}`} />
              ))}
            </div>
            <div className="mt-1 h-1 border-t border-dashed border-slate-400" />
          </div>
        ))}
      </div>
      <figcaption className="text-xs font-semibold leading-6 text-slate-600">Empat kantong. Tiap kantong berisi enam permen.</figcaption>
    </figure>
  );
}

function PermenDuaPuluh() {
  return (
    <figure className="space-y-1">
      <div className="inline-grid grid-cols-4 gap-1.5 rounded-xl border border-slate-300 bg-white p-3" aria-label="Dua puluh permen">
        {Array.from({ length: 20 }, (_, indeks) => (
          <span key={indeks} className="h-3 w-5 rounded-full bg-amber-400" />
        ))}
      </div>
      <figcaption className="text-xs font-semibold leading-6 text-slate-600">Dua puluh permen untuk lima anak.</figcaption>
    </figure>
  );
}

function PilihanDuaPertiga() {
  const jeruk = (jumlah: number, kunci: string) => Array.from({ length: jumlah }, (_, indeks) => <span key={`${kunci}-${indeks}`} className="h-6 w-6 rounded-full bg-orange-400" />);
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <figure className="space-y-1">
        <Petak kolom={10} isi={[...Array(6).fill("isi"), ...Array(4).fill("kosong")]} keterangan="a. Enam kotak biru dari sepuluh kotak." />
      </figure>
      <figure className="space-y-1">
        <div className="h-24 w-24 rounded-full border-4 border-amber-800" style={{ background: "conic-gradient(#f59e0b 0deg 90deg, #fde68a 90deg 360deg)" }} aria-label="Pizza empat potong, satu potong dilingkari" />
        <figcaption className="text-xs font-semibold leading-6 text-slate-600"><Teks anak="b. Satu potong dari empat potong pizza." /></figcaption>
      </figure>
      <figure className="space-y-1">
        <div className="space-y-1" aria-label="Delapan jeruk di dalam tanda, empat jeruk di luar">
          <div className="grid w-max grid-cols-4 gap-1 rounded-lg border-2 border-rose-600 p-1">{jeruk(8, "dalam")}</div>
          <div className="grid w-max grid-cols-4 gap-1 px-1">{jeruk(4, "luar")}</div>
        </div>
        <figcaption className="text-xs font-semibold leading-6 text-slate-600">c. Delapan jeruk di dalam tanda, dari dua belas jeruk.</figcaption>
      </figure>
    </div>
  );
}

function operasiEmpatKaliEnam(teks: string): boolean {
  const s = rapat(teks).replace(/[×x*]/g, "x");
  return /(?<!\d)4x6(?!\d)/.test(s) || s.includes("4kali6");
}

function operasiDuaPuluhBagiLima(teks: string): boolean {
  const s = rapat(teks).replace(/[÷:]/g, "/");
  return /(?<!\d)20\/5(?!\d)/.test(s) || s.includes("20bagi5");
}

function gambarJeruk(teks: string): boolean {
  const huruf = teks.toLowerCase();
  return /(?:^|[^a-z])c(?:[^a-z]|$)/.test(huruf) || huruf.includes("jeruk");
}

function Petak({ kolom, isi, keterangan }: { kolom: number; isi: Array<"isi" | "kosong">; keterangan: string }) {
  return (
    <div className="space-y-1">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${kolom}, 1.75rem)` }}>
        {isi.map((jenis, indeks) => (
          <div key={indeks} className={`h-7 rounded-sm border ${jenis === "isi" ? "border-sky-600 bg-sky-300" : "border-slate-300 bg-white"}`} />
        ))}
      </div>
      <p className="text-xs font-semibold leading-6 text-slate-600"><Teks anak={keterangan} /></p>
    </div>
  );
}

function KotakJawaban({ id, soal, periksa, umpan }: { id: string; soal: string; periksa: (teks: string) => boolean; umpan: string }) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const kirim = () => {
    const tepat = periksa(isi);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white px-3 py-3">
      <label className="block text-sm font-bold leading-8 text-slate-800">
        <Teks anak={soal} />
        <input value={isi} onChange={(event) => { setIsi(event.target.value); setStatus(null); }} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900" />
      </label>
      <button type="button" onClick={kirim} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Periksa</button>
      {status === "benar" ? <p className="text-sm font-bold leading-8 text-emerald-800">Benar. <Teks anak={umpan} /></p> : null}
      {status === "salah" ? <p className="text-sm font-bold text-rose-700">Belum tepat. Hitung lagi dari angka pada soal.</p> : null}
    </div>
  );
}

export default function NaskahMtk6Bab1(_props: { kelas?: string; kelamin?: string }) {
  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Bab 1</p>
        <h1 className="text-3xl font-black text-[#1C01A5]">Pecahan dan Desimal</h1>
        <p className="text-sm font-semibold text-slate-700">Urutan kegiatan mengikuti buku siswa: tujuan, peta konsep, permasalahan, eksplorasi, pembahasan, latihan, refleksi, uji kompetensi, lalu pengayaan.</p>
      </header>

      <section className="space-y-2">
        <JudulBagian anak="Tujuan Pembelajaran" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Mengalikan pecahan dengan bilangan asli, dan menghitung hasilnya.</li>
          <li>Membagi pecahan dengan bilangan asli, dan menghitung hasilnya.</li>
          <li>Mengubah pecahan menjadi desimal dengan satu angka di belakang koma, lalu membandingkan dan mengurutkan desimal.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Pertanyaan Pemantik" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Bagaimana mengalikan pecahan dengan bilangan asli, dan sebaliknya?</li>
          <li>Apakah saat mengalikan pecahan dengan bilangan asli, penyebut harus disamakan lebih dulu?</li>
          <li>Bagaimana membagi pecahan dengan bilangan asli, dan sebaliknya?</li>
          <li>Apakah saat membagi pecahan, penyebut harus disamakan lebih dulu?</li>
          <li>Bagaimana mengubah pecahan menjadi desimal, dan sebaliknya?</li>
        </ul>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Kata Kunci" />
        <p className="text-sm font-semibold text-slate-800">Pecahan, desimal, perkalian pecahan, pembagian pecahan, bilangan kebalikan, bilangan asli.</p>
      </section>

      <section className="space-y-2">
        <JudulBagian anak="Peta Konsep" />
        <p className="text-sm font-semibold text-slate-800">Pecahan dan desimal terbagi menjadi perkalian pecahan, pembagian pecahan, dan bentuk bilangan. Bentuk bilangan mencakup notasi desimal, membandingkan dua desimal, dan mengurutkan desimal.</p>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Ayo Mengingat Kembali" />
        <p className="text-sm font-semibold leading-8 text-slate-800">Ingat kembali perkalian bilangan asli, pembagian bilangan asli, dan pecahan sebagai bagian dari keseluruhan.</p>
        <p className="text-sm font-black leading-8 text-[#1C01A5]">Perkalian dua bilangan asli</p>
        <KantongPermen />
        <KotakJawaban id={idKuis("A", 12)} soal="a. Berapa banyak permen seluruhnya?" periksa={(teks) => utuh(teks, "24")} umpan="4 × 6 = 24 permen." />
        <KotakJawaban id={idKuis("A", 13)} soal="b. Tuliskan operasi perkaliannya." periksa={operasiEmpatKaliEnam} umpan="4 × 6 = 24." />
        <p className="text-sm font-black leading-8 text-[#1C01A5]">Pembagian dua bilangan asli</p>
        <PermenDuaPuluh />
        <KotakJawaban id={idKuis("A", 14)} soal="a. Berapa permen yang diperoleh tiap anak?" periksa={(teks) => utuh(teks, "4")} umpan="20 ÷ 5 = 4 permen." />
        <KotakJawaban id={idKuis("A", 15)} soal="b. Tuliskan operasi pembagiannya." periksa={operasiDuaPuluhBagiLima} umpan="20 ÷ 5 = 4." />
        <p className="text-sm font-black leading-8 text-[#1C01A5]">Pecahan sebagai bagian dari keseluruhan</p>
        <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="Gambar mana yang menunjukkan 2/3?" /></p>
        <PilihanDuaPertiga />
        <KotakJawaban id={idKuis("A", 16)} soal="Tuliskan huruf gambar yang menunjukkan 2/3." periksa={gambarJeruk} umpan="Gambar c. 8 jeruk dari 12 jeruk sama dengan 2/3. Gambar a adalah 6/10. Gambar b adalah 1/4." />
        <Kegiatan label="Pembuka">
          <Gambar src="/doodle-mtk/mtk-6-bab1-penampungan.jpg" alt="Agam dan Ayah mengambil air dari penampungan di kebun yang kering." keterangan="Agam membantu Ayah mengambil air di penampungan." />
          <p><Teks anak="Penampungan air masih terisi 2/3 bagian. Hari ini terpakai 1/5 dari air yang tersisa. Air sisa 2/3 itu juga akan dipakai selama 2 hari, dibagi sama banyak." /></p>
          <p>Agam memakai air seperlunya, karena musim kemarau membuat banyak daerah kekurangan air.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 0)} soal="1/5 dari 2/3. Bagian air yang terpakai hari ini?" periksa={(teks) => pecahan(teks, "2/15")} umpan="1/5 × 2/3 = 2/15." />
        <KotakJawaban id={idKuis("A", 1)} soal="2/3 dibagi untuk 2 hari. Bagian tiap hari?" periksa={(teks) => sepertiga(teks) || pecahan(teks, "2/6")} umpan="2/3 × 1/2 = 2/6. 2/6 sama dengan 1/3." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="A. Perkalian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Perkalian Bilangan Asli dengan Pecahan</h3>
        <Kegiatan label="Permasalahan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-ember-besar.jpg" alt="Agam dan Ayah menyiram kebun dengan ember besar." keterangan="Satu ember besar menyiram 2 m² kebun." />
          <p><Teks anak="Agam menyiram kebun. Satu ember besar menyiram 2 m². Satu ember kecil menyiram 3/5 m². Ia memakai 5 ember besar dan 5 ember kecil." /></p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.1">
          <p>Isi tabel ember besar. Satu ember menyiram 2 m², jadi lima ember menyiram 5 × 2 m².</p>
          <Tabel kolom={["Banyak ember besar", "Luas kebun (m²)"]} baris={[["1", "2"], ["5", "…"]]} />
          <p>Isi juga tabel untuk 2 ember kecil. Satu ember kecil menyiram 3/5 m².</p>
          <Tabel kolom={["Banyak ember kecil", "Luas kebun (m²)"]} baris={[["1", "3/5"], ["2", "…"]]} />
          <Gambar src="/doodle-mtk/mtk-6-bab1-ember-kecil.jpg" alt="Agam memegang ember kecil di samping kebun." keterangan="Ember kecil menyiram sebagian kebun. Bagian 3/5 ada pada petak di bawah." />
          <p><Teks anak="Satu baris 5 kotak sama dengan 1 m². Satu kotak sama dengan 1/5 m². Satu ember kecil mengisi 3 kotak." /></p>
          <Petak kolom={5} isi={["isi", "isi", "isi", "kosong", "kosong"]} keterangan="Satu ember kecil: 3 kotak dari 5, yaitu 3/5 m²." />
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 2)} soal="Luas yang disiram 5 ember besar, dalam m²?" periksa={jumlahSepuluh} umpan="5 × 2 = 10 m²." />
        <KotakJawaban id={idKuis("A", 3)} soal="Luas yang disiram 2 ember kecil, dalam m²?" periksa={enamPerLima} umpan="2 baris × 3 kolom penuh = 6. Penyebut tetap 5, jadi 6/5 m²." />
        <KotakJawaban id={idKuis("A", 4)} soal="Luas yang disiram 5 ember kecil, dalam m²?" periksa={jumlahTiga} umpan="5 baris × 3 kolom penuh = 15. 15/5 = 3 m²." />
        <Kegiatan label="Pembahasan">
          <p>Lima ember besar memakai perkalian bilangan asli. Satu ember menyiram 2 m², jadi lima ember menyiram 5 × 2 = 10 m².</p>
          <Tabel kolom={["Banyak ember besar", "Luas kebun (m²)"]} baris={[["1", "2"], ["5", "10"]]} />
          <p><Teks anak="Dua ember kecil berarti bagian 3/5 digandakan 2 kali: 3/5 + 3/5 = 6/5. Kalikan bilangan asli dengan pembilang. Penyebut tetap." /></p>
          <p>Ember kecil dihitung dengan menambah kotak yang sama. Caranya ada di bagian berikut.</p>
        </Kegiatan>

        <div className="space-y-3 rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-4 text-sm font-semibold leading-8 text-slate-800">
          <h3 className="text-lg font-black text-[#1C01A5]">Cara mudah: ember kecil</h3>
          <p>1 m² dibagi menjadi 5 kolom sama. Satu ember kecil mengisi 3 kolom. Dua kolom tetap kosong. Satu ember = satu baris.</p>
          <TabelEmber baris={1} keterangan="1 baris, 5 kolom: 3 penuh dan 2 kosong. Hasilnya 3/5 m²." />
          <p>2 ember = 2 baris. Tiap baris sama: 3 kolom penuh dan 2 kolom kosong.</p>
          <TabelEmber baris={2} keterangan="Kolom penuh: 3 + 3 = 6. Tiap baris tetap 5 bagian, jadi 6/5 m²." />
          <p>5 ember = 5 baris dengan pola yang sama.</p>
          <TabelEmber baris={5} keterangan="Kolom penuh: 5 × 3 = 15. 15/5 = 3 m²." />
          <Rumus anak="a × b/c = (a × b)/c" />
          <p>Banyak baris kali 3 kolom penuh. Penyebut tetap 5.</p>
          <p><Teks anak="Coba buktikan: apakah hasil kali bilangan asli dengan pecahan selalu lebih kecil? Pada ember, 5 × 3/5 = 3, dan 3 lebih kecil dari 5. 2 × 3/5 = 6/5, dan 6/5 lebih kecil dari 2. Jika pecahannya lebih kecil dari 1, hasilnya lebih kecil daripada bilangan aslinya." /></p>
        </div>

        <Infografis
          judul="Perkalian bilangan asli dengan pecahan"
          aturan="Ubah bilangan asli menjadi pecahan. Panah lurus: Pembilang1 per Penyebut1 dikali Pembilang2 per Penyebut2."
          gambar={<GambarPasangan kiriAtas="5" kiriBawah="1" kananAtas="2" kananBawah="3" operasi="×" arah="lurus" hasilAtas="5 × 2" hasilBawah="1 × 3" akhirAtas="10" akhirBawah="3" catatan="10/3 sama dengan 3 + 1/3." />}
          kolom={["Langkah", "Pembilang", "Penyebut"]}
          baris={[
            ["5 menjadi pecahan", "5", "1"],
            ["Kali", "5 × 2 = 10", "1 × 3 = 3"],
            ["Hasil", "10/3", "3 + 1/3"],
          ]}
        />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Perkalian Pecahan dengan Bilangan Asli</h3>
        <Kegiatan label="Permasalahan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-pohon.jpg" alt="Agam berdiri di kebun pohon mangga." keterangan="Kebun mangga Agam. Pohonnya ada 15." />
          <p><Teks anak="Agam punya 15 pohon mangga. 2/3 dari pohon itu adalah mangga manalagi." /></p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.2">
          <p>Bagi 15 pohon menjadi 3 bagian, lalu gabungkan 2 bagian.</p>
          <p>Gambar 15 pohon itu, lalu tandai 2 bagian dari 3 bagian.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 5)} soal="Banyak pohon mangga manalagi?" periksa={jumlahSepuluh} umpan="2/3 × 15 = 10 pohon." />
        <Kegiatan label="Pembahasan">
          <p><Teks anak="2/3 × 15 mencari 2 bagian dari 3 bagian pohon. 15 dibagi 3 sama dengan 5 pohon tiap bagian. Dua bagian berisi 10 pohon." /></p>
          <p><Teks anak="Kalikan pembilang dengan bilangan asli. Penyebut tetap: (2 × 15)/3 = 30/3 = 10." /></p>
          <Rumus anak="a/c × b = (a × b)/c" />
          <p><Teks anak="Hitung 1/4 × 20 dan 20 × 1/4. Keduanya 20/4 = 5. Urutan faktor tidak mengubah hasil." /></p>
        </Kegiatan>

        <Infografis
          judul="Perkalian pecahan dengan bilangan asli"
          aturan="Ubah bilangan asli menjadi pecahan. Panah lurus: Pembilang1 per Penyebut1 dikali Pembilang2 per Penyebut2."
          gambar={<GambarPasangan kiriAtas="2" kiriBawah="3" kananAtas="15" kananBawah="1" operasi="×" arah="lurus" hasilAtas="2 × 15" hasilBawah="3 × 1" akhirAtas="30" akhirBawah="3" catatan="30/3 sama dengan 10." />}
          kolom={["Langkah", "Pembilang", "Penyebut"]}
          baris={[
            ["15 menjadi pecahan", "15", "1"],
            ["Kali", "2 × 15 = 30", "3 × 1 = 3"],
            ["Hasil", "30/3", "10"],
          ]}
        />

        <Kegiatan label="Latihan 1.1">
          <p><Teks anak="1. Hani punya 4 pita. Tiap pita panjangnya 3/4 m. Satu pita digambar 1 m yang dibagi 4 bagian sama, lalu 3 bagian diarsir." /></p>
          <Petak kolom={4} isi={["isi", "isi", "isi", "kosong"]} keterangan="Satu pita: 3 bagian dari 4, yaitu 3/4 m. Hani punya 4 pita seperti ini." />
          <p><Teks anak="2. Fina membuat 75 pastel. Keluarga memakan 2/15 bagian." /></p>
          <p><Teks anak="3. Ada 180 siswa kelas 6. 1/6 memilih musik. 2/3 dari siswa musik itu juga memilih melukis." /></p>
          <p><Teks anak="4. Buat cerita untuk 1/4 × 20 dan untuk 20 × 1/4. Kedua hasil hitungnya sama dengan 5." /></p>
        </Kegiatan>
        <KotakJawaban id={idKuis("A", 6)} soal="Panjang seluruh pita Hani, dalam meter?" periksa={jumlahTiga} umpan="4 × 3/4 = 3 meter." />
        <KotakJawaban id={idKuis("A", 7)} soal="Banyak pastel yang sudah dimakan?" periksa={jumlahSepuluh} umpan="2/15 × 75 = 10 pastel." />
        <KotakJawaban id={idKuis("A", 8)} soal="Banyak pastel yang belum dimakan?" periksa={jumlahEnamPuluhLima} umpan="75 − 10 = 65 pastel." />
        <KotakJawaban id={idKuis("A", 9)} soal="Banyak siswa yang memilih musik?" periksa={jumlahTigaPuluh} umpan="1/6 × 180 = 30 siswa." />
        <KotakJawaban id={idKuis("A", 10)} soal="Banyak siswa yang memilih melukis?" periksa={jumlahDuaPuluh} umpan="2/3 × 30 = 20 siswa." />
        <KotakJawaban id={idKuis("A", 11)} soal="Pecahan siswa kelas 6 yang memilih melukis?" periksa={sepersembilan} umpan="20/180 = 1/9." />
        <Kegiatan label="Refleksi subbab">
          <p>Bagaimana cara mengalikan bilangan asli dengan pecahan?</p>
          <p>Bagaimana cara mengalikan pecahan dengan bilangan asli?</p>
          <p>Keduanya sama: kali pembilang, penyebut tetap.</p>
        </Kegiatan>
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Pembagian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Pembagian Pecahan dengan Bilangan Asli</h3>
        <Kegiatan label="Permasalahan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-botol.jpg" alt="Satu botol air dan tiga gelas kosong di meja." keterangan="Satu botol air akan dibagi rata ke 3 gelas." />
          <p><Teks anak="Agam punya satu botol air. Air dibagi rata ke 3 gelas. Isi botol berganti: 1 liter, lalu 1/2 liter, lalu 1/3 liter." /></p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.3">
          <p>Satu kotak penuh menggambarkan 1 liter. Arsir isi botol, lalu bagi arsiran itu rata ke 3 gelas.</p>
          <p><Teks anak="a. Botol 1 liter. b. Botol 1/2 liter. c. Botol 1/3 liter." /></p>
        </Kegiatan>
        <KotakJawaban id={idKuis("B", 0)} soal="1 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" periksa={sepertiga} umpan="1 ÷ 3 = 1/3 liter." />
        <KotakJawaban id={idKuis("B", 1)} soal="1/2 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" periksa={seperenam} umpan="1/2 ÷ 3 = 1/2 × 1/3 = 1/6 liter." />
        <KotakJawaban id={idKuis("B", 2)} soal="1/3 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" periksa={sepersembilan} umpan="1/3 ÷ 3 = 1/3 × 1/3 = 1/9 liter." />
        <Kegiatan label="Pembahasan">
          <p><Teks anak="1 liter dibagi rata ke 3 gelas. Tiap gelas berisi 1/3 liter." /></p>
          <Tabel kolom={["Gelas", "Isi"]} baris={[["1", "1/3 liter"], ["2", "1/3 liter"], ["3", "1/3 liter"]]} />
          <p><Teks anak="1/2 liter dibagi 3 gelas. Tiap gelas berisi 1/6 liter. 1/3 liter dibagi 3 gelas. Tiap gelas berisi 1/9 liter." /></p>
          <p>Bagiannya bertambah banyak, tetapi nilai tiap bagian menjadi lebih kecil.</p>
          <p><Teks anak="1 dibagi 3 menghasilkan 3 bagian sama, masing-masing 1/3. Jika tiap bagian dibagi lagi menjadi 3, ada 9 bagian. Tiap bagian bernilai 1/9. Itu sebabnya 1/3 ÷ 3 = 1/9." /></p>
          <Rumus anak="1/a ÷ b = 1/a × 1/b" />
          <p>Membagi pecahan dengan bilangan asli berarti membagi pecahan itu menjadi beberapa bagian sebanyak bilangan aslinya. Hasilnya adalah nilai tiap bagian.</p>
          <p><Teks anak="Rini menghitung 4/3 ÷ 2 dengan membagi pembilang saja: (4 ÷ 2)/3 = 2/3. Pada soal ini hasilnya sama dengan 4/3 × 1/2 = 2/3. Cara yang berlaku umum tetap kali dengan kebalikan pembagi." /></p>
          <p><Teks anak="Buat cerita sendiri untuk 4/3 ÷ 2." /></p>
        </Kegiatan>

        <Infografis
          judul="Pembagian pecahan dengan bilangan asli"
          aturan="Ubah bilangan asli menjadi pecahan. Panah silang: Pembilang1 per Penyebut1 dibagi Pembilang2 per Penyebut2."
          gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="1" operasi="÷" arah="silang" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" />}
          kolom={["Peran", "Pada 1/2 ÷ 3/1"]}
          baris={[
            ["Pembilang1", "1"],
            ["Penyebut1", "2"],
            ["Pembilang2", "3"],
            ["Penyebut2", "1"],
            ["Pembilang1 × penyebut2", "1 × 1 = 1"],
            ["Penyebut1 × pembilang2", "2 × 3 = 6"],
            ["Hasil", "1/6"],
          ]}
        />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Pembagian Bilangan Asli dengan Pecahan</h3>
        <Kegiatan label="Permasalahan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-jus.jpg" alt="Tiga botol minuman dan tumpukan gelas kecil." keterangan="Jus jeruk, jus jambu, dan air mineral, masing-masing 3 liter." />
          <p><Teks anak="Agam menyiapkan 3 liter jus jeruk untuk gelas 1/4 liter, 3 liter jus jambu untuk gelas 1/2 liter, dan 3 liter air mineral untuk gelas 1/5 liter. Lalu 3 liter air itu juga diukur dengan botol 2/5 liter." /></p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.4">
          <p><Teks anak="Dalam 1 liter ada 4 gelas 1/4 liter, 2 gelas 1/2 liter, dan 5 gelas 1/5 liter. Untuk 2/5 liter, dalam 1 liter ada 5/2 bagian. Mengapa hasilnya bisa lebih besar dari 3?" /></p>
        </Kegiatan>
        <KotakJawaban id={idKuis("B", 3)} soal="Banyak gelas 1/4 liter dari 3 liter jus jeruk?" periksa={(teks) => utuh(teks, "12")} umpan="3 ÷ 1/4 = 3 × 4 = 12 gelas." />
        <KotakJawaban id={idKuis("B", 4)} soal="Banyak gelas 1/2 liter dari 3 liter jus jambu?" periksa={jumlahEnam} umpan="3 ÷ 1/2 = 6 gelas." />
        <KotakJawaban id={idKuis("B", 5)} soal="Banyak gelas 1/5 liter dari 3 liter air mineral?" periksa={jumlahLimaBelas} umpan="3 ÷ 1/5 = 15 gelas." />
        <KotakJawaban id={idKuis("B", 6)} soal="Banyak botol 2/5 liter dari 3 liter air?" periksa={limaBelasPerDua} umpan="3 ÷ 2/5 = 3 × 5/2 = 15/2, yaitu 7 1/2 botol." />
        <Kegiatan label="Pembahasan">
          <p><Teks anak="Dalam 1 liter ada 4 gelas 1/4 liter. Dalam 3 liter ada 3 × 4 = 12 gelas. Jadi 3 ÷ 1/4 = 3 × 4 = 12. Dua belas gelas itu mengembalikan 12 × 1/4 = 3 liter." /></p>
          <p><Teks anak="Dalam 1 liter ada 2 gelas 1/2 liter, jadi 3 liter menghasilkan 6 gelas. Dalam 1 liter ada 5 gelas 1/5 liter, jadi 3 liter menghasilkan 15 gelas." /></p>
          <p><Teks anak="Untuk botol 2/5 liter, dalam 1 liter ada 5/2 bagian, yaitu 2 1/2 bagian. Dalam 3 liter ada 3 × 5/2 = 15/2 = 7 1/2 botol." /></p>
          <p>Hasilnya lebih besar dari 3 karena gelas atau botol itu lebih kecil dari 1 liter, jadi wadahnya lebih banyak.</p>
          <p>Membagi bilangan asli dengan pecahan sama dengan mengalikan kebalikan pecahan itu.</p>
          <Rumus anak="a ÷ b/c = a × c/b" />
        </Kegiatan>

        <Infografis
          judul="Pembagian bilangan asli dengan pecahan"
          aturan="Ubah bilangan asli menjadi pecahan. Panah silang: Pembilang1 per Penyebut1 dibagi Pembilang2 per Penyebut2."
          gambar={<GambarPasangan kiriAtas="5" kiriBawah="1" kananAtas="2" kananBawah="3" operasi="÷" arah="silang" hasilAtas="5 × 3" hasilBawah="1 × 2" akhirAtas="15" akhirBawah="2" catatan="15/2 sama dengan 7 + 1/2." />}
          kolom={["Peran", "Hitung"]}
          baris={[
            ["5 menjadi pecahan", "5/1"],
            ["Pembilang1 × penyebut2", "5 × 3 = 15"],
            ["Penyebut1 × pembilang2", "1 × 2 = 2"],
            ["Hasil", "15/2 = 7 + 1/2"],
          ]}
        />

        <Kegiatan label="Latihan 1.2">
          <p><Teks anak="1. Pak Rudi membagi 2/4 bagian tanah kepada 3 anak secara adil. Gambar bagian tanah itu, lalu gambar bagian tiap anak." /></p>
          <p><Teks anak="2. Rina punya 6 kg gula. Tiap adonan bolu memakai 3/4 kg." /></p>
          <p><Teks anak="3. Astri punya 5 batang cokelat. Tiap teman mendapat 2/3 batang. Berapa teman yang mendapat bagian penuh? Apakah ada sisa?" /></p>
          <p><Teks anak="4. Buat cerita untuk 1/5 ÷ 4 dan untuk 4 ÷ 1/5." /></p>
        </Kegiatan>
        <KotakJawaban id={idKuis("B", 7)} soal="Bagian tanah tiap anak Pak Rudi?" periksa={seperenam} umpan="2/4 ÷ 3 = 2/4 × 1/3 = 1/6." />
        <KotakJawaban id={idKuis("B", 8)} soal="Banyak kue bolu yang dibuat Rina?" periksa={jumlahDelapan} umpan="6 ÷ 3/4 = 8 bolu." />
        <KotakJawaban id={idKuis("B", 9)} soal="5 ÷ 2/3. Tuliskan hasilnya." periksa={limaBelasPerDua} umpan="5 × 3/2 = 15/2. Ada 7 teman yang mendapat bagian penuh, sisa 1/3 batang." />
        <KotakJawaban id={idKuis("B", 10)} soal="Berapa teman Astri yang mendapat bagian penuh?" periksa={(teks) => utuh(teks, "7")} umpan="15/2 = 7 1/2, jadi 7 teman mendapat 2/3 batang penuh." />
        <KotakJawaban id={idKuis("B", 11)} soal="Sisa cokelat Astri, dalam batang?" periksa={sepertiga} umpan="Setengah dari 2/3 batang sama dengan 1/3 batang." />
        <Kegiatan label="Refleksi subbab">
          <p>Bagaimana cara membagi pecahan dengan bilangan asli?</p>
          <p>Bagaimana cara membagi bilangan asli dengan pecahan?</p>
          <p>Pecahan dibagi bilangan asli dikali dengan satu per pembagi. Bilangan asli dibagi pecahan dikali dengan kebalikan pecahan itu.</p>
        </Kegiatan>
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Bilangan Desimal" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Mengubah Pecahan Menjadi Desimal</h3>
        <Kegiatan label="Permasalahan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-timbangan.jpg" alt="Agam dan Ibu di depan timbangan buah. Jarum timbangan tanpa angka." keterangan="Timbangan buah untuk jeruk 1/2 kg dan salak 1/5 kg." />
          <p><Teks anak="Ibu meminta jeruk 1/2 kg dan salak 1/5 kg. Timbangan menunjukkan 0,50 kg dan 0,20 kg." /></p>
        </Kegiatan>
        <Kegiatan label="Eksplorasi 1.5">
          <p><Teks anak="Satu persegi bernilai 1. Jika dibagi 10 bagian sama, tiap bagian 1/10 = 0,1. Sepuluh persegi kecil dari 100 bagian sama dengan 10/100 = 0,10 = 0,1." /></p>
          <p><Teks anak="1/2 dapat ditulis 5/10 = 0,5 dan juga 50/100 = 0,50. Keduanya sama. Timbangan 0,50 kg sama dengan permintaan 1/2 kg." /></p>
          <p><Teks anak="1/5 dapat ditulis 2/10 = 0,2 dan juga 20/100 = 0,20. Timbangan 0,20 kg sama dengan permintaan 1/5 kg." /></p>
          <p>Pecahan berpenyebut 2, 5, atau kelipatannya diubah dulu menjadi penyebut 10 atau 100.</p>
        </Kegiatan>
        <KotakJawaban id={idKuis("C", 0)} soal="Bentuk desimal dari 1/2 kg?" periksa={desimalSetengah} umpan="1/2 = 5/10 = 0,5 = 0,50." />
        <KotakJawaban id={idKuis("C", 1)} soal="Bentuk desimal dari 1/5 kg?" periksa={desimalSeperlima} umpan="1/5 = 2/10 = 0,2 = 0,20." />
        <Kegiatan label="Pembahasan">
          <p><Teks anak="Angka di kiri koma menempati puluhan dan satuan. Angka pertama di kanan koma menempati persepuluhan, nilainya 1/10. Angka kedua menempati perseratusan, nilainya 1/100." /></p>
          <p><Teks anak="0,10 sama dengan 0,1 karena keduanya sama dengan 1/10. Sebaliknya, 0,5 = 5/10 = 1/2 dan 0,2 = 2/10 = 1/5." /></p>
          <p>Jika penyebut tidak bisa dijadikan 10 atau 100, bentuk desimalnya dibahas di pengayaan.</p>
        </Kegiatan>

        <Infografis
          judul="Mengubah pecahan menjadi desimal"
          aturan="Kalikan pembilang dan penyebut dengan bilangan yang sama, sampai penyebut menjadi 10 atau 100."
          gambar={<div className="space-y-4"><GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="5" kananBawah="10" operasi="×5" arah="ubah" akhirAtas="0,5" /><GambarPasangan kiriAtas="3" kiriBawah="4" kananAtas="75" kananBawah="100" operasi="×25" arah="ubah" akhirAtas="0,75" /></div>}
          kolom={["Pecahan", "Penyebut 10 atau 100", "Desimal"]}
          baris={[
            ["1/2", "5/10", "0,5"],
            ["1/5", "2/10", "0,2"],
            ["3/4", "75/100", "0,75"],
          ]}
        />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Membandingkan dan Mengurutkan Bilangan Desimal</h3>
        <Kegiatan label="Permasalahan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-jarak.jpg" alt="Beberapa rumah dihubungkan jalan yang panjangnya berbeda menuju pagar sekolah." keterangan="Jarak rumah ke sekolah tidak sama. Angkanya ada pada tabel." />
          <p>Agam mengumpulkan jarak rumah 10 teman ke sekolah.</p>
        </Kegiatan>
        <Tabel
          kolom={["Nama", "Jarak (km)"]}
          baris={[
            ["Alma", "2,3"],
            ["Budi", "10,9"],
            ["Anita", "1,9"],
            ["Fadilah", "4,7"],
            ["Musa", "11,3"],
            ["Rini", "2,6"],
            ["Rido", "3,6"],
            ["Dias", "3,1"],
            ["Fatim", "2,8"],
            ["Andi", "1,5"],
          ]}
        />
        <Kegiatan label="Eksplorasi 1.6">
          <p>Isi nilai tempat tiap jarak: puluhan, satuan, persepuluhan, dan perseratusan. Lalu urutkan dari yang terdekat.</p>
        </Kegiatan>
        <Kegiatan label="Pembahasan">
          <p><Teks anak="Kiri tanda koma adalah bilangan asli. Kanan tanda koma, angka pertama bernilai persepuluhan (1/10) dan angka kedua bernilai perseratusan (1/100)." /></p>
          <p>Nilai tempat sepuluh jarak itu:</p>
          <Tabel
            kolom={["Nama", "Jarak", "Puluhan", "Satuan", "Persepuluhan", "Perseratusan"]}
            baris={[
              ["Alma", "2,3", "0", "2", "3", "0"],
              ["Budi", "10,9", "1", "0", "9", "0"],
              ["Anita", "1,9", "0", "1", "9", "0"],
              ["Fadilah", "4,7", "0", "4", "7", "0"],
              ["Musa", "11,3", "1", "1", "3", "0"],
              ["Rini", "2,6", "0", "2", "6", "0"],
              ["Rido", "3,6", "0", "3", "6", "0"],
              ["Dias", "3,1", "0", "3", "1", "0"],
              ["Fatim", "2,8", "0", "2", "8", "0"],
              ["Andi", "1,5", "0", "1", "5", "0"],
            ]}
          />
          <p>Contoh lima jarak: 2,3 km, 0,9 km, 1,9 km, 2,6 km, dan 3,6 km. Ada yang mengira 2,49 lebih besar dari 2,9 karena 49 lebih besar dari 9. Persepuluhan 4 lebih kecil dari 9, jadi 2,9 lebih besar.</p>
          <Tabel
            kolom={["Jarak (km)", "Satuan", "Persepuluhan", "Perseratusan"]}
            baris={[
              ["2,3", "2", "3", "0"],
              ["0,9", "0", "9", "0"],
              ["1,9", "1", "9", "0"],
              ["2,6", "2", "6", "0"],
              ["3,6", "3", "6", "0"],
            ]}
          />
          <p>Urutan terdekat ke terjauh: 0,9 km, 1,9 km, 2,3 km, 2,6 km, 3,6 km.</p>
          <Tabel
            kolom={["Urutan", "Nama", "Jarak (km)"]}
            baris={[
              ["1", "Andi", "1,5"],
              ["2", "Anita", "1,9"],
              ["3", "Alma", "2,3"],
              ["4", "Rini", "2,6"],
              ["5", "Fatim", "2,8"],
              ["6", "Dias", "3,1"],
              ["7", "Rido", "3,6"],
              ["8", "Fadilah", "4,7"],
              ["9", "Budi", "10,9"],
              ["10", "Musa", "11,3"],
            ]}
          />
        </Kegiatan>

        <Infografis
          judul="Membandingkan dan mengurutkan desimal"
          aturan="Bandingkan dari kiri tanda koma. Panah hijau menunjuk persepuluhan."
          gambar={<GambarBanding />}
          kolom={["Tempat", "2,9", "2,49"]}
          baris={[
            ["Satuan", "2", "2"],
            ["Persepuluhan", "9", "4"],
          ]}
        />
        <KotakJawaban id={idKuis("C", 3)} soal="Dari lima jarak itu, yang terdekat berapa km?" periksa={desimalNolKomaSembilan} umpan="0,9 km." />
        <KotakJawaban id={idKuis("C", 4)} soal="Dari lima jarak itu, yang terjauh berapa km?" periksa={desimalTigaKomaEnam} umpan="3,6 km." />
        <KotakJawaban id={idKuis("C", 5)} soal="Siapa yang rumahnya paling dekat, atau berapa km jaraknya?" periksa={(teks) => namaAtauAngka(teks, "andi", "1.5", desimalSatuKomaLima)} umpan="Andi, 1,5 km." />
        <KotakJawaban id={idKuis("C", 6)} soal="Siapa yang rumahnya paling jauh, atau berapa km jaraknya?" periksa={(teks) => namaAtauAngka(teks, "musa", "11.3", (nilai) => desimalUtuh(nilai, "11.3"))} umpan="Musa, 11,3 km." />

        <Kegiatan label="Latihan 1.3">
          <p><Teks anak="1. Kain sepanjang 3/4 meter. Gambar pecahannya, lalu ubah menjadi desimal." /></p>
          <p>2. Suhu tertinggi tahun 2015: Sumatra Selatan 37,2; Sumatra Utara 33,3; Nusa Tenggara Timur 36,6; Sulawesi Tengah 38,5; Kalimantan Utara 36,8. Urutkan dari yang tertinggi.</p>
          <p>3. Lompat jauh: Arman 3,7 m, Bayu 3,6 m, Didi 2,9 m. Siapa yang paling jauh dan siapa yang paling dekat?</p>
          <p><Teks anak="4. Pada label, protein 5 g, lemak 10 g, karbohidrat 30 g, serat pangan 2 g, dan natrium 100 mg. Natrium 100 mg sama dengan 0,1 g. Zat mana yang paling besar, mana yang paling kecil, dan bagaimana urutannya?" /></p>
        </Kegiatan>
        <KotakJawaban id={idKuis("C", 2)} soal="3/4 meter dalam desimal?" periksa={desimalTigaPerEmpat} umpan="3/4 = 75/100 = 0,75." />
        <KotakJawaban id={idKuis("C", 7)} soal="Provinsi dengan suhu tertinggi, atau tuliskan suhunya." periksa={(teks) => namaAtauAngka(teks, "sulawesi", "38.5", desimalTigaDelapanKomaLima)} umpan="Sulawesi Tengah, 38,5. Urutan dari yang tertinggi: 38,5; 37,2; 36,8; 36,6; 33,3." />
        <KotakJawaban id={idKuis("C", 8)} soal="Siapa yang lompatannya paling jauh?" periksa={(teks) => teks.toLowerCase().includes("arman") || desimalTigaKomaTujuh(teks)} umpan="Arman, 3,7 m." />
        <KotakJawaban id={idKuis("C", 9)} soal="Siapa yang lompatannya paling dekat?" periksa={(teks) => teks.toLowerCase().includes("didi") || desimalDuaKomaSembilan(teks)} umpan="Didi, 2,9 m." />
        <KotakJawaban id={idKuis("C", 10)} soal="Zat dengan komposisi paling besar, atau tuliskan massanya dalam gram." periksa={(teks) => namaAtauAngka(teks, "karbohidrat", "30", (nilai) => utuh(nilai, "30"))} umpan="Karbohidrat, 30 g. Urutan dari yang terkecil: natrium 0,1 g; serat 2 g; protein 5 g; lemak 10 g; karbohidrat 30 g." />
        <KotakJawaban id={idKuis("C", 11)} soal="Zat dengan komposisi paling kecil, atau tuliskan massanya dalam gram." periksa={(teks) => teks.toLowerCase().includes("natrium") || desimalUtuh(teks, "0.1")} umpan="Natrium, 0,1 g. Seratus miligram sama dengan 0,1 g." />
        <Kegiatan label="Refleksi subbab">
          <p>Bandingkan desimal dari kiri tanda koma. Urutkan setelah nilai tempatnya diketahui.</p>
        </Kegiatan>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Refleksi" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Apakah kamu sudah dapat mengalikan pecahan?</li>
          <li>Apakah kamu sudah dapat membagi pecahan?</li>
          <li>Apakah kamu dapat membedakan pecahan dan desimal?</li>
          <li>Apakah kamu dapat membandingkan dua desimal?</li>
          <li>Apakah kamu dapat mengurutkan desimal?</li>
        </ul>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Uji Kompetensi" />
        <KotakJawaban id={idKuis("D", 0)} soal="Pak Arman menempuh 630 km. Setelah 2/5 perjalanan, berapa km yang sudah ditempuh?" periksa={(teks) => utuh(teks, "252")} umpan="2/5 × 630 = 252 km." />
        <KotakJawaban id={idKuis("D", 1)} soal="Dini mendapat pesanan 100 porsi. Yang selesai 3/4 pesanan. Berapa porsi?" periksa={(teks) => utuh(teks, "75")} umpan="3/4 × 100 = 75 porsi." />
        <KotakJawaban id={idKuis("D", 2)} soal="Keluarga Dias memakai 2/3 kg beras tiap hari. Persediaan 50 kg. Habis dalam berapa hari?" periksa={(teks) => utuh(teks, "75")} umpan="50 ÷ 2/3 = 75 hari." />
        <KotakJawaban id={idKuis("D", 3)} soal="Rania punya 5/8 potong kue. Kue itu memenuhi 4 kotak sama rata. Bagian kue tiap kotak?" periksa={limaPerTigaPuluhDua} umpan="5/8 ÷ 4 = 5/32." />
        <KotakJawaban id={idKuis("D", 4)} soal="Pak Made sudah mengecat 5 4/5 m². Tuliskan bentuk desimalnya." periksa={desimalLimaKomaDelapan} umpan="4/5 = 0,8, jadi 5,8." />
      </section>

      <section className="space-y-3 border-t-4 border-amber-400 pt-6">
        <JudulBagian anak="Pengayaan" />
        <p className="text-sm font-semibold text-slate-800">Bagian ini terpisah dari soal inti. Buku memakainya untuk pecahan kali pecahan, pecahan dibagi pecahan, dan desimal yang berulang.</p>
        <Kegiatan label="Perkalian pecahan">
          <p><Teks anak="Tangki terisi 1/2. Hari ini terpakai 1/3 dari air yang ada. Bagian yang terpakai 1/2 × 1/3 = 1/6. Kesimpulannya: pembilang dikali pembilang, penyebut dikali penyebut." /></p>
        </Kegiatan>
        <Infografis
          judul="Perkalian pecahan dengan pecahan"
          aturan="Panah lurus: Pembilang1 per Penyebut1 dikali Pembilang2 per Penyebut2."
          gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="1" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" />}
          kolom={["Peran", "Hitung"]}
          baris={[
            ["Pembilang1 × pembilang2", "1 × 1 = 1"],
            ["Penyebut1 × penyebut2", "2 × 3 = 6"],
            ["Hasil", "1/6"],
          ]}
        />
        <Kegiatan label="Pembagian pecahan">
          <p><Teks anak="3 gelas air memenuhi 2/3 botol. Satu pertiga botol memerlukan 3/2 gelas. Satu botol penuh memerlukan 3 ÷ 2/3 = 9/2 gelas." /></p>
          <p><Teks anak="1/2 gelas memenuhi 3/4 botol. Satu perempat botol memerlukan 1/6 gelas. Satu botol penuh memerlukan 1/2 ÷ 3/4 = 2/3 gelas." /></p>
          <p>Kesimpulannya: membagi pecahan dengan pecahan sama dengan mengalikan kebalikan pecahan pembagi.</p>
        </Kegiatan>
        <Infografis
          judul="Pembagian pecahan dengan pecahan"
          aturan="Panah silang: Pembilang1 per Penyebut1 dibagi Pembilang2 per Penyebut2."
          gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="4" operasi="÷" arah="silang" hasilAtas="1 × 4" hasilBawah="2 × 3" akhirAtas="4" akhirBawah="6" catatan="4/6 sama dengan 2/3." />}
          kolom={["Peran", "Hitung"]}
          baris={[
            ["Pembilang1 × penyebut2", "1 × 4 = 4"],
            ["Penyebut1 × pembilang2", "2 × 3 = 6"],
            ["Hasil", "4/6 = 2/3"],
          ]}
        />
        <Kegiatan label="Desimal berulang">
          <p><Teks anak="Rani punya 1/3 liter jus jeruk dan 1/6 liter jus jambu. Dengan kalkulator, 1/3 = 0,333… dan 1/6 = 0,1666…" /></p>
        </Kegiatan>
        <Infografis
          judul="Desimal berulang"
          aturan="Jika penyebut tidak bisa dijadikan 10 atau 100, angka hijau berulang."
          gambar={<GambarBerulang />}
          kolom={["Pecahan", "Desimal pada kalkulator"]}
          baris={[
            ["1/3", "0,333…"],
            ["1/6", "0,1666…"],
          ]}
        />
      </section>
    </article>
  );
}
