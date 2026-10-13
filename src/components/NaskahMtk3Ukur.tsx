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
import { MISI_MTK3_UKUR, TEMA_MTK3_UKUR } from "@/lib/misi-mtk-3-ukur";
import { MODUL_MTK3_UKUR } from "@/lib/modul-resmi-mtk-3-ukur";
import {
  bengkelTiga,
  jawabEmpatRatusCm,
  jawabEmpatRibuGram,
  jawabGram,
  jawabGula,
  jawabLimaKilo,
  jawabMeter,
  jawabMeteranPita,
  jawabMeteranRoda,
  jawabPensil,
  jawabTigaMeter,
  jawabTigaRatusCm,
  jawabTimbanganBesar,
  jawabTujuhRibuGram,
  konversiDuaMeter,
  konversiEmpatKilo,
  konversiEnamKilo,
  konversiEnamMeter,
  konversiLimaMeter,
  konversiTujuhKilo,
  kotakBadan,
  kotakBeras,
  kotakKoin,
  papanBengkel,
  pasangAlat,
  pasangDapur,
  perkiraanBerat,
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

function KartuBingkai({ children, latar = "bg-white" }: { children: ReactNode; latar?: string }) {
  return (
    <section className={`rounded-[1.75rem] border-4 border-[#1C01A5]/15 ${latar} px-4 py-5 shadow-sm sm:px-6 sm:py-6`}>
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Dimas: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Salsa: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bimo: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Kiki: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Dimas: "👦",
  Salsa: "👧",
  Bimo: "👦",
  Kiki: "🐿️",
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
  warna,
  src,
  alt,
  kelas,
  kelamin,
  penjelasan,
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      <div className="mt-3">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </article>
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

const SATUAN = ["g", "kg"];
const HASIL_BERAT = ["3.000 g", "2.000 g", "5 kg"];
const ALAT_C = ["Meteran roda", "Penggaris", "Timbangan besar"];
const ALAT_D = ["Meteran pita", "Penggaris", "Meteran roda"];
const TANGGA = ["mm", "cm", "m", "km"];
const URUT_PANJANG = ["1 m", "250 cm", "3.000 mm", "2 km"];
const URUT_BERAT = ["500 g", "1 kg 200 g", "2 kg", "3.000 g"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UKUR.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="👦👧🐿️" judul={kartu.judul} anak="Dimas, Salsa, Bimo, dan Kiki" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: mengenal satuan baku panjang (mm, cm, m, km) dan berat (g, kg), memilih alat ukur yang tepat, serta mengonversi satuan panjang dan berat.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan judul="Sub-bab 1 — Mengenal satuan baku panjang" warna="border-sky-200 bg-sky-50/60" src="/doodle-mtk/mtk-3-ukur-sub1.jpg" alt="Empat alat ukur panjang di bengkel kayu." kelas={kelas} kelamin={kelamin} penjelasan={["Dulu kita pernah mengukur dengan jengkal dan langkah kaki. Sekarang kita pakai satuan baku. Satuan baku itu ukurannya sama untuk semua orang.", "Untuk panjang, ada milimeter, sentimeter, meter, dan kilometer. Ayo kita kenali satu per satu!"]}>
          <Dialog nama="Dimas" anak="Kiki, aku ukur papan ini dapat 150 senti… eh, apa namanya?" />
          <Dialog nama="Kiki" anak="Sentimeter! Lambangnya cm!" />
          <Dialog nama="Salsa" anak="Kalau jarak rumahku ke sekolah, pakai apa?" />
          <Dialog nama="Dimas" anak="Itu jauh. Pakai kilometer, lambangnya km." />
          <Dialog nama="Bimo" anak="Kalau tebal buku, pakai apa?" />
          <Dialog nama="Kiki" anak="Pakai milimeter! Lambangnya mm. Benda kecil pakai mm, benda sedang pakai cm, benda besar pakai m, jarak jauh pakai km!" />
          <Papan anak={"mm — benda sangat tipis, seperti tebal kertas\ncm — pensil dan buku\nm — tinggi badan, meja, pintu\nkm — jarak antar tempat"} />
          <p className="text-sm font-black text-[#1C01A5]">Satuan baku ukurannya sama untuk semua orang. Pilih satuan sesuai ukuran bendanya.</p>
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Benda mana yang paling tepat diukur dengan sentimeter? Ucapkan namanya!" periksa={jawabPensil} petunjuk="Pikirkan benda yang ukurannya sedang, tidak terlalu kecil dan tidak terlalu besar." benar="Betul! Pensil itu benda kecil dan agak panjang!" />
          <TulisBebas id={idKuis("A", 1)} judul="Empat satuan" visual={<Papan anak={"mm\ncm\nm\nkm"} />} pertanyaan="Tulis nama benda di kotak satuan yang tepat: tebal koin, panjang pensil, tinggi pintu, dan jarak kota!" pesanSalah="Pasangkan tiap benda dengan satu satuan." bantuan="mm = tebal koin. cm = panjang pensil. m = tinggi pintu. km = jarak kota." umpan="Koin, pensil, pintu, dan kota sudah pada kotaknya." periksa={kotakKoin} alias={["koin", "pensil", "pintu", "kota"]} konteks="mm = koin, cm = pensil, m = pintu, km = kota." />
        </Adegan>
        <Adegan judul="Sub-bab 2 — Mengenal satuan baku berat" warna="border-rose-200 bg-rose-50/60" src="/doodle-mtk/mtk-3-ukur-sub2.jpg" alt="Timbangan kecil dan timbangan besar." kelas={kelas} kelamin={kelamin} penjelasan={["Untuk berat, satuan bakunya ada gram dan kilogram. Benda ringan diukur dengan gram. Benda berat diukur dengan kilogram.", "Ada juga satuan ton untuk benda sangat berat, tapi itu akan kalian pelajari nanti. Ayo kita lihat contohnya!"]}>
          <Dialog nama="Salsa" anak="Dimas, kartu ini beratnya berapa?" />
          <Dialog nama="Dimas" anak="Pakai timbangan dapur. Hasilnya 5 gram. Lambangnya g." />
          <Dialog nama="Bimo" anak="Kalau karung beras ini?" />
          <Dialog nama="Dimas" anak="Itu berat. Pakai timbangan besar. Hasilnya 25 kilogram, lambangnya kg." />
          <Dialog nama="Kiki" anak="Gram untuk benda ringan, kilogram untuk benda berat!" />
          <Dialog nama="Salsa" anak="Jadi 1 kg itu berapa gram?" />
          <Dialog nama="Kiki" anak="1 kg = 1.000 gram!" />
          <Dialog nama="Bimo" anak="Banyak sekali! Jadi kilogram jauh lebih berat, ya." />
          <Papan anak={"g — benda ringan: kartu, koin, kertas\nkg — benda berat: beras, gula, badan\n1 kg = 1.000 g"} />
          <p className="text-sm font-black text-[#1C01A5]">Gram untuk benda ringan, kilogram untuk benda berat. 1 kg = 1.000 g.</p>
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Benda mana yang diukur dengan kilogram: koin atau karung gula? Ucapkan namanya!" periksa={jawabGula} petunjuk="Mana yang lebih berat dan lebih besar? Itu yang pakai kilogram." benar="Karung gula." />
          <TulisBebas id={idKuis("A", 3)} judul="Perkiraan berat" visual={<Papan anak={"5 g\n5 kg\n1.000 g\n1 kg"} />} pertanyaan="Tulis perkiraan berat koin dan berat karung beras di kotak yang tepat!" pesanSalah="Koin ringan. Karung beras berat." bantuan="Koin kira-kira 5 g. Karung beras kecil kira-kira 5 kg." umpan="Koin ≈ 5 g. Karung beras kecil ≈ 5 kg." periksa={perkiraanBerat} alias={["5 g", "5 kg"]} konteks="Koin kira-kira 5 g. Karung beras kecil kira-kira 5 kg." />
        </Adegan>
        <Adegan judul="Sub-bab 3 — Memilih alat ukur yang tepat" warna="border-emerald-200 bg-emerald-50/70" src="/doodle-mtk/mtk-3-ukur-sub3.jpg" alt="Penggaris, meteran pita, meteran roda, dan timbangan." kelas={kelas} kelamin={kelamin} penjelasan={["Setiap benda punya alat ukur yang paling cocok. Untuk benda kecil dan pendek, kita pakai penggaris. Untuk benda agak panjang, kita pakai meteran pita.", "Untuk jarak jauh, kita pakai meteran roda. Untuk berat, kita pakai timbangan yang sesuai ukurannya."]}>
          <Dialog nama="Dimas" anak="Kiki, aku mau ukur panjang kertas. Pakai apa?" />
          <Dialog nama="Kiki" anak="Pakai penggaris! Cocok untuk benda kecil." />
          <Dialog nama="Salsa" anak="Kalau kain panjang?" />
          <Dialog nama="Dimas" anak="Pakai meteran pita. Bisa lentur dan panjang." />
          <Dialog nama="Bimo" anak="Kalau panjang jalan di depan bengkel?" />
          <Dialog nama="Kiki" anak="Pakai meteran roda! Didorong sepanjang jalan, angkanya muncul!" />
          <Dialog nama="Salsa" anak="Kalau berat karung?" />
          <Dialog nama="Dimas" anak="Pakai timbangan gantung atau timbangan besar." />
          <Papan anak={"Penggaris — pensil, kertas, buku\nMeteran pita — kain, tali, lingkar pinggang\nMeteran roda — jalan, lapangan\nTimbangan dapur — tepung dan gula\nTimbangan besar — beras dan badan"} />
          <p className="text-sm font-black text-[#1C01A5]">Alat ukur harus sesuai ukuran benda dan bentuknya.</p>
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Alat ukur mana yang lebih tepat untuk kain panjang: penggaris atau meteran pita? Ucapkan!" periksa={jawabMeteranPita} petunjuk="Kain itu panjang dan lentur. Alat ukurnya harus bisa mengikuti bentuknya." benar="Meteran pita." />
          <TulisBebas id={idKuis("A", 5)} judul="Hubungkan benda dan alat" visual={<Papan anak={"Penggaris\nMeteran roda\nTimbangan besar"} />} pertanyaan="Gambar garis penghubung antara pensil, lapangan sekolah, dan karung beras dengan alat ukur yang tepat!" pesanSalah="Setiap benda punya satu alat." bantuan="Pensil ke penggaris. Lapangan ke meteran roda. Karung beras ke timbangan besar." umpan="Pensil, lapangan, dan karung beras sudah terhubung." periksa={pasangAlat} alias={["pensil", "lapangan", "beras"]} konteks="Pensil pakai penggaris. Lapangan pakai meteran roda. Karung beras pakai timbangan besar." />
        </Adegan>
        <Adegan judul="Sub-bab 4 — Konversi satuan panjang" warna="border-amber-200 bg-amber-50/70" src="/doodle-mtk/mtk-3-ukur-sub4.jpg" alt="Tangga satuan panjang dan papan kayu." kelas={kelas} kelamin={kelamin} penjelasan={["Sekarang kita belajar mengubah satuan panjang. Dari milimeter sampai meter, turun satu tingkat dikali sepuluh, naik satu tingkat dibagi sepuluh.", "Urutannya dari kecil ke besar: milimeter, sentimeter, desimeter, meter. Kilometer ke meter loncatnya seribu, bukan sepuluh."]}>
          <Dialog nama="Dimas" anak="Panjang papan ini 2 meter. Berapa sentimeter, ya?" />
          <Dialog nama="Salsa" anak="Meter ke sentimeter turun 2 tingkat. Jadi dikali 10 dua kali." />
          <Dialog nama="Kiki" anak="Kali 10, jadi 20. Kali 10 lagi, jadi 200!" />
          <Dialog nama="Dimas" anak="Jadi 2 m = 200 cm!" />
          <Dialog nama="Bimo" anak="Kalau 500 cm berapa meter?" />
          <Dialog nama="Salsa" anak="Naik 2 tingkat, berarti dibagi 100. 500 ÷ 100 = 5 m!" />
          <Papan anak={"mm — cm — dm — m\nTurun 1 tingkat = × 10\nNaik 1 tingkat = ÷ 10\n1 m = 100 cm\n1 m = 1.000 mm\n1 km = 1.000 m"} />
          <p className="text-sm font-black text-[#1C01A5]">Dari milimeter sampai meter, turun dikali 10 dan naik dibagi 10. Satu kilometer sama dengan 1.000 meter.</p>
          <KuisSuara id={idKuis("A", 6)} pertanyaan="3 meter sama dengan berapa sentimeter? Ucapkan angkanya!" periksa={jawabTigaRatusCm} petunjuk="Meter ke sentimeter turun dua tingkat, jadi dikali 100." benar="Tiga ratus sentimeter." />
          <TulisBebas id={idKuis("A", 7)} judul="Tiga konversi" visual={<Papan anak={"5 m = ⬜ cm\n400 cm = ⬜ m\n2 km = ⬜ m"} />} pertanyaan="Tulis hasil konversinya di kanvas!" pesanSalah="Meter ke sentimeter dikali 100. Sentimeter ke meter dibagi 100. Kilometer ke meter dikali 1.000." bantuan="5 m = 500 cm. 400 cm = 4 m. 2 km = 2.000 m." umpan="500 cm, 4 m, dan 2.000 m." periksa={konversiLimaMeter} alias={["500", "4", "2000"]} konteks="5 m = 500 cm. 400 cm = 4 m. 2 km = 2.000 m." />
        </Adegan>
        <Adegan judul="Sub-bab 5 — Konversi satuan berat" warna="border-violet-200 bg-violet-50/70" src="/doodle-mtk/mtk-3-ukur-sub5.jpg" alt="Timbangan seimbang antara satu kilogram dan sepuluh bagian seratus gram." kelas={kelas} kelamin={kelamin} penjelasan={["Konversi berat juga punya aturan tetap. Satu kilogram sama dengan seribu gram.", "Kalau kilogram diubah ke gram, kita kali seribu. Kalau gram diubah ke kilogram, kita bagi seribu."]}>
          <Dialog nama="Bimo" anak="Karung ini beratnya 3 kilogram. Berapa gram, ya?" />
          <Dialog nama="Salsa" anak="Kilogram ke gram, berarti dikali 1.000." />
          <Dialog nama="Kiki" anak="3 × 1.000 = 3.000 gram!" />
          <Dialog nama="Dimas" anak="Kalau 5.000 gram berapa kilogram?" />
          <Dialog nama="Salsa" anak="Dibagi 1.000. 5.000 ÷ 1.000 = 5 kg!" />
          <Dialog nama="Bimo" anak="Jadi kalau bilangnya setengah kilo, itu berapa gram?" />
          <Dialog nama="Kiki" anak="Setengah dari 1.000, jadi 500 gram!" />
          <Papan anak={"1 kg = 1.000 g\nkg ke g: × 1.000\ng ke kg: ÷ 1.000\n2 kg = 2.000 g\n500 g = setengah kilo\n3.000 g = 3 kg"} />
          <p className="text-sm font-black text-[#1C01A5]">kg ke g dikali 1.000. g ke kg dibagi 1.000.</p>
          <KuisSuara id={idKuis("A", 8)} pertanyaan="4 kilogram sama dengan berapa gram? Ucapkan angkanya!" periksa={jawabEmpatRibuGram} petunjuk="Kilogram ke gram dikali 1.000." benar="Empat ribu gram." />
          <TulisBebas id={idKuis("A", 9)} judul="Tiga konversi berat" visual={<Papan anak={"6 kg = ⬜ g\n9.000 g = ⬜ kg\n2 kg 500 g = ⬜ g"} />} pertanyaan="Tulis hasil konversinya di kanvas!" pesanSalah="Kali atau bagi 1.000, lalu jumlahkan gram yang tersisa." bantuan="6 kg = 6.000 g. 9.000 g = 9 kg. 2 kg 500 g = 2.500 g." umpan="6.000 g, 9 kg, dan 2.500 g." periksa={konversiEnamKilo} alias={["6000", "9", "2500"]} konteks="6 kg = 6.000 g. 9.000 g = 9 kg. 2 kg 500 g = 2.500 g." />
        </Adegan>
        <h5 className="text-center text-base font-black text-[#1C01A5]">Lima soal akhir kartu A</h5>
        <Pilih id={idKuis("A", 10)} pertanyaan="1. Satuan mana yang paling tepat untuk mengukur tebal koin?" pilihan={[{ huruf: "A", teks: "mm" }, { huruf: "B", teks: "cm" }, { huruf: "C", teks: "m" }, { huruf: "D", teks: "km" }]} benar="A" umpan="Koin sangat tipis, jadi pakai milimeter." salah="Pilih satuan untuk benda yang sangat tipis." />
        <KuisCocok id={idKuis("A", 11)} perintah="2. Pasangkan setiap benda dengan satuan berat yang tepat." baris={[{ kiri: "Sebutir koin", pilihan: SATUAN, benar: "g" }, { kiri: "Sekarung beras", pilihan: SATUAN, benar: "kg" }, { kiri: "Selembar kartu", pilihan: SATUAN, benar: "g" }]} umpan="Koin dan kartu pakai gram. Beras pakai kilogram." />
        <SusunToken id={idKuis("A", 12)} perintah="3. Susun satuan panjang dari yang paling kecil ke paling besar." acak={["m", "mm", "km", "cm"]} benar={TANGGA} umpan="mm, cm, m, lalu km." salah="Mulai dari milimeter." />
        <KuisBenarSalah id={idKuis("A", 13)} perintah="4. Detektif ukuran." baris={[{ teks: "1 meter sama dengan 100 sentimeter.", benar: true }, { teks: "1 kilogram sama dengan 100 gram.", benar: false }, { teks: "Penggaris tepat untuk mengukur panjang pensil.", benar: true }]} umpan="Benar, salah, benar. 1 kg = 1.000 g." />
        <Pilih id={idKuis("A", 14)} pertanyaan="5. Tiga pasangan cocok. Mana yang tidak cocok?" pilihan={[{ huruf: "A", teks: "Pensil → penggaris" }, { huruf: "B", teks: "Kain panjang → meteran pita" }, { huruf: "C", teks: "Karung beras → penggaris" }, { huruf: "D", teks: "Panjang jalan → meteran roda" }]} benar="C" umpan="Karung beras diukur dengan timbangan, bukan penggaris." salah="Cari benda yang tidak diukur panjangnya." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "A")} pertanyaan="Tulis kalimat kunci: Satuan baku sama untuk semua orang." alias={["satuan baku", "sama"]} konteks="Satuan baku sama untuk semua orang." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UKUR.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu ikon="📊🐿️" judul={kartu.judul} anak="Satuan, alat, dan konversi" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan judul="Sub-bab 1 — Satuan panjang" warna="border-sky-200 bg-sky-50/60" src="/doodle-mtk/mtk-3-ukur-sub1.jpg" alt="Empat alat ukur dengan contoh benda." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan panjang baku ada empat yang perlu kalian kenal: milimeter, sentimeter, meter, dan kilometer.", "Benda tipis pakai milimeter. Benda kecil pakai sentimeter. Benda sedang pakai meter. Jarak jauh pakai kilometer."]}>
          <Papan anak={"mm — tebal koin dan kertas\ncm — pensil dan buku\nm — pintu dan meja\nkm — jarak antar kota"} />
          <p className="text-sm font-semibold text-slate-700">Tinggi pintu sekitar dua langkah besar. Bukan sebesar pensil, dan bukan sejauh antar kota. Satuannya meter.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: kecil pakai kecil, besar pakai besar.</p>
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Satuan panjang apa yang tepat untuk mengukur panjang meja? Ucapkan lambangnya." periksa={jawabMeter} petunjuk="Meja lebih besar dari pensil, dan bukan jarak antar kota." benar="Meter." />
          <TulisBebas id={idKuis("B", 1)} judul="Empat benda" visual={<Papan anak={"mm\ncm\nm\nkm"} />} pertanyaan="Tulis nama benda di kotak satuan yang tepat: koin, pensil, tinggi badan, dan jarak kota!" pesanSalah="Setiap kotak mendapat satu benda." bantuan="mm = koin. cm = pensil. m = tinggi badan. km = jarak kota." umpan="Koin, pensil, tinggi badan, dan kota." periksa={kotakBadan} alias={["koin", "pensil", "badan", "kota"]} konteks="mm = koin, cm = pensil, m = tinggi badan, km = kota." />
        </Adegan>
        <Adegan judul="Sub-bab 2 — Satuan berat" warna="border-rose-200 bg-rose-50/60" src="/doodle-mtk/mtk-3-ukur-sub2.jpg" alt="Timbangan gram dan timbangan kilogram." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan berat baku yang perlu kalian kenal ada dua: gram dan kilogram.", "Benda ringan diukur dengan gram. Benda berat diukur dengan kilogram. Satu kilogram sama dengan seribu gram."]}>
          <Papan anak={"g — koin, kartu, rempah\nkg — beras, gula, berat badan\n1 kg = 1.000 g"} />
          <p className="text-sm font-semibold text-slate-700">Berat badan Bimo 35 satuan. 35 gram hanya seberat beberapa koin. Berat badan memakai kilogram.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: ringan pakai gram, berat pakai kilogram.</p>
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Kalau berat buku ini sekitar 500, satuannya gram atau kilogram? Ucapkan." periksa={jawabGram} petunjuk="500 kilogram sangat berat untuk sebuah buku." benar="Gram." />
          <TulisBebas id={idKuis("B", 3)} judul="Dua benda" visual={<Papan anak={"g\nkg"} />} pertanyaan="Tulis nama bendanya di kotak satuan yang tepat: koin dan sekarung beras!" pesanSalah="Satu ringan, satu berat." bantuan="g = koin. kg = karung beras." umpan="Koin pakai gram. Beras pakai kilogram." periksa={kotakBeras} alias={["koin", "beras"]} konteks="g = koin. kg = karung beras." />
        </Adegan>
        <Adegan judul="Sub-bab 3 — Alat ukur" warna="border-emerald-200 bg-emerald-50/70" src="/doodle-mtk/mtk-3-ukur-sub3.jpg" alt="Lima alat ukur dan benda contohnya." kelas={kelas} kelamin={kelamin} penjelasan={["Penggaris untuk benda pendek dan lurus. Meteran pita untuk benda panjang yang lentur. Meteran roda untuk mengukur jarak di tanah.", "Timbangan untuk berat. Pilih alat yang paling cocok supaya hasilnya tepat."]}>
          <Papan anak={"Penggaris — mm, cm — pensil dan buku\nMeteran pita — cm, m — kain dan tali\nMeteran roda — m — jalan dan lapangan\nTimbangan dapur — g — tepung dan gula\nTimbangan besar — kg — beras dan badan"} />
          <p className="text-sm font-semibold text-slate-700">Tali panjang dan melengkung. Penggaris kaku tidak bisa mengikuti lengkungannya. Cocoknya meteran pita.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: lentur pakai meteran pita, kaku pakai penggaris.</p>
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Alat ukur apa yang tepat untuk mengukur panjang lapangan?" periksa={jawabMeteranRoda} petunjuk="Lapangan itu panjang dan ada di tanah." benar="Meteran roda." />
          <TulisBebas id={idKuis("B", 5)} judul="Tiga alat" visual={<Papan anak={"Timbangan dapur\nMeteran pita\nPenggaris"} />} pertanyaan="Tulis nama bendanya di kotak alat ukur yang tepat: tepung, kain, dan pensil!" pesanSalah="Setiap alat mendapat satu benda." bantuan="Timbangan dapur = tepung. Meteran pita = kain. Penggaris = pensil." umpan="Tepung, kain, dan pensil sudah pada kotaknya." periksa={pasangDapur} alias={["tepung", "kain", "pensil"]} konteks="Tepung pakai timbangan dapur. Kain pakai meteran pita. Pensil pakai penggaris." />
        </Adegan>
        <Adegan judul="Sub-bab 4 — Konversi satuan panjang" warna="border-amber-200 bg-amber-50/70" src="/doodle-mtk/mtk-3-ukur-sub4.jpg" alt="Tangga satuan dari meter sampai milimeter." kelas={kelas} kelamin={kelamin} penjelasan={["Konversi artinya mengubah satuan. Dari milimeter, sentimeter, desimeter, sampai meter, turun satu tingkat dikali sepuluh dan naik satu tingkat dibagi sepuluh.", "Kilometer tidak naik satu kali sepuluh. Satu kilometer sama dengan seribu meter."]}>
          <Papan anak={"mm — cm — dm — m\nTurun × 10, naik ÷ 10\n1 km = 1.000 m\n3 m = 300 cm\n700 cm = 7 m"} />
          <p className="text-sm font-semibold text-slate-700">3 m ke cm turun dua tingkat, dikali 100, hasilnya 300 cm. 700 cm ke m naik dua tingkat, dibagi 100, hasilnya 7 m.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: turun kali, naik bagi. Kilometer ke meter dikali 1.000.</p>
          <KuisSuara id={idKuis("B", 6)} pertanyaan="4 m sama dengan berapa sentimeter? Ucapkan angkanya." periksa={jawabEmpatRatusCm} petunjuk="Dikali 100." benar="Empat ratus sentimeter." />
          <TulisBebas id={idKuis("B", 7)} judul="Tiga hasil" visual={<Papan anak={"2 m = ⬜ cm\n900 cm = ⬜ m\n3 km = ⬜ m"} />} pertanyaan="Tulis hasil konversinya!" pesanSalah="Samakan arahnya: kali saat turun, bagi saat naik." bantuan="2 m = 200 cm. 900 cm = 9 m. 3 km = 3.000 m." umpan="200 cm, 9 m, dan 3.000 m." periksa={konversiDuaMeter} alias={["200", "9", "3000"]} konteks="2 m = 200 cm. 900 cm = 9 m. 3 km = 3.000 m." />
        </Adegan>
        <Adegan judul="Sub-bab 5 — Konversi satuan berat" warna="border-violet-200 bg-violet-50/70" src="/doodle-mtk/mtk-3-ukur-sub5.jpg" alt="Timbangan yang seimbang." kelas={kelas} kelamin={kelamin} penjelasan={["Untuk berat, kuasai gram dan kilogram. Satu kilogram sama dengan seribu gram.", "Kilogram diubah ke gram dikali seribu. Gram diubah ke kilogram dibagi seribu."]}>
          <Papan anak={"kg ke g: × 1.000\ng ke kg: ÷ 1.000\n5 kg = 5.000 g\n8.000 g = 8 kg\n3 kg 200 g = 3.200 g"} />
          <p className="text-sm font-semibold text-slate-700">Ubah kilogram dulu, lalu tambahkan gram sisanya. 3 kg = 3.000 g, ditambah 200 g menjadi 3.200 g.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: kilo ke gram, tambah tiga nol.</p>
          <KuisSuara id={idKuis("B", 8)} pertanyaan="7 kg sama dengan berapa gram? Ucapkan angkanya." periksa={jawabTujuhRibuGram} petunjuk="Dikali 1.000." benar="Tujuh ribu gram." />
          <TulisBebas id={idKuis("B", 9)} judul="Tiga hasil berat" visual={<Papan anak={"4 kg = ⬜ g\n6.000 g = ⬜ kg\n1 kg 400 g = ⬜ g"} />} pertanyaan="Tulis hasil konversinya!" pesanSalah="Kali atau bagi 1.000, lalu tambahkan sisa gramnya." bantuan="4 kg = 4.000 g. 6.000 g = 6 kg. 1 kg 400 g = 1.400 g." umpan="4.000 g, 6 kg, dan 1.400 g." periksa={konversiEmpatKilo} alias={["4000", "6", "1400"]} konteks="4 kg = 4.000 g. 6.000 g = 6 kg. 1 kg 400 g = 1.400 g." />
        </Adegan>
        <h5 className="text-center text-base font-black text-[#1C01A5]">Lima soal akhir kartu B</h5>
        <Pilih id={idKuis("B", 10)} pertanyaan="1. Manakah konversi yang benar?" pilihan={[{ huruf: "A", teks: "2 m = 20 cm" }, { huruf: "B", teks: "2 m = 200 cm" }, { huruf: "C", teks: "2 m = 2.000 cm" }, { huruf: "D", teks: "2 m = 2 cm" }]} benar="B" umpan="Meter ke sentimeter dikali 100. 2 × 100 = 200." salah="Hitung dua tingkat dari meter ke sentimeter." />
        <KuisCocok id={idKuis("B", 11)} perintah="2. Pasangkan setiap nilai dengan hasil konversinya." baris={[{ kiri: "3 kg", pilihan: HASIL_BERAT, benar: "3.000 g" }, { kiri: "2 kg", pilihan: HASIL_BERAT, benar: "2.000 g" }, { kiri: "5.000 g", pilihan: HASIL_BERAT, benar: "5 kg" }]} umpan="3.000 g, 2.000 g, dan 5 kg." />
        <SusunToken id={idKuis("B", 12)} perintah="3. Susun dari yang paling pendek ke paling panjang." acak={["2 km", "250 cm", "1 m", "3.000 mm"]} benar={URUT_PANJANG} umpan="1 m, 250 cm, 3.000 mm, lalu 2 km." salah="1 m = 100 cm. 3.000 mm = 300 cm. 2 km paling panjang." />
        <KuisBenarSalah id={idKuis("B", 13)} perintah="4. Cek konversi." baris={[{ teks: "3.000 gram sama dengan 3 kilogram.", benar: true }, { teks: "1 km sama dengan 100 m.", benar: false }, { teks: "500 cm sama dengan 5 m.", benar: true }]} umpan="Benar, salah, benar. 1 km = 1.000 m. 500 ÷ 100 = 5." />
        <Pilih id={idKuis("B", 14)} pertanyaan="5. Aku sama dengan 4.000 gram. Kalau diubah ke kilogram, hasilku berapa?" pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "40" }, { huruf: "D", teks: "400" }]} benar="B" umpan="4.000 ÷ 1.000 = 4 kg." salah="Gram ke kilogram dibagi 1.000." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "B")} pertanyaan="Tulis kalimat kunci: 1 kilogram sama dengan 1.000 gram." alias={["kilogram", "1000"]} konteks="1 kilogram sama dengan 1.000 gram." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UKUR.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🔨🐿️"
        judul={kartu.judul}
        anak="Sepuluh pos · ukur, ubah, timbang"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini, kalian menjadi tukang kayu di bengkel. Pelanggan datang memesan kayu dengan ukuran tertentu.",
          "Kalian harus memilih alat ukur yang tepat, mengukur dengan benar, dan mengubah satuan kalau pesanannya memakai satuan berbeda.",
          "Ayo kita mulai bekerja!",
        ])}
      />
      <GambarDoodle src="/doodle-mtk/mtk-3-ukur-permainan.jpg" alt="Bengkel kayu. Kiki memakai topi tukang di meja kerja." ukuran="lebar" />
      <PanduanIkon judul="Simbol bengkel" butir={[{ ikon: "📏", teks: "Penggaris" }, { ikon: "🎗️", teks: "Meteran pita" }, { ikon: "⭕", teks: "Meteran roda" }, { ikon: "🔄", teks: "Ulang lagi" }, { ikon: "🪙", teks: "Koin" }]} />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu tukang kayu. Pesanan tepat berarti koin masuk. Alat ukur harus sesuai benda, dan satuan harus sesuai pesanan.</p>
        <p>Level 1: papan lurus 80 cm memakai penggaris. Level 2: hasil ukur papan itu 80 cm. Level 3: 3 m = 300 cm.</p>
        <p>Level 4: karung paku memakai timbangan besar. Level 5 memakai angkanya sendiri: 2 × 150 cm = 300 cm = 3 m, dan 1 kg paku = 1.000 g.</p>
        <p>Meja Depan pesanan langsung, hadiahnya 1 koin. Meja Belakang ada konversi, hadiahnya 3 koin.</p>
        <p>Kaca Ukur memperlihatkan garis penggaris, tetapi biayanya 1 koin. Berani mengukur sendiri menambah 1 koin.</p>
        <p>Salah ukur berarti kayu terbuang. Meja kerja berputar balik dan kamu boleh mengulang. Koin tidak berkurang.</p>
        <p>Mode berdua: pemain A mengukur panjang, pemain B menimbang berat. Keduanya melaporkan satuan yang benar.</p>
        <p>Papan permainan ini sepuluh pos. Kumpulkan 10 koin untuk membuka Bengkel Besar dan mendapat celemek tukang.</p>
      </div>
      <MisiPenjagaKebun misi={MISI_MTK3_UKUR} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK3_UKUR} penutup="Bengkel Besar terbuka. Kiki memasang celemek tukang." bunga="🔨🪙🥇🐿️" />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal bengkel</h5>
        <Pilih id={idKuis("C", 10)} pertanyaan="1. Pelanggan memesan papan sepanjang 75 cm. Alat ukur mana yang paling tepat?" pilihan={[{ huruf: "A", teks: "Penggaris" }, { huruf: "B", teks: "Meteran roda" }, { huruf: "C", teks: "Timbangan besar" }, { huruf: "D", teks: "Timbangan dapur" }]} benar="A" umpan="Papan lurus diukur dengan penggaris." salah="Ini mengukur panjang, bukan berat." />
        <Pilih id={idKuis("C", 11)} pertanyaan="2. Pesanan kayu 4 m. Berapa nilainya dalam cm?" pilihan={[{ huruf: "A", teks: "40 cm" }, { huruf: "B", teks: "400 cm" }, { huruf: "C", teks: "4.000 cm" }, { huruf: "D", teks: "4 cm" }]} benar="B" umpan="Meter ke sentimeter dikali 100." salah="Jangan dikali 10 sekali saja." />
        <KuisCocok id={idKuis("C", 12)} perintah="3. Pasangkan setiap pesanan dengan alat ukur yang tepat." baris={[{ kiri: "Panjang lapangan", pilihan: ALAT_C, benar: "Meteran roda" }, { kiri: "Panjang pensil", pilihan: ALAT_C, benar: "Penggaris" }, { kiri: "Berat karung beras", pilihan: ALAT_C, benar: "Timbangan besar" }]} umpan="Roda, penggaris, dan timbangan besar." />
        <SusunToken id={idKuis("C", 13)} perintah="4. Susun dari yang paling ringan ke paling berat." acak={["2 kg", "500 g", "3.000 g", "1 kg 200 g"]} benar={URUT_BERAT} umpan="500 g, 1 kg 200 g, 2 kg, lalu 3.000 g." salah="Ubah dulu ke gram: 500, 1.200, 2.000, dan 3.000." />
        <KuisBenarSalah id={idKuis("C", 14)} perintah="5. Cek bengkel." baris={[{ teks: "5 meter sama dengan 500 sentimeter.", benar: true }, { teks: "Penggaris cocok untuk mengukur panjang jalan.", benar: false }, { teks: "2 kilogram sama dengan 2.000 gram.", benar: true }]} umpan="Benar, salah, benar. Jalan diukur dengan meteran roda." />
        <Pilih id={idKuis("C", 15)} pertanyaan="6. Tiga pasangan cocok. Mana yang tidak cocok?" pilihan={[{ huruf: "A", teks: "Tepung 200 g → timbangan dapur" }, { huruf: "B", teks: "Berat badan → timbangan badan" }, { huruf: "C", teks: "Panjang jalan → penggaris" }, { huruf: "D", teks: "Panjang kain → meteran pita" }]} benar="C" umpan="Jalan yang panjang tidak diukur dengan penggaris." salah="Cari alat yang terlalu pendek untuk bendanya." />
        <Pilih id={idKuis("C", 16)} pertanyaan="7. Mana nilai yang paling besar?" pilihan={[{ huruf: "A", teks: "3 m" }, { huruf: "B", teks: "250 cm" }, { huruf: "C", teks: "2.000 mm" }, { huruf: "D", teks: "1 m 50 cm" }]} benar="A" umpan="3 m = 300 cm. Yang lain 250 cm, 200 cm, dan 150 cm." salah="Ubah semua ke sentimeter dulu." />
        <Pilih id={idKuis("C", 17)} pertanyaan="8. Panjang papan naik teratur: 50 cm – 100 cm – 150 cm – ⬜" pilihan={[{ huruf: "A", teks: "175 cm" }, { huruf: "B", teks: "200 cm" }, { huruf: "C", teks: "225 cm" }, { huruf: "D", teks: "250 cm" }]} benar="B" umpan="Naik 50 cm setiap langkah. 150 + 50 = 200." salah="Lihat selisih antara 50, 100, dan 150." />
        <KuisSuara id={idKuis("C", 18)} pertanyaan="Kayu ini panjangnya tiga ratus sentimeter. Berapa meter? Ucapkan lengkap." periksa={jawabTigaMeter} petunjuk="Bagi 300 dengan 100." benar="Tiga meter." />
        <TulisBebas id={idKuis("C", 19)} judul="Papan catatan bengkel" visual={<Papan anak={"2 papan × 150 cm = ⬜ cm\n⬜ cm = ⬜ m"} />} pertanyaan="Hitung total panjang kedua papan dalam cm, lalu ubah ke meter!" pesanSalah="Kalikan dulu, lalu bagi 100." bantuan="2 × 150 = 300 cm. 300 cm = 3 m." umpan="300 cm sama dengan 3 m." periksa={papanBengkel} alias={["300 cm", "3 m"]} konteks="2 × 150 = 300 cm. 300 cm = 3 m." />
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
  const lencana = skor >= 9 ? "🧑🔧 Tukang Ukur Ahli" : skor >= 6 ? "🔨 Tukang Ukur Cerdas" : "🐿️ Sahabat Kiki";
  const pesan = skor >= 9 ? "Luar biasa! Semua ukuranmu tepat!" : skor >= 6 ? "Hebat! Sedikit lagi jadi tukang ahli!" : "Ayo berlatih lagi bersama Kiki, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-amber-50/80">
      <KepalaKartu
        ikon="📝🐿️"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal tentang pengukuran panjang dan berat.",
          "Beberapa soal meminta kalian memilih satuan yang tepat, beberapa mengubah satuan, dan beberapa memilih alat ukur.",
          "Ingat: turun tangga dikali sepuluh, naik tangga dibagi sepuluh, dan satu kilogram sama dengan seribu gram. Jangan terburu-buru, dan periksa lagi jawabanmu.",
        ])}
      />
      <GambarDoodle src="/doodle-mtk/mtk-3-ukur-evaluasi.jpg" alt="Meja ujian dengan pensil, penggaris, dan timbangan kecil. Kiki mengangkat ibu jarinya." ukuran="lebar" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Konversi panjang" visual={<Papan anak={"6 m = ⬜ cm\n800 cm = ⬜ m\n4 km = ⬜ m"} />} pertanyaan="Tulis hasil konversi ketiganya!" pesanSalah="Dikali 100 untuk meter ke sentimeter. Dibagi 100 untuk sebaliknya. Kilometer ke meter dikali 1.000." bantuan="6 m = 600 cm. 800 cm = 8 m. 4 km = 4.000 m." umpan="600 cm, 8 m, dan 4.000 m." periksa={konversiEnamMeter} alias={["600", "8", "4000"]} konteks="6 m = 600 cm. 800 cm = 8 m. 4 km = 4.000 m." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Satuan mana yang paling tepat untuk mengukur tinggi pintu?" pilihan={[{ huruf: "A", teks: "mm" }, { huruf: "B", teks: "cm" }, { huruf: "C", teks: "m" }, { huruf: "D", teks: "km" }]} benar="C" umpan="Tinggi pintu memakai meter." salah="Pintu lebih tinggi dari pensil, dan bukan jarak antar kota." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="Ucapkan 5.000 gram dalam kilogram." periksa={jawabLimaKilo} petunjuk="Bagi dengan 1.000." benar="Lima kilogram." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Salsa menulis: panjang lapangan bola lebih tepat diukur dengan penggaris, karena penggaris mudah dibawa. Apakah Salsa benar?" pilihan={[{ huruf: "A", teks: "Benar, karena penggaris mudah dibawa" }, { huruf: "B", teks: "Salah, lapangan itu panjang, jadi lebih tepat pakai meteran roda" }, { huruf: "C", teks: "Salah, karena lapangan diukur dengan timbangan" }, { huruf: "D", teks: "Tidak bisa ditentukan" }]} benar="B" umpan="Alat dipilih karena sesuai bendanya, bukan karena mudah dibawa." salah="Lihat panjang lapangannya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan setiap benda dengan alat ukurnya." baris={[{ kiri: "Panjang kain", pilihan: ALAT_D, benar: "Meteran pita" }, { kiri: "Panjang pensil", pilihan: ALAT_D, benar: "Penggaris" }, { kiri: "Panjang lapangan", pilihan: ALAT_D, benar: "Meteran roda" }]} umpan="Pita, penggaris, dan roda." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Konversi berat" visual={<Papan anak={"7 kg = ⬜ g\n9.000 g = ⬜ kg\n2 kg 300 g = ⬜ g"} />} pertanyaan="Tulis hasil konversi ketiganya!" pesanSalah="Kali atau bagi 1.000, lalu tambahkan sisa gram." bantuan="7 kg = 7.000 g. 9.000 g = 9 kg. 2 kg 300 g = 2.300 g." umpan="7.000 g, 9 kg, dan 2.300 g." periksa={konversiTujuhKilo} alias={["7000", "9", "2300"]} konteks="7 kg = 7.000 g. 9.000 g = 9 kg. 2 kg 300 g = 2.300 g." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Mana nilai yang paling besar?" pilihan={[{ huruf: "A", teks: "2 m" }, { huruf: "B", teks: "180 cm" }, { huruf: "C", teks: "1.500 mm" }, { huruf: "D", teks: "1 m 20 cm" }]} benar="A" umpan="2 m = 200 cm. Yang lain 180 cm, 150 cm, dan 120 cm." salah="Ubah semua ke sentimeter dulu." />
        <SusunToken id={idKuis("D", 7)} perintah="8. Susun dari yang paling pendek ke paling panjang." acak={["2 km", "3.000 mm", "250 cm", "1 m"]} benar={URUT_PANJANG} umpan="1 m, 250 cm, 3.000 mm, lalu 2 km." salah="1 m = 100 cm. 3.000 mm = 300 cm." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="Ucapkan alat ukur yang tepat untuk karung beras, lalu jelaskan alasannya singkat." periksa={jawabTimbanganBesar} petunjuk="Karung beras itu berat." benar="Timbangan besar, karena karung beras berat." />
        <TulisBebas id={idKuis("D", 9)} judul="10. Pesanan Bengkel Kiki" visual={<Papan anak={"A: papan 2 m\nB: tali 250 cm\nC: paku 3 kg"} />} pertanyaan="Berapa panjang papan A dalam cm? Pesanan mana yang lebih panjang, A atau B? Berapa berat paku C dalam gram?" pesanSalah="Ubah A ke cm, bandingkan dengan 250 cm, lalu ubah 3 kg ke gram." bantuan="A = 200 cm. B lebih panjang. C = 3.000 g." umpan="200 cm. Pesanan B lebih panjang. 3.000 g." periksa={bengkelTiga} alias={["200", "b", "3000"]} konteks="2 m = 200 cm. Pesanan B lebih panjang. 3 kg = 3.000 g." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "D")} pertanyaan="Tulis kalimat kunci: Turun kali sepuluh, naik bagi sepuluh." alias={["kali", "bagi"]} konteks="Turun kali sepuluh, naik bagi sepuluh." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">Soal memakai satuan panjang mm, cm, m, dan km, satuan berat g dan kg, pemilihan alat ukur, dan konversi. Dari milimeter sampai meter, satu tingkat dikali atau dibagi 10. Satu kilometer sama dengan 1.000 meter, bukan 10 meter.</p>
        <p className="mt-2">Kesalahan yang paling sering: salah menghitung jumlah tingkat, misalnya mengira 1 m = 10 cm; menukar arah kali dan bagi; serta memilih alat karena mudah dibawa, bukan karena sesuai bendanya.</p>
        <p className="mt-2">Soal 1, 4, dan 7 menyasar ketiganya. Pada soal 4, alasan Salsa masuk akal secara praktis, tetapi lapangan yang panjang memakai meteran roda. Soal 7 dan 8 meminta satuan disamakan dulu sebelum dibandingkan atau diurutkan.</p>
        <p className="mt-2">Soal 10 tiga langkah: panjang A dalam cm, pembandingan dengan B, lalu berat C dalam gram. Jika anak hanya menyelesaikan bagian pertama, minta ia membaca ulang dua bagian berikutnya.</p>
        <p className="mt-2">Siapkan penggaris, meteran pita, dan timbangan di kelas. Minta anak mengukur benda di sekitar sekolah dan menuliskan satuannya. Untuk konversi, tempel tangga mm–cm–dm–m, lalu ingatkan kartu terpisah: 1 km = 1.000 m dan 1 kg = 1.000 g.</p>
      </aside>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Ukur({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const poin = [
    "Satuan baku sama untuk semua orang.",
    "Kecil pakai kecil, besar pakai besar: mm, cm, m, km.",
    "Ringan pakai gram, berat pakai kilogram.",
    "Pilih alat sesuai benda. Kaku pakai penggaris, lentur pakai meteran pita.",
    "Dari milimeter sampai meter, turun kali sepuluh dan naik bagi sepuluh.",
    "1 kilometer = 1.000 meter. 1 kilogram = 1.000 gram.",
    "Lentur pakai meteran pita, jarak jauh pakai meteran roda.",
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
          src: "/doodle-mtk/mtk-3-ukur-poin.jpg",
          alt: "Kiki berdiri di papan kalimat kunci. Penggaris, meteran, dan timbangan mengelilinginya.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Satuan baku itu ukurannya sama untuk semua orang.",
          "Untuk panjang: milimeter, sentimeter, meter, dan kilometer. Untuk berat: gram dan kilogram. Pilih alat ukur sesuai benda yang diukur.",
          "Dari milimeter sampai meter, turun tangga dikali sepuluh dan naik tangga dibagi sepuluh. Satu kilometer sama dengan seribu meter, dan satu kilogram sama dengan seribu gram.",
        ])}
        poin={poin}
        penutup="Pilih satuan, pilih alat, lalu ubah dengan tangga yang benar."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
