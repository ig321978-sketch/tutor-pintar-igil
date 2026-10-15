"use client";

import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import TujuanBelajar from "@/components/TujuanBelajar";
import PetaContoh from "@/components/PetaContoh";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import type { KelaminGuru } from "@/lib/guru";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK4_BAB4, TEMA_MTK4_BAB4 } from "@/lib/misi-mtk-4-bab4";
import { MODUL_MTK4_BAB4 } from "@/lib/modul-resmi-mtk-4-bab4";
import {
  literEmpat,
  literTujuh,
  luasDelapan,
  luasDuaBelas,
  luasDuaPuluh,
  luasDuaPuluhEmpat,
  luasDuaPuluhRibu,
  luasDuaPuluhSatu,
  luasSepuluhRibu,
  luasTigaPuluhEnam,
  volumeDuaRibu,
  volumeEnam,
  volumeEnamBelas,
  volumeLimaBelas,
  volumeSembilan,
} from "@/lib/nilai-mtk-4-bab4";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK4_BAB4.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode; latar?: string }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Nisa: "border-teal-300 bg-teal-50",
  Farhan: "border-orange-300 bg-orange-50",
  Cinta: "border-violet-300 bg-violet-50",
  Igil: "border-amber-300 bg-amber-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Nisa: "👧",
  Farhan: "👦",
  Cinta: "👧",
  Igil: "🦉",
};

function Dialog({ nama, anak }: { nama: string; anak: string }) {
  const warna = WARNA_DIALOG[nama] ?? "border-[#1C01A5]/15 bg-[#F8F7FF]";
  return (
    <article className={`rounded-2xl border-2 px-4 py-3 ${warna}`}>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#1C01A5]">
        <span className="text-2xl leading-none" aria-hidden>{WAJAH_DIALOG[nama] ?? "💬"}</span>
        {nama}
      </p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-700">{anak}</p>
    </article>
  );
}

function Papan({ anak }: { anak: string }) {
  return (
    <p className="whitespace-pre-wrap rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">
      {anak}
    </p>
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
      <p className="text-center text-4xl" aria-hidden>{ikon}</p>
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
  src,
  alt,
  kelas,
  kelamin,
  penjelasan,
  children,
  utama = true,
}: {
  judul: string;
  utama?: boolean;
  src: string;
  alt: string;
  kelas?: string;
  kelamin?: KelaminGuru;
  penjelasan: string[];
  children: ReactNode;
}) {
  return (
    <section className={utama ? "space-y-4 border-b-4 border-[#1C01A5] pb-8" : "space-y-3"}>
      <p className={utama ? "text-xl font-black leading-snug text-[#1C01A5]" : "text-xs font-black uppercase tracking-wide text-[#1C01A5]"}>{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({ id, pertanyaan, periksa, petunjuk, benar }: { id: string; pertanyaan: string; periksa: (teks: string) => boolean; petunjuk: string; benar?: string }) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(hasil) => setTepat(hasil)} />
      {tepat && benar ? <p className="mt-2 text-sm font-bold text-emerald-800">{benar}</p> : null}
    </div>
  );
}

function Pilih({ id, pertanyaan, pilihan, benar, umpan, salah, visual }: { id: string; pertanyaan: string; pilihan: { huruf: string; teks: string }[]; benar: string; umpan: string; salah: string; visual?: ReactNode }) {
  const kuis = useKuisMateri();
  const [pilih, setPilih] = useState("");
  const status = statusDariPilihan(pilih, benar);
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-4">
      <p className="text-sm font-semibold leading-relaxed text-slate-700">{pertanyaan}</p>
      {visual ? <div className="mt-3">{visual}</div> : null}
      <div className="mt-3 grid gap-2">
        {pilihan.map((item) => (
          <button key={item.huruf} type="button" onClick={() => { setPilih(item.huruf); if (item.huruf === benar) kuis?.tandaiBenar(id); }} className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(pilih, item.huruf, benar, "bg-[#1C01A5] text-white hover:bg-[#16017a]")}`}>
            {item.huruf}. {item.teks}
          </button>
        ))}
      </div>
      <HasilJawabanKuis status={status} cuplikan={pilih || undefined} pesanSalah={salah} />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisCocok({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { kiri: string; pilihan: string[]; benar: string }[]; umpan: string }) {
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
          const warna = !cek ? "border-sky-200 bg-white" : peta[indeks] === item.benar ? "border-emerald-400 bg-emerald-50" : "border-rose-300 bg-rose-50";
          return (
            <button key={item.kiri} type="button" onClick={() => setAktif(indeks)} className={`rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${warna} ${aktif === indeks ? "ring-2 ring-violet-400" : ""}`}>
              <span>{item.kiri}</span>
              <span className="mt-1 block text-slate-700">{peta[indeks] || "Belum dipasangkan"}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {baris[aktif]?.pilihan.map((kalimat) => (
          <button key={`${aktif}-${kalimat}`} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [aktif]: kalimat })); setCek(false); }} className="rounded-full bg-white px-3 py-2 text-sm font-bold text-[#1C01A5] ring-2 ring-[#1C01A5]/20">{kalimat}</button>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={() => { setCek(true); if (tepat) kuis?.tandaiBenar(id); }} className="mt-3 rounded-full bg-emerald-600 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pasangan</button>
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan gambarnya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
    </article>
  );
}

function TulisBebas({ id, judul, visual, pertanyaan, pesanSalah, bantuan, umpan, periksa, alias = [], konteks }: { id: string; judul?: string; visual?: ReactNode; pertanyaan: string; pesanSalah: string; bantuan?: string; umpan: string; periksa: (teks: string) => boolean; alias?: string[]; konteks?: string }) {
  const kuis = useKuisMateri();
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const [cuplikan, setCuplikan] = useState("");
  const [salahKe, setSalahKe] = useState(0);
  const nilai = async (data: string) => {
    if (data.startsWith("data:image")) {
      setCuplikan("tulisan tangan");
      try {
        const respons = await fetch("/api/kuis-tulis", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pertanyaan, konteks: konteks || umpan, alias, jawaban: data }) });
        const json = (await respons.json()) as { berhasil?: boolean; benar?: boolean; bacaan?: string; pesan?: string };
        if (!respons.ok || !json.berhasil) { setStatus(null); setCuplikan(json.pesan || "Gagal menilai. Kirim lagi."); return; }
        const bacaan = typeof json.bacaan === "string" ? json.bacaan : "";
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) kuis?.tandaiBenar(id);
        else setSalahKe((jumlah) => jumlah + 1);
      } catch { setStatus(null); setCuplikan("Gagal menilai. Kirim lagi."); }
      return;
    }
    const ok = periksa(data);
    setCuplikan(data.trim());
    setStatus(ok ? "benar" : "salah");
    if (ok) kuis?.tandaiBenar(id);
    else setSalahKe((jumlah) => jumlah + 1);
  };
  return (
    <div className="space-y-3">
      <p className="text-base font-extrabold text-[#1C01A5]">QUIZ TULIS:</p>
      {visual ? <div>{visual}</div> : null}
      {judul ? <p className="text-sm font-black text-[#1C01A5]">{judul}</p> : null}
      <p className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#F8F7FF] px-4 py-3 text-base font-extrabold text-[#1C01A5]">{pertanyaan}</p>
      <WritingCanvas onSubmit={nilai} />
      <HasilJawabanKuis status={status} cuplikan={cuplikan || undefined} pesanSalah={pesanSalah} />
      {bantuan && salahKe >= 2 && status === "salah" ? <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-900">{bantuan}</p> : null}
      <Umpan status={status} teks={umpan} />
    </div>
  );
}

function SusunToken({ id, perintah, acak, benar, umpan }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string }) {
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
      <p className="mt-2 text-center text-lg font-black text-[#1C01A5]">{susun.map((item) => item.teks).join("  ") || "…"}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sisa.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSisa((lama) => lama.filter((kartu) => kartu.id !== item.id)); setSusun((lama) => [...lama, item]); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#1C01A5] ring-2 ring-sky-300">{item.teks}</button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => { setSusun((lama) => { const akhir = lama[lama.length - 1]; if (akhir) setSisa((kartu) => [...kartu, akhir]); return lama.slice(0, -1); }); setStatus(null); }} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-2 ring-slate-200">Urungkan</button>
        <button type="button" onClick={periksa} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-black text-white">Periksa urutan</button>
      </div>
      <HasilJawabanKuis status={status} pesanSalah="Lihat baris dan kolomnya, lalu susun ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function KuisBenarSalah({ id, perintah, baris, umpan }: { id: string; perintah: string; baris: { teks: string; benar: boolean }[]; umpan: string }) {
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
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>{nilai ? "Benar" : "Salah"}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pernyataan</button>
      <HasilJawabanKuis status={status} pesanSalah="Cek satuan dan hitungannya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function Petak({ baris, kolom }: { baris: number; kolom: number }) {
  return (
    <div className="mx-auto grid w-fit gap-1" style={{ gridTemplateColumns: `repeat(${kolom}, 1.75rem)` }} aria-hidden>
      {Array.from({ length: baris * kolom }, (_, indeks) => (
        <span key={indeks} className="h-7 w-7 rounded-md bg-sky-400" />
      ))}
    </div>
  );
}

const SATUAN_A = ["Luas tidak baku", "Luas baku", "Volume tidak baku"];
const JENIS_B = ["Luas", "Volume baku", "Volume tidak baku"];
const HASIL_D = ["24 cm²", "2 liter", "12 cm³"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB4.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🫙👧👦🦉" judul="A. Toko Toples" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Mengukur luas dengan satuan tidak baku dan satuan baku.", "Memperkirakan luas dengan satuan tidak baku dan satuan baku.", "Mengukur volume dengan satuan tidak baku dan satuan baku.", "Memperkirakan volume dengan satuan tidak baku dan satuan baku."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Luas dengan satuan tidak baku" src="/doodle-mtk/mtk-4-bab4-sub1.jpg" alt="Meja toko ditutup kartu persegi yang sama besar. Tiga anak dan burung hantu bertopi biru." kelas={kelas} kelamin={kelamin} penjelasan={["Luas adalah daerah yang tertutup. Satuan tidak baku boleh kartu atau buku, asal ukurannya sama dan tidak ada celah."]}>
          <Dialog nama="Nisa" anak="Meja ini tertutup 6 kartu besar." />
          <Dialog nama="Farhan" anak="Kalau kartunya kecil, perlu 24 kartu." />
          <Dialog nama="Cinta" anak="Mejanya sama. Hitungannya beda karena kartunya beda." />
          <Dialog nama="Igil" anak="Tutup rapat, tanpa tumpang tindih. Itu mengukur luas." />
          <Papan anak="6 kartu besar    atau    24 kartu kecil" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="Ada 3 stiker di baris atas dan 5 stiker di baris bawah. Semuanya sama besar dan rapat. Berapa luasnya dalam stiker?" periksa={luasDelapan} petunjuk="Jumlahkan stiker yang menutup rapat." benar="8 stiker." />
          <TulisBebas id={idKuis("A", 1)} judul="Hitung petaknya" visual={<Petak baris={3} kolom={4} />} pertanyaan="Tulis banyak petak pada gambar." pesanSalah="Hitung baris, lalu kalikan dengan kolom." bantuan="3 baris × 4 kolom = 12." umpan="12 petak." periksa={luasDuaBelas} alias={["12"]} konteks="3 baris dan 4 kolom. Ada 12 petak." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Luas dengan satuan baku" src="/doodle-mtk/mtk-4-bab4-sub2.jpg" alt="Lantai ubin persegi dan penggaris kosong tanpa angka. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan baku luas antara lain cm² dan m². Satu petak 1 cm kali 1 cm sama dengan 1 cm²."]}>
          <Dialog nama="Igil" anak="Alas ini 5 petak sepanjang dan 2 petak melebar." />
          <Dialog nama="Cinta" anak="5 × 2 = 10. Luasnya 10 cm²." />
          <Dialog nama="Nisa" anak="cm² adalah satuan baku." />
          <Dialog nama="Farhan" anak="1 m² jauh lebih besar. Sama dengan 10.000 cm²." />
          <Papan anak="5 × 2 = 10 cm²" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="Ada 3 baris. Tiap baris 4 petak cm. Berapa luasnya?" periksa={luasDuaBelas} petunjuk="Kalikan banyak baris dengan banyak petak di setiap baris." benar="12 cm²." />
          <TulisBebas id={idKuis("A", 3)} judul="Jadi cm²" visual={<Papan anak="6 cm × 4 cm" />} pertanyaan="Tulis luasnya dalam cm²." pesanSalah="Kalikan kedua sisinya." bantuan="6 × 4 = 24." umpan="24 cm²." periksa={luasDuaPuluhEmpat} alias={["24"]} konteks="6 cm kali 4 cm sama dengan 24 cm²." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Volume dengan satuan tidak baku" src="/doodle-mtk/mtk-4-bab4-sub3.jpg" alt="Toples diisi kubus kayu. Ada ciduk besar dan ciduk kecil. Burung hantu bertopi biru di toko." kelas={kelas} kelamin={kelamin} penjelasan={["Volume adalah ruang yang terisi. Gayung dan kubus kayu adalah satuan tidak baku. Satuan yang lebih besar membuat hitungan lebih sedikit."]}>
          <Dialog nama="Farhan" anak="Toples ini penuh setelah 3 gayung besar." />
          <Dialog nama="Nisa" anak="Gayung kecil perlu 15 tuangan." />
          <Dialog nama="Cinta" anak="Isinya sama. Tuangannya beda karena gayungnya beda." />
          <Dialog nama="Igil" anak="Itu mengukur volume dengan satuan tidak baku." />
          <Papan anak="3 gayung besar    atau    15 gayung kecil" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="Ada 3 tingkat. Tiap tingkat 3 kubus kayu yang sama. Berapa volumenya?" periksa={volumeSembilan} petunjuk="Kalikan banyak tingkat dengan kubus di setiap tingkat." benar="9 kubus." />
          <TulisBebas id={idKuis("A", 5)} judul="Dua lapis kubus" visual={<Papan anak="2 lapis × 6 kubus" />} pertanyaan="Tulis volumenya dalam kubus." pesanSalah="Kalikan banyak lapis dengan kubus di setiap lapis." bantuan="2 × 6 = 12." umpan="12 kubus." periksa={luasDuaBelas} alias={["12"]} konteks="2 lapis kali 6 kubus sama dengan 12 kubus." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Volume dengan satuan baku" src="/doodle-mtk/mtk-4-bab4-sub4.jpg" alt="Teko ukur kosong dan tumpukan kubus. Burung hantu bertopi biru bersama tiga anak di toko toples." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan baku volume antara lain mililiter, liter, dan cm³. 1.000 ml sama dengan 1 liter. Satu kubus 1 cm adalah 1 cm³."]}>
          <Dialog nama="Cinta" anak="Botol ini berisi 2.000 ml." />
          <Dialog nama="Igil" anak="2.000 ml sama dengan 2 liter." />
          <Dialog nama="Nisa" anak="Kubus kecil 1 cm dipakai untuk cm³." />
          <Dialog nama="Farhan" anak="Panjang, lebar, dan tinggi dikalikan." />
          <Papan anak="2.000 ml = 2 liter" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="Ada dua botol. Masing-masing 2.000 ml. Berapa liter semuanya?" periksa={literEmpat} petunjuk="1.000 ml sama dengan 1 liter." benar="4 liter." />
          <TulisBebas id={idKuis("A", 7)} judul="Jadi cm³" visual={<Papan anak="2 lapis × 8 kubus" />} pertanyaan="Tulis volumenya dalam cm³." pesanSalah="Kalikan banyak lapis dengan kubus di setiap lapis." bantuan="2 × 8 = 16." umpan="16 cm³." periksa={volumeEnamBelas} alias={["16"]} konteks="2 lapis kali 8 kubus sama dengan 16 cm³." />
        </Adegan>
        <Pilih id={idKuis("A", 8)} pertanyaan="Alas 5 petak kali 3 petak. Luasnya..." visual={<Petak baris={3} kolom={5} />} pilihan={[{ huruf: "A", teks: "8 cm²" }, { huruf: "B", teks: "15 cm²" }, { huruf: "C", teks: "12 cm²" }, { huruf: "D", teks: "35 cm²" }]} benar="B" umpan="5 × 3 = 15. Luasnya 15 cm²." salah="Kalikan kedua sisi petaknya." />
        <KuisCocok id={idKuis("A", 9)} perintah="Pasangkan alat dengan jenis satuannya." baris={[{ kiri: "Kartu pos", pilihan: SATUAN_A, benar: "Luas tidak baku" }, { kiri: "cm²", pilihan: SATUAN_A, benar: "Luas baku" }, { kiri: "Gayung", pilihan: SATUAN_A, benar: "Volume tidak baku" }]} umpan="Kartu pos untuk luas tidak baku. cm² untuk luas baku. Gayung untuk volume tidak baku." />
        <SusunToken id={idKuis("A", 10)} perintah="Susun luas dari yang paling kecil." acak={["15 cm²", "6 cm²", "21 cm²", "10 cm²"]} benar={["6 cm²", "10 cm²", "15 cm²", "21 cm²"]} umpan="6 cm², 10 cm², 15 cm², 21 cm²." />
        <KuisBenarSalah id={idKuis("A", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "Menutup tanpa celah adalah mengukur luas.", benar: true }, { teks: "1 liter sama dengan 100 ml.", benar: false }, { teks: "Satuan yang lebih kecil bisa membuat hitungan lebih banyak.", benar: true }]} umpan="Yang pertama dan ketiga benar. 1 liter sama dengan 1.000 ml." />
        <Pilih id={idKuis("A", 12)} pertanyaan="Satuan baku untuk luas tutup toples adalah..." pilihan={[{ huruf: "A", teks: "Gayung" }, { huruf: "B", teks: "cm²" }, { huruf: "C", teks: "Gelas" }, { huruf: "D", teks: "Toples" }]} benar="B" umpan="cm² adalah satuan baku luas." salah="Gayung, gelas, dan toples bukan satuan baku luas." />
        <Pilih id={idKuis("A", 13)} pertanyaan="Nampan ini kira-kira muat hampir 20 kartu. Perkiraan paling masuk akal..." pilihan={[{ huruf: "A", teks: "8 kartu" }, { huruf: "B", teks: "18 kartu" }, { huruf: "C", teks: "40 kartu" }, { huruf: "D", teks: "80 kartu" }]} benar="B" umpan="18 paling dekat dengan 20." salah="Pilih yang paling dekat dengan 20." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB4.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🫙" judul="B. Peta Toko" anak="Intisari tutup dan isi" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Tutup rapat" src="/doodle-mtk/mtk-4-bab4-sub1.jpg" alt="Meja toko ditutup kartu persegi yang sama besar." kelas={kelas} kelamin={kelamin} penjelasan={["Satuan tidak baku harus sama besar. Tutup rapat, tanpa celah, dan tanpa tumpang tindih."]}>
          <PetaContoh pusat="Tanpa celah" cabang={[{ ikon: "🃏", judul: "Kartu sama", isi: "ukuran satu macam" }, { ikon: "🟦", judul: "Lima baris", isi: "tiap baris 3" }, { ikon: "🦉", judul: "Lima belas", isi: "5 × 3" }]} kolom={["Baris", "Kartu"]} baris={[["1", "3"], ["2", "6"], ["5", "15"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="Ada 6 baris. Tiap baris 4 kartu yang sama. Berapa kartu semuanya?" periksa={luasDuaPuluhEmpat} petunjuk="Kalikan banyak baris dengan kartu di setiap baris." benar="24 kartu." />
          <TulisBebas id={idKuis("B", 1)} judul="Kartu kecil" visual={<Papan anak="5 besar = ⬜ kecil" />} pertanyaan="Satu kartu besar sama dengan 4 kartu kecil. Ada 5 kartu besar. Tulis banyak kartu kecil." pesanSalah="Kalikan banyak kartu besar dengan 4." bantuan="5 × 4 = 20." umpan="20 kartu kecil." periksa={luasDuaPuluh} alias={["20"]} konteks="5 kartu besar kali 4 sama dengan 20 kartu kecil." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Petak baku" src="/doodle-mtk/mtk-4-bab4-sub2.jpg" alt="Lantai ubin persegi dan penggaris kosong tanpa angka." kelas={kelas} kelamin={kelamin} penjelasan={["Luas petak sama dengan baris kali kolom. 1 m² sama dengan 10.000 cm²."]}>
          <PetaContoh pusat="10.000" cabang={[{ ikon: "📏", judul: "Satu meter", isi: "1 m²" }, { ikon: "🟦", judul: "Petak cm", isi: "100 × 100" }, { ikon: "✨", judul: "Hasil cm", isi: "10.000 cm²" }]} kolom={["Ukuran", "Luas"]} baris={[["4 cm × 3 cm", "12 cm²"], ["1 m²", "10.000 cm²"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="Alas 7 cm kali 3 cm. Berapa luasnya?" periksa={luasDuaPuluhSatu} petunjuk="Kalikan kedua sisinya." benar="21 cm²." />
          <TulisBebas id={idKuis("B", 3)} judul="Dua meter" visual={<Papan anak="2 m² = ⬜ cm²" />} pertanyaan="Tulis 2 m² dalam cm²." pesanSalah="1 m² sama dengan 10.000 cm²." bantuan="2 × 10.000 = 20.000." umpan="20.000 cm²." periksa={luasDuaPuluhRibu} alias={["20000"]} konteks="2 meter persegi sama dengan 20.000 cm²." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Isi wadah" src="/doodle-mtk/mtk-4-bab4-sub3.jpg" alt="Toples diisi kubus kayu dan dua ciduk yang berbeda." kelas={kelas} kelamin={kelamin} penjelasan={["Gayung dan kubus kayu mengukur volume jika ukurannya sama. Wadah yang sama bisa punya hitungan berbeda."]}>
          <PetaContoh pusat="Isi sama" cabang={[{ ikon: "🪣", judul: "Empat gayung", isi: "ember penuh" }, { ikon: "🪵", judul: "Dua tingkat", isi: "tiap tingkat 4" }, { ikon: "📦", judul: "Delapan kubus", isi: "2 × 4" }]} kolom={["Alat", "Hitungan"]} baris={[["Gayung", "4"], ["Kubus", "8"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="Ada 2 gayung di ember, lalu ditambah 4 gayung. Embernya penuh. Berapa gayung semuanya?" periksa={volumeEnam} petunjuk="Jumlahkan kedua tuangan." benar="6 gayung." />
          <TulisBebas id={idKuis("B", 5)} judul="Tiga tingkat" visual={<Papan anak="3 tingkat × 5 kubus" />} pertanyaan="Tulis banyak kubusnya." pesanSalah="Kalikan banyak tingkat dengan kubus di setiap tingkat." bantuan="3 × 5 = 15." umpan="15 kubus." periksa={volumeLimaBelas} alias={["15"]} konteks="3 tingkat kali 5 kubus sama dengan 15 kubus." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Liter dan kubus" src="/doodle-mtk/mtk-4-bab4-sub4.jpg" alt="Teko ukur kosong dan tumpukan kubus di toko toples." kelas={kelas} kelamin={kelamin} penjelasan={["1 liter sama dengan 1.000 ml. Volume kubus sama dengan panjang kali lebar kali tinggi."]}>
          <PetaContoh pusat="1.000 ml" cabang={[{ ikon: "🫙", judul: "Satu liter", isi: "1.000 ml" }, { ikon: "📦", judul: "Kotak contoh", isi: "3 × 2 × 2" }, { ikon: "🦉", judul: "Dua belas", isi: "12 cm³" }]} kolom={["Ukuran", "Hasil"]} baris={[["1 liter", "1.000 ml"], ["3 × 2 × 2", "12 cm³"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="Botol berisi 2 liter. Berapa ml isinya?" periksa={volumeDuaRibu} petunjuk="Satu liter sama dengan seribu ml." benar="2.000 ml." />
          <TulisBebas id={idKuis("B", 7)} judul="Lima kali dua" visual={<Papan anak="5 × 2 × 2" />} pertanyaan="Tulis volumenya dalam cm³." pesanSalah="Kalikan ketiga ukurannya." bantuan="5 × 2 × 2 = 20." umpan="20 cm³." periksa={luasDuaPuluh} alias={["20"]} konteks="5 kali 2 kali 2 sama dengan 20 cm³." />
        </Adegan>
        <Pilih id={idKuis("B", 8)} pertanyaan="1.500 ml sama dengan..." pilihan={[{ huruf: "A", teks: "15 liter" }, { huruf: "B", teks: "1 liter 500 ml" }, { huruf: "C", teks: "150 ml" }, { huruf: "D", teks: "15.000 ml" }]} benar="B" umpan="1.000 ml = 1 liter. Sisanya 500 ml." salah="Pecah 1.500 menjadi 1.000 dan 500." />
        <KuisCocok id={idKuis("B", 9)} perintah="Pasangkan ukuran dengan jenisnya." baris={[{ kiri: "12 cm²", pilihan: JENIS_B, benar: "Luas" }, { kiri: "1 liter", pilihan: JENIS_B, benar: "Volume baku" }, { kiri: "8 kubus kayu", pilihan: JENIS_B, benar: "Volume tidak baku" }]} umpan="12 cm² luas. 1 liter volume baku. 8 kubus kayu volume tidak baku." />
        <SusunToken id={idKuis("B", 10)} perintah="Susun volume dari yang paling kecil." acak={["1.000 ml", "250 ml", "2.000 ml", "500 ml"]} benar={["250 ml", "500 ml", "1.000 ml", "2.000 ml"]} umpan="250 ml, 500 ml, 1.000 ml, 2.000 ml." />
        <KuisBenarSalah id={idKuis("B", 11)} perintah="Pilih benar atau salah." baris={[{ teks: "1 m² sama dengan 100 cm².", benar: false }, { teks: "5 × 4 = 20 cm².", benar: true }, { teks: "3 liter sama dengan 300 ml.", benar: false }]} umpan="Hanya yang kedua benar. 1 m² = 10.000 cm². 3 liter = 3.000 ml." />
        <Pilih id={idKuis("B", 12)} pertanyaan="Botol kecil kira-kira 1 liter kurang sedikit. Perkiraan paling masuk akal..." pilihan={[{ huruf: "A", teks: "90 ml" }, { huruf: "B", teks: "900 ml" }, { huruf: "C", teks: "9 liter" }, { huruf: "D", teks: "90 liter" }]} benar="B" umpan="900 ml paling dekat dengan 1 liter." salah="1 liter sama dengan 1.000 ml." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK4_BAB4.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🫙🦉" judul={kartu.judul} anak="Sepuluh pos toko" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab4-permainan.jpg" alt="Sepuluh toples kosong berjajar. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal tutup dan isi. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK4_BAB4} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK4_BAB4} penutup="Toko sepi. Igil menempelkan stempel toples." bunga="🫙🟦🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK4_BAB4.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Toko Toples" : skor >= 6 ? "🫙 Penjaga Tutup" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Tutup dan isinya tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru toko." : "Ayo ukur tutup dan isinya lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 4 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-4-bab4-evaluasi.jpg" alt="Meja toko dengan kertas kosong dan toples. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Petak tutup" visual={<Petak baris={4} kolom={9} />} pertanyaan="Tulis luasnya dalam cm²." pesanSalah="Hitung baris, lalu kalikan dengan kolom." bantuan="9 × 4 = 36." umpan="36 cm²." periksa={luasTigaPuluhEnam} alias={["36"]} konteks="9 kolom kali 4 baris sama dengan 36 cm²." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Meja yang sama ditutup kartu. Mana yang butuh hitungan lebih banyak?" pilihan={[{ huruf: "A", teks: "Kartu besar" }, { huruf: "B", teks: "Kartu kecil" }, { huruf: "C", teks: "Sama banyak" }, { huruf: "D", teks: "Penggaris" }]} benar="B" umpan="Kartu kecil lebih kecil, jadi jumlahnya lebih banyak." salah="Satuan yang lebih kecil biasanya butuh lebih banyak." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Toples berisi 7.000 ml. Berapa liter isinya?" periksa={literTujuh} petunjuk="1.000 ml sama dengan 1 liter." benar="7 liter." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Kotak tersusun 2 × 4 × 3 kubus. Volumenya..." visual={<Papan anak="2 × 4 × 3" />} pilihan={[{ huruf: "A", teks: "9 cm³" }, { huruf: "B", teks: "24 cm³" }, { huruf: "C", teks: "14 cm³" }, { huruf: "D", teks: "48 cm³" }]} benar="B" umpan="2 × 4 × 3 = 24. Volumenya 24 cm³." salah="Kalikan ketiga ukurannya." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan hitungan dengan hasilnya." baris={[{ kiri: "6 × 4 petak", pilihan: HASIL_D, benar: "24 cm²" }, { kiri: "2.000 ml", pilihan: HASIL_D, benar: "2 liter" }, { kiri: "3 × 2 × 2 kubus", pilihan: HASIL_D, benar: "12 cm³" }]} umpan="24 cm², 2 liter, dan 12 cm³." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Satu meter" visual={<Papan anak="1 m² = ⬜ cm²" />} pertanyaan="Tulis 1 m² dalam cm²." pesanSalah="Satu sisi 1 m sama dengan 100 cm." bantuan="100 × 100 = 10.000." umpan="10.000 cm²." periksa={luasSepuluhRibu} alias={["10000"]} konteks="1 meter persegi sama dengan 10.000 cm²." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. Meja tertutup 30 kartu. Kartu diganti yang luasnya dua kali. Kira-kira perlu..." visual={<Papan anak="30 kartu  →  dua kali lebih luas" />} pilihan={[{ huruf: "A", teks: "30 kartu" }, { huruf: "B", teks: "60 kartu" }, { huruf: "C", teks: "15 kartu" }, { huruf: "D", teks: "6 kartu" }]} benar="C" umpan="Kartu dua kali lebih luas, jumlahnya kira-kira setengah. 30 ÷ 2 = 15." salah="Satuan lebih besar, hitungannya lebih sedikit." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. 1 liter 250 ml sama dengan..." pilihan={[{ huruf: "A", teks: "125 ml" }, { huruf: "B", teks: "1.250 ml" }, { huruf: "C", teks: "12.500 ml" }, { huruf: "D", teks: "251 ml" }]} benar="B" umpan="1 liter = 1.000 ml. 1.000 + 250 = 1.250 ml." salah="Ubah 1 liter menjadi 1.000 ml, lalu tambahkan 250." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Satu lapis ada 6 kubus. Ada 2 lapis. Sebutkan volumenya." periksa={luasDuaBelas} petunjuk="Kalikan kubus satu lapis dengan banyak lapis." benar="12 kubus." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Empat gayung besar dan empat gelas kecil. Jumlah tuangan sama. Volume yang lebih besar..." pilihan={[{ huruf: "A", teks: "Gelas kecil" }, { huruf: "B", teks: "Gayung besar" }, { huruf: "C", teks: "Sama saja" }, { huruf: "D", teks: "Tidak ada isi" }]} benar="B" umpan="Jumlahnya sama, tetapi gayung lebih besar. Volumenya lebih besar." salah="Bandingkan ukuran satu tuangan, bukan hanya jumlahnya." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk4Bab4({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-4-bab4-poin.jpg", alt: "Igil dan tiga anak di toko toples memegang kartu kosong dan toples." }}
        cuplikan={cuplikanKalimat(["Luas menutup permukaan. Volume mengisi ruang.", "Satuan tidak baku harus sama besar. Satuan baku luas memakai cm² dan m².", "1.000 ml sama dengan 1 liter. 1 m² sama dengan 10.000 cm²."])}
        poin={["Luas tidak baku: tutup rapat dengan kartu atau buku yang sama.", "Luas baku: baris × kolom. 1 m² = 10.000 cm².", "Volume tidak baku: gayung atau kubus kayu yang sama.", "Volume baku: 1 liter = 1.000 ml. Kubus 1 cm = 1 cm³.", "Perkiraan memilih jumlah yang paling masuk akal."]}
        penutup="Lihat dulu, ini menutup permukaan atau mengisi ruang."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
