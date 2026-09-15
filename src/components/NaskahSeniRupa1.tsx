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
      <Latar anak="Latar: di taman sekolah. Ali memegang spidol hitam di atas kertas gambar. Nia memperhatikan guratan di atas batu." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, lihat deh! Kalau aku tarik spidol ini tanpa putus dari kiri ke kanan, kertas ini jadi punya jalan panjang. Ini namanya apa ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Itu namanya Garis, Ali! Kemarin aku melihat garis di jalan raya lurus sekali. Tapi coba lihat guratan di atas batu ini, bentuknya meliuk-liuk seperti ular.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah iya! Kalau garis meliuk itu diputar sampai ujungnya bertemu lagi, di dalamnya bisa kita beri warna merah atau kuning ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Benar! Garis yang ujungnya bertemu akan membentuk Bidang. Dunia kita ini jadi tidak membosankan karena ada perpaduan garis dan warna-warni yang indah!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab2() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di bawah pohon rindang sekolah. Nia memegang daun kering. Ali memegang buah jeruk." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, coba raba kulit jeruk ini. Rasanya geronjal-geronjal kasar di tanganku.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Kalau daun kering yang aku pegang ini rasanya agak halus, tapi ada garis-garis menonjol di belakangnya. Ini namanya apa ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Kata Ibu Guru, rasa permukaan benda saat diraba itu namanya Tekstur.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Wah, asyik ya! Bagaimana kalau bagian belakang daun yang menonjol ini kita beri cat warna, lalu kita tempelkan ke kertas gambar kita? Pasti bentuk tulang daunnya menempel dengan indah!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab3() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di meja keterampilan kelas. Ali memegang gunting plastik dan kertas lipat warna-warni." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, aku sudah memotong kertas merah ini menjadi potongan segi-empat yang kecil-kecil sekali.</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Bagus, Ali! Sekarang mari kita oleskan lem di dalam gambar skema pola burung ini, lalu kita tempelkan potongan kertas kecilmu satu per satu sampai penuh.</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, polanya jadi tertutup rapi dan gambarnya jadi terlihat timbul menonjol ya! Mengapa kita harus memotongnya kecil-kecil, Nia?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Supaya potongan kertasnya bisa mengikuti lekukan gambar burung dengan rapi dan melatih kesabaran jari-jari tangan kita, Ali!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab4() {
  return (
    <div className="mt-5 grid gap-3">
      <Latar anak="Latar: di teras rumah Nia. Ali membawa kotak susu kosong dan empat tutup botol plastik." />
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Nia, ibuku bilang kotak susu kosong ini jangan dibuang sembarangan. Bisakah kita ubah menjadi mainan baru?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Tentu saja bisa, Ali! Kotak susu ini kan berbentuk balok panjang. Kalau kita tempelkan dua tutup botol di kanan dan dua di kiri, kotak ini bisa berubah menjadi mobil-mobilan!</p>
      </GelembungTutur>
      <GelembungTutur nama="Ali" warna="border-[#1D4ED8]/20 bg-[#EFF6FF]">
        <p>Wah, hebat! Mobil-mobilan ini bisa kita pegang dari depan, belakang, dan atas. Berbeda dengan gambar di kertas yang hanya bisa dilihat dari depan saja ya?</p>
      </GelembungTutur>
      <GelembungTutur nama="Nia" warna="border-[#C2410C]/20 bg-[#FFF7ED]">
        <p>Betul! Ini namanya karya Tiga Dimensi. Kita tidak hanya mendaur ulang sampah, tapi juga melatih otak kita menjadi anak yang kreatif!</p>
      </GelembungTutur>
    </div>
  );
}

function DialogBab({ modulId }: { modulId: string }) {
  if (modulId === "senirupa-1-bab1") return <DialogBab1 />;
  if (modulId === "senirupa-1-bab2") return <DialogBab2 />;
  if (modulId === "senirupa-1-bab3") return <DialogBab3 />;
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
        soal="Ketika menggambar laut yang sedang diterjang angin kencang dan berombak besar, jenis garis yang paling tepat digunakan untuk menggambarkan suasana ombak tersebut adalah..."
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Garis lurus tegak ke atas yang kaku." },
          {
            huruf: "B",
            teks: "Garis bergelombang melengkung naik dan turun secara berulang.",
          },
          { huruf: "C", teks: "Garis titik-titik yang tipis." },
        ]}
      />
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Nia hanya memiliki tiga pensil warna di kotaknya, yaitu warna Merah, Kuning, dan Biru. Warna-warna tersebut di dalam ilmu seni rupa disebut sebagai..."
        benar="A"
        pilihan={[
          { huruf: "A", teks: "Warna Primer (Warna Utama)." },
          { huruf: "B", teks: "Warna Gelap (Warna Malam)." },
          { huruf: "C", teks: "Warna Campuran (Warna Sekunder)." },
        ]}
      />
    </div>
  );
}

function EvaluasiBab2({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Mengurai konsep tekstur
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Manakah di antara benda alam berikut yang memiliki tekstur paling kasar dan terasa menonjol tajam saat diraba oleh telapak tangan kita?"
        benar="B"
        pilihan={[
          { huruf: "A", teks: "Kulit buah apel merah yang matang." },
          { huruf: "B", teks: "Kulit batang pohon mangga tua di halaman sekolah." },
          { huruf: "C", teks: "Permukaan daun bunga mawar yang basah." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Mencocokkan bahan cetak alami
      </h5>
      <KuisMencocokkan
        modulId={modulId}
        idAwal={1}
        kiri={[
          "Potongan pelepah pisang",
          "Potongan buah belimbing",
          "Bagian belakang daun",
        ]}
        kanan={[
          "Bentuk menyerupai Bintang 🌟",
          "Bentuk menyerupai Tulang Daun 🍃",
          "Bentuk menyerupai Rongga Kotak Kecil-Kecil 🧽",
        ]}
        kunci={{
          "Potongan pelepah pisang":
            "Bentuk menyerupai Rongga Kotak Kecil-Kecil 🧽",
          "Potongan buah belimbing": "Bentuk menyerupai Bintang 🌟",
          "Bagian belakang daun": "Bentuk menyerupai Tulang Daun 🍃",
        }}
      />
    </div>
  );
}

function EvaluasiBab3({ modulId }: { modulId: string }) {
  return (
    <div className="mt-5 space-y-5">
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok A: Prosedur pembuatan karya
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Saat membuat karya kolase menggunakan bahan biji kacang hijau di atas kertas gambar, urutan langkah pengerjaan yang paling tepat dan rapi agar kertas tidak sobek atau kotor adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Menempelkan semua biji terlebih dahulu, baru diberi lem di atas bijinya secara acak.",
          },
          {
            huruf: "B",
            teks: "Membuat gambar pola dasar di kertas, mengoleskan lem secukupnya di dalam pola, lalu menempelkan biji kacang hijau satu per satu dengan sabar.",
          },
          {
            huruf: "C",
            teks: "Merendam kertas gambar di dalam mangkuk berisi lem dan kacang hijau.",
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
        Kelompok A: Karakteristik bentuk karya
      </h5>
      <KuisPilihan
        id={idEval(modulId, 0)}
        soal="Ali membuat sebuah patung kucing kecil menggunakan bahan tanah liat lembut, sedangkan Nia menggambar pemandangan gunung di atas kertas menggunakan krayon. Perbedaan utama dari kedua karya tersebut adalah..."
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Gambar Nia memiliki ruang tebal dan bisa dipegang bagian belakangnya.",
          },
          {
            huruf: "B",
            teks: "Patung buatan Ali termasuk karya tiga dimensi karena memiliki volume (isi/tebal) dan bisa dilihat dari segala arah, sedangkan gambar Nia adalah karya dua dimensi yang rata.",
          },
          { huruf: "C", teks: "Gambar Nia lebih mahal daripada patung Ali." },
        ]}
      />
      <h5 className="text-sm font-black uppercase tracking-wide text-[#1C01A5]">
        Kelompok B: Evaluasi sikap lingkungan
      </h5>
      <KuisPilihan
        id={idEval(modulId, 1)}
        soal="Mengapa memanfaatkan kardus bekas kotak sepatu untuk dijadikan rumah-rumahan mainan dinilai sebagai perbuatan yang mencerminkan siswa kreatif yang cinta lingkungan?"
        benar="B"
        pilihan={[
          {
            huruf: "A",
            teks: "Karena kardus bekas gratis dan tidak perlu dibeli di toko mainan.",
          },
          {
            huruf: "B",
            teks: "Karena aktivitas tersebut membantu mengurangi jumlah sampah di lingkungan dengan mengubahnya menjadi benda baru yang bermanfaat dan menyenangkan.",
          },
          {
            huruf: "C",
            teks: "Supaya kamar kita menjadi penuh dengan tumpukan kardus kotor.",
          },
        ]}
      />
    </div>
  );
}

function EvaluasiBab({ modul }: { modul: ModulResmiPai }) {
  if (modul.id === "senirupa-1-bab1") return <EvaluasiBab1 modulId={modul.id} />;
  if (modul.id === "senirupa-1-bab2") return <EvaluasiBab2 modulId={modul.id} />;
  if (modul.id === "senirupa-1-bab3") return <EvaluasiBab3 modulId={modul.id} />;
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
  "senirupa-1-bab1": {
    judul: "Unsur dasar seni rupa",
    kepala: ["Unsur", "Ciri", "Contoh"],
    baris: [
      ["Garis lurus", "Tegak, kaku, stabil, tenang", "Tiang bendera, garis buku"],
      ["Garis lengkung", "Luwes, bergerak, dinamis", "Ombak laut, helai rambut"],
      ["Warna primer", "Merah, kuning, biru", "Tidak dibuat dari campuran"],
    ],
    hots: "Kalau garis meliuk diputar sampai ujungnya bertemu, apa yang terbentuk di dalamnya?",
  },
  "senirupa-1-bab2": {
    judul: "Tekstur dan cap alam",
    kepala: ["Bahan", "Tekstur", "Hasil cap"],
    baris: [
      ["Kulit jeruk", "Geronjal kasar", "Titik-titik menonjol"],
      ["Tulang daun", "Garis menonjol", "Cap tulang daun"],
      ["Belimbing / pelepah", "Potongan alami", "Bintang / rongga kotak"],
    ],
    hots: "Mengapa bagian belakang daun lebih bagus dijadikan cap daripada permukaan yang licin?",
  },
  "senirupa-1-bab3": {
    judul: "Kolase dan motorik halus",
    kepala: ["Langkah", "Tujuan", "Ingat"],
    baris: [
      ["Gambar pola", "Batas tempat menempel", "Jangan acak"],
      ["Oles lem", "Perekat di dalam pola", "Secukupnya"],
      ["Tempel satu per satu", "Ikuti lekukan gambar", "Latih kesabaran jari"],
    ],
    hots: "Mengapa potongan kertas harus kecil-kecil saat menempel gambar burung?",
  },
  "senirupa-1-bab4": {
    judul: "Karya tiga dimensi dan eco-art",
    kepala: ["Karya", "Ciri", "Contoh"],
    baris: [
      ["Dua dimensi", "Rata, dilihat dari depan", "Gambar gunung di kertas"],
      ["Tiga dimensi", "Panjang, lebar, volume", "Patung, mobil kotak susu"],
      ["Eco-art", "Barang bekas jadi mainan", "Kurangi sampah, tetap kreatif"],
    ],
    hots: "Mengapa kotak susu bekas bisa dilihat dari depan, belakang, dan atas?",
  },
};

const EMOJI: Record<string, Record<string, string>> = {
  A: {
    "senirupa-1-bab1": "✏️🌈",
    "senirupa-1-bab2": "🍃🍊",
    "senirupa-1-bab3": "✂️🐦",
    "senirupa-1-bab4": "📦🚗",
  },
  B: {
    "senirupa-1-bab1": "➖🟡",
    "senirupa-1-bab2": "🖐️🪵",
    "senirupa-1-bab3": "📎🌱",
    "senirupa-1-bab4": "🗿♻️",
  },
  C: {
    "senirupa-1-bab1": "🏫🏠",
    "senirupa-1-bab2": "🏫🏠",
    "senirupa-1-bab3": "🏫🏠",
    "senirupa-1-bab4": "🏫🏠",
  },
  D: {
    "senirupa-1-bab1": "📝🌈",
    "senirupa-1-bab2": "📝🍃",
    "senirupa-1-bab3": "📝✂️",
    "senirupa-1-bab4": "📝📦",
  },
};

export default function NaskahSeniRupa1({
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
          subjudul={`Seni Rupa · ${modul.judul}`}
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
