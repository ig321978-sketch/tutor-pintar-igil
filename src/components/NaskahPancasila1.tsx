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
  anak,
}: {
  nama: string;
  warna: string;
  anak: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        {nama}
      </p>
      <div className="mt-1 space-y-2 text-sm font-semibold leading-relaxed text-slate-700">
        {anak}
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
          pesanSalah="Coba pilih sikap yang lebih bijak."
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
                pesanSalah="Coba hubungkan dengan sikap atau sila yang cocok."
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

function idEval(modulId: string, indeks: number): string {
  return idKuisKartuResmi(modulId, "D", indeks);
}

function EvaluasiBab1({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Made beragama Hindu dan suka tari Bali. Joko beragama Islam dan suka sepak bola. Jika ingin bermain bersama, sikap terbaik adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Made memaksa Joko ikut menari Bali." },
          {
            huruf: "B",
            teks: "Mereka mencari permainan baru yang bisa dimainkan bersama.",
          },
          { huruf: "C", teks: "Mereka bermain sendiri-sendiri." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Teman baru duduk sendirian dan tampak sedih. Tindakan bernalar kritis yang harus kamu lakukan adalah..."
        benar="C"
        pilihan={[
          { huruf: "A", teks: "Membiarkannya karena mungkin ingin sendiri." },
          { huruf: "B", teks: "Hanya melapor ke guru tanpa menyapa." },
          {
            huruf: "C",
            teks: "Menghampiri dengan senyuman, menyapa, dan mengajak bermain.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Benar / salah
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 2)}
        soal="Mengajak teman yang berkulit gelap bermain bersama adalah perbuatan yang benar."
        benar="benar"
        alasanBenar="semua teman sama hebat boleh bermain bersama tanpa memandang warna kulit"
      />
      <KuisBenarSalah
        id={idEval(modulId, 3)}
        soal="Kita hanya boleh membantu teman yang satu suku atau satu agama saja."
        benar="salah"
        alasanBenar="menolong semua teman tanpa memandang suku atau agama"
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok C: Hubungkan kasus
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={4}
        kiri={[
          "Nia tidak sengaja menjatuhkan pensil Made.",
          "Joko meminjamkan penghapusnya kepada Nia.",
          "Made menyanyikan lagu daerahnya di kelas.",
        ]}
        kanan={[
          "Mengucapkan terima kasih",
          "Meminta maaf dengan tulus",
          "Mendengarkan dengan hormat",
        ]}
        kunci={{
          "Nia tidak sengaja menjatuhkan pensil Made.":
            "Meminta maaf dengan tulus",
          "Joko meminjamkan penghapusnya kepada Nia.":
            "Mengucapkan terima kasih",
          "Made menyanyikan lagu daerahnya di kelas.":
            "Mendengarkan dengan hormat",
        }}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ali ingin memotong antrean di kantin yang ramai. Tindakannya salah karena..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Penjual akan memarahi Ali." },
          {
            huruf: "B",
            teks: "Ali mengambil hak orang yang datang lebih dulu dan mengganggu ketertiban.",
          },
          { huruf: "C", teks: "Makanan akan habis jika Ali mengantre." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mainan adik berserakan. Sikapmu yang tahu aturan rumah adalah..."
        benar="C"
        pilihan={[
          { huruf: "A", teks: "Memarahi adik." },
          { huruf: "B", teks: "Membiarkannya karena bukan mainanmu." },
          {
            huruf: "C",
            teks: "Mengajak adik merapikan sambil menjelaskan aturan dengan lembut.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Isian singkat
      </h5>
      <KuisIsian
        id={idEval(modulId, 2)}
        soal="Kita mendengarkan guru atau teman berbicara agar mendapat ........ dan menghormati ........ orang lain."
        alias={["ilmu", "hak"]}
      />
      <KuisIsian
        id={idEval(modulId, 3)}
        soal="Jika malas merapikan tempat tidur, kamar menjadi ........ dan tidak ........ untuk ditempati."
        alias={["kotor", "nyaman", "berantakan"]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok C: Benar / salah
      </h5>
      <KuisBenarSalah
        id={idEval(modulId, 4)}
        soal="Menyeberang jalan di zebra cross adalah aturan yang melindungi keselamatan diri kita sendiri."
        benar="benar"
        alasanBenar="zebra cross menjaga keselamatan saat menyeberang"
      />
      <KuisBenarSalah
        id={idEval(modulId, 5)}
        soal="Aturan di sekolah hanya berlaku ketika ada guru atau kepala sekolah yang mengawasi."
        benar="salah"
        alasanBenar="aturan tetap berlaku meskipun tidak ada yang mengawasi"
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Rantai emas sila ke-2 berbentuk lingkaran dan persegi yang saling menyambung. Maknanya..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Bangsa Indonesia suka perhiasan emas." },
          {
            huruf: "B",
            teks: "Laki-laki dan perempuan harus bersatu dan saling membantu.",
          },
          { huruf: "C", teks: "Rantai untuk mengikat hewan." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Pendapatmu tidak terpilih saat pemilihan ketua kelas. Sikap sila ke-4 adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Marah dan mogok piket." },
          {
            huruf: "B",
            teks: "Menghargai keputusan bersama dan mendukung ketua terpilih.",
          },
          { huruf: "C", teks: "Meminta guru membatalkan hasil." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Cocokkan simbol
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={2}
        kiri={["Pohon Beringin", "Bintang Emas", "Padi dan Kapas"]}
        kanan={[
          "Sila ke-5 (Keadilan Sosial)",
          "Sila ke-3 (Persatuan Indonesia)",
          "Sila ke-1 (Ketuhanan Yang Maha Esa)",
        ]}
        kunci={{
          "Pohon Beringin": "Sila ke-3 (Persatuan Indonesia)",
          "Bintang Emas": "Sila ke-1 (Ketuhanan Yang Maha Esa)",
          "Padi dan Kapas": "Sila ke-5 (Keadilan Sosial)",
        }}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok C: Isian
      </h5>
      <KuisIsian
        id={idEval(modulId, 5)}
        soal="Bendera negara kita berwarna ........ dan ........"
        alias={["merah", "putih"]}
      />
      <KuisIsian
        id={idEval(modulId, 6)}
        soal="Jika bendera Merah Putih kotor atau jatuh ke tanah, tindakan yang benar adalah..."
        alias={["ambil", "bersih", "hormat", "guru", "orang tua"]}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Meja belajar penuh coretan dan sisa rautan. Sikap tanggung jawab adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Menutup meja dengan kain." },
          {
            huruf: "B",
            teks: "Membersihkan meja dan membuang sampah ke tempat sampah.",
          },
          { huruf: "C", teks: "Membiarkannya karena akan dipakai lagi." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa kita mematuhi larangan menginjak rumput di taman kota?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Agar tidak didenda petugas." },
          {
            huruf: "B",
            teks: "Agar rumput subur, indah, dan taman tidak rusak untuk orang lain.",
          },
          { huruf: "C", teks: "Karena rumput beracun." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Sebab-akibat
      </h5>
      <KuisPilihan
        id={idEval(modulId, 2)}
        soal="Sebab: semua siswa malas piket. Akibat paling logis adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Nilai rapor turun semua." },
          { huruf: "B", teks: "Kelas kotor, bau, dan tidak nyaman belajar." },
          { huruf: "C", teks: "Kelas dipindah ke lapangan." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 3)}
        soal="Sebab: keluarga rajin membersihkan selokan. Akibatnya..."
        benar="A"
        pilihan={[
          { huruf: "A", teks: "Rumah aman dari banjir saat hujan." },
          { huruf: "B", teks: "Rumah menjadi sempit." },
          { huruf: "C", teks: "Air selokan untuk minum." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok C: Esai
      </h5>
      <KuisIsian
        id={idEval(modulId, 4)}
        soal="Mengapa membuang sampah di tempat sampah mencerminkan nilai Pancasila?"
        alias={[
          "pancasila",
          "gotong royong",
          "peduli",
          "bersih",
          "bersama",
          "tidak merugikan",
        ]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "pancasila-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "pancasila-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "pancasila-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "pancasila-1-bab1": {
    judul: "Pelangi di Kelasku",
    kepala: ["Identitas dikau", "Cara menghargai", "Manfaat nyata"],
    baris: [
      ["Rambut keriting / lurus", "Mengajak bermain bersama", "Kelas yang damai"],
      ["Suku Jawa / Bali / Papua", "Bergantian memakai mainan", "Punya banyak teman pintar"],
      ["Pengguna kursi roda", "Tidak mengejek kekurangan", "Belajar bersama bahagia"],
    ],
    hots:
      "Apa yang akan terjadi jika semua manusia di dunia ini memiliki wajah, suara, dan sifat yang persis sama?",
  },
  "pancasila-1-bab2": {
    judul: "Sebab & Akibat Aturan",
    kepala: ["Aturan", "Mengapa dibuat?", "Jika dilanggar?"],
    baris: [
      ["Pamit orang tua", "Agar orang tua tenang", "Orang tua cemas"],
      ["Datang tepat waktu", "Agar kelas kondusif", "Tertinggal pelajaran"],
      ["Antre di kantin", "Melatih kesabaran & hak", "Terjadi pertengkaran"],
    ],
    hots:
      "Apa jadinya jika lampu lalu lintas di jalan raya dimatikan dan semua orang boleh berjalan sesuka hati?",
  },
  "pancasila-1-bab3": {
    judul: "Perisai Pancasilaku",
    kepala: ["Sila", "Simbol", "Perilaku nyata di kelas"],
    baris: [
      ["Ke-1", "Bintang", "Berdoa sebelum dan sesudah belajar"],
      ["Ke-2", "Rantai", "Menolong teman yang jatuh dari sepeda"],
      ["Ke-3", "Pohon beringin", "Mencintai produk dan batik Indonesia"],
      ["Ke-4", "Kepala banteng", "Berdiskusi menentukan ketua kelas"],
      ["Ke-5", "Padi & kapas", "Berbagi makanan secara adil"],
    ],
  },
  "pancasila-1-bab4": {
    judul: "Aksi Hijau Wangi",
    kepala: ["Lingkunganku", "Tanggung jawabku", "Jika kita abaikan"],
    baris: [
      ["Kamar tidur", "Merapikan selimut", "Kamar sarang nyamuk"],
      ["Ruang kelas", "Melaksanakan piket", "Belajar tidak nyaman"],
      ["Taman sekolah", "Tidak memetik bunga", "Tanaman layu & rusak"],
    ],
    hots:
      "Mengapa pekerjaan membersihkan kelas terasa lebih cepat dan ringan jika dilakukan secara gotong royong?",
  },
};

function DialogBab1() {
  return (
    <div className="mt-5 space-y-3">
      <GelembungTutur nama="Nia" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
        <p>
          Made, kamu unik sekali. Menulis dan menggambar memakai tangan kiri.
          Apakah tidak sulit?
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
        <p>
          Tidak, Nia. Ini pemberian Tuhan sejak lahir. Ayahku bilang, tangan
          kiri atau kanan sama-sama hebat asalkan dipakai untuk kebaikan.
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Joko" warna="border-[#16A34A]/20 bg-[#F0FDF4]">
        <p>
          Betul, Made! Aku juga memakai kursi roda untuk berjalan. Fisik kita
          boleh berbeda, tapi kita semua bisa belajar bersama dan berteman baik,
          bukan?
        </p>
      </GelembungTutur>
      <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
        Nia: Wah, iya! Coba bayangkan kalau warna pensil gambarku hanya merah
        saja, pasti gambarku jadi tidak indah. Karena kita berbeda-beda, kelas
        kita jadi berwarna!
      </p>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 space-y-3">
      <GelembungTutur nama="Ali" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
        <p>
          Aduh Nia, maaf! Aku terburu-buru sampai lupa berpamitan pada ibuku di
          rumah tadi.
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
        <p>
          Wah Ali, kenapa kamu bisa terlambat bangun? Gerbang sekolah kan
          ditutup lima menit lagi.
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
        <p>
          Semalam aku menonton televisi sampai larut malam. Aku pikir tidak
          apa-apa sekali-sekali melanggar aturan tidur.
        </p>
      </GelembungTutur>
      <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
        Nia: Ali, aturan tidur dibuat orang tua agar tubuh kita sehat dan tidak
        terlambat ke sekolah. Kalau kamu terlambat, kamu merugikan dirimu
        sendiri karena tertinggal pelajaran.
      </p>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 space-y-3">
      <GelembungTutur nama="Ali" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
        <p>
          Nia, coba lihat dada Burung Garuda itu. Ada perisai dengan lima gambar
          yang berbeda ya. Ada bintang, rantai, pohon, banteng, padi dan kapas.
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#DB2777]/20 bg-[#FDF2F8]">
        <p>
          Betul, Ali. Ayahku bilang perisai itu seperti pelindung bangsa kita.
          Di bawahnya, cakar burung itu mencengkeram pita bertuliskan Bhinneka
          Tunggal Ika.
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
        <p>Hmm, kenapa kakinya harus mencengkeram pita itu dengan sangat kuat ya, Nia?</p>
      </GelembungTutur>
      <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
        Nia: Itu artinya kita harus memegang teguh persatuan kita, Ali! Meskipun
        isi perisainya berbeda-beda dan suku kita bermacam-macam, kita tetap
        satu Indonesia.
      </p>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 space-y-3">
      <GelembungTutur nama="Made" warna="border-[#16A34A]/20 bg-[#F0FDF4]">
        <p>Ali! Tunggu dulu, jangan lempar plastik itu ke dalam selokan!</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#2563EB]/20 bg-[#EFF6FF]">
        <p>
          Eh, kenapa Made? Kan alirannya airnya mengalir, nanti plastiknya juga
          terbawa pergi dan hilang.
        </p>
      </GelembungTutur>
      <GelembungTutur nama="Made" warna="border-[#16A34A]/20 bg-[#F0FDF4]">
        <p>
          Plastik itu tidak akan hilang, Ali. Dia akan menyumbat saluran air di
          hilir. Kalau hujan deras datang, air selokan meluap dan sekolah kita
          bisa banjir!
        </p>
      </GelembungTutur>
      <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
        Ali: Oh iya ya! Lingkungan ini milik kita bersama. Made: Menjaga
        kebersihan lingkungan adalah tugas kita sebagai warga negara yang baik.
      </p>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "pancasila-1-bab1") return <DialogBab1 />;
  if (modulId === "pancasila-1-bab2") return <DialogBab2 />;
  if (modulId === "pancasila-1-bab3") return <DialogBab3 />;
  return <DialogBab4 />;
}

const EMOJI = {
  A: {
    "pancasila-1-bab1": "🖍️🤝♿",
    "pancasila-1-bab2": "🚪⏰🏃",
    "pancasila-1-bab3": "🦅🇮🇩",
    "pancasila-1-bab4": "🌳🚯",
  },
  B: {
    "pancasila-1-bab1": "🌈🏫",
    "pancasila-1-bab2": "📋⚖️",
    "pancasila-1-bab3": "🛡️⭐",
    "pancasila-1-bab4": "♻️🌱",
  },
  C: {
    "pancasila-1-bab1": "🌳✋",
    "pancasila-1-bab2": "🏫🏠",
    "pancasila-1-bab3": "🕵️🇮🇩",
    "pancasila-1-bab4": "🐜🏡",
  },
  D: {
    "pancasila-1-bab1": "📝❤️",
    "pancasila-1-bab2": "📝✅",
    "pancasila-1-bab3": "📝🦅",
    "pancasila-1-bab4": "📝🌿",
  },
} as const;

export default function NaskahPancasila1({
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
          emoji={EMOJI.A[modul.id as keyof typeof EMOJI.A] ?? "💬"}
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
          emoji={EMOJI.B[modul.id as keyof typeof EMOJI.B] ?? "📊"}
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
          emoji={EMOJI.C[modul.id as keyof typeof EMOJI.C] ?? "🏫🏠"}
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
          emoji={EMOJI.D[modul.id as keyof typeof EMOJI.D] ?? "📝"}
          kartu={kartuD}
          kelas={kelas}
          kelamin={kelamin}
          subjudul={`Pendidikan Pancasila · ${modul.judul}`}
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
