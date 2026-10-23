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
import { MISI_MTK3_BANGUN, TEMA_MTK3_BANGUN } from "@/lib/misi-mtk-3-bangun";
import { MODUL_MTK3_BANGUN } from "@/lib/modul-resmi-mtk-3-bangun";
import { nilaiJenis, nilaiSisi } from "@/lib/nilai-mtk-3-bangun";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_BANGUN.id;

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


const PASANG_A = ["segitiga", "siku", "tumpul"];
const PASANG_B = ["3", "lancip", "segienam"];
const PASANG_D = ["6", "lancip", "segiempat"];

const LARANG_ANGKA = ["belas", "puluh", "ratus", "ribu", "segi"];
const LARANG_EMPAT = ["segitiga", "segi tiga", "segilima", "segi lima", "segienam", "segi enam", "lancip", "tumpul", "siku"];
const LARANG_TIGA = ["segiempat", "segi empat", "segilima", "segi lima", "segienam", "segi enam", "lancip", "tumpul", "siku"];
const LARANG_LIMA = ["segitiga", "segi tiga", "segiempat", "segi empat", "segienam", "segi enam", "lancip", "tumpul", "siku"];
const LARANG_ENAM = ["segitiga", "segi tiga", "segiempat", "segi empat", "segilima", "segi lima", "lancip", "tumpul", "siku"];
const LARANG_SIKU = ["lancip", "tumpul"];
const LARANG_LANCIP = ["siku", "tumpul"];
const LARANG_TUMPUL = ["siku", "lancip"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BANGUN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🔷🦉"
        judul="A. Sanggar Bingkai"
        anak="Nisa, Farhan, Cinta, dan Igil di sanggar bingkai"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Mengenal sisi dan ruas garis. 1 cm = 10 mm.",
          "Menamai segi banyak. Lingkaran tidak punya sudut.",
          "Membedakan sudut siku 90 derajat, lancip, dan tumpul.",
          "Mengenal garis tegak lurus dan garis sejajar.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 1 — Sisi pada bangun datar"
          src="/doodle-mtk/mtk-3-bangun-sub1.jpg"
          alt="Bingkai kayu di meja sanggar. Igil bertopi biru dan tiga anak menelusuri tepinya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sisi adalah ruas garis di tepi bangun. Ruas garis punya panjang yang tetap."]}
        >
          <Dialog nama="Igil" anak="Di ruang tamu ada benda seperti segitiga, persegi, dan lingkaran." />
          <Dialog nama="Nisa" anak="Bingkai foto ini punya 4 sisi dan 4 sudut." />
          <Dialog nama="Farhan" anak="Titik P dan Q hanya bisa disambung satu ruas garis lurus. Panjangnya 7 cm." />
          <Dialog nama="Cinta" anak="Di penggaris, 1 cm terbagi 10 mm. Jadi 1 cm sama dengan 10 mm." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Sisi</p>
          <PetaContoh
            pusat="Sisi"
            cabang={[
              { ikon: "📏", judul: "Ruas", isi: "panjang tetap" },
              { ikon: "7", judul: "Contoh", isi: "ruas 7 cm" },
              { ikon: "10", judul: "Kecil", isi: "1 cm = 10 mm" },
            ]}
            kolom={["Bangun", "Sisi", "Sudut"]}
            baris={[
              ["segitiga", "3", "3"],
              ["bingkai", "4", "4"],
              ["segienam", "6", "6"],
              ["ruas PQ", "7 cm", "tetap"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Segitiga punya berapa sisi? Sebutkan angkanya."
            periksa={(teks) => nilaiSisi(teks, 3, ["tiga"], LARANG_ANGKA)}
            petunjuk="Hitung garis yang mengelilinginya."
            benar="3."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="⬡" />}
            pertanyaan="Segienam punya berapa sudut? Tulis angkanya."
            pesanSalah="Hitung pojoknya satu per satu."
            bantuan="Segienam punya 6 sudut."
            umpan="6."
            periksa={(teks) => nilaiSisi(teks, 6, ["enam"], LARANG_ANGKA)}
            alias={["6", "enam"]}
            konteks="Segienam punya 6 sudut."
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Persegi punya berapa sudut? Sebutkan angkanya."
            periksa={(teks) => nilaiSisi(teks, 4, ["empat"], LARANG_ANGKA)}
            petunjuk="Hitung pojoknya."
            benar="4."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="⬠" />}
            pertanyaan="Segilima punya berapa sisi? Tulis angkanya."
            pesanSalah="Hitung garis yang mengelilinginya."
            bantuan="Segilima punya 5 sisi."
            umpan="5."
            periksa={(teks) => nilaiSisi(teks, 5, ["lima"], LARANG_ANGKA)}
            alias={["5", "lima"]}
            konteks="Segilima punya 5 sisi."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 2 — Bangun datar sederhana"
          src="/doodle-mtk/mtk-3-bangun-sub2.jpg"
          alt="Ubin segitiga, persegi, segilima, dan segienam berjajar di meja. Bingkai kosong di belakangnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Nama segi banyak mengikuti jumlah sisinya. Lingkaran dibatasi garis lengkung."]}
        >
          <Dialog nama="Cinta" anak="Tiga pensil yang disambung ujungnya jadi segitiga." />
          <Dialog nama="Igil" anak="Empat pensil bisa jadi persegi panjang. Empat sisi dan empat sudut." />
          <Dialog nama="Farhan" anak="Empat korek api sama panjang jadi persegi." />
          <Dialog nama="Nisa" anak="Lingkaran dibatasi garis lengkung. Ia tidak punya sudut." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Nama</p>
          <PetaContoh
            pusat="Nama"
            cabang={[
              { ikon: "3", judul: "Tiga", isi: "segitiga" },
              { ikon: "4", judul: "Empat", isi: "persegi" },
              { ikon: "◯", judul: "Lengkung", isi: "lingkaran" },
            ]}
            kolom={["Sisi", "Nama", "Contoh"]}
            baris={[
              ["3", "segitiga", "3 pensil"],
              ["4", "persegi panjang", "4 pensil"],
              ["4 sama", "persegi", "4 korek api"],
              ["lengkung", "lingkaran", "tanpa sudut"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Bangun ini punya 4 sisi. Sebutkan namanya."
            periksa={(teks) => nilaiJenis(teks, ["segiempat", "segi empat"], LARANG_EMPAT)}
            petunjuk="Lihat jumlah sisinya, lalu sebut namanya."
            benar="Segiempat."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="△" />}
            pertanyaan="Bangun ini punya 3 sisi. Tulis namanya."
            pesanSalah="Tiga sisi punya nama sendiri."
            bantuan="3 sisi namanya segitiga."
            umpan="Segitiga."
            periksa={(teks) => nilaiJenis(teks, ["segitiga", "segi tiga"], LARANG_TIGA)}
            alias={["segitiga", "segi tiga"]}
            konteks="3 sisi namanya segitiga."
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Bangun ini punya 6 sisi. Sebutkan namanya."
            periksa={(teks) => nilaiJenis(teks, ["segienam", "segi enam"], LARANG_ENAM)}
            petunjuk="Lihat jumlah sisinya, lalu sebut namanya."
            benar="Segienam."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="⬠" />}
            pertanyaan="Bangun ini punya 5 sisi. Tulis namanya."
            pesanSalah="Lima sisi punya nama sendiri."
            bantuan="5 sisi namanya segilima."
            umpan="Segilima."
            periksa={(teks) => nilaiJenis(teks, ["segilima", "segi lima"], LARANG_LIMA)}
            alias={["segilima", "segi lima"]}
            konteks="5 sisi namanya segilima."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 3 — Sudut siku dan garis tegak lurus"
          src="/doodle-mtk/mtk-3-bangun-sub3.jpg"
          alt="Igil memegang buku. Nisa mengangkat ubin persegi di depan bingkai kayu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sudut siku tepat 90 derajat. Dua garis yang bertemu siku disebut tegak lurus."]}
        >
          <Dialog nama="Igil" anak="Pojok sampul buku ini sudut siku, tepat 90 derajat." />
          <Dialog nama="Nisa" anak="Dua sisi yang bertemu siku disebut garis tegak lurus." />
          <Dialog nama="Farhan" anak="Ubin persegi punya 4 sudut siku." />
          <Dialog nama="Cinta" anak="Segitiga tidak bisa punya 3 sudut siku sekaligus." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Siku</p>
          <PetaContoh
            pusat="Siku"
            cabang={[
              { ikon: "📘", judul: "90°", isi: "pojok buku" },
              { ikon: "⊥", judul: "Tegak", isi: "bertemu siku" },
              { ikon: "□", judul: "Ubin", isi: "4 sudut siku" },
            ]}
            kolom={["Benda", "Sudut", "Jenis"]}
            baris={[
              ["buku", "90 derajat", "siku"],
              ["sisi buku", "bertemu siku", "tegak lurus"],
              ["ubin", "4 pojok", "siku"],
              ["segitiga", "bukan 3 siku", "tidak bisa"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Sudut pojok meja. Sebutkan jenisnya."
            periksa={(teks) => nilaiJenis(teks, ["siku"], LARANG_SIKU)}
            petunjuk="Bandingkan dengan pojok buku."
            benar="Siku-siku."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="□" />}
            pertanyaan="Sudut ubin persegi. Tulis jenisnya."
            pesanSalah="Tempelkan pada pojok buku."
            bantuan="Ubin persegi punya sudut siku-siku."
            umpan="Siku-siku."
            periksa={(teks) => nilaiJenis(teks, ["siku"], LARANG_SIKU)}
            alias={["siku", "siku-siku"]}
            konteks="Sudut ubin persegi adalah siku-siku."
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Sudut kotak pensil. Sebutkan jenisnya."
            periksa={(teks) => nilaiJenis(teks, ["siku"], LARANG_SIKU)}
            petunjuk="Bandingkan dengan pojok buku."
            benar="Siku-siku."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="📘 □" />}
            pertanyaan="Sudut kertas yang sama dengan pojok buku. Tulis jenisnya."
            pesanSalah="Lihat apakah pojoknya pas dengan buku."
            bantuan="Yang pas dengan buku disebut siku-siku."
            umpan="Siku-siku."
            periksa={(teks) => nilaiJenis(teks, ["siku"], LARANG_SIKU)}
            alias={["siku", "siku-siku"]}
            konteks="Sudut yang sama dengan pojok buku adalah siku-siku."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 4 — Sudut lancip"
          src="/doodle-mtk/mtk-3-bangun-sub4.jpg"
          alt="Cinta memegang bendera kertas yang runcing. Farhan memegang lipatan kertas yang lancip."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sudut lancip lebih kecil dari 90 derajat, jadi lebih sempit dari pojok buku."]}
        >
          <Dialog nama="Cinta" anak="Ujung benderaku sempit." />
          <Dialog nama="Farhan" anak="Lebih kecil dari pojok buku." />
          <Dialog nama="Igil" anak="Sudut 50 derajat masih di bawah 90. Itu lancip." />
          <Dialog nama="Nisa" anak="Yang lebih kecil dari sudut siku disebut lancip." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Lancip</p>
          <PetaContoh
            pusat="Lancip"
            cabang={[
              { ikon: "🚩", judul: "Runcing", isi: "ujung bendera" },
              { ikon: "50", judul: "Contoh", isi: "50 derajat" },
              { ikon: "<", judul: "Kecil", isi: "dari 90°" },
            ]}
            kolom={["Benda", "Ukuran", "Jenis"]}
            baris={[
              ["bendera", "lebih kecil", "lancip"],
              ["busur", "50 derajat", "lancip"],
              ["gunting", "runcing", "lancip"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Sudut ini lebih kecil dari pojok buku. Sebutkan jenisnya."
            periksa={(teks) => nilaiJenis(teks, ["lancip"], LARANG_LANCIP)}
            petunjuk="Bandingkan dengan pojok buku. Lihat yang lebih kecil."
            benar="Lancip."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="✂" />}
            pertanyaan="Ujung gunting yang runcing. Tulis jenis sudutnya."
            pesanSalah="Lihat apakah lebih kecil dari pojok buku."
            bantuan="Ujung yang runcing disebut lancip."
            umpan="Lancip."
            periksa={(teks) => nilaiJenis(teks, ["lancip"], LARANG_LANCIP)}
            alias={["lancip"]}
            konteks="Ujung gunting yang runcing adalah sudut lancip."
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Ujung panah kertas yang runcing. Sebutkan jenis sudutnya."
            periksa={(teks) => nilaiJenis(teks, ["lancip"], LARANG_LANCIP)}
            petunjuk="Bandingkan dengan pojok buku. Lihat yang lebih kecil."
            benar="Lancip."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="🍕" />}
            pertanyaan="Sudut irisan kecil. Tulis jenisnya."
            pesanSalah="Lihat apakah lebih kecil dari pojok buku."
            bantuan="Irisan yang sempit disebut lancip."
            umpan="Lancip."
            periksa={(teks) => nilaiJenis(teks, ["lancip"], LARANG_LANCIP)}
            alias={["lancip"]}
            konteks="Sudut irisan kecil adalah lancip."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 5 — Sudut tumpul dan garis sejajar"
          src="/doodle-mtk/mtk-3-bangun-sub5.jpg"
          alt="Farhan membuka kipas kertas lebar. Bingkai kosong tergantung di dinding."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sudut tumpul lebih besar dari 90 derajat dan lebih kecil dari 180 derajat. Garis sejajar tidak pernah bertemu."]}
        >
          <Dialog nama="Farhan" anak="Kipas ini terbuka lebar. Sudutnya tumpul." />
          <Dialog nama="Nisa" anak="Sudut lurus tepat 180 derajat. Itu dua kali sudut siku." />
          <Dialog nama="Igil" anak="Sisi atas dan sisi bawah bingkai sejajar. Jaraknya tetap, tidak pernah bertemu." />
          <Dialog nama="Cinta" anak="Di buku, garis AB sejajar CD. Jarak antar petaknya sama." />
          <p className="pt-2 text-sm font-black uppercase tracking-wide text-[#1C01A5]">Infografis: Tumpul dan sejajar</p>
          <PetaContoh
            pusat="Garis"
            cabang={[
              { ikon: ">", judul: "Tumpul", isi: "lebih dari 90°" },
              { ikon: "—", judul: "Lurus", isi: "180 derajat" },
              { ikon: "∥", judul: "Sejajar", isi: "jarak tetap" },
            ]}
            kolom={["Benda", "Ukuran", "Jenis"]}
            baris={[
              ["kipas", "lebih dari 90", "tumpul"],
              ["garis datar", "180 derajat", "lurus"],
              ["sisi bingkai", "jarak tetap", "sejajar"],
              ["petak 1", "jarak sama", "sejajar"],
            ]}
          />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Sudut ini lebih besar dari pojok buku. Sebutkan jenisnya."
            periksa={(teks) => nilaiJenis(teks, ["tumpul"], LARANG_TUMPUL)}
            petunjuk="Bandingkan dengan pojok buku. Lihat yang lebih besar."
            benar="Tumpul."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="🚪" />}
            pertanyaan="Bukaan pintu yang lebar. Tulis jenis sudutnya."
            pesanSalah="Lihat apakah lebih besar dari pojok buku."
            bantuan="Sudut yang lebih besar disebut tumpul."
            umpan="Tumpul."
            periksa={(teks) => nilaiJenis(teks, ["tumpul"], LARANG_TUMPUL)}
            alias={["tumpul"]}
            konteks="Bukaan pintu yang lebar adalah sudut tumpul."
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Sudut atap yang melebar. Sebutkan jenisnya."
            periksa={(teks) => nilaiJenis(teks, ["tumpul"], LARANG_TUMPUL)}
            petunjuk="Bandingkan dengan pojok buku. Lihat yang lebih besar."
            benar="Tumpul."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="▭" />}
            pertanyaan="Sudut pagar yang terbuka lebar. Tulis jenisnya."
            pesanSalah="Lihat apakah lebih besar dari pojok buku."
            bantuan="Sudut yang lebih besar disebut tumpul."
            umpan="Tumpul."
            periksa={(teks) => nilaiJenis(teks, ["tumpul"], LARANG_TUMPUL)}
            alias={["tumpul"]}
            konteks="Sudut pagar yang terbuka lebar adalah tumpul."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="Bangun dengan 6 sisi disebut..."
          visual={<Papan anak="⬡" />}
          pilihan={[
            { huruf: "A", teks: "Segitiga" },
            { huruf: "B", teks: "Segiempat" },
            { huruf: "C", teks: "Segienam" },
            { huruf: "D", teks: "Segilima" },
          ]}
          benar="C"
          umpan="6 sisi namanya segienam."
          salah="Cocokkan jumlah sisi dengan namanya."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan ciri dengan namanya."
          baris={[
            { kiri: "3 sisi", pilihan: PASANG_A, benar: "segitiga" },
            { kiri: "pojok buku", pilihan: PASANG_A, benar: "siku" },
            { kiri: "lebih besar dari siku", pilihan: PASANG_A, benar: "tumpul" },
          ]}
          umpan="3 sisi segitiga. Pojok buku siku. Yang lebih besar tumpul."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun dari jumlah sisi yang paling sedikit."
          acak={["segienam", "segitiga", "segilima", "segiempat"]}
          benar={["segitiga", "segiempat", "segilima", "segienam"]}
          umpan="3, 4, 5, lalu 6 sisi."
          salah="Mulai dari yang sisinya paling sedikit."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Segitiga punya 3 sudut.", benar: true },
            { teks: "Sudut lancip lebih besar dari sudut siku.", benar: false },
            { teks: "Segilima punya 5 sisi.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Lancip lebih kecil dari siku."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="Sudut yang lebih kecil dari pojok meja..."
          visual={<Papan anak="📐" />}
          pilihan={[
            { huruf: "A", teks: "Tumpul" },
            { huruf: "B", teks: "Lancip" },
            { huruf: "C", teks: "Siku-siku" },
            { huruf: "D", teks: "Lurus" },
          ]}
          benar="B"
          umpan="Yang lebih kecil dari siku disebut lancip."
          salah="Bandingkan dengan pojok buku."
        />
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="Segiempat punya sudut..."
          visual={<Papan anak="□" />}
          pilihan={[
            { huruf: "A", teks: "3" },
            { huruf: "B", teks: "4" },
            { huruf: "C", teks: "5" },
            { huruf: "D", teks: "6" },
          ]}
          benar="B"
          umpan="Segiempat punya 4 sudut."
          salah="Hitung pojoknya."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="Pasangkan ciri dengan jawabannya."
          baris={[
            { kiri: "sudut segitiga", pilihan: PASANG_B, benar: "3" },
            { kiri: "lebih kecil dari siku", pilihan: PASANG_B, benar: "lancip" },
            { kiri: "6 sisi", pilihan: PASANG_B, benar: "segienam" },
          ]}
          umpan="Segitiga 3 sudut. Yang lebih kecil lancip. 6 sisi segienam."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="Susun dari sudut yang paling kecil."
          acak={["tumpul", "lancip", "siku"]}
          benar={["lancip", "siku", "tumpul"]}
          umpan="Lancip, siku, lalu tumpul."
          salah="Mulai dari yang paling sempit."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Lingkaran punya sisi lurus.", benar: false },
            { teks: "Pojok buku adalah sudut siku.", benar: true },
            { teks: "Segiempat punya 5 sudut.", benar: false },
          ]}
          umpan="Yang kedua benar. Lingkaran tidak punya sisi lurus. Segiempat punya 4 sudut."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="Cinta memegang ubin 4 sisi. Namanya..."
          visual={<Papan anak="□" />}
          pilihan={[
            { huruf: "A", teks: "Segilima" },
            { huruf: "B", teks: "Segitiga" },
            { huruf: "C", teks: "Segiempat" },
            { huruf: "D", teks: "Segienam" },
          ]}
          benar="C"
          umpan="4 sisi namanya segiempat."
          salah="Cocokkan jumlah sisi dengan namanya."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BANGUN.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🔷🦉"
        judul={kartu.judul}
        anak="Sepuluh pos bingkai"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-bangun-permainan.jpg"
        alt="Igil bertopi biru memegang stempel di meja bingkai. Kertas di sampingnya masih kosong."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos bingkai. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_BANGUN}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_BANGUN}
          penutup="Kotak bingkai tertutup. Igil menempelkan lencana pengamat."
          bunga="🔷🔺📐🦉"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_BANGUN.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Pengamat Bingkai" : skor >= 6 ? "🔷 Pengamat Muda" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Sisi dan sudutmu sudah tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi pengamat bingkai."
        : "Ayo bandingkan lagi dengan pojok buku bersama Igil, kamu pasti bisa!";
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
        src="/doodle-mtk/mtk-3-bangun-evaluasi.jpg"
        alt="Meja dengan pensil, stempel, dan kertas kosong. Igil bertopi biru di depan bingkai warna-warni."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Sudut segilima"
          visual={<Papan anak="⬠" />}
          pertanyaan="Segilima punya berapa sudut? Tulis angkanya."
          pesanSalah="Hitung pojoknya."
          bantuan="Segilima punya 5 sudut."
          umpan="5."
          periksa={(teks) => nilaiSisi(teks, 5, ["lima"], LARANG_ANGKA)}
          alias={["5", "lima"]}
          konteks="Segilima punya 5 sudut."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Sudut sampul buku adalah..."
          visual={<Papan anak="📘" />}
          pilihan={[
            { huruf: "A", teks: "Lancip" },
            { huruf: "B", teks: "Tumpul" },
            { huruf: "C", teks: "Siku-siku" },
            { huruf: "D", teks: "Lurus" },
          ]}
          benar="C"
          umpan="Pojok buku adalah sudut siku-siku."
          salah="Lihat pojok sampulnya."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Bangun dengan 3 sisi. Sebutkan namanya."
          periksa={(teks) => nilaiJenis(teks, ["segitiga", "segi tiga"], LARANG_TIGA)}
          petunjuk="Lihat jumlah sisinya, lalu sebut namanya."
          benar="Segitiga."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Sudut yang lebih besar dari siku..."
          visual={<Papan anak=">" />}
          pilihan={[
            { huruf: "A", teks: "Lancip" },
            { huruf: "B", teks: "Tumpul" },
            { huruf: "C", teks: "Siku-siku" },
            { huruf: "D", teks: "Sama" },
          ]}
          benar="B"
          umpan="Yang lebih besar dari siku disebut tumpul."
          salah="Bandingkan dengan pojok buku."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan ciri dengan jawabannya."
          baris={[
            { kiri: "sudut segienam", pilihan: PASANG_D, benar: "6" },
            { kiri: "ujung runcing", pilihan: PASANG_D, benar: "lancip" },
            { kiri: "4 sisi", pilihan: PASANG_D, benar: "segiempat" },
          ]}
          umpan="Segienam 6 sudut. Ujung runcing lancip. 4 sisi segiempat."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Sudut lebar"
          visual={<Papan anak="🪭" />}
          pertanyaan="Sudut ini lebih besar dari pojok buku. Tulis jenisnya."
          pesanSalah="Lihat apakah lebih besar dari pojok buku."
          bantuan="Yang lebih besar disebut tumpul."
          umpan="Tumpul."
          periksa={(teks) => nilaiJenis(teks, ["tumpul"], LARANG_TUMPUL)}
          alias={["tumpul"]}
          konteks="Sudut yang lebih besar dari pojok buku adalah tumpul."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun langkah membandingkan sudut."
          acak={["sebut jenisnya", "tempel pada buku", "lihat ukurannya"]}
          benar={["tempel pada buku", "lihat ukurannya", "sebut jenisnya"]}
          umpan="Tempel dulu, lihat ukurannya, lalu sebut jenisnya."
          salah="Mulai dengan menempel pada buku."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Benar atau salah?"
          baris={[
            { teks: "Segienam punya 6 sudut.", benar: true },
            { teks: "Sudut tumpul lebih kecil dari siku.", benar: false },
            { teks: "Persegi punya 4 sisi.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Tumpul lebih besar dari siku."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Segitiga punya berapa sisi? Sebutkan angkanya."
          periksa={(teks) => nilaiSisi(teks, 3, ["tiga"], LARANG_ANGKA)}
          petunjuk="Hitung garis yang mengelilinginya."
          benar="3."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Nisa punya bingkai 4 sudut. Farhan punya ubin 5 sisi. Yang segilima..."
          visual={<Papan anak="□  ⬠" />}
          pilihan={[
            { huruf: "A", teks: "Bingkai Nisa" },
            { huruf: "B", teks: "Ubin Farhan" },
            { huruf: "C", teks: "Keduanya" },
            { huruf: "D", teks: "Tidak ada" },
          ]}
          benar="B"
          umpan="5 sisi namanya segilima. Itu ubin Farhan."
          salah="Lihat yang sisinya 5."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Bangun({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Ruas garis punya panjang tetap. Contohnya 7 cm. 1 cm = 10 mm.",
    "Segitiga 3 pensil. Persegi panjang 4 pensil. Persegi 4 korek api sama panjang. Lingkaran tanpa sudut.",
    "Sudut siku tepat 90 derajat. Dua garis yang bertemu siku disebut tegak lurus.",
    "Sudut lancip lebih kecil dari 90 derajat. Contohnya 50 derajat.",
    "Sudut tumpul lebih besar dari 90 derajat. Garis sejajar jaraknya tetap dan tidak pernah bertemu.",
  ];
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{
          src: "/doodle-mtk/mtk-3-bangun-poin.jpg",
          alt: "Igil dan tiga anak di sanggar bingkai memegang kartu kosong.",
        }}
        cuplikan={cuplikanKalimat([
          "Ruas garis punya panjang tetap. Satu sentimeter sama dengan 10 milimeter.",
          "Sudut siku tepat 90 derajat. Garis yang bertemu siku disebut tegak lurus.",
          "Lancip lebih kecil dari siku. Tumpul lebih besar. Garis sejajar tidak pernah bertemu.",
        ])}
        poin={poin}
        penutup="Hitung sisinya, lalu bandingkan sudutnya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
