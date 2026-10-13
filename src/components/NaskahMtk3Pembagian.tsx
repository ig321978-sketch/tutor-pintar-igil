"use client";

import GambarDoodle from "@/components/GambarDoodle";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import PanduanIkon, { type ButirIkon } from "@/components/PanduanIkon";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK3_PEMBAGIAN, TEMA_MTK3_PEMBAGIAN } from "@/lib/misi-mtk-3-pembagian";
import { MODUL_MTK3_PEMBAGIAN } from "@/lib/modul-resmi-mtk-3-pembagian";
import {
  bacaLimaKali,
  bacaTujuhPuluhDua,
  jawabBoleh,
  jawabDua,
  jawabEnam,
  jawabLima,
  jawabSembilan,
  jawabTigaKali,
  jawabTujuh,
  kalimatBagi,
  keluarga36,
  keluarga56,
  langkah24,
  langkah28,
  meja12,
  periksa45,
  periksa56,
  periksa64,
  pesta85,
  sisa23,
  sisa31,
  sisa37,
} from "@/lib/nilai-mtk-3-pembagian";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_PEMBAGIAN.id;

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
  Rina: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bagas: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Melati: "border-[#16A34A]/20 bg-[#F0FDF4]",
  "Kelinci Putih": "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Rina: "👧",
  Bagas: "👦",
  Melati: "👧",
  "Kelinci Putih": "🐇",
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
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      <div className="mt-3">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      </div>
      {simbol ? <PanduanIkon butir={simbol} /> : null}
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

const HASIL_A = ["4", "9"];
const KELUARGA_B = ["48 ÷ 6 = 8", "45 ÷ 5 = 9", "42 ÷ 6 = 7"];
const CEK_C = ["9 × 7 = 63", "7 × 6 = 42", "7 × 4 = 28"];
const CEK_D = ["8 × 4 = 32", "9 × 6 = 54", "9 × 5 = 45"];
const URUT_HASIL = ["24 ÷ 8", "45 ÷ 9", "64 ÷ 8", "81 ÷ 9"];
const URUT_PESTA = ["36 ÷ 9", "45 ÷ 9", "56 ÷ 8", "72 ÷ 8"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PEMBAGIAN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="👧👦🐇"
        judul={kartu.judul}
        anak="Rina, Bagas, Melati, dan Kelinci Putih"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: memahami pembagian sebagai pengurangan berulang dan pembagian sama banyak, melakukan pembagian tanpa sisa dan dengan sisa, serta memahami hubungan perkalian dan pembagian.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Pembagian = berbagi sama banyak"
          warna="border-rose-200 bg-rose-50/60"
          src="/doodle-mtk/mtk-3-pembagian-sub1.jpg"
          alt="Dua belas wortel dibagi ke empat keranjang. Kelinci putih berdiri di kebun."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Anak-anak, hari ini kita belajar pembagian. Pembagian itu artinya membagi rata.",
            "Kalau ada dua belas wortel dibagi ke empat keranjang dengan jumlah sama, kita sedang membagi. Setiap keranjang mendapat jumlah yang sama. Ayo kita lihat bersama!",
          ]}
        >
          <Dialog nama="Rina" anak="Bagas, ada 12 wortel. Kita punya 4 keranjang." />
          <Dialog nama="Bagas" anak="Aku mau isi semuanya! Jadi berapa tiap keranjang?" />
          <Dialog nama="Melati" anak="Harus sama banyak, ya. Ayo kita bagi." />
          <Dialog nama="Kelinci Putih" anak="Bagikan satu-satu bergiliran! Satu, dua, tiga, empat… ulangi lagi!" />
          <Dialog nama="Rina" anak="Setiap keranjang dapat 1, lalu 1 lagi, lalu 1 lagi. Jadi 3 wortel tiap keranjang!" />
          <Dialog nama="Bagas" anak="Jadi 12 ÷ 4 = 3!" />
          <Dialog nama="Melati" anak="Betul! Itu namanya pembagian." />
          <Papan anak={"🥕🥕🥕 | 🥕🥕🥕 | 🥕🥕🥕 | 🥕🥕🥕\n12 ÷ 4 = 3\nDibaca: dua belas bagi empat sama dengan tiga"} />
          <p className="text-sm font-black text-[#1C01A5]">Pembagian = membagi rata. Setiap kelompok mendapat jumlah yang sama.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Ada 15 apel dan 3 keranjang. Berapa isi setiap keranjang kalau dibagi sama banyak? Ucapkan!"
            periksa={jawabLima}
            petunjuk="Bagikan satu-satu bergiliran sampai apelnya habis."
            benar="Betul! Kamu sudah bisa membagi rata!"
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="18 bunga dan 6 vas"
            visual={<Papan anak="18 ÷ 6 = ⬜" />}
            pertanyaan="Tulis kalimat pembagiannya dan hasilnya di kanvas!"
            pesanSalah="Bagikan 18 bunga ke 6 vas sama banyak."
            bantuan="Garis-garis menghubungkan bunga ke vas. Tiap vas mendapat 3."
            umpan="18 ÷ 6 = 3."
            periksa={(teks) => kalimatBagi(teks, "18", "6", "3")}
            alias={["18", "6", "3"]}
            konteks="18 ÷ 6 = 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Pembagian sebagai pengurangan berulang"
          warna="border-sky-200 bg-sky-50/60"
          src="/doodle-mtk/mtk-3-pembagian-sub2.jpg"
          alt="Dua puluh wortel dikelompokkan lima-lima sampai habis."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Ada cara lain untuk membagi. Kita kurangi sedikit-sedikit sampai habis. Lalu kita hitung berapa kali pengurangannya.",
            "Contohnya dua puluh dibagi lima. Kita kurangi lima terus sampai habis. Banyaknya pengurangan itulah hasil baginya.",
          ]}
        >
          <Dialog nama="Bagas" anak="20 wortel harus dimasukkan ke kantong. Tiap kantong isi 5." />
          <Dialog nama="Melati" anak="Ayo pakai pengurangan berulang!" />
          <Dialog nama="Rina" anak="20 − 5 = 15. Belum habis. Kurangi lagi." />
          <Dialog nama="Bagas" anak="15 − 5 = 10. Lanjut! 10 − 5 = 5. Lalu 5 − 5 = 0. Habis!" />
          <Dialog nama="Melati" anak="Berapa kali kita mengurangi? 4 kali!" />
          <Dialog nama="Kelinci Putih" anak="Jadi 20 ÷ 5 = 4!" />
          <Papan anak={"20 − 5 = 15 → 1\n15 − 5 = 10 → 2\n10 − 5 = 5 → 3\n5 − 5 = 0 → 4\n20 ÷ 5 = 4 (dikurangi 4 kali)"} />
          <p className="text-sm font-black text-[#1C01A5]">Pembagian = pengurangan berulang sampai habis. Banyaknya pengurangan = hasil baginya.</p>
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Kalau 18 dikurangi 6 terus sampai habis, berapa kali pengurangannya?"
            periksa={jawabTigaKali}
            petunjuk="18 − 6 = 12, lalu 12 − 6 = 6, lalu 6 − 6 = 0. Hitung berapa langkah."
            benar="Tiga kali. 18 ÷ 6 = 3."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Pengurangan 24 ÷ 8"
            visual={<Papan anak="24 ÷ 8 = ⬜" />}
            pertanyaan="Tulis semua langkah pengurangan berulangnya, lalu tulis hasil baginya!"
            pesanSalah="Kurangi 8 sampai habis, lalu hitung langkahnya."
            bantuan="24 − 8 = 16. 16 − 8 = 8. 8 − 8 = 0. Tiga kali, jadi hasilnya 3."
            umpan="24 − 8 = 16; 16 − 8 = 8; 8 − 8 = 0. Jadi 24 ÷ 8 = 3."
            periksa={langkah24}
            alias={["16", "0", "3"]}
            konteks="24 − 8 = 16. 16 − 8 = 8. 8 − 8 = 0. 24 ÷ 8 = 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Pembagian tanpa sisa"
          warna="border-emerald-200 bg-emerald-50/70"
          src="/doodle-mtk/mtk-3-pembagian-sub3.jpg"
          alt="Empat tempat pensil berisi sama banyak dan tanda centang tidak ada sisa."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau semua benda terbagi habis, itu disebut pembagian tanpa sisa. Artinya tidak ada benda yang tertinggal.",
            "Semua kelompok mendapat jumlah yang sama persis. Ayo kita berlatih.",
          ]}
        >
          <Dialog nama="Rina" anak="Ada 28 pensil. Ada 4 tempat." />
          <Dialog nama="Melati" anak="Berapa isi tiap tempat supaya sama?" />
          <Dialog nama="Bagas" anak="Aku hitung: 28 bagi 4. Berapa kali 4 supaya jadi 28? 7 kali!" />
          <Dialog nama="Melati" anak="Coba periksa dengan perkalian: 4 × 7 = 28. Betul!" />
          <Dialog nama="Rina" anak="Jadi 28 ÷ 4 = 7, dan tidak ada sisa!" />
          <Dialog nama="Kelinci Putih" anak="Pensilnya habis terbagi! Tidak ada yang tertinggal!" />
          <Papan anak={"28 ÷ 4 = 7\nPeriksa: 4 × 7 = 28\nPembagiannya tanpa sisa."} />
          <Dialog nama="Melati" anak="Cara memeriksanya selalu pakai perkalian, ya. Hasil bagi dikali pembaginya." />
          <Dialog nama="Bagas" anak="Kalau hasilnya sama dengan bilangan yang dibagi, berarti benar!" />
          <p className="text-sm font-black text-[#1C01A5]">Pembagian tanpa sisa berarti habis terbagi. Periksa dengan perkalian.</p>
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Ada 36 kelereng dan 6 kantong kecil. Berapa isi tiap kantong kalau dibagi sama dan tidak ada sisa?"
            periksa={jawabEnam}
            petunjuk="Coba tanya dirimu: 6 kali berapa supaya hasilnya 36?"
            benar="Enam. 6 × 6 = 36."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Periksa 45 ÷ 5"
            visual={<Papan anak={"45 ÷ 5 = ⬜\n5 × ⬜ = 45"} />}
            pertanyaan="Tulis hasil baginya, lalu tulis pemeriksaannya dengan perkalian!"
            pesanSalah="Tanya: 5 kali berapa supaya jadi 45?"
            bantuan="Tabel perkalian 5: 5 × 9 = 45."
            umpan="45 ÷ 5 = 9. Pemeriksaan 5 × 9 = 45."
            periksa={periksa45}
            alias={["9", "5 x 9 = 45"]}
            konteks="45 ÷ 5 = 9. 5 × 9 = 45."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Pembagian dengan sisa"
          warna="border-amber-200 bg-amber-50/70"
          src="/doodle-mtk/mtk-3-pembagian-sub4.jpg"
          alt="Tiga keranjang berisi empat wortel dan dua wortel sisa di luar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kadang benda tidak bisa terbagi habis. Ada sisa yang tidak cukup untuk satu kelompok lagi. Itulah pembagian dengan sisa.",
            "Yang penting, sisanya selalu lebih kecil dari pembaginya. Ayo kita lihat contohnya.",
          ]}
        >
          <Dialog nama="Rina" anak="Ada 14 wortel. Kita punya 3 keranjang." />
          <Dialog nama="Bagas" anak="Ayo bagi rata! Satu, dua, tiga… ulangi." />
          <Dialog nama="Melati" anak="Tiap keranjang dapat 4, lalu sisa 2!" />
          <Dialog nama="Bagas" anak="Kok ada sisa?" />
          <Dialog nama="Kelinci Putih" anak="Karena 2 wortel itu tidak cukup untuk mengisi satu keranjang penuh lagi. Jadi mereka jadi sisa!" />
          <Papan anak={"🥕🥕🥕🥕 | 🥕🥕🥕🥕 | 🥕🥕🥕🥕 | 🥕🥕 sisa\n14 ÷ 3 = 4 sisa 2\nPeriksa: (3 × 4) + 2 = 14"} />
          <Dialog nama="Melati" anak="Ingat, sisanya harus lebih kecil dari pembaginya. 2 lebih kecil dari 3, jadi benar." />
          <Dialog nama="Bagas" anak="Kalau sisanya 4, berarti bisa dibagi lagi, ya!" />
          <Dialog nama="Rina" anak="Betul! Berarti pembagiannya belum selesai." />
          <p className="text-sm font-black text-[#1C01A5]">Ada sisa kalau tidak cukup untuk satu kelompok lagi. Sisa selalu lebih kecil dari pembagi.</p>
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Ada 17 kue dan 5 piring. Kalau dibagi rata, berapa sisa kuenya? Ucapkan angkanya!"
            periksa={jawabDua}
            petunjuk="5 kali berapa yang paling dekat dengan 17 tanpa melebihi? Lalu hitung sisanya."
            benar="Dua. 5 × 3 = 15, dan 17 − 15 = 2."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="23 ÷ 4"
            visual={<Papan anak="23 ÷ 4 = ⬜ sisa ⬜" />}
            pertanyaan="Tulis hasil bagi dan sisanya, lalu tulis pemeriksaannya!"
            pesanSalah="Cari 4 kali berapa yang paling dekat dengan 23 tanpa melebihi."
            bantuan="Daftar perkalian 4: 4 × 5 = 20. 23 − 20 = 3."
            umpan="23 ÷ 4 = 5 sisa 3. Pemeriksaan (4 × 5) + 3 = 23."
            periksa={sisa23}
            alias={["5 sisa 3", "23"]}
            konteks="23 ÷ 4 = 5 sisa 3. (4 × 5) + 3 = 23."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Hubungan perkalian dan pembagian"
          warna="border-violet-200 bg-violet-50/70"
          src="/doodle-mtk/mtk-3-pembagian-sub5.jpg"
          alt="Segitiga yang menghubungkan angka 5, 6, dan 30."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Perkalian dan pembagian itu bersaudara. Kalau kita tahu satu perkalian, kita bisa membuat dua pembagian.",
            "Contohnya tiga kali empat sama dengan dua belas. Maka dua belas bagi empat sama dengan tiga, dan dua belas bagi tiga sama dengan empat. Satu keluarga, tiga kalimat!",
          ]}
        >
          <Dialog nama="Melati" anak="Lihat tiga angka ini: 5, 6, dan 30. Ayo bikin keluarga kalimat!" />
          <Dialog nama="Rina" anak="Perkaliannya: 5 × 6 = 30. Dan 6 × 5 = 30." />
          <Dialog nama="Bagas" anak="Pembagiannya: 30 ÷ 5 = 6, dan 30 ÷ 6 = 5!" />
          <Dialog nama="Kelinci Putih" anak="Satu keluarga angka, empat kalimat! Hebat!" />
          <Dialog nama="Melati" anak="Jadi kalau kalian lupa hasil pembagian, tanya dirimu: berapa kali pembaginya supaya hasilnya bilangan yang dibagi?" />
          <Dialog nama="Bagas" anak="Seperti mencari bagian yang hilang dalam perkalian!" />
          <Dialog nama="Rina" anak="Betul! Itu sebabnya perkalian dan pembagian disebut bersaudara." />
          <Papan anak={"5 × 6 = 30\n6 × 5 = 30\n30 ÷ 5 = 6\n30 ÷ 6 = 5"} />
          <p className="text-sm font-black text-[#1C01A5]">Satu keluarga angka menghasilkan dua perkalian dan dua pembagian.</p>
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Kalau 7 × 8 = 56, berapa hasil 56 ÷ 8? Ucapkan!"
            periksa={jawabTujuh}
            petunjuk="Tanya dirimu: 8 kali berapa supaya jadi 56?"
            benar="Tujuh. 56 ÷ 8 = 7."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Keluarga 4, 9, dan 36"
            visual={<Papan anak={"4 × 9 = ⬜\n36 ÷ 4 = ⬜\n36 ÷ 9 = ⬜"} />}
            pertanyaan="Lengkapi keluarga kalimat ini!"
            pesanSalah="Kalikan dulu, lalu balik menjadi dua pembagian."
            bantuan="Segitiga menghubungkan 4, 9, dan 36."
            umpan="4 × 9 = 36. 36 ÷ 4 = 9. 36 ÷ 9 = 4."
            periksa={keluarga36}
            alias={["36", "9", "4"]}
            konteks="4 × 9 = 36. 36 ÷ 4 = 9. 36 ÷ 9 = 4."
          />
        </Adegan>

        <h5 className="text-center text-base font-black text-[#1C01A5]">Lima soal akhir kartu A</h5>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Ada 24 kue dan 6 kotak. Berapa isi setiap kotak kalau dibagi sama banyak?"
          visual={<Papan anak="24 ÷ 6" />}
          pilihan={[
            { huruf: "A", teks: "3" },
            { huruf: "B", teks: "4" },
            { huruf: "C", teks: "5" },
            { huruf: "D", teks: "6" },
          ]}
          benar="B"
          umpan="6 × 4 = 24. Tiap kotak berisi 4."
          salah="Tanya: 6 kali berapa supaya jadi 24?"
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan setiap pembagian dengan hasilnya."
          baris={[
            { kiri: "32 ÷ 8", pilihan: HASIL_A, benar: "4" },
            { kiri: "63 ÷ 7", pilihan: HASIL_A, benar: "9" },
            { kiri: "45 ÷ 5", pilihan: HASIL_A, benar: "9" },
          ]}
          umpan="8 × 4 = 32. 7 × 9 = 63. 5 × 9 = 45."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun balok supaya jadi kalimat benar."
          acak={["7", "=", "÷", "42", "6"]}
          benar={["42", "÷", "6", "=", "7"]}
          umpan="42 ÷ 6 = 7."
          salah="Bilangan yang dibagi ada di depan tanda bagi."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif pembagian."
          baris={[
            { teks: "Sisa pembagian selalu lebih kecil dari pembaginya.", benar: true },
            { teks: "38 ÷ 5 = 7 sisa 3.", benar: true },
            { teks: "Kalau 6 × 7 = 42, maka 42 ÷ 6 = 7.", benar: true },
          ]}
          umpan="Benar, benar, benar. 5 × 7 = 35 dan 38 − 35 = 3."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga kotak hasilnya sama. Mana yang berbeda?"
          visual={<Papan anak={"A. 48 ÷ 6\nB. 3 × 3\nC. 72 ÷ 9\nD. 56 ÷ 7"} />}
          pilihan={[
            { huruf: "A", teks: "48 ÷ 6" },
            { huruf: "B", teks: "3 × 3" },
            { huruf: "C", teks: "72 ÷ 9" },
            { huruf: "D", teks: "56 ÷ 7" },
          ]}
          benar="B"
          umpan="3 × 3 = 9. Tiga kotak yang lain hasilnya 8."
          salah="Hitung tiap kotak. Tiga di antaranya sama dengan 8."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Pembagian artinya bagi rata."
          alias={["bagi rata", "pembagian"]}
          konteks="Pembagian artinya bagi rata."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PEMBAGIAN.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu
        ikon="📊🐇"
        judul={kartu.judul}
        anak="Bagi rata, kurangi, periksa, dan buat keluarga angka"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Pembagian = berbagi sama banyak"
          warna="border-rose-200 bg-rose-50/60"
          src="/doodle-mtk/mtk-3-pembagian-sub1.jpg"
          alt="Keranjang apel yang terhubung dari satu tumpukan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pembagian artinya membagi rata. Jumlah seluruh benda dibagi ke beberapa kelompok, dan setiap kelompok mendapat jumlah yang sama.",
            "Tanda pembagian adalah titik dua.",
          ]}
        >
          <Papan anak={"Bilangan yang dibagi = benda seluruhnya\nPembagi = jumlah kelompok\nHasil bagi = isi setiap kelompok"} />
          <p className="text-sm font-semibold text-slate-700">Contoh: 20 jeruk dibagi ke 4 keranjang. Tulis 20 ÷ 4. Tanya: 4 kali berapa supaya jadi 20? Jawabannya 5. Periksa 4 × 5 = 20. Isi tiap keranjang 5 jeruk.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: bagi ke berapa kelompok? Berapa isi tiap kelompok?</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Ada 35 buku dan 5 rak. Berapa buku di setiap rak kalau dibagi sama?"
            periksa={jawabTujuh}
            petunjuk="5 kali berapa supaya jadi 35?"
            benar="Tujuh. 5 × 7 = 35."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            judul="54 ÷ 6"
            visual={<Papan anak="54 ÷ 6 = ⬜" />}
            pertanyaan="Tulis kalimat pembagiannya dan hasilnya!"
            pesanSalah="6 kali berapa supaya jadi 54?"
            bantuan="6 × 9 = 54."
            umpan="54 ÷ 6 = 9."
            periksa={(teks) => kalimatBagi(teks, "54", "6", "9")}
            alias={["54", "6", "9"]}
            konteks="54 ÷ 6 = 9."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Pengurangan berulang"
          warna="border-sky-200 bg-sky-50/60"
          src="/doodle-mtk/mtk-3-pembagian-sub2.jpg"
          alt="Baris angka yang dikelompokkan delapan-delapan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pembagian bisa juga dikerjakan dengan pengurangan berulang. Kurangi bilangan itu dengan pembaginya sampai habis.",
            "Hitung berapa kali kamu mengurangi. Angka itulah hasil baginya.",
          ]}
        >
          <p className="text-sm font-semibold text-slate-700">Contoh 24 ÷ 8. 24 − 8 = 16 (ke-1). 16 − 8 = 8 (ke-2). 8 − 8 = 0 (ke-3). Dikurangi 3 kali, jadi 24 ÷ 8 = 3.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: kurangi sampai habis, hitung berapa kali.</p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="30 − 6 − 6 − 6 − 6 − 6 = 0. Berapa kali pengurangannya? Berarti 30 ÷ 6 = berapa?"
            periksa={bacaLimaKali}
            petunjuk="Sebut berapa kali, lalu sebut kalimat pembagiannya."
            benar="Lima kali. Tiga puluh bagi enam sama dengan lima."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            judul="Langkah 28 ÷ 7"
            visual={<Papan anak="28 ÷ 7 = ⬜" />}
            pertanyaan="Tulis langkah pengurangan berulangnya dan hasilnya!"
            pesanSalah="Kurangi 7 sampai habis."
            bantuan="28 − 7 = 21. 21 − 7 = 14. 14 − 7 = 7. 7 − 7 = 0. Empat kali."
            umpan="28 − 7 = 21; 21 − 7 = 14; 14 − 7 = 7; 7 − 7 = 0. Jadi 28 ÷ 7 = 4."
            periksa={langkah28}
            alias={["21", "14", "0", "4"]}
            konteks="28 − 7 = 21. 21 − 7 = 14. 14 − 7 = 7. 7 − 7 = 0. 28 ÷ 7 = 4."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Pembagian tanpa sisa"
          warna="border-emerald-200 bg-emerald-50/70"
          src="/doodle-mtk/mtk-3-pembagian-sub3.jpg"
          alt="Empat keranjang berisi sama banyak dan tulisan tidak ada sisa."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pembagian tanpa sisa artinya semua benda terbagi habis. Tidak ada yang tertinggal.",
            "Untuk memeriksanya, kalikan hasil bagi dengan pembaginya. Kalau hasilnya sama dengan bilangan yang dibagi, berarti benar.",
          ]}
        >
          <p className="text-sm font-semibold text-slate-700">Contoh 36 ÷ 9. Tanya: 9 kali berapa supaya jadi 36? Jawabannya 4. Periksa 9 × 4 = 36. Jadi 36 ÷ 9 = 4 tanpa sisa.</p>
          <Papan anak={"Cari hasil: 9 × ⬜ = 36\nPeriksa: 9 × 4 = 36"} />
          <p className="text-sm font-black text-[#1C01A5]">Trik: habis terbagi? Periksa dengan perkalian.</p>
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Berapa hasil 42 ÷ 6?"
            periksa={jawabTujuh}
            petunjuk="6 kali berapa supaya jadi 42?"
            benar="Tujuh. 6 × 7 = 42."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            judul="64 ÷ 8"
            visual={<Papan anak={"64 ÷ 8 = ⬜\nKotak pemeriksaan"} />}
            pertanyaan="Tulis hasilnya dan pemeriksaannya dengan perkalian!"
            pesanSalah="8 kali berapa supaya jadi 64?"
            bantuan="8 × 8 = 64."
            umpan="64 ÷ 8 = 8. Pemeriksaan 8 × 8 = 64."
            periksa={periksa64}
            alias={["8", "8 x 8 = 64"]}
            konteks="64 ÷ 8 = 8. 8 × 8 = 64."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Pembagian dengan sisa"
          warna="border-amber-200 bg-amber-50/70"
          src="/doodle-mtk/mtk-3-pembagian-sub4.jpg"
          alt="Keranjang wortel dan dua wortel di luar yang bertanda sisa."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau benda tidak bisa terbagi habis, ada sisa. Sisanya adalah benda yang tidak cukup untuk membuat satu kelompok lagi.",
            "Aturannya satu: sisa selalu lebih kecil dari pembaginya. Untuk memeriksa, kalikan hasil bagi dengan pembagi, lalu tambahkan sisanya.",
          ]}
        >
          <p className="text-sm font-semibold text-slate-700">Contoh 26 ÷ 5. 5 × 5 = 25, tidak melebihi. Sisa 26 − 25 = 1. Jadi 26 ÷ 5 = 5 sisa 1. Periksa (5 × 5) + 1 = 26. Sisa 1 lebih kecil dari 5.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: cari yang paling dekat tapi tidak melebihi. Sisanya selalu kecil.</p>
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="22 dibagi 4. Berapa sisanya?"
            periksa={jawabDua}
            petunjuk="4 × 5 = 20. Hitung 22 dikurangi 20."
            benar="Dua. 22 ÷ 4 = 5 sisa 2."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            judul="31 ÷ 6"
            visual={<Papan anak="31 ÷ 6 = ⬜ sisa ⬜" />}
            pertanyaan="Tulis hasil bagi dan sisanya, lalu tulis pemeriksaannya!"
            pesanSalah="6 kali berapa yang paling dekat dengan 31 tanpa melebihi?"
            bantuan="6 × 5 = 30. 31 − 30 = 1."
            umpan="31 ÷ 6 = 5 sisa 1. Pemeriksaan (6 × 5) + 1 = 31."
            periksa={sisa31}
            alias={["5 sisa 1", "31"]}
            konteks="31 ÷ 6 = 5 sisa 1. (6 × 5) + 1 = 31."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Hubungan perkalian dan pembagian"
          warna="border-violet-200 bg-violet-50/70"
          src="/doodle-mtk/mtk-3-pembagian-sub5.jpg"
          alt="Segitiga keluarga angka dengan tanda kali dan bagi."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Setiap perkalian bisa diubah menjadi dua pembagian. Kalau tiga angka sudah bersaudara, kita bisa bolak-balik memakainya.",
            "Ini sangat membantu kalau kalian lupa hasil pembagian. Cukup tanya: pembaginya dikali berapa supaya hasilnya bilangan yang dibagi?",
          ]}
        >
          <p className="text-sm font-semibold text-slate-700">Diketahui 6 × 7 = 42. Bilangan terbesar 42 menjadi bilangan yang dibagi. 42 ÷ 6 = 7 dan 42 ÷ 7 = 6.</p>
          <Papan anak={"6 × 7 = 42 → 42 ÷ 6 = 7 dan 42 ÷ 7 = 6\n8 × 9 = 72 → 72 ÷ 8 = 9 dan 72 ÷ 9 = 8\n5 × 6 = 30 → 30 ÷ 5 = 6 dan 30 ÷ 6 = 5"} />
          <p className="text-sm font-black text-[#1C01A5]">Trik: satu perkalian, dua pembagian. Satu keluarga angka.</p>
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="9 × 4 = 36. Berapa hasil 36 ÷ 4?"
            periksa={jawabSembilan}
            petunjuk="4 kali berapa supaya jadi 36?"
            benar="Sembilan. 36 ÷ 4 = 9."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            judul="Keluarga 7, 8, dan 56"
            visual={<Papan anak={"7 × 8 = ⬜\n56 ÷ 7 = ⬜\n56 ÷ 8 = ⬜"} />}
            pertanyaan="Lengkapi keluarga kalimat ini!"
            pesanSalah="Kalikan dulu, lalu buat dua pembagian."
            bantuan="7 × 8 = 56."
            umpan="7 × 8 = 56. 56 ÷ 7 = 8. 56 ÷ 8 = 7."
            periksa={keluarga56}
            alias={["56", "8", "7"]}
            konteks="7 × 8 = 56. 56 ÷ 7 = 8. 56 ÷ 8 = 7."
          />
        </Adegan>

        <h5 className="text-center text-base font-black text-[#1C01A5]">Lima soal akhir kartu B</h5>
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Manakah yang hasilnya 7?"
          pilihan={[
            { huruf: "A", teks: "48 ÷ 8" },
            { huruf: "B", teks: "63 ÷ 9" },
            { huruf: "C", teks: "72 ÷ 8" },
            { huruf: "D", teks: "54 ÷ 6" },
          ]}
          benar="B"
          umpan="9 × 7 = 63."
          salah="Hitung tiap kartu. Yang dicari hasilnya 7."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan setiap perkalian dengan pembagiannya."
          baris={[
            { kiri: "6 × 8 = 48", pilihan: KELUARGA_B, benar: "48 ÷ 6 = 8" },
            { kiri: "5 × 9 = 45", pilihan: KELUARGA_B, benar: "45 ÷ 5 = 9" },
            { kiri: "6 × 7 = 42", pilihan: KELUARGA_B, benar: "42 ÷ 6 = 7" },
          ]}
          umpan="Satu perkalian menghasilkan pembagian yang membaliknya."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari hasil terkecil ke terbesar."
          acak={["64 ÷ 8", "24 ÷ 8", "81 ÷ 9", "45 ÷ 9"]}
          benar={URUT_HASIL}
          umpan="Hasilnya 3, 5, 8, lalu 9."
          salah="24 ÷ 8 = 3, 45 ÷ 9 = 5, 64 ÷ 8 = 8, 81 ÷ 9 = 9."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Cek pembagian."
          baris={[
            { teks: "47 ÷ 6 = 7 sisa 5.", benar: true },
            { teks: "Sisa boleh lebih besar dari pembagi.", benar: false },
            { teks: "52 ÷ 8 = 6 sisa 4.", benar: true },
          ]}
          umpan="Benar, salah, benar. 6 × 7 = 42 dan 47 − 42 = 5. 8 × 6 = 48 dan 52 − 48 = 4."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Aku hasil dari 8 × 4. Kalau aku dibagi 4, hasilnya 8. Angka berapa aku?"
          pilihan={[
            { huruf: "A", teks: "24" },
            { huruf: "B", teks: "28" },
            { huruf: "C", teks: "32" },
            { huruf: "D", teks: "36" },
          ]}
          benar="C"
          umpan="8 × 4 = 32, dan 32 ÷ 4 = 8."
          salah="Kalikan 8 dengan 4 dulu."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Sisa selalu lebih kecil dari pembagi."
          alias={["sisa", "lebih kecil"]}
          konteks="Sisa selalu lebih kecil dari pembagi."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PEMBAGIAN.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🥕🐇"
        judul={kartu.judul}
        anak="Sepuluh pos · bagi rata, sisa, periksa"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini, kalian menjadi petugas pesta di kebun wortel. Setiap tamu harus mendapat bagian yang sama.",
          "Kalau ada sisa, sisa itu dikumpulkan untuk cadangan. Tugas kalian adalah membagi rata, menghitung sisa, dan memeriksa hasilnya dengan perkalian.",
          "Ayo kita mulai!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-pembagian-permainan.jpg"
        alt="Meja pesta wortel. Kelinci putih memakai celemek di belakang tumpukan kantong."
        ukuran="lebar"
      />
      <PanduanIkon
        judul="Simbol pesta"
        butir={[
          { ikon: "🥕", teks: "Wortel" },
          { ikon: "🧺", teks: "Kantong" },
          { ikon: "🔍", teks: "Kaca pembesar" },
          { ikon: "🔄", teks: "Ulang lagi" },
          { ikon: "🥇", teks: "Lencana petugas" },
        ]}
      />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu petugas pesta. Setiap tamu mendapat bagian yang sama. Pembagian benar berarti tamu senang dan kantong terisi.</p>
        <p>Level 1: 24 wortel dan 6 kantong, jadi 24 ÷ 6 = 4. Level 2: 35 wortel, tiap kantong 7, dikurangi 5 kali.</p>
        <p>Level 3: 54 ÷ 6 = 9, diperiksa dengan 6 × 9 = 54. Level 4: 38 ÷ 5 = 7 sisa 3. Sisa 3 lebih kecil dari 5.</p>
        <p>Level 5 memakai angka pesta besar: 72 wortel dibagi ke 8 meja menjadi 9, lalu tiap meja mendapat 3 wortel lagi, jadi 12. Hasil level 1 tetap 4 dan tidak mengganti angka level 5.</p>
        <p>Meja Kecil soalnya pembagian tanpa sisa, hadiahnya 1 wortel. Meja Besar soalnya bersisa atau bertingkat, hadiahnya 3 wortel.</p>
        <p>Kaca Pembesar Kelinci menunjukkan daftar perkalian, tetapi biayanya 1 wortel. Berani menebak sendiri menambah 1 wortel.</p>
        <p>Salah membagi berarti ada tamu yang tidak mendapat bagian. Meja pesta berputar balik dan kamu boleh mengulang. Wortel tidak berkurang.</p>
        <p>Mode berdua: pemain A menghitung isi tiap kantong, pemain B menghitung sisa. Keduanya harus bertemu di angka yang sama.</p>
        <p>Papan permainan ini sepuluh pos. Kumpulkan 10 wortel untuk membuka Pesta Kebun Besar dan mendapat lencana petugas pesta.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK3_PEMBAGIAN}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK3_PEMBAGIAN}
        penutup="Pesta Kebun Besar terbuka. Kelinci Putih memasang lencana petugas pesta."
        bunga="🥕🧺🥇🐇"
      />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal pesta</h5>
        <Pilih
          id={idKuis("C", 10)}
          pertanyaan="1. Ada 42 wortel dan 7 kantong. Berapa isi tiap kantong?"
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "7" },
            { huruf: "D", teks: "8" },
          ]}
          benar="B"
          umpan="7 × 6 = 42."
          salah="7 kali berapa supaya jadi 42?"
        />
        <Pilih
          id={idKuis("C", 11)}
          pertanyaan="2. Berapa kali bilangan 40 dikurangi 8 sampai habis?"
          pilihan={[
            { huruf: "A", teks: "4 kali" },
            { huruf: "B", teks: "5 kali" },
            { huruf: "C", teks: "6 kali" },
            { huruf: "D", teks: "7 kali" },
          ]}
          benar="B"
          umpan="40 ÷ 8 = 5."
          salah="Kurangi 8 sampai habis, lalu hitung langkahnya."
        />
        <KuisCocok
          id={idKuis("C", 12)}
          perintah="3. Pasangkan setiap pembagian dengan pemeriksaannya."
          baris={[
            { kiri: "63 ÷ 9 = 7", pilihan: CEK_C, benar: "9 × 7 = 63" },
            { kiri: "42 ÷ 6 = 7", pilihan: CEK_C, benar: "7 × 6 = 42" },
            { kiri: "28 ÷ 4 = 7", pilihan: CEK_C, benar: "7 × 4 = 28" },
          ]}
          umpan="Hasil bagi dikali pembagi kembali ke bilangan semula."
        />
        <SusunToken
          id={idKuis("C", 13)}
          perintah="4. Susun dari hasil terkecil ke terbesar."
          acak={["72 ÷ 8", "36 ÷ 9", "56 ÷ 8", "45 ÷ 9"]}
          benar={URUT_PESTA}
          umpan="Hasilnya 4, 5, 7, lalu 9."
          salah="36 ÷ 9 = 4, 45 ÷ 9 = 5, 56 ÷ 8 = 7, 72 ÷ 8 = 9."
        />
        <KuisBenarSalah
          id={idKuis("C", 14)}
          perintah="5. Cek pembagian."
          baris={[
            { teks: "43 ÷ 5 = 8 sisa 3.", benar: true },
            { teks: "Sisa boleh sama dengan pembagi.", benar: false },
            { teks: "Kalau 8 × 6 = 48, maka 48 ÷ 6 = 8.", benar: true },
          ]}
          umpan="Benar, salah, benar. 5 × 8 = 40 dan 43 − 40 = 3."
        />
        <Pilih
          id={idKuis("C", 15)}
          pertanyaan="6. Pembagian 50 ÷ 6. Mana pernyataan yang benar?"
          pilihan={[
            { huruf: "A", teks: "50 ÷ 6 = 7 sisa 8" },
            { huruf: "B", teks: "50 ÷ 6 = 8 sisa 2" },
            { huruf: "C", teks: "50 ÷ 6 = 9 sisa 4" },
            { huruf: "D", teks: "50 ÷ 6 = 6 sisa 14" },
          ]}
          benar="B"
          umpan="6 × 8 = 48. 50 − 48 = 2, dan 2 lebih kecil dari 6."
          salah="Hasil kali pembagi tidak boleh melebihi 50, dan sisa harus lebih kecil dari 6."
        />
        <Pilih
          id={idKuis("C", 16)}
          pertanyaan="7. Kalau 5 × 8 = 40, mana pembagian yang benar?"
          visual={<Papan anak="5 · 8 · 40" />}
          pilihan={[
            { huruf: "A", teks: "40 ÷ 5 = 7" },
            { huruf: "B", teks: "40 ÷ 8 = 5" },
            { huruf: "C", teks: "40 ÷ 8 = 6" },
            { huruf: "D", teks: "40 ÷ 5 = 9" },
          ]}
          benar="B"
          umpan="40 ÷ 8 = 5."
          salah="Bilangan terbesar dibagi salah satu faktornya."
        />
        <Pilih
          id={idKuis("C", 17)}
          pertanyaan="8. Hasil pembagian naik teratur: 2 – 4 – 6 – ⬜ – 10. Angka yang hilang..."
          pilihan={[
            { huruf: "A", teks: "7" },
            { huruf: "B", teks: "8" },
            { huruf: "C", teks: "9" },
            { huruf: "D", teks: "11" },
          ]}
          benar="B"
          umpan="Naik 2 setiap langkah. 6 + 2 = 8."
          salah="Lihat selisih 2, 4, dan 6."
        />
        <KuisSuara
          id={idKuis("C", 18)}
          pertanyaan="Ada enam puluh tiga wortel, dibagi ke sembilan kantong sama banyak. Sebutkan isi tiap kantong."
          periksa={jawabTujuh}
          petunjuk="9 kali berapa supaya jadi 63?"
          benar="Tujuh."
        />
        <TulisBebas
          id={idKuis("C", 19)}
          judul="Papan catatan pesta"
          visual={<Papan anak={"72 ÷ 8 = ⬜\nLalu tiap meja ditambah 3"} />}
          pertanyaan="Tulis hasil pembagiannya dulu, lalu tulis jumlah akhir tiap meja!"
          pesanSalah="Bagi 72 dengan 8 dulu, lalu tambahkan 3."
          bantuan="72 ÷ 8 = 9. 9 + 3 = 12."
          umpan="72 ÷ 8 = 9. 9 + 3 = 12 wortel."
          periksa={meja12}
          alias={["9 dan 12", "9+3=12"]}
          konteks="72 ÷ 8 = 9. 9 + 3 = 12."
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_PEMBAGIAN.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Petugas Pesta Ahli" : skor >= 6 ? "🥕 Pembagi Cerdas" : "🐇 Sahabat Kelinci Putih";
  const pesan =
    skor >= 9
      ? "Luar biasa! Semua tamu dapat bagian yang sama!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi petugas pesta!"
        : "Ayo berlatih lagi bersama Kelinci Putih, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-amber-50/80">
      <KepalaKartu
        ikon="📝🐇"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal tentang pembagian.",
          "Beberapa soal meminta kalian membagi rata, beberapa menghitung sisa, dan beberapa memakai hubungan perkalian dan pembagian. Ada juga soal cerita yang harus kalian pikirkan dulu.",
          "Ingat: periksa hasilmu dengan perkalian, dan pastikan sisanya selalu lebih kecil dari pembagi. Jangan terburu-buru, dan periksa lagi jawabanmu. Selamat mengerjakan!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-pembagian-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan keranjang wortel. Kelinci mengangkat telinganya."
        ukuran="lebar"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Pembagian tanpa sisa"
          visual={<Papan anak={"56 ÷ 7 = ⬜\n7 × ⬜ = 56"} />}
          pertanyaan="Tulis hasil baginya, lalu tulis pemeriksaannya dengan perkalian!"
          pesanSalah="7 kali berapa supaya jadi 56?"
          bantuan="7 × 8 = 56."
          umpan="56 ÷ 7 = 8. Pemeriksaan 7 × 8 = 56."
          periksa={periksa56}
          alias={["8", "7 x 8 = 56"]}
          konteks="56 ÷ 7 = 8. 7 × 8 = 56."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Manakah yang benar?"
          pilihan={[
            { huruf: "A", teks: "40 ÷ 6 = 6 sisa 4" },
            { huruf: "B", teks: "40 ÷ 6 = 7 sisa 2" },
            { huruf: "C", teks: "40 ÷ 6 = 8 sisa 8" },
            { huruf: "D", teks: "40 ÷ 6 = 5 sisa 10" },
          ]}
          benar="A"
          umpan="6 × 6 = 36. 40 − 36 = 4, dan 4 lebih kecil dari 6."
          salah="Kalikan hasil bagi dengan 6, lalu cek apakah sisanya lebih kecil dari 6."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="Jika 72 dibagi 8 hasilnya sembilan, ucapkan kalimat pembagiannya lengkap."
          periksa={bacaTujuhPuluhDua}
          petunjuk="Sebut bilangan yang dibagi, pembagi, dan hasilnya."
          benar="Tujuh puluh dua bagi delapan sama dengan sembilan."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Bagas menulis: kalau 9 × 7 = 63, maka 63 ÷ 9 = 7 dan 63 ÷ 7 = 9. Apakah Bagas benar?"
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, seharusnya 63 ÷ 7 = 8" },
            { huruf: "C", teks: "Salah, seharusnya 63 ÷ 9 = 8" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="A"
          umpan="Satu perkalian menghasilkan dua pembagian."
          salah="Balik 9 × 7 = 63 menjadi dua pembagian."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan setiap pembagian dengan pemeriksaannya."
          baris={[
            { kiri: "32 ÷ 4 = 8", pilihan: CEK_D, benar: "8 × 4 = 32" },
            { kiri: "54 ÷ 6 = 9", pilihan: CEK_D, benar: "9 × 6 = 54" },
            { kiri: "45 ÷ 5 = 9", pilihan: CEK_D, benar: "9 × 5 = 45" },
          ]}
          umpan="Perkalian adalah kebalikan pembagian."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Pembagian dengan sisa"
          visual={<Papan anak="37 ÷ 5 = ⬜ sisa ⬜" />}
          pertanyaan="Tulis hasil bagi dan sisanya, lalu tulis pemeriksaannya!"
          pesanSalah="5 kali berapa yang paling dekat dengan 37 tanpa melebihi?"
          bantuan="5 × 7 = 35. 37 − 35 = 2."
          umpan="37 ÷ 5 = 7 sisa 2. Pemeriksaan (5 × 7) + 2 = 37."
          periksa={sisa37}
          alias={["7 sisa 2", "37"]}
          konteks="37 ÷ 5 = 7 sisa 2. (5 × 7) + 2 = 37."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. ⬜ ÷ 8 = 6. Bilangan yang dibagi..."
          visual={<Papan anak="⬜ ÷ 8 = 6" />}
          pilihan={[
            { huruf: "A", teks: "42" },
            { huruf: "B", teks: "46" },
            { huruf: "C", teks: "48" },
            { huruf: "D", teks: "54" },
          ]}
          benar="C"
          umpan="8 × 6 = 48."
          salah="Kalikan pembagi dengan hasil bagi."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari hasil terkecil ke terbesar."
          acak={["64 ÷ 8", "81 ÷ 9", "24 ÷ 8", "45 ÷ 9"]}
          benar={URUT_HASIL}
          umpan="Hasilnya 3, 5, 8, lalu 9."
          salah="24 ÷ 8 = 3, 45 ÷ 9 = 5, 64 ÷ 8 = 8, 81 ÷ 9 = 9."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="29 ÷ 4 = 7 sisa 1. Periksa apakah sisa ini boleh. Ucapkan boleh atau tidak boleh, lalu jelaskan alasannya."
          periksa={jawabBoleh}
          petunjuk="Bandingkan sisa dengan pembaginya."
          benar="Boleh, karena 1 lebih kecil dari 4."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Pesta Wortel Kelinci Putih"
          visual={<Papan anak={"85 wortel\n9 kantong"} />}
          pertanyaan="Berapa isi tiap kantong kalau dibagi rata? Berapa sisanya? Kalau sisa ditambahkan ke satu kantong, berapa isi kantong itu sekarang?"
          pesanSalah="Bagi dulu, tulis sisa, lalu tambahkan sisa ke satu kantong."
          bantuan="9 × 9 = 81. 85 − 81 = 4. Satu kantong menjadi 9 + 4 = 13."
          umpan="Tiap kantong 9, sisa 4, satu kantong menjadi 13."
          periksa={pesta85}
          alias={["9", "sisa 4", "13"]}
          konteks="85 ÷ 9 = 9 sisa 4. Satu kantong menjadi 13."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Periksa dengan perkalian."
          alias={["periksa", "perkalian"]}
          konteks="Periksa dengan perkalian."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">
          Seluruh soal memakai pembagian dalam tabel perkalian dasar, pembagi 1 sampai 10, hasil bagi sampai 10, termasuk pembagian bersisa.
        </p>
        <p className="mt-2">
          Kesalahan yang paling sering: menganggap sisa boleh sama atau lebih besar dari pembagi, tidak memeriksa hasil dengan perkalian, dan tertukar antara bilangan yang dibagi dan pembagi.
        </p>
        <p className="mt-2">
          Soal 2, 6, dan 9 menyasar ketiganya. Pada soal 2, pilihan A benar karena 6 × 6 = 36 dan sisa 4 lebih kecil dari 6. Pilihan lain gagal karena hasil kali pembagi tidak kembali ke 40, atau sisanya tidak lebih kecil dari 6.
        </p>
        <p className="mt-2">
          Soal 4 memakai hubungan perkalian dan pembagian. Soal 10 tiga langkah: bagi rata, cari sisa, lalu tambahkan sisa ke satu kantong. Jika anak hanya menyelesaikan bagian pertama, minta ia membaca ulang bagian sisa dan bagian terakhir.
        </p>
        <p className="mt-2">
          Gunakan kancing, kelereng, atau stik es krim. Minta anak membagikan satu per satu bergiliran ke beberapa piring kertas. Benda yang tidak cukup untuk satu piring penuh menjadi sisa. Untuk keluarga angka, pakai tiga kartu yang membentuk segitiga, lalu minta anak menuliskan empat kalimat dari ketiga angka itu.
        </p>
      </aside>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Pembagian({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Bagi rata, semua dapat sama banyak.",
    "Pembagian juga bisa dikurangi sampai habis. Hitung berapa kali mengurangi.",
    "Tidak ada sisa? Habis terbagi.",
    "Ada sisa? Sisa selalu lebih kecil dari pembagi.",
    "Periksa dengan perkalian. Hasil bagi kali pembagi sama dengan bilangan yang dibagi.",
    "Satu perkalian, dua pembagian. Itu keluarga angka.",
    "Lupa hasilnya? Tanya: pembaginya kali berapa?",
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
          src: "/doodle-mtk/mtk-3-pembagian-poin.jpg",
          alt: "Kelinci putih berdiri di papan kalimat kunci. Kantong wortel dan segitiga keluarga angka di sekelilingnya.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Pembagian itu membagi rata, dan bisa juga dikerjakan dengan pengurangan berulang.",
          "Kalau tidak ada yang tertinggal, itu pembagian tanpa sisa. Kalau ada yang tertinggal, itu sisa, dan sisanya selalu lebih kecil dari pembagi. Untuk memeriksa, kalikan hasil bagi dengan pembagi.",
          "Perkalian dan pembagian itu bersaudara: satu perkalian menghasilkan dua pembagian.",
        ])}
        poin={poin}
        penutup="Bagi rata, kurangi sampai habis, periksa sisanya, lalu balik ke perkalian."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
