"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB3 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB3 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
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
      <p className="text-xl font-black tracking-wide text-[#166534]">Cerita: Pesta Ulang Tahun yang Hilang</p>
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

function IsiCerita({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const [kedip, setKedip] = useState(0);
  const [suaraA, setSuaraA] = useState<StatusJawabanKuis>(null);
  return (
    <>
      <JudulSubBab
        judul="Sub-Bab A: Cerita Pengurangan"
        kelas={kelas}
        kelamin={kelamin}
        naskah={[
          "Malam pesta di rumah Rara. Ada delapan balon di dinding.",
          "Angin membawa tiga balon. Delapan kurang tiga sama dengan lima.",
          "Tanda kurang artinya diambil atau dipisahkan. Jumlahnya jadi lebih sedikit.",
          "Enam kue dikurangi dua menjadi empat. Sembilan topi dikurangi empat menjadi lima.",
        ]}
      />
      <div className="mt-4 space-y-3">
        <HookPesta />
        <Dialog nama="Rara" anak="Wah, balonnya banyak sekali!" />
        <Dialog nama="Bimo" anak="Ayo hitung! Satu, dua, tiga, empat, lima, enam, tujuh… delapan!" />
        <Dialog nama="Igil" anak="Hoo! Delapan balon siap untuk pesta!" />
        <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
          <p className="text-xs font-black uppercase text-[#9F1239]">Delapan balon</p>
          <GambarCerita src="/doodle-mtk/mtk-1-bab3-delapan.jpg" alt="Delapan balon berjajar dan angka 8." />
          <div className="mt-2 text-center">
            <IkonUlang ikon="🎈" jumlah={8} ukuran="text-3xl" />
          </div>
        </article>
        <KuisAkhirAdegan
          idSuara={idKuis("A", 1)}
          idKanvas={idKuis("A", 2)}
          pertanyaanSuara="Berapa balon yang siap untuk pesta?"
          aliasSuara={["8", "delapan"]}
          petunjukSuara="Ucapkan angkanya."
          pertanyaanKanvas="Tuliskan angka banyak balon itu."
          aliasKanvas={["8", "delapan"]}
          konteksKanvas="Ada 8 balon. Lambangnya 8."
        />
        <Dialog nama="Rara" anak="Aduh! Balonnya terbang!" />
        <Dialog nama="Bimo" anak="Ada 3 yang lepas!" />
        <Dialog nama="Igil" anak="Sekarang tinggal berapa, ya?" />
        <article className="rounded-2xl border-2 border-violet-300/80 bg-violet-50 px-4 py-3">
          <p className="text-xs font-black uppercase text-[#9A3412]">Balon yang tersisa</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab3-sisa.jpg"
            alt="Lima balon masih terikat. Tiga balon terbang. 8 kurang 3 sama dengan 5."
          />
          <div className="mt-2 text-center">
            <IkonUlang ikon="🎈" jumlah={5} ukuran="text-3xl" />
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-700">Satu, dua, tiga, empat, lima.</p>
        </article>
        <p className="text-center text-4xl font-black text-[#1C01A5]">8 - 3 = 5</p>
        <Dialog nama="Igil" anak="Benar! Dulu 8, yang hilang 3, sisa 5." />
        <KuisAkhirAdegan
          idSuara={idKuis("A", 3)}
          idKanvas={idKuis("A", 4)}
          pertanyaanSuara="Dulu ada 8 balon. Yang lepas 3. Sisa berapa?"
          aliasSuara={["5", "lima"]}
          petunjukSuara="Ucapkan sisanya."
          pertanyaanKanvas="Tuliskan 8 - 3 = 5."
          aliasKanvas={["8 - 3 = 5", "8-3=5"]}
          konteksKanvas="Delapan kurang tiga sama dengan lima."
        />
        <Dialog nama="Bimo" anak="Tanda satu garis itu apa?" />
        <Dialog nama="Igil" anak="Itu tanda kurang. Artinya diambil atau dipisahkan!" />
        <Dialog nama="Rara" anak="Kalau begitu, jumlahnya jadi lebih sedikit." />
        <article className="rounded-2xl border-2 border-[#7C3AED]/25 bg-[#F5F3FF] px-4 py-3">
          <p className="text-xs font-black uppercase text-[#5B21B6]">Tanda kurang</p>
          <GambarCerita src="/doodle-mtk/mtk-1-bab3-kurang.jpg" alt="Igil menunjukkan tanda kurang." />
          <p className="mt-2 text-center text-4xl" aria-hidden>
            ➖
          </p>
        </article>
        <KuisAkhirAdegan
          idSuara={idKuis("A", 5)}
          idKanvas={idKuis("A", 6)}
          pertanyaanSuara="Tanda kurang artinya apa?"
          aliasSuara={["diambil", "dipisahkan"]}
          petunjukSuara="Ucapkan: diambil."
          pertanyaanKanvas="Tuliskan tanda kurang."
          aliasKanvas={["-", "kurang"]}
          konteksKanvas="Tanda kurang artinya diambil atau dipisahkan."
        />
        <Dialog nama="Bimo" anak="Aku makan 2 potong kue, ya!" />
        <Dialog nama="Igil" anak="Ayo hitung mundur dari 6: lima… empat!" />
        <p className="text-center text-4xl font-black text-[#1C01A5]">6 - 2 = 4</p>
        <KuisAkhirAdegan
          idSuara={idKuis("A", 7)}
          idKanvas={idKuis("A", 8)}
          pertanyaanSuara="Kue ada 6. Bimo makan 2. Sisa berapa?"
          aliasSuara={["4", "empat"]}
          petunjukSuara="Ucapkan sisanya."
          pertanyaanKanvas="Tuliskan 6 - 2 = 4."
          aliasKanvas={["6 - 2 = 4", "6-2=4"]}
          konteksKanvas="Enam kue dikurangi dua sama dengan empat."
        />
        <Dialog nama="Rara" anak="Ada 9 topi. Tamu mengambil 4 topi." />
        <Dialog nama="Igil" anak="Hitung mundur dari 9: delapan, tujuh, enam… lima!" />
        <p className="text-center text-4xl font-black text-[#1C01A5]">9 - 4 = 5</p>
        <KuisAkhirAdegan
          idSuara={idKuis("A", 9)}
          idKanvas={idKuis("A", 10)}
          pertanyaanSuara="Ada 9 topi. Tamu mengambil 4. Sisa berapa?"
          aliasSuara={["5", "lima"]}
          petunjukSuara="Ucapkan sisanya."
          pertanyaanKanvas="Tuliskan 9 - 4 = 5."
          aliasKanvas={["9 - 4 = 5", "9-4=5"]}
          konteksKanvas="Sembilan topi dikurangi empat sama dengan lima."
        />
        <TabelInfoGrafis
          judul="Infografis: Cerita Pengurangan"
          kepala={["Cerita pesta", "Operasi", "Sisa"]}
          baris={[
            ["8 balon, 3 terbang", "8 - 3", "5"],
            ["6 kue, 2 dimakan", "6 - 2", "4"],
            ["9 topi, 4 diambil", "9 - 4", "5"],
          ]}
          kaki="Yang hilang diambil. Yang tinggal adalah sisa."
        />
      </div>
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <div className="text-center">
          <IkonUlang ikon="🎈" jumlah={6} ukuran="text-3xl" />
        </div>
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Ada 6 balon. Dua balon terbang. Sisa berapa? Ucapkan dengan keras!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["empat", "4"])}
          petunjuk="Ucapkan dengan keras."
          sesudahNilai={(benar) => setSuaraA(benar ? "benar" : "salah")}
        />
        {suaraA === "benar" ? (
          <p className="mt-2 text-sm font-bold text-emerald-800">Hoo! Kamu teliti sekali!</p>
        ) : null}
        {suaraA === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Ayo hitung mundur dari angka enam, ya!</p>
        ) : null}
      </div>
      <div className="mt-4">
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis jumlah kue yang masih tersisa di kotak!"
          alias={["4", "empat"]}
          visual={
            <p className={`text-3xl ${kedip >= 2 ? "animate-pulse" : ""}`} aria-hidden>
              🍪🍪🍪🍪<span className="opacity-40 line-through">🍪🍪🍪</span>
            </p>
          }
          sesudahNilai={(benar) => {
            if (!benar) setKedip((n) => n + 1);
          }}
        />
      </div>
    </>
  );
}

function IsiCara({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kalimat = ["6 - 2 = 4", "4 - 1 = 3", "9 - 5 = 4"];
  return (
    <>
      <JudulSubBab
        judul="Sub-Bab B: Berbagai Cara Melakukan Pengurangan"
        kelas={kelas}
        kelamin={kelamin}
        naskah={[
          "Mengurangi artinya mengambil sebagian. Yang hilang membuat jumlah jadi lebih sedikit.",
          "Cara pertama, pasangan bilangan. Cara kedua, menghitung mundur.",
          "Cara ketiga, pengurangan dari sepuluh. Kurang nol, angkanya tetap.",
        ]}
      />
      <TabelInfoGrafis
        judul="Infografis: Ayo Mengenal Pengurangan"
        kepala={["Gambar", "Kalimat", "Sisa"]}
        baris={[
          ["🍊🍊🍊🍊🍊 − 🍊🍊", "5 - 2", "3"],
          ["⭐⭐⭐⭐⭐⭐⭐ − ⭐⭐⭐", "7 - 3", "4"],
          ["🎈🎈🎈🎈🎈🎈🎈🎈 − 🎈🎈🎈", "8 - 3", "5"],
          ["9 lalu mundur 4", "9 - 4", "5"],
          ["8 jari, lipat 3", "8 - 3", "5"],
          ["5, tidak ada yang diambil", "5 - 0", "5"],
        ]}
        kaki="Yang hilang diambil. Yang tinggal adalah sisa."
      />
      <div className="mt-4 space-y-3">
        <article className="rounded-2xl border-2 border-rose-300/80 bg-rose-50 px-4 py-3">
          <p className="text-sm font-black text-[#9A3412]">Mengurangi = mengambil sebagian</p>
          <p className="mt-2 text-center text-2xl">
            <IkonUlang ikon="🍊" jumlah={5} /> dikurangi <IkonUlang ikon="🍊" jumlah={2} /> sama dengan <IkonUlang ikon="🍊" jumlah={3} />
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Lima kurang dua sama dengan tiga.</p>
          <p className="text-2xl font-black text-[#1C01A5]">5 - 2 = 3</p>
        </article>
        <article className="rounded-2xl border-2 border-[#0284C7]/25 bg-[#F0F9FF] px-4 py-3">
          <p className="text-sm font-black text-[#0C4A6E]">Tanya dulu</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Semuanya 8 balon. Yang hilang 3. Sisa 5. Tanya dulu: semuanya berapa, yang hilang berapa, sisanya berapa?
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              ["8", "semuanya", "🎈"],
              ["3", "hilang", "💨"],
              ["5", "sisa", "🎈"],
            ].map(([angka, nama, ikon]) => (
              <div key={nama} className="rounded-xl bg-white px-2 py-2">
                <p className="text-2xl">{ikon}</p>
                <p className="text-2xl font-black text-[#1C01A5]">{angka}</p>
                <p className="text-xs font-bold text-slate-600">{nama}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border-2 border-[#16A34A]/30 bg-[#F0FDF4] px-4 py-3">
          <p className="text-sm font-black text-[#166534]">1. Pasangan Bilangan</p>
          <p className="mt-2 text-center text-2xl">
            <span>⭐⭐⭐⭐</span>
            <span className="ml-2 text-slate-400 line-through">⭐⭐⭐</span>
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Dikurangi 3 bintang. Yang tidak dicoret ada 4. 7 - 3 = 4. Dibalik, 7 - 4 = 3.</p>
        </article>
        <article className="rounded-2xl border-2 border-[#7C3AED]/25 bg-[#F5F3FF] px-4 py-3">
          <p className="text-sm font-black text-[#5B21B6]">Pakai jari</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Angkat 8 jari, lipat 3, yang terbuka 5. 8 - 3 = 5.</p>
        </article>
        <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-black text-[#92400E]">2. Menghitung Mundur</p>
          <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">0 — 1 — 2 — 3 — 4 — 5 ← 6 ← 7 ← 8 ← 9 — 10</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Simpan 9, lompat 4 kali: 8, 7, 6, 5. 9 - 4 = 5.</p>
        </article>
        <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3">
          <p className="text-sm font-black text-[#92400E]">3. Pengurangan dari 10</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Kurang nol, angkanya tetap. 5 - 0 = 5. Tidak ada yang diambil.</p>
          <p className="mt-2 text-center text-2xl font-black text-[#1C01A5]">10 - 4 = 6</p>
        </article>
      </div>
      <div className="mt-4 grid gap-3">
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Tarik garis dari gambar ke kalimat matematika yang benar!"
          baris={[
            { kiri: "🐠🐠🐠🐠🐠🐠 - 🐠🐠", pilihan: kalimat, benar: "6 - 2 = 4" },
            { kiri: "🍬🍬🍬🍬 - 🍬", pilihan: kalimat, benar: "4 - 1 = 3" },
            { kiri: "🐦🐦🐦🐦🐦🐦🐦🐦🐦 - 🐦🐦🐦🐦🐦", pilihan: kalimat, benar: "9 - 5 = 4" },
          ]}
          umpan="Ikan 6 kurang 2, permen 4 kurang 1, burung 9 kurang 5."
        />
        <SusunBalok
          id={idKuis("B", 1)}
          judul="Susun balok supaya jadi kalimat matematika yang benar!"
          pool={["2", "=", "-", "7", "5"]}
          jawaban={["7-5=2", "7-2=5"]}
          umpan="7 - 5 = 2 atau 7 - 2 = 5."
        />
        <Pilih
          id={idKuis("B", 2)}
          pertanyaan="Semua kartu menyisakan angka yang sama, kecuali satu. Ketuk kartu yang berbeda!"
          pilihan={[
            { huruf: "A", teks: "8 - 3" },
            { huruf: "B", teks: "6 - 1" },
            { huruf: "C", teks: "9 - 5" },
            { huruf: "D", teks: "7 - 2" },
          ]}
          benar="C"
          umpan="9 - 5 sisanya 4. Kartu lain sisanya 5."
          salah="Hitung sisa tiap kartu. Tiga kartu sisanya sama."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-5">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("B", 3)}
            pertanyaan="Ada 10 permen. Kamu makan 4 permen. Sisa permenmu berapa? Ucapkan!"
            periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam", "6"])}
            petunjuk="Ucapkan sisa permennya."
          />
        </div>
      </div>
      <JudulSubBab
        judul="Sub-Bab C: Hubungan Penjumlahan dan Pengurangan"
        kelas={kelas}
        kelamin={kelamin}
        naskah={[
          "Tambah dan kurang itu saudara.",
          "Lima tambah tiga sama dengan delapan, jadi delapan kurang tiga sama dengan lima.",
        ]}
      />
      <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-3">
        <p className="text-sm font-semibold text-slate-700">Tambah dan kurang itu saudara. 5 + 3 = 8, jadi 8 - 3 = 5.</p>
        <p className="mt-2 text-center text-2xl font-black text-[#1C01A5]">5 + 3 = 8</p>
        <p className="text-center text-2xl font-black text-[#1C01A5]">8 - 3 = 5</p>
      </article>
      <JudulSubBab
        judul="Sub-Bab D: Soal Cerita Pengurangan"
        kelas={kelas}
        kelamin={kelamin}
        naskah={[
          "Pada soal cerita, cari angkanya, cari kata kunci kurang, lalu hitung mundur.",
          "Rara punya tujuh balon, tiga terbang. Tujuh kurang tiga sama dengan empat.",
        ]}
      />
      <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-3">
        <p className="text-sm font-black text-[#0F766E]">Soal cerita</p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Rara punya 7 balon, 3 terbang. Kata kunci terbang, hilang, diambil, dimakan, dipakai, diberikan, pecah, tersisa, tinggal. 7 - 3 = 4.
        </p>
      </article>
      <div className="mt-4">
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Bimo punya 8 kue. Ia memberi 5 kue ke temannya. Tulis kalimat matematika dan sisanya!"
          alias={["8 - 5 = 3", "8-5=3"]}
          visual={<p className="text-2xl font-black text-[#1C01A5]">8 - 5 = ?</p>}
        />
      </div>
    </>
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

export default function NaskahMtk1Bab3({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const kartuA = MODUL_MTK1_BAB3.kartu[0];
  return (
    <div className="space-y-5">
      <KartuBingkai latar="bg-sky-50/80">
        <KepalaKartu
          ikon="🎈🎂🦉"
          judul={kartuA.judul}
          anak="Pengurangan sampai dengan 10"
          kelas={kelas}
          kelamin={kelamin}
          cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)}
        />
        <div className="mt-4 rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
          <TujuanBelajar
            butir={[
              "Membuat cerita pengurangan, lalu menulisnya dengan tanda - dan =.",
              "Mengurangi dengan pasangan bilangan, menghitung mundur, dan pengurangan dari 10.",
              "Melihat hubungan penjumlahan dan pengurangan.",
              "Menyelesaikan soal cerita pengurangan sampai 10.",
            ]}
          />
        </div>
        <IsiCerita kelas={kelas} kelamin={kelamin} />
        <IsiCara kelas={kelas} kelamin={kelamin} />
      </KartuBingkai>
      <TokoRoti kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB3.kartu[3].voice, 2_000, 3_000)}
        poin={[
          "Kurang artinya diambil atau dipisah. Benda yang hilang jadi lebih sedikit.",
          "Semuanya, yang diambil, lalu sisa.",
          "Hitung mundur dari yang besar. 9 - 4: delapan, tujuh, enam, lima.",
          "Kurang nol, tetap sama. 7 - 0 = 7.",
          "Tambah dan kurang itu saudara. 5 + 3 = 8, jadi 8 - 3 = 5.",
          "Cari angka, cari kata kunci, lalu hitung mundur.",
        ]}
        penutup="Kalimat kunci: kurang artinya diambil atau dipisah."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
