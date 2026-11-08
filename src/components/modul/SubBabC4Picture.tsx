"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { FIGUR_1, FIGUR_2, GambarBagian, NAMA_GOL3, WARNA_C, hitungGol, kotakBagian, type Bagian, type Gol3 } from "./bangun-c4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab C, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Bentuk polos berwarna dan garis potong. Anak memilih, menjodohkan, dan      */
/* menunjuk. Anak tidak memindahkan benda.                                    */
/*  5 Garis Potong (memilih garis yang mengurai bangun)                        */
/*  6 Jodohkan Keping dan Bangun (menjodohkan diagram)                         */
/*  7 Tunjuk dan Hitung (menandai dan menghitung bagian)                       */
/* ------------------------------------------------------------------------ */

const TEPI = { stroke: BIRU, strokeWidth: 2.8, strokeLinejoin: "round" as const };
const GARIS_POTONG = { stroke: "#1C01A5", strokeWidth: 3, strokeDasharray: "5 4", strokeLinecap: "round" as const };

/* --------- Permainan 5. Garis Potong -------------------------------------- */

type OpsiPotong = { gambar: React.ReactNode; hasil: string };
type DataPotong = { target: string; cerita: string; opsi: OpsiPotong[]; benar: number };

const M = WARNA_C.merah;
const B = WARNA_C.biru;
const K = WARNA_C.kuning;
const H = WARNA_C.hijau;

const RONDE_POTONG: DataPotong[] = [
  {
    target: "dua segitiga",
    cerita: "Sebuah persegi panjang akan diurai menjadi dua segitiga.",
    benar: 2,
    opsi: [
      {
        hasil: "dua persegi panjang",
        gambar: (
          <>
            <rect x="10" y="15" width="40" height="50" fill={M} {...TEPI} />
            <rect x="50" y="15" width="40" height="50" fill={B} {...TEPI} />
            <path d="M50 10 V70" {...GARIS_POTONG} />
          </>
        ),
      },
      {
        hasil: "dua persegi panjang",
        gambar: (
          <>
            <rect x="10" y="15" width="80" height="25" fill={M} {...TEPI} />
            <rect x="10" y="40" width="80" height="25" fill={B} {...TEPI} />
            <path d="M5 40 H95" {...GARIS_POTONG} />
          </>
        ),
      },
      {
        hasil: "dua segitiga",
        gambar: (
          <>
            <polygon points="10,15 90,15 90,65" fill={M} {...TEPI} />
            <polygon points="10,15 90,65 10,65" fill={B} {...TEPI} />
            <path d="M10 15 L90 65" {...GARIS_POTONG} />
          </>
        ),
      },
    ],
  },
  {
    target: "dua persegi panjang yang sama besar",
    cerita: "Sebuah persegi panjang akan diurai menjadi dua persegi panjang yang sama besar.",
    benar: 0,
    opsi: [
      {
        hasil: "dua persegi panjang yang sama besar",
        gambar: (
          <>
            <rect x="10" y="15" width="40" height="50" fill={K} {...TEPI} />
            <rect x="50" y="15" width="40" height="50" fill={H} {...TEPI} />
            <path d="M50 10 V70" {...GARIS_POTONG} />
          </>
        ),
      },
      {
        hasil: "dua segitiga",
        gambar: (
          <>
            <polygon points="10,15 90,15 90,65" fill={K} {...TEPI} />
            <polygon points="10,15 90,65 10,65" fill={H} {...TEPI} />
            <path d="M10 15 L90 65" {...GARIS_POTONG} />
          </>
        ),
      },
      {
        hasil: "dua bagian yang tidak sama besar",
        gambar: (
          <>
            <rect x="10" y="15" width="20" height="50" fill={K} {...TEPI} />
            <rect x="30" y="15" width="60" height="50" fill={H} {...TEPI} />
            <path d="M30 10 V70" {...GARIS_POTONG} />
          </>
        ),
      },
    ],
  },
  {
    target: "empat persegi kecil yang sama besar",
    cerita: "Sebuah persegi akan diurai menjadi empat persegi kecil yang sama besar.",
    benar: 1,
    opsi: [
      {
        hasil: "dua persegi panjang",
        gambar: (
          <>
            <rect x="20" y="10" width="30" height="60" fill={M} {...TEPI} />
            <rect x="50" y="10" width="30" height="60" fill={B} {...TEPI} />
            <path d="M50 5 V75" {...GARIS_POTONG} />
          </>
        ),
      },
      {
        hasil: "empat persegi kecil yang sama besar",
        gambar: (
          <>
            <rect x="20" y="10" width="30" height="30" fill={M} {...TEPI} />
            <rect x="50" y="10" width="30" height="30" fill={B} {...TEPI} />
            <rect x="20" y="40" width="30" height="30" fill={K} {...TEPI} />
            <rect x="50" y="40" width="30" height="30" fill={H} {...TEPI} />
            <path d="M50 5 V75 M15 40 H85" {...GARIS_POTONG} />
          </>
        ),
      },
      {
        hasil: "empat segitiga",
        gambar: (
          <>
            <polygon points="20,10 80,10 50,40" fill={M} {...TEPI} />
            <polygon points="80,10 80,70 50,40" fill={B} {...TEPI} />
            <polygon points="80,70 20,70 50,40" fill={K} {...TEPI} />
            <polygon points="20,70 20,10 50,40" fill={H} {...TEPI} />
            <path d="M20 10 L80 70 M80 10 L20 70" {...GARIS_POTONG} />
          </>
        ),
      },
    ],
  },
];

function RondePotong({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_POTONG[ronde];
  const akhir = ronde === RONDE_POTONG.length - 1;
  const [pilihan, setPilihan] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = pilihan !== null;
  const suara = panel.suara["c4-potong"] === true && akhir;
  useBicara(akhir ? suara : beres, `Garis potong itu mengurai bangunnya menjadi ${d.target}. Kalau bagian-bagiannya digabung lagi, bangunnya utuh kembali.`);

  const pilih = (i: number) => {
    if (beres) return;
    if (i === d.benar) {
      setPilihan(i);
      setGoyang(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setGoyang(i);
      setKabar({ teks: `Garis ini menghasilkan ${d.opsi[i].hasil}, bukan ${d.target}. Coba garis yang lain.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak bagian" : "Garisnya tepat!") : `Urai menjadi ${d.target}`}
        teks={`${d.cerita} Garis putus-putus menunjukkan tempat memotong. Pilih bangun dengan garis potong yang tepat.${akhir ? " Setelah itu, ucapkan berapa banyak bagian yang dihasilkan." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">Target: {d.target}</p>
        <div className="grid grid-cols-3 gap-2">
          {d.opsi.map((o, i) => (
            <button
              key={`${i}-${goyang === i ? "x" : "o"}`}
              type="button"
              aria-label={`Garis ${"ABC"[i]}`}
              disabled={beres}
              onClick={() => pilih(i)}
              className={`igil-tanpa-tepi flex flex-col items-center gap-1 rounded-2xl border-4 bg-white px-1 py-2 disabled:opacity-60 ${
                beres && i === d.benar ? "border-[#16A34A] bg-[#E8F7EE]" : "border-dashed border-[#6B7280]/60"
              } ${goyang === i ? "igil-goyang" : ""}`}
            >
              <svg viewBox="0 0 100 80" className="h-20 w-full" aria-hidden="true">
                {o.gambar}
              </svg>
              <span className="text-sm font-black text-[#1C01A5]">Garis {"ABC"[i]}</span>
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuPotong({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Garis Potong"
      warna="#FDE68A"
      petunjuk="Baca target uraiannya, lalu pilih bangun yang garis potongnya tepat. Garis putus-putus menunjukkan tempat memotong. Pada soal terakhir, ucapkan berapa banyak bagian yang dihasilkan."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-potong"
      jumlahRonde={RONDE_POTONG.length}
      kunciAkhir={4}
      belumSiap="Pilih garis potong yang tepat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePotong ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Jodohkan Keping dan Bangun ------------------------ */

type KartuJodoh = { id: string; kiri: React.ReactNode; kanan: React.ReactNode; nama: string };
type DataJodoh = { kartu: KartuJodoh[]; urutKanan: string[] };

const RONDE_JODOH: DataJodoh[] = [
  {
    urutKanan: ["segitiga", "bulat", "panjang"],
    kartu: [
      {
        id: "bulat",
        nama: "dua setengah bulat jadi bulat penuh",
        kiri: (
          <>
            <path d="M14 38 A16 16 0 0 1 46 38 Z" fill={M} {...TEPI} />
            <path d="M54 38 A16 16 0 0 0 86 38 Z" fill={B} {...TEPI} />
          </>
        ),
        kanan: <circle cx="50" cy="32" r="22" fill={WARNA_C.ungu} {...TEPI} />,
      },
      {
        id: "panjang",
        nama: "dua persegi jadi persegi panjang",
        kiri: (
          <>
            <rect x="12" y="16" width="30" height="30" fill={K} {...TEPI} />
            <rect x="58" y="16" width="30" height="30" fill={H} {...TEPI} />
          </>
        ),
        kanan: <rect x="20" y="16" width="60" height="30" fill={WARNA_C.jingga} {...TEPI} />,
      },
      {
        id: "segitiga",
        nama: "dua segitiga sama kaki siku-siku jadi persegi",
        kiri: (
          <>
            <polygon points="12,50 12,14 48,50" fill={M} {...TEPI} />
            <polygon points="88,12 52,12 88,48" fill={B} {...TEPI} />
          </>
        ),
        kanan: <rect x="32" y="14" width="36" height="36" fill={WARNA_C.hijau} {...TEPI} />,
      },
    ],
  },
  {
    urutKanan: ["potong", "rumah", "lingkaran"],
    kartu: [
      {
        id: "lingkaran",
        nama: "tiga perempat bulat dan seperempat jadi bulat penuh",
        kiri: (
          <>
            <path d="M30 36 L50 36 A20 20 0 1 1 30 16 Z" fill={M} {...TEPI} />
            <path d="M70 46 L90 46 A20 20 0 0 0 70 26 Z" fill={B} {...TEPI} />
          </>
        ),
        kanan: <circle cx="50" cy="32" r="22" fill={WARNA_C.ungu} {...TEPI} />,
      },
      {
        id: "potong",
        nama: "bangun bersudut miring dan segitiga kecil jadi segi empat",
        kiri: (
          <>
            <polygon points="10,14 54,14 54,46 30,46 10,30" fill={B} {...TEPI} />
            <polygon points="66,30 86,46 66,46" fill={M} {...TEPI} />
          </>
        ),
        kanan: <rect x="28" y="14" width="44" height="32" fill={WARNA_C.jingga} {...TEPI} />,
      },
      {
        id: "rumah",
        nama: "persegi dan segitiga jadi bangun bersudut lima",
        kiri: (
          <>
            <rect x="14" y="32" width="24" height="24" fill={K} {...TEPI} />
            <polygon points="62,56 86,56 74,38" fill={M} {...TEPI} />
          </>
        ),
        kanan: <polygon points="38,60 38,36 50,18 62,36 62,60" fill={WARNA_C.hijau} {...TEPI} />,
      },
    ],
  },
];

function RondeJodoh({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_JODOH[ronde];
  const akhir = ronde === RONDE_JODOH.length - 1;
  const [terhubung, setTerhubung] = useState<string[]>([]);
  const [kiriPilih, setKiriPilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terhubung.length === d.kartu.length;
  const suara = panel.suara["c4-jodoh"] === true && akhir;
  useBicara(akhir ? suara : beres, "Semua pasangan sudah benar. Setiap pasang keping digabung dan menjadi satu bangun baru.");
  const nomor = (id: string) => terhubung.indexOf(id) + 1;

  const pilihKiri = (id: string) => {
    if (terhubung.includes(id)) return;
    setKiriPilih(id);
    setKabar(null);
  };
  const pilihKanan = (id: string) => {
    if (beres || terhubung.includes(id)) return;
    if (!kiriPilih) {
      setKabar({ teks: "Ketuk dulu satu pasang keping di kolom kiri.", ok: false });
      return;
    }
    if (kiriPilih === id) {
      const baru = [...terhubung, id];
      setTerhubung(baru);
      setKiriPilih(null);
      setGoyang(null);
      setKabar(null);
      if (baru.length === d.kartu.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang(id);
      setKabar({ teks: "Kalau keping itu digabung, hasilnya bukan bangun ini. Bayangkan menggabungkannya, lalu coba lagi.", ok: false });
    }
  };

  const kananUrut = d.urutKanan.map((id) => d.kartu.find((k) => k.id === id)!);

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak keping" : "Semua berpasangan!") : "Jodohkan keping dengan bangun"}
        teks={`Di kolom kiri ada pasangan keping. Di kolom kanan ada bangun hasil gabungannya. Ketuk satu pasang keping, lalu ketuk bangun yang terbentuk kalau keping itu digabung.${akhir ? " Setelah semua berpasangan, ucapkan berapa banyak keping di kolom kiri semuanya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Keping</p>
            {d.kartu.map((k) => {
              const sudah = terhubung.includes(k.id);
              return (
                <button
                  key={k.id}
                  type="button"
                  aria-label={`Keping: ${k.nama}${sudah ? `, pasangan nomor ${nomor(k.id)}` : ""}`}
                  aria-pressed={kiriPilih === k.id}
                  disabled={sudah}
                  onClick={() => pilihKiri(k.id)}
                  className={`igil-tanpa-tepi relative block w-full rounded-2xl border-4 bg-white px-1 py-1 ${
                    sudah ? "border-[#16A34A] bg-[#E8F7EE]" : kiriPilih === k.id ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]/50" : "border-dashed border-[#6B7280]/60"
                  }`}
                >
                  <svg viewBox="0 0 100 64" className="h-16 w-full" aria-hidden="true">
                    {k.kiri}
                  </svg>
                  {sudah ? <span className="absolute right-1 top-1 rounded-full bg-[#16A34A] px-1.5 text-xs font-black text-white">{nomor(k.id)}</span> : null}
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Bangun hasil</p>
            {kananUrut.map((k) => {
              const sudah = terhubung.includes(k.id);
              return (
                <button
                  key={`${k.id}-${goyang === k.id ? "x" : "o"}`}
                  type="button"
                  aria-label={`Bangun hasil nomor ${d.urutKanan.indexOf(k.id) + 1}${sudah ? `, pasangan nomor ${nomor(k.id)}` : ""}`}
                  disabled={sudah}
                  onClick={() => pilihKanan(k.id)}
                  className={`igil-tanpa-tepi relative block w-full rounded-2xl border-4 bg-white px-1 py-1 ${
                    sudah ? "border-[#16A34A] bg-[#E8F7EE]" : "border-dashed border-[#6B7280]/60"
                  } ${goyang === k.id ? "igil-goyang" : ""}`}
                >
                  <svg viewBox="0 0 100 64" className="h-16 w-full" aria-hidden="true">
                    {k.kanan}
                  </svg>
                  {sudah ? <span className="absolute right-1 top-1 rounded-full bg-[#16A34A] px-1.5 text-xs font-black text-white">{nomor(k.id)}</span> : null}
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
      judul="Jodohkan Keping dan Bangun"
      warna="#FDE68A"
      petunjuk="Ketuk satu pasang keping di kolom kiri, lalu ketuk bangun hasil gabungannya di kolom kanan. Pada soal terakhir, ucapkan berapa banyak keping di kolom kiri semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-jodoh"
      jumlahRonde={RONDE_JODOH.length}
      kunciAkhir={6}
      belumSiap="Jodohkan semua pasangan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJodoh ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Tunjuk dan Hitung --------------------------------- */

const RONDE_FIGUR: { nama: string; bagian: Bagian[] }[] = [
  { nama: "Bangun gabungan 1", bagian: FIGUR_1 },
  { nama: "Bangun gabungan 2", bagian: FIGUR_2 },
];

const URUT_GOL: Gol3[] = ["segiempat", "segitiga", "lengkung"];

function pusat(b: Bagian) {
  const k = kotakBagian(b);
  return { x: k.x + k.w / 2, y: k.y + k.h / 2 };
}

function RondeFigur({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_FIGUR[ronde];
  const akhir = ronde === RONDE_FIGUR.length - 1;
  const total = d.bagian.length;
  const [aktif, setAktif] = useState<Gol3 | null>(null);
  const [nomor, setNomor] = useState<Record<string, number>>({});
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlahDi = (g: Gol3) => d.bagian.filter((b) => b.g === g && nomor[b.id]).length;
  const selesai = (g: Gol3) => jumlahDi(g) === hitungGol(d.bagian, g);
  const beres = URUT_GOL.every(selesai);
  const suara = panel.suara["c4-figur"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Segi empat ada ${kataK(hitungGol(d.bagian, "segiempat"))}, segitiga ada ${kataK(hitungGol(d.bagian, "segitiga"))}, dan bentuk lengkung ada ${kataK(hitungGol(d.bagian, "lengkung"))}. Bangun ini tersusun dari ${kataK(total)} bagian.`
  );

  const pilihJenis = (g: Gol3) => {
    if (selesai(g) || beres) return;
    setAktif(g);
    setKabar(null);
  };

  const tunjuk = (b: Bagian) => {
    if (beres || nomor[b.id]) return;
    if (!aktif) {
      setKabar({ teks: "Pilih dulu jenis bentuk yang mau dihitung: segi empat, segitiga, atau bentuk lengkung.", ok: false });
      return;
    }
    if (b.g !== aktif) {
      setGoyang(b.id);
      setKabar({ teks: `Bagian ini ${NAMA_GOL3[b.g]}, bukan ${NAMA_GOL3[aktif]}. Cari bagian yang lain.`, ok: false });
      return;
    }
    const n = jumlahDi(aktif) + 1;
    setNomor((p) => ({ ...p, [b.id]: n }));
    setGoyang(null);
    setKabar(null);
    if (n === hitungGol(d.bagian, aktif)) {
      setAktif(null);
      const gabung = { ...nomor, [b.id]: n };
      if (URUT_GOL.every((g) => d.bagian.filter((x) => x.g === g && gabung[x.id]).length === hitungGol(d.bagian, g))) {
        letusan.picu();
        onBeres();
      }
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak bagian semuanya" : "Semua bagian terhitung!") : "Pilih jenis, lalu tunjuk bagiannya"}
        teks={`Bangun ini tersusun dari beberapa bagian. Pilih satu jenis bentuk, lalu ketuk semua bagian dengan jenis itu satu per satu. Angkanya akan muncul berurutan.${akhir ? " Setelah ketiga jenis selesai, ucapkan berapa banyak bagian semuanya." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-3 gap-2">
          {URUT_GOL.map((g) => {
            const sel = selesai(g);
            return (
              <button
                key={g}
                type="button"
                aria-label={`Hitung ${NAMA_GOL3[g]}${sel ? `, sudah selesai, ada ${jumlahDi(g)}` : ""}`}
                aria-pressed={aktif === g}
                onClick={() => pilihJenis(g)}
                className={`igil-tanpa-tepi rounded-2xl border-4 px-1 py-2 text-center text-sm font-black leading-tight text-[#1C01A5] ${
                  sel ? "border-[#16A34A] bg-[#E8F7EE]" : aktif === g ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5] bg-[#FFE566]"
                }`}
              >
                {NAMA_GOL3[g]}
                <span className="block text-lg">{sel ? `✅ ${jumlahDi(g)}` : jumlahDi(g)}</span>
              </button>
            );
          })}
        </div>
        <div className="rounded-3xl border-4 border-dashed border-[#6B7280]/50 bg-white px-2 py-2">
          <p className="pb-1 text-center text-xs font-black text-[#1C01A5]/70">{d.nama}</p>
          <svg viewBox="0 0 200 150" className="mx-auto h-44 w-full max-w-[300px]" role="group" aria-label={d.nama}>
            {d.bagian.map((b, i) => {
              const c = pusat(b);
              const ok = !!nomor[b.id];
              return (
                <g
                  key={`${b.id}-${goyang === b.id ? "x" : "o"}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Bagian ${i + 1}: ${b.nama}${ok ? `, nomor ${nomor[b.id]}` : ""}`}
                  onClick={() => tunjuk(b)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      tunjuk(b);
                    }
                  }}
                  className={goyang === b.id ? "igil-goyang" : ""}
                  style={{ cursor: "pointer", transformBox: "fill-box", transformOrigin: "50% 50%" }}
                >
                  <GambarBagian b={b} tebal={ok ? 4 : 3} garis={ok ? "#166534" : BIRU} />
                  {ok ? (
                    <>
                      <circle cx={c.x} cy={c.y} r="10" fill="#FFFFFF" stroke="#166534" strokeWidth="2.4" />
                      <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#166534">
                        {nomor[b.id]}
                      </text>
                    </>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuFigur({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tunjuk dan Hitung"
      warna="#FDE68A"
      petunjuk="Pilih jenis bentuk, lalu ketuk semua bagian dengan jenis itu pada bangun gabungan. Ulangi untuk tiga jenis. Pada soal terakhir, ucapkan berapa banyak bagian semuanya."
      speakGuru={speakGuru}
      panel={panel}
      id="c4-figur"
      jumlahRonde={RONDE_FIGUR.length}
      kunciAkhir={RONDE_FIGUR[RONDE_FIGUR.length - 1].bagian.length}
      belumSiap="Hitung ketiga jenis bentuk dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeFigur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
