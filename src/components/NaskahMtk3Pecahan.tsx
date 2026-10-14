"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK3_PECAHAN, TEMA_MTK3_PECAHAN } from "@/lib/misi-mtk-3-pecahan";
import { MODUL_MTK3_PECAHAN } from "@/lib/modul-resmi-mtk-3-pecahan";
import {
  jawabSeperempat,
  jawabSepertiga,
  jawabSetengah,
  peranSeperempat,
  peranSepertiga,
  peranSetengah,
  yangLebihBesarSepertiga,
  yangLebihBesarSetengah,
  yangLebihKecilSeperempat,
} from "@/lib/nilai-mtk-3-pecahan";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_PECAHAN.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children, latar = "bg-white" }: { children: ReactNode; latar?: string }) {
  return (
    <section className={`rounded-[1.75rem] border-4 border-[#1C01A5]/15 ${latar} px-4 py-5 shadow-sm sm:px-6 sm:py-6`}>
      {children}
    </section>
  );
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
    <p className="whitespace-pre-wrap rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center font-mono text-lg font-black leading-snug text-[#1C01A5] sm:text-xl">
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
}: {
  judul: string;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
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
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
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
            <button
              key={item.kiri}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}
            >
              <span>{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button
            key={`${aktif}-${kalimat}`}
            type="button"
            onClick={() => {
              setPeta((lama) => ({ ...lama, [aktif]: kalimat }));
              setCek(false);
            }}
            className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
          >
            {kalimat}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={!lengkap}
        onClick={() => {
          setCek(true);
          if (tepat) kuis?.tandaiBenar(id);
        }}
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan jumlah bagiannya." />
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
      {bantuan && salahKe >= 2 && status === "salah" ? (
        <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">{bantuan}</p>
      ) : null}
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
  salah = "Lihat penyebutnya, lalu susun lagi.",
}: {
  id: string;
  perintah: string;
  acak: string[];
  benar: string[];
  umpan: string;
  salah?: string;
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
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id));
              setSusun((lama) => [...lama, item]);
              setStatus(null);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setSusun((lama) => {
              const akhir = lama[lama.length - 1];
              if (akhir) setSisa((kartu) => [...kartu, akhir]);
              return lama.slice(0, -1);
            });
            setStatus(null);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">
          Periksa urutan
        </button>
      </div>
      <HasilJawabanKuis status={status} pesanSalah={salah} />
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
                <button
                  key={String(nilai)}
                  type="button"
                  onClick={() => {
                    setPeta((lama) => ({ ...lama, [indeks]: nilai }));
                    setStatus(null);
                  }}
                  className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}
                >
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat lagi angka atas dan angka bawah." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function Bilah({ bagian, warna = 1 }: { bagian: number; warna?: number }) {
  return (
    <div className="mx-auto w-full max-w-xs" aria-hidden>
      <div className="flex h-14 overflow-hidden rounded-2xl border-2 border-[#1C01A5] bg-white">
        {Array.from({ length: bagian }, (_, indeks) => (
          <span
            key={indeks}
            className={`flex-1 border-r border-[#1C01A5] last:border-r-0 ${indeks < warna ? "bg-[#F0AB00]" : "bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Banding({ kiri, kanan }: { kiri: number; kanan: number }) {
  return (
    <div className="grid gap-3">
      {[kiri, kanan].map((jumlah) => (
        <div key={jumlah}>
          <p className="mb-1 text-center text-xs font-black text-[#1C01A5]">{jumlah} bagian sama</p>
          <Bilah bagian={jumlah} />
        </div>
      ))}
    </div>
  );
}

function Langkah({ butir }: { butir: string[] }) {
  return (
    <ol className="list-decimal space-y-1 pl-5 text-sm font-semibold text-slate-700">
      {butir.map((teks) => (
        <li key={teks}>{teks}</li>
      ))}
    </ol>
  );
}

const PASANGAN_A = ["1/2", "1/3", "1/4", "2/4"];
const PASANGAN_B = ["setengah", "sepertiga", "seperempat", "dua per empat"];
const PASANGAN_D = ["1/2", "1/3", "1/4", "2/3"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PECAHAN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📄🦉"
        judul={kartu.judul}
        anak="Nisa, Farhan, Cinta, dan Igil di studio kertas lipat"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: mengenal 1/2, 1/3, dan 1/4, lalu membandingkan bagiannya.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Pecahan setengah"
          src="/doodle-mtk/mtk-3-pecahan-sub1.jpg"
          alt="Kertas biru dilipat dua sama besar. Satu bagian berwarna emas. Igil mengawasi."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Setengah adalah satu bagian dari dua bagian yang sama besar."]}
        >
          <Dialog nama="Nisa" anak="Kertas biru ini dilipat jadi dua bagian sama besar." />
          <Dialog nama="Farhan" anak="Satu bagian kita warnai untuk hiasan pentas." />
          <Dialog nama="Cinta" anak="Itu 1/2. Setengah." />
          <Dialog nama="Igil" anak="Dua bagian sama, ambil satu." />
          <Bilah bagian={2} warna={1} />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Kertas dilipat dua sama besar. Satu bagian diwarnai. Ucapkan pecahannya."
            periksa={jawabSetengah}
            petunjuk="Sebutkan pecahan satu bagian itu."
            benar="1/2, atau setengah."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Dua bagian"
            visual={<Bilah bagian={2} warna={1} />}
            pertanyaan="Tulis pecahan bagian yang berwarna."
            pesanSalah="Hitung semua bagian, lalu bagian yang berwarna."
            bantuan="Dua bagian sama, satu berwarna. 1/2."
            umpan="1/2."
            periksa={jawabSetengah}
            alias={["1/2", "setengah"]}
            konteks="1/2."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Pecahan sepertiga"
          src="/doodle-mtk/mtk-3-pecahan-sub2.jpg"
          alt="Kertas kuning dibagi tiga sama besar. Satu bagian berwarna emas."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sepertiga adalah satu bagian dari tiga bagian yang sama besar."]}
        >
          <Dialog nama="Nisa" anak="Kertas kuning dibagi tiga sama besar." />
          <Dialog nama="Farhan" anak="Satu bagian diwarnai." />
          <Dialog nama="Cinta" anak="Itu 1/3. Sepertiga." />
          <Dialog nama="Igil" anak="Tiga bagian sama, ambil satu." />
          <Bilah bagian={3} warna={1} />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Kertas dibagi tiga sama besar. Satu bagian diwarnai. Ucapkan pecahannya."
            periksa={jawabSepertiga}
            petunjuk="Sebutkan pecahan satu bagian itu."
            benar="1/3, atau sepertiga."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Tiga bagian"
            visual={<Bilah bagian={3} warna={1} />}
            pertanyaan="Tulis pecahan bagian yang berwarna."
            pesanSalah="Hitung semua bagian, lalu bagian yang berwarna."
            bantuan="Tiga bagian sama, satu berwarna. 1/3."
            umpan="1/3."
            periksa={jawabSepertiga}
            alias={["1/3", "sepertiga"]}
            konteks="1/3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Pecahan seperempat"
          src="/doodle-mtk/mtk-3-pecahan-sub3.jpg"
          alt="Kertas hijau dibagi empat sama besar. Satu bagian berwarna emas."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Seperempat adalah satu bagian dari empat bagian yang sama besar."]}
        >
          <Dialog nama="Nisa" anak="Kertas hijau dibagi empat sama besar." />
          <Dialog nama="Farhan" anak="Satu kotak diwarnai." />
          <Dialog nama="Cinta" anak="Itu 1/4. Seperempat." />
          <Dialog nama="Igil" anak="Empat bagian sama, ambil satu." />
          <Bilah bagian={4} warna={1} />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Kertas dibagi empat sama besar. Satu bagian diwarnai. Ucapkan pecahannya."
            periksa={jawabSeperempat}
            petunjuk="Sebutkan pecahan satu bagian itu."
            benar="1/4, atau seperempat."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Empat bagian"
            visual={<Bilah bagian={4} warna={1} />}
            pertanyaan="Tulis pecahan bagian yang berwarna."
            pesanSalah="Hitung semua bagian, lalu bagian yang berwarna."
            bantuan="Empat bagian sama, satu berwarna. 1/4."
            umpan="1/4."
            periksa={jawabSeperempat}
            alias={["1/4", "seperempat"]}
            konteks="1/4."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Pembilang dan penyebut"
          src="/doodle-mtk/mtk-3-pecahan-sub4.jpg"
          alt="Igil menunjuk garis di tengah lambang pecahan pada kertas lipat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Angka di atas adalah pembilang. Angka di bawah adalah penyebut."]}
        >
          <Dialog nama="Nisa" anak="Pada 1/3, angka 1 ada di atas." />
          <Dialog nama="Farhan" anak="1 itu pembilang. Banyak bagian yang diambil." />
          <Dialog nama="Cinta" anak="3 di bawah. Itu penyebut. Banyak bagian seluruhnya." />
          <Dialog nama="Igil" anak="Pembilang di atas. Penyebut di bawah." />
          <Papan anak={"1  ← pembilang\n—\n3  ← penyebut"} />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Pada 1/4, ucapkan pecahannya, lalu mana pembilang dan mana penyebut."
            periksa={peranSeperempat}
            petunjuk="Sebutkan pecahannya, lalu angka atas dan angka bawah."
            benar="1/4. Pembilang 1. Penyebut 4."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Angka atas dan bawah"
            visual={<Bilah bagian={2} warna={1} />}
            pertanyaan="Tulis pecahannya. Tulis juga pembilang dan penyebut."
            pesanSalah="Bagian berwarna di atas. Semua bagian di bawah."
            bantuan="1/2. Pembilang 1. Penyebut 2."
            umpan="Pembilang di atas. Penyebut di bawah."
            periksa={peranSetengah}
            alias={["1/2", "pembilang", "penyebut"]}
            konteks="1/2. Pembilang 1. Penyebut 2."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Membandingkan pecahan"
          src="/doodle-mtk/mtk-3-pecahan-sub5.jpg"
          alt="Tiga kertas sama besar dilipat dua, tiga, dan empat. Anak-anak membandingkan potongannya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kalau kertasnya sama besar, penyebut yang lebih besar membuat bagian yang lebih kecil."]}
        >
          <Dialog nama="Nisa" anak="Tiga kertas sama besar. Satu dilipat dua, satu dilipat tiga, satu dilipat empat." />
          <Dialog nama="Farhan" anak="1/2 potongannya paling besar." />
          <Dialog nama="Cinta" anak="1/4 potongannya paling kecil." />
          <Dialog nama="Igil" anak="Penyebut makin besar, bagiannya makin kecil." />
          <Papan anak={"1/2  >  1/3  >  1/4"} />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="1/2 dan 1/3 dari kertas yang sama. Ucapkan mana yang lebih besar."
            periksa={yangLebihBesarSetengah}
            petunjuk="Sebutkan pecahan yang bagiannya lebih besar."
            benar="1/2 lebih besar."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Bagian yang lebih besar"
            visual={<Banding kiri={3} kanan={4} />}
            pertanyaan="Dua kertas itu sama besar. Tulis pecahan yang lebih besar."
            pesanSalah="Bandingkan satu bagian dari tiga dan satu bagian dari empat."
            bantuan="1/3 lebih besar dari 1/4."
            umpan="1/3 lebih besar."
            periksa={yangLebihBesarSepertiga}
            alias={["1/3", "lebih besar"]}
            konteks="1/3 lebih besar dari 1/4."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Kertas dibagi 2 sama besar. Satu bagian diwarnai. Lambangnya..."
          visual={<Bilah bagian={2} warna={1} />}
          pilihan={[
            { huruf: "A", teks: "1/3" },
            { huruf: "B", teks: "1/2" },
            { huruf: "C", teks: "1/4" },
            { huruf: "D", teks: "2" },
          ]}
          benar="B"
          salah="Satu bagian dari dua bagian sama besar."
          umpan="Lambangnya 1/2."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan bagian berwarna dengan lambangnya."
          baris={[
            { kiri: "1 dari 2", pilihan: PASANGAN_A, benar: "1/2" },
            { kiri: "1 dari 3", pilihan: PASANGAN_A, benar: "1/3" },
            { kiri: "1 dari 4", pilihan: PASANGAN_A, benar: "1/4" },
            { kiri: "2 dari 4", pilihan: PASANGAN_A, benar: "2/4" },
          ]}
          umpan="1/2, 1/3, 1/4, dan 2/4."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Tiga kertas sama besar. Susun dari bagian yang paling kecil."
          acak={["1/2", "1/4", "1/3"]}
          benar={["1/4", "1/3", "1/2"]}
          umpan="1/4, lalu 1/3, lalu 1/2."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "1/2 adalah satu dari dua bagian sama besar.", benar: true },
            { teks: "Pada 1/4, angka 4 adalah pembilang.", benar: false },
            { teks: "1/2 lebih besar dari 1/4 jika kertasnya sama.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Angka 4 pada 1/4 adalah penyebut."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Mana yang bukan 1/2?"
          pilihan={[
            { huruf: "A", teks: "Satu dari dua" },
            { huruf: "B", teks: "1/2" },
            { huruf: "C", teks: "Setengah" },
            { huruf: "D", teks: "1/3" },
          ]}
          benar="D"
          salah="Cari yang tidak sama dengan satu dari dua."
          umpan="1/3 bukan 1/2."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PECAHAN.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu
        ikon="📊🦉"
        judul={kartu.judul}
        anak="Papan kertas lipat · contoh dan cara"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Setengah"
          src="/doodle-mtk/mtk-3-pecahan-sub1.jpg"
          alt="Pita kertas dibagi dua sama besar. Satu sisi berwarna."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bagi keseluruhan jadi dua sama besar. Satu bagiannya 1/2."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: satu dari dua</p>
          <Bilah bagian={2} warna={1} />
          <Langkah butir={["Ada 2 bagian sama besar.", "1 bagian diwarnai.", "Pecahannya 1/2."]} />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Pita dibagi dua sama besar. Satu bagian diambil. Ucapkan pecahannya."
            periksa={jawabSetengah}
            petunjuk="Sebutkan pecahan satu bagian itu."
            benar="1/2."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Bilah bagian={2} warna={1} />}
            pertanyaan="Tulis pecahan bagian yang berwarna."
            pesanSalah="Satu bagian dari dua bagian sama besar."
            bantuan="1/2."
            umpan="1/2."
            periksa={jawabSetengah}
            alias={["1/2", "setengah"]}
            konteks="1/2."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Sepertiga"
          src="/doodle-mtk/mtk-3-pecahan-sub2.jpg"
          alt="Pita dibagi tiga sama besar. Satu bagian berwarna."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bagi keseluruhan jadi tiga sama besar. Satu bagiannya 1/3."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: satu dari tiga</p>
          <Bilah bagian={3} warna={1} />
          <Langkah butir={["Ada 3 bagian sama besar.", "1 bagian diwarnai.", "Pecahannya 1/3."]} />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Pita dibagi tiga sama besar. Satu bagian diambil. Ucapkan pecahannya."
            periksa={jawabSepertiga}
            petunjuk="Sebutkan pecahan satu bagian itu."
            benar="1/3."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Bilah bagian={3} warna={1} />}
            pertanyaan="Tulis pecahan bagian yang berwarna."
            pesanSalah="Satu bagian dari tiga bagian sama besar."
            bantuan="1/3."
            umpan="1/3."
            periksa={jawabSepertiga}
            alias={["1/3", "sepertiga"]}
            konteks="1/3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Seperempat"
          src="/doodle-mtk/mtk-3-pecahan-sub3.jpg"
          alt="Pita dibagi empat sama besar. Satu bagian berwarna."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bagi keseluruhan jadi empat sama besar. Satu bagiannya 1/4."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: satu dari empat</p>
          <Bilah bagian={4} warna={1} />
          <Langkah butir={["Ada 4 bagian sama besar.", "1 bagian diwarnai.", "Pecahannya 1/4."]} />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Pita dibagi empat sama besar. Satu bagian diambil. Ucapkan pecahannya."
            periksa={jawabSeperempat}
            petunjuk="Sebutkan pecahan satu bagian itu."
            benar="1/4."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Bilah bagian={4} warna={1} />}
            pertanyaan="Tulis pecahan bagian yang berwarna."
            pesanSalah="Satu bagian dari empat bagian sama besar."
            bantuan="1/4."
            umpan="1/4."
            periksa={jawabSeperempat}
            alias={["1/4", "seperempat"]}
            konteks="1/4."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Nama kedua angka"
          src="/doodle-mtk/mtk-3-pecahan-sub4.jpg"
          alt="Papan menunjukkan angka atas dan angka bawah pada pecahan setengah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pembilang menghitung bagian yang diambil. Penyebut menghitung semua bagian."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 1/2</p>
          <Langkah butir={["1 di atas: pembilang.", "2 di bawah: penyebut.", "Satu bagian dari dua bagian sama besar."]} />
          <Papan anak={"1/2\npembilang 1\npenyebut 2"} />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Pada 1/2, ucapkan pecahannya, lalu mana pembilang dan mana penyebut."
            periksa={peranSetengah}
            petunjuk="Sebutkan pecahannya, lalu angka atas dan angka bawah."
            benar="1/2. Pembilang 1. Penyebut 2."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Bilah bagian={4} warna={1} />}
            pertanyaan="Tulis pecahannya. Tulis juga pembilang dan penyebut."
            pesanSalah="Bagian berwarna di atas. Semua bagian di bawah."
            bantuan="1/4. Pembilang 1. Penyebut 4."
            umpan="Pembilang 1. Penyebut 4."
            periksa={peranSeperempat}
            alias={["1/4", "pembilang", "penyebut"]}
            konteks="1/4. Pembilang 1. Penyebut 4."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Urutan besar"
          src="/doodle-mtk/mtk-3-pecahan-sub5.jpg"
          alt="Tiga pita sama panjang dipotong menjadi dua, tiga, dan empat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bandingkan hanya jika keseluruhannya sama besar."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 1/2, 1/3, dan 1/4</p>
          <Langkah butir={["Kertasnya sama besar.", "1/2 paling besar.", "1/4 paling kecil.", "1/2 > 1/3 > 1/4."]} />
          <Papan anak={"1/2  >  1/3  >  1/4"} />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="1/3 dan 1/4 dari kertas yang sama. Ucapkan mana yang lebih besar."
            periksa={yangLebihBesarSepertiga}
            petunjuk="Sebutkan pecahan yang bagiannya lebih besar."
            benar="1/3 lebih besar."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Banding kiri={2} kanan={4} />}
            pertanyaan="Dua kertas itu sama besar. Tulis pecahan yang lebih kecil."
            pesanSalah="Bandingkan satu bagian dari dua dan satu bagian dari empat."
            bantuan="1/4 lebih kecil dari 1/2."
            umpan="1/4 lebih kecil."
            periksa={yangLebihKecilSeperempat}
            alias={["1/4", "lebih kecil"]}
            konteks="1/4 lebih kecil dari 1/2."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Dari kertas yang sama, bagian paling besar adalah..."
          pilihan={[
            { huruf: "A", teks: "1/4" },
            { huruf: "B", teks: "1/3" },
            { huruf: "C", teks: "1/2" },
            { huruf: "D", teks: "Sama semua" },
          ]}
          benar="C"
          salah="Penyebut kecil membuat bagian lebih besar."
          umpan="1/2 paling besar."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan lambang dengan namanya."
          baris={[
            { kiri: "1/2", pilihan: PASANGAN_B, benar: "setengah" },
            { kiri: "1/3", pilihan: PASANGAN_B, benar: "sepertiga" },
            { kiri: "1/4", pilihan: PASANGAN_B, benar: "seperempat" },
            { kiri: "2/4", pilihan: PASANGAN_B, benar: "dua per empat" },
          ]}
          umpan="Setengah, sepertiga, seperempat, dan dua per empat."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari bagian yang paling besar."
          acak={["1/4", "1/2", "1/3"]}
          benar={["1/2", "1/3", "1/4"]}
          umpan="1/2, lalu 1/3, lalu 1/4."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "1/3 adalah satu dari tiga bagian sama besar.", benar: true },
            { teks: "Penyebut 1/2 adalah 2.", benar: true },
            { teks: "1/4 lebih besar dari 1/2.", benar: false },
          ]}
          umpan="Dua yang pertama benar. 1/4 lebih kecil dari 1/2."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Dua bagian, ambil satu, ditulis 1/2. Empat bagian, ambil satu, ditulis..."
          pilihan={[
            { huruf: "A", teks: "1/2" },
            { huruf: "B", teks: "1/3" },
            { huruf: "C", teks: "1/4" },
            { huruf: "D", teks: "4/1" },
          ]}
          benar="C"
          salah="Penyebut mengikuti jumlah semua bagian."
          umpan="Satu dari empat ditulis 1/4."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PECAHAN.kartu[2];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="📄🦉"
        judul={kartu.judul}
        anak="Sepuluh pos pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-pecahan-permainan.jpg"
        alt="Sepuluh meja kertas lipat. Burung hantu Igil memegang stempel."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_PECAHAN}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_PECAHAN}
          penutup="Sepuluh stempel terkumpul. Hiasan pentas siap dipasang."
          bunga="📄🦉⭐"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_PECAHAN.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🦉 Penjaga Lipatan Ulung" : skor >= 6 ? "📄 Pelipat Kertas" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Pecahanmu rapi dan tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga lipatan."
        : "Ayo ulang pelan-pelan. Kamu pasti bisa.";
  return (
    <KartuBingkai latar="bg-amber-50/80">
      <KepalaKartu
        ikon="📝🦉"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-pecahan-evaluasi.jpg"
        alt="Nisa, Farhan, dan Cinta mengerjakan soal kertas lipat. Igil menunggu di samping meja."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Bagian berwarna"
          visual={<Bilah bagian={2} warna={1} />}
          pertanyaan="Tulis pecahan bagian yang berwarna."
          pesanSalah="Satu bagian dari dua bagian sama besar."
          bantuan="1/2."
          umpan="1/2."
          periksa={jawabSetengah}
          alias={["1/2", "setengah"]}
          konteks="1/2."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Kertas dibagi 3 sama besar. Satu bagian diwarnai. Lambangnya..."
          visual={<Bilah bagian={3} warna={1} />}
          pilihan={[
            { huruf: "A", teks: "1/2" },
            { huruf: "B", teks: "1/3" },
            { huruf: "C", teks: "1/4" },
            { huruf: "D", teks: "3" },
          ]}
          benar="B"
          salah="Satu bagian dari tiga."
          umpan="Lambangnya 1/3."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Pada 1/3, ucapkan pecahannya, lalu mana pembilang dan mana penyebut."
          periksa={peranSepertiga}
          petunjuk="Sebutkan pecahannya, lalu angka atas dan angka bawah."
          benar="1/3. Pembilang 1. Penyebut 3."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Dari kertas yang sama, bagian paling kecil adalah..."
          pilihan={[
            { huruf: "A", teks: "1/2" },
            { huruf: "B", teks: "1/3" },
            { huruf: "C", teks: "1/4" },
            { huruf: "D", teks: "Sama semua" },
          ]}
          benar="C"
          salah="Penyebut besar membuat bagian lebih kecil."
          umpan="1/4 paling kecil."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan bagian berwarna dengan lambangnya."
          baris={[
            { kiri: "1 dari 2", pilihan: PASANGAN_D, benar: "1/2" },
            { kiri: "1 dari 3", pilihan: PASANGAN_D, benar: "1/3" },
            { kiri: "1 dari 4", pilihan: PASANGAN_D, benar: "1/4" },
            { kiri: "2 dari 3", pilihan: PASANGAN_D, benar: "2/3" },
          ]}
          umpan="1/2, 1/3, 1/4, dan 2/3."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Yang lebih besar"
          pertanyaan="1/2 dan 1/3 dari kertas yang sama. Tulis pecahan yang lebih besar."
          pesanSalah="Bandingkan satu bagian dari dua dan satu bagian dari tiga."
          bantuan="1/2 lebih besar dari 1/3."
          umpan="1/2 lebih besar."
          periksa={yangLebihBesarSetengah}
          alias={["1/2", "lebih besar"]}
          konteks="1/2 lebih besar dari 1/3."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun dari bagian yang paling kecil."
          acak={["1/2", "1/4", "1/3"]}
          benar={["1/4", "1/3", "1/2"]}
          umpan="1/4, lalu 1/3, lalu 1/2."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Periksa tiga pernyataan."
          baris={[
            { teks: "Pembilang 1/4 adalah 1.", benar: true },
            { teks: "1/3 lebih besar dari 1/2.", benar: false },
            { teks: "1/4 adalah satu dari empat bagian sama besar.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 1/3 lebih kecil dari 1/2."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. 1/2 dan 1/4 dari kertas yang sama. Ucapkan mana yang lebih besar."
          periksa={yangLebihBesarSetengah}
          petunjuk="Sebutkan pecahan yang bagiannya lebih besar."
          benar="1/2 lebih besar."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Tiga pita sama panjang. Pita A 1/2, pita B 1/4, pita C 1/3. Potongan paling besar ada di..."
          pilihan={[
            { huruf: "A", teks: "Pita A" },
            { huruf: "B", teks: "Pita B" },
            { huruf: "C", teks: "Pita C" },
            { huruf: "D", teks: "Ketiganya sama" },
          ]}
          benar="A"
          salah="Bandingkan 1/2, 1/4, dan 1/3."
          umpan="1/2 paling besar. Itu pita A."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
        <p className="text-center text-sm font-semibold text-slate-600">{pesan}</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Pecahan({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Satu dari dua bagian sama besar adalah 1/2.",
    "Satu dari tiga bagian sama besar adalah 1/3.",
    "Satu dari empat bagian sama besar adalah 1/4.",
    "Pembilang di atas. Penyebut di bawah.",
    "Kertas yang sama: 1/2 lebih besar dari 1/3, dan 1/3 lebih besar dari 1/4.",
  ];
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{
          src: "/doodle-mtk/mtk-3-pecahan-poin.jpg",
          alt: "Burung hantu Igil di samping meja kertas lipat, menunjuk lima kalimat kunci.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Setengah, sepertiga, dan seperempat adalah satu bagian dari keseluruhan.",
          "Pembilang ada di atas. Penyebut ada di bawah.",
          "Kalau kertasnya sama besar, bagian 1/2 paling besar, lalu 1/3, lalu 1/4.",
        ])}
        poin={poin}
        penutup="Bagi sama besar, tulis pecahan, lalu bandingkan."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
