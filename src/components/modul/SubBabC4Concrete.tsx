"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { GambarBagian, JUMLAH_KERETA, KERETA, KepingMandiri, WARNA_C, kotakBagian } from "./bangun-c4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab C, Tahap 4 Concrete: benda nyata. Kertas, roti, balok kayu,  */
/* dan lidi. Semua di klien, tanpa API.                                       */
/*  1 Gabung Dua Keping Kertas (seret keping ke tempat yang tepat)             */
/*  2 Pas atau Tidak? (memilih potongan yang melengkapi)                       */
/*  3 Bangun Kereta Balok (seret balok ke bayangannya)                         */
/*  4 Susun Lidi (meletakkan lidi pada garis putus-putus)                      */
/* ------------------------------------------------------------------------ */

type T = [number, number];
const poly = (t: T[]) => t.map((p) => p.join(",")).join(" ");

/* --------- Permainan 1. Gabung Dua Keping Kertas (hlm. 134-135) ----------- */

type Papan = { nama: string; tetap: T[]; hantu: T[]; pesan?: string };
type DataGabung = {
  target: string;
  nama: string;
  warnaTetap: string;
  warnaKeping: string;
  keping: T[];
  papan: Papan[];
  benar: number;
};

const RONDE_GABUNG: DataGabung[] = [
  {
    target: "segitiga",
    nama: "segitiga kertas",
    warnaTetap: WARNA_C.biru,
    warnaKeping: WARNA_C.merah,
    keping: [[30, 70], [30, 20], [70, 70]],
    papan: [
      { nama: "segi empat miring", tetap: [[65, 70], [65, 20], [105, 70]], hantu: [[65, 20], [65, 70], [25, 20]] },
      { nama: "segitiga", tetap: [[60, 70], [60, 20], [100, 70]], hantu: [[60, 70], [60, 20], [20, 70]] },
      { nama: "persegi panjang", tetap: [[45, 70], [45, 20], [85, 70]], hantu: [[45, 20], [85, 20], [85, 70]] },
    ],
    benar: 1,
  },
  {
    target: "persegi panjang",
    nama: "segitiga kertas",
    warnaTetap: WARNA_C.biru,
    warnaKeping: WARNA_C.merah,
    keping: [[30, 70], [30, 20], [70, 70]],
    papan: [
      { nama: "segitiga", tetap: [[60, 70], [60, 20], [100, 70]], hantu: [[60, 70], [60, 20], [20, 70]] },
      { nama: "segi empat miring", tetap: [[65, 70], [65, 20], [105, 70]], hantu: [[65, 20], [65, 70], [25, 20]] },
      { nama: "persegi panjang", tetap: [[45, 70], [45, 20], [85, 70]], hantu: [[45, 20], [85, 20], [85, 70]] },
    ],
    benar: 2,
  },
  {
    target: "persegi panjang",
    nama: "persegi kertas",
    warnaTetap: WARNA_C.kuning,
    warnaKeping: WARNA_C.jingga,
    keping: [[33, 23], [67, 23], [67, 57], [33, 57]],
    papan: [
      { nama: "persegi panjang", tetap: [[30, 30], [64, 30], [64, 64], [30, 64]], hantu: [[64, 30], [98, 30], [98, 64], [64, 64]] },
      {
        nama: "dua persegi yang bersentuhan di satu titik",
        tetap: [[20, 36], [54, 36], [54, 70], [20, 70]],
        hantu: [[54, 2], [88, 2], [88, 36], [54, 36]],
        pesan: "Dua persegi itu hanya bersentuhan di satu titik. Rapatkan satu sisinya sampai penuh.",
      },
      {
        nama: "dua persegi yang masih berjauhan",
        tetap: [[10, 30], [44, 30], [44, 64], [10, 64]],
        hantu: [[66, 30], [100, 30], [100, 64], [66, 64]],
        pesan: "Masih ada celah di antara dua persegi itu. Rapatkan sampai tidak ada celah.",
      },
    ],
    benar: 0,
  },
];

function RondeGabung({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_GABUNG[ronde];
  const akhir = ronde === RONDE_GABUNG.length - 1;
  const ucap = useContext(SuaraCtx);
  const [pilihan, setPilihan] = useState<number | null>(null);
  const [terpilih, setTerpilih] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = pilihan !== null;
  const suara = panel.suara["c4-gabung"] === true && akhir;
  useBicara(akhir ? suara : beres, `Dua keping digabung menjadi ${d.target}. Yang kita lakukan itu namanya menyusun.`);

  const taruh = (i: number) => {
    if (beres) return;
    const p = d.papan[i];
    if (i === d.benar) {
      setPilihan(i);
      setKeliru(null);
      setKabar(null);
      setTerpilih(false);
      ucap(`Betul! Gabungannya menjadi ${p.nama}.`);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(i);
      setTerpilih(false);
      setKabar({ teks: p.pesan ?? `Gabungan itu menjadi ${p.nama}, bukan ${d.target}. Coba tempat yang lain.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat! Ucapkan banyaknya." : beres ? (akhir ? "Ucapkan: banyak keping kertas" : "Berhasil menyusun!") : `Susun menjadi ${d.target}`}
        teks={`Kita punya dua keping ${d.nama}. Kertasnya boleh diputar dan dibalik. Seret keping ${d.nama === "persegi kertas" ? "jingga" : "merah"} ke papan yang menjadikan keping-keping ini ${d.target}. Atau ketuk kepingnya, lalu ketuk papannya.${akhir ? " Setelah itu, ucapkan berapa keping kertas yang kamu gabungkan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex items-center justify-center gap-3 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <span className="rounded-full bg-[#FFE566] px-3 py-0.5 text-base font-black text-[#1C01A5]">Target: {d.target}</span>
          {beres ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : (
            <BendaSeret
              id="keping"
              aktif={!beres}
              label={`Keping ${d.warnaKeping === WARNA_C.jingga ? "jingga" : "merah"}`}
              onKetuk={() => {
                setTerpilih(true);
                ucap("Keping dipilih. Sekarang ketuk papan yang kamu mau.");
              }}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("c4g:")) taruh(Number(z.slice(4)));
              }}
              kelas="rounded-2xl"
            >
              <span className={`block rounded-2xl p-1 ${terpilih ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                <svg viewBox="0 0 100 80" className="h-16 w-20" role="img" aria-label="Keping kertas yang digeser">
                  <polygon points={poly(d.keping)} fill={d.warnaKeping} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
                </svg>
              </span>
            </BendaSeret>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {d.papan.map((p, i) => {
            const dipilih = pilihan === i;
            const redup = beres && !dipilih;
            return (
              <button
                key={`${i}-${keliru === i ? "x" : "o"}`}
                type="button"
                data-zona={`c4g:${i}`}
                aria-label={`Papan ${"ABC"[i]}${dipilih ? `, hasilnya ${p.nama}` : ""}`}
                onClick={() => {
                  if (terpilih) taruh(i);
                  else ucap(`Papan ${"ABC"[i]}.`);
                }}
                className={`igil-tanpa-tepi flex flex-col items-center gap-1 rounded-3xl border-4 bg-white px-1 py-2 ${
                  dipilih ? "border-[#16A34A] bg-[#E8F7EE]" : "border-[#1C01A5]"
                } ${redup ? "opacity-40" : ""} ${keliru === i ? "igil-goyang" : ""}`}
              >
                <svg viewBox="0 0 120 80" className="h-20 w-full" aria-hidden="true">
                  <polygon points={poly(p.tetap)} fill={d.warnaTetap} stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
                  <polygon
                    points={poly(p.hantu)}
                    fill={dipilih ? d.warnaKeping : "#FFFFFF"}
                    fillOpacity={dipilih ? 1 : 0.5}
                    stroke={dipilih ? BIRU : d.warnaKeping}
                    strokeWidth="3"
                    strokeLinejoin="round"
                    strokeDasharray={dipilih ? undefined : "6 4"}
                  />
                </svg>
                <span className="text-sm font-black text-[#1C01A5]">Papan {"ABC"[i]}</span>
                {dipilih ? <span className="rounded-full bg-[#7FCB96] px-2 text-xs font-black text-[#1C01A5]">{p.nama}</span> : null}
              </button>
            );
          })}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahGabung({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Gabung Dua Keping Kertas"
      warna="#FFE566"
      petunjuk="Seret keping kertas ke papan yang membuat bentuk sesuai target. Kertas boleh diputar dan dibalik. Pada soal terakhir, ucapkan berapa keping kertas yang kamu gabungkan."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-gabung"
      jumlahRonde={RONDE_GABUNG.length}
      kunciAkhir={2}
      belumSiap="Gabungkan kedua keping dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGabung ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Pas atau Tidak? (hlm. 137-138, Ayo Berlatih 1) ---- */

type OpsiPas = { el: React.ReactNode; alasan: string };
type DataPas = { cerita: string; warna: string; dasar: React.ReactNode; lubang: React.ReactNode; kunci: React.ReactNode; opsi: OpsiPas[]; benar: number };

const ROTI = "#E8B96B";
const TEPI = { stroke: BIRU, strokeWidth: 3, strokeLinejoin: "round" as const };

const RONDE_PAS: DataPas[] = [
  {
    cerita: "Roti bulat ini diiris. Potongan mana yang pas untuk melengkapinya?",
    warna: ROTI,
    dasar: <path d="M50 44 L80 44 A30 30 0 1 1 50 14 Z" fill={ROTI} {...TEPI} />,
    lubang: <path d="M50 44 L80 44 A30 30 0 0 0 50 14 Z" fill="none" stroke={BIRU} strokeWidth="3" strokeDasharray="5 4" />,
    kunci: <path d="M50 44 L80 44 A30 30 0 0 0 50 14 Z" fill={ROTI} {...TEPI} />,
    opsi: [
      { el: <path d="M41 50 L59 50 A18 18 0 0 0 41 32 Z" fill={ROTI} {...TEPI} />, alasan: "Potongan ini terlalu kecil. Bagian yang hilang lebih besar." },
      { el: <path d="M35 55 L65 55 A30 30 0 0 0 35 25 Z" fill={ROTI} {...TEPI} />, alasan: "" },
      { el: <rect x="26" y="30" width="48" height="22" fill={ROTI} {...TEPI} />, alasan: "Potongan ini punya sudut dan sisi lurus. Bagian yang hilang tepinya melengkung." },
    ],
    benar: 1,
  },
  {
    cerita: "Bolu ini punya takik di bagian atas. Potongan mana yang pas untuk menutupnya?",
    warna: "#F6D365",
    dasar: <polygon points="15,25 38,25 50,45 62,25 85,25 85,65 15,65" fill="#F6D365" {...TEPI} />,
    lubang: <polygon points="38,25 62,25 50,45" fill="none" stroke={BIRU} strokeWidth="3" strokeDasharray="5 4" strokeLinejoin="round" />,
    kunci: <polygon points="38,25 62,25 50,45" fill="#F6D365" {...TEPI} />,
    opsi: [
      { el: <polygon points="38,30 62,30 50,50" fill="#F6D365" {...TEPI} />, alasan: "" },
      { el: <rect x="37" y="28" width="26" height="26" fill="#F6D365" {...TEPI} />, alasan: "Potongan ini punya empat sisi, padahal takiknya hanya punya tiga sisi." },
      { el: <polygon points="22,18 78,18 50,62" fill="#F6D365" {...TEPI} />, alasan: "Potongan ini terlalu besar. Takiknya jauh lebih kecil." },
    ],
    benar: 0,
  },
  {
    cerita: "Keju ini terpotong di salah satu pojoknya. Potongan mana yang pas?",
    warna: "#FFC845",
    dasar: <polygon points="15,15 60,15 85,40 85,65 15,65" fill="#FFC845" {...TEPI} />,
    lubang: <polygon points="60,15 85,15 85,40" fill="none" stroke={BIRU} strokeWidth="3" strokeDasharray="5 4" strokeLinejoin="round" />,
    kunci: <polygon points="60,15 85,15 85,40" fill="#FFC845" {...TEPI} />,
    opsi: [
      { el: <polygon points="28,20 68,20 68,60" fill="#FFC845" {...TEPI} />, alasan: "Potongan ini terlalu besar. Pojok yang hilang lebih kecil." },
      { el: <circle cx="50" cy="42" r="14" fill="#FFC845" {...TEPI} />, alasan: "Potongan ini melengkung. Pojok yang hilang punya sisi lurus." },
      { el: <polygon points="38,28 63,28 63,53" fill="#FFC845" {...TEPI} />, alasan: "" },
    ],
    benar: 2,
  },
  {
    cerita: "Rumah-rumahan kardus ini belum punya atap. Potongan mana yang pas untuk atapnya?",
    warna: "#F7A8C4",
    dasar: (
      <>
        <rect x="25" y="38" width="50" height="34" fill="#FFD93D" {...TEPI} />
        <rect x="44" y="52" width="12" height="20" fill="#5B9BFF" stroke={BIRU} strokeWidth="2.4" />
      </>
    ),
    lubang: <polygon points="25,38 75,38 50,12" fill="none" stroke={BIRU} strokeWidth="3" strokeDasharray="5 4" strokeLinejoin="round" />,
    kunci: <polygon points="25,38 75,38 50,12" fill="#F25C54" {...TEPI} />,
    opsi: [
      { el: <polygon points="36,52 64,52 50,36" fill="#F25C54" {...TEPI} />, alasan: "Atap ini terlalu kecil. Dindingnya lebih lebar." },
      { el: <polygon points="25,58 75,58 50,32" fill="#F25C54" {...TEPI} />, alasan: "" },
      { el: <rect x="36" y="30" width="28" height="28" fill="#F25C54" {...TEPI} />, alasan: "Potongan ini segi empat. Atap yang dicari punya tiga sisi lurus." },
    ],
    benar: 1,
  },
];

function RondePas({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_PAS[ronde];
  const akhir = ronde === RONDE_PAS.length - 1;
  const ucap = useContext(SuaraCtx);
  const [pilihan, setPilihan] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = pilihan !== null;
  const suara = panel.suara["c4-pas"] === true && akhir;
  useBicara(akhir ? suara : beres, "Potongan yang pas melengkapi bangunnya. Dua bagian itu digabung dan menjadi satu bangun utuh.");

  const pilih = (i: number) => {
    if (beres) return;
    if (i === d.benar) {
      setPilihan(i);
      setKeliru(null);
      setKabar(null);
      ucap("Pas sekali!");
      letusan.picu();
      onBeres();
    } else {
      setKeliru(i);
      setKabar({ teks: d.opsi[i].alasan, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat! Ucapkan banyaknya." : beres ? (akhir ? "Ucapkan: banyak sisi lurus atap" : "Pas sekali!") : "Mana potongan yang pas?"}
        teks={`${d.cerita} Perhatikan bentuk dan besarnya. Ketuk potongan yang pas.${akhir ? " Setelah itu, ucapkan berapa banyak sisi lurus pada atap itu." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <svg viewBox="0 0 100 80" className="mx-auto h-40 w-full max-w-[240px]" role="img" aria-label="Bangun yang kurang satu potongan">
            {d.dasar}
            {beres ? d.kunci : d.lubang}
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {d.opsi.map((o, i) => (
            <button
              key={`${i}-${keliru === i ? "x" : "o"}`}
              type="button"
              aria-label={`Potongan ${"ABC"[i]}`}
              disabled={beres}
              onClick={() => pilih(i)}
              className={`igil-tanpa-tepi flex flex-col items-center gap-1 rounded-3xl border-4 bg-white px-1 py-2 disabled:opacity-60 ${
                beres && i === d.benar ? "border-[#16A34A] bg-[#E8F7EE]" : "border-[#1C01A5]"
              } ${keliru === i ? "igil-goyang" : ""}`}
            >
              <svg viewBox="0 0 100 80" className="h-20 w-full" aria-hidden="true">
                {o.el}
              </svg>
              <span className="text-sm font-black text-[#1C01A5]">Potongan {"ABC"[i]}</span>
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPas({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pas atau Tidak?"
      warna="#FFE566"
      petunjuk="Lihat bangun yang kurang satu potongan. Pilih potongan yang pas, bentuk dan besarnya. Pada soal terakhir, ucapkan berapa sisi lurus pada atap."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-pas"
      jumlahRonde={RONDE_PAS.length}
      kunciAkhir={3}
      belumSiap="Pilih potongan yang pas dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePas ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Bangun Kereta Balok (hlm. 136) -------------------- */

const URUTAN_BALOK = ["roda2", "gerbong", "jendela", "moncong", "kabin", "roda1", "cerobong", "mesin", "roda3"];
const tipeBalok = (id: string) => (id.startsWith("roda") ? "roda" : id);
const SKALA_BALOK = 0.5;

function RondeKereta({ panel, onBeres }: { panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [terisi, setTerisi] = useState<Record<string, boolean>>({});
  const [dipakai, setDipakai] = useState<string[]>([]);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = URUTAN_BALOK.filter((id) => !dipakai.includes(id));
  const beres = sisa.length === 0;
  const suara = panel.suara["c4-kereta"] === true;
  useBicara(
    beres,
    `Kereta sudah jadi. Segi empat ada ${kataK(JUMLAH_KERETA.segiempat)}, segitiga ada ${kataK(JUMLAH_KERETA.segitiga)}, dan bentuk lengkung ada ${kataK(JUMLAH_KERETA.lengkung)}.`
  );
  const bagian = (id: string) => KERETA.find((b) => b.id === id)!;

  const taruh = (id: string, slot: string) => {
    if (dipakai.includes(id)) return;
    if (tipeBalok(id) !== tipeBalok(slot)) {
      setKeliru(id);
      setTerpilih(null);
      setKabar({
        teks: `${bagian(id).nama} tidak pas di bagian ${bagian(slot).nama.toLowerCase()}. Perhatikan bentuk dan besarnya.`,
        ok: false,
      });
      return;
    }
    let tujuan = slot;
    if (terisi[tujuan]) {
      const kosong = KERETA.find((b) => tipeBalok(b.id) === tipeBalok(id) && !terisi[b.id]);
      if (!kosong) return;
      tujuan = kosong.id;
    }
    setTerisi((p) => ({ ...p, [tujuan]: true }));
    const baru = [...dipakai, id];
    setDipakai(baru);
    setTerpilih(null);
    setKeliru(null);
    setKabar(null);
    ucap(`${bagian(id).nama} terpasang.`);
    if (baru.length === URUTAN_BALOK.length) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: banyak segi empat" : "Pasang balok ke bayangannya"}
        teks="Balok-balok kereta Halim berserakan. Seret setiap balok ke bayangannya, atau ketuk baloknya lalu ketuk bayangannya. Perhatikan bentuk dan besarnya. Setelah semua terpasang, ucapkan berapa banyak balok segi empat pada kereta."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <div className="relative w-full" style={{ aspectRatio: "2 / 1" }}>
            <svg viewBox="0 0 300 150" className="absolute inset-0 h-full w-full" role="img" aria-label="Papan kereta dengan bayangan balok">
              <path d="M8 140 H292" stroke="#A8672D" strokeWidth="4" strokeLinecap="round" />
              {KERETA.map((b) => (
                <GambarBagian key={b.id} b={b} tebal={2.8} isi={terisi[b.id] ? b.warna : "#EEF2FF"} opacity={terisi[b.id] ? 1 : 0.75} putus={!terisi[b.id]} garis={terisi[b.id] ? BIRU : "#6B7280"} />
              ))}
            </svg>
            {KERETA.map((b) => {
              const k = kotakBagian(b);
              return (
                <button
                  key={b.id}
                  type="button"
                  data-zona={`c4k:${b.id}`}
                  aria-label={`Bayangan ${b.nama.toLowerCase()}${terisi[b.id] ? ", sudah terpasang" : ""}`}
                  onClick={() => {
                    if (terpilih) taruh(terpilih, b.id);
                    else ucap(terisi[b.id] ? `${b.nama} sudah terpasang.` : `Bayangan ${b.nama.toLowerCase()}.`);
                  }}
                  className="igil-tanpa-tepi absolute rounded-md"
                  style={{ left: `${(k.x / 300) * 100}%`, top: `${(k.y / 150) * 100}%`, width: `${(k.w / 300) * 100}%`, height: `${(k.h / 150) * 100}%` }}
                />
              );
            })}
          </div>
        </div>
        <div className="flex min-h-[76px] flex-wrap items-end justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {sisa.map((id) => (
            <BendaSeret
              key={id}
              id={id}
              aktif={!beres}
              label={`Balok ${bagian(id).nama.toLowerCase()}`}
              onKetuk={() => {
                setTerpilih(id);
                ucap(bagian(id).nama);
              }}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("c4k:")) taruh(id, z.slice(4));
              }}
              kelas="rounded-2xl"
            >
              <span
                key={`${id}-${keliru === id ? "x" : "o"}`}
                className={`block rounded-2xl p-0.5 ${terpilih === id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${keliru === id ? "igil-goyang" : ""}`}
              >
                <KepingMandiri b={bagian(id)} skala={SKALA_BALOK} label={`Balok ${bagian(id).nama.toLowerCase()}`} />
              </span>
            </BendaSeret>
          ))}
          {beres ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKereta({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Bangun Kereta Balok"
      warna="#FFE566"
      petunjuk="Seret setiap balok ke bayangannya di papan kereta. Perhatikan bentuk dan besarnya. Setelah kereta jadi, ucapkan berapa balok segi empat pada kereta."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-kereta"
      jumlahRonde={1}
      kunciAkhir={JUMLAH_KERETA.segiempat}
      belumSiap="Pasang semua balok dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondeKereta panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Susun Lidi (hlm. 139, Ayo Bermain) ---------------- */

type Seg = { a: T; b: T };
type RondeLidiData = { nama: string; segmen: Seg[]; stok: number; petunjuk: string };

const s = (a: T, b: T): Seg => ({ a, b });

const RONDE_LIDI: RondeLidiData[] = [
  {
    nama: "segitiga",
    stok: 5,
    petunjuk: "Segitiga punya tiga sisi lurus. Letakkan satu lidi di setiap garis putus-putus.",
    segmen: [s([90, 12], [30, 116]), s([30, 116], [150, 116]), s([150, 116], [90, 12])],
  },
  {
    nama: "segi empat",
    stok: 6,
    petunjuk: "Segi empat punya empat sisi lurus. Letakkan satu lidi di setiap garis putus-putus.",
    segmen: [s([45, 20], [135, 20]), s([135, 20], [135, 110]), s([135, 110], [45, 110]), s([45, 110], [45, 20])],
  },
  {
    nama: "rumah",
    stok: 8,
    petunjuk: "Dinding rumah segi empat, atapnya segitiga. Sisi atas dinding juga menjadi dasar atap, jadi tidak perlu lidi tambahan di sana.",
    segmen: [
      s([60, 70], [120, 70]),
      s([120, 70], [120, 130]),
      s([120, 130], [60, 130]),
      s([60, 130], [60, 70]),
      s([60, 70], [90, 18]),
      s([120, 70], [90, 18]),
    ],
  },
];

const WARNA_LIDI = ["#2F9E5B", "#8B3FB5", "#E53E3E", "#2563EB", "#F0AB00", "#EA580C"];

function RondeLidi({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_LIDI[ronde];
  const akhir = ronde === RONDE_LIDI.length - 1;
  const ucap = useContext(SuaraCtx);
  const [terpasang, setTerpasang] = useState<boolean[]>(() => d.segmen.map(() => false));
  const letusan = useLetusan();
  const dipakai = terpasang.filter(Boolean).length;
  const total = d.segmen.length;
  const beres = dipakai === total;
  const suara = panel.suara["c4-lidi"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.nama.charAt(0).toUpperCase()}${d.nama.slice(1)} jadi. Kita memakai ${kataK(total)} lidi. Lidi yang tersisa ada ${kataK(d.stok - total)}.`);

  const pasang = (i: number) => {
    if (beres || terpasang[i]) return;
    const baru = terpasang.slice();
    baru[i] = true;
    setTerpasang(baru);
    const n = baru.filter(Boolean).length;
    ucap(kataK(n));
    if (n === total) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat! Ucapkan banyaknya." : beres ? (akhir ? "Ucapkan: banyak lidi untuk rumah" : `${d.nama} jadi!`) : `Susun ${d.nama} dari lidi`}
        teks={`Susun ${d.nama} dari lidi yang sama panjang. ${d.petunjuk}${akhir ? " Setelah rumahnya jadi, ucapkan berapa lidi yang kamu pakai." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5">
          <span className="text-base font-black text-[#1C01A5]">Lidi di tangan: {d.stok - dipakai}</span>
          <span className="rounded-full bg-[#FFE566] px-2 text-sm font-black text-[#1C01A5]">
            dipakai {dipakai}
          </span>
        </div>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <svg viewBox="0 0 180 140" className="mx-auto h-48 w-full max-w-[300px]" role="img" aria-label={`Papan untuk menyusun ${d.nama} dari lidi`}>
            {d.segmen.map((g, i) =>
              terpasang[i] ? (
                <g key={i}>
                  <line x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} stroke={BIRU} strokeWidth="9" strokeLinecap="round" />
                  <line x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} stroke={WARNA_LIDI[i % WARNA_LIDI.length]} strokeWidth="5.6" strokeLinecap="round" className="igil-muncul" />
                </g>
              ) : (
                <g
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`Letakkan lidi ${i + 1}`}
                  onClick={() => pasang(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      pasang(i);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <line x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} stroke="transparent" strokeWidth="24" strokeLinecap="round" />
                  <line x1={g.a[0]} y1={g.a[1]} x2={g.b[0]} y2={g.b[1]} stroke="#6B7280" strokeWidth="3.4" strokeDasharray="4 6" strokeLinecap="round" />
                </g>
              )
            )}
          </svg>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2" aria-label={`Sisa ${d.stok - dipakai} lidi`}>
          {Array.from({ length: d.stok }, (_, i) => (
            <span key={i} aria-hidden="true" className={`block h-2.5 w-9 rounded-full border-2 border-[#1C01A5] ${i < dipakai ? "bg-slate-200 opacity-40" : ""}`} style={i < dipakai ? undefined : { backgroundColor: WARNA_LIDI[i % WARNA_LIDI.length] }} />
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
    </>
  );
}

export function LangkahLidi({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Lidi"
      warna="#FFE566"
      petunjuk="Susun segitiga, segi empat, lalu rumah dari lidi yang sama panjang. Ketuk garis putus-putus untuk meletakkan lidi. Setelah rumahnya jadi, ucapkan berapa lidi yang kamu pakai."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-lidi"
      jumlahRonde={RONDE_LIDI.length}
      kunciAkhir={RONDE_LIDI[RONDE_LIDI.length - 1].segmen.length}
      belumSiap="Susun semua lidinya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLidi ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
