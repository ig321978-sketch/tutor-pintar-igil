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
import { MISI_MTK4_BAB1, TEMA_MTK4_BAB1 } from "@/lib/misi-mtk-4-bab1";
import { MODUL_MTK4_BAB1 } from "@/lib/modul-resmi-mtk-4-bab1";
import {
  baca2735,
  baca4019,
  bagi6,
  bagi8,
  duaPuluhDelapan,
  faktorDelapanBelas,
  faktorLimaBelas,
  kali35,
  kali42,
  kali45,
  kali48,
  kelipatanYa,
  kurang324,
  kurang415,
  kurang455,
  kurang500,
  kurang525,
  lebihBesar3754,
  lebihBesar8264,
  nilaiDelapanPuluh,
  nilaiSembilanPuluh,
  pecah2938,
  pecah3672,
  susun3058,
  susun7032,
  tambah372,
  tambah437,
  tambah725,
  tambah795,
  tambah803,
  tulis6429,
  tulis8360,
  tulis9048,
  urai4150,
  urutAdegan,
  urutEvaluasi,
  urutPeta,
} from "@/lib/nilai-mtk-4-bab1";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB1.id;

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
        <span className="text-2xl leading-none" aria-hidden>
          {WAJAH_DIALOG[nama] ?? "💬"}
        </span>
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

function TabelHitung({
  operasi,
  atas,
  bawah,
  hasil,
  tanda,
  utuh,
  jejak,
}: {
  operasi: "+" | "−";
  atas: string[];
  bawah: string[];
  hasil?: string[];
  tanda?: Array<string | null>;
  utuh?: Array<string | null>;
  jejak?: Array<string | null>;
}) {
  const kepala = ["Ribuan", "Ratusan", "Puluhan", "Satuan"];
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse text-center">
        <thead>
          <tr>
            <th className="w-8" />
            {kepala.map((nama) => (
              <th key={nama} className="px-3 pb-1 text-xs font-black text-[#1C01A5]">
                {nama}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            {atas.map((angka, indeks) => (
              <td key={`atas-${indeks}`} className="px-3 text-3xl font-black text-[#1C01A5]">
                {angka || "·"}
                {tanda?.[indeks] ? (
                  <span className="ml-0.5 align-super text-xs font-black text-rose-600">{tanda[indeks]}</span>
                ) : null}
              </td>
            ))}
          </tr>
          <tr>
            <td className="pr-2 text-2xl font-black text-[#1C01A5]">{operasi}</td>
            {bawah.map((angka, indeks) => (
              <td key={`bawah-${indeks}`} className="px-3 text-3xl font-black text-[#1C01A5]">
                {angka || "·"}
              </td>
            ))}
          </tr>
          {jejak ? (
            <tr>
              <td />
              {jejak.map((angka, indeks) => (
                <td key={`jejak-${indeks}`} className="px-3 text-xs font-black text-rose-600">
                  {angka || ""}
                </td>
              ))}
            </tr>
          ) : null}
          {hasil ? (
            <tr className="border-t-4 border-[#1C01A5]">
              <td />
              {hasil.map((angka, indeks) => (
                <td key={`hasil-${indeks}`} className="px-3 text-3xl font-black text-emerald-600">
                  {utuh?.[indeks] ? (
                    <span className="mb-1 block text-xs font-black text-rose-600">{utuh[indeks]} → +1</span>
                  ) : null}
                  {angka || "·"}
                </td>
              ))}
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
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
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
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

function KuisSuara({
  id,
  pertanyaan,
  periksa,
  petunjuk,
  benar,
}: {
  id: string;
  pertanyaan: string;
  periksa: (teks: string) => boolean;
  petunjuk: string;
  benar?: string;
}) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(hasil) => setTepat(hasil)} />
      {tepat && benar ? <p className="mt-2 text-sm font-bold text-emerald-800">{benar}</p> : null}
    </div>
  );
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              if (item.huruf === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(pilih, item.huruf, benar, "bg-[#1C01A5] text-white hover:bg-[#16017a]")}`}
          >
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisCocok({
  id,
  perintah,
  baris,
  umpan,
}: {
  id: string;
  perintah: string;
  baris: { kiri: string; pilihan: string[]; benar: string }[];
  umpan: string;
}) {
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
          <button key={`${aktif}-${kalimat}`} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [aktif]: kalimat })); setCek(false); }} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20">
            {kalimat}
          </button>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={() => { setCek(true); if (tepat) kuis?.tandaiBenar(id); }} className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50">
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dari rak kirinya." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function TulisBebas({
  id,
  judul,
  visual,
  pertanyaan,
  pesanSalah,
  bantuan,
  umpan,
  periksa,
  alias = [],
  konteks,
}: {
  id: string;
  judul?: string;
  visual?: ReactNode;
  pertanyaan: string;
  pesanSalah: string;
  bantuan?: string;
  umpan: string;
  periksa: (teks: string) => boolean;
  alias?: string[];
  konteks?: string;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const [salahKe, setSalahKe] = useState(0);
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }),
        });
        const json = (await respons.json()) as { berhasil?: boolean; benar?: boolean; bacaan?: string; pesan?: string };
        if (!respons.ok || !json.berhasil) {
          setStatus(null);
          setCuplikan(json.pesan || "Gagal menilai. Kirim lagi.");
          return;
        }
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

function SusunToken({
  id,
  perintah,
  acak,
  benar,
  umpan,
}: {
  id: string;
  perintah: string;
  acak: string[];
  benar: string[];
  umpan: string;
}) {
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
          <button key={item.id} type="button" onClick={() => { setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id)); setSusun((lama) => [...lama, item]); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300">
            {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => { setSusun((lama) => { const akhir = lama[lama.length - 1]; if (akhir) setSisa((kartu) => [...kartu, akhir]); return lama.slice(0, -1); }); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">
          Periksa urutan
        </button>
      </div>
      <HasilJawabanKuis status={status} pesanSalah="Kelompokkan ribuan dulu, lalu rapikan." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisBenarSalah({
  id,
  perintah,
  baris,
  umpan,
}: {
  id: string;
  perintah: string;
  baris: { teks: string; benar: boolean }[];
  umpan: string;
}) {
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
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">
        Periksa pernyataan
      </button>
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi rak angkanya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const BACAAN_A = ["empat ribu dua ratus tujuh", "empat ribu dua ratus tujuh puluh", "empat ribu dua puluh tujuh"];
const BACAAN_B = ["tiga ribu delapan puluh", "tiga ribu delapan ratus", "tiga ribu delapan"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB1.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🚢👧👦🦉" judul="A. Dermaga Peti" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar
        butir={[
          "Membaca dan menulis bilangan cacah sampai 10.000.",
          "Menentukan nilai tempat sampai 10.000.",
          "Membandingkan dan mengurutkan bilangan cacah.",
          "Menyusun dan mengurai bilangan cacah.",
          "Menjumlah dan mengurangi sampai 1.000.",
          "Mengali dan membagi sampai 100.",
          "Menyelesaikan soal faktor dan kelipatan.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Membaca dan menulis" src="/doodle-mtk/mtk-4-bab1-sub1.jpg" alt="Dermaga kayu, tumpukan peti buah bertanda kosong, Nisa, Farhan, Cinta, dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Empat angka dibaca dari kiri. Titik hanya pemisah ribuan."]}>
          <Dialog nama="Farhan" anak="Label peti menulis 6.418." />
          <Dialog nama="Cinta" anak="Itu enam, empat, satu, delapan?" />
          <Dialog nama="Nisa" anak="Bacanya: enam ribu empat ratus delapan belas." />
          <Dialog nama="Igil" anak="6 di rak ribuan, 4 ratusan, 1 puluhan, 8 satuan. Titik bukan angka." />
          <Papan anak="6.418 = enam ribu empat ratus delapan belas" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Baca bilangan 2.735 dengan lengkap." periksa={baca2735} petunjuk="Sebutkan rak ribuan, lalu ratusan, puluhan, dan satuan." benar="Dua ribu tujuh ratus tiga puluh lima." />
          <TulisBebas id={idKuis("A", 1)} judul="Tulis dari bacaan" visual={<Papan anak="sembilan ribu empat puluh delapan" />} pertanyaan="Tulis angkanya: sembilan ribu empat puluh delapan." pesanSalah="Rak ratusan tidak disebut. Isikan nol." bantuan="Ribuan 9, ratusan 0, puluhan 4, satuan 8. Jadi 9.048." umpan="9.048." periksa={tulis9048} alias={["9048", "9.048"]} konteks="Sembilan ribu empat puluh delapan ditulis 9.048." />
          <Dialog nama="Igil" anak="2.345 dibaca dua ribu tiga ratus empat puluh lima. Jangan baca dua ribuan tiga ratusan." />
          <Dialog nama="Nisa" anak="Kartu 7 di ribuan, 5 di ratusan, 0 di puluhan, 8 di satuan. Jadinya 7.508." />
          <Dialog nama="Farhan" anak="5.091 dibaca lima ribu sembilan puluh satu. Rak ratusan diam." />
          <Dialog nama="Cinta" anak="1.206 dibaca seribu dua ratus enam. 6.002 dibaca enam ribu dua." />
          <Dialog nama="Igil" anak="Kalau rak ribuan nol, itu bukan ribuan. 036 hanya tiga puluh enam." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Baca empat rak</p>
          <PetaSub pusat="5.206" cabang={[{ ikon: "👀", judul: "Baca", isi: "lima ribu dua ratus enam" }, { ikon: "0️⃣", judul: "Rak diam", isi: "puluhan kosong" }, { ikon: "✏️", judul: "Tulis", isi: "nol tetap ada" }]} kolom={["Ribuan", "Ratusan", "Puluhan", "Satuan"]} baris={[["5", "2", "0", "6"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Baca bilangan 4.019." periksa={baca4019} petunjuk="Rak yang kosong tidak perlu disebut." benar="Empat ribu sembilan belas." />
          <TulisBebas id={idKuis("B", 1)} visual={<Papan anak="delapan ribu tiga ratus enam puluh" />} pertanyaan="Tulis angkanya." pesanSalah="Ada empat rak." bantuan="8.360." umpan="8.360." periksa={tulis8360} alias={["8360", "8.360"]} konteks="Delapan ribu tiga ratus enam puluh ditulis 8.360." />
        </Adegan>

        <Adegan utama judul="Sub-bab 2 — Nilai tempat" src="/doodle-mtk/mtk-4-bab1-sub2.jpg" alt="Empat rak kayu kosong di dermaga, peti buah di samping, tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Angkanya tetap. Raknya yang mengubah nilai."]}>
          <Dialog nama="Cinta" anak="Pada 5.284, mengapa angka 2 bukan bernilai 2?" />
          <Dialog nama="Farhan" anak="Karena 2 berdiri di rak ratusan." />
          <Dialog nama="Nisa" anak="Satu ratusan berisi seratus. Pindah ke kiri, kali sepuluh." />
          <Dialog nama="Igil" anak="5.284 sama dengan 5.000 + 200 + 80 + 4." />
          <Papan anak="5.284 = 5.000 + 200 + 80 + 4" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Berapa nilai angka 8 pada 4.839? Sebutkan juga raknya." periksa={nilaiDelapanPuluh} petunjuk="Cari raknya dulu. Rak itu yang menentukan pengalinya." benar="Delapan puluh, karena ada di rak puluhan." />
          <TulisBebas id={idKuis("A", 3)} judul="Urai nilai tempat" visual={<Papan anak="3.672 = ⬜ + ⬜ + ⬜ + ⬜" />} pertanyaan="Tulis uraiannya, lalu sebutkan nama setiap rak." pesanSalah="Ribuan, ratusan, puluhan, lalu satuan." bantuan="3.000 + 600 + 70 + 2." umpan="3.000 + 600 + 70 + 2." periksa={pecah3672} alias={["3000 + 600 + 70 + 2"]} konteks="3.672 = 3.000 + 600 + 70 + 2." />
          <Dialog nama="Cinta" anak="Slamet beli kue Rp7.350. Ia bayar Rp9.500. Kembaliannya Rp2.150." />
          <Dialog nama="Farhan" anak="Pada 7.350, angka 7 di ribuan, 3 di ratusan, 5 di puluhan, 0 di satuan." />
          <Dialog nama="Nisa" anak="6.192 punya rak 6, 1, 9, 2. 2.910 punya 2, 9, 1, 0." />
          <Dialog nama="Igil" anak="Tabel rak diisi angkanya. 1.234 ditulis 1, 2, 3, 4." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Rak mengubah nilai</p>
          <PetaSub pusat="7.145" cabang={[{ ikon: "🟦", judul: "Ribuan", isi: "7 → 7.000" }, { ikon: "🟧", judul: "Ratusan", isi: "1 → 100" }, { ikon: "🟪", judul: "Puluhan", isi: "4 → 40" }]} kolom={["Bilangan", "Uraian"]} baris={[["7.145", "7.000 + 100 + 40 + 5"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Berapa nilai angka 9 pada 6.392? Sebutkan raknya." periksa={nilaiSembilanPuluh} petunjuk="Lihat posisi angka 9, bukan besar angkanya saja." benar="Sembilan puluh, di rak puluhan." />
          <TulisBebas id={idKuis("B", 3)} visual={<Papan anak="2.938" />} pertanyaan="Tulis uraian nilai tempat 2.938 dan sebutkan rak ribuan serta ratusan." pesanSalah="Mulai dari ribuan." bantuan="2.000 + 900 + 30 + 8." umpan="2.000 + 900 + 30 + 8." periksa={pecah2938} alias={["2000 + 900 + 30 + 8"]} konteks="2.938 = 2.000 + 900 + 30 + 8." />
        </Adegan>

        <Adegan utama judul="Sub-bab 3 — Membandingkan dan mengurutkan" src="/doodle-mtk/mtk-4-bab1-sub3.jpg" alt="Dua tumpukan peti yang tingginya berbeda di dermaga. Anak-anak membandingkan, burung hantu bertopi biru berdiri di tengah." kelas={kelas} kelamin={kelamin} penjelasan={["Bandingkan dari rak kiri. Untuk mengurutkan, kelompokkan ribuan dulu."]}>
          <Dialog nama="Nisa" anak="Peti merah 4.615. Peti biru 4.651." />
          <Dialog nama="Farhan" anak="Ribuan sama. Ratusan sama. Puluhan 1 lebih kecil dari 5." />
          <Dialog nama="Cinta" anak="Jadi 4.651 lebih besar." />
          <Dialog nama="Igil" anak="Kalau ribuan beda, berhenti di situ. Jangan lanjut ke kanan." />
          <Papan anak="4.615 < 4.651" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Mana yang lebih besar, 8.246 atau 8.264? Sebutkan bilangannya dan rak yang menentukan." periksa={lebihBesar8264} petunjuk="Ribuan dan ratusan masih sama. Geser ke rak berikutnya." benar="8.264 lebih besar. Rak puluhan yang menentukan." />
          <TulisBebas id={idKuis("A", 5)} judul="Urutkan empat peti" visual={<Papan anak="7.085 · 2.508 · 7.508 · 2.850" />} pertanyaan="Urutkan dari yang paling kecil ke paling besar." pesanSalah="Kelompokkan ribuannya dulu." bantuan="2.508, 2.850, 7.085, 7.508." umpan="2.508, 2.850, 7.085, 7.508." periksa={urutAdegan} alias={["2508 2850 7085 7508"]} konteks="Urutan kecil ke besar: 2.508, 2.850, 7.085, 7.508." />
          <Dialog nama="Nisa" anak="6.192 dan 9.217. Ribuan 6 lebih kecil dari 9, jadi 9.217 lebih besar." />
          <Dialog nama="Farhan" anak="5.734 lebih besar dari 4.312. Ribuan 5 sudah menang." />
          <Dialog nama="Cinta" anak="Urutan kecil ke besar: 3.041, 5.240, 7.570, lalu 9.941." />
          <Dialog nama="Igil" anak="9.999 lebih besar dari 9.998. 1.001 lebih kecil dari 1.002." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Banding dari kiri</p>
          <PetaSub pusat="3.754 > 3.745" cabang={[{ ikon: "1️⃣", judul: "Ribuan", isi: "sama-sama 3" }, { ikon: "2️⃣", judul: "Ratusan", isi: "sama-sama 7" }, { ikon: "3️⃣", judul: "Puluhan", isi: "5 lebih besar dari 4" }]} kolom={["Kiri", "Kanan", "Pemenang"]} baris={[["3.754", "3.745", "3.754"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Mana yang lebih besar, 3.754 atau 3.745? Sebutkan rak yang menentukan." periksa={lebihBesar3754} petunjuk="Dua rak kiri masih sama." benar="3.754. Rak puluhan yang menentukan." />
          <TulisBebas id={idKuis("B", 5)} visual={<Papan anak="4.210 · 4.012 · 4.120 · 4.102" />} pertanyaan="Urutkan dari kecil ke besar." pesanSalah="Ribuan sama. Lihat ratusan, lalu puluhan." bantuan="4.012, 4.102, 4.120, 4.210." umpan="4.012, 4.102, 4.120, 4.210." periksa={urutPeta} alias={["4012 4102 4120 4210"]} konteks="Urutan: 4.012, 4.102, 4.120, 4.210." />
        </Adegan>

        <Adegan utama judul="Sub-bab 4 — Komposisi dan dekomposisi" src="/doodle-mtk/mtk-4-bab1-sub4.jpg" alt="Anak-anak menyusun peti menjadi satu tumpukan dan membuka satu peti berisi mangga, bersama burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Menyusun berarti menggabungkan rak. Mengurai berarti memecah ke tiap rak."]}>
          <Dialog nama="Igil" anak="4 ribuan, 2 ratusan, 0 puluhan, 6 satuan." />
          <Dialog nama="Nisa" anak="Disusun jadi 4.206. Rak kosong tetap ditulis nol." />
          <Dialog nama="Farhan" anak="Kalau 8.173 diurai?" />
          <Dialog nama="Cinta" anak="8.000 + 100 + 70 + 3." />
          <Papan anak="4.206 tersusun    8.173 = 8.000 + 100 + 70 + 3" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Susun bilangan ini: 3 ribuan, 0 ratusan, 5 puluhan, 8 satuan." periksa={susun3058} petunjuk="Rak yang tidak disebut tetap diisi angka kosong." benar="3.058." />
          <TulisBebas id={idKuis("A", 7)} judul="Jumlahkan pecahan rak" visual={<Papan anak="6.000 + 400 + 20 + 9" />} pertanyaan="Tulis satu bilangan dari jumlah rak itu." pesanSalah="Gabungkan dari rak kiri." bantuan="6 ribuan, 4 ratusan, 2 puluhan, 9 satuan." umpan="6.429." periksa={tulis6429} alias={["6429", "6.429"]} konteks="6.000 + 400 + 20 + 9 = 6.429." />
          <Dialog nama="Igil" anak="6 ribuan, 4 ratusan, 8 puluhan, 2 satuan tersusun jadi 6.482. Kalau puluhan saja yang terisi, 6.040." />
          <Dialog nama="Cinta" anak="4.530 artinya 4 ribuan, 5 ratusan, 3 puluhan, dan satuan kosong." />
          <Dialog nama="Farhan" anak="7.020 artinya 7 ribuan dan 2 puluhan. 2.001 artinya 2 ribuan dan 1 satuan." />
          <Dialog nama="Nisa" anak="9.999 terisi 9 di setiap rak. 7.000 hanya rak ribuan yang terisi." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Susun dan urai</p>
          <PetaSub pusat="Susun ↔ urai" cabang={[{ ikon: "🧩", judul: "Susun", isi: "7 ribuan + 3 puluhan + 2 satuan" }, { ikon: "📦", judul: "Jadi", isi: "7.032" }, { ikon: "🔓", judul: "Urai", isi: "4.150 = 4.000 + 100 + 50" }]} kolom={["Arah", "Contoh"]} baris={[["Susun", "7.032"], ["Urai", "4.000 + 100 + 50"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Susun 7 ribuan, 0 ratusan, 3 puluhan, 2 satuan." periksa={susun7032} petunjuk="Rak kosong tetap ditulis." benar="7.032." />
          <TulisBebas id={idKuis("B", 7)} visual={<Papan anak="4.150 = ⬜ + ⬜ + ⬜" />} pertanyaan="Urai 4.150 menjadi ribuan, ratusan, dan puluhan." pesanSalah="Satuan 4.150 adalah nol, boleh tidak ditulis." bantuan="4.000 + 100 + 50." umpan="4.000 + 100 + 50." periksa={urai4150} alias={["4000 + 100 + 50"]} konteks="4.150 = 4.000 + 100 + 50." />
        </Adegan>

        <Adegan utama judul="Sub-bab 5 — Penjumlahan sampai 1.000" src="/doodle-mtk/mtk-4-bab1-sub5.jpg" alt="Dua kelompok peti didorong menjadi satu di dermaga. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Jumlahkan dari rak satuan. Jika 10 atau lebih, ada +1 di rak kirinya."]}>
          <Dialog nama="Farhan" anak="Datang 486 peti, lalu 357 peti." />
          <Dialog nama="Nisa" anak="Satuan 6 + 7 = 13. Tulis 3, ada +1 di puluhan." />
          <Dialog nama="Cinta" anak="Puluhan 8 + 5 + 1 = 14. Tulis 4, ada +1 di ratusan." />
          <Dialog nama="Igil" anak="Ratusan 4 + 3 + 1 = 8. Jumlahnya 843." />
          <TabelHitung operasi="+" atas={["", "4", "8", "6"]} bawah={["", "3", "5", "7"]} tanda={[null, "+1", "+1", null]} jejak={[null, "5", "9", null]} utuh={[null, null, "14", "13"]} hasil={["", "8", "4", "3"]} />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="Berapa hasil 264 + 173? Sebutkan bilangannya." periksa={tambah437} petunjuk="Jumlahkan dari satuan. Jika ada sepuluh, geser satu ke kiri." benar="Empat ratus tiga puluh tujuh." />
          <TulisBebas id={idKuis("A", 9)} judul="Jumlah peti sore" visual={<TabelHitung operasi="+" atas={["", "5", "0", "8"]} bawah={["", "2", "9", "5"]} />} pertanyaan="Tulis hasil 508 + 295." pesanSalah="Mulai dari satuan." bantuan="Satuan 13, puluhan 10, ratusan 8." umpan="803." periksa={tambah803} alias={["803"]} konteks="508 + 295 = 803." />
          <Dialog nama="Farhan" anak="373 + 208 = 581. Satuan 11, ada +1 di puluhan." />
          <Dialog nama="Nisa" anak="Ikan lele 117, 105, dan 242. Jumlahnya 464." />
          <Dialog nama="Igil" anak="333 + 205 = 538. 576 + 148 = 724." />
          <Dialog nama="Cinta" anak="Kebun A 328 buah, kebun B 579 buah. Jumlahnya 907." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Jumlah dari kanan</p>
          <PetaSub pusat="375 + 148" cabang={[{ ikon: "➡️", judul: "Satuan", isi: "5 + 8 = 13" }, { ikon: "➕", judul: "Puluhan", isi: "7 + 4 + 1 = 12" }, { ikon: "✅", judul: "Hasil", isi: "523" }]} kolom={["Rak", "Hitung", "Tulis"]} baris={[["Satuan", "13", "3"], ["Puluhan", "12", "2"], ["Ratusan", "5", "5"]]} />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Berapa hasil 142 + 230?" periksa={tambah372} petunjuk="Jumlahkan tiap rak dari kanan." benar="Tiga ratus tujuh puluh dua." />
          <TulisBebas id={idKuis("B", 9)} visual={<Papan anak="609 + 186" />} pertanyaan="Tulis hasil 609 + 186." pesanSalah="Satuan lebih dari sembilan." bantuan="609 + 186 = 795." umpan="795." periksa={tambah795} alias={["795"]} konteks="609 + 186 = 795." />
        </Adegan>

        <Adegan utama judul="Sub-bab 6 — Pengurangan sampai 1.000" src="/doodle-mtk/mtk-4-bab1-sub6.jpg" alt="Seorang anak mengangkat satu peti dari tumpukan di dermaga. Burung hantu bertopi biru memperhatikan." kelas={kelas} kelamin={kelamin} penjelasan={["Kurangkan dari satuan. Jika tidak cukup, rak kiri memberi 1."]}>
          <Dialog nama="Cinta" anak="Ada 532 peti. Berangkat 218 peti." />
          <Dialog nama="Farhan" anak="Satuan 2 tidak cukup memberi 8. Puluhan memberi 1." />
          <Dialog nama="Nisa" anak="Puluhan menulis −1, lalu menjadi 2. Satuan menjadi 12." />
          <Dialog nama="Igil" anak="12 − 8 = 4. Puluhan 2 − 1 = 1. Ratusan 5 − 2 = 3. Sisa 314." />
          <TabelHitung operasi="−" atas={["", "5", "3", "2"]} bawah={["", "2", "1", "8"]} tanda={[null, null, "−1", null]} jejak={[null, null, "2", "12"]} hasil={["", "3", "1", "4"]} />
          <KuisSuara id={idKuis("A", 10)} pertanyaan="Berapa hasil 630 − 215?" periksa={kurang415} petunjuk="Kurangkan tiap rak, mulai dari satuan." benar="Empat ratus lima belas." />
          <TulisBebas id={idKuis("A", 11)} judul="Sisa peti" visual={<Papan anak="500 − 176" />} pertanyaan="Tulis hasil 500 − 176." pesanSalah="Satuan dan puluhan perlu meminta 1 dari rak kiri." bantuan="500 − 176 = 324." umpan="324." periksa={kurang324} alias={["324"]} konteks="500 − 176 = 324." />
          <Dialog nama="Cinta" anak="573 − 268 = 305. Satuan tidak cukup, puluhan memberi 1." />
          <Dialog nama="Farhan" anak="Ada 427 siswa berangkat. 218 sudah naik mobil. Yang belum naik 209." />
          <Dialog nama="Igil" anak="633 − 211 = 422. 522 − 148 = 374." />
          <Dialog nama="Nisa" anak="333 apel, dibeli 129. Sisa 204. Mangga 765, busuk 179, sisa 586." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Rak kiri memberi 1</p>
          <PetaSub pusat="481 − 256" cabang={[{ ikon: "➖", judul: "Satuan", isi: "11 − 6 = 5" }, { ikon: "👈", judul: "Pemberi", isi: "puluhan −1" }, { ikon: "✅", judul: "Sisa", isi: "225" }]} kolom={["Rak", "Sesudah", "Hasil"]} baris={[["Satuan", "12", "5"], ["Puluhan", "7", "2"], ["Ratusan", "4", "2"]]} />
          <KuisSuara id={idKuis("B", 10)} pertanyaan="Berapa hasil 900 − 400?" periksa={kurang500} petunjuk="Ratusan dikurangi ratusan." benar="Lima ratus." />
          <TulisBebas id={idKuis("B", 11)} visual={<Papan anak="703 − 248" />} pertanyaan="Tulis hasil 703 − 248." pesanSalah="Puluhan kosong, jadi minta ke ratusan." bantuan="703 − 248 = 455." umpan="455." periksa={kurang455} alias={["455"]} konteks="703 − 248 = 455." />
        </Adegan>

        <Adegan utama judul="Sub-bab 7 — Perkalian sampai 100" src="/doodle-mtk/mtk-4-bab1-sub7.jpg" alt="Mangga tersusun dalam beberapa baris sama banyak di dermaga, tanpa angka. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Perkalian adalah kelompok yang sama banyak. Gambar dulu, baru tulis simbol."]}>
          <Dialog nama="Nisa" anak="Ada 3 keranjang. Tiap keranjang 8 mangga." />
          <Dialog nama="Farhan" anak="8 + 8 + 8. Tiga kelompok." />
          <Dialog nama="Cinta" anak="3 × 8 = 24." />
          <Dialog nama="Igil" anak="Gambar barisnya dulu. Lalu tulis kali." />
          <Papan anak="🥭🥭🥭🥭🥭🥭🥭🥭    × 3 kelompok" />
          <KuisSuara id={idKuis("A", 12)} pertanyaan="Ada 6 baris peti. Tiap baris 7 peti. Sebutkan jumlahnya." periksa={kali42} petunjuk="Banyak baris dikali isi satu baris." benar="Empat puluh dua." />
          <TulisBebas id={idKuis("A", 13)} judul="Baris mangga" visual={<Papan anak="5 baris × 9 mangga" />} pertanyaan="Tulis hasil 5 × 9." pesanSalah="Lima kelompok, masing-masing sembilan." bantuan="5 × 9 = 45." umpan="45." periksa={kali45} alias={["45"]} konteks="5 × 9 = 45." />
          <Dialog nama="Nisa" anak="Asep punya 12 ayam. Tiap ayam makan 3 mangkuk. 12 × 3 = 36 mangkuk." />
          <Dialog nama="Igil" anak="Satu dus berisi 12 pak. Satu pak berisi 8 pensil. 12 × 8 = 96 pensil." />
          <Dialog nama="Farhan" anak="32 × 3 = 96. Dua rak buku, tiap rak 45. 2 × 45 = 90." />
          <Dialog nama="Cinta" anak="14 baju butuh 7 kancing. 14 × 7 = 98. Enam kelas kirim 13 siswa. 6 × 13 = 78." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Kelompok sama</p>
          <PetaSub pusat="4 × 7" cabang={[{ ikon: "🥭", judul: "Gambar", isi: "4 baris, isi 7" }, { ikon: "🔁", judul: "Jumlah ulang", isi: "7 + 7 + 7 + 7" }, { ikon: "✖️", judul: "Simbol", isi: "28" }]} kolom={["Kelompok", "Isi", "Jumlah"]} baris={[["4", "7", "28"]]} />
          <KuisSuara id={idKuis("B", 12)} pertanyaan="Berapa hasil 8 × 6?" periksa={kali48} petunjuk="Delapan kelompok, masing-masing enam." benar="Empat puluh delapan." />
          <TulisBebas id={idKuis("B", 13)} visual={<Papan anak="7 × 5" />} pertanyaan="Tulis hasil 7 × 5." pesanSalah="Tujuh kelompok berisi lima." bantuan="7 × 5 = 35." umpan="35." periksa={kali35} alias={["35"]} konteks="7 × 5 = 35." />
        </Adegan>

        <Adegan utama judul="Sub-bab 8 — Pembagian sampai 100" src="/doodle-mtk/mtk-4-bab1-sub8.jpg" alt="Anak-anak membagi mangga rata ke beberapa keranjang di dermaga. Burung hantu bertopi biru berdiri di samping." kelas={kelas} kelamin={kelamin} penjelasan={["Pembagian membagi sama banyak. Periksa dengan perkalian."]}>
          <Dialog nama="Farhan" anak="36 mangga untuk 4 perahu." />
          <Dialog nama="Nisa" anak="Setiap perahu dapat jumlah yang sama." />
          <Dialog nama="Cinta" anak="4 × 9 = 36. Jadi tiap perahu 9." />
          <Dialog nama="Igil" anak="36 ÷ 4 = 9." />
          <Papan anak="36 ÷ 4 = 9" />
          <KuisSuara id={idKuis("A", 14)} pertanyaan="48 peti dibagi rata ke 6 perahu. Sebutkan isi satu perahu." periksa={bagi8} petunjuk="Cari bilangan yang dikali 6 hasilnya 48." benar="Delapan." />
          <TulisBebas id={idKuis("A", 15)} judul="Bagi keranjang" visual={<Papan anak="56 ÷ 7 = ⬜" />} pertanyaan="Tulis hasil 56 ÷ 7." pesanSalah="Cari kali yang hasilnya 56." bantuan="7 × 8 = 56." umpan="8." periksa={bagi8} alias={["8"]} konteks="56 ÷ 7 = 8." />
          <Dialog nama="Farhan" anak="Putu punya 55 gantungan kunci untuk 5 teman. 55 ÷ 5 = 11." />
          <Dialog nama="Cinta" anak="96 ÷ 8 = 12. Ceknya 8 × 12 = 96." />
          <Dialog nama="Nisa" anak="24 ÷ 2 = 12. 96 ÷ 3 = 32. 75 ÷ 5 = 15." />
          <Dialog nama="Igil" anak="36 permen untuk 2 anak, masing-masing 18. 64 alpukat untuk 4 keluarga, masing-masing 16." />
          <Dialog nama="Farhan" anak="81 kue, 3 per kotak, perlu 27 kotak. 48 habis dibagi 2, 3, 4, 6, dan 8." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Bagi rata</p>
          <PetaSub pusat="45 ÷ 5" cabang={[{ ikon: "🧺", judul: "Keranjang", isi: "5 wadah" }, { ikon: "🥭", judul: "Isi", isi: "9 tiap wadah" }, { ikon: "🔁", judul: "Cek", isi: "5 × 9 = 45" }]} kolom={["Bagi", "Hasil", "Cek"]} baris={[["45 ÷ 5", "9", "5 × 9"]]} />
          <KuisSuara id={idKuis("B", 14)} pertanyaan="36 ÷ 6 sama dengan berapa?" periksa={bagi6} petunjuk="Cari bilangan yang dikali 6 hasilnya 36." benar="Enam." />
          <TulisBebas id={idKuis("B", 15)} visual={<Papan anak="64 ÷ 8 = ⬜" />} pertanyaan="Tulis hasil 64 ÷ 8." pesanSalah="Cari kali yang hasilnya 64." bantuan="8 × 8 = 64." umpan="8." periksa={bagi8} alias={["8"]} konteks="64 ÷ 8 = 8." />
        </Adegan>

        <Adegan utama judul="Sub-bab 9 — Faktor dan kelipatan" src="/doodle-mtk/mtk-4-bab1-sub9.jpg" alt="Peti tersusun rapi dalam baris dan kolom yang sama di dermaga. Burung hantu bertopi biru menunjuk barisan." kelas={kelas} kelamin={kelamin} penjelasan={["Faktor membagi habis. Kelipatan adalah lompatan yang sama."]}>
          <Dialog nama="Igil" anak="12 peti bisa dibagi 1, 2, 3, 4, 6, dan 12." />
          <Dialog nama="Nisa" anak="Itu faktor 12. Semuanya membagi habis." />
          <Dialog nama="Farhan" anak="Kelipatan 4 melompat empat: 4, 8, 12, 16, 20." />
          <Dialog nama="Cinta" anak="12 ada di faktor dan juga di kelipatan." />
          <Papan anak="Faktor 12: 1  2  3  4  6  12" />
          <KuisSuara id={idKuis("A", 16)} pertanyaan="Apakah 18 kelipatan 6? Jawab ya atau bukan, lalu sebutkan alasannya singkat." periksa={kelipatanYa} petunjuk="Coba lompat enam sampai melewati delapan belas." benar="Ya. 6 × 3 = 18." />
          <TulisBebas id={idKuis("A", 17)} judul="Faktor lengkap" visual={<Papan anak="Faktor dari 18" />} pertanyaan="Tulis semua faktor 18." pesanSalah="Cari bilangan yang membagi 18 tanpa sisa." bantuan="1, 2, 3, 6, 9, dan 18." umpan="1, 2, 3, 6, 9, 18." periksa={faktorDelapanBelas} alias={["1 2 3 6 9 18"]} konteks="Faktor 18 adalah 1, 2, 3, 6, 9, dan 18." />
          <Dialog nama="Igil" anak="Faktor 20 adalah 1, 2, 4, 5, 10, dan 20. Semuanya membagi habis." />
          <Dialog nama="Nisa" anak="10 kg beras bisa untuk 10 orang, masing-masing 1 kg. Atau 5 orang, masing-masing 2 kg." />
          <Dialog nama="Farhan" anak="Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24. Faktor 25: 1, 5, 25." />
          <Dialog nama="Cinta" anak="Kelipatan 6 di bawah 40: 6, 12, 18, 24, 30, 36." />
          <Dialog nama="Igil" anak="Kelereng bertambah 3: 3, 6, 9, 12, 15, 18, 21." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Habis dan lompat</p>
          <PetaSub pusat="10 dan 3" cabang={[{ ikon: "➗", judul: "Faktor 10", isi: "1, 2, 5, 10" }, { ikon: "🦘", judul: "Lompat 3", isi: "3, 6, 9, 12" }, { ikon: "🚫", judul: "Bukan", isi: "4 bukan faktor 10" }]} kolom={["Jenis", "Contoh"]} baris={[["Faktor", "1 · 2 · 5 · 10"], ["Kelipatan", "3 · 6 · 9 · 12"]]} />
          <KuisSuara id={idKuis("B", 16)} pertanyaan="Apakah 20 kelipatan 4? Jawab ya atau bukan." periksa={kelipatanYa} petunjuk="Lompat empat sampai dua puluh." benar="Ya. 4 × 5 = 20." />
          <TulisBebas id={idKuis("B", 17)} visual={<Papan anak="Faktor dari 15" />} pertanyaan="Tulis semua faktor 15." pesanSalah="Yang membagi 15 tanpa sisa." bantuan="1, 3, 5, dan 15." umpan="1, 3, 5, 15." periksa={faktorLimaBelas} alias={["1 3 5 15"]} konteks="Faktor 15 adalah 1, 3, 5, dan 15." />
        </Adegan>

        <Pilih id={idKuis("A", 18)} pertanyaan="Bagaimana membaca 8.015?" visual={<Papan anak="8.015" />} pilihan={[{ huruf: "A", teks: "Delapan ribu seratus lima belas" }, { huruf: "B", teks: "Delapan ribu lima belas" }, { huruf: "C", teks: "Delapan ratus lima belas" }, { huruf: "D", teks: "Delapan puluh ribu lima belas" }]} benar="B" umpan="Rak ratusan kosong, jadi tidak disebut." salah="Rak kosong tidak dibaca sebagai seratus." />
        <KuisCocok id={idKuis("A", 19)} perintah="Pasangkan bilangan dengan bacaannya." baris={[{ kiri: "4.207", pilihan: BACAAN_A, benar: "empat ribu dua ratus tujuh" }, { kiri: "4.270", pilihan: BACAAN_A, benar: "empat ribu dua ratus tujuh puluh" }, { kiri: "4.027", pilihan: BACAAN_A, benar: "empat ribu dua puluh tujuh" }]} umpan="Tujuh, tujuh puluh, dan dua puluh tujuh." />
        <SusunToken id={idKuis("A", 20)} perintah="Susun dari yang paling kecil." acak={["5.900", "5.009", "5.099", "5.090"]} benar={["5.009", "5.090", "5.099", "5.900"]} umpan="5.009, 5.090, 5.099, 5.900." />
        <KuisBenarSalah id={idKuis("A", 21)} perintah="Pilih benar atau salah." baris={[{ teks: "9.040 dibaca sembilan ribu empat puluh.", benar: true }, { teks: "Pada 6.250, angka 6 bernilai 60.", benar: false }, { teks: "3 × 8 = 24.", benar: true }]} umpan="Yang pertama dan ketiga benar. Angka 6 ada di rak ribuan, nilainya 6.000." />
        <Pilih id={idKuis("A", 22)} pertanyaan="7 × 8 = ..." visual={<Papan anak="7 kelompok × 8" />} pilihan={[{ huruf: "A", teks: "15" }, { huruf: "B", teks: "56" }, { huruf: "C", teks: "78" }, { huruf: "D", teks: "42" }]} benar="B" umpan="7 × 8 = 56." salah="Tujuh kelompok, masing-masing delapan." />
        <Pilih id={idKuis("A", 23)} pertanyaan="Kelipatan 5 yang tepat setelah 15 adalah..." visual={<Papan anak="5 · 10 · 15 · ⬜" />} pilihan={[{ huruf: "A", teks: "16" }, { huruf: "B", teks: "18" }, { huruf: "C", teks: "20" }, { huruf: "D", teks: "25" }]} benar="C" umpan="Lompat 5. 15 + 5 = 20." salah="Kelipatan 5 berakhiran 0 atau 5, dan tepat satu lompatan." />
        <Pilih id={idKuis("B", 18)} pertanyaan="Mana yang paling besar?" visual={<Papan anak="9.040 · 9.400 · 9.004" />} pilihan={[{ huruf: "A", teks: "9.040" }, { huruf: "B", teks: "9.400" }, { huruf: "C", teks: "9.004" }, { huruf: "D", teks: "Semua sama" }]} benar="B" umpan="Ratusan 4 paling besar. Jadi 9.400." salah="Ribuan sama. Lihat ratusannya." />
        <KuisCocok id={idKuis("B", 19)} perintah="Pasangkan bilangan dengan bacaannya." baris={[{ kiri: "3.080", pilihan: BACAAN_B, benar: "tiga ribu delapan puluh" }, { kiri: "3.800", pilihan: BACAAN_B, benar: "tiga ribu delapan ratus" }, { kiri: "3.008", pilihan: BACAAN_B, benar: "tiga ribu delapan" }]} umpan="Delapan puluh, delapan ratus, dan delapan." />
        <SusunToken id={idKuis("B", 20)} perintah="Susun dari yang paling kecil." acak={["2.540", "2.045", "2.450", "2.405"]} benar={["2.045", "2.405", "2.450", "2.540"]} umpan="2.045, 2.405, 2.450, 2.540." />
        <KuisBenarSalah id={idKuis("B", 21)} perintah="Pilih benar atau salah." baris={[{ teks: "2.000 + 40 + 6 = 2.046.", benar: true }, { teks: "15 adalah kelipatan 6.", benar: false }, { teks: "9 × 4 = 36.", benar: true }]} umpan="Yang pertama dan ketiga benar. 15 bukan lompatan 6." />
        <Pilih id={idKuis("B", 22)} pertanyaan="48 ÷ 6 = ..." visual={<Papan anak="48 mangga · 6 keranjang" />} pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "8" }, { huruf: "D", teks: "9" }]} benar="C" umpan="6 × 8 = 48." salah="Cari bilangan yang dikali 6 hasilnya 48." />
      </div>
    </KartuBingkai>
  );
}

function PetaSub({
  pusat,
  cabang,
  kolom,
  baris,
}: {
  pusat: string;
  cabang: { ikon: string; judul: string; isi: string }[];
  kolom: string[];
  baris: string[][];
}) {
  return <PetaContoh pusat={pusat} cabang={cabang} kolom={kolom} baris={baris} />;
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB1.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🚢🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab1-permainan.jpg" alt="Sepuluh batu loncatan kosong di dermaga. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal jalan." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB1} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB1} penutup="Dermaga sepi. Igil menempelkan stempel peti." bunga="🚢📦🥭🦉" />
      </div>
    </KartuBingkai>
  );
}

const PASANGAN_D = ["843", "42", "9"];

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB1.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Catat Dermaga" : skor >= 6 ? "📦 Penjaga Peti" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Catatan petimu rapi." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru catat." : "Ayo hitung lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab1-evaluasi.jpg" alt="Meja kecil di dermaga dengan pensil dan kertas kosong. Burung hantu bertopi biru berdiri di samping meja." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Jumlah dua gudang" visual={<Papan anak="467 + 258" />} pertanyaan="Tulis hasil 467 + 258." pesanSalah="Mulai dari satuan." bantuan="467 + 258 = 725." umpan="725." periksa={tambah725} alias={["725"]} konteks="467 + 258 = 725." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Bagaimana membaca 4.083?" pilihan={[{ huruf: "A", teks: "Empat ribu delapan ratus tiga" }, { huruf: "B", teks: "Empat ribu delapan puluh tiga" }, { huruf: "C", teks: "Empat ribu delapan ratus tiga puluh" }, { huruf: "D", teks: "Empat puluh ribu delapan puluh tiga" }]} benar="B" umpan="Ratusan kosong. Delapan ada di puluhan." salah="Rak kosong tidak disebut." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Berapa hasil 800 − 275?" periksa={kurang525} petunjuk="Kurangkan dari satuan. Jika kurang, minta ke kiri." benar="Lima ratus dua puluh lima." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Pada 6.514, angka 6 bernilai..." pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "60" }, { huruf: "C", teks: "600" }, { huruf: "D", teks: "6.000" }]} benar="D" umpan="Angka 6 di rak ribuan, nilainya 6.000." salah="Lihat rak paling kiri." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "486 + 357", pilihan: PASANGAN_D, benar: "843" }, { kiri: "6 × 7", pilihan: PASANGAN_D, benar: "42" }, { kiri: "63 ÷ 7", pilihan: PASANGAN_D, benar: "9" }]} umpan="843, 42, dan 9." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Urutkan peti" visual={<Papan anak="8.601 · 8.016 · 8.160 · 8.106" />} pertanyaan="Urutkan dari kecil ke besar." pesanSalah="Ribuan sama. Lihat ratusan." bantuan="8.016, 8.106, 8.160, 8.601." umpan="8.016, 8.106, 8.160, 8.601." periksa={urutEvaluasi} alias={["8016 8106 8160 8601"]} konteks="Urutan: 8.016, 8.106, 8.160, 8.601." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Deret 150 – 300 – 450 – ⬜. Berikutnya..." visual={<Papan anak="150 · 300 · 450 · ⬜" />} pilihan={[{ huruf: "A", teks: "500" }, { huruf: "B", teks: "550" }, { huruf: "C", teks: "600" }, { huruf: "D", teks: "750" }]} benar="C" umpan="Naik 150. 450 + 150 = 600." salah="Cari selisih dua bilangan yang bersebelahan." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Mana yang lebih besar, 9 × 6 atau 8 × 7?" pilihan={[{ huruf: "A", teks: "9 × 6 = 54" }, { huruf: "B", teks: "8 × 7 = 56" }, { huruf: "C", teks: "Keduanya sama" }, { huruf: "D", teks: "9 × 7" }]} benar="B" umpan="54 lebih kecil dari 56." salah="Hitung keduanya, lalu bandingkan." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Sebutkan kelipatan 7 yang keempat." periksa={duaPuluhDelapan} petunjuk="Mulai dari 7, lalu lompat tujuh sebanyak empat kali." benar="Dua puluh delapan." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. 63 mangga dibagi rata ke 7 keranjang. Isi satu keranjang..." pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "8" }, { huruf: "D", teks: "9" }]} benar="D" umpan="7 × 9 = 63." salah="Cari bilangan yang dikali 7 hasilnya 63." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab1({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab1-poin.jpg", alt: "Igil dan tiga anak memegang kartu kosong di dermaga yang cerah." }}
        cuplikan={cuplikanKalimat([
          "Bilangan sampai sepuluh ribu punya empat rak. Titik hanya pemisah ribuan.",
          "Bandingkan dari kiri. Jumlahkan dan kurangkan dari kanan.",
          "Kali adalah kelompok sama. Bagi adalah kebalikannya. Faktor membagi habis. Kelipatan melompat.",
        ])}
        poin={[
          "6.418 dibaca enam ribu empat ratus delapan belas. 5.091 dibaca lima ribu sembilan puluh satu.",
          "Nilai angka tergantung rak: ribuan, ratusan, puluhan, satuan. Tabel diisi angkanya.",
          "Bandingkan dari kiri. Urutkan dengan mengelompokkan ribuan.",
          "Menyusun menggabungkan rak. Mengurai memecahnya.",
          "Jika jumlah rak 10 atau lebih, ada +1 di rak kiri.",
          "Jika rak tidak cukup, rak kiri memberi 1 dan menulis −1.",
          "Perkalian sampai 100 lewat gambar kelompok. Pembagian diperiksa dengan perkalian.",
          "Faktor membagi habis. Kelipatan adalah lompatan yang sama.",
        ]}
        penutup="Baca dari kiri. Hitung dari kanan. Kelompok yang sama jadi kali."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
