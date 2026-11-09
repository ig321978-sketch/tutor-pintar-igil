"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import { BatangPuluhan, KubusSatuan, sebut } from "./dasar-k2";
import { BarisJambu, JambuAir, KotakSoal } from "./dasar-k2b2";
import { Berhasil, Pencacah, PilihanAngka, TOMBOL_BESAR } from "./permainan-k2b2";
import { RONDE_GABUNG_A, RONDE_NERACA_A, RONDE_PETIK_A, RONDE_PINDAH_A, bagianHilang, opsiB2, puluhanDari, satuanDari } from "./data-k2b2";
import { BIRU } from "./CeritaBandingB";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab A, Tahap 4 Concrete: benda nyata untuk penjumlahan.   */
/* Jambu air, balok Dienes (batang puluhan dan kubus satuan), dan neraca.      */
/*  1 Petik Jambu Air (ketuk dan hitung maju)                                 */
/*  2 Gabung Balok (seret kubus ke kolom Satuan)                              */
/*  3 Mesin Pindah Sepuluh (tukar 10 satuan jadi 1 puluhan)                   */
/*  4 Neraca Jambu (seimbangkan dua sisi yang sama nilainya)                  */
/* ------------------------------------------------------------------------ */

type Ronde = { ronde: number; panel: PanelSuara; onBeres: () => void };

/* --------- Permainan 1. Petik Jambu Air ----------------------------------- */

function RondePetik({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_PETIK_A[ronde];
  const akhir = ronde === RONDE_PETIK_A.length - 1;
  const [petik, setPetik] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2a-petik"] === true && akhir;
  const semuaDipetik = petik >= b;
  useBicara(akhir ? suara : beres, `${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(a + b)}. Kita menghitung maju dari ${sebut(a)}.`);

  const ambil = () => {
    if (beres || semuaDipetik) return;
    const n = petik + 1;
    setPetik(n);
    setKabar(null);
    ucap(sebut(a + n));
  };
  const jawab = (n: number) => {
    if (n === a + b) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Mulai dari ${sebut(a)}, lalu hitung maju ${sebut(b)} kali. Ketuk jambu dan dengarkan bilangannya.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlahnya" : "Hitung majumu tepat!") : semuaDipetik ? "Berapa jumlahnya?" : `Petik ${b} jambu lagi`}
        teks={`Keranjang Tika sudah berisi ${sebut(a)} jambu air. Kira memetik ${sebut(b)} jambu lagi. Ketuk jambu di pohon satu per satu, dan dengarkan hitungan majunya. Setelah semuanya dipetik, pilih jumlah jambu di keranjang.${akhir ? " Terakhir, ucapkan jumlahnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {a} + {b} = ?
        </KotakSoal>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-3xl border-4 border-[#16A34A] bg-[#DCFCE7] px-2 py-2" role="group" aria-label={`Pohon jambu berisi ${b - petik} jambu`}>
            <p className="mb-1 text-center text-xs font-black text-[#14532D]">🌳 Pohon jambu</p>
            <div className="flex min-h-[88px] flex-wrap items-center justify-center gap-1">
              {Array.from({ length: b - petik }, (_, i) => (
                <button key={i} type="button" aria-label={`Petik jambu ke-${petik + i + 1}`} onClick={ambil} className="igil-tanpa-tepi igil-lompat rounded-xl p-0.5 active:scale-90">
                  <JambuAir kelas="h-9 w-9" />
                </button>
              ))}
              {b - petik === 0 ? <span className="text-center text-sm font-black text-[#14532D]">Semua sudah dipetik</span> : null}
            </div>
          </div>
          <div className="rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2" role="group" aria-label={`Keranjang berisi ${a + petik} jambu`}>
            <p className="mb-1 flex items-center justify-between text-xs font-black text-[#7C2D12]">
              <span>🧺 Keranjang</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{a + petik}</span>
            </p>
            <BarisJambu n={a + petik} sorot={Array.from({ length: petik }, (_, i) => a + i)} kelas="h-5 w-5" />
          </div>
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
          Hitung maju: {a}
          {Array.from({ length: petik }, (_, i) => ` → ${a + i + 1}`).join("")}
        </p>
        {semuaDipetik && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa jumlah jambu di keranjang?</p>
            <PilihanAngka opsi={opsiB2(a + b)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {a} + {b} = {akhir && !suara ? "?" : a + b}. Hitung maju dari {a}.
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPetikK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Petik Jambu Air"
      warna="#BBF7D0"
      petunjuk="Ketuk jambu di pohon satu per satu. Keranjang sudah berisi jambu, jadi kita menghitung maju dari banyak jambu itu. Setelah semuanya dipetik, pilih jumlah jambu di keranjang. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-petik"
      jumlahRonde={RONDE_PETIK_A.length}
      kunciAkhir={RONDE_PETIK_A[RONDE_PETIK_A.length - 1].a + RONDE_PETIK_A[RONDE_PETIK_A.length - 1].b}
      belumSiap="Petik semua jambu dan pilih jumlahnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePetik ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Gabung Balok -------------------------------------- */

function RondeGabung({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_GABUNG_A[ronde];
  const pa = puluhanDari(a);
  const sa = satuanDari(a);
  const akhir = ronde === RONDE_GABUNG_A.length - 1;
  const [pindah, setPindah] = useState(0);
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [goyang, setGoyang] = useState(0);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2a-gabung"] === true && akhir;
  const semua = pindah >= b;
  useBicara(akhir ? suara : beres, `${sebut(a)} ditambah ${sebut(b)}. Satuan: ${sebut(sa)} ditambah ${sebut(b)} sama dengan ${sebut(sa + b)}. Puluhan: ${sebut(pa)}. Hasilnya ${sebut(a + b)}.`);

  const taruh = (zona: string | null) => {
    if (beres || semua) return;
    if (zona === "k2b2a-gabung-s") {
      const n = pindah + 1;
      setPindah(n);
      setKabar(null);
      ucap(sebut(sa + n));
    } else if (zona === "k2b2a-gabung-p") {
      setGoyang((g) => g + 1);
      setKabar({ teks: "Kubus satuan harus ke kolom Satuan, yang di sebelah kanan. Satuan dijumlahkan dengan satuan.", ok: false });
    }
  };

  const kunci = [sa + b, pa, a + b][tahap];
  const jawab = (n: number) => {
    if (n !== kunci) {
      setKeliru(n);
      setKabar({
        teks: tahap === 0 ? `Hitung satuannya: ${sebut(sa)} ditambah ${sebut(b)}.` : tahap === 1 ? "Lihat berapa batang puluhan di kolom Puluhan." : `Gabungkan ${sebut(pa)} puluhan dan ${sebut(sa + b)} satuan.`,
        ok: false,
      });
      return;
    }
    setKeliru(null);
    setKabar(null);
    if (tahap < 2) {
      setTahap((tahap + 1) as 1 | 2);
      return;
    }
    setBeres(true);
    letusan.picu();
    onBeres();
  };
  const pertanyaan = ["Ada berapa satuan sekarang?", "Ada berapa puluhan?", "Berapa hasil seluruhnya?"][tahap];

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: hasilnya" : "Gabunganmu tepat!") : !semua ? "Seret kubus ke Satuan" : pertanyaan}
        teks={`Papan sudah berisi bilangan ${sebut(a)}: ${sebut(pa)} puluhan dan ${sebut(sa)} satuan. Seret kubus satuan milik Kira, satu per satu, ke kolom Satuan. Ingat, satuan dijumlahkan dengan satuan. Atau ketuk kubusnya. Setelah semua kubus pindah, jawab pertanyaannya.${akhir ? " Terakhir, ucapkan hasilnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {a} + {b} = ?
        </KotakSoal>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <span className="text-sm font-black text-[#1C01A5]">Balok Kira ({b - pindah}):</span>
          {Array.from({ length: b - pindah }, (_, i) => (
            <BendaSeret
              key={`${pindah}-${i}`}
              id={`kira-${i}`}
              label={`Kubus satuan Kira ke-${pindah + i + 1}`}
              onKetuk={() => taruh("k2b2a-gabung-s")}
              onLepas={(_, x, y) => taruh(zonaDi(x, y))}
              kelas="rounded-xl"
            >
              <KubusSatuan kelas="h-9 w-9" warna="#EC4899" />
            </BendaSeret>
          ))}
          {semua ? <span className="text-sm font-black text-[#14532D]">Semua kubus sudah pindah</span> : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div
            data-zona="k2b2a-gabung-p"
            key={`p-${goyang}`}
            className={`min-h-[132px] rounded-3xl border-4 border-[#1C01A5] bg-[#FECACA] px-2 py-2 ${goyang > 0 ? "igil-goyang" : ""}`}
            role="group"
            aria-label={`Kolom Puluhan berisi ${pa} batang`}
          >
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Puluhan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{pa}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-1">
              {Array.from({ length: pa }, (_, i) => (
                <BatangPuluhan key={i} kelas="h-16 w-4" />
              ))}
            </div>
          </div>
          <div data-zona="k2b2a-gabung-s" className="min-h-[132px] rounded-3xl border-4 border-[#1C01A5] bg-[#BFDBFE] px-2 py-2" role="group" aria-label={`Kolom Satuan berisi ${sa + pindah} kubus`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Satuan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{sa + pindah}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-0.5">
              {Array.from({ length: sa }, (_, i) => (
                <KubusSatuan key={`a${i}`} kelas="h-7 w-7" />
              ))}
              {Array.from({ length: pindah }, (_, i) => (
                <span key={`b${i}`} className="igil-muncul">
                  <KubusSatuan kelas="h-7 w-7" warna="#EC4899" />
                </span>
              ))}
            </div>
          </div>
        </div>
        {semua && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">{pertanyaan}</p>
            <PilihanAngka key={tahap} opsi={opsiB2(kunci)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {pa} puluhan + {sa + b} satuan = {akhir && !suara ? "?" : a + b}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahGabungK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_GABUNG_A[RONDE_GABUNG_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Gabung Balok"
      warna="#FECACA"
      petunjuk="Papan sudah berisi bilangan pertama. Seret kubus satuan milik Kira ke kolom Satuan, satu per satu. Satuan dijumlahkan dengan satuan. Lalu jawab berapa satuan, berapa puluhan, dan berapa hasilnya. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-gabung"
      jumlahRonde={RONDE_GABUNG_A.length}
      kunciAkhir={akhir.a + akhir.b}
      belumSiap="Pindahkan semua kubus dan jawab pertanyaannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGabung ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Mesin Pindah Sepuluh ------------------------------ */

function RondePindah({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_PINDAH_A[ronde];
  const pa = puluhanDari(a);
  const sa = satuanDari(a);
  const akhir = ronde === RONDE_PINDAH_A.length - 1;
  const [tambahan, setTambahan] = useState(0);
  const [sudahPindah, setSudahPindah] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2a-pindah"] === true && akhir;
  const satuan = sa + tambahan - (sudahPindah ? 10 : 0);
  const puluhan = pa + (sudahPindah ? 1 : 0);
  const penuh = !sudahPindah && satuan === 10;
  useBicara(akhir ? suara : beres, `${sebut(sa)} ditambah ${sebut(b)} sama dengan sepuluh satuan. Sepuluh satuan sama dengan satu puluhan. Jadi ${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(a + b)}.`);

  const tambah = () => {
    if (beres || tambahan >= b) return;
    const n = tambahan + 1;
    setTambahan(n);
    setKabar(null);
    ucap(sebut(sa + n));
  };
  const pindahkan = () => {
    setSudahPindah(true);
    ucap("Sepuluh satuan ditukar menjadi satu puluhan dan dipindahkan ke kolom puluhan.");
  };
  const jawab = (n: number) => {
    if (n === a + b) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Lihat papan: ${sebut(puluhan)} puluhan dan ${sebut(satuan)} satuan. Gabungkan nilainya.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: hasilnya" : "Pindahmu tepat!") : penuh ? "Sepuluh satuan! Pindahkan!" : sudahPindah ? "Berapa hasilnya?" : `Tambah ${b} kubus satuan`}
        teks={`Papan berisi bilangan ${sebut(a)}. Tekan tombol tambah untuk menambah ${sebut(b)} kubus satuan, satu per satu. Kalau satuan genap sepuluh, tekan tombol pindah supaya sepuluh satuan berubah menjadi satu puluhan. Lalu pilih hasilnya.${akhir ? " Terakhir, ucapkan hasilnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {a} + {b} = ?
        </KotakSoal>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-h-[132px] rounded-3xl border-4 border-[#1C01A5] bg-[#FECACA] px-2 py-2" role="group" aria-label={`Kolom Puluhan berisi ${puluhan} batang`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Puluhan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{puluhan}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-1">
              {Array.from({ length: puluhan }, (_, i) => (
                <span key={`${i}-${sudahPindah}`} className={sudahPindah && i === puluhan - 1 ? "igil-muncul" : ""}>
                  <BatangPuluhan kelas="h-16 w-4" />
                </span>
              ))}
            </div>
          </div>
          <div className={`min-h-[132px] rounded-3xl border-4 bg-[#BFDBFE] px-2 py-2 ${penuh ? "igil-denyut border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]"}`} role="group" aria-label={`Kolom Satuan berisi ${satuan} kubus`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Satuan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{satuan}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-0.5">
              {Array.from({ length: satuan }, (_, i) => (
                <span key={i} className={!sudahPindah && i >= sa ? "igil-muncul" : ""}>
                  <KubusSatuan kelas="h-7 w-7" warna={i >= sa && !sudahPindah ? "#EC4899" : "#3B82F6"} />
                </span>
              ))}
            </div>
          </div>
        </div>
        {!sudahPindah && !beres ? (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={tambah} disabled={tambahan >= b} className={TOMBOL_BESAR}>
              ➕ Tambah 1 kubus ({b - tambahan})
            </button>
            <button type="button" onClick={pindahkan} disabled={!penuh} className={`${TOMBOL_BESAR} ${penuh ? "igil-lompat !bg-[#F0AB00]" : ""}`}>
              🔁 Pindah 10 satuan
            </button>
          </div>
        ) : null}
        {sudahPindah && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {puluhan} puluhan dan {satuan} satuan. Berapa hasilnya?
            </p>
            <PilihanAngka opsi={opsiB2(a + b)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {sa} + {b} = 10 satuan = 1 puluhan. {a} + {b} = {akhir && !suara ? "?" : a + b}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPindahK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_PINDAH_A[RONDE_PINDAH_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Mesin Pindah Sepuluh"
      warna="#FDE68A"
      petunjuk="Tambahkan kubus satuan satu per satu. Kalau satuan genap sepuluh, tekan tombol pindah supaya sepuluh satuan berubah menjadi satu puluhan di kolom Puluhan. Lalu pilih hasilnya. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-pindah"
      jumlahRonde={RONDE_PINDAH_A.length}
      kunciAkhir={akhir.a + akhir.b}
      belumSiap="Tambah kubus, pindahkan sepuluh satuan, lalu pilih hasilnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePindah ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Neraca Jambu -------------------------------------- */

function Neraca({ kiri, kanan }: { kiri: number; kanan: number }) {
  const sudut = Math.max(-14, Math.min(14, (kanan - kiri) * 2.6));
  return (
    <svg viewBox="0 0 300 146" className="mx-auto block h-auto w-full max-w-[320px]" role="img" aria-label={kiri === kanan ? "Neraca seimbang" : kiri > kanan ? "Neraca miring ke kiri, piring kiri lebih berat" : "Neraca miring ke kanan, piring kanan lebih berat"}>
      <path d="M150 104 V58" stroke={BIRU} strokeWidth="7" strokeLinecap="round" />
      <path d="M120 108 H180" stroke={BIRU} strokeWidth="9" strokeLinecap="round" />
      <g style={{ transform: `rotate(${sudut}deg)`, transformOrigin: "150px 54px", transition: "transform .5s ease-out" }}>
        <path d="M44 54 H256" stroke={BIRU} strokeWidth="7" strokeLinecap="round" />
        <circle cx="150" cy="54" r="8" fill="#FFE566" stroke={BIRU} strokeWidth="3" />
        <path d="M44 54 L26 88 H62 Z M256 54 L238 88 H274 Z" fill="none" stroke={BIRU} strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M18 88 Q44 112 70 88 Z" fill="#FBCFE8" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
        <path d="M230 88 Q256 112 282 88 Z" fill="#BFDBFE" stroke={BIRU} strokeWidth="3" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function RondeNeraca({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const r = RONDE_NERACA_A[ronde];
  const kunci = bagianHilang(r);
  const akhir = ronde === RONDE_NERACA_A.length - 1;
  const [k, setK] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2a-neraca"] === true && akhir;
  const kiri = r.x + r.y;
  const kanan = r.z + k;
  useBicara(akhir ? suara : beres, `${sebut(r.x)} ditambah ${sebut(r.y)} sama dengan ${sebut(kiri)}. ${sebut(r.z)} ditambah ${sebut(kunci)} juga sama dengan ${sebut(kiri)}. Kedua sisi seimbang, jadi tanda sama dengan benar.`);

  const ubah = (n: number) => {
    setK(n);
    setKabar(null);
    ucap(sebut(r.z + n));
  };
  const periksa = () => {
    if (kanan === kiri) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    setKabar({
      teks:
        kanan < kiri
          ? `Piring kanan masih lebih ringan. Isinya ${sebut(kanan)}, sedangkan piring kiri ${sebut(kiri)}. Tambah jambu di piring kanan.`
          : `Piring kanan terlalu berat. Isinya ${sebut(kanan)}, sedangkan piring kiri ${sebut(kiri)}. Kurangi jambu di piring kanan.`,
      ok: false,
    });
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlah tiap piring" : "Neracamu seimbang!") : "Seimbangkan neracanya"}
        teks={`Piring kiri berisi ${sebut(r.x)} jambu dan ${sebut(r.y)} jambu. Piring kanan berisi ${sebut(r.z)} jambu dan beberapa jambu lagi. Tekan tambah atau kurang untuk mengatur jambu di piring kanan sampai neraca seimbang. Lalu tekan periksa.${akhir ? " Terakhir, ucapkan jumlah jambu di tiap piring." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {r.x} + {r.y} = {r.z} + {beres ? kunci : "?"}
        </KotakSoal>
        <Neraca kiri={kiri} kanan={kanan} />
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2 text-center" role="group" aria-label={`Piring kiri: ${r.x} jambu dan ${r.y} jambu`}>
            <p className="text-xs font-black text-[#831843]">Piring kiri = {kiri}</p>
            <BarisJambu n={r.x} kelas="h-5 w-5" />
            <p className="text-lg font-black text-[#1C01A5]">+</p>
            <BarisJambu n={r.y} kelas="h-5 w-5" warna="#F59E0B" />
          </div>
          <div className="rounded-3xl border-4 border-[#2563EB] bg-[#EFF6FF] px-2 py-2 text-center" role="group" aria-label={`Piring kanan: ${r.z} jambu dan ${k} jambu tambahan`}>
            <p className="text-xs font-black text-[#1E3A8A]">Piring kanan = {kanan}</p>
            <BarisJambu n={r.z} kelas="h-5 w-5" />
            <p className="text-lg font-black text-[#1C01A5]">+</p>
            {k > 0 ? <BarisJambu n={k} kelas="h-5 w-5" warna="#F59E0B" sorot={Array.from({ length: k }, (_, i) => i)} /> : <p className="text-sm font-black text-[#1C01A5]/60">belum ada</p>}
          </div>
        </div>
        {!beres ? (
          <>
            <Pencacah nilai={k} min={0} max={12} onUbah={ubah} label="jambu di piring kanan" />
            <button type="button" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              ✔ Periksa
            </button>
          </>
        ) : (
          <Berhasil>
            {r.x} + {r.y} = {akhir && !suara ? "?" : kiri} dan {r.z} + {kunci} = {akhir && !suara ? "?" : kiri}. Dua cara menulis, nilainya sama.
          </Berhasil>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahNeracaK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_NERACA_A[RONDE_NERACA_A.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Neraca Jambu"
      warna="#C7D2FE"
      petunjuk="Atur jambu di piring kanan dengan tombol tambah dan kurang, sampai neraca seimbang. Tanda sama dengan berarti kedua sisi nilainya sama. Lalu tekan periksa. Pada soal terakhir, ucapkan jumlah jambu di tiap piring."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-neraca"
      jumlahRonde={RONDE_NERACA_A.length}
      kunciAkhir={akhir.x + akhir.y}
      belumSiap="Seimbangkan neracanya dan tekan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeNeraca ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
