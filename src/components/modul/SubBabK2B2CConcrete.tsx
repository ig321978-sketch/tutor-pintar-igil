"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { Burung, KotakSoal } from "./dasar-k2b2";
import { Berhasil, PilihanAngka, TOMBOL_BESAR } from "./permainan-k2b2";
import {
  NAMA_BONEKA,
  RONDE_BONEKA_C,
  RONDE_BURUNG_C,
  RONDE_DONAT_C,
  RONDE_JERUK_C,
  URUTAN_KATA,
  bilanganPembanding,
  jawabKataBurung,
  jerukSemula,
  jumlahBanding,
  opsiB2,
  pasanganSepuluh,
  tanyaKataBurung,
} from "./data-k2b2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab C, Tahap 4 Concrete: benda nyata untuk soal cerita.   */
/*  1 Burung Kata Kunci (lebihnya, kurangnya, selisih, jumlah pada burung)    */
/*  2 Meja Donat (seret donat sampai lebih atau kurang dari piring lain)      */
/*  3 Keranjang Jeruk Halim (kembalikan jeruk untuk mencari bilangan awal)    */
/*  4 Boneka Tiga Sahabat (gabungkan dua kelompok dulu, lalu yang ketiga)     */
/* ------------------------------------------------------------------------ */

type Ronde = { ronde: number; panel: PanelSuara; onBeres: () => void };

const IKON = { donat: "🍩", jeruk: "🍊", boneka: "🧸" } as const;

function Ikon({ jenis, n, kelas = "text-2xl", sorot = [] }: { jenis: keyof typeof IKON; n: number; kelas?: string; sorot?: number[] }) {
  return (
    <span className={`flex flex-wrap items-center justify-center gap-0.5 leading-none ${kelas}`} role="img" aria-label={`${n} ${jenis}`}>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className={sorot.includes(i) ? "igil-denyut rounded-lg bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : ""}>
          {IKON[jenis]}
        </span>
      ))}
    </span>
  );
}

/* --------- Permainan 1. Burung Kata Kunci --------------------------------- */

function RondeBurung({ ronde, panel, onBeres }: Ronde) {
  const r = RONDE_BURUNG_C[ronde];
  const akhir = ronde === RONDE_BURUNG_C.length - 1;
  const [i, setI] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const selesai = i >= URUTAN_KATA.length;
  const kata = URUTAN_KATA[Math.min(i, URUTAN_KATA.length - 1)];
  const kunci = jawabKataBurung(kata, r);
  const suara = panel.suara["k2b2c-burung"] === true && akhir;
  useBicara(akhir ? suara : selesai, `Burung hijau ${sebut(r.h)} dan burung merah ${sebut(r.m)}. Selisihnya ${sebut(r.m - r.h)}. Jumlahnya ${sebut(r.h + r.m)}.`);

  const jawab = (n: number) => {
    if (selesai) return;
    if (n !== kunci) {
      setKeliru(n);
      setKabar({
        teks:
          kata === "jumlah"
            ? "Jumlah berarti semua burung digabung. Hitung burung hijau dan burung merah."
            : "Lihat burung merah yang menyala dan tidak punya pasangan. Hitung banyaknya.",
        ok: false,
      });
      return;
    }
    setKeliru(null);
    setKabar(null);
    const baru = i + 1;
    setI(baru);
    if (baru >= URUTAN_KATA.length) {
      letusan.picu();
      onBeres();
    }
  };

  const sisaMerah = Array.from({ length: r.m - r.h }, (_, j) => r.h + j);
  const sorotMerah = selesai ? [] : kata === "jumlah" ? Array.from({ length: r.m }, (_, j) => j) : sisaMerah;

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : selesai ? (akhir ? "Ucapkan: jumlah burung" : "Kata kuncimu tepat!") : `Kata kunci: ${kata}`}
        teks={`Burung hijau ada ${sebut(r.h)} ekor dan burung merah ada ${sebut(r.m)} ekor. Burung hijau dipasangkan dengan burung merah. Jawab empat pertanyaan tentang kata kunci lebihnya, kurangnya, selisih, dan jumlah. Lihat burung yang menyala.${akhir ? " Terakhir, ucapkan jumlah semua burung." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="list" aria-label="Empat kata kunci">
          {URUTAN_KATA.map((k, j) => (
            <span key={k} role="listitem" className={`rounded-full border-2 px-3 py-0.5 text-sm font-black ${j < i ? "border-[#16A34A] bg-[#DCFCE7] text-[#14532D]" : j === i ? "igil-denyut border-[#F0AB00] bg-[#FFF7CC] text-[#1C01A5] ring-2 ring-[#F0AB00]" : "border-[#1C01A5]/30 bg-white text-[#1C01A5]/60"}`}>
              {j < i ? "✔ " : ""}
              {k}
            </span>
          ))}
        </div>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2" role="group" aria-label={`Burung merah ${r.m} dan burung hijau ${r.h}`}>
          <div className="grid grid-cols-5 gap-x-1 gap-y-2">
            {Array.from({ length: r.m }, (_, j) => (
              <div key={j} className="flex flex-col items-center">
                <span className={`rounded-lg p-0.5 ${sorotMerah.includes(j) ? "igil-denyut bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : ""}`}>
                  <Burung warna="merah" kelas="h-8 w-9" />
                </span>
                <span className={`my-0.5 block h-3 w-1 rounded-full ${j < r.h ? "bg-[#1C01A5]" : "bg-transparent"}`} aria-hidden="true" />
                {j < r.h ? (
                  <span className={`rounded-lg p-0.5 ${kata === "jumlah" && !selesai ? "igil-denyut bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : ""}`}>
                    <Burung warna="hijau" kelas="h-8 w-9" />
                  </span>
                ) : (
                  <span className="block h-9 w-10 rounded-lg border-2 border-dashed border-[#1C01A5]/25" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-1 text-center text-xs font-black text-[#1C01A5]/80">Atas: burung merah ({r.m}). Bawah: burung hijau ({r.h}).</p>
        </div>
        {!selesai ? (
          <>
            <KotakSoal>{tanyaKataBurung(kata, r)}</KotakSoal>
            <PilihanAngka key={i} opsi={opsiB2(kunci)} keliru={keliru} onPilih={jawab} />
          </>
        ) : (
          <Berhasil>
            Lebihnya {r.m - r.h}, kurangnya {r.m - r.h}, selisih {r.m - r.h}, jumlah {akhir && !suara ? "?" : r.h + r.m}.
          </Berhasil>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBurungK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_BURUNG_C[RONDE_BURUNG_C.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Burung Kata Kunci"
      warna="#BBF7D0"
      petunjuk="Burung hijau dipasangkan dengan burung merah. Jawab empat pertanyaan: lebihnya, kurangnya, selisih, dan jumlah. Lihat burung yang menyala untuk membantumu menghitung. Pada soal terakhir, ucapkan jumlah semua burung."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-burung"
      jumlahRonde={RONDE_BURUNG_C.length}
      kunciAkhir={akhir.h + akhir.m}
      belumSiap="Jawab keempat pertanyaan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBurung ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Meja Donat ---------------------------------------- */

function RondeDonat({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const r = RONDE_DONAT_C[ronde];
  const target = bilanganPembanding(r);
  const jumlah = jumlahBanding(r);
  const akhir = ronde === RONDE_DONAT_C.length - 1;
  const kata = r.jenis === "lebih" ? "lebihnya" : "kurangnya";
  const [n, setN] = useState(0);
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2c-donat"] === true && akhir;
  useBicara(akhir ? suara : beres, `${r.pembanding} punya ${sebut(r.d)} ${kata} dari ${r.acuan}, jadi ${r.pembanding} punya ${sebut(target)} donat. Jumlah donat keduanya ${sebut(jumlah)}.`);

  const tambah = (zona?: string | null) => {
    if (tahap !== 0 || beres) return;
    if (zona !== undefined && zona !== "k2b2c-piring") return;
    if (n >= 20) return;
    setN(n + 1);
    setKabar(null);
    ucap(sebut(n + 1));
  };
  const kurangi = () => {
    if (tahap !== 0 || n === 0) return;
    setN(n - 1);
    setKabar(null);
  };
  const periksa = () => {
    if (n === target) {
      setTahap(1);
      setKabar(null);
      ucap(`Tepat! ${r.pembanding} punya ${sebut(target)} donat. Sekarang cari jumlah donat ${r.acuan} dan ${r.pembanding}.`);
      return;
    }
    const selisihKini = Math.abs(r.a - n);
    setKabar({
      teks: `Piring ${r.pembanding} berisi ${sebut(n)} donat, dan piring ${r.acuan} berisi ${sebut(r.a)}. Bedanya ${sebut(selisihKini)}, padahal harus ${sebut(r.d)} ${kata}. ${r.jenis === "lebih" ? "Tambah donat sampai bedanya pas." : n > target ? "Terlalu banyak. Ketuk donat di piring untuk mengambilnya." : "Masih kurang banyak. Tambah donat."}`,
      ok: false,
    });
  };
  const jawab = (x: number) => {
    if (x === jumlah) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(x);
      setKabar({ teks: `Jumlah berarti digabung. Tambahkan ${sebut(r.a)} dan ${sebut(target)}.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlah donat" : "Mejamu tepat!") : tahap === 1 ? "Berapa jumlah donatnya?" : `${r.pembanding}: ${r.d} ${kata}`}
        teks={`${r.acuan} punya ${sebut(r.a)} donat. ${r.pembanding} punya ${sebut(r.d)} ${kata} dari donat ${r.acuan}. Seret donat dari stok ke piring ${r.pembanding} sampai banyaknya tepat, atau ketuk stoknya. Ketuk donat di piring untuk mengambilnya. Lalu tekan periksa. Setelah itu cari jumlah donat keduanya.${akhir ? " Terakhir, ucapkan jumlahnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {r.acuan}: {r.a} donat. {r.pembanding}: {r.d} <mark className="rounded bg-[#FFE566] px-1 text-[#1C01A5]">{kata}</mark>.
        </KotakSoal>
        <div className="rounded-3xl border-4 border-[#2563EB] bg-[#EFF6FF] px-2 py-2" role="group" aria-label={`Piring ${r.acuan} berisi ${r.a} donat`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#1E3A8A]">
            <span>🍽️ Piring {r.acuan}</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{r.a}</span>
          </p>
          <Ikon jenis="donat" n={r.a} kelas="text-xl" />
        </div>
        <div data-zona="k2b2c-piring" className="rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2" role="group" aria-label={`Piring ${r.pembanding} berisi ${n} donat`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#831843]">
            <span>🍽️ Piring {r.pembanding}</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{n}</span>
          </p>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: n }, (_, i) => (
              <button key={i} type="button" aria-label={`Ambil donat ke-${i + 1} dari piring`} onClick={kurangi} disabled={tahap !== 0} className="igil-tanpa-tepi igil-muncul text-xl leading-none">
                🍩
              </button>
            ))}
            {n === 0 ? <span className="text-sm font-black text-[#831843]/70">Seret donat ke sini</span> : null}
          </div>
        </div>
        {tahap === 0 ? (
          <>
            <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <span className="text-sm font-black text-[#1C01A5]">Stok donat:</span>
              <BendaSeret id="stok" label="Donat dari stok, seret ke piring" onKetuk={() => tambah()} onLepas={(_, x, y) => tambah(zonaDi(x, y) ?? null)} kelas="rounded-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-3xl">🍩</span>
              </BendaSeret>
            </div>
            <button type="button" onClick={periksa} disabled={n === 0} className={`${TOMBOL_BESAR} w-full`}>
              ✔ Periksa
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {r.pembanding} punya {target} donat. Berapa jumlah donat {r.acuan} dan {r.pembanding}?
            </p>
            {!beres ? <PilihanAngka opsi={opsiB2(jumlah)} keliru={keliru} onPilih={jawab} /> : null}
          </div>
        )}
        {beres ? (
          <Berhasil>
            {r.a} {r.jenis === "lebih" ? "+" : "−"} {r.d} = {target}. Jumlah: {r.a} + {target} = {akhir && !suara ? "?" : jumlah}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahDonatK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_DONAT_C[RONDE_DONAT_C.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Meja Donat"
      warna="#FBCFE8"
      petunjuk="Seret donat ke piring tokoh kedua sampai banyaknya tepat lebih atau kurang dari piring pertama. Lalu tekan periksa. Setelah itu pilih jumlah donat kedua tokoh. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-donat"
      jumlahRonde={RONDE_DONAT_C.length}
      kunciAkhir={jumlahBanding(akhir)}
      belumSiap="Atur donat dan pilih jumlahnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDonat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Keranjang Jeruk Halim ----------------------------- */

function RondeJeruk({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const r = RONDE_JERUK_C[ronde];
  const semula = jerukSemula(r);
  const akhir = ronde === RONDE_JERUK_C.length - 1;
  const [kembali, setKembali] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2c-jeruk"] === true && akhir;
  const semua = kembali >= r.diberi;
  useBicara(akhir ? suara : beres, `Jeruk Halim sebelumnya ada ${sebut(semula)}. Titik-titik dikurangi ${sebut(r.diberi)} sama dengan ${sebut(r.sisa)}, jadi ${sebut(r.sisa)} ditambah ${sebut(r.diberi)} sama dengan ${sebut(semula)}.`);

  const kembalikan = (zona?: string | null) => {
    if (semua || beres) return;
    if (zona !== undefined && zona !== "k2b2c-keranjang") return;
    const n = kembali + 1;
    setKembali(n);
    setKabar(null);
    ucap(sebut(r.sisa + n));
  };
  const jawab = (n: number) => {
    if (n === semula) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Hitung jeruk di keranjang sekarang: ${sebut(r.sisa)} ditambah ${sebut(r.diberi)} yang dikembalikan.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jeruk semula" : "Jeruk semulamu tepat!") : semua ? "Berapa jeruk semula?" : "Kembalikan jeruk ke keranjang"}
        teks={`Halim memberikan ${sebut(r.diberi)} jeruk kepada Lili. Sekarang jeruk Halim tersisa ${sebut(r.sisa)}. Berapa jeruk Halim sebelum diberikan? Seret jeruk dari piring Lili kembali ke keranjang Halim, satu per satu, atau ketuk jerukya. Dengarkan hitungannya. Lalu pilih jeruk semula.${akhir ? " Terakhir, ucapkan banyak jeruk semula." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          … − {r.diberi} = {r.sisa}
        </KotakSoal>
        <div data-zona="k2b2c-keranjang" className="rounded-3xl border-4 border-[#EA580C] bg-[#FFF7ED] px-2 py-2" role="group" aria-label={`Keranjang Halim berisi ${r.sisa + kembali} jeruk`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#9A3412]">
            <span>🧺 Keranjang Halim</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{r.sisa + kembali}</span>
          </p>
          <Ikon jenis="jeruk" n={r.sisa + kembali} kelas="text-xl" sorot={Array.from({ length: kembali }, (_, i) => r.sisa + i)} />
        </div>
        <div className="rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2" role="group" aria-label={`Piring Lili berisi ${r.diberi - kembali} jeruk`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#831843]">
            <span>🍽️ Piring Lili</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{r.diberi - kembali}</span>
          </p>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-1">
            {Array.from({ length: r.diberi - kembali }, (_, i) => (
              <BendaSeret key={`${kembali}-${i}`} id={`jeruk-${i}`} label="Jeruk Lili, kembalikan ke keranjang Halim" onKetuk={() => kembalikan()} onLepas={(_, x, y) => kembalikan(zonaDi(x, y) ?? null)} kelas="rounded-xl">
                <span className="block text-3xl leading-none">🍊</span>
              </BendaSeret>
            ))}
            {semua ? <span className="text-sm font-black text-[#831843]/70">Semua jeruk sudah kembali</span> : null}
          </div>
        </div>
        {semua && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {r.sisa} + {r.diberi} = ? Berapa jeruk Halim semula?
            </p>
            <PilihanAngka opsi={opsiB2(semula)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            … − {r.diberi} = {r.sisa}, maka {r.sisa} + {r.diberi} = {akhir && !suara ? "?" : semula}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahJerukK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_JERUK_C[RONDE_JERUK_C.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Keranjang Jeruk Halim"
      warna="#FDE68A"
      petunjuk="Seret jeruk dari piring Lili kembali ke keranjang Halim, satu per satu. Dengarkan hitungannya. Lalu pilih banyak jeruk semula. Untuk mencari bilangan awal, kita balikkan kejadiannya. Pada soal terakhir, ucapkan banyak jeruk semula."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-jeruk"
      jumlahRonde={RONDE_JERUK_C.length}
      kunciAkhir={jerukSemula(akhir)}
      belumSiap="Kembalikan semua jeruk dan pilih jawabannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJeruk ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Boneka Tiga Sahabat ------------------------------- */

const WARNA_SAHABAT = [
  { tepi: "#2563EB", isi: "#EFF6FF" },
  { tepi: "#DB2777", isi: "#FDF2F8" },
  { tepi: "#16A34A", isi: "#F0FDF4" },
];

function RondeBoneka({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const kelompok = RONDE_BONEKA_C[ronde];
  const total = kelompok[0] + kelompok[1] + kelompok[2];
  const sepuluh = pasanganSepuluh(kelompok);
  const akhir = ronde === RONDE_BONEKA_C.length - 1;
  const [pilih, setPilih] = useState<number[]>([]);
  const [tahap, setTahap] = useState<0 | 1 | 2 | 3>(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2c-boneka"] === true && akhir;
  const [p, q] = pilih;
  const ketiga = pilih.length === 2 ? [0, 1, 2].find((x) => !pilih.includes(x))! : -1;
  const jumlahDua = pilih.length === 2 ? kelompok[p] + kelompok[q] : 0;
  const kalimatAkhir = pilih.length === 2 ? `${sebut(kelompok[p])} ditambah ${sebut(kelompok[q])} sama dengan ${sebut(jumlahDua)}. ${sebut(jumlahDua)} ditambah ${sebut(kelompok[ketiga])} sama dengan ${sebut(total)}. Jumlah semua boneka ${sebut(total)}.` : "";
  useBicara(akhir ? suara && beres : beres, kalimatAkhir);

  const ketukKelompok = (i: number) => {
    if (tahap !== 0) return;
    const baru = pilih.includes(i) ? pilih.filter((x) => x !== i) : [...pilih, i].slice(-2);
    setPilih(baru);
    setKabar(null);
    if (baru.length === 2) {
      setTahap(1);
      const s = kelompok[baru[0]] + kelompok[baru[1]];
      ucap(s === 10 ? "Dua kelompok ini berjumlah sepuluh. Sahabat sepuluh!" : "Dua kelompok digabung. Berapa jumlahnya?");
    }
  };
  const ulang = () => {
    setPilih([]);
    setTahap(0);
    setKeliru(null);
    setKabar(null);
  };
  const jawabDua = (n: number) => {
    if (n === jumlahDua) {
      setKeliru(null);
      setKabar(null);
      setTahap(2);
      ucap(`${sebut(kelompok[p])} ditambah ${sebut(kelompok[q])} sama dengan ${sebut(jumlahDua)}. Sekarang gabungkan dengan kelompok ketiga.`);
    } else {
      setKeliru(n);
      setKabar({ teks: `Jumlahkan ${sebut(kelompok[p])} dan ${sebut(kelompok[q])}. Hitung maju dari bilangan yang lebih besar.`, ok: false });
    }
  };
  const jawabTotal = (n: number) => {
    if (n === total) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Tambahkan ${sebut(jumlahDua)} dengan ${sebut(kelompok[ketiga])}.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlah semua" : "Gabunganmu tepat!") : tahap === 0 ? "Pilih dua kelompok" : tahap === 1 ? "Berapa jumlah keduanya?" : tahap === 2 ? "Gabung dengan kelompok ketiga" : "Berapa jumlah semuanya?"}
        teks={`${NAMA_BONEKA[0]} membawa ${sebut(kelompok[0])} boneka, ${NAMA_BONEKA[1]} membawa ${sebut(kelompok[1])}, dan ${NAMA_BONEKA[2]} membawa ${sebut(kelompok[2])}. Ketuk dua kelompok untuk digabung dulu. Pilih jumlah keduanya, lalu gabungkan dengan kelompok ketiga. Carilah dua kelompok yang berjumlah sepuluh supaya lebih mudah.${akhir ? " Terakhir, ucapkan jumlah semua boneka." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {kelompok[0]} + {kelompok[1]} + {kelompok[2]} = ?
        </KotakSoal>
        <div className="grid gap-2">
          {kelompok.map((n, i) => {
            const gabungan = pilih.includes(i) && pilih.length === 2 && tahap >= 2;
            return (
              <button
                key={i}
                type="button"
                aria-label={`${NAMA_BONEKA[i]} ${n} boneka${pilih.includes(i) ? ", dipilih" : ""}`}
                aria-pressed={pilih.includes(i)}
                disabled={tahap !== 0}
                onClick={() => ketukKelompok(i)}
                className={`rounded-3xl border-4 px-2 py-1.5 text-left ${pilih.includes(i) ? "ring-4 ring-[#F0AB00]" : ""} ${gabungan ? "opacity-50" : ""}`}
                style={{ borderColor: WARNA_SAHABAT[i].tepi, backgroundColor: WARNA_SAHABAT[i].isi }}
              >
                <span className="flex items-center justify-between text-xs font-black text-[#1C01A5]">
                  <span>{NAMA_BONEKA[i]}</span>
                  <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm">{n}</span>
                </span>
                <Ikon jenis="boneka" n={n} kelas="text-xl" />
              </button>
            );
          })}
        </div>
        {tahap === 0 ? (
          <p className="rounded-2xl border-4 border-dashed border-[#1C01A5]/40 bg-white px-2 py-1 text-center text-sm font-black text-[#1C01A5]">
            Ketuk dua kelompok. Petunjuk: cari dua kelompok yang berjumlah 10.
          </p>
        ) : null}
        {tahap === 1 ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {NAMA_BONEKA[p]} + {NAMA_BONEKA[q]}: {kelompok[p]} + {kelompok[q]} = ?
              {sepuluh && jumlahDua === 10 ? " ⭐ Sahabat sepuluh!" : ""}
            </p>
            <PilihanAngka opsi={opsiB2(jumlahDua)} keliru={keliru} onPilih={jawabDua} />
            <button type="button" onClick={ulang} className="mx-auto block text-sm font-black text-[#1C01A5] underline">
              ↩ Pilih kelompok lain
            </button>
          </div>
        ) : null}
        {tahap === 2 ? (
          <button type="button" onClick={() => { setTahap(3); setKeliru(null); }} className={`${TOMBOL_BESAR} w-full`}>
            ➕ Gabung {jumlahDua} dengan {NAMA_BONEKA[ketiga]} ({kelompok[ketiga]})
          </button>
        ) : null}
        {tahap === 3 && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {jumlahDua} + {kelompok[ketiga]} = ? Berapa jumlah semua boneka?
            </p>
            <PilihanAngka opsi={opsiB2(total)} keliru={keliru} onPilih={jawabTotal} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {kelompok[p]} + {kelompok[q]} = {jumlahDua}, lalu {jumlahDua} + {kelompok[ketiga]} = {akhir && !suara ? "?" : total}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBonekaK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_BONEKA_C[RONDE_BONEKA_C.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Boneka Tiga Sahabat"
      warna="#C7D2FE"
      petunjuk="Ketuk dua kelompok boneka untuk digabung dulu, lalu pilih jumlah keduanya. Setelah itu gabungkan dengan kelompok ketiga dan pilih jumlah semuanya. Cari dua kelompok yang berjumlah sepuluh supaya lebih mudah. Pada soal terakhir, ucapkan jumlah semua boneka."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-boneka"
      jumlahRonde={RONDE_BONEKA_C.length}
      kunciAkhir={akhir[0] + akhir[1] + akhir[2]}
      belumSiap="Gabungkan semua kelompok dan pilih jumlahnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBoneka ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
