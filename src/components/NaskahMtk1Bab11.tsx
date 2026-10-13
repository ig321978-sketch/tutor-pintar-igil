"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB11 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB11 } from "@/lib/tema-misi-mtk-1";
import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB11 } from "@/lib/modul-resmi-mtk-1-bab11";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB11.id;

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

function hanyaKata(teks: string, kata: string, angka: string): boolean {
  const biasa = naskah(teks);
  if (biasa.includes("puluh") || biasa.includes("belas")) return false;
  return kataUtuh(teks, kata) || adaToken(teks, angka);
}

function urutAngka(teks: string, angka: string[]): boolean {
  const kata = naskah(teks).split(" ").filter((item) => item.length > 0);
  let mulai = 0;
  for (const target of angka) {
    const indeks = kata.indexOf(target, mulai);
    if (indeks < 0) return false;
    mulai = indeks + 1;
  }
  return true;
}

function urutFrasa(teks: string, depan: string, belakang: string): boolean {
  const biasa = naskah(teks);
  const awal = biasa.indexOf(depan);
  const akhir = biasa.indexOf(belakang);
  return awal >= 0 && akhir > awal;
}

function polaBerulang(teks: string, panjang: number, kali: number): boolean {
  const kata = naskah(teks).split(" ").filter((item) => item.length > 1);
  const butuh = panjang * kali;
  if (kata.length < butuh) return false;
  const unit = kata.slice(0, panjang);
  if (new Set(unit).size < panjang) return false;
  return kata.slice(0, butuh).every((item, indeks) => item === unit[indeks % panjang]);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Maya: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Yoga: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Lita: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Biru: "border-[#F0AB00] bg-[#FFF8E8]",
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

function Papan({ anak }: { anak: string }) {
  return (
    <p className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-3 py-3 text-center text-lg font-black leading-snug text-[#1C01A5]">
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
  children,
}: {
  judul: string;
  warna: string;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">{judul}</p>
      <TombolPenjelasan kelas={kelas} kelamin={kelamin} kalimat={penjelasan} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-[#fbf6ea] object-cover" />
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
    <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
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
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
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
    <article className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-4">
      <p className="text-sm font-black text-amber-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-amber-900">Ketuk soal, lalu ketuk pasangannya.</p>
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
        className="mt-3 rounded-full bg-amber-500 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Hitung isi satu pengulangan, lalu pasangkan." />
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat lagi bagian yang berulang, lalu susun." />
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
      <HasilJawabanKuis status={status} pesanSalah="Hitung isi satu pengulangan. Pola berulang kembali ke awal." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function GambarDoodle({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mt-3 w-full rounded-xl border border-[#1C01A5]/10 bg-[#fbf6ea] object-cover" />
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB11.kartu[0];
  const panjang = ["2 bentuk", "3 bentuk", "4 bentuk"];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="👧👦🦜" judul={kartu.judul} anak="Maya, Yoga, Lita, dan burung Biru" />
      <div className="mt-4">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Siswa bisa mengenali pola berulang pada gambar dan bilangan.</li>
          <li>Siswa bisa melanjutkan pola yang sudah ada.</li>
          <li>Siswa bisa membuat pola berulang sederhana sendiri.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 · Mengenal Pola Berulang"
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab11-sub1.jpg"
          alt="Tiga anak dan burung Biru melihat bendera yang bergantian warna di pagar sekolah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pola adalah sesuatu yang berulang dengan cara yang sama, seperti irama lagu yang selalu kembali.",
            "Kalau bagian yang berulang sudah ketemu, kita bisa menebak apa yang datang berikutnya.",
          ]}
        >
          <Dialog nama="Maya" anak="Lihat pagarnya. Warnanya teratur sekali." />
          <Dialog nama="Lita" anak="Merah, kuning. Merah, kuning. Terus begitu!" />
          <Dialog nama="Biru" anak="Merah, kuning! Merah, kuning!" />
          <Papan anak="merah kuning | merah kuning | merah kuning" />
          <Dialog nama="Lita" anak="Bendera berikutnya merah, karena polanya mulai lagi dari awal." />
          <KuisSuara
            id={idKuis("A", 0)}
            pertanyaan="Deretnya bola, basket, bola, basket, bola. Bola apa yang datang berikutnya?"
            periksa={(teks) => naskah(teks).includes("basket") && !naskah(teks).includes("sepak")}
            petunjuk="Bentuknya bergantian: bola, basket, bola, basket."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="bunga matahari, tulip, bunga matahari, tulip, bunga matahari, ?" />}
            pertanyaan="Tulis nama bentuk yang tepat di kotak kosong."
            pesanSalah="Polanya bunga matahari lalu tulip."
            umpan="Berikutnya tulip."
            alias={["tulip"]}
            konteks="Bentuk berikutnya adalah tulip."
            periksa={(teks) => naskah(teks).includes("tulip")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 2 · Menemukan Satuan Pengulangan"
          warna="border-sky-200 bg-sky-50/50"
          src="/doodle-mtk/mtk-1-bab11-sub2.jpg"
          alt="Sembilan manik berpola dua gelap satu terang, diulang tiga kali, dengan kartu angka 3."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Setiap pola punya bagian yang diulang. Bagian itu bisa satu benda, bisa juga beberapa benda.",
            "Kalau panjang satu pengulangan sudah tahu, kita bisa menebak jauh ke depan.",
          ]}
        >
          <Dialog nama="Maya" anak="Gelangku: biru, biru, hijau. Biru, biru, hijau." />
          <Dialog nama="Lita" anak="Satu putaran ada tiga manik. Dua biru, satu hijau." />
          <Dialog nama="Biru" anak="Tiga! Tiga!" />
          <Papan anak="biru biru hijau | biru biru hijau | panjangnya 3" />
          <Dialog nama="Lita" anak="Manik ke-13 sama dengan manik pertama, karena 13 dibagi 3 bersisa 1." />
          <KuisSuara
            id={idKuis("A", 2)}
            pertanyaan="Pada segitiga, kotak, kotak, ada berapa bentuk dalam satu pengulangan?"
            periksa={(teks) => hanyaKata(teks, "tiga", "3")}
            petunjuk="Satu segitiga dan dua kotak."
          />
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="apel pisang anggur apel pisang anggur" />}
            pertanyaan="Tulis satu pengulangan lengkap: tiga buah yang berulang."
            pesanSalah="Satu pengulangan adalah apel, pisang, anggur."
            umpan="Garis pemisahnya ada di antara anggur dan apel."
            alias={["apel pisang anggur"]}
            konteks="Satu pengulangan adalah apel, pisang, anggur."
            periksa={(teks) => {
              const biasa = naskah(teks);
              return biasa.includes("apel") && biasa.includes("pisang") && biasa.includes("anggur");
            }}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 3 · Melanjutkan Pola Gambar"
          warna="border-emerald-200 bg-emerald-50/40"
          src="/doodle-mtk/mtk-1-bab11-sub3.jpg"
          alt="Hiasan kertas berpola bintang, hati, hati, lalu dua kotak kosong."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk melanjutkan pola, cari dulu satu pengulangan penuh.",
            "Lalu ulangi terus sampai kotak kosong terisi.",
          ]}
        >
          <Dialog nama="Lita" anak="Hiasan pestaku: bintang, hati, hati. Aku tidak tahu yang berikutnya." />
          <Dialog nama="Maya" anak="Pengulangannya bintang, hati, hati." />
          <Dialog nama="Yoga" anak="Berarti yang berikutnya bintang!" />
          <Papan anak="bintang hati hati | bintang hati hati | berikutnya hati hati" />
          <KuisSuara
            id={idKuis("A", 4)}
            pertanyaan="Pola ikan besar, ikan kecil, ikan kecil. Setelah ikan kecil yang terakhir, hewan apa yang datang?"
            periksa={(teks) => {
              const biasa = naskah(teks);
              return biasa.includes("hiu") || (biasa.includes("besar") && !biasa.includes("kecil"));
            }}
            petunjuk="Ulangi dari awal: ikan besar, ikan kecil, ikan kecil."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="segitiga kotak kotak segitiga kotak kotak ? ? ?" />}
            pertanyaan="Tulis tiga bentuk berikutnya."
            pesanSalah="Pengulangannya segitiga, kotak, kotak."
            umpan="Berikutnya segitiga, kotak, kotak."
            alias={["segitiga kotak kotak"]}
            konteks="Tiga bentuk berikutnya adalah segitiga, kotak, kotak."
            periksa={(teks) => /segitiga\s+(kotak|persegi)\s+(kotak|persegi)/.test(naskah(teks))}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 4 · Pola Bilangan"
          warna="border-orange-200 bg-orange-50/40"
          src="/doodle-mtk/mtk-1-bab11-sub4.jpg"
          alt="Papan tulis menunjukkan 2 4 6 8 10 dengan tambah 2, dan 1 2 3 1 2 3."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Pola angka ada dua. Langkah tetap naik atau turun dengan jumlah yang sama.",
            "Pola berulang kembali ke angka awal, seperti lagu.",
          ]}
        >
          <Dialog nama="Maya" anak="Yang ini 2, 4, 6, 8. Yang ini 1, 2, 3, 1, 2, 3." />
          <Dialog nama="Lita" anak="Yang pertama naik 2 setiap langkah. Yang kedua kembali ke satu." />
          <Papan anak="2, 4, 6, 8, 10 naik 2 · 20, 18, 16, 14 turun 2" />
          <Dialog nama="Biru" anak="Turun! Turun!" />
          <KuisSuara
            id={idKuis("A", 6)}
            pertanyaan="Deret 5, 10, 15, 20. Angka berapa yang datang berikutnya?"
            periksa={(teks) => naskah(teks).includes("dua puluh lima") || adaToken(teks, "25")}
            petunjuk="Dari 5 ke 10 naik 5."
          />
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="30, 27, 24, ?, ?" />}
            pertanyaan="Tulis dua angka berikutnya."
            pesanSalah="Setiap langkah turun 3."
            umpan="Berikutnya 21, lalu 18."
            alias={["21 18"]}
            konteks="Dua angka berikutnya adalah 21 dan 18."
            periksa={(teks) => urutAngka(teks, ["21", "18"]) || urutFrasa(teks, "dua puluh satu", "delapan belas")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 5 · Membuat Pola Sendiri"
          warna="border-fuchsia-200 bg-fuchsia-50/40"
          src="/doodle-mtk/mtk-1-bab11-sub5.jpg"
          alt="Yoga menstempel pola segitiga dan lingkaran yang diulang tiga kali."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Untuk membuat pola, pilih dulu isi satu pengulangan, lalu tentukan urutannya.",
            "Ulangi terus. Tidak ada jawaban salah selama pengulangannya sama.",
          ]}
        >
          <Dialog nama="Maya" anak="Pilih dua bentuk, misalnya segitiga lalu lingkaran, lalu ulangi." />
          <Dialog nama="Lita" anak="Yang tiga bentuk juga boleh: bintang, hati, bunga." />
          <Papan anak="bintang hati bunga | bintang hati bunga | bintang hati bunga" />
          <KuisSuara
            id={idKuis("A", 8)}
            pertanyaan="Pola Lita: bintang, hati, bunga, dan di ujung ada bintang. Bentuk apa berikutnya?"
            periksa={(teks) => kataUtuh(teks, "hati") || naskah(teks).includes("love")}
            petunjuk="Setelah bintang, berikutnya hati."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="3 bentuk, ulangi 3 kali" />}
            pertanyaan="Tulis polamu. Pakai 3 nama bentuk yang berbeda, lalu ulangi urutannya 3 kali."
            pesanSalah="Contoh: bintang hati bunga bintang hati bunga bintang hati bunga."
            umpan="Pengulangannya sama tiga kali."
            alias={[]}
            konteks="Benar jika tiga nama bentuk berbeda diulang tiga kali dengan urutan yang sama."
            periksa={(teks) => polaBerulang(teks, 3, 3)}
          />
        </Adegan>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Pola merah, hijau, merah, hijau, merah. Bentuk berikutnya apa?"
          visual={<Papan anak="merah hijau merah hijau merah ?" />}
          pilihan={[
            { huruf: "A", teks: "Merah" },
            { huruf: "B", teks: "Hijau" },
            { huruf: "C", teks: "Biru" },
            { huruf: "D", teks: "Bebas" },
          ]}
          benar="B"
          umpan="Polanya bergantian. Setelah merah, berikutnya hijau."
          salah="Lihat dua warna yang bergantian."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan deret dengan panjang pengulangannya."
          baris={[
            { kiri: "merah, segitiga", pilihan: panjang, benar: "2 bentuk" },
            { kiri: "apel, pisang, anggur", pilihan: panjang, benar: "3 bentuk" },
            { kiri: "bintang, bintang, hati, hati", pilihan: panjang, benar: "4 bentuk" },
          ]}
          umpan="Dua bentuk, tiga bentuk, lalu empat bentuk."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun supaya polanya kotak, lingkaran, kotak, lingkaran."
          acak={["lingkaran", "kotak", "lingkaran", "kotak"]}
          benar={["kotak", "lingkaran", "kotak", "lingkaran"]}
          umpan="Kotak, lingkaran, lalu diulang lagi."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif pola. Pilih benar atau salah."
          baris={[
            { teks: "Deret biru, biru, hijau, biru, biru, hijau punya pengulangan 3 bentuk.", benar: true },
            { teks: "Deret mobil, motor, mobil, motor punya pengulangan 3 bentuk.", benar: false },
            { teks: "Pola berulang selalu naik terus.", benar: false },
          ]}
          umpan="Biru biru hijau panjangnya tiga. Mobil motor panjangnya dua. Pola berulang kembali ke awal."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga deret berpola. Ketuk yang tidak berpola."
          pilihan={[
            { huruf: "A", teks: "kuning, biru, kuning, biru, kuning, biru" },
            { huruf: "B", teks: "bunga, daisy, bunga, daisy, bunga, daisy" },
            { huruf: "C", teks: "hijau, hijau, merah, kuning, hijau, merah" },
            { huruf: "D", teks: "bintang, bulan, bintang, bulan, bintang, bulan" },
          ]}
          benar="C"
          umpan="Hijau hijau merah kuning tidak pernah berulang sama."
          salah="Cari deret yang urutannya berubah."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Pola adalah bagian yang berulang."
          alias={["bagian yang berulang", "pola adalah"]}
          konteks="Pola adalah bagian yang berulang."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB11.kartu[1];
  const jenis = ["Langkah tetap naik", "Langkah tetap turun", "Berulang"];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🔁🦜" judul={kartu.judul} anak="Lima papan cara membaca pola" />
      <div className="mt-4 space-y-4">
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 1 · Apa Itu Pola?</h5>
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Pola adalah bagian yang berulang dengan cara yang sama.",
              "Kalau satu putaran sudah selesai, mulai lagi dari awal.",
            ]}
          />
          <TabelInfoGrafis
            judul="anjing kucing"
            kepala={["Langkah", "Yang dilihat", "Hasil"]}
            baris={[
              ["Cari ulang", "anjing, kucing", "Satu putaran"],
              ["Lanjut", "mulai dari awal", "anjing"],
            ]}
            kaki="Berikutnya anjing."
          />
          <KuisSuara
            id={idKuis("B", 0)}
            pertanyaan="Deret lolipop, permen, lolipop, permen, lolipop. Permen apa yang berikutnya?"
            periksa={(teks) => naskah(teks).includes("lolipop") || naskah(teks).includes("lollipop")}
            petunjuk="Setelah permen, polanya kembali ke lolipop."
          />
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="matahari, bulan, matahari, bulan, matahari, ?" />}
            pertanyaan="Tulis bentuk berikutnya."
            pesanSalah="Polanya matahari lalu bulan."
            umpan="Berikutnya bulan."
            alias={["bulan"]}
            konteks="Bentuk berikutnya adalah bulan."
            periksa={(teks) => kataUtuh(teks, "bulan")}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 2 · Panjang Pengulangan</h5>
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Panjang pengulangan adalah berapa banyak benda dalam satu putaran.",
              "Dua benda berarti bergantian. Tiga benda berarti berulang setiap tiga langkah.",
            ]}
          />
          <Papan anak="segitiga kotak kotak = 3 · apel pisang, bentuk ke-5 = apel" />
          <KuisSuara
            id={idKuis("B", 2)}
            pertanyaan="Pada merah, kuning, biru, ada berapa bentuk dalam satu pengulangan?"
            periksa={(teks) => hanyaKata(teks, "tiga", "3")}
            petunjuk="Merah, kuning, dan biru."
          />
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="bola bola basket bola bola basket" />}
            pertanyaan="Tulis satu pengulangan lengkap."
            pesanSalah="Satu pengulangan adalah bola, bola, basket."
            umpan="Garis pemisahnya ada setelah basket."
            alias={["bola bola basket"]}
            konteks="Satu pengulangan adalah bola, bola, basket."
            periksa={(teks) => {
              const biasa = naskah(teks);
              return biasa.includes("bola bola") && biasa.includes("basket");
            }}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 3 · Melanjutkan Pola Gambar</h5>
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Langkah pertama, cari satu pengulangan penuh.",
              "Langkah kedua, ulangi terus. Kalau kotaknya jauh, hitung posisinya di dalam satu putaran.",
            ]}
          />
          <Papan anak="bunga matahari matahari · bentuk ke-10 pada segitiga lingkaran lingkaran adalah segitiga" />
          <KuisSuara
            id={idKuis("B", 4)}
            pertanyaan="Pola kura-kura, kelinci, kelinci, dan di ujung ada kura-kura. Hewan apa berikutnya?"
            periksa={(teks) => naskah(teks).includes("kelinci")}
            petunjuk="Setelah kura-kura, berikutnya kelinci."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="kotak lingkaran lingkaran kotak lingkaran lingkaran ? ? ? ?" />}
            pertanyaan="Tulis empat bentuk berikutnya."
            pesanSalah="Pengulangannya kotak, lingkaran, lingkaran."
            umpan="Berikutnya kotak, lingkaran, lingkaran, kotak."
            alias={["kotak lingkaran lingkaran kotak"]}
            konteks="Empat bentuk berikutnya adalah kotak, lingkaran, lingkaran, kotak."
            periksa={(teks) =>
              /(kotak|persegi|hitam)\s+(lingkaran|putih|bulat)\s+(lingkaran|putih|bulat)\s+(kotak|persegi|hitam)/.test(
                naskah(teks),
              )
            }
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 4 · Pola Bilangan</h5>
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Pola langkah tetap naik atau turun dengan jumlah yang sama.",
              "Pola berulang kembali ke angka awal, misalnya satu, dua, tiga, satu, dua, tiga.",
            ]}
          />
          <TabelInfoGrafis
            judul="Tiga jenis"
            kepala={["Jenis", "Ciri", "Contoh"]}
            baris={[
              ["Naik", "Beda sama, makin besar", "5, 10, 15, 20"],
              ["Turun", "Beda sama, makin kecil", "20, 16, 12, 8"],
              ["Berulang", "Kembali ke awal", "1, 2, 3, 1, 2, 3"],
            ]}
            kaki="3, 6, 9, 12 berikutnya 15. 40, 35, 30, 25 berikutnya 20."
          />
          <KuisSuara
            id={idKuis("B", 6)}
            pertanyaan="Deret 10, 20, 30, 40. Angka berikutnya berapa?"
            periksa={(teks) => {
              const biasa = naskah(teks);
              return (biasa.includes("lima puluh") && !biasa.includes("belas")) || adaToken(teks, "50");
            }}
            petunjuk="Setiap langkah naik 10."
          />
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="100, 90, 80, ?, ?" />}
            pertanyaan="Tulis dua angka berikutnya."
            pesanSalah="Setiap langkah turun 10."
            umpan="Berikutnya 70, lalu 60."
            alias={["70 60"]}
            konteks="Dua angka berikutnya adalah 70 dan 60."
            periksa={(teks) => urutAngka(teks, ["70", "60"]) || urutFrasa(teks, "tujuh puluh", "enam puluh")}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 5 · Membuat Pola Sendiri</h5>
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Membuat pola itu bebas. Pilih berapa bentuk dalam satu pengulangan.",
              "Tentukan urutannya, lalu ulangi terus. Jangan berubah di tengah jalan.",
            ]}
          />
          <Papan anak="1 pilih isi · 2 tentukan urutan · 3 ulangi terus" />
          <KuisSuara
            id={idKuis("B", 8)}
            pertanyaan="Pola mobil, mobil, pesawat, dan di ujung ada mobil. Bentuk berikutnya apa?"
            periksa={(teks) => naskah(teks).includes("mobil") && !naskah(teks).includes("pesawat")}
            petunjuk="Setelah satu mobil, masih ada mobil lagi sebelum pesawat."
          />
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="2 bentuk, ulangi 4 kali" />}
            pertanyaan="Tulis polamu. Pakai 2 nama bentuk yang berbeda, lalu ulangi urutannya 4 kali."
            pesanSalah="Contoh: hijau segitiga hijau segitiga hijau segitiga hijau segitiga."
            umpan="Urutannya sama di setiap pengulangan."
            alias={[]}
            konteks="Benar jika dua nama bentuk berbeda diulang empat kali dengan urutan yang sama."
            periksa={(teks) => polaBerulang(teks, 2, 4)}
          />
        </article>
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Ungu, ungu, oranye berulang. Panjang pengulangannya berapa?"
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "6" },
          ]}
          benar="B"
          umpan="Dua ungu dan satu oranye. Panjangnya 3."
          salah="Hitung benda sampai pola mulai lagi."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan deret dengan jenis polanya."
          baris={[
            { kiri: "8, 16, 24, 32", pilihan: jenis, benar: "Langkah tetap naik" },
            { kiri: "1, 5, 1, 5, 1", pilihan: jenis, benar: "Berulang" },
            { kiri: "50, 45, 40, 35", pilihan: jenis, benar: "Langkah tetap turun" },
          ]}
          umpan="Naik 8, kembali ke 1 dan 5, lalu turun 5."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun supaya naik 4 setiap langkah."
          acak={["12", "4", "20", "8", "16"]}
          benar={["4", "8", "12", "16", "20"]}
          umpan="4, 8, 12, 16, 20."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Cek pola. Pilih benar atau salah."
          baris={[
            { teks: "Deret 15, 20, 25, 30 naik 5 setiap langkah.", benar: true },
            { teks: "Deret merah, kuning, merah, kuning punya pengulangan 3 bentuk.", benar: false },
            { teks: "Pola berulang angka selalu makin besar.", benar: false },
          ]}
          umpan="15 ke 20 naik 5. Merah kuning panjangnya dua. Pola berulang tidak harus makin besar."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Lengkapi 60, 55, 50, kotak, 40, 35."
          visual={<Papan anak="60 – 55 – 50 – ? – 40 – 35" />}
          pilihan={[
            { huruf: "A", teks: "48" },
            { huruf: "B", teks: "47" },
            { huruf: "C", teks: "45" },
            { huruf: "D", teks: "44" },
          ]}
          benar="C"
          umpan="Setiap langkah turun 5. 50 dikurangi 5 sama dengan 45."
          salah="Lihat beda dari 60 ke 55."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Sudah sampai ujung, mulai lagi dari awal."
          alias={["mulai lagi", "dari awal"]}
          konteks="Sudah sampai ujung, mulai lagi dari awal."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB11.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🏭🦜"
        judul={kartu.judul}
        anak="Sepuluh pesanan manik · gambar, angka, dan rancangan sendiri"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Kalian menjadi perancang manik. Setiap pesanan punya pola warna sendiri.",
          "Temukan pengulangannya, lalu lanjutkan dengan warna yang tepat.",
          "Kalau muatan angkanya naik atau turun dengan jumlah yang sama, itu langkah tetap.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab11-pabrik.jpg"
        alt="Burung Biru memakai topi kecil terbang di atas ban berjalan pabrik manik."
      />
      <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>Salah warna membuat ban berjalan berbalik, lalu kamu boleh mencoba lagi.</p>
        <p>
          Jawaban benar pertama mendapat 3 manik biru. Setelah satu petunjuk, 2 manik. Setelah dua petunjuk, 1 manik. Kaca pembesar membantu, tetapi mengurangi manik.
        </p>
        <p>Kumpulkan 10 manik biru untuk membuka pabrik otomatis dan menerima lencana perancang pola.</p>
      </div>
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB11}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB11}
        penutup="Pabrik otomatis terbuka. Biru mendapat lencana perancang pola."
        bunga="🔵🟢🔴🟡🟣"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB11.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "🏅 Perancang Pola Ahli" : skor >= 6 ? "📿 Penenun Cerdas" : "🦜 Sahabat Biru";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu bisa menemukan pola apa saja!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi perancang ahli!"
        : "Ayo bermain pola lagi bersama Biru, kamu pasti bisa!";
  const jenis = ["Langkah tetap naik", "Langkah tetap turun", "Pola berulang"];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝🦜"
        judul={kartu.judul}
        anak="Sepuluh soal pola gambar dan pola angka"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sekarang kamu mengerjakan sendiri. Ada sepuluh soal.",
          "Cari pengulangannya dulu, lalu ulangi dari awal. Untuk angka, lihat naik berapa atau turun berapa.",
          "Periksa lagi jawabanmu. Selamat mengerjakan.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab11-evaluasi.jpg"
        alt="Meja ujian dengan pensil dan krayon. Burung Biru mengangkat sayap."
      />
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
          judul="1. Lanjutkan pola gambar"
          visual={<Papan anak="kepik lebah lebah kepik lebah lebah kepik ? ? ?" />}
          pertanyaan="Tulis tiga bentuk berikutnya."
          pesanSalah="Pengulangannya kepik, lebah, lebah. Setelah kepik, berikutnya lebah, lebah, lalu kepik."
          umpan="Berikutnya lebah, lebah, kepik."
          alias={["lebah lebah kepik"]}
          konteks="Tiga bentuk berikutnya adalah lebah, lebah, kepik."
          periksa={(teks) => {
            const biasa = naskah(teks);
            const kepik = biasa.includes("kepik") || biasa.includes("kumbang") || biasa.includes("lady");
            return kepik && (biasa.includes("lebah lebah") || biasa.includes("dua lebah"));
          }}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Pola segitiga, lingkaran, lingkaran berulang. Bentuk apa pada posisi ke-11?"
          visual={<Papan anak="segitiga lingkaran lingkaran … posisi 11" />}
          pilihan={[
            { huruf: "A", teks: "Segitiga" },
            { huruf: "B", teks: "Lingkaran" },
            { huruf: "C", teks: "Tidak bisa ditentukan" },
            { huruf: "D", teks: "Bebas" },
          ]}
          benar="B"
          umpan="11 dibagi 3 bersisa 2. Sisa 2 adalah bentuk kedua, yaitu lingkaran."
          salah="Bagi 11 dengan 3, lalu lihat sisanya."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan="3. Gelang oranye, ungu, oranye, ungu, oranye. Ucapkan warna manik berikutnya."
            periksa={(teks) => kataUtuh(teks, "ungu") || naskah(teks).includes("purple")}
            petunjuk="Warnanya bergantian."
          />
        </div>
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Yoga berkata, warna ke-6 pada merah, hijau adalah hijau. Apakah Yoga benar?"
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, seharusnya merah" },
            { huruf: "C", teks: "Salah, seharusnya biru" },
            { huruf: "D", teks: "Salah, tidak bisa ditentukan" },
          ]}
          benar="A"
          umpan="6 dibagi 2 habis. Bentuk kedua adalah hijau."
          salah="Hitung sampai posisi ke-6."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan setiap deret dengan jenisnya."
          baris={[
            { kiri: "2, 4, 6, 8, 10", pilihan: jenis, benar: "Langkah tetap naik" },
            { kiri: "9, 7, 5, 3, 1", pilihan: jenis, benar: "Langkah tetap turun" },
            { kiri: "4, 6, 8, 4, 6, 8", pilihan: jenis, benar: "Pola berulang" },
          ]}
          umpan="Naik 2, turun 2, lalu 4 6 8 kembali lagi."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Pola buatan sendiri"
          visual={<Papan anak="3 bentuk, ulangi 3 kali" />}
          pertanyaan="Tulis polamu sendiri. Tiga nama bentuk berbeda, urutannya diulang 3 kali."
          pesanSalah="Contoh: bintang hati bunga bintang hati bunga bintang hati bunga."
          umpan="Urutan yang sama terulang tiga kali."
          alias={[]}
          konteks="Benar jika tiga nama bentuk berbeda diulang tiga kali dengan urutan yang sama."
          periksa={(teks) => polaBerulang(teks, 3, 3)}
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Lengkapi 7, 14, 21, kotak, 35, 42."
          visual={<Papan anak="7, 14, 21, ?, 35, 42" />}
          pilihan={[
            { huruf: "A", teks: "26" },
            { huruf: "B", teks: "27" },
            { huruf: "C", teks: "28" },
            { huruf: "D", teks: "30" },
          ]}
          benar="C"
          umpan="Setiap langkah naik 7. 21 tambah 7 sama dengan 28."
          salah="Lihat beda dari 7 ke 14."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun supaya turun 6 setiap langkah."
          acak={["12", "30", "6", "24", "18"]}
          benar={["30", "24", "18", "12", "6"]}
          umpan="30, 24, 18, 12, 6."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 8)}
            pertanyaan="9. Deret 3, 6, 9, 12. Ucapkan angka berikutnya, lalu sebutkan naik berapa."
            periksa={(teks) => {
              const biasa = naskah(teks);
              const angka = biasa.includes("lima belas") || adaToken(teks, "15");
              const alasan = biasa.includes("naik") || biasa.includes("tiga") || biasa.includes("tambah");
              return angka && alasan;
            }}
            petunjuk="Lihat beda dari 3 ke 6."
          />
        </div>
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Pola hijau, merah, merah. Gelang mau utuh sampai 12 manik. Mana yang benar?"
          visual={<Papan anak="hijau merah merah, sampai manik ke-12" />}
          pilihan={[
            { huruf: "A", teks: "Manik ke-10 hijau, berikutnya merah merah, ada 4 pengulangan" },
            { huruf: "B", teks: "Manik ke-10 merah, berikutnya hijau merah, ada 4 pengulangan" },
            { huruf: "C", teks: "Manik ke-10 hijau, berikutnya merah hijau, ada 3 pengulangan" },
            { huruf: "D", teks: "Manik ke-10 hijau, berikutnya merah merah, ada 3 pengulangan" },
          ]}
          benar="A"
          umpan="10 dibagi 3 bersisa 1, jadi hijau. Manik 11 dan 12 merah. 12 dibagi 3 sama dengan 4 pengulangan."
          salah="Cari sisa pembagian untuk posisi ke-10, lalu lanjutkan."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Cari satu pengulangan, lalu ulangi dari awal."
          alias={["satu pengulangan", "ulangi dari awal"]}
          konteks="Cari satu pengulangan, lalu ulangi dari awal."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Polamu rapi dari awal sampai akhir.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab11({
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
          src: "/doodle-mtk/mtk-1-bab11-poin.jpg",
          alt: "Burung Biru di atas papan kalimat kunci, dikelilingi gelang manik.",
        }}
        cuplikan={cuplikanKalimat([
          "Pola adalah bagian yang berulang. Cari dulu satu pengulangan penuh, lalu ulangi dari awal.",
          "Kalau kotaknya jauh, hitung posisinya di dalam satu putaran.",
          "Pola angka: lihat naik berapa atau turun berapa. Kalau angkanya kembali ke awal, itu pola berulang.",
          "Pola buatan sendiri boleh bebas, asal urutannya tidak berubah.",
        ])}
        poin={[
          "Pola itu bagian yang berulang.",
          "Cari dulu satu pengulangan penuh.",
          "Sudah sampai ujung? Mulai lagi dari awal.",
          "Hitung posisinya di dalam putaran.",
          "Pola angka: naik berapa, turun berapa?",
          "Kalau angkanya kembali ke awal, itu pola berulang.",
          "Bikin pola sendiri? Sekali pilih, jangan berubah.",
        ]}
        penutup="Cari satu pengulangan, lalu ulangi dari awal."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
