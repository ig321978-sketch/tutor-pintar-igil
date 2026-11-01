"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB3 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB3 } from "@/lib/tema-misi-mtk-1";

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
import { MODUL_MTK1_BAB3 } from "@/lib/modul-resmi-mtk-1-bab3";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB3.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function duaCaraEmpat(teks: string): boolean {
  const padat = teks.toLowerCase().replace(/\s+/g, "");
  const unik = new Set(
    [...padat.matchAll(/(\d+)-(\d+)=4/g)]
      .map((temuan) => {
        const kiri = Number(temuan[1]);
        const kanan = Number(temuan[2]);
        if (kiri - kanan !== 4 || kiri > 10 || kanan > 10 || kanan < 0) return "";
        return `${kiri}-${kanan}`;
      })
      .filter(Boolean),
  );
  return unik.size >= 2;
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
      <NamaDialog nama={nama} igil="tikus" />
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
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk gambar, lalu ketuk kalimatnya.</p>
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Coba hitung sisa tiap gambar." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function SusunBalok({
  id,
  judul,
  pool,
  jawaban,
  umpan,
}: {
  id: string;
  judul: string;
  pool: string[];
  jawaban: string[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((balok) => !susun.includes(balok));
  const periksa = () => {
    const tepat = jawaban.includes(susun.join(""));
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
      <p className="text-sm font-black text-sky-950">{judul}</p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-2xl bg-white p-3">
        {susun.map((balok, indeks) => (
          <button
            key={`${balok}-${indeks}`}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => lama.filter((_, urut) => urut !== indeks));
            }}
            className="rounded-xl bg-[#1C01A5] px-3 py-2 text-lg font-black text-white"
          >
            {balok}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((balok) => (
          <button
            key={balok}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, balok]);
            }}
            className="rounded-xl bg-white px-3 py-2 text-lg font-black text-[#1C01A5] ring-2 ring-sky-200"
          >
            {balok}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white"
      >
        Periksa susunan
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Coba mulai dari angka yang lebih besar." />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function DuaCaraEmpat() {
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
            pertanyaan: "Tulis 2 cara berbeda pengurangan yang hasilnya 4.",
            konteks: "Benar hanya jika ada dua pengurangan berbeda yang hasilnya 4, misalnya 5 - 1 = 4 dan 6 - 2 = 4.",
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
        const ok = json.benar === true || (bacaan.length > 0 && duaCaraEmpat(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(idKuis("D", 4));
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    setCuplikan(data.trim());
    const ok = duaCaraEmpat(data);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(idKuis("D", 4));
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      <p className="text-center text-2xl font-black text-[#1C01A5]">□ - □ = 4 &nbsp; □ - □ = 4</p>
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        5. Tulis 2 cara berbeda pengurangan yang hasilnya 4.
      </p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis
        status={status}
        cuplikan={cuplikan || undefined}
        pesanSalah="Tulis dua kalimat yang berbeda, misalnya 5 - 1 = 4 dan 6 - 2 = 4."
      />
      <Umpan status={status} teks="Dua jalan yang berbeda, hasilnya sama-sama 4." />
    </div>
  );
}

function HookPesta() {
  return (
    <article className="rounded-2xl border-2 border-[#16A34A]/25 bg-[#F0FDF4] px-4 py-3">
      <GambarCerita
        src="/doodle-mtk/mtk-1-bab3-pesta.jpg"
        alt="Pesta malam di rumah Rara. Ada 8 balon, kue, dan Igil si tikus berkacamata."
      />
      <div className="mt-2 text-center">
        <IkonUlang ikon="🎈" jumlah={8} ukuran="text-3xl" />
      </div>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
        Malam ini pesta di rumah Rara. Mejanya penuh kue, dindingnya penuh balon. Rara menghitung, &quot;Satu, dua, tiga, empat, lima, enam, tujuh… delapan!&quot;
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
        Jendela terbuka. Angin masuk. Satu, dua, tiga balon lepas dan terbang ke langit malam.
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
        Bimo terbelalak. &quot;Niaaa! Balonnya!&quot; Rara bertanya, &quot;Bagaimana caranya aku tahu sekarang tinggal berapa?&quot;
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
        Dari balik kue muncul suara kecil, &quot;Cik-cik-cik!&quot; Igil si tikus berkacamata mengangkat satu jari. &quot;Ada rahasia, tapi kalian harus belajar mengurangi.&quot;
      </p>
    </article>
  );
}

function IsiCerita({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const [kedip, setKedip] = useState(0);
  const [suaraA, setSuaraA] = useState<StatusJawabanKuis>(null);
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab A: Cerita Pengurangan" kelas={kelas} kelamin={kelamin} naskah={["Malam pesta di rumah Rara.", "Balon di dinding. Ayo hitung."]} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab3-delapan.jpg" alt="Balon berjajar di dinding pesta." />
        <Dialog nama="Rara" anak="Wah, balonnya banyak sekali!" />
        <Dialog nama="Bimo" anak="Ayo hitung satu per satu!" />
        <Dialog nama="Igil" anak="Hoo! Balon ini siap untuk pesta!" />
        <p className="text-center"><IkonUlang ikon="🎈" jumlah={8} ukuran="text-3xl" /></p>
        <KuisAkhirAdegan idSuara={idKuis("A", 1)} idKanvas={idKuis("A", 2)} pertanyaanSuara="Berapa balon yang siap untuk pesta?" aliasSuara={["8", "delapan"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan angka banyak balon itu." aliasKanvas={["8", "delapan"]} konteksKanvas="Ada 8 balon. Lambangnya 8." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Tanda kurang" kepala={["Tanda", "Arti", "Akibat"]} baris={[["−", "diambil", "jadi lebih sedikit"], ["−", "dipisahkan", "ada yang pergi"], ["=", "hasil", "yang masih tinggal"]]} kaki="Tanda kurang artinya diambil atau dipisahkan." />
        <KuisAkhirAdegan idSuara={idKuis("A", 5)} idKanvas={idKuis("A", 6)} pertanyaanSuara="Tanda kurang artinya apa?" aliasSuara={["diambil", "dipisahkan"]} petunjukSuara="Ucapkan: diambil." pertanyaanKanvas="Tuliskan tanda kurang." aliasKanvas={["-", "kurang"]} konteksKanvas="Tanda kurang artinya diambil atau dipisahkan." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <GambarCerita src="/doodle-mtk/mtk-1-bab3-sisa.jpg" alt="Beberapa balon masih terikat. Beberapa balon terbang." />
        <p className="text-center text-sm font-semibold text-slate-700">Dulu ada 8 balon. Yang lepas 3.</p>
        <KuisAkhirAdegan idSuara={idKuis("A", 3)} idKanvas={idKuis("A", 4)} pertanyaanSuara="Dulu ada 8 balon. Yang lepas 3. Sisa berapa?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan sisanya." pertanyaanKanvas="Tuliskan 8 - 3 = 5." aliasKanvas={["8 - 3 = 5", "8-3=5"]} konteksKanvas="Delapan kurang tiga sama dengan lima." />
        <p className="text-center text-2xl">🍪🍪🍪🍪🍪🍪</p>
        <KuisAkhirAdegan idSuara={idKuis("A", 7)} idKanvas={idKuis("A", 8)} pertanyaanSuara="Kue ada 6. Bimo makan 2. Sisa berapa?" aliasSuara={["4", "empat"]} petunjukSuara="Ucapkan sisanya." pertanyaanKanvas="Tuliskan 6 - 2 = 4." aliasKanvas={["6 - 2 = 4", "6-2=4"]} konteksKanvas="Enam kue dikurangi dua sama dengan empat." />
        <SusunTiga id={idKuis("A", 11)} perintah="Susun langkah mengurangi." acak={["Hitung sisa", "Lihat yang pergi", "Hitung semuanya"]} benar={["Hitung semuanya", "Lihat yang pergi", "Hitung sisa"]} umpan="Semuanya, yang pergi, lalu sisa." />
        <BenarSalahTiga id={idKuis("A", 12)} perintah="Pilih benar atau salah." baris={[{ teks: "Balon yang terbang membuat jumlah berkurang.", benar: true }, { teks: "Tanda kurang artinya ditambahkan.", benar: false }, { teks: "Sisa adalah yang masih ada.", benar: true }]} umpan="Kurang berarti diambil." />
        <SusunTiga id={idKuis("A", 13)} perintah="Susun hitung mundur dari 6." acak={["4", "5", "3"]} benar={["5", "4", "3"]} umpan="5, 4, lalu 3." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">9 − 4</p>
      <KuisAkhirAdegan idSuara={idKuis("A", 9)} idKanvas={idKuis("A", 10)} pertanyaanSuara="Ada 9 topi. Tamu mengambil 4. Sisa berapa?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan sisanya." pertanyaanKanvas="Tuliskan 9 - 4 = 5." aliasKanvas={["9 - 4 = 5", "9-4=5"]} konteksKanvas="Sembilan topi dikurangi empat sama dengan lima." />
      <p className="text-center"><IkonUlang ikon="🎈" jumlah={6} ukuran="text-3xl" /></p>
      <SoalRekamSuara id={idKuis("A", 0)} pertanyaan="Ada 6 balon. Dua balon terbang. Sisa berapa? Ucapkan dengan keras!" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["empat", "4"])} petunjuk="Ucapkan dengan keras." sesudahNilai={(benar) => setSuaraA(benar ? "benar" : "salah")} />
      {suaraA === "benar" ? <p className="text-sm font-bold text-emerald-800">Hoo! Kamu teliti sekali!</p> : null}
      {suaraA === "salah" ? <p className="text-sm font-bold text-rose-800">Ayo hitung mundur dari angka enam.</p> : null}
      <KuisTulisKartu id={idKuisTulisKartu(ID, "A")} pertanyaan="Tulis jumlah kue yang masih tersisa di kotak!" alias={["4", "empat"]} visual={<p className={`text-3xl ${kedip >= 2 ? "animate-pulse" : ""}`}>🍪🍪🍪🍪<span className="opacity-40 line-through">🍪🍪🍪</span></p>} sesudahNilai={(benar) => { if (!benar) setKedip((n) => n + 1); }} />
      <Pilih id={idKuis("A", 14)} pertanyaan="8 − 3 = ..." pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "11" }, { huruf: "C", teks: "3" }]} benar="A" umpan="Mundur tiga kali dari 8." salah="Kurangi, jangan tambah." />
      <Pilih id={idKuis("A", 15)} pertanyaan="6 − 2 = ..." pilihan={[{ huruf: "A", teks: "8" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "2" }]} benar="B" umpan="Sisa empat kue." salah="Hitung yang masih ada." />
      <Pilih id={idKuis("A", 16)} pertanyaan="Tanda yang artinya diambil adalah..." pilihan={[{ huruf: "A", teks: "+" }, { huruf: "B", teks: "−" }, { huruf: "C", teks: ">" }]} benar="B" umpan="Satu garis itu tanda kurang." salah="Bukan tanda tambah." />
    </div>
  );
}

function IsiCara({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  const kalimat = ["6 - 2 = 4", "4 - 1 = 3", "9 - 5 = 4"];
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab B: Berbagai Cara Melakukan Pengurangan" kelas={kelas} kelamin={kelamin} naskah={["Ada tiga cara.", "Pasangan bilangan, hitung mundur, dan mulai dari sepuluh."]} />
        <Dialog nama="Igil" anak="Mengurangi artinya mengambil sebagian." />
        <Dialog nama="Rara" anak="Aku bisa pakai jari." />
        <Dialog nama="Bimo" anak="Aku bisa hitung mundur." />
        <SoalRekamSuara id={idKuis("B", 3)} pertanyaan="Ada 10 permen. Kamu makan 4 permen. Sisa permenmu berapa? Ucapkan!" periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam", "6"])} petunjuk="Ucapkan sisa permennya." />
        <KuisAkhirAdegan idSuara={idKuis("A", 17)} idKanvas={idKuis("A", 18)} pertanyaanSuara="5 dikurangi 0. Hasilnya berapa?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 5 - 0 = 5." aliasKanvas={["5 - 0 = 5", "5-0=5"]} konteksKanvas="Kurang nol, angkanya tetap." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Tiga cara mengurangi" kepala={["Cara", "Langkah", "Contoh"]} baris={[["Pasangan", "coret yang diambil", "lihat yang tersisa"], ["Mundur", "ingat angka besar", "lompat sebanyak yang diambil"], ["Dari 10", "mulai di sepuluh", "kurang nol tetap sama"]]} kaki="Pilih cara yang paling mudah." />
        <KuisAkhirAdegan idSuara={idKuis("A", 19)} idKanvas={idKuis("A", 20)} pertanyaanSuara="Ingat 9, mundur 4 langkah. Berhenti di mana?" aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 9 - 4 = 5." aliasKanvas={["9 - 4 = 5", "9-4=5"]} konteksKanvas="Sembilan dikurangi empat sama dengan lima." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-2xl">🐠🐠🐠🐠🐠🐠 &nbsp; 🍬🍬🍬🍬 &nbsp; 🐦🐦🐦🐦🐦🐦🐦🐦🐦</p>
        <KuisCocok id={idKuis("B", 0)} perintah="Tarik garis dari gambar ke kalimat matematika yang benar!" baris={[{ kiri: "🐠🐠🐠🐠🐠🐠 - 🐠🐠", pilihan: kalimat, benar: "6 - 2 = 4" }, { kiri: "🍬🍬🍬🍬 - 🍬", pilihan: kalimat, benar: "4 - 1 = 3" }, { kiri: "🐦🐦🐦🐦🐦🐦🐦🐦🐦 - 🐦🐦🐦🐦🐦", pilihan: kalimat, benar: "9 - 5 = 4" }]} umpan="Ikan 6 kurang 2, permen 4 kurang 1, burung 9 kurang 5." />
        <SusunBalok id={idKuis("B", 1)} judul="Susun balok supaya jadi kalimat matematika yang benar!" pool={["2", "=", "-", "7", "5"]} jawaban={["7-5=2", "7-2=5"]} umpan="7 - 5 = 2 atau 7 - 2 = 5." />
        <BenarSalahTiga id={idKuis("A", 21)} perintah="Pilih benar atau salah." baris={[{ teks: "7 − 3 dan 7 − 4 adalah pasangan.", benar: true }, { teks: "Kurang nol membuat angka berubah.", benar: false }, { teks: "Hitung mundur dimulai dari angka yang besar.", benar: true }]} umpan="Kurang nol, angka tetap." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">10 − 4</p>
      <Pilih id={idKuis("B", 2)} pertanyaan="Semua kartu menyisakan angka yang sama, kecuali satu. Ketuk kartu yang berbeda!" pilihan={[{ huruf: "A", teks: "8 - 3" }, { huruf: "B", teks: "6 - 1" }, { huruf: "C", teks: "9 - 5" }, { huruf: "D", teks: "7 - 2" }]} benar="C" umpan="9 - 5 sisanya 4. Kartu lain sisanya 5." salah="Hitung sisa tiap kartu." />
      <Pilih id={idKuis("A", 22)} pertanyaan="10 − 4 = ..." pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "14" }, { huruf: "C", teks: "4" }]} benar="A" umpan="Mundur empat kali dari 10." salah="Kurangi, jangan tambah." />
      <Pilih id={idKuis("A", 23)} pertanyaan="8 jari, yang dilipat 3. Yang terbuka..." pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "3" }, { huruf: "C", teks: "8" }]} benar="A" umpan="8 − 3 = 5." salah="Hitung jari yang masih terbuka." />
    </div>
  );
}

function IsiSaudara({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab C: Hubungan Penjumlahan dan Pengurangan" kelas={kelas} kelamin={kelamin} naskah={["Tambah dan kurang itu saudara.", "Kalau tahu yang ditambahkan, bisa dikembalikan."]} />
        <Dialog nama="Rara" anak="Aku punya 5 balon, lalu dapat 3." />
        <Dialog nama="Bimo" anak="Jadi lebih banyak." />
        <Dialog nama="Igil" anak="Kalau 3 itu diambil lagi, kembali seperti semula." />
        <KuisAkhirAdegan idSuara={idKuis("B", 4)} idKanvas={idKuis("B", 5)} pertanyaanSuara="5 tambah 3. Hasilnya berapa?" aliasSuara={["8", "delapan"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 5 + 3 = 8." aliasKanvas={["5 + 3 = 8", "5+3=8"]} konteksKanvas="Lima ditambah tiga sama dengan delapan." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Saudara tambah dan kurang" kepala={["Kalimat", "Saudaranya", "Cek"]} baris={[["5 + 3 = 8", "8 − 3", "kembali ke 5"], ["6 + 2 = 8", "8 − 2", "kembali ke 6"], ["4 + 1 = 5", "5 − 1", "kembali ke 4"]]} kaki="Yang ditambahkan bisa diambil lagi." />
        <KuisAkhirAdegan idSuara={idKuis("B", 6)} idKanvas={idKuis("B", 7)} pertanyaanSuara="Kalau 5 + 3 = 8, maka 8 − 3 = ..." aliasSuara={["5", "lima"]} petunjukSuara="Ucapkan angkanya." pertanyaanKanvas="Tuliskan 8 - 3 = 5." aliasKanvas={["8 - 3 = 5", "8-3=5"]} konteksKanvas="Delapan dikurangi tiga kembali ke lima." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-3xl">🎈🎈🎈🎈🎈 + 🎈🎈🎈</p>
        <SusunTiga id={idKuis("B", 8)} perintah="Susun keluarga angka 5, 3, 8." acak={["8", "5", "3"]} benar={["5", "3", "8"]} umpan="5 + 3 = 8." />
        <BenarSalahTiga id={idKuis("B", 9)} perintah="Pilih benar atau salah." baris={[{ teks: "5 + 3 = 8.", benar: true }, { teks: "8 − 3 = 3.", benar: false }, { teks: "Tambah dan kurang bisa saling mengecek.", benar: true }]} umpan="8 − 3 = 5." />
        <SusunTiga id={idKuis("B", 10)} perintah="Susun dari yang paling kecil." acak={["8", "3", "5"]} benar={["3", "5", "8"]} umpan="3, 5, lalu 8." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">5 + 3 = 8</p>
      <Pilih id={idKuis("B", 11)} pertanyaan="6 + 2 = 8. Maka 8 − 2 = ..." pilihan={[{ huruf: "A", teks: "6" }, { huruf: "B", teks: "2" }, { huruf: "C", teks: "10" }]} benar="A" umpan="Yang ditambahkan dikembalikan." salah="Lihat angka yang tadi ditambahkan." />
      <Pilih id={idKuis("B", 12)} pertanyaan="4 + 1 = 5. Maka 5 − 1 = ..." pilihan={[{ huruf: "A", teks: "1" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "6" }]} benar="B" umpan="Kembali ke 4." salah="Ambil lagi satu." />
      <Pilih id={idKuis("B", 13)} pertanyaan="7 + 2 = 9. Maka 9 − 7 = ..." pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "7" }, { huruf: "C", teks: "16" }]} benar="A" umpan="Sisa yang tadi ditambahkan." salah="Bukan jumlah keduanya." />
    </div>
  );
}

function IsiSoal({ kelas, kelamin, halaman }: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) {
  if (halaman === 0) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={1} />
        <JudulSubBab judul="Sub-Bab D: Soal Cerita Pengurangan" kelas={kelas} kelamin={kelamin} naskah={["Cari angkanya.", "Cari kata yang artinya berkurang."]} />
        <Dialog nama="Rara" anak="Aku punya 7 balon." />
        <Dialog nama="Bimo" anak="Tiga balon terbang." />
        <Dialog nama="Igil" anak="Terbang artinya diambil angin. Ayo hitung sisa." />
        <KuisAkhirAdegan idSuara={idKuis("A", 24)} idKanvas={idKuis("A", 25)} pertanyaanSuara="Rara punya 7 balon. Tiga terbang. Sisa berapa?" aliasSuara={["4", "empat"]} petunjukSuara="Ucapkan sisanya." pertanyaanKanvas="Tuliskan 7 - 3 = 4." aliasKanvas={["7 - 3 = 4", "7-3=4"]} konteksKanvas="Tujuh dikurangi tiga sama dengan empat." />
      </div>
    );
  }
  if (halaman === 1) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={2} />
        <TabelInfoGrafis judul="Infografis: Kata kunci kurang" kepala={["Kata", "Arti", "Tanda"]} baris={[["terbang, hilang", "pergi", "−"], ["dimakan, diambil", "berkurang", "−"], ["tersisa, tinggal", "yang masih ada", "hasil"]]} kaki="Baca dulu. Lalu hitung mundur." />
        <KuisAkhirAdegan idSuara={idKuis("A", 26)} idKanvas={idKuis("A", 27)} pertanyaanSuara="Kata terbang pada soal balon artinya apa?" aliasSuara={["kurang", "diambil", "hilang"]} petunjukSuara="Ucapkan: kurang." pertanyaanKanvas="Tuliskan tanda kurang." aliasKanvas={["-", "kurang"]} konteksKanvas="Terbang artinya dikurangi." />
      </div>
    );
  }
  if (halaman === 2) {
    return (
      <div className="space-y-3">
        <JudulHalaman n={3} />
        <p className="text-center text-3xl">🎈🎈🎈🎈🎈🎈🎈</p>
        <SusunTiga id={idKuis("A", 28)} perintah="Susun cara membaca soal." acak={["Hitung", "Cari kata", "Cari angka"]} benar={["Cari angka", "Cari kata", "Hitung"]} umpan="Angka, kata kunci, lalu hitung." />
        <BenarSalahTiga id={idKuis("A", 29)} perintah="Pilih benar atau salah." baris={[{ teks: "Dimakan artinya dikurangi.", benar: true }, { teks: "Tersisa artinya yang sudah pergi.", benar: false }, { teks: "Diberikan artinya jumlah berkurang.", benar: true }]} umpan="Tersisa adalah yang masih ada." />
        <SusunTiga id={idKuis("A", 30)} perintah="Susun mundur dari 7." acak={["5", "6", "4"]} benar={["6", "5", "4"]} umpan="6, 5, lalu 4." />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <JudulHalaman n={4} />
      <p className="text-center text-2xl font-black text-[#1C01A5]">8 − 5</p>
      <KuisTulisKartu id={idKuisTulisKartu(ID, "B")} pertanyaan="Bimo punya 8 kue. Ia memberi 5 kue ke temannya. Tulis kalimat matematika dan sisanya!" alias={["8 - 5 = 3", "8-5=3"]} visual={<p className="text-2xl font-black text-[#1C01A5]">8 - 5 = ?</p>} />
      <Pilih id={idKuis("A", 31)} pertanyaan="7 balon, 3 terbang. Sisanya..." pilihan={[{ huruf: "A", teks: "4" }, { huruf: "B", teks: "10" }, { huruf: "C", teks: "3" }]} benar="A" umpan="7 − 3 = 4." salah="Hitung mundur tiga kali." />
      <Pilih id={idKuis("A", 32)} pertanyaan="8 kue diberi 5. Sisanya..." pilihan={[{ huruf: "A", teks: "5" }, { huruf: "B", teks: "3" }, { huruf: "C", teks: "13" }]} benar="B" umpan="8 − 5 = 3." salah="Yang diberi berarti dikurangi." />
      <Pilih id={idKuis("A", 33)} pertanyaan="Kata yang artinya masih ada adalah..." pilihan={[{ huruf: "A", teks: "tersisa" }, { huruf: "B", teks: "terbang" }, { huruf: "C", teks: "dimakan" }]} benar="A" umpan="Tersisa adalah yang tinggal." salah="Terbang dan dimakan artinya pergi." />
    </div>
  );
}


function TokoRoti({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB3.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🎈🎂🏆"
        judul={kartu.judul}
        anak="Sepuluh meja pesta · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB3}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB3}
        penutup="Meja pesta Rara rapi kembali. Igil tersenyum di balik kue."
        bunga="🎈🎂🍊🎁"
      />
    </KartuBingkai>
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
      ? { nama: "Kepala Toko Igil", pesan: "Luar biasa! Toko rotimu paling laris!" }
      : skor >= 6
        ? { nama: "Penjaga Rak Hebat", pesan: "Hebat! Sedikit lagi jadi kepala toko!" }
        : { nama: "Sahabat Igil", pesan: "Ayo jaga toko lagi bersama Igil, kamu pasti bisa!" };
  const kartu = MODUL_MTK1_BAB3.kartu[3];
  const kalimatPasangan = ["6 - 2", "8 - 6", "10 - 8"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝⭐"
        judul={kartu.judul}
        anak="Tantangan Para Juara · Pengurangan sampai dengan 10"
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
      <p className="mt-3 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
        {lencana.nama}. {lencana.pesan}
      </p>
      <div className="mt-4 grid gap-3">
        <KuisTulisKartu
          id={idKuis("D", 0)}
          pertanyaan="1. Tulis jumlah permen yang masih tersisa!"
          alias={["5", "lima"]}
          visual={<p className="text-2xl">🍬🍬🍬🍬🍬<span className="opacity-40 line-through">🍬🍬🍬🍬</span></p>}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Ada 7 balon. Sebanyak 4 balon meletus. Sisa berapa?"
          visual={<p>🎈🎈🎈 💥💥💥💥</p>}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
          ]}
          benar="B"
          umpan="7 - 4 = 3."
          salah="Hitung balon yang masih ada."
        />
        <KuisTulisKartu
          id={idKuis("D", 2)}
          pertanyaan="3. Angka berapa yang ada di dalam kotak?"
          alias={["3", "tiga"]}
          visual={<p className="text-2xl font-black">8 - □ = 5</p>}
        />
        <SoalRekamSuara
          id={idKuis("D", 3)}
          pertanyaan='4. Bimo berkata: "9 - 4 = 6!" Apakah Bimo benar? Ucapkan Benar atau Salah, lalu sebutkan jawaban yang benar.'
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["salah", "tidak benar", "tidak tepat", "keliru"],
              ["lima", "5"],
            ])
          }
          petunjuk="Ucapkan Salah, lalu sebutkan lima."
        />
        <Pilih
          id={idKuis("D", 4)}
          pertanyaan="5. Mana pasangan yang keduanya hasilnya 4?"
          pilihan={[
            { huruf: "A", teks: "5 - 1 = 4 dan 6 - 2 = 4" },
            { huruf: "B", teks: "5 - 1 = 4 dan 3 - 1 = 2" },
            { huruf: "C", teks: "8 - 3 = 5 dan 7 - 2 = 5" },
          ]}
          benar="A"
          umpan="5 - 1 = 4 dan 6 - 2 = 4. Dua cara yang berbeda."
          salah="Kedua kalimat harus sama-sama menghasilkan 4."
        />
        <Pilih
          id={idKuis("D", 5)}
          pertanyaan="6. Rara punya 6 stiker. Ia memberi 6 stiker ke Bimo. Berapa sisa stiker Rara?"
          pilihan={[
            { huruf: "A", teks: "6" },
            { huruf: "B", teks: "1" },
            { huruf: "C", teks: "0" },
          ]}
          benar="C"
          umpan="Semuanya habis. 6 - 6 = 0."
          salah="Rara memberi semua stikernya."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Bu Tuti punya 10 bunga. Sebanyak 6 bunga sudah terjual. Sisa berapa?"
          visual={<p>🌷 × 10, terjual 6</p>}
          pilihan={[
            { huruf: "A", teks: "3" },
            { huruf: "B", teks: "4" },
            { huruf: "C", teks: "6" },
          ]}
          benar="B"
          umpan="10 - 6 = 4."
          salah="Sepuluh dikurangi enam."
        />
        <KuisCocok
          id={idKuis("D", 7)}
          perintah="8. Pasangkan kartu yang hasilnya sama!"
          baris={[
            { kiri: "10 - 6", pilihan: kalimatPasangan, benar: "6 - 2" },
            { kiri: "7 - 5", pilihan: kalimatPasangan, benar: "8 - 6" },
            { kiri: "9 - 7", pilihan: kalimatPasangan, benar: "10 - 8" },
          ]}
          umpan="10 - 6 dan 6 - 2 sama-sama 4. Pasangan lain sama-sama 2."
        />
        <Pilih
          id={idKuis("D", 8)}
          pertanyaan="9. Ada 9 boneka dan 5 anak. Setiap anak mengambil 1 boneka. Berapa boneka yang tidak terambil?"
          visual={<p>🧸 × 9 · anak 5</p>}
          pilihan={[
            { huruf: "A", teks: "3" },
            { huruf: "B", teks: "4" },
            { huruf: "C", teks: "5" },
          ]}
          benar="B"
          umpan="9 - 5 = 4."
          salah="Sembilan dikurangi lima."
        />
        <SoalRekamSuara
          id={idKuis("D", 9)}
          pertanyaan="10. Ada 8 anak ayam, lalu 3 berjalan pergi. Buatlah cerita pendek, lalu sebutkan hasilnya!"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["delapan", "8"],
              ["tiga", "3"],
              ["lima", "5"],
            ])
          }
          petunjuk="Sebutkan delapan, tiga, dan sisanya lima."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: kurang artinya diambil atau dipisah."
          alias={["kurang artinya diambil atau dipisah", "kurang artinya diambil"]}
        />
      </div>
    </KartuBingkai>
  );
}

function langkahBab3(kelas?: string, kelamin?: KelaminGuru): LangkahQuest[] {
  const kartuA = MODUL_MTK1_BAB3.kartu[0];
  const kuisMisi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("C", indeks)), idKuisTulisKartu(ID, "C")];
  const kuisEvaluasi = [...Array.from({ length: 10 }, (_, indeks) => idKuis("D", indeks)), idKuisTulisKartu(ID, "D")];
  const butir = ["Membuat cerita pengurangan, lalu menulisnya dengan tanda - dan =.", "Mengurangi dengan pasangan bilangan, menghitung mundur, dan pengurangan dari 10.", "Melihat hubungan penjumlahan dan pengurangan.", "Menyelesaikan soal cerita pengurangan sampai 10."];
  const poin = ["Kurang artinya diambil atau dipisah. Benda yang hilang jadi lebih sedikit.", "Semuanya, yang diambil, lalu sisa.", "Hitung mundur dari yang besar. 9 - 4: delapan, tujuh, enam, lima.", "Kurang nol, tetap sama. 7 - 0 = 7.", "Tambah dan kurang itu saudara. 5 + 3 = 8, jadi 8 - 3 = 5.", "Cari angka, cari kata kunci, lalu hitung mundur."];
  const halaman = (Isi: (props: { kelas?: string; kelamin?: KelaminGuru; halaman: number }) => ReactNode, kuis: string[][]) =>
    [0, 1, 2, 3].map((n) => ({ isi: <Isi halaman={n} kelas={kelas} kelamin={kelamin} />, kuis: kuis[n] }));
  return [
    ...empatHalaman({ tab: "Sub-Bab A", kelompok: "Cerita pengurangan" }, "cerita", halaman(IsiCerita, [
      [idKuis("A", 1), idKuis("A", 2)],
      [idKuis("A", 5), idKuis("A", 6)],
      [idKuis("A", 3), idKuis("A", 4), idKuis("A", 7), idKuis("A", 8), idKuis("A", 11), idKuis("A", 12), idKuis("A", 13)],
      [idKuis("A", 9), idKuis("A", 10), idKuis("A", 0), idKuisTulisKartu(ID, "A"), idKuis("A", 14), idKuis("A", 15), idKuis("A", 16)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab B", kelompok: "Cara mengurangi" }, "cara", halaman(IsiCara, [
      [idKuis("B", 3), idKuis("A", 17), idKuis("A", 18)],
      [idKuis("A", 19), idKuis("A", 20)],
      [idKuis("B", 0), idKuis("B", 1), idKuis("A", 21)],
      [idKuis("B", 2), idKuis("A", 22), idKuis("A", 23)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab C", kelompok: "Saudara tambah dan kurang" }, "saudara", halaman(IsiSaudara, [
      [idKuis("B", 4), idKuis("B", 5)],
      [idKuis("B", 6), idKuis("B", 7)],
      [idKuis("B", 8), idKuis("B", 9), idKuis("B", 10)],
      [idKuis("B", 11), idKuis("B", 12), idKuis("B", 13)],
    ])),
    ...empatHalaman({ tab: "Sub-Bab D", kelompok: "Soal cerita" }, "soal", halaman(IsiSoal, [
      [idKuis("A", 24), idKuis("A", 25)],
      [idKuis("A", 26), idKuis("A", 27)],
      [idKuis("A", 28), idKuis("A", 29), idKuis("A", 30)],
      [idKuisTulisKartu(ID, "B"), idKuis("A", 31), idKuis("A", 32), idKuis("A", 33)],
    ])),
    { kode: "misi", bagian: "Misi", judul: "Misi toko roti", kuis: kuisMisi, isi: <TokoRoti kelas={kelas} kelamin={kelamin} /> },
    {
      kode: "review",
      bagian: "Review",
      judul: "Tujuan Pembelajaran",
      tab: "Review",
      kelompok: "Tujuan Pembelajaran",
      bebas: true,
      isi: (
        <div className="space-y-4">
          <KepalaKartu ikon="🎈🎂🦉" judul={kartuA.judul} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
          <TujuanBelajar butir={butir} />
          <KartuPoinPenting kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB3.kartu[3].voice, 2_000, 3_000)} poin={poin} penutup="Kurang artinya diambil atau dipisah." />
          <p className="text-sm font-semibold leading-relaxed text-slate-700">Kalau ada yang masih bingung, tanyakan di sini. Kalau sudah jelas, tekan Lanjut.</p>
        </div>
      ),
    },
    { kode: "evaluasi", bagian: "Evaluasi", judul: "Lembar evaluasi", isi: <LembarEvaluasi kelas={kelas} kelamin={kelamin} />, kuis: kuisEvaluasi },
  ];
}

export default function NaskahMtk1Bab3({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kuis = useKuisMateri();
  const sudahBenar = (id: string) => kuis?.sudahBenar(id) ?? false;
  const langkah = useMemo(() => langkahBab3(kelas, kelamin), [kelas, kelamin]);
  return (
    <QuestLangkah
      simpan="quest-mtk-1-bab3-v1"
      langkah={langkah}
      sudahBenar={sudahBenar}
      slot={{ id: SLOT_AJUAN_SEBELUM_KARTU_D, padaKode: "review" }}
      teksAkhir="Pesta kembali ramai. Bab ini selesai."
    />
  );
}
