"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB12 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB12 } from "@/lib/tema-misi-mtk-1";
import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import PanduanIkon, { type ButirIkon } from "@/components/PanduanIkon";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB12 } from "@/lib/modul-resmi-mtk-1-bab12";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB12.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function naskah(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaToken(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\s)${angka}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function kataUtuh(teks: string, kata: string): boolean {
  return new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function satuanAngka(teks: string, kata: string, angka: string, satuan: string): boolean {
  const biasa = naskah(teks);
  if (biasa.includes("puluh") || biasa.includes("belas")) return false;
  const ada = kataUtuh(teks, kata) || adaToken(teks, angka);
  return ada && biasa.includes(satuan);
}

function urutKata(teks: string, urutan: string[]): boolean {
  const biasa = naskah(teks);
  let mulai = 0;
  for (const kata of urutan) {
    const indeks = biasa.indexOf(kata, mulai);
    if (indeks < 0) return false;
    mulai = indeks + kata.length;
  }
  return true;
}

function angkaDiAtas(teks: string, batas: number): boolean {
  const angka = naskah(teks).match(/\d+/g)?.map(Number) ?? [];
  return angka.some((nilai) => nilai > batas && nilai < 40);
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
  Rara: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bimo: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Rara: "👧",
  Bimo: "👦",
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

function TombolPenjelasan({
  kelas,
  kelamin,
  kalimat,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  kalimat: string[];
}) {
  return (
    <div className="mt-3">
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kalimat)} />
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
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolPenjelasan kelas={kelas} kelamin={kelamin} kalimat={penjelasan} />
      {simbol ? <PanduanIkon butir={simbol} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({
  id,
  pertanyaan,
  periksa,
  petunjuk,
}: {
  id: string;
  pertanyaan: string;
  periksa: (teks: string) => boolean;
  petunjuk: string;
}) {
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} />
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan hasil ukurnya." />
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
  umpan: string;
  periksa: (teks: string) => boolean;
  alias?: string[];
  konteks?: string;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
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
}: {
  id: string;
  perintah: string;
  acak: string[];
  benar: string[];
  umpan: string;
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
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join(" ") || "…"}</p>
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat angkanya dulu, lalu susun lagi." />
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
        className="mt-3 rounded-full bg-violet-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa
      </button>
      <HasilJawabanKuis status={status} pesanSalah="Besar belum tentu berat. Satuan tidak boleh diganti di tengah." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function GambarDoodle({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB12.kartu[0];
  const berat = ["2 kelereng", "6 kelereng", "11 kelereng"];
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu ikon="👧👦🦉" judul={kartu.judul} anak="Rara, Bimo, dan Igil" />
      <div className="mt-4">
        <TujuanBelajar
        butir={[
          "Siswa bisa membandingkan berat benda: lebih berat, lebih ringan, atau sama berat.",
          "Siswa bisa mengukur berat dengan satuan tidak baku, seperti kelereng dan genggaman.",
        ]}
      />
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 · Berat dan Ringan"
          simbol={[
            { ikon: "🪨", teks: "Berat, susah diangkat" },
            { ikon: "🪶", teks: "Ringan, gampang" },
            { ikon: "✋", teks: "Angkat dulu" },
          ]}
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab12-sub1.jpg"
          alt="Bimo dan Igil mengangkat karung beras. Rara mengangkat kapas. Timbangan miring ke batu, bukan ke bulu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Setiap benda punya berat. Ada yang berat, ada yang ringan.",
            "Berat tidak bisa dilihat dengan mata saja. Kita harus mengangkatnya atau menimbangnya.",
          ]}
        >
          <Dialog nama="Bimo" anak="Beras ini berat sekali!" />
          <Dialog nama="Rara" anak="Kotak kapas ini bisa kuangkat dengan satu tangan." />
          <Dialog nama="Igil" anak="Aku kuat! Karung beras ini bisa kuangkat." />
          <Papan anak="🪨 Berat = susah diangkat · 🪶 Ringan = gampang diangkat" />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Buku tebal dan selembar kertas. Mana yang lebih berat?"
            periksa={(teks) => kataUtuh(teks, "buku") && !naskah(teks).includes("kertas")}
            petunjuk="Bayangkan mengangkatnya. Mana yang lebih susah?"
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="🪶 Ringan = ? · 🪨 Berat = ? · 🪨 batu · 🪶 bulu · 🧸 boneka" />}
            pertanyaan="Tulis benda paling ringan dan benda paling berat. Contoh: ringan bulu, berat batu."
            pesanSalah="Bulu paling ringan. Batu paling berat."
            umpan="Ringan: bulu. Berat: batu."
            alias={["ringan bulu", "berat batu"]}
            konteks="Bulu paling ringan. Batu paling berat."
            periksa={(teks) => {
              const biasa = naskah(teks);
              const pas =
                (biasa.includes("ringan bulu") || biasa.includes("bulu ringan")) &&
                (biasa.includes("berat batu") || biasa.includes("batu berat"));
              return pas && !biasa.includes("berat bulu") && !biasa.includes("ringan batu");
            }}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 2 · Membandingkan Dua Benda"
          simbol={[
            { ikon: "🤲", teks: "Dua tangan" },
            { ikon: "⬇️", teks: "Yang turun lebih berat" },
            { ikon: "⚖️", teks: "Banyak belum tentu berat" },
          ]}
          warna="border-sky-200 bg-sky-50/50"
          src="/doodle-mtk/mtk-1-bab12-sub2.jpg"
          alt="Timbangan miring ke semangka. Piring kiri berisi tiga apel."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Dua benda bisa lebih berat, lebih ringan, atau sama berat.",
            "Angkat keduanya dengan dua tangan. Tangan yang turun memegang yang lebih berat.",
          ]}
        >
          <Dialog nama="Rara" anak="Angkat dengan dua tangan, seperti timbangan." />
          <Dialog nama="Bimo" anak="Tangan yang memegang semangka turun lebih rendah." />
          <Dialog nama="Igil" anak="Banyak belum tentu berat." />
          <Papan anak="🍎🍎🍎 lebih ringan · 🍉 lebih berat" />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Lima balon dan satu batu. Mana yang lebih berat?"
            periksa={(teks) => kataUtuh(teks, "batu") && !kataUtuh(teks, "balon")}
            petunjuk="Balon kosong dan ringan, meski jumlahnya banyak."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="📚 buku ? 🪶🪶🪶🪶 empat bulu" />}
            pertanyaan="Tulis mana yang lebih berat. Contoh: buku lebih berat."
            pesanSalah="Buku lebih berat daripada bulu."
            umpan="Buku lebih berat."
            alias={["buku lebih berat"]}
            konteks="Buku lebih berat daripada empat bulu."
            periksa={(teks) => {
              const biasa = naskah(teks);
              const arah = teks.includes(">") || biasa.includes("lebih berat") || biasa.includes("buku berat");
              return arah && biasa.includes("buku") && !(teks.includes("<") && !teks.includes(">"));
            }}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 3 · Satuan Kelereng"
          simbol={[
            { ikon: "📦", teks: "Benda di kiri" },
            { ikon: "🔵", teks: "Kelereng di kanan" },
            { ikon: "⚖️", teks: "Berhenti saat seimbang" },
          ]}
          warna="border-emerald-200 bg-emerald-50/40"
          src="/doodle-mtk/mtk-1-bab12-sub3.jpg"
          alt="Timbangan seimbang. Penghapus di satu sisi, dan kartu angka 5 di samping kelereng."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Berat diukur dengan kelereng, bukan dengan penggaris.",
            "Taruh benda di satu sisi. Tambah kelereng di sisi lain sampai seimbang. Jumlah kelereng itulah beratnya.",
          ]}
        >
          <Dialog nama="Rara" anak="Taruh penghapus di sisi kiri." />
          <Dialog nama="Bimo" anak="Satu, dua, tiga, empat, lima. Seimbang!" />
          <Dialog nama="Igil" anak="Kelerengnya harus sama besar." />
          <Papan anak="🧽 = 🔵🔵🔵🔵🔵 · 5 kelereng" />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Penggaris seimbang dengan 3 kelereng. Berapa beratnya? Sebutkan juga satuannya."
            periksa={(teks) => satuanAngka(teks, "tiga", "3", "kelereng")}
            petunjuk="Hitung kelerengnya satu per satu."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="✂️ seimbang · 🔵×7" />}
            pertanyaan="Tulis berat gunting dalam satuan kelereng."
            pesanSalah="Hitung sampai 7."
            umpan="Berat gunting 7 kelereng."
            alias={["7 kelereng", "tujuh kelereng"]}
            konteks="Gunting beratnya 7 kelereng."
            periksa={(teks) => satuanAngka(teks, "tujuh", "7", "kelereng")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 4 · Satuan Genggaman"
          simbol={[
            { ikon: "🤏", teks: "Tangan kecil, lebih banyak" },
            { ikon: "🖐️", teks: "Tangan besar, lebih sedikit" },
            { ikon: "🔒", teks: "Jangan ganti tangan" },
          ]}
          warna="border-orange-200 bg-orange-50/40"
          src="/doodle-mtk/mtk-1-bab12-sub4.jpg"
          alt="Tangan kecil bertanda 6 dan tangan besar bertanda 4. Igil membandingkan keduanya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Genggaman tangan juga bisa menjadi alat ukur.",
            "Tangan yang berbeda punya genggaman berbeda besar. Pakai tangan orang yang sama dari awal sampai akhir.",
          ]}
        >
          <Dialog nama="Bimo" anak="Punyaku 6 genggam." />
          <Dialog nama="Bimo" anak="Punyaku cuma 4 genggam. Kok beda?" />
          <Dialog nama="Rara" anak="Tanganmu lebih besar, jadi isinya lebih banyak." />
          <Papan anak="🤏 6 genggam · 🖐️ 4 genggam" />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Kalau tangannya berbeda, hasil genggamannya sama atau beda?"
            periksa={(teks) => {
              const biasa = naskah(teks);
              return biasa.includes("beda") || biasa.includes("berbeda") || biasa.includes("tidak sama");
            }}
            petunjuk="Tangan besar bisa menggenggam lebih banyak."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="🖐️ Rara = 5 · 🤏 Bimo lebih kecil" />}
            pertanyaan="Tulis angka genggaman Bimo yang lebih besar dari 5, dan tulis lebih banyak."
            pesanSalah="Tangan yang lebih kecil butuh lebih banyak genggaman."
            umpan="Angkanya lebih besar dari 5."
            alias={["lebih banyak"]}
            konteks="Tangan Bimo lebih kecil, jadi jumlah genggamannya lebih besar dari 5."
            periksa={(teks) => angkaDiAtas(teks, 5) && (teks.includes(">") || naskah(teks).includes("lebih banyak"))}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 5 · Mengurutkan Berat"
          simbol={[
            { ikon: "1️⃣", teks: "Angka kecil = ringan" },
            { ikon: "🔒", teks: "Satuan harus sama" },
            { ikon: "🪜", teks: "Urut naik ke berat" },
          ]}
          warna="border-fuchsia-200 bg-fuchsia-50/40"
          src="/doodle-mtk/mtk-1-bab12-sub5.jpg"
          alt="Botol bertanda 3, penggaris bertanda 5, dan buku bertanda 7."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Ukur setiap benda dengan satuan yang sama, misalnya kelereng.",
            "Lalu urutkan dari angka terkecil ke terbesar. Itu urutan dari paling ringan.",
          ]}
        >
          <Dialog nama="Rara" anak="Buku 7 kelereng. Botol 3 kelereng. Penggaris 5 kelereng." />
          <Dialog nama="Bimo" anak="Tiga, lima, tujuh. Botol, penggaris, lalu buku." />
          <Dialog nama="Igil" anak="Kalau satuannya diganti, angkanya berubah. Urutannya tetap sama." />
          <Papan anak="🧴 3 · 📐 5 · 📗 7" />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Boneka 4 kelereng, gelas 9 kelereng, krayon 6 kelereng. Mana yang paling berat?"
            periksa={(teks) => kataUtuh(teks, "gelas") || naskah(teks).includes("cangkir")}
            petunjuk="Angka yang paling besar berarti paling berat."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="🥄 1 · 🍎 2 · 🧦 5 · 📕 8" />}
            pertanyaan="Tulis urutannya dari paling ringan ke paling berat."
            pesanSalah="Mulai dari angka 1."
            umpan="Sendok, apel, kaus, lalu buku."
            alias={["sendok apel kaus buku"]}
            konteks="Urutan dari ringan ke berat: sendok, apel, kaus, buku."
            periksa={(teks) => urutKata(teks, ["sendok", "apel", "kaus", "buku"]) || urutKata(teks, ["1", "2", "5", "8"])}
          />
        </Adegan>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Mana yang paling berat?"
          pilihan={[
            { huruf: "A", teks: "🪶 Bulu" },
            { huruf: "B", teks: "🪨 Batu" },
            { huruf: "C", teks: "🎈 Balon" },
            { huruf: "D", teks: "🍃 Daun" },
          ]}
          benar="B"
          umpan="Batu padat dan susah diangkat."
          salah="Bayangkan mengangkat tiap benda."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan benda dengan beratnya."
          baris={[
            { kiri: "✏️ Pensil", pilihan: berat, benar: "2 kelereng" },
            { kiri: "🧽 Spons", pilihan: berat, benar: "6 kelereng" },
            { kiri: "📚 Buku tebal", pilihan: berat, benar: "11 kelereng" },
          ]}
          umpan="Pensil 2, spons 6, buku tebal 11."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun dari paling ringan ke paling berat."
          acak={["🥤 gelas 9", "🍪 kue 3", "📗 buku 7", "🧦 kaus 4"]}
          benar={["🍪 kue 3", "🧦 kaus 4", "📗 buku 7", "🥤 gelas 9"]}
          umpan="3, 4, 7, lalu 9."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif berat. Pilih benar atau salah."
          baris={[
            { teks: "Balon lebih ringan dari batu.", benar: true },
            { teks: "Benda yang lebih besar selalu lebih berat.", benar: false },
            { teks: "Kalau mengukur dengan genggaman, boleh ganti tangan di tengah.", benar: false },
          ]}
          umpan="Kapas besar bisa lebih ringan daripada batu kecil. Tangan tidak boleh diganti."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga kotak beratnya 6 kelereng. Mana yang berbeda?"
          pilihan={[
            { huruf: "A", teks: "6 kelereng" },
            { huruf: "B", teks: "Pensil = 6 kelereng" },
            { huruf: "C", teks: "Botol = 5 kelereng" },
            { huruf: "D", teks: "Penggaris = 6 kelereng" },
          ]}
          benar="C"
          umpan="Hanya botol yang 5 kelereng."
          salah="Cari angka yang tidak sama dengan 6."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Berat harus diangkat atau ditimbang."
          alias={["diangkat", "ditimbang"]}
          konteks="Berat harus diangkat atau ditimbang."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB12.kartu[1];
  const alat = ["Genggaman", "Kelereng", "Timbangan besar"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu ikon="⚖️🦉" judul={kartu.judul} anak="Lima papan cara menimbang" />
      <div className="mt-4 space-y-4">
        <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 1 · Berat dan Ringan</h5>
          <PanduanIkon
            butir={[
              { ikon: "🪨", teks: "Susah diangkat" },
              { ikon: "🪶", teks: "Tidak terasa" },
              { ikon: "👀", teks: "Besar belum tentu berat" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Berat terasa saat benda diangkat. Susah diangkat dan terasa penuh, itu berat.",
              "Gampang diangkat dan tidak terasa, itu ringan. Ukuran besar tidak selalu berarti berat.",
            ]}
          />
          <TabelInfoGrafis
            judul="Dua rasa"
            kepala={["Berat", "Ringan", "Contoh"]}
            baris={[
              ["Susah diangkat", "Gampang diangkat", "batu dan bulu"],
              ["Terasa penuh", "Tidak terasa", "buku dan balon"],
            ]}
            kaki="Balon lebih ringan daripada buku."
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Boneka kecil dan batu. Mana yang lebih ringan?"
            periksa={(teks) => kataUtuh(teks, "boneka") && !kataUtuh(teks, "batu")}
            petunjuk="Bayangkan mengangkatnya."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="Berat = ? · Ringan = ? · daun dan karung beras" />}
            pertanyaan="Tulis bendanya di kotak yang benar. Contoh: berat beras, ringan daun."
            pesanSalah="Karung beras berat. Daun ringan."
            umpan="Berat: karung beras. Ringan: daun."
            alias={["berat beras", "ringan daun"]}
            konteks="Karung beras lebih berat. Daun lebih ringan."
            periksa={(teks) => {
              const biasa = naskah(teks);
              return (
                (biasa.includes("berat beras") || biasa.includes("beras berat")) &&
                (biasa.includes("ringan daun") || biasa.includes("daun ringan"))
              );
            }}
          />
        </article>
        <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 2 · Membandingkan Dua Benda</h5>
          <PanduanIkon
            butir={[
              { ikon: ">", teks: "Lebih berat" },
              { ikon: "<", teks: "Lebih ringan" },
              { ikon: "=", teks: "Sama berat" },
              { ikon: "🤲", teks: "Tangan yang turun" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Ada tiga jawaban: lebih berat, lebih ringan, atau sama berat.",
              "Tangan yang turun ke bawah memegang yang lebih berat.",
            ]}
          />
          <TabelInfoGrafis
            judul="Tanda"
            kepala={["Tanda", "Arti", "Contoh"]}
            baris={[
              [">", "Lebih berat", "semangka"],
              ["<", "Lebih ringan", "tiga apel"],
              ["=", "Sama berat", "timbangan seimbang"],
            ]}
            kaki="Tiga apel lebih ringan daripada satu semangka."
          />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Sebuah telur dan semangka. Mana yang lebih berat?"
            periksa={(teks) => naskah(teks).includes("semangka") && !kataUtuh(teks, "telur")}
            petunjuk="Semangka jauh lebih besar dan padat."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="boneka ? buku" />}
            pertanyaan="Tulis mana yang lebih ringan. Contoh: boneka lebih ringan."
            pesanSalah="Boneka lebih ringan daripada buku."
            umpan="Boneka lebih ringan."
            alias={["boneka lebih ringan"]}
            konteks="Boneka lebih ringan daripada buku."
            periksa={(teks) => {
              const biasa = naskah(teks);
              return (teks.includes("<") || biasa.includes("lebih ringan")) && biasa.includes("boneka");
            }}
          />
        </article>
        <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 3 · Mengukur dengan Kelereng</h5>
          <PanduanIkon
            butir={[
              { ikon: "⚖️", teks: "Taruh benda" },
              { ikon: "🔵", teks: "Tambah satu-satu" },
              { ikon: "✅", teks: "Hitung saat seimbang" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Taruh benda di satu sisi. Tambah kelereng di sisi lain satu per satu.",
              "Berhenti saat seimbang. Jumlah kelereng itulah beratnya.",
            ]}
          />
          <Papan anak="gunting = 6 kelereng · spons = 4 kelereng · sendok = 9 kelereng" />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Spons seimbang dengan 4 kelereng. Berapa beratnya? Sebutkan satuannya."
            periksa={(teks) => satuanAngka(teks, "empat", "4", "kelereng")}
            petunjuk="Hitung kelereng di sisi yang seimbang."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="sendok seimbang dengan 9 kelereng" />}
            pertanyaan="Tulis berat sendok dalam satuan kelereng."
            pesanSalah="Hitung sampai 9."
            umpan="Berat sendok 9 kelereng."
            alias={["9 kelereng", "sembilan kelereng"]}
            konteks="Sendok beratnya 9 kelereng."
            periksa={(teks) => satuanAngka(teks, "sembilan", "9", "kelereng")}
          />
        </article>
        <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 4 · Mengukur dengan Genggaman</h5>
          <PanduanIkon
            butir={[
              { ikon: "🤲", teks: "Satu genggaman" },
              { ikon: "🔢", teks: "Hitung sampai habis" },
              { ikon: "🔒", teks: "Tangan yang sama" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Isi satu tangan, lalu hitung berapa genggaman sampai benda habis.",
              "Jangan ganti tangan di tengah, karena ukurannya bisa berbeda.",
            ]}
          />
          <Papan anak="beras = 5 genggaman · kacang = 7 genggaman · satu tangan saja" />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Kacang dihitung 1 sampai 7 genggaman. Berapa genggaman beratnya?"
            periksa={(teks) => satuanAngka(teks, "tujuh", "7", "genggam")}
            petunjuk="Berhenti di hitungan terakhir."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="tangan besar = 3 genggaman · tangan kecil = ?" />}
            pertanyaan="Tulis angka genggaman tangan kecil yang lebih besar dari 3, dan tulis lebih banyak."
            pesanSalah="Tangan kecil butuh lebih banyak genggaman."
            umpan="Angkanya lebih besar dari 3."
            alias={["lebih banyak"]}
            konteks="Tangan yang lebih kecil butuh jumlah genggaman lebih besar dari 3."
            periksa={(teks) => angkaDiAtas(teks, 3) && (teks.includes(">") || naskah(teks).includes("lebih banyak"))}
          />
        </article>
        <article className="rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 5 · Mengurutkan Berat</h5>
          <PanduanIkon
            butir={[
              { ikon: "🔢", teks: "Tulis angkanya" },
              { ikon: "⬆️", teks: "Kecil ke besar" },
              { ikon: "🔒", teks: "Satuan tidak dicampur" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Setelah semua benda diukur dengan satuan yang sama, urutkan angkanya.",
              "Angka terkecil berarti paling ringan. Satuannya harus sama supaya adil.",
            ]}
          />
          <Papan anak="kaus 2, kue 5, buku 9 · dari ringan ke berat" />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Krayon 6 kelereng, gelas 4 kelereng, buku 10 kelereng. Mana yang paling ringan?"
            periksa={(teks) => kataUtuh(teks, "gelas") || naskah(teks).includes("cangkir")}
            petunjuk="Cari angka yang paling kecil."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="apel 7 · sendok 2 · boneka 5" />}
            pertanyaan="Tulis urutannya dari paling berat ke paling ringan."
            pesanSalah="Mulai dari angka 7."
            umpan="Apel, boneka, lalu sendok."
            alias={["apel boneka sendok"]}
            konteks="Dari berat ke ringan: apel, boneka, sendok."
            periksa={(teks) => urutKata(teks, ["apel", "boneka", "sendok"]) || urutKata(teks, ["7", "5", "2"])}
          />
        </article>
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Mana pernyataan yang benar?"
          pilihan={[
            { huruf: "A", teks: "Daun lebih berat dari batu" },
            { huruf: "B", teks: "Batu lebih berat dari daun" },
            { huruf: "C", teks: "Keduanya sama berat" },
            { huruf: "D", teks: "Tidak bisa dibandingkan" },
          ]}
          benar="B"
          umpan="Batu lebih padat dan lebih berat."
          salah="Bayangkan mengangkat batu dan daun."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan benda dengan alat ukur yang tepat."
          baris={[
            { kiri: "Beras di stoples", pilihan: alat, benar: "Genggaman" },
            { kiri: "Penghapus kecil", pilihan: alat, benar: "Kelereng" },
            { kiri: "Karung besar", pilihan: alat, benar: "Timbangan besar" },
          ]}
          umpan="Beras dengan genggaman. Penghapus dengan kelereng. Karung dengan timbangan besar."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari paling ringan ke paling berat."
          acak={["📗 buku 11", "🧦 kaus 2", "🥤 gelas 8", "🍪 kue 5"]}
          benar={["🧦 kaus 2", "🍪 kue 5", "🥤 gelas 8", "📗 buku 11"]}
          umpan="2, 5, 8, lalu 11."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Cek ukuran. Pilih benar atau salah."
          baris={[
            { teks: "Kelereng bisa dipakai untuk mengukur berat.", benar: true },
            { teks: "Kalau mengukur berat, satuannya harus sama.", benar: true },
            { teks: "Tangan besar dan tangan kecil memberi hasil genggaman yang sama.", benar: false },
          ]}
          umpan="Satuan harus sama. Ukuran tangan yang berbeda memberi hasil yang berbeda."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Boneka seimbang dengan 7 kelereng. Beratnya berapa?"
          visual={<Papan anak="boneka = 7 kelereng" />}
          pilihan={[
            { huruf: "A", teks: "5 kelereng" },
            { huruf: "B", teks: "6 kelereng" },
            { huruf: "C", teks: "7 kelereng" },
            { huruf: "D", teks: "8 kelereng" },
          ]}
          benar="C"
          umpan="Seimbang berarti jumlahnya sama, yaitu 7."
          salah="Lihat jumlah kelereng saat timbangan seimbang."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Tangan yang turun memegang yang lebih berat."
          alias={["tangan yang turun", "lebih berat"]}
          konteks="Tangan yang turun memegang yang lebih berat."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB12.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="⚖️🦉"
        judul={kartu.judul}
        anak="Sepuluh pos timbangan · kelereng, genggaman, dan urutan berat"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Kalian menjadi penjaga timbangan di pasar. Pembeli membawa barang, dan kalian mengukur beratnya.",
          "Pakai kelereng atau genggaman. Kalau hasilnya benar, pembeli senang.",
          "Jangan campur satuan. Satu pengukuran, satu alat ukur.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab12-pasar.jpg"
        alt="Igil memakai celemek di belakang timbangan pasar, dengan mangkuk kelereng dan keranjang buah."
      />
      <PanduanIkon
        judul="Simbol pasar"
        butir={[
          { ikon: "⚖️", teks: "Timbangan" },
          { ikon: "🔵", teks: "Satuan kelereng" },
          { ikon: "🖐️", teks: "Satuan genggaman" },
          { ikon: "🪙", teks: "10 koin pasar" },
        ]}
      />
      <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Salah ukur membuat timbangan berbalik pelan, lalu kamu boleh mencoba lagi.</p>
        <p>
          Jawaban benar pertama mendapat 3 koin. Setelah satu petunjuk, 2 koin. Setelah dua petunjuk, 1 koin. Kaca pembesar membantu, tetapi mengurangi koin.
        </p>
        <p>Kumpulkan 10 koin untuk membuka pasar besar dan menerima celemek pedagang.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB12}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB12}
        penutup="Pasar besar terbuka. Igil memasang celemek pedagang."
        bunga="🍎🍉🔵🖐️🪙"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB12.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Penjaga Timbangan Ahli" : skor >= 6 ? "⚖️ Penimbang Cerdas" : "🐘 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Ukuranmu selalu tepat!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga ahli!"
        : "Ayo menimbang lagi bersama Igil, kamu pasti bisa!";
  const alat = ["Genggaman", "Kelereng"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🦉"
        judul={kartu.judul}
        anak="Sepuluh soal membandingkan dan mengukur berat"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sekarang kamu mengerjakan sendiri. Ada sepuluh soal.",
          "Sebagian membandingkan berat, sebagian mengukur dengan kelereng atau genggaman.",
          "Satuan harus sama, dan jangan ganti tangan di tengah. Periksa lagi jawabanmu.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab12-evaluasi.jpg"
        alt="Meja ujian dengan pensil dan timbangan kecil. Igil mengangkat belalainya."
      />
      <div className="mt-4 grid gap-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/30 px-4 py-3 sm:grid-cols-3">
        <p className="text-sm font-black text-[#1C01A5]">Nama: {nama}</p>
        <p className="text-sm font-black text-[#1C01A5]">Kelas: 1</p>
        <p className="text-sm font-black text-[#1C01A5]">Skor: {skor} / 10</p>
      </div>
      <p className="mt-3 text-sm font-black text-[#1C01A5]">
        {lencana}. {pesan}
      </p>
      <PanduanIkon
        judul="Simbol soal"
        butir={[
          { ikon: "🪨", teks: "Lebih berat" },
          { ikon: "🪶", teks: "Lebih ringan" },
          { ikon: "🔵", teks: "Kelereng" },
          { ikon: "🖐️", teks: "Genggaman" },
        ]}
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Mana yang lebih berat?"
          visual={<Papan anak="bulu ? palu" />}
          pertanyaan="Tulis mana yang lebih ringan, lalu beri satu alasan."
          pesanSalah="Bulu lebih ringan daripada palu."
          umpan="Bulu lebih ringan karena tidak terasa di tangan."
          alias={["bulu lebih ringan"]}
          konteks="Bulu lebih ringan daripada palu."
          periksa={(teks) => {
            const biasa = naskah(teks);
            const tanda = teks.includes("<") || biasa.includes("lebih ringan") || biasa.includes("bulu ringan");
            const alasan = biasa.includes("ringan") || biasa.includes("bulu") || biasa.includes("palu");
            return tanda && alasan && !(teks.includes(">") && !teks.includes("<") && !biasa.includes("lebih ringan"));
          }}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Botol kecil seimbang dengan 5 kelereng. Berapa beratnya?"
          visual={<Papan anak="botol = 5 kelereng" />}
          pilihan={[
            { huruf: "A", teks: "3 kelereng" },
            { huruf: "B", teks: "4 kelereng" },
            { huruf: "C", teks: "5 kelereng" },
            { huruf: "D", teks: "6 kelereng" },
          ]}
          benar="C"
          umpan="Seimbang berarti beratnya 5 kelereng."
          salah="Lihat jumlah kelereng di sisi yang seimbang."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan="3. Penggaris seimbang dengan 9 kelereng. Ucapkan beratnya lengkap dengan satuannya."
            periksa={(teks) => satuanAngka(teks, "sembilan", "9", "kelereng")}
            petunjuk="Sebutkan angka dan kata kelereng."
          />
        </div>
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Bimo berkata, kapas 20 genggam jadi lebih berat daripada satu batu kecil. Apakah Bimo benar?"
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, kapas tetap bisa lebih ringan" },
            { huruf: "C", teks: "Salah, batu tidak bisa diukur" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="B"
          umpan="Jumlah genggaman yang banyak belum membuktikan kapas lebih berat daripada batu."
          salah="Banyak genggaman belum tentu lebih berat."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan benda dengan alat ukur yang paling tepat."
          baris={[
            { kiri: "Buku tulis", pilihan: alat, benar: "Kelereng" },
            { kiri: "Kacang merah", pilihan: alat, benar: "Genggaman" },
            { kiri: "Penghapus kecil", pilihan: alat, benar: "Kelereng" },
          ]}
          umpan="Buku dan penghapus ditimbang dengan kelereng. Kacang diukur dengan genggaman."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Urutkan berat"
          visual={<Papan anak="apel 6 · sendok 2 · boneka 9 · buku 4" />}
          pertanyaan="Tulis urutannya dari paling ringan ke paling berat."
          pesanSalah="Mulai dari angka 2."
          umpan="Sendok, buku, apel, lalu boneka."
          alias={["sendok buku apel boneka"]}
          konteks="Dari ringan ke berat: sendok 2, buku 4, apel 6, boneka 9."
          periksa={(teks) => urutKata(teks, ["sendok", "buku", "apel", "boneka"]) || urutKata(teks, ["2", "4", "6", "9"])}
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Hasil ukur naik 4 setiap langkah: 4, kotak, 12. Angka yang hilang?"
          visual={<Papan anak="4 – ? – 12" />}
          pilihan={[
            { huruf: "A", teks: "6" },
            { huruf: "B", teks: "7" },
            { huruf: "C", teks: "8" },
            { huruf: "D", teks: "10" },
          ]}
          benar="C"
          umpan="4 tambah 4 sama dengan 8. 8 tambah 4 sama dengan 12."
          salah="Lihat langkah dari 4 menuju 12."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari paling berat ke paling ringan."
          acak={["🍪 kue 5", "🥤 gelas 9", "🧦 kaus 3", "📗 buku 7"]}
          benar={["🥤 gelas 9", "📗 buku 7", "🍪 kue 5", "🧦 kaus 3"]}
          umpan="9, 7, 5, lalu 3."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 8)}
            pertanyaan="9. Dua anak mengukur benda yang sama. Hasilnya 4 genggaman dan 7 genggaman. Apa penyebabnya?"
            periksa={(teks) => {
              const biasa = naskah(teks);
              const alat = biasa.includes("tangan") || biasa.includes("genggam");
              const sebab = biasa.includes("beda") || biasa.includes("besar") || biasa.includes("kecil");
              return alat && sebab;
            }}
            petunjuk="Lihat ukuran tangan mereka."
          />
        </div>
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Botol 4 kelereng, buku 9 kelereng, krayon 2 kelereng. Mana yang benar?"
          visual={<Papan anak="botol 4 · buku 9 · krayon 2" />}
          pilihan={[
            { huruf: "A", teks: "Buku paling berat, krayon paling ringan, selisih 7" },
            { huruf: "B", teks: "Buku paling berat, botol paling ringan, selisih 5" },
            { huruf: "C", teks: "Botol paling berat, krayon paling ringan, selisih 2" },
            { huruf: "D", teks: "Buku paling berat, krayon paling ringan, selisih 5" },
          ]}
          benar="A"
          umpan="9 paling besar, 2 paling kecil. 9 dikurangi 2 sama dengan 7."
          salah="Cari angka terbesar dan terkecil, lalu kurangkan."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Satuan harus sama supaya adil."
          alias={["satuan harus sama", "supaya adil"]}
          konteks="Satuan harus sama supaya adil."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Timbanganmu seimbang.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab12({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
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
          src: "/doodle-mtk/mtk-1-bab12-poin.jpg",
          alt: "Igil berdiri di samping papan kalimat kunci, dikelilingi timbangan dan kelereng.",
        }}
        cuplikan={cuplikanKalimat([
          "Berat tidak bisa dilihat. Berat harus diangkat atau ditimbang.",
          "Besar belum tentu berat. Tangan yang turun memegang yang lebih berat.",
          "Kelereng ditambah sampai seimbang. Genggaman memakai satu tangan yang sama.",
          "Satuan harus sama supaya adil. Angka kecil berarti paling ringan.",
        ])}
        poin={[
          "✋ Berat tidak bisa dilihat, harus diangkat.",
          "🎈 Besar belum tentu berat.",
          "🤲 Tangan yang turun, itu yang lebih berat.",
          "🔵 Kelereng ditambah sampai seimbang.",
          "🖐️ Satu tangan, satu ukuran.",
          "🔒 Satuan harus sama supaya adil.",
          "1️⃣ Angka kecil berarti paling ringan.",
        ]}
        penutup="Angkat, timbang dengan satuan yang sama, lalu bandingkan."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
