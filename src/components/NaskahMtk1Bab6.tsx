"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
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

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Kiki: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bayu: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Naya: "border-[#16A34A]/25 bg-[#F0FDF4]",
  Toki: "border-[#F0AB00] bg-[#FFF8E8]",
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
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-[#fbf6ea] object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
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
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
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
    <article className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
      <p className="text-sm font-black text-amber-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-amber-900">Ketuk kalimat, lalu ketuk hasilnya.</p>
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
        className="mt-3 rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
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
    <KartuBingkai>
      <KepalaKartu
        ikon="🐱🌳🐭"
        judul={kartu.judul}
        anak="Penjumlahan dan Pengurangan sampai dengan 20"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
          <li>Menjumlahkan dan mengurangkan bilangan sampai 20 dengan hitung maju dan hitung mundur.</li>
          <li>Memecah angka jadi puluhan dan satuan, lalu menyelesaikan soal sehari-hari.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-3">
        <Adegan
          judul="Sore di halaman sekolah"
          warna="border-orange-200 bg-orange-50"
          src="/doodle-mtk/mtk-1-bab6-sore.jpg"
          alt="Sore di halaman sekolah. Anak kucing di dahan beringin, tiga anak berlari, Toki membawa jam."
        >
          <p className="text-sm font-semibold text-slate-700">
            Langit jingga. Tali jemuran bergoyang. Dari dahan terdengar meoong pelan.
          </p>
          <Dialog nama="Kiki" anak="Lihat! Ada anak kucing di dahan paling tinggi!" />
          <Dialog nama="Bayu" anak="Wah, tingginya 18 kaki. Kita tidak bisa memanjat." />
          <Dialog nama="Naya" anak="Kalau kursi kita susun, kita bisa sampai!" />
          <Dialog nama="Toki" anak="Nama aku Toki! Jam ajaib ini membuat angka berjalan maju dan mundur!" />
        </Adegan>
        <Adegan
          judul="Adegan 1 · Menghitung ketinggian pohon"
          warna="border-sky-200 bg-sky-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-1.jpg"
          alt="Pohon berukur dari 0 di tanah sampai 18 di dahan. Bayu menunjuk, Toki memegang jam."
        >
          <Dialog nama="Bayu" anak="Anak kucing ada di angka 18." />
          <Dialog nama="Naya" anak="Kita baru bisa memanjat sampai angka 12. Sisa berapa lagi, ya?" />
          <Dialog nama="Toki" anak="Ayo hitung maju dari 12 sampai 18!" />
          <Dialog nama="Kiki" anak="Tiga belas, empat belas, lima belas, enam belas, tujuh belas, delapan belas!" />
          <Dialog nama="Bayu" anak="Ada 6 langkah lagi!" />
          <p className="text-center text-sm font-black text-[#1C01A5]">12 → 13 → 14 → 15 → 16 → 17 → 18</p>
          <p className="text-center text-sm font-black text-[#1C01A5]">12 + 6 = 18</p>
        </Adegan>
        <Adegan
          judul="Adegan 2 · Rahasia dekomposisi"
          warna="border-indigo-200 bg-indigo-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-2.jpg"
          alt="Angka 14 pecah menjadi kotak 10 dan kotak 4. Toki menunjukkan jamnya kepada Naya."
        >
          <Dialog nama="Toki" anak="Setiap angka belasan bisa dipecah jadi dua bagian!" />
          <Dialog nama="Naya" anak="Seperti ikatan dan yang lepas?" />
          <Dialog nama="Toki" anak="Tepat! 14 = 10 + 4. Sepuluh dan empat." />
          <p className="text-sm font-black text-[#1C01A5]">14 → 10 + 4. 17 → 10 + 7.</p>
        </Adegan>
        <Adegan
          judul="Adegan 3 · Kursi susun, hitung maju"
          warna="border-amber-200 bg-amber-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-3.jpg"
          alt="Naya dan Kiki menyusun kursi plastik. Toki mengawasi dari samping."
        >
          <Dialog nama="Naya" anak="Aku susun 8 kursi." />
          <Dialog nama="Kiki" anak="Aku tambah 7 kursi lagi!" />
          <Dialog nama="Bayu" anak="8 + 7… ayo mulai dari 8 dan hitung maju 7 kali!" />
          <Dialog nama="Semua" anak="Sembilan, sepuluh, sebelas, dua belas, tiga belas, empat belas, lima belas!" />
          <p className="text-center text-sm font-black text-[#1C01A5]">8 + 7 = 15</p>
        </Adegan>
        <Adegan
          judul="Adegan 4 · Isi dulu ke sepuluh"
          warna="border-emerald-200 bg-emerald-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-4.jpg"
          alt="Bingkai sepuluh hampir penuh. Dua kursi masuk mengisi kotak kosong, lima kursi menunggu di luar."
        >
          <Dialog nama="Toki" anak="8 itu kurang 2 supaya jadi penuh 10." />
          <Dialog nama="Naya" anak="Jadi kita ambil 2 dari 7 kursi!" />
          <Dialog nama="Bayu" anak="Sisanya 7 – 2 = 5." />
          <Dialog nama="Kiki" anak="Jadi 10 + 5 = 15!" />
          <p className="text-sm font-black text-[#1C01A5]">8 + 7 = 8 + 2 + 5 = 10 + 5 = 15</p>
        </Adegan>
        <Adegan
          judul="Adegan 5 · Kursi roboh, hitung mundur"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-5.jpg"
          alt="Jam Toki berputar mundur. Empat kursi jatuh berserakan."
        >
          <Dialog nama="Toki" anak="Oh tidak! Kursinya jatuh 4!" />
          <Dialog nama="Naya" anak="Tadi ada 15 kursi. Sekarang tinggal berapa?" />
          <Dialog nama="Bayu" anak="Hitung mundur dari 15! Empat belas, tiga belas, dua belas, sebelas!" />
          <Dialog nama="Kiki" anak="Sisa 11 kursi!" />
          <p className="text-center text-sm font-black text-[#1C01A5]">15 – 4 = 11</p>
        </Adegan>
        <Adegan
          judul="Adegan 6 · Dekomposisi untuk kurang"
          warna="border-violet-200 bg-violet-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-6.jpg"
          alt="16 pecah menjadi 10 dan 6. 9 pecah menjadi 6 dan 3. Toki menunjuk keduanya."
        >
          <Dialog nama="Naya" anak="16 – 9… aku bingung kalau langsung." />
          <Dialog nama="Toki" anak="Kurangi dulu 6, jadi 16 – 6 = 10. Sisa yang harus dikurangi 3 lagi." />
          <Dialog nama="Bayu" anak="10 – 3 = 7!" />
          <Dialog nama="Kiki" anak="Jadi 16 – 9 = 7!" />
          <p className="text-sm font-black text-[#1C01A5]">16 – 9 = 16 – 6 – 3 = 10 – 3 = 7</p>
        </Adegan>
        <Adegan
          judul="Adegan 7 · Anak kucing selamat"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab6-adegan-7.jpg"
          alt="Tumpukan kursi mencapai dahan. Kiki memegang anak kucing. Toki melompat gembira."
        >
          <Dialog nama="Kiki" anak="Dapat!" />
          <Dialog nama="Bayu" anak="Kita pakai semua cara belajar tadi!" />
          <Dialog nama="Naya" anak="Hitung maju, hitung mundur, dan pecah angka!" />
          <Dialog nama="Toki" anak="Kalian hebat! Angka selalu bisa berjalan maju dan mundur!" />
          <Dialog nama="Semua" anak="Horeee! Anak kucing selamat!" />
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
    <KartuBingkai>
      <KepalaKartu
        ikon="➕➖🦘"
        judul={kartu.judul}
        anak="Infografis hitung maju dan mundur"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
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
                className="rounded-xl bg-white px-3 py-2 text-left text-sm font-bold text-[#1C01A5]"
              >
                {angka} → {pecah}
              </button>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Kejar sepuluh dulu</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">9 kurang 1 supaya jadi 10. Pecah 6 jadi 1 dan 5.</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">9 + 6 = 9 + 1 + 5 = 10 + 5 = 15</p>
        </article>
        <article className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3">
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

function PintuAngka({
  judul,
  cerita,
  pilihan,
  benar,
  onBenar,
  onSalah,
}: {
  judul: string;
  cerita: string;
  pilihan: string[];
  benar: string;
  onBenar: () => void;
  onSalah: () => void;
}) {
  const [pilih, setPilih] = useState("");
  const sudah = useRef(false);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-black text-[#1C01A5]">{judul}</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">{cerita}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {pilihan.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => {
              setPilih(angka);
              if (angka === benar && !sudah.current) {
                sudah.current = true;
                onBenar();
              } else if (angka !== benar) {
                onSalah();
              }
            }}
            className={`rounded-full px-4 py-2 text-sm font-black ${
              pilih === angka && angka === benar
                ? "bg-emerald-600 text-white"
                : pilih === angka
                  ? "bg-rose-600 text-white"
                  : "bg-[#F8F7FF] text-[#1C01A5] ring-2 ring-[#1C01A5]/15"
            }`}
          >
            {angka}
          </button>
        ))}
      </div>
      {pilih === benar ? <p className="mt-2 text-sm font-bold text-emerald-800">Tik-tik! Toki turun!</p> : null}
      {pilih && pilih !== benar ? (
        <p className="mt-2 text-sm font-bold text-rose-800">Toki naik 1 tingkat. Kunci tidak berkurang. Coba lagi.</p>
      ) : null}
    </article>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB6.kartu[2];
  const [level, setLevel] = useState([false, false, false]);
  const sudahLevel = useRef([false, false, false]);
  const [jam, setJam] = useState(false);
  const [naik, setNaik] = useState(0);
  const [jalur, setJalur] = useState<"" | "lift" | "tali">("");
  const poin = (level[0] ? 1 : 0) + (level[1] ? 2 : 0) + (level[2] ? 3 : 0);
  const bonus = level.every(Boolean) && !jam ? 1 : 0;
  const kunci = Math.max(0, poin - (jam ? 1 : 0) + bonus);
  const selesai = (indeks: number) => {
    setLevel((lama) => lama.map((item, i) => (i === indeks ? true : item)));
  };
  useEffect(() => {
    level.forEach((item, indeks) => {
      if (!item || sudahLevel.current[indeks]) return;
      sudahLevel.current[indeks] = true;
      kuis?.tandaiBenar(idKuis("C", indeks));
    });
  }, [level, kuis]);
  const ceritaTiga =
    jalur === "tali"
      ? "Aku punya 15 balok. Sebanyak 8 balok sudah dipakai membuat tangga. Berapa sisanya?"
      : "Hitung langsung: 15 – 8. Sampai di angka berapa?";
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🗼⏱️🐭"
        judul={kartu.judul}
        anak="Turunkan Toki lewat tangga hitung"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <p className="mt-4 text-sm font-semibold text-slate-700">
        Toki di puncak menara. Jawaban benar membuatnya turun. Jawaban salah membuatnya naik satu tingkat.
      </p>
      <p className="mt-3 text-sm font-black text-[#1C01A5]">Kunci 🗝️ {kunci}</p>
      {naik > 0 ? (
        <p className="mt-1 text-sm font-semibold text-rose-800">Toki sudah naik {naik} kali. Ia belum jatuh, hanya naik satu tingkat.</p>
      ) : null}
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setJalur("lift")}
          className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold ${
            jalur === "lift" ? "border-[#1C01A5] bg-[#1C01A5] text-white" : "border-[#1C01A5]/20 bg-white text-[#1C01A5]"
          }`}
        >
          Lift cepat. Soal langsung di pintu terakhir.
        </button>
        <button
          type="button"
          onClick={() => setJalur("tali")}
          className={`rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold ${
            jalur === "tali" ? "border-amber-500 bg-amber-500 text-white" : "border-amber-300 bg-amber-50 text-amber-950"
          }`}
        >
          Tali ajaib. Pintu terakhir berupa soal cerita.
        </button>
      </div>
      <div className="mt-4 space-y-3">
        <PintuAngka
          judul="Level 1 · Tangga maju"
          cerita="Toki di tingkat 8. Tangga di bawahnya +6. Hitung: 9, 10, 11, 12, 13, 14."
          pilihan={["12", "13", "14", "15"]}
          benar="14"
          onBenar={() => selesai(0)}
          onSalah={() => setNaik((n) => n + 1)}
        />
        <PintuAngka
          judul="Level 2 · Tangga mundur"
          cerita="Toki di tingkat 16. Tangga di bawahnya –7. Hitung mundur sampai berhenti."
          pilihan={["7", "8", "9", "10"]}
          benar="9"
          onBenar={() => selesai(1)}
          onSalah={() => setNaik((n) => n + 1)}
        />
        {jalur ? (
          <PintuAngka
            judul="Level 3 · Pintu terkunci"
            cerita={ceritaTiga}
            pilihan={["5", "6", "7", "8"]}
            benar="7"
            onBenar={() => selesai(2)}
            onSalah={() => setNaik((n) => n + 1)}
          />
        ) : (
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-bold text-[#1C01A5]">
            Pilih lift atau tali dulu, baru pintu terakhir bisa dibuka.
          </p>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700">
        Cara pecah pintu terakhir: 15 – 5 = 10, lalu 10 – 3 = 7.
      </p>
      <button
        type="button"
        disabled={jam || kunci < 1}
        onClick={() => {
          if (!jam && kunci >= 1) setJam(true);
        }}
        className="mt-3 rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Pakai jam Toki · 1 kunci
      </button>
      {jam ? (
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Garis bilangan: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20. Lompat maju ke kanan, lompat mundur ke kiri.
        </p>
      ) : null}
      <article className="mt-4 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 px-4 py-3">
        <p className="text-sm font-black text-[#1C01A5]">Mode bersama</p>
        <p className="mt-1 text-sm font-semibold text-slate-700">
          Pemain A hitung maju dari 10 sebanyak 4, berhenti di 14. Pemain B hitung mundur dari 18 sebanyak 4, berhenti di 14. Mereka bertemu di angka yang sama.
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-700">Dua langkah di menara: 10 + 5 = 15, lalu 15 – 3 = 12.</p>
      </article>
      {level.every(Boolean) ? (
        <p className="mt-3 text-sm font-black text-emerald-800">
          Tiga pintu terbuka. Kunci terkumpul {kunci}. Kandang emas butuh 20 kunci, dan Toki sudah semakin dekat!
        </p>
      ) : null}
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="mt-2 text-sm font-semibold text-slate-700">Menara tingkat 11. Tangga +5.</p>
        <SoalRekamSuara
          id={idKuis("C", 3)}
          pertanyaan="Aku di tingkat 11 dan tangga di bawahku tambah 5. Aku sampai di tingkat berapa? Ucapkan jawabannya!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam belas", "16"])}
          petunjuk="Sebutkan tingkat berhentinya."
        />
      </div>
      <div className="mt-4">
        <TulisBebas
          id={idKuisTulisKartu(ID, "C")}
          pertanyaan="Hitung 9 + 7 – 4. Tulis kedua langkahnya!"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">9 + 7 = ⬜, lalu ⬜ – 4 = ⬜</p>}
          pesanSalah="Jumlahkan dulu, baru kurangkan."
          umpan="9 + 7 = 16, lalu 16 – 4 = 12."
          konteks="Dua langkah: 9 ditambah 7 sama dengan 16, lalu 16 dikurangi 4 sama dengan 12."
          periksa={jawabDuaLangkah}
        />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB6.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const [tokoSuara, setTokoSuara] = useState(false);
  const [tokoTulis, setTokoTulis] = useState(false);
  const [kelerengSuara, setKelerengSuara] = useState(false);
  const [kelerengTulis, setKelerengTulis] = useState(false);
  const sudahToko = useRef(false);
  const sudahKelereng = useRef(false);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "⏰ Jaganya Jam Ajaib" : skor >= 6 ? "🪢 Insinyur Penyelamat" : "🐭 Sahabat Toki";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu bisa hitung maju dan mundur!"
      : skor >= 6
        ? "Hebat! Sedikit lagi Toki bebas!"
        : "Ayo coba lagi bersama Toki, kamu pasti bisa!";
  useEffect(() => {
    if (!tokoSuara || !tokoTulis || sudahToko.current) return;
    sudahToko.current = true;
    kuis?.tandaiBenar(idKuis("D", 6));
  }, [tokoSuara, tokoTulis, kuis]);
  useEffect(() => {
    if (!kelerengSuara || !kelerengTulis || sudahKelereng.current) return;
    sudahKelereng.current = true;
    kuis?.tandaiBenar(idKuis("D", 8));
  }, [kelerengSuara, kelerengTulis, kuis]);
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝⏰"
        judul={kartu.judul}
        anak="Tantangan para penyelamat"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
        <li>Tambah? Hitung maju. 12 + 5 berhenti di 17.</li>
        <li>Kurang? Hitung mundur. 18 – 6 berhenti di 12.</li>
        <li>Belasan selalu punya 10 di dalamnya. 14 = 10 + 4.</li>
        <li>Kejar sepuluh dulu, sisanya gampang. 9 + 6 = 10 + 5 = 15.</li>
        <li>Habiskan satuan dulu. 14 – 6 = 10 – 2 = 8.</li>
        <li>Satu keluarga angka, tiga kalimat. 8 + 7 = 15, 15 – 7 = 8, 15 – 8 = 7.</li>
        <li>Baca soal, cari kata kunci, lalu hitung.</li>
      </ul>
      <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-black text-[#1C01A5]">
        Maju ke kanan, mundur ke kiri. Pecah lewat sepuluh, Toki tersenyum lagi!
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
        <TulisBebas
          id={idKuis("D", 2)}
          judul="3. Pecah angkanya"
          visual={<p className="text-center text-3xl font-black text-[#1C01A5]">18</p>}
          pertanyaan="Pecah angka 18 jadi dua bagian!"
          pesanSalah="18 = 10 + 8."
          umpan="18 = 10 + 8."
          konteks="Benar jika terbaca 10 dan 8, bukan 18 saja dan bukan 81."
          periksa={pecahDelapanBelas}
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Bayu berkata: 13 + 5 = 17.</p>
          <SoalRekamSuara
            id={idKuis("D", 3)}
            pertanyaan='4. Apakah Bayu benar? Ucapkan "Benar" atau "Salah", lalu sebutkan jawaban yang benar.'
            periksa={(transkrip) => ucapanMemuat(transkrip, [["salah"], ["18", "delapan belas"]])}
            petunjuk="Katakan salah, lalu sebutkan hasil yang benar."
          />
        </div>
        <TulisBebas
          id={idKuis("D", 4)}
          judul="5. Cara cepat ke sepuluh"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">8 + ⬜ = 10, lalu 10 + ⬜ = ⬜</p>}
          pertanyaan="Hitung 8 + 9 dengan cara kejar sepuluh. Tulis kedua langkahnya!"
          pesanSalah="8 butuh 2 untuk jadi 10. Sisa dari 9 adalah 7."
          umpan="8 + 2 = 10, lalu 10 + 7 = 17."
          konteks="Benar jika kedua langkah terbaca: 8 + 2 = 10 dan 10 + 7 = 17."
          periksa={kejarDelapanSembilan}
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
        <TulisBebas
          id={`${ID}-D-toko`}
          judul="7. Harga di toko kue"
          visual={<p className="text-center text-sm font-semibold text-slate-700">Donat 11 koin. Kue 16 koin. Naya punya 15 koin.</p>}
          pertanyaan="Berapa koin lagi yang dibutuhkan untuk barang yang belum terbeli?"
          pesanSalah="Kue harganya 16. Naya punya 15."
          umpan="Butuh 1 koin lagi untuk kue."
          alias={["1", "satu"]}
          konteks="Yang kurang untuk kue adalah 1 koin, bukan 11 dan bukan 16."
          periksa={(teks) => jawabanTulisMemuatAlias(teks, ["1", "satu"])}
          sesudahBenar={() => setTokoTulis(true)}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="7. Barang mana yang bisa dibeli Naya? Ucapkan donat atau kue."
          periksa={(transkrip) => {
            const n = normalisasiJawabanTulis(transkrip);
            return n.includes("donat") && !n.includes("kue");
          }}
          petunjuk="Bandingkan 15 koin dengan harga donat dan kue."
          sesudahNilai={(benar) => {
            if (benar) setTokoSuara(true);
          }}
        />
        <TulisBebas
          id={idKuis("D", 7)}
          judul="8. Bikin dua cara"
          pertanyaan="Tulis 2 cara berbeda supaya hasilnya 14. Satu tambah, satu kurang."
          pesanSalah="Contoh bentuknya 7 + 7 = 14 dan 18 – 4 = 14."
          umpan="Ada banyak jawaban. Yang penting satu tambah dan satu kurang, keduanya 14."
          konteks="Benar jika ada penjumlahan dan pengurangan yang sama-sama menghasilkan 14."
          periksa={duaCaraEmpatBelas}
        />
        <TulisBebas
          id={`${ID}-D-kelereng`}
          judul="9. Kelereng hilang"
          visual={<p className="text-center text-sm font-semibold text-slate-700">17 kelereng, 9 jatuh ke selokan.</p>}
          pertanyaan="Tulis kalimat matematikanya!"
          pesanSalah="17 dikurangi 9."
          umpan="17 – 9 = 8."
          alias={["17-9=8"]}
          konteks="17 kelereng dikurangi 9 sama dengan 8."
          periksa={kelerengSisa}
          sesudahBenar={() => setKelerengTulis(true)}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="9. Sisanya berapa? Ucapkan jumlah kelereng yang masih ada."
          periksa={(transkrip) => {
            const n = normalisasiJawabanTulis(transkrip);
            if (n.includes("belas")) return false;
            return jawabanTulisMemuatAlias(transkrip, ["delapan", "8"]);
          }}
          petunjuk="Sebutkan sisa kelerengnya."
          sesudahNilai={(benar) => {
            if (benar) setKelerengSuara(true);
          }}
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Soal dua langkah"
          visual={<p className="text-center text-sm font-semibold text-slate-700">12 balon. Dibeli 5. Datang lagi 8.</p>}
          pertanyaan="Berapa balon di toko sekarang? Tulis dua langkahnya!"
          pesanSalah="Kurangi dulu, baru tambahkan kiriman baru."
          umpan="12 – 5 = 7, lalu 7 + 8 = 15."
          konteks="Langkah pertama 12 dikurangi 5 sama dengan 7. Langkah kedua 7 ditambah 8 sama dengan 15."
          periksa={duaLangkahBalon}
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
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
