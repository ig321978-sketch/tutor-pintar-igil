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
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB2 } from "@/lib/modul-resmi-mtk-2-bab2";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KelaminGuru } from "@/lib/guru";

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
  return idKuisKartuResmi(MODUL_MTK2_BAB2.id, kode, indeks);
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

function SelAngka({ nilai, hijau }: { nilai: string; hijau?: boolean }) {
  return (
    <span className={`text-3xl font-black ${hijau ? "text-emerald-700" : "text-[#1C01A5]"}`}>
      {nilai === "" ? "\u00a0" : nilai}
    </span>
  );
}

function TabelBersusun({
  judul,
  baris,
}: {
  judul: string;
  baris: Array<{ puluhan: string; satuan: string; hijau?: boolean; catatan?: string }>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-sky-400">
      <p className="bg-[#1C01A5] px-3 py-2 text-center text-[10px] font-black uppercase text-white sm:text-xs">
        {judul}
      </p>
      <div className="grid grid-cols-2 bg-sky-200 px-3 py-2 text-center text-[10px] font-black uppercase text-[#1C01A5] sm:text-xs">
        <span>Puluhan</span>
        <span>Satuan</span>
      </div>
      {baris.map((item, indeks) => (
        <div key={`${item.puluhan}-${item.satuan}-${indeks}`} className="border-t border-sky-200">
          <div className={`grid grid-cols-2 items-center px-3 py-2 text-center ${item.hijau ? "bg-emerald-50" : "bg-sky-50"}`}>
            <SelAngka nilai={item.puluhan} hijau={item.hijau} />
            <SelAngka nilai={item.satuan} hijau={item.hijau} />
          </div>
          {item.catatan ? (
            <p className="px-3 pb-2 text-center text-xs font-bold text-rose-700">{item.catatan}</p>
          ) : null}
        </div>
      ))}
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
  angka?: string;
  alias: string[];
  labelPertama?: string;
  labelKedua?: string;
  benarPilih?: "pertama" | "kedua";
  bersama: string;
};

const NOMOR_JAMBU = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-300 bg-emerald-50",
  biru: "border-sky-300 bg-sky-50",
  kuning: "border-amber-300 bg-amber-50",
  ungu: "border-violet-300 bg-violet-50",
};

const MISI_KERANJANG: MisiPetak[] = [
  {
    warna: "hijau",
    misi: "Menghitung maju",
    narasi: "Tika 12 jambu. Kira 6 lebih banyak. Berapa jambu Kira?",
    mode: "suara",
    ikon: "🍎",
    jumlah: 6,
    alias: ["18", "delapan belas"],
    bersama: "Igil maju: 13, 14, 15, 16, 17, 18. Jadi 12 + 6 = 18.",
  },
  {
    warna: "biru",
    misi: "Bersusun",
    narasi: "10 + 6. Berapa hasilnya?",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "10 + 6",
    alias: ["16", "enam belas"],
    bersama: "Satuan 0 + 6 = 6. Puluhan 1. Hasil 16.",
  },
  {
    warna: "kuning",
    misi: "Pasangan sepuluh",
    narasi: "Tuliskan 14 + 3.",
    mode: "kanvas",
    ikon: "🍎",
    jumlah: 3,
    alias: ["17", "14 + 3 = 17", "14+3=17"],
    bersama: "14 adalah 10 dan 4. 4 + 3 = 7. 10 + 7 = 17.",
  },
  {
    warna: "ungu",
    misi: "Selisih",
    narasi: "18 jambu Kira. 12 jambu Tika. Berapa selisihnya?",
    mode: "pilih",
    ikon: "",
    jumlah: 0,
    alias: ["pertama"],
    labelPertama: "6",
    labelKedua: "30",
    benarPilih: "pertama",
    bersama: "18 - 12 = 6. Bukan 18 + 12.",
  },
  {
    warna: "hijau",
    misi: "Menghitung mundur",
    narasi: "18 dikurangi 12. Berapa?",
    mode: "suara",
    ikon: "🍎",
    jumlah: 6,
    alias: ["6", "enam"],
    bersama: "Igil mundur 12 langkah dari 18. Sampai 6.",
  },
  {
    warna: "biru",
    misi: "Bersusun",
    narasi: "12 dikurangi 8. Berapa sisa?",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "12 − 8",
    alias: ["4", "empat"],
    bersama: "2 satuan kurang dari 8. Urai puluhan. 12 - 8 = 4.",
  },
  {
    warna: "kuning",
    misi: "Pasangan sepuluh",
    narasi: "Tuliskan 15 - 4.",
    mode: "kanvas",
    ikon: "🍎",
    jumlah: 4,
    alias: ["11", "15 - 4 = 11", "15-4=11"],
    bersama: "15 adalah 10 dan 5. 5 - 4 = 1. 10 + 1 = 11.",
  },
  {
    warna: "ungu",
    misi: "Kurangnya",
    narasi: "Tika 12 donat. Malosi 5 kurangnya. Berapa donat Malosi?",
    mode: "pilih",
    ikon: "",
    jumlah: 0,
    alias: ["kedua"],
    labelPertama: "17",
    labelKedua: "7",
    benarPilih: "kedua",
    bersama: "Kurangnya artinya dikurangi. 12 - 5 = 7.",
  },
  {
    warna: "hijau",
    misi: "Jumlah",
    narasi: "Tika 5, Kira 7, Lili 8 boneka. Berapa jumlahnya?",
    mode: "suara",
    ikon: "🧸",
    jumlah: 5,
    alias: ["20", "dua puluh"],
    bersama: "5 + 7 = 12. 12 + 8 = 20.",
  },
  {
    warna: "biru",
    misi: "Semula",
    narasi: "Halim sisa 12 jeruk setelah memberi 4. Semula berapa?",
    mode: "suara",
    ikon: "",
    jumlah: 0,
    angka: "… − 4 = 12",
    alias: ["16", "enam belas"],
    bersama: "12 + 4 = 16. Jeruk Halim semula 16.",
  },
];

function daunDariPetunjuk(petunjuk: number): number {
  if (petunjuk <= 0) return 3;
  if (petunjuk === 1) return 2;
  return 1;
}

function BendaPetak({ ikon, jumlah, petunjuk }: { ikon: string; jumlah: number; petunjuk: number }) {
  if (!ikon || jumlah <= 0) return null;
  return (
    <p className={`mt-3 text-center text-2xl leading-relaxed ${petunjuk >= 1 ? "jambu-goyang" : ""}`} aria-hidden>
      {Array.from({ length: Math.min(jumlah, 8) }, () => ikon).join(" ")}
    </p>
  );
}

function MisiKeranjangPanen() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const misi = MISI_KERANJANG[aktif];
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
        @keyframes jambu-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-14deg) translateY(-3px); }
          70% { transform: rotate(12deg); }
        }
        .jambu-goyang { animation: jambu-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Igil mengisi 10 jambu ke keranjang. Pilih satu jambu, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          🧺
        </span>
        {NOMOR_JAMBU.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_KERANJANG[indeks].warna]
              }`}
              aria-label={`Jambu ${indeks + 1}${selesai ? ", selesai" : ""}`}
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
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · maju mundur</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · bersusun</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · pasangan</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · soal cerita</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang panen {bintang}/10 · Daun rapi {daun} 🍃
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Jambu {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Igil</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.mode === "kanvas" ? null : misi.angka ? (
          <p className={`mt-3 text-center text-5xl font-black text-[#1C01A5] ${kini.petunjuk >= 1 ? "jambu-goyang" : ""}`}>
            {misi.angka}
          </p>
        ) : misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <p className="rounded-xl bg-white px-3 py-4 text-center text-4xl font-black text-[#1C01A5]">{misi.labelPertama}</p>
            <p className="rounded-xl bg-white px-3 py-4 text-center text-4xl font-black text-[#1C01A5]">{misi.labelKedua}</p>
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
          <p className="mt-3 text-sm font-black text-emerald-800">Jambu ini sudah masuk keranjang. Pilih jambu lain, ya.</p>
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
                {pilih === "pertama" ? misi.labelPertama : misi.labelKedua}
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
        soal="1. Tika memetik 12 jambu air. Kira memetik 6 lebih banyak. Berapa jambu air Kira?"
        benar="B"
        umpanBenar="Tepat! 6 lebihnya artinya ditambah 6. 12 + 6 = 18."
        pesanSalah="Lebihnya artinya ditambah, bukan dikurangi."
        anak={<IkonUlang ikon="🍎" jumlah={6} />}
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "18" },
          { huruf: "C", teks: "12" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 1)}
        soal="2. 12 + 6 dengan menghitung maju. Hasilnya..."
        benar="A"
        umpanBenar="Benar! Lompat 6 langkah: 13, 14, 15, 16, 17, 18."
        pesanSalah="Mulai dari 12, lalu maju 6 langkah."
        pilihan={[
          { huruf: "A", teks: "18" },
          { huruf: "B", teks: "16" },
          { huruf: "C", teks: "6" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 2)}
        soal="3. Penjumlahan bersusun 12 + 6. Satuan 2 + 6 sama dengan..."
        benar="C"
        umpanBenar="Benar! Satuan dulu: 2 + 6 = 8. Puluhan 1. Hasil 18."
        pesanSalah="Jumlahkan angka satuan dulu, yaitu 2 dan 6."
        anak={
          <TabelBersusun
            judul="12 + 6"
            baris={[
              { puluhan: "1", satuan: "2" },
              { puluhan: "", satuan: "6" },
              { puluhan: "1", satuan: "8", hijau: true },
            ]}
          />
        }
        pilihan={[
          { huruf: "A", teks: "2" },
          { huruf: "B", teks: "6" },
          { huruf: "C", teks: "8" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 3)}
        soal="4. Kira punya 18 jambu. Dia memetik lagi 2. 8 satuan + 2 satuan = 10 satuan = 1 puluhan. Hasil 18 + 2 adalah..."
        benar="B"
        umpanBenar="Tepat! 10 satuan pindah jadi 1 puluhan. 1 puluhan + 1 puluhan = 2 puluhan. Hasil 20."
        pesanSalah="8 + 2 = 10. Sepuluh satuan sama dengan 1 puluhan."
        pilihan={[
          { huruf: "A", teks: "18" },
          { huruf: "B", teks: "20" },
          { huruf: "C", teks: "10" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 4)}
        soal="5. Kira punya 18 jambu. Tika punya 12 jambu. Selisihnya..."
        benar="A"
        umpanBenar="Benar! Selisih artinya dikurangi. 18 - 12 = 6."
        pesanSalah="Selisih bukan jumlah. Kurangkan yang besar dengan yang kecil."
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "30" },
          { huruf: "C", teks: "18" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 5)}
        soal="6. Tika punya 12 jambu. Dia memberi 8 kepada Lili. 2 satuan kurang dari 8, jadi puluhan diurai. Sisa jambu Tika..."
        benar="C"
        umpanBenar="Tepat! Urai 1 puluhan jadi 10 satuan. 2 + 10 = 12 satuan. 12 - 8 = 4."
        pesanSalah="2 tidak cukup dikurangi 8. Urai dulu 1 puluhan."
        pilihan={[
          { huruf: "A", teks: "8" },
          { huruf: "B", teks: "20" },
          { huruf: "C", teks: "4" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 6)}
        soal="7. Tika punya 12 donat. Malosi punya 5 kurangnya dari donat Tika. Donat Malosi..."
        benar="B"
        umpanBenar="Benar! Kurangnya artinya dikurangi. 12 - 5 = 7."
        pesanSalah="Kurangnya bukan ditambah. 12 dikurangi 5."
        pilihan={[
          { huruf: "A", teks: "17" },
          { huruf: "B", teks: "7" },
          { huruf: "C", teks: "5" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 7)}
        soal="8. Halim memberi 4 jeruk kepada Lili. Sisa jeruk Halim 12. Jeruk Halim sebelumnya..."
        benar="A"
        umpanBenar="Tepat! … - 4 = 12. Jadi 12 + 4 = 16."
        pesanSalah="Yang diberi ditambah ke sisa. Itu bilangan semula."
        pilihan={[
          { huruf: "A", teks: "16" },
          { huruf: "B", teks: "8" },
          { huruf: "C", teks: "12" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 8)}
        soal="9. Tika 5 boneka, Kira 7 boneka, Lili 8 boneka. Jumlah semua boneka..."
        benar="C"
        umpanBenar="Benar! 5 + 7 = 12. 12 + 8 = 20."
        pesanSalah="Jumlahkan bertahap. Dua dulu, lalu yang ketiga."
        pilihan={[
          { huruf: "A", teks: "12" },
          { huruf: "B", teks: "15" },
          { huruf: "C", teks: "20" },
        ]}
      />
      <KuisPilih
        id={idKuis("D", 9)}
        soal="10. Upe punya 11 kelereng. Kelereng Upe 3 lebihnya dari kelereng Halim. Kelereng Halim..."
        benar="B"
        umpanBenar="Tepat! Upe lebih banyak 3. Jadi Halim 11 - 3 = 8."
        pesanSalah="Upe yang lebih banyak. Halim lebih sedikit 3."
        pilihan={[
          { huruf: "A", teks: "14" },
          { huruf: "B", teks: "8" },
          { huruf: "C", teks: "11" },
        ]}
      />
    </div>
  );
}

export default function NaskahMtk2Bab2({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB2;
  const [kartuA, , kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌳🍎🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Menjumlahkan dengan menghitung maju, bersusun, dan pasangan bilangan.",
            "Mengurangkan dengan menghitung mundur, bersusun, dan pasangan bilangan.",
            "Memakai tabel puluhan dan satuan.",
            "Menyelesaikan soal cerita dengan kata lebihnya, kurangnya, selisih, dan jumlah.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab A: Berbagai Cara Melakukan Penjumlahan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Anak-anak, hari ini kita memanen jambu air di halaman Tika.",
            "Tika memetik 12. Kira memetik 6 lebih banyak. Igil ikut menghitung.",
            "Kita coba tiga cara: maju, bersusun, dan pasangan sepuluh.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab2-pohon.jpg"
            alt="Tika dan Kira memetik jambu air di halaman. Burung hantu Igil menonton di dahan."
          />
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Aku memetik 12 buah jambu air.”
          </Dialog>
          <Dialog nama="Kira" warna="border-teal-300 bg-teal-50">
            “Aku memetik 6 lebihnya dari jambu air milik Tika.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Hoo! Enam lebihnya artinya ditambah enam. Yuk hitung jambu Kira.”
          </Dialog>
          <p className="text-center text-3xl font-black text-[#1C01A5]">12 + 6 = 18</p>
          <Dialog nama="Kira" warna="border-teal-300 bg-teal-50">
            “Jambuku 18. Manis sekali!”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            idKanvas={idKuis("A", 1)}
            pertanyaanSuara="Tika 12 jambu, Kira 6 lebih banyak. Berapa jambu Kira?"
            aliasSuara={["18", "delapan belas"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 12 + 6."
            aliasKanvas={["18", "12 + 6 = 18", "12+6=18"]}
            konteksKanvas="6 lebihnya artinya 12 + 6 = 18."
          />

          <GambarCerita
            src="/doodle-mtk/mtk-2-bab2-maju.jpg"
            alt="Igil melompat maju di batu angka dari 12 sampai 18. Tika dan Kira menghitung."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Cara 1: menghitung maju. Mulai dari 12, lompat 6 langkah.”
          </Dialog>
          <p className="text-center text-lg font-black tracking-wide text-[#1C01A5]">
            12 · 13 · 14 · 15 · 16 · 17 · 18
          </p>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “13, 14, 15, 16, 17, 18. Sampai 18!”
          </Dialog>
          <KuisSusun
            id={idKuis("A", 4)}
            soal="Susun lompatan maju dari 12 sampai 16."
            pool={[
              { kunci: "15", tampil: "15" },
              { kunci: "13", tampil: "13" },
              { kunci: "16", tampil: "16" },
              { kunci: "14", tampil: "14" },
            ]}
            benar={["13", "14", "15", "16"]}
            umpanBenar="Benar! Itu menghitung maju: 13, 14, 15, 16."
            pesanSalah="Mulai dari 13, lalu naik satu-satu."
          />

          <GambarCerita
            src="/doodle-mtk/mtk-2-bab2-susun.jpg"
            alt="Igil dan Malosi menyusun jambu di tabel puluhan dan satuan. 12 tambah 6."
          />
          <Dialog nama="Malosi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Cara 2: bersusun. Satuan di bawah satuan.”
          </Dialog>
          <TabelNilaiTempat puluhan={1} satuan={2} hasil={12} />
          <TabelBersusun
            judul="12 + 6"
            baris={[
              { puluhan: "1", satuan: "2" },
              { puluhan: "", satuan: "6" },
              { puluhan: "1", satuan: "8", hijau: true },
            ]}
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “2 + 6 = 8 satuan. Puluhannya 1. Hasil 18.”
          </Dialog>
          <Dialog nama="Kira" warna="border-teal-300 bg-teal-50">
            “Cara 3: pasangan sepuluh. 12 adalah 10 dan 2.”
          </Dialog>
          <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9F1239]">Pasangan bilangan</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">12 = 10 + 2</p>
            <p className="text-sm font-semibold text-slate-700">2 + 6 = 8</p>
            <p className="mt-2 text-2xl font-black text-[#1C01A5]">10 + 8 = 18</p>
          </article>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            idKanvas={idKuis("A", 3)}
            pertanyaanSuara="1 puluhan sama dengan berapa satuan?"
            aliasSuara={["10", "sepuluh"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 18 + 2."
            aliasKanvas={["20", "18 + 2 = 20", "18+2=20"]}
            konteksKanvas="8 + 2 = 10 satuan. 10 satuan = 1 puluhan. 18 + 2 = 20."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kira punya 18. Memetik lagi 2. 8 + 2 = 10 satuan. Pindah jadi 1 puluhan. Hasil 20.”
          </Dialog>
          <TabelBersusun
            judul="18 + 2"
            baris={[
              { puluhan: "1", satuan: "8" },
              { puluhan: "", satuan: "2" },
              { puluhan: "1", satuan: "10", catatan: "10 satuan = 1 puluhan, pindah" },
              { puluhan: "2", satuan: "0", hijau: true },
            ]}
          />
          <KuisPilih
            id={idKuis("A", 5)}
            soal="10 + 6 sama dengan berapa?"
            benar="A"
            umpanBenar="Benar! 10 + 6 = 16."
            pesanSalah="Sepuluh ditambah enam."
            pilihan={[
              { huruf: "A", teks: "16" },
              { huruf: "B", teks: "4" },
              { huruf: "C", teks: "106" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab B: Berbagai Cara Melakukan Pengurangan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Kira 18 jambu. Tika 12 jambu. Berapa selisihnya?",
            "Kurangi dengan mundur, bersusun, atau pasangan sepuluh.",
            "Igil jaga agar satuan tetap di bawah satuan.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab2-kurang.jpg"
            alt="Tika memberi jambu kepada Lili. Kira dan Igil menghitung sisa dan selisih."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Cara 1: menghitung mundur. Dari 18, mundur 12 langkah.”
          </Dialog>
          <p className="text-center text-lg font-black tracking-wide text-[#1C01A5]">
            18 · 17 · 16 · 15 · 14 · 13 · 12 · 11 · 10 · 9 · 8 · 7 · 6
          </p>
          <p className="text-center text-3xl font-black text-[#1C01A5]">18 − 12 = 6</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="Selisih 18 dan 12 berapa?"
            aliasSuara={["6", "enam"]}
            petunjukSuara="Ucapkan angkanya."
            pertanyaanKanvas="Tuliskan 18 - 12."
            aliasKanvas={["6", "18 - 12 = 6", "18-12=6"]}
            konteksKanvas="Selisih artinya dikurangi. 18 - 12 = 6."
          />
          <Dialog nama="Lili" warna="border-violet-300 bg-violet-50">
            “Tika, boleh aku minta 8 jambu?”
          </Dialog>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Boleh. Aku punya 12. 2 satuan kurang dari 8, ya?”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Urai 1 puluhan jadi 10 satuan. 2 + 10 = 12 satuan. 12 - 8 = 4.”
          </Dialog>
          <TabelBersusun
            judul="12 − 8"
            baris={[
              { puluhan: "1", satuan: "2", catatan: "2 kurang dari 8" },
              { puluhan: "", satuan: "8" },
              { puluhan: "0", satuan: "12", catatan: "urai puluhan: 2 + 10 = 12" },
              { puluhan: "0", satuan: "4", hijau: true },
            ]}
          />
          <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9F1239]">Pasangan bilangan</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">18 = 10 + 8</p>
            <p className="text-sm font-semibold text-slate-700">12 = 10 + 2</p>
            <p className="text-sm font-semibold text-slate-700">10 − 10 = 0 · 8 − 2 = 6</p>
            <p className="mt-2 text-2xl font-black text-[#1C01A5]">18 − 12 = 6</p>
          </article>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 2)}
            idKanvas={idKuis("B", 3)}
            pertanyaanSuara="Tika 12 jambu, beri 8 ke Lili. Sisanya berapa?"
            aliasSuara={["4", "empat"]}
            petunjukSuara="Ucapkan sisa jambunya."
            pertanyaanKanvas="Tuliskan 12 - 8."
            aliasKanvas={["4", "12 - 8 = 4", "12-8=4"]}
            konteksKanvas="Urai puluhan. 12 - 8 = 4."
          />
          <KuisPilih
            id={idKuis("B", 4)}
            soal="15 - 4 sama dengan berapa?"
            benar="B"
            umpanBenar="Benar! 15 - 4 = 11."
            pesanSalah="Mundur 4 langkah dari 15."
            pilihan={[
              { huruf: "A", teks: "19" },
              { huruf: "B", teks: "11" },
              { huruf: "C", teks: "9" },
            ]}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab C: Soal Cerita Penjumlahan dan Pengurangan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Baca kata lebihnya, kurangnya, selisih, dan jumlah.",
            "Tulis diketahui, ditanya, lalu hitung.",
            "Igil jaga agar ceritanya tidak tertukar.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-2-bab2-cerita.jpg"
            alt="Tika membawa donat, Halim membawa jeruk, Lili membawa boneka. Igil membaca kata lebihnya dan kurangnya."
          />
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["Lebihnya", "ditambah"],
              ["Kurangnya", "dikurangi"],
              ["Selisih", "dikurangi"],
              ["Jumlah", "dijumlahkan"],
            ].map(([kata, arti]) => (
              <article key={kata} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white px-4 py-3">
                <p className="text-xs font-black uppercase text-[#1C01A5]">{kata}</p>
                <p className="text-sm font-bold text-slate-700">{arti}</p>
              </article>
            ))}
          </div>
          <Dialog nama="Tika" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Aku punya 12 donat.”
          </Dialog>
          <Dialog nama="Malosi" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Donatku 5 kurangnya dari donat Tika.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Kurangnya artinya dikurangi. 12 - 5 = 7. Jumlah 7 + 12 = 19.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 5)}
            pertanyaanSuara="Malosi 5 kurangnya dari 12 donat Tika. Berapa donat Malosi?"
            aliasSuara={["7", "tujuh"]}
            petunjukSuara="Ucapkan angkanya."
          />
          <KuisTulisKartu
            id={idKuis("B", 6)}
            hanyaKanvas
            rapat
            pertanyaan="Tuliskan 12 - 5."
            alias={kumpulkanAlias(["7", "12 - 5 = 7", "12-5=7"])}
            konteks="Kurangnya artinya dikurangi. 12 - 5 = 7."
          />
          <Dialog nama="Halim" warna="border-cyan-300 bg-cyan-50">
            “Aku beri 4 jeruk kepada Lili. Sisaku 12.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Titik-titik kurang 4 sama dengan 12. Jadi 12 + 4 = 16. Semula 16 jeruk.”
          </Dialog>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 7)}
            pertanyaanSuara="Halim sisa 12 jeruk setelah beri 4. Semula berapa?"
            aliasSuara={["16", "enam belas"]}
            petunjukSuara="Ucapkan bilangan semula."
          />
          <KuisPilih
            id={idKuis("A", 6)}
            soal="Tika 5 boneka, Kira 7 boneka, Lili 8 boneka. Jumlah semua boneka..."
            benar="C"
            umpanBenar="Benar! 5 + 7 = 12. 12 + 8 = 20."
            pesanSalah="Jumlahkan dua dulu, lalu tambah yang ketiga."
            pilihan={[
              { huruf: "A", teks: "12" },
              { huruf: "B", teks: "15" },
              { huruf: "C", teks: "20" },
            ]}
          />
          <KuisPilih
            id={idKuis("A", 7)}
            soal="Di toko ada 6 pesawat dan 13 mobil-mobilan. Jumlah seluruh mainan..."
            benar="B"
            umpanBenar="Tepat! 6 + 13 = 19."
            pesanSalah="Jumlah artinya dijumlahkan. 6 + 13."
            pilihan={[
              { huruf: "A", teks: "7" },
              { huruf: "B", teks: "19" },
              { huruf: "C", teks: "13" },
            ]}
          />
        </div>
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🧺🍎🏆
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh jambu · maju, bersusun, pasangan, soal cerita
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiKeranjangPanen />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Lebihnya artinya ditambah.",
          "Kurangnya artinya dikurangi.",
          "Selisih artinya dikurangi. Jumlah artinya dijumlahkan.",
          "Menghitung maju: lompat ke depan dari bilangan pertama.",
          "Menghitung mundur: lompat ke belakang dari bilangan pertama.",
          "Bersusun: satuan di bawah satuan, puluhan di bawah puluhan.",
          "10 satuan sama dengan 1 puluhan. Boleh dipindah ke puluhan.",
          "Kalau satuan atas lebih kecil, urai 1 puluhan menjadi 10 satuan.",
          "Pasangan sepuluh: pecah bilangan menjadi 10 dan sisanya.",
          "Soal cerita: tulis diketahui, ditanya, lalu hitung.",
        ]}
        penutup='Kalimat kunci: “Hitung maju atau mundur, susun puluhan-satuan, baca kata ceritanya.”'
      />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Penjumlahan dan Pengurangan
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
          id={idKuisTulisKartu(MODUL_MTK2_BAB2.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Hitung maju atau mundur, susun puluhan-satuan, baca kata ceritanya."
          alias={kumpulkanAlias(["hitung maju atau mundur", "puluhan-satuan", "kata ceritanya"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
