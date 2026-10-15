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
import { MISI_MTK3_KALIMAT, TEMA_MTK3_KALIMAT } from "@/lib/misi-mtk-3-kalimat";
import { MODUL_MTK3_KALIMAT } from "@/lib/modul-resmi-mtk-3-kalimat";
import { nilaiKata, nilaiKotak } from "@/lib/nilai-mtk-3-kalimat";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_KALIMAT.id;

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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan nilainya." />
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
  salah = "Urutkan lagi dari yang paling kecil.",
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


const PASANG_A = ["9", "15", "12"];
const PASANG_B = ["12", "15", "21"];
const PASANG_D = ["13", "26", "35"];

const LARANG_27 = ["satu", "tiga", "empat", "lima", "enam", "delapan", "sembilan", "belas", "ratus"];
const LARANG_25 = ["satu", "tiga", "empat", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_54 = ["satu", "dua", "tiga", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_26 = ["satu", "tiga", "empat", "lima", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_37 = ["satu", "dua", "empat", "lima", "enam", "delapan", "sembilan", "belas", "ratus"];
const LARANG_24 = ["satu", "tiga", "lima", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_28 = ["satu", "tiga", "empat", "lima", "enam", "tujuh", "sembilan", "belas", "ratus"];
const LARANG_36 = ["satu", "dua", "empat", "lima", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_39 = ["satu", "dua", "empat", "lima", "enam", "tujuh", "delapan", "belas", "ratus"];
const LARANG_BELAS = ["puluh", "ratus", "ribu"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_KALIMAT.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🏮🦉"
        judul="A. Pos Lampion"
        anak="Nisa, Farhan, Cinta, dan Igil di pos lampion"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Mengisi kotak pada kalimat tambah dan kurang.",
          "Mengecek kalimat.",
          "Mengubah cerita menjadi kalimat.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 1 — Kotak pada penjumlahan"
          src="/doodle-mtk/mtk-3-kalimat-sub1.jpg"
          alt="Pos lampion dengan kartu kosong di tali. Igil bertopi biru bersama tiga anak."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pada penjumlahan, isi kotak didapat dengan mengurangkan jumlah."]}
        >
          <Dialog nama="Igil" anak="Nisa punya 20 lampion. Kita ingin 35." />
          <Dialog nama="Nisa" anak="Kalimatnya 20 + kotak = 35." />
          <Dialog nama="Farhan" anak="35 kurang 20." />
          <Dialog nama="Cinta" anak="Kotaknya 15." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="30 + kotak = 46. Sebutkan isi kotak."
            periksa={(teks) => nilaiKotak(teks, 16, ["enam belas"], LARANG_BELAS)}
            petunjuk="Kurangkan jumlah dengan bilangan yang sudah ada."
            benar="16."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="45 + □ = 72" />}
            pertanyaan="45 + kotak = 72. Tulis isi kotak."
            pesanSalah="Kurangkan jumlah dengan bilangan yang sudah ada."
            bantuan="72 − 45 = 27."
            umpan="27."
            periksa={(teks) => nilaiKotak(teks, 27, ["dua puluh tujuh"], LARANG_27)}
            alias={["27", "dua puluh tujuh"]}
            konteks="45 + kotak = 72. Kotaknya 27."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 2 — Kotak pada pengurangan"
          src="/doodle-mtk/mtk-3-kalimat-sub2.jpg"
          alt="Beberapa lampion sudah turun ke keranjang. Igil menunjuk tali yang lebih sepi."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pada pengurangan, kurangkan bilangan depan dengan sisanya."]}
        >
          <Dialog nama="Cinta" anak="Ada 40 lampion. Yang masih di tali 25." />
          <Dialog nama="Farhan" anak="40 − kotak = 25." />
          <Dialog nama="Igil" anak="40 kurang 25 sama dengan 15." />
          <Dialog nama="Nisa" anak="Jadi 15 lampion yang sudah dipasang." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="80 − kotak = 55. Sebutkan isi kotak."
            periksa={(teks) => nilaiKotak(teks, 25, ["dua puluh lima"], LARANG_25)}
            petunjuk="Kurangkan bilangan depan dengan sisanya."
            benar="25."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="90 − □ = 36" />}
            pertanyaan="90 − kotak = 36. Tulis isi kotak."
            pesanSalah="Kurangkan bilangan depan dengan sisanya."
            bantuan="90 − 36 = 54."
            umpan="54."
            periksa={(teks) => nilaiKotak(teks, 54, ["lima puluh empat"], LARANG_54)}
            alias={["54", "lima puluh empat"]}
            konteks="90 − kotak = 36. Kotaknya 54."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 3 — Kotak di depan"
          src="/doodle-mtk/mtk-3-kalimat-sub3.jpg"
          alt="Kait pertama kosong, lampion mulai dari kait berikutnya. Igil bertengger di bambu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kotak di depan pengurangan dicari dengan menjumlahkan sisa dan yang dikurangkan."]}
        >
          <Dialog nama="Nisa" anak="Kotak − 8 = 14." />
          <Dialog nama="Farhan" anak="Kotaknya ada di depan." />
          <Dialog nama="Igil" anak="14 tambah 8." />
          <Dialog nama="Cinta" anak="Kotaknya 22." />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Kotak + 14 = 40. Sebutkan isi kotak."
            periksa={(teks) => nilaiKotak(teks, 26, ["dua puluh enam"], LARANG_26)}
            petunjuk="Kurangkan jumlah dengan bilangan di belakang kotak."
            benar="26."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="□ − 17 = 20" />}
            pertanyaan="Kotak − 17 = 20. Tulis isi kotak."
            pesanSalah="Jumlahkan sisa dengan bilangan yang dikurangkan."
            bantuan="20 + 17 = 37."
            umpan="37."
            periksa={(teks) => nilaiKotak(teks, 37, ["tiga puluh tujuh"], LARANG_37)}
            alias={["37", "tiga puluh tujuh"]}
            konteks="Kotak − 17 = 20. Kotaknya 37."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 4 — Kalimat benar atau salah"
          src="/doodle-mtk/mtk-3-kalimat-sub4.jpg"
          alt="Dua tumpukan lampion sama tinggi dan dua tumpukan yang tidak sama. Farhan memegang kartu kosong."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Hitung dulu. Kalimat benar bila hasilnya sama dengan yang tertulis."]}
        >
          <Dialog nama="Farhan" anak="18 + 7 = 25. Aku hitung, hasilnya sama." />
          <Dialog nama="Nisa" anak="Kalimat itu benar." />
          <Dialog nama="Cinta" anak="20 + 9 ditulis 30. Hitungnya 29." />
          <Dialog nama="Igil" anak="Itu salah. Bandingkan dengan hasil hitung." />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="24 + 6 = 30. Sebutkan benar atau salah."
            periksa={(teks) => nilaiKata(teks, ["benar"], ["salah"])}
            petunjuk="Hitung dulu, lalu bandingkan."
            benar="Benar."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="15 + 8 = 24" />}
            pertanyaan="15 + 8 = 24. Tulis benar atau salah."
            pesanSalah="Hitung 15 + 8, lalu bandingkan dengan 24."
            bantuan="15 + 8 = 23. Kalimat itu salah."
            umpan="Salah."
            periksa={(teks) => nilaiKata(teks, ["salah"], ["benar"])}
            alias={["salah"]}
            konteks="15 + 8 = 23, tertulis 24. Jawabannya salah."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 5 — Soal cerita"
          src="/doodle-mtk/mtk-3-kalimat-sub5.jpg"
          alt="Cinta memegang lampion dan bercerita. Farhan membawa keranjang. Igil mendengar di tepi tali."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Ubah cerita menjadi kalimat, baru cari isi kotak."]}
        >
          <Dialog nama="Nisa" anak="Aku punya 10. Setelah ditambah, jadi 16." />
          <Dialog nama="Igil" anak="Cerita itu jadi 10 + kotak = 16." />
          <Dialog nama="Farhan" anak="Kotaknya 6." />
          <Dialog nama="Cinta" anak="Tulis kalimatnya dulu, baru dihitung." />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Cinta punya 28 lampion. Beberapa dipasang. Sisa 19. Sebutkan yang dipasang."
            periksa={(teks) => nilaiKotak(teks, 9, ["sembilan"], ["belas", "puluh", "ratus", "ribu"])}
            petunjuk="Ubah cerita menjadi kalimat kurang, lalu cari kotaknya."
            benar="9."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="33 + □ = 50" />}
            pertanyaan="Di tali ada 33 lampion. Igil menambah sampai 50. Tulis isi kotak."
            pesanSalah="Tulis 33 + kotak = 50, lalu kurangkan."
            bantuan="50 − 33 = 17."
            umpan="17."
            periksa={(teks) => nilaiKotak(teks, 17, ["tujuh belas"], LARANG_BELAS)}
            alias={["17", "tujuh belas"]}
            konteks="33 + kotak = 50. Kotaknya 17."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="52 + kotak = 70. Isi kotak..."
          visual={<Papan anak="52 + □ = 70" />}
          pilihan={[
            { huruf: "A", teks: "16" },
            { huruf: "B", teks: "18" },
            { huruf: "C", teks: "22" },
            { huruf: "D", teks: "28" },
          ]}
          benar="B"
          umpan="70 − 52 = 18."
          salah="Kurangkan jumlah dengan bilangan yang sudah ada."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan kalimat dengan isi kotaknya."
          baris={[
            { kiri: "21 + kotak = 30", pilihan: PASANG_A, benar: "9" },
            { kiri: "70 − kotak = 55", pilihan: PASANG_A, benar: "15" },
            { kiri: "kotak + 8 = 20", pilihan: PASANG_A, benar: "12" },
          ]}
          umpan="30 − 21 = 9. 70 − 55 = 15. 20 − 8 = 12."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun langkah mencari kotak."
          acak={["kotak = 14", "36 + kotak = 50", "50 − 36"]}
          benar={["36 + kotak = 50", "50 − 36", "kotak = 14"]}
          umpan="Kalimatnya dulu, lalu 50 − 36, kotaknya 14."
          salah="Mulai dari kalimatnya."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "18 + 12 = 30.", benar: true },
            { teks: "40 − 15 = 20.", benar: false },
            { teks: "Kotak pada 9 + kotak = 14 adalah 5.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 40 − 15 = 25."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="Di tali ada 16 lampion. Ditambah sampai jadi 29. Kalimatnya..."
          visual={<Papan anak="16 → 29" />}
          pilihan={[
            { huruf: "A", teks: "16 + kotak = 29" },
            { huruf: "B", teks: "16 − kotak = 29" },
            { huruf: "C", teks: "29 + kotak = 16" },
            { huruf: "D", teks: "kotak − 29 = 16" },
          ]}
          benar="A"
          umpan="Yang ditambah ditulis 16 + kotak = 29."
          salah="Lihat mana yang sudah ada dan mana jumlahnya."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_KALIMAT.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="➕"
        judul={kartu.judul}
        anak="Papan tambah, kurang, dan cek"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Kurangkan jumlah"
          src="/doodle-mtk/mtk-3-kalimat-sub1.jpg"
          alt="Tali lampion dan kartu kosong di pos."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlah dikurangi bilangan yang sudah diketahui."]}
        >
          <PetaContoh
            pusat="Tambah"
            cabang={[
              { ikon: "28", judul: "Ada", isi: "lampion Nisa" },
              { ikon: "45", judul: "Jumlah", isi: "yang diinginkan" },
              { ikon: "17", judul: "Kotak", isi: "45 − 28" },
            ]}
            kolom={["Bagian", "Angka", "Cara"]}
            baris={[
              ["ada", "28", "sudah digantung"],
              ["jumlah", "45", "target"],
              ["kotak", "17", "45 − 28"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="34 + kotak = 50. Sebutkan isi kotak."
            periksa={(teks) => nilaiKotak(teks, 16, ["enam belas"], LARANG_BELAS)}
            petunjuk="Kurangkan jumlah dengan bilangan yang sudah ada."
            benar="16."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="56 + □ = 80" />}
            pertanyaan="56 + kotak = 80. Tulis isi kotak."
            pesanSalah="Kurangkan jumlah dengan bilangan yang sudah ada."
            bantuan="80 − 56 = 24."
            umpan="24."
            periksa={(teks) => nilaiKotak(teks, 24, ["dua puluh empat"], LARANG_24)}
            alias={["24", "dua puluh empat"]}
            konteks="56 + kotak = 80. Kotaknya 24."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Kurangkan sisa"
          src="/doodle-mtk/mtk-3-kalimat-sub2.jpg"
          alt="Lampion di keranjang dan yang masih tergantung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bilangan depan dikurangi sisa yang tertulis."]}
        >
          <PetaContoh
            pusat="Kurang"
            cabang={[
              { ikon: "75", judul: "Depan", isi: "semula" },
              { ikon: "40", judul: "Sisa", isi: "yang tinggal" },
              { ikon: "35", judul: "Kotak", isi: "75 − 40" },
            ]}
            kolom={["Bagian", "Angka", "Cara"]}
            baris={[
              ["depan", "75", "semula"],
              ["sisa", "40", "masih ada"],
              ["kotak", "35", "75 − 40"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="90 − kotak = 62. Sebutkan isi kotak."
            periksa={(teks) => nilaiKotak(teks, 28, ["dua puluh delapan"], LARANG_28)}
            petunjuk="Kurangkan bilangan depan dengan sisanya."
            benar="28."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="83 − □ = 47" />}
            pertanyaan="83 − kotak = 47. Tulis isi kotak."
            pesanSalah="Kurangkan bilangan depan dengan sisanya."
            bantuan="83 − 47 = 36."
            umpan="36."
            periksa={(teks) => nilaiKotak(teks, 36, ["tiga puluh enam"], LARANG_36)}
            alias={["36", "tiga puluh enam"]}
            konteks="83 − kotak = 47. Kotaknya 36."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Kotak di awal"
          src="/doodle-mtk/mtk-3-kalimat-sub3.jpg"
          alt="Kait pertama masih kosong sebelum deretan lampion."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jika kotak dikurangi suatu bilangan, jumlahkan sisa dengan bilangan itu."]}
        >
          <PetaContoh
            pusat="Di depan"
            cabang={[
              { ikon: "□", judul: "Kosong", isi: "belum diketahui" },
              { ikon: "9", judul: "Kurang", isi: "yang dikurangkan" },
              { ikon: "30", judul: "Isi", isi: "21 + 9" },
            ]}
            kolom={["Bagian", "Angka", "Cara"]}
            baris={[
              ["sisa", "21", "hasil"],
              ["kurang", "9", "dikurangkan"],
              ["kotak", "30", "21 + 9"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Kotak + 13 = 40. Sebutkan isi kotak."
            periksa={(teks) => nilaiKotak(teks, 27, ["dua puluh tujuh"], LARANG_27)}
            petunjuk="Kurangkan jumlah dengan bilangan di belakang kotak."
            benar="27."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="□ − 12 = 25" />}
            pertanyaan="Kotak − 12 = 25. Tulis isi kotak."
            pesanSalah="Jumlahkan sisa dengan bilangan yang dikurangkan."
            bantuan="25 + 12 = 37."
            umpan="37."
            periksa={(teks) => nilaiKotak(teks, 37, ["tiga puluh tujuh"], LARANG_37)}
            alias={["37", "tiga puluh tujuh"]}
            konteks="Kotak − 12 = 25. Kotaknya 37."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Bandingkan hasil"
          src="/doodle-mtk/mtk-3-kalimat-sub4.jpg"
          alt="Tumpukan lampion yang sama dan yang tidak sama di atas meja."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Hitung ruas kiri, lalu bandingkan dengan bilangan di kanan."]}
        >
          <PetaContoh
            pusat="Cek"
            cabang={[
              { ikon: "22", judul: "Hitung", isi: "22 + 18" },
              { ikon: "40", judul: "Banding", isi: "sama dengan 40" },
              { ikon: "✓", judul: "Putusan", isi: "kalimat benar" },
            ]}
            kolom={["Kalimat", "Hitung", "Hasil"]}
            baris={[
              ["22 + 18 = 40", "40", "sama"],
              ["30 + 9 = 40", "39", "beda"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="35 + 15 = 50. Sebutkan benar atau salah."
            periksa={(teks) => nilaiKata(teks, ["benar"], ["salah"])}
            petunjuk="Hitung dulu, lalu bandingkan."
            benar="Benar."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="46 − 8 = 36" />}
            pertanyaan="46 − 8 = 36. Tulis benar atau salah."
            pesanSalah="Hitung 46 − 8, lalu bandingkan dengan 36."
            bantuan="46 − 8 = 38. Kalimat itu salah."
            umpan="Salah."
            periksa={(teks) => nilaiKata(teks, ["salah"], ["benar"])}
            alias={["salah"]}
            konteks="46 − 8 = 38, tertulis 36. Jawabannya salah."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Cerita jadi kalimat"
          src="/doodle-mtk/mtk-3-kalimat-sub5.jpg"
          alt="Anak-anak membawa lampion sambil merencanakan jumlahnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sebut yang sudah ada, yang diinginkan, lalu tulis kalimatnya."]}
        >
          <PetaContoh
            pusat="Cerita"
            cabang={[
              { ikon: "19", judul: "Punya", isi: "lampion Farhan" },
              { ikon: "32", judul: "Butuh", isi: "target" },
              { ikon: "13", judul: "Isi", isi: "32 − 19" },
            ]}
            kolom={["Bagian", "Angka", "Cara"]}
            baris={[
              ["punya", "19", "Farhan"],
              ["butuh", "32", "target"],
              ["kotak", "13", "32 − 19"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Nisa punya 44 lampion. Ia memberi beberapa. Sisa 29. Sebutkan yang diberikan."
            periksa={(teks) => nilaiKotak(teks, 15, ["lima belas"], LARANG_BELAS)}
            petunjuk="Ubah cerita menjadi kalimat kurang, lalu cari kotaknya."
            benar="15."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="□ + 21 = 60" />}
            pertanyaan="Sudah ada beberapa lampion. Ditambah 21 menjadi 60. Tulis isi kotak."
            pesanSalah="Kalimatnya kotak + 21 = 60."
            bantuan="60 − 21 = 39."
            umpan="39."
            periksa={(teks) => nilaiKotak(teks, 39, ["tiga puluh sembilan"], LARANG_39)}
            alias={["39", "tiga puluh sembilan"]}
            konteks="Kotak + 21 = 60. Kotaknya 39."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="67 + kotak = 90. Isi kotak..."
          visual={<Papan anak="67 + □ = 90" />}
          pilihan={[
            { huruf: "A", teks: "13" },
            { huruf: "B", teks: "23" },
            { huruf: "C", teks: "27" },
            { huruf: "D", teks: "33" },
          ]}
          benar="B"
          umpan="90 − 67 = 23."
          salah="Kurangkan jumlah dengan bilangan yang sudah ada."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="Pasangkan kalimat dengan isi kotaknya."
          baris={[
            { kiri: "48 + kotak = 60", pilihan: PASANG_B, benar: "12" },
            { kiri: "55 − kotak = 40", pilihan: PASANG_B, benar: "15" },
            { kiri: "kotak + 9 = 30", pilihan: PASANG_B, benar: "21" },
          ]}
          umpan="60 − 48 = 12. 55 − 40 = 15. 30 − 9 = 21."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="Susun langkah mencari kotak."
          acak={["kotak = 27", "80 − 53", "80 − kotak = 53"]}
          benar={["80 − kotak = 53", "80 − 53", "kotak = 27"]}
          umpan="Kalimatnya dulu, lalu 80 − 53, kotaknya 27."
          salah="Mulai dari kalimatnya."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "25 + 17 = 42.", benar: true },
            { teks: "60 − 18 = 48.", benar: false },
            { teks: "Kotak pada 100 − kotak = 70 adalah 30.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 60 − 18 = 42."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="Cinta butuh 58 pita. Sudah ada 31. Kalimat yang tepat..."
          visual={<Papan anak="31 → 58" />}
          pilihan={[
            { huruf: "A", teks: "58 + kotak = 31" },
            { huruf: "B", teks: "31 + kotak = 58" },
            { huruf: "C", teks: "31 − kotak = 58" },
            { huruf: "D", teks: "kotak − 31 = 58" },
          ]}
          benar="B"
          umpan="Yang kurang ditulis 31 + kotak = 58."
          salah="Lihat mana yang sudah ada dan mana yang dibutuhkan."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_KALIMAT.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🏮🦉"
        judul={kartu.judul}
        anak="Sepuluh pos lampion"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-kalimat-permainan.jpg"
        alt="Igil bertopi biru di kios lampion, memegang stempel. Kertas di meja masih kosong."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos lampion. Pilih satu, lalu isi kotaknya.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_KALIMAT}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_KALIMAT}
          penutup="Kotak lampion tertutup. Igil menempelkan lencana perakit."
          bunga="🏮⭐🦉➕"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_KALIMAT.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Perakit Lampion" : skor >= 6 ? "🏮 Perakit Muda" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kotakmu terisi tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi perakit lampion."
        : "Ayo lihat tempat kotaknya lagi bersama Igil, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-rose-50/80">
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
        src="/doodle-mtk/mtk-3-kalimat-evaluasi.jpg"
        alt="Meja dengan pensil, stempel, dan kertas kosong. Igil bertopi biru di depan tali lampion."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Kotak tambah"
          visual={<Papan anak="38 + □ = 55" />}
          pertanyaan="38 + kotak = 55. Tulis isi kotak."
          pesanSalah="Kurangkan jumlah dengan bilangan yang sudah ada."
          bantuan="55 − 38 = 17."
          umpan="17."
          periksa={(teks) => nilaiKotak(teks, 17, ["tujuh belas"], LARANG_BELAS)}
          alias={["17", "tujuh belas"]}
          konteks="38 + kotak = 55. Kotaknya 17."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. 86 − kotak = 51. Isi kotak..."
          visual={<Papan anak="86 − □ = 51" />}
          pilihan={[
            { huruf: "A", teks: "35" },
            { huruf: "B", teks: "37" },
            { huruf: "C", teks: "30" },
            { huruf: "D", teks: "45" },
          ]}
          benar="A"
          umpan="86 − 51 = 35."
          salah="Kurangkan bilangan depan dengan sisanya."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. 19 + 21 = 40. Sebutkan benar atau salah."
          periksa={(teks) => nilaiKata(teks, ["benar"], ["salah"])}
          petunjuk="Hitung dulu, lalu bandingkan."
          benar="Benar."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Kotak + 24 = 61. Isi kotak..."
          visual={<Papan anak="□ + 24 = 61" />}
          pilihan={[
            { huruf: "A", teks: "85" },
            { huruf: "B", teks: "37" },
            { huruf: "C", teks: "47" },
            { huruf: "D", teks: "35" },
          ]}
          benar="B"
          umpan="61 − 24 = 37."
          salah="Kurangkan jumlah dengan bilangan di belakang kotak."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan kalimat dengan isi kotaknya."
          baris={[
            { kiri: "27 + kotak = 40", pilihan: PASANG_D, benar: "13" },
            { kiri: "90 − kotak = 64", pilihan: PASANG_D, benar: "26" },
            { kiri: "kotak + 15 = 50", pilihan: PASANG_D, benar: "35" },
          ]}
          umpan="40 − 27 = 13. 90 − 64 = 26. 50 − 15 = 35."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Kotak kurang"
          visual={<Papan anak="48 − □ = 29" />}
          pertanyaan="Di ember ada 48 lampion. Dipasang sampai sisa 29. Tulis isi kotak."
          pesanSalah="Kalimatnya 48 − kotak = 29."
          bantuan="48 − 29 = 19."
          umpan="19."
          periksa={(teks) => nilaiKotak(teks, 19, ["sembilan belas"], LARANG_BELAS)}
          alias={["19", "sembilan belas"]}
          konteks="48 − kotak = 29. Kotaknya 19."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun langkah mencari kotak."
          acak={["70 − 42", "kotak = 28", "42 + kotak = 70"]}
          benar={["42 + kotak = 70", "70 − 42", "kotak = 28"]}
          umpan="Kalimatnya dulu, lalu 70 − 42, kotaknya 28."
          salah="Mulai dari kalimatnya."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Benar atau salah?"
          baris={[
            { teks: "33 + 17 = 50.", benar: true },
            { teks: "45 − 9 = 34.", benar: false },
            { teks: "Kotak pada kotak + 20 = 46 adalah 26.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 45 − 9 = 36."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Cinta punya 62 kertas. Beberapa jadi lampion. Sisa 47. Sebutkan yang terpakai."
          periksa={(teks) => nilaiKotak(teks, 15, ["lima belas"], LARANG_BELAS)}
          petunjuk="Ubah cerita menjadi kalimat kurang, lalu cari kotaknya."
          benar="15."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Farhan butuh 75 lampion. Sudah ada 46. Yang harus dibuat..."
          visual={<Papan anak="46 + □ = 75" />}
          pilihan={[
            { huruf: "A", teks: "29" },
            { huruf: "B", teks: "121" },
            { huruf: "C", teks: "31" },
            { huruf: "D", teks: "19" },
          ]}
          benar="A"
          umpan="75 − 46 = 29."
          salah="Kurangkan yang dibutuhkan dengan yang sudah ada."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Kalimat({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Kotak pada penjumlahan: jumlah dikurangi yang sudah ada.",
    "Kotak pada pengurangan: bilangan depan dikurangi sisa.",
    "Kotak di depan pengurangan: sisa ditambah yang dikurangkan.",
    "Kalimat benar bila hasil hitung sama dengan yang tertulis.",
    "Soal cerita diubah dulu menjadi kalimat, baru kotaknya dicari.",
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
          src: "/doodle-mtk/mtk-3-kalimat-poin.jpg",
          alt: "Igil dan tiga anak di pos lampion memegang kartu kosong.",
        }}
        cuplikan={cuplikanKalimat([
          "Lihat tempat kotaknya. Pada penjumlahan, kurangkan jumlah.",
          "Pada pengurangan, kurangkan bilangan depan dengan sisanya.",
          "Cerita diubah menjadi kalimat, lalu kotaknya diisi.",
        ])}
        poin={poin}
        penutup="Tulis kalimatnya, lalu isi kotaknya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
