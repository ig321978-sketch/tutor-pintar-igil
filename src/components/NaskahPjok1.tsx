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
        folder="doodle-pjok"
        alt={`Ilustrasi ${kartu.judul}`}
      />
      <h4 className="text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
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
    const cukup = pilih === benar && alasan.trim().length >= 6;
    const ok =
      pilih === benar &&
      alasan
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .some((kata) => alasanBenar.toLowerCase().includes(kata) && kata.length > 3);
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
                pesanSalah="Coba hubungkan dengan gerakan yang cocok."
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
      <Latar anak="Latar: di lapangan sekolah yang luas sebelum pelajaran PJOK. Ali dan Nia pemanasan ringan." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat kanguru dan kelinci di TV kemarin! Mereka berpindah tempat dengan cara melompat tinggi sekali.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Iya, Ali! Kita sebagai manusia juga hebat, lho. Kita bisa berpindah tempat dengan banyak cara, seperti berjalan, berlari, dan melompat.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Hmm, coba bayangkan jika kita berjalan tetapi kaki kita tidak diangkat tinggi, apa yang akan terjadi?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, kita pasti mudah tersandung batu dan terjatuh, Ali! Makanya, saat berjalan atau berlari, tubuh dan pandangan mata kita harus selalu fokus melihat ke arah depan.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di dalam gedung olahraga sekolah. Nia berdiri satu kaki seperti burung bangau." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, kamu sedang apa? Kok diam seperti patung dan tidak berpindah tempat sama sekali?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Aku sedang melatih Gerak Non-Lokomotor, Ali. Ini namanya gerakan keseimbangan bangau. Tubuhku diam di tempat, tapi otot-otot kaki dan perutku bekerja keras menahan tubuh agar tidak roboh.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, hebat! Berarti bergerak itu tidak harus selalu berpindah tempat ya, Nia?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Betul, Ali! Menekuk lutut, memutar lengan, dan mengulurkan badan juga termasuk gerakan di tempat yang membuat otot kita lentur!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: lapangan rumput sekolah. Ali dan Nia bermain oper-operan bola plastik." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, tangkap bolanya ya! Aku akan Me-le-m-par bola ini agak tinggi ke arahmu.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Hore, tertangkap! Sekarang gantian, aku akan Me-n-d-a-ng bola ini kembali ke arah kakimu ya, Ali.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, bermain menggunakan alat bantu seperti bola ini seru sekali ya. Kita harus konsentrasi melihat ke arah bolanya agar tidak luput!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di kantin sekolah setelah pelajaran olahraga. Baju Ali basah kuyup oleh keringat." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Aduh haus sekali, setelah berolahraga rasanya segar tapi gerah ya. Aku mau langsung beli es sirup manis yang dingin ah.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Ali, setelah olahraga yang melelahkan, tubuh kita kehilangan banyak cairan melalui keringat. Minum air putih hangat jauh lebih baik dan sehat untuk mengembalikan kesegaran tubuhmu daripada es sirup yang terlalu manis.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Oh begitu ya, Nia. Lalu setelah ini, apakah aku boleh langsung memakai baju olahraga yang basah ini sampai pulang sekolah?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Jangan, Ali! Baju yang basah oleh keringat bisa menjadi tempat kuman dan jamur berkembang biak. Kita harus menggantinya dengan baju seragam bersih agar kulit kita tidak gatal-gatal.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "pjok-1-bab1") return <DialogBab1 />;
  if (modulId === "pjok-1-bab2") return <DialogBab2 />;
  if (modulId === "pjok-1-bab3") return <DialogBab3 />;
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
        soal="Ketika Ali sedang mengikuti lomba lari di sekolah, posisi tubuh yang paling tepat agar Ali dapat berlari dengan cepat dan tidak mudah terjatuh adalah..."
        benar="A"
        pilihan={[
          {
            huruf: "A",
            teks: "Badan condong ke depan, pandangan mata fokus melihat ke arah garis akhir (finish), dan lengan diayunkan.",
          },
          {
            huruf: "B",
            teks: "Badan membungkuk ke belakang sambil melihat ke arah langit.",
          },
          {
            huruf: "C",
            teks: "Berlari sambil menengok ke kanan dan ke kiri untuk melihat penonton.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa saat kita mendarat setelah melompat, posisi kedua lutut kita harus sedikit ditekuk atau mengeper seperti pegas/per?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Agar lompatan kita bisa langsung diulang dengan cepat." },
          {
            huruf: "B",
            teks: "Untuk meredam benturan tubuh dengan tanah sehingga kaki kita aman dan terhindar dari cedera.",
          },
          { huruf: "C", teks: "Supaya sepatu kita tidak cepat kotor atau rusak." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Benar atau salah beserta alasan
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Gerakan berguling di tempat atau menolehkan kepala ke kanan termasuk ke dalam contoh gerak lokomotor."
        benar="salah"
        alasanBenar="tubuh tidak berpindah tempat jadi bukan lokomotor"
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Mengurai konsep gerakan
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Manakah di antara aktivitas berikut yang sepenuhnya menggunakan variasi gerak non-lokomotor?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Berlari mengejar bola di lapangan." },
          {
            huruf: "B",
            teks: "Berdiri tegak sambil memutar lengan ke depan untuk melakukan pemanasan sebelum berenang.",
          },
          { huruf: "C", teks: "Melompat melewati rintangan kardus." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Saat menirukan posisi pesawat terbang, Ali merentangkan kedua tangannya ke samping kiri dan kanan. Fungsi utama merentangkan tangan tersebut adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Agar terlihat keren seperti pesawat sungguhan." },
          {
            huruf: "B",
            teks: "Membantu menjaga keseimbangan tubuh agar tidak mudah oleng dan jatuh.",
          },
          { huruf: "C", teks: "Mengurangi rasa lelah pada kaki yang bertumpu." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Studi kasus pengamatan gerak
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ketika sedang bermain operan bola basket, Nia kesulitan menangkap bola yang dilempar oleh Ali karena bola selalu lepas dari genggamannya. Kesalahan yang mungkin dilakukan Nia adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Nia melihat ke arah bola yang datang." },
          {
            huruf: "B",
            teks: "Posisi jari-jari tangan Nia terlalu rapat dan kaku saat bola menyentuh telapak tangan.",
          },
          { huruf: "C", teks: "Nia menangkap menggunakan dua tangan." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Mencocokkan anggota tubuh dan fungsi alat
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={1}
        kiri={["Menendang bola", "Menangkap bola", "Melempar bola"]}
        kanan={[
          "Menggunakan kedua tangan untuk menerima objek yang datang.",
          "Menggunakan ayunan lengan untuk mendorong objek ke sasaran jauh.",
          "Menggunakan punggung atau bagian dalam kaki untuk mendorong objek bawah.",
        ]}
        kunci={{
          "Menendang bola":
            "Menggunakan punggung atau bagian dalam kaki untuk mendorong objek bawah.",
          "Menangkap bola":
            "Menggunakan kedua tangan untuk menerima objek yang datang.",
          "Melempar bola":
            "Menggunakan ayunan lengan untuk mendorong objek ke sasaran jauh.",
        }}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda bernalar kritis
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Setelah melakukan olahraga lari yang cukup melelahkan di bawah terik matahari, tindakan darurat pertama yang paling tepat dan aman untuk menjaga kesehatan tubuh kita adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Langsung mandi dengan air es yang sangat dingin agar tubuh segera sejuk.",
          },
          {
            huruf: "B",
            teks: "Melakukan pendinginan ringan, mengeringkan keringat, lalu meminum air putih secukupnya untuk menghidrasi tubuh.",
          },
          {
            huruf: "C",
            teks: "Langsung tidur telentang di lantai kelas yang dingin tanpa mengganti baju yang basah.",
          },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa kita tidak disarankan untuk terus menggunakan pakaian yang basah oleh keringat dalam waktu yang lama?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Karena pakaian basah bisa membuat warna baju sekolah kita menjadi pudar.",
          },
          {
            huruf: "B",
            teks: "Karena kelembapan pada kain yang kotor dapat memicu pertumbuhan kuman dan jamur penyebab gatal-gatal pada kulit.",
          },
          { huruf: "C", teks: "Supaya kita tidak dimarahi oleh penjaga sekolah." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "pjok-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "pjok-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "pjok-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "pjok-1-bab1": {
    judul: "Gerak lokomotor dasar",
    kepala: ["Gerak", "Ciri", "Ingat"],
    baris: [
      ["Berjalan", "Satu kaki tetap di tanah", "Badan tegak, pandang depan"],
      ["Berlari", "Kedua kaki sempat melayang", "Condong depan, ayun lengan"],
      ["Lompat / loncat", "Tumpuan 1 atau 2 kaki", "Mendarat, lutut mengeper"],
    ],
    hots: "Jika kaki tidak diangkat tinggi saat berjalan, apa yang terjadi?",
  },
  "pjok-1-bab2": {
    judul: "Gerak non-lokomotor",
    kepala: ["Variasi", "Contoh", "Manfaat"],
    baris: [
      ["Menekuk", "Bungkuk sentuh ujung kaki", "Kelenturan pinggang"],
      ["Memutar", "Putar lengan pelan-pelan", "Pemanasan sendi"],
      ["Seimbang", "Bangau dan pesawat", "Tangan merentang, tidak oleng"],
    ],
    hots: "Mengapa bergerak tidak harus selalu pindah tempat?",
  },
  "pjok-1-bab3": {
    judul: "Gerak manipulatif",
    kepala: ["Gerak", "Alat tubuh", "Kunci aman"],
    baris: [
      ["Melempar", "Ayunan lengan", "Mata pada bola"],
      ["Menangkap", "Dua tangan", "Jari terbuka meredam"],
      ["Menendang / memukul", "Kaki atau raket", "Dorong ke sasaran"],
    ],
    hots: "Mengapa bola mudah lepas jika jari rapat dan kaku?",
  },
  "pjok-1-bab4": {
    judul: "Sehat setelah olahraga",
    kepala: ["Langkah", "Lakukan", "Hindari"],
    baris: [
      ["Hidrasi", "Air putih secukupnya", "Es sirup terlalu manis"],
      ["Kulit dan baju", "Lap keringat, ganti baju", "Pakai basah sampai pulang"],
      ["Istirahat", "Tidur sekitar 8 jam", "Tidur di lantai baju basah"],
    ],
    hots: "Mengapa baju basah keringat memicu gatal?",
  },
};

export default function NaskahPjok1({
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
          subjudul={`PJOK · ${modul.judul}`}
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
