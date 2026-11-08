"use client";

import React, { useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, PilihAngka, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { JawabSuara, JudulGame, KABAR_TULIS_OK, KabarChip, Letusan, PanelPoster, STIKER, TombolLanjut, kata, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { CatatanPensil, LencanaSuara, PitaTahap, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { PoinPentingK2, TahapPermainan, type ItemPoin, type KartuTahap } from "./kit-k2";
import { GarisBilanganK2, ModelBatang, RakTelur, KantongKelereng, SusunBalok, Tas, sebut } from "./dasar-k2";
import { RONDE_DETEKTIF_K2, RONDE_JODOH_K2, TULIS_A_PILIHAN, TULIS_A_RONDE1, namaBilangan, sukuKata } from "./data-k2";
import { LangkahIkatK2, LangkahLokerK2, LangkahSusunK2, LangkahTebakK2 } from "./SubBabK2AConcrete";
import { KartuBingkaiK2, KartuGarisK2, KartuJalurK2 } from "./SubBabK2APicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai  */
/* dengan 50 (Buku Siswa Kelas II hlm. 3-16). Semua di klien, tanpa API.      */
/* Naskah: naskah/mtk-2-bab1-sub-a-menghitung-membaca-menulis-bilangan.md     */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Ikat Sepuluh Pensil (pilih dan ikat), 2 Hitung Tas di Loker   */
/*            (ketuk), 3 Susun Balok Jadi Puluhan (seret), 4 Tebak Isi        */
/*            Kantong Kelereng (menebak dan membuktikan).                     */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Warnai Lima Bingkai Sepuluh, 6 Tarik Garis Berurutan,         */
/*            7 Jalur Bilangan Maju dan Mundur.                               */
/*  Abstract: 8 Jodohkan Lambang dan Nama, 9 Detektif Bilangan Misterius,     */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman bilangan sampai lima puluh. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2";

/** Tabel 1.1 di buku: banyak benda, pasangan bilangan, lambang, dan cara membaca. */
function TabelBilanganK2({ baris }: { baris: number[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
      <div className="grid grid-cols-[3rem_5.5rem_1fr] bg-[#FFE566] px-1 py-1 text-[10px] font-black leading-tight text-[#1C01A5]">
        <span>Lambang</span>
        <span>Pasangan</span>
        <span>Cara membaca</span>
      </div>
      {baris.map((n, i) => (
        <div key={n} className={`grid grid-cols-[3rem_5.5rem_1fr] items-center px-1 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
          <span className="text-2xl font-black text-[#1C01A5]">{n}</span>
          <span className="text-sm font-black text-[#166534]">
            {Math.floor(n / 10) * 10} + {n % 10}
          </span>
          <span className="text-sm font-black leading-tight text-[#1C01A5]">
            {namaBilangan(n)}
            <span className="block text-[10px] font-black text-[#7C3AED]">{sukuKata(n)}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** Papan 1 sampai 50: lima baris sepuluh. Kolom sepuluh (10, 20, 30, 40, 50) diberi warna. */
function PapanLimaPuluh() {
  return (
    <div className="grid grid-cols-10 gap-0.5 rounded-xl border-4 border-[#1C01A5] bg-white p-1" role="table" aria-label="Papan bilangan 1 sampai 50">
      {Array.from({ length: 50 }, (_, i) => {
        const n = i + 1;
        const puluhan = n % 10 === 0;
        const baris = Math.floor(i / 10);
        return (
          <span
            key={n}
            role="cell"
            className={`flex h-6 items-center justify-center rounded text-[11px] font-black ${puluhan ? "bg-[#EF4444] text-white" : ["bg-[#DBEAFE]", "bg-[#FCE7F3]", "bg-[#DCFCE7]", "bg-[#FEF9C3]", "bg-[#EDE9FE]"][baris] + " text-[#1C01A5]"}`}
          >
            {n}
          </span>
        );
      })}
    </div>
  );
}

const INGAT_K2A = [
  {
    ikon: "📦",
    nama: "Sepuluh dulu",
    ket: "Kelompokkan sepuluh, lalu tambah sisanya",
    suara: "Kelompokkan sepuluh dulu. Hitung kelompok sepuluh-sepuluh, lalu tambahkan benda yang tersisa. Dua kelompok sepuluh dan enam benda lagi adalah dua puluh enam.",
  },
  {
    ikon: "🗣️",
    nama: "Nama puluhan",
    ket: "Dua puluh, tiga puluh, empat puluh, lima puluh",
    suara: "Nama puluhan: sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh. Untuk bilangan di antaranya, sebut nama puluhan dulu, lalu nama satuannya. Misalnya dua puluh enam.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisHitungK2A({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Bilangan sampai 50</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="HITUNG TAS SATU PER SATU"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Semua anak sudah meletakkan tas di dalam loker. Kita hitung tas satu per satu, dan setiap tas hanya dihitung satu kali. Baris pertama ada sepuluh tas, baris kedua ada sepuluh tas, baris ketiga ada enam tas. Ada dua puluh enam tas di dalam loker. Dua puluh enam ditulis 26. Banyak tas sama dengan banyak anak, jadi ada dua puluh enam anak di kelas Malosi."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-[#FFF3DB] px-2 py-2">
          {[
            { baris: "1 sampai 10", n: 10, w: 2 },
            { baris: "11 sampai 20", n: 10, w: 1 },
            { baris: "21 sampai 26", n: 6, w: 0 },
          ].map((b) => (
            <div key={b.baris} className="flex items-center gap-1.5">
              <span className="w-[5.2rem] shrink-0 text-[10px] font-black leading-tight text-[#1C01A5]">{b.baris}</span>
              <span className="flex flex-wrap gap-0.5">
                {Array.from({ length: b.n }, (_, i) => (
                  <Tas key={i} warna={b.w} kelas="h-5 w-5" />
                ))}
              </span>
            </div>
          ))}
          <p className="pt-1 text-center text-xl font-black text-[#1C01A5]">26 = dua puluh enam</p>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Satu tas, satu anak. Banyak tas sama dengan banyak anak.</p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="KELOMPOK SEPULUH"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Untuk menghitung benda yang banyak, kelompokkan setiap sepuluh benda. Satu ikat berisi sepuluh pensil. Satu wadah berisi sepuluh telur. Satu ikat berisi sepuluh lidi. Satu susun berisi sepuluh balok. Satu bingkai berisi sepuluh kancing. Satu kantong berisi sepuluh kacang. Mengelompokkan setiap sepuluh benda memudahkan kita menghitung."
      >
        <div className="grid grid-cols-3 gap-1 text-center">
          <div className={SEL}>
            <RakTelur kelas="mx-auto h-12 w-20" />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]">1 wadah = 10 telur</p>
          </div>
          <div className={SEL}>
            <SusunBalok kelas="mx-auto h-12 w-20" />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]">1 susun = 10 balok</p>
          </div>
          <div className={SEL}>
            <KantongKelereng kelas="mx-auto h-12 w-12" />
            <p className="text-[11px] font-black leading-tight text-[#1C01A5]">1 kantong = 10 kacang</p>
          </div>
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Juga: 1 ikat = 10 pensil, 1 ikat = 10 lidi, 1 bingkai = 10 kancing.</p>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="PULUHAN SAMPAI LIMA PULUH"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Satu kelompok sepuluh dibaca sepuluh. Dua kelompok sepuluh, dua puluh. Tiga kelompok sepuluh, tiga puluh. Empat kelompok sepuluh, empat puluh. Lima kelompok sepuluh, lima puluh. Perhatikan: sepuluh ditambah sepuluh sama dengan dua puluh, dua puluh ditambah sepuluh sama dengan tiga puluh."
      >
        <div className="grid grid-cols-5 items-end gap-1 text-center">
          {[1, 2, 3, 4, 5].map((p) => (
            <div key={p} className={SEL}>
              <div className="flex min-h-[4.2rem] items-end justify-center gap-0.5">
                <ModelBatang p={p} s={0} />
              </div>
              <p className="text-lg font-black text-[#1C01A5]">{p * 10}</p>
              <p className="text-[10px] font-black leading-tight text-[#7C3AED]">{namaBilangan(p * 10)}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="BILANGAN 21 SAMPAI 25"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Dua puluh satu, dua puluh ditambah satu. Dua puluh dua, dua puluh ditambah dua. Dua puluh tiga, dua puluh ditambah tiga. Dua puluh empat, dua puluh ditambah empat. Dua puluh lima, dua puluh ditambah lima. Nama bilangannya selalu nama puluhan, lalu nama satuan."
      >
        <TabelBilanganK2 baris={[21, 22, 23, 24, 25]} />
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="BILANGAN 26 SAMPAI 30"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Dua puluh enam, dua puluh ditambah enam. Dua puluh tujuh, dua puluh ditambah tujuh. Dua puluh delapan, dua puluh ditambah delapan. Dua puluh sembilan, dua puluh ditambah sembilan. Dua puluh ditambah sepuluh sama dengan tiga puluh. Tiga puluh tidak disebut dua puluh sepuluh, namanya tiga puluh."
      >
        <TabelBilanganK2 baris={[26, 27, 28, 29, 30]} />
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="SAMPAI LIMA PULUH: POLA NAMANYA"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Bilangan tiga puluh satu sampai lima puluh punya pola nama yang sama. Sebut nama puluhannya dulu, lalu satuannya. Tiga puluh satu, tiga puluh dua, tiga puluh tiga. Empat puluh satu, empat puluh dua. Empat puluh tujuh, empat puluh delapan, empat puluh sembilan. Lalu lima puluh. Kalau satuannya nol, kita hanya menyebut nama puluhannya."
      >
        <div className="grid grid-cols-2 gap-1">
          {[31, 38, 40, 44, 47, 50].map((n) => (
            <div key={n} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5] bg-[#EEF2FF] px-2 py-1">
              <span className="text-2xl font-black text-[#1C01A5]">{n}</span>
              <span className="text-xs font-black leading-tight text-[#1C01A5]">{namaBilangan(n)}</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="MAJU DAN MUNDUR"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Menghitung maju dari dua puluh sampai tiga puluh: dua puluh, dua puluh satu, dua puluh dua, dan seterusnya sampai tiga puluh. Menghitung mundur dari tiga puluh sampai dua puluh: tiga puluh, dua puluh sembilan, dua puluh delapan, dan seterusnya sampai dua puluh. Maju, bilangan makin besar. Mundur, bilangan makin kecil. Di garis bilangan, maju ke kanan dan mundur ke kiri."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisBilanganK2 dari={20} sampai={30} lompat={[[20, 30]]} tandai={[20, 30]} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Maju 20 → 30 • Mundur 30 → 20</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="PAPAN 1 SAMPAI 50"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Ini papan bilangan satu sampai lima puluh. Setiap baris berisi sepuluh bilangan. Bilangan yang berwarna merah adalah sepuluh, dua puluh, tiga puluh, empat puluh, dan lima puluh. Lihat polanya: bilangan di bawahnya selalu lebih besar sepuluh. Dua puluh enam tepat di bawah enam belas, yaitu sepuluh lebih besar. Papan seperti ini dipakai banyak guru di dunia untuk melihat pola bilangan."
      >
        <PapanLimaPuluh />
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Turun satu baris berarti lebih sepuluh. Geser satu kotak ke kanan berarti lebih satu.</p>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="TEBAK DAN BUKTIKAN"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Kita boleh menebak banyak benda sebelum menghitung. Tiga langkahnya: tebak, hitung, lalu bandingkan. Cobalah memakai patokan sepuluh. Bayangkan satu kelompok sepuluh, lalu perkirakan ada berapa kelompok seperti itu. Setelah itu hitung benda untuk membuktikan tebakanmu. Tebakan yang meleset tidak apa-apa, karena menebak melatih perasaan bilangan."
      >
        <div className="grid grid-cols-3 gap-1 text-center">
          {[
            ["🤔", "Tebak", "pakai patokan sepuluh"],
            ["🔢", "Hitung", "sepuluh-sepuluh"],
            ["⚖️", "Bandingkan", "tebakan dan hitungan"],
          ].map(([ikon, nama, ket], i) => (
            <div key={nama} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5">
              <p className="text-[10px] font-black text-[#0E7490]">{i + 1}</p>
              <p className="text-2xl" aria-hidden="true">
                {ikon}
              </p>
              <p className="text-xs font-black leading-tight text-[#1C01A5]">{nama}</p>
              <p className="text-[10px] font-black leading-tight text-[#1C01A5]/70">{ket}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_K2A.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="igil-tanpa-tepi space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-lg font-black text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Jodohkan Lambang dan Nama ------------------------- */

const URUTAN_NAMA = [2, 0, 3, 1];

function RondeJodoh({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const angka = RONDE_JODOH_K2[ronde];
  const nama = URUTAN_NAMA.map((k) => angka[k]);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [cocok, setCocok] = useState<number[]>([]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = cocok.length === angka.length;
  useBicara(beres, `Semua pasangan benar. ${angka.map((n) => `${n} dibaca ${sebut(n)}`).join(". ")}.`);

  const pilihAngka = (n: number) => {
    if (cocok.includes(n)) return;
    setDipilih(n);
    setKeliru(null);
    setKabar(null);
  };
  const pilihNama = (n: number) => {
    if (cocok.includes(n)) return;
    if (dipilih === null) {
      setKabar({ teks: "Ketuk dulu lambang bilangannya di kolom kiri, lalu cari namanya.", ok: false });
      return;
    }
    if (dipilih === n) {
      const baru = [...cocok, n];
      setCocok(baru);
      setDipilih(null);
      setKeliru(null);
      setKabar(null);
      if (baru.length === angka.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(n);
      setKabar({ teks: `Itu bukan nama dari ${sebut(dipilih)}. Baca nama puluhannya dulu, lalu nama satuannya.`, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Semua pasangan benar!" : "Jodohkan lambang dan nama"}
        teks="Jodohkan lambang bilangan dengan cara membacanya. Ketuk lambang di kolom kiri, lalu ketuk nama yang cocok di kolom kanan. Baca nama puluhannya dulu, lalu satuannya."
      />
      <div className={KERTAS_ANGKA}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2" role="group" aria-label="Lambang bilangan">
            {angka.map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`Lambang ${n}${cocok.includes(n) ? ", sudah cocok" : ""}`}
                aria-pressed={dipilih === n}
                disabled={cocok.includes(n)}
                onClick={() => pilihAngka(n)}
                className={`igil-tanpa-tepi flex h-14 w-full items-center justify-center rounded-2xl border-4 text-4xl font-black text-[#1C01A5] ${
                  cocok.includes(n) ? "border-[#7FCB96] bg-[#E8F7EE]" : dipilih === n ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-[#FFE566]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="space-y-2" role="group" aria-label="Cara membaca">
            {nama.map((n) => (
              <button
                key={`${n}-${keliru === n ? "x" : "o"}`}
                type="button"
                aria-label={`Nama ${namaBilangan(n)}${cocok.includes(n) ? ", sudah cocok" : ""}`}
                disabled={cocok.includes(n)}
                onClick={() => pilihNama(n)}
                className={`igil-tanpa-tepi flex h-14 w-full items-center justify-center rounded-2xl border-4 px-1 text-center text-sm font-black leading-tight text-[#1C01A5] ${
                  cocok.includes(n) ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"
                } ${keliru === n ? "igil-goyang" : ""}`}
              >
                {namaBilangan(n)}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Pasangan benar: {cocok.length} dari {angka.length}
        </p>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuJodohK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Jodohkan Lambang dan Nama"
      warna="#BBF7D0"
      petunjuk="Jodohkan lambang bilangan dengan cara membacanya. Ketuk lambang di kolom kiri, lalu ketuk nama yang cocok di kolom kanan. Baca nama puluhannya dulu, lalu nama satuannya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-jodoh"
      jumlahRonde={RONDE_JODOH_K2.length}
      belumSiap="Jodohkan semua pasangan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJodoh ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Detektif Bilangan Misterius ----------------------- */

function RondeDetektif({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_DETEKTIF_K2[ronde];
  const akhir = ronde === RONDE_DETEKTIF_K2.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2a-detektif"] === true && akhir;
  useBicara(akhir ? suara : beres, `Bilangan misterius itu adalah ${sebut(d.jawab)}. Lambangnya ${d.jawab}.`);

  const pilih = (n: number) => {
    if (beres) return;
    if (n === d.jawab) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: d.salah, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangan itu" : "Kamu detektif hebat!") : "Siapa aku?"}
        teks={`Aku bilangan misterius. ${d.petunjuk.join(" ")} Bilangan apakah aku?${akhir ? " Setelah ketemu, ucapkan bilangan itu." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1.5">
          {d.petunjuk.map((p, i) => (
            <p key={p} className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
              🔎 Petunjuk {i + 1}: {p}
            </p>
          ))}
        </div>
        <PilihAngka opsi={d.opsi.slice().sort((a, b) => a - b)} keliru={keliru} onPilih={pilih} mati={beres} />
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? "Aku bilangan: ?" : `Aku bilangan ${d.jawab}, dibaca ${sebut(d.jawab)}.`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuDetektifK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Bilangan Misterius"
      warna="#FDE68A"
      petunjuk="Baca petunjuk tentang bilangan misterius, lalu pilih bilangan yang cocok dengan semua petunjuk. Pada soal terakhir, ucapkan bilangan itu."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-detektif"
      jumlahRonde={RONDE_DETEKTIF_K2.length}
      kunciAkhir={RONDE_DETEKTIF_K2[RONDE_DETEKTIF_K2.length - 1].jawab}
      belumSiap="Temukan bilangan misterius dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

function KartuTulisK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const n = tahap === 0 ? TULIS_A_RONDE1 : pilih;
  const id = tahap === 0 ? "k2a-tulis-0" : `k2a-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && n !== null, n !== null ? `${kata(n)}. Lambangnya ${n}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Baca nama bilangannya, ucapkan, lalu guratkan angkanya di kanvas. Setelah itu, pilih bilangan yang kamu suka.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Baca dan ucapkan namanya" : n ? `Ucapkan: ${kata(n)}` : "Pilih satu bilangan"}
          teks={
            tahap === 0
              ? `Baca nama bilangan ini: ${sebut(TULIS_A_RONDE1)}. Ucapkan namanya, lalu guratkan lambangnya di kanvas. ${sebut(TULIS_A_RONDE1)} ditulis dengan angka dua dan angka enam. Dua puluhan dan enam satuan.`
              : `Ayo mencoba. Pilih satu bilangan sesukamu: ${TULIS_A_PILIHAN.map(sebut).join(", ")}. Ucapkan namanya, lalu guratkan lambangnya di kanvas.`
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              Nama bilangan: {sebut(TULIS_A_RONDE1)} • {Math.floor(TULIS_A_RONDE1 / 10) * 10} + {TULIS_A_RONDE1 % 10}
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {TULIS_A_PILIHAN.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-label={`Pilih ${kata(p)}`}
                  disabled={pilih !== null}
                  onClick={() => setPilih(p)}
                  className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${pilih === p ? "bg-[#7FCB96]" : "bg-[#FFE566]"}`}
                >
                  {kata(p)}
                </button>
              ))}
            </div>
          )}
          {n !== null ? (
            <p className="text-center text-2xl font-black text-[#1C01A5]">
              {kata(n)} = {suara ? n : "?"}
            </p>
          ) : null}
        </div>
        {n !== null ? <JawabSuara id={id} jumlah={n} panel={panel} siap belumSiap="" /> : null}
        {suara && n !== null ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={n} kata={kata(n)} onCompletedTrace={() => setLulus(true)} />
            <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
          </div>
        ) : null}
        {suara && tahap === 0 ? (
          <button
            type="button"
            onClick={() => {
              panel.bersih();
              setLulus(false);
              setTahap(1);
            }}
            className={TOMBOL_KECIL}
          >
            ▶ Ayo Mencoba
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const POIN_K2A: ItemPoin[] = [
  {
    ikon: "📦",
    nama: "Sepuluh dulu",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 + 10 + 6 = 26</p>,
    suara: "Kelompokkan sepuluh dulu. Hitung kelompok sepuluh-sepuluh, lalu tambahkan sisanya. Sepuluh ditambah sepuluh sama dengan dua puluh. Dua puluh ditambah enam sama dengan dua puluh enam.",
  },
  {
    ikon: "🗣️",
    nama: "Nama puluhan",
    isi: (
      <div className="grid grid-cols-3 gap-1">
        {[20, 30, 40, 50].map((n) => (
          <span key={n} className="rounded-xl border-2 border-[#1C01A5] bg-[#FFE566] px-1 py-0.5 text-center text-sm font-black leading-tight text-[#1C01A5]">
            {n} {namaBilangan(n)}
          </span>
        ))}
        <span className="rounded-xl border-2 border-[#1C01A5] bg-[#FFE566] px-1 py-0.5 text-center text-sm font-black leading-tight text-[#1C01A5]">26 {namaBilangan(26)}</span>
        <span className="rounded-xl border-2 border-[#1C01A5] bg-[#FFE566] px-1 py-0.5 text-center text-sm font-black leading-tight text-[#1C01A5]">47 {namaBilangan(47)}</span>
      </div>
    ),
    suara: "Nama puluhan: dua puluh, tiga puluh, empat puluh, lima puluh. Untuk bilangan di antaranya, sebut nama puluhan lalu nama satuan. Dua puluh enam. Empat puluh tujuh.",
  },
  {
    ikon: "✍️",
    nama: "Baca dan tulis",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">angka kiri = puluhan, angka kanan = satuan</p>,
    suara: "Bilangan dua angka ditulis puluhan dulu, lalu satuan. Angka di kiri menunjukkan banyak puluhan. Angka di kanan menunjukkan banyak satuan. Dua puluh enam ditulis 2 lalu 6.",
  },
  {
    ikon: "↔️",
    nama: "Maju dan mundur",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">maju: makin besar • mundur: makin kecil</p>,
    suara: "Menghitung maju, bilangan makin besar. Menghitung mundur, bilangan makin kecil. Setelah dua puluh sembilan datang tiga puluh. Sebelum tiga puluh ada dua puluh sembilan.",
  },
  {
    ikon: "🔍",
    nama: "Tebak dan buktikan",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">tebak, hitung, bandingkan</p>,
    suara: "Kita boleh menebak banyak benda dulu, memakai patokan sepuluh. Lalu hitung untuk membuktikan, dan bandingkan tebakan dengan hasil hitungan.",
  },
];

const SUARA_POIN_K2A =
  "Ingat selalu! Kelompokkan sepuluh dulu, lalu tambahkan sisanya. Nama puluhan: dua puluh, tiga puluh, empat puluh, lima puluh. Bilangan dua angka ditulis puluhan dulu, lalu satuan. Menghitung maju, bilangan makin besar. Menghitung mundur, bilangan makin kecil. Kamu boleh menebak dulu, lalu membuktikan dengan menghitung.";

const REFLEKSI_K2A = [
  "Aku bisa menghitung banyak benda sampai dengan 50.",
  "Aku bisa membaca dan menulis bilangan sampai dengan 50.",
  "Aku bisa menghitung maju dan menghitung mundur sampai dengan 50.",
  "Aku belajar dengan senang hati.",
];

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahIkatK2 {...d} /> },
  { nomor: 2, render: (d) => <LangkahLokerK2 {...d} /> },
  { nomor: 3, render: (d) => <LangkahSusunK2 {...d} /> },
  { nomor: 4, render: (d) => <LangkahTebakK2 {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuBingkaiK2 {...d} /> },
  { nomor: 6, render: (d) => <KartuGarisK2 {...d} /> },
  { nomor: 7, render: (d) => <KartuJalurK2 {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuJodohK2 {...d} /> },
  { nomor: 9, render: (d) => <KartuDetektifK2 {...d} /> },
  { nomor: 10, render: (d) => <KartuTulisK2 {...d} /> },
];

export function ConcreteHitungK2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Pegang, seret, dan hitung!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureHitungK2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan warnai", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractHitungK2A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: BIRU }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => (
        <PoinPentingK2
          speakGuru={props.speakGuru}
          onSelesai={selesai}
          suaraPoin={SUARA_POIN_K2A}
          poin={POIN_K2A}
          cara={{
            suara: "Cara menyebutkan banyak benda. Banyak tas di dalam loker adalah dua puluh enam.",
            potongan: [
              { teks: "Banyak tas di dalam loker", warna: "#FFFFFF" },
              { teks: "adalah", warna: "#FFFFFF" },
              { teks: "26", warna: "#FFE566" },
              { teks: "dua puluh enam", warna: "#7FCB96" },
            ],
          }}
          rumah="Ayo Mencoba di rumah: siapkan benda yang banyaknya lebih dari sepuluh, misalnya sedotan atau sendok. Kelompokkan setiap sepuluh benda, lalu hitung banyaknya. Tulis hasilnya dan bacakan kepada keluargamu."
          refleksi={REFLEKSI_K2A}
          teksSelesai="SELESAIKAN SUB-BAB A ➡️"
        />
      )}
    />
  );
}
