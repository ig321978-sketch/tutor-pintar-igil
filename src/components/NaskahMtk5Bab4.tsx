"use client";

import GambarCerita from "@/components/GambarCerita";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { BingkaiTabMateri, PagerSubbab } from "@/components/modul/EmpatHalamanMateri";
import TujuanBelajar from "@/components/TujuanBelajar";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB4, TEMA_MTK5_BAB4 } from "@/lib/misi-mtk-5-bab4";
import { MODUL_MTK5_BAB4 } from "@/lib/modul-resmi-mtk-5-bab4";
import {
  hasil10,
  hasil12,
  hasil14,
  hasil15,
  hasil16,
  hasil17,
  hasil18,
  hasil19,
  hasil22,
  hasil24,
  hasil25,
  hasil26,
  hasil28,
  hasil30,
  hasil46,
  hasil48,
  hasil80,
  hasil82,
  jawabKeliling,
} from "@/lib/nilai-mtk-5-bab4";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB4.id;
const PASANGAN_BANYAK = ["15 cm", "18 cm", "12 cm"];
const PASANGAN_RUMUS = ["15 cm", "12 cm", "18 cm"];
const PASANGAN_UJI = ["22 cm", "23 cm", "28 cm"];

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Raka: "border-teal-300 bg-teal-50",
  Dina: "border-rose-300 bg-rose-50",
  Farid: "border-amber-300 bg-amber-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Raka: "👦",
  Dina: "👧",
  Farid: "👦",
  Igil: "🦉",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span className="text-2xl leading-none" aria-hidden>{WAJAH_DIALOG[nama] ?? "💬"}</span>
        {nama}
      </p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function Papan({ anak }: { anak: string }) {
  return (
    <p className="whitespace-pre-wrap rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
      {anak}
    </p>
  );
}

function KepalaKartu({
  ikon,
  judul,
  anak,
  kelas,
  kelamin,
  cuplikan,
}: {
  ikon: string;
  judul: string;
  anak?: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  cuplikan?: CuplikanVoiceMateri[];
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>{ikon}</p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      {cuplikan && cuplikan.length > 0 ? (
        <div className="mt-3">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
        </div>
      ) : null}
    </>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

const GAMBAR_TAMAN = {
  pagar: { src: "/doodle-mtk/mtk-5-bab4-pagar.jpg", alt: "Raka, Dina, dan Farid di pagar taman senja. Igil di tiang pagar." },
  segitiga: { src: "/doodle-mtk/mtk-5-bab4-segitiga.jpg", alt: "Bingkai segitiga dan layang di taman. Igil di bingkai tengah." },
  segi4: { src: "/doodle-mtk/mtk-5-bab4-segi4.jpg", alt: "Bingkai persegi dan persegi panjang di pagar. Igil di bingkai." },
  banyak: { src: "/doodle-mtk/mtk-5-bab4-banyak.jpg", alt: "Lentera segi banyak di taman senja. Igil di tiang." },
  gabung: { src: "/doodle-mtk/mtk-5-bab4-gabung.jpg", alt: "Jalan batu berbentuk L di tepi kanal. Igil di batu luar." },
  pos: { src: "/doodle-mtk/mtk-5-bab4-pos.jpg", alt: "Batu loncatan di tepi kanal. Igil di batu pertama." },
  meja: { src: "/doodle-mtk/mtk-5-bab4-meja.jpg", alt: "Meja kecil dengan kertas kosong. Igil menunggu di samping." },
  kartu: { src: "/doodle-mtk/mtk-5-bab4-kartu.jpg", alt: "Raka, Dina, Farid, dan Igil memegang kartu kosong di taman senja." },
} as const;

function GambarTaman({ jenis }: { jenis: keyof typeof GAMBAR_TAMAN }) {
  const gambar = GAMBAR_TAMAN[jenis];
  return <GambarCerita src={gambar.src} alt={gambar.alt} />;
}

function Adegan({
  judul,
  jenis,
  kelas,
  kelamin,
  penjelasan,
  children,
}: {
  judul: string;
  jenis: keyof typeof GAMBAR_TAMAN;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarTaman jenis={jenis} />
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({ id, pertanyaan, periksa, petunjuk, benar }: { id: string; pertanyaan: string; periksa: (teks: string) => boolean; petunjuk: string; benar?: string }) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(hasil) => setTepat(hasil)} />
      {tepat && benar ? <p className="mt-2 text-sm font-bold text-emerald-800">{benar}</p> : null}
    </div>
  );
}

function Pilih({ id, pertanyaan, pilihan, benar, umpan, salah, visual }: { id: string; pertanyaan: string; pilihan: { huruf: string; teks: string }[]; benar: string; umpan: string; salah: string; visual?: ReactNode }) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button key={item.huruf} type="button" onClick={() => { setPilih(item.huruf); if (item.huruf === benar) kuis?.tandaiBenar(id); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(pilih, item.huruf, benar, "bg-[#1C01A5] text-white hover:bg-[#16017a]")}`}>
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisCocok({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { kiri: string; pilihan: string[]; benar: string }[]; umpan: string }) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, string>>({});
  const [aktif, setAktif] = useState(0);
  const [cek, setCek] = useState(false);
  const lengkap = baris.every((_, indeks) => peta[indeks]);
  const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk soal, lalu ketuk pasangannya.</p>
      <div className="mt-3 grid gap-2">
        {baris.map((item, indeks) => {
          const warna = !cek ? "border-sky-200 bg-white" : peta[indeks] === item.benar ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50";
          return (
            <button key={item.kiri} type="button" onClick={() => setAktif(indeks)} className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}>
              <span>{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button key={`${aktif}-${kalimat}`} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [aktif]: kalimat })); setCek(false); }} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20">{kalimat}</button>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={() => { setCek(true); if (tepat) kuis?.tandaiBenar(id); }} className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pasangan</button>
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan hitungannya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
    </article>
  );
}

function TulisBebas({ id, judul, visual, pertanyaan, pesanSalah, bantuan, umpan, periksa, alias = [], konteks }: { id: string; judul?: string; visual?: ReactNode; pertanyaan: string; pesanSalah: string; bantuan?: string; umpan: string; periksa: (teks: string) => boolean; alias?: string[]; konteks?: string }) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const [salahKe, setSalahKe] = useState(0);
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }) });
        const json = (await respons.json()) as { berhasil?: boolean; benar?: boolean; bacaan?: string; pesan?: string };
        if (!respons.ok || !json.berhasil) { setStatus(null); setCuplikan(json.pesan || "Gagal menilai. Kirim lagi."); return; }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(id);
        else setSalahKe((jumlah) => jumlah + 1);
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    const ok = periksa(data);
    setCuplikan(data.trim());
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
    else setSalahKe((jumlah) => jumlah + 1);
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      {visual ? <div>{visual}</div> : null}
      {judul ? <p className="text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">{pertanyaan}</p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis status={status} cuplikan={cuplikan || undefined} pesanSalah={pesanSalah} />
      {bantuan && salahKe >= 2 && status === "salah" ? <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">{bantuan}</p> : null}
      <Umpan status={status} teks={umpan} />
    </div>
  );
}

function SusunToken({ id, perintah, acak, benar, umpan, pesanSalah }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string; pesanSalah: string }) {
  const kuis = useKuisMateri();
  const [sisa, setSisa] = useState(() => acak.map((teks, indeks) => ({ id: indeks, teks })));
  const [susun, setSusun] = useState<{ id: number; teks: string }[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((item, indeks) => item.teks === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join("  ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id)); setSusun((lama) => [...lama, item]); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300">{item.teks}</button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => { setSusun((lama) => { const akhir = lama[lama.length - 1]; if (akhir) setSisa((kartu) => [...kartu, akhir]); return lama.slice(0, -1); }); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">Urungkan</button>
        <button type="button" onClick={periksa} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">Periksa urutan</button>
      </div>
      <HasilJawabanKuis status={status} pesanSalah={pesanSalah} />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisBenarSalah({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { teks: string; benar: boolean }[]; umpan: string }) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, boolean | undefined>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const lengkap = baris.every((_, indeks) => peta[indeks] !== undefined);
  const periksa = () => {
    const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <div className="mt-3 space-y-3">
        {baris.map((item, indeks) => (
          <div key={item.teks} className="rounded-xl bg-white px-3 py-3">
            <p className="text-sm font-semibold text-slate-700">{item.teks}</p>
            <div className="mt-2 flex gap-2">
              {[true, false].map((nilai) => (
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pernyataan</button>
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi pernyataannya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function LintasanTaman() {
  const sisi = [
    { nama: "Atas 100 m", nilai: 100 },
    { nama: "Kanan 50 m", nilai: 50 },
    { nama: "Bawah 100 m", nilai: 100 },
    { nama: "Kiri 50 m", nilai: 50 },
  ];
  const [aktif, setAktif] = useState<number[]>([]);
  const jumlah = aktif.reduce((total, indeks) => total + sisi[indeks].nilai, 0);
  const lengkap = aktif.length === 4;
  return (
    <div className="rounded-2xl border-2 border-teal-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Ketuk empat tepi taman.</p>
      <svg viewBox="0 0 240 110" className="mx-auto mt-3 w-full max-w-xs" aria-hidden>
        <rect x="40" y="20" width="160" height="70" rx="6" fill="#d1fae5" stroke="#0f766e" strokeWidth="4" />
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisi.map((item, indeks) => {
          const nyala = aktif.includes(indeks);
          return (
            <button key={item.nama} type="button" onClick={() => setAktif((lama) => (lama.includes(indeks) ? lama : [...lama, indeks]))} className={`rounded-full px-3 py-2 text-sm font-black ${nyala ? "bg-teal-700 text-white" : "bg-teal-50 text-teal-900 ring-2 ring-teal-200"}`}>
              {item.nama}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">
        {lengkap ? "Keliling 300 m. Raka kembali ke titik semula." : `Tepi yang diketuk: ${jumlah} m.`}
      </p>
    </div>
  );
}

function SegiN() {
  const [sisi, setSisi] = useState(5);
  const hasil = sisi === 8 ? "Keliling = 8 × panjang sisi." : `${sisi} × 3 = ${sisi * 3} cm.`;
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Lentera beraturan, sisi 3 cm. Ketuk banyak sisinya.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[5, 6, 8].map((jumlah) => (
          <button key={jumlah} type="button" onClick={() => setSisi(jumlah)} className={`rounded-full px-4 py-2 text-sm font-black ${sisi === jumlah ? "bg-amber-600 text-white" : "bg-amber-50 text-amber-950 ring-2 ring-amber-200"}`}>
            {jumlah} sisi
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{hasil}</p>
    </div>
  );
}

function TepiLuar() {
  const tepi = [6, 3, 4, 2, 2, 5];
  const [nyala, setNyala] = useState<boolean[]>(tepi.map(() => false));
  const [dalam, setDalam] = useState(false);
  const jumlah = tepi.reduce((total, nilai, indeks) => total + (nyala[indeks] ? nilai : 0), 0);
  const lengkap = nyala.every(Boolean);
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Ketuk tepi luar saja.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tepi.map((nilai, indeks) => (
          <button key={`${nilai}-${indeks}`} type="button" onClick={() => setNyala((lama) => lama.map((item, urut) => (urut === indeks ? true : item)))} className={`rounded-full px-3 py-2 text-sm font-black ${nyala[indeks] ? "bg-sky-700 text-white" : "bg-sky-50 text-sky-950 ring-2 ring-sky-200"}`}>
            {nilai} m
          </button>
        ))}
        <button type="button" onClick={() => setDalam(true)} className="rounded-full bg-rose-50 px-3 py-2 text-sm font-black text-rose-800 ring-2 ring-rose-200">Dinding dalam</button>
      </div>
      {dalam ? <p className="mt-2 text-sm font-bold text-rose-800">Dinding dalam bukan tepi. Tidak dijumlah.</p> : null}
      <p className="mt-3 text-sm font-bold text-slate-700">{lengkap ? "Keliling tepi luar 22 m." : `Tepi luar yang diketuk: ${jumlah} m.`}</p>
    </div>
  );
}

const PILIH_TEPI = ["28 cm", "18 cm", "10 cm"];
const PILIH_TIGA = ["12 cm", "15 cm", "19 cm"];
const PILIH_EMPAT = ["24 cm", "22 cm", "18 cm"];

function Lambang({ judul, baris }: { judul: string; baris: string[] }) {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      {baris.map((teks) => <p key={teks} className="mt-2 text-lg font-black text-[#1C01A5]">{teks}</p>)}
    </div>
  );
}

function SubbabKeliling({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Pengertian keliling"
      selesaiTeks="Empat halaman keliling selesai."
      grup={[[idKuis("A", 0), idKuis("A", 1)], [idKuis("B", 0), idKuis("B", 1)], [idKuis("A", 11), idKuis("A", 15), idKuis("A", 16)], [idKuis("A", 10), idKuis("A", 17), idKuis("A", 18)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Keliling adalah jumlah panjang sisi.", "Mulai di satu titik, susuri tepi, berhenti di titik semula."])} />
          <Dialog nama="Raka" anak="Taman ini panjang 100 m dan lebar 50 m. Aku menyusuri empat tepinya: 100 + 50 + 100 + 50 = 300. Aku kembali ke titik semula. Jarak itu 300 m." />
          <Dialog nama="Dina" anak="Kalau aku hanya bolak-balik di sisi panjang, 100 + 100 + 100 = 300 juga. Tapi aku belum mengelilingi taman." />
          <Dialog nama="Farid" anak="Memotong tengah taman juga bisa 300 m. Aku berhenti jauh dari titik awal. Itu bukan keliling." />
          <LintasanTaman />
          <Dialog nama="Igil" anak="Keliling bangun datar adalah jumlah panjang sisi-sisinya. Bingkai Dina bersisi 4 cm. 4 + 4 + 4 + 4 = 16. Kelilingnya 16 cm." />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Bingkai lain bersisi 5 cm, 4 cm, 5 cm, dan 5 cm. Berapa kelilingnya?" periksa={hasil19} petunjuk="Jumlahkan keempat sisinya." benar="19 cm." />
          <TulisBebas id={idKuis("A", 1)} judul="Pagar kecil" visual={<Papan anak="8 m + 6 m + 8 m + 6 m" />} pertanyaan="Tulis kelilingnya." pesanSalah="Jumlahkan empat sisinya." bantuan="8 + 6 + 8 + 6 = 28." umpan="28 m." periksa={hasil28} alias={["28"]} konteks="8 + 6 + 8 + 6 = 28." />
        </>,
        <>
          <Dialog nama="Igil" anak="Infografis ini mengingat arti keliling di taman." />
          <TabelInfoGrafis judul="Infografis: Apa itu keliling" kepala={["Contoh", "Cara", "Hasil"]} baris={[["Taman", "100 + 50 + 100 + 50", "300 m"], ["Bingkai", "4 + 4 + 4 + 4", "16 cm"], ["Arti", "jumlah panjang sisi", "keliling"]]} kaki="Susuri tepi, lalu kembali ke titik semula." />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Jumlah panjang semua sisi disebut apa?" periksa={jawabKeliling} petunjuk="Katanya dimulai dengan huruf k." benar="Keliling." />
          <TulisBebas id={idKuis("B", 1)} judul="Bingkai kecil" visual={<Papan anak="2 cm + 3 cm + 2 cm + 3 cm" />} pertanyaan="Tulis kelilingnya." pesanSalah="Jumlahkan empat sisinya." bantuan="2 + 3 + 2 + 3 = 10." umpan="10 cm." periksa={hasil10} alias={["10"]} konteks="2 + 3 + 2 + 3 = 10." />
        </>,
        <>
          <GambarTaman jenis="pagar" />
          <SusunToken id={idKuis("A", 11)} perintah="Susun cara mengukur keliling." acak={["Tulis satuan", "Ukur sisi", "Jumlahkan"]} benar={["Ukur sisi", "Jumlahkan", "Tulis satuan"]} umpan="Ukur dulu, jumlahkan, lalu tulis satuannya." pesanSalah="Mulai dari mengukur sisi." />
          <KuisBenarSalah id={idKuis("A", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "Keliling adalah jumlah panjang sisi.", benar: true }, { teks: "Memotong tengah taman selalu disebut keliling.", benar: false }, { teks: "Keliling berakhir di titik awal.", benar: true }]} umpan="Keliling mengikuti tepi dan kembali ke awal." />
          <KuisCocok id={idKuis("A", 16)} perintah="Pasangkan jumlah sisi dengan kelilingnya." baris={[{ kiri: "7 + 7 + 7 + 7", pilihan: PILIH_TEPI, benar: "28 cm" }, { kiri: "4 + 5 + 4 + 5", pilihan: PILIH_TEPI, benar: "18 cm" }, { kiri: "2 + 2 + 2 + 2 + 2", pilihan: PILIH_TEPI, benar: "10 cm" }]} umpan="28 cm, 18 cm, dan 10 cm." />
        </>,
        <>
          <Dialog nama="Raka" anak="Lambang keliling menjumlahkan setiap sisi, lalu menulis satuannya." />
          <Lambang judul="Lambang keliling" baris={["4 + 4 + 4 + 4 = 16", "sisi + sisi + sisi + sisi"]} />
          <Pilih id={idKuis("A", 10)} pertanyaan="Jarak yang disebut keliling adalah..." pilihan={[{ huruf: "A", teks: "bolak-balik di satu sisi saja" }, { huruf: "B", teks: "menyusuri semua tepi, lalu kembali ke titik semula" }, { huruf: "C", teks: "memotong tengah taman" }, { huruf: "D", teks: "berhenti jauh dari titik awal" }]} benar="B" umpan="Keliling mengikuti seluruh tepi dan kembali ke awal." salah="Lihat lagi lintasan yang kembali ke titik semula." />
          <Pilih id={idKuis("A", 17)} pertanyaan="9 + 3 + 9 + 3 = ..." pilihan={[{ huruf: "A", teks: "24 cm" }, { huruf: "B", teks: "12 cm" }, { huruf: "C", teks: "27 cm" }, { huruf: "D", teks: "15 cm" }]} benar="A" umpan="9 + 3 + 9 + 3 = 24." salah="Jumlahkan keempat sisinya." />
          <Pilih id={idKuis("A", 18)} pertanyaan="5 + 8 + 5 + 8 = ..." pilihan={[{ huruf: "A", teks: "26 cm" }, { huruf: "B", teks: "18 cm" }, { huruf: "C", teks: "13 cm" }, { huruf: "D", teks: "40 cm" }]} benar="A" umpan="5 + 8 + 5 + 8 = 26." salah="Ada dua pasang sisi. Jumlahkan semuanya." />
        </>,
      ]}
    />
  );
}

function SubbabSegitiga({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Keliling segitiga"
      selesaiTeks="Empat halaman segitiga selesai."
      grup={[[idKuis("A", 2), idKuis("A", 3)], [idKuis("B", 2), idKuis("B", 3)], [idKuis("A", 19), idKuis("A", 12), idKuis("A", 20)], [idKuis("A", 21), idKuis("A", 22), idKuis("A", 23)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Segitiga punya tiga sisi.", "Kalau sisi-sisinya beda, jumlahkan satu per satu."])} />
          <Dialog nama="Dina" anak="Layang segitiga ini kuberi penggaris. Sisinya 3 cm, 5 cm, dan 6 cm. 3 + 5 + 6 = 14. Kelilingnya 14 cm." />
          <Dialog nama="Raka" anak="Segitiga lain bersisi 7 cm, 4 cm, dan 5 cm. 7 + 4 + 5 = 16. Keliling segitiga sembarang adalah jumlah tiga sisinya." />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Segitiga bersisi 8 cm, 5 cm, dan 4 cm. Berapa kelilingnya?" periksa={hasil17} petunjuk="Jumlahkan ketiga sisinya." benar="17 cm." />
          <TulisBebas id={idKuis("A", 3)} judul="Tiga batang" visual={<Papan anak="9 cm + 6 cm + 7 cm" />} pertanyaan="Tulis keliling segitiganya." pesanSalah="Ada tiga sisi. Jumlahkan semuanya." bantuan="9 + 6 + 7 = 22." umpan="22 cm." periksa={hasil22} alias={["22"]} konteks="9 + 6 + 7 = 22." />
        </>,
        <>
          <Dialog nama="Farid" anak="Layang sama sisi, setiap sisi 5 cm. Tiga sisi sama panjang, jadi 3 × 5 = 15. Kelilingnya 15 cm." />
          <Dialog nama="Igil" anak="Secara umum, keliling segitiga sama sisi = 3 × panjang sisi. Kalau sisinya 6 cm, 6 + 6 + 6 = 3 × 6 = 18. Kelilingnya 18 cm." />
          <Dialog nama="Dina" anak="Segitiga sama kaki: dua sisi 6 cm dan alas 4 cm. 6 + 6 + 4 = 16. Bisa juga 2 × 6 + 4 = 16. Kelilingnya 16 cm." />
          <TabelInfoGrafis judul="Infografis: Keliling segitiga" kepala={["Jenis", "Cara", "Contoh"]} baris={[["Sembarang", "jumlah 3 sisi", "7 + 4 + 5 = 16"], ["Sama sisi", "3 × sisi", "3 × 5 = 15"], ["Sama kaki", "2 × kaki + alas", "2 × 6 + 4 = 16"]]} kaki="Sisi yang sama panjang boleh dikali." />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Segitiga sama sisi, panjang sisinya 5 cm. Berapa kelilingnya?" periksa={hasil15} petunjuk="Kalikan panjang sisi dengan 3." benar="15 cm." />
          <TulisBebas id={idKuis("B", 3)} judul="Sisi enam" visual={<Papan anak="segitiga sama sisi · 6 cm" />} pertanyaan="Tulis kelilingnya." pesanSalah="Tiga sisi sama panjang." bantuan="3 × 6 = 18." umpan="18 cm." periksa={hasil18} alias={["18"]} konteks="3 × 6 = 18." />
        </>,
        <>
          <GambarTaman jenis="segitiga" />
          <SusunToken id={idKuis("A", 19)} perintah="Susun keliling dari yang paling kecil." acak={["21 cm", "10 cm", "14 cm"]} benar={["10 cm", "14 cm", "21 cm"]} umpan="10 cm, lalu 14 cm, lalu 21 cm." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("A", 12)} perintah="Pilih benar atau salah." baris={[{ teks: "Keliling segitiga sama sisi = 4 × sisi.", benar: false }, { teks: "7 + 4 + 5 = 16.", benar: true }, { teks: "Pada segitiga sama kaki, dua kaki dikali 2, lalu ditambah alas.", benar: true }]} umpan="Sama sisi dikali 3, bukan 4. Dua pernyataan terakhir benar." />
          <KuisCocok id={idKuis("A", 20)} perintah="Pasangkan segitiga dengan kelilingnya." baris={[{ kiri: "4 + 4 + 4", pilihan: PILIH_TIGA, benar: "12 cm" }, { kiri: "9 + 2 + 4", pilihan: PILIH_TIGA, benar: "15 cm" }, { kiri: "8 + 8 + 3", pilihan: PILIH_TIGA, benar: "19 cm" }]} umpan="12 cm, 15 cm, dan 19 cm." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang segitiga sama sisi memakai kali tiga. Sisi yang beda tetap dijumlah." />
          <Lambang judul="Lambang segitiga" baris={["3 × sisi", "2 × kaki + alas"]} />
          <Pilih id={idKuis("A", 21)} pertanyaan="Segitiga sama sisi, sisi 7 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "21 cm" }, { huruf: "B", teks: "10 cm" }, { huruf: "C", teks: "14 cm" }, { huruf: "D", teks: "28 cm" }]} benar="A" umpan="3 × 7 = 21 cm." salah="Kalikan panjang sisi dengan 3." />
          <Pilih id={idKuis("A", 22)} pertanyaan="Segitiga sama kaki, kaki 9 cm dan alas 5 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "23 cm" }, { huruf: "B", teks: "14 cm" }, { huruf: "C", teks: "18 cm" }, { huruf: "D", teks: "45 cm" }]} benar="A" umpan="2 × 9 + 5 = 23 cm." salah="Dua kaki dikali 2, lalu tambah alas." />
          <Pilih id={idKuis("A", 23)} pertanyaan="6 + 7 + 2 = ..." pilihan={[{ huruf: "A", teks: "15 cm" }, { huruf: "B", teks: "42 cm" }, { huruf: "C", teks: "13 cm" }, { huruf: "D", teks: "9 cm" }]} benar="A" umpan="6 + 7 + 2 = 15." salah="Jumlahkan ketiga sisinya." />
        </>,
      ]}
    />
  );
}

function SubbabSegiEmpat({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Keliling segi empat"
      selesaiTeks="Empat halaman segi empat selesai."
      grup={[[idKuis("A", 4), idKuis("A", 5)], [idKuis("B", 4), idKuis("B", 5)], [idKuis("B", 15), idKuis("B", 16), idKuis("B", 17)], [idKuis("A", 13), idKuis("B", 18), idKuis("B", 19)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Persegi panjang punya dua pasang sisi yang sama.", "Persegi dan belah ketupat punya empat sisi sama panjang."])} />
          <Dialog nama="Raka" anak="Bingkai foto panjang 5 cm dan lebar 3 cm. Sisi yang berhadapan sama. 5 + 3 + 5 + 3 = 16. Atau (2 × 5) + (2 × 3) = 16. Kelilingnya 16 cm." />
          <Dialog nama="Igil" anak="Keliling persegi panjang = (2 × panjang) + (2 × lebar)." />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Persegi panjang, panjang 7 cm dan lebar 2 cm. Berapa kelilingnya?" periksa={hasil18} petunjuk="Kalikan panjang dan lebar masing-masing dengan 2, lalu jumlahkan." benar="18 cm." />
          <TulisBebas id={idKuis("A", 5)} judul="Bingkai lebar" visual={<Papan anak="panjang 9 cm · lebar 5 cm" />} pertanyaan="Tulis keliling persegi panjang itu." pesanSalah="(2 × panjang) + (2 × lebar)." bantuan="18 + 10 = 28." umpan="28 cm." periksa={hasil28} alias={["28"]} konteks="(2 × 9) + (2 × 5) = 28." />
        </>,
        <>
          <Dialog nama="Farid" anak="Jajargenjang alas 5 cm dan samping 3 cm. 5 + 3 + 5 + 3 = 16. Keliling = (2 × alas) + (2 × samping)." />
          <Dialog nama="Dina" anak="Layang-layang punya dua sisi pendek 2 cm dan dua sisi panjang 4 cm. 2 + 2 + 4 + 4 = 12. Keliling = (2 × pendek) + (2 × panjang) = 12 cm." />
          <Dialog nama="Raka" anak="Persegi dan belah ketupat, keempat sisinya 3 cm. 3 + 3 + 3 + 3 = 4 × 3 = 12. Keliling keduanya 12 cm." />
          <Dialog nama="Igil" anak="Trapesium bersisi 4 cm, 2 cm, 5 cm, dan 3 cm. Tidak ada yang sama, jadi 4 + 2 + 5 + 3 = 14. Segi empat sembarang 2 + 3 + 4 + 5 = 14 juga. Jumlahkan saja keempat sisinya." />
          <TabelInfoGrafis judul="Infografis: Keliling segi empat" kepala={["Bangun", "Cara", "Contoh"]} baris={[["Persegi panjang", "(2 × panjang) + (2 × lebar)", "16 cm"], ["Persegi", "4 × sisi", "12 cm"], ["Jajargenjang", "(2 × alas) + (2 × samping)", "16 cm"], ["Layang-layang", "(2 × pendek) + (2 × panjang)", "12 cm"], ["Trapesium", "jumlah 4 sisi", "14 cm"]]} kaki="Sisi yang sama dikali. Sisi yang beda dijumlah." />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Persegi dengan sisi 3 cm. Berapa kelilingnya?" periksa={hasil12} petunjuk="Empat sisi sama panjang." benar="12 cm." />
          <TulisBebas id={idKuis("B", 5)} judul="Empat sisi beda" visual={<Papan anak="4 cm + 2 cm + 5 cm + 3 cm" />} pertanyaan="Tulis keliling trapesium itu." pesanSalah="Jumlahkan keempat sisinya." bantuan="4 + 2 + 5 + 3 = 14." umpan="14 cm." periksa={hasil14} alias={["14"]} konteks="4 + 2 + 5 + 3 = 14." />
        </>,
        <>
          <GambarTaman jenis="segi4" />
          <SusunToken id={idKuis("B", 15)} perintah="Susun keliling dari yang paling kecil." acak={["20 cm", "8 cm", "16 cm"]} benar={["8 cm", "16 cm", "20 cm"]} umpan="8 cm, lalu 16 cm, lalu 20 cm." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("B", 16)} perintah="Pilih benar atau salah." baris={[{ teks: "Keliling persegi = 4 × sisi.", benar: true }, { teks: "Keliling persegi panjang = panjang × lebar.", benar: false }, { teks: "Setiap trapesium dihitung 4 × sisi.", benar: false }]} umpan="Persegi panjang memakai dua kali panjang ditambah dua kali lebar." />
          <KuisCocok id={idKuis("B", 17)} perintah="Pasangkan bangun dengan kelilingnya." baris={[{ kiri: "Persegi sisi 6 cm", pilihan: PILIH_EMPAT, benar: "24 cm" }, { kiri: "Persegi panjang 8 cm dan 3 cm", pilihan: PILIH_EMPAT, benar: "22 cm" }, { kiri: "3 + 5 + 4 + 6", pilihan: PILIH_EMPAT, benar: "18 cm" }]} umpan="24 cm, 22 cm, dan 18 cm." />
        </>,
        <>
          <Dialog nama="Farid" anak="Lambang segi empat memakai kali untuk sisi yang sama panjang." />
          <Lambang judul="Lambang segi empat" baris={["(2 × 6) + (2 × 4) = 20", "4 × 4 = 16"]} />
          <Pilih id={idKuis("A", 13)} pertanyaan="Layang-layang sisi pendek 2 cm dan sisi panjang 4 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "6 cm" }, { huruf: "B", teks: "8 cm" }, { huruf: "C", teks: "12 cm" }, { huruf: "D", teks: "16 cm" }]} benar="C" umpan="(2 × 2) + (2 × 4) = 4 + 8 = 12 cm." salah="Dua sisi pendek dan dua sisi panjang, masing-masing dikali 2." />
          <Pilih id={idKuis("B", 18)} pertanyaan="Jajargenjang alas 8 cm dan samping 5 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "26 cm" }, { huruf: "B", teks: "13 cm" }, { huruf: "C", teks: "40 cm" }, { huruf: "D", teks: "16 cm" }]} benar="A" umpan="(2 × 8) + (2 × 5) = 16 + 10 = 26 cm." salah="Ada dua alas dan dua samping." />
          <Pilih id={idKuis("B", 19)} pertanyaan="Belah ketupat dengan sisi 5 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "20 cm" }, { huruf: "B", teks: "10 cm" }, { huruf: "C", teks: "25 cm" }, { huruf: "D", teks: "15 cm" }]} benar="A" umpan="4 × 5 = 20 cm." salah="Empat sisi sama panjang." />
        </>,
      ]}
    />
  );
}

function SubbabSegiBanyak({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Keliling segi banyak"
      selesaiTeks="Empat halaman segi banyak selesai."
      grup={[[idKuis("A", 6), idKuis("A", 7)], [idKuis("B", 6), idKuis("B", 7)], [idKuis("A", 24), idKuis("A", 25), idKuis("A", 14)], [idKuis("A", 26), idKuis("A", 27), idKuis("A", 28)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Segi banyak beraturan punya sisi yang sama panjang.", "Kelilingnya banyak sisi kali panjang sisi."])} />
          <Dialog nama="Farid" anak="Lentera segi lima, setiap sisi 3 cm. Ada 5 sisi. 3 + 3 + 3 + 3 + 3 = 5 × 3 = 15. Kelilingnya 15 cm." />
          <Dialog nama="Dina" anak="Lentera segi enam, sisinya juga 3 cm. 6 × 3 = 18. Kelilingnya 18 cm." />
          <SegiN />
          <Dialog nama="Igil" anak="Segi delapan beraturan kelilingnya 8 × panjang sisi. Kalau sisi-sisinya tidak sama panjang, jumlahkan semuanya." />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Segi lima beraturan, sisi 2 cm. Berapa kelilingnya?" periksa={hasil10} petunjuk="Kalikan 5 dengan panjang sisi." benar="10 cm." />
          <TulisBebas id={idKuis("A", 7)} judul="Enam sisi" visual={<Papan anak="segi enam beraturan · sisi 5 cm" />} pertanyaan="Tulis kelilingnya." pesanSalah="Banyak sisi kali panjang sisi." bantuan="6 × 5 = 30." umpan="30 cm." periksa={hasil30} alias={["30"]} konteks="6 × 5 = 30." />
        </>,
        <>
          <TabelInfoGrafis judul="Infografis: Segi banyak beraturan" kepala={["Bangun", "Banyak sisi", "Keliling"]} baris={[["Segi lima", "5", "5 × 3 = 15 cm"], ["Segi enam", "6", "6 × 3 = 18 cm"], ["Segi delapan", "8", "8 × sisi"], ["Sisi beda", "semua", "jumlahkan satu per satu"]]} kaki="Beraturan: banyak sisi × panjang sisi." />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Segi enam beraturan, sisi 3 cm. Berapa kelilingnya?" periksa={hasil18} petunjuk="Kalikan 6 dengan 3." benar="18 cm." />
          <TulisBebas id={idKuis("B", 7)} judul="Delapan sisi" visual={<Papan anak="segi delapan beraturan · sisi 2 cm" />} pertanyaan="Tulis kelilingnya." pesanSalah="Kalikan 8 dengan panjang sisi." bantuan="8 × 2 = 16." umpan="16 cm." periksa={hasil16} alias={["16"]} konteks="8 × 2 = 16." />
        </>,
        <>
          <GambarTaman jenis="banyak" />
          <SusunToken id={idKuis("A", 24)} perintah="Susun keliling dari yang paling kecil." acak={["28 cm", "12 cm", "20 cm"]} benar={["12 cm", "20 cm", "28 cm"]} umpan="12 cm, lalu 20 cm, lalu 28 cm." pesanSalah="Mulai dari yang paling kecil." />
          <KuisBenarSalah id={idKuis("A", 25)} perintah="Pilih benar atau salah." baris={[{ teks: "Segi banyak beraturan: keliling = banyak sisi × sisi.", benar: true }, { teks: "Sisi yang tidak sama tetap dikali satu angka.", benar: false }, { teks: "Segi delapan beraturan punya 8 sisi.", benar: true }]} umpan="Yang beraturan dikali. Yang sisinya beda dijumlah satu per satu." />
          <KuisCocok id={idKuis("A", 14)} perintah="Pasangkan bangun dengan kelilingnya." baris={[{ kiri: "Segi lima sisi 3 cm", pilihan: PASANGAN_BANYAK, benar: "15 cm" }, { kiri: "Segi enam sisi 3 cm", pilihan: PASANGAN_BANYAK, benar: "18 cm" }, { kiri: "Persegi sisi 3 cm", pilihan: PASANGAN_BANYAK, benar: "12 cm" }]} umpan="15 cm, 18 cm, dan 12 cm." />
        </>,
        <>
          <Dialog nama="Dina" anak="Lambang segi banyak beraturan adalah banyak sisi kali panjang sisi." />
          <Lambang judul="Lambang segi banyak" baris={["5 × 6 = 30", "8 × 3 = 24"]} />
          <Pilih id={idKuis("A", 26)} pertanyaan="Segi lima beraturan, sisi 4 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "20 cm" }, { huruf: "B", teks: "9 cm" }, { huruf: "C", teks: "16 cm" }, { huruf: "D", teks: "25 cm" }]} benar="A" umpan="5 × 4 = 20 cm." salah="Kalikan banyak sisi dengan panjang sisi." />
          <Pilih id={idKuis("A", 27)} pertanyaan="Segi tujuh beraturan, sisi 3 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "21 cm" }, { huruf: "B", teks: "10 cm" }, { huruf: "C", teks: "18 cm" }, { huruf: "D", teks: "24 cm" }]} benar="A" umpan="7 × 3 = 21 cm." salah="Tujuh sisi yang sama panjang." />
          <Pilih id={idKuis("A", 28)} pertanyaan="Segi sembilan beraturan, sisi 3 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "27 cm" }, { huruf: "B", teks: "12 cm" }, { huruf: "C", teks: "18 cm" }, { huruf: "D", teks: "36 cm" }]} benar="A" umpan="9 × 3 = 27 cm." salah="Sembilan kali panjang sisi." />
        </>,
      ]}
    />
  );
}

function SubbabGabung({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <PagerSubbab
      judul="Keliling bangun gabungan"
      selesaiTeks="Empat halaman bangun gabungan selesai."
      grup={[[idKuis("A", 8), idKuis("A", 9)], [idKuis("B", 8), idKuis("B", 9)], [idKuis("B", 13), idKuis("B", 11), idKuis("B", 10)], [idKuis("B", 12), idKuis("B", 14), idKuis("B", 20)]]}
      isi={[
        <>
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(["Bangun gabungan disusun dari beberapa bangun datar.", "Yang dihitung hanya tepi luar."])} />
          <Dialog nama="Raka" anak="Denah ini tersusun dari persegi dan persegi panjang. Dinding dalam tidak mengelilingi bagian luar." />
          <TepiLuar />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="Tepi luar suatu pagar: 7 m, 4 m, 3 m, 2 m, 4 m, dan 6 m. Berapa kelilingnya?" periksa={hasil26} petunjuk="Jumlahkan tepi luar saja." benar="26 m." />
          <TulisBebas id={idKuis("A", 9)} judul="Enam tepi" visual={<Papan anak="9 + 2 + 4 + 2 + 5 + 3" />} pertanyaan="Tulis keliling tepi luar itu." pesanSalah="Jumlahkan keenam tepi itu." bantuan="9 + 2 + 4 + 2 + 5 + 3 = 25." umpan="25 m." periksa={hasil25} alias={["25"]} konteks="9 + 2 + 4 + 2 + 5 + 3 = 25." />
        </>,
        <>
          <Dialog nama="Dina" anak="Pada denah taman, tepi luarnya jika dijumlah menjadi 48 m. Cara lain: persegi besar yang melingkupinya bersisi 12 m. 4 × 12 = 48. Kelilingnya 48 m." />
          <Dialog nama="Farid" anak="Cara persegi besar tidak selalu bisa. Kalau ada lekuk, tepi mendatar harus dijumlah satu per satu." />
          <Dialog nama="Igil" anak="Infografis ini mengingat dua cara yang sama untuk denah itu." />
          <TabelInfoGrafis judul="Infografis: Tepi luar" kepala={["Cara", "Yang dihitung", "Hasil"]} baris={[["Jumlah tepi", "hanya sisi luar", "48 m"], ["Persegi luar", "4 × 12", "48 m"], ["Yang keliru", "keliling tiap bagian", "bukan keliling"]]} kaki="Keliling bangun gabungan hanya tepi luarnya." />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Suatu bangun gabungan: sisi kiri 20 cm, sisi atas 18 cm, sisi kanan 20 cm, sisi bawah 12 cm, 3 cm, dan 9 cm. Berapa kelilingnya?" periksa={hasil82} petunjuk="Jumlahkan semua tepi luar, termasuk tiga bagian sisi bawah." benar="82 cm." />
          <TulisBebas id={idKuis("B", 9)} judul="Denah taman" visual={<Papan anak="tepi luar denah · 4 × 12" />} pertanyaan="Tulis keliling denah itu." pesanSalah="4 kali 12, atau jumlah tepi luarnya." bantuan="4 × 12 = 48." umpan="48 m." periksa={hasil48} alias={["48"]} konteks="Keliling denah 48 m." />
        </>,
        <>
          <GambarTaman jenis="gabung" />
          <SusunToken id={idKuis("B", 13)} perintah="Susun keliling dari yang paling kecil: segi lima sisi 2, persegi sisi 3, segi enam sisi 3." acak={["18 cm", "10 cm", "12 cm"]} benar={["10 cm", "12 cm", "18 cm"]} umpan="10 cm, lalu 12 cm, lalu 18 cm." pesanSalah="Bandingkan 5 × 2, 4 × 3, dan 6 × 3." />
          <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Keliling bangun gabungan sama dengan jumlah keliling setiap bagiannya.", benar: false }, { teks: "Keliling persegi = 4 × sisi.", benar: true }, { teks: "Segi lima beraturan: keliling = 5 × sisi.", benar: true }]} umpan="Bagian dalam tidak ikut. Dua rumus terakhir benar." />
          <KuisCocok id={idKuis("B", 10)} perintah="Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "3 × 5", pilihan: PASANGAN_RUMUS, benar: "15 cm" }, { kiri: "4 × 3", pilihan: PASANGAN_RUMUS, benar: "12 cm" }, { kiri: "6 × 3", pilihan: PASANGAN_RUMUS, benar: "18 cm" }]} umpan="15 cm, 12 cm, dan 18 cm." />
        </>,
        <>
          <Dialog nama="Igil" anak="Lambang bangun gabungan hanya menjumlahkan tepi yang menghadap luar." />
          <Lambang judul="Lambang tepi luar" baris={["10 + 6 + 10 + 4 = 30", "tepi dalam tidak ikut"]} />
          <Pilih id={idKuis("B", 12)} pertanyaan="Jajargenjang alas 5 cm dan samping 3 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "8 cm" }, { huruf: "B", teks: "15 cm" }, { huruf: "C", teks: "16 cm" }, { huruf: "D", teks: "30 cm" }]} benar="C" umpan="(2 × 5) + (2 × 3) = 10 + 6 = 16 cm." salah="Ada dua alas dan dua samping." />
          <Pilih id={idKuis("B", 14)} pertanyaan="Belah ketupat dengan sisi 3 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "6 cm" }, { huruf: "B", teks: "9 cm" }, { huruf: "C", teks: "12 cm" }, { huruf: "D", teks: "15 cm" }]} benar="C" umpan="Empat sisi sama panjang. 4 × 3 = 12 cm." salah="Belah ketupat dihitung seperti persegi: 4 × sisi." />
          <Pilih id={idKuis("B", 20)} pertanyaan="Tepi luar 10 cm, 6 cm, 10 cm, dan 4 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "30 cm" }, { huruf: "B", teks: "15 cm" }, { huruf: "C", teks: "20 cm" }, { huruf: "D", teks: "40 cm" }]} benar="A" umpan="10 + 6 + 10 + 4 = 30 cm." salah="Jumlahkan tepi luar saja." />
        </>,
      ]}
    />
  );
}

function KartuA({ kelas, kelamin, review }: { kelas?: string; kelamin?: KelaminGuru; review: ReactNode }) {
  const kartu = MODUL_MTK5_BAB4.kartu[0];
  const [tab, setTab] = useState(0);
  const judulSubbab = ["Pengertian keliling", "Keliling segitiga", "Keliling segi empat", "Keliling segi banyak", "Keliling bangun gabungan"]
  const tujuan = judulSubbab;
  const label = [...judulSubbab.map((_, indeks) => `Sub-Bab ${String.fromCharCode(65 + indeks)}`), "Review"];
  const reviewAktif = tab === judulSubbab.length;
  const judulBanner = reviewAktif ? "Tujuan Pembelajaran" : judulSubbab[tab] ?? judulSubbab[0];
  return (
    <BingkaiTabMateri label={label} judul={judulBanner} aktif={tab} onPilih={setTab}>
      {reviewAktif ? (
        <div className="space-y-5">
          <KepalaKartu ikon="🪵🦉" judul={kartu.judul} anak="Lima sub-bab di taman senja" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
          <TujuanBelajar butir={tujuan} />
          <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini.</p>
          {review}
        </div>
      ) : (
        <div className="space-y-4">
          {tab === 0 ? <SubbabKeliling kelas={kelas} kelamin={kelamin} /> : null}
          {tab === 1 ? <SubbabSegitiga kelas={kelas} kelamin={kelamin} /> : null}
          {tab === 2 ? <SubbabSegiEmpat kelas={kelas} kelamin={kelamin} /> : null}
          {tab === 3 ? <SubbabSegiBanyak kelas={kelas} kelamin={kelamin} /> : null}
          {tab === 4 ? <SubbabGabung kelas={kelas} kelamin={kelamin} /> : null}
        </div>
      )}
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} className={reviewAktif ? "mt-3" : "hidden"} />
      {reviewAktif ? <LembarEvaluasi kelas={kelas} kelamin={kelamin} /> : null}
    </BingkaiTabMateri>
  );
}


function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB4.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🏮🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarTaman jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB4} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB4} penutup="Lentera pagar menyala. Igil menempelkan cap pagar." bunga="🪵🪁🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB4.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Pagar Senja" : skor >= 6 ? "🪵 Penjaga Bingkai" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Tepimu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru pagar." : "Ayo ukur lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarTaman jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Segitiga sama sisi" visual={<Papan anak="sisi 8 cm" />} pertanyaan="Tulis kelilingnya." pesanSalah="Tiga sisi sama panjang." bantuan="3 × 8 = 24." umpan="24 cm." periksa={hasil24} alias={["24"]} konteks="3 × 8 = 24." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Persegi panjang, panjang 4 cm dan lebar 6 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "10 cm" }, { huruf: "B", teks: "20 cm" }, { huruf: "C", teks: "24 cm" }, { huruf: "D", teks: "48 cm" }]} benar="B" umpan="(2 × 4) + (2 × 6) = 8 + 12 = 20 cm." salah="Kalikan panjang dan lebar masing-masing dengan 2." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Segi delapan beraturan, sisi 10 cm. Berapa kelilingnya?" periksa={hasil80} petunjuk="Kalikan 8 dengan panjang sisi." benar="80 cm." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Sebuah segi lima bersisi 12 cm, 16 cm, 12 cm, 12 cm, dan 20 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "60 cm" }, { huruf: "B", teks: "52 cm" }, { huruf: "C", teks: "72 cm" }, { huruf: "D", teks: "80 cm" }]} benar="C" umpan="12 + 16 + 12 + 12 + 20 = 72 cm." salah="Sisinya tidak sama. Jumlahkan kelimanya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan bangun dengan kelilingnya." baris={[{ kiri: "Jajargenjang 7 cm dan 4 cm", pilihan: PASANGAN_UJI, benar: "22 cm" }, { kiri: "Segitiga 9 + 8 + 6", pilihan: PASANGAN_UJI, benar: "23 cm" }, { kiri: "Persegi sisi 7 cm", pilihan: PASANGAN_UJI, benar: "28 cm" }]} umpan="22 cm, 23 cm, dan 28 cm." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Pagar lekuk" visual={<Papan anak="kiri 12 · kanan 12 · atas 8 dan 3 · bawah sama dengan atas" />} pertanyaan="Tulis kelilingnya." pesanSalah="Atas dan bawah sama. Jumlahkan empat sisi luar." bantuan="Atas 8 + 3. Bawah sama. Lalu tambah dua sisi tegak." umpan="46 cm." periksa={hasil46} alias={["46"]} konteks="12 + 12 + 11 + 11 = 46." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Keliling segitiga sama sisi untuk sisi 2, 3, 4 adalah 6, 9, 12. Berikutnya..." visual={<Papan anak="6 · 9 · 12 · ⬜" />} pilihan={[{ huruf: "A", teks: "14" }, { huruf: "B", teks: "15" }, { huruf: "C", teks: "18" }, { huruf: "D", teks: "16" }]} benar="B" umpan="Sisi berikutnya 5. 3 × 5 = 15." salah="Keliling naik 3 setiap sisi bertambah 1." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Belah ketupat dengan sisi 7 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "14 cm" }, { huruf: "B", teks: "21 cm" }, { huruf: "C", teks: "28 cm" }, { huruf: "D", teks: "49 cm" }]} benar="C" umpan="4 × 7 = 28 cm." salah="Empat sisi sama panjang." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Trapesium bersisi 6 cm, 5 cm, 4 cm, dan 3 cm. Berapa kelilingnya?" periksa={hasil18} petunjuk="Jumlahkan keempat sisinya." benar="18 cm." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Segi delapan beraturan, sisi 4 cm. Kelilingnya..." pilihan={[{ huruf: "A", teks: "12 cm" }, { huruf: "B", teks: "16 cm" }, { huruf: "C", teks: "32 cm" }, { huruf: "D", teks: "8 cm" }]} benar="C" umpan="8 × 4 = 32 cm." salah="Banyak sisi kali panjang sisi." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab4({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <KartuA
      kelas={kelas}
      kelamin={kelamin}
      review={(
        <>
          <KartuC kelas={kelas} kelamin={kelamin} />
<GambarTaman jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Keliling adalah jumlah panjang sisi.",
          "Sisi yang sama panjang boleh dikali.",
          "Pada bangun gabungan, hitung tepi luar saja.",
        ])}
        poin={[
          "Taman 100 + 50 + 100 + 50 = 300 m. Bingkai 4 + 4 + 4 + 4 = 16 cm.",
          "Segitiga sembarang 7 + 4 + 5 = 16. Sama sisi: 3 × sisi. Sisi 5 cm menjadi 15 cm. Sisi 6 cm menjadi 18 cm. Sama kaki: 2 × 6 + 4 = 16.",
          "Persegi panjang: (2 × panjang) + (2 × lebar). Ukuran 5 cm dan 3 cm menjadi 16 cm. Persegi dan belah ketupat: 4 × sisi. Sisi 3 cm menjadi 12 cm.",
          "Jajargenjang: (2 × alas) + (2 × samping). Layang-layang: (2 × pendek) + (2 × panjang) = 12 cm. Trapesium 4 + 2 + 5 + 3 = 14 cm.",
          "Segi lima beraturan 5 × 3 = 15 cm. Segi enam beraturan 6 × 3 = 18 cm. Segi delapan beraturan: 8 × sisi.",
          "Bangun gabungan hanya menghitung tepi luar. Denah taman itu 48 m. Jangan jumlahkan keliling bagian dalamnya.",
        ]}
        penutup="Ukur tepinya. Jumlahkan sisi. Sisi yang sama boleh dikali."
      />
        </>
      )}
    />
  );
}
