"use client";

import React from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { type Umum } from "./SubBabBBanding";
import { CatatanPensil, CatatanTempel } from "./tahap-b-gaya";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { InfografisK2B2, PoinK2B2 } from "./kit-k2b2";
import { BenarSalahGame, DetektifTeks, IsiKalimatGame, IsiTabel, PetaKonsepGame, Sortir, SusunKata } from "./permainan-k2b3";
import { KetukPilih, KetukSemua, MemoriKartu, PasangKartu, PilihBertahap, UrutKetuk, type SoalBertahap } from "./mesin-k2b6";
import { PapanDigit } from "./mesin-k2b7";
import { RakitTiga } from "./mesin-k3b1";
import { KoleksiKM } from "./dasar-k3b2";
import { BaganGabung, BaganKM, KalimatBesar } from "./diagram-k3b2";
import {
  DATA_A, DATA_B, HURUF, idKM, jawabKM, kalimatKM, kalimatLangkahKM, ketKM, kunciKM, opsiKM, opsiKalimatKM, cocokKM, urutTampil, urutanTetap, type DataSub, type KM,
} from "./data-k3b2";
import { buatKartu, namaDari, Numeral, wadahDari } from "./bantu-k3b1";
import { visualInfografisK3B2A, visualInfografisK3B2B } from "./infografis-k3b2";
import { SUB_A32, SUB_B32 } from "./naskah-k3b2";
import { type SubBabNaskah } from "./naskah-k2b2";

/* ------------------------------------------------------------------------ */
/* Kelas 3 Bab 2 (Kalimat Matematika), Sub-Bab A dan B. Satu pembuat tahap      */
/* dipakai kedua sub-bab dengan data berbeda: tiga puluh permainan, sepuluh per  */
/* tahap.                                                                       */
/*  Concrete  1 Rakit  2 Hitung  3 Tulis Kalimat  4 Jodohkan  5 Memori  6 Ketuk   */
/*            7 Ketuk Lebih Kurang  8 Cerita  9 Papan  10 Urutkan                 */
/*  Picture  11 Hitung Bagan  12 Kalimat  13 Jodohkan  14 Memori  15 Tabel         */
/*           16 Ketuk Lebih Kurang  17 Pilah  18 Langkah  19 Papan  20 Kemungkinan */
/*  Abstract 21 Isi Nilai  22 Papan  23 Langkah  24 Jodohkan  25 Memori            */
/*           26 Benar Salah  27 Detektif  28 Peta  29 Cerita  30 Susun Kata        */
/* Naskah: naskah-k3b2.ts. Tanpa API.                                            */
/* ------------------------------------------------------------------------ */

const urutanKe = (n: number, r: number) => urutanTetap(n, 2, r);

/** Petunjuk salah menurut jenis kalimat. */
const petunjukKM = (p: KM): string => (p.op === "+" ? "Belum tepat. Kurangkan jumlah dengan bilangan yang diketahui." : p.hilang === "y" ? "Belum tepat. Kurangkan bilangan awal dengan sisanya." : "Belum tepat. Tambahkan bilangan yang dikurangkan dengan sisanya.");

const soalKM = (p: KM, visual: React.ReactNode, nomor: number, tanya = "Berapa nilai yang belum diketahui?"): SoalBertahap => {
  const o = opsiKM(p, nomor);
  return { visual, tanya, opsi: o.map(String), jawab: o.indexOf(jawabKM(p)), petunjuk: petunjukKM(p), pesan: ketKM(p), angka: true };
};

const teksBanding = (acuan: number, arah: "lebih" | "kurang") => `${arah} dari ${acuan}`;
const BIN_LETAK = [
  { id: "depan", label: "Titik-titik di depan", warna: "#BBF7D0" },
  { id: "tengah", label: "Titik-titik di tengah", warna: "#FDE68A" },
];

function buatTahap(kode: "A" | "B", S: SubBabNaskah, D: DataSub, jenis: "jumlah" | "awal") {
  const pre = `k3b2${kode.toLowerCase()}`;
  const J = S.games.map((g) => g.title);
  const Kartu = buatKartu(J, 30);
  const huruf = kode === "A" ? "penjumlahan" : "pengurangan";
  const bagianSebut = jenis === "jumlah" ? "jumlahnya" : "terjual ditambah sisa, jumlahnya";

  /* ------------------------------ Concrete ------------------------------ */

  function KartuRakit(d: PropsLangkah) {
    return Kartu(d, 0, `${pre}-rakit`, "Baca kalimat Matematika dan lihat kumpulan yang diketahui. Rakit kumpulan yang belum diketahui. Tekan Periksa.", D.rakit.length, "Rakit semua kumpulannya dulu, ya.", (r, beres) => (
      <>
        <IgilBicara pendek="Rakit yang belum diketahui" teks="Baca kalimat Matematikanya. Rakit kumpulan benda yang belum diketahui. Sepuluh benda ditukar satu bungkus. Lalu tekan periksa." />
        <RakitTiga
          key={r}
          soal={D.rakit[r].map(({ benda, p }) => ({
            n: jawabKM(p),
            tanya: `${kalimatKM(p)}. Rakit ${namaDari(benda)} yang belum diketahui.`,
            nama: ["dus", wadahDari(benda), "benda lepas"] as [string, string, string],
            tampil: (x, y, z) => <KoleksiKM p={p} benda={benda} ukuran={13} rakit={{ r: x, p: y, s: z }} />,
            pesan: ketKM(p),
          }))}
          onBeres={beres}
          pesanBeres="Semua kumpulan sudah kamu rakit."
        />
      </>
    ));
  }

  function KartuHitung(d: PropsLangkah) {
    return Kartu(d, 1, `${pre}-hitung`, "Lihat kalimat Matematika sebagai kumpulan benda. Hitung nilai yang belum diketahui, lalu pilih hasilnya.", D.hitung.length, "Jawab semua soal dulu, ya.", (r, beres) => (
      <>
        <IgilBicara pendek="Hitung yang belum diketahui" teks="Lihat kumpulan benda dan kotak bertanda tanya. Cari nilai yang belum diketahui dengan mengurangkan atau menjumlahkan. Lalu pilih hasilnya." />
        <PilihBertahap key={r} soal={D.hitung[r].map((s, i) => soalKM(s.p, <KoleksiKM p={s.p} benda={s.benda} ukuran={14} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua nilai sudah kamu hitung." />
      </>
    ));
  }

  function KartuTulis(d: PropsLangkah) {
    return Kartu(d, 2, `${pre}-tulis`, "Lihat gambar kumpulan benda. Pilih kalimat Matematika yang sesuai.", D.tulis.length, "Jawab semua soal dulu, ya.", (r, beres) => (
      <>
        <IgilBicara pendek="Tulis kalimat Matematika" teks="Lihat kumpulan benda dan kotak bertanda tanya. Pilih kalimat Matematika dengan titik-titik di tempat yang tepat." />
        <PilihBertahap
          key={r}
          soal={D.tulis[r].map((s, i): SoalBertahap => {
            const o = opsiKalimatKM(s.p, r * 2 + i);
            return {
              visual: <KoleksiKM p={s.p} benda={s.benda} ukuran={13} />,
              tanya: "Pilih kalimat Matematika yang sesuai dengan gambar.",
              opsi: o.opsi,
              jawab: o.jawab,
              petunjuk: "Belum tepat. Cari kotak bertanda tanya: ia ditulis dengan titik-titik. Lihat juga tanda dan hasilnya.",
              pesan: `${kalimatKM(s.p)}. Titik-titik adalah ${jawabKM(s.p)}.`,
            };
          })}
          onBeres={beres}
          pesanBeres="Semua kalimat sudah kamu pilih."
        />
      </>
    ));
  }

  function KartuJodoh(d: PropsLangkah) {
    return Kartu(d, 3, `${pre}-jodoh`, "Ketuk satu gambar kumpulan di kiri, lalu ketuk kalimat Matematikanya di kanan.", D.pasang.length, "Jodohkan semua gambarnya dulu, ya.", (r, beres) => {
      const ro = D.pasang[r];
      const kanan = ro.item.map((p) => ({ id: idKM(p), label: kalimatKM(p), isi: null as React.ReactNode }));
      return (
        <>
          <IgilBicara pendek="Jodohkan gambar dan kalimat" teks="Lihat kumpulan benda dan kotak bertanda tanya. Jodohkan dengan kalimat Matematika yang tepat." />
          <PasangKartu
            key={r}
            kiri={ro.item.map((p, i) => ({ id: idKM(p), label: `Gambar ${HURUF[i]}`, isi: <KoleksiKM p={p} benda={ro.benda} ukuran={9} /> }))}
            kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
            kunci={Object.fromEntries(ro.item.map((p) => [idKM(p), idKM(p)]))}
            petunjuk={() => "Belum cocok. Kotak bertanda tanya ditulis dengan titik-titik. Cocokkan juga tanda dan hasilnya."}
            onBeres={beres}
            pesanBeres="Semua gambar sudah cocok dengan kalimatnya."
          />
        </>
      );
    });
  }

  function KartuMemori(d: PropsLangkah) {
    return Kartu(d, 4, `${pre}-memori`, "Balik dua kartu. Cari gambar kumpulan dan nilai yang belum diketahui.", D.memori.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
      <>
        <IgilBicara pendek="Memori gambar dan nilai" teks="Balik dua kartu. Cari kartu gambar kumpulan dan kartu nilai yang belum diketahui." />
        <MemoriKartu
          key={r}
          pasangan={D.memori[r].item.map((p, i) => ({ id: idKM(p), a: <KoleksiKM p={p} benda={D.memori[r].benda} ukuran={7} />, labelA: `gambar ${HURUF[i]}`, b: <Numeral n={jawabKM(p)} kelas="text-3xl" />, labelB: `nilai ${jawabKM(p)}` }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    ));
  }

  function KartuKetuk(d: PropsLangkah) {
    return Kartu(d, 5, `${pre}-ketuk`, "Cari nilai yang belum diketahui pada tiap gambar. Ketuk gambar yang nilainya sama dengan bilangan yang disebut.", D.ketuk.length, "Jawab semua pertanyaan dulu, ya.", (r, beres) => {
      const ro = D.ketuk[r];
      return (
        <>
          <IgilBicara pendek="Ketuk gambar dengan nilai" teks="Cari nilai yang belum diketahui pada tiap gambar. Ketuk gambar yang nilainya sama dengan bilangan yang disebut." />
          <KetukPilih
            key={r}
            kolom={2}
            item={ro.item.map((p, i) => ({ id: idKM(p), label: `Gambar ${HURUF[i]}`, isi: <KoleksiKM p={p} benda={ro.benda} ukuran={8} /> }))}
            soal={ro.tanya.map((t) => {
              const p = ro.item.find((x) => jawabKM(x) === t) ?? ro.item[0];
              return { tanya: `Ketuk gambar yang nilai belum diketahuinya ${t}.`, jawab: idKM(p), petunjuk: petunjukKM(p), pesan: ketKM(p) };
            })}
            onBeres={beres}
            pesanBeres="Semua gambar sudah kamu temukan."
          />
        </>
      );
    });
  }

  function KartuSemua(d: PropsLangkah) {
    return Kartu(d, 6, `${pre}-semua`, "Ketuk semua gambar yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", D.semua.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
      const ro = D.semua[r];
      const tanya = `Ketuk semua gambar yang nilai belum diketahuinya ${teksBanding(ro.acuan, ro.arah)}.`;
      return (
        <>
          <IgilBicara pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
          <KetukSemua
            key={r}
            tanya={tanya}
            item={ro.item.map((p, i) => {
              const cocok = cocokKM(p, ro.acuan, ro.arah);
              return { id: idKM(p), label: HURUF[i], isi: <div className="min-w-0 max-w-[80%]"><KoleksiKM p={p} benda={ro.benda} ukuran={7} lebar="isi" /></div>, benar: cocok, penjelasan: `${ketKM(p)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
            })}
            onBeres={beres}
            pesanBeres="Semua gambar yang cocok sudah kamu temukan."
          />
        </>
      );
    });
  }

  function KartuCerita(d: PropsLangkah) {
    return Kartu(d, 7, `${pre}-cerita`, "Baca ceritanya, lihat kumpulan benda, lalu pilih nilai yang belum diketahui.", D.cerita.length, "Jawab semua soal dulu, ya.", (r, beres) => (
      <>
        <IgilBicara pendek="Cerita kalimat Matematika" teks={`Baca cerita ${huruf} dengan teliti. Lihat kumpulan benda dan kotak bertanda tanya. Lalu pilih nilai yang belum diketahui.`} />
        <PilihBertahap key={r} soal={D.cerita[r].map((s, i) => soalKM(s.p, <KoleksiKM p={s.p} benda={s.benda} ukuran={12} />, r * 2 + i, D.teksCerita[kunciKM(s)]))} onBeres={beres} pesanBeres="Semua cerita sudah kamu selesaikan." />
      </>
    ));
  }

  function KartuPapan(d: PropsLangkah) {
    return Kartu(d, 8, `${pre}-papan`, "Hitung nilai yang belum diketahui. Atur angka puluhan dan satuan pada papan, lalu tekan Periksa.", D.papan.length, "Isi semua papannya dulu, ya.", (r, beres) => (
      <>
        <IgilBicara pendek="Papan nilai kumpulan" teks="Cari nilai yang belum diketahui dari gambar kumpulan. Tulis puluhan dan satuannya pada papan." />
        <PapanDigit
          key={r}
          soal={D.papan[r].map((s) => ({ visual: <KoleksiKM p={s.p} benda={s.benda} ukuran={11} />, tanya: "Isi papan dengan nilainya.", jawab: jawabKM(s.p), petunjuk: petunjukKM(s.p), pesan: ketKM(s.p) }))}
          onBeres={beres}
          pesanBeres="Semua papan sudah terisi dengan benar."
        />
      </>
    ));
  }

  function KartuUrut(d: PropsLangkah) {
    return Kartu(d, 9, `${pre}-urut`, "Cari nilai yang belum diketahui pada tiap gambar. Ketuk gambar satu per satu dari nilai paling kecil atau paling besar.", D.urut.length, "Urutkan semua gambarnya dulu, ya.", (r, beres) => {
      const ro = D.urut[r];
      const ids = ro.item.map(idKM);
      const kunci = [...ro.item].sort((x, y) => (ro.dari === "kecil" ? jawabKM(x) - jawabKM(y) : jawabKM(y) - jawabKM(x))).map(idKM);
      const awal = ro.dari === "kecil" ? "terkecil" : "terbesar";
      return (
        <>
          <IgilBicara pendek={`Urutkan dari nilai ${awal}`} teks="Cari nilai yang belum diketahui pada tiap gambar. Lalu urutkan gambar menurut nilainya." />
          <UrutKetuk
            key={r}
            item={urutTampil(ids, kunci, r).map((id) => {
              const p = ro.item[ids.indexOf(id)];
              return { id, label: `Gambar ${HURUF[ids.indexOf(id)]}`, isi: <KoleksiKM p={p} benda={ro.benda} ukuran={8} /> };
            })}
            urutan={kunci}
            labelAwal={awal}
            labelAkhir={ro.dari === "kecil" ? "terbesar" : "terkecil"}
            petunjuk={(i) => `Belum, ${i.label} bukan yang berikutnya. Cari nilai tiap gambar.`}
            onBeres={beres}
            pesanBeres={`Urutan dari nilai ${awal} sudah benar.`}
          />
        </>
      );
    });
  }

  /* ------------------------------ Picture ------------------------------ */

  function KartuHitungBagan(d: PropsLangkah) {
    return Kartu(d, 10, `${pre}-hitungbagan`, "Lihat bagan batang. Hitung nilai yang bertanda tanya, lalu pilih hasilnya.", D.hitungP.length, "Jawab semua soal dulu, ya.", (r, beres) => (
      <>
        <CatatanTempel pendek="Hitung bagan" teks="Batang atas adalah keseluruhan. Dua batang di bawahnya adalah bagian. Cari nilai yang bertanda tanya." />
        <PilihBertahap key={r} soal={D.hitungP[r].map((p, i) => soalKM(p, <BaganKM p={p} />, r * 2 + i))} onBeres={beres} pesanBeres="Semua nilai pada bagan sudah kamu hitung." />
      </>
    ));
  }

  function KartuKalimatBagan(d: PropsLangkah) {
    return Kartu(d, 11, `${pre}-kalimatbagan`, "Lihat bagan. Lengkapi tiap kalimat dengan angka yang tepat.", D.kalimatP.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
      const p = D.kalimatP[r];
      return (
        <>
          <CatatanTempel pendek="Lengkapi kalimat dari bagan" teks="Lihat bagan dan kalimat Matematikanya. Cari nilai yang belum diketahui, isi kalimat, lalu periksa." />
          <BaganKM p={p} />
          <KalimatBesar p={p} kecil />
          <IsiKalimatGame key={r} kalimat={kalimatLangkahKM(p, r * 3)} onBeres={beres} pesanBeres="Semua kalimat sudah lengkap." />
        </>
      );
    });
  }

  function KartuJodohBagan(d: PropsLangkah) {
    return Kartu(d, 12, `${pre}-jodohbagan`, "Ketuk satu bagan di kiri, lalu ketuk kalimat Matematikanya di kanan.", D.pasangP.length, "Jodohkan semua baganmya dulu, ya.", (r, beres) => {
      const ro = D.pasangP[r];
      const kanan = ro.map((p) => ({ id: idKM(p), label: kalimatKM(p), isi: null as React.ReactNode }));
      return (
        <>
          <CatatanTempel pendek="Jodohkan bagan dan kalimat" teks="Lihat bagan batang dan batang yang bertanda tanya. Jodohkan dengan kalimat Matematika yang tepat." />
          <PasangKartu
            key={r}
            kiri={ro.map((p, i) => ({ id: idKM(p), label: `Bagan ${HURUF[i]}`, isi: <BaganKM p={p} /> }))}
            kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
            kunci={Object.fromEntries(ro.map((p) => [idKM(p), idKM(p)]))}
            petunjuk={() => "Belum cocok. Batang atas adalah keseluruhan. Batang bertanda tanya ditulis dengan titik-titik."}
            onBeres={beres}
            pesanBeres="Semua bagan sudah cocok dengan kalimatnya."
          />
        </>
      );
    });
  }

  function KartuMemoriBagan(d: PropsLangkah) {
    return Kartu(d, 13, `${pre}-memoribagan`, "Balik dua kartu. Cari bagan dan nilai yang belum diketahui.", D.memoriP.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
      <>
        <CatatanTempel pendek="Memori bagan dan nilai" teks="Balik dua kartu. Cari kartu bagan dan kartu nilai yang belum diketahui." />
        <MemoriKartu
          key={r}
          pasangan={D.memoriP[r].map((p, i) => ({ id: idKM(p), a: <BaganKM p={p} />, labelA: `bagan ${HURUF[i]}`, b: <Numeral n={jawabKM(p)} kelas="text-3xl" />, labelB: `nilai ${jawabKM(p)}` }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    ));
  }

  function KartuTabel(d: PropsLangkah) {
    return Kartu(d, 14, `${pre}-tabel`, "Ketuk baris tabel, lalu ketuk kartu nilai yang tepat. Ada satu kartu yang tidak dipakai.", D.tabelP.length, "Isi semua tabelnya dulu, ya.", (r, beres) => {
      const t = D.tabelP[r];
      return (
        <>
          <CatatanTempel pendek="Isi tabel kalimat" teks="Ketuk baris tabel, lalu ketuk kartu nilai yang tepat. Ada satu kartu pengecoh." />
          <IsiTabel key={r} kepala={t.kepala} baris={t.baris} kartu={t.kartu} petunjuk={() => "Belum tepat. Lihat tanda dan letak titik-titik, lalu kurangkan atau tambahkan."} onBeres={beres} pesanBeres="Tabel sudah terisi dengan benar." />
        </>
      );
    });
  }

  function KartuSemuaBagan(d: PropsLangkah) {
    return Kartu(d, 15, `${pre}-semuabagan`, "Ketuk semua bagan yang cocok dengan perintah. Boleh lebih dari satu. Lalu tekan Periksa.", D.semuaP.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
      const ro = D.semuaP[r];
      const tanya = `Ketuk semua bagan yang nilai belum diketahuinya ${teksBanding(ro.acuan, ro.arah)}.`;
      return (
        <>
          <CatatanTempel pendek="Ketuk semua yang cocok" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
          <KetukSemua
            key={r}
            tanya={tanya}
            item={ro.item.map((p, i) => {
              const cocok = cocokKM(p, ro.acuan, ro.arah);
              return { id: idKM(p), label: HURUF[i], isi: <div className="w-[190px] max-w-full"><BaganKM p={p} /></div>, benar: cocok, penjelasan: `${ketKM(p)} ${cocok ? "Ini cocok." : "Ini belum cocok."}` };
            })}
            onBeres={beres}
            pesanBeres="Semua bagan yang cocok sudah kamu temukan."
          />
        </>
      );
    });
  }

  function KartuPilahBagan(d: PropsLangkah) {
    return Kartu(d, 16, `${pre}-pilahbagan`, "Seret atau ketuk tiap bagan ke kotak: titik-titik di depan, atau di tengah kalimat.", D.pilahP.length, "Pilah semua baganmya dulu, ya.", (r, beres) => (
      <>
        <CatatanTempel pendek="Pilah bagan" teks="Lihat kalimat Matematika pada tiap bagan. Pilah menjadi titik-titik di depan atau titik-titik di tengah." />
        <Sortir
          key={r}
          lebarItem={150}
          kolomBin={2}
          item={urutanKe(D.pilahP[r].length, r).map((i) => {
            const p = D.pilahP[r][i];
            return {
              id: idKM(p),
              label: kalimatKM(p),
              isi: <BaganKM p={p} />,
              bin: p.hilang === "x" ? "depan" : "tengah",
              petunjuk: `Belum tepat. Lihat kalimat ${kalimatKM(p)}: titik-titik ada di ${p.hilang === "x" ? "depan" : "tengah"}.`,
              ucapan: `${kalimatKM(p)}, titik-titik di ${p.hilang === "x" ? "depan" : "tengah"}.`,
            };
          })}
          bin={BIN_LETAK}
          onBeres={beres}
          pesanBeres="Semua bagan sudah masuk kotak yang tepat."
        />
      </>
    ));
  }

  function KartuLangkah(d: PropsLangkah) {
    return Kartu(d, 17, `${pre}-langkah`, "Ketuk langkah satu per satu menurut urutan yang benar.", D.langkahP.length, "Urutkan semua langkahnya dulu, ya.", (r, beres) => {
      const ro = D.langkahP[r];
      const ids = ro.langkah.map((_, i) => `l${i}`);
      return (
        <>
          <CatatanTempel pendek="Urutkan langkah" teks={`${ro.judul}. Ketuk langkah satu per satu menurut urutan yang benar.`} />
          <p className="rounded-2xl bg-[#FFF7CC] px-2 py-1.5 text-center text-sm font-black text-[#1C01A5]">{ro.judul}</p>
          <UrutKetuk
            key={r}
            item={urutTampil(ids, ids, r).map((id) => ({ id, label: ro.langkah[ids.indexOf(id)] }))}
            urutan={ids}
            labelAwal="pertama"
            labelAkhir="terakhir"
            petunjuk={() => "Belum, itu bukan langkah berikutnya. Mulai dari membaca kalimat, lalu mengurangkan atau menambahkan, lalu memeriksa."}
            onBeres={beres}
            pesanBeres="Urutan langkah sudah benar."
          />
        </>
      );
    });
  }

  function KartuPapanBagan(d: PropsLangkah) {
    return Kartu(d, 18, `${pre}-papanbagan`, "Baca bagan. Atur angka puluhan dan satuan nilainya pada papan, lalu tekan Periksa.", D.papanP.length, "Isi semua papannya dulu, ya.", (r, beres) => (
      <>
        <CatatanTempel pendek="Papan nilai dari bagan" teks="Baca bagan dan cari nilai yang bertanda tanya. Tulis puluhan dan satuannya pada papan." />
        <PapanDigit key={r} soal={D.papanP[r].map((p) => ({ visual: <BaganKM p={p} />, tanya: "Isi papan dengan nilainya.", jawab: jawabKM(p), petunjuk: petunjukKM(p), pesan: ketKM(p) }))} onBeres={beres} pesanBeres="Semua papan sudah terisi dengan benar." />
      </>
    ));
  }

  function KartuKemungkinan(d: PropsLangkah) {
    return Kartu(d, 19, `${pre}-kemungkinan`, "Ketuk semua pasangan bilangan yang mungkin. Boleh lebih dari satu. Lalu tekan Periksa.", D.kemungkinanP.length, "Selesaikan semua soalnya dulu, ya.", (r, beres) => {
      const ro = D.kemungkinanP[r];
      const tanya = `Ketuk semua pasangan yang ${bagianSebut} ${ro.total}.`;
      return (
        <>
          <CatatanTempel pendek="Kemungkinan pasangan" teks={`${tanya} Boleh lebih dari satu. Lalu tekan periksa.`} />
          <KetukSemua
            key={r}
            tanya={tanya}
            item={ro.pasang.map(([a, b]) => {
              const cocok = a + b === ro.total;
              return { id: `${a}_${b}`, label: `${a} + ${b}`, isi: <BaganGabung a={a} b={b} />, benar: cocok, penjelasan: `${a} + ${b} = ${a + b}. ${cocok ? `Sama dengan ${ro.total}, jadi ini mungkin.` : `Tidak sama dengan ${ro.total}, jadi ini tidak mungkin.`}` };
            })}
            onBeres={beres}
            pesanBeres="Semua pasangan yang mungkin sudah kamu temukan."
          />
        </>
      );
    });
  }

  /* ------------------------------ Abstract ------------------------------ */

  function KartuIsi(d: PropsLangkah) {
    return Kartu(d, 20, `${pre}-isi`, "Cari nilai yang belum diketahui. Pilih hasil yang benar dari tiga pilihan.", D.isiQ.length, "Jawab semua soal dulu, ya.", (r, beres) => (
      <>
        <CatatanPensil pendek="Isi nilai yang belum diketahui" teks="Cari nilai titik-titik pada kalimat Matematika. Hati-hati dengan letak titik-titik. Pilih hasil yang benar." />
        <PilihBertahap key={r} soal={D.isiQ[r].map((p, i) => soalKM(p, <KalimatBesar p={p} />, r * 2 + i, `${kalimatKM(p)}. Berapa nilai titik-titik?`))} onBeres={beres} pesanBeres="Semua nilai sudah kamu pilih." />
      </>
    ));
  }

  function KartuPapanNilai(d: PropsLangkah) {
    return Kartu(d, 21, `${pre}-papannilai`, "Cari nilai titik-titik. Atur angka puluhan dan satuannya pada papan, lalu tekan Periksa.", D.papanQ.length, "Isi semua papannya dulu, ya.", (r, beres) => (
      <>
        <CatatanPensil pendek="Papan nilai" teks="Cari nilai titik-titik pada kalimat Matematika. Tulis puluhan dan satuannya pada papan." />
        <PapanDigit key={r} soal={D.papanQ[r].map((p) => ({ visual: <KalimatBesar p={p} />, tanya: "Isi papan dengan nilainya.", jawab: jawabKM(p), petunjuk: petunjukKM(p), pesan: ketKM(p) }))} onBeres={beres} pesanBeres="Semua papan sudah terisi dengan benar." />
      </>
    ));
  }

  function KartuLangkahIsi(d: PropsLangkah) {
    return Kartu(d, 22, `${pre}-langkahisi`, "Lengkapi langkah mencari nilai, mengisi kalimat, dan memeriksa hasilnya.", D.langkahQ.length, "Lengkapi semua kalimat dulu, ya.", (r, beres) => {
      const p = D.langkahQ[r];
      return (
        <>
          <CatatanPensil pendek="Cari, isi, periksa" teks="Cari nilai dengan operasi kebalikan. Lalu isi kalimat Matematikanya dan periksa hasilnya." />
          <KalimatBesar p={p} />
          <IsiKalimatGame key={r} kalimat={kalimatLangkahKM(p, r * 3)} onBeres={beres} pesanBeres="Semua langkah sudah lengkap." />
        </>
      );
    });
  }

  function KartuJodohNilai(d: PropsLangkah) {
    return Kartu(d, 23, `${pre}-jodohnilai`, "Ketuk satu kalimat di kiri, lalu ketuk nilainya di kanan.", D.pasangQ.length, "Jodohkan semua pasangannya dulu, ya.", (r, beres) => {
      const ro = D.pasangQ[r];
      const kanan = ro.map((p) => ({ id: idKM(p), label: String(jawabKM(p)), isi: null as React.ReactNode }));
      return (
        <>
          <CatatanPensil pendek="Jodohkan kalimat dan nilai" teks="Cari nilai titik-titik pada tiap kalimat Matematika. Jodohkan dengan nilainya." />
          <PasangKartu
            key={r}
            kiri={ro.map((p) => ({ id: idKM(p), label: kalimatKM(p), isi: null as React.ReactNode }))}
            kanan={urutanKe(kanan.length, r).map((i) => kanan[i])}
            kunci={Object.fromEntries(ro.map((p) => [idKM(p), idKM(p)]))}
            petunjuk={() => "Belum cocok. Lihat tanda dan letak titik-titik, lalu kurangkan atau tambahkan."}
            onBeres={beres}
            pesanBeres="Semua kalimat sudah cocok dengan nilainya."
          />
        </>
      );
    });
  }

  function KartuMemoriNilai(d: PropsLangkah) {
    return Kartu(d, 24, `${pre}-memorinilai`, "Balik dua kartu. Cari kalimat dan nilainya.", D.memoriQ.length, "Temukan semua pasangannya dulu, ya.", (r, beres) => (
      <>
        <CatatanPensil pendek="Memori kalimat dan nilai" teks="Balik dua kartu. Cari kartu kalimat Matematika dan kartu nilainya." />
        <MemoriKartu
          key={r}
          pasangan={D.memoriQ[r].map((p, i) => ({ id: idKM(p), a: <Numeral n={kalimatKM(p)} kelas="text-base" />, labelA: `kalimat ${HURUF[i]}`, b: <Numeral n={jawabKM(p)} kelas="text-3xl" />, labelB: `nilai ${jawabKM(p)}` }))}
          onBeres={beres}
          pesanBeres="Semua pasangan sudah ketemu."
        />
      </>
    ));
  }

  function KartuBenarSalah(d: PropsLangkah) {
    return Kartu(d, 25, `${pre}-benarsalah`, "Baca tiap pernyataan, lalu pilih benar atau salah. Setiap jawaban ada penjelasannya.", D.benarSalahQ.length, "Jawab semua pernyataan dulu, ya.", (r, beres) => (
      <>
        <CatatanPensil pendek="Benar atau salah" teks="Baca pernyataan tentang kalimat Matematika dengan teliti. Pilih benar atau salah." />
        <BenarSalahGame key={r} pernyataan={D.benarSalahQ[r]} onBeres={beres} pesanBeres="Semua pernyataan sudah kamu nilai." />
      </>
    ));
  }

  function KartuDetektif(d: PropsLangkah) {
    return Kartu(d, 26, `${pre}-detektif`, "Baca semua petunjuk. Pilih bilangan yang cocok dengan semuanya.", D.detektifQ.length, "Tebak dulu aku bilangan berapa, ya.", (r, beres) => {
      const s = D.detektifQ[r];
      return (
        <>
          <CatatanPensil pendek="Detektif kalimat Matematika" teks="Baca semua petunjuk dengan teliti. Pilih bilangan yang cocok dengan semuanya." />
          <DetektifTeks key={r} soal={{ petunjuk: s.klue, opsi: s.opsi.map(String), jawab: s.opsi.indexOf(s.jawab), salah: s.salah }} onBeres={beres} pesanBeres={(nama) => `Benar, aku bilangan ${nama}.`} />
        </>
      );
    });
  }

  function KartuPeta(d: PropsLangkah) {
    return Kartu(d, 27, `${pre}-peta`, "Lengkapi peta konsep. Kotak yang menyala menunggu kartu. Baca tiga kartu, lalu pilih yang tepat.", D.petaQ.length, "Lengkapi peta konsepnya dulu, ya.", (r, beres) => {
      const p = D.petaQ[r];
      return (
        <>
          <CatatanPensil pendek={`Peta konsep: ${p.pusat}`} teks={`Lengkapi peta konsep ${p.pusat.toLowerCase()}. Kotak yang menyala menunggu kartu. Baca tiga kartunya, lalu pilih yang tepat.`} />
          <PetaKonsepGame key={r} pusat={p.pusat} kotak={p.kotak} onBeres={beres} pesanBeres={`Peta konsep ${p.pusat.toLowerCase()} sudah lengkap.`} />
        </>
      );
    });
  }

  function KartuCeritaAngka(d: PropsLangkah) {
    return Kartu(d, 28, `${pre}-ceritaangka`, "Baca soal cerita. Tulis kalimat Matematikanya dalam hati, lalu pilih nilai yang belum diketahui.", D.ceritaQ.length, "Jawab semua soal dulu, ya.", (r, beres) => (
      <>
        <CatatanPensil pendek="Soal cerita kalimat Matematika" teks="Baca soal cerita dengan teliti. Tulis kalimat Matematikanya dengan titik-titik, lalu pilih nilainya." />
        <PilihBertahap key={r} soal={D.ceritaQ[r].map((c, i) => soalKM(c.p, <KalimatBesar p={c.p} kecil />, r * 2 + i, c.teks))} onBeres={beres} pesanBeres="Semua soal cerita sudah kamu selesaikan." />
      </>
    ));
  }

  function KartuSusunKata(d: PropsLangkah) {
    return Kartu(d, 29, `${pre}-susunkata`, "Ketuk kata-kata berurutan sampai menjadi kalimat yang benar. Satu kartu kata tidak dipakai.", D.susunKataQ.length, "Susun semua kalimat dulu, ya.", (r, beres) => (
      <>
        <CatatanPensil pendek="Susun kata kalimat Matematika" teks="Ketuk kata satu per satu sampai menjadi kalimat yang benar. Ada satu kata yang tidak dipakai." />
        <SusunKata key={r} kata={D.susunKataQ[r].kata} pengecoh={D.susunKataQ[r].pengecoh} nomor={r} onBeres={beres} />
      </>
    ));
  }

  /* ------------------------------ Pembungkus tiga tahap ------------------------------ */

  const KARTU_CONCRETE: KartuTahap[] = [KartuRakit, KartuHitung, KartuTulis, KartuJodoh, KartuMemori, KartuKetuk, KartuSemua, KartuCerita, KartuPapan, KartuUrut].map((K, i) => ({
    nomor: i + 1,
    render: (d) => <K {...d} />,
  }));
  const KARTU_PICTURE: KartuTahap[] = [KartuHitungBagan, KartuKalimatBagan, KartuJodohBagan, KartuMemoriBagan, KartuTabel, KartuSemuaBagan, KartuPilahBagan, KartuLangkah, KartuPapanBagan, KartuKemungkinan].map((K, i) => ({
    nomor: i + 11,
    render: (d) => <K {...d} />,
  }));
  const KARTU_ABSTRACT: KartuTahap[] = [KartuIsi, KartuPapanNilai, KartuLangkahIsi, KartuJodohNilai, KartuMemoriNilai, KartuBenarSalah, KartuDetektif, KartuPeta, KartuCeritaAngka, KartuSusunKata].map((K, i) => ({
    nomor: i + 21,
    render: (d) => <K {...d} />,
  }));

  const visual = kode === "A" ? visualInfografisK3B2A() : visualInfografisK3B2B();
  const suaraInfo = `Ini poster rangkuman tentang kalimat Matematika ${huruf}. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.`;

  function Infografis({ speakGuru }: { speakGuru: (teks: string) => void }) {
    return <InfografisK2B2 s={S} judul={`Kalimat Matematika ${huruf}`} suaraInfo={suaraInfo} visual={visual} speakGuru={speakGuru} />;
  }
  function Concrete(props: Umum) {
    return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧺", nama: "CONCRETE", cara: "Rakit dan hitung benda!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
  }
  function Picture(props: Umum) {
    return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat bagan batang", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
  }
  function Abstract(props: Umum) {
    return (
      <TahapPermainan
        umum={props}
        tahap={6}
        pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kalimat dan nilai", warna: "#1C01A5" }}
        kartu={KARTU_ABSTRACT}
        teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
        labelKartu="Langkah"
        poin={(selesai) => <PoinK2B2 s={S} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai={`SELESAIKAN SUB-BAB ${kode} ➡️`} />}
      />
    );
  }
  return { Infografis, Concrete, Picture, Abstract };
}

const TAHAP_A = buatTahap("A", SUB_A32, DATA_A, "jumlah");
const TAHAP_B = buatTahap("B", SUB_B32, DATA_B, "awal");

export const InfografisK3B2AKomponen = TAHAP_A.Infografis;
export const ConcreteK3B2A = TAHAP_A.Concrete;
export const PictureK3B2A = TAHAP_A.Picture;
export const AbstractK3B2A = TAHAP_A.Abstract;
export const InfografisK3B2BKomponen = TAHAP_B.Infografis;
export const ConcreteK3B2B = TAHAP_B.Concrete;
export const PictureK3B2B = TAHAP_B.Picture;
export const AbstractK3B2B = TAHAP_B.Abstract;
