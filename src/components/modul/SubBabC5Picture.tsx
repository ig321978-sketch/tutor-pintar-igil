"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BIRU_B5, MERAH_B5, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { DiagramBatang, TabelNilai, kalimatNilai } from "./nilai-c5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab C, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Bingkai sepuluh tegak, titik polos, dan diagram batang. Anak mewarnai,      */
/* melingkari, dan memilih tabel. Anak tidak memindahkan benda.               */
/*  5 Warnai Puluhan dan Satuan (mewarnai bingkai sepuluh)                    */
/*  6 Lingkari Puluhan (melingkari sepuluh titik, lalu menghitung sisanya)    */
/*  7 Pilih Tabel yang Cocok (mencocokkan diagram dengan tabel nilai tempat)  */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Warnai Puluhan dan Satuan ------------------------- */

const RONDE_WARNA: { p: number; s: number }[] = [
  { p: 1, s: 3 },
  { p: 1, s: 8 },
  { p: 1, s: 6 },
];

const FX = [24, 124];
const sel = (f: number, i: number) => ({ cx: FX[f] + 19 + (i % 2) * 30, cy: 21 + Math.floor(i / 2) * 26 });

function RondeWarna({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_WARNA[ronde];
  const akhir = ronde === RONDE_WARNA.length - 1;
  const [terisi, setTerisi] = useState<boolean[][]>(() => [Array.from({ length: 10 }, () => false), Array.from({ length: 10 }, () => false)]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const hitung = terisi.map((f) => f.filter(Boolean).length);
  const suara = panel.suara["c5-warna"] === true && akhir;
  useBicara(akhir ? suara : beres, `Satu bingkai penuh adalah ${d.p} puluhan. Bingkai satunya berisi ${d.s} satuan. ${kalimatNilai(d.p, d.s).replace("=", "sama dengan")}.`);

  const ketuk = (f: number, i: number) => {
    if (beres) return;
    const baru = terisi.map((x) => x.slice());
    baru[f][i] = !baru[f][i];
    setTerisi(baru);
    setKabar(null);
  };

  const periksa = () => {
    const harap = [10, d.s].sort((a, b) => b - a);
    const ada = hitung.slice().sort((a, b) => b - a);
    if (ada[0] === harap[0] && ada[1] === harap[1]) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    if (ada[0] !== 10) {
      setKabar({ teks: "Satu puluhan berarti satu bingkai penuh, yaitu sepuluh lingkaran. Penuhi satu bingkai dulu.", ok: false });
    } else if (ada[1] < d.s) {
      setKabar({ teks: `Bingkai satunya baru berisi ${sebut(ada[1])} lingkaran. Satuannya ${sebut(d.s)}, jadi tambah warnanya.`, ok: false });
    } else {
      setKabar({ teks: `Bingkai satunya berisi ${sebut(ada[1])} lingkaran, terlalu banyak. Satuannya hanya ${sebut(d.s)}.`, ok: false });
    }
  };

  // Setelah benar: bingkai penuh merah (puluhan), bingkai sebagian biru (satuan).
  const penuh = hitung[0] === 10 ? 0 : 1;

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: bilangannya" : suara ? "Hebat!" : beres ? "Warnamu tepat!" : `Tunjukkan ${d.p} puluhan dan ${d.s} satuan`}
        teks={`Tunjukkan ${sebut(d.p)} puluhan dan ${sebut(d.s)} satuan. Satu bingkai penuh berisi sepuluh, itu satu puluhan. Warnai lingkaran di bingkai satunya sebanyak satuannya. Ketuk lingkaran untuk mewarnai, ketuk lagi untuk menghapus. Lalu tekan Periksa.${akhir ? " Di akhir, ucapkan bilangan yang kamu tunjukkan." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Tunjukkan {d.p} puluhan dan {d.s} satuan
        </p>
        <svg viewBox="0 0 216 162" className="mx-auto block h-auto w-full max-w-[300px]" role="group" aria-label="Dua bingkai sepuluh tegak">
          {[0, 1].map((f) => (
            <g key={f}>
              <rect x={FX[f]} y="8" width="68" height="134" rx="4" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.8" />
              <path d={`M${FX[f] + 34} 8 V142 M${FX[f]} 34 H${FX[f] + 68} M${FX[f]} 60 H${FX[f] + 68} M${FX[f]} 86 H${FX[f] + 68} M${FX[f]} 112 H${FX[f] + 68}`} stroke={BIRU} strokeWidth="1.3" opacity="0.4" />
              <text x={FX[f] + 34} y="157" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
                Bingkai {f + 1}
              </text>
              {Array.from({ length: 10 }, (_, i) => {
                const { cx, cy } = sel(f, i);
                const on = terisi[f][i];
                const warna = beres ? (f === penuh ? MERAH_B5 : BIRU_B5) : BIRU_B5;
                return (
                  <g
                    key={i}
                    role="button"
                    tabIndex={beres ? -1 : 0}
                    aria-label={`Bingkai ${f + 1}, lingkaran ${i + 1}, ${on ? "berwarna" : "kosong"}`}
                    aria-pressed={on}
                    onClick={() => ketuk(f, i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        ketuk(f, i);
                      }
                    }}
                    style={{ cursor: beres ? "default" : "pointer", outline: "none" }}
                  >
                    <rect x={cx - 15} y={cy - 13} width="30" height="26" fill="transparent" />
                    <circle cx={cx} cy={cy} r="10" fill={on ? warna : "#FFFFFF"} stroke={BIRU} strokeWidth="2" strokeDasharray={on ? undefined : "3 3"} />
                  </g>
                );
              })}
            </g>
          ))}
        </svg>
        <p className="text-center text-lg font-black text-[#1C01A5]">
          Bingkai 1: {hitung[0]} • Bingkai 2: {hitung[1]}
        </p>
        {beres ? (
          <div className="igil-muncul space-y-2">
            <TabelNilai puluhan={d.p} satuan={d.s} kecil />
            <p className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
              {akhir && !suara ? `${d.p} puluhan dan ${d.s} satuan = ?` : kalimatNilai(d.p, d.s)}
            </p>
          </div>
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
  const terakhir = RONDE_WARNA[RONDE_WARNA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Puluhan dan Satuan"
      warna="#FBCFE8"
      petunjuk="Satu bingkai penuh berisi sepuluh lingkaran, itu satu puluhan. Warnai lingkaran di bingkai satunya sebanyak satuannya, lalu tekan Periksa. Pada soal terakhir, ucapkan bilangan yang kamu tunjukkan."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-warna"
      jumlahRonde={RONDE_WARNA.length}
      kunciAkhir={terakhir.p * 10 + terakhir.s}
      belumSiap="Warnai dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarna ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Lingkari Puluhan ---------------------------------- */

const RONDE_LINGKAR = [13, 18, 17];

function titik(i: number) {
  return { x: 24 + (i % 7) * 40 + (((i * 37) % 13) - 6), y: 22 + Math.floor(i / 7) * 38 + (((i * 53) % 11) - 5) };
}

function RondeLingkar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_LINGKAR[ronde];
  const sisa = n - 10;
  const akhir = ronde === RONDE_LINGKAR.length - 1;
  const [pilih, setPilih] = useState<number[]>([]);
  const [terkunci, setTerkunci] = useState<number[] | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c5-lingkar"] === true && akhir;
  useBicara(akhir ? suara : beres, `Titik yang dilingkari ada sepuluh, itu satu puluhan. Titik di luar lingkaran ada ${sebut(sisa)}, itu ${sebut(sisa)} satuan. ${kalimatNilai(1, sisa).replace("=", "sama dengan")}.`);

  const ketuk = (i: number) => {
    if (terkunci) return;
    if (pilih.includes(i)) {
      setPilih(pilih.filter((x) => x !== i));
      setKabar(null);
      return;
    }
    if (pilih.length >= 10) {
      setKabar({ teks: "Cukup sepuluh titik. Ketuk titik yang sudah dipilih untuk melepasnya.", ok: false });
      return;
    }
    setPilih([...pilih, i]);
    setKabar(null);
  };

  const lingkari = () => {
    if (terkunci) return;
    if (pilih.length !== 10) {
      setKabar({ teks: pilih.length < 10 ? `Baru ${sebut(pilih.length)} titik terpilih. Pilih tepat sepuluh titik.` : "Pilih tepat sepuluh titik.", ok: false });
      return;
    }
    setTerkunci(pilih);
    setKabar(null);
  };

  const jawab = (v: number) => {
    if (!terkunci || beres) return;
    if (v === sisa) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(v);
      setKabar({ teks: "Hitung titik yang berada di luar lingkaran satu per satu. Itulah satuannya.", ok: false });
    }
  };

  const kotak = terkunci
    ? (() => {
        const ps = terkunci.map(titik);
        const x1 = Math.min(...ps.map((p) => p.x)) - 14;
        const x2 = Math.max(...ps.map((p) => p.x)) + 14;
        const y1 = Math.min(...ps.map((p) => p.y)) - 14;
        const y2 = Math.max(...ps.map((p) => p.y)) + 14;
        return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
      })()
    : null;

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: bilangannya" : suara ? "Hebat!" : beres ? "Tabelmu lengkap!" : terkunci ? "Berapa satuannya?" : "Lingkari sepuluh titik"}
        teks={`Ada banyak titik. Ketuk tepat sepuluh titik, lalu tekan lingkari. Sepuluh titik yang dilingkari adalah satu puluhan. Setelah itu hitung titik yang tidak dilingkari, itulah satuannya.${akhir ? " Di akhir, ucapkan banyak titik seluruhnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {terkunci ? "Hitung titik di luar lingkaran" : `Lingkari sepuluh titik • terpilih ${pilih.length}`}
        </p>
        <svg viewBox="0 0 290 124" className="block h-auto w-full" role="group" aria-label="Kumpulan titik polos">
          {kotak ? <rect x={kotak.x} y={kotak.y} width={kotak.w} height={kotak.h} rx="26" fill="#FFF7CC" fillOpacity="0.55" stroke="#F0AB00" strokeWidth="3.4" strokeDasharray="7 5" /> : null}
          {Array.from({ length: n }, (_, i) => {
            const { x, y } = titik(i);
            const dipilih = pilih.includes(i);
            const terlingkar = terkunci?.includes(i) ?? false;
            return (
              <g
                key={i}
                role="button"
                tabIndex={terkunci ? -1 : 0}
                aria-label={`Titik ${i + 1}, ${terlingkar ? "sudah dilingkari" : dipilih ? "terpilih" : "belum dipilih"}`}
                aria-pressed={dipilih}
                onClick={() => ketuk(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(i);
                  }
                }}
                style={{ cursor: terkunci ? "default" : "pointer", outline: "none" }}
              >
                <rect x={x - 17} y={y - 17} width="34" height="34" fill="transparent" />
                <circle cx={x} cy={y} r={dipilih ? 11 : 10} fill={terlingkar ? MERAH_B5 : dipilih ? "#FFE566" : BIRU_B5} stroke={BIRU} strokeWidth={dipilih && !terlingkar ? 3.2 : 2.2} />
              </g>
            );
          })}
        </svg>
        {!terkunci ? (
          <button
            type="button"
            onClick={lingkari}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ⭕ Lingkari sepuluh
          </button>
        ) : null}
        {terkunci && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa titik yang tidak dilingkari?</p>
            <PilihAngka opsi={opsiSekitar(sisa)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul space-y-2">
            <TabelNilai puluhan={1} satuan={sisa} kecil />
            <p className="rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
              {akhir && !suara ? `1 puluhan dan ${sisa} satuan = ?` : kalimatNilai(1, sisa)}
            </p>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuLingkar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lingkari Puluhan"
      warna="#BFDBFE"
      petunjuk="Ketuk tepat sepuluh titik, lalu tekan lingkari. Sepuluh titik yang dilingkari adalah satu puluhan. Hitung titik yang tidak dilingkari, itulah satuannya. Pada soal terakhir, ucapkan banyak titik seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-lingkar"
      jumlahRonde={RONDE_LINGKAR.length}
      kunciAkhir={RONDE_LINGKAR[RONDE_LINGKAR.length - 1]}
      belumSiap="Lingkari dan hitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLingkar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Pilih Tabel yang Cocok ---------------------------- */

const RONDE_TABEL: { s: number; posisi: number }[] = [
  { s: 4, posisi: 1 },
  { s: 2, posisi: 0 },
  { s: 6, posisi: 2 },
  { s: 9, posisi: 1 },
];

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TABEL[ronde];
  const akhir = ronde === RONDE_TABEL.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["c5-tabel"] === true && akhir;
  useBicara(akhir ? suara : beres, `Diagram ini punya satu batang sepuluh dan ${sebut(d.s)} kotak kecil. Satu puluhan dan ${sebut(d.s)} satuan. ${kalimatNilai(1, d.s).replace("=", "sama dengan")}.`);

  const benar: [number, number] = [1, d.s];
  const tukar: [number, number] = [d.s, 1];
  const lain: [number, number] = [1, d.s < 9 ? d.s + 1 : d.s - 1];
  const sisaOpsi: [number, number][] = [tukar, lain];
  const opsi: [number, number][] = [];
  for (let i = 0, k = 0; i < 3; i++) opsi.push(i === d.posisi ? benar : sisaOpsi[k++]);

  const pilih = (i: number) => {
    if (beres) return;
    if (i === d.posisi) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(i);
      setKabar({ teks: "Hitung batang besar untuk puluhan dan kotak kecil untuk satuan. Kolom puluhan ada di sebelah kiri.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: bilangannya" : suara ? "Hebat!" : beres ? "Tabelmu cocok!" : "Pilih tabel yang cocok"}
        teks={`Lihat diagram ini. Satu batang besar adalah satu puluhan, yaitu sepuluh kotak kecil. Kotak kecil yang sendirian adalah satuan. Pilih tabel nilai tempat yang cocok dengan diagram.${akhir ? " Di akhir, ucapkan bilangan yang ditunjukkan diagram." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <DiagramBatang puluhan={1} satuan={d.s} />
        <div className="grid grid-cols-3 gap-2">
          {opsi.map(([p, s], i) => (
            <button
              key={`${i}-${keliru === i ? "x" : "o"}`}
              type="button"
              disabled={beres}
              aria-label={`Pilih tabel: ${p} puluhan dan ${s} satuan`}
              onClick={() => pilih(i)}
              className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-1 py-2 shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-70 ${
                beres && i === d.posisi ? "bg-[#BBF7D0]" : ""
              } ${keliru === i ? "igil-goyang" : ""}`}
            >
              <TabelNilai puluhan={p} satuan={s} kecil kelas="max-w-[110px]" />
            </button>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `1 puluhan dan ${d.s} satuan = ?` : kalimatNilai(1, d.s)}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pilih Tabel yang Cocok"
      warna="#FDE68A"
      petunjuk="Lihat diagram batang. Satu batang besar adalah satu puluhan, kotak kecil yang sendirian adalah satuan. Pilih tabel nilai tempat yang cocok. Hati-hati, kolom puluhan ada di kiri dan kolom satuan ada di kanan. Pada soal terakhir, ucapkan bilangan yang ditunjukkan diagram."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={10 + RONDE_TABEL[RONDE_TABEL.length - 1].s}
      belumSiap="Pilih tabelnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
