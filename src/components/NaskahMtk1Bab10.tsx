"use client";

import { useMemo, useState } from "react";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import {
  KartuBingkai,
  KuisChip,
  KunciGuru,
} from "@/components/KuisEvaluasiKartu";
import { MODUL_MTK1_BAB10 } from "@/lib/modul-resmi-mtk-1-bab10";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisTulisKartu } from "@/lib/kuis-materi";
import { aliasDariKuisSuara, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function InfografisPolaDiagram() {
  const [tampil, setTampil] = useState(false);

  return (
    <div className="mt-4 space-y-4">
      <div className="overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
          Infografis: Bermain Pola dan Diagram
        </div>
        <div className="space-y-4 bg-[#FFF7ED] p-4">
          <article className="rounded-2xl bg-white p-3">
            <p className="text-sm font-black text-[#1C01A5]">🎨 Tebak pola berulang</p>
            <p className="mt-2 text-2xl leading-relaxed" aria-hidden>
              🍎 🍌 🍎 🍌 🍎 ...
            </p>
            <button
              type="button"
              onClick={() => setTampil(true)}
              className="mt-2 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
            >
              {tampil ? "🍌 Pisang" : "Tampilkan jawaban berikutnya"}
            </button>
          </article>
          <article className="rounded-2xl bg-white p-3">
            <p className="text-sm font-black text-[#1C01A5]">📊 Diagram gambar mini</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Siswa yang suka apel: 🍎🍎🍎🍎 (4 anak)
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Siswa yang suka pisang: 🍌🍌 (2 anak)
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

function LembarEvaluasi() {
  const modulId = MODUL_MTK1_BAB10.id;
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
        <h5 className="text-base font-black text-[#1C01A5]">Lanjutkan Pola</h5>
        <KuisChip
          modulId={modulId}
          indeks={0}
          judul="1. 🔴 🔵 🔴 🔵 🔴 ...."
          opsi={["🔴", "🔵", "🔺"]}
          benar="🔵"
        />
        <KuisChip
          modulId={modulId}
          indeks={1}
          judul="2. 🔺 🟦 🔺 🟦 🔺 ...."
          opsi={["🔺", "🟦", "🔴"]}
          benar="🟦"
        />
        <KuisChip
          modulId={modulId}
          indeks={2}
          judul="1. 🟢 🟡 🟢 🟡 🟢 🟡 .... warna selanjutnya?"
          opsi={["Hijau", "Kuning", "Merah"]}
          benar="Hijau"
        />
        <KuisChip
          modulId={modulId}
          indeks={3}
          judul="2. 🔺 🟦 🟦 🔺 🟦 🟦 🔺 .... berikutnya?"
          opsi={["Segitiga", "Segiempat", "Lingkaran"]}
          benar="Segiempat"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Diagram Mainan Kesukaan
        </h5>
        <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4 text-sm font-semibold text-slate-700">
          <p>Mobil-mobilan: 🚗🚗🚗🚗🚗</p>
          <p className="mt-1">Boneka: 🧸🧸🧸</p>
          <p className="mt-1">Yoyo: 🪀🪀</p>
        </article>
        <KuisChip
          modulId={modulId}
          indeks={4}
          judul="3. Berapa anak yang menyukai mobil-mobilan?"
          opsi={["3", "5", "2"]}
          benar="5"
        />
        <KuisChip
          modulId={modulId}
          indeks={5}
          judul="4. Mainan apa yang paling sedikit disukai?"
          opsi={["Mobil-mobilan", "Boneka", "Yoyo"]}
          benar="Yoyo"
        />
        <KuisChip
          modulId={modulId}
          indeks={6}
          judul="5. Selisih anak yang suka boneka dengan yang suka yoyo?"
          opsi={["1", "2", "5"]}
          benar="1"
        />
        <KuisChip
          modulId={modulId}
          indeks={7}
          judul="6. Boneka pada diagram ada berapa?"
          opsi={["2", "3", "5"]}
          benar="3"
        />
        <KuisChip
          modulId={modulId}
          indeks={8}
          judul="7. Yoyo pada diagram ada berapa?"
          opsi={["2", "3", "5"]}
          benar="2"
        />
        <KuisChip
          modulId={modulId}
          indeks={9}
          judul="8. Mainan apa yang paling banyak disukai?"
          opsi={["Mobil-mobilan", "Boneka", "Yoyo"]}
          benar="Mobil-mobilan"
        />
      </section>
      <KunciGuru
        butir={[
          "Pola: biru, segiempat, hijau, segiempat.",
          "Diagram: mobil 5, paling sedikit yoyo, selisih 1.",
          "Boneka 3, yoyo 2, paling banyak mobil.",
        ]}
      />
    </div>
  );
}

export default function NaskahMtk1Bab10({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB10;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📊🎨
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
              Nia, lihat bendera hiasan di kelas kita. Warnanya berurutan: merah,
              kuning, merah, kuning. Setelah itu warna apa lagi ya?
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9D174D]">Nia</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Pasti merah lagi, Ali! Itu namanya Pola Gambar. Warnanya berulang
              secara teratur.
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Ali: Wah, seru! Seperti tebak-tebakan ya!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🍎🍌
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
        <InfografisPolaDiagram />
        <LatihanSuaraResmi soal={kartuB.kuis} idPrefix={`${modul.id}-${kartuB.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          👏🍴
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
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Pola Tepukan</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Tepuk, sentuh pundak, tepuk, sentuh pundak. Siswa mengikuti iramanya.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase text-[#C2410C]">Rumah · Untuk Orang Tua</p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Sendok dan Garpu</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Susun sendok, garpu, sendok, garpu di meja makan.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝📊
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
          pertanyaan="Tuliskan satu pola atau bacaan diagram, misalnya setelah merah kuning berikutnya merah."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "pola",
            "yoyo",
            "mobil",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
