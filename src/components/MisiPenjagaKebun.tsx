"use client";

import { useState } from "react";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import { useKuisMateri } from "@/components/KuisMateriContext";
import type { MisiPetak, WarnaPetak } from "@/lib/misi-kebun-mtk-1";
import type { TemaMisi } from "@/lib/tema-misi-mtk-1";
import { jawabanTulisMemuatAlias, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";

const PETAK_KEBUN = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

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

function BendaPetak({
  ikon,
  jumlah,
  petunjuk,
}: {
  ikon: string;
  jumlah: number;
  petunjuk: number;
}) {
  if (!ikon || jumlah < 1) return null;
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2">
      {Array.from({ length: jumlah }, (_, i) => (
        <span key={`${ikon}-${i}`} className="inline-flex flex-col items-center">
          <span
            className={`text-3xl ${petunjuk >= 1 ? "kebun-goyang" : ""}`}
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

export default function MisiPenjagaKebun({
  misi,
  idMisi,
  idTulis,
  penutup,
  tema,
  bunga = "🌷🌼🌻🌺🌹🌸💐",
}: {
  misi: MisiPetak[];
  idMisi: (indeks: number) => string;
  idTulis: string;
  penutup: string;
  tema: TemaMisi;
  bunga?: string;
}) {
  const kuis = useKuisMateri();
  const [aktif, setAktif] = useState(0);
  const [jejak, setJejak] = useState<Record<number, { petunjuk: number; selesai: boolean; daun: number }>>({});
  const petak = misi[aktif];
  const kini = jejak[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
  const bintang = Object.values(jejak).filter((item) => item.selesai).length;
  const daun = Object.values(jejak).reduce((jumlah, item) => jumlah + item.daun, 0);
  const tombol =
    petak.pilihan ??
    ([
      ["pertama", petak.labelKiri ?? "Kelompok pertama"],
      ["kedua", petak.labelKanan ?? "Kelompok kedua"],
    ] as Array<[string, string]>);

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

  const mintaPetunjuk = () => {
    setJejak((lama) => {
      const sebelumnya = lama[aktif] ?? { petunjuk: 0, selesai: false, daun: 0 };
      if (sebelumnya.selesai || sebelumnya.petunjuk >= 3) return lama;
      return { ...lama, [aktif]: { ...sebelumnya, petunjuk: sebelumnya.petunjuk + 1 } };
    });
  };

  return (
    <div className="mt-4 space-y-4">
      <style>{`
        @keyframes kebun-goyang {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-14deg) translateY(-3px); }
          70% { transform: rotate(12deg); }
        }
        .kebun-goyang { animation: kebun-goyang 1s ease-in-out infinite; display: inline-block; }
      `}</style>
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{tema.pengantar}</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-2xl" aria-hidden>
          {tema.ikonAwal}
        </span>
        {PETAK_KEBUN.map((lambang, indeks) => {
          const selesai = jejak[indeks]?.selesai;
          const warna = misi[indeks]?.warna ?? "hijau";
          return (
            <button
              key={lambang}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-2 py-1 text-lg font-black ${
                indeks === aktif ? "border-[#1C01A5] bg-[#1C01A5] text-white" : KELAS_PETAK[warna]
              }`}
              aria-label={`${tema.satuan} ${indeks + 1}${selesai ? ", selesai" : ""}`}
            >
              {selesai ? "⭐" : lambang}
            </button>
          );
        })}
        <span className={`text-2xl ${bintang === misi.length ? "" : "opacity-40"}`} aria-hidden>
          {tema.ikonAkhir}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm font-black text-[#1C01A5]">
        <span className="rounded-full bg-emerald-100 px-3 py-1">Hijau · menghitung</span>
        <span className="rounded-full bg-sky-100 px-3 py-1">Biru · membaca</span>
        <span className="rounded-full bg-amber-100 px-3 py-1">Kuning · menulis</span>
        <span className="rounded-full bg-violet-100 px-3 py-1">Ungu · membandingkan</span>
      </div>
      <p className="text-sm font-bold text-[#1C01A5]">
        {tema.namaBintang} {bintang}/{misi.length} · {tema.namaToken} {daun} {tema.ikonToken}
      </p>
      <article className={`rounded-2xl border-2 px-4 py-4 ${KELAS_PETAK[petak.warna]}`}>
        <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          {tema.satuan} {aktif + 1} · {petak.warna} · {petak.misi}
        </p>
        <p className="mt-2 text-sm font-black text-[#1C01A5]">{tema.pemandu}</p>
        <p className="text-sm font-semibold text-slate-700">“{petak.narasi}”</p>
        {petak.mode === "kanvas" ? null : (
          <>
            {petak.angka ? (
              <p
                className={`mt-3 text-center text-6xl font-black text-[#1C01A5] ${kini.petunjuk >= 1 ? "kebun-goyang" : ""}`}
              >
                {petak.angka}
                {kini.petunjuk >= 2 ? <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#1C01A5]" /> : null}
              </p>
            ) : null}
            {petak.teksGambar ? (
              <p className="mt-3 text-center text-lg font-black text-[#1C01A5]">{petak.teksGambar}</p>
            ) : null}
            {petak.mode === "pilih" && !petak.pilihan ? (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-center text-xs font-black uppercase text-[#1C01A5]">
                    {petak.labelKiri ?? "Kelompok pertama"}
                  </p>
                  <BendaPetak ikon={petak.ikon} jumlah={petak.jumlah} petunjuk={kini.petunjuk} />
                </div>
                <div>
                  <p className="text-center text-xs font-black uppercase text-[#1C01A5]">
                    {petak.labelKanan ?? "Kelompok kedua"}
                  </p>
                  <BendaPetak
                    ikon={petak.kananIkon ?? petak.ikon}
                    jumlah={petak.kananJumlah ?? 0}
                    petunjuk={kini.petunjuk}
                  />
                </div>
              </div>
            ) : (
              <BendaPetak ikon={petak.ikon} jumlah={petak.jumlah} petunjuk={kini.petunjuk} />
            )}
          </>
        )}
        {kini.petunjuk >= 3 ? (
          <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold text-[#1C01A5]">
            {petak.bersama.replaceAll("Kiko", tema.pemandu)}
          </p>
        ) : null}
        {kini.petunjuk > 0 && !kini.selesai ? (
          <p className="mt-2 text-sm font-semibold text-amber-800">
            Belum tepat. {tema.namaToken} tetap aman. Coba lagi.
          </p>
        ) : null}
        {kini.selesai ? (
          <p className="mt-3 text-sm font-black text-emerald-800">
            1 {tema.namaBintang.toLowerCase()}. {tema.namaToken} {kini.daun} {tema.ikonToken.repeat(kini.daun)}
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
        {petak.mode === "suara" ? (
          <div className="mt-3" key={`suara-${aktif}`}>
            <SoalRekamSuara
              id={idMisi(aktif)}
              pertanyaan={petak.narasi}
              periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, petak.alias)}
              petunjuk="Jawab dengan suara, lalu kirim."
              sesudahNilai={(benar) => catat(aktif, benar)}
            />
          </div>
        ) : null}
        {petak.mode === "kanvas" ? (
          <KuisTulisKartu
            key={`kanvas-${aktif}`}
            id={idMisi(aktif)}
            hanyaKanvas
            rapat
            pertanyaan={petak.narasi}
            alias={kumpulkanAlias(petak.alias)}
            konteks={petak.bersama}
            visual={
              <>
                {petak.teksGambar ? (
                  <p className="text-center text-lg font-black text-[#1C01A5]">{petak.teksGambar}</p>
                ) : null}
                <BendaPetak ikon={petak.ikon} jumlah={petak.jumlah} petunjuk={kini.petunjuk} />
              </>
            }
            sesudahNilai={(benar) => catat(aktif, benar)}
          />
        ) : null}
        {petak.mode === "pilih" ? (
          <div className="mt-3 grid gap-2">
            {tombol.map(([huruf, teks]) => (
              <button
                key={huruf}
                type="button"
                onClick={() => {
                  const benar = huruf === petak.benarPilih;
                  if (benar) kuis?.tandaiBenar(idMisi(aktif));
                  catat(aktif, benar);
                }}
                className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${
                  kini.selesai && huruf === petak.benarPilih
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
        <li>Jawaban pertama benar: 3 {tema.namaToken.toLowerCase()}.</li>
        <li>Benar setelah satu petunjuk: 2 {tema.namaToken.toLowerCase()}.</li>
        <li>Benar setelah dua petunjuk: 1 {tema.namaToken.toLowerCase()}.</li>
        <li>Belum tepat tidak mengurangi {tema.namaToken.toLowerCase()}. Kamu boleh mencoba lagi.</li>
      </ul>
      {bintang === misi.length ? (
        <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 px-4 py-4">
          <KuisTulisKartu
            id={idTulis}
            hanyaKanvas
            rapat
            pertanyaan={tema.pertanyaanAkhir}
            alias={kumpulkanAlias(["10", "sepuluh"])}
            konteks={tema.konteksAkhir}
            visual={
              <>
                <p className="text-center text-3xl" aria-hidden>
                  {bunga}
                </p>
                <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">{penutup}</p>
              </>
            }
          />
        </div>
      ) : null}
    </div>
  );
}
