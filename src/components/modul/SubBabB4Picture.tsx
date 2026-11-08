"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, TOMBOL_KECIL, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { Bangun, type JenisBangun } from "./bentuk-a4-dasar";
import { NAMA_WARNA, WARNA_ISI, type Warna } from "./kelompok-b4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab B, Tahap 5 Picture: diagram saja. Tidak ada gambar benda.    */
/* Bentuk polos berwarna (bulat, segitiga, persegi) dengan dua ukuran.        */
/*  5 Ketuk Semua yang Sama (menandai)                                         */
/*  6 Tabel Hitung Kelompok (mengisi tabel)                                    */
/*  7 Cari yang Beda (mencari satu yang berbeda)                               */
/* ------------------------------------------------------------------------ */

type Bentuk3 = "bulat" | "segitiga" | "persegi";
type Ukur = "besar" | "kecil";
type Titik = { b: Bentuk3; w: Warna; u: Ukur };

const NAMA_BENTUK: Record<Bentuk3, string> = { bulat: "bulat", segitiga: "segitiga", persegi: "persegi" };
const KELAS_TITIK: Record<Ukur, string> = { besar: "h-14 w-14", kecil: "h-8 w-8" };
const t = (b: Bentuk3, w: Warna, u: Ukur): Titik => ({ b, w, u });

function Titik2({ x, kelas }: { x: Titik; kelas?: string }) {
  return (
    <Bangun
      jenis={x.b as JenisBangun}
      isi={WARNA_ISI[x.w]}
      kelas={kelas ?? KELAS_TITIK[x.u]}
      label={`${NAMA_BENTUK[x.b]} ${NAMA_WARNA[x.w]} ${x.u}`}
    />
  );
}

const namaTitik = (x: Titik) => `${NAMA_BENTUK[x.b]} ${NAMA_WARNA[x.w]} ${x.u}`;

/* --------- Permainan 5. Ketuk Semua yang Sama (hlm. 128-129) -------------- */

type SoalKetuk = { aturan: "warna" | "bentuk" | "ukuran"; nilai: string; daftar: Titik[]; teks: string };

const cocokKetuk = (s: SoalKetuk, x: Titik) => (s.aturan === "warna" ? x.w : s.aturan === "bentuk" ? x.b : x.u) === s.nilai;

const RONDE_KETUK: SoalKetuk[] = [
  {
    aturan: "warna",
    nilai: "merah",
    teks: "Ketuk semua bentuk yang berwarna MERAH.",
    daftar: [t("bulat", "merah", "besar"), t("segitiga", "biru", "kecil"), t("persegi", "merah", "kecil"), t("segitiga", "merah", "besar"), t("bulat", "kuning", "besar"), t("persegi", "biru", "besar"), t("bulat", "merah", "kecil"), t("segitiga", "kuning", "kecil")],
  },
  {
    aturan: "bentuk",
    nilai: "segitiga",
    teks: "Ketuk semua bentuk SEGITIGA.",
    daftar: [t("persegi", "merah", "besar"), t("segitiga", "biru", "besar"), t("bulat", "kuning", "kecil"), t("segitiga", "merah", "kecil"), t("persegi", "biru", "kecil"), t("bulat", "merah", "besar"), t("segitiga", "kuning", "besar"), t("persegi", "kuning", "besar")],
  },
  {
    aturan: "ukuran",
    nilai: "kecil",
    teks: "Ketuk semua bentuk yang berukuran KECIL.",
    daftar: [t("bulat", "biru", "kecil"), t("segitiga", "merah", "besar"), t("persegi", "kuning", "kecil"), t("bulat", "merah", "besar"), t("segitiga", "biru", "kecil"), t("persegi", "merah", "besar"), t("bulat", "kuning", "besar"), t("persegi", "biru", "kecil")],
  },
];

function RondeKetuk({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const s = RONDE_KETUK[ronde];
  const akhir = ronde === RONDE_KETUK.length - 1;
  const sasaran = s.daftar.filter((x) => cocokKetuk(s, x)).length;
  const [tanda, setTanda] = useState<boolean[]>(() => s.daftar.map(() => false));
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const jumlah = tanda.filter(Boolean).length;
  const beres = jumlah === sasaran;
  const suara = panel.suara["b4-ketuk"] === true && akhir;
  useBicara(akhir ? suara : beres, `Semua sudah ditandai. Ada ${kataK(sasaran)} bentuk yang cocok dengan aturannya.`);

  const ketuk = (i: number) => {
    if (beres || tanda[i]) return;
    if (!cocokKetuk(s, s.daftar[i])) {
      setGoyang(i);
      setKabar({
        teks: `Bentuk ini ${s.aturan === "warna" ? "berwarna" : s.aturan === "bentuk" ? "berbentuk" : "berukuran"} ${
          s.aturan === "warna" ? NAMA_WARNA[s.daftar[i].w] : s.aturan === "bentuk" ? NAMA_BENTUK[s.daftar[i].b] : s.daftar[i].u
        }, bukan ${s.nilai}. Cari yang lain.`,
        ok: false,
      });
      return;
    }
    const baru = tanda.slice();
    baru[i] = true;
    setTanda(baru);
    setGoyang(null);
    setKabar(null);
    if (baru.filter(Boolean).length === sasaran) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak yang ditandai" : "Semua sudah ditandai") : s.teks}
        teks={`${s.teks} Periksa setiap bentuk satu per satu.${akhir ? " Setelah semua ditandai, ucapkan berapa banyak bentuk yang kamu tandai." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5">
          {s.aturan === "warna" ? (
            <span aria-hidden="true" className="block h-6 w-6 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_ISI[s.nilai as Warna] }} />
          ) : null}
          <span className="text-center text-base font-black text-[#1C01A5]">Aturan: {s.aturan}</span>
          <span className="rounded-full bg-[#FFE566] px-2 text-sm font-black text-[#1C01A5]">
            {tanda.filter(Boolean).length} / {sasaran}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {s.daftar.map((x, i) => (
            <button
              key={`${i}-${goyang === i ? "x" : "o"}`}
              type="button"
              aria-label={`${namaTitik(x)}${tanda[i] ? ", sudah ditandai" : ""}`}
              aria-pressed={tanda[i]}
              onClick={() => ketuk(i)}
              className={`igil-tanpa-tepi relative flex min-h-[76px] items-center justify-center rounded-2xl border-4 bg-white py-2 ${
                tanda[i] ? "border-[#16A34A] bg-[#E8F7EE]" : "border-dashed border-[#6B7280]/50"
              } ${goyang === i ? "igil-goyang" : ""}`}
            >
              <Titik2 x={x} />
              {tanda[i] ? (
                <span className="absolute right-0.5 top-0.5 text-lg" aria-hidden="true">
                  ✅
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuKetuk({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const kunci = RONDE_KETUK[RONDE_KETUK.length - 1].daftar.filter((x) => cocokKetuk(RONDE_KETUK[RONDE_KETUK.length - 1], x)).length;
  return (
    <GameBentuk
      nomor={nomor}
      judul="Ketuk Semua yang Sama"
      warna="#FDE68A"
      petunjuk="Baca aturannya, lalu ketuk semua bentuk yang cocok. Aturannya bisa warna, bentuk, atau ukuran. Pada soal terakhir, ucapkan berapa banyak bentuk kecil yang kamu tandai."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-ketuk"
      jumlahRonde={RONDE_KETUK.length}
      kunciAkhir={kunci}
      belumSiap="Tandai semua bentuk yang cocok dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKetuk ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Tabel Hitung Kelompok ----------------------------- */

const BARIS_TABEL: Warna[] = ["merah", "biru", "kuning"];

const RONDE_TABEL: { daftar: Titik[]; hitung: Record<string, number> }[] = [
  {
    daftar: [t("bulat", "merah", "besar"), t("segitiga", "biru", "kecil"), t("persegi", "merah", "kecil"), t("segitiga", "kuning", "besar"), t("bulat", "merah", "kecil"), t("persegi", "biru", "besar")],
    hitung: { merah: 3, biru: 2, kuning: 1 },
  },
  {
    daftar: [t("segitiga", "biru", "besar"), t("bulat", "kuning", "kecil"), t("persegi", "merah", "besar"), t("bulat", "biru", "kecil"), t("segitiga", "kuning", "besar"), t("persegi", "biru", "kecil"), t("bulat", "merah", "kecil"), t("segitiga", "biru", "besar"), t("persegi", "kuning", "kecil")],
    hitung: { merah: 2, biru: 4, kuning: 3 },
  },
];

function RondeTabel({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TABEL[ronde];
  const akhir = ronde === RONDE_TABEL.length - 1;
  const total = d.daftar.length;
  const [isi, setIsi] = useState<Record<string, number>>({ merah: 0, biru: 0, kuning: 0 });
  const [benar, setBenar] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["b4-tabel"] === true && akhir;
  useBicara(
    akhir ? suara : benar,
    `Tabel sudah benar. Merah ${kataK(d.hitung.merah)}, biru ${kataK(d.hitung.biru)}, kuning ${kataK(d.hitung.kuning)}. Semuanya ada ${kataK(total)} bentuk.`
  );

  const ubah = (w: Warna, delta: number) => {
    if (benar) return;
    setIsi((p) => ({ ...p, [w]: Math.max(0, Math.min(9, p[w] + delta)) }));
    setKabar(null);
  };

  const periksa = () => {
    if (benar) return;
    const salah = BARIS_TABEL.filter((w) => isi[w] !== d.hitung[w]);
    if (salah.length === 0) {
      setBenar(true);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKabar({ teks: `Hitung lagi baris ${salah.map((w) => NAMA_WARNA[w]).join(" dan ")}. Tunjuk bentuknya satu per satu, ya.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : benar ? (akhir ? "Ucapkan: banyak semua bentuk" : "Tabelnya benar!") : "Hitung tiap warna, isi tabel"}
        teks={`Hitung bentuk menurut warnanya. Tekan tombol plus dan minus untuk mengisi tabel, lalu tekan Periksa.${akhir ? " Setelah tabelnya benar, ucapkan berapa banyak semua bentuk." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#6B7280]/50 bg-white px-2 py-2">
          {d.daftar.map((x, i) => (
            <Titik2 key={i} x={x} />
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <table className="w-full border-collapse text-center text-[#1C01A5]">
            <thead>
              <tr className="bg-[#1C01A5] text-xs text-[#FFE566]">
                <th className="px-1 py-1.5 text-left">Warna</th>
                <th className="px-1 py-1.5">Banyaknya</th>
              </tr>
            </thead>
            <tbody>
              {BARIS_TABEL.map((w) => (
                <tr key={w} className="border-t-2 border-[#1C01A5]/20">
                  <td className="px-2 py-1 text-left text-sm font-black">
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true" className="block h-6 w-6 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_ISI[w] }} />
                      {NAMA_WARNA[w]}
                    </span>
                  </td>
                  <td className="px-1 py-1">
                    <span className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label={`Kurangi ${NAMA_WARNA[w]}`}
                        disabled={benar}
                        onClick={() => ubah(w, -1)}
                        className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none disabled:opacity-50"
                      >
                        −
                      </button>
                      <span aria-label={`${NAMA_WARNA[w]}: ${isi[w]}`} className={`w-9 rounded-lg border-2 border-[#1C01A5] py-0.5 text-2xl font-black ${benar ? "bg-[#E8F7EE] text-[#166534]" : "bg-[#FFF7CC]"}`}>
                        {isi[w]}
                      </span>
                      <button
                        type="button"
                        aria-label={`Tambah ${NAMA_WARNA[w]}`}
                        disabled={benar}
                        onClick={() => ubah(w, 1)}
                        className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none disabled:opacity-50"
                      >
                        +
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {benar ? null : (
          <button type="button" onClick={periksa} className={TOMBOL_KECIL}>
            ✅ Periksa
          </button>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTabel({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tabel Hitung Kelompok"
      warna="#FDE68A"
      petunjuk="Hitung bentuk menurut warnanya, lalu isi tabel dengan tombol plus dan minus. Tekan Periksa. Pada soal terakhir, ucapkan berapa banyak semua bentuk."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-tabel"
      jumlahRonde={RONDE_TABEL.length}
      kunciAkhir={RONDE_TABEL[RONDE_TABEL.length - 1].daftar.length}
      belumSiap="Isi tabel dengan benar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabel ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Cari yang Beda ------------------------------------ */

type SoalBeda = { aturan: "warna" | "bentuk" | "ukuran"; daftar: Titik[]; beda: number };

const RONDE_BEDA: SoalBeda[] = [
  { aturan: "warna", daftar: [t("bulat", "merah", "besar"), t("segitiga", "merah", "kecil"), t("persegi", "biru", "besar"), t("bulat", "merah", "kecil")], beda: 2 },
  { aturan: "bentuk", daftar: [t("segitiga", "kuning", "besar"), t("segitiga", "biru", "kecil"), t("bulat", "merah", "besar"), t("segitiga", "hijau", "kecil")], beda: 2 },
  { aturan: "ukuran", daftar: [t("bulat", "biru", "kecil"), t("persegi", "merah", "kecil"), t("segitiga", "hijau", "besar"), t("segitiga", "kuning", "kecil")], beda: 2 },
  { aturan: "warna", daftar: [t("persegi", "hijau", "kecil"), t("segitiga", "biru", "kecil"), t("bulat", "hijau", "besar"), t("segitiga", "hijau", "besar")], beda: 1 },
];

const nilaiCiri = (a: SoalBeda["aturan"], x: Titik) => (a === "warna" ? NAMA_WARNA[x.w] : a === "bentuk" ? NAMA_BENTUK[x.b] : x.u);

function RondeBeda({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const s = RONDE_BEDA[ronde];
  const [benar, setBenar] = useState(false);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const sama = nilaiCiri(s.aturan, s.daftar[s.beda === 0 ? 1 : 0]);
  const ciriBeda = s.aturan === "warna" ? "warnanya" : s.aturan === "bentuk" ? "bentuknya" : "ukurannya";
  useBicara(benar, `Yang ini berbeda ${s.aturan}. Tiga yang lain ${sama}, yang ini ${nilaiCiri(s.aturan, s.daftar[s.beda])}.`);

  const pilih = (i: number) => {
    if (benar) return;
    if (i === s.beda) {
      setBenar(true);
      setGoyang(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setGoyang(i);
      setKabar({ teks: `Bentuk ini ${ciriBeda} sama dengan yang lain. Cari satu yang ${ciriBeda} berbeda.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={benar ? "Betul!" : `Ketuk yang berbeda ${s.aturan}nya`}
        teks={`Ada empat bentuk. Tiga bentuk punya ${s.aturan} yang sama. Satu bentuk berbeda ${s.aturan}nya. Ketuk bentuk yang berbeda itu.`}
      />
      <div className={KERTAS_GAMBAR}>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Lihat <span className="rounded bg-[#FFE566] px-1.5">{s.aturan.toUpperCase()}</span>nya
        </p>
        <div className="grid grid-cols-4 gap-2">
          {s.daftar.map((x, i) => (
            <button
              key={`${i}-${goyang === i ? "x" : "o"}`}
              type="button"
              aria-label={`Bentuk ${i + 1}: ${namaTitik(x)}`}
              onClick={() => pilih(i)}
              className={`igil-tanpa-tepi flex min-h-[84px] items-center justify-center rounded-2xl border-4 bg-white py-2 ${
                benar && i === s.beda ? "border-[#16A34A] bg-[#E8F7EE]" : "border-dashed border-[#6B7280]/50"
              } ${goyang === i ? "igil-goyang" : ""}`}
            >
              <Titik2 x={x} />
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBeda({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Cari yang Beda"
      warna="#FDE68A"
      petunjuk="Ada empat bentuk. Tiga bentuk punya ciri yang sama, satu bentuk berbeda. Aturannya tertulis di atas: warna, bentuk, atau ukuran. Ketuk bentuk yang berbeda."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-beda"
      jumlahRonde={RONDE_BEDA.length}
      belumSiap=""
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBeda ronde={r} onBeres={beres} />}
    />
  );
}
