"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB6 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB6 } from "@/lib/tema-misi-mtk-1";

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
import { MODUL_MTK1_BAB6 } from "@/lib/modul-resmi-mtk-1-bab6";
import { jawabanTulisMemuatAlias, normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB6.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function padat(teks: string): string {
  return normalisasiJawabanTulis(teks).replace(/\s+/g, "");
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function jawabTujuh(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  if (n.includes("belas") || n.includes("puluh")) return false;
  return jawabanTulisMemuatAlias(teks, ["tujuh", "7"]);
}

function jawabLimaBelasKurangDelapan(teks: string): boolean {
  if (padat(teks).includes("15-8=7")) return true;
  const n = normalisasiJawabanTulis(teks);
  const ada15 = jawabanTulisMemuatAlias(teks, ["15", "lima belas"]);
  const ada7 = jawabanTulisMemuatAlias(teks, ["7"]) || (n.includes("tujuh") && !n.includes("tujuh belas"));
  const kurang = n.includes("-") || n.includes("kurang");
  return ada15 && ada7 && kurang;
}

function jawabTujuhBelasKurangSembilan(teks: string): boolean {
  const rapat = padat(teks);
  if (rapat.includes("10-2=8") && (rapat.includes("17") || rapat.includes("17-7"))) return true;
  const n = normalisasiJawabanTulis(teks);
  if (n.includes("delapan belas") || n.includes("tujuh belas")) return false;
  return jawabanTulisMemuatAlias(teks, ["8", "delapan"]) && jawabanTulisMemuatAlias(teks, ["10", "sepuluh"]);
}

function jawabDuaLangkah(teks: string): boolean {
  const rapat = padat(teks);
  if (rapat.includes("9+7=16") && rapat.includes("16-4=12")) return true;
  return (
    jawabanTulisMemuatAlias(teks, ["16", "enam belas"]) && jawabanTulisMemuatAlias(teks, ["12", "dua belas"])
  );
}

function pecahDelapanBelas(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  const ada10 = jawabanTulisMemuatAlias(teks, ["10", "sepuluh"]);
  const ada8 = jawabanTulisMemuatAlias(teks, ["8"]) || (n.includes("delapan") && !n.includes("delapan belas"));
  return ada10 && ada8;
}

function kejarDelapanSembilan(teks: string): boolean {
  const rapat = padat(teks);
  if (rapat.includes("8+2=10") && rapat.includes("10+7=17")) return true;
  return (
    jawabanTulisMemuatAlias(teks, ["2"]) &&
    jawabanTulisMemuatAlias(teks, ["10", "sepuluh"]) &&
    jawabanTulisMemuatAlias(teks, ["17", "tujuh belas"])
  );
}

function duaCaraEmpatBelas(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  const tambah = n.includes("+") || n.includes("tambah");
  const kurang = n.includes("-") || n.includes("kurang");
  const angka = n.split("14").length - 1;
  const kata = n.split("empat belas").length - 1;
  return tambah && kurang && angka + kata >= 2;
}

function duaLangkahBalon(teks: string): boolean {
  const rapat = padat(teks);
  if (rapat.includes("12-5=7") && rapat.includes("7+8=15")) return true;
  const n = normalisasiJawabanTulis(teks);
  const operasi = (n.includes("+") || n.includes("tambah")) && (n.includes("-") || n.includes("kurang"));
  return operasi && jawabanTulisMemuatAlias(teks, ["7"]) && jawabanTulisMemuatAlias(teks, ["15", "lima belas"]);
}

function kelerengSisa(teks: string): boolean {
  if (padat(teks).includes("17-9=8")) return true;
  const n = normalisasiJawabanTulis(teks);
  if (n.includes("delapan belas")) return false;
  const ada8 = jawabanTulisMemuatAlias(teks, ["8", "delapan"]);
  const adaKurang = n.includes("17") || n.includes("tujuh belas") || n.includes("-") || n.includes("kurang");
  return ada8 && adaKurang;
}

function bacakan(teks: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const suara = new SpeechSynthesisUtterance(teks);
  suara.lang = "id-ID";
  window.speechSynthesis.speak(suara);
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
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk kalimat, lalu ketuk hasilnya.</p>
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Hitung lagi, lalu pasangkan." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function SusunBalok({ id }: { id: string }) {
  const kuis = useKuisMateri();
  const awal = ["=", "8", "12", "+", "4"];
  const [sisa, setSisa] = useState(awal);
  const [urutan, setUrutan] = useState<string[]>([]);
  const [cek, setCek] = useState(false);
  const kalimat = urutan.join(" ");
  const tepat = kalimat === "8 + 4 = 12" || kalimat === "4 + 8 = 12";
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">Susun balok supaya jadi kalimat matematika yang benar!</p>
      <p className="mt-2 min-h-10 rounded-xl bg-white px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
        {kalimat || "…"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((balok, indeks) => (
          <button
            key={`${balok}-${indeks}`}
            type="button"
            onClick={() => {
              setUrutan((lama) => [...lama, balok]);
              setSisa((lama) => lama.filter((_, i) => i !== indeks));
              setCek(false);
            }}
            className="rounded-xl bg-white px-4 py-2 text-lg font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {balok}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setSisa(awal);
            setUrutan([]);
            setCek(false);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button
          type="button"
          disabled={urutan.length < 5}
          onClick={() => {
            setCek(true);
            if (tepat) kuis?.tandaiBenar(id);
          }}
          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
        >
          Periksa
        </button>
      </div>
      {cek ? (
        <HasilJawabanKuis
          status={tepat ? "benar" : "salah"}
          pesanSalah="Coba 8 + 4 = 12, atau 4 + 8 = 12."
        />
      ) : null}
      {cek && tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">8 + 4 = 12.</p> : null}
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
        sesudahNilai?.(ok);
        if (ok) {
          if (id) kuis?.tandaiBenar(id);
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
    sesudahNilai?.(ok);
    if (ok) {
      if (id) kuis?.tandaiBenar(id);
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

function IsiLebih({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab A: Mengenal Konsep Lebih dari, Kurang dari, dan Selisih" kelas={kelas} kelamin={kelamin} naskah={["Anak kucing ada di dahan yang tinggi.", "Kita hitung selisihnya dengan hitung maju."]} />
        <Adegan judul="Anak kucing di dahan" src="/doodle-mtk/mtk-1-bab6-sore.jpg" alt="Pohon dengan anak kucing di dahan. Rara, Bimo, dan Igil di bawah.">
          <Dialog nama="Igil" anak="Lihat! Ada anak kucing di dahan paling tinggi!" />
          <Dialog nama="Bimo" anak="Dahan itu bertanda angka ini." />
          <Dialog nama="Rara" anak="Kalau kursi kita susun, kita bisa sampai!" />
          <p className="text-center text-3xl font-black text-[#1C01A5]">18</p>
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 1)} idKanvas={idKuis("A", 2)} pertanyaanSuara="Anak kucing ada di ketinggian berapa kaki?" aliasSuara={["18", "delapan belas"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 18." aliasKanvas={["18", "delapan belas"]} konteksKanvas="Anak kucing ada di angka 18." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Selisih dua tempat" kepala={["Tempat", "Angka", "Cara"]} baris={[["Kita berdiri", "12", "mulai di sini"], ["Anak kucing", "18", "berhenti di sini"], ["Selisih", "hitung maju", "satu langkah, satu angka"]]} kaki="Jangan lompat. Hitung satu per satu." />
        <KuisAkhirAdegan idSuara={idKuis("A", 3)} idKanvas={idKuis("A", 4)} pertanyaanSuara="Dari 12 sampai 18, ada berapa langkah?" aliasSuara={["6", "enam"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 12 + 6 = 18." aliasKanvas={["12 + 6 = 18", "12+6=18"]} konteksKanvas="Dua belas ditambah enam sama dengan delapan belas." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-lg font-black text-[#1C01A5]">12 · 15 · 18</p>
        <SusunTiga id={idKuis("A", 17)} perintah="Susun dari yang paling rendah." acak={["18", "12", "15"]} benar={["12", "15", "18"]} umpan="12, lalu 15, lalu 18." />
        <BenarSalahTiga id={idKuis("A", 18)} perintah="Pilih benar atau salah." baris={[{ teks: "18 lebih tinggi daripada 12.", benar: true }, { teks: "Selisih dihitung dengan melompat sembarang.", benar: false }, { teks: "Hitung maju berarti angkanya bertambah.", benar: true }]} umpan="18 lebih tinggi. Hitung maju satu per satu." />
        <SusunTiga id={idKuis("A", 19)} perintah="Susun langkah dari 12 menuju 18." acak={["14", "13", "15"]} benar={["13", "14", "15"]} umpan="13, 14, lalu 15." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">12 + 6 = 18</p>
      <Pilih id={idKuis("A", 20)} pertanyaan="10 + 3 dan 16 – 3. Keduanya..." pilihan={[{ huruf: "A", teks: "13" }, { huruf: "B", teks: "19" }, { huruf: "C", teks: "7" }]} benar="A" umpan="10 + 3 = 13. 16 – 3 = 13." salah="Hitung kedua kalimatnya." />
      <Pilih id={idKuis("A", 21)} pertanyaan="Selisih 9 dan 4 adalah..." pilihan={[{ huruf: "A", teks: "13" }, { huruf: "B", teks: "5" }, { huruf: "C", teks: "4" }]} benar="B" umpan="9 – 4 = 5." salah="Kurangi yang lebih kecil." />
      <Pilih id={idKuis("A", 22)} pertanyaan="Yang lebih banyak, 14 atau 11?" pilihan={[{ huruf: "A", teks: "11" }, { huruf: "B", teks: "sama" }, { huruf: "C", teks: "14" }]} benar="C" umpan="14 lebih besar daripada 11." salah="Pilih angka yang lebih besar." />
    </div>
  );
}

function IsiTambah({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const hasil = ["12", "17", "15"];
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab B: Penjumlahan yang Hasilnya Kurang dari 20" kelas={kelas} kelamin={kelamin} naskah={["Belasan bisa dipecah jadi sepuluh dan sisanya.", "14 sama dengan 10 tambah 4."]} />
        <Adegan judul="Pecah empat belas" src="/doodle-mtk/mtk-1-bab6-adegan-2.jpg" alt="Angka 14 menjadi kotak 10 dan kotak 4.">
          <Dialog nama="Igil" anak="Setiap angka belasan bisa dipecah jadi dua bagian!" />
          <Dialog nama="Rara" anak="Seperti ikatan sepuluh dan yang lepas?" />
          <Dialog nama="Bimo" anak="Aku lihat kotak sepuluh dan kotak kecilnya." />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 5)} idKanvas={idKuis("A", 6)} pertanyaanSuara="Empat belas sama dengan sepuluh tambah berapa?" aliasSuara={["4", "empat"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 14 = 10 + 4." aliasKanvas={["14 = 10 + 4", "14=10+4"]} konteksKanvas="Empat belas dipecah jadi sepuluh dan empat." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Hitung maju" kepala={["Mulai", "Tambah", "Cara"]} baris={[["8 kursi", "7 kursi", "hitung maju 7 kali"], ["Isi ke 10", "ambil 2 dulu", "sisanya ditambahkan"], ["10", "sisa kursi", "jumlahnya di bawah 20"]]} kaki="Kejar sepuluh dulu. Sisanya lebih mudah." />
        <KuisAkhirAdegan idSuara={idKuis("A", 7)} idKanvas={idKuis("A", 8)} pertanyaanSuara="Delapan kursi ditambah tujuh kursi. Semuanya berapa?" aliasSuara={["15", "lima belas"]} petunjukSuara="Ucapkan hasilnya." pertanyaanKanvas="Tuliskan 8 + 7 = 15." aliasKanvas={["8 + 7 = 15", "8+7=15"]} konteksKanvas="Delapan ditambah tujuh sama dengan lima belas." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <Adegan judul="Isi dulu ke sepuluh" src="/doodle-mtk/mtk-1-bab6-adegan-4.jpg" alt="Bingkai sepuluh hampir penuh. Lima kursi menunggu di luar.">
          <Dialog nama="Igil" anak="8 itu kurang 2 supaya jadi penuh 10." />
          <Dialog nama="Rara" anak="Kita ambil sebagian dari 7 kursi untuk mengisi sepuluh." />
          <Dialog nama="Bimo" anak="Sisanya menunggu di luar bingkai." />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 9)} idKanvas={idKuis("A", 10)} pertanyaanSuara="Setelah diisi sampai sepuluh, sisa kursi yang ditambahkan berapa?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 10 + 5 = 15." aliasKanvas={["10 + 5 = 15", "10+5=15"]} konteksKanvas="Sepuluh ditambah lima sama dengan lima belas." />
        <p className="text-center text-sm font-black text-[#1C01A5]">13 → 14 → 15 → 16 → 17</p>
        <SoalRekamSuara id={idKuis("A", 0)} pertanyaan="Mulai dari 13, hitung maju 4 langkah. Berhenti di angka berapa? Ucapkan dengan keras!" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh belas", "17"])} petunjuk="Sebutkan angka berhentinya." sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")} />
        {suara === "benar" ? <p className="text-sm font-bold text-emerald-800">Tik-tik! Kamu cepat sekali!</p> : null}
        {suara === "salah" ? <p className="text-sm font-bold text-rose-800">Ayo tunjuk angkanya satu per satu.</p> : null}
        <KuisCocok id={idKuis("B", 0)} perintah="Pasangkan kalimat hitung dengan hasilnya!" baris={[{ kiri: "11 + 6", pilihan: hasil, benar: "17" }, { kiri: "19 – 7", pilihan: hasil, benar: "12" }, { kiri: "10 + 9 – 4", pilihan: hasil, benar: "15" }]} umpan="11 + 6 = 17. 19 – 7 = 12. 10 + 9 – 4 = 15." />
        <SusunBalok id={idKuis("B", 1)} />
        <BenarSalahTiga id={idKuis("B", 4)} perintah="Pilih benar atau salah." baris={[{ teks: "8 + 2 membuat sepuluh penuh.", benar: true }, { teks: "7 + 7 hasilnya lebih dari 20.", benar: false }, { teks: "Hitung maju berarti bertambah satu-satu.", benar: true }]} umpan="8 + 2 = 10. 7 + 7 = 14." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">10 + sisa</p>
      <Pilih id={idKuis("A", 23)} pertanyaan="9 + 6 sama dengan..." pilihan={[{ huruf: "A", teks: "14" }, { huruf: "B", teks: "15" }, { huruf: "C", teks: "16" }]} benar="B" umpan="9 + 1 = 10. Sisa 5. 10 + 5 = 15." salah="Isi dulu sampai sepuluh." />
      <Pilih id={idKuis("A", 24)} pertanyaan="13 + 4 berhenti di..." pilihan={[{ huruf: "A", teks: "16" }, { huruf: "B", teks: "17" }, { huruf: "C", teks: "18" }]} benar="B" umpan="14, 15, 16, 17. Empat langkah." salah="Hitung maju empat kali." />
      <Pilih id={idKuis("A", 25)} pertanyaan="6 + 8 = 14. Maka 14 – 8 = ..." pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "8" }, { huruf: "C", teks: "14" }]} benar="A" umpan="Yang ditambahkan bisa dikembalikan." salah="Lihat angka yang tadi ditambahkan." />
    </div>
  );
}

function IsiKurang({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const [salahKanvas, setSalahKanvas] = useState(0);
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab C: Pengurangan yang Hasilnya Kurang dari 20" kelas={kelas} kelamin={kelamin} naskah={["Kursi yang jatuh berarti dikurangi.", "Hitung mundur satu per satu."]} />
        <Adegan judul="Kursi jatuh" src="/doodle-mtk/mtk-1-bab6-adegan-5.jpg" alt="Tumpukan kursi. Empat kursi jatuh. Igil terkejut.">
          <Dialog nama="Igil" anak="Oh tidak! Ada kursi yang jatuh!" />
          <Dialog nama="Rara" anak="Tadi ada 15 kursi." />
          <Dialog nama="Bimo" anak="Yang jatuh ada 4. Ayo hitung mundur." />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 11)} idKanvas={idKuis("A", 12)} pertanyaanSuara="Ada 15 kursi. Yang jatuh 4. Sisa berapa?" aliasSuara={["11", "sebelas"]} petunjukSuara="Ucapkan sisanya." pertanyaanKanvas="Tuliskan 15 - 4 = 11." aliasKanvas={["15 - 4 = 11", "15-4=11"]} konteksKanvas="Lima belas dikurangi empat sama dengan sebelas." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Kurangi lewat sepuluh" kepala={["Mulai", "Langkah", "Tujuan"]} baris={[["16", "kurangi sampai 10", "sisa pengurang"], ["10", "kurangi sisanya", "hasil"], ["Cek", "tambah lagi", "kembali ke 16"]]} kaki="Habiskan dulu sampai sepuluh." />
        <KuisAkhirAdegan idSuara={idKuis("A", 13)} idKanvas={idKuis("A", 14)} pertanyaanSuara="Enam belas dikurangi sembilan. Hasilnya berapa?" aliasSuara={["7", "tujuh"]} petunjukSuara="Ucapkan hasilnya." pertanyaanKanvas="Tuliskan 16 - 9 = 7." aliasKanvas={["16 - 9 = 7", "16-9=7"]} konteksKanvas="Enam belas dikurangi sembilan sama dengan tujuh." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <Adegan judul="Tiga cara" src="/doodle-mtk/mtk-1-bab6-adegan-7.jpg" alt="Anak kucing selamat di pelukan Rara. Bimo dan Igil tersenyum.">
          <Dialog nama="Rara" anak="Kita pakai hitung maju, hitung mundur, dan pecah angka." />
          <Dialog nama="Bimo" anak="Anak kucing sudah turun!" />
          <Dialog nama="Igil" anak="Angka bisa berjalan maju dan mundur." />
        </Adegan>
        <KuisAkhirAdegan idSuara={idKuis("A", 15)} idKanvas={idKuis("A", 16)} pertanyaanSuara="Ada berapa cara yang dipakai: hitung maju, hitung mundur, dan pecah angka?" aliasSuara={["3", "tiga"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan salah satu caranya: maju." aliasKanvas={["maju", "hitung maju"]} konteksKanvas="Salah satu caranya adalah hitung maju." />
        <SoalRekamSuara id={idKuis("B", 3)} pertanyaan="Kalau 7 + 9 = 16, maka berapa 16 – 9? Ucapkan jawabannya!" periksa={jawabTujuh} petunjuk="Sebutkan hasil 16 dikurangi 9." />
        <SusunTiga id={idKuis("A", 26)} perintah="Susun hitung mundur dari 15." acak={["13", "14", "12"]} benar={["14", "13", "12"]} umpan="14, 13, lalu 12." />
        <BenarSalahTiga id={idKuis("A", 27)} perintah="Pilih benar atau salah." baris={[{ teks: "15 – 4 dihitung dengan maju dari 15.", benar: false }, { teks: "16 – 6 berhenti di 10.", benar: true }, { teks: "Satu keluarga angka punya kalimat tambah dan kurang.", benar: true }]} umpan="Kurang dihitung mundur. 16 – 6 = 10." />
        <SusunTiga id={idKuis("B", 5)} perintah="Susun dari hasil yang paling kecil." acak={["15 – 4", "16 – 9", "14 – 6"]} benar={["16 – 9", "14 – 6", "15 – 4"]} umpan="7, lalu 8, lalu 11." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">15 – 4 &nbsp; 16 – 9</p>
      <TulisBebas id={idKuisTulisKartu(ID, "A")} pertanyaan="Tulis kalimat matematikanya dan hasilnya!" visual={<p className="text-center text-sm font-semibold text-slate-700">Bingkai 10 penuh dan 5 titik. Delapan titik dicoret.</p>} pesanSalah="Coba tulis 15 – 8 dan hasilnya." umpan="15 – 8 = 7." alias={["15-8=7"]} konteks="Sepuluh penuh ditambah lima adalah 15. Delapan dicoret. 15 kurang 8 sama dengan 7." periksa={jawabLimaBelasKurangDelapan} sesudahNilai={(benar) => setSalahKanvas((n) => (benar ? 0 : n + 1))} />
      {salahKanvas >= 2 ? <p className="text-sm font-bold text-[#1C01A5]">Lompat mundur dari 15 sebanyak 8 kali.</p> : null}
      <TulisBebas id={idKuisTulisKartu(ID, "B")} pertanyaan="Hitung 17 – 9 dengan cara pecah angka. Tulis langkahnya dan hasilnya!" pesanSalah="Pecah lewat sepuluh: kurangi dulu sampai 10, lalu sisanya." umpan="17 – 7 – 2 = 10 – 2 = 8." konteks="17 dikurangi 9 melewati 10. Hasilnya 8." periksa={jawabTujuhBelasKurangSembilan} />
      <Pilih id={idKuis("B", 2)} pertanyaan="Tiga kartu hasilnya 13. Ketuk kartu yang berbeda!" pilihan={[{ huruf: "A", teks: "10 + 3" }, { huruf: "B", teks: "16 – 2" }, { huruf: "C", teks: "8 + 5" }, { huruf: "D", teks: "20 – 7" }]} benar="B" umpan="16 – 2 = 14. Kartu lain hasilnya 13." salah="Hitung tiap kartu. Yang bukan 13 adalah kartu berbeda." />
      <Pilih id={idKuis("A", 28)} pertanyaan="18 – 6 = ..." pilihan={[{ huruf: "A", teks: "12" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "11" }]} benar="A" umpan="Hitung mundur enam kali dari 18." salah="Mundur: 17, 16, 15, 14, 13, 12." />
      <Pilih id={idKuis("A", 29)} pertanyaan="14 – 6 dipecah lewat sepuluh. Hasilnya..." pilihan={[{ huruf: "A", teks: "8" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "6" }]} benar="A" umpan="14 – 4 = 10. 10 – 2 = 8." salah="Habiskan dulu sampai sepuluh." />
    </div>
  );
}


function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB6.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🦉🌳🏆"
        judul={kartu.judul}
        anak="Sepuluh kursi penyelamatan · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB6}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB6}
        penutup="Anak kucing turun dari dahan. Jam Igil berbunyi tepat."
        bunga="🐱🌳⏰🪑"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB6.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "⏰ Jaganya Jam Ajaib" : skor >= 6 ? "🪢 Insinyur Penyelamat" : "🐭 Sahabat Igil";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu bisa hitung maju dan mundur!"
      : skor >= 6
        ? "Hebat! Sedikit lagi Igil bebas!"
        : "Ayo coba lagi bersama Igil, kamu pasti bisa!";
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝⏰"
        judul={kartu.judul}
        anak="Tantangan para penyelamat"
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
          judul="1. Hitung maju"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">9 → → → → → → enam lompatan</p>}
          pertanyaan="Tulis kalimat matematikanya dan hasilnya!"
          pesanSalah="Enam lompatan dari 9 adalah penjumlahan."
          umpan="9 + 6 = 15."
          alias={["15", "lima belas", "9+6=15"]}
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["15", "lima belas", "9 + 6 = 15", "9+6=15"])}
        />
        <TulisBebas
          id={idKuis("D", 1)}
          judul="2. Hitung mundur"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">17 ← ← ← ← ← lima lompatan</p>}
          pertanyaan="Tulis kalimat matematikanya dan hasilnya!"
          pesanSalah="Lima lompatan mundur dari 17 adalah pengurangan."
          umpan="17 – 5 = 12."
          alias={["12", "dua belas", "17-5=12"]}
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["12", "dua belas", "17 - 5 = 12", "17-5=12"])}
        />
        <Pilih
          id={idKuis("D", 2)}
          pertanyaan="3. Pecahan angka 18 yang benar adalah?"
          pilihan={[
            { huruf: "A", teks: "10 + 8" },
            { huruf: "B", teks: "10 + 9" },
            { huruf: "C", teks: "8 + 8" },
          ]}
          benar="A"
          umpan="18 = 10 + 8."
          salah="Delapan belas punya 1 puluhan dan 8 satuan."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Bimo berkata: 13 + 5 = 17.</p>
          <SoalRekamSuara
            id={idKuis("D", 3)}
            pertanyaan='4. Apakah Bimo benar? Ucapkan "Benar" atau "Salah", lalu sebutkan jawaban yang benar.'
            periksa={(transkrip) => ucapanMemuat(transkrip, [["salah"], ["18", "delapan belas"]])}
            petunjuk="Katakan salah, lalu sebutkan hasil yang benar."
          />
        </div>
        <Pilih
          id={idKuis("D", 4)}
          pertanyaan="5. Hitung 8 + 9 dengan cara kejar sepuluh. Langkah yang benar?"
          pilihan={[
            { huruf: "A", teks: "8 + 1 = 9, lalu 10 + 8 = 18" },
            { huruf: "B", teks: "8 + 2 = 10, lalu 10 + 7 = 17" },
            { huruf: "C", teks: "8 + 3 = 11, lalu 10 + 6 = 16" },
          ]}
          benar="B"
          umpan="8 butuh 2 untuk jadi 10. Sisa dari 9 adalah 7. Hasilnya 17."
          salah="Isi dulu sampai 10, lalu tambahkan sisanya."
        />
        <Pilih
          id={idKuis("D", 5)}
          pertanyaan="6. Timbangan kiri 9 + 7. Timbangan kanan 15 + 1. Tanda yang tepat?"
          pilihan={[
            { huruf: "A", teks: ">" },
            { huruf: "B", teks: "<" },
            { huruf: "C", teks: "=" },
          ]}
          benar="C"
          umpan="9 + 7 = 16 dan 15 + 1 = 16."
          salah="Hitung kedua sisi dulu."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Donat 11 koin. Kue 16 koin. Rara punya 15 koin. Mana yang bisa dibeli?"
          pilihan={[
            { huruf: "A", teks: "Donat" },
            { huruf: "B", teks: "Kue" },
            { huruf: "C", teks: "Donat dan kue" },
          ]}
          benar="A"
          umpan="15 cukup untuk donat 11, belum cukup untuk kue 16."
          salah="Bandingkan 15 dengan harga masing-masing."
        />
        <Pilih
          id={idKuis("D", 7)}
          pertanyaan="8. Mana pasangan yang satu tambah dan satu kurang, keduanya hasilnya 14?"
          pilihan={[
            { huruf: "A", teks: "7 + 7 = 14 dan 18 - 4 = 14" },
            { huruf: "B", teks: "7 + 7 = 14 dan 9 + 6 = 15" },
            { huruf: "C", teks: "10 + 4 = 14 dan 8 + 6 = 14" },
          ]}
          benar="A"
          umpan="Satu penjumlahan dan satu pengurangan, keduanya 14."
          salah="Harus ada satu tambah dan satu kurang."
        />
        <SoalRekamSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Ada 17 kelereng. Sebanyak 9 jatuh. Sisa berapa? Ucapkan jumlahnya."
          periksa={(transkrip) => {
            const n = normalisasiJawabanTulis(transkrip);
            if (n.includes("belas")) return false;
            return jawabanTulisMemuatAlias(transkrip, ["delapan", "8"]);
          }}
          petunjuk="Sebutkan sisa kelerengnya."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Toko punya 12 balon. Dibeli 5, lalu datang lagi 8. Sekarang ada berapa?"
          pilihan={[
            { huruf: "A", teks: "15" },
            { huruf: "B", teks: "12" },
            { huruf: "C", teks: "25" },
          ]}
          benar="A"
          umpan="12 - 5 = 7, lalu 7 + 8 = 15."
          salah="Kurangi dulu, baru tambahkan kiriman baru."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Kejar sepuluh dulu, sisanya gampang."
          alias={["kejar sepuluh dulu", "kejar sepuluh", "sisanya gampang"]}
          konteks="Kalimat kuncinya: kejar sepuluh dulu, sisanya gampang."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Anak kucing selamat. Kamu bisa hitung maju dan mundur sampai 20.</p>
      </div>
    </KartuBingkai>
  );
}

function langkahBab6(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const kartuA = MODUL_MTK1_BAB6.kartu[0];
  const kuisMisi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("C", indeks)), idKuisTulisKartu(ID, "C")];
  const kuisEvaluasi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("D", indeks)), idKuisTulisKartu(ID, "D")];
  const butir = ["Membandingkan dua jumlah: lebih banyak, lebih sedikit, atau sama.", "Menjumlahkan bilangan sampai 20 dengan hitung maju dan kejar sepuluh.", "Mengurangkan bilangan sampai 20 dengan hitung mundur."];
  return [
    ...empatHalaman({ tab: "Sub-Bab A", kelompok: "Lebih, kurang, dan selisih" }, "lebih", [0, 1, 2, 3].map((halaman) => ({
      isi: <IsiLebih halaman={halaman} kelas={kelas} kelamin={kelamin} />,
      kuis: [
        [idKuis("A", 1), idKuis("A", 2)],
        [idKuis("A", 3), idKuis("A", 4)],
        [idKuis("A", 17), idKuis("A", 18), idKuis("A", 19)],
        [idKuis("A", 20), idKuis("A", 21), idKuis("A", 22)],
      ][halaman],
    }))),
    ...empatHalaman({ tab: "Sub-Bab B", kelompok: "Penjumlahan sampai 20" }, "tambah", [0, 1, 2, 3].map((halaman) => ({
      isi: <IsiTambah halaman={halaman} kelas={kelas} kelamin={kelamin} />,
      kuis: [
        [idKuis("A", 5), idKuis("A", 6)],
        [idKuis("A", 7), idKuis("A", 8)],
        [idKuis("A", 9), idKuis("A", 10), idKuis("A", 0), idKuis("B", 0), idKuis("B", 1), idKuis("B", 4)],
        [idKuis("A", 23), idKuis("A", 24), idKuis("A", 25)],
      ][halaman],
    }))),
    ...empatHalaman({ tab: "Sub-Bab C", kelompok: "Pengurangan sampai 20" }, "kurang", [0, 1, 2, 3].map((halaman) => ({
      isi: <IsiKurang halaman={halaman} kelas={kelas} kelamin={kelamin} />,
      kuis: [
        [idKuis("A", 11), idKuis("A", 12)],
        [idKuis("A", 13), idKuis("A", 14)],
        [idKuis("A", 15), idKuis("A", 16), idKuis("B", 3), idKuis("A", 26), idKuis("A", 27), idKuis("B", 5)],
        [idKuisTulisKartu(ID, "A"), idKuisTulisKartu(ID, "B"), idKuis("B", 2), idKuis("A", 28), idKuis("A", 29)],
      ][halaman],
    }))),
    { kode: "misi", bagian: "Misi", judul: "Misi selamatkan anak kucing", kuis: kuisMisi, isi: <KartuC kelas={kelas} kelamin={kelamin} /> },
    {
      kode: "review",
      bagian: "Review",
      judul: "Tujuan Pembelajaran",
      tab: "Review",
      kelompok: "Tujuan Pembelajaran",
      bebas: true,
      isi: (
        <div className="space-y-4">
          <KepalaKartu ikon="🦉🌳🦉" judul={kartuA.judul} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
          <TujuanBelajar butir={butir} />
          <KartuPoinPenting kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB6.kartu[3].voice, 2_000, 3_000)} poin={["Tambah? Hitung maju. 12 + 5 berhenti di 17.", "Kurang? Hitung mundur. 18 – 6 berhenti di 12.", "Belasan selalu punya 10 di dalamnya. 14 = 10 + 4.", "Kejar sepuluh dulu, sisanya gampang. 9 + 6 = 10 + 5 = 15.", "Habiskan satuan dulu. 14 – 6 = 10 – 2 = 8.", "Satu keluarga angka, tiga kalimat. 8 + 7 = 15, 15 – 7 = 8, 15 – 8 = 7.", "Baca soal, cari kata kunci, lalu hitung."]} penutup="Maju ke kanan, mundur ke kiri. Pecah lewat sepuluh." />
          <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>
        </div>
      ),
    },
    { kode: "evaluasi", bagian: "Evaluasi", judul: "Lembar evaluasi", isi: <LembarEvaluasi kelas={kelas} kelamin={kelamin} />, kuis: kuisEvaluasi },
  ];
}

export default function NaskahMtk1Bab6({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahBab6(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-1-bab6-v1"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "review" }}
      teksAkhir="Anak kucing selamat. Bab ini selesai."
    />
  );
}
