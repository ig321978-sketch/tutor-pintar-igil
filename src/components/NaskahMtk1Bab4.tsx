"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB4 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB4 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { QuestLangkah, type LangkahQuest } from "@/components/QuestLangkah";
import { BenarSalahTiga, JudulHalaman, SusunTiga, empatHalaman } from "@/components/modul/GigitanQuest";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB4 } from "@/lib/modul-resmi-mtk-1-bab4";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB4.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
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
      <NamaDialog nama={nama} igil="nenek" />
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

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
  onNilai,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
  onNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3 text-2xl leading-relaxed">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              const tepat = item.huruf === benar;
              if (tepat) kuis?.tandaiBenar(id);
              onNilai?.(tepat);
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
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk benda, lalu ketuk bentuknya.</p>
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
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Lihat lagi sisi bendanya, lalu pasangkan." />
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
  sesudahBenar,
}: {
  id: string;
  judul?: string;
  visual?: ReactNode;
  pertanyaan: string;
  pesanSalah: string;
  umpan: string;
  periksa: (teks: string) => boolean;
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
            konteks: umpan,
            alias: [],
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
    setCuplikan(data.trim());
    const ok = periksa(data);
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

function IsiBentuk({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab A: Mendeskripsikan Benda Berdasarkan Bentuk" kelas={kelas} kelamin={kelamin} naskah={["Hari ini Rara dan Bimo jadi detektif bentuk di rumah Nenek.", "Atap lancip. Hitung sisinya."]} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab4-atap.jpg" alt="Atap rumah berbentuk segitiga." />
        <Dialog nama="Igil" anak="Halo, Rara! Halo, Bimo! Hari ini kita main detektif bentuk!" />
        <Dialog nama="Rara" anak="Apa itu bentuk, Nek?" />
        <Dialog nama="Bimo" anak="Atapnya lancip. Sisinya ada 1, 2, 3!" />
        <KuisAkhirAdegan idSuara={idKuis("A", 1)} idKanvas={idKuis("A", 2)} pertanyaanSuara="Atap rumah Nenek bentuknya apa?" aliasSuara={["segitiga"]} petunjukSuara="Sebutkan nama bentuknya." pertanyaanKanvas="Atap itu punya berapa sisi? Tuliskan angkanya." aliasKanvas={["3", "tiga"]} konteksKanvas="Atap segitiga punya 3 sisi." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Bentuk di rumah Nenek" kepala={["Benda", "Ciri", "Nama"]} baris={[["Jam", "bulat, tanpa sudut", "lingkaran"], ["Bingkai foto", "4 sisi sama", "persegi"], ["Pintu", "4 sisi, ada yang panjang", "persegi panjang"]]} kaki="Persegi dan persegi panjang sama-sama segi empat." />
        <KuisAkhirAdegan idSuara={idKuis("A", 3)} idKanvas={idKuis("A", 4)} pertanyaanSuara="Bingkai foto sisinya sama semua. Bentuknya apa?" aliasSuara={["persegi"]} petunjukSuara="Sebutkan nama bentuknya." pertanyaanKanvas="Pintu punya berapa sisi? Tuliskan angkanya." aliasKanvas={["4", "empat"]} konteksKanvas="Pintu persegi panjang punya 4 sisi." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab4-adegan-3.jpg" alt="Dadu berbentuk kubus dan kotak susu berbentuk balok." />
        <p className="text-center text-4xl">🎲 🧃 ⏰</p>
        <KuisAkhirAdegan idSuara={idKuis("A", 5)} idKanvas={idKuis("A", 6)} pertanyaanSuara="Dadu bentuknya apa?" aliasSuara={["kubus"]} petunjukSuara="Sebutkan nama bentuknya." pertanyaanKanvas="Kotak susu bentuknya apa? Tuliskan namanya." aliasKanvas={["balok"]} konteksKanvas="Kotak susu berbentuk balok." />
        <SoalRekamSuara id={idKuis("A", 0)} pertanyaan="Rara melihat jam dinding di rumah Nenek. Jam itu bentuknya apa? Ayo sebutkan!" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["lingkaran", "bulat"])} petunjuk="Sebutkan nama bentuknya." sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")} />
        {suara === "benar" ? <p className="text-sm font-bold text-emerald-800">Jamnya tersenyum.</p> : null}
        {suara === "salah" ? <p className="text-sm font-bold text-rose-800">Bentuknya bulat dan tidak punya sudut.</p> : null}
        <SusunTiga id={idKuis("A", 7)} perintah="Susun dari sisi yang paling sedikit." acak={["Segi empat", "Lingkaran", "Segitiga"]} benar={["Lingkaran", "Segitiga", "Segi empat"]} umpan="Lingkaran tanpa sudut, segitiga 3, segi empat 4." />
        <BenarSalahTiga id={idKuis("A", 8)} perintah="Pilih benar atau salah." baris={[{ teks: "Dadu tebal. Bentuknya kubus.", benar: true }, { teks: "Jam dinding punya sudut lancip.", benar: false }, { teks: "Pintu punya 4 sisi.", benar: true }]} umpan="Jam itu lingkaran." />
        <SusunTiga id={idKuis("A", 9)} perintah="Susun benda dari yang pipih." acak={["Dadu", "Jam", "Kotak susu"]} benar={["Jam", "Dadu", "Kotak susu"]} umpan="Jam pipih. Dadu dan kotak susu tebal." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">3 · 4 · 0</p>
      <KuisTulisKartu id={idKuisTulisKartu(ID, "A")} pertanyaan="Gambarlah atap rumah Nenek, lalu tulis nama bentuknya. Bentuk itu punya 3 sisi." alias={["segitiga", "3 sisi", "tiga sisi"]} konteks="Atap rumah berbentuk segitiga dengan 3 sisi yang bertemu." visual={<p className="text-center text-4xl">🏠</p>} />
      <Pilih id={idKuis("A", 10)} pertanyaan="Segitiga punya sudut..." pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "0" }]} benar="A" umpan="Tiga sisi, tiga sudut." salah="Hitung ujung lancipnya." />
      <Pilih id={idKuis("A", 11)} pertanyaan="Bentuk jam dinding adalah..." pilihan={[{ huruf: "A", teks: "kubus" }, { huruf: "B", teks: "lingkaran" }, { huruf: "C", teks: "balok" }]} benar="B" umpan="Bulat dan tanpa sudut." salah="Jam itu pipih dan bulat." />
      <Pilih id={idKuis("A", 12)} pertanyaan="Kotak susu yang panjang adalah..." pilihan={[{ huruf: "A", teks: "balok" }, { huruf: "B", teks: "lingkaran" }, { huruf: "C", teks: "segitiga" }]} benar="A" umpan="Balok tebal dan ada sisi yang panjang." salah="Bukan bentuk pipih." />
    </div>
  );
}

function IsiKelompok({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const bentuk = ["Segitiga", "Lingkaran", "Kubus", "Balok"];
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab B: Mengelompokkan Benda" kelas={kelas} kelamin={kelamin} naskah={["Benda dikelompokkan menurut bentuknya.", "Pipih namanya bentuk datar. Tebal namanya bangun ruang."]} />
        <Dialog nama="Igil" anak="Ayo kelompokkan benda di rumah Nenek." />
        <Dialog nama="Rara" anak="Yang pipih seperti kertas aku taruh di sini." />
        <Dialog nama="Bimo" anak="Yang tebal dan bisa dipegang aku taruh di sana." />
        <p className="text-center text-3xl">🔺🔺</p>
        <SoalRekamSuara id={idKuis("B", 3)} pertanyaan="Hitung dengan suaramu! Ada 2 segitiga. Berapa jumlah semua sisinya?" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam", "6"])} petunjuk="Ucapkan jumlah sisinya." />
        <KuisAkhirAdegan idSuara={idKuis("A", 13)} idKanvas={idKuis("A", 14)} pertanyaanSuara="Benda yang pipih disebut apa?" aliasSuara={["bentuk datar", "datar"]} petunjukSuara="Sebutkan namanya." pertanyaanKanvas="Tuliskan: bentuk datar." aliasKanvas={["bentuk datar", "datar"]} konteksKanvas="Benda pipih disebut bentuk datar." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Dua keluarga bentuk" kepala={["Keluarga", "Ciri", "Contoh"]} baris={[["Bentuk datar", "pipih", "segitiga, segi empat, lingkaran"], ["Bangun ruang", "tebal", "kubus dan balok"], ["Cara hitung", "sentuh satu per satu", "segitiga 3, segi empat 4"]]} kaki="Kubus dan balok punya 6 sisi." />
        <KuisAkhirAdegan idSuara={idKuis("A", 15)} idKanvas={idKuis("A", 16)} pertanyaanSuara="Lingkaran punya berapa sudut?" aliasSuara={["0", "nol", "tidak ada"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka 0." aliasKanvas={["0", "nol"]} konteksKanvas="Lingkaran tidak punya sudut." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-3xl">🍕 🪙 🎲 🧃</p>
        <KuisCocok id={idKuis("B", 0)} perintah="Tarik garis dari benda ke bentuknya!" baris={[{ kiri: "🍕 Potongan pizza", pilihan: bentuk, benar: "Segitiga" }, { kiri: "🪙 Koin", pilihan: bentuk, benar: "Lingkaran" }, { kiri: "🎲 Dadu", pilihan: bentuk, benar: "Kubus" }, { kiri: "🧃 Kotak susu", pilihan: bentuk, benar: "Balok" }]} umpan="Pizza segitiga, koin lingkaran, dadu kubus, kotak susu balok." />
        <SusunTiga id={idKuis("A", 17)} perintah="Susun dari yang pipih ke yang tebal." acak={["Dadu", "Koin", "Kotak susu"]} benar={["Koin", "Dadu", "Kotak susu"]} umpan="Koin pipih. Dadu dan kotak susu tebal." />
        <BenarSalahTiga id={idKuis("A", 18)} perintah="Pilih benar atau salah." baris={[{ teks: "Koin termasuk lingkaran.", benar: true }, { teks: "Dadu termasuk bentuk datar.", benar: false }, { teks: "Balok bisa dipegang.", benar: true }]} umpan="Dadu itu kubus, bangun ruang." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">3 · 4 · 6</p>
      <Pilih id={idKuis("B", 1)} pertanyaan="Bentuk apa yang berikutnya?" visual={<p>🔺 ⚪ 🟦 🔺 ⚪ 🟦 🔺 ⚪ ❓</p>} pilihan={[{ huruf: "A", teks: "🔺 Segitiga" }, { huruf: "B", teks: "⚪ Lingkaran" }, { huruf: "C", teks: "🟦 Persegi" }]} benar="C" umpan="Polanya berulang: segitiga, lingkaran, persegi." salah="Lihat tiga bentuk pertama, lalu ulangi." />
      <Pilih id={idKuis("B", 2)} pertanyaan="Mana yang bukan bangun ruang?" pilihan={[{ huruf: "A", teks: "🎲 Dadu" }, { huruf: "B", teks: "📦 Kardus" }, { huruf: "C", teks: "🖼️ Bingkai foto" }, { huruf: "D", teks: "🧊 Es batu kotak" }]} benar="C" umpan="Bingkai foto pipih. Bentuknya persegi, bukan bangun ruang." salah="Bangun ruang tebal dan bisa dipegang." />
      <Pilih id={idKuis("A", 19)} pertanyaan="Kubus punya sisi..." pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "6" }]} benar="C" umpan="Dadu punya 6 sisi persegi." salah="Hitung semua muka dadu." />
    </div>
  );
}

function IsiSusun({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab C: Menyusun dan Mengurai Bentuk Bangun" kelas={kelas} kelamin={kelamin} naskah={["Dua bangun bisa digabung menjadi bentuk baru.", "Dua segitiga yang sama besar bisa menjadi segi empat."]} />
        <Dialog nama="Rara" anak="Nek, dua segitiga ini bisa digabung?" />
        <Dialog nama="Igil" anak="Bisa. Kalau ukurannya sama, jadinya segi empat." />
        <Dialog nama="Bimo" anak="Aku susun kepala, badan, dan topi." />
        <p className="text-center text-3xl">🔺 🔻</p>
        <KuisAkhirAdegan idSuara={idKuis("A", 20)} idKanvas={idKuis("A", 21)} pertanyaanSuara="Dua segitiga yang sama digabung menjadi apa?" aliasSuara={["segi empat", "persegi", "persegi panjang"]} petunjukSuara="Sebutkan nama bentuknya." pertanyaanKanvas="Tuliskan: segi empat." aliasKanvas={["segi empat", "persegi"]} konteksKanvas="Dua segitiga yang sama bisa menjadi segi empat." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Susun dan urai" kepala={["Bangun", "Digabung", "Hasil"]} baris={[["2 segitiga", "rapatkan", "segi empat"], ["1 segitiga + 1 persegi", "sisi 3 dan 4", "dihitung bersama"], ["Robot", "beberapa bentuk", "kepala, badan, topi"]]} kaki="Gabungkan pelan-pelan. Lalu hitung." />
        <KuisAkhirAdegan idSuara={idKuis("A", 22)} idKanvas={idKuis("A", 23)} pertanyaanSuara="Sisi segitiga ada 3. Sisi persegi ada 4. Semuanya berapa?" aliasSuara={["7", "tujuh"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 3 + 4 = 7." aliasKanvas={["3 + 4 = 7", "3+4=7"]} konteksKanvas="Tiga tambah empat sama dengan tujuh." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-3xl">🟦 + 🔺</p>
        <KuisTulisKartu id={idKuisTulisKartu(ID, "B")} pertanyaan="Tuliskan angka jumlah sudut pada gambar ini." alias={["7", "tujuh", "4 + 3 = 7", "4+3=7"]} visual={<p className="text-center text-3xl">🟦 + 🔺</p>} konteks="Persegi punya 4 sudut dan segitiga punya 3 sudut. Jumlahnya 7." />
        <SusunTiga id={idKuis("A", 24)} perintah="Susun robot dari atas ke bawah." acak={["Badan", "Topi", "Kepala"]} benar={["Topi", "Kepala", "Badan"]} umpan="Topi, kepala, lalu badan." />
        <BenarSalahTiga id={idKuis("A", 25)} perintah="Pilih benar atau salah." baris={[{ teks: "Dua segitiga bisa digabung.", benar: true }, { teks: "Sudut persegi ada 3.", benar: false }, { teks: "Topi robot pada cerita ini segitiga.", benar: true }]} umpan="Persegi punya 4 sudut." />
        <SusunTiga id={idKuis("A", 26)} perintah="Susun dari sudut yang paling sedikit." acak={["Persegi", "Lingkaran", "Segitiga"]} benar={["Lingkaran", "Segitiga", "Persegi"]} umpan="0, lalu 3, lalu 4." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">4 + 3</p>
      <Pilih id={idKuis("A", 27)} pertanyaan="4 + 3 = ..." pilihan={[{ huruf: "A", teks: "7" }, { huruf: "B", teks: "8" }, { huruf: "C", teks: "43" }]} benar="A" umpan="Empat sudut dan tiga sudut." salah="Jumlahkan, jangan disambung." />
      <Pilih id={idKuis("A", 28)} pertanyaan="2 persegi. Jumlah sudutnya..." pilihan={[{ huruf: "A", teks: "4" }, { huruf: "B", teks: "6" }, { huruf: "C", teks: "8" }]} benar="C" umpan="4 + 4 = 8." salah="Setiap persegi punya 4 sudut." />
      <Pilih id={idKuis("A", 29)} pertanyaan="Di meja: 2 dadu, 1 kardus, 1 bola, 1 kotak susu. Kubusnya ada..." pilihan={[{ huruf: "A", teks: "1" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "5" }]} benar="B" umpan="Kedua dadu berbentuk kubus." salah="Kardus dan kotak susu adalah balok." />
    </div>
  );
}


function KotaBentuk({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB4.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🏠🔺🏆"
        judul={kartu.judul}
        anak="Sepuluh ruang rumah Nenek · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB4}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB4}
        penutup="Rumah Igil sudah terpetakan. Rara jadi detektif bentuk."
        bunga="🔺🟦⚪🔍"
      />
    </KartuBingkai>
  );
}

function PolaDuaKotak() {
  const kuis = useKuisMateri();
  const [kotak, setKotak] = useState(["", ""]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const pilihan = ["🔺", "⚪", "🟦"];
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">4. Pola bertingkat</p>
      <p className="mt-2 text-2xl">🔺 🔺 ⚪ 🔺 🔺 ⚪ 🔺 {kotak[0] || "❓"} {kotak[1] || "❓"}</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Ketuk bentuk untuk kotak pertama, lalu kotak kedua.</p>
      <div className="mt-3 flex gap-2">
        {pilihan.map((bentuk) => (
          <button
            key={bentuk}
            type="button"
            onClick={() => {
              setStatus(null);
              setKotak((lama) => (!lama[0] || lama[1] ? [bentuk, ""] : [lama[0], bentuk]));
            }}
            className="rounded-xl bg-white px-3 py-2 text-2xl ring-2 ring-[#1C01A5]/20"
          >
            {bentuk}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          const tepat = kotak[0] === "🔺" && kotak[1] === "⚪";
          setStatus(tepat ? "benar" : "salah");
          if (tepat) kuis?.tandaiBenar(idKuis("D", 3));
        }}
        className="mt-3 rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
      >
        Periksa pola
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Ulangi kelompok dua segitiga lalu satu lingkaran." />
        <Umpan status={status} teks="Dua kotak terakhir: segitiga, lalu lingkaran." />
      </div>
    </article>
  );
}

function BandingBangun() {
  const kuis = useKuisMateri();
  const [sama, setSama] = useState("");
  const [beda, setBeda] = useState("");
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = (nilaiSama: string, nilaiBeda: string) => {
    const tepat = nilaiSama === "A" && nilaiBeda === "A";
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(idKuis("D", 7));
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">8. Dadu dan kotak susu</p>
      <p className="mt-2 text-2xl">🎲 🧃</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Apa yang sama?</p>
      <div className="mt-2 grid gap-2">
        {[
          ["A", "Keduanya punya 6 sisi dan bisa dipegang"],
          ["B", "Keduanya pipih seperti kertas"],
          ["C", "Keduanya lingkaran"],
        ].map(([huruf, teks]) => (
          <button
            key={huruf}
            type="button"
            onClick={() => {
              setSama(huruf);
              if (beda) periksa(huruf, beda);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              sama,
              huruf,
              "A",
              "bg-[#1C01A5] text-white",
            )}`}
          >
            {huruf}. {teks}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700">Apa yang berbeda?</p>
      <div className="mt-2 grid gap-2">
        {[
          ["A", "Dadu kubus, semua sisi sama. Kotak susu balok, lebih panjang"],
          ["B", "Keduanya sama persis"],
          ["C", "Dadu berbentuk lingkaran"],
        ].map(([huruf, teks]) => (
          <button
            key={huruf}
            type="button"
            onClick={() => {
              setBeda(huruf);
              if (sama) periksa(sama, huruf);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              beda,
              huruf,
              "A",
              "bg-[#1C01A5] text-white",
            )}`}
          >
            {huruf}. {teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Keduanya tebal. Bedanya ada pada panjang sisinya." />
        <Umpan status={status} teks="Sama-sama 6 sisi. Dadu kubus, kotak susu balok." />
      </div>
    </article>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const nama = useMemo(() => bacaProgres().profil.nama.trim(), []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana =
    skor >= 9
      ? "Master Bentuk"
      : skor >= 7
        ? "Detektif Hebat"
        : skor >= 5
          ? "Penjelajah Bentuk"
          : "Ayo Coba Lagi";
  const kartu = MODUL_MTK1_BAB4.kartu[3];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝⭐"
        judul={kartu.judul}
        anak="Tantangan Para Juara · Mengenal Bentuk"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-white p-4 sm:grid-cols-3">
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Nama
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">{nama || "Siswa"}</span>
        </p>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Kelas
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">1</span>
        </p>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Skor
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">⭐ {skor} / 10</span>
        </p>
      </div>
      <p className="mt-3 rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">{lencana}</p>
      <div className="mt-4 grid gap-3">
        <SoalRekamSuara
          id={idKuis("D", 0)}
          pertanyaan="1. Rara punya pizza, koin, dan pintu. Benda mana yang tidak punya sudut? Mengapa?"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["koin"],
              ["lingkaran", "bulat", "tidak punya sudut", "tanpa sudut"],
            ])
          }
          petunjuk="Sebutkan bendanya dan alasan bentuknya."
        />
        <KuisTulisKartu
          id={idKuis("D", 1)}
          pertanyaan="2. Ada 2 segitiga dan 1 persegi. Berapa jumlah semua sisinya? Tulis angkanya!"
          alias={["10", "sepuluh", "3 + 3 + 4 = 10", "3+3+4=10"]}
          visual={<p className="text-center text-3xl">🔺🔺 🟦</p>}
          konteks="Tiga tambah tiga tambah empat sama dengan sepuluh."
        />
        <Pilih
          id={idKuis("D", 2)}
          pertanyaan='3. Bimo berkata, "Dadu itu bentuknya persegi!" Apakah Bimo benar?'
          visual={<p>🎲</p>}
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah" },
          ]}
          benar="B"
          umpan="Dadu itu kubus. Persegi adalah bentuk datar."
          salah="Dadu tebal dan bisa dipegang."
        />
        <PolaDuaKotak />
        <TulisBebas
          id={idKuis("D", 4)}
          judul="5. Menggambar kreatif"
          pertanyaan="Gambarlah benda di kelasmu yang berbentuk segi empat, lalu tulis nama bendanya."
          pesanSalah="Tulis nama bendanya di papan, misalnya buku, jendela, pintu, atau papan tulis."
          umpan="Benda itu punya 4 sisi."
          periksa={(teks) =>
            jawabanTulisMemuatAlias(teks, [
              "buku",
              "papan tulis",
              "papan",
              "jendela",
              "pintu",
              "meja",
              "bangku",
              "ubin",
              "kertas",
              "layar",
              "lemari",
              "bingkai",
              "foto",
              "segi empat",
              "persegi panjang",
              "persegi",
            ])
          }
        />
        <Pilih
          id={idKuis("D", 5)}
          pertanyaan="6. Robot punya kepala persegi, dua mata lingkaran, badan persegi panjang, dua kaki persegi panjang, dan topi segitiga. Ada berapa segi empat?"
          visual={<p>Kepala 🟦 · badan ▭ · kaki ▭▭ · topi 🔺</p>}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "5" },
          ]}
          benar="C"
          umpan="Kepala 1, badan 1, kaki 2. Jumlahnya 4 segi empat."
          salah="Mata lingkaran dan topi segitiga tidak dihitung."
        />
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="7. Di lantai miring ada bola dan kardus. Bimo ingin benda yang tidak menggelinding. Pilih bola atau kardus? Kenapa?"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["kardus", "balok", "kotak"],
              ["tidak menggelinding", "tidak berguling", "sisi datar", "datar"],
            ])
          }
          petunjuk="Sebutkan bendanya dan alasannya."
        />
        <BandingBangun />
        <Pilih
          id={idKuis("D", 8)}
          pertanyaan="9. Kamu punya 2 segitiga yang sama besar. Kalau digabung, bisa jadi bentuk apa?"
          visual={<p>🔺 🔻</p>}
          pilihan={[
            { huruf: "A", teks: "Lingkaran" },
            { huruf: "B", teks: "Segi empat" },
            { huruf: "C", teks: "Segitiga saja" },
          ]}
          benar="B"
          umpan="Dua segitiga bisa menjadi segi empat."
          salah="Gabungkan kedua segitiga pada salah satu sisinya."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Mainan memakai segitiga, segi empat, dan lingkaran. Ada berapa jenis bentuk?"
          visual={<p>🔺 🟦 ⚪</p>}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
          ]}
          benar="B"
          umpan="Tiga keluarga bentuk: segitiga, segi empat, dan lingkaran."
          salah="Hitung jenis bentuk yang dipakai, bukan banyak potongannya."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Segitiga, tiga sisi, tiga sudut."
          alias={["segitiga tiga sisi tiga sudut", "segitiga, tiga sisi, tiga sudut"]}
        />
      </div>
      <p className="mt-4 text-sm font-bold text-emerald-800">
        Hore! Kamu sudah jadi detektif bentuk. Coba cari bentuk lain di rumahmu, ya!
      </p>
    </KartuBingkai>
  );
}

function langkahBab4(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const kartuA = MODUL_MTK1_BAB4.kartu[0];
  const kuisMisi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("C", indeks)), idKuisTulisKartu(ID, "C")];
  const kuisEvaluasi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("D", indeks)), idKuisTulisKartu(ID, "D")];
  const butir = ["Mendeskripsikan benda di sekitar berdasarkan bentuknya.", "Mengelompokkan benda: segitiga, segi empat, bentuk lengkung, kubus, dan balok.", "Menyusun dan mengurai bentuk bangun."];
  const poin = ["Segitiga, tiga sisi, tiga sudut.", "Segi empat, empat sisi, empat sudut.", "Lingkaran bulat, tanpa sudut, bisa menggelinding.", "Kubus seperti dadu, semua sisinya sama.", "Balok seperti kotak susu, lebih panjang.", "Sentuh setiap sisi sambil berhitung. Pipih berarti bentuk datar. Tebal berarti bangun ruang.", "Dua segitiga yang sama besar bisa digabung menjadi segi empat."];
  const halaman = (Isi: (props: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) => ReactNode, kuis: string[][]) =>
    [0, 1, 2, 3].map((n) => ({ isi: <Isi halaman={n} kelas={kelas} kelamin={kelamin} />, kuis: kuis[n] }));
  return [
    ...empatHalaman({ tab: "Sub-Bab A", kelompok: "Mendeskripsikan bentuk" }, "bentuk", halaman(IsiBentuk, [
      [idKuis("A", 1), idKuis("A", 2)],
      [idKuis("A", 3), idKuis("A", 4)],
      [idKuis("A", 5), idKuis("A", 6), idKuis("A", 0), idKuis("A", 7), idKuis("A", 8), idKuis("A", 9)],
      [idKuisTulisKartu(ID, "A"), idKuis("A", 10), idKuis("A", 11), idKuis("A", 12)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab B", kelompok: "Mengelompokkan benda" }, "kelompok", halaman(IsiKelompok, [
      [idKuis("B", 3), idKuis("A", 13), idKuis("A", 14)],
      [idKuis("A", 15), idKuis("A", 16)],
      [idKuis("B", 0), idKuis("A", 17), idKuis("A", 18)],
      [idKuis("B", 1), idKuis("B", 2), idKuis("A", 19)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab C", kelompok: "Menyusun bentuk" }, "susun", halaman(IsiSusun, [
      [idKuis("A", 20), idKuis("A", 21)],
      [idKuis("A", 22), idKuis("A", 23)],
      [idKuisTulisKartu(ID, "B"), idKuis("A", 24), idKuis("A", 25), idKuis("A", 26)],
      [idKuis("A", 27), idKuis("A", 28), idKuis("A", 29)],
    ])),
    { kode: "misi", bagian: "Misi", judul: "Misi detektif bentuk", kuis: kuisMisi, isi: <KotaBentuk kelas={kelas} kelamin={kelamin} /> },
    {
      kode: "review",
      bagian: "Review",
      judul: "Tujuan Pembelajaran",
      tab: "Review",
      kelompok: "Tujuan Pembelajaran",
      bebas: true,
      isi: (
        <div className="space-y-4">
          <KepalaKartu ikon="🏠🔺🔍" judul={kartuA.judul} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
          <TujuanBelajar butir={butir} />
          <KartuPoinPenting kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB4.kartu[3].voice, 2_000, 3_000)} poin={poin} penutup="Dadu itu kubus, kotak susu balok. Ayo cari bentuk di sekitar." />
          <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>
        </div>
      ),
    },
    { kode: "evaluasi", bagian: "Evaluasi", judul: "Lembar evaluasi", isi: <LembarEvaluasi kelas={kelas} kelamin={kelamin} />, kuis: kuisEvaluasi },
  ];
}

export default function NaskahMtk1Bab4({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahBab4(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-1-bab4-v1"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "review" }}
      teksAkhir="Detektif bentuk selesai. Bab ini selesai."
    />
  );
}
