"use client";

import { GameLaserLipat, GameRadarSudut, GameTebakBingkai, GameUbahKeluarga, SketsaBangun } from "@/components/GameMtk5Bab7";
import GambarCerita from "@/components/GambarCerita";
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
import { MISI_MTK5_BAB7, TEMA_MTK5_BAB7 } from "@/lib/misi-mtk-5-bab7";
import { MODUL_MTK5_BAB7 } from "@/lib/modul-resmi-mtk-5-bab7";
import {
  hasil1,
  hasil3,
  hasil20,
  hasil45,
  hasil50,
  hasil60,
  hasil80,
  hasil90,
  jawabBisa,
  jawabSiku,
  jawabTidak,
  jawabYa,
} from "@/lib/nilai-mtk-5-bab7";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB7.id;
const JENIS_SISI = ["sama sisi", "sama kaki", "sembarang"];
const LIPAT = ["1", "2", "4"];
const EVAL_NAMA = ["segitiga lancip sama kaki", "segitiga sama sisi", "segitiga siku-siku sama kaki"];

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function bisaSegitiga(a: number, b: number, c: number): boolean {
  return a + b > c && a + c > b && b + c > a;
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Dara: "border-violet-300 bg-violet-50",
  Beni: "border-amber-300 bg-amber-50",
  Tio: "border-teal-300 bg-teal-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Dara: "👧",
  Beni: "👦",
  Tio: "👦",
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

const GAMBAR_PADANG = {
  padang: { src: "/doodle-mtk/mtk-5-bab7-padang.jpg", alt: "Dara, Beni, dan Tio di padang layang senja. Igil duduk di tiang bendera." },
  sudut: { src: "/doodle-mtk/mtk-5-bab7-sudut.jpg", alt: "Beni memegang tiga kerangka segitiga. Dara menunjuk sudut. Igil di rumput." },
  bingkai: { src: "/doodle-mtk/mtk-5-bab7-bingkai.jpg", alt: "Tio menyusun bingkai segi empat. Dara membandingkan dua bingkai. Igil di sudut meja lapangan." },
  layang: { src: "/doodle-mtk/mtk-5-bab7-layang.jpg", alt: "Dara menerbangkan layang-layang. Beni memegang belah ketupat. Igil terbang rendah." },
  pos: { src: "/doodle-mtk/mtk-5-bab7-pos.jpg", alt: "Batu pos di padang layang. Igil di pos pertama." },
  meja: { src: "/doodle-mtk/mtk-5-bab7-meja.jpg", alt: "Meja kecil dengan kertas kosong di tepi padang. Igil menunggu." },
  kartu: { src: "/doodle-mtk/mtk-5-bab7-kartu.jpg", alt: "Dara, Beni, Tio, dan Igil memegang kartu kosong di padang layang." },
} as const;

function GambarPadang({ jenis }: { jenis: keyof typeof GAMBAR_PADANG }) {
  const gambar = GAMBAR_PADANG[jenis];
  return <GambarCerita src={gambar.src} alt={gambar.alt} />;
}

function Adegan({ judul, jenis, kelas, kelamin, penjelasan, children }: { judul: string; jenis: keyof typeof GAMBAR_PADANG; kelas?: string; kelamin?: KelaminGuru; penjelasan: string[]; children: ReactNode }) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarPadang jenis={jenis} />
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan cirinya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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

function SegitigaContoh() {
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Kerangka 5 cm, 6 cm, dan 7 cm</p>
      <svg viewBox="0 0 220 140" className="mx-auto mt-2 w-full max-w-[240px]" aria-hidden>
        <polygon points="20,120 190,120 120,28" fill="#ede9fe" stroke="#5b21b6" strokeWidth="4" />
        <text x="100" y="136" textAnchor="middle" fill="#5b21b6" fontSize="14" fontWeight="700">7 cm</text>
        <text x="52" y="72" fill="#5b21b6" fontSize="14" fontWeight="700">6 cm</text>
        <text x="150" y="72" fill="#5b21b6" fontSize="14" fontWeight="700">5 cm</text>
      </svg>
      <p className="mt-2 text-sm font-semibold text-slate-700">5 + 6 = 11, lebih dari 7. 5 + 7 = 12, lebih dari 6. 6 + 7 = 13, lebih dari 5.</p>
    </div>
  );
}

const SEDOTAN = [
  { nama: "5 · 6 · 7", sisi: [5, 6, 7] },
  { nama: "4 · 4 · 4", sisi: [4, 4, 4] },
  { nama: "2 · 2 · 5", sisi: [2, 2, 5] },
  { nama: "10 · 5 · 15", sisi: [10, 5, 15] },
] as const;

function GameSedotan() {
  const [pilih, setPilih] = useState(0);
  const sekarang = SEDOTAN[pilih];
  const [a, b, c] = sekarang.sisi;
  const lolos = bisaSegitiga(a, b, c);
  return (
    <div className="rounded-2xl border-2 border-violet-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game batang: cek tiga sisi</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {SEDOTAN.map((item, indeks) => (
          <button key={item.nama} type="button" onClick={() => setPilih(indeks)} className={`rounded-full px-3 py-2 text-sm font-black ${pilih === indeks ? "bg-violet-700 text-white" : "bg-violet-50 text-violet-950 ring-2 ring-violet-200"}`}>{item.nama}</button>
        ))}
      </div>
      <p className="mt-3 text-sm font-bold text-slate-700">{a} + {b} = {a + b}. {a} + {c} = {a + c}. {b} + {c} = {b + c}.</p>
      <p className={`mt-2 rounded-xl px-3 py-2 text-sm font-black ${lolos ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>{lolos ? "Bisa menjadi segitiga." : "Belum bisa. Ada dua batang yang jumlahnya belum lebih panjang."}</p>
    </div>
  );
}

function GameSudutKetiga() {
  const [kiri, setKiri] = useState(50);
  const [kanan, setKanan] = useState(60);
  const jumlah = kiri + kanan;
  const sisa = 180 - jumlah;
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game sudut ketiga</p>
      <label className="mt-3 block text-sm font-bold text-slate-700">Sudut pertama: {kiri}°
        <input type="range" min={20} max={100} step={5} value={kiri} onChange={(event) => setKiri(Number(event.target.value))} className="mt-1 w-full accent-[#1C01A5]" />
      </label>
      <label className="mt-2 block text-sm font-bold text-slate-700">Sudut kedua: {kanan}°
        <input type="range" min={20} max={100} step={5} value={kanan} onChange={(event) => setKanan(Number(event.target.value))} className="mt-1 w-full accent-amber-500" />
      </label>
      <p className="mt-3 text-center text-lg font-black text-[#1C01A5]">{jumlah >= 180 ? "Dua sudut itu sudah 180° atau lebih. Segitiga tidak muat." : `Sudut ketiga = ${sisa}°.`}</p>
    </div>
  );
}

function GameSejajar() {
  const [pilih, setPilih] = useState("");
  const tepat = pilih === "trapesium";
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game sisi sejajar: mana yang tepat satu pasang?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          ["layang", "Layang tanpa sisi sejajar"],
          ["jajar", "Jajargenjang"],
          ["trapesium", "Trapesium"],
        ].map(([kode, label]) => (
          <button key={kode} type="button" onClick={() => setPilih(kode)} className={`rounded-full px-3 py-2 text-sm font-black ${pilih === kode ? "bg-amber-500 text-slate-950" : "bg-amber-50 text-amber-950 ring-2 ring-amber-200"}`}>{label}</button>
        ))}
      </div>
      {pilih ? <p className={`mt-3 rounded-xl px-3 py-2 text-sm font-black ${tepat ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>{tepat ? "Tepat. Trapesium pada gambar ini punya satu pasang sisi sejajar." : pilih === "jajar" ? "Jajargenjang punya dua pasang." : "Layang itu tidak punya sisi sejajar."}</p> : null}
    </div>
  );
}

const KELUARGA = [
  { nama: "Persegi", kelompok: ["Segi empat", "Trapesium", "Jajargenjang", "Persegi panjang", "Belah ketupat", "Layang-layang"] },
  { nama: "Belah ketupat", kelompok: ["Segi empat", "Trapesium", "Jajargenjang", "Layang-layang"] },
  { nama: "Persegi panjang", kelompok: ["Segi empat", "Trapesium", "Jajargenjang"] },
  { nama: "Jajargenjang", kelompok: ["Segi empat", "Trapesium"] },
] as const;

function GameKeluarga() {
  const [nama, setNama] = useState<(typeof KELUARGA)[number]["nama"]>("Persegi");
  const aktif = KELUARGA.find((item) => item.nama === nama) ?? KELUARGA[0];
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game keluarga bangun</p>
      <p className="mt-1 text-sm font-semibold text-slate-600">Pada bab ini, trapesium berarti minimal satu pasang sisi sejajar.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {KELUARGA.map((item) => (
          <button key={item.nama} type="button" onClick={() => setNama(item.nama)} className={`flex w-[7.4rem] flex-col items-center gap-1 rounded-2xl px-2 py-2 text-sm font-black ${nama === item.nama ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200"}`}>
            <span className="w-full rounded-xl bg-white px-1">
              <SketsaBangun nama={item.nama} className="h-14 w-full" />
            </span>
            {item.nama}
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-emerald-50 px-3 py-3">
        <SketsaBangun nama={nama} className="mx-auto h-36 w-full max-w-[200px]" />
        <p className="text-center text-sm font-black text-[#1C01A5]">{nama}</p>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-600">Bangun ini juga masuk keluarga berikut.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {aktif.kelompok.map((kelompok) => (
          <span key={kelompok} className="flex w-[7.4rem] flex-col items-center gap-1 rounded-2xl bg-white px-2 py-2 text-center text-xs font-black text-[#1C01A5] ring-2 ring-[#1C01A5]">
            <SketsaBangun nama={kelompok} className="h-12 w-full" />
            {kelompok}
          </span>
        ))}
      </div>
    </div>
  );
}

function GameLipatLayang() {
  const [lipat, setLipat] = useState<"tegak" | "mendatar" | "">("");
  return (
    <div className="rounded-2xl border-2 border-rose-200 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">Game lipat layang</p>
      <svg viewBox="0 0 200 160" className="mx-auto mt-2 w-full max-w-[220px]" aria-hidden>
        <polygon points="100,12 176,48 100,150 24,48" fill="#ffe4e6" stroke="#be123c" strokeWidth="4" />
        {lipat === "tegak" ? <line x1="100" y1="12" x2="100" y2="150" stroke="#1C01A5" strokeWidth="3" strokeDasharray="5 4" /> : null}
        {lipat === "mendatar" ? <line x1="24" y1="48" x2="176" y2="48" stroke="#1C01A5" strokeWidth="3" strokeDasharray="5 4" /> : null}
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={() => setLipat("tegak")} className="rounded-full bg-rose-600 px-3 py-2 text-sm font-black text-white">Lipat tegak</button>
        <button type="button" onClick={() => setLipat("mendatar")} className="rounded-full bg-white px-3 py-2 text-sm font-black text-rose-800 ring-2 ring-rose-200">Lipat mendatar</button>
      </div>
      {lipat ? <p className="mt-3 text-sm font-bold text-slate-700">{lipat === "tegak" ? "Dua bagiannya menempel. Garis ini sumbu simetri." : "Dua bagiannya tidak sama. Garis ini bukan sumbu simetri."}</p> : null}
    </div>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB7.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪁🦉" judul={kartu.judul} anak="Empat adegan di padang layang" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-8">
        <Adegan judul="Sub-bab 1 — Ciri-ciri segitiga: sisi dan sudut" jenis="padang" kelas={kelas} kelamin={kelamin} penjelasan={["Tiga batang dicek dengan menjumlahkan dua batang.", "Segitiga bisa lancip, siku-siku, atau tumpul.", "Jumlah seluruh sudutnya dibahas di adegan berikut."]}>
          <Dialog nama="Dara" anak="Padang ini penuh kerangka layang. Aku ingin tahu, tiga batang mana yang benar-benar bisa menjadi segitiga." />
          <Dialog nama="Beni" anak="Jumlah dua batang harus lebih panjang daripada batang yang ketiga. Kalau hanya sama, atau malah lebih pendek, segitiga tidak jadi." />
          <Dialog nama="Igil" anak="Lihat kerangka 5 cm, 6 cm, dan 7 cm. Setiap pasangan jumlahnya lebih panjang daripada batang yang tersisa." />
          <SegitigaContoh />
          <Dialog nama="Tio" anak="Batang 5 cm, 4 cm, dan 12 cm tidak jadi. 5 + 4 = 9, masih lebih pendek daripada 12. Batang 10 cm, 5 cm, dan 15 cm juga tidak. 10 + 5 baru sama dengan 15, belum lebih panjang." />
          <TabelInfoGrafis
            judul="Infografis: Syarat tiga batang"
            kepala={["Batang", "Cek", "Hasil"]}
            baris={[
              ["5, 6, 7", "jumlah dua batang lebih panjang", "bisa"],
              ["4, 6, 6", "4 + 6 lebih panjang daripada 6", "bisa"],
              ["5, 4, 12", "5 + 4 lebih pendek daripada 12", "tidak"],
              ["10, 5, 15", "10 + 5 baru sama dengan 15", "tidak"],
            ]}
            kaki="Harus lebih panjang, bukan hanya sama."
          />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Batang 8 cm, 3 cm, dan 4 cm. Bisa menjadi segitiga?" periksa={jawabTidak} petunjuk="Jumlahkan dua batang yang paling pendek, lalu bandingkan." benar="Tidak. 3 + 4 masih lebih pendek daripada 8." />
          <TulisBebas id={idKuis("A", 1)} judul="Enam, tujuh, delapan" visual={<Papan anak="6 cm · 7 cm · 8 cm" />} pertanyaan="Tulis bisa atau tidak." pesanSalah="Cek ketiga pasangan, jangan satu saja." bantuan="6 + 7 lebih panjang daripada 8. Tulis bisa." umpan="Bisa." periksa={jawabBisa} alias={["bisa"]} konteks="6, 7, dan 8 bisa menjadi segitiga." />
          <Dialog nama="Dara" anak="Kalau sudah jadi segitiga, sudutnya juga punya nama. Semua sudut lancip: segitiga lancip. Satu sudut siku: segitiga siku-siku. Satu sudut tumpul: segitiga tumpul." />
          <Dialog nama="Igil" anak="Dua sudut siku tidak muat. Dua sudut tumpul juga tidak muat. Nanti kita lihat mengapa, saat menjumlahkan sudutnya." />
          <Pilih id={idKuis("A", 2)} pertanyaan="Sebuah segitiga punya sudut 110°. Jenis segitiga itu..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "sama sisi" }]} benar="C" umpan="110° lebih besar daripada siku. Segitiganya tumpul." salah="Bandingkan 110° dengan sudut siku." />
          <SusunToken id={idKuis("A", 3)} perintah="Susun cara mengecek tiga batang." acak={["Putuskan", "Bandingkan dengan batang ketiga", "Jumlahkan dua batang"]} benar={["Jumlahkan dua batang", "Bandingkan dengan batang ketiga", "Putuskan"]} umpan="Jumlahkan dua batang, bandingkan, lalu putuskan." pesanSalah="Mulai dari menjumlahkan dua batang." />
          <GameSedotan />
        </Adegan>

        <Adegan judul="Sub-bab 1 — Jumlah sudut dan panjang sisi" jenis="sudut" kelas={kelas} kelamin={kelamin} penjelasan={["Jumlah sudut dalam segitiga 180 derajat.", "Sisi yang sama membuat sudut yang sama.", "Simetri lipat dan simetri putar membedakan sama kaki dan sama sisi."]}>
          <Dialog nama="Beni" anak="Aku menggunting tiga sudut segitiga, lalu menempelkannya. Mereka menjadi garis lurus." />
          <Dialog nama="Igil" anak="Jumlah sudut dalam segitiga 180°. Contoh di layang kecil: 50° + 60° + 70° = 180°." />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Dua sudut segitiga 35° dan 65°. Berapa sudut ketiganya?" periksa={hasil80} petunjuk="Jumlahkan dulu, lalu kurangkan dari 180." benar="80°." />
          <TulisBebas id={idKuis("A", 5)} judul="Siku-siku sama kaki" visual={<Papan anak="satu sudut siku · dua sudut lain sama" />} pertanyaan="Tulis besar satu sudut yang bukan siku." pesanSalah="Sisa setelah 90° masih dibagi dua." bantuan="180 − 90 = 90. 90 dibagi 2." umpan="45°." periksa={hasil45} alias={["45"]} konteks="Sudut yang bukan siku pada segitiga siku-siku sama kaki adalah 45 derajat." />
          <Pilih id={idKuis("A", 6)} pertanyaan="Sudut segitiga sama sisi didapat dari 180° dibagi 3. Besar satu sudutnya..." pilihan={[{ huruf: "A", teks: "45°" }, { huruf: "B", teks: "90°" }, { huruf: "C", teks: "60°" }, { huruf: "D", teks: "120°" }]} benar="C" umpan="180 ÷ 3 = 60. Ketiga sudutnya sama besar." salah="Bagi 180 dengan 3." />
          <Dialog nama="Tio" anak="Jadi sudut yang sama pada siku-siku sama kaki masing-masing 45°. Pada sama sisi, tiap sudut 60°." />
          <TabelInfoGrafis
            judul="Infografis: Sudut dalam segitiga"
            kepala={["Kasus", "Cara", "Hasil"]}
            baris={[
              ["Semua segitiga", "jumlah tiga sudut", "180°"],
              ["Contoh layang", "50 + 60 + 70", "180°"],
              ["Sama sisi", "180 dibagi 3", "60°"],
              ["Siku sama kaki", "sisa dibagi 2", "45°"],
            ]}
            kaki="Dua sudut siku tidak muat. Dua sudut tumpul juga tidak."
          />
          <Dialog nama="Dara" anak="Dari panjang sisinya ada tiga nama. Sama kaki punya minimal dua sisi sama. Sama sisi punya tiga sisi sama. Sembarang: ketiganya berbeda." />
          <KuisCocok id={idKuis("A", 7)} perintah="Pasangkan panjang sisi dengan namanya." baris={[{ kiri: "3 sisi sama panjang", pilihan: JENIS_SISI, benar: "sama sisi" }, { kiri: "tepat 2 sisi sama panjang", pilihan: JENIS_SISI, benar: "sama kaki" }, { kiri: "semua sisi berbeda", pilihan: JENIS_SISI, benar: "sembarang" }]} umpan="Sama sisi, sama kaki, dan sembarang." />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Segitiga sama kaki punya berapa simetri lipat?" periksa={hasil1} petunjuk="Lipat pada garis yang membagi dua sudut puncak." benar="1 simetri lipat." />
          <TulisBebas id={idKuis("B", 1)} judul="Putaran sama sisi" visual={<Papan anak="segitiga sama sisi diputar pada pusatnya" />} pertanyaan="Tulis banyak simetri putarnya." pesanSalah="Hitung berapa kali ia tepat menempati bingkainya dalam satu putaran." bantuan="Ada 3 posisi." umpan="3 simetri putar." periksa={hasil3} alias={["3"]} konteks="Segitiga sama sisi punya 3 simetri putar." />
          <Dialog nama="Igil" anak="Sama kaki: minimal 2 sisi sama, 2 sudut sama, 1 simetri lipat, dan 1 simetri putar. Sama sisi: 3 sisi sama, 3 sudut sama, 3 simetri lipat, dan 3 simetri putar." />
          <Dialog nama="Beni" anak="Sama sisi punya semua ciri sama kaki, jadi ia boleh disebut sama kaki. Sebaliknya, sama kaki belum tentu sama sisi." />
          <GameSudutKetiga />
          <Dialog nama="Igil" anak="Geser dua sudut pada radar layang. Sudut ketiga dihitung sendiri supaya jumlahnya tetap 180°." />
          <GameRadarSudut />
          <Dialog nama="Dara" anak="Putar segitiga dan nyalakan garis lipat. Lihat kapan bingkainya ketemu lagi." />
          <GameLaserLipat kelompok="segitiga" />
        </Adegan>

        <Adegan judul="Sub-bab 2 — Trapesium dan jajargenjang" jenis="bingkai" kelas={kelas} kelamin={kelamin} penjelasan={["Segi empat dibatasi empat sisi.", "Trapesium pada bab ini punya minimal satu pasang sisi sejajar.", "Jajargenjang punya dua pasang sisi berhadapan yang sejajar."]}>
          <Dialog nama="Tio" anak="Segi empat adalah bangun yang dibatasi empat sisi. Di gudang bingkai ada trapesium dan jajargenjang." />
          <Dialog nama="Dara" anak="Di kelas empat, trapesium hanya punya satu pasang sisi sejajar. Di kelas lima, kita memakai pengertian yang lebih luas: minimal satu pasang." />
          <Dialog nama="Igil" anak="Trapesium siku-siku punya satu sudut siku. Trapesium sama kaki punya satu simetri lipat." />
          <Pilih id={idKuis("A", 8)} pertanyaan="Pada bab ini, trapesium adalah segi empat yang..." pilihan={[{ huruf: "A", teks: "semua sudutnya siku" }, { huruf: "B", teks: "punya minimal satu pasang sisi sejajar" }, { huruf: "C", teks: "semua sisinya sama" }, { huruf: "D", teks: "tidak punya sisi sejajar" }]} benar="B" umpan="Minimal satu pasang. Boleh lebih, nanti kita lihat pada jajargenjang." salah="Ingat kesepakatan bab ini: minimal satu pasang." />
          <Dialog nama="Beni" anak="Jajargenjang punya dua pasang sisi berhadapan yang sejajar dan sama panjang. Sudut yang berhadapan juga sama besar." />
          <Pilih id={idKuis("A", 9)} pertanyaan="Bolehkah jajargenjang disebut trapesium pada bab ini?" pilihan={[{ huruf: "A", teks: "Ya, karena ada sisi sejajar" }, { huruf: "B", teks: "Tidak, karena ia segitiga" }, { huruf: "C", teks: "Ya, karena ia trapesium sama kaki" }, { huruf: "D", teks: "Tidak, karena tidak punya sisi" }]} benar="A" umpan="Ada minimal satu pasang sisi sejajar, bahkan dua pasang." salah="Cek dulu apakah ada sisi yang sejajar." />
          <Pilih id={idKuis("B", 2)} pertanyaan="Apakah jajargenjang merupakan trapesium sama kaki?" pilihan={[{ huruf: "A", teks: "Ya, karena kakinya sama" }, { huruf: "B", teks: "Tidak, karena tidak punya simetri lipat" }, { huruf: "C", teks: "Ya, karena semua sudutnya siku" }, { huruf: "D", teks: "Tidak, karena ia bukan segi empat" }]} benar="B" umpan="Trapesium sama kaki punya simetri lipat. Jajargenjang biasa tidak." salah="Lihat simetri lipatnya, bukan hanya sisi sejajar." />
          <GameSejajar />
          <Dialog nama="Beni" anak="Baca empat ciri bingkai ini, lalu pilih nama yang cocok." />
          <GameTebakBingkai kelompok="trapesium" />
        </Adegan>

        <Adegan judul="Sub-bab 2 — Persegi panjang, belah ketupat, persegi, dan layang-layang" jenis="layang" kelas={kelas} kelamin={kelamin} penjelasan={["Persegi panjang, belah ketupat, persegi, dan layang-layang saling berkaitan.", "Ciri tambahan mengubah nama bangun.", "Satu diagonal layang-layang bisa menjadi garis lipat."]}>
          <Dialog nama="Dara" anak="Persegi panjang: sisi berhadapan sejajar dan sama panjang, semua sudutnya siku." />
          <Dialog nama="Tio" anak="Kalau satu sudut jajargenjang kita ubah sampai siku, sudut yang lain ikut berubah." />
          <Pilih id={idKuis("A", 10)} pertanyaan="Jajargenjang yang salah satu sudutnya dijadikan siku menjadi..." pilihan={[{ huruf: "A", teks: "segitiga" }, { huruf: "B", teks: "persegi panjang" }, { huruf: "C", teks: "layang-layang" }, { huruf: "D", teks: "segitiga tumpul" }]} benar="B" umpan="Semua sudutnya ikut menjadi siku. Namanya persegi panjang." salah="Ingat bangun yang semua sudutnya siku dan sisi berhadapannya sama." />
          <Pilih id={idKuis("B", 3)} pertanyaan="Apakah persegi panjang memiliki semua ciri jajargenjang?" pilihan={[{ huruf: "A", teks: "Ya" }, { huruf: "B", teks: "Tidak, karena sisinya tidak sejajar" }, { huruf: "C", teks: "Tidak, karena ia segitiga" }, { huruf: "D", teks: "Ya, tetapi hanya jika miring" }]} benar="A" umpan="Sisi berhadapan tetap sejajar dan sama panjang. Sudut berhadapan sama besar." salah="Cek sisi berhadapan dan sudut berhadapan." />
          <Dialog nama="Igil" anak="Persegi panjang adalah jajargenjang yang salah satu sudutnya siku." />
          <Dialog nama="Beni" anak="Belah ketupat: semua sisi sama panjang, sisi berhadapan sejajar, sudut berhadapan sama besar, dan diagonalnya saling tegak lurus." />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Bolehkah belah ketupat disebut jajargenjang?" periksa={jawabYa} petunjuk="Cek apakah semua ciri jajargenjang ada padanya." benar="Ya. Semua ciri jajargenjang ada pada belah ketupat." />
          <TulisBebas id={idKuis("B", 5)} judul="Menjadi persegi" visual={<Papan anak="belah ketupat · ciri apa yang ditambah?" />} pertanyaan="Tulis ciri sudut yang membuatnya menjadi persegi." pesanSalah="Lihat sudutnya, bukan panjang sisinya. Sisinya sudah sama." bantuan="Sudutnya harus siku." umpan="Sudut siku." periksa={jawabSiku} alias={["siku", "siku-siku"]} konteks="Belah ketupat menjadi persegi jika salah satu sudutnya siku." />
          <Dialog nama="Tio" anak="Persegi adalah belah ketupat yang salah satu sudutnya siku. Ia juga persegi panjang yang sisi berurutannya sama panjang." />
          <Pilih id={idKuis("B", 6)} pertanyaan="Bolehkah persegi disebut persegi panjang?" pilihan={[{ huruf: "A", teks: "Ya, karena semua sudutnya siku dan sisi berhadapan sama" }, { huruf: "B", teks: "Tidak, karena sisinya sama" }, { huruf: "C", teks: "Tidak, karena ia segitiga" }, { huruf: "D", teks: "Ya, karena tidak punya sudut siku" }]} benar="A" umpan="Semua ciri persegi panjang ada pada persegi." salah="Cek sudut siku dan sisi berhadapan." />
          <Pilih id={idKuis("B", 7)} pertanyaan="Bolehkah belah ketupat disebut layang-layang?" pilihan={[{ huruf: "A", teks: "Tidak, karena diagonalnya tidak tegak lurus" }, { huruf: "B", teks: "Ya, karena semua ciri layang-layang ada padanya" }, { huruf: "C", teks: "Tidak, karena ia bukan segi empat" }, { huruf: "D", teks: "Ya, karena tidak punya sisi sama" }]} benar="B" umpan="Belah ketupat adalah layang-layang yang kedua diagonalnya menjadi sumbu simetri." salah="Cek pasangan sisi berurutan dan diagonalnya." />
          <KuisBenarSalah id={idKuis("B", 8)} perintah="Pilih benar atau salah." baris={[{ teks: "Batang 4 cm, 4 cm, dan 9 cm bisa menjadi segitiga.", benar: false }, { teks: "Sudut 20° pada segitiga termasuk sudut lancip.", benar: true }, { teks: "Semua belah ketupat adalah persegi.", benar: false }]} umpan="4 + 4 masih lebih pendek daripada 9. Belah ketupat menjadi persegi hanya jika ada sudut siku." />
          <SusunToken id={idKuis("B", 9)} perintah="Susun dari yang paling umum ke yang paling khusus." acak={["Persegi", "Segi empat", "Persegi panjang", "Jajargenjang"]} benar={["Segi empat", "Jajargenjang", "Persegi panjang", "Persegi"]} umpan="Segi empat, jajargenjang, persegi panjang, lalu persegi." pesanSalah="Mulai dari bangun yang cirinya paling sedikit." />
          <Pilih id={idKuis("B", 10)} pertanyaan="Garis lipat pada layang-layang yang membuat dua bagian menempel disebut..." pilihan={[{ huruf: "A", teks: "sisi miring" }, { huruf: "B", teks: "sumbu simetri" }, { huruf: "C", teks: "sudut tumpul" }, { huruf: "D", teks: "titik sudut" }]} benar="B" umpan="Satu diagonal layang-layang adalah sumbu simetri." salah="Ingat nama garis lipat yang membuat dua bagian menempel." />
          <KuisCocok id={idKuis("B", 11)} perintah="Pasangkan bangun dengan banyak simetri lipatnya." baris={[{ kiri: "Trapesium sama kaki", pilihan: LIPAT, benar: "1" }, { kiri: "Persegi panjang", pilihan: LIPAT, benar: "2" }, { kiri: "Persegi", pilihan: LIPAT, benar: "4" }]} umpan="1, 2, dan 4." />
          <TabelInfoGrafis
            judul="Infografis: Keluarga segi empat"
            kepala={["Bangun", "Ciri inti", "Juga disebut"]}
            baris={[
              ["Trapesium", "minimal 1 pasang sejajar", "segi empat"],
              ["Jajargenjang", "2 pasang berhadapan sejajar", "trapesium"],
              ["Persegi panjang", "jajargenjang + sudut siku", "sudutnya semua siku"],
              ["Belah ketupat", "jajargenjang + sisi sama", "layang-layang"],
              ["Persegi", "belah ketupat + sudut siku", "persegi panjang"],
              ["Layang-layang", "1 diagonal adalah sumbu simetri", "2 pasang sisi berurutan"],
            ]}
            kaki="Jajargenjang bukan trapesium sama kaki."
          />
          <GameKeluarga />
          <GameLipatLayang />
          <Dialog nama="Tio" anak="Nyalakan garis lipat dan diagonal, lalu putar segi empat sampai bingkainya ketemu lagi." />
          <GameLaserLipat kelompok="segi-empat" />
          <Dialog nama="Dara" anak="Empat ciri lagi. Kali ini untuk belah ketupat dan layang-layang." />
          <GameTebakBingkai kelompok="ketupat" />
          <Dialog nama="Igil" anak="Ubah sudut dan sisi jajargenjang, lalu uji empat pernyataan keluarganya." />
          <GameUbahKeluarga />
        </Adegan>
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB7.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🪁🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarPadang jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB7} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB7} penutup="Layang senja naik. Igil menempelkan cap bingkai." bunga="🪁🔺🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB7.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Bingkai Senja" : skor >= 6 ? "🪁 Penjaga Layang" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Cirimu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru bingkai." : "Ayo cek lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarPadang jenis="meja" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Sembilan, dua, enam" visual={<Papan anak="9 cm · 2 cm · 6 cm" />} pertanyaan="Tulis bisa atau tidak." pesanSalah="Jumlahkan dua batang yang pendek." bantuan="2 + 6 masih lebih pendek daripada 9." umpan="Tidak." periksa={jawabTidak} alias={["tidak"]} konteks="9, 2, dan 6 tidak bisa menjadi segitiga." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Segitiga bersudut 20°, 30°, dan 130° disebut..." pilihan={[{ huruf: "A", teks: "lancip" }, { huruf: "B", teks: "siku-siku" }, { huruf: "C", teks: "tumpul" }, { huruf: "D", teks: "sama sisi" }]} benar="C" umpan="130° lebih besar daripada siku. Segitiganya tumpul." salah="Cari sudut yang lebih besar daripada siku." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Dua sudut segitiga 55° dan 35°. Berapa sudut ketiganya?" periksa={hasil90} petunjuk="Jumlahkan, lalu kurangkan dari 180." benar="90°." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Batang 7 cm, 7 cm, dan 4 cm membentuk segitiga. Nama yang paling tepat menurut sisinya..." pilihan={[{ huruf: "A", teks: "sama sisi" }, { huruf: "B", teks: "sama kaki" }, { huruf: "C", teks: "sembarang" }, { huruf: "D", teks: "persegi" }]} benar="B" umpan="Dua sisi sama, sisi ketiga berbeda. Itu sama kaki." salah="Hitung berapa sisi yang sama panjang." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan ciri dengan namanya." baris={[{ kiri: "6, 6, 4 dan semua sudut lancip", pilihan: EVAL_NAMA, benar: "segitiga lancip sama kaki" }, { kiri: "8, 8, 8", pilihan: EVAL_NAMA, benar: "segitiga sama sisi" }, { kiri: "satu sudut 90° dan dua sisi pengapitnya sama", pilihan: EVAL_NAMA, benar: "segitiga siku-siku sama kaki" }]} umpan="Lancip sama kaki, sama sisi, dan siku-siku sama kaki." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Seratus dan tiga puluh" visual={<Papan anak="100° + 30°" />} pertanyaan="Tulis sudut ketiga segitiga itu." pesanSalah="Kurangkan jumlah itu dari 180." bantuan="100 + 30 = 130. 180 − 130 = 50." umpan="50°." periksa={hasil50} alias={["50"]} konteks="Sudut ketiga adalah 50 derajat." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Bingkai bersisi 6 cm, 6 cm, 6 cm, dan 6 cm. Dua sudutnya 70° dan 110°. Nama yang paling tepat..." pilihan={[{ huruf: "A", teks: "persegi" }, { huruf: "B", teks: "persegi panjang" }, { huruf: "C", teks: "belah ketupat" }, { huruf: "D", teks: "segitiga sama sisi" }]} benar="C" umpan="Semua sisi sama, tetapi sudutnya tidak siku. Itu belah ketupat." salah="Sudut 70° bukan siku, jadi ia bukan persegi." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Segi empat dengan tepat satu pasang sisi sejajar dan satu sudut siku disebut..." pilihan={[{ huruf: "A", teks: "jajargenjang" }, { huruf: "B", teks: "trapesium siku-siku" }, { huruf: "C", teks: "persegi" }, { huruf: "D", teks: "segitiga siku-siku" }]} benar="B" umpan="Satu pasang sejajar membuatnya trapesium. Satu sudut siku membuatnya trapesium siku-siku." salah="Jajargenjang punya dua pasang sisi sejajar." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Dua sudut segitiga masing-masing 80°. Berapa sudut ketiganya?" periksa={hasil20} petunjuk="80 + 80, lalu kurangkan dari 180." benar="20°." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Pada layang-layang ABCD, diagonal AC adalah sumbu simetri. Sisi yang sama panjang adalah..." pilihan={[{ huruf: "A", teks: "AB dengan BC" }, { huruf: "B", teks: "AB dengan AD, dan CB dengan CD" }, { huruf: "C", teks: "AB dengan CD" }, { huruf: "D", teks: "keempat sisinya sama" }]} benar="B" umpan="Lipatan pada AC menempelkan B ke D. Sisi yang bertemu di A sama, sisi yang bertemu di C sama." salah="Sumbu simetri menempelkan dua sisi yang berurutan." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab7({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarPadang jenis="kartu" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Tiga batang menjadi segitiga jika jumlah dua batang lebih panjang daripada batang ketiga.",
          "Jumlah sudut dalam segitiga 180 derajat.",
          "Pada bab ini, trapesium punya minimal satu pasang sisi sejajar.",
        ])}
        poin={[
          "Tiga batang menjadi segitiga jika jumlah dua batang lebih panjang daripada batang ketiga. 5, 6, 7 bisa. 5, 4, 12 tidak. 10, 5, 15 tidak karena jumlahnya baru sama.",
          "Segitiga lancip: semua sudut lancip. Siku-siku: satu sudut 90°. Tumpul: satu sudut tumpul. Dua sudut siku atau dua sudut tumpul tidak muat.",
          "Jumlah sudut dalam segitiga 180°. Contoh 50 + 60 + 70. Sama sisi: tiap sudut 60°. Siku-siku sama kaki: dua sudut lain 45°.",
          "Sama kaki: minimal 2 sisi sama, 2 sudut sama, 1 simetri lipat, 1 simetri putar. Sama sisi: 3 sisi, 3 sudut, 3 lipat, 3 putar. Sama sisi boleh disebut sama kaki. Sama kaki belum tentu sama sisi.",
          "Trapesium pada bab ini punya minimal satu pasang sisi sejajar. Trapesium siku-siku punya satu sudut siku. Trapesium sama kaki punya 1 simetri lipat. Jajargenjang juga trapesium, tetapi bukan trapesium sama kaki.",
          "Persegi panjang adalah jajargenjang yang salah satu sudutnya siku. Belah ketupat adalah jajargenjang bersisi sama, dan juga layang-layang. Persegi adalah belah ketupat yang bersudut siku, dan juga persegi panjang. Satu diagonal layang-layang adalah sumbu simetri.",
        ]}
        penutup="Cek dua sisi dulu. Lalu lihat sudut, sisi sejajar, dan simetri."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
