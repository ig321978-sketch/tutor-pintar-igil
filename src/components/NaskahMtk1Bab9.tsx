"use client";

import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB9 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB9 } from "@/lib/tema-misi-mtk-1";
import { useMemo, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import PanduanIkon, { type ButirIkon } from "@/components/PanduanIkon";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB9 } from "@/lib/modul-resmi-mtk-1-bab9";
import { jawabanTulisMemuatAlias, normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB9.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function naskah(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaToken(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\s)${angka}(?:\\s|$)`).test(` ${naskah(teks)} `);
}

function urutNaik(teks: string, angka: string[]): boolean {
  const bersih = naskah(teks);
  let posisi = -1;
  for (const item of angka) {
    const indeks = bersih.indexOf(item, posisi + 1);
    if (indeks < 0) return false;
    posisi = indeks;
  }
  return true;
}

function simbolKiriKecil(teks: string): boolean {
  const biasa = naskah(teks);
  const kecil = teks.includes("<") || biasa.includes("lebih kecil") || biasa.includes("lebih sedikit");
  return kecil && !teks.includes(">");
}

function simbolKiriBesar(teks: string): boolean {
  const biasa = naskah(teks);
  const besar = teks.includes(">") || biasa.includes("lebih besar") || biasa.includes("lebih banyak");
  return besar && !teks.includes("<");
}

function rumah68(teks: string): boolean {
  return adaToken(teks, "6") && adaToken(teks, "8");
}

function rumah47(teks: string): boolean {
  const biasa = naskah(teks);
  const puluh = biasa.includes("40") || biasa.includes("empat puluh");
  const satu = adaToken(teks, "7") || biasa.includes("tujuh");
  const pecah = biasa.includes("+") || biasa.includes("dan") || biasa.includes("satuan");
  return puluh && satu && pecah && !biasa.includes("74");
}

function rumah74(teks: string): boolean {
  const biasa = naskah(teks);
  const digit = adaToken(teks, "7") && adaToken(teks, "4");
  const pecah = biasa.includes("70") || biasa.includes("tujuh puluh");
  return digit && pecah && !biasa.includes("47");
}

function banding46(teks: string): boolean {
  const biasa = naskah(teks);
  const alasan = biasa.includes("puluh") || (biasa.includes("4") && biasa.includes("6"));
  return simbolKiriKecil(teks) && alasan;
}

function nilaiTigaPuluh(teks: string): boolean {
  const biasa = naskah(teks);
  if (biasa.includes("delapan") || biasa.includes("38")) return false;
  return biasa.includes("tiga puluh") || adaToken(teks, "30");
}

function suara31(teks: string): boolean {
  const biasa = naskah(teks);
  const angka = biasa.includes("tiga puluh satu") || adaToken(teks, "31");
  const alasan = /puluhan|karena|lebih|rumah/.test(biasa);
  return angka && alasan && !biasa.includes("tiga belas");
}

function KartuBingkai({ children, latar = "bg-white" }: { children: ReactNode; latar?: string }) {
  return (
    <section className={`rounded-[1.75rem] border-4 border-[#1C01A5]/15 ${latar} px-4 py-5 shadow-sm sm:px-6 sm:py-6`}>
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Sari: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bima: "border-[#2563EB]/20 bg-[#EFF6FF]",
  Danu: "border-[#16A34A]/20 bg-[#F0FDF4]",
  Kura: "border-teal-300 bg-teal-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Sari: "👧",
  Bima: "👦",
  Danu: "👦",
  Kura: "🐢",
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

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
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
    <article className="rounded-2xl border-2 border-violet-200 bg-violet-50 p-4">
      <p className="text-sm font-black text-violet-950">{perintah}</p>
      <p className="mt-1 text-xs font-semibold text-violet-900">Ketuk kartu kiri, lalu ketuk pasangannya.</p>
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
        className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50"
      >
        Periksa pasangan
      </button>
      {cek ? (
        <div className="mt-3">
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Pasangkan sekali lagi." />
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

function SusunAngka({
  id,
  perintah,
  acak,
  benar,
  umpan,
}: {
  id: string;
  perintah: string;
  acak: number[];
  benar: number[];
  umpan: string;
}) {
  const kuis = useKuisMateri();
  const [susun, setSusun] = useState<number[]>([]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const sisa = acak.filter((angka) => !susun.includes(angka));
  const periksa = () => {
    const tepat = susun.length === benar.length && susun.every((angka, indeks) => angka === benar[indeks]);
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(id);
  };
  return (
    <article className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-4">
      <p className="text-sm font-black text-[#1C01A5]">{perintah}</p>
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">🚂 {susun.join(" – ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((angka) => (
          <button
            key={angka}
            type="button"
            onClick={() => {
              setSusun((lama) => [...lama, angka]);
              setStatus(null);
            }}
            className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300"
          >
            {angka}
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
      <HasilJawabanKuis status={status} pesanSalah="Lihat puluhannya dulu, lalu susun lagi." />
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
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi rumah puluhan dan satuannya." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB9.kartu[0];
  const namaAngka = ["Sembilan belas", "Delapan puluh", "Enam puluh enam"];
  return (
    <KartuBingkai latar="bg-sky-50/80">
      <KepalaKartu
        ikon="👧👦🐢"
        judul={kartu.judul}
        anak="Sari, Bima, Danu, dan Kura di gudang sekolah"
      />
      <div className="mt-4">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Siswa bisa membaca dan menulis bilangan sampai 100.</li>
          <li>Siswa bisa membandingkan dan mengurutkan bilangan sampai 100.</li>
          <li>Siswa memahami nilai tempat puluhan dan satuan.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-4">
        <Adegan
          judul="Adegan 1 · Puluhan yang Hilang"
          simbol={[
            { ikon: "🟦", teks: "1 ikat = 10" },
            { ikon: "🟨", teks: "1 lepas = 1" },
            { ikon: "🔟", teks: "Puluhan di kiri" },
          ]}
          warna="border-amber-200 bg-amber-50/40"
          src="/doodle-mtk/mtk-1-bab9-adegan-1.jpg"
          alt="Sari memegang papan 46. Empat ikat stik bertanda 10 dan enam stik lepas. Kura mengintip dari kardus."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Di gudang sekolah, Sari menghitung stik es krim dan mendapat empat puluh enam.",
            "Empat ikat isi sepuluh sama dengan empat puluh. Sisa enam stik. Jadi empat puluh tambah enam sama dengan empat puluh enam.",
            "Angka empat di kiri artinya empat puluhan, bukan empat saja. Angka enam di kanan adalah satuan.",
          ]}
        >
          <Dialog nama="Sari" anak="Bima, aku hitung stik es krim ini dapat 46." />
          <Dialog nama="Bima" anak="Halah, aku dapat 4 dan 6. Jadi 46? Atau 10?" />
          <Dialog nama="Danu" anak="Kok bisa beda?" />
          <Dialog nama="Sari" anak="Karena kamu belum mengikatnya. Empat ikat isi 10 sama dengan 40. Sisa 6. Jadi 40 + 6 = 46." />
          <Papan anak="🟦 4 puluhan · 🟨 6 satuan" />
          <Dialog nama="Bima" anak="Jadi angka 4 itu artinya empat puluhan, bukan empat saja!" />
          <Dialog nama="Kura" anak="Betul, Bima. Angka yang sama bisa berarti beda, tergantung tempatnya." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 0)}
            pertanyaanSuara="Ada 3 ikat dan 5 lepas. Berapa semuanya? Ucapkan angkanya."
            aliasSuara={["35", "tiga puluh lima"]}
            petunjukSuara="Satu ikat sama dengan sepuluh."
          />
          <TulisBebas
            id={idKuis("A", 1)}
            visual={<Papan anak="Angka 68 · 🟦 Puluhan ⬜ · 🟨 Satuan ⬜" />}
            pertanyaan="Isi rumah nilai tempat untuk angka 68. Tulis angka puluhan dan angka satuan."
            pesanSalah="Angka 6 tinggal di rumah puluhan. Angka 8 tinggal di rumah satuan."
            umpan="Puluhan 6, satuan 8."
            alias={["puluhan 6 satuan 8", "6 dan 8"]}
            konteks="Pada 68, puluhannya 6 dan satuannya 8."
            periksa={rumah68}
          />
        </Adegan>
        <Adegan
          judul="Adegan 2 · Lomba Membaca Angka"
          simbol={[
            { ikon: "🔢", teks: "Baca puluhan dulu" },
            { ikon: "0️⃣", teks: "Nol tidak disebut" },
            { ikon: "🗣️", teks: "11–19 pakai belas" },
          ]}
          warna="border-sky-200 bg-sky-50/50"
          src="/doodle-mtk/mtk-1-bab9-adegan-2.jpg"
          alt="Panggung kelas dengan kartu 27, 30, dan 90. Sari, Bima, dan Danu membaca. Kura menunjuk. Deret 10 sampai 100 di bawah."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Anak-anak lomba membaca angka. Dua puluh tujuh dibaca dua puluh tujuh.",
            "Angka tiga puluh dibaca tiga puluh saja, tanpa menyebut nol.",
            "Angka yang berakhir nol dibaca sepuluh, dua puluh, sampai seratus. Belasan hanya untuk sebelas sampai sembilan belas.",
          ]}
        >
          <Dialog nama="Danu" anak="Ayo lomba! Siapa yang bisa baca angka paling cepat dan benar?" />
          <Dialog nama="Bima" anak="Gampang! Dua puluh tujuh!" />
          <Dialog nama="Sari" anak="Tiga puluh… hmm, 30 itu dibaca apa ya?" />
          <Dialog nama="Kura" anak="Kalau puluhannya 3 dan satuannya 0, artinya tiga puluhan tanpa sisa." />
          <Dialog nama="Danu" anak="Berarti tiga puluh saja, tanpa tambahan!" />
          <Dialog nama="Kura" anak="Tepat. Angka yang berakhir nol punya nama istimewa: sepuluh, dua puluh, tiga puluh, sampai seratus." />
          <Papan anak="10 · 20 · 30 · 40 · 50 · 60 · 70 · 80 · 90 · 100" />
          <Dialog nama="Sari" anak="Jadi 90 dibaca sembilan puluh." />
          <Dialog nama="Kura" anak="Belasan hanya untuk 11 sampai 19. Di atas itu kita pakai puluh." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 2)}
            idKanvas={idKuis("A", 3)}
            pertanyaanSuara="Baca angka 73 dengan jelas dan lengkap."
            aliasSuara={["tujuh puluh tiga"]}
            petunjukSuara="Puluhannya tujuh, satuannya tiga."
            pertanyaanKanvas="Dengarkan, lalu tulis angkanya: sembilan puluh satu."
            aliasKanvas={["91", "sembilan puluh satu"]}
            konteksKanvas="Sembilan puluh satu ditulis 91, bukan 19."
            visualKanvas={<Papan anak="🔊 sembilan puluh satu" />}
          />
        </Adegan>
        <Adegan
          judul="Adegan 3 · Perang Tanda Buaya"
          simbol={[
            { ikon: "🐊", teks: "Mulut ke yang besar" },
            { ikon: ">", teks: "Lebih besar" },
            { ikon: "<", teks: "Lebih kecil" },
            { ikon: "=", teks: "Sama banyak" },
          ]}
          warna="border-emerald-200 bg-emerald-50/40"
          src="/doodle-mtk/mtk-1-bab9-adegan-3.jpg"
          alt="Dua keranjang kelereng berlabel 52 dan 57. Buaya berdiri di antara keduanya. Tulisan 52 kurang dari 57."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Keranjang A ada lima puluh dua. Keranjang B ada lima puluh tujuh.",
            "Puluhannya sama-sama lima, jadi kita lihat satuannya. Tujuh lebih besar dari dua.",
            "Kalau puluhan beda, puluhan yang menentukan. Buaya selalu menghadap angka yang lebih besar.",
          ]}
        >
          <Dialog nama="Bima" anak="Keranjang A ada 52. Keranjang B ada 57. Mana yang lebih banyak?" />
          <Dialog nama="Danu" anak="Puluhannya sama-sama 5! Jadi bagaimana?" />
          <Dialog nama="Sari" anak="Kita lihat satuannya. 2 dan 7. Tujuh lebih besar!" />
          <Dialog nama="Kura" anak="Benar. Kalau puluhan sama, bandingkan satuannya. Kalau puluhan beda, puluhan yang menentukan." />
          <Papan anak="🐊 52 < 57" />
          <Dialog nama="Bima" anak="Jadi buaya selalu makan yang lebih banyak?" />
          <Dialog nama="Kura" anak="Selalu. Buaya tidak pernah salah pilih." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 4)}
            pertanyaanSuara="Mana yang lebih besar, 84 atau 79? Sebutkan angkanya."
            aliasSuara={["84", "delapan puluh empat"]}
            petunjukSuara="Bandingkan puluhannya dulu: 8 dan 7."
          />
          <TulisBebas
            id={idKuis("A", 5)}
            visual={<Papan anak="[ 63 ] ⬜ [ 36 ]" />}
            pertanyaan="Tulis simbol yang tepat: lebih besar, lebih kecil, atau sama."
            pesanSalah="Puluhan 6 lebih besar dari puluhan 3."
            umpan="63 lebih besar dari 36."
            alias={["lebih besar", "63 > 36"]}
            konteks="63 lebih besar dari 36 karena puluhannya lebih besar."
            periksa={simbolKiriBesar}
          />
        </Adegan>
        <Adegan
          judul="Adegan 4 · Garis Bilangan Raksasa"
          simbol={[
            { ikon: "⬅️", teks: "Paling kecil" },
            { ikon: "🔢", teks: "Puluhan dulu" },
            { ikon: "➡️", teks: "Paling besar" },
          ]}
          warna="border-orange-200 bg-orange-50/40"
          src="/doodle-mtk/mtk-1-bab9-adegan-4.jpg"
          alt="Lapangan sekolah dengan petak 0, 25, 38, 40, dan 100. Sari di 25, Bima di 38, Danu di 40. Urutan 25 kurang dari 38 kurang dari 40."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Sari berdiri di angka dua puluh lima. Bima di tiga puluh delapan. Danu di empat puluh.",
            "Mengurutkan artinya menyusun dari yang paling kecil, bukan dari yang paling dekat.",
            "Urutannya dua puluh lima, lalu tiga puluh delapan, lalu empat puluh.",
          ]}
        >
          <Dialog nama="Sari" anak="Ayo main! Aku berdiri di angka 25." />
          <Dialog nama="Danu" anak="Aku di angka 40." />
          <Dialog nama="Bima" anak="Aku di angka 38. Siapa yang paling dekat dengan 25?" />
          <Dialog nama="Danu" anak="Aku! Karena 40 lebih jauh dari 25." />
          <Dialog nama="Kura" anak="Hati-hati. Untuk mengurutkan, kita lihat posisi dari yang paling kecil." />
          <Papan anak="⬅️ 25 < 38 < 40 ➡️" />
          <Dialog nama="Bima" anak="Jadi urutannya: Sari, aku, lalu Danu!" />
          <Dialog nama="Kura" anak="Tepat! Dari kecil ke besar." />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 6)}
            idKanvas={idKuis("A", 7)}
            pertanyaanSuara="Sebutkan angka yang paling kecil di antara 62, 26, dan 56."
            aliasSuara={["26", "dua puluh enam"]}
            petunjukSuara="Lihat puluhannya dulu."
            pertanyaanKanvas="Urutkan dari yang paling kecil ke paling besar: 49, 31, 88, 72."
            aliasKanvas={["31 49 72 88"]}
            konteksKanvas="Urutannya 31, 49, 72, 88."
            visualKanvas={<Papan anak="⬜ < ⬜ < ⬜ < ⬜ · 49 · 31 · 88 · 72" />}
          />
        </Adegan>
        <Adegan
          judul="Adegan 5 · Rahasia Angka Terbalik"
          simbol={[
            { ikon: "2️⃣8️⃣", teks: "28 = 20 + 8" },
            { ikon: "🪞", teks: "Jangan dibalik" },
            { ikon: "8️⃣2️⃣", teks: "82 = 80 + 2" },
          ]}
          warna="border-fuchsia-200 bg-fuchsia-50/40"
          src="/doodle-mtk/mtk-1-bab9-adegan-5.jpg"
          alt="Papan tulis menunjukkan 28 sama dengan 20 tambah 8, dan 82 sama dengan 80 tambah 2. Cermin memantulkan angka yang tertukar."
          kelas={kelas}
          kelamin={kelamin}
          penjelasan={[
            "Angka dua puluh delapan dan delapan puluh dua memakai angka yang sama, tetapi tempatnya bertukar.",
            "Pada dua puluh delapan, angka dua bernilai dua puluh. Pada delapan puluh dua, angka dua hanya bernilai dua.",
            "Menulis angka harus dari puluhan dulu. Jangan dibalik.",
          ]}
        >
          <Dialog nama="Danu" anak="Sari, kenapa 28 dan 82 isinya angka yang sama tapi nilainya beda jauh?" />
          <Dialog nama="Bima" anak="Aku pernah salah tulis 82 jadi 28, dan Bu Guru bilang salah besar." />
          <Dialog nama="Sari" anak="Karena tempatnya bertukar!" />
          <Dialog nama="Kura" anak="Pada 28, angka 2 ada di rumah puluhan. Artinya 20. Pada 82, angka 2 ada di rumah satuan. Artinya cuma 2." />
          <Papan anak="🪞 28 = 20 + 8 · 82 = 80 + 2" />
          <Dialog nama="Danu" anak="Jadi satu angka pindah rumah, nilainya bisa berubah banyak!" />
          <Dialog nama="Kura" anak="Itu sebabnya menulis angka harus dari puluhan dulu. Jangan dibalik!" />
          <KuisAkhirAdegan
            idSuara={idKuis("A", 8)}
            pertanyaanSuara="Dari 35 dan 53, mana yang lebih besar? Sebutkan angkanya."
            aliasSuara={["53", "lima puluh tiga"]}
            petunjukSuara="Angka di rumah puluhan nilainya sepuluh kali lebih besar."
          />
          <TulisBebas
            id={idKuis("A", 9)}
            visual={<Papan anak="47 · 🟦 Puluhan ⬜ · 🟨 Satuan ⬜" />}
            pertanyaan="Tuliskan nilai asli angka 4 dan angka 7. Contoh: 40 + 7."
            pesanSalah="Angka 4 di puluhan bernilai 40. Angka 7 di satuan bernilai 7."
            umpan="Puluhan 40, satuan 7. Jadi 40 + 7."
            alias={["40 + 7", "40 dan 7"]}
            konteks="Pada 47, angka 4 bernilai 40 dan angka 7 bernilai 7."
            periksa={rumah47}
          />
        </Adegan>
        <Pilih
          id={idKuis("A", 10)}
          pertanyaan="1. Bentuk mana yang benar untuk angka 74?"
          visual={<Papan anak="74 📦" />}
          pilihan={[
            { huruf: "A", teks: "7 ikat + 4 lepas" },
            { huruf: "B", teks: "74 ikat + 0 lepas" },
            { huruf: "C", teks: "4 ikat + 7 lepas" },
            { huruf: "D", teks: "7 ikat + 40 lepas" },
          ]}
          benar="A"
          umpan="7 ikat sama dengan 70, ditambah 4 lepas."
          salah="Hitung ikatannya dulu. Satu ikat sama dengan sepuluh."
        />
        <KuisCocok
          id={idKuis("A", 11)}
          perintah="2. Pasangkan angka dan namanya!"
          baris={[
            { kiri: "19", pilihan: namaAngka, benar: "Sembilan belas" },
            { kiri: "80", pilihan: namaAngka, benar: "Delapan puluh" },
            { kiri: "66", pilihan: namaAngka, benar: "Enam puluh enam" },
          ]}
          umpan="19 sembilan belas. 80 delapan puluh. 66 enam puluh enam."
        />
        <SusunAngka
          id={idKuis("A", 12)}
          perintah="3. Susun gerbong dari yang paling besar ke paling kecil: 45, 91, 23, 68, 100."
          acak={[45, 91, 23, 68, 100]}
          benar={[100, 91, 68, 45, 23]}
          umpan="100, 91, 68, 45, lalu 23."
        />
        <KuisBenarSalah
          id={idKuis("A", 13)}
          perintah="4. Detektif angka. Pilih benar atau salah."
          baris={[
            { teks: "Pada angka 58, angka 5 bernilai 50.", benar: true },
            { teks: "Pada angka 71, angka 7 bernilai 7.", benar: false },
            { teks: "Angka 92 lebih kecil dari 89.", benar: false },
          ]}
          umpan="Lima di puluhan bernilai 50. Tujuh di puluhan bernilai 70. 92 lebih besar dari 89."
        />
        <Pilih
          id={idKuis("A", 14)}
          pertanyaan="5. Tiga kotak bernilai sama. Ketuk yang berbeda!"
          pilihan={[
            { huruf: "A", teks: "6 ikat + 3 lepas" },
            { huruf: "B", teks: "63" },
            { huruf: "C", teks: "3 ikat + 6 lepas" },
            { huruf: "D", teks: "60 + 3" },
          ]}
          benar="C"
          umpan="C sama dengan 36. Yang lain semuanya 63."
          salah="Hitung tiap kotak. Satu ikat sama dengan sepuluh."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Tulis kalimat kunci: Sepuluh diikat jadi satu puluhan."
          alias={["sepuluh diikat", "satu puluhan", "1 puluhan = 10"]}
          konteks="Sepuluh diikat jadi satu puluhan."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB9.kartu[1];
  const pecah = ["30 + 7", "60 + 5", "80 + 3"];
  return (
    <KartuBingkai latar="bg-emerald-50/80">
      <KepalaKartu
        ikon="🟦🟨🐊"
        judul={kartu.judul}
        anak="Empat papan infografis"
      />
      <div className="mt-4 space-y-4">
        <article className="rounded-2xl border-2 border-sky-300 bg-sky-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 1 · Membaca dan Menulis Bilangan</h5>
          <PanduanIkon
            butir={[
              { ikon: "🟦", teks: "Rumah puluhan" },
              { ikon: "🟨", teks: "Rumah satuan" },
              { ikon: "✍️", teks: "Tulis kiri dulu" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Rumah biru adalah puluhan. Rumah kuning adalah satuan.",
              "Puluhan dikali sepuluh. Satuan dikali satu. Tulis puluhan dulu, baru satuan.",
              "Tujuh puluh dua ditulis tujuh di puluhan dan dua di satuan. Angka sembilan puluh dibaca sembilan puluh, tanpa menyebut nol.",
            ]}
          />
          <TabelInfoGrafis
            judul="Rumah bilangan"
            kepala={["Bagian", "Cara", "Contoh 46"]}
            baris={[
              ["🟦 Puluhan", "× 10", "4 → 40"],
              ["🟨 Satuan", "× 1", "6 → 6"],
            ]}
            kaki="Puluhan dulu, satuan kemudian."
          />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Tujuh puluh dua: tulis 7 di puluhan, lalu 2 di satuan. Hasilnya 72. Angka 90 dibaca sembilan puluh, tanpa menambah nol.
          </p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 0)}
            idKanvas={idKuis("B", 1)}
            pertanyaanSuara="Baca angka 85 dengan lengkap!"
            aliasSuara={["delapan puluh lima"]}
            pertanyaanKanvas="Tulis angka dari bacaan empat puluh tujuh."
            aliasKanvas={["47"]}
            konteksKanvas="Empat puluh tujuh ditulis 47, bukan 74."
            visualKanvas={<Papan anak="🔊 empat puluh tujuh" />}
          />
        </article>
        <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 2 · Nilai Tempat</h5>
          <PanduanIkon
            butir={[
              { ikon: "5️⃣", teks: "Angka yang tertulis" },
              { ikon: "🟦", teks: "× 10 kalau di kiri" },
              { ikon: "🟨", teks: "× 1 kalau di kanan" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Satu angka punya dua wajah. Wajah angkanya, dan wajah nilainya.",
              "Angka lima pada lima puluh empat ada di rumah puluhan. Lima kali sepuluh sama dengan lima puluh, bukan lima.",
              "Tujuh puluh dua sama dengan tujuh puluh ditambah dua.",
            ]}
          />
          <Papan anak="63 = 🟦 60 + 🟨 3" />
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Angka 5 pada 54 ada di rumah puluhan. 5 × 10 = 50. Nilainya 50, bukan 5. 72 = 70 + 2.
          </p>
          <div className="mt-3 border-t-2 border-teal-300 pt-3">
            <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
            <SoalRekamSuara
              id={idKuis("B", 2)}
              pertanyaan="Berapa nilai angka 3 pada bilangan 38? Sebutkan."
              periksa={nilaiTigaPuluh}
              petunjuk="Angka 3 ada di rumah puluhan."
            />
          </div>
          <KuisTulisKartu
            id={idKuis("B", 3)}
            hanyaKanvas
            rapat
            pertanyaan="Tulis pemecahan nilai tempat: 91 = … + …"
            alias={["90 + 1", "90+1", "sembilan puluh tambah satu", "90 dan 1"]}
            konteks="91 sama dengan 90 ditambah 1."
            visual={<Papan anak="91 = ⬜ + ⬜" />}
          />
        </article>
        <article className="rounded-2xl border-2 border-violet-300 bg-violet-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 3 · Membandingkan Bilangan</h5>
          <PanduanIkon
            butir={[
              { ikon: "🐊", teks: "Lihat puluhan dulu" },
              { ikon: ">", teks: "Lebih besar" },
              { ikon: "<", teks: "Lebih kecil" },
              { ikon: "=", teks: "Sama" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Kalau puluhan beda, lihat puluhannya. Yang lebih besar, itu pemenangnya.",
              "Empat puluh enam lebih kecil dari enam puluh empat, karena puluhan empat lebih kecil dari puluhan enam.",
              "Kalau puluhan sama, lanjut ke satuan. Tujuh puluh tiga lebih kecil dari tujuh puluh delapan.",
            ]}
          />
          <TabelInfoGrafis
            judul="Langkah buaya"
            kepala={["Situasi", "Cara", "Contoh"]}
            baris={[
              ["Puluhan beda", "Yang besar menang", "46 < 64"],
              ["Puluhan sama", "Lihat satuan", "73 < 78"],
              ["Angka sama", "Pakai sama dengan", "50 = 50"],
            ]}
            kaki="Puluhan beda? Berhenti. Puluhan sama? Lanjut ke satuan."
          />
          <KuisAkhirAdegan
            idSuara={idKuis("B", 4)}
            pertanyaanSuara="Sebutkan angka yang lebih besar: 29 atau 92."
            aliasSuara={["92", "sembilan puluh dua"]}
            petunjukSuara="Bandingkan puluhan 2 dan 9."
          />
          <TulisBebas
            id={idKuis("B", 5)}
            visual={<Papan anak="[ 45 ] ⬜ [ 54 ]" />}
            pertanyaan="Tulis simbol yang tepat: lebih besar, lebih kecil, atau sama."
            pesanSalah="Puluhan 4 lebih kecil dari puluhan 5."
            umpan="45 lebih kecil dari 54."
            alias={["lebih kecil"]}
            konteks="45 lebih kecil dari 54."
            periksa={simbolKiriKecil}
          />
        </article>
        <article className="rounded-2xl border-2 border-rose-300 bg-rose-50 p-4">
          <h5 className="text-base font-black text-[#1C01A5]">Sub-bab 4 · Mengurutkan Bilangan</h5>
          <PanduanIkon
            butir={[
              { ikon: "1️⃣", teks: "Angka kecil di bawah" },
              { ikon: "🪜", teks: "Naik ke yang besar" },
              { ikon: "🔟", teks: "Puluhan yang menentukan" },
            ]}
          />
          <TombolPenjelasan
            kelas={kelas}
            kelamin={kelamin}
            kalimat={[
              "Untuk mengurutkan, bandingkan puluhan dulu, lalu rapikan satuan di kelompok yang sama.",
              "Lima puluh enam, tiga puluh delapan, tujuh puluh satu, dan empat puluh lima diurutkan menjadi tiga puluh delapan, empat puluh lima, lima puluh enam, tujuh puluh satu.",
              "Kalau semua puluhannya sama, urutkan dari satuannya.",
            ]}
          />
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Urutkan 56, 38, 71, 45 dari yang terkecil: bandingkan puluhan 3, 4, 5, 7. Hasilnya 38, 45, 56, 71.
            Kalau puluhannya sama, rapikan satuannya. 69, 64, 62, 60 dari yang terbesar.
          </p>
          <KuisAkhirAdegan
            idSuara={idKuis("B", 6)}
            idKanvas={idKuis("B", 7)}
            pertanyaanSuara="Sebutkan yang paling kecil: 81, 18, atau 44."
            aliasSuara={["18", "delapan belas"]}
            petunjukSuara="Puluhan 1 paling kecil."
            pertanyaanKanvas="Urutkan dari kecil ke besar: 27, 72, 52."
            aliasKanvas={["27 52 72"]}
            konteksKanvas="Urutannya 27, 52, 72."
            visualKanvas={<Papan anak="⬜ < ⬜ < ⬜ · 27 · 72 · 52" />}
          />
        </article>
        <Pilih
          id={idKuis("B", 8)}
          pertanyaan="1. Manakah pernyataan yang benar?"
          pilihan={[
            { huruf: "A", teks: "59 > 61" },
            { huruf: "B", teks: "40 > 39" },
            { huruf: "C", teks: "88 < 78" },
            { huruf: "D", teks: "25 = 52" },
          ]}
          benar="B"
          umpan="40 lebih besar dari 39."
          salah="Bandingkan puluhan dulu."
        />
        <KuisCocok
          id={idKuis("B", 9)}
          perintah="2. Pasangkan angka dengan pemecahan nilai tempatnya!"
          baris={[
            { kiri: "37", pilihan: pecah, benar: "30 + 7" },
            { kiri: "65", pilihan: pecah, benar: "60 + 5" },
            { kiri: "83", pilihan: pecah, benar: "80 + 3" },
          ]}
          umpan="37 = 30 + 7. 65 = 60 + 5. 83 = 80 + 3."
        />
        <SusunAngka
          id={idKuis("B", 10)}
          perintah="3. Susun dari anak tangga paling bawah ke paling atas: 88, 19, 52, 76, 43."
          acak={[88, 19, 52, 76, 43]}
          benar={[19, 43, 52, 76, 88]}
          umpan="19, 43, 52, 76, lalu 88."
        />
        <KuisBenarSalah
          id={idKuis("B", 11)}
          perintah="4. Bilangan sakti. Pilih benar atau salah."
          baris={[
            { teks: "88 lebih besar dari 80.", benar: true },
            { teks: "Angka 20 punya nilai puluhan 0.", benar: false },
            { teks: "70 sama dengan 7 puluhan.", benar: true },
          ]}
          umpan="88 lebih besar. Puluhan 20 adalah 2. Tujuh puluhan sama dengan 70."
        />
        <Pilih
          id={idKuis("B", 12)}
          pertanyaan="5. Lengkapi deret: 35 – 40 – kotak – 50 – 55."
          pilihan={[
            { huruf: "A", teks: "42" },
            { huruf: "B", teks: "45" },
            { huruf: "C", teks: "44" },
            { huruf: "D", teks: "48" },
          ]}
          benar="B"
          umpan="Polanya maju 5. 40 ditambah 5 sama dengan 45."
          salah="Lihat jarak dari 35 ke 40."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tulis kalimat kunci: Puluhan dulu, satuan kemudian."
          alias={["puluhan dulu", "satuan kemudian"]}
          konteks="Puluhan dulu, satuan kemudian."
        />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB9.kartu[2];
  return (
    <KartuBingkai latar="bg-violet-50/80">
      <KepalaKartu
        ikon="🏪🪙🐢"
        judul={kartu.judul}
        anak="Sepuluh pos pasar · merakit, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Kamu menjadi penjaga gudang di Pasar Peci Seribu. Barang disimpan dalam peti isi sepuluh dan barang lepas.",
          "Pembeli menyebut angka. Kamu merakit pesanan dari peti dan barang lepas. Salah rakit, pembeli menolak, lalu barang kembali ke rak.",
          "Sepuluh pos menguji merakit, membaca label, membandingkan dagangan, dan mengurutkan pedagang.",
          "Jawaban benar pertama mendapat tiga koin. Lentera periksa membantu melihat petunjuk, tetapi mengurangi koin. Sepuluh koin membuka gudang emas.",
        ])}
      />
      <div className="mt-4 space-y-3 text-sm font-semibold leading-relaxed text-slate-700">
        <p>
          Kamu penjaga gudang. Barang disimpan dalam peti isi 10 dan barang lepas. Pembeli menyebut angka, lalu kamu merakit pesanan. Salah rakit, pembeli menolak, dan barang kembali ke rak.
        </p>
        <p>
          Sebelum masuk, pilih pos yang ingin dikerjakan. Lentera periksa membantu melihat petunjuk, tetapi mengurangi koin. Jawaban benar pertama mendapat 3 koin, setelah satu petunjuk 2 koin, dan setelah dua petunjuk 1 koin.
        </p>
        <p>Kumpulkan 10 koin pasar untuk membuka gudang emas dan menerima topi pedagang.</p>
      </div>
      <PanduanIkon
        judul="Simbol pasar"
        butir={[
          { ikon: "📦", teks: "1 peti = 10" },
          { ikon: "🍊", teks: "1 lepas = 1" },
          { ikon: "🐊", teks: "Bandingkan puluhan" },
          { ikon: "🪙", teks: "10 koin membuka gudang" },
        ]}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB9}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB9}
        penutup="Gudang emas terbuka. Kura memasang topi pedagang."
        bunga="🍊🧺🪙👳"
      />
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK1_BAB9.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana =
    skor >= 9 ? "👑 Raja Puluhan dan Satuan" : skor >= 6 ? "🪙 Penjaga Gudang Hebat" : "🐢 Sahabat Kura";
  const pesan =
    skor >= 9
      ? "Luar biasa! Kamu paham nilai tempat dengan sempurna!"
      : skor >= 6
        ? "Hebat! Sedikit lagi jadi raja angka!"
        : "Ayo belajar lagi bersama Kura, kamu pasti bisa!";
  const tempat = ["2 puluhan + 7 satuan", "6 puluhan + 3 satuan", "9 puluhan + 0 satuan"];
  return (
    <KartuBingkai latar="bg-rose-50/80">
      <KepalaKartu
        ikon="📝🔢"
        judul={kartu.judul}
        anak="Sepuluh soal bilangan sampai 100"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Ini lembar evaluasi bilangan sampai seratus. Ada sepuluh soal.",
          "Kamu mengisi nilai tempat, membaca angka, memeriksa alasan, memasangkan, membandingkan, dan mengurutkan.",
          "Skor sembilan atau sepuluh, kamu Raja Puluhan dan Satuan. Skor enam sampai delapan, Penjaga Gudang Hebat. Di bawah itu, kamu Sahabat Kura.",
        ])}
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
          { ikon: "🟦", teks: "Puluhan" },
          { ikon: "🟨", teks: "Satuan" },
          { ikon: "🐊", teks: "Bandingkan" },
          { ikon: "🪜", teks: "Urutkan" },
        ]}
      />
      <div className="mt-4 space-y-4">
        <TulisBebas
          id={idKuis("D", 0)}
          judul="1. Rumah nilai tempat"
          visual={<Papan anak="74 · 🟦 Puluhan ⬜ · 🟨 Satuan ⬜" />}
          pertanyaan="Tulis angka puluhan, angka satuan, lalu pecahannya. Contoh: 7, 4, 70 + 4."
          pesanSalah="Angka 7 di puluhan bernilai 70. Angka 4 di satuan bernilai 4."
          umpan="Puluhan 7, satuan 4. 74 = 70 + 4."
          alias={["70 + 4", "puluhan 7 satuan 4"]}
          konteks="Pada 74, puluhan 7 dan satuan 4. Pecahannya 70 + 4."
          periksa={rumah74}
        />
        <Pilih
          id={idKuis("D", 1)}
          pertanyaan="2. Manakah cara baca yang benar?"
          visual={<Papan anak="30 dan 13" />}
          pilihan={[
            { huruf: "A", teks: '30 dibaca "tiga belas"' },
            { huruf: "B", teks: '13 dibaca "satu puluh tiga"' },
            { huruf: "C", teks: '30 dibaca "tiga puluh"' },
            { huruf: "D", teks: '13 dibaca "tiga puluh satu"' },
          ]}
          benar="C"
          umpan="30 dibaca tiga puluh. 13 dibaca tiga belas."
          salah="Belasan hanya untuk 11 sampai 19."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 2)}
            pertanyaan="3. Baca angka 69 dengan benar dan jelas."
            periksa={(teks) => jawabanTulisMemuatAlias(teks, ["enam puluh sembilan", "69"])}
            petunjuk="Puluhan enam, satuan sembilan."
          />
        </div>
        <Pilih
          id={idKuis("D", 3)}
          pertanyaan='4. Bima berkata: "Pada angka 58, angka 5 bernilai 5 dan angka 8 bernilai 80." Apakah Bima benar?'
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah, seharusnya 5 bernilai 50 dan 8 bernilai 8" },
            { huruf: "C", teks: "Salah, seharusnya keduanya bernilai 0" },
            { huruf: "D", teks: "Salah, seharusnya 5 bernilai 500" },
          ]}
          benar="B"
          umpan="Angka 5 di puluhan bernilai 50. Angka 8 di satuan bernilai 8."
          salah="Lihat rumahnya. Kiri puluhan, kanan satuan."
        />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan setiap angka dengan nilai tempatnya!"
          baris={[
            { kiri: "27", pilihan: tempat, benar: "2 puluhan + 7 satuan" },
            { kiri: "63", pilihan: tempat, benar: "6 puluhan + 3 satuan" },
            { kiri: "90", pilihan: tempat, benar: "9 puluhan + 0 satuan" },
          ]}
          umpan="27 punya 2 puluhan. 63 punya 6 puluhan. 90 punya 9 puluhan."
        />
        <TulisBebas
          id={idKuis("D", 5)}
          judul="6. Membandingkan"
          visual={<Papan anak="[ 46 ] ⬜ [ 64 ]" />}
          pertanyaan="Tulis simbol yang tepat, lalu tulis alasan puluhannya."
          pesanSalah="Puluhan 4 lebih kecil dari puluhan 6."
          umpan="46 lebih kecil dari 64 karena puluhan 4 lebih kecil dari puluhan 6."
          alias={["lebih kecil", "4 lebih kecil"]}
          konteks="46 lebih kecil dari 64 karena puluhannya 4 dan 6."
          periksa={banding46}
        />
        <Pilih
          id={idKuis("D", 6)}
          pertanyaan="7. Puluhanku 6. Satuanku lebih besar dari 6, tetapi lebih kecil dari 8. Siapa aku?"
          pilihan={[
            { huruf: "A", teks: "65" },
            { huruf: "B", teks: "66" },
            { huruf: "C", teks: "67" },
            { huruf: "D", teks: "68" },
          ]}
          benar="C"
          umpan="Satuan yang lebih besar dari 6 dan lebih kecil dari 8 adalah 7. Angkanya 67."
          salah="Coret 65, 66, dan 68. Satuannya harus 7."
        />
        <SusunAngka
          id={idKuis("D", 7)}
          perintah="8. Susun dari yang paling kecil ke paling besar: 67, 24, 90, 46, 73."
          acak={[67, 24, 90, 46, 73]}
          benar={[24, 46, 67, 73, 90]}
          umpan="24, 46, 67, 73, lalu 90."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-4">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ SUARA:</p>
          <SoalRekamSuara
            id={idKuis("D", 8)}
            pertanyaan="9. Dari 31 dan 13, ucapkan yang lebih besar, lalu sebutkan alasannya."
            periksa={suara31}
            petunjuk="Bandingkan puluhannya."
          />
        </div>
        <Pilih
          id={idKuis("D", 9)}
          pertanyaan="10. Kartu 4 dan 7. Angka terbesar, angka terkecil, dan selisihnya adalah..."
          visual={<Papan anak="[ 4 ] dan [ 7 ]" />}
          pilihan={[
            { huruf: "A", teks: "74, 47, selisih 27" },
            { huruf: "B", teks: "47, 74, selisih 27" },
            { huruf: "C", teks: "74, 47, selisih 37" },
            { huruf: "D", teks: "77, 44, selisih 33" },
          ]}
          benar="A"
          umpan="Terbesar 74. Terkecil 47. 74 dikurangi 47 sama dengan 27."
          salah="Taruh angka yang lebih besar di rumah puluhan untuk mendapat angka terbesar."
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Kiri puluhan, kanan satuan."
          alias={["kiri puluhan", "kanan satuan"]}
          konteks="Kiri puluhan, kanan satuan."
        />
        <p className="text-sm font-black text-[#1C01A5]">Hore! Kamu sudah bisa membaca bilangan sampai 100.</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab9({
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
        cuplikan={cuplikanKalimat([
          "Sepuluh diikat jadi satu puluhan.",
          "Kiri puluhan, kanan satuan. Urutannya tidak boleh dibalik.",
          "Angka di rumah puluhan bernilai sepuluh kali. Empat di puluhan sama dengan empat puluh.",
          "Kalau puluhan beda, puluhan yang menang. Kalau puluhan sama, lihat satuannya.",
          "Saat mengurutkan, urutkan puluhan dulu, lalu rapikan satuan.",
          "Belasan hanya untuk sebelas sampai sembilan belas. Setelah itu pakai kata puluh.",
          "Angka yang berakhir nol tidak usah disebut satuannya.",
          "Angka yang sama di tempat yang beda punya nilai yang beda.",
        ])}
        poin={[
          "🟦 Sepuluh diikat jadi satu puluhan.",
          "⬅️ Kiri puluhan, kanan satuan.",
          "✖️ Angka di rumah puluhan bernilai 10 kali.",
          "🐊 Puluhan beda? Puluhan yang menang.",
          "🟨 Puluhan sama? Lihat satuannya.",
          "🪜 Urutkan puluhan dulu, lalu rapikan satuan.",
          "🗣️ Belasan hanya 11 sampai 19.",
          "0️⃣ Yang berakhir nol, tidak usah disebut satuannya.",
          "🪞 Angka sama, tempat beda, nilai beda.",
        ]}
        penutup="Sepuluh diikat jadi satu puluhan. Kiri puluhan, kanan satuan."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
