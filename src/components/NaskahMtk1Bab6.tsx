"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB6 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB6 } from "@/lib/tema-misi-mtk-1";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
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
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
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
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      <div className="mt-3 flex justify-center">
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
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </section>
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

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB6.kartu[0];
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const [salahKanvas, setSalahKanvas] = useState(0);
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu
        ikon="🦉🌳🦉"
        judul={kartu.judul}
        anak="Penjumlahan dan Pengurangan sampai dengan 20"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
        <TujuanBelajar
        butir={[
          "Menjumlahkan dan mengurangkan bilangan sampai 20 dengan hitung maju dan hitung mundur.",
          "Memecah angka jadi puluhan dan satuan, lalu menyelesaikan soal sehari-hari.",
        ]}
      />
      </div>
      <div className="mt-4 space-y-3">
        <Adegan
          judul="Sore di halaman sekolah"
          warna="border-orange-200 bg-orange-50"
          src="/doodle-mtk/mtk-1-bab6-sore.jpg"
          alt="Sore di halaman sekolah. Anak kucing di dahan beringin, tiga anak berlari, Igil membawa jam."
        >
          <p className="text-sm font-semibold text-slate-700">
            Langit jingga. Tali jemuran bergoyang. Dari dahan terdengar meoong pelan.
          </p>
          <Dialog nama="Igil" anak="Lihat! Ada anak kucing di dahan paling tinggi!" />
          <Dialog nama="Bimo" anak="Wah, tingginya 18 kaki. Kita tidak bisa memanjat." />
          <Dialog nama="Rara" anak="Kalau kursi kita susun, kita bisa sampai!" />
          <Dialog nama="Igil" anak="Nama aku Igil! Jam ajaib ini membuat angka berjalan maju dan mundur!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 1)}
            idKanvas={idKuis("A", 2)}
            pertanyaanSuara="Anak kucing ada di ketinggian berapa kaki?"
            aliasSuara={["18", "delapan belas"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan angka 18."
            aliasKanvas={["18", "delapan belas"]}
            konteksKanvas="Anak kucing ada di angka 18."
          />
        </Adegan>
        <Adegan
          judul="Adegan 1 · Menghitung ketinggian pohon"
          warna="border-sky-200 bg-sky-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-1.jpg"
          alt="Pohon berukur dari 0 di tanah sampai 18 di dahan. Bimo menunjuk, Igil memegang jam."
        >
          <Dialog nama="Bimo" anak="Anak kucing ada di angka 18." />
          <Dialog nama="Rara" anak="Kita baru bisa memanjat sampai angka 12. Sisa berapa lagi, ya?" />
          <Dialog nama="Igil" anak="Ayo hitung maju dari 12 sampai 18!" />
          <Dialog nama="Igil" anak="Tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas!" />
          <Dialog nama="Bimo" anak="Ada 6 langkah lagi!" />
          <p className="text-center text-sm font-black text-[#1C01A5]">12 → 13 → 14 → 15 → 16 → 17 → 18</p>
          <p className="text-center text-sm font-black text-[#1C01A5]">12 + 6 = 18</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 3)}
            idKanvas={idKuis("A", 4)}
            pertanyaanSuara="Dari 12 sampai 18, ada berapa langkah?"
            aliasSuara={["6", "enam"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 12 + 6 = 18."
            aliasKanvas={["12 + 6 = 18", "12+6=18"]}
            konteksKanvas="Dua belas ditambah enam sama dengan delapan belas."
          />
        </Adegan>
        <Adegan
          judul="Adegan 2 · Rahasia dekomposisi"
          warna="border-indigo-200 bg-indigo-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-2.jpg"
          alt="Angka 14 pecah menjadi kotak 10 dan kotak 4. Igil menunjukkan jamnya kepada Rara."
        >
          <Dialog nama="Igil" anak="Setiap angka belasan bisa dipecah jadi dua bagian!" />
          <Dialog nama="Rara" anak="Seperti ikatan dan yang lepas?" />
          <Dialog nama="Igil" anak="Tepat! 14 = 10 + 4. Sepuluh dan empat." />
          <p className="text-sm font-black text-[#1C01A5]">14 → 10 + 4. 17 → 10 + 7.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 5)}
            idKanvas={idKuis("A", 6)}
            pertanyaanSuara="Empat belas sama dengan sepuluh tambah berapa?"
            aliasSuara={["4", "empat"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 14 = 10 + 4."
            aliasKanvas={["14 = 10 + 4", "14=10+4"]}
            konteksKanvas="Empat belas dipecah jadi sepuluh dan empat."
          />
        </Adegan>
        <Adegan
          judul="Adegan 3 · Kursi susun, hitung maju"
          warna="border-amber-200 bg-amber-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-3.jpg"
          alt="Rara dan Igil menyusun kursi plastik. Igil mengawasi dari samping."
        >
          <Dialog nama="Rara" anak="Aku susun 8 kursi." />
          <Dialog nama="Igil" anak="Aku tambah 7 kursi lagi!" />
          <Dialog nama="Bimo" anak="8 + 7… ayo mulai dari 8 dan hitung maju 7 kali!" />
          <Dialog nama="Igil" anak="Sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas!" />
          <p className="text-center text-sm font-black text-[#1C01A5]">8 + 7 = 15</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 7)}
            idKanvas={idKuis("A", 8)}
            pertanyaanSuara="Delapan kursi ditambah tujuh kursi. Semuanya berapa?"
            aliasSuara={["15", "lima belas"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 8 + 7 = 15."
            aliasKanvas={["8 + 7 = 15", "8+7=15"]}
            konteksKanvas="Delapan ditambah tujuh sama dengan lima belas."
          />
        </Adegan>
        <Adegan
          judul="Adegan 4 · Isi dulu ke sepuluh"
          warna="border-emerald-200 bg-emerald-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-4.jpg"
          alt="Bingkai sepuluh hampir penuh. Dua kursi masuk mengisi kotak kosong, lima kursi menunggu di luar."
        >
          <Dialog nama="Igil" anak="8 itu kurang 2 supaya jadi penuh 10." />
          <Dialog nama="Rara" anak="Jadi kita ambil 2 dari 7 kursi!" />
          <Dialog nama="Bimo" anak="Sisanya 7 – 2 = 5." />
          <Dialog nama="Igil" anak="Jadi 10 + 5 = 15!" />
          <p className="text-sm font-black text-[#1C01A5]">8 + 7 = 8 + 2 + 5 = 10 + 5 = 15</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 9)}
            idKanvas={idKuis("A", 10)}
            pertanyaanSuara="Setelah diisi sampai sepuluh, sisa kursi yang ditambahkan berapa?"
            aliasSuara={["5", "lima"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 10 + 5 = 15."
            aliasKanvas={["10 + 5 = 15", "10+5=15"]}
            konteksKanvas="Sepuluh ditambah lima sama dengan lima belas."
          />
        </Adegan>
        <Adegan
          judul="Adegan 5 · Kursi roboh, hitung mundur"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-5.jpg"
          alt="Jam Igil berputar mundur. Empat kursi jatuh berserakan."
        >
          <Dialog nama="Igil" anak="Oh tidak! Kursinya jatuh 4!" />
          <Dialog nama="Rara" anak="Tadi ada 15 kursi. Sekarang tinggal berapa?" />
          <Dialog nama="Bimo" anak="Hitung mundur dari 15! Empat belas, tiga belas, dua belas, sebelas!" />
          <Dialog nama="Igil" anak="Sisa 11 kursi!" />
          <p className="text-center text-sm font-black text-[#1C01A5]">15 – 4 = 11</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 11)}
            idKanvas={idKuis("A", 12)}
            pertanyaanSuara="Ada 15 kursi. Yang jatuh 4. Sisa berapa?"
            aliasSuara={["11", "sebelas"]}
            petunjukSuara="Ucapkan sisanya."
            pertanyaanKanvas="Tuliskan 15 - 4 = 11."
            aliasKanvas={["15 - 4 = 11", "15-4=11"]}
            konteksKanvas="Lima belas dikurangi empat sama dengan sebelas."
          />
        </Adegan>
        <Adegan
          judul="Adegan 6 · Dekomposisi untuk kurang"
          warna="border-violet-200 bg-violet-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-6.jpg"
          alt="16 pecah menjadi 10 dan 6. 9 pecah menjadi 6 dan 3. Igil menunjuk keduanya."
        >
          <Dialog nama="Rara" anak="16 – 9… aku bingung kalau langsung." />
          <Dialog nama="Igil" anak="Kurangi dulu 6, jadi 16 – 6 = 10. Sisa yang harus dikurangi 3 lagi." />
          <Dialog nama="Bimo" anak="10 – 3 = 7!" />
          <Dialog nama="Igil" anak="Jadi 16 – 9 = 7!" />
          <p className="text-sm font-black text-[#1C01A5]">16 – 9 = 16 – 6 – 3 = 10 – 3 = 7</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 13)}
            idKanvas={idKuis("A", 14)}
            pertanyaanSuara="Enam belas dikurangi sembilan. Hasilnya berapa?"
            aliasSuara={["7", "tujuh"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 16 - 9 = 7."
            aliasKanvas={["16 - 9 = 7", "16-9=7"]}
            konteksKanvas="Enam belas dikurangi sembilan sama dengan tujuh."
          />
        </Adegan>
        <Adegan
          judul="Adegan 7 · Anak kucing selamat"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-7.jpg"
          alt="Tumpukan kursi mencapai dahan. Igil memegang anak kucing. Igil melompat gembira."
        >
          <Dialog nama="Igil" anak="Dapat!" />
          <Dialog nama="Bimo" anak="Kita pakai semua cara belajar tadi!" />
          <Dialog nama="Rara" anak="Hitung maju, hitung mundur, dan pecah angka!" />
          <Dialog nama="Igil" anak="Kalian hebat! Angka selalu bisa berjalan maju dan mundur!" />
          <Dialog nama="Igil" anak="Horeee! Anak kucing selamat!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 15)}
            idKanvas={idKuis("A", 16)}
            pertanyaanSuara="Ada berapa cara yang dipakai: hitung maju, hitung mundur, dan pecah angka?"
            aliasSuara={["3", "tiga"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan salah satu caranya: maju."
            aliasKanvas={["maju", "hitung maju"]}
            konteksKanvas="Salah satu caranya adalah hitung maju."
          />
        </Adegan>
      </div>
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">13 → 14 → 15 → 16 → 17</p>
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Mulai dari 13, hitung maju 4 langkah. Berhenti di angka berapa? Ucapkan dengan keras!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["tujuh belas", "17"])}
          petunjuk="Sebutkan angka berhentinya."
          sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")}
        />
        {suara === "benar" ? <p className="mt-2 text-sm font-bold text-emerald-800">Tik-tik! Kamu cepat sekali!</p> : null}
        {suara === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Ayo tunjuk angkanya satu per satu: empat belas, lima belas, enam belas…</p>
        ) : null}
      </div>
      <div className="mt-4">
        <TulisBebas
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat matematikanya dan hasilnya!"
          visual={
            <p className="text-center text-sm font-semibold text-slate-700">
              Bingkai 10 penuh dan 5 titik. Delapan titik dicoret.
            </p>
          }
          pesanSalah="Coba tulis 15 – 8 dan hasilnya."
          umpan="15 – 8 = 7."
          alias={["15-8=7"]}
          konteks="Sepuluh penuh ditambah lima adalah 15. Delapan dicoret. 15 kurang 8 sama dengan 7."
          periksa={jawabLimaBelasKurangDelapan}
          sesudahNilai={(benar) => setSalahKanvas((n) => (benar ? 0 : n + 1))}
        />
        {salahKanvas >= 2 ? (
          <p className="text-sm font-bold text-[#1C01A5]">
            Garis bilangan 0 sampai 20. Lompat mundur dari 15 sebanyak 8 kali.
          </p>
        ) : null}
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB6.kartu[1];
  const hasil = ["12", "17", "15"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu
        ikon="➕➖🦉"
        judul={kartu.judul}
        anak="Infografis hitung maju dan mundur"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <TabelInfoGrafis
        judul="Infografis: Hitung maju dan mundur"
        kepala={["Langkah", "Kalimat", "Hasil"]}
        baris={[
          ["12 lalu 13 14 15 16 17", "12 + 5", "17"],
          ["18 mundur 6 kali", "18 - 6", "12"],
          ["9 + 1 + 5", "9 + 6", "15"],
          ["14 - 4 - 2", "14 - 6", "8"],
          ["8 + 7 dan saudaranya", "15 - 7", "8"],
          ["13 + 5 stiker", "13 + 5", "18"],
        ]}
        kaki="10 + 3 = 13 dan 16 - 3 = 13. Keduanya sama."
      />
      <div className="mt-4 space-y-3">
        <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Hitung maju</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Simpan 12. Lompat 5 kali: 13, 14, 15, 16, 17.</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">12 + 5 = 17</p>
        </article>
        <article className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Hitung mundur</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Simpan 18. Lompat mundur 6 kali: 17, 16, 15, 14, 13, 12.</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">18 – 6 = 12</p>
        </article>
        <article className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Belasan punya 10 di dalamnya</p>
          <div className="mt-2 grid gap-2">
            {[
              ["11", "10 + 1"],
              ["13", "10 + 3"],
              ["16", "10 + 6"],
              ["19", "10 + 9"],
              ["20", "10 + 10"],
            ].map(([angka, pecah]) => (
              <button
                key={angka}
                type="button"
                onClick={() => bacakan(`${angka} sama dengan ${pecah.replace("+", "ditambah")}`)}
                className="grid grid-cols-[3.5rem_1fr] items-center rounded-xl border-2 border-teal-300 bg-white px-3 py-2 text-left"
              >
                <span className="text-2xl font-black text-[#1C01A5]">{angka}</span>
                <span className="text-sm font-black text-[#92400E]">{pecah}</span>
              </button>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Kejar sepuluh dulu</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">9 kurang 1 supaya jadi 10. Pecah 6 jadi 1 dan 5.</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">9 + 6 = 9 + 1 + 5 = 10 + 5 = 15</p>
        </article>
        <article className="rounded-2xl border-2 border-cyan-300 bg-cyan-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Habiskan satuannya</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">14 = 10 + 4. Pecah 6 jadi 4 dan 2.</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">14 – 6 = 14 – 4 – 2 = 10 – 2 = 8</p>
        </article>
        <article className="rounded-2xl border-2 border-pink-200 bg-pink-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Satu keluarga, tiga kalimat</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">8 + 7 = 15, maka 15 – 7 = 8 dan 15 – 8 = 7.</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">9 + 5 = 14, maka 14 – 5 = 9. 6 + 8 = 14, maka 14 – 6 = 8.</p>
        </article>
        <article className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Empat langkah soal cerita</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm font-semibold text-slate-700">
            <li>Cari angkanya: 13 dan 5.</li>
            <li>Kata “memberi lagi” berarti tambah.</li>
            <li>Tulis 13 + 5.</li>
            <li>Hitung: 14, 15, 16, 17, 18.</li>
          </ol>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">13 + 5 = 18 stiker</p>
          <p className="mt-2 text-xs font-semibold text-slate-600">
            Tambah: digabung, ditambah, diberi lagi, datang lagi, semuanya. Kurang: hilang, jatuh, diambil, dimakan, tersisa, tinggal.
          </p>
        </article>
        <article className="rounded-2xl border-2 border-teal-200 bg-teal-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Membandingkan</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">10 + 3 = 13. 16 – 3 = 13. Keduanya sama.</p>
          <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">13 = 13</p>
        </article>
      </div>
      <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Pasangkan kalimat hitung dengan hasilnya!"
          baris={[
            { kiri: "11 + 6", pilihan: hasil, benar: "17" },
            { kiri: "19 – 7", pilihan: hasil, benar: "12" },
            { kiri: "10 + 9 – 4", pilihan: hasil, benar: "15" },
          ]}
          umpan="11 + 6 = 17. 19 – 7 = 12. 10 + 9 – 4 = 15."
        />
        <SusunBalok id={idKuis("B", 1)} />
        <Pilih
          id={idKuis("B", 2)}
          pertanyaan="Tiga kartu hasilnya 13. Ketuk kartu yang berbeda!"
          pilihan={[
            { huruf: "A", teks: "10 + 3" },
            { huruf: "B", teks: "16 – 2" },
            { huruf: "C", teks: "8 + 5" },
            { huruf: "D", teks: "20 – 7" },
          ]}
          benar="B"
          umpan="16 – 2 = 14. Kartu lain hasilnya 13."
          salah="Hitung tiap kartu. Yang bukan 13 adalah kartu berbeda."
        />
        <div>
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("B", 3)}
            pertanyaan="Kalau 7 + 9 = 16, maka berapa 16 – 9? Ucapkan jawabannya!"
            periksa={jawabTujuh}
            petunjuk="Sebutkan hasil 16 dikurangi 9."
          />
        </div>
        <TulisBebas
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Hitung 17 – 9 dengan cara pecah angka. Tulis langkahnya dan hasilnya!"
          pesanSalah="Pecah lewat sepuluh: kurangi dulu sampai 10, lalu sisanya."
          umpan="17 – 7 – 2 = 10 – 2 = 8."
          konteks="17 dikurangi 9 melewati 10. Hasilnya 8."
          periksa={jawabTujuhBelasKurangSembilan}
        />
      </div>
    </KartuBingkai>
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

export default function NaskahMtk1Bab6({
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
        cuplikan={cuplikanDariNaskah(MODUL_MTK1_BAB6.kartu[3].voice, 2_000, 3_000)}
        poin={[
          "Tambah? Hitung maju. 12 + 5 berhenti di 17.",
          "Kurang? Hitung mundur. 18 – 6 berhenti di 12.",
          "Belasan selalu punya 10 di dalamnya. 14 = 10 + 4.",
          "Kejar sepuluh dulu, sisanya gampang. 9 + 6 = 10 + 5 = 15.",
          "Habiskan satuan dulu. 14 – 6 = 10 – 2 = 8.",
          "Satu keluarga angka, tiga kalimat. 8 + 7 = 15, 15 – 7 = 8, 15 – 8 = 7.",
          "Baca soal, cari kata kunci, lalu hitung.",
        ]}
        penutup="Maju ke kanan, mundur ke kiri. Pecah lewat sepuluh, Igil tersenyum lagi!"
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
