"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import {
  BIRU_B5,
  BingkaiGanda,
  Ikatan,
  LEBAR_BINGKAI,
  MERAH_B5,
  RangkaBingkai,
  TINGGI_BINGKAI,
  posisiSel,
  sebut,
} from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab A, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Bingkai sepuluh, bagan pasangan bilangan, dan garis bilangan. Anak          */
/* mewarnai, menjodohkan, dan melompat. Anak tidak memindahkan benda.         */
/*  5 Warnai Dua Bingkai Sepuluh (mewarnai)                                   */
/*  6 Jodohkan Gambar dan Pasangan Bilangan (menjodohkan diagram)             */
/*  7 Loncat di Garis Bilangan (melompat dari 10)                             */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Warnai Dua Bingkai Sepuluh ------------------------ */

const RONDE_WARNA = [13, 16, 19];

function RondeWarna({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_WARNA[ronde];
  const akhir = ronde === RONDE_WARNA.length - 1;
  const [terisi, setTerisi] = useState<boolean[]>(() => Array.from({ length: 20 }, () => false));
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const jumlah = terisi.filter(Boolean).length;
  const suara = panel.suara["a5-warna"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Kamu mewarnai ${sebut(n)} bulatan. Bingkai pertama penuh, isinya sepuluh. Bingkai kedua berisi ${sebut(n - 10)}. Sepuluh ditambah ${sebut(n - 10)} menjadi ${sebut(n)}.`
  );

  const ketuk = (i: number) => {
    if (beres) return;
    const baru = terisi.slice();
    baru[i] = !baru[i];
    setTerisi(baru);
    setKabar(null);
  };

  const periksa = () => {
    if (jumlah === n) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else if (jumlah < n) {
      setKabar({ teks: `Baru ${sebut(jumlah)} bulatan merah. Kurang ${sebut(n - jumlah)} lagi.`, ok: false });
    } else {
      setKabar({ teks: `Ada ${sebut(jumlah)} bulatan merah, terlalu banyak. Kelebihan ${sebut(jumlah - n)}. Ketuk lagi untuk menghapus warnanya.`, ok: false });
    }
  };

  // Setelah benar: sepuluh pertama merah, sisanya biru (sepuluh dulu).
  const tampil = beres ? Array.from({ length: 20 }, (_, i) => i < n) : terisi;

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? `Ucapkan: jumlahnya` : "Warnamu tepat!") : `Warnai ${n} bulatan`}
        teks={`Ini dua bingkai sepuluh. Setiap bingkai punya sepuluh kotak. Warnai ${sebut(n)} bulatan dengan warna merah. Ketuk kotak untuk mewarnai, ketuk lagi untuk menghapus. Setelah itu tekan Periksa.${akhir ? " Terakhir, ucapkan banyak bulatan yang kamu warnai." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Warnai {n} bulatan merah
        </p>
        <svg viewBox={`0 0 ${LEBAR_BINGKAI + 4} ${TINGGI_BINGKAI}`} className="mx-auto block h-auto w-full max-w-[420px]" role="group" aria-label={`Dua bingkai sepuluh, ${jumlah} bulatan berwarna`}>
          <RangkaBingkai />
          {Array.from({ length: 20 }, (_, i) => {
            const p = posisiSel(i);
            const aktif = tampil[i];
            const biru = beres && i >= 10;
            return (
              <g
                key={i}
                role="button"
                tabIndex={beres ? -1 : 0}
                aria-label={`Kotak ${i + 1}, ${aktif ? "berwarna" : "kosong"}`}
                aria-pressed={aktif}
                onClick={() => ketuk(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(i);
                  }
                }}
                style={{ cursor: beres ? "default" : "pointer", outline: "none" }}
              >
                <rect x={p.x - 9} y={p.y - 9} width="18" height="18" fill="transparent" />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="6.8"
                  fill={aktif ? (biru ? BIRU_B5 : MERAH_B5) : "#FFFFFF"}
                  stroke={BIRU}
                  strokeWidth={aktif ? 1.8 : 1.2}
                  strokeDasharray={aktif ? undefined : "2 2"}
                />
              </g>
            );
          })}
        </svg>
        <p className="text-center text-xl font-black text-[#1C01A5]">Bulatan berwarna: {beres ? n : jumlah}</p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? "? = 10 + " + (n - 10) : `${n} = 10 + ${n - 10}`}
          </p>
        ) : (
          <button
            type="button"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuWarna({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Dua Bingkai"
      warna="#FBCFE8"
      petunjuk="Warnai bulatan merah sebanyak yang diminta. Ketuk kotak untuk mewarnai, ketuk lagi untuk menghapus. Lalu tekan Periksa. Pada soal terakhir, ucapkan banyak bulatan yang kamu warnai."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-warna"
      jumlahRonde={RONDE_WARNA.length}
      kunciAkhir={RONDE_WARNA[RONDE_WARNA.length - 1]}
      belumSiap="Warnai dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarna ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Jodohkan Gambar dan Pasangan Bilangan ------------- */

type DataJodoh = { kiri: number[]; kanan: number[] };

const RONDE_JODOH: DataJodoh[] = [
  { kiri: [11, 14, 12], kanan: [12, 11, 14] },
  { kiri: [16, 13, 18], kanan: [18, 16, 13] },
];

function RondeJodoh({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_JODOH[ronde];
  const akhir = ronde === RONDE_JODOH.length - 1;
  const [kiriPilih, setKiriPilih] = useState<number | null>(null);
  const [cocok, setCocok] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = cocok.length === d.kiri.length;
  const suara = panel.suara["a5-jodoh"] === true && akhir;
  const terbesar = Math.max(...d.kiri);
  useBicara(
    akhir ? suara : beres,
    `Semua pasangan cocok. Titik di bingkai pertama selalu sepuluh. Titik biru di bingkai kedua adalah sisanya. Pada ronde ini, bilangan terbesar adalah ${sebut(terbesar)}.`
  );

  const pilihKiri = (n: number) => {
    if (cocok.includes(n) || beres) return;
    setKiriPilih(n);
    setKabar(null);
  };

  const pilihKanan = (n: number) => {
    if (cocok.includes(n) || beres) return;
    if (kiriPilih === null) {
      setKabar({ teks: "Ketuk dulu gambar bingkai di kiri.", ok: false });
      return;
    }
    if (kiriPilih === n) {
      const baru = [...cocok, n];
      setCocok(baru);
      setKiriPilih(null);
      setKabar(null);
      setGoyang(null);
      if (baru.length === d.kiri.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang(`k${n}`);
      setKabar({ teks: `Hitung titik biru di bingkai kedua. Bilangan yang cocok sepuluh ditambah titik biru itu.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangan terbesar" : "Semua cocok!") : "Jodohkan gambar dan pasangannya"}
        teks={`Ketuk gambar dua bingkai di kiri, lalu ketuk bagan pasangan bilangan yang cocok di kanan. Hitung titik biru di bingkai kedua untuk mencari pasangannya.${akhir ? " Setelah semua cocok, ucapkan bilangan terbesar pada ronde ini." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            {d.kiri.map((n) => {
              const sudah = cocok.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  aria-label={`Gambar bingkai berisi ${n}${sudah ? ", sudah cocok" : ""}`}
                  disabled={sudah}
                  onClick={() => pilihKiri(n)}
                  className={`igil-tanpa-tepi block w-full rounded-2xl border-4 bg-white px-1 py-3 ${
                    sudah ? "border-[#16A34A] bg-[#E8F7EE]" : kiriPilih === n ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-dashed border-[#6B7280]/60"
                  }`}
                >
                  <BingkaiGanda isi={n} kelas="h-12 w-full" />
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            {d.kanan.map((n) => {
              const sudah = cocok.includes(n);
              return (
                <button
                  key={`${n}-${goyang === `k${n}` ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pasangan bilangan sepuluh dan ${n - 10}, bilangan ${n}${sudah ? ", sudah cocok" : ""}`}
                  disabled={sudah}
                  onClick={() => pilihKanan(n)}
                  className={`igil-tanpa-tepi block w-full rounded-2xl border-4 bg-white px-1 py-0.5 ${
                    sudah ? "border-[#16A34A] bg-[#E8F7EE]" : "border-dashed border-[#6B7280]/60"
                  } ${goyang === `k${n}` ? "igil-goyang" : ""}`}
                >
                  <Ikatan atas={n} kiri={10} kanan={n - 10} kelas="h-[4.4rem] w-24" />
                </button>
              );
            })}
          </div>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuJodoh({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Jodohkan Gambar dan Pasangan"
      warna="#FDE68A"
      petunjuk="Ketuk gambar dua bingkai di kiri, lalu ketuk bagan pasangan bilangan yang cocok di kanan. Titik di bingkai pertama selalu sepuluh. Hitung titik biru di bingkai kedua. Pada soal terakhir, ucapkan bilangan terbesar."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-jodoh"
      jumlahRonde={RONDE_JODOH.length}
      kunciAkhir={Math.max(...RONDE_JODOH[RONDE_JODOH.length - 1].kiri)}
      belumSiap="Jodohkan semua gambar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJodoh ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Loncat di Garis Bilangan -------------------------- */

const RONDE_LONCAT = [3, 6, 8];
const XG = (n: number) => 14 + ((n - 10) * 272) / 10;

function RondeLoncat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const h = RONDE_LONCAT[ronde];
  const tujuan = 10 + h;
  const akhir = ronde === RONDE_LONCAT.length - 1;
  const [posisi, setPosisi] = useState(10);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const lompatan = posisi - 10;
  const beres = lompatan === h;
  const suara = panel.suara["a5-lompat"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Mulai dari sepuluh, melompat ${sebut(h)} kali ke kanan, mendarat di ${sebut(tujuan)}. Sepuluh ditambah ${sebut(h)} sama dengan ${sebut(tujuan)}.`
  );

  const ketuk = (n: number) => {
    if (beres) return;
    if (n === posisi + 1) {
      setPosisi(n);
      setGoyang(null);
      setKabar(null);
      if (n - 10 === h) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang(n);
      setKabar({ teks: `Lompat satu langkah saja ke kanan, yaitu ke ${sebut(posisi + 1)}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? `Ucapkan: tempat mendarat` : `Mendarat di ${tujuan}!`) : `Loncat ${h} kali dari 10`}
        teks={`Mulai dari sepuluh di garis bilangan. Melompatlah ${sebut(h)} kali ke kanan. Setiap lompatan satu langkah. Ketuk bilangan berikutnya di sebelah kanan, satu per satu.${akhir ? " Di akhir, ucapkan bilangan tempat kamu mendarat." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Mulai di 10 • loncat {h} kali ke kanan
        </p>
        <svg viewBox="0 0 300 100" className="block h-auto w-full" role="group" aria-label={`Garis bilangan 10 sampai 20. Sekarang di ${posisi}.`}>
          <path d="M6 58 H294 M288 52 L294 58 L288 64" fill="none" stroke={BIRU} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {Array.from({ length: h }, (_, i) => {
            const a = 10 + i;
            const b = a + 1;
            if (b > posisi) return null;
            const tengah = (XG(a) + XG(b)) / 2;
            return (
              <g key={b} className="igil-muncul">
                <path d={`M${XG(a)} 48 Q${tengah} 14 ${XG(b)} 48`} fill="none" stroke={BIRU_B5} strokeWidth="3" strokeLinecap="round" />
                <path d={`M${XG(b) - 6} 40 L${XG(b)} 48 L${XG(b) - 9} 49`} fill="none" stroke={BIRU_B5} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })}
          {Array.from({ length: 11 }, (_, i) => {
            const n = 10 + i;
            const sini = n === posisi;
            return (
              <g
                key={`${n}-${goyang === n ? "x" : "o"}`}
                role="button"
                tabIndex={beres ? -1 : 0}
                aria-label={`Bilangan ${n}${sini ? ", posisimu sekarang" : ""}`}
                onClick={() => ketuk(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(n);
                  }
                }}
                className={goyang === n ? "igil-goyang" : ""}
                style={{ cursor: beres ? "default" : "pointer", outline: "none" }}
              >
                <rect x={XG(n) - 13} y="38" width="26" height="60" fill="transparent" />
                <circle cx={XG(n)} cy="58" r={sini ? 9 : 5.5} fill={sini ? MERAH_B5 : n <= posisi ? BIRU_B5 : "#FFFFFF"} stroke={BIRU} strokeWidth="2.4" />
                <text x={XG(n)} y="88" textAnchor="middle" fontSize="13" fontWeight="900" fill={n === 10 || n === 20 ? MERAH_B5 : BIRU}>
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-center text-xl font-black text-[#1C01A5]">
          Lompatan: {lompatan} dari {h}
        </p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `10 + ${h} = ?` : `10 + ${h} = ${tujuan}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuLoncat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Loncat di Garis Bilangan"
      warna="#BFDBFE"
      petunjuk="Mulai dari sepuluh di garis bilangan. Ketuk bilangan berikutnya di sebelah kanan, satu langkah setiap lompatan, sampai jumlah lompatan cukup. Pada soal terakhir, ucapkan bilangan tempat kamu mendarat."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-lompat"
      jumlahRonde={RONDE_LONCAT.length}
      kunciAkhir={10 + RONDE_LONCAT[RONDE_LONCAT.length - 1]}
      belumSiap="Selesaikan semua lompatan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLoncat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
