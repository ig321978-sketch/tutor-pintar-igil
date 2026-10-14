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
import { MISI_MTK3_UANG, TEMA_MTK3_UANG } from "@/lib/misi-mtk-3-uang";
import { MODUL_MTK3_UANG } from "@/lib/modul-resmi-mtk-3-uang";
import { cukupAtauKurang, nilaiUang } from "@/lib/nilai-mtk-3-uang";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_UANG.id;

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

const BACAAN = ["lima ratus", "dua ribu", "dua puluh ribu"];
const HASIL_B = ["Rp2.000", "Rp10.000", "Rp6.000"];
const HASIL_D = ["Rp8.000", "Rp1.000", "Rp3.000"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UANG.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🪙🦉"
        judul={kartu.judul}
        anak="Nisa, Farhan, Cinta, dan Igil di warung koin"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">
        Tujuan: mengenal pecahan rupiah, menjumlah belanja, dan menghitung kembalian.
      </p>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Pecahan uang"
          src="/doodle-mtk/mtk-3-uang-sub1.jpg"
          alt="Warung jajan. Igil memakai topi biru, Nisa, Farhan, dan Cinta memegang koin dan lembar uang polos."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Pecahan uang punya nilai. Bandingkan angkanya."]}
        >
          <Dialog nama="Igil" anak="Ini keping seribu. Ini lembar sepuluh ribu." />
          <Dialog nama="Farhan" anak="Kepingnya kelihatan tebal. Apa nilainya lebih besar?" />
          <Dialog nama="Nisa" anak="Tidak. Sepuluh keping seribu baru sama dengan satu lembar sepuluh ribu." />
          <Dialog nama="Cinta" anak="Jadi lembar sepuluh ribu lebih besar." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Rp2.000 atau Rp5.000. Sebutkan yang lebih besar."
            periksa={(teks) => nilaiUang(teks, 5000, ["lima ribu"], ["puluh", "ratus"])}
            petunjuk="Bandingkan ribuannya."
            benar="Rp5.000 lebih besar."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="🪙 Rp500   +   🪙 Rp500" />}
            pertanyaan="Dua keping Rp500. Tulis jumlahnya."
            pesanSalah="Jumlahkan kedua keping."
            bantuan="Dua kali lima ratus sama dengan seribu."
            umpan="Rp1.000."
            periksa={(teks) => nilaiUang(teks, 1000, ["seribu", "satu ribu"], ["sepuluh", "puluh", "lima ratus", "dua"])}
            alias={["1000", "1.000", "seribu", "satu ribu"]}
            konteks="Dua keping Rp500 berjumlah Rp1.000."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Menjumlahkan pecahan"
          src="/doodle-mtk/mtk-3-uang-sub2.jpg"
          alt="Cinta dan Farhan menumpuk koin dan lembar uang polos. Igil mengawasi dari meja warung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlahkan semua pecahan yang dipegang."]}
        >
          <Dialog nama="Cinta" anak="Aku pegang lima ribu dan dua ribu." />
          <Dialog nama="Farhan" anak="Lima ditambah dua. Tujuh." />
          <Dialog nama="Igil" anak="Benar. Jumlahnya tujuh ribu." />
          <Dialog nama="Nisa" anak="Keping lima ratus juga dihitung, ya." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Rp10.000 ditambah Rp1.000. Sebutkan jumlahnya."
            periksa={(teks) => nilaiUang(teks, 11000, ["sebelas ribu"], ["ratus"])}
            petunjuk="Jumlahkan kedua pecahan."
            benar="Rp11.000."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="Rp2.000 + Rp500" />}
            pertanyaan="Tulis jumlah Rp2.000 dan Rp500."
            pesanSalah="Dua ribu ditambah lima ratus."
            bantuan="Hasilnya dua ribu lima ratus."
            umpan="Rp2.500."
            periksa={(teks) => nilaiUang(teks, 2500, ["dua ribu lima ratus"])}
            alias={["2500", "2.500", "dua ribu lima ratus"]}
            konteks="Rp2.000 + Rp500 = Rp2.500."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Harga belanja"
          src="/doodle-mtk/mtk-3-uang-sub3.jpg"
          alt="Baki susu, stiker, dan pensil dengan label harga polos. Tiga anak dan burung hantu di warung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlahkan harga, atau kalikan banyak barang dengan harga satuannya."]}
        >
          <Dialog nama="Nisa" anak="Buku enam ribu. Rautan dua ribu." />
          <Dialog nama="Cinta" anak="Enam ditambah dua menjadi delapan." />
          <Dialog nama="Igil" anak="Jumlah belanja delapan ribu." />
          <Dialog nama="Farhan" anak="Kalau barangnya sama, kalikan saja." />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Susu Rp4.000 dan roti Rp3.000. Sebutkan jumlah harganya."
            periksa={(teks) => nilaiUang(teks, 7000, ["tujuh ribu"], ["ratus", "puluh", "belas"])}
            petunjuk="Jumlahkan kedua harga."
            benar="Rp7.000."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="✏️ Rp3.000   ×   2" />}
            pertanyaan="2 pensil, tiap pensil Rp3.000. Tulis jumlahnya."
            pesanSalah="Kalikan banyak pensil dengan harganya."
            bantuan="2 × 3.000 = 6.000."
            umpan="Rp6.000."
            periksa={(teks) => nilaiUang(teks, 6000, ["enam ribu"], ["ratus", "puluh", "belas"])}
            alias={["6000", "6.000", "enam ribu"]}
            konteks="2 × Rp3.000 = Rp6.000."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Kembalian"
          src="/doodle-mtk/mtk-3-uang-sub4.jpg"
          alt="Igil mengulurkan koin kembalian dari meja warung kepada Farhan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kembalian sama dengan uang dibayar dikurangi harga."]}
        >
          <Dialog nama="Farhan" anak="Bola ini dua belas ribu. Aku bayar dua puluh ribu." />
          <Dialog nama="Nisa" anak="Dua puluh kurangi dua belas." />
          <Dialog nama="Igil" anak="Kembaliannya delapan ribu." />
          <Dialog nama="Cinta" anak="Uang yang kembali adalah sisa setelah harga." />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Harga Rp9.000, dibayar Rp10.000. Sebutkan kembaliannya."
            periksa={(teks) => nilaiUang(teks, 1000, ["seribu", "satu ribu"], ["sepuluh", "sembilan", "puluh"])}
            petunjuk="Kurangkan harga dari uang yang dibayar."
            benar="Kembalian Rp1.000."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="Rp10.000 − Rp4.000" />}
            pertanyaan="Harga Rp4.000, dibayar Rp10.000. Tulis kembaliannya."
            pesanSalah="Kurangkan harga dari uang yang dibayar."
            bantuan="10.000 − 4.000 = 6.000."
            umpan="Rp6.000."
            periksa={(teks) => nilaiUang(teks, 6000, ["enam ribu"], ["ratus", "puluh", "belas"])}
            alias={["6000", "6.000", "enam ribu"]}
            konteks="Rp10.000 − Rp4.000 = Rp6.000."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Cukup atau kurang"
          src="/doodle-mtk/mtk-3-uang-sub5.jpg"
          alt="Cinta memegang dompet tipis di depan kotak pensil berlabel polos. Igil menunjuk label itu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Uang cukup jika sama atau lebih besar dari harga."]}
        >
          <Dialog nama="Cinta" anak="Aku pegang enam ribu. Kotak pensil sepuluh ribu." />
          <Dialog nama="Farhan" anak="Enam lebih kecil dari sepuluh." />
          <Dialog nama="Igil" anak="Masih kurang empat ribu." />
          <Dialog nama="Nisa" anak="Kalau uangnya sama dengan harga, itu sudah cukup." />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Punya Rp8.000, harga Rp6.000. Cukup atau kurang?"
            periksa={(teks) => cukupAtauKurang(teks, "cukup")}
            petunjuk="Bandingkan uang yang dipegang dan harganya."
            benar="Cukup."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="Punya Rp3.000 · Harga Rp5.000" />}
            pertanyaan="Punya Rp3.000, harga Rp5.000. Tulis berapa yang kurang."
            pesanSalah="Kurangkan uang yang dipegang dari harganya."
            bantuan="5.000 − 3.000 = 2.000."
            umpan="Kurang Rp2.000."
            periksa={(teks) => nilaiUang(teks, 2000, ["dua ribu"], ["puluh", "ratus", "belas", "lima"])}
            alias={["2000", "2.000", "dua ribu"]}
            konteks="Harga Rp5.000, uang Rp3.000, kurang Rp2.000."
          />
        </Adegan>

        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="Mana pecahan yang paling besar?"
          visual={<Papan anak="🪙 Rp2.000   💵 Rp20.000   💵 Rp5.000   🪙 Rp500" />}
          pilihan={[
            { huruf: "A", teks: "Rp2.000" },
            { huruf: "B", teks: "Rp20.000" },
            { huruf: "C", teks: "Rp5.000" },
            { huruf: "D", teks: "Rp500" },
          ]}
          benar="B"
          umpan="Rp20.000 paling besar."
          salah="Bandingkan angkanya dari yang paling besar."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="Pasangkan pecahan dengan bacaannya."
          baris={[
            { kiri: "Rp500", pilihan: BACAAN, benar: "lima ratus" },
            { kiri: "Rp2.000", pilihan: BACAAN, benar: "dua ribu" },
            { kiri: "Rp20.000", pilihan: BACAAN, benar: "dua puluh ribu" },
          ]}
          umpan="Lima ratus, dua ribu, dua puluh ribu."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="Susun dari yang paling kecil."
          acak={["Rp5.000", "Rp500", "Rp10.000", "Rp1.000"]}
          benar={["Rp500", "Rp1.000", "Rp5.000", "Rp10.000"]}
          umpan="Rp500, Rp1.000, Rp5.000, lalu Rp10.000."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "Rp10.000 lebih besar dari Rp1.000.", benar: true },
            { teks: "3 keping Rp1.000 sama dengan Rp5.000.", benar: false },
            { teks: "Kembalian dihitung dari uang dibayar dikurangi harga.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. 3 keping seribu sama dengan Rp3.000."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="Bayar Rp20.000, harga Rp15.000. Kembaliannya..."
          visual={<Papan anak="Rp20.000 − Rp15.000" />}
          pilihan={[
            { huruf: "A", teks: "Rp5.000" },
            { huruf: "B", teks: "Rp35.000" },
            { huruf: "C", teks: "Rp15.000" },
            { huruf: "D", teks: "Rp2.000" },
          ]}
          benar="A"
          umpan="20.000 − 15.000 = 5.000."
          salah="Kurangkan harga dari uang yang dibayar."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UANG.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="💰"
        judul={kartu.judul}
        anak="Papan pecahan, belanja, dan kembalian"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 — Nilai pecahan"
          src="/doodle-mtk/mtk-3-uang-sub1.jpg"
          alt="Koin dan lembar uang polos berjajar di meja warung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Satu lembar sepuluh ribu sama dengan dua lembar lima ribu."]}
        >
          <PetaContoh
            pusat="Rp10.000"
            cabang={[
              { ikon: "💵", judul: "Satu lembar", isi: "Rp10.000" },
              { ikon: "💵", judul: "Dua lembar", isi: "2 × Rp5.000" },
              { ikon: "🪙", judul: "Sepuluh keping", isi: "10 × Rp1.000" },
            ]}
            kolom={["Pecahan", "Banyak", "Jumlah"]}
            baris={[
              ["Rp10.000", "1", "Rp10.000"],
              ["Rp5.000", "2", "Rp10.000"],
              ["Rp1.000", "10", "Rp10.000"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Rp50.000 atau Rp20.000. Sebutkan yang lebih besar."
            periksa={(teks) => nilaiUang(teks, 50000, ["lima puluh ribu"], ["ratus"])}
            petunjuk="Bandingkan puluh ribunya."
            benar="Rp50.000 lebih besar."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="🪙 Rp1.000 × 5" />}
            pertanyaan="Lima keping Rp1.000. Tulis jumlahnya."
            pesanSalah="Kalikan lima dengan seribu."
            bantuan="5 × 1.000 = 5.000."
            umpan="Rp5.000."
            periksa={(teks) => nilaiUang(teks, 5000, ["lima ribu"], ["puluh", "ratus"])}
            alias={["5000", "5.000", "lima ribu"]}
            konteks="5 × Rp1.000 = Rp5.000."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 — Uang di tangan"
          src="/doodle-mtk/mtk-3-uang-sub2.jpg"
          alt="Tumpukan koin dan lembar uang polos di atas meja."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlahkan setiap pecahan yang ada."]}
        >
          <PetaContoh
            pusat="Rp8.500"
            cabang={[
              { ikon: "💵", judul: "Lima ribu", isi: "Rp5.000" },
              { ikon: "💵", judul: "Dua ribu", isi: "Rp2.000" },
              { ikon: "🪙", judul: "Seribu lima ratus", isi: "Rp1.500" },
            ]}
            kolom={["Pecahan", "Nilai", "Peran"]}
            baris={[
              ["Rp5.000", "5.000", "lembar"],
              ["Rp2.000", "2.000", "lembar"],
              ["Rp1.000", "1.000", "keping"],
              ["Rp500", "500", "keping"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Tiga lembar Rp2.000. Sebutkan jumlahnya."
            periksa={(teks) => nilaiUang(teks, 6000, ["enam ribu"], ["ratus", "puluh", "belas"])}
            petunjuk="Jumlahkan tiga pecahan yang sama."
            benar="Rp6.000."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="Rp10.000 + Rp500" />}
            pertanyaan="Tulis jumlah Rp10.000 dan Rp500."
            pesanSalah="Sepuluh ribu ditambah lima ratus."
            bantuan="Hasilnya sepuluh ribu lima ratus."
            umpan="Rp10.500."
            periksa={(teks) => nilaiUang(teks, 10500, ["sepuluh ribu lima ratus"])}
            alias={["10500", "10.500", "sepuluh ribu lima ratus"]}
            konteks="Rp10.000 + Rp500 = Rp10.500."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 — Jumlah harga"
          src="/doodle-mtk/mtk-3-uang-sub3.jpg"
          alt="Buku, pensil, dan penghapus dengan label polos."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jumlahkan harga tiap barang."]}
        >
          <PetaContoh
            pusat="Rp9.000"
            cabang={[
              { ikon: "📘", judul: "Buku", isi: "Rp5.000" },
              { ikon: "✏️", judul: "Pensil", isi: "Rp3.000" },
              { ikon: "🧽", judul: "Penghapus", isi: "Rp1.000" },
            ]}
            kolom={["Barang", "Harga", "Sampai sini"]}
            baris={[
              ["buku", "Rp5.000", "5.000"],
              ["pensil", "Rp3.000", "8.000"],
              ["penghapus", "Rp1.000", "9.000"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="3 stiker, tiap stiker Rp1.000. Sebutkan jumlahnya."
            periksa={(teks) => nilaiUang(teks, 3000, ["tiga ribu"], ["ratus", "puluh", "belas"])}
            petunjuk="Kalikan banyak barang dengan harganya."
            benar="Rp3.000."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="🥛 Rp4.000 × 2" />}
            pertanyaan="2 susu, tiap susu Rp4.000. Tulis jumlahnya."
            pesanSalah="Kalikan dua dengan empat ribu."
            bantuan="2 × 4.000 = 8.000."
            umpan="Rp8.000."
            periksa={(teks) => nilaiUang(teks, 8000, ["delapan ribu"], ["ratus", "puluh", "belas"])}
            alias={["8000", "8.000", "delapan ribu"]}
            konteks="2 × Rp4.000 = Rp8.000."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 — Rumus kembalian"
          src="/doodle-mtk/mtk-3-uang-sub4.jpg"
          alt="Meja kas dengan kotak uang dan koin yang dikembalikan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Kembalian = uang dibayar − harga."]}
        >
          <PetaContoh
            pusat="Rp3.000"
            cabang={[
              { ikon: "💵", judul: "Dibayar", isi: "Rp10.000" },
              { ikon: "🏷️", judul: "Harga", isi: "Rp7.000" },
              { ikon: "🪙", judul: "Kembali", isi: "Rp3.000" },
            ]}
            kolom={["Langkah", "Hitung", "Hasil"]}
            baris={[
              ["uang", "dibayar", "10.000"],
              ["harga", "dikurangi", "7.000"],
              ["kembalian", "10.000 − 7.000", "3.000"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Harga Rp6.000, dibayar Rp20.000. Sebutkan kembaliannya."
            periksa={(teks) => nilaiUang(teks, 14000, ["empat belas ribu"])}
            petunjuk="Kurangkan harga dari uang yang dibayar."
            benar="Kembalian Rp14.000."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="Rp10.000 − Rp8.000" />}
            pertanyaan="Harga Rp8.000, dibayar Rp10.000. Tulis kembaliannya."
            pesanSalah="Kurangkan harga dari uang yang dibayar."
            bantuan="10.000 − 8.000 = 2.000."
            umpan="Rp2.000."
            periksa={(teks) => nilaiUang(teks, 2000, ["dua ribu"], ["puluh", "ratus", "belas"])}
            alias={["2000", "2.000", "dua ribu"]}
            konteks="Rp10.000 − Rp8.000 = Rp2.000."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 — Uang cukup"
          src="/doodle-mtk/mtk-3-uang-sub5.jpg"
          alt="Dompet dan label harga polos di meja warung."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={["Jika uang lebih kecil dari harga, hitung kekurangannya."]}
        >
          <PetaContoh
            pusat="Kurang"
            cabang={[
              { ikon: "👛", judul: "Dipegang", isi: "Rp4.000" },
              { ikon: "🏷️", judul: "Harus bayar", isi: "Rp9.000" },
              { ikon: "➖", judul: "Selisih", isi: "Rp5.000" },
            ]}
            kolom={["Cek", "Angka", "Makna"]}
            baris={[
              ["uang", "4.000", "dipegang"],
              ["harga", "9.000", "harus dibayar"],
              ["selisih", "5.000", "masih kurang"],
            ]}
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Punya Rp12.000, harga Rp12.000. Cukup atau kurang?"
            periksa={(teks) => cukupAtauKurang(teks, "cukup")}
            petunjuk="Bandingkan kedua angka."
            benar="Cukup. Uangnya pas."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="Punya Rp7.000 · Harga Rp10.000" />}
            pertanyaan="Punya Rp7.000, harga Rp10.000. Tulis berapa yang kurang."
            pesanSalah="Kurangkan uang yang dipegang dari harganya."
            bantuan="10.000 − 7.000 = 3.000."
            umpan="Kurang Rp3.000."
            periksa={(teks) => nilaiUang(teks, 3000, ["tiga ribu"], ["ratus", "puluh", "belas"])}
            alias={["3000", "3.000", "tiga ribu"]}
            konteks="Harga Rp10.000, uang Rp7.000, kurang Rp3.000."
          />
        </Adegan>

        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="4 stiker, tiap stiker Rp2.000. Jumlahnya..."
          visual={<Papan anak="Rp2.000 × 4" />}
          pilihan={[
            { huruf: "A", teks: "Rp6.000" },
            { huruf: "B", teks: "Rp8.000" },
            { huruf: "C", teks: "Rp4.000" },
            { huruf: "D", teks: "Rp2.000" },
          ]}
          benar="B"
          umpan="4 × 2.000 = 8.000."
          salah="Kalikan banyak stiker dengan harganya."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="Pasangkan hitungan dengan hasilnya."
          baris={[
            { kiri: "Rp1.000 + Rp1.000", pilihan: HASIL_B, benar: "Rp2.000" },
            { kiri: "Rp5.000 + Rp5.000", pilihan: HASIL_B, benar: "Rp10.000" },
            { kiri: "Rp10.000 − Rp4.000", pilihan: HASIL_B, benar: "Rp6.000" },
          ]}
          umpan="Dua ribu, sepuluh ribu, dan enam ribu."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="Susun dari yang paling kecil."
          acak={["Rp2.500", "Rp500", "Rp7.000", "Rp1.500"]}
          benar={["Rp500", "Rp1.500", "Rp2.500", "Rp7.000"]}
          umpan="Rp500, Rp1.500, Rp2.500, lalu Rp7.000."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="Benar atau salah?"
          baris={[
            { teks: "2 lembar Rp10.000 sama dengan Rp20.000.", benar: true },
            { teks: "Bayar Rp5.000 untuk harga Rp8.000, uangnya cukup.", benar: false },
            { teks: "Rp500 + Rp500 = Rp1.000.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Lima ribu kurang dari delapan ribu."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="Punya Rp15.000. Beli Rp6.000 dan Rp4.000. Sisa uang..."
          visual={<Papan anak="Rp15.000 − Rp6.000 − Rp4.000" />}
          pilihan={[
            { huruf: "A", teks: "Rp5.000" },
            { huruf: "B", teks: "Rp10.000" },
            { huruf: "C", teks: "Rp15.000" },
            { huruf: "D", teks: "Rp25.000" },
          ]}
          benar="A"
          umpan="Belanja 10.000. 15.000 − 10.000 = 5.000."
          salah="Jumlahkan dulu kedua harga, lalu kurangkan dari uang."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_UANG.kartu[2];
  return (
    <KartuBingkai latar="bg-amber-50/40">
      <KepalaKartu
        ikon="🪙🦉"
        judul={kartu.judul}
        anak="Sepuluh soal pola"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-uang-permainan.jpg"
        alt="Burung hantu Igil di meja kas warung, memegang stempel. Kotak uang dan baki jajan di sampingnya."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pola. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_UANG}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_UANG}
          penutup="Laci koin tertutup. Igil menempelkan lencana kasir."
          bunga="🪙💰💵🦉"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_UANG.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Kasir Ahli" : skor >= 6 ? "🪙 Kasir Muda" : "🦉 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Catatan uangmu rapi."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi kasir ahli."
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
        src="/doodle-mtk/mtk-3-uang-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan stempel. Burung hantu berdiri di tepi meja, warung di belakang."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Kembalian tas"
          visual={<Papan anak="Bayar Rp20.000 · Harga Rp11.000" />}
          pertanyaan="Farhan membayar Rp20.000. Harga tas Rp11.000. Tulis kembaliannya."
          pesanSalah="Kurangkan harga dari uang yang dibayar."
          bantuan="20.000 − 11.000 = 9.000."
          umpan="Rp9.000."
          periksa={(teks) => nilaiUang(teks, 9000, ["sembilan ribu"], ["ratus", "puluh", "belas"])}
          alias={["9000", "9.000", "sembilan ribu"]}
          konteks="Rp20.000 − Rp11.000 = Rp9.000."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Mana yang lebih besar?"
          visual={<Papan anak="6 × Rp1.000    atau    Rp5.000" />}
          pilihan={[
            { huruf: "A", teks: "6 keping Rp1.000" },
            { huruf: "B", teks: "1 lembar Rp5.000" },
            { huruf: "C", teks: "Keduanya sama" },
            { huruf: "D", teks: "Rp500" },
          ]}
          benar="A"
          umpan="6 × 1.000 = 6.000. Lebih besar dari 5.000."
          salah="Jumlahkan kepingnya dulu, lalu bandingkan."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Harga Rp7.000, dibayar Rp10.000. Sebutkan kembaliannya."
          periksa={(teks) => nilaiUang(teks, 3000, ["tiga ribu"], ["ratus", "puluh", "belas"])}
          petunjuk="Kurangkan harga dari uang yang dibayar."
          benar="Kembalian Rp3.000."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. 5 × Rp2.000 = ..."
          pilihan={[
            { huruf: "A", teks: "Rp7.000" },
            { huruf: "B", teks: "Rp10.000" },
            { huruf: "C", teks: "Rp5.000" },
            { huruf: "D", teks: "Rp2.500" },
          ]}
          benar="B"
          umpan="5 × 2.000 = 10.000."
          salah="Kalikan lima dengan dua ribu."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan hitungan dengan hasilnya."
          baris={[
            { kiri: "Rp10.000 − Rp2.000", pilihan: HASIL_D, benar: "Rp8.000" },
            { kiri: "Rp500 + Rp500", pilihan: HASIL_D, benar: "Rp1.000" },
            { kiri: "3 × Rp1.000", pilihan: HASIL_D, benar: "Rp3.000" },
          ]}
          umpan="Delapan ribu, seribu, dan tiga ribu."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Jumlah pecahan"
          visual={<Papan anak="Rp5.000 + Rp2.000 + Rp500" />}
          pertanyaan="Tulis jumlah Rp5.000, Rp2.000, dan Rp500."
          pesanSalah="Jumlahkan ketiganya."
          bantuan="5.000 + 2.000 + 500 = 7.500."
          umpan="Rp7.500."
          periksa={(teks) => nilaiUang(teks, 7500, ["tujuh ribu lima ratus"])}
          alias={["7500", "7.500", "tujuh ribu lima ratus"]}
          konteks="Rp5.000 + Rp2.000 + Rp500 = Rp7.500."
        />
        <SusunToken
          id={idKuis("D", 6)}
          perintah="7. Susun dari yang paling kecil."
          acak={["Rp10.000", "Rp500", "Rp2.000", "Rp7.500"]}
          benar={["Rp500", "Rp2.000", "Rp7.500", "Rp10.000"]}
          umpan="Rp500, Rp2.000, Rp7.500, lalu Rp10.000."
        />
        <KuisBenarSalah
          id={idKuis("D", 7)}
          perintah="8. Benar atau salah?"
          baris={[
            { teks: "Rp100.000 lebih besar dari Rp50.000.", benar: true },
            { teks: "Bayar Rp10.000 untuk harga Rp10.000, kembaliannya Rp10.000.", benar: false },
            { teks: "4 lembar Rp2.000 sama dengan Rp8.000.", benar: true },
          ]}
          umpan="Yang pertama dan ketiga benar. Harga pas, kembaliannya nol."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Punya Rp6.000, harga Rp9.000. Cukup atau kurang?"
          periksa={(teks) => cukupAtauKurang(teks, "kurang")}
          petunjuk="Bandingkan uang dan harga."
          benar="Kurang."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Nisa punya Rp10.000. Beli stiker Rp2.000 dan susu Rp3.000. Sisa uang..."
          visual={<Papan anak="Rp10.000 − Rp2.000 − Rp3.000" />}
          pilihan={[
            { huruf: "A", teks: "Rp5.000" },
            { huruf: "B", teks: "Rp15.000" },
            { huruf: "C", teks: "Rp10.000" },
            { huruf: "D", teks: "Rp1.000" },
          ]}
          benar="A"
          umpan="Belanja 5.000. 10.000 − 5.000 = 5.000."
          salah="Jumlahkan kedua harga, lalu kurangkan dari uang."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Uang({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Pecahan uang punya nilai. Lembar sepuluh ribu lebih besar dari keping seribu.",
    "Jumlahkan semua pecahan untuk tahu uang di tangan.",
    "Jumlah harga = harga dijumlahkan, atau banyak barang dikali harga satuan.",
    "Kembalian = uang dibayar − harga.",
    "Uang cukup jika sama atau lebih besar dari harga.",
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
          src: "/doodle-mtk/mtk-3-uang-poin.jpg",
          alt: "Igil dan tiga anak di warung koin memegang kartu polos.",
        }}
        cuplikan={cuplikanKalimat([
          "Ingat pecahannya. Bandingkan nilai, lalu jumlahkan.",
          "Harga dijumlahkan. Kembalian adalah uang dibayar dikurangi harga.",
          "Uang cukup jika sama atau lebih besar dari harga.",
        ])}
        poin={poin}
        penutup="Bandingkan, jumlahkan, lalu hitung kembalian."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
