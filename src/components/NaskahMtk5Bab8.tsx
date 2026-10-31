"use client";

import { GameBatang, GameEsSenja, GamePiktogram, GameSkala, GameTurus, SaklarSuaraPermainan } from "@/components/GameMtk5Bab8";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import type { KelaminGuru } from "@/lib/guru";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB8, TEMA_MTK5_BAB8 } from "@/lib/misi-mtk-5-bab8";
import { MODUL_MTK5_BAB8 } from "@/lib/modul-resmi-mtk-5-bab8";
import { jawab13, jawab15, jawab2, jawab20, jawab24, jawab3, jawab5, jawab6, jawab8, jawabPerkutut } from "@/lib/nilai-mtk-5-bab8";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB8.id;
const PASANG_TAMU = ["2", "3", "5"];
const PASANG_EVAL = ["6", "12", "15"];

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
  Nadya: "border-rose-300 bg-rose-50",
  Reza: "border-amber-300 bg-amber-50",
  Omar: "border-teal-300 bg-teal-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nadya: "👧",
  Reza: "👦",
  Omar: "👦",
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
  return <p className="whitespace-pre-wrap rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">{anak}</p>;
}

function KepalaKartu({ ikon, judul, anak, kelas, kelamin, cuplikan }: { ikon: string; judul: string; anak?: string; kelas?: string; kelamin?: KelaminGuru; cuplikan?: CuplikanVoiceMateri[] }) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>{ikon}</p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      {cuplikan && cuplikan.length > 0 ? <div className="mt-3"><TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} /></div> : null}
    </>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Adegan({ judul, jenis, kelas, kelamin, penjelasan, children }: { judul: string; jenis: JenisAdegan; kelas?: string; kelamin?: KelaminGuru; penjelasan: string[]; children: ReactNode }) {
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
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(nilai) => setTepat(nilai)} />
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan kuncinya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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

const WARNA_BURUNG = ["biru", "kuning", "biru", "hijau", "merah", "biru", "kuning", "hijau", "biru", "merah", "kuning", "biru"] as const;

const CAT_WARNA: Record<string, string> = {
  biru: "bg-sky-500",
  kuning: "bg-amber-400",
  hijau: "bg-emerald-500",
  merah: "bg-rose-500",
};

function DaftarWarna() {
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Pilihan 12 teman</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {WARNA_BURUNG.map((warna, indeks) => (
          <span key={`${warna}-${indeks}`} className={`rounded-full px-3 py-1 text-xs font-black text-white ${CAT_WARNA[warna]}`}>{warna}</span>
        ))}
      </div>
    </div>
  );
}

function BatangTegak({ judul, data, puncak = 20 }: { judul: string; data: { nama: string; nilai: number; warna: string }[]; puncak?: number }) {
  const tinggi = (nilai: number) => (nilai / puncak) * 100;
  const tanda = puncak === 24 ? [0, 12, 24] : [0, puncak / 2, puncak];
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <svg viewBox="0 0 280 170" className="mt-2 w-full" role="img" aria-label={judul}>
        <line x1="36" y1="16" x2="36" y2="130" stroke="#1C01A5" strokeWidth="3" />
        <line x1="36" y1="130" x2="260" y2="130" stroke="#1C01A5" strokeWidth="3" />
        {tanda.map((angka) => (
          <text key={angka} x="4" y={134 - tinggi(angka)} fill="#1C01A5" fontSize="11" fontWeight="700">{angka}</text>
        ))}
        {data.map((item, indeks) => (
          <g key={item.nama}>
            <rect x={58 + indeks * 70} y={130 - tinggi(item.nilai)} width="36" height={tinggi(item.nilai)} fill={item.warna} />
            <text x={76 + indeks * 70} y="146" textAnchor="middle" fill="#1C01A5" fontSize="11" fontWeight="700">{item.nama}</text>
            <text x={76 + indeks * 70} y={122 - tinggi(item.nilai)} textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">{item.nilai}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function BatangDatar({ data }: { data: { nama: string; nilai: number; warna: string }[] }) {
  return (
    <div className="rounded-2xl border-2 border-teal-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Diagram datar, data yang sama</p>
      <svg viewBox="0 0 280 150" className="mt-2 w-full" role="img" aria-label="Diagram batang mendatar">
        <line x1="70" y1="16" x2="70" y2="120" stroke="#1C01A5" strokeWidth="3" />
        <line x1="70" y1="120" x2="250" y2="120" stroke="#1C01A5" strokeWidth="3" />
        {data.map((item, indeks) => (
          <g key={item.nama}>
            <text x="64" y={38 + indeks * 32} textAnchor="end" fill="#1C01A5" fontSize="12" fontWeight="700">{item.nama}</text>
            <rect x="74" y={24 + indeks * 32} width={item.nilai * 8} height="18" fill={item.warna} />
            <text x={80 + item.nilai * 8} y={38 + indeks * 32} fill="#1C01A5" fontSize="12" fontWeight="700">{item.nilai}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const JADWAL_BURUNG = [
  { hari: "Sen", biru: 6, kuning: 2 },
  { hari: "Sel", biru: 5, kuning: 5 },
  { hari: "Rab", biru: 3, kuning: 8 },
  { hari: "Kam", biru: 7, kuning: 6 },
];

function BatangGanda() {
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Burung kertas terjual</p>
      <p className="text-xs font-bold text-slate-600">Biru = Nadya. Kuning = Reza. Skala 0 sampai 10.</p>
      <svg viewBox="0 0 300 180" className="mt-2 w-full" role="img" aria-label="Diagram batang ganda">
        <line x1="36" y1="16" x2="36" y2="140" stroke="#1C01A5" strokeWidth="3" />
        <line x1="36" y1="140" x2="280" y2="140" stroke="#1C01A5" strokeWidth="3" />
        {[0, 5, 10].map((angka) => (
          <text key={angka} x="6" y={144 - angka * 11} fill="#1C01A5" fontSize="11" fontWeight="700">{angka}</text>
        ))}
        {JADWAL_BURUNG.map((item, indeks) => (
          <g key={item.hari}>
            <rect x={58 + indeks * 58} y={140 - item.biru * 11} width="16" height={item.biru * 11} fill="#38bdf8" />
            <rect x={76 + indeks * 58} y={140 - item.kuning * 11} width="16" height={item.kuning * 11} fill="#fbbf24" />
            <text x={66 + indeks * 58} y={136 - item.biru * 11} textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="700">{item.biru}</text>
            <text x={84 + indeks * 58} y={136 - item.kuning * 11} textAnchor="middle" fill="#a16207" fontSize="11" fontWeight="700">{item.kuning}</text>
            <text x={75 + indeks * 58} y="156" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">{item.hari}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

type JenisAdegan = "taman" | "turus" | "piktogram" | "batang" | "pos" | "meja" | "kartu";

function GambarTaman({ jenis }: { jenis: JenisAdegan }) {
  if (jenis === "turus") {
    return (
      <svg viewBox="0 0 320 150" className="w-full rounded-2xl bg-amber-50" role="img" aria-label="Omar menulis turus di papan taman. Igil melihat dari dahan.">
        <rect x="70" y="24" width="180" height="110" rx="12" fill="#fff7ed" stroke="#b45309" strokeWidth="4" />
        <line x1="100" y1="40" x2="100" y2="100" stroke="#1C01A5" strokeWidth="5" />
        <line x1="118" y1="40" x2="118" y2="100" stroke="#1C01A5" strokeWidth="5" />
        <line x1="136" y1="40" x2="136" y2="100" stroke="#1C01A5" strokeWidth="5" />
        <line x1="154" y1="40" x2="154" y2="100" stroke="#1C01A5" strokeWidth="5" />
        <line x1="92" y1="96" x2="162" y2="44" stroke="#e11d48" strokeWidth="5" />
        <circle cx="250" cy="46" r="16" fill="#fde68a" />
        <circle cx="244" cy="44" r="2" fill="#1C01A5" />
        <circle cx="254" cy="44" r="2" fill="#1C01A5" />
        <path d="M246 52 Q250 56 254 52" fill="none" stroke="#1C01A5" strokeWidth="2" />
      </svg>
    );
  }
  if (jenis === "piktogram") {
    return (
      <svg viewBox="0 0 320 150" className="w-full rounded-2xl bg-rose-50" role="img" aria-label="Reza menyusun burung kertas. Nadya memegang kartu kunci. Igil di samping.">
        <text x="24" y="36" fill="#9f1239" fontSize="16" fontWeight="700">1 burung = 4</text>
        {["48", "108", "168", "228"].map((x) => (
          <text key={x} x={x} y="100" fontSize="42">🐦</text>
        ))}
      </svg>
    );
  }
  if (jenis === "batang") {
    return (
      <svg viewBox="0 0 320 150" className="w-full rounded-2xl bg-sky-50" role="img" aria-label="Nadya dan Omar membandingkan batang diagram. Igil berdiri di ujung skala.">
        <line x1="40" y1="20" x2="40" y2="120" stroke="#1C01A5" strokeWidth="4" />
        <line x1="40" y1="120" x2="280" y2="120" stroke="#1C01A5" strokeWidth="4" />
        <rect x="70" y="70" width="28" height="50" fill="#38bdf8" />
        <rect x="130" y="36" width="28" height="84" fill="#fbbf24" />
        <rect x="190" y="54" width="28" height="66" fill="#34d399" />
        <circle cx="270" cy="40" r="14" fill="#fde68a" />
      </svg>
    );
  }
  if (jenis === "pos") {
    return (
      <svg viewBox="0 0 320 120" className="w-full rounded-2xl bg-emerald-50" role="img" aria-label="Sepuluh batu pos di jalan taman. Igil di pos pertama.">
        {Array.from({ length: 10 }, (_, indeks) => (
          <g key={indeks}>
            <rect x={16 + indeks * 30} y="48" width="20" height="36" rx="4" fill="#86efac" stroke="#166534" />
            <text x={26 + indeks * 30} y="70" textAnchor="middle" fill="#14532d" fontSize="12" fontWeight="700">{indeks + 1}</text>
          </g>
        ))}
        <circle cx="26" cy="34" r="12" fill="#fde68a" />
      </svg>
    );
  }
  if (jenis === "meja" || jenis === "kartu") {
    return (
      <svg viewBox="0 0 320 130" className="w-full rounded-2xl bg-violet-50" role="img" aria-label="Meja kertas di tepi taman. Igil menunggu di sudut meja.">
        <rect x="40" y="36" width="200" height="70" rx="10" fill="#fff" stroke="#6d28d9" strokeWidth="4" />
        <circle cx="270" cy="70" r="18" fill="#fde68a" />
        <circle cx="264" cy="66" r="2" fill="#1C01A5" />
        <circle cx="276" cy="66" r="2" fill="#1C01A5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 160" className="w-full rounded-2xl bg-orange-50" role="img" aria-label="Taman Burung Senja. Nadya, Reza, Omar, dan Igil di bawah lentera.">
      <rect x="0" y="90" width="320" height="70" fill="#86efac" />
      <circle cx="250" cy="48" r="28" fill="#fb923c" />
      <rect x="36" y="70" width="8" height="50" fill="#92400e" />
      <circle cx="40" cy="62" r="16" fill="#fde68a" />
      <circle cx="78" cy="108" r="16" fill="#fecdd3" />
      <circle cx="124" cy="108" r="16" fill="#fde68a" />
      <circle cx="170" cy="108" r="16" fill="#99f6e4" />
      <text x="78" y="148" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">Nadya</text>
      <text x="124" y="148" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">Reza</text>
      <text x="170" y="148" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">Omar</text>
      <text x="40" y="40" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">Igil</text>
    </svg>
  );
}

const JADWAL_ES = [
  { sore: "I", stroberi: 2, melon: 9 },
  { sore: "II", stroberi: 4, melon: 7 },
  { sore: "III", stroberi: 6, melon: 5 },
  { sore: "IV", stroberi: 7, melon: 2 },
];

function TabelEs() {
  return (
    <table className="w-full text-center text-sm font-bold text-[#1C01A5]">
      <thead>
        <tr>
          <th className="p-1">Es</th>
          {JADWAL_ES.map((baris) => <th key={baris.sore} className="p-1">{baris.sore}</th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-1">Stroberi</td>
          {JADWAL_ES.map((baris) => <td key={`s-${baris.sore}`} className="p-1">{baris.stroberi}</td>)}
        </tr>
        <tr>
          <td className="p-1">Melon</td>
          {JADWAL_ES.map((baris) => <td key={`m-${baris.sore}`} className="p-1">{baris.melon}</td>)}
        </tr>
      </tbody>
    </table>
  );
}

const DATA_WAKTU = [
  { nama: "Pagi", nilai: 10, warna: "#38bdf8" },
  { nama: "Siang", nilai: 16, warna: "#fbbf24" },
  { nama: "Sore", nilai: 12, warna: "#34d399" },
];

const DATA_BURUNG = [
  { nama: "Merpati", nilai: 9, warna: "#93c5fd" },
  { nama: "Perkutut", nilai: 15, warna: "#fb7185" },
  { nama: "Jalak", nilai: 11, warna: "#86efac" },
];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB8.kartu[0];
  const kartuB = MODUL_MTK5_BAB8.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🐦🦉" judul={kartu.judul} anak="Kios burung kertas" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-8">
        <Adegan judul="Mengumpulkan data" jenis="taman" kelas={kelas} kelamin={kelamin} penjelasan={["Data adalah kumpulan informasi.", "Catatan yang tercecer mudah terlewat.", "Turus membantu menghitung frekuensi."]}>
          <SaklarSuaraPermainan />
          <Dialog nama="Nadya" anak="Besok ada pasar senja. Kita perlu tahu warna burung yang disukai teman." />
          <GameEsSenja />
          <Dialog nama="Igil" anak="Data adalah kumpulan informasi. Ia bisa berupa kata, angka, atau gambar." />
          <Dialog nama="Reza" anak="Aku tadi menulis di kertas kecil. Saat dihitung ulang, ada yang terlewat dan ada yang terhitung dua kali." />
          <Dialog nama="Omar" anak="Lebih rapi kalau jenisnya dicatat dulu, lalu setiap pilihan dapat satu garis." />
          <DaftarWarna />
          <Dialog nama="Igil" anak="Garis itu disebut turus. Empat garis tegak ditambah satu garis miring menjadi satu kelompok. Kelompok itu bernilai 5, jadi lebih mudah dihitung." />
          <Dialog nama="Nadya" anak="Contoh kecil: empat teman memilih merah. Turusnya empat garis tegak. Frekuensinya 4. Frekuensi adalah bilangan yang menyatakan berapa kali suatu hal terjadi." />
          <TabelInfoGrafis
            judul="Infografis: Dari catatan ke frekuensi"
            kepala={["Langkah", "Cara", "Hasil"]}
            baris={[
              ["Catat jenis", "tulis semua pilihan", "data mentah"],
              ["Turus", "4 tegak + 1 miring", "1 kelompok = 5"],
              ["Frekuensi", "hitung tiap jenis", "bilangan banyaknya"],
            ]}
            kaki="Satu kejadian dicatat satu garis."
          />
          <GameTurus />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Pada daftar 12 teman, berapa frekuensi warna biru?" periksa={jawab5} petunjuk="Hitung chip biru satu per satu." benar="Biru muncul 5 kali." />
          <TulisBebas id={idKuis("A", 1)} judul="Warna kuning" visual={<DaftarWarna />} pertanyaan="Tulis frekuensi warna kuning." pesanSalah="Hitung chip kuning pada daftar yang sama." bantuan="Kuning muncul 3 kali." umpan="Frekuensi kuning adalah 3." periksa={jawab3} alias={["3", "tiga"]} konteks="Frekuensi warna kuning adalah 3." />
          <Pilih id={idKuis("A", 2)} pertanyaan="Warna yang paling banyak dipilih adalah..." pilihan={[{ huruf: "A", teks: "kuning" }, { huruf: "B", teks: "biru" }, { huruf: "C", teks: "hijau" }, { huruf: "D", teks: "merah" }]} benar="B" umpan="Biru lebih banyak daripada kuning, hijau, dan merah." salah="Bandingkan jumlah tiap warna pada daftar." />
          <SusunToken id={idKuis("A", 3)} perintah="Susun langkah mengolah data." acak={["Hitung frekuensi", "Buat turus", "Catat jenisnya"]} benar={["Catat jenisnya", "Buat turus", "Hitung frekuensi"]} umpan="Jenis dicatat, turus dibuat, lalu frekuensi dihitung." pesanSalah="Mulai dari jenisnya, baru garis, baru jumlah." />
        </Adegan>
        <Adegan judul="Piktogram" jenis="piktogram" kelas={kelas} kelamin={kelamin} penjelasan={["Piktogram memakai gambar.", "Setiap gambar punya nilai kunci yang sama.", "Setengah gambar mewakili setengah kunci."]}>
          <Dialog nama="Reza" anak="Angka di tabel terasa sepi. Aku ingin tamu melihat burungnya." />
          <Dialog nama="Igil" anak="Itu piktogram. Setiap gambar mewakili nilai yang sama. Nilai itu disebut kunci." />
          <Papan anak={"Kunci: 1 burung = 4 tamu\nSenin: 16 tamu  →  4 burung"} />
          <Dialog nama="Omar" anak="Enam tamu belum cukup untuk dua burung. Satu burung penuh mewakili 4. Setengah burung mewakili 2. Jadi 6 tamu digambar 1 burung dan setengah." />
          <Dialog nama="Nadya" anak="Kalau gambarnya terlalu banyak, orang mengira tamunya lebih banyak." />
          <TabelInfoGrafis
            judul="Infografis: Kunci piktogram"
            kepala={["Gambar", "Arti", "Contoh"]}
            baris={[
              ["1 burung", "4 tamu", "nilai kunci"],
              ["setengah burung", "2 tamu", "setengah dari 4"],
              ["4 burung", "16 tamu", "4 kali 4"],
            ]}
            kaki="Kunci yang sama dipakai untuk semua hari."
          />
          <GamePiktogram />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Kunci: 1 burung = 4 tamu. Ada 6 burung. Berapa jumlah tamunya?" periksa={jawab24} petunjuk="Kalikan banyak burung dengan kunci." benar="6 kali 4 sama dengan 24." />
          <TulisBebas id={idKuis("A", 5)} judul="Gambar penuh" visual={<Papan anak="Kunci: 1 burung = 4 tamu. Ada 10 tamu." />} pertanyaan="Tulis banyak gambar penuhnya saja." pesanSalah="Bagi 10 dengan 4. Sisanya belum satu gambar penuh." bantuan="10 dibagi 4 sama dengan 2 gambar penuh." umpan="Gambar penuhnya 2. Sisa 2 tamu baru setengah gambar." periksa={jawab2} alias={["2", "dua"]} konteks="Sepuluh tamu dengan kunci 4 menghasilkan 2 gambar penuh." />
          <Pilih id={idKuis("A", 6)} pertanyaan="Kunci: 1 burung = 4 tamu. Ada 12 tamu. Gambar yang benar adalah..." pilihan={[{ huruf: "A", teks: "12 burung" }, { huruf: "B", teks: "3 burung" }, { huruf: "C", teks: "4 burung" }, { huruf: "D", teks: "1 burung" }]} benar="B" umpan="12 dibagi 4 sama dengan 3 burung." salah="Bagi jumlah tamu dengan nilai kunci." />
          <KuisCocok id={idKuis("A", 7)} perintah="Kunci tetap 1 burung = 4 tamu. Pasangkan jumlah tamu dengan banyak burung." baris={[{ kiri: "8 tamu", pilihan: PASANG_TAMU, benar: "2" }, { kiri: "12 tamu", pilihan: PASANG_TAMU, benar: "3" }, { kiri: "20 tamu", pilihan: PASANG_TAMU, benar: "5" }]} umpan="8 menjadi 2, 12 menjadi 3, dan 20 menjadi 5." />
        </Adegan>
        <Adegan judul="Diagram batang" jenis="batang" kelas={kelas} kelamin={kelamin} penjelasan={["Tinggi atau panjang batang harus sesuai angka.", "Skala yang berbeda tidak dibandingkan dari ukuran gambar.", "Diagram ganda butuh kategori dan skala yang sama."]}>
          <Dialog nama="Omar" anak="Aku membuat persegi panjang. Tinggi batang harus ikut angka, tidak dikira-kira." />
          <BatangTegak judul="Tamu kios, skala 0 sampai 20" data={DATA_WAKTU} />
          <Dialog nama="Nadya" anak="Siang paling tinggi. Angkanya 16. Pagi 10 dan sore 12 lebih pendek." />
          <BatangDatar data={DATA_WAKTU} />
          <Dialog nama="Reza" anak="Saat batang dibaringkan, siang tetap yang paling panjang. Angka terbesar tidak berubah." />
          <GameBatang />
          <BatangTegak judul="Burung yang hinggap, skala 0 sampai 20" data={DATA_BURUNG} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Pada diagram burung yang hinggap, burung apa yang paling banyak?" periksa={jawabPerkutut} petunjuk="Cari batang yang paling tinggi." benar="Perkutut paling banyak, yaitu 15." />
          <KuisSuara id={idKuis("B", 1)} pertanyaan="Berapa selisih perkutut dan merpati?" periksa={jawab6} petunjuk="Kurangkan angka yang lebih kecil dari yang lebih besar." benar="15 dikurangi 9 sama dengan 6." />
          <Dialog nama="Igil" anak="Dua diagram bisa menulis angka yang sama, tetapi gambarnya beda tinggi jika skalanya beda. Bandingkan angkanya." />
          <Pilih id={idKuis("B", 4)} pertanyaan="Dua diagram sama-sama menulis 9. Skala pertama sampai 10, skala kedua sampai 30. Banyak pengunjungnya..." visual={<GameSkalaMini />} pilihan={[{ huruf: "A", teks: "lebih banyak pada diagram yang batangnya lebih tinggi" }, { huruf: "B", teks: "sama, yaitu 9" }, { huruf: "C", teks: "lebih banyak pada skala yang lebih besar" }, { huruf: "D", teks: "tidak bisa diketahui" }]} benar="B" umpan="Keduanya 9. Skala mengubah tinggi gambar, bukan jumlahnya." salah="Baca angka di batang, bukan tinggi gambarnya." />
          <GameSkala />
          <Dialog nama="Nadya" anak="Aku dan Reza ingin satu diagram. Kategorinya hari yang sama, skalanya juga sama." />
          <BatangGanda />
          <Dialog nama="Omar" anak="Lihat Selasa. Dua batang sama tinggi. Keduanya 5." />
          <Pilih id={idKuis("B", 3)} pertanyaan="Pada hari Rabu, burung siapa yang lebih banyak?" pilihan={[{ huruf: "A", teks: "Nadya, burung biru" }, { huruf: "B", teks: "Reza, burung kuning" }, { huruf: "C", teks: "sama banyak" }, { huruf: "D", teks: "tidak ada batang Rabu" }]} benar="B" umpan="Rabu: kuning 8, biru 3. Kuning lebih banyak." salah="Bandingkan dua batang pada hari Rabu saja." />
          <TulisBebas id={idKuis("B", 2)} judul="Jumlah Kamis" visual={<BatangGanda />} pertanyaan="Tulis jumlah burung Nadya dan Reza pada hari Kamis." pesanSalah="Jumlahkan dua batang Kamis." bantuan="7 ditambah 6." umpan="7 + 6 = 13." periksa={jawab13} alias={["13", "tiga belas"]} konteks="Jumlah burung pada Kamis adalah 13." />
          <KuisBenarSalah id={idKuis("B", 5)} perintah="Pilih benar atau salah." baris={[{ teks: "Tinggi batang boleh tidak sesuai angkanya.", benar: false }, { teks: "Diagram batang datar tetap memakai skala.", benar: true }, { teks: "Dua diagram berskala berbeda boleh dibandingkan hanya dari panjang gambarnya.", benar: false }]} umpan="Batang harus sesuai angka. Skala yang berbeda tidak dibandingkan dari gambarnya." />
          <Pilih id={idKuis("B", 6)} pertanyaan="Dua data boleh digabung menjadi diagram batang ganda jika..." pilihan={[{ huruf: "A", teks: "angkanya kebetulan sama" }, { huruf: "B", teks: "kategorinya sama dan skalanya sama" }, { huruf: "C", teks: "warnanya sama" }, { huruf: "D", teks: "tidak perlu kategori" }]} benar="B" umpan="Kategori yang sama dan skala yang sama membuat perbandingan adil." salah="Panjang batang hanya adil pada skala yang sama." />
          <TabelInfoGrafis
            judul="Infografis: Tiga diagram batang"
            kepala={["Jenis", "Yang dilihat", "Syarat"]}
            baris={[
              ["Tegak", "tinggi batang", "sesuai skala"],
              ["Datar", "panjang batang", "sesuai skala"],
              ["Ganda", "dua warna", "kategori dan skala sama"],
            ]}
            kaki="Selasa pada diagram ganda sama-sama 5."
          />
          <Dialog nama="Reza" anak="Data ini juga dipakai untuk es. Rasa yang terus naik perlu lebih banyak. Rasa yang terus turun dikurangi." />
          <Pilih id={idKuis("B", 7)} pertanyaan="Es mana yang perlu ditambah untuk besok sore?" visual={<TabelEs />} pilihan={[{ huruf: "A", teks: "melon, karena dulu angkanya besar" }, { huruf: "B", teks: "stroberi, karena terus naik" }, { huruf: "C", teks: "keduanya sama" }, { huruf: "D", teks: "tutup kios es" }]} benar="B" umpan="Stroberi naik. Melon turun, jadi melon dikurangi." salah="Lihat arah angka dari sore I sampai sore IV." />
          <p className="text-xs font-bold text-slate-500">{kartuB.judul}</p>
        </Adegan>
      </div>
    </KartuBingkai>
  );
}

function GameSkalaMini() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <SkalaKecil judul="Skala 10" puncak={10} nilai={9} />
      <SkalaKecil judul="Skala 30" puncak={30} nilai={9} />
    </div>
  );
}

function SkalaKecil({ judul, puncak, nilai }: { judul: string; puncak: number; nilai: number }) {
  const tinggi = Math.round((nilai / puncak) * 80);
  return (
    <div className="rounded-xl bg-violet-50 p-2 text-center">
      <p className="text-xs font-black text-[#1C01A5]">{judul}</p>
      <svg viewBox="0 0 80 110" className="mx-auto h-24" aria-hidden>
        <line x1="18" y1="8" x2="18" y2="96" stroke="#1C01A5" strokeWidth="2" />
        <rect x="30" y={96 - tinggi} width="22" height={tinggi} fill="#a78bfa" />
        <text x="41" y="108" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">{nilai}</text>
      </svg>
    </div>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB8.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🐦🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarTaman jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB8} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB8} penutup="Lentera taman menyala. Igil menempelkan cap burung." bunga="🐦🦉🌙" />
      </div>
    </KartuBingkai>
  );
}

function DiagramWaktuEval() {
  const data = [
    { nama: "Pagi", nilai: 14, warna: "#7dd3fc" },
    { nama: "Siang", nilai: 22, warna: "#fcd34d" },
    { nama: "Sore", nilai: 18, warna: "#6ee7b7" },
  ];
  return <BatangTegak judul="Pengunjung perpustakaan, skala 0 sampai 24" data={data} puncak={24} />;
}

function DiagramKelas() {
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Pengunjung perpustakaan hari Jumat</p>
      <svg viewBox="0 0 280 140" className="mt-2 w-full" role="img" aria-label="Laki-laki 11 dan perempuan 7">
        <line x1="36" y1="16" x2="36" y2="110" stroke="#1C01A5" strokeWidth="3" />
        <line x1="36" y1="110" x2="250" y2="110" stroke="#1C01A5" strokeWidth="3" />
        <rect x="70" y={110 - 11 * 7} width="40" height={11 * 7} fill="#38bdf8" />
        <rect x="170" y={110 - 7 * 7} width="40" height={7 * 7} fill="#fb7185" />
        <text x="90" y="126" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">Laki-laki</text>
        <text x="190" y="126" textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">Perempuan</text>
        <text x="90" y={102 - 11 * 7} textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">11</text>
        <text x="190" y={102 - 7 * 7} textAnchor="middle" fill="#1C01A5" fontSize="12" fontWeight="700">7</text>
      </svg>
    </div>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB8.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Data Senja" : skor >= 6 ? "🐦 Penjaga Kios" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Datamu rapi." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru data." : "Ayo cek lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarTaman jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Daftar angka" visual={<Papan anak="4, 7, 4, 9, 4" />} pertanyaan="Tulis frekuensi angka 4." pesanSalah="Hitung berapa kali angka 4 muncul." bantuan="Angka 4 muncul 3 kali." umpan="Frekuensinya 3." periksa={jawab3} alias={["3", "tiga"]} konteks="Frekuensi angka 4 adalah 3." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Satu kelompok turus ditambah dua garis tegak. Jumlahnya..." visual={<Papan anak="||||/   ||" />} pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "7" }, { huruf: "D", teks: "8" }]} benar="C" umpan="Satu kelompok bernilai 5. Ditambah 2 menjadi 7." salah="Kelompok miring bernilai 5, lalu hitung garis sisa." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Kunci: 1 lampu = 5. Ada 4 lampu. Berapa nilainya?" periksa={jawab20} petunjuk="Kalikan banyak lampu dengan kunci." benar="4 kali 5 sama dengan 20." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Kapan pengunjung paling banyak?" visual={<DiagramWaktuEval />} pilihan={[{ huruf: "A", teks: "Pagi" }, { huruf: "B", teks: "Siang" }, { huruf: "C", teks: "Sore" }, { huruf: "D", teks: "Pagi dan sore sama" }]} benar="B" umpan="Siang 22 paling tinggi. Pagi 14 dan sore 18 lebih rendah." salah="Cari batang yang paling tinggi." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Kunci: 1 gambar = 3. Pasangkan banyak gambar dengan nilainya." baris={[{ kiri: "2 gambar", pilihan: PASANG_EVAL, benar: "6" }, { kiri: "4 gambar", pilihan: PASANG_EVAL, benar: "12" }, { kiri: "5 gambar", pilihan: PASANG_EVAL, benar: "15" }]} umpan="2 menjadi 6, 4 menjadi 12, dan 5 menjadi 15." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Selisih siang dan pagi" visual={<DiagramWaktuEval />} pertanyaan="Tulis selisih pengunjung siang dan pagi." pesanSalah="Kurangkan angka yang lebih kecil dari yang lebih besar." bantuan="22 dikurangi 14." umpan="22 − 14 = 8." periksa={jawab8} alias={["8", "delapan"]} konteks="Selisih siang dan pagi adalah 8." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Siapa yang lebih banyak?" visual={<DiagramKelas />} pilihan={[{ huruf: "A", teks: "perempuan" }, { huruf: "B", teks: "laki-laki" }, { huruf: "C", teks: "sama banyak" }, { huruf: "D", teks: "tidak ada datanya" }]} benar="B" umpan="Laki-laki 11, perempuan 7. Laki-laki lebih banyak." salah="Bandingkan dua angka pada diagram." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Dua diagram sama-sama menulis 15. Skalanya berbeda, jadi tinggi gambarnya berbeda. Banyaknya..." pilihan={[{ huruf: "A", teks: "lebih banyak pada gambar yang lebih tinggi" }, { huruf: "B", teks: "sama, yaitu 15" }, { huruf: "C", teks: "lebih banyak pada skala yang lebih besar" }, { huruf: "D", teks: "tidak ada angka" }]} benar="B" umpan="Angkanya sama-sama 15. Tinggi gambar mengikuti skala." salah="Baca angkanya, bukan tinggi gambarnya." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Tiga kelompok es terjual 6, 4, dan 5. Berapa jumlahnya?" periksa={jawab15} petunjuk="Jumlahkan ketiga bilangan." benar="6 + 4 + 5 = 15." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Pengunjung kios: Senin 5, Selasa 9, Rabu 5. Kapan jumlahnya sama?" pilihan={[{ huruf: "A", teks: "Senin dan Selasa" }, { huruf: "B", teks: "Senin dan Rabu" }, { huruf: "C", teks: "Selasa dan Rabu" }, { huruf: "D", teks: "tidak ada yang sama" }]} benar="B" umpan="Senin dan Rabu sama-sama 5. Selasa lebih banyak." salah="Cari dua hari yang angkanya sama." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab8({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarTaman jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Data adalah kumpulan informasi. Turus membantu menghitung frekuensi.",
          "Pada piktogram, setiap gambar punya nilai kunci yang tetap.",
          "Tinggi batang harus sesuai angka. Diagram ganda butuh skala yang sama.",
        ])}
        poin={[
          "Data adalah kumpulan informasi: kata, angka, atau gambar. Catatan yang tercecer mudah terlewat.",
          "Turus: satu kejadian, satu garis. Empat garis tegak dan satu garis miring menjadi satu kelompok bernilai 5. Frekuensi adalah banyaknya suatu hal terjadi.",
          "Piktogram memakai gambar dan kunci. Contoh: 1 burung = 4 tamu, jadi 16 tamu digambar 4 burung. Setengah gambar mewakili setengah kunci.",
          "Diagram batang tegak dibaca dari tinggi. Diagram datar dibaca dari panjang. Keduanya harus sesuai skala. Contoh pagi 10, siang 16, sore 12.",
          "Angka yang sama bisa terlihat beda tinggi jika skalanya beda. Contoh: angka 9 pada skala 10 dan skala 30. Banyaknya tetap 9.",
          "Diagram ganda menggabungkan dua data pada kategori yang sama dan skala yang sama. Jika Selasa sama-sama 5, dua batangnya sama tinggi. Data yang naik disiapkan lebih banyak. Data yang turun dikurangi.",
        ]}
        penutup="Hitung dulu, baca kuncinya, lalu cek skalanya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
