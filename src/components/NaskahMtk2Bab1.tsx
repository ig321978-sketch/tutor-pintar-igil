"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB1 } from "@/lib/modul-resmi-mtk-2-bab1";
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

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <p className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join("")}
    </p>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB1.id, "D", indeks);
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
          pesanSalah="Coba hitung lagi kantong dan permennya."
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

function JurnalPermenSani() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Seru banget, aku sudah paham!" },
    { id: "bingung", ikon: "😐", teks: "Sedikit bingung, mau latihan lagi." },
    { id: "susah", ikon: "😢", teks: "Susah, butuh bantuan tutor kembali." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah belajar merapikan kantong permen Sani hari ini? Ketuk satu
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

function LembarKerjaSani() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );
  const [bukaKunci, setBukaKunci] = useState(false);

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
          soal="1. Perhatikan tabel permen Siti dan Dayu. Siapa yang memiliki permen paling banyak?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Siti" },
            { huruf: "B", teks: "Dayu" },
            { huruf: "C", teks: "Permen mereka sama banyak" },
          ]}
          anak={
            <div className="overflow-hidden rounded-2xl border-2 border-[#F0AB00]">
              <div className="grid grid-cols-3 bg-[#1C01A5] px-2 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
                <span>Pemilik</span>
                <span>🛍️ Kantong</span>
                <span>🍬 Di luar</span>
              </div>
              <div className="grid grid-cols-3 items-center border-t border-[#F0AB00]/40 bg-[#FFF7ED] px-2 py-3 text-sm font-bold">
                <span>Siti</span>
                <span>🛍️🛍️🛍️🛍️ (4)</span>
                <span>🍬🍬🍬 (3)</span>
              </div>
              <div className="grid grid-cols-3 items-center border-t border-[#F0AB00]/40 bg-[#F0FDF4] px-2 py-3 text-sm font-bold">
                <span>Dayu</span>
                <span>🛍️🛍️🛍️ (3)</span>
                <span>🍬 × 14</span>
              </div>
            </div>
          }
        />
        <KuisPilih
          indeks={1}
          soal="2. Beni ingin 75 permen. Sekarang ada kantong besar yang belum diketahui dan 5 permen di luar. Berapa banyak kantong besar yang harus diambil Beni agar jumlahnya tepat 75?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "7 Kantong" },
            { huruf: "B", teks: "5 Kantong" },
            { huruf: "C", teks: "2 Kantong" },
          ]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
              [ 🛍️ ? kantong besar ] + 🍬🍬🍬🍬🍬 = 75
            </p>
          }
        />
        <KuisPilih
          indeks={2}
          soal="3. Misteri angka Sani: letaknya di antara 60 dan 70. Jika kantong + eceran digabung, hasilnya 9. Bilangannya..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "69" },
            { huruf: "B", teks: "63" },
            { huruf: "C", teks: "36" },
          ]}
          anak={
            <div className="rounded-xl border-2 border-dashed border-[#1C01A5] bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              📦 Misteri Angka Sani
              <p className="mt-1">• Di antara 60 dan 70</p>
              <p>• 🛍️ + 🍬 = 9</p>
            </div>
          }
        />
        <KuisPilih
          indeks={3}
          soal="4. Kotak permen Toni: 8 kantong besar dan 7 permen eceran. Jumlah seluruh permen Toni..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "78" },
            { huruf: "B", teks: "87" },
            { huruf: "C", teks: "80" },
          ]}
          anak={
            <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <IkonUlang ikon="🛍️" jumlah={8} />
              <IkonUlang ikon="🍬" jumlah={7} />
            </div>
          }
        />
        <KuisPilih
          indeks={4}
          soal='5. Edo menulis di papan: "82 permen = 2 kantong puluhan & 8 permen satuan." Apakah pernyataan Edo sudah benar?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Benar, karena angka 2 ditulis di depan angka 8 jika dibalik." },
            { huruf: "B", teks: "Salah, seharusnya 8 kantong puluhan dan 2 permen satuan di luar." },
            { huruf: "C", teks: "Salah, seharusnya 80 kantong puluhan dan 2 permen satuan di luar." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal='6. Sani punya permen sebanyak "sembilan puluh satu". Tuliskan lambang angkanya.'
          alias={["91"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Permen Lani: lebih dari 45, kurang dari 50, dan satuan angkanya genap. Tulis dua kemungkinan."
          alias={["46", "48"]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-[#1C01A5]">
              &gt; 45 → kurang dari 50 → 🍬 satuan genap
            </p>
          }
        />
        <KuisIsian
          indeks={7}
          soal="8. Tangga angka Sani meloncat 10. Isi kotak A dan kotak B."
          alias={["40", "60"]}
          anak={
            <div className="flex flex-wrap items-end gap-2">
              {[
                { teks: "20", isi: true },
                { teks: "30", isi: true },
                { teks: "A", isi: false },
                { teks: "50", isi: true },
                { teks: "B", isi: false },
                { teks: "70", isi: true },
              ].map((anak, i) => (
                <div key={anak.teks} className="text-center">
                  <div
                    className={`flex h-10 items-center justify-center rounded-lg px-3 text-sm font-black ${
                      anak.isi ? "bg-[#1C01A5] text-white" : "border-2 border-dashed border-[#F0AB00] bg-white text-[#1C01A5]"
                    }`}
                    style={{ marginBottom: i * 6 }}
                  >
                    {anak.teks}
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Kartu angka 4 dan 7. Tulis bilangan paling besar dan paling kecil."
          alias={["74", "47"]}
          anak={
            <div className="flex gap-3">
              <span className="rounded-lg border-2 border-[#1C01A5] px-4 py-2 text-2xl font-black text-[#1C01A5]">
                4
              </span>
              <span className="rounded-lg border-2 border-[#1C01A5] px-4 py-2 text-2xl font-black text-[#1C01A5]">
                7
              </span>
            </div>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Riko punya 100 permen. Sudah masuk 9 kantong besar. Berapa sisa permen eceran di luar?"
          alias={["10", "sepuluh"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-2">
              <IkonUlang ikon="🛍️" jumlah={9} ukuran="text-xl" />
              <p className="mt-1 text-sm font-bold text-[#1C01A5]">+ 🍬 sisa = 100</p>
            </div>
          }
        />
      </section>

      <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] p-4">
        <button
          type="button"
          onClick={() => setBukaKunci((sebelum) => !sebelum)}
          className="text-sm font-black text-[#1C01A5]"
        >
          {bukaKunci ? "Sembunyikan kunci jawaban" : "Lihat kunci jawaban (guru & orang tua)"}
        </button>
        {bukaKunci ? (
          <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
            <li>A: (1) B Dayu 44, (2) A 7 kantong, (3) B 63, (4) A 78, (5) B 8 kantong dan 2 satuan</li>
            <li>B: (6) 91, (7) 46 atau 48, (8) 40 dan 60, (9) 74 dan 47, (10) 10 permen</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function AktivitasSani() {
  const kuis = useKuisMateri();
  const [puluh, setPuluh] = useState("");
  const [satuan, setSatuan] = useState("");
  const [angka, setAngka] = useState("");
  const [baca, setBaca] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okPuluh = ["3", "tiga"].includes(puluh.trim().toLowerCase());
    const okSatuan = ["2", "dua"].includes(satuan.trim().toLowerCase());
    const okAngka = angka.trim() === "32";
    const okBaca = baca.trim().toLowerCase().replace(/\s+/g, " ").includes("tiga puluh dua");
    if (okPuluh && okSatuan && okAngka && okBaca) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB1.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB1.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB1.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Membantu Sani Menghitung Permen</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Yuk, lihat permen Sani yang sudah rapi. Bantu Sani menuliskan jumlahnya!
      </p>
      <div className="mt-3 rounded-xl bg-white px-3 py-3">
        <IkonUlang ikon="🛍️" jumlah={3} />
        <p className="text-xs font-bold text-[#1C01A5]">Ada 3 kantong besar</p>
        <IkonUlang ikon="🍬" jumlah={2} />
        <p className="text-xs font-bold text-[#1C01A5]">Ada 2 permen di luar</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa kantong besar? ........ puluhan
          <input
            value={puluh}
            onChange={(e) => setPuluh(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa permen di luar? ........ satuan
          <input
            value={satuan}
            onChange={(e) => setSatuan(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Lambang bilangannya
          <input
            value={angka}
            onChange={(e) => setAngka(e.target.value)}
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Dibaca
          <input
            value={baca}
            onChange={(e) => setBaca(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="tiga puluh dua"
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
          cuplikan={[puluh, satuan, angka, baca].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Hitung lagi: 3 kantong dan 2 permen."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanKantong() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "🛍️", label: "1 kantong besar", benar: "10" },
    { gambar: "🛍️🛍️ + 🍬🍬🍬🍬🍬", label: "2 kantong dan 5 permen", benar: "25" },
    { gambar: "🛍️ × 10", label: "10 kantong besar", benar: "100" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke jumlah permennya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB1.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article key={item.label} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-2xl">{item.gambar}</p>
            <p className="mt-1 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["10", "25", "100"].map((angka) => (
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
                pesanSalah="Coba angka yang lain."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab1({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB1;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🍬🛍️
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuA.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · Bab 1: Kantong Permen Sani
        </p>
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
            🎯 Aku bisa menghitung banyak benda dari 21 sampai 100 dengan cepat.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa memisahkan kelompok puluhan dan satuan dengan tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Berbagi Permen Ulang Tahun
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Sani baru saja merayakan ulang tahun. Di atas meja, ada banyak sekali permen
              pemberian paman.
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🍬🍬🍬🍬🍬🍬🍬🍬
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Sani ingin menghitung semua permennya. Tapi kalau dihitung satu per satu dari angka
              1, pasti melelahkan dan mudah salah hitung.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Bagaimana ya cara menghitung permen yang banyak ini dengan cepat dan rapi?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani membungkus permen-permen ini ke dalam kantong!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🛍️🍬
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
          Infografis: Kantong Besar dan Permen di Luar
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
            <span>🛍️ Kantong</span>
            <span>Isi</span>
            <span>Nama</span>
          </div>
          {[
            ["🛍️ 1 kantong", "10 permen", "1 Puluhan"],
            ["🛍️🛍️ 2 kantong", "20 permen", "2 Puluhan"],
            ["🛍️🛍️🛍️ 3 kantong", "30 permen", "3 Puluhan"],
          ].map((baris, i) => (
            <div
              key={baris[0]}
              className={`grid grid-cols-3 border-t border-[#F0AB00]/40 px-3 py-3 text-sm font-bold ${
                i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
              }`}
            >
              {baris.map((sel) => (
                <span key={sel}>{sel}</span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
            📦 Contoh: 2 kantong + 5 permen di luar
          </p>
          <div className="grid sm:grid-cols-2">
            <div className="border-b-2 border-[#1C01A5]/10 px-4 py-4 sm:border-b-0 sm:border-r-2">
              <p className="text-xs font-black uppercase text-[#92400E]">🛍️ Kantong besar</p>
              <p className="mt-2 text-3xl">🛍️🛍️</p>
              <p className="mt-1 text-4xl font-black text-[#1C01A5]">2</p>
              <p className="text-sm font-bold text-slate-700">nilainya 20</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-xs font-black uppercase text-[#166534]">🍬 Permen di luar</p>
              <p className="mt-2 text-3xl">🍬🍬🍬🍬🍬</p>
              <p className="mt-1 text-4xl font-black text-[#1C01A5]">5</p>
              <p className="text-sm font-bold text-slate-700">nilainya 5</p>
            </div>
          </div>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
            25 = dua puluh lima
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Jika Sani mempunyai tepat 10 kantong besar berisi permen, semua permennya berjumlah{" "}
            <span className="font-black text-[#1C01A5]">100</span>!
          </p>
        </article>
        <KuisMencocokkanKantong />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB1.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 25 = dua puluh lima."
          alias={kumpulkanAlias(["10 puluhan", "25 dua puluh lima", "100 seratus"])}
          konteks={kartuB.pengantar}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🛍️🍬
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
        <AktivitasSani />
        <JurnalPermenSani />
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🍓
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Bilangan Cacah sampai 100
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
        <LembarKerjaSani />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB1.id, "D")}
          pertanyaan="Tuliskan satu jawaban dari LKS, misalnya 78 atau Dayu."
          alias={kumpulkanAlias([
            "dayu",
            "7",
            "63",
            "78",
            "8",
            "91",
            "46",
            "48",
            "40",
            "60",
            "74",
            "47",
            "10",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
