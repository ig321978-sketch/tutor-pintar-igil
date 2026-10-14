"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import PetaContoh from "@/components/PetaContoh";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK3_PEMBAGIAN, TEMA_MTK3_PEMBAGIAN } from "@/lib/misi-mtk-3-pembagian";
import { MODUL_MTK3_PEMBAGIAN } from "@/lib/modul-resmi-mtk-3-pembagian";
import {
  bagiSisa,
  berapaKali,
  duaBagi,
  habisBagi,
  kalimatBagi,
  salahSatuBagi,
  ucapBagi,
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

function Gelas({ jumlah, isi, ikon = "🍧" }: { jumlah: number; isi: number; ikon?: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-2" aria-hidden>
      {Array.from({ length: jumlah }, (_, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 rounded-2xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-200"
        >
          <span className="text-xl">{ikon}</span>
          {isi}
        </span>
      ))}
    </div>
  );
}

const PASANGAN_A = ["4", "3", "9", "7"];
const PASANGAN_B = ["6", "4", "7", "9"];
const PASANGAN_D = ["5", "8", "7", "9"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PEMBAGIAN.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🍧🦉"
        judul={kartu.judul}
        anak="Nisa, Farhan, Cinta, dan Igil di stan es lilin"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: membagi sama banyak, mengurangi berulang, mengenal sisa, dan membalik perkalian.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Pembagian sama banyak"
          src="/doodle-mtk/mtk-3-pembagian-sub1.jpg"
          alt="Dua belas es lilin dibagi ke empat gelas di lapangan sekolah. Igil mengawasi."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bagi sama banyak. Jumlah benda dibagi jumlah penerima."]}
        >
          <Dialog nama="Nisa" anak="Ada 12 es lilin. Temannya 4 orang." />
          <Dialog nama="Farhan" anak="Satu-satu, sampai rata." />
          <Dialog nama="Cinta" anak="Tiap gelas dapat 3. 12 ÷ 4 = 3." />
          <Dialog nama="Igil" anak="Pembagian membuat bagiannya sama." />
          <Gelas jumlah={4} isi={3} />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="15 es lilin untuk 5 teman. Ucapkan bentuk baginya dan hasilnya."
            periksa={(teks) => ucapBagi(teks, "15", "lima belas", "5", "lima", "3", "tiga")}
            petunjuk="Sebutkan jumlah es, jumlah teman, lalu hasilnya."
            benar="15 ÷ 5 = 3."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Bagi rata"
            pertanyaan="Ada 18 es lilin untuk 6 gelas. Tulis kalimat baginya."
            pesanSalah="Jumlah es dibagi jumlah gelas."
            bantuan="18 ÷ 6 = 3."
            umpan="Tiap gelas berisi 3."
            periksa={(teks) => kalimatBagi(teks, "18", "6", "3")}
            alias={["18", "6", "3"]}
            konteks="18 ÷ 6 = 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Pengurangan berulang"
          src="/doodle-mtk/mtk-3-pembagian-sub2.jpg"
          alt="Tumpukan es lilin berkurang sedikit demi sedikit sampai habis."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kurangi bilangan yang sama terus, sampai habis. Banyak kurangan itu hasil bagi."]}
        >
          <Dialog nama="Nisa" anak="Ada 20 es lilin. Setiap teman mengambil 4." />
          <Dialog nama="Farhan" anak="20 − 4 = 16. 16 − 4 = 12. 12 − 4 = 8." />
          <Dialog nama="Cinta" anak="8 − 4 = 4. 4 − 4 = 0. Lima kali." />
          <Dialog nama="Igil" anak="20 ÷ 4 = 5." />
          <Papan anak={"20 − 4 − 4 − 4 − 4 − 4 = 0"} />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="18 dikurangi 6 terus sampai habis. Ucapkan berapa kali."
            periksa={(teks) => berapaKali(teks, "3", "tiga") || ucapBagi(teks, "18", "delapan belas", "6", "enam", "3", "tiga")}
            petunjuk="Sebutkan berapa kali pengurangannya."
            benar="Tiga kali. 18 ÷ 6 = 3."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Kurangi sampai habis"
            visual={<Papan anak={"24 − 8, terus sampai habis"} />}
            pertanyaan="Tulis kalimat baginya."
            pesanSalah="Hitung berapa kali 8 dikurangi dari 24."
            bantuan="24 − 8 = 16, 16 − 8 = 8, 8 − 8 = 0. Tiga kali. 24 ÷ 8 = 3."
            umpan="24 ÷ 8 = 3."
            periksa={(teks) => kalimatBagi(teks, "24", "8", "3")}
            alias={["24", "8", "3"]}
            konteks="24 ÷ 8 = 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Pembagian tanpa sisa"
          src="/doodle-mtk/mtk-3-pembagian-sub3.jpg"
          alt="Dua puluh empat es lilin habis masuk ke delapan gelas. Tidak ada yang tersisa."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kalau habis, tidak ada sisa. Cek dengan perkalian."]}
        >
          <Dialog nama="Nisa" anak="24 es lilin untuk 8 gelas." />
          <Dialog nama="Farhan" anak="8 × 3 = 24." />
          <Dialog nama="Cinta" anak="24 ÷ 8 = 3. Habis." />
          <Dialog nama="Igil" anak="Tidak ada yang tertinggal." />
          <Gelas jumlah={8} isi={3} />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="36 ÷ 9. Ucapkan hasilnya, lalu katakan habis atau ada sisa."
            periksa={(teks) => habisBagi(teks, "4", "empat")}
            petunjuk="Sebutkan hasilnya, lalu habis atau ada sisa."
            benar="Hasilnya 4. Habis."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Cek dengan kali"
            visual={<Papan anak={"28 ÷ 7"} />}
            pertanyaan="Tulis kalimat baginya."
            pesanSalah="Cari angka yang dikali 7 hasilnya 28."
            bantuan="7 × 4 = 28. Jadi 28 ÷ 7 = 4."
            umpan="28 ÷ 7 = 4. Habis."
            periksa={(teks) => kalimatBagi(teks, "28", "7", "4")}
            alias={["28", "7", "4"]}
            konteks="28 ÷ 7 = 4."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Pembagian dengan sisa"
          src="/doodle-mtk/mtk-3-pembagian-sub4.jpg"
          alt="Tujuh belas es lilin diisi ke gelas berisi lima. Dua es lilin tertinggal."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sisa adalah yang tidak cukup untuk satu bagian lagi. Sisa harus lebih kecil dari pembagi."]}
        >
          <Dialog nama="Nisa" anak="17 es lilin. Tiap gelas diisi 5." />
          <Dialog nama="Farhan" anak="5 × 3 = 15. Masih kurang 2 dari 17." />
          <Dialog nama="Cinta" anak="17 ÷ 5 = 3 sisa 2." />
          <Dialog nama="Igil" anak="Sisa 2 lebih kecil dari 5. Tidak cukup satu gelas lagi." />
          <Papan anak={"17 ÷ 5 = 3 sisa 2"} />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="23 ÷ 4. Ucapkan hasilnya dan sisanya."
            periksa={(teks) => bagiSisa(teks, "5", "3", "lima", "tiga")}
            petunjuk="Sebutkan hasil bagi, lalu sisanya."
            benar="5 sisa 3."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Tulis sisa"
            visual={<Papan anak={"19 ÷ 6"} />}
            pertanyaan="Tulis hasil dan sisanya."
            pesanSalah="Cari perkalian 6 yang paling dekat di bawah 19."
            bantuan="6 × 3 = 18. 19 − 18 = 1. Jadi 3 sisa 1."
            umpan="19 ÷ 6 = 3 sisa 1."
            periksa={(teks) => bagiSisa(teks, "3", "1", "tiga", "satu")}
            alias={["3", "1", "sisa"]}
            konteks="19 ÷ 6 = 3 sisa 1."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Hubungan perkalian dan pembagian"
          src="/doodle-mtk/mtk-3-pembagian-sub5.jpg"
          alt="Satu kartu kali dibalik menjadi dua kartu bagi. Igil menunjuk keduanya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Satu perkalian bisa dibalik jadi dua pembagian."]}
        >
          <Dialog nama="Nisa" anak="7 × 6 = 42." />
          <Dialog nama="Farhan" anak="Maka 42 ÷ 7 = 6." />
          <Dialog nama="Cinta" anak="Dan 42 ÷ 6 = 7." />
          <Dialog nama="Igil" anak="Tiga bilangan itu satu keluarga." />
          <Papan anak={"7 × 6 = 42\n42 ÷ 7 = 6\n42 ÷ 6 = 7"} />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="8 × 5 = 40. Ucapkan satu kalimat baginya."
            periksa={(teks) =>
              salahSatuBagi(teks, [
                ["40", "empat puluh", "8", "delapan", "5", "lima"],
                ["40", "empat puluh", "5", "lima", "8", "delapan"],
              ])
            }
            petunjuk="Balik perkalian itu menjadi pembagian."
            benar="40 ÷ 8 = 5, atau 40 ÷ 5 = 8."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Dua kalimat bagi"
            visual={<Papan anak={"9 × 4 = 36"} />}
            pertanyaan="Tulis dua kalimat bagi dari perkalian itu."
            pesanSalah="Balik kedua bilangan yang dikali."
            bantuan="36 ÷ 9 = 4 dan 36 ÷ 4 = 9."
            umpan="Dua kalimat itu satu keluarga dengan 9 × 4."
            periksa={(teks) => duaBagi(teks, "36", "9", "4")}
            alias={["36", "9", "4"]}
            konteks="36 ÷ 9 = 4 dan 36 ÷ 4 = 9."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. 18 es lilin dibagi ke 3 kotak. Isi tiap kotak..."
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "7" },
            { huruf: "D", teks: "9" },
          ]}
          benar="B"
          salah="18 dibagi 3."
          umpan="18 ÷ 3 = 6."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan pembagian dengan hasilnya."
          baris={[
            { kiri: "16 ÷ 4", pilihan: PASANGAN_A, benar: "4" },
            { kiri: "21 ÷ 7", pilihan: PASANGAN_A, benar: "3" },
            { kiri: "27 ÷ 3", pilihan: PASANGAN_A, benar: "9" },
            { kiri: "35 ÷ 5", pilihan: PASANGAN_A, benar: "7" },
          ]}
          umpan="4, 3, 9, dan 7."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Hitung 36 ÷ 4, 24 ÷ 8, 28 ÷ 4, dan 30 ÷ 5. Susun hasilnya dari yang kecil."
          acak={["7", "3", "9", "6"]}
          benar={["3", "6", "7", "9"]}
          umpan="3, 6, 7, 9."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "18 ÷ 3 = 6.", benar: true },
            { teks: "25 ÷ 4 = 6 sisa 1.", benar: true },
            { teks: "20 ÷ 6 = 4 sisa 2.", benar: false },
          ]}
          umpan="Dua yang pertama benar. 20 ÷ 6 = 3 sisa 2."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Mana yang hasilnya bukan 5?"
          pilihan={[
            { huruf: "A", teks: "15 ÷ 3" },
            { huruf: "B", teks: "20 ÷ 4" },
            { huruf: "C", teks: "40 ÷ 8" },
            { huruf: "D", teks: "24 ÷ 6" },
          ]}
          benar="D"
          salah="Hitung satu per satu."
          umpan="15 ÷ 3, 20 ÷ 4, dan 40 ÷ 8 sama dengan 5. 24 ÷ 6 = 4."
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
        ikon="📊🦉"
        judul={kartu.judul}
        anak="Peta es lilin · contoh dan cara"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Sama banyak"
          src="/doodle-mtk/mtk-3-pembagian-sub1.jpg"
          alt="Empat gelas es lilin berisi jumlah yang sama."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bagi jumlah benda dengan jumlah wadah. Itulah isi tiap wadah."]}
        >
          <PetaContoh
            pusat="20 ÷ 4"
            cabang={[
              { ikon: "🍧", judul: "20", isi: "es lilin" },
              { ikon: "🥤", judul: "4", isi: "gelas" },
              { ikon: "⭐", judul: "Tiap gelas", isi: "5" },
            ]}
            kolom={["Benda", "Wadah", "Isi"]}
            baris={[["20 es lilin", "4 gelas", "5"]]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="14 es lilin untuk 2 gelas. Ucapkan bentuk baginya dan hasilnya."
            periksa={(teks) => ucapBagi(teks, "14", "empat belas", "2", "dua", "7", "tujuh")}
            petunjuk="Sebutkan jumlah es, jumlah gelas, lalu hasilnya."
            benar="14 ÷ 2 = 7."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak={"27 ÷ 9"} />}
            pertanyaan="Tulis kalimat baginya."
            pesanSalah="Cari 9 dikali berapa yang hasilnya 27."
            bantuan="9 × 3 = 27. Jadi 27 ÷ 9 = 3."
            umpan="27 ÷ 9 = 3."
            periksa={(teks) => kalimatBagi(teks, "27", "9", "3")}
            alias={["27", "9", "3"]}
            konteks="27 ÷ 9 = 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Pengurangan berulang"
          src="/doodle-mtk/mtk-3-pembagian-sub2.jpg"
          alt="Lima belas es lilin dikurangi lima, tiga kali, sampai habis."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Hitung berapa kali bilangan itu dikurangi sampai nol."]}
        >
          <PetaContoh
            pusat="15 ÷ 5"
            cabang={[
              { ikon: "🍧", judul: "Mulai", isi: "15" },
              { ikon: "➖", judul: "Kurangi", isi: "5 tiap kali" },
              { ikon: "⭐", judul: "Habis", isi: "3 kali" },
            ]}
            kolom={["Langkah", "Hitung", "Sisa"]}
            baris={[
              ["1", "15 − 5", "10"],
              ["2", "10 − 5", "5"],
              ["3", "5 − 5", "0"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="16 dikurangi 4 terus sampai habis. Ucapkan berapa kali."
            periksa={(teks) => berapaKali(teks, "4", "empat") || ucapBagi(teks, "16", "enam belas", "4", "empat", "4", "empat")}
            petunjuk="Sebutkan berapa kali pengurangannya."
            benar="Empat kali. 16 ÷ 4 = 4."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak={"21 − 7, terus sampai habis"} />}
            pertanyaan="Tulis kalimat baginya."
            pesanSalah="Hitung berapa kali 7 keluar dari 21."
            bantuan="21 − 7 = 14, 14 − 7 = 7, 7 − 7 = 0. 21 ÷ 7 = 3."
            umpan="21 ÷ 7 = 3."
            periksa={(teks) => kalimatBagi(teks, "21", "7", "3")}
            alias={["21", "7", "3"]}
            konteks="21 ÷ 7 = 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Tanpa sisa"
          src="/doodle-mtk/mtk-3-pembagian-sub3.jpg"
          alt="Tiga puluh dua es lilin habis terbagi ke delapan gelas."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Habis berarti sisa nol. Perkalian membalik pembagian itu."]}
        >
          <PetaContoh
            pusat="32 ÷ 8"
            cabang={[
              { ikon: "✖️", judul: "Balik", isi: "8 × 4 = 32" },
              { ikon: "➗", judul: "Bagi", isi: "32 ÷ 8" },
              { ikon: "⭐", judul: "Sisa", isi: "0, habis" },
            ]}
            kolom={["Cara", "Hitung", "Hasil"]}
            baris={[
              ["perkalian", "8 × 4", "32"],
              ["pembagian", "32 ÷ 8", "4"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="45 ÷ 9. Ucapkan hasilnya, lalu katakan habis atau ada sisa."
            periksa={(teks) => habisBagi(teks, "5", "lima")}
            petunjuk="Sebutkan hasilnya, lalu habis atau ada sisa."
            benar="Hasilnya 5. Habis."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak={"54 ÷ 6"} />}
            pertanyaan="Tulis kalimat baginya."
            pesanSalah="Cari 6 dikali berapa yang hasilnya 54."
            bantuan="6 × 9 = 54. Jadi 54 ÷ 6 = 9."
            umpan="54 ÷ 6 = 9. Habis."
            periksa={(teks) => kalimatBagi(teks, "54", "6", "9")}
            alias={["54", "6", "9"]}
            konteks="54 ÷ 6 = 9."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Dengan sisa"
          src="/doodle-mtk/mtk-3-pembagian-sub4.jpg"
          alt="Dua puluh enam es lilin. Empat masuk tiap gelas. Dua tertinggal di nampan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Ambil perkalian yang paling dekat di bawah bilangan itu. Selisihnya adalah sisa."]}
        >
          <PetaContoh
            pusat="26 ÷ 4"
            cabang={[
              { ikon: "✖️", judul: "Dekat", isi: "4 × 6 = 24" },
              { ikon: "➖", judul: "Selisih", isi: "26 − 24 = 2" },
              { ikon: "⭐", judul: "Sisa", isi: "lebih kecil dari 4" },
            ]}
            kolom={["Cara", "Hitung", "Hasil"]}
            baris={[
              ["perkalian dekat", "4 × 6", "24"],
              ["sisa", "26 − 24", "2"],
              ["kalimat", "26 ÷ 4", "6 sisa 2"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="31 ÷ 7. Ucapkan hasilnya dan sisanya."
            periksa={(teks) => bagiSisa(teks, "4", "3", "empat", "tiga")}
            petunjuk="Sebutkan hasil bagi, lalu sisanya."
            benar="4 sisa 3."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak={"22 ÷ 5"} />}
            pertanyaan="Tulis hasil dan sisanya."
            pesanSalah="Cari perkalian 5 yang paling dekat di bawah 22."
            bantuan="5 × 4 = 20. 22 − 20 = 2. Jadi 4 sisa 2."
            umpan="22 ÷ 5 = 4 sisa 2."
            periksa={(teks) => bagiSisa(teks, "4", "2", "empat", "dua")}
            alias={["4", "2", "sisa"]}
            konteks="22 ÷ 5 = 4 sisa 2."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Keluarga angka"
          src="/doodle-mtk/mtk-3-pembagian-sub5.jpg"
          alt="Tiga kalimat angka 6, 8, dan 48 tersusun bersama di papan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kalau a kali b sama dengan c, maka c bagi a sama dengan b, dan c bagi b sama dengan a."]}
        >
          <PetaContoh
            pusat="Keluarga 6, 8, 48"
            cabang={[
              { ikon: "✖️", judul: "Kali", isi: "6 × 8 = 48" },
              { ikon: "➗", judul: "Bagi 6", isi: "48 ÷ 6 = 8" },
              { ikon: "➗", judul: "Bagi 8", isi: "48 ÷ 8 = 6" },
            ]}
            kolom={["Kalimat", "Hitung", "Hasil"]}
            baris={[
              ["kali", "6 × 8", "48"],
              ["bagi", "48 ÷ 6", "8"],
              ["bagi", "48 ÷ 8", "6"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="7 × 4 = 28. Ucapkan satu kalimat baginya."
            periksa={(teks) =>
              salahSatuBagi(teks, [
                ["28", "dua puluh delapan", "7", "tujuh", "4", "empat"],
                ["28", "dua puluh delapan", "4", "empat", "7", "tujuh"],
              ])
            }
            petunjuk="Balik perkalian itu menjadi pembagian."
            benar="28 ÷ 7 = 4, atau 28 ÷ 4 = 7."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak={"5 × 9 = 45"} />}
            pertanyaan="Tulis dua kalimat bagi dari perkalian itu."
            pesanSalah="Balik kedua bilangan yang dikali."
            bantuan="45 ÷ 5 = 9 dan 45 ÷ 9 = 5."
            umpan="Dua kalimat itu satu keluarga dengan 5 × 9."
            periksa={(teks) => duaBagi(teks, "45", "5", "9")}
            alias={["45", "5", "9"]}
            konteks="45 ÷ 5 = 9 dan 45 ÷ 9 = 5."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. 34 ÷ 5 sama dengan..."
          visual={<Papan anak={"34 ÷ 5"} />}
          pilihan={[
            { huruf: "A", teks: "6 sisa 4" },
            { huruf: "B", teks: "7 sisa 1" },
            { huruf: "C", teks: "5 sisa 9" },
            { huruf: "D", teks: "6 sisa 2" },
          ]}
          benar="A"
          salah="Cari 5 dikali berapa yang paling dekat di bawah 34."
          umpan="5 × 6 = 30. 34 − 30 = 4. Jadi 6 sisa 4."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan pembagian dengan hasilnya."
          baris={[
            { kiri: "42 ÷ 7", pilihan: PASANGAN_B, benar: "6" },
            { kiri: "36 ÷ 9", pilihan: PASANGAN_B, benar: "4" },
            { kiri: "56 ÷ 8", pilihan: PASANGAN_B, benar: "7" },
            { kiri: "81 ÷ 9", pilihan: PASANGAN_B, benar: "9" },
          ]}
          umpan="6, 4, 7, dan 9."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Hitung 48 ÷ 6, 18 ÷ 9, 35 ÷ 7, dan 24 ÷ 6. Susun hasilnya dari yang kecil."
          acak={["5", "2", "8", "4"]}
          benar={["2", "4", "5", "8"]}
          umpan="2, 4, 5, 8."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "40 ÷ 8 = 5.", benar: true },
            { teks: "29 ÷ 6 = 4 sisa 5.", benar: true },
            { teks: "17 ÷ 3 = 6 sisa 1.", benar: false },
          ]}
          umpan="Dua yang pertama benar. 17 ÷ 3 = 5 sisa 2."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. 4 × 6 = 24. Maka 24 ÷ 6 sama dengan..."
          pilihan={[
            { huruf: "A", teks: "3" },
            { huruf: "B", teks: "4" },
            { huruf: "C", teks: "5" },
            { huruf: "D", teks: "6" },
          ]}
          benar="B"
          salah="Balik perkaliannya."
          umpan="24 ÷ 6 = 4."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_PEMBAGIAN.kartu[2];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="🍧🦉"
        judul={kartu.judul}
        anak="Sepuluh pos pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-pembagian-permainan.jpg"
        alt="Sepuluh pos es lilin di lapangan. Burung hantu Igil memegang stempel."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_PEMBAGIAN}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_PEMBAGIAN}
          penutup="Sepuluh stempel terkumpul. Stan es lilin besar terbuka."
          bunga="🍧🦉⭐"
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
  const lencana = skor >= 9 ? "🦉 Penjaga Stan Ulung" : skor >= 6 ? "🍧 Pembagi Es" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Pembagianmu rapi dan tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga stan."
        : "Ayo ulang pelan-pelan. Kamu pasti bisa.";
  return (
    <KartuBingkai latar="bg-amber-50/80">
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
        src="/doodle-mtk/mtk-3-pembagian-evaluasi.jpg"
        alt="Nisa, Farhan, dan Cinta mengerjakan soal di meja lapangan. Igil menunggu di samping stan."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Tiga gelas"
          pertanyaan="Ada 21 es lilin untuk 3 gelas. Tulis kalimat baginya."
          pesanSalah="Jumlah es dibagi jumlah gelas."
          bantuan="21 ÷ 3 = 7."
          umpan="21 ÷ 3 = 7."
          periksa={(teks) => kalimatBagi(teks, "21", "3", "7")}
          alias={["21", "3", "7"]}
          konteks="21 ÷ 3 = 7."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. 26 ÷ 4 sama dengan..."
          pilihan={[
            { huruf: "A", teks: "6 sisa 2" },
            { huruf: "B", teks: "5 sisa 6" },
            { huruf: "C", teks: "7 sisa 2" },
            { huruf: "D", teks: "6 sisa 4" },
          ]}
          benar="A"
          salah="Cari 4 dikali berapa yang paling dekat di bawah 26."
          umpan="4 × 6 = 24. 26 − 24 = 2. Jadi 6 sisa 2."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. 32 ÷ 8. Ucapkan hasilnya, lalu katakan habis atau ada sisa."
          periksa={(teks) => habisBagi(teks, "4", "empat")}
          petunjuk="Sebutkan hasilnya, lalu habis atau ada sisa."
          benar="Hasilnya 4. Habis."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Mana yang ada sisanya?"
          pilihan={[
            { huruf: "A", teks: "30 ÷ 5" },
            { huruf: "B", teks: "28 ÷ 7" },
            { huruf: "C", teks: "36 ÷ 6" },
            { huruf: "D", teks: "25 ÷ 6" },
          ]}
          benar="D"
          salah="Cek mana yang tidak habis."
          umpan="30 ÷ 5, 28 ÷ 7, dan 36 ÷ 6 habis. 25 ÷ 6 = 4 sisa 1."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan pembagian dengan hasilnya."
          baris={[
            { kiri: "45 ÷ 9", pilihan: PASANGAN_D, benar: "5" },
            { kiri: "56 ÷ 7", pilihan: PASANGAN_D, benar: "8" },
            { kiri: "63 ÷ 9", pilihan: PASANGAN_D, benar: "7" },
            { kiri: "72 ÷ 8", pilihan: PASANGAN_D, benar: "9" },
          ]}
          umpan="5, 8, 7, dan 9."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Ada sisa"
          visual={<Papan anak={"29 ÷ 6"} />}
          pertanyaan="Tulis hasil dan sisanya."
          pesanSalah="Cari perkalian 6 yang paling dekat di bawah 29."
          bantuan="6 × 4 = 24. 29 − 24 = 5. Jadi 4 sisa 5."
          umpan="29 ÷ 6 = 4 sisa 5."
          periksa={(teks) => bagiSisa(teks, "4", "5", "empat", "lima")}
          alias={["4", "5", "sisa"]}
          konteks="29 ÷ 6 = 4 sisa 5."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Hitung 24 ÷ 3, 18 ÷ 6, 35 ÷ 5, dan 48 ÷ 8. Susun hasilnya dari yang kecil."
          acak={["6", "3", "8", "7"]}
          benar={["3", "6", "7", "8"]}
          umpan="3, 6, 7, 8."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Periksa tiga pernyataan."
          baris={[
            { teks: "7 × 6 = 42, maka 42 ÷ 6 = 7.", benar: true },
            { teks: "33 ÷ 5 = 6 sisa 3.", benar: true },
            { teks: "41 ÷ 7 = 6 sisa 1.", benar: false },
          ]}
          umpan="Dua yang pertama benar. 41 ÷ 7 = 5 sisa 6."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. 9 × 6 = 54. Ucapkan satu kalimat baginya."
          periksa={(teks) =>
            salahSatuBagi(teks, [
              ["54", "lima puluh empat", "9", "sembilan", "6", "enam"],
              ["54", "lima puluh empat", "6", "enam", "9", "sembilan"],
            ])
          }
          petunjuk="Balik perkalian itu menjadi pembagian."
          benar="54 ÷ 9 = 6, atau 54 ÷ 6 = 9."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kotak A 36 ÷ 4, kotak B 40 ÷ 8, kotak C 28 ÷ 4. Es lilin tiap kotak paling banyak ada di..."
          pilihan={[
            { huruf: "A", teks: "Kotak A" },
            { huruf: "B", teks: "Kotak B" },
            { huruf: "C", teks: "Kotak C" },
            { huruf: "D", teks: "Ketiganya sama" },
          ]}
          benar="A"
          salah="Bagi tiap kotak, lalu bandingkan."
          umpan="A = 9, B = 5, C = 7. Kotak A paling banyak."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
        <p className="text-center text-sm font-semibold text-slate-600">{pesan}</p>
      </div>
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
    "Pembagian membuat bagian yang sama banyak.",
    "Kurangi bilangan yang sama sampai habis.",
    "Habis berarti tidak ada sisa.",
    "Sisa harus lebih kecil dari pembagi.",
    "Satu perkalian dibalik jadi dua pembagian.",
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
          alt: "Burung hantu Igil di samping stan es lilin, menunjuk lima kalimat kunci.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Pembagian membagi sama banyak.",
          "Kalian bisa mengurangi berulang sampai habis. Kalau tidak habis, sisanya harus lebih kecil dari pembagi.",
          "Satu perkalian bisa dibalik menjadi dua pembagian.",
        ])}
        poin={poin}
        penutup="Bagi rata, kurangi, cek sisa, lalu balik perkalian."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
