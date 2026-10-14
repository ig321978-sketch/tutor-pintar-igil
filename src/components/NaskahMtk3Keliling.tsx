"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
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
import { MISI_MTK3_KELILING, TEMA_MTK3_KELILING } from "@/lib/misi-mtk-3-keliling";
import { MODUL_MTK3_KELILING } from "@/lib/modul-resmi-mtk-3-keliling";
import { nilaiPetak } from "@/lib/nilai-mtk-3-keliling";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_KELILING.id;

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


const PASANG_A = ["8", "12", "9"];
const PASANG_B = ["24", "12", "4"];
const PASANG_D = ["12", "18", "10"];

const LARANG_20 = ["satu", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_22 = ["satu", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_26 = ["satu", "tiga", "empat", "lima", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_28 = ["satu", "tiga", "empat", "lima", "enam", "tujuh", "sembilan", "belas", "ratus"];
const LARANG_30 = ["satu", "dua", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_32 = ["satu", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_36 = ["satu", "dua", "empat", "lima", "tujuh", "delapan", "sembilan", "belas", "ratus"];
const LARANG_10 = ["belas", "ratus", "ribu", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const LARANG_BELAS = ["puluh", "ratus", "ribu"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_KELILING.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🌱🦉"
        judul={kartu.judul}
        anak="Nisa, Farhan, Cinta, dan Igil di kebun petak"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: menghitung keliling persegi dan persegi panjang, lalu menentukan luas dengan menghitung petak.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Keliling persegi"
          src="/doodle-mtk/mtk-3-keliling-sub1.jpg"
          alt="Kebun persegi dikelilingi tali. Igil bertopi biru bersama tiga anak."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Keliling persegi adalah empat sisi yang sama, dijumlahkan."]}
        >
          <Dialog nama="Igil" anak="Kebun ini persegi. Satu sisi 3 langkah." />
          <Dialog nama="Nisa" anak="Empat sisinya sama." />
          <Dialog nama="Farhan" anak="3 + 3 + 3 + 3." />
          <Dialog nama="Cinta" anak="Kelilingnya 12 langkah." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Persegi dengan sisi 5. Sebutkan kelilingnya."
            periksa={(teks) => nilaiPetak(teks, 20, ["dua puluh"], LARANG_20)}
            petunjuk="Jumlahkan empat sisi yang sama."
            benar="20."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="sisi 7" />}
            pertanyaan="Persegi dengan sisi 7. Tulis kelilingnya."
            pesanSalah="Kalikan sisi dengan 4."
            bantuan="7 × 4 = 28."
            umpan="28."
            periksa={(teks) => nilaiPetak(teks, 28, ["dua puluh delapan"], LARANG_28)}
            alias={["28", "dua puluh delapan"]}
            konteks="Persegi sisi 7. Keliling 28."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Keliling persegi panjang"
          src="/doodle-mtk/mtk-3-keliling-sub2.jpg"
          alt="Kebun persegi panjang dengan tali di tepi. Wortel dan sayuran di dalamnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Keliling persegi panjang menjumlahkan dua panjang dan dua lebar."]}
        >
          <Dialog nama="Cinta" anak="Panjangnya 6 langkah. Lebarnya 2 langkah." />
          <Dialog nama="Farhan" anak="6 + 2 + 6 + 2." />
          <Dialog nama="Igil" anak="Kelilingnya 16 langkah." />
          <Dialog nama="Nisa" anak="Dua sisi panjang, dua sisi lebar." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Panjang 8, lebar 3. Sebutkan kelilingnya."
            periksa={(teks) => nilaiPetak(teks, 22, ["dua puluh dua"], LARANG_22)}
            petunjuk="Jumlahkan dua panjang dan dua lebar."
            benar="22."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="9 dan 4" />}
            pertanyaan="Panjang 9, lebar 4. Tulis kelilingnya."
            pesanSalah="Jumlahkan dua panjang dan dua lebar."
            bantuan="9 + 4 + 9 + 4 = 26."
            umpan="26."
            periksa={(teks) => nilaiPetak(teks, 26, ["dua puluh enam"], LARANG_26)}
            alias={["26", "dua puluh enam"]}
            konteks="Panjang 9 lebar 4. Keliling 26."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Menjumlahkan semua sisi"
          src="/doodle-mtk/mtk-3-keliling-sub3.jpg"
          alt="Farhan berjalan di tali keliling kebun. Cinta memegang ujung tali."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Keliling juga bisa dihitung dengan menjumlahkan setiap sisi yang dilalui."]}
        >
          <Dialog nama="Farhan" anak="Aku jalan 4, 5, 4, lalu 5 langkah." />
          <Dialog nama="Nisa" anak="4 + 5 + 4 + 5." />
          <Dialog nama="Igil" anak="Jumlahnya 18." />
          <Dialog nama="Cinta" anak="Itu keliling tali kebun." />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="7 + 3 + 7 + 3. Sebutkan jumlahnya."
            periksa={(teks) => nilaiPetak(teks, 20, ["dua puluh"], LARANG_20)}
            petunjuk="Jumlahkan keempat sisi."
            benar="20."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="10 + 5 + 10 + 5" />}
            pertanyaan="10 + 5 + 10 + 5. Tulis jumlahnya."
            pesanSalah="Jumlahkan keempat sisi."
            bantuan="10 + 5 = 15. 15 + 15 = 30."
            umpan="30."
            periksa={(teks) => nilaiPetak(teks, 30, ["tiga puluh"], LARANG_30)}
            alias={["30", "tiga puluh"]}
            konteks="10 + 5 + 10 + 5 = 30."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Luas dengan petak"
          src="/doodle-mtk/mtk-3-keliling-sub4.jpg"
          alt="Anak-anak menata petak warna di dalam tali kebun. Igil bertopi biru di tepi."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Luas adalah jumlah petak di dalam. Tali di tepi tetap keliling."]}
        >
          <Dialog nama="Nisa" anak="Kebunku 2 baris. Tiap baris 3 petak." />
          <Dialog nama="Farhan" anak="2 kali 3." />
          <Dialog nama="Igil" anak="Luasnya 6 petak." />
          <Dialog nama="Cinta" anak="Petak di dalam dihitung. Tali di tepi tidak." />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="3 baris, tiap baris 4 petak. Sebutkan luasnya."
            periksa={(teks) => nilaiPetak(teks, 12, ["dua belas"], LARANG_BELAS)}
            petunjuk="Kalikan jumlah baris dengan petak pada tiap baris."
            benar="12."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="2 baris × 5 petak" />}
            pertanyaan="2 baris, tiap baris 5 petak. Tulis luasnya."
            pesanSalah="Kalikan jumlah baris dengan petak pada tiap baris."
            bantuan="2 × 5 = 10."
            umpan="10."
            periksa={(teks) => nilaiPetak(teks, 10, ["sepuluh"], LARANG_10)}
            alias={["10", "sepuluh"]}
            konteks="2 baris kali 5 petak = 10."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Membandingkan luas"
          src="/doodle-mtk/mtk-3-keliling-sub5.jpg"
          alt="Dua kebun petak berdampingan. Tiga anak dan Igil membandingkannya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Luas lebih besar bila petaknya lebih banyak."]}
        >
          <Dialog nama="Cinta" anak="Dua kebun ini bentuknya beda." />
          <Dialog nama="Nisa" anak="Petaknya sama banyak." />
          <Dialog nama="Igil" anak="Luasnya sama." />
          <Dialog nama="Farhan" anak="Yang petaknya lebih banyak, luasnya lebih besar." />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Kebun 10 petak dan kebun 7 petak. Sebutkan yang lebih luas."
            periksa={(teks) => nilaiPetak(teks, 10, ["sepuluh"], LARANG_10)}
            petunjuk="Pilih jumlah petak yang lebih banyak."
            benar="10."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="2 baris × 6 petak" />}
            pertanyaan="2 baris, tiap baris 6 petak. Tulis luasnya."
            pesanSalah="Kalikan jumlah baris dengan petak pada tiap baris."
            bantuan="2 × 6 = 12."
            umpan="12."
            periksa={(teks) => nilaiPetak(teks, 12, ["dua belas"], LARANG_BELAS)}
            alias={["12", "dua belas"]}
            konteks="2 baris kali 6 petak = 12."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="Persegi dengan sisi 4. Kelilingnya..."
          visual={<Papan anak="sisi 4" />}
          pilihan={[
            { huruf: "A", teks: "8" },
            { huruf: "B", teks: "12" },
            { huruf: "C", teks: "16" },
            { huruf: "D", teks: "20" },
          ]}
          benar="C"
          umpan="4 × 4 = 16."
          salah="Kalikan sisi dengan 4."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan soal dengan hasilnya."
          baris={[
            { kiri: "persegi sisi 2", pilihan: PASANG_A, benar: "8" },
            { kiri: "panjang 5 lebar 1", pilihan: PASANG_A, benar: "12" },
            { kiri: "3 baris 3 petak", pilihan: PASANG_A, benar: "9" },
          ]}
          umpan="Keliling 8 dan 12. Luas 9 petak."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun langkah keliling panjang 4 dan lebar 3."
          acak={["14", "4 + 3", "kali 2"]}
          benar={["4 + 3", "kali 2", "14"]}
          umpan="4 + 3 = 7. 7 × 2 = 14."
          salah="Mulai dari menjumlahkan panjang dan lebar."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Persegi sisi 5, kelilingnya 20.", benar: true },
            { teks: "Persegi panjang 6 dan 2, kelilingnya 8.", benar: false },
            { teks: "4 petak luasnya 4.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 6 + 2 + 6 + 2 = 16."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="3 baris, tiap baris 5 petak. Luasnya..."
          visual={<Papan anak="3 × 5" />}
          pilihan={[
            { huruf: "A", teks: "8" },
            { huruf: "B", teks: "15" },
            { huruf: "C", teks: "30" },
            { huruf: "D", teks: "2" },
          ]}
          benar="B"
          umpan="3 × 5 = 15 petak."
          salah="Kalikan jumlah baris dengan petak pada tiap baris."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_KELILING.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📏"
        judul={kartu.judul}
        anak="Papan tali dan petak"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Empat sisi sama"
          src="/doodle-mtk/mtk-3-keliling-sub1.jpg"
          alt="Tali mengelilingi kebun persegi."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sisi dikalikan 4 untuk mendapat keliling persegi."]}
        >
          <PetaContoh
            pusat="Persegi"
            cabang={[
              { ikon: "4", judul: "Sisi", isi: "satu sisi" },
              { ikon: "×", judul: "Kali", isi: "empat sisi" },
              { ikon: "16", judul: "Hasil", isi: "4 × 4" },
            ]}
            kolom={["Sisi", "Hitung", "Keliling"]}
            baris={[
              ["4", "4 + 4 + 4 + 4", "16"],
              ["4", "4 × 4", "16"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Persegi dengan sisi 8. Sebutkan kelilingnya."
            periksa={(teks) => nilaiPetak(teks, 32, ["tiga puluh dua"], LARANG_32)}
            petunjuk="Kalikan sisi dengan 4."
            benar="32."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="sisi 9" />}
            pertanyaan="Persegi dengan sisi 9. Tulis kelilingnya."
            pesanSalah="Kalikan sisi dengan 4."
            bantuan="9 × 4 = 36."
            umpan="36."
            periksa={(teks) => nilaiPetak(teks, 36, ["tiga puluh enam"], LARANG_36)}
            alias={["36", "tiga puluh enam"]}
            konteks="Persegi sisi 9. Keliling 36."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Dua panjang, dua lebar"
          src="/doodle-mtk/mtk-3-keliling-sub2.jpg"
          alt="Kebun persegi panjang dengan tali di sekelilingnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlahkan panjang dan lebar, lalu kalikan 2."]}
        >
          <PetaContoh
            pusat="Panjang"
            cabang={[
              { ikon: "5", judul: "Panjang", isi: "sisi panjang" },
              { ikon: "3", judul: "Lebar", isi: "sisi pendek" },
              { ikon: "16", judul: "Hasil", isi: "5 + 3 + 5 + 3" },
            ]}
            kolom={["Bagian", "Angka", "Hitung"]}
            baris={[
              ["panjang", "5", "dua sisi"],
              ["lebar", "3", "dua sisi"],
              ["keliling", "16", "5 + 3 + 5 + 3"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Panjang 7, lebar 2. Sebutkan kelilingnya."
            periksa={(teks) => nilaiPetak(teks, 18, ["delapan belas"], LARANG_BELAS)}
            petunjuk="Jumlahkan dua panjang dan dua lebar."
            benar="18."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="6 dan 5" />}
            pertanyaan="Panjang 6, lebar 5. Tulis kelilingnya."
            pesanSalah="Jumlahkan dua panjang dan dua lebar."
            bantuan="6 + 5 + 6 + 5 = 22."
            umpan="22."
            periksa={(teks) => nilaiPetak(teks, 22, ["dua puluh dua"], LARANG_22)}
            alias={["22", "dua puluh dua"]}
            konteks="Panjang 6 lebar 5. Keliling 22."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Tali mengelilingi"
          src="/doodle-mtk/mtk-3-keliling-sub3.jpg"
          alt="Anak berjalan mengikuti tali di tepi kebun."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Setiap sisi yang dilalui tali dijumlahkan."]}
        >
          <PetaContoh
            pusat="Jumlah"
            cabang={[
              { ikon: "3", judul: "Atas", isi: "satu sisi" },
              { ikon: "+", judul: "Tambah", isi: "semua sisi" },
              { ikon: "12", judul: "Hasil", isi: "3 + 3 + 3 + 3" },
            ]}
            kolom={["Sisi", "Langkah", "Jumlah"]}
            baris={[
              ["1", "3", "3"],
              ["2", "3", "6"],
              ["4", "3", "12"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="8 + 2 + 8 + 2. Sebutkan jumlahnya."
            periksa={(teks) => nilaiPetak(teks, 20, ["dua puluh"], LARANG_20)}
            petunjuk="Jumlahkan keempat sisi."
            benar="20."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="9 + 6 + 9 + 6" />}
            pertanyaan="9 + 6 + 9 + 6. Tulis jumlahnya."
            pesanSalah="Jumlahkan keempat sisi."
            bantuan="9 + 6 = 15. 15 + 15 = 30."
            umpan="30."
            periksa={(teks) => nilaiPetak(teks, 30, ["tiga puluh"], LARANG_30)}
            alias={["30", "tiga puluh"]}
            konteks="9 + 6 + 9 + 6 = 30."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Petak di dalam"
          src="/doodle-mtk/mtk-3-keliling-sub4.jpg"
          alt="Petak warna tersusun di dalam tali kebun."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Luas didapat dengan menghitung petak di dalam tali."]}
        >
          <PetaContoh
            pusat="Petak"
            cabang={[
              { ikon: "2", judul: "Baris", isi: "dua baris" },
              { ikon: "4", judul: "Isi", isi: "petak tiap baris" },
              { ikon: "8", judul: "Luas", isi: "2 × 4" },
            ]}
            kolom={["Baris", "Petak", "Luas"]}
            baris={[
              ["1", "4", "4"],
              ["2", "4", "8"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="4 baris, tiap baris 4 petak. Sebutkan luasnya."
            periksa={(teks) => nilaiPetak(teks, 16, ["enam belas"], LARANG_BELAS)}
            petunjuk="Kalikan jumlah baris dengan petak pada tiap baris."
            benar="16."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="3 baris × 5 petak" />}
            pertanyaan="3 baris, tiap baris 5 petak. Tulis luasnya."
            pesanSalah="Kalikan jumlah baris dengan petak pada tiap baris."
            bantuan="3 × 5 = 15."
            umpan="15."
            periksa={(teks) => nilaiPetak(teks, 15, ["lima belas"], LARANG_BELAS)}
            alias={["15", "lima belas"]}
            konteks="3 baris kali 5 petak = 15."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Sama atau lebih luas"
          src="/doodle-mtk/mtk-3-keliling-sub5.jpg"
          alt="Dua kebun petak yang bentuknya berbeda."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bandingkan jumlah petak. Jumlah yang sama berarti luas yang sama."]}
        >
          <PetaContoh
            pusat="Banding"
            cabang={[
              { ikon: "6", judul: "Kiri", isi: "6 petak" },
              { ikon: "6", judul: "Kanan", isi: "6 petak" },
              { ikon: "=", judul: "Sama", isi: "luas sama" },
            ]}
            kolom={["Kebun", "Petak", "Luas"]}
            baris={[
              ["kiri", "6", "sama"],
              ["kanan", "6", "sama"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Kebun 10 petak dan kebun 7 petak. Sebutkan yang lebih luas."
            periksa={(teks) => nilaiPetak(teks, 10, ["sepuluh"], LARANG_10)}
            petunjuk="Pilih jumlah petak yang lebih banyak."
            benar="10."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="2 baris × 6 petak" />}
            pertanyaan="2 baris, tiap baris 6 petak. Tulis luasnya."
            pesanSalah="Kalikan jumlah baris dengan petak pada tiap baris."
            bantuan="2 × 6 = 12."
            umpan="12."
            periksa={(teks) => nilaiPetak(teks, 12, ["dua belas"], LARANG_BELAS)}
            alias={["12", "dua belas"]}
            konteks="2 baris kali 6 petak = 12."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="Panjang 9, lebar 1. Kelilingnya..."
          visual={<Papan anak="9 dan 1" />}
          pilihan={[
            { huruf: "A", teks: "10" },
            { huruf: "B", teks: "18" },
            { huruf: "C", teks: "20" },
            { huruf: "D", teks: "19" },
          ]}
          benar="C"
          umpan="9 + 1 + 9 + 1 = 20."
          salah="Jumlahkan dua panjang dan dua lebar."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="Pasangkan soal dengan hasilnya."
          baris={[
            { kiri: "persegi sisi 6", pilihan: PASANG_B, benar: "24" },
            { kiri: "panjang 4 lebar 2", pilihan: PASANG_B, benar: "12" },
            { kiri: "2 baris 2 petak", pilihan: PASANG_B, benar: "4" },
          ]}
          umpan="Keliling 24 dan 12. Luas 4 petak."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="Susun langkah keliling persegi sisi 5."
          acak={["20", "kali 4", "sisi 5"]}
          benar={["sisi 5", "kali 4", "20"]}
          umpan="5 × 4 = 20."
          salah="Mulai dari sisi persegi."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Persegi sisi 6, kelilingnya 24.", benar: true },
            { teks: "Luas dihitung dengan mengelilingi tali.", benar: false },
            { teks: "3 baris 3 petak, luasnya 9.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Luas dihitung dari petak di dalam."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="Halaman 8 petak dan halaman 5 petak. Yang lebih luas..."
          visual={<Papan anak="8  ·  5" />}
          pilihan={[
            { huruf: "A", teks: "5 petak" },
            { huruf: "B", teks: "8 petak" },
            { huruf: "C", teks: "Sama" },
            { huruf: "D", teks: "13 petak" },
          ]}
          benar="B"
          umpan="8 petak lebih banyak dari 5 petak."
          salah="Pilih jumlah petak yang lebih banyak."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_KELILING.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🌱🦉"
        judul={kartu.judul}
        anak="Sepuluh pos kebun"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-keliling-permainan.jpg"
        alt="Igil bertopi biru memegang stempel. Tali dan petak di meja, kertas masih kosong."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos kebun. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_KELILING}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_KELILING}
          penutup="Petak kebun tertutup. Igil menempelkan lencana penata."
          bunga="🌱📏🟩🦉"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_KELILING.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Penata Kebun" : skor >= 6 ? "🌱 Penata Muda" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Tali dan petakmu sudah tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penata kebun."
        : "Ayo hitung lagi bersama Igil, kamu pasti bisa!";
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
        src="/doodle-mtk/mtk-3-keliling-evaluasi.jpg"
        alt="Meja dengan pensil, stempel, dan kertas kosong. Igil bertopi biru di depan kebun berpagar tali."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Keliling persegi"
          visual={<Papan anak="sisi 8" />}
          pertanyaan="Persegi dengan sisi 8. Tulis kelilingnya."
          pesanSalah="Kalikan sisi dengan 4."
          bantuan="8 × 4 = 32."
          umpan="32."
          periksa={(teks) => nilaiPetak(teks, 32, ["tiga puluh dua"], LARANG_32)}
          alias={["32", "tiga puluh dua"]}
          konteks="Persegi sisi 8. Keliling 32."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Panjang 5, lebar 4. Kelilingnya..."
          visual={<Papan anak="5 dan 4" />}
          pilihan={[
            { huruf: "A", teks: "9" },
            { huruf: "B", teks: "20" },
            { huruf: "C", teks: "18" },
            { huruf: "D", teks: "16" },
          ]}
          benar="C"
          umpan="5 + 4 + 5 + 4 = 18."
          salah="Jumlahkan dua panjang dan dua lebar."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. 4 baris, tiap baris 3 petak. Sebutkan luasnya."
          periksa={(teks) => nilaiPetak(teks, 12, ["dua belas"], LARANG_BELAS)}
          petunjuk="Kalikan jumlah baris dengan petak pada tiap baris."
          benar="12."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Persegi dengan sisi 10. Kelilingnya..."
          visual={<Papan anak="sisi 10" />}
          pilihan={[
            { huruf: "A", teks: "20" },
            { huruf: "B", teks: "14" },
            { huruf: "C", teks: "40" },
            { huruf: "D", teks: "100" },
          ]}
          benar="C"
          umpan="10 × 4 = 40."
          salah="Kalikan sisi dengan 4."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan soal dengan hasilnya."
          baris={[
            { kiri: "persegi sisi 3", pilihan: PASANG_D, benar: "12" },
            { kiri: "panjang 8 lebar 1", pilihan: PASANG_D, benar: "18" },
            { kiri: "5 baris 2 petak", pilihan: PASANG_D, benar: "10" },
          ]}
          umpan="Keliling 12 dan 18. Luas 10 petak."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Keliling panjang"
          visual={<Papan anak="6 dan 4" />}
          pertanyaan="Panjang 6, lebar 4. Tulis kelilingnya."
          pesanSalah="Jumlahkan dua panjang dan dua lebar."
          bantuan="6 + 4 + 6 + 4 = 20."
          umpan="20."
          periksa={(teks) => nilaiPetak(teks, 20, ["dua puluh"], LARANG_20)}
          alias={["20", "dua puluh"]}
          konteks="Panjang 6 lebar 4. Keliling 20."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun langkah luas 3 baris dan 4 petak."
          acak={["12", "3 baris", "4 petak"]}
          benar={["3 baris", "4 petak", "12"]}
          umpan="3 × 4 = 12 petak."
          salah="Mulai dari jumlah baris."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Benar atau salah?"
          baris={[
            { teks: "Persegi sisi 7, kelilingnya 28.", benar: true },
            { teks: "Persegi panjang 9 dan 2, kelilingnya 11.", benar: false },
            { teks: "6 petak luasnya 6.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 9 + 2 + 9 + 2 = 22."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Panjang 10, lebar 5. Sebutkan kelilingnya."
          periksa={(teks) => nilaiPetak(teks, 30, ["tiga puluh"], LARANG_30)}
          petunjuk="Jumlahkan dua panjang dan dua lebar."
          benar="30."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kebun A punya 8 petak. Kebun B punya 9 petak. Yang lebih luas..."
          visual={<Papan anak="A 8  ·  B 9" />}
          pilihan={[
            { huruf: "A", teks: "Kebun A" },
            { huruf: "B", teks: "Kebun B" },
            { huruf: "C", teks: "Sama" },
            { huruf: "D", teks: "17 petak" },
          ]}
          benar="B"
          umpan="9 petak lebih banyak dari 8 petak."
          salah="Pilih kebun yang petaknya lebih banyak."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Keliling({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Keliling adalah tali di tepi bangun.",
    "Keliling persegi: sisi dikalikan 4.",
    "Keliling persegi panjang: dua panjang ditambah dua lebar.",
    "Luas adalah jumlah petak di dalam.",
    "Petak yang lebih banyak berarti luas yang lebih besar.",
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
          src: "/doodle-mtk/mtk-3-keliling-poin.jpg",
          alt: "Igil dan tiga anak di kebun memegang kartu kosong. Tali dan petak di atas meja.",
        }}
        cuplikan={cuplikanKalimat([
          "Keliling adalah tali di tepi. Persegi dikali 4. Persegi panjang menjumlahkan dua panjang dan dua lebar.",
          "Luas adalah petak di dalam.",
          "Yang petaknya lebih banyak, luasnya lebih besar.",
        ])}
        poin={poin}
        penutup="Hitung talinya, lalu hitung petaknya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
