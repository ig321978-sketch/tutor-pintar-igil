"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { BendaRuangSvg } from "./dasar-k2b3";
import { CetakTebak, LerengGelinding, TasMisteri } from "./ruang-k2b3";
import { Sortir, type BinSortir, type ItemSortir } from "./permainan-k2b3";
import { NAMA_RUANG, RONDE_CETAK_C, RONDE_GELIND_C, RONDE_PILAH_C, RONDE_TAS_C, URUTAN_RUANG, bendaRuang } from "./data-k2b3";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 3 Sub-Bab C, Tahap 4 Concrete: benda nyata berbentuk bangun     */
/* ruang yang digelindingkan, diraba, dicetak, dan dipilah.                    */
/*  1 Lereng Gelinding   2 Tas Misteri   3 Cetak dan Tebak   4 Pilah Rak       */
/* Naskah: naskah/mtk-2-bab3-sub-c-bangun-ruang.md                            */
/* ------------------------------------------------------------------------ */

type Ronde = { onBeres: () => void; ronde: number };

/* --------- Permainan 1. Lereng Gelinding ---------------------------------- */

function RondeGelinding({ ronde, onBeres }: Ronde) {
  return (
    <>
      <IgilBicara
        pendek="Ketuk benda untuk melepasnya"
        teks="Ketuk tiap benda untuk melepasnya di lereng. Lihat benda yang menggelinding dan benda yang diam. Setelah semuanya dicoba, pilih semua benda yang menggelinding, lalu pilih alasannya."
      />
      <LerengGelinding benda={RONDE_GELIND_C[ronde]} onBeres={onBeres} />
    </>
  );
}

export function LangkahGelindingK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lereng Gelinding"
      warna="#BBF7D0"
      petunjuk="Lepaskan tiap benda di lereng dan lihat hasilnya. Lalu pilih semua benda yang menggelinding, dan pilih alasan mengapa benda itu menggelinding."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-gelinding"
      jumlahRonde={RONDE_GELIND_C.length}
      belumSiap="Coba semua benda dan pilih alasannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeGelinding ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Tas Misteri --------------------------------------- */

function RondeTas({ ronde, onBeres }: Ronde) {
  const r = RONDE_TAS_C[ronde];
  return (
    <>
      <IgilBicara
        pendek="Raba dan tebak"
        teks="Ada satu benda di dalam tas. Tekan Raba untuk mendapat petunjuk, satu per satu. Lalu tebak nama bangun ruangnya. Semakin sedikit petunjuk yang kamu pakai, semakin banyak bintangmu."
      />
      <TasMisteri jenis={r.jenis} petunjuk={r.petunjuk} onBeres={onBeres} />
    </>
  );
}

export function LangkahTasK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tas Misteri"
      warna="#DDD6FE"
      petunjuk="Ada satu benda di dalam tas. Tekan Raba untuk mendapat petunjuk satu per satu, lalu tebak nama bangun ruangnya. Makin sedikit petunjuk yang dipakai, makin banyak bintangnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-tas"
      jumlahRonde={RONDE_TAS_C.length}
      belumSiap="Tebak bendanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTas ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Cetak dan Tebak ----------------------------------- */

function RondeCetak({ ronde, onBeres }: Ronde) {
  const r = RONDE_CETAK_C[ronde];
  return (
    <>
      <IgilBicara
        pendek={`Cetak ${bendaRuang(r.benda).nama.toLowerCase()}`}
        teks="Pilih permukaan benda untuk dicetak di kertas. Permukaan yang rata menghasilkan cetakan yang rapi. Permukaan yang lengkung tidak. Setelah cetakan muncul, pilih nama bangun datarnya."
      />
      <CetakTebak ronde={r} onBeres={onBeres} />
    </>
  );
}

export function LangkahCetakK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Cetak dan Tebak"
      warna="#FBCFE8"
      petunjuk="Pilih permukaan benda yang rata untuk dicetak. Permukaan lengkung tidak menghasilkan cetakan yang rapi. Setelah cetakan muncul, pilih nama bangun datar hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-cetak"
      jumlahRonde={RONDE_CETAK_C.length}
      belumSiap="Cetak dan namai bentuknya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCetak ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Pilah Rak Mainan ---------------------------------- */

const WARNA_RAK = ["#FEF3C7", "#FCE7F3", "#EDE9FE", "#DBEAFE", "#DCFCE7"];
const BIN_C: BinSortir[] = URUTAN_RUANG.map((j, i) => ({ id: j, label: NAMA_RUANG[j], warna: WARNA_RAK[i] }));

function itemRuang(id: string): ItemSortir {
  const b = bendaRuang(id);
  return { id, label: b.nama, isi: <BendaRuangSvg id={id} kelas="h-12 w-12" />, bin: b.jenis, petunjuk: b.ciri.replace(/, jadi berbentuk .*$/, ". Cari rak yang cirinya cocok."), ucapan: b.ciri };
}

function RondePilah({ ronde, onBeres }: Ronde) {
  return (
    <>
      <IgilBicara
        pendek="Taruh di rak yang tepat"
        teks="Taruh tiap benda di rak yang namanya tepat: kubus, balok, tabung, kerucut, atau bola. Seret bendanya ke rak, atau ketuk bendanya lalu ketuk raknya."
      />
      <Sortir item={RONDE_PILAH_C[ronde].map(itemRuang)} bin={BIN_C} kolomBin={3} gaya="kayu" onBeres={onBeres} pesanBeres="Semua benda sudah ada di rak yang tepat." />
    </>
  );
}

export function LangkahPilahK2B3C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pilah Rak Mainan"
      warna="#FDE68A"
      petunjuk="Taruh tiap benda di rak yang namanya tepat. Ada rak kubus, balok, tabung, kerucut, dan bola. Seret bendanya, atau ketuk bendanya lalu ketuk raknya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b3c-pilah"
      jumlahRonde={RONDE_PILAH_C.length}
      belumSiap="Pilah semua benda dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePilah ronde={r} onBeres={beres} />}
    />
  );
}
