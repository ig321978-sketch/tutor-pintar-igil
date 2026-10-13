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
import { MISI_MTK3_BAB2, TEMA_MTK3_BAB2 } from "@/lib/misi-mtk-3-bab2";
import { MODUL_MTK3_BAB2 } from "@/lib/modul-resmi-mtk-3-bab2";
import {
  adaHasil,
  artiKurang,
  baca5322,
  baca7483,
  baca7538,
  baca8300,
  duaLangkahMuatan,
  jawabEnam,
  jawabLima,
  jawabSatu,
  jawabTiga,
  jawabTujuh,
  kalimatKurang,
  kalimatTambah,
  kasusGudang,
} from "@/lib/nilai-mtk-3-bab2";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_BAB2.id;

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
  Rio: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Sinta: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Adit: "border-[#16A34A]/20 bg-[#F0FDF4]",
  "Bunda Kiki": "border-teal-300 bg-teal-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Rio: "👦",
  Sinta: "👧",
  Adit: "👦",
  "Bunda Kiki": "🐨",
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
      <HasilJawabanKuis status={status} pesanSalah="Hitung lagi dari satuan, lalu pilih ulang." />
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

const ARAH = [
  { ikon: "🟡", teks: "Satuan dulu" },
  { ikon: "🟨", teks: "Puluhan" },
  { ikon: "🔵", teks: "Ratusan" },
  { ikon: "🟦", teks: "Ribuan" },
];

const HASIL_A = ["4.800", "6.800", "5.000"];
const TEKNIK = ["Kurang dengan meminjam", "Tambah tanpa menyimpan", "Kurang tanpa meminjam"];
const HASIL_C = ["4.200", "8.900", "5.600"];
const TEKNIK_EVAL = ["Kurang dengan meminjam", "Tambah tanpa menyimpan", "Kurang tanpa meminjam"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB2.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="👦👧🐨"
        judul={kartu.judul}
        anak="Rio, Sinta, Adit, dan Bunda Kiki"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: menjumlahkan dan mengurangkan sampai 10.000, dengan atau tanpa menyimpan dan meminjam, lalu menyelesaikan soal cerita.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Penjumlahan tanpa menyimpan"
          warna="border-sky-200 bg-sky-50/60"
          src="/doodle-mtk/mtk-3-bab2-sub1.jpg"
          alt="Gudang beras dengan dua tumpukan karung. Rio memegang catatan dan Sinta memegang kalkulator mainan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk menjumlahkan bilangan ribuan, kita mulai dari satuan, lalu puluhan, ratusan, dan terakhir ribuan.",
            "Kalau jumlah di setiap rumah masih sembilan atau kurang, kita tidak perlu menyimpan apa pun. Langsung tulis hasilnya.",
          ]}
          simbol={ARAH}
        >
          <Dialog nama="Bunda Kiki" anak="Rio, di gudang ada 2.435 karung beras. Datang lagi 3.142 karung." />
          <Dialog nama="Rio" anak="Ayo hitung! Mulai dari satuan: 5 + 2 = 7." />
          <Dialog nama="Sinta" anak="Puluhan: 3 + 4 = 7. Ratusan: 4 + 1 = 5." />
          <Dialog nama="Adit" anak="Ribuan: 2 + 3 = 5." />
          <Dialog nama="Rio" anak="Jadi 5.577 karung!" />
          <Papan anak={"  2.435\n  3.142\n  ----- +\n  5.577"} />
          <Dialog nama="Adit" anak="Tidak ada yang disimpan, ya?" />
          <Dialog nama="Bunda Kiki" anak="Tidak ada! Semua muat di rumahnya masing-masing." />
          <p className="text-sm font-black text-[#1C01A5]">Kalau jumlah tiap rumah 9 atau kurang, langsung tulis. Tidak perlu menyimpan.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Pada 4.213 + 1.574, hitung satuannya dulu: 3 + 4. Berapa?"
            periksa={jawabTujuh}
            petunjuk="Tunjuk angka 3 dan 4, lalu hitung maju dari 3."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Jumlah tanpa simpanan"
            visual={<Papan anak={"  5.124\n  3.451\n  ----- +\n    ⬜"} />}
            pertanyaan="Tulis jawabannya!"
            pesanSalah="Mulai dari satuan: 4 + 1."
            bantuan="Rumahnya: satuan 5, puluhan 7, ratusan 5, ribuan 8. Jadi 8.575."
            umpan="8.575."
            periksa={(teks) => adaHasil(teks, "8575")}
            alias={["8575", "8.575"]}
            konteks="5.124 + 3.451 = 8.575."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Penjumlahan dengan menyimpan"
          warna="border-indigo-200 bg-indigo-50/60"
          src="/doodle-mtk/mtk-3-bab2-sub2.jpg"
          alt="Rumah satuan meluap. Balok 10 naik ke rumah sebelah dan meninggalkan angka kecil."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau jumlah di satu rumah lebih dari sembilan, kita harus menyimpan. Satu puluhan dipindah ke rumah sebelah kiri.",
            "Simpanan kecil itu ditulis di atas dan jangan lupa ikut dihitung!",
          ]}
        >
          <Dialog nama="Sinta" anak="Ada 4.768 karung. Datang 3.575 karung lagi." />
          <Dialog nama="Rio" anak="Satuannya: 8 + 5 = 13. Tulis 3, simpan 1!" />
          <Dialog nama="Adit" anak="Jangan lupa simpanannya, ya." />
          <Dialog nama="Sinta" anak="Puluhan: 1 + 6 + 7 = 14. Tulis 4, simpan 1!" />
          <Dialog nama="Rio" anak="Ratusan: 1 + 7 + 5 = 13. Tulis 3, simpan 1!" />
          <Dialog nama="Adit" anak="Ribuan: 1 + 4 + 3 = 8. Jadi 8.343!" />
          <Papan anak={"   1 1 1\n  4.768\n  3.575\n  ----- +\n  8.343"} />
          <Dialog nama="Bunda Kiki" anak="Simpanannya tiga kali! Kalian teliti sekali!" />
          <p className="text-sm font-black text-[#1C01A5]">Lebih dari sembilan? Simpan satu ke kiri. Simpanan ikut dihitung.</p>
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Pada 5.847 + 2.396, satuannya 7 + 6 = 13. Simpan berapa ke puluhan?"
            periksa={jawabSatu}
            petunjuk="13 itu satu puluhan dan tiga satuan. Jadi simpanannya satu."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Simpanan dan hasil"
            visual={<Papan anak={"  1  1  1\n  6.758\n  2.486\n  ----- +\n    ⬜"} />}
            pertanyaan="Tulis jawaban akhirnya!"
            pesanSalah="8 + 6 = 14. Tulis 4, simpan 1."
            bantuan="Simpanan dari satuan: 1, 1, dan 1. Hasilnya 9.244."
            umpan="9.244."
            periksa={(teks) => adaHasil(teks, "9244")}
            alias={["9244", "9.244"]}
            konteks="6.758 + 2.486 = 9.244. Simpanan 1, 1, 1."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Pengurangan tanpa meminjam"
          warna="border-amber-200 bg-amber-50/70"
          src="/doodle-mtk/mtk-3-bab2-sub3.jpg"
          alt="Dua baris bola. Baris atas lebih banyak. Truk kecil berdiri di depan gudang."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk mengurangi, kita juga mulai dari satuan.",
            "Kalau angka di atas lebih besar atau sama dengan angka di bawah, kita bisa langsung mengurangi. Tidak perlu meminjam.",
          ]}
        >
          <Dialog nama="Bunda Kiki" anak="Gudang punya 8.745 karung. Dikirim 3.521 karung. Sisa berapa?" />
          <Dialog nama="Rio" anak="Satuan: 5 − 1 = 4." />
          <Dialog nama="Adit" anak="Puluhan: 4 − 2 = 2. Ratusan: 7 − 5 = 2." />
          <Dialog nama="Sinta" anak="Ribuan: 8 − 3 = 5. Jadi 5.224!" />
          <Dialog nama="Rio" anak="Aman! Semua angka atas lebih besar dari bawah." />
          <Papan anak={"  8.745\n  3.521\n  ----- −\n  5.224"} />
          <p className="text-sm font-black text-[#1C01A5]">Angka atas lebih besar? Boleh langsung kurang.</p>
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Pada 9.876 − 4.253, hitung satuannya: 6 − 3. Berapa hasilnya?"
            periksa={jawabTiga}
            petunjuk="Hitung mundur dari 6 sebanyak 3 langkah."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Kurang tanpa pinjaman"
            visual={<Papan anak={"  7.948\n  3.617\n  ----- −\n    ⬜"} />}
            pertanyaan="Tulis jawabannya!"
            pesanSalah="Satuan 8 − 7 = 1."
            bantuan="Garis rumah: satuan 1, puluhan 3, ratusan 3, ribuan 4. Jadi 4.331."
            umpan="4.331."
            periksa={(teks) => adaHasil(teks, "4331")}
            alias={["4331", "4.331"]}
            konteks="7.948 − 3.617 = 4.331."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Pengurangan dengan meminjam"
          warna="border-rose-200 bg-rose-50/70"
          src="/doodle-mtk/mtk-3-bab2-sub4.jpg"
          alt="Rumah puluhan menyerahkan kotak 10 ke rumah satuan. Angka puluhan dicoret dan ditulis lebih kecil."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kadang angka di bawah lebih besar dari angka di atas. Kalau begitu, kita meminjam dari rumah sebelah kiri.",
            "Satu dari rumah kiri bernilai sepuluh di rumah kanan. Dan jangan lupa: rumah yang dipinjam harus dikurangi satu!",
          ]}
        >
          <Dialog nama="Bunda Kiki" anak="Gudang punya 5.342 karung. Harus dikirim 1.876. Sisa berapa?" />
          <Dialog nama="Sinta" anak="Satuan: 2 − 6… tidak bisa!" />
          <Dialog nama="Rio" anak="Pinjam dari puluhan! 2 jadi 12, puluhan 4 jadi 3." />
          <Dialog nama="Adit" anak="12 − 6 = 6." />
          <Dialog nama="Rio" anak="Puluhan: 3 − 7… tidak bisa lagi! Pinjam dari ratusan. 13 − 7 = 6." />
          <Dialog nama="Sinta" anak="Ratusan: 2 − 8… tidak bisa! Pinjam lagi. 12 − 8 = 4." />
          <Dialog nama="Adit" anak="Ribuan: 4 − 1 = 3. Jadi 3.466!" />
          <Papan anak={"  4  12  13  12\n  5.342\n  1.876\n  ---------- −\n  3.466"} />
          <Dialog nama="Bunda Kiki" anak="Meminjam tiga kali berturut-turut! Kalian hebat!" />
          <p className="text-sm font-black text-[#1C01A5]">Bawah lebih besar? Pinjam. Setelah meminjam, rumah kiri berkurang satu.</p>
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Pada 6.431 − 2.758, angka 6 di atas sudah dicoret jadi 5. Setelah meminjam, angka ribuan jadi berapa?"
            periksa={jawabLima}
            petunjuk="Enam dipinjam satu, jadi tinggal lima."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Kurang dengan pinjaman"
            visual={<Papan anak={"  7.203\n  3.468\n  ----- −\n    ⬜"} />}
            pertanyaan="Hitung dan tulis jawabannya!"
            pesanSalah="Satuan 3 lebih kecil dari 8. Pinjam dulu."
            bantuan="13 − 8 = 5, 9 − 6 = 3, 11 − 4 = 7, 6 − 3 = 3. Jadi 3.735."
            umpan="3.735."
            periksa={(teks) => adaHasil(teks, "3735")}
            alias={["3735", "3.735"]}
            konteks="7.203 − 3.468 = 3.735."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita"
          warna="border-emerald-200 bg-emerald-50/70"
          src="/doodle-mtk/mtk-3-bab2-sub5.jpg"
          alt="Kantor gudang. Bunda Kiki duduk dengan buku besar. Empat ikon langkah: kaca, kunci, pensil, dan sempoa."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Soal cerita harus diterjemahkan dulu jadi kalimat matematika. Ada empat langkah: cari angkanya, cari kata kuncinya, tulis kalimatnya, lalu hitung.",
            "Kata seperti ditambah atau datang artinya tambah. Kata seperti dikirim, terjual, atau sisa artinya kurang.",
          ]}
          simbol={[
            { ikon: "🔍", teks: "Cari angka" },
            { ikon: "🔑", teks: "Kata kunci" },
            { ikon: "✏️", teks: "Tulis" },
            { ikon: "🧮", teks: "Hitung" },
          ]}
        >
          <Dialog nama="Bunda Kiki" anak="Catatan hari ini: pagi ada 4.250 karung. Siang datang 2.180 karung. Sore dikirim 3.500 karung. Berapa sisa di gudang?" />
          <Dialog nama="Rio" anak="Dua langkah! Pertama, jumlahkan yang datang dulu." />
          <Dialog nama="Sinta" anak="4.250 + 2.180 = 6.430. Lalu dikurangi 3.500." />
          <Dialog nama="Adit" anak="6.430 − 3.500 = 2.930." />
          <Dialog nama="Rio" anak="Sisa 2.930 karung!" />
          <Papan anak={"Langkah 1: 4.250 + 2.180 = 6.430\nLangkah 2: 6.430 − 3.500 = 2.930"} />
          <Dialog nama="Bunda Kiki" anak="Bagus! Soal dua langkah harus dikerjakan berurutan." />
          <p className="text-sm font-black text-[#1C01A5]">Soal cerita butuh empat langkah. Soal campuran dikerjakan berurutan.</p>
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Kata dikirim artinya ditambah atau dikurangi?"
            periksa={artiKurang}
            petunjuk="Kalau barang dikirim, barangnya pergi dari gudang. Jadi berkurang."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Kalimat cerita"
            visual={<Papan anak="Gudang punya 6.800 karung. Terjual 2.450 karung." />}
            pertanyaan="Tulis kalimat matematikanya dan hasilnya!"
            pesanSalah="Terjual artinya barangnya berkurang."
            bantuan="Terjual = kurang. 6.800 − 2.450 = 4.350."
            umpan="6.800 − 2.450 = 4.350."
            periksa={(teks) => kalimatKurang(teks, "6800", "2450", "4350")}
            alias={["6800 - 2450 = 4350", "6.800 − 2.450 = 4.350"]}
            konteks="6.800 − 2.450 = 4.350."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Berapa 3.847 + 2.576?"
          visual={<Papan anak={"   1 1 1\n  3.847\n  2.576\n  ----- +"} />}
          pilihan={[
            { huruf: "A", teks: "5.313" },
            { huruf: "B", teks: "6.423" },
            { huruf: "C", teks: "6.313" },
            { huruf: "D", teks: "6.413" },
          ]}
          benar="B"
          umpan="7 + 6 = 13, simpan 1. 1 + 4 + 7 = 12, simpan 1. 1 + 8 + 5 = 14, simpan 1. 1 + 3 + 2 = 6. Jadi 6.423."
          salah="Jangan lupakan simpanan 1 di setiap rumah."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan setiap hitungan dengan hasilnya."
          baris={[
            { kiri: "4.500 + 2.300", pilihan: HASIL_A, benar: "6.800" },
            { kiri: "7.200 − 2.400", pilihan: HASIL_A, benar: "4.800" },
            { kiri: "2.900 + 2.100", pilihan: HASIL_A, benar: "5.000" },
          ]}
          umpan="6.800, 4.800, dan 5.000. Ketiganya berbeda."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun supaya jadi kalimat yang benar."
          acak={["5.600", "=", "3.400", "2.200", "+"]}
          benar={["3.400", "+", "2.200", "=", "5.600"]}
          umpan="3.400 + 2.200 = 5.600."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif hitung. Periksa tiga pernyataan."
          baris={[
            { teks: "Hasil 4.750 + 2.380 perlu menyimpan.", benar: true },
            { teks: "Hasil 8.500 − 3.240 perlu meminjam.", benar: false },
            { teks: "Setelah meminjam, rumah kiri berkurang satu.", benar: true },
          ]}
          umpan="Benar, salah, benar. 5 + 8 = 13 jadi menyimpan. 8.500 − 3.240 semua angka atas lebih besar."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. ⬜.500 + 2.300 = 7.800. Angka yang hilang adalah..."
          visual={<Papan anak="⬜.500 + 2.300 = 7.800" />}
          pilihan={[
            { huruf: "A", teks: "4" },
            { huruf: "B", teks: "5" },
            { huruf: "C", teks: "6" },
            { huruf: "D", teks: "7" },
          ]}
          benar="B"
          umpan="7.800 − 2.300 = 5.500. Angka ribuannya 5."
          salah="Kurangkan 2.300 dari 7.800."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Lebih dari sembilan, simpan satu ke kiri."
          alias={["sembilan", "simpan"]}
          konteks="Lebih dari sembilan, simpan satu ke kiri."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB2.kartu[1];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="📊"
        judul={kartu.judul}
        anak="Papan simpanan dan pinjaman"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Menjumlah tanpa menyimpan"
          warna="border-sky-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub1.jpg"
          alt="Empat rumah angka dengan panah dari kanan ke kiri, tanpa kotak simpanan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Jumlahkan dari satuan. Kalau setiap rumah hasilnya sembilan atau kurang, kita langsung menulis hasilnya.",
            "Tidak perlu menyimpan apa pun.",
          ]}
          simbol={ARAH}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 3.241 + 4.536</p>
          <Langkah butir={["Satuan: 1 + 6 = 7.", "Puluhan: 4 + 3 = 7.", "Ratusan: 2 + 5 = 7.", "Ribuan: 3 + 4 = 7."]} />
          <Papan anak="7.777" />
          <p className="text-sm font-black text-emerald-800">Trik: semua muat? Tidak usah simpan.</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Berapa hasil 5.123 + 2.415?"
            periksa={baca7538}
            petunjuk="Jumlahkan dari satuan, lalu bacakan hasilnya."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="6.214 + 2.173 = ⬜" />}
            pertanyaan="Tulis jawabannya!"
            pesanSalah="4 + 3, 1 + 7, 2 + 1, 6 + 2."
            bantuan="Hasilnya 8.387."
            umpan="8.387."
            periksa={(teks) => adaHasil(teks, "8387")}
            alias={["8387"]}
            konteks="6.214 + 2.173 = 8.387."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Menjumlah dengan menyimpan"
          warna="border-indigo-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub2.jpg"
          alt="Balok 10 melompat ke kiri dan meninggalkan angka simpanan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau hasil satu rumah lebih dari sembilan, pecah jadi puluhan dan satuan.",
            "Satuannya ditulis di bawah, puluhannya disimpan kecil di atas rumah sebelah kiri. Simpanan itu wajib ikut dihitung.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 4.876 + 2.358</p>
          <Langkah
            butir={[
              "Satuan: 6 + 8 = 14, tulis 4, simpan 1.",
              "Puluhan: 1 + 7 + 5 = 13, tulis 3, simpan 1.",
              "Ratusan: 1 + 8 + 3 = 12, tulis 2, simpan 1.",
              "Ribuan: 1 + 4 + 2 = 7.",
            ]}
          />
          <Papan anak={"   1 1 1\n  4.876\n  2.358\n  ----- +\n  7.234"} />
          <p className="text-sm font-black text-emerald-800">Trik: lebih dari sembilan? Simpan satu ke kiri.</p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Pada 6.437 + 2.285, satuannya 7 + 5 = 12. Berapa yang disimpan?"
            periksa={jawabSatu}
            petunjuk="12 adalah satu puluhan dan dua satuan."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="5.869 + 3.274 = ⬜" />}
            pertanyaan="Tulis hasil akhirnya!"
            pesanSalah="9 + 4 = 13. Tulis 3, simpan 1."
            bantuan="Simpanan 1, 1, 1. Hasilnya 9.143."
            umpan="9.143."
            periksa={(teks) => adaHasil(teks, "9143")}
            alias={["9143"]}
            konteks="5.869 + 3.274 = 9.143."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Mengurangi tanpa meminjam"
          warna="border-amber-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub3.jpg"
          alt="Dua baris bola. Baris atas lebih banyak dan sisa bola bersinar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk mengurangi, mulai dari satuan.",
            "Kalau angka di atas lebih besar atau sama dengan angka di bawah, kita bisa langsung mengurangi tanpa meminjam.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 9.865 − 4.321</p>
          <Langkah butir={["Satuan: 5 − 1 = 4.", "Puluhan: 6 − 2 = 4.", "Ratusan: 8 − 3 = 5.", "Ribuan: 9 − 4 = 5."]} />
          <Papan anak="5.544" />
          <p className="text-sm font-black text-emerald-800">Trik: atas lebih besar? Boleh langsung kurang.</p>
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Berapa hasil 8.974 − 3.652?"
            periksa={baca5322}
            petunjuk="Semua angka atas lebih besar. Kurangkan dari satuan."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="9.785 − 4.263 = ⬜" />}
            pertanyaan="Tulis jawabannya!"
            pesanSalah="5 − 3 = 2."
            bantuan="Hasilnya 5.522."
            umpan="5.522."
            periksa={(teks) => adaHasil(teks, "5522")}
            alias={["5522"]}
            konteks="9.785 − 4.263 = 5.522."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Mengurangi dengan meminjam"
          warna="border-rose-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub4.jpg"
          alt="Rumah kiri menyerahkan kotak 10. Angka kiri dicoret menjadi lebih kecil."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau angka di bawah lebih besar, kita pinjam satu dari rumah sebelah kiri. Satu di rumah kiri bernilai sepuluh di rumah kanan.",
            "Setelah meminjam, rumah kiri dikurangi satu dan diberi tanda coret.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 6.253 − 2.487</p>
          <Langkah
            butir={[
              "Satuan 3 lebih kecil dari 7. Pinjam, 13 − 7 = 6.",
              "Puluhan 4 lebih kecil dari 8. Pinjam, 14 − 8 = 6.",
              "Ratusan 1 lebih kecil dari 4. Pinjam, 11 − 4 = 7.",
              "Ribuan: 5 − 2 = 3.",
            ]}
          />
          <Papan anak={"  5  11  14  13\n  6.253\n  2.487\n  ---------- −\n  3.766"} />
          <p className="text-sm font-black text-emerald-800">Trik: bawah lebih besar? Pinjam. Coret, kurang satu.</p>
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Pada 7.412 − 3.859, angka 7 sudah dicoret jadi 6. Setelah meminjam, angka ribuan jadi berapa?"
            periksa={jawabEnam}
            petunjuk="Tujuh dipinjam satu, jadi tinggal enam."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="8.304 − 4.676 = ⬜" />}
            pertanyaan="Hitung dan tulis jawabannya!"
            pesanSalah="Satuan 4 lebih kecil dari 6. Pinjam dulu."
            bantuan="14 − 6 = 8, 9 − 7 = 2, 12 − 6 = 6, 7 − 4 = 3. Jadi 3.628."
            umpan="3.628."
            periksa={(teks) => adaHasil(teks, "3628")}
            alias={["3628"]}
            konteks="8.304 − 4.676 = 3.628."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Soal cerita"
          warna="border-emerald-200 bg-white"
          src="/doodle-mtk/mtk-3-bab2-sub5.jpg"
          alt="Empat ikon langkah berjajar dengan nomor besar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Soal cerita perlu diterjemahkan. Empat langkahnya: cari angka, cari kata kunci, tulis kalimat matematika, lalu hitung.",
            "Hapalkan kata kunci tambah dan kata kunci kurang.",
          ]}
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 px-3 py-3">
              <p className="text-sm font-black text-emerald-800">Kata kunci tambah</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">datang, ditambah, diberi lagi, masuk, jumlahkan, semuanya</p>
            </div>
            <div className="rounded-xl bg-rose-50 px-3 py-3">
              <p className="text-sm font-black text-rose-800">Kata kunci kurang</p>
              <p className="mt-1 text-sm font-semibold text-slate-700">dikirim, terjual, dipakai, sisa, tinggal, berkurang</p>
            </div>
          </div>
          <p className="text-sm font-black text-[#1C01A5]">Contoh: gudang punya 3.450 karung. Dikirim 1.280 karung.</p>
          <Langkah
            butir={[
              "Angka: 3.450 dan 1.280.",
              "Kata kunci dikirim artinya kurang.",
              "Kalimat: 3.450 − 1.280.",
              "Hitung: 2.170. Sisa 2.170 karung.",
            ]}
          />
          <p className="text-sm font-black text-emerald-800">Trik: baca dulu, jangan langsung hitung.</p>
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Kata terjual artinya tambah atau kurang?"
            periksa={artiKurang}
            petunjuk="Barang yang terjual pergi dari gudang."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="Ada 5.600 karung. Datang 2.150 karung lagi." />}
            pertanyaan="Tulis kalimat matematika dan hasilnya!"
            pesanSalah="Datang artinya bertambah."
            bantuan="5.600 + 2.150 = 7.750."
            umpan="5.600 + 2.150 = 7.750."
            periksa={(teks) => kalimatTambah(teks, "5600", "2150", "7750")}
            alias={["5600 + 2150 = 7750"]}
            konteks="5.600 + 2.150 = 7.750."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Soal mana yang tidak perlu menyimpan?"
          pilihan={[
            { huruf: "A", teks: "4.768 + 3.575" },
            { huruf: "B", teks: "2.431 + 3.124" },
            { huruf: "C", teks: "5.847 + 2.396" },
            { huruf: "D", teks: "6.758 + 2.486" },
          ]}
          benar="B"
          umpan="1 + 4 = 5, 3 + 2 = 5, 4 + 1 = 5, 2 + 3 = 5. Semua 9 atau kurang."
          salah="Cek jumlah setiap rumah. Kalau ada yang 10 atau lebih, harus menyimpan."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan soal dengan tekniknya."
          baris={[
            { kiri: "3.214 + 4.560", pilihan: TEKNIK, benar: "Tambah tanpa menyimpan" },
            { kiri: "7.845 − 3.612", pilihan: TEKNIK, benar: "Kurang tanpa meminjam" },
            { kiri: "5.234 − 2.876", pilihan: TEKNIK, benar: "Kurang dengan meminjam" },
          ]}
          umpan="3.214 + 4.560 tanpa simpanan. 7.845 − 3.612 tanpa pinjaman. 5.234 − 2.876 perlu pinjaman karena 4 lebih kecil dari 6."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun gerbong dari hasil terkecil ke terbesar."
          acak={["4.000 + 4.500", "8.000 − 6.500", "9.000 − 2.800", "3.400 + 2.100"]}
          benar={["8.000 − 6.500", "3.400 + 2.100", "9.000 − 2.800", "4.000 + 4.500"]}
          umpan="Hasilnya 1.500, 5.500, 6.200, lalu 8.500."
          salah="Hitung tiap gerbong dulu: 1.500, 5.500, 6.200, 8.500."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "Pada 6.251 − 2.478, angka 6 menjadi 5.", benar: true },
            { teks: "5.400 + 3.700 = 9.100 tanpa menyimpan.", benar: false },
            { teks: "Hasil 9.999 − 4.999 = 5.000.", benar: true },
          ]}
          umpan="Benar, salah, benar. 4 + 7 = 11, jadi 5.400 + 3.700 perlu menyimpan."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. 2.⬜00 + 3.400 = 6.100. Angka yang hilang adalah..."
          visual={<Papan anak="2.⬜00 + 3.400 = 6.100" />}
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "7" },
            { huruf: "D", teks: "8" },
          ]}
          benar="C"
          umpan="6.100 − 3.400 = 2.700. Angka ratusannya 7."
          salah="Kurangkan 3.400 dari 6.100."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Bawah lebih besar, pinjam dari kiri."
          alias={["pinjam", "kiri"]}
          konteks="Bawah lebih besar, pinjam dari kiri."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB2.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🚚🐨"
        judul={kartu.judul}
        anak="Sepuluh pos · tambah, simpan, kurang, pinjam"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini, kalian menjadi kepala ekspedisi. Truk datang membawa muatan, truk pergi mengirim muatan.",
          "Kalau muatan bertambah, kalian menjumlahkan. Kalau muatan berkurang, kalian mengurangi. Kalau lebih dari sembilan, pindahkan ke bak sebelah. Kalau kurang, pinjam dari bak depan.",
          "Ayo berangkat!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-bab2-permainan.jpg"
        alt="Jalan raya, truk besar, gudang, dan koala berpeci di pos pemeriksaan."
        ukuran="lebar"
      />
      <PanduanIkon
        judul="Simbol ekspedisi"
        butir={[
          { ikon: "📦", teks: "Muatan datang" },
          { ikon: "📌", teks: "Simpan" },
          { ikon: "🚚", teks: "Muatan pergi" },
          { ikon: "🔄", teks: "Pinjam" },
          { ikon: "👷", teks: "Kepala ekspedisi" },
        ]}
      />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu kepala ekspedisi. Muatan bertambah dijumlahkan. Muatan berkurang dikurangi. Hasil benar, truk boleh berangkat.</p>
        <p>Level 1: 3.215 + 2.174. Level 2: 4.867 + 3.459, satuan meluap jadi simpan 1. Level 3: 8.542 − 3.216.</p>
        <p>Level 4: 7.324 − 4.568, satuan kurang jadi pinjam. Level 5: 3.500 + 2.750 = 6.250, lalu 6.250 − 4.200 = 2.050.</p>
        <p>Jalan Tol soalnya langsung, hadiahnya 1 truk. Jalan Pegunungan soalnya bertingkat, hadiahnya lebih besar.</p>
        <p>Lampu Sorot membantu melihat muatan, tetapi mengurangi 1 truk. Berani tanpa bantuan menambah 1 truk.</p>
        <p>Salah hitung berarti peti hilang di jalan. Palang terbuka lagi dan kamu boleh mengulang. Truk tidak berkurang.</p>
        <p>Mode berdua: pemain A menghitung tambah, pemain B menghitung kurang. Keduanya harus bertemu di angka yang sama.</p>
        <p>Kumpulkan 10 truk untuk membuka Rute Ekspres dan mendapat topi kepala ekspedisi.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK3_BAB2}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK3_BAB2}
        penutup="Rute Ekspres terbuka. Bunda Kiki memasang topi kepala ekspedisi."
        bunga="🚚📦👷🐨"
      />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal ekspedisi</h5>
        <Pilih
          id={idKuis("C", 10)}
          pertanyaan="1. Truk punya 4.216 peti, datang 3.472 peti lagi. Berapa totalnya?"
          pilihan={[
            { huruf: "A", teks: "7.688" },
            { huruf: "B", teks: "7.588" },
            { huruf: "C", teks: "7.678" },
            { huruf: "D", teks: "8.688" },
          ]}
          benar="A"
          umpan="6 + 2 = 8, 1 + 7 = 8, 2 + 4 = 6, 4 + 3 = 7. Jadi 7.688."
          salah="Jumlahkan dari satuan. Tidak ada yang disimpan."
        />
        <Pilih
          id={idKuis("C", 11)}
          pertanyaan="2. Pada 5.847 + 2.396, satuannya 7 + 6 = 13. Apa yang harus dilakukan?"
          pilihan={[
            { huruf: "A", teks: "Buang angka 1" },
            { huruf: "B", teks: "Tulis 3, simpan 1 ke puluhan" },
            { huruf: "C", teks: "Tulis 13 langsung" },
            { huruf: "D", teks: "Balik posisi kedua bilangan" },
          ]}
          benar="B"
          umpan="Tulis 3 di satuan, simpan 1 ke puluhan."
          salah="13 tidak bisa ditulis utuh di satu rumah."
        />
        <KuisCocok
          id={idKuis("C", 12)}
          perintah="3. Pasangkan hitungan dengan hasilnya."
          baris={[
            { kiri: "6.400 + 2.500", pilihan: HASIL_C, benar: "8.900" },
            { kiri: "8.700 − 3.100", pilihan: HASIL_C, benar: "5.600" },
            { kiri: "5.600 − 1.400", pilihan: HASIL_C, benar: "4.200" },
          ]}
          umpan="8.900, 5.600, dan 4.200."
        />
        <SusunToken
          id={idKuis("C", 13)}
          perintah="4. Susun muatan dari yang terkecil ke terbesar."
          acak={["9.200", "4.750", "6.800", "2.510", "8.140"]}
          benar={["2.510", "4.750", "6.800", "8.140", "9.200"]}
          umpan="2.510, 4.750, 6.800, 8.140, 9.200."
        />
        <KuisBenarSalah
          id={idKuis("C", 14)}
          perintah="5. Cek truk."
          baris={[
            { teks: "Pada 8.241 − 3.876, angka 8 menjadi 7.", benar: true },
            { teks: "5.300 + 2.900 tidak perlu menyimpan.", benar: false },
            { teks: "Pada 4.512 − 2.867, satuan menjadi 12.", benar: true },
          ]}
          umpan="Benar, salah, benar. 3 + 9 = 12, jadi perlu menyimpan."
        />
        <Pilih
          id={idKuis("C", 15)}
          pertanyaan="6. 3.⬜00 + 4.200 = 7.500. Angka yang hilang adalah..."
          visual={<Papan anak="3.⬜00 + 4.200 = 7.500" />}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "5" },
          ]}
          benar="B"
          umpan="7.500 − 4.200 = 3.300. Angka ratusannya 3."
          salah="Kurangkan 4.200 dari 7.500."
        />
        <Pilih
          id={idKuis("C", 16)}
          pertanyaan="7. Truk membawa 9.005 peti, dikirim 4.376 peti. Berapa sisanya?"
          pilihan={[
            { huruf: "A", teks: "4.629" },
            { huruf: "B", teks: "4.639" },
            { huruf: "C", teks: "4.729" },
            { huruf: "D", teks: "5.629" },
          ]}
          benar="A"
          umpan="Pinjam berantai: 15 − 6 = 9, 9 − 7 = 2, 9 − 3 = 6, 8 − 4 = 4. Jadi 4.629."
          salah="Ada angka nol. Pinjamannya berantai sampai ribuan."
        />
        <Pilih
          id={idKuis("C", 17)}
          pertanyaan="8. Muatan naik 400: 2.100 – 2.500 – 2.900 – ⬜. Berikutnya..."
          pilihan={[
            { huruf: "A", teks: "3.200" },
            { huruf: "B", teks: "3.300" },
            { huruf: "C", teks: "3.400" },
            { huruf: "D", teks: "3.500" },
          ]}
          benar="B"
          umpan="2.900 + 400 = 3.300."
          salah="Tambahkan 400 pada 2.900."
        />
        <KuisSuara
          id={idKuis("C", 18)}
          pertanyaan="Truk membawa lima ribu dua ratus peti, ditambah tiga ribu seratus peti. Sebutkan jumlah totalnya."
          periksa={baca8300}
          petunjuk="Jumlahkan 5.200 dan 3.100, lalu ucapkan hasilnya."
        />
        <TulisBebas
          id={idKuis("C", 19)}
          judul="Dua langkah muatan"
          visual={<Papan anak="Gudang punya 6.400 peti. Datang 2.350. Lalu dikirim 4.500." />}
          pertanyaan="Tulis dua langkah pengerjaan dan hasil akhirnya!"
          pesanSalah="Jumlahkan yang datang dulu, baru kurangi yang dikirim."
          bantuan="6.400 + 2.350 = 8.750. Lalu 8.750 − 4.500 = 4.250."
          umpan="8.750, lalu sisa 4.250."
          periksa={duaLangkahMuatan}
          alias={["8750", "4250"]}
          konteks="6.400 + 2.350 = 8.750. 8.750 − 4.500 = 4.250."
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_BAB2.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "👷 Kepala Ekspedisi Ahli" : skor >= 6 ? "🚚 Kurir Cerdas" : "🐨 Sahabat Bunda Kiki";
  const pesan =
    skor >= 9
      ? "Luar biasa! Semua muatanmu sampai dengan aman!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi kepala ekspedisi!"
        : "Ayo berlatih lagi, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🐨"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal penjumlahan dan pengurangan sampai 10.000.",
          "Beberapa soal menghitung langsung, beberapa memakai soal cerita. Ingat: simpanan harus dihitung, dan setelah meminjam rumahnya harus dikurangi satu.",
          "Jangan terburu-buru, dan periksa lagi jawabanmu. Selamat mengerjakan!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-bab2-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan truk mainan. Koala mengangkat tangan."
        ukuran="lebar"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Hitung bersusun"
          visual={<Papan anak={"  5.748\n  3.276\n  ----- +\n    ⬜"} />}
          pertanyaan="Tulis hasil akhirnya!"
          pesanSalah="8 + 6 = 14. Tulis 4, simpan 1. Simpanan muncul lagi di puluhan dan ratusan."
          bantuan="Simpanan 1, 1, dan 1. Hasilnya 9.024."
          umpan="9.024. Simpanannya tiga kali."
          periksa={(teks) => adaHasil(teks, "9024")}
          alias={["9024", "9.024"]}
          konteks="5.748 + 3.276 = 9.024. Simpanan tiga kali."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Berapa 6.786 + 2.458?"
          visual={<Papan anak={"   1 1 1\n  6.786\n  2.458\n  ----- +"} />}
          pilihan={[
            { huruf: "A", teks: "9.244" },
            { huruf: "B", teks: "8.244" },
            { huruf: "C", teks: "9.144" },
            { huruf: "D", teks: "9.234" },
          ]}
          benar="A"
          umpan="6 + 8 = 14, 1 + 8 + 5 = 14, 1 + 7 + 4 = 12, 1 + 6 + 2 = 9. Jadi 9.244."
          salah="Ada tiga simpanan. Kalau satu terlewat, hasilnya meleset seribu atau seratus."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="Baca hasil 7.483 dengan benar."
          periksa={baca7483}
          petunjuk="Mulai dari ribuan."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Sinta menulis 8.243 − 3.876 = 4.367. Apakah Sinta benar?"
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, seharusnya 4.477" },
            { huruf: "C", teks: "Salah, seharusnya 4.357" },
            { huruf: "D", teks: "Salah, seharusnya 5.367" },
          ]}
          benar="A"
          umpan="13 − 6 = 7, 13 − 7 = 6, 11 − 8 = 3, 7 − 3 = 4. Jadi 4.367."
          salah="Hitung ulang dari satuan. Pinjamannya tiga kali."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan soal dengan teknik yang tepat."
          baris={[
            { kiri: "4.216 + 3.472", pilihan: TEKNIK_EVAL, benar: "Tambah tanpa menyimpan" },
            { kiri: "5.264 − 3.142", pilihan: TEKNIK_EVAL, benar: "Kurang tanpa meminjam" },
            { kiri: "7.324 − 4.568", pilihan: TEKNIK_EVAL, benar: "Kurang dengan meminjam" },
          ]}
          umpan="4.216 + 3.472 tanpa simpanan. 5.264 − 3.142 tanpa pinjaman. 7.324 − 4.568 perlu pinjaman."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Meminjam dengan rapi"
          visual={<Papan anak={"  9.002\n  4.537\n  ----- −\n    ⬜"} />}
          pertanyaan="Tulis jawabannya!"
          pesanSalah="Satuan 2 lebih kecil dari 7. Angka nol ikut dipinjam."
          bantuan="12 − 7 = 5, 9 − 3 = 6, 9 − 5 = 4, 8 − 4 = 4. Jadi 4.465."
          umpan="4.465."
          periksa={(teks) => adaHasil(teks, "4465")}
          alias={["4465", "4.465"]}
          konteks="9.002 − 4.537 = 4.465."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. ⬜.250 + 3.480 = 9.730. Angka yang hilang..."
          visual={<Papan anak="⬜.250 + 3.480 = 9.730" />}
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "7" },
            { huruf: "D", teks: "8" },
          ]}
          benar="B"
          umpan="9.730 − 3.480 = 6.250. Angka ribuannya 6."
          salah="Kurangkan 3.480 dari 9.730."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari hasil terkecil ke terbesar."
          acak={["4.500 + 3.700", "9.200 − 2.400", "2.600 + 3.100", "8.000 − 6.700"]}
          benar={["8.000 − 6.700", "2.600 + 3.100", "9.200 − 2.400", "4.500 + 3.700"]}
          umpan="Hasilnya 1.300, 5.700, 6.800, lalu 8.200."
          salah="Hitung dulu: 8.200, 6.800, 5.700, dan 1.300."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="Gudang punya 7.500 karung. Dikirim 2.850 karung. Ucapkan kata kuncinya dan sebutkan operasinya."
          periksa={artiKurang}
          petunjuk="Sebut kata dikirim, lalu sebut kurang."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Kasus gudang Bunda Kiki"
          visual={<Papan anak={"Pagi 5.400\nSiang datang 2.750\nSore dikirim 4.150"} />}
          pertanyaan="Tulis isi setelah siang, isi akhir hari, dan apakah akhir hari lebih banyak atau lebih sedikit dari pagi."
          pesanSalah="Jumlahkan yang datang dulu, baru kurangi yang dikirim, lalu bandingkan dengan 5.400."
          bantuan="8.150 setelah siang. Akhir hari 4.000, lebih sedikit dari pagi."
          umpan="8.150, lalu 4.000, lebih sedikit."
          periksa={kasusGudang}
          alias={["8150", "4000", "lebih sedikit"]}
          konteks="5.400 + 2.750 = 8.150. 8.150 − 4.150 = 4.000. Lebih sedikit dari pagi."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Satuan dulu, ribuan belakangan."
          alias={["satuan", "ribuan"]}
          konteks="Satuan dulu, ribuan belakangan."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">
          Seluruh soal memakai bilangan sampai 10.000: penjumlahan, pengurangan, dan soal cerita.
        </p>
        <p className="mt-2">
          Kesalahan yang paling sering: lupa menambahkan simpanan, lupa mengurangi rumah yang dipinjam, dan salah memilih operasi pada soal cerita.
        </p>
        <p className="mt-2">
          Soal 1, 2, dan 6 menuntut jejak pengerjaan. Soal 4 mengajak anak menghitung ulang 8.243 − 3.876, yang hasilnya memang 4.367. Soal 10 punya tiga langkah: setelah siang, akhir hari, lalu perbandingan dengan pagi.
        </p>
        <p className="mt-2">
          Gunakan kartu nilai tempat berwarna dan stik es krim untuk memperagakan menyimpan serta meminjam. Anak yang sudah lancar lisan sering masih goyah saat menuliskan coretannya.
        </p>
      </aside>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Bab2({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Satuan dulu, ribuan belakangan. Selalu dari kanan ke kiri.",
    "Lebih dari sembilan? Simpan satu ke kiri.",
    "Simpanan kecil itu wajib dihitung.",
    "Bawah lebih besar? Pinjam dari kiri.",
    "Sudah meminjam? Coret, kurang satu.",
    "Terjual, dikirim, dipakai — itu semua kurang.",
    "Soal campuran dikerjakan berurutan, satu langkah dulu.",
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
          src: "/doodle-mtk/mtk-3-bab2-poin.jpg",
          alt: "Bunda Kiki berdiri di papan kalimat kunci. Truk kecil membawa angka di sekelilingnya.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Kerjakan dari satuan, lalu naik ke puluhan, ratusan, dan ribuan.",
          "Kalau lebih dari sembilan, simpan satu ke kiri. Kalau bawah lebih besar, pinjam dari kiri dan jangan lupa kurangi rumahnya.",
          "Untuk soal cerita, cari angka, cari kata kunci, tulis, lalu hitung.",
        ])}
        poin={poin}
        penutup="Satuan dulu. Simpanan dihitung. Pinjaman dicoret."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
