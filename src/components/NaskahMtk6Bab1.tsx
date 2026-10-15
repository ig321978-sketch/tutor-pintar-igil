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
import { MISI_MTK6_BAB1, TEMA_MTK6_BAB1 } from "@/lib/misi-mtk-6-bab1";
import { MODUL_MTK6_BAB1 } from "@/lib/modul-resmi-mtk-6-bab1";
import {
  desimalDuaKomaSembilan,
  desimalLimaKomaDelapan,
  desimalNolKomaSembilan,
  desimalSeperlima,
  desimalSatuKomaLima,
  desimalTigaDelapanKomaLima,
  desimalTigaPerEmpat,
  enamPerLima,
  jumlahDelapan,
  jumlahDuaPuluh,
  jumlahEnam,
  jumlahEnamPuluhLima,
  jumlahLima,
  jumlahLimaBelas,
  jumlahSembilan,
  jumlahTiga,
  jumlahTigaPuluh,
  limaPerTigaPuluhDua,
  seperenam,
} from "@/lib/nilai-mtk-6-bab1";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK6_BAB1.id;

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
      <HasilJawabanKuis status={status} pesanSalah="Lihat pembilang dan penyebut, lalu susun dari yang paling kecil." />
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
      <HasilJawabanKuis status={status} pesanSalah="Cek pembilang, penyebut, atau angka di kiri koma, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}


const HASIL_A = ["6/5", "10 pohon", "1/6 liter"];
const DESIMAL_B = ["0,5", "0,2", "0,1"];
const HASIL_D = ["6 gelas", "15 gelas", "8 bolu"];

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK6_BAB1.kartu[0];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🌿👧👦🦉" judul="A. Taman Takar" anak="Nisa, Farhan, Cinta, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <TujuanBelajar butir={["Mengalikan bilangan asli dengan pecahan dan sebaliknya.", "Membagi pecahan dengan bilangan asli dan sebaliknya.", "Mengubah pecahan menjadi desimal.", "Membandingkan dan mengurutkan bilangan desimal."]} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Perkalian bilangan asli dengan pecahan" src="/doodle-mtk/mtk-6-bab1-sub1.jpg" alt="Tiga anak dan burung hantu bertopi biru menakar petak taman." kelas={kelas} kelamin={kelamin} penjelasan={["Bilangan asli kali pecahan: kalikan pembilang, penyebut tetap."]}>
          <Dialog nama="Nisa" anak="Lima takaran besar. Satu takaran menyiram 2 m²." />
          <Dialog nama="Farhan" anak="5 kali 2 sama dengan 10. Luasnya 10 m²." />
          <Dialog nama="Cinta" anak="Takaran kecil menyiram 3/5 m²." />
          <Dialog nama="Igil" anak="Kalikan pembilangnya. Penyebutnya tetap." />
          <Papan anak="a × b/c = (a × b)/c" />
          <KuisSuara id={idKuis("A", 0)} pertanyaan="2 kali 3/5. Sebutkan hasilnya." periksa={enamPerLima} petunjuk="Kalikan bilangan asli dengan pembilang. Penyebut tetap." benar="6/5." />
          <TulisBebas id={idKuis("A", 1)} judul="Pita" visual={<Papan anak="4 × 3/4 m" />} pertanyaan="Tulis panjang seluruh pita dalam meter." pesanSalah="Kalikan 4 dengan pembilang, lalu sederhanakan." bantuan="4 kali 3 sama dengan 12. 12 dibagi 4 sama dengan 3." umpan="3 meter." periksa={jumlahTiga} alias={["3"]} konteks="Empat kali tiga per empat sama dengan 3 meter." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Perkalian pecahan dengan bilangan asli" src="/doodle-mtk/mtk-6-bab1-sub2.jpg" alt="Pohon di taman sekolah. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Pecahan kali bilangan asli mencari bagian dari sekumpulan benda."]}>
          <Dialog nama="Igil" anak="Ada 15 pohon. Dua pertiganya jenis manalagi." />
          <Dialog nama="Nisa" anak="Kita ambil 2 bagian dari 3 bagian." />
          <Dialog nama="Farhan" anak="Pembilang dikali 15. Penyebut tetap 3." />
          <Dialog nama="Cinta" anak="Hasilnya kita hitung pada soal." />
          <Papan anak="2/3 dari 15 pohon" />
          <KuisSuara id={idKuis("A", 2)} pertanyaan="1/4 kali 20. Sebutkan hasilnya." periksa={jumlahLima} petunjuk="Bagi 20 dengan 4." benar="5." />
          <TulisBebas id={idKuis("A", 3)} judul="Musik" visual={<Papan anak="1/6 × 180" />} pertanyaan="Tulis banyak siswa yang memilih musik." pesanSalah="Bagi 180 dengan 6." bantuan="180 dibagi 6 sama dengan 30." umpan="30 siswa." periksa={jumlahTigaPuluh} alias={["30"]} konteks="Seperenam kali seratus delapan puluh sama dengan 30." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Pembagian pecahan dengan bilangan asli" src="/doodle-mtk/mtk-6-bab1-sub3.jpg" alt="Satu botol jus dibagi ke beberapa gelas. Burung hantu bertopi biru di taman." kelas={kelas} kelamin={kelamin} penjelasan={["Pecahan dibagi bilangan asli sama dengan pecahan itu dikali satu per pembagi."]}>
          <Dialog nama="Cinta" anak="Satu liter jus dibagi rata ke 3 gelas." />
          <Dialog nama="Nisa" anak="Tiap gelas dapat 1/3 liter." />
          <Dialog nama="Farhan" anak="Membagi sama dengan mengalikan kebalikan pembagi." />
          <Dialog nama="Igil" anak="1 dibagi 3 sama dengan 1/3." />
          <Papan anak="1/a ÷ b = 1/a × 1/b" />
          <KuisSuara id={idKuis("A", 4)} pertanyaan="1/2 liter dibagi rata ke 3 gelas. Sebutkan isi tiap gelas." periksa={seperenam} petunjuk="Kalikan 1/2 dengan 1/3." benar="1/6 liter." />
          <TulisBebas id={idKuis("A", 5)} judul="Penyebut" visual={<Papan anak="1/3 ÷ 3" />} pertanyaan="Tulis penyebut hasilnya." pesanSalah="Penyebut dikalikan dengan pembagi." bantuan="3 kali 3 sama dengan 9." umpan="9." periksa={jumlahSembilan} alias={["9"]} konteks="Sepertiga dibagi tiga sama dengan sepersembilan. Penyebutnya 9." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Pembagian bilangan asli dengan pecahan" src="/doodle-mtk/mtk-6-bab1-sub4.jpg" alt="Beberapa gelas kecil diisi dari botol besar. Burung hantu bertopi biru menghitung gelas." kelas={kelas} kelamin={kelamin} penjelasan={["Bilangan asli dibagi pecahan sama dengan bilangan itu dikali kebalikan pecahan."]}>
          <Dialog nama="Farhan" anak="Ada 3 liter jus. Tiap gelas muat 1/4 liter." />
          <Dialog nama="Igil" anak="3 dibagi 1/4 sama dengan 12 gelas." />
          <Dialog nama="Nisa" anak="Gelasnya lebih banyak daripada liternya." />
          <Dialog nama="Cinta" anak="Kita kali dengan kebalikan pecahan." />
          <Papan anak="a ÷ b/c = a × c/b" />
          <KuisSuara id={idKuis("A", 6)} pertanyaan="3 liter dibagi gelas 1/2 liter. Sebutkan banyak gelas." periksa={jumlahEnam} petunjuk="Kalikan 3 dengan kebalikan 1/2." benar="6 gelas." />
          <TulisBebas id={idKuis("A", 7)} judul="Gelas kecil" visual={<Papan anak="3 ÷ 1/5" />} pertanyaan="Tulis banyak gelas." pesanSalah="Kalikan 3 dengan kebalikan 1/5." bantuan="3 kali 5 sama dengan 15." umpan="15 gelas." periksa={jumlahLimaBelas} alias={["15"]} konteks="Tiga dibagi seperlima sama dengan 15 gelas." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Mengubah pecahan menjadi desimal" src="/doodle-mtk/mtk-6-bab1-sub5.jpg" alt="Timbangan buah tanpa angka. Burung hantu bertopi biru dan tiga anak di taman." kelas={kelas} kelamin={kelamin} penjelasan={["Pecahan berpenyebut 2, 5, atau 10 diubah menjadi penyebut 10 atau 100."]}>
          <Dialog nama="Nisa" anak="Ibu minta jeruk 1/2 kg." />
          <Dialog nama="Farhan" anak="Timbangan menulis 0,50 kg." />
          <Dialog nama="Igil" anak="1/2 sama dengan 0,5. Nol koma lima puluh sama dengan nol koma lima." />
          <Dialog nama="Cinta" anak="Angka di kiri koma adalah satuan. Di kanan koma persepuluhan." />
          <Papan anak="1/2 = 0,5 = 0,50" />
          <KuisSuara id={idKuis("A", 8)} pertanyaan="1/5 kg menjadi desimal. Sebutkan nilainya." periksa={desimalSeperlima} petunjuk="Ubah penyebut menjadi 10." benar="0,2." />
          <TulisBebas id={idKuis("A", 9)} judul="Tiga per empat" visual={<Papan anak="3/4" />} pertanyaan="Tulis bentuk desimalnya." pesanSalah="Ubah penyebut menjadi 100." bantuan="3/4 sama dengan 75/100, yaitu 0,75." umpan="0,75." periksa={desimalTigaPerEmpat} alias={[]} konteks="Tiga per empat sama dengan nol koma tujuh puluh lima." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Membandingkan dan mengurutkan desimal" src="/doodle-mtk/mtk-6-bab1-sub6.jpg" alt="Jalan menuju sekolah. Burung hantu bertopi biru bersama tiga anak." kelas={kelas} kelamin={kelamin} penjelasan={["Bandingkan desimal dari kiri tanda koma. Jangan mengira 49 lebih besar dari 9 pada 2,49 dan 2,9."]}>
          <Dialog nama="Cinta" anak="Ada jarak 0,9 km, 1,9 km, 2,3 km, 2,6 km, dan 3,6 km." />
          <Dialog nama="Nisa" anak="Kita lihat angka di kiri koma dulu." />
          <Dialog nama="Farhan" anak="Yang satuannya sama, lihat persepuluhan." />
          <Dialog nama="Igil" anak="2,9 lebih besar dari 2,49." />
          <Papan anak="0,9 · 1,9 · 2,3 · 2,6 · 3,6" />
          <KuisSuara id={idKuis("A", 10)} pertanyaan="Dari jarak di papan, sebutkan yang terdekat." periksa={desimalNolKomaSembilan} petunjuk="Pilih bilangan yang paling kecil." benar="0,9 km." />
          <TulisBebas id={idKuis("A", 11)} judul="Suhu tertinggi" visual={<Papan anak="37,2 · 33,3 · 36,6 · 38,5 · 36,8" />} pertanyaan="Tulis suhu yang paling tinggi." pesanSalah="Bandingkan puluhan, lalu satuan, lalu persepuluhan." bantuan="38,5 paling besar." umpan="38,5." periksa={desimalTigaDelapanKomaLima} alias={[]} konteks="Suhu tertinggi adalah tiga puluh delapan koma lima." />
        </Adegan>
        <Pilih id={idKuis("A", 12)} pertanyaan="5 takaran kali 2 m². Luasnya..." visual={<Papan anak="5 × 2" />} pilihan={[{ huruf: "A", teks: "7 m²" }, { huruf: "B", teks: "10 m²" }, { huruf: "C", teks: "3 m²" }, { huruf: "D", teks: "25 m²" }]} benar="B" umpan="5 kali 2 sama dengan 10 m²." salah="Kalikan banyak takaran dengan luas satu takaran." />
        <KuisCocok id={idKuis("A", 13)} perintah="Pasangkan operasi dengan hasilnya." baris={[{ kiri: "2 × 3/5", pilihan: HASIL_A, benar: "6/5" }, { kiri: "2/3 × 15", pilihan: HASIL_A, benar: "10 pohon" }, { kiri: "1/2 ÷ 3", pilihan: HASIL_A, benar: "1/6 liter" }]} umpan="6/5, 10 pohon, dan 1/6 liter." />
        <SusunToken id={idKuis("A", 14)} perintah="Susun jarak dari yang terdekat." acak={["2,3", "0,9", "3,6", "1,9"]} benar={["0,9", "1,9", "2,3", "3,6"]} umpan="0,9 km, 1,9 km, 2,3 km, 3,6 km." />
        <KuisBenarSalah id={idKuis("A", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "2 × 3/5 = 6/5.", benar: true }, { teks: "1/2 ÷ 3 = 1/2.", benar: false }, { teks: "0,50 = 0,5.", benar: true }]} umpan="Yang pertama dan ketiga benar. 1/2 dibagi 3 sama dengan 1/6." />
        <Pilih id={idKuis("A", 16)} pertanyaan="3 dibagi 1/4 sama dengan..." visual={<Papan anak="3 liter · gelas 1/4 liter" />} pilihan={[{ huruf: "A", teks: "3/4" }, { huruf: "B", teks: "4" }, { huruf: "C", teks: "7" }, { huruf: "D", teks: "12" }]} benar="D" umpan="3 kali 4 sama dengan 12." salah="Kalikan dengan kebalikan pecahan." />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK6_BAB1.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🗺️🥤" judul="B. Peta Takar" anak="Intisari kali, bagi, dan koma" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <div className="mt-4 space-y-4">
        <Adegan utama judul="Sub-bab 1 — Pembilang dikali" src="/doodle-mtk/mtk-6-bab1-sub1.jpg" alt="Petak taman yang ditakar." kelas={kelas} kelamin={kelamin} penjelasan={["Contoh buku: 2 kali 3/5 sama dengan 6/5. Lima takaran besar memberi 10 m²."]}>
          <PetaContoh pusat="Kali" cabang={[{ ikon: "✖️", judul: "Pembilang", isi: "dikali dulu" }, { ikon: "🔒", judul: "Penyebut", isi: "tetap" }, { ikon: "🌿", judul: "Contoh kebun", isi: "2 × 3/5 = 6/5" }]} kolom={["Operasi", "Hasil"]} baris={[["2 × 3/5", "6/5"], ["5 × 2", "10"]]} />
          <KuisSuara id={idKuis("B", 0)} pertanyaan="5 kali 3/5. Sebutkan hasilnya." periksa={jumlahTiga} petunjuk="Kalikan 5 dengan 3, lalu bagi 5." benar="3." />
          <TulisBebas id={idKuis("B", 1)} judul="Dua puluh bagian" visual={<Papan anak="20 × 1/4" />} pertanyaan="Tulis hasilnya." pesanSalah="Bagi 20 dengan 4." bantuan="20 dibagi 4 sama dengan 5." umpan="5." periksa={jumlahLima} alias={["5"]} konteks="Dua puluh kali seperempat sama dengan 5." />
        </Adegan>
        <Adegan utama judul="Sub-bab 1 — Bagian dari kumpulan" src="/doodle-mtk/mtk-6-bab1-sub2.jpg" alt="Sekumpulan pohon di taman." kelas={kelas} kelamin={kelamin} penjelasan={["Dua pertiga dari 15 pohon sama dengan 10 pohon."]}>
          <PetaContoh pusat="Bagian" cabang={[{ ikon: "🌳", judul: "Pohon", isi: "2/3 dari 15" }, { ikon: "🦉", judul: "Hasil pohon", isi: "10 pohon" }, { ikon: "🍰", judul: "Kue contoh", isi: "2/15 dari 75" }]} kolom={["Hitung", "Hasil"]} baris={[["2/3 × 15", "10"]]} />
          <KuisSuara id={idKuis("B", 2)} pertanyaan="2/3 kali 30. Sebutkan hasilnya." periksa={jumlahDuaPuluh} petunjuk="Kalikan 2 dengan 30, lalu bagi 3." benar="20." />
          <TulisBebas id={idKuis("B", 3)} judul="Sisa kue" visual={<Papan anak="75 − 10" />} pertanyaan="Tulis kue yang belum dimakan." pesanSalah="Kurangkan kue yang sudah dimakan." bantuan="75 dikurangi 10 sama dengan 65." umpan="65 kue." periksa={jumlahEnamPuluhLima} alias={["65"]} konteks="Tujuh puluh lima dikurangi sepuluh sama dengan 65." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Bagi rata" src="/doodle-mtk/mtk-6-bab1-sub3.jpg" alt="Jus dibagi ke beberapa gelas." kelas={kelas} kelamin={kelamin} penjelasan={["Satu liter dibagi 3 gelas sama dengan 1/3 liter. Setengah dibagi 3 sama dengan 1/6."]}>
          <PetaContoh pusat="Bagi" cabang={[{ ikon: "🥤", judul: "Satu liter", isi: "dibagi 3 = 1/3" }, { ikon: "🥛", judul: "Setengah", isi: "dibagi 3 = 1/6" }, { ikon: "🔁", judul: "Cara hitung", isi: "kali 1 per pembagi" }]} kolom={["Operasi", "Hasil"]} baris={[["1 ÷ 3", "1/3"], ["1/2 ÷ 3", "1/6"]]} />
          <KuisSuara id={idKuis("B", 4)} pertanyaan="2/4 tanah dibagi rata kepada 3 anak. Sebutkan bagian tiap anak." periksa={seperenam} petunjuk="Kalikan 2/4 dengan 1/3, lalu sederhanakan." benar="1/6." />
          <TulisBebas id={idKuis("B", 5)} judul="Lima per delapan" visual={<Papan anak="5/8 ÷ 4" />} pertanyaan="Tulis hasilnya dalam pecahan." pesanSalah="Kalikan 5/8 dengan 1/4." bantuan="5/8 kali 1/4 sama dengan 5/32." umpan="5/32." periksa={limaPerTigaPuluhDua} alias={[]} konteks="Lima per delapan dibagi empat sama dengan lima per tiga puluh dua." />
        </Adegan>
        <Adegan utama judul="Sub-bab 2 — Kebalikan pecahan" src="/doodle-mtk/mtk-6-bab1-sub4.jpg" alt="Banyak gelas kecil di samping botol." kelas={kelas} kelamin={kelamin} penjelasan={["3 dibagi 1/4 sama dengan 12. 3 dibagi 2/5 sama dengan 15/2."]}>
          <PetaContoh pusat="Kebalikan" cabang={[{ ikon: "🥛", judul: "Seperempat", isi: "3 kali 4 = 12" }, { ikon: "➗", judul: "Dua per lima", isi: "3 kali 5/2" }, { ikon: "🦉", judul: "Hasil bagi", isi: "15/2" }]} kolom={["Operasi", "Hasil"]} baris={[["3 ÷ 1/4", "12"], ["3 ÷ 2/5", "15/2"]]} />
          <KuisSuara id={idKuis("B", 6)} pertanyaan="6 kg gula. Tiap bolu 3/4 kg. Sebutkan banyak bolu." periksa={jumlahDelapan} petunjuk="Kalikan 6 dengan kebalikan 3/4." benar="8 bolu." />
          <TulisBebas id={idKuis("B", 7)} judul="Empat liter" visual={<Papan anak="4 ÷ 1/5" />} pertanyaan="Tulis banyak gelas." pesanSalah="Kalikan 4 dengan 5." bantuan="4 kali 5 sama dengan 20." umpan="20 gelas." periksa={jumlahDuaPuluh} alias={["20"]} konteks="Empat dibagi seperlima sama dengan 20 gelas." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Koma" src="/doodle-mtk/mtk-6-bab1-sub5.jpg" alt="Timbangan buah." kelas={kelas} kelamin={kelamin} penjelasan={["1/2 sama dengan 0,5. 1/5 sama dengan 0,2. 1/10 sama dengan 0,1."]}>
          <PetaContoh pusat="Koma" cabang={[{ ikon: "🍊", judul: "Setengah kilo", isi: "0,5 = 0,50" }, { ikon: "🍈", judul: "Seperlima kilo", isi: "0,2 = 0,20" }, { ikon: "⚖️", judul: "Sepersepuluh", isi: "0,1 = 0,10" }]} kolom={["Pecahan", "Desimal"]} baris={[["1/2", "0,5"], ["1/5", "0,2"], ["1/10", "0,1"]]} />
          <KuisSuara id={idKuis("B", 8)} pertanyaan="3/4 menjadi desimal. Sebutkan nilainya." periksa={desimalTigaPerEmpat} petunjuk="Ubah penyebut menjadi 100." benar="0,75." />
          <TulisBebas id={idKuis("B", 9)} judul="Lima empat per lima" visual={<Papan anak="5 4/5" />} pertanyaan="Tulis bentuk desimalnya." pesanSalah="Ubah 4/5 menjadi persepuluhan, lalu tambahkan 5." bantuan="4/5 sama dengan 0,8. 5 ditambah 0,8 sama dengan 5,8." umpan="5,8." periksa={desimalLimaKomaDelapan} alias={[]} konteks="Lima empat per lima sama dengan lima koma delapan." />
        </Adegan>
        <Adegan utama judul="Sub-bab 3 — Bandingkan koma" src="/doodle-mtk/mtk-6-bab1-sub6.jpg" alt="Jalan dengan jarak yang berbeda." kelas={kelas} kelamin={kelamin} penjelasan={["Contoh urutan terdekat: 0,9 lalu 1,9 lalu 2,3 lalu 2,6 lalu 3,6."]}>
          <PetaContoh pusat="Urut" cabang={[{ ikon: "🚶", judul: "Terdekat", isi: "0,9 km" }, { ikon: "🚌", judul: "Terjauh contoh", isi: "3,6 km" }, { ikon: "🌡️", judul: "Suhu tertinggi", isi: "38,5" }]} kolom={["Data", "Nilai"]} baris={[["Terdekat", "0,9"], ["Terjauh", "3,6"]]} />
          <KuisSuara id={idKuis("B", 10)} pertanyaan="2,9 atau 2,49. Sebutkan yang lebih besar." periksa={desimalDuaKomaSembilan} petunjuk="Bandingkan angka persepuluhan." benar="2,9." />
          <TulisBebas id={idKuis("B", 11)} judul="Dua jarak" visual={<Papan anak="1,5 km dan 1,9 km" />} pertanyaan="Tulis jarak yang lebih dekat." pesanSalah="Bandingkan persepuluhan." bantuan="1,5 lebih kecil dari 1,9." umpan="1,5 km." periksa={desimalSatuKomaLima} alias={[]} konteks="Satu koma lima lebih dekat daripada satu koma sembilan." />
        </Adegan>
        <Pilih id={idKuis("B", 12)} pertanyaan="5 dibagi 2/3 sama dengan..." visual={<Papan anak="5 batang · tiap teman 2/3" />} pilihan={[{ huruf: "A", teks: "15/2" }, { huruf: "B", teks: "10/3" }, { huruf: "C", teks: "7/5" }, { huruf: "D", teks: "5/3" }]} benar="A" umpan="5 kali 3/2 sama dengan 15/2." salah="Kalikan dengan kebalikan 2/3." />
        <KuisCocok id={idKuis("B", 13)} perintah="Pasangkan pecahan dengan desimalnya." baris={[{ kiri: "1/2", pilihan: DESIMAL_B, benar: "0,5" }, { kiri: "1/5", pilihan: DESIMAL_B, benar: "0,2" }, { kiri: "1/10", pilihan: DESIMAL_B, benar: "0,1" }]} umpan="0,5, 0,2, dan 0,1." />
        <SusunToken id={idKuis("B", 14)} perintah="Susun suhu dari yang terendah." acak={["36,8", "38,5", "33,3", "36,6"]} benar={["33,3", "36,6", "36,8", "38,5"]} umpan="33,3 lalu 36,6 lalu 36,8 lalu 38,5." />
        <KuisBenarSalah id={idKuis("B", 15)} perintah="Pilih benar atau salah." baris={[{ teks: "2,9 lebih besar dari 2,49.", benar: true }, { teks: "6/5 lebih besar dari 2.", benar: false }, { teks: "3 dibagi 1/4 lebih besar dari 3.", benar: true }]} umpan="Yang pertama dan ketiga benar. 6/5 lebih kecil dari 2." />
        <Pilih id={idKuis("B", 16)} pertanyaan="5 4/5 dalam desimal adalah..." visual={<Papan anak="5 4/5 m²" />} pilihan={[{ huruf: "A", teks: "5,8" }, { huruf: "B", teks: "5,4" }, { huruf: "C", teks: "9,5" }, { huruf: "D", teks: "4,5" }]} benar="A" umpan="4/5 sama dengan 0,8. 5 ditambah 0,8 sama dengan 5,8." salah="Ubah pecahan campurannya menjadi persepuluhan." />
      </div>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK6_BAB1.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🥤🦉" judul={kartu.judul} anak="Sepuluh pos takar" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-6-bab1-permainan.jpg" alt="Sepuluh gelas takar berjajar. Burung hantu bertopi biru memegang stempel. Tiga anak berdiri di awal." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh soal pecahan dan desimal. Pilih satu pos, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK6_BAB1} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK6_BAB1} penutup="Taman sepi. Igil menempelkan stempel takar." bunga="🥤🌿🦉" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK6_BAB1.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Taman Takar" : skor >= 6 ? "🥤 Penjaga Takar" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Kali, bagi, dan komamu tepat." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru takar." : "Ayo kalikan pembilang dan baca koma lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 6 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/doodle-mtk/mtk-6-bab1-evaluasi.jpg" alt="Meja taman dengan kertas kosong dan gelas takar. Burung hantu bertopi biru berdiri di samping." className="mt-4 w-full rounded-xl border border-[#1C01A5]/10 bg-white object-cover" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Empat pita" visual={<Papan anak="4 × 3/4" />} pertanyaan="Tulis panjang seluruhnya dalam meter." pesanSalah="Kalikan 4 dengan 3, lalu bagi 4." bantuan="12 dibagi 4 sama dengan 3." umpan="3 meter." periksa={jumlahTiga} alias={["3"]} konteks="Empat kali tiga per empat sama dengan 3." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. 2/5 kali 630 km. Jarak yang sudah ditempuh..." visual={<Papan anak="2/5 × 630" />} pilihan={[{ huruf: "A", teks: "126 km" }, { huruf: "B", teks: "252 km" }, { huruf: "C", teks: "630 km" }, { huruf: "D", teks: "1.260 km" }]} benar="B" umpan="630 dibagi 5 sama dengan 126. 126 kali 2 sama dengan 252 km." salah="Bagi 630 dengan 5, lalu kalikan 2." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. 1/2 liter dibagi 3 gelas. Sebutkan isi tiap gelas." periksa={seperenam} petunjuk="Kalikan setengah dengan sepertiga." benar="1/6 liter." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. 3/4 kali 100 porsi. Yang sudah selesai..." visual={<Papan anak="3/4 × 100" />} pilihan={[{ huruf: "A", teks: "25" }, { huruf: "B", teks: "50" }, { huruf: "C", teks: "75" }, { huruf: "D", teks: "100" }]} benar="C" umpan="100 dibagi 4 sama dengan 25. 25 kali 3 sama dengan 75." salah="Bagi 100 dengan 4, lalu kalikan 3." />
        <KuisCocok id={idKuis("D", 4)} perintah="5. Pasangkan pembagian dengan hasilnya." baris={[{ kiri: "3 ÷ 1/2", pilihan: HASIL_D, benar: "6 gelas" }, { kiri: "3 ÷ 1/5", pilihan: HASIL_D, benar: "15 gelas" }, { kiri: "6 ÷ 3/4", pilihan: HASIL_D, benar: "8 bolu" }]} umpan="6 gelas, 15 gelas, dan 8 bolu." />
        <TulisBebas id={idKuis("D", 5)} judul="6. Musik" visual={<Papan anak="1/6 × 180" />} pertanyaan="Tulis hasilnya." pesanSalah="Bagi 180 dengan 6." bantuan="180 dibagi 6 sama dengan 30." umpan="30." periksa={jumlahTigaPuluh} alias={["30"]} konteks="Seperenam kali seratus delapan puluh sama dengan 30." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. 50 kg dibagi 2/3 kg sehari. Berapa hari?" visual={<Papan anak="50 ÷ 2/3" />} pilihan={[{ huruf: "A", teks: "75 hari" }, { huruf: "B", teks: "50 hari" }, { huruf: "C", teks: "100 hari" }, { huruf: "D", teks: "25 hari" }]} benar="A" umpan="50 kali 3/2 sama dengan 75 hari." salah="Kalikan 50 dengan kebalikan 2/3." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Mana yang lebih besar, 2,9 atau 2,49?" visual={<Papan anak="2,9 dan 2,49" />} pilihan={[{ huruf: "A", teks: "2,49" }, { huruf: "B", teks: "2,9" }, { huruf: "C", teks: "Sama besar" }, { huruf: "D", teks: "Tidak bisa dibanding" }]} benar="B" umpan="Persepuluhan 9 lebih besar dari 4." salah="Bandingkan angka persepuluhan." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. 1/5 menjadi desimal. Sebutkan nilainya." periksa={desimalSeperlima} petunjuk="Ubah penyebut menjadi 10." benar="0,2." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. Lompatan 3,7 m, 2,9 m, dan 3,6 m. Siapa yang terjauh?" visual={<Papan anak="Arman 3,7 · Bayu 3,6 · Didi 2,9" />} pilihan={[{ huruf: "A", teks: "Arman" }, { huruf: "B", teks: "Bayu" }, { huruf: "C", teks: "Didi" }, { huruf: "D", teks: "Sama jauh" }]} benar="A" umpan="3,7 paling besar. Itu lompatan Arman." salah="Bandingkan 3,7 dengan 3,6 dan 2,9." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk6Bab1({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        gambar={{ src: "/doodle-mtk/mtk-6-bab1-poin.jpg", alt: "Igil dan tiga anak di taman takar memegang gelas takar." }}
        cuplikan={cuplikanKalimat(["Bilangan asli kali pecahan: kalikan pembilang, penyebut tetap.", "Bagi dengan pecahan berarti kali dengan kebalikannya.", "Desimal dibandingkan dari kiri tanda koma."])}
        poin={["a kali b/c sama dengan (a kali b) per c. Contoh: 2 kali 3/5 sama dengan 6/5.", "2/3 kali 15 sama dengan 10.", "Pecahan dibagi bilangan asli sama dengan kali 1 per pembagi. Contoh: 1/2 dibagi 3 sama dengan 1/6.", "Bilangan asli dibagi pecahan sama dengan kali kebalikan pecahan. Contoh: 3 dibagi 1/4 sama dengan 12.", "1/2 sama dengan 0,5 dan 0,50. 1/5 sama dengan 0,2. 1/10 sama dengan 0,1.", "Bandingkan desimal dari kiri koma. 2,9 lebih besar dari 2,49."]}
        penutup="Kalikan pembilang dulu, atau kali dengan kebalikan. Lalu baca komanya dari kiri."
      />
      <section className="space-y-2">
        <p className="text-xl font-black text-[#1C01A5]">Pengayaan</p>
        <p className="text-sm font-semibold leading-relaxed text-slate-700">Buku menandai pecahan kali pecahan sebagai pengayaan. Contohnya 1/2 kali 1/3 sama dengan 1/6. Soal inti bab ini belum memakai perkalian dua pecahan.</p>
      </section>
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
