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
        folder="doodle-katolik"
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
      <Latar anak="Latar: di taman sekolah. Ali dan Nia melihat bayangan mereka di air kolam yang jernih." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, coba lihat. Di dalam air, wajah kita kelihatan jelas sekali. Wajahku rambutnya pendek, wajahmu dikuncir dua. Kita sangat berbeda.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Iya, Ali! Kata suster di sekolah minggu, Allah menciptakan kita masing-masing secara istimewa. Tidak ada manusia yang kembar identik sama persis di dunia ini.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Hmm, kalau kita semua unik dan istimewa, kenapa kadang-kadang ada anak yang suka mengejek temannya yang bertubuh pendek atau berkulit gelap ya, Nia?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Itu karena mereka belum tahu, Ali. Setiap orang adalah Citra Allah—seperti cermin yang memantulkan kebaikan Tuhan. Kalau kita mengejek ciptaan-Nya, berarti kita tidak menghormati Tuhan yang memahat mereka dengan cinta!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di ruang keluarga. Nia membantu ibunya menyalakan lilin di depan patung Bunda Maria dan Tuhan Yesus sebelum doa malam." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ibu, aku senang sekali kalau kita berdoa bersama seperti ini. Rasanya rumah kita menjadi sangat damai.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ibu" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Betul, Nia. Rumah kita ini adalah Gereja Domestik, artinya Gereja kecil di mana Tuhan Yesus tinggal bersama keluarga kita.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Ibu, dulu Keluarga Kudus Nazaret—Tuhan Yesus, Bunda Maria, dan Santo Yosef—apakah mereka juga suka berdoa dan bekerja sama di rumah?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ibu" warna="border-[#15803D]/20 bg-[#F0FDF4]">
        <p>Tentu, Ali. Yesus kecil sangat taat membantu Santo Yosef pertukangan dan mendengarkan Bunda Maria. Keluarga kita meniru teladan suci mereka dengan saling menolong tanpa bertengkar.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: halaman sekolah Katolik yang hijau. Ibu Guru bercerita tentang Santo Fransiskus Asisi, pelindung lingkungan." />
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ali, Ibu Guru tadi bercerita tentang Santo Fransiskus Asisi yang memanggil matahari sebagai Saudara dan bulan sebagai Saudari. Indah sekali ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Iya, Nia! Karena seluruh alam semesta, hewan, dan tumbuhan adalah ciptaan Allah yang satu, jadi mereka semua adalah saudara kita yang harus dilindungi.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Tapi lihat, selokan di dekat kantin tersumbat botol plastik. Pasti bumi kita sedang menangis kesakitan.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Benar! Tuhan mempercayakan alam ini kepada kita untuk dijaga, bukan dirusak. Ayo kita ambil botolnya dan buang ke tempat sampah daur ulang!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di kelas jam istirahat. Made melihat anak dari kelas lain terjatuh, lututnya berdarah. Beberapa anak hanya lewat." />
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat anak itu! Dia kesakitan. Tapi dia bukan teman sekelas kita, dan sukunya juga berbeda. Apakah kita harus menolongnya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Made, ingat cerita Tuhan Yesus tentang Orang Samaria yang Murah Hati? Orang Samaria itu mau menolong orang yang terluka tanpa melihat latar belakang atau agamanya.</p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Ah, aku ingat! Yesus mengajarkan bahwa sesama kita adalah siapa saja yang membutuhkan pertolongan kita, tanpa membeda-bedakan!</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Tepat! Mari kita hampiri dia dan antarkan ke ruang UKS sekolah sekarang.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "katolik-1-bab1") return <DialogBab1 />;
  if (modulId === "katolik-1-bab2") return <DialogBab2 />;
  if (modulId === "katolik-1-bab3") return <DialogBab3 />;
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
        soal={'Dalam pelajaran agama, kita belajar bahwa manusia adalah Citra Allah. Arti dari "Citra Allah" yang paling tepat untuk kehidupan sehari-hari di kelas 1 adalah...'}
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Wajah kita harus selalu digambar di kertas agar mirip dengan Tuhan.",
          },
          {
            huruf: "B",
            teks: "Diri kita dan sesama manusia adalah gambaran Allah yang mulia, sehingga kita wajib saling menghormati dan menyayangi.",
          },
          {
            huruf: "C",
            teks: "Kita hanya perlu berteman dengan anak yang berwajah mirip dengan kita saja.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Saat bermain di halaman, kaki Made tidak sengaja mengenai lumpur hingga kotor. Tindakan bersyukur atas tubuh yang ditunjukkan Made adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Membiarkan lumpur itu mengering sampai besok karena malas membersihkannya.",
          },
          {
            huruf: "B",
            teks: "Segera pergi ke wastafel untuk mencuci kakinya dengan air bersih sebagai tanda merawat tubuh pemberian Allah.",
          },
          {
            huruf: "C",
            teks: "Menangis keras dan meminta temannya yang membersihkan.",
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
        soal="Setiap malam pukul 19.00, Ayah mengajak semua anggota keluarga berkumpul untuk berdoa rosario bersama. Sikapmu sebagai anak yang meneladani Yesus kecil di Nazaret adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Meminta izin untuk terus menonton televisi atau bermain game saja.",
          },
          {
            huruf: "B",
            teks: "Langsung merapikan mainan, mematikan televisi, dan ikut berdoa dengan sikap batin yang sopan dan khusyuk.",
          },
          {
            huruf: "C",
            teks: "Ikut duduk bersama keluarga tetapi sambil berteriak dan bercanda di depan altar.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 1)}
        soal="Tugas membersihkan rumah dan mencuci piring adalah tugas Ibu saja, anak-anak tidak perlu ikut membantu."
        benar="salah"
        alasanBenar="keluarga saling menolong seperti Keluarga Kudus Nazaret, anak juga membantu di rumah"
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
        soal="Tuhan menciptakan bumi dan isinya yang sangat baik (Bdk. Kejadian 1). Tindakan yang mencerminkan anak Katolik yang bertanggung jawab merawat bumi di sekolah adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Membiarkan air keran toilet tetap mengalir deras walau sudah tidak digunakan lagi.",
          },
          {
            huruf: "B",
            teks: "Merawat tanaman kelas dengan menyiramnya secara teratur dan membuang sampah pada tempatnya agar lingkungan tetap asri.",
          },
          {
            huruf: "C",
            teks: "Menginjak-injak tanaman bunga yang baru ditanam oleh bapak tukang kebun.",
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
        soal="Ketika ada seorang teman yang sering menjahili kita di kelas meminta maaf karena pensilnya patah dan ingin meminjam pensil cadanganmu, sikap Kristiani yang paling tepat kamu lakukan adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menolaknya dengan kasar sebagai balasan karena dia pernah menjahili kita.",
          },
          {
            huruf: "B",
            teks: "Memaafkan kesalahannya dengan tulus dan meminjamkannya pensil dengan sukacita seperti ajaran Yesus untuk mengasihi sesama.",
          },
          {
            huruf: "C",
            teks: "Melaporkannya ke kepala sekolah agar dia dihukum.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Isian singkat kausalitas iman
      </h5>
      <KuisIsian
        id={idEval(modulId, 1)}
        soal="Sebelum berdoa atau memberikan persembahan di altar, jika kita ingat ada kesalahan atau pertengkaran dengan teman, kita harus terlebih dahulu ................................... dengan teman tersebut."
        alias={["berdamai", "maaf", "memaafkan"]}
      />
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Orang Samaria yang murah hati menolong orang yang terluka karena di dalam hatinya penuh dengan rasa ................................... yang diajarkan oleh Allah."
        alias={["belas", "kasih", "iba", "belas kasih"]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "katolik-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "katolik-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "katolik-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "katolik-1-bab1": {
    judul: "Citra Allah yang istimewa",
    kepala: ["Ayat", "Arti", "Sikap"],
    baris: [
      ["Kejadian 1:26-27", "Secitra dengan Allah", "Hormati setiap wajah"],
      ["Matius 25:40", "Kristus dalam sesama", "Tolak perundungan"],
      ["Tubuh kudus", "Pemberian yang dirawat", "Cuci, sehat, syukur"],
    ],
    hots: "Kalau kita mengejek ciptaan Allah, siapa yang tidak kita hormati?",
  },
  "katolik-1-bab2": {
    judul: "Gereja Domestik",
    kepala: ["Teladan", "Arti", "Tindakan"],
    baris: [
      ["Keluarga Kudus", "Yesus, Maria, Yosef", "Doa dan kerja bersama"],
      ["Gereja kecil", "Yesus tinggal di rumah", "Tanda salib, Bapa Kami"],
      ["Perintah ke-4", "Hormati orang tua", "Rosario khusyuk, bantu piring"],
    ],
    hots: "Mengapa cuci piring bukan tugas Ibu saja di Gereja Domestik?",
  },
  "katolik-1-bab3": {
    judul: "Rumah Kita Bersama",
    kepala: ["Ajaran", "Arti", "Aksi kecil"],
    baris: [
      ["Fransiskus Asisi", "Alam adalah saudara", "Lindungi, jangan rusak"],
      ["Laudato Si'", "Kita penjaga, bukan pemilik", "Hemat air, pilah sampah"],
      ["Kejadian 1", "Ciptaan sangat baik", "Siram tanaman, bak daur ulang"],
    ],
    hots: "Jika selokan penuh botol, apa yang bisa kita lakukan hari ini?",
  },
  "katolik-1-bab4": {
    judul: "Sahabat bagi semua",
    kepala: ["Ayat", "Arti", "Contoh"],
    baris: [
      ["Lukas 10:25-37", "Sesama = yang membutuhkan", "Antar ke UKS"],
      ["Fratelli Tutti", "Persaudaraan universal", "Maafkan, pinjamkan pensil"],
      ["Sebelum altar", "Berdamai lebih dulu", "Belas kasih Samaria"],
    ],
    hots: "Mengapa menolong anak dari kelas dan suku lain tetap termasuk kasih Yesus?",
  },
};

export default function NaskahKatolik1({
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
          subjudul={`PA Katolik · ${modul.judul}`}
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
