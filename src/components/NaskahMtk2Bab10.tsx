"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB10 } from "@/lib/modul-resmi-mtk-2-bab10";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB10.id, "D", indeks);
}

function PapanPerkalian({
  atas,
  pengali,
  hasil,
  labelAtas,
  labelPengali,
}: {
  atas: [string, string];
  pengali: string;
  hasil?: [string, string];
  labelAtas?: string;
  labelPengali?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#1C01A5]/15 bg-white">
      <div className="grid grid-cols-2 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
        <span>🛍️ Puluhan</span>
        <span>🍬 Satuan</span>
      </div>
      <div className="grid grid-cols-2 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <span>{atas[0]}</span>
        <span>{atas[1]}</span>
      </div>
      {labelAtas ? (
        <p className="px-3 pb-2 text-center text-xs font-bold text-slate-500">{labelAtas}</p>
      ) : null}
      <div className="grid grid-cols-2 border-t border-[#1C01A5]/10 px-3 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <span />
        <span>{pengali}</span>
      </div>
      {labelPengali ? (
        <p className="px-3 pb-2 text-center text-xs font-bold text-slate-500">{labelPengali}</p>
      ) : null}
      <p className="border-t-2 border-[#F0AB00] bg-[#FFF8E8] px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
        ✖️
      </p>
      {hasil ? (
        <div className="grid grid-cols-2 border-t-2 border-[#1C01A5] bg-[#FEF3C7] px-3 py-3 text-center text-3xl font-black text-[#1C01A5]">
          <span>{hasil[0]}</span>
          <span>{hasil[1]}</span>
        </div>
      ) : null}
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
          pesanSalah="Kalikan dari kanan. Jangan tertukar dengan penjumlahan."
        />
      </div>
    </article>
  );
}

function KuisIsian({
  indeks,
  soal,
  alias,
  harusSemua,
  anak,
}: {
  indeks: number;
  soal: string;
  alias: string[];
  harusSemua?: boolean;
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const rapat = isi.trim().toLowerCase().replace(/\s+/g, " ");
    const ok = harusSemua
      ? alias.every((kata) => rapat.includes(kata.toLowerCase()))
      : alias.some((kata) => rapat.includes(kata.toLowerCase()));
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

function JurnalPesananSani() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "ajaib", ikon: "😀", teks: "Sangat ajaib! Menghitung perkalian angka besar ternyata bisa secepat ini." },
    { id: "hati", ikon: "😐", teks: "Aku harus berhati-hati agar tidak lupa urutan perkalian silangnya." },
    { id: "tertukar", ikon: "😢", teks: "Aku masih sering tertukar antara menjumlahkan dan mengalikan angkanya." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah bisa menghitung perkalian angka belasan hari ini? Ketuk satu wajah.
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

function LembarEvaluasiBelasan() {
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
          soal="1. Edo menghitung 13 × 2 bersusun seperti di bawah. Udin bilang salah pada kolom satuan. Kesalahan apa yang dilakukan Edo?"
          benar="B"
          anak={
            <PapanPerkalian
              atas={["1", "3"]}
              pengali="2"
              hasil={["2", "5"]}
              labelAtas="Tulisan Edo (13)"
              labelPengali="Dikalikan 2"
            />
          }
          pilihan={[
            { huruf: "A", teks: "Edo salah mengalikan 2 × 1 pada kolom puluhan." },
            { huruf: "B", teks: "Edo malah menjumlahkan 3 + 2 pada kolom satuan (seharusnya 3 × 2 = 6)." },
            { huruf: "C", teks: "Hasil Edo sudah benar dan tidak ada yang salah." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Setiap kotak Siti berisi 11 permen cokelat. Total seluruh permen 44 butir. Berapa jumlah kotak hadiah Siti?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "3 buah kotak" },
            { huruf: "B", teks: "4 buah kotak" },
            { huruf: "C", teks: "5 buah kotak" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Jika 14 dikalikan dengan aku, hasilnya 28. Angka berapakah aku?"
          benar="A"
          anak={
            <PapanPerkalian
              atas={["1", "4"]}
              pengali="?"
              hasil={["2", "8"]}
              labelAtas="14"
              labelPengali="Angka misteri"
            />
          }
          pilihan={[
            { huruf: "A", teks: "Angka 2" },
            { huruf: "B", teks: "Angka 4" },
            { huruf: "C", teks: "Angka 3" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Lani membeli 3 bungkus lolipop. Setiap bungkus berisi 12 butir. Jumlah seluruhnya jika dihitung bersusun?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "36 permen" },
            { huruf: "B", teks: "15 permen" },
            { huruf: "C", teks: "32 permen" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Keranjang A berisi 11 × 5. Keranjang B berisi 12 × 4. Pernyataan yang paling tepat?"
          benar="C"
          pilihan={[
            { huruf: "A", teks: "Isi Keranjang A jumlahnya sama banyak dengan isi Keranjang B." },
            { huruf: "B", teks: "Isi Keranjang A jumlahnya lebih sedikit daripada isi Keranjang B." },
            { huruf: "C", teks: "Isi Keranjang A jumlahnya lebih banyak daripada isi Keranjang B." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat & Penalaran</h5>
        <KuisIsian
          indeks={5}
          soal="6. Selesaikan perkalian bersusun bilangan belasan di bawah ini dengan teliti."
          alias={["69"]}
          anak={
            <PapanPerkalian
              atas={["2", "3"]}
              pengali="3"
              labelAtas="23"
              labelPengali="Dikalikan 3"
            />
          }
        />
        <KuisIsian
          indeks={6}
          soal="7. Dodi punya 3 kantong. Setiap kantong berisi 13 permen anggur. Di jalan ia memberi 10 butir kepada adiknya. Berapa sisa permen Dodi? (Kalikan dulu, lalu kurangkan.)"
          alias={["29"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. Cocokkan kisah pembeli dengan operasi perkalian yang tepat."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>(1) Mita membeli 2 kantong. Setiap kantong berisi 14 permen karet.</p>
              <p>(2) Toni membeli 2 kantong. Setiap kantong berisi 12 permen susu.</p>
              <p className="mt-2">A. 12 × 2</p>
              <p>B. 14 × 2</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Tentukan angka rahasia di dalam kotak agar perkalian bersusun menjadi benar."
          alias={["2"]}
          anak={
            <PapanPerkalian
              atas={["1", "📦"]}
              pengali="2"
              hasil={["2", "4"]}
              labelAtas="1 dan kotak rahasia"
              labelPengali="Dikalikan 2"
            />
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Riko punya kartu 2 dan kartu 3 untuk mengisi kotak 12 × [?]. Kartu mana yang membuat hasil paling besar? Contoh: 3 karena 36"
          alias={["3"]}
          anak={
            <PapanPerkalian
              atas={["1", "2"]}
              pengali="?"
              labelAtas="12"
              labelPengali="Kartu 2 atau 3"
            />
          }
        />
      </section>
    </div>
  );
}

function AktivitasAsistenPesanan() {
  const kuis = useKuisMateri();
  const [aP, setAP] = useState("");
  const [aS, setAS] = useState("");
  const [bP, setBP] = useState("");
  const [bS, setBS] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okA = aP.trim() === "3" && aS.trim() === "9";
    const okB = bP.trim() === "2" && bS.trim() === "8";
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB10.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB10.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB10.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">
        🕵️‍♂️ Aktivitas 1: Menjadi Asisten Sani Menghitung Pesanan ✖️
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Hitung dari kolom paling kanan. Kalikan angka bawah ke kanan atas dulu, baru ke kiri atas.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-black text-[#1C01A5]">Pesanan A (Rasa Stroberi)</p>
          <PapanPerkalian
            atas={["1", "3"]}
            pengali="3"
            labelAtas="13"
            labelPengali="3 kotak"
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              value={aP}
              onChange={(e) => setAP(e.target.value)}
              className="rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold"
              placeholder="🛍️"
              inputMode="numeric"
            />
            <input
              value={aS}
              onChange={(e) => setAS(e.target.value)}
              className="rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold"
              placeholder="🍬"
              inputMode="numeric"
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-black text-[#1C01A5]">Pesanan B (Rasa Jeruk)</p>
          <PapanPerkalian
            atas={["1", "4"]}
            pengali="2"
            labelAtas="14"
            labelPengali="2 kotak"
          />
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input
              value={bP}
              onChange={(e) => setBP(e.target.value)}
              className="rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold"
              placeholder="🛍️"
              inputMode="numeric"
            />
            <input
              value={bS}
              onChange={(e) => setBS(e.target.value)}
              className="rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold"
              placeholder="🍬"
              inputMode="numeric"
            />
          </div>
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
          cuplikan={[aP, aS, bP, bS].filter(Boolean).join(" · ") || undefined}
          pesanSalah="A: 13 × 3 = 39. B: 14 × 2 = 28. Kalikan dari kanan."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanBelasan() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "Jalur kanan 4 × 2", label: "Hasil satuan 12 × 4", benar: "8" },
    { gambar: "Jalur kiri 4 × 1", label: "Hasil puluhan 12 × 4", benar: "4" },
    { gambar: "12 × 4 bersusun", label: "Total pesanan Ibu Guru", benar: "48" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB10.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 0 ? ["6", "8", "2"] : indeks === 1 ? ["4", "1", "5"] : ["16", "48", "124"];
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
                pesanSalah="Kalikan angka bawah ke kanan atas dulu, baru ke kiri."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab10({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB10;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒📦✖️
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
            🎯 Aku bisa menghitung perkalian bilangan belasan dengan angka satuan secara cepat.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menyelesaikan perkalian besar menggunakan metode perkalian bersusun pendek.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Pesanan untuk Acara Sekolah
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, Toko Permen Sani mendapat kejutan besar! Ibu Guru dari Sekolah Juara memesan 4 kotak
              kardus. Setiap kotak diisi tepat 12 butir permen karet.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🏫📦🍬🍬
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">4 kotak · 12 permen tiap kotak</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Kalau aku hitung pakai penjumlahan berulang 12 + 12 + 12 + 12, angkanya terlalu besar dan aku
              takut salah hitung di tengah jalan.”
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#0F766E]/20 bg-[#F0FDFA] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#0F766E]">Lani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Jangan khawatir Sani! Kita bisa memakai cara Perkalian Susun Pendek agar hitungannya langsung
              ketemu dalam hitungan detik!”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani menghitung pesanan besar ini!
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
          🛍️✖️🍬
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
          ✖️ Trik Perkalian Bersusun · 12 × 4
        </p>
        <div className="mx-auto mt-3 max-w-xs">
          <PapanPerkalian
            atas={["1", "2"]}
            pengali="4"
            hasil={["4", "8"]}
            labelAtas="Isi per kotak (12)"
            labelPengali="Banyaknya kotak (4)"
          />
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] px-4 py-3">
            <p className="text-sm font-black text-[#1C01A5]">🥋 Langkah 1 · Jalur kanan (satuan)</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Angka bawah dikalikan satuan atas: 4 × 2 = 8. Tulis 8 di kolom satuan.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] px-4 py-3">
            <p className="text-sm font-black text-[#1C01A5]">🥋 Langkah 2 · Jalur kiri (puluhan)</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Angka bawah dikalikan puluhan atas: 4 × 1 = 4. Tulis 4 di kolom puluhan.
            </p>
          </article>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Hasil akhir</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            48 dibaca empat puluh delapan. Jadi total permen pesanan Ibu Guru adalah 48 butir. Jangan
            sampai terbalik: kalikan dari kanan dulu, baru ke kiri!
          </p>
        </article>
        <KuisMencocokkanBelasan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB10.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 12 × 4 = 48."
          alias={kumpulkanAlias(["48", "12 × 4", "kanan", "8"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️📦✖️
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
        <AktivitasAsistenPesanan />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalPesananSani />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝✖️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Perkalian Bilangan Belasan
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
        <LembarEvaluasiBelasan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB10.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 36 atau 29."
          alias={kumpulkanAlias(["36", "44", "69", "29", "28"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
