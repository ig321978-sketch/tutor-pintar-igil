"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB4 } from "@/lib/modul-resmi-mtk-2-bab4";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB4.id, "D", indeks);
}

function GambarSegitiga() {
  return (
    <svg viewBox="0 0 80 70" className="mx-auto h-20 w-24" aria-hidden>
      <polygon points="40,8 72,62 8,62" fill="#FEF3C7" stroke="#1C01A5" strokeWidth="3" />
    </svg>
  );
}

function GambarSegiEmpat() {
  return (
    <svg viewBox="0 0 80 60" className="mx-auto h-16 w-24" aria-hidden>
      <rect x="10" y="10" width="60" height="40" fill="#DBEAFE" stroke="#1C01A5" strokeWidth="3" />
    </svg>
  );
}

function GambarLingkaran() {
  return (
    <svg viewBox="0 0 80 80" className="mx-auto h-20 w-20" aria-hidden>
      <circle cx="40" cy="40" r="28" fill="#FEF9C3" stroke="#1C01A5" strokeWidth="3" />
    </svg>
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
          pesanSalah="Coba hitung lagi sisi dan sudutnya."
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

function JurnalBungkusUnik() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Seru sekali, sekarang aku tahu nama-nama pojokan bangun datar!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung menghitung sisi pada lingkaran." },
    { id: "susah", ikon: "😢", teks: "Aku masih butuh bantuan tutor untuk membedakan sisi dan sudut." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar tentang bentuk bungkus permen hari ini? Ketuk satu
        wajah.
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

function LembarEvaluasiBungkusUnik() {
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
          soal='1. Beni menggelindingkan permen cokelat (segi empat), lolipop (segitiga), dan koin (lingkaran). Ia berkata semua pasti menggelinding mulus. Apakah pendapat Beni benar?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Benar, karena semua permen memiliki berat yang sama di meja." },
            {
              huruf: "B",
              teks: "Salah, hanya Permen Koin (Lingkaran) yang bisa menggelinding mulus karena ia tidak memiliki sudut.",
            },
            { huruf: "C", teks: "Salah, hanya Permen Cokelat yang bisa menggelinding karena memiliki 4 sisi tegak." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Siti memotong kertas segi empat tepat di tengah secara miring (diagonal) dari pojok ke pojok. Menjadi bentuk apakah potongannya sekarang?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Dua buah bangun Segitiga" },
            { huruf: "B", teks: "Dua buah bangun Segi Empat yang lebih kecil" },
            { huruf: "C", teks: "Satu buah bangun Lingkaran" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Jumlah sisiku ditambah jumlah sudutku hasilnya 6. Aku punya pojokan sama banyak dengan sisiku. Bangun apakah aku?"
          benar="C"
          pilihan={[
            { huruf: "A", teks: "Lingkaran" },
            { huruf: "B", teks: "Segi Empat" },
            { huruf: "C", teks: "Segitiga" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Perhatikan cetakan kue permen berbentuk atap. Ada berapa jumlah sisi dan sudutnya?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "4 Sisi dan 4 Sudut" },
            { huruf: "B", teks: "3 Sisi dan 3 Sudut" },
            { huruf: "C", teks: "1 Sisi dan 0 Sudut" },
          ]}
          anak={<GambarSegitiga />}
        />
        <KuisPilih
          indeks={4}
          soal="5. Dodi menempel dua segitiga sama persis pada satu sisi miring hingga rapat. Bangun datar baru yang terbentuk..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Segi Empat" },
            { huruf: "B", teks: "Lingkaran" },
            { huruf: "C", teks: "Tetap menjadi satu Segitiga besar" },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Bangun datar yang hanya memiliki 1 sisi melingkar dan tidak memiliki sudut dinamakan..."
          alias={["lingkaran"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. (1) Ubin lantai kotak (2) Roda gerobak permen (3) Penggaris besi segitiga (4) Buku catatan persegi panjang. Nomor mana yang termasuk segi empat?"
          alias={["1", "4"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. (1) Aku punya 4 sudut dan sisiku tegak lurus. (2) Sudutku ada 3 saja. Pasangkan dengan A Segitiga atau B Segi Empat."
          alias={["b", "a"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>A. Segitiga</p>
              <p>B. Segi Empat</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Riko membuat pagar segi empat dari stik es krim. 1 stik patah dan hilang. Sisa stik membentuk bangun..."
          alias={["segitiga"]}
        />
        <KuisIsian
          indeks={9}
          soal="10. Di dinding ada 2 bungkus segitiga dan 1 bungkus segi empat. Berapa total seluruh sudutnya?"
          alias={["10", "sepuluh"]}
        />
      </section>

    </div>
  );
}

function AktivitasDetektifTepi() {
  const kuis = useKuisMateri();
  const [aSisi, setASisi] = useState("");
  const [aSudut, setASudut] = useState("");
  const [aNama, setANama] = useState("");
  const [bSisi, setBSisi] = useState("");
  const [bSudut, setBSudut] = useState("");
  const [bNama, setBNama] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okA =
      ["3", "tiga"].includes(aSisi.trim().toLowerCase()) &&
      ["3", "tiga"].includes(aSudut.trim().toLowerCase()) &&
      aNama.trim().toLowerCase().includes("segitiga");
    const okB =
      ["4", "empat"].includes(bSisi.trim().toLowerCase()) &&
      ["4", "empat"].includes(bSudut.trim().toLowerCase()) &&
      bNama.trim().toLowerCase().replace(/\s+/g, "").includes("segiempat");
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB4.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB4.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB4.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Detektif Garis Tepi</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Hitung garis tepi (sisi) dan pojokan lancip (sudut), lalu tulis nama bangunnya.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-3">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Bungkus Permen A</p>
          <GambarSegitiga />
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Ada berapa garis tepinya (Sisi)?
            <input
              value={aSisi}
              onChange={(e) => setASisi(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
            />
          </label>
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Ada berapa pojokan lancipnya (Sudut)?
            <input
              value={aSudut}
              onChange={(e) => setASudut(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
            />
          </label>
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Bentuk bangun datar ini dinamakan
            <input
              value={aNama}
              onChange={(e) => setANama(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
              placeholder="segitiga"
            />
          </label>
        </div>
        <div className="rounded-xl bg-white p-3">
          <p className="text-xs font-black uppercase text-[#1C01A5]">Bungkus Permen B</p>
          <GambarSegiEmpat />
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Ada berapa garis tepinya (Sisi)?
            <input
              value={bSisi}
              onChange={(e) => setBSisi(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
            />
          </label>
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Ada berapa pojokan lancipnya (Sudut)?
            <input
              value={bSudut}
              onChange={(e) => setBSudut(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
            />
          </label>
          <label className="mt-2 block text-xs font-bold text-[#1C01A5]">
            Bentuk bangun datar ini dinamakan
            <input
              value={bNama}
              onChange={(e) => setBNama(e.target.value)}
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 font-extrabold"
              placeholder="segi empat"
            />
          </label>
        </div>
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
          cuplikan={[aSisi, aSudut, aNama, bSisi, bSudut, bNama].filter(Boolean).join(" · ") || undefined}
          pesanSalah="A = 3 sisi 3 sudut. B = 4 sisi 4 sudut."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanBangun() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: <GambarSegiEmpat />, label: "Bungkus cokelat kotak", benar: "4 sisi 4 sudut" },
    { gambar: <GambarSegitiga />, label: "Bungkus lolipop atap", benar: "3 sisi 3 sudut" },
    { gambar: <GambarLingkaran />, label: "Bungkus permen koin", benar: "1 sisi 0 sudut" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke cirinya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB4.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article key={item.label} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            {item.gambar}
            <p className="mt-1 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["4 sisi 4 sudut", "3 sisi 3 sudut", "1 sisi 0 sudut"].map((ciri) => (
                <button
                  key={ciri}
                  type="button"
                  onClick={() => {
                    setPilihan((sebelum) => ({ ...sebelum, [indeks]: ciri }));
                    if (ciri === item.benar) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-3 py-2 text-sm font-black ${kelasTombolHasilKuis(
                    ketuk,
                    ciri,
                    item.benar,
                    "bg-[#1C01A5] text-white hover:bg-[#16017a]",
                  )}`}
                >
                  {ciri}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis
                status={status}
                cuplikan={ketuk || undefined}
                pesanSalah="Coba ciri yang lain."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab4({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB4;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🟥🔺🟡
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
            🎯 Aku bisa mengenal bentuk-bentuk bangun datar (Segitiga, Segi Empat, dan Lingkaran)
            lewat benda di sekitarku.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menghitung jumlah Sisi dan Sudut pada bangun datar dengan tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Oleh-oleh Permen dari Paman
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Paman datang membawa satu toples besar berisi permen. Saat dikeluarkan, Sani takjub:
              ada bungkus kotak kaku, ada yang lancip seperti atap rumah, dan ada yang melingkar
              rapi.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl bg-white px-3 py-2 text-center">
                <GambarSegiEmpat />
                <p className="text-xs font-black text-[#1C01A5]">Cokelat kotak</p>
              </div>
              <div className="rounded-xl bg-white px-3 py-2 text-center">
                <GambarSegitiga />
                <p className="text-xs font-black text-[#1C01A5]">Lolipop atap</p>
              </div>
              <div className="rounded-xl bg-white px-3 py-2 text-center">
                <GambarLingkaran />
                <p className="text-xs font-black text-[#1C01A5]">Permen koin</p>
              </div>
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Bentuk bungkus permen ini beda-beda ya, ada yang punya pojokan tajam dan ada yang
              tidak.”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani mengelompokkan permen berdasarkan bentuk pinggirannya!
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
          📐🟥🔺🟡
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
        <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Infografis: Sisi, Sudut, dan Tiga Kelompok Bungkus
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Bangun</span>
            <span>Sisi</span>
            <span>Sudut</span>
          </div>
          {[
            ["🟥 Segi empat", "4", "4"],
            ["🔺 Segitiga", "3", "3"],
            ["🟡 Lingkaran", "1 melingkar", "0"],
          ].map((baris, i) => (
            <div
              key={baris[0]}
              className={`grid grid-cols-3 border-t border-[#F0AB00]/40 px-3 py-3 text-center text-sm font-bold ${
                i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
              }`}
            >
              {baris.map((sel) => (
                <span key={sel}>{sel}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-3 py-3 text-center">
            <GambarSegiEmpat />
            <p className="mt-2 text-sm font-black text-[#1C01A5]">Segi Empat</p>
            <p className="text-xs font-semibold text-slate-600">4 sisi dan 4 sudut</p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-3 py-3 text-center">
            <GambarSegitiga />
            <p className="mt-2 text-sm font-black text-[#1C01A5]">Segitiga</p>
            <p className="text-xs font-semibold text-slate-600">3 sisi dan 3 sudut</p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-3 py-3 text-center">
            <GambarLingkaran />
            <p className="mt-2 text-sm font-black text-[#1C01A5]">Lingkaran</p>
            <p className="text-xs font-semibold text-slate-600">1 sisi, 0 sudut</p>
          </article>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Sisi adalah garis tepi. Sudut adalah pojokan lancip tempat dua garis bertemu. Lingkaran
            tidak punya pojokan, jadi sudutnya nol!
          </p>
        </article>
        <KuisMencocokkanBangun />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB4.id, "B")}
          pertanyaan="Tuliskan satu ciri, misalnya segitiga 3 sisi 3 sudut."
          alias={kumpulkanAlias(["4 sisi", "3 sisi", "0 sudut", "lingkaran"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🔺🟥
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
        <AktivitasDetektifTepi />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalBungkusUnik />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🍓
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Geometri Bangun Datar
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
        <LembarEvaluasiBungkusUnik />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB4.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya lingkaran atau 10."
          alias={kumpulkanAlias(["lingkaran", "segitiga", "segi empat", "10", "3", "4"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
