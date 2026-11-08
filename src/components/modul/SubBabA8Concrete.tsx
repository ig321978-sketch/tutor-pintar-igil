"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./belas-a5-dasar";
import { PilihKata } from "./ukur-7-dasar";
import { BendaSvg, NAMA_BENDA, Turus, kocok, tebar, type JenisBenda } from "./data-8-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab A, Tahap 4 Concrete: benda nyata. Anak merapikan mainan,     */
/* menghitung dengan turus, mengisi daftar dengan kartu angka, dan memenuhi   */
/* pesanan sesuai daftar.                                                     */
/*  1 Rapikan Toko Mainan (seret mainan ke rak yang sama)                     */
/*  2 Hitung dan Turus (ketuk kelereng, turus bertambah)                      */
/*  3 Isi Daftar Bola (seret kartu angka ke daftar)                           */
/*  4 Pesanan Paman (seret mainan ke keranjang sesuai daftar)                 */
/* ------------------------------------------------------------------------ */

type JenisMainan = "pesawat" | "mobil" | "boneka" | "bola";
type WarnaItem = "merah" | "biru" | "kuning" | "hijau";

const NAMA_WARNA_MAINAN = (j: JenisMainan) => NAMA_BENDA[j];

/* --------- Permainan 1. Rapikan Toko Mainan ------------------------------- */

type RondeRapi = { rak: JenisMainan[]; isi: Partial<Record<JenisMainan, number>> };

const RONDE_RAPI: RondeRapi[] = [
  { rak: ["pesawat", "mobil", "bola"], isi: { pesawat: 3, mobil: 2, bola: 2 } },
  { rak: ["pesawat", "mobil", "boneka", "bola"], isi: { pesawat: 2, mobil: 3, boneka: 2, bola: 1 } },
  { rak: ["mobil", "boneka", "bola"], isi: { mobil: 2, boneka: 4, bola: 3 } },
];

function RondeRapikan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { rak, isi } = RONDE_RAPI[ronde];
  const akhir = ronde === RONDE_RAPI.length - 1;
  const barang = React.useMemo(
    () =>
      kocok(
        rak.flatMap((j) => Array.from({ length: isi[j] ?? 0 }, (_, k) => ({ id: `${j}-${k}`, jenis: j }))),
        17 + ronde
      ),
    [rak, isi, ronde]
  );
  const [ditaruh, setDitaruh] = useState<string[]>([]);
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<JenisMainan | null>(null);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = ditaruh.length === barang.length;
  const terbanyak = rak.reduce((a, b) => ((isi[b] ?? 0) > (isi[a] ?? 0) ? b : a));
  const suara = panel.suara["a8-rapikan"] === true && akhir;
  const daftarKalimat = rak.map((j) => `Ada ${sebut(isi[j] ?? 0)} ${NAMA_WARNA_MAINAN(j)}.`).join(" ");
  useBicara(akhir ? suara : beres, `${daftarKalimat} Yang paling banyak adalah ${NAMA_WARNA_MAINAN(terbanyak)}, ada ${sebut(isi[terbanyak] ?? 0)}.`);

  const taruh = (id: string, j: JenisMainan) => {
    const b = barang.find((x) => x.id === id);
    if (!b || ditaruh.includes(id) || semua) return;
    if (b.jenis !== j) {
      setGoyang(j);
      setTerpilih(null);
      setKabar({ teks: `Mainan itu bukan ${NAMA_WARNA_MAINAN(j)}. Letakkan mainan di rak yang bentuknya sama.`, ok: false });
      return;
    }
    setDitaruh([...ditaruh, id]);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`${NAMA_WARNA_MAINAN(j)}.`);
  };

  const pilih = (t: string) => {
    if (!semua || beres) return;
    if (t === NAMA_WARNA_MAINAN(terbanyak)) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(t);
      setKabar({ teks: "Lihat daftar. Cari rak yang isinya paling banyak.", ok: false });
    }
  };

  const hitung = (j: JenisMainan) => ditaruh.filter((id) => id.startsWith(`${j}-`)).length;
  const tray = barang.filter((b) => !ditaruh.includes(b.id));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang paling banyak" : suara ? "Hebat!" : beres ? "Tokomu rapi!" : semua ? "Mana yang paling banyak?" : "Rapikan mainannya"}
        teks={`Toko Paman berantakan. Seret setiap mainan ke rak yang bentuknya sama, atau ketuk mainannya lalu ketuk raknya. Setelah rapi, lihat daftar dan cari mainan yang paling banyak.${akhir ? " Di akhir, ucapkan berapa banyak mainan yang paling banyak." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${rak.length}, minmax(0, 1fr))` }}>
          {rak.map((j) => (
            <button
              key={`${j}-${goyang === j ? "x" : "o"}`}
              type="button"
              data-zona={`a8-rak-${j}`}
              aria-label={`Rak ${NAMA_WARNA_MAINAN(j)}, berisi ${hitung(j)}`}
              onClick={() => {
                if (terpilih !== null) taruh(terpilih, j);
                else if (!semua) setKabar({ teks: "Pilih dulu satu mainan di bawah, lalu ketuk raknya.", ok: false });
              }}
              className={`flex min-h-[112px] flex-col items-center justify-between rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-0.5 py-1 ${goyang === j ? "igil-goyang" : ""}`}
            >
              <span className="text-[11px] font-black leading-tight text-[#1C01A5]">{NAMA_WARNA_MAINAN(j)}</span>
              <span className="flex flex-wrap items-center justify-center gap-0.5">
                {Array.from({ length: hitung(j) }, (_, k) => (
                  <span key={k} className="igil-muncul">
                    <BendaSvg jenis={j as JenisBenda} kelas="h-6 w-6" />
                  </span>
                ))}
              </span>
              <span className="rounded-full bg-white px-2 text-sm font-black text-[#1C01A5]">{hitung(j)}</span>
            </button>
          ))}
        </div>
        <div className="rounded-2xl border-4 border-dashed border-[#1C01A5]/60 bg-white/80 px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Mainan berserakan • seret ke rak</p>
          <div className="flex min-h-[56px] flex-wrap items-center justify-center gap-2 pt-1">
            {tray.map((b) => (
              <BendaSeret
                key={b.id}
                id={b.id}
                label={`Mainan ${NAMA_WARNA_MAINAN(b.jenis)}`}
                onKetuk={() => setTerpilih(b.id)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("a8-rak-")) taruh(b.id, z.slice(7) as JenisMainan);
                }}
                gaya={letakMeja(barang.indexOf(b))}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${terpilih === b.id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <BendaSvg jenis={b.jenis as JenisBenda} kelas="h-10 w-10" />
                </span>
              </BendaSeret>
            ))}
            {tray.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">semua mainan sudah rapi</span> : null}
          </div>
        </div>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-base font-black text-[#1C01A5]">
              <p className="text-center text-xs text-[#1C01A5]/70">Daftar Mainan</p>
              {rak.map((j) => (
                <p key={j}>
                  Ada {isi[j]} {NAMA_WARNA_MAINAN(j)}.
                </p>
              ))}
            </div>
            <p className="text-center text-base font-black text-[#1C01A5]">Mainan apa yang paling banyak?</p>
            <PilihKata opsi={rak.map((j) => NAMA_WARNA_MAINAN(j))} keliru={salah} onPilih={pilih} kolom={rak.length > 3 ? 2 : 3} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `Yang paling banyak: ${NAMA_WARNA_MAINAN(terbanyak)}, ada ?` : `Yang paling banyak: ${NAMA_WARNA_MAINAN(terbanyak)}, ada ${isi[terbanyak]}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahRapikan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_RAPI[RONDE_RAPI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Rapikan Toko Mainan"
      warna="#FBCFE8"
      petunjuk="Mengelompokkan data. Seret setiap mainan ke rak yang bentuknya sama. Setelah rapi, baca daftarnya dan pilih mainan yang paling banyak. Pada ronde terakhir, ucapkan berapa banyak mainan yang paling banyak."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-rapikan"
      jumlahRonde={RONDE_RAPI.length}
      kunciAkhir={Math.max(...Object.values(terakhir.isi).map((n) => n ?? 0))}
      belumSiap="Rapikan mainannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRapikan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Hitung dan Turus ----------------------------------- */

type RondeTurus = { warna: { k: WarnaItem; n: number }[]; tanya: string; opsi: string[]; jawab: string };

const RONDE_TURUS: RondeTurus[] = [
  {
    warna: [
      { k: "merah", n: 4 },
      { k: "biru", n: 3 },
      { k: "hijau", n: 5 },
    ],
    tanya: "Kelereng warna apa yang paling banyak?",
    opsi: ["merah", "biru", "hijau"],
    jawab: "hijau",
  },
  {
    warna: [
      { k: "merah", n: 3 },
      { k: "biru", n: 5 },
      { k: "kuning", n: 2 },
      { k: "hijau", n: 5 },
    ],
    tanya: "Dua warna apa yang sama banyak?",
    opsi: ["biru dan hijau", "merah dan biru", "kuning dan merah", "merah dan hijau"],
    jawab: "biru dan hijau",
  },
  {
    warna: [
      { k: "merah", n: 6 },
      { k: "kuning", n: 4 },
      { k: "hijau", n: 7 },
    ],
    tanya: "Kelereng warna apa yang paling sedikit?",
    opsi: ["merah", "kuning", "hijau"],
    jawab: "kuning",
  },
];

function RondeHitungTurus({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_TURUS[ronde];
  const akhir = ronde === RONDE_TURUS.length - 1;
  const total = d.warna.reduce((a, b) => a + b.n, 0);
  const kelereng = React.useMemo(() => {
    const daftar = d.warna.flatMap((w) => Array.from({ length: w.n }, () => w.k));
    const urut = kocok(daftar, 31 + ronde);
    const pos = tebar(urut.length, 250, 96, 61 + ronde);
    return urut.map((k, i) => ({ k, ...pos[i] }));
  }, [d, ronde]);
  const [dihitung, setDihitung] = useState<boolean[]>(() => kelereng.map(() => false));
  const [warnaKe, setWarnaKe] = useState(0);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const hitung = d.warna.map((w) => kelereng.filter((m, i) => m.k === w.k && dihitung[i]).length);
  const selesaiHitung = warnaKe >= d.warna.length;
  const suara = panel.suara["a8-turus"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.warna.map((w) => `Ada ${sebut(w.n)} kelereng ${w.k}.`).join(" ")} ${d.tanya.replace("?", "")} adalah ${d.jawab}.${akhir ? ` Jumlah semua kelereng ada ${sebut(total)}.` : ""}`);

  const ketuk = (i: number) => {
    if (dihitung[i] || selesaiHitung) return;
    const m = kelereng[i];
    const sekarang = d.warna[warnaKe];
    if (m.k !== sekarang.k) {
      setKabar({ teks: `Sekarang hitung kelereng warna ${sekarang.k} saja. Kelereng warna lain nanti giliran berikutnya.`, ok: false });
      return;
    }
    const baru = dihitung.slice();
    baru[i] = true;
    setDihitung(baru);
    setKabar(null);
    const n = hitung[warnaKe] + 1;
    ucap(sebut(n));
    if (n === sekarang.n) setWarnaKe((w) => w + 1);
  };

  const pilih = (t: string) => {
    if (!selesaiHitung || beres) return;
    if (t === d.jawab) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(t);
      setKabar({ teks: "Lihat turus pada daftar. Bandingkan banyak goresan setiap warna.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Turusmu tepat!" : selesaiHitung ? d.tanya : `Hitung kelereng ${d.warna[warnaKe].k}`}
        teks={`Ketuk kelereng satu per satu untuk menghitungnya. Hitung satu warna sampai selesai, lalu warna berikutnya. Setiap kelereng yang diketuk menambah satu goresan turus pada daftar.${akhir ? " Di akhir, ucapkan jumlah semua kelereng." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="relative mx-auto w-full rounded-2xl border-4 border-[#1C01A5] bg-[#E0F2FE]" style={{ height: 132 }} role="group" aria-label="Kelereng berserakan">
          {kelereng.map((m, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Kelereng ${m.k} ke-${i + 1}${dihitung[i] ? ", sudah dihitung" : ""}`}
              onClick={() => ketuk(i)}
              className="absolute rounded-full"
              style={{ left: `${((m.x + 25) / 300) * 100}%`, top: m.y + 12, transform: "translate(-50%, 0)", opacity: dihitung[i] ? 0.4 : 1 }}
            >
              <span className={`block rounded-full ${dihitung[i] ? "ring-4 ring-[#F0AB00]" : ""}`}>
                <BendaSvg jenis={`kelereng-${m.k}` as JenisBenda} kelas="h-8 w-8" />
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2" role="group" aria-label="Daftar turus kelereng">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Daftar Kelereng • turus</p>
          {d.warna.map((w, i) => (
            <div key={w.k} className={`flex items-center gap-2 rounded-xl px-1.5 py-1 ${i === warnaKe && !selesaiHitung ? "bg-[#FFF7CC] ring-2 ring-[#F0AB00]" : "bg-[#F5F3FF]"}`}>
              <BendaSvg jenis={`kelereng-${w.k}` as JenisBenda} kelas="h-6 w-6" />
              <span className="w-14 shrink-0 text-xs font-black text-[#1C01A5]">{w.k}</span>
              <span className="min-w-0 flex-1">{hitung[i] > 0 ? <Turus n={hitung[i]} /> : <span className="text-xs font-black text-[#1C01A5]/40">…</span>}</span>
              <span className="w-8 text-right text-lg font-black text-[#1C01A5]">{hitung[i] === w.n ? w.n : ""}</span>
            </div>
          ))}
        </div>
        {selesaiHitung && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{d.tanya}</p>
            <PilihKata opsi={d.opsi} keliru={salah} onPilih={pilih} kolom={d.opsi.length > 3 ? 2 : 3} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua kelereng = ?" : `Jawabannya: ${d.jawab}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTurus({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TURUS[RONDE_TURUS.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung dan Turus"
      warna="#BBF7D0"
      petunjuk="Menghitung dengan turus. Ketuk kelereng satu per satu dari satu warna, dan turus bertambah satu goresan setiap kali. Setelah semua dihitung, jawab pertanyaannya. Pada ronde terakhir, ucapkan jumlah semua kelereng."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-turus"
      jumlahRonde={RONDE_TURUS.length}
      kunciAkhir={terakhir.warna.reduce((a, b) => a + b.n, 0)}
      belumSiap="Hitung semua kelerengnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeHitungTurus ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Isi Daftar Bola ------------------------------------ */

type RondeDaftar = { warna: { k: WarnaItem; n: number }[]; kartu: number[]; tanya: "banyak" | "sedikit" };

const RONDE_DAFTAR: RondeDaftar[] = [
  {
    warna: [
      { k: "merah", n: 7 },
      { k: "kuning", n: 4 },
      { k: "hijau", n: 6 },
    ],
    kartu: [6, 9, 4, 7],
    tanya: "banyak",
  },
  {
    warna: [
      { k: "merah", n: 5 },
      { k: "kuning", n: 8 },
      { k: "hijau", n: 3 },
    ],
    kartu: [8, 3, 6, 5],
    tanya: "banyak",
  },
  {
    warna: [
      { k: "merah", n: 3 },
      { k: "kuning", n: 5 },
      { k: "hijau", n: 4 },
      { k: "biru", n: 2 },
    ],
    kartu: [4, 6, 2, 5, 3],
    tanya: "sedikit",
  },
];

function RondeIsiDaftar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_DAFTAR[ronde];
  const akhir = ronde === RONDE_DAFTAR.length - 1;
  const total = d.warna.reduce((a, b) => a + b.n, 0);
  const bola = React.useMemo(() => {
    const daftar = d.warna.flatMap((w) => Array.from({ length: w.n }, () => w.k));
    const urut = kocok(daftar, 5 + ronde);
    const pos = tebar(urut.length, 250, 82, 81 + ronde);
    return urut.map((k, i) => ({ k, ...pos[i] }));
  }, [d, ronde]);
  const [isi, setIsi] = useState<(number | null)[]>(() => d.warna.map(() => null));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = isi.every((v) => v !== null);
  const kunci = d.tanya === "banyak" ? d.warna.reduce((a, b) => (b.n > a.n ? b : a)) : d.warna.reduce((a, b) => (b.n < a.n ? b : a));
  const suara = panel.suara["a8-isi-daftar"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.warna.map((w) => `Ada ${sebut(w.n)} bola ${w.k}.`).join(" ")} Bola yang paling ${d.tanya} berwarna ${kunci.k}.${akhir ? ` Jumlah semua bola ada ${sebut(total)}.` : ""}`);

  const taruh = (v: number, k: number) => {
    if (isi[k] !== null || isi.includes(v)) return;
    if (d.warna[k].n !== v) {
      setGoyang(k);
      setTerpilih(null);
      setKabar({ teks: `Hitung lagi bola warna ${d.warna[k].k} satu per satu. Kartu itu belum tepat.`, ok: false });
      return;
    }
    const baru = isi.slice();
    baru[k] = v;
    setIsi(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`Ada ${sebut(v)} bola ${d.warna[k].k}.`);
  };

  const pilih = (t: string) => {
    if (!penuh || beres) return;
    if (t === kunci.k) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(t);
      setKabar({ teks: `Lihat daftar. Cari angka yang paling ${d.tanya === "banyak" ? "besar" : "kecil"}.`, ok: false });
    }
  };

  const sisaKartu = d.kartu.filter((v) => !isi.includes(v));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Daftarmu lengkap!" : penuh ? `Mana yang paling ${d.tanya}?` : "Isi daftar dengan kartu angka"}
        teks={`Hitung bola menurut warnanya. Lalu seret kartu angka ke daftar, atau ketuk kartunya lalu ketuk barisnya. Setelah daftar lengkap, cari bola yang paling ${d.tanya}.${akhir ? " Di akhir, ucapkan jumlah semua bola." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="relative mx-auto w-full rounded-2xl border-4 border-[#1C01A5] bg-[#E0F2FE]" style={{ height: 110 }} role="img" aria-label="Bola berserakan di karpet">
          {bola.map((m, i) => (
            <span key={i} className="absolute block" style={{ left: `${((m.x + 25) / 300) * 100}%`, top: m.y + 6, transform: "translate(-50%, 0)" }}>
              <BendaSvg jenis={`bola-${m.k}` as JenisBenda} kelas="h-7 w-7" />
            </span>
          ))}
        </div>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Daftar Warna Bola</p>
          {d.warna.map((w, k) => (
            <button
              key={`${w.k}-${goyang === k ? "x" : "o"}`}
              type="button"
              data-zona={`a8-isi-${k}`}
              aria-label={`Daftar bola ${w.k}${isi[k] !== null ? `, ada ${isi[k]}` : ", belum diisi"}`}
              onClick={() => {
                if (isi[k] !== null) return;
                if (terpilih !== null) taruh(terpilih, k);
                else setKabar({ teks: "Pilih dulu satu kartu angka di bawah, lalu ketuk barisnya.", ok: false });
              }}
              className={`flex w-full items-center gap-2 rounded-xl border-2 px-2 py-1 text-base font-black text-[#1C01A5] ${isi[k] !== null ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/60 bg-[#FFFDF2]"} ${goyang === k ? "igil-goyang" : ""}`}
            >
              <BendaSvg jenis={`bola-${w.k}` as JenisBenda} kelas="h-6 w-6" />
              <span>Ada</span>
              <span className={`flex h-8 min-w-[2.2rem] items-center justify-center rounded-lg border-2 ${isi[k] !== null ? "igil-muncul border-[#1C01A5] bg-[#FFE566] text-xl" : "border-dashed border-[#1C01A5]/50 bg-white text-[#1C01A5]/30"}`}>{isi[k] ?? "?"}</span>
              <span>bola {w.k}.</span>
            </button>
          ))}
        </div>
        <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu angka</span>
          {sisaKartu.map((v) => (
            <BendaSeret
              key={v}
              id={`ka-${v}`}
              label={`Kartu angka ${v}`}
              onKetuk={() => setTerpilih(v)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("a8-isi-")) taruh(v, Number(z.slice(7)));
              }}
              gaya={letakMeja(v)}
              kelas="rounded-2xl"
            >
              <span className={`block rounded-2xl border-4 border-[#1C01A5] bg-white px-4 py-1 text-3xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${terpilih === v ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>{v}</span>
            </BendaSeret>
          ))}
          {sisaKartu.length === 0 ? <span className="text-2xl">✅</span> : null}
        </div>
        {penuh && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Bola yang paling {d.tanya} berwarna ...</p>
            <PilihKata opsi={d.warna.map((w) => w.k)} keliru={salah} onPilih={pilih} kolom={d.warna.length > 3 ? 2 : 3} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua bola = ?" : `Paling ${d.tanya}: bola ${kunci.k}, ada ${kunci.n}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahIsiDaftar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_DAFTAR[RONDE_DAFTAR.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Daftar Bola"
      warna="#FDE68A"
      petunjuk="Menulis data dalam daftar. Hitung bola menurut warnanya, lalu seret kartu angka ke baris daftar yang tepat. Setelah itu, cari bola yang paling banyak atau paling sedikit. Pada ronde terakhir, ucapkan jumlah semua bola."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-isi-daftar"
      jumlahRonde={RONDE_DAFTAR.length}
      kunciAkhir={terakhir.warna.reduce((a, b) => a + b.n, 0)}
      belumSiap="Isi daftarnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeIsiDaftar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Pesanan Paman -------------------------------------- */

const SEMUA_MAINAN: JenisMainan[] = ["pesawat", "mobil", "boneka", "bola"];

const RONDE_PESANAN: Partial<Record<JenisMainan, number>>[] = [
  { pesawat: 3, bola: 2 },
  { mobil: 2, boneka: 4, bola: 1 },
  { pesawat: 3, mobil: 4, boneka: 2 },
];

function RondePesanan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const pesanan = RONDE_PESANAN[ronde];
  const akhir = ronde === RONDE_PESANAN.length - 1;
  const total = Object.values(pesanan).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) as number;
  const diminta = SEMUA_MAINAN.filter((j) => (pesanan[j] ?? 0) > 0);
  const [keranjang, setKeranjang] = useState<Record<JenisMainan, number>>({ pesawat: 0, mobil: 0, boneka: 0, bola: 0 });
  const [terpilih, setTerpilih] = useState<JenisMainan | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a8-pesanan"] === true && akhir;
  useBicara(akhir ? suara : beres, `${diminta.map((j) => `Ada ${sebut(pesanan[j] ?? 0)} ${NAMA_WARNA_MAINAN(j)}.`).join(" ")} Pesanan Paman sudah lengkap.${akhir ? ` Jumlah semua mainan ada ${sebut(total)}.` : ""}`);

  const tambah = (j: JenisMainan) => {
    if (beres || keranjang[j] >= 9) return;
    setKeranjang({ ...keranjang, [j]: keranjang[j] + 1 });
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(keranjang[j] + 1));
  };
  const kurangi = (j: JenisMainan) => {
    if (beres || keranjang[j] <= 0) return;
    setKeranjang({ ...keranjang, [j]: keranjang[j] - 1 });
    setKabar(null);
  };
  const periksa = () => {
    if (beres) return;
    const salah = SEMUA_MAINAN.find((j) => keranjang[j] !== (pesanan[j] ?? 0));
    if (!salah) {
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
      return;
    }
    const kurang = keranjang[salah] < (pesanan[salah] ?? 0);
    setKabar({
      teks:
        (pesanan[salah] ?? 0) === 0
          ? `Paman tidak memesan ${NAMA_WARNA_MAINAN(salah)}. Keluarkan dari keranjang.`
          : kurang
            ? `Jumlah ${NAMA_WARNA_MAINAN(salah)} masih kurang. Baca lagi daftar pesanan.`
            : `Jumlah ${NAMA_WARNA_MAINAN(salah)} kelebihan. Keluarkan yang tidak perlu.`,
      ok: false,
    });
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Pesanan lengkap!" : "Penuhi pesanan Paman"}
        teks={`Baca daftar pesanan Paman. Seret mainan dari rak ke keranjang sebanyak yang dipesan, atau ketuk mainannya lalu ketuk keranjang. Tekan periksa kalau sudah selesai.${akhir ? " Di akhir, ucapkan jumlah semua mainan yang dipesan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-base font-black text-[#1C01A5]">
          <p className="text-center text-xs text-[#1C01A5]/70">Daftar Pesanan Paman</p>
          {diminta.map((j) => (
            <p key={j}>
              Ada {pesanan[j]} {NAMA_WARNA_MAINAN(j)}.
            </p>
          ))}
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Rak mainan • seret ke keranjang</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {SEMUA_MAINAN.map((j) => (
              <BendaSeret
                key={j}
                id={`st-${j}`}
                label={`Ambil ${NAMA_WARNA_MAINAN(j)}`}
                aktif={!beres}
                onKetuk={() => setTerpilih(j)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "a8-keranjang") tambah(j);
                }}
                kelas="rounded-full"
              >
                <span className={`flex flex-col items-center rounded-2xl px-1 ${terpilih === j ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <BendaSvg jenis={j as JenisBenda} kelas="h-11 w-11" />
                  <span className="text-[10px] font-black leading-none text-[#1C01A5]">{NAMA_WARNA_MAINAN(j)}</span>
                </span>
              </BendaSeret>
            ))}
          </div>
        </div>
        <button
          type="button"
          data-zona="a8-keranjang"
          aria-label={`Keranjang pesanan, berisi ${SEMUA_MAINAN.reduce((a, j) => a + keranjang[j], 0)} mainan`}
          onClick={() => {
            if (terpilih !== null) tambah(terpilih);
            else if (!beres) setKabar({ teks: "Pilih dulu satu mainan di rak, lalu ketuk keranjang.", ok: false });
          }}
          className="block min-h-[80px] w-full rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-2"
        >
          <span className="block text-center text-sm font-black text-[#1C01A5]">🧺 Keranjang pesanan</span>
          <span className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {SEMUA_MAINAN.filter((j) => keranjang[j] > 0).map((j) => (
              <span key={j} className="inline-flex items-center gap-1 rounded-full border-2 border-[#1C01A5] bg-white px-2 py-0.5">
                <BendaSvg jenis={j as JenisBenda} kelas="h-6 w-6" />
                <span className="text-lg font-black text-[#1C01A5]">× {keranjang[j]}</span>
              </span>
            ))}
            {SEMUA_MAINAN.every((j) => keranjang[j] === 0) ? <span className="text-sm font-black text-[#1C01A5]/50">masih kosong</span> : null}
          </span>
        </button>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {SEMUA_MAINAN.filter((j) => keranjang[j] > 0).map((j) => (
            <button
              key={j}
              type="button"
              aria-label={`Keluarkan satu ${NAMA_WARNA_MAINAN(j)}`}
              onClick={() => kurangi(j)}
              disabled={beres}
              className="rounded-full border-4 border-[#1C01A5] bg-white px-3 py-1 text-xs font-black text-[#1C01A5] disabled:opacity-40"
            >
              ➖ {NAMA_WARNA_MAINAN(j)}
            </button>
          ))}
        </div>
        {!beres ? (
          <button
            type="button"
            aria-label="Periksa pesanan"
            onClick={periksa}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            ✔ Periksa pesanan
          </button>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua mainan pesanan = ?" : `Jumlah semua mainan pesanan = ${total}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPesanan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_PESANAN[RONDE_PESANAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pesanan Paman"
      warna="#C7D2FE"
      petunjuk="Membaca daftar untuk mengambil benda. Seret mainan dari rak ke keranjang sebanyak yang tertulis di daftar pesanan Paman, lalu tekan periksa. Pada ronde terakhir, ucapkan jumlah semua mainan yang dipesan."
      speakGuru={speakGuru}
      panel={panel}
      id="a8-pesanan"
      jumlahRonde={RONDE_PESANAN.length}
      kunciAkhir={Object.values(terakhir).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) as number}
      belumSiap="Penuhi pesanannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePesanan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
