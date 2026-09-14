"use client";

import { useMemo, useState } from "react";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import {
  KartuBingkai,
  KuisChip,
  KuisCocok,
  KuisPilihan,
  KunciGuru,
} from "@/components/KuisEvaluasiKartu";
import { MODUL_MTK1_BAB9 } from "@/lib/modul-resmi-mtk-1-bab9";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisTulisKartu } from "@/lib/kuis-materi";
import { aliasDariKuisSuara, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const BENTUK = [
  {
    id: "segiempat",
    emoji: "🟦",
    nama: "Segiempat",
    pojok: "4 pojok",
    isi: "Punya 4 sisi garis lurus dan 4 pojok. Contoh: papan tulis, permukaan meja.",
  },
  {
    id: "segitiga",
    emoji: "🔺",
    nama: "Segitiga",
    pojok: "3 pojok",
    isi: "Punya 3 sisi garis lurus dan 3 pojok. Contoh: rambu jalan, atap rumah adat.",
  },
  {
    id: "lingkaran",
    emoji: "🔴",
    nama: "Lingkaran",
    pojok: "0 pojok",
    isi: "Bulat rata, 1 sisi melengkung, tidak punya pojok. Contoh: jam dinding, uang koin.",
  },
] as const;

function InfografisBentukDatar() {
  const [pilih, setPilih] = useState<(typeof BENTUK)[number]["id"]>("segiempat");
  const aktif = BENTUK.find((item) => item.id === pilih) ?? BENTUK[0];

  return (
    <div className="mt-4 space-y-4">
      <div className="grid gap-2 sm:grid-cols-3">
        {BENTUK.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPilih(item.id)}
            className={`rounded-2xl border-4 px-3 py-4 ${
              pilih === item.id
                ? "border-[#F0AB00] bg-[#FFF8E8]"
                : "border-[#1C01A5]/15 bg-white"
            }`}
          >
            <p className="text-4xl" aria-hidden>
              {item.emoji}
            </p>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">{item.nama}</p>
            <p className="text-xs font-bold text-slate-500">{item.pojok}</p>
          </button>
        ))}
      </div>
      <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3">
        <p className="text-sm font-black text-[#1C01A5]">
          {aktif.emoji} {aktif.nama}
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-700">{aktif.isi}</p>
      </article>
    </div>
  );
}

function LembarEvaluasi() {
  const modulId = MODUL_MTK1_BAB9.id;
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
        <h5 className="text-base font-black text-[#1C01A5]">Tebak Bentuk</h5>
        <KuisPilihan
          modulId={modulId}
          indeks={0}
          soal="1. Roda sepeda dan potongan jeruk yang diiris tipis berbentuk..."
          opsi={[
            { kode: "A", teks: "Segitiga" },
            { kode: "B", teks: "Segiempat" },
            { kode: "C", teks: "Lingkaran" },
          ]}
          benar="C"
        />
        <KuisPilihan
          modulId={modulId}
          indeks={1}
          soal="2. Penggaris yang memiliki 3 sudut pojok disebut bangun..."
          opsi={[
            { kode: "A", teks: "Segitiga" },
            { kode: "B", teks: "Segiempat" },
            { kode: "C", teks: "Lingkaran" },
          ]}
          benar="A"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Karakteristik</h5>
        <KuisChip
          modulId={modulId}
          indeks={2}
          judul="1. Bangun datar yang tidak memiliki sudut pojok disebut..."
          opsi={["Lingkaran", "Segitiga", "Segiempat"]}
          benar="Lingkaran"
        />
        <KuisChip
          modulId={modulId}
          indeks={3}
          judul="2. Jam dinding dan uang koin berbentuk..."
          opsi={["Lingkaran", "Segitiga", "Segiempat"]}
          benar="Lingkaran"
        />
        <KuisChip
          modulId={modulId}
          indeks={4}
          judul="3. 3 garis lurus yang menyambung dinamakan..."
          opsi={["Lingkaran", "Segitiga", "Segiempat"]}
          benar="Segitiga"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Mencocokkan Pojok</h5>
        <KuisCocok
          modulId={modulId}
          indeksAwal={5}
          kiriJudul="Nama bangun"
          kananJudul="Jumlah pojok"
          soal={[
            { teks: "Segitiga", benar: "3 pojok" },
            { teks: "Lingkaran", benar: "0 pojok" },
            { teks: "Segiempat", benar: "4 pojok" },
          ]}
          jawaban={["4 pojok", "0 pojok", "3 pojok"]}
        />
      </section>
      <KuisPilihan
        modulId={modulId}
        indeks={8}
        soal="4. Benda di dalam kelas yang permukaannya berbentuk segiempat adalah..."
        opsi={[
          { kode: "A", teks: "Roda sepeda mini" },
          { kode: "B", teks: "Atap gantungan kalender segitiga" },
          { kode: "C", teks: "Papan tulis hitam" },
        ]}
        benar="C"
      />
      <KuisChip
        modulId={modulId}
        indeks={9}
        judul="5. Rambu jalan contoh bentuk..."
        opsi={["Segitiga", "Lingkaran", "Segiempat"]}
        benar="Segitiga"
      />
      <KunciGuru
        butir={[
          "Roda = lingkaran. Penggaris 3 sudut = segitiga.",
          "Tanpa pojok = lingkaran. Jam/koin = lingkaran. 3 garis = segitiga.",
          "Cocok: segitiga 3, lingkaran 0, segiempat 4. Papan tulis = C.",
        ]}
      />
    </div>
  );
}

export default function NaskahMtk1Bab9({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB9;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📐🔴
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
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#1C01A5]">Ali</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Nia, kemarin kita belajar bentuk ruang. Sekarang, kalau permukaan
              meja ini kita jiplak di kertas, jadinya bentuk apa ya?
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9D174D]">Nia</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Itu namanya Bentuk Datar, Ali! Bentuknya tipis dan rata. Karena
              permukaan meja punya 4 pojok, namanya Segiempat!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#1C01A5]">Ali</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Oh! Kalau uang koin itu bulat rata, berarti namanya Lingkaran ya?
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Nia: Tepat sekali! Dan atap rumah adat itu bentuknya Segitiga!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🟦🔺🔴
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
        <p className="mt-2 text-center text-sm font-semibold text-slate-600">
          Ketuk kartu bentuk, lalu baca jumlah pojok dan contohnya.
        </p>
        <InfografisBentukDatar />
        <LatihanSuaraResmi soal={kartuB.kuis} idPrefix={`${modul.id}-${kartuB.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏠🍪
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
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Tempel Bentuk</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Tempel kertas segitiga, segiempat, dan lingkaran hingga jadi rumah
              atau mobil.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase text-[#C2410C]">Rumah · Untuk Orang Tua</p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Cetak Bentuk Datar</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Cetak bentuk di kertas memakai cetakan kue atau tutup gelas untuk
              lingkaran.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝📐
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
          pertanyaan="Tuliskan satu bentuk datar dan jumlah pojoknya, misalnya lingkaran = 0 pojok."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "lingkaran",
            "segitiga",
            "segiempat",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
