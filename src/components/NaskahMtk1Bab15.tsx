"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB15 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB15 } from "@/lib/tema-misi-mtk-1";
import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import PanduanIkon, { type ButirIkon } from "@/components/PanduanIkon";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB15 } from "@/lib/modul-resmi-mtk-1-bab15";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB15.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function naskah(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function uang(teks: string): string {
  return naskah(teks).replace(/(^|\s)(\d{1,2})\s+(\d{3})(?=\s|$)/g, "$1$2$3");
}

function kataUtuh(teks: string, kata: string): boolean {
  return new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function adaNominal(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\s)${angka}(?:\\s|$)`).test(` ${uang(teks)} `);
}

function cariAngka(sumber: string, angka: string, mulai: number): number {
  const re = new RegExp(`(?:^|\\s)${angka}(?=\\s|$)`, "g");
  let cocok: RegExpExecArray | null;
  while ((cocok = re.exec(sumber))) {
    const indeks = cocok.index + (cocok[0].startsWith(" ") ? 1 : 0);
    if (indeks >= mulai) return indeks;
    if (cocok.index === re.lastIndex) re.lastIndex += 1;
  }
  return -1;
}

function nilaiRibu(teks: string, kata: string, angka: string): boolean {
  if (adaNominal(teks, angka)) return true;
  const biasa = naskah(teks);
  if (kata === "satu") {
    if (/(?:^|\s)(?:dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh)\s+ribu/.test(biasa)) return false;
    return /(?:^|\s)(?:seribu|satu ribu)(?:\s|$)/.test(` ${biasa} `);
  }
  if (kata === "sepuluh") return /(?:^|\s)sepuluh ribu(?:\s|$)/.test(` ${biasa} `);
  if (new RegExp(`(?:^|\\s)${kata} (?:belas|puluh|ratus)(?:\\s|$)`).test(` ${biasa} `)) return false;
  return new RegExp(`(?:^|\\s)${kata} ribu(?:\\s|$)`).test(` ${biasa} `);
}

function nilaiRatus(teks: string, kata: string, angka: string): boolean {
  const biasa = naskah(teks);
  if (biasa.includes("ribu") || biasa.includes("belas")) return false;
  if (adaNominal(teks, angka)) return true;
  if (kata === "seratus") return /(?:^|\s)seratus(?:\s|$)/.test(` ${biasa} `);
  return new RegExp(`(?:^|\\s)${kata} ratus(?:\\s|$)`).test(` ${biasa} `);
}

function hitungLembar(teks: string, kata: string, angka: string): boolean {
  const biasa = naskah(teks);
  if (/ribu|ratus|belas|puluh/.test(biasa)) return false;
  return kataUtuh(teks, kata) || adaNominal(teks, angka);
}

function urutNilai(teks: string, daftar: { frasa: string[]; angka: string }[]): boolean {
  const sumber = uang(teks);
  let mulai = 0;
  for (const item of daftar) {
    const iAngka = cariAngka(sumber, item.angka, mulai);
    let iFrasa = -1;
    for (const frasa of item.frasa) {
      const indeks = sumber.indexOf(frasa, mulai);
      if (indeks >= 0 && (iFrasa < 0 || indeks < iFrasa)) iFrasa = indeks;
    }
    const kandidat = [iAngka, iFrasa].filter((indeks) => indeks >= 0);
    if (kandidat.length === 0) return false;
    mulai = Math.min(...kandidat) + 1;
  }
  return true;
}

const UANG_KERTAS = [
  { frasa: ["seribu", "satu ribu"], angka: "1000" },
  { frasa: ["dua ribu"], angka: "2000" },
  { frasa: ["lima ribu"], angka: "5000" },
  { frasa: ["sepuluh ribu"], angka: "10000" },
];

const UANG_LOGAM = [
  { frasa: ["seratus"], angka: "100" },
  { frasa: ["dua ratus"], angka: "200" },
  { frasa: ["lima ratus"], angka: "500" },
  { frasa: ["seribu", "satu ribu"], angka: "1000" },
];

const UANG_CAMPUR = [
  { frasa: ["seratus"], angka: "100" },
  { frasa: ["lima ratus"], angka: "500" },
  { frasa: ["seribu", "satu ribu"], angka: "1000" },
  { frasa: ["lima ribu"], angka: "5000" },
  { frasa: ["sepuluh ribu"], angka: "10000" },
];

function adaKembalian(
  teks: string,
  bayar: string,
  harga: string,
  hasilKata: string,
  hasilAngka: string,
): boolean {
  if (!nilaiRibu(teks, hasilKata, hasilAngka)) return false;
  const biasa = naskah(teks);
  const sumber = uang(teks);
  return (
    biasa.includes("kurang") ||
    biasa.includes("-") ||
    biasa.includes("kembali") ||
    (cariAngka(sumber, bayar, 0) >= 0 && cariAngka(sumber, harga, 0) >= 0)
  );
}

function samaNilai(teks: string): boolean {
  return kataUtuh(teks, "sama") && !naskah(teks).includes("tidak");
}

function tidakCukup(teks: string): boolean {
  const biasa = naskah(teks);
  if (!biasa.includes("tidak") || !biasa.includes("cukup")) return false;
  return /kurang|kecil/.test(biasa) || nilaiRibu(teks, "tiga", "3000") || adaNominal(teks, "8000");
}

function notaLima(teks: string): boolean {
  const biasa = naskah(teks);
  if (!(biasa.includes("total") || biasa.includes("jumlah")) || !biasa.includes("kembali")) return false;
  const sumber = uang(teks);
  const hitung = sumber.split("5000").length - 1 + biasa.split("lima ribu").length - 1;
  return hitung >= 2;
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
  Rara: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bimo: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Rara: "👧",
  Bimo: "👦",
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
    <p className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
      {anak}
    </p>
  );
}

function TombolPenjelasan({
  kelas,
  kelamin,
  kalimat,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  kalimat: string[];
}) {
  return (
    <div className="mt-3">
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kalimat)} />
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
  warna,
  src,
  alt,
  kelas,
  kelamin,
  penjelasan,
  simbol,
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  simbol?: ButirIkon[];
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolPenjelasan kelas={kelas} kelamin={kelamin} kalimat={penjelasan} />
      {simbol ? <PanduanIkon butir={simbol} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({
  id,
  pertanyaan,
  periksa,
  petunjuk,
}: {
  id: string;
  pertanyaan: string;
  periksa: (teks: string) => boolean;
  petunjuk: string;
}) {
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} />
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
  umpan: string;
  periksa: (teks: string) => boolean;
  alias?: string[];
  konteks?: string;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
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
  salah = "Lihat angkanya, lalu susun lagi.",
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
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join(" ") || "…"}</p>
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
        className="mt-3 rounded-full bg-violet-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa
      </button>
      <HasilJawabanKuis status={status} pesanSalah="Cek lagi: beli dijumlahkan, kembalian dikurangi." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function GambarDoodle({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB15.kartu[0];
  const tukar = ["💵 1.000 × 5", "💵 1.000 × 10", "💵 1.000 × 2"];
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu ikon="👧👦🦉" judul={kartu.judul} anak="Rara, Bimo, dan Igil di warung" />
      <div className="mt-4">
        <TujuanBelajar
        butir={[
          "Siswa bisa mengenal pecahan uang rupiah.",
          "Siswa bisa menghitung sederhana dalam jual-beli, termasuk kembalian.",
          "Siswa bisa menyelesaikan soal campuran sehari-hari.",
        ]}
      />
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 · Mengenal Pecahan Uang Rupiah"
          simbol={[
            { ikon: "💵", teks: "Uang kertas" },
            { ikon: "🪙", teks: "Uang logam" },
            { ikon: "🔢", teks: "Angka = nilai" },
          ]}
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab15-sub1.jpg"
          alt="Rara menyusun uang mainan di meja. Bimo mengintip dari balik kursi. Celengan babi duduk di meja."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Anak-anak, hari ini kita belajar uang. Uang di Indonesia namanya rupiah.",
            "Uang ada dua jenis: uang kertas dan uang logam. Setiap uang punya angka di atasnya.",
            "Angka itu menunjukkan berapa nilainya. Ayo kita kenali satu per satu.",
          ]}
        >
          <Dialog nama="Bimo" anak="Kak, ini uang apa saja?" />
          <Dialog nama="Rara" anak="Uang kertas ada yang 1.000, 2.000, 5.000, dan 10.000." />
          <Dialog nama="Bimo" anak="Kalau yang logam?" />
          <Dialog nama="Rara" anak="Ada 100, 200, 500, dan 1.000." />
          <Dialog nama="Igil" anak="Hoo! Semua punya angka di depannya. Itu nilainya!" />
          <Dialog nama="Bimo" anak="Jadi uang 5.000 lebih besar dari uang 1.000?" />
          <Dialog nama="Bimo" anak="Iya! Angkanya lebih besar, nilainya juga lebih besar." />
          <Dialog nama="Rara" anak="Dan uang kertas biasanya nilainya lebih besar dari uang logam." />
          <Papan anak="💵 1.000 · 2.000 · 5.000 · 10.000" />
          <Papan anak="🪙 100 · 200 · 500 · 1.000" />
          <p className="text-sm font-bold text-[#1C01A5]">Uang rupiah ada kertas dan logam. Angka di uang menunjukkan nilainya.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Mana yang nilainya lebih besar, uang 1.000 atau uang 5.000? Sebutkan angkanya."
            periksa={(teks) => nilaiRibu(teks, "lima", "5000")}
            petunjuk="Lihat angkanya. Mana yang angkanya lebih besar?"
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Urutkan uang kertas"
            visual={<Papan anak="1.000 · 2.000 · 5.000 · 10.000" />}
            pertanyaan="Urutkan dari yang paling kecil ke paling besar. Tulis angkanya."
            pesanSalah="Urutannya 1.000, 2.000, 5.000, lalu 10.000."
            umpan="Angka kecil dulu, angka besar kemudian."
            periksa={(teks) => urutNilai(teks, UANG_KERTAS)}
            alias={["1 000 2 000 5 000 10 000", "seribu dua ribu lima ribu sepuluh ribu"]}
            konteks="Urutan dari kecil ke besar: 1.000, 2.000, 5.000, 10.000."
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 2 · Nilai Tukar Uang"
          simbol={[
            { ikon: "🔄", teks: "Tukar" },
            { ikon: "⚖️", teks: "Nilai sama" },
          ]}
          warna="border-sky-200 bg-white"
          src="/doodle-mtk/mtk-1-bab15-sub2.jpg"
          alt="Satu uang besar dengan panah ke lima uang kecil. Timbangan seimbang di atas meja."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Uang bisa ditukar dengan uang lain yang nilainya sama.",
            "Misalnya satu uang lima ribu bisa ditukar dengan lima uang seribu.",
            "Yang penting jumlah nilainya sama.",
          ]}
        >
          <Dialog nama="Bimo" anak="Rara, aku punya uang 5.000. Aku mau uang kecil semua." />
          <Dialog nama="Rara" anak="Bisa! Lima ribu sama dengan lima uang 1.000." />
          <Dialog nama="Bimo" anak="Kalau uang 10.000?" />
          <Dialog nama="Rara" anak="Bisa jadi dua uang 5.000, atau sepuluh uang 1.000." />
          <Dialog nama="Igil" anak="Hoo! Yang penting jumlahnya sama, ya!" />
          <Dialog nama="Bimo" anak="Jadi bisa juga ditukar dengan uang logam?" />
          <Dialog nama="Rara" anak="Bisa! 1.000 logam sama dengan 1.000 kertas." />
          <Papan anak="💵 5.000 = 💵 1.000 × 5" />
          <Papan anak="💵 10.000 = 💵 5.000 × 2" />
          <Papan anak="💵 10.000 = 💵 1.000 × 10" />
          <p className="text-sm font-bold text-[#1C01A5]">Uang bisa ditukar asal jumlah nilainya tetap sama.</p>
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Apakah satu uang dua ribu sama nilainya dengan dua uang seribu? Ucapkan sama atau tidak sama."
            periksa={samaNilai}
            petunjuk="Hitung. 1.000 ditambah 1.000 jadi berapa?"
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Berapa lembarnya?"
            visual={<Papan anak="💵 5.000 = 💵 1.000 × ?" />}
            pertanyaan="Ada berapa lembar uang 1.000 supaya nilainya sama dengan 5.000?"
            pesanSalah="Lima lembar, bukan lima ribu."
            umpan="Lima lembar uang 1.000."
            periksa={(teks) => hitungLembar(teks, "lima", "5")}
            alias={["lima lembar", "5 lembar"]}
            konteks="5.000 sama dengan 5 lembar uang 1.000."
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 3 · Menghitung Total Harga"
          simbol={[{ ikon: "➕", teks: "Jumlahkan harga" }]}
          warna="border-emerald-200 bg-emerald-50/50"
          src="/doodle-mtk/mtk-1-bab15-sub3.jpg"
          alt="Kantin sekolah dengan roti, susu, dan kue. Rara memegang keranjang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau kita membeli lebih dari satu barang, harga-harganya harus dijumlahkan.",
            "Itu namanya menghitung total harga. Ayo kita berlatih.",
          ]}
        >
          <Dialog nama="Rara" anak="Aku mau beli roti 3.000 dan susu 2.000." />
          <Dialog nama="Bimo" anak="Totalnya berapa?" />
          <Dialog nama="Rara" anak="Jumlahkan! 3.000 + 2.000." />
          <Dialog nama="Bimo" anak="Tiga tambah dua jadi lima. Jadi 5.000!" />
          <Dialog nama="Igil" anak="Hoo! Betul! Kalau seribunya sama, tinggal jumlahkan angkanya!" />
          <Dialog nama="Bimo" anak="Kalau aku mau roti dan kue?" />
          <Dialog nama="Rara" anak="3.000 + 5.000 = 8.000. Tapi uangmu cukup?" />
          <Papan anak="🍞 3.000 + 🥛 2.000 = 5.000" />
          <Papan anak="🍞 3.000 + 🍰 5.000 = 8.000" />
          <p className="text-sm font-bold text-[#1C01A5]">Beli lebih dari satu barang? Jumlahkan semua harganya.</p>
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Kue kering 2.000 dan minuman 3.000. Berapa total harganya? Ucapkan."
            periksa={(teks) => nilaiRibu(teks, "lima", "5000")}
            petunjuk="Jumlahkan 2.000 dan 3.000."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Total tiga barang"
            visual={<Papan anak="📕 4.000 + ✏️ 2.000 + 🧽 1.000" />}
            pertanyaan="Hitung total harga semua barang dan tulis di kanvas."
            pesanSalah="4.000 + 2.000 + 1.000 = 7.000."
            umpan="Totalnya tujuh ribu."
            periksa={(teks) => nilaiRibu(teks, "tujuh", "7000")}
            alias={["tujuh ribu"]}
            konteks="4.000 + 2.000 + 1.000 = 7.000."
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 4 · Membayar dan Menghitung Kembalian"
          simbol={[{ ikon: "➖", teks: "Bayar − harga" }]}
          warna="border-violet-200 bg-violet-50/50"
          src="/doodle-mtk/mtk-1-bab15-sub4.jpg"
          alt="Bimo memberi uang besar. Penjual mengembalikan beberapa uang kecil."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau membayar, uang kita sering lebih besar dari harga barang.",
            "Kelebihan uang itu harus dikembalikan oleh penjual. Itu namanya kembalian.",
            "Caranya: uang yang dibayar dikurangi harga barang.",
          ]}
        >
          <Dialog nama="Bimo" anak="Bu, aku beli kue ini. Ini uangnya 5.000." />
          <Dialog nama="Igil" anak="Harganya 3.000. Ini kembaliannya!" />
          <Dialog nama="Bimo" anak="Berapa kembaliannya, Bu?" />
          <Dialog nama="Rara" anak="Hitung sendiri! Uang dibayar dikurangi harga barang." />
          <Dialog nama="Bimo" anak="5.000 − 3.000 = 2.000!" />
          <Dialog nama="Igil" anak="Hoo! Kembaliannya dua ribu!" />
          <Dialog nama="Bimo" anak="Kalau aku bayar 10.000 untuk roti 3.000?" />
          <Dialog nama="Rara" anak="10.000 − 3.000 = 7.000. Jangan lupa hitung, ya!" />
          <Papan anak="Bayar 5.000 − harga 3.000 = 2.000" />
          <Papan anak="Bayar 10.000 − harga 3.000 = 7.000" />
          <p className="text-sm font-bold text-[#1C01A5]">Kembalian = uang yang dibayar − harga barang.</p>
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Harga barang 4.000. Uang yang dibayar 10.000. Berapa kembaliannya? Ucapkan."
            periksa={(teks) => nilaiRibu(teks, "enam", "6000")}
            petunjuk="Kurangi uang yang dibayar dengan harganya."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Kalimat kembalian"
            visual={<Papan anak="Harga 2.000 · bayar 5.000" />}
            pertanyaan="Tulis kalimat matematikanya dan hasil kembaliannya."
            pesanSalah="5.000 − 2.000 = 3.000."
            umpan="Kembaliannya tiga ribu."
            periksa={(teks) => adaKembalian(teks, "5000", "2000", "tiga", "3000")}
            alias={["5 000 - 2 000 = 3 000", "lima ribu kurang dua ribu tiga ribu"]}
            konteks="5.000 dikurangi 2.000 sama dengan 3.000."
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 5 · Menabung dan Soal Campuran"
          simbol={[
            { ikon: "🐖", teks: "Ditabung" },
            { ikon: "🪜", teks: "Dua langkah" },
          ]}
          warna="border-rose-200 bg-rose-50/50"
          src="/doodle-mtk/mtk-1-bab15-sub5.jpg"
          alt="Kamar Bimo dengan celengan, koin yang masuk, dan gambar sepeda di dinding."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Uang yang tidak dipakai bisa ditabung. Menabung artinya menyimpan uang sedikit-sedikit.",
            "Soal campuran adalah soal yang butuh lebih dari satu langkah menghitung.",
          ]}
        >
          <Dialog nama="Bimo" anak="Kak, aku menabung tiap hari 2.000. Sudah 3 hari." />
          <Dialog nama="Rara" anak="Berarti tabunganmu 2.000 + 2.000 + 2.000." />
          <Dialog nama="Bimo" anak="Itu 6.000, kan?" />
          <Dialog nama="Igil" anak="Hoo! Betul! Sekarang, kalau mau beli mainan 10.000, cukup belum?" />
          <Dialog nama="Bimo" anak="Belum! Kurang 4.000. Aku nabung lagi!" />
          <Papan anak="2.000 + 2.000 + 2.000 = 6.000" />
          <Papan anak="10.000 − 6.000 = kurang 4.000" />
          <Dialog nama="Rara" anak="Nah, itu yang namanya soal campuran. Tambah dulu, lalu kurang." />
          <Dialog nama="Bimo" anak="Jadi dua langkah, ya. Harus teliti!" />
          <p className="text-sm font-bold text-[#1C01A5]">Soal campuran butuh lebih dari satu langkah. Kerjakan berurutan.</p>
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Tabungan tiga hari, masing-masing 1.000. Berapa jumlahnya? Ucapkan."
            periksa={(teks) => nilaiRibu(teks, "tiga", "3000")}
            petunjuk="Jumlahkan 1.000 sebanyak tiga kali."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Dua langkah"
            visual={<Papan anak="5.000 + 3.000 = ? · lalu − 6.000" />}
            pertanyaan="Hitung dua langkah ini dan tulis hasil akhirnya."
            pesanSalah="5.000 + 3.000 = 8.000, lalu 8.000 − 6.000 = 2.000."
            umpan="Hasil akhirnya dua ribu."
            periksa={(teks) =>
              urutNilai(teks, [
                { frasa: ["delapan ribu"], angka: "8000" },
                { frasa: ["dua ribu"], angka: "2000" },
              ])
            }
            alias={["8 000 lalu 2 000", "delapan ribu lalu dua ribu"]}
            konteks="Langkah pertama 8.000. Langkah kedua 2.000."
          />
        </Adegan>
      </div>
      <div className="mt-4 space-y-3">
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Mana uang yang nilainya paling besar?"
          visual={<Papan anak="💵 1.000 · 2.000 · 5.000 · 10.000" />}
          pilihan={[
            { huruf: "A", teks: "💵 1.000" },
            { huruf: "B", teks: "💵 2.000" },
            { huruf: "C", teks: "💵 5.000" },
            { huruf: "D", teks: "💵 10.000" },
          ]}
          benar="D"
          umpan="Sepuluh ribu angkanya paling besar."
          salah="Bandingkan angkanya."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan uang dengan nilai yang sama."
          baris={[
            { kiri: "💵 5.000", pilihan: tukar, benar: "💵 1.000 × 5" },
            { kiri: "💵 10.000", pilihan: tukar, benar: "💵 1.000 × 10" },
            { kiri: "💵 2.000", pilihan: tukar, benar: "💵 1.000 × 2" },
          ]}
          umpan="5.000 lima lembar, 10.000 sepuluh lembar, 2.000 dua lembar."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun dari harga paling kecil ke paling besar."
          acak={["🍞 3.000", "🍪 1.000", "🥛 2.000"]}
          benar={["🍪 1.000", "🥛 2.000", "🍞 3.000"]}
          umpan="1.000, lalu 2.000, lalu 3.000."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Periksa pernyataan ini."
          baris={[
            { teks: "Uang 10.000 nilainya lebih besar dari uang 5.000.", benar: true },
            { teks: "Kembalian dihitung dengan menjumlahkan uang dan harga.", benar: false },
            { teks: "Uang 1.000 kertas dan 1.000 logam nilainya sama.", benar: true },
          ]}
          umpan="Benar, salah, benar. Kembalian harus dikurangi."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga kotak nilainya sama. Mana yang berbeda?"
          visual={<Papan anak="A 5.000 · B 1.000 × 5 · C 2.000 + 2.000 · D 1.000 × 5" />}
          pilihan={[
            { huruf: "A", teks: "💵 5.000" },
            { huruf: "B", teks: "💵 1.000 × 5" },
            { huruf: "C", teks: "💵 2.000 + 2.000" },
            { huruf: "D", teks: "💵 1.000 × 5" },
          ]}
          benar="C"
          umpan="2.000 + 2.000 = 4.000. Yang lain semuanya 5.000."
          salah="Hitung setiap kotak, lalu cari yang tidak 5.000."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Angka besar, nilai besar."
          alias={["angka besar", "nilai besar"]}
          konteks="Angka besar, nilai besar."
        />
      </div>
    </KartuBingkai>
  );
}

function SubPapan({
  judul,
  warna,
  kelas,
  kelamin,
  penjelasan,
  simbol,
  children,
}: {
  judul: string;
  warna: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  simbol: ButirIkon[];
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-4 ${warna}`}>
      <h5 className="text-sm font-black text-[#1C01A5]">{judul}</h5>
      <TombolPenjelasan kelas={kelas} kelamin={kelamin} kalimat={penjelasan} />
      <PanduanIkon butir={simbol} />
      <div className="mt-3 space-y-3">{children}</div>
    </article>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB15.kartu[1];
  const total = ["5.000", "4.000", "6.000"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu ikon="📊💵" judul={kartu.judul} anak="Pecahan, tukar, total, dan kembalian" />
      <div className="mt-4 space-y-4">
        <SubPapan
          judul="Sub-bab 1 · Pecahan Uang Rupiah"
          warna="border-sky-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Uang rupiah ada dua jenis. Uang kertas dan uang logam.",
            "Uang kertas biasanya nilainya besar. Uang logam nilainya lebih kecil.",
            "Angka yang tertulis di uang menunjukkan nilainya.",
          ]}
          simbol={[
            { ikon: "💵", teks: "Kertas" },
            { ikon: "🪙", teks: "Logam" },
            { ikon: "🔢", teks: "Angka besar" },
          ]}
        >
          <TabelInfoGrafis
            judul="Pecahan rupiah"
            kepala={["Jenis", "Contoh", "Nilai"]}
            baris={[
              ["💵 Kertas", "Lembar warna-warni", "1.000 sampai 10.000"],
              ["🪙 Logam", "Koin berkilau", "100 sampai 1.000"],
            ]}
            kaki="Angka besar, nilai besar."
          />
          <p className="text-sm font-semibold text-slate-700">Contoh: 💵 2.000 lebih besar dari 🪙 500.</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Mana yang nilainya lebih besar, uang 100 atau uang 500?"
            periksa={(teks) => nilaiRatus(teks, "lima", "500")}
            petunjuk="Bandingkan angkanya."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            judul="Urutkan uang logam"
            visual={<Papan anak="100 · 200 · 500 · 1.000" />}
            pertanyaan="Urutkan uang logam dari yang paling kecil ke paling besar."
            pesanSalah="100, 200, 500, lalu 1.000."
            umpan="Seratus, dua ratus, lima ratus, seribu."
            periksa={(teks) => urutNilai(teks, UANG_LOGAM)}
            alias={["100 200 500 1 000", "seratus dua ratus lima ratus seribu"]}
            konteks="Urutan logam: 100, 200, 500, 1.000."
          />
        </SubPapan>
        <SubPapan
          judul="Sub-bab 2 · Nilai Tukar Uang"
          warna="border-emerald-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Uang bisa ditukar dengan uang lain yang nilainya sama.",
            "Hitung dulu jumlah nilainya, lalu cari kombinasi uang kecil yang jumlahnya sama.",
          ]}
          simbol={[
            { ikon: "🔄", teks: "Tukar" },
            { ikon: "⚖️", teks: "Nilai sama" },
          ]}
        >
          <TabelInfoGrafis
            judul="Tukar uang"
            kepala={["Uang besar", "Contoh tukar", "Jumlah"]}
            baris={[
              ["💵 1.000", "🪙 500", "2 koin"],
              ["💵 2.000", "🪙 500", "4 koin"],
              ["💵 5.000", "💵 1.000", "5 lembar"],
              ["💵 10.000", "💵 5.000", "2 lembar"],
            ]}
            kaki="Jumlah nilainya harus sama."
          />
          <p className="text-sm font-semibold text-slate-700">Contoh: 2.000 butuh 4 uang 500.</p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Berapa uang 200 supaya nilainya sama dengan 1.000? Ucapkan jumlahnya."
            periksa={(teks) => hitungLembar(teks, "lima", "5")}
            petunjuk="200 ditambah 200, sampai jadi 1.000."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            judul="Jumlah lembar"
            visual={<Papan anak="💵 5.000 = 💵 1.000 × ?" />}
            pertanyaan="Tulis jumlah lembar uang 1.000."
            pesanSalah="Lima lembar."
            umpan="Lima lembar uang 1.000."
            periksa={(teks) => hitungLembar(teks, "lima", "5")}
            alias={["lima lembar", "5 lembar"]}
            konteks="5.000 = 1.000 × 5."
          />
        </SubPapan>
        <SubPapan
          judul="Sub-bab 3 · Menghitung Total Harga"
          warna="border-violet-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau membeli lebih dari satu barang, jumlahkan semua harganya.",
            "Itulah total harga. Kalau ujungnya sama, tinggal jumlahkan angkanya.",
          ]}
          simbol={[{ ikon: "➕", teks: "Jumlahkan" }]}
        >
          <TabelInfoGrafis
            judul="Nota kecil"
            kepala={["Barang", "Hitungan", "Harga"]}
            baris={[
              ["🍞 Roti", "Harga pertama", "3.000"],
              ["🥛 Susu", "Harga kedua", "2.000"],
              ["Total", "3.000 + 2.000", "5.000"],
            ]}
            kaki="Banyak barang, harga dijumlahkan."
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Kue 1.000 dan minuman 2.000. Berapa total harganya?"
            periksa={(teks) => nilaiRibu(teks, "tiga", "3000")}
            petunjuk="Jumlahkan 1.000 dan 2.000."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            judul="Total ketiga barang"
            visual={<Papan anak="📕 4.000 + ✏️ 2.000 + 🍪 1.000" />}
            pertanyaan="Hitung total ketiga barang ini."
            pesanSalah="4.000 + 2.000 + 1.000 = 7.000."
            umpan="Totalnya tujuh ribu."
            periksa={(teks) => nilaiRibu(teks, "tujuh", "7000")}
            alias={["tujuh ribu"]}
            konteks="4.000 + 2.000 + 1.000 = 7.000."
          />
        </SubPapan>
        <SubPapan
          judul="Sub-bab 4 · Membayar dan Kembalian"
          warna="border-rose-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau uang yang dibayar lebih besar dari harga, penjual mengembalikan kelebihannya.",
            "Namanya kembalian. Uang yang dibayar dikurangi harga barang.",
          ]}
          simbol={[{ ikon: "➖", teks: "Bayar − harga" }]}
        >
          <TabelInfoGrafis
            judul="Kembalian"
            kepala={["Harga", "Dibayar", "Kembalian"]}
            baris={[
              ["3.000", "5.000", "2.000"],
              ["2.000", "5.000", "3.000"],
              ["4.000", "10.000", "6.000"],
            ]}
            kaki="Bayar dikurangi harga."
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Harga 1.000, dibayar 5.000. Berapa kembaliannya?"
            periksa={(teks) => nilaiRibu(teks, "empat", "4000")}
            petunjuk="5.000 dikurangi 1.000."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            judul="Kalimat kembalian"
            visual={<Papan anak="Harga 3.000 · bayar 10.000" />}
            pertanyaan="Tulis kalimat matematikanya dan hasilnya."
            pesanSalah="10.000 − 3.000 = 7.000."
            umpan="Kembaliannya tujuh ribu."
            periksa={(teks) => adaKembalian(teks, "10000", "3000", "tujuh", "7000")}
            alias={["10 000 - 3 000 = 7 000", "sepuluh ribu kurang tiga ribu tujuh ribu"]}
            konteks="10.000 dikurangi 3.000 sama dengan 7.000."
          />
        </SubPapan>
        <SubPapan
          judul="Sub-bab 5 · Menabung dan Soal Campuran"
          warna="border-cyan-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Menabung artinya menyimpan uang sedikit-sedikit.",
            "Soal campuran butuh dua langkah atau lebih. Kerjakan satu langkah dulu.",
          ]}
          simbol={[
            { ikon: "🐖", teks: "Tabung" },
            { ikon: "🪜", teks: "Dua langkah" },
          ]}
        >
          <TabelInfoGrafis
            judul="Dua langkah"
            kepala={["Langkah", "Hitungan", "Hasil"]}
            baris={[
              ["1", "2.000 × 3 hari", "6.000"],
              ["2", "10.000 − 6.000", "kurang 4.000"],
            ]}
            kaki="Satu langkah dulu, baru langkah berikutnya."
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Tabungan tiga hari, masing-masing 1.000. Berapa jumlah tabungannya?"
            periksa={(teks) => nilaiRibu(teks, "tiga", "3000")}
            petunjuk="Jumlahkan 1.000 sebanyak tiga kali."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            judul="Dua langkah"
            visual={<Papan anak="4.000 + 4.000 = ? · lalu 8.000 − 5.000" />}
            pertanyaan="Hitung dua langkah ini."
            pesanSalah="4.000 + 4.000 = 8.000, lalu 8.000 − 5.000 = 3.000."
            umpan="Hasil akhirnya tiga ribu."
            periksa={(teks) =>
              urutNilai(teks, [
                { frasa: ["delapan ribu"], angka: "8000" },
                { frasa: ["tiga ribu"], angka: "3000" },
              ])
            }
            alias={["8 000 lalu 3 000", "delapan ribu lalu tiga ribu"]}
            konteks="Langkah pertama 8.000. Langkah kedua 3.000."
          />
        </SubPapan>
      </div>
      <div className="mt-4 space-y-3">
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Harga 4.000 dibayar 10.000. Hitungan mana yang benar?"
          visual={<Papan anak="💵 10.000 − 4.000" />}
          pilihan={[
            { huruf: "A", teks: "10.000 + 4.000 = 14.000" },
            { huruf: "B", teks: "10.000 − 4.000 = 6.000" },
            { huruf: "C", teks: "4.000 − 10.000 = 6.000" },
            { huruf: "D", teks: "10.000 − 4.000 = 4.000" },
          ]}
          benar="B"
          umpan="Kembalian dihitung dengan mengurangi."
          salah="Uang dibayar dikurangi harga."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan belanjaan dengan totalnya."
          baris={[
            { kiri: "🍞 3.000 + 🥛 2.000", pilihan: total, benar: "5.000" },
            { kiri: "🍪 1.000 + 🍰 3.000", pilihan: total, benar: "4.000" },
            { kiri: "📕 2.000 + 🖍️ 4.000", pilihan: total, benar: "6.000" },
          ]}
          umpan="5.000, 4.000, dan 6.000."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari yang paling kecil ke paling besar."
          acak={["💵 5.000", "🪙 100", "💵 10.000", "🪙 500", "💵 1.000"]}
          benar={["🪙 100", "🪙 500", "💵 1.000", "💵 5.000", "💵 10.000"]}
          umpan="100, 500, 1.000, 5.000, 10.000."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa hitungan ini."
          baris={[
            { teks: "Kembalian 5.000 − 2.000 = 3.000.", benar: true },
            { teks: "Membeli dua barang berarti harganya dikurangi.", benar: false },
            { teks: "Uang 10.000 sama dengan dua uang 5.000.", benar: true },
          ]}
          umpan="Benar, salah, benar. Dua barang dijumlahkan."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Harga 6.000 dibayar 10.000. Berapa kembaliannya?"
          visual={<Papan anak="💵 10.000 − 6.000" />}
          pilihan={[
            { huruf: "A", teks: "3.000" },
            { huruf: "B", teks: "4.000" },
            { huruf: "C", teks: "5.000" },
            { huruf: "D", teks: "6.000" },
          ]}
          benar="B"
          umpan="10.000 − 6.000 = 4.000."
          salah="Kurangi 10.000 dengan 6.000."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Bayar dikurangi harga, itu kembaliannya."
          alias={["dikurangi", "kembalian"]}
          konteks="Bayar dikurangi harga, itu kembaliannya."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB15.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🏪🦉"
        judul={kartu.judul}
        anak="Sepuluh transaksi · total harga dan kembalian"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini kalian menjadi penjaga warung.",
          "Pelanggan datang membeli barang, membayar, dan kalian menghitung total serta kembalian.",
          "Kalau hitunganmu benar, kalian mendapat koin. Ayo kita buka warung.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab15-warung.jpg"
        alt="Warung kecil dengan rak roti dan kue. Igil memakai celemek di meja kasir."
      />
      <PanduanIkon
        judul="Simbol warung"
        butir={[
          { ikon: "🏷️", teks: "Baca harga" },
          { ikon: "➕", teks: "Total" },
          { ikon: "🔄", teks: "Tukar" },
          { ikon: "➖", teks: "Kembalian" },
          { ikon: "🪙", teks: "Koin warung" },
        ]}
      />
      <div className="mt-4 space-y-2 text-sm font-semibold text-slate-700">
        <p>Level 1 membaca harga. Level 2 menjumlahkan dua barang. Level 3 menukar uang.</p>
        <p>Level 4 memberi kembalian. Level 5 mengerjakan total dulu, lalu kembalian.</p>
        <p>Jalur pagi transaksinya sederhana. Jalur sore soalnya bertingkat. Kaca periksa membantu melihat harga.</p>
        <p>Salah tidak mengurangi koin. Mesin kasir berkata: coba lagi. Kumpulkan 10 koin untuk membuka warung besar.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB15}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB15}
        penutup="Warung besar terbuka. Igil memasang celemek penjaga warung."
        bunga="💵🪙🍞🍰🏅"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB15.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Penjaga Warung Ahli" : skor >= 6 ? "💰 Kasir Cerdas" : "🐖 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Hitunganmu selalu tepat!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga warung!"
        : "Ayo berlatih lagi bersama Igil, kamu pasti bisa!";
  const hasil = ["Total 5.000", "Kembalian 5.000", "Total 8.000"];
  const langkah = ["💵 Terima kembalian", "🧮 Hitung total", "💰 Bayar", "🧺 Pilih barang"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🦉"
        judul={kartu.judul}
        anak={`${nama} · Kelas 1 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sekarang saatnya kalian mengerjakan sendiri. Ada sepuluh soal.",
          "Sebagian meminta nilai uang, sebagian menghitung total harga, dan sebagian memberi kembalian.",
          "Kalau membeli, harganya dijumlahkan. Kalau membayar, kembaliannya dikurangi. Cari tahu jawabannya, lalu periksa lagi.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab15-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar, uang mainan, dan celengan yang mengangkat kaki."
      />
      <PanduanIkon
        judul="Simbol soal"
        butir={[
          { ikon: "🔢", teks: "Baca angka" },
          { ikon: "➕", teks: "Total harga" },
          { ikon: "➖", teks: "Kembalian" },
          { ikon: "⚖️", teks: "Cukup atau tidak" },
        ]}
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Urutkan nilai uang"
          visual={<Papan anak="💵 5.000 · 🪙 500 · 💵 1.000 · 💵 10.000 · 🪙 100" />}
          pertanyaan="Urutkan dari yang paling kecil ke paling besar, lalu tulis nilainya."
          pesanSalah="100, 500, 1.000, 5.000, 10.000."
          umpan="Seratus sampai sepuluh ribu."
          periksa={(teks) => urutNilai(teks, UANG_CAMPUR)}
          alias={["100 500 1 000 5 000 10 000", "seratus lima ratus seribu lima ribu sepuluh ribu"]}
          konteks="Urutan: 100, 500, 1.000, 5.000, 10.000."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Roti 3.000 dan kue 4.000. Berapa total harganya?"
          visual={<Papan anak="🍞 3.000 + 🍰 4.000" />}
          pilihan={[
            { huruf: "A", teks: "1.000" },
            { huruf: "B", teks: "6.000" },
            { huruf: "C", teks: "7.000" },
            { huruf: "D", teks: "12.000" },
          ]}
          benar="C"
          umpan="3.000 + 4.000 = 7.000."
          salah="Jumlahkan kedua harganya."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Barang berharga 4.000 dibayar 10.000. Ucapkan berapa kembaliannya."
          periksa={(teks) => nilaiRibu(teks, "enam", "6000")}
          petunjuk="10.000 dikurangi 4.000."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Bimo berkata: aku beli barang 7.000, bayar 5.000, jadi aku dapat kembalian 2.000. Apakah Bimo benar?"
          pilihan={[
            { huruf: "A", teks: "Benar, dapat kembalian 2.000" },
            { huruf: "B", teks: "Salah, uangnya tidak cukup, kurang 2.000" },
            { huruf: "C", teks: "Salah, kembaliannya 12.000" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="B"
          umpan="5.000 lebih kecil dari 7.000, jadi belum bisa dapat kembalian."
          salah="Cek dulu apakah uangnya cukup."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan transaksi dengan hasilnya."
          baris={[
            { kiri: "Beli 2.000 + 3.000", pilihan: hasil, benar: "Total 5.000" },
            { kiri: "Bayar 10.000 untuk 5.000", pilihan: hasil, benar: "Kembalian 5.000" },
            { kiri: "Beli 4.000 + 4.000", pilihan: hasil, benar: "Total 8.000" },
          ]}
          umpan="Total dan kembalian jangan tertukar."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Nota belanja"
          visual={<Papan anak="📕 3.000 + ✏️ 2.000 · bayar 10.000" />}
          pertanyaan="Tulis total harganya dulu, lalu tulis kembaliannya."
          pesanSalah="Total 5.000. Kembalian 10.000 − 5.000 = 5.000."
          umpan="Keduanya lima ribu, tetapi artinya berbeda."
          periksa={notaLima}
          alias={["total lima ribu kembalian lima ribu", "total 5 000 kembalian 5 000"]}
          konteks="Total 5.000 dan kembalian 5.000. Keduanya harus tertulis."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Berapa uang 500 supaya nilainya sama dengan 5.000?"
          visual={<Papan anak="💵 5.000 = 🪙 500 × ?" />}
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "8" },
            { huruf: "C", teks: "10" },
            { huruf: "D", teks: "15" },
          ]}
          benar="C"
          umpan="500 sepuluh kali sama dengan 5.000."
          salah="Hitung berapa kali 500 sampai 5.000."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun langkah belanja dari awal ke akhir."
          acak={langkah}
          benar={["🧺 Pilih barang", "🧮 Hitung total", "💰 Bayar", "💵 Terima kembalian"]}
          umpan="Pilih, hitung, bayar, lalu terima kembalian."
          salah="Mulai dari memilih barang."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Bimo punya 5.000. Barang berharga 8.000. Ucapkan cukup atau tidak cukup, lalu jelaskan alasannya singkat."
          periksa={tidakCukup}
          petunjuk="Bandingkan 5.000 dengan 8.000. Sebutkan kurang berapa."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Igil menjual 5 roti seharga 3.000. Pelanggan pertama bayar 10.000 untuk 1 roti. Igil ingin beli barang 20.000. Mana yang benar?"
          visual={<Papan anak="🍞 × 5 · bayar 10.000 · harga 20.000" />}
          pilihan={[
            {
              huruf: "A",
              teks: "Total roti 15.000. Kembalian pelanggan 7.000. Untuk barang 20.000 masih kurang 5.000.",
            },
            {
              huruf: "B",
              teks: "Total roti 15.000. Kembalian pelanggan 3.000. Untuk barang 20.000 uangnya cukup.",
            },
            {
              huruf: "C",
              teks: "Total roti 8.000. Kembalian pelanggan 7.000. Untuk barang 20.000 kurang 3.000.",
            },
            {
              huruf: "D",
              teks: "Total roti 15.000. Kembalian pelanggan 7.000. Untuk barang 20.000 uangnya cukup.",
            },
          ]}
          benar="A"
          umpan="5 × 3.000 = 15.000. 10.000 − 3.000 = 7.000. 20.000 − 15.000 = 5.000."
          salah="Hitung total roti, kembalian, lalu bandingkan dengan 20.000."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Kalau membeli, harganya dijumlahkan."
          alias={["membeli", "dijumlahkan"]}
          konteks="Kalau membeli, harganya dijumlahkan."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab15({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
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
          src: "/doodle-mtk/mtk-1-bab15-poin.jpg",
          alt: "Igil berdiri di samping papan kosong. Uang kertas, koin, dan celengan melayang di sekelilingnya.",
        }}
        cuplikan={cuplikanKalimat([
          "Uang Indonesia namanya rupiah. Ada uang kertas dan uang logam. Angka di uang menunjukkan nilainya.",
          "Uang bisa ditukar asal nilainya sama. Kalau membeli banyak barang, harganya dijumlahkan.",
          "Kalau membayar lebih, kembaliannya dihitung dengan mengurangi. Uang yang tidak dipakai sebaiknya ditabung.",
        ])}
        poin={[
          "💵 Angka besar, nilai besar.",
          "🔄 Tukar uang? Jumlah nilainya harus sama.",
          "➕ Beli banyak barang? Jumlahkan harganya.",
          "➖ Bayar dikurangi harga, itu kembaliannya.",
          "🪜 Soal campuran: satu langkah dulu.",
          "🐖 Uang yang tidak dipakai, ditabung.",
          "⚖️ Cukup atau tidak? Bandingkan uang dengan harga.",
        ]}
        penutup="Lihat angkanya, jumlahkan kalau membeli, dan kurangi kalau mencari kembalian."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
