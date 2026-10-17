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

function PolaCerita({ adegan, permasalahan, logika, langkah, judulAdegan = "Adegan" }: { adegan: ReactNode; permasalahan: ReactNode; logika: ReactNode; langkah: ReactNode; judulAdegan?: string }) {
  return (
    <>
      <Kegiatan label={judulAdegan}>{adegan}</Kegiatan>
      <Kegiatan label="Permasalahan">{permasalahan}</Kegiatan>
      <Kegiatan label="Logika Pemahaman">{logika}</Kegiatan>
      <Kegiatan label="Langkah Penyelesaian">{langkah}</Kegiatan>
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

function KartuMetode({ judul, warna, children }: { judul: string; warna: "panah" | "rumus"; children: ReactNode }) {
  const kelas = warna === "rumus" ? "border-[#1C01A5] bg-[#EEF2FF]" : "border-red-600 bg-white";
  const judulKelas = warna === "rumus" ? "text-[#1C01A5]" : "text-red-700";
  return (
    <div className={`space-y-2 rounded-xl border-2 px-4 py-3 ${kelas}`}>
      <h3 className={`text-base font-black uppercase tracking-wide ${judulKelas}`}>{judul}</h3>
      {children}
    </div>
  );
}

function HitungPanah({
  kalimat,
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
  rumus,
  hitung,
}: {
  kalimat: string;
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
  catatan: string;
  rumus: string[];
  hitung: string[];
}) {
  return (
    <div className="space-y-3">
      <KartuMetode judul="Metode Pecahan" warna="panah">
        <p><Teks anak={kalimat} /></p>
        <GambarPasangan
          kiriAtas={kiriAtas}
          kiriBawah={kiriBawah}
          kananAtas={kananAtas}
          kananBawah={kananBawah}
          operasi={operasi}
          arah={arah}
          hasilAtas={hasilAtas}
          hasilBawah={hasilBawah}
          akhirAtas={akhirAtas}
          akhirBawah={akhirBawah}
          catatan={catatan}
        />
      </KartuMetode>
      <KartuMetode judul="Metode Rumus" warna="rumus">
        {rumus.map((anak) => (
          <p key={anak} className="text-base font-black leading-8 text-[#1C01A5]"><Teks anak={anak} /></p>
        ))}
        {hitung.map((anak) => (
          <p key={anak} className="text-sm font-semibold leading-8 text-slate-800"><Teks anak={anak} /></p>
        ))}
      </KartuMetode>
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

function SoalLatihan({ anak, id, periksa, jawaban, tanya = "" }: { anak: string; id: string; periksa: (teks: string) => boolean; jawaban: string; tanya?: string }) {
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
        <Kegiatan label="Adegan 1">
          <Gambar src="/doodle-mtk/mtk-6-bab1-penampungan.jpg" alt="Agam dan Ayah mengambil air dari penampungan di kebun yang kering." keterangan="Agam membantu Ayah mengambil air di penampungan." />
          <p>Agam menghampiri Ayah di penampungan kebun. Musim kemarau. Ayah mengatakan air yang tersisa masih dua pertiga bagian. Ayah bertanya, jika hari ini terpakai seperlima dari air yang tersisa, berapa bagian yang terpakai.</p>
        </Kegiatan>
        <Kegiatan label="Permasalahan">
          <p><Teks anak="Penampungan air masih terisi 2/3 bagian. Hari ini terpakai 1/5 dari air yang tersisa. Berapa bagian yang terpakai?" /></p>
        </Kegiatan>
        <Kegiatan label="Logika Pemahaman">
          <p><Teks anak="Bagian 2/3 yang berarti 1 itu diambil seperlimanya. Jadi 2/3 dikali 1/5." /></p>
        </Kegiatan>
        <Kegiatan label="Langkah Penyelesaian">
          <HitungPanah kalimat="2/3 × 1/5 = (2 × 1) : (3 × 5) = 2/15." kiriAtas="2" kiriBawah="3" kananAtas="1" kananBawah="5" operasi="×" arah="lurus" hasilAtas="2 × 1" hasilBawah="3 × 5" akhirAtas="2" akhirBawah="15" catatan="Kotak merah pada 2/3. Panah hijau lurus."  rumus={["a/b × c/d = (a × c)/(b × d)"]} hitung={["2/3 × 1/5 = (2 × 1)/(3 × 5) = 2/15."]}/>
        </Kegiatan>
        <Kegiatan label="Adegan 2">
          <p>Ayah bertanya lagi. Air yang tersisa akan dipakai selama dua hari, dibagi sama banyak. Ayah ingin tahu bagian air untuk tiap hari.</p>
          <p>Agam memakai air seperlunya, karena musim kemarau membuat banyak daerah kekurangan air.</p>
        </Kegiatan>
        <Kegiatan label="Permasalahan">
          <p><Teks anak="Air sisa 2/3 itu akan dipakai selama 2 hari, dibagi sama banyak. Berapa bagian tiap hari?" /></p>
        </Kegiatan>
        <Kegiatan label="Logika Pemahaman">
          <p><Teks anak="Bagian 2/3 yang berarti 1 itu dibagi rata untuk 2 hari." /></p>
        </Kegiatan>
        <Kegiatan label="Langkah Penyelesaian">
          <HitungPanah kalimat="2/3 : 2/1 = (2 × 1) : (3 × 2) = 2/6 = 1/3." kiriAtas="2" kiriBawah="3" kananAtas="2" kananBawah="1" operasi=":" arah="silang" hasilAtas="2 × 1" hasilBawah="3 × 2" akhirAtas="2" akhirBawah="6" catatan="Kotak merah pada 2/3. Panah hijau menyilang. 2/6 sama dengan 1/3."  rumus={["a/b : c/d = (a × d)/(b × c)"]} hitung={["2/3 : 2/1 = (2 × 1)/(3 × 2) = 2/6 = 1/3."]}/>
        </Kegiatan>
        <p className="text-sm font-semibold leading-8 text-slate-800"><Teks anak="Gambar mana yang menunjukkan 2/3 bagian?" /></p>
        <PilihanDuaPertiga />
        <KotakJawaban id={idKuis("A", 0)} periksa={gambarJeruk} umpan="" jawaban="a. Batang biru 6/10. b. Pizza 1/4. c. Jeruk 8/12 = 2/3. Jawabannya gambar c." />
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
        <JudulBagian anak="Ayo Mengingat" />
        <PolaCerita
          adegan={<p>Agam membawa 20 permen ke kebun. Temannya ada 5. Ia membagi permen itu sampai tidak ada yang lebih banyak.</p>}
          permasalahan={<p><Teks anak="Ada 20 permen untuk 5 teman. Berapa permen tiap teman?" /></p>}
          logika={<p><Teks anak="20 dan 5 sama-sama bilangan asli. Bagi 20 dengan 5. Tidak perlu diubah menjadi pecahan." /></p>}
          langkah={<p><Teks anak="20 : 5 = 4. Tiap teman mendapat 4 permen." /></p>}
        />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="A. Perkalian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Perkalian Bilangan Asli dengan Pecahan</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-ember-besar.jpg" alt="Agam dan Ayah menyiram kebun dengan ember besar." keterangan="Satu ember besar menyiram 2 m² kebun." />
              <p>Ayah mengangkat ember besar. Satu ember membuat tanah basah seluas dua meter persegi. Ayah menuang lima ember, lalu bertanya berapa luas yang sudah basah.</p>
            </>
          }
          permasalahan={<p><Teks anak="Satu ember besar menyiram 2 m². Ada 5 ember besar. Berapa luas yang basah?" /></p>}
          logika={<p><Teks anak="5 dan 2 sama-sama bilangan asli. Luasnya lima kali dua." /></p>}
          langkah={<p><Teks anak="5 × 2 = 10. Kebun yang basah 10 m²." /></p>}
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-ember-kecil.jpg" alt="Agam memegang ember kecil di samping kebun." keterangan="Ember kecil menyiram 3/5 m²." />
              <p>Petak di ujung kebun lebih sempit. Ayah menandai satu meter persegi menjadi lima kotak. Ember kecil hanya mengisi tiga kotak. Agam menuang dua ember kecil dan ingin tahu luas yang basah.</p>
            </>
          }
          permasalahan={<p><Teks anak="Satu ember kecil menyiram 3/5 m². Agam memakai 2 ember kecil. Berapa luas yang basah?" /></p>}
          logika={<p><Teks anak="Ada 2 ember. Tiap ember 3 bagian dari 1/5 m². Dua ember menjadi 6 bagian dari 1/5, yaitu 6/5. Hasil 6/5 lebih kecil dari 2, karena yang dikali pecahan sejati." /></p>}
          langkah={<HitungPanah kalimat="2/1 × 3/5 = (2 × 3) : (1 × 5) = 6/5." kiriAtas="2" kiriBawah="1" kananAtas="3" kananBawah="5" operasi="×" arah="lurus" hasilAtas="2 × 3" hasilBawah="1 × 5" akhirAtas="6" akhirBawah="5" catatan="Kotak merah pada 2/1. Panah hijau lurus. 6 bagian dari 1/5 sama dengan 6/5."  rumus={["a × b/c = (a × b)/c"]} hitung={["2 × 3/5 = (2 × 3)/5 = 6/5."]}/>}
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Ayah bertanya lagi. Kalau ember kecilnya lima, tanah yang basah masih pecahan atau sudah utuh?</p>}
          permasalahan={<p><Teks anak="Satu ember kecil menyiram 3/5 m². Ada 5 ember kecil. Berapa luas yang basah?" /></p>}
          logika={<p><Teks anak="Lima kali tiga per lima. Lima bagian dari 3/5 sama dengan 15 bagian dari 1/5." /></p>}
          langkah={<HitungPanah kalimat="5/1 × 3/5 = (5 × 3) : (1 × 5) = 15/5 = 3." kiriAtas="5" kiriBawah="1" kananAtas="3" kananBawah="5" operasi="×" arah="lurus" hasilAtas="5 × 3" hasilBawah="1 × 5" akhirAtas="15" akhirBawah="5" catatan="Kotak merah pada 5/1. Panah hijau lurus. 15/5 sama dengan 3 m²."  rumus={["a × b/c = (a × b)/c"]} hitung={["5 × 3/5 = (5 × 3)/5 = 15/5 = 3."]}/>}
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Satu gelas berisi 2/5 liter jus. Agam menuang 4 gelas. Berapa liter jus seluruhnya?" id={idKuis("A", 1)} periksa={(teks) => pecahan(teks, "8/5")} jawaban="4 gelas, tiap gelas 2/5 liter. 4/1 × 2/5 = (4 × 2) : (1 × 5) = 8/5. Kotak merah pada 4/1. Panah hijau lurus. Jawabannya 8/5 liter." />
        <SoalLatihan anak="2. Satu petak kebun luasnya 3/4 m². Ada 2 petak seperti itu. Berapa luas seluruhnya?" id={idKuis("A", 2)} periksa={(teks) => pecahan(teks, "6/4") || pecahan(teks, "3/2")} jawaban="2 petak, tiap petak 3/4 m². 2/1 × 3/4 = (2 × 3) : (1 × 4) = 6/4 = 3/2. Kotak merah pada 2/1. Panah hijau lurus. Jawabannya 3/2 m²." />
        <SoalLatihan anak="3. Satu kantong pupuk beratnya 1/5 kg. Agam membeli 5 kantong. Berapa kg seluruhnya?" id={idKuis("A", 3)} periksa={(teks) => hasilUtuh(teks, "1") || pecahan(teks, "5/5")} jawaban="5 kantong, tiap kantong 1/5 kg. 5/1 × 1/5 = (5 × 1) : (1 × 5) = 5/5 = 1. Kotak merah pada 5/1. Panah hijau lurus. Jawabannya 1 kg." />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Perkalian Pecahan dengan Bilangan Asli</h3>
        <PolaCerita
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-pohon.jpg" alt="Agam berdiri di kebun pohon mangga." keterangan="Kebun mangga Agam. Pohonnya ada 15." />
              <p>Agam berjalan bersama Ayah di antara pohon mangga. Pohonnya ada lima belas. Ayah menunjuk sebagian pohon. Itu mangga manalagi, dua pertiga dari semua pohon. Ayah meminta Agam menghitung pohon manalaginya.</p>
            </>
          }
          permasalahan={<p><Teks anak="Ada 15 pohon mangga. 2/3 dari pohon itu adalah mangga manalagi. Berapa pohon manalagi?" /></p>}
          logika={<p><Teks anak="2/3 bagian dari 15 pohon berarti 15 pohon itu dikalikan 2 lalu dibagi 3." /></p>}
          langkah={<HitungPanah kalimat="2/3 × 15/1 = (2 × 15) : (3 × 1) = 30/3 = 10." kiriAtas="2" kiriBawah="3" kananAtas="15" kananBawah="1" operasi="×" arah="lurus" hasilAtas="2 × 15" hasilBawah="3 × 1" akhirAtas="30" akhirBawah="3" catatan="Kotak merah pada 2/3. Panah hijau lurus. 30/3 sama dengan 10."  rumus={["a/c × b = (a × b)/c"]} hitung={["2/3 × 15 = (2 × 15)/3 = 30/3 = 10."]}/>}
        />
        <PolaCerita
          adegan={<p>Agam menulis dua hitungan: seperempat dari 20 jeruk, dan 20 kali seperempat jeruk. Ia memeriksa apakah urutan kali mengubah hasil.</p>}
          permasalahan={<p><Teks anak="Hitung 1/4 × 20 dan 20 × 1/4. Sama atau berbeda?" /></p>}
          logika={<p><Teks anak="Urutan dikali tidak mengubah banyaknya. Seperempat dari 20 sama dengan dua puluh kali seperempat." /></p>}
          langkah={
            <>
              <HitungPanah kalimat="1/4 × 20/1 = (1 × 20) : (4 × 1) = 20/4 = 5." kiriAtas="1" kiriBawah="4" kananAtas="20" kananBawah="1" operasi="×" arah="lurus" hasilAtas="1 × 20" hasilBawah="4 × 1" akhirAtas="20" akhirBawah="4" catatan="Kotak merah pada 1/4. Panah hijau lurus. 20/4 sama dengan 5."  rumus={["a/c × b = (a × b)/c"]} hitung={["1/4 × 20 = (1 × 20)/4 = 20/4 = 5."]}/>
              <HitungPanah kalimat="20/1 × 1/4 = (20 × 1) : (1 × 4) = 20/4 = 5." kiriAtas="20" kiriBawah="1" kananAtas="1" kananBawah="4" operasi="×" arah="lurus" hasilAtas="20 × 1" hasilBawah="1 × 4" akhirAtas="20" akhirBawah="4" catatan="Kotak merah pada 20/1. Panah hijau lurus. Hasilnya tetap 5."  rumus={["a × b/c = (a × b)/c"]} hitung={["20 × 1/4 = (20 × 1)/4 = 20/4 = 5."]}/>
            </>
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ada 12 mangga. 3/4 bagian sudah masak. Berapa mangga yang masak?" id={idKuis("A", 4)} periksa={(teks) => hasilUtuh(teks, "9")} jawaban="Bagi 12 mangga menjadi 4 bagian, lalu gabungkan 3 bagian. 3/4 × 12/1 = (3 × 12) : (4 × 1) = 36/4 = 9. Kotak merah pada 3/4. Panah hijau lurus. Jawabannya 9 mangga." />
        <SoalLatihan anak="2. Ada 20 pensil. 2/5 bagian berwarna merah. Berapa pensil merah?" id={idKuis("A", 5)} periksa={(teks) => hasilUtuh(teks, "8")} jawaban="Bagi 20 pensil menjadi 5 bagian, lalu gabungkan 2 bagian. 2/5 × 20/1 = (2 × 20) : (5 × 1) = 40/5 = 8. Kotak merah pada 2/5. Panah hijau lurus. Jawabannya 8 pensil." />
        <SoalLatihan anak="3. Ada 18 buku. 1/3 bagian buku cerita. Berapa buku cerita?" id={idKuis("A", 6)} periksa={(teks) => hasilUtuh(teks, "6")} jawaban="Bagi 18 buku menjadi 3 bagian, lalu ambil 1 bagian. 1/3 × 18/1 = (1 × 18) : (3 × 1) = 18/3 = 6. Kotak merah pada 1/3. Panah hijau lurus. Jawabannya 6 buku." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="B. Pembagian Pecahan" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Pembagian Pecahan dengan Bilangan Asli</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-botol.jpg" alt="Agam menuang satu liter air ke tiga gelas." keterangan="Satu liter air untuk tiga gelas." />
              <p>Botol pertama penuh, isinya satu liter. Agam menuang air itu rata ke gelasnya, gelas Ayah, dan gelas Ibu.</p>
            </>
          }
          permasalahan={<p><Teks anak="Ada 1 liter air. Air dibagi rata ke 3 gelas. Berapa liter tiap gelas?" /></p>}
          logika={<p><Teks anak="1 dan 3 sama-sama bilangan asli. Satu liter dibagi tiga bagian yang sama." /></p>}
          langkah={<p><Teks anak="1 : 3 = 1/3. Tiap gelas terisi 1/3 liter." /></p>}
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Botol kedua tidak penuh. Isinya hanya setengah liter. Gelasnya tetap tiga. Agam melihat airnya lebih sedikit, lalu bertanya berapa liter tiap gelas.</p>}
          permasalahan={<p><Teks anak="Isi botol 1/2 liter. Air dibagi rata ke 3 gelas. Berapa liter tiap gelas?" /></p>}
          logika={<p><Teks anak="Setengah liter dibagi rata ke 3 gelas. Tiap gelas mendapat sepertiga dari setengah liter." /></p>}
          langkah={<HitungPanah kalimat="1/2 : 3/1 = (1 × 1) : (2 × 3) = 1/6." kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="1" operasi=":" arah="silang" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau menyilang."  rumus={["1/a : b = 1/a × 1/b"]} hitung={["1/2 : 3 = 1/2 × 1/3 = 1/6."]}/>}
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Botol ketiga lebih sedikit lagi, hanya sepertiga liter. Tiga gelas yang sama masih menunggu. Agam membagi air itu sekali lagi.</p>}
          permasalahan={<p><Teks anak="Ada 1/3 liter air. Air dibagi rata ke 3 gelas. Berapa liter tiap gelas?" /></p>}
          logika={<p><Teks anak="Sepertiga dibagi lagi menjadi 3. Bagiannya menjadi 9, dan tiap bagian lebih kecil, yaitu 1/9." /></p>}
          langkah={<HitungPanah kalimat="1/3 : 3/1 = (1 × 1) : (3 × 3) = 1/9." kiriAtas="1" kiriBawah="3" kananAtas="3" kananBawah="1" operasi=":" arah="silang" hasilAtas="1 × 1" hasilBawah="3 × 3" akhirAtas="1" akhirBawah="9" catatan="Kotak merah pada 1/3. Panah hijau menyilang."  rumus={["1/a : b = 1/a × 1/b"]} hitung={["1/3 : 3 = 1/3 × 1/3 = 1/9."]}/>}
        />
        <PolaCerita
          judulAdegan="Adegan 4"
          adegan={<p>Rini punya pita empat pertiga meter. Ia memotong pita itu menjadi dua bagian sama panjang, lalu menulis 4 dibagi 2 di atas penyebut 3.</p>}
          permasalahan={<p><Teks anak="Ada pita 4/3 meter. Pita dibagi rata menjadi 2. Berapa meter tiap bagian?" /></p>}
          logika={<p><Teks anak="Pembilang 4 habis dibagi 2, jadi 4 dibagi 2 tetap di atas penyebut 3. Panah menyilang harus memberi hasil yang sama." /></p>}
          langkah={
            <>
              <p><Teks anak="Cara Rini: 4 : 2 = 2, penyebut tetap 3, jadi 2/3." /></p>
              <HitungPanah kalimat="4/3 : 2/1 = (4 × 1) : (3 × 2) = 4/6 = 2/3." kiriAtas="4" kiriBawah="3" kananAtas="2" kananBawah="1" operasi=":" arah="silang" hasilAtas="4 × 1" hasilBawah="3 × 2" akhirAtas="4" akhirBawah="6" catatan="Kotak merah pada 4/3. Panah hijau menyilang. 4/6 sama dengan 2/3."  rumus={["a/b : c = a/b × 1/c"]} hitung={["4/3 : 2 = 4/3 × 1/2 = 4/6 = 2/3."]}/>
            </>
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ada 3/4 liter sirup. Sirup dibagi rata ke 2 gelas. Berapa liter tiap gelas?" id={idKuis("B", 0)} periksa={(teks) => pecahan(teks, "3/8")} jawaban="3/4 liter dibagi rata ke 2 gelas. 3/4 : 2/1 = (3 × 1) : (4 × 2) = 3/8. Kotak merah pada 3/4. Panah hijau menyilang. Jawabannya 3/8 liter." />
        <SoalLatihan anak="2. Ada 2/3 kg gula. Gula dibagi rata untuk 4 adonan. Berapa kg tiap adonan?" id={idKuis("B", 1)} periksa={(teks) => seperenam(teks) || pecahan(teks, "2/12")} jawaban="2/3 kg dibagi rata untuk 4 adonan. 2/3 : 4/1 = (2 × 1) : (3 × 4) = 2/12 = 1/6. Kotak merah pada 2/3. Panah hijau menyilang. Jawabannya 1/6 kg." />
        <SoalLatihan anak="3. Ada pita 4/5 meter. Pita dibagi rata menjadi 2. Berapa meter tiap bagian?" id={idKuis("B", 2)} periksa={(teks) => pecahan(teks, "2/5") || pecahan(teks, "4/10")} jawaban="4/5 meter dibagi rata menjadi 2. 4/5 : 2/1 = (4 × 1) : (5 × 2) = 4/10 = 2/5. Kotak merah pada 4/5. Panah hijau menyilang. Jawabannya 2/5 meter." />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Pembagian Bilangan Asli dengan Pecahan</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-jus.jpg" alt="Tiga botol minuman dan tumpukan gelas kecil." keterangan="Jus jeruk 3 liter. Tiap gelas 1/4 liter." />
              <p>Besok ada tamu. Ibu menyiapkan tiga liter jus jeruk. Gelas tamu kecil, tiap gelas hanya seperempat liter. Agam bertanya berapa gelas yang bisa diisi.</p>
            </>
          }
          permasalahan={<p><Teks anak="Ada 3 liter jus jeruk. Tiap gelas berisi 1/4 liter. Berapa gelas yang terisi?" /></p>}
          logika={<p><Teks anak="Dalam 1 liter muat 4 gelas seperempat liter. Jus ada 3 liter, jadi gelasnya 3 kali 4." /></p>}
          langkah={<HitungPanah kalimat="3/1 : 1/4 = (3 × 4) : (1 × 1) = 12." kiriAtas="3" kiriBawah="1" kananAtas="1" kananBawah="4" operasi=":" arah="silang" hasilAtas="3 × 4" hasilBawah="1 × 1" akhirAtas="12" catatan="Kotak merah pada 3/1. Panah hijau menyilang. Hasil 12 lebih besar dari 3, karena gelasnya lebih kecil dari 1 liter."  rumus={["a : b/c = a × c/b"]} hitung={["3 : 1/4 = 3 × 4 = 12."]}/>}
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Jus jambu juga 3 liter. Gelasnya lebih besar, tiap gelas setengah liter. Air mineral 3 liter dituang ke gelas seperlima liter.</p>}
          permasalahan={<p><Teks anak="Berapa gelas untuk 3 liter jika tiap gelas 1/2 liter? Berapa gelas jika tiap gelas 1/5 liter?" /></p>}
          logika={<p><Teks anak="Cara yang sama dengan gelas seperempat. Hitung dulu berapa gelas dalam 1 liter, lalu kali 3." /></p>}
          langkah={
            <>
              <HitungPanah kalimat="3/1 : 1/2 = (3 × 2) : (1 × 1) = 6." kiriAtas="3" kiriBawah="1" kananAtas="1" kananBawah="2" operasi=":" arah="silang" hasilAtas="3 × 2" hasilBawah="1 × 1" akhirAtas="6" catatan="Dalam 1 liter ada 2 gelas setengah liter. Tiga liter menjadi 6 gelas."  rumus={["a : b/c = a × c/b"]} hitung={["3 : 1/2 = 3 × 2 = 6."]}/>
              <HitungPanah kalimat="3/1 : 1/5 = (3 × 5) : (1 × 1) = 15." kiriAtas="3" kiriBawah="1" kananAtas="1" kananBawah="5" operasi=":" arah="silang" hasilAtas="3 × 5" hasilBawah="1 × 1" akhirAtas="15" catatan="Dalam 1 liter ada 5 gelas seperlima liter. Tiga liter menjadi 15 gelas."  rumus={["a : b/c = a × c/b"]} hitung={["3 : 1/5 = 3 × 5 = 15."]}/>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Air mineral yang sama, 3 liter, sekarang dituang ke botol kecil. Satu botol hanya muat dua perlima liter. Agam menghitung botolnya, dan pembaginya bukan pecahan satuan.</p>}
          permasalahan={<p><Teks anak="Ada 3 liter air. Tiap botol 2/5 liter. Berapa botol yang terisi?" /></p>}
          logika={<p><Teks anak="Dalam 1 liter ada 5/2 bagian dari 2/5 liter. Untuk 3 liter, kalikan 3 dengan 5/2. Hasilnya lebih besar dari 3 karena botolnya lebih kecil dari 1 liter." /></p>}
          langkah={<HitungPanah kalimat="3/1 : 2/5 = (3 × 5) : (1 × 2) = 15/2." kiriAtas="3" kiriBawah="1" kananAtas="2" kananBawah="5" operasi=":" arah="silang" hasilAtas="3 × 5" hasilBawah="1 × 2" akhirAtas="15" akhirBawah="2" catatan="Kotak merah pada 3/1. Panah hijau menyilang. 15/2 sama dengan 7 1/2 botol."  rumus={["a : b/c = a × c/b"]} hitung={["3 : 2/5 = 3 × 5/2 = 15/2."]}/>}
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ada 2 liter jus. Tiap gelas berisi 1/2 liter. Berapa gelas yang terisi?" id={idKuis("B", 3)} periksa={(teks) => hasilUtuh(teks, "4")} jawaban="Dalam 1 liter muat 2 gelas setengah liter. 2/1 : 1/2 = (2 × 2) : (1 × 1) = 4. Kotak merah pada 2/1. Panah hijau menyilang. Jawabannya 4 gelas." />
        <SoalLatihan anak="2. Rina punya 6 kg gula. Tiap adonan bolu memakai 3/4 kg. Berapa kue bolu yang dibuat?" id={idKuis("B", 4)} periksa={jumlahDelapan} jawaban="6 kg dibagi 3/4 kg tiap bolu. 6/1 : 3/4 = (6 × 4) : (1 × 3) = 24/3 = 8. Kotak merah pada 6/1. Panah hijau menyilang. Jawabannya 8 bolu." />
        <SoalLatihan anak="3. Astri punya 5 batang cokelat. Tiap teman mendapat 2/3 batang. Tuliskan hasil 5 ÷ 2/3." id={idKuis("B", 5)} periksa={limaBelasPerDua} jawaban="5 batang dibagi 2/3 batang. 5/1 : 2/3 = (5 × 3) : (1 × 2) = 15/2. Kotak merah pada 5/1. Panah hijau menyilang. Jawabannya 15/2." />
      </section>

      <section className="space-y-4">
        <JudulBagian anak="C. Bilangan Desimal" />
        <h3 className="text-lg font-black text-[#1C01A5]">1. Mengubah Pecahan Menjadi Desimal</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={
            <>
              <Gambar src="/doodle-mtk/mtk-6-bab1-timbangan.jpg" alt="Agam dan Ibu di depan timbangan buah." keterangan="Timbangan menulis 0,50 kg untuk jeruk 1/2 kg." />
              <p>Di pasar, Ibu meminta jeruk setengah kilogram. Jarum timbangan tidak menulis pecahan. Angka yang muncul 0,50 kg. Agam ingin tahu kenapa setengah kilogram tertulis seperti itu.</p>
            </>
          }
          permasalahan={<p><Teks anak="Jeruk 1/2 kg. Berapa kilogram dalam desimal?" /></p>}
          logika={<p><Teks anak="Setengah dapat ditulis 5 persepuluhan atau 50 perseratusan. Keduanya 0,5 dan 0,50, sama nilainya." /></p>}
          langkah={
            <>
              <HitungPanah kalimat="1/2 = (1 × 5) : (2 × 5) = 5/10 = 0,5." kiriAtas="1" kiriBawah="2" kananAtas="5" kananBawah="10" operasi="×5" arah="ubah" catatan="Pembilang dan penyebut dikali 5."  rumus={["a/b = (a × k)/(b × k)"]} hitung={["1/2 = (1 × 5)/(2 × 5) = 5/10 = 0,5."]}/>
              <HitungPanah kalimat="1/2 = (1 × 50) : (2 × 50) = 50/100 = 0,50." kiriAtas="1" kiriBawah="2" kananAtas="50" kananBawah="100" operasi="×50" arah="ubah" catatan="0,50 sama dengan 0,5. Timbangan 0,50 kg memang setengah kilogram."  rumus={["a/b = (a × k)/(b × k)"]} hitung={["1/2 = (1 × 50)/(2 × 50) = 50/100 = 0,50."]}/>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Ibu juga meminta salak seperlima kilogram. Timbangan menulis 0,20 kg. Agam memeriksa apakah seperlima sama dengan nol koma dua puluh.</p>}
          permasalahan={<p><Teks anak="Salak 1/5 kg. Apakah sama dengan 0,20 kg?" /></p>}
          logika={<p><Teks anak="Penyebut 5 bisa dijadikan 10 dan 100. Persepuluhan dan perseratusan itu nilainya sama." /></p>}
          langkah={
            <>
              <HitungPanah kalimat="1/5 = (1 × 2) : (5 × 2) = 2/10 = 0,2." kiriAtas="1" kiriBawah="5" kananAtas="2" kananBawah="10" operasi="×2" arah="ubah" catatan="Pembilang dan penyebut dikali 2."  rumus={["a/b = (a × k)/(b × k)"]} hitung={["1/5 = (1 × 2)/(5 × 2) = 2/10 = 0,2."]}/>
              <HitungPanah kalimat="1/5 = (1 × 20) : (5 × 20) = 20/100 = 0,20." kiriAtas="1" kiriBawah="5" kananAtas="20" kananBawah="100" operasi="×20" arah="ubah" catatan="0,20 sama dengan 0,2. Timbangan 0,20 kg memang seperlima kilogram."  rumus={["a/b = (a × k)/(b × k)"]} hitung={["1/5 = (1 × 20)/(5 × 20) = 20/100 = 0,20."]}/>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Agam melihat persegi yang dibagi sepuluh. Satu kotak kecil diarsir. Di tempat lain, persegi dibagi seratus dan sepuluh kotak diarsir. Tulisannya 0,1 dan 0,10.</p>}
          permasalahan={<p><Teks anak="Apakah 1/10, 0,1, dan 0,10 sama?" /></p>}
          logika={<p><Teks anak="Angka 1 di kanan koma menempati persepuluhan, nilainya 1/10. Sepuluh kotak dari seratus adalah 10/100, sama dengan 1/10." /></p>}
          langkah={
            <>
              <p><Teks anak="1/10 = 0,1. 10/100 = 0,10. 0,10 sama dengan 0,1." /></p>
              <HitungPanah kalimat="1/10 = (1 × 10) : (10 × 10) = 10/100 = 0,10." kiriAtas="1" kiriBawah="10" kananAtas="10" kananBawah="100" operasi="×10" arah="ubah" catatan="Persepuluhan 1 sama dengan perseratusan 10."  rumus={["a/b = (a × k)/(b × k)"]} hitung={["1/10 = (1 × 10)/(10 × 10) = 10/100 = 0,10."]}/>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 4"
          adegan={<p>Agam membaca 0,5 kg di timbangan, lalu ingin menulisnya kembali sebagai pecahan.</p>}
          permasalahan={<p><Teks anak="0,5 sama dengan pecahan berapa?" /></p>}
          logika={<p><Teks anak="Angka 5 di kanan koma adalah 5 persepuluhan. Sederhanakan 5/10." /></p>}
          langkah={<p><Teks anak="0,5 = 5/10 = 1/2." /></p>}
        />
        <PolaCerita
          judulAdegan="Adegan 5"
          adegan={<p>Rina menerima pesanan kain tiga perempat meter. Ia perlu menulis panjang itu sebagai desimal. Penyebut 4 tidak bisa dijadikan 10 dengan bilangan asli.</p>}
          permasalahan={<p><Teks anak="Berapa desimal dari 3/4 meter?" /></p>}
          logika={<p><Teks anak="4 kali 25 sama dengan 100. Jadi jadikan penyebut 100, bukan 10." /></p>}
          langkah={<HitungPanah kalimat="3/4 = (3 × 25) : (4 × 25) = 75/100 = 0,75." kiriAtas="3" kiriBawah="4" kananAtas="75" kananBawah="100" operasi="×25" arah="ubah" catatan="75 perseratusan ditulis 0,75."  rumus={["a/b = (a × k)/(b × k)"]} hitung={["3/4 = (3 × 25)/(4 × 25) = 75/100 = 0,75."]}/>}
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Ibu membeli 1/4 kg kacang. Berapa kg dalam desimal?" id={idKuis("C", 0)} periksa={(teks) => desimalUtuh(teks, "0.25")} jawaban="Penyebut 4 dijadikan 100. 1/4 = (1 × 25) : (4 × 25) = 25/100 = 0,25. Jawabannya 0,25 kg." />
        <SoalLatihan anak="2. Botol berisi 2/5 liter. Berapa liter dalam desimal?" id={idKuis("C", 1)} periksa={(teks) => desimalUtuh(teks, "0.4") || desimalUtuh(teks, "0.40")} jawaban="2/5 = (2 × 2) : (5 × 2) = 4/10 = 0,4. Jawabannya 0,4 liter." />
        <SoalLatihan anak="3. Tali sepanjang 7/10 meter. Berapa meter dalam desimal?" id={idKuis("C", 2)} periksa={(teks) => desimalUtuh(teks, "0.7") || desimalUtuh(teks, "0.70")} jawaban="Penyebutnya sudah 10. 7/10 = 0,7. Jawabannya 0,7 meter." />

        <h3 className="text-lg font-black text-[#1C01A5]">2. Membandingkan dan Mengurutkan Bilangan Desimal</h3>
        <PolaCerita
          judulAdegan="Adegan 1"
          adegan={<p>Agam membandingkan lima jarak: 2,3 km, 0,9 km, 1,9 km, 2,6 km, dan 3,6 km. Ia mengisi nilai tempat sebelum memilih yang terdekat dan terjauh.</p>}
          permasalahan={<p>Mana yang terdekat dan terjauh? Urutkan dari yang terdekat.</p>}
          logika={<p>Lihat satuan dulu, lalu persepuluhan. Satuan 0 paling kecil. Satuan 3 paling besar di daftar ini.</p>}
          langkah={
            <>
              <Tabel kolom={["Jarak (km)", "Satuan", "Persepuluhan", "Perseratusan"]} baris={[["2,3", "2", "3", "0"], ["0,9", "0", "9", "0"], ["1,9", "1", "9", "0"], ["2,6", "2", "6", "0"], ["3,6", "3", "6", "0"]]} />
              <p>Terdekat 0,9 km. Terjauh 3,6 km. Urutannya 0,9 km, 1,9 km, 2,3 km, 2,6 km, 3,6 km.</p>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 2"
          adegan={<p>Agam juga mengumpulkan jarak sepuluh teman. Ada yang puluhannya 1, jadi angka di kiri koma harus dilihat lebih dulu.</p>}
          permasalahan={<p>Siapa yang rumahnya paling dekat, dan siapa yang paling jauh?</p>}
          logika={<p>Puluhan lebih besar menang sebelum satuan dilihat. 11 lebih besar dari 10. Di antara yang satuannya 1, persepuluhan 5 lebih kecil dari 9.</p>}
          langkah={
            <>
              <Tabel kolom={["Nama", "Jarak (km)"]} baris={[["Andi", "1,5"], ["Anita", "1,9"], ["Alma", "2,3"], ["Rini", "2,6"], ["Fatim", "2,8"], ["Dias", "3,1"], ["Rido", "3,6"], ["Fadilah", "4,7"], ["Budi", "10,9"], ["Musa", "11,3"]]} />
              <p>Paling dekat Andi, 1,5 km. Paling jauh Musa, 11,3 km.</p>
            </>
          }
        />
        <PolaCerita
          judulAdegan="Adegan 3"
          adegan={<p>Seorang teman melihat dua jarak, 2,49 km dan 2,9 km. Ia berkata 2,49 lebih besar karena 49 lebih besar dari 9. Agam ragu, lalu membandingkan kedua angka dari kiri tanda koma.</p>}
          permasalahan={<p>Mana yang lebih besar, 2,9 atau 2,49?</p>}
          logika={<p>Bandingkan dari kiri tanda koma. Satuan dulu, lalu persepuluhan. Jangan membandingkan 49 dengan 9.</p>}
          langkah={
            <>
              <p><Teks anak="Satuan keduanya 2. Persepuluhan 9 lebih besar dari 4. Jadi 2,9 lebih besar." /></p>
              <GambarBanding />
            </>
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Mana yang lebih besar, 3,5 atau 3,45?" id={idKuis("C", 3)} periksa={(teks) => desimalUtuh(teks, "3.5") || desimalUtuh(teks, "3.50")} jawaban="Satuan sama-sama 3. Persepuluhan 5 lebih besar dari 4. Jawabannya 3,5 lebih besar." />
        <SoalLatihan anak="2. Dari 1,2 ; 0,8 ; dan 1,15, mana yang terkecil?" id={idKuis("C", 4)} periksa={(teks) => desimalUtuh(teks, "0.8") || desimalUtuh(teks, "0.80")} jawaban="0,8 satuannya 0, sedangkan 1,15 dan 1,2 satuannya 1. Jawabannya 0,8." />
        <SoalLatihan anak="3. Mana yang lebih besar, 4,6 atau 4,59?" id={idKuis("C", 5)} periksa={(teks) => desimalUtuh(teks, "4.6") || desimalUtuh(teks, "4.60")} jawaban="Satuan sama-sama 4. Persepuluhan 6 lebih besar dari 5. Jawabannya 4,6 lebih besar." />
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Refleksi" />
        <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-800">
          <li>Apakah kamu sudah dapat mengalikan pecahan?</li>
          <li>Apakah kamu sudah dapat membagi pecahan?</li>
          <li>Apakah kamu dapat mengubah pecahan menjadi desimal?</li>
          <li>Apakah kamu dapat membandingkan dua desimal?</li>
        </ul>
      </section>

      <section className="space-y-3">
        <JudulBagian anak="Uji Kompetensi" />
        <KotakJawaban id={idKuis("D", 0)} soal="Pak Arman menempuh 630 km. Setelah 2/5 perjalanan, berapa km yang sudah ditempuh?" periksa={(teks) => utuh(teks, "252")} umpan="2/5 dari 630 km. 2/5 × 630/1 = (2 × 630) : (5 × 1) = 1260/5 = 252 km." />
        <KotakJawaban id={idKuis("D", 1)} soal="Dini mendapat pesanan 100 porsi. Yang selesai 3/4 pesanan. Berapa porsi?" periksa={(teks) => utuh(teks, "75")} umpan="3/4 dari 100 porsi. 3/4 × 100/1 = (3 × 100) : (4 × 1) = 300/4 = 75 porsi." />
        <KotakJawaban id={idKuis("D", 2)} soal="Keluarga Dias memakai 2/3 kg beras tiap hari. Persediaan 50 kg. Habis dalam berapa hari?" periksa={(teks) => utuh(teks, "75")} umpan="50 kg dibagi 2/3 kg. 50/1 : 2/3 = (50 × 3) : (1 × 2) = 150/2 = 75 hari." />
        <KotakJawaban id={idKuis("D", 3)} soal="Rania punya 5/8 potong kue. Kue itu memenuhi 4 kotak sama rata. Bagian kue tiap kotak?" periksa={limaPerTigaPuluhDua} umpan="5/8 kue dibagi 4 kotak. 5/8 : 4/1 = (5 × 1) : (8 × 4) = 5/32." />
        <KotakJawaban id={idKuis("D", 4)} soal="Pak Made sudah mengecat 5 4/5 m². Tuliskan bentuk desimalnya." periksa={desimalLimaKomaDelapan} umpan="4/5 = (4 × 2) : (5 × 2) = 8/10 = 0,8, jadi 5,8." />
      </section>

      <section className="space-y-3 border-t-4 border-amber-400 pt-6">
        <JudulBagian anak="Pengayaan" />
        <p className="text-sm font-semibold text-slate-800">Bagian ini terpisah dari soal inti. Buku memakainya untuk pecahan kali pecahan, pecahan dibagi pecahan, dan desimal yang berulang.</p>
        <h3 className="text-lg font-black text-[#1C01A5]">Perkalian pecahan dengan pecahan</h3>
        <PolaCerita
          adegan={<p>Musim kemarau belum reda. Tangki kebun tinggal terisi setengah. Hari ini Ayah memakai sepertiga dari air yang ada, bukan sepertiga tangki penuh. Agam menghitung bagian tangki yang terpakai.</p>}
          permasalahan={<p><Teks anak="Tangki terisi 1/2. Hari ini terpakai 1/3 dari air yang ada. Berapa bagian tangki yang terpakai?" /></p>}
          logika={<p><Teks anak="Air yang ada baru 1/2 tangki. Yang terpakai 1/3 dari air itu, jadi 1/2 dikali 1/3." /></p>}
          langkah={<HitungPanah kalimat="1/2 × 1/3 = (1 × 1) : (2 × 3) = 1/6." kiriAtas="1" kiriBawah="2" kananAtas="1" kananBawah="3" operasi="×" arah="lurus" hasilAtas="1 × 1" hasilBawah="2 × 3" akhirAtas="1" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau lurus."  rumus={["a/b × c/d = (a × c)/(b × d)"]} hitung={["1/2 × 1/3 = (1 × 1)/(2 × 3) = 1/6."]}/>}
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. 1/2 × 1/4. Berapa hasilnya?" id={idKuis("E", 0)} periksa={(teks) => pecahan(teks, "1/8")} jawaban="1/2 × 1/4 = (1 × 1) : (2 × 4) = 1/8. Kotak merah pada 1/2. Panah hijau lurus. Jawabannya 1/8." />
        <SoalLatihan anak="2. 2/3 × 1/5. Berapa hasilnya?" id={idKuis("E", 1)} periksa={(teks) => pecahan(teks, "2/15")} jawaban="2/3 × 1/5 = (2 × 1) : (3 × 5) = 2/15. Kotak merah pada 2/3. Panah hijau lurus. Jawabannya 2/15." />
        <SoalLatihan anak="3. 3/4 × 1/2. Berapa hasilnya?" id={idKuis("E", 2)} periksa={(teks) => pecahan(teks, "3/8")} jawaban="3/4 × 1/2 = (3 × 1) : (4 × 2) = 3/8. Kotak merah pada 3/4. Panah hijau lurus. Jawabannya 3/8." />

        <h3 className="text-lg font-black text-[#1C01A5]">Pembagian pecahan dengan pecahan</h3>
        <PolaCerita
          adegan={<p>Agam menuang air ke botol. Tiga gelas sudah dituang, tetapi botol baru terisi dua pertiga. Ayah bertanya, kalau botolnya mau penuh, perlu berapa gelas?</p>}
          permasalahan={<p><Teks anak="3 gelas air memenuhi 2/3 botol. Berapa gelas untuk satu botol penuh?" /></p>}
          logika={<p><Teks anak="3 gelas baru mengisi 2/3 botol. Banyak gelas untuk satu botol adalah 3 dibagi 2/3." /></p>}
          langkah={
            <>
              <HitungPanah kalimat="3/1 : 2/3 = (3 × 3) : (1 × 2) = 9/2." kiriAtas="3" kiriBawah="1" kananAtas="2" kananBawah="3" operasi=":" arah="silang" hasilAtas="3 × 3" hasilBawah="1 × 2" akhirAtas="9" akhirBawah="2" catatan="Kotak merah pada 3/1. Panah hijau menyilang. Satu botol penuh perlu 9/2 gelas."  rumus={["a : b/c = a × c/b"]} hitung={["3 : 2/3 = 3 × 3/2 = 9/2."]}/>
              <p><Teks anak="Sepertiga botol adalah setengah dari dua pertiga. 3 : 2 = 3/2. Jadi 1/3 botol terisi oleh 3/2 gelas." /></p>
            </>
          }
        />
        <PolaCerita
          adegan={<p>Agam menuang lagi. Kali ini hanya setengah gelas, tetapi botol lain sudah terisi tiga perempat.</p>}
          permasalahan={<p><Teks anak="1/2 gelas memenuhi 3/4 botol. Berapa gelas untuk 1/4 botol, dan berapa gelas untuk satu botol penuh?" /></p>}
          logika={<p><Teks anak="Seperempat botol adalah sepertiga dari tiga perempat botol. Satu botol penuh adalah empat pertiga dari tiga perempat botol." /></p>}
          langkah={
            <>
              <p><Teks anak="1/4 botol = 1/3 dari 1/2 gelas = 1/6 gelas." /></p>
              <HitungPanah kalimat="1/2 : 3/4 = (1 × 4) : (2 × 3) = 4/6 = 2/3." kiriAtas="1" kiriBawah="2" kananAtas="3" kananBawah="4" operasi=":" arah="silang" hasilAtas="1 × 4" hasilBawah="2 × 3" akhirAtas="4" akhirBawah="6" catatan="Kotak merah pada 1/2. Panah hijau menyilang. Satu botol penuh perlu 2/3 gelas."  rumus={["a/b : c/d = (a × d)/(b × c)"]} hitung={["1/2 : 3/4 = (1 × 4)/(2 × 3) = 4/6 = 2/3."]}/>
            </>
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. 1/2 ÷ 1/4. Berapa hasilnya?" id={idKuis("E", 3)} periksa={(teks) => hasilUtuh(teks, "2")} jawaban="1/2 : 1/4 = (1 × 4) : (2 × 1) = 4/2 = 2. Kotak merah pada 1/2. Panah hijau menyilang. Jawabannya 2." />
        <SoalLatihan anak="2. 2/3 ÷ 1/3. Berapa hasilnya?" id={idKuis("E", 4)} periksa={(teks) => hasilUtuh(teks, "2")} jawaban="2/3 : 1/3 = (2 × 3) : (3 × 1) = 6/3 = 2. Kotak merah pada 2/3. Panah hijau menyilang. Jawabannya 2." />
        <SoalLatihan anak="3. 3/4 ÷ 1/2. Berapa hasilnya?" id={idKuis("E", 5)} periksa={(teks) => pecahan(teks, "3/2") || pecahan(teks, "6/4")} jawaban="3/4 : 1/2 = (3 × 2) : (4 × 1) = 6/4 = 3/2. Kotak merah pada 3/4. Panah hijau menyilang. Jawabannya 3/2." />

        <h3 className="text-lg font-black text-[#1C01A5]">Desimal berulang</h3>
        <PolaCerita
          adegan={<p>Rani membeli jus jeruk sepertiga liter. Di kasir, angka timbangan tidak berhenti pada satu angka di belakang koma. Rani ingin menuliskannya sebagai desimal.</p>}
          permasalahan={<p><Teks anak="Jus jeruk 1/3 liter. Berapa liter dalam desimal?" /></p>}
          logika={<p><Teks anak="Penyebut 3 tidak bisa dijadikan 10 atau 100. Karena itu angka 3 di belakang koma berulang." /></p>}
          langkah={
            <>
              <p><Teks anak="1 : 3 = 0,333…" /></p>
              <GambarBerulang pecahan="sepertiga" />
            </>
          }
        />
        <PolaCerita
          adegan={<p>Rani juga membeli jus jambu seperenam liter. Angka di belakang koma tidak berhenti pada satu angka.</p>}
          permasalahan={<p><Teks anak="Jus jambu 1/6 liter. Berapa liter dalam desimal?" /></p>}
          logika={<p><Teks anak="Penyebut 6 juga tidak bisa dijadikan 10 atau 100. Angka 6 di belakang koma berulang." /></p>}
          langkah={
            <>
              <p><Teks anak="1 : 6 = 0,1666…" /></p>
              <GambarBerulang pecahan="perenam" />
            </>
          }
        />
        <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Latihan Soal</p>
        <SoalLatihan anak="1. Tuliskan desimal 1/3 sampai tiga angka 3 yang berulang." id={idKuis("E", 6)} periksa={(teks) => rapat(teks).includes("333")} jawaban="1 : 3 = 0,333… Angka 3 berulang. Jawabannya 0,333…" />
        <SoalLatihan anak="2. Tuliskan desimal 1/6 yang angkanya berulang." id={idKuis("E", 7)} periksa={(teks) => rapat(teks).includes("166")} jawaban="1 : 6 = 0,1666… Angka 6 berulang. Jawabannya 0,1666…" />
        <SoalLatihan anak="3. Dari 1/2 dan 1/3, mana yang desimalnya berulang?" id={idKuis("E", 8)} periksa={sepertiga} jawaban="1/2 = 0,5 dan berhenti. 1/3 = 0,333… dan berulang. Jawabannya 1/3." />
      </section>
    </article>
  );
}
