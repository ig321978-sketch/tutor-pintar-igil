"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB7 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB7 } from "@/lib/tema-misi-mtk-1";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB7 } from "@/lib/modul-resmi-mtk-1-bab7";
import { jawabanTulisMemuatAlias, normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB7.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function padat(teks: string): string {
  return normalisasiJawabanTulis(teks).replace(/\s+/g, "");
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function bukanBelasan(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  return !n.includes("belas") && !n.includes("puluh");
}

function jawabTujuhLangkah(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return jawabanTulisMemuatAlias(teks, ["7", "tujuh"]);
}

function jawabEnam(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  return jawabanTulisMemuatAlias(teks, ["6", "enam"]);
}

function jawabDepa(teks: string): boolean {
  return normalisasiJawabanTulis(teks).includes("depa");
}

function bandingPita(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  const mentah = teks.toLowerCase();
  const adaArah = mentah.includes(">") || mentah.includes("lebih");
  return adaArah && jawabanTulisMemuatAlias(teks, ["8"]) && jawabanTulisMemuatAlias(teks, ["5"]);
}

function selisihTiga(teks: string): boolean {
  if (padat(teks).includes("7-4=3") || padat(teks).includes("9-6=3")) return true;
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  return jawabanTulisMemuatAlias(teks, ["3"]) || n.includes("tiga");
}

function alatLapangan(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  const alat = n.includes("langkah") || n.includes("depa");
  const alasan = /panjang|luas|jauh|besar|banyak|kecil|lapang|lebar/.test(n);
  return alat && alasan;
}

function tebakanPintu(teks: string): boolean {
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  if (["4", "5", "6", "7", "8"].some((angka) => jawabanTulisMemuatAlias(teks, [angka]))) return true;
  return ["empat", "lima", "enam", "tujuh", "delapan"].some((kata) => n.includes(kata));
}

function sambungPapan(teks: string): boolean {
  if (padat(teks).includes("4+3=7")) return true;
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  return jawabanTulisMemuatAlias(teks, ["7"]) || n.includes("tujuh");
}

function layangDua(teks: string): boolean {
  if (padat(teks).includes("9-4=5")) return true;
  if (!bukanBelasan(teks)) return false;
  const n = normalisasiJawabanTulis(teks);
  const beda = jawabanTulisMemuatAlias(teks, ["5"]) || n.includes("lima");
  const panjang = jawabanTulisMemuatAlias(teks, ["9", "b"]) || n.includes("sembilan");
  return beda && panjang;
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Ari: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Mila: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bima: "border-[#16A34A]/25 bg-[#F0FDF4]",
  Kodok: "border-[#F0AB00] bg-[#FFF8E8]",
  Semua: "border-[#E11D48]/20 bg-[#FFF1F2]",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{nama}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function KepalaKartu({
  ikon,
  judul,
  anak,
  kelas,
  kelamin,
  cuplikan,
}: {
  ikon: string;
  judul: string;
  anak?: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  cuplikan: CuplikanVoiceMateri[];
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      <div className="mt-3 flex justify-center">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
      </div>
    </>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

function Adegan({
  judul,
  warna,
  src,
  alt,
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-[#fbf6ea] object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </article>
  );
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
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
      <p className="mt-1 text-xs font-semibold text-amber-900">Ketuk benda, lalu ketuk pasangannya.</p>
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
              <span>{item.kiri}</span>
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Coba pasangkan lagi." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

function SusunUrut({
  id,
  judul,
  tampil,
  benar,
  umpan,
}: {
  id: string;
  judul: string;
  tampil: string[];
  benar: string[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [urutan, setUrutan] = useState<string[]>([]);
  const [cek, setCek] = useState(false);
  const sisa = tampil.filter((item) => !urutan.includes(item));
  const tepat = urutan.join("|") === benar.join("|");
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-sky-950">{judul}</p>
      <p className="mt-2 min-h-10 rounded-xl bg-white px-3 py-2 text-center text-sm font-black text-[#1C01A5]">
        {urutan.join(" → ") || "…"}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((benda) => (
          <button
            key={benda}
            type="button"
            onClick={() => {
              setUrutan((lama) => [...lama, benda]);
              setCek(false);
            }}
            className="rounded-xl bg-white px-3 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {benda}
          </button>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setUrutan([]);
            setCek(false);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button
          type="button"
          disabled={urutan.length < benar.length}
          onClick={() => {
            setCek(true);
            if (tepat) kuis?.tandaiBenar(id);
          }}
          className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
        >
          Periksa
        </button>
      </div>
      {cek ? <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Mulai dari angka yang paling kecil." /> : null}
      {cek && tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
    </article>
  );
}

function TulisBebas({
  id,
  judul,
  visual,
  pertanyaan,
  pesanSalah,
  umpan,
  periksa,
  alias = [],
  konteks,
  sesudahBenar,
  sesudahNilai,
}: {
  id: string;
  judul?: string;
  visual?: ReactNode;
  pertanyaan: string;
  pesanSalah: string;
  umpan: string;
  periksa: (teks: string) => boolean;
  alias?: string[];
  konteks?: string;
  sesudahBenar?: () => void;
  sesudahNilai?: (benar: boolean) => void;
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = async (data: string) => {
    const selesai = (ok: boolean, cuplikanBaru: string) => {
      setCuplikan(cuplikanBaru);
      setStatus(ok ? "benar" : "salah");
      sesudahNilai?.(ok);
      if (ok) {
        if (id) kuis?.tandaiBenar(id);
        sesudahBenar?.();
      }
    };
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }),
        });
        const json = (await respons.json()) as {
          berhasil?: boolean;
          benar?: boolean;
          bacaan?: string;
          pesan?: string;
        };
        if (!respons.ok || !json.berhasil) {
          setStatus(null);
          setCuplikan(json.pesan || "Gagal menilai. Kirim lagi.");
          return;
        }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        selesai(json.benar === true || (bacaan.length > 0 && periksa(bacaan)), bacaan || "tulisan tangan");
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    selesai(periksa(data), data.trim());
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      {visual ? <div>{visual}</div> : null}
      {judul ? <p className="text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">
        {pertanyaan}
      </p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis status={status} cuplikan={cuplikan || undefined} pesanSalah={pesanSalah} />
      <Umpan status={status} teks={umpan} />
    </div>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB7.kartu[0];
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  const [salahKanvas, setSalahKanvas] = useState(0);
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🪁🐸📏"
        judul={kartu.judul}
        anak="Mengukur Panjang Benda"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Membandingkan panjang dan pendek, lalu mengurutkan benda.</li>
          <li>Mengukur dengan jengkal, langkah, klip kertas, lidi, dan depa.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-3">
        <Adegan
          judul="Pesta di bukit"
          warna="border-sky-200 bg-sky-50"
          src="/doodle-mtk/mtk-1-bab7-bukit.jpg"
          alt="Bukit berlayang-layang. Ari, Mila, dan Bima berdiri. Kodok bertopi jerami membawa pita ukur."
        >
          <p className="text-sm font-semibold text-slate-700">
            Langit cerah. Tiga layang-layang terbang. Satu tampak kecil karena jauh.
          </p>
          <Dialog nama="Bima" anak="Layang-layangku kalah jauh. Punyamu lebih tinggi." />
          <Dialog nama="Ari" anak="Itu cuma kelihatan begitu. Kamu berdiri jauh dari kami." />
          <Dialog nama="Kodok" anak="Namaku Kodok! Aku mengukur tanpa penggaris. Aku memakai tubuhku!" />
        </Adegan>
        <Adegan
          judul="Adegan 1 · Masalah ketinggian"
          warna="border-amber-200 bg-amber-50"
          src="/doodle-mtk/mtk-1-bab7-adegan-1.jpg"
          alt="Tiga layang-layang. Ari berdiri dekat, Bima berdiri jauh, tanda tanya di atas mereka."
        >
          <Dialog nama="Bima" anak="Punyaku paling kecil! Berarti paling rendah?" />
          <Dialog nama="Ari" anak="Belum tentu! Mata kita bisa tertipu." />
          <Dialog nama="Kodok" anak="Kalau mau tahu yang sebenarnya, kita harus mengukur." />
          <Dialog nama="Mila" anak="Tapi kita tidak bawa meteran…" />
          <p className="text-sm font-black text-[#1C01A5]">Mata bisa salah. Ukuran tidak.</p>
        </Adegan>
        <Adegan
          judul="Adegan 2 · Kenalan dengan jengkal"
          warna="border-emerald-200 bg-emerald-50"
          src="/doodle-mtk/mtk-1-bab7-adegan-2.jpg"
          alt="Kodok membuka tangan. Garis dari jempol ke kelingking bertuliskan 1 jengkal."
        >
          <Dialog nama="Kodok" anak="Dari ujung jempol ke ujung kelingking, namanya satu jengkal!" />
          <Dialog nama="Bima" anak="Jengkal katak kecil sekali!" />
          <Dialog nama="Mila" anak="Benang Ari 7 jengkal!" />
        </Adegan>
        <Adegan
          judul="Adegan 3 · Kenapa hasilnya beda?"
          warna="border-rose-200 bg-rose-50"
          src="/doodle-mtk/mtk-1-bab7-adegan-3.jpg"
          alt="Benang yang sama: Kodok dapat 7, Ari dapat 4, Mila dapat 5."
        >
          <Dialog nama="Ari" anak="Aku ukur benang yang sama, tapi dapat 4 jengkal." />
          <Dialog nama="Mila" anak="Aku dapat 5 jengkal." />
          <Dialog nama="Bima" anak="Kok beda?! Yang benar yang mana?" />
          <Dialog nama="Kodok" anak="Tangan Ari lebih panjang, jadi jengkalnya lebih sedikit." />
          <Dialog nama="Mila" anak="Harus pakai tangan yang sama dari awal sampai akhir!" />
          <p className="text-sm font-black text-[#1C01A5]">1 alat ukur, 1 orang pengukur.</p>
        </Adegan>
        <Adegan
          judul="Adegan 4 · Mengurutkan layang-layang"
          warna="border-indigo-200 bg-indigo-50"
          src="/doodle-mtk/mtk-1-bab7-adegan-4.jpg"
          alt="Tiga layang-layang berukuran 3, 5, dan 8 jengkal, dari kecil ke besar."
        >
          <Dialog nama="Mila" anak="Yang kecil 3, yang sedang 5, yang besar 8." />
          <Dialog nama="Bima" anak="Tiga, lima, delapan. Kecil, sedang, besar!" />
          <p className="text-sm font-black text-[#1C01A5]">3 jengkal &lt; 5 jengkal &lt; 8 jengkal</p>
        </Adegan>
        <Adegan
          judul="Adegan 5 · Langkah kaki Kodok"
          warna="border-lime-200 bg-lime-50"
          src="/doodle-mtk/mtk-1-bab7-adegan-5.jpg"
          alt="Kodok melompat dari bendera start ke finish dan meninggalkan jejak kaki."
        >
          <Dialog nama="Kodok" anak="Jalan menuju panggung aku ukur dengan langkah kaki!" />
          <Dialog nama="Bima" anak="Satu sampai sepuluh langkah!" />
          <Dialog nama="Ari" anak="Jaraknya 10 langkah Kodok." />
        </Adegan>
        <Adegan
          judul="Adegan 6 · Festival dimulai"
          warna="border-orange-200 bg-orange-50"
          src="/doodle-mtk/mtk-1-bab7-adegan-6.jpg"
          alt="Panggung festival. Kodok bersselempang pita ukur. Mila memegang layang-layang terpanjang."
        >
          <Dialog nama="Kodok" anak="Pemenangnya layang-layang terpanjang. Itu milik Mila!" />
          <Dialog nama="Bima" anak="Aku tidak menang, tapi aku sudah tahu rahasianya!" />
          <Dialog nama="Semua" anak="Horeee! Terima kasih, Kodok!" />
        </Adegan>
      </div>
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="mt-2 text-center text-sm font-black text-[#1C01A5]">👣 1 2 3 4 5 6 7</p>
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Tali ini panjangnya berapa langkah? Ucapkan dengan keras!"
          periksa={jawabTujuhLangkah}
          petunjuk="Hitung jejak kakinya."
          sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")}
        />
        {suara === "benar" ? <p className="mt-2 text-sm font-bold text-emerald-800">Krukk! Kamu calon juri hebat!</p> : null}
        {suara === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Ayo hitung jejak kakinya satu per satu, dari kiri ke kanan.</p>
        ) : null}
      </div>
      <div className="mt-4">
        <TulisBebas
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis panjang pita ini dengan satuan klip kertas!"
          visual={<p className="text-center text-2xl">📎📎📎📎📎📎</p>}
          pesanSalah="Hitung klipnya dari kiri ke kanan."
          umpan="Panjangnya 6 klip kertas."
          alias={["6", "enam"]}
          konteks="Ada enam klip kertas. Jawab 6, bukan 7 dan bukan 16."
          periksa={jawabEnam}
          sesudahNilai={(benar) => setSalahKanvas((n) => (benar ? 0 : n + 1))}
        />
        {salahKanvas >= 2 ? (
          <p className="text-sm font-bold text-[#1C01A5]">Klip berkedip: 1, 2, 3, 4, 5, 6.</p>
        ) : null}
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB7.kartu[1];
  const panjang = ["2 jengkal", "5 jengkal", "9 jengkal"];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📏🖐️👣"
        judul={kartu.judul}
        anak="Satuan tidak baku di sekitar kita"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <TabelInfoGrafis
        judul="Infografis: Satuan tidak baku"
        kepala={["Alat", "Cara", "Cocok untuk"]}
        baris={[
          ["🖐️ Jengkal", "Jempol sampai kelingking", "Pensil, buku"],
          ["🙆 Depa", "Dua tangan dibuka", "Meja guru"],
          ["👣 Langkah", "Satu langkah kaki", "Lorong"],
          ["💪 Hasta", "Siku sampai ujung jari", "Pita"],
          ["🥢 Lidi", "Satu batang", "Meja kecil"],
          ["📎 Klip", "Satu klip", "Pensil"],
        ]}
        kaki="Rapat, lurus, dari ujung. Satu orang, satu alat."
      />
      <div className="mt-4 overflow-hidden rounded-2xl border-4 border-[#1C01A5]/20">
        <p className="bg-[#1C01A5] px-3 py-2 text-center text-xs font-black uppercase text-white">
          Membandingkan dengan alat yang sama
        </p>
        <div className="grid sm:grid-cols-2">
          <div className="border-b-2 border-[#1C01A5]/10 px-4 py-4 sm:border-b-0 sm:border-r-2">
            <p className="text-xs font-black uppercase text-[#92400E]">Pensil 7 klip</p>
            <p className="mt-2 text-2xl">📎📎📎📎📎📎📎</p>
            <p className="text-4xl font-black text-[#1C01A5]">7</p>
          </div>
          <div className="px-4 py-4">
            <p className="text-xs font-black uppercase text-[#166534]">Pensil 4 klip</p>
            <p className="mt-2 text-2xl">📎📎📎📎</p>
            <p className="text-4xl font-black text-[#1C01A5]">4</p>
          </div>
        </div>
        <p className="border-t-4 border-[#F0AB00] bg-[#FEF3C7] px-3 py-3 text-center text-lg font-black text-[#1C01A5]">
          7 &gt; 4 · pensil 7 klip lebih panjang
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <article className="rounded-2xl border-2 border-rose-200 bg-rose-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Mata bisa tertipu</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Garis berujung panah bisa tampak lebih panjang. Ukur dengan alat yang sama. Keduanya bisa sama panjang.
          </p>
        </article>
        <article className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Satuan tidak baku</p>
          <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700">
            <li>🖐️ Jengkal: jempol sampai kelingking.</li>
            <li>🙆 Depa: kedua tangan dibuka lebar.</li>
            <li>👣 Langkah: satu langkah kaki.</li>
            <li>💪 Hasta: siku sampai ujung jari.</li>
            <li>🥢 Lidi dan 📎 klip kertas: satu batang atau satu klip.</li>
          </ul>
        </article>
        <article className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Aturan emas</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">Mulai dari ujung. Tidak boleh ada celah. Satu orang, satu alat.</p>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Rapat, lurus, dari ujung.</p>
        </article>
        <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Membandingkan</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Ratakan ujung kiri. Pensil 7 klip lebih panjang dari pensil 4 klip. Tanda &gt; berarti lebih panjang, &lt; lebih pendek, = sama panjang.
          </p>
        </article>
        <article className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Mengurutkan</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">2, 4, 9, 7 diurutkan menjadi 2, 4, 7, 9.</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {["📎 Klip", "✏️ Pensil", "📏 Penggaris", "🧹 Sapu"].map((benda, indeks) => (
              <span key={benda} className="flex items-center gap-2">
                <span className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#1C01A5]">{benda}</span>
                {indeks < 3 ? <span className="font-black text-[#F0AB00]">→</span> : null}
              </span>
            ))}
          </div>
          <p className="mt-2 text-sm font-black text-[#1C01A5]">Klip → pensil → penggaris → sapu</p>
        </article>
        <article className="rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-sm font-black text-[#1C01A5]">Tebak, lalu ukur</p>
          <p className="mt-1 text-sm font-semibold text-slate-700">
            Bayangkan berapa jengkalmu muat di pintu, baru ukur. Satuan tidak baku untuk membandingkan. Sentimeter dan meter sama untuk semua orang.
          </p>
        </article>
      </div>
      <div className="mt-6 space-y-4 border-t-2 border-[#1C01A5]/10 pt-5">
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Pasangkan benda dengan panjangnya!"
          baris={[
            { kiri: "🖍️ Krayon", pilihan: panjang, benar: "2 jengkal" },
            { kiri: "🛏️ Tempat tidur", pilihan: panjang, benar: "9 jengkal" },
            { kiri: "🪑 Meja belajar", pilihan: panjang, benar: "5 jengkal" },
          ]}
          umpan="Krayon 2 jengkal. Meja 5 jengkal. Tempat tidur 9 jengkal."
        />
        <SusunUrut
          id={idKuis("B", 1)}
          judul="Susun dari yang paling pendek ke paling panjang!"
          tampil={["🧵 Benang 8", "📏 Penggaris 6", "✏️ Pensil 3", "🖇️ Klip 1"]}
          benar={["🖇️ Klip 1", "✏️ Pensil 3", "📏 Penggaris 6", "🧵 Benang 8"]}
          umpan="Klip, pensil, penggaris, lalu benang."
        />
        <Pilih
          id={idKuis("B", 2)}
          pertanyaan="Benda mana yang paling tepat diukur pakai langkah kaki?"
          pilihan={[
            { huruf: "A", teks: "Panjang buku" },
            { huruf: "B", teks: "Panjang lorong sekolah" },
            { huruf: "C", teks: "Panjang pensil" },
            { huruf: "D", teks: "Panjang pisang" },
          ]}
          benar="B"
          umpan="Lorong panjang, jadi langkah kaki lebih pas."
          salah="Pilih benda yang paling panjang."
        />
        <div>
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("B", 3)}
            pertanyaan="Meja guru lebih pas diukur dengan klip kertas atau depa? Ucapkan jawabanmu!"
            periksa={jawabDepa}
            petunjuk="Pilih alat yang tidak terlalu kecil."
          />
        </div>
        <TulisBebas
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Pita merah 8 klip. Pita biru 5 klip. Tulis perbandingannya dengan tanda > atau <."
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">Pita merah 8 ⬜ pita biru 5</p>}
          pesanSalah="Delapan lebih besar dari lima. Pakai tanda lebih panjang."
          umpan="8 > 5."
          konteks="Pita merah lebih panjang. Kalimatnya 8 lebih besar dari 5."
          periksa={bandingPita}
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB7.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🪁🐸🏆"
        judul={kartu.judul}
        anak="Sepuluh tali layang · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB7}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB7}
        penutup="Layang-layang tertib di bukit. Kodok mengukur dengan jengkal."
        bunga="🪁📏🐸👣"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB7.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const [papanTulis, setPapanTulis] = useState(false);
  const [papanSuara, setPapanSuara] = useState(false);
  const sudahPapan = useRef(false);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🏅 Tukang Ukur Ahli" : skor >= 6 ? "🖐️ Juri Jengkal Hebat" : "🐸 Sahabat Kodok";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu bisa mengukur apa saja!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi ahli ukur!"
        : "Ayo ukur lagi bersama Kodok, kamu pasti bisa!";
  useEffect(() => {
    if (!papanTulis || !papanSuara || sudahPapan.current) return;
    sudahPapan.current = true;
    kuis?.tandaiBenar(idKuis("D", 8));
  }, [papanTulis, papanSuara, kuis]);
  const alatPas = ["📎 Klip kertas", "👣 Langkah kaki", "🖐️ Jengkal"];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝📏"
        judul={kartu.judul}
        anak="Tantangan juri festival"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
        <li>Mata boleh ragu, ukuran tidak.</li>
        <li>Rapat, lurus, dari ujung.</li>
        <li>Satu orang, satu alat.</li>
        <li>Jengkal, langkah, dan depa bisa jadi penggaris.</li>
        <li>Ratakan ujungnya dulu, baru bandingkan.</li>
        <li>Tebak dulu, ukur kemudian.</li>
        <li>Satuan tidak baku untuk membandingkan. Satuan baku untuk semua orang.</li>
      </ul>
      <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-black text-[#1C01A5]">
        Rapat, lurus, dari ujung. Satu tangan, satu ukuran, Kodok pun tersenyum!
      </p>
      <div className="mt-4 grid gap-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/30 px-4 py-3 sm:grid-cols-3">
        <p className="text-sm font-black text-[#1C01A5]">Nama: {nama}</p>
        <p className="text-sm font-black text-[#1C01A5]">Kelas: 1</p>
        <p className="text-sm font-black text-[#1C01A5]">Skor: {skor} / 10</p>
      </div>
      <p className="mt-3 text-sm font-black text-[#1C01A5]">
        {lencana}. {pesan}
      </p>
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Hitung langkahnya"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">🚪 👣👣👣👣👣👣👣👣 📋</p>}
          pertanyaan="Tulis berapa langkah jarak dari pintu ke papan tulis!"
          pesanSalah="Hitung jejak kakinya."
          umpan="8 langkah."
          alias={["8", "delapan"]}
          periksa={(teks) => bukanBelasan(teks) && jawabanTulisMemuatAlias(teks, ["8", "delapan"])}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Krayon 3 klip. Klip besar 5 klip. Ujung kirinya sudah rata. Mana yang lebih panjang?"
          pilihan={[
            { huruf: "A", teks: "Krayon" },
            { huruf: "B", teks: "Klip besar" },
            { huruf: "C", teks: "Sama panjang" },
          ]}
          benar="B"
          umpan="5 klip lebih panjang dari 3 klip."
          salah="Bandingkan angkanya."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Meja yang sama: tangan Ari 6 jengkal, tangan Bima 9 jengkal. Ari berkata mejanya berubah panjang.
          </p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan='3. Apakah Ari benar? Ucapkan "Benar" atau "Salah", lalu jelaskan singkat.'
            periksa={(transkrip) =>
              ucapanMemuat(transkrip, [["salah"], ["tangan", "beda", "tidak berubah", "alat"]])
            }
            petunjuk="Meja tidak berubah. Yang beda adalah tangannya."
          />
        </div>
        <SusunUrut
          id={idKuis("D", 3)}
          judul="4. Urutkan dari paling pendek ke paling panjang!"
          tampil={["🧹 Sapu 8", "📏 Penggaris 5", "🖍️ Krayon 2", "🥢 Lidi 1"]}
          benar={["🥢 Lidi 1", "🖍️ Krayon 2", "📏 Penggaris 5", "🧹 Sapu 8"]}
          umpan="Lidi, krayon, penggaris, lalu sapu."
        />
        <TulisBebas
          id={idKuis("D", 4)}
          judul="5. Pilih alat ukur"
          visual={<p className="text-center text-2xl">⚽</p>}
          pertanyaan="Lapangan bola sangat luas. Tulis alat tidak baku yang paling tepat, lalu tulis alasan singkat."
          pesanSalah="Pilih langkah atau depa, lalu tulis kenapa klip terlalu kecil."
          umpan="Langkah atau depa, karena lapangannya panjang."
          konteks="Benar jika menyebut langkah atau depa dan alasannya lapangan itu panjang atau luas."
          periksa={alatLapangan}
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Berapa selisihnya?"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">Pita A 9 jengkal. Pita B 6 jengkal.</p>}
          pertanyaan="Berapa jengkal pita A lebih panjang dari pita B?"
          pesanSalah="9 dikurangi 6."
          umpan="9 – 6 = 3 jengkal."
          alias={["3", "tiga"]}
          konteks="Selisih 9 dan 6 adalah 3."
          periksa={selisihTiga}
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <SoalRekamSuara
            id={idKuis("D", 6)}
            pertanyaan="7. Kira-kira berapa jengkal lebar pintu kelas? Ucapkan tebakanmu."
            periksa={tebakanPintu}
            petunjuk="Pintu kelas biasanya sekitar 4 sampai 8 jengkal anak."
          />
        </div>
        <KuisCocok
          id={idKuis("D", 7)}
          perintah="8. Pasangkan benda dengan alat ukur yang paling tepat!"
          baris={[
            { kiri: "📚 Panjang buku", pilihan: alatPas, benar: "📎 Klip kertas" },
            { kiri: "🏫 Panjang lorong", pilihan: alatPas, benar: "👣 Langkah kaki" },
            { kiri: "🖐️ Lebar meja", pilihan: alatPas, benar: "🖐️ Jengkal" },
          ]}
          umpan="Buku pakai klip. Lorong pakai langkah. Meja pakai jengkal."
        />
        <TulisBebas
          id={`${ID}-D-papan`}
          judul="9. Papan kayu bengkel"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">4 jengkal + 3 jengkal</p>}
          pertanyaan="Tulis panjang papan sambungan semuanya!"
          pesanSalah="Jumlahkan 4 dan 3."
          umpan="4 + 3 = 7 jengkal."
          alias={["7", "tujuh", "4+3=7"]}
          konteks="Empat jengkal ditambah tiga jengkal sama dengan tujuh jengkal."
          periksa={sambungPapan}
          sesudahBenar={() => setPapanTulis(true)}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="9. Ucapkan panjang papan sambungannya."
          periksa={sambungPapan}
          petunjuk="Sebutkan jumlah jengkalnya."
          sesudahNilai={(benar) => {
            if (benar) setPapanSuara(true);
          }}
        />
        <TulisBebas
          id={idKuis("D", 9)}
          judul="10. Pesta layang-layang"
          visual={<p className="text-center text-sm font-black text-[#1C01A5]">A 6 jengkal. B 9 jengkal. C 4 jengkal.</p>}
          pertanyaan="Siapa yang terpanjang, dan berapa jengkal bedanya dengan yang terpendek?"
          pesanSalah="Yang terpanjang 9. Yang terpendek 4. Kurangkan keduanya."
          umpan="B paling panjang. 9 – 4 = 5 jengkal."
          konteks="Layang B atau 9 adalah yang terpanjang. Selisih dengan 4 adalah 5 jengkal."
          periksa={layangDua}
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Rapat, lurus, dari ujung."
          alias={["rapat lurus dari ujung", "rapat, lurus, dari ujung", "dari ujung"]}
          konteks="Kalimat kuncinya: rapat, lurus, dari ujung."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Kamu sudah bisa mengukur tanpa penggaris.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab7({
  kelas,
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
