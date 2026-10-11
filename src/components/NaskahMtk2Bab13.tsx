"use client";

import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import LatihanSuaraResmi from "@/components/LatihanSuaraResmi";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan } from "@/lib/hasil-kuis";
import { MODUL_MTK2_BAB13 } from "@/lib/modul-resmi-mtk-2-bab13";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { kumpulkanAlias } from "@/lib/nilai-kuis-tulis";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function idEvaluasi(indeks: number): string {
  return idKuisKartuResmi(MODUL_MTK2_BAB13.id, "D", indeks);
}

function LambangPecahan({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <span className="mx-0.5 inline-flex flex-col items-center align-middle font-black leading-none text-[#1C01A5]">
      <span>{atas}</span>
      <span className="my-0.5 block h-0.5 w-full min-w-[1.1rem] bg-[#1C01A5]" />
      <span>{bawah}</span>
    </span>
  );
}

const IRIS_DUA = [
  "M60 60 L60 6 A54 54 0 0 1 60 114 Z",
  "M60 60 L60 114 A54 54 0 0 1 60 6 Z",
];

const IRIS_EMPAT = [
  "M60 60 L60 6 A54 54 0 0 1 114 60 Z",
  "M60 60 L114 60 A54 54 0 0 1 60 114 Z",
  "M60 60 L60 114 A54 54 0 0 1 6 60 Z",
  "M60 60 L6 60 A54 54 0 0 1 60 6 Z",
];

function KueAdil({
  bagian,
  gelap = 0,
  judul,
}: {
  bagian: 2 | 4;
  gelap?: number;
  judul: string;
}) {
  const iris = bagian === 2 ? IRIS_DUA : IRIS_EMPAT;
  const warna = ["#FBBF24", "#F59E0B", "#FCD34D", "#D97706"];
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 120" className="h-28 w-28" role="img" aria-label={judul}>
        {iris.map((d, i) => (
          <path
            key={d}
            d={d}
            fill={i < gelap ? "#7C3AED" : warna[i]}
            stroke="#1C01A5"
            strokeWidth="2.5"
          />
        ))}
        <circle cx="60" cy="60" r="54" fill="none" stroke="#7C2D12" strokeWidth="4" />
      </svg>
      <figcaption className="text-center text-xs font-black text-[#1C01A5]">{judul}</figcaption>
    </figure>
  );
}

function KueUtuh() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 120 120" className="h-28 w-28" role="img" aria-label="Kue bolu cokelat utuh">
        <circle cx="60" cy="60" r="54" fill="#F59E0B" stroke="#7C2D12" strokeWidth="4" />
        <circle cx="46" cy="50" r="5" fill="#7C2D12" />
        <circle cx="68" cy="44" r="5" fill="#7C2D12" />
        <circle cx="74" cy="68" r="5" fill="#7C2D12" />
        <circle cx="50" cy="72" r="4" fill="#7C2D12" />
      </svg>
      <figcaption className="text-center text-xs font-black text-[#1C01A5]">1 kue bolu utuh</figcaption>
    </figure>
  );
}

function BatangCokelat({ adil }: { adil: boolean }) {
  return (
    <div className="mt-2 flex h-12 w-full max-w-sm overflow-hidden rounded-xl border-2 border-[#7C2D12]">
      <div className={`${adil ? "w-1/2" : "w-[22%]"} bg-[#C2410C]`} />
      <div className="w-1 bg-[#1C01A5]" />
      <div className="flex-1 bg-[#FDBA74]" />
    </div>
  );
}

function PudingSetengah() {
  return (
    <div className="mx-auto grid h-24 w-44 grid-cols-2 overflow-hidden rounded-xl border-2 border-[#1C01A5]">
      <div className="flex items-center justify-center bg-[#6D28D9] text-xs font-black text-white">GELAP</div>
      <div className="flex items-center justify-center bg-white text-xs font-black text-[#1C01A5]">PUTIH</div>
    </div>
  );
}

function KuisPilih({
  indeks,
  soal,
  pilihan,
  benar,
  anak,
}: {
  indeks: number;
  soal: ReactNode;
  pilihan: { huruf: string; teks: ReactNode }[];
  benar: string;
  anak?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <div className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</div>
      {anak ? <div className="mt-3">{anak}</div> : null}
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
          pesanSalah="Pecahan hanya sah jika potongannya sama besar. Angka bawah adalah jumlah seluruh potongan."
        />
      </div>
    </article>
  );
}

function KuisIsian({
  indeks,
  soal,
  anak,
  cocok,
  pesanSalah,
}: {
  indeks: number;
  soal: ReactNode;
  anak?: ReactNode;
  cocok: (isi: string) => boolean;
  pesanSalah: string;
}) {
  const kuis = useKuisMateri();
  const id = idEvaluasi(indeks);
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);
  const periksa = () => {
    if (cocok(isi)) {
      setStatus("benar");
      kuis?.tandaiBenar(id);
      return;
    }
    setStatus("salah");
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] p-4">
      <div className="text-sm font-semibold leading-relaxed text-slate-700">{soal}</div>
      {anak ? <div className="mt-3">{anak}</div> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          className="min-w-[8rem] flex-1 rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
          placeholder="__________"
        />
        <button
          type="button"
          onClick={periksa}
          className="rounded-xl bg-[#1C01A5] px-4 py-2 text-sm font-black text-white hover:bg-[#16017a]"
        >
          Periksa
        </button>
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} cuplikan={isi.trim() || undefined} pesanSalah={pesanSalah} />
      </div>
    </article>
  );
}

function rapat(isi: string): string {
  return isi.trim().toLowerCase().replace(/\s+/g, " ");
}

function cocokSeperempat(isi: string): boolean {
  const r = rapat(isi).replace(/\s+/g, "");
  return r === "1/4" || r === "¼" || r.includes("seperempat") || r === "satuperempat" || r === "1per4";
}

function cocokSisa(isi: string): boolean {
  const r = rapat(isi).replace(/\s+/g, "");
  if (r === "2" || r === "dua" || r === "2/4" || r === "1/2" || r === "setengah" || r === "seperdua") return true;
  return /^(2|dua)(bagian|potong)?(dari4|\/4)?$/.test(r) || r.includes("2/4") || r.includes("duaperempat");
}

function cocokPasangan(isi: string): boolean {
  const r = isi.toLowerCase().replace(/[^a-z0-9]/g, "");
  return r.includes("1b") && r.includes("2a");
}

function cocokLipat(isi: string): boolean {
  const r = rapat(isi);
  const empat = /\b4\b/.test(r) || r.includes("empat");
  const seperempat = r.replace(/\s+/g, "").includes("1/4") || r.includes("seperempat") || r.includes("1 per 4");
  return empat && seperempat;
}

function cocokSayatan(isi: string): boolean {
  const r = rapat(isi);
  return /^(2|dua)( kali| sayatan| gerakan| kali sayatan)?$/.test(r);
}

function JurnalKue() {
  const [pilih, setPilih] = useState("");
  const wajah = [
    { id: "seru", ikon: "😀", teks: "Sangat seru, sekarang aku bisa menghitung pecahan saat memotong pizza!" },
    { id: "hati", ikon: "😐", teks: "Aku harus hati-hati melihat apakah potongannya sama besar atau tidak." },
    { id: "bingung", ikon: "😢", teks: "Aku masih agak bingung menulis posisi angka atas dan bawah pada pecahan." },
  ];
  return (
    <div className="mt-5 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-4">
      <p className="text-sm font-black text-[#1C01A5]">🎭 Jurnal Perasaanku</p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        Bagaimana perasaanmu setelah tahu cara membagi makanan secara adil dengan pecahan hari ini? Ketuk satu wajah.
      </p>
      <div className="mt-3 grid gap-2">
        {wajah.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPilih(item.id)}
            className={`rounded-2xl border-2 px-3 py-3 text-left text-sm font-bold ${
              pilih === item.id
                ? "border-[#F0AB00] bg-[#1C01A5] text-white"
                : "border-[#1C01A5]/15 bg-white text-[#1C01A5]"
            }`}
          >
            <span className="mr-2 text-2xl" aria-hidden>
              {item.ikon}
            </span>
            {item.teks}
          </button>
        ))}
      </div>
    </div>
  );
}

function LembarEvaluasiPecahan() {
  const profil = useMemo(() => bacaProgres().profil, []);
  const [nama, setNama] = useState(profil.nama || "");
  const [tanggal, setTanggal] = useState(
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date()),
  );

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-2">
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Nama
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
            placeholder="______________________"
          />
        </label>
        <label className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">
          Tanggal
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="mt-1 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm font-bold text-[#1C01A5]"
          />
        </label>
      </div>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">🍓 Bagian A: Pilihan Ganda Kontekstual</h5>
        <KuisPilih
          indeks={0}
          benar="B"
          soal={
            <>
              1. Edo membelah roti melon menjadi dua. Potongan yang lebih besar ia berikan kepada adiknya, potongan kecil ia ambil sendiri. Edo berkata, “Kita masing-masing sudah mendapat pecahan <LambangPecahan atas="1" bawah="2" />.” Apakah ucapan Edo benar?
            </>
          }
          pilihan={[
            { huruf: "A", teks: "Benar, karena roti sudah terbelah menjadi 2 bagian yang nyata." },
            { huruf: "B", teks: "Salah, karena 1/2 harus dua bagian yang sama besar. Tidak boleh ada yang besar dan yang kecil." },
            { huruf: "C", teks: "Benar, karena adiknya mendapatkan bagian yang lebih banyak." },
          ]}
        />
        <KuisPilih
          indeks={1}
          benar="B"
          soal="2. Siti melipat kertas segi empat menjadi 4 bagian yang sama besar, mengguntingnya, lalu memberi 1 potongan kepada Lani. Nilai pecahan kertas Lani adalah..."
          pilihan={[
            { huruf: "A", teks: <LambangPecahan atas="1" bawah="2" /> },
            { huruf: "B", teks: <LambangPecahan atas="1" bawah="4" /> },
            { huruf: "C", teks: <LambangPecahan atas="4" bawah="1" /> },
          ]}
        />
        <KuisPilih
          indeks={2}
          benar="B"
          soal="3. Di piring Dodi tersisa 2 potongan martabak yang sama besar. Jika digabung rapat, keduanya membentuk 1 martabak utuh. Setiap satu potongan bernilai..."
          pilihan={[
            { huruf: "A", teks: <>Pecahan <LambangPecahan atas="1" bawah="4" /></> },
            { huruf: "B", teks: <>Pecahan <LambangPecahan atas="1" bawah="2" /></> },
            { huruf: "C", teks: <>Pecahan <LambangPecahan atas="2" bawah="1" /></> },
          ]}
        />
        <KuisPilih
          indeks={3}
          benar="A"
          soal="4. Nilai pecahan bagian puding yang berwarna GELAP adalah..."
          anak={<PudingSetengah />}
          pilihan={[
            { huruf: "A", teks: <LambangPecahan atas="1" bawah="2" /> },
            { huruf: "B", teks: <LambangPecahan atas="1" bawah="4" /> },
            { huruf: "C", teks: <LambangPecahan atas="2" bawah="2" /> },
          ]}
        />
        <KuisPilih
          indeks={4}
          benar="A"
          soal="5. Dua kue bolu ukurannya sama. Kue Manggis dipotong 2 sama besar, Sani ambil 1. Kue Durian dipotong 4 sama besar, Sani ambil 1. Pernyataan yang paling tepat adalah..."
          anak={
            <div className="flex flex-wrap justify-center gap-6">
              <KueAdil bagian={2} gelap={1} judul="Manggis · 1 potong dari 2" />
              <KueAdil bagian={4} gelap={1} judul="Durian · 1 potong dari 4" />
            </div>
          }
          pilihan={[
            { huruf: "A", teks: "Potongan Kue Manggis (1/2) lebih besar daripada potongan Kue Durian (1/4)." },
            { huruf: "B", teks: "Potongan Kue Durian (1/4) lebih besar karena angka 4 lebih besar dari angka 2." },
            { huruf: "C", teks: "Kedua potongan sama besar karena Sani sama-sama mengambil 1 potong." },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h5 className="text-base font-black text-[#1C01A5]">✏️ Bagian B: Isian Singkat & Penalaran</h5>
        <KuisIsian
          indeks={5}
          soal="6. Kertas lingkaran utuh dipotong merata menjadi empat bagian sama besar. Lambang pecahan seperempat ditulis..."
          cocok={cocokSeperempat}
          pesanSalah="Seperempat ditulis 1/4. Angka 1 di atas, angka 4 di bawah."
        />
        <KuisIsian
          indeks={6}
          soal="7. Pizza dipotong menjadi 4 bagian sama besar. Kakak mengambil 1 potong, adik mengambil 1 potong. Berapa bagian yang masih tersisa dari total 4 potong?"
          cocok={cocokSisa}
          pesanSalah="Yang tersisa 2 potong dari 4, atau 2/4."
        />
        <KuisIsian
          indeks={7}
          soal="8. Cocokkan cerita dengan lambang pecahannya."
          cocok={cocokPasangan}
          pesanSalah="Nomor 1 adalah 1/2, jadi huruf B. Nomor 2 adalah 1/4, jadi huruf A. Tulis 1B 2A."
          anak={
            <div className="rounded-xl bg-white px-3 py-3 text-sm font-semibold text-slate-700">
              <p>(1) Riko membelah cokelat menjadi dua bagian yang sama panjang.</p>
              <p>(2) Lani memotong kertas hias persegi menjadi empat bagian sama besar.</p>
              <p className="mt-2">A. 1/4</p>
              <p>B. 1/2</p>
              <p className="mt-2 font-bold text-[#1C01A5]">Contoh tulis: 1B 2A</p>
            </div>
          }
        />
        <KuisIsian
          indeks={8}
          soal="9. Riko melipat kertas tepat di tengah (setengah). Tanpa membuka lipatan, ia melipat sekali lagi dengan arah yang sama. Jika dibuka, kertas terbagi menjadi berapa bagian, dan tiap bagian bernilai pecahan berapa?"
          cocok={cocokLipat}
          pesanSalah="Dua lipatan searah membuka menjadi 4 bagian sama besar. Tiap bagian 1/4."
        />
        <KuisIsian
          indeks={9}
          soal="10. Jeruk utuh ingin dipotong agar tiap potongan bernilai 1/4. Berapa kali gerakan memotong lurus yang membelah jeruk sampai selesai?"
          cocok={cocokSayatan}
          pesanSalah="Sayat lurus pertama membagi jeruk menjadi 2. Sayat kedua membagi lagi menjadi 4. Jadi 2 kali."
        />
      </section>
    </div>
  );
}

function PilihYaTidak({
  nilai,
  onPilih,
}: {
  nilai: string;
  onPilih: (isi: string) => void;
}) {
  return (
    <div className="mt-2 flex gap-2">
      {["Ya", "Tidak"].map((opsi) => (
        <button
          key={opsi}
          type="button"
          onClick={() => onPilih(opsi)}
          className={`rounded-xl px-4 py-2 text-sm font-black ${
            nilai === opsi ? "bg-[#1C01A5] text-white" : "bg-white text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
          }`}
        >
          {opsi}
        </button>
      ))}
    </div>
  );
}

function AktivitasCokelat() {
  const kuis = useKuisMateri();
  const [aSama, setASama] = useState("");
  const [aPecahan, setAPecahan] = useState("");
  const [bSama, setBSama] = useState("");
  const [alasan, setAlasan] = useState("");
  const [status, setStatus] = useState<"benar" | "salah" | null>(null);

  const periksa = () => {
    const alasanRapat = alasan.trim().toLowerCase();
    const alasanOk = alasanRapat.includes("sama") || alasanRapat.includes("adil") || alasanRapat.includes("beda");
    const ok = aSama === "Ya" && aPecahan === "Ya" && bSama === "Tidak" && alasanOk;
    if (ok) {
      setStatus("benar");
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB13.id, "C", 0));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB13.id, "C", 1));
      kuis?.tandaiBenar(idKuisKartuResmi(MODUL_MTK2_BAB13.id, "C", 2));
      return;
    }
    setStatus("salah");
  };

  return (
    <div className="mt-5 rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] p-4">
      <p className="text-sm font-black text-[#1C01A5]">🕵️‍♂️ Aktivitas 1: Menjadi Detektif Pemotong Cokelat 🍫</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">
        Bantu Sani memeriksa apakah potongan cokelat sudah termasuk pecahan yang sah.
      </p>
      <div className="mt-4 space-y-4">
        <div className="rounded-2xl bg-white p-3">
          <p className="text-sm font-black text-[#1C01A5]">Cokelat A · dipotong di tengah</p>
          <BatangCokelat adil />
          <p className="mt-3 text-sm font-semibold text-slate-700">Apakah kedua potongan ukurannya sama besar?</p>
          <PilihYaTidak nilai={aSama} onPilih={setASama} />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Apakah potongan ini boleh disebut pecahan <LambangPecahan atas="1" bawah="2" />?
          </p>
          <PilihYaTidak nilai={aPecahan} onPilih={setAPecahan} />
        </div>
        <div className="rounded-2xl bg-white p-3">
          <p className="text-sm font-black text-[#1C01A5]">Cokelat B · dipotong di pinggir</p>
          <BatangCokelat adil={false} />
          <p className="mt-3 text-sm font-semibold text-slate-700">Apakah kedua potongan ukurannya sama besar?</p>
          <PilihYaTidak nilai={bSama} onPilih={setBSama} />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Mengapa potongan Cokelat B tidak boleh dinamakan pecahan setengah? Karena potongannya tidak...
          </p>
          <input
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            className="mt-2 w-full rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 font-extrabold text-[#1C01A5]"
            placeholder="sama besar"
          />
        </div>
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
          cuplikan={[aSama, aPecahan, bSama, alasan].filter(Boolean).join(" · ") || undefined}
          pesanSalah="Cokelat A: Ya, sama besar, dan Ya, itu 1/2. Cokelat B: Tidak. Potongannya tidak sama besar."
        />
      </div>
    </div>
  );
}

function KuisMencocokkanPecahan() {
  const kuis = useKuisMateri();
  const [pilihan, setPilihan] = useState<Record<number, string>>({});
  const pasangan = [
    { gambar: "1 kue dipotong menjadi 2 bagian sama besar", label: "Satu bagian disebut", benar: "1/2" },
    { gambar: "Angka di bawah garis pada seperempat", label: "Jumlah seluruh potongan", benar: "4" },
    { gambar: "1 kue dipotong menjadi 4 bagian sama besar", label: "Satu bagian disebut", benar: "1/4" },
  ] as const;

  return (
    <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ: Cocokkan ke hasilnya</p>
      {pasangan.map((item, indeks) => {
        const id = idKuisKartuResmi(MODUL_MTK2_BAB13.id, "B", indeks);
        const ketuk = pilihan[indeks] ?? "";
        const status = statusDariPilihan(ketuk, item.benar);
        const opsi = indeks === 0 ? ["1/4", "1/2", "2/1"] : indeks === 1 ? ["1", "2", "4"] : ["1/2", "4/1", "1/4"];
        return (
          <article key={`${item.benar}-${indeks}`} className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-semibold text-slate-600">{item.gambar}</p>
            <p className="mt-1 text-sm font-black text-[#1C01A5]">{item.label}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {opsi.map((angka) => (
                <button
                  key={angka}
                  type="button"
                  onClick={() => {
                    setPilihan((sebelum) => ({ ...sebelum, [indeks]: angka }));
                    if (angka === item.benar) kuis?.tandaiBenar(id);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-black ${kelasTombolHasilKuis(
                    ketuk,
                    angka,
                    item.benar,
                    "bg-[#1C01A5] text-white hover:bg-[#16017a]",
                  )}`}
                >
                  {angka}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <HasilJawabanKuis
                status={status}
                cuplikan={ketuk || undefined}
                pesanSalah="Dua bagian sama besar = 1/2. Empat bagian sama besar = 1/4. Angka bawah 1/4 adalah 4."
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function NaskahMtk2Bab13({
  kelas = "2 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  const modul = MODUL_MTK2_BAB13;
  const [kartuA, kartuB, kartuC, kartuD] = modul.kartu;

  return (
    <div className="space-y-5">
      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🎒🎂🍰
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">
          {kartuA.judul}
        </h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuA.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuA.pengantar}</p>
        <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">🌟 Target Belajarku Hari Ini</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            🎯 Aku bisa memahami konsep pecahan dasar melalui benda yang dibagi adil sama besar.
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            🎯 Aku bisa mengenal pecahan setengah (<LambangPecahan atas="1" bawah="2" />) dan seperempat (
            <LambangPecahan atas="1" bawah="4" />) dengan tepat.
          </p>
        </div>
        <div className="mt-4 space-y-3">
          <article className="rounded-2xl border-2 border-[#DB2777]/20 bg-[#FDF2F8] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#9D174D]">
              🗺️ Cerita: Memotong Kue Secara Adil
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Hari ini Toko Permen Sani merayakan ulang tahun yang kedua. Sani sudah menyiapkan 1 buah kue bolu
              cokelat yang besar dan utuh. Lani datang berkunjung, dan Sani ingin membagi kue itu.
            </p>
            <div className="mt-3 flex justify-center">
              <KueUtuh />
            </div>
          </article>
          <article className="rounded-2xl border-2 border-[#2563EB]/20 bg-[#EFF6FF] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Lani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Sani, kalau memotongnya asal-asalan, nanti ada potongan yang besar dan ada yang kecil. Itu tidak adil!”
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#0F766E]/20 bg-[#F0FDFA] px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#0F766E]">Sani</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">
              “Benar, Lani! Kita harus memotongnya tepat di tengah agar kedua bagiannya sama besar dan adil!”
            </p>
          </article>
          <p className="rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
            Yuk, kita bantu Sani memotong kue ini menjadi bagian-bagian pecahan yang adil!
          </p>
        </div>
        <LatihanSuaraResmi soal={kartuA.kuis} idPrefix={`${modul.id}-${kartuA.kode}`} hanyaKanvas />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🍰🍕
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuB.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuB.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuB.pengantar}</p>
        <article className="mt-4 rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-[#0F766E]">Ingat kunci ini</p>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
            Jika potongan bendanya tidak sama besar, potongan itu bukan disebut pecahan dalam matematika.
          </p>
        </article>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-black text-[#1C01A5]">
              A. Setengah <LambangPecahan atas="1" bawah="2" />
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Sani memotong 1 kue utuh menjadi 2 bagian sama besar. Setiap 1 bagian yang didapat Sani atau Lani disebut
              setengah atau seperdua.
            </p>
            <div className="mt-3 flex justify-center">
              <KueAdil bagian={2} judul="1/2 + 1/2" />
            </div>
            <p className="mt-2 text-center text-xs font-bold text-slate-600">
              Angka 1 di atas = bagian yang diambil. Angka 2 di bawah = seluruh potongan.
            </p>
          </article>
          <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
            <p className="text-sm font-black text-[#1C01A5]">
              B. Seperempat <LambangPecahan atas="1" bawah="4" />
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
              Riko dan Dodi ikut datang. Sekarang ada 4 orang. Kue dipotong menjadi 4 bagian sama besar. Setiap orang
              mendapat seperempat.
            </p>
            <div className="mt-3 flex justify-center">
              <KueAdil bagian={4} judul="1/4 + 1/4 + 1/4 + 1/4" />
            </div>
            <p className="mt-2 text-center text-xs font-bold text-slate-600">
              Angka 1 di atas = bagian per anak. Angka 4 di bawah = ada 4 potongan.
            </p>
          </article>
        </div>
        <KuisMencocokkanPecahan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB13.id, "B")}
          pertanyaan="Tuliskan satu lambang pecahan, misalnya 1/2 atau 1/4."
          alias={kumpulkanAlias(["1/2", "1/4", "setengah", "seperempat"])}
          konteks={kartuB.pengantar}
          hanyaKanvas
        />
      </KartuBingkai>

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          🕵️‍♂️🍫
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuC.judul}</h4>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuC.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuC.pengantar}</p>
        <AktivitasCokelat />
        <LatihanSuaraResmi soal={kartuC.kuis} idPrefix={`${modul.id}-${kartuC.kode}`} hanyaKanvas />
        <JurnalKue />
      </KartuBingkai>

      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />

      <KartuBingkai>
        <p className="text-center text-4xl" aria-hidden>
          📝🍰
        </p>
        <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{kartuD.judul}</h4>
        <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">
          Tantangan Para Juara · Pecahan Dasar
        </p>
        <div className="mt-4">
          <TombolVoiceMateriPai1
            kelas={kelas}
            kelamin={kelamin}
            cuplikan={cuplikanDariNaskah(kartuD.voice, 2_000, 3_000)}
          />
        </div>
        <p className="mt-4 text-left text-base font-semibold leading-relaxed text-slate-700">{kartuD.pengantar}</p>
        <LembarEvaluasiPecahan />
        <KuisTulisKartu
          id={idKuisTulisKartu(MODUL_MTK2_BAB13.id, "D")}
          hanyaKanvas
          pertanyaan="Tuliskan satu jawaban dari evaluasi, misalnya 1/4 atau 1B 2A."
          alias={kumpulkanAlias(["1/4", "1/2", "1b", "2a", "seperempat"])}
          konteks={kartuD.pengantar}
        />
      </KartuBingkai>
    </div>
  );
}
