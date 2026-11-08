"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { PilihKata } from "./ukur-7-dasar";
import { TabelMenurun } from "./data-8-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab B, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Diagram gambar memakai lingkaran polos, nama ditulis sebagai kata. Anak    */
/* mewarnai, memilih, dan menemukan yang tidak cocok.                         */
/*  5 Warnai Diagram Gambar (mewarnai lingkaran dari kotak pertama)           */
/*  6 Baca Diagram (memilih angka dan kata dari diagram)                      */
/*  7 Temukan yang Tidak Cocok (menandai kolom yang salah, lalu memperbaiki)  */
/* ------------------------------------------------------------------------ */

type Kategori = { nama: string; n: number };

const WARNA_KOLOM = ["#FDE047", "#FB923C", "#4ADE80", "#60A5FA", "#F9A8D4"];

/** Diagram gambar polos. `terisi` menentukan lingkaran yang diwarnai. Tegak: kolom naik. Mendatar: baris ke samping. */
function DiagramPolos({
  arah,
  kategori,
  maks,
  terisi,
  onKetuk,
  sorot = -1,
  kecil = false,
}: {
  arah: "tegak" | "mendatar";
  kategori: Kategori[];
  maks: number;
  terisi: number[];
  onKetuk?: (k: number, j: number) => void;
  sorot?: number;
  kecil?: boolean;
}) {
  const sel = kecil ? "h-7 w-7" : "h-8 w-8";
  const bulat = kecil ? "h-5 w-5" : "h-6 w-6";
  const sisi = `${sel} flex items-center justify-center border border-[#C4B5FD] bg-white`;
  const tanda = (k: number, j: number) => {
    const isi = j < terisi[k];
    const isiSel = (
      <span className={`block rounded-full border-2 ${bulat} ${isi ? "border-[#1C01A5]" : "border-transparent"} ${isi ? "igil-muncul" : ""}`} style={{ backgroundColor: isi ? WARNA_KOLOM[k % WARNA_KOLOM.length] : "transparent" }} />
    );
    return onKetuk ? (
      <button key={j} type="button" aria-label={`Kotak ${kategori[k].nama} ke-${j + 1}${isi ? ", sudah diwarnai" : ""}`} onClick={() => onKetuk(k, j)} className={sisi}>
        {isiSel}
      </button>
    ) : (
      <span key={j} className={sisi}>
        {isiSel}
      </span>
    );
  };
  if (arah === "tegak") {
    return (
      <div className="flex items-end justify-center gap-1" role="img" aria-label={`Diagram gambar tegak: ${kategori.map((c, i) => `${c.nama} ${terisi[i]}`).join(", ")}`}>
        <div className="flex flex-col-reverse">
          {Array.from({ length: maks }, (_, j) => (
            <span key={j} className={`${sel} flex items-center justify-center rounded-md bg-[#E9D8F3] text-xs font-black text-[#1C01A5]`}>
              {j + 1}
            </span>
          ))}
        </div>
        {kategori.map((c, k) => (
          <div key={c.nama} className={`rounded-md ${sorot === k ? "ring-4 ring-[#F0AB00]" : ""}`}>
            <div className="flex flex-col-reverse">{Array.from({ length: maks }, (_, j) => tanda(k, j))}</div>
            <p className={`${kecil ? "w-[3.9rem]" : "w-[4.4rem]"} bg-[#E9D8F3] py-0.5 text-center text-[10px] font-black leading-tight text-[#1C01A5]`}>{c.nama}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-0.5" role="img" aria-label={`Diagram gambar mendatar: ${kategori.map((c, i) => `${c.nama} ${terisi[i]}`).join(", ")}`}>
      {kategori.map((c, k) => (
        <div key={c.nama} className={`flex items-center justify-center gap-0.5 rounded-md ${sorot === k ? "ring-4 ring-[#F0AB00]" : ""}`}>
          <p className="w-[4.6rem] shrink-0 rounded-md bg-[#E9D8F3] px-1 py-1 text-center text-[10px] font-black leading-tight text-[#1C01A5]">{c.nama}</p>
          <div className="flex">{Array.from({ length: maks }, (_, j) => tanda(k, j))}</div>
        </div>
      ))}
      <div className="flex items-center justify-center gap-0.5">
        <span className="w-[4.6rem] shrink-0" />
        <div className="flex">
          {Array.from({ length: maks }, (_, j) => (
            <span key={j} className={`${sel} flex items-center justify-center rounded-md bg-[#E9D8F3] text-xs font-black text-[#1C01A5]`}>
              {j + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------- Permainan 5. Warnai Diagram Gambar ------------------------------ */

type RondeWarnai = { arah: "tegak" | "mendatar"; judul: string; kategori: Kategori[]; maks: number };

const RONDE_WARNAI: RondeWarnai[] = [
  {
    arah: "tegak",
    judul: "Sayur Kesukaan",
    maks: 4,
    kategori: [
      { nama: "Jagung", n: 3 },
      { nama: "Wortel", n: 4 },
      { nama: "Brokoli", n: 3 },
      { nama: "Kol", n: 2 },
    ],
  },
  {
    arah: "mendatar",
    judul: "Hewan Pak Budi",
    maks: 5,
    kategori: [
      { nama: "Ayam", n: 4 },
      { nama: "Bebek", n: 2 },
      { nama: "Kelinci", n: 5 },
    ],
  },
  {
    arah: "tegak",
    judul: "Buah Ibu",
    maks: 6,
    kategori: [
      { nama: "Jeruk", n: 6 },
      { nama: "Apel", n: 3 },
      { nama: "Mangga", n: 4 },
      { nama: "Belimbing", n: 5 },
    ],
  },
];

function RondeWarnaiDiagram({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_WARNAI[ronde];
  const akhir = ronde === RONDE_WARNAI.length - 1;
  const total = d.kategori.reduce((a, b) => a + b.n, 0);
  const [terisi, setTerisi] = useState<number[]>(() => d.kategori.map(() => 0));
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terisi.every((v, k) => v === d.kategori[k].n);
  const suara = panel.suara["b8-warnai"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.kategori.map((c) => `${c.nama} ${sebut(c.n)}`).join(", ")}. Setiap lingkaran mewakili satu.${akhir ? ` Jumlah semuanya ${sebut(total)}.` : ""}`);

  const ketuk = (k: number, j: number) => {
    if (beres) return;
    const c = d.kategori[k];
    if (j === terisi[k]) {
      if (terisi[k] >= c.n) {
        setKabar({ teks: `Data ${c.nama} hanya ${sebut(c.n)}. Jangan mewarnai lebih dari datanya.`, ok: false });
        return;
      }
      const baru = terisi.slice();
      baru[k] += 1;
      setTerisi(baru);
      setKabar(null);
      if (baru.every((v, i) => v === d.kategori[i].n)) {
        letusan.picu();
        onBeres();
      }
    } else if (j === terisi[k] - 1) {
      const baru = terisi.slice();
      baru[k] -= 1;
      setTerisi(baru);
      setKabar(null);
    } else if (j > terisi[k]) {
      setKabar({ teks: `Warnai mulai dari kotak pertama dan jangan ada yang terlewat. Kotak berikutnya untuk ${c.nama} adalah yang ke-${terisi[k] + 1}.`, ok: false });
    } else {
      setKabar({ teks: "Ketuk lingkaran yang paling ujung untuk menghapusnya.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Diagrammu lengkap!" : "Warnai sesuai data"}
        teks={`Warnai lingkaran sesuai banyak data pada tabel. Satu lingkaran mewakili satu. Mulai dari kotak pertama dan jangan ada yang terlewat. Ketuk lingkaran paling ujung untuk menghapusnya.${akhir ? " Di akhir, ucapkan jumlah semua data." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <TabelMenurun judul={`Tabel ${d.judul}`} kepala={["Nama", "Banyaknya"]} baris={d.kategori.map((c) => [c.nama, c.n])} kecil />
        <p className="text-center text-sm font-black text-[#1C01A5]">Diagram {d.judul} • 1 lingkaran = 1</p>
        <DiagramPolos arah={d.arah} kategori={d.kategori} maks={d.maks} terisi={terisi} onKetuk={ketuk} />
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua data = ?" : `Diagram sudah sesuai tabel`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuWarnai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_WARNAI[RONDE_WARNAI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Diagram Gambar"
      warna="#FDE68A"
      petunjuk="Membuat diagram gambar dari tabel. Warnai lingkaran sesuai banyak data, mulai dari kotak pertama dan tanpa ada yang terlewat. Satu lingkaran mewakili satu. Pada soal terakhir, ucapkan jumlah semua data."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-warnai"
      jumlahRonde={RONDE_WARNAI.length}
      kunciAkhir={terakhir.kategori.reduce((a, b) => a + b.n, 0)}
      belumSiap="Warnai diagramnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarnaiDiagram ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Baca Diagram --------------------------------------- */

type TanyaDiagram = { teks: string; tipe: "angka" | "kata"; jawab: number | string; bantu: string };
type RondeBaca = { arah: "tegak" | "mendatar"; judul: string; kategori: Kategori[]; maks: number; tanya: [TanyaDiagram, TanyaDiagram] };

const RONDE_BACA_DIAGRAM: RondeBaca[] = [
  {
    arah: "tegak",
    judul: "Sayur Kesukaan",
    maks: 4,
    kategori: [
      { nama: "Jagung", n: 3 },
      { nama: "Wortel", n: 4 },
      { nama: "Brokoli", n: 3 },
      { nama: "Kol", n: 2 },
    ],
    tanya: [
      { teks: "Berapa anak yang suka wortel?", tipe: "angka", jawab: 4, bantu: "Hitung lingkaran pada kolom Wortel dari bawah sampai atas." },
      { teks: "Sayur apa yang paling disukai?", tipe: "kata", jawab: "Wortel", bantu: "Cari kolom yang paling tinggi." },
    ],
  },
  {
    arah: "mendatar",
    judul: "Mainan Kesukaan",
    maks: 5,
    kategori: [
      { nama: "Kelereng", n: 5 },
      { nama: "Mobil-mobilan", n: 4 },
      { nama: "Boneka", n: 2 },
      { nama: "Gasing", n: 3 },
    ],
    tanya: [
      { teks: "Berapa anak yang suka gasing?", tipe: "angka", jawab: 3, bantu: "Hitung lingkaran pada baris Gasing dari kiri ke kanan." },
      { teks: "Mainan apa yang paling sedikit disukai?", tipe: "kata", jawab: "Boneka", bantu: "Cari baris yang paling pendek." },
    ],
  },
  {
    arah: "tegak",
    judul: "Kue Kesukaan",
    maks: 6,
    kategori: [
      { nama: "Talam", n: 5 },
      { nama: "Cucur", n: 3 },
      { nama: "Lapis", n: 5 },
      { nama: "Bugis", n: 6 },
    ],
    tanya: [
      { teks: "Kue apa yang paling disukai?", tipe: "kata", jawab: "Bugis", bantu: "Cari kolom yang paling tinggi." },
      { teks: "Berapa anak yang suka kue cucur?", tipe: "angka", jawab: 3, bantu: "Hitung lingkaran pada kolom Cucur dari bawah sampai atas." },
    ],
  },
];

function RondeBacaDiagram({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BACA_DIAGRAM[ronde];
  const akhir = ronde === RONDE_BACA_DIAGRAM.length - 1;
  const total = d.kategori.reduce((a, b) => a + b.n, 0);
  const [langkah, setLangkah] = useState(0);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [salahKata, setSalahKata] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 2;
  const suara = panel.suara["b8-baca-diagram"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.tanya.map((t) => `${t.teks.replace("?", "")} ${typeof t.jawab === "number" ? sebut(t.jawab) : t.jawab}`).join(". ")}.${akhir ? ` Jumlah semua anak ${sebut(total)}.` : ""}`);

  const t = d.tanya[Math.min(langkah, 1)];

  const maju = () => {
    setKabar(null);
    const berikut = langkah + 1;
    setLangkah(berikut);
    if (berikut >= 2) {
      letusan.picu();
      onBeres();
    }
  };

  const pilihAngka = (v: number) => {
    if (beres || t.tipe !== "angka") return;
    if (v === t.jawab) {
      setSalahAngka(null);
      maju();
    } else {
      setSalahAngka(v);
      setKabar({ teks: t.bantu, ok: false });
    }
  };
  const pilihKata = (s: string) => {
    if (beres || t.tipe !== "kata") return;
    if (s === t.jawab) {
      setSalahKata(null);
      maju();
    } else {
      setSalahKata(s);
      setKabar({ teks: t.bantu, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Bacaanmu tepat!" : "Baca diagramnya"}
        teks={`Baca diagramnya. Satu lingkaran mewakili satu anak. Jawab pertanyaannya satu per satu.${akhir ? " Di akhir, ucapkan jumlah semua anak." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-sm font-black text-[#1C01A5]">Diagram {d.judul} • 1 lingkaran = 1 anak</p>
        <DiagramPolos arah={d.arah} kategori={d.kategori} maks={d.maks} terisi={d.kategori.map((c) => c.n)} />
        {!beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {langkah + 1}. {t.teks}
            </p>
            {t.tipe === "angka" ? (
              <PilihAngka opsi={opsiSekitar(t.jawab as number)} keliru={salahAngka} onPilih={pilihAngka} />
            ) : (
              <PilihKata opsi={d.kategori.map((c) => c.nama)} keliru={salahKata} onPilih={pilihKata} kolom={d.kategori.length > 3 ? 2 : 3} kecil />
            )}
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua anak = ?" : d.tanya.map((q) => q.jawab).join(" • ")}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBacaDiagram({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_BACA_DIAGRAM[RONDE_BACA_DIAGRAM.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Baca Diagram"
      warna="#BBF7D0"
      petunjuk="Membaca diagram gambar tegak dan mendatar. Hitung lingkaran pada kolom atau baris, lalu pilih jawaban. Yang paling tinggi atau paling panjang berarti paling banyak. Pada soal terakhir, ucapkan jumlah semua anak."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-baca-diagram"
      jumlahRonde={RONDE_BACA_DIAGRAM.length}
      kunciAkhir={terakhir.kategori.reduce((a, b) => a + b.n, 0)}
      belumSiap="Baca dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBacaDiagram ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Temukan yang Tidak Cocok --------------------------- */

type RondeSalah = { arah: "tegak" | "mendatar"; judul: string; tabel: Kategori[]; diagram: number[]; maks: number; salah: number };

const RONDE_SALAH: RondeSalah[] = [
  {
    arah: "tegak",
    judul: "Sayur Kesukaan",
    maks: 4,
    tabel: [
      { nama: "Jagung", n: 3 },
      { nama: "Wortel", n: 4 },
      { nama: "Brokoli", n: 3 },
      { nama: "Kol", n: 2 },
    ],
    diagram: [3, 4, 3, 3],
    salah: 3,
  },
  {
    arah: "mendatar",
    judul: "Mainan Kesukaan",
    maks: 5,
    tabel: [
      { nama: "Kelereng", n: 5 },
      { nama: "Mobil-mobilan", n: 4 },
      { nama: "Boneka", n: 2 },
      { nama: "Gasing", n: 3 },
    ],
    diagram: [5, 3, 2, 3],
    salah: 1,
  },
  {
    arah: "tegak",
    judul: "Karet Gelang",
    maks: 5,
    tabel: [
      { nama: "Malosi", n: 5 },
      { nama: "Halim", n: 3 },
      { nama: "Upe", n: 4 },
    ],
    diagram: [5, 3, 5],
    salah: 2,
  },
];

function RondeTemukanSalah({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_SALAH[ronde];
  const akhir = ronde === RONDE_SALAH.length - 1;
  const total = d.tabel.reduce((a, b) => a + b.n, 0);
  const [langkah, setLangkah] = useState(0);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 2;
  const nama = d.tabel[d.salah].nama;
  const benar = d.tabel[d.salah].n;
  const suara = panel.suara["b8-temukan-salah"] === true && akhir;
  useBicara(akhir ? suara : beres, `Kolom ${nama} salah. Menurut tabel, ${nama} ada ${sebut(benar)}.${akhir ? ` Jumlah semua data ${sebut(total)}.` : ""}`);

  const pilihKolom = (k: number) => {
    if (langkah !== 0) return;
    if (k === d.salah) {
      setKabar(null);
      setLangkah(1);
    } else {
      setKabar({ teks: `${d.tabel[k].nama} sudah sama dengan tabel. Cari yang banyak gambarnya berbeda dengan angka pada tabel.`, ok: false });
    }
  };
  const pilihAngka = (v: number) => {
    if (langkah !== 1) return;
    if (v === benar) {
      setSalahAngka(null);
      setKabar(null);
      setLangkah(2);
      letusan.picu();
      onBeres();
    } else {
      setSalahAngka(v);
      setKabar({ teks: `Lihat tabel. Banyaknya ${nama} tertulis pada baris ${nama}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Kesalahanmu ditemukan!" : langkah === 0 ? "Cari yang tidak cocok" : "Berapa yang benar?"}
        teks={`Bandingkan diagram dengan tabel. Ketuk kolom atau baris yang banyak gambarnya tidak cocok dengan tabel, lalu pilih banyak yang benar.${akhir ? " Di akhir, ucapkan jumlah semua data." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <TabelMenurun judul={`Tabel ${d.judul}`} kepala={["Nama", "Banyaknya"]} baris={d.tabel.map((c) => [c.nama, c.n])} kecil />
        <p className="text-center text-sm font-black text-[#1C01A5]">Diagram {d.judul}. Ketuk yang tidak cocok.</p>
        <div className="space-y-1">
          <DiagramPolos
            arah={d.arah}
            kategori={d.tabel.map((c, k) => ({ nama: c.nama, n: d.diagram[k] }))}
            maks={d.maks}
            terisi={d.diagram}
            sorot={langkah >= 1 ? d.salah : -1}
            kecil
          />
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {d.tabel.map((c, k) => (
              <button
                key={c.nama}
                type="button"
                aria-label={`Tandai ${d.arah === "tegak" ? "kolom" : "baris"} ${c.nama}`}
                onClick={() => pilihKolom(k)}
                disabled={langkah !== 0}
                className={`rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#1C01A5] disabled:opacity-60 ${langkah >= 1 && k === d.salah ? "bg-[#FECACA]" : "bg-[#FFE566]"}`}
              >
                {c.nama}
              </button>
            ))}
          </div>
        </div>
        {langkah === 1 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Banyaknya {nama} yang benar = ?</p>
            <PilihAngka opsi={opsiSekitar(benar)} keliru={salahAngka} onPilih={pilihAngka} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua data = ?" : `${nama} seharusnya ${benar}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTemukanSalah({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_SALAH[RONDE_SALAH.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Temukan yang Tidak Cocok"
      warna="#C7D2FE"
      petunjuk="Memeriksa diagram dengan tabel. Satu kolom atau baris pada diagram tidak cocok dengan tabel. Ketuk yang salah, lalu pilih banyak yang benar. Pada soal terakhir, ucapkan jumlah semua data."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-temukan-salah"
      jumlahRonde={RONDE_SALAH.length}
      kunciAkhir={terakhir.tabel.reduce((a, b) => a + b.n, 0)}
      belumSiap="Temukan yang salah dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTemukanSalah ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
