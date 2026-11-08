"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useEffect, useState } from "react";
import { GameRonde, KERTAS_ANGKA, PilihAngka, kataK, ucapTambah, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { opsiKurang, ucapKurang } from "./SubBabA3Pengurangan";
import { KabarChip, Letusan, TombolLanjut, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { BatangModel, Rangkai, TINTA, kurangTok } from "./soal-cerita-d3-umum";
import { CatatanPensil, LencanaSuara, PitaTahap, SuaraCtx, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab D, Tahap 6: Abstract. Angka dan simbol, lalu Poin Penting.   */
/*  8 Detektif Kata Kunci (CUBES), 9 Isi Kotak Penyelesaian (hlm. 106-108),   */
/*  10 Soal Ceritaku (Ayo Berkarya hlm. 113)                                  */
/* ------------------------------------------------------------------------ */

type Props = { ronde: number; panel: PanelSuara; onBeres: () => void };

/* --------- Permainan 8. Detektif Kata Kunci ------------------------------- */

type SoalDetektif = {
  baris: string[];
  kunci: string;
  pilihan: string[];
  op: "+" | "−";
  a: number;
  b: number;
  c: number;
};
const RONDE_DETEKTIF: SoalDetektif[] = [
  {
    baris: ["Ada 8 burung di pohon.", "Sebanyak 2 burung terbang.", "Berapa sisanya?"],
    kunci: "terbang",
    pilihan: ["burung", "terbang", "pohon"],
    op: "−",
    a: 8,
    b: 2,
    c: 6,
  },
  {
    baris: ["Ada 4 kupu-kupu di bunga.", "Datang 3 kupu-kupu lagi.", "Berapa semuanya?"],
    kunci: "datang",
    pilihan: ["bunga", "kupu-kupu", "datang"],
    op: "+",
    a: 4,
    b: 3,
    c: 7,
  },
  {
    baris: ["Ada 9 kue di piring.", "Sebanyak 4 kue dimakan.", "Berapa sisa kue?"],
    kunci: "dimakan",
    pilihan: ["piring", "dimakan", "kue"],
    op: "−",
    a: 9,
    b: 4,
    c: 5,
  },
];
const bersih = (t: string) => t.replace(/[.,?!]/g, "");

function RondeDetektif({ ronde, panel, onBeres }: Props) {
  const d = RONDE_DETEKTIF[ronde];
  const kata = d.baris.join(" ").split(" ");
  const [langkah, setLangkah] = useState(0);
  const [lingkar, setLingkar] = useState<number[]>([]);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_DETEKTIF.length - 1;
  const suara = panel.suara["d3-detektif"] === true && akhir;
  const buka = akhir ? suara : benar;
  const ucap = d.op === "−" ? ucapKurang(d.a, d.b, d.c) : ucapTambah(d.a, d.b, d.c);
  useBicara(buka, `${ucap}.`);

  const ketukKata = (i: number) => {
    if (langkah !== 0) return;
    const t = bersih(kata[i]);
    if (!/^\d+$/.test(t)) {
      setKabar({ teks: "Itu bukan angka. Lingkari angka yang ditulis dengan lambang, ya.", ok: false });
      return;
    }
    setKabar(null);
    const baru = lingkar.includes(i) ? lingkar.filter((x) => x !== i) : [...lingkar, i];
    setLingkar(baru);
    if (baru.length === 2) {
      setLangkah(1);
      setKabar({ teks: `Angkanya ${d.a} dan ${d.b}. Sekarang cari kata kuncinya.`, ok: true });
    }
  };
  const pilihKunci = (k: string) => {
    if (k === d.kunci) {
      setSalah(null);
      setLangkah(2);
      setKabar({ teks: `Kata kunci: ${d.kunci}.`, ok: true });
    } else {
      setSalah(k);
      setKabar({ teks: "Belum tepat. Cari kata yang menunjukkan jumlahnya berubah.", ok: false });
    }
  };
  const pilihTanda = (op: "+" | "−") => {
    if (op === d.op) {
      setLangkah(3);
      setKabar(null);
      if (akhir) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKabar({
        teks: d.op === "−" ? "Belum tepat. Kata itu berarti berkurang, jadi pakai tanda kurang." : "Belum tepat. Kata itu berarti bertambah, jadi pakai tanda tambah.",
        ok: false,
      });
    }
  };
  const pilihHasil = (n: number) => {
    if (benar) return;
    if (n === d.c) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung dengan tanda yang tadi kamu pilih.", ok: false });
    }
  };

  const langkahTeks = ["1. Lingkari dua angka", "2. Kotaki kata kunci", "3. Pilih tanda", "4. Hitung hasilnya"][langkah];
  const op = langkah >= 3 ? d.op : null;

  return (
    <>
      <CatatanPensil
        pendek={buka ? "Hebat!" : langkah === 3 && akhir ? "Ucapkan: hasilnya" : langkahTeks}
        teks="Jadi detektif soal cerita. Lingkari dua angka, kotaki kata kunci, pilih tanda tambah atau kurang, lalu hitung hasilnya."
      />
      <div className="flex items-center justify-between gap-2 rounded-2xl border-4 border-[#1C01A5] bg-[#E0E7FF] px-3 py-1.5">
        <span className="text-base font-black text-[#1C01A5]">🕵️ Detektif</span>
        <span className="text-xs font-black text-[#1C01A5]/70">Langkah {langkah + 1} / 4</span>
      </div>
      <div className={`${KERTAS_ANGKA} relative`}>
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1" aria-label={`Cerita: ${d.baris.join(" ")}`}>
          {kata.map((k, i) => {
            const angka = /^\d+$/.test(bersih(k));
            const kuncinya = langkah >= 2 && bersih(k) === d.kunci;
            return (
              <button
                key={i}
                type="button"
                disabled={langkah !== 0}
                aria-label={`Kata ${k}`}
                onClick={() => ketukKata(i)}
                className={`rounded-lg px-1 text-lg font-black leading-snug text-[#1C01A5] ${
                  lingkar.includes(i) ? "rounded-full border-4 border-[#E11D48] bg-[#FFE4E6]" : ""
                } ${kuncinya ? "bg-[#FFE566] underline decoration-4" : ""} ${angka && langkah === 0 && !lingkar.includes(i) ? "underline decoration-dotted" : ""}`}
              >
                {k}
              </button>
            );
          })}
        </p>
        {langkah === 1 ? (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-sm font-black text-[#1C01A5]">Mana kata kuncinya?</p>
            <div className="grid grid-cols-3 gap-2">
              {d.pilihan.map((k) => (
                <button
                  key={`${k}-${salah === k ? "x" : "o"}`}
                  type="button"
                  aria-label={`Kata kunci ${k}`}
                  onClick={() => pilihKunci(k)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salah === k ? "igil-goyang" : ""}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {langkah === 2 ? (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-sm font-black text-[#1C01A5]">Pilih tandanya</p>
            <div className="grid grid-cols-2 gap-2">
              {(["+", "−"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-label={t === "+" ? "Tanda tambah" : "Tanda kurang"}
                  onClick={() => pilihTanda(t)}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-2 text-5xl font-black leading-none text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {langkah >= 3 ? (
          <div className="igil-muncul space-y-2">
            <div className="text-center">
              <Rangkai tok={[d.a, op ?? "", d.b, "=", buka ? d.c : "?"]} nyala={buka ? [] : [4]} kelas="text-3xl" />
            </div>
            {!akhir && !benar ? <PilihAngka opsi={opsiKurang(d.c)} keliru={keliru} onPilih={pilihHasil} /> : null}
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuDetektif({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Detektif Kata Kunci"
      warna="#C7D2FE"
      petunjuk="Jadilah detektif soal cerita. Langkah satu, lingkari dua angka di cerita. Langkah dua, pilih kata kunci yang menunjukkan jumlahnya berubah. Langkah tiga, pilih tanda tambah atau kurang. Langkah empat, hitung hasilnya. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-detektif"
      jumlahRonde={RONDE_DETEKTIF.length}
      kunciAkhir={5}
      belumSiap="Selesaikan empat langkah detektif dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Isi Kotak Penyelesaian (hlm. 106-108) ------------- */

type SoalKotak = { baris: string[]; kotak: number[]; petunjuk: string[]; kalimat: string; cek?: string };
const RONDE_KOTAK: SoalKotak[] = [
  {
    baris: ["Ada 10 kepik di daun.", "Sebanyak 2 kepik terbang.", "Berapa sisa kepik?"],
    kotak: [10, 2, 8],
    petunjuk: ["Mula-mula ada berapa kepik?", "Berapa kepik yang terbang?", "Kurangi: 10 kurang 2."],
    kalimat: "Sisa kepik ada 8 ekor.",
    cek: "Periksa: 8 + 2 = 10",
  },
  {
    baris: ["Ada 7 siswa di kelas.", "5 siswa masih di kelas.", "Berapa siswa yang pergi?"],
    kotak: [7, 5, 2],
    petunjuk: ["Semua siswa ada berapa?", "Yang masih di kelas berapa?", "Kurangi: 7 kurang 5."],
    kalimat: "Siswa yang pergi ada 2 orang.",
    cek: "Periksa: 2 + 5 = 7",
  },
  {
    baris: ["Kira punya 10 bola.", "3 bola ada di luar kardus.", "Berapa bola di dalam kardus?"],
    kotak: [10, 3, 7],
    petunjuk: ["Semua bola ada berapa?", "Bola di luar kardus berapa?", "Kurangi: 10 kurang 3."],
    kalimat: "Bola di dalam kardus ada 7 buah.",
    cek: "Periksa: 7 + 3 = 10",
  },
  {
    baris: ["Kira punya 10 bola.", "Beberapa bola diberikan kepada Tika.", "Sisa bola Kira 6.", "Berapa bola untuk Tika?"],
    kotak: [10, 4, 6],
    petunjuk: ["Mula-mula ada berapa bola?", "Cari yang diberikan: 10 kurang 6.", "Sisa bola Kira berapa?"],
    kalimat: "Bola yang diberikan kepada Tika ada 4 buah.",
    cek: "Periksa: 6 + 4 = 10",
  },
  {
    baris: ["Malosi punya 9 kelereng.", "Malosi memberi Kira 2 kelereng.", "Malosi memberi Upe 4 kelereng.", "Berapa sisa kelereng Malosi?"],
    kotak: [9, 2, 4, 3],
    petunjuk: ["Mula-mula ada berapa kelereng?", "Untuk Kira berapa?", "Untuk Upe berapa?", ""],
    kalimat: "Sisa kelereng Malosi ada 3 buah.",
  },
];
const ANGKA_PAPAN = Array.from({ length: 11 }, (_, i) => i);

function RondeKotak({ ronde, panel, onBeres }: Props) {
  const d = RONDE_KOTAK[ronde];
  const n = d.kotak.length;
  const akhir = ronde === RONDE_KOTAK.length - 1;
  const perluIsi = akhir ? n - 1 : n;
  const [terisi, setTerisi] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const siap = terisi === perluIsi;
  const suara = panel.suara["d3-kotak"] === true && akhir;
  const buka = akhir ? suara : siap;
  useBicara(
    buka,
    akhir
      ? `${ucapKurang(9, 2, 7)}. ${ucapKurang(7, 4, 3)}. Sisa kelereng Malosi ada tiga.`
      : `${d.kalimat.replace(/(\d+)/g, (m) => kataK(Number(m)))}`
  );

  const isi = (angka: number) => {
    if (siap) return;
    if (angka === d.kotak[terisi]) {
      const baru = terisi + 1;
      setTerisi(baru);
      setSalah(null);
      setKabar(null);
      if (baru === perluIsi) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(angka);
      setKabar({ teks: `Belum tepat. ${d.petunjuk[terisi] || "Lihat ceritanya lagi."}`, ok: false });
    }
  };

  const kotakSuku = d.kotak.map((v, i) => {
    const tampil = i < terisi || (akhir && i === n - 1 && suara);
    const aktif = i === terisi && !siap;
    return (
      <React.Fragment key={i}>
        {i > 0 ? (
          <span className="text-3xl font-black text-[#1C01A5]" aria-hidden="true">
            {i === n - 1 ? "=" : "−"}
          </span>
        ) : null}
        <span
          className={`flex h-14 w-11 items-center justify-center rounded-xl border-4 text-3xl font-black leading-none text-[#1C01A5] ${
            tampil ? "border-[#1C01A5] bg-white" : aktif ? "igil-denyut border-[#F0AB00] bg-[#FFF8D6]" : "border-dashed border-[#1C01A5]/40 bg-white/60"
          }`}
        >
          {tampil ? v : akhir && i === n - 1 ? "?" : ""}
        </span>
      </React.Fragment>
    );
  });

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : siap ? (akhir ? "Ucapkan: hasilnya" : "Hebat!") : `Isi kotak ${terisi + 1}`}
        teks={`Isi kotak penyelesaian dari kiri ke kanan. ${siap ? "Semua kotak sudah terisi." : d.petunjuk[terisi] || "Pilih angka yang cocok."}`}
      />
      <div className={`${KERTAS_ANGKA} relative`}>
        <div className="space-y-0.5 rounded-xl bg-[#FFFBEB] px-2 py-1.5">
          {d.baris.map((b, i) => (
            <p key={i} className="text-lg font-black leading-snug text-[#1C01A5]">
              {b}
            </p>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/70">Penyelesaian</p>
        <div role="img" aria-label="Kotak penyelesaian" className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {kotakSuku}
        </div>
        {!siap ? (
          <>
            <p className="text-center text-sm font-black text-[#1C01A5]">Kotak {terisi + 1}: {d.petunjuk[terisi] || "Isi dengan angka yang cocok."}</p>
            <div className="grid grid-cols-6 gap-1.5">
              {ANGKA_PAPAN.map((a) => (
                <button
                  key={`${a}-${salah === a ? "x" : "o"}`}
                  type="button"
                  aria-label={`Angka ${a}`}
                  onClick={() => isi(a)}
                  className={`rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] py-1.5 text-2xl font-black leading-none text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] ${
                    salah === a ? "igil-goyang" : ""
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </>
        ) : null}
        {siap && !akhir ? (
          <div className="igil-muncul space-y-1 rounded-2xl border-4 border-[#16A34A] bg-[#F0FDF4] px-2 py-2 text-center">
            <p className="text-base font-black text-[#14532D]">{d.kalimat} ✅</p>
            {d.cek ? <p className="text-sm font-black text-[#1C01A5]">{d.cek}</p> : null}
          </div>
        ) : null}
        {siap && akhir ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#1C01A5] bg-[#FFFBEB] px-2 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">{suara ? `${d.kalimat} ✅` : "Kurangi dari kiri ke kanan. Ucapkan hasilnya."}</p>
            <p className="mt-1 text-xs font-black text-[#1C01A5]/70">9 − 2 = 7, lalu 7 − 4 = {suara ? 3 : "?"}</p>
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuKotak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Isi Kotak Penyelesaian"
      warna="#FDE68A"
      petunjuk="Baca cerita, lalu isi kotak penyelesaian satu per satu dari kiri ke kanan. Pilih angka dari papan angka. Setiap kotak punya petunjuk. Pada soal terakhir, ada dua kali mengurangi. Isi tiga kotak pertama, lalu ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-kotak"
      jumlahRonde={RONDE_KOTAK.length}
      kunciAkhir={3}
      belumSiap="Isi kotak penyelesaian dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKotak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Soal Ceritaku (Ayo Berkarya, hlm. 113) ----------- */

const TOPIK = [
  { nama: "kupu-kupu", tempat: "di bunga", kerja: "terbang", ikon: "🦋" },
  { nama: "burung", tempat: "di pohon", kerja: "terbang", ikon: "🐦" },
  { nama: "kue", tempat: "di piring", kerja: "dimakan", ikon: "🍰" },
  { nama: "bola", tempat: "di kardus", kerja: "diberikan kepada Tika", ikon: "⚽" },
];

function Stepper({ label, nilai, kurang, tambah, mati }: { label: string; nilai: number; kurang: () => void; tambah: () => void; mati: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1">
      <span className="min-w-0 text-sm font-black leading-tight text-[#1C01A5]">{label}</span>
      <span className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={mati}
          aria-label={`Kurangi ${label}`}
          onClick={kurang}
          className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 text-center text-3xl font-black text-[#1C01A5]">{nilai}</span>
        <button
          type="button"
          disabled={mati}
          aria-label={`Tambah ${label}`}
          onClick={tambah}
          className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-40"
        >
          +
        </button>
      </span>
    </div>
  );
}

function RondeSoalku({ ronde, panel, onBeres }: Props) {
  const akhir = ronde === 1;
  const [topik, setTopik] = useState(0);
  const [mula, setMula] = useState(8);
  const [pergi, setPergi] = useState(3);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["d3-soalku"] === true && akhir;
  const t = TOPIK[topik];
  const sisa = mula - pergi;
  useEffect(() => {
    if (akhir) onBeres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useBicara(
    akhir ? suara : benar,
    akhir
      ? "Mula-mula ada tujuh burung. Periksa: tujuh dikurangi tiga sama dengan empat."
      : `${ucapKurang(mula, pergi, sisa)}. Periksa: ${ucapTambah(sisa, pergi, mula)}.`
  );

  const ubahMula = (v: number) => {
    const m = Math.min(10, Math.max(3, v));
    setMula(m);
    if (pergi > m - 1) setPergi(m - 1);
    setKeliru(null);
    setKabar(null);
  };
  const ubahPergi = (v: number) => {
    setPergi(Math.min(mula - 1, Math.max(1, v)));
    setKeliru(null);
    setKabar(null);
  };
  const pilih = (n: number) => {
    if (benar) return;
    if (n === sisa) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Belum tepat. Kata kunci "${t.kerja}" berarti dikurangi.`, ok: false });
    }
  };

  if (akhir) {
    return (
      <div className={`${KERTAS_ANGKA} relative`}>
        <div className="space-y-0.5 rounded-xl bg-[#FFFBEB] px-2 py-1.5">
          <p className="text-lg font-black leading-snug text-[#1C01A5]">Beberapa burung ada di pohon.</p>
          <p className="text-lg font-black leading-snug text-[#1C01A5]">3 burung terbang.</p>
          <p className="text-lg font-black leading-snug text-[#1C01A5]">Sisa burung 4.</p>
          <p className="text-lg font-black leading-snug text-[#1C01A5]">Berapa burung mula-mula?</p>
        </div>
        <div className="space-y-1.5 text-center">
          <Rangkai tok={[suara ? 7 : "?", "−", 3, "=", 4]} nyala={suara ? [] : [0]} kelas="text-3xl" />
          <p className="text-xs font-black text-[#1C01A5]/70">Petunjuk kebalikan:</p>
          <Rangkai tok={[4, "+", 3, "=", suara ? 7 : "?"]} />
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">{suara ? "Mula-mula ada 7 burung ✅" : "Ucapkan jumlah burung mula-mula."}</p>
        <Letusan id={letusan.id} />
      </div>
    );
  }

  return (
    <div className={`${KERTAS_ANGKA} relative`}>
      <p className="text-center text-sm font-black text-[#1C01A5]">✏️ Buat soal ceritamu sendiri</p>
      <div className="grid grid-cols-4 gap-1.5">
        {TOPIK.map((x, i) => (
          <button
            key={x.nama}
            type="button"
            disabled={benar}
            aria-pressed={topik === i}
            aria-label={`Topik ${x.nama}`}
            onClick={() => {
              setTopik(i);
              setKeliru(null);
              setKabar(null);
            }}
            className={`flex flex-col items-center rounded-2xl border-4 px-0.5 py-1 text-[11px] font-black leading-tight text-[#1C01A5] disabled:opacity-60 ${
              topik === i ? "border-[#F0AB00] bg-[#FFF8D6]" : "border-[#1C01A5] bg-white"
            }`}
          >
            <span className="text-2xl" aria-hidden="true">
              {x.ikon}
            </span>
            {x.nama}
          </button>
        ))}
      </div>
      <Stepper label="Mula-mula" nilai={mula} kurang={() => ubahMula(mula - 1)} tambah={() => ubahMula(mula + 1)} mati={benar} />
      <Stepper label="Yang pergi" nilai={pergi} kurang={() => ubahPergi(pergi - 1)} tambah={() => ubahPergi(pergi + 1)} mati={benar} />
      <div className="space-y-0.5 rounded-xl bg-[#FFFBEB] px-2 py-1.5">
        <p className="text-lg font-black leading-snug text-[#1C01A5]">
          Ada {mula} {t.nama} {t.tempat}.
        </p>
        <p className="text-lg font-black leading-snug text-[#1C01A5]">
          Sebanyak {pergi} {t.nama} <span className="rounded bg-[#FFE566] px-1">{t.kerja}</span>.
        </p>
        <p className="text-lg font-black leading-snug text-[#1C01A5]">Berapa sisa {t.nama}?</p>
      </div>
      <div className="text-center">
        <Rangkai tok={[mula, "−", pergi, "=", benar ? sisa : "?"]} nyala={benar ? [] : [4]} kelas="text-3xl" />
      </div>
      {!benar ? (
        <>
          <p className="text-center text-sm font-black text-[#1C01A5]">Jawab soalmu sendiri</p>
          <PilihAngka opsi={opsiKurang(sisa)} keliru={keliru} onPilih={pilih} />
        </>
      ) : (
        <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-[#16A34A] bg-[#F0FDF4] px-2 py-2 text-center">
          <p className="text-base font-black text-[#14532D]">
            Sisa {t.nama} ada {sisa}. ✅
          </p>
          <p className="text-xs font-black text-[#1C01A5]/70">Periksa dengan kebalikan</p>
          <Rangkai tok={[sisa, "+", pergi, "=", mula]} />
        </div>
      )}
      <KabarChip kabar={kabar} />
      <Letusan id={letusan.id} />
    </div>
  );
}

function KartuSoalku({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Soal Ceritaku"
      warna="#FBCFE8"
      petunjuk="Sekarang kamu menjadi pembuat soal. Pilih topik, atur jumlah mula-mula dan jumlah yang pergi. Cerita dan kalimat matematikanya muncul sendiri. Jawab soalmu, lalu periksa dengan kebalikan. Pada soal terakhir, ceritanya mencari jumlah mula-mula. Ucapkan jawabannya."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-soalku"
      jumlahRonde={2}
      kunciAkhir={7}
      belumSiap="Selesaikan soalmu dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSoalku ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Poin Penting dan Catatanku ------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Soal cerita pengurangan punya tiga bagian: mula-mula, pergi, dan sisa. Cari kata kunci seperti terbang, pergi, diberikan, atau dimakan. Ikuti lima langkah: baca, lingkari angka, kotaki kata kunci, tulis kalimat matematika, lalu periksa. Kadang yang dicari adalah sisa, kadang yang pergi, kadang mula-mula. Kalau ada dua kali mengurangi, kurangi satu per satu dari kiri. Akhiri dengan kalimat jawaban dan sebut bendanya.";

const POIN_D3: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "🧩",
    nama: "Mula-mula, pergi, sisa",
    isi: <BatangModel mula={8} pergi={2} sisa={6} />,
    suara: "Cerita pengurangan punya tiga bagian. Mula-mula adalah jumlah di awal. Pergi adalah yang berkurang. Sisa adalah yang masih tinggal. Delapan dikurangi dua sama dengan enam.",
  },
  {
    ikon: "🔑",
    nama: "Kata kunci",
    isi: (
      <p className="text-center text-sm font-black leading-snug text-[#1C01A5]">
        terbang · pergi · diberikan · dimakan · hilang → <span className="text-lg">−</span>
        <br />
        datang · bergabung · ditambah → <span className="text-lg">+</span>
      </p>
    ),
    suara: "Kata terbang, pergi, diberikan, dimakan, dan hilang berarti jumlahnya berkurang, pakai tanda kurang. Kata datang, bergabung, dan ditambah berarti jumlahnya bertambah, pakai tanda tambah.",
  },
  {
    ikon: "🪜",
    nama: "Lima langkah",
    isi: <p className="text-center text-sm font-black leading-snug text-[#1C01A5]">Baca → Lingkari angka → Kotaki kata kunci → Tulis kalimat → Periksa</p>,
    suara: "Lima langkah soal cerita. Satu, baca ceritanya pelan-pelan. Dua, lingkari angkanya. Tiga, kotaki kata kuncinya. Empat, tulis kalimat matematikanya. Lima, periksa jawabannya.",
  },
  {
    ikon: "🔍",
    nama: "Cari yang pergi",
    isi: (
      <div className="space-y-1 text-center">
        <Rangkai tok={kurangTok(7, 5, 2)} />
        <p className="text-[11px] font-black text-[#1C01A5]/80">Ada 7. Masih 5. Yang pergi 7 − 5 = 2.</p>
      </div>
    ),
    suara: "Kalau yang dicari adalah yang pergi, kurangi jumlah mula-mula dengan yang masih tinggal. Tujuh dikurangi lima sama dengan dua. Ada dua yang pergi.",
  },
  {
    ikon: "✌️",
    nama: "Dua kali mengurangi",
    isi: (
      <div className="space-y-1 text-center">
        <Rangkai tok={[9, "−", 2, "−", 4, "=", 3]} />
        <p className="text-[11px] font-black text-[#1C01A5]/80">Cara lain: 2 + 4 = 6, lalu 9 − 6 = 3.</p>
      </div>
    ),
    suara: "Kalau ada dua kali mengurangi, kurangi satu per satu dari kiri. Sembilan dikurangi dua sama dengan tujuh. Tujuh dikurangi empat sama dengan tiga. Cara lain, gabungkan dulu dua dan empat menjadi enam, lalu sembilan dikurangi enam sama dengan tiga.",
  },
  {
    ikon: "💬",
    nama: "Kalimat jawaban",
    isi: <p className="text-center text-sm font-black leading-snug text-[#1C01A5]">Sisa kelereng Malosi ada 3 kelereng.</p>,
    suara: "Tulis jawaban dalam satu kalimat lengkap dan sebut bendanya. Contohnya, sisa kelereng Malosi ada tiga kelereng.",
  },
];

const CATATANKU = [
  "Aku bisa membaca soal cerita dengan teliti.",
  "Aku bisa menemukan kata kunci pengurangan.",
  "Aku bisa menulis kalimat pengurangan dari cerita.",
  "Aku bisa mencari sisa, yang pergi, dan mula-mula.",
  "Aku bisa mengurangi dua kali.",
  "Aku aktif berdiskusi.",
  "Aku bertanya jika belum mengerti.",
];

function Catatanku({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => CATATANKU.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {CATATANKU.map((t, i) => (
        <button
          key={t}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${t} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${t} Iya.` : t);
          }}
          className="igil-tanpa-tepi flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>
            {iya[i] ? "😊" : ""}
          </span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{t}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingD3({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_D3.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="igil-tanpa-tepi block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            {p.isi}
          </button>
        ))}
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            💡
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">Cari kata kunci dulu. Setelah itu tulis kalimat matematikanya, lalu periksa.</p>
        </div>
        <Catatanku speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB D ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "detektif" | "kotak" | "soalku";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "detektif" },
  { nomor: 9, tipe: "kotak" },
  { nomor: 10, tipe: "soalku" },
];

export function AbstractSoalCeritaD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_ABSTRACT.length;
  const kartu = KARTU_ABSTRACT[Math.min(indeks, KARTU_ABSTRACT.length - 1)];
  const langkahTotal = KARTU_ABSTRACT.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: indeks >= KARTU_ABSTRACT.length - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan simbol" warna={TINTA} />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      {poin ? (
        <PoinPentingD3
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "detektif" ? <KartuDetektif {...dasar} /> : null}
          {kartu.tipe === "kotak" ? <KartuKotak {...dasar} /> : null}
          {kartu.tipe === "soalku" ? <KartuSoalku {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}