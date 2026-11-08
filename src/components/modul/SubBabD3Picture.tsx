"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useContext, useState } from "react";
import { TeksCerita } from "./diagram-pictorial";
import { GameRonde, KERTAS_GAMBAR, PilihAngka, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { opsiKurang, ucapKurang } from "./SubBabA3Pengurangan";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { BatangModel, Kurang, Label, Rangkai, SelBatang, TINTA, kurangTok } from "./soal-cerita-d3-umum";
import { CatatanTempel, PitaTahap, SuaraCtx, useBicara } from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab D, Tahap 5: Picture. Diagram saja, tanpa gambar benda.       */
/*  5 Batang Cerita (coret yang pergi), 6 Jodohkan Cerita dan Batang,         */
/*  7 Dua Lompatan Mundur (garis bilangan)                                    */
/* ------------------------------------------------------------------------ */

type Props = { ronde: number; panel: PanelSuara; onBeres: () => void };

/* --------- Permainan 5. Batang Cerita (hlm. 106) -------------------------- */

const RONDE_BATANG = [
  { mula: 8, pergi: 2, baris: ["Ada 8 burung di pohon.", "Sebanyak 2 burung terbang.", "Berapa sisa burung?"] },
  { mula: 10, pergi: 2, baris: ["Ada 10 kepik di daun.", "Sebanyak 2 kepik terbang.", "Berapa sisa kepik?"] },
  { mula: 9, pergi: 4, baris: ["Ada 9 kelereng di kantong.", "Sebanyak 4 kelereng diberikan.", "Berapa sisa kelereng?"] },
];

function RondeBatang({ ronde, panel, onBeres }: Props) {
  const d = RONDE_BATANG[ronde];
  const sisa = d.mula - d.pergi;
  const [nCoret, setNCoret] = useState(0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_BATANG.length - 1;
  const siap = nCoret === d.pergi;
  const suara = panel.suara["d3-batang"] === true && akhir;
  const buka = akhir ? suara : benar;
  useBicara(buka, `${ucapKurang(d.mula, d.pergi, sisa)}. Sisanya ${kataK(sisa)}.`);

  const ketuk = (merah: boolean) => {
    if (benar || (akhir && siap)) return;
    setKabar(null);
    if (merah) {
      if (siap) return;
      const n = nCoret + 1;
      setNCoret(n);
      if (n === d.pergi && akhir) {
        letusan.picu();
        onBeres();
      }
    } else {
      setNCoret(Math.max(0, nCoret - 1));
    }
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
      setKabar({ teks: "Belum tepat. Hitung kotak merah yang tidak dicoret.", ok: false });
    }
  };
  const nMerah = d.mula - nCoret;

  return (
    <>
      <CatatanTempel
        pendek={buka ? "Hebat!" : siap ? (akhir ? "Ucapkan: sisanya" : "Berapa kotak merah?") : `Coret ${d.pergi} kotak`}
        teks={`Satu kotak mewakili satu benda. Ada ${kataK(d.mula)} kotak merah. Ketuk kotak merah untuk mencoret yang pergi. Coret ${kataK(d.pergi)} kotak. Kotak merah yang tersisa adalah jawabannya.`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={d.baris} />
        <div role="group" aria-label="Batang cerita" className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <div className="flex">
            <Label teks="Mula-mula" nilai={d.mula} grow={d.mula} />
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: nMerah }, (_, i) => (
              <button
                key={`m${i}`}
                type="button"
                aria-label={`Kotak merah ke-${i + 1}, ketuk untuk mencoret`}
                onClick={() => ketuk(true)}
                className="igil-tanpa-tepi flex min-w-0 flex-1"
              >
                <SelBatang jenis="ada" />
              </button>
            ))}
            {Array.from({ length: nCoret }, (_, i) => (
              <button
                key={`c${i}`}
                type="button"
                aria-label={`Kotak dicoret ke-${i + 1}, ketuk untuk membatalkan`}
                onClick={() => ketuk(false)}
                className="igil-tanpa-tepi flex min-w-0 flex-1"
              >
                <SelBatang jenis="pergi" />
              </button>
            ))}
          </div>
          {siap ? (
            <div className="igil-muncul flex gap-1">
              <Label teks="Sisa" nilai={buka ? sisa : "?"} grow={nMerah} bawah nyala={!buka} />
              <Label teks="Pergi" nilai={d.pergi} grow={d.pergi} bawah />
            </div>
          ) : (
            <p className="text-center text-[11px] font-black text-[#1C01A5]/70">Ketuk kotak merah untuk mencoret yang pergi</p>
          )}
        </div>
        {siap ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <Kurang a={d.mula} b={d.pergi} c={buka ? sisa : "?"} nyala={buka ? [] : [4]} />
            </div>
            {!akhir && !benar ? <PilihAngka opsi={opsiKurang(sisa)} keliru={keliru} onPilih={pilih} /> : null}
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuBatang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Batang Cerita"
      warna="#FBCFE8"
      petunjuk="Satu kotak mewakili satu benda. Ketuk kotak merah untuk mencoret benda yang pergi. Lalu hitung kotak merah yang tersisa. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-batang"
      jumlahRonde={RONDE_BATANG.length}
      kunciAkhir={5}
      belumSiap="Coret kotak yang pergi dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBatang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Jodohkan Cerita dan Batang (hlm. 106-108) --------- */

type CeritaJodoh = {
  teks: string[];
  tanya: "sisa" | "pergi" | "mula";
  mula: number | "?";
  pergi: number | "?";
  sisa: number | "?";
  jawab: number;
};
const NAMA_TANYA = { sisa: "sisa", pergi: "yang pergi", mula: "mula-mula" } as const;

const RONDE_JODOH: { cerita: CeritaJodoh[]; urut: number[] }[] = [
  {
    urut: [2, 0, 1],
    cerita: [
      { teks: ["Ada 10 burung. 4 burung terbang.", "Berapa sisanya?"], tanya: "sisa", mula: 10, pergi: 4, sisa: "?", jawab: 6 },
      { teks: ["Ada 7 siswa di kelas. 5 siswa masih di kelas.", "Berapa yang pergi?"], tanya: "pergi", mula: 7, pergi: "?", sisa: 5, jawab: 2 },
      { teks: ["Beberapa bola ada di kardus. 3 bola dikeluarkan. Sisa 5 bola.", "Berapa mula-mula?"], tanya: "mula", mula: "?", pergi: 3, sisa: 5, jawab: 8 },
    ],
  },
  {
    urut: [1, 2, 0],
    cerita: [
      { teks: ["Ada 9 kue. 3 kue dimakan.", "Berapa sisanya?"], tanya: "sisa", mula: 9, pergi: 3, sisa: "?", jawab: 6 },
      { teks: ["Ada 8 anak di lapangan. 6 anak masih bermain.", "Berapa yang pergi?"], tanya: "pergi", mula: 8, pergi: "?", sisa: 6, jawab: 2 },
      { teks: ["Beberapa kelereng ada di kantong. 2 kelereng diberikan. Sisa 5 kelereng.", "Berapa mula-mula?"], tanya: "mula", mula: "?", pergi: 2, sisa: 5, jawab: 7 },
    ],
  },
];
const HURUF = ["A", "B", "C"];

function RondeJodoh({ ronde, panel, onBeres }: Props) {
  const { cerita, urut } = RONDE_JODOH[ronde];
  const bicara = useContext(SuaraCtx);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [cocok, setCocok] = useState<boolean[]>([false, false, false]);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_JODOH.length - 1;
  const siap = cocok.every(Boolean);
  const target = cerita[2];
  const suara = panel.suara["d3-jodoh"] === true && akhir;
  useBicara(
    suara,
    `Mula-mula ada ${kataK(target.jawab)}. Periksa: ${ucapKurang(target.jawab, target.pergi as number, target.sisa as number)}.`
  );

  const pilihCerita = (i: number) => {
    if (cocok[i] || siap) return;
    setTerpilih(i);
    setKabar(null);
    bicara(cerita[i].teks.join(" "));
  };
  const pilihBatang = (idx: number) => {
    if (cocok[idx] || siap) return;
    if (terpilih === null) {
      setKabar({ teks: "Pilih satu cerita dulu, lalu pilih batangnya.", ok: false });
      return;
    }
    if (terpilih === idx) {
      const baru = cocok.slice();
      baru[idx] = true;
      setCocok(baru);
      setTerpilih(null);
      setSalah(null);
      setKabar({ teks: `Cocok! Yang dicari: ${NAMA_TANYA[cerita[idx].tanya]}.`, ok: true });
      if (baru.every(Boolean)) {
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(idx);
      setKabar({ teks: "Belum cocok. Lihat angka dan bagian yang bertanda tanya.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : siap ? (akhir ? "Ucapkan: mula-mula cerita C" : "Hebat! Semua cocok.") : "Jodohkan cerita dan batang"}
        teks="Ada tiga cerita dan tiga batang. Ketuk satu cerita, lalu ketuk batang yang cocok. Perhatikan angka yang diketahui dan bagian yang bertanda tanya."
      />
      <div className={KERTAS_GAMBAR}>
        <div className="space-y-1.5">
          {cerita.map((c, i) => (
            <button
              key={i}
              type="button"
              aria-pressed={terpilih === i}
              aria-label={`Cerita ${HURUF[i]}: ${c.teks.join(" ")}${cocok[i] ? " (sudah dijodohkan)" : ""}`}
              onClick={() => pilihCerita(i)}
              className={`flex w-full items-center gap-2 rounded-2xl border-4 px-2 py-1.5 text-left ${
                cocok[i] ? "border-[#16A34A] bg-[#DCFCE7]" : terpilih === i ? "border-[#F0AB00] bg-[#FFF8D6]" : "border-[#1C01A5] bg-white"
              }`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFE566] text-lg font-black text-[#1C01A5]">{HURUF[i]}</span>
              <span className="min-w-0 text-sm font-black leading-snug text-[#1C01A5]">{c.teks.join(" ")}</span>
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          {urut.map((idx, j) => {
            const c = cerita[idx];
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Batang ${j + 1}: mula-mula ${c.mula}, pergi ${c.pergi}, sisa ${c.sisa}${cocok[idx] ? ", sudah dijodohkan" : ""}`}
                onClick={() => pilihBatang(idx)}
                className={`relative block w-full rounded-2xl text-left ${salah === idx ? "igil-goyang" : ""} ${
                  cocok[idx] ? "ring-4 ring-[#16A34A]" : ""
                }`}
              >
                <BatangModel
                  mula={akhir && suara && c.tanya === "mula" ? c.jawab : c.mula}
                  pergi={c.pergi}
                  sisa={c.sisa}
                  nyala={cocok[idx] ? c.tanya : undefined}
                />
                <span className="absolute right-2 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1C01A5] text-xs font-black text-white">
                  {cocok[idx] ? HURUF[idx] : j + 1}
                </span>
              </button>
            );
          })}
        </div>
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuJodoh({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Jodohkan Cerita dan Batang"
      warna="#BBF7D0"
      petunjuk="Ada tiga cerita bertanda A, B, dan C, dan tiga batang bernomor. Ketuk satu cerita, lalu ketuk batang yang cocok. Ada cerita yang mencari sisa, ada yang mencari benda yang pergi, dan ada yang mencari jumlah mula-mula. Pada soal terakhir, ucapkan jumlah mula-mula pada cerita C."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-jodoh"
      jumlahRonde={RONDE_JODOH.length}
      kunciAkhir={7}
      belumSiap="Jodohkan ketiga cerita dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJodoh ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Dua Lompatan Mundur (hlm. 108) -------------------- */

const RONDE_LOMPAT = [
  { mula: 9, a: 2, b: 4 },
  { mula: 10, a: 3, b: 2 },
  { mula: 8, a: 2, b: 5 },
];

type Lompatan = { dari: number; ke: number; warna: string; atas: boolean };

const cx = (n: number) => (n + 0.5) * 30;

function Busur({ l }: { l: Lompatan }) {
  const x1 = cx(l.dari);
  const x2 = cx(l.ke);
  const t = Math.abs(l.dari - l.ke);
  const tinggi = 14 + t * 6;
  const dasar = l.atas ? 56 : 6;
  const kendali = l.atas ? dasar - tinggi : dasar + tinggi;
  return (
    <path
      d={`M ${x1} ${dasar} Q ${(x1 + x2) / 2} ${kendali} ${x2} ${dasar}`}
      fill="none"
      stroke={l.warna}
      strokeWidth="4"
      strokeLinecap="round"
      markerEnd={`url(#d3-panah-${l.warna.slice(1)})`}
    />
  );
}

function SvgBusur({ lompat, atas }: { lompat: Lompatan[]; atas: boolean }) {
  const daftar = lompat.filter((l) => l.atas === atas);
  const warna = Array.from(new Set(daftar.map((l) => l.warna)));
  return (
    <svg viewBox="0 0 330 62" className="block h-auto w-full" aria-hidden="true">
      <defs>
        {warna.map((w) => (
          <marker key={w} id={`d3-panah-${w.slice(1)}`} markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill={w} />
          </marker>
        ))}
      </defs>
      {daftar.map((l, i) => (
        <Busur key={i} l={l} />
      ))}
    </svg>
  );
}

function GarisLompat({
  lompat,
  mulai,
  mendarat,
  onTap,
  mati,
}: {
  lompat: Lompatan[];
  mulai: number;
  mendarat: number[];
  onTap: (n: number) => void;
  mati: boolean;
}) {
  return (
    <div role="group" aria-label="Garis bilangan 0 sampai 10" className="mx-auto w-full max-w-[330px]">
      <SvgBusur lompat={lompat} atas />
      <div className="grid grid-cols-11">
        {Array.from({ length: 11 }, (_, n) => (
          <button
            key={n}
            type="button"
            disabled={mati}
            aria-label={`Angka ${n}${n === mulai ? ", titik mulai" : ""}`}
            onClick={() => onTap(n)}
            className={`mx-auto flex aspect-square w-full max-w-[28px] items-center justify-center rounded-full border-[3px] text-xs font-black leading-none ${
              n === mulai
                ? "border-[#1C01A5] bg-[#E11D48] text-white"
                : mendarat.includes(n)
                  ? "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"
                  : "border-[#1C01A5] bg-white text-[#1C01A5]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mx-1 mt-0.5 h-1 rounded-full" style={{ backgroundColor: TINTA }} />
      <SvgBusur lompat={lompat} atas={false} />
    </div>
  );
}

function RondeLompat({ ronde, panel, onBeres }: Props) {
  const d = RONDE_LOMPAT[ronde];
  const tengah = d.mula - d.a;
  const sisa = tengah - d.b;
  const [tahap, setTahap] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_LOMPAT.length - 1;
  const suara = panel.suara["d3-lompat"] === true && akhir;
  const buka = akhir ? suara : tahap === 2;
  useBicara(buka, `${ucapKurang(d.mula, d.a, tengah)}. ${ucapKurang(tengah, d.b, sisa)}. Hasil akhirnya ${kataK(sisa)}.`);

  const tap = (n: number) => {
    if (tahap === 0) {
      if (n === tengah) {
        setTahap(1);
        setKabar(null);
        if (akhir) {
          letusan.picu();
          onBeres();
        }
      } else {
        setKabar({ teks: `Belum tepat. Mundur ${d.a} langkah ke kiri dari ${d.mula}.`, ok: false });
      }
      return;
    }
    if (tahap === 1 && !akhir) {
      if (n === sisa) {
        setTahap(2);
        setKabar(null);
        letusan.picu();
        onBeres();
      } else {
        setKabar({ teks: `Belum tepat. Mundur ${d.b} langkah ke kiri dari ${tengah}.`, ok: false });
      }
    }
  };

  const lompat: Lompatan[] = [];
  if (tahap >= 1) lompat.push({ dari: d.mula, ke: tengah, warna: "#E11D48", atas: true });
  if (tahap >= 2) lompat.push({ dari: tengah, ke: sisa, warna: "#F59E0B", atas: false });
  const mendarat = [tahap >= 1 ? tengah : -1, tahap >= 2 ? sisa : -1];
  const gabung = d.a + d.b;
  const tanya = akhir && tahap >= 1 ? "Berapa hasil akhirnya?" : tahap === 0 ? `Mundur ${d.a}. Mendarat di angka berapa?` : `Mundur ${d.b} lagi. Mendarat di angka berapa?`;
  const baris = [`Mula-mula di ${d.mula}.`, `Mundur ${d.a}, lalu mundur ${d.b}.`, tanya];

  return (
    <>
      <CatatanTempel
        pendek={buka ? "Hebat!" : tahap === 1 && akhir ? "Ucapkan: hasil akhirnya" : tahap === 0 ? `Mundur ${d.a} dulu` : `Mundur ${d.b} lagi`}
        teks={`Mulai dari ${kataK(d.mula)}. Mundur dua kali. Lompatan pertama mundur ${kataK(d.a)} langkah. Ketuk angka tempat mendarat. ${akhir ? "Setelah itu ucapkan hasil akhir setelah mundur dua kali." : `Lompatan kedua mundur ${kataK(d.b)} langkah. Ketuk angka tempat mendarat lagi.`}`}
      />
      <div className={KERTAS_GAMBAR}>
        <TeksCerita baris={baris} />
        <GarisLompat lompat={lompat} mulai={d.mula} mendarat={mendarat} onTap={tap} mati={tahap === 2 || (akhir && tahap === 1)} />
        {tahap >= 1 ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2 text-center">
            <Rangkai tok={kurangTok(d.mula, d.a, tengah)} />
            {tahap === 2 || (akhir && tahap === 1) ? (
              <Rangkai tok={akhir ? [d.mula, "−", d.a, "−", d.b, "=", buka ? sisa : "?"] : [tengah, "−", d.b, "=", sisa]} nyala={akhir && !buka ? [6] : []} />
            ) : null}
          </div>
        ) : null}
        {tahap === 2 && !akhir ? (
          <div className="igil-muncul space-y-1 rounded-2xl border-4 border-[#16A34A] bg-[#F0FDF4] px-2 py-2 text-center">
            <p className="text-sm font-black text-[#14532D]">Cara lain: gabung dulu yang dikurangi</p>
            <Rangkai tok={[d.a, "+", d.b, "=", gabung]} />
            <Rangkai tok={kurangTok(d.mula, gabung, sisa)} />
          </div>
        ) : null}
        <KabarChip kabar={kabar} />
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

function KartuLompat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Dua Lompatan Mundur"
      warna="#FEF08A"
      petunjuk="Mulai dari angka merah di garis bilangan. Mundur dua kali ke kiri. Ketuk angka tempat kamu mendarat setiap kali melompat. Pada soal terakhir, setelah lompatan pertama, ucapkan hasil akhir setelah dua kali mundur."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-lompat"
      jumlahRonde={RONDE_LOMPAT.length}
      kunciAkhir={1}
      belumSiap="Ketuk tempat mendarat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLompat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Picture --------------------------------------------- */

type TipePicture = "batang" | "jodoh" | "lompat";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "batang" },
  { nomor: 6, tipe: "jodoh" },
  { nomor: 7, tipe: "lompat" },
];

export function PictureSoalCeritaD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_PICTURE[indeks];
  const terakhir = indeks >= KARTU_PICTURE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Coret, jodohkan, dan lompat" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "batang" ? <KartuBatang {...dasar} /> : null}
        {kartu.tipe === "jodoh" ? <KartuJodoh {...dasar} /> : null}
        {kartu.tipe === "lompat" ? <KartuLompat {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}