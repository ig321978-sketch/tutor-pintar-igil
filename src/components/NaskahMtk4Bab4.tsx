"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import PetaContoh from "@/components/PetaContoh";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK4_BAB4, TEMA_MTK4_BAB4 } from "@/lib/misi-mtk-4-bab4";
import { MODUL_MTK4_BAB4 } from "@/lib/modul-resmi-mtk-4-bab4";
import {
  literEmpat,
  literSatu,
  luasDelapan,
  luasDuaBelas,
  luasDuaPuluhSatu,
  luasSepuluhRibu,
  volumeSembilan,
} from "@/lib/nilai-mtk-4-bab4";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB4.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Nisa: "border-teal-300 bg-teal-50",
  Farhan: "border-orange-300 bg-orange-50",
  Cinta: "border-violet-300 bg-violet-50",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nisa: "👧",
  Farhan: "👦",
  Cinta: "👧",
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

function Adegan({
  judul,
  src,
  alt,
  kelas,
  kelamin,
  penjelasan,
  children,
  utama = true,
}: {
  judul: string;
  utama?: boolean;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className={utama ? "space-y-4 border-b-4 border-[#1C01A5] pb-8" : "space-y-3"}>
      <p className={utama ? "text-xl font-black leading-snug text-[#1C01A5]" : "text-xs font-black uppercase tracking-wide text-[#1C01A5]"}>{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan gambarnya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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
      } catch { setStatus(null); setCuplikan("Gagal menilai. Kirim lagi."); }
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

function SusunToken({ id, perintah, acak, benar, umpan }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string }) {
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat baris dan kolomnya, lalu susun ulang." />
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
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>{nilai ? "Benar" : "Salah"}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pernyataan</button>
      <HasilJawabanKuis status={status} pesanSalah="Cek satuan dan hitungannya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function Petak({ baris, kolom }: { baris: number; kolom: number }) {
  return (
    <div className="mx-auto grid w-fit gap-1" style={{ gridTemplateColumns: `repeat(${kolom}, 1.75rem)` }} aria-hidden>
      {Array.from({ length: baris * kolom }, (_, indeks) => (
        <span key={indeks} className="h-7 w-7 rounded-md bg-sky-400" />
      ))}
    </div>
  );
}

const SATUAN_A = ["Luas tidak baku", "Luas baku", "Volume tidak baku"];
const JENIS_B = ["Luas", "Volume baku", "Volume tidak baku"];
const HASIL_D = ["24 cm²", "2 liter", "12 cm³"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB4.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🫙👧👦🦉" judul="A. Toko Toples" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Mengukur luas dengan satuan tidak baku dan satuan baku.", "Menduga luas dengan satuan tidak baku dan satuan baku.", "Mengukur volume dengan satuan tidak baku dan satuan baku.", "Menduga volume dengan satuan tidak baku dan satuan baku."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab A — Luas dengan satuan tidak baku" src="/doodle-mtk/mtk-4-bab4-sub1.jpg" alt="Meja toko ditutup kartu persegi yang sama besar. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Luas adalah banyak satuan yang menutup permukaan tanpa celah. Uang kertas dan kertas origami adalah satuan tidak baku."]}>
          <Dialog nama="Nisa" anak="Meja lipat kecil tertutup 8 uang kertas." />
          <Dialog nama="Farhan" anak="Meja guru tertutup 21 uang kertas." />
          <Dialog nama="Cinta" anak="Origami lebih luas. Meja kecil cukup 4. Meja guru cukup 12." />
          <Dialog nama="Igil" anak="Mejanya sama. Hitungannya beda karena satuannya beda." />
          <Papan anak="Meja kecil: 8 uang kertas  atau  4 origami" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Tutup tanpa celah</p>
          <PetaContoh pusat="Tanpa celah" cabang={[{ ikon: "💵", judul: "Uang kertas", isi: "meja kecil 8" }, { ikon: "📄", judul: "Origami", isi: "meja kecil 4" }, { ikon: "🪑", judul: "Meja guru", isi: "21 atau 12" }]} kolom={["Meja", "Uang", "Origami"]} baris={[["Lipat kecil", "8", "4"], ["Guru", "21", "12"]]} />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Meja guru ditutup uang kertas tanpa celah. Berapa uang kertas yang menutupnya?" periksa={luasDuaPuluhSatu} petunjuk="Lihat hitungan uang kertas pada meja guru." benar="21 uang kertas." />
          <TulisBebas id={idKuis("A", 1)} judul="Origami meja kecil" visual={<Papan anak="meja lipat kecil = ⬜ origami" />} pertanyaan="Tulis banyak kertas origami yang menutup meja lipat kecil." pesanSalah="Origami lebih luas daripada uang kertas." bantuan="Meja kecil tertutup 4 origami." umpan="4 origami." periksa={literEmpat} alias={["4"]} konteks="Meja lipat kecil tertutup 4 kertas origami." />
        </Adegan>
        <Adegan utama judul="Sub-bab A — Luas dengan satuan baku" src="/doodle-mtk/mtk-4-bab4-sub2.jpg" alt="Lantai ubin persegi dan penggaris kosong tanpa angka. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan baku luas antara lain cm² dan m². Satu persegi 1 cm kali 1 cm sama dengan 1 cm²."]}>
          <Dialog nama="Igil" anak="Persegi 1 cm kali 1 cm luasnya 1 cm²." />
          <Dialog nama="Cinta" anak="Bangun yang diarsir ini luasnya 12 cm²." />
          <Dialog nama="Nisa" anak="Dua bangun lain sama-sama 13 cm²." />
          <Dialog nama="Farhan" anak="1 m² sama dengan 10.000 cm². Kali 100 kali 100, bukan kali 100." />
          <Papan anak="1 m² = 100 × 100 = 10.000 cm²" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Satuan baku luas</p>
          <PetaContoh pusat="10.000" cabang={[{ ikon: "📏", judul: "Satu cm", isi: "1 cm × 1 cm" }, { ikon: "🟦", judul: "Satu cm²", isi: "satuan baku" }, { ikon: "✨", judul: "Satu m²", isi: "10.000 cm²" }]} kolom={["Ukuran", "Luas"]} baris={[["1 cm × 1 cm", "1 cm²"], ["Bangun diarsir", "12 cm²"], ["1 m²", "10.000 cm²"]]} />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="1 m² sama dengan berapa cm²? Sebutkan angkanya." periksa={luasSepuluhRibu} petunjuk="Satu sisi 1 m sama dengan 100 cm." benar="10.000 cm²." />
          <TulisBebas id={idKuis("A", 3)} judul="Bangun diarsir" visual={<Petak baris={3} kolom={4} />} pertanyaan="Tulis luas bangun yang diarsir dalam cm²." pesanSalah="Hitung petak 1 cm yang menutup bangun." bantuan="3 baris × 4 kolom = 12." umpan="12 cm²." periksa={luasDuaBelas} alias={["12"]} konteks="3 baris kali 4 kolom sama dengan 12 cm²." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Volume dengan satuan tidak baku" src="/doodle-mtk/mtk-4-bab4-sub3.jpg" alt="Toples diisi kubus kayu. Ada ciduk besar dan ciduk kecil. Burung hantu bertopi biru di toko." kelas={kelas} kelamin={kelamin} penjelasan={["Volume adalah banyak satuan yang mengisi ruang. Botol sabun yang ukurannya beda adalah satuan tidak baku."]}>
          <Dialog nama="Farhan" anak="Botol sabun A penuh oleh 4 botol sabun B." />
          <Dialog nama="Nisa" anak="Botol A yang sama penuh oleh 10 botol sabun C." />
          <Dialog nama="Cinta" anak="B dan C beda ukuran, jadi hitungannya beda." />
          <Dialog nama="Igil" anak="Botol besar hand sanitizer sama dengan 8 botol kecil." />
          <Papan anak="Botol A = 4 botol B    atau    10 botol C" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Satuan beda</p>
          <PetaContoh pusat="Isi sama" cabang={[{ ikon: "🧴", judul: "Botol B", isi: "4 mengisi A" }, { ikon: "💧", judul: "Botol C", isi: "10 mengisi A" }, { ikon: "🫙", judul: "Botol besar", isi: "8 botol kecil" }]} kolom={["Satuan", "Hitungan"]} baris={[["Botol B", "4"], ["Botol C", "10"], ["Botol kecil", "8"]]} />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Botol sabun A sama dengan berapa botol sabun B? Sebutkan angkanya." periksa={literEmpat} petunjuk="Lihat berapa botol B yang mengisi botol A." benar="4 botol B." />
          <TulisBebas id={idKuis("A", 5)} judul="Botol kecil" visual={<Papan anak="1 botol besar = ⬜ botol kecil" />} pertanyaan="Tulis banyak botol kecil yang sama dengan satu botol besar." pesanSalah="Satu botol besar diisi beberapa botol kecil." bantuan="Botol besar sama dengan 8 botol kecil." umpan="8 botol kecil." periksa={luasDelapan} alias={["8"]} konteks="Satu botol besar sama dengan 8 botol kecil." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Volume dengan satuan baku" src="/doodle-mtk/mtk-4-bab4-sub4.jpg" alt="Teko ukur kosong dan tumpukan kubus. Burung hantu bertopi biru bersama tiga anak di toko toples." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan baku volume antara lain mililiter, liter, dan cm³. 1.000 ml sama dengan 1 liter. Satu kubus 1 cm adalah 1 cm³."]}>
          <Dialog nama="Cinta" anak="Air mineral 1 liter. Jus 256 ml. Susu UHT 1.000 ml." />
          <Dialog nama="Igil" anak="1.000 ml sama dengan 1 liter. Satu cm³ sama dengan 1 ml." />
          <Dialog nama="Nisa" anak="Sendok 5 ml. Cangkir 240 ml. Botol minuman 330 ml." />
          <Dialog nama="Farhan" anak="Kubus satuan: A 9, B 8, C 12, D 18 cm³." />
          <Papan anak="1 liter = 1.000 ml    ·    1 cm³ = 1 ml" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Liter dan kubus</p>
          <PetaContoh pusat="1.000 ml" cabang={[{ ikon: "🫙", judul: "Satu liter", isi: "1.000 ml" }, { ikon: "🥛", judul: "Tiga susu", isi: "1.450 ml" }, { ikon: "📦", judul: "Bangun A", isi: "9 cm³" }]} kolom={["Benda", "Volume"]} baris={[["Air mineral", "1 liter"], ["Susu UHT", "1.000 ml"], ["Kubus A", "9 cm³"]]} />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Kotak susu UHT berisi 1.000 ml. Berapa liter isinya?" periksa={literSatu} petunjuk="1.000 ml sama dengan 1 liter." benar="1 liter." />
          <TulisBebas id={idKuis("A", 7)} judul="Bangun A" visual={<Papan anak="3 baris × 3 kubus" />} pertanyaan="Tulis volume bangun A dalam cm³." pesanSalah="Hitung kubus satuan pada bangun A." bantuan="3 × 3 = 9." umpan="9 cm³." periksa={volumeSembilan} alias={["9"]} konteks="3 baris kali 3 kubus sama dengan 9 cm³." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Meja lipat kecil ditutup kertas origami. Luasnya..." visual={<Papan anak="meja kecil · origami" />} pilihan={[{ huruf: "A", teks: "8 satuan" }, { huruf: "B", teks: "4 satuan" }, { huruf: "C", teks: "21 satuan" }, { huruf: "D", teks: "12 satuan" }]} benar="B" umpan="Meja kecil tertutup 4 origami." salah="Origami lebih luas, jadi hitungannya lebih sedikit." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan alat dengan jenis satuannya." baris={[{ kiri: "Uang kertas", pilihan: SATUAN_A, benar: "Luas tidak baku" }, { kiri: "cm²", pilihan: SATUAN_A, benar: "Luas baku" }, { kiri: "Botol sabun", pilihan: SATUAN_A, benar: "Volume tidak baku" }]} umpan="Uang kertas untuk luas tidak baku. cm² untuk luas baku. Botol sabun untuk volume tidak baku." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun satuan luas dari yang paling kecil." acak={["12", "4", "21", "8"]} benar={["4", "8", "12", "21"]} umpan="4, 8, 12, 21." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Menutup tanpa celah adalah mengukur luas.", benar: true }, { teks: "1 m² sama dengan 100 cm².", benar: false }, { teks: "1 liter sama dengan 1.000 ml.", benar: true }]} umpan="Yang pertama dan ketiga benar. 1 m² sama dengan 10.000 cm²." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Satuan baku untuk luas tutup toples adalah..." pilihan={[{ huruf: "A", teks: "Uang kertas" }, { huruf: "B", teks: "cm²" }, { huruf: "C", teks: "Origami" }, { huruf: "D", teks: "Botol sabun" }]} benar="B" umpan="cm² adalah satuan baku luas." salah="Uang kertas, origami, dan botol sabun satuan tidak baku." />
        <Pilih id={idKuis("A", 13)} pertanyaan="Botol air mineral kira-kira 1 liter. Perkiraan paling masuk akal..." pilihan={[{ huruf: "A", teks: "10 ml" }, { huruf: "B", teks: "1.000 ml" }, { huruf: "C", teks: "100 liter" }, { huruf: "D", teks: "10.000 ml" }]} benar="B" umpan="1 liter sama dengan 1.000 ml." salah="Pilih yang sama dengan 1 liter." />
        <Pilih id={idKuis("B", 0)} pertanyaan="Bangun (i) luasnya 13 cm². Bangun (ii) yang sama luasnya..." visual={<Papan anak="bangun (i) = bangun (ii)" />} pilihan={[{ huruf: "A", teks: "9 cm²" }, { huruf: "B", teks: "13 cm²" }, { huruf: "C", teks: "4 cm²" }, { huruf: "D", teks: "21 cm²" }]} benar="B" umpan="Kedua bangun sama-sama 13 cm²." salah="Bangun yang sisinya 1 cm itu luasnya sama." />
        <KuisCocok id={idKuis("B", 1)} perintah="Pasangkan ukuran dengan jenisnya." baris={[{ kiri: "12 cm²", pilihan: JENIS_B, benar: "Luas" }, { kiri: "1 liter", pilihan: JENIS_B, benar: "Volume baku" }, { kiri: "8 botol kecil", pilihan: JENIS_B, benar: "Volume tidak baku" }]} umpan="12 cm² luas. 1 liter volume baku. 8 botol kecil volume tidak baku." />
        <SusunToken id={idKuis("B", 2)} perintah="Susun volume dari yang paling kecil." acak={["330 ml", "5 ml", "1.000 ml", "240 ml"]} benar={["5 ml", "240 ml", "330 ml", "1.000 ml"]} umpan="5 ml, 240 ml, 330 ml, 1.000 ml." />
        <KuisBenarSalah id={idKuis("B", 3)} perintah="Pilih benar atau salah." baris={[{ teks: "1 m² sama dengan 10.000 cm².", benar: true }, { teks: "m² ke cm² cukup dikali 100.", benar: false }, { teks: "Botol A sama dengan 4 botol B.", benar: true }]} umpan="Yang pertama dan ketiga benar. m² ke cm² dikali 100 × 100." />
        <Pilih id={idKuis("B", 4)} pertanyaan="Tiga kotak susu: 250 ml, 200 ml, dan 1.000 ml. Jumlahnya..." pilihan={[{ huruf: "A", teks: "1.250 ml" }, { huruf: "B", teks: "1.450 ml" }, { huruf: "C", teks: "1.000 ml" }, { huruf: "D", teks: "450 ml" }]} benar="B" umpan="250 + 200 + 1.000 = 1.450 ml." salah="Jumlahkan ketiga kotak susu." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB4.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🫙🦉" judul={kartu.judul} anak="Sepuluh pos toko" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab4-permainan.jpg" alt="Sepuluh toples kosong berjajar. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal tutup dan isi. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB4} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB4} penutup="Toko sepi. Igil menempelkan stempel toples." bunga="🫙🟦🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB4.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Toko Toples" : skor >= 6 ? "🫙 Penjaga Tutup" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Tutup dan isinya tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru toko." : "Ayo ukur tutup dan isinya lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab4-evaluasi.jpg" alt="Meja toko dengan kertas kosong dan toples. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Bangun diarsir" visual={<Petak baris={3} kolom={4} />} pertanyaan="Tulis luasnya dalam cm²." pesanSalah="Hitung petak 1 cm, lalu kalikan baris dengan kolom." bantuan="3 × 4 = 12." umpan="12 cm²." periksa={luasDuaBelas} alias={["12"]} konteks="3 baris kali 4 kolom sama dengan 12 cm²." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Meja lipat kecil ditutup 8 uang kertas atau 4 origami. Mana hitungannya lebih banyak?" pilihan={[{ huruf: "A", teks: "Origami" }, { huruf: "B", teks: "Uang kertas" }, { huruf: "C", teks: "Sama banyak" }, { huruf: "D", teks: "Penggaris" }]} benar="B" umpan="Uang kertas lebih kecil, jadi jumlahnya lebih banyak." salah="Satuan yang lebih kecil biasanya butuh lebih banyak." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Susu UHT berisi 1.000 ml. Berapa liter isinya?" periksa={literSatu} petunjuk="1.000 ml sama dengan 1 liter." benar="1 liter." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Kubus satuan tersusun 3 × 3 × 2. Volumenya..." visual={<Papan anak="3 × 3 × 2" />} pilihan={[{ huruf: "A", teks: "9 cm³" }, { huruf: "B", teks: "18 cm³" }, { huruf: "C", teks: "12 cm³" }, { huruf: "D", teks: "8 cm³" }]} benar="B" umpan="3 × 3 × 2 = 18. Volumenya 18 cm³." salah="Kalikan ketiga ukurannya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "6 × 4 petak", pilihan: HASIL_D, benar: "24 cm²" }, { kiri: "2.000 ml", pilihan: HASIL_D, benar: "2 liter" }, { kiri: "3 × 2 × 2 kubus", pilihan: HASIL_D, benar: "12 cm³" }]} umpan="24 cm², 2 liter, dan 12 cm³." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Satu meter" visual={<Papan anak="1 m² = ⬜ cm²" />} pertanyaan="Tulis 1 m² dalam cm²." pesanSalah="Satu sisi 1 m sama dengan 100 cm." bantuan="100 × 100 = 10.000." umpan="10.000 cm²." periksa={luasSepuluhRibu} alias={["10000"]} konteks="1 meter persegi sama dengan 10.000 cm²." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Meja lipat kecil perlu 8 uang kertas. Satuan diganti yang luasnya dua kali. Kira-kira perlu..." visual={<Papan anak="8 uang kertas  →  dua kali lebih luas" />} pilihan={[{ huruf: "A", teks: "8 satuan" }, { huruf: "B", teks: "16 satuan" }, { huruf: "C", teks: "4 satuan" }, { huruf: "D", teks: "2 satuan" }]} benar="C" umpan="Satuan dua kali lebih luas, jumlahnya kira-kira setengah. 8 ÷ 2 = 4." salah="Satuan lebih besar, hitungannya lebih sedikit." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. 1 liter 500 ml sama dengan..." pilihan={[{ huruf: "A", teks: "150 ml" }, { huruf: "B", teks: "1.500 ml" }, { huruf: "C", teks: "15.000 ml" }, { huruf: "D", teks: "501 ml" }]} benar="B" umpan="1 liter = 1.000 ml. 1.000 + 500 = 1.500 ml." salah="Ubah 1 liter menjadi 1.000 ml, lalu tambahkan 500." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Botol sabun A sama dengan berapa botol sabun B? Sebutkan angkanya." periksa={literEmpat} petunjuk="Botol A penuh oleh beberapa botol B." benar="4 botol B." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Empat botol B dan empat botol C. Jumlah botol sama. Volume yang lebih besar..." pilihan={[{ huruf: "A", teks: "Botol C" }, { huruf: "B", teks: "Botol B" }, { huruf: "C", teks: "Sama saja" }, { huruf: "D", teks: "Tidak ada isi" }]} benar="B" umpan="Jumlahnya sama, tetapi botol B lebih besar. Volumenya lebih besar." salah="Bandingkan ukuran satu botol, bukan hanya jumlahnya." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab4({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab4-poin.jpg", alt: "Igil dan tiga anak di toko toples memegang kartu kosong dan toples." }}
        cuplikan={cuplikanKalimat(["Luas menutup permukaan tanpa celah. Volume mengisi ruang.", "Satuan beda membuat hitungan beda. 1 m² sama dengan 10.000 cm².", "1.000 ml sama dengan 1 liter. Satu cm³ sama dengan 1 ml."])}
        poin={["Meja lipat kecil: 8 uang kertas atau 4 origami. Meja guru: 21 atau 12.", "1 cm × 1 cm = 1 cm². 1 m² = 10.000 cm², karena 100 × 100.", "Botol A = 4 botol B atau 10 botol C. Botol besar = 8 botol kecil.", "1 liter = 1.000 ml. Air mineral 1 liter. Susu UHT 1.000 ml.", "Kubus satuan: A 9 cm³, B 8 cm³, C 12 cm³, D 18 cm³."]}
        penutup="Lihat dulu, ini menutup permukaan atau mengisi ruang."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
