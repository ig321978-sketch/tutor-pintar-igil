"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB9 } from "@/lib/modul-resmi-mtk-2-bab9";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB9.id, "D", indeks);
}

function PapanTigaLantai({
  operasi,
  atas,
  bawah,
  hasil,
  labelAtas,
  labelBawah,
}: {
  operasi: "➕" | "➖";
  atas: [string, string, string];
  bawah: [string, string, string];
  hasil?: [string, string, string];
  labelAtas?: string;
  labelBawah?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#1C01A5]/15 bg-white">
      <div className="grid grid-cols-3 bg-[#1C01A5] px-2 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
        <span>📦 Ratusan</span>
        <span>🛍️ Puluhan</span>
        <span>🍬 Satuan</span>
      </div>
      <div className="grid grid-cols-3 border-t border-[#1C01A5]/10 px-2 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <span>{atas[0]}</span>
        <span>{atas[1]}</span>
        <span>{atas[2]}</span>
      </div>
      {labelAtas ? (
        <p className="px-3 pb-2 text-center text-xs font-bold text-slate-500">{labelAtas}</p>
      ) : null}
      <div className="grid grid-cols-3 border-t border-[#1C01A5]/10 px-2 py-3 text-center text-2xl font-black text-[#1C01A5]">
        <span>{bawah[0]}</span>
        <span>{bawah[1]}</span>
        <span>{bawah[2]}</span>
      </div>
      {labelBawah ? (
        <p className="px-3 pb-2 text-center text-xs font-bold text-slate-500">{labelBawah}</p>
      ) : null}
      <p className="border-t-2 border-[#F0AB00] bg-[#FFF8E8] px-3 py-2 text-center text-lg font-black text-[#1C01A5]">
        {operasi}
      </p>
      {hasil ? (
        <div className="grid grid-cols-3 border-t-2 border-[#1C01A5] bg-[#FEF3C7] px-2 py-3 text-center text-3xl font-black text-[#1C01A5]">
          <span>{hasil[0]}</span>
          <span>{hasil[1]}</span>
          <span>{hasil[2]}</span>
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
          pesanSalah="Sejajarkan ratusan, puluhan, satuan. Hitung dari kanan."
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

function JurnalGudangSani() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "hebat", ikon: "😀", teks: "Hebat, ternyata menghitung angka ratusan sama mudahnya dengan angka satuan!" },
    { id: "teliti", ikon: "😐", teks: "Aku harus lebih teliti agar garis susunnya tidak melenceng." },
    { id: "bingung", ikon: "😢", teks: "Aku masih bingung jika melihat tiga baris angka berjejer ke bawah." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah berhasil menaklukkan angka ratusan yang besar hari ini? Ketuk satu wajah.
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

function LembarEvaluasiRatusan() {
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
          soal="1. Siti menghitung 768 − 342 bersusun seperti di bawah. Dayu bilang hasilnya salah pada bagian paling belakang. Bagian mana yang salah?"
          benar="B"
          anak={
            <PapanTigaLantai
              operasi="➖"
              atas={["7", "6", "8"]}
              bawah={["3", "4", "2"]}
              hasil={["4", "2", "4"]}
              labelAtas="Tulisan Siti (768)"
              labelBawah="Dikurangi (342)"
            />
          }
          pilihan={[
            { huruf: "A", teks: "Siti salah menghitung kolom Ratusan (7 − 3 seharusnya 5)." },
            { huruf: "B", teks: "Siti salah menghitung kolom Satuan (8 − 2 seharusnya 6, bukan 4)." },
            { huruf: "C", teks: "Hitungan Siti sudah sepenuhnya benar." },
          ]}
        />
        <KuisPilih
          indeks={1}
          soal="2. Setelah Sani mengambil 231 permen untuk etalase, kotak rahasia tersisa 345. Berapa jumlah seluruh permen di kotak itu mula-mula?"
          benar="B"
          pilihan={[
            { huruf: "A", teks: "114 permen" },
            { huruf: "B", teks: "576 permen" },
            { huruf: "C", teks: "586 permen" },
          ]}
        />
        <KuisPilih
          indeks={2}
          soal="3. Aku bilangan ratusan. Jika aku dikurangi 124 bersusun pendek, hasilnya 532. Siapakah aku?"
          benar="A"
          anak={
            <PapanTigaLantai
              operasi="➖"
              atas={["?", "?", "?"]}
              bawah={["1", "2", "4"]}
              hasil={["5", "3", "2"]}
              labelAtas="Bilangan misteri"
              labelBawah="Dikurangi 124"
            />
          }
          pilihan={[
            { huruf: "A", teks: "656" },
            { huruf: "B", teks: "408" },
            { huruf: "C", teks: "658" },
          ]}
        />
        <KuisPilih
          indeks={3}
          soal="4. Toko Sani punya 425 permen rasa mangga dan 263 permen rasa apel. Jumlah gabungan jika dihitung bersusun ke bawah?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "688 permen" },
            { huruf: "B", teks: "685 permen" },
            { huruf: "C", teks: "162 permen" },
          ]}
        />
        <KuisPilih
          indeks={4}
          soal="5. Kotak Hijau berisi 134 + 241. Kotak Biru berisi 895 − 520. Pernyataan yang paling tepat?"
          benar="A"
          pilihan={[
            { huruf: "A", teks: "Isi Kotak Hijau nilainya sama besar dengan isi Kotak Biru." },
            { huruf: "B", teks: "Isi Kotak Hijau nilainya lebih kecil daripada isi Kotak Biru." },
            { huruf: "C", teks: "Isi Kotak Hijau nilainya lebih besar daripada isi Kotak Biru." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat & Penalaran</h5>
        <KuisIsian
          indeks={5}
          soal="6. Selesaikan perhitungan bersusun tiga angka di bawah ini dengan teliti."
          alias={["323"]}
          anak={
            <PapanTigaLantai
              operasi="➖"
              atas={["9", "5", "7"]}
              bawah={["6", "3", "4"]}
              labelAtas="957"
              labelBawah="634"
            />
          }
        />
        <KuisIsian
          indeks={6}
          soal="7. Lani punya 689 lembar stiker. Senin memakai 142, Selasa memakai 235. Berapa sisa stiker yang belum terpakai? (Kurangkan dua kali.)"
          alias={["312"]}
        />
        <KuisIsian
          indeks={7}
          soal="8. Cocokkan kisah permen gudang dengan operasi yang tepat."
          alias={["1b"]}
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>(1) Sani punya 450 permen, lalu mendapat kiriman 130 lagi.</p>
              <p>(2) Sani punya 450 permen, lalu 130 permen karet dijual.</p>
              <p className="mt-2">A. 450 − 130</p>
              <p>B. 450 + 130</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Tentukan angka rahasia pada bintang dan target agar hasilnya benar. Contoh: 7 dan 1"
          alias={["7", "1"]}
          harusSemua
          anak={
            <PapanTigaLantai
              operasi="➕"
              atas={["4", "⭐", "8"]}
              bawah={["3", "2", "🎯"]}
              hasil={["7", "9", "9"]}
            />
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Riko punya 350. Ia menambah angka lain supaya kolom puluhan menjadi 9 dan kolom satuan tetap 0. Berapa angka ratusan terkecil yang bisa ditambahkan? (Contoh: 350 + ??? = 390 atau 490)"
          alias={["40"]}
        />
      </section>
    </div>
  );
}

function AktivitasManajerGudang() {
  const kuis = useKuisMateri();
  const [aR, setAR] = useState("");
  const [aP, setAP] = useState("");
  const [aS, setAS] = useState("");
  const [bR, setBR] = useState("");
  const [bP, setBP] = useState("");
  const [bS, setBS] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const okA = aR.trim() === "7" && aP.trim() === "7" && aS.trim() === "9";
    const okB = bR.trim() === "3" && bP.trim() === "2" && bS.trim() === "4";
    if (okA && okB) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB9.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB9.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB9.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Manajer Gudang Permen 🏢</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Bantu Sani menyelesaikan laporan stok. Hitung dari kolom paling kanan!
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-black text-[#1C01A5]">Laporan A (Penjumlahan)</p>
          <PapanTigaLantai
            operasi="➕"
            atas={["5", "2", "6"]}
            bawah={["2", "5", "3"]}
            labelAtas="526"
            labelBawah="253"
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <input
              value={aR}
              onChange={(e) => setAR(e.target.value)}
              className="rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold"
              placeholder="📦"
              inputMode="numeric"
            />
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
          <p className="mb-2 text-sm font-black text-[#1C01A5]">Laporan B (Pengurangan)</p>
          <PapanTigaLantai
            operasi="➖"
            atas={["7", "8", "9"]}
            bawah={["4", "6", "5"]}
            labelAtas="789"
            labelBawah="465"
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <input
              value={bR}
              onChange={(e) => setBR(e.target.value)}
              className="rounded-xl border-2 border-[#1C01A5]/20 px-2 py-2 text-center font-extrabold"
              placeholder="📦"
              inputMode="numeric"
            />
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
          cuplikan={[aR, aP, aS, bR, bP, bS].filter(Boolean).join(" · ") || undefined}
          pesanSalah="A: 526 + 253 = 779. B: 789 − 465 = 324. Hitung dari kanan."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanRatusan() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "Lantai kanan 5 + 2", label: "Hasil satuan 345 + 132", benar: "7" },
    { gambar: "345 + 132 bersusun", label: "Total permen gudang", benar: "477" },
    { gambar: "477 − 145 bersusun", label: "Sisa setelah dipesan panti", benar: "332" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB9.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi =
          indeks === 0 ? ["5", "7", "8"] : indeks === 1 ? ["477", "213", "345"] : ["332", "622", "145"];
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
                pesanSalah="Hitung dari lantai kanan, lalu tengah, lalu kiri."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab9({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB9;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒📦🍬
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
            🎯 Aku bisa menjumlahkan dua bilangan ratusan dengan cara bersusun pendek secara teliti.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa mengurangkan dua bilangan ratusan dengan cara bersusun pendek secara tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Dus Raksasa dari Truk Pusat
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, Toko Permen Sani kedatangan truk besar dari pabrik pusat! Ingat: 1 Kantong = 10 permen.
              Aturan baru: 1 Dus Raksasa = 100 permen.
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Truk 1 membawa 3 dus, 4 kantong, dan 5 eceran (345). Truk 2 membawa 1 dus, 3 kantong, dan 2
              eceran (132). Sani menggaruk kepala, “Bagaimana menghitung ratusan butir tanpa pusing?”
            </p>
            <p className="mt-2 text-3xl" aria-hidden>
              🚚📦🛍️🍬
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">
              1 dus = 100 · 1 kantong = 10 · eceran = satuan
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Waduh, permennya jadi ratusan butir begini. Bagaimana ya cara menghitung total dan sisanya
              dengan cepat tanpa pusing?”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani menghitung bilangan besar ini menggunakan Trik Susun Tiga Lantai!
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
          📦🛍️🍬
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
          🏢 Rumah Nilai Tempat Bilangan Besar
        </p>
        <div className="mt-3 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
          <div className="grid grid-cols-3 bg-[#1C01A5] px-2 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
            <span>📦 Ratusan</span>
            <span>🛍️ Puluhan</span>
            <span>🍬 Satuan</span>
          </div>
          <div className="grid grid-cols-3 px-2 py-3 text-center text-sm font-bold text-[#1C01A5]">
            <span>Di kiri</span>
            <span>Di tengah</span>
            <span>Di kanan</span>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-black text-[#1C01A5]">➕ Penjumlahan ratusan</p>
            <PapanTigaLantai
              operasi="➕"
              atas={["3", "4", "5"]}
              bawah={["1", "3", "2"]}
              hasil={["4", "7", "7"]}
              labelAtas="Permen truk 1 (345)"
              labelBawah="Permen truk 2 (132)"
            />
            <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
              <li>1. Kanan (satuan): 5 + 2 = 7</li>
              <li>2. Tengah (puluhan): 4 + 3 = 7</li>
              <li>3. Kiri (ratusan): 3 + 1 = 4</li>
              <li>Hasil: 477 = empat ratus tujuh puluh tujuh</li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-black text-[#1C01A5]">➖ Pengurangan ratusan</p>
            <PapanTigaLantai
              operasi="➖"
              atas={["4", "7", "7"]}
              bawah={["1", "4", "5"]}
              hasil={["3", "3", "2"]}
              labelAtas="Total gudang (477)"
              labelBawah="Dipesan panti (145)"
            />
            <ul className="mt-3 space-y-1 text-sm font-semibold text-slate-700">
              <li>1. Kanan (satuan): 7 − 5 = 2</li>
              <li>2. Tengah (puluhan): 7 − 4 = 3</li>
              <li>3. Kiri (ratusan): 4 − 1 = 3</li>
              <li>Sisa: 332 = tiga ratus tiga puluh dua</li>
            </ul>
          </div>
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">💡 Rahasia sukses</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Selalu hitung dari lantai paling kanan (satuan), lalu tengah (puluhan), baru kiri (ratusan).
            Jangan sampai garis susunnya melenceng!
          </p>
        </article>
        <KuisMencocokkanRatusan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB9.id, "B")}
          pertanyaan="Tuliskan satu contoh, misalnya 345 + 132 = 477."
          alias={kumpulkanAlias(["477", "332", "kanan", "satuan"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️📦🏢
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
        <AktivitasManajerGudang />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
          hanyaKanvas
        />
        <JurnalGudangSani />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝📦
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Penjumlahan & Pengurangan Bilangan Besar
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
        <LembarEvaluasiRatusan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB9.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 576 atau 688."
          alias={kumpulkanAlias(["576", "656", "688", "323", "312", "40"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
