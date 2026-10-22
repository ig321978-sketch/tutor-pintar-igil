"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { NamaDialog } from "@/components/IkonDialogMtk1";
import TujuanBelajar from "@/components/TujuanBelajar";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB1 } from "@/lib/modul-resmi-mtk-2-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";

export const SLOT_AJUAN_SEBELUM_KARTU_D = "igil-slot-ajuan-sebelum-kartu-d";

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <p className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </p>
  );
}

function GambarCerita({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB1.id, kode, indeks);
}

function UmpanBenar({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function KuisPilih({
  id,
  soal,
  pilihan,
  benar,
  anak,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  anak?: ReactNode;
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
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
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={pesanSalah} />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function KuisSusun({
  id,
  soal,
  pool,
  benar,
  umpanBenar,
  pesanSalah,
}: {
  id: string;
  soal: string;
  pool: { kunci: string; tampil: ReactNode }[];
  benar: string[];
  umpanBenar: string;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((item) => !susun.includes(item.kunci));
  const periksa = () => {
    const ok = susun.length === benar.length && susun.every((item, indeks) => item === benar[indeks]);
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
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-xl bg-white px-3 py-3">
        {susun.length === 0 ? <p className="text-sm font-bold text-slate-400">Ketuk angka untuk menyusun.</p> : null}
        {susun.map((kunci) => {
          const item = pool.find((calon) => calon.kunci === kunci);
          return (
            <span key={kunci} className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white">
              {item?.tampil}
            </span>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.kunci}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, item.kunci]);
            }}
            className="rounded-xl border-2 border-[#1C01A5]/20 bg-white px-3 py-2 text-sm font-black text-[#1C01A5]"
          >
            {item.tampil}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setStatus(null);
            setSusun((lama) => lama.slice(0, -1));
          }}
          className="rounded-xl border-2 border-[#1C01A5]/20 px-4 py-2 text-sm font-black text-[#1C01A5]"
        >
          Urungkan
        </button>
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={susun.join(" - ") || undefined} pesanSalah={pesanSalah} />
        <UmpanBenar status={status} teks={umpanBenar} />
      </div>
    </article>
  );
}

function JudulSubBab({
  judul,
  kelas,
  kelamin,
  naskah,
}: {
  judul: string;
  kelas: string;
  kelamin?: KelaminGuru;
  naskah: string[];
}) {
  return (
    <>
      <h5 className="mt-5 text-left text-base font-black tracking-wide text-[#1C01A5] sm:text-lg">{judul}</h5>
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah([naskah], 2_000, 3_000)} />
      </div>
    </>
  );
}

function Dialog({ nama, warna, children }: { nama: string; warna: string; children: ReactNode }) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <NamaDialog nama={nama} />
      <div className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{children}</div>
    </article>
  );
}

function TabelNilaiTempat({ puluhan, satuan, hasil }: { puluhan: number; satuan: number; hasil: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-sky-400">
      <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
        <span>Puluhan</span>
        <span>Satuan</span>
        <span>Bilangan</span>
      </div>
      <div className="grid grid-cols-3 items-center bg-sky-50 px-3 py-3 text-center">
        <span className="text-3xl font-black text-[#1C01A5]">{puluhan}</span>
        <span className="text-3xl font-black text-[#1C01A5]">{satuan}</span>
        <span className="text-3xl font-black text-emerald-700">{hasil}</span>
      </div>
    </div>
  );
}

type WarnaPetak = "hijau" | "biru" | "kuning" | "ungu";

type MisiPetak = {
  warna: WarnaPetak;
  misi: string;
  narasi: string;
  mode: "suara" | "kanvas" | "pilih";
  ikon: string;
  jumlah: number;
  kananIkon?: string;
  kananJumlah?: number;
  angka?: string;
  alias: string[];
  benarPilih?: "pertama" | "kedua";
  bersama: string;
};

const PINTU_LOKER = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const MISI_LOKER: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Menghitung",
    narasi: "Ada 2 baris berisi 10 tas, lalu 4 tas. Berapa tasnya?",
    mode: "suara",
    ikon: "🎒",
    jumlah: 4,
    alias: ["24", "dua puluh empat"],
    bersama: "Igil menghitung: 10, 20, lalu 4. Jumlahnya 24.",
  },
  {
    warna: "biru",
    misi: "Membaca",
    narasi: "Bacalah bilangan ini.",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "32",
    alias: ["tiga puluh dua", "32"],
    bersama: "Igil membaca bersama: tiga puluh dua.",
  },
  {
    warna: "kuning",
    misi: "Menulis",
    narasi: "Tuliskan lambang dua puluh enam.",
    mode: "kanvas",
    ikon: "🎒",
    jumlah: 6,
    alias: ["26", "dua puluh enam"],
    bersama: "Dua puluh enam ditulis 26.",
  },
  {
    warna: "ungu",
    misi: "Membandingkan",
    narasi: "Pilih kelompok yang lebih banyak.",
    mode: "pilih",
    ikon: "🍬",
    jumlah: 2,
    kananIkon: "🍬",
    kananJumlah: 3,
    alias: ["kedua"],
    benarPilih: "kedua",
    bersama: "Kiri 2 puluhan = 26. Kanan 3 puluhan = 32. Kanan lebih banyak.",
  },
  {
    warna: "hijau",
    misi: "Menghitung",
    narasi: "Ada 4 ikat. Setiap ikat 10. Berapa semuanya?",
    mode: "suara",
    ikon: "✏️",
    jumlah: 4,
    alias: ["40", "empat puluh"],
    bersama: "Igil menghitung: 10, 20, 30, 40.",
  },
  {
    warna: "biru",
    misi: "Membaca",
    narasi: "Bacalah bilangan ini.",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "45",
    alias: ["empat puluh lima", "45"],
    bersama: "Igil membaca bersama: empat puluh lima.",
  },
  {
    warna: "kuning",
    misi: "Menulis",
    narasi: "Tuliskan angka puluhan pada 38.",
    mode: "kanvas",
    ikon: "",
    jumlah: 0,
    alias: ["3", "tiga"],
    bersama: "38 = 3 puluhan dan 8 satuan. Puluhannya 3.",
  },
  {
    warna: "ungu",
    misi: "Membandingkan",
    narasi: "Pilih kelompok yang lebih banyak.",
    mode: "pilih",
    ikon: "🧱",
    jumlah: 3,
    kananIkon: "🧱",
    kananJumlah: 4,
    alias: ["kedua"],
    benarPilih: "kedua",
    bersama: "Kiri 3 puluhan = 34. Kanan 4 puluhan = 44. Kanan lebih banyak.",
  },
  {
    warna: "hijau",
    misi: "Menghitung",
    narasi: "Ada 5 ikat. Setiap ikat 10. Berapa semuanya?",
    mode: "suara",
    ikon: "🥚",
    jumlah: 5,
    alias: ["50", "lima puluh"],
    bersama: "Igil menghitung: 10, 20, 30, 40, 50.",
  },
  {
    warna: "biru",
    misi: "Membaca",
    narasi: "Bacalah bilangan ini.",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "21",
    alias: ["dua puluh satu", "21"],
    bersama: "Igil membaca bersama: dua puluh satu.",
  },
];

const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-500 bg-emerald-50",
  biru: "border-sky-500 bg-sky-50",
  kuning: "border-amber-400 bg-amber-50",
  ungu: "border-violet-500 bg-violet-50",
};

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function BendaPetak({ ikon, jumlah, petunjuk }: { ikon: string; jumlah: number; petunjuk: number }) {
  if (!ikon || jumlah < 1) return null;
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {Array.from({ length: jumlah }, (_, i) => (
        <span key={`${ikon}-${i}`} className="inline-flex flex-col items-center">
          <span
            className={`text-3xl ${petunjuk >= 1 ? "loker-goyang" : ""}`}
            style={petunjuk >= 1 ? { animationDelay: `${i * 0.28}s` } : undefined}
          >
            {ikon}
          </span>
          {petunjuk >= 2 ? <span className="mt-1 h-2 w-2 rounded-full bg-[#1C01A5]" aria-hidden /> : null}
        </span>
      ))}
    </div>
  );
}

function MisiLokerKelas() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_LOKER[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;
  const daun = Object.values(jejak).reduce((jumlah, item) => jumlah + item.daun, 0);

  const catat = (indeks: number, benar: boolean) => {
    setJejak((lama) => {
      const sebelumnya = lama[indeks] ?? { petunjuk: 0, selesai: false, daun: 0 };
      if (sebelumnya.selesai) return lama;
      if (benar) {
        return {
          ...lama,
          [indeks]: { ...sebelumnya, selesai: true, daun: daunDariPetunjuk(sebelumnya.petunjuk) },
        };
      }
      return {
        ...lama,
        [indeks]: { ...sebelumnya, petunjuk: Math.min(3, sebelumnya.petunjuk + 1) },
      };
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <style>{`
        @keyframes loker-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-14deg) translateY(-3px); }
          70% { transform: rotate(12deg); }
        }
        .loker-goyang { animation: loker-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Igil mengisi 10 pintu loker. Pilih satu pintu, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🏫
        </span>
        {PINTU_LOKER.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_LOKER[indeks].warna]
              }`}
              aria-label={`Pintu ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏆
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm font-black text-[#1C01A5]">
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · menghitung</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · membaca</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · menulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · membandingkan</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang loker {bintang}/10 · Daun rapi {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Pintu {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Igil</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.mode === "kanvas" ? null : misi.angka ? (
          <p className={`mt-3 text-center text-6xl font-black text-[#1C01A5] ${kini.petunjuk >= 1 ? "loker-goyang" : ""}`}>
            {misi.angka}
          </p>
        ) : misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-center text-xs font-black uppercase text-[#1C01A5]">Kelompok pertama</p>
              <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
            </div>
            <div>
              <p className="text-center text-xs font-black uppercase text-[#1C01A5]">Kelompok kedua</p>
              <BendaPetak ikon={misi.kananIkon ?? misi.ikon} jumlah={misi.kananJumlah ?? 0} petunjuk={kini.petunjuk} />
            </div>
          </div>
        ) : (
          <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
        )}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Daunmu tetap aman. Coba lagi.</p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">Pintu ini sudah rapi. Pilih pintu lain, ya.</p>
        ) : null}
        {misi.mode === "suara" ? (
          <div className="mt-3" key={`suara-${aktif}`}>
            <SoalRekamSuara
              id={idKuis("C", aktif)}
              pertanyaan={misi.narasi}
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, misi.alias)}
              petunjuk="Jawab dengan suara, lalu kirim."
              sesudahNilai={(benar) => catat(aktif, benar)}
            />
          </div>
        ) : null}
        {misi.mode === "kanvas" ? (
          <KuisTulisKartu
            key={`kanvas-${aktif}`}
            id={idKuis("C", aktif)}
            hanyaKanvas
            rapat
            pertanyaan={misi.narasi}
            alias={kumpulkanAlias(misi.alias)}
            konteks={misi.bersama}
            sesudahNilai={(benar) => catat(aktif, benar)}
          />
        ) : null}
        {misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(["pertama", "kedua"] as const).map((pilih) => (
              <button
                key={pilih}
                type="button"
                onClick={() => {
                  const benar = pilih === misi.benarPilih;
                  if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
                  catat(aktif, benar);
                }}
                className="rounded-xl bg-[#1C01A5] px-3 py-2 text-sm font-black text-white hover:bg-[#16017a]"
              >
                Kelompok {pilih}
              </button>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}

function LembarKerja() {
  return (
    <div className="mt-4 space-y-4">
      <KuisPilih
        id={idKuis("D", 0)}
        soal="1. Ada 2 ikat pensil. Setiap ikat berisi 10. Ada 4 pensil lepas. Berapa pensil semuanya?"
        benar="B"
        umpanBenar="Tepat! 10 + 10 + 4 = 24."
        pesanSalah="Hitung dulu ikatannya, lalu tambah pensil lepas."
        anak={<IkonUlang ikon="✏️" jumlah={4} />}
        pilihan={[
          { huruf: "A", teks: "14" },
          { huruf: "B", teks: "24" },
          { huruf: "C", teks: "34" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="2. 29 sama dengan 20 ditambah ..."
        benar="C"
        umpanBenar="Benar! 20 + 9 = 29."
        pesanSalah="Lihat angka satuannya. Itu angka di kanan."
        pilihan={[
          { huruf: "A", teks: "7" },
          { huruf: "B", teks: "8" },
          { huruf: "C", teks: "9" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="3. Lambang 29 dibaca..."
        benar="A"
        umpanBenar="Benar! 29 dibaca dua puluh sembilan."
        pesanSalah="Puluhan dulu, lalu satuan."
        pilihan={[
          { huruf: "A", teks: "dua puluh sembilan" },
          { huruf: "B", teks: "dua sembilan" },
          { huruf: "C", teks: "sembilan puluh dua" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="4. Urutan maju: 28, titik, 30. Angka yang hilang adalah..."
        benar="B"
        umpanBenar="Tepat! Setelah 28 adalah 29, lalu 30."
        pesanSalah="Maju satu langkah dari 28."
        pilihan={[
          { huruf: "A", teks: "27" },
          { huruf: "B", teks: "29" },
          { huruf: "C", teks: "31" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 4)}
        soal="5. Pada tabel nilai tempat, bilangan 39 punya puluhan..."
        benar="A"
        umpanBenar="Benar! 39 = 3 puluhan dan 9 satuan."
        pesanSalah="Puluhan adalah angka di kiri."
        anak={<TabelNilaiTempat puluhan={3} satuan={9} hasil={39} />}
        pilihan={[
          { huruf: "A", teks: "3" },
          { huruf: "B", teks: "9" },
          { huruf: "C", teks: "39" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 5)}
        soal="6. 28 = ... puluhan + ... satuan"
        benar="B"
        umpanBenar="Tepat! 2 puluhan dan 8 satuan."
        pesanSalah="Angka kiri puluhan. Angka kanan satuan."
        pilihan={[
          { huruf: "A", teks: "8 puluhan dan 2 satuan" },
          { huruf: "B", teks: "2 puluhan dan 8 satuan" },
          { huruf: "C", teks: "20 puluhan dan 8 satuan" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 6)}
        soal="7. 31 = 3 puluhan + 1 satuan. Pernyataan ini..."
        benar="A"
        umpanBenar="Benar! 3 puluhan adalah 30. Ditambah 1 satuan menjadi 31."
        pesanSalah="Coba pecah 31 menjadi puluhan dan satuan."
        pilihan={[
          { huruf: "A", teks: "Benar" },
          { huruf: "B", teks: "Salah, seharusnya 1 puluhan dan 3 satuan" },
          { huruf: "C", teks: "Salah, seharusnya 31 puluhan" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 7)}
        soal="8. Kira punya 26 permen. Tika punya 32 permen. Siapa yang lebih banyak?"
        benar="B"
        umpanBenar="Tepat! 32 punya 3 puluhan. 26 punya 2 puluhan. Tika lebih banyak."
        pesanSalah="Bandingkan puluhan dulu."
        pilihan={[
          { huruf: "A", teks: "Kira" },
          { huruf: "B", teks: "Tika" },
          { huruf: "C", teks: "Sama banyak" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 8)}
        soal="9. Urutan dari paling kecil: 32, 28, 23, 30, 37"
        benar="C"
        umpanBenar="Benar! 23, 28, 30, 32, 37."
        pesanSalah="Mulai dari bilangan paling kecil."
        pilihan={[
          { huruf: "A", teks: "37, 32, 30, 28, 23" },
          { huruf: "B", teks: "23, 30, 28, 32, 37" },
          { huruf: "C", teks: "23, 28, 30, 32, 37" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 9)}
        soal="10. Mana yang lebih besar?"
        benar="A"
        umpanBenar="Tepat! 1 puluhan dan 14 satuan = 24. 2 puluhan dan 3 satuan = 23. Jadi 24 lebih besar."
        pesanSalah="Ubah dulu menjadi bilangan utuh, lalu bandingkan."
        pilihan={[
          { huruf: "A", teks: "1 puluhan dan 14 satuan" },
          { huruf: "B", teks: "2 puluhan dan 3 satuan" },
          { huruf: "C", teks: "Keduanya sama" },
        ]}
      />
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
  const [kartuA, , kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫🎒🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Menghitung, membaca, dan menulis bilangan sampai 50.",
            "Mengelompokkan benda sepuluh-sepuluh.",
            "Menuliskan puluhan dan satuan pada tabel nilai tempat.",
            "Membandingkan dan mengurutkan dua bilangan atau lebih.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai dengan 50"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Anak-anak, hari ini kita menghitung tas di loker baru.",
            "Kita kelompokkan setiap sepuluh tas. Lalu kita baca dan tulis angkanya sampai 50.",
            "Ceritanya di kelas Malosi. Igil ikut menghitung. Ayo mulai.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab1-loker.jpg"
            alt="Malosi memasukkan tas terakhir ke loker baru. Teman-teman dan burung hantu Igil menonton."
          />
          <Dialog nama="Malosi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Aku giliran terakhir meletakkan tas.”
          </Dialog>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Loker baru ini rapi sekali!”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Hoo! Yuk hitung tasnya. Jangan sampai ada yang terlewat.”
          </Dialog>
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab1-tas.jpg"
            alt="Tiga baris tas: sepuluh, sepuluh, dan enam. Malosi, Tika, dan Igil menghitung."
          />
          <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9F1239]">Baris tas di loker</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Baris 1: 10 tas. Baris 2: 10 tas. Baris 3: 6 tas.</p>
            <p className="mt-2 text-2xl font-black text-[#1C01A5]">10 + 10 + 6 = 26</p>
            <p className="text-sm font-bold text-slate-700">26 dibaca dua puluh enam.</p>
          </article>
          <Dialog nama="Malosi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Ada 26 tas. Berarti ada 26 siswa di kelas kita.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Benar. Banyak tas sama dengan banyak siswa.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            idKanvas={idKuis("A", 1)}
            pertanyaanSuara="Ada berapa tas di loker kelas Malosi?"
            aliasSuara={["26", "dua puluh enam"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan lambang dua puluh enam."
            aliasKanvas={["26", "dua puluh enam"]}
            konteksKanvas="10 + 10 + 6 = 26. Dibaca dua puluh enam."
          />
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab1-ikat.jpg"
            alt="Ikat pensil, wadah telur, dan balok dikelompokkan sepuluh-sepuluh. Igil ikut melihat."
          />
          <Dialog nama="Upe" warna="border-orange-300 bg-orange-50">
            “Menghitung satu-satu lama, Igil.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kelompokkan setiap 10 benda. Satu ikat pensil = 10. Satu wadah telur = 10.”
          </Dialog>
          <div className="overflow-hidden rounded-2xl border-4 border-sky-400">
            <div className="grid grid-cols-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
              <span>Kelompok 10</span>
              <span>Bilangan</span>
            </div>
            {[
              ["1 ikat", "10 · sepuluh"],
              ["2 ikat", "20 · dua puluh"],
              ["3 ikat", "30 · tiga puluh"],
              ["4 ikat", "40 · empat puluh"],
              ["5 ikat", "50 · lima puluh"],
            ].map(([kiri, kanan], i) => (
              <div
                key={kiri}
                className={`grid grid-cols-2 border-t border-sky-200 px-3 py-2 text-sm font-bold ${
                  i % 2 === 0 ? "bg-sky-50" : "bg-[#F0FDF4]"
                }`}
              >
                <span>{kiri}</span>
                <span className="font-black text-[#1C01A5]">{kanan}</span>
              </div>
            ))}
          </div>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            idKanvas={idKuis("A", 3)}
            pertanyaanSuara="Satu ikat pensil berisi berapa?"
            aliasSuara={["10", "sepuluh"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 20 + 6."
            aliasKanvas={["26", "20 + 6 = 26", "20+6=26"]}
            konteksKanvas="20 tas ditambah 6 tas. Hasilnya 26."
          />
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab1-maju.jpg"
            alt="Igil melompat di batu jalan. Anak-anak menghitung maju dari 20 sampai 30."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Aku maju di batu jalan. Hitung maju: 20, 21, 22.”
          </Dialog>
          <Dialog nama="Lili" warna="border-violet-300 bg-violet-50">
            “Lalu 23, 24, 25, 26, 27, 28, 29, 30.”
          </Dialog>
          <p className="text-center text-lg font-black tracking-wide text-[#1C01A5]">
            20 · 21 · 22 · 23 · 24 · 25 · 26 · 27 · 28 · 29 · 30
          </p>
          <KuisSusun
            id={idKuis("A", 4)}
            soal="Susun bilangan maju dari yang kecil."
            pool={[
              { kunci: "24", tampil: "24" },
              { kunci: "21", tampil: "21" },
              { kunci: "23", tampil: "23" },
              { kunci: "22", tampil: "22" },
            ]}
            benar={["21", "22", "23", "24"]}
            umpanBenar="Benar! Itu menghitung maju: 21, 22, 23, 24."
            pesanSalah="Mulai dari bilangan paling kecil."
          />
          <Dialog nama="Halim" warna="border-cyan-300 bg-cyan-50">
            “Sekarang mundur dari 30: 30, 29, 28.”
          </Dialog>
          <p className="text-center text-lg font-black tracking-wide text-[#1C01A5]">
            30 · 29 · 28 · 27 · 26 · 25 · 24 · 23 · 22 · 21 · 20
          </p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 5)}
            pertanyaanSuara="Saat menghitung mundur, setelah 30 adalah berapa?"
            aliasSuara={["29", "dua puluh sembilan"]}
            petunjukSuara="Sebutkan bilangan yang lebih kecil satu langkah."
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab B: Nilai Tempat"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Nilai tempat punya dua rumah. Kiri puluhan. Kanan satuan.",
            "Satu puluhan sama dengan sepuluh satuan.",
            "Malosi menyusun balok. Igil menjaga agar tidak jatuh.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab1-nilai.jpg"
            alt="Malosi menyusun balok puluhan dan satuan. Igil menonton di samping tabel nilai tempat."
          />
          <Dialog nama="Malosi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Balokku banyak. Aku susun 2 puluhan dan 6 satuan.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Itu 20 ditambah 6. Hasilnya 26.”
          </Dialog>
          <TabelNilaiTempat puluhan={2} satuan={6} hasil={26} />
          <p className="text-sm font-semibold text-slate-700">26 bisa ditulis dengan tiga cara.</p>
          <ul className="space-y-2 text-sm font-bold text-[#1C01A5]">
            <li>26 satuan</li>
            <li>1 puluhan dan 16 satuan</li>
            <li>2 puluhan dan 6 satuan</li>
          </ul>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “24 itu 2 puluhan dan 4 satuan.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="24 punya berapa puluhan?"
            aliasSuara={["2", "dua", "2 puluhan"]}
            petunjukSuara="Sebutkan angka puluhannya."
            pertanyaanKanvas="Tuliskan 2 puluhan dan 4 satuan."
            aliasKanvas={["24", "2 puluhan dan 4 satuan"]}
            konteksKanvas="2 puluhan adalah 20. Ditambah 4 satuan menjadi 24."
          />
          <KuisPilih
            id={idKuis("B", 4)}
            soal="1 puluhan dan 16 satuan sama dengan berapa?"
            benar="A"
            umpanBenar="Benar! 10 + 16 = 26."
            pesanSalah="Ubah puluhan menjadi 10, lalu jumlahkan."
            pilihan={[
              { huruf: "A", teks: "26" },
              { huruf: "B", teks: "116" },
              { huruf: "C", teks: "16" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab C: Membandingkan Dua Bilangan atau Lebih"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Hari ini ulang tahun Kira. Ada stoples permen.",
            "Kita tebak dulu, lalu hitung. Setelah itu kita bandingkan dengan permen Tika.",
            "Bandingkan puluhan dulu. Igil jaga agar tidak tertukar.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab1-banding.jpg"
            alt="Kira membawa stoples permen. Tika membawa mangkuk permen. Igil memakai topi pesta."
          />
          <Dialog nama="Kira" warna="border-teal-300 bg-teal-50">
            “Aku bawa stoples permen. Tebak, ada berapa?”
          </Dialog>
          <Dialog nama="Malosi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Kurasa 20.”
          </Dialog>
          <Dialog nama="Halim" warna="border-cyan-300 bg-cyan-50">
            “Kurasa 30.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Ayo hitung. Ternyata ada 26 permen.”
          </Dialog>
          <p className="text-center text-3xl font-black text-[#1C01A5]">26</p>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Aku bawa 32 permen. Siapa yang lebih banyak?”
          </Dialog>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border-2 border-teal-200 bg-teal-50 px-4 py-3">
              <p className="text-xs font-black uppercase text-teal-800">Kira</p>
              <TabelNilaiTempat puluhan={2} satuan={6} hasil={26} />
            </article>
            <article className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3">
              <p className="text-xs font-black uppercase text-rose-800">Tika</p>
              <TabelNilaiTempat puluhan={3} satuan={2} hasil={32} />
            </article>
          </div>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Lihat puluhan dulu. 3 puluhan lebih banyak daripada 2 puluhan. Jadi 32 lebih besar dari 26.”
          </Dialog>
          <p className="text-center text-4xl font-black text-[#1C01A5]">32 &gt; 26</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            idKanvas={idKuis("B", 3)}
            pertanyaanSuara="Permen siapa yang lebih banyak, Kira 26 atau Tika 32?"
            aliasSuara={["tika"]}
            petunjukSuara="Sebutkan namanya."
            pertanyaanKanvas="Tuliskan 32 > 26."
            aliasKanvas={["32 > 26", "32>26"]}
            konteksKanvas="Tiga puluhan lebih banyak daripada dua puluhan. 32 > 26."
          />
          <KuisSusun
            id={idKuis("B", 5)}
            soal="Urutkan dari yang paling kecil."
            pool={[
              { kunci: "34", tampil: "34" },
              { kunci: "20", tampil: "20" },
              { kunci: "23", tampil: "23" },
              { kunci: "45", tampil: "45" },
            ]}
            benar={["20", "23", "34", "45"]}
            umpanBenar="Benar! 20, 23, 34, 45."
            pesanSalah="Mulai dari bilangan paling kecil."
          />
          <KuisPilih
            id={idKuis("B", 6)}
            soal="Lingkari bilangan yang lebih kecil."
            benar="B"
            umpanBenar="Tepat! 35 lebih kecil daripada 38."
            pesanSalah="Puluhannya sama. Lihat satuannya."
            pilihan={[
              { huruf: "A", teks: "38" },
              { huruf: "B", teks: "35" },
              { huruf: "C", teks: "Keduanya sama" },
            ]}
          />
          <KuisPilih
            id={idKuis("B", 7)}
            soal="Kartu Tika: 4, 3, 2, 1. Bilangan paling besar dari dua kartu adalah..."
            benar="A"
            umpanBenar="Benar! Ambil 4 dan 3. Bilangan terbesar 43."
            pesanSalah="Pilih dua kartu terbesar. Letakkan yang besar di kiri."
            pilihan={[
              { huruf: "A", teks: "43" },
              { huruf: "B", teks: "34" },
              { huruf: "C", teks: "21" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫⭐🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh pintu · menghitung, membaca, menulis, membandingkan
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiLokerKelas />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Kelompokkan setiap 10 benda agar menghitung lebih cepat.",
          "1 puluhan sama dengan 10 satuan.",
          "Puluhan ditulis di kiri. Satuan ditulis di kanan.",
          "26 bisa 2 puluhan 6 satuan, 1 puluhan 16 satuan, atau 26 satuan.",
          "Bandingkan puluhan dulu. Jika sama, bandingkan satuan.",
          "Bilangan yang puluhannya lebih banyak adalah bilangan lebih besar.",
          "Menghitung maju berjalan dari kecil ke besar.",
          "Menghitung mundur berjalan dari besar ke kecil.",
          "Tebak dulu, lalu hitung untuk membuktikan.",
          "Banyak tas di loker sama dengan banyak siswa di kelas Malosi.",
        ]}
        penutup="Kalimat kunci: “Kelompokkan sepuluh-sepuluh, tulis puluhan dan satuan, lalu bandingkan.”"
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Ayo Membilang sampai dengan 50
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)}
          />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB1.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Kelompokkan sepuluh-sepuluh, tulis puluhan dan satuan, lalu bandingkan."
          alias={kumpulkanAlias(["kelompokkan sepuluh-sepuluh", "puluhan dan satuan", "bandingkan"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
