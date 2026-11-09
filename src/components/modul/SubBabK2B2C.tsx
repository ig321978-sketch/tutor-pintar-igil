"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { BendaSeret, CatatanPensil, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { sebut } from "./dasar-k2";
import { BatangBanding, Burung } from "./dasar-k2b2";
import { Berhasil, Pencacah, PilihanAngka, PilihanTeks, TOMBOL_BESAR } from "./permainan-k2b2";
import { InfografisK2B2, KotakPoster, PoinK2B2, TabelPoster } from "./kit-k2b2";
import { SUB_C } from "./naskah-k2b2";
import { AWAL_CERITA, BATAS_CERITA, BENDA_C, RONDE_KATA_C, RONDE_LAPORAN_C, TOKOH_C, cerita, opsiB2, urutanTetap, type PilihanCerita } from "./data-k2b2";
import { LangkahBonekaK2B2C, LangkahBurungK2B2C, LangkahDonatK2B2C, LangkahJerukK2B2C } from "./SubBabK2B2CConcrete";
import { KartuAlurK2B2C, KartuModelK2B2C, KartuPanahK2B2C } from "./SubBabK2B2CPicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab C: Soal Cerita Penjumlahan dan Pengurangan (Buku      */
/* Siswa Kelas II hlm. 54-58 dan 63). Semua di klien, tanpa API.              */
/* Naskah: naskah/mtk-2-bab2-sub-c-soal-cerita.md                             */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Burung Kata Kunci (jawab), 2 Meja Donat (seret),              */
/*            3 Keranjang Jeruk Halim (kembalikan), 4 Boneka Tiga Sahabat     */
/*            (gabungkan).                                                    */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Model Batang Cerita, 6 Susun Alur Penyelesaian,               */
/*            7 Panah di Jalur Bilangan.                                      */
/*  Abstract: 8 Kata Kunci Jadi Tanda (sortir), 9 Laporan Detektif Cerita     */
/*            (isi laporan), 10 Pencipta Soal Cerita (membuat).               */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman soal cerita penjumlahan dan pengurangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center";

function visualInfografis(): React.ReactNode[] {
  return [
    /* 1 Burung hijau dan merah */
    <div key="1" className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
      <div className="grid grid-cols-5 gap-x-1 gap-y-1">
        {Array.from({ length: 5 }, (_, j) => (
          <div key={j} className="flex flex-col items-center">
            <Burung warna="merah" kelas="h-7 w-8" />
            <span className={`my-0.5 block h-2 w-0.5 rounded-full ${j < 4 ? "bg-[#1C01A5]" : "bg-transparent"}`} aria-hidden="true" />
            {j < 4 ? <Burung warna="hijau" kelas="h-7 w-8" /> : <span className="block h-7 w-8 rounded border-2 border-dashed border-[#1C01A5]/25" aria-hidden="true" />}
          </div>
        ))}
      </div>
      <p className="text-center text-xs font-black text-[#1C01A5]">Hijau 4 • Merah 5 • Selisih 1 • Jumlah 9</p>
    </div>,
    /* 2 Empat kata kunci */
    <div key="2" className="space-y-1">
      <TabelPoster
        kolom="5rem 1fr 3rem"
        kepala={["Kata", "Artinya", "Tanda"]}
        baris={[
          ["lebihnya", "ada yang punya lebih banyak", "+ / −"],
          ["kurangnya", "ada yang punya lebih sedikit", "+ / −"],
          ["selisih", "besar dikurangi kecil", "−"],
          ["jumlah", "semua digabung", "+"],
        ]}
      />
      <p className="text-center text-xs font-black text-[#1C01A5]/80">Lebihnya dan kurangnya: lihat dulu siapa yang dicari. Lebih banyak, tambah. Lebih sedikit, kurang.</p>
    </div>,
    /* 3 Empat langkah */
    <div key="3" className="grid grid-cols-2 gap-1 text-center">
      {[
        ["1", "Diketahui", "apa yang sudah tahu"],
        ["2", "Ditanya", "apa yang dicari"],
        ["3", "Solusi", "hitungan dan tanda"],
        ["4", "Kesimpulan", "kalimat Jadi, ..."],
      ].map(([no, nama, ket]) => (
        <KotakPoster key={nama} warna="#FFFBEB">
          <p className="text-xl font-black text-[#B45309]">{no}</p>
          <p className="text-sm font-black text-[#1C01A5]">{nama}</p>
          <p className="text-[10px] font-black leading-tight text-[#1C01A5]/70">{ket}</p>
        </KotakPoster>
      ))}
    </div>,
    /* 4 Contoh 1: donat */
    <div key="4" className="space-y-1">
      <div className="grid grid-cols-2 gap-1 text-center">
        <div className={SEL}>
          <p className="text-xs font-black text-[#1C01A5]">Tika</p>
          <p className="text-xl leading-none">🍩🍩🍩🍩🍩🍩</p>
          <p className="text-xl leading-none">🍩🍩🍩🍩🍩🍩</p>
          <p className="text-lg font-black text-[#2563EB]">12</p>
        </div>
        <div className={SEL}>
          <p className="text-xs font-black text-[#1C01A5]">Malosi (5 kurangnya)</p>
          <p className="text-xl leading-none">🍩🍩🍩🍩🍩🍩</p>
          <p className="text-xl leading-none">🍩</p>
          <p className="text-lg font-black text-[#16A34A]">7</p>
        </div>
      </div>
      <p className="text-center text-lg font-black text-[#1C01A5]">12 − 5 = 7 • 7 + 12 = 19</p>
    </div>,
    /* 5 Contoh 2: jeruk */
    <div key="5" className="space-y-1">
      <div className="flex items-center justify-center gap-2 text-center text-xl font-black text-[#1C01A5]">
        <span className={SEL}>… − 4 = 12</span>
        <span aria-hidden="true">🔁</span>
        <span className={SEL}>12 + 4 = <span className="text-[#16A34A]">16</span></span>
      </div>
      <p className="text-center text-xl leading-none">🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊 + 🍊🍊🍊🍊</p>
    </div>,
    /* 6 Contoh 3: boneka */
    <div key="6" className="space-y-1">
      <div className="grid grid-cols-3 gap-1 text-center">
        {[
          ["Tika", 5],
          ["Kira", 7],
          ["Lili", 8],
        ].map(([nama, n]) => (
          <div key={nama as string} className={SEL}>
            <p className="text-xs font-black text-[#1C01A5]">{nama}</p>
            <p className="text-2xl font-black text-[#2563EB]">{n}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-lg font-black text-[#1C01A5]">
        5 + 7 = 12, lalu 12 + 8 = <span className="text-[#16A34A]">20</span>
      </p>
    </div>,
    /* 7 Model batang */
    <BatangBanding key="7" a={12} b={7} namaA="Tika" namaB="Malosi" jumlah />,
    /* 8 Tambah atau kurang */
    <TabelPoster
      key="8"
      kolom="1fr 1fr"
      kepala={["Menambah ➕", "Mengurangi ➖"]}
      baris={[
        ["jumlah, semua, digabung", "selisih, sisa"],
        ["memetik lagi, mendapat lagi", "diberikan, dimakan, hilang"],
        ["dia punya lebih banyak", "dia punya lebih sedikit"],
      ]}
    />,
    /* 9 Mencari bilangan awal */
    <div key="9" className="space-y-1">
      <div className="grid grid-cols-2 gap-1 text-center">
        <div className={SEL}>
          <p className="text-xs font-black text-[#1C01A5]/80">Kejadian</p>
          <p className="text-xl font-black text-[#1C01A5]">… − 4 = 12</p>
        </div>
        <div className={SEL}>
          <p className="text-xs font-black text-[#1C01A5]/80">Dibalik</p>
          <p className="text-xl font-black text-[#1C01A5]">12 + 4 = <span className="text-[#16A34A]">16</span></p>
        </div>
      </div>
      <p className="text-center text-xs font-black text-[#1C01A5]/80">Periksa: 16 − 4 = 12. Cocok!</p>
    </div>,
    /* 10 Tips detektif */
    <div key="10" className="grid grid-cols-5 gap-1 text-center">
      {[
        ["📖", "Baca"],
        ["🖍️", "Tandai"],
        ["📏", "Gambar"],
        ["🧮", "Hitung"],
        ["✅", "Periksa"],
      ].map(([ikon, nama]) => (
        <KotakPoster key={nama}>
          <p className="text-2xl" aria-hidden="true">
            {ikon}
          </p>
          <p className="text-[11px] font-black leading-tight text-[#1C01A5]">{nama}</p>
        </KotakPoster>
      ))}
    </div>,
  ];
}

export function InfografisK2B2CKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_C} judul="Soal Cerita" suaraInfo={SUARA_INFO} visual={visualInfografis()} speakGuru={speakGuru} />;
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/** Kalimat dengan kata kunci disorot. */
function Sorotan({ teks, kata }: { teks: string; kata: string }) {
  const i = teks.toLowerCase().indexOf(kata.toLowerCase());
  if (i < 0) return <>{teks}</>;
  return (
    <>
      {teks.slice(0, i)}
      <mark className="rounded bg-[#FFE566] px-0.5 text-[#1C01A5]">{teks.slice(i, i + kata.length)}</mark>
      {teks.slice(i + kata.length)}
    </>
  );
}

/* --------- Permainan 8. Kata Kunci Jadi Tanda ----------------------------- */

const ZONA_TAMBAH = "k2b2c-sort-tambah";
const ZONA_KURANG = "k2b2c-sort-kurang";

function RondeKata({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const daftar = RONDE_KATA_C[ronde];
  const urutan = urutanTetap(daftar.length, ronde === 0 ? 3 : 1);
  const [tambah, setTambah] = useState<number[]>([]);
  const [kurang, setKurang] = useState<number[]>([]);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = urutan.filter((i) => !tambah.includes(i) && !kurang.includes(i));
  const beres = sisa.length === 0;
  useBicara(beres, "Kamu sudah memilih tanda untuk semua kalimat. Baca kata kuncinya dengan teliti, lalu putuskan menambah atau mengurangi.");

  const taruh = (i: number, zona: string | null) => {
    if (zona !== ZONA_TAMBAH && zona !== ZONA_KURANG) return;
    const k = daftar[i];
    const benar = (zona === ZONA_TAMBAH) === (k.tanda === "+");
    if (!benar) {
      setKeliru(i);
      setKabar({ teks: k.alasan, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setDipilih(null);
    ucap(k.alasan);
    if (k.tanda === "+") setTambah((l) => [...l, i]);
    else setKurang((l) => [...l, i]);
    if (sisa.length === 1) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Semua tanda sudah dipilih!" : "Tambah atau kurang?"}
        teks="Baca tiap kalimat, lalu seret kartunya ke kotak tambah atau kotak kurang. Kata yang disorot membantumu. Kamu juga boleh mengetuk kartu, lalu mengetuk kotaknya."
      />
      <div className={KERTAS_ANGKA}>
        <div className="grid gap-2" role="group" aria-label="Kartu kalimat">
          {sisa.map((i) => (
            <BendaSeret key={`${i}-${keliru === i ? "x" : "o"}`} id={`kata-${i}`} label={`Kalimat: ${daftar[i].teks}`} onKetuk={() => setDipilih(dipilih === i ? null : i)} onLepas={(_, x, y) => taruh(i, zonaDi(x, y))} kelas="rounded-2xl">
              <p className={`rounded-2xl border-4 px-3 py-2 text-base font-black leading-snug text-[#1C01A5] ${dipilih === i ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-white"} ${keliru === i ? "igil-goyang" : ""}`}>
                <Sorotan teks={daftar[i].teks} kata={daftar[i].sorot} />
              </p>
            </BendaSeret>
          ))}
          {beres ? <p className="text-center text-base font-black text-[#14532D]">Semua kalimat sudah dipilah</p> : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" data-zona={ZONA_TAMBAH} aria-label={`Kotak tambah, berisi ${tambah.length} kartu`} onClick={() => dipilih !== null && taruh(dipilih, ZONA_TAMBAH)} className="min-h-[7rem] rounded-3xl border-4 border-[#16A34A] bg-[#F0FDF4] px-2 py-2 text-center">
            <span className="block text-4xl font-black text-[#14532D]">+</span>
            <span className="block text-sm font-black text-[#14532D]">Tambah</span>
            <span className="mt-1 block space-y-0.5 text-[11px] font-black leading-tight text-[#14532D]">{tambah.map((i) => <span key={i} className="block">✔ {daftar[i].sorot}</span>)}</span>
          </button>
          <button type="button" data-zona={ZONA_KURANG} aria-label={`Kotak kurang, berisi ${kurang.length} kartu`} onClick={() => dipilih !== null && taruh(dipilih, ZONA_KURANG)} className="min-h-[7rem] rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2 text-center">
            <span className="block text-4xl font-black text-[#831843]">−</span>
            <span className="block text-sm font-black text-[#831843]">Kurang</span>
            <span className="mt-1 block space-y-0.5 text-[11px] font-black leading-tight text-[#831843]">{kurang.map((i) => <span key={i} className="block">✔ {daftar[i].sorot}</span>)}</span>
          </button>
        </div>
        {beres ? <Berhasil>Kata kunci menentukan tanda. Jumlah dan lagi menambah. Selisih, sisa, dan kurangnya mengurangi.</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKataK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kata Kunci Jadi Tanda"
      warna="#BBF7D0"
      petunjuk="Baca tiap kalimat. Seret kartunya ke kotak tambah atau kotak kurang. Kata yang disorot membantumu memutuskan. Jumlah berarti menambah. Selisih dan sisa berarti mengurangi."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-kata"
      jumlahRonde={RONDE_KATA_C.length}
      belumSiap="Pilah semua kalimat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKata ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Laporan Detektif Cerita --------------------------- */

/** Letakkan kunci (indeks 0) di posisi tertentu, sisanya berurutan. */
function tataOpsi(opsi: string[], posisiKunci: number): { teks: string; asli: number }[] {
  const lain = opsi.map((teks, asli) => ({ teks, asli })).filter((x) => x.asli !== 0);
  const hasil: { teks: string; asli: number }[] = [];
  let k = 0;
  for (let p = 0; p < opsi.length; p += 1) hasil.push(p === posisiKunci % opsi.length ? { teks: opsi[0], asli: 0 } : lain[k++]);
  return hasil;
}

function RondeLaporan({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_LAPORAN_C[ronde];
  const ucap = useContext(SuaraCtx);
  const [langkah, setLangkah] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= s.langkah.length;
  const aktif = s.langkah[Math.min(langkah, s.langkah.length - 1)];
  const tampil = tataOpsi(aktif.opsi, ronde + langkah);
  useBicara(beres, `Laporanmu lengkap. Hasilnya ${sebut(s.hasil)}.`);

  const pilih = (posisi: number) => {
    const t = tampil[posisi];
    if (t.asli !== 0) {
      setKeliru(posisi);
      setKabar({ teks: aktif.salah, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    ucap(`${aktif.nama}: ${t.teks}`);
    const baru = langkah + 1;
    setLangkah(baru);
    if (baru >= s.langkah.length) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanPensil pendek={beres ? "Laporan lengkap!" : `Langkah ${langkah + 1}: ${aktif.nama}`} teks={`Laporan detektif cerita. ${s.cerita} Isi laporan dengan memilih jawaban untuk diketahui, ditanya, solusi, dan kesimpulan, satu per satu.`} />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">{s.cerita}</p>
        <div className="space-y-1" aria-label="Laporan">
          {s.langkah.map((l, i) => (
            <div key={l.nama} className={`rounded-2xl border-4 px-3 py-1.5 ${i < langkah ? "border-[#7FCB96] bg-[#E8F7EE]" : i === langkah ? "igil-denyut border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5]/25 bg-white opacity-60"}`}>
              <p className="text-xs font-black uppercase text-[#1C01A5]/70">{l.nama}</p>
              <p className="text-base font-black leading-snug text-[#1C01A5]">{i < langkah ? l.opsi[0] : "…"}</p>
            </div>
          ))}
        </div>
        {!beres ? <PilihanTeks key={langkah} opsi={tampil.map((t) => t.teks)} keliru={keliru} onPilih={pilih} /> : <Berhasil>Laporan lengkap. Hasilnya {s.hasil}.</Berhasil>}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuLaporanK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Laporan Detektif Cerita"
      warna="#FDE68A"
      petunjuk="Baca soal ceritanya. Isi laporan dengan memilih jawaban untuk diketahui, ditanya, solusi, dan kesimpulan. Hati-hati dengan kata lebihnya, karena bisa membuat kita salah memilih tanda."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-laporan"
      jumlahRonde={RONDE_LAPORAN_C.length}
      belumSiap="Lengkapi semua langkah laporan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLaporan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Pencipta Soal Cerita ----------------------------- */

function Pilihan({ daftar, nilai, onPilih, label, tutupi }: { daftar: string[]; nilai: string; onPilih: (s: string) => void; label: string; tutupi?: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{label}</p>
      <div className="grid grid-cols-3 gap-1.5" role="group" aria-label={label}>
        {daftar.map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={nilai === d}
            disabled={tutupi === d}
            onClick={() => onPilih(d)}
            className={`rounded-xl border-4 px-1 py-1.5 text-sm font-black leading-tight text-[#1C01A5] disabled:opacity-30 ${nilai === d ? "border-[#F0AB00] bg-[#FFE566] ring-2 ring-[#F0AB00]" : "border-[#1C01A5] bg-white"}`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

function RondePencipta({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [p, setP] = useState<PilihanCerita>(AWAL_CERITA[ronde]);
  const [fase, setFase] = useState<"susun" | "selesaikan" | "beres">("susun");
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const c = cerita(p);
  useBicara(fase === "beres", `${c.jadi} Sekarang tukar soalmu dengan temanmu, dan mintalah ia menulis diketahui, ditanya, solusi, dan kesimpulan.`);

  const ubah = (bagian: Partial<PilihanCerita>) => {
    setP({ ...p, ...bagian });
    setKabar(null);
  };
  const siap = () => {
    if (!c.valid) {
      setKabar({ teks: c.alasan.join(" "), ok: false });
      return;
    }
    setFase("selesaikan");
    ucap(c.teks);
  };
  const jawab = (n: number) => {
    if (n !== c.hasil) {
      setKeliru(n);
      setKabar({ teks: p.jenis === "tambah" ? `${p.tokohB} punya lebih banyak, jadi bilangan ${p.tokohA} ditambah ${sebut(p.m)}.` : `${p.tokohB} punya lebih sedikit, jadi bilangan ${p.tokohA} dikurangi ${sebut(p.m)}.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setFase("beres");
    letusan.picu();
    onBeres();
  };

  return (
    <>
      <CatatanPensil
        pendek={fase === "beres" ? "Soalmu hebat!" : ronde === 0 ? "Buat soal penjumlahan" : "Buat soal pengurangan"}
        teks={`Pencipta soal cerita. Pilih tokoh, benda, dan bilangan. Soal ${ronde === 0 ? "penjumlahan memakai kata lebihnya" : "pengurangan memakai kata kurangnya"}. Hasilnya tidak boleh lebih dari dua puluh dan tidak boleh kurang dari nol. Setelah soalmu jadi, selesaikan sendiri.`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]" aria-live="polite">
          {c.teks}
        </p>
        {fase === "susun" ? (
          <div className="space-y-2">
            <Pilihan daftar={TOKOH_C} nilai={p.tokohA} onPilih={(s) => ubah({ tokohA: s })} label="Tokoh pertama" tutupi={p.tokohB} />
            <Pilihan daftar={TOKOH_C} nilai={p.tokohB} onPilih={(s) => ubah({ tokohB: s })} label="Tokoh kedua" tutupi={p.tokohA} />
            <Pilihan daftar={BENDA_C} nilai={p.benda} onPilih={(s) => ubah({ benda: s })} label="Benda" />
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Banyak {p.tokohA}</p>
                <Pencacah nilai={p.n} min={BATAS_CERITA.n[0]} max={BATAS_CERITA.n[1]} onUbah={(n) => ubah({ n })} label={`banyak ${p.tokohA}`} />
              </div>
              <div className="space-y-1">
                <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{p.jenis === "tambah" ? "Lebihnya" : "Kurangnya"}</p>
                <Pencacah nilai={p.m} min={BATAS_CERITA.m[0]} max={BATAS_CERITA.m[1]} onUbah={(m) => ubah({ m })} label={p.jenis === "tambah" ? "lebihnya" : "kurangnya"} />
              </div>
            </div>
            {!c.valid ? <p className="rounded-xl bg-[#FDECEC] px-2 py-1 text-center text-sm font-black text-[#7F1D1D]">{c.alasan.join(" ")}</p> : null}
            <button type="button" onClick={siap} className={`${TOMBOL_BESAR} w-full`}>
              ✔ Soalku sudah siap
            </button>
          </div>
        ) : null}
        {fase === "selesaikan" ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Selesaikan soalmu. Berapa {p.benda} milik {p.tokohB}?</p>
            <PilihanAngka opsi={opsiB2(c.hasil)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {fase === "beres" ? (
          <div className="space-y-1">
            {[
              ["Diketahui", c.diketahui],
              ["Ditanya", c.ditanya],
              ["Solusi", c.solusi],
              ["Kesimpulan", c.jadi],
            ].map(([nama, isi]) => (
              <div key={nama} className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-3 py-1.5">
                <p className="text-xs font-black uppercase text-[#14532D]/70">{nama}</p>
                <p className="text-base font-black leading-snug text-[#14532D]">{isi}</p>
              </div>
            ))}
            <Berhasil>Tukar soalmu dengan temanmu, lalu mintalah ia menyelesaikannya dengan empat langkah.</Berhasil>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuPenciptaK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pencipta Soal Cerita"
      warna="#C7D2FE"
      petunjuk="Buat soal ceritamu sendiri. Pilih tokoh, benda, dan bilangan. Hasilnya tidak boleh lebih dari dua puluh dan tidak boleh kurang dari nol. Setelah soalmu jadi, selesaikan sendiri, lalu tukarkan dengan temanmu."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-pencipta"
      jumlahRonde={AWAL_CERITA.length}
      belumSiap="Buat soalmu dan selesaikan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePencipta ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahBurungK2B2C {...d} /> },
  { nomor: 2, render: (d) => <LangkahDonatK2B2C {...d} /> },
  { nomor: 3, render: (d) => <LangkahJerukK2B2C {...d} /> },
  { nomor: 4, render: (d) => <LangkahBonekaK2B2C {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuModelK2B2C {...d} /> },
  { nomor: 6, render: (d) => <KartuAlurK2B2C {...d} /> },
  { nomor: 7, render: (d) => <KartuPanahK2B2C {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuKataK2B2C {...d} /> },
  { nomor: 9, render: (d) => <KartuLaporanK2B2C {...d} /> },
  { nomor: 10, render: (d) => <KartuPenciptaK2B2C {...d} /> },
];

export function ConcreteK2B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Pegang, seret, dan gabungkan!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan susun", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B2C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_C} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB C ➡️" />}
    />
  );
}
