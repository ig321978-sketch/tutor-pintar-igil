"use client";

import React, { useState } from "react";
import { KERTAS_ANGKA, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { BendaSeret, CatatanPensil, useBicara, zonaDi } from "./tahap-b-gaya";
import { Bagan } from "./gambar-pasangan-d";
import { TahapPermainan, type KartuTahap } from "./kit-k2";
import { sebut } from "./dasar-k2";
import { BarisJambu, JalurKotakB2, SusunTabel } from "./dasar-k2b2";
import { Berhasil, PilihanAngka } from "./permainan-k2b2";
import { InfografisK2B2, KotakPoster, PoinK2B2, TabelPoster } from "./kit-k2b2";
import { SUB_B } from "./naskah-k2b2";
import { RONDE_DETEKTIF_B, RONDE_KELUARGA_B, RONDE_SORT_B, barisKeluarga, perluUrai, satuanDari, urutanTetap } from "./data-k2b2";
import { LangkahBeriK2B2B, LangkahSelisihK2B2B, LangkahTambahPasK2B2B, LangkahUraiK2B2B } from "./SubBabK2B2BConcrete";
import { KartuBaganKurangK2B2B, KartuMundurK2B2B, KartuSusunKurangK2B2B } from "./SubBabK2B2BPicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab B: Berbagai Cara Melakukan Pengurangan (Buku Siswa    */
/* Kelas II hlm. 48-53). Semua di klien, tanpa API.                           */
/* Naskah: naskah/mtk-2-bab2-sub-b-berbagai-cara-pengurangan.md               */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Beri Jambu ke Lili (seret), 2 Pasangkan Selisih (pasangkan),  */
/*            3 Urai Satu Puluhan (urai), 4 Tambah Sampai Pas (hitung maju).  */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Loncat Mundur, 6 Susun Kurang, 7 Bagan Pasangan Kurang.       */
/*  Abstract: 8 Perlu Urai atau Tidak? (sortir), 9 Keluarga Bilangan (isi),   */
/*            10 Detektif Pengurangan (petunjuk).                             */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman berbagai cara melakukan pengurangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center";

const lompatMundur = (a: number, b: number): [number, number][] => Array.from({ length: b }, (_, i) => [a - i, a - i - 1] as [number, number]);

function visualInfografis(): React.ReactNode[] {
  return [
    /* 1 Selisih jambu air */
    <div key="1" className="space-y-1">
      <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
        <p className="text-xs font-black text-[#1C01A5]">Kira 18 (merah muda)</p>
        <BarisJambu n={18} kelas="h-4 w-4" warna="#DB2777" sorot={[12, 13, 14, 15, 16, 17]} />
        <p className="text-xs font-black text-[#1C01A5]">Tika 12 (kuning)</p>
        <BarisJambu n={12} kelas="h-4 w-4" warna="#F59E0B" />
      </div>
      <p className="text-center text-xl font-black text-[#1C01A5]">18 − 12 = 6</p>
    </div>,
    /* 2 Hitung mundur */
    <div key="2" className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
      <JalurKotakB2 dari={5} sampai={20} mulai={18} sorot={[6]} lompat={lompatMundur(18, 12)} />
      <p className="text-center text-sm font-black text-[#1C01A5]">18 − 12: mundur 12 lompatan, berhenti di 6</p>
    </div>,
    /* 3 Bersusun */
    <div key="3" className="space-y-1">
      <SusunTabel op="−" atas={[{ n: 1 }, { n: 8 }]} bawah={[{ n: 1 }, { n: 2 }]} hasil={[{ n: 0 }, { n: 6 }]} />
      <p className="text-center text-xs font-black text-[#1C01A5]/80">Satuan dulu: 8 − 2 = 6. Puluhan: 1 − 1 = 0.</p>
    </div>,
    /* 4 Pasangan kurang */
    <div key="4" className="space-y-1">
      <div className="flex items-center justify-center gap-1">
        <div className="w-1/2">
          <Bagan gabungan={18} a={10} b={8} kelas="w-full max-w-[140px]" />
        </div>
        <span className="text-2xl font-black text-[#1C01A5]">−</span>
        <div className="w-1/2">
          <Bagan gabungan={12} a={10} b={2} kelas="w-full max-w-[140px]" />
        </div>
      </div>
      <p className="text-center text-lg font-black text-[#1C01A5]">
        10 − 10 = 0 • 8 − 2 = 6 • <span className="text-[#16A34A]">18 − 12 = 6</span>
      </p>
    </div>,
    /* 5 Tiga cara, satu hasil */
    <TabelPoster
      key="5"
      kolom="5.5rem 1fr 2.6rem"
      kepala={["Cara", "Langkah", "Hasil"]}
      baris={[
        ["Hitung mundur", "18 → 17 ... → 6 (12 lompatan)", "6"],
        ["Bersusun", "8 − 2 = 6, 1 − 1 = 0", "6"],
        ["Pasangan", "10 − 10 = 0, 8 − 2 = 6", "6"],
      ]}
    />,
    /* 6 Urai 12 − 8 */
    <div key="6" className="space-y-1">
      <SusunTabel op="−" atas={[{ n: 1, atas: "−1", bawah: "0" }, { n: 2, bawah: "12" }]} bawah={[{ n: null }, { n: 8 }]} hasil={[{ n: 0 }, { n: 4 }]} />
      <p className="text-center text-xs font-black text-[#1C01A5]/80">2 − 8 tidak cukup. Urai 1 puluhan: 2 + 10 = 12. 12 − 8 = 4.</p>
    </div>,
    /* 7 Kapan harus diurai */
    <TabelPoster
      key="7"
      kolom="4.2rem 5rem 1fr"
      kepala={["Soal", "Satuan", "Keputusan"]}
      baris={[
        ["18 − 12", "8 ≥ 2", "Langsung kurangkan"],
        ["12 − 8", "2 < 8", "Urai dulu"],
        ["20 − 6", "0 < 6", "Urai dulu → 14"],
      ]}
    />,
    /* 8 Keluarga bilangan */
    <div key="8" className="space-y-1">
      <div className="flex items-center justify-center gap-2">
        {[6, 12, 18].map((n, i) => (
          <span key={n} className={`flex h-12 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-2xl font-black text-[#1C01A5] ${i === 2 ? "bg-[#FFE566]" : "bg-[#C7D2FE]"}`}>
            {n}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1 text-center text-sm font-black text-[#1C01A5]">
        <span className={SEL}>6 + 12 = 18</span>
        <span className={SEL}>12 + 6 = 18</span>
        <span className={SEL}>18 − 6 = 12</span>
        <span className={SEL}>18 − 12 = 6</span>
      </div>
    </div>,
    /* 9 Tambah sampai pas */
    <div key="9" className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
      <JalurKotakB2 dari={11} sampai={19} mulai={12} sorot={[18]} lompat={Array.from({ length: 6 }, (_, i) => [12 + i, 13 + i] as [number, number])} />
      <p className="text-center text-sm font-black text-[#1C01A5]">Dari 12 tambah 6 sampai 18, jadi 18 − 12 = 6</p>
    </div>,
    /* 10 Pilih cara termudah */
    <div key="10" className="grid grid-cols-2 gap-1 text-center">
      {[
        ["🐸", "Hitung mundur", "bilangan pengurang kecil"],
        ["📋", "Bersusun", "ingin rapi dan teliti"],
        ["🌿", "Pasangan", "dua bilangan mudah dipisah"],
        ["🛒", "Tambah sampai pas", "dua bilangan berdekatan"],
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

export function InfografisK2B2BKomponen({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return <InfografisK2B2 s={SUB_B} judul="Berbagai Cara Pengurangan" suaraInfo={SUARA_INFO} visual={visualInfografis()} speakGuru={speakGuru} />;
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Perlu Urai atau Tidak? ---------------------------- */

const ZONA_LANGSUNG = "k2b2b-sort-langsung";
const ZONA_URAI = "k2b2b-sort-urai";

function RondeSortir({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const daftar = RONDE_SORT_B[ronde];
  const urutan = urutanTetap(daftar.length, ronde === 0 ? 2 : 3);
  const [langsung, setLangsung] = useState<number[]>([]);
  const [urai, setUrai] = useState<number[]>([]);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sisa = urutan.filter((i) => !langsung.includes(i) && !urai.includes(i));
  const beres = sisa.length === 0;
  useBicara(beres, "Kamu sudah memilah semuanya. Kalau satuan atas lebih kecil dari satuan bawah, kita urai satu puluhan dulu.");

  const taruh = (i: number, zona: string | null) => {
    if (zona !== ZONA_LANGSUNG && zona !== ZONA_URAI) return;
    const { a, b } = daftar[i];
    const perlu = perluUrai(a, b);
    const benar = (zona === ZONA_URAI) === perlu;
    if (!benar) {
      setKeliru(i);
      setKabar({
        teks: perlu
          ? `Satuan atas ${sebut(satuanDari(a))} lebih kecil dari satuan bawah ${sebut(satuanDari(b))}. Satuannya tidak cukup, jadi perlu urai dulu.`
          : `Satuan atas ${sebut(satuanDari(a))} lebih besar atau sama dengan satuan bawah ${sebut(satuanDari(b))}. Satuannya cukup, jadi langsung dikurangkan.`,
        ok: false,
      });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setDipilih(null);
    if (zona === ZONA_URAI) setUrai((l) => [...l, i]);
    else setLangsung((l) => [...l, i]);
    if (sisa.length === 1) {
      letusan.picu();
      onBeres();
    }
  };

  const sel = (i: number) => (
    <span className="rounded-xl border-2 border-[#1C01A5] bg-white px-2 py-1 text-base font-black text-[#1C01A5]">
      {daftar[i].a} − {daftar[i].b}
    </span>
  );

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Semua sudah dipilah!" : "Perlu urai atau tidak?"}
        teks="Seret setiap kartu ke kotak yang tepat, atau ketuk kartu lalu ketuk kotaknya. Bandingkan satuan atas dengan satuan bawah. Kalau satuan atas lebih kecil, perlu urai dulu. Kalau tidak, langsung kurangkan."
      />
      <div className={KERTAS_ANGKA}>
        <div className="flex min-h-[3.5rem] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#1C01A5]/40 bg-[#FFFDF2] px-2 py-2" role="group" aria-label="Kartu pengurangan">
          {sisa.map((i) => (
            <BendaSeret key={`${i}-${keliru === i ? "x" : "o"}`} id={`kartu-${i}`} label={`Kartu ${daftar[i].a} dikurangi ${daftar[i].b}`} onKetuk={() => setDipilih(dipilih === i ? null : i)} onLepas={(_, x, y) => taruh(i, zonaDi(x, y))} kelas="rounded-xl">
              <span
                className={`flex h-14 items-center justify-center rounded-2xl border-4 px-3 text-2xl font-black text-[#1C01A5] ${dipilih === i ? "border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-[#1C01A5] bg-[#FFE566]"} ${keliru === i ? "igil-goyang" : ""}`}
              >
                {daftar[i].a} − {daftar[i].b}
              </span>
            </BendaSeret>
          ))}
          {beres ? <span className="text-base font-black text-[#14532D]">Semua kartu sudah dipilah</span> : null}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            data-zona={ZONA_LANGSUNG}
            aria-label={`Kotak langsung kurangkan, berisi ${langsung.length} kartu`}
            onClick={() => dipilih !== null && taruh(dipilih, ZONA_LANGSUNG)}
            className="min-h-[8rem] rounded-3xl border-4 border-[#16A34A] bg-[#F0FDF4] px-2 py-2 text-center"
          >
            <span className="block text-sm font-black leading-tight text-[#14532D]">✅ Langsung kurangkan</span>
            <span className="block text-[11px] font-black text-[#14532D]/80">satuan atas cukup</span>
            <span className="mt-1 flex flex-col items-center gap-1">{langsung.map((i) => <span key={i}>{sel(i)}</span>)}</span>
          </button>
          <button
            type="button"
            data-zona={ZONA_URAI}
            aria-label={`Kotak urai dulu, berisi ${urai.length} kartu`}
            onClick={() => dipilih !== null && taruh(dipilih, ZONA_URAI)}
            className="min-h-[8rem] rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2 text-center"
          >
            <span className="block text-sm font-black leading-tight text-[#831843]">🧱 Urai dulu</span>
            <span className="block text-[11px] font-black text-[#831843]/80">satuan atas tidak cukup</span>
            <span className="mt-1 flex flex-col items-center gap-1">{urai.map((i) => <span key={i}>{sel(i)}</span>)}</span>
          </button>
        </div>
        {beres ? (
          <Berhasil>
            Perlu urai: {urai.map((i) => `${daftar[i].a} − ${daftar[i].b}`).join(", ")}. Langsung: {langsung.map((i) => `${daftar[i].a} − ${daftar[i].b}`).join(", ")}.
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuSortirK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Perlu Urai atau Tidak?"
      warna="#FECACA"
      petunjuk="Seret setiap kartu pengurangan ke kotak yang tepat. Bandingkan satuan atas dengan satuan bawah. Kalau satuan atas lebih kecil, kartunya masuk kotak urai dulu. Kalau tidak, kartunya masuk kotak langsung kurangkan."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-sortir"
      jumlahRonde={RONDE_SORT_B.length}
      belumSiap="Pilah semua kartu dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSortir ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Keluarga Bilangan --------------------------------- */

function RondeKeluarga({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [x, y, z] = RONDE_KELUARGA_B[ronde];
  const baris = barisKeluarga(x, y);
  const [terisi, setTerisi] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terisi >= baris.length;
  const chip = [z, x, y];
  useBicara(beres, `Keluarga bilangan ${sebut(x)}, ${sebut(y)}, dan ${sebut(z)}. Empat kalimat memakai bilangan yang sama. Penjumlahan dan pengurangan berkeluarga.`);

  const pilih = (n: number) => {
    if (beres) return;
    const b = baris[terisi];
    if (n !== b.jawab) {
      setKeliru(n);
      setKabar({ teks: b.teks[1] === "+" ? "Pada penjumlahan, dua bagian digabung menjadi keseluruhan. Keseluruhan adalah bilangan terbesar." : "Pada pengurangan, keseluruhan ada di depan. Yang dikurangkan adalah salah satu bagian.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    const baru = terisi + 1;
    setTerisi(baru);
    if (baru >= baris.length) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Keluargamu lengkap!" : `Keluarga ${x}, ${y}, ${z}`}
        teks={`Isi bagian yang kosong dengan bilangan dari keluarga ${sebut(x)}, ${sebut(y)}, dan ${sebut(z)}. Ketuk bilangannya. Dua bagian dan satu keseluruhan membentuk empat kalimat.`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="space-y-2">
          {baris.map((b, i) => (
            <div key={i} className={`flex items-center justify-center gap-1.5 rounded-2xl border-4 px-2 py-1.5 ${i < terisi ? "border-[#7FCB96] bg-[#E8F7EE]" : i === terisi ? "border-[#F0AB00] bg-[#FFF7CC]" : "border-[#1C01A5]/25 bg-white opacity-60"}`}>
              {b.teks.map((t, j) => {
                const kosong = j === b.kosong;
                const isi = kosong && i < terisi ? String(b.jawab) : t;
                return (
                  <span
                    key={j}
                    className={`flex h-11 items-center justify-center font-black ${j % 2 === 1 ? "w-7 text-3xl text-[#1C01A5]" : `w-12 rounded-xl border-4 text-3xl ${kosong ? (i < terisi ? "border-[#16A34A] bg-white text-[#16A34A]" : "border-dashed border-[#1C01A5] bg-white text-[#1C01A5]") : "border-[#1C01A5] bg-white text-[#2563EB]"}`}`}
                  >
                    {isi}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        {!beres ? (
          <div className="space-y-1">
            <p className="text-center text-sm font-black text-[#1C01A5]">Ketuk bilangan untuk kalimat {terisi + 1}:</p>
            <PilihanAngka opsi={chip} keliru={keliru} onPilih={pilih} />
          </div>
        ) : (
          <Berhasil>
            Keluarga {x}, {y}, {z}: dua kalimat tambah dan dua kalimat kurang.
          </Berhasil>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKeluargaK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Keluarga Bilangan"
      warna="#BBF7D0"
      petunjuk="Isi bagian yang kosong pada empat kalimat dengan bilangan dari keluarga. Ketuk bilangan yang tepat. Dua bagian dan satu keseluruhan membentuk dua kalimat tambah dan dua kalimat kurang."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-keluarga"
      jumlahRonde={RONDE_KELUARGA_B.length}
      belumSiap="Lengkapi semua kalimat keluarga dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKeluarga ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Detektif Pengurangan ----------------------------- */

function RondeDetektif({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_DETEKTIF_B[ronde];
  const akhir = ronde === RONDE_DETEKTIF_B.length - 1;
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2b-detektif"] === true && akhir;
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
        <PilihanAngka opsi={d.opsi.slice().sort((a, b) => a - b)} keliru={keliru} onPilih={pilih} mati={beres} />
        {beres ? (
          <Berhasil>{akhir && !suara ? "Aku bilangan: ?" : `Aku bilangan ${d.jawab}, dibaca ${sebut(d.jawab)}.`}</Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuDetektifK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Detektif Pengurangan"
      warna="#FDE68A"
      petunjuk="Baca dua petunjuk tentang bilangan misterius, lalu pilih bilangan yang cocok dengan kedua petunjuk. Pada soal terakhir, ucapkan bilangan itu."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-detektif"
      jumlahRonde={RONDE_DETEKTIF_B.length}
      kunciAkhir={RONDE_DETEKTIF_B[RONDE_DETEKTIF_B.length - 1].jawab}
      belumSiap="Temukan bilangan misterius dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDetektif ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahBeriK2B2B {...d} /> },
  { nomor: 2, render: (d) => <LangkahSelisihK2B2B {...d} /> },
  { nomor: 3, render: (d) => <LangkahUraiK2B2B {...d} /> },
  { nomor: 4, render: (d) => <LangkahTambahPasK2B2B {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuMundurK2B2B {...d} /> },
  { nomor: 6, render: (d) => <KartuSusunKurangK2B2B {...d} /> },
  { nomor: 7, render: (d) => <KartuBaganKurangK2B2B {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuSortirK2B2B {...d} /> },
  { nomor: 9, render: (d) => <KartuKeluargaK2B2B {...d} /> },
  { nomor: 10, render: (d) => <KartuDetektifK2B2B {...d} /> },
];

export function ConcreteK2B2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧸", nama: "CONCRETE", cara: "Pegang, seret, dan hitung!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureK2B2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractK2B2B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: "#1C01A5" }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => <PoinK2B2 s={SUB_B} speakGuru={props.speakGuru} onSelesai={selesai} teksSelesai="SELESAIKAN SUB-BAB B ➡️" />}
    />
  );
}
