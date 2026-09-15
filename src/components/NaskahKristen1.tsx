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
        folder="doodle-kristen"
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
      <Latar anak="Latar: di taman sekolah. Nia bercermin melihat wajahnya, lalu menghampiri Made." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Made, coba lihat rambutku berombak dan mataku bulat. Sedangkan rambutmu lurus sekali. Kenapa Tuhan tidak membuat kita semua berwajah sama ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Kalau kita semua berwajah sama, nanti Ibu Guru bingung memanggil kita di kelas, Nia! Lagipula, kata Alkitab, Tuhan membentuk kita satu per satu di rahim ibu dengan sangat luar biasa.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, berarti tidak ada seorang pun di dunia ini yang persis seperti aku atau seperti kamu?</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Betul, Nia! Setiap anak adalah karya seni Tuhan yang unik. Karena kita unik, kita berharga di mata Tuhan. Jadi kita harus bersyukur dan menjaga tubuh kita dengan baik!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di ruang makan rumah Ali. Ali dibantu ibunya merapikan buku pelajaran." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Ibu, terima kasih ya sudah memasak makanan yang enak dan membantuku belajar setiap malam.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ibu" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Sama-sama, Sayang. Tuhan menitipkan Ali di dalam keluarga ini agar Ayah dan Ibu bisa menjaga dan mengasihi Ali dengan tulus.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Lalu, bagaimana cara Ali membalas kebaikan Tuhan yang sudah memberikan orang tua yang hebat seperti Ayah dan Ibu?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ibu" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Dengan menjadi anak yang taat, Ali. Mendengarkan nasihat orang tua dan suka membantu di rumah dengan sukacita sudah membuat hati Tuhan dan orang tua senang.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di kebun sekolah yang dipenuhi bunga mekar dan burung-burung berkicau." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Lihat burung-burung kecil itu, Ali! Mereka tidak menanam padi, tapi setiap hari selalu bisa makan dan bernyanyi riang.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Iya, Nia. Itu karena Tuhan Yesus yang memelihara mereka melalui alam yang menyediakan nektar bunga dan ulat kecil.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, Tuhan baik sekali ya! Alam ini menyediakan semua yang dibutuhkan makhluk hidup. Tapi lihat, di sebelah sana ada tanaman yang layu karena tidak pernah disiram.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Tuhan menciptakan alam, tetapi Tuhan memberikan tugas kepada kita sebagai manusia untuk menjaga dan merawatnya. Ayo kita ambil air dan menyiramnya!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di area kantin sekolah saat jam istirahat. Made melihat teman yang bekalnya tertinggal dan tampak lapar." />
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat Tono. Dia duduk sendirian sambil memandangi kita makan. Sepertinya bekalnya tertinggal.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Oh kasihan sekali. Tapi kue donatku ini juga hanya ada dua buah, Made. Kalau aku berikan satu, nanti aku kurang kenyang.</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, ingat cerita Tuhan Yesus yang memberi makan lima ribu orang hanya dengan lima roti dan dua ikan? Tuhan Yesus mengajarkan kita untuk rela berbagi dengan apa yang ada pada kita. Mari kita bagi setengah milikku dan setengah milikmu untuk Tono.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Kamu benar, Made. Berbagi tidak akan membuat kita kekurangan, tetapi membuat hati orang lain bersukacita!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "kristen-1-bab1") return <DialogBab1 />;
  if (modulId === "kristen-1-bab2") return <DialogBab2 />;
  if (modulId === "kristen-1-bab3") return <DialogBab3 />;
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
        soal="Ketika melihat ada seorang teman baru di kelas yang memiliki warna kulit yang berbeda dan rambut yang sangat keriting, sikap terbaik kita sebagai anak Tuhan yang menghargai ciptaan-Nya adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menjauhi teman tersebut karena fisiknya tidak sama dengan kita.",
          },
          {
            huruf: "B",
            teks: "Menyapa dengan senyuman yang ramah, mengajaknya berkenalan, dan berteman tanpa membeda-bedakan.",
          },
          {
            huruf: "C",
            teks: "Menertawakan bentuk rambutnya bersama teman-teman yang lain.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa merawat kebersihan anggota tubuh kita sendiri seperti rajin mencuci tangan dan memotong kuku dikategorikan sebagai wujud ibadah yang sejati kepada Allah?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Karena Tuhan menyukai anak-anak yang memakai baju mahal.",
          },
          {
            huruf: "B",
            teks: "Sebagai bentuk rasa hormat dan syukur kita kepada Allah karena telah menjaga dan memberikan tubuh yang sehat serta utuh.",
          },
          {
            huruf: "C",
            teks: "Supaya kita dipuji oleh teman-teman di sekolah.",
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
        Kelompok A: Pilihan ganda kasus ketaatan
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Setelah selesai bermain mainan balok di ruang tamu, Ibu meminta tolong kepadamu untuk segera merapikannya kembali ke dalam kotak. Tindakan anak yang taat dan mengasihi keluarganya adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Pura-pura tidak mendengar lalu pergi tidur ke kamar.",
          },
          {
            huruf: "B",
            teks: "Langsung merapikan mainan tersebut dengan sukacita tanpa mengeluh.",
          },
          {
            huruf: "C",
            teks: "Meminta Ibu memberikan uang jajan terlebih dahulu baru mau merapikannya.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 1)}
        soal="Kita hanya perlu menghormati dan mendengarkan nasihat orang tua saat mereka membelikan kita mainan baru saja."
        benar="salah"
        alasanBenar="menghormati orang tua adalah perintah Tuhan setiap hari, bukan hanya saat ada mainan"
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda etika lingkungan
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Sebagai anak yang diberikan tugas oleh Tuhan untuk menjaga bumi, tindakan kecil apa yang bisa kamu lakukan di lingkungan sekolah untuk memelihara ciptaan-Nya?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Memetik bunga-bunga di taman untuk dijadikan mainan lalu dibuang.",
          },
          {
            huruf: "B",
            teks: "Membuang sampah plastik jajanan ke dalam tempat sampah dan ikut menyiram tanaman kelas.",
          },
          {
            huruf: "C",
            teks: "Mengejar dan melempar batu ke arah burung yang sedang bertengger di pohon.",
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
        Kelompok A: Studi kasus sosial
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Saat jam pulang sekolah hujan turun sangat deras. Kamu membawa payung yang lebar. Kamu melihat teman sekelasmu berdiri kebingungan di depan kelas karena tidak membawa payung dan tidak ada yang menjemput. Tindakan yang mencerminkan Hukum Kasih Allah adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Berlari pulang dengan cepat agar tidak kehujanan sendirian.",
          },
          {
            huruf: "B",
            teks: "Mengajak teman tersebut untuk bernaung di bawah payungmu bersama-sama sambil berjalan pulang dengan aman.",
          },
          {
            huruf: "C",
            teks: "Mengejeknya karena dia lupa membawa payung dari rumah.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Isian singkat kausalitas iman
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="Ketika kita rela berbagi mainan atau makanan kepada teman yang sedang membutuhkan, kita sedang memancarkan sinar kasih ................................... di dalam dunia ini."
        alias={["tuhan", "yesus", "allah"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Alasan utama kita harus mengasihi semua orang, bahkan orang yang menjengkelkan sekalipun, adalah karena Allah telah lebih dahulu ................................... kita."
        alias={["mengasihi", "kasih"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "kristen-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "kristen-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "kristen-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "kristen-1-bab1": {
    judul: "Aku unik, aku berharga",
    kepala: ["Ayat", "Arti", "Sikap"],
    baris: [
      ["Kejadian 1:27", "Gambar dan rupa Allah", "Hormati setiap wajah"],
      ["Mazmur 139:14", "Dibentuk luar biasa", "Tidak ada yang gagal"],
      ["Tubuh titipan", "Bait Allah yang dijaga", "Bersih, sehat, ramah"],
    ],
    hots: "Kalau Tuhan membuat kita semua berwajah sama, apa yang hilang?",
  },
  "kristen-1-bab2": {
    judul: "Keluarga titipan Tuhan",
    kepala: ["Peran", "Ayat", "Tindakan"],
    baris: [
      ["Orang tua", "Menjaga dan mengasihi", "Masak, menemani belajar"],
      ["Anak", "Efesus 6:1-3", "Taat, dengar, bantu"],
      ["Hormat", "Hukum Taurat ke-5", "Setiap hari, bukan saat hadiah"],
    ],
    hots: "Mengapa merapikan balok tanpa mengeluh menyenangkan hati Tuhan?",
  },
  "kristen-1-bab3": {
    judul: "Penatalayan bumi",
    kepala: ["Tugas", "Ayat", "Contoh kecil"],
    baris: [
      ["Memelihara", "Kejadian 1:28; 2:15", "Siram tanaman layu"],
      ["Jangan merusak", "Karya seni Allah", "Jangan lempar batu ke burung"],
      ["Kasih sesama", "Lingkungan bersih", "Sampah ke tempatnya"],
    ],
    hots: "Jika semua memetik bunga lalu membuangnya, apa yang terjadi minggu depan?",
  },
  "kristen-1-bab4": {
    judul: "Kasih yang berbuat",
    kepala: ["Ayat", "Arti", "Contoh"],
    baris: [
      ["Matius 22:39", "Kasihi sesama seperti diri", "Payung dipakai bersama"],
      ["1 Yohanes 3:18", "Bukan hanya di bibir", "Bagi bekal dan mainan"],
      ["Allah mengasihi dulu", "Akar kasih kita", "Bahkan yang menjengkelkan"],
    ],
    hots: "Mengapa berbagi dua donat tidak membuat kita kekurangan di mata Tuhan?",
  },
};

export default function NaskahKristen1({
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
          subjudul={`PA Kristen · ${modul.judul}`}
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
