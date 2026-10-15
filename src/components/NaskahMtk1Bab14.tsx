"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB14 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB14 } from "@/lib/tema-misi-mtk-1";
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
import { MODUL_MTK1_BAB14 } from "@/lib/modul-resmi-mtk-1-bab14";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB14.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function naskah(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaToken(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\s)${angka}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function kataUtuh(teks: string, kata: string): boolean {
  return new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function jumlah(teks: string, kata: string, angka: string): boolean {
  const biasa = naskah(teks);
  if (biasa.includes("puluh") || biasa.includes("belas")) return false;
  return kataUtuh(teks, kata) || adaToken(teks, angka);
}

function sudutNol(teks: string): boolean {
  const biasa = naskah(teks);
  const nol = kataUtuh(teks, "nol") || kataUtuh(teks, "kosong") || adaToken(teks, "0") || biasa.includes("tidak");
  return nol && biasa.includes("sudut") && /melengkung|ujung|bertemu|halus|tidak/.test(biasa);
}

function sisiSudutEmpat(teks: string): boolean {
  const biasa = naskah(teks);
  if (biasa.includes("puluh") || biasa.includes("belas")) return false;
  const empat = kataUtuh(teks, "empat") || adaToken(teks, "4");
  return empat && biasa.includes("sisi") && biasa.includes("sudut");
}

function urutKata(teks: string, urutan: string[]): boolean {
  const biasa = naskah(teks);
  let mulai = 0;
  for (const kata of urutan) {
    const indeks = biasa.indexOf(kata, mulai);
    if (indeks < 0) return false;
    mulai = indeks + kata.length;
  }
  return true;
}

function urutPilihan(teks: string, kelompok: string[][]): boolean {
  const biasa = naskah(teks);
  let mulai = 0;
  for (const opsi of kelompok) {
    let palingAwal = -1;
    let panjang = 0;
    for (const kata of opsi) {
      const indeks = biasa.indexOf(kata, mulai);
      if (indeks >= 0 && (palingAwal < 0 || indeks < palingAwal)) {
        palingAwal = indeks;
        panjang = kata.length;
      }
    }
    if (palingAwal < 0) return false;
    mulai = palingAwal + panjang;
  }
  return true;
}

function kelompokDua(teks: string, datar: string[][], ruang: string[][]): boolean {
  const biasa = naskah(teks);
  const ada = (opsi: string[]) => opsi.some((kata) => biasa.includes(kata));
  if (!datar.every(ada) || !ruang.every(ada)) return false;
  const akhirDatar = Math.max(
    ...datar.map((opsi) => Math.min(...opsi.map((kata) => biasa.indexOf(kata)).filter((indeks) => indeks >= 0))),
  );
  const awalRuang = Math.min(
    ...ruang.map((opsi) => Math.min(...opsi.map((kata) => biasa.indexOf(kata)).filter((indeks) => indeks >= 0))),
  );
  return akhirDatar < awalRuang;
}

function alasanDadu(teks: string): boolean {
  if (!kataUtuh(teks, "dadu")) return false;
  return /angkat|isi|pegang|ruang|dipegang/.test(naskah(teks));
}

function bendaSekitar(teks: string): boolean {
  const biasa = naskah(teks);
  const adaSegitiga = /segitiga|pizza|piza|tenda|rambu|atap/.test(biasa);
  const adaEmpat = /segi empat|persegi|jendela|buku|pintu|ubin|papan|meja/.test(biasa);
  const adaLingkar = /lingkaran|koin|jam|roda|piring|tutup|cincin/.test(biasa);
  return adaSegitiga && adaEmpat && adaLingkar && !/dadu|kubus|balok|tabung|kerucut|bola/.test(biasa);
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan cirinya." />
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat jumlah sisi atau sudutnya, lalu susun lagi." />
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
      <HasilJawabanKuis status={status} pesanSalah="Cek lagi: datar hanya bisa digambar, ruang bisa diangkat." />
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
  const kartu = MODUL_MTK1_BAB14.kartu[0];
  const ciri = ["3 sisi dan 3 sudut", "4 sisi dan 4 sudut", "Tidak punya sudut"];
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu ikon="👧👦🦉" judul={kartu.judul} anak="Rara, Bimo, dan Igil" />
      <div className="mt-4">
        <TujuanBelajar
        butir={[
          "Siswa bisa menyebutkan ciri sisi dan sudut pada bangun datar.",
          "Siswa bisa mengenali bangun ruang sederhana.",
          "Siswa bisa membedakan bentuk datar dari bentuk ruang.",
        ]}
      />
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 · Mengenal Sisi"
          simbol={[
            { ikon: "🔺", teks: "3 sisi" },
            { ikon: "⬛", teks: "4 sisi" },
            { ikon: "⬤", teks: "Melengkung" },
          ]}
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab14-sub1.jpg"
          alt="Rara duduk di lantai ubin sambil memegang krayon. Di karpet bundar ada segitiga, segi empat, dan lingkaran. Igil mengintip dari kotak mainan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Bangun datar adalah bentuk yang pipih. Setiap bangun datar punya sisi.",
            "Sisi adalah garis yang membatasi bentuknya.",
            "Bentuk lurus bisa dihitung sisinya. Bentuk yang melengkung tidak dihitung seperti garis lurus.",
          ]}
        >
          <Dialog nama="Bimo" anak="Ubin lantai ini aku hitung: satu, dua, tiga, empat sisi!" />
          <Dialog nama="Rara" anak="Karpet bundar ini tidak habis-habis kalau dihitung seperti garis lurus." />
          <Dialog nama="Igil" anak="Hoo! Yang bundar melengkung terus, jadi tidak punya sisi lurus." />
          <Papan anak="🔺 3 sisi · ⬛ 4 sisi · ⬤ melengkung" />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Persegi panjang ini punya berapa sisi? Ucapkan angkanya."
            periksa={(teks) => jumlah(teks, "empat", "4")}
            petunjuk="Tunjuk sisinya satu per satu, mulai dari atas, lalu searah jarum jam."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Sisi segitiga"
            visual={<Papan anak="🔺 sisi = ?" />}
            pertanyaan="Tulis jumlah sisi segitiga."
            pesanSalah="Segitiga punya 3 sisi."
            umpan="Tiga sisi."
            periksa={(teks) => jumlah(teks, "tiga", "3")}
            alias={["3 sisi", "tiga sisi"]}
            konteks="Segitiga punya 3 sisi."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 · Mengenal Sudut"
          simbol={[
            { ikon: "🔺", teks: "3 sudut" },
            { ikon: "⬛", teks: "4 sudut" },
            { ikon: "❌", teks: "Lingkaran 0" },
          ]}
          warna="border-sky-200 bg-sky-50/50"
          src="/doodle-mtk/mtk-1-bab14-sub2.jpg"
          alt="Rara menunjuk sudut buku. Segitiga punya tiga titik merah di sudutnya. Lingkaran diberi tanda silang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sudut adalah tempat dua sisi bertemu.",
            "Bangun yang punya sisi lurus juga punya sudut.",
            "Lingkaran tidak punya sudut, karena tidak ada garis yang bertemu.",
          ]}
        >
          <Dialog nama="Rara" anak="Ujung buku yang tajam itu sudut. Tempat dua sisi bertemu." />
          <Dialog nama="Igil" anak="Segitiga punya 3 sudut. Persegi punya 4 sudut. Lingkaran punya nol." />
          <Dialog nama="Rara" anak="Jumlah sudut sama dengan jumlah sisi, kecuali lingkaran." />
          <Papan anak="🔺 3 sudut · ⬛ 4 sudut · ⬤ 0 sudut" />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Persegi panjang ini punya berapa sudut? Ucapkan."
            periksa={(teks) => jumlah(teks, "empat", "4")}
            petunjuk="Tunjuk setiap ujung yang tajam."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Sudut segitiga"
            visual={<Papan anak="🔺 sudut = ?" />}
            pertanyaan="Tulis jumlah sudut segitiga."
            pesanSalah="Segitiga punya 3 sudut, satu di setiap ujung."
            umpan="Tiga sudut."
            periksa={(teks) => jumlah(teks, "tiga", "3")}
            alias={["3 sudut", "tiga sudut"]}
            konteks="Segitiga punya 3 sudut."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 · Segitiga, Segi Empat, dan Lingkaran"
          simbol={[
            { ikon: "🔺", teks: "Rambu, pizza" },
            { ikon: "⬛", teks: "Jendela, buku" },
            { ikon: "⬤", teks: "Jam, koin" },
          ]}
          warna="border-emerald-200 bg-emerald-50/50"
          src="/doodle-mtk/mtk-1-bab14-sub3.jpg"
          alt="Halaman sekolah dengan rambu segitiga, jendela segi empat, dan jam bundar. Rara, Bimo, Rara, dan Igil mengamati."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Segitiga punya tiga sisi. Segi empat punya empat sisi.",
            "Lingkaran melengkung dan tidak punya sudut.",
            "Ketiga bentuk itu ada di sekitar kita.",
          ]}
        >
          <Dialog nama="Rara" anak="Rambu itu segitiga. Jendela kelas punya 4 sisi, jadi segi empat." />
          <Dialog nama="Rara" anak="Jam dinding itu lingkaran. Potongan pizza juga segitiga." />
          <Dialog nama="Bimo" anak="Tutup botol minumku bulat. Itu lingkaran!" />
          <Papan anak="🔺 rambu · ⬛ jendela · ⬤ jam" />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Pizza, buku, atau jam: mana yang berbentuk segitiga? Ucapkan namanya."
            periksa={(teks) => kataUtuh(teks, "pizza") || kataUtuh(teks, "piza")}
            petunjuk="Yang punya tiga sisi dan tiga sudut."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Benda di sekitarmu"
            visual={<Papan anak="🔺  ·  ⬛  ·  ⬤" />}
            pertanyaan="Tulis satu benda untuk segitiga, segi empat, dan lingkaran."
            pesanSalah="Contoh: tenda, jendela, dan koin."
            umpan="Bentuk datar ada di sekitar kita."
            periksa={bendaSekitar}
            alias={[]}
            konteks="Terima jika ada satu benda yang masuk akal untuk segitiga, satu untuk segi empat, dan satu untuk lingkaran. Contoh: tenda atau pizza, jendela atau buku, koin atau jam. Tolak jika bendanya tertukar, misalnya bola untuk lingkaran atau dadu untuk segi empat."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 · Mengenal Bangun Ruang"
          simbol={[
            { ikon: "🧊", teks: "Kubus" },
            { ikon: "📦", teks: "Balok" },
            { ikon: "🥫", teks: "Tabung" },
            { ikon: "🍦", teks: "Kerucut" },
            { ikon: "⚽", teks: "Bola" },
          ]}
          warna="border-orange-200 bg-orange-50/50"
          src="/doodle-mtk/mtk-1-bab14-sub4.jpg"
          alt="Rak mainan berisi dadu, kotak, kaleng, topi kerucut, dan bola. Bimo meraih dadu. Igil berdiri di samping."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Bangun ruang punya isi dan bisa dipegang.",
            "Sisinya berupa bidang, bukan hanya garis.",
            "Yang perlu dikenal: kubus, balok, tabung, kerucut, dan bola.",
          ]}
        >
          <Dialog nama="Igil" anak="Dadu itu kubus. Semua sisinya sama besar." />
          <Dialog nama="Rara" anak="Kotak sepatu itu balok. Punya 6 sisi, tetapi tidak sama semua." />
          <Dialog nama="Rara" anak="Kaleng susu tabung. Topi ulang tahun kerucut. Bola ya bola." />
          <Papan anak="🧊 dadu · 📦 kotak · 🥫 kaleng · 🍦 topi · ⚽ bola" />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Dadu ini bentuk ruangnya apa? Ucapkan."
            periksa={(teks) => kataUtuh(teks, "kubus")}
            petunjuk="Semua sisinya sama besar. Itu kubus."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Kotak sepatu"
            visual={<Papan anak="👟 bentuk = ?" />}
            pertanyaan="Tulis nama bangun ruang kotak sepatu."
            pesanSalah="Kotak sepatu adalah balok, bukan kubus."
            umpan="Balok."
            periksa={(teks) => kataUtuh(teks, "balok")}
            alias={["balok"]}
            konteks="Kotak sepatu adalah balok."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 · Bentuk Datar dan Bentuk Ruang"
          simbol={[
            { ikon: "📄", teks: "Datar, digambar" },
            { ikon: "✋", teks: "Ruang, diangkat" },
          ]}
          warna="border-fuchsia-200 bg-fuchsia-50/40"
          src="/doodle-mtk/mtk-1-bab14-sub5.jpg"
          alt="Dua meja. Meja kiri ada gambar lingkaran di kertas. Meja kanan ada bola yang dipegang Bimo. Igil menunjuk bola."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Bentuk datar pipih. Ia tidak punya isi dan hanya bisa digambar.",
            "Bentuk ruang punya isi. Ia bisa dipegang, diangkat, dan diisi.",
            "Tes paling mudah: coba diangkat.",
          ]}
        >
          <Dialog nama="Bimo" anak="Gambar lingkaran di kertas tidak bisa diangkat. Bolanya bisa aku pegang." />
          <Dialog nama="Igil" anak="Bisa diangkat berarti bentuk ruang. Hanya bisa digambar berarti bentuk datar." />
          <Dialog nama="Rara" anak="Persegi itu datar. Kubus itu ruang. Lingkaran datar, bola ruang." />
          <Papan anak="📄 datar: 🔺 ⬛ ⬤ · ✋ ruang: 🧊 📦 🥫 🍦 ⚽" />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Gambar persegi di kertas atau dadu: mana yang bentuk ruang? Ucapkan namanya."
            periksa={(teks) => kataUtuh(teks, "dadu")}
            petunjuk="Yang bisa diangkat dan dipegang."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Datar dan ruang"
            visual={<Papan anak="datar: 🔺 ⬤ · ruang: 🧊 📦" />}
            pertanyaan="Tulis dulu yang datar: segitiga dan lingkaran. Lalu yang ruang: kubus dan balok."
            pesanSalah="Datar: segitiga dan lingkaran. Ruang: kubus dan balok."
            umpan="Yang bisa diangkat masuk kolom ruang."
            periksa={(teks) => kelompokDua(teks, [["segitiga"], ["lingkaran"]], [["kubus"], ["balok"]])}
            alias={["datar segitiga lingkaran ruang kubus balok"]}
            konteks="Datar: segitiga dan lingkaran. Ruang: kubus dan balok."
          />
        </Adegan>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-black text-[#1C01A5]">Lima soal akhir</p>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Berapa sisi persegi panjang ini?"
          visual={<Papan anak="▭ empat sisi berkilau" />}
          pilihan={[
            { huruf: "A", teks: "3" },
            { huruf: "B", teks: "4" },
            { huruf: "C", teks: "5" },
            { huruf: "D", teks: "0" },
          ]}
          benar="B"
          umpan="Persegi panjang punya 4 sisi."
          salah="Tunjuk setiap sisi, jangan ada yang terlewat."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan bentuk dengan cirinya."
          baris={[
            { kiri: "🔺 Segitiga", pilihan: ciri, benar: "3 sisi dan 3 sudut" },
            { kiri: "⬛ Segi empat", pilihan: ciri, benar: "4 sisi dan 4 sudut" },
            { kiri: "⬤ Lingkaran", pilihan: ciri, benar: "Tidak punya sudut" },
          ]}
          umpan="Segitiga 3, segi empat 4, lingkaran tidak punya sudut."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun dari sudut paling sedikit ke paling banyak."
          acak={["⬛ Segi empat", "⬤ Lingkaran", "🔺 Segitiga"]}
          benar={["⬤ Lingkaran", "🔺 Segitiga", "⬛ Segi empat"]}
          umpan="Lingkaran 0, segitiga 3, segi empat 4."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Benar atau salah?"
          baris={[
            { teks: "Lingkaran tidak punya sudut.", benar: true },
            { teks: "Kubus adalah bentuk datar.", benar: false },
            { teks: "Persegi punya 4 sisi yang sama panjang.", benar: true },
          ]}
          umpan="Kubus bisa dipegang, jadi ia bentuk ruang."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga benda berbentuk ruang. Satu berbentuk datar. Ketuk yang datar."
          pilihan={[
            { huruf: "A", teks: "⚽ Bola" },
            { huruf: "B", teks: "🎲 Dadu" },
            { huruf: "C", teks: "🖼️ Gambar lingkaran di kertas" },
            { huruf: "D", teks: "🥫 Kaleng susu" },
          ]}
          benar="C"
          umpan="Gambar di kertas tidak bisa diangkat."
          salah="Cari yang hanya bisa digambar."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Sisi itu garis pembatas bentuk."
          alias={["sisi", "garis pembatas"]}
          konteks="Sisi itu garis pembatas bentuk."
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
  const kartu = MODUL_MTK1_BAB14.kartu[1];
  const benda = ["🎲 Dadu", "👟 Kotak sepatu", "🥫 Kaleng susu"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu ikon="📊🔷" judul={kartu.judul} anak="Sisi, sudut, dan bangun ruang" />
      <div className="mt-4 space-y-4">
        <SubPapan
          judul="Sub-bab 1 · Sisi pada Bangun Datar"
          warna="border-sky-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sisi adalah garis lurus yang membatasi bentuk.",
            "Tunjuk sisinya satu per satu, mulai dari atas, lalu searah jarum jam.",
          ]}
          simbol={[
            { ikon: "👆", teks: "Tunjuk satu" },
            { ikon: "🔄", teks: "Searah jarum jam" },
            { ikon: "🔢", teks: "Hitung" },
          ]}
        >
          <TabelInfoGrafis
            judul="Jumlah sisi"
            kepala={["Bangun", "Sisi", "Cara"]}
            baris={[
              ["🔺 Segitiga", "3", "Tiga garis"],
              ["⬛ Persegi", "4", "Sama panjang"],
              ["▭ Persegi panjang", "4", "Dua pasang"],
              ["⬟ Segi lima", "5", "Lima garis"],
            ]}
            kaki="Tunjuk satu sisi, hitung satu. Jangan lompat."
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Segi lima ini punya berapa sisi?"
            periksa={(teks) => jumlah(teks, "lima", "5")}
            petunjuk="Hitung setiap sisi yang berkedip."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            pertanyaan="Tulis jumlah sisi persegi panjang."
            pesanSalah="Persegi panjang punya 4 sisi."
            umpan="Empat sisi."
            periksa={(teks) => jumlah(teks, "empat", "4")}
            alias={["4 sisi", "empat sisi"]}
            konteks="Persegi panjang punya 4 sisi."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 2 · Sudut pada Bangun Datar"
          warna="border-emerald-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sudut adalah tempat dua sisi bertemu. Cari setiap ujung yang tajam.",
            "Pada bangun datar lurus, jumlah sudut sama dengan jumlah sisi.",
            "Lingkaran tidak punya sudut sama sekali.",
          ]}
          simbol={[
            { ikon: "🔴", teks: "Tandai ujung" },
            { ikon: "🔺", teks: "3 sudut" },
            { ikon: "⬤", teks: "0 sudut" },
          ]}
        >
          <TabelInfoGrafis
            judul="Jumlah sudut"
            kepala={["Bangun", "Sudut", "Ciri"]}
            baris={[
              ["🔺 Segitiga", "3", "Tiga ujung"],
              ["⬛ Persegi", "4", "Empat ujung"],
              ["⬤ Lingkaran", "0", "Tidak ada ujung"],
            ]}
            kaki="Sudut itu ujung yang tajam. Lingkaran tidak punya ujung."
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Persegi ini punya berapa sudut?"
            periksa={(teks) => jumlah(teks, "empat", "4")}
            petunjuk="Ada empat ujung."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            pertanyaan="Tulis jumlah sudut lingkaran, lalu satu alasan."
            pesanSalah="Lingkaran punya 0 sudut karena melengkung dan tidak ada ujung yang bertemu."
            umpan="Nol sudut, karena tidak ada ujung."
            periksa={sudutNol}
            alias={["0 sudut", "tidak punya sudut"]}
            konteks="Lingkaran punya 0 sudut karena melengkung dan tidak punya ujung yang bertemu."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 3 · Tiga Bangun Datar Utama"
          warna="border-violet-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Segitiga punya tiga sisi dan tiga sudut.",
            "Segi empat punya empat sisi dan empat sudut.",
            "Lingkaran melengkung terus dan tidak punya sudut.",
          ]}
          simbol={[
            { ikon: "🍕", teks: "Segitiga" },
            { ikon: "🪟", teks: "Segi empat" },
            { ikon: "🪙", teks: "Lingkaran" },
          ]}
        >
          <TabelInfoGrafis
            judul="Bangun datar"
            kepala={["Bangun", "Sisi dan sudut", "Contoh"]}
            baris={[
              ["🔺 Segitiga", "3 sisi, 3 sudut", "Pizza, tenda, rambu"],
              ["⬛ Segi empat", "4 sisi, 4 sudut", "Jendela, buku, pintu"],
              ["⬤ Lingkaran", "Melengkung, 0 sudut", "Jam, koin, roda"],
            ]}
            kaki="Lurus dan punya sudut berarti segi banyak. Melengkung berarti lingkaran."
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Rambu lalu lintas berbentuk segitiga. Bangun apa itu?"
            periksa={(teks) => kataUtuh(teks, "segitiga")}
            petunjuk="Punya tiga sisi."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            pertanyaan="Tulis bentuk untuk 3 sisi, 4 sisi, dan 0 sudut."
            pesanSalah="3 sisi segitiga, 4 sisi segi empat, 0 sudut lingkaran."
            umpan="Ciri itu cukup untuk mengenali bentuknya."
            periksa={(teks) => urutPilihan(teks, [["segitiga"], ["persegi", "segi empat"], ["lingkaran"]])}
            alias={["segitiga segi empat lingkaran"]}
            konteks="3 sisi adalah segitiga. 4 sisi adalah segi empat. 0 sudut adalah lingkaran."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 4 · Lima Bangun Ruang"
          warna="border-rose-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kubus punya enam sisi yang sama besar. Balok punya enam sisi yang tidak sama semua.",
            "Tabung punya dua lingkaran dan sisi melengkung. Kerucut punya ujung lancip.",
            "Bola melengkung di semua sisi.",
          ]}
          simbol={[
            { ikon: "🧊", teks: "Sisi sama" },
            { ikon: "📦", teks: "Sisi beda" },
            { ikon: "🥫", teks: "Dua lingkaran" },
            { ikon: "🍦", teks: "Ujung lancip" },
          ]}
        >
          <TabelInfoGrafis
            judul="Bangun ruang"
            kepala={["Bangun", "Ciri", "Contoh"]}
            baris={[
              ["🧊 Kubus", "6 sisi sama", "Dadu, es batu"],
              ["📦 Balok", "6 sisi tidak sama", "Kotak sepatu"],
              ["🥫 Tabung", "2 lingkaran", "Kaleng, gelas"],
              ["🍦 Kerucut", "1 ujung lancip", "Topi, cone"],
              ["⚽ Bola", "Melengkung", "Bola, kelereng"],
            ]}
            kaki="Dua lingkaran dan badan melengkung? Itu tabung."
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Topi ulang tahun ini bangun ruang apa? Ucapkan."
            periksa={(teks) => kataUtuh(teks, "kerucut")}
            petunjuk="Ujungnya lancip dan alasnya lingkaran."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            pertanyaan="Tulis bangun ruang dadu, lalu kotak sepatu."
            pesanSalah="Dadu kubus. Kotak sepatu balok."
            umpan="Keduanya punya 6 sisi, tetapi hanya kubus yang sama semua."
            periksa={(teks) => urutKata(teks, ["kubus", "balok"])}
            alias={["kubus balok"]}
            konteks="Dadu adalah kubus. Kotak sepatu adalah balok."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 5 · Datar atau Ruang?"
          warna="border-cyan-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau bisa diangkat dan dipegang, itu bentuk ruang.",
            "Kalau hanya bisa digambar di kertas, itu bentuk datar.",
            "Lingkaran itu datar. Bola itu ruang. Keduanya bulat, tetapi tidak sama.",
          ]}
          simbol={[
            { ikon: "📄", teks: "Hanya digambar" },
            { ikon: "✋", teks: "Bisa diangkat" },
          ]}
        >
          <TabelInfoGrafis
            judul="Tes angkat"
            kepala={["Datar", "Ruang", "Cara bedakan"]}
            baris={[
              ["🔺 Segitiga", "🧊 Kubus", "Coba diangkat"],
              ["⬛ Segi empat", "📦 Balok", "Cek apakah ada isi"],
              ["⬤ Lingkaran", "⚽ Bola", "Bulat belum tentu ruang"],
            ]}
            kaki="Bisa diangkat berarti ruang. Cuma bisa digambar berarti datar."
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Balok kayu atau gambar segitiga di kertas: mana yang bentuk ruang?"
            periksa={(teks) => kataUtuh(teks, "balok")}
            petunjuk="Yang bisa diangkat."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            pertanyaan="Tulis dulu yang datar: lingkaran dan segitiga. Lalu yang ruang: tabung dan bola."
            pesanSalah="Datar: lingkaran dan segitiga. Ruang: tabung dan bola."
            umpan="Tabung dan bola bisa dipegang."
            periksa={(teks) => kelompokDua(teks, [["lingkaran"], ["segitiga"]], [["tabung"], ["bola"]])}
            alias={["datar lingkaran segitiga ruang tabung bola"]}
            konteks="Datar: lingkaran dan segitiga. Ruang: tabung dan bola."
          />
        </SubPapan>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-black text-[#1C01A5]">Lima soal akhir</p>
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Mana pernyataan yang benar?"
          visual={<Papan anak="🔺 dan ⬛" />}
          pilihan={[
            { huruf: "A", teks: "Segitiga punya 4 sudut" },
            { huruf: "B", teks: "Segi empat punya 3 sisi" },
            { huruf: "C", teks: "Segitiga punya 3 sisi dan 3 sudut" },
            { huruf: "D", teks: "Segi empat tidak punya sudut" },
          ]}
          benar="C"
          umpan="Tiga sisi bertemu di tiga sudut."
          salah="Hitung sisi dan sudut segitiga dulu."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan bangun dengan bendanya."
          baris={[
            { kiri: "🧊 Kubus", pilihan: benda, benar: "🎲 Dadu" },
            { kiri: "📦 Balok", pilihan: benda, benar: "👟 Kotak sepatu" },
            { kiri: "🥫 Tabung", pilihan: benda, benar: "🥫 Kaleng susu" },
          ]}
          umpan="Dadu kubus, kotak sepatu balok, kaleng tabung."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari yang datar ke yang ruang."
          acak={["⚽ Bola", "⬤ Gambar lingkaran", "▭ Gambar persegi panjang"]}
          benar={["⬤ Gambar lingkaran", "▭ Gambar persegi panjang", "⚽ Bola"]}
          umpan="Dua gambar dulu, baru bola yang bisa diangkat."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Benar atau salah?"
          baris={[
            { teks: "Kubus punya 6 sisi yang sama besar.", benar: true },
            { teks: "Balok punya 6 sisi yang semuanya sama.", benar: false },
            { teks: "Tabung punya sudut di ujungnya.", benar: false },
          ]}
          umpan="Ujung tabung berupa lingkaran, bukan sudut."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Aku punya 6 sisi. Semua sisiku sama besar. Aku bisa dipakai untuk bermain dadu. Bentuk apa aku?"
          pilihan={[
            { huruf: "A", teks: "📦 Balok" },
            { huruf: "B", teks: "🧊 Kubus" },
            { huruf: "C", teks: "⚽ Bola" },
            { huruf: "D", teks: "⬤ Lingkaran" },
          ]}
          benar="B"
          umpan="Dadu adalah kubus."
          salah="Balok tidak sama semua sisinya. Lingkaran tidak bisa dijadikan dadu."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Bisa diangkat berarti bentuk ruang."
          alias={["bisa diangkat", "bentuk ruang"]}
          konteks="Bisa diangkat berarti bentuk ruang."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB14.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🔨🦉"
        judul={kartu.judul}
        anak="Sepuluh pesanan · sisi, sudut, dan bangun ruang"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini kalian menjadi perancang mainan di bengkel.",
          "Pelanggan memesan mainan dengan ciri bentuk tertentu.",
          "Kalau pesanannya cocok, kalian mendapat bintang.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab14-bengkel.jpg"
        alt="Igil memakai topi tukang di meja kerja kayu, dikelilingi potongan segitiga, kubus, dan bola."
      />
      <PanduanIkon
        judul="Simbol bengkel"
        butir={[
          { ikon: "🔺", teks: "Bentuk datar" },
          { ikon: "🧊", teks: "Bangun ruang" },
          { ikon: "🔍", teks: "Kaca pembesar" },
          { ikon: "⭐", teks: "10 bintang" },
        ]}
      />
      <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Salah pilih bentuk membuat mesin berbalik, lalu kamu boleh mencoba lagi.</p>
        <p>
          Jawaban benar pertama mendapat 3 bintang. Setelah satu petunjuk, 2 bintang. Setelah dua petunjuk, 1 bintang. Kaca pembesar membantu, tetapi mengurangi bintang.
        </p>
        <p>Kumpulkan 10 bintang untuk membuka bengkel besar dan menerima celemek tukang.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB14}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB14}
        penutup="Bengkel besar terbuka. Igil memasang celemek tukang."
        bunga="🔺🧊🥫⚽⭐"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB14.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🧑‍🔧 Perancang Bentuk Ahli" : skor >= 6 ? "🔨 Tukang Bentuk Cerdas" : "🐿️ Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Semua bentukmu tepat!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi perancang ahli!"
        : "Ayo berkarya lagi bersama Igil, kamu pasti bisa!";
  const ciri = ["6 sisi, semua sama besar", "6 sisi, tidak sama semua", "1 ujung lancip, alas lingkaran"];
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
          "Sebagian menghitung sisi dan sudut, sebagian memilih bentuk, dan sebagian membedakan datar dari ruang.",
          "Cari tahu jumlah sisi dan sudutnya, lalu bayangkan apakah benda itu bisa diangkat.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab14-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan potongan bentuk. Igil mengangkat ibu jari."
      />
      <PanduanIkon
        judul="Simbol soal"
        butir={[
          { ikon: "📏", teks: "Hitung sisi" },
          { ikon: "🔴", teks: "Hitung sudut" },
          { ikon: "✋", teks: "Coba diangkat" },
          { ikon: "📄", teks: "Hanya gambar" },
        ]}
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Sisi dan sudut"
          visual={<Papan anak="▭ sisi = ? · sudut = ?" />}
          pertanyaan="Tulis jumlah sisi dan jumlah sudut persegi panjang."
          pesanSalah="Sisi 4 dan sudut 4."
          umpan="Empat sisi dan empat sudut."
          periksa={sisiSudutEmpat}
          alias={["4 sisi 4 sudut", "empat sisi empat sudut"]}
          konteks="Persegi panjang punya 4 sisi dan 4 sudut."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Bentuk mana yang punya 0 sudut?"
          pilihan={[
            { huruf: "A", teks: "🔺 Segitiga" },
            { huruf: "B", teks: "⬛ Segi empat" },
            { huruf: "C", teks: "⬟ Segi lima" },
            { huruf: "D", teks: "⬤ Lingkaran" },
          ]}
          benar="D"
          umpan="Lingkaran melengkung, jadi tidak punya sudut."
          salah="Cari bentuk yang tidak punya ujung."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Topi ulang tahun dan kaleng susu. Sebutkan nama bangun ruang keduanya, satu per satu."
          periksa={(teks) => kataUtuh(teks, "kerucut") && kataUtuh(teks, "tabung")}
          petunjuk="Topi yang lancip adalah kerucut. Kaleng adalah tabung."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Bimo berkata: lingkaran itu bentuk ruang, karena bulat seperti bola. Apakah Bimo benar?"
          pilihan={[
            { huruf: "A", teks: "Benar, karena sama-sama bulat" },
            { huruf: "B", teks: "Salah, lingkaran bentuk datar dan bola bentuk ruang" },
            { huruf: "C", teks: "Salah, karena lingkaran punya sudut" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="B"
          umpan="Sama-sama bulat belum berarti sama-sama bentuk ruang."
          salah="Lingkaran digambar di kertas. Bola bisa diangkat."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan bangun dengan cirinya."
          baris={[
            { kiri: "🧊 Kubus", pilihan: ciri, benar: "6 sisi, semua sama besar" },
            { kiri: "📦 Balok", pilihan: ciri, benar: "6 sisi, tidak sama semua" },
            { kiri: "🍦 Kerucut", pilihan: ciri, benar: "1 ujung lancip, alas lingkaran" },
          ]}
          umpan="Kubus sama semua, balok tidak, kerucut lancip."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Kelompokkan"
          visual={<Papan anak="datar: 🔺 ⬛ · ruang: ⚽ 🥫" />}
          pertanyaan="Tulis dulu yang datar: segitiga dan persegi. Lalu yang ruang: bola dan tabung."
          pesanSalah="Datar: segitiga dan persegi. Ruang: bola dan tabung."
          umpan="Yang bisa digambar di kertas masuk kolom datar."
          periksa={(teks) => kelompokDua(teks, [["segitiga"], ["persegi"]], [["bola"], ["tabung"]])}
          alias={["datar segitiga persegi ruang bola tabung"]}
          konteks="Datar: segitiga dan persegi. Ruang: bola dan tabung."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Satu persegi punya 4 sisi dan 4 sudut. Berapa jumlah sisi dan sudut dari dua persegi?"
          visual={<Papan anak="4 + 4" />}
          pilihan={[
            { huruf: "A", teks: "6 sisi dan 6 sudut" },
            { huruf: "B", teks: "8 sisi dan 8 sudut" },
            { huruf: "C", teks: "4 sisi dan 4 sudut" },
            { huruf: "D", teks: "2 sisi dan 2 sudut" },
          ]}
          benar="B"
          umpan="4 ditambah 4 sama dengan 8, untuk sisi maupun sudut."
          salah="Jumlahkan sisi keduanya, lalu jumlahkan sudut keduanya."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari sisi paling sedikit ke paling banyak."
          acak={["⬛ Persegi 4", "⬟ Segi lima 5", "⬤ Lingkaran 0", "🔺 Segitiga 3"]}
          benar={["⬤ Lingkaran 0", "🔺 Segitiga 3", "⬛ Persegi 4", "⬟ Segi lima 5"]}
          umpan="Lingkaran 0, segitiga 3, persegi 4, segi lima 5."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Dadu atau gambar dadu di kertas: ucapkan mana yang bentuk ruang, lalu jelaskan alasannya singkat."
          periksa={alasanDadu}
          petunjuk="Sebutkan dadu, lalu katakan ia bisa diangkat atau punya isi."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kotak A: segitiga kayu dan kubus kayu. Kotak B: gambar lingkaran dan bola kayu. Kotak C: balok kayu dan tabung kayu. Mana yang benar?"
          visual={<Papan anak="A 🔺🧊 · B 📄⚽ · C 📦🥫" />}
          pilihan={[
            {
              huruf: "A",
              teks: "Kotak C semuanya ruang. Kotak A dan B bercampur. Pindahkan kubus dari kotak A.",
            },
            {
              huruf: "B",
              teks: "Kotak A semuanya ruang. Hanya kotak B yang bercampur. Pindahkan segitiga dari kotak A.",
            },
            {
              huruf: "C",
              teks: "Kotak C semuanya ruang. Hanya kotak A yang bercampur. Pindahkan segitiga dari kotak A.",
            },
            {
              huruf: "D",
              teks: "Kotak B semuanya ruang. Kotak A dan C bercampur. Pindahkan bola dari kotak B.",
            },
          ]}
          benar="A"
          umpan="Setelah kubus pindah, kotak A hanya berisi segitiga."
          salah="Periksa isi setiap kotak: mana yang semuanya bisa diangkat."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Gambar di kertas berarti bentuk datar."
          alias={["gambar di kertas", "bentuk datar"]}
          konteks="Gambar di kertas berarti bentuk datar."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab14({
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
          src: "/doodle-mtk/mtk-1-bab14-poin.jpg",
          alt: "Igil berdiri di samping papan kosong. Segitiga, persegi, lingkaran, kubus, dan bola melayang di sekelilingnya.",
        }}
        cuplikan={cuplikanKalimat([
          "Sisi adalah garis yang membatasi bentuk. Sudut adalah tempat dua sisi bertemu.",
          "Segitiga punya 3 sisi dan 3 sudut. Segi empat punya 4. Lingkaran tidak punya sudut.",
          "Kubus punya 6 sisi yang sama. Balok punya 6 sisi yang tidak sama semua.",
          "Bisa diangkat berarti bentuk ruang. Gambar di kertas berarti bentuk datar.",
        ])}
        poin={[
          "📏 Sisi itu garis pembatas bentuk.",
          "🔴 Sudut itu ujung tempat dua sisi bertemu.",
          "⬤ Lingkaran melengkung, jadi tidak punya sudut.",
          "🧊 Kubus 6 sisi sama, balok 6 sisi tidak sama.",
          "✋ Bisa diangkat berarti bentuk ruang.",
          "📄 Gambar di kertas berarti bentuk datar.",
        ]}
        penutup="Hitung sisi dan sudutnya, lalu coba bayangkan apakah bendanya bisa diangkat."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
