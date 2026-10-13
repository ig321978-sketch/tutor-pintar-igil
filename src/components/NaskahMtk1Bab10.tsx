"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB10 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB10 } from "@/lib/tema-misi-mtk-1";
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
import { MODUL_MTK1_BAB10 } from "@/lib/modul-resmi-mtk-1-bab10";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB10.id;

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

function angkaAtauKata(teks: string, angka: string, kata: string): boolean {
  return adaToken(teks, angka) || naskah(teks).includes(kata);
}

function bukanPuluh(teks: string): boolean {
  const biasa = naskah(teks);
  return !biasa.includes("puluh") && !biasa.includes("belas");
}

function hanyaKata(teks: string, kata: string, angka: string): boolean {
  return bukanPuluh(teks) && (kataUtuh(teks, kata) || adaToken(teks, angka));
}

function simpanDanHasil(teks: string, angka: string, kata: string): boolean {
  const biasa = naskah(teks);
  const hasil = angkaAtauKata(teks, angka, kata);
  const simpan = adaToken(teks, "1") || kataUtuh(teks, "satu") || biasa.includes("simpan");
  return hasil && simpan;
}

function kalimatKurang(teks: string, kiri: string, kanan: string, angka: string, kata: string): boolean {
  const biasa = naskah(teks);
  const jawab = angkaAtauKata(teks, angka, kata);
  const soal = (biasa.includes(kiri) && biasa.includes(kanan)) || biasa.includes("-") || biasa.includes("kurang");
  return jawab && soal;
}

function pinjamDuaPuluhLima(teks: string): boolean {
  const biasa = naskah(teks);
  const jawab = angkaAtauKata(teks, "25", "dua puluh lima");
  const jejak = biasa.includes("11") || biasa.includes("pinjam") || biasa.includes("coret") || adaToken(teks, "6");
  return jawab && jejak;
}

function artiKurang(teks: string): boolean {
  const biasa = naskah(teks);
  return biasa.includes("kurang") && !biasa.includes("tambah");
}

function dimakanKurang(teks: string): boolean {
  const biasa = naskah(teks);
  return (biasa.includes("dimakan") || biasa.includes("makan")) && biasa.includes("kurang") && !biasa.includes("tambah");
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
  Nia: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Rafi: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Tono: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Kolu: "border-[#F0AB00] bg-[#FFF8E8]",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nia: "👧",
  Rafi: "👦",
  Tono: "👦",
  Kolu: "🐨",
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
    <p className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Hitung lagi, lalu pasangkan." />
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
  const [susun, setSusun] = useState<string[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = acak.filter((item) => !susun.includes(item));
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((item, indeks) => item === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.join(" ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setSusun((lama) => [...lama, item]);
              setStatus(null);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setSusun((lama) => lama.slice(0, -1));
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
      <HasilJawabanKuis status={status} pesanSalah="Hitung dulu, lalu susun lagi." />
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
      <HasilJawabanKuis status={status} pesanSalah="Cek satuannya dulu. Lebih dari sembilan berarti simpan. Bawah lebih besar berarti pinjam." />
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
  const kartu = MODUL_MTK1_BAB10.kartu[0];
  const hasilCocok = ["24", "38", "45"];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="👧👦🐨" judul={kartu.judul} anak="Nia, Rafi, Tono, dan Kolu di toko kelontong" />
      <div className="mt-4">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Siswa bisa menjumlahkan bilangan sampai 100 tanpa menyimpan dan dengan menyimpan.</li>
          <li>Siswa bisa mengurangkan bilangan sampai 100 tanpa meminjam dan dengan meminjam.</li>
          <li>Siswa bisa menyelesaikan soal cerita sehari-hari.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Sub-bab 1 · Penjumlahan Tanpa Menyimpan"
          simbol={[
            { ikon: "➕", teks: "Gabungkan" },
            { ikon: "1️⃣", teks: "Satuan dulu" },
            { ikon: "🔟", teks: "Lalu puluhan" },
          ]}
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab10-sub1.jpg"
          alt="Nia membawa kotak 23 dan Rafi membawa kotak 14. Di meja tertulis 23 tambah 14 sama dengan 37."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Hari ini kita menjumlahkan dua bilangan. Kita mulai dari yang mudah: satuannya tidak melewati sepuluh.",
            "Kita tidak perlu menyimpan apa pun. Jumlahkan satuan dulu, lalu puluhan.",
          ]}
        >
          <Dialog nama="Nia" anak="Kolu, aku bawa 23 kelereng!" />
          <Dialog nama="Rafi" anak="Aku bawa 14 kelereng!" />
          <Dialog nama="Tono" anak="Kalau digabung, jadi berapa?" />
          <Dialog nama="Kolu" anak="Ayo simpan di rumah angka. Satuan dulu, ya!" />
          <Papan anak="➕ 23 + 14 · 1️⃣ 3 + 4 = 7 · 🔟 2 + 1 = 3" />
          <Dialog nama="Nia" anak="Jadi 37!" />
          <Dialog nama="Kolu" anak="Tepat! Tidak ada yang disimpan, semua muat." />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("A", 0)}
              pertanyaan="Pada 42 + 35, hitung dulu satuannya: 2 + 5. Berapa?"
              periksa={(teks) => hanyaKata(teks, "tujuh", "7")}
              petunjuk="Hitung maju dari 2 sebanyak 5."
            />
          </div>
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="51 + 26 = ?" />}
            pertanyaan="Tulis hasil 51 + 26."
            pesanSalah="Satuan 1 + 6 = 7. Puluhan 5 + 2 = 7."
            umpan="Hasilnya 77."
            alias={["77", "tujuh puluh tujuh"]}
            konteks="51 + 26 = 77."
            periksa={(teks) => angkaAtauKata(teks, "77", "tujuh puluh tujuh")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 2 · Penjumlahan dengan Menyimpan"
          simbol={[
            { ikon: "🔟", teks: "Lebih dari 9" },
            { ikon: "1️⃣", teks: "Simpan 1 ke atas" },
            { ikon: "✏️", teks: "Tulis sisanya" },
          ]}
          warna="border-sky-200 bg-sky-50/50"
          src="/doodle-mtk/mtk-1-bab10-sub2.jpg"
          alt="Kolu menunjuk hitungan 28 tambah 47 sama dengan 75, dengan angka simpanan 1 di atas."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kalau jumlah satuannya lebih dari sembilan, kita tidak bisa menaruh semuanya di rumah satuan.",
            "Kita pindahkan satu puluhan ke rumah sebelah. Itulah menyimpan. Simpanan kecil ditulis di atas, dan ikut dihitung.",
          ]}
        >
          <Dialog nama="Nia" anak="Aku punya 28 tutup botol." />
          <Dialog nama="Rafi" anak="Aku punya 47." />
          <Dialog nama="Tono" anak="Satuannya 8 + 7. Itu lebih dari sepuluh!" />
          <Dialog nama="Kolu" anak="Betul! Kita harus menyimpan." />
          <Papan anak="🔟 8 + 7 = 15 · ✏️ tulis 5 · 1️⃣ simpan 1 · hasil 75" />
          <Dialog nama="Rafi" anak="Jadi 75!" />
          <Dialog nama="Nia" anak="Jangan lupa angka 1 yang kecil di atas, ya!" />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("A", 2)}
              pertanyaan="Pada 36 + 45, satuannya 6 + 5 = 11. Simpan berapa ke puluhan?"
              periksa={(teks) => hanyaKata(teks, "satu", "1")}
              petunjuk="11 itu satu puluhan dan satu satuan."
            />
          </div>
          <TulisBebas
            id={idKuis("A", 3)}
            visual={<Papan anak="29 + 36 · kotak simpanan di atas" />}
            pertanyaan="Tulis angka simpanannya, lalu tulis hasil 29 + 36."
            pesanSalah="9 + 6 = 15. Tulis 5, simpan 1. Lalu 1 + 2 + 3 = 6."
            umpan="Simpanan 1. Hasilnya 65."
            alias={["65", "simpan 1"]}
            konteks="29 + 36 = 65, dengan simpanan 1."
            periksa={(teks) => simpanDanHasil(teks, "65", "enam puluh lima")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 3 · Pengurangan Tanpa Meminjam"
          simbol={[
            { ikon: "➖", teks: "Kurangi" },
            { ikon: "✅", teks: "Bawah lebih kecil" },
            { ikon: "🔟", teks: "Puluhan ikut kurang" },
          ]}
          warna="border-emerald-200 bg-emerald-50/40"
          src="/doodle-mtk/mtk-1-bab10-sub3.jpg"
          alt="Rak bertanda 46 jeruk. Rafi membawa keranjang 23. Nia menulis 46 kurang 23 sama dengan 23."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sekarang kita mengurangi. Kalau angka di bawah lebih kecil dari angka di atas, kita tidak perlu meminjam.",
            "Kurangi satuannya dulu, lalu puluhannya. Susunannya harus rapi supaya tidak salah rumah.",
          ]}
        >
          <Dialog nama="Rafi" anak="Kolu, aku ambil 23 jeruk. Tadinya ada 46." />
          <Dialog nama="Tono" anak="Sisanya berapa?" />
          <Dialog nama="Nia" anak="Satuan di bawah 3, satuan di atas 6. Boleh dikurangi." />
          <Papan anak="➖ 6 − 3 = 3 · 🔟 4 − 2 = 2 · sisa 23" />
          <Dialog nama="Rafi" anak="Sisa 23 jeruk!" />
          <Dialog nama="Kolu" anak="Yang kecil ada di bawah, jadi aman." />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("A", 4)}
              pertanyaan="Pada 78 − 35, satuannya 8 − 5. Berapa hasilnya?"
              periksa={(teks) => hanyaKata(teks, "tiga", "3")}
              petunjuk="Hitung mundur dari 8 sebanyak 5 langkah."
            />
          </div>
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="95 − 42 = ?" />}
            pertanyaan="Tulis hasil 95 − 42."
            pesanSalah="Satuan 5 − 2 = 3. Puluhan 9 − 4 = 5."
            umpan="Hasilnya 53."
            alias={["53", "lima puluh tiga"]}
            konteks="95 − 42 = 53."
            periksa={(teks) => angkaAtauKata(teks, "53", "lima puluh tiga")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 4 · Pengurangan dengan Meminjam"
          simbol={[
            { ikon: "🤝", teks: "Pinjam 1 puluhan" },
            { ikon: "🔟", teks: "Satuan jadi +10" },
            { ikon: "⬇️", teks: "Puluhan berkurang 1" },
          ]}
          warna="border-orange-200 bg-orange-50/40"
          src="/doodle-mtk/mtk-1-bab10-sub4.jpg"
          alt="Papan tulis menunjukkan 52 kurang 28 sama dengan 24. Kolu terlihat bingung di gudang susu."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Kadang angka di bawah lebih besar dari angka di atas. Tiga dikurangi delapan tidak bisa.",
            "Kita meminjam dari rumah sebelah. Satu puluhan sama dengan sepuluh satuan. Setelah meminjam, puluhan berkurang satu.",
          ]}
        >
          <Dialog nama="Kolu" anak="Aku harus kirim 28 kotak, padahal aku punya 52." />
          <Dialog nama="Nia" anak="2 − 8 tidak bisa." />
          <Dialog nama="Tono" anak="Kok bisa tidak bisa?" />
          <Dialog nama="Kolu" anak="Satuan di atas lebih kecil. Kita harus meminjam dari puluhan!" />
          <Papan anak="🤝 12 − 8 = 4 · ⬇️ puluhan 4 − 2 = 2 · sisa 24" />
          <Dialog nama="Rafi" anak="Jadi sisa 24 kotak!" />
          <Dialog nama="Nia" anak="Kalau di atas lebih kecil, pinjam dulu. Lalu puluhan berkurang satu." />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("A", 6)}
              pertanyaan="Pada 63 − 27, setelah meminjam satu, angka puluhan di atas jadi berapa?"
              periksa={(teks) => hanyaKata(teks, "lima", "5")}
              petunjuk="Enam dipinjam satu, jadi tinggal lima."
            />
          </div>
          <TulisBebas
            id={idKuis("A", 7)}
            visual={<Papan anak="71 − 38 = ?" />}
            pertanyaan="Hitung satuan dulu, lalu puluhan. Tulis hasil 71 − 38."
            pesanSalah="Pinjam dulu. 11 − 8 = 3. Puluhan tinggal 6, lalu 6 − 3 = 3."
            umpan="Hasilnya 33."
            alias={["33", "tiga puluh tiga"]}
            konteks="71 − 38 = 33."
            periksa={(teks) => angkaAtauKata(teks, "33", "tiga puluh tiga")}
          />
        </Adegan>
        <Adegan
          judul="Sub-bab 5 · Soal Cerita"
          simbol={[
            { ikon: "🔍", teks: "Cari angkanya" },
            { ikon: "➕", teks: "Datang, dapat" },
            { ikon: "➖", teks: "Jatuh, terjual" },
          ]}
          warna="border-fuchsia-200 bg-fuchsia-50/40"
          src="/doodle-mtk/mtk-1-bab10-sub5.jpg"
          alt="Papan toko menunjukkan 38 tambah 45 sama dengan 83, dan 72 kurang 29 sama dengan 43."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Soal cerita punya empat langkah: cari angkanya, cari kata kuncinya, tulis kalimat matematikanya, lalu hitung.",
            "Diberi lagi atau datang artinya ditambah. Jatuh, dibeli, atau terjual artinya dikurangi.",
          ]}
        >
          <Dialog nama="Kolu" anak="Toko punya 38 jeruk. Pagi ini datang 45 jeruk. Berapa jeruk sekarang?" />
          <Dialog nama="Nia" anak="Datang berarti ditambah. Kalimatnya 38 + 45." />
          <Dialog nama="Rafi" anak="8 + 5 = 13. Simpan satu. Puluhannya 1 + 3 + 4 = 8. Jadi 83." />
          <Papan anak="➕ 38 + 45 = 83 · ➖ 72 − 29 = 43" />
          <Dialog nama="Kolu" anak="Cerita kedua: ada 72 apel. Sebanyak 29 terjual. Sisa berapa?" />
          <Dialog nama="Tono" anak="2 − 9 tidak bisa. Pinjam! 12 − 9 = 3. Lalu 6 − 2 = 4. Jadi 43." />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("A", 8)}
              pertanyaan="Kata terjual artinya ditambah atau dikurangi?"
              periksa={artiKurang}
              petunjuk="Barang yang terjual pergi dari toko."
            />
          </div>
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="Ada 56 kelinci. Sebanyak 18 dibawa pergi." />}
            pertanyaan="Tulis kalimat matematikanya dan hasilnya."
            pesanSalah="Dibawa pergi artinya kurang. 56 − 18."
            umpan="56 − 18 = 38."
            alias={["56 - 18 = 38", "38"]}
            konteks="56 dikurangi 18 sama dengan 38."
            periksa={(teks) => kalimatKurang(teks, "56", "18", "38", "tiga puluh delapan")}
          />
        </Adegan>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Berapa hasil yang benar untuk 47 + 38?"
          visual={<Papan anak="47 + 38 · simpanan 1 di atas" />}
          pilihan={[
            { huruf: "A", teks: "75" },
            { huruf: "B", teks: "85" },
            { huruf: "C", teks: "74" },
            { huruf: "D", teks: "812" },
          ]}
          benar="B"
          umpan="7 + 8 = 15. Tulis 5, simpan 1. 1 + 4 + 3 = 8. Hasilnya 85."
          salah="Jangan lupakan angka 1 yang disimpan."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan soal dengan hasilnya!"
          baris={[
            { kiri: "25 + 13", pilihan: hasilCocok, benar: "38" },
            { kiri: "62 − 38", pilihan: hasilCocok, benar: "24" },
            { kiri: "19 + 19", pilihan: hasilCocok, benar: "38" },
            { kiri: "90 − 45", pilihan: hasilCocok, benar: "45" },
          ]}
          umpan="25 + 13 = 38. 62 − 38 = 24. 19 + 19 = 38. 90 − 45 = 45."
        />
        <SusunToken
          id={idKuis("A", 12)}
          perintah="3. Susun balok supaya jadi kalimat yang benar."
          acak={["52", "34", "=", "18", "+"]}
          benar={["34", "+", "18", "=", "52"]}
          umpan="34 + 18 = 52."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif hitung. Pilih benar atau salah."
          baris={[
            { teks: "Hasil 56 + 27 perlu menyimpan.", benar: true },
            { teks: "Hasil 45 − 32 perlu meminjam.", benar: false },
            { teks: "Semua pengurangan perlu meminjam.", benar: false },
          ]}
          umpan="6 + 7 = 13, jadi simpan. 5 lebih besar dari 2, jadi tidak pinjam."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga hitungan hasilnya 65. Mana yang berbeda?"
          pilihan={[
            { huruf: "A", teks: "40 + 25" },
            { huruf: "B", teks: "80 − 15" },
            { huruf: "C", teks: "38 + 37" },
            { huruf: "D", teks: "72 − 7" },
          ]}
          benar="C"
          umpan="38 + 37 = 75. Yang lain semuanya 65."
          salah="Hitung tiap kotak sampai selesai."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Satuan dulu, puluhan kemudian."
          alias={["satuan dulu", "puluhan kemudian"]}
          konteks="Satuan dulu, puluhan kemudian."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB10.kartu[1];
  const teknik = [
    "Tambah tanpa menyimpan",
    "Tambah dengan menyimpan",
    "Kurang tanpa meminjam",
    "Kurang dengan meminjam",
  ];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🟦🟨🐨" judul={kartu.judul} anak="Lima papan cara menghitung" />
      <div className="mt-4 space-y-4">
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 1 · Menjumlah Tanpa Menyimpan</h5>
          <PanduanIkon
            butir={[
              { ikon: "➕", teks: "Jumlahkan" },
              { ikon: "👉", teks: "Mulai dari kanan" },
              { ikon: "✅", teks: "Satuan muat di 1 kotak" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Kita jumlahkan mulai dari satuan. Kalau jumlahnya masih sembilan atau kurang, kita tidak perlu menyimpan.",
              "Setelah satuan selesai, baru kita jumlahkan puluhannya.",
            ]}
          />
          <TabelInfoGrafis
            judul="43 + 25"
            kepala={["Langkah", "Hitungan", "Simpan?"]}
            baris={[
              ["🟨 Satuan", "3 + 5 = 8", "Tidak"],
              ["🟦 Puluhan", "4 + 2 = 6", "Tidak"],
            ]}
            kaki="Hasilnya 68."
          />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("B", 0)}
              pertanyaan="Berapa hasil 61 + 27? Sebutkan."
              periksa={(teks) => angkaAtauKata(teks, "88", "delapan puluh delapan")}
              petunjuk="Satuan dulu, lalu puluhan."
            />
          </div>
          <TulisBebas
            id={idKuis("B", 1)}
            visual={<Papan anak="54 + 32 = ?" />}
            pertanyaan="Tulis hasil 54 + 32."
            pesanSalah="4 + 2 = 6. 5 + 3 = 8."
            umpan="Hasilnya 86."
            alias={["86"]}
            konteks="54 + 32 = 86."
            periksa={(teks) => angkaAtauKata(teks, "86", "delapan puluh enam")}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 2 · Menjumlah dengan Menyimpan</h5>
          <PanduanIkon
            butir={[
              { ikon: "🔟", teks: "Hasil 10 atau lebih" },
              { ikon: "1️⃣", teks: "Angka kecil di atas" },
              { ikon: "✏️", teks: "Tulis angka satunya" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Kalau jumlah satuannya lebih dari sembilan, pecah jadi puluhan dan satuan.",
              "Satuannya ditulis di bawah. Puluhannya disimpan kecil di atas, dan jangan lupa ikut dihitung.",
            ]}
          />
          <Papan anak="47 + 28 · 7 + 8 = 15, simpan 1 · hasil 75" />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("B", 2)}
              pertanyaan="Pada 39 + 46, satuannya 9 + 6 = 15. Apa yang disimpan?"
              periksa={(teks) => hanyaKata(teks, "satu", "1")}
              petunjuk="15 punya satu puluhan."
            />
          </div>
          <TulisBebas
            id={idKuis("B", 3)}
            visual={<Papan anak="58 + 27 · kotak simpanan" />}
            pertanyaan="Tulis simpanannya dan hasil 58 + 27."
            pesanSalah="8 + 7 = 15. Tulis 5, simpan 1. 1 + 5 + 2 = 8."
            umpan="Simpanan 1. Hasilnya 85."
            alias={["85", "simpan 1"]}
            konteks="58 + 27 = 85, dengan simpanan 1."
            periksa={(teks) => simpanDanHasil(teks, "85", "delapan puluh lima")}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 3 · Mengurangi Tanpa Meminjam</h5>
          <PanduanIkon
            butir={[
              { ikon: "➖", teks: "Atas dikurangi bawah" },
              { ikon: "✅", teks: "Atas lebih besar" },
              { ikon: "🔟", teks: "Puluhan ikut dikurangi" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Untuk mengurangi, mulai dari satuan. Kalau angka di bawah lebih kecil atau sama, langsung kurangi.",
              "Setelah itu baru puluhannya.",
            ]}
          />
          <TabelInfoGrafis
            judul="Cek dulu"
            kepala={["Aturan", "Contoh", "Cek"]}
            baris={[
              ["Atas lebih besar", "8 − 4", "Langsung kurang"],
              ["Bawah lebih besar", "2 − 7", "Harus pinjam"],
            ]}
            kaki="68 − 34 = 34."
          />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("B", 4)}
              pertanyaan="Berapa hasil 87 − 43?"
              periksa={(teks) => angkaAtauKata(teks, "44", "empat puluh empat")}
              petunjuk="Satuan 7 − 3, lalu puluhan 8 − 4."
            />
          </div>
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="99 − 56 = ?" />}
            pertanyaan="Tulis hasil 99 − 56."
            pesanSalah="9 − 6 = 3. 9 − 5 = 4."
            umpan="Hasilnya 43."
            alias={["43"]}
            konteks="99 − 56 = 43."
            periksa={(teks) => angkaAtauKata(teks, "43", "empat puluh tiga")}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 4 · Mengurangi dengan Meminjam</h5>
          <PanduanIkon
            butir={[
              { ikon: "🤝", teks: "Pinjam dulu" },
              { ikon: "🔟", teks: "Satuan bertambah 10" },
              { ikon: "⬇️", teks: "Puluhan kurang 1" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Kalau angka di bawah lebih besar, pinjam satu puluhan. Satu puluhan sama dengan sepuluh satuan.",
              "Angka puluhan yang dipinjam berkurang satu. Beri tanda coret supaya tidak lupa.",
            ]}
          />
          <Papan anak="52 − 27 · 12 − 7 = 5 · 4 − 2 = 2 · hasil 25" />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("B", 6)}
              pertanyaan="Pada 84 − 39, setelah meminjam, angka puluhan di atas jadi berapa?"
              periksa={(teks) => hanyaKata(teks, "tujuh", "7")}
              petunjuk="Delapan dipinjam satu, jadi tujuh."
            />
          </div>
          <TulisBebas
            id={idKuis("B", 7)}
            visual={<Papan anak="63 − 28 = ?" />}
            pertanyaan="Tulis hasil 63 − 28."
            pesanSalah="Pinjam dulu. 13 − 8 = 5. Puluhan tinggal 5, lalu 5 − 2 = 3."
            umpan="Hasilnya 35."
            alias={["35"]}
            konteks="63 − 28 = 35."
            periksa={(teks) => angkaAtauKata(teks, "35", "tiga puluh lima")}
          />
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00]/50 bg-[#FFFDF6] p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 5 · Soal Cerita</h5>
          <PanduanIkon
            butir={[
              { ikon: "🔍", teks: "Cari dua angka" },
              { ikon: "➕", teks: "Dapat, datang, beli" },
              { ikon: "➖", teks: "Pergi, jatuh, terjual" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Soal cerita diterjemahkan dulu. Empat langkahnya: cari angka, cari kata kunci, tulis kalimat, lalu hitung.",
              "Datang lagi artinya tambah. Terjual, diambil, atau diberikan artinya kurang.",
            ]}
          />
          <TabelInfoGrafis
            judul="Kata kunci"
            kepala={["Tambah", "Kurang", "Contoh"]}
            baris={[
              ["datang lagi", "terjual", "48 + 25"],
              ["diberi lagi", "diambil", "65 − 28"],
            ]}
            kaki="48 + 25 = 73."
          />
          <div className="mt-3 border-t-2 border-[#F0AB00] pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("B", 8)}
              pertanyaan="Kata diberikan kepada teman artinya tambah atau kurang?"
              periksa={artiKurang}
              petunjuk="Barang yang diberikan pergi."
            />
          </div>
          <TulisBebas
            id={idKuis("B", 9)}
            visual={<Papan anak="Ada 65 bunga. Sebanyak 28 sudah terjual." />}
            pertanyaan="Tulis kalimat matematika dan hasilnya."
            pesanSalah="Terjual artinya kurang. 65 − 28."
            umpan="65 − 28 = 37."
            alias={["65 - 28 = 37", "37"]}
            konteks="65 dikurangi 28 sama dengan 37."
            periksa={(teks) => kalimatKurang(teks, "65", "28", "37", "tiga puluh tujuh")}
          />
        </article>
        <Pilih
          id={idKuis("B", 10)}
          pertanyaan="1. Kotak mana yang perlu meminjam?"
          pilihan={[
            { huruf: "A", teks: "74 − 31" },
            { huruf: "B", teks: "62 − 47" },
            { huruf: "C", teks: "88 − 24" },
            { huruf: "D", teks: "95 − 52" },
          ]}
          benar="B"
          umpan="Satuan 2 lebih kecil dari 7, jadi harus pinjam."
          salah="Bandingkan satuan atas dan satuan bawah."
        />
        <KuisCocok
          id={idKuis("B", 11)}
          perintah="2. Pasangkan soal dengan tekniknya!"
          baris={[
            { kiri: "45 + 27", pilihan: teknik, benar: "Tambah dengan menyimpan" },
            { kiri: "63 + 24", pilihan: teknik, benar: "Tambah tanpa menyimpan" },
            { kiri: "78 − 35", pilihan: teknik, benar: "Kurang tanpa meminjam" },
            { kiri: "52 − 18", pilihan: teknik, benar: "Kurang dengan meminjam" },
          ]}
          umpan="5 + 7 lebih dari 9. 3 + 4 masih muat. 8 lebih besar dari 5. 2 lebih kecil dari 8."
        />
        <SusunToken
          id={idKuis("B", 12)}
          perintah="3. Susun dari hasil terkecil ke terbesar."
          acak={["90 − 12", "34 + 41", "71 − 60", "25 + 25"]}
          benar={["71 − 60", "25 + 25", "34 + 41", "90 − 12"]}
          umpan="11, 50, 75, lalu 78."
        />
        <KuisBenarSalah
          id={idKuis("B", 13)}
          perintah="4. Periksa hitungan. Pilih benar atau salah."
          baris={[
            { teks: "Hasil 29 + 43 = 72 tanpa menyimpan.", benar: false },
            { teks: "Pada 82 − 47, angka 8 berubah jadi 7.", benar: true },
            { teks: "56 + 22 = 78 tidak perlu menyimpan.", benar: true },
          ]}
          umpan="9 + 3 = 12, jadi perlu menyimpan. Delapan yang dipinjam tinggal tujuh. 6 + 2 masih muat."
        />
        <Pilih
          id={idKuis("B", 14)}
          pertanyaan="5. Kotak kosong + 39 = 87. Angka berapa yang hilang?"
          visual={<Papan anak="⬜ + 39 = 87" />}
          pilihan={[
            { huruf: "A", teks: "47" },
            { huruf: "B", teks: "48" },
            { huruf: "C", teks: "49" },
            { huruf: "D", teks: "58" },
          ]}
          benar="B"
          umpan="87 − 39 = 48."
          salah="Kurangi 87 dengan 39."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Lebih dari sembilan, simpan satu ke atas."
          alias={["lebih dari sembilan", "simpan satu"]}
          konteks="Lebih dari sembilan, simpan satu ke atas."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB10.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🚂🐨"
        judul={kartu.judul}
        anak="Sepuluh pos stasiun · menambah, menyimpan, mengurangi, meminjam"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Kalian menjadi kepala stasiun. Gerbong yang digabung muatannya ditambah. Gerbong yang dipisah muatannya dikurangi.",
          "Kalau muatan lebih dari sembilan, pindahkan satu kotak ke gerbong depan. Itulah menyimpan.",
          "Kalau muatan kurang untuk diturunkan, pinjam dari gerbong depan. Lalu gerbong depan berkurang satu.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab10-kereta.jpg"
        alt="Kolu berkostum kepala stasiun di samping kereta. Gerbong depan puluhan, gerbong belakang satuan."
      />
      <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>
          Gerbong depan untuk puluhan. Gerbong belakang untuk satuan. Salah hitung membuat sinyal berubah kuning, lalu kamu boleh mencoba lagi.
        </p>
        <p>
          Jawaban benar pertama mendapat 3 roda gigi. Setelah satu petunjuk, 2 roda gigi. Setelah dua petunjuk, 1 roda gigi. Lampu sorot membantu, tetapi mengurangi roda gigi.
        </p>
        <p>Kumpulkan 10 roda gigi untuk membuka rel cepat dan menerima topi kepala stasiun.</p>
      </div>
      <PanduanIkon
        judul="Simbol stasiun"
        butir={[
          { ikon: "🚃", teks: "Gerbong puluhan" },
          { ikon: "🚃", teks: "Gerbong satuan" },
          { ikon: "1️⃣", teks: "Simpan atau pinjam 1" },
          { ikon: "⚙️", teks: "10 roda gigi" },
        ]}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB10}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB10}
        penutup="Rel cepat terbuka. Kolu memasang topi kepala stasiun."
        bunga="🚃📦🚦👮"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB10.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana = skor >= 9 ? "👮 Kepala Stasiun Ahli" : skor >= 6 ? "🚂 Kondektur Cerdas" : "🐨 Sahabat Kolu";
  const pesan =
    skor >= 9
      ? "Luar biasa! Semua gerbongmu sampai dengan aman!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi kepala stasiun!"
        : "Ayo berlatih lagi bersama Kolu, kamu pasti bisa!";
  const teknik = [
    "Tambah tanpa menyimpan",
    "Tambah dengan menyimpan",
    "Kurang tanpa meminjam",
    "Kurang dengan meminjam",
  ];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝🐨"
        judul={kartu.judul}
        anak="Sepuluh soal hitung sampai 100"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sekarang kamu mengerjakan sendiri. Ada sepuluh soal.",
          "Kalau menemukan soal cerita, ingat empat langkahnya. Kalau angka di bawah lebih besar, ingat untuk meminjam.",
          "Periksa lagi jawabanmu. Selamat mengerjakan.",
        ])}
      />
      <GambarDoodle
        src="/doodle-mtk/mtk-1-bab10-evaluasi.jpg"
        alt="Meja ujian dengan pensil dan jam pasir. Kolu mengacungkan ibu jari."
      />
      <div className="mt-4 grid gap-2 rounded-2xl border-2 border-dashed border-[#1C01A5]/30 px-4 py-3 sm:grid-cols-3">
        <p className="text-sm font-black text-[#1C01A5]">Nama: {nama}</p>
        <p className="text-sm font-black text-[#1C01A5]">Kelas: 1</p>
        <p className="text-sm font-black text-[#1C01A5]">Skor: {skor} / 10</p>
      </div>
      <p className="mt-3 text-sm font-black text-[#1C01A5]">
        {lencana}. {pesan}
      </p>
      <PanduanIkon
        judul="Simbol soal"
        butir={[
          { ikon: "➕", teks: "Tambah" },
          { ikon: "➖", teks: "Kurang" },
          { ikon: "1️⃣", teks: "Simpan atau pinjam" },
          { ikon: "🔍", teks: "Kata kunci cerita" },
        ]}
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Hitung bersusun"
          visual={<Papan anak="63 + 25 = ?" />}
          pertanyaan="Tulis cara satuan dan puluhan, lalu tulis hasilnya."
          pesanSalah="3 + 5 = 8. 6 + 2 = 8."
          umpan="Hasilnya 88."
          alias={["88"]}
          konteks="63 + 25 = 88."
          periksa={(teks) => angkaAtauKata(teks, "88", "delapan puluh delapan")}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Mana hasil yang benar untuk 56 + 37?"
          visual={<Papan anak="56 + 37 · simpanan 1" />}
          pilihan={[
            { huruf: "A", teks: "83" },
            { huruf: "B", teks: "93" },
            { huruf: "C", teks: "84" },
            { huruf: "D", teks: "813" },
          ]}
          benar="B"
          umpan="6 + 7 = 13. Tulis 3, simpan 1. 1 + 5 + 3 = 9. Hasilnya 93."
          salah="Angka simpanan ikut dijumlahkan."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan="3. Baca angka 74 dengan benar."
            periksa={(teks) => angkaAtauKata(teks, "74", "tujuh puluh empat")}
            petunjuk="Puluhan tujuh, satuan empat."
          />
        </div>
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan="4. Rafi menjawab 72 − 38 = 46. Apakah Rafi benar?"
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, seharusnya 34" },
            { huruf: "C", teks: "Salah, seharusnya 44" },
            { huruf: "D", teks: "Salah, seharusnya 36" },
          ]}
          benar="B"
          umpan="12 − 8 = 4. Puluhan tinggal 6, lalu 6 − 3 = 3. Hasilnya 34."
          salah="Cek lagi setelah meminjam."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan soal dengan tekniknya!"
          baris={[
            { kiri: "24 + 53", pilihan: teknik, benar: "Tambah tanpa menyimpan" },
            { kiri: "67 + 28", pilihan: teknik, benar: "Tambah dengan menyimpan" },
            { kiri: "94 − 41", pilihan: teknik, benar: "Kurang tanpa meminjam" },
            { kiri: "85 − 39", pilihan: teknik, benar: "Kurang dengan meminjam" },
          ]}
          umpan="4 + 3 muat. 7 + 8 perlu simpan. 4 lebih besar dari 1. 5 lebih kecil dari 9."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Meminjam dengan rapi"
          visual={<Papan anak="71 − 46 = ?" />}
          pertanyaan="Tulis hasilnya, dan tunjukkan bahwa kamu meminjam."
          pesanSalah="11 − 6 = 5. Puluhan tinggal 6, lalu 6 − 4 = 2."
          umpan="Hasilnya 25."
          alias={["25", "pinjam"]}
          konteks="71 − 46 = 25 setelah meminjam."
          periksa={pinjamDuaPuluhLima}
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Kotak 8 + 34 = 92. Angka berapa yang hilang di depan 8?"
          visual={<Papan anak="⬜8 + 34 = 92" />}
          pilihan={[
            { huruf: "A", teks: "48" },
            { huruf: "B", teks: "58" },
            { huruf: "C", teks: "68" },
            { huruf: "D", teks: "78" },
          ]}
          benar="B"
          umpan="92 − 34 = 58."
          salah="Kurangi 92 dengan 34."
        />
        <SusunToken
          id={idKuis("D", 7)}
          perintah="8. Susun dari hasil terkecil ke terbesar."
          acak={["45 + 47", "90 − 28", "33 + 39", "71 − 55"]}
          benar={["71 − 55", "90 − 28", "33 + 39", "45 + 47"]}
          umpan="16, 62, 72, lalu 92."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 8)}
            pertanyaan="9. Ada 64 kue. Sebanyak 27 kue dimakan. Ucapkan kata kuncinya, dan sebutkan itu tambah atau kurang."
            periksa={dimakanKurang}
            petunjuk="Kue yang dimakan pergi dari piring."
          />
        </div>
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Pagi ada 65 kue. Siang terjual 28. Sore datang 19. Mana yang benar?"
          visual={<Papan anak="65 − 28, lalu + 19" />}
          pilihan={[
            { huruf: "A", teks: "Siang 37, akhir 56, lebih sedikit dari pagi" },
            { huruf: "B", teks: "Siang 37, akhir 56, lebih banyak dari pagi" },
            { huruf: "C", teks: "Siang 93, akhir 112, lebih banyak dari pagi" },
            { huruf: "D", teks: "Siang 37, akhir 47, lebih sedikit dari pagi" },
          ]}
          benar="A"
          umpan="65 − 28 = 37. 37 + 19 = 56. 56 lebih sedikit dari 65."
          salah="Kerjakan siang dulu, baru tambahkan kiriman sore."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Bawah lebih besar, pinjam dulu."
          alias={["bawah lebih besar", "pinjam dulu"]}
          konteks="Bawah lebih besar, pinjam dulu."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Keretamu sampai dengan selamat.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab10({
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
          src: "/doodle-mtk/mtk-1-bab10-poin.jpg",
          alt: "Kolu berdiri di atas gerbong kereta dengan papan kalimat kunci dan kembang api.",
        }}
        cuplikan={cuplikanKalimat([
          "Satuan dulu, puluhan kemudian. Selalu dari kanan ke kiri.",
          "Kalau penjumlahan satuannya lebih dari sembilan, simpan satu ke atas. Simpanan kecil itu ikut dihitung.",
          "Kalau angka bawah lebih kecil, boleh langsung kurang. Kalau lebih besar, pinjam dulu, lalu puluhan berkurang satu.",
          "Soal cerita: cari angka, cari kata kunci, tulis, lalu hitung. Terjual, jatuh, dan diberikan artinya kurang.",
        ])}
        poin={[
          "👉 Satuan dulu, puluhan kemudian.",
          "1️⃣ Lebih dari sembilan? Simpan satu ke atas.",
          "✏️ Simpanan kecil itu ikut dihitung.",
          "✅ Bawah lebih kecil? Boleh langsung kurang.",
          "🤝 Bawah lebih besar? Pinjam dulu.",
          "⬇️ Sudah meminjam? Puluhan berkurang satu.",
          "🔍 Cari angka, cari kata kunci, tulis, lalu hitung.",
          "➖ Terjual, jatuh, dan diberikan artinya kurang.",
        ]}
        penutup="Satuan dulu, puluhan kemudian. Simpanan dan pinjaman tidak boleh dilupakan."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
