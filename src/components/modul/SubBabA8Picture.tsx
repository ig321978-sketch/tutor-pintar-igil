"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { PilihKata } from "./ukur-7-dasar";
import { TabelMendatar, TabelMenurun, WARNA_TITIK, kocok, tebar } from "./data-8-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab A, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Titik polos, tabel, baris, dan kolom. Anak menandai, mengetuk, dan mengisi.*/
/* Anak tidak memindahkan benda.                                              */
/*  5 Kelompokkan Titik (ketuk warna, hitung titiknya, isi daftar)            */
/*  6 Baris dan Kolom (ketuk baris, kolom, dan kotak pada tabel)              */
/*  7 Menurun jadi Mendatar (isi tabel mendatar dari tabel menurun)           */
/* ------------------------------------------------------------------------ */

type Warna = "merah" | "kuning" | "hijau" | "biru";

/* --------- Permainan 5. Kelompokkan Titik ---------------------------------- */

type RondeTitik = { warna: { k: Warna; n: number }[]; tanya: "banyak" | "sedikit" };

const RONDE_TITIK: RondeTitik[] = [
  {
    warna: [
      { k: "merah", n: 5 },
      { k: "kuning", n: 3 },
      { k: "hijau", n: 6 },
    ],
    tanya: "banyak",
  },
  {
    warna: [
      { k: "merah", n: 4 },
      { k: "biru", n: 7 },
      { k: "kuning", n: 5 },
    ],
    tanya: "banyak",
  },
  {
    warna: [
      { k: "merah", n: 6 },
      { k: "biru", n: 3 },
      { k: "hijau", n: 4 },
      { k: "kuning", n: 2 },
    ],
    tanya: "sedikit",
  },
];

function RondeKelompokTitik({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TITIK[ronde];
  const akhir = ronde === RONDE_TITIK.length - 1;
  const total = d.warna.reduce((a, b) => a + b.n, 0);
  const titik = React.useMemo(() => {
    const urut = kocok(
      d.warna.flatMap((w) => Array.from({ length: w.n }, () => w.k)),
      9 + ronde
    );
    const pos = tebar(urut.length, 250, 92, 71 + ronde);
    return urut.map((k, i) => ({ k, ...pos[i] }));
  }, [d, ronde]);
  const [pilihW, setPilihW] = useState<Warna | null>(null);
  const [selesai, setSelesai] = useState<Warna[]>([]);
  const [salahAngka, setSalahAngka] = useState<number | null>(null);
  const [salahKata, setSalahKata] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = selesai.length === d.warna.length;
  const kunci = d.tanya === "banyak" ? d.warna.reduce((a, b) => (b.n > a.n ? b : a)) : d.warna.reduce((a, b) => (b.n < a.n ? b : a));
  const suara = panel.suara["a8-kelompok-titik"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.warna.map((w) => `Ada ${sebut(w.n)} titik ${w.k}.`).join(" ")} Titik yang paling ${d.tanya} berwarna ${kunci.k}.${akhir ? ` Jumlah semua titik ada ${sebut(total)}.` : ""}`);

  const pilihAngka = (v: number) => {
    if (!pilihW) return;
    const w = d.warna.find((x) => x.k === pilihW)!;
    if (v === w.n) {
      setSalahAngka(null);
      setKabar(null);
      setSelesai([...selesai, pilihW]);
      setPilihW(null);
    } else {
      setSalahAngka(v);
      setKabar({ teks: `Hitung titik ${pilihW} satu per satu. Setiap titik yang bernomor adalah satu hitungan.`, ok: false });
    }
  };

  const pilihKata = (t: string) => {
    if (!semua || beres) return;
    if (t === kunci.k) {
      setSalahKata(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahKata(t);
      setKabar({ teks: `Lihat daftar. Cari angka yang paling ${d.tanya === "banyak" ? "besar" : "kecil"}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Daftarmu lengkap!" : semua ? `Mana yang paling ${d.tanya}?` : "Ketuk warna untuk menghitung"}
        teks={`Ketuk satu warna. Titik warna itu diberi nomor satu per satu. Hitung titiknya, lalu pilih angkanya untuk mengisi daftar. Setelah semua warna selesai, cari titik yang paling ${d.tanya}.${akhir ? " Di akhir, ucapkan jumlah semua titik." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="relative mx-auto w-full rounded-xl border-2 border-[#1C01A5]/50 bg-white" style={{ height: 120 }} role="img" aria-label={`Titik berwarna: ${d.warna.map((w) => w.k).join(", ")}`}>
          {titik.map((m, i) => {
            const aktif = pilihW === m.k;
            const nomor = aktif ? titik.slice(0, i + 1).filter((x) => x.k === m.k).length : 0;
            return (
              <span
                key={i}
                className={`absolute flex items-center justify-center rounded-full border-2 border-[#1C01A5] text-[11px] font-black text-[#1C01A5] ${aktif ? "ring-4 ring-[#F0AB00]" : ""}`}
                style={{ left: `${((m.x + 25) / 300) * 100}%`, top: m.y + 6, width: 22, height: 22, transform: "translate(-50%, 0)", backgroundColor: WARNA_TITIK[m.k] }}
              >
                {nomor > 0 ? nomor : ""}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {d.warna.map((w) => {
            const sudah = selesai.includes(w.k);
            return (
              <button
                key={w.k}
                type="button"
                aria-label={`Hitung titik ${w.k}${sudah ? ", sudah selesai" : ""}`}
                disabled={sudah || semua}
                onClick={() => {
                  setPilihW(w.k);
                  setKabar(null);
                }}
                className={`flex items-center gap-1.5 rounded-full border-4 border-[#1C01A5] bg-white px-3 py-1 text-sm font-black text-[#1C01A5] disabled:opacity-60 ${pilihW === w.k ? "ring-4 ring-[#F0AB00]" : ""}`}
              >
                <span className="block h-5 w-5 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_TITIK[w.k] }} />
                {w.k}
                {sudah ? <span> ✔</span> : null}
              </button>
            );
          })}
        </div>
        {pilihW && !semua ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Ada ... titik {pilihW}.</p>
            <PilihAngka opsi={opsiSekitar(d.warna.find((x) => x.k === pilihW)!.n)} keliru={salahAngka} onPilih={pilihAngka} />
          </div>
        ) : null}
        <div className="space-y-0.5 rounded-xl border-4 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">
          <p className="text-center text-xs text-[#1C01A5]/70">Daftar Titik</p>
          {d.warna.map((w) => (
            <p key={w.k}>{selesai.includes(w.k) ? `Ada ${w.n} titik ${w.k}.` : `Ada … titik ${w.k}.`}</p>
          ))}
        </div>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Titik yang paling {d.tanya} berwarna ...</p>
            <PilihKata opsi={d.warna.map((w) => w.k)} keliru={salahKata} onPilih={pilihKata} kolom={d.warna.length > 3 ? 2 : 3} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua titik = ?" : `Paling ${d.tanya}: titik ${kunci.k}, ada ${kunci.n}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKelompokTitik({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TITIK[RONDE_TITIK.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kelompokkan Titik"
      warna="#FDE68A"
      petunjuk="Mengelompokkan dan menghitung titik polos. Ketuk satu warna, hitung titik yang bernomor, lalu pilih angkanya untuk mengisi daftar. Setelah itu, cari warna yang paling banyak atau paling sedikit. Pada soal terakhir, ucapkan jumlah semua titik."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-kelompok-titik"
      jumlahRonde={RONDE_TITIK.length}
      kunciAkhir={terakhir.warna.reduce((a, b) => a + b.n, 0)}
      belumSiap="Hitung semua warnanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKelompokTitik ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Baris dan Kolom ------------------------------------ */

type TugasTabel = { t: "baris" | "kolom" | "sel"; r?: number; c?: number; teks: string; hint: string };
type RondeBarisKolom = { arah: "menurun" | "mendatar"; judul: string; sel: (string | number)[][]; tugas: TugasTabel[] };

const RONDE_BARIS_KOLOM: RondeBarisKolom[] = [
  {
    arah: "menurun",
    judul: "Tabel Banyak Bola",
    sel: [
      ["Warna Bola", "Banyaknya"],
      ["Merah", 7],
      ["Kuning", 4],
      ["Hijau", 6],
    ],
    tugas: [
      { t: "kolom", c: 1, teks: "Ketuk kolom Banyaknya.", hint: "Kolom berjalan ke bawah. Cari deretan yang memuat tulisan Banyaknya." },
      { t: "baris", r: 2, teks: "Ketuk baris Kuning.", hint: "Baris berjalan ke samping. Cari deretan yang memuat tulisan Kuning." },
      { t: "sel", r: 3, c: 1, teks: "Ketuk kotak yang berisi banyak bola hijau.", hint: "Kotak itu ada di pertemuan baris Hijau dan kolom Banyaknya." },
    ],
  },
  {
    arah: "mendatar",
    judul: "Tabel Mainan Kesukaan",
    sel: [
      ["Mainan", "Boneka", "Gasing", "Kelereng", "Bola"],
      ["Banyak anak", 3, 5, 4, 6],
    ],
    tugas: [
      { t: "baris", r: 1, teks: "Ketuk baris Banyak anak.", hint: "Baris berjalan ke samping. Cari deretan yang memuat tulisan Banyak anak." },
      { t: "kolom", c: 2, teks: "Ketuk kolom Gasing.", hint: "Kolom berjalan ke bawah. Cari deretan yang memuat tulisan Gasing." },
      { t: "sel", r: 1, c: 4, teks: "Ketuk kotak yang berisi banyak anak yang suka bola.", hint: "Kotak itu ada di pertemuan baris Banyak anak dan kolom Bola." },
    ],
  },
  {
    arah: "menurun",
    judul: "Tabel Kue Kesukaan",
    sel: [
      ["Nama Kue", "Banyak anak"],
      ["Kue Talam", 5],
      ["Kue Cucur", 3],
      ["Kue Lapis", 5],
      ["Kue Bugis", 6],
    ],
    tugas: [
      { t: "kolom", c: 1, teks: "Ketuk kolom Banyak anak.", hint: "Kolom berjalan ke bawah. Cari deretan yang memuat tulisan Banyak anak." },
      { t: "baris", r: 3, teks: "Ketuk baris Kue Lapis.", hint: "Baris berjalan ke samping. Cari deretan yang memuat tulisan Kue Lapis." },
      { t: "sel", r: 4, c: 1, teks: "Ketuk kotak yang berisi banyak anak yang suka kue bugis.", hint: "Kotak itu ada di pertemuan baris Kue Bugis dan kolom Banyak anak." },
    ],
  },
];

function RondeBarisKolomTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_BARIS_KOLOM[ronde];
  const akhir = ronde === RONDE_BARIS_KOLOM.length - 1;
  const [langkah, setLangkah] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = langkah >= d.tugas.length;
  const kolom = d.sel[0].length;
  const terakhir = d.tugas[d.tugas.length - 1];
  const nilaiAkhir = d.sel[terakhir.r as number][terakhir.c as number];
  const suara = panel.suara["a8-baris-kolom"] === true && akhir;
  useBicara(akhir ? suara : beres, `Baris berjalan ke samping dan kolom berjalan ke bawah. Kotak itu berisi ${sebut(Number(nilaiAkhir))}.`);

  const ketuk = (r: number, c: number) => {
    if (beres) return;
    const t = d.tugas[langkah];
    const benar = t.t === "baris" ? r === t.r : t.t === "kolom" ? c === t.c : r === t.r && c === t.c;
    if (benar) {
      setKabar(null);
      const berikut = langkah + 1;
      setLangkah(berikut);
      if (berikut >= d.tugas.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKabar({ teks: t.hint, ok: false });
    }
  };

  const warnaSel = (r: number, c: number) => {
    for (let i = 0; i < langkah; i++) {
      const t = d.tugas[i];
      if (t.t === "sel" && t.r === r && t.c === c) return "#BBF7D0";
      if (t.t === "baris" && t.r === r) return "#FFE566";
      if (t.t === "kolom" && t.c === c) return "#BFDBFE";
    }
    return r === 0 ? "#E9D8F3" : "#FFFFFF";
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: isi kotak itu" : suara ? "Hebat!" : beres ? "Tabelmu terbaca!" : d.tugas[langkah].teks}
        teks={`Baca tugasnya, lalu ketuk bagian tabel yang tepat. Baris berjalan ke samping. Kolom berjalan ke bawah. Kotak ada di pertemuan baris dan kolom. ${beres ? "" : d.tugas[langkah].teks}${akhir ? " Di akhir, ucapkan isi kotak terakhir." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-sm font-black text-[#1C01A5]">{d.judul}</p>
        <div role="table" aria-label={d.judul} className="grid overflow-hidden rounded-xl border-4 border-[#1C01A5] bg-white text-center" style={{ gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))` }}>
          {d.sel.map((baris, r) =>
            baris.map((isi, c) => (
              <button
                key={`${r}-${c}`}
                type="button"
                aria-label={`Kotak baris ${r + 1} kolom ${c + 1}: ${isi}`}
                onClick={() => ketuk(r, c)}
                className="border border-[#1C01A5]/40 px-0.5 py-2.5 text-sm font-black leading-tight text-[#1C01A5]"
                style={{ backgroundColor: warnaSel(r, c) }}
              >
                {isi}
              </button>
            ))
          )}
        </div>
        <div className="space-y-1">
          {d.tugas.map((t, i) => (
            <p key={t.teks} className={`rounded-xl border-2 px-2 py-1 text-sm font-black ${i < langkah ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : i === langkah ? "border-[#1C01A5] bg-[#FFF7CC] text-[#1C01A5]" : "border-[#1C01A5]/20 bg-white/70 text-[#1C01A5]/40"}`}>
              {i < langkah ? "✔ " : `${i + 1}. `}
              {t.teks}
            </p>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Isi kotak terakhir = ?" : `Isi kotak terakhir = ${nilaiAkhir}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBarisKolom({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const t = RONDE_BARIS_KOLOM[RONDE_BARIS_KOLOM.length - 1];
  const tugas = t.tugas[t.tugas.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Baris dan Kolom"
      warna="#BBF7D0"
      petunjuk="Mengenal bagian tabel. Baris berjalan ke samping, kolom berjalan ke bawah, dan kotak ada di pertemuan baris dan kolom. Ketuk baris, kolom, atau kotak sesuai tugas. Pada soal terakhir, ucapkan isi kotak yang diminta."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-baris-kolom"
      jumlahRonde={RONDE_BARIS_KOLOM.length}
      kunciAkhir={Number(t.sel[tugas.r as number][tugas.c as number])}
      belumSiap="Selesaikan semua tugasnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBarisKolomTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Menurun jadi Mendatar ------------------------------ */

type RondeUbah = { judul: string; kepala: [string, string]; baris: [string, number][] };

const RONDE_UBAH: RondeUbah[] = [
  {
    judul: "Tabel Banyak Bola",
    kepala: ["Warna Bola", "Banyaknya"],
    baris: [
      ["Merah", 7],
      ["Kuning", 4],
      ["Hijau", 6],
    ],
  },
  {
    judul: "Tabel Pita Wei",
    kepala: ["Warna Pita", "Banyaknya"],
    baris: [
      ["Merah", 3],
      ["Biru", 5],
      ["Kuning", 2],
    ],
  },
  {
    judul: "Tabel Buah-buahan",
    kepala: ["Nama Buah", "Banyaknya"],
    baris: [
      ["Jeruk", 5],
      ["Apel", 4],
      ["Mangga", 6],
    ],
  },
];

function RondeUbahTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_UBAH[ronde];
  const akhir = ronde === RONDE_UBAH.length - 1;
  const n = d.baris.length;
  const total = d.baris.reduce((a, b) => a + b[1], 0);
  const [isi, setIsi] = useState(0);
  const [jumlahOk, setJumlahOk] = useState(false);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = isi >= n;
  const suara = panel.suara["a8-ubah-tabel"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.baris.map(([a, b]) => `${a} ${sebut(b)}`).join(", ")}. Tabel mendatar memuat data yang sama dengan tabel menurun. Jumlah semuanya ${sebut(total)}.`);

  const selesaikan = () => {
    setBeres(true);
    letusan.picu();
    onBeres();
  };

  const pilihSel = (v: number) => {
    if (penuh) return;
    if (v === d.baris[isi][1]) {
      setSalah(null);
      setKabar(null);
      const berikut = isi + 1;
      setIsi(berikut);
      if (berikut >= n && akhir) selesaikan();
    } else {
      setSalah(v);
      setKabar({ teks: `Lihat tabel menurun. Cari baris ${d.baris[isi][0]}, lalu baca angka pada kolom ${d.kepala[1]}.`, ok: false });
    }
  };

  const pilihJumlah = (v: number) => {
    if (!penuh || beres) return;
    if (v === total) {
      setSalah(null);
      setKabar(null);
      setJumlahOk(true);
      selesaikan();
    } else {
      setSalah(v);
      setKabar({ teks: "Jumlahkan semua angka pada tabel. Tambahkan satu per satu.", ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Tabelmu berubah bentuk!" : penuh ? "Berapa jumlah semuanya?" : "Isi tabel mendatar"}
        teks={`Pindahkan data dari tabel menurun ke tabel mendatar. Isi kotak banyaknya satu per satu dari kiri ke kanan.${akhir ? " Di akhir, ucapkan jumlah semua data." : " Setelah itu, cari jumlah semuanya."}`}
      />
      <div className={KERTAS_GAMBAR}>
        <TabelMenurun judul={`${d.judul} (menurun)`} kepala={d.kepala} baris={d.baris} kecil />
        <TabelMendatar
          judul={`${d.judul} (mendatar)`}
          labelNama={d.kepala[0]}
          labelBanyak={d.kepala[1]}
          nama={d.baris.map((b) => b[0])}
          nilai={d.baris.map((b, i) => (i < isi ? b[1] : "?"))}
          kecil
        />
        {!penuh ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              Banyaknya {d.baris[isi][0].toLowerCase()} = ?
            </p>
            <PilihAngka opsi={opsiSekitar(d.baris[isi][1])} keliru={salah} onPilih={pilihSel} />
          </div>
        ) : null}
        {penuh && !akhir && !jumlahOk ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Jumlah semuanya = ?</p>
            <PilihAngka opsi={opsiSekitar(total)} keliru={salah} onPilih={pilihJumlah} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semuanya = ?" : `Jumlah semuanya = ${total}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuUbahTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_UBAH[RONDE_UBAH.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Menurun jadi Mendatar"
      warna="#C7D2FE"
      petunjuk="Memindahkan data antar bentuk tabel. Lihat tabel menurun, lalu isi kotak banyaknya pada tabel mendatar dari kiri ke kanan. Datanya sama, hanya bentuknya yang berbeda. Pada soal terakhir, ucapkan jumlah semua data."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-ubah-tabel"
      jumlahRonde={RONDE_UBAH.length}
      kunciAkhir={terakhir.baris.reduce((a, b) => a + b[1], 0)}
      belumSiap="Isi tabel mendatarnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeUbahTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}