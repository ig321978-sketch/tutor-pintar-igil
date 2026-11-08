"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { Kelereng, sebut } from "./belas-a5-dasar";
import { EsKrim, KepalaUlat, Lampu, Roket, type Arah } from "./urut-b5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab B, Tahap 4 Concrete: benda nyata. Anak menambah dan           */
/* mengambil kelereng, menaruh kartu di badan ulat, mematikan lampu hitung     */
/* mundur, dan menukar es krim sampai urutannya benar.                        */
/*  1 Barisan Kelereng Halim (tambah dan ambil satu per satu)                 */
/*  2 Ulat Bilangan (taruh kartu angka yang hilang)                           */
/*  3 Roket Hitung Mundur (padamkan lampu berurutan)                          */
/*  4 Susun Es Krim (tukar tempat sampai berurutan)                           */
/* ------------------------------------------------------------------------ */

const rangkai = (daftar: number[]) => daftar.map((n) => sebut(n)).join(", ");

/* --------- Permainan 1. Barisan Kelereng Halim ---------------------------- */

const RONDE_BARIS: { arah: Arah; awal: number; akhir: number }[] = [
  { arah: "maju", awal: 10, akhir: 13 },
  { arah: "mundur", awal: 15, akhir: 12 },
  { arah: "maju", awal: 14, akhir: 18 },
];

function RondeBaris({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_BARIS[ronde];
  const maju = d.arah === "maju";
  const akhir = ronde === RONDE_BARIS.length - 1;
  const [n, setN] = useState(d.awal);
  const [jejak, setJejak] = useState<number[]>([d.awal]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = n === d.akhir;
  const suara = panel.suara["b5-baris"] === true && akhir;
  const banyakLangkah = Math.abs(d.akhir - d.awal);
  useBicara(
    akhir ? suara : beres,
    `${rangkai(jejak)}. Kita menghitung ${maju ? "maju" : "mundur"}, langkahnya sama, satu demi satu.`
  );

  const geser = (ke: number) => {
    if (beres) return;
    setN(ke);
    setJejak((j) => [...j, ke]);
    setKabar(null);
    ucap(sebut(ke));
    if (ke === d.akhir) {
      letusan.picu();
      onBeres();
    }
  };

  const ambil = (i: number) => {
    if (maju || beres) return;
    if (i !== n - 1) {
      setKabar({ teks: "Ambil kelereng yang paling ujung, yang paling kanan, lebih dulu.", ok: false });
      return;
    }
    geser(n - 1);
  };

  const sisaNampan = maju ? banyakLangkah - (n - d.awal) : 0;
  const diambil = maju ? 0 : d.awal - n;
  const warna = ronde;

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlahnya" : suara ? "Hebat!" : beres ? "Hitunganmu tepat!" : maju ? `Maju dari ${d.awal}` : `Mundur dari ${d.awal}`}
        teks={
          maju
            ? `Kita menghitung maju. Di baris sudah ada ${sebut(d.awal)} kelereng. Ambil kelereng dari nampan satu per satu dan taruh di ujung baris. Setiap kali, sebut bilangan berikutnya, sampai ${sebut(d.akhir)}.${akhir ? " Di akhir, ucapkan banyak kelereng di baris." : ""}`
            : `Kita menghitung mundur. Di baris ada ${sebut(d.awal)} kelereng. Ketuk kelereng yang paling ujung untuk mengambilnya. Setiap kali, sebut bilangan yang tersisa, sampai tinggal ${sebut(d.akhir)}.`
        }
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {maju ? "➡️ Hitung maju" : "⬅️ Hitung mundur"} • langkahnya sama
        </p>
        <div
          data-zona="b5-baris"
          className="flex min-h-[76px] flex-wrap items-center justify-center gap-x-0.5 gap-y-3 rounded-3xl border-4 border-dashed border-[#1C01A5] bg-white px-2 py-3"
        >
          {Array.from({ length: n }, (_, i) => {
            const ujung = i === n - 1;
            const kelereng = (
              <span className="relative block">
                <Kelereng warna={warna} kelas="h-8 w-8" />
                {ujung ? (
                  <span className="absolute -right-2 -top-3 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-xs font-black text-[#1C01A5]">
                    {n}
                  </span>
                ) : null}
              </span>
            );
            if (maju) {
              return (
                <span key={i} className={ujung && n > d.awal ? "igil-muncul" : ""}>
                  {kelereng}
                </span>
              );
            }
            return ujung ? (
              <BendaSeret
                key={`u${i}`}
                id={`u${i}`}
                label={`Kelereng paling ujung, bilangan ${n}`}
                onKetuk={() => ambil(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "b5-nampan") ambil(i);
                }}
                kelas="rounded-full"
                gaya={{ filter: "drop-shadow(0 0 5px #F0AB00)" }}
              >
                {kelereng}
              </BendaSeret>
            ) : (
              <button key={i} type="button" aria-label={`Kelereng ke-${i + 1}`} onClick={() => ambil(i)} className="igil-tanpa-tepi rounded-full">
                {kelereng}
              </button>
            );
          })}
        </div>
        <div
          data-zona="b5-nampan"
          className="flex min-h-[64px] flex-wrap items-center justify-center gap-1 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2"
        >
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">{maju ? "🧺 Nampan kelereng" : "🧺 Kelereng yang diambil"}</span>
          {maju
            ? Array.from({ length: sisaNampan }, (_, i) => (
                <BendaSeret
                  key={`n${i}`}
                  id={`n${i}`}
                  label={`Kelereng di nampan ${i + 1}`}
                  onKetuk={() => geser(n + 1)}
                  onLepas={(_, x, y) => {
                    if (zonaDi(x, y) === "b5-baris") geser(n + 1);
                  }}
                  kelas="rounded-full"
                  gaya={letakMeja(i)}
                >
                  <Kelereng warna={warna} kelas="h-9 w-9" />
                </BendaSeret>
              ))
            : Array.from({ length: diambil }, (_, i) => (
                <span key={`d${i}`} className="igil-muncul block" style={letakMeja(i)}>
                  <Kelereng warna={warna} kelas="h-8 w-8" />
                </span>
              ))}
          {maju && sisaNampan === 0 ? <span className="text-3xl">✅</span> : null}
        </div>
        <p className="text-center text-xl font-black leading-snug text-[#1C01A5]">
          Hitunganku:{" "}
          {jejak.map((v, i) => (
            <span key={i}>
              {i > 0 ? " → " : ""}
              {akhir && beres && !suara && i === jejak.length - 1 ? "?" : v}
            </span>
          ))}
        </p>
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
      judul="Barisan Kelereng Halim"
      warna="#FFE566"
      petunjuk="Pada barisan kelereng, tiap bilangan berikutnya satu lebih banyak. Saat menghitung maju, ambil kelereng dari nampan satu per satu dan sebut bilangan berikutnya. Saat menghitung mundur, ambil kelereng paling ujung satu per satu dan sebut bilangan yang tersisa. Pada ronde terakhir, ucapkan banyak kelereng di baris."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-baris"
      jumlahRonde={RONDE_BARIS.length}
      kunciAkhir={RONDE_BARIS[RONDE_BARIS.length - 1].akhir}
      belumSiap="Selesaikan barisan kelerengnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBaris ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Ulat Bilangan ------------------------------------- */

const RONDE_ULAT: { arah: Arah; urut: number[]; kosong: number[]; kartu: number[] }[] = [
  { arah: "maju", urut: [10, 11, 12, 13], kosong: [2], kartu: [12, 14, 16] },
  { arah: "mundur", urut: [15, 14, 13, 12], kosong: [2, 3], kartu: [11, 13, 12, 16] },
  { arah: "maju", urut: [17, 18, 19, 20], kosong: [1, 3], kartu: [15, 18, 20, 16] },
];

function RondeUlat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_ULAT[ronde];
  const akhir = ronde === RONDE_ULAT.length - 1;
  const [isi, setIsi] = useState<(number | null)[]>(() => d.urut.map((v, i) => (d.kosong.includes(i) ? null : v)));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = isi.every((v) => v !== null);
  const suara = panel.suara["b5-ulat"] === true && akhir;
  const dipakai = isi.filter((v, i): v is number => v !== null && d.kosong.includes(i));
  const kartuSisa = d.kartu.filter((v) => !dipakai.includes(v));
  useBicara(
    akhir ? suara : beres,
    `${rangkai(d.urut)}. Kita menghitung ${d.arah === "maju" ? "maju" : "mundur"}, langkahnya sama, satu demi satu.`
  );

  const taruh = (v: number, i: number) => {
    if (isi[i] !== null || beres) return;
    if (d.urut[i] !== v) {
      setGoyang(i);
      setTerpilih(null);
      setKabar({
        teks:
          d.arah === "maju"
            ? "Menghitung maju: bilangan di sini satu lebih besar dari bilangan di sebelah kirinya. Coba kartu yang lain."
            : "Menghitung mundur: bilangan di sini satu lebih kecil dari bilangan di sebelah kirinya. Coba kartu yang lain.",
        ok: false,
      });
      return;
    }
    const baru = isi.slice();
    baru[i] = v;
    setIsi(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(v));
    if (baru.every((x) => x !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: bilangan terbesar" : suara ? "Hebat!" : beres ? "Ulatnya lengkap!" : d.arah === "maju" ? "Lengkapi ulat: maju" : "Lengkapi ulat: mundur"}
        teks={`Ini ulat bilangan. Badannya ada yang kosong. Pilih kartu angka yang pas, lalu taruh di badan yang kosong. Ulat ini menghitung ${d.arah === "maju" ? "maju" : "mundur"}, langkahnya sama.${akhir ? " Setelah lengkap, ucapkan bilangan yang paling besar di badan ulat." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {d.arah === "maju" ? "➡️ Ulat menghitung maju" : "⬅️ Ulat menghitung mundur"}
        </p>
        <div className="flex items-center justify-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-1 py-3">
          <KepalaUlat kelas="h-14 w-14 shrink-0" />
          {d.urut.map((v, i) => {
            const nilai = isi[i];
            const kosong = nilai === null;
            return (
              <button
                key={`${i}-${goyang === i ? "x" : "o"}`}
                type="button"
                data-zona={`ulat-${i}`}
                aria-label={`Badan ulat ke-${i + 1}, ${kosong ? "kosong" : nilai}`}
                onClick={() => {
                  if (!kosong) {
                    ucap(sebut(nilai));
                    return;
                  }
                  if (terpilih !== null) taruh(terpilih, i);
                  else setKabar({ teks: "Pilih dulu satu kartu angka di bawah, lalu ketuk badan yang kosong.", ok: false });
                }}
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 text-3xl font-black text-[#1C01A5] ${
                  kosong ? "border-dashed border-[#1C01A5] bg-white" : "border-solid border-[#1C01A5] bg-[#BBF7D0]"
                } ${goyang === i ? "igil-goyang" : ""} ${!kosong && d.kosong.includes(i) ? "igil-muncul" : ""}`}
              >
                {kosong ? <span className="text-xl text-[#1C01A5]/50">?</span> : (nilai ?? v)}
              </button>
            );
          })}
        </div>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu angka</span>
          {kartuSisa.map((v) => (
            <BendaSeret
              key={v}
              id={String(v)}
              label={`Kartu angka ${v}`}
              onKetuk={() => setTerpilih(v)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("ulat-")) taruh(v, Number(z.slice(5)));
              }}
              kelas="rounded-2xl"
            >
              <span
                className={`flex h-14 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white text-3xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${
                  terpilih === v ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""
                }`}
              >
                {v}
              </span>
            </BendaSeret>
          ))}
          {beres ? <span className="text-3xl">✅</span> : null}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {d.urut.join(" → ")} • langkahnya {d.arah === "maju" ? "+1" : "−1"}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahUlat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhirUrut = RONDE_ULAT[RONDE_ULAT.length - 1].urut;
  return (
    <GameBentuk
      nomor={nomor}
      judul="Ulat Bilangan"
      warna="#BBF7D0"
      petunjuk="Ulat bilangan menghitung maju atau mundur, dengan langkah yang sama. Pilih kartu angka yang pas, lalu taruh di badan ulat yang kosong. Pada ronde terakhir, ucapkan bilangan yang paling besar di badan ulat."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-ulat"
      jumlahRonde={RONDE_ULAT.length}
      kunciAkhir={Math.max(...akhirUrut)}
      belumSiap="Lengkapi badan ulatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeUlat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Roket Hitung Mundur ------------------------------- */

const RONDE_ROKET: { dari: number; sampai: number }[] = [
  { dari: 12, sampai: 8 },
  { dari: 17, sampai: 13 },
  { dari: 19, sampai: 15 },
];

function RondeRoket({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_ROKET[ronde];
  const akhir = ronde === RONDE_ROKET.length - 1;
  const total = d.dari - d.sampai + 1;
  const [padam, setPadam] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const berikut = d.dari - padam.length;
  const beres = padam.length === total;
  const suara = panel.suara["b5-roket"] === true && akhir;
  useBicara(akhir ? suara : beres, `${rangkai(padam)}. Roket meluncur! Kita menghitung mundur, langkahnya sama, satu demi satu.`);

  const ketuk = (v: number) => {
    if (beres) return;
    if (padam.includes(v)) {
      setKabar({ teks: "Lampu ini sudah padam. Cari lampu yang masih menyala.", ok: false });
      return;
    }
    if (v !== berikut) {
      setGoyang(v);
      setKabar({
        teks: padam.length === 0 ? "Hitung mundur dimulai dari bilangan yang paling besar, yaitu lampu paling kiri." : "Hitung mundur: padamkan lampu yang satu kurang dari lampu yang tadi.",
        ok: false,
      });
      return;
    }
    const baru = [...padam, v];
    setPadam(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(v));
    if (baru.length === total) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: lampu terakhir" : suara ? "Hebat!" : beres ? "Roket meluncur!" : `Mundur dari ${d.dari}`}
        teks={`Hitung mundur untuk meluncurkan roket. Mulai dari lampu ${sebut(d.dari)}. Ketuk lampu untuk memadamkannya, lalu sebut bilangannya. Setiap kali, ketuk lampu yang satu kurang. Berhenti di ${sebut(d.sampai)}.${akhir ? " Di akhir, ucapkan bilangan lampu yang terakhir padam." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex flex-col items-center rounded-3xl border-4 border-[#1C01A5] bg-[#E0F2FE] px-2 py-3">
          <div className={`transition-transform duration-700 ${beres ? "-translate-y-3" : ""}`}>
            <Roket nyala={beres} kelas="h-20 w-12" />
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">{beres ? "🚀 Meluncur!" : "Hitung mundur dulu, baru meluncur"}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          {Array.from({ length: total }, (_, i) => {
            const v = d.dari - i;
            const mati = padam.includes(v);
            return (
              <button
                key={`${v}-${goyang === v ? "x" : "o"}`}
                type="button"
                aria-label={`Lampu ${v}, ${mati ? "sudah padam" : "menyala"}`}
                onClick={() => ketuk(v)}
                className={`igil-tanpa-tepi rounded-2xl ${goyang === v ? "igil-goyang" : ""}`}
              >
                <Lampu n={v} nyala={!mati} kelas="h-16 w-14" />
              </button>
            );
          })}
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]">
          Hitungan mundur:{" "}
          {padam.length === 0
            ? "..."
            : padam.map((v, i) => (
                <span key={v}>
                  {i > 0 ? ", " : ""}
                  {akhir && beres && !suara && i === padam.length - 1 ? "?" : v}
                </span>
              ))}
        </p>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahRoket({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Roket Hitung Mundur"
      warna="#BFDBFE"
      petunjuk="Hitung mundur dimulai dari bilangan yang paling besar, lalu satu kurang setiap kali. Ketuk lampu untuk memadamkannya sambil menyebut bilangannya. Setelah semua lampu padam, roket meluncur. Pada ronde terakhir, ucapkan bilangan lampu yang terakhir padam."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-roket"
      jumlahRonde={RONDE_ROKET.length}
      kunciAkhir={RONDE_ROKET[RONDE_ROKET.length - 1].sampai}
      belumSiap="Padamkan semua lampu dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRoket ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Susun Es Krim ------------------------------------- */

const RONDE_ESKRIM: { arah: Arah; acak: number[] }[] = [
  { arah: "maju", acak: [17, 15, 19, 16, 18] },
  { arah: "mundur", acak: [11, 14, 10, 13, 12] },
  { arah: "mundur", acak: [17, 20, 16, 18, 19] },
];

const urutBenar = (acak: number[], arah: Arah) => acak.slice().sort((a, b) => (arah === "maju" ? a - b : b - a));
const samaUrut = (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => v === b[i]);

function RondeEsKrim({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_ESKRIM[ronde];
  const akhir = ronde === RONDE_ESKRIM.length - 1;
  const target = urutBenar(d.acak, d.arah);
  const [baris, setBaris] = useState<number[]>(d.acak);
  const [pilih, setPilih] = useState<number | null>(null);
  const [tukar, setTukar] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = samaUrut(baris, target);
  const suara = panel.suara["b5-eskrim"] === true && akhir;
  useBicara(akhir ? suara : beres, `${rangkai(baris)}. Es krim sudah berurutan ${d.arah === "maju" ? "maju" : "mundur"}, langkahnya sama, satu demi satu.`);

  const ketuk = (i: number) => {
    if (beres) return;
    if (pilih === null) {
      setPilih(i);
      ucap(sebut(baris[i]));
      return;
    }
    if (pilih === i) {
      setPilih(null);
      return;
    }
    const baru = baris.slice();
    [baru[pilih], baru[i]] = [baru[i], baru[pilih]];
    setBaris(baru);
    setPilih(null);
    const t = tukar + 1;
    setTukar(t);
    if (samaUrut(baru, target)) {
      setKabar(null);
      letusan.picu();
      onBeres();
    } else if (t >= 5) {
      setKabar({
        teks:
          d.arah === "maju"
            ? "Cari es krim dengan bilangan paling kecil, taruh di paling kiri. Lalu cari yang satu lebih besar."
            : "Cari es krim dengan bilangan paling besar, taruh di paling kiri. Lalu cari yang satu lebih kecil.",
        ok: false,
      });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling kanan" : suara ? "Hebat!" : beres ? "Es krimnya berurutan!" : d.arah === "maju" ? "Susun: maju" : "Susun: mundur"}
        teks={`Susun es krim sesuai urutan menghitung ${d.arah === "maju" ? "maju. Mulai dari bilangan paling kecil di kiri, sampai bilangan paling besar di kanan" : "mundur. Mulai dari bilangan paling besar di kiri, sampai bilangan paling kecil di kanan"}. Ketuk satu es krim, lalu ketuk es krim lain untuk bertukar tempat.${akhir ? " Setelah berurutan, ucapkan bilangan es krim yang paling kanan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">
          {d.arah === "maju" ? "➡️ Maju: kecil di kiri, besar di kanan" : "⬅️ Mundur: besar di kiri, kecil di kanan"}
        </p>
        <div className="flex items-end justify-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-1 py-3">
          {baris.map((v, i) => (
            <button
              key={`${v}`}
              type="button"
              aria-label={`Es krim bilangan ${v}, tempat ke-${i + 1}${pilih === i ? ", terpilih" : ""}`}
              onClick={() => ketuk(i)}
              style={letakMeja(i)}
              className={`rounded-2xl px-0.5 ${pilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${beres ? "igil-muncul" : ""}`}
            >
              <EsKrim n={v} kelas="h-24 w-[3.7rem]" />
            </button>
          ))}
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]/80">Tukar tempat: {tukar} kali</p>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {baris.join(" → ")}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahEsKrim({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_ESKRIM[RONDE_ESKRIM.length - 1];
  const target = urutBenar(terakhir.acak, terakhir.arah);
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Es Krim"
      warna="#FBCFE8"
      petunjuk="Susun es krim berurutan. Kalau menghitung maju, bilangan paling kecil di kiri. Kalau menghitung mundur, bilangan paling besar di kiri. Ketuk satu es krim, lalu ketuk es krim lain untuk bertukar tempat. Pada ronde terakhir, ucapkan bilangan es krim yang paling kanan."
      speakGuru={speakGuru}
      panel={panel}
      id="b5-eskrim"
      jumlahRonde={RONDE_ESKRIM.length}
      kunciAkhir={target[target.length - 1]}
      belumSiap="Susun es krimnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeEsKrim ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}