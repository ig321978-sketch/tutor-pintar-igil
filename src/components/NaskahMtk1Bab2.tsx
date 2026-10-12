"use client";

import { useState, type ReactNode } from "react";
import GambarDoodle from "@/components/GambarDoodle";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import SoalRekamSuara, { ucapanMemuatAlias } from "@/components/SoalRekamSuara";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";
import type { KartuModulResmi } from "@/lib/modul-resmi-pai";

const ID = MODUL_MTK1_BAB2.id;

const WARNA_IKON = {
  kuning: "#F5C400",
  biru: "#2F6FED",
  merah: "#E23B3B",
  hitam: "#222222",
} as const;

function GambarIkon({
  ikon,
  warna,
}: {
  ikon: "kupu" | "balon" | "mobil";
  warna: string;
}) {
  if (ikon === "kupu") {
    return (
      <svg viewBox="0 0 64 64" className="inline-block h-10 w-10" aria-hidden>
        <path d="M30 30 C16 6 2 16 8 32 C12 42 24 40 30 32 Z" fill={warna} />
        <path d="M34 30 C48 6 62 16 56 32 C52 42 40 40 34 32 Z" fill={warna} />
        <path d="M30 36 C18 38 8 50 16 58 C26 62 32 48 32 40 Z" fill={warna} />
        <path d="M34 36 C46 38 56 50 48 58 C38 62 32 48 32 40 Z" fill={warna} />
        <ellipse cx="32" cy="38" rx="2.4" ry="14" fill="#1C01A5" />
        <circle cx="32" cy="22" r="2.4" fill="#1C01A5" />
        <path
          d="M30 22 Q24 12 18 10 M34 22 Q40 12 46 10"
          fill="none"
          stroke="#1C01A5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="18" cy="9" r="1.6" fill="#1C01A5" />
        <circle cx="46" cy="9" r="1.6" fill="#1C01A5" />
      </svg>
    );
  }
  if (ikon === "balon") {
    return (
      <svg viewBox="0 0 48 80" className="inline-block h-12 w-8" aria-hidden>
        <path
          d="M24 4 C12 4 6 16 6 28 C6 42 14 52 22 54 L24 60 L26 54 C34 52 42 42 42 28 C42 16 36 4 24 4 Z"
          fill={warna}
        />
        <ellipse cx="16" cy="18" rx="3" ry="6" fill="#fff" opacity="0.45" />
        <path
          d="M24 60 C30 66 18 70 24 76"
          fill="none"
          stroke="#1C01A5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 36" className="inline-block h-8 w-12" aria-hidden>
      <path d="M8 22 L14 12 H36 L46 22 H58 V28 H6 Z" fill={warna} />
      <path d="M18 12 L24 6 H34 L38 12 Z" fill={warna} />
      <circle cx="18" cy="28" r="4" fill="#1C01A5" />
      <circle cx="48" cy="28" r="4" fill="#1C01A5" />
      <circle cx="18" cy="28" r="1.6" fill="#fff" />
      <circle cx="48" cy="28" r="1.6" fill="#fff" />
    </svg>
  );
}

function DeretIkon({
  ikon,
  warna,
  jumlah,
}: {
  ikon: "kupu" | "balon" | "mobil";
  warna: string;
  jumlah: number;
}) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {Array.from({ length: jumlah }, (_, urut) => (
        <GambarIkon key={urut} ikon={ikon} warna={warna} />
      ))}
    </span>
  );
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function kartuModul(kode: string): KartuModulResmi {
  const ketemu = MODUL_MTK1_BAB2.kartu.find((item) => item.kode === kode);
  if (!ketemu) throw new Error(`Kartu ${kode} tidak ada`);
  return ketemu;
}

function Suara({ kode, indeks }: { kode: string; indeks: number }) {
  const soal = kartuModul(kode).kuis[indeks];
  return (
    <div className="mt-4">
      <SoalRekamSuara
        id={idKuisKartuResmi(ID, kode, indeks)}
        pertanyaan={soal?.pertanyaan ?? ""}
        periksa={(transkrip) => ucapanMemuatAlias(transkrip, soal?.alias ?? [])}
      />
    </div>
  );
}

function Kanvas({
  id,
  nomor,
  visual,
  instruksi,
  alias,
}: {
  id: string;
  nomor?: number;
  visual?: ReactNode;
  instruksi: string;
  alias: string[];
}) {
  return (
    <div className="mt-4 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4">
      {nomor ? (
        <p className="text-sm font-black text-[#1C01A5]">{nomor}. </p>
      ) : null}
      {visual ? <div className="mt-2 text-2xl leading-relaxed">{visual}</div> : null}
      <KuisTulisKartu
        id={id}
        rapat
        hanyaKanvas
        pertanyaan={instruksi}
        alias={kumpulkanAlias(alias)}
        konteks={instruksi}
      />
    </div>
  );
}

function Pilih({
  id,
  nomor,
  soal,
  pilihan,
  benar,
  anak,
}: {
  id?: string;
  nomor?: number;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="mt-4 rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        {nomor ? <span className="font-black text-[#1C01A5]">{nomor}. </span> : null}
        {soal}
      </p>
      {anak ? <div className="mt-3 text-2xl leading-relaxed">{anak}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => {
          const label =
            item.huruf.length === 1 && /[A-C]/.test(item.huruf)
              ? `${item.huruf}. ${item.teks}`
              : item.teks;
          return (
            <button
              key={item.huruf}
              type="button"
              onClick={() => {
                setPilih(item.huruf);
                if (id && item.huruf === benar) kuis?.tandaiBenar(id);
              }}
              className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
                pilih,
                item.huruf,
                benar,
                "bg-[#1C01A5] text-white hover:bg-[#16017a]",
              )}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Coba hitung lagi bendanya."
        />
      </div>
    </article>
  );
}

function Kereta({ id }: { id: string }) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState<number[]>([]);
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const kunci = [5, 6, 7];
  const penuh = isi.length >= kunci.length;
  const pilih = (angka: number) => {
    if (penuh) return;
    setIsi((sekarang) => [...sekarang, angka]);
    setStatus(null);
  };
  const periksa = () => {
    const ok = isi.length === kunci.length && isi.every((nilai, urut) => nilai === kunci[urut]);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
  };
  const gerbong = [4, isi[0], isi[1], isi[2]];
  return (
    <article className="mt-4 rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        🚂 Susun gerbong kereta yang melompat maju dari angka 4 sebanyak 3 langkah!
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-black text-[#1C01A5]">
        {gerbong.map((nilai, urut) => (
          <span key={urut} className="flex items-center gap-2">
            {urut > 0 ? <span aria-hidden>→</span> : null}
            <span className="rounded-xl border-2 border-[#F0AB00] bg-white px-3 py-2">
              {nilai ?? "..."}
            </span>
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[5, 6, 7, 3, 8].map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => pilih(angka)}
            className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
          >
            {angka}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setIsi([]);
            setStatus(null);
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Ulangi
        </button>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#F0AB00] px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={isi.join(" ") || undefined}
          pesanSalah="Lompat maju satu per satu dari angka 4."
        />
      </div>
    </article>
  );
}

function Balon({ nama, anak }: { nama: string; anak: string }) {
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function JudulKartu({ anak }: { anak: string }) {
  return (
    <h5 className="mt-5 text-left text-xl font-black text-[#1C01A5] first:mt-0 sm:text-2xl">
      {anak}
    </h5>
  );
}

function InfografisTabel({
  kepala,
  baris,
}: {
  kepala: [string, string, string];
  baris: Array<[string, string, string]>;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
      <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
        {kepala.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {baris.map((isi, indeks) => (
        <div
          key={isi.join("|")}
          className={`grid grid-cols-3 gap-2 border-t border-[#F0AB00]/40 px-3 py-3 text-sm font-bold leading-snug ${
            indeks % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
          }`}
        >
          {isi.map((sel, urut) => (
            <span key={`${indeks}-${urut}`}>{sel}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function Poin({ anak }: { anak: string }) {
  return (
    <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold leading-relaxed text-[#1C01A5]">
      {anak}
    </p>
  );
}

function LabelMini({ anak }: { anak: string }) {
  return (
    <p className="mt-5 text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{anak}</p>
  );
}

function Dengar({
  kode,
  kelas,
  kelamin,
}: {
  kode: string;
  kelas: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="mt-4">
      <TombolVoiceMateriPai1
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuModul(kode).voice, 2_000, 3_000)}
      />
    </div>
  );
}

function JurnalCikoCika() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    {
      id: "senang",
      ikon: "😃",
      teks: "Senang Sekali — Belajar matematika seru seperti bermain game!",
    },
    {
      id: "bingung",
      ikon: "🤔",
      teks: "Bingung — Aku masih butuh latihan melompat angka lagi.",
    },
    {
      id: "bosan",
      ikon: "😴",
      teks: "Bosan — Aku ingin tantangan angka yang lebih besar!",
    },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
        Bagaimana perasaanmu setelah belajar berhitung hari ini? Klik salah satu ikon ekspresi di
        bawah ya!
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

function UcapanBintang() {
  const [bintang, setBintang] = useState(false);
  return (
    <div className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-6 text-center">
      <p className="text-2xl font-black text-[#1C01A5]">🎉 HORE! KAMU HEBAT! 🎉</p>
      <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
        Selamat! Kamu telah menyelesaikan Misi Bab 2 &quot;Penjumlahan sampai dengan 10&quot; dengan
        baik! Kamu sekarang adalah Kapten Matematika!
      </p>
      <button
        type="button"
        onClick={() => setBintang(true)}
        className="mt-4 rounded-xl bg-[#F0AB00] px-4 py-2 text-sm font-black text-[#1C01A5]"
      >
        Berikan Bintang 5
      </button>
      {bintang ? (
        <p className="mt-3 text-2xl" aria-label="Lima bintang">
          ⭐⭐⭐⭐⭐
        </p>
      ) : null}
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
  return (
    <div className="space-y-5">
      <KartuBingkai>
        <GambarDoodle
          src="/doodle-mtk/mtk-1-bab2-pembuka.jpg"
          alt="Ciko dan Cika mengumpulkan apel di bawah pohon di taman buah"
          ukuran="lebar"
        />
        <p className="mt-4 text-center text-sm font-semibold text-slate-700">
          Petualangan Ciko dan Cika di taman buah.
        </p>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          👦🌳👧
        </p>
        <JudulKartu anak="Materi" />
        <p className="mt-3 text-left text-base font-black text-[#1C01A5]">
          🧺 Petualangan Ciko dan Cika di Taman Buah
        </p>
        <Dengar kode="A" kelas={kelas} kelamin={kelamin} />
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
          Ciko 👦, anak laki-laki berpakaian hijau yang aktif, dan Cika 👧, anak perempuan berkuncir
          dua berpakaian merah yang teliti, sedang berpetualang di taman buah.
        </p>
        <p className="mt-3 text-3xl" aria-hidden>
          👦🍎🍎🍎🍎 🧺 🍏🍏🍏👧
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          🧺 Keranjang piknik kayu yang besar. Di dalamnya ada 4 apel merah 🍎 di sisi kiri dan 3
          apel hijau 🍏 di sisi kanan.
        </p>
        <div className="mt-3 space-y-2">
          <Balon
            nama="Ciko 👦"
            anak="Cika! Lihat, aku menemukan 4 buah apel merah yang jatuh di bawah pohon! 🍎🍎🍎🍎"
          />
          <Balon
            nama="Cika 👧"
            anak="Wah, asyik! Aku juga menemukan 3 buah apel hijau di dekat semak-semak! 🍏🍏🍏"
          />
          <Balon
            nama="Ciko 👦"
            anak="Kalau kita kumpulkan semua ke dalam keranjang 🧺, sekarang jumlah apel kita jadi bertambah banyak, ya!"
          />
          <Balon nama="Cika 👧" anak="Benar! Mari kita hitung semuanya bersama-sama! ➕" />
        </div>
        <LabelMini anak="Kuis suara" />
        <Suara kode="A" indeks={0} />
        <Suara kode="A" indeks={1} />
        <LabelMini anak="Kuis tulisan kanvas" />
        <Kanvas
          id={idKuisTulisKartu(ID, "A")}
          visual={
            <>
              <DeretIkon ikon="kupu" warna={WARNA_IKON.kuning} jumlah={3} />
              <span className="mx-2">➕</span>
              <DeretIkon ikon="kupu" warna={WARNA_IKON.biru} jumlah={2} />
            </>
          }
          instruksi="Ada 3 kupu-kupu kuning sedang hinggap. Lalu, datang lagi 2 kupu-kupu biru. Tuliskan angka total seluruh kupu-kupu pada kotak kanvas di bawah ini!"
          alias={["5", "lima"]}
        />
        <Kanvas
          id={`${ID}-A-plus`}
          visual={
            <>
              <DeretIkon ikon="balon" warna={WARNA_IKON.merah} jumlah={5} />
              <span className="mx-2">➕</span>
              <DeretIkon ikon="balon" warna={WARNA_IKON.kuning} jumlah={2} />
            </>
          }
          instruksi="Tuliskan lambang tanda tambah pada kotak pertama: 5 ... 2."
          alias={["+", "tambah", "plus", "tanda tambah"]}
        />
        <Kanvas
          id={`${ID}-A-hasil`}
          visual={
            <>
              <DeretIkon ikon="balon" warna={WARNA_IKON.merah} jumlah={1} />
              <span className="mx-1">5 ➕</span>
              <DeretIkon ikon="balon" warna={WARNA_IKON.kuning} jumlah={1} />
              <span className="mx-1">2 = ?</span>
            </>
          }
          instruksi="Tuliskan hasil akhir 5 ditambah 2 pada kotak kanvas."
          alias={["7", "tujuh"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🍎➡️🤝
        </p>
        <JudulKartu anak="Infografis" />
        <p className="mt-3 text-left text-base font-black text-[#1C01A5]">
          ⚡ Cara Kilat Menjumlah sampai 10
        </p>
        <Dengar kode="B" kelas={kelas} kelamin={kelamin} />
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
          Berikut adalah 3 cara mudah yang bisa kamu pilih untuk menjumlahkan bilangan.
        </p>
        <InfografisTabel
          kepala={["Cara", "Contoh", "Hasil"]}
          baris={[
            [
              "🍎 Hitung semua",
              "🍊🍊🍊🍊 digabung 🍊🍊. Hitung 1, 2, 3, 4, 5, 6.",
              "6",
            ],
            [
              "➡️ Menghitung maju",
              "5 + 3. Ingat 5 di kepala 🧠, siapkan 3 jari 🖐️. Hitung 6, 7, 8.",
              "8",
            ],
            ["🤝 Pasangan bilangan", "6 dan 4 berteman membentuk 10.", "10"],
          ]}
        />
        <LabelMini anak="Kuis permainan" />
        <Pilih
          id={idKuisKartuResmi(ID, "B", 0)}
          soal="Tarik pilihan agar 7 berjumlah 10."
          anak="7️⃣ ➕ ?"
          pilihan={[
            { huruf: "2", teks: "2" },
            { huruf: "3", teks: "3" },
            { huruf: "4", teks: "4" },
          ]}
          benar="3"
        />
        <Pilih
          id={idKuisKartuResmi(ID, "B", 1)}
          soal="Tarik pilihan agar 8 berjumlah 10."
          anak="8️⃣ ➕ ?"
          pilihan={[
            { huruf: "2", teks: "2" },
            { huruf: "5", teks: "5" },
            { huruf: "1", teks: "1" },
          ]}
          benar="2"
        />
        <Pilih
          id={idKuisKartuResmi(ID, "B", 2)}
          soal="Tarik pilihan agar 5 berjumlah 10."
          anak="5️⃣ ➕ ?"
          pilihan={[
            { huruf: "3", teks: "3" },
            { huruf: "4", teks: "4" },
            { huruf: "5", teks: "5" },
          ]}
          benar="5"
        />
        <Kereta id={idKuisKartuResmi(ID, "B", 3)} />
        <Pilih
          id={idKuisKartuResmi(ID, "B", 4)}
          soal="Masukkan donat cokelat 🍩 dan donat stroberi 🍓 ke dalam satu kotak hantaran 📦 yang muat 9 donat. Manakah kombinasi yang benar?"
          anak="📦 muat 9 donat"
          pilihan={[
            { huruf: "A", teks: "🍩🍩🍩🍩 cokelat dan 🍓🍓🍓🍓 stroberi." },
            { huruf: "B", teks: "🍩🍩🍩🍩🍩🍩 cokelat dan 🍓🍓🍓 stroberi." },
          ]}
          benar="B"
        />
        <LabelMini anak="Kuis tulisan kanvas" />
        <Kanvas
          id={idKuisTulisKartu(ID, "B")}
          visual="🔢 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10"
          instruksi="Gunakan cara menghitung maju! Mulai dari angka 6, lalu melompat maju 3 langkah. Tuliskan angka pemberhentian terakhirmu!"
          alias={["9", "sembilan"]}
        />
        <Kanvas
          id={`${ID}-B-pasangan`}
          visual="🤝 8 bercabang menjadi 4 dan ⬜"
          instruksi="Lengkapi pasangan bilangan berikut! Angka 4 dan angka berapa yang membentuk 8?"
          alias={["4", "empat"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🐸🪨🦟
        </p>
        <JudulKartu anak="Kegiatan" />
        <p className="mt-3 text-left text-base font-black text-[#1C01A5]">🐸 Lompat Katak Ceria</p>
        <Dengar kode="C" kelas={kelas} kelamin={kelamin} />
        <GambarDoodle
          src="/doodle-mtk/mtk-1-bab2-katak.jpg"
          alt="Katak melompat di atas batu sungai menuju nyamuk"
          ukuran="sedang"
        />
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
          🎨 Siapkan kertas warna-warni yang ditulisi angka 1 sampai 10, lalu tempel di lantai
          membentuk garis lurus seperti batu sungai 🪨.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm font-semibold leading-relaxed text-slate-700">
          <li>
            📖 Orang tua atau guru membacakan cerita pendek. Contoh: &quot;Katak Ciko 🐸 sedang
            berdiri di batu angka 5. Nyam nyam! Dia melihat 4 ekor nyamuk 🦟 di depannya dan ingin
            melompat 4 kali untuk menangkapnya.&quot;
          </li>
          <li>
            🦶 Anak menirukan gerakan katak dan melompat maju sebanyak 4 kali di atas kertas angka
            sambil berhitung lantang: &quot;6, 7, 8, 9!&quot;
          </li>
          <li>🎯 Anak akan mendarat di angka 9.</li>
        </ol>
        <LabelMini anak="Kuis suara" />
        <Suara kode="C" indeks={0} />
        <Suara kode="C" indeks={1} />
        <LabelMini anak="Kuis tulisan kanvas" />
        <Kanvas
          id={idKuisTulisKartu(ID, "C")}
          visual="🐸 di atas angka 7"
          instruksi="Katak melompat maju 2 kali lagi. Tuliskan hasilnya: 7 + 2 = ..."
          alias={["9", "sembilan"]}
        />
        <Kanvas
          id={`${ID}-C-langkah`}
          visual="🐾 0 → 5 → 10"
          instruksi="Berapa langkah lompatan katak dari angka 5 untuk mencapai angka 10? 5 + ... = 10"
          alias={["5", "lima"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌟🔑
        </p>
        <JudulKartu anak="Point Penting" />
        <Poin anak="🔑 Kata kunci: kalau ada kata datang lagi, membeli lagi, atau digabungkan, itu berarti soal penjumlahan (+)." />
        <Poin anak="🧠 Trik kilat: selalu simpan angka yang lebih besar di dalam kepala agar jari tanganmu tidak lelah menghitung." />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🌟
        </p>
        <h4 className="mt-3 text-left text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          Lembar Evaluasi Siswa
        </h4>
        <Dengar kode="L" kelas={kelas} kelamin={kelamin} />
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-700">
          Gunakan kanvas tulis tangan atau klik pilihan jawaban untuk menyelesaikan misi!
        </p>
        <Pilih
          id={idKuisKartuResmi(ID, "L", 0)}
          nomor={1}
          soal="Di tempat parkir ada 3 mobil merah. Datang lagi beberapa mobil hitam hingga totalnya menjadi 5 mobil. Kalimat matematika yang benar adalah..."
          anak={
            <>
              <DeretIkon ikon="mobil" warna={WARNA_IKON.merah} jumlah={3} /> merah ·{" "}
              <DeretIkon ikon="mobil" warna={WARNA_IKON.hitam} jumlah={2} /> hitam
            </>
          }
          pilihan={[
            { huruf: "A", teks: "3 + 2 = 5" },
            { huruf: "B", teks: "5 + 3 = 8" },
            { huruf: "C", teks: "3 + 5 = 8" },
          ]}
          benar="A"
        />
        <Kanvas
          id={idKuisKartuResmi(ID, "L", 1)}
          nomor={2}
          visual="⚖️ kanan 9 · kiri 5 dan 📦"
          instruksi="Di sisi kanan timbangan ada angka 9. Di sisi kiri ada angka 5 dan sebuah kotak misteri agar timbangannya seimbang. Berapakah angka di dalam kotak misteri?"
          alias={["4", "empat"]}
        />
        <Pilih
          id={idKuisKartuResmi(ID, "L", 2)}
          nomor={3}
          soal="Boni ingin memasukkan permen rasa jeruk dan rasa apel ke dalam stoples sampai penuh tepat 10 permen. Pilihan mana yang tidak mungkin dipilih Boni?"
          anak="🫙 kosong · muat 10 🍬"
          pilihan={[
            { huruf: "A", teks: "5 jeruk dan 5 apel" },
            { huruf: "B", teks: "6 jeruk dan 4 apel" },
            { huruf: "C", teks: "7 jeruk dan 4 apel" },
          ]}
          benar="C"
        />
        <Kanvas
          id={idKuisKartuResmi(ID, "L", 3)}
          nomor={4}
          visual="🦆🦆🦆🦆 di air · 🌿🦆🦆🦆 di rumput"
          instruksi="Lihat bebek-bebek lucu itu! Tuliskan total seluruh bebek yang akan berada di dalam kolam jika bebek di rumput ikut menceburkan diri!"
          alias={["7", "tujuh"]}
        />
        <Kanvas
          id={idKuisKartuResmi(ID, "L", 4)}
          nomor={5}
          visual="🚲🚲 · 🛺"
          instruksi="Ciko memarkirkan 2 sepeda (masing-masing punya 2 roda) dan Cika membawa 1 becak (punya 3 roda). Hitunglah berapa jumlah semua roda kendaraan mereka!"
          alias={["7", "tujuh"]}
        />
        <Pilih
          id={idKuisKartuResmi(ID, "L", 5)}
          nomor={6}
          soal="Kamu melempar dadu pertama mendapat angka 3, lalu dadu kedua mendapat angka 2. Pion semula di angka 4. Di angka berapakah pionmu sekarang?"
          anak="🎲 ular tangga · pion di angka 4"
          pilihan={[
            { huruf: "A", teks: "Angka 7" },
            { huruf: "B", teks: "Angka 9" },
            { huruf: "C", teks: "Angka 8" },
          ]}
          benar="B"
        />
        <Kanvas
          id={idKuisKartuResmi(ID, "L", 6)}
          nomor={7}
          visual="🦋 sayap kiri ●●●●● · sayap kanan ●●●●●"
          instruksi="Sayap kiri memiliki 5 bintik indah. Agar kupu-kupu bisa terbang seimbang, sayap kanan juga harus memiliki 5 bintik. Berapa total bintik kupu-kupu tersebut?"
          alias={["10", "sepuluh"]}
        />
        <Pilih
          id={idKuisKartuResmi(ID, "L", 7)}
          nomor={8}
          soal="Ibu membuat 6 potong roti isi. Ayah memakan 0 potong roti isi. Berapakah jumlah roti isi yang tersisa sekarang?"
          anak="🥪🥪🥪🥪🥪🥪 di piring"
          pilihan={[
            { huruf: "A", teks: "0 potong" },
            { huruf: "B", teks: "6 potong" },
            { huruf: "C", teks: "7 potong" },
          ]}
          benar="B"
        />
        <Kanvas
          id={idKuisKartuResmi(ID, "L", 8)}
          nomor={9}
          visual="👦 🧱🧱🧱🧱 · 👧 🧱🧱🧱🧱🧱"
          instruksi="Jika mainan Ciko dan Cika ditumpuk menjadi satu menara tinggi, ada berapa kotak susunan menara tersebut?"
          alias={["9", "sembilan"]}
        />
        <Kanvas
          id={idKuisKartuResmi(ID, "L", 9)}
          nomor={10}
          visual="🔍 ? ➕ 3 = 10"
          instruksi="Aku adalah sebuah angka. Jika aku ditambah dengan angka 3, hasilku menjadi 10. Angka berapakah aku?"
          alias={["7", "tujuh"]}
        />
      </KartuBingkai>

      <KartuBingkai>
        <UcapanBintang />
        <JurnalCikoCika />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
    </div>
  );
}
