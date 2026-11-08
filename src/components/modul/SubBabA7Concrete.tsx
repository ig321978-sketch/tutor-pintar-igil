"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { BIRU, HIJAU, MERAH_MUDA } from "./CeritaBandingB";
import { AnakSvg, BalonWarna, BurungWarna, KupuWarna, PensilG, PohonG, WARNA_PENSIL } from "./ukur-7-dasar";
import { sebut } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab A, Tahap 4 Concrete: benda nyata. Anak membariskan teman     */
/* menurut tinggi, menggeser pensil ke garis awal, memasang kartu kata pada   */
/* pohon pisang, dan menerbangkan kupu-kupu ke ketinggian yang tepat.         */
/*  1 Berbaris Menurut Tinggi (seret anak ke tempatnya)                       */
/*  2 Sejajarkan di Garis Awal (ketuk pensil, lalu pilih)                     */
/*  3 Kartu Kata Perbandingan (seret kartu kata ke kalimat)                   */
/*  4 Kupu-Kupu Terbang (seret ke ketinggian menurut petunjuk)                */
/* ------------------------------------------------------------------------ */

const WARNA_ANAK: Record<string, { rambut: string; baju: string }> = {
  Kira: { rambut: "#1F2937", baju: MERAH_MUDA },
  Upe: { rambut: "#7A4A1E", baju: "#FDE047" },
  Malosi: { rambut: "#111827", baju: HIJAU },
  Wei: { rambut: "#1F2937", baju: "#93C5FD" },
};

/* --------- Permainan 1. Berbaris Menurut Tinggi --------------------------- */

type RondeBaris = { arah: "naik" | "turun"; anak: { nama: string; h: number }[] };

const RONDE_BARIS: RondeBaris[] = [
  {
    arah: "naik",
    anak: [
      { nama: "Upe", h: 0.98 },
      { nama: "Kira", h: 0.74 },
      { nama: "Wei", h: 0.86 },
    ],
  },
  {
    arah: "naik",
    anak: [
      { nama: "Malosi", h: 1.1 },
      { nama: "Kira", h: 0.74 },
      { nama: "Upe", h: 0.98 },
      { nama: "Wei", h: 0.86 },
    ],
  },
  {
    arah: "turun",
    anak: [
      { nama: "Kira", h: 0.84 },
      { nama: "Malosi", h: 1.12 },
      { nama: "Wei", h: 0.84 },
      { nama: "Upe", h: 0.96 },
    ],
  },
];

function RondeBarisAnak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { arah, anak } = RONDE_BARIS[ronde];
  const akhir = ronde === RONDE_BARIS.length - 1;
  const urut = anak.map((a) => a.h).sort((x, y) => (arah === "naik" ? x - y : y - x));
  const [slot, setSlot] = useState<(number | null)[]>(() => anak.map(() => null));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = slot.every((v) => v !== null);
  const suara = panel.suara["a7-baris"] === true && akhir;
  const namaUrut = slot.map((v) => (v === null ? "" : anak[v].nama));
  const tertinggi = anak.reduce((a, b) => (b.h > a.h ? b : a)).nama;
  const kalimatUrut = `Dari yang paling ${arah === "naik" ? "pendek" : "tinggi"}: ${namaUrut.join(", ")}.${akhir ? ` ${tertinggi} paling tinggi. Ada ${sebut(anak.length - 1)} anak yang lebih pendek dari ${tertinggi}.` : ""}`;
  useBicara(akhir ? suara : beres, kalimatUrut);

  const taruh = (i: number, k: number) => {
    if (slot[k] !== null || slot.includes(i) || beres) return;
    const h = anak[i].h;
    if (h !== urut[k]) {
      setGoyang(k);
      setTerpilih(null);
      const lebihTinggi = h > urut[k];
      setKabar({
        teks:
          arah === "naik"
            ? lebihTinggi
              ? "Masih ada anak yang lebih pendek dari anak ini. Taruh anak yang lebih pendek lebih dulu."
              : "Anak ini lebih pendek. Tempat ini untuk anak yang lebih tinggi. Taruh anak ini di tempat sebelumnya."
            : lebihTinggi
              ? "Anak ini lebih tinggi. Tempat ini untuk anak yang lebih pendek. Taruh anak ini di tempat sebelumnya."
              : "Masih ada anak yang lebih tinggi dari anak ini. Taruh anak yang lebih tinggi lebih dulu.",
        ok: false,
      });
      return;
    }
    const baru = slot.slice();
    baru[k] = i;
    setSlot(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(anak[i].nama);
    if (baru.every((v) => v !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  const tray = anak.map((_, i) => i).filter((i) => !slot.includes(i));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih pendek" : suara ? "Hebat!" : beres ? "Barisanmu rapi!" : arah === "naik" ? "Dari yang paling pendek" : "Dari yang paling tinggi"}
        teks={`Susun anak-anak berbaris dari yang paling ${arah === "naik" ? "pendek ke yang paling tinggi" : "tinggi ke yang paling pendek"}. Bandingkan tinggi badan mereka. Seret anak ke tempatnya, atau ketuk anaknya lalu ketuk tempatnya.${akhir ? " Di akhir, ucapkan berapa anak yang lebih pendek dari anak yang paling tinggi." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <p className="pb-1 text-center text-xs font-black text-[#1C01A5]">{arah === "naik" ? "paling pendek ➜ paling tinggi" : "paling tinggi ➜ paling pendek"}</p>
          <div className="flex items-end justify-center gap-1.5">
            {slot.map((v, k) => (
              <button
                key={`${k}-${goyang === k ? "x" : "o"}`}
                type="button"
                data-zona={`a7-baris-${k}`}
                aria-label={`Tempat ke-${k + 1}${v !== null ? `, ada ${anak[v].nama}` : ""}`}
                onClick={() => {
                  if (v !== null) return;
                  if (terpilih !== null) taruh(terpilih, k);
                  else setKabar({ teks: "Pilih dulu satu anak di bawah, lalu ketuk tempatnya.", ok: false });
                }}
                className={`flex h-[104px] w-[62px] flex-col items-center justify-end rounded-xl border-4 pb-1 ${v !== null ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/60 bg-[#FFFDF2]"} ${goyang === k ? "igil-goyang" : ""}`}
              >
                {v !== null ? (
                  <>
                    <span className="igil-muncul block">
                      <AnakSvg tinggi={anak[v].h} rambut={WARNA_ANAK[anak[v].nama].rambut} baju={WARNA_ANAK[anak[v].nama].baju} kelas="h-[82px] w-[50px]" />
                    </span>
                    <span className="text-[10px] font-black leading-none text-[#1C01A5]">{anak[v].nama}</span>
                  </>
                ) : (
                  <span className="mb-2 text-2xl font-black text-[#1C01A5]/35">{k + 1}</span>
                )}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-0.5 h-1.5 w-[96%] rounded-full bg-[#B7E0C0]" aria-hidden="true" />
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Anak-anak • seret ke tempatnya</p>
          <div className="flex min-h-[100px] flex-wrap items-end justify-center gap-2 pt-1">
            {tray.map((i) => (
              <BendaSeret
                key={i}
                id={`ak${i}`}
                label={`Anak ${anak[i].nama}`}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("a7-baris-")) taruh(i, Number(z.slice(9)));
                }}
                kelas="rounded-xl"
              >
                <span className={`flex flex-col items-center rounded-xl px-1 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <AnakSvg tinggi={anak[i].h} rambut={WARNA_ANAK[anak[i].nama].rambut} baju={WARNA_ANAK[anak[i].nama].baju} kelas="h-[82px] w-[50px]" />
                  <span className="text-[10px] font-black leading-none text-[#1C01A5]">{anak[i].nama}</span>
                </span>
              </BendaSeret>
            ))}
            {tray.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">semua anak sudah berbaris</span> : null}
          </div>
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${tertinggi} paling tinggi. Anak yang lebih pendek dari ${tertinggi}: ?` : `${namaUrut.join(" ➜ ")}${akhir ? ` • ${sebut(anak.length - 1)} anak lebih pendek dari ${tertinggi}` : ""}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBaris({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Berbaris Menurut Tinggi"
      warna="#FBCFE8"
      petunjuk="Membandingkan dan mengurutkan tinggi badan. Seret anak-anak ke tempatnya supaya berbaris dari yang paling pendek, atau dari yang paling tinggi. Pada ronde terakhir, ucapkan berapa anak yang lebih pendek dari anak yang paling tinggi."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-baris"
      jumlahRonde={RONDE_BARIS.length}
      kunciAkhir={3}
      belumSiap="Susun barisannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBarisAnak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Sejajarkan di Garis Awal -------------------------- */

type PensilD = { warna: "biru" | "merah" | "hijau" | "kuning"; panjang: number; geser: number };
type RondeGaris = { pensil: PensilD[]; tanya: "terpanjang" | "terpendek" };

const X_AWAL = 22;

const RONDE_GARIS: RondeGaris[] = [
  {
    tanya: "terpanjang",
    pensil: [
      { warna: "merah", panjang: 150, geser: 70 },
      { warna: "biru", panjang: 190, geser: 0 },
      { warna: "hijau", panjang: 120, geser: 34 },
    ],
  },
  {
    tanya: "terpendek",
    pensil: [
      { warna: "merah", panjang: 140, geser: 60 },
      { warna: "biru", panjang: 170, geser: 20 },
      { warna: "hijau", panjang: 110, geser: 100 },
    ],
  },
  {
    tanya: "terpanjang",
    pensil: [
      { warna: "biru", panjang: 150, geser: 90 },
      { warna: "merah", panjang: 200, geser: 30 },
      { warna: "hijau", panjang: 120, geser: 120 },
      { warna: "kuning", panjang: 170, geser: 60 },
    ],
  },
];

function PilihWarna({ opsi, keliru, onPilih }: { opsi: string[]; keliru: string | null; onPilih: (w: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {opsi.map((w) => (
        <button
          key={`${w}-${keliru === w ? "x" : "o"}`}
          type="button"
          aria-label={`Pilih pensil ${w}`}
          onClick={() => onPilih(w)}
          className={`flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2.5 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === w ? "igil-goyang" : ""}`}
        >
          <span className="block h-4 w-4 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_PENSIL[w] }} aria-hidden="true" />
          {w}
        </button>
      ))}
    </div>
  );
}

function RondeSejajar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { pensil, tanya } = RONDE_GARIS[ronde];
  const akhir = ronde === RONDE_GARIS.length - 1;
  const [sejajar, setSejajar] = useState<boolean[]>(() => pensil.map(() => false));
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = sejajar.every(Boolean);
  const target = pensil.reduce((a, b) => (tanya === "terpanjang" ? (b.panjang > a.panjang ? b : a) : b.panjang < a.panjang ? b : a));
  const terpanjang = pensil.reduce((a, b) => (b.panjang > a.panjang ? b : a));
  const suara = panel.suara["a7-garis"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Semua pensil dimulai dari garis awal yang sama. Pensil ${target.warna} paling ${tanya === "terpanjang" ? "panjang" : "pendek"}.${akhir ? ` Ada ${sebut(pensil.length - 1)} pensil yang lebih pendek dari pensil ${terpanjang.warna}.` : ""}`
  );
  const tinggi = 18 + pensil.length * 34;

  const geser = (i: number) => {
    if (sejajar[i]) return;
    const baru = sejajar.slice();
    baru[i] = true;
    setSejajar(baru);
    setKabar(null);
  };

  const pilih = (w: string) => {
    if (!semua || beres) return;
    if (w === target.warna) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(w);
      setKabar({ teks: "Lihat ujung kanan pensil. Semua pensil sudah dimulai dari garis awal, jadi ujung yang lebih jauh berarti lebih panjang.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih pendek" : suara ? "Hebat!" : beres ? "Perbandinganmu adil!" : semua ? `Mana yang paling ${tanya === "terpanjang" ? "panjang" : "pendek"}?` : "Geser ke garis awal"}
        teks={`Pensil-pensil ini belum dimulai dari garis awal yang sama. Ketuk setiap pensil untuk menggesernya ke garis awal. Setelah semuanya sejajar, pilih pensil yang paling ${tanya === "terpanjang" ? "panjang" : "pendek"}.${akhir ? " Di akhir, ucapkan berapa pensil yang lebih pendek dari pensil yang paling panjang." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox={`0 0 300 ${tinggi}`} className="block h-auto w-full" role="group" aria-label="Pensil warna dan garis awal">
            <path d={`M${X_AWAL} 8 V${tinggi - 4}`} stroke="#DC2626" strokeWidth="2.4" strokeDasharray="5 4" strokeLinecap="round" />
            <text x={X_AWAL + 6} y="14" fontSize="10" fontWeight="900" fill="#DC2626">
              garis awal
            </text>
            {pensil.map((p, i) => {
              const y = 36 + i * 34;
              return (
                <g
                  key={p.warna}
                  role="button"
                  tabIndex={0}
                  aria-label={`Pensil ${p.warna}${sejajar[i] ? ", sudah di garis awal" : ", ketuk untuk menggeser ke garis awal"}`}
                  onClick={() => geser(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      geser(i);
                    }
                  }}
                  style={{ cursor: sejajar[i] ? "default" : "pointer", outline: "none", transform: `translateX(${sejajar[i] ? 0 : p.geser}px)`, transition: "transform 0.5s ease" }}
                >
                  <rect x={X_AWAL - 2} y={y - 15} width={p.panjang + 4} height="30" fill="transparent" />
                  <PensilG x={X_AWAL} y={y} panjang={p.panjang} warna={WARNA_PENSIL[p.warna]} />
                  {beres && p.warna === target.warna ? <rect x={X_AWAL - 4} y={y - 12} width={p.panjang + 8} height="24" rx="6" fill="none" stroke="#F0AB00" strokeWidth="3.4" /> : null}
                </g>
              );
            })}
          </svg>
          <p className="text-center text-xs font-black text-[#1C01A5]/80">
            {semua ? "Semua pensil sudah sejajar" : `Sudah sejajar: ${sejajar.filter(Boolean).length} dari ${pensil.length}`}
          </p>
        </div>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Pensil mana yang paling {tanya === "terpanjang" ? "panjang" : "pendek"}?</p>
            <PilihWarna opsi={pensil.map((p) => p.warna)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `Pensil ${target.warna} paling panjang. Pensil yang lebih pendek: ?` : `Pensil ${target.warna} paling ${tanya === "terpanjang" ? "panjang" : "pendek"}${akhir ? ` • ${sebut(pensil.length - 1)} pensil lebih pendek` : ""}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSejajar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Sejajarkan di Garis Awal"
      warna="#BBF7D0"
      petunjuk="Membandingkan dengan adil. Ketuk setiap pensil untuk menggesernya ke garis awal yang sama. Setelah semua sejajar, pilih pensil yang paling panjang atau paling pendek. Pada ronde terakhir, ucapkan berapa pensil yang lebih pendek dari pensil yang paling panjang."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-garis"
      jumlahRonde={RONDE_GARIS.length}
      kunciAkhir={3}
      belumSiap="Sejajarkan dan pilih dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSejajar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Kartu Kata Perbandingan --------------------------- */

const KARTU_KATA = ["lebih tinggi", "lebih pendek", "sama tinggi"];

type RondeKata = { tinggi: number[]; pasangan: [number, number][] };

const RONDE_KATA: RondeKata[] = [
  { tinggi: [100, 72], pasangan: [[0, 1], [1, 0]] },
  { tinggi: [84, 84, 58], pasangan: [[0, 1], [1, 2], [2, 0]] },
  { tinggi: [100, 78, 78, 54], pasangan: [[0, 3], [1, 2], [3, 1], [2, 0]] },
];

const HURUF = ["A", "B", "C", "D"];

const bandingkan = (a: number, b: number) => (a === b ? "sama tinggi" : a > b ? "lebih tinggi" : "lebih pendek");

function RondeKartuKata({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { tinggi, pasangan } = RONDE_KATA[ronde];
  const akhir = ronde === RONDE_KATA.length - 1;
  const [isi, setIsi] = useState<(string | null)[]>(() => pasangan.map(() => null));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = isi.every((v) => v !== null);
  const suara = panel.suara["a7-kata"] === true && akhir;
  const n = tinggi.length;
  const x = (i: number) => (300 / (n + 1)) * (i + 1);
  const kalimat = (k: number) => {
    const [a, b] = pasangan[k];
    const kata = bandingkan(tinggi[a], tinggi[b]);
    return `Pohon ${HURUF[a]} ${kata} ${kata === "sama tinggi" ? "dengan" : "dari"} pohon ${HURUF[b]}`;
  };
  useBicara(akhir ? suara : beres, `${pasangan.map((_, k) => kalimat(k)).join(". ")}.${akhir ? ` Ada ${sebut(n - 1)} pohon yang lebih pendek dari pohon A.` : ""}`);

  const taruh = (kartu: string, k: number) => {
    if (isi[k] !== null) return;
    const [a, b] = pasangan[k];
    const benar = bandingkan(tinggi[a], tinggi[b]);
    if (kartu !== benar) {
      setGoyang(k);
      setTerpilih(null);
      setKabar({
        teks:
          benar === "sama tinggi"
            ? `Ujung atas pohon ${HURUF[a]} dan pohon ${HURUF[b]} sama tinggi. Lihat lagi.`
            : kartu === "sama tinggi"
              ? `Ujung atas pohon ${HURUF[a]} dan pohon ${HURUF[b]} tidak sama tinggi. Bandingkan lagi.`
              : `Lihat ujung atas kedua pohon. Pohon ${HURUF[a]} justru ${benar} dari pohon ${HURUF[b]}.`,
        ok: false,
      });
      return;
    }
    const baru = isi.slice();
    baru[k] = kartu;
    setIsi(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`${kalimat(k)}.`);
    if (baru.every((v) => v !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih pendek" : suara ? "Hebat!" : beres ? "Kalimatmu lengkap!" : "Pasang kartu kata"}
        teks={`Bandingkan tinggi pohon pisang. Seret kartu kata ke kalimat yang tepat, atau ketuk kartunya lalu ketuk kalimatnya.${akhir ? " Di akhir, ucapkan berapa pohon yang lebih pendek dari pohon A." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 142" className="block h-auto w-full" role="img" aria-label={`Pohon pisang ${HURUF.slice(0, n).join(", ")}`}>
            {tinggi.map((t, i) => (
              <g key={i}>
                <PohonG x={x(i)} y={118} tinggi={t} />
                <circle cx={x(i)} cy="132" r="8.6" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2.2" />
                <text x={x(i)} y="136.2" textAnchor="middle" fontSize="11.5" fontWeight="900" fill={BIRU}>
                  {HURUF[i]}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <div className="space-y-1.5">
          {pasangan.map(([a, b], k) => (
            <button
              key={`${k}-${goyang === k ? "x" : "o"}`}
              type="button"
              data-zona={`a7-kal-${k}`}
              aria-label={`Kalimat ${k + 1}: pohon ${HURUF[a]} dan pohon ${HURUF[b]}${isi[k] ? `, ${kalimat(k)}` : ", belum diisi"}`}
              onClick={() => {
                if (isi[k] !== null) return;
                if (terpilih !== null) taruh(terpilih, k);
                else setKabar({ teks: "Pilih dulu satu kartu kata di bawah, lalu ketuk kalimatnya.", ok: false });
              }}
              className={`flex w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-4 bg-white px-2 py-1.5 text-base font-black text-[#1C01A5] ${isi[k] ? "border-[#7FCB96]" : "border-dashed border-[#1C01A5]"} ${goyang === k ? "igil-goyang" : ""}`}
            >
              <span>Pohon {HURUF[a]}</span>
              <span className={`min-w-[7.5rem] rounded-xl border-2 px-2 py-0.5 ${isi[k] ? "igil-muncul border-[#1C01A5] bg-[#FFE566]" : "border-dashed border-[#1C01A5]/50 bg-[#FFFDF2] text-[#1C01A5]/40"}`}>{isi[k] ?? "kartu kata"}</span>
              <span>{isi[k] === "sama tinggi" ? "dengan" : isi[k] ? "dari" : "…"} pohon {HURUF[b]}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu kata</span>
          {KARTU_KATA.map((kt) => (
            <BendaSeret
              key={kt}
              id={`kt-${kt}`}
              label={`Kartu kata ${kt}`}
              onKetuk={() => setTerpilih(kt)}
              onLepas={(_, px, py) => {
                const z = zonaDi(px, py);
                if (z && z.startsWith("a7-kal-")) taruh(kt, Number(z.slice(7)));
              }}
              gaya={letakMeja(kt.length)}
              kelas="rounded-2xl"
            >
              <span className={`block rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-lg font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${terpilih === kt ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>{kt}</span>
            </BendaSeret>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Pohon yang lebih pendek dari pohon A: ?" : `Pohon ${HURUF[0]} ${bandingkan(tinggi[0], tinggi[1])} ${bandingkan(tinggi[0], tinggi[1]) === "sama tinggi" ? "dengan" : "dari"} pohon ${HURUF[1]}${akhir ? " • 3 pohon lebih pendek dari A" : ""}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKata({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kartu Kata Perbandingan"
      warna="#FDE68A"
      petunjuk="Bandingkan tinggi pohon pisang dengan kata lebih tinggi, lebih pendek, dan sama tinggi. Seret kartu kata ke kalimat yang tepat. Pada ronde terakhir, ucapkan berapa pohon yang lebih pendek dari pohon A."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-kata"
      jumlahRonde={RONDE_KATA.length}
      kunciAkhir={3}
      belumSiap="Pasang kartunya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKartuKata ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kupu-Kupu Terbang --------------------------------- */

type BarangT = { id: string; warna: string };
type RondeKupu = {
  jenis: "kupu" | "burung" | "balon";
  barang: BarangT[];
  urut: string[];
  petunjuk: string[];
  label: string[];
  rujuk: string;
};

const WARNA_BARANG: Record<string, string> = { kuning: "#FACC15", merah: "#EF4444", hijau: "#4ADE80", biru: "#3B82F6" };

const RONDE_KUPU: RondeKupu[] = [
  {
    jenis: "kupu",
    barang: [
      { id: "merah", warna: WARNA_BARANG.merah },
      { id: "kuning", warna: WARNA_BARANG.kuning },
      { id: "hijau", warna: WARNA_BARANG.hijau },
    ],
    urut: ["hijau", "merah", "kuning"],
    label: ["paling tinggi", "di tengah", "paling rendah"],
    petunjuk: ["Kupu-kupu kuning terbang tinggi.", "Kupu-kupu merah terbang lebih tinggi dari kupu-kupu kuning.", "Kupu-kupu hijau terbang lebih tinggi dari kupu-kupu merah dan kupu-kupu kuning."],
    rujuk: "kupu-kupu",
  },
  {
    jenis: "burung",
    barang: [
      { id: "biru", warna: WARNA_BARANG.biru },
      { id: "kuning", warna: WARNA_BARANG.kuning },
      { id: "merah", warna: WARNA_BARANG.merah },
    ],
    urut: ["kuning", "merah", "biru"],
    label: ["paling tinggi", "di tengah", "paling rendah"],
    petunjuk: ["Burung biru terbang paling rendah.", "Burung kuning terbang lebih tinggi dari burung merah."],
    rujuk: "burung",
  },
  {
    jenis: "balon",
    barang: [
      { id: "biru", warna: WARNA_BARANG.biru },
      { id: "merah", warna: WARNA_BARANG.merah },
      { id: "kuning", warna: WARNA_BARANG.kuning },
      { id: "hijau", warna: WARNA_BARANG.hijau },
    ],
    urut: ["kuning", "hijau", "merah", "biru"],
    label: ["paling tinggi", "tinggi", "rendah", "paling rendah"],
    petunjuk: ["Balon biru terbang paling rendah.", "Balon hijau terbang lebih tinggi dari balon merah.", "Balon kuning terbang paling tinggi.", "Balon merah terbang lebih tinggi dari balon biru."],
    rujuk: "balon",
  },
];

function IkonBarang({ jenis, warna }: { jenis: RondeKupu["jenis"]; warna: string }) {
  if (jenis === "kupu") return <KupuWarna warna={warna} />;
  if (jenis === "burung") return <BurungWarna warna={warna} />;
  return <BalonWarna warna={warna} kelas="h-12 w-8" />;
}

function RondeTerbang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_KUPU[ronde];
  const akhir = ronde === RONDE_KUPU.length - 1;
  const [tempat, setTempat] = useState<(string | null)[]>(() => d.urut.map(() => null));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = tempat.every((v) => v !== null);
  const suara = panel.suara["a7-kupu"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${d.petunjuk.join(" ")} Jadi ${d.rujuk} ${d.urut[0]} paling tinggi dan ${d.rujuk} ${d.urut[d.urut.length - 1]} paling rendah.${akhir ? ` Ada ${sebut(2)} balon yang lebih tinggi dari balon merah.` : ""}`
  );

  const taruh = (id: string, k: number) => {
    if (tempat[k] !== null || tempat.includes(id) || beres) return;
    const benar = d.urut.indexOf(id);
    if (benar !== k) {
      setGoyang(k);
      setTerpilih(null);
      setKabar({
        teks: benar > k ? `Baca petunjuknya lagi. ${d.rujuk} ${id} terbang lebih rendah dari tempat ini.` : `Baca petunjuknya lagi. ${d.rujuk} ${id} terbang lebih tinggi dari tempat ini.`,
        ok: false,
      });
      return;
    }
    const baru = tempat.slice();
    baru[k] = id;
    setTempat(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`${d.rujuk} ${id}.`);
    if (baru.every((v) => v !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  const tray = d.barang.filter((b) => !tempat.includes(b.id));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih tinggi" : suara ? "Hebat!" : beres ? "Posisimu tepat!" : "Baca petunjuk, lalu terbangkan"}
        teks={`Dengarkan petunjuknya. ${d.petunjuk.join(" ")} Seret ${d.rujuk} ke ketinggian yang tepat, atau ketuk ${d.rujuk}nya lalu ketuk tempatnya.${akhir ? " Di akhir, ucapkan berapa balon yang lebih tinggi dari balon merah." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {d.petunjuk.map((p) => (
            <p key={p} className="text-sm font-black leading-snug text-[#1C01A5]">
              • {p}
            </p>
          ))}
        </div>
        <div className="space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-[#DFF1FF] px-1.5 py-2">
          {d.urut.map((_, k) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className="w-[4.6rem] shrink-0 text-right text-[11px] font-black leading-tight text-[#1C01A5]">{d.label[k]}</span>
              <button
                key={`${k}-${goyang === k ? "x" : "o"}`}
                type="button"
                data-zona={`a7-lv-${k}`}
                aria-label={`Ketinggian ${d.label[k]}${tempat[k] ? `, ada ${d.rujuk} ${tempat[k]}` : ", masih kosong"}`}
                onClick={() => {
                  if (tempat[k] !== null) return;
                  if (terpilih !== null) taruh(terpilih, k);
                  else setKabar({ teks: `Pilih dulu satu ${d.rujuk} di bawah, lalu ketuk tempatnya.`, ok: false });
                }}
                className={`flex h-14 min-w-0 flex-1 items-center justify-center rounded-xl border-4 ${tempat[k] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/60 bg-white/70"} ${goyang === k ? "igil-goyang" : ""}`}
              >
                {tempat[k] ? (
                  <span className="igil-muncul block">
                    <IkonBarang jenis={d.jenis} warna={WARNA_BARANG[tempat[k] as string]} />
                  </span>
                ) : (
                  <span className="text-lg font-black text-[#1C01A5]/30">{k + 1}</span>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-3 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">Seret ke ketinggiannya</span>
          {tray.map((b) => (
            <BendaSeret
              key={b.id}
              id={`br-${b.id}`}
              label={`${d.rujuk} ${b.id}`}
              onKetuk={() => setTerpilih(b.id)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("a7-lv-")) taruh(b.id, Number(z.slice(6)));
              }}
              kelas="rounded-2xl"
            >
              <span className={`block rounded-2xl p-1 ${terpilih === b.id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                <IkonBarang jenis={d.jenis} warna={b.warna} />
              </span>
            </BendaSeret>
          ))}
          {tray.length === 0 ? <span className="text-2xl">✅</span> : null}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Balon yang lebih tinggi dari balon merah: ?" : `${d.rujuk} ${d.urut[0]} paling tinggi • ${d.rujuk} ${d.urut[d.urut.length - 1]} paling rendah`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKupu({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kupu-Kupu Terbang"
      warna="#C7D2FE"
      petunjuk="Membandingkan posisi benda dengan kata lebih tinggi, lebih rendah, paling tinggi, dan paling rendah. Dengarkan petunjuknya, lalu seret kupu-kupu, burung, atau balon ke ketinggian yang tepat. Pada ronde terakhir, ucapkan berapa balon yang lebih tinggi dari balon merah."
      speakGuru={speakGuru}
      panel={panel}
      id="a7-kupu"
      jumlahRonde={RONDE_KUPU.length}
      kunciAkhir={2}
      belumSiap="Terbangkan dulu semuanya, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTerbang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
