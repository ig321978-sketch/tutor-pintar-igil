"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import GambarCerita from "@/components/GambarCerita";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB14 } from "@/lib/modul-resmi-mtk-2-bab14";
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
  return idKuisKartuResmi(MODUL_MTK2_BAB14.id, "D", indeks);
}

function Kotak3D({ jenis, judul }: { jenis: "kubus" | "balok"; judul: string }) {
  const kubus = jenis === "kubus";
  const atas = kubus ? "70,16 112,38 70,60 28,38" : "78,18 132,44 78,70 16,44";
  const kiri = kubus ? "28,38 70,60 70,108 28,86" : "16,44 78,70 78,118 16,92";
  const kanan = kubus ? "70,60 112,38 112,86 70,108" : "78,70 132,44 132,92 78,118";
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 150 130" className="h-28 w-36" role="img" aria-label={judul}>
        <polygon points={atas} fill="#FDE68A" stroke="#1C01A5" strokeWidth="3" />
        <polygon points={kiri} fill="#F59E0B" stroke="#1C01A5" strokeWidth="3" />
        <polygon points={kanan} fill="#D97706" stroke="#1C01A5" strokeWidth="3" />
      </svg>
      <figcaption className="text-center text-xs font-black text-[#1C01A5]">{judul}</figcaption>
    </figure>
  );
}

function DaftarBagianKotak() {
  const sisi = ["Atas", "Bawah", "Depan", "Belakang", "Kiri", "Kanan"];
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-3">
        <p className="text-sm font-black text-[#1C01A5]">Sisi · 6 dinding</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {sisi.map((nama) => (
            <span key={nama} className="rounded-xl bg-[#FEF3C7] px-2 py-2 text-center text-xs font-black text-[#1C01A5]">
              {nama}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-3">
        <p className="text-sm font-black text-[#1C01A5]">Titik sudut · 8 pojokan</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className="flex h-8 items-center justify-center rounded-full bg-[#1C01A5] text-xs font-black text-white"
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
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
  soal: ReactNode;
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
      <div className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</div>
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
          pesanSalah="Kubus semua dindingnya sama. Balok ada sisi yang lebih panjang. Keduanya punya 6 sisi dan 8 titik sudut."
        />
      </div>
    </article>
  );
}

function KuisIsian({
  indeks,
  soal,
  anak,
  cocok,
  pesanSalah,
}: {
  indeks: number;
  soal: ReactNode;
  anak?: ReactNode;
  cocok: (isi: string) => boolean;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    if (cocok(isi)) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <div className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</div>
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
        <HasilJawabanKuis status={status} cuplikan={isi.trim() || undefined} pesanSalah={pesanSalah} />
      </div>
    </article>
  );
}

function rapat(isi: string): string {
  return isi.trim().toLowerCase().replace(/\s+/g, " ");
}

function adaAngka(isi: string, angka: string, kata: string): boolean {
  const r = rapat(isi);
  return new RegExp(`^(${angka}|${kata})(\\s+(sisi|titik|sudut|buah|pojokan|lancip))*$`).test(r);
}

function cocokKubus(isi: string): boolean {
  return rapat(isi).includes("kubus");
}

function cocokLima(isi: string): boolean {
  const r = rapat(isi).replace(/\s+/g, "");
  return /^(5|lima)(buah)?(dinding|sisi)?$/.test(r);
}

function cocokPasangan(isi: string): boolean {
  const r = isi.toLowerCase().replace(/[^a-z0-9]/g, "");
  return r.includes("1b") && r.includes("2a");
}

function cocokBalok(isi: string): boolean {
  return rapat(isi).includes("balok");
}

function cocokPojok(isi: string): boolean {
  const r = rapat(isi);
  const pojok = /pojok|titik sudut|sudut/.test(r);
  const lancip = /lancip|runcing|tajam|siku/.test(r);
  return pojok && lancip;
}

function JurnalKotak() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat seru, sekarang aku tahu perbedaan kotak sepatu dan kotak dadu!" },
    { id: "pelan", ikon: "😐", teks: "Aku harus pelan-pelan menghitung jumlah dinding kotak agar tidak ada yang terlewat." },
    { id: "bingung", ikon: "😢", teks: "Aku masih agak bingung membedakan istilah sisi pada bangun datar dan bangun ruang." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah berhasil mengenal bagian-bagian kotak hari ini? Ketuk satu wajah.
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

function LembarEvaluasiKotak() {
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
        <h5 className="text-base font-black text-[#1C01A5]">🍓 Bagian A: Pilihan Ganda Kontekstual</h5>
        <KuisPilih
          indeks={0}
          benar="B"
          soal='1. Edo menggambar kotak persegi di buku lalu berkata, “Aku sudah membuat bangun ruang kubus!” Mengapa Lani mengatakan pendapat Edo salah?'
          pilihan={[
            { huruf: "A", teks: "Karena gambar Edo berbentuk lingkaran, bukan kotak." },
            { huruf: "B", teks: "Karena gambar di kertas hanya bangun datar yang tipis dan tidak punya ruangan di dalamnya." },
            { huruf: "C", teks: "Pernyataan Edo sebenarnya sudah sepenuhnya benar." },
          ]}
        />
        <KuisPilih
          indeks={1}
          benar="B"
          soal="2. Siti ingin menutup seluruh permukaan luar cetakan es batu berbentuk kubus. Satu dinding butuh 1 lembar stiker. Berapa lembar stiker yang harus disiapkan?"
          anak={
            <div className="flex justify-center">
              <Kotak3D jenis="kubus" judul="Kubus · 6 dinding" />
            </div>
          }
          pilihan={[
            { huruf: "A", teks: "4 lembar stiker" },
            { huruf: "B", teks: "6 lembar stiker" },
            { huruf: "C", teks: "8 lembar stiker" },
          ]}
        />
        <KuisPilih
          indeks={2}
          benar="B"
          soal="3. Kotak rahasia Sani punya ruangan di dalamnya, 8 titik sudut, dinding depan panjang, dan dinding samping pendek. Bentuknya adalah..."
          pilihan={[
            { huruf: "A", teks: "Kubus" },
            { huruf: "B", teks: "Balok" },
            { huruf: "C", teks: "Segitiga" },
          ]}
        />
        <KuisPilih
          indeks={3}
          benar="A"
          soal="4. Kotak susu cair cokelat yang tegak di atas meja berbentuk bangun ruang..."
          anak={
            <div className="flex justify-center">
              <Kotak3D jenis="balok" judul="Kotak susu" />
            </div>
          }
          pilihan={[
            { huruf: "A", teks: "Balok" },
            { huruf: "B", teks: "Kubus" },
            { huruf: "C", teks: "Lingkaran" },
          ]}
        />
        <KuisPilih
          indeks={4}
          benar="B"
          soal="5. Rubik berbentuk kubus dan tempat pensil berbentuk balok. Pernyataan yang paling tepat tentang titik sudut keduanya adalah..."
          pilihan={[
            { huruf: "A", teks: "Rubik punya pojokan lancip lebih banyak daripada tempat pensil." },
            { huruf: "B", teks: "Keduanya punya jumlah pojokan lancip yang sama, yaitu 8 titik sudut." },
            { huruf: "C", teks: "Tempat pensil punya pojokan lebih sedikit karena bentuknya panjang." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat & Penalaran</h5>
        <KuisIsian
          indeks={5}
          soal="6. Bangun ruang yang semua permukaan dindingnya berbentuk segi empat sama besar disebut..."
          cocok={cocokKubus}
          pesanSalah="Semua dinding sama besar, seperti dadu. Namanya kubus."
        />
        <KuisIsian
          indeks={6}
          soal="7. Kotak kado berbentuk balok. Sani membuang penutup atasnya agar menjadi tempat permen terbuka. Berapa dinding yang masih tersisa?"
          cocok={cocokLima}
          pesanSalah="Balok utuh punya 6 sisi. Tutup atas dibuang, tersisa 5 dinding."
        />
        <KuisIsian
          indeks={7}
          soal="8. Cocokkan benda dengan bentuk bangun ruangnya."
          cocok={cocokPasangan}
          pesanSalah="Dadu adalah kubus, jadi huruf B. Kardus sepatu adalah balok, jadi huruf A. Tulis 1B 2A."
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>(1) Dadu kayu untuk bermain ular tangga.</p>
              <p>(2) Kardus besar tempat menyimpan sepatu Paman.</p>
              <p className="mt-2">A. Balok</p>
              <p>B. Kubus</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Dua kotak kubus yang ukurannya sama ditumpuk ke atas secara pas dan rapat. Wujud bangun ruang baru yang tercipta adalah..."
          cocok={cocokBalok}
          pesanSalah="Dua kubus sama besar yang ditumpuk menjadi lebih panjang. Wujud barunya balok."
          anak={
            <div className="flex items-end justify-center gap-1">
              <Kotak3D jenis="kubus" judul="Kubus atas" />
              <span className="pb-8 text-2xl font-black text-[#1C01A5]">+</span>
              <Kotak3D jenis="kubus" judul="Kubus bawah" />
            </div>
          }
        />
        <KuisIsian
          indeks={9}
          soal="10. Bola bulat yang ukurannya pas dimasukkan ke dalam kubus, lalu kotak ditutup dan digoyang. Bagian dalam mana yang tidak pernah tersentuh bola? Mengapa?"
          cocok={cocokPojok}
          pesanSalah="Bagian pojokan atau titik sudut. Bola bulat, sedangkan kotak punya bagian lancip."
        />
      </section>
    </div>
  );
}

function AktivitasKotak() {
  const kuis = useKuisMateri();
  const [namaA, setNamaA] = useState("");
  const [sisiA, setSisiA] = useState("");
  const [namaB, setNamaB] = useState("");
  const [sudutB, setSudutB] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const ok =
      rapat(namaA).includes("kubus") &&
      adaAngka(sisiA, "6", "enam") &&
      rapat(namaB).includes("balok") &&
      adaAngka(sudutB, "8", "delapan");
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB14.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB14.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB14.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Inspektur Kotak Paket 📦</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Periksa dua kardus di lantai gudang. Rabalah kotak nyata di sekitarmu jika ada.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-3">
          <Kotak3D jenis="kubus" judul="Kardus A · dindingnya sama" />
          <p className="mt-2 text-xs font-semibold text-slate-600">Dinding depan, atas, dan samping ukurannya sama persis.</p>
          <input
            value={namaA}
            onChange={(e) => setNamaA(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="Nama bentuknya ..."
          />
          <input
            value={sisiA}
            onChange={(e) => setSisiA(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="Jumlah sisi ..."
          />
        </div>
        <div className="rounded-2xl bg-white p-3">
          <Kotak3D jenis="balok" judul="Kardus B · berbentuk panjang" />
          <p className="mt-2 text-xs font-semibold text-slate-600">Dinding samping lebih kecil daripada dinding depan.</p>
          <input
            value={namaB}
            onChange={(e) => setNamaB(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="Nama bentuknya ..."
          />
          <input
            value={sudutB}
            onChange={(e) => setSudutB(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold"
            placeholder="Jumlah titik sudut ..."
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
          cuplikan={[namaA, sisiA, namaB, sudutB].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Kardus A kubus, 6 sisi. Kardus B balok, 8 titik sudut."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanKotak() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "Dadu, semua dindingnya sama besar", label: "Nama bangun ruang", benar: "Kubus" },
    { gambar: "Dinding atas, bawah, depan, belakang, kiri, kanan", label: "Jumlah sisi", benar: "6" },
    { gambar: "Kotak susu yang lebih panjang", label: "Nama bangun ruang", benar: "Balok" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB14.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi = indeks === 1 ? ["4", "6", "8"] : indeks === 0 ? ["Balok", "Kubus", "Segitiga"] : ["Kubus", "Lingkaran", "Balok"];
        return (
          <article key={`${item.benar}-${indeks}`} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
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
                pesanSalah="Dinding sama besar = kubus. Jumlah sisi = 6. Kotak panjang = balok."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab14({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB14;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒📦🍬
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuA.pengantar}</p>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">🌟 Target Belajarku Hari Ini</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            🎯 Aku bisa mengenal bentuk bangun ruang kubus dan balok lewat benda nyata di sekitarku.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa menemukan dinding (sisi) dan pojokan (titik sudut) pada kotak dengan tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">🗺️ Cerita: Kardus Paket Pengiriman</p>
            <GambarCerita src="/doodle-mtk/mtk-2-bab14-cerita.jpg" alt="Paman membawa kardus kosong untuk paket permen." />
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Toko Permen Sani hari ini sibuk. Ada banyak pesanan dari luar kota. Permen tidak boleh dikirim begitu
              saja agar tidak hancur di jalan. Paman membawa banyak kardus kosong.
            </p>
            <div className="mt-3 flex justify-center">
              <Kotak3D jenis="balok" judul="Kardus paket kosong" />
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#0F766E]/20 bg-[#F0FDFA] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#0F766E]">Paman</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Sani, kita masukkan permennya ke dalam kotak-kotak ini ya.”
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Wah, kotak ini berbeda dengan gambar segi empat di kertas kemarin. Kotak ini punya ruangan di dalamnya
              dan bisa diisi permen sampai penuh!”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani mempelajari bentuk kotak pembungkus ini agar permen bisa ditata dengan rapi!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} hanyaKanvas />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📦🧃
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)} />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuB.pengantar}</p>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">Bangun datar dan bangun ruang</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Bangun datar tipis seperti kertas. Bangun ruang punya isi, sehingga bisa diisi air, permen, atau mainan.
          </p>
        </article>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-black text-[#1C01A5]">A. Kubus · kotak dadu</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Semua dindingnya sama persis. Seperti dadu, kotak kado persegi, atau rubik.
            </p>
            <div className="mt-3 flex justify-center">
              <Kotak3D jenis="kubus" judul="Kubus" />
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-black text-[#1C01A5]">B. Balok · kotak panjang</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ada bagian yang lebih panjang. Seperti kotak susu, kardus sepatu, atau pasta gigi.
            </p>
            <div className="mt-3 flex justify-center">
              <Kotak3D jenis="balok" judul="Balok" />
            </div>
          </article>
        </div>
        <DaftarBagianKotak />
        <KuisMencocokkanKotak />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB14.id, "B")}
          pertanyaan="Tuliskan kubus, balok, 6 sisi, atau 8 titik sudut."
          alias={kumpulkanAlias(["kubus", "balok", "6", "8", "enam", "delapan"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️📦
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuC.pengantar}</p>
        <AktivitasKotak />
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} hanyaKanvas />
        <JurnalKotak />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝📦
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">Tantangan Para Juara · Bentuk-bentuk Kotak</p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)} />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuD.pengantar}</p>
        <LembarEvaluasiKotak />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB14.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya kubus atau balok."
          alias={kumpulkanAlias(["kubus", "balok", "1b", "2a", "pojok"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
