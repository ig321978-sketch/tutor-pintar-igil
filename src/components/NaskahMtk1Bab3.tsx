"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB3 } from "@/lib/modul-resmi-mtk-1-bab3";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB3.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function duaCaraEmpat(teks: string): boolean {
  const padat = teks.toLowerCase().replace(/\s+/g, "");
  const unik = new Set(
    [...padat.matchAll(/(\d+)-(\d+)=4/g)]
      .map((temuan) => {
        const kiri = Number(temuan[1]);
        const kanan = Number(temuan[2]);
        if (kiri - kanan !== 4 || kiri > 10 || kanan > 10 || kanan < 0) return "";
        return `${kiri}-${kanan}`;
      })
      .filter(Boolean),
  );
  return unik.size >= 2;
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  return (
    <p className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-sm font-semibold leading-relaxed text-slate-700">
      <span className="font-black text-[#1C01A5]">{nama}: </span>
      {anak}
    </p>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
  onNilai,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
  onNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3 text-2xl leading-relaxed">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button
            key={item.huruf}
            type="button"
            onClick={() => {
              setPilih(item.huruf);
              const tepat = item.huruf === benar;
              if (tepat) kuis?.tandaiBenar(id);
              onNilai?.(tepat);
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
        <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function KuisCocok({
  id,
  perintah,
  baris,
  umpan,
}: {
  id: string;
  perintah: string;
  baris: { kiri: string; pilihan: string[]; benar: string }[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, string>>({});
  const [aktif, setAktif] = useState(0);
  const [cek, setCek] = useState(false);
  const lengkap = baris.every((_, indeks) => peta[indeks]);
  const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
  return (
    <article className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
      <p className="text-sm font-black text-amber-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-amber-900">Ketuk gambar, lalu ketuk kalimatnya.</p>
      <div className="mt-3 grid gap-2">
        {baris.map((item, indeks) => {
          const warna = !cek
            ? "border-amber-200 bg-white"
            : peta[indeks] === item.benar
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-300 bg-rose-50";
          return (
            <button
              key={item.kiri}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-amber-400" : ""}`}
            >
              <span className="text-lg">{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button
            key={kalimat}
            type="button"
            onClick={() => {
              setPeta((lama) => ({ ...lama, [aktif]: kalimat }));
              setCek(false);
            }}
            className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20"
          >
            {kalimat}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={!lengkap}
        onClick={() => {
          setCek(true);
          if (tepat) kuis?.tandaiBenar(id);
        }}
        className="mt-3 rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Coba hitung sisa tiap gambar." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function SusunBalok({
  id,
  judul,
  pool,
  jawaban,
  umpan,
}: {
  id: string;
  judul: string;
  pool: string[];
  jawaban: string[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = pool.filter((balok) => !susun.includes(balok));
  const periksa = () => {
    const tepat = jawaban.includes(susun.join(""));
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50/70 p-4">
      <p className="text-sm font-black text-sky-950">{judul}</p>
      <div className="mt-3 flex min-h-14 flex-wrap gap-2 rounded-2xl bg-white p-3">
        {susun.map((balok, indeks) => (
          <button
            key={`${balok}-${indeks}`}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => lama.filter((_, urut) => urut !== indeks));
            }}
            className="rounded-xl bg-[#1C01A5] px-3 py-2 text-lg font-black text-white"
          >
            {balok}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((balok) => (
          <button
            key={balok}
            type="button"
            onClick={() => {
              setStatus(null);
              setSusun((lama) => [...lama, balok]);
            }}
            className="rounded-xl bg-white px-3 py-2 text-lg font-black text-[#1C01A5] ring-2 ring-sky-200"
          >
            {balok}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={periksa}
        className="mt-3 rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white"
      >
        Periksa susunan
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Coba mulai dari angka yang lebih besar." />
        <Umpan status={status} teks={umpan} />
      </div>
    </article>
  );
}

function DuaCaraEmpat() {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = (data: string) => {
    if (data.startsWith("data:image")) {
      setStatus("salah");
      setCuplikan("tulisan tangan");
      return;
    }
    setCuplikan(data.trim());
    const ok = duaCaraEmpat(data);
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(idKuis("D", 4));
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      <p className="text-center text-2xl font-black text-[#1C01A5]">□ - □ = 4 &nbsp; □ - □ = 4</p>
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        5. Tulis 2 cara berbeda pengurangan yang hasilnya 4.
      </p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis
        status={status}
        cuplikan={cuplikan || undefined}
        pesanSalah="Tulis dua kalimat yang berbeda, misalnya 5 - 1 = 4 dan 6 - 2 = 4."
      />
      <Umpan status={status} teks="Dua jalan yang berbeda, hasilnya sama-sama 4." />
    </div>
  );
}

function HookPesta() {
  return (
    <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 p-4 text-slate-800">
      <p className="text-sm font-black uppercase tracking-wide text-rose-700">Pesta Ulang Tahun yang Hilang</p>
      <p className="mt-2 text-3xl" aria-hidden>
        🎈🎈🎈🎈🎈🎈🎈🎈
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed">
        Malam ini pesta di rumah Nia. Mejanya penuh kue, dindingnya penuh balon. Nia menghitung, &quot;Satu, dua, tiga, empat, lima, enam, tujuh… delapan!&quot;
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed">
        Jendela terbuka. Angin masuk. Satu, dua, tiga balon lepas dan terbang ke langit malam.
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed">
        Fajar terbelalak. &quot;Niaaa! Balonnya!&quot; Nia bertanya, &quot;Bagaimana caranya aku tahu sekarang tinggal berapa?&quot;
      </p>
      <p className="mt-2 text-sm font-semibold leading-relaxed">
        Dari balik kue muncul suara kecil, &quot;Cik-cik-cik!&quot; Miko si tikus berkacamata mengangkat satu jari. &quot;Ada rahasia, tapi kalian harus belajar mengurangi.&quot;
      </p>
    </div>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB3.kartu[0];
  const [kedip, setKedip] = useState(0);
  const [suaraA, setSuaraA] = useState<StatusJawabanKuis>(null);
  return (
    <KartuBingkai>
      <h3 className="text-xl font-black text-[#1C01A5]">{kartu.judul}</h3>
      <div className="mt-3">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartu.voice, 2000, 3000)} />
      </div>
      <div className="mt-4">
        <HookPesta />
      </div>
      <div className="mt-4 grid gap-3">
        <Dialog nama="Nia" anak="Wah, balonnya banyak sekali!" />
        <Dialog nama="Fajar" anak="Ayo hitung! Satu, dua, tiga, empat, lima, enam, tujuh… delapan!" />
        <Dialog nama="Miko" anak="Cik-cik! Delapan balon siap untuk pesta!" />
        <p className="text-3xl" aria-hidden>🎈🎈🎈🎈🎈🎈🎈🎈</p>
        <Dialog nama="Nia" anak="Aduh! Balonnya terbang!" />
        <Dialog nama="Fajar" anak="Ada 3 yang lepas!" />
        <Dialog nama="Miko" anak="Sekarang tinggal berapa, ya?" />
        <p className="text-sm font-semibold text-slate-600">Balon yang tersisa: satu, dua, tiga, empat, lima.</p>
        <p className="text-3xl" aria-hidden>🎈🎈🎈🎈🎈</p>
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-center text-2xl font-black text-rose-800">8 - 3 = 5</p>
        <Dialog nama="Miko" anak="Benar! Dulu 8, yang hilang 3, sisa 5." />
        <Dialog nama="Fajar" anak="Tanda satu garis itu apa?" />
        <Dialog nama="Miko" anak="Itu tanda kurang. Artinya diambil atau dipisahkan!" />
        <Dialog nama="Nia" anak="Kalau begitu, jumlahnya jadi lebih sedikit." />
        <p className="text-center text-4xl" aria-hidden>➖ 📦</p>
        <Dialog nama="Fajar" anak="Aku makan 2 potong kue, ya!" />
        <Dialog nama="Miko" anak="Ayo hitung mundur dari 6: lima… empat!" />
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-center text-2xl font-black text-amber-900">6 - 2 = 4</p>
        <Dialog nama="Nia" anak="Ada 9 topi. Tamu mengambil 4 topi." />
        <Dialog nama="Miko" anak="Hitung mundur dari 9: delapan, tujuh, enam… lima!" />
        <p className="rounded-2xl bg-sky-50 px-4 py-3 text-center text-2xl font-black text-sky-900">9 - 4 = 5</p>
      </div>
      <div className="mt-4">
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Ada 6 balon. Dua balon terbang. Sisa berapa? Ucapkan dengan keras!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["empat", "4"])}
          petunjuk="Ucapkan dengan keras."
          sesudahNilai={(benar) => setSuaraA(benar ? "benar" : "salah")}
        />
        {suaraA === "benar" ? (
          <p className="mt-2 text-sm font-bold text-emerald-800">Cik-cik! Kamu teliti sekali!</p>
        ) : null}
        {suaraA === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Ayo hitung mundur dari angka enam, ya!</p>
        ) : null}
      </div>
      <div className="mt-4">
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis jumlah kue yang masih tersisa di kotak!"
          alias={["4", "empat"]}
          visual={
            <p className={`text-3xl ${kedip >= 2 ? "animate-pulse" : ""}`} aria-hidden>
              🍪🍪🍪🍪<span className="opacity-40 line-through">🍪🍪🍪</span>
            </p>
          }
          sesudahNilai={(benar) => {
            if (!benar) setKedip((n) => n + 1);
          }}
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB3.kartu[1];
  const kalimat = ["6 - 2 = 4", "4 - 1 = 3", "9 - 5 = 4"];
  return (
    <KartuBingkai>
      <h3 className="text-xl font-black text-[#1C01A5]">{kartu.judul}</h3>
      <div className="mt-3">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartu.voice, 2000, 3000)} />
      </div>
      <div className="mt-4 grid gap-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p className="rounded-2xl bg-orange-50 px-4 py-3">
          <span className="font-black text-orange-800">Mengurangi = mengambil sebagian. </span>
          🍊🍊🍊🍊🍊 dikurangi 🍊🍊 sama dengan 🍊🍊🍊. Lima kurang dua sama dengan tiga.
        </p>
        <p>5 jumlah awal. Tanda kurang artinya diambil. 2 yang keluar. Tanda sama dengan. 3 sisa.</p>
        <p className="rounded-2xl bg-sky-50 px-4 py-3">
          Semuanya 8 balon. Yang hilang 3. Sisa 5. Tanya dulu: semuanya berapa, yang hilang berapa, sisanya berapa?
        </p>
        <p>Cara 1, hitung yang tersisa. ⭐⭐⭐⭐⭐⭐⭐ dikurangi 3 bintang. Yang tidak dicoret ada 4. 7 - 3 = 4.</p>
        <p>Cara 2, lompat mundur. Simpan 9, lompat 4 kali: 8, 7, 6, 5. 9 - 4 = 5.</p>
        <p className="font-black tracking-wide text-[#1C01A5]">0 — 1 — 2 — 3 — 4 — 5 ← 6 ← 7 ← 8 ← 9 — 10</p>
        <p>Cara 3, pakai jari. Angkat 8 jari, lipat 3, yang terbuka 5. 8 - 3 = 5.</p>
        <p>
          Soal cerita: Nia punya 7 balon, 3 terbang. Kata kunci terbang, hilang, diambil, dimakan, dipakai, diberikan, pecah, tersisa, tinggal. 7 - 3 = 4.
        </p>
        <p>Tambah dan kurang itu saudara. 5 + 3 = 8, jadi 8 - 3 = 5.</p>
        <p>Kurang nol, angkanya tetap. 5 - 0 = 5. Tidak ada yang diambil.</p>
      </div>
      <div className="mt-4 grid gap-3">
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Tarik garis dari gambar ke kalimat matematika yang benar!"
          baris={[
            { kiri: "🐠🐠🐠🐠🐠🐠 - 🐠🐠", pilihan: kalimat, benar: "6 - 2 = 4" },
            { kiri: "🍬🍬🍬🍬 - 🍬", pilihan: kalimat, benar: "4 - 1 = 3" },
            { kiri: "🐦🐦🐦🐦🐦🐦🐦🐦🐦 - 🐦🐦🐦🐦🐦", pilihan: kalimat, benar: "9 - 5 = 4" },
          ]}
          umpan="Ikan 6 kurang 2, permen 4 kurang 1, burung 9 kurang 5."
        />
        <SusunBalok
          id={idKuis("B", 1)}
          judul="Susun balok supaya jadi kalimat matematika yang benar!"
          pool={["2", "=", "-", "7", "5"]}
          jawaban={["7-5=2", "7-2=5"]}
          umpan="7 - 5 = 2 atau 7 - 2 = 5."
        />
        <Pilih
          id={idKuis("B", 2)}
          pertanyaan="Semua kartu menyisakan angka yang sama, kecuali satu. Ketuk kartu yang berbeda!"
          pilihan={[
            { huruf: "A", teks: "8 - 3" },
            { huruf: "B", teks: "6 - 1" },
            { huruf: "C", teks: "9 - 5" },
            { huruf: "D", teks: "7 - 2" },
          ]}
          benar="C"
          umpan="9 - 5 sisanya 4. Kartu lain sisanya 5."
          salah="Hitung sisa tiap kartu. Tiga kartu sisanya sama."
        />
        <SoalRekamSuara
          id={idKuis("B", 3)}
          pertanyaan="Ada 10 permen. Kamu makan 4 permen. Sisa permenmu berapa? Ucapkan!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam", "6"])}
          petunjuk="Ucapkan sisa permennya."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Fajar punya 8 kue. Ia memberi 5 kue ke temannya. Tulis kalimat matematika dan sisanya!"
          alias={["8 - 5 = 3", "8-5=3"]}
          visual={<p className="text-2xl font-black text-[#1C01A5]">8 - 5 = ?</p>}
        />
      </div>
    </KartuBingkai>
  );
}

function TokoRoti({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB3.kartu[2];
  const [jalur, setJalur] = useState({ ramah: false, buru: false });
  const [garansi, setGaransi] = useState(false);
  const [lonceng, setLonceng] = useState(false);
  const [seret, setSeret] = useState(false);
  const sudah = (kode: string, indeks: number) => Boolean(kuis?.sudahBenar(idKuis(kode, indeks)));
  const tulisSiap = Boolean(kuis?.sudahBenar(idKuisTulisKartu(ID, "C")));
  const roti = useMemo(() => {
    let jumlah = 0;
    if (sudah("C", 0)) jumlah += 1;
    if (sudah("C", 1)) jumlah += 2;
    if (sudah("C", 2)) jumlah += 3;
    if (sudah("C", 3)) jumlah += 1;
    if (jalur.ramah) jumlah += 1;
    if (jalur.buru) jumlah += 3;
    if (tulisSiap) jumlah += 2;
    if (garansi) jumlah = Math.max(0, jumlah - 2);
    return jumlah;
  }, [kuis, jalur, garansi, tulisSiap]);
  const cabang = roti >= 10;
  return (
    <KartuBingkai>
      <h3 className="text-xl font-black text-[#1C01A5]">{kartu.judul}</h3>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">
        Kamu menjaga toko roti. Setiap pelanggan membeli, hitung roti yang tersisa. Cabang baru terbuka kalau sisanya benar.
      </p>
      <div className="mt-3">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartu.voice, 2000, 3000)} />
      </div>
      <p className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-lg font-black text-orange-900">
        Roti {roti}/10 {cabang ? "· Cabang Toko Miko terbuka 👨‍🍳" : ""}
      </p>
      <p className="mt-2 text-3xl" aria-hidden>🥐🥖🍞🥯 🔔 🐭</p>
      <div className="mt-4 grid gap-3">
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-4">
          <p className="text-sm font-black text-emerald-950">Level 1 · Rak roti</p>
          <p className="mt-2 text-sm font-semibold text-emerald-950">Di rak ada 7 roti. Pelanggan membeli 3. Seret 3 roti ke keranjang.</p>
          <p className="mt-2 text-2xl">{seret ? "🥐🥐🥐🥐" : "🥐🥐🥐🥐🥐🥐🥐"}</p>
          <button
            type="button"
            onClick={() => setSeret(true)}
            className="mt-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white"
          >
            Seret 3 roti ke keranjang
          </button>
          {seret ? <p className="mt-2 text-sm font-bold text-emerald-900">Satu… dua… tiga… empat!</p> : null}
          {seret ? (
            <div className="mt-3">
              <Pilih
                id={idKuis("C", 0)}
                pertanyaan="Roti yang tersisa di rak berapa?"
                pilihan={[
                  { huruf: "A", teks: "3" },
                  { huruf: "B", teks: "4" },
                  { huruf: "C", teks: "7" },
                ]}
                benar="B"
                umpan="+1 roti. Sisa 4."
                salah="Lonceng berbunyi. Roti kembali ke rak. Hitung yang masih di rak."
                onNilai={(benar) => setLonceng(!benar)}
              />
            </div>
          ) : null}
        </article>
        <KuisTulisKartu
          id={idKuis("C", 1)}
          pertanyaan="Muncul nota: 9 □ 4 □ 5. Tulis kalimatnya lengkap dengan tanda kurang dan sama dengan."
          alias={["9 - 4 = 5", "9-4=5"]}
          visual={<p className="text-2xl font-black">9 □ 4 □ 5</p>}
        />
        <p className="text-xs font-bold text-amber-800">Hadiah level ini +2 roti.</p>
        <KuisTulisKartu
          id={idKuis("C", 2)}
          pertanyaan='Pelanggan berkata: "Aku beli 5 donat. Tapi 2 donat jatuh dan rusak. Berapa donat yang masih bagus?" Tulis kalimatnya.'
          alias={["5 - 2 = 3", "5-2=3"]}
          visual={<p className="text-2xl">🍩🍩🍩🍩🍩</p>}
        />
        <p className="text-xs font-bold text-rose-800">Hadiah level ini +3 roti.</p>
        <article className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-black text-amber-950">Pilih pelanggan</p>
          <p className="mt-1 text-sm font-semibold text-amber-900">
            Pelanggan ramah: soal mudah, +1 roti. Pelanggan buru-buru: soal cerita, +3 roti.
          </p>
          <div className="mt-3">
            <Pilih
              id={idKuis("C", 4)}
              pertanyaan="Pelanggan ramah: ada 4 roti, dibeli 1. Sisa berapa?"
              pilihan={[
                { huruf: "A", teks: "2" },
                { huruf: "B", teks: "3" },
                { huruf: "C", teks: "5" },
              ]}
              benar="B"
              umpan="+1 roti dari pelanggan ramah."
              salah="Lonceng berbunyi. Hitung mundur dari 4: tiga."
              onNilai={(benar) => {
                setLonceng(!benar);
                if (benar) setJalur((lama) => ({ ...lama, ramah: true }));
              }}
            />
          </div>
          <div className="mt-3">
            <KuisTulisKartu
              id={idKuis("C", 4)}
              pertanyaan="Pelanggan buru-buru: rak ada 8 roti. Ia membeli 3. Tulis sisanya."
              alias={["5", "lima", "8 - 3 = 5", "8-3=5"]}
              sesudahNilai={(benar) => {
                setLonceng(!benar);
                if (benar) setJalur((lama) => ({ ...lama, buru: true }));
              }}
            />
          </div>
        </article>
        <SoalRekamSuara
          id={idKuis("C", 3)}
          pertanyaan="Pelanggan membeli 3 donat dari 9 donat di rak. Sisa donat berapa? Ucapkan jawabannya!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam", "6"])}
          petunjuk="Ucapkan sisa donatnya."
          sesudahNilai={(benar) => setLonceng(!benar)}
        />
        <p className="text-xs font-bold text-sky-800">Hadiah suara ini +1 roti.</p>
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "C")}
          pertanyaan="Rak toko punya 10 roti. Sudah terjual 4 roti. Tulis berapa roti yang masih ada!"
          alias={["6", "enam", "10 - 4 = 6", "10-4=6"]}
          visual={<p className="text-2xl font-black">10 - 4 = □</p>}
        />
        <p className="text-xs font-bold text-emerald-800">Hadiah tulisan ini +2 roti.</p>
        <button
          type="button"
          disabled={garansi || roti < 2}
          onClick={() => setGaransi(true)}
          className="rounded-full bg-slate-800 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
        >
          Kartu garansi (−2 roti): lihat garis bilangan
        </button>
        {garansi ? (
          <p className="text-sm font-bold text-slate-700">0 — 1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10. Lompat mundur dari angka yang besar.</p>
        ) : null}
        {lonceng ? (
          <p className="text-sm font-bold text-rose-800">Lonceng berbunyi. Roti kembali ke rak. Rotimu yang sudah benar tetap aman. Coba lagi.</p>
        ) : null}
        <p className="rounded-2xl bg-[#F8F7FF] px-4 py-3 text-sm font-semibold text-slate-700">
          Mode berdua: dua penjaga menggabungkan roti untuk oven baru. Contoh persediaan: 10 - 3 = 7.
        </p>
        {cabang ? (
          <p className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-black text-amber-950">
            Cabang Toko Miko terbuka. Topi koki untukmu.
          </p>
        ) : null}
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const nama = useMemo(() => bacaProgres().profil.nama.trim(), []);
  const [pasarTulis, setPasarTulis] = useState(false);
  const [pasarSuara, setPasarSuara] = useState(false);
  const sudahTandaiPasar = useRef(false);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana =
    skor >= 9
      ? { nama: "Kepala Toko Miko", pesan: "Luar biasa! Toko rotimu paling laris!" }
      : skor >= 6
        ? { nama: "Penjaga Rak Hebat", pesan: "Hebat! Sedikit lagi jadi kepala toko!" }
        : { nama: "Sahabat Miko", pesan: "Ayo jaga toko lagi bersama Miko, kamu pasti bisa!" };
  useEffect(() => {
    if (!pasarTulis || !pasarSuara || sudahTandaiPasar.current) return;
    sudahTandaiPasar.current = true;
    kuis?.tandaiBenar(idKuis("D", 6));
  }, [pasarTulis, pasarSuara, kuis]);
  const kartu = MODUL_MTK1_BAB3.kartu[3];
  const kalimatPasangan = ["6 - 2", "8 - 6", "10 - 8"];
  return (
    <KartuBingkai>
      <h3 className="text-xl font-black text-[#1C01A5]">{kartu.judul}</h3>
      <div className="mt-3">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanDariNaskah(kartu.voice, 2000, 3000)} />
      </div>
      <ul className="mt-4 grid gap-2 text-sm font-semibold leading-relaxed text-slate-700">
        <li>Kurang artinya diambil atau dipisah. Benda yang hilang jadi lebih sedikit.</li>
        <li>Semuanya, yang diambil, lalu sisa.</li>
        <li>Hitung mundur dari yang besar. 9 - 4: delapan, tujuh, enam, lima.</li>
        <li>Kurang nol, tetap sama. 7 - 0 = 7.</li>
        <li>Tambah dan kurang itu saudara. 5 + 3 = 8, jadi 8 - 3 = 5.</li>
        <li>Cari angka, cari kata kunci, lalu hitung mundur.</li>
      </ul>
      <div className="mt-4 rounded-2xl bg-orange-50 px-4 py-3 text-sm font-bold text-orange-950">
        <p>Nama: {nama || "____________"} · Kelas: 1 · Skor: {skor}/10</p>
        <p className="mt-1">{lencana.nama}. {lencana.pesan}</p>
      </div>
      <div className="mt-4 grid gap-3">
        <KuisTulisKartu
          id={idKuis("D", 0)}
          pertanyaan="1. Tulis jumlah permen yang masih tersisa!"
          alias={["5", "lima"]}
          visual={<p className="text-2xl">🍬🍬🍬🍬🍬<span className="opacity-40 line-through">🍬🍬🍬🍬</span></p>}
        />
        <KuisTulisKartu
          id={idKuis("D", 1)}
          pertanyaan='2. Ada 7 balon. Sebanyak 4 balon meletus. Gambarlah bulatan untuk balon yang masih ada, lalu tulis kalimat matematikanya.'
          alias={["7 - 4 = 3", "7-4=3"]}
          visual={<p className="text-2xl">🎈🎈🎈 💥💥💥💥</p>}
        />
        <KuisTulisKartu
          id={idKuis("D", 2)}
          pertanyaan="3. Angka berapa yang ada di dalam kotak?"
          alias={["3", "tiga"]}
          visual={<p className="text-2xl font-black">8 - □ = 5</p>}
        />
        <SoalRekamSuara
          id={idKuis("D", 3)}
          pertanyaan='4. Fajar berkata: "9 - 4 = 6!" Apakah Fajar benar? Ucapkan Benar atau Salah, lalu sebutkan jawaban yang benar.'
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["salah", "tidak benar", "tidak tepat", "keliru"],
              ["lima", "5"],
            ])
          }
          petunjuk="Ucapkan Salah, lalu sebutkan lima."
        />
        <DuaCaraEmpat />
        <Pilih
          id={idKuis("D", 5)}
          pertanyaan="6. Nia punya 6 stiker. Ia memberi 6 stiker ke Fajar. Berapa sisa stiker Nia?"
          pilihan={[
            { huruf: "A", teks: "6" },
            { huruf: "B", teks: "1" },
            { huruf: "C", teks: "0" },
          ]}
          benar="C"
          umpan="Semuanya habis. 6 - 6 = 0."
          salah="Nia memberi semua stikernya."
        />
        <KuisTulisKartu
          id={`${ID}-D-pasar`}
          pertanyaan='7. Bu Tuti punya 10 bunga. Sebanyak 6 bunga sudah terjual. Tulis kalimat matematikanya.'
          alias={["10 - 6 = 4", "10-6=4"]}
          visual={<p className="text-2xl">🌷🌷🌷🌷🌷🌷🌷🌷🌷🌷</p>}
          sesudahNilai={(benar) => {
            if (benar) setPasarTulis(true);
          }}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="Ucapkan sisa bunga Bu Tuti."
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["empat", "4"])}
          petunjuk="Sebutkan sisanya."
          sesudahNilai={(benar) => {
            if (benar) setPasarSuara(true);
          }}
        />
        <KuisCocok
          id={idKuis("D", 7)}
          perintah="8. Pasangkan kartu yang hasilnya sama!"
          baris={[
            { kiri: "10 - 6", pilihan: kalimatPasangan, benar: "6 - 2" },
            { kiri: "7 - 5", pilihan: kalimatPasangan, benar: "8 - 6" },
            { kiri: "9 - 7", pilihan: kalimatPasangan, benar: "10 - 8" },
          ]}
          umpan="10 - 6 dan 6 - 2 sama-sama 4. Pasangan lain sama-sama 2."
        />
        <KuisTulisKartu
          id={idKuis("D", 8)}
          pertanyaan="9. Ada 9 boneka dan 5 anak. Setiap anak mengambil 1 boneka. Berapa boneka yang tidak terambil? Tulis angkanya!"
          alias={["4", "empat"]}
          visual={<p className="text-2xl">🧸🧸🧸🧸🧸🧸🧸🧸🧸</p>}
        />
        <SoalRekamSuara
          id={idKuis("D", 9)}
          pertanyaan="10. Ada 8 anak ayam, lalu 3 berjalan pergi. Buatlah cerita pendek, lalu sebutkan hasilnya!"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["delapan", "8"],
              ["tiga", "3"],
              ["lima", "5"],
            ])
          }
          petunjuk="Sebutkan delapan, tiga, dan sisanya lima."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: kurang artinya diambil atau dipisah."
          alias={["kurang artinya diambil atau dipisah", "kurang artinya diambil"]}
        />
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab3({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="grid gap-4">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <TokoRoti kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
