"use client";

import { useMemo, useState } from "react";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import {
  KartuBingkai,
  KuisChip,
  KuisPilihan,
  KunciGuru,
} from "@/components/KuisEvaluasiKartu";
import { MODUL_MTK1_BAB8 } from "@/lib/modul-resmi-mtk-1-bab8";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisTulisKartu } from "@/lib/kuis-materi";
import { aliasDariKuisSuara, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ALAT = [
  {
    id: "jengkal",
    judul: "Jengkal",
    isi: "Jarak dari ujung ibu jari ke ujung jari kelingking yang diregangkan. Cocok untuk meja tulis.",
  },
  {
    id: "langkah",
    judul: "Langkah",
    isi: "Jarak perpindahan kaki saat berjalan normal. Cocok untuk lapangan sekolah.",
  },
  {
    id: "depa",
    judul: "Depa",
    isi: "Jarak dari ujung jari tangan kanan ke kiri saat kedua tangan direntangkan.",
  },
] as const;

function InfografisDetektif() {
  const [alat, setAlat] = useState<(typeof ALAT)[number]["id"]>("jengkal");
  const aktif = ALAT.find((item) => item.id === alat) ?? ALAT[0];

  return (
    <div className="mt-4 space-y-4">
      <div className="overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
          Infografis: Detektif Pengukuran
        </div>
        <div className="grid gap-3 bg-[#FFF7ED] p-4 sm:grid-cols-2">
          <article className="rounded-2xl bg-white p-3">
            <p className="text-sm font-black text-[#1C01A5]">📏 Mengukur Panjang</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {ALAT.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAlat(item.id)}
                  className={`rounded-xl px-3 py-2 text-sm font-black ${
                    alat === item.id
                      ? "bg-[#1C01A5] text-white"
                      : "bg-[#1C01A5]/10 text-[#1C01A5]"
                  }`}
                >
                  {item.judul}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-700">{aktif.isi}</p>
          </article>
          <article className="rounded-2xl bg-white p-3">
            <p className="text-sm font-black text-[#1C01A5]">⚖️ Mengukur Berat</p>
            <p className="mt-2 rounded-xl bg-[#F0FDF4] px-3 py-2 text-sm font-extrabold text-[#166534]">
              Lebih berat: 🍉 semangka &gt; 🍎 apel
            </p>
            <p className="mt-2 rounded-xl bg-[#EFF6FF] px-3 py-2 text-sm font-extrabold text-[#1C01A5]">
              Lebih ringan: ☁️ kapas &lt; 🪨 batu
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

function LembarEvaluasi() {
  const modulId = MODUL_MTK1_BAB8.id;
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");

  return (
    <div className="mt-5 space-y-5">
      <label className="block text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        Nama siswa
        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
        />
      </label>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Isilah titik-titik</h5>
        <KuisChip
          modulId={modulId}
          indeks={0}
          judul="1. Pensil baru milik Ali ............ daripada rautan pensil."
          opsi={["lebih panjang", "lebih pendek", "lebih ringan"]}
          benar="lebih panjang"
        />
        <KuisChip
          modulId={modulId}
          indeks={1}
          judul="2. Kapas bantal terasa ............ daripada batu bata."
          opsi={["lebih berat", "lebih ringan", "lebih panjang"]}
          benar="lebih ringan"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Alat ukur yang tepat</h5>
        <KuisChip
          modulId={modulId}
          indeks={2}
          judul="1. Panjang meja tulis paling cocok diukur dengan..."
          opsi={["Jengkal", "Langkah", "Depa"]}
          benar="Jengkal"
        />
        <KuisChip
          modulId={modulId}
          indeks={3}
          judul="2. Panjang lapangan sekolah paling cocok diukur dengan..."
          opsi={["Jengkal", "Langkah", "Depa"]}
          benar="Langkah"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Perbandingan Berat</h5>
        <KuisChip
          modulId={modulId}
          indeks={4}
          judul="3. Buah semangka terasa ............ daripada buah salak."
          opsi={["lebih berat", "lebih ringan"]}
          benar="lebih berat"
        />
        <KuisChip
          modulId={modulId}
          indeks={5}
          judul="4. Satu lembar kertas lipat terasa ............ daripada kamus tebal."
          opsi={["lebih berat", "lebih ringan"]}
          benar="lebih ringan"
        />
      </section>
      <KuisPilihan
        modulId={modulId}
        indeks={6}
        soal="5. Ali mendapat 6 jengkal, kakak mendapat 4 jengkal pada meja yang sama. Mengapa berbeda?"
        opsi={[
          { kode: "A", teks: "Meja bertambah panjang saat diukur Kakak." },
          { kode: "B", teks: "Jengkal tangan Kakak lebih panjang daripada jengkal Ali." },
          { kode: "C", teks: "Ali salah menghitung jumlah jengkalnya." },
        ]}
        benar="B"
      />
      <KuisChip
        modulId={modulId}
        indeks={7}
        judul="6. Depa memakai bentangan..."
        opsi={["satu jari", "dua tangan", "langkah kaki"]}
        benar="dua tangan"
      />
      <KuisChip
        modulId={modulId}
        indeks={8}
        judul="7. Kapas dibanding batu terasa..."
        opsi={["lebih berat", "lebih ringan"]}
        benar="lebih ringan"
      />
      <KuisChip
        modulId={modulId}
        indeks={9}
        judul="8. Lemari dibanding kursi terasa..."
        opsi={["lebih berat", "lebih ringan"]}
        benar="lebih berat"
      />
      <KunciGuru
        butir={[
          "Pensil lebih panjang. Kapas lebih ringan.",
          "Meja: jengkal. Lapangan: langkah.",
          "Semangka lebih berat. Kertas lebih ringan. Soal 5 B.",
        ]}
      />
    </div>
  );
}

export default function NaskahMtk1Bab8({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB8;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📏⚖️
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
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
          {kartuA.pengantar}
        </p>
        <div className="mt-5 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9D174D]">Nia</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Ali, lihat! Buku matematikaku lebih panjang daripada penghapusku.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#1C01A5]">Ali</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Benar, Nia. Dan kalau kita angkat, buku ini juga terasa lebih berat
              daripada penghapus.
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Nia: Yuk, kita ukur panjang meja ini menggunakan jengkal tangan kita!
            Berapa jengkal mejamu, Ali?
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️📏
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
        <InfografisDetektif />
        <LatihanSuaraResmi soal={kartuB.kuis} idPrefix={`${modul.id}-${kartuB.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏫🍉
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
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
          {kartuC.pengantar}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1D4ED8] bg-[#EFF6FF] px-4 py-4">
            <p className="text-xs font-black uppercase text-[#1D4ED8]">Sekolah · Untuk Guru</p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Jengkal Papan Tulis</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Ukur panjang papan tulis dengan jengkal secara bergantian.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase text-[#C2410C]">Rumah · Untuk Orang Tua</p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Apel dan Semangka</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Pegang apel di kanan dan semangka di kiri, bandingkan mana yang lebih berat.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝📏
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuD.judul}
        </h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Matematika · {modul.judul}
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
          {kartuD.pengantar}
        </p>
        <LembarEvaluasi />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "D")}
          pertanyaan="Tuliskan satu perbandingan, misalnya semangka lebih berat daripada apel."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "lebih panjang",
            "lebih berat",
            "jengkal",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
