"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB7 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB7 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { QuestLangkah, type LangkahQuest } from "@/components/QuestLangkah";
import { BenarSalahTiga, JudulHalaman, SusunTiga, empatHalaman } from "@/components/modul/GigitanQuest";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB7 } from "@/lib/modul-resmi-mtk-1-bab7";
import { jawabanTulisMemuatAlias, normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB7.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function padat(teks: string): string {
  return normalisasiJawabanTulis(teks).replace(/\s+/g, "");
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function bukanBelasan(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  return !n.includes("belas") && !n.includes("puluh");
}

function jawabTujuhLangkah(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return jawabanTulisMemuatAlias(teks, ["7", "tujuh"]);
}

function jawabEnam(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return jawabanTulisMemuatAlias(teks, ["6", "enam"]);
}

function jawabDepa(teks: string): boolean {
  return normalisasiJawabanTulis(teks).includes("depa");
}

function bandingPita(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  const mentah = teks.toLowerCase();
  const adaArah = mentah.includes(">") || mentah.includes("lebih");
  return adaArah && jawabanTulisMemuatAlias(teks, ["8"]) && jawabanTulisMemuatAlias(teks, ["5"]);
}

function selisihTiga(teks: string): boolean {
  if (padat(teks).includes("7-4=3") || padat(teks).includes("9-6=3")) return true;
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  return jawabanTulisMemuatAlias(teks, ["3"]) || n.includes("tiga");
}

function alatLapangan(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  const alat = n.includes("langkah") || n.includes("depa");
  const alasan = /panjang|luas|jauh|besar|banyak|kecil|lapang|lebar/.test(n);
  return alat && alasan;
}

function tebakanPintu(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  if (["4", "5", "6", "7", "8"].some((angka) => jawabanTulisMemuatAlias(teks, [angka]))) return true;
  return ["empat", "lima", "enam", "tujuh", "delapan"].some((kata) => n.includes(kata));
}

function sambungPapan(teks: string): boolean {
  if (padat(teks).includes("4+3=7")) return true;
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  return jawabanTulisMemuatAlias(teks, ["7"]) || n.includes("tujuh");
}

function layangDua(teks: string): boolean {
  if (padat(teks).includes("9-4=5")) return true;
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  const beda = jawabanTulisMemuatAlias(teks, ["5"]) || n.includes("lima");
  const panjang = jawabanTulisMemuatAlias(teks, ["9", "b"]) || n.includes("sembilan");
  return beda && panjang;
}

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Rara: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bimo: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Igil: "border-amber-300 bg-amber-50",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <NamaDialog nama={nama} />
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
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
      <p className="text-center text-4xl font-normal" aria-hidden>
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

function JudulSubBab({
  judul,
  kelas,
  kelamin,
  naskah,
}: {
  judul: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  naskah: string[];
}) {
  return (
    <>
      <h5 className="mt-5 text-left text-base font-black tracking-wide text-[#1C01A5] sm:text-lg">{judul}</h5>
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah([naskah], 2_000, 3_000)} />
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
  src,
  alt,
  children,
}: {
  judul: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className="space-y-3 rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
      <p className="text-xs font-black uppercase text-[#166534]">{judul}</p>
      <GambarCerita src={src} alt={alt} />
      <div className="space-y-2">{children}</div>
    </article>
  );
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
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
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk benda, lalu ketuk pasangannya.</p>
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
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Coba pasangkan lagi." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function SusunUrut({
  id,
  judul,
  tampil,
  benar,
  umpan,
}: {
  id: string;
  judul: string;
  tampil: string[];
  benar: string[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [urutan, setUrutan] = useState<string[]>([]);
  const [cek, setCek] = useState(false);
  const sisa = tampil.filter((item) => !urutan.includes(item));
  const tepat = urutan.join("|") === benar.join("|");
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">{judul}</p>
      <p className="mt-2 min-h-10 rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
        {urutan.join(" → ") || "…"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((benda) => (
          <button
            key={benda}
            type="button"
            onClick={() => {
              setUrutan((lama) => [...lama, benda]);
              setCek(false);
            }}
            className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {benda}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setUrutan([]);
            setCek(false);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button
          type="button"
          disabled={urutan.length < benar.length}
          onClick={() => {
            setCek(true);
            if (tepat) kuis?.tandaiBenar(id);
          }}
          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
        >
          Periksa
        </button>
      </div>
      {cek ? <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Mulai dari angka yang paling kecil." /> : null}
      {cek && tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
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
  sesudahNilai,
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
  sesudahNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = async (data: string) => {
    const selesai = (ok: boolean, cuplikanBaru: string) => {
      setCuplikan(cuplikanBaru);
      setStatus(ok ? "benar" : "salah");
      sesudahNilai?.(ok);
      if (ok) {
        if (id) kuis?.tandaiBenar(id);
        sesudahBenar?.();
      }
    };
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }),
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
        selesai(json.benar === true || (bacaan.length > 0 && periksa(bacaan)), bacaan || "tulisan tangan");
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    selesai(periksa(data), data.trim());
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

function IsiBanding({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const panjang = ["2 jengkal", "5 jengkal", "9 jengkal"];
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab A: Membandingkan dan Mengurutkan Panjang Benda" kelas={kelas} kelamin={kelamin} naskah={["Mata bisa tertipu.", "Yang kelihatan kecil belum tentu lebih pendek."]} />
        <Adegan judul="Pesta di bukit" src="/doodle-mtk/mtk-1-bab7-bukit.jpg" alt="Bukit berlayang-layang. Bimo, Rara, dan Igil.">
          <p className="text-sm font-semibold text-slate-700">Langit cerah. Tiga layang-layang terbang. Satu tampak kecil karena jauh.</p>
          <Dialog nama="Bimo" anak="Layang-layangku kalah jauh. Punyamu lebih tinggi." />
          <Dialog nama="Rara" anak="Itu cuma kelihatan begitu. Kamu berdiri jauh dari kami." />
          <Dialog nama="Igil" anak="Namaku Igil! Aku mengukur tanpa penggaris. Aku memakai tubuhku!" />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 1)} idKanvas={idKuis("A", 2)} pertanyaanSuara="Siapa yang mengukur tanpa penggaris?" aliasSuara={["igil", "burung hantu"]} petunjukSuara="Sebutkan namanya." pertanyaanKanvas="Tuliskan nama Igil." aliasKanvas={["igil", "burung hantu"]} konteksKanvas="Yang mengukur dengan tubuhnya adalah Igil." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Membandingkan dan Mengurutkan" kepala={["Langkah", "Cara", "Hasil"]} baris={[["Ratakan ujung", "ujung kiri sejajar", "baru lihat kanan"], ["Alat sama", "satu jenis alat", "boleh dibanding"], ["Urutkan", "dari yang pendek", "lalu yang panjang"]]} kaki="Mata boleh ragu. Ukuran tidak." />
        <KuisAkhirAdegan idSuara={idKuis("A", 3)} idKanvas={idKuis("A", 4)} pertanyaanSuara="Kalau mau tahu yang sebenarnya, kita harus apa?" aliasSuara={["mengukur", "ukur"]} petunjukSuara="Ucapkan: mengukur." pertanyaanKanvas="Tuliskan kata mengukur." aliasKanvas={["mengukur"]} konteksKanvas="Mata bisa tertipu. Kita harus mengukur." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <Adegan judul="Tiga layang-layang" src="/doodle-mtk/mtk-1-bab7-adegan-4.jpg" alt="Tiga layang-layang dari yang pendek ke yang panjang.">
          <Dialog nama="Rara" anak="Ayo urutkan dari yang paling pendek." />
          <Dialog nama="Bimo" anak="Kecil, sedang, lalu besar!" />
          <Dialog nama="Igil" anak="Ratakan ujungnya dulu, baru lihat mana yang lebih panjang." />
          <p className="text-center text-lg font-black text-[#1C01A5]">3 jengkal · 5 jengkal · 8 jengkal</p>
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 9)} idKanvas={idKuis("A", 10)} pertanyaanSuara="Layang-layang yang paling panjang berapa jengkal?" aliasSuara={["8", "delapan"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 3 < 5 < 8." aliasKanvas={["3 < 5 < 8", "3<5<8"]} konteksKanvas="Urutannya 3 jengkal, lalu 5, lalu 8." />
        <KuisCocok id={idKuis("B", 0)} perintah="Pasangkan benda dengan panjangnya!" baris={[{ kiri: "🖍️ Krayon", pilihan: panjang, benar: "2 jengkal" }, { kiri: "🛏️ Tempat tidur", pilihan: panjang, benar: "9 jengkal" }, { kiri: "🪑 Meja belajar", pilihan: panjang, benar: "5 jengkal" }]} umpan="Krayon 2 jengkal. Meja 5 jengkal. Tempat tidur 9 jengkal." />
        <SusunUrut id={idKuis("B", 1)} judul="Susun dari yang paling pendek ke paling panjang!" tampil={["🧵 Benang 8", "📏 Penggaris 6", "✏️ Pensil 3", "🖇️ Klip 1"]} benar={["🖇️ Klip 1", "✏️ Pensil 3", "📏 Penggaris 6", "🧵 Benang 8"]} umpan="Klip, pensil, penggaris, lalu benang." />
        <BenarSalahTiga id={idKuis("A", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "Benda yang tampak kecil pasti lebih pendek.", benar: false }, { teks: "Ujung kiri harus rata sebelum dibanding.", benar: true }, { teks: "7 klip lebih panjang daripada 4 klip.", benar: true }]} umpan="Mata bisa tertipu. 7 lebih panjang daripada 4." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">&lt; &nbsp; &gt; &nbsp; =</p>
      <p className="text-sm font-semibold text-slate-700">Lebih pendek, lebih panjang, atau sama panjang.</p>
      <TulisBebas id={idKuisTulisKartu(ID, "B")} pertanyaan="Pita merah 8 klip. Pita biru 5 klip. Tulis perbandingannya dengan tanda > atau <." visual={<p className="text-center text-sm font-black text-[#1C01A5]">Pita merah 8 ⬜ pita biru 5</p>} pesanSalah="Delapan lebih besar dari lima. Pakai tanda lebih panjang." umpan="8 > 5." konteks="Pita merah lebih panjang. Kalimatnya 8 lebih besar dari 5." periksa={bandingPita} />
      <Pilih id={idKuis("A", 16)} pertanyaan="Pensil 7 klip dan pensil 4 klip. Yang lebih panjang..." pilihan={[{ huruf: "A", teks: "4 klip" }, { huruf: "B", teks: "7 klip" }, { huruf: "C", teks: "sama panjang" }]} benar="B" umpan="7 lebih besar daripada 4." salah="Pilih angka yang lebih besar." />
      <Pilih id={idKuis("A", 17)} pertanyaan="Urutan dari yang pendek: 2, 4, 7, 9. Yang paling panjang..." pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "9" }]} benar="C" umpan="9 berdiri paling kanan." salah="Angka paling besar adalah yang paling panjang." />
      <Pilih id={idKuis("A", 18)} pertanyaan="Tanda untuk 5 ... 8 adalah..." pilihan={[{ huruf: "A", teks: ">" }, { huruf: "B", teks: "<" }, { huruf: "C", teks: "=" }]} benar="B" umpan="5 lebih kecil daripada 8." salah="Mulut tanda terbuka ke angka yang lebih besar." />
    </div>
  );
}

function IsiUkur({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const [salahKanvas, setSalahKanvas] = useState(0);
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab B: Mengukur Panjang Benda" kelas={kelas} kelamin={kelamin} naskah={["Satu jengkal: jempol sampai kelingking.", "Pakai tangan yang sama."]} />
        <Adegan judul="Kenalan dengan jengkal" src="/doodle-mtk/mtk-1-bab7-adegan-2.jpg" alt="Igil membuka tangan. Garis dari jempol ke kelingking.">
          <Dialog nama="Igil" anak="Dari ujung jempol ke ujung kelingking, namanya satu jengkal!" />
          <Dialog nama="Bimo" anak="Jengkalnya kecil sekali!" />
          <Dialog nama="Rara" anak="Ayo kita ukur benang Bimo dengan jengkal." />
          <p className="text-center text-2xl">🖐️🖐️🖐️🖐️🖐️🖐️🖐️</p>
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 5)} idKanvas={idKuis("A", 6)} pertanyaanSuara="Benang Bimo panjangnya berapa jengkal?" aliasSuara={["7", "tujuh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 7." aliasKanvas={["7", "tujuh"]} konteksKanvas="Benang Bimo panjangnya 7 jengkal." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Satuan tidak baku" kepala={["Alat", "Cara", "Cocok untuk"]} baris={[["🖐️ Jengkal", "Jempol sampai kelingking", "Pensil, buku"], ["🙆 Depa", "Dua tangan dibuka", "Meja guru"], ["👣 Langkah", "Satu langkah kaki", "Lorong"]]} kaki="Rapat, lurus, dari ujung. Satu orang, satu alat." />
        <p className="text-sm font-semibold text-slate-700">Benang yang sama: Igil 7 jengkal, Bimo 4 jengkal, Rara 5 jengkal. Angkanya beda karena tangannya beda.</p>
        <KuisAkhirAdegan idSuara={idKuis("A", 7)} idKanvas={idKuis("A", 8)} pertanyaanSuara="Rara mengukur benang yang sama. Dia dapat berapa jengkal?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 1, karena pengukurnya harus satu orang." aliasKanvas={["1", "satu"]} konteksKanvas="Pakai 1 alat ukur dan 1 orang pengukur." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-sm font-black text-[#1C01A5]">👣 1 2 3 4 5 6 7</p>
        <SoalRekamSuara id={idKuis("A", 0)} pertanyaan="Tali ini panjangnya berapa langkah? Ucapkan dengan keras!" periksa={jawabTujuhLangkah} petunjuk="Hitung jejak kakinya." sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")} />
        {suara === "benar" ? <p className="text-sm font-bold text-emerald-800">Krukk! Kamu calon juri hebat!</p> : null}
        {suara === "salah" ? <p className="text-sm font-bold text-rose-800">Ayo hitung jejak kakinya satu per satu.</p> : null}
        <Adegan judul="Langkah kaki Igil" src="/doodle-mtk/mtk-1-bab7-adegan-5.jpg" alt="Igil berjalan dari start ke finish.">
          <Dialog nama="Igil" anak="Jalan menuju panggung aku ukur dengan langkah kaki!" />
          <Dialog nama="Bimo" anak="Aku hitung jejaknya." />
          <Dialog nama="Rara" anak="Pakai langkah Igil saja, jangan dicampur." />
          <p className="text-center text-2xl">👣👣👣👣👣👣👣👣👣👣</p>
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 11)} idKanvas={idKuis("A", 12)} pertanyaanSuara="Jalan menuju panggung berapa langkah Igil?" aliasSuara={["10", "sepuluh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 10." aliasKanvas={["10", "sepuluh"]} konteksKanvas="Jaraknya 10 langkah Igil." />
        <KuisAkhirAdegan idSuara={idKuis("A", 13)} idKanvas={idKuis("A", 14)} pertanyaanSuara="Siapa pemilik layang-layang terpanjang?" aliasSuara={["rara"]} petunjukSuara="Sebutkan namanya." pertanyaanKanvas="Tuliskan nama Rara." aliasKanvas={["rara"]} konteksKanvas="Layang-layang terpanjang milik Rara." />
        <SusunTiga id={idKuis("A", 19)} perintah="Susun alat dari yang paling kecil." acak={["Depa", "Jengkal", "Klip"]} benar={["Klip", "Jengkal", "Depa"]} umpan="Klip kecil, jengkal sedang, depa paling panjang." />
        <BenarSalahTiga id={idKuis("A", 20)} perintah="Pilih benar atau salah." baris={[{ teks: "Boleh ganti tangan di tengah mengukur.", benar: false }, { teks: "Alat ukur harus rapat, tanpa celah.", benar: true }, { teks: "Langkah kaki cocok untuk lorong.", benar: true }]} umpan="Satu orang, satu alat, rapat dari ujung." />
        <SusunUrut id={idKuis("B", 4)} judul="Susun dari yang paling pendek!" tampil={["Lorong", "Pensil", "Buku"]} benar={["Pensil", "Buku", "Lorong"]} umpan="Pensil, buku, lalu lorong." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-xl font-black text-[#1C01A5]">1 orang + 1 alat</p>
      <TulisBebas id={idKuisTulisKartu(ID, "A")} pertanyaan="Tulis panjang pita ini dengan satuan klip kertas!" visual={<p className="text-center text-2xl">📎📎📎📎📎📎</p>} pesanSalah="Hitung klipnya dari kiri ke kanan." umpan="Panjangnya 6 klip kertas." alias={["6", "enam"]} konteks="Ada enam klip kertas. Jawab 6, bukan 7 dan bukan 16." periksa={jawabEnam} sesudahNilai={(benar) => setSalahKanvas((n) => (benar ? 0 : n + 1))} />
      {salahKanvas >= 2 ? <p className="text-sm font-bold text-[#1C01A5]">Klip berkedip: 1, 2, 3, 4, 5, 6.</p> : null}
      <SoalRekamSuara id={idKuis("B", 3)} pertanyaan="Meja guru lebih pas diukur dengan klip kertas atau depa? Ucapkan jawabanmu!" periksa={jawabDepa} petunjuk="Pilih alat yang tidak terlalu kecil." />
      <Pilih id={idKuis("B", 2)} pertanyaan="Benda mana yang paling tepat diukur pakai langkah kaki?" pilihan={[{ huruf: "A", teks: "Panjang buku" }, { huruf: "B", teks: "Panjang lorong sekolah" }, { huruf: "C", teks: "Panjang pensil" }, { huruf: "D", teks: "Panjang pisang" }]} benar="B" umpan="Lorong panjang, jadi langkah kaki lebih pas." salah="Pilih benda yang paling panjang." />
      <Pilih id={idKuis("A", 21)} pertanyaan="Benang yang sama diukur dua orang. Angkanya beda karena..." pilihan={[{ huruf: "A", teks: "tangannya beda panjang" }, { huruf: "B", teks: "benangnya berubah" }, { huruf: "C", teks: "angka tidak boleh beda" }]} benar="A" umpan="Tangan yang lebih panjang membuat jengkal lebih sedikit." salah="Alatnya tangan mereka sendiri." />
      <Pilih id={idKuis("A", 22)} pertanyaan="Yang harus sama dari awal sampai akhir adalah..." pilihan={[{ huruf: "A", teks: "orang dan alatnya" }, { huruf: "B", teks: "warna bajunya" }, { huruf: "C", teks: "jumlah temannya" }]} benar="A" umpan="Satu orang, satu alat." salah="Yang diukur harus pakai alat yang sama." />
    </div>
  );
}


function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB7.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🪁🦉🏆"
        judul={kartu.judul}
        anak="Sepuluh tali layang · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB7}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB7}
        penutup="Layang-layang tertib di bukit. Igil mengukur dengan jengkal."
        bunga="🪁📏🐸👣"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB7.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🏅 Tukang Ukur Ahli" : skor >= 6 ? "🖐️ Juri Jengkal Hebat" : "🐸 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu bisa mengukur apa saja!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi ahli ukur!"
        : "Ayo ukur lagi bersama Igil, kamu pasti bisa!";
  const alatPas = ["📎 Klip kertas", "👣 Langkah kaki", "🖐️ Jengkal"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝📏"
        judul={kartu.judul}
        anak="Tantangan juri festival"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
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
          judul="1. Hitung langkahnya"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">🚪 👣👣👣👣👣👣👣👣 📋</p>}
          pertanyaan="Tulis berapa langkah jarak dari pintu ke papan tulis!"
          pesanSalah="Hitung jejak kakinya."
          umpan="8 langkah."
          alias={["8", "delapan"]}
          periksa={(teks) => bukanBelasan(teks) && jawabanTulisMemuatAlias(teks, ["8", "delapan"])}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Krayon 3 klip. Klip besar 5 klip. Ujung kirinya sudah rata. Mana yang lebih panjang?"
          pilihan={[
            { huruf: "A", teks: "Krayon" },
            { huruf: "B", teks: "Klip besar" },
            { huruf: "C", teks: "Sama panjang" },
          ]}
          benar="B"
          umpan="5 klip lebih panjang dari 3 klip."
          salah="Bandingkan angkanya."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Meja yang sama: tangan Bimo 6 jengkal, tangan Bimo 9 jengkal. Bimo berkata mejanya berubah panjang.
          </p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan='3. Apakah Bimo benar? Ucapkan "Benar" atau "Salah", lalu jelaskan singkat.'
            periksa={(transkrip) =>
              ucapanMemuat(transkrip, [["salah"], ["tangan", "beda", "tidak berubah", "alat"]])
            }
            petunjuk="Meja tidak berubah. Yang beda adalah tangannya."
          />
        </div>
        <SusunUrut
          id={idKuis("D", 3)}
          judul="4. Urutkan dari paling pendek ke paling panjang!"
          tampil={["🧹 Sapu 8", "📏 Penggaris 5", "🖍️ Krayon 2", "🥢 Lidi 1"]}
          benar={["🥢 Lidi 1", "🖍️ Krayon 2", "📏 Penggaris 5", "🧹 Sapu 8"]}
          umpan="Lidi, krayon, penggaris, lalu sapu."
        />
        <Pilih
          id={idKuis("D", 4)}
          pertanyaan="5. Lapangan bola sangat luas. Alat tidak baku yang paling tepat?"
          pilihan={[
            { huruf: "A", teks: "Klip kertas" },
            { huruf: "B", teks: "Langkah kaki" },
            { huruf: "C", teks: "Jengkal tangan" },
          ]}
          benar="B"
          umpan="Lapangan panjang, jadi diukur dengan langkah."
          salah="Klip dan jengkal terlalu kecil untuk lapangan."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Berapa selisihnya?"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">Pita A 9 jengkal. Pita B 6 jengkal.</p>}
          pertanyaan="Berapa jengkal pita A lebih panjang dari pita B?"
          pesanSalah="9 dikurangi 6."
          umpan="9 – 6 = 3 jengkal."
          alias={["3", "tiga"]}
          konteks="Selisih 9 dan 6 adalah 3."
          periksa={selisihTiga}
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("D", 6)}
            pertanyaan="7. Kira-kira berapa jengkal lebar pintu kelas? Ucapkan tebakanmu."
            periksa={tebakanPintu}
            petunjuk="Pintu kelas biasanya sekitar 4 sampai 8 jengkal anak."
          />
        </div>
        <KuisCocok
          id={idKuis("D", 7)}
          perintah="8. Pasangkan benda dengan alat ukur yang paling tepat!"
          baris={[
            { kiri: "📚 Panjang buku", pilihan: alatPas, benar: "📎 Klip kertas" },
            { kiri: "🏫 Panjang lorong", pilihan: alatPas, benar: "👣 Langkah kaki" },
            { kiri: "🖐️ Lebar meja", pilihan: alatPas, benar: "🖐️ Jengkal" },
          ]}
          umpan="Buku pakai klip. Lorong pakai langkah. Meja pakai jengkal."
        />
        <Pilih
          id={idKuis("D", 8)}
          pertanyaan="9. Papan 4 jengkal disambung papan 3 jengkal. Panjang semuanya?"
          pilihan={[
            { huruf: "A", teks: "6 jengkal" },
            { huruf: "B", teks: "7 jengkal" },
            { huruf: "C", teks: "8 jengkal" },
          ]}
          benar="B"
          umpan="4 + 3 = 7 jengkal."
          salah="Jumlahkan kedua papan."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Layang A 6 jengkal, B 9 jengkal, C 4 jengkal. Siapa terpanjang, dan berapa bedanya dengan yang terpendek?"
          pilihan={[
            { huruf: "A", teks: "B, selisih 5 jengkal" },
            { huruf: "B", teks: "A, selisih 2 jengkal" },
            { huruf: "C", teks: "C, selisih 5 jengkal" },
          ]}
          benar="A"
          umpan="B paling panjang. 9 - 4 = 5 jengkal."
          salah="Cari yang paling panjang, lalu kurangi yang paling pendek."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Rapat, lurus, dari ujung."
          alias={["rapat lurus dari ujung", "rapat, lurus, dari ujung", "dari ujung"]}
          konteks="Kalimat kuncinya: rapat, lurus, dari ujung."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Kamu sudah bisa mengukur tanpa penggaris.</p>
      </div>
    </KartuBingkai>
  );
}

function langkahBab7(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const kartuA = MODUL_MTK1_BAB7.kartu[0];
  const kuisMisi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("C", indeks)), idKuisTulisKartu(ID, "C")];
  const kuisEvaluasi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("D", indeks)), idKuisTulisKartu(ID, "D")];
  return [
    ...empatHalaman({ tab: "Sub-Bab A", kelompok: "Membandingkan panjang" }, "banding", [0, 1, 2, 3].map((halaman) => ({
      isi: <IsiBanding halaman={halaman} kelas={kelas} kelamin={kelamin} />,
      kuis: [
        [idKuis("A", 1), idKuis("A", 2)],
        [idKuis("A", 3), idKuis("A", 4)],
        [idKuis("A", 9), idKuis("A", 10), idKuis("B", 0), idKuis("B", 1), idKuis("A", 15)],
        [idKuisTulisKartu(ID, "B"), idKuis("A", 16), idKuis("A", 17), idKuis("A", 18)],
      ][halaman],
    }))),
    ...empatHalaman({ tab: "Sub-Bab B", kelompok: "Mengukur panjang" }, "ukur", [0, 1, 2, 3].map((halaman) => ({
      isi: <IsiUkur halaman={halaman} kelas={kelas} kelamin={kelamin} />,
      kuis: [
        [idKuis("A", 5), idKuis("A", 6)],
        [idKuis("A", 7), idKuis("A", 8)],
        [idKuis("A", 0), idKuis("A", 11), idKuis("A", 12), idKuis("A", 13), idKuis("A", 14), idKuis("A", 19), idKuis("A", 20), idKuis("B", 4)],
        [idKuisTulisKartu(ID, "A"), idKuis("B", 3), idKuis("B", 2), idKuis("A", 21), idKuis("A", 22)],
      ][halaman],
    }))),
    { kode: "misi", bagian: "Misi", judul: "Misi pesta layang-layang", kuis: kuisMisi, isi: <KartuC kelas={kelas} kelamin={kelamin} /> },
    {
      kode: "review",
      bagian: "Review",
      judul: "Tujuan Pembelajaran",
      tab: "Review",
      kelompok: "Tujuan Pembelajaran",
      bebas: true,
      isi: (
        <div className="space-y-4">
          <KepalaKartu ikon="🪁🦉📏" judul={kartuA.judul} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
          <TujuanBelajar butir={["Membandingkan panjang dan pendek, lalu mengurutkan benda.", "Mengukur dengan jengkal, langkah, klip kertas, lidi, dan depa."]} />
          <KartuPoinPenting kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB7.kartu[3].voice, 2_000, 3_000)} poin={["Mata boleh ragu, ukuran tidak.", "Rapat, lurus, dari ujung.", "Satu orang, satu alat.", "Jengkal, langkah, dan depa bisa jadi penggaris.", "Ratakan ujungnya dulu, baru bandingkan.", "Tebak dulu, ukur kemudian.", "Satuan tidak baku untuk membandingkan. Satuan baku untuk semua orang."]} penutup="Rapat, lurus, dari ujung. Satu tangan, satu ukuran." />
          <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>
        </div>
      ),
    },
    { kode: "evaluasi", bagian: "Evaluasi", judul: "Lembar evaluasi", isi: <LembarEvaluasi kelas={kelas} kelamin={kelamin} />, kuis: kuisEvaluasi },
  ];
}

export default function NaskahMtk1Bab7({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahBab7(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-1-bab7-v1"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "review" }}
      teksAkhir="Layang-layang tertib. Bab ini selesai."
    />
  );
}
