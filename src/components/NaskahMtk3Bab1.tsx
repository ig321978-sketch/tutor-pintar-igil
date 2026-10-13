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
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK3_BAB1, TEMA_MTK3_BAB1 } from "@/lib/misi-mtk-3-bab1";
import { MODUL_MTK3_BAB1 } from "@/lib/modul-resmi-mtk-3-bab1";
import {
  alasan8001,
  baca3568,
  baca4930,
  baca5402,
  baca8090,
  lebihBesar5671,
  lebihBesar6521,
  nilaiTigaRatus,
  nilaiTujuhRatus,
  palingKecil3700,
  palingKecil4005,
  pecah6751,
  pecah7916,
  pecah9123,
  pecah9406,
  simbolBanding,
  tulis6293,
  tulis7905,
  turnamenBulu,
  urutEvaluasi,
  urutKartuB,
  urutSub4,
} from "@/lib/nilai-mtk-3-bab1";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_BAB1.id;

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
  Aldi: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Naya: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Fikri: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Bulu: "border-teal-300 bg-teal-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Aldi: "👦",
  Naya: "👧",
  Fikri: "👦",
  Bulu: "🐼",
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
    <p className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan rumah angkanya." />
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
  salah = "Lihat angkanya dari kiri, lalu susun lagi.",
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
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi rumah angkanya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const RUMAH = [
  { ikon: "🟦", teks: "Ribuan" },
  { ikon: "🔵", teks: "Ratusan" },
  { ikon: "🟨", teks: "Puluhan" },
  { ikon: "🟡", teks: "Satuan" },
];

const BACAAN_A = ["Sembilan ribu dua ratus tujuh puluh", "Tiga ribu lima ratus tujuh", "Enam ribu tiga"];
const NILAI_B = ["80", "6.000", "400"];
const BACAAN_C = ["Lima ribu tujuh ratus satu", "Dua ribu sembilan puluh", "Empat ribu delapan"];
const ANGKA_BESAR = ["Ratusan: 8", "Ribuan: 8", "Puluhan: 9"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB1.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="👦👧🐼"
        judul={kartu.judul}
        anak="Aldi, Naya, Fikri, dan Panda Bulu"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: membaca, menulis, membandingkan, dan mengurutkan bilangan sampai 10.000, serta memahami nilai tempat.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Membaca bilangan ribuan"
          warna="border-sky-200 bg-sky-50/60"
          src="/doodle-mtk/mtk-3-bab1-sub1.jpg"
          alt="Lapangan sekolah dengan papan skor 4725. Aldi memegang catatan, Naya memegang stopwatch, dan panda berdiri di samping papan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Anak-anak, sampai sekarang kalian sudah bisa menghitung sampai 999. Sekarang kita naik satu tingkat lagi, sampai 10.000.",
            "Bilangan ribuan punya empat angka. Angka paling kiri menunjukkan ribuan. Ayo kita baca bersama-sama!",
          ]}
          simbol={RUMAH}
        >
          <Dialog nama="Aldi" anak="Naya, papan skor ini menulis 4.725 langkah. Itu dibaca apa?" />
          <Dialog nama="Naya" anak="Empat ribu tujuh ratus dua puluh lima!" />
          <Dialog nama="Fikri" anak="Kok bisa sepanjang itu?" />
          <Dialog nama="Aldi" anak="Karena setiap angka punya nama rumahnya. 4 ribuan, 7 ratusan, 2 puluhan, 5 satuan." />
          <Dialog nama="Bulu" anak="Ayo baca lengkap! Empat ribu tujuh ratus dua puluh lima!" />
          <Dialog nama="Naya" anak="Ada titiknya juga, ya. Itu untuk apa?" />
          <Dialog nama="Aldi" anak="Titik itu pemisah ribuan. Supaya angkanya mudah dibaca." />
          <Dialog nama="Fikri" anak="Jadi 4.725 dan 4725 itu angka yang sama?" />
          <Dialog nama="Bulu" anak="Sama! Titiknya cuma hiasan biar rapi!" />
          <Papan anak="4.725 = 4 ribuan + 7 ratusan + 2 puluhan + 5 satuan" />
          <p className="text-center text-sm font-bold text-slate-700">Dibaca: empat ribu tujuh ratus dua puluh lima.</p>
          <p className="text-sm font-black text-[#1C01A5]">Bilangan ribuan punya 4 angka. Baca dari kiri ke kanan sesuai nama rumahnya.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Baca bilangan 3.568 dengan lengkap!"
            periksa={baca3568}
            petunjuk="Mulai dari kiri. Angka pertamanya ribuan."
            benar="Bagus! Kamu sudah bisa baca bilangan ribuan!"
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Tulis dari bacaan"
            visual={<Papan anak="enam ribu dua ratus sembilan puluh tiga" />}
            pertanyaan="Dengarkan bilangannya, lalu tulis: enam ribu dua ratus sembilan puluh tiga."
            pesanSalah="Mulai dari ribuan: enam ribu."
            bantuan="Empat rumah: ribuan 6, ratusan 2, puluhan 9, satuan 3. Jadi 6.293."
            umpan="6.293."
            periksa={tulis6293}
            alias={["6293", "6.293", "enam ribu dua ratus sembilan puluh tiga"]}
            konteks="Jawabannya 6.293."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Nilai tempat ribuan sampai satuan"
          warna="border-indigo-200 bg-indigo-50/60"
          src="/doodle-mtk/mtk-3-bab1-sub2.jpg"
          alt="Papan tulis bertuliskan 6482. Angka 4 berjalan ke rumah yang berbeda dan memunculkan balon 4, 40, 400, dan 4000."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Setiap angka punya nilai asli dan nilai tempat. Angka 4 kalau berdiri di rumah satuan, nilainya cuma 4.",
            "Tapi kalau berdiri di rumah ribuan, nilainya 4.000. Jauh sekali, kan? Ayo kita pelajari.",
          ]}
          simbol={RUMAH}
        >
          <Dialog nama="Aldi" anak="Perhatikan angka 6.482. Berapa nilai angka 8?" />
          <Dialog nama="Fikri" anak="Delapan?" />
          <Dialog nama="Naya" anak="Cek rumahnya dulu! Angka 8 ada di puluhan. Jadi nilainya 80." />
          <Dialog nama="Aldi" anak="Nah, itu bedanya nilai asli dan nilai tempat." />
          <Dialog nama="Bulu" anak="Angka aslinya 8, tapi nilai tempatnya 80!" />
          <Dialog nama="Fikri" anak="Kalau angka 4 di situ?" />
          <Dialog nama="Naya" anak="Rumahnya ratusan. Jadi nilainya 400." />
          <Dialog nama="Aldi" anak="Dan angka 6 di ribuan, nilainya 6.000." />
          <Papan anak="6.482 = 6.000 + 400 + 80 + 2" />
          <p className="text-sm font-semibold text-slate-700">Setiap angka pindah satu rumah ke kiri, nilainya dikali 10.</p>
          <p className="text-sm font-black text-[#1C01A5]">Nilai tempat tergantung posisinya. Rumah kiri selalu lebih besar.</p>
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Pada 5.374, berapa nilai angka tiga? Ucapkan!"
            periksa={nilaiTigaRatus}
            petunjuk="Lihat rumahnya dulu. Angka 3 ada di rumah apa?"
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Pemecahan nilai tempat"
            visual={<Papan anak="7.916 = ⬜ + ⬜ + ⬜ + ⬜" />}
            pertanyaan="Tulis pemecahan nilai tempatnya!"
            pesanSalah="Ribuan, ratusan, puluhan, lalu satuan."
            bantuan="Rumahnya: ribuan 7.000, ratusan 900, puluhan 10, satuan 6."
            umpan="7.000 + 900 + 10 + 6."
            periksa={pecah7916}
            alias={["7000 + 900 + 10 + 6", "tujuh ribu sembilan ratus sepuluh enam"]}
            konteks="7.916 = 7.000 + 900 + 10 + 6."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Membandingkan bilangan"
          warna="border-amber-200 bg-amber-50/70"
          src="/doodle-mtk/mtk-3-bab1-sub3.jpg"
          alt="Dua bilangan berdiri di atas timbangan. Papan skor menunjukkan 3842 dan 3291, dengan penggaris pemeriksaan dari kiri ke kanan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk membandingkan bilangan ribuan, kita lihat dari angka paling kiri dulu.",
            "Kalau angka ribuan sudah beda, kita tidak perlu melihat angka lainnya. Kalau sama, baru kita lanjut ke ratusan, puluhan, lalu satuan.",
          ]}
        >
          <Dialog nama="Naya" anak="Merah 3.842, Biru 3.291. Mana yang menang?" />
          <Dialog nama="Fikri" anak="Ribuan sama-sama 3! Bagaimana?" />
          <Dialog nama="Aldi" anak="Kalau ribuan sama, lanjut ke ratusan. Merah 8, Biru 2." />
          <Dialog nama="Naya" anak="8 lebih besar dari 2. Jadi Merah menang!" />
          <Dialog nama="Bulu" anak="3.842 lebih besar dari 3.291! Merah juara!" />
          <Dialog nama="Aldi" anak="Kalau ribuan sudah beda, kita berhenti di situ. Misal 8.000 dan 7.999, ya 8.000 yang lebih besar." />
          <Dialog nama="Fikri" anak="Jadi 8.000 lebih besar dari 7.999 meskipun 7.999 punya banyak angka 9?" />
          <Dialog nama="Naya" anak="Iya! Karena ribuannya berbeda." />
          <Papan anak="3.842 > 3.291 karena ratusan 8 lebih besar dari 2. 8.000 > 7.999 karena ribuannya beda." />
          <p className="text-sm font-black text-[#1C01A5]">Bandingkan dari kiri. Ribuan dulu, baru ratusan, puluhan, satuan.</p>
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Mana yang lebih besar, 5.671 atau 5.619? Ucapkan angkanya!"
            periksa={lebihBesar5671}
            petunjuk="Ribuan dan ratusan sama. Lihat puluhannya: 7 dan 1."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Simbol perbandingan"
            visual={<Papan anak="[ 4.086 ] ⬜ [ 4.806 ]" />}
            pertanyaan="Tulis simbol lebih besar, lebih kecil, atau sama dengan."
            pesanSalah="Ribuan sama. Lihat ratusannya."
            bantuan="Ratusan 0 dan 8 berkedip. 0 lebih kecil dari 8, jadi 4.086 lebih kecil."
            umpan="4.086 lebih kecil dari 4.806."
            periksa={(teks) => simbolBanding(teks, "<")}
            alias={["lebih kecil", "kurang dari"]}
            konteks="4.086 lebih kecil dari 4.806."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Mengurutkan bilangan"
          warna="border-emerald-200 bg-emerald-50/70"
          src="/doodle-mtk/mtk-3-bab1-sub4.jpg"
          alt="Lima anak tangga dengan bilangan, panah naik dan panah turun. Aldi memasang kartu nama di papan hasil lomba."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Mengurutkan bilangan artinya menyusun dari yang terkecil ke terbesar, atau sebaliknya.",
            "Caranya, bandingkan angka ribuannya dulu, kelompokkan, lalu rapikan di dalam kelompok yang sama.",
          ]}
        >
          <Dialog nama="Aldi" anak="Skornya: 6.540, 2.180, 6.290, 9.050, 2.990. Ayo urutkan dari terkecil!" />
          <Dialog nama="Naya" anak="Kelompokkan dulu ribuannya. Yang 2.000-an ada dua, yang 6.000-an ada dua." />
          <Dialog nama="Fikri" anak="Jadi 2.180 dan 2.990 dulu. Mana yang lebih kecil?" />
          <Dialog nama="Naya" anak="2.180, karena ratusannya 1 lebih kecil dari 9." />
          <Dialog nama="Aldi" anak="Lalu 6.290 dan 6.540, baru terakhir 9.050." />
          <Papan anak="2.180 < 2.990 < 6.290 < 6.540 < 9.050" />
          <Dialog nama="Bulu" anak="Urutannya rapi! Dari kecil ke besar!" />
          <p className="text-sm font-black text-[#1C01A5]">Urutkan dengan mengelompokkan ribuan dulu, lalu rapikan di dalam kelompok.</p>
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Dari 7.300, 3.700, dan 7.030, sebutkan angka yang paling kecil."
            periksa={palingKecil3700}
            petunjuk="Lihat angka ribuannya dulu. Mana yang paling kecil?"
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Urutkan empat bilangan"
            visual={<Papan anak="5.482 · 1.905 · 8.040 · 3.276" />}
            pertanyaan="Urutkan dari yang paling kecil ke paling besar!"
            pesanSalah="Kelompokkan ribuannya dulu."
            bantuan="Yang benar berkedip hijau: 1.905, lalu 3.276, lalu 5.482, lalu 8.040."
            umpan="1.905, 3.276, 5.482, 8.040."
            periksa={urutSub4}
            alias={["1905 3276 5482 8040"]}
            konteks="Urutan: 1.905, 3.276, 5.482, 8.040."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 8)}
          pertanyaan="1. Pada 8.463, berapa nilai angka 4?"
          visual={<Papan anak="8.463" />}
          pilihan={[
            { huruf: "A", teks: "4" },
            { huruf: "B", teks: "40" },
            { huruf: "C", teks: "400" },
            { huruf: "D", teks: "4.000" },
          ]}
          benar="C"
          umpan="Angka 4 ada di rumah ratusan, nilainya 400."
          salah="Lihat rumah angka 4. Bukan satuan."
        />
        <KuisCocok
          id={idKuis("A", 9)}
          perintah="2. Pasangkan bilangan dengan cara bacanya."
          baris={[
            { kiri: "3.507", pilihan: BACAAN_A, benar: "Tiga ribu lima ratus tujuh" },
            { kiri: "9.270", pilihan: BACAAN_A, benar: "Sembilan ribu dua ratus tujuh puluh" },
            { kiri: "6.003", pilihan: BACAAN_A, benar: "Enam ribu tiga" },
          ]}
          umpan="3.507 tiga ribu lima ratus tujuh. 9.270 sembilan ribu dua ratus tujuh puluh. 6.003 enam ribu tiga."
        />
        <SusunToken
          id={idKuis("A", 10)}
          perintah="3. Susun dari yang terkecil ke terbesar."
          acak={["7.040", "4.700", "7.400", "4.070"]}
          benar={["4.070", "4.700", "7.040", "7.400"]}
          umpan="4.070, 4.700, 7.040, 7.400."
        />
        <KuisBenarSalah
          id={idKuis("A", 11)}
          perintah="4. Detektif bilangan. Periksa tiga pernyataan."
          baris={[
            { teks: "Pada 5.728, angka 5 bernilai 5.000.", benar: true },
            { teks: "8.000 lebih kecil dari 7.999.", benar: false },
            { teks: "Titik pada 4.725 adalah pemisah ribuan.", benar: true },
          ]}
          umpan="Benar, salah, benar. 8.000 lebih besar karena ribuannya 8."
        />
        <Pilih
          id={idKuis("A", 12)}
          pertanyaan="5. Deret 2.500 – 3.000 – 3.500 – ⬜ – 4.500. Angka yang hilang adalah..."
          visual={<Papan anak="2.500 · 3.000 · 3.500 · ⬜ · 4.500" />}
          pilihan={[
            { huruf: "A", teks: "3.900" },
            { huruf: "B", teks: "4.000" },
            { huruf: "C", teks: "4.100" },
            { huruf: "D", teks: "4.200" },
          ]}
          benar="B"
          umpan="Naik 500 setiap langkah. 3.500 + 500 = 4.000."
          salah="Hitung selisih 2.500 ke 3.000."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Baca dari kiri sesuai nama rumahnya."
          alias={["dari kiri", "rumah"]}
          konteks="Baca dari kiri sesuai nama rumahnya."
        />
      </div>
    </KartuBingkai>
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

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB1.kartu[1];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="📊"
        judul={kartu.judul}
        anak="Papan rumah angka"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Membaca dan menulis bilangan ribuan"
          warna="border-sky-200 bg-white"
          src="/doodle-mtk/mtk-3-bab1-sub1.jpg"
          alt="Empat rumah angka berjajar untuk bilangan ribuan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Bilangan ribuan punya empat angka. Kita membacanya dari kiri ke kanan.",
            "Angka pertama ribuan, kedua ratusan, ketiga puluhan, keempat satuan. Kalau ada angka nol di tengah, kita tidak perlu menyebutnya.",
          ]}
          simbol={RUMAH}
        >
          <TabelInfoGrafis
            judul="Rumah pada 4.725"
            kepala={["Rumah", "Nilai", "Angka"]}
            baris={[
              ["Ribuan", "× 1.000", "4"],
              ["Ratusan", "× 100", "7"],
              ["Puluhan", "× 10", "2"],
              ["Satuan", "× 1", "5"],
            ]}
          />
          <p className="text-sm font-black text-[#1C01A5]">Contoh: bagaimana membaca 6.084?</p>
          <Langkah
            butir={[
              "Ribuan: 6, dibaca enam ribu.",
              "Ratusan: 0, tidak disebut.",
              "Puluhan: 8, dibaca delapan puluh.",
              "Satuan: 4, dibaca empat.",
            ]}
          />
          <Papan anak="enam ribu delapan puluh empat" />
          <p className="text-sm font-black text-emerald-800">Trik: nol di tengah, tidak usah disebut.</p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Baca bilangan 5.402 dengan lengkap!"
            periksa={baca5402}
            petunjuk="Ratusan disebut. Puluhan 0 tidak disebut."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="tujuh ribu sembilan ratus lima" />}
            pertanyaan="Tulis angka dari: tujuh ribu sembilan ratus lima."
            pesanSalah="Tujuh ribuan, sembilan ratusan, puluhan nol, satuan lima."
            bantuan="Rumahnya 7, 9, 0, 5. Jadi 7.905."
            umpan="7.905."
            periksa={tulis7905}
            alias={["7905", "tujuh ribu sembilan ratus lima"]}
            konteks="Jawabannya 7.905."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Nilai tempat"
          warna="border-indigo-200 bg-white"
          src="/doodle-mtk/mtk-3-bab1-sub2.jpg"
          alt="Tangga nilai tempat. Satu langkah ke kiri dikali sepuluh."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Nilai tempat adalah nilai sebuah angka sesuai posisinya. Semakin ke kiri, nilainya semakin besar, tepat sepuluh kali lipat.",
            "Jadi satu langkah ke kiri berarti dikali sepuluh.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: pecah bilangan 8.359.</p>
          <TabelInfoGrafis
            judul="8.359"
            kepala={["Angka", "Rumah", "Nilai"]}
            baris={[
              ["8", "Ribuan", "8.000"],
              ["3", "Ratusan", "300"],
              ["5", "Puluhan", "50"],
              ["9", "Satuan", "9"],
            ]}
            kaki="8.000 + 300 + 50 + 9"
          />
          <p className="text-sm font-black text-emerald-800">Trik: pindah satu rumah ke kiri, dikali sepuluh.</p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Pada 2.745, berapa nilai angka 7?"
            periksa={nilaiTujuhRatus}
            petunjuk="Angka 7 ada di rumah ratusan."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="9.123 = ⬜ + ⬜ + ⬜ + ⬜" />}
            pertanyaan="Tulis pemecahan nilai tempatnya!"
            pesanSalah="Ribuan 9, ratusan 1, puluhan 2, satuan 3."
            bantuan="9.000 + 100 + 20 + 3."
            umpan="9.000 + 100 + 20 + 3."
            periksa={pecah9123}
            alias={["9000 + 100 + 20 + 3", "sembilan ribu seratus dua puluh tiga"]}
            konteks="9.123 = 9.000 + 100 + 20 + 3."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Membandingkan bilangan"
          warna="border-amber-200 bg-white"
          src="/doodle-mtk/mtk-3-bab1-sub3.jpg"
          alt="Empat kotak pemeriksaan dari ribuan sampai satuan, dengan panah dari kiri ke kanan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk membandingkan, periksa dari kiri ke kanan. Kalau ribuan sudah berbeda, berhenti di situ.",
            "Kalau sama, lanjut ke ratusan. Kalau masih sama, lanjut puluhan. Baru terakhir satuan.",
          ]}
        >
          <TabelInfoGrafis
            judul="Langkah membandingkan"
            kepala={["Langkah", "Periksa", "Kalau sama"]}
            baris={[
              ["1", "Ribuan", "Lanjut ratusan"],
              ["2", "Ratusan", "Lanjut puluhan"],
              ["3", "Puluhan", "Lanjut satuan"],
              ["4", "Satuan", "Nilainya sama"],
            ]}
          />
          <p className="text-sm font-black text-[#1C01A5]">Contoh: 4.376 atau 4.365?</p>
          <Langkah
            butir={["Ribuan 4 dan 4, sama.", "Ratusan 3 dan 3, sama.", "Puluhan 7 dan 6, beda. 7 lebih besar dari 6."]}
          />
          <Papan anak="4.376 lebih besar dari 4.365" />
          <p className="text-sm font-black text-emerald-800">Trik: sama terus? Lanjut. Beda? Berhenti di situ.</p>
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Mana yang lebih besar, 6.512 atau 6.521?"
            periksa={lebihBesar6521}
            petunjuk="Ribuan dan ratusan sama. Bandingkan puluhannya."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="[ 3.908 ] ⬜ [ 3.890 ]" />}
            pertanyaan="Tulis simbol yang tepat: lebih besar, lebih kecil, atau sama dengan."
            pesanSalah="Puluhan 0 dan 9. Mana yang lebih besar?"
            bantuan="3.908 lebih besar dari 3.890."
            umpan="3.908 lebih besar."
            periksa={(teks) => simbolBanding(teks, ">")}
            alias={["lebih besar"]}
            konteks="3.908 lebih besar dari 3.890."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Mengurutkan bilangan"
          warna="border-emerald-200 bg-white"
          src="/doodle-mtk/mtk-3-bab1-sub4.jpg"
          alt="Bilangan dimasukkan ke kantong ribuan, lalu diurutkan di dalam kantong."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk mengurutkan, kelompokkan dulu berdasarkan ribuan.",
            "Kalau sudah terkelompok, rapikan di dalam masing-masing kelompok dengan memeriksa ratusan, puluhan, lalu satuan.",
          ]}
        >
          <p className="text-sm font-black text-[#1C01A5]">Contoh: urutkan 5.208, 1.940, 5.080, 3.612.</p>
          <Langkah
            butir={[
              "Kelompok ribuan: 1.000-an, 3.000-an, dan 5.000-an.",
              "Di dalam 5.000-an, 5.080 lebih kecil dari 5.208.",
            ]}
          />
          <Papan anak="1.940 < 3.612 < 5.080 < 5.208" />
          <p className="text-sm font-black text-emerald-800">Trik: kelompokkan dulu, rapikan kemudian.</p>
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Dari 4.500, 4.050, dan 4.005, sebutkan yang paling kecil."
            periksa={palingKecil4005}
            petunjuk="Ratusan dan puluhan yang nol membuat bilangan lebih kecil."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="2.760 · 2.067 · 2.670" />}
            pertanyaan="Urutkan dari kecil ke besar!"
            pesanSalah="Ribuan sama. Lihat ratusannya."
            bantuan="2.067, lalu 2.670, lalu 2.760."
            umpan="2.067, 2.670, 2.760."
            periksa={urutKartuB}
            alias={["2067 2670 2760"]}
            konteks="Urutan: 2.067, 2.670, 2.760."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 8)}
          pertanyaan="1. Manakah bacaan yang benar untuk 7.050?"
          visual={<Papan anak="7.050" />}
          pilihan={[
            { huruf: "A", teks: "Tujuh ribu lima" },
            { huruf: "B", teks: "Tujuh ribu lima puluh" },
            { huruf: "C", teks: "Tujuh ribu lima ratus" },
            { huruf: "D", teks: "Tujuh puluh lima" },
          ]}
          benar="B"
          umpan="Puluhan 5 dibaca lima puluh. Ratusannya nol, tidak disebut."
          salah="Lihat rumah puluhan, bukan ratusan."
        />
        <KuisCocok
          id={idKuis("B", 9)}
          perintah="2. Pada 6.487, pasangkan setiap angka dengan nilainya."
          baris={[
            { kiri: "Angka 6", pilihan: NILAI_B, benar: "6.000" },
            { kiri: "Angka 4", pilihan: NILAI_B, benar: "400" },
            { kiri: "Angka 8", pilihan: NILAI_B, benar: "80" },
          ]}
          umpan="6 di ribuan bernilai 6.000. 4 di ratusan bernilai 400. 8 di puluhan bernilai 80."
        />
        <SusunToken
          id={idKuis("B", 10)}
          perintah="3. Susun dari terbesar ke terkecil."
          acak={["3.099", "9.003", "3.909", "9.300"]}
          benar={["9.300", "9.003", "3.909", "3.099"]}
          umpan="9.300, 9.003, 3.909, 3.099."
        />
        <KuisBenarSalah
          id={idKuis("B", 11)}
          perintah="4. Cek bilangan. Periksa tiga pernyataan."
          baris={[
            { teks: "Pada 4.506, angka 5 bernilai 500.", benar: true },
            { teks: "Nol di tengah bilangan selalu disebut saat membaca.", benar: false },
            { teks: "9.999 lebih besar dari 10.000.", benar: false },
          ]}
          umpan="Benar, salah, salah. Sepuluh ribu lebih besar dari 9.999."
        />
        <Pilih
          id={idKuis("B", 12)}
          pertanyaan="5. Ribuanku 5, ratusanku 0, puluhanku 7, satuanku 2. Aku bilangan..."
          pilihan={[
            { huruf: "A", teks: "5.072" },
            { huruf: "B", teks: "5.720" },
            { huruf: "C", teks: "5.027" },
            { huruf: "D", teks: "5.702" },
          ]}
          benar="A"
          umpan="5 ribuan, 0 ratusan, 7 puluhan, 2 satuan. Jadi 5.072."
          salah="Susun dari kiri: ribuan, ratusan, puluhan, satuan."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Nol di tengah tidak disebut."
          alias={["nol", "tidak disebut"]}
          konteks="Nol di tengah tidak disebut."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB1.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🏗️🐼"
        judul={kartu.judul}
        anak="Sepuluh pos · baca, bandingkan, urutkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini, kalian menjadi pencatat skor di turnamen besar. Setiap pemain punya skor ribuan.",
          "Tugas kalian adalah membaca, membandingkan, dan mengurutkan skor dengan tepat. Kalau catatanmu benar, menara skor naik satu tingkat.",
          "Ayo kita mulai!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-bab1-permainan.jpg"
        alt="Stadion dengan papan skor raksasa, menara empat tingkat, dan panda di meja juri."
        ukuran="lebar"
      />
      <PanduanIkon
        judul="Simbol menara"
        butir={[
          { ikon: "📋", teks: "Baca skor" },
          { ikon: "⚖️", teks: "Bandingkan" },
          { ikon: "🪜", teks: "Urutkan" },
          { ikon: "🔍", teks: "Skor hilang" },
          { ikon: "🏆", teks: "Piala" },
        ]}
      />
      <div className="mt-4 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Kamu pencatat skor. Catatan yang benar menaikkan menara satu tingkat.</p>
        <p>Level 1 membaca 4.827. Level 2 membandingkan 3.462 dan 3.426. Level 3 mengurutkan lima skor.</p>
        <p>Level 4 melengkapi 7.0⬜5. Angka yang hilang ada di puluhan dan nilainya 40, jadi skornya 7.045.</p>
        <p>Level 5 memakai 7.045 itu lagi, lalu mengurutkan papan yang lengkap. Salah di awal membuat urutan Level 5 ikut meleset.</p>
        <p>Meja Pemula memakai skor yang lebih mudah, hadiahnya 1 piala. Meja Juara memakai skor empat angka, hadiahnya lebih besar.</p>
        <p>Kaca Juri membantu melihat nilai tempat, tetapi mengurangi 1 piala. Berani tanpa bantuan menambah 1 piala.</p>
        <p>Salah mencatat berarti pemain naik podium yang keliru. Papan berkedip: coba lagi. Piala tidak berkurang.</p>
        <p>Mode berdua: pemain A membaca skor, pemain B menulis pemecahannya. Keduanya harus cocok sebelum menara naik.</p>
        <p>Kumpulkan 10 piala untuk membuka Podium Juara dan mendapat lencana pencatat skor.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK3_BAB1}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK3_BAB1}
        penutup="Podium Juara terbuka. Bulu memasang lencana pencatat skor."
        bunga="🏟️🏆🥇🐼"
      />
      <div className="mt-5 space-y-3">
        <h5 className="text-center text-base font-black text-[#1C01A5]">Sepuluh soal menara</h5>
        <Pilih
          id={idKuis("C", 10)}
          pertanyaan="1. Skor 6.305. Mana bacaan yang tepat?"
          visual={<Papan anak="6.305" />}
          pilihan={[
            { huruf: "A", teks: "Enam ribu tiga ratus lima" },
            { huruf: "B", teks: "Enam ribu tiga puluh lima" },
            { huruf: "C", teks: "Enam ribu tiga ratus lima puluh" },
            { huruf: "D", teks: "Enam puluh tiga ribu lima" },
          ]}
          benar="A"
          umpan="Ratusan 3 disebut. Puluhan 0 tidak disebut."
          salah="Baca dari kiri. Jangan sebut angka nol di tengah."
        />
        <Pilih
          id={idKuis("C", 11)}
          pertanyaan="2. Pada 8.247, berapa nilai angka 2?"
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "20" },
            { huruf: "C", teks: "200" },
            { huruf: "D", teks: "2.000" },
          ]}
          benar="C"
          umpan="Angka 2 ada di rumah ratusan."
          salah="Hitung dari kanan: satuan, puluhan, baru ratusan."
        />
        <KuisCocok
          id={idKuis("C", 12)}
          perintah="3. Pasangkan skor dengan cara bacanya."
          baris={[
            { kiri: "2.090", pilihan: BACAAN_C, benar: "Dua ribu sembilan puluh" },
            { kiri: "5.701", pilihan: BACAAN_C, benar: "Lima ribu tujuh ratus satu" },
            { kiri: "4.008", pilihan: BACAAN_C, benar: "Empat ribu delapan" },
          ]}
          umpan="2.090 dua ribu sembilan puluh. 5.701 lima ribu tujuh ratus satu. 4.008 empat ribu delapan."
        />
        <SusunToken
          id={idKuis("C", 13)}
          perintah="4. Susun dari terkecil ke terbesar."
          acak={["4.560", "4.065", "4.650", "4.506"]}
          benar={["4.065", "4.506", "4.560", "4.650"]}
          umpan="4.065, lalu 4.506, lalu 4.560, lalu 4.650. Ratusan 0 paling kecil. Di ratusan 5, puluhan 0 lebih kecil dari puluhan 6. Ratusan 6 paling besar."
          salah="4.065 ratusannya 0. Lalu bandingkan 4.506, 4.560, dan 4.650 dari ratusannya."
        />
        <KuisBenarSalah
          id={idKuis("C", 14)}
          perintah="5. Cek papan skor."
          baris={[
            { teks: "Pada 9.840, angka 9 bernilai 9.000.", benar: true },
            { teks: "7.099 lebih besar dari 7.909.", benar: false },
            { teks: "Angka nol di tengah tidak diucapkan saat membaca.", benar: true },
          ]}
          umpan="Benar, salah, benar. 7.909 lebih besar karena puluhannya 9."
        />
        <Pilih
          id={idKuis("C", 15)}
          pertanyaan="6. Papan rusak 3.⬜56. Angka di rumah ratusan berkilau dan menunjukkan 4. Berapa angka yang hilang?"
          visual={<Papan anak="3.⬜56  ·  ratusan berkilau: 4" />}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "5" },
          ]}
          benar="C"
          umpan="Rumah ratusan menunjukkan 4, jadi skornya 3.456."
          salah="Angka yang berkilau itulah angka yang hilang."
        />
        <Pilih
          id={idKuis("C", 16)}
          pertanyaan="7. Mana skor terbesar: 5.009, 5.090, atau 5.900?"
          pilihan={[
            { huruf: "A", teks: "5.009" },
            { huruf: "B", teks: "5.090" },
            { huruf: "C", teks: "5.900" },
            { huruf: "D", teks: "Semua sama" },
          ]}
          benar="C"
          umpan="Ratusan 9 paling besar."
          salah="Ribuan sama. Lanjut ke ratusan."
        />
        <Pilih
          id={idKuis("C", 17)}
          pertanyaan="8. Deret naik 250: 1.000 – 1.250 – 1.500 – ⬜. Berikutnya..."
          pilihan={[
            { huruf: "A", teks: "1.600" },
            { huruf: "B", teks: "1.700" },
            { huruf: "C", teks: "1.750" },
            { huruf: "D", teks: "2.000" },
          ]}
          benar="C"
          umpan="1.500 + 250 = 1.750."
          salah="Tambahkan 250 pada 1.500."
        />
        <KuisSuara
          id={idKuis("C", 18)}
          pertanyaan="Pemain mendapat skor empat ribu sembilan ratus tiga puluh. Ucapkan angka itu."
          periksa={baca4930}
          petunjuk="Kamu boleh mengucapkan bacaannya atau menyebut 4.930."
        />
        <TulisBebas
          id={idKuis("C", 19)}
          judul="Catatan papan skor"
          visual={<Papan anak="6.751 = ⬜ + ⬜ + ⬜ + ⬜" />}
          pertanyaan="Tulis pemecahan nilai tempat dari 6.751!"
          pesanSalah="Ribuan, ratusan, puluhan, satuan."
          bantuan="6.000 + 700 + 50 + 1."
          umpan="6.000 + 700 + 50 + 1."
          periksa={pecah6751}
          alias={["6000 + 700 + 50 + 1", "enam ribu tujuh ratus lima puluh satu"]}
          konteks="6.751 = 6.000 + 700 + 50 + 1."
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_BAB1.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Pencatat Skor Ahli" : skor >= 6 ? "🏟️ Juri Cerdas" : "🐼 Sahabat Bulu";
  const pesan =
    skor >= 9
      ? "Luar biasa! Semua bilangan tepat!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi pencatat ahli!"
        : "Ayo berlatih lagi bersama Bulu, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🐼"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Saatnya kalian mengerjakan sendiri. Ada sepuluh soal tentang bilangan sampai 10.000.",
          "Beberapa soal meminta kalian membaca bilangan, beberapa menentukan nilai tempat, dan beberapa membandingkan atau mengurutkan.",
          "Ingat: periksa dari kiri, dan kelompokkan dulu sebelum mengurutkan. Jangan terburu-buru, dan periksa lagi jawabanmu. Selamat mengerjakan!",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-3-bab1-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan papan skor kecil. Panda mengangkat ibu jari."
        ukuran="lebar"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Pemecahan nilai tempat"
          visual={<Papan anak="9.406 = ⬜ + ⬜ + ⬜ + ⬜" />}
          pertanyaan="Tulis pemecahan nilai tempatnya lengkap!"
          pesanSalah="Puluhan pada 9.406 adalah nol. Tetap tuliskan."
          bantuan="9.000 + 400 + 0 + 6."
          umpan="9.000 + 400 + 0 + 6."
          periksa={pecah9406}
          alias={["9000 + 400 + 0 + 6", "sembilan ribu empat ratus nol enam"]}
          konteks="9.406 = 9.000 + 400 + 0 + 6."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Bagaimana membaca 5.037?"
          visual={<Papan anak="5.037" />}
          pilihan={[
            { huruf: "A", teks: "Lima ribu tiga puluh tujuh" },
            { huruf: "B", teks: "Lima ribu tiga ratus tujuh" },
            { huruf: "C", teks: "Lima ribu tujuh" },
            { huruf: "D", teks: "Lima puluh ribu tiga puluh tujuh" },
          ]}
          benar="A"
          umpan="Ratusan 0 tidak disebut. Puluhan 3 dibaca tiga puluh."
          salah="Angka 0 ada di ratusan, bukan di puluhan."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="Dengarkan: delapan ribu sembilan puluh. Ucapkan angkanya."
          periksa={baca8090}
          petunjuk="Kamu boleh mengucapkan bacaannya atau menyebut 8.090."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Naya menulis: pada 3.764, angka 6 bernilai 6. Apakah Naya benar?"
          pilihan={[
            { huruf: "A", teks: "Benar, karena angkanya 6" },
            { huruf: "B", teks: "Salah, seharusnya 60" },
            { huruf: "C", teks: "Salah, seharusnya 600" },
            { huruf: "D", teks: "Salah, seharusnya 6.000" },
          ]}
          benar="B"
          umpan="Angka aslinya 6, tetapi rumahnya puluhan, jadi nilainya 60."
          salah="Bedakan angka aslinya dengan nilai tempatnya."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan setiap bilangan dengan angka terbesar di dalamnya."
          baris={[
            { kiri: "4.829", pilihan: ANGKA_BESAR, benar: "Ratusan: 8" },
            { kiri: "8.042", pilihan: ANGKA_BESAR, benar: "Ribuan: 8" },
            { kiri: "2.984", pilihan: ANGKA_BESAR, benar: "Puluhan: 9" },
          ]}
          umpan="Pada 4.829 yang terbesar 8 di ratusan. Pada 8.042 yang terbesar 8 di ribuan. Pada 2.984 yang terbesar 9 di puluhan."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Urutkan"
          visual={<Papan anak="6.075 · 6.750 · 6.507 · 6.705" />}
          pertanyaan="Urutkan dari terkecil ke terbesar!"
          pesanSalah="Ratusan dulu, baru puluhan."
          bantuan="6.075, lalu 6.507, lalu 6.705, lalu 6.750."
          umpan="6.075, 6.507, 6.705, 6.750."
          periksa={urutEvaluasi}
          alias={["6075 6507 6705 6750"]}
          konteks="Urutan: 6.075, 6.507, 6.705, 6.750."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Deret 4.200 – 4.400 – 4.600 – ⬜ – 5.000. Angka yang hilang..."
          pilihan={[
            { huruf: "A", teks: "4.700" },
            { huruf: "B", teks: "4.750" },
            { huruf: "C", teks: "4.800" },
            { huruf: "D", teks: "4.900" },
          ]}
          benar="C"
          umpan="Naik 200 setiap langkah. 4.600 + 200 = 4.800."
          salah="Selisih 4.200 ke 4.400 adalah 200."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari terbesar ke terkecil."
          acak={["9.009", "9.900", "9.090", "9.099"]}
          benar={["9.900", "9.099", "9.090", "9.009"]}
          umpan="9.900 paling besar karena ratusannya 9. Lalu 9.099, 9.090, dan 9.009."
          salah="9.900 ratusannya 9. Tiga bilangan lain ratusannya 0, jadi bandingkan puluhannya."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="Dari 7.899 dan 8.001, sebutkan yang lebih besar, lalu jelaskan alasannya singkat."
          periksa={alasan8001}
          petunjuk="Sebutkan bilangannya, lalu sebut ribuan atau lebih besar."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Turnamen Bulu"
          visual={<Papan anak="Biru 3.480 · Merah 3.408 · Hijau 3.840 · Kuning 3.084" />}
          pertanyaan="Tulis juara pertama, peringkat terakhir, dan selisih skor keduanya."
          pesanSalah="Bandingkan ratusannya dulu, lalu kurangkan skor terkecil dari skor terbesar."
          bantuan="Hijau 3.840 juara. Kuning 3.084 terakhir. Selisihnya 756."
          umpan="Hijau juara, Kuning terakhir, selisih 756."
          periksa={turnamenBulu}
          alias={["hijau", "kuning", "756", "3840", "3084"]}
          konteks="Hijau 3.840 juara, Kuning 3.084 terakhir, selisih 756."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Periksa dari kiri. Kalau beda, berhenti."
          alias={["dari kiri", "berhenti"]}
          konteks="Periksa dari kiri. Kalau beda, berhenti."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
      <aside className="mt-5 rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-4 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="font-black text-[#1C01A5]">Catatan untuk guru</p>
        <p className="mt-2">
          Seluruh soal memakai bilangan sampai 10.000: membaca, menulis, nilai tempat, membandingkan, dan mengurutkan.
        </p>
        <p className="mt-2">
          Kesalahan yang paling sering: mengabaikan angka nol, mengira banyak angka 9 selalu lebih besar, dan mengurutkan tanpa memeriksa ratusan.
        </p>
        <p className="mt-2">
          Soal 6 dan 8 paling menantang karena empat bilangannya mirip. Soal 4 membedakan nilai asli dari nilai tempat. Soal 9 menilai alasan, bukan hanya simbol. Soal 10 punya tiga langkah: juara, peringkat terakhir, lalu selisih.
        </p>
        <p className="mt-2">
          Gunakan kartu angka berwarna: ribuan biru tua, ratusan biru, puluhan kuning, satuan kuning muda. Minta anak menyusun angka itu, lalu menyebutkan nilai setiap angka.
        </p>
      </aside>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Bab1({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Empat angka: ribuan, ratusan, puluhan, satuan.",
    "Makin ke kiri, makin besar. Sepuluh kali lipat.",
    "Periksa dari kiri. Beda? Berhenti.",
    "Kelompokkan dulu, rapikan kemudian.",
    "Nol di tengah tidak disebut. 6.084 dibaca enam ribu delapan puluh empat.",
    "Titik itu pemisah ribuan, bukan koma.",
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
          src: "/doodle-mtk/mtk-3-bab1-poin.jpg",
          alt: "Panda berdiri di papan kalimat kunci. Angka ribuan melayang membentuk menara.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Bilangan ribuan punya empat angka: ribuan, ratusan, puluhan, satuan. Baca dari kiri ke kanan.",
          "Untuk membandingkan, periksa dari kiri. Kalau sudah beda, berhenti di situ.",
          "Untuk mengurutkan, kelompokkan dulu berdasarkan ribuannya.",
        ])}
        poin={poin}
        penutup="Empat rumah angka. Kiri lebih besar. Nol di tengah tidak disebut."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
