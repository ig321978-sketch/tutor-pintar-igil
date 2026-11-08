"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BingkaiGanda, MERAH_B5, sebut } from "./belas-a5-dasar";
import { kalimatBanyak } from "./perbandingan-d5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab D, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Bingkai sepuluh polos dan garis bilangan. Anak melengkapi kalimat, memilih  */
/* gambar, dan menaruh bilangan pada garis. Anak tidak memindahkan benda.     */
/*  5 Lengkapi Kalimat (banyak atau sedikit)                                  */
/*  6 Gambar Mana? (paling banyak dan paling sedikit)                         */
/*  7 Letakkan di Garis Bilangan (menaruh bilangan lalu mencari yang terbesar) */
/* ------------------------------------------------------------------------ */

const tombolPilih = "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]";

/* --------- Permainan 5. Lengkapi Kalimat ---------------------------------- */

const RONDE_KALIMAT: { a: number; b: number }[] = [
  { a: 15, b: 11 },
  { a: 12, b: 17 },
  { a: 14, b: 10 },
  { a: 13, b: 16 },
];

type KataJumlah = "banyak" | "sedikit";

function RondeKalimat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_KALIMAT[ronde];
  const akhir = ronde === RONDE_KALIMAT.length - 1;
  const benar1: KataJumlah = d.a > d.b ? "banyak" : "sedikit";
  const benar2: KataJumlah = d.b > d.a ? "banyak" : "sedikit";
  const [jawab1, setJawab1] = useState<KataJumlah | null>(null);
  const [jawab2, setJawab2] = useState<KataJumlah | null>(null);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = jawab1 !== null && jawab2 !== null;
  const suara = panel.suara["d5-kalimat"] === true && akhir;
  useBicara(akhir ? suara : beres, `${kalimatBanyak(d.a, d.b)}, dan ${kalimatBanyak(d.b, d.a)}. Gambar ${d.a > d.b ? "A" : "B"} lebih banyak.`);

  const pilih = (kalimat: 1 | 2, kata: KataJumlah) => {
    const benar = kalimat === 1 ? benar1 : benar2;
    if ((kalimat === 1 && jawab1) || (kalimat === 2 && jawab2)) return;
    if (kata !== benar) {
      setKeliru(`${kalimat}-${kata}`);
      setKabar({ teks: "Hitung titik di gambar A dan gambar B, lalu bandingkan banyaknya. Gambar yang titiknya lebih banyak, itulah yang lebih banyak.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    const baru1 = kalimat === 1 ? kata : jawab1;
    const baru2 = kalimat === 2 ? kata : jawab2;
    if (kalimat === 1) setJawab1(kata);
    else setJawab2(kata);
    if (baru1 !== null && baru2 !== null) {
      letusan.picu();
      onBeres();
    }
  };

  const baris = (kalimat: 1 | 2, awal: string, akhirKata: string, jawab: KataJumlah | null) => (
    <div className="space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
      <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
        {awal} lebih <span className="inline-block min-w-[5rem] rounded-lg border-b-4 border-[#1C01A5] bg-[#FFF7CC] px-1">{jawab ?? "..."}</span> {akhirKata}
      </p>
      {jawab === null ? (
        <div className="grid grid-cols-2 gap-2">
          {(["banyak", "sedikit"] as KataJumlah[]).map((k) => (
            <button
              key={`${k}-${keliru === `${kalimat}-${k}` ? "x" : "o"}`}
              type="button"
              aria-label={`Kalimat ${kalimat}: ${k}`}
              onClick={() => pilih(kalimat, k)}
              className={`${tombolPilih} ${keliru === `${kalimat}-${k}` ? "igil-goyang" : ""}`}
            >
              {k}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling banyak" : suara ? "Hebat!" : beres ? "Kalimatmu lengkap!" : "Lengkapi kalimatnya"}
        teks={`Lihat dua gambar bingkai sepuluh. Hitung titik di gambar A dan gambar B. Lalu lengkapi kedua kalimat dengan kata banyak atau sedikit.${akhir ? " Di akhir, ucapkan banyak titik pada gambar yang lebih banyak." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">Gambar A</p>
            <BingkaiGanda isi={d.a} sepuluhDulu={false} kelas="h-16 w-full max-w-[200px]" />
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">Gambar B</p>
            <BingkaiGanda isi={d.b} sepuluhDulu={false} kelas="h-16 w-full max-w-[200px]" />
          </div>
        </div>
        {baris(1, "Titik di gambar A", "dari gambar B.", jawab1)}
        {baris(2, "Titik di gambar B", "dari gambar A.", jawab2)}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "A dan B: ? dan ?" : `A: ${d.a} • B: ${d.b}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKalimat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KALIMAT[RONDE_KALIMAT.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lengkapi Kalimat"
      warna="#BFDBFE"
      petunjuk="Hitung titik di gambar A dan gambar B. Lengkapi dua kalimat dengan kata banyak atau sedikit. Kalau titik di gambar A lebih banyak, maka titik di gambar B lebih sedikit. Pada soal terakhir, ucapkan banyak titik pada gambar yang lebih banyak."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-kalimat"
      jumlahRonde={RONDE_KALIMAT.length}
      kunciAkhir={Math.max(terakhir.a, terakhir.b)}
      belumSiap="Lengkapi kedua kalimat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKalimat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Gambar Mana? -------------------------------------- */

const RONDE_GAMBAR: { ns: number[] }[] = [{ ns: [17, 11, 14] }, { ns: [13, 19, 12] }, { ns: [15, 10, 18] }];
const HURUF3 = ["A", "B", "C"];

function RondeGambar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_GAMBAR[ronde];
  const akhir = ronde === RONDE_GAMBAR.length - 1;
  const iMaks = d.ns.indexOf(Math.max(...d.ns));
  const iMin = d.ns.indexOf(Math.min(...d.ns));
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [jawabMaks, setJawabMaks] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["d5-gambar"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Gambar ${HURUF3[iMaks]} paling banyak, yaitu ${sebut(d.ns[iMaks])}. Gambar ${HURUF3[iMin]} paling sedikit, yaitu ${sebut(d.ns[iMin])}.`
  );

  const pilih = (i: number) => {
    if (beres) return;
    const benar = tahap === 0 ? iMaks : iMin;
    if (i !== benar) {
      setKeliru(i);
      setKabar({ teks: `Hitung titik di setiap gambar. Cari gambar yang titiknya paling ${tahap === 0 ? "banyak" : "sedikit"}.`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    if (tahap === 0) {
      setJawabMaks(i);
      setTahap(1);
    } else {
      setBeres(true);
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling banyak" : suara ? "Hebat!" : beres ? "Pilihanmu tepat!" : tahap === 0 ? "Gambar mana yang paling banyak?" : "Gambar mana yang paling sedikit?"}
        teks={`Ada tiga gambar bingkai sepuluh. Hitung titik di setiap gambar. Pertama, pilih gambar yang titiknya paling banyak. Kedua, pilih gambar yang titiknya paling sedikit.${akhir ? " Di akhir, ucapkan banyak titik pada gambar yang paling banyak." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-3 gap-1.5">
          {d.ns.map((n, i) => (
            <div key={i} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-center text-sm font-black text-[#1C01A5]">Gambar {HURUF3[i]}</p>
              <BingkaiGanda isi={n} sepuluhDulu={false} kelas="h-14 w-full" />
            </div>
          ))}
        </div>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Benda di gambar{" "}
          <span className="inline-block min-w-[2rem] rounded-lg border-b-4 border-[#1C01A5] bg-[#FFF7CC] px-1">{tahap === 1 || beres ? HURUF3[iMaks] : "..."}</span> paling banyak.
          <br />
          Benda di gambar{" "}
          <span className="inline-block min-w-[2rem] rounded-lg border-b-4 border-[#1C01A5] bg-[#FFF7CC] px-1">{beres ? HURUF3[iMin] : "..."}</span> paling sedikit.
        </p>
        {!beres ? (
          <div className="space-y-1">
            <p className="text-center text-sm font-black text-[#1C01A5]/80">{tahap === 0 ? "Pilih gambar yang paling banyak" : "Sekarang pilih gambar yang paling sedikit"}</p>
            <div className="grid grid-cols-3 gap-2">
              {HURUF3.map((h, i) => (
                <button
                  key={`${h}-${keliru === i ? "x" : "o"}`}
                  type="button"
                  disabled={tahap === 1 && jawabMaks === i}
                  aria-label={`Pilih gambar ${h}`}
                  onClick={() => pilih(i)}
                  className={`${tombolPilih} text-3xl disabled:opacity-40 ${keliru === i ? "igil-goyang" : ""}`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? "Urutannya: ?" : d.ns.map((n, i) => `${HURUF3[i]}: ${n}`).join(" • ")}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuGambar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_GAMBAR[RONDE_GAMBAR.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Gambar Mana?"
      warna="#FDE68A"
      petunjuk="Ada tiga gambar bingkai sepuluh. Hitung titik di setiap gambar. Pilih gambar yang paling banyak, lalu pilih gambar yang paling sedikit. Pada soal terakhir, ucapkan banyak titik pada gambar yang paling banyak."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-gambar"
      jumlahRonde={RONDE_GAMBAR.length}
      kunciAkhir={Math.max(...terakhir.ns)}
      belumSiap="Pilih gambarnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGambar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Letakkan di Garis Bilangan ------------------------ */

const RONDE_LETAK: { ns: number[] }[] = [{ ns: [13, 11, 18] }, { ns: [15, 19, 12] }, { ns: [14, 10, 17] }];
const XL = (n: number) => 16 + (n - 10) * 26.8;

function RondeLetak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_LETAK[ronde];
  const akhir = ronde === RONDE_LETAK.length - 1;
  const terbesar = Math.max(...d.ns);
  const [terpasang, setTerpasang] = useState<number[]>([]);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = terpasang.length === d.ns.length;
  const suara = panel.suara["d5-garis"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Bilangan di sebelah kanan lebih besar. Dari kiri ke kanan: ${terpasang.slice().sort((a, b) => a - b).map(sebut).join(", ")}. Bilangan terbesar adalah ${sebut(terbesar)}.`
  );

  const taruh = (n: number) => {
    if (terpilih === null || beres || semua) {
      if (terpilih === null && !semua) setKabar({ teks: "Pilih dulu satu kartu bilangan di bawah, lalu ketuk tempatnya di garis bilangan.", ok: false });
      return;
    }
    if (n !== terpilih) {
      setGoyang(n);
      setKabar({ teks: `Bilangan ${sebut(terpilih)} bukan di sini. Mulai dari sepuluh, hitung maju satu per satu ke kanan sampai ${sebut(terpilih)}.`, ok: false });
      return;
    }
    setTerpasang([...terpasang, terpilih]);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
  };

  const ketukBendera = (n: number) => {
    if (!semua || beres) return;
    if (n === terbesar) {
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setGoyang(n);
      setKabar({ teks: "Bilangan yang paling besar ada paling kanan di garis bilangan.", ok: false });
    }
  };

  const kartuSisa = d.ns.filter((n) => !terpasang.includes(n));

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: yang terbesar" : suara ? "Hebat!" : beres ? "Garismu benar!" : semua ? "Ketuk bilangan terbesar" : "Letakkan bilangan di garis"}
        teks={`Pilih satu kartu bilangan, lalu ketuk tempatnya di garis bilangan. Setelah ketiganya ada di garis, ketuk bendera bilangan yang paling besar. Ingat, makin ke kanan makin besar.${akhir ? " Di akhir, ucapkan bilangan yang terbesar." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 120" className="block h-auto w-full" role="group" aria-label="Garis bilangan 10 sampai 20">
          <path d="M6 84 H294 M288 78 L294 84 L288 90" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: 11 }, (_, i) => {
            const n = 10 + i;
            const ada = terpasang.includes(n);
            return (
              <g
                key={`${n}-${goyang === n ? "x" : "o"}`}
                role="button"
                tabIndex={semua ? -1 : 0}
                aria-label={ada ? `Bilangan ${n}, bendera terpasang` : `Tempat bilangan ${n}`}
                onClick={() => (ada ? ketukBendera(n) : taruh(n))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (ada) ketukBendera(n);
                    else taruh(n);
                  }
                }}
                className={goyang === n ? "igil-goyang" : ""}
                style={{ cursor: beres ? "default" : "pointer", outline: "none" }}
              >
                <rect x={XL(n) - 13} y="20" width="26" height="96" fill="transparent" />
                <path d={`M${XL(n)} ${ada ? 74 : 78} V92`} stroke={BIRU} strokeWidth={ada ? 3.4 : 2.2} strokeLinecap="round" />
                <text x={XL(n)} y="110" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={n === 10 || n === 20 ? MERAH_B5 : BIRU}>
                  {n}
                </text>
                {ada ? (
                  <g className="igil-muncul">
                    <path d={`M${XL(n)} 74 V48`} stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
                    <circle cx={XL(n)} cy="34" r="15" fill={beres && n === terbesar ? "#FFE566" : "#BFDBFE"} stroke={BIRU} strokeWidth="3" />
                    <text x={XL(n)} y="40" textAnchor="middle" fontSize="16" fontWeight="900" fill={BIRU}>
                      {n}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
        {!semua ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {kartuSisa.map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Kartu bilangan ${n}`}
                onClick={() => {
                  setTerpilih(n);
                  setKabar(null);
                }}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white text-3xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${
                  terpilih === n ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        ) : null}
        {semua && !beres ? <p className="text-center text-base font-black text-[#1C01A5]">Ketuk bendera bilangan yang paling besar</p> : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Terkecil ke terbesar: ?" : `Terkecil ke terbesar: ${d.ns.slice().sort((a, b) => a - b).join(", ")}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuLetak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_LETAK[RONDE_LETAK.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Letakkan di Garis Bilangan"
      warna="#FBCFE8"
      petunjuk="Pilih satu kartu bilangan, lalu ketuk tempatnya di garis bilangan. Setelah ketiga bilangan ada di garis, ketuk bendera bilangan yang paling besar. Bilangan yang lebih ke kanan lebih besar. Pada soal terakhir, ucapkan bilangan yang terbesar."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-garis"
      jumlahRonde={RONDE_LETAK.length}
      kunciAkhir={Math.max(...terakhir.ns)}
      belumSiap="Letakkan bilangannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLetak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
