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
import { MISI_MTK3_PECAHAN, TEMA_MTK3_PECAHAN } from "@/lib/misi-mtk-3-pecahan";
import { MODUL_MTK3_PECAHAN } from "@/lib/modul-resmi-mtk-3-pecahan";
import {
  adaSeperempat,
  adaSepertiga,
  adaSetengah,
  alasanLebihBesar,
  alasanSepertiga,
  bacaSeperempatPeran,
  bacaSepertigaPeran,
  duaDanTiga,
  duaPerTigaLengkap,
  jawabDuaPerEmpat,
  jawabSeperempat,
  jawabSepertiga,
  jawabSetengah,
  lebihBesar,
  lebihKecil,
  tigaLambang,
  warungTiga,
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
  Nadia: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Rafi: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Widya: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Ciko: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nadia: "👧",
  Rafi: "👦",
  Widya: "👧",
  Ciko: "🐒",
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

const LAMBANG = ["½", "⅓", "¼"];
const PERAN = ["Pembilang (bagian diambil)", "Penyebut (seluruh bagian)"];
const KECIL = ["¼", "⅓", "½"];
const BESAR = ["½", "⅓", "¼"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PECAHAN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="👧👦🐒"
        judul={kartu.judul}
        anak="Nadia, Rafi, Widya, dan Ciko"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: memahami pecahan ½, ⅓, dan ¼ sebagai bagian dari keseluruhan, menuliskan lambang pecahannya, dan membandingkan pecahan sederhana.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Mengenal pecahan ½"
          warna="border-rose-200 bg-rose-50/60"
          src="/doodle-mtk/mtk-3-pecahan-sub1.jpg"
          alt="Semangka di meja kayu dengan garis belah di tengah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Anak-anak, hari ini kita belajar pecahan. Pecahan itu bagian dari sesuatu yang utuh.",
            "Kalau satu benda dibagi dua sama besar, setiap bagiannya disebut satu per dua. Ayo kita lihat contohnya di kebun buah!",
          ]}
        >
          <Dialog nama="Nadia" anak="Rafi, ada satu semangka. Kita bagi dua sama besar, ya." />
          <Dialog nama="Rafi" anak="Aku mau yang besar!" />
          <Dialog nama="Widya" anak="Tidak boleh! Harus sama besar. Kalau dibelah tepat di tengah, keduanya sama." />
          <Dialog nama="Ciko" anak="Aku bantu potong! Belah di tengah, jadi dua!" />
          <Dialog nama="Nadia" anak="Nah, dua bagian sama besar." />
          <Dialog nama="Widya" anak="Setiap bagian disebut setengah atau satu per dua. Lambangnya ½." />
          <Dialog nama="Rafi" anak="Jadi satu bagian dari dua bagian itu ½?" />
          <Dialog nama="Widya" anak="Betul! Dua bagian kalau digabung, kembali jadi satu utuh." />
          <Papan anak={"🍉 = 1 utuh\nDibagi 2 sama besar → ½ | ½\nDitulis: ½ — dibaca satu per dua atau setengah\n½ + ½ = 1"} />
          <p className="text-sm font-black text-[#1C01A5]">Kalau satu benda dibagi dua sama besar, setiap bagiannya ½.</p>
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Pizza dibelah dua sama besar. Bagian yang dilingkari disebut apa? Ucapkan dengan lengkap!" periksa={jawabSetengah} petunjuk="Ada berapa bagian seluruhnya? Itu penyebutnya." benar="Betul! Kamu sudah kenal pecahan setengah!" />
          <TulisBebas id={idKuis("A", 1)} judul="Apel dibagi dua" visual={<Papan anak="Gambar apel, lalu garis di tengah" />} pertanyaan="Gambar sebuah apel, lalu gambar garis untuk membagi dua sama besar. Tulis lambang setiap bagiannya!" pesanSalah="Belah tepat di tengah, lalu tulis lambang tiap bagian." bantuan="Garis tengah membagi apel jadi dua. Setiap bagian ditulis ½." umpan="Setiap bagian ½." periksa={adaSetengah} alias={["1/2", "setengah"]} konteks="Apel dibagi dua sama besar. Setiap bagian ½." />
        </Adegan>
        <Adegan
          judul="Sub-bab 2 — Mengenal pecahan ⅓"
          warna="border-sky-200 bg-sky-50/60"
          src="/doodle-mtk/mtk-3-pecahan-sub2.jpg"
          alt="Cokelat dibagi tiga bagian sama besar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sekarang kita bagi benda menjadi tiga bagian sama besar. Setiap bagiannya disebut satu per tiga.",
            "Ingat, ketiga bagiannya harus sama besar. Kalau tidak sama, itu bukan pecahan satu per tiga.",
          ]}
        >
          <Dialog nama="Widya" anak="Ada 1 cokelat. Kita bagi 3 sama besar." />
          <Dialog nama="Rafi" anak="Tiga? Berarti aku dapat berapa?" />
          <Dialog nama="Nadia" anak="Setiap orang dapat 1 bagian dari 3 bagian. Itu namanya ⅓." />
          <Dialog nama="Ciko" anak="Cokelatnya ada tiga kotak, jadi ambil satu kotak!" />
          <Dialog nama="Widya" anak="Lihat, ketiganya sama besar." />
          <Dialog nama="Rafi" anak="Jadi bagianku ⅓, punyamu ⅓, punya Nadia ⅓?" />
          <Dialog nama="Nadia" anak="Betul! Kalau digabung tiga-tiganya, kembali jadi 1 utuh." />
          <Papan anak={"🍫 = 1 utuh\nDibagi 3 sama besar → ⅓ | ⅓ | ⅓\nDitulis: ⅓ — dibaca satu per tiga\n⅓ + ⅓ + ⅓ = 1"} />
          <p className="text-sm font-black text-[#1C01A5]">Kalau dibagi tiga sama besar, setiap bagiannya ⅓.</p>
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Roti dibagi tiga sama besar. Bagian yang dilingkari disebut apa?" periksa={jawabSepertiga} petunjuk="Seluruhnya ada berapa bagian? Angka itu jadi penyebutnya." benar="Satu per tiga." />
          <TulisBebas id={idKuis("A", 3)} judul="Persegi panjang dibagi tiga" visual={<Papan anak="Bagi jadi 3 sama besar" />} pertanyaan="Bagi persegi panjang ini jadi 3 bagian sama besar. Tulis lambang setiap bagiannya!" pesanSalah="Dua garis membagi bentuk jadi tiga bagian sama." bantuan="Dua garis bayangan membagi bentuk jadi tiga. Setiap bagian ditulis ⅓." umpan="Setiap bagian ⅓." periksa={adaSepertiga} alias={["1/3", "sepertiga"]} konteks="Persegi panjang dibagi tiga sama besar. Setiap bagian ⅓." />
        </Adegan>
        <Adegan
          judul="Sub-bab 3 — Mengenal pecahan ¼"
          warna="border-emerald-200 bg-emerald-50/70"
          src="/doodle-mtk/mtk-3-pecahan-sub3.jpg"
          alt="Kue bulat dibagi empat bagian sama besar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sekarang kita bagi benda menjadi empat bagian sama besar. Setiap bagiannya disebut satu per empat.",
            "Perhatikan bahwa semakin banyak bagiannya, semakin kecil setiap bagiannya.",
          ]}
        >
          <Dialog nama="Widya" anak="Ada 1 kue. Kita bagi 4 sama besar." />
          <Dialog nama="Nadia" anak="Caranya, belah dua dulu, lalu belah dua lagi." />
          <Dialog nama="Rafi" anak="Jadi dapat empat bagian sama besar!" />
          <Dialog nama="Ciko" anak="Setiap bagian ¼! Aku mau satu!" />
          <Dialog nama="Widya" anak="Nah, empat bagian sama besar." />
          <Dialog nama="Rafi" anak="Bagianku kecil sekali, ya. Lebih kecil dari waktu bagi dua." />
          <Dialog nama="Nadia" anak="Iya! Karena semakin banyak bagian, semakin kecil setiap bagiannya." />
          <Dialog nama="Widya" anak="Bagian dari empat ini disebut ¼ atau satu per empat." />
          <Papan anak={"🎂 = 1 utuh\nDibagi 4 sama besar → ¼ | ¼ | ¼ | ¼\nDitulis: ¼ — dibaca satu per empat\n¼ + ¼ + ¼ + ¼ = 1"} />
          <p className="text-sm font-black text-[#1C01A5]">Kalau dibagi empat sama besar, setiap bagiannya ¼. Semakin banyak bagian, semakin kecil ukurannya.</p>
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Jeruk dibagi empat sama besar. Bagian yang dilingkari disebut apa?" periksa={jawabSeperempat} petunjuk="Hitung dulu seluruh bagiannya: satu, dua, tiga, empat." benar="Satu per empat." />
          <TulisBebas id={idKuis("A", 5)} judul="Persegi dibagi empat" visual={<Papan anak="Bagi jadi 4 sama besar" />} pertanyaan="Bagi persegi ini jadi 4 bagian sama besar. Tulis lambang setiap bagiannya!" pesanSalah="Pakai satu garis mendatar dan satu garis tegak." bantuan="Garis silang membagi persegi jadi empat. Setiap bagian ditulis ¼." umpan="Setiap bagian ¼." periksa={adaSeperempat} alias={["1/4", "seperempat"]} konteks="Persegi dibagi empat sama besar. Setiap bagian ¼." />
        </Adegan>
        <Adegan
          judul="Sub-bab 4 — Menuliskan lambang pecahan"
          warna="border-amber-200 bg-amber-50/70"
          src="/doodle-mtk/mtk-3-pecahan-sub4.jpg"
          alt="Angka 1 di atas garis dan angka 4 di bawah garis."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Setiap pecahan punya dua angka. Angka di bawah menunjukkan jumlah seluruh bagian. Angka di atas menunjukkan berapa bagian yang kita ambil.",
            "Angka bawah namanya penyebut. Angka atas namanya pembilang. Ayo kita latih.",
          ]}
        >
          <Dialog nama="Nadia" anak="Lihat gambar ini: lingkaran dibagi 4, lalu kita ambil 1. Lambangnya apa?" />
          <Dialog nama="Widya" anak="Ambil 1, seluruhnya 4. Jadi ¼." />
          <Dialog nama="Rafi" anak="Jadi angka atas = yang diambil, angka bawah = seluruhnya?" />
          <Dialog nama="Widya" anak="Betul! Angka atas pembilang, angka bawah penyebut." />
          <Dialog nama="Ciko" anak="Pembilang di atas, penyebut di bawah!" />
          <Dialog nama="Nadia" anak="Sekarang kalau lingkaran dibagi 3, dan kita ambil 1?" />
          <Dialog nama="Rafi" anak="Berarti ⅓!" />
          <Dialog nama="Widya" anak="Betul! Penyebutnya ikut jumlah bagian seluruhnya." />
          <Papan anak={"1 ← pembilang, bagian yang diambil\n—\n4 ← penyebut, seluruh bagian"} />
          <p className="text-sm font-black text-[#1C01A5]">Pembilang di atas, penyebut di bawah. Penyebut ikut jumlah seluruh bagian.</p>
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Persegi panjang dibagi 3 sama besar, 1 bagian diwarnai. Ucapkan pecahannya lengkap dengan pembilang dan penyebut." periksa={bacaSepertigaPeran} petunjuk="Yang diwarnai ada berapa? Yang seluruhnya ada berapa?" benar="Satu per tiga. Pembilang satu, penyebut tiga." />
          <TulisBebas id={idKuis("A", 7)} judul="Tiga gambar" visual={<Papan anak={"Lingkaran dibagi 2\nPersegi dibagi 3\nPersegi dibagi 4"} />} pertanyaan="Tulis lambang pecahan untuk satu bagian dari setiap gambar!" pesanSalah="Penyebut mengikuti jumlah seluruh bagian." bantuan="Penyebut berkedip: 2, 3, lalu 4. Lambangnya ½, ⅓, dan ¼." umpan="½, ⅓, dan ¼." periksa={tigaLambang} alias={["1/2", "1/3", "1/4"]} konteks="Satu bagian: ½, ⅓, dan ¼." />
        </Adegan>
        <Adegan
          judul="Sub-bab 5 — Membandingkan pecahan"
          warna="border-violet-200 bg-violet-50/70"
          src="/doodle-mtk/mtk-3-pecahan-sub5.jpg"
          alt="Tiga lingkaran sama besar dibagi dua, tiga, dan empat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau bendanya sama besar, semakin banyak bagian berarti semakin kecil setiap bagiannya. Jadi satu per dua lebih besar dari satu per tiga.",
            "Dan satu per tiga lebih besar dari satu per empat. Ayo kita buktikan dengan gambar.",
          ]}
        >
          <Dialog nama="Widya" anak="Rafi, coba lihat tiga semangka ini. Ukurannya sama besar." />
          <Dialog nama="Rafi" anak="Yang pertama dipotong 2, yang kedua 3, yang ketiga 4." />
          <Dialog nama="Nadia" anak="Sekarang lihat satu potong dari masing-masing. Mana yang paling besar?" />
          <Dialog nama="Ciko" anak="Yang dipotong dua! Karena paling sedikit dipotong!" />
          <Dialog nama="Rafi" anak="Oh, jadi yang dipotong dua paling besar?" />
          <Dialog nama="Widya" anak="Betul! ½ > ⅓ > ¼. Semakin besar penyebutnya, semakin kecil potongannya." />
          <Dialog nama="Nadia" anak="Ingat, ini berlaku kalau bendanya sama besar. Kalau bendanya beda, ya tidak bisa dibandingkan." />
          <Papan anak={"Dibagi 2 → satu bagian paling besar\nDibagi 3 → satu bagian sedang\nDibagi 4 → satu bagian paling kecil\n½ > ⅓ > ¼"} />
          <p className="text-sm font-black text-[#1C01A5]">Semakin besar penyebut, semakin kecil bagiannya — asalkan bendanya sama besar.</p>
          <KuisSuara id={idKuis("A", 8)} pertanyaan="Dua lingkaran sama besar. Mana yang bagiannya lebih besar: ⅓ atau ¼? Ucapkan pecahannya." periksa={jawabSepertiga} petunjuk="Mana penyebutnya lebih kecil? Itu bagiannya lebih besar." benar="Satu per tiga lebih besar." />
          <TulisBebas id={idKuis("A", 9)} judul="½ ⬜ ¼" visual={<Papan anak="½  ⬜  ¼" />} pertanyaan="Tulis simbol >, <, atau = di kotak!" pesanSalah="Bandingkan satu bagian dari dua dengan satu bagian dari empat." bantuan="Dua lingkaran sama besar. Bagian ½ lebih besar daripada bagian ¼." umpan="½ > ¼." periksa={lebihBesar} alias={[">", "lebih besar"]} konteks="½ lebih besar dari ¼." />
        </Adegan>
        <h5 className="text-center text-base font-black text-[#1C01A5]">Lima soal akhir kartu A</h5>
        <Pilih id={idKuis("A", 10)} pertanyaan="1. Lingkaran dibagi 4 sama besar. Satu bagian diwarnai. Pecahannya..." visual={<Papan anak="1 bagian dari 4" />} pilihan={[{ huruf: "A", teks: "¼" }, { huruf: "B", teks: "⅓" }, { huruf: "C", teks: "½" }, { huruf: "D", teks: "4" }]} benar="A" umpan="Diambil 1 dari 4 bagian. Lambangnya ¼." salah="Hitung seluruh bagiannya dulu." />
        <KuisCocok id={idKuis("A", 11)} perintah="2. Pasangkan setiap gambar dengan lambangnya." baris={[{ kiri: "Lingkaran dibagi 2, 1 diwarnai", pilihan: LAMBANG, benar: "½" }, { kiri: "Persegi dibagi 4, 1 diwarnai", pilihan: LAMBANG, benar: "¼" }, { kiri: "Persegi panjang dibagi 3, 1 diwarnai", pilihan: LAMBANG, benar: "⅓" }]} umpan="½, ¼, dan ⅓." />
        <SusunToken id={idKuis("A", 12)} perintah="3. Susun dari yang paling kecil ke paling besar." acak={["½", "¼", "⅓"]} benar={KECIL} umpan="¼, lalu ⅓, lalu ½." salah="Penyebut 4, 3, lalu 2. Bagiannya makin besar." />
        <KuisBenarSalah id={idKuis("A", 13)} perintah="4. Detektif pecahan." baris={[{ teks: "Pada pecahan ½, angka 2 disebut penyebut.", benar: true }, { teks: "Pada pecahan ⅓, angka 1 disebut penyebut.", benar: false }, { teks: "Kalau 1 benda dibagi 3 sama besar, setiap bagiannya ⅓.", benar: true }]} umpan="Benar, salah, benar. Angka 1 adalah pembilang." />
        <Pilih id={idKuis("A", 14)} pertanyaan="5. Tiga kotak cocok dengan lambangnya. Mana yang tidak cocok?" pilihan={[{ huruf: "A", teks: "Lingkaran dibagi 2 → ½" }, { huruf: "B", teks: "Persegi dibagi 3 → ⅓" }, { huruf: "C", teks: "Persegi panjang dibagi 4 → ½" }, { huruf: "D", teks: "Lingkaran dibagi 4 → ¼" }]} benar="C" umpan="Dibagi 4 seharusnya ¼, bukan ½." salah="Cocokkan jumlah bagian dengan angka bawah." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "A")} pertanyaan="Tulis kalimat kunci: Bagi dua sama besar, setiap bagian setengah." alias={["setengah", "sama besar"]} konteks="Bagi dua sama besar, setiap bagian setengah." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PECAHAN.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu ikon="📊🐒" judul={kartu.judul} anak="Lambang, pembilang, penyebut, dan perbandingan" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan judul="Sub-bab 1 — Pecahan ½" warna="border-rose-200 bg-rose-50/60" src="/doodle-mtk/mtk-3-pecahan-sub1.jpg" alt="Bentuk utuh dan bentuk yang dibagi dua." kelas={kelas} kelamin={kelamin} penjelasan={["Pecahan satu per dua muncul kalau satu benda dibagi dua bagian sama besar. Kedua bagiannya sama.", "Kalau digabung, kembali menjadi satu utuh."]}>
          <Papan anak={"Bagian yang diambil = 1\nSeluruh bagian = 2\nLambang = ½"} />
          <p className="text-sm font-semibold text-slate-700">Kue dibagi 2 sama besar. Seluruh bagian 2, yang diambil 1. Satu bagian = ½.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: bagi dua sama besar? Setiap bagian setengah.</p>
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Roti dibelah dua sama besar. Ucapkan lambang pecahan untuk satu bagiannya." periksa={jawabSetengah} petunjuk="Satu bagian dari dua bagian." benar="Satu per dua." />
          <TulisBebas id={idKuis("B", 1)} judul="Bagi dua" visual={<Papan anak="Persegi panjang" />} pertanyaan="Bagi persegi panjang jadi 2 sama besar, lalu tulis lambang setiap bagiannya!" pesanSalah="Satu garis di tengah sudah cukup." bantuan="Satu garis membagi bentuk jadi dua. Setiap bagian ½." umpan="Setiap bagian ½." periksa={adaSetengah} alias={["1/2"]} konteks="Setiap bagian ½." />
        </Adegan>
        <Adegan judul="Sub-bab 2 — Pecahan ⅓" warna="border-sky-200 bg-sky-50/60" src="/doodle-mtk/mtk-3-pecahan-sub2.jpg" alt="Persegi panjang dibagi tiga." kelas={kelas} kelamin={kelamin} penjelasan={["Pecahan satu per tiga muncul kalau satu benda dibagi tiga bagian sama besar.", "Ketiga bagiannya harus sama persis. Kalau tidak sama, itu bukan pecahan satu per tiga."]}>
          <Papan anak={"Bagian yang diambil = 1\nSeluruh bagian = 3\nLambang = ⅓"} />
          <p className="text-sm font-semibold text-slate-700">Cokelat dibagi 3 sama besar. Satu bagian = ⅓.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: bagi tiga sama besar? Setiap bagian sepertiga.</p>
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Jeruk dibagi tiga sama besar. Ucapkan lambang pecahan untuk satu bagiannya." periksa={jawabSepertiga} petunjuk="Satu bagian dari tiga bagian." benar="Satu per tiga." />
          <TulisBebas id={idKuis("B", 3)} judul="Dua persegi" visual={<Papan anak={"Persegi 1 dibagi 2\nPersegi 2 dibagi 3"} />} pertanyaan="Bagi persegi pertama jadi 2, persegi kedua jadi 3. Tulis lambang satu bagian di masing-masing!" pesanSalah="Tulis dua lambang." bantuan="Persegi pertama ½. Persegi kedua ⅓." umpan="½ dan ⅓." periksa={duaDanTiga} alias={["1/2", "1/3"]} konteks="Persegi 1 = ½. Persegi 2 = ⅓." />
        </Adegan>
        <Adegan judul="Sub-bab 3 — Pecahan ¼" warna="border-emerald-200 bg-emerald-50/70" src="/doodle-mtk/mtk-3-pecahan-sub3.jpg" alt="Lingkaran dibagi empat." kelas={kelas} kelamin={kelamin} penjelasan={["Pecahan satu per empat muncul kalau satu benda dibagi empat bagian sama besar.", "Empat bagian itu lebih kecil dibanding dua bagian atau tiga bagian."]}>
          <Papan anak={"Bagian yang diambil = 1\nSeluruh bagian = 4\nLambang = ¼"} />
          <p className="text-sm font-semibold text-slate-700">Pizza dibagi 4 sama besar. Satu bagian = ¼.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: bagi empat sama besar? Setiap bagian seperempat.</p>
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Kue dibagi empat sama besar. Ucapkan lambang pecahan untuk satu bagiannya." periksa={jawabSeperempat} petunjuk="Satu bagian dari empat bagian." benar="Satu per empat." />
          <TulisBebas id={idKuis("B", 5)} judul="Tiga persegi" visual={<Papan anak={"Persegi 2\nPersegi 3\nPersegi 4"} />} pertanyaan="Bagi setiap persegi sesuai angkanya, lalu tulis lambang satu bagiannya!" pesanSalah="Ada tiga lambang." bantuan="Persegi 2 = ½. Persegi 3 = ⅓. Persegi 4 = ¼." umpan="½, ⅓, dan ¼." periksa={tigaLambang} alias={["1/2", "1/3", "1/4"]} konteks="½, ⅓, dan ¼." />
        </Adegan>
        <Adegan judul="Sub-bab 4 — Pembilang dan penyebut" warna="border-amber-200 bg-amber-50/70" src="/doodle-mtk/mtk-3-pecahan-sub4.jpg" alt="Panah ke angka atas dan angka bawah." kelas={kelas} kelamin={kelamin} penjelasan={["Setiap pecahan punya dua angka. Angka bawah menunjukkan seluruh bagian, namanya penyebut.", "Angka atas menunjukkan bagian yang diambil, namanya pembilang."]}>
          <Papan anak={"Angka atas = pembilang = bagian yang diambil\nAngka bawah = penyebut = seluruh bagian"} />
          <p className="text-sm font-semibold text-slate-700">Persegi dibagi 3 sama besar. Dua bagian diwarnai. Penyebut 3, pembilang 2. Pecahannya 2/3.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: yang diambil di atas. Seluruhnya di bawah.</p>
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Persegi dibagi 4 sama besar, 2 bagian diwarnai. Pecahan untuk bagian yang diwarnai ini apa?" periksa={jawabDuaPerEmpat} petunjuk="Yang diwarnai jadi pembilang. Seluruh bagian jadi penyebut." benar="Dua per empat." />
          <TulisBebas id={idKuis("B", 7)} judul="Dua dari tiga" visual={<Papan anak="Lingkaran dibagi 3, dua bagian diwarnai" />} pertanyaan="Tulis pembilang dan penyebut pecahannya!" pesanSalah="Yang diwarnai ada 2. Seluruhnya ada 3." bantuan="Pembilang 2. Penyebut 3. Pecahannya 2/3." umpan="Pembilang 2, penyebut 3, pecahan 2/3." periksa={duaPerTigaLengkap} alias={["2/3", "pembilang 2"]} konteks="Pembilang 2, penyebut 3, pecahan 2/3." />
        </Adegan>
        <Adegan judul="Sub-bab 5 — Membandingkan pecahan" warna="border-violet-200 bg-violet-50/70" src="/doodle-mtk/mtk-3-pecahan-sub5.jpg" alt="Tiga lingkaran dengan satu bagian yang makin kecil." kelas={kelas} kelamin={kelamin} penjelasan={["Untuk membandingkan pecahan dengan pembilang satu, kita lihat penyebutnya. Semakin besar penyebutnya, semakin kecil setiap bagiannya.", "Satu per dua lebih besar dari satu per tiga, dan satu per tiga lebih besar dari satu per empat. Syaratnya, bendanya harus sama besar."]}>
          <Papan anak={"½ penyebut 2 → paling besar\n⅓ penyebut 3 → sedang\n¼ penyebut 4 → paling kecil"} />
          <p className="text-sm font-semibold text-slate-700">⅓ atau ¼? Penyebut 3 lebih kecil dari 4, jadi ⅓ &gt; ¼.</p>
          <p className="text-sm font-black text-[#1C01A5]">Trik: penyebut kecil, bagian besar.</p>
          <KuisSuara id={idKuis("B", 8)} pertanyaan="Mana yang lebih besar, ½ atau ¼?" periksa={jawabSetengah} petunjuk="Penyebut yang lebih kecil punya bagian yang lebih besar." benar="Satu per dua." />
          <TulisBebas id={idKuis("B", 9)} judul="⅓ ⬜ ½" visual={<Papan anak="⅓  ⬜  ½" />} pertanyaan="Tulis simbol >, <, atau = di kotak!" pesanSalah="Bandingkan penyebut 3 dan 2." bantuan="Penyebut 3 lebih besar, jadi bagian ⅓ lebih kecil dari ½." umpan="⅓ < ½." periksa={lebihKecil} alias={["<", "lebih kecil"]} konteks="⅓ lebih kecil dari ½." />
        </Adegan>
        <h5 className="text-center text-base font-black text-[#1C01A5]">Lima soal akhir kartu B</h5>
        <Pilih id={idKuis("B", 10)} pertanyaan="1. Lingkaran dibagi 3 sama besar. Lambang yang benar untuk satu bagiannya..." pilihan={[{ huruf: "A", teks: "½" }, { huruf: "B", teks: "⅓" }, { huruf: "C", teks: "¼" }, { huruf: "D", teks: "3" }]} benar="B" umpan="Satu dari tiga bagian adalah ⅓." salah="Angka bawah mengikuti jumlah seluruh bagian." />
        <KuisCocok id={idKuis("B", 11)} perintah="2. Pada pecahan ⅓, pasangkan setiap angka dengan namanya." baris={[{ kiri: "1", pilihan: PERAN, benar: "Pembilang (bagian diambil)" }, { kiri: "3", pilihan: PERAN, benar: "Penyebut (seluruh bagian)" }]} umpan="1 pembilang. 3 penyebut." />
        <SusunToken id={idKuis("B", 12)} perintah="3. Susun dari yang paling besar ke paling kecil." acak={["¼", "½", "⅓"]} benar={BESAR} umpan="½, lalu ⅓, lalu ¼." salah="Penyebut 2, 3, lalu 4. Bagiannya makin kecil." />
        <KuisBenarSalah id={idKuis("B", 13)} perintah="4. Cek pecahan." baris={[{ teks: "Semakin besar penyebut, semakin kecil bagiannya.", benar: true }, { teks: "½ lebih kecil dari ¼.", benar: false }, { teks: "Pada pecahan ⅓, angka 3 adalah penyebut.", benar: true }]} umpan="Benar, salah, benar. ½ lebih besar dari ¼." />
        <Pilih id={idKuis("B", 14)} pertanyaan="5. Penyebutku 4. Pembilangku 1. Pecahan berapa aku?" pilihan={[{ huruf: "A", teks: "¼" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "⅓" }, { huruf: "D", teks: "½" }]} benar="A" umpan="Pembilang 1 di atas, penyebut 4 di bawah. Jadi ¼." salah="Angka yang diambil di atas, seluruh bagian di bawah." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "B")} pertanyaan="Tulis kalimat kunci: Yang diambil di atas, seluruhnya di bawah." alias={["pembilang", "penyebut"]} konteks="Yang diambil di atas, seluruhnya di bawah." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PECAHAN.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🍉🐒"
        judul={kartu.judul}
        anak="Sepuluh pos · potong, tulis, bandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini, kalian menjadi penjual buah potong. Pelanggan datang memesan potongan dengan ukuran tertentu.",
          "Kalian harus memotong buah jadi bagian yang sama besar, menuliskan lambangnya, dan memastikan potonganmu sesuai pesanan.",
          "Ayo kita buka warung!",
        ])}
      />
      <GambarDoodle src="/doodle-mtk/mtk-3-pecahan-permainan.jpg" alt="Warung buah. Ciko memakai topi penjual di belakang talenan dan kotak koin." ukuran="lebar" />
      <PanduanIkon judul="Simbol warung" butir={[{ ikon: "🍉", teks: "Buah utuh" }, { ikon: "🔪", teks: "Potongan sama" }, { ikon: "🔍", teks: "Kaca periksa" }, { ikon: "🔄", teks: "Ulang lagi" }, { ikon: "🪙", teks: "Koin" }]} />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu penjual buah potong. Pesanan benar berarti koin masuk. Potongan harus sama besar dulu, baru disebut pecahan.</p>
        <p>Level 1: satu potong dari belahan dua adalah ½. Level 2: tiga bagian sama, ambil satu, yaitu ⅓. Level 3: empat bagian sama, satu bagian adalah ¼.</p>
        <p>Level 4: ⅓ lebih besar dari ¼. Level 5 memakai angka pesanannya sendiri: 2 potong dari 3 bagian adalah ⅔, dan ⅔ lebih besar dari ½.</p>
        <p>Meja Depan soalnya potongan sederhana, hadiahnya 1 koin. Meja Belakang soalnya perbandingan, hadiahnya 3 koin.</p>
        <p>Kaca Periksa memperlihatkan garis potongan, tetapi biayanya 1 koin. Berani menebak sendiri menambah 1 koin.</p>
        <p>Salah memotong berarti buah itu terbuang. Talenan berputar balik dan kamu boleh mengulang. Koin tidak berkurang.</p>
        <p>Mode berdua: pemain A menggambar garis potongan, pemain B menulis lambangnya. Keduanya harus cocok.</p>
        <p>Papan permainan ini sepuluh pos. Kumpulkan 10 koin untuk membuka Warung Buah Besar dan mendapat topi penjual.</p>
      </div>
      <MisiPenjagaKebun misi={MISI_MTK3_PECAHAN} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK3_PECAHAN} penutup="Warung Buah Besar terbuka. Ciko memasang topi penjual." bunga="🍉🪙🥇🐒" />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal warung</h5>
        <Pilih id={idKuis("C", 10)} pertanyaan="1. Pelanggan memesan satu potong dari buah yang dibelah dua sama besar. Lambangnya apa?" pilihan={[{ huruf: "A", teks: "½" }, { huruf: "B", teks: "⅓" }, { huruf: "C", teks: "¼" }, { huruf: "D", teks: "2" }]} benar="A" umpan="Satu dari dua bagian sama besar adalah ½." salah="Hitung seluruh potongan, lalu ambil satu." />
        <Pilih id={idKuis("C", 11)} pertanyaan="2. Buah dipotong empat sama besar. Satu potong bernilai..." pilihan={[{ huruf: "A", teks: "½" }, { huruf: "B", teks: "⅓" }, { huruf: "C", teks: "¼" }, { huruf: "D", teks: "4" }]} benar="C" umpan="Satu dari empat bagian adalah ¼." salah="Angka bawah adalah 4, angka atas adalah 1." />
        <KuisCocok id={idKuis("C", 12)} perintah="3. Pasangkan setiap potongan dengan lambangnya." baris={[{ kiri: "Buah dibagi 3, diambil 1", pilihan: LAMBANG, benar: "⅓" }, { kiri: "Buah dibagi 2, diambil 1", pilihan: LAMBANG, benar: "½" }, { kiri: "Buah dibagi 4, diambil 1", pilihan: LAMBANG, benar: "¼" }]} umpan="⅓, ½, dan ¼." />
        <SusunToken id={idKuis("C", 13)} perintah="4. Susun dari potongan terkecil ke terbesar." acak={["½", "¼", "⅓"]} benar={KECIL} umpan="¼, lalu ⅓, lalu ½." salah="Penyebut besar membuat potongan kecil." />
        <KuisBenarSalah id={idKuis("C", 14)} perintah="5. Cek warung." baris={[{ teks: "Potongan ⅓ lebih besar dari potongan ¼.", benar: true }, { teks: "Pada pecahan ½, angka 2 adalah pembilang.", benar: false }, { teks: "Kalau buah dibagi 4 sama besar, setiap potong ¼.", benar: true }]} umpan="Benar, salah, benar. Angka 2 pada ½ adalah penyebut." />
        <Pilih id={idKuis("C", 15)} pertanyaan="6. Mana yang bukan pembagian sama besar?" pilihan={[{ huruf: "A", teks: "Buah dibagi 2, kedua bagian sama" }, { huruf: "B", teks: "Buah dibagi 3, ketiga bagian sama" }, { huruf: "C", teks: "Buah dibagi 4, satu bagian lebih besar dari yang lain" }, { huruf: "D", teks: "Buah dibagi 4, keempat bagian sama" }]} benar="C" umpan="Bagian yang tidak sama besar bukan pecahan." salah="Cari gambar yang potongannya tidak sama." />
        <Pilih id={idKuis("C", 16)} pertanyaan="7. Pada pecahan ⅓, manakah pernyataan yang benar?" pilihan={[{ huruf: "A", teks: "1 penyebut, 3 pembilang" }, { huruf: "B", teks: "1 pembilang, 3 penyebut" }, { huruf: "C", teks: "Keduanya pembilang" }, { huruf: "D", teks: "Keduanya penyebut" }]} benar="B" umpan="1 di atas pembilang. 3 di bawah penyebut." salah="Yang diambil di atas, seluruhnya di bawah." />
        <Pilih id={idKuis("C", 17)} pertanyaan="8. Buah dibagi dengan jumlah yang naik teratur: 2 – 3 – 4 – ⬜" pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "7" }, { huruf: "D", teks: "8" }]} benar="A" umpan="Naik 1 setiap langkah. 4 + 1 = 5." salah="Lihat selisih antara 2, 3, dan 4." />
        <KuisSuara id={idKuis("C", 18)} pertanyaan="Kalau buah dibagi tiga sama besar dan aku ambil satu, berapa bagianku? Ucapkan lengkap." periksa={jawabSepertiga} petunjuk="Satu bagian dari tiga bagian." benar="Satu per tiga." />
        <TulisBebas id={idKuis("C", 19)} judul="Papan harga" visual={<Papan anak="Lingkaran dibagi 4, satu bagian diwarnai" />} pertanyaan="Gambar buah yang dibagi 4 sama besar, warnai satu bagian, lalu tulis lambangnya!" pesanSalah="Dua garis silang, satu bagian diwarnai, lalu tulis lambangnya." bantuan="Lambang satu bagian adalah ¼." umpan="Satu bagian diwarnai. Lambangnya ¼." periksa={adaSeperempat} alias={["1/4", "seperempat"]} konteks="Buah dibagi 4 sama besar. Satu bagian ¼." />
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
  const lencana = skor >= 9 ? "🥇 Penjual Buah Ahli" : skor >= 6 ? "🍉 Pemotong Cerdas" : "🐒 Sahabat Ciko";
  const pesan = skor >= 9 ? "Luar biasa! Semua potongan sama besar dan lambangnya tepat!" : skor >= 6 ? "Hebat! Sedikit lagi jadi penjual buah!" : "Ayo berlatih lagi bersama Ciko, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-amber-50/80">
      <KepalaKartu
        ikon="📝🐒"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal tentang pecahan sederhana.",
          "Beberapa soal meminta kalian menuliskan lambang pecahan dari gambar, beberapa menentukan pembilang dan penyebut, dan beberapa membandingkan pecahan.",
          "Ingat: yang diambil di atas, seluruhnya di bawah. Dan semakin besar penyebut, semakin kecil bagiannya. Jangan terburu-buru, dan periksa lagi jawabanmu.",
        ])}
      />
      <GambarDoodle src="/doodle-mtk/mtk-3-pecahan-evaluasi.jpg" alt="Meja ujian dengan pensil besar dan buah yang dibelah dua. Ciko mengangkat satu potongan." ukuran="lebar" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Menggambar dan menulis pecahan" visual={<Papan anak="Lingkaran kosong. Pecahan = ⬜" />} pertanyaan="Bagi lingkaran ini jadi 4 bagian sama besar, warnai 1 bagian, lalu tulis lambang pecahannya!" pesanSalah="Garis silang membuat empat bagian. Warnai satu, lalu tulis lambangnya." bantuan="Lambangnya ¼." umpan="Satu bagian diwarnai. Lambangnya ¼." periksa={adaSeperempat} alias={["1/4"]} konteks="Lingkaran dibagi 4. Satu bagian ¼." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Persegi panjang dibagi 3 sama besar. Dua bagian diwarnai. Pecahannya..." pilihan={[{ huruf: "A", teks: "⅓" }, { huruf: "B", teks: "2/3" }, { huruf: "C", teks: "3/2" }, { huruf: "D", teks: "½" }]} benar="B" umpan="Diambil 2 dari 3 bagian. Pembilang 2, penyebut 3." salah="Yang diwarnai di atas, seluruh bagian di bawah." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="Ucapkan lambang ¼ lengkap dengan kata pembilang dan penyebutnya." periksa={bacaSeperempatPeran} petunjuk="Sebut pecahannya, lalu sebut angka atas dan angka bawah." benar="Satu per empat. Pembilang satu, penyebut empat." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Rafi menulis: pecahan ¼ lebih besar dari pecahan ⅓, karena 4 lebih besar dari 3. Apakah Rafi benar?" pilihan={[{ huruf: "A", teks: "Benar, karena 4 lebih besar dari 3" }, { huruf: "B", teks: "Salah, karena semakin besar penyebut semakin kecil bagiannya" }, { huruf: "C", teks: "Salah, karena tidak bisa dibandingkan" }, { huruf: "D", teks: "Tidak bisa ditentukan" }]} benar="B" umpan="Penyebut 4 lebih besar, jadi bagian ¼ lebih kecil dari ⅓." salah="Bandingkan ukuran potongannya, bukan besar angkanya saja." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan setiap gambar dengan lambangnya." baris={[{ kiri: "Lingkaran dibagi 2, 1 diwarnai", pilihan: LAMBANG, benar: "½" }, { kiri: "Persegi dibagi 3, 1 diwarnai", pilihan: LAMBANG, benar: "⅓" }, { kiri: "Persegi panjang dibagi 4, 1 diwarnai", pilihan: LAMBANG, benar: "¼" }]} umpan="½, ⅓, dan ¼." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Membandingkan pecahan" visual={<Papan anak="½  ⬜  ⅓" />} pertanyaan="Tulis simbol yang tepat, lalu tulis satu kalimat alasanmu!" pesanSalah="Tulis tandanya, lalu tulis mengapa." bantuan="½ > ⅓ karena penyebut 2 lebih kecil dari 3." umpan="½ > ⅓. Penyebut 2 lebih kecil, jadi bagiannya lebih besar." periksa={alasanLebihBesar} alias={[">", "penyebut"]} konteks="½ lebih besar dari ⅓ karena penyebut 2 lebih kecil." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Penyebutku 3. Pembilangku 2. Pecahan berapa aku?" pilihan={[{ huruf: "A", teks: "⅓" }, { huruf: "B", teks: "2/3" }, { huruf: "C", teks: "3/2" }, { huruf: "D", teks: "½" }]} benar="B" umpan="Pembilang 2 di atas, penyebut 3 di bawah." salah="Letakkan pembilang di atas penyebut." />
        <SusunToken id={idKuis("D", 7)} perintah="8. Susun dari yang paling besar ke paling kecil." acak={["¼", "⅓", "½"]} benar={BESAR} umpan="½, lalu ⅓, lalu ¼." salah="Bagian ½ paling besar. Bagian ¼ paling kecil." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="Dua buah sama besar. Yang pertama dibagi 3, yang kedua dibagi 4. Ucapkan mana yang potongannya lebih besar, lalu sebutkan alasannya singkat." periksa={alasanSepertiga} petunjuk="Penyebut yang lebih kecil punya potongan yang lebih besar." benar="Satu per tiga lebih besar, karena penyebut 3 lebih kecil dari 4." />
        <TulisBebas id={idKuis("D", 9)} judul="10. Warung Buah Ciko" visual={<Papan anak={"Semangka A dibagi 2\nSemangka B dibagi 3\nSemangka C dibagi 4"} />} pertanyaan="Berapa nilai satu potong semangka B? Semangka mana yang potongannya paling besar? Mana yang lebih besar, satu potong B atau satu potong C?" pesanSalah="Tulis lambang B, sebut semangka yang paling besar, lalu bandingkan B dengan C." bantuan="B = ⅓. Semangka A paling besar. ⅓ lebih besar dari ¼." umpan="Satu potong B adalah ⅓. Semangka A paling besar. Potongan B lebih besar dari potongan C." periksa={warungTiga} alias={["1/3", "semangka a", "lebih besar"]} konteks="B = ⅓. Semangka A paling besar. ⅓ lebih besar dari ¼." />
        <KuisTulisKartu id={idKuisTulisKartu(ID, "D")} pertanyaan="Tulis kalimat kunci: Harus sama besar dulu, baru disebut pecahan." alias={["sama besar", "pecahan"]} konteks="Harus sama besar dulu, baru disebut pecahan." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">Soal memakai pecahan ½, ⅓, ¼, dan dua bagian dari tiga yang ditulis 2/3. Potongan baru disebut pecahan kalau sama besar.</p>
        <p className="mt-2">Kesalahan yang paling sering: menukar pembilang dengan penyebut, mengira penyebut yang lebih besar berarti bagian yang lebih besar, dan menyebut potongan tidak sama sebagai pecahan.</p>
        <p className="mt-2">Soal 2, 4, dan 6 menyasar ketiganya. Pada soal 4, ¼ lebih kecil dari ⅓ karena penyebutnya lebih besar. Soal 10 tiga langkah: lambang semangka B, semangka dengan potongan paling besar, lalu perbandingan B dengan C.</p>
        <p className="mt-2">Lipat kertas jadi dua, tiga, dan empat bagian sama. Minta anak menuliskan lambang satu bagian, lalu menempelkan potongan yang sama besarnya berdampingan supaya ukuran ½, ⅓, dan ¼ terlihat.</p>
      </aside>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Pecahan({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const poin = [
    "Bagi dua sama besar? Setiap bagian ½.",
    "Bagi tiga sama besar? Setiap bagian ⅓.",
    "Bagi empat sama besar? Setiap bagian ¼.",
    "Yang diambil di atas, seluruhnya di bawah.",
    "Semakin banyak bagian, semakin kecil potongannya.",
    "Penyebut kecil, bagian besar. ½ lebih besar dari ⅓, dan ⅓ lebih besar dari ¼.",
    "Harus sama besar dulu, baru disebut pecahan.",
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
          alt: "Ciko berdiri di papan kalimat kunci. Buah terpotong tersusun di sekelilingnya.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Pecahan itu bagian dari sesuatu yang utuh.",
          "Penyebut ada di bawah dan menunjukkan seluruh bagian. Pembilang ada di atas dan menunjukkan bagian yang diambil.",
          "Kalau bendanya sama besar, semakin besar penyebut, semakin kecil bagiannya. Setengah lebih besar dari sepertiga, dan sepertiga lebih besar dari seperempat.",
        ])}
        poin={poin}
        penutup="Sama besar dulu, tulis lambangnya, lalu bandingkan penyebutnya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
