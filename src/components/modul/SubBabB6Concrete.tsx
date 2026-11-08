"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { Kelereng, Pensil, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { IkatPensil } from "./nilai-c5-dasar";
import { Donat } from "./selisih-a6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab B, Tahap 4 Concrete: benda nyata. Anak menghitung maju dari  */
/* donat, menggenapkan bingkai sepuluh, menggabungkan pensil lepas, dan       */
/* memisahkan satu kelereng supaya dua baris kembar.                         */
/*  1 Gabung Donat (hitung maju dari bilangan pertama)                        */
/*  2 Isi Bingkai Sepuluh (seret donat sampai bingkai penuh)                  */
/*  3 Ikat dan Gabung Pensil (seret pensil lepas, jumlahkan satuan)           */
/*  4 Kembar Kelereng (seret satu kelereng, dua baris jadi kembar)            */
/* ------------------------------------------------------------------------ */

const gabungSuara = (a: number, b: number) => `${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(a + b)}`;

/* --------- Permainan 1. Gabung Donat -------------------------------------- */

const RONDE_MAJU: { a: number; b: number }[] = [
  { a: 6, b: 5 },
  { a: 7, b: 6 },
  { a: 8, b: 7 },
];

function RondeMaju({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_MAJU[ronde];
  const akhir = ronde === RONDE_MAJU.length - 1;
  const jumlah = a + b;
  const [urutan, setUrutan] = useState<(number | null)[]>(() => Array.from({ length: b }, () => null));
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const dihitung = urutan.filter((v) => v !== null).length;
  const semua = dihitung === b;
  const suara = panel.suara["b6-maju"] === true && akhir;
  useBicara(akhir ? suara : beres, `${gabungSuara(a, b)}. Kita mulai dari ${sebut(a)}, lalu menghitung maju ${sebut(b)} kali.`);

  const ketuk = (i: number) => {
    if (urutan[i] !== null) {
      ucap("Donat ini sudah dihitung. Pilih donat yang lain.");
      return;
    }
    if (semua) return;
    const baru = urutan.slice();
    baru[i] = dihitung + 1;
    setUrutan(baru);
    setKabar(null);
    ucap(sebut(a + dihitung + 1));
  };

  const pilih = (v: number) => {
    if (!semua || beres) return;
    if (v === jumlah) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: `Mulai dari ${sebut(a)}, lalu hitung maju sebanyak donat Tika. Bilangan terakhir yang kamu sebut adalah jumlahnya.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlahnya" : suara ? "Hebat!" : beres ? "Hitunganmu tepat!" : semua ? "Berapa jumlahnya?" : `Mulai dari ${a}, ketuk donat`}
        teks={`Donat Ibu ada ${sebut(a)}. Kita tidak menghitungnya lagi. Mulai dari ${sebut(a)}, lalu ketuk donat Tika satu per satu sambil menyebut bilangan berikutnya.${akhir ? " Di akhir, ucapkan jumlah semua donat." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Donat Ibu • sudah dihitung: {a}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 text-3xl font-black text-[#1C01A5]">{a}</span>
            <span className="flex flex-wrap items-center justify-center gap-0.5" role="img" aria-label={`${a} donat Ibu`}>
              {Array.from({ length: a }, (_, i) => (
                <Donat key={i} kelas="h-6 w-6" />
              ))}
            </span>
          </div>
        </div>
        <div className="space-y-1 rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Donat Tika • ketuk satu per satu</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {urutan.map((v, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Donat Tika ke-${i + 1}${v !== null ? `, sudah dihitung, bilangan ${a + v}` : ""}`}
                onClick={() => ketuk(i)}
                className="relative rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${v !== null ? "bg-[#E8F7EE] ring-4 ring-[#7FCB96]" : ""}`}>
                  <Donat coklat kelas="h-10 w-10" />
                </span>
                {v !== null ? (
                  <span className="absolute -right-1 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-0.5 text-xs font-black text-[#1C01A5]">
                    {a + v}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Dihitung maju: {dihitung} dari {b}
        </p>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {a} + {b} = ?
            </p>
            <PilihAngka opsi={opsiSekitar(jumlah)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} + ${b} = ?` : `${a} + ${b} = ${jumlah}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahMaju({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_MAJU[RONDE_MAJU.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Gabung Donat"
      warna="#FBCFE8"
      petunjuk="Menghitung maju. Donat Ibu tidak dihitung lagi, kita mulai dari bilangannya. Ketuk donat Tika satu per satu sambil menyebut bilangan berikutnya. Lalu pilih jumlahnya. Pada ronde terakhir, ucapkan jumlah semua donat."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-maju"
      jumlahRonde={RONDE_MAJU.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Hitung maju dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeMaju ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Isi Bingkai Sepuluh ------------------------------- */

const RONDE_BINGKAI: { a: number; b: number }[] = [
  { a: 7, b: 6 },
  { a: 8, b: 7 },
  { a: 9, b: 8 },
];

function RondeBingkai({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_BINGKAI[ronde];
  const akhir = ronde === RONDE_BINGKAI.length - 1;
  const kosong = 10 - a;
  const sisa = b - kosong;
  const jumlah = a + b;
  const [slot, setSlot] = useState<(number | null)[]>(() => Array.from({ length: kosong }, () => null));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = slot.every((v) => v !== null);
  const tray = Array.from({ length: b }, (_, i) => i).filter((i) => !slot.includes(i));
  const suara = panel.suara["b6-bingkai"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(a)} membutuhkan ${sebut(kosong)} untuk menjadi sepuluh. Sisanya ${sebut(sisa)}. Sepuluh ditambah ${sebut(sisa)} sama dengan ${sebut(jumlah)}. Jadi ${gabungSuara(a, b)}.`
  );

  const taruh = (item: number, k: number) => {
    if (slot[k] !== null || slot.includes(item) || penuh) return;
    const baru = slot.slice();
    baru[k] = item;
    setSlot(baru);
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(a + baru.filter((v) => v !== null).length));
  };

  const pilih = (v: number) => {
    if (!penuh || beres) return;
    const benar = tahap === 0 ? sisa : jumlah;
    if (v === benar) {
      setSalah(null);
      setKabar(null);
      if (tahap === 0) {
        setTahap(1);
      } else {
        setBeres(true);
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(v);
      setKabar({
        teks: tahap === 0 ? "Hitung donat Tika yang masih ada di luar bingkai. Itulah sisanya." : "Bingkai penuh berisi sepuluh. Tambahkan sepuluh dengan donat yang masih di luar bingkai.",
        ok: false,
      });
    }
  };

  const sel = (k: number) => {
    if (k < a) {
      return (
        <span key={k} className="flex h-12 items-center justify-center border-2 border-[#1C01A5]/40 bg-white">
          <Donat kelas="h-9 w-9" />
        </span>
      );
    }
    const j = k - a;
    return (
      <button
        key={k}
        type="button"
        data-zona={`b6-sel-${j}`}
        aria-label={`Kotak kosong ${j + 1} di bingkai sepuluh${slot[j] !== null ? ", sudah berisi donat" : ""}`}
        onClick={() => {
          if (slot[j] === null && terpilih !== null) taruh(terpilih, j);
          else if (slot[j] === null && !penuh) setKabar({ teks: "Pilih dulu satu donat Tika di bawah, lalu ketuk kotak kosongnya.", ok: false });
        }}
        className={`flex h-12 items-center justify-center border-2 ${slot[j] === null ? "border-dashed border-[#1C01A5]/60 bg-[#FFFDF2]" : "border-solid border-[#7FCB96] bg-[#E8F7EE]"}`}
      >
        {slot[j] !== null ? <Donat coklat kelas="h-9 w-9" /> : null}
      </button>
    );
  };

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: jumlahnya"
            : suara
              ? "Hebat!"
              : beres
                ? "Bingkaimu penuh!"
                : penuh
                  ? tahap === 0
                    ? "Berapa sisanya?"
                    : "Sepuluh ditambah sisa"
                  : "Isi bingkai sampai sepuluh"
        }
        teks={`Bingkai sepuluh sudah berisi ${sebut(a)} donat Ibu. Seret donat Tika ke kotak kosong sampai bingkai penuh, yaitu sepuluh. Lalu lihat donat yang masih tersisa di luar bingkai.${akhir ? " Di akhir, ucapkan jumlah semua donat." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <p className="pb-1 text-center text-sm font-black text-[#1C01A5]">Bingkai sepuluh • terisi {a + slot.filter((v) => v !== null).length}</p>
          <div className="mx-auto grid max-w-[300px] grid-cols-5 border-2 border-[#1C01A5]">{Array.from({ length: 10 }, (_, k) => sel(k))}</div>
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Donat Tika</p>
          <div className="flex min-h-[52px] flex-wrap items-center justify-center gap-1.5 pt-1">
            {tray.map((i) => (
              <BendaSeret
                key={i}
                id={`d${i}`}
                label={`Donat Tika ke-${i + 1}`}
                aktif={!penuh}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("b6-sel-")) taruh(i, Number(z.slice(7)));
                }}
                gaya={letakMeja(i)}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${penuh ? "ring-4 ring-[#F0AB00]" : ""}`}>
                  <Donat coklat kelas="h-10 w-10" />
                </span>
              </BendaSeret>
            ))}
            {tray.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">semua sudah di bingkai</span> : null}
          </div>
        </div>
        {penuh && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              {tahap === 0 ? "Berapa donat yang masih di luar bingkai?" : `10 + ${sisa} = ?`}
            </p>
            <PilihAngka opsi={opsiSekitar(tahap === 0 ? sisa : jumlah)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} + ${b} = 10 + ${sisa} = ?` : `${a} + ${b} = 10 + ${sisa} = ${jumlah}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBingkai({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_BINGKAI[RONDE_BINGKAI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Bingkai Sepuluh"
      warna="#FED7AA"
      petunjuk="Menghitung dengan sepuluh. Bingkai sudah berisi donat Ibu. Seret donat Tika ke kotak kosong sampai bingkai penuh. Pilih berapa donat yang tersisa di luar bingkai, lalu pilih sepuluh ditambah sisa. Pada ronde terakhir, ucapkan jumlah semua donat."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-bingkai"
      jumlahRonde={RONDE_BINGKAI.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Isi bingkai dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBingkai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Ikat dan Gabung Pensil ---------------------------- */

const RONDE_PENSIL: { upe: number; malosi: number }[] = [
  { upe: 12, malosi: 3 },
  { upe: 13, malosi: 4 },
  { upe: 15, malosi: 4 },
];

function RondePensil({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { upe, malosi } = RONDE_PENSIL[ronde];
  const akhir = ronde === RONDE_PENSIL.length - 1;
  const lepasUpe = upe - 10;
  const lepas = lepasUpe + malosi;
  const jumlah = upe + malosi;
  const [pindah, setPindah] = useState<boolean[]>(() => Array.from({ length: malosi }, () => false));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const banyakPindah = pindah.filter(Boolean).length;
  const semua = banyakPindah === malosi;
  const suara = panel.suara["b6-pensil"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(upe)} pensil Upe terdiri dari satu ikat sepuluh dan ${sebut(lepasUpe)} pensil lepas. Pensil lepas ditambah ${sebut(malosi)} sama dengan ${sebut(lepas)}. Sepuluh ditambah ${sebut(lepas)} sama dengan ${sebut(jumlah)}. Jadi ${gabungSuara(upe, malosi)}.`
  );

  const gabung = (i: number) => {
    if (pindah[i] || semua) return;
    const baru = pindah.slice();
    baru[i] = true;
    setPindah(baru);
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(lepasUpe + baru.filter(Boolean).length));
  };

  const pilih = (v: number) => {
    if (!semua || beres) return;
    const benar = tahap === 0 ? lepas : jumlah;
    if (v === benar) {
      setSalah(null);
      setKabar(null);
      if (tahap === 0) {
        setTahap(1);
      } else {
        setBeres(true);
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(v);
      setKabar({
        teks:
          tahap === 0
            ? `Satuan ditambah satuan dulu. Pensil lepas Upe ${sebut(lepasUpe)}, ditambah pensil Malosi ${sebut(malosi)}.`
            : `Satu ikat bernilai sepuluh. Tambahkan sepuluh dengan ${sebut(lepas)} pensil lepas.`,
        ok: false,
      });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: jumlahnya"
            : suara
              ? "Hebat!"
              : beres
                ? "Pensilmu lengkap!"
                : semua
                  ? tahap === 0
                    ? "Berapa pensil lepas?"
                    : "Satu ikat ditambah lepas"
                  : "Gabung pensil lepas"
        }
        teks={`Upe punya satu ikat sepuluh pensil dan ${sebut(lepasUpe)} pensil lepas. Malosi punya ${sebut(malosi)} pensil. Seret pensil Malosi ke pensil lepas Upe, atau ketuk pensilnya lalu ketuk tempatnya. Tambahkan satuan dengan satuan dulu.${akhir ? " Di akhir, ucapkan jumlah semua pensil." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <p className="pb-1 text-center text-sm font-black text-[#1C01A5]">Pensil Upe</p>
          <div className="flex items-end justify-center gap-3">
            <div className="text-center">
              <IkatPensil kelas="mx-auto h-20 w-[5.5rem]" />
              <p className="text-xs font-black text-[#1C01A5]">1 ikat = 10</p>
            </div>
            <button
              type="button"
              data-zona="b6-lepas"
              aria-label={`Tempat pensil lepas Upe, ada ${lepasUpe + banyakPindah}`}
              onClick={() => {
                if (terpilih !== null) gabung(terpilih);
                else if (!semua) setKabar({ teks: "Pilih dulu satu pensil Malosi di bawah, lalu ketuk tempat pensil lepas.", ok: false });
              }}
              className={`min-h-[84px] min-w-[7.5rem] rounded-2xl border-4 px-2 py-1 ${semua ? "border-solid border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/60 bg-[#FFFDF2]"}`}
            >
              <span className="flex flex-wrap items-end justify-center gap-0.5">
                {Array.from({ length: lepasUpe }, (_, i) => (
                  <Pensil key={`u${i}`} warna={1} kelas="h-14 w-4" />
                ))}
                {Array.from({ length: banyakPindah }, (_, i) => (
                  <span key={`m${i}`} className="igil-muncul">
                    <Pensil warna={4} kelas="h-14 w-4" />
                  </span>
                ))}
              </span>
              <span className="block pt-0.5 text-xs font-black text-[#1C01A5]">lepas: {lepasUpe + banyakPindah}</span>
            </button>
          </div>
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pensil Malosi</p>
          <div className="flex min-h-[76px] flex-wrap items-center justify-center gap-2 pt-1">
            {pindah.map((sudah, i) =>
              sudah ? null : (
                <BendaSeret
                  key={i}
                  id={`m${i}`}
                  label={`Pensil Malosi ke-${i + 1}`}
                  onKetuk={() => setTerpilih(i)}
                  onLepas={(_, x, y) => {
                    const z = zonaDi(x, y);
                    if (z === "b6-lepas") gabung(i);
                  }}
                  gaya={letakMeja(i)}
                  kelas="rounded-xl"
                >
                  <span className={`block rounded-xl p-1 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${semua ? "ring-4 ring-[#F0AB00]" : ""}`}>
                    <Pensil warna={4} kelas="h-16 w-5" />
                  </span>
                </BendaSeret>
              )
            )}
            {pindah.every(Boolean) ? <span className="text-sm font-black text-[#1C01A5]/60">semua sudah digabung</span> : null}
          </div>
        </div>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              {tahap === 0 ? "Berapa pensil lepas sekarang?" : `1 ikat (10) + ${lepas} lepas = ?`}
            </p>
            <PilihAngka opsi={opsiSekitar(tahap === 0 ? lepas : jumlah)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${upe} + ${malosi} = ?` : `${upe} + ${malosi} = ${jumlah}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPensil({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_PENSIL[RONDE_PENSIL.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Ikat dan Gabung Pensil"
      warna="#DDD6FE"
      petunjuk="Puluhan dengan satuan. Upe punya satu ikat sepuluh pensil dan beberapa pensil lepas. Seret pensil Malosi ke pensil lepas Upe. Tambahkan satuan dengan satuan dulu, lalu tambahkan sepuluh. Pada ronde terakhir, ucapkan jumlah semua pensil."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-pensil"
      jumlahRonde={RONDE_PENSIL.length}
      kunciAkhir={terakhir.upe + terakhir.malosi}
      belumSiap="Gabungkan pensil dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePensil ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kembar Kelereng ----------------------------------- */

const RONDE_KEMBAR: { a: number; b: number }[] = [
  { a: 8, b: 7 },
  { a: 6, b: 5 },
  { a: 7, b: 6 },
];

function RondeKembar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_KEMBAR[ronde];
  const akhir = ronde === RONDE_KEMBAR.length - 1;
  const kembar = b + b;
  const jumlah = a + b;
  const [dipisah, setDipisah] = useState<number | null>(null);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const sudahPisah = dipisah !== null;
  const suara = panel.suara["b6-kembar"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(a)} dipisah menjadi satu dan ${sebut(b)}. ${sebut(b)} ditambah ${sebut(b)} sama dengan ${sebut(kembar)}. ${sebut(kembar)} ditambah satu sama dengan ${sebut(jumlah)}. Jadi ${gabungSuara(a, b)}.`
  );

  const pisahkan = (i: number) => {
    if (sudahPisah) {
      setKabar({ teks: "Cukup satu kelereng yang dipisah. Sekarang kedua baris sudah sama panjang.", ok: false });
      return;
    }
    setDipisah(i);
    setTerpilih(null);
    setKabar(null);
    ucap("Satu kelereng dipisah. Sekarang dua baris sama panjang.");
  };

  const pilih = (v: number) => {
    if (!sudahPisah || beres) return;
    const benar = tahap === 0 ? kembar : jumlah;
    if (v === benar) {
      setSalah(null);
      setKabar(null);
      if (tahap === 0) {
        setTahap(1);
      } else {
        setBeres(true);
        letusan.picu();
        onBeres();
      }
    } else {
      setSalah(v);
      setKabar({
        teks: tahap === 0 ? `Dua baris sama-sama ${sebut(b)}. Hitung ${sebut(b)} ditambah ${sebut(b)}.` : `Tambahkan kembali satu kelereng yang tadi dipisah ke ${sebut(kembar)}.`,
        ok: false,
      });
    }
  };

  const barisA = Array.from({ length: a }, (_, i) => i).filter((i) => i !== dipisah);

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: jumlahnya"
            : suara
              ? "Hebat!"
              : beres
                ? "Kembarmu tepat!"
                : sudahPisah
                  ? tahap === 0
                    ? "Berapa dua baris kembar?"
                    : "Tambahkan yang dipisah"
                  : "Pisahkan satu kelereng"
        }
        teks={`Baris merah punya ${sebut(a)} kelereng dan baris biru punya ${sebut(b)} kelereng. Seret satu kelereng merah ke tempat pisah, supaya kedua baris sama panjang dan menjadi kembar. Lalu jumlahkan dua baris kembar itu, dan tambahkan kelereng yang dipisah.${akhir ? " Di akhir, ucapkan jumlah semua kelereng." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Baris merah</p>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-1">
            {barisA.map((i) => (
              <BendaSeret
                key={i}
                id={`k${i}`}
                label={`Kelereng merah ke-${i + 1}`}
                aktif={!sudahPisah}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z === "b6-pisah") pisahkan(i);
                }}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <Kelereng warna={0} kelas="h-9 w-9" />
                </span>
              </BendaSeret>
            ))}
          </div>
        </div>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Baris biru</p>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-1" role="img" aria-label={`${b} kelereng biru`}>
            {Array.from({ length: b }, (_, i) => (
              <span key={i} className="p-0.5" aria-hidden="true">
                <Kelereng warna={1} kelas="h-9 w-9" />
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          data-zona="b6-pisah"
          aria-label={`Tempat pisah${sudahPisah ? ", berisi satu kelereng" : ", kosong"}`}
          onClick={() => {
            if (terpilih !== null) pisahkan(terpilih);
            else if (!sudahPisah) setKabar({ teks: "Pilih dulu satu kelereng merah, lalu ketuk tempat pisah.", ok: false });
          }}
          className={`mx-auto flex min-h-[58px] w-40 items-center justify-center gap-2 rounded-2xl border-4 px-2 ${
            sudahPisah ? "border-solid border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5] bg-[#FFF7CC]"
          }`}
        >
          {sudahPisah ? <Kelereng warna={0} kelas="h-9 w-9" /> : null}
          <span className="text-sm font-black text-[#1C01A5]">{sudahPisah ? "dipisah: 1" : "tempat pisah"}</span>
        </button>
        {sudahPisah && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              {tahap === 0 ? `${b} + ${b} = ?` : `${kembar} + 1 = ?`}
            </p>
            <PilihAngka opsi={opsiSekitar(tahap === 0 ? kembar : jumlah)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} + ${b} = ${kembar} + 1 = ?` : `${a} + ${b} = ${kembar} + 1 = ${jumlah}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKembar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KEMBAR[RONDE_KEMBAR.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kembar Kelereng"
      warna="#BFDBFE"
      petunjuk="Penjumlahan berulang. Baris merah lebih panjang satu dari baris biru. Seret satu kelereng merah ke tempat pisah supaya kedua baris kembar. Jumlahkan dua baris kembar, lalu tambahkan satu kelereng yang dipisah. Pada ronde terakhir, ucapkan jumlah semua kelereng."
      speakGuru={speakGuru}
      panel={panel}
      id="b6-kembar"
      jumlahRonde={RONDE_KEMBAR.length}
      kunciAkhir={terakhir.a + terakhir.b}
      belumSiap="Pisahkan kelereng dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKembar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
