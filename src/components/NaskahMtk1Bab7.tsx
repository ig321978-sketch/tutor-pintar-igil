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
import { MODUL_MTK1_BAB7 } from "@/lib/modul-resmi-mtk-1-bab7";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisTulisKartu } from "@/lib/kuis-materi";
import { aliasDariKuisSuara, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function InfografisHitungCepat() {
  const [mode, setMode] = useState<"maju" | "mundur">("maju");
  const maju = [9, 10, 11, 12] as const;
  const mundur = [12, 11, 10, 9] as const;
  const jejak = mode === "maju" ? maju : mundur;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("maju")}
          className={`rounded-xl px-4 py-2 text-sm font-black ${
            mode === "maju" ? "bg-[#16A34A] text-white" : "bg-[#1C01A5]/10 text-[#1C01A5]"
          }`}
        >
          🚀 Penjumlahan
        </button>
        <button
          type="button"
          onClick={() => setMode("mundur")}
          className={`rounded-xl px-4 py-2 text-sm font-black ${
            mode === "mundur" ? "bg-[#C2410C] text-white" : "bg-[#1C01A5]/10 text-[#1C01A5]"
          }`}
        >
          🛑 Pengurangan
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
          Infografis: Trik Hitung Cepat
        </div>
        <div className="bg-[#FFF7ED] px-4 py-4">
          <p className="text-center text-lg font-black text-[#1C01A5]">
            {mode === "maju" ? "Soal: 8 + 4 = ..." : "Soal: 13 - 4 = ..."}
          </p>
          <ol className="mt-3 space-y-2 text-sm font-semibold text-slate-700">
            <li>1. Simpan [{mode === "maju" ? "8" : "13"}] di kepala.</li>
            <li>2. Buka 4 jari tangan. ✋</li>
            <li>
              3. {mode === "maju" ? "Hitung maju dari 8:" : "Hitung mundur dari 13:"}
            </li>
          </ol>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {jejak.map((angka, indeks) => (
              <span
                key={`${mode}-${angka}`}
                className={`rounded-xl px-3 py-2 text-lg font-black ${
                  indeks === jejak.length - 1
                    ? "bg-[#F0AB00] text-[#1C01A5]"
                    : "bg-white text-[#1C01A5]"
                }`}
              >
                {angka}
                {indeks === jejak.length - 1 ? "!" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LembarEvaluasi() {
  const modulId = MODUL_MTK1_BAB7.id;
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
        <h5 className="text-base font-black text-[#1C01A5]">Pilihan Ganda</h5>
        <KuisPilihan
          modulId={modulId}
          indeks={0}
          soal="1. Hasil dari 12 + 5 adalah..."
          opsi={[
            { kode: "A", teks: "16" },
            { kode: "B", teks: "17" },
            { kode: "C", teks: "18" },
          ]}
          benar="B"
        />
        <KuisPilihan
          modulId={modulId}
          indeks={1}
          soal="2. Hasil dari 15 - 4 adalah..."
          opsi={[
            { kode: "A", teks: "10" },
            { kode: "B", teks: "11" },
            { kode: "C", teks: "12" },
          ]}
          benar="B"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Matematika Berantai
        </h5>
        <KuisChip modulId={modulId} indeks={2} judul="1. 8 + 6 = ...." opsi={["12", "14", "16"]} benar="14" />
        <KuisChip modulId={modulId} indeks={3} judul="2. 12 + 7 = ...." opsi={["17", "18", "19"]} benar="19" />
        <KuisChip modulId={modulId} indeks={4} judul="3. 16 - 5 = ...." opsi={["11", "12", "21"]} benar="11" />
        <KuisChip modulId={modulId} indeks={5} judul="4. 13 - 0 = ...." opsi={["0", "12", "13"]} benar="13" />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Soal Cerita</h5>
        <KuisChip
          modulId={modulId}
          indeks={6}
          judul="5. Budi punya 11 buku, ayah menambah 4. Jumlah sekarang?"
          opsi={["7", "15", "14"]}
          benar="15"
        />
        <KuisChip
          modulId={modulId}
          indeks={7}
          judul="6. Siti punya 15 telur, 4 pecah. Sisa telur utuh?"
          opsi={["11", "19", "10"]}
          benar="11"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Angka Misterius</h5>
        <KuisChip
          modulId={modulId}
          indeks={8}
          judul="7. 11 + □ = 15. Kotaknya?"
          opsi={["3", "4", "5"]}
          benar="4"
        />
        <KuisChip
          modulId={modulId}
          indeks={9}
          judul="8. 17 - □ = 12. Kotaknya?"
          opsi={["4", "5", "6"]}
          benar="5"
        />
      </section>
      <KunciGuru
        butir={[
          "PG: 12+5=17, 15-4=11",
          "Berantai: 14, 19, 11, 13",
          "Cerita: 11+4=15, 15-4=11. Misterius: 4 dan 5",
        ]}
      />
    </div>
  );
}

export default function NaskahMtk1Bab7({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB7;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          ➕➖
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
              Nia, aku ingin menghitung 9 + 5. Tapi jariku cuma ada 10, tidak cukup!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#9D174D]">Nia</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Gunakan trik Simpan di Kepala, Ali! Simpan angka 9 di kepalamu, lalu
              buka 5 jarimu. Hitung maju setelah 9: sepuluh, sebelas, dua belas,
              tiga belas, empat belas!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase text-[#1C01A5]">Ali</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Wah, berhasil! Hasilnya 14! Kalau pengurangan bagaimana?
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Nia: Sama saja, tapi hitung mundur. Misalnya 12 - 3. Simpan 12 di
            kepala, buka 3 jari, hitung mundur: sebelas, sepuluh, sembilan!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🚀🛑
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
        <InfografisHitungCepat />
        <LatihanSuaraResmi soal={kartuB.kuis} idPrefix={`${modul.id}-${kartuB.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          👏🧸
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
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Tepuk Angka</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Guru menyebut soal (misal 11+3). Siswa mengetuk meja sambil hitung
              maju, lalu berteriak 14!
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase text-[#C2410C]">Rumah · Untuk Orang Tua</p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">Hitung Mundur Mainan</h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Taruh 12 mainan, ambil 4, lalu hitung mundur sisa mainan.
            </p>
          </article>
        </div>
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝➕
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
          pertanyaan="Tuliskan satu penjumlahan atau pengurangan sampai 20, misalnya 9 + 5 = 14."
          alias={kumpulkanAlias([...aliasDariKuisSuara(kartuD.kuis), "14", "17", "11"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
