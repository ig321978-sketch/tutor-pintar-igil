"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KartuK2B5 } from "./kartu-k2b5";
import { GarisAngkaGame, KetukPilih, KetukSemua, LetakSlot, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { TulisAngka } from "./mesin-k2b7";
import { CatatData, GambarDiagram, IsiBanyak } from "./mesin-k2b8";
import { BarisIkon, Ikon, Kumpulan } from "./dasar-k2b8";
import { BarisLambang, Keterangan, TabelGambar } from "./diagram-k2b8";
import {
  DATA, HURUF, LAMBANG_SEMUA, PETA_KONSEP_QB, RONDE_BACA_CB, RONDE_BACA_PB, RONDE_BACA_PB7, RONDE_BEDA_CB, RONDE_BENARSALAH_QB, RONDE_CATAT_B, RONDE_DETEKTIF_QB, RONDE_GAMBAR_CB, RONDE_GAMBAR_PB,
  RONDE_GAMBAR_QB, RONDE_ISI_PB, RONDE_JUMLAH_QB, RONDE_KALIMAT_QB, RONDE_LEBIH_PB, RONDE_MEMORI_CB, RONDE_MEMORI_PB, RONDE_PALING_CB, RONDE_PASANG_CB, RONDE_PASANG_PB, RONDE_PASANG_QB,
  RONDE_SEMUA_QB, RONDE_SLOT_CB, RONDE_SORTIR_B, RONDE_SORTIR_PB, RONDE_SUSUN_QB, RONDE_TEPAT_PB, RONDE_URUT_CB, RONDE_URUT_PB, RONDE_URUT_QB,
  Kapital, aliran, banyak, cocokSemua, hasilBeda, hasilJumlah, hasilLebih, jendelaGaris, kalimatAda, kalimatIsianBeda, kat, kataAkhir, kataAwal, opsiAngka, opsiTurus,
  palingTunggal, selisihPasang, soalBacaDiagram, tanyaJumlah, tanyaLebih, tanyaSemua, teksKlue, urutAngka, urutKategori, urutTampil, urutanTetap, type IdData, type Lambang,
} from "./data-k2b8";
import { visualInfografisK2B8B } from "./infografis-k2b8";
import { SUB_B8 } from "./naskah-k2b8";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 8 Sub-Bab B: Diagram Gambar. Tiga puluh permainan, sepuluh per   */
/* tahap.                                                                      */
/*  Concrete 1 Tempel Gambar  2 Kelompokkan  3 Susun Diagram  4 Jodohkan        */
/*           5 Memori  6 Baca Diagram  7 Baris Terpanjang  8 Lebihnya           */
/*           9 Urutkan  10 Kartu ke Baris                                        */
/*  Picture  11 Baca Baris  12 Warnai Diagram  13 Diagram Tepat  14 Jodohkan     */
/*           15 Memori  16 Urutkan  17 Baca Lengkap  18 Lengkapi Banyak           */
/*           19 Garis Bilangan  20 Pilah Baris                                   */
/*  Abstract 21 Jodohkan  22 Kalimat  23 Susun Kata  24 Buat Diagram             */
/*           25 Benar Salah  26 Detektif  27 Peta  28 Urutkan  29 Semua           */
/*           30 Jumlah                                                           */
/* Naskah: naskah-k2b8.ts (SUB_B8). Tanpa API.                                  */
/* ------------------------------------------------------------------------ */

const J = SUB_B8.games.map((g) => g.title);
const TOTAL = 30;
const WARNA_BIN = ["#BAE6FD", "#FDE68A", "#FBCFE8", "#BBF7D0"];
const WARNA_LAMBANG: Record<Lambang, string> = { bintang: "#F59E0B", lingkaran: "#F43F5E", hati: "#A78BFA", senyum: "#FACC15" };

const SUARA_INFO =
  "Ini poster rangkuman tentang diagram gambar. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

export function InfografisK2B8BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B8} judul="Diagram Gambar" suaraInfo={SUARA_INFO} visual={visualInfografisK2B8B()} speakGuru={speakGuru} />;
}

type FnIsi = (ronde: number, beres: () => void) => React.ReactNode;

function Kartu(d: PropsLangkah, idx: number, id: string, petunjuk: string, jumlahRonde: number, belumSiap: string, isi: FnIsi) {
  return <KartuK2B5 d={d} indeks={idx} judul={J[idx]} id={id} petunjuk={petunjuk} jumlahRonde={jumlahRonde} belumSiap={belumSiap} total={TOTAL} isi={isi} />;
}

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);
const nm = (set: IdData, id: string) => kat(set, id).nama;
const Nm = (set: IdData, id: string) => Kapital(nm(set, id));
const dataTeks = (set: IdData) => DATA[set].kategori.map((k) => `${Kapital(k.nama)} ${k.n}`).join(" • ");
const KotakData = ({ children }: { children: React.ReactNode }) => <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-xs font-black text-[#1C01A5]">{children}</p>;
const maksSel = (set: IdData) => Math.max(...DATA[set].kategori.map((k) => k.n)) + 1;

/** Diagram gambar benda nyata untuk satu data: tiap baris memakai gambar bendanya sebagai lambang. */
function DiagramBenda({ set, ukuran = 17 }: { set: IdData; ukuran?: number }) {
  const ds = DATA[set];
  return <TabelGambar judul={`Diagram Gambar ${ds.judul}`} kolom={[ds.kolom[0], ds.kolom[1]]} baris={ds.kategori.map((k) => ({ nama: Kapital(k.nama), isi: <BarisIkon ikon={k.ikon} n={k.n} ukuran={ukuran} /> }))} />;
}
/** Diagram gambar dengan lambang polos untuk satu data. */
function DiagramLambang({ set, jenis, ukuran = 17 }: { set: IdData; jenis: Lambang; ukuran?: number }) {
  const ds = DATA[set];
  return (
    <TabelGambar
      judul={`Diagram Gambar ${ds.judul}`}
      kolom={[ds.kolom[0], ds.kolom[1]]}
      baris={ds.kategori.map((k) => ({ nama: Kapital(k.nama), isi: <BarisLambang n={k.n} jenis={jenis} warna={k.warna} ukuran={ukuran} /> }))}
      keterangan={<Keterangan jenis={jenis} warna={ds.kategori[0].warna} satuan={ds.satuan} />}
    />
  );
}

/* ------------------------------ Concrete ------------------------------ */

function KartuTempelB(d: PropsLangkah) {
  return Kartu(d, 0, "k2b8b-tempel", "Data muncul satu per satu. Ketuk baris jenis yang cocok, lalu satu gambar ditempel pada baris itu.", RONDE_CATAT_B.length, "Tempel semua gambarnya dulu, ya.", (r, beres) => {
    const ro = RONDE_CATAT_B[r];
    return (
      <>
        <IgilBicara pendek="Tempel gambar" teks="Lihat gambar yang muncul. Ketuk baris jenisnya, dan satu gambar ditempel. Satu gambar mewakili satu benda." />
        <CatatData
          key={r}
          kategori={ro.hitung.map(([id]) => {
            const k = kat(ro.set, id);
            return { id, nama: k.nama, ikon: k.ikon, warna: k.warna };
          })}
          aliran={aliran(ro.hitung, r)}
          lambang="ikon"
          onBeres={beres}
          pesanBeres="Semua gambar sudah ditempel pada diagram."
        />
      </>
    );
  });
}

function KartuSortirB(d: PropsLangkah) {
  return Kartu(d, 1, "k2b8b-sortir", "Seret atau ketuk tiap benda ke kotak jenisnya sebelum digambar.", RONDE_SORTIR_B.length, "Pilah semua bendanya dulu, ya.", (r, beres) => {
    const ro = RONDE_SORTIR_B[r];
    const cacah: Record<string, number> = {};
    const butir = aliran(ro.hitung, r + 1).map((id) => {
      cacah[id] = (cacah[id] ?? 0) + 1;
      return { id, no: cacah[id] };
    });
    return (
      <>
        <IgilBicara pendek="Kelompokkan ke baris" teks="Sebelum membuat diagram gambar, kelompokkan benda menurut jenisnya. Ketuk benda, lalu ketuk kotak jenis yang sama." />
        <Sortir
          key={r}
          lebarItem={70}
          kolomBin={3}
          item={butir.map((b, i) => {
            const k = kat(ro.set, b.id);
            return { id: `${b.id}-${b.no}`, label: `${k.nama} ${i + 1}`, isi: <Ikon ikon={k.ikon} ukuran={34} />, bin: b.id, petunjuk: `Belum tepat. Ini ${k.nama}. Cari kotak ${k.nama}.`, ucapan: `${Kapital(k.nama)} masuk kotak ${k.nama}.` };
          })}
          bin={ro.hitung.map(([id], i) => ({ id, label: Nm(ro.set, id), warna: WARNA_BIN[i], ikon: kat(ro.set, id).ikon }))}
          onBeres={beres}
          pesanBeres="Semua benda sudah masuk kotak jenisnya."
        />
      </>
    );
  });
}

function KartuSusunDiagramB(d: PropsLangkah) {
  return Kartu(d, 2, "k2b8b-susundiagram", "Hitung benda pada tiap baris. Ketuk sel untuk mengisi gambar sampai sama banyak dengan bendanya. Tekan Periksa.", RONDE_GAMBAR_CB.length, "Susun semua diagramnya dulu, ya.", (r, beres) => {
    const set = RONDE_GAMBAR_CB[r];
    const ds = DATA[set];
    return (
      <>
        <IgilBicara pendek="Susun diagram gambar" teks="Hitung benda pada tiap baris. Isi gambar pada baris itu sebanyak bendanya. Satu gambar mewakili satu benda." />
        <GambarDiagram
          key={r}
          tanya={`Diagram gambar ${ds.judul.toLowerCase()}`}
          baris={ds.kategori.map((k) => ({ id: k.id, nama: Kapital(k.nama), n: k.n, warna: k.warna, kiri: <Kumpulan ikon={k.ikon} n={k.n} ukuran={13} />, ikon: k.ikon }))}
          sel="ikon"
          maks={maksSel(set)}
          onBeres={beres}
          pesanBeres="Diagram gambar sudah sama dengan bendanya."
        />
      </>
    );
  });
}

function KartuJodohBendaB(d: PropsLangkah) {
  return Kartu(d, 3, "k2b8b-jodohbenda", "Ketuk satu kelompok benda di kiri, lalu ketuk baris gambar yang banyaknya sama di kanan.", RONDE_PASANG_CB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_CB[r];
    const kanan = ro.hitung.map(([id], i) => ({ id, label: `Baris ${HURUF[i]}`, isi: <BarisIkon ikon={kat(ro.set, id).ikon} n={banyak(ro.set, id)} ukuran={16} /> }));
    return (
      <>
        <IgilBicara pendek="Jodohkan benda dan baris" teks="Hitung benda pada tiap kelompok. Jodohkan dengan baris gambar yang banyaknya sama." />
        <PasangKartu
          key={r}
          kiri={ro.hitung.map(([id], i) => ({ id, label: `Kumpulan ${HURUF[i]}`, isi: <Kumpulan ikon={kat(ro.set, id).ikon} n={banyak(ro.set, id)} ukuran={20} /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.hitung.map(([id]) => [id, id]))}
          petunjuk={() => "Belum cocok. Hitung bendanya, lalu hitung gambar pada baris."}
          onBeres={beres}
          pesanBeres="Semua benda sudah cocok dengan barisnya."
        />
      </>
    );
  });
}

function KartuMemoriBendaB(d: PropsLangkah) {
  return Kartu(d, 4, "k2b8b-memoribenda", "Balik dua kartu. Cari kelompok benda dan baris gambar yang banyaknya sama.", RONDE_MEMORI_CB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => {
    const set = RONDE_MEMORI_CB[r];
    return (
      <>
        <IgilBicara pendek="Memori benda dan baris" teks="Balik dua kartu. Cari kartu kelompok benda dan kartu baris gambar yang banyaknya sama." />
        <MemoriKartu
          key={r}
          pasangan={DATA[set].kategori.map((k, i) => ({
            id: k.id,
            a: <Kumpulan ikon={k.ikon} n={k.n} ukuran={13} />,
            labelA: `kumpulan ${HURUF[i]}`,
            b: <BarisIkon ikon={k.ikon} n={k.n} ukuran={12} />,
            labelB: `baris ${k.n}`,
          }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    );
  });
}

const soalBacaCB = (r: number): SoalBertahap[] =>
  RONDE_BACA_CB[r].map((s, i) => {
    const k = kat(s.set, s.k);
    const o = opsiAngka(k.n, r * 2 + i);
    return {
      visual: <DiagramBenda set={s.set} ukuran={15} />,
      tanya: `Berapa ${DATA[s.set].satuan} pada baris ${k.nama}?`,
      opsi: o.map(String),
      jawab: o.indexOf(k.n),
      petunjuk: "Belum tepat. Hitung gambar pada baris itu satu per satu dari kiri ke kanan.",
      pesan: `Baris ${k.nama} berisi ${k.n} gambar.`,
      angka: true,
    };
  });

function KartuBacaBendaB(d: PropsLangkah) {
  return Kartu(d, 5, "k2b8b-baca", "Baca diagram gambar. Hitung gambar pada baris yang ditanya, lalu pilih bilangannya.", RONDE_BACA_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Baca diagram gambar" teks="Satu gambar mewakili satu anak. Hitung gambar pada baris yang ditanya." />
      <PilihBertahap key={r} soal={soalBacaCB(r)} onBeres={beres} pesanBeres="Semua baris sudah kamu baca." />
    </>
  ));
}

function KartuPalingBarisB(d: PropsLangkah) {
  return Kartu(d, 6, "k2b8b-paling", "Lihat panjang tiap baris gambar. Ketuk baris yang paling panjang, lalu yang paling pendek.", RONDE_PALING_CB.length, "Temukan semua barisnya dulu, ya.", (r, beres) => {
    const set = RONDE_PALING_CB[r];
    const item = DATA[set].kategori.map((k) => ({ id: k.id, label: Kapital(k.nama), isi: <BarisIkon ikon={k.ikon} n={k.n} ukuran={set === "hewan" ? 13 : 16} /> }));
    const banyakK = palingTunggal(set, "banyak");
    const sedikitK = palingTunggal(set, "sedikit");
    const soal = [
      { tanya: "Ketuk baris yang paling panjang.", jawab: banyakK?.id ?? "", petunjuk: "Belum tepat. Bandingkan panjang semua baris.", pesan: `Baris ${banyakK?.nama} paling panjang, yaitu ${banyakK?.n}.` },
      { tanya: "Ketuk baris yang paling pendek.", jawab: sedikitK?.id ?? "", petunjuk: "Belum tepat. Bandingkan panjang semua baris.", pesan: `Baris ${sedikitK?.nama} paling pendek, yaitu ${sedikitK?.n}.` },
    ];
    return (
      <>
        <IgilBicara pendek="Baris terpanjang dan terpendek" teks="Baris yang paling panjang menunjukkan data yang paling banyak. Ketuk baris yang paling panjang, lalu yang paling pendek." />
        <KetukPilih key={r} item={item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua baris sudah kamu temukan." />
      </>
    );
  });
}

function KartuLebihDiagramB(d: PropsLangkah) {
  return Kartu(d, 7, "k2b8b-lebih", "Bandingkan dua baris gambar. Atur penghitung sampai sama dengan selisihnya, lalu tekan Periksa.", RONDE_BEDA_CB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <IgilBicara pendek="Lebihnya dan kurangnya" teks="Bandingkan dua baris gambar. Cari berapa gambar yang tidak punya pasangan pada baris yang lebih panjang." />
      <TulisAngka
        key={r}
        soal={RONDE_BEDA_CB[r].map((s) => {
          const a = kat(s.set, s.a);
          const b = kat(s.set, s.b);
          const sel = hasilBeda(s);
          return {
            visual: (
              <span className="flex w-full flex-col gap-1">
                <span className="flex items-center gap-2">
                  <span className="w-[82px] text-xs font-black text-[#1C01A5]">{Kapital(a.nama)}</span>
                  <BarisIkon ikon={a.ikon} n={a.n} ukuran={16} />
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-[82px] text-xs font-black text-[#1C01A5]">{Kapital(b.nama)}</span>
                  <BarisIkon ikon={b.ikon} n={b.n} ukuran={16} />
                </span>
              </span>
            ),
            tanya: `Banyak ${a.nama} berapa lebihnya dari banyak ${b.nama}?`,
            jawab: sel,
            min: 0,
            max: 12,
            label: "lebihnya",
            petunjuk: "Hitung gambar pada kedua baris. Cari berapa gambar yang tidak punya pasangan.",
            pesan: `${Kapital(a.nama)} ${a.n} dan ${b.nama} ${b.n}. Banyak ${a.nama} ${sel} lebihnya dari banyak ${b.nama}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua selisih sudah kamu temukan."
      />
    </>
  ));
}

function KartuUrutBarisB(d: PropsLangkah) {
  return Kartu(d, 8, "k2b8b-urutbaris", "Lihat panjang tiap baris gambar. Ketuk baris satu per satu menurut urutan banyaknya.", RONDE_URUT_CB.length, "Urutkan semua barisnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_CB[r];
    const kunci = urutKategori(ro.set, ro.ids, ro.dari);
    const awal = kataAwal(ro.dari);
    const akhir = kataAkhir(ro.dari);
    return (
      <>
        <IgilBicara pendek={`Urutkan dari ${awal}`} teks={`Lihat panjang tiap baris gambar. Ketuk baris dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.ids, kunci, r).map((id) => ({ id, label: Nm(ro.set, id), isi: <BarisIkon ikon={kat(ro.set, id).ikon} n={banyak(ro.set, id)} ukuran={14} /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan baris ${i.label.toLowerCase()}. Bandingkan panjang barisnya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuSlotBarisB(d: PropsLangkah) {
  return Kartu(d, 9, "k2b8b-slot", "Ketuk kartu kelompok benda, lalu ketuk baris bintang yang banyaknya sama.", RONDE_SLOT_CB.length, "Taruh semua kartunya dulu, ya.", (r, beres) => {
    const ro = RONDE_SLOT_CB[r];
    const kartu = ro.hitung.map(([id], i) => {
      const k = kat(ro.set, id);
      return { id: `k-${id}`, label: `Kumpulan ${HURUF[i]}`, isi: <Kumpulan ikon={k.ikon} n={k.n} ukuran={16} />, slot: id, petunjuk: "Belum tepat. Hitung bendanya, lalu hitung bintang pada baris.", ucapan: `${k.n} ${k.nama} cocok dengan baris ${k.n} bintang.` };
    });
    return (
      <>
        <IgilBicara pendek="Kartu benda ke baris gambar" teks="Hitung benda pada kartu. Taruh kartu di baris bintang yang banyaknya sama." />
        <LetakSlot
          key={r}
          item={urutanKe(kartu.length, r).map((i) => kartu[i])}
          slot={ro.hitung.map(([id], i) => ({ id, label: `Baris ${HURUF[i]}`, ikon: "⭐".repeat(banyak(ro.set, id)), warna: WARNA_BIN[i] }))}
          onBeres={beres}
          pesanBeres="Semua kartu sudah masuk baris yang tepat."
        />
      </>
    );
  });
}

/* ------------------------------ Picture ------------------------------ */

function KartuBacaBarisB(d: PropsLangkah) {
  return Kartu(d, 10, "k2b8b-bacabaris", "Hitung lambang pada baris. Atur penghitung sampai sama, lalu tekan Periksa.", RONDE_BACA_PB.length, "Baca semua barisnya dulu, ya.", (r, beres) => {
    const jenis = LAMBANG_SEMUA[r % LAMBANG_SEMUA.length];
    return (
      <>
        <CatatanTempel pendek="Baca baris lambang" teks="Satu gambar mewakili satu benda. Hitung gambar pada baris, lalu tulis banyaknya." />
        <TulisAngka
          key={r}
          soal={RONDE_BACA_PB[r].map((n) => ({
            visual: <BarisLambang n={n} jenis={jenis} warna={WARNA_LAMBANG[jenis]} ukuran={24} kelas="justify-center" />,
            tanya: "Berapa gambar pada baris ini?",
            jawab: n,
            min: 0,
            max: 12,
            label: "banyaknya",
            petunjuk: "Hitung gambar satu per satu dari kiri ke kanan.",
            pesan: `Ada ${n} gambar, jadi datanya ${n}.`,
          }))}
          onBeres={beres}
          pesanBeres="Semua baris sudah kamu baca."
        />
      </>
    );
  });
}

function KartuWarnaiDiagramB(d: PropsLangkah) {
  return Kartu(d, 11, "k2b8b-warnai", "Baca banyaknya pada tiap baris. Ketuk sel untuk mengisi lambang sampai sama banyak. Tekan Periksa.", RONDE_GAMBAR_PB.length, "Susun semua diagramnya dulu, ya.", (r, beres) => {
    const set = RONDE_GAMBAR_PB[r];
    const ds = DATA[set];
    const jenis = LAMBANG_SEMUA[(r + 1) % LAMBANG_SEMUA.length];
    return (
      <>
        <CatatanTempel pendek="Warnai diagram dari tabel" teks={`Tabel menunjukkan banyak data. Isi lambang pada tiap baris sebanyak datanya. Satu gambar mewakili satu ${ds.satuan}.`} />
        <GambarDiagram
          key={r}
          tanya={ds.judul}
          baris={ds.kategori.map((k) => ({ id: k.id, nama: Kapital(k.nama), n: k.n, warna: k.warna, kiri: <span className="text-lg font-black text-[#1C01A5]">{k.n}</span> }))}
          sel={{ jenis }}
          maks={maksSel(set)}
          onBeres={beres}
          pesanBeres="Diagram gambar sudah sama dengan tabelnya."
        />
      </>
    );
  });
}

function KartuDiagramTepatB(d: PropsLangkah) {
  return Kartu(d, 12, "k2b8b-tepat", "Baca bilangan di pertanyaan. Hitung gambar pada tiap baris, lalu ketuk baris yang tepat.", RONDE_TEPAT_PB.length, "Temukan semua barisnya dulu, ya.", (r, beres) => {
    const jenis = LAMBANG_SEMUA[(r + 2) % LAMBANG_SEMUA.length];
    const soal = RONDE_TEPAT_PB[r].map((n, i) => {
      const o = opsiTurus(n, r * 2 + i);
      return {
        tanya: `Ketuk baris yang menunjukkan ${n}.`,
        jawab: String(n),
        petunjuk: "Belum tepat. Hitung gambar pada tiap baris satu per satu.",
        pesan: `Benar, baris itu berisi ${n} gambar.`,
        item: o.map((x, j) => ({ id: String(x), label: `Baris ${HURUF[j]}`, isi: <BarisLambang n={x} jenis={jenis} warna={WARNA_LAMBANG[jenis]} ukuran={16} kelas="justify-center" /> })),
      };
    });
    return (
      <>
        <CatatanTempel pendek="Diagram yang tepat" teks="Baca bilangannya. Hitung gambar pada tiap baris, lalu ketuk baris yang banyaknya sama." />
        <KetukPilih key={r} item={soal[0].item} kolom={2} soal={soal} onBeres={beres} pesanBeres="Semua baris sudah kamu temukan." />
      </>
    );
  });
}

function KartuJodohDiagramB(d: PropsLangkah) {
  return Kartu(d, 13, "k2b8b-jodohdiagram", "Ketuk satu baris lambang di kiri, lalu ketuk bilangan yang sama di kanan.", RONDE_PASANG_PB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_PB[r];
    const jenis = LAMBANG_SEMUA[r % LAMBANG_SEMUA.length];
    const kanan = ro.map((n) => ({ id: `n${n}`, label: String(n), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanTempel pendek="Jodohkan diagram dan bilangan" teks="Hitung gambar pada tiap baris. Jodohkan dengan bilangan yang sama." />
        <PasangKartu
          key={r}
          kiri={ro.map((n, i) => ({ id: `n${n}`, label: `Baris ${HURUF[i]}`, isi: <BarisLambang n={n} jenis={jenis} warna={WARNA_LAMBANG[jenis]} ukuran={15} kelas="justify-center" /> }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((n) => [`n${n}`, `n${n}`]))}
          petunjuk={() => "Belum cocok. Hitung gambar pada baris itu satu per satu."}
          onBeres={beres}
          pesanBeres="Semua baris sudah cocok dengan bilangannya."
        />
      </>
    );
  });
}

function KartuMemoriDiagramB(d: PropsLangkah) {
  return Kartu(d, 14, "k2b8b-memoridiagram", "Balik dua kartu. Cari baris lambang dan bilangan yang sama.", RONDE_MEMORI_PB.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => {
    const jenis = LAMBANG_SEMUA[(r + 1) % LAMBANG_SEMUA.length];
    return (
      <>
        <CatatanTempel pendek="Memori diagram dan bilangan" teks="Balik dua kartu. Cari kartu baris lambang dan kartu bilangan yang sama." />
        <MemoriKartu
          key={r}
          pasangan={RONDE_MEMORI_PB[r].map((n, i) => ({
            id: String(n),
            a: <BarisLambang n={n} jenis={jenis} warna={WARNA_LAMBANG[jenis]} ukuran={12} kelas="justify-center" />,
            labelA: `baris ${HURUF[i]}`,
            b: <span className="text-4xl font-black text-[#1C01A5]">{n}</span>,
            labelB: `bilangan ${n}`,
          }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    );
  });
}

function KartuUrutLambangB(d: PropsLangkah) {
  return Kartu(d, 15, "k2b8b-urutlambang", "Hitung gambar pada tiap baris. Ketuk baris satu per satu menurut urutan banyaknya.", RONDE_URUT_PB.length, "Urutkan semua barisnya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_PB[r];
    const jenis = LAMBANG_SEMUA[r % LAMBANG_SEMUA.length];
    const kunci = urutAngka(ro.angka, ro.dari).map(String);
    const awal = kataAwal(ro.dari);
    const akhir = kataAkhir(ro.dari);
    return (
      <>
        <CatatanTempel pendek={`Urutkan dari ${awal}`} teks={`Hitung gambar pada tiap baris. Ketuk baris dari yang ${awal} sampai yang ${akhir}.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.angka.map(String), kunci, r).map((x) => ({ id: x, label: `Baris ${HURUF[ro.angka.indexOf(Number(x))]}`, isi: <BarisLambang n={Number(x)} jenis={jenis} warna={WARNA_LAMBANG[jenis]} ukuran={14} kelas="justify-center" /> }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan panjang barisnya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuBacaLengkapB(d: PropsLangkah) {
  return Kartu(d, 16, "k2b8b-bacalengkap", "Baca diagram gambar lengkap, lalu jawab pertanyaannya.", RONDE_BACA_PB7.length, "Jawab semua soal dulu, ya.", (r, beres) => {
    const set = RONDE_BACA_PB7[r][0].set;
    const jenis = LAMBANG_SEMUA[r % LAMBANG_SEMUA.length];
    return (
      <>
        <CatatanTempel pendek="Baca diagram lengkap" teks="Baca judul dan keterangan lebih dulu. Hitung gambar pada baris yang ditanya, lalu pilih jawabannya." />
        <PilihBertahap
          key={r}
          soal={RONDE_BACA_PB7[r].map((s, i) => {
            const q = soalBacaDiagram(s, r * 2 + i);
            return { visual: <DiagramLambang set={set} jenis={jenis} ukuran={14} />, tanya: q.tanya, opsi: q.opsi, jawab: q.jawab, petunjuk: q.petunjuk, pesan: q.pesan, angka: q.angka };
          })}
          onBeres={beres}
          pesanBeres="Semua pertanyaan diagram sudah kamu jawab."
        />
      </>
    );
  });
}

function KartuLengkapiBanyakB(d: PropsLangkah) {
  return Kartu(d, 17, "k2b8b-lengkapi", "Hitung lambang pada baris yang menyala, lalu pilih kartu bilangannya.", RONDE_ISI_PB.length, "Lengkapi semua diagramnya dulu, ya.", (r, beres) => {
    const set = RONDE_ISI_PB[r];
    const ds = DATA[set];
    const jenis = LAMBANG_SEMUA[r % LAMBANG_SEMUA.length];
    const n = ds.kategori.map((k) => k.n);
    const kartu = [...new Set([...n, Math.max(...n) + 1, Math.max(1, Math.min(...n) - 1)])].sort((a, b) => a - b);
    return (
      <>
        <CatatanTempel pendek="Lengkapi banyak pada diagram" teks="Hitung lambang pada baris yang menyala. Pilih kartu bilangan yang tepat untuk kolom banyaknya." />
        <IsiBanyak
          key={r}
          judul={`Diagram Gambar ${ds.judul}`}
          kolom={["Nama", "Gambar", "Banyak"]}
          baris={ds.kategori.map((k) => ({ id: k.id, nama: Kapital(k.nama), visual: <BarisLambang n={k.n} jenis={jenis} warna={k.warna} ukuran={13} />, jawab: k.n }))}
          kartu={kartu}
          onBeres={beres}
          pesanBeres="Kolom banyaknya sudah lengkap."
        />
      </>
    );
  });
}

function KartuGarisDiagramB(d: PropsLangkah) {
  return Kartu(d, 18, "k2b8b-garis", "Baca banyak data awal. Lalu ketuk banyak data yang diminta pada garis bilangan.", RONDE_LEBIH_PB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => (
    <>
      <CatatanTempel pendek="Lebihnya dan kurangnya pada garis" teks="Baca banyak data awal. Hitung maju untuk lebihnya dan mundur untuk kurangnya pada garis bilangan." />
      <GarisAngkaGame
        key={r}
        soal={RONDE_LEBIH_PB[r].map((s, i) => {
          const jawab = hasilLebih(s);
          const [dari, sampai] = jendelaGaris(banyak(s.set, s.dari), jawab, r * 2 + i + 1);
          return {
            tanya: tanyaLebih(s),
            dari,
            sampai,
            jawab,
            petunjuk: s.jenis === "lebih" ? "Belum tepat. Hitung maju dari banyak data awal." : "Belum tepat. Hitung mundur dari banyak data awal.",
            pesan: `${Kapital(nm(s.set, s.ke))} ada ${jawab}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua bilangan sudah kamu temukan."
      />
    </>
  ));
}

function KartuPilahBarisB(d: PropsLangkah) {
  return Kartu(d, 19, "k2b8b-pilahbaris", "Hitung gambar pada tiap baris. Pilah baris ke kotak kurang dari lima atau lima atau lebih.", RONDE_SORTIR_PB.length, "Pilah semua barisnya dulu, ya.", (r, beres) => {
    const jenis = LAMBANG_SEMUA[(r + 1) % LAMBANG_SEMUA.length];
    return (
      <>
        <CatatanTempel pendek="Pilah baris" teks="Hitung gambar pada tiap baris. Pilah baris ke kotak yang tepat: kurang dari lima, atau lima atau lebih." />
        <Sortir
          key={r}
          lebarItem={110}
          item={urutanKe(RONDE_SORTIR_PB[r].length, r).map((i) => {
            const n = RONDE_SORTIR_PB[r][i];
            return {
              id: String(n),
              label: `Baris ${HURUF[i]}`,
              isi: <BarisLambang n={n} jenis={jenis} warna={WARNA_LAMBANG[jenis]} ukuran={13} kelas="justify-center" />,
              bin: n < 5 ? "kurang" : "lima",
              petunjuk: `Belum tepat. Hitung gambar pada baris ini, lalu bandingkan dengan lima.`,
              ucapan: `Baris ini ada ${n}, ${n < 5 ? "kurang dari lima" : "lima atau lebih"}.`,
            };
          })}
          bin={[
            { id: "kurang", label: "Kurang dari 5", warna: "#BAE6FD" },
            { id: "lima", label: "5 atau lebih", warna: "#FDE68A" },
          ]}
          onBeres={beres}
          pesanBeres="Semua baris sudah masuk kotak yang tepat."
        />
      </>
    );
  });
}

/* ------------------------------ Abstract ------------------------------ */

function KartuJodohSelisihB(d: PropsLangkah) {
  return Kartu(d, 20, "k2b8b-jodohselisih", "Baca dua data. Ketuk pasangan data di kiri, lalu ketuk selisihnya di kanan.", RONDE_PASANG_QB.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
    const ro = RONDE_PASANG_QB[r];
    const kanan = ro.map((s, i) => ({ id: `s${i}`, label: String(selisihPasang(s)), isi: null as React.ReactNode }));
    return (
      <>
        <CatatanPensil pendek="Jodohkan pasangan dan selisih" teks="Baca dua data pada tiap kalimat. Cari selisihnya, lalu jodohkan dengan bilangan yang tepat." />
        <PasangKartu
          key={r}
          kiri={ro.map((s, i) => ({ id: `s${i}`, label: `${Nm(s.set, s.a)} ${banyak(s.set, s.a)} dan ${nm(s.set, s.b)} ${banyak(s.set, s.b)}`, isi: null as React.ReactNode }))}
          kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
          kunci={Object.fromEntries(ro.map((_, i) => [`s${i}`, `s${i}`]))}
          petunjuk={() => "Belum cocok. Kurangi bilangan yang besar dengan bilangan yang kecil."}
          onBeres={beres}
          pesanBeres="Semua pasangan data sudah cocok dengan selisihnya."
        />
      </>
    );
  });
}

function KartuKalimatBedaB(d: PropsLangkah) {
  return Kartu(d, 21, "k2b8b-kalimat", "Lengkapi tiap kalimat dengan bilangan yang tepat sesuai diagram.", RONDE_KALIMAT_QB.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
    const sets = [...new Set(RONDE_KALIMAT_QB[r].map((s) => s.set))];
    return (
      <>
        <CatatanPensil pendek="Lengkapi kalimat lebihnya" teks="Baca data pada kotak kuning. Pilih bilangan yang tepat untuk bagian kosong." />
        {sets.map((set) => (
          <KotakData key={set}>
            {DATA[set].judul}: {dataTeks(set)}
          </KotakData>
        ))}
        <IsiKalimatGame key={r} kalimat={RONDE_KALIMAT_QB[r].map((s, i) => kalimatIsianBeda(s, r * 3 + i))} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
      </>
    );
  });
}

function KartuSusunDiagramKataB(d: PropsLangkah) {
  return Kartu(d, 22, "k2b8b-susun", "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", RONDE_SUSUN_QB.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Susun kalimat diagram gambar" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
      <SusunKata key={r} kata={RONDE_SUSUN_QB[r].kata} pengecoh={RONDE_SUSUN_QB[r].pengecoh} nomor={r} onBeres={beres} />
    </>
  ));
}

function KartuBuatDiagramB(d: PropsLangkah) {
  return Kartu(d, 23, "k2b8b-buat", "Baca kalimat data pada tiap baris. Ketuk sel untuk mengisi lambang sebanyak datanya. Tekan Periksa.", RONDE_GAMBAR_QB.length, "Buat semua diagramnya dulu, ya.", (r, beres) => {
    const set = RONDE_GAMBAR_QB[r];
    const ds = DATA[set];
    const jenis = LAMBANG_SEMUA[(r + 3) % LAMBANG_SEMUA.length];
    return (
      <>
        <CatatanPensil pendek="Buat diagram dari kalimat data" teks="Baca kalimat data pada tiap baris. Isi lambang sebanyak datanya." />
        <GambarDiagram
          key={r}
          tanya={ds.judul}
          baris={ds.kategori.map((k) => ({ id: k.id, nama: Kapital(k.nama), n: k.n, warna: k.warna, kiri: <span className="text-right text-[11px] font-black leading-tight text-[#1C01A5]">{kalimatAda(set, k.id)}</span> }))}
          sel={{ jenis }}
          maks={maksSel(set)}
          onBeres={beres}
          pesanBeres="Diagram gambar sudah sama dengan kalimat datanya."
        />
      </>
    );
  });
}

function KartuBenarSalahDiagramB(d: PropsLangkah) {
  return Kartu(d, 24, "k2b8b-benarsalah", "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", RONDE_BENARSALAH_QB.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang diagram gambar dengan teliti. Pilih benar atau salah." />
      <BenarSalahGame key={r} pernyataan={RONDE_BENARSALAH_QB[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
    </>
  ));
}

function KartuDetektifDiagramB(d: PropsLangkah) {
  return Kartu(d, 25, "k2b8b-detektif", "Baca semua petunjuk dan data. Pilih nama yang cocok dengan semuanya.", RONDE_DETEKTIF_QB.length, "Tebak dulu aku siapa, ya.", (r, beres) => {
    const s = RONDE_DETEKTIF_QB[r];
    const ds = DATA[s.set];
    return (
      <>
        <CatatanPensil pendek="Detektif diagram" teks={`Data: ${ds.judul}. Baca semua petunjuk. Pilih nama yang cocok dengan semuanya.`} />
        <KotakData>{dataTeks(s.set)}</KotakData>
        <DetektifTeks
          key={r}
          soal={{
            petunjuk: s.klue.map((k) => teksKlue(s.set, k)),
            opsi: s.opsi.map((id) => Nm(s.set, id)),
            jawab: s.opsi.indexOf(s.jawab),
            salah: `Periksa tiap petunjuk satu per satu. Hanya ${nm(s.set, s.jawab)} yang cocok dengan semuanya.`,
          }}
          onBeres={beres}
          pesanBeres={(nama) => `Benar, aku ${nama.toLowerCase()}.`}
        />
      </>
    );
  });
}

function KartuPetaKonsepGambarB(d: PropsLangkah) {
  return Kartu(d, 26, "k2b8b-konsep", "Lengkapi peta konsep diagram gambar. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", PETA_KONSEP_QB.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
    const p = PETA_KONSEP_QB[r];
    return (
      <>
        <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
        <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
      </>
    );
  });
}

function KartuUrutDataB(d: PropsLangkah) {
  return Kartu(d, 27, "k2b8b-urutdata", "Ketuk nama satu per satu menurut urutan banyaknya.", RONDE_URUT_QB.length, "Urutkan semua datanya dulu, ya.", (r, beres) => {
    const ro = RONDE_URUT_QB[r];
    const kunci = urutKategori(ro.set, ro.ids, ro.dari);
    const awal = kataAwal(ro.dari);
    const akhir = kataAkhir(ro.dari);
    return (
      <>
        <CatatanPensil pendek={`Urutkan dari ${awal}`} teks={`Ketuk nama dari yang ${awal} sampai yang ${akhir}. Lihat angka di belakang nama.`} />
        <UrutKetuk
          key={r}
          item={urutTampil(ro.ids, kunci, r).map((id) => ({ id, label: `${Nm(ro.set, id)} ${banyak(ro.set, id)}` }))}
          urutan={kunci}
          labelAwal={awal}
          labelAkhir={akhir}
          petunjuk={(i) => `Belum, bukan ${i.label}. Bandingkan angkanya.`}
          onBeres={beres}
          pesanBeres={`Urutan dari yang ${awal} sudah benar.`}
        />
      </>
    );
  });
}

function KartuSemuaDiagramB(d: PropsLangkah) {
  return Kartu(d, 28, "k2b8b-semua", "Ketuk semua data yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", RONDE_SEMUA_QB.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
    const s = RONDE_SEMUA_QB[r];
    return (
      <>
        <CatatanPensil pendek="Ketuk semua yang cocok" teks={`${tanyaSemua(s)} Boleh lebih dari satu. Lalu tekan periksa.`} />
        <KetukSemua
          key={r}
          tanya={tanyaSemua(s)}
          item={DATA[s.set].kategori.map((k) => ({ id: k.id, label: `${Kapital(k.nama)} ${k.n}`, benar: cocokSemua(k.id, s), penjelasan: `${Kapital(k.nama)} ada ${k.n}. ${cocokSemua(k.id, s) ? "Ini cocok." : "Ini belum cocok."} Baca lagi perintahnya.` }))}
          onBeres={beres}
          pesanBeres="Semua data yang cocok sudah kamu temukan."
        />
      </>
    );
  });
}

function KartuJumlahDiagramB(d: PropsLangkah) {
  return Kartu(d, 29, "k2b8b-jumlah", "Jumlahkan banyak data yang diminta. Atur penghitung sampai sama dengan jumlahnya, lalu tekan Periksa.", RONDE_JUMLAH_QB.length, "Jawab semua soal dulu, ya.", (r, beres) => (
    <>
      <CatatanPensil pendek="Hitung jumlah pada diagram" teks="Baca datanya, lalu jumlahkan banyak data yang diminta." />
      <TulisAngka
        key={r}
        soal={RONDE_JUMLAH_QB[r].map((s) => {
          const jml = hasilJumlah(s);
          return {
            visual: <KotakData>{DATA[s.set].judul}: {dataTeks(s.set)}</KotakData>,
            tanya: tanyaJumlah(s),
            jawab: jml,
            min: 0,
            max: 30,
            label: "jumlahnya",
            petunjuk: "Ambil banyak data yang diminta saja, lalu jumlahkan satu per satu.",
            pesan: `${s.ids.map((id) => banyak(s.set, id)).join(" ditambah ")} sama dengan ${jml}.`,
          };
        })}
        onBeres={beres}
        pesanBeres="Semua jumlah data sudah kamu temukan."
      />
    </>
  ));
}

/* ------------------------------ Pembungkus tiga tahap ------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [KartuTempelB, KartuSortirB, KartuSusunDiagramB, KartuJodohBendaB, KartuMemoriBendaB, KartuBacaBendaB, KartuPalingBarisB, KartuLebihDiagramB, KartuUrutBarisB, KartuSlotBarisB].map((K, i) => ({
  nomor: i + 1,
  render: (d) => <K {...d} />,
}));

const KARTU_PICTURE: KartuTahap[] = [KartuBacaBarisB, KartuWarnaiDiagramB, KartuDiagramTepatB, KartuJodohDiagramB, KartuMemoriDiagramB, KartuUrutLambangB, KartuBacaLengkapB, KartuLengkapiBanyakB, KartuGarisDiagramB, KartuPilahBarisB].map((K, i) => ({
  nomor: i + 11,
  render: (d) => <K {...d} />,
}));

const KARTU_ABSTRACT: KartuTahap[] = [KartuJodohSelisihB, KartuKalimatBedaB, KartuSusunDiagramKataB, KartuBuatDiagramB, KartuBenarSalahDiagramB, KartuDetektifDiagramB, KartuPetaKonsepGambarB, KartuUrutDataB, KartuSemuaDiagramB, KartuJumlahDiagramB].map((K, i) => ({
  nomor: i + 21,
  render: (d) => <K {...d} />,
}));

export function ConcreteK2B8B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Tempel dan susun gambar!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B8B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B8B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B8} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
