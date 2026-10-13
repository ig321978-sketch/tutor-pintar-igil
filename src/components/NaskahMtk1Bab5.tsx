"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB5 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB5 } from "@/lib/tema-misi-mtk-1";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB5 } from "@/lib/modul-resmi-mtk-1-bab5";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB5.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function bacakan(teks: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const suara = new SpeechSynthesisUtterance(teks);
  suara.lang = "id-ID";
  window.speechSynthesis.speak(suara);
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Tari: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Dimas: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Ojan: "border-[#16A34A]/25 bg-[#F0FDF4]",
  Pipit: "border-[#F0AB00] bg-[#FFF8E8]",
  "Pak RT": "border-[#7C3AED]/25 bg-[#F5F3FF]",
  Semua: "border-[#E11D48]/20 bg-[#FFF1F2]",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <span className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </span>
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
  cuplikan: CuplikanVoiceMateri[];
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">{anak}</p> : null}
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
      </div>
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
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-[#fbf6ea] object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </article>
  );
}

function BingkaiTitik({ titik }: { titik: number }) {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-xl border-2 border-[#1C01A5]/20 bg-white p-2">
      {Array.from({ length: 10 }, (_, indeks) => (
        <span key={indeks} className="text-center text-lg" aria-hidden>
          {indeks < titik ? "🔵" : "⚪"}
        </span>
      ))}
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
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3 text-2xl leading-relaxed">{visual}</div> : null}
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
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
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
    <article className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
      <p className="text-sm font-black text-amber-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-amber-900">Ketuk gambar, lalu ketuk angkanya.</p>
      <div className="mt-3 grid gap-2">
        {baris.map((item, indeks) => {
          const warna = !cek
            ? "border-amber-200 bg-white"
            : peta[indeks] === item.benar
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-300 bg-rose-50";
          return (
            <button
              key={item.kiri}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-amber-400" : ""}`}
            >
              <span className="text-lg">{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button
            key={kalimat}
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
        className="mt-3 rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Lihat ikatannya, lalu pasangkan lagi." />
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
  sesudahBenar,
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
  sesudahBenar?: () => void;
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
          body: JSON.stringify({
            pertanyaan,
            konteks: konteks || umpan,
            alias,
            jawaban: data,
          }),
        });
        const json = (await respons.json()) as {
          berhasil?: boolean;
          benar?: boolean;
          bacaan?: string;
          pesan?: string;
        };
        if (!respons.ok || !json.berhasil) {
          setStatus(null);
          setCuplikan(json.pesan || "Gagal menilai. Kirim lagi.");
          return;
        }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) {
          kuis?.tandaiBenar(id);
          sesudahBenar?.();
        }
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    const ok = periksa(data);
    setCuplikan(data.trim());
    setStatus(ok ? "benar" : "salah");
    if (ok) {
      kuis?.tandaiBenar(id);
      sesudahBenar?.();
    }
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

const BELASAN = [
  ["11", "Sebelas", "🎀 ●"],
  ["12", "Dua belas", "🎀 ●●"],
  ["13", "Tiga belas", "🎀 ●●●"],
  ["14", "Empat belas", "🎀 ●●●●"],
  ["15", "Lima belas", "🎀 ●●●●●"],
  ["16", "Enam belas", "🎀 ●●●●●●"],
  ["17", "Tujuh belas", "🎀 ●●●●●●●"],
  ["18", "Delapan belas", "🎀 ●●●●●●●●"],
  ["19", "Sembilan belas", "🎀 ●●●●●●●●●"],
  ["20", "Dua puluh", "🎀🎀"],
] as const;

function TabelBelasan() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#F0AB00]">
      <div className="grid grid-cols-3 bg-[#FFF8E8] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span>Angka</span>
        <span>Dibaca</span>
        <span>Gambar</span>
      </div>
      {BELASAN.map(([angka, nama, gambar]) => (
        <button
          key={angka}
          type="button"
          onClick={() => bacakan(nama)}
          className="grid w-full grid-cols-3 border-t border-[#F0AB00]/40 bg-white px-3 py-2 text-left text-sm font-bold text-[#1C01A5] hover:bg-[#FFF8E8]"
        >
          <span>{angka}</span>
          <span>{nama}</span>
          <span>{gambar}</span>
        </button>
      ))}
      <p className="border-t border-[#F0AB00]/40 px-3 py-2 text-xs font-semibold text-slate-600">
        Ketuk tiap baris untuk mendengar cara membacanya.
      </p>
    </div>
  );
}

function SusunKereta() {
  const kuis = useKuisMateri();
  const acak = [17, 11, 20, 14, 16];
  const benar = [11, 14, 16, 17, 20];
  const [susun, setSusun] = useState<number[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = acak.filter((angka) => !susun.includes(angka));
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((angka, indeks) => angka === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(idKuis("B", 1));
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">Susun gerbong dari angka paling kecil ke paling besar!</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">🚂 {susun.join(" – ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, angka]);
            }}
            className="rounded-xl bg-white px-3 py-2 text-lg font-black text-[#1C01A5] ring-2 ring-sky-200"
          >
            {angka}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setSusun((lama) => lama.slice(0, -1));
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white">
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Mulai dari angka yang paling kecil." />
        <Umpan status={status} teks="Benar! 11 – 14 – 16 – 17 – 20." />
      </div>
    </article>
  );
}

function KartuBeda() {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, "D");
  const kartu = [
    ["A", "15"],
    ["B", "🎀 ●●●●●"],
    ["C", "10 + 5"],
    ["D", "🎀 ●●●●"],
  ];
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold text-slate-700">
        Tiga kartu menunjukkan angka yang sama. Satu kartu berbeda. Ketuk kartu yang berbeda!
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {kartu.map(([huruf, teks]) => (
          <button
            key={huruf}
            type="button"
            onClick={() => {
              setPilih(huruf);
              if (huruf === "D") kuis?.tandaiBenar(idKuis("B", 2));
            }}
            className={`rounded-xl px-3 py-3 text-left text-sm font-bold ${kelasTombolHasilKuis(
              pilih,
              huruf,
              "D",
              "bg-[#1C01A5] text-white",
            )}`}
          >
            {huruf}. {teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Kartu lain sama dengan 15. Hitung bulatan yang lepas." />
        <Umpan status={status} teks="Kartu D isinya 14. Kartu lain semuanya 15." />
      </div>
    </article>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB5.kartu[0];
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const [salahKanvas, setSalahKanvas] = useState(0);
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🇮🇩🎀🐦"
        judul={kartu.judul}
        anak="Ayo Membilang sampai dengan 20"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Membilang, membaca, dan menulis bilangan 11 sampai 20.</li>
          <li>Mengenal puluhan dan satuan dengan mengelompokkan benda per sepuluh.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-3">
        <Adegan
          judul="Pagi di gang kampung"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab5-pagi.jpg"
          alt="Gang kampung berhias umbul-umbul. Bendera kecil mendarat di kaki Ojan, Pipit hinggap di pagar."
        >
          <p className="text-sm font-semibold text-slate-700">
            Umbul-umbul merah putih berkibar. Satu bendera kecil terbang, lalu mendarat di kaki seorang anak.
          </p>
          <Dialog nama="Pak RT" anak="Anak-anak, tolong pasang bendera kecil di sepanjang pagar. Kita butuh dua puluh bendera!" />
          <Dialog nama="Ojan" anak="Dua puluh?! Aku cuma bisa menghitung sampai sepuluh…" />
          <Dialog nama="Pipit" anak="Jangan khawatir! Rahasianya adalah ikatan ajaib!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 1)}
            idKanvas={idKuis("A", 2)}
            pertanyaanSuara="Pak RT butuh berapa bendera?"
            aliasSuara={["20", "dua puluh"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan angka 20."
            aliasKanvas={["20", "dua puluh"]}
            konteksKanvas="Pagar butuh 20 bendera."
          />
        </Adegan>
        <Adegan
          judul="Adegan 1 · Tumpukan bendera berantakan"
          warna="border-sky-200 bg-sky-50"
          src="/doodle-mtk/mtk-1-bab5-adegan-1.jpg"
          alt="Dimas menunjuk bendera yang berserakan di tikar, Ojan bingung, Pipit mengawasi."
        >
          <Dialog nama="Dimas" anak="Satu, dua, tiga… eh, yang ini sudah belum, ya?" />
          <Dialog nama="Ojan" anak="Aku jadi bingung!" />
          <Dialog nama="Pipit" anak="Kalau berantakan, gampang salah. Ayo kita ikat setiap sepuluh!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 3)}
            idKanvas={idKuis("A", 4)}
            pertanyaanSuara="Bendera diikat setiap berapa?"
            aliasSuara={["10", "sepuluh"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan angka sepuluh."
            aliasKanvas={["10", "sepuluh"]}
            konteksKanvas="Setiap ikatan berisi 10 bendera."
          />
        </Adegan>
        <Adegan
          judul="Adegan 2 · Ikatan ajaib pertama"
          warna="border-amber-200 bg-amber-50"
          src="/doodle-mtk/mtk-1-bab5-adegan-2.jpg"
          alt="Tari mengikat sepuluh bendera jadi satu ikatan dengan pita, Pipit memperhatikan."
        >
          <Dialog nama="Tari" anak="Satu, dua, tiga… sembilan, sepuluh!" />
          <Dialog nama="Pipit" anak="Ikat! Sekarang ini 1 ikat isinya 10!" />
          <p className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">🎀 1 ikat = 10 bendera = 1 puluhan</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 5)}
            idKanvas={idKuis("A", 6)}
            pertanyaanSuara="Satu ikat isinya berapa bendera?"
            aliasSuara={["10", "sepuluh"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 1 ikat = 10."
            aliasKanvas={["1 ikat = 10", "1ikat=10"]}
            konteksKanvas="Satu ikatan sama dengan sepuluh bendera."
          />
        </Adegan>
        <Adegan
          judul="Adegan 3 · Lahirnya angka belasan"
          warna="border-blue-200 bg-blue-50"
          src="/doodle-mtk/mtk-1-bab5-adegan-3.jpg"
          alt="Satu ikat bendera dan tiga bendera lepas, Ojan menunjuk, angkanya 13."
        >
          <Dialog nama="Ojan" anak="Ada satu ikat dan tiga bendera lepas. Jadi berapa?" />
          <Dialog nama="Pipit" anak="Mulai dari sepuluh, lalu lanjut: sebelas, dua belas, tiga belas!" />
          <Dialog nama="Tari" anak="Jadi ada 13 bendera!" />
          <p className="text-center text-3xl font-black">
            <span className="text-blue-700">1</span>
            <span className="text-amber-500">3</span>
          </p>
          <p className="text-sm font-semibold text-slate-700">Angka 1 artinya satu ikat. Angka 3 artinya tiga bendera lepas.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 7)}
            idKanvas={idKuis("A", 8)}
            pertanyaanSuara="Satu ikat dan tiga bendera lepas. Semuanya berapa?"
            aliasSuara={["13", "tiga belas"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan angka 13."
            aliasKanvas={["13", "tiga belas"]}
            konteksKanvas="Satu puluhan dan tiga satuan sama dengan 13."
          />
        </Adegan>
        <Adegan
          judul="Adegan 4 · Kata belas yang ajaib"
          warna="border-emerald-200 bg-emerald-50"
          src="/doodle-mtk/mtk-1-bab5-adegan-4.jpg"
          alt="Papan tulis kampung berisi angka 11 sampai 19 dan kata belas. Dimas dan Tari melihatnya."
        >
          <Dialog nama="Dimas" anak="Kok namanya pakai belas semua?" />
          <Dialog nama="Pipit" anak="Belas artinya sepuluh lebih sedikit. Tiga belas sama dengan sepuluh dan tiga." />
          <Dialog nama="Tari" anak="Tapi 11 bukan satu belas. Namanya sebelas!" />
          <Dialog nama="Pipit" anak="Betul! Sebelas itu angka istimewa." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 9)}
            idKanvas={idKuis("A", 10)}
            pertanyaanSuara="Tiga belas sama dengan sepuluh dan berapa?"
            aliasSuara={["3", "tiga"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan nama angka 11."
            aliasKanvas={["sebelas"]}
            konteksKanvas="Angka 11 dibaca sebelas, bukan satu belas."
          />
        </Adegan>
        <Adegan
          judul="Adegan 5 · Dua ikat sama dengan dua puluh"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab5-adegan-5.jpg"
          alt="Dua ikat bendera, angka 20, Tari, Dimas, dan Ojan bersorak, kembang api di langit."
        >
          <Dialog nama="Ojan" anak="Ikatan kedua sudah penuh!" />
          <Dialog nama="Pipit" anak="Dua ikat, lepasnya nol. Itu 20, dua puluh!" />
          <p className="text-center text-2xl font-black text-[#1C01A5]">🎀🎀 = 20</p>
          <Dialog nama="Semua" anak="Horeee! Bendera untuk 17 Agustus sudah siap! Merdeka!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 11)}
            idKanvas={idKuis("A", 12)}
            pertanyaanSuara="Dua ikat bendera sama dengan berapa?"
            aliasSuara={["20", "dua puluh"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 2 ikat = 20."
            aliasKanvas={["2 ikat = 20", "2ikat=20"]}
            konteksKanvas="Dua ikatan penuh sama dengan 20."
          />
        </Adegan>
      </div>
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="mt-2 text-center text-2xl">
          🎀 <IkonUlang ikon="🇮🇩" jumlah={5} />
        </p>
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Ada satu ikat dan lima bendera lepas. Semuanya berapa? Ucapkan dengan keras!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["lima belas", "15"])}
          petunjuk="Sebutkan jumlah semuanya."
          sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")}
        />
        {suara === "benar" ? <p className="mt-2 text-sm font-bold text-emerald-800">Cuit-cuit! Kamu hebat sekali!</p> : null}
        {suara === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Mulai dari sepuluh, lalu lanjut hitung bendera yang lepas.</p>
        ) : null}
      </div>
      <div className="mt-4">
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis angka banyaknya semua bendera!"
          alias={["18", "delapan belas"]}
          konteks="Satu ikat sepuluh bendera ditambah delapan bendera lepas sama dengan 18."
          visual={
            <p className="text-center text-2xl">
              🎀 <IkonUlang ikon="🇮🇩" jumlah={8} ukuran="text-xl" />
            </p>
          }
          sesudahNilai={(benar) => {
            if (!benar) setSalahKanvas((jumlah) => jumlah + 1);
          }}
        />
        {salahKanvas >= 2 ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border-2 border-blue-300 bg-blue-50 px-3 py-2 text-sm font-black text-blue-900">
              Puluhan · 🎀 satu ikat
            </div>
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-2 text-sm font-black text-amber-950">
              Satuan · delapan bendera lepas
            </div>
          </div>
        ) : null}
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB5.kartu[1];
  const pilihanAngka = ["12", "19", "20"];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🎀🔢"
        judul={kartu.judul}
        anak="Infografis angka belasan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 space-y-4">
        <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Kenali angka belasan</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">🎀 = 1 ikat isi 10. ● = 1 benda lepas.</p>
          <div className="mt-3">
            <TabelBelasan />
          </div>
        </article>
        <article className="rounded-2xl border-2 border-blue-200 bg-blue-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Rumah nilai tempat · 16</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl border-2 border-blue-400 bg-white px-3 py-2">
              <p className="text-xs font-black text-blue-800">Puluhan</p>
              <p className="text-3xl font-black text-blue-700">1</p>
              <p className="text-sm">🎀</p>
            </div>
            <div className="rounded-xl border-2 border-amber-400 bg-white px-3 py-2">
              <p className="text-xs font-black text-amber-800">Satuan</p>
              <p className="text-3xl font-black text-amber-600">6</p>
              <p className="text-sm">●●●●●●</p>
            </div>
          </div>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">16 = 10 + 6. Rumah kiri untuk ikatan, rumah kanan untuk yang lepas.</p>
        </article>
        <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Bingkai sepuluh</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <BingkaiTitik titik={10} />
            <BingkaiTitik titik={3} />
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-700">Bingkai penuh = 10. Titik di bingkai kedua = 3. 10 + 3 = 13.</p>
        </article>
        <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Membilang lanjut</p>
          <p className="mt-2 text-2xl">🎀 🍬🍬🍬🍬🍬🍬🍬</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Simpan 10 di kepala. Tunjuk permen: 11, 12, 13, 14, 15, 16, 17. Angka terakhir = 17.
          </p>
        </article>
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Pakai jari teman</p>
          <p className="mt-2 text-2xl">🖐️🖐️ + ✋</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Jari teman = 10. Jarimu = 4. Semuanya = 14.</p>
        </article>
        <article className="rounded-2xl border-2 border-amber-200 bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Cara menulis angka belasan</p>
          <p className="mt-2 text-center text-4xl font-black">
            <span className="text-blue-700">1</span>
            <span className="text-amber-500">4</span>
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Tulis puluhan dulu, baru satuan. Empat belas ditulis 14, bukan 41. Tujuh belas ditulis 17, bukan 71.
          </p>
        </article>
        <article className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Garis bilangan 0–20</p>
          <p className="mt-2 flex flex-wrap gap-1 text-sm font-black text-[#1C01A5]">
            {Array.from({ length: 21 }, (_, angka) => (
              <span key={angka}>{angka === 10 || angka === 20 ? `🚩${angka}` : angka}</span>
            ))}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            12 dan 19 puluhannya sama-sama 1. Satuannya 2 dan 9. 9 lebih besar, jadi 19 lebih besar dari 12.
          </p>
        </article>
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Tarik garis dari gambar ke angka yang benar!"
          baris={[
            { kiri: "🎀 ●●", pilihan: pilihanAngka, benar: "12" },
            { kiri: "🎀 ●●●●●●●●●", pilihan: pilihanAngka, benar: "19" },
            { kiri: "🎀🎀", pilihan: pilihanAngka, benar: "20" },
          ]}
          umpan="Satu ikat dua lepas = 12. Satu ikat sembilan lepas = 19. Dua ikat = 20."
        />
        <SusunKereta />
        <KartuBeda />
        <div className="border-t-2 border-[#1C01A5]/10 pt-5">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-center text-4xl font-black">
            <span className="text-blue-700">1</span>
            <span className="text-amber-500">8</span>
          </p>
          <SoalRekamSuara
            id={idKuis("B", 3)}
            pertanyaan="Angka 18 punya berapa puluhan dan berapa satuan? Ucapkan!"
            periksa={(transkrip) =>
              ucapanMemuat(transkrip, [
                ["satu puluhan", "1 puluhan", "satu ikat"],
                ["delapan satuan", "8 satuan", "delapan"],
              ])
            }
            petunjuk="Sebutkan puluhan dan satuannya."
          />
        </div>
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis angka yang dibacakan Pipit: enam belas!"
          alias={["16", "enam belas"]}
          konteks="Enam belas ditulis 16. Empat satu, yaitu 61, salah."
          visual={<p className="text-center text-3xl">🐦 16</p>}
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB5.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🇮🇩🎀🏆"
        judul={kartu.judul}
        anak="Sepuluh tiang lomba · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB5}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB5}
        penutup="Dua puluh tiang pagar sudah siap. Pipit mengikat pita terakhir."
        bunga="🇮🇩🎀🎟️🚩"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const [benderaTulis, setBenderaTulis] = useState(false);
  const [benderaSuara, setBenderaSuara] = useState(false);
  const [kartuTulis, setKartuTulis] = useState(false);
  const [kartuTukar, setKartuTukar] = useState("");
  const sudahBendera = useRef(false);
  const sudahKartu = useRef(false);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana =
    skor >= 9 ? "🎆 Pahlawan Angka Merdeka" : skor >= 6 ? "🇮🇩 Pengibar Bendera Cerdas" : "🐦 Sahabat Pipit";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu jagoan angka sampai 20!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi pahlawan angka!"
        : "Ayo mengikat bendera lagi bersama Pipit, kamu pasti bisa!";
  useEffect(() => {
    if (!benderaTulis || !benderaSuara || sudahBendera.current) return;
    sudahBendera.current = true;
    kuis?.tandaiBenar(idKuis("D", 8));
  }, [benderaTulis, benderaSuara, kuis]);
  useEffect(() => {
    if (!kartuTulis || kartuTukar !== "bukan" || sudahKartu.current) return;
    sudahKartu.current = true;
    kuis?.tandaiBenar(idKuis("D", 9));
  }, [kartuTulis, kartuTukar, kuis]);
  const kartu = MODUL_MTK1_BAB5.kartu[3];
  const pasangan = ["Dua belas", "Dua puluh", "1 puluhan 5 satuan"];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝⭐"
        judul={kartu.judul}
        anak="Tantangan Para Juara · Ayo Membilang sampai dengan 20"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
        <li>Sepuluh diikat jadi satu. 1 ikat = 10 = 1 puluhan.</li>
        <li>Kiri puluhan, kanan satuan.</li>
        <li>Belas artinya sepuluh lebih sedikit. Tiga belas = 10 + 3.</li>
        <li>Simpan sepuluh, lalu lanjut hitung.</li>
        <li>Tulis puluhan dulu. 14, bukan 41.</li>
        <li>Dua ikat penuh = 20.</li>
        <li>Puluhan sama? Lihat satuannya. 19 lebih besar dari 12.</li>
      </ul>
      <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-black text-[#1C01A5]">
        Tiga belasan, empat belasan. Dua ikat penuh, jadi dua puluh. Kiri puluhan, kanan satuan. Ayo hitung lagi, sampai merdeka!
      </p>
      <div className="mt-4 grid gap-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/30 px-4 py-3 sm:grid-cols-3">
        <p className="text-sm font-black text-[#1C01A5]">Nama: {nama}</p>
        <p className="text-sm font-black text-[#1C01A5]">Kelas: 1</p>
        <p className="text-sm font-black text-[#1C01A5]">Skor: {skor} / 10</p>
      </div>
      <p className="mt-3 text-sm font-black text-[#1C01A5]">
        {lencana}. {pesan}
      </p>
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Hitung kelereng"
          visual={
            <div className="grid gap-2 sm:grid-cols-2">
              <BingkaiTitik titik={10} />
              <BingkaiTitik titik={7} />
            </div>
          }
          pertanyaan="Tulis banyaknya semua kelereng!"
          pesanSalah="Bingkai penuh 10, lalu tujuh kelereng lagi."
          umpan="10 + 7 = 17."
          alias={["17", "tujuh belas"]}
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["17", "tujuh belas"])}
        />
        <TulisBebas
          id={idKuis("D", 1)}
          judul="2. Rumah angka 19"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">Puluhan 🟦 ⬜ · Satuan 🟨 ⬜</p>}
          pertanyaan="Isi rumah nilai tempat angka 19. Tulis puluhan dan satuannya."
          pesanSalah="Puluhan 1, satuan 9. Angkanya 19."
          umpan="19 = 1 puluhan dan 9 satuan."
          alias={["19", "sembilan belas"]}
          konteks="Benar jika terbaca 19 atau puluhan 1 dan satuan 9. Angka 91 salah."
          periksa={(teks) =>
            jawabanTulisMemuatAlias(teks, ["19", "sembilan belas"]) ||
            ucapanMemuat(teks, [
              ["puluhan"],
              ["1", "satu"],
              ["satuan"],
              ["9", "sembilan"],
            ])
          }
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-center text-3xl font-black text-rose-700">51</p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan='3. Dimas menulis "lima belas" sebagai 51. Apakah Dimas benar? Ucapkan Benar atau Salah, lalu sebutkan cara menulis yang benar.'
            periksa={(transkrip) =>
              ucapanMemuat(transkrip, [
                ["salah"],
                ["15", "lima belas", "satu lima"],
              ])
            }
            petunjuk="Katakan salah, lalu sebutkan 15."
          />
        </div>
        <TulisBebas
          id={idKuis("D", 3)}
          judul="4. Angka yang hilang"
          visual={<p className="text-center text-lg font-black text-[#1C01A5]">🚂 12 – 13 – ⬜ – 15 – ⬜ – ⬜ – 18</p>}
          pertanyaan="Tulis tiga angka yang hilang!"
          pesanSalah="Yang hilang adalah 14, 16, dan 17."
          umpan="14, 16, dan 17."
          konteks="Benar hanya jika ketiga angka 14, 16, dan 17 terbaca."
          periksa={(teks) =>
            ["14", "16", "17"].every((angka) => jawabanTulisMemuatAlias(teks, [angka])) ||
            ucapanMemuat(teks, [
              ["empat belas"],
              ["enam belas"],
              ["tujuh belas"],
            ])
          }
        />
        <SoalRekamSuara
          id={idKuis("D", 4)}
          pertanyaan="5. Puluhanku 1. Satuanku lebih besar dari 6, tapi lebih kecil dari 8. Siapa aku?"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh belas", "17"])}
          petunjuk="Sebutkan angkanya."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Gambar ikatannya"
          pertanyaan="Gambarlah angka 14 dengan satu ikatan dan empat bulatan lepas."
          pesanSalah="Gambar satu pita dan empat bulatan, atau tulis 14."
          umpan="1 ikat + 4 bulatan = 14."
          alias={["14", "empat belas"]}
          konteks="Benar jika ada satu ikatan dan empat bulatan, atau tulisan 14."
          periksa={(teks) =>
            jawabanTulisMemuatAlias(teks, ["14", "empat belas"]) ||
            (jawabanTulisMemuatAlias(teks, ["ikat", "pita"]) && jawabanTulisMemuatAlias(teks, ["4", "empat"]))
          }
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Mana kantong kelereng yang paling banyak?"
          pilihan={[
            { huruf: "A", teks: "🎀 ●●●●●● (16)" },
            { huruf: "B", teks: "Angka 13" },
            { huruf: "C", teks: "10 + 8" },
          ]}
          benar="C"
          umpan="10 + 8 = 18. Itu yang paling banyak."
          salah="Bandingkan 16, 13, dan 18."
        />
        <KuisCocok
          id={idKuis("D", 7)}
          perintah="8. Pasangkan kartu yang nilainya sama!"
          baris={[
            { kiri: "10 + 2", pilihan: pasangan, benar: "Dua belas" },
            { kiri: "🎀🎀", pilihan: pasangan, benar: "Dua puluh" },
            { kiri: "15", pilihan: pasangan, benar: "1 puluhan 5 satuan" },
          ]}
          umpan="10 + 2 = dua belas. Dua ikat = dua puluh. 15 = 1 puluhan 5 satuan."
        />
        <TulisBebas
          id={`${ID}-D-bendera`}
          judul="9. Cukupkah benderanya?"
          visual={<p className="text-center text-2xl">🎀 <IkonUlang ikon="🇮🇩" jumlah={7} ukuran="text-xl" /></p>}
          pertanyaan="Pagar punya 20 tiang. Tari membawa 1 ikat dan 7 bendera lepas. Tulis banyak bendera yang Tari bawa."
          pesanSalah="1 ikat dan 7 lepas sama dengan 17."
          umpan="Tari membawa 17 bendera."
          alias={["17", "tujuh belas"]}
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["17", "tujuh belas"])}
          sesudahBenar={() => setBenderaTulis(true)}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="Apakah bendera Tari cukup untuk 20 tiang? Ucapkan Cukup atau Tidak cukup."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tidak cukup", "kurang"])}
          petunjuk="20 tiang, benderanya 17."
          sesudahNilai={(benar) => {
            if (benar) setBenderaSuara(true);
          }}
        />
        <TulisBebas
          id={`${ID}-D-kartu`}
          judul="10. Kartu angka ajaib"
          visual={<p className="text-center text-3xl font-black text-[#1C01A5]">[ 1 ] [ 8 ]</p>}
          pertanyaan="Susun kedua kartu jadi angka belasan. Tulis angkanya."
          pesanSalah="Susun menjadi 18, bukan 81."
          umpan="18 masih belasan."
          alias={["18", "delapan belas"]}
          konteks="Angka belasan dari kartu 1 dan 8 adalah 18. 81 bukan belasan."
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["18", "delapan belas"])}
          sesudahBenar={() => setKartuTulis(true)}
        />
        <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
          <p className="text-sm font-semibold text-slate-700">Kalau kartunya ditukar, angkanya masih belasan atau tidak?</p>
          <div className="mt-3 grid gap-2">
            {[
              ["masih", "Masih belasan"],
              ["bukan", "Bukan belasan lagi"],
            ].map(([kode, label]) => (
              <button
                key={kode}
                type="button"
                onClick={() => setKartuTukar(kode)}
                className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${
                  kartuTukar === kode ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-[#1C01A5]/15"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {kartuTukar === "masih" ? (
            <p className="mt-2 text-sm font-bold text-rose-800">81 bukan belasan. Letak angka mengubah nilainya.</p>
          ) : null}
          {kartuTulis && kartuTukar === "bukan" ? (
            <p className="mt-2 text-sm font-bold text-emerald-800">18 kalau ditukar jadi 81, bukan belasan lagi.</p>
          ) : null}
        </article>
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Sepuluh diikat jadi satu."
          alias={["sepuluh diikat jadi satu", "1 ikat = 10", "satu ikat sepuluh"]}
          konteks="Kalimat kuncinya: sepuluh diikat jadi satu."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Bendera kecil sudah siap. Kamu bisa membilang sampai 20.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab5({
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
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
