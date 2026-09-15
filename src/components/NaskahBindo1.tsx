"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import type { KartuModulResmi, ModulResmiPai } from "@/lib/modul-resmi-pai";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function KepalaKartu({
  emoji,
  kartu,
  kelas,
  kelamin,
  subjudul,
}: {
  emoji: string;
  kartu: KartuModulResmi;
  kelas: string;
  kelamin?: KelaminGuru;
  subjudul?: string;
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>
        {emoji}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
        {kartu.judul}
      </h4>
      {subjudul ? (
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          {subjudul}
        </p>
      ) : null}
      <div className="mt-4">
        <TombolVoiceMateriPai1
          kelas={kelas}
          kelamin={kelamin}
          cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
        />
      </div>
      <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">
        {kartu.pengantar}
      </p>
    </>
  );
}

function GelembungTutur({
  nama,
  warna,
  children,
}: {
  nama: string;
  warna: string;
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        {nama}
      </p>
      <div className="mt-1 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        {children}
      </div>
    </article>
  );
}

function InfografisTabel({
  judul,
  kepala,
  baris,
  hots,
}: {
  judul: string;
  kepala: [string, string, string];
  baris: Array<[string, string, string]>;
  hots?: string;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
      <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white sm:text-sm">
        Infografis: {judul}
      </p>
      <div className="grid grid-cols-3 gap-2 bg-[#16017a] px-3 py-2 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
        {kepala.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      {baris.map((isi, indeks) => (
        <div
          key={isi.join("-")}
          className={`grid grid-cols-3 gap-2 border-t border-[#F0AB00]/40 px-3 py-3 text-xs font-semibold leading-snug text-slate-700 sm:text-sm ${
            indeks % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
          }`}
        >
          {isi.map((sel) => (
            <p key={sel}>{sel}</p>
          ))}
        </div>
      ))}
      {hots ? (
        <div className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#92400E]">
            Pertanyaan kritis
          </p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
            {hots}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function KartuGuruOrtu({ kartu }: { kartu: KartuModulResmi }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {kartu.item.map((item, indeks) => (
        <article
          key={item.nama}
          className={`rounded-2xl border-2 px-4 py-4 ${
            indeks === 0
              ? "border-[#1D4ED8] bg-[#EFF6FF]"
              : "border-[#C2410C] bg-[#FFF7ED]"
          }`}
        >
          <p
            className={`text-xs font-black uppercase tracking-wide ${
              indeks === 0 ? "text-[#1D4ED8]" : "text-[#C2410C]"
            }`}
          >
            {indeks === 0 ? "Sekolah · Untuk Guru" : "Rumah · Untuk Orang Tua"}
          </p>
          <h5 className="mt-2 text-base font-black text-[#1C01A5]">{item.nama}</h5>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            {item.uraian}
          </p>
          {item.contoh ? (
            <p className="mt-3 text-sm font-extrabold text-[#1C01A5]">
              {item.contoh}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function KuisPilihan({
  id,
  soal,
  pilihan,
  benar,
}: {
  id: string;
  soal: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
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
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Coba pilih jawaban yang lebih tepat."
        />
      </div>
    </article>
  );
}

function KuisBenarSalah({
  id,
  soal,
  benar,
  alasanBenar,
}: {
  id: string;
  soal: string;
  benar: "benar" | "salah";
  alasanBenar: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const [alasan, setAlasan] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const ok =
      pilih === benar &&
      alasan
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .some((kata) => alasanBenar.toLowerCase().includes(kata) && kata.length > 3);
    const cukup = pilih === benar && alasan.trim().length >= 6;
    if (ok || cukup) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(["benar", "salah"] as const).map((nilai) => (
          <button
            key={nilai}
            type="button"
            onClick={() => setPilih(nilai)}
            className={`rounded-xl px-4 py-2 text-sm font-black capitalize ${kelasTombolHasilKuis(
              pilih,
              nilai,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {nilai}
          </button>
        ))}
      </div>
      <label className="mt-3 block text-sm font-bold text-[#1C01A5]">
        Alasan
        <input
          value={alasan}
          onChange={(e) => setAlasan(e.target.value)}
          className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
          placeholder="Tulis alasan singkat..."
        />
      </label>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Pilih benar/salah yang tepat, lalu tulis alasannya."
        />
      </div>
    </article>
  );
}

function KuisMencocokkan({
  modulId,
  idAwal,
  kiri,
  kanan,
  kunci,
}: {
  modulId: string;
  idAwal: number;
  kiri: string[];
  kanan: string[];
  kunci: Record<string, string>;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<Record<string, string>>({});
  return (
    <div className="grid gap-3">
      {kiri.map((item, indeks) => {
        const id = idEval(modulId, idAwal + indeks);
        const jawaban = kunci[item];
        const status = statusDariPilihan(pilih[item] ?? "", jawaban);
        return (
          <article
            key={item}
            className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#EFF6FF] p-4"
          >
            <p className="text-sm font-black text-[#1C01A5]">{item}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {kanan.map((opsi) => (
                <button
                  key={opsi}
                  type="button"
                  onClick={() => {
                    setPilih((lama) => ({ ...lama, [item]: opsi }));
                    if (opsi === jawaban) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-3 py-2 text-xs font-black sm:text-sm ${kelasTombolHasilKuis(
                    pilih[item] ?? "",
                    opsi,
                    jawaban,
                    "bg-[#1C01A5] text-white hover:bg-[#16017a]",
                  )}`}
                >
                  {opsi}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis
                status={status}
                cuplikan={pilih[item]}
                pesanSalah="Coba hubungkan dengan bunyi atau kata yang cocok."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function KuisIsian({
  id,
  soal,
  alias,
}: {
  id: string;
  soal: string;
  alias: string[];
}) {
  const kuis = useKuisMateri();
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const teks = isi.trim().toLowerCase();
    const ok = alias.some((item) => teks.includes(item.toLowerCase()));
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F0FDF4] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <input
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        className="mt-3 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
        placeholder="Tulis jawaban..."
      />
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={isi || undefined}
          pesanSalah="Coba kata kunci dari materi kartu ini."
        />
      </div>
    </article>
  );
}

function KuisLingkar({
  id,
  soal,
  opsi,
  benar,
}: {
  id: string;
  soal: string;
  opsi: string[];
  benar: string[];
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<string[]>([]);
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const toggle = (item: string) => {
    setPilih((lama) =>
      lama.includes(item) ? lama.filter((nilai) => nilai !== item) : [...lama, item],
    );
  };
  const periksa = () => {
    const sama =
      benar.length === pilih.length && benar.every((item) => pilih.includes(item));
    if (sama) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF7ED] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {opsi.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => toggle(item)}
            className={`rounded-xl px-3 py-2 text-sm font-black ${
              pilih.includes(item)
                ? "bg-[#1C01A5] text-white"
                : "bg-white text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
      >
        Periksa
      </button>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih.join(", ") || undefined}
          pesanSalah="Lingkari hanya kata berawalan Ma atau Mi."
        />
      </div>
    </article>
  );
}

function idEval(modulId: string, indeks: number): string {
  return idKuisKartuResmi(modulId, "D", indeks);
}

function Latar({ anak }: { anak: string }) {
  return (
    <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
      {anak}
    </p>
  );
}

function DialogBab1() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di teras kelas pada pagi hari. Ali dan Nia mendengar suara dari halaman sekolah." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, coba tutup matamu sebentar. Dengar... Duk! Duk! Duk! Suara apa ya itu?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Hmm, bunyinya keras sekali! Ah, itu pasti suara bola tendang yang memantul di lantai!</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Betul! Kalau yang ini... Kringgg! Kringgg!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Itu suara bel sepeda Pak Satpam! Ali, mengapa setiap benda mengeluarkan bunyi yang berbeda-beda, ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Supaya kita bisa tahu benda apa itu meskipun kita sedang memejamkan mata, Nia. Tuhan menciptakan bunyi-bunyi itu unik!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di lapangan sekolah. Ali membawa bola sepak merah putih. Tono bermain bila bambu." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, ayo main Bo-la denganku!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, ayo! Tapi lihat, Tono sedang asyik bermain Bi-la bambu di sana. Mainan kita beda ya.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, kata Bo-la dan Bi-la itu bunyinya mirip sekali ya di awal kata?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Iya, Ali! Huruf depannya sama-sama B, tapi karena setelahnya ada huruf o dan i, artinya jadi jauh berbeda. Jangan sampai salah sebut ya, nanti mainannya tertukar!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di depan wastafel sekolah. Ali hendak makan roti setelah bermain tanah." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ali, tunggu! Jangan langsung makan roti itu dengan tangan yang kotor!</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Kenapa, Nia? Tanganku hanya terkena sedikit tanah kering kok, rotinya masih bersih.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Di tanah itu ada banyak Ku-man kecil tersembunyi. Kuman itu tidak terlihat oleh mata kita. Kalau tertelan, perutmu bisa sakit!</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Hii, seram sekali! Jadi, mencuci tangan pakai sabun itu seperti mengusir monster kuman ya?</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di dalam ruang kelas. Tali sepatu Ali lepas." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Aduh, tali sepatuku lepas lagi. Aku tidak bisa mengikatnya sendiri, Nia. Aku tunggu Ibu datang saja nanti.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Jangan menyerah dulu, Ali! Sini aku ajarkan pelan-pelan. Lo-m-patkan talinya, lalu silangkan seperti ini.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, ikatannya berhasil, Nia! Aku bisa melakukannya sendiri sekarang!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Hebat, Ali! Anak yang mandiri selalu mau mencoba sendiri sampai bisa!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab5() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: pojok halaman sekolah. Mutia, murid baru, berdiri sendiri." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat anak perempuan di sana itu. Dia murid baru di kelas sebelah. Namanya Mu-ti-a.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ayo kita hampiri dia, Ali. Dia pasti merasa sedih karena belum punya teman bermain di sekolah baru.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Halo Mutia! Aku Ali, dan ini Nia. Mari bermain Ma-sak-masakan bersama kami di bawah pohon!</p>
      </GelembungTutur>
      <GelembungTutur nama="Mutia" warna="border-[#16A34A]/20 bg-[#F0FDF4]">
        <p>Wah, terima kasih Ali dan Nia! Aku senang sekali langsung punya teman baik di sini.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab6() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: lorong sekolah tiba-tiba gelap karena mati lampu saat mendung." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia... gelap sekali! Aku takut ada Ge-ge-tek atau hantu tersembunyi di pojok lorong!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Jangan takut, Ali! Itu hanya lampu mati karena hujan mendung di luar. Tidak ada monster di sekolah kita. Ayo kita berpegangan tangan dan berjalan perlahan bersama menuju kelas.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, hatiku jadi terasa lebih tenang setelah mendengar penjelasanmu, Nia.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab7() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di depan ruang guru. Ali dan Nia mengantarkan buku tugas kelas." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, di sekolah ini ternyata banyak sekali orang yang membantu kita belajar ya. Ada Ibu Pa-kar Guru, ada Pak Satpam, dan Ibu Kepala Sekolah.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Betul, Ali! Sekolah ini sudah seperti rumah kedua kita. Semua warga sekolah punya tugas penting masing-masing agar kita semua bisa belajar dengan aman dan nyaman.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Kalau begitu, kita sebagai murid juga punya tugas untuk menjaga kebersihan gedung sekolah ini bersama mereka, ya!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab8() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: taman sekolah di siang hari yang cerah." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat ke atas langit! Matahari bersinar cerah sekali siang ini. Nya-la cahayanya membuat halaman kita menjadi terang benderang.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Iya, Ali! Dan lihat di batang pohon itu, ada seekor Ci-cak sedang merayap diam-diam untuk menangkap Nya-muk.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, alam di sekitar sekolah kita penuh dengan cerita seru hewan dan tumbuhan ya!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "bindo-1-bab1") return <DialogBab1 />;
  if (modulId === "bindo-1-bab2") return <DialogBab2 />;
  if (modulId === "bindo-1-bab3") return <DialogBab3 />;
  if (modulId === "bindo-1-bab4") return <DialogBab4 />;
  if (modulId === "bindo-1-bab5") return <DialogBab5 />;
  if (modulId === "bindo-1-bab6") return <DialogBab6 />;
  if (modulId === "bindo-1-bab7") return <DialogBab7 />;
  return <DialogBab8 />;
}

function EvaluasiBab1({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Analisis bunyi
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal='Ketika hujan deras di malam hari, tiba-tiba terdengar bunyi "Blarrr!" yang menggelegar di langit. Bunyi tersebut termasuk jenis...'
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Bunyi buatan manusia yang disengaja." },
          { huruf: "B", teks: "Bunyi alamiah yang bersumber dari fenomena alam." },
          { huruf: "C", teks: "Bunyi alat musik tradisional." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa bel penanda istirahat di sekolah dibuat dengan bunyi yang sangat nyaring dan keras?"
        benar="A"
        pilihan={[
          {
            huruf: "A",
            teks: "Agar semua siswa di seluruh penjuru sekolah bisa mendengar tanda istirahat dengan jelas walau sedang bermain.",
          },
          { huruf: "B", teks: "Karena guru-guru menyukai suara yang bising." },
          { huruf: "C", teks: "Supaya burung-burung yang hinggap di pohon terbang pergi." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Mencocokkan huruf fonik
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={2}
        kiri={["Gambar Ayam", "Gambar Bebek", "Gambar Kucing"]}
        kanan={["Bunyi /b/ (B-b)", "Bunyi /k/ (K-k)", "Bunyi /a/ (A-a)"]}
        kunci={{
          "Gambar Ayam": "Bunyi /a/ (A-a)",
          "Gambar Bebek": "Bunyi /b/ (B-b)",
          "Gambar Kucing": "Bunyi /k/ (K-k)",
        }}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Menggabungkan suku kata
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Suku kata bu jika digabung dengan suku kata ku akan membentuk kata benda belajar berupa..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Baju" },
          { huruf: "B", teks: "Buku" },
          { huruf: "C", teks: "Buka" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Ibu membelikan adik sebuah mainan berwajah lucu bernama boneka. Suku kata awalan yang membentuk kata bo-ne-ka adalah..."
        benar="C"
        pilihan={[
          { huruf: "A", teks: "Ba" },
          { huruf: "B", teks: "Bi" },
          { huruf: "C", teks: "Bo" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Isian suku kata hilang
      </h5>
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Gambar binatang air 🐟 → Bi-......"
        alias={["ang", "biang"]}
      />
      <KuisIsian
        id={idEval(modulId, 3)}
        soal="Gambar pakaian sekolah 👕 → ......-ju"
        alias={["ba", "baju"]}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda kasus
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Mengapa kita diwajibkan mencuci tangan menggunakan sabun setelah selesai bermain di halaman sekolah?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Supaya tangan kita menjadi wangi buah-buahan dan berwarna putih bersih.",
          },
          {
            huruf: "B",
            teks: "Agar kuman berbahaya yang menempel mati sehingga tubuh kita terhindar dari penyakit perut.",
          },
          {
            huruf: "C",
            teks: "Karena air keran tidak bisa mengalir jika tidak diberi sabun.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 1)}
        soal="Kita sebaiknya memotong kuku jari tangan yang panjang setiap satu bulan sekali saja."
        benar="salah"
        alasanBenar="kuku dipotong ketika sudah panjang dan kotor agar kuman tidak bersembunyi, bukan hanya sebulan sekali"
      />
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Membaca buku di ruangan yang redup atau gelap dapat mengganggu kesehatan mata kita."
        benar="benar"
        alasanBenar="membaca di tempat gelap membuat mata lelah dan mengganggu kesehatan mata"
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Mengurutkan langkah logis
      </h5>
      <p className="text-sm font-semibold text-slate-700">
        (1) Mengeringkan badan menggunakan handuk bersih. (2) Membasahi tubuh dan
        menggosok badan dengan sabun mandi. (3) Memakai seragam sekolah dan dasi
        dengan rapi.
      </p>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Urutan kemandirian yang paling tepat dan logis agar tubuh bersih dan siap belajar adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "(1) - (2) - (3)" },
          { huruf: "B", teks: "(2) - (1) - (3)" },
          { huruf: "C", teks: "(3) - (2) - (1)" },
        ]}
      />
    </div>
  );
}

function EvaluasiBab5({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Etika berbicara
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ketika berpapasan dengan Ibu Guru di koridor sekolah pada pagi hari, kalimat sapaan yang paling santun diucapkan adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: '"Halo Guru, aku mau pergi ke kelas dulu ya!"' },
          { huruf: "B", teks: '"Selamat pagi Ibu Guru, apa kabar hari ini?"' },
          { huruf: "C", teks: '"Hai Guru, minggir dulu saya mau lewat."' },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Klasifikasi kata Ma atau Mi
      </h5>
      <KuisLingkar
        id={idEval(modulId, 1)}
        soal="Lingkarilah kelompok kata yang huruf awalnya menggunakan suku kata Ma atau Mi."
        opsi={["Meja", "Minum", "Madu", "Mobil"]}
        benar={["Minum", "Madu"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Kata madu suku awalnya apa?"
        alias={["ma"]}
      />
    </div>
  );
}

function EvaluasiBab6({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Manajemen emosi
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ketika kotak pensil kesayanganmu tidak sengaja dirusak oleh teman yang meminjamnya, tindakan terbaik untuk mengelola rasa marahmu adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Berteriak keras di depan wajahnya lalu membalas merusak barang miliknya.",
          },
          {
            huruf: "B",
            teks: "Menarik napas dalam-dalam agar tenang, lalu meminta teman tersebut meminta maaf atau memperbaikinya dengan bahasa yang sopan.",
          },
          {
            huruf: "C",
            teks: "Menangis sekencang-kencangnya di bawah meja kelas sampai pulang sekolah.",
          },
        ]}
      />
    </div>
  );
}

function EvaluasiBab7({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Menilai peran warga sekolah
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Siapakah warga sekolah yang memiliki tugas utama memimpin seluruh aturan, program kegiatan, dan menjaga keteraturan sekolah?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Penjaga Kantin Sekolah" },
          { huruf: "B", teks: "Kepala Sekolah" },
          { huruf: "C", teks: "Petugas Perpustakaan" },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Menyusun suku kata acak
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="ni - se - pa - d → ....................................... "
        alias={["sepeda"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="ru - gu → ....................................... "
        alias={["guru"]}
      />
    </div>
  );
}

function EvaluasiBab8({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFFBEB] px-4 py-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="text-xs font-black uppercase tracking-wide text-[#92400E]">
          Teks bacaan
        </p>
        <p className="mt-2">
          Matahari terbit di sebelah timur pada pagi hari. Cahayanya yang hangat
          menerangi bumi. Bunga-bunga mawar mulai mekar indah di taman sekolah.
          Burung-burung pipit berkicau riang di atas dahan.
        </p>
      </article>
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Membaca pemahaman paragraf pendek
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Berdasarkan teks di atas, kapan waktu matahari tersebut terbit menyinari taman?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Malam hari yang sunyi" },
          { huruf: "B", teks: "Pagi hari yang cerah" },
          { huruf: "C", teks: "Sore hari sebelum hujan" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Perubahan apa yang terjadi pada tanaman bunga di taman saat matahari mulai terbit?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Kelopak bunga mawar menjadi layu dan rontok ke tanah." },
          { huruf: "B", teks: "Kelopak bunga mawar mulai mekar dengan sangat indah." },
          { huruf: "C", teks: "Bunga-bunga mawar dipetik oleh burung pipit." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "bindo-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "bindo-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "bindo-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
  if (modul.id === "bindo-1-bab4") return <EvaluasiBab4 modulId={modul.id} />;
  if (modul.id === "bindo-1-bab5") return <EvaluasiBab5 modulId={modul.id} />;
  if (modul.id === "bindo-1-bab6") return <EvaluasiBab6 modulId={modul.id} />;
  if (modul.id === "bindo-1-bab7") return <EvaluasiBab7 modulId={modul.id} />;
  return <EvaluasiBab8 modulId={modul.id} />;
}

const INFOGRAFIS: Record<
  string,
  {
    judul: string;
    kepala: [string, string, string];
    baris: Array<[string, string, string]>;
    hots?: string;
  }
> = {
  "bindo-1-bab1": {
    judul: "Peta bunyi di sekitar kita",
    kepala: ["Sumber", "Contoh", "Jenis"],
    baris: [
      ["Alam / makhluk hidup", "Petir, kucing meong, air", "Bunyi alami"],
      ["Alat / perbuatan manusia", "Bel, peluit, klakson", "Bunyi buatan"],
      ["Huruf (fonem)", "/b/ pada bola, bukan 'be'", "Kesadaran fonemis"],
    ],
    hots: "Mengapa setiap benda mengeluarkan bunyi yang berbeda-beda?",
  },
  "bindo-1-bab2": {
    judul: "Suku kata B (KV)",
    kepala: ["Suku", "Kata", "Arti gambar"],
    baris: [
      ["Ba", "Ba-ju", "Pakaian sekolah"],
      ["Bi / Bu", "Bi-bi, Bu-ku", "Orang dan benda belajar"],
      ["Be / Bo", "Be-bek, Bo-la", "Hewan dan mainan"],
    ],
    hots: "Mengapa bo-la dan bi-la artinya berbeda?",
  },
  "bindo-1-bab3": {
    judul: "Suku kata K dan tubuh sehat",
    kepala: ["Suku", "Kata", "Makna sehat"],
    baris: [
      ["Ka / Ki", "Ka-ki, Ki-jang", "Tubuh dan hewan"],
      ["Ku", "Ku-ku, Ku-man", "Potong kuku, cuci tangan"],
      ["Ke / Ko", "Ke-ra, Ko-tak", "Rapikan, lalu cuci tangan"],
    ],
    hots: "Mengapa kuman yang tidak kelihatan tetap berbahaya?",
  },
  "bindo-1-bab4": {
    judul: "Suku kata L dan aku bisa",
    kepala: ["Suku", "Kata", "Kemandirian"],
    baris: [
      ["La / Lo", "La-ri, Lo-m-pat", "Gerak tubuh"],
      ["Li / Lu", "Li-dah, Lu-lut", "Kenali tubuh"],
      ["Le", "Le-le, langkah", "Baca instruksi, kerjakan"],
    ],
    hots: "Urutan apa dulu: mandi, keringkan, atau memakai seragam?",
  },
  "bindo-1-bab5": {
    judul: "Suku kata M dan sapaan",
    kepala: ["Suku", "Kata", "Sikap bicara"],
    baris: [
      ["Ma / Mi", "Ma-ta, Mi-num, Ma-du", "Lihat teman, sapa ramah"],
      ["Mu / Me", "Mu-lut, Me-ja", "Kata lembut, bukan ejekan"],
      ["Mo", "Mo-bil, Mu-ti-a", "Ajak teman baru bermain"],
    ],
    hots: "Kalimat sapaan apa yang paling santun kepada Ibu Guru?",
  },
  "bindo-1-bab6": {
    judul: "Suku kata G dan emosi",
    kepala: ["Suku", "Kata", "Perasaan"],
    baris: [
      ["Ga / Gi", "Ga-jah, Gi-gi", "Bunyi /g/ bersuara"],
      ["Gu / Ge", "Gu-la, Ge-las", "Benda sehari-hari"],
      ["Go", "Go-re-ng, gelap", "Takut, napas, fakta"],
    ],
    hots: "Jika marah karena barang rusak, langkah pertama yang bijak apa?",
  },
  "bindo-1-bab7": {
    judul: "Suku kata P dan rumah kedua",
    kepala: ["Suku", "Kata", "Warga sekolah"],
    baris: [
      ["Pa / Po", "Pa-di, Po-hon, Pa-kar", "Guru membantu belajar"],
      ["Pi / Pu", "Pi-pa, Pu-tih", "Satpam menjaga aman"],
      ["Pe", "Pe-na, Kepala", "Kepala sekolah memimpin"],
    ],
    hots: "Siapa yang memimpin seluruh aturan dan program sekolah?",
  },
  "bindo-1-bab8": {
    judul: "Suku N, Y, C dan paragraf",
    kepala: ["Gabungan", "Kata", "Cara baca"],
    baris: [
      ["Nya", "Nya-muk, Nya-la", "Satu bunyi, bukan N+Y"],
      ["Ci / Cu / Co", "Ci-cak, Cu-ci, Co-mel", "Huruf C di awal suku"],
      ["Paragraf", "Titik (.) dan tanya (?)", "Berhenti atau nada naik"],
    ],
    hots: "Menurut teks, kapan matahari terbit dan apa yang terjadi pada mawar?",
  },
};

const EMOJI: Record<"A" | "B" | "C" | "D", Record<string, string>> = {
  A: {
    "bindo-1-bab1": "🐱👂",
    "bindo-1-bab2": "⚽🎋",
    "bindo-1-bab3": "🧼🦠",
    "bindo-1-bab4": "👟✨",
    "bindo-1-bab5": "🤝👧",
    "bindo-1-bab6": "🌩️🤝",
    "bindo-1-bab7": "🏫📘",
    "bindo-1-bab8": "☀️🦎",
  },
  B: {
    "bindo-1-bab1": "🔤🌧️",
    "bindo-1-bab2": "🅱️📖",
    "bindo-1-bab3": "🧼📖",
    "bindo-1-bab4": "🏃📖",
    "bindo-1-bab5": "💬📖",
    "bindo-1-bab6": "😌📖",
    "bindo-1-bab7": "🌳📖",
    "bindo-1-bab8": "📚🌞",
  },
  C: {
    "bindo-1-bab1": "🏫🏠",
    "bindo-1-bab2": "🃏🏡",
    "bindo-1-bab3": "🚰🏡",
    "bindo-1-bab4": "🎒🏡",
    "bindo-1-bab5": "🌅🏡",
    "bindo-1-bab6": "🌬️🏡",
    "bindo-1-bab7": "🗺️🏡",
    "bindo-1-bab8": "🪟🏡",
  },
  D: {
    "bindo-1-bab1": "📝🔊",
    "bindo-1-bab2": "📝🅱️",
    "bindo-1-bab3": "📝🧼",
    "bindo-1-bab4": "📝👟",
    "bindo-1-bab5": "📝🤝",
    "bindo-1-bab6": "📝💛",
    "bindo-1-bab7": "📝🏫",
    "bindo-1-bab8": "📝☀️",
  },
};

export default function NaskahBindo1({
  modul,
  kelas = "1 SD",
  kelamin,
}: {
  modul: ModulResmiPai;
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;
  const info = INFOGRAFIS[modul.id];
  const aliasTulisD = kumpulkanAlias(
    kartuD.kuis.flatMap((item) => item.alias),
  );

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <KepalaKartu
          emoji={EMOJI.A[modul.id] ?? "💬"}
          kartu={kartuA}
          kelas={kelas}
          kelamin={kelamin}
        />
        <DialogBab modulId={modul.id} />
        <LatihanSuaraResmi
          soal={kartuA.kuis}
          idPrefix={`${modul.id}-${kartuA.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <KepalaKartu
          emoji={EMOJI.B[modul.id] ?? "📊"}
          kartu={kartuB}
          kelas={kelas}
          kelamin={kelamin}
        />
        {info ? (
          <InfografisTabel
            judul={info.judul}
            kepala={info.kepala}
            baris={info.baris}
            hots={info.hots}
          />
        ) : null}
        <div className="mt-4 grid gap-3">
          {kartuB.item.map((item) => (
            <article
              key={item.nama}
              className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3"
            >
              <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
                {item.nama}
                {item.singkat ? ` · ${item.singkat}` : ""}
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
                {item.uraian}
              </p>
            </article>
          ))}
        </div>
        <LatihanSuaraResmi
          soal={kartuB.kuis}
          idPrefix={`${modul.id}-${kartuB.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <KepalaKartu
          emoji={EMOJI.C[modul.id] ?? "🏫🏠"}
          kartu={kartuC}
          kelas={kelas}
          kelamin={kelamin}
        />
        <KartuGuruOrtu kartu={kartuC} />
        <LatihanSuaraResmi
          soal={kartuC.kuis}
          idPrefix={`${modul.id}-${kartuC.kode}`}
        />
      </KartuBingkai>

      <KartuBingkai>
        <KepalaKartu
          emoji={EMOJI.D[modul.id] ?? "📝"}
          kartu={kartuD}
          kelas={kelas}
          kelamin={kelamin}
          subjudul={`Bahasa Indonesia · ${modul.judul}`}
        />
        <EvaluasiBab modul={modul} />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "D")}
          pertanyaan="Tuliskan satu jawaban dari lembar evaluasi bab ini."
          alias={aliasTulisD}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
