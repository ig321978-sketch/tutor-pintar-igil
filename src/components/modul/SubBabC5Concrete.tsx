"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { Pensil, sebut } from "./belas-a5-dasar";
import {
  BatangSepuluh,
  IkatPensil,
  KubusSatuan,
  NAMA_BENDA5,
  ObjekPuluhan,
  ObjekSatuan,
  kalimatNilai,
  type JenisBenda5,
} from "./nilai-c5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab C, Tahap 4 Concrete: benda nyata. Anak memilah ikatan dan     */
/* benda lepas ke papan nilai tempat, menukar sepuluh kubus dengan satu        */
/* batang, melayani pesanan toko pensil, dan mengisi papan dengan kartu angka. */
/*  1 Sortir ke Papan Nilai Tempat (seret ikatan dan benda lepas)              */
/*  2 Tukar Sepuluh (pilih sepuluh kubus, tukar dengan satu batang)            */
/*  3 Toko Pensil (susun pesanan dari kotak sepuluh dan pensil satuan)         */
/*  4 Papan Kartu Angka (taruh kartu angka di kolom puluhan dan satuan)        */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 1. Sortir ke Papan Nilai Tempat ---------------------- */

type TipeItem = "puluh" | "satu";
type KolomNilai = "puluhan" | "satuan";
type ItemSortir = { id: string; tipe: TipeItem; kolom: KolomNilai | null; warna: number };

const RONDE_SORTIR: { jenis: JenisBenda5; puluh: number; satu: number }[] = [
  { jenis: "pensil", puluh: 1, satu: 3 },
  { jenis: "balok", puluh: 1, satu: 4 },
  { jenis: "kelereng", puluh: 1, satu: 5 },
];

function awalSortir(d: { puluh: number; satu: number }): ItemSortir[] {
  const puluh: ItemSortir[] = Array.from({ length: d.puluh }, (_, i) => ({ id: `p${i}`, tipe: "puluh", kolom: null, warna: i }));
  const satu: ItemSortir[] = Array.from({ length: d.satu }, (_, i) => ({ id: `s${i}`, tipe: "satu", kolom: null, warna: i }));
  return [...satu.slice(0, 1), ...puluh, ...satu.slice(1)];
}

function RondeSortir({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_SORTIR[ronde];
  const akhir = ronde === RONDE_SORTIR.length - 1;
  const nama = NAMA_BENDA5[d.jenis];
  const [item, setItem] = useState<ItemSortir[]>(() => awalSortir(d));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const tumpukan = item.filter((x) => x.kolom === null);
  const beres = tumpukan.length === 0;
  const suara = panel.suara["c5-sortir"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `${d.puluh} ${nama.puluh} adalah ${d.puluh} puluhan. ${d.satu} ${nama.satu} yang lepas adalah ${d.satu} satuan. ${kalimatNilai(d.puluh, d.satu).replace("=", "sama dengan")}.`
  );

  const taruh = (id: string, kolom: KolomNilai) => {
    const yang = item.find((x) => x.id === id);
    if (!yang || yang.kolom !== null || beres) return;
    const benar: KolomNilai = yang.tipe === "puluh" ? "puluhan" : "satuan";
    if (kolom !== benar) {
      setGoyang(id);
      setTerpilih(null);
      setKabar({
        teks:
          yang.tipe === "puluh"
            ? `Satu ${nama.puluh} berisi sepuluh, jadi itu satu puluhan. Taruh di kolom puluhan.`
            : `Satu ${nama.satu} yang sendirian disebut satu satuan. Taruh di kolom satuan.`,
        ok: false,
      });
      return;
    }
    const baru = item.map((x) => (x.id === id ? { ...x, kolom } : x));
    setItem(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(yang.tipe === "puluh" ? "Satu puluhan." : "Satu satuan.");
    if (baru.every((x) => x.kolom !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  const isiKolom = (kolom: KolomNilai) => item.filter((x) => x.kolom === kolom);
  const p = isiKolom("puluhan").length;
  const s = isiKolom("satuan").length;

  const kolomPapan = (kolom: KolomNilai, judul: string, warna: string) => (
    <button
      type="button"
      data-zona={`c5-${kolom}`}
      aria-label={`Kolom ${judul}, berisi ${kolom === "puluhan" ? p : s}`}
      onClick={() => {
        if (terpilih !== null) taruh(terpilih, kolom);
        else ucap(`Kolom ${judul} berisi ${sebut(kolom === "puluhan" ? p : s)}.`);
      }}
      className="block min-h-[132px] w-full rounded-2xl border-4 border-[#1C01A5] bg-white px-1 pb-2 pt-0"
    >
      <span className="mb-1 block rounded-t-lg py-1 text-center text-base font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
        {judul}
      </span>
      <span className="flex flex-wrap items-end justify-center gap-1">
        {item
          .filter((x) => x.kolom === kolom)
          .map((x) => (
            <span key={x.id} className="igil-muncul block">
              {x.tipe === "puluh" ? (
                <ObjekPuluhan jenis={d.jenis} kelas={d.jenis === "balok" ? "h-20 w-9" : "h-14 w-14"} />
              ) : (
                <ObjekSatuan jenis={d.jenis} warna={x.warna} kelas={d.jenis === "pensil" ? "h-11 w-4" : d.jenis === "balok" ? "h-7 w-10" : "h-8 w-8"} />
              )}
            </span>
          ))}
      </span>
      <span className="mt-1 block text-center text-2xl font-black text-[#1C01A5]">{kolom === "puluhan" ? p : s}</span>
    </button>
  );

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semuanya" : suara ? "Hebat!" : beres ? "Papanmu rapi!" : "Pilah ke papan nilai tempat"}
        teks={`Ini ${nama.puluh} dan beberapa ${nama.satu} lepas. Seret setiap benda ke kolom yang tepat, atau ketuk bendanya lalu ketuk kolomnya. Ikatan sepuluh masuk kolom puluhan. Benda yang sendirian masuk kolom satuan.${akhir ? " Setelah rapi, ucapkan banyak benda seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[110px] flex-wrap items-end justify-center gap-3 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          {tumpukan.map((x, i) => (
            <BendaSeret
              key={x.id}
              id={x.id}
              label={x.tipe === "puluh" ? `Satu ${nama.puluh}` : `Satu ${nama.satu}`}
              onKetuk={() => setTerpilih(x.id)}
              onLepas={(_, px, py) => {
                const z = zonaDi(px, py);
                if (z === "c5-puluhan" || z === "c5-satuan") taruh(x.id, z === "c5-puluhan" ? "puluhan" : "satuan");
              }}
              gaya={letakMeja(i)}
              kelas="rounded-2xl"
            >
              <span
                className={`block rounded-2xl p-1 ${terpilih === x.id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${goyang === x.id ? "igil-goyang" : ""}`}
              >
                {x.tipe === "puluh" ? (
                  <ObjekPuluhan jenis={d.jenis} kelas={d.jenis === "balok" ? "h-24 w-10" : "h-16 w-[4.5rem]"} />
                ) : (
                  <ObjekSatuan jenis={d.jenis} warna={x.warna} kelas={d.jenis === "pensil" ? "h-12 w-4" : d.jenis === "balok" ? "h-9 w-12" : "h-9 w-9"} />
                )}
              </span>
            </BendaSeret>
          ))}
          {beres ? <span className="text-4xl">✅</span> : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {kolomPapan("puluhan", "Puluhan", "#FECACA")}
          {kolomPapan("satuan", "Satuan", "#BFDBFE")}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `${d.puluh} puluhan dan ${d.satu} satuan = ?` : kalimatNilai(d.puluh, d.satu)}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSortir({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_SORTIR[RONDE_SORTIR.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Sortir ke Papan Nilai Tempat"
      warna="#FFE566"
      petunjuk="Sepuluh benda yang digabungkan disebut satu puluhan. Benda yang sendirian disebut satuan. Seret ikatan sepuluh ke kolom puluhan, dan benda lepas ke kolom satuan. Pada ronde terakhir, ucapkan banyak benda seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-sortir"
      jumlahRonde={RONDE_SORTIR.length}
      kunciAkhir={terakhir.puluh * 10 + terakhir.satu}
      belumSiap="Pilah semua bendanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSortir ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Tukar Sepuluh ------------------------------------- */

const RONDE_TUKAR = [12, 17, 20];

function RondeTukar({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_TUKAR[ronde];
  const akhir = ronde === RONDE_TUKAR.length - 1;
  const [lepas, setLepas] = useState<number[]>(() => Array.from({ length: n }, (_, i) => i));
  const [pilih, setPilih] = useState<number[]>([]);
  const [batang, setBatang] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = lepas.length < 10;
  const suara = panel.suara["c5-tukar"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Sepuluh kubus satuan ditukar dengan satu batang puluhan. Sekarang ada ${batang} puluhan dan ${lepas.length} satuan. ${kalimatNilai(batang, lepas.length).replace("=", "sama dengan")}.`
  );

  const ketukKubus = (id: number) => {
    if (beres) return;
    if (pilih.includes(id)) {
      setPilih(pilih.filter((x) => x !== id));
      setKabar(null);
      return;
    }
    if (pilih.length >= 10) {
      setKabar({ teks: "Cukup sepuluh kubus. Tekan tombol tukar, atau ketuk kubus yang sudah dipilih untuk melepasnya.", ok: false });
      return;
    }
    setPilih([...pilih, id]);
    setKabar(null);
  };

  const tukar = () => {
    if (beres) return;
    if (pilih.length !== 10) {
      setKabar({
        teks: pilih.length < 10 ? `Baru ${sebut(pilih.length)} kubus terpilih. Pilih tepat sepuluh kubus untuk ditukar.` : "Pilih tepat sepuluh kubus untuk ditukar.",
        ok: false,
      });
      return;
    }
    const sisa = lepas.filter((id) => !pilih.includes(id));
    setLepas(sisa);
    setPilih([]);
    setBatang((b) => b + 1);
    setKabar(null);
    ucap("Sepuluh satuan ditukar menjadi satu puluhan.");
    if (sisa.length < 10) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semuanya" : suara ? "Hebat!" : beres ? "Pertukaranmu selesai!" : "Tukar sepuluh dengan satu"}
        teks={`Ada ${sebut(n)} kubus satuan. Setiap sepuluh kubus bisa ditukar dengan satu batang puluhan. Ketuk sepuluh kubus untuk memilihnya, lalu tekan tombol tukar. Tukar terus sampai kubus yang tersisa kurang dari sepuluh.${akhir ? " Setelah selesai, ucapkan banyak kubus seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-h-[150px] rounded-2xl border-4 border-[#1C01A5] bg-white px-1 pb-2">
            <p className="mb-1 rounded-t-lg bg-[#FECACA] py-1 text-center text-base font-black text-[#1C01A5]">Puluhan</p>
            <div className="flex flex-wrap items-end justify-center gap-1">
              {Array.from({ length: batang }, (_, i) => (
                <span key={i} className="igil-muncul block">
                  <BatangSepuluh kelas="h-24 w-8" />
                </span>
              ))}
            </div>
            <p className="text-center text-2xl font-black text-[#B91C1C]">{batang}</p>
          </div>
          <div className="min-h-[150px] rounded-2xl border-4 border-[#1C01A5] bg-white px-1 pb-2">
            <p className="mb-1 rounded-t-lg bg-[#BFDBFE] py-1 text-center text-base font-black text-[#1C01A5]">Satuan</p>
            <div className="flex flex-wrap items-center justify-center gap-1">
              {lepas.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={pilih.includes(id)}
                  aria-label={`Kubus ${id + 1}${pilih.includes(id) ? ", terpilih" : ""}`}
                  onClick={() => ketukKubus(id)}
                  className="rounded-lg"
                >
                  <KubusSatuan kelas="h-8 w-8" terpilih={pilih.includes(id)} />
                </button>
              ))}
            </div>
            <p className="text-center text-2xl font-black text-[#1D4ED8]">{lepas.length}</p>
          </div>
        </div>
        {!beres ? (
          <>
            <p className="text-center text-base font-black text-[#1C01A5]">Terpilih: {pilih.length} dari 10 kubus</p>
            <button type="button" onClick={tukar} className={TOMBOL_KECIL}>
              🔁 Tukar 10 kubus jadi 1 batang
            </button>
          </>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `${batang} puluhan dan ${lepas.length} satuan = ?` : kalimatNilai(batang, lepas.length)}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTukar({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tukar Sepuluh"
      warna="#FDE68A"
      petunjuk="Sepuluh kubus satuan bisa ditukar dengan satu batang puluhan. Ketuk sepuluh kubus untuk memilihnya, lalu tekan tombol tukar. Tukar terus sampai kubus yang tersisa kurang dari sepuluh. Pada ronde terakhir, ucapkan banyak kubus seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-tukar"
      jumlahRonde={RONDE_TUKAR.length}
      kunciAkhir={RONDE_TUKAR[RONDE_TUKAR.length - 1]}
      belumSiap="Tukar kubusnya sampai selesai dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTukar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Toko Pensil --------------------------------------- */

const RONDE_TOKO: { p: number; s: number; pesan: string; suara: string }[] = [
  { p: 1, s: 6, pesan: "1 puluhan dan 6 satuan pensil", suara: "satu puluhan dan enam satuan pensil" },
  { p: 1, s: 7, pesan: "tujuh belas pensil", suara: "tujuh belas pensil" },
  { p: 1, s: 2, pesan: "dua belas pensil", suara: "dua belas pensil" },
];

function RondeToko({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_TOKO[ronde];
  const akhir = ronde === RONDE_TOKO.length - 1;
  const [kotak, setKotak] = useState(0);
  const [satuan, setSatuan] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const total = d.p * 10 + d.s;
  const suara = panel.suara["c5-toko"] === true && akhir;
  useBicara(akhir ? suara : beres, `Pesanan selesai. ${d.p} kotak sepuluh pensil dan ${d.s} pensil satuan. ${kalimatNilai(d.p, d.s).replace("=", "sama dengan")}.`);

  const tambahKotak = () => {
    if (beres) return;
    if (kotak >= 2) {
      setKabar({ teks: "Keranjang hanya muat dua kotak.", ok: false });
      return;
    }
    setKotak(kotak + 1);
    setKabar(null);
    ucap("Satu kotak, sepuluh pensil.");
  };
  const tambahSatuan = () => {
    if (beres) return;
    if (satuan >= 9) {
      setKabar({ teks: "Sepuluh pensil satuan sudah menjadi satu puluhan. Pakai satu kotak, ya.", ok: false });
      return;
    }
    setSatuan(satuan + 1);
    setKabar(null);
    ucap(sebut(satuan + 1));
  };

  const kirim = () => {
    if (beres) return;
    if (kotak === d.p && satuan === d.s) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    if (kotak !== d.p) {
      setKabar({ teks: "Periksa banyak kotaknya. Satu kotak berisi sepuluh pensil, itu satu puluhan.", ok: false });
    } else {
      setKabar({ teks: "Kotaknya sudah tepat. Periksa banyak pensil satuannya.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: banyak pensil" : suara ? "Hebat!" : beres ? "Pesanan terkirim!" : "Layani pesanan"}
        teks={`Pelanggan memesan ${d.suara}. Ketuk kotak untuk menambah satu puluhan. Ketuk pensil satuan untuk menambah satu satuan. Ketuk isi keranjang untuk mengurangi. Lalu tekan kirim pesanan.${akhir ? " Setelah terkirim, ucapkan banyak pensil seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-center text-lg font-black leading-snug text-[#1C01A5]">
          📝 Pesanan: {d.pesan}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            aria-label="Tambah satu kotak berisi sepuluh pensil"
            onClick={tambahKotak}
            className="flex flex-col items-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-1 py-2 shadow-[0_4px_0_rgba(28,1,165,0.25)]"
          >
            <IkatPensil kelas="h-16 w-[4.5rem]" />
            <span className="text-sm font-black text-[#1C01A5]">Kotak 10 pensil</span>
          </button>
          <button
            type="button"
            aria-label="Tambah satu pensil satuan"
            onClick={tambahSatuan}
            className="flex flex-col items-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-1 py-2 shadow-[0_4px_0_rgba(28,1,165,0.25)]"
          >
            <Pensil warna={1} kelas="h-16 w-5" />
            <span className="text-sm font-black text-[#1C01A5]">Pensil satuan</span>
          </button>
        </div>
        <div className="min-h-[96px] rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <p className="mb-1 text-center text-sm font-black text-[#1C01A5]">🧺 Keranjang</p>
          <div className="flex flex-wrap items-end justify-center gap-2">
            {Array.from({ length: kotak }, (_, i) => (
              <button
                key={`k${i}`}
                type="button"
                aria-label="Keluarkan satu kotak dari keranjang"
                onClick={() => {
                  if (!beres) setKotak((k) => k - 1);
                }}
                className="igil-muncul rounded-xl"
              >
                <IkatPensil kelas="h-14 w-16" />
              </button>
            ))}
            {Array.from({ length: satuan }, (_, i) => (
              <button
                key={`s${i}`}
                type="button"
                aria-label="Keluarkan satu pensil dari keranjang"
                onClick={() => {
                  if (!beres) setSatuan((s) => s - 1);
                }}
                className="igil-muncul rounded-lg"
              >
                <Pensil warna={1} kelas="h-12 w-4" />
              </button>
            ))}
            {kotak === 0 && satuan === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">masih kosong</span> : null}
          </div>
          <p className="mt-1 text-center text-lg font-black text-[#1C01A5]">
            {kotak} puluhan dan {satuan} satuan
          </p>
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `${d.p} puluhan dan ${d.s} satuan = ?` : `${kalimatNilai(d.p, d.s)} (${total} pensil)`}
          </p>
        ) : (
          <button
            type="button"
            onClick={kirim}
            className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
          >
            📨 Kirim pesanan
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahToko({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TOKO[RONDE_TOKO.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Toko Pensil"
      warna="#BBF7D0"
      petunjuk="Layani pesanan pelanggan. Satu kotak berisi sepuluh pensil, itu satu puluhan. Pensil yang sendirian adalah satuan. Ketuk kotak dan pensil satuan untuk mengisi keranjang, lalu kirim pesanan. Pada ronde terakhir, ucapkan banyak pensil seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-toko"
      jumlahRonde={RONDE_TOKO.length}
      kunciAkhir={terakhir.p * 10 + terakhir.s}
      belumSiap="Kirim pesanannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeToko ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Papan Kartu Angka --------------------------------- */

const RONDE_PAPAN: { jenis: JenisBenda5; p: number; s: number; kartu: number[] }[] = [
  { jenis: "kelereng", p: 1, s: 3, kartu: [1, 3, 2, 5] },
  { jenis: "pensil", p: 1, s: 2, kartu: [2, 1, 4, 0] },
  { jenis: "balok", p: 1, s: 8, kartu: [8, 1, 9, 2] },
];

function RondePapan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_PAPAN[ronde];
  const akhir = ronde === RONDE_PAPAN.length - 1;
  const nama = NAMA_BENDA5[d.jenis];
  const [selP, setSelP] = useState<number | null>(null);
  const [selS, setSelS] = useState<number | null>(null);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = selP !== null && selS !== null;
  const suara = panel.suara["c5-papan"] === true && akhir;
  useBicara(akhir ? suara : beres, `${kalimatNilai(d.p, d.s).replace("=", "sama dengan")}. Angka ${d.p} di kiri adalah puluhan, angka ${d.s} di kanan adalah satuan.`);

  const taruh = (v: number, kolom: "p" | "s") => {
    if (beres) return;
    if ((kolom === "p" && selP !== null) || (kolom === "s" && selS !== null)) return;
    const benar = kolom === "p" ? d.p : d.s;
    if (v !== benar) {
      setGoyang(kolom);
      setTerpilih(null);
      setKabar({
        teks:
          kolom === "p"
            ? `Satu ${nama.puluh} berisi sepuluh dan disebut satu puluhan. Hitung dulu ada berapa ${nama.puluh}.`
            : `Hitung ${nama.satu} yang lepas, yang tidak ikut digabung. Itulah banyak satuan.`,
        ok: false,
      });
      return;
    }
    if (kolom === "p") setSelP(v);
    else setSelS(v);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(kolom === "p" ? `${sebut(v)} puluhan.` : `${sebut(v)} satuan.`);
    const baruP = kolom === "p" ? v : selP;
    const baruS = kolom === "s" ? v : selS;
    if (baruP !== null && baruS !== null) {
      letusan.picu();
      onBeres();
    }
  };

  const kartuSisa = d.kartu.filter((v) => v !== selP && v !== selS);

  const sel = (kolom: "p" | "s", judul: string, nilai: number | null, warna: string, warnaAngka: string) => (
    <button
      key={kolom}
      type="button"
      data-zona={`c5-papan-${kolom}`}
      aria-label={`Kolom ${judul}, ${nilai === null ? "kosong" : nilai}`}
      onClick={() => {
        if (nilai === null && terpilih !== null) taruh(terpilih, kolom);
        else if (nilai === null) setKabar({ teks: "Pilih dulu satu kartu angka di bawah, lalu ketuk kolomnya.", ok: false });
      }}
      className={`block rounded-2xl border-4 border-[#1C01A5] bg-white px-1 pb-2 pt-0 ${goyang === kolom ? "igil-goyang" : ""}`}
    >
      <span className="mb-1 block rounded-t-lg py-1 text-center text-base font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>
        {judul}
      </span>
      <span className={`flex h-16 items-center justify-center text-5xl font-black ${warnaAngka} ${nilai === null ? "rounded-xl border-4 border-dashed border-[#1C01A5]/50 bg-[#FFFDF2]" : "igil-muncul"}`}>
        {nilai === null ? "" : nilai}
      </span>
    </button>
  );

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: bilangannya" : suara ? "Hebat!" : beres ? "Papanmu benar!" : "Isi papan dengan kartu angka"}
        teks={`Hitung dulu ${nama.puluh} dan ${nama.satu} lepas di gambar. Lalu seret kartu angka ke kolom puluhan dan kolom satuan, atau ketuk kartunya lalu ketuk kolomnya.${akhir ? " Setelah papan benar, ucapkan bilangan yang ditunjukkan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[110px] flex-wrap items-end justify-center gap-3 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          {Array.from({ length: d.p }, (_, i) => (
            <ObjekPuluhan key={`p${i}`} jenis={d.jenis} kelas={d.jenis === "balok" ? "h-24 w-10" : "h-16 w-[4.5rem]"} />
          ))}
          {Array.from({ length: d.s }, (_, i) => (
            <span key={`s${i}`} className="block" style={letakMeja(i)}>
              <ObjekSatuan jenis={d.jenis} warna={i} kelas={d.jenis === "pensil" ? "h-12 w-4" : d.jenis === "balok" ? "h-9 w-12" : "h-9 w-9"} />
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sel("p", "Puluhan", selP, "#FECACA", "text-[#B91C1C]")}
          {sel("s", "Satuan", selS, "#BFDBFE", "text-[#1D4ED8]")}
        </div>
        <div className="flex min-h-[72px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu angka</span>
          {kartuSisa.map((v) => (
            <BendaSeret
              key={v}
              id={`kartu-${v}`}
              label={`Kartu angka ${v}`}
              onKetuk={() => setTerpilih(v)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z === "c5-papan-p") taruh(v, "p");
                else if (z === "c5-papan-s") taruh(v, "s");
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
            {akhir && !suara ? `${d.p} puluhan dan ${d.s} satuan = ?` : kalimatNilai(d.p, d.s)}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPapan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_PAPAN[RONDE_PAPAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Papan Kartu Angka"
      warna="#FBCFE8"
      petunjuk="Hitung ikatan sepuluh dan benda lepas di gambar. Banyak ikatan adalah angka puluhan, banyak benda lepas adalah angka satuan. Taruh kartu angka yang tepat di kolom puluhan dan kolom satuan. Pada ronde terakhir, ucapkan bilangan yang ditunjukkan papan."
      speakGuru={speakGuru}
      panel={panel}
      id="c5-papan"
      jumlahRonde={RONDE_PAPAN.length}
      kunciAkhir={terakhir.p * 10 + terakhir.s}
      belumSiap="Isi papannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePapan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
