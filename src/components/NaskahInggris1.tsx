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
            Think and speak
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
            {indeks === 0 ? "School · For the teacher" : "Home · For parents"}
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
                pesanSalah="Coba hubungkan dengan jawaban yang cocok."
              />
            </div>
          </article>
        );
      })}
    </div>
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
      <Latar anak="Setting: in front of the new classroom. Ali meets a new student named Joshua." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Hello! I am Ali. What is your name?</p>
      </GelembungTutur>
      <GelembungTutur nama="Joshua" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Hi, Ali! My name is Joshua. Nice to meet you.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nice to meet you too, Joshua. How are you today?</p>
      </GelembungTutur>
      <GelembungTutur nama="Joshua" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>I am fine, thank you. And you?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>I am happy! Let&apos;s enter the classroom together.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Setting: inside the classroom during drawing time. Nia is looking for her pencil." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ali, I cannot find my pencil. Do you see it?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Oh, look at your desk, Nia. Is that a pencil?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>No, that is a pen. My pencil is wood, not plastic.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Ah, I see! Your pencil is inside the pencil case, under the book!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Thank you, Ali! Now I can draw again.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Setting: in the school library. Joshua is arranging some books on the desk." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Joshua, you have a lot of books on the desk. Let&apos;s count them.</p>
      </GelembungTutur>
      <GelembungTutur nama="Joshua" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Okay, Nia! One, two, three, four, five, six, seven!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wow, seven books! Look at the empty shelf. How many books are there?</p>
      </GelembungTutur>
      <GelembungTutur nama="Joshua" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>There are zero books on the shelf. It is completely empty!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Setting: in the school garden at midday." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, look at the sky! The sun is so bright. What color is the sun?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>The sun is yellow, Ali. And look at the grass, it is green.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wow, nature is beautiful! My shoes are black, and your shoes are white.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Yes! Colors make our world beautiful and not boring.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "inggris-1-bab1") return <DialogBab1 />;
  if (modulId === "inggris-1-bab2") return <DialogBab2 />;
  if (modulId === "inggris-1-bab3") return <DialogBab3 />;
  return <DialogBab4 />;
}

function EvaluasiBab1({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Group A: Multiple choice (HOTS)
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="It is 07.00 AM (pagi hari). You meet your teacher at the school gate. What is the most polite greeting to say?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Good afternoon, Teacher!" },
          { huruf: "B", teks: "Good morning, Teacher!" },
          { huruf: "C", teks: "Good bye, Teacher!" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal={'Joshua introduces himself: "Hello, I am Joshua. I am a student." What does Joshua want to do?'}
        benar="B"
        pilihan={[
          { huruf: "A", teks: "He wants to say sorry." },
          {
            huruf: "B",
            teks: "He wants to make a new friend by sharing his identity.",
          },
          { huruf: "C", teks: "He wants to go home." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Group B: Matching line
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={2}
        kiri={["What is your name?", "How are you?", "See you later!"]}
        kanan={["Good bye!", "My name is Nia.", "I am fine, thank you."]}
        kunci={{
          "What is your name?": "My name is Nia.",
          "How are you?": "I am fine, thank you.",
          "See you later!": "Good bye!",
        }}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Group A: Analytical context
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="You want to clean the wrong writing on your book. What object do you need?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "A ruler" },
          { huruf: "B", teks: "An eraser" },
          { huruf: "C", teks: "A pencil case" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal={'Ali says: "This is my bag." The word "This" means the bag is...'}
        benar="A"
        pilihan={[
          { huruf: "A", teks: "Near Ali (close to his hand)." },
          { huruf: "B", teks: "Very far away on the tree." },
          { huruf: "C", teks: "In another classroom." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Group A: Critical counting
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ali has three apples. Nia gives him two more apples. How many apples does Ali have now?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Four apples" },
          { huruf: "B", teks: "Five apples" },
          { huruf: "C", teks: "Six apples" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Look at this group of objects: ✏️ ✏️ ✏️ ✏️. The correct phrase is..."
        benar="A"
        pilihan={[
          { huruf: "A", teks: "Four pencils" },
          { huruf: "B", teks: "Four pencil" },
          { huruf: "C", teks: "One pencil" },
        ]}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Group A: Logic and colors
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal={'Complete this natural sentence: "The sky on a sunny day is usually ........, and the cloud is white."'}
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Red" },
          { huruf: "B", teks: "Blue" },
          { huruf: "C", teks: "Black" },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="You mix red paint and yellow paint together. What new color do you get?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Green" },
          { huruf: "B", teks: "Orange" },
          { huruf: "C", teks: "Purple" },
        ]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "inggris-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "inggris-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "inggris-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "inggris-1-bab1": {
    judul: "Greetings and introduction",
    kepala: ["English", "Meaning", "When"],
    baris: [
      ["Good morning", "Selamat pagi", "In the morning"],
      ["Good afternoon", "Selamat siang/sore", "Later in the day"],
      ["My name is...", "Nama saya...", "To introduce yourself"],
    ],
    hots: "Why should we smile and greet a new friend kindly?",
  },
  "inggris-1-bab2": {
    judul: "Classroom objects",
    kepala: ["English", "Meaning", "Sentence"],
    baris: [
      ["Book / pencil", "Buku / pensil", "This is a book."],
      ["Eraser / ruler", "Penghapus / penggaris", "I need an eraser."],
      ["Bag / desk", "Tas / meja tulis", "That is a desk."],
    ],
    hots: "When do we say this, and when do we say that?",
  },
  "inggris-1-bab3": {
    judul: "Numbers 1 to 10",
    kepala: ["Number", "Word", "Remember"],
    baris: [
      ["1–5", "One to five", "One book"],
      ["6–10", "Six to ten", "Seven books"],
      ["0", "Zero", "The shelf is empty"],
    ],
    hots: "Why do we say four pencils, not four pencil?",
  },
  "inggris-1-bab4": {
    judul: "Rainbow colors",
    kepala: ["Color", "Meaning", "Phrase"],
    baris: [
      ["Red / blue", "Merah / biru", "A red balloon"],
      ["Green / yellow", "Hijau / kuning", "The sun is yellow"],
      ["Black / white", "Hitam / putih", "A white cloud"],
    ],
    hots: "Red paint plus yellow paint makes what color?",
  },
};

const EMOJI: Record<string, Record<string, string>> = {
  A: {
    "inggris-1-bab1": "🙋‍♂️👋",
    "inggris-1-bab2": "🎒✏️",
    "inggris-1-bab3": "🔢📚",
    "inggris-1-bab4": "🎨☀️",
  },
  B: {
    "inggris-1-bab1": "🌅💬",
    "inggris-1-bab2": "📘📏",
    "inggris-1-bab3": "1️⃣🔟",
    "inggris-1-bab4": "🌈🪑",
  },
  C: {
    "inggris-1-bab1": "🏫🏠",
    "inggris-1-bab2": "🏫🏠",
    "inggris-1-bab3": "🏫🏠",
    "inggris-1-bab4": "🏫🏠",
  },
  D: {
    "inggris-1-bab1": "📝🤝",
    "inggris-1-bab2": "📝🎒",
    "inggris-1-bab3": "📝🔢",
    "inggris-1-bab4": "📝🎨",
  },
};

export default function NaskahInggris1({
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
          subjudul={`Bahasa Inggris · ${modul.judul}`}
        />
        <EvaluasiBab modul={modul} />
        <KuisTulisKartu
          id={idKuisTulisKartu(modul.id, "D")}
          pertanyaan="Tuliskan satu jawaban dari lembar evaluasi unit ini."
          alias={aliasTulisD}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
