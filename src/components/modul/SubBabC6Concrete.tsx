"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { KumpulanBenda } from "./perbandingan-d5-dasar";
import { Apel, Bolu } from "./kurang-c6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab C, Tahap 4 Concrete: benda nyata. Anak menghitung mundur     */
/* dari apel yang dimakan ulat, memindahkan bolu lepas dari kotak sepuluh,    */
/* mengembalikan apel untuk memeriksa hasil, dan menaruh kartu angka pada     */
/* kelompok benda menurut perannya.                                           */
/*  1 Apel Dimakan Ulat (ketuk, hitung mundur)                                */
/*  2 Kotak Bolu Kukus (seret bolu lepas, puluhan tetap)                      */
/*  3 Kembalikan Apel (seret apel kembali, cek dengan menambah)               */
/*  4 Kartu Peran Bilangan (seret kartu angka ke kelompok benda)              */
/* ------------------------------------------------------------------------ */

const kurangSuara = (a: number, b: number) => `${sebut(a)} dikurangi ${sebut(b)} sama dengan ${sebut(a - b)}`;

/* --------- Permainan 1. Apel Dimakan Ulat --------------------------------- */

const RONDE_ULAT: { a: number; b: number }[] = [
  { a: 15, b: 3 },
  { a: 17, b: 4 },
  { a: 16, b: 5 },
];

function RondeUlat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_ULAT[ronde];
  const akhir = ronde === RONDE_ULAT.length - 1;
  const sisa = a - b;
  const [dimakan, setDimakan] = useState<boolean[]>(() => Array.from({ length: a }, () => false));
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const banyak = dimakan.filter(Boolean).length;
  const cukup = banyak === b;
  const suara = panel.suara["c6-ulat"] === true && akhir;
  useBicara(akhir ? suara : beres, `${kurangSuara(a, b)}. Kita menghitung mundur dari ${sebut(a)}.`);

  const ketuk = (i: number) => {
    if (dimakan[i]) {
      ucap("Apel ini sudah dimakan ulat. Pilih apel yang lain.");
      return;
    }
    if (cukup) {
      setKabar({ teks: `Ulat hanya memakan ${sebut(b)} apel. Sekarang hitung sisa apel yang masih bagus.`, ok: false });
      return;
    }
    const baru = dimakan.slice();
    baru[i] = true;
    setDimakan(baru);
    setKabar(null);
    ucap(sebut(a - (banyak + 1)));
  };

  const pilih = (v: number) => {
    if (!cukup || beres) return;
    if (v === sisa) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: `Mulai dari ${sebut(a)}, hitung mundur sebanyak apel yang dimakan ulat. Bilangan terakhir adalah sisanya.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Sisamu tepat!" : cukup ? "Berapa sisanya?" : `Ulat makan ${b} apel`}
        teks={`Tika punya ${sebut(a)} apel. Ulat memakan ${sebut(b)} apel. Ketuk ${sebut(b)} apel yang dimakan ulat, sambil mendengar bilangan yang menghitung mundur. Lalu pilih sisa apel yang masih bagus.${akhir ? " Di akhir, ucapkan sisa apel." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Apel Tika • dimakan ulat: {banyak} dari {b}</p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {dimakan.map((s, i) => (
              <button key={i} type="button" aria-label={`Apel ke-${i + 1}${s ? ", sudah dimakan ulat" : ""}`} onClick={() => ketuk(i)} className="rounded-full">
                <span className={`block rounded-full p-0.5 ${s ? "bg-[#FEF3C7] ring-4 ring-[#F0AB00]" : ""}`}>
                  <Apel gigit={s} kelas="h-10 w-10" />
                </span>
              </button>
            ))}
          </div>
        </div>
        {cukup && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {a} – {b} = ?
            </p>
            <PilihAngka opsi={opsiSekitar(sisa)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} – ${b} = ?` : `${a} – ${b} = ${sisa}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahUlat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_ULAT[RONDE_ULAT.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Apel Dimakan Ulat"
      warna="#FECACA"
      petunjuk="Menghitung mundur. Ketuk apel yang dimakan ulat, sebanyak yang diminta, sambil mendengar bilangan yang menghitung mundur. Lalu pilih sisa apel yang masih bagus. Pada ronde terakhir, ucapkan sisa apel."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-ulat"
      jumlahRonde={RONDE_ULAT.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Ketuk apelnya dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeUlat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Kotak Bolu Kukus ---------------------------------- */

const RONDE_KOTAK: { a: number; b: number }[] = [
  { a: 13, b: 2 },
  { a: 18, b: 4 },
  { a: 19, b: 6 },
];

function RondeKotak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_KOTAK[ronde];
  const akhir = ronde === RONDE_KOTAK.length - 1;
  const lepas = a - 10;
  const sisaLepas = lepas - b;
  const hasil = a - b;
  const [makan, setMakan] = useState<boolean[]>(() => Array.from({ length: lepas }, () => false));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const banyak = makan.filter(Boolean).length;
  const cukup = banyak === b;
  const suara = panel.suara["c6-kotak"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(a)} adalah satu kotak sepuluh dan ${sebut(lepas)} bolu lepas. Malosi memakan ${sebut(b)} bolu lepas, tinggal ${sebut(sisaLepas)}. Sepuluh ditambah ${sebut(sisaLepas)} sama dengan ${sebut(hasil)}. Jadi ${kurangSuara(a, b)}.`
  );

  const perut = (i: number) => {
    if (makan[i]) return;
    if (cukup) {
      setKabar({ teks: `Malosi hanya memakan ${sebut(b)} bolu kukus. Sekarang hitung sisanya.`, ok: false });
      setTerpilih(null);
      return;
    }
    const baru = makan.slice();
    baru[i] = true;
    setMakan(baru);
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(lepas - (banyak + 1)));
  };

  const pilih = (v: number) => {
    if (!cukup || beres) return;
    const benar = tahap === 0 ? sisaLepas : hasil;
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
            ? `Hitung bolu lepas yang masih ada. Bolu lepas ${sebut(lepas)} dikurangi ${sebut(b)} yang dimakan.`
            : `Satu kotak bernilai sepuluh. Tambahkan sepuluh dengan ${sebut(sisaLepas)} bolu lepas yang tersisa.`,
        ok: false,
      });
    }
  };

  const tray = makan.map((s, i) => (s ? -1 : i)).filter((i) => i >= 0);

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: sisanya"
            : suara
              ? "Hebat!"
              : beres
                ? "Kotakmu tepat!"
                : cukup
                  ? tahap === 0
                    ? "Berapa bolu lepas tersisa?"
                    : "Sepuluh ditambah sisa"
                  : `Malosi makan ${b} bolu`
        }
        teks={`Ibu punya satu kotak berisi sepuluh bolu kukus dan ${sebut(lepas)} bolu lepas. Malosi memakan ${sebut(b)} bolu lepas. Seret ${sebut(b)} bolu lepas ke perut Malosi, atau ketuk bolunya lalu ketuk perut Malosi. Kotak sepuluh tidak disentuh.${akhir ? " Di akhir, ucapkan sisa bolu kukus." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <p className="pb-1 text-center text-sm font-black text-[#1C01A5]">Bolu kukus Ibu</p>
          <div className="flex items-end justify-center gap-3">
            <div className="text-center">
              <div className="grid grid-cols-5 gap-0.5 rounded-xl border-4 border-[#A8672D] bg-[#FDE9C4] p-1" role="img" aria-label="Satu kotak berisi sepuluh bolu kukus">
                {Array.from({ length: 10 }, (_, i) => (
                  <Bolu key={i} kelas="h-7 w-7" />
                ))}
              </div>
              <p className="text-xs font-black text-[#1C01A5]">1 kotak = 10</p>
            </div>
            <div className="text-center">
              <div className="flex min-h-[60px] min-w-[5rem] flex-wrap items-end justify-center gap-0.5" role="img" aria-label={`${lepas - banyak} bolu lepas`}>
                {Array.from({ length: lepas - banyak }, (_, i) => (
                  <Bolu key={i} kelas="h-8 w-8" />
                ))}
              </div>
              <p className="text-xs font-black text-[#1C01A5]">lepas: {lepas - banyak}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Bolu lepas • seret ke perut Malosi</p>
          <div className="flex min-h-[52px] flex-wrap items-center justify-center gap-1.5 pt-1">
            {tray.map((i) => (
              <BendaSeret
                key={i}
                id={`bl${i}`}
                label={`Bolu lepas ke-${i + 1}`}
                aktif={!cukup}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "c6-perut") perut(i);
                }}
                gaya={letakMeja(i)}
                kelas="rounded-xl"
              >
                <span className={`block rounded-xl p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <Bolu kelas="h-11 w-11" />
                </span>
              </BendaSeret>
            ))}
            {tray.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">semua bolu lepas sudah dimakan</span> : null}
          </div>
        </div>
        <button
          type="button"
          data-zona="c6-perut"
          aria-label={`Perut Malosi, sudah makan ${banyak} bolu`}
          onClick={() => {
            if (terpilih !== null) perut(terpilih);
            else if (!cukup) setKabar({ teks: "Pilih dulu satu bolu lepas, lalu ketuk perut Malosi.", ok: false });
          }}
          className={`mx-auto flex min-h-[56px] w-48 items-center justify-center gap-1 rounded-2xl border-4 px-2 ${cukup ? "border-solid border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5] bg-[#FFF7CC]"}`}
        >
          <span className="text-2xl" aria-hidden="true">
            😋
          </span>
          <span className="text-sm font-black text-[#1C01A5]">
            perut Malosi: {banyak} dari {b}
          </span>
        </button>
        {cukup && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">{tahap === 0 ? "Berapa bolu lepas yang tersisa?" : `10 + ${sisaLepas} = ?`}</p>
            <PilihAngka opsi={opsiSekitar(tahap === 0 ? sisaLepas : hasil)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${a} – ${b} = 10 + ${sisaLepas} = ?` : `${a} – ${b} = 10 + ${sisaLepas} = ${hasil}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKotak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KOTAK[RONDE_KOTAK.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kotak Bolu Kukus"
      warna="#FBCFE8"
      petunjuk="Pengurangan puluhan dengan satuan. Ibu punya satu kotak sepuluh bolu kukus dan beberapa bolu lepas. Seret bolu lepas ke perut Malosi sebanyak yang dimakan. Kotak sepuluh tidak disentuh. Pilih bolu lepas yang tersisa, lalu pilih sepuluh ditambah sisa. Pada ronde terakhir, ucapkan sisa bolu kukus."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-kotak"
      jumlahRonde={RONDE_KOTAK.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Pindahkan bolunya dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKotak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Kembalikan Apel ----------------------------------- */

const RONDE_KEMBALI: { sisa: number; b: number }[] = [
  { sisa: 12, b: 3 },
  { sisa: 13, b: 4 },
  { sisa: 11, b: 5 },
];

function RondeKembali({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { sisa, b } = RONDE_KEMBALI[ronde];
  const akhir = ronde === RONDE_KEMBALI.length - 1;
  const a = sisa + b;
  const [balik, setBalik] = useState<boolean[]>(() => Array.from({ length: b }, () => false));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const banyak = balik.filter(Boolean).length;
  const semua = banyak === b;
  const suara = panel.suara["c6-kembali"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${sebut(sisa)} ditambah ${sebut(b)} sama dengan ${sebut(a)}. Jadi mula-mula ada ${sebut(a)} apel, dan ${kurangSuara(a, b)}. Penjumlahan memeriksa pengurangan.`
  );

  const kembalikan = (i: number) => {
    if (balik[i] || semua) return;
    const baru = balik.slice();
    baru[i] = true;
    setBalik(baru);
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(sisa + banyak + 1));
  };

  const pilih = (v: number) => {
    if (!semua || beres) return;
    if (v === a) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: `Sekarang keranjang berisi sisa ${sebut(sisa)} ditambah ${sebut(b)} apel yang dikembalikan. Hitung semuanya.`, ok: false });
    }
  };

  const tray = balik.map((s, i) => (s ? -1 : i)).filter((i) => i >= 0);

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: mula-mula" : suara ? "Hebat!" : beres ? "Pemeriksaanmu tepat!" : semua ? "Mula-mula ada berapa?" : "Kembalikan apelnya"}
        teks={`Keranjang Tika berisi sisa ${sebut(sisa)} apel. Ulat memakan ${sebut(b)} apel. Seret apel yang dimakan ulat kembali ke keranjang, atau ketuk apelnya lalu ketuk keranjang. Lalu hitung, mula-mula ada berapa apel.${akhir ? " Di akhir, ucapkan banyak apel mula-mula." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <button
          type="button"
          data-zona="c6-keranjang"
          aria-label={`Keranjang Tika, berisi ${sisa + banyak} apel`}
          onClick={() => {
            if (terpilih !== null) kembalikan(terpilih);
            else if (!semua) setKabar({ teks: "Pilih dulu satu apel yang dimakan ulat, lalu ketuk keranjang.", ok: false });
          }}
          className={`block w-full space-y-1 rounded-2xl border-4 bg-white px-1.5 py-2 ${semua ? "border-solid border-[#7FCB96]" : "border-dashed border-[#1C01A5]"}`}
        >
          <span className="block text-center text-sm font-black text-[#1C01A5]">Keranjang Tika • isi sekarang: {sisa + banyak}</span>
          <span className="flex flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: sisa }, (_, i) => (
              <Apel key={`s${i}`} kelas="h-8 w-8" />
            ))}
            {Array.from({ length: banyak }, (_, i) => (
              <span key={`b${i}`} className="igil-muncul rounded-full bg-[#FFF7CC] ring-2 ring-[#F0AB00]">
                <Apel kelas="h-8 w-8" />
              </span>
            ))}
          </span>
        </button>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Apel yang dimakan ulat • seret ke keranjang</p>
          <div className="flex min-h-[56px] flex-wrap items-center justify-center gap-1.5 pt-1">
            {tray.map((i) => (
              <BendaSeret
                key={i}
                id={`ap${i}`}
                label={`Apel dimakan ulat ke-${i + 1}`}
                aktif={!semua}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "c6-keranjang") kembalikan(i);
                }}
                gaya={letakMeja(i)}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <Apel gigit kelas="h-11 w-11" />
                </span>
              </BendaSeret>
            ))}
            {tray.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">semua apel sudah kembali</span> : null}
          </div>
        </div>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              {sisa} + {b} = ? Mula-mula ada berapa apel?
            </p>
            <PilihAngka opsi={opsiSekitar(a)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `? – ${b} = ${sisa}, karena ${sisa} + ${b} = ?` : `${a} – ${b} = ${sisa}, karena ${sisa} + ${b} = ${a}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKembali({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KEMBALI[RONDE_KEMBALI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kembalikan Apel"
      warna="#BBF7D0"
      petunjuk="Memeriksa pengurangan dengan penjumlahan. Keranjang berisi sisa apel. Seret apel yang dimakan ulat kembali ke keranjang, lalu pilih berapa apel mula-mula. Pada ronde terakhir, ucapkan banyak apel mula-mula."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-kembali"
      jumlahRonde={RONDE_KEMBALI.length}
      kunciAkhir={terakhir.sisa + terakhir.b}
      belumSiap="Kembalikan apelnya dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKembali ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kartu Peran Bilangan ------------------------------ */

type RondePeran = { a: number; b: number; ikon: string; benda: string; urutan: number[] };

const RONDE_PERAN: RondePeran[] = [
  { a: 15, b: 3, ikon: "🍎", benda: "apel", urutan: [12, 3, 15] },
  { a: 13, b: 2, ikon: "🧁", benda: "bolu kukus", urutan: [2, 11, 13] },
  { a: 18, b: 5, ikon: "✏️", benda: "pensil", urutan: [13, 18, 5] },
];

const PERAN = ["Mula-mula", "Diambil", "Sisa"];

function RondePeranBilangan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_PERAN[ronde];
  const akhir = ronde === RONDE_PERAN.length - 1;
  const sisa = d.a - d.b;
  const nilai = [d.a, d.b, sisa];
  const [terpasang, setTerpasang] = useState<(number | null)[]>([null, null, null]);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terpasang.every((v) => v !== null);
  const suara = panel.suara["c6-peran"] === true && akhir;
  useBicara(akhir ? suara : beres, `Mula-mula ada ${sebut(d.a)} ${d.benda}. Diambil ${sebut(d.b)}. Sisanya ${sebut(sisa)}. Jadi ${kurangSuara(d.a, d.b)}.`);

  const taruh = (kartu: number, k: number) => {
    if (terpasang[k] !== null || terpasang.includes(kartu) || beres) return;
    if (nilai[k] !== kartu) {
      setGoyang(k);
      setTerpilih(null);
      setKabar({ teks: `Hitung dulu ${d.benda} di kelompok ${PERAN[k].toLowerCase()}. Kartu angkanya harus sama dengan banyak ${d.benda}.`, ok: false });
      return;
    }
    const baru = terpasang.slice();
    baru[k] = kartu;
    setTerpasang(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`${PERAN[k]}: ${sebut(kartu)}.`);
    if (baru.every((v) => v !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  const kartuSisa = d.urutan.filter((n) => !terpasang.includes(n));
  const jumlahIkon = [d.a, d.b, sisa];

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: sisanya" : suara ? "Hebat!" : beres ? "Perannya tepat!" : "Pasang kartu angka"}
        teks={`Ada tiga kelompok ${d.benda}: mula-mula, diambil, dan sisa. Hitung ${d.benda} di setiap kelompok. Lalu seret kartu angka ke kelompok yang cocok, atau ketuk kartunya lalu ketuk kelompoknya.${akhir ? " Di akhir, ucapkan banyak sisa." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-3 gap-1.5">
          {PERAN.map((nama, k) => (
            <button
              key={`${k}-${goyang === k ? "x" : "o"}`}
              type="button"
              data-zona={`c6-peran-${k}`}
              aria-label={`Kelompok ${nama.toLowerCase()}${terpasang[k] !== null ? `, kartu ${terpasang[k]}` : ""}`}
              onClick={() => {
                if (terpasang[k] !== null) return;
                if (terpilih !== null) taruh(terpilih, k);
                else setKabar({ teks: "Pilih dulu satu kartu angka di bawah, lalu ketuk kelompoknya.", ok: false });
              }}
              className={`block rounded-2xl border-4 bg-white px-0.5 py-1.5 ${terpasang[k] !== null ? "border-[#7FCB96]" : "border-dashed border-[#1C01A5]"} ${goyang === k ? "igil-goyang" : ""}`}
            >
              <span className="block text-center text-xs font-black text-[#1C01A5]">{nama}</span>
              <span className="mb-1 flex min-h-[30px] items-center justify-center">
                {terpasang[k] !== null ? (
                  <span className="igil-muncul rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2 text-lg font-black text-[#1C01A5]">{terpasang[k]}</span>
                ) : (
                  <span className="text-[11px] font-black text-[#1C01A5]/50">kartu di sini</span>
                )}
              </span>
              <KumpulanBenda n={jumlahIkon[k]} ikon={d.ikon} kelas="text-base" />
            </button>
          ))}
        </div>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu angka</span>
          {kartuSisa.map((n) => (
            <BendaSeret
              key={n}
              id={`kt${n}`}
              label={`Kartu angka ${n}`}
              onKetuk={() => setTerpilih(n)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("c6-peran-")) taruh(n, Number(z.slice(9)));
              }}
              kelas="rounded-2xl"
            >
              <span
                className={`block rounded-2xl border-4 border-[#1C01A5] bg-white px-4 py-1.5 text-3xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${
                  terpilih === n ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""
                }`}
              >
                {n}
              </span>
            </BendaSeret>
          ))}
          {beres ? <span className="text-3xl">✅</span> : null}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.a} – ${d.b} = ?` : `${d.a} – ${d.b} = ${sisa}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPeran({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_PERAN[RONDE_PERAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kartu Peran Bilangan"
      warna="#FDE68A"
      petunjuk="Dalam pengurangan, ada bilangan mula-mula, bilangan yang diambil, dan bilangan sisa. Hitung benda di setiap kelompok. Lalu seret kartu angka ke kelompok yang cocok. Pada ronde terakhir, ucapkan banyak sisa."
      speakGuru={speakGuru}
      panel={panel}
      id="c6-peran"
      jumlahRonde={RONDE_PERAN.length}
      kunciAkhir={terakhir.a - terakhir.b}
      belumSiap="Pasang kartunya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePeranBilangan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
