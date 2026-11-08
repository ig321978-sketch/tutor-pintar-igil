"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import {
  ATRIBUT_B,
  BendaB,
  GambarItem,
  KELAS_UKURAN,
  NAMA_ATURAN,
  NAMA_WARNA,
  namaItem,
  warnaItem,
  type Aturan,
  type ItemB,
  type JenisBendaB,
  type Warna,
} from "./kelompok-b4-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 4 Sub-Bab B, Tahap 4 Concrete: benda nyata. Seret, tangkap, tebak,     */
/* dan susun di lemari. Semua di klien, tanpa API.                            */
/*  1 Nampan Kue dan Mainan (seret menurut warna)                              */
/*  2 Tangkap Buah Besar dan Kecil (satu-satu)                                 */
/*  3 Tebak Aturan Rahasia (aturan kelompok)                                   */
/*  4 Lemari Dua Aturan (tabel warna dan bentuk)                               */
/* ------------------------------------------------------------------------ */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ------------------------------ Penyortir bersama ------------------------ */

type Kartu = { id: string; item: ItemB };
type Zona = { id: string; nama: string; sub?: string; latar: string };

const kartuDari = (daftar: ItemB[]): Kartu[] => daftar.map((item, i) => ({ id: String(i), item }));

/** Seret atau ketuk tiap benda ke wadah yang cocok. Dipakai permainan 1 dan 4. */
function Penyortir({
  kartu,
  zona,
  zonaBenar,
  salah,
  benarUcap,
  ringkas,
  idSuara,
  akhir,
  panel,
  awalan,
  pendek,
  teks,
  kolom,
  onBeres,
}: {
  kartu: Kartu[];
  zona: Zona[];
  zonaBenar: (k: Kartu) => string;
  salah: (k: Kartu, zonaId: string) => string;
  benarUcap: (k: Kartu) => string;
  ringkas: (isi: Record<string, Kartu[]>) => string;
  idSuara: string;
  akhir: boolean;
  panel: PanelSuara;
  awalan: string;
  pendek: { awal: string; beres: string; suara: string };
  teks: string;
  kolom: string;
  onBeres: () => void;
}) {
  const ucap = useContext(SuaraCtx);
  const [sisa, setSisa] = useState<Kartu[]>(kartu);
  const [isi, setIsi] = useState<Record<string, Kartu[]>>(() => Object.fromEntries(zona.map((z) => [z.id, [] as Kartu[]])));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = sisa.length === 0;
  const suara = panel.suara[idSuara] === true && akhir;
  useBicara(akhir ? suara : beres, ringkas(isi));

  const taruh = (k: Kartu, zid: string) => {
    if (!sisa.some((x) => x.id === k.id)) return;
    if (zonaBenar(k) !== zid) {
      setKeliru(k.id);
      setTerpilih(null);
      setKabar({ teks: salah(k, zid), ok: false });
      return;
    }
    const baru = sisa.filter((x) => x.id !== k.id);
    setSisa(baru);
    setIsi({ ...isi, [zid]: [...isi[zid], k] });
    setTerpilih(null);
    setKeliru(null);
    setKabar(null);
    ucap(benarUcap(k));
    if (baru.length === 0) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara pendek={suara ? pendek.suara : beres ? pendek.beres : pendek.awal} teks={teks} />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[104px] flex-wrap items-end justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {sisa.map((k) => (
            <BendaSeret
              key={k.id}
              id={k.id}
              aktif={!beres}
              label={namaItem(k.item)}
              onKetuk={() => {
                setTerpilih(k.id);
                ucap(namaItem(k.item));
              }}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith(`${awalan}:`)) taruh(k, z.slice(awalan.length + 1));
              }}
              kelas="rounded-2xl"
            >
              <span
                key={`${k.id}-${keliru === k.id ? "x" : "o"}`}
                className={`flex w-[72px] flex-col items-center rounded-2xl px-1 py-1 ${terpilih === k.id ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${keliru === k.id ? "igil-goyang" : ""}`}
              >
                <GambarItem item={{ ...k.item, ukuran: undefined }} kelas="h-14 w-14" />
                <span className="text-center text-[10px] font-black leading-tight text-[#1C01A5]">{namaItem(k.item)}</span>
              </span>
            </BendaSeret>
          ))}
          {beres ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div className={`grid gap-2 ${kolom}`}>
          {zona.map((z) => (
            <button
              key={z.id}
              type="button"
              data-zona={`${awalan}:${z.id}`}
              aria-label={`${z.nama}${z.sub ? ` ${z.sub}` : ""}, berisi ${isi[z.id].length}`}
              onClick={() => {
                if (terpilih) {
                  const k = sisa.find((x) => x.id === terpilih);
                  if (k) taruh(k, z.id);
                } else ucap(`${z.nama}${z.sub ? ` ${z.sub}` : ""}.`);
              }}
              className="igil-tanpa-tepi flex min-h-[112px] flex-col items-center gap-1 rounded-3xl border-4 border-[#1C01A5] px-1 py-2"
              style={{ backgroundColor: z.latar }}
            >
              <span className="text-xl" aria-hidden="true">
                🧺
              </span>
              <span className="text-sm font-black leading-tight text-[#1C01A5]">{z.nama}</span>
              {z.sub ? <span className="text-xs font-black leading-tight text-[#1C01A5]/75">{z.sub}</span> : null}
              <span className="flex flex-wrap justify-center gap-0.5">
                {isi[z.id].map((k) => (
                  <span key={k.id} className="igil-muncul">
                    <GambarItem item={{ ...k.item, ukuran: undefined }} kelas="h-7 w-7" />
                  </span>
                ))}
              </span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-xs font-black text-[#1C01A5]">{isi[z.id].length}</span>
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

const LATAR_WARNA: Record<Warna, string> = {
  merah: "#FDECEC",
  kuning: "#FFF7CC",
  biru: "#E3EEFF",
  cokelat: "#F3D9B8",
  hijau: "#D7F2E0",
  ungu: "#EFE3FA",
  merahmuda: "#FCE4EE",
};

const NAMA_BENTUK_MAINAN: Record<string, string> = { bola: "bola", kotak: "kotak hadiah", topi: "topi pesta" };

/* --------- Permainan 1. Nampan Kue dan Mainan (hlm. 127-128) -------------- */

const RONDE_NAMPAN: { kunci: string; zona: Warna[]; daftar: ItemB[] }[] = [
  {
    kunci: "kue",
    zona: ["cokelat", "hijau"],
    daftar: [{ jenis: "talam" }, { jenis: "cucur" }, { jenis: "lupis" }, { jenis: "brownies" }, { jenis: "risol" }, { jenis: "lapisHijau" }],
  },
  {
    kunci: "mainan",
    zona: ["merah", "kuning", "biru"],
    daftar: [
      { jenis: "topi", warna: "kuning" },
      { jenis: "bola", warna: "merah" },
      { jenis: "kotak", warna: "biru" },
      { jenis: "kotak", warna: "merah" },
      { jenis: "bola", warna: "kuning" },
      { jenis: "topi", warna: "merah" },
    ],
  },
];

function RondeNampan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_NAMPAN[ronde];
  const akhir = ronde === RONDE_NAMPAN.length - 1;
  const zona: Zona[] = d.zona.map((w) => ({ id: w, nama: `Nampan ${NAMA_WARNA[w]}`, latar: LATAR_WARNA[w] }));
  return (
    <Penyortir
      kartu={kartuDari(d.daftar)}
      zona={zona}
      zonaBenar={(k) => warnaItem(k.item)}
      salah={(k, z) => `Lihat warna ${namaItem(k.item).toLowerCase()}. Warnanya ${NAMA_WARNA[warnaItem(k.item)]}, bukan ${NAMA_WARNA[z as Warna]}.`}
      benarUcap={(k) => `${namaItem(k.item)} berwarna ${NAMA_WARNA[warnaItem(k.item)]}.`}
      ringkas={(isi) =>
        `Semua ${d.kunci === "kue" ? "kue" : "mainan"} sudah masuk nampan. ${d.zona.map((w) => `Nampan ${NAMA_WARNA[w]} berisi ${kataK(isi[w].length)}`).join(". ")}.`
      }
      idSuara="b4-nampan"
      akhir={akhir}
      panel={panel}
      awalan="b4n"
      pendek={{
        awal: d.kunci === "kue" ? "Kelompokkan kue menurut warna" : "Kelompokkan mainan menurut warna",
        beres: akhir ? "Ucapkan: isi nampan merah" : "Semua kue sudah rapi!",
        suara: "Hebat!",
      }}
      teks={
        d.kunci === "kue"
          ? "Ada enam kue di meja. Seret setiap kue ke nampan yang warnanya sama, atau ketuk kuenya lalu ketuk nampannya. Ada nampan cokelat dan nampan hijau."
          : "Sekarang ada enam mainan. Seret setiap mainan ke nampan yang warnanya sama. Ada nampan merah, nampan kuning, dan nampan biru. Setelah semua masuk, ucapkan berapa banyak mainan di nampan merah."
      }
      kolom={d.zona.length === 2 ? "grid-cols-2" : "grid-cols-3"}
      onBeres={onBeres}
    />
  );
}

export function LangkahNampan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Nampan Kue dan Mainan"
      warna="#FFE566"
      petunjuk="Kelompokkan benda menurut warnanya. Seret setiap benda ke nampan yang warnanya sama. Pada soal kedua ada tiga nampan. Setelah semua masuk, ucapkan berapa mainan di nampan merah."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-nampan"
      jumlahRonde={RONDE_NAMPAN.length}
      kunciAkhir={3}
      belumSiap="Masukkan semua mainan ke nampan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeNampan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Tangkap Buah Besar dan Kecil (hlm. 129) ----------- */

const URUTAN_BUAH: JenisBendaB[] = ["semangka", "anggur", "melon", "sawo", "semangka", "anggur", "sawo"];

function RondeBuah({ panel, onBeres }: { panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const [indeks, setIndeks] = useState(0);
  const [keranjang, setKeranjang] = useState<{ besar: JenisBendaB[]; kecil: JenisBendaB[] }>({ besar: [], kecil: [] });
  const [keliru, setKeliru] = useState<"besar" | "kecil" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = indeks >= URUTAN_BUAH.length;
  const jenis = URUTAN_BUAH[Math.min(indeks, URUTAN_BUAH.length - 1)];
  const suara = panel.suara["b4-buah"] === true;
  useBicara(beres, `Semua buah sudah masuk keranjang. Keranjang besar berisi ${kataK(keranjang.besar.length)}. Keranjang kecil berisi ${kataK(keranjang.kecil.length)}.`);

  const pilih = (u: "besar" | "kecil") => {
    if (beres) return;
    const benar = ATRIBUT_B[jenis].ukuran === u;
    if (!benar) {
      setKeliru(u);
      setKabar({ teks: "Bandingkan dengan kotak putus-putus. Buahnya lebih besar dari kotak, atau lebih kecil?", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setKeranjang((k) => ({ ...k, [u]: [...k[u], jenis] }));
    ucap(`${ATRIBUT_B[jenis].nama} ukurannya ${u}.`);
    if (indeks === URUTAN_BUAH.length - 1) {
      letusan.picu();
      onBeres();
    }
    setIndeks((n) => n + 1);
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? "Ucapkan: isi keranjang kecil" : "Besar atau kecil?"}
        teks="Buah datang satu per satu. Bandingkan buah dengan kotak putus-putus. Kalau buahnya lebih besar dari kotak, masukkan ke keranjang besar. Kalau lebih kecil, masukkan ke keranjang kecil. Setelah semua masuk, ucapkan berapa banyak buah di keranjang kecil."
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[156px] items-end justify-center gap-5 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <span className="flex flex-col items-center gap-1">
            <span aria-hidden="true" className="block h-16 w-16 rounded-lg border-4 border-dashed border-[#1C01A5]/50 bg-[#F5F3FF]" />
            <span className="text-[10px] font-black text-[#1C01A5]/70">Kotak pembanding</span>
          </span>
          {beres ? (
            <span className="pb-6 text-4xl" aria-hidden="true">
              ✅
            </span>
          ) : (
            <span key={indeks} className="igil-muncul flex flex-col items-center gap-1">
              <BendaB jenis={jenis} kelas={ATRIBUT_B[jenis].ukuran === "besar" ? "h-28 w-28" : "h-12 w-12"} />
              <span className="text-sm font-black text-[#1C01A5]">{ATRIBUT_B[jenis].nama}</span>
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(["besar", "kecil"] as const).map((u) => (
            <button
              key={`${u}-${keliru === u ? "x" : "o"}`}
              type="button"
              aria-label={`Keranjang ${u}, berisi ${keranjang[u].length}`}
              disabled={beres}
              onClick={() => pilih(u)}
              className={`igil-tanpa-tepi flex min-h-[112px] flex-col items-center gap-1 rounded-3xl border-4 border-[#1C01A5] px-1 py-2 ${u === "besar" ? "bg-[#D7F2E0]" : "bg-[#FFF7CC]"} ${keliru === u ? "igil-goyang" : ""}`}
            >
              <span className="text-xl" aria-hidden="true">
                🧺
              </span>
              <span className="text-base font-black text-[#1C01A5]">{cap(u)}</span>
              <span className="flex flex-wrap justify-center gap-0.5">
                {keranjang[u].map((j, i) => (
                  <span key={`${j}-${i}`} className="igil-muncul">
                    <BendaB jenis={j} kelas={u === "besar" ? "h-9 w-9" : "h-6 w-6"} />
                  </span>
                ))}
              </span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-xs font-black text-[#1C01A5]">{keranjang[u].length}</span>
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBuah({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tangkap Buah Besar dan Kecil"
      warna="#FFE566"
      petunjuk="Buah datang satu per satu. Bandingkan dengan kotak putus-putus, lalu masukkan ke keranjang besar atau keranjang kecil. Setelah semua masuk, ucapkan berapa buah di keranjang kecil."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-buah"
      jumlahRonde={1}
      kunciAkhir={4}
      belumSiap="Masukkan semua buah ke keranjang dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(_, beres) => <RondeBuah panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Tebak Aturan Rahasia ------------------------------ */

type SoalAturan = { masuk: ItemB[]; bukan: ItemB[]; aturan: Aturan; alasan: string };

const RONDE_ATURAN: SoalAturan[] = [
  {
    masuk: [
      { jenis: "bola", warna: "merah", ukuran: "besar" },
      { jenis: "kotak", warna: "merah", ukuran: "kecil" },
      { jenis: "topi", warna: "merah", ukuran: "besar" },
    ],
    bukan: [
      { jenis: "bola", warna: "biru", ukuran: "besar" },
      { jenis: "topi", warna: "kuning", ukuran: "kecil" },
    ],
    aturan: "warna",
    alasan: "Semua anggota kelompok berwarna merah.",
  },
  {
    masuk: [
      { jenis: "bola", warna: "merah", ukuran: "besar" },
      { jenis: "bola", warna: "biru", ukuran: "kecil" },
      { jenis: "bola", warna: "kuning", ukuran: "besar" },
    ],
    bukan: [
      { jenis: "kotak", warna: "merah", ukuran: "besar" },
      { jenis: "topi", warna: "biru", ukuran: "kecil" },
    ],
    aturan: "bentuk",
    alasan: "Semua anggota kelompok berbentuk bola.",
  },
  {
    masuk: [
      { jenis: "bola", warna: "merah", ukuran: "besar" },
      { jenis: "kotak", warna: "biru", ukuran: "besar" },
      { jenis: "topi", warna: "hijau", ukuran: "besar" },
      { jenis: "bola", warna: "kuning", ukuran: "besar" },
    ],
    bukan: [
      { jenis: "bola", warna: "merah", ukuran: "kecil" },
      { jenis: "kotak", warna: "biru", ukuran: "kecil" },
    ],
    aturan: "ukuran",
    alasan: "Semua anggota kelompok berukuran besar.",
  },
];

function RondeAturan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_ATURAN[ronde];
  const akhir = ronde === RONDE_ATURAN.length - 1;
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<Aturan | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["b4-aturan"] === true && akhir;
  useBicara(akhir ? suara : benar, `Aturannya ${NAMA_ATURAN[d.aturan]}. ${d.alasan}`);

  const pilih = (a: Aturan) => {
    if (benar) return;
    if (a === d.aturan) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(a);
      setKabar({ teks: `${cap(NAMA_ATURAN[a])}nya tidak sama semua. Lihat kelompok yang masuk, lalu coba aturan yang lain.`, ok: false });
    }
  };

  const baris = (daftar: ItemB[], judul: string, gaya: string) => (
    <div className={`space-y-1 rounded-3xl border-4 px-2 py-2 ${gaya}`}>
      <p className="text-center text-sm font-black text-[#1C01A5]">{judul}</p>
      <div className="flex flex-wrap items-end justify-center gap-2">
        {daftar.map((it, i) => (
          <GambarItem key={i} item={it} kelas={KELAS_UKURAN[it.ukuran ?? "besar"]} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat! Ucapkan banyaknya." : benar ? (akhir ? "Ucapkan: banyak anggota kelompok" : "Aturannya ketemu!") : "Apa aturan rahasianya?"}
        teks={`Benda di kotak hijau masuk kelompok. Benda di kotak merah tidak masuk. Apa aturan rahasia kelompok itu? Pilih bentuk, warna, atau ukuran.${akhir ? " Setelah itu, ucapkan berapa banyak benda yang masuk kelompok." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        {baris(d.masuk, "✅ Masuk kelompok", "border-[#7FCB96] bg-[#E8F7EE]")}
        {baris(d.bukan, "❌ Tidak masuk", "border-[#E98989] bg-[#FDECEC]")}
        <div className="grid grid-cols-3 gap-2">
          {(["bentuk", "warna", "ukuran"] as Aturan[]).map((a) => (
            <button
              key={`${a}-${keliru === a ? "x" : "o"}`}
              type="button"
              aria-label={`Aturan ${a}`}
              disabled={benar}
              onClick={() => pilih(a)}
              className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${
                benar && a === d.aturan ? "ring-4 ring-[#7FCB96]" : ""
              } ${keliru === a ? "igil-goyang" : ""}`}
            >
              {cap(a)}
            </button>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahAturan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tebak Aturan Rahasia"
      warna="#FFE566"
      petunjuk="Benda di kotak hijau masuk kelompok, benda di kotak merah tidak masuk. Tebak aturan rahasianya: bentuk, warna, atau ukuran. Pada soal terakhir, ucapkan berapa benda yang masuk kelompok."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-aturan"
      jumlahRonde={RONDE_ATURAN.length}
      kunciAkhir={4}
      belumSiap="Tebak aturannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeAturan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Lemari Dua Aturan --------------------------------- */

const RONDE_LEMARI: { warna: [Warna, Warna]; bentuk: [JenisBendaB, JenisBendaB] }[] = [
  { warna: ["merah", "biru"], bentuk: ["bola", "kotak"] },
  { warna: ["kuning", "hijau"], bentuk: ["topi", "bola"] },
];

function RondeLemari({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_LEMARI[ronde];
  const akhir = ronde === RONDE_LEMARI.length - 1;
  const zona: Zona[] = d.warna.flatMap((w) =>
    d.bentuk.map((b) => ({
      id: `${w}-${b}`,
      nama: cap(NAMA_WARNA[w]),
      sub: cap(NAMA_BENTUK_MAINAN[b]),
      latar: LATAR_WARNA[w],
    }))
  );
  const daftar: ItemB[] = [
    { jenis: d.bentuk[1], warna: d.warna[1] },
    { jenis: d.bentuk[0], warna: d.warna[0] },
    { jenis: d.bentuk[0], warna: d.warna[1] },
    { jenis: d.bentuk[1], warna: d.warna[0] },
  ];
  return (
    <Penyortir
      kartu={kartuDari(daftar)}
      zona={zona}
      zonaBenar={(k) => `${warnaItem(k.item)}-${k.item.jenis}`}
      salah={(k) => `${namaItem(k.item)}. Periksa dua ciri sekaligus: warnanya dan bentuknya. Kotak itu belum cocok.`}
      benarUcap={(k) => `${namaItem(k.item)} berwarna ${NAMA_WARNA[warnaItem(k.item)]} dan berbentuk ${NAMA_BENTUK_MAINAN[k.item.jenis]}.`}
      ringkas={() => `Lemari sudah rapi. Setiap mainan punya kotaknya sendiri, menurut warna dan bentuk.`}
      idSuara="b4-lemari"
      akhir={akhir}
      panel={panel}
      awalan="b4l"
      pendek={{ awal: "Cocokkan warna dan bentuk", beres: akhir ? `Ucapkan: mainan warna ${NAMA_WARNA[d.warna[1]]}` : "Lemarinya rapi!", suara: "Hebat!" }}
      teks={`Lemari ini punya empat kotak. Setiap kotak punya dua ciri: warna dan bentuk. Letakkan setiap mainan di kotak yang cocok dengan dua cirinya sekaligus. Seret mainannya, atau ketuk mainannya lalu ketuk kotaknya.${akhir ? ` Setelah itu, ucapkan berapa mainan yang berwarna ${NAMA_WARNA[d.warna[1]]}.` : ""}`}
      kolom="grid-cols-2"
      onBeres={onBeres}
    />
  );
}

export function LangkahLemari({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Lemari Dua Aturan"
      warna="#FFE566"
      petunjuk="Setiap kotak di lemari punya dua ciri: warna dan bentuk. Letakkan setiap mainan di kotak yang cocok dengan dua cirinya. Setelah semua rapi, ucapkan berapa mainan yang berwarna hijau."
      speakGuru={speakGuru}
      panel={panel}
      id="b4-lemari"
      jumlahRonde={RONDE_LEMARI.length}
      kunciAkhir={2}
      belumSiap="Rapikan semua mainan di lemari dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLemari ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}