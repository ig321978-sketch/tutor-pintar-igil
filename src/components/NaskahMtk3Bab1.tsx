"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
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
  baca5402,
  baca5402Rumah as baca5402Rak,
  baca8007,
  baca8090,
  bandingRumah as bandingRak,
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
  tulis6293,
  tulis7905,
  tulis7905Rumah as tulis7905Rak,
  tulis9060,
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

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Aldi: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Naya: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Fikri: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Aldi: "👦",
  Naya: "👧",
  Fikri: "👦",
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan rak angkanya." />
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
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi rak angkanya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const BACAAN_A = ["Sembilan ribu dua ratus tujuh puluh", "Tiga ribu lima ratus tujuh", "Enam ribu tiga"];
const NILAI_B = ["80", "6.000", "400"];
const ANGKA_BESAR = ["Satuan: 9", "Ribuan: 8", "Ratusan: 9"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB1.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="👦👧🦉"
        judul="A. Lapangan Sekolah"
        anak="Aldi, Naya, Fikri, dan Igil"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Membaca bilangan sampai 10.000.",
          "Menulis bilangan sampai 10.000.",
          "Membandingkan bilangan sampai 10.000.",
          "Mengurutkan bilangan sampai 10.000.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 1 — Membaca bilangan ribuan"
          src="/doodle-mtk/mtk-3-bab1-sub1.jpg"
          alt="Lapangan sekolah, papan skor kosong, dan empat kotak rak kosong. Aldi memegang catatan, Naya memegang stopwatch, Fikri melambai, burung hantu Igil berdiri di samping."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Empat angka dibaca dari kiri. Titik hanya pemisah ribuan."]}
        >
          <Dialog nama="Aldi" anak="Papan menulis 4.725." />
          <Dialog nama="Fikri" anak="Empat, tujuh, dua, lima?" />
          <Dialog nama="Naya" anak="Itu menyebut angka. Bacanya: empat ribu tujuh ratus dua puluh lima." />
          <Dialog nama="Igil" anak="4 di rak ribuan, 7 ratusan, 2 puluhan, 5 satuan. Titik bukan angka." />
          <Papan anak="4.725 = 4 ribuan + 7 ratusan + 2 puluhan + 5 satuan" />
          <TabelInfoGrafis
            judul="Infografis: Membaca dan menulis"
            kepala={["Rak", "Hitung", "Angka"]}
            baris={[
              ["ribuan", "4 × 1.000", "4"],
              ["ratusan", "7 × 100", "7"],
              ["puluhan", "2 × 10", "2"],
              ["satuan", "5 × 1", "5"],
            ]}
            kaki="4.725 dibaca empat ribu tujuh ratus dua puluh lima."
          />
          <Papan anak="enam ribu delapan puluh empat" />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Baca bilangan 3.568 dengan lengkap."
            periksa={baca3568}
            petunjuk="Sebutkan nama tiap rak."
            benar="Bagus. Kamu sudah menyebut setiap raknya."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Tulis dari bacaan"
            visual={<Papan anak="enam ribu dua ratus sembilan puluh tiga" />}
            pertanyaan="Dengarkan bilangannya, lalu tulis: enam ribu dua ratus sembilan puluh tiga."
            pesanSalah="Mulai dari ribuan: enam ribu."
            bantuan="Empat rak: ribuan 6, ratusan 2, puluhan 9, satuan 3. Jadi 6.293."
            umpan="6.293."
            periksa={tulis6293}
            alias={["6293", "6.293", "enam ribu dua ratus sembilan puluh tiga"]}
            konteks="Jawabannya 6.293."
          />
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
            bantuan="Raknya 7, 9, 0, 5. Jadi 7.905."
            umpan="7.905."
            periksa={tulis7905}
            alias={["7905", "tujuh ribu sembilan ratus lima"]}
            konteks="Jawabannya 7.905."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 2 — Nilai tempat ribuan sampai satuan"
          src="/doodle-mtk/mtk-3-bab1-sub2.jpg"
          alt="Anak-anak, burung hantu Igil, balon, dan empat kotak rak kosong di depan papan yang masih kosong."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Angkanya tetap. Raknya yang mengubah nilai."]}
        >
          <Dialog nama="Fikri" anak="Mengapa angka 8 pada 6.482 bernilai 80?" />
          <Dialog nama="Aldi" anak="Karena ia di rak puluhan." />
          <Dialog nama="Naya" anak="Satu puluhan berisi sepuluh. Pindah satu rak ke kiri, kali sepuluh." />
          <Dialog nama="Igil" anak="6.482 sama dengan 6.000 + 400 + 80 + 2." />
          <Papan anak="6.482 = 6.000 + 400 + 80 + 2" />
          <TabelInfoGrafis
            judul="Infografis: Nilai tempat"
            kepala={["Angka", "Rak", "Nilai"]}
            baris={[
              ["8", "ribuan", "8.000"],
              ["3", "ratusan", "300"],
              ["5", "puluhan", "50"],
              ["9", "satuan", "9"],
            ]}
            kaki="8.359 = 8.000 + 300 + 50 + 9."
          />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Berapa nilai angka tiga pada 5.374? Jelaskan singkat alasannya."
            periksa={nilaiTigaRatus}
            petunjuk="Cari raknya dulu. Rak itu yang menentukan pengalinya."
            benar="Tiga ratus, karena angka 3 ada di rak ratusan."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Pemecahan nilai tempat"
            visual={<Papan anak="7.916 = ⬜ + ⬜ + ⬜ + ⬜" />}
            pertanyaan="Tulis pemecahan nilai tempatnya, lalu beri nama setiap rak di bawah angkanya."
            pesanSalah="Ribuan, ratusan, puluhan, lalu satuan."
            bantuan="7.000 + 900 + 10 + 6. Raknya ribuan, ratusan, puluhan, satuan."
            umpan="7.000 + 900 + 10 + 6."
            periksa={pecah7916}
            alias={["7000 + 900 + 10 + 6", "tujuh ribu sembilan ratus sepuluh enam"]}
            konteks="7.916 = 7.000 + 900 + 10 + 6."
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Berapa nilai angka 7 pada 2.745? Sebutkan juga nama raknya."
            periksa={nilaiTujuhRatus}
            petunjuk="Angka 7 ada di rak ratusan."
            benar="Tujuh ratus. Rak ratusan."
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
          utama
          judul="Sub-bab 3 — Membandingkan bilangan"
          src="/doodle-mtk/mtk-3-bab1-sub3.jpg"
          alt="Dua papan skor kosong di atas timbangan, dengan penggaris pemeriksaan dari kiri ke kanan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Bandingkan dari rak kiri. Begitu beda, berhenti."]}
        >
          <Dialog nama="Naya" anak="Merah 3.842, Biru 3.291." />
          <Dialog nama="Aldi" anak="Ribuan sama. Ratusan 8 lebih besar dari 2." />
          <Dialog nama="Fikri" anak="Kalau 8.000 dan 7.999?" />
          <Dialog nama="Igil" anak="Ribuan sudah beda. 8.000 lebih besar." />
          <Papan anak="3.842 > 3.291    8.000 > 7.999" />
          <TabelInfoGrafis
            judul="Infografis: Membandingkan"
            kepala={["Langkah", "Periksa", "Hasil"]}
            baris={[
              ["1", "ribuan", "sama"],
              ["2", "ratusan", "sama"],
              ["3", "puluhan", "4.376 lebih besar"],
            ]}
            kaki="Bandingkan dari kiri. Begitu beda, berhenti."
          />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Mana yang lebih besar, 5.671 atau 5.619? Sebutkan bilangannya, lalu sebutkan rak mana yang menentukan."
            periksa={lebihBesar5671}
            petunjuk="Ribuan dan ratusan masih sama. Pindah ke rak berikutnya."
            benar="Lima ribu enam ratus tujuh puluh satu. Rak puluhan yang menentukan."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Simbol perbandingan"
            visual={<Papan anak="[ 4.086 ] ⬜ [ 4.806 ]" />}
            pertanyaan="Tulis simbol lebih besar, lebih kecil, atau sama dengan, lalu tulis rak mana yang menentukan."
            pesanSalah="Ribuan sama. Lihat ratusannya: 0 dan 8."
            bantuan="4.086 lebih kecil. Rak ratusan yang menentukan."
            umpan="Lebih kecil, karena ratusan 0 dan 8."
            periksa={(teks) => bandingRak(teks, "<", "ratusan")}
            alias={["lebih kecil", "ratusan"]}
            konteks="4.086 lebih kecil dari 4.806. Rak ratusan yang menentukan."
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Mana yang lebih besar, 6.512 atau 6.521? Sebutkan rak yang menentukan."
            periksa={lebihBesar6521}
            petunjuk="Ribuan dan ratusan sama. Bandingkan puluhannya."
            benar="Enam ribu lima ratus dua puluh satu. Rak puluhan."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="[ 3.908 ] ⬜ [ 3.890 ]" />}
            pertanyaan="Tulis simbol yang tepat, lalu sebutkan rak yang menentukan."
            pesanSalah="Ribuan sama. Ratusan 9 dan 8 sudah berbeda, jadi pemeriksaan berhenti di situ."
            bantuan="3.908 lebih besar. Rak ratusan yang menentukan, karena 9 lebih besar dari 8."
            umpan="Lebih besar. Rak ratusan: 9 dan 8."
            periksa={(teks) => bandingRak(teks, ">", "ratusan")}
            alias={["lebih besar", "ratusan"]}
            konteks="3.908 lebih besar dari 3.890. Rak ratusan yang menentukan."
          />
        </Adegan>

        <Adegan
          utama
          judul="Sub-bab 4 — Mengurutkan bilangan"
          src="/doodle-mtk/mtk-3-bab1-sub4.jpg"
          alt="Anak tangga podium tanpa angka. Aldi memasang kartu nama polos di papan hasil lomba."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kelompokkan ribuan dulu, lalu rapikan."]}
        >
          <Dialog nama="Aldi" anak="Skornya 6.540, 2.180, 6.290, 9.050, dan 2.990." />
          <Dialog nama="Naya" anak="Pisahkan ribuan 2, ribuan 6, dan ribuan 9." />
          <Dialog nama="Fikri" anak="Di kelompok 2: 2.180 lalu 2.990." />
          <Dialog nama="Igil" anak="Jadi 2.180, 2.990, 6.290, 6.540, 9.050." />
          <Papan anak="2.180 < 2.990 < 6.290 < 6.540 < 9.050" />
          <TabelInfoGrafis
            judul="Infografis: Mengurutkan"
            kepala={["Urutan", "Bilangan", "Kelompok"]}
            baris={[
              ["1", "1.940", "ribuan 1"],
              ["2", "3.612", "ribuan 3"],
              ["3", "5.080", "ribuan 5"],
              ["4", "5.208", "ribuan 5"],
            ]}
            kaki="Kelompokkan ribuan dulu, lalu rapikan."
          />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Dari 7.300, 3.700, dan 7.030, sebutkan bilangan yang paling kecil, lalu sebutkan kelompok ribuan mana yang paling kecil."
            periksa={palingKecil3700}
            petunjuk="Lihat rak ribuannya dulu. Kelompok mana yang nilainya paling kecil?"
            benar="Tiga ribu tujuh ratus. Kelompok 3.000-an."
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

        <Adegan
          utama
          judul="Sub-bab 5 — Membaca bilangan yang mengandung angka nol"
          src="/doodle-mtk/mtk-3-bab1-sub5.jpg"
          alt="Dua papan skor kosong berdampingan. Satu rak angka masih kosong."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Nol menandai rak kosong. Tidak disebut, tetapi ditulis."]}
        >
          <Dialog nama="Fikri" anak="6.084 dan 6.840 angkanya sama." />
          <Dialog nama="Naya" anak="Pada 6.084, angka 8 di puluhan. Pada 6.840, angka 8 di ratusan." />
          <Dialog nama="Aldi" anak="Nol di tengah tidak disebut." />
          <Dialog nama="Igil" anak="Tetap ditulis. Tanpa nol, 6.084 jadi 684." />
          <Papan anak={"6.084 = enam ribu delapan puluh empat\n6.840 = enam ribu delapan ratus empat puluh"} />
          <TabelInfoGrafis
            judul="Infografis: Bilangan dengan angka nol"
            kepala={["Bilangan", "Rak", "Dibaca"]}
            baris={[
              ["6.084", "6 · 0 · 8 · 4", "enam ribu delapan puluh empat"],
              ["6.840", "6 · 8 · 4 · 0", "enam ribu delapan ratus empat puluh"],
              ["4.050", "4 · 0 · 5 · 0", "empat ribu lima puluh"],
            ]}
            kaki="Nol tidak disebut, tetapi tetap ditulis."
          />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Baca bilangan 5.402, lalu sebutkan rak mana yang kosong."
            periksa={baca5402Rak}
            petunjuk="Periksa tiap rak. Rak mana yang berisi angka nol?"
            benar="Lima ribu empat ratus dua. Rak puluhan yang kosong."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Tulis dan sebut rak kosong"
            visual={<Papan anak="tujuh ribu sembilan ratus lima" />}
            pertanyaan="Tulis bilangan dari tujuh ribu sembilan ratus lima, lalu sebutkan rak mana yang kosong."
            pesanSalah="Puluhan tidak disebut, jadi rak itu kosong. Angka nol tetap ditulis."
            bantuan="7.905. Rak puluhan yang kosong."
            umpan="7.905. Rak puluhan kosong."
            periksa={tulis7905Rak}
            alias={["7905", "puluhan kosong"]}
            konteks="7.905. Rak puluhan yang kosong."
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Baca bilangan 8.007, lalu sebutkan rak mana saja yang kosong."
            periksa={baca8007}
            petunjuk="Dua rak di tengah berisi angka nol."
            benar="Delapan ribu tujuh. Rak ratusan dan puluhan yang kosong."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="sembilan ribu enam puluh" />}
            pertanyaan="Tulis bilangan dari sembilan ribu enam puluh."
            pesanSalah="Ratusan dan satuan tidak disebut. Keduanya nol."
            bantuan="9.060."
            umpan="9.060."
            periksa={tulis9060}
            alias={["9060"]}
            konteks="Sembilan ribu enam puluh ditulis 9.060."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Berapa nilai angka 4 pada 8.463, dan rak apa yang membuatnya begitu?"
          visual={<Papan anak="8.463" />}
          pilihan={[
            { huruf: "A", teks: "4, karena angkanya 4" },
            { huruf: "B", teks: "40, karena ada di rak puluhan" },
            { huruf: "C", teks: "400, karena ada di rak ratusan" },
            { huruf: "D", teks: "4.000, karena ada di rak ribuan" },
          ]}
          benar="C"
          umpan="Angka 4 ada di rak ratusan, nilainya 400."
          salah="Lihat rak angka 4. Bukan satuan."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan bilangan dengan cara bacanya."
          baris={[
            { kiri: "3.507", pilihan: BACAAN_A, benar: "Tiga ribu lima ratus tujuh" },
            { kiri: "9.270", pilihan: BACAAN_A, benar: "Sembilan ribu dua ratus tujuh puluh" },
            { kiri: "6.003", pilihan: BACAAN_A, benar: "Enam ribu tiga" },
          ]}
          umpan="3.507 tiga ribu lima ratus tujuh. 9.270 sembilan ribu dua ratus tujuh puluh. 6.003 enam ribu tiga."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun dari yang terkecil ke terbesar."
          acak={["7.040", "4.700", "7.400", "4.070"]}
          benar={["4.070", "4.700", "7.040", "7.400"]}
          umpan="4.070, 4.700, 7.040, 7.400."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif bilangan. Periksa tiga pernyataan."
          baris={[
            { teks: "Pada 5.728, angka 5 bernilai 5.000.", benar: true },
            { teks: "8.000 lebih kecil dari 7.999.", benar: false },
            { teks: "Titik pada 4.725 adalah pemisah ribuan.", benar: true },
          ]}
          umpan="Benar, salah, benar. 8.000 lebih besar karena ribuannya 8."
        />
        <Pilih
          id={idKuis("A", 14)}
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
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="6. Manakah bacaan yang benar untuk 7.050?"
          visual={<Papan anak="7.050" />}
          pilihan={[
            { huruf: "A", teks: "Tujuh ribu lima" },
            { huruf: "B", teks: "Tujuh ribu lima puluh" },
            { huruf: "C", teks: "Tujuh ribu lima ratus" },
            { huruf: "D", teks: "Tujuh puluh lima" },
          ]}
          benar="B"
          umpan="Puluhan 5 dibaca lima puluh. Ratusannya nol, tidak disebut."
          salah="Lihat rak puluhan, bukan ratusan."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="7. Pada 6.487, pasangkan setiap angka dengan nilainya."
          baris={[
            { kiri: "Angka 6", pilihan: NILAI_B, benar: "6.000" },
            { kiri: "Angka 4", pilihan: NILAI_B, benar: "400" },
            { kiri: "Angka 8", pilihan: NILAI_B, benar: "80" },
          ]}
          umpan="6 di ribuan bernilai 6.000. 4 di ratusan bernilai 400. 8 di puluhan bernilai 80."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="8. Susun dari terbesar ke terkecil."
          acak={["3.099", "9.003", "3.909", "9.300"]}
          benar={["9.300", "9.003", "3.909", "3.099"]}
          umpan="9.300, 9.003, 3.909, 3.099."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="9. Cek bilangan. Periksa tiga pernyataan."
          baris={[
            { teks: "Pada 4.506, angka 5 bernilai 500.", benar: true },
            { teks: "Nol di tengah bilangan selalu disebut saat membaca.", benar: false },
            { teks: "9.999 lebih besar dari 10.000.", benar: false },
          ]}
          umpan="Benar, salah, salah. Sepuluh ribu lebih besar dari 9.999."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="10. Ribuanku 5, ratusanku 0, puluhanku 7, satuanku 2. Aku bilangan..."
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
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_BAB1.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🏗️🦉"
        judul={kartu.judul}
        anak="Sepuluh pos · baca, bandingkan, urutkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(["Sepuluh pos pola. Pilih satu pos, lalu jawab."])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-bab1-permainan.jpg"
        alt="Stadion kejuaraan. Igil berdiri di meja juri."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_BAB1}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_BAB1}
          penutup="Podium juara terbuka. Igil memasang lencana juri."
          bunga="🏟️🏆🥇🦉"
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
  const lencana = skor >= 9 ? "🥇 Juri Bilangan Ahli" : skor >= 6 ? "🏟️ Juri Muda Cerdas" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Catatanmu bisa dipertanggungjawabkan!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi juri ahli!"
        : "Ayo selidiki lagi bersama Igil, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🦉"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(["Sepuluh soal. Periksa dari kiri, lalu kelompokkan ribuan."])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-bab1-evaluasi.jpg"
        alt="Meja ujian dan burung hantu Igil."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Pemecahan nilai tempat"
          visual={<Papan anak="9.406 = ⬜ + ⬜ + ⬜ + ⬜" />}
          pertanyaan="Tulis pemecahan nilai tempat 9.406, lalu sebutkan rak mana yang kosong."
          pesanSalah="Puluhan pada 9.406 kosong. Tetap tuliskan nolnya."
          bantuan="9.000 + 400 + 0 + 6. Rak puluhan yang kosong."
          umpan="9.000 + 400 + 0 + 6. Rak puluhan kosong."
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
          pertanyaan="Dengarkan delapan ribu sembilan puluh. Ucapkan bilangannya dan sebutkan rak yang kosong."
          periksa={baca8090}
          petunjuk="Dua rak tidak disebut: ratusan dan satuan."
          benar="Delapan ribu sembilan puluh. Rak ratusan dan satuan yang kosong."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Naya menulis: pada 3.764, angka 6 bernilai 6. Apakah Naya benar?"
          pilihan={[
            { huruf: "A", teks: "Benar, karena angkanya 6" },
            { huruf: "B", teks: "Salah, seharusnya 60 karena berada di rak puluhan" },
            { huruf: "C", teks: "Salah, seharusnya 600" },
            { huruf: "D", teks: "Salah, seharusnya 6.000" },
          ]}
          benar="B"
          umpan="Angka aslinya 6, tetapi raknya puluhan, jadi nilainya 60."
          salah="Bedakan angka aslinya dengan nilai tempatnya."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan setiap bilangan dengan angka terbesar di dalamnya."
          baris={[
            { kiri: "4.829", pilihan: ANGKA_BESAR, benar: "Satuan: 9" },
            { kiri: "8.042", pilihan: ANGKA_BESAR, benar: "Ribuan: 8" },
            { kiri: "2.984", pilihan: ANGKA_BESAR, benar: "Ratusan: 9" },
          ]}
          umpan="Angka terbesar pada 4.829 adalah 9 di satuan. Pada 8.042 adalah 8 di ribuan. Pada 2.984 adalah 9 di ratusan."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Urutkan"
          visual={<Papan anak="6.075 · 6.750 · 6.507 · 6.705" />}
          pertanyaan="Urutkan dari terkecil ke terbesar, lalu tulis alasan singkat mengapa urutannya begitu."
          pesanSalah="Ratusan dulu, baru puluhan. Tulis juga alasannya."
          bantuan="6.075, 6.507, 6.705, 6.750, karena ratusan 0, lalu 5, lalu 7."
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
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Biru 3.480, Merah 3.408, Hijau 3.840, Kuning 3.084. Juara pertama adalah..."
          pilihan={[
            { huruf: "A", teks: "Hijau" },
            { huruf: "B", teks: "Biru" },
            { huruf: "C", teks: "Merah" },
            { huruf: "D", teks: "Kuning" },
          ]}
          benar="A"
          umpan="Hijau 3.840. Ratusannya 8, paling besar."
          salah="Ribuan sama. Bandingkan ratusan."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
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
    "Angkanya tetap, pengalinya yang berubah. Pindah satu rak ke kiri sama dengan dikali sepuluh.",
    "Periksa dari kiri. Beda? Berhenti.",
    "Kelompokkan dulu, rapikan kemudian.",
    "Nol tidak diucapkan, tetapi wajib ditulis. 6.084, bukan 684.",
    "Titik itu tanda baca, bukan angka. 4.725 sama dengan 4725.",
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
          src: "/doodle-mtk/mtk-3-bab1-poin.jpg",
          alt: "Burung hantu Igil membentangkan lima kartu kunci di depan papan skor.",
        }}
        cuplikan={cuplikanKalimat([
          "Baca tiap rak dari kiri. Pindah satu rak ke kiri berarti dikali sepuluh.",
          "Bandingkan dari kiri, lalu berhenti. Urutkan dengan mengelompokkan ribuan dulu.",
          "Nol menandai rak kosong. Tidak diucapkan, tetapi tetap ditulis.",
        ])}
        poin={poin}
        penutup="Empat rak angka. Angkanya tetap, pengalinya yang berubah."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
