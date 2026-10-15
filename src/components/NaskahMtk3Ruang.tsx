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
import { MISI_MTK3_RUANG, TEMA_MTK3_RUANG } from "@/lib/misi-mtk-3-ruang";
import { MODUL_MTK3_RUANG } from "@/lib/modul-resmi-mtk-3-ruang";
import { nilaiBentuk, nilaiRuang } from "@/lib/nilai-mtk-3-ruang";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_RUANG.id;

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



const PASANG_A = ["bola", "kerucut", "tabung"];
const PASANG_B = ["6", "9", "0"];
const PASANG_D = ["tabung", "prisma", "bola"];

const LARANG_ANGKA = ["belas", "puluh", "ratus", "ribu"];
const LARANG_12 = ["puluh", "ratus", "ribu"];
const BENTUK = ["kubus", "balok", "tabung", "kerucut", "bola", "limas", "prisma"];

function larangBentuk(nama: string): string[] {
  return BENTUK.filter((item) => item !== nama);
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_RUANG.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📦🦉"
        judul="A. Gudang Paket"
        anak="Nisa, Farhan, Cinta, dan Igil di gudang paket"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Mengenali kubus, balok, tabung, kerucut, bola, limas, dan prisma.",
          "Menghitung sisi, rusuk, dan titik sudut.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 1 — Sisi, rusuk, titik sudut"
          src="/doodle-mtk/mtk-3-ruang-sub1.jpg"
          alt="Kotak kubus di gudang paket. Igil bertopi biru bersama tiga anak."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sisi adalah bidang. Rusuk adalah garis. Titik sudut adalah tempat rusuk bertemu."]}
        >
          <Dialog nama="Igil" anak="Dadu ini kubus. Rusuknya ada 12." />
          <Dialog nama="Nisa" anak="Semua rusuknya sama panjang." />
          <Dialog nama="Farhan" anak="Sisi adalah bidang yang rata." />
          <Dialog nama="Cinta" anak="Titik sudut ada di ujung rusuk." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Balok punya berapa sisi? Sebutkan angkanya."
            periksa={(teks) => nilaiRuang(teks, 6, ["enam"], LARANG_ANGKA)}
            petunjuk="Hitung bidang yang rata."
            benar="6."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="kubus" />}
            pertanyaan="Kubus punya berapa titik sudut? Tulis angkanya."
            pesanSalah="Hitung tempat rusuk bertemu."
            bantuan="Kubus punya 8 titik sudut."
            umpan="8."
            periksa={(teks) => nilaiRuang(teks, 8, ["delapan"], LARANG_ANGKA)}
            alias={["8", "delapan"]}
            konteks="Kubus punya 8 titik sudut."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 2 — Kubus dan balok"
          src="/doodle-mtk/mtk-3-ruang-sub2.jpg"
          alt="Kotak kubus dan kotak sepatu balok di meja gudang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kubus rusuknya sama panjang. Balok ada rusuk yang lebih panjang."]}
        >
          <Dialog nama="Cinta" anak="Dadu ini kubus. Rusuknya sama panjang." />
          <Dialog nama="Farhan" anak="Kotak sepatu ini balok." />
          <Dialog nama="Igil" anak="Balok ada rusuk yang lebih panjang." />
          <Dialog nama="Nisa" anak="Keduanya punya sisi yang rata." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Kubus punya berapa rusuk? Sebutkan angkanya."
            periksa={(teks) => nilaiRuang(teks, 12, ["dua belas"], LARANG_12)}
            petunjuk="Hitung semua garis pada kubus."
            benar="12."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="balok" />}
            pertanyaan="Balok punya berapa titik sudut? Tulis angkanya."
            pesanSalah="Hitung tempat rusuk bertemu."
            bantuan="Balok punya 8 titik sudut."
            umpan="8."
            periksa={(teks) => nilaiRuang(teks, 8, ["delapan"], LARANG_ANGKA)}
            alias={["8", "delapan"]}
            konteks="Balok punya 8 titik sudut."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 3 — Tabung, kerucut, bola"
          src="/doodle-mtk/mtk-3-ruang-sub3.jpg"
          alt="Kaleng, topi kerucut, dan bola di meja gudang paket."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Tabung, kerucut, dan bola punya sisi lengkung."]}
        >
          <Dialog nama="Nisa" anak="Kaleng ini tabung. Tepinya ada dua lingkaran." />
          <Dialog nama="Farhan" anak="Topi ulang tahun ini meruncing." />
          <Dialog nama="Cinta" anak="Bola ini mulus dan bulat." />
          <Dialog nama="Igil" anak="Ketiganya bisa menggelinding." />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Kerucut punya berapa titik sudut? Sebutkan angkanya."
            periksa={(teks) => nilaiRuang(teks, 1, ["satu"], LARANG_ANGKA)}
            petunjuk="Lihat puncak yang meruncing."
            benar="1."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="bola" />}
            pertanyaan="Bola punya berapa rusuk? Tulis angkanya."
            pesanSalah="Lihat garis pada bola."
            bantuan="Bola punya 0 rusuk."
            umpan="0."
            periksa={(teks) => nilaiRuang(teks, 0, ["nol", "kosong"], LARANG_ANGKA)}
            alias={["0", "nol", "kosong"]}
            konteks="Bola punya 0 rusuk."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 4 — Limas dan prisma"
          src="/doodle-mtk/mtk-3-ruang-sub4.jpg"
          alt="Limas hijau dan prisma cokelat di meja. Igil bertopi biru menunjuk limas."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Limas punya satu puncak. Prisma punya dua tutup yang sama."]}
        >
          <Dialog nama="Igil" anak="Tenda ini limas. Ada empat sisi segitiga." />
          <Dialog nama="Nisa" anak="Alas tendanya persegi." />
          <Dialog nama="Farhan" anak="Kotak cokelat ini punya dua tutup segitiga." />
          <Dialog nama="Cinta" anak="Itu prisma segitiga." />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Prisma segitiga punya berapa rusuk? Sebutkan angkanya."
            periksa={(teks) => nilaiRuang(teks, 9, ["sembilan"], LARANG_ANGKA)}
            petunjuk="Hitung semua garis pada prisma."
            benar="9."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="limas" />}
            pertanyaan="Limas segiempat punya berapa titik sudut? Tulis angkanya."
            pesanSalah="Hitung sudut alas, lalu tambah puncak."
            bantuan="Limas segiempat punya 5 titik sudut."
            umpan="5."
            periksa={(teks) => nilaiRuang(teks, 5, ["lima"], LARANG_ANGKA)}
            alias={["5", "lima"]}
            konteks="Limas segiempat punya 5 titik sudut."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 5 — Membandingkan bangun"
          src="/doodle-mtk/mtk-3-ruang-sub5.jpg"
          alt="Anak menggelindingkan bola. Kotak kubus diam di meja gudang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bangun bersisi lengkung bisa menggelinding. Kubus dan balok diam di tempat."]}
        >
          <Dialog nama="Farhan" anak="Aku gelindingkan bola ini." />
          <Dialog nama="Nisa" anak="Dadu di meja tidak jalan." />
          <Dialog nama="Cinta" anak="Sisi dadu semuanya rata." />
          <Dialog nama="Igil" anak="Yang bersisi lengkung mudah menggelinding." />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Yang tidak punya titik sudut, bola atau kerucut? Sebutkan namanya."
            periksa={(teks) => nilaiBentuk(teks, ["bola"], larangBentuk("bola"))}
            petunjuk="Pilih yang mulus, tanpa sudut."
            benar="Bola."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="topi" />}
            pertanyaan="Tulis nama bangun yang punya satu puncak."
            pesanSalah="Lihat benda yang meruncing."
            bantuan="Namanya kerucut."
            umpan="Kerucut."
            periksa={(teks) => nilaiBentuk(teks, ["kerucut"], larangBentuk("kerucut"))}
            alias={["kerucut"]}
            konteks="Bangun dengan satu puncak adalah kerucut."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="Kubus punya rusuk..."
          visual={<Papan anak="kubus" />}
          pilihan={[
            { huruf: "A", teks: "6" },
            { huruf: "B", teks: "8" },
            { huruf: "C", teks: "12" },
            { huruf: "D", teks: "4" },
          ]}
          benar="C"
          umpan="Kubus punya 12 rusuk."
          salah="Hitung semua garis pada kubus."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan ciri dengan bangunnya."
          baris={[
            { kiri: "0 rusuk", pilihan: PASANG_A, benar: "bola" },
            { kiri: "1 titik sudut", pilihan: PASANG_A, benar: "kerucut" },
            { kiri: "2 rusuk", pilihan: PASANG_A, benar: "tabung" },
          ]}
          umpan="Bola mulus. Kerucut punya puncak. Tabung punya dua rusuk."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun dari titik sudut yang paling sedikit."
          acak={["kubus", "bola", "limas", "kerucut"]}
          benar={["bola", "kerucut", "limas", "kubus"]}
          umpan="Bola 0, kerucut 1, limas 5, kubus 8."
          salah="Mulai dari yang tidak punya titik sudut."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Kubus punya 6 sisi.", benar: true },
            { teks: "Bola punya 2 rusuk.", benar: false },
            { teks: "Balok punya 8 titik sudut.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Bola punya 0 rusuk."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="Yang menggelinding tanpa rusuk..."
          visual={<Papan anak="📦  🥫  ⚽  ⛺" />}
          pilihan={[
            { huruf: "A", teks: "Kubus" },
            { huruf: "B", teks: "Balok" },
            { huruf: "C", teks: "Bola" },
            { huruf: "D", teks: "Limas" },
          ]}
          benar="C"
          umpan="Bola tidak punya rusuk."
          salah="Pilih yang mulus dan bulat."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_RUANG.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📦"
        judul={kartu.judul}
        anak="Papan sisi, rusuk, dan titik sudut"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Kubus"
          src="/doodle-mtk/mtk-3-ruang-sub1.jpg"
          alt="Kotak kubus di gudang paket."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kubus punya 6 sisi, 12 rusuk yang sama, dan 8 titik sudut."]}
        >
          <PetaContoh
            pusat="Kubus"
            cabang={[
              { ikon: "🟦", judul: "Sisi", isi: "6 bidang" },
              { ikon: "📏", judul: "Rusuk", isi: "12 sama" },
              { ikon: "•", judul: "Titik", isi: "8 sudut" },
            ]}
            kolom={["Ciri", "Jumlah", "Catatan"]}
            baris={[
              ["sisi", "6", "bidang rata"],
              ["rusuk", "12", "sama panjang"],
              ["titik", "8", "sudut ketemu"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Bola punya berapa sisi? Sebutkan angkanya."
            periksa={(teks) => nilaiRuang(teks, 1, ["satu"], LARANG_ANGKA)}
            petunjuk="Hitung bidang pada bola."
            benar="1."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="tabung" />}
            pertanyaan="Tabung punya berapa rusuk? Tulis angkanya."
            pesanSalah="Hitung lingkaran di tepi tabung."
            bantuan="Tabung punya 2 rusuk."
            umpan="2."
            periksa={(teks) => nilaiRuang(teks, 2, ["dua"], LARANG_ANGKA)}
            alias={["2", "dua"]}
            konteks="Tabung punya 2 rusuk."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Kubus dan balok"
          src="/doodle-mtk/mtk-3-ruang-sub2.jpg"
          alt="Kubus dan balok berdampingan di meja."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kubus dan balok sama-sama punya 6 sisi, 12 rusuk, dan 8 titik sudut. Rusuk kubus sama. Rusuk balok ada yang panjang."]}
        >
          <PetaContoh
            pusat="Kotak"
            cabang={[
              { ikon: "🟦", judul: "Sama", isi: "rusuk kubus" },
              { ikon: "📦", judul: "Beda", isi: "rusuk balok" },
              { ikon: "8", judul: "Titik", isi: "keduanya" },
            ]}
            kolom={["Bangun", "Rusuk", "Titik"]}
            baris={[
              ["kubus", "sama panjang", "8"],
              ["balok", "ada yang panjang", "8"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Dadu. Sebutkan nama bangunnya."
            periksa={(teks) => nilaiBentuk(teks, ["kubus"], larangBentuk("kubus"))}
            petunjuk="Lihat kotak yang rusuknya sama."
            benar="Kubus."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="kotak sepatu" />}
            pertanyaan="Kotak sepatu. Tulis nama bangunnya."
            pesanSalah="Lihat kotak yang rusuknya ada yang panjang."
            bantuan="Namanya balok."
            umpan="Balok."
            periksa={(teks) => nilaiBentuk(teks, ["balok"], larangBentuk("balok"))}
            alias={["balok"]}
            konteks="Kotak sepatu adalah balok."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Tabung, kerucut, bola"
          src="/doodle-mtk/mtk-3-ruang-sub3.jpg"
          alt="Kaleng, topi, dan bola di meja gudang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Tabung punya 2 rusuk. Kerucut punya 1 puncak. Bola tidak punya rusuk."]}
        >
          <PetaContoh
            pusat="Lengkung"
            cabang={[
              { ikon: "🥫", judul: "Tabung", isi: "2 rusuk" },
              { ikon: "🎩", judul: "Kerucut", isi: "1 puncak" },
              { ikon: "⚽", judul: "Bola", isi: "0 rusuk" },
            ]}
            kolom={["Bangun", "Sisi", "Rusuk"]}
            baris={[
              ["tabung", "3", "2"],
              ["kerucut", "2", "1"],
              ["bola", "1", "0"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Kaleng susu. Sebutkan nama bangunnya."
            periksa={(teks) => nilaiBentuk(teks, ["tabung"], larangBentuk("tabung"))}
            petunjuk="Lihat benda dengan dua lingkaran."
            benar="Tabung."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="bola sepak" />}
            pertanyaan="Bola sepak. Tulis nama bangunnya."
            pesanSalah="Lihat benda yang bulat dan mulus."
            bantuan="Namanya bola."
            umpan="Bola."
            periksa={(teks) => nilaiBentuk(teks, ["bola"], larangBentuk("bola"))}
            alias={["bola"]}
            konteks="Bola sepak adalah bola."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Limas dan prisma"
          src="/doodle-mtk/mtk-3-ruang-sub4.jpg"
          alt="Limas dan prisma di atas meja kayu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Limas segiempat punya 5 sisi dan 5 titik sudut. Prisma segitiga punya 9 rusuk."]}
        >
          <PetaContoh
            pusat="Lancip"
            cabang={[
              { ikon: "⛺", judul: "Limas", isi: "ada puncak" },
              { ikon: "🔺", judul: "Prisma", isi: "dua tutup" },
              { ikon: "9", judul: "Rusuk", isi: "pada prisma" },
            ]}
            kolom={["Bangun", "Sisi", "Titik"]}
            baris={[
              ["limas", "5", "5"],
              ["prisma", "5", "6"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Tenda dengan alas persegi. Sebutkan nama bangunnya."
            periksa={(teks) => nilaiBentuk(teks, ["limas"], larangBentuk("limas"))}
            petunjuk="Lihat bangun yang punya satu puncak."
            benar="Limas."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="dua tutup segitiga" />}
            pertanyaan="Kotak dengan dua tutup segitiga. Tulis nama bangunnya."
            pesanSalah="Lihat dua tutup yang sama."
            bantuan="Namanya prisma."
            umpan="Prisma."
            periksa={(teks) => nilaiBentuk(teks, ["prisma"], larangBentuk("prisma"))}
            alias={["prisma"]}
            konteks="Kotak dengan dua tutup segitiga adalah prisma."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Yang menggelinding"
          src="/doodle-mtk/mtk-3-ruang-sub5.jpg"
          alt="Bola menggelinding, kotak kubus diam."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Sisi lengkung membuat bangun mudah menggelinding. Sisi datar membuatnya diam."]}
        >
          <PetaContoh
            pusat="Gelinding"
            cabang={[
              { ikon: "⚽", judul: "Bulat", isi: "sisi lengkung" },
              { ikon: "📦", judul: "Diam", isi: "sisi datar" },
              { ikon: "🥫", judul: "Kaleng", isi: "bisa jalan" },
            ]}
            kolom={["Bangun", "Sisi", "Gerak"]}
            baris={[
              ["bola", "lengkung", "menggelinding"],
              ["tabung", "lengkung", "menggelinding"],
              ["kubus", "datar", "diam"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Yang tidak punya rusuk, bola atau tabung? Sebutkan namanya."
            periksa={(teks) => nilaiBentuk(teks, ["bola"], larangBentuk("bola"))}
            petunjuk="Pilih yang mulus, tanpa garis."
            benar="Bola."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="satu puncak" />}
            pertanyaan="Tulis nama bangun yang punya satu puncak."
            pesanSalah="Lihat benda yang meruncing."
            bantuan="Namanya kerucut."
            umpan="Kerucut."
            periksa={(teks) => nilaiBentuk(teks, ["kerucut"], larangBentuk("kerucut"))}
            alias={["kerucut"]}
            konteks="Bangun dengan satu puncak adalah kerucut."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="Limas segiempat punya titik sudut..."
          visual={<Papan anak="limas" />}
          pilihan={[
            { huruf: "A", teks: "4" },
            { huruf: "B", teks: "5" },
            { huruf: "C", teks: "6" },
            { huruf: "D", teks: "8" },
          ]}
          benar="B"
          umpan="Empat sudut alas, ditambah satu puncak."
          salah="Hitung sudut alas, lalu tambah puncak."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="Pasangkan ciri dengan jumlahnya."
          baris={[
            { kiri: "sisi kubus", pilihan: PASANG_B, benar: "6" },
            { kiri: "rusuk prisma", pilihan: PASANG_B, benar: "9" },
            { kiri: "titik bola", pilihan: PASANG_B, benar: "0" },
          ]}
          umpan="Kubus 6 sisi. Prisma 9 rusuk. Bola 0 titik sudut."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="Susun dari rusuk yang paling sedikit."
          acak={["kubus", "tabung", "bola", "kerucut"]}
          benar={["bola", "kerucut", "tabung", "kubus"]}
          umpan="Bola 0, kerucut 1, tabung 2, kubus 12."
          salah="Mulai dari yang tidak punya rusuk."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Tabung punya 2 rusuk.", benar: true },
            { teks: "Kerucut punya 4 titik sudut.", benar: false },
            { teks: "Prisma segitiga punya 5 sisi.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Kerucut punya 1 titik sudut."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="Kotak pensil yang panjang. Namanya..."
          visual={<Papan anak="kotak pensil" />}
          pilihan={[
            { huruf: "A", teks: "Kubus" },
            { huruf: "B", teks: "Bola" },
            { huruf: "C", teks: "Balok" },
            { huruf: "D", teks: "Kerucut" },
          ]}
          benar="C"
          umpan="Kotak pensil yang panjang adalah balok."
          salah="Pilih kotak yang rusuknya ada yang panjang."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_RUANG.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="📦🦉"
        judul={kartu.judul}
        anak="Sepuluh pos paket"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-ruang-permainan.jpg"
        alt="Igil bertopi biru memegang stempel. Kotak, kaleng, bola, dan topi di meja. Kertas masih kosong."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos paket. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_RUANG}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_RUANG}
          penutup="Paket tertata. Igil menempelkan lencana penata gudang."
          bunga="📦🥫⚽🦉"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_RUANG.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Penata Gudang" : skor >= 6 ? "📦 Penata Muda" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Sisi, rusuk, dan titik sudutmu sudah tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penata gudang."
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
        src="/doodle-mtk/mtk-3-ruang-evaluasi.jpg"
        alt="Meja dengan pensil, stempel, dan kertas kosong. Igil bertopi biru di depan kotak dan bola."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Sisi balok"
          visual={<Papan anak="balok" />}
          pertanyaan="Balok punya berapa sisi? Tulis angkanya."
          pesanSalah="Hitung bidang yang rata."
          bantuan="Balok punya 6 sisi."
          umpan="6."
          periksa={(teks) => nilaiRuang(teks, 6, ["enam"], LARANG_ANGKA)}
          alias={["6", "enam"]}
          konteks="Balok punya 6 sisi."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Bola punya rusuk..."
          visual={<Papan anak="bola" />}
          pilihan={[
            { huruf: "A", teks: "0" },
            { huruf: "B", teks: "1" },
            { huruf: "C", teks: "2" },
            { huruf: "D", teks: "3" },
          ]}
          benar="A"
          umpan="Bola tidak punya rusuk."
          salah="Bola mulus, tanpa garis."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Topi ulang tahun. Sebutkan nama bangunnya."
          periksa={(teks) => nilaiBentuk(teks, ["kerucut"], larangBentuk("kerucut"))}
          petunjuk="Lihat benda yang meruncing."
          benar="Kerucut."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Limas segiempat punya rusuk..."
          visual={<Papan anak="limas" />}
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "8" },
            { huruf: "D", teks: "12" },
          ]}
          benar="C"
          umpan="Empat rusuk alas, ditambah empat rusuk ke puncak."
          salah="Hitung rusuk alas, lalu rusuk ke puncak."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan benda dengan bangunnya."
          baris={[
            { kiri: "kaleng", pilihan: PASANG_D, benar: "tabung" },
            { kiri: "tutup segitiga", pilihan: PASANG_D, benar: "prisma" },
            { kiri: "tanpa titik", pilihan: PASANG_D, benar: "bola" },
          ]}
          umpan="Kaleng tabung. Tutup segitiga prisma. Tanpa titik adalah bola."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Titik prisma"
          visual={<Papan anak="prisma" />}
          pertanyaan="Prisma segitiga punya berapa titik sudut? Tulis angkanya."
          pesanSalah="Hitung sudut pada dua tutup."
          bantuan="Prisma segitiga punya 6 titik sudut."
          umpan="6."
          periksa={(teks) => nilaiRuang(teks, 6, ["enam"], LARANG_ANGKA)}
          alias={["6", "enam"]}
          konteks="Prisma segitiga punya 6 titik sudut."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun dari sisi yang paling sedikit."
          acak={["kubus", "bola", "tabung", "kerucut"]}
          benar={["bola", "kerucut", "tabung", "kubus"]}
          umpan="Bola 1, kerucut 2, tabung 3, kubus 6."
          salah="Mulai dari yang sisinya paling sedikit."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Benar atau salah?"
          baris={[
            { teks: "Kubus dan balok sama-sama punya 8 titik sudut.", benar: true },
            { teks: "Bola punya 1 rusuk.", benar: false },
            { teks: "Kerucut punya 1 titik sudut.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Bola punya 0 rusuk."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Kubus punya berapa rusuk? Sebutkan angkanya."
          periksa={(teks) => nilaiRuang(teks, 12, ["dua belas"], LARANG_12)}
          petunjuk="Hitung semua garis pada kubus."
          benar="12."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Nisa memegang dadu. Farhan memegang kaleng. Yang punya 2 rusuk..."
          visual={<Papan anak="dadu  ·  kaleng" />}
          pilihan={[
            { huruf: "A", teks: "Dadu" },
            { huruf: "B", teks: "Kaleng" },
            { huruf: "C", teks: "Keduanya" },
            { huruf: "D", teks: "Tidak ada" },
          ]}
          benar="B"
          umpan="Kaleng adalah tabung. Tabung punya 2 rusuk."
          salah="Pilih benda yang berbentuk tabung."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Ruang({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Sisi adalah bidang. Rusuk adalah garis. Titik sudut adalah tempat rusuk bertemu.",
    "Kubus dan balok punya 6 sisi, 12 rusuk, dan 8 titik sudut.",
    "Rusuk kubus sama panjang. Rusuk balok ada yang lebih panjang.",
    "Tabung punya 2 rusuk. Kerucut punya 1 puncak. Bola tidak punya rusuk.",
    "Limas segiempat punya 5 sisi. Prisma segitiga punya 9 rusuk.",
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
          src: "/doodle-mtk/mtk-3-ruang-poin.jpg",
          alt: "Igil bertopi biru dan tiga anak memegang kartu kosong di gudang paket.",
        }}
        cuplikan={cuplikanKalimat([
          "Sisi adalah bidang. Rusuk adalah garis. Titik sudut adalah tempat rusuk bertemu.",
          "Kubus dan balok punya 6 sisi, 12 rusuk, dan 8 titik sudut. Rusuk kubus sama. Rusuk balok ada yang panjang.",
          "Tabung punya 2 rusuk. Kerucut punya 1 puncak. Bola tidak punya rusuk. Limas punya puncak. Prisma punya dua tutup.",
        ])}
        poin={poin}
        penutup="Lihat bendanya, lalu hitung sisi, rusuk, dan titik sudut."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
