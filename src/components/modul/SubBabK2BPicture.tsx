"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { Ikatan } from "./belas-a5-dasar";
import { GarisBilanganK2, ModelBatang, TabelNilaiTempat, sebut } from "./dasar-k2";
import { RONDE_CARA_K2, RONDE_GARISB_K2, RONDE_TABEL_K2, nilaiKandidat, uraiK2 } from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab B, Tahap 5 Picture: diagram saja. Tidak ada gambar    */
/* benda. Model batang polos, tabel nilai tempat, garis bilangan, dan bagan    */
/* pasangan. Anak mengisi, menunjuk, dan memilih. Anak tidak memindahkan benda.*/
/*  5 Isi Tabel dari Batang dan Kotak (mengisi tabel nilai tempat)            */
/*  6 Tempatkan di Garis Bilangan (menunjuk puluhan lalu satuan)              */
/*  7 Pilih Semua Cara yang Benar (memilih bagan pasangan yang cocok)         */
/* ------------------------------------------------------------------------ */

const TOMBOL_PERIKSA =
  "mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]";

/* --------- Permainan 5. Isi Tabel dari Batang dan Kotak ------------------- */

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_TABEL_K2[ronde];
  const { puluhan, satuan } = uraiK2(n);
  const akhir = ronde === RONDE_TABEL_K2.length - 1;
  const [isiP, setIsiP] = useState<number | null>(null);
  const [isiS, setIsiS] = useState<number | null>(null);
  const [aktif, setAktif] = useState<"p" | "s">("p");
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b-tabel"] === true && akhir;
  useBicara(akhir ? suara : beres, `Ada ${sebut(puluhan)} batang puluhan dan ${sebut(satuan)} kotak satuan. Tulis ${puluhan} di kolom puluhan dan ${satuan} di kolom satuan. Bilangannya ${sebut(n)}.`);

  const taruhAngka = (a: number) => {
    if (beres) return;
    if (aktif === "p") {
      setIsiP(a);
      setAktif("s");
    } else {
      setIsiS(a);
    }
    setKabar(null);
  };

  const periksa = () => {
    if (isiP === null || isiS === null) {
      setKabar({ teks: "Isi dua kolomnya dulu: kolom puluhan dan kolom satuan.", ok: false });
      return;
    }
    if (isiP === puluhan && isiS === satuan) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    const bagian: string[] = [];
    if (isiP !== puluhan) bagian.push("Hitung lagi banyak batang untuk kolom puluhan.");
    if (isiS !== satuan) bagian.push("Hitung lagi banyak kotak kecil untuk kolom satuan.");
    setKabar({ teks: bagian.join(" "), ok: false });
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangannya" : "Tabelmu tepat!") : "Isi tabel nilai tempat"}
        teks={`Hitung batang dan kotak kecil pada gambar. Satu batang berarti satu puluhan. Satu kotak kecil berarti satu satuan. Ketuk kolom Puluhan, lalu pilih angkanya. Lalu isi kolom Satuan. Setelah itu tekan Periksa.${akhir ? " Terakhir, ucapkan bilangan yang terbentuk." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-2">
          <ModelBatang p={puluhan} s={satuan} />
          <p className="pt-1 text-center text-xs font-black text-[#1C01A5]/80">1 batang = 1 puluhan • 1 kotak kecil = 1 satuan</p>
        </div>
        <TabelNilaiTempat
          p={isiP === null ? "?" : isiP}
          s={isiS === null ? "?" : isiS}
          total={beres ? (akhir && !suara ? "?" : n) : "?"}
          nyala={beres ? null : aktif}
          onKlik={(kolom) => (beres ? undefined : setAktif(kolom))}
        />
        {beres ? null : (
          <div className="space-y-1.5">
            <p className="text-center text-sm font-black text-[#1C01A5]">Pilih angka untuk kolom {aktif === "p" ? "Puluhan" : "Satuan"}</p>
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 10 }, (_, a) => (
                <button key={a} type="button" aria-label={`Angka ${a}`} onClick={() => taruhAngka(a)} className="rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] py-2 text-2xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5">
                  {a}
                </button>
              ))}
            </div>
            <button type="button" onClick={periksa} className={TOMBOL_PERIKSA}>
              ✔ Periksa
            </button>
          </div>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {puluhan} puluhan dan {satuan} satuan = {akhir && !suara ? "?" : n}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTabelK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Tabel dari Batang"
      warna="#FBCFE8"
      petunjuk="Hitung batang dan kotak kecil pada diagram. Satu batang berarti satu puluhan, satu kotak berarti satu satuan. Isi tabel nilai tempat dengan memilih angka, lalu tekan Periksa. Pada soal terakhir, ucapkan bilangan yang terbentuk."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-tabel"
      jumlahRonde={RONDE_TABEL_K2.length}
      kunciAkhir={RONDE_TABEL_K2[RONDE_TABEL_K2.length - 1]}
      belumSiap="Isi tabelnya dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tempatkan di Garis Bilangan ----------------------- */

function RondeGarisB({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_GARISB_K2[ronde];
  const { puluhan, satuan } = uraiK2(n);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilihanP, setPilihanP] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  useBicara(beres, `${sebut(puluhan)} puluhan dan ${sebut(satuan)} satuan ada di bilangan ${sebut(n)}. Mulai dari ${sebut(puluhan * 10)}, lalu maju ${sebut(satuan)} langkah.`);

  const pilihPuluhan = (m: number) => {
    if (m === puluhan * 10) {
      setPilihanP(m);
      setTahap(1);
      setKabar(null);
    } else {
      setKabar({ teks: `Itu ${sebut(m / 10)} puluhan. Kita cari ${sebut(puluhan)} puluhan, yaitu ${sebut(puluhan * 10)}. Mulai dari ${sebut(puluhan * 10)}.`, ok: false });
    }
  };

  const pilihSatuan = (m: number) => {
    if (m === n) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKabar({ teks: m < n ? `Itu ${sebut(m)}, masih kurang. Dari ${sebut(puluhan * 10)}, majulah ${sebut(satuan)} langkah.` : `Itu ${sebut(m)}, terlalu jauh. Dari ${sebut(puluhan * 10)}, majulah hanya ${sebut(satuan)} langkah.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={beres ? "Letakmu tepat!" : `${puluhan} puluhan ${satuan} satuan di mana?`}
        teks={`Di mana letak ${sebut(puluhan)} puluhan dan ${sebut(satuan)} satuan di garis bilangan? Langkah pertama, ketuk ${sebut(puluhan)} puluhan, yaitu ${sebut(puluhan * 10)}. Langkah kedua, dari situ maju ${sebut(satuan)} langkah dan ketuk bilangannya.`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          {puluhan} puluhan dan {satuan} satuan ada di bilangan…
        </p>
        {tahap === 0 ? (
          <>
            <p className="text-center text-sm font-black text-[#1C01A5]">Langkah 1: ketuk {puluhan} puluhan di garis bilangan</p>
            <GarisBilanganK2 dari={0} sampai={50} langkah={10} onPilih={pilihPuluhan} bisaDipilih={(x) => x % 10 === 0} label="Garis bilangan 0 sampai 50, ketuk bilangan puluhan" />
          </>
        ) : (
          <>
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Langkah 2: dari {pilihanP}, maju {satuan} langkah. Ketuk bilangannya.
            </p>
            <GarisBilanganK2 dari={pilihanP ?? 0} sampai={(pilihanP ?? 0) + 10} langkah={1} tandai={beres ? [n] : pilihanP !== null ? [pilihanP] : []} onPilih={pilihSatuan} label={`Garis bilangan dari ${pilihanP} sampai ${(pilihanP ?? 0) + 10}`} />
          </>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {puluhan * 10} + {satuan} = {n}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuGarisBK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tempatkan di Garis Bilangan"
      warna="#BAE6FD"
      petunjuk="Cari letak bilangan di garis bilangan. Langkah pertama, ketuk bilangan puluhannya. Langkah kedua, dari situ maju sebanyak satuannya dan ketuk bilangannya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-garis"
      jumlahRonde={RONDE_GARISB_K2.length}
      belumSiap="Temukan letak bilangannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGarisB ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Pilih Semua Cara yang Benar ----------------------- */

function RondeCara({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_CARA_K2[ronde];
  const [pilih, setPilih] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const benar = d.kandidat.map((k, i) => (nilaiKandidat(k) === d.n ? i : -1)).filter((i) => i >= 0);
  useBicara(beres, `${sebut(d.n)} bisa ditulis dengan banyak cara. ${benar.map((i) => `${sebut(d.kandidat[i].p)} puluhan dan ${sebut(d.kandidat[i].s)} satuan`).join(", atau ")}. Semuanya sama dengan ${sebut(d.n)}. Cara yang paling ringkas memakai puluhan sebanyak mungkin.`);

  const ketuk = (i: number) => {
    if (beres) return;
    setPilih((x) => (x.includes(i) ? x.filter((y) => y !== i) : [...x, i]));
    setKabar(null);
  };

  const periksa = () => {
    const kurang = benar.filter((i) => !pilih.includes(i));
    const lebih = pilih.filter((i) => !benar.includes(i));
    if (kurang.length === 0 && lebih.length === 0) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    if (lebih.length > 0) {
      const k = d.kandidat[lebih[0]];
      setKabar({ teks: `${sebut(k.p)} puluhan dan ${sebut(k.s)} satuan sama dengan ${sebut(nilaiKandidat(k))}, bukan ${sebut(d.n)}. Hitung nilainya: puluhan dikali sepuluh, lalu tambah satuannya.`, ok: false });
    } else {
      setKabar({ teks: `Masih ada ${sebut(kurang.length)} cara yang benar dan belum kamu pilih. Periksa setiap kartu: ${d.n} harus sama dengan puluhan dikali sepuluh ditambah satuan.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={beres ? "Semua cara benar!" : `Cara menulis ${d.n}`}
        teks={`Bilangan ${sebut(d.n)} bisa ditulis dengan beberapa cara. Pilih semua kartu yang nilainya sama dengan ${sebut(d.n)}. Ada lebih dari satu yang benar. Hitung nilai tiap kartu: puluhan dikali sepuluh, lalu tambah satuannya. Ketuk kartu untuk memilih atau membatalkan, lalu tekan Periksa.`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-lg font-black text-[#1C01A5]">Pilih semua cara yang nilainya {d.n}</p>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label={`Cara menulis ${d.n}`}>
          {d.kandidat.map((k, i) => {
            const terpilih = pilih.includes(i);
            const tepat = beres && benar.includes(i);
            return (
              <button
                key={`${k.p}-${k.s}`}
                type="button"
                aria-pressed={terpilih}
                aria-label={`${k.p} puluhan dan ${k.s} satuan${terpilih ? ", terpilih" : ""}`}
                onClick={() => ketuk(i)}
                className={`igil-tanpa-tepi rounded-2xl border-4 px-1 py-1.5 ${tepat ? "border-[#16A34A] bg-[#E8F7EE]" : terpilih ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-white"}`}
              >
                <Ikatan atas={d.n} kiri={k.p * 10} kanan={k.s} kelas="h-20 w-24" />
                <span className="block text-center text-sm font-black leading-tight text-[#1C01A5]">
                  {k.p} puluhan + {k.s} satuan
                </span>
              </button>
            );
          })}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black text-[#14532D]">
            {benar.map((i) => `${d.kandidat[i].p} puluhan + ${d.kandidat[i].s} satuan`).join(" = ")} = {d.n}
          </p>
        ) : (
          <button type="button" onClick={periksa} className={TOMBOL_PERIKSA}>
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuCaraK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pilih Semua Cara"
      warna="#FDE68A"
      petunjuk="Satu bilangan bisa ditulis dengan banyak cara. Pilih semua bagan yang nilainya sama dengan bilangan di atas. Hitung puluhan dikali sepuluh, lalu tambah satuan. Ada lebih dari satu yang benar."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-cara"
      jumlahRonde={RONDE_CARA_K2.length}
      belumSiap="Pilih semua cara yang benar dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCara ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
