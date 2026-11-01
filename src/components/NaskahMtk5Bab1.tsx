"use client";

import GambarCerita from "@/components/GambarCerita";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import TujuanBelajar from "@/components/TujuanBelajar";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { QuestLangkah, type LangkahQuest } from "@/components/QuestLangkah";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import type { KelaminGuru } from "@/lib/guru";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB1, TEMA_MTK5_BAB1 } from "@/lib/misi-mtk-5-bab1";
import { MODUL_MTK5_BAB1 } from "@/lib/modul-resmi-mtk-5-bab1";
import {
  baca16667,
  baca25786,
  baca44567,
  baca66500,
  isi85450,
  jumlah45750,
  jumlah55000,
  jumlah89054,
  komposisi97500,
  kurang18800,
  kurang54534,
  lebih86576,
  lebihKecil89876,
  tulis15950,
  tulis26932,
  tulis34000,
  tulis73420,
  tulis38000,
  uang38600,
  urai57500,
} from "@/lib/nilai-mtk-5-bab1";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB1.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({ teks, jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200 }));
}

const WARNA: Record<string, string> = {
  Arun: "border-teal-300 bg-teal-50",
  Mira: "border-rose-300 bg-rose-50",
  Kiran: "border-sky-300 bg-sky-50",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH: Record<string, string> = { Arun: "👦", Mira: "👧", Kiran: "👦", Igil: "🦉" };

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${WARNA[nama] ?? "border-[#1C01A5]/15 bg-white"}`}>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span className="text-2xl leading-none" aria-hidden>{WAJAH[nama] ?? "💬"}</span>
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

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

const GAMBAR_DERMAGA = {
  tiket: { src: "/doodle-mtk/mtk-5-bab1-tiket.jpg", alt: "Arun, Mira, Kiran, dan Igil di dermaga lentera. Kiran memegang tiket kosong." },
  banding: { src: "/doodle-mtk/mtk-5-bab1-banding.jpg", alt: "Dua papan congklak di dermaga. Arun, Mira, Kiran, dan Igil membandingkan isinya." },
  uang: { src: "/doodle-mtk/mtk-5-bab1-uang.jpg", alt: "Tumpukan uang dan mangkuk koin di meja dermaga. Igil duduk di sampingnya." },
  hitung: { src: "/doodle-mtk/mtk-5-bab1-hitung.jpg", alt: "Sempoa dan balok kayu di meja dermaga. Igil duduk di antara Arun, Mira, dan Kiran." },
  pos: { src: "/doodle-mtk/mtk-5-bab1-pos.jpg", alt: "Lentera berjajar di dermaga. Igil berjalan di depan Arun, Mira, dan Kiran." },
  meja: { src: "/doodle-mtk/mtk-5-bab1-meja.jpg", alt: "Meja kecil di dermaga dengan kertas kosong. Igil menunggu di samping." },
  kartu: { src: "/doodle-mtk/mtk-5-bab1-kartu.jpg", alt: "Arun, Mira, Kiran, dan Igil memegang kartu kosong di dermaga lentera." },
} as const;

function GambarDermaga({ jenis }: { jenis: keyof typeof GAMBAR_DERMAGA }) {
  const gambar = GAMBAR_DERMAGA[jenis];
  return <GambarCerita src={gambar.src} alt={gambar.alt} />;
}

function LayarBab({ judul, jenis, kelas, kelamin, penjelasan, children }: { judul: string; jenis?: keyof typeof GAMBAR_DERMAGA; kelas?: string; kelamin?: KelaminGuru; penjelasan?: string[]; children?: ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-lg font-black leading-snug text-[#1C01A5]">{judul}</p>
      {penjelasan && penjelasan.length > 0 ? <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} /> : null}
      {jenis ? <GambarDermaga jenis={jenis} /> : null}
      {children}
    </div>
  );
}

function KuisSuara({ id, pertanyaan, periksa, petunjuk, benar }: { id: string; pertanyaan: string; periksa: (teks: string) => boolean; petunjuk: string; benar?: string }) {
  const kuis = useKuisMateri();
  const [tepat, setTepat] = useState(() => kuis?.sudahBenar(id) ?? false);
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
  const [pilih, setPilih] = useState(() => (kuis?.sudahBenar(id) ? benar : ""));
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
  const selesaiAwal = kuis?.sudahBenar(id) ?? false;
  const [peta, setPeta] = useState<Record<number, string>>(() => (selesaiAwal ? Object.fromEntries(baris.map((item, indeks) => [indeks, item.benar])) : {}));
  const [aktif, setAktif] = useState(0);
  const [cek, setCek] = useState(selesaiAwal);
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
  const selesaiAwal = kuis?.sudahBenar(id) ?? false;
  const [status, setStatus] = useState<StatusJawabanKuis>(selesaiAwal ? "benar" : null);
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
        setStatus(ok ? "benar" : "salah");
        setCuplikan(bacaan || cuplikan);
        if (ok) kuis?.tandaiBenar(id);
        else setSalahKe((n) => n + 1);
        return;
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
        return;
      }
    }
    const ok = periksa(data);
    setStatus(ok ? "benar" : "salah");
    setCuplikan(data);
    if (ok) kuis?.tandaiBenar(id);
    else setSalahKe((n) => n + 1);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-white p-4">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      {judul ? <p className="mt-2 text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      {visual ? <div className="mt-3">{visual}</div> : null}
      <p className="mt-3 rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">{pertanyaan}</p>
      <div className="mt-3">
        <WritingCanvas onSubmit={nilai} />
      </div>
      <HasilJawabanKuis status={status} cuplikan={cuplikan || undefined} pesanSalah={pesanSalah} />
      {status === "salah" && salahKe >= 2 && bantuan ? <p className="mt-2 text-sm font-semibold text-amber-800">{bantuan}</p> : null}
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function SusunToken({ id, perintah, acak, benar, umpan }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string }) {
  const kuis = useKuisMateri();
  const selesaiAwal = kuis?.sudahBenar(id) ?? false;
  const [sisa, setSisa] = useState(() => (selesaiAwal ? [] : acak.map((teks, indeks) => ({ id: indeks, teks }))));
  const [susun, setSusun] = useState<{ id: number; teks: string }[]>(() => (selesaiAwal ? benar.map((teks, indeks) => ({ id: indeks, teks })) : []));
  const [status, setStatus] = useState<StatusJawabanKuis>(selesaiAwal ? "benar" : null);
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((item, indeks) => item.teks === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <div className="mt-3 flex min-h-12 flex-wrap gap-2 rounded-xl bg-white px-3 py-2">
        {susun.length === 0 ? <span className="text-sm font-semibold text-slate-400">…</span> : null}
        {susun.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSusun((lama) => lama.filter((kartu) => kartu.id !== item.id)); setSisa((lama) => [...lama, item]); setStatus(null); }} className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-black text-white">{item.teks}</button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id)); setSusun((lama) => [...lama, item]); setStatus(null); }} className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#1C01A5] ring-2 ring-[#1C01A5]/20">{item.teks}</button>
        ))}
      </div>
      <button type="button" onClick={periksa} className="mt-3 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">Periksa urutan</button>
      <HasilJawabanKuis status={status} pesanSalah="Urutkan dari yang paling kecil." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisBenarSalah({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { teks: string; benar: boolean }[]; umpan: string }) {
  const kuis = useKuisMateri();
  const selesaiAwal = kuis?.sudahBenar(id) ?? false;
  const [peta, setPeta] = useState<Record<number, boolean | undefined>>(() => (selesaiAwal ? Object.fromEntries(baris.map((item, indeks) => [indeks, item.benar])) : {}));
  const [status, setStatus] = useState<StatusJawabanKuis>(selesaiAwal ? "benar" : null);
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
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>{nilai ? "Benar" : "Salah"}</button>
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

function GambarRak({ digit, judul }: { digit: string[]; judul: string }) {
  const nama = ["Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
  const warna = ["#e11d48", "#d97706", "#059669", "#0284c7", "#7c3aed"];
  return (
    <figure className="rounded-2xl border-2 border-sky-300 bg-white p-3">
      <figcaption className="text-center text-sm font-black text-[#1C01A5]">{judul}</figcaption>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {digit.map((angka, indeks) => (
          <div key={nama[indeks]} className="text-center">
            <div className="grid h-14 place-items-center rounded-xl text-2xl font-black text-white" style={{ background: warna[indeks] }}>{angka}</div>
            <p className="mt-1 text-[10px] font-bold leading-tight text-slate-600">{nama[indeks]}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

function BatangNilai() {
  const batang = [
    { nama: "10.000", lebar: "100%" },
    { nama: "4.000", lebar: "40%" },
    { nama: "500", lebar: "12%" },
    { nama: "0", lebar: "4%" },
    { nama: "0", lebar: "4%" },
  ];
  return (
    <figure className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-3">
      <figcaption className="text-center text-sm font-black text-[#1C01A5]">Batang nilai tiket 14.500</figcaption>
      <div className="mt-3 space-y-2">
        {batang.map((item, indeks) => (
          <div key={`${item.nama}-${indeks}`} className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
            <span className="text-xs font-black text-[#1C01A5]">{item.nama}</span>
            <span className="h-4 rounded-full bg-[#1C01A5]" style={{ width: item.lebar }} />
          </div>
        ))}
      </div>
    </figure>
  );
}

function LambangHitung() {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5] bg-[#F8F7FF] px-3 py-4 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Lambang angka</p>
      <p className="mt-3 text-base font-black leading-relaxed text-[#1C01A5] sm:text-lg">14.500 = 1 × 10.000 + 4 × 1.000 + 5 × 100 + 0 × 10 + 0 × 1</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Tiap angka dikali nilai raknya, lalu dijumlahkan.</p>
    </div>
  );
}

function RakTiket() {
  const rak = [
    { nama: "Puluh ribuan", angka: "1", nilai: "10.000" },
    { nama: "Ribuan", angka: "4", nilai: "4.000" },
    { nama: "Ratusan", angka: "5", nilai: "500" },
    { nama: "Puluhan", angka: "0", nilai: "0" },
    { nama: "Satuan", angka: "0", nilai: "0" },
  ];
  const [aktif, setAktif] = useState(0);
  return (
    <div className="rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Rak tiket 14.500</p>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {rak.map((item, indeks) => (
          <button key={item.nama} type="button" onClick={() => setAktif(indeks)} className={`rounded-xl px-1 py-2 text-center ${aktif === indeks ? "bg-[#1C01A5] text-white" : "bg-sky-50 text-[#1C01A5]"}`}>
            <span className="block text-[10px] font-bold leading-tight">{item.nama}</span>
            <span className="mt-1 block text-2xl font-black">{item.angka}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Angka {rak[aktif].angka} di rak {rak[aktif].nama.toLowerCase()} bernilai {rak[aktif].nilai}. Empat belas ribu lima ratus ditulis 14.500.</p>
    </div>
  );
}

function LambangBanding() {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5] bg-[#F8F7FF] px-3 py-4 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Lambang banding</p>
      <p className="mt-3 text-xl font-black text-[#1C01A5]">56.560 &lt; 57.000</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Rak puluh ribuan sama-sama 5. Di rak ribuan, 6 &lt; 7.</p>
    </div>
  );
}

function BandingHarga() {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-3">
      <p className="text-sm font-black text-[#1C01A5]">Dua harga papan</p>
      <div className="mt-2 grid grid-cols-2 gap-2 text-center">
        <p className="rounded-xl bg-white px-2 py-3 text-2xl font-black text-[#1C01A5]">56.560</p>
        <p className="rounded-xl bg-white px-2 py-3 text-2xl font-black text-[#1C01A5]">57.000</p>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Rak puluh ribuan sama-sama 5. Geser ke rak ribuan: 6 lebih kecil daripada 7. Jadi 56.560 lebih murah daripada 57.000.</p>
    </div>
  );
}

function TumpukanUang() {
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">Uang Kiran</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">6 lembar sepuluh ribuan, 3 lembar seribuan, 5 keping seratusan.</p>
      <p className="mt-2 text-lg font-black text-[#1C01A5]">60.000 + 3.000 + 500 = 63.500</p>
    </div>
  );
}

function KepingUang() {
  const kelompok = [
    { nama: "10.000", banyak: 6, warna: "bg-emerald-600" },
    { nama: "1.000", banyak: 3, warna: "bg-sky-600" },
    { nama: "100", banyak: 5, warna: "bg-amber-500" },
  ];
  return (
    <figure className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-3">
      <figcaption className="text-center text-sm font-black text-[#1C01A5]">Gambar uang 63.500</figcaption>
      <div className="mt-3 space-y-2">
        {kelompok.map((item) => (
          <div key={item.nama} className="flex flex-wrap items-center gap-1">
            {Array.from({ length: item.banyak }, (_, indeks) => (
              <span key={`${item.nama}-${indeks}`} className={`grid h-8 min-w-14 place-items-center rounded-lg px-1 text-[10px] font-black text-white ${item.warna}`}>{item.nama}</span>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

function LambangSusun() {
  return (
    <div className="rounded-2xl border-2 border-[#1C01A5] bg-[#F8F7FF] px-3 py-4 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">Lambang susun</p>
      <p className="mt-3 text-base font-black leading-relaxed text-[#1C01A5] sm:text-lg">63.500 = 6 × 10.000 + 3 × 1.000 + 5 × 100</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Satu ribuan dapat ditukar menjadi sepuluh ratusan. Jumlahnya tetap.</p>
    </div>
  );
}

function TabelTambah() {
  const kepala = ["Ribuan", "Ratusan", "Puluhan", "Satuan"];
  const atas = ["6", "4", "8", "0"];
  const bawah = ["2", "7", "5", "0"];
  const hasil = ["9", "2", "3", "0"];
  const titip = ["+1", "+1", "", ""];
  const pra = ["7", "5", "", ""];
  const utuh = ["", "12", "13", ""];
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-sky-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">6.480 + 2.750, cara bersusun pendek</p>
      <div className="mt-2 grid grid-cols-4 gap-1 text-center">
        {kepala.map((nama) => <p key={nama} className="text-[10px] font-bold text-slate-500">{nama}</p>)}
        {utuh.map((teks, indeks) => <p key={`u-${indeks}`} className="text-xs font-black text-rose-600">{teks}</p>)}
        {titip.map((teks, indeks) => <p key={`t-${indeks}`} className="text-xs font-black text-rose-600">{teks}</p>)}
        {atas.map((teks, indeks) => <p key={`a-${indeks}`} className="text-3xl font-black text-[#1C01A5]">{teks}</p>)}
        {pra.map((teks, indeks) => <p key={`p-${indeks}`} className="text-xs font-black text-rose-600">{teks}</p>)}
        {bawah.map((teks, indeks) => <p key={`b-${indeks}`} className="text-3xl font-black text-[#1C01A5]">{indeks === 0 ? `+${teks}` : teks}</p>)}
        <p className="col-span-4 border-t-2 border-[#1C01A5]" />
        {hasil.map((teks, indeks) => <p key={`h-${indeks}`} className="text-3xl font-black text-emerald-700">{teks}</p>)}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Puluhan 8 + 5 = 13. Tulis 3, teruskan +1 ke ratusan. Ratusan 4 + 7 + 1 = 12. Tulis 2, teruskan +1 ke ribuan. Hasilnya 9.230.</p>
    </div>
  );
}

function TabelKurang() {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-rose-200 bg-white p-3">
      <p className="text-sm font-black text-[#1C01A5]">47.900 − 45.750</p>
      <div className="mt-2 grid grid-cols-5 gap-1 text-center">
        {["Puluh ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"].map((nama) => <p key={nama} className="text-[10px] font-bold leading-tight text-slate-500">{nama}</p>)}
        {["4", "7", "9", "0", "0"].map((teks, indeks) => <p key={`a-${indeks}`} className="text-3xl font-black text-[#1C01A5]">{indeks === 2 ? <span>9<span className="align-super text-xs text-rose-600">−1</span></span> : teks}</p>)}
        {["4", "5", "7", "5", "0"].map((teks, indeks) => <p key={`b-${indeks}`} className="text-3xl font-black text-[#1C01A5]">{indeks === 0 ? `−${teks}` : teks}</p>)}
        {["", "", "8", "10", ""].map((teks, indeks) => <p key={`s-${indeks}`} className="text-xs font-black text-rose-600">{teks}</p>)}
        <p className="col-span-5 border-t-2 border-[#1C01A5]" />
        {["0", "2", "1", "5", "0"].map((teks, indeks) => <p key={`h-${indeks}`} className="text-3xl font-black text-emerald-700">{teks}</p>)}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-700">Rak puluhan memberi tempat untuk 10. Rak ratusan yang memberi menulis sisa 8 di bawah angka 9. Hasilnya 2.150.</p>
    </div>
  );
}

const BACA_A = ["tiga puluh tujuh ribu dua ratus lima puluh", "delapan puluh ribu enam", "sembilan belas ribu empat ratus tiga puluh"];
const TANDA_B = ["lebih besar", "lebih kecil", "sama besar"];
const SUSUN_C = ["28.300", "41.200", "15.050"];
const HASIL_B = ["79.500", "60.000", "16.000"];
const HASIL_D = ["26.932", "9.610", "30.000"];

const TAB_A = { tab: "Sub-Bab A", kelompok: "Membaca, menulis, dan nilai tempat sampai 100.000" };
const TAB_B = { tab: "Sub-Bab B", kelompok: "Membandingkan dan mengurutkan sampai 100.000" };
const TAB_C = { tab: "Sub-Bab C", kelompok: "Komposisi dan dekomposisi sampai 100.000" };
const TAB_D = { tab: "Sub-Bab D", kelompok: "Operasi hitung bilangan cacah sampai 100.000" };
const TAB_POIN = { tab: "Review" };

const TAB_LANGKAH: Record<string, { tab: string; kelompok?: string }> = {
  mulai: { tab: "Review", kelompok: "Tujuan Pembelajaran" },
  "rak-tiket": TAB_A,
  a0: TAB_A,
  a1: TAB_A,
  "rak-info": TAB_A,
  a13: TAB_A,
  a14: TAB_A,
  "rak-gambar": TAB_A,
  a9: TAB_A,
  a11: TAB_A,
  a15: TAB_A,
  "rak-abstrak": TAB_A,
  a16: TAB_A,
  a17: TAB_A,
  a18: TAB_A,
  "banding-papan": TAB_B,
  a2: TAB_B,
  "b-kecil": TAB_B,
  "banding-info": TAB_B,
  b2: TAB_B,
  b3: TAB_B,
  "b-gambar": TAB_B,
  a10: TAB_B,
  "b-benar": TAB_B,
  "b-cocok": TAB_B,
  "b-lambang": TAB_B,
  a12: TAB_B,
  "b-tanda": TAB_B,
  "b-terkecil": TAB_B,
  "uang-tumpuk": TAB_C,
  a4: TAB_C,
  a5: TAB_C,
  "uang-info": TAB_C,
  b4: TAB_C,
  b5: TAB_C,
  "uang-gambar": TAB_C,
  "c-susun": TAB_C,
  "c-benar": TAB_C,
  "c-cocok": TAB_C,
  "uang-lambang": TAB_C,
  "c-kali": TAB_C,
  "c-urai": TAB_C,
  "c-tukar": TAB_C,
  tambah: TAB_D,
  a6: TAB_D,
  a7: TAB_D,
  "kurang-kali": TAB_D,
  "info-operasi": TAB_D,
  b9: TAB_D,
  b7: TAB_D,
  warung: TAB_D,
  b6: TAB_D,
  b8: TAB_D,
  b10: TAB_D,
  b11: TAB_D,
  b12: TAB_D,
  poin: TAB_POIN,
  tanya: TAB_POIN,
};

function kuisTab(daftar: LangkahQuest[], tab: string) {
  return daftar.filter((item) => TAB_LANGKAH[item.kode]?.tab === tab).flatMap((item) => item.kuis ?? []);
}

function TargetPembelajaran({ sasaran }: { sasaran: { judul: string; kuis: string[] }[] }) {
  const kuis = useKuisMateri();
  const sudah = (id: string) => kuis?.sudahBenar(id) ?? false;
  return (
    <TujuanBelajar
      judul="Target Pembelajaran"
      butir={sasaran.map((item) => item.judul)}
      selesai={sasaran.map((item) => item.kuis.length > 0 && item.kuis.every(sudah))}
    />
  );
}

function denganTab(daftar: LangkahQuest[]): LangkahQuest[] {
  return daftar.map((item) => {
    const meta = TAB_LANGKAH[item.kode];
    return meta ? { ...item, ...meta } : item;
  });
}

function langkahDermaga(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const kartu = MODUL_MTK5_BAB1.kartu[0];
  const kuisPola = [
    ...MISI_MTK5_BAB1.map((_, indeks) => idKuis("C", indeks)),
    idKuisTulisKartu(ID, "C"),
  ];
  const materi: LangkahQuest[] = [
    {
      kode: "rak-tiket",
      bagian: "Rak",
      judul: "Tiket 14.500",
      halaman: "1",
      isi: (
        <LayarBab judul="Halaman 1 · Cerita" jenis="tiket" kelas={kelas} kelamin={kelamin} penjelasan={["Bilangan sampai 99.999 memakai lima rak.", "Titik di antara ribuan hanya pemisah, bukan koma."]}>
          <p className="text-lg font-black text-[#1C01A5]">Membaca dari rak kiri</p>
          <Dialog nama="Arun" anak="Aku mendengar empat belas ribu lima ratus. Kita baca dari rak kiri." />
          <Dialog nama="Mira" anak="Empat belas ribu lima ratus. Aku tulis dari rak kiri: 1, 4, 5, lalu dua nol." />
          <Dialog nama="Igil" anak="Jadi 14.500. Rak puluhan dan satuan kosong, tetap ditulis 0." />
          <RakTiket />
        </LayarBab>
      ),
    },
    { kode: "a0", bagian: "Rak", judul: "Baca 44.567", halaman: "1", kuis: [idKuis("A", 0)], isi: <KuisSuara id={idKuis("A", 0)} pertanyaan="Bacalah 44.567 dengan lengkap." periksa={baca44567} petunjuk="Sebut rak puluh ribuan, lalu sisa angkanya." benar="Empat puluh empat ribu lima ratus enam puluh tujuh." /> },
    { kode: "a1", bagian: "Rak", judul: "Tulis 15.950", halaman: "1", kuis: [idKuis("A", 1)], isi: <TulisBebas id={idKuis("A", 1)} judul="Tulis harga" visual={<Papan anak="lima belas ribu sembilan ratus lima puluh" />} pertanyaan="Tulis bilangan itu dengan angka." pesanSalah="Letakkan angka sesuai raknya. Rak kosong ditulis 0." bantuan="Lima belas ribu adalah 15. Sembilan ratus lima puluh melengkapi 15.950." umpan="15.950." periksa={tulis15950} alias={["15950", "15.950"]} konteks="Lima belas ribu sembilan ratus lima puluh ditulis 15.950." /> },
    {
      kode: "rak-info",
      bagian: "Rak",
      judul: "Infografis 14.500",
      halaman: "2",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 2 · Infografis</p>
          <Dialog nama="Igil" anak="Tabel warna ini membentangkan tiket 14.500. Rak kiri paling besar nilainya." />
          <GambarRak digit={["1", "4", "5", "0", "0"]} judul="Diagram rak 14.500" />
          <TabelInfoGrafis
            judul="Infografis: Nilai tempat 14.500"
            kepala={["Rak", "Angka", "Nilai"]}
            baris={[
              ["Puluh ribuan", "1", "10.000"],
              ["Ribuan", "4", "4.000"],
              ["Ratusan", "5", "500"],
              ["Puluhan", "0", "0"],
              ["Satuan", "0", "0"],
            ]}
            kaki="10.000 + 4.000 + 500 = 14.500."
          />
        </div>
      ),
    },
    { kode: "a13", bagian: "Rak", judul: "Baca 66.500", halaman: "2", kuis: [idKuis("A", 12)], isi: <KuisSuara id={idKuis("A", 12)} pertanyaan="Bacalah 66.500 dengan lengkap." periksa={baca66500} petunjuk="Sebut puluh ribuan, ribuan, lalu ratusan." benar="Enam puluh enam ribu lima ratus." /> },
    { kode: "a14", bagian: "Rak", judul: "Tulis 26.932", halaman: "2", kuis: [idKuis("A", 13)], isi: <TulisBebas id={idKuis("A", 13)} judul="Tulis tiket pagi" visual={<Papan anak="dua puluh enam ribu sembilan ratus tiga puluh dua" />} pertanyaan="Tulis bilangan itu dengan angka." pesanSalah="Letakkan tiap bagian pada raknya. Rak yang kosong ditulis 0." bantuan="Dua puluh enam ribu adalah 26. Sembilan ratus tiga puluh dua melengkapi 26.932." umpan="26.932." periksa={tulis26932} alias={["26932", "26.932"]} konteks="Dua puluh enam ribu sembilan ratus tiga puluh dua ditulis 26.932." /> },
    {
      kode: "rak-gambar",
      bagian: "Rak",
      judul: "Gambar tiket",
      halaman: "3",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 3 · Gambar</p>
          <p className="text-sm font-semibold text-slate-700">Contoh gambar dari cerita dan tabel. Rak berwarna memuat angkanya. Batang memuat nilai tiap rak.</p>
          <GambarRak digit={["1", "4", "5", "0", "0"]} judul="Gambar rak tiket Mira" />
          <BatangNilai />
        </div>
      ),
    },
    { kode: "a9", bagian: "Rak", judul: "Pasangkan bacaan", halaman: "3", kuis: [idKuis("A", 8)], isi: <KuisCocok id={idKuis("A", 8)} perintah="Pasangkan bilangan dengan bacaannya." baris={[{ kiri: "37.250", pilihan: BACA_A, benar: "tiga puluh tujuh ribu dua ratus lima puluh" }, { kiri: "80.006", pilihan: BACA_A, benar: "delapan puluh ribu enam" }, { kiri: "19.430", pilihan: BACA_A, benar: "sembilan belas ribu empat ratus tiga puluh" }]} umpan="37.250, 80.006, dan 19.430 sudah pada bacaan yang tepat." /> },
    { kode: "a11", bagian: "Rak", judul: "Benar atau salah", halaman: "3", kuis: [idKuis("A", 10)], isi: <KuisBenarSalah id={idKuis("A", 10)} perintah="Pilih benar atau salah." baris={[{ teks: "Titik pada 52.700 adalah koma desimal.", benar: false }, { teks: "Pada 64.000, angka 6 bernilai 60.000.", benar: true }, { teks: "90.005 dibaca sembilan ribu lima.", benar: false }]} umpan="Titik itu pemisah ribuan. Angka 6 di rak puluh ribuan bernilai 60.000. 90.005 dibaca sembilan puluh ribu lima." /> },
    { kode: "a15", bagian: "Rak", judul: "Susun dari kecil", halaman: "3", kuis: [idKuis("A", 14)], isi: <SusunToken id={idKuis("A", 14)} perintah="Susun dari yang paling kecil." acak={["48.200", "8.420", "28.040"]} benar={["8.420", "28.040", "48.200"]} umpan="8.420, 28.040, 48.200." /> },
    {
      kode: "rak-abstrak",
      bagian: "Rak",
      judul: "Lambang angka",
      halaman: "4",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 4 · Lambang</p>
          <p className="text-sm font-semibold text-slate-700">Sekarang tiket yang sama ditulis dengan angka dan tanda kali.</p>
          <LambangHitung />
        </div>
      ),
    },
    { kode: "a16", bagian: "Rak", judul: "Nilai angka 7", halaman: "4", kuis: [idKuis("A", 15)], isi: <Pilih id={idKuis("A", 15)} pertanyaan="Nilai angka 7 pada 47.305 adalah..." pilihan={[{ huruf: "A", teks: "70.000" }, { huruf: "B", teks: "7.000" }, { huruf: "C", teks: "700" }, { huruf: "D", teks: "70" }]} benar="B" umpan="Angka 7 berdiri di rak ribuan, jadi nilainya 7.000." salah="Lihat rak tempat angka 7 berdiri." /> },
    { kode: "a17", bagian: "Rak", judul: "Jumlah kali rak", halaman: "4", kuis: [idKuis("A", 16)], isi: <Pilih id={idKuis("A", 16)} pertanyaan="3 × 10.000 + 2 × 100 ditulis..." pilihan={[{ huruf: "A", teks: "30.200" }, { huruf: "B", teks: "32.000" }, { huruf: "C", teks: "3.200" }, { huruf: "D", teks: "30.020" }]} benar="A" umpan="30.000 + 200 = 30.200." salah="Kalikan dulu, lalu jumlahkan." /> },
    { kode: "a18", bagian: "Rak", judul: "Jumlah tiga nilai", halaman: "4", kuis: [idKuis("A", 17)], isi: <Pilih id={idKuis("A", 17)} pertanyaan="50.000 + 800 + 6 = ..." pilihan={[{ huruf: "A", teks: "50.860" }, { huruf: "B", teks: "58.006" }, { huruf: "C", teks: "50.806" }, { huruf: "D", teks: "5.806" }]} benar="C" umpan="50.000 + 800 + 6 = 50.806." salah="Letakkan 800 di rak ratusan dan 6 di rak satuan." /> },
    {
      kode: "banding-papan",
      bagian: "Banding",
      judul: "Dua harga papan",
      halaman: "1",
      isi: (
        <LayarBab judul="Halaman 1 · Cerita" jenis="banding" kelas={kelas} kelamin={kelamin} penjelasan={["Bandingkan rak paling kiri lebih dulu.", "Kalau rak itu sama, geser satu rak ke kanan."]}>
          <p className="text-lg font-black text-[#1C01A5]">Banding dari rak kiri</p>
          <Dialog nama="Kiran" anak="Ada dua papan congklak. Aku tidak langsung melihat angka paling belakang." />
          <Dialog nama="Mira" anak="Aku mulai dari rak kiri. Kalau sama, baru geser ke kanan." />
          <Dialog nama="Igil" anak="Mulai dari puluh ribuan. Kalau sama, lihat ribuan." />
          <BandingHarga />
        </LayarBab>
      ),
    },
    { kode: "a2", bagian: "Banding", judul: "Yang lebih kecil", halaman: "1", kuis: [idKuis("A", 2)], isi: <KuisSuara id={idKuis("A", 2)} pertanyaan="Mana yang lebih kecil, 97.768 atau 89.876?" periksa={lebihKecil89876} petunjuk="Lihat rak puluh ribuan lebih dulu." benar="89.876 lebih kecil." /> },
    { kode: "b-kecil", bagian: "Banding", judul: "Tulis yang kecil", halaman: "1", kuis: [idKuis("B", 11)], isi: <TulisBebas id={idKuis("B", 11)} judul="Yang lebih kecil" visual={<Papan anak="73.420 atau 78.150" />} pertanyaan="Tulis bilangan yang lebih kecil." pesanSalah="Bandingkan rak puluh ribuan, lalu ribuan." bantuan="Rak ribuan 3 lebih kecil daripada 8. Yang kecil 73.420." umpan="73.420." periksa={tulis73420} alias={["73420", "73.420"]} konteks="73.420 lebih kecil daripada 78.150." /> },
    {
      kode: "banding-info",
      bagian: "Banding",
      judul: "Infografis dua papan",
      halaman: "2",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 2 · Infografis</p>
          <Dialog nama="Igil" anak="Tabel warna ini membandingkan 56.560 dan 57.000. Rak kiri sama, jadi lihat ribuan." />
          <div className="grid gap-2 sm:grid-cols-2">
            <GambarRak digit={["5", "6", "5", "6", "0"]} judul="Papan 56.560" />
            <GambarRak digit={["5", "7", "0", "0", "0"]} judul="Papan 57.000" />
          </div>
          <TabelInfoGrafis
            judul="Infografis: Banding 56.560 dan 57.000"
            kepala={["Rak", "56.560", "57.000"]}
            baris={[
              ["Puluh ribuan", "5", "5"],
              ["Ribuan", "6", "7"],
              ["Ratusan", "5", "0"],
              ["Puluhan", "6", "0"],
              ["Satuan", "0", "0"],
            ]}
            kaki="Di rak ribuan, 6 lebih kecil daripada 7."
          />
        </div>
      ),
    },
    { kode: "b2", bagian: "Banding", judul: "Yang lebih besar", halaman: "2", kuis: [idKuis("B", 0)], isi: <KuisSuara id={idKuis("B", 0)} pertanyaan="Mana yang lebih besar, 86.567 atau 86.576?" periksa={lebih86576} petunjuk="Rak kiri sama. Geser sampai ada rak yang berbeda." benar="86.576 lebih besar." /> },
    { kode: "b3", bagian: "Banding", judul: "Lompat lima puluh", halaman: "2", kuis: [idKuis("B", 1)], isi: <TulisBebas id={idKuis("B", 1)} judul="Bilangan yang hilang" visual={<Papan anak="85.350 · 85.400 · ⬜ · 85.500 · 85.550" />} pertanyaan="Tulis bilangan yang hilang." pesanSalah="Selisih tiap langkah 50." bantuan="85.400 + 50 = 85.450." umpan="85.450." periksa={isi85450} alias={["85450", "85.450"]} konteks="Bilangan yang hilang adalah 85.450." /> },
    {
      kode: "b-gambar",
      bagian: "Banding",
      judul: "Gambar dua papan",
      halaman: "3",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 3 · Gambar</p>
          <p className="text-sm font-semibold text-slate-700">Contoh gambar dari cerita dan tabel. Rak ribuan yang beda diberi warna lebih terang.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <GambarRak digit={["5", "6", "5", "6", "0"]} judul="56.560" />
            <GambarRak digit={["5", "7", "0", "0", "0"]} judul="57.000" />
          </div>
        </div>
      ),
    },
    { kode: "a10", bagian: "Banding", judul: "Susun dari kecil", halaman: "3", kuis: [idKuis("A", 9)], isi: <SusunToken id={idKuis("A", 9)} perintah="Susun dari yang paling kecil." acak={["78.897", "43.217", "56.475"]} benar={["43.217", "56.475", "78.897"]} umpan="43.217, 56.475, 78.897." /> },
    { kode: "b-benar", bagian: "Banding", judul: "Benar atau salah", halaman: "3", kuis: [idKuis("B", 12)], isi: <KuisBenarSalah id={idKuis("B", 12)} perintah="Pilih benar atau salah." baris={[{ teks: "48.300 lebih besar daripada 51.200.", benar: false }, { teks: "62.450 sama dengan 62.450.", benar: true }, { teks: "70.009 lebih kecil daripada 70.090.", benar: true }]} umpan="48 lebih kecil daripada 51. Dua bilangan yang sama tetap sama. Di 70.009 dan 70.090, rak puluhan 0 lebih kecil daripada 9." /> },
    { kode: "b-cocok", bagian: "Banding", judul: "Pasangkan tanda", halaman: "3", kuis: [idKuis("B", 13)], isi: <KuisCocok id={idKuis("B", 13)} perintah="Pasangkan pasangan bilangan dengan keputusannya." baris={[{ kiri: "23.400 dan 23.040", pilihan: TANDA_B, benar: "lebih besar" }, { kiri: "15.800 dan 18.500", pilihan: TANDA_B, benar: "lebih kecil" }, { kiri: "90.100 dan 90.100", pilihan: TANDA_B, benar: "sama besar" }]} umpan="23.400 lebih besar, 15.800 lebih kecil, dan 90.100 sama besar." /> },
    {
      kode: "b-lambang",
      bagian: "Banding",
      judul: "Lambang banding",
      halaman: "4",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 4 · Lambang</p>
          <p className="text-sm font-semibold text-slate-700">Dua papan yang sama sekarang ditulis dengan tanda banding.</p>
          <LambangBanding />
        </div>
      ),
    },
    { kode: "a12", bagian: "Banding", judul: "Selisih dua harga", halaman: "4", kuis: [idKuis("A", 11)], isi: <Pilih id={idKuis("A", 11)} pertanyaan="Selisih 34.000 dan 30.000 adalah..." pilihan={[{ huruf: "A", teks: "4.000" }, { huruf: "B", teks: "19.000" }, { huruf: "C", teks: "49.000" }, { huruf: "D", teks: "2.000" }]} benar="A" umpan="34.000 − 30.000 = 4.000." salah="Kurangkan bilangan yang lebih kecil dari yang lebih besar." /> },
    { kode: "b-tanda", bagian: "Banding", judul: "Tanda yang tepat", halaman: "4", kuis: [idKuis("B", 14)], isi: <Pilih id={idKuis("B", 14)} pertanyaan="Tanda yang tepat untuk 41.250 ... 41.520 adalah..." pilihan={[{ huruf: "A", teks: "<" }, { huruf: "B", teks: ">" }, { huruf: "C", teks: "=" }, { huruf: "D", teks: "tidak ada" }]} benar="A" umpan="Rak ratusan 2 lebih kecil daripada 5, jadi 41.250 < 41.520." salah="Geser sampai ada rak yang berbeda." /> },
    { kode: "b-terkecil", bagian: "Banding", judul: "Yang paling kecil", halaman: "4", kuis: [idKuis("B", 15)], isi: <Pilih id={idKuis("B", 15)} pertanyaan="Yang paling kecil di antara 12.800, 12.080, dan 12.008 adalah..." pilihan={[{ huruf: "A", teks: "12.800" }, { huruf: "B", teks: "12.080" }, { huruf: "C", teks: "12.008" }, { huruf: "D", teks: "12.880" }]} benar="C" umpan="12.008, lalu 12.080, lalu 12.800." salah="Bandingkan rak ratusan, puluhan, lalu satuan." /> },
    {
      kode: "uang-tumpuk",
      bagian: "Uang",
      judul: "Uang Kiran",
      halaman: "1",
      isi: (
        <LayarBab judul="Halaman 1 · Cerita" jenis="uang" kelas={kelas} kelamin={kelamin} penjelasan={["Menyusun berarti menggabungkan nilai rak menjadi satu bilangan.", "Mengurai berarti memecah bilangan ke setiap rak.", "Satu bilangan dapat disusun dengan lebih dari satu cara."]}>
          <p className="text-lg font-black text-[#1C01A5]">Susun dari lembar terbesar</p>
          <Dialog nama="Kiran" anak="Uangku 6 lembar sepuluh ribuan, 3 lembar seribuan, dan 5 keping seratusan." />
          <Dialog nama="Mira" anak="Aku jumlahkan dari yang terbesar. Enam puluh ribu, lalu tiga ribu, lalu lima ratus." />
          <Dialog nama="Igil" anak="Sepuluh keping seratusan dapat ditukar menjadi satu lembar seribuan. Karena itu satu bilangan bisa disusun dengan lebih dari satu cara." />
          <TumpukanUang />
        </LayarBab>
      ),
    },
    { kode: "a4", bagian: "Uang", judul: "Jumlah pecahan uang", halaman: "1", kuis: [idKuis("A", 4)], isi: <KuisSuara id={idKuis("A", 4)} pertanyaan="Berapa jumlah 3 lembar sepuluh ribuan, 8 lembar seribuan, dan 6 keping seratusan?" periksa={uang38600} petunjuk="Kalikan banyak lembar dengan nilai pecahannya, lalu jumlahkan." benar="Tiga puluh delapan ribu enam ratus." /> },
    { kode: "a5", bagian: "Uang", judul: "Urai 57.500", halaman: "1", kuis: [idKuis("A", 5)], isi: <TulisBebas id={idKuis("A", 5)} judul="Urai 57.500" visual={<Papan anak="57.500" />} pertanyaan="Urai 57.500 menurut raknya." pesanSalah="Tulis nilai puluh ribuan, ribuan, dan ratusan." bantuan="5 puluh ribuan, 7 ribuan, dan 5 ratusan." umpan="50.000 + 7.000 + 500." periksa={urai57500} alias={["50000", "7000", "500"]} konteks="57.500 = 50.000 + 7.000 + 500." /> },
    {
      kode: "uang-info",
      bagian: "Uang",
      judul: "Infografis 63.500",
      halaman: "2",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 2 · Infografis</p>
          <Dialog nama="Igil" anak="Tabel warna ini membentangkan uang Kiran. Enam puluh ribu, tiga ribu, dan lima ratus." />
          <GambarRak digit={["6", "3", "5", "0", "0"]} judul="Rak uang 63.500" />
          <TabelInfoGrafis
            judul="Infografis: Susunan 63.500"
            kepala={["Cara", "Susunan", "Jumlah"]}
            baris={[
              ["Cara 1", "6 puluh ribuan + 3 ribuan + 5 ratusan", "63.500"],
              ["Cara 2", "6 puluh ribuan + 2 ribuan + 15 ratusan", "63.500"],
              ["Tukar", "1 ribuan = 10 ratusan", "tetap"],
            ]}
            kaki="60.000 + 3.000 + 500 = 63.500. Dua cara, satu bilangan."
          />
        </div>
      ),
    },
    { kode: "b4", bagian: "Uang", judul: "Sembilan puluh tujuh ribu", halaman: "2", kuis: [idKuis("B", 2)], isi: <KuisSuara id={idKuis("B", 2)} pertanyaan="Berapa 9 lembar sepuluh ribuan, 7 lembar seribuan, dan 5 keping seratusan?" periksa={komposisi97500} petunjuk="Kalikan, lalu jumlahkan." benar="Sembilan puluh tujuh ribu lima ratus." /> },
    { kode: "b5", bagian: "Uang", judul: "Tiga dan empat", halaman: "2", kuis: [idKuis("B", 3)], isi: <TulisBebas id={idKuis("B", 3)} judul="Tiga dan empat" visual={<Papan anak="3 lembar sepuluh ribuan + 4 lembar seribuan" />} pertanyaan="Tulis jumlah uang itu." pesanSalah="Puluh ribuan dan ribuan saja. Rak lain nol." bantuan="30.000 + 4.000 = 34.000." umpan="34.000." periksa={tulis34000} alias={["34000", "34.000"]} konteks="3 lembar sepuluh ribuan dan 4 lembar seribuan adalah 34.000." /> },
    {
      kode: "uang-gambar",
      bagian: "Uang",
      judul: "Gambar uang Kiran",
      halaman: "3",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 3 · Gambar</p>
          <p className="text-sm font-semibold text-slate-700">Contoh gambar dari cerita dan tabel. Lembar besar, lembar sedang, lalu keping kecil.</p>
          <KepingUang />
          <GambarRak digit={["6", "3", "5", "0", "0"]} judul="63.500" />
        </div>
      ),
    },
    { kode: "c-susun", bagian: "Uang", judul: "Susun hasil", halaman: "3", kuis: [idKuis("B", 16)], isi: <SusunToken id={idKuis("B", 16)} perintah="Susun dari hasil yang paling kecil." acak={["2 × 10.000 + 4 × 1.000", "2 × 1.000 + 4 × 100", "2 × 10.000 + 4 × 100"]} benar={["2 × 1.000 + 4 × 100", "2 × 10.000 + 4 × 100", "2 × 10.000 + 4 × 1.000"]} umpan="2.400, lalu 20.400, lalu 24.000." /> },
    { kode: "c-benar", bagian: "Uang", judul: "Benar atau salah", halaman: "3", kuis: [idKuis("B", 17)], isi: <KuisBenarSalah id={idKuis("B", 17)} perintah="Pilih benar atau salah." baris={[{ teks: "4 lembar sepuluh ribuan dan 2 lembar seribuan sama dengan 42.000.", benar: true }, { teks: "8 keping seratusan sama dengan 8.000.", benar: false }, { teks: "7 lembar seribuan sama dengan 7.000.", benar: true }]} umpan="40.000 + 2.000 = 42.000. Delapan ratusan adalah 800, bukan 8.000. Tujuh ribuan adalah 7.000." /> },
    { kode: "c-cocok", bagian: "Uang", judul: "Pasangkan susunan", halaman: "3", kuis: [idKuis("B", 18)], isi: <KuisCocok id={idKuis("B", 18)} perintah="Pasangkan susunan dengan jumlahnya." baris={[{ kiri: "2 puluh ribuan + 8 ribuan + 3 ratusan", pilihan: SUSUN_C, benar: "28.300" }, { kiri: "4 puluh ribuan + 1 ribuan + 2 ratusan", pilihan: SUSUN_C, benar: "41.200" }, { kiri: "1 puluh ribuan + 5 ribuan + 5 puluhan", pilihan: SUSUN_C, benar: "15.050" }]} umpan="28.300, 41.200, dan 15.050." /> },
    {
      kode: "uang-lambang",
      bagian: "Uang",
      judul: "Lambang susun",
      halaman: "4",
      isi: (
        <div className="space-y-3">
          <p className="text-lg font-black text-[#1C01A5]">Halaman 4 · Lambang</p>
          <p className="text-sm font-semibold text-slate-700">Uang yang sama sekarang ditulis dengan tanda kali dan tambah.</p>
          <LambangSusun />
        </div>
      ),
    },
    { kode: "c-kali", bagian: "Uang", judul: "Jumlah kali rak", halaman: "4", kuis: [idKuis("B", 19)], isi: <Pilih id={idKuis("B", 19)} pertanyaan="5 × 10.000 + 2 × 1.000 + 4 × 100 ditulis..." pilihan={[{ huruf: "A", teks: "52.400" }, { huruf: "B", teks: "52.040" }, { huruf: "C", teks: "5.240" }, { huruf: "D", teks: "50.240" }]} benar="A" umpan="50.000 + 2.000 + 400 = 52.400." salah="Kalikan dulu, lalu jumlahkan." /> },
    { kode: "c-urai", bagian: "Uang", judul: "Urai 71.080", halaman: "4", kuis: [idKuis("B", 20)], isi: <Pilih id={idKuis("B", 20)} pertanyaan="71.080 diurai menurut raknya menjadi..." pilihan={[{ huruf: "A", teks: "70.000 + 1.000 + 80" }, { huruf: "B", teks: "70.000 + 1.000 + 800" }, { huruf: "C", teks: "7.000 + 100 + 80" }, { huruf: "D", teks: "71.000 + 800" }]} benar="A" umpan="71.080 = 70.000 + 1.000 + 80." salah="Letakkan 7 di puluh ribuan, 1 di ribuan, dan 8 di puluhan." /> },
    { kode: "c-tukar", bagian: "Uang", judul: "Cara lain", halaman: "4", kuis: [idKuis("B", 21)], isi: <Pilih id={idKuis("B", 21)} pertanyaan="Cara lain menulis 2 × 10.000 + 12 × 1.000 adalah..." pilihan={[{ huruf: "A", teks: "3 × 10.000 + 2 × 1.000" }, { huruf: "B", teks: "2 × 10.000 + 1 × 1.000" }, { huruf: "C", teks: "12 × 10.000 + 2 × 1.000" }, { huruf: "D", teks: "2 × 1.000 + 12 × 100" }]} benar="A" umpan="20.000 + 12.000 = 32.000. Itu sama dengan 30.000 + 2.000." salah="Dua belas ribuan = 1 puluh ribuan + 2 ribuan." /> },
    {
      kode: "tambah",
      bagian: "Hitung",
      judul: "Jumlah per rak",
      isi: (
        <LayarBab judul="Hitung dari kanan" jenis="hitung" kelas={kelas} kelamin={kelamin} penjelasan={["Penjumlahan dan pengurangan dapat dihitung per rak atau bersusun pendek.", "Perkalian dapat dipecah. Pembagian membagi rata."]}>
          <Dialog nama="Arun" anak="Ibu memberi 57.500. Ayah memberi 22.000. Aku jumlahkan per rak." />
          <Dialog nama="Mira" anak="50.000 + 20.000 = 70.000. 7.000 + 2.000 = 9.000. 500 tetap 500. Jumlahnya 79.500." />
          <TabelTambah />
        </LayarBab>
      ),
    },
    { kode: "a6", bagian: "Hitung", judul: "Tambah 32.500", kuis: [idKuis("A", 6)], isi: <KuisSuara id={idKuis("A", 6)} pertanyaan="Berapa 32.500 ditambah 13.250?" periksa={jumlah45750} petunjuk="Jumlahkan tiap rak dari kanan." benar="Empat puluh lima ribu tujuh ratus lima puluh." /> },
    { kode: "a7", bagian: "Hitung", judul: "Kurangi bersusun", kuis: [idKuis("A", 7)], isi: <TulisBebas id={idKuis("A", 7)} judul="Kurangi bersusun" visual={<Papan anak="67.987 − 13.453" />} pertanyaan="Tulis hasil pengurangan itu." pesanSalah="Kurangi tiap rak dari kanan." bantuan="Tidak ada rak yang perlu memberi 1. Hasilnya 54.534." umpan="54.534." periksa={kurang54534} alias={["54534", "54.534"]} konteks="67.987 − 13.453 = 54.534." /> },
    {
      kode: "kurang-kali",
      bagian: "Hitung",
      judul: "Sisa, kali, dan bagi",
      isi: (
        <div className="space-y-3">
          <Dialog nama="Igil" anak="Arun membawa 47.900 dan membayar 45.750. Sisa uangnya 2.150." />
          <TabelKurang />
          <Dialog nama="Mira" anak="12 angpau, masing-masing 5.000. Sepuluh kali 5.000 sama dengan 50.000. Dua kali 5.000 sama dengan 10.000. Jumlahnya 60.000." />
          <Dialog nama="Kiran" anak="64.000 dibagi rata kepada 4 anak. Setiap anak menerima 16.000." />
        </div>
      ),
    },
    {
      kode: "info-operasi",
      bagian: "Hitung",
      judul: "Infografis empat operasi",
      isi: (
        <div className="space-y-3">
          <Dialog nama="Igil" anak="Infografis ini mengingat empat hitungan yang baru selesai. Warung buah masih menanti." />
          <TabelInfoGrafis
            judul="Infografis: Empat operasi"
            kepala={["Operasi", "Hitungan", "Hasil"]}
            baris={[
              ["Tambah", "57.500 + 22.000", "79.500"],
              ["Kurang", "47.900 − 45.750", "2.150"],
              ["Kali", "12 × 5.000", "60.000"],
              ["Bagi", "64.000 ÷ 4", "16.000"],
            ]}
            kaki="Cek dengan operasi kebalikannya."
          />
        </div>
      ),
    },
    { kode: "b9", bagian: "Hitung", judul: "Pasangkan operasi", kuis: [idKuis("B", 7)], isi: <KuisCocok id={idKuis("B", 7)} perintah="Pasangkan operasi dengan hasilnya." baris={[{ kiri: "57.500 + 22.000", pilihan: HASIL_B, benar: "79.500" }, { kiri: "12 × 5.000", pilihan: HASIL_B, benar: "60.000" }, { kiri: "64.000 ÷ 4", pilihan: HASIL_B, benar: "16.000" }]} umpan="79.500, 60.000, dan 16.000." /> },
    { kode: "b7", bagian: "Hitung", judul: "Jumlah bersusun", kuis: [idKuis("B", 5)], isi: <TulisBebas id={idKuis("B", 5)} judul="Jumlah bersusun" visual={<Papan anak="76.598 + 12.456" />} pertanyaan="Tulis hasil penjumlahan itu." pesanSalah="Mulai dari satuan. Kalau jumlah rak 10 atau lebih, teruskan 1 ke kiri." bantuan="Satuan 14, teruskan 1. Puluhan 15, teruskan 1. Hasilnya 89.054." umpan="89.054." periksa={jumlah89054} alias={["89054", "89.054"]} konteks="76.598 + 12.456 = 89.054." /> },
    {
      kode: "warung",
      bagian: "Hitung",
      judul: "Warung buah",
      isi: (
        <div className="space-y-3">
          <Dialog nama="Mira" anak="Di warung dermaga ada buah naga 15.000, jeruk 17.000, mangga 23.500, alpukat 32.000, dan kelengkeng 34.000." />
          <Dialog nama="Arun" anak="Paket A berharga 27.500 untuk satu porsi. Paket B berharga 53.000 untuk dua porsi." />
        </div>
      ),
    },
    { kode: "b6", bagian: "Hitung", judul: "Dua kali 27.500", kuis: [idKuis("B", 4)], isi: <KuisSuara id={idKuis("B", 4)} pertanyaan="Berapa dua kali 27.500?" periksa={jumlah55000} petunjuk="27.500 + 27.500, atau 2 × 27.500." benar="Lima puluh lima ribu." /> },
    { kode: "b8", bagian: "Hitung", judul: "Sisa belanja", kuis: [idKuis("B", 6)], isi: <Pilih id={idKuis("B", 6)} pertanyaan="Seseorang membawa 100.000. Ia membeli dua bungkus 23.500 dan dua bungkus 15.000. Sisa uangnya..." pilihan={[{ huruf: "A", teks: "23.000" }, { huruf: "B", teks: "47.000" }, { huruf: "C", teks: "77.000" }, { huruf: "D", teks: "53.000" }]} benar="A" umpan="2 × 23.500 = 47.000. 2 × 15.000 = 30.000. 100.000 − 47.000 − 30.000 = 23.000." salah="Kalikan dulu, lalu kurangkan dari 100.000." /> },
    { kode: "b10", bagian: "Hitung", judul: "Urut harga buah", kuis: [idKuis("B", 8)], isi: <SusunToken id={idKuis("B", 8)} perintah="Susun harga buah dari yang paling murah." acak={["34.000", "15.000", "23.500", "32.000", "17.000"]} benar={["15.000", "17.000", "23.500", "32.000", "34.000"]} umpan="15.000, 17.000, 23.500, 32.000, 34.000." /> },
    { kode: "b11", bagian: "Hitung", judul: "Benar atau salah buah", kuis: [idKuis("B", 9)], isi: <KuisBenarSalah id={idKuis("B", 9)} perintah="Pilih benar atau salah." baris={[{ teks: "Kelengkeng 34.000 lebih mahal daripada alpukat 32.000.", benar: true }, { teks: "Tiga bungkus jeruk 17.000 sama dengan satu kelengkeng 34.000.", benar: false }, { teks: "Dua bungkus buah naga 15.000 lebih mahal daripada satu alpukat 32.000.", benar: false }]} umpan="Hanya pernyataan pertama yang benar. 3 × 17.000 = 51.000. 2 × 15.000 = 30.000." /> },
    { kode: "b12", bagian: "Hitung", judul: "Paket yang hemat", kuis: [idKuis("B", 10)], isi: <Pilih id={idKuis("B", 10)} pertanyaan="Untuk dua porsi yang sama, mana yang lebih hemat?" visual={<Papan anak="Paket A 27.500 · Paket B 53.000" />} pilihan={[{ huruf: "A", teks: "Paket B, hemat 2.000" }, { huruf: "B", teks: "Paket A, hemat 2.000" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "Paket B lebih mahal 2.000" }]} benar="A" umpan="Dua Paket A = 55.000. Paket B = 53.000. Paket B lebih hemat 2.000." salah="Bandingkan 2 × 27.500 dengan 53.000." /> },
  ];
  const evaluasi: LangkahQuest[] = Array.from({ length: 10 }, (_, nomor) => ({
    kode: `d${nomor}`,
    bagian: "Evaluasi",
    judul: `Soal ${nomor + 1}`,
    isi: <LembarEvaluasi nomor={nomor} kelas={kelas} kelamin={kelamin} />,
    kuis: [idKuis("D", nomor)],
  }));
  const sasaran = [
    { judul: TAB_A.kelompok, kuis: kuisTab(materi, "Sub-Bab A") },
    { judul: TAB_B.kelompok, kuis: kuisTab(materi, "Sub-Bab B") },
    { judul: TAB_C.kelompok, kuis: kuisTab(materi, "Sub-Bab C") },
    { judul: TAB_D.kelompok, kuis: kuisTab(materi, "Sub-Bab D") },
  ];
  const pembuka: LangkahQuest = {
    kode: "mulai",
    bagian: "Mulai",
    judul: "Dermaga Lentera",
    isi: (
      <div className="space-y-3">
        <KepalaKartu ikon="🏮🦉" judul="A. Dermaga Lentera" anak="Arun, Mira, Kiran, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
        <TargetPembelajaran sasaran={sasaran} />
      </div>
    ),
  };
  return denganTab([
    ...materi,
    {
      kode: "pola",
      bagian: "Pola",
      judul: "Sepuluh pos pola",
      kuis: kuisPola,
      isi: <KartuC kelas={kelas} kelamin={kelamin} />,
    },
    pembuka,
    {
      kode: "poin",
      bagian: "Poin",
      judul: "Poin penting",
      isi: (
        <div className="space-y-3">
          <GambarDermaga jenis="kartu" />
          <KartuPoinPenting
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanKalimat(["Lima rak dibaca dari kiri. Titik hanya pemisah ribuan.", "Bandingkan rak kiri dulu. Susun pecahan uang, lalu urai kembali.", "Jumlahkan dari kanan. Kali dapat dipecah. Bagi berarti dibagi rata."])}
            poin={[
              "Lima rak: puluh ribuan, ribuan, ratusan, puluhan, satuan. 14.500 dibaca empat belas ribu lima ratus. 66.500 dibaca enam puluh enam ribu lima ratus.",
              "100.000 dibaca seratus ribu. Titik pada 14.500 bukan koma desimal.",
              "56.560 lebih kecil daripada 57.000 karena rak ribuannya 6, bukan 7.",
              "6 lembar sepuluh ribuan, 3 lembar seribuan, dan 5 keping seratusan menjadi 63.500. Sepuluh ratusan dapat ditukar menjadi satu ribuan.",
              "57.500 + 22.000 = 79.500. Cara panjang dan cara bersusun pendek sama hasilnya.",
              "47.900 − 45.750 = 2.150. Rak yang memberi 1 menulis sisa di bawah angkanya.",
              "12 × 5.000 = 60.000. Sepuluh kali 5.000 adalah 50.000, dua kali 5.000 adalah 10.000.",
              "64.000 ÷ 4 = 16.000. Hasil bagi dapat dicek dengan perkalian.",
            ]}
            penutup="Baca dari kiri. Susun di rak. Bandingkan dari kiri. Hitung dari kanan."
          />
        </div>
      ),
    },
    {
      kode: "tanya",
      bagian: "Tanya",
      judul: "Ada yang ingin ditanya?",
      isi: <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>,
    },
    ...evaluasi,
  ]).map((item) => (item.tab === "Review" ? { ...item, bebas: true } : item));
}


function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB1.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🚢🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarDermaga jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB1} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB1} penutup="Lentera dermaga menyala. Igil menempelkan stempel tiket." bunga="🏮🎀🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ nomor, kelas, kelamin }: { nomor: number; kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB1.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Tiket Dermaga" : skor >= 6 ? "🏮 Penjaga Lentera" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Bilangan sampai 100.000 sudah rapi." : skor >= 6 ? "Bagus. Sedikit lagi jadi juru tiket." : "Ayo hitung lagi bersama Igil. Kamu pasti bisa.";
  const soal = [
        <TulisBebas key="d0" id={idKuis("D", 0)} judul="1. Susun uang" visual={<Papan anak="3 puluh ribuan · 7 ribuan · 10 ratusan" />} pertanyaan="Tulis jumlahnya. Sepuluh ratusan ditukar dulu." pesanSalah="10 ratusan menjadi 1 ribuan, lalu jumlahkan." bantuan="30.000 + 8.000 = 38.000." umpan="38.000." periksa={tulis38000} alias={["38000", "38.000"]} konteks="3 puluh ribuan, 7 ribuan, dan 10 ratusan menjadi 38.000." />,
        <Pilih key="d1" id={idKuis("D", 1)} pertanyaan="2. 47.900 − 32.500 = ..." pilihan={[{ huruf: "A", teks: "15.400" }, { huruf: "B", teks: "15.040" }, { huruf: "C", teks: "14.400" }, { huruf: "D", teks: "16.400" }]} benar="A" umpan="47.900 − 32.500 = 15.400." salah="Kurangi tiap rak dari kanan." />,
        <KuisSuara key="d2" id={idKuis("D", 2)} pertanyaan="3. Bacalah 16.667 dengan lengkap." periksa={baca16667} petunjuk="Enam belas ribu, lalu ratusan dan puluhannya." benar="Enam belas ribu enam ratus enam puluh tujuh." />,
        <Pilih key="d3" id={idKuis("D", 3)} pertanyaan="4. Setiap anak membeli jeruk 17.000 dan dua bungkus buah naga 15.000. Uang yang harus dibayar..." pilihan={[{ huruf: "A", teks: "50.000" }, { huruf: "B", teks: "64.000" }, { huruf: "C", teks: "47.000" }, { huruf: "D", teks: "23.000" }]} benar="C" umpan="17.000 + 30.000 = 47.000." salah="Dua bungkus 15.000 adalah 30.000. Tambahkan pada 17.000." />,
        <KuisCocok key="d4" id={idKuis("D", 4)} perintah="5. Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "13.354 + 13.578", pilihan: HASIL_D, benar: "26.932" }, { kiri: "75.360 − 65.750", pilihan: HASIL_D, benar: "9.610" }, { kiri: "15.000 × 2", pilihan: HASIL_D, benar: "30.000" }]} umpan="26.932, 9.610, dan 30.000." />,
        <TulisBebas key="d5" id={idKuis("D", 5)} judul="6. Selisih papan" visual={<Papan anak="75.360 − 56.560" />} pertanyaan="Tulis hasil pengurangan itu." pesanSalah="Kalau rak tidak cukup, ambil 1 dari rak di kirinya." bantuan="Hasilnya 18.800." umpan="18.800." periksa={kurang18800} alias={["18800", "18.800"]} konteks="75.360 − 56.560 = 18.800." />,
        <Pilih key="d6" id={idKuis("D", 6)} pertanyaan="7. 40.350 – 40.450 – 40.550 – ⬜. Berikutnya..." visual={<Papan anak="40.350 · 40.450 · 40.550 · ⬜" />} pilihan={[{ huruf: "A", teks: "40.560" }, { huruf: "B", teks: "40.650" }, { huruf: "C", teks: "40.750" }, { huruf: "D", teks: "41.550" }]} benar="B" umpan="Naik 100. 40.550 + 100 = 40.650." salah="Lihat selisih dua bilangan yang bersebelahan." />,
        <Pilih key="d7" id={idKuis("D", 7)} pertanyaan="8. Jumlah 2 lembar 20.000, 1 lembar 10.000, 1 lembar 5.000, dan 2 lembar 2.000 adalah..." pilihan={[{ huruf: "A", teks: "57.000" }, { huruf: "B", teks: "61.000" }, { huruf: "C", teks: "49.000" }, { huruf: "D", teks: "59.000" }]} benar="D" umpan="40.000 + 10.000 + 5.000 + 4.000 = 59.000." salah="Kalikan banyak lembar, lalu jumlahkan." />,
        <KuisSuara key="d8" id={idKuis("D", 8)} pertanyaan="9. Bacalah 25.786 dengan lengkap." periksa={baca25786} petunjuk="Dua puluh lima ribu, lalu ratusan dan puluhannya." benar="Dua puluh lima ribu tujuh ratus delapan puluh enam." />,
        <Pilih key="d9" id={idKuis("D", 9)} pertanyaan="10. Sepuluh keping seratusan sama dengan..." pilihan={[{ huruf: "A", teks: "100" }, { huruf: "B", teks: "1.000" }, { huruf: "C", teks: "10.000" }, { huruf: "D", teks: "10" }]} benar="B" umpan="10 × 100 = 1.000, yaitu satu lembar seribuan." salah="Sepuluh kali seratus." />,
  ];
  return (
    <div className="space-y-3">
      {nomor === 0 ? (
        <>
          <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
          <GambarDermaga jenis="meja" />
        </>
      ) : null}
      {soal[nomor]}
      {nomor === 9 ? <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan} · {skor} bintang dari 10</p> : null}
    </div>
  );
}

export default function NaskahMtk5Bab1({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahDermaga(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-5-bab1-v5"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "tanya" }}
    />
  );
}
