"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { sebut } from "./belas-a5-dasar";
import { WARNA_BATANG } from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab A, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Batang polos dan lingkaran huruf. Anak mengetuk, menandai, dan menjodohkan.*/
/* Anak tidak memindahkan benda.                                              */
/*  5 Pilih Batang (mengetuk batang yang paling, atau yang sama)              */
/*  6 Susun Tangga Batang (mengetuk batang berurutan dari pendek ke tinggi)   */
/*  7 Jodohkan Diagram dan Kalimat (menjodohkan)                              */
/* ------------------------------------------------------------------------ */

const HURUF = ["A", "B", "C", "D", "E"];

/* --------- Permainan 5. Pilih Batang -------------------------------------- */

type RondeBatang = { panjang: number[]; tanya: "terpanjang" | "terpendek" | "sama"; acuan?: number };

const RONDE_BATANG: RondeBatang[] = [
  { panjang: [18, 10, 14], tanya: "terpanjang" },
  { panjang: [12, 16, 12, 8], tanya: "sama", acuan: 0 },
  { panjang: [9, 15, 19, 12], tanya: "terpendek" },
];

const SATUAN_BATANG = 11;
const X_BATANG = 46;

function RondePilihBatang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { panjang, tanya, acuan } = RONDE_BATANG[ronde];
  const akhir = ronde === RONDE_BATANG.length - 1;
  const [benar, setBenar] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = benar !== null;
  const suara = panel.suara["a7-batang"] === true && akhir;
  const kunci =
    tanya === "terpanjang"
      ? panjang.indexOf(Math.max(...panjang))
      : tanya === "terpendek"
        ? panjang.indexOf(Math.min(...panjang))
        : panjang.findIndex((p, i) => i !== acuan && p === panjang[acuan as number]);
  const kalimat =
    tanya === "sama"
      ? `Batang ${HURUF[kunci]} sama panjang dengan batang ${HURUF[acuan as number]}.`
      : `Batang ${HURUF[kunci]} paling ${tanya === "terpanjang" ? "panjang" : "pendek"}.`;
  const lebihPanjangDariD = panjang.filter((p) => p > panjang[3]).length;
  useBicara(akhir ? suara : beres, `${kalimat}${akhir ? ` Ada ${sebut(lebihPanjangDariD)} batang yang lebih panjang dari batang D.` : ""}`);
  const tinggi = 14 + panjang.length * 34;

  const ketuk = (i: number) => {
    if (beres) return;
    if (tanya === "sama" && i === acuan) {
      setKabar({ teks: `Itu batang ${HURUF[i]} sendiri. Cari batang lain yang sama panjang dengannya.`, ok: false });
      return;
    }
    if (i === kunci) {
      setKabar(null);
      setBenar(i);
      letusan.picu();
      onBeres();
    } else {
      setKabar({
        teks:
          tanya === "sama"
            ? "Lihat ujung kanan batang. Batang yang sama panjang berakhir di tempat yang sama."
            : "Semua batang mulai dari garis awal yang sama. Bandingkan ujung kanan setiap batang.",
        ok: false,
      });
    }
  };

  const perintah = tanya === "sama" ? `Ketuk batang yang sama panjang dengan batang ${HURUF[acuan as number]}.` : `Ketuk batang yang paling ${tanya === "terpanjang" ? "panjang" : "pendek"}.`;

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih panjang" : suara ? "Hebat!" : beres ? "Batangmu tepat!" : perintah}
        teks={`${perintah} Semua batang mulai dari garis awal yang sama.${akhir ? " Di akhir, ucapkan berapa batang yang lebih panjang dari batang D." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox={`0 0 300 ${tinggi}`} className="block h-auto w-full" role="group" aria-label="Batang A sampai batang yang akan dibandingkan">
          <path d={`M${X_BATANG} 4 V${tinggi - 4}`} stroke="#DC2626" strokeWidth="2.2" strokeDasharray="5 4" strokeLinecap="round" />
          {panjang.map((p, i) => {
            const y = 10 + i * 34;
            const sorot = benar === i;
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={`Batang ${HURUF[i]}`}
                onClick={() => ketuk(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(i);
                  }
                }}
                style={{ cursor: beres ? "default" : "pointer", outline: "none" }}
              >
                <rect x="2" y={y - 3} width="296" height="30" fill="transparent" />
                <circle cx="24" cy={y + 12} r="11" fill="#FFFFFF" stroke={sorot ? "#F0AB00" : BIRU} strokeWidth="2.6" />
                <text x="24" y={y + 16.6} textAnchor="middle" fontSize="13" fontWeight="900" fill={BIRU}>
                  {HURUF[i]}
                </text>
                <rect x={X_BATANG} y={y} width={p * SATUAN_BATANG} height="24" rx="4" fill={sorot ? "#FDE047" : WARNA_BATANG[i % WARNA_BATANG.length]} stroke={BIRU} strokeWidth={sorot ? 3.6 : 2.4} />
              </g>
            );
          })}
        </svg>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `Batang yang lebih panjang dari batang D: ?` : kalimat}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuPilihBatang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pilih Batang"
      warna="#FDE68A"
      petunjuk="Bandingkan batang-batang polos yang mulai dari garis awal yang sama. Ketuk batang yang paling panjang, yang paling pendek, atau yang sama panjang. Pada soal terakhir, ucapkan berapa batang yang lebih panjang dari batang D."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-batang"
      jumlahRonde={RONDE_BATANG.length}
      kunciAkhir={2}
      belumSiap="Ketuk batangnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePilihBatang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Susun Tangga Batang ------------------------------- */

type RondeTangga = { arah: "naik" | "turun"; tinggi: number[] };

const RONDE_TANGGA: RondeTangga[] = [
  { arah: "naik", tinggi: [54, 30, 78] },
  { arah: "turun", tinggi: [40, 88, 64, 76] },
  { arah: "naik", tinggi: [50, 84, 30, 68, 96] },
];

function RondeTanggaBatang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { arah, tinggi } = RONDE_TANGGA[ronde];
  const akhir = ronde === RONDE_TANGGA.length - 1;
  const n = tinggi.length;
  const kunci = tinggi.map((_, i) => i).sort((a, b) => (arah === "naik" ? tinggi[a] - tinggi[b] : tinggi[b] - tinggi[a]));
  const [urutan, setUrutan] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = urutan.length === n;
  const suara = panel.suara["a7-tangga"] === true && akhir;
  const namaUrut = kunci.map((i) => HURUF[i]).join(", ");
  useBicara(akhir ? suara : beres, `Urutan dari paling ${arah === "naik" ? "pendek" : "tinggi"}: ${namaUrut}.${akhir ? ` Ada ${sebut(n - 1)} batang yang lebih tinggi dari batang yang paling pendek.` : ""}`);
  const lebar = 270 / n;

  const ketuk = (i: number) => {
    if (beres || urutan.includes(i)) return;
    if (i !== kunci[urutan.length]) {
      const lebihTinggi = tinggi[i] > tinggi[kunci[urutan.length]];
      setKabar({
        teks:
          arah === "naik"
            ? lebihTinggi
              ? "Masih ada batang yang lebih pendek. Ketuk batang yang paling pendek dulu."
              : "Batang ini lebih pendek dari yang kamu butuhkan. Ketuk batang berikutnya yang lebih tinggi."
            : lebihTinggi
              ? "Batang ini lebih tinggi dari yang kamu butuhkan. Ketuk batang berikutnya yang lebih pendek."
              : "Masih ada batang yang lebih tinggi. Ketuk batang yang paling tinggi dulu.",
        ok: false,
      });
      return;
    }
    setKabar(null);
    const baru = [...urutan, i];
    setUrutan(baru);
    if (baru.length === n) {
      letusan.picu();
      onBeres();
    }
  };

  const perintah = `Ketuk batang satu per satu, mulai dari yang paling ${arah === "naik" ? "pendek" : "tinggi"}.`;

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih tinggi" : suara ? "Hebat!" : beres ? "Tanggamu rapi!" : arah === "naik" ? "Dari yang paling pendek" : "Dari yang paling tinggi"}
        teks={`${perintah} Batang yang sudah diketuk naik ke tangga di bawah.${akhir ? " Di akhir, ucapkan berapa batang yang lebih tinggi dari batang yang paling pendek." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <svg viewBox="0 0 300 126" className="block h-auto w-full" role="group" aria-label="Batang-batang yang belum diurutkan">
          <path d="M8 108 H292" stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
          {tinggi.map((t, i) => {
            const cx = (300 / (n + 1)) * (i + 1);
            const sudah = urutan.includes(i);
            return (
              <g
                key={i}
                role="button"
                tabIndex={sudah ? -1 : 0}
                aria-label={`Batang ${HURUF[i]}${sudah ? `, urutan ke-${urutan.indexOf(i) + 1}` : ""}`}
                onClick={() => ketuk(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    ketuk(i);
                  }
                }}
                style={{ cursor: sudah || beres ? "default" : "pointer", outline: "none", opacity: sudah ? 0.35 : 1 }}
              >
                <rect x={cx - 24} y={108 - t - 4} width="48" height={t + 28} fill="transparent" />
                <rect x={cx - 15} y={108 - t} width="30" height={t} rx="4" fill={WARNA_BATANG[i % WARNA_BATANG.length]} stroke={BIRU} strokeWidth="2.4" />
                <text x={cx} y="122" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
                  {HURUF[i]}
                </text>
                {sudah ? (
                  <g>
                    <circle cx={cx} cy={108 - t - 12} r="10" fill="#FDE047" stroke={BIRU} strokeWidth="2.2" />
                    <text x={cx} y={108 - t - 7.6} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={BIRU}>
                      {urutan.indexOf(i) + 1}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
        <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Tangga batang</p>
        <svg viewBox="0 0 300 118" className="block h-auto w-full" role="img" aria-label={`Tangga batang berisi ${urutan.length} dari ${n} batang`}>
          <path d="M8 100 H292" stroke={BIRU} strokeWidth="2.4" strokeLinecap="round" />
          {kunci.map((_, k) => (
            <rect key={k} x={15 + k * lebar} y="22" width={lebar - 4} height="78" rx="4" fill="none" stroke={BIRU} strokeWidth="1.6" strokeDasharray="4 4" opacity="0.35" />
          ))}
          {urutan.map((i, k) => (
            <g key={i} className="igil-muncul">
              <rect x={15 + k * lebar + (lebar - 4) / 2 - 12} y={100 - tinggi[i]} width="24" height={tinggi[i]} rx="3" fill={WARNA_BATANG[i % WARNA_BATANG.length]} stroke={BIRU} strokeWidth="2.2" />
              <text x={15 + k * lebar + (lebar - 4) / 2} y="114" textAnchor="middle" fontSize="12" fontWeight="900" fill={BIRU}>
                {HURUF[i]}
              </text>
            </g>
          ))}
        </svg>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Batang yang lebih tinggi dari batang terpendek: ?" : `Urutan: ${namaUrut}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTangga({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Tangga Batang"
      warna="#BBF7D0"
      petunjuk="Mengurutkan batang. Ketuk batang satu per satu, dari yang paling pendek atau dari yang paling tinggi. Batang yang benar akan naik ke tangga. Pada soal terakhir, ucapkan berapa batang yang lebih tinggi dari batang yang paling pendek."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-tangga"
      jumlahRonde={RONDE_TANGGA.length}
      kunciAkhir={4}
      belumSiap="Susun tangganya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTanggaBatang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Jodohkan Diagram dan Kalimat ----------------------- */

type KartuDiagram = { arah: "tegak" | "datar"; huruf: string[]; ukuran: number[]; kalimat: string };
type RondeJodoh = { kartu: KartuDiagram[]; urutKalimat: number[] };

const RONDE_JODOH: RondeJodoh[] = [
  {
    kartu: [
      { arah: "tegak", huruf: ["A", "B"], ukuran: [60, 36], kalimat: "A lebih tinggi dari B" },
      { arah: "tegak", huruf: ["B", "C"], ukuran: [48, 48], kalimat: "B sama tinggi dengan C" },
      { arah: "tegak", huruf: ["A", "B", "C"], ukuran: [44, 70, 56], kalimat: "B paling tinggi" },
    ],
    urutKalimat: [2, 0, 1],
  },
  {
    kartu: [
      { arah: "datar", huruf: ["P", "Q"], ukuran: [100, 56], kalimat: "P lebih panjang dari Q" },
      { arah: "datar", huruf: ["R", "S"], ukuran: [76, 76], kalimat: "R sama panjang dengan S" },
      { arah: "datar", huruf: ["T", "U", "V"], ukuran: [40, 76, 100], kalimat: "T paling pendek" },
    ],
    urutKalimat: [1, 2, 0],
  },
  {
    kartu: [
      { arah: "tegak", huruf: ["A", "B"], ukuran: [36, 64], kalimat: "A lebih pendek dari B" },
      { arah: "tegak", huruf: ["A", "B", "C", "D"], ukuran: [30, 70, 50, 70], kalimat: "B sama tinggi dengan D" },
      { arah: "tegak", huruf: ["K", "L", "M", "N"], ukuran: [50, 30, 70, 90], kalimat: "L paling pendek" },
    ],
    urutKalimat: [2, 0, 1],
  },
];

const WARNA_PASANG = ["#BBF7D0", "#BFDBFE", "#FDE68A"];

function KartuGambar({ k }: { k: KartuDiagram }) {
  const n = k.huruf.length;
  if (k.arah === "tegak") {
    return (
      <svg viewBox="0 0 120 106" className="block h-auto w-full" aria-hidden="true">
        <path d="M6 90 H114" stroke={BIRU} strokeWidth="2" strokeLinecap="round" />
        {k.ukuran.map((u, i) => {
          const cx = (120 / (n + 1)) * (i + 1);
          return (
            <g key={i}>
              <rect x={cx - 9} y={90 - u} width="18" height={u} rx="3" fill={WARNA_BATANG[i % WARNA_BATANG.length]} stroke={BIRU} strokeWidth="2" />
              <text x={cx} y="102" textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                {k.huruf[i]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 106" className="block h-auto w-full" aria-hidden="true">
      <path d="M26 6 V100" stroke="#DC2626" strokeWidth="1.6" strokeDasharray="4 3" strokeLinecap="round" />
      {k.ukuran.map((u, i) => {
        const y = 12 + i * 30;
        return (
          <g key={i}>
            <circle cx="12" cy={y + 8} r="8" fill="#FFFFFF" stroke={BIRU} strokeWidth="1.8" />
            <text x="12" y={y + 12} textAnchor="middle" fontSize="10.5" fontWeight="900" fill={BIRU}>
              {k.huruf[i]}
            </text>
            <rect x="26" y={y} width={u * 0.86} height="16" rx="3" fill={WARNA_BATANG[i % WARNA_BATANG.length]} stroke={BIRU} strokeWidth="2" />
          </g>
        );
      })}
    </svg>
  );
}

function RondeJodohkan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { kartu, urutKalimat } = RONDE_JODOH[ronde];
  const akhir = ronde === RONDE_JODOH.length - 1;
  const [pasang, setPasang] = useState<(number | null)[]>(() => kartu.map(() => null));
  const [pilihKartu, setPilihKartu] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = pasang.every((v) => v !== null);
  const suara = panel.suara["a7-jodoh"] === true && akhir;
  useBicara(akhir ? suara : beres, `${kartu.map((k) => k.kalimat).join(". ")}.${akhir ? ` Pada diagram ketiga, ada ${sebut(3)} batang yang lebih tinggi dari batang L.` : ""}`);

  const pilihKal = (j: number) => {
    if (beres || pasang.includes(j)) return;
    if (pilihKartu === null) {
      setKabar({ teks: "Pilih dulu satu diagram, lalu ketuk kalimat yang cocok.", ok: false });
      return;
    }
    if (kartu[pilihKartu].kalimat === kartu[j].kalimat) {
      const baru = pasang.slice();
      baru[pilihKartu] = j;
      setPasang(baru);
      setPilihKartu(null);
      setSalah(null);
      setKabar(null);
      if (baru.every((v) => v !== null)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(j);
      setKabar({ teks: "Bandingkan batang pada diagram dengan kalimat itu. Lihat ujung atas atau ujung kanan batangnya.", ok: false });
    }
  };

  const nomorPasang = (j: number) => pasang.indexOf(j);

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih tinggi" : suara ? "Hebat!" : beres ? "Semua berjodoh!" : "Jodohkan diagram dan kalimat"}
        teks={`Ketuk satu diagram, lalu ketuk kalimat yang cocok dengannya.${akhir ? " Di akhir, ucapkan pada diagram ketiga ada berapa batang yang lebih tinggi dari batang L." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-3 gap-1.5">
          {kartu.map((k, i) => {
            const sudah = pasang[i] !== null;
            return (
              <button
                key={i}
                type="button"
                aria-pressed={pilihKartu === i}
                aria-label={`Diagram ${i + 1}${sudah ? ", sudah berjodoh" : ""}`}
                onClick={() => {
                  if (sudah || beres) return;
                  setPilihKartu(i);
                  setKabar(null);
                }}
                className={`rounded-2xl border-4 px-1 py-1 ${sudah ? "border-[#7FCB96]" : pilihKartu === i ? "border-[#F0AB00] ring-4 ring-[#F0AB00]/50" : "border-[#1C01A5]"}`}
                style={{ backgroundColor: sudah ? WARNA_PASANG[i % 3] : "#FFFFFF" }}
              >
                <KartuGambar k={k} />
                <span className="block text-sm font-black text-[#1C01A5]">{sudah ? `✔ ${i + 1}` : `Diagram ${i + 1}`}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-1.5">
          {urutKalimat.map((j) => (
            <button
              key={`${j}-${salah === j ? "x" : "o"}`}
              type="button"
              aria-label={`Kalimat: ${kartu[j].kalimat}${nomorPasang(j) >= 0 ? ", sudah berjodoh" : ""}`}
              onClick={() => pilihKal(j)}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl border-4 px-2 py-2 text-lg font-black text-[#1C01A5] ${salah === j ? "igil-goyang" : ""} ${nomorPasang(j) >= 0 ? "border-[#7FCB96]" : "border-[#1C01A5] bg-[#FFE566]"}`}
              style={nomorPasang(j) >= 0 ? { backgroundColor: WARNA_PASANG[nomorPasang(j) % 3] } : undefined}
            >
              {nomorPasang(j) >= 0 ? <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm">{nomorPasang(j) + 1}</span> : null}
              {kartu[j].kalimat}
            </button>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Batang yang lebih tinggi dari batang L: ?" : "Semua diagram dan kalimat sudah berjodoh"}
          </p>
        ) : null}
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
      judul="Jodohkan Diagram dan Kalimat"
      warna="#C7D2FE"
      petunjuk="Menjodohkan. Ketuk satu diagram batang, lalu ketuk kalimat perbandingan yang cocok dengannya. Pada soal terakhir, ucapkan pada diagram ketiga ada berapa batang yang lebih tinggi dari batang L."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-jodoh"
      jumlahRonde={RONDE_JODOH.length}
      kunciAkhir={3}
      belumSiap="Jodohkan semuanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJodohkan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
