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
import { MISI_MTK3_PERKALIAN, TEMA_MTK3_PERKALIAN } from "@/lib/misi-mtk-3-perkalian";
import { MODUL_MTK3_PERKALIAN } from "@/lib/modul-resmi-mtk-3-perkalian";
import {
  duaSusunan,
  hasilDanSama,
  kalimatKali,
  salahSatuLalu,
  semuaFrasa,
  ucapKali,
  ulangKali,
} from "@/lib/nilai-mtk-3-perkalian";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_PERKALIAN.id;

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
  Hulu: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nisa: "👧",
  Farhan: "👦",
  Cinta: "👧",
  Hulu: "🦉",
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
      <SoalRekamSuara
        id={id}
        pertanyaan={pertanyaan}
        periksa={periksa}
        petunjuk={petunjuk}
        sesudahNilai={(hasil) => setTepat(hasil)}
      />
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
          const warna = !cek
            ? "border-sky-200 bg-white"
            : peta[indeks] === item.benar
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-300 bg-rose-50";
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan hasil hitungannya." />
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
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        {pertanyaan}
      </p>
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
  salah = "Hitung dulu, lalu susun lagi.",
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
                  className={`rounded-full px-3 py-1 text-sm font-black ${
                    peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"
                  }`}
                >
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={!lengkap}
        onClick={periksa}
        className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pernyataan
      </button>
      <HasilJawabanKuis status={status} pesanSalah="Hitung lagi, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
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

function Ikat({ jumlah, isi, ikon = "🎈" }: { jumlah: number; isi: number; ikon?: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" aria-hidden>
      {Array.from({ length: jumlah }, (_, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 rounded-2xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200"
        >
          <span className="text-xl">{ikon}</span>
          {isi}
        </span>
      ))}
    </div>
  );
}

function Rumus({ baris }: { baris: { teks: string; hasil?: boolean }[] }) {
  return (
    <div className="rounded-2xl border-2 border-sky-300 bg-white px-3 py-3 text-center">
      {baris.map((barisHitung) => (
        <p
          key={barisHitung.teks}
          className={
            barisHitung.hasil
              ? "text-2xl font-black text-emerald-700"
              : "text-2xl font-black text-[#1C01A5]"
          }
        >
          {barisHitung.teks}
        </p>
      ))}
    </div>
  );
}

const PASANGAN_A = ["20", "36", "21", "64"];
const PASANGAN_B = ["36", "28", "55", "52"];
const PASANGAN_D = ["56", "72", "48", "63"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PERKALIAN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🎈🦉"
        judul={kartu.judul}
        anak="Nisa, Farhan, Cinta, dan Hulu di kios balon"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: menghitung perkalian sampai 100, menukar, mengelompokkan, dan memecah dua angka.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Perkalian sebagai penjumlahan berulang"
          src="/doodle-mtk/mtk-3-perkalian-sub1.jpg"
          alt="Empat ikat balon di meja kios taman. Nisa, Farhan, Cinta, dan burung hantu Hulu menghitungnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Di kios taman, isi tiap ikat sama. Perkalian menghitung berapa kali angka itu dijumlah.",
          ]}
        >
          <Dialog nama="Nisa" anak="Ada 4 ikat. Tiap ikat berisi 6 balon." />
          <Dialog nama="Farhan" anak="Kalau dijumlah: 6 + 6 + 6 + 6." />
          <Dialog nama="Cinta" anak="Lebih cepat: 4 × 6 = 24." />
          <Dialog nama="Hulu" anak="Perkalian itu penjumlahan yang sama, diulang." />
          <Ikat jumlah={4} isi={6} />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="5 ikat, tiap ikat 4 balon. Ucapkan bentuk kalinya dan hasilnya."
            periksa={(teks) => ucapKali(teks, "5", "lima", "4", "empat", "20", "dua puluh")}
            petunjuk="Sebutkan jumlah ikat, isi tiap ikat, lalu hasilnya."
            benar="5 × 4 = 20."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Tulis dua bentuk"
            visual={<Papan anak={"3 + 3 + 3 + 3"} />}
            pertanyaan="Tulis penjumlahan itu dan bentuk kalinya beserta hasilnya."
            pesanSalah="Hitung berapa kali angka 3 muncul, lalu kalikan."
            bantuan="3 + 3 + 3 + 3 = 4 × 3 = 12."
            umpan="Empat kali tiga sama dengan 12."
            periksa={(teks) => ulangKali(teks, "3+3+3+3", "4", "3", "12")}
            alias={["4", "3", "12"]}
            konteks="3 + 3 + 3 + 3 = 4 × 3 = 12."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Sifat pertukaran"
          src="/doodle-mtk/mtk-3-perkalian-sub2.jpg"
          alt="Dua tumpukan ikat balon bertukar tempat di meja kios. Hasil hitungnya tetap."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Dua bilangan boleh bertukar tempat. Hasil kalinya tetap sama."]}
        >
          <Dialog nama="Nisa" anak="8 ikat, tiap ikat 6 balon. Bentuknya 8 × 6." />
          <Dialog nama="Farhan" anak="Aku lebih hafal 6 × 8." />
          <Dialog nama="Hulu" anak="Boleh dibalik. Hasilnya tetap sama." />
          <Dialog nama="Cinta" anak="8 × 6 = 48. 6 × 8 = 48." />
          <Rumus
            baris={[
              { teks: "8 × 6 = 48", hasil: true },
              { teks: "6 × 8 = 48", hasil: true },
            ]}
          />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="8 × 6 dan 6 × 8. Ucapkan hasilnya, lalu katakan sama atau beda."
            periksa={(teks) => hasilDanSama(teks, "48", "empat puluh delapan")}
            petunjuk="Ucapkan hasilnya, lalu katakan sama atau beda."
            benar="Hasilnya 48. Sama."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Dua susunan"
            visual={<Papan anak={"9 × 5    dan    5 × 9"} />}
            pertanyaan="Tulis kedua susunan itu beserta hasilnya."
            pesanSalah="Tulis kedua susunan. Hasil keduanya sama."
            bantuan="9 × 5 = 45 dan 5 × 9 = 45."
            umpan="Dibalik, hasilnya tetap 45."
            periksa={(teks) => duaSusunan(teks, "9", "5", "45")}
            alias={["45"]}
            konteks="9 × 5 = 45 dan 5 × 9 = 45."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Sifat pengelompokan"
          src="/doodle-mtk/mtk-3-perkalian-sub3.jpg"
          alt="Balon tersusun dua dus. Tiap dus ada beberapa ikat. Hulu menunjuk kelompok yang dikerjakan dulu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Tiga bilangan boleh dikerjakan dari kelompok mana pun. Hasil akhirnya sama."]}
        >
          <Dialog nama="Nisa" anak="2 dus. Tiap dus 5 ikat. Tiap ikat 3 balon." />
          <Dialog nama="Farhan" anak="Aku hitung 2 × 5 dulu. Itu 10. Lalu 10 × 3 = 30." />
          <Dialog nama="Cinta" anak="Aku hitung 5 × 3 dulu. Itu 15. Lalu 2 × 15 = 30." />
          <Dialog nama="Hulu" anak="Kelompoknya beda. Hasilnya sama." />
          <Rumus
            baris={[
              { teks: "(2 × 5) × 3 = 30", hasil: true },
              { teks: "2 × (5 × 3) = 30", hasil: true },
            ]}
          />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="(2 × 5) × 3. Ucapkan hasil dalam kurung, lalu hasil akhirnya."
            periksa={(teks) => salahSatuLalu(teks, [["10", "sepuluh"]], ["30", "tiga puluh"])}
            petunjuk="Sebutkan hasil dalam kurung, lalu hasil akhirnya."
            benar="Dalam kurung 10. Hasil akhirnya 30."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Tiga bilangan"
            visual={<Papan anak={"4 × 2 × 5"} />}
            pertanyaan="Tulis satu langkah dan hasil akhirnya."
            pesanSalah="Kalikan dua angka dulu, lalu kali angka yang sisa."
            bantuan="4 × 2 = 8, lalu 8 × 5 = 40. Atau 2 × 5 = 10, lalu 4 × 10 = 40."
            umpan="Hasilnya 40."
            periksa={(teks) =>
              salahSatuLalu(
                teks,
                [
                  ["8", "delapan"],
                  ["10", "sepuluh"],
                ],
                ["40", "empat puluh"],
              )
            }
            alias={["40"]}
            konteks="4 × 2 × 5 = 40."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Perkalian dua angka"
          src="/doodle-mtk/mtk-3-perkalian-sub4.jpg"
          alt="Satu ikat balon dipecah menjadi tumpukan puluhan dan tumpukan satuan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bilangan dua angka dipecah jadi puluhan dan satuan. Kalikan terpisah, lalu jumlahkan."]}
        >
          <Dialog nama="Nisa" anak="Satu ikat berisi 12 balon. Ada 4 ikat." />
          <Dialog nama="Farhan" anak="12 itu 10 dan 2." />
          <Dialog nama="Cinta" anak="10 × 4 = 40. 2 × 4 = 8. 40 + 8 = 48." />
          <Dialog nama="Hulu" anak="Pecah dulu. Lalu jumlahkan." />
          <Rumus
            baris={[
              { teks: "12 × 4" },
              { teks: "10 × 4 = 40" },
              { teks: "2 × 4 = 8" },
              { teks: "40 + 8 = 48", hasil: true },
            ]}
          />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="12 × 4. Ucapkan bentuk kalinya dan hasilnya."
            periksa={(teks) => ucapKali(teks, "12", "dua belas", "4", "empat", "48", "empat puluh delapan")}
            petunjuk="Sebutkan kedua bilangan dan hasilnya."
            benar="12 × 4 = 48."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Pecah lalu jumlah"
            visual={<Papan anak={"14 × 3"} />}
            pertanyaan="Tulis hasil puluhan, hasil satuan, dan jumlahnya."
            pesanSalah="Pecah 14 jadi 10 dan 4. Kalikan masing-masing dengan 3."
            bantuan="10 × 3 = 30. 4 × 3 = 12. 30 + 12 = 42."
            umpan="14 × 3 = 42."
            periksa={(teks) =>
              semuaFrasa(teks, [
                ["30", "tiga puluh"],
                ["12", "dua belas"],
                ["42", "empat puluh dua"],
              ])
            }
            alias={["30", "12", "42"]}
            konteks="10 × 3 = 30, 4 × 3 = 12, 30 + 12 = 42."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita perkalian"
          src="/doodle-mtk/mtk-3-perkalian-sub5.jpg"
          alt="Empat anak di taman. Masing-masing menerima satu ikat balon dari kios."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kata setiap, tiap, dan masing-masing berarti kali."]}
        >
          <Dialog nama="Nisa" anak="Setiap tamu dapat 7 balon. Ada 4 tamu." />
          <Dialog nama="Farhan" anak="Kata setiap berarti kali." />
          <Dialog nama="Cinta" anak="4 × 7 = 28." />
          <Dialog nama="Hulu" anak="Tiap dan masing-masing juga berarti kali." />
          <Ikat jumlah={4} isi={7} />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Ada 7 anak. Masing-masing membawa 4 balon. Ucapkan bentuk kalinya dan hasilnya."
            periksa={(teks) => ucapKali(teks, "7", "tujuh", "4", "empat", "28", "dua puluh delapan")}
            petunjuk="Sebutkan kedua bilangan dan hasilnya."
            benar="7 × 4 = 28."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Kalimat cerita"
            visual={<Ikat jumlah={9} isi={6} />}
            pertanyaan="Ada 9 ikat. Tiap ikat 6 balon. Tulis kalimat kalinya."
            pesanSalah="Tiap berarti kali. Tulis jumlah ikat, isi ikat, dan hasilnya."
            bantuan="9 × 6 = 54."
            umpan="9 × 6 = 54."
            periksa={(teks) => kalimatKali(teks, "9", "6", "54")}
            alias={["54"]}
            konteks="9 × 6 = 54."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Ada 4 ikat. Tiap ikat 6 balon. Bentuk kalinya..."
          visual={<Ikat jumlah={4} isi={6} />}
          pilihan={[
            { huruf: "A", teks: "4 + 6" },
            { huruf: "B", teks: "4 × 6" },
            { huruf: "C", teks: "6 − 4" },
            { huruf: "D", teks: "4 × 4" },
          ]}
          benar="B"
          salah="Hitung jumlah ikat kali isi tiap ikat."
          umpan="4 × 6 = 24."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan perkalian dengan hasilnya."
          baris={[
            { kiri: "5 × 4", pilihan: PASANGAN_A, benar: "20" },
            { kiri: "6 × 6", pilihan: PASANGAN_A, benar: "36" },
            { kiri: "7 × 3", pilihan: PASANGAN_A, benar: "21" },
            { kiri: "8 × 8", pilihan: PASANGAN_A, benar: "64" },
          ]}
          umpan="20, 36, 21, dan 64."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Hitung 6 × 7, 4 × 4, 5 × 7, dan 6 × 4. Susun hasilnya dari yang kecil."
          acak={["35", "16", "42", "24"]}
          benar={["16", "24", "35", "42"]}
          umpan="16, 24, 35, 42."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "9 × 4 sama dengan 4 × 9.", benar: true },
            { teks: "8 × 6 = 42.", benar: false },
            { teks: "(2 × 5) × 3 sama dengan 2 × (5 × 3).", benar: true },
          ]}
          umpan="Yang pertama benar. 8 × 6 = 48. Kelompok yang beda tetap 30."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Mana yang hasilnya bukan 18?"
          pilihan={[
            { huruf: "A", teks: "3 × 6" },
            { huruf: "B", teks: "2 × 9" },
            { huruf: "C", teks: "6 × 3" },
            { huruf: "D", teks: "4 × 5" },
          ]}
          benar="D"
          salah="Hitung satu per satu."
          umpan="3 × 6, 2 × 9, dan 6 × 3 sama dengan 18. 4 × 5 = 20."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PERKALIAN.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu
        ikon="📊🦉"
        judul={kartu.judul}
        anak="Papan kios · contoh dan cara"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Penjumlahan berulang"
          src="/doodle-mtk/mtk-3-perkalian-sub1.jpg"
          alt="Lima ikat balon berjajar. Tiap ikat berisi angka yang sama."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlah kelompok kali isi tiap kelompok. Hasil bab ini sampai 100."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 4 + 4 + 4 + 4 + 4</p>
          <Ikat jumlah={5} isi={4} />
          <Langkah butir={["Angka 4 muncul 5 kali.", "Bentuknya 5 × 4.", "5 × 4 = 20."]} />
          <Rumus baris={[{ teks: "5 × 4 = 20", hasil: true }]} />
          <p className="text-sm font-black text-emerald-800">Batas bab ini: 10 × 10 = 100.</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="6 + 6 + 6 + 6. Ucapkan bentuk kalinya dan hasilnya."
            periksa={(teks) => ucapKali(teks, "4", "empat", "6", "enam", "24", "dua puluh empat")}
            petunjuk="Sebutkan berapa kali angka itu muncul, lalu hasilnya."
            benar="4 × 6 = 24."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak={"7 + 7 + 7"} />}
            pertanyaan="Tulis penjumlahan itu dan bentuk kalinya beserta hasilnya."
            pesanSalah="Hitung berapa kali angka 7 muncul."
            bantuan="7 + 7 + 7 = 3 × 7 = 21."
            umpan="3 × 7 = 21."
            periksa={(teks) => ulangKali(teks, "7+7+7", "3", "7", "21")}
            alias={["21"]}
            konteks="7 + 7 + 7 = 3 × 7 = 21."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Sifat pertukaran"
          src="/doodle-mtk/mtk-3-perkalian-sub2.jpg"
          alt="Dua kartu balon bertukar kiri dan kanan. Angka hasilnya sama."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["a × b sama dengan b × a. Kalau hafalan macet, balik posisinya."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 7 × 8</p>
          <Langkah butir={["7 × 8 = 56.", "Dibalik jadi 8 × 7.", "8 × 7 juga 56."]} />
          <Rumus
            baris={[
              { teks: "7 × 8 = 56", hasil: true },
              { teks: "8 × 7 = 56", hasil: true },
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="7 × 8 dan 8 × 7. Ucapkan hasilnya, lalu katakan sama atau beda."
            periksa={(teks) => hasilDanSama(teks, "56", "lima puluh enam")}
            petunjuk="Ucapkan hasilnya, lalu katakan sama atau beda."
            benar="Hasilnya 56. Sama."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak={"6 × 9    dan    9 × 6"} />}
            pertanyaan="Tulis kedua susunan itu beserta hasilnya."
            pesanSalah="Tulis kedua susunan."
            bantuan="6 × 9 = 54 dan 9 × 6 = 54."
            umpan="Hasilnya 54."
            periksa={(teks) => duaSusunan(teks, "6", "9", "54")}
            alias={["54"]}
            konteks="6 × 9 = 54 dan 9 × 6 = 54."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Sifat pengelompokan"
          src="/doodle-mtk/mtk-3-perkalian-sub3.jpg"
          alt="Tiga kelompok balon. Tanda kurung berpindah, jumlah balon tetap."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kerjakan yang di dalam kurung dulu. Kurung boleh berpindah."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 5 × 2 × 4</p>
          <Langkah butir={["(5 × 2) × 4 = 10 × 4 = 40.", "5 × (2 × 4) = 5 × 8 = 40."]} />
          <Rumus
            baris={[
              { teks: "(5 × 2) × 4 = 40", hasil: true },
              { teks: "5 × (2 × 4) = 40", hasil: true },
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="(5 × 2) × 4. Ucapkan hasil dalam kurung, lalu hasil akhirnya."
            periksa={(teks) => salahSatuLalu(teks, [["10", "sepuluh"]], ["40", "empat puluh"])}
            petunjuk="Sebutkan hasil dalam kurung, lalu hasil akhirnya."
            benar="Dalam kurung 10. Hasil akhirnya 40."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak={"3 × 3 × 2"} />}
            pertanyaan="Tulis satu langkah dan hasil akhirnya."
            pesanSalah="Kalikan dua angka dulu."
            bantuan="3 × 3 = 9, lalu 9 × 2 = 18. Atau 3 × 2 = 6, lalu 3 × 6 = 18."
            umpan="Hasilnya 18."
            periksa={(teks) =>
              salahSatuLalu(
                teks,
                [
                  ["9", "sembilan"],
                  ["6", "enam"],
                ],
                ["18", "delapan belas"],
              )
            }
            alias={["18"]}
            konteks="3 × 3 × 2 = 18."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Perkalian dua angka"
          src="/doodle-mtk/mtk-3-perkalian-sub4.jpg"
          alt="Angka 13 dipecah menjadi 10 dan 3, lalu masing-masing dikali 5."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Puluhan dikali dulu. Satuan dikali dulu. Lalu kedua hasil dijumlah."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 13 × 5</p>
          <Langkah butir={["13 = 10 + 3.", "10 × 5 = 50.", "3 × 5 = 15.", "50 + 15 = 65."]} />
          <Rumus
            baris={[
              { teks: "13 × 5" },
              { teks: "10 × 5 = 50" },
              { teks: "3 × 5 = 15" },
              { teks: "50 + 15 = 65", hasil: true },
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="13 × 5. Ucapkan hasil puluhan, hasil satuan, dan jumlahnya."
            periksa={(teks) =>
              semuaFrasa(teks, [
                ["50", "lima puluh"],
                ["15", "lima belas"],
                ["65", "enam puluh lima"],
              ])
            }
            petunjuk="Sebutkan tiga angka: hasil puluhan, hasil satuan, dan jumlahnya."
            benar="50, 15, dan 65."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak={"24 × 3"} />}
            pertanyaan="Tulis hasil puluhan, hasil satuan, dan jumlahnya."
            pesanSalah="Pecah 24 jadi 20 dan 4."
            bantuan="20 × 3 = 60. 4 × 3 = 12. 60 + 12 = 72."
            umpan="24 × 3 = 72."
            periksa={(teks) =>
              semuaFrasa(teks, [
                ["60", "enam puluh"],
                ["12", "dua belas"],
                ["72", "tujuh puluh dua"],
              ])
            }
            alias={["60", "12", "72"]}
            konteks="20 × 3 = 60, 4 × 3 = 12, 60 + 12 = 72."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita"
          src="/doodle-mtk/mtk-3-perkalian-sub5.jpg"
          alt="Delapan anak berdiri. Tiap anak memegang tujuh balon."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Cari kata setiap, tiap, atau masing-masing. Itu tanda perkalian."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 8 anak, tiap anak 7 balon</p>
          <Ikat jumlah={8} isi={7} />
          <Langkah butir={["Tiap berarti kali.", "8 × 7 = 56."]} />
          <Rumus baris={[{ teks: "8 × 7 = 56", hasil: true }]} />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="6 baris, setiap baris 9 balon. Ucapkan bentuk kalinya dan hasilnya."
            periksa={(teks) => ucapKali(teks, "6", "enam", "9", "sembilan", "54", "lima puluh empat")}
            petunjuk="Sebutkan kedua bilangan dan hasilnya."
            benar="6 × 9 = 54."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Ikat jumlah={5} isi={8} />}
            pertanyaan="5 dus, tiap dus 8 balon. Tulis kalimat kalinya."
            pesanSalah="Tiap berarti kali."
            bantuan="5 × 8 = 40."
            umpan="5 × 8 = 40."
            periksa={(teks) => kalimatKali(teks, "5", "8", "40")}
            alias={["40"]}
            konteks="5 × 8 = 40."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. 15 × 4 sama dengan..."
          visual={<Papan anak={"15 × 4"} />}
          pilihan={[
            { huruf: "A", teks: "45" },
            { huruf: "B", teks: "60" },
            { huruf: "C", teks: "50" },
            { huruf: "D", teks: "19" },
          ]}
          benar="B"
          salah="Pecah 15 jadi 10 dan 5."
          umpan="10 × 4 = 40. 5 × 4 = 20. 40 + 20 = 60."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan perkalian dua angka dengan hasilnya."
          baris={[
            { kiri: "12 × 3", pilihan: PASANGAN_B, benar: "36" },
            { kiri: "14 × 2", pilihan: PASANGAN_B, benar: "28" },
            { kiri: "11 × 5", pilihan: PASANGAN_B, benar: "55" },
            { kiri: "13 × 4", pilihan: PASANGAN_B, benar: "52" },
          ]}
          umpan="36, 28, 55, dan 52."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Hitung 9 × 5, 6 × 3, 8 × 4, dan 9 × 3. Susun hasilnya dari yang kecil."
          acak={["32", "18", "45", "27"]}
          benar={["18", "27", "32", "45"]}
          umpan="18, 27, 32, 45."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "6 × 9 sama dengan 9 × 6.", benar: true },
            { teks: "23 × 3 = 69.", benar: true },
            { teks: "8 × 7 = 54.", benar: false },
          ]}
          umpan="Dua yang pertama benar. 8 × 7 = 56."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. 4 × 5 = 20. Maka 4 × 8 sama dengan..."
          pilihan={[
            { huruf: "A", teks: "24" },
            { huruf: "B", teks: "28" },
            { huruf: "C", teks: "32" },
            { huruf: "D", teks: "36" },
          ]}
          benar="C"
          salah="Empat dikali delapan."
          umpan="4 × 8 = 32."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PERKALIAN.kartu[2];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="🎈🦉"
        judul={kartu.judul}
        anak="Sepuluh pos pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-perkalian-permainan.jpg"
        alt="Sepuluh pos balon di taman. Burung hantu Hulu memegang stempel."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_PERKALIAN}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_PERKALIAN}
          penutup="Sepuluh stempel terkumpul. Kios balon besar terbuka."
          bunga="🎈🦉⭐"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_PERKALIAN.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🦉 Penjaga Kios Ulung" : skor >= 6 ? "🎈 Perangkai Balon" : "🦉 Sahabat Hulu";
  const pesan =
    skor >= 9
      ? "Luar biasa! Perkalianmu cepat dan tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga kios."
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
        src="/doodle-mtk/mtk-3-perkalian-evaluasi.jpg"
        alt="Nisa, Farhan, dan Cinta mengerjakan soal di meja taman. Hulu menunggu di samping kios."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Enam kelompok"
          visual={<Ikat jumlah={6} isi={4} />}
          pertanyaan="Ada 6 kelompok. Tiap kelompok 4 balon. Tulis bentuk kalinya dan hasilnya."
          pesanSalah="Jumlah kelompok kali isi tiap kelompok."
          bantuan="6 × 4 = 24."
          umpan="6 × 4 = 24."
          periksa={(teks) => kalimatKali(teks, "6", "4", "24")}
          alias={["24"]}
          konteks="6 × 4 = 24."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. 9 × 5 dan 5 × 9. Yang benar..."
          pilihan={[
            { huruf: "A", teks: "Hasil pertama lebih besar" },
            { huruf: "B", teks: "Hasil kedua lebih besar" },
            { huruf: "C", teks: "Hasilnya sama" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="C"
          salah="Coba balik kedua bilangan."
          umpan="9 × 5 = 45 dan 5 × 9 = 45."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. (3 × 4) × 2. Ucapkan hasil dalam kurung, lalu hasil akhirnya."
          periksa={(teks) => salahSatuLalu(teks, [["12", "dua belas"]], ["24", "dua puluh empat"])}
          petunjuk="Sebutkan hasil dalam kurung, lalu hasil akhirnya."
          benar="Dalam kurung 12. Hasil akhirnya 24."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Mana yang hasilnya bukan 36?"
          pilihan={[
            { huruf: "A", teks: "6 × 6" },
            { huruf: "B", teks: "4 × 9" },
            { huruf: "C", teks: "9 × 4" },
            { huruf: "D", teks: "7 × 5" },
          ]}
          benar="D"
          salah="Hitung satu per satu."
          umpan="6 × 6, 4 × 9, dan 9 × 4 sama dengan 36. 7 × 5 = 35."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan perkalian dengan hasilnya."
          baris={[
            { kiri: "8 × 7", pilihan: PASANGAN_D, benar: "56" },
            { kiri: "9 × 8", pilihan: PASANGAN_D, benar: "72" },
            { kiri: "6 × 8", pilihan: PASANGAN_D, benar: "48" },
            { kiri: "7 × 9", pilihan: PASANGAN_D, benar: "63" },
          ]}
          umpan="56, 72, 48, dan 63."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Pecah 18"
          visual={<Papan anak={"18 × 4"} />}
          pertanyaan="Tulis hasil puluhan, hasil satuan, dan jumlahnya."
          pesanSalah="Pecah 18 jadi 10 dan 8."
          bantuan="10 × 4 = 40. 8 × 4 = 32. 40 + 32 = 72."
          umpan="18 × 4 = 72."
          periksa={(teks) =>
            semuaFrasa(teks, [
              ["40", "empat puluh"],
              ["32", "tiga puluh dua"],
              ["72", "tujuh puluh dua"],
            ])
          }
          alias={["40", "32", "72"]}
          konteks="10 × 4 = 40, 8 × 4 = 32, 40 + 32 = 72."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Hitung 6 × 7, 3 × 7, 5 × 7, dan 4 × 7. Susun hasilnya dari yang kecil."
          acak={["35", "21", "42", "28"]}
          benar={["21", "28", "35", "42"]}
          umpan="21, 28, 35, 42."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Periksa tiga pernyataan."
          baris={[
            { teks: "12 × 6 = 72.", benar: true },
            { teks: "15 × 3 = 40.", benar: false },
            { teks: "(4 × 2) × 3 sama dengan 4 × (2 × 3).", benar: true },
          ]}
          umpan="12 × 6 = 72. 15 × 3 = 45. Kelompok yang beda tetap 24."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Ada 7 ikat. Tiap ikat 8 balon. Ucapkan bentuk kalinya dan hasilnya."
          periksa={(teks) => ucapKali(teks, "7", "tujuh", "8", "delapan", "56", "lima puluh enam")}
          petunjuk="Sebutkan kedua bilangan dan hasilnya."
          benar="7 × 8 = 56."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kios A 6 × 8, kios B 9 × 5, kios C 7 × 6. Balon paling banyak ada di..."
          pilihan={[
            { huruf: "A", teks: "Kios A" },
            { huruf: "B", teks: "Kios B" },
            { huruf: "C", teks: "Kios C" },
            { huruf: "D", teks: "Ketiganya sama" },
          ]}
          benar="A"
          salah="Hitung ketiga kios, lalu bandingkan."
          umpan="A = 48, B = 45, C = 42. Kios A paling banyak."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
        <p className="text-center text-sm font-semibold text-slate-600">{pesan}</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Perkalian({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Perkalian mengulang penjumlahan yang sama.",
    "Jumlah kelompok kali isi tiap kelompok.",
    "Dua bilangan boleh bertukar tempat.",
    "Tiga bilangan boleh dikelompokkan dengan dua cara.",
    "Dua angka dipecah: puluhan dan satuan.",
    "Kata setiap, tiap, dan masing-masing berarti kali.",
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
          src: "/doodle-mtk/mtk-3-perkalian-poin.jpg",
          alt: "Burung hantu Hulu di samping kios balon, menunjuk enam kalimat kunci.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Perkalian mengulang penjumlahan yang sama.",
          "Dua bilangan boleh ditukar. Tiga bilangan boleh dikelompokkan dengan dua cara. Dua angka dipecah jadi puluhan dan satuan.",
          "Kalau ada kata setiap, tiap, atau masing-masing, itu tanda perkalian.",
        ])}
        poin={poin}
        penutup="Ulang, tukar, kelompokkan, pecah, lalu kali."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
