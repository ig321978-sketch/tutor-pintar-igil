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
import { MISI_MTK3_WAKTU, TEMA_MTK3_WAKTU } from "@/lib/misi-mtk-3-waktu";
import { MODUL_MTK3_WAKTU } from "@/lib/modul-resmi-mtk-3-waktu";
import { jamBulat, nilaiWaktu } from "@/lib/nilai-mtk-3-waktu";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_WAKTU.id;

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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan waktu yang tepat." />
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
  salah = "Urutkan lagi dari yang paling singkat.",
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

function Lambang({ ikon, teks }: { ikon: string; teks: string }) {
  return (
    <p className="text-center text-lg font-black text-[#1C01A5]">
      <span className="mr-2 text-3xl" aria-hidden>
        {ikon}
      </span>
      {teks}
    </p>
  );
}

const PASANGAN_A = ["60 menit", "120 detik", "7 hari", "180 menit"];
const PASANGAN_B = ["120 menit", "180 detik", "14 hari", "60 menit"];
const PASANGAN_D = ["180 menit", "240 detik", "7 hari", "300 menit"];
const MENIT = ["menit"];
const DETIK = ["detik"];
const HARI = ["hari"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_WAKTU.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🎭🦉"
        judul={kartu.judul}
        anak="Nisa, Farhan, Cinta, dan Igil di aula pentas"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: membaca jam, menghitung lama kegiatan, dan menandai tanggal.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Membaca jam"
          src="/doodle-mtk/mtk-3-waktu-sub1.jpg"
          alt="Anak-anak memandang jam dinding di aula. Igil berdiri di depan tirai."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jarum pendek menunjukkan jam. Jarum panjang menunjukkan menit. Angka pada jam dikali 5."]}
        >
          <Dialog nama="Nisa" anak="Jarum pendek di angka 9. Jarum panjang di angka 12. Pukul 09.00." />
          <Dialog nama="Farhan" anak="Jarum panjang di angka 1 berarti 5 menit." />
          <Dialog nama="Cinta" anak="Latihan gitar mulai pukul 09.05." />
          <Dialog nama="Igil" anak="Pendek untuk jam. Panjang untuk menit." />
          <Lambang ikon="🕐" teks="pendek = jam · panjang = menit" />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Jarum panjang di angka 6. Ucapkan berapa menit."
            periksa={(teks) => nilaiWaktu(teks, "30", "tiga puluh", MENIT)}
            petunjuk="Sebutkan jumlah menitnya."
            benar="30 menit."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Jam tepat"
            visual={<Lambang ikon="🕐" teks="pendek di 2 · panjang di 12" />}
            pertanyaan="Tulis jamnya."
            pesanSalah="Jarum pendek yang menunjukkan jam."
            bantuan="Jamnya pukul 2."
            umpan="Pukul 2."
            periksa={(teks) => jamBulat(teks, 2)}
            alias={["2", "pukul 2", "02.00"]}
            konteks="pukul 2."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Menit dan detik"
          src="/doodle-mtk/mtk-3-waktu-sub2.jpg"
          alt="Farhan memegang jam pasir. Cinta melihat jarum yang berputar cepat."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["1 menit ada 60 detik. 1 jam ada 60 menit. Kali 60 untuk mengubahnya."]}
        >
          <Dialog nama="Nisa" anak="Satu menit ada 60 detik." />
          <Dialog nama="Farhan" anak="Tepuk satu menit terasa cepat." />
          <Dialog nama="Cinta" anak="Satu jam ada 60 menit." />
          <Dialog nama="Igil" anak="Detik paling cepat. Menit di tengah. Jam paling lama." />
          <Lambang ikon="⏱️" teks="1 menit = 60 detik · 1 jam = 60 menit" />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="3 menit sama dengan berapa detik? Ucapkan hasilnya."
            periksa={(teks) => nilaiWaktu(teks, "180", "seratus delapan puluh", DETIK)}
            petunjuk="Sebutkan hasilnya beserta satuannya."
            benar="180 detik."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Jam ke menit"
            visual={<Lambang ikon="⏱️" teks="2 jam" />}
            pertanyaan="Tulis lama itu dalam menit."
            pesanSalah="1 jam = 60 menit. Kalikan 2."
            bantuan="2 × 60 = 120. Jadi 120 menit."
            umpan="120 menit."
            periksa={(teks) => nilaiWaktu(teks, "120", "seratus dua puluh", MENIT)}
            alias={["120", "menit"]}
            konteks="120 menit."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Lama kegiatan"
          src="/doodle-mtk/mtk-3-waktu-sub3.jpg"
          alt="Cinta menari di panggung kecil. Dua jam menunjukkan waktu mulai dan selesai."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jika jamnya sama, kurangi menit selesai dengan menit mulai."]}
        >
          <Dialog nama="Nisa" anak="Tari mulai pukul 09.20." />
          <Dialog nama="Farhan" anak="Selesai pukul 09.50." />
          <Dialog nama="Cinta" anak="50 kurang 20 sama dengan 30. Jadi 30 menit." />
          <Dialog nama="Igil" anak="Kalau jamnya sama, kurangi menitnya." />
          <Papan anak={"09.50 − 09.20 = 30 menit"} />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Latihan dari pukul 08.10 sampai 08.25. Ucapkan lamanya."
            periksa={(teks) => nilaiWaktu(teks, "15", "lima belas", MENIT)}
            petunjuk="Sebutkan lamanya beserta satuannya."
            benar="15 menit."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Lama latihan"
            visual={<Lambang ikon="🕐" teks="10.05 → 10.40" />}
            pertanyaan="Tulis lamanya dalam menit."
            pesanSalah="Jamnya sama. Kurangi menitnya."
            bantuan="40 − 5 = 35. Jadi 35 menit."
            umpan="35 menit."
            periksa={(teks) => nilaiWaktu(teks, "35", "tiga puluh lima", MENIT)}
            alias={["35", "menit"]}
            konteks="35 menit."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Jam mulai dan selesai"
          src="/doodle-mtk/mtk-3-waktu-sub4.jpg"
          alt="Tiga anak bernyanyi. Igil menunjuk dua jam di sisi panggung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kalau melewati jam bulat, hitung sampai jam itu, lalu tambahkan sisanya."]}
        >
          <Dialog nama="Nisa" anak="Lagu paduan mulai pukul 10.40." />
          <Dialog nama="Farhan" anak="Selesai pukul 11.05." />
          <Dialog nama="Cinta" anak="Ke jam 11.00 ada 20 menit. Tambah 5 menit. Jadi 25 menit." />
          <Dialog nama="Igil" anak="Lewati jam bulat, hitung dua bagian." />
          <Papan anak={"10.40 → 11.00 = 20\n11.00 → 11.05 = 5\n20 + 5 = 25 menit"} />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Istirahat dari pukul 07.45 sampai 08.00. Ucapkan lamanya."
            periksa={(teks) => nilaiWaktu(teks, "15", "lima belas", MENIT)}
            petunjuk="Sebutkan lamanya beserta satuannya."
            benar="15 menit."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Menuju jam bulat"
            visual={<Lambang ikon="🕐" teks="09.40 → 10.00" />}
            pertanyaan="Tulis lamanya dalam menit."
            pesanSalah="Hitung dari 09.40 sampai jam 10.00."
            bantuan="60 − 40 = 20. Jadi 20 menit."
            umpan="20 menit."
            periksa={(teks) => nilaiWaktu(teks, "20", "dua puluh", MENIT)}
            alias={["20", "menit"]}
            konteks="20 menit."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Kalender"
          src="/doodle-mtk/mtk-3-waktu-sub5.jpg"
          alt="Kalender aula dengan satu kotak berbintang. Igil bertengger di sudutnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Satu minggu ada 7 hari. Tanggal seminggu lagi ditambah 7."]}
        >
          <Dialog nama="Nisa" anak="Di kalender aula, pentas hari Sabtu tanggal 17." />
          <Dialog nama="Farhan" anak="Latihan pertama hari Senin tanggal 12." />
          <Dialog nama="Cinta" anak="17 kurang 12 sama dengan 5. Lima hari kemudian." />
          <Dialog nama="Igil" anak="Satu minggu ada 7 hari. Tanggalnya ditambah 7." />
          <Lambang ikon="📅" teks="Senin 12 · Sabtu 17 · 1 minggu = 7 hari" />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Dari tanggal 20 sampai tanggal 24, berapa hari kemudian? Ucapkan hasilnya."
            periksa={(teks) => nilaiWaktu(teks, "4", "empat", HARI)}
            petunjuk="Sebutkan hasilnya beserta kata hari."
            benar="4 hari."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Seminggu lagi"
            visual={<Lambang ikon="📅" teks="tanggal 11 + 7" />}
            pertanyaan="Tulis tanggalnya."
            pesanSalah="Tambahkan 7 pada tanggalnya."
            bantuan="11 + 7 = 18."
            umpan="Tanggal 18."
            periksa={(teks) => nilaiWaktu(teks, "18", "delapan belas", [])}
            alias={["18", "delapan belas"]}
            konteks="tanggal 18."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Jarum panjang di angka 3. Itu sama dengan..."
          visual={<Lambang ikon="🕐" teks="panjang di 3" />}
          pilihan={[
            { huruf: "A", teks: "3 menit" },
            { huruf: "B", teks: "15 menit" },
            { huruf: "C", teks: "30 menit" },
            { huruf: "D", teks: "60 menit" },
          ]}
          benar="B"
          salah="Angka pada jam dikali 5."
          umpan="3 × 5 = 15. Jadi 15 menit."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan waktu dengan hasil ubahnya."
          baris={[
            { kiri: "1 jam", pilihan: PASANGAN_A, benar: "60 menit" },
            { kiri: "2 menit", pilihan: PASANGAN_A, benar: "120 detik" },
            { kiri: "1 minggu", pilihan: PASANGAN_A, benar: "7 hari" },
            { kiri: "3 jam", pilihan: PASANGAN_A, benar: "180 menit" },
          ]}
          umpan="60 menit, 120 detik, 7 hari, dan 180 menit."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun dari yang paling singkat."
          acak={["jam", "detik", "menit"]}
          benar={["detik", "menit", "jam"]}
          umpan="Detik, lalu menit, lalu jam."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "1 menit = 60 detik.", benar: true },
            { teks: "1 jam = 100 menit.", benar: false },
            { teks: "1 minggu = 7 hari.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 1 jam = 60 menit."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Mana yang bukan satuan waktu?"
          pilihan={[
            { huruf: "A", teks: "jam" },
            { huruf: "B", teks: "menit" },
            { huruf: "C", teks: "detik" },
            { huruf: "D", teks: "kg" },
          ]}
          benar="D"
          salah="Cari yang dipakai untuk berat."
          umpan="kg mengukur berat."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_WAKTU.kartu[1];
  return (
    <KartuBingkai latar="bg-sky-50/50">
      <KepalaKartu
        ikon="📊🦉"
        judul={kartu.judul}
        anak="Peta pentas · contoh dan cara"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Pilih posisi jarum"
          src="/doodle-mtk/mtk-3-waktu-sub1.jpg"
          alt="Jam dinding aula tanpa angka, dua jarum, dan tirai merah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Panjang di angka 12 berarti tepat. Angka lain dikali 5 menjadi menit."]}
        >
          <PetaContoh
            polos
            pusat="Membaca jam"
            cabang={[
              { ikon: "🕐", judul: "Pendek", isi: "menunjukkan jam" },
              { ikon: "🕑", judul: "Panjang", isi: "menunjukkan menit" },
              { ikon: "✖️", judul: "Kali 5", isi: "angka jadi menit" },
            ]}
            kolom={["Posisi", "Hitung", "Jam"]}
            baris={[
              ["pendek 4, panjang 12", "tepat", "04.00"],
              ["panjang di 6", "6 × 5", "04.30"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Jarum panjang di angka 9. Ucapkan berapa menit."
            periksa={(teks) => nilaiWaktu(teks, "45", "empat puluh lima", MENIT)}
            petunjuk="Sebutkan jumlah menitnya."
            benar="45 menit."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Lambang ikon="🕐" teks="pendek di 7 · panjang di 12" />}
            pertanyaan="Tulis jamnya."
            pesanSalah="Jarum pendek yang menunjukkan jam."
            bantuan="Jamnya pukul 7."
            umpan="Pukul 7."
            periksa={(teks) => jamBulat(teks, 7)}
            alias={["7", "pukul 7", "07.00"]}
            konteks="pukul 7."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Ubah dengan 60"
          src="/doodle-mtk/mtk-3-waktu-sub2.jpg"
          alt="Jam pasir dan jam bundar di samping panggung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Menit dikali 60 menjadi detik. Jam dikali 60 menjadi menit."]}
        >
          <PetaContoh
            polos
            pusat="Kali 60"
            cabang={[
              { ikon: "⏱️", judul: "1 menit", isi: "60 detik" },
              { ikon: "🕐", judul: "1 jam", isi: "60 menit" },
              { ikon: "✖️", judul: "Cara", isi: "kalikan 60" },
            ]}
            kolom={["Dari", "Hitung", "Jadi"]}
            baris={[
              ["4 menit", "4 × 60", "240 detik"],
              ["2 jam", "2 × 60", "120 menit"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="5 menit sama dengan berapa detik? Ucapkan hasilnya."
            periksa={(teks) => nilaiWaktu(teks, "300", "tiga ratus", DETIK)}
            petunjuk="Sebutkan hasilnya beserta satuannya."
            benar="300 detik."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Lambang ikon="⏱️" teks="3 jam" />}
            pertanyaan="Tulis lama itu dalam menit."
            pesanSalah="1 jam = 60 menit. Kalikan 3."
            bantuan="3 × 60 = 180. Jadi 180 menit."
            umpan="180 menit."
            periksa={(teks) => nilaiWaktu(teks, "180", "seratus delapan puluh", MENIT)}
            alias={["180", "menit"]}
            konteks="180 menit."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Kurangi menit"
          src="/doodle-mtk/mtk-3-waktu-sub3.jpg"
          alt="Panggung kecil dan dua jam dengan posisi jarum yang berbeda."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jam yang sama: menit selesai dikurangi menit mulai."]}
        >
          <PetaContoh
            polos
            pusat="Jam sama"
            cabang={[
              { ikon: "🕐", judul: "Mulai", isi: "13.10" },
              { ikon: "🕑", judul: "Selesai", isi: "13.45" },
              { ikon: "➖", judul: "Kurangi", isi: "menit saja" },
            ]}
            kolom={["Mulai", "Selesai", "Hitung", "Lama"]}
            baris={[["13.10", "13.45", "45 − 10", "35 menit"]]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Latihan dari pukul 11.20 sampai 11.50. Ucapkan lamanya."
            periksa={(teks) => nilaiWaktu(teks, "30", "tiga puluh", MENIT)}
            petunjuk="Sebutkan lamanya beserta satuannya."
            benar="30 menit."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Lambang ikon="🕐" teks="14.15 → 14.40" />}
            pertanyaan="Tulis lamanya dalam menit."
            pesanSalah="Jamnya sama. Kurangi menitnya."
            bantuan="40 − 15 = 25. Jadi 25 menit."
            umpan="25 menit."
            periksa={(teks) => nilaiWaktu(teks, "25", "dua puluh lima", MENIT)}
            alias={["25", "menit"]}
            konteks="25 menit."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Lewati jam bulat"
          src="/doodle-mtk/mtk-3-waktu-sub4.jpg"
          alt="Dua jam di kiri dan kanan tirai panggung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Hitung dulu sampai jam bulat. Lalu tambahkan menit sesudahnya."]}
        >
          <PetaContoh
            polos
            pusat="Jam bulat"
            cabang={[
              { ikon: "🕐", judul: "Mulai", isi: "04.55" },
              { ikon: "🕛", judul: "Bulat", isi: "05.00" },
              { ikon: "🕑", judul: "Selesai", isi: "05.20" },
            ]}
            kolom={["Bagian", "Hitung", "Menit"]}
            baris={[
              ["04.55 → 05.00", "sampai jam bulat", "5"],
              ["05.00 → 05.20", "sesudahnya", "20"],
              ["jumlah", "5 + 20", "25"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Latihan dari pukul 06.40 sampai 07.00. Ucapkan lamanya."
            periksa={(teks) => nilaiWaktu(teks, "20", "dua puluh", MENIT)}
            petunjuk="Sebutkan lamanya beserta satuannya."
            benar="20 menit."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Lambang ikon="🕐" teks="15.45 → 16.00" />}
            pertanyaan="Tulis lamanya dalam menit."
            pesanSalah="Hitung sampai jam 16.00."
            bantuan="60 − 45 = 15. Jadi 15 menit."
            umpan="15 menit."
            periksa={(teks) => nilaiWaktu(teks, "15", "lima belas", MENIT)}
            alias={["15", "menit"]}
            konteks="15 menit."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Tambah tujuh hari"
          src="/doodle-mtk/mtk-3-waktu-sub5.jpg"
          alt="Kalender kotak kosong dengan satu bintang emas."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Dua minggu ada 14 hari. Seminggu lagi, tanggal ditambah 7."]}
        >
          <PetaContoh
            polos
            pusat="Kalender"
            cabang={[
              { ikon: "📅", judul: "1 minggu", isi: "7 hari" },
              { ikon: "✖️", judul: "2 minggu", isi: "kali 7" },
              { ikon: "➕", judul: "Tanggal", isi: "tambah 7" },
            ]}
            kolom={["Ide", "Hitung", "Hasil"]}
            baris={[
              ["2 minggu", "2 × 7", "14 hari"],
              ["tanggal 8", "8 + 7", "tanggal 15"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="3 minggu ada berapa hari? Ucapkan hasilnya."
            periksa={(teks) => nilaiWaktu(teks, "21", "dua puluh satu", HARI)}
            petunjuk="Sebutkan hasilnya beserta kata hari."
            benar="21 hari."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Lambang ikon="📅" teks="tanggal 9 + 7" />}
            pertanyaan="Tulis tanggalnya."
            pesanSalah="Tambahkan 7 pada tanggalnya."
            bantuan="9 + 7 = 16."
            umpan="Tanggal 16."
            periksa={(teks) => nilaiWaktu(teks, "16", "enam belas", [])}
            alias={["16", "enam belas"]}
            konteks="tanggal 16."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. 4 menit sama dengan..."
          visual={<Lambang ikon="⏱️" teks="4 menit" />}
          pilihan={[
            { huruf: "A", teks: "40 detik" },
            { huruf: "B", teks: "240 detik" },
            { huruf: "C", teks: "400 detik" },
            { huruf: "D", teks: "4 detik" },
          ]}
          benar="B"
          salah="1 menit = 60 detik. Kalikan 4."
          umpan="4 × 60 = 240. Jadi 240 detik."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan waktu dengan hasil ubahnya."
          baris={[
            { kiri: "2 jam", pilihan: PASANGAN_B, benar: "120 menit" },
            { kiri: "3 menit", pilihan: PASANGAN_B, benar: "180 detik" },
            { kiri: "2 minggu", pilihan: PASANGAN_B, benar: "14 hari" },
            { kiri: "1 jam", pilihan: PASANGAN_B, benar: "60 menit" },
          ]}
          umpan="120 menit, 180 detik, 14 hari, dan 60 menit."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari yang paling singkat."
          acak={["1 jam", "15 menit", "2 jam", "90 menit"]}
          benar={["15 menit", "1 jam", "90 menit", "2 jam"]}
          umpan="15 menit, 1 jam, 90 menit, 2 jam."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa tiga pernyataan."
          baris={[
            { teks: "Jarum pendek menunjukkan jam.", benar: true },
            { teks: "1 menit = 100 detik.", benar: false },
            { teks: "Sabtu, 5 hari setelah Senin tanggal 12, jatuh pada tanggal 17.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 1 menit = 60 detik."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. 2 jam = 120 menit. Maka 4 jam sama dengan..."
          pilihan={[
            { huruf: "A", teks: "80 menit" },
            { huruf: "B", teks: "240 menit" },
            { huruf: "C", teks: "400 menit" },
            { huruf: "D", teks: "40 menit" },
          ]}
          benar="B"
          salah="Kalikan 4 dengan 60."
          umpan="4 × 60 = 240. Jadi 240 menit."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_WAKTU.kartu[2];
  return (
    <KartuBingkai latar="bg-[#F8F7FF]">
      <KepalaKartu
        ikon="🎭🦉"
        judul={kartu.judul}
        anak="Sepuluh pos pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-waktu-permainan.jpg"
        alt="Sepuluh pos di aula. Burung hantu Igil memegang stempel."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_WAKTU}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_WAKTU}
          penutup="Sepuluh stempel terkumpul. Latihan pentas selesai."
          bunga="🎭🦉⭐"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_WAKTU.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🦉 Penjaga Pentas Ulung" : skor >= 6 ? "🎭 Pengatur Jadwal" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Waktumu rapi dan tepat."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga pentas."
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
        src="/doodle-mtk/mtk-3-waktu-evaluasi.jpg"
        alt="Nisa, Farhan, dan Cinta menulis di meja. Igil menunggu di samping jam."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Menit ke detik"
          visual={<Lambang ikon="⏱️" teks="6 menit" />}
          pertanyaan="Tulis lama itu dalam detik."
          pesanSalah="1 menit = 60 detik. Kalikan 6."
          bantuan="6 × 60 = 360. Jadi 360 detik."
          umpan="360 detik."
          periksa={(teks) => nilaiWaktu(teks, "360", "tiga ratus enam puluh", DETIK)}
          alias={["360", "detik"]}
          konteks="360 detik."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Jarum panjang di angka 4. Itu sama dengan..."
          pilihan={[
            { huruf: "A", teks: "4 menit" },
            { huruf: "B", teks: "20 menit" },
            { huruf: "C", teks: "40 menit" },
            { huruf: "D", teks: "45 menit" },
          ]}
          benar="B"
          salah="Angka pada jam dikali 5."
          umpan="4 × 5 = 20. Jadi 20 menit."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. 2 jam sama dengan berapa menit? Ucapkan hasilnya."
          periksa={(teks) => nilaiWaktu(teks, "120", "seratus dua puluh", MENIT)}
          petunjuk="Sebutkan hasilnya beserta satuannya."
          benar="120 menit."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Mana yang paling lama?"
          pilihan={[
            { huruf: "A", teks: "30 menit" },
            { huruf: "B", teks: "1 jam" },
            { huruf: "C", teks: "45 menit" },
            { huruf: "D", teks: "20 menit" },
          ]}
          benar="B"
          salah="Ubah dulu ke menit, lalu bandingkan."
          umpan="1 jam = 60 menit. Itu yang paling lama."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan waktu dengan hasil ubahnya."
          baris={[
            { kiri: "3 jam", pilihan: PASANGAN_D, benar: "180 menit" },
            { kiri: "4 menit", pilihan: PASANGAN_D, benar: "240 detik" },
            { kiri: "1 minggu", pilihan: PASANGAN_D, benar: "7 hari" },
            { kiri: "5 jam", pilihan: PASANGAN_D, benar: "300 menit" },
          ]}
          umpan="180 menit, 240 detik, 7 hari, dan 300 menit."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Lama latihan"
          visual={<Lambang ikon="🕐" teks="16.20 → 16.55" />}
          pertanyaan="Tulis lamanya dalam menit."
          pesanSalah="Jamnya sama. Kurangi menitnya."
          bantuan="55 − 20 = 35. Jadi 35 menit."
          umpan="35 menit."
          periksa={(teks) => nilaiWaktu(teks, "35", "tiga puluh lima", MENIT)}
          alias={["35", "menit"]}
          konteks="35 menit."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun dari yang paling singkat."
          acak={["1 jam", "10 menit", "2 jam", "70 menit"]}
          benar={["10 menit", "1 jam", "70 menit", "2 jam"]}
          umpan="10 menit, 1 jam, 70 menit, 2 jam."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Periksa tiga pernyataan."
          baris={[
            { teks: "1 menit = 60 detik.", benar: true },
            { teks: "Jarum panjang menunjukkan hari.", benar: false },
            { teks: "2 minggu = 14 hari.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Jarum panjang menunjukkan menit."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Latihan dari pukul 09.00 sampai 09.30. Ucapkan lamanya."
          periksa={(teks) => nilaiWaktu(teks, "30", "tiga puluh", MENIT)}
          petunjuk="Sebutkan lamanya beserta satuannya."
          benar="30 menit."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Lagu A 2 jam, lagu B 90 menit, lagu C 1 jam. Paling lama..."
          pilihan={[
            { huruf: "A", teks: "Lagu A" },
            { huruf: "B", teks: "Lagu B" },
            { huruf: "C", teks: "Lagu C" },
            { huruf: "D", teks: "Ketiganya sama" },
          ]}
          benar="A"
          salah="Ubah dulu ke menit, lalu bandingkan."
          umpan="2 jam = 120 menit. Itu lagu A."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
        <p className="text-center text-sm font-semibold text-slate-600">{pesan}</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Waktu({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Jarum pendek menunjukkan jam. Jarum panjang menunjukkan menit. Angkanya dikali 5.",
    "1 jam = 60 menit. 1 menit = 60 detik.",
    "Jika jamnya sama, menit selesai dikurangi menit mulai.",
    "Melewati jam bulat: hitung sampai jam itu, lalu tambahkan sisanya.",
    "1 minggu = 7 hari. Tanggal seminggu lagi ditambah 7.",
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
          src: "/doodle-mtk/mtk-3-waktu-poin.jpg",
          alt: "Burung hantu Igil di samping jam dan kalender aula.",
        }}
        cuplikan={cuplikanKalimat([
          "Ini yang perlu kalian ingat. Pendek untuk jam, panjang untuk menit.",
          "Satu jam ada 60 menit. Satu menit ada 60 detik. Satu minggu ada 7 hari.",
          "Hitung lamanya, lalu tandai tanggal di kalender.",
        ])}
        poin={poin}
        penutup="Lihat jarum, hitung lama, lalu tandai tanggal."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
