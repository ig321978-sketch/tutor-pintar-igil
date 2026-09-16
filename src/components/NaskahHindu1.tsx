"use client";

import { useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import DoodleKartuAtasJudul from "@/components/DoodleKartuAtasJudul";
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
  doodleId,
  kartu,
  kelas,
  kelamin,
  subjudul,
}: {
  doodleId: string;
  kartu: KartuModulResmi;
  kelas: string;
  kelamin?: KelaminGuru;
  subjudul?: string;
}) {
  return (
    <>
      <DoodleKartuAtasJudul
        id={doodleId}
        folder="doodle-hindu"
        alt={`Ilustrasi ${kartu.judul}`}
      />
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
            {indeks === 0 ? "Sekolah · Untuk guru" : "Rumah · Untuk orang tua"}
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

function idEval(modulId: string, indeks: number): string {
  return idKuisKartuResmi(modulId, "D", indeks);
}

function KuisJodoh({
  id,
  soal,
  pasangan,
  kunci,
}: {
  id: string;
  soal: string;
  pasangan: { kiri: string; kanan: string[] }[];
  kunci: Record<string, string>;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    const ok = Object.entries(kunci).every(([kiri, kanan]) => pilih[kiri] === kanan);
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFF7ED] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <div className="mt-3 grid gap-3">
        {pasangan.map((item) => (
          <label key={item.kiri} className="block text-sm font-bold text-[#1C01A5]">
            {item.kiri}
            <select
              value={pilih[item.kiri] ?? ""}
              onChange={(e) =>
                setPilih((lama) => ({ ...lama, [item.kiri]: e.target.value }))
              }
              className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-semibold text-[#1C01A5]"
            >
              <option value="">Pilih kelompok...</option>
              {item.kanan.map((opsi) => (
                <option key={opsi} value={opsi}>
                  {opsi}
                </option>
              ))}
            </select>
          </label>
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
          cuplikan={Object.values(pilih).join(" · ") || undefined}
          pesanSalah="Jodohkan kedua benda ke kelompok yang tepat."
        />
      </div>
    </article>
  );
}

function KuisCentang({
  id,
  soal,
  pilihan,
  benar,
}: {
  id: string;
  soal: string;
  pilihan: string[];
  benar: string[];
}) {
  const kuis = useKuisMateri();
  const [centang, setCentang] = useState<string[]>([]);
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const toggle = (teks: string) => {
    setCentang((lama) =>
      lama.includes(teks) ? lama.filter((item) => item !== teks) : [...lama, teks],
    );
  };
  const periksa = () => {
    const ok =
      benar.length === centang.length &&
      benar.every((item) => centang.includes(item));
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
      <div className="mt-3 grid gap-2">
        {pilihan.map((teks) => (
          <label
            key={teks}
            className="flex items-start gap-2 rounded-xl border-2 border-[#1C01A5]/15 bg-white px-3 py-2 text-sm font-bold text-slate-700"
          >
            <input
              type="checkbox"
              checked={centang.includes(teks)}
              onChange={() => toggle(teks)}
              className="mt-1"
            />
            <span>{teks}</span>
          </label>
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
          cuplikan={centang.join(" · ") || undefined}
          pesanSalah="Centang semua yang sopan, jangan yang membentak."
        />
      </div>
    </article>
  );
}

function KuisKelompok({
  id,
  soal,
  benar,
}: {
  id: string;
  soal: string;
  benar: "sesuai" | "tidak";
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">{soal}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            ["sesuai", "Sesuai Tat Twam Asi"],
            ["tidak", "Tidak sesuai"],
          ] as const
        ).map(([nilai, label]) => (
          <button
            key={nilai}
            type="button"
            onClick={() => {
              setPilih(nilai);
              if (nilai === benar) kuis?.tandaiBenar(id);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
              pilih,
              nilai,
              benar,
              "bg-[#1C01A5] text-white hover:bg-[#16017a]",
            )}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis
          status={status}
          cuplikan={pilih || undefined}
          pesanSalah="Pilih kolom yang sesuai ajaran Tat Twam Asi."
        />
      </div>
    </article>
  );
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
      <Latar anak="Latar: di area luar Pura sekolah. Ali dan Made melihat pohon kamboja (jepun) yang berbunga lebat." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Made, lihat bunga jepun ini, warnanya putih kuning dan harum sekali. Siapa yang menanamnya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Petani yang menanamnya, Ali. Tapi yang menumbuhkan dan memberinya warna serta keharuman yang indah adalah Hyang Widhi Wasa (Tuhan). Kita menyebut semua makhluk hidup ini sebagai ciptaan-Nya.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah! Berarti kucing, pohon kelapa, dan diri kita sendiri juga diciptakan oleh-Nya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Betul! Karena Hyang Widhi sudah memberikan kita tubuh yang sehat dan alam yang indah, kita wajib bersyukur dengan cara merawat tanaman dan menyayangi sesama makhluk.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di teras rumah Made setelah pulang sekolah." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Made, mengapa sebelum masuk ke dalam rumah tadi kamu mengucapkan salam Om Swastyastu sambil merapatkan kedua telapak tanganmu di dada?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Itu adalah salam suci umat Hindu, Nia. Artinya, semoga pikiran baik datang dari segala arah. Salam ini juga wujud rasa hormatku kepada orang tua yang ada di rumah.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, indah sekali maknanya! Apakah menghormati orang tua juga termasuk ajaran agama?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Betul, Nia. Itu bagian dari Tri Kaya Parisudha, yaitu berpikir yang baik (Manacika), berkata yang sopan (Wacika), dan berbuat yang benar (Kayika). Anak yang berbakti selalu menanam kebaikan di rumah!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di depan tempat suci keluarga (Sanggah/Merajan) milik keluarga Made pada sore hari." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Made, pakaianmu rapi sekali memakai kain kamen dan ikat kepala udeng. Kamu mau pergi ke mana?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Aku mau melaksanakan Sembahyang Trisandya sore, Ali. Ini adalah waktu bagi kita untuk memuja keagungan Hyang Widhi Wasa agar jiwa kita selalu dilindungi.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Oh, saat sembahyang, apa saja yang kamu bawa dan siapkan?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Kita menyiapkan sarana suci yang sederhana, Ali, seperti bunga yang harum dan dupa yang menyala. Bunga melambangkan kesucian hati, dan asap dupa mengantarkan doa kita ke atas langit.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di kelas jam istirahat. Teman bernama Tono terjatuh dan buku tugasnya berhamburan di lantai." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Made, lihat Tono! Dia tersandung kaki meja. Mari kita bantu rapikan bukunya.</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Ayo, Nia! Di dalam agama Hindu ada ajaran mulia yang bunyinya Tat Twam Asi. Artinya adalah Ia adalah kamu, kamu adalah ia.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, dalam sekali kalimat itu. Apa maksud sebenarnya, Made?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Maksudnya, apa yang dirasakan orang lain, itu juga yang kita rasakan. Jika kita menolong orang lain yang kesusahan, sama saja kita sedang menolong diri kita sendiri. Sebab kita semua bersaudara di hadapan Tuhan!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "hindu-1-bab1") return <DialogBab1 />;
  if (modulId === "hindu-1-bab2") return <DialogBab2 />;
  if (modulId === "hindu-1-bab3") return <DialogBab3 />;
  return <DialogBab4 />;
}

function EvaluasiBab1({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda analisis
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Di halaman rumahmu ada seekor anak kucing yang mengeong kelaparan. Perbuatan baik (Kayika) yang paling tepat kamu lakukan sebagai wujud kasih kepada ciptaan Hyang Widhi Wasa adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Membiarkannya berlari pergi karena takut kotor.",
          },
          {
            huruf: "B",
            teks: "Mengambil sisa makanan yang aman atau susu lalu memberikannya dengan kasih sayang.",
          },
          {
            huruf: "C",
            teks: "Melemparinya dengan batu kecil agar ia tidak bersuara lagi.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Ketika kamu melihat tanaman bunga di depan kelas mulai layu karena cuaca sangat terik, tindakan apa yang mencerminkan rasa syukurmu kepada Hyang Widhi?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Memetik bunganya sebelum kering total.",
          },
          {
            huruf: "B",
            teks: "Mengambil air menggunakan gayung atau siraman, lalu menyiram tanaman itu dengan rajin.",
          },
          {
            huruf: "C",
            teks: "Menunggu tukang kebun sekolah yang datang menyiramnya.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Menjodohkan kelompok ciptaan
      </h5>
      <KuisJodoh
        id={idEval(modulId, 2)}
        soal="Jodohkan benda atau makhluk ke kelompok ciptaan Hyang Widhi yang benar."
        pasangan={[
          {
            kiri: "Manusia dan Kucing",
            kanan: ["Makhluk Hidup (Cetana)", "Benda Mati (Acetana)"],
          },
          {
            kiri: "Batu dan Air Sungai",
            kanan: ["Makhluk Hidup (Cetana)", "Benda Mati (Acetana)"],
          },
        ]}
        kunci={{
          "Manusia dan Kucing": "Makhluk Hidup (Cetana)",
          "Batu dan Air Sungai": "Benda Mati (Acetana)",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Isian bergambar
      </h5>
      <KuisIsian
        id={idEval(modulId, 3)}
        soal="☀️ 🌙 Matahari dan bulan adalah contoh ciptaan Hyang Widhi Wasa kelompok benda ........................"
        alias={["mati", "acetana"]}
      />
      <KuisIsian
        id={idEval(modulId, 4)}
        soal="👧 💦 🌸 Menyiram bunga dengan rajin termasuk perbuatan yang ........................"
        alias={["baik", "susila"]}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda kompleks Wacika
      </h5>
      <KuisCentang
        id={idEval(modulId, 0)}
        soal="Manakah perbuatan berikut yang termasuk berkata baik dan sopan (Wacika) di lingkungan keluarga? Centang jawaban yang benar."
        pilihan={[
          'Mengucapkan kata "Terima kasih" setelah diberikan uang saku oleh Ayah.',
          "Membentak Ibu saat diminta merapikan tempat tidur.",
          "Menyapa adik atau kakak dengan bahasa yang santun dan lembut.",
        ]}
        benar={[
          'Mengucapkan kata "Terima kasih" setelah diberikan uang saku oleh Ayah.',
          "Menyapa adik atau kakak dengan bahasa yang santun dan lembut.",
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 1)}
        soal="Kita hanya perlu membantu menyapu lantai rumah jika dijanjikan hadiah mainan baru oleh orang tua."
        benar="salah"
        alasanBenar="anak berbakti menolong dengan Kayika tanpa menunggu hadiah mainan"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Studi kasus sebab-akibat
      </h5>
      <KuisPilihan
        id={idEval(modulId, 2)}
        soal="Sebab: Made selalu berpikir yang baik (Manacika) dan tidak pernah iri hati kepada teman-temannya. Akibat yang dirasakan Made dalam kehidupan sehari-hari adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Made memiliki sedikit teman di sekolah." },
          {
            huruf: "B",
            teks: "Hati Made menjadi tenang, damai, dan disayangi oleh banyak orang.",
          },
          { huruf: "C", teks: "Made menjadi sering mengantuk di kelas." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda analisis
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Saat melaksanakan persembahyangan Kramaning Sembah, posisi telapak tangan kita dirapatkan di depan dada atau di atas dahi. Makna dari merapatkan kedua telapak tangan tersebut adalah..."
        benar="A"
        pilihan={[
          {
            huruf: "A",
            teks: "Simbol persatuan hati, pikiran, dan ucapan yang suci untuk memuja Hyang Widhi Wasa.",
          },
          {
            huruf: "B",
            teks: "Cara agar tangan kita tidak terasa dingin saat malam hari.",
          },
          {
            huruf: "C",
            teks: "Tanda bahwa kita ingin segera mengakhiri doa.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Isian singkat ragam sarana
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="Sarana sembahyang umat Hindu yang berfungsi menghasilkan asap harum sebagai simbol penuntun doa ke hadapan Hyang Widhi adalah ........................"
        alias={["dupa"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Air suci yang kita percikkan ke kepala dan kita minum setelah selesai melaksanakan sembahyang disebut ........................"
        alias={["tirta"]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Esai pendek penalaran
      </h5>
      <KuisIsian
        id={idEval(modulId, 3)}
        soal="Mengapa sebelum kita duduk tenang untuk sembahyang, kita diwajibkan mencuci tangan, mencuci kaki, dan berkumur terlebih dahulu? Jelaskan alasan kesuciannya!"
        alias={["suci", "bersih", "hormat", "hyang", "pikiran", "badan"]}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda kasus sosial
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Saat istirahat, kamu membawa dua buah kue lapis. Kamu melihat seorang teman duduk merenung sendirian karena bekalnya tertinggal di rumah. Tindakan yang mencerminkan pengamalan ajaran Tat Twam Asi adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Memakan kedua kue tersebut dengan cepat di depan wajahnya agar tidak diminta.",
          },
          {
            huruf: "B",
            teks: "Menghampirinya dengan ramah, lalu membagi satu kue milikmu untuk dinikmati bersama-sama dengannya.",
          },
          {
            huruf: "C",
            teks: "Menyarankannya untuk membeli kue sendiri di kantin.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Mengelompokkan sikap
      </h5>
      <KuisKelompok
        id={idEval(modulId, 1)}
        soal="Meminjamkan pensil kepada teman yang patah pensilnya."
        benar="sesuai"
      />
      <KuisKelompok
        id={idEval(modulId, 2)}
        soal="Menyembunyikan sepatu teman di dalam lemari sebagai lelucon."
        benar="tidak"
      />
      <KuisKelompok
        id={idEval(modulId, 3)}
        soal="Menjenguk teman sekelas yang sedang dirawat karena sakit."
        benar="sesuai"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Menyusun kata acak
      </h5>
      <KuisIsian
        id={idEval(modulId, 4)}
        soal="Susunlah kata-kata acak berikut menjadi semboyan ajaran kasih sayang Hindu yang benar! [ Asi ] - [ Twam ] - [ Tat ] →"
        alias={["tat twam asi"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "hindu-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "hindu-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "hindu-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
  return <EvaluasiBab4 modulId={modul.id} />;
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
  "hindu-1-bab1": {
    judul: "Ciptaan Hyang Widhi",
    kepala: ["Kelompok", "Arti", "Contoh"],
    baris: [
      ["Cetana", "Benda hidup", "Manusia, kucing, pohon"],
      ["Acetana", "Benda mati", "Batu, air, matahari"],
      ["Kayika", "Perbuatan syukur", "Beri makan, siram, jangan petik"],
    ],
    hots: "Jika bunga kelas layu, mengapa menunggu tukang kebun saja belum cukup sebagai syukur?",
  },
  "hindu-1-bab2": {
    judul: "Tri Kaya Parisudha",
    kepala: ["Sila", "Arti", "Contoh rumah"],
    baris: [
      ["Manacika", "Berpikir suci", "Tidak iri, doakan teman"],
      ["Wacika", "Berkata sopan", "Terima kasih, sapa lembut"],
      ["Kayika", "Berbuat benar", "Sapu tanpa menunggu hadiah"],
    ],
    hots: "Mengapa menyapu hanya jika ada hadiah belum termasuk anak yang berbakti?",
  },
  "hindu-1-bab3": {
    judul: "Sarana sembahyang",
    kepala: ["Sarana", "Lambang", "Sikap"],
    baris: [
      ["Bunga", "Kesucian hati", "Persembahkan, jangan petik sembarangan"],
      ["Dupa", "Penuntun doa", "Pikiran terpusat ke Hyang Widhi"],
      ["Tirta", "Air suci", "Percik dan minum setelah doa"],
    ],
    hots: "Mengapa tangan, kaki, dan mulut dibersihkan sebelum duduk tenang?",
  },
  "hindu-1-bab4": {
    judul: "Tat Twam Asi",
    kepala: ["Ajaran", "Arti", "Contoh"],
    baris: [
      ["Tat Twam Asi", "Ia adalah kamu", "Rapikan buku Tono"],
      ["Empati", "Rasa orang lain = rasa kita", "Bagi satu kue lapis"],
      ["Satu keluarga", "Vasudhaiva Kutumbakam", "Jenguk, jangan sembunyikan sepatu"],
    ],
    hots: "Mengapa menolong Tono sama dengan menolong diri sendiri?",
  },
};

export default function NaskahHindu1({
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
          doodleId={`${modul.id}-A`}
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
          doodleId={`${modul.id}-B`}
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
          doodleId={`${modul.id}-C`}
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
          doodleId={`${modul.id}-D`}
          kartu={kartuD}
          kelas={kelas}
          kelamin={kelamin}
          subjudul={`PA Hindu · ${modul.judul}`}
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
