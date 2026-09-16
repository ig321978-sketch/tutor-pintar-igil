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
        folder="doodle-khonghucu"
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
              <option value="">Pilih contoh nyata...</option>
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
          pesanSalah="Jodohkan setiap kebajikan ke contoh nyata yang tepat."
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
          pesanSalah="Centang semua yang termasuk laku bakti, jangan yang tidur larut main game."
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
      <Latar anak="Latar: di dalam kelas seni. Ali dan Nia sedang menggambar sebuah pohon besar yang dikelilingi bunga." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, mengapa setiap kali kita berbuat baik seperti membagi kue atau meminjamkan pensil, hati kita rasanya sejuk dan gembira ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Itu karena Tian (Tuhan Yang Maha Esa) telah menanamkan Watak Sejati yang baik di dalam hati kita sejak lahir, Ali. Kita dilahirkan dengan benih kebaikan.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah! Kalau di dalam hati kita sudah ada benih kebaikan, kenapa kadang ada anak yang suka marah-marah atau pelit?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Kata Guru, itu karena mereka malas merawat benih baiknya, Ali. Seperti tanaman, kalau tidak disiram, dia tidak tumbuh. Makanya, kita harus terus belajar agar benih kebaikan kita mekar sempurna!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di ruang tengah rumah Nia setelah makan malam bersama." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, kulihat setelah makan malam tadi, kamu langsung membantu Ibumu membawa piring kotor ke dapur tanpa diminta. Kamu tidak lelah?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Tentu tidak, Ali. Ini adalah wujud Xiao (Laku Bakti) kepada orang tua. Ayah dan Ibu sudah bekerja keras merawatku dengan penuh cinta kasih.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, laku bakti itu indah sekali ya. Berarti di rumah kita harus selalu patuh?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Betul! Menjaga kerukunan dengan adik, berbicara lembut kepada orang tua, dan rajin belajar adalah cara kita berbakti. Anak yang mengamalkan Xiao akan membawa berkah kebahagiaan bagi seluruh rumah.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di depan altar Vihara/Litang. Made dan Nia sedang memandangi lukisan seorang guru agung berbaju jubah panjang." />
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Nia, siapakah nama Nabi yang mengajarkan kita untuk selalu hidup sopan dan penuh cinta kasih ini?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Beliau adalah Nabi Kongzi (Konfusius), Made. Beliau adalah utusan Tian yang menjadi guru agung bagi kita semua.</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Bagaimana sifat Nabi Kongzi ketika beliau masih kecil seumur kita, Nia?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Sejak kecil, Nabi Kongzi sangat suka belajar, Made. Beliau tidak pernah malas bertanya tentang hal-hal baik. Saat bermain dengan teman-temannya, beliau selalu suka mengalah, adil, dan memimpin permainan dengan sangat sopan!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di lapangan sekolah. Ali ingin mengejek Made karena Made memakai sepatu yang sudah lama." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ali, tunggu! Jangan ucapkan kata-kata ejekan itu kepada Made.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Kenapa, Nia? Kan aku hanya bercanda saja dengan Made.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Coba bayangkan, jika kamu yang memakai sepatu lama itu, lalu Made mengejekmu di depan banyak orang, bagaimana perasaan hatimu?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Aku... aku pasti akan merasa sangat sedih dan malu, Nia.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Nah, itu namanya Tepasal (Shu), Ali. Nabi Kongzi mengajarkan: Apa yang diri sendiri tidak inginkan, janganlah diberikan kepada orang lain. Jika kita tidak ingin disakiti, janganlah menyakiti orang lain.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "khonghucu-1-bab1") return <DialogBab1 />;
  if (modulId === "khonghucu-1-bab2") return <DialogBab2 />;
  if (modulId === "khonghucu-1-bab3") return <DialogBab3 />;
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
        soal="Saat jam istirahat, kamu melihat Tono tidak sengaja merobek kertas gambar milik Made. Tono ketakutan. Tindakan yang mencerminkan sifat Yi (Kebenaran/Keadilan) pada dirimu adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menyembunyikan buku Made agar Made tidak tahu kertasnya robek.",
          },
          {
            huruf: "B",
            teks: "Menasihati Tono dengan lembut agar berani jujur mengaku dan meminta maaf kepada Made, serta ikut membantu menempel kembali kertas yang robek.",
          },
          {
            huruf: "C",
            teks: "Menyoraki Tono agar dimarahi oleh Ibu Guru.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Watak sejati yang diberikan oleh Tian kepada setiap manusia sejak lahir adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Buruk dan suka bertengkar." },
          {
            huruf: "B",
            teks: "Baik, mulia, dan penuh dengan benih kebajikan.",
          },
          {
            huruf: "C",
            teks: "Kosong seperti kertas putih tanpa arti.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Mengucapkan kata permisi dan membungkukkan badan sedikit saat berjalan di depan Ibu Guru yang sedang duduk adalah wujud dari sifat Li (Kesusilaan/Sopan Santun)."
        benar="benar"
        alasanBenar="permisi dan membungkuk adalah tata krama Li, sopan santun menghormati guru"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Mencocokkan garis kebajikan
      </h5>
      <KuisJodoh
        id={idEval(modulId, 3)}
        soal="Tariklah garis ke arti kebajikan yang tepat."
        pasangan={[
          {
            kiri: "Ren (Cinta Kasih)",
            kanan: [
              "Berani mengakui kesalahan dengan jujur.",
              "Menghormati orang tua dengan tutur kata santun.",
              "Menyayangi kucing jalanan yang kelaparan.",
            ],
          },
          {
            kiri: "Yi (Kebenaran)",
            kanan: [
              "Berani mengakui kesalahan dengan jujur.",
              "Menghormati orang tua dengan tutur kata santun.",
              "Menyayangi kucing jalanan yang kelaparan.",
            ],
          },
          {
            kiri: "Li (Kesusilaan)",
            kanan: [
              "Berani mengakui kesalahan dengan jujur.",
              "Menghormati orang tua dengan tutur kata santun.",
              "Menyayangi kucing jalanan yang kelaparan.",
            ],
          },
        ]}
        kunci={{
          "Ren (Cinta Kasih)": "Menyayangi kucing jalanan yang kelaparan.",
          "Yi (Kebenaran)": "Berani mengakui kesalahan dengan jujur.",
          "Li (Kesusilaan)": "Menghormati orang tua dengan tutur kata santun.",
        }}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        A. Pilihan ganda kompleks Xiao
      </h5>
      <KuisCentang
        id={idEval(modulId, 0)}
        soal="Manakah tindakan di bawah ini yang merupakan perwujudan laku bakti (Xiao) seorang anak kepada orang tuanya di rumah? Centang semua jawaban yang benar."
        pilihan={[
          "Mendengarkan dengan tenang saat Ayah memberikan nasihat belajar.",
          "Tidur larut malam sambil bermain game hingga besoknya terlambat bangun.",
          "Merapikan kembali sepatu sekolah di rak sepatu setelah pulang sekolah.",
        ]}
        benar={[
          "Mendengarkan dengan tenang saat Ayah memberikan nasihat belajar.",
          "Merapikan kembali sepatu sekolah di rak sepatu setelah pulang sekolah.",
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Isian singkat penalaran
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="Jika kita sering bertengkar dan berebut mainan dengan adik di rumah, maka hati orang tua kita akan menjadi ........................"
        alias={["sedih", "kecewa"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Laku bakti (Xiao) diajarkan dalam agama Khonghucu sebagai akar dari semua ........................"
        alias={["kebajikan", "perbuatan baik", "kebaikan"]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Studi kasus sebab-akibat
      </h5>
      <KuisPilihan
        id={idEval(modulId, 3)}
        soal="Sebab: Nia selalu menyapa orang tuanya dengan hormat setiap pagi dan rajin membantu membersihkan meja makan. Akibat yang terwujud di dalam rumah Nia adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Suasana rumah menjadi sepi karena tidak ada yang berteriak.",
          },
          {
            huruf: "B",
            teks: "Hubungan keluarga menjadi sangat harmonis, penuh kasih sayang, dan diberkahi Huang Tian.",
          },
          {
            huruf: "C",
            teks: "Ibu Nia akan membelikan semua toko mainan untuk Nia.",
          },
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
        soal="Ketika Nabi Kongzi kecil bermain bersama teman-temannya di halaman, beliau tidak pernah berebut mainan dan selalu menyapa temannya dengan hormat. Sikap Nabi Kongzi kecil ini mengajarkan kita untuk..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menjadi anak yang manja dan selalu ingin menang sendiri.",
          },
          {
            huruf: "B",
            teks: "Menghargai teman bermain, mengutamakan kedamaian, dan menjauhi sifat egois.",
          },
          {
            huruf: "C",
            teks: "Tidak usah bermain dengan teman lain.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Isian singkat ragam sejarah
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="Nabi Agung utusan Tian dalam agama Khonghucu bernama Nabi ........................"
        alias={["kongzi", "konfusius"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Sifat Nabi Kongzi yang paling menonjol sejak kecil dan patut kita tiru di sekolah adalah sangat suka ........................"
        alias={["belajar", "membaca"]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Esai pendek penalaran
      </h5>
      <KuisIsian
        id={idEval(modulId, 3)}
        soal="Mengapa kita tidak boleh malas untuk bertanya kepada guru atau orang tua ketika ada pelajaran sekolah yang belum kita pahami? Hubungkan dengan keteladanan Nabi Kongzi!"
        alias={["bertanya", "belajar", "kongzi", "paham", "xiu", "malas"]}
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
        soal="Di kantin, Joko tidak sengaja menumpahkan kuah sup ke atas meja kayu sehingga meja menjadi kotor. Sikap yang mencerminkan nilai Shu (Tepasal/Tenggang rasa) pada dirimu adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menertawakan Joko dengan keras agar anak-anak lain ikut melihat.",
          },
          {
            huruf: "B",
            teks: "Membantu Joko mengambil tisu atau kain lap untuk membersihkan meja bersama-sama karena tahu rasanya jika panik saat melakukan kesalahan.",
          },
          {
            huruf: "C",
            teks: "Memarahi Joko karena kuah supnya hampir mengenai bajumu.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        B. Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 1)}
        soal="Kita boleh meminjam mainan milik teman tanpa perlu meminta izin terlebih dahulu, asalkan nanti kita kembalikan lagi."
        benar="salah"
        alasanBenar="tepasa mengajarkan meminta izin karena kita juga tidak ingin barang kita diambil tanpa izin"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        C. Menyusun kalimat hikmah acak
      </h5>
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Susunlah kata-kata acak dari sabda Nabi Kongzi berikut menjadi kalimat yang benar! [ inginkan ] - [ tidak ] - [ jangan ] - [ berbuat ] - [ yang ] - [ kamu ] → Apa ........................"
        alias={[
          "yang kamu tidak inginkan jangan berbuat",
          "yang kamu tidak inginkan, jangan berbuat",
          "diri sendiri tidak inginkan",
          "jangan berbuat",
        ]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "khonghucu-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "khonghucu-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "khonghucu-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "khonghucu-1-bab1": {
    judul: "Watak Sejati dan empat kebajikan",
    kepala: ["Nama", "Arti", "Contoh"],
    baris: [
      ["Xing", "Watak sejati baik", "Lahir dengan benih kebajikan"],
      ["Ren", "Cinta kasih", "Sayangi teman dan hewan"],
      ["Yi", "Kebenaran", "Jujur mengaku, bantu tempel kertas"],
      ["Li", "Kesusilaan", "Permisi dan membungkuk di depan guru"],
    ],
    hots: "Jika benih kebaikan sudah ada sejak lahir, mengapa anak yang marah-marah masih perlu belajar setiap hari?",
  },
  "khonghucu-1-bab2": {
    judul: "Xiao di rumah",
    kepala: ["Laku", "Arti", "Contoh"],
    baris: [
      ["Xiao", "Laku bakti", "Bawa piring tanpa diminta"],
      ["Ti", "Kasih saudara", "Jangan berebut mainan"],
      ["Junzi kecil", "Mandiri dan patuh", "Rapikan sepatu, dengar nasihat"],
    ],
    hots: "Mengapa tidur larut main game belum termasuk anak yang berbakti?",
  },
  "khonghucu-1-bab3": {
    judul: "Keteladanan Nabi Kongzi",
    kepala: ["Teladan", "Arti", "Sikap kita"],
    baris: [
      ["Kongzi", "Utusan Tian, guru agung", "Hidup sopan dan penuh kasih"],
      ["Hao Xue", "Suka belajar", "Berani bertanya jika belum paham"],
      ["Xiu Shen", "Memperbaiki diri", "Main adil, jangan egois"],
    ],
    hots: "Mengapa Nabi Kongzi kecil tidak malas bertanya tentang hal yang baik?",
  },
  "khonghucu-1-bab4": {
    judul: "Shu, Tepasal",
    kepala: ["Ajaran", "Arti", "Contoh"],
    baris: [
      ["Shu", "Tepasal, tenggang rasa", "Bayangkan perasaan Made"],
      ["Hukum emas", "Jangan berikan yang tidak diinginkan", "Jangan ejek sepatu lama"],
      ["Aksi rukun", "Tolong dan minta izin", "Bantu lap kuah Joko"],
    ],
    hots: "Mengapa meminjam mainan tanpa izin tetap salah meskipun akan dikembalikan?",
  },
};

export default function NaskahKhonghucu1({
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
          subjudul={`PA Khonghucu · ${modul.judul}`}
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
