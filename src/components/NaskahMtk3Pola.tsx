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
import { MISI_MTK3_POLA, TEMA_MTK3_POLA } from "@/lib/misi-mtk-3-pola";
import { MODUL_MTK3_POLA } from "@/lib/modul-resmi-mtk-3-pola";
import { nilaiGambar, nilaiPola } from "@/lib/nilai-mtk-3-pola";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_POLA.id;

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


const LANJUT_A = ["8", "10", "biru"];
const LANJUT_B = ["20", "8", "bintang"];
const LANJUT_D = ["13", "40", "bulan"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_POLA.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🔮🦉"
        judul="A. Taman Manik"
        anak="Nisa, Farhan, Cinta, dan Igil di taman manik"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Melanjutkan pola naik.",
          "Melanjutkan pola turun.",
          "Melanjutkan pola gambar.",
          "Membuat pola sendiri.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 1 — Pola naik"
          src="/doodle-mtk/mtk-3-pola-sub1.jpg"
          alt="Batu pijakan di taman, tumpukan manik yang makin tinggi. Igil bertopi biru bersama tiga anak."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pola naik menambah bilangan yang sama setiap langkah."]}
        >
          <Dialog nama="Igil" anak="Batu pijakan: 3, 6, 9, 12." />
          <Dialog nama="Farhan" anak="Selisihnya 3." />
          <Dialog nama="Nisa" anak="Jadi setiap langkah naik 3." />
          <Dialog nama="Cinta" anak="Berikutnya 15." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="4 – 8 – 12 – ⬜. Sebutkan angka berikutnya."
            periksa={(teks) => nilaiPola(teks, 16, ["enam belas"], ["puluh", "ratus"])}
            petunjuk="Cari selisihnya, lalu tambahkan."
            benar="16."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="5 → 10 → 15 → ⬜" />}
            pertanyaan="5 – 10 – 15 – ⬜. Tulis angka berikutnya."
            pesanSalah="Lihat berapa yang ditambahkan setiap langkah."
            bantuan="Naik 5. 15 + 5 = 20."
            umpan="20."
            periksa={(teks) => nilaiPola(teks, 20, ["dua puluh"], ["satu", "lima", "tiga", "empat", "enam", "tujuh", "delapan", "sembilan", "ratus", "belas"])}
            alias={["20", "dua puluh"]}
            konteks="5, 10, 15 naik 5. Berikutnya 20."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 2 — Pola turun"
          src="/doodle-mtk/mtk-3-pola-sub2.jpg"
          alt="Tumpukan manik yang makin pendek. Burung hantu dan dua anak di meja taman."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pola turun mengurangi bilangan yang sama setiap langkah."]}
        >
          <Dialog nama="Cinta" anak="Manikku 18, 15, 12." />
          <Dialog nama="Farhan" anak="Setiap langkah kurang 3." />
          <Dialog nama="Igil" anak="Itu pola turun. Berikutnya 9." />
          <Dialog nama="Nisa" anak="Selisihnya tetap, arahnya ke bawah." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="40 – 35 – 30 – ⬜. Sebutkan angka berikutnya."
            periksa={(teks) => nilaiPola(teks, 25, ["dua puluh lima"])}
            petunjuk="Cari selisihnya, lalu kurangkan."
            benar="25."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="24 → 20 → 16 → ⬜" />}
            pertanyaan="24 – 20 – 16 – ⬜. Tulis angka berikutnya."
            pesanSalah="Lihat berapa yang dikurangi setiap langkah."
            bantuan="Turun 4. 16 − 4 = 12."
            umpan="12."
            periksa={(teks) => nilaiPola(teks, 12, ["dua belas"], ["puluh", "ratus"])}
            alias={["12", "dua belas"]}
            konteks="24, 20, 16 turun 4. Berikutnya 12."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 3 — Pola berulang"
          src="/doodle-mtk/mtk-3-pola-sub3.jpg"
          alt="Gelang manik merah dan kuning berselang-seling. Ekor layang-layang dengan pita berulang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pola gambar mengulang kelompok yang sama."]}
        >
          <Dialog nama="Nisa" anak="Gelangku merah, kuning, merah, kuning." />
          <Dialog nama="Cinta" anak="Dua warna itu diulang." />
          <Dialog nama="Igil" anak="Berikutnya merah lagi." />
          <Dialog nama="Farhan" anak="Ekor layang-layang juga bisa begitu." />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Bintang, bulan, bintang, bulan, ⬜. Sebutkan gambar berikutnya."
            periksa={(teks) => nilaiGambar(teks, ["bintang"], ["bulan"])}
            petunjuk="Lihat dua gambar pertama, lalu ulangi."
            benar="Bintang."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="△ ○ □ △ ○ ⬜" />}
            pertanyaan="Segitiga, lingkaran, persegi, segitiga, lingkaran, ⬜. Tulis bentuk berikutnya."
            pesanSalah="Tiga bentuk itu diulang."
            bantuan="Kelompoknya segitiga, lingkaran, persegi. Berikutnya persegi."
            umpan="Persegi."
            periksa={(teks) => nilaiGambar(teks, ["persegi"], ["panjang", "lingkaran", "segitiga"])}
            alias={["persegi"]}
            konteks="Pola segitiga, lingkaran, persegi diulang. Berikutnya persegi."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 4 — Angka yang hilang"
          src="/doodle-mtk/mtk-3-pola-sub4.jpg"
          alt="Satu batu pijakan kosong di antara batu yang lain. Igil menunjuk celah itu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Cari selisih yang sama, lalu isi kotak yang kosong."]}
        >
          <Dialog nama="Farhan" anak="Polanya 7, kotak kosong, 11, 13." />
          <Dialog nama="Nisa" anak="Dari 11 ke 13 naik 2." />
          <Dialog nama="Igil" anak="Yang hilang 9." />
          <Dialog nama="Cinta" anak="7 lalu 9, baru 11." />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="3 – ⬜ – 9 – 12. Sebutkan angka yang hilang."
            periksa={(teks) => nilaiPola(teks, 6, ["enam"], ["belas", "puluh", "ratus", "ribu"])}
            petunjuk="Lihat selisih dua angka yang berdekatan."
            benar="6."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="10 → ⬜ → 30 → 40" />}
            pertanyaan="10 – ⬜ – 30 – 40. Tulis angka yang hilang."
            pesanSalah="Lihat selisih 30 dan 40."
            bantuan="Naik 10. 10 + 10 = 20."
            umpan="20."
            periksa={(teks) => nilaiPola(teks, 20, ["dua puluh"], ["satu", "lima", "tiga", "empat", "enam", "tujuh", "delapan", "sembilan", "ratus", "belas"])}
            alias={["20", "dua puluh"]}
            konteks="10, 20, 30, 40 naik 10. Yang hilang 20."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 5 — Pola sendiri"
          src="/doodle-mtk/mtk-3-pola-sub5.jpg"
          alt="Cinta merangkai gelang manik sendiri. Igil dan dua teman melihat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Tentukan aturannya dulu, lalu lanjutkan."]}
        >
          <Dialog nama="Cinta" anak="Polaku 1, 3, 5, 7." />
          <Dialog nama="Farhan" anak="Itu bilangan ganjil. Naik 2." />
          <Dialog nama="Igil" anak="Berikutnya 9." />
          <Dialog nama="Nisa" anak="Aku mau buat pola turun." />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Pola Farhan naik 6: 6 – 12 – 18 – ⬜. Sebutkan berikutnya."
            periksa={(teks) => nilaiPola(teks, 24, ["dua puluh empat"])}
            petunjuk="Tambahkan aturan polanya."
            benar="24."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="14 → 12 → 10 → ⬜" />}
            pertanyaan="Pola Nisa turun 2: 14 – 12 – 10 – ⬜. Tulis berikutnya."
            pesanSalah="Kurangi sesuai aturannya."
            bantuan="Turun 2. 10 − 2 = 8."
            umpan="8."
            periksa={(teks) => nilaiPola(teks, 8, ["delapan"], ["belas", "puluh", "ratus"])}
            alias={["8", "delapan"]}
            konteks="14, 12, 10 turun 2. Berikutnya 8."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="6 – 9 – 12 – 15 – ⬜. Berikutnya..."
          visual={<Papan anak="6 → 9 → 12 → 15 → ⬜" />}
          pilihan={[
            { huruf: "A", teks: "16" },
            { huruf: "B", teks: "18" },
            { huruf: "C", teks: "21" },
            { huruf: "D", teks: "15" },
          ]}
          benar="B"
          umpan="Naik 3. 15 + 3 = 18."
          salah="Cari selisih dua angka yang berdekatan."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan pola dengan lanjutnya."
          baris={[
            { kiri: "2, 4, 6, ⬜", pilihan: LANJUT_A, benar: "8" },
            { kiri: "25, 20, 15, ⬜", pilihan: LANJUT_A, benar: "10" },
            { kiri: "merah, biru, merah, ⬜", pilihan: LANJUT_A, benar: "biru" },
          ]}
          umpan="Naik 2 jadi 8. Turun 5 jadi 10. Berikutnya biru."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun pola naik 4 dari yang paling kecil."
          acak={["16", "4", "12", "8"]}
          benar={["4", "8", "12", "16"]}
          umpan="4, 8, 12, lalu 16."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "2, 4, 6, 8 naik 2.", benar: true },
            { teks: "10, 8, 6, 4 naik 2.", benar: false },
            { teks: "Merah, merah, biru, lalu diulang. Itu pola berulang.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 10, 8, 6, 4 turun 2."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="Hati, bintang, hati, bintang, ⬜. Berikutnya..."
          visual={<Papan anak="❤️ ⭐ ❤️ ⭐ ⬜" />}
          pilihan={[
            { huruf: "A", teks: "Bulan" },
            { huruf: "B", teks: "Hati" },
            { huruf: "C", teks: "Bintang" },
            { huruf: "D", teks: "Lingkaran" },
          ]}
          benar="B"
          umpan="Dua gambar diulang. Berikutnya hati."
          salah="Lihat gambar pertama dan ketiga."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_POLA.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🔢"
        judul={kartu.judul}
        anak="Papan naik, turun, dan ulang"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Aturan naik"
          src="/doodle-mtk/mtk-3-pola-sub1.jpg"
          alt="Batu pijakan yang makin jauh ke atas taman."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Tambahkan selisih yang sama pada angka terakhir."]}
        >
          <PetaContoh
            pusat="Naik 4"
            cabang={[
              { ikon: "1", judul: "Mulai", isi: "angka 1" },
              { ikon: "+", judul: "Tambah", isi: "selisih 4" },
              { ikon: "17", judul: "Berikutnya", isi: "13 + 4" },
            ]}
            kolom={["Langkah", "Angka", "Hitung"]}
            baris={[
              ["1", "1", "mulai"],
              ["2", "5", "1 + 4"],
              ["3", "9", "5 + 4"],
              ["4", "13", "9 + 4"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="7 – 14 – 21 – ⬜. Sebutkan angka berikutnya."
            periksa={(teks) => nilaiPola(teks, 28, ["dua puluh delapan"])}
            petunjuk="Cari selisihnya, lalu tambahkan."
            benar="28."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="3 → 6 → 9 → ⬜" />}
            pertanyaan="3 – 6 – 9 – ⬜. Tulis angka berikutnya."
            pesanSalah="Lihat berapa yang ditambahkan."
            bantuan="Naik 3. 9 + 3 = 12."
            umpan="12."
            periksa={(teks) => nilaiPola(teks, 12, ["dua belas"], ["puluh", "ratus"])}
            alias={["12", "dua belas"]}
            konteks="3, 6, 9 naik 3. Berikutnya 12."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Aturan turun"
          src="/doodle-mtk/mtk-3-pola-sub2.jpg"
          alt="Manik yang disusun makin sedikit."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kurangkan selisih yang sama dari angka terakhir."]}
        >
          <PetaContoh
            pusat="Turun 3"
            cabang={[
              { ikon: "22", judul: "Mulai", isi: "angka 22" },
              { ikon: "−", judul: "Kurang", isi: "selisih 3" },
              { ikon: "10", judul: "Berikutnya", isi: "13 − 3" },
            ]}
            kolom={["Langkah", "Angka", "Hitung"]}
            baris={[
              ["1", "22", "mulai"],
              ["2", "19", "22 − 3"],
              ["3", "16", "19 − 3"],
              ["4", "13", "16 − 3"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="50 – 40 – 30 – ⬜. Sebutkan angka berikutnya."
            periksa={(teks) => nilaiPola(teks, 20, ["dua puluh"], ["satu", "lima", "tiga", "empat", "enam", "tujuh", "delapan", "sembilan", "ratus", "belas"])}
            petunjuk="Cari selisihnya, lalu kurangkan."
            benar="20."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="18 → 15 → 12 → ⬜" />}
            pertanyaan="18 – 15 – 12 – ⬜. Tulis angka berikutnya."
            pesanSalah="Lihat berapa yang dikurangi."
            bantuan="Turun 3. 12 − 3 = 9."
            umpan="9."
            periksa={(teks) => nilaiPola(teks, 9, ["sembilan"], ["belas", "puluh", "ratus"])}
            alias={["9", "sembilan"]}
            konteks="18, 15, 12 turun 3. Berikutnya 9."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Gambar berulang"
          src="/doodle-mtk/mtk-3-pola-sub3.jpg"
          alt="Manik dua warna dan pita tiga warna yang berulang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Lihat kelompok pertama, lalu ulang dari awal."]}
        >
          <PetaContoh
            pusat="Ulang"
            cabang={[
              { ikon: "🔴", judul: "Dua warna", isi: "merah, biru" },
              { ikon: "🔺", judul: "Tiga bentuk", isi: "△ ○ □" },
              { ikon: "🔁", judul: "Kembali", isi: "ke gambar awal" },
            ]}
            kolom={["Urutan", "Gambar", "Kelompok"]}
            baris={[
              ["1", "merah", "awal"],
              ["2", "biru", "akhir"],
              ["3", "merah", "ulang"],
              ["4", "biru", "ulang"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Lingkaran, persegi, lingkaran, persegi. Sebutkan berikutnya."
            periksa={(teks) => nilaiGambar(teks, ["lingkaran"], ["persegi"])}
            petunjuk="Ulangi dua gambar pertama."
            benar="Lingkaran."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="kuning → hijau → biru → kuning → hijau → ⬜" />}
            pertanyaan="Kuning, hijau, biru, kuning, hijau, ⬜. Tulis warna berikutnya."
            pesanSalah="Tiga warna itu diulang."
            bantuan="Kelompoknya kuning, hijau, biru. Berikutnya biru."
            umpan="Biru."
            periksa={(teks) => nilaiGambar(teks, ["biru"], ["kuning", "hijau"])}
            alias={["biru"]}
            konteks="Kuning, hijau, biru diulang. Berikutnya biru."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Kotak kosong"
          src="/doodle-mtk/mtk-3-pola-sub4.jpg"
          alt="Satu manik hilang di tengah gelang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Selisih yang diketahui dipakai untuk mengisi kotak."]}
        >
          <PetaContoh
            pusat="Hilang"
            cabang={[
              { ikon: "4", judul: "Awal", isi: "angka 4" },
              { ikon: "?", judul: "Kosong", isi: "belum diisi" },
              { ikon: "8", judul: "Isi", isi: "4 + 4" },
            ]}
            kolom={["Posisi", "Angka", "Aturan"]}
            baris={[
              ["1", "4", "mulai"],
              ["2", "8", "naik 4"],
              ["3", "12", "naik 4"],
              ["4", "16", "naik 4"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="8 – ⬜ – 24 – 32. Sebutkan angka yang hilang."
            periksa={(teks) => nilaiPola(teks, 16, ["enam belas"], ["puluh", "ratus"])}
            petunjuk="Lihat selisih dua angka yang berdekatan."
            benar="16."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="15 → ⬜ → 9 → 6" />}
            pertanyaan="15 – ⬜ – 9 – 6. Tulis angka yang hilang."
            pesanSalah="Lihat selisih 9 dan 6."
            bantuan="Turun 3. 15 − 3 = 12."
            umpan="12."
            periksa={(teks) => nilaiPola(teks, 12, ["dua belas"], ["puluh", "ratus"])}
            alias={["12", "dua belas"]}
            konteks="15, 12, 9, 6 turun 3. Yang hilang 12."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Rancang aturan"
          src="/doodle-mtk/mtk-3-pola-sub5.jpg"
          alt="Anak memilih manik untuk gelang buatannya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sebut aturannya, lalu pakai aturan itu sampai akhir."]}
        >
          <PetaContoh
            pusat="Naik 10"
            cabang={[
              { ikon: "10", judul: "Mulai", isi: "angka 10" },
              { ikon: "+", judul: "Aturan", isi: "tambah 10" },
              { ikon: "50", judul: "Akhir", isi: "40 + 10" },
            ]}
            kolom={["Langkah", "Angka", "Hitung"]}
            baris={[
              ["1", "10", "mulai"],
              ["2", "20", "10 + 10"],
              ["3", "30", "20 + 10"],
              ["4", "40", "30 + 10"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Pola naik 9: 9 – 18 – 27 – ⬜. Sebutkan berikutnya."
            periksa={(teks) => nilaiPola(teks, 36, ["tiga puluh enam"])}
            petunjuk="Tambahkan aturan polanya."
            benar="36."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="30 → 24 → 18 → ⬜" />}
            pertanyaan="Pola turun 6: 30 – 24 – 18 – ⬜. Tulis berikutnya."
            pesanSalah="Kurangi sesuai aturannya."
            bantuan="Turun 6. 18 − 6 = 12."
            umpan="12."
            periksa={(teks) => nilaiPola(teks, 12, ["dua belas"], ["puluh", "ratus"])}
            alias={["12", "dua belas"]}
            konteks="30, 24, 18 turun 6. Berikutnya 12."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="11 – 13 – 15 – ⬜. Berikutnya..."
          visual={<Papan anak="11 → 13 → 15 → ⬜" />}
          pilihan={[
            { huruf: "A", teks: "16" },
            { huruf: "B", teks: "17" },
            { huruf: "C", teks: "18" },
            { huruf: "D", teks: "20" },
          ]}
          benar="B"
          umpan="Naik 2. 15 + 2 = 17."
          salah="Cari selisih dua angka yang berdekatan."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="Pasangkan pola dengan lanjutnya."
          baris={[
            { kiri: "5, 10, 15, ⬜", pilihan: LANJUT_B, benar: "20" },
            { kiri: "20, 16, 12, ⬜", pilihan: LANJUT_B, benar: "8" },
            { kiri: "segitiga, bintang, segitiga, ⬜", pilihan: LANJUT_B, benar: "bintang" },
          ]}
          umpan="Naik 5 jadi 20. Turun 4 jadi 8. Berikutnya bintang."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="Susun pola turun 3 dari yang paling besar."
          acak={["12", "21", "15", "18"]}
          benar={["21", "18", "15", "12"]}
          umpan="21, 18, 15, lalu 12."
          salah="Urutkan dari yang paling besar."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "1, 2, 4, 8 naik 2.", benar: false },
            { teks: "20, 18, 16, 14 turun 2.", benar: true },
            { teks: "Bintang, hati, bintang, hati. Berikutnya bintang.", benar: true },
          ]}
          umpan="Yang kedua dan ketiga benar. 1, 2, 4, 8 selisihnya berubah."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="100 – 90 – 80 – ⬜. Berikutnya..."
          visual={<Papan anak="100 → 90 → 80 → ⬜" />}
          pilihan={[
            { huruf: "A", teks: "60" },
            { huruf: "B", teks: "70" },
            { huruf: "C", teks: "85" },
            { huruf: "D", teks: "100" },
          ]}
          benar="B"
          umpan="Turun 10. 80 − 10 = 70."
          salah="Cari selisihnya, lalu kurangkan."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_POLA.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🔮🦉"
        judul={kartu.judul}
        anak="Sepuluh pos manik"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-pola-permainan.jpg"
        alt="Igil bertopi biru di meja kerajinan, memegang stempel. Mangkuk manik warna-warni di sampingnya."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos manik. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_POLA}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_POLA}
          penutup="Kotak manik tertutup. Igil menempelkan lencana perangkai."
          bunga="🔮⭐🔺🦉"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_POLA.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Perangkai Ahli" : skor >= 6 ? "🔮 Perangkai Muda" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Polamu rapi dan bisa dilanjutkan."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi perangkai ahli."
        : "Ayo cari aturannya lagi bersama Igil, kamu pasti bisa!";
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
        src="/doodle-mtk/mtk-3-pola-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan stempel. Burung hantu bertopi biru di tepi meja, mangkuk manik di belakang."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Pola naik"
          visual={<Papan anak="9 → 12 → 15 → 18 → ⬜" />}
          pertanyaan="9 – 12 – 15 – 18 – ⬜. Tulis angka berikutnya."
          pesanSalah="Cari selisihnya, lalu tambahkan."
          bantuan="Naik 3. 18 + 3 = 21."
          umpan="21."
          periksa={(teks) => nilaiPola(teks, 21, ["dua puluh satu"])}
          alias={["21", "dua puluh satu"]}
          konteks="9, 12, 15, 18 naik 3. Berikutnya 21."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. 20, 16, 12, 8. Aturannya..."
          visual={<Papan anak="20 → 16 → 12 → 8" />}
          pilihan={[
            { huruf: "A", teks: "Naik 4" },
            { huruf: "B", teks: "Turun 4" },
            { huruf: "C", teks: "Turun 2" },
            { huruf: "D", teks: "Naik 2" },
          ]}
          benar="B"
          umpan="20 − 16 = 4. Polanya turun 4."
          salah="Kurangkan angka di depan dengan angka di belakangnya."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Lingkaran, bintang, lingkaran, bintang. Sebutkan gambar berikutnya."
          periksa={(teks) => nilaiGambar(teks, ["lingkaran"], ["bintang"])}
          petunjuk="Ulangi dua gambar pertama."
          benar="Lingkaran."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. 4 – ⬜ – 12 – 16. Angka yang hilang..."
          visual={<Papan anak="4 → ⬜ → 12 → 16" />}
          pilihan={[
            { huruf: "A", teks: "6" },
            { huruf: "B", teks: "8" },
            { huruf: "C", teks: "10" },
            { huruf: "D", teks: "14" },
          ]}
          benar="B"
          umpan="Naik 4. 4 + 4 = 8."
          salah="Lihat selisih 12 dan 16."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan pola dengan lanjutnya."
          baris={[
            { kiri: "4, 7, 10, ⬜", pilihan: LANJUT_D, benar: "13" },
            { kiri: "70, 60, 50, ⬜", pilihan: LANJUT_D, benar: "40" },
            { kiri: "hati, bulan, hati, ⬜", pilihan: LANJUT_D, benar: "bulan" },
          ]}
          umpan="Naik 3 jadi 13. Turun 10 jadi 40. Berikutnya bulan."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Pola turun"
          visual={<Papan anak="45 → 40 → 35 → ⬜" />}
          pertanyaan="45 – 40 – 35 – ⬜. Tulis angka berikutnya."
          pesanSalah="Cari selisihnya, lalu kurangkan."
          bantuan="Turun 5. 35 − 5 = 30."
          umpan="30."
          periksa={(teks) => nilaiPola(teks, 30, ["tiga puluh"], ["satu", "dua", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "ratus", "belas"])}
          alias={["30", "tiga puluh"]}
          konteks="45, 40, 35 turun 5. Berikutnya 30."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun pola naik 3 dari yang paling kecil."
          acak={["8", "2", "11", "5"]}
          benar={["2", "5", "8", "11"]}
          umpan="2, 5, 8, lalu 11."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Benar atau salah?"
          baris={[
            { teks: "6, 12, 18, 24 naik 6.", benar: true },
            { teks: "Merah, biru, kuning, merah. Berikutnya biru.", benar: true },
            { teks: "15, 12, 9, 6 naik 3.", benar: false },
          ]}
          umpan="Yang pertama dan kedua benar. 15, 12, 9, 6 turun 3."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. 25 – 22 – 19 – ⬜. Sebutkan angka berikutnya."
          periksa={(teks) => nilaiPola(teks, 16, ["enam belas"], ["puluh", "ratus"])}
          petunjuk="Cari selisihnya, lalu kurangkan."
          benar="16."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kelereng: 2, 4, 6, 8. Berikutnya..."
          visual={<Papan anak="2 → 4 → 6 → 8 → ⬜" />}
          pilihan={[
            { huruf: "A", teks: "9" },
            { huruf: "B", teks: "10" },
            { huruf: "C", teks: "12" },
            { huruf: "D", teks: "16" },
          ]}
          benar="B"
          umpan="Naik 2. 8 + 2 = 10."
          salah="Cari selisihnya, lalu tambahkan."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Pola({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Pola naik menambah bilangan yang sama.",
    "Pola turun mengurangi bilangan yang sama.",
    "Pola gambar mengulang kelompoknya.",
    "Kotak kosong diisi dengan selisih yang sama.",
    "Pola sendiri dimulai dari aturan, lalu dilanjutkan.",
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
          src: "/doodle-mtk/mtk-3-pola-poin.jpg",
          alt: "Igil dan tiga anak di meja manik memegang kartu polos.",
        }}
        cuplikan={cuplikanKalimat([
          "Cari selisihnya. Naik berarti ditambah. Turun berarti dikurangi.",
          "Gambar yang berulang dilihat dari kelompoknya.",
          "Aturan yang kamu buat dipakai sampai akhir pola.",
        ])}
        poin={poin}
        penutup="Cari aturan, lalu lanjutkan."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
