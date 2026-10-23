"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import PetaContoh from "@/components/PetaContoh";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK3_UKUR, TEMA_MTK3_UKUR } from "@/lib/misi-mtk-3-ukur";
import { MODUL_MTK3_UKUR } from "@/lib/modul-resmi-mtk-3-ukur";
import {
  alatMeteran,
  alatPenggaris,
  alatTimbangan,
  nilaiUkur,
  satuanCm,
  satuanG,
  satuanKg,
  satuanKm,
  satuanM,
} from "@/lib/nilai-mtk-3-ukur";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_UKUR.id;

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
  utama = false,
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan satuan atau alat yang tepat." />
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
  salah = "Samakan satuannya, lalu susun lagi.",
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
      <HasilJawabanKuis status={status} pesanSalah="Hitung lagi, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function Lambang({ ikon, teks }: { ikon: string; teks: string }) {
  return (
    <p className="text-center text-lg font-black text-[#1C01A5]">
      <span className="mr-2 text-3xl" aria-hidden>
        {ikon}
      </span>
      {teks}
    </p>
  );
}

const PASANGAN_A = ["200 cm", "3.000 g", "1.000 m", "400 cm"];
const PASANGAN_B = ["500 cm", "2.000 m", "4.000 g", "800 cm"];
const PASANGAN_D = ["600 cm", "1.000 m", "3.000 g", "900 cm"];
const CM = ["sentimeter", "cm"];
const METER = ["meter", "m"];
const KM = ["kilometer", "km"];
const GRAM = ["gram", "g"];
const KILO = ["kilogram", "kg", "kilo"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UKUR.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📏🦉"
        judul="A. Jalan Sehat"
        anak="Nisa, Farhan, Cinta, dan Igil di jalan sehat"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Mengukur panjang dengan cm, m, dan km. Ujung alat di angka 0.",
          "Mengukur berat dengan g dan kg.",
          "Mengubah satuan. 1 m = 100 cm. 1 kg = 1.000 g.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 1 — Panjang dengan satuan baku"
          src="/doodle-mtk/mtk-3-ukur-sub1.jpg"
          alt="Anak-anak mengukur jalur jalan sehat. Igil memegang pita ukur."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Benda pendek memakai cm. Jalur sedang memakai m. Jarak jauh memakai km. Ujung penggaris mulai di angka 0."]}
        >
          <Dialog nama="Nisa" anak="Sabtu ini kita jalan sehat keliling lapangan." />
          <Dialog nama="Farhan" anak="Tinggi botol minum sekitar 20 cm." />
          <Dialog nama="Cinta" anak="Buku tulis ini 30 cm. Ujung penggaris di angka 0." />
          <Dialog nama="Igil" anak="Lebar jalur kira-kira 2 m. Satu putaran jauh memakai km." />
          <Lambang ikon="📏" teks="cm · m · km" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Panjang</p>
          <PetaContoh
            pusat="Panjang"
            cabang={[
              { ikon: "✏️", judul: "Pendek", isi: "buku, 30 cm" },
              { ikon: "🏫", judul: "Sedang", isi: "jalur, m" },
              { ikon: "🗺️", judul: "Jauh", isi: "putaran, km" },
            ]}
            kolom={["Benda", "Ukuran", "Satuan"]}
            baris={[
              ["buku tulis", "30 cm", "cm"],
              ["botol", "20 cm", "cm"],
              ["jalur", "2 m", "m"],
              ["putaran jauh", "km", "km"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Panjang tali sepatu 25. Ucapkan satuan yang pas."
            periksa={satuanCm}
            petunjuk="Sebutkan satuan panjang untuk benda pendek."
            benar="Sentimeter, atau cm."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Lebar pintu"
            visual={<Lambang ikon="🚪" teks="lebar pintu" />}
            pertanyaan="Lebar pintu kelas kira-kira 1. Tulis satuan yang pas."
            pesanSalah="Pintu lebih panjang dari penghapus, tetapi belum sejauh kota."
            bantuan="Satuan yang pas adalah m."
            umpan="Meter, atau m."
            periksa={satuanM}
            alias={["m", "meter"]}
            konteks="meter."
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Panjang meja 120. Ucapkan satuan yang pas."
            periksa={satuanCm}
            petunjuk="Sebutkan satuan untuk benda sepanjang meja."
            benar="Sentimeter, atau cm."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Lambang ikon="🗺️" teks="dua kota" />}
            pertanyaan="Jarak dua kota kira-kira 12. Tulis satuan yang pas."
            pesanSalah="Jarak kota jauh sekali."
            bantuan="Satuan yang pas adalah km."
            umpan="Kilometer, atau km."
            periksa={satuanKm}
            alias={["km", "kilometer"]}
            konteks="kilometer."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 2 — Berat dengan satuan baku"
          src="/doodle-mtk/mtk-3-ukur-sub2.jpg"
          alt="Biskuit kecil dan jerigen air di meja pos minum. Igil melihat timbangan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Benda ringan memakai g. Tepung dan gula memakai g. Karung beras memakai kg."]}
        >
          <Dialog nama="Nisa" anak="Biskuit di tas beratnya sekitar 30 g." />
          <Dialog nama="Farhan" anak="Tepung dan gula pasir juga memakai g." />
          <Dialog nama="Cinta" anak="Jerigen air minum 5 kg." />
          <Dialog nama="Igil" anak="Karung beras dan berat badan memakai kg." />
          <Lambang ikon="⚖️" teks="g · kg" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Berat</p>
          <PetaContoh
            pusat="Berat"
            cabang={[
              { ikon: "🧁", judul: "Ringan", isi: "gula, g" },
              { ikon: "🪣", judul: "Berat", isi: "karung, kg" },
              { ikon: "🔁", judul: "Tukar", isi: "1 kg = 1.000 g" },
            ]}
            kolom={["Benda", "Satuan", "Singkat"]}
            baris={[
              ["biskuit", "30 g", "g"],
              ["gula pasir", "gram", "g"],
              ["jerigen", "5 kg", "kg"],
              ["karung beras", "kilogram", "kg"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Sebuah apel kecil sekitar 150. Ucapkan satuan yang pas."
            periksa={satuanG}
            petunjuk="Sebutkan satuan berat untuk benda ringan."
            benar="Gram, atau g."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Tas ransel"
            visual={<Lambang ikon="🎒" teks="tas ransel" />}
            pertanyaan="Tas ransel berisi botol kira-kira 3. Tulis satuan yang pas."
            pesanSalah="Tas berisi botol terasa berat di punggung."
            bantuan="Satuan yang pas adalah kg."
            umpan="Kilogram, atau kg."
            periksa={satuanKg}
            alias={["kg", "kilogram"]}
            konteks="kilogram."
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Satu kue sekitar 80. Ucapkan satuan yang pas."
            periksa={satuanG}
            petunjuk="Sebutkan satuan untuk benda ringan."
            benar="Gram, atau g."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Lambang ikon="🪣" teks="ember air" />}
            pertanyaan="Satu ember air kira-kira 6. Tulis satuan yang pas."
            pesanSalah="Ember air terasa berat."
            bantuan="Satuan yang pas adalah kg."
            umpan="Kilogram, atau kg."
            periksa={satuanKg}
            alias={["kg", "kilogram"]}
            konteks="kilogram."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 3 — Alat ukur"
          src="/doodle-mtk/mtk-3-ukur-sub3.jpg"
          alt="Penggaris, meteran gulung, dan timbangan duduk di meja pos jalan sehat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Penggaris untuk yang pendek. Meteran untuk pintu dan meja. Timbangan untuk berat. Mulai dari angka 0."]}
        >
          <Dialog nama="Nisa" anak="Pensil dan buku diukur dengan penggaris." />
          <Dialog nama="Farhan" anak="Pintu dan meja lebih panjang dari penggaris. Pakai meteran." />
          <Dialog nama="Cinta" anak="Berat botol ditimbang dengan timbangan." />
          <Dialog nama="Igil" anak="Mulai ukur dari angka 0." />
          <Lambang ikon="📏" teks="penggaris · meteran · timbangan" />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Alat ukur</p>
          <PetaContoh
            pusat="Alat"
            cabang={[
              { ikon: "📏", judul: "Pendek", isi: "penggaris" },
              { ikon: "🪵", judul: "Panjang", isi: "meteran" },
              { ikon: "⚖️", judul: "Berat", isi: "timbangan" },
            ]}
            kolom={["Benda", "Alat", "Diukur"]}
            baris={[
              ["buku 30 cm", "penggaris", "panjang"],
              ["pintu", "meteran", "panjang"],
              ["meja", "meteran", "panjang"],
              ["botol", "timbangan", "berat"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Kita mau mengukur panjang lapangan. Ucapkan alatnya."
            periksa={alatMeteran}
            petunjuk="Sebutkan alat untuk mengukur jalur yang panjang."
            benar="Meteran."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Menimbang tas"
            visual={<Lambang ikon="🎒" teks="tas" />}
            pertanyaan="Kita mau mengetahui berat tas. Tulis alatnya."
            pesanSalah="Berat tidak diukur dengan penggaris."
            bantuan="Alatnya timbangan."
            umpan="Timbangan."
            periksa={alatTimbangan}
            alias={["timbangan"]}
            konteks="timbangan."
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Kita mau mengukur panjang penghapus. Ucapkan alatnya."
            periksa={alatPenggaris}
            petunjuk="Sebutkan alat untuk benda yang pendek."
            benar="Penggaris."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Lambang ikon="🪵" teks="pagar" />}
            pertanyaan="Kita mau mengukur panjang pagar. Tulis alatnya."
            pesanSalah="Pagar lebih panjang dari penggaris."
            bantuan="Alatnya meteran."
            umpan="Meteran."
            periksa={alatMeteran}
            alias={["meteran"]}
            konteks="meteran."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 4 — Hubungan satuan panjang"
          src="/doodle-mtk/mtk-3-ukur-sub4.jpg"
          alt="Pita meter diubah menjadi sentimeter di papan pos jalan sehat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["100 cm sama dengan 1 m. 1 km sama dengan 1.000 m."]}
        >
          <Dialog nama="Nisa" anak="Di meteran, 100 cm sama dengan 1 m." />
          <Dialog nama="Farhan" anak="Kebun 5.000 cm sama dengan 50 m." />
          <Dialog nama="Cinta" anak="Azizah setinggi 1 m 17 cm. Itu 117 cm." />
          <Dialog nama="Igil" anak="Dari m ke cm, kali 100. Dari km ke m, kali 1.000." />
          <Papan anak={"100 cm = 1 m\n1 km = 1.000 m"} />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Hubungan panjang</p>
          <PetaContoh
            pusat="Ubah panjang"
            cabang={[
              { ikon: "×100", judul: "m ke cm", isi: "kali 100" },
              { ikon: "÷100", judul: "cm ke m", isi: "bagi 100" },
              { ikon: "×1000", judul: "km ke m", isi: "kali 1.000" },
            ]}
            kolom={["Awal", "Hitung", "Hasil"]}
            baris={[
              ["100 cm", "100 ÷ 100", "1 m"],
              ["5.000 cm", "5.000 ÷ 100", "50 m"],
              ["1 m 17 cm", "100 + 17", "117 cm"],
              ["5 m", "5 × 100", "500 cm"],
              ["2 km", "2 × 1.000", "2.000 m"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="3 m sama dengan berapa cm? Ucapkan hasilnya."
            periksa={(teks) => nilaiUkur(teks, "300", "tiga ratus", CM)}
            petunjuk="Sebutkan hasilnya beserta satuannya."
            benar="300 cm."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Kilometer ke meter"
            visual={<Lambang ikon="🚶" teks="4 km" />}
            pertanyaan="Tulis panjang itu dalam meter."
            pesanSalah="1 km = 1.000 m. Kalikan 4."
            bantuan="4 × 1.000 = 4.000. Jadi 4.000 m."
            umpan="4.000 m."
            periksa={(teks) => nilaiUkur(teks, "4000", "empat ribu", METER)}
            alias={["4000", "m"]}
            konteks="4.000 m."
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="6 m sama dengan berapa cm? Ucapkan hasilnya."
            periksa={(teks) => nilaiUkur(teks, "600", "enam ratus", CM)}
            petunjuk="Sebutkan hasilnya beserta satuannya."
            benar="600 cm."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Lambang ikon="🚶" teks="3 km" />}
            pertanyaan="Tulis panjang itu dalam meter."
            pesanSalah="1 km = 1.000 m. Kalikan 3."
            bantuan="3 × 1.000 = 3.000. Jadi 3.000 m."
            umpan="3.000 m."
            periksa={(teks) => nilaiUkur(teks, "3000", "tiga ribu", METER)}
            alias={["3000", "m"]}
            konteks="3.000 m."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 5 — Hubungan satuan berat"
          src="/doodle-mtk/mtk-3-ukur-sub5.jpg"
          alt="Jerigen air diubah dari kilogram menjadi gram di timbangan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["1 kg sama dengan 1.000 g. Satu ons ada 100 g. Satu kg ada 10 ons."]}
        >
          <Dialog nama="Nisa" anak="Telur 1 kg sama dengan 1.000 g." />
          <Dialog nama="Farhan" anak="Jerigen 2 kg sama dengan 2.000 g." />
          <Dialog nama="Cinta" anak="Satu ons ada 100 g." />
          <Dialog nama="Igil" anak="Satu kg ada 10 ons. Dari g ke kg, bagi 1.000." />
          <Papan anak={"1 kg = 1.000 g\n1 ons = 100 g"} />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Hubungan berat</p>
          <PetaContoh
            pusat="Ubah berat"
            cabang={[
              { ikon: "×1000", judul: "kg ke g", isi: "kali 1.000" },
              { ikon: "÷1000", judul: "g ke kg", isi: "bagi 1.000" },
              { ikon: "100", judul: "Ons", isi: "1 ons = 100 g" },
            ]}
            kolom={["Awal", "Hitung", "Hasil"]}
            baris={[
              ["1 kg", "1 × 1.000", "1.000 g"],
              ["1 ons", "100 g", "ringan"],
              ["4 kg", "4 × 1.000", "4.000 g"],
              ["4.000 g", "4.000 ÷ 1.000", "4 kg"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="3 kg sama dengan berapa g? Ucapkan hasilnya."
            periksa={(teks) => nilaiUkur(teks, "3000", "tiga ribu", GRAM)}
            petunjuk="Sebutkan hasilnya beserta satuannya."
            benar="3.000 g."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Gram ke kilogram"
            visual={<Lambang ikon="💧" teks="5.000 g" />}
            pertanyaan="Tulis berat itu dalam kg."
            pesanSalah="1.000 g = 1 kg. Bagi 5.000 dengan 1.000."
            bantuan="5.000 ÷ 1.000 = 5. Jadi 5 kg."
            umpan="5 kg."
            periksa={(teks) => nilaiUkur(teks, "5", "lima", KILO)}
            alias={["5", "kg"]}
            konteks="5 kg."
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="2 kg sama dengan berapa g? Ucapkan hasilnya."
            periksa={(teks) => nilaiUkur(teks, "2000", "dua ribu", GRAM)}
            petunjuk="Sebutkan hasilnya beserta satuannya."
            benar="2.000 g."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Lambang ikon="⚖️" teks="6.000 g" />}
            pertanyaan="Tulis berat itu dalam kg."
            pesanSalah="1.000 g = 1 kg. Bagi 6.000 dengan 1.000."
            bantuan="6.000 ÷ 1.000 = 6. Jadi 6 kg."
            umpan="6 kg."
            periksa={(teks) => nilaiUkur(teks, "6", "enam", KILO)}
            alias={["6", "kg"]}
            konteks="6 kg."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Satu putaran lapangan paling pas diukur dengan..."
          visual={<Lambang ikon="🏃" teks="satu putaran" />}
          pilihan={[
            { huruf: "A", teks: "cm" },
            { huruf: "B", teks: "m" },
            { huruf: "C", teks: "g" },
            { huruf: "D", teks: "kg" },
          ]}
          benar="B"
          salah="Putaran lapangan lebih panjang dari penggaris."
          umpan="Satuan yang pas adalah m."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan ukuran dengan hasil ubahnya."
          baris={[
            { kiri: "2 m", pilihan: PASANGAN_A, benar: "200 cm" },
            { kiri: "3 kg", pilihan: PASANGAN_A, benar: "3.000 g" },
            { kiri: "1 km", pilihan: PASANGAN_A, benar: "1.000 m" },
            { kiri: "4 m", pilihan: PASANGAN_A, benar: "400 cm" },
          ]}
          umpan="200 cm, 3.000 g, 1.000 m, dan 400 cm."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun satuan panjang dari yang paling pendek."
          acak={["km", "cm", "m"]}
          benar={["cm", "m", "km"]}
          umpan="cm, lalu m, lalu km."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "1 m = 100 cm.", benar: true },
            { teks: "1 kg = 100 g.", benar: false },
            { teks: "1 km = 1.000 m.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 1 kg = 1.000 g."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Mana yang bukan satuan panjang?"
          pilihan={[
            { huruf: "A", teks: "cm" },
            { huruf: "B", teks: "m" },
            { huruf: "C", teks: "km" },
            { huruf: "D", teks: "kg" },
          ]}
          benar="D"
          salah="Cari satuan yang dipakai untuk berat."
          umpan="kg adalah satuan berat."
        />
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="6. 7 m sama dengan..."
          visual={<Lambang ikon="📏" teks="7 m" />}
          pilihan={[
            { huruf: "A", teks: "70 cm" },
            { huruf: "B", teks: "700 cm" },
            { huruf: "C", teks: "7.000 cm" },
            { huruf: "D", teks: "7 cm" },
          ]}
          benar="B"
          salah="1 m = 100 cm. Kalikan 7."
          umpan="7 × 100 = 700. Jadi 700 cm."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="7. Pasangkan ukuran dengan hasil ubahnya."
          baris={[
            { kiri: "5 m", pilihan: PASANGAN_B, benar: "500 cm" },
            { kiri: "2 km", pilihan: PASANGAN_B, benar: "2.000 m" },
            { kiri: "4 kg", pilihan: PASANGAN_B, benar: "4.000 g" },
            { kiri: "8 m", pilihan: PASANGAN_B, benar: "800 cm" },
          ]}
          umpan="500 cm, 2.000 m, 4.000 g, dan 800 cm."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="8. Susun dari yang paling ringan."
          acak={["2 kg", "500 g", "3.000 g", "1 kg"]}
          benar={["500 g", "1 kg", "2 kg", "3.000 g"]}
          umpan="500 g, 1 kg, 2 kg, 3.000 g."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="9. Periksa tiga pernyataan."
          baris={[
            { teks: "Penggaris dipakai untuk mengukur penghapus.", benar: true },
            { teks: "1 km = 100 m.", benar: false },
            { teks: "4 kg = 4.000 g.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 1 km = 1.000 m."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="10. 1 m = 100 cm. Maka 9 m sama dengan..."
          pilihan={[
            { huruf: "A", teks: "90 cm" },
            { huruf: "B", teks: "900 cm" },
            { huruf: "C", teks: "9.000 cm" },
            { huruf: "D", teks: "9 cm" },
          ]}
          benar="B"
          salah="Kalikan 9 dengan 100."
          umpan="9 × 100 = 900. Jadi 900 cm."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UKUR.kartu[2];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="📏🦉"
        judul={kartu.judul}
        anak="Sepuluh pos pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-ukur-permainan.jpg"
        alt="Sepuluh pos jalan sehat. Burung hantu Igil memegang stempel."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_UKUR}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_UKUR}
          penutup="Sepuluh stempel terkumpul. Jalan sehat selesai."
          bunga="📏🦉⭐"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_UKUR.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🦉 Penjaga Jalur Ulung" : skor >= 6 ? "📏 Pengukur Pos" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Ukuranmu rapi dan tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga jalur."
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
        src="/doodle-mtk/mtk-3-ukur-evaluasi.jpg"
        alt="Nisa, Farhan, dan Cinta mengerjakan soal di meja pos. Igil menunggu di samping meteran."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Meter ke sentimeter"
          visual={<Lambang ikon="📏" teks="8 m" />}
          pertanyaan="Tulis panjang itu dalam cm."
          pesanSalah="1 m = 100 cm. Kalikan 8."
          bantuan="8 × 100 = 800. Jadi 800 cm."
          umpan="800 cm."
          periksa={(teks) => nilaiUkur(teks, "800", "delapan ratus", CM)}
          alias={["800", "cm"]}
          konteks="800 cm."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Alat untuk menimbang tas adalah..."
          pilihan={[
            { huruf: "A", teks: "Penggaris" },
            { huruf: "B", teks: "Meteran" },
            { huruf: "C", teks: "Timbangan" },
            { huruf: "D", teks: "km" },
          ]}
          benar="C"
          salah="Berat ditimbang, bukan diukur dengan penggaris."
          umpan="Alatnya timbangan."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. 4 kg sama dengan berapa g? Ucapkan hasilnya."
          periksa={(teks) => nilaiUkur(teks, "4000", "empat ribu", GRAM)}
          petunjuk="Sebutkan hasilnya beserta satuannya."
          benar="4.000 g."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Mana yang paling jauh?"
          pilihan={[
            { huruf: "A", teks: "50 cm" },
            { huruf: "B", teks: "2 m" },
            { huruf: "C", teks: "1 km" },
            { huruf: "D", teks: "300 cm" },
          ]}
          benar="C"
          salah="Ubah dulu ke satuan yang sama, lalu bandingkan."
          umpan="1 km paling jauh."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan ukuran dengan hasil ubahnya."
          baris={[
            { kiri: "6 m", pilihan: PASANGAN_D, benar: "600 cm" },
            { kiri: "1 km", pilihan: PASANGAN_D, benar: "1.000 m" },
            { kiri: "3 kg", pilihan: PASANGAN_D, benar: "3.000 g" },
            { kiri: "9 m", pilihan: PASANGAN_D, benar: "900 cm" },
          ]}
          umpan="600 cm, 1.000 m, 3.000 g, dan 900 cm."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Gram ke kilogram"
          visual={<Lambang ikon="⚖️" teks="7.000 g" />}
          pertanyaan="Tulis berat itu dalam kg."
          pesanSalah="1.000 g = 1 kg. Bagi 7.000 dengan 1.000."
          bantuan="7.000 ÷ 1.000 = 7. Jadi 7 kg."
          umpan="7 kg."
          periksa={(teks) => nilaiUkur(teks, "7", "tujuh", KILO)}
          alias={["7", "kg"]}
          konteks="7 kg."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun dari yang paling ringan."
          acak={["1 kg", "200 g", "2 kg", "1.500 g"]}
          benar={["200 g", "1 kg", "1.500 g", "2 kg"]}
          umpan="200 g, 1 kg, 1.500 g, 2 kg."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Periksa tiga pernyataan."
          baris={[
            { teks: "1 m = 100 cm.", benar: true },
            { teks: "Meteran dipakai untuk menimbang.", benar: false },
            { teks: "2 km = 2.000 m.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Meteran mengukur panjang."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Kita mau mengukur panjang lapangan. Ucapkan alatnya."
          periksa={alatMeteran}
          petunjuk="Sebutkan alat untuk mengukur jalur yang panjang."
          benar="Meteran."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Botol A 2 kg, botol B 500 g, botol C 1 kg. Paling berat..."
          pilihan={[
            { huruf: "A", teks: "Botol A" },
            { huruf: "B", teks: "Botol B" },
            { huruf: "C", teks: "Botol C" },
            { huruf: "D", teks: "Ketiganya sama" },
          ]}
          benar="A"
          salah="Ubah dulu ke gram, lalu bandingkan."
          umpan="2 kg paling berat. Itu botol A."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
        <p className="text-center text-sm font-semibold text-slate-600">{pesan}</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Ukur({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Benda pendek memakai cm. Buku tulis bisa 30 cm. Jalur sedang memakai m. Jarak jauh memakai km.",
    "Benda ringan memakai g. Tepung dan gula memakai g. Karung beras memakai kg.",
    "Penggaris untuk yang pendek. Meteran untuk pintu dan meja. Timbangan untuk berat. Mulai dari angka 0.",
    "100 cm = 1 m. 5.000 cm = 50 m. 1 km = 1.000 m.",
    "1 kg = 1.000 g. Satu ons ada 100 g.",
  ];
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{
          src: "/doodle-mtk/mtk-3-ukur-poin.jpg",
          alt: "Burung hantu Igil di samping pos jalan sehat, menunjuk lima kalimat kunci.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Pilih satuan sesuai bendanya. Mulai ukur dari angka 0.",
          "Penggaris untuk buku, meteran untuk pintu, timbangan untuk berat.",
          "Seratus sentimeter sama dengan satu meter. Lima ribu sentimeter sama dengan lima puluh meter. Satu kilogram ada seribu gram.",
        ])}
        poin={poin}
        penutup="Pilih satuan, pilih alat, lalu ubah dengan 100 atau 1.000."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
