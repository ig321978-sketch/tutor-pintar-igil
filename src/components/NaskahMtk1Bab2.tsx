"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
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
  return idKuisKartuResmi(MODUL_MTK1_BAB2.id, "D", indeks);
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
          pesanSalah="Coba jumlahkan lagi kedua kelompoknya."
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

function JurnalAliNia() {
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
        Bagaimana perasaanmu setelah belajar menjumlahkan bersama Ali dan Nia hari ini? Ketuk satu
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

function LembarEvaluasiAliNia() {
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
          soal="1. Perhatikan tabel robot Ali. Setelah kotak merah dan kotak biru digabung, berapa jumlah robotnya?"
          benar="C"
          pilihan={[
            { huruf: "A", teks: "4" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "5" },
          ]}
          anak={
            <div className="overflow-hidden rounded-2xl border-2 border-[#F0AB00]">
              <div className="grid grid-cols-3 bg-[#1C01A5] px-2 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
                <span>Kotak</span>
                <span>🤖 Robot</span>
                <span>Jumlah</span>
              </div>
              <div className="grid grid-cols-3 items-center border-t border-[#F0AB00]/40 bg-[#FEF2F2] px-2 py-3 text-sm font-bold">
                <span>Merah</span>
                <span>🤖🤖🤖</span>
                <span>3</span>
              </div>
              <div className="grid grid-cols-3 items-center border-t border-[#F0AB00]/40 bg-[#EFF6FF] px-2 py-3 text-sm font-bold">
                <span>Biru</span>
                <span>🤖🤖</span>
                <span>2</span>
              </div>
            </div>
          }
        />
        <KuisPilih
          indeks={1}
          soal="2. Ali ingin 7 pensil warna. Sekarang ada pensil yang belum diketahui dan Nia memberi 3 pensil. Berapa pensil Ali dari awal agar jumlahnya tepat 7?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "4 Pensil" },
            { huruf: "B", teks: "3 Pensil" },
            { huruf: "C", teks: "7 Pensil" },
          ]}
          anak={
            <p className="rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
              [ ✏️ ? pensil ] + ✏️✏️✏️ = 7
            </p>
          }
        />
        <KuisPilih
          indeks={2}
          soal="3. Misteri jumlah Ali: hasil 3 ➕ 3. Letaknya di antara 5 dan 7. Bilangannya..."
          benar="B"
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "9" },
          ]}
          anak={
            <div className="rounded-xl border-2 border-dashed border-[#1C01A5] bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              📦 Misteri Jumlah Ali
              <p className="mt-1">• 3 ➕ 3 ＝ ?</p>
              <p>• Di antara 5 dan 7</p>
            </div>
          }
        />
        <KuisPilih
          indeks={3}
          soal="4. Kotak gabung mobil. Tiga mobil ditambah dua mobil. Jumlahnya..."
          benar="A"
          pilihan={[
            { huruf: "A", teks: "5" },
            { huruf: "B", teks: "6" },
            { huruf: "C", teks: "3" },
          ]}
          anak={
            <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
              <IkonUlang ikon="🚗" jumlah={3} />
              <p className="text-center">➕</p>
              <IkonUlang ikon="🚗" jumlah={2} />
            </div>
          }
        />
        <KuisPilih
          indeks={4}
          soal='5. Edo menulis di papan: "6 jeruk ➕ 0 jeruk = 0." Apakah pernyataan Edo sudah benar?'
          benar="B"
          pilihan={[
            { huruf: "A", teks: "Benar, karena ayah tidak membawa jeruk." },
            { huruf: "B", teks: "Salah, seharusnya 6 ditambah 0 tetap 6." },
            { huruf: "C", teks: "Salah, seharusnya hasilnya 7." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat</h5>
        <KuisIsian
          indeks={5}
          soal="6. Tanda ➕ disebut apa?"
          alias={["plus", "ditambah", "tambah"]}
        />
        <KuisIsian
          indeks={6}
          soal="7. Hasil 5 ➕ 2. Tuliskan angkanya."
          alias={["7", "tujuh"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. Tangga hasil Ali meloncat 1. Isi kotak A dan kotak B."
          alias={["7", "9"]}
          anak={
            <div className="flex flex-wrap items-end gap-2">
              {[
                { teks: "5", isi: true },
                { teks: "6", isi: true },
                { teks: "A", isi: false },
                { teks: "8", isi: true },
                { teks: "B", isi: false },
                { teks: "10", isi: true },
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
          soal="9. Empat kupu-kupu ditambah lima kupu-kupu. Tuliskan hasilnya."
          alias={["9", "sembilan"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-2">
              <IkonUlang ikon="🦋" jumlah={4} />
              <p className="text-center font-black text-[#1C01A5]">➕</p>
              <IkonUlang ikon="🦋" jumlah={5} />
            </div>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Ada 7 kupu-kupu, lalu datang 1 kupu-kupu lagi. Berapa jumlahnya sekarang?"
          alias={["8", "delapan"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-2">
              <IkonUlang ikon="🦋" jumlah={7} ukuran="text-xl" />
              <p className="mt-1 text-sm font-bold text-[#1C01A5]">➕ 🦋 = ?</p>
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
            <li>A: (1) C 5 robot, (2) A 4 pensil, (3) B 6, (4) A 5 mobil, (5) B 6 + 0 = 6</li>
            <li>B: (6) plus atau ditambah, (7) 7, (8) 7 dan 9, (9) 9, (10) 8</li>
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function AktivitasAliNia() {
  const kuis = useKuisMateri();
  const [merah, setMerah] = useState("");
  const [biru, setBiru] = useState("");
  const [angka, setAngka] = useState("");
  const [baca, setBaca] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okMerah = ["3", "tiga"].includes(merah.trim().toLowerCase());
    const okBiru = ["2", "dua"].includes(biru.trim().toLowerCase());
    const okAngka = angka.trim() === "5";
    const okBaca = baca.trim().toLowerCase().replace(/\s+/g, " ").includes("lima");
    if (okMerah && okBiru && okAngka && okBaca) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK1_BAB2.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK1_BAB2.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK1_BAB2.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Membantu Ali Menjumlahkan Robot</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Yuk, lihat robot Ali yang sudah rapi. Bantu Ali menuliskan jumlahnya setelah digabung!
      </p>
      <div className="mt-3 rounded-xl bg-white px-3 py-3">
        <IkonUlang ikon="🤖" jumlah={3} />
        <p className="text-xs font-bold text-[#991B1B]">Ada 3 robot di kotak merah</p>
        <IkonUlang ikon="🤖" jumlah={2} />
        <p className="text-xs font-bold text-[#1D4ED8]">Ada 2 robot di kotak biru</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa robot merah?
          <input
            value={merah}
            onChange={(e) => setMerah(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Ada berapa robot biru?
          <input
            value={biru}
            onChange={(e) => setBiru(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
          />
        </label>
        <label className="text-sm font-bold text-[#1C01A5]">
          Lambang hasilnya
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
            placeholder="lima"
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
          cuplikan={[merah, biru, angka, baca].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Hitung lagi: 3 robot merah dan 2 robot biru."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanJumlah() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "🤖🤖🤖 ➕ 🤖🤖", label: "3 robot + 2 robot", benar: "5" },
    { gambar: "✏️✏️✏️✏️ ➕ ✏️✏️✏️", label: "4 stik + 3 stik", benar: "7" },
    { gambar: "🍊🍊🍊🍊🍊🍊 ➕ 0", label: "6 jeruk + 0 jeruk", benar: "6" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK1_BAB2.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        return (
          <article key={item.label} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-2xl">{item.gambar}</p>
            <p className="mt-1 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["5", "6", "7"].map((angka) => (
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
                pesanSalah="Coba hasil yang lain."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk1Bab2({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB2;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏠🤖📦
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
            🎯 Aku bisa menggabungkan dua kelompok benda sampai 10.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menulis penjumlahan dengan tanda ➕ dan ＝.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Menggabungkan Robot
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Di ruang tengah, Ali mengelompokkan robot. Kotak merah berisi 3 robot. Kotak biru
              berisi 2 robot.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-black uppercase text-[#991B1B]">Kotak merah</p>
                <p className="mt-1 text-2xl" aria-hidden>
                  🤖🤖🤖
                </p>
              </div>
              <div className="rounded-xl bg-white px-3 py-2">
                <p className="text-[10px] font-black uppercase text-[#1D4ED8]">Kotak biru</p>
                <p className="mt-1 text-2xl" aria-hidden>
                  🤖🤖
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Kalau semua robot dimasukkan ke satu kotak besar, jumlahnya bertambah.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Ali</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Nia, bagaimana ya cara menghitung semua robot ini dengan cepat setelah digabung?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Ali dan Nia menggabungkan robot mereka!
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
          🚗➕🚗
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
          Infografis: Kotak Gabung dan Simbol
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
            <span>Kelompok</span>
            <span>Isi</span>
            <span>Nama</span>
          </div>
          {[
            ["🚗 3 mobil", "➕ 2 mobil", "5 mobil"],
            ["✏️ 4 stik", "➕ 3 stik", "7 stik"],
            ["🍪 2 biskuit", "➕ 3 biskuit", "5 biskuit"],
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
            📦 Contoh: 3 robot + 2 robot
          </p>
          <div className="grid sm:grid-cols-2">
            <div className="border-b-2 border-[#1C01A5]/10 px-4 py-4 sm:border-b-0 sm:border-r-2">
              <p className="text-xs font-black uppercase text-[#991B1B]">🤖 Kotak merah</p>
              <p className="mt-2 text-3xl">🤖🤖🤖</p>
              <p className="mt-1 text-4xl font-black text-[#1C01A5]">3</p>
              <p className="text-sm font-bold text-slate-700">robot merah</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-xs font-black uppercase text-[#1D4ED8]">🤖 Kotak biru</p>
              <p className="mt-2 text-3xl">🤖🤖</p>
              <p className="mt-1 text-4xl font-black text-[#1C01A5]">2</p>
              <p className="text-sm font-bold text-slate-700">robot biru</p>
            </div>
          </div>
          <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
            3 ➕ 2 ＝ 5
          </p>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Tahukah kamu?</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Tanda <span className="font-black text-[#1C01A5]">➕</span> disebut plus atau ditambah.
            Tanda <span className="font-black text-[#1C01A5]">＝</span> disebut sama dengan. Ditambah
            nol, hasilnya tetap!
          </p>
        </article>
        <KuisMencocokkanJumlah />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB2.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 3 + 2 = 5."
          alias={kumpulkanAlias(["3 + 2 = 5", "4 + 3 = 7", "6 + 0 = 6", "plus ditambah", "sama dengan"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🤖📦
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
        <AktivitasAliNia />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalAliNia />
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
          Tantangan Para Juara · Penjumlahan sampai 10
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
        <LembarEvaluasiAliNia />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK1_BAB2.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 5 atau 3 + 2."
          alias={kumpulkanAlias(["5", "4", "6", "plus", "ditambah", "7", "9", "8"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
