"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TujuanBelajar from "@/components/TujuanBelajar";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { MISI_MTK1_BAB2, type MisiPetak, type WarnaPetak } from "@/lib/misi-kebun-mtk-1";
import { MODUL_MTK1_BAB2 } from "@/lib/modul-resmi-mtk-1-bab2";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB2.id;

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

function GambarCerita({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function UmpanBenar({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <p className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </p>
  );
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
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <div className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{children}</div>
    </article>
  );
}

function GarisBilangan({ awal, langkah }: { awal: number; langkah: number }) {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-1">
      {Array.from({ length: 11 }, (_, angka) => {
        const kena = angka > awal && angka <= awal + langkah;
        const pijakan = angka === awal;
        return (
          <span
            key={angka}
            className={`rounded-full px-2 py-1 text-sm font-black ${
              kena ? "bg-[#1C01A5] text-white" : pijakan ? "bg-amber-300 text-[#1C01A5]" : "bg-white text-[#1C01A5]"
            }`}
          >
            {angka}
          </span>
        );
      })}
    </div>
  );
}

function Ikatan({ gabungan, kiri, kanan }: { gabungan: number; kiri: number; kanan: number }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#1C01A5] text-2xl font-black text-[#1C01A5]">
        {gabungan}
      </div>
      <div className="space-y-2">
        <p className="rounded-full border-2 border-orange-400 bg-orange-50 px-3 py-1 text-sm font-black text-[#9A3412]">
          {kiri} · sebagian
        </p>
        <p className="rounded-full border-2 border-emerald-400 bg-emerald-50 px-3 py-1 text-sm font-black text-[#166534]">
          {kanan} · sebagian
        </p>
      </div>
    </div>
  );
}

const POS_LOMPAT = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const KELAS_PETAK: Record<WarnaPetak, string> = {
  hijau: "border-emerald-500 bg-emerald-50",
  biru: "border-sky-500 bg-sky-50",
  kuning: "border-amber-400 bg-amber-50",
  ungu: "border-violet-500 bg-violet-50",
};

function taliDariPetunjuk(petunjuk: number): number {
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
            className={`text-3xl ${petunjuk >= 1 ? "lompat-goyang" : ""}`}
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

function MisiLapanganLompat() {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; tali: number }>>({});
  const misi: MisiPetak = MISI_MTK1_BAB2[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, tali: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;
  const tali = Object.values(jejak).reduce((jumlah, item) => jumlah + item.tali, 0);
  const adaPasangan = (misi.kananJumlah ?? 0) > 0;

  const catat = (indeks: number, benar: boolean) => {
    setJejak((lama) => {
      const sebelumnya = lama[indeks] ?? { petunjuk: 0, selesai: false, tali: 0 };
      if (sebelumnya.selesai) return lama;
      if (benar) {
        return { ...lama, [indeks]: { ...sebelumnya, selesai: true, tali: taliDariPetunjuk(sebelumnya.petunjuk) } };
      }
      return { ...lama, [indeks]: { ...sebelumnya, petunjuk: Math.min(3, sebelumnya.petunjuk + 1) } };
    });
  };

  const mintaPetunjuk = () => {
    setJejak((lama) => {
      const sebelumnya = lama[aktif] ?? { petunjuk: 0, selesai: false, tali: 0 };
      if (sebelumnya.selesai || sebelumnya.petunjuk >= 3) return lama;
      return { ...lama, [aktif]: { ...sebelumnya, petunjuk: sebelumnya.petunjuk + 1 } };
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <style>{`
        @keyframes lompat-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-14deg) translateY(-3px); }
          70% { transform: rotate(12deg); }
        }
        .lompat-goyang { animation: lompat-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">
        Bantu Igil mengisi 10 pos di lapangan lompat tali. Pilih satu pos, dengarkan misinya, lalu jawab dengan suara, kanvas, atau pilihan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          👟
        </span>
        {POS_LOMPAT.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[MISI_MTK1_BAB2[indeks].warna]
              }`}
              aria-label={`Pos ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === 10 ? "" : "opacity-40"}`} aria-hidden>
          🏅
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm font-black text-[#1C01A5]">
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · menghitung</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · membaca</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · menulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · membandingkan</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        Bintang lompat {bintang}/10 · Tali ajaib {tali} 👟
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[misi.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Pos {aktif + 1} · {misi.warna} · {misi.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">Igil</p>
        <p className="text-sm font-semibold text-slate-700">“{misi.narasi}”</p>
        {misi.mode === "kanvas" ? null : (
          <>
            {misi.angka ? (
              <p className={`mt-3 text-center text-6xl font-black text-[#1C01A5] ${kini.petunjuk >= 1 ? "lompat-goyang" : ""}`}>
                {misi.angka}
                {kini.petunjuk >= 2 ? <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#1C01A5]" /> : null}
              </p>
            ) : null}
            {misi.teksGambar && !misi.angka ? (
              <p className="mt-3 text-center text-2xl font-black text-[#1C01A5]">{misi.teksGambar}</p>
            ) : null}
            {misi.mode === "pilih" || adaPasangan ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-center text-xs font-black uppercase text-[#1C01A5]">
                    {misi.labelKiri ?? "Kelompok pertama"}
                  </p>
                  <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
                </div>
                <div>
                  <p className="text-center text-xs font-black uppercase text-[#1C01A5]">
                    {misi.labelKanan ?? "Kelompok kedua"}
                  </p>
                  <BendaPetak ikon={misi.kananIkon ?? misi.ikon} jumlah={misi.kananJumlah ?? 0} petunjuk={kini.petunjuk} />
                </div>
              </div>
            ) : (
              <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
            )}
          </>
        )}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">{misi.bersama}</p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">Belum tepat. Talimu tetap aman. Coba lagi.</p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">
            1 bintang lompat. Tali ajaib {kini.tali} {"👟".repeat(kini.tali)}
          </p>
        ) : (
          <button
            type="button"
            onClick={mintaPetunjuk}
            className="mt-3 rounded-xl border-2 border-[#1C01A5]/20 bg-white px-4 py-2 text-sm font-black text-[#1C01A5]"
          >
            Minta petunjuk
          </button>
        )}
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
            visual={
              misi.teksGambar ? (
                <p className="text-center text-3xl font-black text-[#1C01A5]">{misi.teksGambar}</p>
              ) : (
                <BendaPetak ikon={misi.ikon} jumlah={misi.jumlah} petunjuk={kini.petunjuk} />
              )
            }
            sesudahNilai={(benar) => catat(aktif, benar)}
          />
        ) : null}
        {misi.mode === "pilih" ? (
          <div className="mt-3 grid gap-2">
            {(
              [
                ["pertama", misi.labelKiri ?? "Kelompok pertama"],
                ["kedua", misi.labelKanan ?? "Kelompok kedua"],
              ] as const
            ).map(([huruf, teks]) => (
              <button
                key={huruf}
                type="button"
                onClick={() => {
                  const benar = huruf === misi.benarPilih;
                  if (benar) kuis?.tandaiBenar(idKuis("C", aktif));
                  catat(aktif, benar);
                }}
                className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${
                  kini.selesai && huruf === misi.benarPilih
                    ? "bg-emerald-600 text-white"
                    : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
                }`}
              >
                {teks}
              </button>
            ))}
          </div>
        ) : null}
      </article>
      <ul className="list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
        <li>Jawaban pertama benar: 3 tali ajaib.</li>
        <li>Benar setelah satu petunjuk: 2 tali ajaib.</li>
        <li>Benar setelah dua petunjuk: 1 tali ajaib.</li>
        <li>Belum tepat tidak mengurangi tali. Kamu boleh mencoba lagi.</li>
      </ul>
      {bintang === 10 ? (
        <div className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-4">
          <KuisTulisKartu
            id={idKuisTulisKartu(ID, "C")}
            hanyaKanvas
            rapat
            pertanyaan="Tuliskan jumlah bintang lompat yang sudah kamu kumpulkan."
            alias={kumpulkanAlias(["10", "sepuluh"])}
            konteks="Sepuluh pos selesai. Bintang lompat ada 10."
            visual={
              <>
                <p className="text-center text-3xl" aria-hidden>
                  👟⭐🏅
                </p>
                <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">Lapangan lompat Igil sudah siap.</p>
              </>
            }
          />
        </div>
      ) : null}
    </div>
  );
}

function LembarKerja() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );
  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-white p-4 sm:grid-cols-2">
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

      <KuisPilih
        id={idKuis("D", 0)}
        soal="1. Ada 4 kelereng merah dan 5 kelereng biru. Semuanya ada berapa?"
        benar="B"
        umpanBenar="Hebat! 4 + 5 = 9."
        pesanSalah="Hitung kelereng merah, lalu kelereng biru."
        anak={
          <p className="text-2xl">
            🔴🔴🔴🔴 + 🔵🔵🔵🔵🔵
          </p>
        }
        pilihan={[
          { huruf: "A", teks: "8" },
          { huruf: "B", teks: "9" },
          { huruf: "C", teks: "10" },
        ]}
      />

      <KuisPilih
        id={idKuis("D", 1)}
        soal="2. Ada 6 kupu-kupu kuning dan 3 kupu-kupu ungu. Semuanya ada berapa?"
        benar="C"
        umpanBenar="Bagus! 6 + 3 = 9."
        pesanSalah="Gabungkan kedua kelompok kupu-kupu."
        anak={<IkonUlang ikon="🦋" jumlah={6} />}
        pilihan={[
          { huruf: "A", teks: "6" },
          { huruf: "B", teks: "8" },
          { huruf: "C", teks: "9" },
        ]}
      />

      <KuisTulisKartu
        id={idKuis("D", 2)}
        hanyaKanvas
        pertanyaan="3. Ada 3 pita biru dan 4 pita merah. Tuliskan operasi dan hasilnya."
        alias={kumpulkanAlias(["3 + 4 = 7", "3+4=7", "7", "tujuh"])}
        konteks="Tiga pita ditambah empat pita sama dengan tujuh."
        visual={<p className="text-center text-2xl">🎀🎀🎀 + 🎀🎀🎀🎀</p>}
      />

      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F0F9FF] p-4">
        <p className="text-sm font-semibold text-slate-700">4. Hitung maju. 7 + 3 hasilnya berapa?</p>
        <GarisBilangan awal={7} langkah={3} />
        <SoalRekamSuara
          id={idKuis("D", 3)}
          pertanyaan="Sebutkan hasil 7 ditambah 3."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["10", "sepuluh"])}
          petunjuk="Lompat tiga langkah dari 7."
        />
      </div>

      <KuisTulisKartu
        id={idKuis("D", 4)}
        hanyaKanvas
        pertanyaan="5. Ada 6 siswa. Datang lagi 4 siswa. Tuliskan 6 + 4 = 10."
        alias={kumpulkanAlias(["6 + 4 = 10", "6+4=10", "10", "sepuluh"])}
        konteks="Enam siswa ditambah empat siswa sama dengan sepuluh."
        visual={<p className="text-center text-lg font-black text-[#1C01A5]">6 + 4 = □</p>}
      />

      <KuisPilih
        id={idKuis("D", 5)}
        soal="6. Ada 3 motor dan 2 mobil. Berapa jumlah semua kendaraan?"
        benar="B"
        umpanBenar="Tepat! 3 + 2 = 5 kendaraan."
        pesanSalah="Jumlahkan motor dan mobil."
        anak={<p className="text-2xl">🛵🛵🛵 + 🚗🚗</p>}
        pilihan={[
          { huruf: "A", teks: "4" },
          { huruf: "B", teks: "5" },
          { huruf: "C", teks: "6" },
        ]}
      />

      <KuisPilih
        id={idKuis("D", 6)}
        soal="7. Tiga motor punya 6 roda. Dua mobil punya 8 roda. Jumlah semua roda?"
        benar="B"
        umpanBenar="Benar! 6 + 8 = 14 roda."
        pesanSalah="Gabungkan 6 roda dan 8 roda."
        pilihan={[
          { huruf: "A", teks: "12" },
          { huruf: "B", teks: "14" },
          { huruf: "C", teks: "10" },
        ]}
      />

      <KuisPilih
        id={idKuis("D", 7)}
        soal="8. Mana penjumlahan berulang yang benar?"
        benar="B"
        umpanBenar="Tepat! 3 + 3 = 6. Dua bilangan yang sama."
        pesanSalah="Penjumlahan berulang memakai dua bilangan yang sama, dan hasilnya harus pas."
        pilihan={[
          { huruf: "A", teks: "2 + 2 = 5" },
          { huruf: "B", teks: "3 + 3 = 6" },
          { huruf: "C", teks: "4 + 4 = 7" },
        ]}
      />

      <KuisTulisKartu
        id={idKuis("D", 8)}
        hanyaKanvas
        pertanyaan="9. Tuliskan bilangan yang hilang supaya hasilnya 10."
        alias={kumpulkanAlias(["2", "dua", "8 + 2 = 10", "8+2=10"])}
        konteks="Delapan ditambah dua sama dengan sepuluh."
        visual={<p className="text-center text-3xl font-black text-[#1C01A5]">8 + □ = 10</p>}
      />

      <div className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F0FDF4] p-4">
        <IkonUlang ikon="🐦" jumlah={4} />
        <p className="mt-2 text-sm font-semibold text-slate-700">Datang lagi 2 burung.</p>
        <IkonUlang ikon="🐦" jumlah={2} />
        <p className="mt-2 text-sm font-semibold text-slate-700">10. Berapa jumlah semua burung?</p>
        <SoalRekamSuara
          id={idKuis("D", 9)}
          pertanyaan="Sebutkan hasil 4 ditambah 2."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["6", "enam"])}
          petunjuk="Sebutkan angkanya."
        />
      </div>
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
  const [kartuA, , kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai latar="bg-sky-50/80">
        <p className="text-center text-4xl font-normal" aria-hidden>
          👟👧🦉
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuA.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)} />
        </div>
        <TujuanBelajar
          butir={[
            "Membuat cerita penjumlahan, lalu menulisnya dengan tanda + dan =.",
            "Menjumlah dengan pasangan bilangan, menghitung maju, penjumlahan berulang, dan pasangan yang hasilnya 10.",
            "Menyelesaikan soal cerita penjumlahan sampai 10.",
          ]}
        />

        <JudulSubBab
          judul="Sub-Bab A: Cerita Penjumlahan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Anak-anak, bagian ini tentang cerita penjumlahan.",
            "Kita menggabungkan dua kelompok, lalu menulis operasinya.",
            "Tanda tambah berarti digabung. Tanda sama dengan berarti hasilnya.",
            "Ceritanya bermain lompat tali bersama Rara, Bimo, dan Igil. Ayo mulai.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-lompat.jpg"
            alt="Empat anak bermain lompat tali. Dua anak berlari untuk ikut. Igil si burung hantu ada di rumput."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Ada 4 anak yang sudah bermain lompat tali.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Lihat, ada 2 anak yang datang lagi.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Hoo! Kalau digabung, jumlahnya menjadi lebih banyak.”
          </Dialog>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
              <p className="text-xs font-black uppercase text-[#9F1239]">Mula-mula</p>
              <IkonUlang ikon="🧒" jumlah={4} ukuran="text-3xl" />
            </article>
            <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
              <p className="text-xs font-black uppercase text-[#0C4A6E]">Datang lagi</p>
              <IkonUlang ikon="🧒" jumlah={2} ukuran="text-3xl" />
            </article>
          </div>
          <p className="text-center text-4xl font-black text-[#1C01A5]">4 + 2 = 6</p>
          <p className="text-center text-sm font-bold text-slate-600">Dibaca: empat ditambah dua hasilnya enam.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 1)}
            idKanvas={idKuis("A", 2)}
            pertanyaanSuara="Ada 4 anak, lalu datang 2 anak. Berapa semuanya?"
            aliasSuara={["6", "enam"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 4 + 2 = 6."
            aliasKanvas={["4 + 2 = 6", "4+2=6"]}
            konteksKanvas="Empat anak ditambah dua anak sama dengan enam."
          />
          <article className="rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
            <p className="text-sm font-black text-[#0F766E]">Tanda pada cerita penjumlahan</p>
            <p className="mt-2 text-center text-4xl font-black text-[#1C01A5]">+ &nbsp; =</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Tanda + berarti dua kelompok digabung. Tanda = berarti hasilnya. Menjumlahkan berarti menggabungkan bersama.
            </p>
          </article>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-pensil.jpg"
            alt="Tiga pensil merah di kiri meja dan empat pensil biru di kanan meja."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Pensil merahku ada 3.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Pensil biruku ada 4. Semuanya ada 7 pensil.”
          </Dialog>
          <p className="text-center text-4xl font-black text-[#1C01A5]">3 + 4 = 7</p>
          <p className="text-center text-sm font-bold text-slate-600">Dibaca: tiga ditambah empat hasilnya tujuh.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 3)}
            idKanvas={idKuis("A", 4)}
            pertanyaanSuara="Ada 3 pensil merah dan 4 pensil biru. Semuanya berapa?"
            aliasSuara={["7", "tujuh"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 3 + 4 = 7."
            aliasKanvas={["3 + 4 = 7", "3+4=7"]}
            konteksKanvas="Tiga pensil merah ditambah empat pensil biru sama dengan tujuh."
          />
          <TabelInfoGrafis
            judul="Infografis: Cerita Penjumlahan"
            kepala={["Cerita", "Operasi", "Hasil"]}
            baris={[
              ["4 anak + 2 anak", "4 + 2", "6"],
              ["3 pensil merah + 4 biru", "3 + 4", "7"],
              ["4 mobil kuning + 4 merah", "4 + 4", "8"],
              ["3 kue lapis + 5 bolu", "3 + 5", "8"],
              ["4 bola + 3 bola", "4 + 3", "7"],
              ["5 apel + 2 apel", "5 + 2", "7"],
            ]}
            kaki="Menjumlahkan berarti menggabungkan dua kelompok."
          />
          <KuisPilih
            id={idKuis("A", 5)}
            soal="Ada 4 mobil kuning dan 4 mobil merah. Semuanya ada berapa mobil?"
            benar="B"
            umpanBenar="Tepat! 4 + 4 = 8 mobil."
            pesanSalah="Hitung mobil kuning, lalu mobil merah."
            anak={<p className="text-2xl">🚗🚗🚗🚗 + 🚗🚗🚗🚗</p>}
            pilihan={[
              { huruf: "A", teks: "7" },
              { huruf: "B", teks: "8" },
              { huruf: "C", teks: "9" },
            ]}
          />
          <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
            <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
            <p className="text-center text-2xl">⚽⚽⚽⚽ + ⚽⚽⚽</p>
            <SoalRekamSuara
              id={idKuis("A", 0)}
              pertanyaan="Ada 4 bola di keranjang dan 3 bola di luar. Semuanya berapa?"
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["7", "tujuh"])}
              petunjuk="Dengarkan, hitung, lalu jawab dengan suara."
            />
          </div>
          <KuisTulisKartu
            id={idKuisTulisKartu(ID, "A")}
            hanyaKanvas
            pertanyaan="Ada 5 apel di keranjang dan 2 apel di luar. Tuliskan operasinya."
            alias={kumpulkanAlias(["5 + 2 = 7", "5+2=7"])}
            konteks="Lima apel ditambah dua apel sama dengan tujuh."
            visual={<p className="text-center text-2xl">🍎🍎🍎🍎🍎 + 🍎🍎</p>}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab B: Berbagai Cara Melakukan Penjumlahan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Sekarang kita mencoba empat cara menjumlah.",
            "Cara pertama, pasangan bilangan. Cara kedua, menghitung maju.",
            "Cara ketiga, penjumlahan berulang. Cara keempat, pasangan yang hasilnya sepuluh.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <TabelInfoGrafis
            judul="Infografis: Empat Cara Menjumlah"
            kepala={["Cara", "Contoh", "Hasil"]}
            baris={[
              ["Pasangan bilangan", "3 + 2", "5"],
              ["Menghitung maju", "5 + 3", "8"],
              ["Penjumlahan berulang", "4 + 4", "8"],
              ["Hasilnya 10", "7 + 3", "10"],
            ]}
            kaki="Pilih cara yang paling mudah, lalu hitung dengan teliti."
          />

          <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">1. Pasangan Bilangan</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-pasangan.jpg"
            alt="Keranjang berisi tiga apel merah dan dua apel hijau. Rara dan Bimo menunjuk apel itu."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Ada 5 apel. 3 apel merah dan 2 apel hijau.”
          </Dialog>
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “3 dan 2 adalah dua bagian. Digabung menjadi 5.”
          </Dialog>
          <Ikatan gabungan={5} kiri={3} kanan={2} />
          <p className="text-center text-2xl font-black text-[#1C01A5]">3 + 2 = 5</p>
          <p className="text-center text-2xl font-black text-[#1C01A5]">2 + 3 = 5</p>
          <p className="text-center text-sm font-bold text-slate-600">Dibalik, hasilnya tetap sama.</p>
          <article className="rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3">
            <p className="text-xs font-black uppercase text-[#92400E]">Kupu-kupu</p>
            <p className="mt-2 text-2xl">🦋🦋🦋🦋 + 🦋</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">4 kupu-kupu kuning dan 1 kupu-kupu merah.</p>
            <Ikatan gabungan={5} kiri={4} kanan={1} />
            <p className="text-center text-2xl font-black text-[#1C01A5]">4 + 1 = 5</p>
          </article>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="Lima apel terdiri dari 3 merah dan berapa hijau?"
            aliasSuara={["2", "dua"]}
            petunjukSuara="Sebutkan bagian yang satunya."
            pertanyaanKanvas="Tuliskan 3 + 2 = 5."
            aliasKanvas={["3 + 2 = 5", "3+2=5", "2 + 3 = 5"]}
            konteksKanvas="Tiga apel merah ditambah dua apel hijau sama dengan lima."
          />
          <KuisPilih
            id={idKuis("B", 2)}
            soal="Mana pasangan lain yang juga menjadi 5?"
            benar="A"
            umpanBenar="Tepat! 4 dan 1 bersama-sama menjadi 5."
            pesanSalah="Jumlah dua bagian itu harus 5."
            pilihan={[
              { huruf: "A", teks: "4 dan 1" },
              { huruf: "B", teks: "2 dan 2" },
              { huruf: "C", teks: "6 dan 1" },
            ]}
          />

          <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">2. Menghitung Maju</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-maju.jpg"
            alt="Bimo melompat di jalan batu. Rara dan Igil duduk di rumput menonton."
          />
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Aku berdiri di angka 5. Aku melompat 3 langkah ke depan.”
          </Dialog>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Enam, tujuh, delapan. Kamu sekarang di angka 8.”
          </Dialog>
          <GarisBilangan awal={5} langkah={3} />
          <p className="text-center text-sm font-bold text-slate-600">5, lalu 6, 7, 8. Jadi 5 + 3 = 8.</p>
          <p className="text-center text-4xl font-black text-[#1C01A5]">5 + 3 = 8</p>
          <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
            <p className="text-sm font-black text-[#0C4A6E]">Dari angka 1, lompat 2 langkah</p>
            <GarisBilangan awal={1} langkah={2} />
            <p className="mt-2 text-center text-2xl font-black text-[#1C01A5]">1 + 2 = 3</p>
          </article>
          <KuisSusun
            id={idKuis("B", 3)}
            soal="Bimo di angka 5. Susun tiga langkah lompatannya."
            pool={[
              { kunci: "8", tampil: "8" },
              { kunci: "6", tampil: "6" },
              { kunci: "7", tampil: "7" },
            ]}
            benar={["6", "7", "8"]}
            umpanBenar="Benar! Lompatannya 6, 7, 8. Jadi 5 + 3 = 8."
            pesanSalah="Mulai dari angka sesudah 5."
          />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 4)}
            pertanyaanSuara="Dari angka 5, lompat 3 langkah. Sekarang di angka berapa?"
            aliasSuara={["8", "delapan"]}
            petunjukSuara="Sebutkan angka tempat berakhir."
          />

          <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">3. Penjumlahan Berulang</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-berulang.jpg"
            alt="Rara dan Igil melihat tiga kepik di daun lebar."
          />
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Penjumlahan berulang menggabungkan dua bilangan yang sama.”
          </Dialog>
          <div className="overflow-hidden rounded-2xl border-4 border-sky-400">
            {[
              ["1 + 1", "2"],
              ["2 + 2", "4"],
              ["3 + 3", "6"],
              ["4 + 4", "8"],
              ["5 + 5", "10"],
            ].map(([operasi, hasil], indeks) => (
              <div
                key={operasi}
                className={`grid grid-cols-2 px-3 py-2 text-center text-lg font-black text-[#1C01A5] ${
                  indeks % 2 === 0 ? "bg-sky-50" : "bg-[#F0FDF4]"
                }`}
              >
                <span>{operasi}</span>
                <span>= {hasil}</span>
              </div>
            ))}
          </div>
          <KuisPilih
            id={idKuis("B", 5)}
            soal="Mana yang merupakan penjumlahan berulang?"
            benar="A"
            umpanBenar="Tepat! 2 + 2 = 4. Dua bilangan yang sama."
            pesanSalah="Cari dua bilangan yang sama, dan hasilnya harus pas."
            pilihan={[
              { huruf: "A", teks: "2 + 2 = 4" },
              { huruf: "B", teks: "2 + 3 = 5" },
              { huruf: "C", teks: "1 + 4 = 5" },
            ]}
          />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 6)}
            pertanyaanSuara="3 + 3 hasilnya berapa?"
            aliasSuara={["6", "enam"]}
            petunjukSuara="Ucapkan hasilnya."
          />

          <p className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">4. Penjumlahan yang Hasilnya 10</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-sepuluh.jpg"
            alt="Bingkai sepuluh penuh: tujuh bola merah dan tiga bola biru. Rara, Bimo, dan Igil menghitung."
          />
          <Dialog nama="Bimo" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
            “Ada 7 bola merah dan 3 bola biru. Bingkainya penuh. Semuanya 10.”
          </Dialog>
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “8 dan 2 juga sepuluh. 9 dan 1 juga sepuluh.”
          </Dialog>
          <div className="overflow-hidden rounded-2xl border-4 border-sky-400">
            {[
              ["9", "1"],
              ["8", "2"],
              ["7", "3"],
              ["6", "4"],
              ["5", "5"],
            ].map(([kiri, kanan], indeks) => (
              <div
                key={kiri}
                className={`grid grid-cols-3 items-center px-3 py-2 text-center ${
                  indeks % 2 === 0 ? "bg-sky-50" : "bg-[#F0FDF4]"
                }`}
              >
                <span className="text-2xl font-black text-[#1C01A5]">{kiri}</span>
                <span className="text-2xl font-black text-[#1C01A5]">{kanan}</span>
                <span className="text-lg font-black text-[#92400E]">= 10</span>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-slate-600">Dibalik tetap sama. 1 + 9 = 10. 2 + 8 = 10. 3 + 7 = 10.</p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 7)}
            idKanvas={idKuis("B", 8)}
            pertanyaanSuara="Agar 8 menjadi 10, tambah berapa?"
            aliasSuara={["2", "dua"]}
            petunjukSuara="Sebutkan teman sepuluhnya."
            pertanyaanKanvas="Tuliskan 8 + 2 = 10."
            aliasKanvas={["8 + 2 = 10", "8+2=10"]}
            konteksKanvas="Delapan ditambah dua sama dengan sepuluh."
          />
          <div className="border-t-2 border-[#1C01A5]/10 pt-5">
            <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
            <SoalRekamSuara
              id={idKuis("B", 9)}
              pertanyaan="9 ditambah berapa sama dengan 10?"
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["1", "satu"])}
              petunjuk="Sebutkan bilangan temannya."
            />
          </div>
          <KuisTulisKartu
            id={idKuisTulisKartu(ID, "B")}
            hanyaKanvas
            pertanyaan="Tuliskan pasangan 4 dan 1 untuk bilangan 5."
            alias={kumpulkanAlias(["4 + 1 = 5", "4+1=5", "1 + 4 = 5"])}
            konteks="Empat ditambah satu sama dengan lima."
            visual={<p className="text-center text-2xl">🦋🦋🦋🦋 + 🦋</p>}
          />
        </div>

        <JudulSubBab
          judul="Sub-Bab C: Soal Cerita Penjumlahan"
          kelas={kelas}
          kelamin={kelamin}
          naskah={[
            "Soal cerita punya dua jumlah. Kita cari angkanya, lalu menggabungkannya.",
            "Tulis operasinya. Hitung hasilnya. Lalu bacakan jawabannya.",
            "Rara dan Bimo menghitung burung, teman di kelas, dan kendaraan.",
          ]}
        />
        <div className="mt-4 space-y-3">
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab2-cerita.jpg"
            alt="Empat burung hinggap di dahan. Dua burung lain sedang terbang mendekat."
          />
          <Dialog nama="Rara" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
            “Ada 4 burung di dahan. Datang lagi 2 burung.”
          </Dialog>
          <Dialog nama="Igil" warna="border-amber-300 bg-amber-50">
            “Penyelesaiannya: 4 + 2 = 6. Semuanya ada 6 burung.”
          </Dialog>
          <p className="text-center text-4xl font-black text-[#1C01A5]">4 + 2 = 6</p>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 6)}
            idKanvas={idKuis("A", 7)}
            pertanyaanSuara="Ada 4 burung, lalu datang 2 burung. Berapa semuanya?"
            aliasSuara={["6", "enam"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 4 + 2 = 6."
            aliasKanvas={["4 + 2 = 6", "4+2=6"]}
            konteksKanvas="Empat burung ditambah dua burung sama dengan enam."
          />
          <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-4 py-3">
            <p className="text-sm font-black text-[#0C4A6E]">Teman di kelas</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Ada 5 siswa di kelas. Datang lagi 3 siswa.</p>
            <p className="mt-2 text-center text-3xl font-black text-[#1C01A5]">5 + 3 = 8</p>
            <p className="text-center text-sm font-bold text-slate-600">Di dalam kelas ada 8 siswa.</p>
          </article>
          <KuisAkhirAdegan
            idSuara={idKuis("A", 8)}
            idKanvas={idKuis("A", 9)}
            pertanyaanSuara="Ada 5 siswa, lalu datang 3 siswa. Berapa semuanya?"
            aliasSuara={["8", "delapan"]}
            petunjukSuara="Ucapkan hasilnya."
            pertanyaanKanvas="Tuliskan 5 + 3 = 8."
            aliasKanvas={["5 + 3 = 8", "5+3=8"]}
            konteksKanvas="Lima siswa ditambah tiga siswa sama dengan delapan."
          />
          <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 px-4 py-3">
            <p className="text-sm font-black text-[#5B21B6]">Sepeda dan becak</p>
            <p className="mt-2 text-2xl">🚲🚲🚲 + 🛺</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">Ada 3 sepeda dan 1 becak. Semuanya ada 4 kendaraan.</p>
            <p className="text-lg font-black text-[#1C01A5]">3 + 1 = 4</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Roda sepeda ada 6. Roda becak ada 3. Semuanya ada 9 roda.
            </p>
            <p className="text-lg font-black text-[#1C01A5]">6 + 3 = 9</p>
          </article>
          <KuisPilih
            id={idKuis("A", 10)}
            soal="Ada 3 sepeda dan 1 becak. Berapa jumlah semua kendaraan?"
            benar="B"
            umpanBenar="Tepat! 3 + 1 = 4 kendaraan."
            pesanSalah="Jumlahkan sepeda dan becak."
            pilihan={[
              { huruf: "A", teks: "3" },
              { huruf: "B", teks: "4" },
              { huruf: "C", teks: "5" },
            ]}
          />
          <div className="border-t-2 border-[#1C01A5]/10 pt-5">
            <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
            <SoalRekamSuara
              id={idKuis("A", 11)}
              pertanyaan="Roda sepeda ada 6. Roda becak ada 3. Semuanya berapa?"
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["9", "sembilan"])}
              petunjuk="Gabungkan enam dan tiga."
            />
          </div>
          <KuisTulisKartu
            id={idKuis("A", 12)}
            hanyaKanvas
            pertanyaan="Ada 2 kelereng merah dan 3 kelereng biru. Tuliskan cerita operasinya."
            alias={kumpulkanAlias(["2 + 3 = 5", "2+3=5", "3 + 2 = 5"])}
            konteks="Dua kelereng ditambah tiga kelereng sama dengan lima."
            visual={<p className="text-center text-2xl">🔴🔴 + 🔵🔵🔵</p>}
          />
          <p className="rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">
            Rara dan Bimo sudah membuat cerita penjumlahan, menulis operasinya, dan menghitung hasilnya.
          </p>
        </div>
      </KartuBingkai>

      <KartuBingkai latar="bg-violet-50/80">
        <p className="text-center text-4xl font-normal" aria-hidden>
          👟🦉🏅
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">Misi Lapangan Lompat</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Sepuluh pos · menghitung, membaca, menulis, membandingkan
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)} />
        </div>
        <MisiLapanganLompat />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartuD.voice.slice(0, 1), 2_000, 3_000)}
        poin={[
          "Menjumlahkan berarti menggabungkan dua kelompok menjadi satu.",
          "Tanda + berarti digabung. Tanda = berarti hasilnya.",
          "4 + 2 = 6 dibaca: empat ditambah dua hasilnya enam.",
          "Pasangan bilangan: sebagian ditambah sebagian sama dengan gabungan.",
          "Urutan boleh dibalik. 3 + 2 = 2 + 3.",
          "Menghitung maju: berdiri di angka pertama, lalu lompat ke depan.",
          "Penjumlahan berulang menggabungkan dua bilangan yang sama. 3 + 3 = 6.",
          "Teman sepuluh: 9 + 1, 8 + 2, 7 + 3, 6 + 4, dan 5 + 5.",
          "Pada soal cerita, cari dua jumlah, tulis operasinya, lalu hitung.",
        ]}
        penutup="Kalimat kunci: “Gabungkan dua kelompok, tulis operasinya, lalu hitung hasilnya.”"
      />

      <KartuBingkai latar="bg-rose-50/80">
        <p className="text-center text-4xl" aria-hidden>
          📝⭐
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Penjumlahan sampai dengan 10
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartuD.voice.slice(1), 2_000, 3_000)} />
        </div>
        <LembarKerja />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan kalimat kunci: Gabungkan dua kelompok, tulis operasinya, lalu hitung hasilnya."
          alias={kumpulkanAlias(["gabungkan dua kelompok", "tulis operasinya", "hitung hasilnya"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
