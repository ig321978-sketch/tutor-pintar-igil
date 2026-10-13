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
import { MISI_MTK3_PERKALIAN, TEMA_MTK3_PERKALIAN } from "@/lib/misi-mtk-3-perkalian";
import { MODUL_MTK3_PERKALIAN } from "@/lib/modul-resmi-mtk-3-perkalian";
import {
  bacaEmpatKaliLima,
  bacaLimaPuluhEmpat,
  bacaLimaPuluhEnam,
  bacaPertukaran,
  bacaSeratusLimaPuluh,
  bacaSembilanKaliDelapan,
  bentuk63,
  jawabEnam,
  jawabEnamPuluh,
  jawabPerkalian,
  jawabSama,
  jawabSetiap,
  jawabSembilan,
  kalimatKali,
  kasusPetak,
  kotakEmpat,
  langkah126,
  langkah224,
  langkah24,
  langkah252,
  langkah282,
  langkah48,
  tujuhKelompok,
  ulangLima,
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
  Alya: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Danu: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Cika: "border-[#16A34A]/20 bg-[#F0FDF4]",
  "Landak Bulat": "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Alya: "👧",
  Danu: "👦",
  Cika: "👧",
  "Landak Bulat": "🦔",
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

function Langkah({ butir }: { butir: string[] }) {
  return (
    <ol className="list-decimal space-y-1 pl-5 text-sm font-semibold text-slate-700">
      {butir.map((teks) => (
        <li key={teks}>{teks}</li>
      ))}
    </ol>
  );
}

const BENTUK_A = ["5 × 4", "4 × 3", "2 × 7"];
const SIFAT = ["Pengelompokan", "Pertukaran"];
const HASIL_C = ["6 × 5 = 30", "4 × 6 = 24", "3 × 4 = 12"];
const HASIL_EVAL = ["45", "64", "48"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PERKALIAN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="👧👦🦔"
        judul={kartu.judul}
        anak="Alya, Danu, Cika, dan Landak Bulat"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: memahami perkalian sebagai penjumlahan berulang, memakai sifat pertukaran dan pengelompokan, serta menghitung perkalian dua angka dan soal cerita.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Perkalian sebagai penjumlahan berulang"
          warna="border-rose-200 bg-rose-50/60"
          src="/doodle-mtk/mtk-3-perkalian-sub1.jpg"
          alt="Empat keranjang stroberi. Baris penjumlahan panjang dan baris perkalian pendek."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Hari ini kita belajar perkalian. Perkalian itu cara cepat untuk menjumlahkan angka yang sama berulang kali.",
            "Kalau ada empat keranjang berisi tiga buah, kita tidak perlu menjumlahkan tiga sebanyak empat kali. Kita pakai perkalian.",
          ]}
        >
          <Dialog nama="Alya" anak="Cika, lihat! Ada 4 keranjang, isinya 3 stroberi semua." />
          <Dialog nama="Cika" anak="Kalau dijumlahkan: 3 + 3 + 3 + 3." />
          <Dialog nama="Danu" anak="Hitung satu-satu capek! Ada cara cepat?" />
          <Dialog nama="Landak Bulat" anak="Ada! Namanya perkalian! 4 keranjang dikali 3 stroberi!" />
          <Dialog nama="Alya" anak="Jadi 4 × 3 = 12. Sama dengan 3 + 3 + 3 + 3!" />
          <Dialog nama="Cika" anak="Betul! Hasilnya sama, tapi cara kedua lebih cepat." />
          <Dialog nama="Danu" anak="Wah, aku suka yang cepat!" />
          <Papan anak={"4 × 3 = 12\nCara panjang: 3 + 3 + 3 + 3 = 12\nCara cepat: 4 × 3 = 12\nDibaca: empat kali tiga sama dengan dua belas"} />
          <p className="text-sm font-black text-[#1C01A5]">Perkalian sama dengan penjumlahan berulang dari angka yang sama.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Ada 3 keranjang, masing-masing isi 5 stroberi. Penjumlahan berulangnya apa? Ucapkan lengkap."
            periksa={ulangLima}
            petunjuk="Sebutkan angka 5 sebanyak tiga kali."
            benar="Bagus! Sekarang kalian bisa pakai perkalian."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Dua bentuk"
            visual={<Papan anak={"Empat kotak, tiap kotak 4 apel\nPenjumlahan = ⬜\nPerkalian = ⬜"} />}
            pertanyaan="Tulis bentuk penjumlahan berulangnya dan bentuk perkaliannya!"
            pesanSalah="Angka 4 muncul empat kali."
            bantuan="Penjumlahan 4 + 4 + 4 + 4. Perkalian 4 × 4 = 16."
            umpan="4 + 4 + 4 + 4 dan 4 × 4 = 16."
            periksa={kotakEmpat}
            alias={["4+4+4+4", "4 x 4 = 16"]}
            konteks="4 + 4 + 4 + 4 dan 4 × 4 = 16."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Sifat pertukaran"
          warna="border-sky-200 bg-sky-50/60"
          src="/doodle-mtk/mtk-3-perkalian-sub2.jpg"
          alt="Dua susunan stroberi, 4 baris kali 6 dan 6 baris kali 4, dengan tanda sama dengan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sifat pertukaran artinya dua bilangan yang dikalikan boleh bertukar tempat, tapi hasilnya tetap sama.",
            "Dua kali tiga sama dengan tiga kali dua. Ayo kita buktikan dengan gambar.",
          ]}
        >
          <Dialog nama="Cika" anak="Aku susun stroberi ini jadi 4 baris, 6 tiap baris." />
          <Dialog nama="Danu" anak="Aku susun jadi 6 baris, 4 tiap baris." />
          <Dialog nama="Alya" anak="Jumlahnya sama, ya?" />
          <Dialog nama="Landak Bulat" anak="Hitung! 4 × 6 = 24, dan 6 × 4 = 24. Sama!" />
          <Dialog nama="Danu" anak="Jadi kalau aku lupa 6 × 4, aku bisa balik jadi 4 × 6?" />
          <Dialog nama="Cika" anak="Betul! Itu namanya sifat pertukaran. Dibalik, hasilnya tetap sama." />
          <Dialog nama="Alya" anak="Enak! Jadi kita cuma perlu hafal separuhnya." />
          <Papan anak={"4 × 6 = 24\n6 × 4 = 24\nDibalik, hasilnya tetap sama."} />
          <p className="text-sm font-black text-[#1C01A5]">Dua bilangan dikali boleh dibalik. Hasilnya sama.</p>
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="7 × 3 dan 3 × 7. Hasil keduanya sama atau berbeda?"
            periksa={jawabSama}
            petunjuk="Coba hitung 7 tiga kali, dan 3 tujuh kali."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Dua hasil"
            visual={<Papan anak={"8 × 5 = ⬜\n5 × 8 = ⬜"} />}
            pertanyaan="Hitung kedua-duanya dan tulis hasilnya!"
            pesanSalah="Delapan lima kali, atau lima delapan kali."
            bantuan="Keduanya 40."
            umpan="Keduanya 40."
            periksa={(teks) => kalimatKali(teks, "8", "5", "40") || /\b40\b/.test(teks.replace(/\./g, ""))}
            alias={["40"]}
            konteks="8 × 5 = 40 dan 5 × 8 = 40."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Sifat pengelompokan"
          warna="border-violet-200 bg-violet-50/60"
          src="/doodle-mtk/mtk-3-perkalian-sub3.jpg"
          alt="Tiga kotak angka 2, 3, dan 4 dengan tanda kurung yang berpindah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sifat pengelompokan artinya kalau ada tiga bilangan dikalikan, kita boleh mengelompokkannya berbeda.",
            "Yang penting dikerjakan bertahap, satu langkah dulu, baru langkah berikutnya. Hasilnya tetap sama.",
          ]}
        >
          <Dialog nama="Alya" anak="Ada 2 × 3 × 4 stroberi. Ini banyak sekali!" />
          <Dialog nama="Cika" anak="Aku kelompokkan jadi (2 × 3) × 4 dulu. 2 × 3 = 6, lalu 6 × 4 = 24." />
          <Dialog nama="Danu" anak="Aku coba cara lain: 2 × (3 × 4). 3 × 4 = 12, lalu 2 × 12 = 24." />
          <Dialog nama="Landak Bulat" anak="Hasilnya sama! 24!" />
          <Dialog nama="Alya" anak="Jadi kelompok mana pun, hasilnya tetap sama?" />
          <Dialog nama="Cika" anak="Iya! Itu sifat pengelompokan. Yang penting dikerjakan bertahap." />
          <Dialog nama="Danu" anak="Aku pilih yang hitungannya lebih mudah." />
          <Papan anak={"(2 × 3) × 4 = 6 × 4 = 24\n2 × (3 × 4) = 2 × 12 = 24"} />
          <p className="text-sm font-black text-[#1C01A5]">Tiga bilangan dikali boleh dikelompokkan berbeda.</p>
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Kalau (3 × 2) × 5, berapa hasil langkah pertamanya?"
            periksa={jawabEnam}
            petunjuk="Kerjakan yang di dalam kurung dulu."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Dua langkah"
            visual={<Papan anak="2 × 4 × 3 = ⬜" />}
            pertanyaan="Kerjakan dua langkah dan tulis hasil akhirnya!"
            pesanSalah="Kalikan dua angka dulu, baru kalikan hasilnya dengan angka ketiga."
            bantuan="2 × 4 = 8, lalu 8 × 3 = 24."
            umpan="8, lalu 24."
            periksa={langkah24}
            alias={["8", "24"]}
            konteks="2 × 4 = 8. 8 × 3 = 24."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Perkalian dua angka"
          warna="border-amber-200 bg-amber-50/70"
          src="/doodle-mtk/mtk-3-perkalian-sub4.jpg"
          alt="Angka 23 terbelah jadi 20 dan 3, lalu kedua hasil dikalikan digabung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sekarang kita mengalikan bilangan dua angka dengan bilangan satu angka.",
            "Pecah dulu bilangan dua angka menjadi puluhan dan satuan. Kalikan satu per satu, lalu jumlahkan hasilnya.",
          ]}
        >
          <Dialog nama="Cika" anak="Kita punya 23 baris. Tiap baris 4 pohon. Berapa pohonnya?" />
          <Dialog nama="Danu" anak="23 × 4. Hmm, aku tidak hafal." />
          <Dialog nama="Alya" anak="Pecah dulu! 23 jadi 20 dan 3." />
          <Dialog nama="Cika" anak="20 × 4 = 80. Lalu 3 × 4 = 12." />
          <Dialog nama="Danu" anak="Jumlahkan: 80 + 12 = 92!" />
          <Dialog nama="Landak Bulat" anak="Betul! 23 × 4 = 92 pohon!" />
          <Papan anak={"23 × 4 = (20 × 4) + (3 × 4)\n= 80 + 12\n= 92"} />
          <Dialog nama="Alya" anak="Jadi kita tidak perlu hafal semuanya. Tinggal pecah!" />
          <Dialog nama="Cika" anak="Dan hasilnya selalu benar." />
          <p className="text-sm font-black text-[#1C01A5]">Pecah jadi puluhan dan satuan, kalikan terpisah, lalu jumlahkan.</p>
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Pada 34 × 2, angka 34 terbelah jadi 30 dan 4. Berapa hasil 30 × 2?"
            periksa={jawabEnamPuluh}
            petunjuk="3 × 2 = 6. Karena puluhannya, jadi 60."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Pecah dan jumlahkan"
            visual={<Papan anak="42 × 3 = ⬜" />}
            pertanyaan="Pecah dulu, kalikan terpisah, lalu jumlahkan. Tulis semua langkahnya!"
            pesanSalah="42 jadi 40 dan 2."
            bantuan="40 × 3 = 120. 2 × 3 = 6. 120 + 6 = 126."
            umpan="120 + 6 = 126."
            periksa={langkah126}
            alias={["120", "126"]}
            konteks="40 × 3 = 120. 2 × 3 = 6. 120 + 6 = 126."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita perkalian"
          warna="border-emerald-200 bg-emerald-50/70"
          src="/doodle-mtk/mtk-3-perkalian-sub5.jpg"
          alt="Empat ikon langkah: kaca, kunci, pensil, dan sempoa. Landak duduk dengan buku besar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Soal cerita perkalian biasanya memakai kata setiap, tiap-tiap, per, atau masing-masing. Kata itu menandakan jumlah yang sama muncul berulang.",
            "Empat langkahnya: cari angka, cari kata kunci, tulis kalimat, lalu hitung.",
          ]}
          simbol={[
            { ikon: "🔍", teks: "Cari angka" },
            { ikon: "🔑", teks: "Kata kunci" },
            { ikon: "✏️", teks: "Tulis" },
            { ikon: "🧮", teks: "Hitung" },
          ]}
        >
          <Dialog nama="Landak Bulat" anak="Ada 8 baris stroberi. Setiap baris ada 7 pohon. Berapa pohon semuanya?" />
          <Dialog nama="Danu" anak="Kata kuncinya setiap. Berarti perkalian!" />
          <Dialog nama="Alya" anak="Kalimatnya: 8 × 7." />
          <Dialog nama="Cika" anak="Aku hafal 8 × 7 = 56." />
          <Dialog nama="Danu" anak="Jadi ada 56 pohon stroberi!" />
          <Papan anak={"Angka: 8 dan 7\nKata kunci: setiap baris, berarti perkalian\nKalimat: 8 × 7 = 56"} />
          <Dialog nama="Landak Bulat" anak="Bagus! Kalau kata setiap muncul, pikirkan perkalian!" />
          <p className="text-sm font-black text-[#1C01A5]">Setiap, tiap, per, dan masing-masing menandakan perkalian.</p>
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Kata setiap, sisa, dan berkurang. Kata mana yang menandakan perkalian?"
            periksa={jawabSetiap}
            petunjuk="Kata yang artinya barangnya berulang sama banyak."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Kalimat cerita"
            visual={<Papan anak="Ada 6 keranjang. Setiap keranjang berisi 9 jeruk." />}
            pertanyaan="Tulis kalimat matematikanya dan hasilnya!"
            pesanSalah="Setiap berarti jumlah yang sama berulang."
            bantuan="Setiap = kali. 6 × 9 = 54."
            umpan="6 × 9 = 54."
            periksa={(teks) => kalimatKali(teks, "6", "9", "54")}
            alias={["6 x 9 = 54"]}
            konteks="6 × 9 = 54."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Lima keranjang berisi 6 jeruk. Bentuk perkalian yang tepat adalah..."
          pilihan={[
            { huruf: "A", teks: "5 + 6" },
            { huruf: "B", teks: "5 × 6" },
            { huruf: "C", teks: "6 − 5" },
            { huruf: "D", teks: "6 × 6" },
          ]}
          benar="B"
          umpan="Lima kelompok berisi enam. Bentuknya 5 × 6."
          salah="Jumlah keranjang dikali isi tiap keranjang."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan penjumlahan berulang dengan bentuk perkaliannya."
          baris={[
            { kiri: "3 + 3 + 3 + 3", pilihan: BENTUK_A, benar: "4 × 3" },
            { kiri: "4 + 4 + 4 + 4 + 4", pilihan: BENTUK_A, benar: "5 × 4" },
            { kiri: "7 + 7", pilihan: BENTUK_A, benar: "2 × 7" },
          ]}
          umpan="3 muncul 4 kali. 4 muncul 5 kali. 7 muncul 2 kali."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun supaya jadi kalimat yang benar."
          acak={["42", "=", "7", "6", "×"]}
          benar={["6", "×", "7", "=", "42"]}
          umpan="6 × 7 = 42."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif perkalian. Periksa tiga pernyataan."
          baris={[
            { teks: "5 × 8 hasilnya sama dengan 8 × 5.", benar: true },
            { teks: "Perkalian selalu hasilnya lebih besar dari penjumlahan.", benar: false },
            { teks: "Pada 2 × 3 × 4, (2 × 3) × 4 sama dengan 2 × (3 × 4).", benar: true },
          ]}
          umpan="Benar, salah, benar. 1 × 5 = 5, sedangkan 1 + 5 = 6. Perkalian tidak selalu lebih besar."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga hitungan hasilnya sama. Mana yang berbeda?"
          pilihan={[
            { huruf: "A", teks: "6 × 7" },
            { huruf: "B", teks: "7 × 6" },
            { huruf: "C", teks: "8 × 5" },
            { huruf: "D", teks: "42" },
          ]}
          benar="C"
          umpan="6 × 7, 7 × 6, dan 42 semuanya 42. 8 × 5 = 40."
          salah="Hitung satu per satu. Tiga di antaranya bernilai 42."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Perkalian itu penjumlahan berulang."
          alias={["perkalian", "berulang"]}
          konteks="Perkalian itu penjumlahan berulang."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PERKALIAN.kartu[1];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="📊"
        judul={kartu.judul}
        anak="Papan sifat perkalian"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Perkalian sama dengan penjumlahan berulang"
          warna="border-rose-200 bg-white"
          src="/doodle-mtk/mtk-3-perkalian-sub1.jpg"
          alt="Baris penjumlahan yang panjang di samping baris perkalian yang pendek."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Perkalian adalah cara cepat menjumlahkan angka yang sama berulang kali.",
            "Jumlah kelompoknya dikali isi tiap kelompok. Hasilnya sama dengan penjumlahan berulang.",
          ]}
        >
          <Papan anak={"2 + 2 + 2 + 2 = 8    dan    4 × 2 = 8\n5 + 5 + 5 = 15    dan    3 × 5 = 15\n6 + 6 + 6 + 6 + 6 = 30    dan    5 × 6 = 30"} />
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 7 + 7 + 7</p>
          <Langkah butir={["Angka 7 muncul 3 kali.", "Bentuk perkaliannya 3 × 7.", "3 × 7 = 21."]} />
          <p className="text-sm font-black text-emerald-800">Trik: berapa kelompok kali isi tiap kelompok.</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Pada 5 + 5 + 5 + 5, ucapkan bentuk perkaliannya dan hasilnya."
            periksa={bacaEmpatKaliLima}
            petunjuk="Hitung berapa kali angka 5 muncul, lalu kalikan."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="6 + 6 + 6 = ⬜" />}
            pertanyaan="Tulis bentuk perkaliannya dan hasilnya!"
            pesanSalah="Angka 6 muncul tiga kali."
            bantuan="3 × 6 = 18."
            umpan="3 × 6 = 18."
            periksa={(teks) => kalimatKali(teks, "3", "6", "18")}
            alias={["3 x 6 = 18"]}
            konteks="3 × 6 = 18."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Sifat pertukaran"
          warna="border-sky-200 bg-white"
          src="/doodle-mtk/mtk-3-perkalian-sub2.jpg"
          alt="Dua susunan kotak yang dihubungkan tanda sama dengan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sifat pertukaran artinya dua angka yang dikalikan boleh bertukar posisi, tapi hasilnya tetap sama.",
            "Kalau kalian lupa hasil salah satu perkalian, coba balik posisinya.",
          ]}
        >
          <Papan anak={"3 × 8 = 8 × 3 = 24\n6 × 7 = 7 × 6 = 42\n9 × 4 = 4 × 9 = 36"} />
          <Langkah butir={["Kalau belum hafal 9 × 4, balik jadi 4 × 9.", "4 × 9 = 36.", "Jadi 9 × 4 = 36 juga."]} />
          <p className="text-sm font-black text-emerald-800">Trik: dibalik, hasilnya tetap sama.</p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Berapa hasil 6 × 9 dan 9 × 6?"
            periksa={bacaLimaPuluhEmpat}
            petunjuk="Hitung salah satunya, lalu balik posisinya."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="9 × 7 = ⬜" />}
            pertanyaan="Hitung hasilnya, lalu tulis bentuk pertukarannya!"
            pesanSalah="Coba balik jadi 7 × 9."
            bantuan="9 × 7 = 63. Bentuk pertukarannya 7 × 9 = 63."
            umpan="63, dan 7 × 9 = 63."
            periksa={bentuk63}
            alias={["63", "7 x 9"]}
            konteks="9 × 7 = 63 dan 7 × 9 = 63."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Sifat pengelompokan"
          warna="border-violet-200 bg-white"
          src="/doodle-mtk/mtk-3-perkalian-sub3.jpg"
          alt="Tiga angka dengan tanda kurung yang dihubungkan panah dua arah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau ada tiga angka dikalikan, kita boleh mengelompokkannya berbeda.",
            "Kerjakan yang di dalam kurung dulu, lalu kalikan hasilnya dengan angka berikutnya. Pilih kelompok yang hitungannya paling mudah.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 2 × 5 × 3</p>
          <Langkah butir={["Kelompokkan jadi (2 × 5) × 3.", "2 × 5 = 10.", "10 × 3 = 30."]} />
          <Papan anak="Cara lain: 2 × (5 × 3) = 2 × 15 = 30." />
          <p className="text-sm font-black text-emerald-800">Trik: kerjakan dalam kurung dulu.</p>
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Pada 3 × 3 × 5, kurung mengelilingi 3 × 3. Berapa hasil langkah pertamanya?"
            periksa={jawabSembilan}
            petunjuk="Kerjakan 3 × 3 lebih dulu."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="2 × 6 × 4 = ⬜" />}
            pertanyaan="Kerjakan dua langkah dan tulis hasil akhirnya!"
            pesanSalah="Kalikan 2 dan 6 lebih dulu."
            bantuan="2 × 6 = 12, lalu 12 × 4 = 48."
            umpan="12, lalu 48."
            periksa={langkah48}
            alias={["12", "48"]}
            konteks="2 × 6 = 12. 12 × 4 = 48."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Perkalian dua angka"
          warna="border-amber-200 bg-white"
          src="/doodle-mtk/mtk-3-perkalian-sub4.jpg"
          alt="Angka 34 terbelah jadi 30 dan 4, dua panah menuju hasil, lalu digabung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk mengalikan bilangan dua angka dengan satu angka, pecah dulu bilangan dua angkanya.",
            "Kalikan puluhannya, kalikan satuannya, lalu jumlahkan kedua hasilnya.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 34 × 2</p>
          <Langkah butir={["Pecah 34 menjadi 30 dan 4.", "30 × 2 = 60.", "4 × 2 = 8.", "60 + 8 = 68."]} />
          <Papan anak="34 × 2 = (30 × 2) + (4 × 2) = 60 + 8 = 68" />
          <p className="text-sm font-black text-emerald-800">Trik: pecah dulu, kalikan terpisah, baru jumlahkan.</p>
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Pada 52 × 3, angka 52 terbelah jadi 50 dan 2. Berapa hasil 50 × 3?"
            periksa={bacaSeratusLimaPuluh}
            petunjuk="5 × 3 = 15. Karena puluhannya, jadi 150."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="63 × 4 = ⬜" />}
            pertanyaan="Tulis semua langkah pengerjaannya!"
            pesanSalah="63 jadi 60 dan 3."
            bantuan="60 × 4 = 240. 3 × 4 = 12. 240 + 12 = 252."
            umpan="240 + 12 = 252."
            periksa={langkah252}
            alias={["240", "252"]}
            konteks="60 × 4 = 240. 3 × 4 = 12. 240 + 12 = 252."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita perkalian"
          warna="border-emerald-200 bg-white"
          src="/doodle-mtk/mtk-3-perkalian-sub5.jpg"
          alt="Empat ikon langkah bernomor dan daftar kata kunci perkalian."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Soal cerita perkalian biasanya memakai kata setiap, tiap-tiap, per, atau masing-masing.",
            "Gunakan empat langkah: cari angka, cari kata kunci, tulis kalimat, lalu hitung.",
          ]}
        >
          <div className="rounded-xl bg-emerald-50 px-3 py-3">
            <p className="text-sm font-black text-emerald-800">Kata kunci perkalian</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">setiap, tiap-tiap, per, masing-masing</p>
          </div>
          <p className="text-sm font-black text-[#1C01A5]">Contoh: ada 7 kotak. Setiap kotak berisi 8 pensil.</p>
          <Langkah butir={["Angka: 7 dan 8.", "Kata setiap berarti perkalian.", "Kalimat: 7 × 8.", "Hitung: 56. Ada 56 pensil."]} />
          <p className="text-sm font-black text-emerald-800">Trik: kata setiap berarti kali.</p>
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Kata masing-masing menandakan operasi apa?"
            periksa={jawabPerkalian}
            petunjuk="Jumlah yang sama muncul berulang."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="Ada 9 meja. Setiap meja ada 4 kursi." />}
            pertanyaan="Tulis kalimat matematika dan hasilnya!"
            pesanSalah="Setiap meja punya jumlah kursi yang sama."
            bantuan="9 × 4 = 36."
            umpan="9 × 4 = 36."
            periksa={(teks) => kalimatKali(teks, "9", "4", "36")}
            alias={["9 x 4 = 36"]}
            konteks="9 × 4 = 36."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Manakah yang hasilnya 42?"
          pilihan={[
            { huruf: "A", teks: "6 × 6" },
            { huruf: "B", teks: "6 × 7" },
            { huruf: "C", teks: "7 × 7" },
            { huruf: "D", teks: "8 × 5" },
          ]}
          benar="B"
          umpan="6 × 7 = 42. Yang lain: 36, 49, dan 40."
          salah="Hitung tiap kartu."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan soal dengan sifat yang dipakai."
          baris={[
            { kiri: "7 × 6 menjadi 6 × 7", pilihan: SIFAT, benar: "Pertukaran" },
            { kiri: "(2 × 5) × 3 menjadi 2 × (5 × 3)", pilihan: SIFAT, benar: "Pengelompokan" },
          ]}
          umpan="Membalik dua angka adalah pertukaran. Memindahkan kurung adalah pengelompokan."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari hasil terkecil ke terbesar."
          acak={["9 × 9", "3 × 4", "7 × 8", "5 × 6"]}
          benar={["3 × 4", "5 × 6", "7 × 8", "9 × 9"]}
          umpan="Hasilnya 12, 30, 56, lalu 81."
          salah="3 × 4 = 12, 5 × 6 = 30, 7 × 8 = 56, 9 × 9 = 81."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "23 × 4 = (20 × 4) + (3 × 4).", benar: true },
            { teks: "5 × 5 hasilnya sama dengan 5 + 5.", benar: false },
            { teks: "Kata setiap menandakan perkalian.", benar: true },
          ]}
          umpan="Benar, salah, benar. 20 × 4 + 3 × 4 = 92. 5 × 5 = 25, sedangkan 5 + 5 = 10."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Aku hasil dari 8 × 6. Aku juga hasil dari ⬜ × 8. Angka di kotak adalah..."
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "7" },
            { huruf: "D", teks: "8" },
          ]}
          benar="B"
          umpan="8 × 6 = 48 dan 6 × 8 = 48. Sifat pertukaran."
          salah="Cari angka yang jika dikali 8 hasilnya sama dengan 8 × 6."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Dua angka? Pecah dulu."
          alias={["pecah", "angka"]}
          konteks="Dua angka? Pecah dulu."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PERKALIAN.kartu[2];
  return (
    <KartuBingkai latar="bg-rose-50/40">
      <KepalaKartu
        ikon="🍓🦔"
        judul={kartu.judul}
        anak="Sepuluh pos · kali, balik, kelompok, pecah"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini, kalian menjadi kepala kebun stroberi. Setiap petak punya baris dan pohon yang sama banyak.",
          "Tugas kalian adalah menghitung cepat dengan perkalian, bukan dengan penjumlahan panjang. Kalau hitunganmu cepat dan tepat, kalian mendapat keranjang stroberi.",
          "Ayo kita mulai memanen!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-perkalian-permainan.jpg"
        alt="Kebun stroberi berbaris, papan hitung, tumpukan keranjang, dan landak bertopi jerami."
        ukuran="lebar"
      />
      <PanduanIkon
        judul="Simbol kebun"
        butir={[
          { ikon: "🌱", teks: "Baris pohon" },
          { ikon: "🔄", teks: "Pertukaran" },
          { ikon: "✂️", teks: "Pecah puluhan" },
          { ikon: "🧺", teks: "Keranjang" },
          { ikon: "👩‍🌾", teks: "Kepala kebun" },
        ]}
      />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu kepala kebun. Setiap petak dihitung dengan perkalian. Hitungan tepat, panen berhasil.</p>
        <p>Level 1: 4 baris × 5 pohon = 20, sama dengan 5 + 5 + 5 + 5. Level 2: 6 × 3 dan 3 × 6 sama-sama 18.</p>
        <p>Level 3: 2 × 4 × 5 = 40. Level 4: 24 × 4 = 80 + 16 = 96. Level 5: 7 × 8 = 56, lalu 56 × 5 = 280 kg.</p>
        <p>Petak Kecil soalnya langsung, hadiahnya 1 keranjang. Petak Besar soalnya dua angka, hadiahnya lebih besar.</p>
        <p>Kaca Petani membantu melihat pola baris, tetapi mengurangi 1 keranjang. Berani tanpa bantuan menambah 1 keranjang.</p>
        <p>Salah hitung berarti sebagian panen terbuang. Gerobak berbalik dan kamu boleh mengulang. Keranjang tidak berkurang.</p>
        <p>Mode berdua: pemain A menghitung jumlah baris, pemain B menghitung isi tiap baris. Hasilnya digabung.</p>
        <p>Kumpulkan 10 keranjang untuk membuka Kebun Besar dan mendapat topi petani.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK3_PERKALIAN}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK3_PERKALIAN}
        penutup="Kebun Besar terbuka. Landak Bulat memasang topi petani."
        bunga="🍓🧺👩‍🌾🦔"
      />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal kebun</h5>
        <Pilih
          id={idKuis("C", 10)}
          pertanyaan="1. Ada 6 baris stroberi, tiap baris 7 pohon. Bentuk perkaliannya adalah..."
          pilihan={[
            { huruf: "A", teks: "6 + 7" },
            { huruf: "B", teks: "6 × 7" },
            { huruf: "C", teks: "7 − 6" },
            { huruf: "D", teks: "6 × 6" },
          ]}
          benar="B"
          umpan="Enam baris berisi tujuh. Bentuknya 6 × 7."
          salah="Jumlah baris dikali isi tiap baris."
        />
        <Pilih
          id={idKuis("C", 11)}
          pertanyaan="2. Berapa hasil 8 × 7?"
          pilihan={[
            { huruf: "A", teks: "48" },
            { huruf: "B", teks: "54" },
            { huruf: "C", teks: "56" },
            { huruf: "D", teks: "64" },
          ]}
          benar="C"
          umpan="8 × 7 = 56."
          salah="Delapan dikali tujuh."
        />
        <KuisCocok
          id={idKuis("C", 12)}
          perintah="3. Pasangkan penjumlahan berulang dengan perkaliannya."
          baris={[
            { kiri: "6 + 6 + 6 + 6", pilihan: HASIL_C, benar: "4 × 6 = 24" },
            { kiri: "5 + 5 + 5 + 5 + 5 + 5", pilihan: HASIL_C, benar: "6 × 5 = 30" },
            { kiri: "4 + 4 + 4", pilihan: HASIL_C, benar: "3 × 4 = 12" },
          ]}
          umpan="24, 30, dan 12."
        />
        <SusunToken
          id={idKuis("C", 13)}
          perintah="4. Susun dari hasil terkecil ke terbesar."
          acak={["9 × 3", "5 × 8", "7 × 7", "4 × 4"]}
          benar={["4 × 4", "9 × 3", "5 × 8", "7 × 7"]}
          umpan="Hasilnya 16, 27, 40, lalu 49."
          salah="4 × 4 = 16, 9 × 3 = 27, 5 × 8 = 40, 7 × 7 = 49."
        />
        <KuisBenarSalah
          id={idKuis("C", 14)}
          perintah="5. Cek kebun."
          baris={[
            { teks: "7 × 9 hasilnya sama dengan 9 × 7.", benar: true },
            { teks: "42 × 2 = (40 × 2) + (2 × 2) = 84.", benar: true },
            { teks: "Kata setiap menandakan pengurangan.", benar: false },
          ]}
          umpan="Benar, benar, salah. 80 + 4 = 84. Kata setiap menandakan perkalian."
        />
        <Pilih
          id={idKuis("C", 15)}
          pertanyaan="6. Apa yang bisa kamu katakan tentang 4 × 9 dan 9 × 4?"
          pilihan={[
            { huruf: "A", teks: "Hasil pertama lebih besar" },
            { huruf: "B", teks: "Hasil kedua lebih besar" },
            { huruf: "C", teks: "Hasilnya sama" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="C"
          umpan="Keduanya 36. Itu sifat pertukaran."
          salah="Balik posisi kedua angka, lalu bandingkan."
        />
        <Pilih
          id={idKuis("C", 16)}
          pertanyaan="7. Berapa hasil 32 × 3?"
          pilihan={[
            { huruf: "A", teks: "86" },
            { huruf: "B", teks: "96" },
            { huruf: "C", teks: "106" },
            { huruf: "D", teks: "126" },
          ]}
          benar="B"
          umpan="30 × 3 = 90 dan 2 × 3 = 6. Jadi 96."
          salah="Pecah 32 menjadi 30 dan 2."
        />
        <Pilih
          id={idKuis("C", 17)}
          pertanyaan="8. Hasil panen naik 6: 12 – 18 – 24 – ⬜ – 36. Angka yang hilang..."
          pilihan={[
            { huruf: "A", teks: "28" },
            { huruf: "B", teks: "30" },
            { huruf: "C", teks: "32" },
            { huruf: "D", teks: "34" },
          ]}
          benar="B"
          umpan="24 + 6 = 30."
          salah="Tambahkan 6 pada 24."
        />
        <KuisSuara
          id={idKuis("C", 18)}
          pertanyaan="Ada sembilan baris, setiap baris berisi delapan pohon. Sebutkan perkaliannya dan hasilnya."
          periksa={bacaSembilanKaliDelapan}
          petunjuk="Sebut sembilan kali delapan, lalu sebut hasilnya."
        />
        <TulisBebas
          id={idKuis("C", 19)}
          judul="Papan catatan"
          visual={<Papan anak="47 × 6 = ⬜" />}
          pertanyaan="Pecah dulu, kalikan terpisah, lalu jumlahkan. Tulis semua langkah!"
          pesanSalah="47 jadi 40 dan 7."
          bantuan="40 × 6 = 240. 7 × 6 = 42. 240 + 42 = 282."
          umpan="240 + 42 = 282."
          periksa={langkah282}
          alias={["240", "42", "282"]}
          konteks="40 × 6 = 240. 7 × 6 = 42. 240 + 42 = 282."
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
  const lencana = skor >= 9 ? "👩‍🌾 Kepala Kebun Ahli" : skor >= 6 ? "🧺 Pemetik Cerdas" : "🦔 Sahabat Landak Bulat";
  const pesan =
    skor >= 9
      ? "Luar biasa! Perkalianmu cepat dan tepat!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi kepala kebun!"
        : "Ayo berlatih lagi bersama Landak Bulat, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-amber-50/80">
      <KepalaKartu
        ikon="📝🦔"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal tentang perkalian sampai 100.",
          "Beberapa soal mengubah penjumlahan berulang jadi perkalian, beberapa memakai sifat pertukaran atau pengelompokan, dan beberapa menghitung perkalian dua angka.",
          "Kalau lupa hasilnya, coba balik posisinya. Jangan terburu-buru, dan periksa lagi jawabanmu.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-perkalian-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan keranjang stroberi. Landak mengangkat kaki kecilnya."
        ukuran="lebar"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Ubah ke perkalian"
          visual={<Papan anak={"Tujuh kelompok, tiap kelompok 8 bola\nPenjumlahan = ⬜\nPerkalian = ⬜"} />}
          pertanyaan="Tulis bentuk penjumlahan berulangnya dan bentuk perkaliannya, lengkap dengan hasilnya!"
          pesanSalah="Angka 8 ditulis tujuh kali, lalu ubah menjadi perkalian."
          bantuan="8 + 8 + 8 + 8 + 8 + 8 + 8 dan 7 × 8 = 56."
          umpan="Tujuh angka 8, dan 7 × 8 = 56."
          periksa={tujuhKelompok}
          alias={["8+8+8+8+8+8+8", "7 x 8 = 56"]}
          konteks="8 + 8 + 8 + 8 + 8 + 8 + 8 dan 7 × 8 = 56."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Bentuk mana yang hasilnya sama dengan 9 × 6?"
          pilihan={[
            { huruf: "A", teks: "9 + 6" },
            { huruf: "B", teks: "6 × 9" },
            { huruf: "C", teks: "9 × 9" },
            { huruf: "D", teks: "6 + 9" },
          ]}
          benar="B"
          umpan="6 × 9 membalik 9 × 6. Hasilnya tetap 54."
          salah="Cari bentuk yang hanya membalik posisi kedua angka."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="Ucapkan hasil 7 × 8."
          periksa={bacaLimaPuluhEnam}
          petunjuk="Tujuh dikali delapan."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Danu menulis: perkalian selalu menghasilkan angka yang lebih besar dari penjumlahan. Apakah Danu benar?"
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, karena 1 × 5 = 5 sedangkan 1 + 5 = 6" },
            { huruf: "C", teks: "Salah, karena 2 × 2 hasilnya hanya 4" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="B"
          umpan="1 × 5 = 5 dan 1 + 5 = 6. Perkalian tidak selalu lebih besar."
          salah="Uji pernyataan itu pada angka 1."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan setiap perkalian dengan hasilnya."
          baris={[
            { kiri: "8 × 8", pilihan: HASIL_EVAL, benar: "64" },
            { kiri: "5 × 9", pilihan: HASIL_EVAL, benar: "45" },
            { kiri: "6 × 8", pilihan: HASIL_EVAL, benar: "48" },
          ]}
          umpan="64, 45, dan 48."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Perkalian dua angka"
          visual={<Papan anak="56 × 4 = ⬜" />}
          pertanyaan="Tulis semua langkah pengerjaannya!"
          pesanSalah="56 jadi 50 dan 6."
          bantuan="50 × 4 = 200. 6 × 4 = 24. 200 + 24 = 224."
          umpan="200 + 24 = 224."
          periksa={langkah224}
          alias={["200", "24", "224"]}
          konteks="50 × 4 = 200. 6 × 4 = 24. 200 + 24 = 224."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. ⬜ × 7 = 63. Angka yang hilang..."
          visual={<Papan anak="⬜ × 7 = 63" />}
          pilihan={[
            { huruf: "A", teks: "7" },
            { huruf: "B", teks: "8" },
            { huruf: "C", teks: "9" },
            { huruf: "D", teks: "10" },
          ]}
          benar="C"
          umpan="9 × 7 = 63."
          salah="Cari angka yang jika dikali 7 hasilnya 63."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari hasil terkecil ke terbesar."
          acak={["9 × 9", "4 × 7", "8 × 6", "3 × 9"]}
          benar={["3 × 9", "4 × 7", "8 × 6", "9 × 9"]}
          umpan="Hasilnya 27, 28, 48, lalu 81."
          salah="3 × 9 = 27, 4 × 7 = 28, 8 × 6 = 48, 9 × 9 = 81."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="Pada 6 × 8 dan 8 × 6, ucapkan hasil keduanya, lalu sebutkan nama sifat yang membuat hasilnya sama."
          periksa={bacaPertukaran}
          petunjuk="Sebut hasilnya, lalu sebut sifat pertukaran."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Panen Landak Bulat"
          visual={<Papan anak={"Petak A: 6 baris × 8 pohon\nPetak B: 7 baris × 9 pohon\nPetak C: 5 baris × 8 pohon"} />}
          pertanyaan="Tulis jumlah pohon tiap petak, petak yang paling banyak, dan selisih pohon terbanyak dengan tersedikit."
          pesanSalah="Kalikan tiap petak dulu, cari yang paling besar dan yang paling kecil, lalu kurangkan."
          bantuan="A = 48, B = 63, C = 40. Petak B paling banyak. 63 − 40 = 23."
          umpan="48, 63, dan 40. Petak B. Selisihnya 23."
          periksa={kasusPetak}
          alias={["48", "63", "40", "23", "petak b"]}
          konteks="A = 48, B = 63, C = 40. Petak B paling banyak. Selisih 23."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Kata setiap berarti kali."
          alias={["setiap", "kali"]}
          konteks="Kata setiap berarti kali."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">
          Seluruh soal memakai perkalian: penjumlahan berulang, sifat pertukaran, sifat pengelompokan, perkalian dua angka dengan satu angka, dan soal cerita.
        </p>
        <p className="mt-2">
          Kesalahan yang paling sering: menghitung jumlah kelompok saja, tidak membalik posisi saat hafalan macet, dan salah memecah puluhan dengan satuan.
        </p>
        <p className="mt-2">
          Soal 2, 4, dan 7 menyasar ketiganya. Pada soal 4, 1 × 5 = 5 sedangkan 1 + 5 = 6, jadi perkalian tidak selalu lebih besar. Soal 6 dan 10 menuntut jejak langkah.
        </p>
        <p className="mt-2">
          Gunakan benda nyata berbentuk baris dan kolom. Untuk sifat pertukaran, putar susunan 90 derajat. Untuk perkalian dua angka, pisahkan kartu puluhan dan kartu satuan.
        </p>
      </aside>
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
    "Perkalian itu penjumlahan berulang.",
    "Berapa kelompok kali isi tiap kelompok.",
    "Dibalik, hasilnya sama.",
    "Kelompok mana pun, hasilnya sama.",
    "Kalau lupa, coba balik posisinya.",
    "Dua angka? Pecah dulu. 34 × 2 = (30 × 2) + (4 × 2).",
    "Kata setiap berarti kali.",
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
          alt: "Landak Bulat berdiri di papan kalimat kunci. Keranjang stroberi tersusun berbaris.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Perkalian adalah cara cepat menjumlahkan angka yang sama.",
          "Dua angka dikali boleh dibalik, hasilnya sama. Tiga angka dikali boleh dikelompokkan berbeda. Untuk perkalian dua angka, pecah dulu jadi puluhan dan satuan.",
          "Kalau ada kata setiap, tiap, atau masing-masing, itu tanda perkalian.",
        ])}
        poin={poin}
        penutup="Berulang, dibalik, dikelompokkan, dipecah, lalu dihitung."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
