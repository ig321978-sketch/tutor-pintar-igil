"use client";

import React, { useEffect, useRef, useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { JawabSuara, JudulGame, KABAR_TULIS_OK, KabarChip, Letusan, STIKER, TombolLanjut, kata, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { CatatanPensil, useBicara } from "./tahap-b-gaya";
import { Bagan } from "./gambar-pasangan-d";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { BatangPuluhan, KubusSatuan, sebut } from "./dasar-k2";
import { BarisJambu, JalurKotakB2, SusunTabel } from "./dasar-k2b2";
import { Berhasil } from "./permainan-k2b2";
import { InfografisK2B2, KotakPoster, PoinK2B2, TabelPoster } from "./kit-k2b2";
import { SUB_A } from "./naskah-k2b2";
import { NAMA_CARA_TAMBAH, RONDE_CARA_A, RONDE_KEMBAR_A, TULIS_A_PILIHAN, TULIS_A_RONDE1, langkahCaraTambah, urutanTetap, type CaraTambah } from "./data-k2b2";
import { LangkahGabungK2B2A, LangkahNeracaK2B2A, LangkahPetikK2B2A, LangkahPindahK2B2A } from "./SubBabK2B2AConcrete";
import { KartuBaganK2B2A, KartuLompatK2B2A, KartuSusunK2B2A } from "./SubBabK2B2APicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab A: Berbagai Cara Melakukan Penjumlahan (Buku Siswa    */
/* Kelas II hlm. 37-47). Semua di klien, tanpa API.                           */
/* Naskah: naskah/mtk-2-bab2-sub-a-berbagai-cara-penjumlahan.md               */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Petik Jambu Air (ketuk), 2 Gabung Balok (seret),              */
/*            3 Mesin Pindah Sepuluh (tukar), 4 Neraca Jambu (seimbangkan).   */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Loncat di Jalur Bilangan, 6 Susun ke Bawah, 7 Bagan Pasangan. */
/*  Abstract: 8 Jodohkan Cara dan Langkah, 9 Kartu Kembar Hasil Sama,         */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman berbagai cara melakukan penjumlahan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const SEL = "space-y-1 rounded-xl bg-white/90 px-1 py-1.5 text-center";

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const lompatDari = (a: number, b: number): [number, number][] => Array.from({ length: b }, (_, i) => [a + i, a + i + 1] as [number, number]);

function visualInfografis(): React.ReactNode[] {
  return [
    /* 1 Jambu Air Tika dan Kira */
    <div key="1" className="space-y-2">
      <div className="grid grid-cols-2 gap-1">
        <div className={SEL}>
          <p className="text-xs font-black text-[#1C01A5]">Tika memetik</p>
          <BarisJambu n={12} kelas="h-4 w-4" />
          <p className="text-2xl font-black text-[#2563EB]">12</p>
        </div>
        <div className={SEL}>
          <p className="text-xs font-black text-[#1C01A5]">Kira: 6 lebih banyak</p>
          <BarisJambu n={18} kelas="h-4 w-4" sorot={[12, 13, 14, 15, 16, 17]} />
          <p className="text-2xl font-black text-[#16A34A]">18</p>
        </div>
      </div>
      <p className="text-center text-2xl font-black text-[#1C01A5]">12 + 6 = 18</p>
    </div>,
    /* 2 Menghitung maju */
    <div key="2" className="space-y-1 rounded-xl bg-white/90 px-1 py-1.5">
      <JalurKotakB2 dari={11} sampai={20} mulai={12} sorot={[18]} lompat={lompatDari(12, 6)} />
      <p className="text-center text-sm font-black text-[#1C01A5]">12 + 6: maju 6 langkah, berhenti di 18</p>
    </div>,
    /* 3 Bersusun */
    <div key="3" className="space-y-1">
      <SusunTabel op="+" atas={[{ n: 1 }, { n: 2 }]} bawah={[{ n: null }, { n: 6 }]} hasil={[{ n: 1 }, { n: 8 }]} />
      <p className="text-center text-xs font-black text-[#1C01A5]/80">Satuan dulu: 2 + 6 = 8. Puluhan: 1. Hasil: 18.</p>
    </div>,
    /* 4 Pasangan bilangan */
    <div key="4" className="flex items-center gap-2">
      <div className="w-1/2">
        <Bagan gabungan={12} a={10} b={2} kelas="w-full max-w-[170px]" />
      </div>
      <div className="w-1/2 space-y-0.5 text-center text-xl font-black text-[#1C01A5]">
        <p>
          2 + 6 = <span className="text-[#16A34A]">8</span>
        </p>
        <p>
          10 + 8 = <span className="text-[#16A34A]">18</span>
        </p>
      </div>
    </div>,
    /* 5 Tiga cara, satu hasil */
    <TabelPoster
      key="5"
      kolom="5.5rem 1fr 2.6rem"
      kepala={["Cara", "Langkah", "Hasil"]}
      baris={[
        ["Hitung maju", "12 → 13, 14, 15, 16, 17, 18", "18"],
        ["Bersusun", "2 + 6 = 8, puluhan 1", "18"],
        ["Pasangan", "2 + 6 = 8, 10 + 8 = 18", "18"],
      ]}
    />,
    /* 6 Sepuluh satuan = satu puluhan */
    <div key="6" className="flex items-center justify-center gap-2">
      <div className="flex flex-wrap items-center justify-center gap-0.5 rounded-xl bg-[#BFDBFE] px-2 py-2" style={{ maxWidth: "9rem" }}>
        {Array.from({ length: 10 }, (_, i) => (
          <KubusSatuan key={i} kelas="h-5 w-5" />
        ))}
      </div>
      <span className="text-3xl font-black text-[#1C01A5]">=</span>
      <div className="rounded-xl bg-[#FECACA] px-3 py-2">
        <BatangPuluhan kelas="h-16 w-4" />
      </div>
    </div>,
    /* 7 Pindah ke kolom puluhan */
    <div key="7" className="space-y-1">
      <SusunTabel
        op="+"
        atas={[{ n: 1, atas: "+1" }, { n: 8 }]}
        bawah={[{ n: null }, { n: 2 }]}
        hasil={[{ n: 2 }, { n: 0, atas: "10" }]}
      />
      <p className="text-center text-xs font-black text-[#1C01A5]/80">8 + 2 = 10 satuan, pindah 1 puluhan. 1 + 1 = 2 puluhan.</p>
    </div>,
    /* 8 Sahabat sepuluh */
    <div key="8" className="grid grid-cols-5 gap-1 text-center">
      {[
        [1, 9],
        [2, 8],
        [3, 7],
        [4, 6],
        [5, 5],
      ].map(([p, q]) => (
        <div key={p} className={SEL}>
          <p className="text-lg font-black text-[#2563EB]">{p}</p>
          <p className="text-xs font-black text-[#1C01A5]">+</p>
          <p className="text-lg font-black text-[#DB2777]">{q}</p>
          <p className="text-xs font-black text-[#16A34A]">= 10</p>
        </div>
      ))}
    </div>,
    /* 9 Urutan boleh ditukar */
    <div key="9" className="space-y-1">
      <div className="grid grid-cols-2 gap-1">
        <div className={SEL}>
          <p className="text-xl font-black text-[#1C01A5]">12 + 6 = 18</p>
          <p className="text-xs font-black text-[#1C01A5]/80">mulai 12, lompat 6 kali</p>
        </div>
        <div className={SEL}>
          <p className="text-xl font-black text-[#1C01A5]">6 + 12 = 18</p>
          <p className="text-xs font-black text-[#1C01A5]/80">mulai 6, lompat 12 kali</p>
        </div>
      </div>
      <p className="text-center text-xs font-black text-[#1C01A5]/80">Mulai dari bilangan yang lebih besar, lompatannya lebih sedikit.</p>
    </div>,
    /* 10 Pilih cara termudah */
    <div key="10" className="grid grid-cols-3 gap-1 text-center">
      {[
        ["🐸", "Hitung maju", "bilangan kedua kecil"],
        ["📋", "Bersusun", "ingin rapi dan teliti"],
        ["🌿", "Pasangan", "ada sepuluh yang terbentuk"],
      ].map(([ikon, nama, ket]) => (
        <KotakPoster key={nama}>
          <p className="text-2xl" aria-hidden="true">
            {ikon}
          </p>
          <p className="text-xs font-black leading-tight text-[#1C01A5]">{nama}</p>
          <p className="text-[10px] font-black leading-tight text-[#1C01A5]/70">{ket}</p>
        </KotakPoster>
      ))}
    </div>,
  ];
}

export function InfografisK2B2AKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_A} judul="Berbagai Cara Penjumlahan" suaraInfo={SUARA_INFO} visual={visualInfografis()} speakGuru={speakGuru} />;
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Jodohkan Cara dan Langkah ------------------------- */

const CARA: CaraTambah[] = ["maju", "susun", "pasang"];
const URUTAN_LANGKAH = [
  [1, 2, 0],
  [2, 0, 1],
  [0, 2, 1],
];

function RondeCara({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const { a, b } = RONDE_CARA_A[ronde];
  const urut = URUTAN_LANGKAH[ronde % URUTAN_LANGKAH.length].map((k) => CARA[k]);
  const [dipilih, setDipilih] = useState<CaraTambah | null>(null);
  const [cocok, setCocok] = useState<CaraTambah[]>([]);
  const [keliru, setKeliru] = useState<CaraTambah | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = cocok.length === CARA.length;
  useBicara(beres, `Tiga cara memberi hasil yang sama. ${sebut(a)} ditambah ${sebut(b)} sama dengan ${sebut(a + b)}.`);

  const pilihNama = (c: CaraTambah) => {
    if (cocok.includes(c)) return;
    setDipilih(c);
    setKeliru(null);
    setKabar(null);
  };
  const pilihLangkah = (c: CaraTambah) => {
    if (cocok.includes(c)) return;
    if (dipilih === null) {
      setKabar({ teks: "Ketuk dulu nama cara di kolom kiri, lalu cari langkahnya di kolom kanan.", ok: false });
      return;
    }
    if (dipilih === c) {
      const baru = [...cocok, c];
      setCocok(baru);
      setDipilih(null);
      setKeliru(null);
      setKabar(null);
      if (baru.length === CARA.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setKeliru(c);
      setKabar({
        teks:
          dipilih === "maju"
            ? "Menghitung maju ditulis dengan panah dan deret bilangan yang bertambah satu."
            : dipilih === "susun"
              ? "Bersusun mengerjakan satuan dulu, lalu puluhan."
              : "Pasangan bilangan memisah bilangan pertama menjadi sepuluh dan satuannya.",
        ok: false,
      });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Semua cara cocok!" : `${a} + ${b} = ?`}
        teks={`Jodohkan nama cara dengan langkahnya. Ketuk nama cara di kolom kiri, lalu ketuk langkah yang cocok di kolom kanan. Ketiga cara mengerjakan ${sebut(a)} ditambah ${sebut(b)}.`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-2">
          <div className="space-y-2" role="group" aria-label="Nama cara">
            {CARA.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Cara ${NAMA_CARA_TAMBAH[c]}${cocok.includes(c) ? ", sudah cocok" : ""}`}
                aria-pressed={dipilih === c}
                disabled={cocok.includes(c)}
                onClick={() => pilihNama(c)}
                className={`flex min-h-16 w-full items-center justify-center rounded-2xl border-4 px-1 text-center text-base font-black leading-tight text-[#1C01A5] ${
                  cocok.includes(c) ? "border-[#7FCB96] bg-[#E8F7EE]" : dipilih === c ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-[#FFE566]"
                }`}
              >
                {NAMA_CARA_TAMBAH[c]}
              </button>
            ))}
          </div>
          <div className="space-y-2" role="group" aria-label="Langkah hitung">
            {urut.map((c) => (
              <button
                key={`${c}-${keliru === c ? "x" : "o"}`}
                type="button"
                aria-label={`Langkah: ${langkahCaraTambah(c, a, b)}${cocok.includes(c) ? ", sudah cocok" : ""}`}
                disabled={cocok.includes(c)}
                onClick={() => pilihLangkah(c)}
                className={`flex min-h-16 w-full items-center justify-center rounded-2xl border-4 px-2 text-center text-sm font-black leading-snug text-[#1C01A5] ${
                  cocok.includes(c) ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"
                } ${keliru === c ? "igil-goyang" : ""}`}
              >
                {langkahCaraTambah(c, a, b)}
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Pasangan benar: {cocok.length} dari {CARA.length}
        </p>
        {beres ? (
          <Berhasil>
            Ketiga cara berakhir di {a + b}. {a} + {b} = {a + b}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuCaraK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Jodohkan Cara dan Langkah"
      warna="#BBF7D0"
      petunjuk="Jodohkan nama cara dengan rangkaian langkahnya. Ketuk nama cara di kolom kiri, lalu ketuk langkah yang cocok di kolom kanan. Ketiga cara memberi hasil yang sama."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-cara"
      jumlahRonde={RONDE_CARA_A.length}
      belumSiap="Jodohkan semua cara dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeCara ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Kartu Kembar Hasil Sama --------------------------- */

type KartuKembar = { id: number; pasang: number; teks: string; nilai: number };

function RondeKembar({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const pasangan = RONDE_KEMBAR_A[ronde];
  const kartu: KartuKembar[] = pasangan.flatMap((p, pi) => p.map((d, di) => ({ id: pi * 2 + di, pasang: pi, teks: `${d.a} + ${d.b}`, nilai: d.a + d.b })));
  const urutan = urutanTetap(kartu.length, ronde === 0 ? 3 : 5).map((i) => kartu[i]);
  const [terbuka, setTerbuka] = useState<number[]>([]);
  const [cocok, setCocok] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [percobaan, setPercobaan] = useState(0);
  const letusan = useLetusan();
  const kunci = useRef(false);
  const waktu = useRef<number | undefined>(undefined);
  const beres = cocok.length === pasangan.length;
  useBicara(beres, `Semua pasangan ketemu. Dua kalimat yang berbeda bisa punya hasil yang sama.`);

  useEffect(() => () => window.clearTimeout(waktu.current), []);

  const buka = (k: KartuKembar) => {
    if (kunci.current || cocok.includes(k.pasang) || terbuka.includes(k.id)) return;
    setKabar(null);
    const baru = [...terbuka, k.id];
    setTerbuka(baru);
    if (baru.length < 2) return;
    const [x, y] = baru.map((id) => kartu.find((c) => c.id === id)!);
    setPercobaan((n) => n + 1);
    if (x.nilai === y.nilai) {
      const semua = [...cocok, x.pasang];
      setCocok(semua);
      setTerbuka([]);
      setKabar({ teks: `Cocok! ${x.teks} dan ${y.teks} sama-sama ${x.nilai}.`, ok: true });
      if (semua.length === pasangan.length) {
        letusan.picu();
        onBeres();
      }
      return;
    }
    kunci.current = true;
    setKabar({ teks: `${x.teks} hasilnya ${x.nilai}, ${y.teks} hasilnya ${y.nilai}. Hasilnya beda. Coba pasangan lain.`, ok: false });
    waktu.current = window.setTimeout(() => {
      setTerbuka([]);
      kunci.current = false;
    }, 1300);
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Semua pasangan ketemu!" : "Cari kalimat yang hasilnya sama"}
        teks="Buka dua kartu. Kalau hasil kedua kalimat sama, kartunya terkunci terbuka. Kalau berbeda, kartunya menutup lagi. Temukan semua pasangan."
      />
      <div className={KERTAS_ANGKA}>
        <div className="grid grid-cols-4 gap-2">
          {urutan.map((k) => {
            const terbukaSekarang = terbuka.includes(k.id) || cocok.includes(k.pasang);
            return (
              <button
                key={k.id}
                type="button"
                aria-label={terbukaSekarang ? `Kartu ${k.teks}` : "Kartu tertutup"}
                disabled={cocok.includes(k.pasang)}
                onClick={() => buka(k)}
                className={`flex h-16 items-center justify-center rounded-2xl border-4 text-base font-black leading-tight ${
                  cocok.includes(k.pasang) ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : terbukaSekarang ? "igil-muncul border-[#F0AB00] bg-[#FFF7CC] text-[#1C01A5]" : "border-[#1C01A5] bg-[#1C01A5] text-[#FFE566]"
                }`}
              >
                {terbukaSekarang ? k.teks : "?"}
              </button>
            );
          })}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Pasangan: {cocok.length} dari {pasangan.length} • Percobaan: {percobaan}
        </p>
        {beres ? <Berhasil>Dua kalimat berbeda bisa punya hasil yang sama, misalnya {pasangan[0][0].a} + {pasangan[0][0].b} dan {pasangan[0][1].a} + {pasangan[0][1].b}.</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKembarK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kartu Kembar Hasil Sama"
      warna="#FDE68A"
      petunjuk="Buka dua kartu. Kalau hasil kedua kalimat penjumlahan sama, kartunya terkunci terbuka. Kalau berbeda, kartunya menutup lagi. Temukan semua pasangan."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2a-kembar"
      jumlahRonde={RONDE_KEMBAR_A.length}
      belumSiap="Temukan semua pasangan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKembar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

export function KartuTulisK2B2A({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const soal = tahap === 0 ? TULIS_A_RONDE1 : pilih !== null ? TULIS_A_PILIHAN[pilih] : null;
  const n = soal ? soal.a + soal.b : null;
  const id = tahap === 0 ? "k2b2a-tulis-0" : `k2b2a-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && n !== null, soal && n !== null ? `${sebut(soal.a)} ditambah ${sebut(soal.b)} sama dengan ${sebut(n)}. Lambangnya ${n}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Baca kalimat penjumlahannya, ucapkan hasilnya, lalu guratkan angkanya di kanvas. Setelah itu, pilih kalimat yang kamu suka.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Baca dan ucapkan hasilnya" : soal ? `Ucapkan hasil ${soal.a} + ${soal.b}` : "Pilih satu kalimat"}
          teks={
            tahap === 0
              ? `Baca kalimat ini: ${sebut(TULIS_A_RONDE1.a)} ditambah ${sebut(TULIS_A_RONDE1.b)}. Ucapkan hasilnya, lalu guratkan lambangnya di kanvas. Hasilnya ditulis dengan angka satu lalu angka delapan.`
              : `Ayo mencoba. Pilih satu kalimat sesukamu: ${TULIS_A_PILIHAN.map((p) => `${sebut(p.a)} ditambah ${sebut(p.b)}`).join(", ")}. Ucapkan hasilnya, lalu guratkan lambangnya di kanvas.`
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              {TULIS_A_RONDE1.a} + {TULIS_A_RONDE1.b} = ?
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {TULIS_A_PILIHAN.map((p, i) => (
                <button
                  key={`${p.a}-${p.b}`}
                  type="button"
                  aria-label={`Pilih ${p.a} ditambah ${p.b}`}
                  disabled={pilih !== null}
                  onClick={() => setPilih(i)}
                  className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-xl font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${pilih === i ? "bg-[#7FCB96]" : "bg-[#FFE566]"}`}
                >
                  {p.a} + {p.b}
                </button>
              ))}
            </div>
          )}
          {soal && n !== null ? (
            <p className="text-center text-2xl font-black text-[#1C01A5]">
              {soal.a} + {soal.b} = {suara ? n : "?"}
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

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahPetikK2B2A {...d} /> },
  { nomor: 2, render: (d) => <LangkahGabungK2B2A {...d} /> },
  { nomor: 3, render: (d) => <LangkahPindahK2B2A {...d} /> },
  { nomor: 4, render: (d) => <LangkahNeracaK2B2A {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuLompatK2B2A {...d} /> },
  { nomor: 6, render: (d) => <KartuSusunK2B2A {...d} /> },
  { nomor: 7, render: (d) => <KartuBaganK2B2A {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuCaraK2B2A {...d} /> },
  { nomor: 9, render: (d) => <KartuKembarK2B2A {...d} /> },
  { nomor: 10, render: (d) => <KartuTulisK2B2A {...d} /> },
];

export function ConcreteK2B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Pegang, seret, dan hitung!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B2A(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B2A(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_A} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB A ➡️" />}
    />
  );
}
