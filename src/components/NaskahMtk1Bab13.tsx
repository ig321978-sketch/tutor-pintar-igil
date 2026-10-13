"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB13 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB13 } from "@/lib/tema-misi-mtk-1";
import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import PanduanIkon, { type ButirIkon } from "@/components/PanduanIkon";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB13 } from "@/lib/modul-resmi-mtk-1-bab13";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB13.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function naskah(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaToken(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\s)${angka}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function kataUtuh(teks: string, kata: string): boolean {
  return new RegExp(`(?:^|\\s)${kata}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function adaJam(teks: string, kata: string, angka: string): boolean {
  if (adaToken(teks, angka)) return true;
  return new RegExp(`(?:^|\\s)${kata}(?!\\s+belas)(?!\\s+puluh)(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function jamTepat(teks: string, kata: string, angka: string): boolean {
  const biasa = naskah(teks);
  if (/(?:^|\s)lewat(?:\s|$)/.test(` ${biasa} `)) return false;
  if (!adaJam(teks, kata, angka)) return false;
  return /(?:^|\s)tepat(?:\s|$)/.test(` ${biasa} `) || adaToken(teks, "12") || /(?:^|\s)dua belas(?:\s|$)/.test(` ${biasa} `);
}

function urutKata(teks: string, urutan: string[]): boolean {
  const biasa = naskah(teks);
  let mulai = 0;
  for (const kata of urutan) {
    const indeks = biasa.indexOf(kata, mulai);
    if (indeks < 0) return false;
    mulai = indeks + kata.length;
  }
  return true;
}

function urutPilihan(teks: string, kelompok: string[][]): boolean {
  const biasa = naskah(teks);
  let mulai = 0;
  for (const opsi of kelompok) {
    let palingAwal = -1;
    let panjang = 0;
    for (const kata of opsi) {
      const indeks = biasa.indexOf(kata, mulai);
      if (indeks >= 0 && (palingAwal < 0 || indeks < palingAwal)) {
        palingAwal = indeks;
        panjang = kata.length;
      }
    }
    if (palingAwal < 0) return false;
    mulai = palingAwal + panjang;
  }
  return true;
}

function alasanSore(teks: string): boolean {
  const biasa = naskah(teks);
  if (!kataUtuh(teks, "sore")) return false;
  return /jingga|matahari|turun|ufuk|senja|rendah/.test(biasa);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children, latar = "bg-white" }: { children: ReactNode; latar?: string }) {
  return (
    <section className={`rounded-[1.75rem] border-4 border-[#1C01A5]/15 ${latar} px-4 py-5 shadow-sm sm:px-6 sm:py-6`}>
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Ayu: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Rian: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Nisa: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Jago: "border-teal-300 bg-teal-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Ayu: "👧",
  Rian: "👦",
  Nisa: "👧",
  Jago: "🐓",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span className="text-2xl leading-none" aria-hidden>
          {WAJAH_DIALOG[nama] ?? "💬"}
        </span>
        {nama}
      </p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function Papan({ anak }: { anak: string }) {
  return (
    <p className="rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
      {anak}
    </p>
  );
}

function TombolPenjelasan({
  kelas,
  kelamin,
  kalimat,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
  kalimat: string[];
}) {
  return (
    <div className="mt-3">
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kalimat)} />
    </div>
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
  cuplikan?: CuplikanVoiceMateri[];
}) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>
        {ikon}
      </p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      {cuplikan && cuplikan.length > 0 ? (
        <div className="mt-3">
          <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
        </div>
      ) : null}
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
  kelas,
  kelamin,
  penjelasan,
  simbol,
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  simbol?: ButirIkon[];
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      <TombolPenjelasan kelas={kelas} kelamin={kelamin} kalimat={penjelasan} />
      {simbol ? <PanduanIkon butir={simbol} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="mt-3 space-y-2">{children}</div>
    </article>
  );
}

function KuisSuara({
  id,
  pertanyaan,
  periksa,
  petunjuk,
}: {
  id: string;
  pertanyaan: string;
  periksa: (teks: string) => boolean;
  petunjuk: string;
}) {
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} />
    </div>
  );
}

function Pilih({
  id,
  pertanyaan,
  pilihan,
  benar,
  umpan,
  salah,
  visual,
}: {
  id: string;
  pertanyaan: string;
  pilihan: { huruf: string; teks: string }[];
  benar: string;
  umpan: string;
  salah: string;
  visual?: ReactNode;
}) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3">{visual}</div> : null}
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
      <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
      <Umpan status={status} teks={umpan} />
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
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk soal, lalu ketuk pasangannya.</p>
      <div className="mt-3 grid gap-2">
        {baris.map((item, indeks) => {
          const warna = !cek
            ? "border-sky-200 bg-white"
            : peta[indeks] === item.benar
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-300 bg-rose-50";
          return (
            <button
              key={item.kiri}
              type="button"
              onClick={() => setAktif(indeks)}
              className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}
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
            key={`${aktif}-${kalimat}`}
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
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan waktunya." />
          {tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}
        </div>
      ) : null}
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
}) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }),
        });
        const json = (await respons.json()) as { berhasil?: boolean; benar?: boolean; bacaan?: string; pesan?: string };
        if (!respons.ok || !json.berhasil) {
          setStatus(null);
          setCuplikan(json.pesan || "Gagal menilai. Kirim lagi.");
          return;
        }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(id);
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    const ok = periksa(data);
    setCuplikan(data.trim());
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
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

function SusunToken({
  id,
  perintah,
  acak,
  benar,
  umpan,
}: {
  id: string;
  perintah: string;
  acak: string[];
  benar: string[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [sisa, setSisa] = useState(() => acak.map((teks, indeks) => ({ id: indeks, teks })));
  const [susun, setSusun] = useState<{ id: number; teks: string }[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((item, indeks) => item.teks === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join(" ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id));
              setSusun((lama) => [...lama, item]);
              setStatus(null);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {item.teks}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setSusun((lama) => {
              const akhir = lama[lama.length - 1];
              if (akhir) setSisa((kartu) => [...kartu, akhir]);
              return lama.slice(0, -1);
            });
            setStatus(null);
          }}
          className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200"
        >
          Urungkan
        </button>
        <button type="button" onClick={periksa} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">
          Periksa urutan
        </button>
      </div>
      <HasilJawabanKuis status={status} pesanSalah="Ikuti waktu dari pagi sampai malam." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisBenarSalah({
  id,
  perintah,
  baris,
  umpan,
}: {
  id: string;
  perintah: string;
  baris: { teks: string; benar: boolean }[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [peta, setPeta] = useState<Record<number, boolean | undefined>>({});
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const lengkap = baris.every((_, indeks) => peta[indeks] !== undefined);
  const periksa = () => {
    const tepat = baris.every((item, indeks) => peta[indeks] === item.benar);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <div className="mt-3 space-y-3">
        {baris.map((item, indeks) => (
          <div key={item.teks} className="rounded-xl bg-white px-3 py-3">
            <p className="text-sm font-semibold text-slate-700">{item.teks}</p>
            <div className="mt-2 flex gap-2">
              {[true, false].map((nilai) => (
                <button
                  key={String(nilai)}
                  type="button"
                  onClick={() => {
                    setPeta((lama) => ({ ...lama, [indeks]: nilai }));
                    setStatus(null);
                  }}
                  className={`rounded-full px-3 py-1 text-sm font-black ${
                    peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"
                  }`}
                >
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={!lengkap}
        onClick={periksa}
        className="mt-3 rounded-full bg-violet-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa
      </button>
      <HasilJawabanKuis status={status} pesanSalah="Lihat jarum pendek, lalu cek apakah waktunya masuk akal." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function GambarDoodle({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB13.kartu[0];
  const kegiatan = ["🎒 Berangkat sekolah", "🍽️ Makan siang", "🌙 Tidur"];
  const urutanHarian = ["🛏️ Bangun", "🚿 Mandi", "🍳 Sarapan", "🎒 Sekolah", "🌙 Tidur"];
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu ikon="👧👦🐓" judul={kartu.judul} anak="Ayu, Rian, Nisa, dan ayam jago kecil" />
      <div className="mt-4">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Siswa bisa membaca jam bulat.</li>
          <li>Siswa bisa menyusun urutan kegiatan harian.</li>
          <li>Siswa bisa membedakan waktu pagi, siang, sore, dan malam.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 · Mengenal Jam"
          simbol={[
            { ikon: "🟦", teks: "Jarum pendek = jam" },
            { ikon: "🟨", teks: "Jarum panjang = menit" },
            { ikon: "⭐", teks: "Angka 12 = tepat" },
          ]}
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab13-sub1.jpg"
          alt="Ayu menunjuk jam dinding. Jarum pendek di angka 7 dan jarum panjang di angka 12. Rian duduk di sofa. Jago berkokok di jendela."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Hari ini kita belajar membaca jam. Jam punya dua jarum.",
            "Jarum pendek menunjukkan jamnya. Jarum panjang menunjukkan menitnya.",
            "Kalau jarum panjang menunjuk angka dua belas, artinya tepat.",
          ]}
        >
          <Dialog nama="Rian" anak="Ayu, aku datang! Eh, jam berapa sekarang?" />
          <Dialog nama="Ayu" anak="Jarum pendeknya di angka 7. Jarum panjangnya di angka 12. Berarti tepat jam 7." />
          <Dialog nama="Jago" anak="Kukuruyuk! Tepat waktu!" />
          <Dialog nama="Nisa" anak="Kalau jarum panjangnya bukan di 12, nanti kita pelajari di kelas berikutnya." />
          <Papan anak="🟦 pendek di 7 · 🟨 panjang di 12 · jam tujuh tepat" />
          <p className="text-sm font-black text-[#1C01A5]">Jarum pendek = jam. Jarum panjang di angka 12 = tepat.</p>
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Jarum pendek di angka 3, jarum panjang di angka 12. Jam berapa? Ucapkan dengan jelas."
            periksa={(teks) => jamTepat(teks, "tiga", "3")}
            petunjuk="Lihat jarum pendeknya. Ada di angka berapa? Tambahkan kata tepat."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            judul="Gambar jarum jam 8 tepat"
            visual={<Papan anak="pendek di 8 · panjang di 12" />}
            pertanyaan="Tulis letak jarum pendek dan jarum panjang untuk jam 8 tepat."
            pesanSalah="Jarum pendek di angka 8. Jarum panjang di angka 12."
            umpan="Jam delapan tepat."
            periksa={(teks) => jamTepat(teks, "delapan", "8")}
            alias={["jam delapan tepat"]}
            konteks="Jawaban benar menyebut jam delapan tepat, jarum pendek di 8, dan jarum panjang di 12."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 2 · Membaca Jam Bulat"
          simbol={[
            { ikon: "🕛", teks: "Panjang selalu di 12" },
            { ikon: "🕖", teks: "Baca jarum pendek" },
          ]}
          warna="border-sky-200 bg-sky-50/50"
          src="/doodle-mtk/mtk-1-bab13-sub2.jpg"
          alt="Lima jam dinding berjajar menunjukkan jam 6, 7, 8, 9, dan 12 tepat. Nisa dan Jago melihatnya."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Jam bulat adalah jam yang jarum panjangnya tepat di angka dua belas.",
            "Jarum pendeknya bisa di angka satu sampai dua belas.",
            "Kita membaca jam dari jarum pendeknya.",
          ]}
        >
          <Dialog nama="Nisa" anak="Jarum pendek di 6 dan jarum panjang di 12. Itu jam 6 tepat, jam aku bangun." />
          <Dialog nama="Rian" anak="Berangkat sekolah: jarum pendek di 7. Jam 7 tepat!" />
          <Dialog nama="Ayu" anak="Kalau kedua jarum di angka 12, itu jam 12 tepat. Tengah hari!" />
          <Papan anak="6 tepat · 7 tepat · 8 tepat · 9 tepat · 12 tepat" />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Jarum pendek di angka 10, jarum panjang di angka 12. Jam berapa?"
            periksa={(teks) => jamTepat(teks, "sepuluh", "10")}
            petunjuk="Jarum pendeknya ada di angka sepuluh. Ucapkan jam sepuluh tepat."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            judul="Jam 2, jam 5, jam 9, dan jam 11"
            visual={<Papan anak="pendek di 2 · 5 · 9 · 11 · panjang semua di 12" />}
            pertanyaan="Tulis angka jarum pendek untuk jam 2, jam 5, jam 9, dan jam 11 tepat."
            pesanSalah="Jarum pendek di 2, 5, 9, dan 11. Jarum panjang semua di 12."
            umpan="Empat jam bulat sudah lengkap."
            periksa={(teks) =>
              adaJam(teks, "dua", "2") &&
              adaJam(teks, "lima", "5") &&
              adaJam(teks, "sembilan", "9") &&
              adaJam(teks, "sebelas", "11")
            }
            alias={["2 5 9 11"]}
            konteks="Empat jam tepat: jarum pendek di 2, 5, 9, dan 11. Jarum panjang semua di 12."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 3 · Urutan Kegiatan Harian"
          simbol={[
            { ikon: "🛏️", teks: "Bangun paling awal" },
            { ikon: "➡️", teks: "Urut ke kanan" },
            { ikon: "🌙", teks: "Tidur paling akhir" },
          ]}
          warna="border-emerald-200 bg-emerald-50/50"
          src="/doodle-mtk/mtk-1-bab13-sub3.jpg"
          alt="Ikon berurutan dari kiri ke kanan: tempat tidur, mandi, sarapan, tas sekolah, dan bulan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Setiap hari kita melakukan kegiatan yang punya urutan.",
            "Bangun pagi dulu, lalu mandi, lalu sarapan, lalu berangkat sekolah.",
            "Kalau urutannya terbalik, jadwalnya jadi aneh.",
          ]}
        >
          <Dialog nama="Rian" anak="Yang pertama pasti bangun tidur!" />
          <Dialog nama="Nisa" anak="Setelah bangun, kita mandi supaya segar. Lalu sarapan, baru sekolah." />
          <Dialog nama="Ayu" anak="Malamnya tidur. Bangun jam 6, sekolah jam 7." />
          <Papan anak="🛏️ Bangun → 🚿 Mandi → 🍳 Sarapan → 🎒 Sekolah → 🌙 Tidur" />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Mana yang dilakukan lebih dulu setelah bangun tidur: mandi atau sarapan?"
            periksa={(teks) => kataUtuh(teks, "mandi") && !urutKata(teks, ["sarapan", "mandi"])}
            petunjuk="Setelah bangun, kita bersihkan badan dulu, baru makan."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            judul="Bangun, sarapan, sekolah, tidur"
            visual={<Papan anak="🛏️  🍳  🎒  🌙" />}
            pertanyaan="Tulis urutan: bangun, sarapan, sekolah, lalu tidur."
            pesanSalah="Mulai dari bangun, lalu sarapan, sekolah, dan tidur."
            umpan="Urutannya mengikuti waktu."
            periksa={(teks) => urutKata(teks, ["bangun", "sarapan", "sekolah", "tidur"])}
            alias={["bangun sarapan sekolah tidur"]}
            konteks="Urutan benar: bangun, sarapan, sekolah, tidur."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 4 · Pagi, Siang, Sore, dan Malam"
          simbol={[
            { ikon: "🌅", teks: "Pagi" },
            { ikon: "☀️", teks: "Siang" },
            { ikon: "🌇", teks: "Sore" },
            { ikon: "🌙", teks: "Malam" },
          ]}
          warna="border-orange-200 bg-orange-50/50"
          src="/doodle-mtk/mtk-1-bab13-sub4.jpg"
          alt="Lingkaran dibagi empat: matahari terbit, matahari tinggi, matahari terbenam, dan bulan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Dalam sehari ada pagi, siang, sore, dan malam.",
            "Pagi saat matahari terbit. Siang saat matahari tinggi dan panas.",
            "Sore saat matahari turun. Malam saat gelap dan bulan muncul.",
          ]}
        >
          <Dialog nama="Ayu" anak="Langitnya jingga. Berarti sekarang sore." />
          <Dialog nama="Jago" anak="Kalau matahari ada di atas kepala, itu siang!" />
          <Dialog nama="Rian" anak="Kalau gelap dan ada bintang, malam. Waktunya tidur." />
          <Papan anak="🌅 pagi sekolah · ☀️ siang makan · 🌇 sore bermain · 🌙 malam tidur" />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Langit gelap, ada bulan dan bintang. Ini waktu apa?"
            periksa={(teks) => kataUtuh(teks, "malam")}
            petunjuk="Ada bulan dan bintang. Waktunya malam."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            judul="Pagi, siang, sore, malam"
            visual={<Papan anak="pagi sekolah · siang makan · sore bermain · malam tidur" />}
            pertanyaan="Tulis kegiatan untuk pagi, siang, sore, dan malam: sekolah, makan siang, bermain, tidur."
            pesanSalah="Pagi sekolah, siang makan, sore bermain, malam tidur."
            umpan="Setiap waktu punya kegiatannya."
            periksa={(teks) => urutPilihan(teks, [["sekolah", "tas"], ["makan"], ["bermain", "main"], ["tidur"]])}
            alias={["pagi sekolah siang makan sore bermain malam tidur"]}
            konteks="Pagi sekolah, siang makan, sore bermain, malam tidur."
          />
        </Adegan>

        <Adegan
          judul="Sub-bab 5 · Durasi dan Lama Kegiatan"
          simbol={[
            { ikon: "⚡", teks: "Sebentar" },
            { ikon: "⏳", teks: "Sedang" },
            { ikon: "🕰️", teks: "Lama" },
          ]}
          warna="border-fuchsia-200 bg-fuchsia-50/40"
          src="/doodle-mtk/mtk-1-bab13-sub5.jpg"
          alt="Batang pendek dan batang panjang di papan, dengan jam pasir kecil dan besar. Anak-anak memegang kartu sikat gigi, mandi, dan bulan."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Durasi artinya berapa lama sebuah kegiatan berlangsung.",
            "Ada kegiatan yang sebentar, ada yang sedang, dan ada yang lama.",
            "Kita membandingkan mana yang lebih lama.",
          ]}
        >
          <Dialog nama="Ayu" anak="Mana yang lebih lama: menggosok gigi atau tidur malam?" />
          <Dialog nama="Rian" anak="Tidur malam! Lama sekali, sampai pagi." />
          <Dialog nama="Nisa" anak="Berkedip cuma sebentar. Makan lebih lama. Bermain sedang-sedang saja." />
          <Papan anak="⚡ berkedip · ⏳ mandi · 🕰️ tidur malam" />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Mana yang lebih lama: menggosok gigi atau tidur malam?"
            periksa={(teks) => kataUtuh(teks, "tidur")}
            petunjuk="Bayangkan, mana yang butuh waktu paling panjang?"
          />
          <TulisBebas
            id={idKuis("A", 9)}
            judul="Sebentar, sedang, lama"
            visual={<Papan anak="🥛 minum · 🚿 mandi · 🌙 tidur" />}
            pertanyaan="Tulis urutan durasi: minum air, mandi, lalu tidur."
            pesanSalah="Minum sebentar, mandi sedang, tidur lama."
            umpan="Durasi adalah lama kegiatan."
            periksa={(teks) => urutPilihan(teks, [["minum"], ["mandi"], ["tidur"]])}
            alias={["minum mandi tidur"]}
            konteks="Sebentar minum air, sedang mandi, lama tidur."
          />
        </Adegan>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-black text-[#1C01A5]">Lima soal akhir</p>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Jarum pendek di angka 4, jarum panjang di angka 12. Jam berapa?"
          visual={<Papan anak="pendek 4 · panjang 12" />}
          pilihan={[
            { huruf: "A", teks: "Jam 12 tepat" },
            { huruf: "B", teks: "Jam 4 tepat" },
            { huruf: "C", teks: "Jam 4 lewat 12" },
            { huruf: "D", teks: "Jam 12 lewat 4" },
          ]}
          benar="B"
          umpan="Jarum pendek di 4, jadi jam 4 tepat."
          salah="Jangan membaca jarum panjang sebagai jamnya."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan waktu dengan kegiatannya."
          baris={[
            { kiri: "🌅 Pagi", pilihan: kegiatan, benar: "🎒 Berangkat sekolah" },
            { kiri: "☀️ Siang", pilihan: kegiatan, benar: "🍽️ Makan siang" },
            { kiri: "🌙 Malam", pilihan: kegiatan, benar: "🌙 Tidur" },
          ]}
          umpan="Pagi sekolah, siang makan, malam tidur."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun jadwal Ayu dari pagi sampai malam."
          acak={["🍳 Sarapan", "🛏️ Bangun", "🌙 Tidur", "🎒 Sekolah", "🚿 Mandi"]}
          benar={urutanHarian}
          umpan="Bangun, mandi, sarapan, sekolah, tidur."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Benar atau salah?"
          baris={[
            { teks: "Jarum pendek pada jam menunjukkan jamnya.", benar: true },
            { teks: "Kalau jarum panjang di angka 12, berarti tepat.", benar: true },
            { teks: "Matahari terbit saat malam.", benar: false },
          ]}
          umpan="Matahari terbit pada pagi hari."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga jadwal urutannya benar. Satu terbalik. Ketuk yang terbalik."
          pilihan={[
            { huruf: "A", teks: "🛏️ Bangun → 🚿 Mandi → 🍳 Sarapan" },
            { huruf: "B", teks: "🎒 Sekolah → 🌙 Tidur → 🛏️ Bangun" },
            { huruf: "C", teks: "🌅 Pagi → ☀️ Siang → 🌙 Malam" },
            { huruf: "D", teks: "🍽️ Makan → ⚽ Bermain → 🌙 Tidur" },
          ]}
          benar="B"
          umpan="Bangun tidak mungkin setelah sekolah dan tidur malam."
          salah="Cari urutan yang meloncat ke belakang."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Jarum pendek, itulah jamnya."
          alias={["jarum pendek", "itulah jamnya"]}
          konteks="Jarum pendek, itulah jamnya."
        />
      </div>
    </KartuBingkai>
  );
}

function SubPapan({
  judul,
  warna,
  kelas,
  kelamin,
  penjelasan,
  simbol,
  children,
}: {
  judul: string;
  warna: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  simbol: ButirIkon[];
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-4 ${warna}`}>
      <h5 className="text-sm font-black text-[#1C01A5]">{judul}</h5>
      <TombolPenjelasan kelas={kelas} kelamin={kelamin} kalimat={penjelasan} />
      <PanduanIkon butir={simbol} />
      <div className="mt-3 space-y-3">{children}</div>
    </article>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB13.kartu[1];
  const ciri = ["☀️ Siang", "🌙 Malam", "🌇 Sore"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu ikon="📊⏰" judul={kartu.judul} anak="Jam bulat, jadwal, dan durasi" />
      <div className="mt-4 space-y-4">
        <SubPapan
          judul="Sub-bab 1 · Bagian-Bagian Jam"
          warna="border-sky-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Jarum pendek lebih lambat dan menunjukkan jamnya.",
            "Jarum panjang lebih cepat dan menunjukkan menitnya.",
            "Kalau jarum panjang tepat di angka dua belas, kita sebut jam bulat.",
          ]}
          simbol={[
            { ikon: "🟦", teks: "Pendek = jam" },
            { ikon: "🟨", teks: "Panjang = menit" },
            { ikon: "🔴", teks: "Angka 12" },
          ]}
        >
          <TabelInfoGrafis
            judul="Bagian jam"
            kepala={["Bagian", "Ikon", "Fungsi"]}
            baris={[
              ["Jarum pendek", "🟦", "Menunjukkan jam"],
              ["Jarum panjang", "🟨", "Menunjukkan menit"],
              ["Angka 12", "🔴", "Tanda jam tepat"],
            ]}
            kaki="Jarum panjang di dua belas? Baca jarum pendeknya saja."
          />
          <p className="text-sm font-semibold text-slate-700">
            Contoh: jarum panjang di 12, jarum pendek di 9. Dibaca jam sembilan tepat.
          </p>
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Jarum pendek di angka 2, jarum panjang di angka 12. Jam berapa?"
            periksa={(teks) => jamTepat(teks, "dua", "2")}
            petunjuk="Ucapkan jam dua tepat. Jangan menyebut jam dua belas."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            pertanyaan="Tulis letak jarum untuk jam 5 tepat."
            pesanSalah="Jarum pendek di 5. Jarum panjang di 12."
            umpan="Jam lima tepat."
            periksa={(teks) => jamTepat(teks, "lima", "5")}
            alias={["jam lima tepat"]}
            konteks="Jam lima tepat: jarum pendek di 5, jarum panjang di 12."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 2 · Membaca Jam Bulat 1–12"
          warna="border-emerald-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Jarum panjang selalu di dua belas. Yang berubah hanya jarum pendeknya.",
            "Jarum pendek di satu berarti jam satu tepat. Di tiga berarti jam tiga tepat.",
          ]}
          simbol={[
            { ikon: "🕐", teks: "Jam satu tepat" },
            { ikon: "🕕", teks: "Jam enam tepat" },
            { ikon: "🕚", teks: "Jam sebelas tepat" },
          ]}
        >
          <TabelInfoGrafis
            judul="Jam bulat"
            kepala={["Jam", "Jarum pendek", "Dibaca"]}
            baris={[
              ["🕐", "1", "Jam satu tepat"],
              ["🕑", "2", "Jam dua tepat"],
              ["🕒", "3", "Jam tiga tepat"],
              ["🕓", "4", "Jam empat tepat"],
              ["🕔", "5", "Jam lima tepat"],
              ["🕕", "6", "Jam enam tepat"],
            ]}
            kaki="Jarum pendek di angka berapa? Itulah jamnya."
          />
          <p className="text-sm font-semibold text-slate-700">
            Contoh: jarum pendek di 11 dan jarum panjang di 12 dibaca jam sebelas tepat.
          </p>
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Jarum pendek di angka 1, jarum panjang di angka 12. Jam berapa?"
            periksa={(teks) => jamTepat(teks, "satu", "1")}
            petunjuk="Ucapkan jam satu tepat."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            pertanyaan="Tulis angka jarum pendek untuk jam 3, jam 7, dan jam 10 tepat."
            pesanSalah="Jarum pendek di 3, 7, dan 10. Jarum panjang semua di 12."
            umpan="Tiga jam bulat sudah terbaca."
            periksa={(teks) =>
              adaJam(teks, "tiga", "3") && adaJam(teks, "tujuh", "7") && adaJam(teks, "sepuluh", "10")
            }
            alias={["3 7 10"]}
            konteks="Jarum pendek di 3, 7, dan 10. Jarum panjang semua di 12."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 3 · Urutan Kegiatan Harian"
          warna="border-violet-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kegiatan harian punya urutan. Setelah bangun tidur apa? Setelah mandi apa?",
            "Urutan harus benar, dan jamnya juga harus masuk akal.",
          ]}
          simbol={[
            { ikon: "🛏️", teks: "Jam 6 bangun" },
            { ikon: "🍳", teks: "Jam 7 sarapan" },
            { ikon: "📚", teks: "Jam 8 belajar" },
          ]}
        >
          <Papan anak="🛏️ bangun jam 6 → 🚿 mandi → 🍳 sarapan jam 7 → 🎒 sekolah jam 7 → 📚 belajar jam 8" />
          <p className="text-sm font-semibold text-slate-700">
            Ayu bangun jam 6 lalu mandi. Sarapan jam 5 tidak masuk akal, karena sarapan tidak mungkin sebelum bangun.
          </p>
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Mana yang lebih dulu: sekolah atau mandi?"
            periksa={(teks) => kataUtuh(teks, "mandi")}
            petunjuk="Mandi dilakukan sebelum berangkat sekolah."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            pertanyaan="Urutkan dari pagi ke malam: sarapan, sekolah, tidur."
            pesanSalah="Sarapan, lalu sekolah, lalu tidur."
            umpan="Pagi makan, siang sekolah, malam tidur."
            periksa={(teks) => urutKata(teks, ["sarapan", "sekolah", "tidur"])}
            alias={["sarapan sekolah tidur"]}
            konteks="Urutan benar: sarapan, sekolah, tidur."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 4 · Pagi, Siang, Sore, Malam"
          warna="border-rose-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pagi saat matahari terbit. Siang saat matahari tinggi dan panas.",
            "Sore saat langit jingga. Malam saat gelap dengan bulan dan bintang.",
          ]}
          simbol={[
            { ikon: "🌅", teks: "Sejuk" },
            { ikon: "☀️", teks: "Panas" },
            { ikon: "🌇", teks: "Jingga" },
            { ikon: "🌙", teks: "Gelap" },
          ]}
        >
          <TabelInfoGrafis
            judul="Empat waktu"
            kepala={["Waktu", "Ciri", "Kegiatan"]}
            baris={[
              ["🌅 Pagi", "Matahari terbit", "Mandi, sekolah"],
              ["☀️ Siang", "Matahari tinggi", "Makan siang"],
              ["🌇 Sore", "Langit jingga", "Bermain"],
              ["🌙 Malam", "Ada bulan", "Tidur"],
            ]}
            kaki="Lihat matahari dan warna langitnya."
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Matahari tinggi di langit terang. Ini waktu apa?"
            periksa={(teks) => kataUtuh(teks, "siang")}
            petunjuk="Matahari di atas kepala berarti siang."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            pertanyaan="Tulis: pagi matahari terbit, malam bulan."
            pesanSalah="Pagi bersama matahari terbit. Malam bersama bulan."
            umpan="Ciri langit membantu kita membaca waktu."
            periksa={(teks) => urutPilihan(teks, [["pagi", "terbit"], ["malam", "bulan"]])}
            alias={["pagi terbit malam bulan"]}
            konteks="Pagi matahari terbit. Malam ada bulan."
          />
        </SubPapan>

        <SubPapan
          judul="Sub-bab 5 · Sebentar, Sedang, Lama"
          warna="border-cyan-200 bg-white"
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Durasi artinya berapa lama. Berkedip sangat cepat. Tidur malam butuh waktu lama.",
            "Bayangkan melakukannya. Yang terasa lama, itu lama.",
          ]}
          simbol={[
            { ikon: "⚡", teks: "Sebentar" },
            { ikon: "⏳", teks: "Sedang" },
            { ikon: "🕰️", teks: "Lama" },
          ]}
        >
          <TabelInfoGrafis
            judul="Durasi"
            kepala={["Durasi", "Contoh", "Rasanya"]}
            baris={[
              ["⚡ Sebentar", "Berkedip, minum", "Cepat"],
              ["⏳ Sedang", "Mandi, sarapan", "Beberapa menit"],
              ["🕰️ Lama", "Sekolah, tidur", "Berjam-jam"],
            ]}
            kaki="Mandi lebih lama daripada menggosok gigi."
          />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Mana yang lebih lama: mandi atau menggosok gigi?"
            periksa={(teks) => kataUtuh(teks, "mandi")}
            petunjuk="Mandi butuh waktu lebih panjang."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            pertanyaan="Tulis yang sebentar dan yang lama: berkedip, lalu tidur malam."
            pesanSalah="Berkedip sebentar. Tidur malam lama."
            umpan="Durasi dibandingkan dengan membayangkannya."
            periksa={(teks) => urutPilihan(teks, [["kedip", "berkedip"], ["tidur"]])}
            alias={["berkedip tidur"]}
            konteks="Sebentar berkedip. Lama tidur malam."
          />
        </SubPapan>
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-sm font-black text-[#1C01A5]">Lima soal akhir</p>
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Jarum pendek di angka 6, jarum panjang di angka 12. Bacaan yang benar?"
          visual={<Papan anak="pendek 6 · panjang 12" />}
          pilihan={[
            { huruf: "A", teks: "Jam enam lewat dua belas" },
            { huruf: "B", teks: "Jam dua belas tepat" },
            { huruf: "C", teks: "Jam enam tepat" },
            { huruf: "D", teks: "Jam dua belas lewat enam" },
          ]}
          benar="C"
          umpan="Jarum pendek di 6, jadi jam enam tepat."
          salah="Angka 12 pada jarum panjang bukan jamnya."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan ciri dengan waktunya."
          baris={[
            { kiri: "Matahari di atas kepala, panas", pilihan: ciri, benar: "☀️ Siang" },
            { kiri: "Gelap, ada bulan dan bintang", pilihan: ciri, benar: "🌙 Malam" },
            { kiri: "Langit jingga, matahari turun", pilihan: ciri, benar: "🌇 Sore" },
          ]}
          umpan="Siang panas, malam gelap, sore jingga."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari yang paling sebentar ke paling lama."
          acak={["🦷 Gosok gigi", "🕰️ Tidur malam", "⚡ Berkedip"]}
          benar={["⚡ Berkedip", "🦷 Gosok gigi", "🕰️ Tidur malam"]}
          umpan="Berkedip, gosok gigi, lalu tidur malam."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Benar atau salah?"
          baris={[
            { teks: "Jarum panjang di angka 12 artinya jam tepat.", benar: true },
            { teks: "Kita tidur malam di pagi hari.", benar: false },
            { teks: "Berkedip lebih lama daripada tidur malam.", benar: false },
          ]}
          umpan="Tidur dilakukan malam hari, dan lebih lama daripada berkedip."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Tiga jadwal masuk akal. Satu tidak mungkin. Ketuk yang tidak mungkin."
          pilihan={[
            { huruf: "A", teks: "Bangun jam 6 → mandi jam 6 → sarapan jam 7" },
            { huruf: "B", teks: "Sekolah jam 8 → pulang jam 11 → makan siang jam 12" },
            { huruf: "C", teks: "Tidur malam jam 9 → bangun jam 6 → mandi jam 6" },
            { huruf: "D", teks: "Makan malam jam 7 → tidur jam 9 → berangkat sekolah jam 6" },
          ]}
          benar="D"
          umpan="Sekolah dilakukan pagi setelah bangun, bukan langsung setelah tidur malam."
          salah="Cari kegiatan yang meloncat ke hari berikutnya tanpa bangun."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Jarum panjang di angka 12 berarti tepat."
          alias={["angka 12", "tepat"]}
          konteks="Jarum panjang di angka 12 berarti tepat."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB13.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="⏰🐓"
        judul={kartu.judul}
        anak="Sepuluh pos stasiun · jam, jadwal, dan langit"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Dalam permainan ini kalian menjadi penjaga stasiun waktu.",
          "Pasang jam yang tepat, lalu susun jadwal supaya rapi.",
          "Kalau jadwalnya benar, lonceng stasiun berbunyi.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab13-stasiun.jpg"
        alt="Menara jam di kota kecil. Jago berdiri di puncak sambil memegang megafon. Matahari di kiri dan bulan di kanan."
      />
      <PanduanIkon
        judul="Simbol stasiun"
        butir={[
          { ikon: "⏰", teks: "Pasang jam" },
          { ikon: "🔔", teks: "10 lonceng" },
          { ikon: "🔍", teks: "Kaca waktu" },
          { ikon: "🏅", teks: "Penjaga waktu" },
        ]}
      />
      <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Salah memasang jam membuat roda gigi menara berputar balik, lalu kamu boleh mencoba lagi.</p>
        <p>
          Jawaban benar pertama mendapat 3 lonceng. Setelah satu petunjuk, 2 lonceng. Setelah dua petunjuk, 1 lonceng. Kaca waktu membantu, tetapi mengurangi lonceng.
        </p>
        <p>Kumpulkan 10 lonceng untuk membuka menara jam besar dan menerima lencana Penjaga Waktu Ahli.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB13}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB13}
        penutup="Menara jam besar terbuka. Jago memberi lencana Penjaga Waktu Ahli."
        bunga="🕐🌅🐓🔔"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB13.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🏅 Penjaga Waktu Ahli" : skor >= 6 ? "⏰ Pembaca Jam Cerdas" : "🐓 Sahabat Jago";
  const pesan =
    skor >= 9
      ? "Luar biasa! Jadwalmu selalu rapi dan tepat!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi penjaga waktu!"
        : "Ayo belajar jam lagi bersama Jago, kamu pasti bisa!";
  const ciri = ["Matahari terbit, udara sejuk", "Matahari tinggi, terasa panas", "Gelap, ada bintang"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🐓"
        judul={kartu.judul}
        anak={`${nama} · Kelas 1 · ${skor} dari 10`}
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sekarang saatnya kalian mengerjakan sendiri. Ada sepuluh soal.",
          "Sebagian membaca jam, sebagian menyusun jadwal, dan sebagian menebak waktu dari langit.",
          "Lihat jarum pendek dulu, dan cek apakah urutannya masuk akal.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab13-evaluasi.jpg"
        alt="Meja ujian dengan pensil besar dan jam kecil. Jago berdiri di tepi meja sambil mengangkat sayap."
      />
      <PanduanIkon
        judul="Simbol soal"
        butir={[
          { ikon: "🟦", teks: "Lihat jarum pendek" },
          { ikon: "⭐", teks: "Panjang di 12 = tepat" },
          { ikon: "🛏️", teks: "Cek urutannya" },
          { ikon: "🌇", teks: "Lihat langit" },
        ]}
      />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">
        {lencana} · {pesan}
      </p>
      <div className="mt-4 space-y-3">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Gambar jarum jam 10 tepat"
          visual={<Papan anak="pendek di 10 · panjang di 12" />}
          pertanyaan="Tulis letak kedua jarum, lalu baca jamnya."
          pesanSalah="Jarum pendek di 10, jarum panjang di 12. Dibaca jam sepuluh tepat."
          umpan="Jam sepuluh tepat."
          periksa={(teks) => jamTepat(teks, "sepuluh", "10")}
          alias={["jam sepuluh tepat"]}
          konteks="Jam sepuluh tepat. Jarum pendek di angka 10. Jarum panjang di angka 12."
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Jarum pendek di angka 8, jarum panjang di angka 12. Jam berapa?"
          visual={<Papan anak="pendek 8 · panjang 12" />}
          pilihan={[
            { huruf: "A", teks: "Jam 12 tepat" },
            { huruf: "B", teks: "Jam 8 lewat 12" },
            { huruf: "C", teks: "Jam 8 tepat" },
            { huruf: "D", teks: "Jam 12 lewat 8" },
          ]}
          benar="C"
          umpan="Jarum pendek di 8, jadi jam 8 tepat."
          salah="Angka 12 pada jarum panjang berarti tepat, bukan jamnya."
        />
        <KuisSuara
          id={idKuis("D", 2)}
          pertanyaan="3. Jarum pendek di angka 2, jarum panjang di angka 12. Ucapkan jam ini dengan lengkap."
          periksa={(teks) => jamTepat(teks, "dua", "2")}
          petunjuk="Ucapkan jam dua tepat."
        />
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Rian menulis: aku tidur malam jam 9 pagi. Apakah jadwal itu masuk akal?"
          pilihan={[
            { huruf: "A", teks: "Benar, itu wajar" },
            { huruf: "B", teks: "Salah, tidur malam dilakukan pada malam hari" },
            { huruf: "C", teks: "Salah, karena tidak ada jam 9" },
            { huruf: "D", teks: "Tidak bisa ditentukan" },
          ]}
          benar="B"
          umpan="Jam 9 ada, tetapi tidur malam tidak dilakukan pagi."
          salah="Periksa waktunya, bukan hanya angkanya."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan waktu dengan cirinya."
          baris={[
            { kiri: "🌅 Pagi", pilihan: ciri, benar: "Matahari terbit, udara sejuk" },
            { kiri: "☀️ Siang", pilihan: ciri, benar: "Matahari tinggi, terasa panas" },
            { kiri: "🌙 Malam", pilihan: ciri, benar: "Gelap, ada bintang" },
          ]}
          umpan="Pagi terbit, siang panas, malam berbintang."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Urutan kegiatan"
          visual={<Papan anak="🛏️ bangun · 🚿 mandi · 🍳 sarapan · 🌙 tidur" />}
          pertanyaan="Susun dari pagi sampai malam: bangun, mandi, sarapan, tidur."
          pesanSalah="Bangun, mandi, sarapan, lalu tidur."
          umpan="Urutan itu mengikuti waktu."
          periksa={(teks) => urutKata(teks, ["bangun", "mandi", "sarapan", "tidur"])}
          alias={["bangun mandi sarapan tidur"]}
          konteks="Urutan benar: bangun, mandi, sarapan, tidur."
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Jarum panjang di angka 12. Jarum pendek ada di antara 6 dan 8. Jika ini jam tujuh tepat, jarum pendek ada di angka berapa?"
          pilihan={[
            { huruf: "A", teks: "6" },
            { huruf: "B", teks: "7" },
            { huruf: "C", teks: "8" },
            { huruf: "D", teks: "12" },
          ]}
          benar="B"
          umpan="Jam tujuh tepat berarti jarum pendek di angka 7."
          salah="Nama jamnya sama dengan angka jarum pendek."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari yang paling sebentar ke paling lama."
          acak={["🕰️ Tidur malam", "⚡ Berkedip", "🚿 Mandi"]}
          benar={["⚡ Berkedip", "🚿 Mandi", "🕰️ Tidur malam"]}
          umpan="Berkedip, mandi, lalu tidur malam."
        />
        <KuisSuara
          id={idKuis("D", 8)}
          pertanyaan="9. Langit jingga dan matahari rendah. Sebutkan waktunya, lalu jelaskan alasannya singkat."
          periksa={alasanSore}
          petunjuk="Sebutkan sore, lalu sebut langit jingga atau matahari yang turun."
        />
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Ayu menulis: mandi jam 6, bangun jam 6, sekolah jam 7, sarapan jam 8. Mana yang benar?"
          visual={<Papan anak="🚿 mandi 6 · 🛏️ bangun 6 · 🎒 sekolah 7 · 🍳 sarapan 8" />}
          pilihan={[
            {
              huruf: "A",
              teks: "Bangun seharusnya paling awal. Urutannya bangun, mandi, sarapan, sekolah. Sarapan jam 8 tidak masuk akal karena sekolah jam 7.",
            },
            {
              huruf: "B",
              teks: "Mandi seharusnya paling awal. Urutannya mandi, bangun, sekolah, sarapan. Sekolah jam 7 tidak masuk akal.",
            },
            { huruf: "C", teks: "Urutannya sudah benar. Sarapan jam 8 masuk akal." },
            {
              huruf: "D",
              teks: "Bangun seharusnya paling awal. Urutannya bangun, mandi, sekolah, sarapan. Sekolah jam 7 yang tidak masuk akal.",
            },
          ]}
          benar="A"
          umpan="Bangun dulu, sarapan sebelum sekolah, dan jam sarapan harus sebelum jam 7."
          salah="Periksa kegiatan yang ditulis setelah mandi, lalu jam yang melewati sekolah."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Urutan benar, jam juga harus masuk akal."
          alias={["urutan benar", "masuk akal"]}
          konteks="Urutan benar, jam juga harus masuk akal."
        />
        <p className="text-center text-sm font-black text-[#1C01A5]">
          {lencana} · {skor} bintang dari 10
        </p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab13({
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
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{
          src: "/doodle-mtk/mtk-1-bab13-poin.jpg",
          alt: "Jago berdiri di puncak menara jam di samping papan kosong. Matahari di kiri dan bulan di kanan.",
        }}
        cuplikan={cuplikanKalimat([
          "Jam punya dua jarum. Jarum pendek menunjukkan jamnya. Jarum panjang menunjukkan menitnya.",
          "Kalau jarum panjang tepat di angka dua belas, jamnya bulat.",
          "Kegiatan harian punya urutan, dari pagi sampai malam.",
          "Pagi, siang, sore, dan malam. Ada kegiatan sebentar, ada yang lama. Itu durasi.",
        ])}
        poin={[
          "🟦 Jarum pendek, itulah jamnya.",
          "🟨 Jarum panjang di angka 12 berarti tepat.",
          "🛏️ Kegiatan harian punya urutan.",
          "🌅 Pagi, siang, sore, malam — lihat mataharinya.",
          "⚡ Sebentar, sedang, lama — itu durasi.",
          "✅ Urutan benar, jam juga harus masuk akal.",
        ]}
        penutup="Lihat jarum pendek, ikuti urutan hari, dan cek apakah jamnya masuk akal."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
