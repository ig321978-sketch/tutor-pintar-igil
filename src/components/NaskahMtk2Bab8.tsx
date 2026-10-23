"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { MODUL_MTK2_BAB8 } from "@/lib/modul-resmi-mtk-2-bab8";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB8.id, kode, indeks);
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

function AdeganSafari({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(180deg,#bbf7d0_0%,#86efac_45%,#16a34a_100%)] px-3 py-4">
      <p className="absolute bottom-2 left-2 text-4xl" aria-hidden>
        🦉🧢
      </p>
      <div className="pl-14 text-emerald-950">{children}</div>
    </div>
  );
}

function IkatLima() {
  return (
    <span className="relative mx-1 inline-flex h-10 items-end gap-1.5 px-1">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-9 w-1 rounded-full bg-[#1C01A5]" />
      ))}
      <span className="absolute left-0 right-0 top-4 h-1 origin-center -rotate-[38deg] rounded-full bg-rose-500" />
    </span>
  );
}

function GarisTegak({ n }: { n: number }) {
  return (
    <span className="inline-flex items-end gap-1.5">
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="h-9 w-1 rounded-full bg-[#1C01A5]" />
      ))}
    </span>
  );
}

function LambangTurus({ n }: { n: number }) {
  const ikat = Math.floor(n / 5);
  const sisa = n % 5;
  return (
    <span className="inline-flex flex-wrap items-end">
      {Array.from({ length: ikat }, (_, i) => (
        <IkatLima key={`i${i}`} />
      ))}
      <GarisTegak n={sisa} />
    </span>
  );
}

function KolomGambar({
  nama,
  ikon,
  n,
  max = 9,
  sorot,
  onKetuk,
}: {
  nama: string;
  ikon: string;
  n: number;
  max?: number;
  sorot?: boolean;
  onKetuk?: () => void;
}) {
  const isi = (
    <>
      <div className="flex flex-col-reverse gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`flex h-7 w-7 items-center justify-center rounded-md border text-sm ${
              i < n ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"
            }`}
          >
            {i < n ? ikon : ""}
          </span>
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] font-black uppercase text-[#1C01A5]">{nama}</p>
      <p className="text-center text-xs font-black text-slate-600">{n}</p>
    </>
  );
  if (onKetuk) {
    return (
      <button type="button" onClick={onKetuk} className={`rounded-xl px-1 py-1 ${sorot ? "ring-4 ring-rose-400" : ""}`}>
        {isi}
      </button>
    );
  }
  return <div className={`rounded-xl px-1 py-1 ${sorot ? "ring-4 ring-rose-400" : ""}`}>{isi}</div>;
}

function PapanTurus({ baris }: { baris: { nama: string; ikon: string; n: number }[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-amber-700 bg-amber-50">
      <p className="bg-amber-800 px-3 py-2 text-center text-xs font-black uppercase text-white">Tabel Turus Satwa Taman Safari</p>
      <div className="grid grid-cols-[7rem_1fr_3rem] bg-amber-200 px-2 py-1 text-[10px] font-black uppercase text-amber-950">
        <span>Satwa</span>
        <span>Turus</span>
        <span>Angka</span>
      </div>
      {baris.map((item) => (
        <div key={item.nama} className="grid grid-cols-[7rem_1fr_3rem] items-center border-t border-amber-200 px-2 py-2">
          <p className="text-sm font-black text-[#1C01A5]">
            {item.ikon} {item.nama}
          </p>
          <LambangTurus n={item.n} />
          <p className="text-center text-lg font-black text-emerald-700">{item.n}</p>
        </div>
      ))}
    </div>
  );
}

function KuisIkatTurus() {
  const kuis = useKuisMateri();
  const ref = useRef<HTMLCanvasElement>(null);
  const gambar = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);

  const dasar = (kanvas: HTMLCanvasElement) => {
    const ctx = kanvas.getContext("2d");
    if (!ctx) return;
    const w = kanvas.clientWidth;
    const h = kanvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    kanvas.width = Math.floor(w * dpr);
    kanvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#FFFDF6";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#1C01A5";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    const gap = w / 6;
    for (let i = 0; i < 4; i += 1) {
      const x = gap * (i + 1.2);
      ctx.beginPath();
      ctx.moveTo(x, h * 0.18);
      ctx.lineTo(x, h * 0.82);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const kanvas = ref.current;
    if (!kanvas) return;
    dasar(kanvas);
    const ulang = window.setTimeout(() => dasar(kanvas), 80);
    return () => window.clearTimeout(ulang);
  }, []);

  const titik = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const kotak = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - kotak.left, y: event.clientY - kotak.top };
  };

  const periksa = () => {
    const kanvas = ref.current;
    const ctx = kanvas?.getContext("2d");
    if (!kanvas || !ctx) return;
    const { width, height } = kanvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let kena = 0;
    for (let i = 0; i < 20; i += 1) {
      const t = i / 19;
      const x = Math.floor(width * (0.18 + 0.64 * t));
      const y = Math.floor(height * (0.78 - 0.56 * t));
      const p = (y * width + x) * 4;
      const tinta = data[p + 1] < 160;
      if (tinta) kena += 1;
    }
    if (kena >= 8) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("A", 1));
      return;
    }
    setStatus("salah");
  };

  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">
        Sekarang kelincinya genap ada 5! Gambarkan 1 garis miring melintasi keempat garis tegak ini.
      </p>
      <p className="mt-1 text-center text-2xl">🐰🐰🐰🐰 + 🐰</p>
      <canvas
        ref={ref}
        className="mt-3 h-40 w-full touch-none rounded-xl border-2 border-dashed border-[#1C01A5]/30"
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.setPointerCapture(event.pointerId);
          gambar.current = true;
          last.current = titik(event);
        }}
        onPointerMove={(event) => {
          if (!gambar.current) return;
          const ctx = ref.current?.getContext("2d");
          if (!ctx || !last.current) return;
          const kini = titik(event);
          ctx.strokeStyle = "#e11d48";
          ctx.lineWidth = 5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(last.current.x, last.current.y);
          ctx.lineTo(kini.x, kini.y);
          ctx.stroke();
          last.current = kini;
        }}
        onPointerUp={() => {
          gambar.current = false;
          last.current = null;
        }}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            if (ref.current) dasar(ref.current);
            setStatus(null);
          }}
          className="min-h-12 rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Hapus
        </button>
        <button type="button" onClick={periksa} className="min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Tarik garis miring yang memotong keempat garis tegak." />
        <UmpanBenar status={status} teks="Ikat lima! Empat garis tegak plus satu garis miring = 5." />
      </div>
    </article>
  );
}

function KuisTapGajah() {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState(0);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    if (isi === 4) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("A", 7));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Tabel: Gajah = 4 ekor. Ketuk + Gambar Gajah sampai kolomnya pas.</p>
      <div className="mt-3 flex justify-center">
        <KolomGambar nama="Gajah" ikon="🐘" n={isi} max={4} />
      </div>
      <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">Terisi {isi} dari 4</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setIsi((lama) => Math.min(4, lama + 1));
          }}
          className="min-h-12 rounded-xl bg-amber-500 px-4 py-2 text-sm font-black text-amber-950"
        >
          + Gambar Gajah
        </button>
        <button type="button" onClick={periksa} className="min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={`${isi} gajah`} pesanSalah="Isi sampai 4 petak gajah." />
        <UmpanBenar status={status} teks="Tepat! 4 gambar gajah untuk 4 ekor." />
      </div>
    </article>
  );
}

function KuisTandaiPetak() {
  const kuis = useKuisMateri();
  const [tandai, setTandai] = useState<number[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const ok = tandai.includes(3) && tandai.includes(4) && tandai.length === 2;
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("B", 3));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">
        Kelinci di diagram baru 3, di tabel 5. Tandai 2 petak kosong di atasnya.
      </p>
      <div className="mt-3 flex justify-center">
        <div className="flex flex-col-reverse gap-0.5">
          {Array.from({ length: 5 }, (_, i) => {
            const isiAwal = i < 3;
            const dipilih = tandai.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (isiAwal) return;
                  setStatus(null);
                  setTandai((lama) => (lama.includes(i) ? lama.filter((n) => n !== i) : [...lama, i]));
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-md border-2 text-lg ${
                  isiAwal ? "border-amber-300 bg-amber-50" : dipilih ? "border-rose-400 bg-rose-100" : "border-dashed border-slate-300 bg-white"
                }`}
              >
                {isiAwal ? "🐰" : dipilih ? "✕" : ""}
              </button>
            );
          })}
        </div>
      </div>
      <button type="button" onClick={periksa} className="mt-3 min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Tandai tepat 2 petak kosong sampai tingginya 5." />
        <UmpanBenar status={status} teks="Benar! 3 + 2 = 5 kelinci." />
      </div>
    </article>
  );
}

function KuisKelebihanJeruk() {
  const kuis = useKuisMateri();
  const [tandai, setTandai] = useState<number[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const extra = [6, 7, 8];
    const ok = extra.every((n) => tandai.includes(n)) && tandai.every((n) => extra.includes(n));
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuis("B", 5));
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold text-slate-700">Jeruk 9, Mangga 6. Ketuk kotak kelebihan pada kolom Jeruk.</p>
      <div className="mt-3 flex justify-center gap-6">
        <div className="flex flex-col-reverse gap-0.5">
          {Array.from({ length: 9 }, (_, i) => {
            const extra = i >= 6;
            const dipilih = tandai.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (!extra) return;
                  setStatus(null);
                  setTandai((lama) => (lama.includes(i) ? lama.filter((n) => n !== i) : [...lama, i]));
                }}
                className={`flex h-7 w-7 items-center justify-center rounded-md border text-sm ${
                  dipilih ? "border-rose-400 bg-rose-100" : "border-orange-300 bg-orange-50"
                }`}
              >
                🍊
              </button>
            );
          })}
          <p className="mt-1 text-center text-[10px] font-black uppercase text-[#1C01A5]">Jeruk</p>
        </div>
        <div className="flex flex-col-reverse gap-0.5">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-md border text-sm ${
                i < 6 ? "border-yellow-300 bg-yellow-50" : "border-slate-200 bg-white"
              }`}
            >
              {i < 6 ? "🥭" : ""}
            </span>
          ))}
          <p className="mt-1 text-center text-[10px] font-black uppercase text-[#1C01A5]">Mangga</p>
        </div>
      </div>
      <button type="button" onClick={periksa} className="mt-3 min-h-12 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Ketuk 3 kotak jeruk yang lebih tinggi dari mangga. 9 − 6 = 3." />
        <UmpanBenar status={status} teks="Selisihnya 3!" />
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

const MISI_SAFARI: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Pisang untuk monyet",
    narasi: "Ranger IGIL mencatat Monyet: 1 ikatan lima + 3 garis tegak. Berapa pisang jika 1 monyet makan 1 pisang?",
    mode: "pilih",
    anak: <LambangTurus n={8} />,
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "5" },
      { huruf: "B", teks: "8" },
      { huruf: "C", teks: "13" },
    ],
    benarHuruf: "B",
    bersama: "5 + 3 = 8 pisang.",
  },
  {
    warna: "biru",
    misi: "Pengunjung hari ini",
    narasi: "Diagram gambar: Anak-anak = 9, Dewasa = 5. Siapakah pengunjung yang lebih banyak?",
    mode: "pilih",
    anak: (
      <div className="flex justify-center gap-4">
        <KolomGambar nama="Anak" ikon="🧒" n={9} />
        <KolomGambar nama="Dewasa" ikon="🧑" n={5} />
      </div>
    ),
    alias: ["A"],
    pilihan: [
      { huruf: "A", teks: "Anak-anak" },
      { huruf: "B", teks: "Dewasa" },
    ],
    benarHuruf: "A",
    bersama: "Menara anak-anak lebih tinggi. 9 > 5.",
  },
  {
    warna: "ungu",
    misi: "Turus panda",
    narasi: "Ada 6 ekor Panda baru. Pilih kartu turus yang nilainya 6!",
    mode: "pilih",
    anak: <p className="text-center text-sm font-black text-[#1C01A5]">🐼 × 6</p>,
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "1 ikat lima saja" },
      { huruf: "B", teks: "1 ikat lima + 1 garis" },
      { huruf: "C", teks: "6 garis tanpa ikat" },
    ],
    benarHuruf: "B",
    bersama: "6 = 5 + 1. Satu ikat lima dan satu garis.",
  },
  {
    warna: "kuning",
    misi: "Kandang burung",
    narasi: "Kakaktua 4, Merpati 7, Elang 2. Hewan manakah yang jumlahnya paling sedikit?",
    mode: "pilih",
    anak: (
      <div className="flex justify-center gap-3">
        <KolomGambar nama="Kakaktua" ikon="🦜" n={4} max={7} />
        <KolomGambar nama="Merpati" ikon="🕊️" n={7} max={7} />
        <KolomGambar nama="Elang" ikon="🦅" n={2} max={7} />
      </div>
    ),
    alias: ["C"],
    pilihan: [
      { huruf: "A", teks: "Kakaktua" },
      { huruf: "B", teks: "Merpati" },
      { huruf: "C", teks: "Elang" },
    ],
    benarHuruf: "C",
    bersama: "Elang hanya 2, paling sedikit.",
  },
  {
    warna: "hijau",
    misi: "Kolam bebek",
    narasi: "Di kolam ada 10 Bebek dan 6 Angsa. Berapa ekor lebihnya Bebek dibandingkan Angsa?",
    mode: "pilih",
    alias: ["B"],
    pilihan: [
      { huruf: "A", teks: "3" },
      { huruf: "B", teks: "4" },
      { huruf: "C", teks: "16" },
    ],
    benarHuruf: "B",
    bersama: "10 − 6 = 4.",
  },
  {
    warna: "biru",
    misi: "Catatan rusa Lala",
    narasi: "Lala menulis turus 11 rusa dengan 2 ikatan lima dan 1 garis tegak. Apakah catatan Lala sudah benar?",
    mode: "pilih",
    anak: <LambangTurus n={11} />,
    alias: ["A"],
    pilihan: [
      { huruf: "A", teks: "Benar" },
      { huruf: "B", teks: "Salah" },
    ],
    benarHuruf: "A",
    bersama: "5 + 5 + 1 = 11. Catatan Lala benar.",
  },
  {
    warna: "ungu",
    misi: "Bunga taman",
    narasi: "Diagram bunga: Merah = 8, Kuning = 4, Ungu = 6. Bunga warna apakah yang jumlahnya paling banyak? Ucapkan warnanya!",
    mode: "suara",
    anak: (
      <div className="flex justify-center gap-3">
        <KolomGambar nama="Merah" ikon="🔴" n={8} />
        <KolomGambar nama="Kuning" ikon="🟡" n={4} />
        <KolomGambar nama="Ungu" ikon="🟣" n={6} />
      </div>
    ),
    alias: ["merah"],
    bersama: "Menara merah paling tinggi. 8.",
  },
  {
    warna: "kuning",
    misi: "Kucing dan kelinci",
    narasi: "Tabel turus: Kucing = 4 dan Kelinci = 3. Jika digabungkan, berapa jumlah semuanya? Jawab lewat mikrofon!",
    mode: "suara",
    anak: <PapanTurus baris={[{ nama: "Kucing", ikon: "🐱", n: 4 }, { nama: "Kelinci", ikon: "🐰", n: 3 }]} />,
    alias: ["tujuh", "7"],
    bersama: "4 + 3 = 7.",
  },
  {
    warna: "hijau",
    misi: "Banyaknya jerapah",
    narasi: "Papan turus Jerapah: 1 ikatan lima dan 2 garis tegak. Tuliskan angkanya pada kolom Banyaknya!",
    mode: "kanvas",
    anak: (
      <div className="text-center">
        <LambangTurus n={7} />
        <p className="mt-1 text-sm font-black text-[#1C01A5]">Banyaknya = ?</p>
      </div>
    ),
    alias: ["7", "tujuh"],
    bersama: "5 + 2 = 7.",
  },
  {
    warna: "biru",
    misi: "Kolom paling tinggi",
    narasi: "Lingkari kolom hewan yang jumlahnya PALING TINGGI: Kuda 5, Domba 9, Sapi 6. Tuliskan namanya atau angkanya.",
    mode: "kanvas",
    anak: (
      <div className="flex justify-center gap-3">
        <KolomGambar nama="Kuda" ikon="🐴" n={5} />
        <KolomGambar nama="Domba" ikon="🐑" n={9} />
        <KolomGambar nama="Sapi" ikon="🐮" n={6} />
      </div>
    ),
    alias: ["9", "domba", "sembilan"],
    bersama: "Domba 9 paling tinggi.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function MisiSafari() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_SAFARI[aktif];
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
        Bantu Ranger IGIL di 10 pos. Bar kebahagiaan satwa 🦁🐘🦒. Data yang tepat menaikkan skor konservasi.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🏕️
        </span>
        {NOMOR_IKAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`min-h-12 rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_SAFARI[indeks].warna]
              }`}
              aria-label={`Pos ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏅
        </span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">Kebahagiaan satwa {bintang}/10</p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Misi {aktif + 1} · {misi.misi}
        </p>
        <NamaDialog nama="Ranger IGIL" />
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.anak ? <div className="mt-3">{misi.anak}</div> : null}
        {kini.petunjuk >= 3 ? <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p> : null}
        {kini.petunjuk > 0 && !kini.selesai ? <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Coba lagi, ya.</p> : null}
        {kini.selesai ? <p className="mt-3 text-sm font-black text-emerald-800">Pos aman! Pilih pos lain.</p> : null}
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
        soal="Keranjang berisi 12 buah. Apel 1 ikat lima, Jeruk 4 garis tegak, Mangga belum dicatat. Berapa garis turus Mangga supaya jumlah seluruh buah pas 12?"
        benar="C"
        umpanBenar="Benar! 5 + 4 = 9. 12 − 9 = 3 garis."
        pesanSalah="Apel 5, jeruk 4, jumlah 9. Sisa 12 − 9."
        anak={
          <div className="space-y-1 text-sm font-black text-[#1C01A5]">
            <p>🍎 Apel <LambangTurus n={5} /></p>
            <p>🍊 Jeruk <LambangTurus n={4} /></p>
            <p>🥭 Mangga ?</p>
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "2 garis tegak" },
          { huruf: "B", teks: "4 garis tegak" },
          { huruf: "C", teks: "3 garis tegak" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="Diagram Mainan Kesukaan: Bola = 6, Boneka = 5, Mobil-mobilan = 8. Datang 3 siswa baru, semuanya memilih Boneka. Mainan apakah yang menjadi paling banyak?"
        benar="C"
        umpanBenar="Benar! Boneka 5 + 3 = 8, sama dengan Mobil-mobilan."
        pesanSalah="Boneka menjadi 8. Mobil juga 8."
        anak={
          <div className="flex justify-center gap-3">
            <KolomGambar nama="Bola" ikon="⚽" n={6} />
            <KolomGambar nama="Boneka" ikon="🧸" n={5} />
            <KolomGambar nama="Mobil" ikon="🚗" n={8} />
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "Bola (6)" },
          { huruf: "B", teks: "Boneka (8)" },
          { huruf: "C", teks: "Boneka dan Mobil-mobilan sama banyak (8)" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="Kino menggambar tanpa petak: Baris A 5 semangka besar renggang sehingga tampak panjang. Baris B 7 stroberi kecil rapat. Jika dimasukkan ke diagram berpetak resmi, manakah yang benar?"
        benar="B"
        umpanBenar="Benar! Hitung jumlah gambar, bukan panjang baris. Stroberi 7."
        pesanSalah="Jangan terkecoh baris yang tampak panjang. Hitung petaknya."
        anak={
          <div className="space-y-2 text-center text-2xl">
            <p>🍉 🍉 🍉 🍉 🍉</p>
            <p>🍓🍓🍓🍓🍓🍓🍓</p>
          </div>
        }
        pilihan={[
          { huruf: "A", teks: "Semangka lebih banyak karena barisnya panjang" },
          { huruf: "B", teks: "Stroberi lebih banyak karena jumlahnya 7" },
          { huruf: "C", teks: "Keduanya sama banyak" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="Olahraga kesukaan: Sepak bola 2 ikatan lima (10), Renang 1 ikatan + 2 garis (7), Bulu tangkis 4 garis. Berapakah selisih olahraga paling banyak dan paling sedikit?"
        benar="B"
        umpanBenar="Benar! 10 − 4 = 6 siswa."
        pesanSalah="Paling banyak 10, paling sedikit 4. Kurangkan."
        anak={<PapanTurus baris={[{ nama: "Bola", ikon: "⚽", n: 10 }, { nama: "Renang", ikon: "🏊", n: 7 }, { nama: "Bulu", ikon: "🏸", n: 4 }]} />}
        pilihan={[
          { huruf: "A", teks: "3 siswa" },
          { huruf: "B", teks: "6 siswa" },
          { huruf: "C", teks: "14 siswa" },
        ]}
      />
      <KuisCocok
        id={idKuis("D", 4)}
        soal="Diagram: Kucing = 8, Ikan = 5, Burung = 3. Pasangkan pertanyaan dengan jawabannya."
        baris={[
          { id: "gabung", tampil: "➕ Jumlah Ikan dan Burung", benar: "8" },
          { id: "selisih", tampil: "➖ Selisih Kucing dan Ikan", benar: "3" },
          { id: "lima", tampil: "🏆 Hewan yang jumlahnya 5", benar: "Ikan" },
        ]}
        label={["8", "3", "Ikan"]}
        umpanBenar="5 + 3 = 8. 8 − 5 = 3. Yang 5 adalah Ikan."
        pesanSalah="Gabung ditambah. Selisih dikurangkan."
      />
      <KuisBenarSalah
        id={idKuis("D", 5)}
        soal="Untuk angka 8, Dodi menggambar 8 garis tegak berjajar tanpa garis miring. Ranger IGIL berkata penulisan itu belum tepat karena seharusnya 1 ikatan lima dan 3 garis tegak. Apakah perkataan Ranger IGIL benar atau salah?"
        benar="benar"
        anak={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <GarisTegak n={8} />
            <span className="text-sm font-black">→</span>
            <LambangTurus n={8} />
          </div>
        }
        umpanBenar="Benar. Setiap 5 garis harus diikat."
        pesanSalah="Aturan turus: ikat setiap lima garis."
      />
      <div>
        <p className="text-sm font-semibold text-slate-700">Ada 2 ikatan lima ditambah 3 garis tegak. Berapakah jumlah keseluruhannya? Ucapkan angkanya!</p>
        <div className="mt-2 text-center">
          <LambangTurus n={13} />
        </div>
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="2 ikatan lima dan 3 garis. Jumlahnya?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tiga belas", "13"])}
          petunjuk="Ucapkan tiga belas."
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">Kue cokelat 7 kotak, kue keju 5 kotak. Berapa kue keju lagi supaya sama banyak dengan kue cokelat?</p>
        <div className="mt-2 flex justify-center gap-4">
          <KolomGambar nama="Cokelat" ikon="🍫" n={7} />
          <KolomGambar nama="Keju" ikon="🧀" n={5} />
        </div>
        <SoalRekamSuara
          id={idKuis("D", 7)}
          pertanyaan="Tambah berapa keju supaya sama dengan cokelat?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["dua", "2"])}
          petunjuk="Ucapkan dua."
        />
      </div>
      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="Baris Buku Cerita: 2 ikatan lima dan 4 garis tegak. Tuliskan bilangannya pada kotak kanvas!"
        alias={kumpulkanAlias(["14"])}
        konteks="10 + 4 = 14."
        visual={<LambangTurus n={14} />}
      />
      <KuisTulisKartu
        id={idKuis("D", 9)}
        hanyaKanvas
        pertanyaan="Pensil 4, Penghapus 3, Penggaris 2. Berapakah jumlah seluruh alat tulis? Hitung 4 + 3 + 2, lalu tuliskan angkanya."
        alias={kumpulkanAlias(["9"])}
        konteks="4 + 3 + 2 = 9."
        visual={
          <div className="flex justify-center gap-3">
            <KolomGambar nama="Pensil" ikon="✏️" n={4} max={4} />
            <KolomGambar nama="Hapus" ikon="🧽" n={3} max={4} />
            <KolomGambar nama="Garis" ikon="📏" n={2} max={4} />
          </div>
        }
      />
    </div>
  );
}

export default function NaskahMtk2Bab8({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB8;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🧢🦁🦓
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Sub-Bab 8.1: Mengenal dan Membaca Diagram Turus"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Halo penjaga hutan cilik! Hari ini kita akan mencatat jumlah hewan di Taman Safari bersama Ranger IGIL menggunakan Turus.",
            "Turus adalah garis tegak untuk menghitung satu per satu. Ingat aturannya: setiap hitungan kelima, kita buat satu garis miring mengikat empat garis tegak supaya menjadi satu ikatan lima!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab8-turus.jpg"
            alt="Empat garis tegak dicoret miring menjadi ikatan lima sama dengan 5. Ranger IGIL di kiri bawah."
          />
          <AdeganSafari>
            <p className="text-sm font-semibold">
              Ranger IGIL, Kino, dan Lala di depan papan kayu Tabel Turus Satwa Taman Safari. Di rumput ada 7 rusa dan 5 zebra.
            </p>
          </AdeganSafari>
          <PapanTurus
            baris={[
              { nama: "Rusa", ikon: "🦌", n: 7 },
              { nama: "Zebra", ikon: "🦓", n: 5 },
            ]}
          />
          <Dialog nama="Kino" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Ranger IGIL, rusanya bergerak terus! Kalau dihitung biasa, aku sering lupa sudah sampai angka berapa.”
          </Dialog>
          <Dialog nama="Lala" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Pakai garis Turus saja, Kino! Setiap melihat 1 rusa, kita gambar 1 garis tegak di papan.”
          </Dialog>
          <Dialog nama="Ranger IGIL" warna="border-amber-300 bg-amber-50">
            “Betul, Lala! Saat mencapai rusa ke-5, kita tarik garis miring untuk mengikatnya jadi 5. Jadi untuk 7 rusa, ada 1 ikat lima dan 2 garis satuan!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            pertanyaanSuara="Pada tabel turus, satu ikatan garis yang sudah diberi garis miring bernilai berapa? Ucapkan angkanya ke mikrofon!"
            aliasSuara={["lima", "5"]}
            petunjukSuara="Ucapkan lima."
          />
          <KuisIkatTurus />
        </div>

        <JudulSubBab
          judul="Sub-Bab 8.2: Menyusun dan Membaca Diagram Gambar"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Selain memakai turus, kita juga bisa menyajikan data dalam bentuk Diagram Gambar!",
            "Pada diagram gambar, setiap 1 gambar mewakili 1 benda, dan disusun berjajar rapi di dalam kotak-kotak yang ukurannya sama agar kita langsung tahu mana yang paling banyak dan paling sedikit.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab8-gambar.jpg"
            alt="Diagram berpetak: menara monyet 6, gajah 3, jerapah 4, panah di puncak tertinggi. Ranger IGIL di kiri bawah."
          />
          <AdeganSafari>
            <p className="text-sm font-semibold">
              Burung Kakaktua Koko terbang di dekat papan Diagram Gambar Buah Makanan Satwa: Pisang 8, Wortel 5, Apel 6.
            </p>
          </AdeganSafari>
          <div className="flex justify-center gap-4">
            <KolomGambar nama="Pisang" ikon="🍌" n={8} />
            <KolomGambar nama="Wortel" ikon="🥕" n={5} />
            <KolomGambar nama="Apel" ikon="🍎" n={6} />
          </div>
          <Dialog nama="Lala" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Wah, kalau disusun jadi Diagram Gambar seperti ini, papan datanya jadi cantik sekali ya, Ranger IGIL!”
          </Dialog>
          <Dialog nama="Kino" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Iya! Tanpa menghitung satu-satu dari bawah, aku langsung tahu Pisang paling banyak karena menara gambarnya paling tinggi!”
          </Dialog>
          <Dialog nama="Ranger IGIL" warna="border-amber-300 bg-amber-50">
            “Pintar! Kita juga bisa mencari selisihnya. Pisang ada 8 dan Wortel ada 5, jadi Pisang 3 lebih banyak daripada Wortel!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            pertanyaanSuara="Pisang ada 8, Wortel ada 5, dan Apel ada 6. Buah apakah yang jumlahnya paling sedikit? Sebutkan namanya!"
            aliasSuara={["wortel"]}
            petunjukSuara="Ucapkan wortel."
          />
          <KuisTulisKartu
            id={idKuis("A", 3)}
            hanyaKanvas
            pertanyaan="Berapa selisih antara jumlah Burung Kakaktua dan Burung Merak? Hitung 6 dikurangi 4, lalu tuliskan angkanya!"
            alias={kumpulkanAlias(["2", "dua"])}
            konteks="6 − 4 = 2."
            visual={
              <div className="flex justify-center gap-4">
                <KolomGambar nama="Kakaktua" ikon="🦜" n={6} />
                <KolomGambar nama="Merak" ikon="🦚" n={4} />
              </div>
            }
          />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan taman safari</p>
        <div className="space-y-3">
          <KuisCocok
            id={idKuis("A", 4)}
            soal="Tarik kartu kumpulan garis turus ke angka yang tepat."
            baris={[
              { id: "a", tampil: <>A. 1 ikat lima + 1 garis <LambangTurus n={6} /></>, benar: "6" },
              { id: "b", tampil: <>B. 2 ikat lima <LambangTurus n={10} /></>, benar: "10" },
              { id: "c", tampil: <>C. 3 garis tegak <LambangTurus n={3} /></>, benar: "3" },
            ]}
            label={["6", "10", "3"]}
            umpanBenar="6, 10, dan 3. Lompat lima dulu."
            pesanSalah="1 ikat = 5. Tambah garis satuan."
          />
          <KuisPilih
            id={idKuis("A", 5)}
            soal="Pilih cara menulis turus untuk angka 5 yang benar."
            benar="B"
            umpanBenar="Benar! Empat garis tegak diikat garis miring."
            pesanSalah="Setiap lima garis harus diikat, jangan lima tegak polos."
            anak={
              <div className="grid gap-2 text-center">
                <p className="rounded-xl bg-white py-2">A. <GarisTegak n={5} /></p>
                <p className="rounded-xl bg-white py-2">B. <LambangTurus n={5} /></p>
                <p className="rounded-xl bg-white py-2">C. <GarisTegak n={3} /></p>
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Lima garis tegak tanpa ikat" },
              { huruf: "B", teks: "Empat garis tegak plus satu garis miring" },
              { huruf: "C", teks: "Tiga garis tegak" },
            ]}
          />
          <KuisBenarSalah
            id={idKuis("A", 6)}
            soal='Kolom Kupu-kupu tingginya 9 kotak dan kolom Lebah tingginya 7 kotak. Kino berkata: "Lebah lebih banyak daripada Kupu-kupu." Benar atau Salah?'
            benar="salah"
            anak={
              <div className="flex justify-center gap-4">
                <KolomGambar nama="Kupu" ikon="🦋" n={9} />
                <KolomGambar nama="Lebah" ikon="🐝" n={7} />
              </div>
            }
            umpanBenar="Salah. Kupu-kupu 9 lebih banyak dari lebah 7."
            pesanSalah="Lihat menara yang lebih tinggi."
          />
          <KuisTapGajah />
          <KuisSusun
            id={idKuis("A", 8)}
            soal="Berdasarkan Tabel Turus (Singa = 4, Zebra = 8, Jerapah = 6), susun kartu dari yang Paling Sedikit ke Paling Banyak."
            pool={[
              { kunci: "zebra", tampil: "Zebra 8" },
              { kunci: "singa", tampil: "Singa 4" },
              { kunci: "jerapah", tampil: "Jerapah 6" },
            ]}
            benar={["singa", "jerapah", "zebra"]}
            umpanBenar="Singa, lalu Jerapah, lalu Zebra."
            pesanSalah="Mulai dari 4, lalu 6, lalu 8."
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📊📏🖼️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>

        <JudulSubBab
          judul="Infografis 1: Cara Cepat Membaca dan Menulis Tabel Turus"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Perhatikan cara cepat membaca turus ini! Kita tidak perlu menghitung garisnya satu-satu dari awal. Cukup hitung lompat lima untuk setiap ikatan turus, lalu tambahkan garis satuannya!",
          ]}
        />
        <div className="mt-4 space-y-3">
          <AdeganSafari>
            <p className="text-sm font-black">📏 1 garis tegak = 1 · 1 ikatan turus = 5</p>
          </AdeganSafari>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            1 ikat (5) + 3 garis (3) → 5 + 3 = 8
          </p>
          <div className="text-center">
            <LambangTurus n={8} />
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">
            2 ikat (5 + 5) + 2 garis (2) → 10 + 2 = 12
          </p>
          <div className="text-center">
            <LambangTurus n={12} />
          </div>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            pertanyaanSuara="Jika ada 2 ikatan turus penuh dan tidak ada garis sisa, berapa jumlahnya?"
            aliasSuara={["sepuluh", "10"]}
            petunjukSuara="Ucapkan sepuluh."
          />
          <KuisTulisKartu
            id={idKuis("B", 1)}
            hanyaKanvas
            pertanyaan="Ada 1 ikatan turus (5) ditambah 4 garis tegak (4). Tuliskan angka jumlah seluruhnya!"
            alias={kumpulkanAlias(["9"])}
            konteks="5 + 4 = 9."
            visual={<LambangTurus n={9} />}
          />
        </div>

        <JudulSubBab
          judul="Infografis 2: Mengubah Tabel Turus ke Diagram Gambar"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Data pada Tabel Turus dan Diagram Gambar sebenarnya menunjukkan jumlah yang sama! Bedanya, pada diagram gambar kita memakai gambar benda yang disusun rapi di dalam petak untuk memudahkan perbandingan.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <PapanTurus baris={[{ nama: "Kura", ikon: "🐢", n: 6 }]} />
          <div className="flex justify-center">
            <KolomGambar nama="Kura-kura" ikon="🐢" n={6} />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Hitung turus: 1 ikat + 1 garis = 6. Isi 6 petak. Selisih = terbanyak − paling sedikit. Total = gabungan semua kolom.
          </p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            pertanyaanSuara="Untuk mencari selisih antara dua data pada diagram, apakah angkanya kita tambahkan atau kita kurangkan?"
            aliasSuara={["kurangkan", "dikurangi", "kurang"]}
            petunjukSuara="Ucapkan kurangkan."
          />
          <KuisTandaiPetak />
        </div>

        <p className="mt-6 text-base font-extrabold text-[#1C01A5]">Permainan infografis</p>
        <div className="space-y-3">
          <KuisPilih
            id={idKuis("B", 4)}
            soal="Tabel turus Ikan = 1 ikat (5) + 2 garis (7). Pilih kolom diagram yang jumlah ikannya tepat!"
            benar="B"
            umpanBenar="Benar! 5 + 2 = 7 ikan."
            pesanSalah="Satu ikat lima plus dua garis = 7."
            anak={
              <div className="flex justify-center gap-3">
                <KolomGambar nama="A" ikon="🐟" n={5} max={8} />
                <KolomGambar nama="B" ikon="🐟" n={7} max={8} />
                <KolomGambar nama="C" ikon="🐟" n={8} max={8} />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Kolom 5" },
              { huruf: "B", teks: "Kolom 7" },
              { huruf: "C", teks: "Kolom 8" },
            ]}
          />
          <KuisKelebihanJeruk />
          <KuisPilih
            id={idKuis("B", 6)}
            soal="Tabel: Kucing = 5, Burung = 8, Kelinci = 4. Di diagram, kolom Burung hanya 6 gambar. Ketuk hewan yang salah digambar!"
            benar="B"
            umpanBenar="Benar! Burung seharusnya 8, bukan 6."
            pesanSalah="Bandingkan tabel dan diagram. Burung kurang 2."
            anak={
              <div className="flex justify-center gap-3">
                <KolomGambar nama="Kucing" ikon="🐱" n={5} />
                <KolomGambar nama="Burung" ikon="🐦" n={6} />
                <KolomGambar nama="Kelinci" ikon="🐰" n={4} />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "Kucing" },
              { huruf: "B", teks: "Burung" },
              { huruf: "C", teks: "Kelinci" },
            ]}
          />
          <KuisPilih
            id={idKuis("B", 7)}
            soal="Gajah = 3, Zebra = 4, Rusa = 3. Berapa jumlah seluruh hewan jika digabungkan?"
            benar="B"
            umpanBenar="Benar! 3 + 4 + 3 = 10."
            pesanSalah="Jumlahkan semua kolom."
            anak={
              <div className="flex justify-center gap-3">
                <KolomGambar nama="Gajah" ikon="🐘" n={3} max={4} />
                <KolomGambar nama="Zebra" ikon="🦓" n={4} max={4} />
                <KolomGambar nama="Rusa" ikon="🦌" n={3} max={4} />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "8" },
              { huruf: "B", teks: "10" },
              { huruf: "C", teks: "12" },
            ]}
          />
          <KuisPilih
            id={idKuis("B", 8)}
            soal="Diagram tegak: Apel = 5, Pisang = 3. Pilih diagram mendatar yang nilainya sama persis!"
            benar="A"
            umpanBenar="Benar! Apel 5 dan Pisang 3, hanya arahnya mendatar."
            pesanSalah="Jumlah di tiap buah harus sama, meski barisnya tidur."
            anak={
              <div className="flex justify-center gap-4">
                <KolomGambar nama="Apel" ikon="🍎" n={5} max={5} />
                <KolomGambar nama="Pisang" ikon="🍌" n={3} max={5} />
              </div>
            }
            pilihan={[
              { huruf: "A", teks: "🍎🍎🍎🍎🍎  dan  🍌🍌🍌" },
              { huruf: "B", teks: "🍎🍎🍎  dan  🍌🍌🍌🍌🍌" },
              { huruf: "C", teks: "🍎🍎🍎🍎🍎  dan  🍌🍌🍌🍌🍌" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏕️⭐🏅
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Sepuluh pos · logistik satwa</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiSafari />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Setiap menghitung 5 benda, empat garis tegak diikat dengan 1 garis miring sehingga mudah dihitung lompat lima (5, 10, 15).",
          "Diagram gambar menyajikan data dengan gambar yang disusun rapi di dalam petak yang sama besar. 1 gambar mewakili 1 benda.",
          "Dari tabel dan diagram, kita bisa langsung mengetahui data paling banyak, paling sedikit, jumlah gabungan, serta selisihnya dengan cara mengurangkan.",
        ]}
        penutup='Kalimat kunci: “Ikat lima. Petak sama besar. Selisih dikurangkan.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Tantangan Para Juara · Turus dan Diagram Gambar</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)} />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB8.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Ikat lima. Petak sama besar."
          alias={kumpulkanAlias(["lima", "petak"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
