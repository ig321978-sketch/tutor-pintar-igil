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
import { MISI_MTK4_BAB6, TEMA_MTK4_BAB6 } from "@/lib/misi-mtk-4-bab6";
import { MODUL_MTK4_BAB6 } from "@/lib/modul-resmi-mtk-4-bab6";
import {
  jumlahDuaPuluhLima,
  jumlahEmpatBelas,
  jumlahEmpatPuluhLima,
  jumlahEnam,
  jumlahLima,
  jumlahLimaBelas,
  jumlahNol,
  jumlahSembilan,
  jumlahTigaPuluh,
  jumlahTigaPuluhLima,
  kataKomputer,
} from "@/lib/nilai-mtk-4-bab6";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB6.id;

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
  Raka: "border-teal-300 bg-teal-50",
  Sinta: "border-orange-300 bg-orange-50",
  "Merpati Piko": "border-violet-300 bg-violet-50",
  "Reporter IGIL": "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Raka: "👦",
  Sinta: "👧",
  "Merpati Piko": "🕊️",
  "Reporter IGIL": "🦉",
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan datanya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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
      <HasilJawabanKuis status={status} pesanSalah="Susun lagi sesuai perintah." />
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
      <HasilJawabanKuis status={status} pesanSalah="Baca kuncinya dulu, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function DiagramTegak({ data, max = 30 }: { data: { nama: string; nilai: number; warna: string }[]; max?: number }) {
  return (
    <div className="flex h-44 items-end justify-center gap-3">
      {data.map((item) => (
        <div key={item.nama} className="flex w-14 flex-col items-center gap-1">
          <p className="text-xs font-black text-[#1C01A5]">{item.nilai}</p>
          <div className="flex h-32 w-10 items-end rounded-md bg-sky-50 ring-1 ring-sky-200">
            <div className={`w-full rounded-t-md ${item.warna}`} style={{ height: `${(item.nilai / max) * 100}%` }} />
          </div>
          <p className="text-center text-[11px] font-black leading-tight text-slate-700">{item.nama}</p>
        </div>
      ))}
    </div>
  );
}

function TarikBatang({ id, perintah, target, umpan }: { id: string; perintah: string; target: number; umpan: string }) {
  const kuis = useKuisMateri();
  const [nilai, setNilai] = useState(5);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const tepat = nilai === target;
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <div className="mx-auto mt-3 flex h-40 w-16 items-end rounded-lg bg-white ring-2 ring-amber-200">
        <div className="w-full rounded-t-md bg-amber-500 transition-all" style={{ height: `${(nilai / 50) * 100}%` }} />
      </div>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{nilai}</p>
      <input className="mt-1 h-12 w-full accent-[#1C01A5]" type="range" min={0} max={50} step={5} value={nilai} onChange={(e) => { setNilai(Number(e.target.value)); setStatus(null); }} />
      <button type="button" onClick={periksa} className="mt-3 rounded-full bg-amber-600 px-4 py-2 text-sm font-black text-white">Periksa tinggi</button>
      <HasilJawabanKuis status={status} pesanSalah="Tarik sampai ujung batang sejajar 35." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const BUAH_B = ["30", "45", "25"];
const NILAI_D = ["12 siswa", "8 siswa", "30 siswa"];
const EKSKUL = [
  { nama: "Futsal", nilai: 25, warna: "bg-sky-500" },
  { nama: "Tari", nilai: 15, warna: "bg-rose-500" },
  { nama: "Komputer", nilai: 20, warna: "bg-emerald-500" },
  { nama: "Lukis", nilai: 10, warna: "bg-amber-400" },
];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🎤🦉" judul="A. Naskah Bergambar" anak="Raka, Sinta, Merpati Piko, dan Reporter IGIL" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Menampilkan data dalam bentuk piktogram.", "Menafsirkan data dari piktogram.", "Menampilkan data dalam bentuk diagram batang.", "Menafsirkan data dari diagram batang."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab A — Piktogram berskala" src="/doodle-mtk/mtk-4-bab6-sub1.jpg" alt="Tiga anak dan burung hantu bertopi biru menyusun gambar mangga di lapak." kelas={kelas} kelamin={kelamin} penjelasan={["Halo jurnalis cilik! Bersama Reporter IGIL, kita menyajikan berita memakai piktogram.", "Satu gambar bisa mewakili lebih dari satu benda. Baca keterangan di bawah tabel dulu."]}>
          <Papan anak={"Buku dari perpustakaan\nSenin 📘📘📘📘\nSelasa 📘📘📘\nRabu 📘📘📘📘📘\n1 📘 = 5 siswa"} />
          <Dialog nama="Raka" anak="Lihat papan ini. Senin cuma ada 4 gambar buku. Berarti yang mengambil buku hari Senin cuma 4 siswa ya?" />
          <Dialog nama="Sinta" anak="Baca dulu kotak keterangan di bawah tabel. Satu gambar buku mewakili 5 siswa." />
          <Dialog nama="Reporter IGIL" anak="Tepat, Sinta. Senin ada 4 gambar. Setiap gambar bernilai 5. Jadi 4 × 5 = 20 siswa." />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Satu gambar buku mewakili 5 siswa. Selasa ada 3 gambar. Berapa siswa yang mengambil buku hari Selasa?" periksa={jumlahLimaBelas} petunjuk="Kalikan 3 dengan 5." benar="15 siswa." />
          <TulisBebas id={idKuis("A", 1)} judul="Hari Kamis" visual={<Papan anak="Kamis: 30 siswa · 1 📘 = 5" />} pertanyaan="Jika Kamis ada 30 siswa, berapa gambar buku yang dipasang? Hitung 30 dibagi 5, lalu tulis angkanya." pesanSalah="Bagi 30 dengan nilai 1 gambar." bantuan="30 dibagi 5 sama dengan 6." umpan="6 gambar." periksa={jumlahEnam} alias={["6"]} konteks="Tiga puluh dibagi lima sama dengan 6 gambar." />
        </Adegan>
        <Adegan utama judul="Sub-bab B — Diagram batang" src="/doodle-mtk/mtk-4-bab6-sub2.jpg" alt="Papan gambar mangga di lapak. Burung hantu bertopi biru menunjuk kuncinya." kelas={kelas} kelamin={kelamin} penjelasan={["Selain piktogram, jurnalis juga memakai diagram batang.", "Ada sumbu kategori dan sumbu skala. Tinggi atau panjang batang menunjukkan banyak datanya."]}>
          <DiagramTegak data={EKSKUL} max={30} />
          <Dialog nama="Merpati Piko" anak="Kurr! Tarik jari dari ujung atas batang ke garis angka di kiri." />
          <Dialog nama="Raka" anak="Batang Futsal paling tinggi, ujungnya di 25. Lukis paling rendah di 10." />
          <Dialog nama="Reporter IGIL" anak="Hebat. Batang juga bisa diputar jadi mendatar, nilainya tetap. Selisih Futsal 25 dan Lukis 10 adalah 15 siswa." />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Lihat diagram batang. Ekstrakurikuler manakah yang diikuti tepat 20 siswa? Sebutkan namanya." periksa={kataKomputer} petunjuk="Cari batang yang ujungnya di 20." benar="Komputer." />
          <TulisBebas id={idKuis("A", 3)} judul="Selisih dua batang" visual={<Papan anak="Komputer 20 − Tari 15 = ?" />} pertanyaan="Berapa selisih peminat Komputer dan Tari? Tulis angkanya." pesanSalah="Kurangkan 20 dengan 15." bantuan="20 dikurangi 15 sama dengan 5." umpan="5 siswa." periksa={jumlahLima} alias={["5"]} konteks="Dua puluh dikurangi lima belas sama dengan 5." />
        </Adegan>
        <Pilih id={idKuis("A", 4)} pertanyaan="Piktogram jus menampilkan 4 gambar gelas. Satu gambar = 10 gelas. Jumlah jus mangga..." visual={<Papan anak="🍹🍹🍹🍹 · 1 🍹 = 10" />} pilihan={[{ huruf: "A", teks: "4 gelas" }, { huruf: "B", teks: "14 gelas" }, { huruf: "C", teks: "40 gelas" }, { huruf: "D", teks: "10 gelas" }]} benar="C" umpan="4 × 10 = 40 gelas." salah="Kalikan banyak gambar dengan kuncinya." />
        <KuisCocok id={idKuis("A", 5)} perintah="Pasangkan buah dengan angka di ujung batangnya." baris={[{ kiri: "Apel", pilihan: BUAH_B, benar: "30" }, { kiri: "Jeruk", pilihan: BUAH_B, benar: "45" }, { kiri: "Anggur", pilihan: BUAH_B, benar: "25" }]} umpan="Apel 30, jeruk 45, anggur 25." />
        <KuisBenarSalah id={idKuis("A", 6)} perintah="Pilih benar atau salah." baris={[{ teks: "Satu gambar mobil = 4 mobil. Untuk 12 mobil, Raka menggambar 12 gambar mobil.", benar: false }]} umpan="Salah. 12 dibagi 4 sama dengan 3 gambar." />
        <TarikBatang id={idKuis("A", 7)} perintah="Panen jagung 35 ton. Tarik ujung batang Jagung sampai sejajar garis 35." target={35} umpan="Batang berhenti di 35." />
        <SusunToken id={idKuis("A", 8)} perintah="Susun kota dari yang paling besar ke yang paling kecil. Kota A 40, Kota B 20, Kota C 50, Kota D 30." acak={["Kota A", "Kota B", "Kota C", "Kota D"]} benar={["Kota C", "Kota A", "Kota D", "Kota B"]} umpan="C 50, A 40, D 30, lalu B 20." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📊🔑" judul="B. Infografis" anak="Rumus piktogram dan anatomi batang" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Infografis: Rumus piktogram berskala" src="/doodle-mtk/mtk-4-bab6-sub3.jpg" alt="Diagram batang kosong di lapak mangga. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Ingat kunci piktogram kelas 4: baca nilai skala pada keterangannya.", "Kalikan jumlah gambar dengan nilai 1 gambar untuk tahu jumlah sebenarnya."]}>
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Kali dengan skala</p>
          <PetaContoh pusat="Gambar × kunci" cabang={[{ ikon: "🔑", judul: "Rumus", isi: "banyak × nilai 1 gambar" }, { ikon: "🍎", judul: "3 utuh", isi: "3 × 4 = 12" }, { ikon: "🌗", judul: "Setengah", isi: "setengah dari 4 = 2" }]} kolom={["Gambar", "Hitung"]} baris={[["3 utuh", "12 apel"], ["1 setengah", "2 apel"], ["Jumlah", "14 apel"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Jika 1 gambar lingkaran penuh mewakili 10 orang, maka setengah gambar lingkaran mewakili berapa orang?" periksa={jumlahLima} petunjuk="Ambil setengah dari 10." benar="5 orang." />
          <TulisBebas id={idKuis("B", 1)} judul="Tujuh bola" visual={<Papan anak="⚽⚽⚽⚽⚽⚽⚽ · 1 ⚽ = 2" />} pertanyaan="Jika 1 gambar bola mewakili 2 bola, dan ada 7 gambar, berapa jumlah bola sebenarnya? Tulis angkanya." pesanSalah="Kalikan 7 dengan 2." bantuan="7 kali 2 sama dengan 14." umpan="14 bola." periksa={jumlahEmpatBelas} alias={["14"]} konteks="Tujuh kali dua sama dengan 14 bola." />
        </Adegan>
        <Adegan utama judul="Infografis: Anatomi diagram batang" src="/doodle-mtk/mtk-4-bab6-sub4.jpg" alt="Dua batang yang tingginya berbeda di lapak mangga. Burung hantu bertopi biru membandingkannya." kelas={kelas} kelamin={kelamin} penjelasan={["Saat membaca atau menggambar diagram batang, jarak antar-angka pada garis skala selalu tetap.", "Lompat 2, lompat 5, atau lompat 10. Jangan campur."]}>
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Tiga bagian batang</p>
          <PetaContoh pusat="Diagram batang" cabang={[{ ikon: "🏷️", judul: "Judul", isi: "paling atas" }, { ikon: "📛", judul: "Kategori", isi: "jarak batang sama" }, { ikon: "0️⃣", judul: "Skala", isi: "mulai dari 0" }]} kolom={["Bagian", "Isi"]} baris={[["Judul", "nama data"], ["Sumbu kategori", "nama benda"], ["Sumbu skala", "0, 5, 10, 15"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Garis angka pada sumbu skala diagram batang harus selalu dimulai dari angka berapa?" periksa={jumlahNol} petunjuk="Itu angka paling bawah pada skala." benar="Nol." />
          <TulisBebas id={idKuis("B", 3)} judul="Tengah dua garis" visual={<Papan anak="20 · ? · 30" />} pertanyaan="Ujung sebuah batang berhenti tepat di tengah antara garis 20 dan 30. Berapa nilai batang itu? Tulis angkanya." pesanSalah="Ambil nilai di tengah 20 dan 30." bantuan="Tengah 20 dan 30 adalah 25." umpan="25." periksa={jumlahDuaPuluhLima} alias={["25"]} konteks="Tengah dua puluh dan tiga puluh adalah 25." />
        </Adegan>
        <Pilih id={idKuis("B", 4)} pertanyaan="Satu gambar kue = 6 biskuit. Toples A berisi 2 gambar utuh dan 1 gambar setengah. Jumlah biskuit..." visual={<Papan anak="🍪 🍪 🌗 · 1 🍪 = 6" />} pilihan={[{ huruf: "A", teks: "12" }, { huruf: "B", teks: "15" }, { huruf: "C", teks: "18" }, { huruf: "D", teks: "9" }]} benar="B" umpan="6 + 6 + 3 = 15 biskuit." salah="Setengah gambar bernilai 3." />
        <Pilih id={idKuis("B", 5)} pertanyaan="Sumbu tegak: 0, 4, 8, ?, 16, 20. Angka yang hilang..." visual={<Papan anak="0 · 4 · 8 · ? · 16 · 20" />} pilihan={[{ huruf: "A", teks: "10" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "12" }, { huruf: "D", teks: "9" }]} benar="C" umpan="Lompat 4. Setelah 8 adalah 12." salah="Lihat jarak antar-angka." />
        <Pilih id={idKuis("B", 6)} pertanyaan="Piktogram kelas 4A: 3 bintang. Satu bintang = 10 siswa. Ketuk batang yang tingginya benar." visual={<DiagramTegak data={[{ nama: "A", nilai: 10, warna: "bg-sky-400" }, { nama: "B", nilai: 30, warna: "bg-emerald-500" }, { nama: "C", nilai: 3, warna: "bg-amber-400" }]} max={30} />} pilihan={[{ huruf: "A", teks: "Batang A setinggi 10" }, { huruf: "B", teks: "Batang B setinggi 30" }, { huruf: "C", teks: "Batang C setinggi 3" }, { huruf: "D", teks: "Tidak ada yang cocok" }]} benar="B" umpan="3 × 10 = 30. Batang B." salah="Kalikan 3 dengan 10." />
        <Pilih id={idKuis("B", 7)} pertanyaan="Batang mendatar: bulu tangkis 35, renang 20. Selisih keduanya..." pilihan={[{ huruf: "A", teks: "55" }, { huruf: "B", teks: "35" }, { huruf: "C", teks: "15" }, { huruf: "D", teks: "20" }]} benar="C" umpan="35 − 20 = 15." salah="Kurangkan kedua olahraga itu." />
        <Pilih id={idKuis("B", 8)} pertanyaan="Tabel: Senin 20, Selasa 30, Rabu 25. Pada diagram, batang Rabu digambar setinggi 35. Batang hari yang salah..." visual={<DiagramTegak data={[{ nama: "Senin", nilai: 20, warna: "bg-sky-400" }, { nama: "Selasa", nilai: 30, warna: "bg-emerald-500" }, { nama: "Rabu", nilai: 35, warna: "bg-rose-500" }]} max={40} />} pilihan={[{ huruf: "A", teks: "Senin" }, { huruf: "B", teks: "Selasa" }, { huruf: "C", teks: "Rabu" }, { huruf: "D", teks: "Semua benar" }]} benar="C" umpan="Rabu harus 25, bukan 35." salah="Bandingkan tabel dengan tinggi batang." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB6.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="⭐🦉" judul={kartu.judul} anak="Sepuluh laporan redaksi" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab6-permainan.jpg" alt="Sepuluh mangga berjajar dua baris. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh laporan piktogram dan diagram batang. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB6} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB6} penutup="Redaksi tutup. Igil menempelkan stempel bintang." bunga="⭐📊🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB6.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Pemimpin Redaksi Cilik" : skor >= 6 ? "⭐ Jurnalis Data" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Skala dan batangmu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi pemimpin redaksi." : "Ayo baca keterangan skala lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab6-evaluasi.jpg" alt="Meja lapak dengan kertas kosong dan mangga. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <Pilih id={idKuis("D", 0)} pertanyaan="1. Panen semangka. Senin 🍉🍉🍉. Selasa 🍉🍉🌗. Satu gambar utuh = 10 buah. Jumlah Senin dan Selasa..." visual={<Papan anak="3 × 10  dan  2,5 × 10" />} pilihan={[{ huruf: "A", teks: "55 buah" }, { huruf: "B", teks: "60 buah" }, { huruf: "C", teks: "6 buah" }, { huruf: "D", teks: "50 buah" }]} benar="A" umpan="Senin 30. Selasa 25. Jumlah 55." salah="Hitung gambar setengah sebagai 5." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Baris kelas 4A menampilkan 6 gambar bintang. Siswanya 24 orang. Satu gambar bintang mewakili..." pilihan={[{ huruf: "A", teks: "3 orang" }, { huruf: "B", teks: "4 orang" }, { huruf: "C", teks: "6 orang" }, { huruf: "D", teks: "8 orang" }]} benar="B" umpan="24 ÷ 6 = 4 orang." salah="Bagi jumlah siswa dengan banyak gambar." />
        <Pilih id={idKuis("D", 2)} pertanyaan="3. Total pengunjung 100. Senin 25, Selasa 20, Kamis 30. Batang Rabu seharusnya..." pilihan={[{ huruf: "A", teks: "15" }, { huruf: "B", teks: "25" }, { huruf: "C", teks: "35" }, { huruf: "D", teks: "20" }]} benar="B" umpan="25 + 20 + 30 = 75. 100 − 75 = 25." salah="Kurangkan total dengan tiga hari yang kelihatan." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Toko A: 4 gambar roti, 1 gambar = 5 roti. Toko B: 5 gambar roti, 1 gambar = 3 roti. Pernyataan yang benar..." pilihan={[{ huruf: "A", teks: "Toko B lebih banyak karena gambarnya 5" }, { huruf: "B", teks: "Toko A menjual 5 roti lebih banyak daripada Toko B" }, { huruf: "C", teks: "Penjualan keduanya sama banyak" }, { huruf: "D", teks: "Toko B menjual 5 roti lebih banyak" }]} benar="B" umpan="Toko A 20. Toko B 15. Selisih 5." salah="Kalikan dulu, baru bandingkan." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan pertanyaan dengan jawabannya. Nilai 70 = 6, 80 = 12, 90 = 8, 100 = 4." baris={[{ kiri: "Siswa bernilai di atas 80", pilihan: NILAI_D, benar: "12 siswa" }, { kiri: "Selisih bernilai 80 dan 100", pilihan: NILAI_D, benar: "8 siswa" }, { kiri: "Jumlah seluruh siswa", pilihan: NILAI_D, benar: "30 siswa" }]} umpan="12, 8, dan 30." />
        <KuisBenarSalah id={idKuis("D", 5)} perintah="6. Pilih benar atau salah." baris={[{ teks: "Satu gambar buku = 4 buku. Melati 5 gambar, Mawar 3 gambar. Raka berkata selisihnya 2 buku.", benar: false }]} umpan="Salah. Selisih 2 gambar × 4 = 8 buku." />
        <KuisSuara id={idKuis("D", 6)} pertanyaan="7. Kandang A 5 gambar ayam, kandang B 2 gambar. Satu gambar = 10 ekor. Berapa selisih jumlah ayam sebenarnya?" periksa={jumlahTigaPuluh} petunjuk="3 gambar dikali 10." benar="30 ekor." />
        <KuisSuara id={idKuis("D", 7)} pertanyaan="8. Ujung batang kelas 4B ada tepat di tengah antara 30 dan 40. Berapa nilai batang itu?" periksa={jumlahTigaPuluhLima} petunjuk="Ambil nilai di tengah 30 dan 40." benar="35." />
        <TulisBebas id={idKuis("D", 8)} judul="9. Gambar sepeda" visual={<Papan anak="36 sepeda · 1 🚲 = 4" />} pertanyaan="Berapa gambar sepeda untuk mewakili 36 sepeda? Hitung 36 dibagi 4, lalu tulis angkanya." pesanSalah="Bagi 36 dengan 4." bantuan="36 dibagi 4 sama dengan 9." umpan="9 gambar." periksa={jumlahSembilan} alias={["9"]} konteks="Tiga puluh enam dibagi empat sama dengan 9 gambar." />
        <TulisBebas id={idKuis("D", 9)} judul="10. Sampah daur ulang" visual={<Papan anak="Kertas 15 · Plastik 20 · Kaleng 10" />} pertanyaan="Berapa kilogram total seluruh sampah daur ulang? Hitung 15 + 20 + 10, lalu tulis angkanya." pesanSalah="Jumlahkan ketiga jenis itu." bantuan="15 + 20 + 10 = 45." umpan="45 kg." periksa={jumlahEmpatPuluhLima} alias={["45"]} konteks="Lima belas ditambah dua puluh ditambah sepuluh sama dengan 45." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab6({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab6-poin.jpg", alt: "Igil dan tiga anak di lapak mangga memegang gambar mangga." }}
        cuplikan={cuplikanKalimat(["Pada piktogram, baca keterangan skala. Jumlah = banyak gambar kali nilai 1 gambar.", "Diagram batang memakai persegi panjang tegak atau mendatar. Tingginya sejajar angka skala.", "Garis angka mulai dari 0. Jarak kelipatannya tetap, misalnya lompat 5 atau 10."])}
        poin={["Piktogram berskala: jumlah data = banyak gambar × nilai 1 gambar.", "Gambar setengah dihitung setengah dari nilai 1 gambar.", "Diagram batang punya judul, sumbu kategori, dan sumbu skala.", "Sumbu skala mulai dari 0 dengan lompat yang sama.", "Ujung batang di tengah dua garis diambil nilai tengahnya.", "Data yang sama boleh jadi piktogram, batang tegak, atau batang mendatar."]}
        penutup="Baca keterangan skala atau ujung batang dulu, baru hitung."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
