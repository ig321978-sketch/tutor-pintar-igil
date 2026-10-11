"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB12 } from "@/lib/modul-resmi-mtk-2-bab12";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB12.id, "D", indeks);
}

function PapanRibuan({
  angka,
  nilai,
}: {
  angka: [string, string, string, string];
  nilai?: [string, string, string, string];
}) {
  const kepala = ["🏠 Ribuan", "📦 Ratusan", "🛍️ Puluhan", "🍬 Satuan"];
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#1C01A5]/15 bg-white">
      <div className="grid grid-cols-4 bg-[#1C01A5] px-1 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
        {kepala.map((judul) => (
          <span key={judul}>{judul}</span>
        ))}
      </div>
      <div className="grid grid-cols-4 border-t border-[#1C01A5]/10 px-1 py-3 text-center text-2xl font-black text-[#1C01A5]">
        {angka.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
      {nilai ? (
        <div className="grid grid-cols-4 border-t-2 border-[#F0AB00] bg-[#FEF3C7] px-1 py-2 text-center text-xs font-bold text-[#1C01A5] sm:text-sm">
          {nilai.map((item) => (
            <span key={item}>{item}</span>
          ))}
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
          pesanSalah="Susun ribuan, ratusan, puluhan, satuan. Nol di tengah tidak dibaca."
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
    const rapat = isi.trim().toLowerCase().replace(/\s+/g, " ").replace(/\./g, "");
    const ok = alias.some((kata) =>
      rapat.includes(kata.toLowerCase().replace(/\./g, "")),
    );
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

function JurnalGudangPusat() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "hebat", ikon: "😀", teks: "Hebat! Aku tidak takut lagi melihat angka yang panjang dan banyak." },
    { id: "titik", ikon: "😐", teks: "Aku harus lebih teliti melihat letak tanda titiknya." },
    { id: "nol", ikon: "😢", teks: "Aku masih sering lupa membaca angka nol yang berada di tengah-tengah." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah berhasil membaca angka-angka ribuan di gudang pusat hari ini? Ketuk satu
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

function LembarEvaluasiRibuan() {
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
          soal='1. Edo membaca 4.025 dengan lantang: "empat ribu dua ratus lima!" Mengapa pembacaan Edo kurang tepat?'
          benar="B"
          anak={<PapanRibuan angka={["4", "0", "2", "5"]} nilai={["4.000", "0", "20", "5"]} />}
          pilihan={[
            { huruf: "A", teks: "Seharusnya dibaca empat ratus dua puluh lima karena angka nol di depan tidak dianggap." },
            { huruf: "B", teks: "Seharusnya dibaca empat ribu dua puluh lima, karena angka 0 di ratusan tidak perlu diucapkan kata ratus." },
            { huruf: "C", teks: "Pembacaan Edo sebenarnya sudah sepenuhnya benar." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Siti menyusun bilangan: 7 di ratusan, 2 di ribuan, 0 di puluhan, 5 di satuan. Lambang yang tepat dengan tanda titik?"
          benar="C"
          pilihan={[
            { huruf: "A", teks: "7.205" },
            { huruf: "B", teks: "2.750" },
            { huruf: "C", teks: "2.705" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Bilangan di antara 3.000 dan 4.000. Angka satuannya 9. Jika keempat digit dijumlahkan hasilnya 12. Bilangan apakah itu?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "3.090" },
            { huruf: "B", teks: "3.009" },
            { huruf: "C", teks: "3.900" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Lima ribu empat ratus tiga puluh butir permen cokelat. Penulisan lambang yang tepat?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "5.430" },
            { huruf: "B", teks: "5.403" },
            { huruf: "C", teks: "54.30" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Mesin Hijau 4.350, Mesin Biru 4.530, Mesin Merah 4.503. Urutan dari yang paling banyak?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Mesin Biru, Mesin Merah, Mesin Hijau" },
            { huruf: "B", teks: "Mesin Biru, Mesin Hijau, Mesin Merah" },
            { huruf: "C", teks: "Mesin Merah, Mesin Biru, Mesin Hijau" },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat & Penalaran</h5>
        <KuisIsian
          indeks={5}
          soal="6. Tuliskan cara membaca lambang 8.700."
          alias={["delapan ribu"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Pada 5.555, berapa selisih nilai angka 5 di tempat ribuan dengan angka 5 di tempat ratusan?"
          alias={["4500", "4.500"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. Cocokkan lambang bilangan dengan cara membacanya."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>(1) 3.040</p>
              <p>(2) 3.400</p>
              <p className="mt-2">A. Tiga ribu empat ratus</p>
              <p>B. Tiga ribu empat puluh</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Layar komputer menunjukkan 2.999. Sani memasukkan 1 butir lagi. Angka baru di layar?"
          alias={["3000", "3.000"]}
        />
        <KuisIsian
          indeks={9}
          soal="10. Kartu 1, 0, 5, dan 4. Susun bilangan ribuan paling besar. Angka 0 tidak boleh di depan."
          alias={["5410", "5.410"]}
        />
      </section>
    </div>
  );
}

function AktivitasSensorAngka() {
  const kuis = useKuisMateri();
  const [a4, setA4] = useState("");
  const [a2, setA2] = useState("");
  const [a6, setA6] = useState("");
  const [a3, setA3] = useState("");
  const [aBaca, setABaca] = useState("");
  const [b8, setB8] = useState("");
  const [b1, setB1] = useState("");
  const [bBaca, setBBaca] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const ada = (isi: string, kata: string[]) => {
    const rapat = isi.trim().toLowerCase();
    return kata.some((item) => rapat.includes(item));
  };

  const periksa = () => {
    const okA =
      ada(a4, ["ribu"]) &&
      ada(a2, ["ratus"]) &&
      ada(a6, ["puluh"]) &&
      ada(a3, ["satu"]) &&
      ada(aBaca, ["empat ribu"]) &&
      ada(aBaca, ["enam puluh"]);
    const okB =
      ada(b8, ["puluh"]) &&
      ada(b1, ["satu"]) &&
      ada(bBaca, ["enam ribu"]) &&
      ada(bBaca, ["delapan puluh"]);
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB12.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB12.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB12.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Petugas Sensor Angka Raksasa 🔢</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Uraikan nilai tempat dari kiri, lalu tuliskan cara membacanya.
      </p>
      <div className="mt-4 space-y-4">
        <div className="rounded-2xl bg-white p-3">
          <p className="text-sm font-black text-[#1C01A5]">Dus Kode A · 4.263</p>
          <div className="mt-2">
            <PapanRibuan angka={["4", "2", "6", "3"]} nilai={["4.000", "200", "60", "3"]} />
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input value={a4} onChange={(e) => setA4(e.target.value)} className="rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold" placeholder="4 menempati ..." />
            <input value={a2} onChange={(e) => setA2(e.target.value)} className="rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold" placeholder="2 menempati ..." />
            <input value={a6} onChange={(e) => setA6(e.target.value)} className="rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold" placeholder="6 menempati ..." />
            <input value={a3} onChange={(e) => setA3(e.target.value)} className="rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold" placeholder="3 menempati ..." />
          </div>
          <input
            value={aBaca}
            onChange={(e) => setABaca(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="Dibaca: empat ribu ..."
          />
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-sm font-black text-[#1C01A5]">Dus Kode B · 6.081</p>
          <div className="mt-2">
            <PapanRibuan angka={["6", "0", "8", "1"]} nilai={["6.000", "0", "80", "1"]} />
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-600">
            6 di ribuan, 0 di ratusan. Isi tempat 8 dan 1, lalu cara membacanya.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input value={b8} onChange={(e) => setB8(e.target.value)} className="rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold" placeholder="8 menempati ..." />
            <input value={b1} onChange={(e) => setB1(e.target.value)} className="rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold" placeholder="1 menempati ..." />
          </div>
          <input
            value={bBaca}
            onChange={(e) => setBBaca(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="Dibaca: enam ribu ..."
          />
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
          cuplikan={[a4, a2, a6, a3, aBaca, b8, b1, bBaca].filter(Boolean).join(" · ") || undefined}
          pesanSalah="A: ribuan, ratusan, puluhan, satuan. Dibaca empat ribu dua ratus enam puluh tiga. B: 8 puluhan, 1 satuan. Dibaca enam ribu delapan puluh satu."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanRibuan() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "Angka 3 paling kiri pada 3.425", label: "Tempat dan nilainya", benar: "Ribuan 3.000" },
    { gambar: "Saat mata melihat tanda titik", label: "Mulut mengucapkan", benar: "RIBU" },
    { gambar: "7.050, ratusannya nol", label: "Cara baca yang tepat", benar: "Tujuh ribu lima puluh" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB12.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 0
            ? ["Satuan 3", "Ribuan 3.000", "Ratusan 300"]
            : indeks === 1
              ? ["RATUS", "RIBU", "PULUH"]
              : ["Tujuh ribu lima ratus", "Tujuh ribu lima puluh", "Tujuh ratus lima puluh"];
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
                pesanSalah="Paling kiri = ribuan. Titik = ucapkan RIBU. Nol ratusan tidak dibaca."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab12({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB12;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🏠🍬
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
            🎯 Aku bisa membaca dan menulis lambang bilangan empat angka (ribuan) dengan tepat.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menguraikan nilai tempat ribuan, ratusan, puluhan, dan satuan pada bilangan besar.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Menghitung Stok Dus Raksasa
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Selamat datang di Gudang Pusat Permen Sani! Bisnis Sani sudah terkenal di seluruh kota. Permen
              datang dalam dus raksasa, dan papan stok memuat empat digit plus satu tanda titik.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🏭📦3.425
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">Empat angka · titik pemisah ribuan</p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Wah, angkanya besar sekali! Ada empat angka berjejer. Bagaimana ya cara membaca angka ribuan
              ini agar tidak salah saat mencatat laporan gudang?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani belajar membaca angka raksasa di Gudang Pusat!
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
          🏠📦🛍️🍬
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
          🏢 Papan Nilai Tempat Gudang Pusat · 3.425
        </p>
        <div className="mt-3">
          <PapanRibuan
            angka={["3", "4", "2", "5"]}
            nilai={["3.000", "400", "20", "5"]}
          />
        </div>
        <p className="mt-3 text-center text-sm font-extrabold text-[#1C01A5]">
          Dibaca: tiga ribu empat ratus dua puluh lima
        </p>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Rahasia tanda titik</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Setiap melihat titik (.), ucapkan kata RIBU. 2.000 = dua ribu. 5.100 = lima ribu seratus. 7.050 =
            tujuh ribu lima puluh, karena ratusannya nol tidak perlu dibaca.
          </p>
        </article>
        <KuisMencocokkanRibuan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB12.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 3.425 atau tiga ribu."
          alias={kumpulkanAlias(["ribu", "3425", "3.425", "3000"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🔢📦
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
        <AktivitasSensorAngka />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalGudangPusat />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🏠
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Bilangan sampai dengan 10.000
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
        <LembarEvaluasiRibuan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB12.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 2.705 atau 3.000."
          alias={kumpulkanAlias(["2705", "3009", "5430", "4500", "3000", "5410"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
