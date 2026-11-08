"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { Kelereng, sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import {
  Keranjang,
  KumpulanBenda,
  TimbanganKelereng,
  WARNA_PASANG,
  hubungan,
  kalimatBanyak,
  type Hubungan,
} from "./perbandingan-d5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab D, Tahap 4 Concrete: benda nyata. Anak memasangkan kelereng   */
/* satu-satu, menyusun keranjang jeruk menurut banyaknya, menyeimbangkan       */
/* timbangan, dan memasang kartu kata pada kelompok benda.                    */
/*  1 Pasangkan Kelereng (ketuk untuk memasangkan satu-satu)                  */
/*  2 Susun Keranjang Jeruk (seret keranjang ke urutan yang tepat)            */
/*  3 Timbangan Kelereng (tambah dan kurangi sampai tujuan tercapai)          */
/*  4 Pasang Kartu Kata (seret kartu lebih banyak, paling sedikit, dan lain)  */
/* ------------------------------------------------------------------------ */

const HURUF = ["A", "B", "C", "D"];

/* --------- Permainan 1. Pasangkan Kelereng -------------------------------- */

const RONDE_PASANG: { nama1: string; nama2: string; a: number; b: number }[] = [
  { nama1: "Halim", nama2: "Upe", a: 15, b: 11 },
  { nama1: "Kira", nama2: "Wei", a: 8, b: 12 },
  { nama1: "Tika", nama2: "Malosi", a: 16, b: 13 },
];

function RondePasang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_PASANG[ronde];
  const akhir = ronde === RONDE_PASANG.length - 1;
  const selisih = Math.abs(d.a - d.b);
  const benar: "a" | "b" | "sama" = d.a > d.b ? "a" : d.b > d.a ? "b" : "sama";
  const [pa, setPa] = useState<(number | null)[]>(() => Array.from({ length: d.a }, () => null));
  const [pb, setPb] = useState<(number | null)[]>(() => Array.from({ length: d.b }, () => null));
  const [jawabSiapa, setJawabSiapa] = useState(false);
  const [salahSiapa, setSalahSiapa] = useState<string | null>(null);
  const [salahSisa, setSalahSisa] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const sisaA = pa.filter((x) => x === null).length;
  const sisaB = pb.filter((x) => x === null).length;
  const selesaiPasang = sisaA === 0 || sisaB === 0;
  const jml = pa.filter((x) => x !== null).length;
  const suara = panel.suara["d5-pasang"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${d.nama1} punya ${sebut(d.a)} kelereng dan ${d.nama2} punya ${sebut(d.b)} kelereng. Setelah dipasangkan satu-satu, tersisa ${sebut(selisih)} kelereng tanpa pasangan. ${kalimatBanyak(d.a, d.b)}.`
  );

  const pasangkan = (dari: "a" | "b", i: number) => {
    if (selesaiPasang) return;
    const sumber = dari === "a" ? pa : pb;
    const tujuan = dari === "a" ? pb : pa;
    if (sumber[i] !== null) {
      ucap("Kelereng ini sudah punya pasangan.");
      return;
    }
    const j = tujuan.findIndex((x) => x === null);
    if (j < 0) {
      setKabar({ teks: `Semua kelereng ${dari === "a" ? d.nama2 : d.nama1} sudah punya pasangan. Kelereng ini tidak punya pasangan, jadi ini sisanya.`, ok: false });
      return;
    }
    const no = jml + 1;
    const baruS = sumber.slice();
    const baruT = tujuan.slice();
    baruS[i] = no;
    baruT[j] = no;
    if (dari === "a") {
      setPa(baruS);
      setPb(baruT);
    } else {
      setPb(baruS);
      setPa(baruT);
    }
    setKabar(null);
    ucap(sebut(no));
  };

  const pilihSiapa = (v: "a" | "b" | "sama") => {
    if (jawabSiapa) return;
    if (v === benar) {
      setSalahSiapa(null);
      setKabar(null);
      setJawabSiapa(true);
    } else {
      setSalahSiapa(v);
      setKabar({ teks: "Lihat kelereng yang masih punya sisa tanpa pasangan. Kelompok yang punya sisa adalah yang lebih banyak.", ok: false });
    }
  };

  const pilihSisa = (v: number) => {
    if (!jawabSiapa || beres) return;
    if (v === selisih) {
      setSalahSisa(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahSisa(v);
      setKabar({ teks: "Hitung kelereng yang tidak punya pasangan satu per satu. Itulah lebihnya.", ok: false });
    }
  };

  const kolom = (isi: (number | null)[], dari: "a" | "b", nama: string, warna: number) => (
    <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{nama}</p>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {isi.map((p, i) => {
          const sisa = selesaiPasang && p === null;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Kelereng ${nama} ke-${i + 1}, ${p !== null ? `pasangan ${p}` : sisa ? "sisa tanpa pasangan" : "belum berpasangan"}`}
              onClick={() => pasangkan(dari, i)}
              className="relative rounded-full"
            >
              <span
                className={`block rounded-full p-0.5 ${sisa ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}
                style={p !== null ? { boxShadow: `0 0 0 3px ${WARNA_PASANG[(p - 1) % WARNA_PASANG.length]}` } : undefined}
              >
                <Kelereng warna={warna} kelas="h-8 w-8" />
              </span>
              {p !== null ? (
                <span
                  className="absolute -right-1.5 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#1C01A5] px-0.5 text-[10px] font-black text-white"
                  style={{ backgroundColor: WARNA_PASANG[(p - 1) % WARNA_PASANG.length] }}
                >
                  {p}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );

  const opsiSiapa: { v: "a" | "b" | "sama"; teks: string }[] = [
    { v: "a", teks: `Kelereng ${d.nama1}` },
    { v: "b", teks: `Kelereng ${d.nama2}` },
    { v: "sama", teks: "Sama banyak" },
  ];

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling banyak" : suara ? "Hebat!" : beres ? "Pasanganmu rapi!" : selesaiPasang ? "Siapa yang lebih banyak?" : "Pasangkan satu-satu"}
        teks={`${d.nama1} punya ${sebut(d.a)} kelereng merah. ${d.nama2} punya ${sebut(d.b)} kelereng biru. Ketuk satu kelereng, lalu kelereng itu otomatis dipasangkan dengan satu kelereng dari kelompok lain. Terus pasangkan sampai salah satu kelompok habis. Lihat siapa yang masih punya sisa.${akhir ? " Di akhir, ucapkan banyak kelereng pada kelompok yang lebih banyak." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          {kolom(pa, "a", d.nama1, 0)}
          {kolom(pb, "b", d.nama2, 1)}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Pasangan: {jml} {selesaiPasang ? `• sisa tanpa pasangan: ${sisaA + sisaB}` : ""}
        </p>
        {selesaiPasang && !jawabSiapa ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Kelereng siapa yang lebih banyak?</p>
            <div className="grid grid-cols-3 gap-2">
              {opsiSiapa.map((o) => (
                <button
                  key={`${o.v}-${salahSiapa === o.v ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih ${o.teks}`}
                  onClick={() => pilihSiapa(o.v)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salahSiapa === o.v ? "igil-goyang" : ""}`}
                >
                  {o.teks}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {jawabSiapa && !beres && benar !== "sama" ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa lebihnya? (kelereng yang tidak punya pasangan)</p>
            <PilihAngka opsi={opsiSekitar(selisih)} keliru={salahSisa} onPilih={pilihSisa} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Siapa yang lebih banyak? Banyaknya: ?" : `${kalimatBanyak(d.a, d.b)}, lebihnya ${selisih}.`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPasang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_PASANG[RONDE_PASANG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pasangkan Kelereng"
      warna="#FFE566"
      petunjuk="Untuk membandingkan, pasangkan benda satu-satu. Ketuk satu kelereng, lalu kelereng itu dipasangkan dengan kelereng dari kelompok lain. Kelompok yang masih punya sisa tanpa pasangan adalah kelompok yang lebih banyak. Pilih kelompok yang lebih banyak, lalu pilih berapa lebihnya. Pada ronde terakhir, ucapkan banyak kelereng pada kelompok yang lebih banyak."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-pasang"
      jumlahRonde={RONDE_PASANG.length}
      kunciAkhir={Math.max(terakhir.a, terakhir.b)}
      belumSiap="Pasangkan dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePasang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Susun Keranjang Jeruk ----------------------------- */

const RONDE_KERANJANG: { ns: number[]; arah: "naik" | "turun" }[] = [
  { ns: [10, 14, 12], arah: "naik" },
  { ns: [11, 18, 13], arah: "turun" },
  { ns: [15, 12, 19], arah: "naik" },
];

function RondeKeranjang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_KERANJANG[ronde];
  const akhir = ronde === RONDE_KERANJANG.length - 1;
  const naik = d.arah === "naik";
  const urut = d.ns
    .map((n, i) => ({ n, i }))
    .sort((p, q) => (naik ? p.n - q.n : q.n - p.n))
    .map((x) => x.i);
  const [slot, setSlot] = useState<(number | null)[]>([null, null, null]);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = slot.every((x) => x !== null);
  const suara = panel.suara["d5-keranjang"] === true && akhir;
  const terbesar = Math.max(...d.ns);
  useBicara(
    akhir ? suara : beres,
    `Urutan keranjang ${naik ? "dari yang paling sedikit ke yang paling banyak" : "dari yang paling banyak ke yang paling sedikit"}: ${urut.map((i) => sebut(d.ns[i])).join(", ")}.`
  );

  const taruh = (i: number, k: number) => {
    if (slot[k] !== null || slot.includes(i) || beres) return;
    if (urut[k] !== i) {
      setGoyang(k);
      setTerpilih(null);
      const kata = naik ? "sedikit" : "banyak";
      const lawan = naik ? "banyak" : "sedikit";
      setKabar({
        teks:
          k === 0
            ? `Hitung jeruk di setiap keranjang. Tempat pertama untuk keranjang yang paling ${kata} jeruknya.`
            : k === 1
              ? "Tempat tengah untuk keranjang yang jumlah jeruknya di antara dua keranjang lain."
              : `Tempat terakhir untuk keranjang yang paling ${lawan} jeruknya.`,
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
    ucap(`Keranjang ${HURUF[i]}.`);
    if (baru.every((x) => x !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  const tampilUrut = urut.map((i) => (akhir && !suara && d.ns[i] === terbesar ? "?" : String(d.ns[i]))).join(" → ");
  const sisa = d.ns.map((_, i) => i).filter((i) => !slot.includes(i));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling banyak" : suara ? "Hebat!" : beres ? "Urutanmu benar!" : naik ? "Dari paling sedikit" : "Dari paling banyak"}
        teks={`Ada tiga keranjang jeruk. Hitung dulu jeruk di setiap keranjang. Lalu seret keranjang ke tempat urutan, atau ketuk keranjangnya lalu ketuk tempatnya. Susun ${naik ? "dari yang paling sedikit ke yang paling banyak" : "dari yang paling banyak ke yang paling sedikit"}.${akhir ? " Setelah urutannya benar, ucapkan banyak jeruk pada keranjang yang paling banyak." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {naik ? "➡️ Dari paling sedikit ke paling banyak" : "➡️ Dari paling banyak ke paling sedikit"}
        </p>
        <div className="flex min-h-[110px] flex-wrap items-end justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-1.5 py-3">
          {sisa.map((i) => (
            <BendaSeret
              key={i}
              id={`k${i}`}
              label={`Keranjang ${HURUF[i]}`}
              onKetuk={() => setTerpilih(i)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("d5-slot-")) taruh(i, Number(z.slice(8)));
              }}
              gaya={letakMeja(i)}
              kelas="rounded-2xl"
            >
              <span className={`block rounded-2xl p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                <Keranjang n={d.ns[i]} kelas="w-[5.6rem]" />
                <span className="block text-center text-sm font-black text-[#1C01A5]">Keranjang {HURUF[i]}</span>
              </span>
            </BendaSeret>
          ))}
          {beres ? <span className="text-4xl">✅</span> : null}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((k) => (
            <button
              key={`${k}-${goyang === k ? "x" : "o"}`}
              type="button"
              data-zona={`d5-slot-${k}`}
              aria-label={`Tempat urutan ke-${k + 1}${slot[k] !== null ? `, berisi keranjang ${HURUF[slot[k] as number]}` : ", kosong"}`}
              onClick={() => {
                if (slot[k] === null && terpilih !== null) taruh(terpilih, k);
                else if (slot[k] === null) setKabar({ teks: "Pilih dulu satu keranjang di atas, lalu ketuk tempat urutannya.", ok: false });
              }}
              className={`flex min-h-[132px] flex-col items-center justify-start rounded-2xl border-4 px-0.5 py-1 ${
                slot[k] === null ? "border-dashed border-[#1C01A5] bg-[#FFFDF2]" : "border-solid border-[#7FCB96] bg-[#E8F7EE]"
              } ${goyang === k ? "igil-goyang" : ""}`}
            >
              <span className="text-xs font-black leading-tight text-[#1C01A5]">
                {k + 1}. {k === 0 ? (naik ? "paling sedikit" : "paling banyak") : k === 2 ? (naik ? "paling banyak" : "paling sedikit") : "di tengah"}
              </span>
              {slot[k] !== null ? (
                <span className="igil-muncul block">
                  <Keranjang n={d.ns[slot[k] as number]} kelas="w-[5rem]" />
                  <span className="block text-center text-xs font-black text-[#1C01A5]">{HURUF[slot[k] as number]}</span>
                </span>
              ) : null}
            </button>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">{tampilUrut}</p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKeranjang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KERANJANG[RONDE_KERANJANG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Keranjang Jeruk"
      warna="#FED7AA"
      petunjuk="Hitung jeruk di setiap keranjang. Lalu susun keranjang menurut urutan yang diminta: dari paling sedikit ke paling banyak, atau sebaliknya. Seret keranjang ke tempat urutan. Pada ronde terakhir, ucapkan banyak jeruk pada keranjang yang paling banyak."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-keranjang"
      jumlahRonde={RONDE_KERANJANG.length}
      kunciAkhir={Math.max(...terakhir.ns)}
      belumSiap="Susun semua keranjangnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKeranjang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Timbangan Kelereng -------------------------------- */

const RONDE_TIMBANG: { kanan: number; awal: number; tujuan: Hubungan }[] = [
  { kanan: 12, awal: 9, tujuan: "lebih" },
  { kanan: 14, awal: 10, tujuan: "sama" },
  { kanan: 13, awal: 16, tujuan: "kurang" },
];

const TEKS_TUJUAN: Record<Hubungan, string> = {
  lebih: "pan kiri LEBIH BANYAK dari pan kanan",
  sama: "pan kiri SAMA BANYAK dengan pan kanan",
  kurang: "pan kiri LEBIH SEDIKIT dari pan kanan",
};

function RondeTimbang({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_TIMBANG[ronde];
  const akhir = ronde === RONDE_TIMBANG.length - 1;
  const [kiri, setKiri] = useState(d.awal);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["d5-timbang"] === true && akhir;
  useBicara(akhir ? suara : beres, `Pan kiri berisi ${sebut(kiri)} kelereng dan pan kanan berisi ${sebut(d.kanan)} kelereng. ${kalimatBanyak(kiri, d.kanan)}.`);

  const ubah = (delta: number) => {
    if (beres) return;
    const baru = Math.max(0, Math.min(20, kiri + delta));
    if (baru === kiri) return;
    setKiri(baru);
    setKabar(null);
    ucap(sebut(baru));
  };

  const periksa = () => {
    if (beres) return;
    if (hubungan(kiri, d.kanan) === d.tujuan) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    setKabar({
      teks:
        d.tujuan === "lebih"
          ? "Pan kiri belum lebih berat. Tambah kelereng di pan kiri sampai pan kiri turun."
          : d.tujuan === "kurang"
            ? "Pan kiri masih lebih berat atau sama. Kurangi kelereng di pan kiri sampai pan kiri naik."
            : kiri < d.kanan
              ? "Pan kiri masih kurang. Tambah kelereng sampai timbangan seimbang."
              : "Pan kiri kebanyakan. Kurangi kelereng sampai timbangan seimbang.",
      ok: false,
    });
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: pan kanan" : suara ? "Hebat!" : beres ? "Timbanganmu tepat!" : "Atur timbangan"}
        teks={`Buatlah ${TEKS_TUJUAN[d.tujuan].toLowerCase()}. Tekan tambah atau kurangi untuk mengubah kelereng di pan kiri. Pan yang lebih banyak isinya akan turun. Lalu tekan periksa.${akhir ? " Di akhir, ucapkan banyak kelereng di pan kanan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">
          🎯 Buat {TEKS_TUJUAN[d.tujuan]}
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#E0F2FE] px-1 py-2">
          <TimbanganKelereng kiri={kiri} kanan={d.kanan} />
        </div>
        {!beres ? (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" aria-label="Kurangi satu kelereng di pan kiri" onClick={() => ubah(-1)} className={TOMBOL_KECIL}>
              ➖ Kurangi
            </button>
            <button type="button" aria-label="Tambah satu kelereng di pan kiri" onClick={() => ubah(1)} className={TOMBOL_KECIL}>
              ➕ Tambah
            </button>
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Pan kiri dan pan kanan: ?" : `${kalimatBanyak(kiri, d.kanan)}.`}
          </p>
        ) : (
          <button
            type="button"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa timbangan
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTimbang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Timbangan Kelereng"
      warna="#BFDBFE"
      petunjuk="Pan yang isinya lebih banyak akan turun. Tambah atau kurangi kelereng di pan kiri sampai tujuan di atas tercapai: lebih banyak, sama banyak, atau lebih sedikit dari pan kanan. Lalu tekan periksa. Pada ronde terakhir, ucapkan banyak kelereng di pan kanan."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-timbang"
      jumlahRonde={RONDE_TIMBANG.length}
      kunciAkhir={RONDE_TIMBANG[RONDE_TIMBANG.length - 1].kanan}
      belumSiap="Atur dan periksa timbangannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTimbang ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Pasang Kartu Kata --------------------------------- */

type KataBanding = "lebih banyak" | "lebih sedikit" | "paling banyak" | "paling sedikit";

const RONDE_KARTU: { grup: { ikon: string; n: number }[]; kartu: KataBanding[] }[] = [
  { grup: [{ ikon: "🦋", n: 15 }, { ikon: "🦋", n: 11 }], kartu: ["lebih banyak", "lebih sedikit"] },
  { grup: [{ ikon: "🚗", n: 9 }, { ikon: "🚗", n: 13 }], kartu: ["lebih banyak", "lebih sedikit"] },
  { grup: [{ ikon: "🍎", n: 12 }, { ikon: "🍎", n: 18 }, { ikon: "🍎", n: 10 }], kartu: ["paling banyak", "paling sedikit"] },
];

function RondeKartu({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_KARTU[ronde];
  const akhir = ronde === RONDE_KARTU.length - 1;
  const ns = d.grup.map((g) => g.n);
  const iMaks = ns.indexOf(Math.max(...ns));
  const iMin = ns.indexOf(Math.min(...ns));
  const [terpasang, setTerpasang] = useState<Record<number, KataBanding>>({});
  const [terpilih, setTerpilih] = useState<KataBanding | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = Object.keys(terpasang).length === d.kartu.length;
  const suara = panel.suara["d5-kartu"] === true && akhir;
  const kartuSisa = d.kartu.filter((k) => !Object.values(terpasang).includes(k));
  useBicara(
    akhir ? suara : beres,
    `Kartu dipasang dengan benar. ${d.kartu.map((k) => `${k === "lebih banyak" || k === "paling banyak" ? `Kelompok ${HURUF[iMaks]} ${k}` : `Kelompok ${HURUF[iMin]} ${k}`}`).join(". ")}.`
  );

  const taruh = (kata: KataBanding, g: number) => {
    if (terpasang[g] || Object.values(terpasang).includes(kata) || beres) return;
    const banyak = kata === "lebih banyak" || kata === "paling banyak";
    const benar = banyak ? iMaks : iMin;
    if (g !== benar) {
      setGoyang(g);
      setTerpilih(null);
      setKabar({
        teks: `Hitung dulu benda di setiap kelompok. Kartu ${kata} dipasang pada kelompok yang bendanya ${banyak ? "terbanyak" : "tersedikit"}.`,
        ok: false,
      });
      return;
    }
    const baru = { ...terpasang, [g]: kata };
    setTerpasang(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`Kelompok ${HURUF[g]} ${kata}.`);
    if (Object.keys(baru).length === d.kartu.length) {
      letusan.picu();
      onBeres();
    }
  };

  const tiga = d.grup.length === 3;

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling banyak" : suara ? "Hebat!" : beres ? "Kartumu tepat!" : "Pasang kartu kata"}
        teks={`Hitung benda di setiap kelompok. Lalu seret kartu kata ke kelompok yang tepat, atau ketuk kartunya lalu ketuk kelompoknya. ${tiga ? "Pakai kartu paling banyak dan paling sedikit." : "Pakai kartu lebih banyak dan lebih sedikit."}${akhir ? " Di akhir, ucapkan banyak benda pada kelompok yang paling banyak." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className={`grid gap-2 ${tiga ? "grid-cols-3" : "grid-cols-2"}`}>
          {d.grup.map((g, i) => (
            <button
              key={`${i}-${goyang === i ? "x" : "o"}`}
              type="button"
              data-zona={`d5-grup-${i}`}
              aria-label={`Kelompok ${HURUF[i]}${terpasang[i] ? `, ${terpasang[i]}` : ""}`}
              onClick={() => {
                if (!terpasang[i] && terpilih !== null) taruh(terpilih, i);
                else if (!terpasang[i]) setKabar({ teks: "Pilih dulu satu kartu kata di bawah, lalu ketuk kelompoknya.", ok: false });
              }}
              className={`block rounded-2xl border-4 bg-white px-1 py-1.5 ${terpasang[i] ? "border-[#7FCB96]" : "border-dashed border-[#1C01A5]"} ${goyang === i ? "igil-goyang" : ""}`}
            >
              <span className="mb-1 block text-center text-sm font-black text-[#1C01A5]">Kelompok {HURUF[i]}</span>
              <span className="mb-1 flex min-h-[28px] items-center justify-center">
                {terpasang[i] ? (
                  <span className="igil-muncul rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2 py-0.5 text-xs font-black text-[#1C01A5]">{terpasang[i]}</span>
                ) : (
                  <span className="text-xs font-black text-[#1C01A5]/50">kartu di sini</span>
                )}
              </span>
              <KumpulanBenda n={g.n} ikon={g.ikon} kelas={tiga ? "text-base" : "text-xl"} />
            </button>
          ))}
        </div>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu kata</span>
          {kartuSisa.map((k) => (
            <BendaSeret
              key={k}
              id={k}
              label={`Kartu ${k}`}
              onKetuk={() => setTerpilih(k)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("d5-grup-")) taruh(k, Number(z.slice(8)));
              }}
              kelas="rounded-2xl"
            >
              <span
                className={`block rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-base font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${
                  terpilih === k ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""
                }`}
              >
                {k}
              </span>
            </BendaSeret>
          ))}
          {beres ? <span className="text-3xl">✅</span> : null}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Kelompok yang paling banyak berisi: ?" : ns.map((n, i) => `${HURUF[i]}: ${n}`).join(" • ")}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKartu({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KARTU[RONDE_KARTU.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pasang Kartu Kata"
      warna="#FBCFE8"
      petunjuk="Hitung benda di setiap kelompok. Untuk dua kelompok, pakai kartu lebih banyak dan lebih sedikit. Untuk tiga kelompok, pakai kartu paling banyak dan paling sedikit. Seret kartu ke kelompok yang tepat. Pada ronde terakhir, ucapkan banyak benda pada kelompok yang paling banyak."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-kartu"
      jumlahRonde={RONDE_KARTU.length}
      kunciAkhir={Math.max(...terakhir.grup.map((g) => g.n))}
      belumSiap="Pasang kartunya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKartu ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
