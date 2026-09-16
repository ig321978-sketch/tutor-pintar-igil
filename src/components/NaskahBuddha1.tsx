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
        folder="doodle-buddha"
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
      <Latar anak="Latar: di taman sekolah. Nia mengamati bunga yang mekar, lalu menghampiri Made yang melihat barisan semut di pohon." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Made, lihat deh bunga-bunga ini. Warnanya indah sekali dan tumbuh subur. Mengapa alam ini bisa menyediakan tempat yang begitu indah untuk kita ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Itu karena Hukum Kamma (Perbuatan), Nia. Alam sekitar dan diri kita menjadi indah jika dirawat dengan perbuatan baik. Semua makhluk hidup, bahkan semut kecil ini, ingin hidup dengan tenang dan bahagia.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Hmm, kalau ada teman yang sengaja menginjak barisan semut itu karena menganggap mereka hanya hewan kecil yang mengganggu, bagaimana, Made?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Itu tindakan yang kurang bijaksana, Nia. Di dalam agama Buddha, kita belajar tentang Metta (cinta kasih) kepada semua makhluk tanpa terkecuali. Menyakiti makhluk lain akan menanam Kamma buruk yang bisa membawa ketidakbahagiaan bagi diri sendiri kelak.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di dalam kelas saat jam cerita bersama Ibu Guru." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Made, kemarin Ibu Guru bercerita tentang Pangeran Siddharta saat masih anak-anak. Beliau sangat menyayangi hewan ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Iya, Ali! Ada kisah terkenal saat sepupu beliau, Pangeran Devadatta, memanah seekor angsa putih sampai terluka dan jatuh ke tanah.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Lalu apa yang dilakukan Pangeran Siddharta?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Pangeran Siddharta langsung memeluk angsa itu, mencabut anak panahnya, dan mengobati lukanya dengan penuh kasih sayang. Beliau mengatakan bahwa makhluk hidup adalah milik mereka yang menyelamatkannya dan menyayanginya, bukan milik mereka yang ingin merusaknya.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di ruang puja bakti sekolah. Siswa duduk bersila dengan mata terpejam lembut sebelum pelajaran dimulai." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Made, tadi sebelum belajar kita duduk diam dan memperhatikan napas selama beberapa menit. Kepalaku yang tadinya pusing karena berlarian jadi terasa segar dan tenang sekali.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Itu namanya latihan Meditasi (Bhavana) atau melatih kesadaran (Sati), Ali. Kita belajar menyadari napas masuk dan napas keluar.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Kenapa kita harus melatih ketenangan seperti ini setiap hari, Nia?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Supaya pikiran kita tidak melompat-lompat seperti monyet. Kalau pikiran kita tenang, kita bisa mendengarkan penjelasan Ibu Guru dengan baik dan tidak mudah marah jika ada teman yang menjahili kita.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di vihara saat perayaan hari besar. Nia melihat Made memasukkan uang saku ke kotak dana dengan wajah tersenyum." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Made, kamu memasukkan uang jajarmu ke kotak itu. Apakah kamu tidak rugi karena uangmu jadi berkurang untuk membeli es krim?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Tidak sama sekali, Nia! Ini namanya mempraktikkan Dana (berderma atau memberi dengan ikhlas). Memberi dengan hati yang gembira membantu mengikis sifat serakah dan pelit di dalam hati kita.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Oh, berarti berdana itu tidak membuat kita miskin ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Betul, Nia! Kebaikan yang kita berikan seperti menanam benih buah yang manis. Dan berdana itu tidak harus selalu pakai uang, lho. Membantu membersihkan vihara atau membagikan senyuman ramah juga adalah dana yang luhur!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "buddha-1-bab1") return <DialogBab1 />;
  if (modulId === "buddha-1-bab2") return <DialogBab2 />;
  if (modulId === "buddha-1-bab3") return <DialogBab3 />;
  return <DialogBab4 />;
}

function EvaluasiBab1({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda analisis
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ketika sedang bermain di taman, kamu melihat seekor burung kecil jatuh dari sarangnya dan sayapnya terluka. Tindakan yang mencerminkan sifat Karuna (belas kasih) adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Membiarkannya saja karena burung itu bukan hewan peliharaanmu.",
          },
          {
            huruf: "B",
            teks: "Mengangkatnya dengan hati-hati, menaruhnya di tempat aman, dan meminta bantuan guru/orang tua untuk mengobatinya.",
          },
          {
            huruf: "C",
            teks: "Mengambil burung tersebut untuk dijadikan mainan di dalam kelas.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal={'Mengapa umat Buddha selalu mendoakan agar "Semua makhluk hidup berbahagia" saat selesai berdoa atau bermeditasi?'}
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Karena doa tersebut bisa membuat kita mendapatkan hadiah mainan baru.",
          },
          {
            huruf: "B",
            teks: "Sebagai wujud pancaran cinta kasih (Metta) yang tulus agar kedamaian tercipta di seluruh dunia untuk semua makhluk, baik yang besar maupun kecil.",
          },
          {
            huruf: "C",
            teks: "Supaya hari cepat sore dan bisa segera pulang.",
          },
        ]}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda kasus keteladanan
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Pangeran Devadatta memanah angsa karena ingin memburunya, sedangkan Pangeran Siddharta menyelamatkannya karena menghargai kehidupan. Sikap Pangeran Siddharta mengajarkan kita untuk menjadi anak yang..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Suka membalas dendam kepada orang lain.",
          },
          {
            huruf: "B",
            teks: "Memiliki hati yang lembut, penyayang, dan berani melindungi makhluk yang lemah.",
          },
          {
            huruf: "C",
            teks: "Takut dan bersembunyi saat melihat masalah.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 1)}
        soal="Meneladani Pangeran Siddharta berarti kita hanya perlu menyayangi hewan yang lucu dan bagus saja."
        benar="salah"
        alasanBenar="semua makhluk punya hak hidup seperti angsa yang terluka, bukan hanya yang lucu"
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda manajemen pikiran
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Saat sedang mengerjakan soal latihan di kelas, tiba-tiba pensil Ali patah. Ali mulai merasa kesal dan ingin marah. Tindakan melatih kesadaran yang paling tepat dilakukan Ali adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Berteriak keras agar seluruh kelas tahu kalau pensilnya patah.",
          },
          {
            huruf: "B",
            teks: "Menarik napas dalam-dalam dengan sadar untuk menenangkan pikiran, lalu meminjam rautan pensil dengan bahasa yang sopan kepada teman.",
          },
          {
            huruf: "C",
            teks: "Melempar pensil tersebut ke lantai sampai hancur.",
          },
        ]}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Studi kasus kedermawanan
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ketika jam istirahat, kamu melihat seorang teman tidak sengaja menumpahkan air minumnya ke lantai koridor hingga licin. Tindakan berdana dalam bentuk jasa (Abhaya Dana) yang tepat adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menertawakannya dan melewatinya dengan berlari agar tidak ikut basah.",
          },
          {
            huruf: "B",
            teks: "Mengambil alat pel sekolah bersama-sama untuk membersihkan lantai tersebut agar tidak ada orang lain yang terpeleset jatuh.",
          },
          {
            huruf: "C",
            teks: "Membiarkannya saja karena itu bukan kesalahanmu.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Isian singkat kausalitas kamma
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="Syarat utama agar perbuatan berdana kita membuahkan kebahagiaan yang besar adalah kita harus memberikannya dengan hati yang ................................... dan tanpa pamrih."
        alias={["gembira", "ikhlas", "tulus"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Melatih diri untuk rajin menyisihkan sebagian milik kita untuk membantu orang yang kesusahan dapat menjauhkan kita dari sifat ................................... atau kikir."
        alias={["serakah", "pelit", "kikir"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "buddha-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "buddha-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "buddha-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "buddha-1-bab1": {
    judul: "Metta dan Karuna",
    kepala: ["Ajaran", "Arti", "Sikap"],
    baris: [
      ["Metta", "Semua makhluk berbahagia", "Jangan injak semut"],
      ["Karuna", "Meringankan penderitaan", "Tolong burung terluka"],
      ["Sila ke-1", "Jangan menyakiti yang hidup", "Kalau tak ingin sakit, jangan sakiti"],
    ],
    hots: "Jika teman hendak menginjak semut, apa yang kita ucapkan?",
  },
  "buddha-1-bab2": {
    judul: "Teladan Siddharta kecil",
    kepala: ["Kisah", "Arti", "Tindakan"],
    baris: [
      ["Devadatta", "Memanah angsa", "Jangan merusak hidup"],
      ["Siddharta", "Menyelamatkan dan mengobati", "Lindungi yang lemah"],
      ["Hak hidup", "Milik yang menyayangi", "Sayangi semua, bukan hanya yang lucu"],
    ],
    hots: "Mengapa angsa milik yang merawat, bukan yang memanah?",
  },
  "buddha-1-bab3": {
    judul: "Sati dan napas",
    kepala: ["Latihan", "Arti", "Manfaat"],
    baris: [
      ["Anapanasati", "Sadari napas masuk-keluar", "1–3 menit, tanpa paksaan"],
      ["Sati", "Kesadaran penuh", "Pikiran tidak seperti monyet"],
      ["Samadhi & Panna", "Tenang dan bijak", "Napas dulu, baru bicara sopan"],
    ],
    hots: "Jika pensil patah dan ingin marah, apa yang dilakukan lebih dulu?",
  },
  "buddha-1-bab4": {
    judul: "Tiga macam dana",
    kepala: ["Jenis", "Arti", "Contoh"],
    baris: [
      ["Amisa Dana", "Memberi barang", "Uang saku ke kotak dana"],
      ["Abhaya Dana", "Memberi rasa aman", "Pel lantai licin bersama"],
      ["Dhamma Dana", "Memberi pengetahuan", "Ajar teman dengan sabar"],
    ],
    hots: "Mengapa berdana dengan hati gembira lebih berbuah daripada memberi terpaksa?",
  },
};

export default function NaskahBuddha1({
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
          subjudul={`PA Buddha · ${modul.judul}`}
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
