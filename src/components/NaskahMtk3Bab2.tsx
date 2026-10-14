"use client";

import GambarDoodle from "@/components/GambarDoodle";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import PanduanIkon from "@/components/PanduanIkon";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK3_BAB2, TEMA_MTK3_BAB2 } from "@/lib/misi-mtk-3-bab2";
import { MODUL_MTK3_BAB2 } from "@/lib/modul-resmi-mtk-3-bab2";
import {
  baca3775,
  baca3939,
  halteHulu,
  jumlah3999,
  jumlah4221,
  lebih5687,
  pinjam2768,
  pinjam3426,
  pinjam4077,
  pinjam5428,
  pinjam5436,
  sisa3175,
  sisa3450,
  simpan5931,
  simpan6601,
  tanpaPinjam4434,
  tanpaPinjam5342,
  tulis3674,
  tulis4205,
  tulis4212,
  tulis5443,
  tulis5236,
  tulis5756,
  tulis7678,
  tulisDuaSimpanSatu,
  tulisTigaSimpanSatu,
} from "@/lib/nilai-mtk-3-bab2";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_BAB2.id;

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

const RUMAH_ANGKA = ["Ribuan", "Ratusan", "Puluhan", "Satuan"] as const;

type CatatanKolom = { teks: string; panah?: boolean; coret?: boolean };

function digitEmpat(nilai: number): string[] {
  return String(nilai).padStart(4, "0").split("");
}

function TabelSusun({
  operasi,
  atas,
  bawah,
  hasil,
  catatan,
  kosong,
}: {
  operasi: "+" | "−";
  atas: number;
  bawah: number;
  hasil?: number;
  catatan?: Array<CatatanKolom | null>;
  kosong?: number | "atas";
}) {
  const barisAtas = digitEmpat(atas);
  const barisBawah = digitEmpat(bawah);
  const barisHasil = hasil === undefined ? null : digitEmpat(hasil);
  const adaCatatan = Boolean(catatan?.some(Boolean));

  const isiAtas = (indeks: number) => {
    if (kosong === "atas" || kosong === indeks) return "⬜";
    return barisAtas[indeks];
  };

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#1C01A5]/15 bg-white">
      <table className="w-full border-collapse text-center">
        <caption className="sr-only">
          Susunan {operasi === "+" ? "penjumlahan" : "pengurangan"} dari rumah ribuan sampai satuan
          {adaCatatan ? ". Angka kecil di atas adalah simpanan atau pinjaman, panah datang dari rumah kanan." : "."}
        </caption>
        <thead>
          <tr className="bg-[#1C01A5] text-white">
            <th className="w-8 px-1 py-2" />
            {RUMAH_ANGKA.map((nama) => (
              <th key={nama} className="px-1 py-2 text-[10px] font-black uppercase tracking-wide sm:text-xs">
                {nama}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {adaCatatan ? (
            <tr className="bg-amber-100 text-rose-700">
              <td className="px-1 py-1 text-xs font-black"> </td>
              {RUMAH_ANGKA.map((nama, indeks) => {
                const item = catatan?.[indeks];
                return (
                  <td key={nama} className="px-1 py-1 text-sm font-black sm:text-base">
                    {item ? (
                      <span aria-label={item.panah ? `${item.teks} dari rumah kanan` : item.teks}>
                        {item.panah ? <span aria-hidden>← </span> : null}
                        {item.teks}
                      </span>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ) : null}
          <tr className="bg-sky-50">
            <td className="px-1 py-2" />
            {barisAtas.map((_, indeks) => (
              <td key={RUMAH_ANGKA[indeks]} className="px-1 py-2 text-lg font-black text-[#1C01A5] sm:text-2xl">
                {catatan?.[indeks]?.coret && isiAtas(indeks) !== "⬜" ? (
                  <span className="line-through decoration-2 decoration-rose-600">{isiAtas(indeks)}</span>
                ) : (
                  isiAtas(indeks)
                )}
              </td>
            ))}
          </tr>
          <tr className="bg-violet-50">
            <td className="px-1 py-2 text-lg font-black text-[#1C01A5]">{operasi}</td>
            {barisBawah.map((angka, indeks) => (
              <td key={RUMAH_ANGKA[indeks]} className="px-1 py-2 text-lg font-black text-[#1C01A5] sm:text-2xl">
                {angka}
              </td>
            ))}
          </tr>
          {barisHasil ? (
            <tr className="border-t-2 border-[#1C01A5]/20 bg-emerald-100">
              <td className="px-1 py-2 text-lg font-black text-emerald-800">=</td>
              {barisHasil.map((angka, indeks) => (
                <td key={RUMAH_ANGKA[indeks]} className="px-1 py-2 text-lg font-black text-emerald-900 sm:text-2xl">
                  {angka}
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
}: {
  judul: string;
  warna?: string;
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
      <HasilJawabanKuis status={status} pesanSalah="Hitung lagi dari satuan, lalu pilih ulang." />
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

const HASIL_A = ["3.834", "3.535", "2.625"];
const TEKNIK_B = ["Tanpa menyimpan", "Menyimpan", "Meminjam"];
const HASIL_C = ["5.687", "3.834", "3.168"];
const KATA_CERITA = ["Tambah", "Kurang"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB2.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📚🦉"
        judul={kartu.judul}
        anak="Empat rak buku · tambah, simpan, kurang, pinjam"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Penjumlahan tanpa menyimpan"
          warna="border-sky-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub1.jpg"
          alt="Bus perpustakaan dan empat rak buku. Dua tumpukan buku belum ada yang tumpah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Penjumlahan bersusun dimulai dari kanan, dari rumah satuan.",
            "Kalau jumlah satu rumah masih satu angka, tulis saja. Belum ada yang disimpan.",
          ]}
        >
          <Dialog nama="Nisa" anak="Dua kardus buku: 2.431 dan 3.256. Kita jumlahkan dari kanan." />
          <Dialog nama="Farhan" anak="Ribuan dulu? 2 tambah 3 sama dengan 5." />
          <Dialog nama="Cinta" anak="Coba satuan dulu. 1 tambah 6. Masih satu angka?" />
          <Dialog nama="Farhan" anak="7. Muat di rak satuan." />
          <Dialog nama="Hulu" anak="Kalau setiap rumah hasilnya masih satu angka, tidak ada yang disimpan." />
          <Dialog nama="Nisa" anak="Puluhan 3 + 5 = 8. Ratusan 4 + 2 = 6. Ribuan 2 + 3 = 5." />
          <Dialog nama="Cinta" anak="Jadi 5.687. Tidak ada buku yang pindah ke rak kiri." />
          <TabelSusun operasi="+" atas={2431} bawah={3256} hasil={5687} />
          <p className="text-sm font-black text-emerald-800">Kesimpulan: hasil 0 sampai 9 ditulis langsung. Tidak ada simpanan.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Berapa hasil 1.324 + 2.451? Sebutkan juga dari rumah mana kamu mulai."
            periksa={baca3775}
            petunjuk="Jumlahkan dari satuan. Hasilnya tiga ribu tujuh ratus tujuh puluh lima."
            benar="Tiga ribu tujuh ratus tujuh puluh lima. Mulai dari satuan."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<TabelSusun operasi="+" atas={4102} bawah={3576} />}
            pertanyaan="Tulis hasilnya."
            pesanSalah="Jumlahkan dari satuan. Tidak ada yang sepuluh atau lebih."
            bantuan="2 + 6 = 8, 0 + 7 = 7, 1 + 5 = 6, 4 + 3 = 7."
            umpan="Hasilnya 7.678."
            periksa={tulis7678}
            alias={["7678"]}
            konteks="4.102 + 3.576 = 7.678."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Penjumlahan dengan menyimpan"
          warna="border-amber-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub2.jpg"
          alt="Satu rak buku tumpah. Sepuluh buku diikat dan dipindah ke rak di sebelah kiri."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau jumlah satu rumah sepuluh atau lebih, tulis angka satuannya.",
            "Sepuluhnya disimpan sebagai 1 di rumah sebelah kiri. Simpanan itu wajib dihitung.",
          ]}
        >
          <Dialog nama="Farhan" anak="Satuan 6 + 8 = 14. Rak satuan cuma muat satu angka!" />
          <Dialog nama="Nisa" anak="Tulis 4. Sepuluhnya jadi 1 di rak puluhan. Itu simpanan." />
          <Dialog nama="Cinta" anak="Puluhan 7 + 5, ditambah simpanan 1, jadi 13. Tulis 3, simpan 1 lagi." />
          <Dialog nama="Hulu" anak="Simpanan itu bukan angka baru. Itu sepuluh yang pindah ke kiri." />
          <Dialog nama="Nisa" anak="Ratusan 4 + 3 + 1 = 8. Ribuan 2 + 1 = 3. Hasilnya 3.834." />
          <TabelSusun
            operasi="+"
            atas={2476}
            bawah={1358}
            hasil={3834}
            catatan={[null, { teks: "1", panah: true }, { teks: "1", panah: true }, null]}
          />
          <p className="text-sm font-black text-emerald-800">Kesimpulan: lebih dari sembilan, tulis sisa dan simpan 1 ke kiri.</p>
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Pada 3.685 + 1.247, satuan 5 + 7 = 12. Apa yang ditulis di satuan, dan berapa yang disimpan?"
            periksa={tulisDuaSimpanSatu}
            petunjuk="Jangan tulis 12 utuh. Sebutkan angka yang ditulis dan angka yang disimpan."
            benar="Tulis 2, simpan 1."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<TabelSusun operasi="+" atas={1508} bawah={2697} />}
            pertanyaan="Tulis hasilnya. Ada simpanan di satuan, puluhan, dan ratusan."
            pesanSalah="8 + 7 = 15. Tulis 5, simpan 1. Jangan lupakan simpanan berikutnya."
            bantuan="Hasilnya 4.205."
            umpan="1.508 + 2.697 = 4.205."
            periksa={tulis4205}
            alias={["4205"]}
            konteks="1.508 + 2.697 = 4.205."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Pengurangan tanpa meminjam"
          warna="border-emerald-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub3.jpg"
          alt="Anak mengembalikan buku dari setiap rak. Setiap rak masih berisi cukup buku."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pengurangan juga dimulai dari satuan.",
            "Kalau angka atas cukup, kurangkan saja. Belum ada yang meminjam.",
          ]}
        >
          <Dialog nama="Cinta" anak="Rak ada 5.876 buku. Yang dipinjam 2.341." />
          <Dialog nama="Farhan" anak="Satuan 6 lebih besar dari 1. Tidak perlu pinjam?" />
          <Dialog nama="Hulu" anak="Betul. Kalau angka atas cukup, kurangkan saja." />
          <Dialog nama="Nisa" anak="6 − 1 = 5. 7 − 4 = 3. 8 − 3 = 5. 5 − 2 = 3." />
          <Dialog nama="Cinta" anak="Sisa 3.535. Tidak ada rak yang pinjam." />
          <TabelSusun operasi="−" atas={5876} bawah={2341} hasil={3535} />
          <p className="text-sm font-black text-emerald-800">Kesimpulan: angka atas cukup, langsung dikurangi.</p>
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Berapa hasil 6.749 − 2.315? Sebutkan juga apakah ada rumah yang meminjam."
            periksa={tanpaPinjam4434}
            petunjuk="Semua angka atas cukup. Ucapkan hasilnya, lalu katakan tidak meminjam."
            benar="Empat ribu empat ratus tiga puluh empat. Tidak meminjam."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<TabelSusun operasi="−" atas={8964} bawah={3521} />}
            pertanyaan="Tulis sisanya."
            pesanSalah="Kurangi dari satuan. Tidak ada yang perlu pinjam."
            bantuan="4 − 1 = 3, 6 − 2 = 4, 9 − 5 = 4, 8 − 3 = 5."
            umpan="Sisanya 5.443."
            periksa={tulis5443}
            alias={["5443"]}
            konteks="8.964 − 3.521 = 5.443."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Pengurangan dengan meminjam"
          warna="border-rose-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub4.jpg"
          alt="Satu rak kosong. Ikat buku dipinjam dari rak di sebelah kirinya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau angka atas lebih kecil, pinjam 1 dari rumah kiri. Pinjaman itu bernilai sepuluh.",
            "Kalau rumah di kirinya berisi 0, pinjaman dilanjutkan ke rumah yang masih ada isinya.",
          ]}
        >
          <Dialog nama="Farhan" anak="5.346 kurang 2.178. Satuan 6 lebih kecil dari 8!" />
          <Dialog nama="Nisa" anak="Pinjam 1 dari puluhan. Puluhan 4 jadi 3. Satuan jadi 16. 16 − 8 = 8." />
          <Dialog nama="Cinta" anak="Puluhan sekarang 3, bawahnya 7. Kurang lagi. Pinjam dari ratusan." />
          <Dialog nama="Hulu" anak="Satu pinjaman bernilai sepuluh di rumah yang menerima." />
          <Dialog nama="Nisa" anak="Ratusan 3 jadi 2, puluhan jadi 13. 13 − 7 = 6. Ratusan 2 − 1 = 1. Ribuan 5 − 2 = 3." />
          <Dialog nama="Cinta" anak="Sisa 3.168. Sekarang lihat 4.203 − 1.578. Puluhannya 0." />
          <Dialog nama="Hulu" anak="Nol tidak bisa memberi pinjaman. Pinjaman loncat ke ratusan. Hasilnya 2.625." />
          <div className="space-y-3">
            <TabelSusun
              operasi="−"
              atas={5346}
              bawah={2178}
              hasil={3168}
              catatan={[
                null,
                { teks: "2", coret: true },
                { teks: "13", panah: true, coret: true },
                { teks: "16", panah: true, coret: true },
              ]}
            />
            <TabelSusun
              operasi="−"
              atas={4203}
              bawah={1578}
              hasil={2625}
              catatan={[
                { teks: "3", coret: true },
                { teks: "11", panah: true, coret: true },
                { teks: "9", panah: true, coret: true },
                { teks: "13", panah: true, coret: true },
              ]}
            />
          </div>
          <p className="text-sm font-black text-emerald-800">Kesimpulan: yang dipinjam berkurang satu. Rumah nol meneruskan pinjaman ke kiri.</p>
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Berapa hasil 7.245 − 3.168? Sebutkan rumah yang meminjam."
            periksa={pinjam4077}
            petunjuk="Satuan dan puluhan sama-sama meminjam. Hasilnya empat ribu tujuh puluh tujuh."
            benar="Empat ribu tujuh puluh tujuh. Satuan dan puluhan meminjam."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<TabelSusun operasi="−" atas={5020} bawah={1346} />}
            pertanyaan="Tulis sisanya, lalu tulis kata pinjam."
            pesanSalah="Puluhan 2 tidak cukup untuk 4, dan ratusan berisi 0. Pinjam dari ribuan."
            bantuan="Hasilnya 3.674."
            umpan="5.020 − 1.346 = 3.674. Ada pinjaman."
            periksa={tulis3674}
            alias={["3674 pinjam"]}
            konteks="5.020 − 1.346 = 3.674."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita"
          warna="border-violet-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub5.jpg"
          alt="Kardus sumbangan tiba di halte buku, dan seorang anak meminjam satu buku."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pada soal cerita, baca kata kuncinya dulu.",
            "Datang, jumlah, dan semua berarti tambah. Dipinjam, sisa, dan terpakai berarti kurang.",
          ]}
        >
          <Dialog nama="Nisa" anak="Pagi ini rak punya 2.350 buku. Sumbangan datang 1.475." />
          <Dialog nama="Farhan" anak="Datang berarti tambah." />
          <Dialog nama="Cinta" anak="Satuan 0 + 5 = 5. Puluhan 5 + 7 = 12. Tulis 2, simpan 1." />
          <Dialog nama="Nisa" anak="Ratusan 3 + 4 + 1 = 8. Ribuan 2 + 1 = 3. Sekarang ada 3.825." />
          <Dialog nama="Hulu" anak="Kata kuncinya yang memilih operasi. Baru setelah itu kita menghitung." />
          <TabelSusun
            operasi="+"
            atas={2350}
            bawah={1475}
            hasil={3825}
            catatan={[null, { teks: "1", panah: true }, null, null]}
          />
          <p className="text-sm font-black text-emerald-800">Kesimpulan: tentukan tambah atau kurang sebelum menyusun hitungan.</p>
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Rak ada 4.260 buku. Dipinjam 1.085. Sebutkan sisanya dan operasinya."
            periksa={sisa3175}
            petunjuk="Dipinjam berarti kurang. Sisanya tiga ribu seratus tujuh puluh lima."
            benar="Tiga ribu seratus tujuh puluh lima. Operasinya kurang."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<TabelSusun operasi="+" atas={1864} bawah={2357} />}
            pertanyaan="Tulis jumlahnya, dan tulis kata tambah."
            pesanSalah="Datang berarti dijumlahkan. Jangan lupakan simpanannya."
            bantuan="1.864 + 2.357 = 4.221."
            umpan="Jumlahnya 4.221."
            periksa={jumlah4221}
            alias={["4221 tambah"]}
            konteks="1.864 + 2.357 = 4.221."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Pada 2.476 + 1.358, berapa yang disimpan dari satuan ke puluhan?"
          visual={<TabelSusun operasi="+" atas={2476} bawah={1358} />}
          pilihan={[
            { huruf: "A", teks: "0, karena 14 masih muat" },
            { huruf: "B", teks: "1, karena 14 berarti satu puluhan" },
            { huruf: "C", teks: "4, karena itulah yang ditulis" },
            { huruf: "D", teks: "6, karena angkanya 6" },
          ]}
          benar="B"
          umpan="Yang ditulis 4. Yang disimpan 1."
          salah="14 = 1 puluhan + 4 satuan."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan hitungan dengan hasilnya."
          baris={[
            { kiri: "2.476 + 1.358", pilihan: HASIL_A, benar: "3.834" },
            { kiri: "5.876 − 2.341", pilihan: HASIL_A, benar: "3.535" },
            { kiri: "4.203 − 1.578", pilihan: HASIL_A, benar: "2.625" },
          ]}
          umpan="3.834 menyimpan. 3.535 tanpa pinjam. 2.625 meminjam melewati nol."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun jejak 2.476 + 1.358 dari satuan ke ribuan."
          acak={["Ribuan: tulis 3", "Satuan: tulis 4, simpan 1", "Ratusan: tulis 8", "Puluhan: tulis 3, simpan 1"]}
          benar={["Satuan: tulis 4, simpan 1", "Puluhan: tulis 3, simpan 1", "Ratusan: tulis 8", "Ribuan: tulis 3"]}
          umpan="Dari kanan: tulis 4 simpan 1, tulis 3 simpan 1, tulis 8, tulis 3."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif rak. Periksa tiga pernyataan."
          baris={[
            { teks: "Penjumlahan bersusun dimulai dari satuan.", benar: true },
            { teks: "Jika 5 + 7 = 12, yang ditulis di satuan adalah 12.", benar: false },
            { teks: "Pada 4.203 − 1.578, satuan harus meminjam.", benar: true },
          ]}
          umpan="Benar, salah, benar. 12 ditulis sebagai 2, lalu simpan 1."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. 3.⬜25 + 1.460 = 4.885. Angka yang hilang adalah..."
          visual={<TabelSusun operasi="+" atas={3025} bawah={1460} hasil={4885} kosong={1} />}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "5" },
          ]}
          benar="C"
          umpan="4.885 − 1.460 = 3.425. Angka ratusannya 4."
          salah="Kurangkan 1.460 dari 4.885."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Lebih dari sembilan, simpan satu ke kiri."
          alias={["sembilan", "simpan"]}
          konteks="Lebih dari sembilan, simpan satu ke kiri."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB2.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu
        ikon="📊🦉"
        judul={kartu.judul}
        anak="Papan hitung · contoh dan cara"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Tanpa menyimpan"
          warna="border-sky-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub1.jpg"
          alt="Empat rak berlabel dan dua tumpukan buku yang masih muat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlah 0 sampai 9 ditulis di rumahnya. Tidak ada simpanan."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 1.203 + 4.571</p>
          <Langkah butir={["Satuan 3 + 1 = 4.", "Puluhan 0 + 7 = 7.", "Ratusan 2 + 5 = 7.", "Ribuan 1 + 4 = 5."]} />
          <TabelSusun operasi="+" atas={1203} bawah={4571} hasil={5774} />
          <p className="text-sm font-black text-emerald-800">Trik: masih satu angka? Tulis saja.</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Berapa 2.314 + 1.625? Sebutkan rumah tempat kamu mulai."
            periksa={baca3939}
            petunjuk="Mulai dari satuan. Hasilnya tiga ribu sembilan ratus tiga puluh sembilan."
            benar="Tiga ribu sembilan ratus tiga puluh sembilan. Mulai dari satuan."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<TabelSusun operasi="+" atas={3240} bawah={2516} />}
            pertanyaan="Tulis hasilnya."
            pesanSalah="Tidak ada yang sepuluh atau lebih."
            bantuan="0 + 6 = 6, 4 + 1 = 5, 2 + 5 = 7, 3 + 2 = 5."
            umpan="Hasilnya 5.756."
            periksa={tulis5756}
            alias={["5756"]}
            konteks="3.240 + 2.516 = 5.756."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Menyimpan"
          warna="border-amber-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub2.jpg"
          alt="Ikat sepuluh buku berpindah satu rak ke kiri."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Lebih dari sembilan: tulis angka belakang, simpan 1 ke kiri."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 4.278 + 1.653</p>
          <Langkah butir={["8 + 3 = 11, tulis 1, simpan 1.", "7 + 5 + 1 = 13, tulis 3, simpan 1.", "2 + 6 + 1 = 9.", "4 + 1 = 5."]} />
          <TabelSusun
            operasi="+"
            atas={4278}
            bawah={1653}
            hasil={5931}
            catatan={[null, { teks: "1", panah: true }, { teks: "1", panah: true }, null]}
          />
          <p className="text-sm font-black text-emerald-800">Trik: yang ditulis bukan 11, melainkan 1.</p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Pada 2.609 + 3.184, satuan 9 + 4 = 13. Apa yang ditulis, dan berapa yang disimpan?"
            periksa={tulisTigaSimpanSatu}
            petunjuk="Tulis angka satuannya, simpan puluhannya."
            benar="Tulis 3, simpan 1."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<TabelSusun operasi="+" atas={2847} bawah={1365} />}
            pertanyaan="Tulis hasilnya."
            pesanSalah="Ada simpanan di satuan, puluhan, dan ratusan."
            bantuan="Hasilnya 4.212."
            umpan="2.847 + 1.365 = 4.212."
            periksa={tulis4212}
            alias={["4212"]}
            konteks="2.847 + 1.365 = 4.212."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Tanpa meminjam"
          warna="border-emerald-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub3.jpg"
          alt="Buku keluar dari rak yang masih berisi cukup."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Angka atas cukup? Kurangi dari kanan. Tidak ada pinjaman."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 7.865 − 2.431</p>
          <Langkah butir={["5 − 1 = 4.", "6 − 3 = 3.", "8 − 4 = 4.", "7 − 2 = 5."]} />
          <TabelSusun operasi="−" atas={7865} bawah={2431} hasil={5434} />
          <p className="text-sm font-black text-emerald-800">Trik: cukup? Langsung kurang.</p>
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Berapa 9.578 − 4.236? Apakah ada yang meminjam?"
            periksa={tanpaPinjam5342}
            petunjuk="Ucapkan hasilnya, lalu katakan tidak meminjam."
            benar="Lima ribu tiga ratus empat puluh dua. Tidak meminjam."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<TabelSusun operasi="−" atas={6489} bawah={1253} />}
            pertanyaan="Tulis sisanya."
            pesanSalah="Semua angka atas lebih besar."
            bantuan="9 − 3 = 6, 8 − 5 = 3, 4 − 2 = 2, 6 − 1 = 5."
            umpan="Sisanya 5.236."
            periksa={tulis5236}
            alias={["5236"]}
            konteks="6.489 − 1.253 = 5.236."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Meminjam melewati nol"
          warna="border-rose-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub4.jpg"
          alt="Rak tengah kosong, pinjaman datang dari rak paling kiri."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Rumah yang berisi 0 tidak bisa memberi pinjaman. Lanjutkan ke kiri."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 8.045 − 2.617</p>
          <Langkah butir={["Satuan 5 pinjam. Puluhan 4 jadi 3, satuan 15 − 7 = 8.", "Puluhan 3 − 1 = 2.", "Ratusan 0, jadi pinjam dari ribuan. 10 − 6 = 4.", "Ribuan 7 − 2 = 5."]} />
          <TabelSusun
            operasi="−"
            atas={8045}
            bawah={2617}
            hasil={5428}
            catatan={[
              { teks: "7", coret: true },
              { teks: "10", panah: true, coret: true },
              { teks: "3", coret: true },
              { teks: "15", panah: true, coret: true },
            ]}
          />
          <p className="text-sm font-black text-emerald-800">Trik: rumah 0 meneruskan pinjaman.</p>
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Berapa 8.045 − 2.617? Sebutkan rumah kosong yang harus meminjam."
            periksa={pinjam5428}
            petunjuk="Ratusan kosong, jadi sebutkan ratusan dan hasilnya."
            benar="Lima ribu empat ratus dua puluh delapan. Ratusan meminjam dari ribuan."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<TabelSusun operasi="−" atas={4006} bawah={1238} />}
            pertanyaan="Tulis sisanya, lalu tulis rumah awal pinjamannya: ribuan."
            pesanSalah="Puluhan dan ratusan berisi 0. Pinjaman dimulai dari ribuan."
            bantuan="Hasilnya 2.768."
            umpan="4.006 − 1.238 = 2.768. Pinjam dari ribuan."
            periksa={pinjam2768}
            alias={["2768 ribuan"]}
            konteks="4.006 − 1.238 = 2.768."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita"
          warna="border-violet-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub5.jpg"
          alt="Dua catatan di meja: buku terpakai dan buku yang dijumlahkan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pilih operasi dari kata kunci, baru hitung dari satuan."]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: ada 3.480 pensil, terpakai 1.265. Sisa?</p>
          <Langkah butir={["Terpakai berarti kurang.", "0 pinjam, 10 − 5 = 5.", "7 − 6 = 1. 4 − 2 = 2. 3 − 1 = 2."]} />
          <TabelSusun
            operasi="−"
            atas={3480}
            bawah={1265}
            hasil={2215}
            catatan={[null, null, { teks: "7", coret: true }, { teks: "10", panah: true, coret: true }]}
          />
          <p className="text-sm font-black text-emerald-800">Trik: baca kata kerjanya dulu.</p>
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Rak A 2.146 buku, rak B 1.853 buku. Sebutkan jumlahnya dan operasinya."
            periksa={jumlah3999}
            petunjuk="Dua rak digabung berarti tambah. Hasilnya tiga ribu sembilan ratus sembilan puluh sembilan."
            benar="Tiga ribu sembilan ratus sembilan puluh sembilan. Operasinya tambah."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<TabelSusun operasi="−" atas={5200} bawah={1750} />}
            pertanyaan="Tulis sisanya, dan tulis kata kurang."
            pesanSalah="Dibagikan berarti pengurangan. Ratusan berisi 2, puluhan berisi 0."
            bantuan="5.200 − 1.750 = 3.450."
            umpan="Sisanya 3.450."
            periksa={sisa3450}
            alias={["3450 kurang"]}
            konteks="5.200 − 1.750 = 3.450."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Angka 1 yang ditulis di satuan pada 4.278 + 1.653 berasal dari..."
          visual={<TabelSusun operasi="+" atas={4278} bawah={1653} />}
          pilihan={[
            { huruf: "A", teks: "Simpanan dari puluhan" },
            { huruf: "B", teks: "Sisa dari 11, yaitu angka 1" },
            { huruf: "C", teks: "Angka ribuan" },
            { huruf: "D", teks: "Hasil peminjaman" },
          ]}
          benar="B"
          umpan="11 ditulis 1, simpanan 1 naik ke puluhan."
          salah="Lihat satuan dulu: 8 + 3."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan hitungan dengan tekniknya."
          baris={[
            { kiri: "2.431 + 3.256", pilihan: TEKNIK_B, benar: "Tanpa menyimpan" },
            { kiri: "2.476 + 1.358", pilihan: TEKNIK_B, benar: "Menyimpan" },
            { kiri: "5.346 − 2.178", pilihan: TEKNIK_B, benar: "Meminjam" },
          ]}
          umpan="Yang pertama muat semua. Yang kedua menyimpan. Yang ketiga meminjam."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun hasil ini dari yang terkecil."
          acak={["5.434", "2.768", "3.168"]}
          benar={["2.768", "3.168", "5.434"]}
          umpan="2.768, lalu 3.168, lalu 5.434."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Cek papan."
          baris={[
            { teks: "Menyimpan 1 berarti sepuluh pindah ke rumah kiri.", benar: true },
            { teks: "Jika angka atas lebih kecil, kurangi tanpa meminjam.", benar: false },
            { teks: "Kata sisa pada soal cerita berarti pengurangan.", benar: true },
          ]}
          umpan="Benar, salah, benar. Angka atas yang lebih kecil harus meminjam."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. 5.2⬜0 − 1.346 = 3.674. Angka yang hilang adalah..."
          visual={<TabelSusun operasi="−" atas={5200} bawah={1346} hasil={3674} kosong={2} />}
          pilihan={[
            { huruf: "A", teks: "0" },
            { huruf: "B", teks: "2" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "5" },
          ]}
          benar="A"
          umpan="3.674 + 1.346 = 5.020. Angka puluhannya 0."
          salah="Jumlahkan 3.674 dan 1.346 untuk menemukan bilangan atasnya."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Kurang tidak cukup, pinjam satu dari kiri."
          alias={["pinjam", "kiri"]}
          konteks="Kurang tidak cukup, pinjam satu dari kiri."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB2.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🔖🦉"
        judul={kartu.judul}
        anak="Sepuluh giliran · stempel rak"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-bab2-permainan.jpg"
        alt="Burung hantu di meja perpustakaan keliling, memegang stempel. Rak buku dan bus di belakangnya."
        ukuran="lebar"
      />
      <PanduanIkon
        judul="Simbol rak"
        butir={[
          { ikon: "📚", teks: "Buku masuk" },
          { ikon: "📌", teks: "Simpan" },
          { ikon: "📖", teks: "Buku dipinjam" },
          { ikon: "🔄", teks: "Pinjam rumah" },
          { ikon: "🦉", teks: "Hulu" },
        ]}
      />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu petugas rak. Buku masuk dijumlahkan. Buku keluar dikurangi. Catatan benar mendapat stempel.</p>
        <p>Level 1: 2.431 + 3.256. Level 2: 6 + 8 = 14, tulis 4 simpan 1. Level 3: 5.876 − 2.341, tanpa meminjam.</p>
        <p>Level 4: 5.346 − 2.178. Level 5: pada 4.203 − 1.578, puluhan 0 jadi pinjaman loncat ke ratusan.</p>
        <p>Meja pemula soalnya langsung, hadiahnya 1 stempel. Meja halte soalnya bertingkat, hadiahnya lebih besar.</p>
        <p>Kaca rak membantu melihat rumah angka, tetapi mengurangi 1 stempel. Berani tanpa kaca menambah 1 stempel.</p>
        <p>Salah hitung tidak mengurangi stempel. Rak berkedip, lalu kamu boleh mengulang.</p>
        <p>Mode berdua: pemain A menghitung tambah, pemain B menghitung kurang. Keduanya harus bertemu di angka yang sama.</p>
        <p>Kumpulkan 10 stempel untuk membuka meja pustakawan.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK3_BAB2}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK3_BAB2}
        penutup="Meja pustakawan terbuka. Hulu memasang lencana petugas rak."
        bunga="📚📌📖🦉"
      />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal giliran rak</h5>
        <Pilih
          id={idKuis("C", 10)}
          pertanyaan="1. Berapa 4.278 + 1.653?"
          pilihan={[
            { huruf: "A", teks: "5.931" },
            { huruf: "B", teks: "5.831" },
            { huruf: "C", teks: "5.941" },
            { huruf: "D", teks: "6.931" },
          ]}
          benar="A"
          umpan="Satuan dan puluhan menyimpan. Hasilnya 5.931."
          salah="Jangan lupakan dua simpanan."
        />
        <Pilih
          id={idKuis("C", 11)}
          pertanyaan="2. Satuan 5 + 7 = 12. Apa yang harus dilakukan?"
          pilihan={[
            { huruf: "A", teks: "Tulis 12 di satuan" },
            { huruf: "B", teks: "Tulis 2, simpan 1 ke puluhan" },
            { huruf: "C", teks: "Tulis 1, simpan 2" },
            { huruf: "D", teks: "Tidak menjumlah satuan" },
          ]}
          benar="B"
          umpan="12 tidak muat di satu rumah. Tulis 2, simpan 1."
          salah="Pisahkan sepuluh dan sisanya."
        />
        <KuisCocok
          id={idKuis("C", 12)}
          perintah="3. Pasangkan hitungan dengan hasilnya."
          baris={[
            { kiri: "2.431 + 3.256", pilihan: HASIL_C, benar: "5.687" },
            { kiri: "2.476 + 1.358", pilihan: HASIL_C, benar: "3.834" },
            { kiri: "5.346 − 2.178", pilihan: HASIL_C, benar: "3.168" },
          ]}
          umpan="5.687, 3.834, dan 3.168."
        />
        <SusunToken
          id={idKuis("C", 13)}
          perintah="4. Susun sisa buku dari yang terkecil."
          acak={["4.221", "2.625", "2.215", "3.535"]}
          benar={["2.215", "2.625", "3.535", "4.221"]}
          umpan="2.215, 2.625, 3.535, 4.221."
        />
        <KuisBenarSalah
          id={idKuis("C", 14)}
          perintah="5. Cek catatan Hulu."
          baris={[
            { teks: "2.431 + 3.256 tidak menyimpan.", benar: true },
            { teks: "4.203 − 1.578 bisa dikerjakan tanpa meminjam.", benar: false },
            { teks: "Kata sisa berarti pengurangan.", benar: true },
          ]}
          umpan="Benar, salah, benar. 3 lebih kecil dari 8, jadi satuan meminjam."
        />
        <Pilih
          id={idKuis("C", 15)}
          pertanyaan="6. ⬜ + 1.358 = 3.834. Bilangan yang hilang adalah..."
          visual={<TabelSusun operasi="+" atas={0} bawah={1358} hasil={3834} kosong="atas" />}
          pilihan={[
            { huruf: "A", teks: "2.476" },
            { huruf: "B", teks: "2.486" },
            { huruf: "C", teks: "1.476" },
            { huruf: "D", teks: "2.576" },
          ]}
          benar="A"
          umpan="3.834 − 1.358 = 2.476."
          salah="Kurangkan 1.358 dari 3.834."
        />
        <Pilih
          id={idKuis("C", 16)}
          pertanyaan="7. Berapa 7.003 − 2.456?"
          pilihan={[
            { huruf: "A", teks: "4.547" },
            { huruf: "B", teks: "4.557" },
            { huruf: "C", teks: "5.547" },
            { huruf: "D", teks: "4.647" },
          ]}
          benar="A"
          umpan="Puluhan dan ratusan 0. Pinjaman dari ribuan. Sisanya 4.547."
          salah="Ada dua nol di tengah. Pinjaman berantai."
        />
        <Pilih
          id={idKuis("C", 17)}
          pertanyaan="8. Deret naik 1.250: 1.200 – 2.450 – 3.700 – ⬜. Berikutnya..."
          pilihan={[
            { huruf: "A", teks: "4.850" },
            { huruf: "B", teks: "4.950" },
            { huruf: "C", teks: "4.900" },
            { huruf: "D", teks: "5.050" },
          ]}
          benar="B"
          umpan="3.700 + 1.250 = 4.950."
          salah="Tambahkan 1.250 pada 3.700."
        />
        <KuisSuara
          id={idKuis("C", 18)}
          pertanyaan="Ucapkan hasil 6.004 − 2.578, lalu sebutkan rumah awal pinjamannya."
          periksa={pinjam3426}
          petunjuk="Puluhan dan ratusan berisi 0. Hasilnya tiga ribu empat ratus dua puluh enam."
          benar="Tiga ribu empat ratus dua puluh enam. Pinjam dari ribuan."
        />
        <TulisBebas
          id={idKuis("C", 19)}
          judul="Jejak simpanan"
          visual={<TabelSusun operasi="+" atas={4278} bawah={1653} />}
          pertanyaan="Tulis hasilnya, lalu tulis berapa kali kamu menyimpan."
          pesanSalah="Satuan dan puluhan menyimpan. Ratusan tidak."
          bantuan="Hasilnya 5.931. Menyimpan dua kali."
          umpan="5.931, menyimpan dua kali."
          periksa={simpan5931}
          alias={["5931 dua"]}
          konteks="4.278 + 1.653 = 5.931. Menyimpan dua kali."
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_BAB2.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Pustakawan Ahli" : skor >= 6 ? "🦉 Petugas Rak Cerdas" : "📚 Sahabat Hulu";
  const pesan =
    skor >= 9
      ? "Luar biasa! Catatan rakmu rapi dan bisa dicek ulang!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi pustakawan ahli!"
        : "Ayo hitung lagi bersama Hulu, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🦉"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-bab2-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan stempel. Burung hantu berdiri di tepi meja."
        ukuran="lebar"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Pinjaman melewati nol"
          visual={<TabelSusun operasi="−" atas={8003} bawah={2567} />}
          pertanyaan="Tulis sisanya, lalu tulis rumah awal pinjamannya."
          pesanSalah="Puluhan dan ratusan berisi 0. Pinjaman dimulai dari ribuan."
          bantuan="Hasilnya 5.436. Pinjam dari ribuan."
          umpan="8.003 − 2.567 = 5.436."
          periksa={pinjam5436}
          alias={["5436 ribuan"]}
          konteks="8.003 − 2.567 = 5.436."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Pada 2.476 + 1.358, apa yang ditulis di puluhan?"
          visual={<TabelSusun operasi="+" atas={2476} bawah={1358} />}
          pilihan={[
            { huruf: "A", teks: "3, karena ada simpanan 1 dari satuan" },
            { huruf: "B", teks: "12, karena 7 + 5" },
            { huruf: "C", teks: "2, karena simpanannya dibuang" },
            { huruf: "D", teks: "7, karena angkanya 7" },
          ]}
          benar="A"
          umpan="7 + 5 + 1 = 13. Tulis 3, simpan 1 ke ratusan."
          salah="Jangan lupakan simpanan dari satuan."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="Ada 5.200 kartu, dibagikan 1.750. Ucapkan sisanya dan operasi yang kamu pakai."
          periksa={sisa3450}
          petunjuk="Dibagikan berarti kurang. Sisanya tiga ribu empat ratus lima puluh."
          benar="Tiga ribu empat ratus lima puluh. Operasinya kurang."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="3. Farhan menulis 12 di satuan karena 5 + 7 = 12. Apakah Farhan benar?"
          pilihan={[
            { huruf: "A", teks: "Benar, 12 ditulis utuh" },
            { huruf: "B", teks: "Salah, tulis 2 dan simpan 1" },
            { huruf: "C", teks: "Salah, tulis 1 dan simpan 2" },
            { huruf: "D", teks: "Salah, satuan tidak dijumlah" },
          ]}
          benar="B"
          umpan="Angka 12 benar sebagai jumlah, tetapi yang ditulis di satuan hanya 2."
          salah="Satu rumah hanya muat satu angka."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan kata cerita dengan operasinya."
          baris={[
            { kiri: "datang lagi", pilihan: KATA_CERITA, benar: "Tambah" },
            { kiri: "dipinjam", pilihan: KATA_CERITA, benar: "Kurang" },
            { kiri: "sisa di rak", pilihan: KATA_CERITA, benar: "Kurang" },
          ]}
          umpan="Datang berarti tambah. Dipinjam dan sisa berarti kurang."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Berapa kali menyimpan?"
          visual={<TabelSusun operasi="+" atas={3756} bawah={2845} />}
          pertanyaan="Tulis hasilnya, lalu tulis berapa kali kamu menyimpan."
          pesanSalah="Satuan, puluhan, dan ratusan semuanya menyimpan."
          bantuan="Hasilnya 6.601. Menyimpan tiga kali."
          umpan="6.601, menyimpan tiga kali."
          periksa={simpan6601}
          alias={["6601 tiga"]}
          konteks="3.756 + 2.845 = 6.601."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Deret naik 1.250: 1.050 – 2.300 – 3.550 – ⬜. Berikutnya..."
          pilihan={[
            { huruf: "A", teks: "4.700" },
            { huruf: "B", teks: "4.800" },
            { huruf: "C", teks: "4.850" },
            { huruf: "D", teks: "5.000" },
          ]}
          benar="B"
          umpan="3.550 + 1.250 = 4.800."
          salah="Tambahkan 1.250 pada 3.550."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari yang terbesar."
          acak={["2.768", "5.931", "6.601", "4.547"]}
          benar={["6.601", "5.931", "4.547", "2.768"]}
          umpan="6.601, 5.931, 4.547, 2.768."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="Mana yang lebih besar, 2.431 + 3.256 atau 5.876 − 2.341? Sebutkan hasilnya dan rumah yang membuatnya lebih besar."
          periksa={lebih5687}
          petunjuk="Hitung keduanya dulu. Yang besar lima ribu enam ratus delapan puluh tujuh."
          benar="Lima ribu enam ratus delapan puluh tujuh lebih besar karena ribuannya 5."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Catatan halte Hulu"
          visual={<Papan anak={"Pagi 3.480\nDatang 1.265\nDipinjam 2.180"} />}
          pertanyaan="Tulis jumlah setelah sumbangan, sisa setelah dipinjam, dan selisih sumbangan dengan pinjaman."
          pesanSalah="Tambah dulu, kurang kemudian, lalu kurangkan 1.265 dari 2.180."
          bantuan="4.745, lalu 2.565, lalu selisih 915."
          umpan="4.745, 2.565, dan 915."
          periksa={halteHulu}
          alias={["4745 2565 915"]}
          konteks="3.480 + 1.265 = 4.745. 4.745 − 2.180 = 2.565. 2.180 − 1.265 = 915."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis dua kata kunci: satuan dulu, simpanan dihitung."
          alias={["satuan", "simpan"]}
          konteks="Satuan dulu, simpanan dihitung."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">Soal memakai bilangan sampai 10.000: penjumlahan, pengurangan, menyimpan, meminjam, dan soal cerita.</p>
        <p className="mt-2">Di kelas 3, Hulu menanyakan mengapa sebuah rumah menyimpan atau meminjam. Quiz meminta alasan, bukan hanya hasil.</p>
        <p className="mt-2">Kesalahan yang paling sering: menulis 12 utuh di satu rumah, lupa menambahkan simpanan, dan mengubah 0 menjadi 10 tanpa mengurangi rumah yang memberi pinjaman.</p>
        <p className="mt-2">Soal 1, 3, dan 10 menyasar ketiganya. Soal 3 adalah soal kunci: jumlah 12 benar, tetapi yang ditulis di satuan hanya 2. Soal 6, 8, dan 9 menilai alasan. Bahasa sederhana tetap dinilai penuh bila alasannya tepat.</p>
        <p className="mt-2">Soal 10 tiga langkah: setelah sumbangan 4.745, setelah dipinjam 2.565, lalu selisih 2.180 − 1.265 = 915. Jika anak hanya menyelesaikan bagian pertama, minta ia membaca dua bagian berikutnya.</p>
        <p className="mt-2">Gunakan ikat sepuluh buku atau stik. Minta anak memindahkan satu ikat ke rak kiri saat jumlahnya 10 atau lebih, dan memecah satu ikat saat rak kanan kurang. Siapkan rak kosong supaya pinjaman melewati nol terlihat.</p>
      </aside>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Bab2({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Mulai dari satuan. Naik ke kiri satu rumah demi satu rumah.",
    "Lebih dari sembilan? Tulis sisa, simpan 1 ke kiri.",
    "Simpanan kecil itu wajib dijumlahkan.",
    "Angka atas kurang? Pinjam 1 dari kiri. Nilainya sepuluh.",
    "Rumah yang berisi 0 tidak bisa memberi pinjaman.",
    "Datang dan jumlah berarti tambah. Dipinjam, sisa, dan terpakai berarti kurang.",
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
          src: "/doodle-mtk/mtk-3-bab2-poin.jpg",
          alt: "Burung hantu Hulu membentangkan lima kartu kunci di depan rak buku.",
        }}
        cuplikan={cuplikanKalimat([
          "Mari kita rumuskan hitungan hari ini. Penjumlahan dan pengurangan dimulai dari satuan.",
          "Kalau lebih dari sembilan, tulis sisa dan simpan satu ke kiri. Kalau angka atas kurang, pinjam satu dari kiri.",
          "Rumah yang berisi nol tidak bisa memberi pinjaman. Pada soal cerita, kata kuncinya yang memilih operasi.",
        ])}
        poin={poin}
        penutup="Satuan dulu. Simpanan dihitung. Nol meneruskan pinjaman."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
