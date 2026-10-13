"use client";
import MisiPenjagaKebun from "@/components/MisiPenjagaKebun";
import { MISI_MTK1_BAB4 } from "@/lib/misi-kebun-mtk-1";
import { TEMA_MTK1_BAB4 } from "@/lib/tema-misi-mtk-1";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import HasilJawabanKuis from "@/components/HasilJawabanKuis";
import KuisAkhirAdegan from "@/components/KuisAkhirAdegan";
import KuisTulisKartu from "@/components/KuisTulisKartu";
import SoalRekamSuara from "@/components/SoalRekamSuara";
import GambarCerita from "@/components/GambarCerita";
import TombolVoiceMateriPai1 from "@/components/TombolVoiceMateriPai1";
import WritingCanvas from "@/components/WritingCanvas";
import { useKuisMateri } from "@/components/KuisMateriContext";
import { SLOT_AJUAN_SEBELUM_KARTU_D } from "@/components/NaskahMtk2Bab1";
import { kelasTombolHasilKuis, statusDariPilihan, type StatusJawabanKuis } from "@/lib/hasil-kuis";
import { idKuisKartuResmi, idKuisTulisKartu } from "@/lib/kuis-materi";
import { MODUL_MTK1_BAB4 } from "@/lib/modul-resmi-mtk-1-bab4";
import { jawabanTulisMemuatAlias } from "@/lib/nilai-kuis-tulis";
import { cuplikanDariNaskah, type CuplikanVoiceMateri } from "@/lib/naskah-voice-pai-1-bab2";
import { bacaProgres } from "@/lib/progres";
import type { KelaminGuru } from "@/lib/guru";

const ID = MODUL_MTK1_BAB4.id;

function idKuis(kode: string, indeks: number): string {
  return idKuisKartuResmi(ID, kode, indeks);
}

function ucapanMemuat(transkrip: string, kelompok: string[][]): boolean {
  return kelompok.every((alias) => jawabanTulisMemuatAlias(transkrip, alias));
}

function KartuBingkai({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border-4 border-[#1C01A5]/15 bg-white px-4 py-5 shadow-sm sm:px-6 sm:py-6">
      {children}
    </section>
  );
}

const WARNA_DIALOG: Record<string, string> = {
  Sasa: "border-[#DB2777]/20 bg-[#FDF2F8]",
  Bimo: "border-[#2563EB]/20 bg-[#EFF6FF]",
  "Nenek Ani": "border-[#F0AB00] bg-[#FFF8E8]",
  "Sasa dan Bimo": "border-[#16A34A]/25 bg-[#F0FDF4]",
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

function IkonUlang({ ikon, jumlah, ukuran = "text-2xl" }: { ikon: string; jumlah: number; ukuran?: string }) {
  return (
    <span className={`${ukuran} leading-relaxed tracking-tight`} aria-hidden>
      {Array.from({ length: jumlah }, () => ikon).join(" ")}
    </span>
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
      {anak ? <p className="mt-1 text-center text-sm font-bold text-[#1C01A5]/70">{anak}</p> : null}
      <div className="mt-4">
        <TombolVoiceMateriPai1 kelas={kelas} kelamin={kelamin} cuplikan={cuplikan} />
      </div>
    </>
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
      <p className="mt-1 text-xs font-semibold text-amber-900">Ketuk benda, lalu ketuk bentuknya.</p>
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
          <HasilJawabanKuis status={tepat ? "benar" : "salah"} pesanSalah="Lihat lagi sisi bendanya, lalu pasangkan." />
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
  sesudahBenar,
}: {
  id: string;
  judul?: string;
  visual?: ReactNode;
  pertanyaan: string;
  pesanSalah: string;
  umpan: string;
  periksa: (teks: string) => boolean;
  sesudahBenar?: () => void;
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
          body: JSON.stringify({
            pertanyaan,
            konteks: umpan,
            alias: [],
            jawaban: data,
          }),
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
        const ok = json.benar === true || (bacaan.length > 0 && periksa(bacaan));
        if (bacaan) setCuplikan(bacaan);
        setStatus(ok ? "benar" : "salah");
        if (ok) {
          kuis?.tandaiBenar(id);
          sesudahBenar?.();
        }
      } catch {
        setStatus(null);
        setCuplikan("Gagal menilai. Kirim lagi.");
      }
      return;
    }
    setCuplikan(data.trim());
    const ok = periksa(data);
    setStatus(ok ? "benar" : "salah");
    if (ok) {
      kuis?.tandaiBenar(id);
      sesudahBenar?.();
    }
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
  const kartu = MODUL_MTK1_BAB4.kartu[0];
  const [suara, setSuara] = useState<StatusJawabanKuis>(null);
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🏠🔺🔍"
        judul={kartu.judul}
        anak="Mengenal Bentuk"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <div className="mt-4 rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
        <p className="text-sm font-black text-[#1C01A5]">Tujuan Pembelajaran</p>
        <p className="mt-2 text-sm font-semibold text-slate-700">Setelah belajar, siswa dapat:</p>
        <ul className="daftar-tujuan mt-2 space-y-1 text-sm font-semibold text-slate-700">
          <li>Mengamati benda di sekitarnya.</li>
          <li>Mengenali dan menamai segitiga, segi empat, dan lingkaran.</li>
          <li>Mengenali dan menamai kubus dan balok.</li>
        </ul>
      </div>
      <div className="mt-4 space-y-3">
        <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#92400E]">Adegan 1 · Teras rumah Nenek</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab4-adegan-1.jpg"
            alt="Rumah Nenek Ani beratap segitiga. Matahari bulat. Sasa dan Bimo berdiri di teras."
          />
          <p className="mt-2 text-center text-4xl" aria-hidden>
            🏠 ☀️
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Rumah kuning, atap segitiga merah, dan matahari bulat.</p>
        </article>
        <Dialog nama="Nenek Ani" anak="Halo, Sasa! Halo, Bimo! Hari ini kita main detektif bentuk, yuk!" />
        <Dialog nama="Sasa" anak="Asyik! Apa itu bentuk, Nek?" />
        <Dialog nama="Nenek Ani" anak="Lihat atap rumah Nenek. Bentuknya apa?" />
        <Dialog nama="Bimo" anak="Ujungnya lancip! Sisinya ada 1, 2, 3!" />
        <Dialog nama="Nenek Ani" anak="Pintar! Itu namanya segitiga. Sisinya 3, sudutnya juga 3." />
        <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
          <p className="text-xs font-black uppercase text-[#9F1239]">Atap segitiga</p>
          <GambarCerita src="/doodle-mtk/mtk-1-bab4-atap.jpg" alt="Atap rumah berbentuk segitiga dengan 3 sudut." />
          <p className="mt-2 text-center text-4xl" aria-hidden>
            🔺
          </p>
          <p className="text-center text-sm font-black text-[#1C01A5]">3 sisi · 3 sudut</p>
        </article>
        <KuisAkhirAdegan
          idSuara={idKuis("A", 1)}
          idKanvas={idKuis("A", 2)}
          pertanyaanSuara="Atap rumah Nenek bentuknya apa?"
          aliasSuara={["segitiga"]}
          petunjukSuara="Sebutkan nama bentuknya."
          pertanyaanKanvas="Atap itu punya berapa sisi? Tuliskan angkanya."
          aliasKanvas={["3", "tiga"]}
          konteksKanvas="Atap segitiga punya 3 sisi."
        />
        <article className="rounded-2xl border-2 border-[#0284C7]/25 bg-[#F0F9FF] px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#0C4A6E]">Adegan 2 · Ruang tamu</p>
          <GambarCerita
            src="/doodle-mtk/mtk-1-bab4-adegan-2.jpg"
            alt="Jam dinding bulat, pintu persegi panjang, dan bingkai foto persegi."
          />
          <p className="mt-2 text-center text-4xl" aria-hidden>
            ⏰ 🚪 🖼️
          </p>
        </article>
        <Dialog nama="Sasa" anak="Nek, jam dinding itu bulat! Tidak ada pojoknya." />
        <Dialog nama="Nenek Ani" anak="Betul! Itu lingkaran. Tidak punya sudut, bisa menggelinding." />
        <Dialog nama="Bimo" anak="Kalau bingkai foto ini, sisinya ada 4. Panjangnya sama semua!" />
        <Dialog nama="Nenek Ani" anak="Hebat! Itu persegi." />
        <Dialog nama="Sasa" anak="Pintu juga sisinya 4, tapi ada yang panjang, ada yang pendek." />
        <Dialog nama="Nenek Ani" anak="Itu persegi panjang. Persegi dan persegi panjang sama-sama segi empat." />
        <KuisAkhirAdegan
          idSuara={idKuis("A", 3)}
          idKanvas={idKuis("A", 4)}
          pertanyaanSuara="Bingkai foto sisinya sama semua. Bentuknya apa?"
          aliasSuara={["persegi"]}
          petunjukSuara="Sebutkan nama bentuknya."
          pertanyaanKanvas="Pintu punya berapa sisi? Tuliskan angkanya."
          aliasKanvas={["4", "empat"]}
          konteksKanvas="Pintu persegi panjang punya 4 sisi."
        />
        <article className="rounded-2xl border-2 border-[#7C3AED]/25 bg-[#F5F3FF] px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-[#5B21B6]">Adegan 3 · Dapur</p>
          <GambarCerita src="/doodle-mtk/mtk-1-bab4-adegan-3.jpg" alt="Dadu berbentuk kubus dan kotak susu berbentuk balok." />
          <p className="mt-2 text-center text-4xl" aria-hidden>
            🎲 🧃
          </p>
        </article>
        <Dialog nama="Bimo" anak="Nek, dadu ini bisa dipegang. Tebal!" />
        <Dialog nama="Nenek Ani" anak="Benar. Dadu itu kubus. Semua sisinya persegi yang sama besar." />
        <Dialog nama="Sasa" anak="Kalau kotak susu? Bentuknya lebih panjang." />
        <Dialog nama="Nenek Ani" anak="Itu balok. Sisinya ada yang persegi panjang." />
        <Dialog nama="Sasa dan Bimo" anak="Yeay! Kita detektif bentuk!" />
        <p className="rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">
          Lencana: Detektif Bentuk Datar dan Detektif Bangun Ruang.
        </p>
        <KuisAkhirAdegan
          idSuara={idKuis("A", 5)}
          idKanvas={idKuis("A", 6)}
          pertanyaanSuara="Dadu bentuknya apa?"
          aliasSuara={["kubus"]}
          petunjukSuara="Sebutkan nama bentuknya."
          pertanyaanKanvas="Kotak susu bentuknya apa? Tuliskan namanya."
          aliasKanvas={["balok"]}
          konteksKanvas="Kotak susu berbentuk balok."
        />
      </div>
      <div className="mt-6 border-t-2 border-[#1C01A5]/10 pt-5">
        <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
        <p className="text-center text-4xl" aria-hidden>
          ⏰
        </p>
        <SoalRekamSuara
          id={idKuis("A", 0)}
          pertanyaan="Sasa melihat jam dinding di rumah Nenek. Jam itu bentuknya apa? Ayo sebutkan!"
          periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["lingkaran", "bulat"])}
          petunjuk="Sebutkan nama bentuknya."
          sesudahNilai={(benar) => setSuara(benar ? "benar" : "salah")}
        />
        {suara === "benar" ? <p className="mt-2 text-sm font-bold text-emerald-800">⏰ Jamnya tersenyum. Bentuknya lingkaran.</p> : null}
        {suara === "salah" ? (
          <p className="mt-2 text-sm font-bold text-rose-800">Bentuknya bulat dan tidak punya sudut.</p>
        ) : null}
      </div>
      <div className="mt-4">
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "A")}
          pertanyaan="Gambarlah atap rumah Nenek, lalu tulis nama bentuknya. Bentuk itu punya 3 sisi."
          alias={["segitiga", "3 sisi", "tiga sisi"]}
          konteks="Atap rumah berbentuk segitiga dengan 3 sisi yang bertemu."
          visual={<p className="text-center text-4xl">🏠</p>}
        />
      </div>
    </KartuBingkai>
  );
}

function KartuB({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB4.kartu[1];
  const bentuk = ["Segitiga", "Lingkaran", "Kubus", "Balok"];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🔺🟦⚪"
        judul={kartu.judul}
        anak="Infografis: Kenalan dengan Keluarga Bentuk"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">Bentuk datar · pipih seperti kertas</p>
      <div className="mt-3 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
          <span>Bentuk</span>
          <span>Sisi dan sudut</span>
          <span>Contoh</span>
        </div>
        {[
          ["🔺 Segitiga", "3 sisi, 3 sudut", "Atap, semangka"],
          ["🟦 Segi empat", "4 sisi, 4 sudut", "Buku, pintu, papan tulis"],
          ["⚪ Lingkaran", "0 sudut, bulat", "Koin, roda, piring"],
        ].map((baris, i) => (
          <div
            key={baris[0]}
            className={`grid grid-cols-3 items-center border-t border-[#F0AB00]/40 px-3 py-2 text-sm font-bold ${
              i % 2 === 0 ? "bg-[#FFF7ED]" : "bg-[#F0FDF4]"
            }`}
          >
            <span>{baris[0]}</span>
            <span>{baris[1]}</span>
            <span>{baris[2]}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm font-black uppercase tracking-wide text-[#1C01A5]/70">Bangun ruang · tebal, bisa dipegang</p>
      <div className="mt-3 overflow-hidden rounded-2xl border-4 border-[#F0AB00]">
        <div className="grid grid-cols-3 bg-[#1C01A5] px-3 py-2 text-[10px] font-black uppercase text-white sm:text-xs">
          <span>Bentuk</span>
          <span>Ciri</span>
          <span>Contoh</span>
        </div>
        {[
          ["🧊 Kubus", "6 sisi, semua persegi sama", "Dadu, rubik"],
          ["📦 Balok", "6 sisi, ada persegi panjang", "Kotak susu, lemari, bata"],
        ].map((baris, i) => (
          <div
            key={baris[0]}
            className={`grid grid-cols-3 items-center border-t border-[#F0AB00]/40 px-3 py-2 text-sm font-bold ${
              i % 2 === 0 ? "bg-[#F5F3FF]" : "bg-[#F0F9FF]"
            }`}
          >
            <span>{baris[0]}</span>
            <span>{baris[1]}</span>
            <span>{baris[2]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        <article className="rounded-2xl border-2 border-[#E23B3B]/25 bg-[#FFF1F2] px-4 py-3">
          <p className="text-sm font-black text-[#9F1239]">Menghitung sisi</p>
          <p className="mt-2 text-center text-4xl" aria-hidden>
            🔺
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Sentuh sisi segitiga satu per satu: 1, 2, 3. Segitiga = 3 sisi.</p>
        </article>
        <article className="rounded-2xl border-2 border-[#0284C7]/25 bg-[#F0F9FF] px-4 py-3">
          <p className="text-sm font-black text-[#0C4A6E]">Menjumlahkan sisi</p>
          <p className="mt-2 text-center text-3xl" aria-hidden>
            🔺 + 🟦
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">1 segitiga dan 1 persegi. Sisi segitiga 3, sisi persegi 4. 3 + 4 = 7.</p>
        </article>
        <article className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] px-4 py-3">
          <p className="text-sm font-black text-[#92400E]">Menghitung benda</p>
          <p className="mt-2 text-center text-3xl" aria-hidden>
            🎲 🎲 📦 ⚽ 🧃
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Di meja ada dua dadu, satu kardus, satu bola, dan satu kotak susu. Kubusnya dua, yaitu kedua dadu.</p>
        </article>
        <article className="rounded-2xl border-2 border-[#7C3AED]/25 bg-[#F5F3FF] px-4 py-3">
          <p className="text-sm font-black text-[#5B21B6]">Menghitung sudut</p>
          <p className="mt-2 text-center text-3xl" aria-hidden>
            🟦 🟦
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">2 persegi. Sudutnya 4 + 4 = 8.</p>
        </article>
        <article className="rounded-2xl border-2 border-[#0F766E] bg-[#F0FDFA] px-4 py-4">
          <p className="text-sm font-black text-[#0F766E]">Rumus cepat</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Segitiga 3, segi empat 4, lingkaran 0 sudut, kubus dan balok 6 sisi.</p>
        </article>
      </div>
      <div className="mt-4 grid gap-3">
        <KuisCocok
          id={idKuis("B", 0)}
          perintah="Tarik garis dari benda ke bentuknya!"
          baris={[
            { kiri: "🍕 Potongan pizza", pilihan: bentuk, benar: "Segitiga" },
            { kiri: "🪙 Koin", pilihan: bentuk, benar: "Lingkaran" },
            { kiri: "🎲 Dadu", pilihan: bentuk, benar: "Kubus" },
            { kiri: "🧃 Kotak susu", pilihan: bentuk, benar: "Balok" },
          ]}
          umpan="Pizza segitiga, koin lingkaran, dadu kubus, kotak susu balok."
        />
        <Pilih
          id={idKuis("B", 1)}
          pertanyaan="Bentuk apa yang berikutnya?"
          visual={<p>🔺 ⚪ 🟦 🔺 ⚪ 🟦 🔺 ⚪ ❓</p>}
          pilihan={[
            { huruf: "A", teks: "🔺 Segitiga" },
            { huruf: "B", teks: "⚪ Lingkaran" },
            { huruf: "C", teks: "🟦 Persegi" },
          ]}
          benar="C"
          umpan="Polanya berulang: segitiga, lingkaran, persegi."
          salah="Lihat tiga bentuk pertama, lalu ulangi."
        />
        <Pilih
          id={idKuis("B", 2)}
          pertanyaan="Mana yang bukan bangun ruang?"
          pilihan={[
            { huruf: "A", teks: "🎲 Dadu" },
            { huruf: "B", teks: "📦 Kardus" },
            { huruf: "C", teks: "🖼️ Bingkai foto" },
            { huruf: "D", teks: "🧊 Es batu kotak" },
          ]}
          benar="C"
          umpan="Bingkai foto pipih. Bentuknya persegi, bukan bangun ruang."
          salah="Bangun ruang tebal dan bisa dipegang."
        />
        <div className="border-t-2 border-[#1C01A5]/10 pt-5">
          <p className="text-base font-extrabold text-[#1C01A5]">QUIZ:</p>
          <div className="text-center">
            <IkonUlang ikon="🔺" jumlah={2} ukuran="text-3xl" />
          </div>
          <SoalRekamSuara
            id={idKuis("B", 3)}
            pertanyaan="Hitung dengan suaramu! Ada 2 segitiga. Berapa jumlah semua sisinya?"
            periksa={(transkrip) => jawabanTulisMemuatAlias(transkrip, ["enam", "6"])}
            petunjuk="Ucapkan jumlah sisinya."
          />
        </div>
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "B")}
          pertanyaan="Tuliskan angka jumlah sudut pada gambar ini."
          alias={["7", "tujuh", "4 + 3 = 7", "4+3=7"]}
          visual={<p className="text-center text-3xl font-black">🟦 + 🔺</p>}
          konteks="Persegi punya 4 sudut dan segitiga punya 3 sudut. Jumlahnya 7."
        />
      </div>
    </KartuBingkai>
  );
}

function KotaBentuk({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kartu = MODUL_MTK1_BAB4.kartu[2];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="🏠🔺🏆"
        judul={kartu.judul}
        anak="Sepuluh ruang rumah Nenek · menghitung, membaca, menulis, membandingkan"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <MisiPenjagaKebun
        misi={MISI_MTK1_BAB4}
        idMisi={(indeks) => idKuis("C", indeks)}
        idTulis={idKuisTulisKartu(ID, "C")}
        tema={TEMA_MTK1_BAB4}
        penutup="Rumah Nenek Ani sudah terpetakan. Sasa dan Bimo jadi detektif bentuk."
        bunga="🔺🟦⚪🔍"
      />
    </KartuBingkai>
  );
}

function PolaDuaKotak() {
  const kuis = useKuisMateri();
  const [kotak, setKotak] = useState(["", ""]);
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const pilihan = ["🔺", "⚪", "🟦"];
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">4. Pola bertingkat</p>
      <p className="mt-2 text-2xl">🔺 🔺 ⚪ 🔺 🔺 ⚪ 🔺 {kotak[0] || "❓"} {kotak[1] || "❓"}</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Ketuk bentuk untuk kotak pertama, lalu kotak kedua.</p>
      <div className="mt-3 flex gap-2">
        {pilihan.map((bentuk) => (
          <button
            key={bentuk}
            type="button"
            onClick={() => {
              setStatus(null);
              setKotak((lama) => (!lama[0] || lama[1] ? [bentuk, ""] : [lama[0], bentuk]));
            }}
            className="rounded-xl bg-white px-3 py-2 text-2xl ring-2 ring-[#1C01A5]/20"
          >
            {bentuk}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          const tepat = kotak[0] === "🔺" && kotak[1] === "⚪";
          setStatus(tepat ? "benar" : "salah");
          if (tepat) kuis?.tandaiBenar(idKuis("D", 3));
        }}
        className="mt-3 rounded-full bg-[#1C01A5] px-4 py-2 text-sm font-black text-white"
      >
        Periksa pola
      </button>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Ulangi kelompok dua segitiga lalu satu lingkaran." />
        <Umpan status={status} teks="Dua kotak terakhir: segitiga, lalu lingkaran." />
      </div>
    </article>
  );
}

function BandingBangun() {
  const kuis = useKuisMateri();
  const [sama, setSama] = useState("");
  const [beda, setBeda] = useState("");
  const [status, setStatus] = useState<StatusJawabanKuis>(null);
  const periksa = (nilaiSama: string, nilaiBeda: string) => {
    const tepat = nilaiSama === "A" && nilaiBeda === "A";
    setStatus(tepat ? "benar" : "salah");
    if (tepat) kuis?.tandaiBenar(idKuis("D", 7));
  };
  return (
    <article className="rounded-2xl border-2 border-[#1C01A5]/15 bg-[#FFFDF6] p-4">
      <p className="text-sm font-black text-[#1C01A5]">8. Dadu dan kotak susu</p>
      <p className="mt-2 text-2xl">🎲 🧃</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">Apa yang sama?</p>
      <div className="mt-2 grid gap-2">
        {[
          ["A", "Keduanya punya 6 sisi dan bisa dipegang"],
          ["B", "Keduanya pipih seperti kertas"],
          ["C", "Keduanya lingkaran"],
        ].map(([huruf, teks]) => (
          <button
            key={huruf}
            type="button"
            onClick={() => {
              setSama(huruf);
              if (beda) periksa(huruf, beda);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              sama,
              huruf,
              "A",
              "bg-[#1C01A5] text-white",
            )}`}
          >
            {huruf}. {teks}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-700">Apa yang berbeda?</p>
      <div className="mt-2 grid gap-2">
        {[
          ["A", "Dadu kubus, semua sisi sama. Kotak susu balok, lebih panjang"],
          ["B", "Keduanya sama persis"],
          ["C", "Dadu berbentuk lingkaran"],
        ].map(([huruf, teks]) => (
          <button
            key={huruf}
            type="button"
            onClick={() => {
              setBeda(huruf);
              if (sama) periksa(sama, huruf);
            }}
            className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${kelasTombolHasilKuis(
              beda,
              huruf,
              "A",
              "bg-[#1C01A5] text-white",
            )}`}
          >
            {huruf}. {teks}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <HasilJawabanKuis status={status} pesanSalah="Keduanya tebal. Bedanya ada pada panjang sisinya." />
        <Umpan status={status} teks="Sama-sama 6 sisi. Dadu kubus, kotak susu balok." />
      </div>
    </article>
  );
}

function LembarEvaluasi({ kelas, kelamin }: { kelas?: string; kelamin?: KelaminGuru }) {
  const kuis = useKuisMateri();
  const nama = useMemo(() => bacaProgres().profil.nama.trim(), []);
  const [gambarMainan, setGambarMainan] = useState(false);
  const [suaraMainan, setSuaraMainan] = useState(false);
  const sudahTandai = useRef(false);
  const skor = useMemo(() => {
    let jumlah = 0;
    for (let indeks = 0; indeks < 10; indeks += 1) {
      if (kuis?.sudahBenar(idKuis("D", indeks))) jumlah += 1;
    }
    return jumlah;
  }, [kuis]);
  const lencana =
    skor >= 9
      ? "Master Bentuk"
      : skor >= 7
        ? "Detektif Hebat"
        : skor >= 5
          ? "Penjelajah Bentuk"
          : "Ayo Coba Lagi";
  useEffect(() => {
    if (!gambarMainan || !suaraMainan || sudahTandai.current) return;
    sudahTandai.current = true;
    kuis?.tandaiBenar(idKuis("D", 9));
  }, [gambarMainan, suaraMainan, kuis]);
  const kartu = MODUL_MTK1_BAB4.kartu[3];
  return (
    <KartuBingkai>
      <KepalaKartu
        ikon="📝⭐"
        judul={kartu.judul}
        anak="Tantangan Para Juara · Mengenal Bentuk"
        kelas={kelas}
        kelamin={kelamin}
        cuplikan={cuplikanDariNaskah(kartu.voice, 2_000, 3_000)}
      />
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm font-semibold text-slate-700">
        <li>Segitiga, tiga sisi, tiga sudut.</li>
        <li>Segi empat, empat sisi, empat sudut.</li>
        <li>Lingkaran bulat, tanpa sudut, bisa menggelinding.</li>
        <li>Kubus seperti dadu, semua sisinya sama.</li>
        <li>Balok seperti kotak susu, lebih panjang.</li>
        <li>Sentuh setiap sisi sambil berhitung. Pipih berarti bentuk datar. Tebal berarti bangun ruang.</li>
      </ul>
      <p className="mt-4 rounded-2xl bg-[#FFF8E8] px-4 py-3 text-sm font-extrabold text-[#1C01A5]">
        Tiga segitiga, empat segi empat. Bulat lingkaran, menggelinding cepat. Dadu itu kubus, kotak susu balok. Ayo cari bentuk, di sekitar pojok.
      </p>
      <div className="mt-4 grid gap-3 rounded-2xl border-2 border-dashed border-[#1C01A5]/25 bg-[#FFFDF6] p-4 sm:grid-cols-3">
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Nama
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">{nama || "Siswa"}</span>
        </p>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Kelas
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">1</span>
        </p>
        <p className="text-xs font-black uppercase text-[#1C01A5]">
          Skor
          <span className="mt-1 block rounded-xl border-2 border-[#1C01A5]/20 px-3 py-2 text-sm">⭐ {skor} / 10</span>
        </p>
      </div>
      <p className="mt-3 rounded-2xl bg-[#F0FDF4] px-4 py-3 text-sm font-extrabold text-[#166534]">{lencana}</p>
      <div className="mt-4 grid gap-3">
        <SoalRekamSuara
          id={idKuis("D", 0)}
          pertanyaan="1. Sasa punya pizza, koin, dan pintu. Benda mana yang tidak punya sudut? Mengapa?"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["koin"],
              ["lingkaran", "bulat", "tidak punya sudut", "tanpa sudut"],
            ])
          }
          petunjuk="Sebutkan bendanya dan alasan bentuknya."
        />
        <KuisTulisKartu
          id={idKuis("D", 1)}
          pertanyaan="2. Ada 2 segitiga dan 1 persegi. Berapa jumlah semua sisinya? Tulis angkanya!"
          alias={["10", "sepuluh", "3 + 3 + 4 = 10", "3+3+4=10"]}
          visual={<p className="text-center text-3xl">🔺🔺 🟦</p>}
          konteks="Tiga tambah tiga tambah empat sama dengan sepuluh."
        />
        <Pilih
          id={idKuis("D", 2)}
          pertanyaan='3. Bimo berkata, "Dadu itu bentuknya persegi!" Apakah Bimo benar?'
          visual={<p>🎲</p>}
          pilihan={[
            { huruf: "A", teks: "Benar" },
            { huruf: "B", teks: "Salah" },
          ]}
          benar="B"
          umpan="Dadu itu kubus. Persegi adalah bentuk datar."
          salah="Dadu tebal dan bisa dipegang."
        />
        <PolaDuaKotak />
        <TulisBebas
          id={idKuis("D", 4)}
          judul="5. Menggambar kreatif"
          pertanyaan="Gambarlah benda di kelasmu yang berbentuk segi empat, lalu tulis nama bendanya."
          pesanSalah="Tulis nama bendanya di papan, misalnya buku, jendela, pintu, atau papan tulis."
          umpan="Benda itu punya 4 sisi."
          periksa={(teks) =>
            jawabanTulisMemuatAlias(teks, [
              "buku",
              "papan tulis",
              "papan",
              "jendela",
              "pintu",
              "meja",
              "bangku",
              "ubin",
              "kertas",
              "layar",
              "lemari",
              "bingkai",
              "foto",
              "segi empat",
              "persegi panjang",
              "persegi",
            ])
          }
        />
        <Pilih
          id={idKuis("D", 5)}
          pertanyaan="6. Robot punya kepala persegi, dua mata lingkaran, badan persegi panjang, dua kaki persegi panjang, dan topi segitiga. Ada berapa segi empat?"
          visual={<p>Kepala 🟦 · badan ▭ · kaki ▭▭ · topi 🔺</p>}
          pilihan={[
            { huruf: "A", teks: "2" },
            { huruf: "B", teks: "3" },
            { huruf: "C", teks: "4" },
            { huruf: "D", teks: "5" },
          ]}
          benar="C"
          umpan="Kepala 1, badan 1, kaki 2. Jumlahnya 4 segi empat."
          salah="Mata lingkaran dan topi segitiga tidak dihitung."
        />
        <SoalRekamSuara
          id={idKuis("D", 6)}
          pertanyaan="7. Di lantai miring ada bola dan kardus. Bimo ingin benda yang tidak menggelinding. Pilih bola atau kardus? Kenapa?"
          periksa={(transkrip) =>
            ucapanMemuat(transkrip, [
              ["kardus", "balok", "kotak"],
              ["tidak menggelinding", "tidak berguling", "sisi datar", "datar"],
            ])
          }
          petunjuk="Sebutkan bendanya dan alasannya."
        />
        <BandingBangun />
        <TulisBebas
          id={idKuis("D", 8)}
          judul="9. Menyusun bentuk"
          visual={<p className="text-center text-3xl">🔺 🔻</p>}
          pertanyaan="Kamu punya 2 segitiga yang sama besar. Kalau digabung, bisa jadi bentuk apa? Tulis namanya di papan."
          pesanSalah="Tulis segi empat, persegi, atau jajar genjang."
          umpan="Dua segitiga bisa menjadi segi empat."
          periksa={(teks) =>
            jawabanTulisMemuatAlias(teks, ["segi empat", "persegi", "persegi panjang", "jajar genjang", "jajargenjang"])
          }
        />
        <TulisBebas
          id={`${ID}-D-mainan`}
          judul="10. Mencipta mainan"
          visual={<p className="text-center text-3xl">🔺 🟦 ⚪</p>}
          pertanyaan="Gambarlah mainan dari segitiga, segi empat, dan lingkaran. Lalu tulis ketiga nama bentuk itu."
          pesanSalah="Tulis ketiga namanya di papan: segitiga, segi empat, dan lingkaran."
          umpan="Mainanmu memakai ketiga keluarga bentuk."
          periksa={(teks) =>
            ucapanMemuat(teks, [
              ["segitiga"],
              ["segi empat", "persegi", "persegi panjang"],
              ["lingkaran"],
            ])
          }
          sesudahBenar={() => setGambarMainan(true)}
        />
        <SoalRekamSuara
          id=""
          pertanyaan="Ceritakan mainanmu. Kamu memakai berapa bentuk?"
          periksa={(transkrip) =>
            jawabanTulisMemuatAlias(transkrip, [
              "3",
              "tiga",
              "4",
              "empat",
              "5",
              "lima",
              "6",
              "enam",
              "7",
              "tujuh",
              "8",
              "delapan",
              "9",
              "sembilan",
              "10",
              "sepuluh",
            ])
          }
          petunjuk="Sebutkan jumlah bentuknya."
          sesudahNilai={(benar) => {
            if (benar) setSuaraMainan(true);
          }}
        />
        <KuisTulisKartu
          id={idKuisTulisKartu(ID, "D")}
          pertanyaan="Tulis kalimat kunci: Segitiga, tiga sisi, tiga sudut."
          alias={["segitiga tiga sisi tiga sudut", "segitiga, tiga sisi, tiga sudut"]}
        />
      </div>
      <p className="mt-4 text-sm font-bold text-emerald-800">
        Hore! Kamu sudah jadi detektif bentuk. Coba cari bentuk lain di rumahmu, ya!
      </p>
    </KartuBingkai>
  );
}

export default function NaskahMtk1Bab4({
  kelas = "1 SD",
  kelamin,
}: {
  kelas?: string;
  kelamin?: KelaminGuru;
}) {
  return (
    <div className="space-y-5">
      <KartuA kelas={kelas} kelamin={kelamin} />
      <KartuB kelas={kelas} kelamin={kelamin} />
      <KotaBentuk kelas={kelas} kelamin={kelamin} />
      <div id={SLOT_AJUAN_SEBELUM_KARTU_D} />
      <LembarEvaluasi kelas={kelas} kelamin={kelamin} />
    </div>
  );
}
