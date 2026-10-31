"use client";

import { GameDetektor, GameDompet, GameGrafik, GamePutar, GameSensus, GameUrai, GameUrutHarga, SaklarSuaraPermainan } from "@/components/GameMtk5Bab9";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KartuPoinPenting from "@/components/KartuPoinPenting";
import { useKuisMateri } from "@/components/KuisMateriContext";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import TabelInfoGrafis from "@/components/TabelInfoGrafis";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import type { KelaminGuru } from "@/lib/guru";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MISI_MTK5_BAB9, TEMA_MTK5_BAB9 } from "@/lib/misi-mtk-5-bab9";
import { MODUL_MTK5_BAB9 } from "@/lib/modul-resmi-mtk-5-bab9";
import { baca250014, baca390008, jawab402005, jawab5000, lebih681240, tulis205000, tulis406030, tulis406200, tulis520000, tulis608070 } from "@/lib/nilai-mtk-5-bab9";
import type { CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import { useMemo, useState, type ReactNode } from "react";

const ID = MODUL_MTK5_BAB9.id;
const PASANG_EMPAT = ["40.000", "4.000", "400"];
const PASANG_EVAL = ["304.000", "30.400", "3.004"];

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function cuplikanKalimat(kalimat: string[]): CuplikanVoiceMateri[] {
  return kalimat.map((teks, indeks) => ({
    teks,
    jedaSetelahMs: indeks === kalimat.length - 1 ? 0 : 1_200,
  }));
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

const WARNA_DIALOG: Record<string, string> = {
  Saka: "border-amber-300 bg-amber-50",
  Leni: "border-rose-300 bg-rose-50",
  Farhan: "border-teal-300 bg-teal-50",
  Igil: "border-sky-300 bg-sky-50",
};

const WAJAH_DIALOG: Record<string, string> = {
  Saka: "👦",
  Leni: "👧",
  Farhan: "👦",
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
  return <p className="whitespace-pre-wrap rounded-2xl border-2 border-sky-300 bg-sky-50 px-3 py-4 text-center text-xl font-black leading-snug text-[#1C01A5] sm:text-2xl">{anak}</p>;
}

function KepalaKartu({ ikon, judul, anak, kelas, kelamin, cuplikan }: { ikon: string; judul: string; anak?: string; kelas?: string; kelamin?: KelaminGuru; cuplikan?: CuplikanVoiceMateri[] }) {
  return (
    <>
      <p className="text-center text-4xl" aria-hidden>{ikon}</p>
      <h4 className="mt-3 text-center text-lg font-black tracking-wide text-[#1C01A5] sm:text-xl">{judul}</h4>
      {anak ? <p className="mt-1 text-center text-sm font-semibold text-slate-600">{anak}</p> : null}
      {cuplikan && cuplikan.length > 0 ? <div className="mt-3"><TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} /></div> : null}
    </>
  );
}

function Umpan({ status, teks }: { status: StatusJawabanKuis; teks: string }) {
  if (status !== "benar") return null;
  return <p className="mt-2 text-sm font-bold text-emerald-800">{teks}</p>;
}

type JenisPasar = "sungai" | "rak" | "tiket" | "uang" | "pos" | "kartu";

function GambarPasar({ jenis }: { jenis: JenisPasar }) {
  return (
    <svg viewBox="0 0 320 140" className="w-full rounded-2xl bg-sky-100" role="img" aria-label="Pasar Kapal Senja di tepi sungai">
      <rect x="0" y="88" width="320" height="52" fill="#7dd3fc" />
      <path d="M20 96 Q80 78 140 96 T260 90 T320 98 V140 H0 Z" fill="#38bdf8" />
      <rect x="188" y="62" width="70" height="28" rx="6" fill="#fde68a" />
      <polygon points="188,62 223,40 258,62" fill="#f59e0b" />
      <rect x="214" y="74" width="16" height="16" fill="#1C01A5" />
      <rect x="40" y="78" width="86" height="18" rx="8" fill="#0f766e" />
      <polygon points="126,78 150,87 126,96" fill="#0f766e" />
      <circle cx="58" cy="74" r="8" fill="#fcd34d" />
      {jenis === "rak" ? <text x="16" y="28" fill="#1C01A5" fontSize="13" fontWeight="700">Enam rak tiket</text> : null}
      {jenis === "tiket" ? <text x="16" y="28" fill="#1C01A5" fontSize="13" fontWeight="700">Bandingkan harga</text> : null}
      {jenis === "uang" ? <text x="16" y="28" fill="#1C01A5" fontSize="13" fontWeight="700">Susun lembar uang</text> : null}
      {jenis === "pos" ? <text x="16" y="28" fill="#1C01A5" fontSize="13" fontWeight="700">Sepuluh pos</text> : null}
      <circle cx="276" cy="36" r="14" fill="#1C01A5" />
      <circle cx="270" cy="32" r="3" fill="white" />
      <circle cx="282" cy="32" r="3" fill="white" />
      <path d="M270 42 Q276 46 282 42" stroke="white" fill="none" strokeWidth="2" />
    </svg>
  );
}

function Adegan({ judul, jenis, kelas, kelamin, penjelasan, children }: { judul: string; jenis: JenisPasar; kelas?: string; kelamin?: KelaminGuru; penjelasan: string[]; children: ReactNode }) {
  return (
    <section className="space-y-4 border-b-4 border-[#1C01A5] pb-8">
      <p className="text-xl font-black leading-snug text-[#1C01A5]">{judul}</p>
      <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(penjelasan)} />
      <GambarPasar jenis={jenis} />
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KuisSuara({ id, pertanyaan, periksa, petunjuk, benar }: { id: string; pertanyaan: string; periksa: (teks: string) => boolean; petunjuk: string; benar?: string }) {
  const [tepat, setTepat] = useState(false);
  return (
    <div className="mt-3 border-t-2 border-teal-300 pt-3">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]">Kuis suara</p>
      <SoalRekamSuara id={id} pertanyaan={pertanyaan} periksa={periksa} petunjuk={petunjuk} sesudahNilai={(nilai) => setTepat(nilai)} />
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
      {cek ? <div className="mt-3"><HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Cocokkan lagi dengan kuncinya." />{tepat ? <p className="mt-2 text-sm font-bold text-emerald-800">{umpan}</p> : null}</div> : null}
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

function SusunToken({ id, perintah, acak, benar, umpan, pesanSalah }: { id: string; perintah: string; acak: string[]; benar: string[]; umpan: string; pesanSalah: string }) {
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
      <HasilJawabanKuis status={status} pesanSalah={pesanSalah} />
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
                <button key={String(nilai)} type="button" onClick={() => { setPeta((lama) => ({ ...lama, [indeks]: nilai })); setStatus(null); }} className={`rounded-full px-3 py-1 text-sm font-black ${peta[indeks] === nilai ? "bg-[#1C01A5] text-white" : "bg-violet-100 text-[#1C01A5]"}`}>
                  {nilai ? "Benar" : "Salah"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" disabled={!lengkap} onClick={periksa} className="mt-3 rounded-full bg-violet-700 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Periksa pernyataan</button>
      <HasilJawabanKuis status={status} pesanSalah="Baca lagi pernyataannya, lalu pilih ulang." />
      <Umpan status={status} teks={umpan} />
    </article>
  );
}

function RakContoh() {
  const rak = [
    ["Ratus ribuan", "4", "400.000"],
    ["Puluh ribuan", "8", "80.000"],
    ["Ribuan", "6", "6.000"],
    ["Ratusan", "2", "200"],
    ["Puluhan", "7", "70"],
    ["Satuan", "5", "5"],
  ];
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-sky-200 bg-white">
      <p className="px-3 pt-3 text-center text-2xl font-black text-[#1C01A5]">486.275</p>
      <table className="mt-2 w-full text-center text-sm">
        <thead>
          <tr className="text-xs font-black text-sky-800">
            {rak.map((baris) => <th key={baris[0]} className="px-1 py-2">{baris[0]}</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            {rak.map((baris) => <td key={baris[0]} className="px-1 py-2 text-2xl font-black text-[#1C01A5]">{baris[1]}</td>)}
          </tr>
          <tr>
            {rak.map((baris) => <td key={`${baris[0]}-nilai`} className="px-1 pb-3 text-xs font-black text-emerald-700">{baris[2]}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function KartuA({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB9.kartu[0];
  const banding = MODUL_MTK5_BAB9.kartu[1];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="⛵🦉" judul={kartu.judul} anak="Saka, Leni, Farhan, dan Igil" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <SaklarSuaraPermainan />
      <Adegan
        judul="Membaca, menulis, dan nilai tempat sampai 1.000.000"
        jenis="rak"
        kelas={kelas}
        kelamin={kelamin}
        penjelasan={[
          "Bilangan cacah sampai satu juta memakai enam rak.",
          "Titik memisahkan kelompok ribuan.",
          "Baca kelompok kiri, sebut kata ribu, lalu baca kelompok kanan.",
        ]}
      >
        <Dialog nama="Saka" anak="Tiket kapal ini tertulis 486.275. Angkanya panjang sekali, Igil." />
        <Dialog nama="Leni" anak="Ada titik di tengah. Kelompok kiri 486. Kelompok kanan 275." />
        <Dialog nama="Igil" anak="Baca kiri dulu, sebut ribu, lalu baca kanan. Jadinya empat ratus delapan puluh enam ribu dua ratus tujuh puluh lima." />
        <Dialog nama="Farhan" anak="Satu juta ditulis 1.000.000. Angka 1 diikuti enam nol." />
        <Dialog nama="Igil" anak="Nol di tengah tidak selalu disebut. 105.008 dibaca seratus lima ribu delapan." />
        <RakContoh />
        <Dialog nama="Igil" anak="Nama rak disebut nilai tempat. Besar uang pada rak itu disebut nilai angka. Angka 4 berdiri di rak ratus ribuan, jadi nilainya 400.000." />
        <TabelInfoGrafis
          judul="Infografis: enam rak pada 486.275"
          kepala={["Rak", "Angka", "Nilai angka"]}
          baris={[
            ["Ratus ribuan", "4", "400.000"],
            ["Puluh ribuan", "8", "80.000"],
            ["Ribuan", "6", "6.000"],
            ["Ratusan", "2", "200"],
            ["Puluhan", "7", "70"],
            ["Satuan", "5", "5"],
          ]}
          kaki="Nol di tengah tidak selalu diucapkan. 1.000.000 dibaca satu juta."
        />
        <GameSensus />
        <GamePutar />
        <GameDetektor />
        <KuisSuara id={idKuis("A", 0)} pertanyaan="Bacalah bilangan 250.014." periksa={baca250014} petunjuk="Baca kelompok kiri, sebut ribu, lalu baca kelompok kanan." benar="Dua ratus lima puluh ribu empat belas." />
        <TulisBebas id={idKuis("A", 1)} judul="Menulis bilangan" pertanyaan="Tuliskan angka untuk: empat ratus enam ribu tiga puluh." pesanSalah="Pakai titik ribuan. Rak yang kosong ditulis 0." bantuan="Enam rak: 4, 0, 6, lalu 0, 3, 0." umpan="406.030" periksa={tulis406030} alias={["406030", "406.030"]} konteks="Empat ratus enam ribu tiga puluh ditulis 406.030." />
        <Pilih id={idKuis("A", 2)} pertanyaan="Nilai angka 3 pada 739.254 adalah..." pilihan={[{ huruf: "A", teks: "3" }, { huruf: "B", teks: "300" }, { huruf: "C", teks: "3.000" }, { huruf: "D", teks: "30.000" }]} benar="D" umpan="Angka 3 berdiri di rak puluh ribuan. Nilainya 30.000." salah="Hitung dari kiri: 7, 3, 9, 2, 5, 4. Rak kedua adalah puluh ribuan." />
        <Pilih id={idKuis("A", 3)} pertanyaan="Angka 9 pada 902.180 menempati rak..." pilihan={[{ huruf: "A", teks: "satuan" }, { huruf: "B", teks: "puluh ribuan" }, { huruf: "C", teks: "ratus ribuan" }, { huruf: "D", teks: "ribuan" }]} benar="C" umpan="Angka paling kiri pada bilangan enam rak adalah ratus ribuan." salah="Rak paling kiri untuk bilangan sampai 999.999 adalah ratus ribuan." />
        <KuisCocok
          id={idKuis("A", 4)}
          perintah="Pasangkan angka 4 dengan nilai angkanya."
          baris={[
            { kiri: "4 pada 140.000", pilihan: PASANG_EMPAT, benar: "40.000" },
            { kiri: "4 pada 14.000", pilihan: PASANG_EMPAT, benar: "4.000" },
            { kiri: "4 pada 1.400", pilihan: PASANG_EMPAT, benar: "400" },
          ]}
          umpan="Rak puluh ribuan bernilai 40.000, rak ribuan bernilai 4.000, dan rak ratusan bernilai 400."
        />
        <SusunToken
          id={idKuis("A", 5)}
          perintah="Susun cara membaca bilangan yang ada titik ribuannya."
          acak={["Baca tiga angka kanan", "Lihat tiga angka kiri", "Sebut kata ribu"]}
          benar={["Lihat tiga angka kiri", "Sebut kata ribu", "Baca tiga angka kanan"]}
          umpan="Kiri dulu, sebut ribu, baru kanan."
          pesanSalah="Mulai dari kelompok di kiri titik."
        />
      </Adegan>
      <Adegan
        judul="Mengurutkan dan membandingkan sampai 1.000.000"
        jenis="tiket"
        kelas={kelas}
        kelamin={kelamin}
        penjelasan={banding.voice[0] ?? []}
      >
        <Dialog nama="Leni" anak="Ada dua tiket. Satu 320.000. Satu lagi 280.000. Mana yang lebih mahal?" />
        <Dialog nama="Saka" anak="Aku lihat rak paling kiri. 3 lebih besar daripada 2. Jadi 320.000 lebih mahal." />
        <Dialog nama="Igil" anak="Kalau rak kiri sama, geser ke kanan sampai ada angka yang berbeda. Kalau semua rak sama, dua bilangan itu sama besar." />
        <Papan anak={"320.000  >  280.000"} />
        <TabelInfoGrafis
          judul="Infografis: membandingkan dari kiri"
          kepala={["Langkah", "Yang dicek", "Keputusan"]}
          baris={[
            ["1", "Ratus ribuan", "Angka lebih besar menang"],
            ["2", "Puluh ribuan", "Geser ke sini jika kiri sama"],
            ["3", "Ribuan sampai satuan", "Lanjut sampai ada yang beda"],
            ["4", "Semua rak sama", "Dua bilangan sama besar"],
          ]}
          kaki="Contoh yang sudah dihitung: 320.000 lebih besar daripada 280.000."
        />
        <GameUrutHarga />
        <GameGrafik />
        <KuisSuara id={idKuis("B", 0)} pertanyaan="Mana yang lebih besar, 681.240 atau 618.240?" periksa={lebih681240} petunjuk="Rak ratus ribuan sama. Geser ke rak puluh ribuan." benar="681.240 lebih besar karena 8 lebih besar daripada 1." />
        <TulisBebas id={idKuis("B", 1)} judul="Bilangan tengah" visual={<Papan anak="200.500    205.000    250.000" />} pertanyaan="Tuliskan bilangan yang ada di tengah jika diurutkan dari yang terkecil." pesanSalah="Bandingkan rak ratus ribuan dulu, lalu puluh ribuan." bantuan="Yang terkecil 200.500. Yang terbesar 250.000." umpan="205.000" periksa={tulis205000} alias={["205000", "205.000"]} konteks="Bilangan tengahnya 205.000." />
        <Pilih id={idKuis("B", 2)} pertanyaan="734.090 ... 734.900. Tanda yang tepat adalah..." pilihan={[{ huruf: "A", teks: "lebih besar" }, { huruf: "B", teks: "lebih kecil" }, { huruf: "C", teks: "sama dengan" }, { huruf: "D", teks: "tidak bisa dibanding" }]} benar="B" umpan="Rak ratusan 0 lebih kecil daripada 9. Jadi 734.090 lebih kecil." salah="Tiga rak kiri sama. Lihat rak ratusan." />
        <Pilih id={idKuis("B", 3)} pertanyaan="Urutan dari yang termurah ke yang termahal untuk 190.000, 901.000, dan 109.000 adalah..." pilihan={[{ huruf: "A", teks: "901.000, 190.000, 109.000" }, { huruf: "B", teks: "109.000, 190.000, 901.000" }, { huruf: "C", teks: "190.000, 109.000, 901.000" }, { huruf: "D", teks: "109.000, 901.000, 190.000" }]} benar="B" umpan="1 lebih kecil daripada 9 pada rak ratus ribuan. Lalu 109.000 lebih kecil daripada 190.000." salah="Mulai dari rak paling kiri." />
      </Adegan>
      <Adegan
        judul="Komposisi dan dekomposisi sampai 1.000.000"
        jenis="uang"
        kelas={kelas}
        kelamin={kelamin}
        penjelasan={[
          "Menyusun berarti menjumlahkan nilai setiap lembar.",
          "Mengurai berarti memecah bilangan ke raknya.",
          "Rak yang kosong tetap nol dan tidak menambah jumlah.",
        ]}
      >
        <Dialog nama="Farhan" anak="Aku punya 2 lembar seratus ribuan, 3 lembar sepuluh ribuan, dan 4 lembar seribuan." />
        <Dialog nama="Leni" anak="200.000 ditambah 30.000 ditambah 4.000. Jumlahnya 234.000." />
        <Dialog nama="Igil" anak="234.000 juga bisa diurai: 2 ratus ribuan, 3 puluh ribuan, dan 4 ribuan." />
        <Papan anak={"2 × 100.000 + 3 × 10.000 + 4 × 1.000 = 234.000"} />
        <TabelInfoGrafis
          judul="Infografis: susun dan urai 234.000"
          kepala={["Lembar", "Banyak", "Jumlah"]}
          baris={[
            ["100.000", "2", "200.000"],
            ["10.000", "3", "30.000"],
            ["1.000", "4", "4.000"],
            ["Uraian rak", "2, 3, dan 4", "234.000"],
          ]}
          kaki="Satu bilangan bisa disusun dengan banyak cara. Uraian rak adalah cara yang paling rapi."
        />
        <GameDompet />
        <GameUrai />
        <KuisSuara id={idKuis("B", 4)} pertanyaan="Berapa jumlah 4 ratus ribuan, 2 ribuan, dan 5 satuan?" periksa={jawab402005} petunjuk="Jumlahkan nilai setiap rak. Rak yang tidak disebut tetap nol." benar="402.005." />
        <TulisBebas id={idKuis("B", 5)} judul="Menyusun lembar" pertanyaan="5 lembar seratus ribuan dan 2 lembar sepuluh ribuan. Tuliskan jumlahnya." pesanSalah="Kalikan dulu, lalu jumlahkan." bantuan="5 kali 100.000, lalu tambah 2 kali 10.000." umpan="520.000" periksa={tulis520000} alias={["520000", "520.000"]} konteks="Jumlahnya 520.000." />
        <Pilih id={idKuis("B", 6)} pertanyaan="Uraian yang tepat untuk 810.006 adalah..." pilihan={[{ huruf: "A", teks: "8 ratus ribuan, 1 puluh ribuan, dan 6 satuan" }, { huruf: "B", teks: "8 puluh ribuan, 1 ribuan, dan 6 ratusan" }, { huruf: "C", teks: "8 ratusan, 1 puluhan, dan 6 satuan" }, { huruf: "D", teks: "81 ratus ribuan dan 6 puluhan" }]} benar="A" umpan="Rak kosong tetap nol. Yang berisi hanya ratus ribuan, puluh ribuan, dan satuan." salah="Lihat posisi 8, 1, dan 6 dari kiri." />
        <KuisBenarSalah
          id={idKuis("B", 7)}
          perintah="Pilih benar atau salah."
          baris={[
            { teks: "450.200 lebih besar daripada 450.020.", benar: true },
            { teks: "3 ratus ribuan ditambah 4 puluhan sama dengan 300.040.", benar: true },
            { teks: "999.999 lebih besar daripada 1.000.000.", benar: false },
          ]}
          umpan="450.200 menang di rak ratusan. 300.000 ditambah 40 tetap 300.040. Satu juta lebih besar daripada 999.999."
        />
      </Adegan>
    </KartuBingkai>
  );
}

function KartuC({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK5_BAB9.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu ikon="🎫🦉" judul={kartu.judul} anak="Sepuluh soal pola" kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarPasar jenis="pos" />
      <p className="mt-3 text-center text-sm font-semibold text-slate-600">Sepuluh pos. Pilih satu, lalu jawab.</p>
      <div className="mt-4">
        <MisiPenjagaKebun misi={MISI_MTK5_BAB9} idMisi={(indeks) => idKuis("C", indeks)} idTulis={idKuisTulisKartu(ID, "C")} tema={TEMA_MTK5_BAB9} penutup="Bendera pasar berkibar. Igil menempelkan cap tiket." bunga="🎫🦉⛵" />
      </div>
    </KartuBingkai>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const kartu = MODUL_MTK5_BAB9.kartu[3];
  const nama = useMemo(() => bacaProgres().profil.nama.trim() || "Siswa", []);
  const skor = useMemo(() => {
    let jumlahSkor = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlahSkor += 1;
    }
    return jumlahSkor;
  }, [kuis]);
  const lencana = skor >= 9 ? "🥇 Juru Tiket Senja" : skor >= 6 ? "⛵ Penjaga Pasar" : "🦉 Sahabat Igil";
  const pesan = skor >= 9 ? "Hebat! Enam rakmu rapi." : skor >= 6 ? "Bagus! Sedikit lagi jadi juru tiket." : "Ayo cek lagi bersama Igil. Kamu pasti bisa.";
  return (
    <KartuBingkai>
      <KepalaKartu ikon="📝🦉" judul={kartu.judul} anak={`${nama} · Kelas 5 · ${skor} dari 10`} kelas={kelas} kelamin={kelamin} cuplikan={cuplikanKalimat(kartu.voice[0] ?? [])} />
      <GambarPasar jenis="kartu" />
      <p className="mt-4 text-center text-sm font-black text-[#1C01A5]">{lencana} · {pesan}</p>
      <div className="mt-4 space-y-3">
        <TulisBebas id={idKuis("D", 0)} judul="1. Menulis" pertanyaan="Tuliskan angka untuk: enam ratus delapan ribu tujuh puluh." pesanSalah="Pakai enam rak. Rak kosong ditulis 0." bantuan="Enam, nol, delapan, lalu nol, tujuh, nol." umpan="608.070" periksa={tulis608070} alias={["608070", "608.070"]} konteks="Enam ratus delapan ribu tujuh puluh ditulis 608.070." />
        <Pilih id={idKuis("D", 1)} pertanyaan="2. Nilai angka 2 pada 120.450 adalah..." pilihan={[{ huruf: "A", teks: "2" }, { huruf: "B", teks: "200" }, { huruf: "C", teks: "2.000" }, { huruf: "D", teks: "20.000" }]} benar="D" umpan="Angka 2 berdiri di rak puluh ribuan. Nilainya 20.000." salah="Hitung rak dari kiri." />
        <KuisSuara id={idKuis("D", 2)} pertanyaan="3. Bacalah 390.008." periksa={baca390008} petunjuk="Baca kelompok kiri, sebut ribu, lalu angka di kanan." benar="Tiga ratus sembilan puluh ribu delapan." />
        <Pilih id={idKuis("D", 3)} pertanyaan="4. Bilangan yang paling besar adalah..." pilihan={[{ huruf: "A", teks: "567.890" }, { huruf: "B", teks: "576.890" }, { huruf: "C", teks: "567.980" }, { huruf: "D", teks: "566.999" }]} benar="B" umpan="Rak ratus ribuan sama. Puluh ribuan 7 paling besar, jadi 576.890 menang." salah="Geser ke rak puluh ribuan." />
        <KuisCocok
          id={idKuis("D", 4)}
          perintah="5. Pasangkan susunan dengan jumlahnya."
          baris={[
            { kiri: "3 ratus ribuan + 4 ribuan", pilihan: PASANG_EVAL, benar: "304.000" },
            { kiri: "3 puluh ribuan + 4 ratusan", pilihan: PASANG_EVAL, benar: "30.400" },
            { kiri: "3 ribuan + 4 satuan", pilihan: PASANG_EVAL, benar: "3.004" },
          ]}
          umpan="304.000, 30.400, dan 3.004."
        />
        <TulisBebas id={idKuis("D", 5)} judul="6. Menyusun uang" pertanyaan="4 lembar seratus ribuan, 6 lembar seribuan, dan 2 lembar seratusan. Tuliskan jumlahnya." pesanSalah="Kalikan tiap lembar, lalu jumlahkan." bantuan="400.000 ditambah 6.000 ditambah 200." umpan="406.200" periksa={tulis406200} alias={["406200", "406.200"]} konteks="Jumlahnya 406.200." />
        <Pilih id={idKuis("D", 6)} pertanyaan="7. 880.010 dibanding 880.100 adalah..." pilihan={[{ huruf: "A", teks: "lebih besar" }, { huruf: "B", teks: "lebih kecil" }, { huruf: "C", teks: "sama dengan" }, { huruf: "D", teks: "tidak ada tandanya" }]} benar="B" umpan="Tiga rak kiri sama. Rak ratusan 0 lebih kecil daripada 1." salah="Lihat rak ratusan." />
        <Pilih id={idKuis("D", 7)} pertanyaan="8. Urutan dari yang terbesar untuk 201.000, 120.000, dan 210.000 adalah..." pilihan={[{ huruf: "A", teks: "120.000, 201.000, 210.000" }, { huruf: "B", teks: "210.000, 201.000, 120.000" }, { huruf: "C", teks: "210.000, 120.000, 201.000" }, { huruf: "D", teks: "201.000, 210.000, 120.000" }]} benar="B" umpan="210.000 paling besar. Lalu 201.000. Yang terkecil 120.000." salah="Mulai dari rak paling kiri, lalu susun menurun." />
        <KuisSuara id={idKuis("D", 8)} pertanyaan="9. Berapa nilai angka 5 pada 75.000?" periksa={jawab5000} petunjuk="Lihat rak tempat angka 5 berdiri." benar="Lima ribu." />
        <Pilih id={idKuis("D", 9)} pertanyaan="10. 900.045 disusun dari..." pilihan={[{ huruf: "A", teks: "9 ratus ribuan dan 45 satuan" }, { huruf: "B", teks: "9 puluh ribuan dan 45 ratusan" }, { huruf: "C", teks: "90 ratus ribuan dan 45 puluhan" }, { huruf: "D", teks: "9 ribuan dan 45 puluhan" }]} benar="A" umpan="900.000 dari rak ratus ribuan. 45 dari puluhan dan satuan." salah="Pecah dari kiri. Empat puluhan dan lima satuan menjadi 45." />
        <p className="text-center text-sm font-black text-[#1C01A5]">{lencana} · {skor} bintang dari 10</p>
      </div>
    </KartuBingkai>
  );
}

export default function NaskahMtk5Bab9({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuC kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <GambarPasar jenis="sungai" />
      <KartuPoinPenting
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanKalimat([
          "Sampai satu juta ada enam rak. Titik memisahkan ribuan.",
          "Bandingkan dari rak paling kiri.",
          "Menyusun menjumlahkan lembar. Mengurai memecah ke rak.",
        ])}
        poin={[
          "Bilangan cacah sampai 1.000.000 memakai enam rak: satuan, puluhan, ratusan, ribuan, puluh ribuan, dan ratus ribuan. 1.000.000 dibaca satu juta.",
          "Titik diletakkan setiap tiga angka dari kanan. 486.275 dibaca empat ratus delapan puluh enam ribu dua ratus tujuh puluh lima.",
          "Nilai tempat adalah nama rak. Nilai angka adalah besarnya. Angka 4 pada 486.275 bernilai 400.000.",
          "Perbandingan mulai dari rak kiri. 320.000 lebih besar daripada 280.000 karena 3 lebih besar daripada 2. Jika semua rak sama, dua bilangan sama besar.",
          "Komposisi menyusun bilangan. 2 lembar 100.000, 3 lembar 10.000, dan 4 lembar 1.000 menjadi 234.000.",
          "Dekomposisi mengurai bilangan. 234.000 adalah 2 ratus ribuan, 3 puluh ribuan, dan 4 ribuan. Rak nol tidak menambah jumlah.",
        ]}
        penutup="Baca kiri dulu, bandingkan dari kiri, lalu cek setiap rak."
      />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
