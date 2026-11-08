"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { PilihKata, WARNA_BATANG } from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab B, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Kertas berpetak, batang polos, dan tabel. Anak menandai kotak, memilih,    */
/* dan mengisi tabel. Anak tidak memindahkan benda.                           */
/*  5 Warnai Kotak (menandai kotak satu per satu dari ujung kiri)             */
/*  6 Bandingkan dalam Kotak (memilih angka dan kata pada kertas berpetak)    */
/*  7 Tabel Tebakan dan Hasil (mengisi tabel pengukuran)                      */
/* ------------------------------------------------------------------------ */

const HURUF = ["A", "B", "C"];
const SEL = 26;

/* --------- Permainan 5. Warnai Kotak -------------------------------------- */

const RONDE_KOTAK = [6, 9, 7];

function RondeWarnaiKotak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const k = RONDE_KOTAK[ronde];
  const akhir = ronde === RONDE_KOTAK.length - 1;
  const [tandai, setTandai] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = tandai === k;
  const suara = panel.suara["b7-kotak"] === true && akhir;
  useBicara(akhir ? suara : beres, `Panjang batang adalah ${sebut(k)} kotak.`);
  const x0 = 20;
  const y0 = 8;

  const ketuk = (kol: number) => {
    if (penuh) return;
    if (kol >= k) {
      setKabar({ teks: "Kotak ini ada di luar batang. Berhenti di ujung kanan batang.", ok: false });
      return;
    }
    if (kol < tandai) return;
    if (kol > tandai) {
      setKabar({ teks: "Mulai dari ujung kiri dan jangan ada kotak yang terlewat.", ok: false });
      return;
    }
    setTandai((t) => t + 1);
    setKabar(null);
  };

  const pilih = (v: number) => {
    if (!penuh || beres) return;
    if (v === k) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung lagi kotak yang sudah diwarnai emas, dari ujung kiri sampai ujung kanan batang.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: panjang batang" : suara ? "Hebat!" : beres ? "Hitunganmu tepat!" : penuh ? "Berapa kotak?" : "Ketuk kotak dari ujung kiri"}
        teks={`Ketuk kotak di bawah batang satu per satu, mulai dari ujung kiri. Jangan ada kotak yang terlewat. Lalu pilih panjang batang dalam kotak.${akhir ? " Di akhir, ucapkan panjang batang." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox={`0 0 300 ${y0 * 2 + SEL * 3}`} className="block h-auto w-full" role="group" aria-label={`Kertas berpetak dengan batang sepanjang ${k} kotak`}>
          {Array.from({ length: 11 }, (_, i) => (
            <path key={`v${i}`} d={`M${x0 + i * SEL} ${y0} V${y0 + SEL * 3}`} stroke="#93C5FD" strokeWidth="1.6" />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <path key={`h${i}`} d={`M${x0} ${y0 + i * SEL} H${x0 + SEL * 10}`} stroke="#93C5FD" strokeWidth="1.6" />
          ))}
          <rect x={x0} y={y0 + SEL} width={k * SEL} height={SEL} fill={WARNA_BATANG[ronde % WARNA_BATANG.length]} fillOpacity="0.7" stroke={BIRU} strokeWidth="2.6" />
          {Array.from({ length: 10 }, (_, kol) => (
            <g
              key={kol}
              role="button"
              tabIndex={penuh ? -1 : 0}
              aria-label={`Kotak ke-${kol + 1}${kol < tandai ? ", sudah diwarnai" : ""}`}
              onClick={() => ketuk(kol)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  ketuk(kol);
                }
              }}
              style={{ cursor: penuh ? "default" : "pointer", outline: "none" }}
            >
              <rect x={x0 + kol * SEL} y={y0 + SEL} width={SEL} height={SEL} fill="transparent" />
              {kol < tandai ? (
                <g className="igil-muncul">
                  <rect x={x0 + kol * SEL + 1.5} y={y0 + SEL + 1.5} width={SEL - 3} height={SEL - 3} rx="3" fill="#FDE047" stroke={BIRU} strokeWidth="1.6" />
                  <text x={x0 + kol * SEL + SEL / 2} y={y0 + SEL + 18} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
                    {kol + 1}
                  </text>
                </g>
              ) : null}
            </g>
          ))}
        </svg>
        <p className="text-center text-sm font-black text-[#1C01A5]">Kotak yang diwarnai: {tandai}</p>
        {penuh && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Panjang batang = ? kotak</p>
            <PilihAngka opsi={opsiSekitar(k)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Panjang batang = ? kotak" : `Panjang batang = ${k} kotak`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuWarnaiKotak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Warnai Kotak"
      warna="#FDE68A"
      petunjuk="Mengukur dengan kotak pada kertas berpetak. Ketuk kotak di bawah batang satu per satu, mulai dari ujung kiri dan tanpa ada yang terlewat. Lalu pilih panjang batang dalam kotak. Pada soal terakhir, ucapkan panjang batang."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-kotak"
      jumlahRonde={RONDE_KOTAK.length}
      kunciAkhir={RONDE_KOTAK[RONDE_KOTAK.length - 1]}
      belumSiap="Warnai kotaknya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeWarnaiKotak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Bandingkan dalam Kotak ----------------------------- */

type RondeBandingKotak = { len: number[]; hitung: number; bandingkan: [number, number]; tanya: "terpanjang" | "terpendek" };

const RONDE_BANDING: RondeBandingKotak[] = [
  { len: [4, 9, 6], hitung: 1, bandingkan: [0, 1], tanya: "terpanjang" },
  { len: [8, 3, 5], hitung: 0, bandingkan: [1, 2], tanya: "terpendek" },
  { len: [6, 2, 8], hitung: 0, bandingkan: [0, 2], tanya: "terpendek" },
];

function RondeBandingKotakKertas({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BANDING[ronde];
  const akhir = ronde === RONDE_BANDING.length - 1;
  const [langkah, setLangkah] = useState(0);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [salahKata, setSalahKata] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 3;
  const [x, y] = d.bandingkan;
  const kataBenar = d.len[x] > d.len[y] ? "panjang" : "pendek";
  const kunciPaling = d.len.indexOf(d.tanya === "terpanjang" ? Math.max(...d.len) : Math.min(...d.len));
  const selisih = Math.max(...d.len) - Math.min(...d.len);
  const suara = panel.suara["b7-banding"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Batang ${HURUF[d.hitung]} panjangnya ${sebut(d.len[d.hitung])} kotak. Batang ${HURUF[x]} lebih ${kataBenar} dari batang ${HURUF[y]}. Batang ${HURUF[kunciPaling]} paling ${d.tanya === "terpanjang" ? "panjang" : "pendek"}.${akhir ? ` Selisih batang yang paling panjang dan paling pendek adalah ${sebut(selisih)} kotak.` : ""}`
  );
  const x0 = 34;
  const tinggi = 12 + d.len.length * 30;

  const pilihAngka = (v: number) => {
    if (langkah !== 0) return;
    if (v === d.len[d.hitung]) {
      setSalahAngka(null);
      setKabar(null);
      setLangkah(1);
    } else {
      setSalahAngka(v);
      setKabar({ teks: `Hitung kotak batang ${HURUF[d.hitung]} dari ujung kiri sampai ujung kanannya.`, ok: false });
    }
  };
  const pilihKata = (t: string) => {
    if (langkah !== 1) return;
    if (t === kataBenar) {
      setSalahKata(null);
      setKabar(null);
      setLangkah(2);
    } else {
      setSalahKata(t);
      setKabar({ teks: `Bandingkan panjang batang ${HURUF[x]} dan batang ${HURUF[y]}. Lihat siapa yang lebih sedikit kotaknya.`, ok: false });
    }
  };
  const pilihPaling = (t: string) => {
    if (langkah !== 2) return;
    if (t === HURUF[kunciPaling]) {
      setSalahKata(null);
      setKabar(null);
      setLangkah(3);
      letusan.picu();
      onBeres();
    } else {
      setSalahKata(t);
      setKabar({ teks: `Cari batang yang paling ${d.tanya === "terpanjang" ? "banyak" : "sedikit"} kotaknya.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Perbandinganmu tepat!" : "Hitung, lalu bandingkan"}
        teks={`Lihat tiga batang pada kertas berpetak. Hitung kotaknya, bandingkan dua batang, lalu cari batang yang paling ${d.tanya === "terpanjang" ? "panjang" : "pendek"}.${akhir ? " Di akhir, ucapkan selisih batang yang paling panjang dan paling pendek." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox={`0 0 300 ${tinggi}`} className="block h-auto w-full" role="img" aria-label={`Tiga batang pada kertas berpetak, panjang ${d.len.join(", ")} kotak`}>
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${x0 + i * SEL} 4 V${tinggi - 4}`} stroke="#93C5FD" strokeWidth="1.4" />
          ))}
          {d.len.map((p, i) => {
            const yy = 10 + i * 30;
            return (
              <g key={i}>
                <circle cx="16" cy={yy + 11} r="10" fill="#FFFFFF" stroke={BIRU} strokeWidth="2.4" />
                <text x="16" y={yy + 15.4} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
                  {HURUF[i]}
                </text>
                <rect x={x0} y={yy} width={p * SEL} height="22" rx="3" fill={WARNA_BATANG[i % WARNA_BATANG.length]} stroke={BIRU} strokeWidth="2.4" />
              </g>
            );
          })}
        </svg>
        <div className="space-y-0.5 text-center text-sm font-black text-[#1C01A5]">
          {langkah >= 1 ? <p className="igil-muncul">Batang {HURUF[d.hitung]} = {d.len[d.hitung]} kotak</p> : null}
          {langkah >= 2 ? <p className="igil-muncul">Batang {HURUF[x]} lebih {kataBenar} dari batang {HURUF[y]}</p> : null}
        </div>
        {langkah === 0 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Panjang batang {HURUF[d.hitung]} = ? kotak</p>
            <PilihAngka opsi={opsiSekitar(d.len[d.hitung])} keliru={salahAngka} onPilih={pilihAngka} />
          </div>
        ) : null}
        {langkah === 1 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Batang {HURUF[x]} lebih ... dari batang {HURUF[y]}
            </p>
            <PilihKata opsi={["panjang", "pendek"]} keliru={salahKata} onPilih={pilihKata} kolom={2} />
          </div>
        ) : null}
        {langkah === 2 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Batang yang paling {d.tanya === "terpanjang" ? "panjang" : "pendek"} adalah ...</p>
            <PilihKata opsi={HURUF} keliru={salahKata} onPilih={pilihPaling} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisih batang terpanjang dan terpendek = ? kotak" : `Batang ${HURUF[kunciPaling]} paling ${d.tanya === "terpanjang" ? "panjang" : "pendek"}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBandingKotak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_BANDING[RONDE_BANDING.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bandingkan dalam Kotak"
      warna="#BBF7D0"
      petunjuk="Membandingkan panjang pada kertas berpetak. Hitung kotak sebuah batang, pilih kata lebih panjang atau lebih pendek, lalu pilih batang yang paling panjang atau paling pendek. Pada soal terakhir, ucapkan selisih batang yang paling panjang dan paling pendek."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-banding"
      jumlahRonde={RONDE_BANDING.length}
      kunciAkhir={Math.max(...terakhir.len) - Math.min(...terakhir.len)}
      belumSiap="Hitung dan bandingkan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBandingKotakKertas ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Tabel Tebakan dan Hasil ---------------------------- */

const BARIS_TABEL: { nama: string; tebak: number; hasil: number }[] = [
  { nama: "Meja", tebak: 4, hasil: 5 },
  { nama: "Buku", tebak: 8, hasil: 5 },
  { nama: "Pita", tebak: 4, hasil: 9 },
];

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const b = BARIS_TABEL[ronde];
  const akhir = ronde === BARIS_TABEL.length - 1;
  const selisih = Math.abs(b.tebak - b.hasil);
  const [langkah, setLangkah] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= 2;
  const suara = panel.suara["b7-tabel"] === true && akhir;
  const kata = b.tebak === b.hasil ? "tepat" : b.tebak < b.hasil ? `kurang ${sebut(selisih)}` : `lebih ${sebut(selisih)}`;
  useBicara(akhir ? suara : beres, `${b.nama} diukur dan hasilnya ${sebut(b.hasil)} kotak. Tebakan ${sebut(b.tebak)}, jadi tebakannya ${kata}. Selisihnya ${sebut(selisih)}.`);

  const pilihHasil = (v: number) => {
    if (langkah !== 0) return;
    if (v === b.hasil) {
      setSalah(null);
      setKabar(null);
      setLangkah(1);
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung kotak yang diwarnai pada batang, dari ujung kiri sampai ujung kanan.", ok: false });
    }
  };
  const pilihSelisih = (v: number) => {
    if (langkah !== 1) return;
    if (v === selisih) {
      setSalah(null);
      setKabar(null);
      setLangkah(2);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: `Selisih adalah bilangan yang besar dikurangi bilangan yang kecil. Kurangkan ${sebut(Math.max(b.tebak, b.hasil))} dengan ${sebut(Math.min(b.tebak, b.hasil))}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Barismu lengkap!" : langkah === 0 ? "Hitung hasil ukur" : "Cari selisihnya"}
        teks={`Isi baris ${b.nama} pada tabel pengukuran. Hitung kotak pada batang untuk mengetahui hasil pengukuran. Lalu cari selisih tebakan dan hasil.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 50" className="block h-auto w-full" role="img" aria-label={`Batang ${b.nama} sepanjang ${b.hasil} kotak`}>
          {Array.from({ length: 11 }, (_, i) => (
            <path key={i} d={`M${20 + i * SEL} 6 V${6 + SEL}`} stroke="#93C5FD" strokeWidth="1.4" />
          ))}
          <path d={`M20 6 H${20 + SEL * 10} M20 ${6 + SEL} H${20 + SEL * 10}`} stroke="#93C5FD" strokeWidth="1.4" />
          <rect x="20" y="6" width={b.hasil * SEL} height={SEL} fill={WARNA_BATANG[ronde % WARNA_BATANG.length]} stroke={BIRU} strokeWidth="2.4" />
        </svg>
        <div className="overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-sm font-black text-[#1C01A5]">
            <thead>
              <tr className="bg-[#E9D8F3] text-xs">
                <th className="px-1 py-1">Benda</th>
                <th className="px-1 py-1">Tebakanku</th>
                <th className="px-1 py-1">Hasilku</th>
                <th className="px-1 py-1">Selisih</th>
              </tr>
            </thead>
            <tbody>
              {BARIS_TABEL.slice(0, ronde + 1).map((r, i) => {
                const sekarang = i === ronde;
                const s = Math.abs(r.tebak - r.hasil);
                return (
                  <tr key={r.nama} className={i % 2 ? "bg-[#EEF2FF]" : "bg-white"}>
                    <td className="px-1 py-1.5">{r.nama}</td>
                    <td className="px-1 py-1.5">{r.tebak} kotak</td>
                    <td className={`px-1 py-1.5 ${sekarang && langkah === 0 ? "bg-[#FFF7CC]" : ""}`}>{!sekarang || langkah >= 1 ? `${r.hasil} kotak` : "?"}</td>
                    <td className={`px-1 py-1.5 ${sekarang && langkah === 1 ? "bg-[#FFF7CC]" : ""}`}>{!sekarang || langkah >= 2 ? s : "?"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {langkah === 0 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Hasil pengukuran {b.nama} = ? kotak</p>
            <PilihAngka opsi={opsiSekitar(b.hasil)} keliru={salah} onPilih={pilihHasil} />
          </div>
        ) : null}
        {langkah === 1 ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              Tebakan {b.tebak}, hasil {b.hasil}. Selisihnya = ?
            </p>
            <PilihAngka opsi={opsiSekitar(selisih)} keliru={salah} onPilih={pilihSelisih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisih tebakan dan hasil = ?" : `Tebakanku ${kata}`}
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
      judul="Tabel Tebakan dan Hasil"
      warna="#C7D2FE"
      petunjuk="Mengisi tabel pengukuran. Hitung kotak pada batang untuk mendapatkan hasil pengukuran, lalu cari selisih tebakan dan hasil. Tabel bertambah satu baris tiap soal. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-tabel"
      jumlahRonde={BARIS_TABEL.length}
      kunciAkhir={Math.abs(BARIS_TABEL[BARIS_TABEL.length - 1].tebak - BARIS_TABEL[BARIS_TABEL.length - 1].hasil)}
      belumSiap="Isi tabelnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
