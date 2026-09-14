"use client";

import { useState, type ReactNode } from "react";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { MODUL_MTK1_BAB1 } from "@/lib/modul-resmi-mtk-1-bab1";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi } from "@/lib/kuis-materi";
import type { KelaminGuru } from "@/lib/guru";

const BARIS_ANGKA = [
  { jumlah: 1, baca: "SATU", lambang: "1" },
  { jumlah: 2, baca: "DUA", lambang: "2" },
  { jumlah: 3, baca: "TIGA", lambang: "3" },
  { jumlah: 4, baca: "EMPAT", lambang: "4" },
  { jumlah: 5, baca: "LIMA", lambang: "5" },
] as const;

const WARNA_BARIS = [
  "border-[#F97316] bg-[#FFF7ED]",
  "border-[#2563EB] bg-[#EFF6FF]",
  "border-[#16A34A] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#DC2626] bg-[#FEF2F2]",
];

const PASANGAN = [
  { gambar: "🎈🎈🎈", label: "3 Balon", benar: "3" },
  { gambar: "🚗🚗", label: "2 Mobil", benar: "2" },
  { gambar: "🌟🌟🌟🌟", label: "4 Bintang", benar: "4" },
] as const;

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function Apel({ jumlah }: { jumlah: number }) {
  return (
    <p className="text-2xl leading-none tracking-tight sm:text-3xl" aria-hidden>
      {Array.from({ length: jumlah }, () => "🍎").join("")}
    </p>
  );
}

function KuisMencocokkan() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold leading-relaxed text-[#1C01A5]">
        QUIZ: Cocokkan gambar ke angkanya
      </p>
      <p className="text-sm font-semibold text-slate-600">
        Ketuk angka yang cocok dengan banyak bendanya.
      </p>
      {PASANGAN.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK1_BAB1.id, "B", indeks);
        const sudah = Boolean(kuis?.sudahBenar(id));
        const ketuk = pilihan[indeks];
        const status =
          sudah || ketuk === item.benar
            ? "benar"
            : ketuk
              ? "salah"
              : null;
        return (
          <article
            key={item.label}
            className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4"
          >
            <p className="text-2xl leading-none">{item.gambar}</p>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["2", "3", "4"].map((angka) => (
                <button
                  key={angka}
                  type="button"
                  onClick={() => {
                    setPilihan((sebelum) => ({ ...sebelum, [indeks]: angka }));
                    if (angka === item.benar) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-black ${
                    ketuk === angka || (sudah && angka === item.benar)
                      ? angka === item.benar
                        ? "bg-emerald-600 text-white"
                        : "bg-rose-600 text-white"
                      : "bg-[#1C01A5] text-white hover:bg-[#16017a]"
                  }`}
                >
                  Angka {angka}
                </button>
              ))}
            </div>
            {status === "benar" ? (
              <p className="mt-2 text-sm font-black text-emerald-700">BENAR</p>
            ) : status === "salah" ? (
              <p className="mt-2 text-sm font-black text-rose-600">
                Coba angka yang lain.
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk1Bab1({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB1;
  const [kartuA, kartuB, kartuC] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🌳🍎🍩
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
        <div className="mt-5 space-y-3">
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Nia, lihat deh! Ibuku membawakan buah apel merah yang manis
              sekali untuk bekal.
            </p>
            <p className="mt-2 text-2xl" aria-hidden>
              🍎🍎🍎🍎
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#1C01A5]">
              Satu... dua... tiga... empat! Ada empat apel!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              Wah, asyik! Aku juga bawa kue donat. Hmm, tapi ada berapa banyak
              ya buah apelmu?
            </p>
            <p className="mt-2 text-2xl" aria-hidden>
              🍩🍩🍩
            </p>
            <p className="mt-1 text-sm font-extrabold text-[#9D174D]">
              Satu... dua... tiga...
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Ali: Hore! Berhitung itu seru dan mudah sekali ya, Nia!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🔢🍎
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
        <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">
          Infografis: Dunia Angka
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
            <span>Gambar</span>
            <span>Cara membaca</span>
            <span>Titik-titik</span>
          </div>
          {BARIS_ANGKA.map((baris, indeks) => (
            <div
              key={baris.lambang}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-[#F0AB00]/40 px-3 py-3 ${WARNA_BARIS[indeks]}`}
            >
              <Apel jumlah={baris.jumlah} />
              <p className="text-right text-sm font-black text-[#1C01A5]">
                {baris.lambang} = {baris.baca}
              </p>
              <p className="rounded-lg border-2 border-dashed border-[#1C01A5] bg-white px-3 py-1 text-center text-lg font-black text-[#1C01A5]">
                {baris.lambang}
              </p>
            </div>
          ))}
        </div>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">
            Kamus Mini Angka
          </p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Jika piringmu kosong, tidak ada buah sama sekali, itu artinya{" "}
            <span className="font-black text-[#1C01A5]">0</span> atau{" "}
            <span className="font-black text-[#1C01A5]">NOL</span>!
          </p>
          <p className="mt-2 text-3xl" aria-hidden>
            🍽️
          </p>
        </article>
        <KuisMencocokkan />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫🏠
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
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1D4ED8] bg-[#EFF6FF] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#1D4ED8]">
              Sekolah · Untuk Guru
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Detektif Berhitung di Kelas
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Bagi siswa 3–4 anak. Sebut satu angka, misalnya “Tunjukkan angka
              6!” Setiap kelompok mencari 6 benda, lalu meletakkannya di meja.
              Yang paling tepat dan cepat mendapat bintang.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Alat: pensil, penghapus, buku, atau balok mainan.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Bantu Ibu di Dapur
            </h5>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Ajak anak ke dapur. Minta mengambil benda dengan jumlah tertentu,
              misalnya 3 jeruk di kulkas atau hitung sendok di meja makan.
            </p>
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              Beri pujian atau pelukan hangat setelah anak menghitung benar.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
        />
      </KartuBingkai>
    </div>
  );
}
