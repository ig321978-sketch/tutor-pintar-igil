"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB11 } from "@/lib/modul-resmi-mtk-2-bab11";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB11.id, "D", indeks);
}

function KotakUtuh() {
  return (
    <div className="mx-auto h-20 w-24 rounded-md border-4 border-[#1C01A5] bg-[#FECACA]" aria-hidden />
  );
}

function KotakDiagonal() {
  return (
    <div
      className="mx-auto h-20 w-24 overflow-hidden rounded-md border-4 border-[#1C01A5]"
      style={{
        background:
          "linear-gradient(to top right, #FECACA 0 49%, #1C01A5 49% 51%, #FDE68A 51% 100%)",
      }}
      aria-hidden
    />
  );
}

function DuaSegitiga() {
  return (
    <div className="flex items-end justify-center gap-3" aria-hidden>
      <div
        className="h-0 w-0 border-x-[28px] border-b-[48px] border-x-transparent border-b-[#F59E0B]"
      />
      <div
        className="h-0 w-0 border-x-[28px] border-b-[48px] border-x-transparent border-b-[#F59E0B]"
      />
    </div>
  );
}

function RumahSani() {
  return (
    <div className="flex flex-col items-center" aria-hidden>
      <div className="h-0 w-0 border-x-[36px] border-b-[32px] border-x-transparent border-b-[#F59E0B]" />
      <div className="h-14 w-[72px] border-4 border-[#1C01A5] bg-[#FECACA]" />
    </div>
  );
}

function KuisPilih({
  indeks,
  soal,
  pilihan,
  benar,
  anak,
}: {
  indeks: number;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3">{anak}</div> : null}
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
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Bayangkan potong miring atau potong lurus, lalu lihat wujud barunya."
        />
      </div>
    </article>
  );
}

function KuisIsian({
  indeks,
  soal,
  alias,
  anak,
}: {
  indeks: number;
  soal: string;
  alias: string[];
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const rapat = isi.trim().toLowerCase().replace(/\s+/g, " ");
    const ok = alias.some((kata) => rapat.includes(kata.toLowerCase()));
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</p>
      {anak ? <div className="mt-3">{anak}</div> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          className="min-w-[8rem] flex-1 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder="__________"
        />
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={isi.trim() || undefined}
          pesanSalah="Coba pikirkan lagi dari petunjuknya."
        />
      </div>
    </article>
  );
}

function JurnalPapanCatur() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat seru! Bangun datar ternyata seperti mainan puzzle ajaib." },
    { id: "pelan", ikon: "😐", teks: "Aku harus membayangkan bentuknya pelan-pelan agar tidak salah menebak." },
    { id: "bingung", ikon: "😢", teks: "Aku masih agak bingung membedakan potong miring dan potong lurus tengah." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah tahu rahasia perubahan wujud bangun datar hari ini? Ketuk satu wajah.
      </p>
      <div className="mt-3 grid gap-2">
        {wajah.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPilih(item.id)}
            className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-bold ${
              pilih === item.id
                ? "border-[#F0AB00] bg-[#1C01A5] text-white"
                : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
            }`}
          >
            <span className="mr-2 text-2xl" aria-hidden>
              {item.ikon}
            </span>
            {item.teks}
          </button>
        ))}
      </div>
    </div>
  );
}

function LembarEvaluasiBangun() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-2">
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
            placeholder="______________________"
          />
        </label>
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Tanggal
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
          />
        </label>
      </div>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">🍓 Bagian A: Pilihan Ganda</h5>
        <KuisPilih
          indeks={0}
          soal="1. Edo menggunting kertas segi empat secara lurus dari atas ke bawah tepat di tengah (bukan miring dari pojok). Ia bilang hasilnya dua segitiga. Apakah pendapat Edo benar?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Benar, karena setiap guntingan pada segi empat pasti menghasilkan segitiga." },
            { huruf: "B", teks: "Salah, guntingan Edo menghasilkan dua buah bangun segi empat yang lebih kecil." },
            { huruf: "C", teks: "Salah, guntingan Edo mengubah kertasnya menjadi bentuk lingkaran." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Siti ingin 4 segitiga kecil. Setiap 1 segi empat dibelah miring menjadi 2 segitiga. Berapa papan segi empat besar yang harus disiapkan paman?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "2 buah papan segi empat" },
            { huruf: "B", teks: "4 buah papan segi empat" },
            { huruf: "C", teks: "1 buah papan segi empat" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Sani menempel 1 segiempat dengan 1 segitiga di sisi atasnya, sehingga bentuknya seperti rumah. Berapa jumlah sudut bangun rumah itu?"
          benar="B"
          anak={<RumahSani />}
          pilihan={[
            { huruf: "A", teks: "7 sudut" },
            { huruf: "B", teks: "5 sudut" },
            { huruf: "C", teks: "6 sudut" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Dua sapu tangan segitiga digabung dengan menempelkan garis miringnya secara pas. Wujud bangun baru yang tercipta?"
          benar="A"
          anak={
            <p className="text-center font-black tracking-widest text-[#1C01A5]" aria-hidden>
              |\ &nbsp;&nbsp; /|
              <br />
              | \ &nbsp;/ |
              <br />
              |__\/__|
            </p>
          }
          pilihan={[
            { huruf: "A", teks: "Segi empat" },
            { huruf: "B", teks: "Lingkaran" },
            { huruf: "C", teks: "Segitiga sama sisi" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Papan Hijau terbuat dari 2 segitiga yang membentuk segiempat. Papan Biru adalah 1 segiempat utuh. Pernyataan paling tepat tentang jumlah sisi luar?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Papan Hijau memiliki garis tepi luar yang lebih banyak dari Papan Biru." },
            { huruf: "B", teks: "Kedua papan memiliki jumlah garis tepi luar yang sama banyak, yaitu 4 sisi." },
            { huruf: "C", teks: "Papan Biru memiliki garis tepi luar yang lebih banyak karena tidak punya garis sambungan di tengah." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat & Penalaran</h5>
        <KuisIsian
          indeks={5}
          soal="6. Jika kita memotong sebuah persegi tepat pada garis miring diagonalnya dari pojok ke pojok, kita akan mendapatkan dua buah bangun: __________"
          alias={["segitiga"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Lani punya 3 papan segitiga. Paman membawa 2 papan segi empat. Berapa jumlah total seluruh sudut dari semua papan di meja Lani?"
          alias={["17"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. Cocokkan tindakan memotong atau menempel dengan hasil wujud bangun yang tepat."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>(1) Memotong miring bangun segiempat dari pojok ke pojok lawannya.</p>
              <p>(2) Menempelkan sisi miring 2 segitiga yang sama ukuran secara pas.</p>
              <p className="mt-2">A. Menjadi 1 segiempat besar</p>
              <p>B. Menjadi 2 segitiga kecil</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Riko memotong kertas segitiga dengan satu guntingan lurus mendatar di puncaknya, lalu membuang bagian atas. Bagian bawah yang tersisa berubah wujud menjadi: __________"
          alias={["trapesium", "segi empat", "segiempat"]}
        />
        <KuisIsian
          indeks={9}
          soal="10. Gambarlah segi empat, lalu buat garis di dalamnya sehingga terbagi menjadi tepat 4 segitiga kecil sama besar. Berapa jumlah garis lurus pembelah dari pojok ke pojok?"
          alias={["2"]}
        />
      </section>
    </div>
  );
}

function AktivitasArsitekPuzzle() {
  const kuis = useKuisMateri();
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const isiA = a.trim().toLowerCase();
    const isiB = b.trim().toLowerCase();
    const okA =
      isiA.includes("segi empat") ||
      isiA.includes("segiempat") ||
      isiA.includes("persegi panjang") ||
      isiA.includes("persegi");
    const okB =
      isiB.includes("ketupat") ||
      isiB.includes("segi empat") ||
      isiB.includes("segiempat") ||
      isiB.includes("wajik") ||
      isiB.includes("belah");
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB11.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB11.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB11.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Arsitek Puzzle Kertas 📐</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Bantu Sani menebak hasil eksperimen gunting dan tempel.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Eksperimen A · potong lurus tengah
          <p className="mt-1 text-xs font-semibold text-slate-600">
            Persegi panjang dilipat dua dari atas ke bawah secara lurus, lalu digunting di bekas lipatan.
          </p>
          <input
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="2 bangun ..."
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Eksperimen B · tempel alas segitiga
          <p className="mt-1 text-xs font-semibold text-slate-600">
            Dua cetakan kue segitiga sama kaki ditempel pada sisi bawah (alas) secara mendatar.
          </p>
          <input
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="bangun baru ..."
          />
        </label>
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={[a, b].filter(Boolean).join(" · ") || undefined}
          pesanSalah="A: dua segi empat / persegi panjang. B: belah ketupat atau segi empat."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanBangun() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "1 segiempat dipotong miring pojok ke pojok", label: "Hasil potongan", benar: "2 segitiga" },
    { gambar: "2 segitiga sama besar ditempel sisi miring", label: "Wujud baru", benar: "1 segiempat" },
    { gambar: "Potong lurus tengah, bukan miring", label: "Hasil guntingan", benar: "2 segiempat" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB11.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 0
            ? ["2 segitiga", "2 lingkaran", "1 segitiga"]
            : indeks === 1
              ? ["1 lingkaran", "1 segiempat", "3 segitiga"]
              : ["2 segitiga", "2 segiempat", "1 lingkaran"];
        return (
          <article key={item.label} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-semibold text-slate-600">{item.gambar}</p>
            <p className="mt-1 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {opsi.map((angka) => (
                <button
                  key={angka}
                  type="button"
                  onClick={() => {
                    setPilihan((sebelum) => ({ ...sebelum, [indeks]: angka }));
                    if (angka === item.benar) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
                    ketuk,
                    angka,
                    item.benar,
                    "bg-[#1C01A5] text-white hover:bg-[#16017a]",
                  )}`}
                >
                  {angka}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis
                status={status}
                cuplikan={ketuk || undefined}
                pesanSalah="Potong miring = segitiga. Potong lurus = segiempat. Tempel miring = segiempat."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab11({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB11;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🟥🔺
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuA.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuA.pengantar}
        </p>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">🌟 Target Belajarku Hari Ini</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            🎯 Aku bisa memotong bangun datar segiempat menjadi bentuk segitiga dengan tepat.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menggabungkan berbagai bangun datar untuk membentuk bangun baru yang seru.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Menghias Meja Pesta
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Toko permen Sani bersiap pesta besar! Sani ingin menghias meja kasir seperti papan catur. Yang
              ada di laci hanya kertas hias segi empat.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🟥✂️🔺
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">Kertas segi empat · gunting · puzzle</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Tapi Lani, aku tidak punya kertas berbentuk segitiga. Yang tersisa di laci hanya kertas segi
              empat ini.”
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#0F766E]/20 bg-[#F0FDFA] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#0F766E]">Lani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Mudah saja, Sani! Bangun datar itu ajaib. Kita bisa memotong dan menggabungkannya sesuka
              kita!”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani dan Lani berkreasi memotong kertas hias meja!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          ✂️🟥🔺
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuB.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuB.pengantar}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-black text-[#1C01A5]">✂️ Memotong segiempat</p>
            <div className="mt-3 grid grid-cols-2 items-center gap-3">
              <div>
                <p className="mb-2 text-center text-xs font-bold text-slate-500">Utuh</p>
                <KotakUtuh />
              </div>
              <div>
                <p className="mb-2 text-center text-xs font-bold text-slate-500">Dipotong miring</p>
                <KotakDiagonal />
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">
              1 segiempat dipotong dari pojok ke pojok (diagonal) menjadi 2 segitiga sama besar.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-black text-[#1C01A5]">🤝 Menggabungkan segitiga</p>
            <div className="mt-3">
              <DuaSegitiga />
            </div>
            <p className="mt-3 text-center text-sm font-black text-[#1C01A5]">↓ tempel sisi miring</p>
            <div className="mt-2">
              <KotakUtuh />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">
              2 segitiga sama besar ditempel sisi miringnya menjadi 1 segiempat baru.
            </p>
          </article>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Rahasia Sani</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Potong miring = segitiga. Tempel miring = segiempat. Jangan tertukar dengan potong lurus di
            tengah, karena itu tetap menghasilkan segi empat yang lebih kecil!
          </p>
        </article>
        <KuisMencocokkanBangun />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB11.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 2 segitiga atau 1 segiempat."
          alias={kumpulkanAlias(["segitiga", "segi empat", "segiempat", "2"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️📐🟥
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuC.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuC.pengantar}
        </p>
        <AktivitasArsitekPuzzle />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalPapanCatur />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🔺
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Segitiga dan Segiempat
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
          {kartuD.pengantar}
        </p>
        <LembarEvaluasiBangun />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB11.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 5 atau 17."
          alias={kumpulkanAlias(["5", "17", "2", "trapesium", "segitiga"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
