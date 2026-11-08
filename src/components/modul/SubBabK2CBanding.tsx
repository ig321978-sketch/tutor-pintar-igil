"use client";

import React, { useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { KERTAS_ANGKA, PilihAngka, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, PanelPoster, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { CatatanPensil, LencanaSuara, PitaTahap, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { MulutBuaya, type ArahBuaya } from "./gambar-banding-b";
import { PoinPentingK2, TahapPermainan, type ItemPoin, type KartuTahap } from "./kit-k2";
import { GarisBilanganK2, ModelBatang, TabelNilaiTempat, sebut } from "./dasar-k2";
import {
  KARTU_TEKA_K2,
  RONDE_BUAYA_K2,
  RONDE_DUEL_K2,
  RONDE_TEKA_K2,
  alasanBanding,
  besarKecilKartu,
  kataBanding,
  memenuhiDuel,
  nilaiTeka,
  opsiSekitar,
  tandaBanding,
  uraiK2,
  type AlasanBanding,
} from "./data-k2";
import { LangkahNeracaK2, LangkahPasangK2, LangkahRakKelerengK2, LangkahStoplesK2 } from "./SubBabK2CConcrete";
import { KartuBandingTabelK2, KartuJarakK2, KartuTukarBandingK2 } from "./SubBabK2CPicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab C: Membandingkan Dua Bilangan atau Lebih             */
/* (Buku Siswa Kelas II hlm. 23-30). Semua di klien, tanpa API.               */
/* Naskah: naskah/mtk-2-bab1-sub-c-membandingkan-bilangan.md                  */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Hitung Stoples Kira (hitung, bandingkan tebakan),             */
/*            2 Pasangkan Satu-Satu (pasangkan batang), 3 Neraca Dua Piring   */
/*            (seret, neraca miring), 4 Susun di Rak Kelereng (seret urut).   */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Banding di Tabel, 6 Jarak di Jalur Bilangan,                  */
/*            7 Tukar Dulu, Baru Banding.                                     */
/*  Abstract: 8 Buaya Lapar (tanda dan alasan), 9 Duel Kartu Angka,           */
/*            10 Teka-teki Kartu (Malosi, Kira, Lili).                        */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman membandingkan bilangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2";

const INGAT_K2C = [
  {
    ikon: "📋",
    nama: "Puluhan dulu",
    ket: "Kalau puluhan sama, lihat satuan",
    suara: "Untuk membandingkan dua bilangan, bandingkan puluhannya lebih dulu. Yang puluhannya lebih banyak adalah bilangan lebih besar. Kalau puluhannya sama, baru bandingkan satuannya.",
  },
  {
    ikon: "🐊",
    nama: "Mulut buaya",
    ket: "Terbuka ke bilangan yang lebih besar",
    suara: "Tanda lebih besar dan lebih kecil mirip mulut buaya yang lapar. Mulut buaya selalu terbuka ke bilangan yang lebih besar. Kalau kedua bilangan sama, mulut buaya tertutup, dan tandanya sama dengan.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

function KartuAngkaKecil({ n, warna = "#FFE566" }: { n: number; warna?: string }) {
  return <span className="flex h-12 min-w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] px-2 text-3xl font-black text-[#1C01A5]" style={{ backgroundColor: warna }}>{n}</span>;
}

export function InfografisBandingK2C({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Membandingkan Bilangan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="TEBAK, HITUNG, BANDINGKAN"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Kira membawa stoples permen. Malosi menebak dua puluh permen. Halim menebak tiga puluh permen. Setelah dihitung, ada dua puluh enam permen. Tebakan Malosi dua puluh lebih kecil dari hitungan dua puluh enam. Tebakan Halim tiga puluh lebih besar dari hitungan dua puluh enam. Kita dapat menebak banyak benda, dan itu melatih kita dalam berhitung."
      >
        <div className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-3">
          <div className="text-center">
            <KartuAngkaKecil n={20} warna="#F9A8D4" />
            <p className="pt-1 text-[11px] font-black text-[#1C01A5]">tebakan Malosi</p>
          </div>
          <span className="text-xl font-black text-[#E53E3E]">&lt;</span>
          <div className="text-center">
            <KartuAngkaKecil n={26} />
            <p className="pt-1 text-[11px] font-black text-[#1C01A5]">hitungan</p>
          </div>
          <span className="text-xl font-black text-[#E53E3E]">&lt;</span>
          <div className="text-center">
            <KartuAngkaKecil n={30} warna="#7DD3FC" />
            <p className="pt-1 text-[11px] font-black text-[#1C01A5]">tebakan Halim</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="SIAPA LEBIH DEKAT?"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Untuk tahu tebakan siapa yang lebih dekat, hitung loncatannya di jalur bilangan. Dari dua puluh ke dua puluh enam ada enam langkah. Dari tiga puluh ke dua puluh enam ada empat langkah. Empat lebih sedikit daripada enam, jadi tebakan Halim lebih dekat. Kalau loncatannya sama banyak, kedua tebakan sama dekat."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisBilanganK2 dari={20} sampai={30} lompat={[[20, 26], [30, 26]]} tandai={[26]} langkah={1} />
          <p className="text-center text-sm font-black text-[#1C01A5]">Malosi: 6 langkah • Halim: 4 langkah</p>
          <p className="text-center text-sm font-black text-[#14532D]">4 lebih sedikit, jadi Halim lebih dekat</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="BANDING DUA BILANGAN"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Kira membawa dua puluh enam permen. Tika membawa tiga puluh dua permen. Permen siapa yang lebih banyak? Kita bisa memakai tabel nilai tempat. Dua puluh enam punya dua puluhan. Tiga puluh dua punya tiga puluhan. Tiga puluh dua punya lebih banyak puluhan, jadi tiga puluh dua lebih besar dari dua puluh enam."
      >
        <div className="grid grid-cols-2 gap-2">
          {[26, 32].map((n) => {
            const u = uraiK2(n);
            return (
              <div key={n} className={SEL}>
                <ModelBatang p={u.puluhan} s={u.satuan} />
                <TabelNilaiTempat p={u.puluhan} s={u.satuan} kecil />
                <p className="text-center text-sm font-black text-[#1C01A5]">{n}</p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-black text-[#14532D]">3 puluhan lebih banyak dari 2 puluhan, jadi 32 lebih besar dari 26</p>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="PULUHAN DULU, LALU SATUAN"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Bandingkan dua puluh empat dan dua puluh sembilan. Langkah satu, lihat puluhannya. Dua dan dua, sama banyak. Langkah dua, karena puluhannya sama, lihat satuannya. Empat dan sembilan. Sembilan lebih banyak daripada empat. Jadi dua puluh sembilan lebih besar dari dua puluh empat."
      >
        <div className="space-y-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FECACA] text-sm font-black text-[#1C01A5]">1</span>
            <p className="text-sm font-black text-[#1C01A5]">Puluhan: 2 dan 2, sama banyak. Lihat satuan.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#BFDBFE] text-sm font-black text-[#1C01A5]">2</span>
            <p className="text-sm font-black text-[#1C01A5]">Satuan: 4 dan 9. Sembilan lebih banyak.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#BBF7D0] text-sm font-black text-[#1C01A5]">3</span>
            <p className="text-sm font-black text-[#14532D]">Jadi 29 lebih besar dari 24.</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="LEBIH BESAR, LEBIH KECIL, SAMA"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Bilangan yang menunjukkan benda lebih banyak disebut lebih besar. Bilangan yang menunjukkan benda lebih sedikit disebut lebih kecil. Tiga puluh dua lebih besar dari dua puluh enam. Dua puluh enam lebih kecil dari tiga puluh dua. Kalau nilainya persis sama, kita katakan sama dengan. Dua puluh enam sama dengan dua puluh enam."
      >
        <div className="grid grid-cols-3 gap-1">
          {(
            [
              [32, 26, "kiri", "lebih besar dari"],
              [26, 32, "kanan", "lebih kecil dari"],
              [26, 26, "tutup", "sama dengan"],
            ] as [number, number, ArahBuaya, string][]
          ).map(([a, b, arah, kataTanda]) => (
            <div key={`${a}-${b}`} className={SEL}>
              <p className="text-center text-xl font-black text-[#1C01A5]">
                {a} {tandaBanding(a, b)} {b}
              </p>
              <MulutBuaya arah={arah} kelas="mx-auto h-8 w-16" />
              <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">{kataTanda}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="BUAYA LAPAR"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Metode buaya lapar dipakai banyak guru di dunia. Bayangkan mulut buaya yang lapar. Buaya selalu ingin memakan bilangan yang lebih besar, jadi mulutnya terbuka ke bilangan yang lebih besar. Pada tiga puluh dua dan dua puluh enam, mulut buaya terbuka ke tiga puluh dua. Kalau kedua bilangan sama, buaya tidak punya pilihan, jadi mulutnya tertutup."
      >
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <KartuAngkaKecil n={32} warna="#BBF7D0" />
          <MulutBuaya arah="kiri" kelas="h-12 w-24" />
          <KartuAngkaKecil n={26} />
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">mulut terbuka ke 32, jadi 32 lebih besar</p>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="TUKAR DULU, BARU BANDING"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Bilangan mana yang lebih besar, dua puluhan dan tiga satuan, atau satu puluhan dan empat belas satuan? Tukar dulu. Empat belas satuan sama dengan satu puluhan dan empat satuan. Jadi satu puluhan dan empat belas satuan menjadi dua puluhan dan empat satuan, yaitu dua puluh empat. Dua puluh empat lebih besar dari dua puluh tiga."
      >
        <div className="flex items-center justify-center gap-1.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
          <div>
            <p className="text-[11px] font-black text-[#1C01A5]">2 puluhan 3 satuan</p>
            <p className="text-2xl font-black text-[#1C01A5]">23</p>
          </div>
          <span className="text-xl font-black text-[#E53E3E]">&lt;</span>
          <div>
            <p className="text-[11px] font-black text-[#B91C1C]">1 puluhan 14 satuan</p>
            <p className="text-[11px] font-black text-[#1C01A5]">tukar jadi</p>
            <p className="text-[11px] font-black text-[#14532D]">2 puluhan 4 satuan</p>
            <p className="text-2xl font-black text-[#1C01A5]">24</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="URUTKAN BILANGAN"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Mengurutkan bilangan berarti menyusunnya dari yang paling kecil ke yang paling besar, atau sebaliknya. Empat kartu: dua puluh lima, dua belas, tiga puluh lima, dan dua puluh satu. Dari yang paling kecil: dua belas, dua puluh satu, dua puluh lima, tiga puluh lima. Dua belas hanya satu puluhan, jadi paling kecil. Tiga puluh lima ada tiga puluhan, jadi paling besar. Dua puluh satu dan dua puluh lima sama-sama dua puluhan, jadi lihat satuannya."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {[12, 21, 25, 35].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <span className="w-8 text-right text-lg font-black text-[#1C01A5]">{n}</span>
              <span className="h-4 rounded-full border-2 border-[#1C01A5] bg-[#FECACA]" style={{ width: `${n * 2.4}%` }} aria-hidden="true" />
            </div>
          ))}
          <p className="pt-1 text-center text-sm font-black text-[#1C01A5]">12 &lt; 21 &lt; 25 &lt; 35 (dari yang paling kecil)</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="JANGAN BANDING SATUAN DULU"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Bolehkah membandingkan satuannya dulu? Jangan. Lihat sembilan belas dan dua puluh satu. Satuan sembilan lebih banyak daripada satu, tetapi dua puluh satu tetap lebih besar. Mengapa? Karena dua puluh satu punya dua puluhan, sedangkan sembilan belas hanya punya satu puluhan. Satu puluhan nilainya sepuluh, jadi puluhan lebih berharga daripada satuan. Karena itu bandingkan puluhan dulu."
      >
        <div className="grid grid-cols-2 gap-2">
          {[19, 21].map((n) => {
            const u = uraiK2(n);
            return (
              <div key={n} className={SEL}>
                <ModelBatang p={u.puluhan} s={u.satuan} />
                <p className="text-center text-2xl font-black text-[#1C01A5]">{n}</p>
                <p className="text-center text-[11px] font-black text-[#1C01A5]">
                  {u.puluhan} puluhan {u.satuan} satuan
                </p>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm font-black text-[#14532D]">9 satuan lebih banyak dari 1 satuan, tetapi 21 tetap lebih besar dari 19</p>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_K2C.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-base font-black leading-tight text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Tanda dan angka. Tidak ada gambar benda.                */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Buaya Lapar --------------------------------------- */

const PILIHAN_TANDA: { tanda: ">" | "<" | "="; arah: ArahBuaya; nama: string }[] = [
  { tanda: ">", arah: "kiri", nama: "Tanda lebih besar" },
  { tanda: "<", arah: "kanan", nama: "Tanda lebih kecil" },
  { tanda: "=", arah: "tutup", nama: "Tanda sama dengan" },
];

const ALASAN: { jenis: AlasanBanding; teks: string }[] = [
  { jenis: "puluhan", teks: "Puluhannya berbeda, jadi puluhan yang menentukan." },
  { jenis: "satuan", teks: "Puluhannya sama, jadi satuan yang menentukan." },
  { jenis: "sama", teks: "Kedua bilangan sama persis." },
];

function RondeBuaya({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [a, b] = RONDE_BUAYA_K2[ronde];
  const kunciTanda = tandaBanding(a, b);
  const kunciAlasan = alasanBanding(a, b);
  const [tandaDipilih, setTandaDipilih] = useState<string | null>(null);
  const [kelirTanda, setKelirTanda] = useState<string | null>(null);
  const [kelirAlasan, setKelirAlasan] = useState<AlasanBanding | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const arahKunci = PILIHAN_TANDA.find((p) => p.tanda === kunciTanda)?.arah ?? "tutup";
  useBicara(beres, `${sebut(a)} ${kataBanding(a, b)} ${sebut(b)}. ${kunciAlasan === "puluhan" ? "Puluhannya berbeda, jadi puluhan yang menentukan." : kunciAlasan === "satuan" ? "Puluhannya sama, jadi satuan yang menentukan." : "Kedua bilangan sama persis."}`);

  const pilihTanda = (t: string) => {
    if (tandaDipilih !== null || beres) return;
    if (t === kunciTanda) {
      setTandaDipilih(t);
      setKelirTanda(null);
      setKabar(null);
    } else {
      setKelirTanda(t);
      setKabar({ teks: "Mulut buaya selalu terbuka ke bilangan yang lebih besar. Kalau sama, mulutnya tertutup. Bandingkan puluhannya dulu, lalu satuannya.", ok: false });
    }
  };

  const pilihAlasan = (j: AlasanBanding) => {
    if (tandaDipilih === null || beres) return;
    if (j === kunciAlasan) {
      setKelirAlasan(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKelirAlasan(j);
      setKabar({ teks: `Lihat lagi puluhan ${sebut(uraiK2(a).puluhan)} dan ${sebut(uraiK2(b).puluhan)}. Apakah puluhannya berbeda, atau sama? Lalu lihat satuannya kalau perlu.`, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Tanda dan alasanmu tepat!" : tandaDipilih === null ? "Beri makan buaya lapar" : "Mengapa begitu?"}
        teks={`Bandingkan dua bilangan. Pilih tanda yang tepat: lebih besar, lebih kecil, atau sama dengan. Ingat, mulut buaya selalu terbuka ke bilangan yang lebih besar. Setelah itu, pilih alasanmu. Mengapa tandanya begitu?`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="flex items-center justify-center gap-2">
          <span className="flex h-16 min-w-20 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 text-5xl font-black text-[#1C01A5]">{a}</span>
          <span className={`flex h-16 w-16 items-center justify-center rounded-2xl border-4 text-4xl font-black ${tandaDipilih ? "igil-muncul border-[#FFE566] bg-[#1C01A5] text-[#FFE566]" : "border-dashed border-[#1C01A5] bg-white text-[#1C01A5]/50"}`}>{tandaDipilih ?? "?"}</span>
          <span className="flex h-16 min-w-20 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 text-5xl font-black text-[#1C01A5]">{b}</span>
        </div>
        {tandaDipilih ? <MulutBuaya arah={arahKunci} kelas="mx-auto h-14 w-28" /> : null}
        {tandaDipilih === null ? (
          <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Pilih tanda">
            {PILIHAN_TANDA.map((p) => (
              <button
                key={`${p.tanda}-${kelirTanda === p.tanda ? "x" : "o"}`}
                type="button"
                aria-label={p.nama}
                onClick={() => pilihTanda(p.tanda)}
                className={`flex flex-col items-center gap-0.5 rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-1.5 shadow-[0_3px_0_rgba(28,1,165,0.25)] ${kelirTanda === p.tanda ? "igil-goyang" : ""}`}
              >
                <MulutBuaya arah={p.arah} kelas="h-9 w-[4.5rem]" />
                <span className="text-3xl font-black leading-none text-[#1C01A5]">{p.tanda}</span>
              </button>
            ))}
          </div>
        ) : beres ? null : (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Mengapa tandanya begitu?</p>
            <div className="grid gap-1.5" role="group" aria-label="Pilih alasan">
              {ALASAN.map((al) => (
                <button
                  key={`${al.jenis}-${kelirAlasan === al.jenis ? "x" : "o"}`}
                  type="button"
                  aria-label={`Alasan: ${al.jenis}`}
                  onClick={() => pilihAlasan(al.jenis)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2 text-left text-sm font-black leading-snug text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.2)] ${kelirAlasan === al.jenis ? "igil-goyang" : ""}`}
                >
                  {al.teks}
                </button>
              ))}
            </div>
          </div>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {a} {kunciTanda} {b}: {a} {kataBanding(a, b)} {b}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuBuayaK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Buaya Lapar"
      warna="#BBF7D0"
      petunjuk="Beri makan buaya lapar. Bandingkan dua bilangan dan pilih tandanya: lebih besar, lebih kecil, atau sama dengan. Mulut buaya selalu terbuka ke bilangan yang lebih besar. Lalu pilih alasanmu: mengapa tandanya begitu."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-buaya"
      jumlahRonde={RONDE_BUAYA_K2.length}
      belumSiap="Pilih tanda dan alasannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBuaya ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Duel Kartu Angka ---------------------------------- */

function RondeDuel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_DUEL_K2[ronde];
  const akhir = ronde === RONDE_DUEL_K2.length - 1;
  const [slot, setSlot] = useState<(number | null)[]>([null, null]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2c-duel"] === true && akhir;
  const nilai = slot[0] !== null && slot[1] !== null ? d.kartu[slot[0]] * 10 + d.kartu[slot[1]] : null;
  const kataTujuan = d.tujuan === "besar" ? "LEBIH BESAR dari" : d.tujuan === "kecil" ? "LEBIH KECIL dari" : "SAMA dengan";
  useBicara(
    akhir ? suara : beres,
    nilai === null ? "" : `Bilanganmu ${sebut(nilai)} ${kataBanding(nilai, d.igil)} bilangan Igil, ${sebut(d.igil)}. ${sebut(uraiK2(nilai).puluhan)} puluhan dibanding ${sebut(uraiK2(d.igil).puluhan)} puluhan.`
  );

  const ketukKartu = (i: number) => {
    if (beres || slot.includes(i)) return;
    const k = slot.indexOf(null);
    if (k < 0) {
      setKabar({ teks: "Kedua tempat sudah terisi. Ketuk tempat yang ingin kamu kosongkan dulu.", ok: false });
      return;
    }
    setSlot(slot.map((x, j) => (j === k ? i : x)));
    setKabar(null);
  };

  const kosongkan = (j: number) => {
    if (beres) return;
    setSlot(slot.map((x, k) => (k === j ? null : x)));
    setKabar(null);
  };

  const periksa = () => {
    if (nilai === null) {
      setKabar({ teks: "Pasang kedua kartumu di tempat puluhan dan satuan dulu.", ok: false });
      return;
    }
    if (memenuhiDuel(nilai, d.igil, d.tujuan)) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    setKabar({
      teks:
        d.tujuan === "sama"
          ? `Bilanganmu ${sebut(nilai)}, belum sama dengan ${sebut(d.igil)}. Coba tukar tempat kedua kartumu.`
          : d.tujuan === "besar"
            ? `Bilanganmu ${sebut(nilai)}, belum lebih besar dari ${sebut(d.igil)}. Taruh kartu yang lebih besar di tempat puluhan.`
            : `Bilanganmu ${sebut(nilai)}, belum lebih kecil dari ${sebut(d.igil)}. Taruh kartu yang lebih kecil di tempat puluhan.`,
      ok: false,
    });
  };

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilanganmu" : "Kamu menang duel!") : `Buat bilangan ${d.tujuan === "besar" ? "lebih besar" : d.tujuan === "kecil" ? "lebih kecil" : "sama"}`}
        teks={`Kita bermain duel kartu bersama Igil. Igil punya bilangan ${sebut(d.igil)}. Kamu punya dua kartu: ${sebut(d.kartu[0])} dan ${sebut(d.kartu[1])}. Susun kedua kartumu menjadi satu bilangan. Buat bilangan yang ${d.tujuan === "besar" ? "lebih besar dari" : d.tujuan === "kecil" ? "lebih kecil dari" : "sama dengan"} bilangan Igil. Taruh kartu di tempat puluhan dan satuan, lalu tekan Periksa.${akhir ? " Terakhir, ucapkan bilangan yang kamu susun." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">
          Bilangan Igil: <span className="text-3xl">{d.igil}</span>
          <br />
          Buat bilangan {kataTujuan} {d.igil}
        </p>
        <div className="flex items-center justify-center gap-3">
          {d.kartu.map((angka, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Kartu ${angka}`}
              disabled={slot.includes(i) || beres}
              onClick={() => ketukKartu(i)}
              className="flex h-20 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#F9A8D4] text-5xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-35"
            >
              {angka}
            </button>
          ))}
        </div>
        <div className="flex items-end justify-center gap-2">
          {(["puluhan", "satuan"] as const).map((nama, j) => (
            <button
              key={nama}
              type="button"
              aria-label={slot[j] !== null ? `Tempat ${nama}, berisi kartu ${d.kartu[slot[j] as number]}` : `Tempat ${nama}, kosong`}
              onClick={() => kosongkan(j)}
              className="igil-tanpa-tepi flex flex-col items-center gap-1"
            >
              <span className={`rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-[11px] font-black text-[#1C01A5] ${j === 0 ? "bg-[#FECACA]" : "bg-[#BFDBFE]"}`}>{nama === "puluhan" ? "Puluhan" : "Satuan"}</span>
              <span className={`flex h-16 w-16 items-center justify-center rounded-2xl border-4 text-4xl font-black text-[#1C01A5] ${slot[j] !== null ? "border-[#1C01A5] bg-[#FFE566]" : "border-dashed border-[#1C01A5] bg-white"}`}>{slot[j] !== null ? d.kartu[slot[j] as number] : ""}</span>
            </button>
          ))}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-xl font-black text-[#14532D]">
            {akhir && !suara ? "?" : nilai} {nilai === null ? "" : tandaBanding(nilai, d.igil)} {d.igil}
          </p>
        ) : (
          <button type="button" onClick={periksa} className={TOMBOL_KECIL}>
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuDuelK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_DUEL_K2[RONDE_DUEL_K2.length - 1];
  const kunci = Math.max(...[terakhir.kartu[0] * 10 + terakhir.kartu[1], terakhir.kartu[1] * 10 + terakhir.kartu[0]].filter((x) => memenuhiDuel(x, terakhir.igil, terakhir.tujuan)));
  return (
    <GameBentuk
      nomor={nomor}
      judul="Duel Kartu Angka"
      warna="#FDE68A"
      petunjuk="Duel kartu bersama Igil. Susun dua kartumu menjadi satu bilangan: kartu pertama di tempat puluhan, kartu kedua di tempat satuan. Buat bilanganmu lebih besar, lebih kecil, atau sama dengan bilangan Igil, sesuai permintaan. Pada soal terakhir, ucapkan bilangan yang kamu susun."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-duel"
      jumlahRonde={RONDE_DUEL_K2.length}
      kunciAkhir={kunci}
      belumSiap="Susun kartumu dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDuel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Teka-teki Kartu ---------------------------------- */

function RondeTokoh({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_TEKA_K2[ronde];
  const v = nilaiTeka(r);
  const tokoh = [
    { nama: r.kurang.nama, nilai: v.kurang },
    { nama: r.diketahui.nama, nilai: v.diketahui },
    { nama: r.lebih.nama, nilai: v.lebih },
  ];
  const urutBenar = tokoh.slice().sort((x, y) => x.nilai - y.nilai).map((t) => t.nama);
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [urut, setUrut] = useState<string[]>([]);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = urut.length === tokoh.length;
  useBicara(beres, `${r.kurang.nama} ${sebut(v.kurang)}, ${r.diketahui.nama} ${sebut(v.diketahui)}, ${r.lebih.nama} ${sebut(v.lebih)}. Urutan dari yang terkecil: ${urutBenar.join(", lalu ")}.`);

  const pilih = (n: number) => {
    const kunci = tahap === 0 ? v.kurang : v.lebih;
    if (n === kunci) {
      setSalah(null);
      setKabar(null);
      setTahap(tahap === 0 ? 1 : 2);
    } else {
      setSalah(n);
      setKabar({
        teks: tahap === 0 ? `${r.kurang.nama} ${sebut(r.kurang.selisih)} kurangnya dari ${r.diketahui.nama}. Hitung mundur ${sebut(r.kurang.selisih)} dari ${sebut(v.diketahui)}.` : `${r.lebih.nama} ${sebut(r.lebih.selisih)} lebihnya dari ${r.kurang.nama}. Hitung maju ${sebut(r.lebih.selisih)} dari ${sebut(v.kurang)}.`,
        ok: false,
      });
    }
  };

  const ketukTokoh = (nama: string) => {
    if (beres || urut.includes(nama)) return;
    if (nama === urutBenar[urut.length]) {
      const baru = [...urut, nama];
      setUrut(baru);
      setGoyang(null);
      setKabar(null);
      if (baru.length === tokoh.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang(nama);
      setKabar({ teks: "Belum yang terkecil. Bandingkan puluhannya dulu, lalu satuannya.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Urutanmu benar!" : tahap === 0 ? `Cari bilangan ${r.kurang.nama}` : tahap === 1 ? `Cari bilangan ${r.lebih.nama}` : "Urutkan dari terkecil"}
        teks={`Teka-teki kartu. ${r.lebih.nama} memegang kartu yang ${sebut(r.lebih.selisih)} lebihnya dari kartu ${r.kurang.nama}. ${r.kurang.nama} memegang kartu yang ${sebut(r.kurang.selisih)} kurangnya dari kartu ${r.diketahui.nama}. ${r.diketahui.nama} memegang kartu ${sebut(v.diketahui)}. Cari dulu bilangan tiap teman, lalu urutkan dari nilai terkecil ke terbesar.`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-1">
          {[`Bilangan ${r.lebih.nama} ${r.lebih.selisih} lebihnya dari bilangan ${r.kurang.nama}.`, `Bilangan ${r.kurang.nama} ${r.kurang.selisih} kurangnya dari bilangan ${r.diketahui.nama}.`, `${r.diketahui.nama} memegang kartu bilangan ${v.diketahui}.`].map((t) => (
            <p key={t} className="rounded-xl border-2 border-dashed border-[#1C01A5]/50 bg-[#FFFDF2] px-2 py-1 text-sm font-black leading-snug text-[#1C01A5]">
              🔎 {t}
            </p>
          ))}
        </div>
        {tahap < 2 ? (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {tahap === 0 ? `Berapa bilangan ${r.kurang.nama}? (${v.diketahui} − ${r.kurang.selisih})` : `Berapa bilangan ${r.lebih.nama}? (${v.kurang} + ${r.lebih.selisih})`}
            </p>
            <PilihAngka opsi={opsiSekitar(tahap === 0 ? v.kurang : v.lebih, [10, 50])} keliru={salah} onPilih={pilih} />
          </div>
        ) : (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Ketuk dari yang paling kecil</p>
            <div className="grid grid-cols-3 gap-1.5">
              {tokoh.map((t) => {
                const sudah = urut.includes(t.nama);
                return (
                  <button
                    key={`${t.nama}-${goyang === t.nama ? "x" : "o"}`}
                    type="button"
                    aria-label={`Kartu ${t.nama}${sudah ? `, urutan ke-${urut.indexOf(t.nama) + 1}` : ""}`}
                    disabled={sudah}
                    onClick={() => ketukTokoh(t.nama)}
                    className={`rounded-2xl border-4 px-1 py-2 text-center ${sudah ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#F9A8D4]"} ${goyang === t.nama ? "igil-goyang" : ""}`}
                  >
                    <span className="block text-sm font-black text-[#1C01A5]">{t.nama}</span>
                    <span className="block text-3xl font-black text-[#1C01A5]">{t.nilai}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex min-h-[3rem] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-2" aria-label="Urutan dari terkecil">
              {urut.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">terkecil → terbesar</span> : null}
              {urut.map((nama, k) => (
                <React.Fragment key={nama}>
                  {k > 0 ? <span className="text-2xl font-black text-[#E53E3E]">&lt;</span> : null}
                  <span className="igil-muncul rounded-xl border-4 border-[#1C01A5] bg-white px-2 text-lg font-black text-[#1C01A5]">
                    {nama} {tokoh.find((t) => t.nama === nama)?.nilai}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function RondeKartuTeka({ onBeres }: { onBeres: () => void }) {
  const { besar, kecil } = besarKecilKartu(KARTU_TEKA_K2);
  const [sub, setSub] = useState<"besar" | "kecil">("besar");
  const [pilihan, setPilihan] = useState<number[]>([]);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  useBicara(selesai, `Bilangan paling besar dari dua kartu adalah ${sebut(besar)}. Bilangan paling kecil adalah ${sebut(kecil)}. Kartu terbesar ditaruh di tempat puluhan untuk bilangan paling besar, dan kartu terkecil ditaruh di tempat puluhan untuk bilangan paling kecil.`);

  const ketukKartu = (angka: number) => {
    if (selesai) return;
    if (pilihan.includes(angka)) {
      setPilihan(pilihan.filter((x) => x !== angka));
      return;
    }
    if (pilihan.length >= 2) {
      setKabar({ teks: "Kamu hanya boleh memakai dua kartu. Ketuk salah satu kartu yang terpilih untuk mengembalikannya.", ok: false });
      return;
    }
    setPilihan([...pilihan, angka]);
    setKabar(null);
  };

  const periksa = () => {
    if (pilihan.length < 2) {
      setKabar({ teks: "Pilih dua kartu dulu. Kartu pertama untuk puluhan, kartu kedua untuk satuan.", ok: false });
      return;
    }
    const nilai = pilihan[0] * 10 + pilihan[1];
    if (nilai === (sub === "besar" ? besar : kecil)) {
      setKabar(null);
      setPilihan([]);
      if (sub === "besar") {
        setSub("kecil");
      } else {
        setSelesai(true);
        letusan.picu();
        onBeres();
      }
      return;
    }
    setKabar({
      teks: sub === "besar" ? `Bilanganmu ${sebut(nilai)}. Untuk bilangan paling besar, taruh kartu terbesar di tempat puluhan, lalu kartu terbesar berikutnya di satuan.` : `Bilanganmu ${sebut(nilai)}. Untuk bilangan paling kecil, taruh kartu terkecil di tempat puluhan, lalu kartu terkecil berikutnya di satuan.`,
      ok: false,
    });
  };

  return (
    <>
      <CatatanPensil
        pendek={selesai ? "Besar dan kecil sudah ketemu!" : sub === "besar" ? "Bilangan paling besar" : "Bilangan paling kecil"}
        teks={`Tika mempunyai kartu satu, dua, tiga, dan empat. Tika mengambil dua kartu dan menyusunnya menjadi satu bilangan. Buat bilangan yang paling ${sub === "besar" ? "besar" : "kecil"}. Kartu pertama yang kamu ketuk menjadi puluhan, kartu kedua menjadi satuan. Lalu tekan Periksa.`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]">
          Pilih dua kartu untuk bilangan yang paling {sub === "besar" ? "BESAR" : "KECIL"}
        </p>
        <div className="flex items-center justify-center gap-2">
          {KARTU_TEKA_K2.map((angka) => (
            <button
              key={angka}
              type="button"
              aria-label={`Kartu ${angka}${pilihan.includes(angka) ? ", terpilih" : ""}`}
              aria-pressed={pilihan.includes(angka)}
              onClick={() => ketukKartu(angka)}
              className={`flex h-20 w-14 items-center justify-center rounded-2xl border-4 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${pilihan.includes(angka) ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-[#F9A8D4]"}`}
            >
              {angka}
            </button>
          ))}
        </div>
        <div className="flex items-end justify-center gap-2">
          {(["Puluhan", "Satuan"] as const).map((nama, j) => (
            <span key={nama} className="flex flex-col items-center gap-1">
              <span className={`rounded-full border-2 border-[#1C01A5] px-2 py-0.5 text-[11px] font-black text-[#1C01A5] ${j === 0 ? "bg-[#FECACA]" : "bg-[#BFDBFE]"}`}>{nama}</span>
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 text-3xl font-black text-[#1C01A5] ${pilihan[j] !== undefined ? "border-[#1C01A5] bg-[#FFE566]" : "border-dashed border-[#1C01A5] bg-white"}`}>{pilihan[j] ?? ""}</span>
            </span>
          ))}
        </div>
        {selesai ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            Paling besar {besar} • paling kecil {kecil}
          </p>
        ) : (
          <button type="button" onClick={periksa} className={TOMBOL_KECIL}>
            ✔ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTekaK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Teka-teki Kartu"
      warna="#C7D2FE"
      petunjuk="Pecahkan teka-teki kartu. Cari bilangan tiap teman dari petunjuk lebihnya dan kurangnya, lalu urutkan dari yang terkecil. Pada soal terakhir, pilih dua kartu untuk membuat bilangan paling besar dan paling kecil."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-teka"
      jumlahRonde={RONDE_TEKA_K2.length + 1}
      belumSiap="Selesaikan teka-tekinya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => (r < RONDE_TEKA_K2.length ? <RondeTokoh ronde={r} onBeres={beres} /> : <RondeKartuTeka onBeres={beres} />)}
    />
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const POIN_K2C: ItemPoin[] = [
  {
    ikon: "📋",
    nama: "Puluhan dulu",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">puluhan dulu, kalau sama lihat satuan</p>,
    suara: "Untuk membandingkan dua bilangan, bandingkan puluhannya lebih dulu. Kalau puluhannya sama, baru bandingkan satuannya. Dua puluh sembilan lebih besar dari dua puluh empat.",
  },
  {
    ikon: "🐊",
    nama: "Lebih besar, lebih kecil, sama",
    isi: (
      <p className="text-center text-sm font-black leading-snug text-[#1C01A5]">
        32 &gt; 26 (lebih besar)
        <br />
        26 &lt; 32 (lebih kecil)
        <br />
        26 = 26 (sama)
      </p>
    ),
    suara: "Tiga puluh dua lebih besar dari dua puluh enam. Dua puluh enam lebih kecil dari tiga puluh dua. Dua puluh enam sama dengan dua puluh enam. Mulut buaya selalu terbuka ke bilangan yang lebih besar.",
  },
  {
    ikon: "🔁",
    nama: "Tukar dulu",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">1 puluhan 14 satuan = 2 puluhan 4 satuan</p>,
    suara: "Kalau satuannya sepuluh atau lebih, tukar dulu sepuluh satuan menjadi satu puluhan. Satu puluhan empat belas satuan sama dengan dua puluhan empat satuan. Baru sesudah itu bandingkan.",
  },
  {
    ikon: "🎯",
    nama: "Tebakan lebih dekat",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">loncatan lebih sedikit = lebih dekat</p>,
    suara: "Tebakan yang lebih dekat adalah tebakan dengan loncatan yang lebih sedikit ke hasil hitungan. Kalau loncatannya sama banyak, kedua tebakan sama dekat.",
  },
  {
    ikon: "📶",
    nama: "Urutkan",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">12 &lt; 21 &lt; 25 &lt; 35</p>,
    suara: "Mengurutkan berarti menyusun bilangan dari yang paling kecil ke yang paling besar, atau sebaliknya. Bandingkan dua-dua dulu. Dua belas, dua puluh satu, dua puluh lima, tiga puluh lima.",
  },
];

const SUARA_POIN_K2C =
  "Ingat selalu! Bandingkan puluhannya lebih dulu, kalau sama baru satuannya. Tiga puluh dua lebih besar dari dua puluh enam, dan dua puluh enam lebih kecil dari tiga puluh dua. Mulut buaya terbuka ke bilangan yang lebih besar. Kalau satuannya sepuluh atau lebih, tukar dulu. Tebakan yang loncatannya lebih sedikit lebih dekat. Mengurutkan berarti menyusun dari yang paling kecil atau paling besar.";

const REFLEKSI_K2C = [
  "Aku bisa membandingkan dua bilangan.",
  "Aku bisa mengurutkan bilangan dari yang paling besar atau paling kecil.",
  "Aku menyampaikan pendapat dengan percaya diri.",
  "Aku belajar dengan senang hati.",
];

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahStoplesK2 {...d} /> },
  { nomor: 2, render: (d) => <LangkahPasangK2 {...d} /> },
  { nomor: 3, render: (d) => <LangkahNeracaK2 {...d} /> },
  { nomor: 4, render: (d) => <LangkahRakKelerengK2 {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuBandingTabelK2 {...d} /> },
  { nomor: 6, render: (d) => <KartuJarakK2 {...d} /> },
  { nomor: 7, render: (d) => <KartuTukarBandingK2 {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuBuayaK2 {...d} /> },
  { nomor: 9, render: (d) => <KartuDuelK2 {...d} /> },
  { nomor: 10, render: (d) => <KartuTekaK2 {...d} /> },
];

export function ConcreteBandingK2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "⚖️", nama: "CONCRETE", cara: "Pegang, pasangkan, dan timbang!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureBandingK2C(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan pilih", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractBandingK2C(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Tanda dan angka", warna: BIRU }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => (
        <PoinPentingK2
          speakGuru={props.speakGuru}
          onSelesai={selesai}
          suaraPoin={SUARA_POIN_K2C}
          poin={POIN_K2C}
          cara={{
            suara: "Cara menyebutkan perbandingan. Tiga puluh dua lebih besar dari dua puluh enam.",
            potongan: [
              { teks: "32", warna: "#FFE566" },
              { teks: "lebih besar dari", warna: "#FFFFFF" },
              { teks: "26", warna: "#7FCB96" },
            ],
          }}
          rumah="Ayo Mencoba di rumah: buat kartu angka 1 sampai 5 dari kertas. Kamu dan temanmu masing-masing mengambil dua kartu, lalu menyusunnya menjadi satu bilangan. Bandingkan bilangan kalian: siapa yang lebih besar, dan mengapa? Ceritakan alasanmu kepada keluargamu."
          refleksi={REFLEKSI_K2C}
          teksSelesai="SELESAIKAN SUB-BAB C ➡️"
        />
      )}
    />
  );
}