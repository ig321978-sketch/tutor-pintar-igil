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

function hasilUtuh(teks: string, angka: string): boolean {
  const s = rapat(teks).replace(/\d+\/\d+/g, " ");
  return new RegExp(`(?<!\\d)${angka}(?!\\d)`).test(s);
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

function Jawaban({ anak }: { anak: string }) {
  return <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-black leading-8 text-emerald-900"><Teks anak={`Jawaban: ${anak}`} /></p>;
}

function Kegiatan({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">{label}</p>
      <div className="space-y-2 text-sm font-semibold leading-8 text-slate-800">{children}</div>
    </div>
  );
}

function PolaCerita({ adegan, materi, logika, langkah, jawaban }: { adegan: ReactNode; materi: ReactNode; logika?: ReactNode; langkah: ReactNode; jawaban: string }) {
  return (
    <>
      <Kegiatan label="Adegan">{adegan}</Kegiatan>
      <Kegiatan label="Materi">{materi}</Kegiatan>
      {logika ? <Kegiatan label="Logika Pemahaman">{logika}</Kegiatan> : null}
      <Kegiatan label="Langkah Perhitungan">{langkah}</Kegiatan>
      <Jawaban anak={jawaban} />
    </>
  );
}

function BarisLangkah({ anak, gambar }: { anak: string; gambar?: ReactNode }) {
  return (
    <>
      <p><Teks anak={anak} /></p>
      {gambar}
    </>
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

function GambarBerulang({ pecahan = "keduanya" }: { pecahan?: "sepertiga" | "perenam" | "keduanya" }) {
  const susun = (atas: string, bawah: string) => (
    <span className="inline-flex flex-col items-center">
      <span className="mb-1 min-h-4 text-[0.65rem] font-bold leading-4 text-slate-500">Pembilang</span>
      <AngkaSusun atas={atas} bawah={bawah} bingkai />
      <span className="mt-1 min-h-4 text-[0.65rem] font-bold leading-4 text-slate-500">Penyebut</span>
    </span>
  );
  const sepertiga = pecahan !== "perenam";
  const perenam = pecahan !== "sepertiga";
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
      {sepertiga ? (
        <div className="flex items-center gap-2">
          {susun("1", "3")}
          <span className="text-2xl font-black text-slate-900">=</span>
          <span className="flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900">0,<span className="text-green-700">333</span>…</span>
            <span className="text-lg font-black leading-none text-green-700">↑</span>
            <span className="text-[0.65rem] font-bold text-green-700">berulang</span>
          </span>
        </div>
      ) : null}
      {perenam ? (
        <div className="flex items-center gap-2">
          {susun("1", "6")}
          <span className="text-2xl font-black text-slate-900">=</span>
          <span className="flex flex-col items-center">
            <span className="text-2xl font-black text-slate-900">0,1<span className="text-green-700">666</span>…</span>
            <span className="text-lg font-black leading-none text-green-700">↑</span>
            <span className="text-[0.65rem] font-bold text-green-700">berulang</span>
          </span>
        </div>
      ) : null}
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

function PilihanDuaPertiga() {
  const jeruk = (jumlah: number, kunci: string) => Array.from({ length: jumlah }, (_, indeks) => <span key={`${kunci}-${indeks}`} className="h-6 w-6 rounded-full bg-orange-400" />);
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <figure className="space-y-1">
        <Petak kolom={10} isi={[...Array(6).fill("isi"), ...Array(4).fill("kosong")]} keterangan="a." />
      </figure>
      <figure className="space-y-1">
        <div className="h-24 w-24 rounded-full border-4 border-amber-800" style={{ background: "conic-gradient(#f59e0b 0deg 90deg, #fde68a 90deg 360deg)" }} aria-label="Pizza empat potong, satu potong dilingkari" />
        <figcaption className="text-xs font-semibold leading-6 text-slate-600">b. Bagian pizza yang dilingkari.</figcaption>
      </figure>
      <figure className="space-y-1">
        <div className="space-y-1" aria-label="Delapan jeruk di dalam tanda, empat jeruk di luar">
          <div className="grid w-max grid-cols-4 gap-1 rounded-lg border-2 border-rose-600 p-1">{jeruk(8, "dalam")}</div>
          <div className="grid w-max grid-cols-4 gap-1 px-1">{jeruk(4, "luar")}</div>
        </div>
        <figcaption className="text-xs font-semibold leading-6 text-slate-600">c. Bagian jeruk yang diberi tanda.</figcaption>
      </figure>
    </div>
  );
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

function SoalLatihan({ anak, id, periksa, jawaban, tanya = "Tuliskan hasilnya." }: { anak: string; id: string; periksa: (teks: string) => boolean; jawaban: string; tanya?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={anak} /></p>
      <KotakJawaban id={id} soal={tanya} periksa={periksa} umpan="" jawaban={jawaban} />
    </div>
  );
}

function KotakJawaban({ id, soal = "", periksa, umpan, jawaban }: { id: string; soal?: string; periksa: (teks: string) => boolean; umpan: string; jawaban?: string }) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const [bukaJawaban, setBukaJawaban] = useState(false);
  const kirim = () => {
    const tepat = periksa(isi);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-white px-3 py-3">
      <label className="block text-sm font-bold leading-8 text-slate-800">
        {soal ? <Teks anak={soal} /> : null}
        <input aria-label={soal || "Jawaban"} value={isi} onChange={(event) => { setIsi(event.target.value); setStatus(null); }} className={`${soal ? "mt-2" : ""} w-full rounded-lg border border-slate-300 px-3 py-2 text-base font-semibold text-slate-900`} />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={kirim} className="rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">Periksa</button>
        {jawaban ? <button type="button" onClick={() => setBukaJawaban((terbuka) => !terbuka)} className="rounded-full border border-[#1C01A5] bg-white px-4 py-2 text-sm font-black text-[#1C01A5]" aria-expanded={bukaJawaban}>Jawaban</button> : null}
      </div>
      {bukaJawaban && jawaban ? (
        <div className="rounded-xl bg-[#F8F7FF] px-3 py-2 text-sm font-semibold leading-8 text-slate-800">
          <p className="font-black text-[#1C01A5]">Langkah penyelesaian</p>
          <p><Teks anak={jawaban} /></p>
        </div>
      ) : null}
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

      <section className="space-y-3">
        <JudulBagian anak="Pembuka Bab" />
        <Kegiatan label="Adegan">
          <Gambar src="/doodle-mtk/mtk-6-bab1-penampungan.jpg" alt="Agam dan Ayah mengambil air dari penampungan di kebun yang kering." keterangan="Agam membantu Ayah mengambil air di penampungan." />
          <p>Agam menghampiri Ayah di penampungan kebun. Musim kemarau. Ayah mengatakan air yang tersisa masih dua pertiga bagian. Ayah bertanya, jika hari ini terpakai seperlima dari air yang tersisa, berapa bagian yang terpakai.</p>
        </Kegiatan>
        <Kegiatan label="Materi">
          <p><Teks anak="Penampungan air masih terisi 2/3 bagian. Hari ini terpakai 1/5 dari air yang tersisa." /></p>
        </Kegiatan>
        <Kegiatan label="Logika Pemahaman">
          <p><Teks anak="Bagian 2/3 yang berarti 1 itu dibagi 5, atau dikali 1/5." /></p>
        </Kegiatan>
        <Kegiatan label="Langkah Perhitungan">
          <p><Teks anak="A. 2/3 dibagi 5, artinya 2/3 : 5/1 = (2 × 1) : (3 × 5) = 2/15." /></p>
          <GambarPasangan kiriAtas="2" kiriBawah="3" kananAtas="5" kananBawah="1" operasi="÷" arah="silang" hasilAtas="2 × 1" hasilBawah="3 × 5" akhirAtas="2" akhirBawah="15" catatan="Kotak merah pada 2/3. Panah hijau menyilang." />
          <p><Teks anak="B. 2/3 dikali 1/5, artinya 2/3 × 1/5 = (2 × 1) : (3 × 5) = 2/15." /></p>
          <GambarPasangan kiriAtas="2" kiriBawah="3" kananAtas="1" kananBawah="5" operasi="×" arah="lurus" hasilAtas="2 × 1" hasilBawah="3 × 5" akhirAtas="2" akhirBawah="15" catatan="Kotak merah pada 2/3. Panah hijau lurus." />
        </Kegiatan>
        <Jawaban anak="2/15 bagian." />
        <Kegiatan label="Adegan">
          <p>Ayah bertanya lagi. Air yang tersisa akan dipakai selama dua hari, dibagi sama banyak. Ayah ingin tahu bagian air untuk tiap hari.</p>
          <p>Agam memakai air seperlunya, karena musim kemarau membuat banyak daerah kekurangan air.</p>
        </Kegiatan>
        <Kegiatan label="Materi">
          <p><Teks anak="Air sisa 2/3 itu akan dipakai selama 2 hari, dibagi sama banyak." /></p>
        </Kegiatan>
        <Kegiatan label="Logika Pemahaman">
          <p><Teks anak="Bagian 2/3 yang berarti 1 itu dibagi 2, atau dikali 1/2." /></p>
        </Kegiatan>
        <Kegiatan label="Langkah Perhitungan">
          <p><Teks anak="A. 2/3 dibagi 2, artinya 2/3 : 2/1 = (2 × 1) : (3 × 2) = 2/6 = 1/3." /></p>
          <GambarPasangan kiriAtas="2" kiriBawah="3" kananAtas="2" kananBawah="1" operasi="÷" arah="silang" hasilAtas="2 × 1" hasilBawah="3 × 2" akhirAtas="2" akhirBawah="6" catatan="Kotak merah pada 2/3. Panah hijau menyilang. 2/6 sama dengan 1/3." />
          <p><Teks anak="B. 2/3 dikali 1/2, artinya 2/3 × 1/2 = (2 × 1) : (3 × 2) = 2/6 = 1/3." /></p>
          <GambarPasangan kiriAtas="2" kiriBawah="3" kananAtas="1" kananBawah="2" operasi="×" arah="lurus" hasilAtas="2 × 1" hasilBawah="3 × 2" akhirAtas="2" akhirBawah="6" catatan="Kotak merah pada 2/3. Panah hijau lurus. 2/6 sama dengan 1/3." />
        </Kegiatan>
        <Jawaban anak="2/6 bagian, yaitu 1/3 bagian tiap hari." />
        <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="Gambar mana yang menunjukkan 2/3 bagian?" /></p>
        <PilihanDuaPertiga />
        <KotakJawaban id={idKuis("A", 9)} periksa={gambarJeruk} umpan="" jawaban="a. Batang biru 6/10. b. Pizza 1/4. c. Jeruk 8/12 = 2/3. Jawabannya gambar c." />
      </section>

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

      <section className="space-y-4">
        <JudulBagian anak="A. Perkalian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Perkalian Bilangan Asli dengan Pecahan</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-ember-besar.jpg" alt="Agam dan Ayah menyiram kebun dengan ember besar." keterangan="Satu ember besar menyiram 2 m² kebun." />
              <p>Pagi yang panas. Agam membantu Ayah menyiram kebun. Ayah mengangkat ember besar. Satu ember membuat tanah basah seluas dua meter persegi. Ayah menuang lima ember, lalu bertanya berapa luas kebun yang sudah basah.</p>
            </>
          }
          materi={<p><Teks anak="Satu ember besar menyiram 2 m². Ada 5 ember besar." /></p>}
          logika={<p><Teks anak="Lima ember, tiap ember 2 m². Keduanya bilangan asli, jadi hitung 5 × 2." /></p>}
          langkah={
            <>
              <BarisLangkah anak="5 × 2 = 10." />
              <Tabel kolom={["Banyak ember besar", "Luas kebun (m²)"]} baris={[["1", "2"], ["5", "10"]]} />
            </>
          }
          jawaban="10 m²."
        />
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-ember-kecil.jpg" alt="Agam memegang ember kecil di samping kebun." keterangan="Ember kecil menyiram sebagian kebun. Bagian 3/5 ada pada petak di bawah." />
              <p>Petak di ujung kebun lebih sempit. Ayah menandai satu meter persegi menjadi lima kotak. Ember kecil hanya mengisi tiga kotak. Agam menuang dua ember kecil dan ingin tahu luas yang basah.</p>
              <Petak kolom={5} isi={["isi", "isi", "isi", "kosong", "kosong"]} keterangan="Satu ember kecil: 3 kotak dari 5, yaitu 3/5 m²." />
            </>
          }
          materi={<p><Teks anak="Satu ember kecil menyiram 3/5 m². Agam memakai 2 ember kecil." /></p>}
          logika={
            <>
              <p><Teks anak="Dua ember berarti bagian 3/5 m² dihitung dua kali." /></p>
              <Rumus anak="a × b/c = (a × b)/c" />
            </>
          }
          langkah={
            <>
              <BarisLangkah anak="A. 3/5 + 3/5 = 6/5." />
              <BarisLangkah anak="B. 2/1 × 3/5 = (2 × 3) : (1 × 5) = 6/5." gambar={<GambarPasangan kiriAtas="2" kiriBawah="1" kananAtas="3" kananBawah="5" operasi="×" arah="lurus" hasilAtas="2 × 3" hasilBawah="1 × 5" akhirAtas="6" akhirBawah="5" catatan="Kotak merah pada 2/1. Panah hijau lurus." />} />
              <p>1 m² dibagi menjadi 5 kolom sama. Satu ember kecil mengisi 3 kolom. Satu ember sama dengan satu baris.</p>
              <TabelEmber baris={1} keterangan="1 baris, 5 kolom: 3 penuh dan 2 kosong. Hasilnya 3/5 m²." />
              <p>2 ember sama dengan 2 baris. Tiap baris sama: 3 kolom penuh dan 2 kolom kosong.</p>
              <TabelEmber baris={2} keterangan="Kolom penuh: 3 + 3 = 6. Tiap baris tetap 5 bagian, jadi 6/5 m²." />
            </>
          }
          jawaban="6/5 m²."
        />
        <PolaCerita
          adegan={<p>Dua ember kecil belum menutup petak itu. Ayah berkata, pakai lima ember kecil. Agam menyusun lima baris di tanah. Tiap baris tetap tiga kotak penuh.</p>}
          materi={<p><Teks anak="Satu ember kecil menyiram 3/5 m². Ada 5 ember kecil." /></p>}
          logika={<p><Teks anak="Lima ember kecil berarti bagian 3/5 m² dihitung lima kali." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 3/5 + 3/5 + 3/5 + 3/5 + 3/5 = 15/5 = 3." />
              <BarisLangkah anak="B. 5/1 × 3/5 = (5 × 3) : (1 × 5) = 15/5 = 3." gambar={<GambarPasangan kiriAtas="5" kiriBawah="1" kananAtas="3" kananBawah="5" operasi="×" arah="lurus" hasilAtas="5 × 3" hasilBawah="1 × 5" akhirAtas="15" akhirBawah="5" catatan="Kotak merah pada 5/1. Panah hijau lurus. 15/5 sama dengan 3." />} />
              <p>5 ember sama dengan 5 baris dengan pola yang sama. Banyak baris kali 3 kolom penuh. Penyebut tetap 5.</p>
              <TabelEmber baris={5} keterangan="Kolom penuh: 5 × 3 = 15. 15/5 = 3 m²." />
              <p><Teks anak="Coba buktikan: apakah hasil kali bilangan asli dengan pecahan selalu lebih kecil? Pada ember, 5 × 3/5 = 3, dan 3 lebih kecil dari 5. 2 × 3/5 = 6/5, dan 6/5 lebih kecil dari 2. Jika pecahannya lebih kecil dari 1, hasilnya lebih kecil daripada bilangan aslinya." /></p>
            </>
          }
          jawaban="3 m²."
        />
        <PolaCerita
          adegan={<p>Sore hari Ibu mengisi botol minum. Satu botol hanya dua pertiga liter. Ibu menyusun lima botol di meja dapur. Agam bertanya, kalau semua dituang ke dalam panci, berapa liter airnya?</p>}
          materi={<p><Teks anak="Satu botol berisi 2/3 liter air. Ada 5 botol." /></p>}
          logika={<p><Teks anak="Lima botol berarti 2/3 liter dihitung lima kali." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 2/3 + 2/3 + 2/3 + 2/3 + 2/3 = 10/3 = 3 + 1/3." />
              <BarisLangkah anak="B. 5/1 × 2/3 = (5 × 2) : (1 × 3) = 10/3 = 3 + 1/3." gambar={<GambarPasangan kiriAtas="5" kiriBawah="1" kananAtas="2" kananBawah="3" operasi="×" arah="lurus" hasilAtas="5 × 2" hasilBawah="1 × 3" akhirAtas="10" akhirBawah="3" catatan="Kotak merah pada 5/1. Panah hijau lurus. 10/3 sama dengan 3 + 1/3." />} />
            </>
          }
          jawaban="10/3 liter, yaitu 3 + 1/3 liter."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Satu gelas berisi 2/5 liter jus. Agam menuang 4 gelas. Berapa liter jus seluruhnya?" id={idKuis("A", 10)} periksa={(teks) => pecahan(teks, "8/5")} jawaban="Ada 2/5 liter sebanyak 4 gelas. A. 2/5 + 2/5 + 2/5 + 2/5 = 8/5. B. 4/1 × 2/5 = (4 × 2) : (1 × 5) = 8/5. Jawabannya 8/5 liter." />
        <SoalLatihan anak="2. Satu petak kebun luasnya 3/4 m². Ada 2 petak seperti itu. Berapa luas seluruhnya?" id={idKuis("A", 11)} periksa={(teks) => pecahan(teks, "6/4") || pecahan(teks, "3/2")} jawaban="Ada 3/4 m² sebanyak 2 petak. A. 3/4 + 3/4 = 6/4 = 3/2. B. 2/1 × 3/4 = (2 × 3) : (1 × 4) = 6/4 = 3/2. Jawabannya 3/2 m²." />
        <SoalLatihan anak="3. Satu kantong pupuk beratnya 1/5 kg. Agam membeli 5 kantong. Berapa kg seluruhnya?" id={idKuis("A", 12)} periksa={(teks) => hasilUtuh(teks, "1") || pecahan(teks, "5/5")} jawaban="Ada 1/5 kg sebanyak 5 kantong. A. 1/5 + 1/5 + 1/5 + 1/5 + 1/5 = 5/5 = 1. B. 5/1 × 1/5 = (5 × 1) : (1 × 5) = 5/5 = 1. Jawabannya 1 kg." />
        <SoalLatihan anak="4. Luas yang disiram 5 ember besar, dalam m²?" id={idKuis("A", 0)} periksa={jumlahSepuluh} jawaban="Ada 2 m² sebanyak 5 ember. 5 × 2 = 10. Jawabannya 10 m²." />
        <SoalLatihan anak="5. Luas yang disiram 2 ember kecil, dalam m²?" id={idKuis("A", 1)} periksa={enamPerLima} jawaban="Ada 3/5 m² sebanyak 2 ember. A. 3/5 + 3/5 = 6/5. B. 2/1 × 3/5 = (2 × 3) : (1 × 5) = 6/5. Jawabannya 6/5 m²." />
        <SoalLatihan anak="6. Luas yang disiram 5 ember kecil, dalam m²?" id={idKuis("A", 2)} periksa={jumlahTiga} jawaban="Ada 3/5 m² sebanyak 5 ember. A. 3/5 + 3/5 + 3/5 + 3/5 + 3/5 = 15/5 = 3. B. 5/1 × 3/5 = (5 × 3) : (1 × 5) = 15/5 = 3. Jawabannya 3 m²." />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Perkalian Pecahan dengan Bilangan Asli</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-pohon.jpg" alt="Agam berdiri di kebun pohon mangga." keterangan="Kebun mangga Agam. Pohonnya ada 15." />
              <p>Agam berjalan bersama Ayah di antara pohon mangga. Pohonnya ada lima belas. Ayah menunjuk sebagian pohon. Itu mangga manalagi, dua pertiga dari semua pohon. Ayah meminta Agam menghitung pohon manalaginya.</p>
            </>
          }
          materi={
            <>
              <p><Teks anak="Ada 15 pohon mangga. 2/3 dari pohon itu adalah mangga manalagi." /></p>
              <p>Bagi 15 pohon menjadi 3 bagian, lalu gabungkan 2 bagian.</p>
            </>
          }
          logika={
            <>
              <p><Teks anak="15 pohon dibagi 3, lalu 2 bagian digabung. Itu sama dengan 2/3 dikali 15." /></p>
              <Rumus anak="a/c × b = (a × b)/c" />
            </>
          }
          langkah={
            <>
              <BarisLangkah anak="A. 15 : 3 = 5. Dua bagian: 5 + 5 = 10." />
              <BarisLangkah anak="B. 2/3 × 15/1 = (2 × 15) : (3 × 1) = 30/3 = 10." gambar={<GambarPasangan kiriAtas="2" kiriBawah="3" kananAtas="15" kananBawah="1" operasi="×" arah="lurus" hasilAtas="2 × 15" hasilBawah="3 × 1" akhirAtas="30" akhirBawah="3" catatan="Kotak merah pada 2/3. Panah hijau lurus. 30/3 sama dengan 10." />} />
            </>
          }
          jawaban="10 pohon mangga manalagi."
        />
        <PolaCerita
          adegan={<p>Ibu memetik dua puluh jeruk. Jeruk itu dibagi rata ke empat keranjang. Satu keranjang diberikan ke tetangga. Agam menghitung isi keranjang itu. Ibu bertanya lagi, apakah seperempat dari dua puluh sama hasilnya dengan dua puluh dikali seperempat.</p>}
          materi={<p><Teks anak="1/4 dari 20 jeruk." /></p>}
          logika={<p><Teks anak="Satu keranjang dari empat keranjang sama dengan 20 dibagi 4. Mengalikan 20 dengan 1/4 memberi hasil yang sama." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 20 : 4 = 5." />
              <BarisLangkah anak="B. 20 × 1/4 = 20/4 = 5. 1/4 × 20 juga 5." gambar={<GambarPasangan kiriAtas="20" kiriBawah="1" kananAtas="1" kananBawah="4" operasi="×" arah="lurus" hasilAtas="20 × 1" hasilBawah="1 × 4" akhirAtas="20" akhirBawah="4" catatan="Kotak merah pada 20. Panah hijau lurus. 20/4 sama dengan 5." />} />
            </>
          }
          jawaban="5."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ada 12 mangga. 3/4 bagian sudah masak. Berapa mangga yang masak?" id={idKuis("A", 13)} periksa={(teks) => hasilUtuh(teks, "9")} jawaban="12 mangga dibagi 4, lalu 3 bagian digabung. A. 12 : 4 = 3. Tiga bagian: 3 + 3 + 3 = 9. B. 3/4 × 12/1 = (3 × 12) : (4 × 1) = 36/4 = 9. Jawabannya 9 mangga." />
        <SoalLatihan anak="2. Ada 20 pensil. 2/5 bagian berwarna merah. Berapa pensil merah?" id={idKuis("A", 14)} periksa={(teks) => hasilUtuh(teks, "8")} jawaban="20 pensil dibagi 5, lalu 2 bagian digabung. A. 20 : 5 = 4. Dua bagian: 4 + 4 = 8. B. 2/5 × 20/1 = (2 × 20) : (5 × 1) = 40/5 = 8. Jawabannya 8 pensil." />
        <SoalLatihan anak="3. Ada 18 buku. 1/3 bagian buku cerita. Berapa buku cerita?" id={idKuis("A", 15)} periksa={(teks) => hasilUtuh(teks, "6")} jawaban="18 buku dibagi 3, lalu 1 bagian diambil. A. 18 : 3 = 6. B. 1/3 × 18/1 = (1 × 18) : (3 × 1) = 18/3 = 6. Jawabannya 6 buku." />

        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan 1.1</p>
        <div className="space-y-2">
          <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="1. Hani punya 4 pita. Tiap pita panjangnya 3/4 m. Satu pita digambar 1 m yang dibagi 4 bagian sama, lalu 3 bagian diarsir." /></p>
          <Petak kolom={4} isi={["isi", "isi", "isi", "kosong"]} keterangan="Satu pita: 3 bagian dari 4, yaitu 3/4 m. Hani punya 4 pita seperti ini." />
          <KotakJawaban id={idKuis("A", 3)} soal="Panjang seluruh pita Hani, dalam meter?" periksa={jumlahTiga} umpan="" jawaban="Ada 3/4 m sebanyak 4 pita. A. 3/4 + 3/4 + 3/4 + 3/4 = 12/4 = 3. B. 4/1 × 3/4 = (4 × 3) : (1 × 4) = 12/4 = 3. Jawabannya 3 meter." />
        </div>
        <SoalLatihan anak="2. Fina membuat 75 pastel. Keluarga memakan 2/15 bagian. Berapa pastel yang sudah dimakan?" id={idKuis("A", 4)} periksa={jumlahSepuluh} jawaban="75 pastel dibagi 15, lalu 2 bagian digabung. A. 75 : 15 = 5. Dua bagian: 5 + 5 = 10. B. 2/15 × 75/1 = (2 × 75) : (15 × 1) = 150/15 = 10. Jawabannya 10 pastel." />
        <SoalLatihan anak="Berapa pastel yang belum dimakan?" id={idKuis("A", 5)} periksa={jumlahEnamPuluhLima} jawaban="75 − 10 = 65. Jawabannya 65 pastel." />
        <SoalLatihan anak="3. Ada 180 siswa kelas 6. 1/6 memilih musik. Berapa siswa yang memilih musik?" id={idKuis("A", 6)} periksa={jumlahTigaPuluh} jawaban="180 siswa dibagi 6, atau dikali 1/6. A. 180 : 6 = 30. B. 1/6 × 180 = 180/6 = 30. Jawabannya 30 siswa." />
        <SoalLatihan anak="2/3 dari siswa musik itu juga memilih melukis. Berapa siswa yang memilih melukis?" id={idKuis("A", 7)} periksa={jumlahDuaPuluh} jawaban="30 siswa dibagi 3, lalu 2 bagian digabung. A. 30 : 3 = 10. Dua bagian: 10 + 10 = 20. B. 2/3 × 30/1 = (2 × 30) : (3 × 1) = 60/3 = 20. Jawabannya 20 siswa." />
        <SoalLatihan anak="Pecahan siswa kelas 6 yang memilih melukis?" id={idKuis("A", 8)} periksa={sepersembilan} jawaban="20 dari 180. A. 20/180 = 1/9. B. Pembilang dan penyebut dibagi 20: (20 : 20) : (180 : 20) = 1/9. Jawabannya 1/9." />
        <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="4. Buat cerita untuk 1/4 × 20 dan untuk 20 × 1/4." /></p>
        <Kegiatan label="Refleksi subbab">
          <p>Bagaimana cara mengalikan bilangan asli dengan pecahan?</p>
          <p>Bagaimana cara mengalikan pecahan dengan bilangan asli?</p>
          <p>Keduanya sama: kali pembilang, penyebut tetap.</p>
        </Kegiatan>
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Pembagian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Pembagian Pecahan dengan Bilangan Asli</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-botol.jpg" alt="Satu botol air dan tiga gelas kosong di meja." keterangan="Satu botol air akan dibagi rata ke 3 gelas." />
              <p>Agam, Ayah, dan Ibu duduk di teras. Ada satu botol air penuh, satu liter. Tiga gelas kosong menanti. Air dibagi rata supaya tidak ada yang lebih banyak. Agam membayangkan botol itu satu kotak penuh yang dibagikan ke tiga gelas.</p>
            </>
          }
          materi={<p><Teks anak="Isi botol 1 liter. Air dibagi rata ke 3 gelas." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1 : 3 = 1/3." />
              <BarisLangkah anak="B. 1 × 1/3 = 1/3." gambar={<GambarPasangan kiriAtas="1" kiriBawah="1" kananAtas="1" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 1" hasilBawah="1 × 3" akhirAtas="1" akhirBawah="3" catatan="Kotak merah pada 1. Panah hijau lurus." />} />
              <Tabel kolom={["Gelas", "Isi"]} baris={[["1", "1/3 liter"], ["2", "1/3 liter"], ["3", "1/3 liter"]]} />
            </>
          }
          jawaban="1/3 liter tiap gelas."
        />
        <PolaCerita
          adegan={<p>Botol kedua tidak penuh. Isinya hanya setengah liter. Gelasnya tetap tiga, untuk Agam, Ayah, dan Ibu. Agam melihat airnya lebih sedikit, lalu bertanya berapa liter tiap gelas.</p>}
          materi={<p><Teks anak="Isi botol 1/2 liter. Air dibagi rata ke 3 gelas." /></p>}
          logika={
            <>
              <p><Teks anak="Yang dibagi sekarang hanya 1/2 liter, gelasnya tetap 3. Tiap gelas mendapat lebih sedikit daripada tadi." /></p>
              <Rumus anak="1/a ÷ b = 1/a × 1/b" />
            </>
          }
          langkah={
            <>
              <BarisLangkah anak="A. 1/2 : 3/1 = (1 × 1) : (2 × 3) = 1/6." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="1" operasi="÷" arah="silang" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 1/2 × 1/3 = (1 × 1) : (2 × 3) = 1/6." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="1" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau lurus." />} />
            </>
          }
          jawaban="1/6 liter tiap gelas."
        />
        <PolaCerita
          adegan={<p>Botol terakhir lebih sedikit lagi, hanya sepertiga liter. Tiga gelas yang sama masih menunggu. Agam heran. Tiap gelas pasti mendapat bagian yang lebih kecil.</p>}
          materi={<p><Teks anak="Isi botol 1/3 liter. Air dibagi rata ke 3 gelas." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1/3 : 3/1 = (1 × 1) : (3 × 3) = 1/9." gambar={<GambarPasangan kiriAtas="1" kiriBawah="3" kananAtas="3" kananBawah="1" operasi="÷" arah="silang" hasilAtas="1 × 1" hasilBawah="3 × 3" akhirAtas="1" akhirBawah="9" catatan="Kotak merah pada 1/3. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 1/3 × 1/3 = (1 × 1) : (3 × 3) = 1/9." gambar={<GambarPasangan kiriAtas="1" kiriBawah="3" kananAtas="1" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 1" hasilBawah="3 × 3" akhirAtas="1" akhirBawah="9" catatan="Kotak merah pada 1/3. Panah hijau lurus." />} />
            </>
          }
          jawaban="1/9 liter tiap gelas."
        />
        <PolaCerita
          adegan={<p>Rini membuat dua adonan kue. Sirup yang ada empat pertiga liter. Sirup dibagi sama untuk kedua adonan. Rini ingin tahu bagian tiap adonan.</p>}
          materi={<p><Teks anak="Sirup 4/3 liter dibagi untuk 2 adonan." /></p>}
          logika={<p><Teks anak="Sirup 4/3 liter dibagi 2. Membagi pembilang saja, 4 dibagi 2, penyebut tetap 3, kebetulan sama dengan 2/3." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 4/3 : 2/1 = (4 × 1) : (3 × 2) = 4/6 = 2/3." gambar={<GambarPasangan kiriAtas="4" kiriBawah="3" kananAtas="2" kananBawah="1" operasi="÷" arah="silang" hasilAtas="4 × 1" hasilBawah="3 × 2" akhirAtas="4" akhirBawah="6" catatan="Kotak merah pada 4/3. Panah hijau menyilang. 4/6 sama dengan 2/3." />} />
              <BarisLangkah anak="B. 4/3 × 1/2 = (4 × 1) : (3 × 2) = 4/6 = 2/3." gambar={<GambarPasangan kiriAtas="4" kiriBawah="3" kananAtas="1" kananBawah="2" operasi="×" arah="lurus" hasilAtas="4 × 1" hasilBawah="3 × 2" akhirAtas="4" akhirBawah="6" catatan="Kotak merah pada 4/3. Panah hijau lurus. 4/6 sama dengan 2/3." />} />
            </>
          }
          jawaban="2/3."
        />
        <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="Buat cerita sendiri untuk 4/3 ÷ 2." /></p>
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ada 3/4 liter sirup. Sirup dibagi rata ke 2 gelas. Berapa liter tiap gelas?" id={idKuis("B", 10)} periksa={(teks) => pecahan(teks, "3/8")} jawaban="Bagian 3/4 dibagi 2, atau dikali 1/2. A. 3/4 : 2/1 = (3 × 1) : (4 × 2) = 3/8. B. 3/4 × 1/2 = (3 × 1) : (4 × 2) = 3/8. Jawabannya 3/8 liter." />
        <SoalLatihan anak="2. Ada 2/3 kg gula. Gula dibagi rata untuk 4 adonan. Berapa kg tiap adonan?" id={idKuis("B", 11)} periksa={(teks) => seperenam(teks) || pecahan(teks, "2/12")} jawaban="Bagian 2/3 dibagi 4, atau dikali 1/4. A. 2/3 : 4/1 = (2 × 1) : (3 × 4) = 2/12 = 1/6. B. 2/3 × 1/4 = (2 × 1) : (3 × 4) = 2/12 = 1/6. Jawabannya 1/6 kg." />
        <SoalLatihan anak="3. Ada pita 4/5 meter. Pita dibagi rata menjadi 2. Berapa meter tiap bagian?" id={idKuis("B", 12)} periksa={(teks) => pecahan(teks, "2/5") || pecahan(teks, "4/10")} jawaban="Bagian 4/5 dibagi 2, atau dikali 1/2. A. 4/5 : 2/1 = (4 × 1) : (5 × 2) = 4/10 = 2/5. B. 4/5 × 1/2 = (4 × 1) : (5 × 2) = 4/10 = 2/5. Jawabannya 2/5 meter." />
        <SoalLatihan anak="4. 1 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" id={idKuis("B", 0)} periksa={sepertiga} jawaban="1 liter dibagi 3, atau dikali 1/3. A. 1 : 3 = 1/3. B. 1 × 1/3 = 1/3. Jawabannya 1/3 liter." />
        <SoalLatihan anak="5. 1/3 liter dibagi 3 gelas. Isi tiap gelas, dalam liter?" id={idKuis("B", 1)} periksa={sepersembilan} jawaban="Bagian 1/3 dibagi 3, atau dikali 1/3. A. 1/3 : 3/1 = (1 × 1) : (3 × 3) = 1/9. B. 1/3 × 1/3 = (1 × 1) : (3 × 3) = 1/9. Jawabannya 1/9 liter." />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Pembagian Bilangan Asli dengan Pecahan</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-jus.jpg" alt="Tiga botol minuman dan tumpukan gelas kecil." keterangan="Jus jeruk, jus jambu, dan air mineral, masing-masing 3 liter." />
              <p>Besok ada tamu. Ibu menyiapkan tiga liter jus jeruk. Gelas tamu kecil, tiap gelas hanya seperempat liter. Agam bertanya berapa gelas yang bisa diisi.</p>
            </>
          }
          materi={<p><Teks anak="Ada 3 liter jus jeruk. Tiap gelas berisi 1/4 liter." /></p>}
          logika={
            <>
              <p><Teks anak="Dalam 1 liter muat 4 gelas kecil. Tiga liter berarti hitungan itu diulang 3 kali." /></p>
              <Rumus anak="a ÷ b/c = a × c/b" />
            </>
          }
          langkah={
            <>
              <BarisLangkah anak="A. 3/1 : 1/4 = (3 × 4) : (1 × 1) = 12." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="1" kananBawah="4" operasi="÷" arah="silang" hasilAtas="3 × 4" hasilBawah="1 × 1" akhirAtas="12" catatan="Kotak merah pada 3/1. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 3 × 4 = 12." />
            </>
          }
          jawaban="12 gelas."
        />
        <PolaCerita
          adegan={<p>Selain jus jeruk, Ibu juga menyiapkan tiga liter jus jambu. Gelas untuk jambu lebih besar, setengah liter. Agam mengira gelasnya lebih sedikit daripada jus jeruk.</p>}
          materi={<p><Teks anak="Ada 3 liter jus jambu. Tiap gelas berisi 1/2 liter." /></p>}
          logika={<p><Teks anak="Gelas 1/2 liter lebih besar. Dalam 1 liter hanya muat 2 gelas, jadi jumlah gelas lebih sedikit." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 3/1 : 1/2 = (3 × 2) : (1 × 1) = 6." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="1" kananBawah="2" operasi="÷" arah="silang" hasilAtas="3 × 2" hasilBawah="1 × 1" akhirAtas="6" catatan="Kotak merah pada 3/1. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 3 × 2 = 6." />
            </>
          }
          jawaban="6 gelas."
        />
        <PolaCerita
          adegan={<p>Air mineral juga tiga liter. Gelasnya kecil sekali, hanya seperlima liter. Ibu berkata jumlah gelasnya akan banyak.</p>}
          materi={<p><Teks anak="Ada 3 liter air mineral. Tiap gelas berisi 1/5 liter." /></p>}
          logika={<p><Teks anak="Gelas 1/5 liter kecil. Dalam 1 liter muat 5 gelas, jadi jumlah gelas lebih banyak." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 3/1 : 1/5 = (3 × 5) : (1 × 1) = 15." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="1" kananBawah="5" operasi="÷" arah="silang" hasilAtas="3 × 5" hasilBawah="1 × 1" akhirAtas="15" catatan="Kotak merah pada 3/1. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 3 × 5 = 15." />
            </>
          }
          jawaban="15 gelas."
        />
        <PolaCerita
          adegan={<p>Sisa air tiga liter diukur dengan botol kecil. Satu botol hanya dua perlima liter. Agam heran. Botolnya kecil, jadi jumlah botol bisa lebih banyak daripada tiga.</p>}
          materi={<p><Teks anak="3 liter air diukur dengan botol 2/5 liter." /></p>}
          logika={<p><Teks anak="Botol 2/5 liter lebih kecil dari 1 liter. Karena wadahnya kecil, jumlah botol lebih besar dari 3." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 3/1 : 2/5 = (3 × 5) : (1 × 2) = 15/2 = 7 1/2." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="2" kananBawah="5" operasi="÷" arah="silang" hasilAtas="3 × 5" hasilBawah="1 × 2" akhirAtas="15" akhirBawah="2" catatan="Kotak merah pada 3/1. Panah hijau menyilang. 15/2 sama dengan 7 + 1/2." />} />
              <BarisLangkah anak="B. 3/1 × 5/2 = (3 × 5) : (1 × 2) = 15/2 = 7 1/2." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="5" kananBawah="2" operasi="×" arah="lurus" hasilAtas="3 × 5" hasilBawah="1 × 2" akhirAtas="15" akhirBawah="2" catatan="Kotak merah pada 3/1. Panah hijau lurus. 15/2 sama dengan 7 + 1/2." />} />
            </>
          }
          jawaban="15/2 botol, yaitu 7 1/2 botol."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ada 2 liter jus. Tiap gelas berisi 1/2 liter. Berapa gelas yang terisi?" id={idKuis("B", 13)} periksa={(teks) => hasilUtuh(teks, "4")} jawaban="2 liter dibagi 1/2, atau dikali 2. A. 2 : 1/2 = (2 × 2) : (1 × 1) = 4. B. 2 × 2 = 4. Jawabannya 4 gelas." />
        <SoalLatihan anak="2. Ada 4 liter air. Tiap gelas berisi 1/5 liter. Berapa gelas yang terisi?" id={idKuis("B", 14)} periksa={(teks) => hasilUtuh(teks, "20")} jawaban="4 liter dibagi 1/5, atau dikali 5. A. 4 : 1/5 = (4 × 5) : (1 × 1) = 20. B. 4 × 5 = 20. Jawabannya 20 gelas." />
        <SoalLatihan anak="3. Ada 2 liter sirup. Tiap botol berisi 2/3 liter. Berapa botol yang terisi?" id={idKuis("B", 15)} periksa={(teks) => hasilUtuh(teks, "3")} jawaban="2 liter dibagi 2/3, atau dikali 3/2. A. 2/1 : 2/3 = (2 × 3) : (1 × 2) = 6/2 = 3. B. 2 × 3/2 = (2 × 3) : (1 × 2) = 6/2 = 3. Jawabannya 3 botol." />
        <SoalLatihan anak="4. Banyak gelas 1/2 liter dari 3 liter jus jambu?" id={idKuis("B", 2)} periksa={jumlahEnam} jawaban="3 liter dibagi 1/2, atau dikali 2. A. 3 : 1/2 = (3 × 2) : (1 × 1) = 6. B. 3 × 2 = 6. Jawabannya 6 gelas." />
        <SoalLatihan anak="5. Banyak gelas 1/5 liter dari 3 liter air mineral?" id={idKuis("B", 3)} periksa={jumlahLimaBelas} jawaban="3 liter dibagi 1/5, atau dikali 5. A. 3 : 1/5 = (3 × 5) : (1 × 1) = 15. B. 3 × 5 = 15. Jawabannya 15 gelas." />
        <SoalLatihan anak="6. Banyak botol 2/5 liter dari 3 liter air?" id={idKuis("B", 4)} periksa={limaBelasPerDua} jawaban="3 liter dibagi 2/5, atau dikali 5/2. A. 3/1 : 2/5 = (3 × 5) : (1 × 2) = 15/2 = 7 1/2. B. 3 × 5/2 = 15/2 = 7 1/2. Jawabannya 15/2 botol." />

        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan 1.2</p>
        <SoalLatihan anak="1. Pak Rudi membagi 2/4 bagian tanah kepada 3 anak secara adil. Berapa bagian tanah tiap anak?" id={idKuis("B", 5)} periksa={seperenam} jawaban="Bagian 2/4 dibagi 3, atau dikali 1/3. A. 2/4 : 3/1 = (2 × 1) : (4 × 3) = 2/12 = 1/6. B. 2/4 × 1/3 = (2 × 1) : (4 × 3) = 2/12 = 1/6. Jawabannya 1/6 bagian." />
        <SoalLatihan anak="2. Rina punya 6 kg gula. Tiap adonan bolu memakai 3/4 kg. Berapa kue bolu yang dibuat?" id={idKuis("B", 6)} periksa={jumlahDelapan} jawaban="6 kg dibagi 3/4, atau dikali 4/3. A. 6/1 : 3/4 = (6 × 4) : (1 × 3) = 24/3 = 8. B. 6 × 4/3 = (6 × 4) : (1 × 3) = 24/3 = 8. Jawabannya 8 bolu." />
        <SoalLatihan anak="3. Astri punya 5 batang cokelat. Tiap teman mendapat 2/3 batang. Tuliskan hasil 5 ÷ 2/3." id={idKuis("B", 7)} periksa={limaBelasPerDua} jawaban="5 batang dibagi 2/3, atau dikali 3/2. A. 5/1 : 2/3 = (5 × 3) : (1 × 2) = 15/2 = 7 1/2. B. 5 × 3/2 = (5 × 3) : (1 × 2) = 15/2 = 7 1/2. Jawabannya 15/2." />
        <SoalLatihan anak="Berapa teman Astri yang mendapat bagian penuh?" id={idKuis("B", 8)} periksa={(teks) => utuh(teks, "7")} jawaban="15/2 = 7 1/2, jadi yang mendapat bagian penuh ada 7 teman. Jawabannya 7." />
        <SoalLatihan anak="Sisa cokelat Astri, dalam batang?" id={idKuis("B", 9)} periksa={sepertiga} jawaban="Setengah dari 2/3 batang sama dengan 1/3 batang. Jawabannya 1/3 batang." />
        <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="4. Buat cerita untuk 1/5 ÷ 4 dan untuk 4 ÷ 1/5." /></p>
        <Kegiatan label="Refleksi subbab">
          <p>Bagaimana cara membagi pecahan dengan bilangan asli?</p>
          <p>Bagaimana cara membagi bilangan asli dengan pecahan?</p>
          <p>Pecahan dibagi bilangan asli dikali dengan satu per pembagi. Bilangan asli dibagi pecahan dikali dengan kebalikan pecahan itu.</p>
        </Kegiatan>
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Bilangan Desimal" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Mengubah Pecahan Menjadi Desimal</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-timbangan.jpg" alt="Agam dan Ibu di depan timbangan buah. Jarum timbangan tanpa angka." keterangan="Timbangan buah untuk jeruk 1/2 kg dan salak 1/5 kg." />
              <p>Di pasar, Ibu berhenti di depan timbangan buah. Ibu meminta jeruk setengah kilogram. Jarum timbangan tidak menulis pecahan. Angka yang muncul 0,50 kg. Agam ingin tahu kenapa setengah kilogram tertulis seperti itu.</p>
            </>
          }
          materi={<p><Teks anak="Ibu meminta jeruk 1/2 kg. Timbangan menunjukkan 0,50 kg." /></p>}
          logika={
            <>
              <p><Teks anak="Angka di kiri koma menempati satuan. Angka pertama di kanan koma menempati persepuluhan, nilainya 1/10. Angka kedua menempati perseratusan, nilainya 1/100." /></p>
              <p><Teks anak="1/2 kg sama dengan 5 persepuluhan atau 50 perseratusan. Keduanya tertulis 0,5. Pecahan berpenyebut 2, 5, atau kelipatannya diubah dulu menjadi penyebut 10 atau 100." /></p>
            </>
          }
          langkah={
            <>
              <BarisLangkah anak="A. 1/2 = (1 × 5) : (2 × 5) = 5/10 = 0,5." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="5" kananBawah="10" operasi="×5" arah="ubah" akhirAtas="0,5" catatan="Kotak merah pada 1/2. Panah hijau ke penyebut 10." />} />
              <BarisLangkah anak="B. 1/2 = (1 × 50) : (2 × 50) = 50/100 = 0,50." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="50" kananBawah="100" operasi="×50" arah="ubah" akhirAtas="0,50" catatan="Kotak merah pada 1/2. Panah hijau ke penyebut 100. 0,50 sama dengan 0,5." />} />
            </>
          }
          jawaban="0,5 kg, yaitu 0,50 kg."
        />
        <PolaCerita
          adegan={<p>Ibu menunjuk salak. Yang ini seperlima kilogram. Timbangan menunjukkan 0,20 kg. Agam membandingkan dengan jeruk tadi. Salak lebih ringan, angkanya harus lebih kecil dari 0,50.</p>}
          materi={<p><Teks anak="Ibu meminta salak 1/5 kg. Timbangan menunjukkan 0,20 kg." /></p>}
          logika={<p><Teks anak="0,20 sama nilainya dengan 0,2. Nol di belakang tidak menambah berat. Jika penyebut pecahan tidak bisa dijadikan 10 atau 100, desimalnya dibahas di pengayaan." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1/5 = (1 × 2) : (5 × 2) = 2/10 = 0,2." gambar={<GambarPasangan kiriAtas="1" kiriBawah="5" kananAtas="2" kananBawah="10" operasi="×2" arah="ubah" akhirAtas="0,2" catatan="Kotak merah pada 1/5. Panah hijau ke penyebut 10." />} />
              <BarisLangkah anak="B. 1/5 = (1 × 20) : (5 × 20) = 20/100 = 0,20." gambar={<GambarPasangan kiriAtas="1" kiriBawah="5" kananAtas="20" kananBawah="100" operasi="×20" arah="ubah" akhirAtas="0,20" catatan="Kotak merah pada 1/5. Panah hijau ke penyebut 100. 0,20 sama dengan 0,2." />} />
            </>
          }
          jawaban="0,2 kg, yaitu 0,20 kg."
        />
        <PolaCerita
          adegan={<p>Di rumah, Ibu mengukur kain untuk taplak. Kain itu tiga perempat meter. Alat ukur di toko hanya menulis desimal. Agam mengubah panjang kain itu.</p>}
          materi={<p><Teks anak="Kain sepanjang 3/4 meter. Berapa meter dalam desimal?" /></p>}
          logika={<p><Teks anak="Penyebut 4 tidak menjadi 10 dengan bilangan bulat. Panjang kain ini diubah ke penyebut 100." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 3/4 = (3 × 25) : (4 × 25) = 75/100 = 0,75." gambar={<GambarPasangan kiriAtas="3" kiriBawah="4" kananAtas="75" kananBawah="100" operasi="×25" arah="ubah" akhirAtas="0,75" catatan="Kotak merah pada 3/4. Panah hijau ke penyebut 100." />} />
              <BarisLangkah anak="B. 75/100 = 0,75 meter. Penyebut 10 tidak tercapai, jadi yang dipakai penyebut 100." />
            </>
          }
          jawaban="0,75 meter."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ibu membeli 1/4 kg kacang. Berapa kg dalam desimal?" id={idKuis("C", 11)} periksa={(teks) => desimalUtuh(teks, "0.25")} jawaban="A. 1/4 = (1 × 25) : (4 × 25) = 25/100 = 0,25. B. 25/100 = 0,25 kg. Jawabannya 0,25 kg." />
        <SoalLatihan anak="2. Botol berisi 2/5 liter. Berapa liter dalam desimal?" id={idKuis("C", 12)} periksa={(teks) => desimalUtuh(teks, "0.4") || desimalUtuh(teks, "0.40")} jawaban="A. 2/5 = (2 × 2) : (5 × 2) = 4/10 = 0,4. B. 2/5 = (2 × 20) : (5 × 20) = 40/100 = 0,40. Jawabannya 0,4 liter." />
        <SoalLatihan anak="3. Tali sepanjang 7/10 meter. Berapa meter dalam desimal?" id={idKuis("C", 13)} periksa={(teks) => desimalUtuh(teks, "0.7") || desimalUtuh(teks, "0.70")} jawaban="A. 7/10 = 0,7 karena penyebutnya sudah 10. B. 7/10 = (7 × 10) : (10 × 10) = 70/100 = 0,70. Jawabannya 0,7 meter." />
        <SoalLatihan anak="4. Bentuk desimal dari 1/2 kg jeruk?" id={idKuis("C", 0)} periksa={desimalSetengah} jawaban="A. 1/2 = (1 × 5) : (2 × 5) = 5/10 = 0,5. B. 1/2 = (1 × 50) : (2 × 50) = 50/100 = 0,50. Jawabannya 0,5 kg." />
        <SoalLatihan anak="5. Bentuk desimal dari 1/5 kg salak?" id={idKuis("C", 1)} periksa={desimalSeperlima} jawaban="A. 1/5 = (1 × 2) : (5 × 2) = 2/10 = 0,2. B. 1/5 = (1 × 20) : (5 × 20) = 20/100 = 0,20. Jawabannya 0,2 kg." />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Membandingkan dan Mengurutkan Bilangan Desimal</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-jarak.jpg" alt="Beberapa rumah dihubungkan jalan yang panjangnya berbeda menuju pagar sekolah." keterangan="Jarak rumah ke sekolah tidak sama. Angkanya ada pada tabel." />
              <p>Pulang sekolah, Agam menanyai sepuluh teman. Rumahmu berapa kilometer dari sekolah? Jawabannya ia tulis di buku. Agam ingin tahu siapa yang rumahnya paling dekat dan siapa yang paling jauh.</p>
            </>
          }
          materi={
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
          }
          logika={
            <>
              <p><Teks anak="Kiri tanda koma adalah bilangan asli. Kanan tanda koma, angka pertama bernilai persepuluhan (1/10) dan angka kedua bernilai perseratusan (1/100). Bandingkan dari kiri tanda koma, supaya rumah yang dekat tidak tertukar dengan yang jauh." /></p>
            </>
          }
          langkah={
            <>
              <p>Nilai tempat sepuluh jarak itu:</p>
              <BarisLangkah anak="A. Isi nilai tempat: puluhan, satuan, persepuluhan, dan perseratusan." />
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
              <BarisLangkah anak="B. Lima jarak 0,9 km, 1,9 km, 2,3 km, 2,6 km, dan 3,6 km diurut dari satuan terkecil." />
              <Tabel
                kolom={["Jarak (km)", "Satuan", "Persepuluhan", "Perseratusan"]}
                baris={[
                  ["0,9", "0", "9", "0"],
                  ["1,9", "1", "9", "0"],
                  ["2,3", "2", "3", "0"],
                  ["2,6", "2", "6", "0"],
                  ["3,6", "3", "6", "0"],
                ]}
              />
              <p>Urutan sepuluh teman, dari terdekat ke terjauh:</p>
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
            </>
          }
          jawaban="Terdekat Andi, 1,5 km. Terjauh Musa, 11,3 km. Lima jarak dari terdekat: 0,9 km, 1,9 km, 2,3 km, 2,6 km, 3,6 km."
        />
        <PolaCerita
          adegan={<p>Seorang teman melihat dua jarak, 2,49 km dan 2,9 km. Ia berkata 2,49 lebih besar karena 49 lebih besar dari 9. Agam ragu. Mereka membuka buku catatan dan membandingkan kedua angka itu.</p>}
          materi={<p>Mana yang lebih besar, 2,9 atau 2,49?</p>}
          logika={<p>Jangan membandingkan 49 dengan 9. Satuan dulu, lalu persepuluhan. Persepuluhan 4 lebih kecil dari 9.</p>}
          langkah={
            <>
              <BarisLangkah anak="A. Satuan keduanya 2, jadi sama." />
              <BarisLangkah anak="B. Persepuluhan 9 lebih besar dari 4. Perseratusan belum perlu dibanding." gambar={<GambarBanding />} />
              <Tabel kolom={["Tempat", "2,9", "2,49"]} baris={[["Satuan", "2", "2"], ["Persepuluhan", "9", "4"]]} />
            </>
          }
          jawaban="2,9 lebih besar dari 2,49."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Mana yang lebih besar, 3,5 atau 3,45?" id={idKuis("C", 14)} periksa={(teks) => desimalUtuh(teks, "3.5") || desimalUtuh(teks, "3.50")} jawaban="Satuan sama-sama 3. Persepuluhan 5 lebih besar dari 4. Jawabannya 3,5 lebih besar." />
        <SoalLatihan anak="2. Dari 1,2 ; 0,8 ; dan 1,15, mana yang terkecil?" id={idKuis("C", 15)} periksa={(teks) => desimalUtuh(teks, "0.8") || desimalUtuh(teks, "0.80")} jawaban="0,8 satuannya 0, sedangkan 1,15 dan 1,2 satuannya 1. Jawabannya 0,8." />
        <SoalLatihan anak="3. Mana yang lebih besar, 4,6 atau 4,59?" id={idKuis("C", 16)} periksa={(teks) => desimalUtuh(teks, "4.6") || desimalUtuh(teks, "4.60")} jawaban="Satuan sama-sama 4. Persepuluhan 6 lebih besar dari 5. Jawabannya 4,6 lebih besar." />
        <SoalLatihan anak="4. Dari lima jarak 0,9 km, 1,9 km, 2,3 km, 2,6 km, dan 3,6 km, yang terdekat berapa km?" id={idKuis("C", 2)} periksa={desimalNolKomaSembilan} jawaban="Urutan dari satuan terkecil: 0,9 lalu 1,9, 2,3, 2,6, dan 3,6. Jawabannya 0,9 km." />
        <SoalLatihan anak="5. Dari lima jarak itu, yang terjauh berapa km?" id={idKuis("C", 3)} periksa={desimalTigaKomaEnam} jawaban="Satuan terbesar pada lima jarak itu adalah 3. Jawabannya 3,6 km." />
        <SoalLatihan anak="6. Siapa yang rumahnya paling dekat, atau berapa km jaraknya?" id={idKuis("C", 4)} periksa={(teks) => namaAtauAngka(teks, "andi", "1.5", desimalSatuKomaLima)} jawaban="Jarak terkecil pada tabel adalah 1,5 km, yaitu rumah Andi. Jawabannya Andi, 1,5 km." />
        <SoalLatihan anak="7. Siapa yang rumahnya paling jauh, atau berapa km jaraknya?" id={idKuis("C", 5)} periksa={(teks) => namaAtauAngka(teks, "musa", "11.3", (nilai) => desimalUtuh(nilai, "11.3"))} jawaban="Jarak terbesar pada tabel adalah 11,3 km, yaitu rumah Musa. Jawabannya Musa, 11,3 km." />

        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan 1.3</p>
        <SoalLatihan anak="1. Suhu tertinggi tahun 2015: Sumatra Selatan 37,2; Sumatra Utara 33,3; Nusa Tenggara Timur 36,6; Sulawesi Tengah 38,5; Kalimantan Utara 36,8. Provinsi dengan suhu tertinggi, atau tuliskan suhunya." id={idKuis("C", 6)} periksa={(teks) => namaAtauAngka(teks, "sulawesi", "38.5", desimalTigaDelapanKomaLima)} jawaban="Bandingkan dari kiri koma. 38,5 lebih besar dari 37,2, 36,8, 36,6, dan 33,3. Jawabannya Sulawesi Tengah, 38,5." />
        <SoalLatihan anak="2. Lompat jauh: Arman 3,7 m, Bayu 3,6 m, Didi 2,9 m. Siapa yang lompatannya paling jauh?" id={idKuis("C", 7)} periksa={(teks) => teks.toLowerCase().includes("arman") || desimalTigaKomaTujuh(teks)} jawaban="3,7 lebih besar dari 3,6 dan 2,9. Jawabannya Arman, 3,7 m." />
        <SoalLatihan anak="Siapa yang lompatannya paling dekat?" id={idKuis("C", 8)} periksa={(teks) => teks.toLowerCase().includes("didi") || desimalDuaKomaSembilan(teks)} jawaban="2,9 lebih kecil dari 3,6 dan 3,7. Jawabannya Didi, 2,9 m." />
        <SoalLatihan anak="3. Pada label, protein 5 g, lemak 10 g, karbohidrat 30 g, serat pangan 2 g, dan natrium 100 mg. Natrium 100 mg sama dengan 0,1 g. Zat dengan komposisi paling besar, atau tuliskan massanya dalam gram." id={idKuis("C", 9)} periksa={(teks) => namaAtauAngka(teks, "karbohidrat", "30", (nilai) => utuh(nilai, "30"))} jawaban="Urutan dari yang terbesar: karbohidrat 30 g, lemak 10 g, protein 5 g, serat 2 g, natrium 0,1 g. Jawabannya karbohidrat, 30 g." />
        <SoalLatihan anak="Zat dengan komposisi paling kecil, atau tuliskan massanya dalam gram." id={idKuis("C", 10)} periksa={(teks) => teks.toLowerCase().includes("natrium") || desimalUtuh(teks, "0.1")} jawaban="100 mg sama dengan 0,1 g. 0,1 lebih kecil dari 2, 5, 10, dan 30. Jawabannya natrium, 0,1 g." />
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
        <h3 className="text-lg font-black text-[#1C01A5]">Perkalian pecahan dengan pecahan</h3>
        <PolaCerita
          adegan={<p>Musim kemarau belum reda. Tangki kebun tinggal terisi setengah. Hari ini Ayah memakai sepertiga dari air yang ada, bukan sepertiga tangki penuh. Agam menghitung bagian tangki yang terpakai.</p>}
          materi={<p><Teks anak="Tangki terisi 1/2. Hari ini terpakai 1/3 dari air yang ada." /></p>}
          logika={<p><Teks anak="Yang terpakai adalah 1/3 dari air yang ada. Air yang ada baru 1/2 tangki, bukan tangki penuh." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1/2 : 3/1 = (1 × 1) : (2 × 3) = 1/6." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="1" operasi="÷" arah="silang" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 1/2 × 1/3 = (1 × 1) : (2 × 3) = 1/6." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="1" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau lurus." />} />
            </>
          }
          jawaban="1/6 bagian tangki."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. 1/2 × 1/4. Berapa hasilnya?" id={idKuis("E", 0)} periksa={(teks) => pecahan(teks, "1/8")} jawaban="Bagian 1/2 dibagi 4, atau dikali 1/4. A. 1/2 : 4/1 = (1 × 1) : (2 × 4) = 1/8. B. 1/2 × 1/4 = (1 × 1) : (2 × 4) = 1/8. Jawabannya 1/8." />
        <SoalLatihan anak="2. 2/3 × 1/5. Berapa hasilnya?" id={idKuis("E", 1)} periksa={(teks) => pecahan(teks, "2/15")} jawaban="Bagian 2/3 dibagi 5, atau dikali 1/5. A. 2/3 : 5/1 = (2 × 1) : (3 × 5) = 2/15. B. 2/3 × 1/5 = (2 × 1) : (3 × 5) = 2/15. Jawabannya 2/15." />
        <SoalLatihan anak="3. 3/4 × 1/2. Berapa hasilnya?" id={idKuis("E", 2)} periksa={(teks) => pecahan(teks, "3/8")} jawaban="Bagian 3/4 dibagi 2, atau dikali 1/2. A. 3/4 : 2/1 = (3 × 1) : (4 × 2) = 3/8. B. 3/4 × 1/2 = (3 × 1) : (4 × 2) = 3/8. Jawabannya 3/8." />
        <h3 className="text-lg font-black text-[#1C01A5]">Pembagian pecahan dengan pecahan</h3>
        <PolaCerita
          adegan={<p>Agam menuang air ke botol. Tiga gelas sudah dituang, tetapi botol baru terisi dua pertiga. Ayah bertanya, kalau botolnya mau penuh, perlu berapa gelas?</p>}
          materi={<p><Teks anak="3 gelas air memenuhi 2/3 botol. Berapa gelas untuk satu botol penuh?" /></p>}
          logika={<p><Teks anak="Tiga gelas baru mengisi dua pertiga botol. Botol penuh membutuhkan lebih dari tiga gelas." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 3/1 : 2/3 = (3 × 3) : (1 × 2) = 9/2." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="2" kananBawah="3" operasi="÷" arah="silang" hasilAtas="3 × 3" hasilBawah="1 × 2" akhirAtas="9" akhirBawah="2" catatan="Kotak merah pada 3/1. Panah hijau menyilang." />} />
              <BarisLangkah anak="B. 3/1 × 3/2 = (3 × 3) : (1 × 2) = 9/2." gambar={<GambarPasangan kiriAtas="3" kiriBawah="1" kananAtas="3" kananBawah="2" operasi="×" arah="lurus" hasilAtas="3 × 3" hasilBawah="1 × 2" akhirAtas="9" akhirBawah="2" catatan="Kotak merah pada 3/1. Panah hijau lurus." />} />
            </>
          }
          jawaban="9/2 gelas."
        />
        <PolaCerita
          adegan={<p>Botol lain lebih kecil. Setengah gelas saja sudah mengisi tiga perempat botol. Agam bertanya berapa gelas yang dibutuhkan supaya botol itu penuh.</p>}
          materi={<p><Teks anak="1/2 gelas memenuhi 3/4 botol. Berapa gelas untuk satu botol penuh?" /></p>}
          logika={<p><Teks anak="Setengah gelas sudah mengisi sebagian besar botol. Satu botol penuh kurang dari satu gelas." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1/2 : 3/4 = (1 × 4) : (2 × 3) = 4/6 = 2/3." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="4" operasi="÷" arah="silang" hasilAtas="1 × 4" hasilBawah="2 × 3" akhirAtas="4" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau menyilang. 4/6 sama dengan 2/3." />} />
              <BarisLangkah anak="B. 1/2 × 4/3 = (1 × 4) : (2 × 3) = 4/6 = 2/3." gambar={<GambarPasangan kiriAtas="1" kiriBawah="2" kananAtas="4" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 4" hasilBawah="2 × 3" akhirAtas="4" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau lurus. 4/6 sama dengan 2/3." />} />
            </>
          }
          jawaban="2/3 gelas."
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. 1/2 ÷ 1/4. Berapa hasilnya?" id={idKuis("E", 3)} periksa={(teks) => hasilUtuh(teks, "2")} jawaban="1/2 dibagi 1/4, atau dikali 4/1. A. 1/2 : 1/4 = (1 × 4) : (2 × 1) = 4/2 = 2. B. 1/2 × 4/1 = (1 × 4) : (2 × 1) = 4/2 = 2. Jawabannya 2." />
        <SoalLatihan anak="2. 2/3 ÷ 1/3. Berapa hasilnya?" id={idKuis("E", 4)} periksa={(teks) => hasilUtuh(teks, "2")} jawaban="2/3 dibagi 1/3, atau dikali 3/1. A. 2/3 : 1/3 = (2 × 3) : (3 × 1) = 6/3 = 2. B. 2/3 × 3/1 = (2 × 3) : (3 × 1) = 6/3 = 2. Jawabannya 2." />
        <SoalLatihan anak="3. 3/4 ÷ 1/2. Berapa hasilnya?" id={idKuis("E", 5)} periksa={(teks) => pecahan(teks, "3/2") || pecahan(teks, "6/4")} jawaban="3/4 dibagi 1/2, atau dikali 2/1. A. 3/4 : 1/2 = (3 × 2) : (4 × 1) = 6/4 = 3/2. B. 3/4 × 2/1 = (3 × 2) : (4 × 1) = 6/4 = 3/2. Jawabannya 3/2." />
        <h3 className="text-lg font-black text-[#1C01A5]">Desimal berulang</h3>
        <PolaCerita
          adegan={<p>Rani membeli jus jeruk sepertiga liter. Di kasir, angka timbangan tidak berhenti pada satu angka di belakang koma. Rani ingin menuliskannya sebagai desimal.</p>}
          materi={<p><Teks anak="Jus jeruk 1/3 liter diubah menjadi desimal." /></p>}
          logika={<p><Teks anak="Penyebut 3 tidak bisa dijadikan 10 atau 100. Karena itu angka desimalnya berulang." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1 : 3 = 0,333…" />
              <BarisLangkah anak="B. 1/3 = 0,333… Angka 3 berulang." gambar={<GambarBerulang pecahan="sepertiga" />} />
            </>
          }
          jawaban="0,333…"
        />
        <PolaCerita
          adegan={<p>Rani juga membeli jus jambu, hanya seperenam liter. Timbangan lagi-lagi menunjukkan angka yang terus berulang. Rani membandingkannya dengan jus jeruk.</p>}
          materi={<p><Teks anak="Jus jambu 1/6 liter diubah menjadi desimal." /></p>}
          logika={<p><Teks anak="Seperenam juga tidak habis ditulis sebagai persepuluhan. Angka 6 terus muncul di belakang koma." /></p>}
          langkah={
            <>
              <BarisLangkah anak="A. 1 : 6 = 0,1666…" />
              <BarisLangkah anak="B. 1/6 = 0,1666… Angka 6 berulang." gambar={<GambarBerulang pecahan="perenam" />} />
            </>
          }
          jawaban="0,1666…"
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Tuliskan desimal 1/3 sampai tiga angka 3 yang berulang." id={idKuis("E", 6)} periksa={(teks) => rapat(teks).includes("333")} jawaban="A. 1 : 3 = 0,333… B. 1/3 = 0,333… Angka 3 berulang. Jawabannya 0,333…" />
        <SoalLatihan anak="2. Tuliskan desimal 1/6 yang angkanya berulang." id={idKuis("E", 7)} periksa={(teks) => rapat(teks).includes("166")} jawaban="A. 1 : 6 = 0,1666… B. 1/6 = 0,1666… Angka 6 berulang. Jawabannya 0,1666…" />
        <SoalLatihan anak="3. Dari 1/2 dan 1/3, mana yang desimalnya berulang?" id={idKuis("E", 8)} periksa={sepertiga} jawaban="1/2 = 0,5 dan berhenti. 1/3 = 0,333… dan berulang. Jawabannya 1/3." />
      </section>
    </article>
  );
}
