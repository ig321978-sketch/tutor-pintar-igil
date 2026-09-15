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
      <Latar anak="Latar: di dalam kelas seni. Ibu Guru meminta siswa mengetuk meja memakai jari dan telapak secara bergantian." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, dengar deh! Kalau aku ketuk meja memakai ujung jari, bunyinya Tuk! Tuk! Tuk! nyaring sekali.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Iya, Ali! Tapi kalau aku ketuk memakai telapak tangan, bunyinya berubah jadi Dug! Dug! Dug! terasa lebih berat dan mantap.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, padahal bendanya sama-sama meja ya! Kok ketukan kita bisa menghasilkan suara yang berbeda?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Kata Ibu Guru, bagian tubuh yang menyentuh benda memengaruhi cara suara itu lahir. Tubuh kita ini sebenarnya adalah alat musik pertama kita, Ali!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di aula sekolah. Siswa sedang mendengarkan lagu anak-anak yang bersemangat." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lagu ini membuat kakiku ingin ikut bergerak mengetuk lantai mengikuti lagunya secara teratur.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Itu namanya Pulsa, Ali! Seperti detak jantung kita yang berdetak konstan dan stabil. Jangan sampai ketukan kakimu terlalu cepat atau terlalu lambat dari musiknya ya.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Oh, kalau lagunya berubah jadi lambat seperti lagu pengantar tidur, berarti ketukan kakiku juga harus melambat ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Tepat sekali! Cepat lambatnya lagu itu dinamakan Tempo.</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di ruang musik sekolah. Nia mencoba bernyanyi solmisasi do-re-mi." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, suaramu saat mengucapkan kata Do dan kata Mi terdengar berbeda ya? Yang satu rendah, yang satu agak tinggi.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Iya, Ali! Suara kita bisa disesuaikan dengan Nada. Nada itu bunyinya teratur, ada yang tinggi seperti suara burung pipit, ada juga yang rendah seperti suara sapi.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Berarti saat bernyanyi bersama teman-teman, suara kita semua harus menyatu di nada yang sama ya agar lagunya terdengar indah?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Betul, Ali! Kita harus saling mendengarkan satu sama lain agar suara kita selaras dan tidak balapan!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di ruang pajang kebudayaan sekolah. Ali terpukau melihat alat musik bambu berjejer." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat alat musik dari bambu ini! Bentuknya bergetar dan berbunyi indah sekali saat digoyang-goyang.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Oh, itu namanya Angklung, Ali! Alat musik asli dari daerah Jawa Barat Indonesia. Dia terbuat dari bambu pilihan.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, Indonesia hebat ya! Kita punya alat musik tradisional yang unik. Cara memainkannya pun beda-beda, ada yang digoyang, dipukul, atau dipetik.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Benar! Menjaga dan mempelajari alat musik tradisi kita ini adalah bukti kalau kita bangga menjadi anak Indonesia!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "musik-1-bab1") return <DialogBab1 />;
  if (modulId === "musik-1-bab2") return <DialogBab2 />;
  if (modulId === "musik-1-bab3") return <DialogBab3 />;
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
        soal={'Ali mengisi sebuah botol plastik dengan beras, lalu ia mengocoknya hingga berbunyi "Srek! Srek! Srek!". Eksplorasi yang dilakukan Ali mengubah fungsi botol tersebut menjadi alat musik...'}
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Tiup yang menghasilkan nada tinggi." },
          {
            huruf: "B",
            teks: "Perkusif (pukul/kocok) sederhana penghasil irama.",
          },
          { huruf: "C", teks: "Gesek yang membutuhkan busur." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa sendok besi yang diketuk ke gelas kaca menghasilkan bunyi yang lebih melengking tinggi dibandingkan jika diketuk ke meja kayu?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Karena gelas kaca memiliki permukaan yang empuk." },
          {
            huruf: "B",
            teks: "Karena besi dan kaca adalah bahan padat keras yang memantulkan getaran bunyi dengan sangat cepat dan rapat.",
          },
          { huruf: "C", teks: "Karena sendok besi tidak menyukai meja kayu." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Klasifikasi emosi dan tempo
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Sebuah lagu dinyanyikan untuk menghibur adik bayi agar tertidur lelap di malam hari. Lagu tersebut sebaiknya dimainkan dengan..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Tempo sangat cepat dan suara yang berteriak lantang.",
          },
          { huruf: "B", teks: "Tempo lambat, lembut, dan stabil (konstan)." },
          {
            huruf: "C",
            teks: "Tempo yang berubah-ubah secara mendadak agar adik kaget.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Mencocokkan hubungan irama
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={1}
        kiri={["Pulsa (Detak)", "Tempo", "Melodi"]}
        kanan={[
          "Cepat lambatnya laju lagu.",
          "Ketukan dasar yang teratur dan stabil.",
          "Rangkaian nada tinggi dan rendah.",
        ]}
        kunci={{
          "Pulsa (Detak)": "Ketukan dasar yang teratur dan stabil.",
          Tempo: "Cepat lambatnya laju lagu.",
          Melodi: "Rangkaian nada tinggi dan rendah.",
        }}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Studi kasus paduan suara
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal={'Saat kelompok kelas 1 sedang bernyanyi bersama lagu "Pelangi-Pelangi", Joko bernyanyi dengan suara yang sangat keras hingga menutupi suara teman-teman lainnya. Tindakan Joko tersebut kurang tepat karena...'}
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Suara Joko membuat lagu menjadi terlalu cepat selesai.",
          },
          {
            huruf: "B",
            teks: "Bernyanyi bersama membutuhkan keselarasan dan keseimbangan volume agar keindahan perpaduan suara kelompok tetap terjaga.",
          },
          { huruf: "C", teks: "Joko menyanyikan lirik lagu yang salah." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab4({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Pilihan ganda logika budaya
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Gendang adalah alat musik tradisional Indonesia yang terbuat dari rongga kayu yang ditutup oleh kulit hewan yang diregangkan kencang. Mengapa bagian ujungnya harus ditutup dengan kulit hewan yang kencang?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Supaya kayu gendang tidak cepat lapuk atau dimakan rayap.",
          },
          {
            huruf: "B",
            teks: "Kulit hewan yang tegang akan menghasilkan getaran suara yang kuat dan menggema saat dipukul oleh telapak tangan.",
          },
          {
            huruf: "C",
            teks: "Agar tampilan gendang terlihat berwarna-warni dan indah.",
          },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Klasifikasi cara memainkan
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={1}
        kiri={["Angklung", "Gendang", "Suling"]}
        kanan={["Digoyang", "Dipukul", "Ditiup"]}
        kunci={{
          Angklung: "Digoyang",
          Gendang: "Dipukul",
          Suling: "Ditiup",
        }}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "musik-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "musik-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "musik-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "musik-1-bab1": {
    judul: "Sumber dan warna bunyi",
    kepala: ["Jenis", "Contoh", "Ingat"],
    baris: [
      ["Internal", "Tepuk, hentak, petik", "Tubuh alat musik pertama"],
      ["Eksternal", "Botol, sendok, pensil", "Benda di sekitar"],
      ["Timbre", "Plastik, kayu, besi", "Bahan mengubah bunyi"],
    ],
    hots: "Mengapa jari dan telapak menghasilkan bunyi berbeda di meja yang sama?",
  },
  "musik-1-bab2": {
    judul: "Pulsa dan tempo",
    kepala: ["Istilah", "Arti", "Contoh rasa"],
    baris: [
      ["Pulsa", "Ketukan teratur dan stabil", "Seperti detak jantung"],
      ["Tempo cepat", "Laju lagu lebih cepat", "Menanam Jagung, ceria"],
      ["Tempo lambat", "Laju lagu lebih pelan", "Nina Bobo, tenang"],
    ],
    hots: "Jika lagu menjadi pengantar tidur, ketukan kaki harus bagaimana?",
  },
  "musik-1-bab3": {
    judul: "Nada dan bernyanyi bersama",
    kepala: ["Konsep", "Ciri", "Sikap"],
    baris: [
      ["Nada", "Tinggi atau rendah, teratur", "Pipit dan sapi"],
      ["Unisono", "Menyanyi pada nada sama", "Jangan balapan"],
      ["Dinamika", "Volume seimbang", "Jangan menutupi teman"],
    ],
    hots: "Mengapa kita harus saling mendengar saat bernyanyi bersama?",
  },
  "musik-1-bab4": {
    judul: "Alat musik tradisional",
    kepala: ["Alat", "Bahan", "Cara main"],
    baris: [
      ["Angklung", "Bambu", "Digoyang"],
      ["Gendang", "Kayu dan kulit", "Dipukul"],
      ["Sasando / suling", "Lontar-bambu / tiup", "Dipetik / ditiup"],
    ],
    hots: "Mengapa kulit gendang harus kencang?",
  },
};

const EMOJI: Record<string, Record<string, string>> = {
  A: {
    "musik-1-bab1": "🔊🖐️",
    "musik-1-bab2": "🥁👣",
    "musik-1-bab3": "🎤🌈",
    "musik-1-bab4": "🪕🎋",
  },
  B: {
    "musik-1-bab1": "👏🪵",
    "musik-1-bab2": "❤️🎵",
    "musik-1-bab3": "🐦🐄",
    "musik-1-bab4": "🥁🎶",
  },
  C: {
    "musik-1-bab1": "🏫🏠",
    "musik-1-bab2": "🏫🏠",
    "musik-1-bab3": "🏫🏠",
    "musik-1-bab4": "🏫🏠",
  },
  D: {
    "musik-1-bab1": "📝🔊",
    "musik-1-bab2": "📝🥁",
    "musik-1-bab3": "📝🎤",
    "musik-1-bab4": "📝🪕",
  },
};

export default function NaskahMusik1({
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
          subjudul={`Seni Musik · ${modul.judul}`}
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
