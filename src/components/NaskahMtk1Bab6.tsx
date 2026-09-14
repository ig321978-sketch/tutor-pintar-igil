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
import { MODUL_MTK1_BAB6 } from "@/lib/modul-resmi-mtk-1-bab6";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisTulisKartu } from "@/lib/kuis-materi";
import { aliasDariKuisSuara, kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ANGKA = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

function IkatStik({ jumlah }: { jumlah: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Array.from({ length: jumlah }, (_, indeks) => (
        <p key={indeks} className="text-lg leading-tight" aria-hidden>
          🥖🥖🥖🥖🥖
          <br />
          🥖🥖🥖🥖🥖
        </p>
      ))}
    </div>
  );
}

function StikSatuan({ jumlah }: { jumlah: number }) {
  return (
    <p className="text-center text-2xl leading-tight" aria-hidden>
      {jumlah === 0 ? "—" : Array.from({ length: jumlah }, () => "🥖").join("")}
    </p>
  );
}

function InfografisRumahAngka() {
  const [pilih, setPilih] = useState(14);
  const puluhan = Math.floor(pilih / 10);
  const satuan = pilih % 10;

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {ANGKA.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => setPilih(angka)}
            className={`min-w-[3rem] rounded-2xl border-4 px-2 py-2 text-lg font-black ${
              pilih === angka
                ? "border-[#F0AB00] bg-[#FFF8E8] text-[#1C01A5]"
                : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
            }`}
          >
            {angka}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white">
          Infografis: Rumah Angka ({pilih})
        </div>
        <div className="grid gap-3 bg-[#FFF7ED] px-3 py-4 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1C01A5]/20 bg-white p-3 text-center">
            <p className="text-3xl" aria-hidden>
              🏠
            </p>
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Rumah Puluhan
            </p>
            <p className="mt-1 text-xs font-bold text-slate-500">(Ikat isi 10)</p>
            <div className="mt-2">
              <IkatStik jumlah={puluhan} />
            </div>
            <p className="mt-2 text-sm font-black text-[#1C01A5]">
              {puluhan} Puluhan (nilainya {puluhan * 10})
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#16A34A]/30 bg-[#F0FDF4] p-3 text-center">
            <p className="text-3xl" aria-hidden>
              🏠
            </p>
            <p className="text-xs font-black uppercase tracking-wide text-[#166534]">
              Rumah Satuan
            </p>
            <p className="mt-1 text-xs font-bold text-slate-500">(Stik satuan)</p>
            <div className="mt-2">
              <StikSatuan jumlah={satuan} />
            </div>
            <p className="mt-2 text-sm font-black text-[#166534]">
              {satuan} Satuan (nilainya {satuan})
            </p>
          </article>
        </div>
        <p className="border-t-2 border-[#F0AB00] bg-[#F5F3FF] px-4 py-3 text-center text-sm font-black text-[#1C01A5]">
          💡 {pilih} adalah {puluhan} Puluhan dan {satuan} Satuan.
        </p>
      </div>
    </div>
  );
}

function LembarEvaluasi() {
  const modulId = MODUL_MTK1_BAB6.id;
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
          placeholder="________________"
        />
      </label>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Hubungkan Garis</h5>
        <KuisCocok
          modulId={modulId}
          indeksAwal={0}
          kiriJudul="Puluhan dan satuan"
          kananJudul="Lambang bilangan"
          soal={[
            { teks: "1 puluhan dan 7 satuan", benar: "17" },
            { teks: "1 puluhan dan 2 satuan", benar: "12" },
            { teks: "2 puluhan dan 0 satuan", benar: "20" },
          ]}
          jawaban={["12", "17", "20"]}
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">
          Mengurai Nilai Tempat
        </h5>
        <KuisChip
          modulId={modulId}
          indeks={3}
          judul="1. Angka 15 terdiri dari .... puluhan"
          opsi={["1", "5", "15"]}
          benar="1"
        />
        <KuisChip
          modulId={modulId}
          indeks={4}
          judul="2. Angka 18 terdiri dari .... satuan"
          opsi={["1", "8", "18"]}
          benar="8"
        />
        <KuisChip
          modulId={modulId}
          indeks={5}
          judul="3. 1 puluhan + 9 satuan = lambang bilangannya"
          opsi={["19", "91", "10"]}
          benar="19"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Benar atau Salah</h5>
        <KuisChip
          modulId={modulId}
          indeks={6}
          judul="4. Angka 2 pada bilangan 20 menempati nilai tempat Satuan."
          opsi={["Benar", "Salah"]}
          benar="Salah"
        />
        <KuisChip
          modulId={modulId}
          indeks={7}
          judul="5. Angka 12 memiliki nilai tempat 1 Puluhan dan 2 Satuan."
          opsi={["Benar", "Salah"]}
          benar="Benar"
        />
      </section>
      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">Pilihan Ganda</h5>
        <KuisPilihan
          modulId={modulId}
          indeks={8}
          soal="6. Manakah pernyataan yang menunjukkan nilai dari angka 17?"
          opsi={[
            { kode: "A", teks: "7 puluhan dan 1 satuan" },
            { kode: "B", teks: "1 puluhan dan 7 satuan" },
            { kode: "C", teks: "10 puluhan dan 7 satuan" },
          ]}
          benar="B"
        />
        <KuisChip
          modulId={modulId}
          indeks={9}
          judul="7. Angka 13 terdiri dari .... puluhan dan 3 satuan."
          opsi={["1", "3", "13"]}
          benar="1"
        />
      </section>
      <KunciGuru
        butir={[
          "Cocok: 1P7S=17, 1P2S=12, 2P0S=20",
          "15 = 1 puluhan; 18 = 8 satuan; 1P+9S = 19",
          "Soal 4 Salah, soal 5 Benar, soal 6 B, soal 7 angka 1",
        ]}
      />
    </div>
  );
}

export default function NaskahMtk1Bab6({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK1_BAB6;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏠🔢
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
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Nia, aku punya banyak sekali stik es krim. Susah menghitungnya
              kalau berantakan seperti ini.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              Nia
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Aku punya ide! Bagaimana kalau setiap 10 stik, kita ikat menjadi
              satu ikat besar? Guru bilang, satu ikat itu namanya 1 Puluhan!
            </p>
            <p className="mt-2 text-sm font-extrabold text-[#9D174D]">
              🥖×10 = 1 ikat = 1 Puluhan
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
              Ali
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Wah, ide bagus! Aku punya 1 ikat (10 stik) dan sisa 4 stik yang
              tidak diikat. Berarti 1 puluhan dan 4 satuan.
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Nia: Benar, Ali! Jadi totalnya ada 14 stik! Ternyata mengelompokkan
            angka itu seperti memberi mereka rumah ya!
          </p>
        </div>
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🏠🥖
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
        <p className="mt-4 text-center text-sm font-semibold text-slate-600">
          Ketuk angka, lalu lihat rumah puluhan dan rumah satuan.
        </p>
        <InfografisRumahAngka />
        <LatihanSuaraResmi
          soal={kartuB.kuis}
          idPrefix={`${modul.id}-${kartuB.kode}`}
        />
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
        <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
          {kartuC.pengantar}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1D4ED8] bg-[#EFF6FF] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#1D4ED8]">
              Sekolah · Untuk Guru
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Ikat Sedotan Puluhan
            </h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Siapkan sedotan dan karet gelang. Hitung 10 sedotan, ikat sebagai
              Puluhan. Sisa yang tidak diikat disebut Satuan.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#C2410C] bg-[#FFF7ED] px-4 py-4">
            <p className="text-xs font-black uppercase tracking-wide text-[#C2410C]">
              Rumah · Untuk Orang Tua
            </p>
            <h5 className="mt-2 text-base font-black text-[#1C01A5]">
              Wadah Sendok
            </h5>
            <p className="mt-2 text-sm font-semibold text-slate-700">
              Kumpulkan 10 sendok dalam satu wadah (puluhan) dan taruh sisanya
              di luar wadah (satuan).
            </p>
          </article>
        </div>
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🏠
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
          pertanyaan="Tuliskan satu angka dan uraian nilai tempatnya, misalnya 14 = 1 puluhan dan 4 satuan."
          alias={kumpulkanAlias([
            ...aliasDariKuisSuara(kartuD.kuis),
            "puluhan",
            "satuan",
            "14",
          ])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
