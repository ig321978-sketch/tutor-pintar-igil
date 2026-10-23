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
import { MISI_MTK3_DATA, TEMA_MTK3_DATA } from "@/lib/misi-mtk-3-data";
import { MODUL_MTK3_DATA } from "@/lib/modul-resmi-mtk-3-data";
import { cocokBilangan, cocokKata, cocokUrutan } from "@/lib/nilai-mtk-3-data";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK3_DATA.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  "Ilmuwan IGIL": "border-emerald-300 bg-emerald-50",
  Zara: "border-teal-300 bg-teal-50",
  Rio: "border-orange-300 bg-orange-50",
  "Robot Bibo": "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  "Ilmuwan IGIL": "🧪",
  Zara: "👧",
  Rio: "👦",
  "Robot Bibo": "🤖",
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

function Tabel({ kolom, baris }: { kolom: string[]; baris: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm font-bold text-[#1C01A5]">
        <thead>
          <tr>
            {kolom.map((nama) => (
              <th key={nama} className="border-2 border-[#1C01A5]/20 bg-[#EEF2FF] px-2 py-2">
                {nama}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((sel, indeks) => (
            <tr key={`${sel[0]}-${indeks}`}>
              {sel.map((isi, kolomIndeks) => (
                <td key={`${indeks}-${kolomIndeks}`} className="border-2 border-[#1C01A5]/15 px-2 py-2 text-center">
                  {isi}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
            className={`min-h-12 rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
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
              className={`min-h-12 rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}
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
            className="min-h-12 rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
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
        className="mt-3 min-h-12 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
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
            className="min-h-12 rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
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
          className="min-h-12 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="min-h-12 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">
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
                  className={`min-h-12 rounded-full px-4 py-2 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}
                >
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 min-h-12 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">
        Periksa pernyataan
      </button>
      <HasilJawabanKuis status={status} pesanSalah="Hitung lagi, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

const WARNA_KUPU = ["3", "2", "1"];
const BUKU_B = ["Dongeng", "10", "45"];
const BUKU_D = ["3", "4", "2"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_DATA.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🌻🧪"
        judul={kartu.judul}
        anak="Rumah kaca Kebun Botani"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <TujuanBelajar
        butir={[
          "Mengurutkan data dari yang terkecil ke yang terbesar.",
          "Membaca nilai paling kecil, paling besar, dan yang paling sering muncul.",
          "Menyajikan data dalam tabel dengan turus dan kolom banyaknya.",
        ]}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Sub-bab 5.1 — Mengurutkan dan Membandingkan Data"
          src="/doodle-mtk/mtk-3-data-urut.svg"
          alt="Kartu angka acak 15, 12, 18, 12, 14 menjadi barisan 12, 12, 14, 15, 18."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Halo peneliti cilik! Kita urutkan kumpulan angka dari yang terkecil.",
            "Setelah rapi, nilai paling kecil, paling besar, dan yang paling sering muncul langsung kelihatan.",
          ]}
        >
          <Papan anak={"35   28   40   28   32   38   28\n↓\n28   28   28   32   35   38   40"} />
          <Dialog nama="Rio" anak="Ilmuwan IGIL, catatan tinggi bunga matahari kita berantakan! Aku bingung mana yang paling pendek dan paling tinggi." />
          <Dialog nama="Zara" anak="Jangan panik, Rio! Kita bariskan dulu: 28, 28, 28, 32, 35, 38, 40." />
          <Dialog nama="Ilmuwan IGIL" anak="Cerdas, Zara! Paling pendek 28 cm, paling tinggi 40 cm, dan 28 cm muncul pada 3 tanaman." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Dari urutan 28, 28, 28, 32, 35, 38, 40, berapakah tinggi yang paling besar? Ucapkan angkanya."
            periksa={(teks) => cocokBilangan(teks, 40)}
            petunjuk="Lihat angka paling kanan."
            benar="Empat puluh."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Berat labu"
            visual={<Papan anak="[ 7 ]   [ 4 ]   [ 9 ]   [ 5 ]\n[   ]   [   ]   [   ]   [   ]" />}
            pertanyaan="Urutkan berat labu dari yang terkecil. Tulis 4, 5, 7, 9."
            pesanSalah="Mulai dari angka yang paling kecil."
            bantuan="Yang paling kecil 4, lalu 5, 7, dan 9."
            umpan="4, 5, 7, 9."
            periksa={(teks) => cocokUrutan(teks, [4, 5, 7, 9])}
            alias={["4 5 7 9", "4579", "empat lima tujuh sembilan"]}
            konteks="Urutan berat labu dari kecil ke besar adalah 4, 5, 7, 9."
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 5.2 — Menyajikan Data dalam Bentuk Tabel"
          src="/doodle-mtk/mtk-3-data-tabel.svg"
          alt="Tabel panen dengan kolom jenis, turus, dan banyaknya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Data yang sudah terkumpul bisa dirapikan ke tabel.",
            "Ada kolom nama, kolom turus, dan kolom banyaknya.",
          ]}
        >
          <Tabel
            kolom={["Jenis", "Turus", "Banyaknya"]}
            baris={[
              ["Stroberi", "卌 |", "6 keranjang"],
              ["Tomat", "卌 卌", "10 keranjang"],
              ["Lemon", "||||", "4 keranjang"],
              ["Jumlah", "", "20 keranjang"],
            ]}
          />
          <Dialog nama="Robot Bibo" anak="Bip-bop! Catatan panen sudah masuk tabel, lengkap dengan turus dan angkanya." />
          <Dialog nama="Rio" anak="Rapi sekali! Tomat paling banyak, 10 keranjang. Lemon paling sedikit, 4 keranjang." />
          <Dialog nama="Ilmuwan IGIL" anak="Betul! 6 ditambah 10 ditambah 4 sama dengan 20 keranjang." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Stroberi 6, tomat 10, lemon 4. Buah apa yang panennya paling banyak? Sebutkan namanya."
            periksa={(teks) => cocokKata(teks, ["tomat"])}
            petunjuk="Lihat kolom banyaknya yang paling besar."
            benar="Tomat."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Pengunjung hari Minggu"
            visual={
              <Tabel
                kolom={["Hari", "Turus", "Banyaknya"]}
                baris={[
                  ["Jumat", "", "12 orang"],
                  ["Sabtu", "", "15 orang"],
                  ["Minggu", "卌 卌 卌", "?"],
                ]}
              />
            }
            pertanyaan="Hari Minggu punya 3 ikatan turus lima. Tuliskan banyak pengunjungnya."
            pesanSalah="Satu ikatan lima sama dengan 5. Hitung tiga ikatan."
            bantuan="5 + 5 + 5 = 15."
            umpan="15 orang."
            periksa={(teks) => cocokBilangan(teks, 15)}
            alias={["15", "lima belas"]}
            konteks="Tiga ikatan turus lima sama dengan 15 pengunjung."
          />
        </Adegan>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Lima permainan</p>
        <SusunToken
          id={idKuis("A", 4)}
          perintah="Susun botol 25, 19, 30, 22, 27 dari yang terkecil."
          acak={["25", "19", "30", "22", "27"]}
          benar={["19", "22", "25", "27", "30"]}
          umpan="19, 22, 25, 27, 30."
        />
        <Pilih
          id={idKuis("A", 5)}
          pertanyaan="Nomor sepatu: 31, 33, 30, 32, 34, 31, 32. Mana yang paling kecil?"
          visual={<Papan anak="31  33  30  32  34  31  32" />}
          pilihan={[
            { huruf: "A", teks: "31" },
            { huruf: "B", teks: "32" },
            { huruf: "C", teks: "30" },
            { huruf: "D", teks: "34" },
          ]}
          benar="C"
          umpan="30 paling kecil."
          salah="Cari angka yang paling kiri kalau diurutkan."
        />
        <KuisCocok
          id={idKuis("A", 6)}
          perintah="Warna kupu-kupu: biru, kuning, biru, merah, biru, kuning. Pasangkan frekuensinya."
          baris={[
            { kiri: "Biru", pilihan: WARNA_KUPU, benar: "3" },
            { kiri: "Kuning", pilihan: WARNA_KUPU, benar: "2" },
            { kiri: "Merah", pilihan: WARNA_KUPU, benar: "1" },
          ]}
          umpan="Biru 3, kuning 2, merah 1."
        />
        <KuisBenarSalah
          id={idKuis("A", 7)}
          perintah="Kumbang 8, capung 12, belalang 5. Benar atau salah?"
          baris={[
            { teks: "Selisih capung dan belalang adalah 7 ekor.", benar: true },
            { teks: "Kumbang lebih banyak daripada capung.", benar: false },
            { teks: "Belalang paling sedikit.", benar: true },
          ]}
          umpan="12 dikurangi 5 sama dengan 7. Belalang paling sedikit."
        />
        <Pilih
          id={idKuis("A", 8)}
          pertanyaan="Sains 10 siswa, tari 8 siswa, lukis 7 siswa. Jumlah seluruh siswa?"
          visual={<Papan anak="10 + 8 + 7" />}
          pilihan={[
            { huruf: "A", teks: "20 siswa" },
            { huruf: "B", teks: "25 siswa" },
            { huruf: "C", teks: "30 siswa" },
            { huruf: "D", teks: "15 siswa" },
          ]}
          benar="B"
          umpan="10 + 8 + 7 = 25."
          salah="Jumlahkan ketiga kelompok."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_DATA.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📊"
        judul={kartu.judul}
        anak="Dua papan cara membaca data"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      <div className="mt-4 space-y-4">
        <Adegan
          utama
          judul="Infografis 1 — Mengurutkan data acak"
          src="/doodle-mtk/mtk-3-data-urut.svg"
          alt="Barisan angka yang sudah diurut dari kecil ke besar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau angkanya panjang dan acak, urutkan dari yang terkecil.",
            "Coret angka yang sudah ditulis supaya tidak ada yang terlewat.",
          ]}
        >
          <PetaContoh
            pusat="8 data"
            cabang={[
              { ikon: "🔹", judul: "Terkecil", isi: "Angka paling kiri: 6" },
              { ikon: "🔸", judul: "Terbesar", isi: "Angka paling kanan: 10" },
              { ikon: "🏆", judul: "Paling sering", isi: "6 muncul 3 kali" },
            ]}
            kolom={["Awal", "Setelah diurut"]}
            baris={[["8, 6, 9, 7, 6, 10, 6, 8", "6, 6, 6, 7, 8, 8, 9, 10"]]}
          />
          <Papan anak="Selisih  10 − 6 = 4" />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Dari urutan 6, 6, 6, 7, 8, 8, 9, 10, angka berapa yang paling sering muncul?"
            periksa={(teks) => cocokBilangan(teks, 6)}
            petunjuk="Hitung angka yang tulisannya paling banyak."
            benar="Enam."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            pertanyaan="Berapa selisih angka terbesar 10 dan angka terkecil 6? Tuliskan angkanya."
            pesanSalah="Kurangkan angka paling kanan dengan angka paling kiri."
            bantuan="10 dikurangi 6 sama dengan 4."
            umpan="4."
            periksa={(teks) => cocokBilangan(teks, 4)}
            alias={["4", "empat"]}
            konteks="Selisih 10 dan 6 adalah 4."
          />
        </Adegan>
        <Adegan
          judul="Infografis 2 — Struktur tabel dan cek jumlah"
          src="/doodle-mtk/mtk-3-data-tabel.svg"
          alt="Tabel nilai ujian dengan kolom turus dan banyak siswa."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pindahkan data ke tabel dengan hati-hati.",
            "Jumlah kolom banyaknya harus sama dengan benda yang dihitung di awal.",
          ]}
        >
          <Tabel
            kolom={["Nilai", "Turus", "Banyak siswa"]}
            baris={[
              ["80", "||||", "4"],
              ["90", "卌 |||", "8"],
              ["100", "卌", "5"],
              ["Jumlah", "", "17"],
            ]}
          />
          <Papan anak={"Nilai 90 paling banyak: 8 siswa.\nDi atas 80: 8 + 5 = 13 siswa."} />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Nilai mana yang paling banyak diperoleh siswa: 80, 90, atau 100?"
            periksa={(teks) => cocokBilangan(teks, 90)}
            petunjuk="Lihat kolom banyak siswa yang paling besar."
            benar="Sembilan puluh."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            pertanyaan="Berapa banyak siswa yang mendapat nilai 80? Tuliskan angkanya."
            pesanSalah="Lihat baris nilai 80."
            bantuan="Baris 80 tertulis 4."
            umpan="4 siswa."
            periksa={(teks) => cocokBilangan(teks, 4)}
            alias={["4", "empat"]}
            konteks="Siswa yang mendapat nilai 80 ada 4 orang."
          />
        </Adegan>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Lima permainan</p>
        <Pilih
          id={idKuis("B", 4)}
          pertanyaan="Urutan yang pindah baru 9 angka: 11, 12, 12, 13, ?, 15, 15, 16, 17. Angka yang belum tertulis?"
          visual={<Papan anak="11  12  12  13  ?  15  15  16  17" />}
          pilihan={[
            { huruf: "A", teks: "12" },
            { huruf: "B", teks: "13" },
            { huruf: "C", teks: "14" },
            { huruf: "D", teks: "16" },
          ]}
          benar="C"
          umpan="Sesudah 13 adalah 14."
          salah="Lihat angka yang melompat."
        />
        <Pilih
          id={idKuis("B", 5)}
          pertanyaan="25 kg ada 4 anak, 28 kg ada 6, 30 kg ada 5, 32 kg ada 2. Berapa anak yang beratnya lebih dari 28 kg?"
          visual={<Papan anak="30 kg → 5\n32 kg → 2" />}
          pilihan={[
            { huruf: "A", teks: "5 anak" },
            { huruf: "B", teks: "6 anak" },
            { huruf: "C", teks: "7 anak" },
            { huruf: "D", teks: "11 anak" },
          ]}
          benar="C"
          umpan="5 ditambah 2 sama dengan 7."
          salah="Gabungkan 30 kg dan 32 kg."
        />
        <KuisCocok
          id={idKuis("B", 6)}
          perintah="Komik 15, ensiklopedia 10, dongeng 20. Pasangkan."
          baris={[
            { kiri: "Buku terbanyak", pilihan: BUKU_B, benar: "Dongeng" },
            { kiri: "Selisih dongeng dan ensiklopedia", pilihan: BUKU_B, benar: "10" },
            { kiri: "Total semua buku", pilihan: BUKU_B, benar: "45" },
          ]}
          umpan="Dongeng paling banyak. 20 dikurangi 10 sama dengan 10. Total 45."
        />
        <Pilih
          id={idKuis("B", 7)}
          pertanyaan="Total bibit 20 pohon. Mangga 8, jeruk 7. Turus jambu yang tepat?"
          visual={<Papan anak="20 − 8 − 7 = 5" />}
          pilihan={[
            { huruf: "A", teks: "3 garis" },
            { huruf: "B", teks: "4 garis" },
            { huruf: "C", teks: "1 ikatan lima" },
            { huruf: "D", teks: "2 ikatan lima" },
          ]}
          benar="C"
          umpan="Jambu 5 pohon. Itu satu ikatan lima."
          salah="Cari sisa supaya jumlahnya 20."
        />
        <Pilih
          id={idKuis("B", 8)}
          pertanyaan="Huruf: A, B, A, C, A, B, A, C, B. Mana yang frekuensinya paling tinggi?"
          visual={<Papan anak="A A A A    B B B    C C" />}
          pilihan={[
            { huruf: "A", teks: "Huruf A" },
            { huruf: "B", teks: "Huruf B" },
            { huruf: "C", teks: "Huruf C" },
            { huruf: "D", teks: "Sama banyak" },
          ]}
          benar="A"
          umpan="A muncul 4 kali."
          salah="Hitung tiap huruf."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK3_DATA.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🌟🧪"
        judul={kartu.judul}
        anak="Manajer laboratorium dan panen raya"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-data-lab.svg"
        alt="Meja kontrol kebun dengan lima bintang festival dan tabel panen."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh misi. Baca tabelnya, lalu putuskan.</p>
      <div className="mt-4">
        <MisiPenjagaKebun
          misi={MISI_MTK3_DATA}
          idMisi={(indeks) => idKuis("C", indeks)}
          idTulis={idKuisTulisKartu(ID, "C")}
          tema={TEMA_MTK3_DATA}
          penutup="Festival selesai. Ilmuwan IGIL menempelkan bintang panen."
          bunga="🌻🍓🍅🍋"
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK3_DATA.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Peneliti Data" : skor >= 6 ? "🌻 Peneliti Muda" : "🧪 Sahabat Kebun";
  const pesan =
    skor >= 9
      ? "Luar biasa! Tabelmu sudah rapi."
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi peneliti data."
        : "Ayo urutkan lagi angkanya bersama Ilmuwan IGIL. Kamu pasti bisa!";
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝🌻"
        judul={kartu.judul}
        anak={`${nama} · Kelas 3 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sekarang sepuluh soal tentang mengurutkan data dan membaca tabel.",
          "Perhatikan setiap angka dan kolomnya.",
        ])}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/doodle-mtk/mtk-3-data-evaluasi.svg"
        alt="Kartu evaluasi dengan tulisan sepuluh soal data."
        className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover"
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <Pilih
          id={idKuis("D", 0)}
          pertanyaan="Total lomba 30 siswa. Mewarnai 12, menyanyi 10. Berapa siswa membaca puisi?"
          visual={<Papan anak="30 − (12 + 10)" />}
          pilihan={[
            { huruf: "A", teks: "6 siswa" },
            { huruf: "B", teks: "8 siswa" },
            { huruf: "C", teks: "22 siswa" },
          ]}
          benar="B"
          umpan="12 + 10 = 22. 30 − 22 = 8."
          salah="Jumlahkan yang sudah diketahui, lalu kurangkan dari 30."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="Nilai 70 ada 5, nilai 80 ada 9, nilai 90 ada 6, nilai 100 ada 4. Berapa siswa yang nilainya 90 atau lebih?"
          visual={<Papan anak="90 → 6\n100 → 4" />}
          pilihan={[
            { huruf: "A", teks: "6 siswa" },
            { huruf: "B", teks: "10 siswa" },
            { huruf: "C", teks: "19 siswa" },
          ]}
          benar="B"
          umpan="6 + 4 = 10 siswa."
          salah="Gabungkan nilai 90 dan 100."
        />
        <Pilih
          id={idKuis("D", 2)}
          pertanyaan="Berat semangka: 4, 2, 6, 3, 5. Setelah diurut dari ringan ke berat, mana yang di urutan ke-3?"
          visual={<Papan anak="2  3  4  5  6" />}
          pilihan={[
            { huruf: "A", teks: "2 kg" },
            { huruf: "B", teks: "4 kg" },
            { huruf: "C", teks: "6 kg" },
          ]}
          benar="B"
          umpan="Urutannya 2, 3, 4, 5, 6. Tengah adalah 4."
          salah="Urutkan dulu, lalu hitung posisi ketiga."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="Apel 8, jeruk 11, mangga 9. Dua anak pindah dari jeruk ke apel. Buah apa yang sekarang paling banyak?"
          visual={<Papan anak="Apel 10 · Jeruk 9 · Mangga 9" />}
          pilihan={[
            { huruf: "A", teks: "Apel (10 anak)" },
            { huruf: "B", teks: "Jeruk (11 anak)" },
            { huruf: "C", teks: "Sama banyak (9 anak)" },
          ]}
          benar="A"
          umpan="Jeruk jadi 9. Apel jadi 10. Apel paling banyak."
          salah="Kurangi jeruk 2, tambah apel 2."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="Data buku: 3, 5, 4, 3, 6, 3, 5, 7. Pasangkan."
          baris={[
            { kiri: "Jumlah buku paling sedikit", pilihan: BUKU_D, benar: "3" },
            { kiri: "Selisih terbanyak dan paling sedikit", pilihan: BUKU_D, benar: "4" },
            { kiri: "Yang membaca 5 buku", pilihan: BUKU_D, benar: "2" },
          ]}
          umpan="Paling sedikit 3. 7 dikurangi 3 sama dengan 4. Angka 5 muncul 2 kali."
        />
        <KuisBenarSalah
          id={idKuis("D", 5)}
          perintah="Sepatu: 32, 33, 32, 34, 33, 32, 35, 34. Tabel menulis 32=3, 33=2, 34=2, 35=2. Zara bilang tabel salah karena jumlahnya 9, padahal sepatunya 8. Benar atau salah?"
          baris={[
            { teks: "Ukuran 35 seharusnya 1, bukan 2.", benar: true },
            { teks: "Jumlah di tabel sama dengan 8 pasang.", benar: false },
            { teks: "Analisis Zara benar.", benar: true },
          ]}
          umpan="3 + 2 + 2 + 2 = 9. Sepatunya 8. Zara benar."
        />
        <KuisSuara
          id={idKuis("D", 6)}
          pertanyaan="Kucing 15, ikan 10, kelinci 6. Berapa selisih hewan paling banyak dan paling sedikit? Hitung 15 dikurangi 6."
          periksa={(teks) => cocokBilangan(teks, 9)}
          petunjuk="Kurangkan 15 dengan 6."
          benar="Sembilan."
        />
        <KuisSuara
          id={idKuis("D", 7)}
          pertanyaan="Barisan 10, 10, 12, 15, 15, 15, 18, 20. Angka berapa yang paling sering muncul?"
          periksa={(teks) => cocokBilangan(teks, 15)}
          petunjuk="Hitung angka yang berulang paling banyak."
          benar="Lima belas."
        />
        <TulisBebas
          id={idKuis("D", 8)}
          judul="Frekuensi angka 8"
          visual={<Papan anak="8  9  7  8  10  8  9  8  7  8" />}
          pertanyaan="Berapa kali angka 8 muncul? Tuliskan jumlahnya."
          pesanSalah="Coret tiap angka 8, lalu hitung coretannya."
          bantuan="Angka 8 muncul 5 kali."
          umpan="5."
          periksa={(teks) => cocokBilangan(teks, 5)}
          alias={["5", "lima"]}
          konteks="Angka 8 muncul 5 kali."
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="Roti cokelat dan keju"
          visual={
            <Tabel
              kolom={["Roti", "Banyaknya"]}
              baris={[
                ["Cokelat", "14"],
                ["Keju", "11"],
                ["Stroberi", "9"],
              ]}
            />
          }
          pertanyaan="Berapa jumlah roti cokelat dan keju? Hitung 14 ditambah 11."
          pesanSalah="Jumlahkan cokelat dan keju."
          bantuan="14 + 11 = 25."
          umpan="25."
          periksa={(teks) => cocokBilangan(teks, 25)}
          alias={["25", "dua puluh lima"]}
          konteks="14 ditambah 11 sama dengan 25."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk3Data({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const poin = [
    "Urutkan data dari yang terkecil ke terbesar. Dari situ kelihatan paling kecil, paling besar, dan paling sering.",
    "Data yang banyak bisa dirapikan di tabel dengan turus dan kolom banyaknya.",
    "Jumlahkan kolom banyaknya untuk total. Kurangkan dua data untuk mencari selisih.",
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
          src: "/doodle-mtk/mtk-3-data-poin.svg",
          alt: "Tiga kalimat kunci: urutkan, buat tabel, lalu jumlahkan atau kurangkan.",
        }}
        cuplikan={cuplikanKalimat([
          "Urutkan dari yang terkecil supaya paling kecil, paling besar, dan paling sering mudah dicari.",
          "Tabel punya kolom data, turus, dan banyaknya.",
          "Jumlahkan untuk total. Kurangkan untuk selisih.",
        ])}
        poin={poin}
        penutup="Rapikan angkanya, lalu baca tabelnya."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
