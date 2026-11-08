"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { KumpulanBenda } from "./perbandingan-d5-dasar";
import { Donat, kalimatSelisih } from "./selisih-a6-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 6 Sub-Bab A, Tahap 4 Concrete: benda nyata. Anak menaruh donat di      */
/* piring, menyamakan dua kelompok, membariskan anak, dan melengkapi kalimat  */
/* lebihnya, kurangnya, dan beda.                                             */
/*  1 Donat di Piring (seret benda ke piring, lihat sisanya)                  */
/*  2 Samakan Kelompok (tambah atau ambil sampai sama banyak)                 */
/*  3 Dua Barisan Anak (seret anak ke barisannya, bandingkan)                 */
/*  4 Kalimat Selisih (hitung beda, seret kartu kata ke kalimat)              */
/* ------------------------------------------------------------------------ */

/** Benda untuk permainan. `donat` dan `donat-coklat` digambar, selain itu berupa emoji. */
function Ikon({ jenis, kelas }: { jenis: string; kelas: string }) {
  if (jenis === "donat") return <Donat kelas={kelas} />;
  if (jenis === "donat-coklat") return <Donat coklat kelas={kelas} />;
  return (
    <span className={`flex items-center justify-center leading-none ${kelas}`} aria-hidden="true">
      {jenis}
    </span>
  );
}

type Kelompok = { nama: string; n: number; ikon: string };

/* --------- Permainan 1. Donat di Piring ----------------------------------- */

const RONDE_PIRING: { atas: Kelompok; bawah: Kelompok }[] = [
  { atas: { nama: "donat Ibu", n: 7, ikon: "donat" }, bawah: { nama: "donat Tika", n: 6, ikon: "donat-coklat" } },
  { atas: { nama: "bunga", n: 5, ikon: "🌸" }, bawah: { nama: "kupu-kupu", n: 7, ikon: "🦋" } },
  { atas: { nama: "pesawat", n: 9, ikon: "✈️" }, bawah: { nama: "mobil-mobilan", n: 6, ikon: "🚗" } },
];

function RondePiring({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { atas, bawah } = RONDE_PIRING[ronde];
  const akhir = ronde === RONDE_PIRING.length - 1;
  const d = Math.abs(atas.n - bawah.n);
  const lebih = atas.n > bawah.n ? atas : bawah;
  const kurang = atas.n > bawah.n ? bawah : atas;
  const [slot, setSlot] = useState<(number | null)[]>(() => Array.from({ length: atas.n }, () => null));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [jawabSiapa, setJawabSiapa] = useState(false);
  const [salahSiapa, setSalahSiapa] = useState<string | null>(null);
  const [salahSelisih, setSalahSelisih] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const dipakai = slot.filter((v) => v !== null).length;
  const selesaiPasang = dipakai === Math.min(atas.n, bawah.n);
  const suara = panel.suara["a6-piring"] === true && akhir;
  const tray = Array.from({ length: bawah.n }, (_, i) => i).filter((i) => !slot.includes(i));
  const kecil = atas.n > 8 || bawah.n > 8;
  const ukuran = kecil ? "h-7 w-7 text-[22px]" : "h-8 w-8 text-2xl";
  useBicara(akhir ? suara : beres, kalimatSelisih(lebih.nama, kurang.nama, d));

  const taruh = (item: number, k: number) => {
    if (slot[k] !== null || slot.includes(item) || selesaiPasang) return;
    const baru = slot.slice();
    baru[k] = item;
    setSlot(baru);
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(dipakai + 1));
  };

  const pilihSiapa = (v: "atas" | "bawah") => {
    if (jawabSiapa) return;
    const benar = atas.n > bawah.n ? "atas" : "bawah";
    if (v === benar) {
      setSalahSiapa(null);
      setKabar(null);
      setJawabSiapa(true);
    } else {
      setSalahSiapa(v);
      setKabar({ teks: "Lihat yang masih punya sisa tanpa pasangan. Kelompok yang punya sisa adalah yang lebih banyak.", ok: false });
    }
  };

  const pilihSelisih = (v: number) => {
    if (!jawabSiapa || beres) return;
    if (v === d) {
      setSalahSelisih(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahSelisih(v);
      setKabar({ teks: "Hitung piring kosong atau benda sisa satu per satu. Itulah lebihnya, dan lebihnya sama dengan selisih.", ok: false });
    }
  };

  const opsiSiapa: { v: "atas" | "bawah"; teks: string }[] = [
    { v: "atas", teks: `Banyak ${atas.nama}` },
    { v: "bawah", teks: `Banyak ${bawah.nama}` },
  ];

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: selisihnya"
            : suara
              ? "Hebat!"
              : beres
                ? "Pasanganmu rapi!"
                : selesaiPasang
                  ? jawabSiapa
                    ? "Berapa lebihnya?"
                    : "Siapa lebih banyak?"
                  : "Taruh di piring"
        }
        teks={`Ada ${sebut(atas.n)} ${atas.nama} di baris atas. Di bawah tiap benda ada satu piring kosong. Seret ${bawah.nama} dari bawah ke piring, atau ketuk bendanya lalu ketuk piringnya. Setelah selesai, lihat piring yang kosong atau benda yang tersisa. Itulah lebihnya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">{atas.nama}</p>
          <div className="flex flex-wrap items-start justify-center gap-x-1 gap-y-2 pt-1">
            {atas.n > 0
              ? Array.from({ length: atas.n }, (_, k) => {
                  const kosongSisa = selesaiPasang && slot[k] === null;
                  return (
                    <div key={k} className="flex flex-col items-center gap-0.5">
                      <Ikon jenis={atas.ikon} kelas={ukuran} />
                      <button
                        type="button"
                        data-zona={`a6-piring-${k}`}
                        aria-label={`Piring ${k + 1}, ${slot[k] !== null ? `berisi ${bawah.nama}` : kosongSisa ? "kosong, tidak punya pasangan" : "kosong"}`}
                        onClick={() => {
                          if (slot[k] === null && terpilih !== null) taruh(terpilih, k);
                          else if (slot[k] === null && !selesaiPasang) setKabar({ teks: `Pilih dulu satu ${bawah.nama} di bawah, lalu ketuk piringnya.`, ok: false });
                        }}
                        className={`flex items-center justify-center rounded-full border-2 ${kecil ? "h-8 w-8" : "h-9 w-9"} ${
                          slot[k] === null ? "border-dashed border-[#1C01A5]/60 bg-[#FFFDF2]" : "border-solid border-[#7FCB96] bg-[#E8F7EE]"
                        } ${kosongSisa ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}
                      >
                        {slot[k] !== null ? <Ikon jenis={bawah.ikon} kelas={kecil ? "h-6 w-6 text-[18px]" : "h-7 w-7 text-xl"} /> : null}
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">{bawah.nama}</p>
          <div className="flex min-h-[52px] flex-wrap items-center justify-center gap-1.5 pt-1">
            {tray.map((i) => (
              <BendaSeret
                key={i}
                id={`p${i}`}
                label={`${bawah.nama} ke-${i + 1}`}
                aktif={!selesaiPasang}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("a6-piring-")) taruh(i, Number(z.slice(10)));
                }}
                gaya={letakMeja(i)}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""} ${selesaiPasang ? "ring-4 ring-[#F0AB00]" : ""}`}>
                  <Ikon jenis={bawah.ikon} kelas="h-9 w-9 text-3xl" />
                </span>
              </BendaSeret>
            ))}
            {tray.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/60">semua sudah di piring</span> : null}
          </div>
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]">
          Berpasangan: {dipakai} {selesaiPasang ? `• sisa: ${d}` : ""}
        </p>
        {selesaiPasang && !jawabSiapa ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Mana yang lebih banyak?</p>
            <div className="grid grid-cols-2 gap-2">
              {opsiSiapa.map((o) => (
                <button
                  key={`${o.v}-${salahSiapa === o.v ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih ${o.teks}`}
                  onClick={() => pilihSiapa(o.v)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salahSiapa === o.v ? "igil-goyang" : ""}`}
                >
                  {o.teks}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {jawabSiapa && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Berapa lebihnya {lebih.nama} dari {kurang.nama}?</p>
            <PilihAngka opsi={opsiSekitar(d)} keliru={salahSelisih} onPilih={pilihSelisih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Beda banyaknya: ?" : `${lebih.nama} ${d} lebihnya dari ${kurang.nama}. ${kurang.nama} ${d} kurangnya dari ${lebih.nama}.`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahPiring({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_PIRING[RONDE_PIRING.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Donat di Piring"
      warna="#FBCFE8"
      petunjuk="Untuk membandingkan, pasangkan satu benda dengan satu piring. Seret benda dari bawah ke piring di bawah benda atas. Piring yang kosong atau benda yang tersisa menunjukkan lebihnya. Pilih mana yang lebih banyak, lalu pilih berapa lebihnya. Pada ronde terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-piring"
      jumlahRonde={RONDE_PIRING.length}
      kunciAkhir={Math.abs(terakhir.atas.n - terakhir.bawah.n)}
      belumSiap="Taruh bendanya dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePiring ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Samakan Kelompok ---------------------------------- */

type RondeSamakanData = { aksi: "tambah" | "kurang"; tetap: Kelompok; ubah: Kelompok };

const RONDE_SAMAKAN: RondeSamakanData[] = [
  { aksi: "tambah", tetap: { nama: "kupu-kupu", n: 7, ikon: "🦋" }, ubah: { nama: "bunga", n: 5, ikon: "🌸" } },
  { aksi: "kurang", tetap: { nama: "mobil-mobilan", n: 6, ikon: "🚗" }, ubah: { nama: "pesawat", n: 9, ikon: "✈️" } },
  { aksi: "tambah", tetap: { nama: "boneka Kira", n: 9, ikon: "🧸" }, ubah: { nama: "boneka Wei", n: 5, ikon: "🧸" } },
];

function RondeSamakan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d0 = RONDE_SAMAKAN[ronde];
  const akhir = ronde === RONDE_SAMAKAN.length - 1;
  const d = Math.abs(d0.tetap.n - d0.ubah.n);
  const tambah = d0.aksi === "tambah";
  const [n, setN] = useState(d0.ubah.n);
  const [sama, setSama] = useState(false);
  const [salahSelisih, setSalahSelisih] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const besar = tambah ? d0.tetap : d0.ubah;
  const kecil = tambah ? d0.ubah : d0.tetap;
  const suara = panel.suara["a6-samakan"] === true && akhir;
  const berubah = n - d0.ubah.n;
  useBicara(
    akhir ? suara : beres,
    `${tambah ? `${d0.ubah.nama} ditambah ${sebut(d)}` : `${d0.ubah.nama} diambil ${sebut(d)}`}, sekarang sama banyak dengan ${d0.tetap.nama}. Beda banyaknya adalah ${sebut(d)}. ${sebut(besar.n)} dikurangi ${sebut(kecil.n)} sama dengan ${sebut(d)}.`
  );

  const ubah = (delta: number) => {
    if (sama) return;
    const baru = Math.max(0, Math.min(14, n + delta));
    if (baru === n) return;
    setN(baru);
    setKabar(null);
    ucap(sebut(baru));
  };

  const periksa = () => {
    if (sama) return;
    if (n === d0.tetap.n) {
      setSama(true);
      setKabar(null);
      return;
    }
    const kurangDari = n < d0.tetap.n;
    setKabar({
      teks: kurangDari
        ? `${d0.ubah.nama} masih kurang dari ${d0.tetap.nama}. Tambah lagi sampai sama banyak.`
        : `${d0.ubah.nama} masih lebih banyak dari ${d0.tetap.nama}. Ambil beberapa sampai sama banyak.`,
      ok: false,
    });
  };

  const pilihSelisih = (v: number) => {
    if (!sama || beres) return;
    if (v === d) {
      setSalahSelisih(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahSelisih(v);
      setKabar({ teks: `Lihat berapa yang kamu ${tambah ? "tambahkan" : "ambil"} sampai kedua kelompok sama banyak. Banyaknya itulah selisih.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: selisihnya"
            : suara
              ? "Hebat!"
              : beres
                ? "Sama banyak!"
                : sama
                  ? "Berapa bedanya?"
                  : tambah
                    ? "Tambah sampai sama"
                    : "Ambil sampai sama"
        }
        teks={`Buat ${d0.ubah.nama} sama banyak dengan ${d0.tetap.nama}. Hitung dulu kedua kelompok. Tekan ${tambah ? "tambah" : "ambil"} satu per satu, lalu tekan periksa. Banyak yang kamu ${tambah ? "tambah" : "ambil"} adalah selisihnya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">{d0.tetap.nama}</p>
          <KumpulanBenda n={d0.tetap.n} ikon={d0.tetap.ikon} kelas="text-2xl" />
        </div>
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {d0.ubah.nama} • sekarang ada {n}
          </p>
          <div className="flex min-h-[34px] flex-wrap items-center justify-center gap-0.5 text-2xl leading-none" role="img" aria-label={`${n} ${d0.ubah.nama}`}>
            {Array.from({ length: n }, (_, i) => (
              <span key={i} aria-hidden="true" className={i >= d0.ubah.n ? "igil-muncul rounded-lg bg-[#FFF7CC] ring-2 ring-[#F0AB00]" : ""}>
                {d0.ubah.ikon}
              </span>
            ))}
          </div>
        </div>
        {!sama ? (
          <>
            <p className="text-center text-base font-black text-[#1C01A5]">
              {berubah === 0 ? "Belum ada yang berubah" : berubah > 0 ? `Ditambah: ${berubah}` : `Diambil: ${-berubah}`}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" aria-label={`Ambil satu ${d0.ubah.nama}`} onClick={() => ubah(-1)} className={TOMBOL_KECIL}>
                ➖ Ambil satu
              </button>
              <button type="button" aria-label={`Tambah satu ${d0.ubah.nama}`} onClick={() => ubah(1)} className={TOMBOL_KECIL}>
                ➕ Tambah satu
              </button>
            </div>
            <button
              type="button"
              onClick={periksa}
              className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]"
            >
              ✔ Periksa sama banyak
            </button>
          </>
        ) : null}
        {sama && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              Kamu {tambah ? "menambah" : "mengambil"} {d}. Berapa beda banyak {d0.ubah.nama} dan {d0.tetap.nama}?
            </p>
            <PilihAngka opsi={opsiSekitar(d)} keliru={salahSelisih} onPilih={pilihSelisih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisihnya: ?" : `${besar.n} – ${kecil.n} = ${d}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSamakan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_SAMAKAN[RONDE_SAMAKAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Samakan Kelompok"
      warna="#BBF7D0"
      petunjuk="Hitung dulu kedua kelompok. Lalu tambah atau ambil benda di kelompok bawah sampai sama banyak dengan kelompok atas. Tekan periksa. Banyak benda yang kamu tambah atau ambil adalah selisihnya. Pada ronde terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-samakan"
      jumlahRonde={RONDE_SAMAKAN.length}
      kunciAkhir={Math.abs(terakhir.tetap.n - terakhir.ubah.n)}
      belumSiap="Samakan kelompoknya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSamakan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Dua Barisan Anak ---------------------------------- */

type Jenis = "L" | "P";
const RONDE_BARISAN: { L: number; P: number }[] = [
  { L: 6, P: 4 },
  { L: 3, P: 7 },
  { L: 8, P: 3 },
];
const IKON_ANAK: Record<Jenis, string> = { L: "👦", P: "👧" };
const NAMA_BARIS: Record<Jenis, string> = { L: "laki-laki", P: "perempuan" };

/** Urutan anak yang bercampur: laki-laki dan perempuan bergantian, sisanya di belakang. */
function susunAnak(l: number, p: number): Jenis[] {
  const hasil: Jenis[] = [];
  let sisaL = l;
  let sisaP = p;
  while (sisaL > 0 || sisaP > 0) {
    if (sisaL > 0) {
      hasil.push("L");
      sisaL -= 1;
    }
    if (sisaP > 0) {
      hasil.push("P");
      sisaP -= 1;
    }
  }
  return hasil;
}

function RondeBarisan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d0 = RONDE_BARISAN[ronde];
  const akhir = ronde === RONDE_BARISAN.length - 1;
  const anak = susunAnak(d0.L, d0.P);
  const d = Math.abs(d0.L - d0.P);
  const maks = Math.max(d0.L, d0.P);
  const [masuk, setMasuk] = useState<boolean[]>(() => anak.map(() => false));
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<Jenis | null>(null);
  const [jawabSiapa, setJawabSiapa] = useState(false);
  const [salahSiapa, setSalahSiapa] = useState<Jenis | null>(null);
  const [salahSelisih, setSalahSelisih] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const barisL = anak.filter((j, i) => j === "L" && masuk[i]).length;
  const barisP = anak.filter((j, i) => j === "P" && masuk[i]).length;
  const semua = masuk.every(Boolean);
  const lebih: Jenis = d0.L > d0.P ? "L" : "P";
  const kurang: Jenis = lebih === "L" ? "P" : "L";
  const suara = panel.suara["a6-barisan"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Ada ${sebut(d0.L)} anak laki-laki dan ${sebut(d0.P)} anak perempuan. Anak ${NAMA_BARIS[lebih]} ${sebut(d)} lebihnya dari anak ${NAMA_BARIS[kurang]}. Selisih banyaknya adalah ${sebut(d)}.`
  );

  const taruh = (i: number, baris: Jenis) => {
    if (masuk[i] || semua) return;
    if (anak[i] !== baris) {
      setGoyang(baris);
      setTerpilih(null);
      setKabar({ teks: `Anak ${NAMA_BARIS[anak[i]]} berbaris di barisan ${NAMA_BARIS[anak[i]]}. Lihat gambar anaknya dulu.`, ok: false });
      return;
    }
    const baru = masuk.slice();
    baru[i] = true;
    setMasuk(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(baris === "L" ? barisL + 1 : barisP + 1));
  };

  const pilihSiapa = (v: Jenis) => {
    if (jawabSiapa) return;
    if (v === lebih) {
      setSalahSiapa(null);
      setKabar(null);
      setJawabSiapa(true);
    } else {
      setSalahSiapa(v);
      setKabar({ teks: "Lihat panjang kedua barisan. Barisan yang lebih panjang punya anak lebih banyak.", ok: false });
    }
  };

  const pilihSelisih = (v: number) => {
    if (!jawabSiapa || beres) return;
    if (v === d) {
      setSalahSelisih(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahSelisih(v);
      setKabar({ teks: "Pasangkan anak di barisan atas dan bawah satu-satu. Anak yang tidak punya pasangan adalah lebihnya.", ok: false });
    }
  };

  const baris = (j: Jenis, jumlah: number) => {
    const sisaCincin = semua && j === lebih;
    const urut = anak.map((x, i) => (x === j && masuk[i] ? i : -1)).filter((i) => i >= 0);
    return (
      <button
        key={`${j}-${goyang === j ? "x" : "o"}`}
        type="button"
        data-zona={`a6-baris-${j}`}
        aria-label={`Barisan ${NAMA_BARIS[j]}, ada ${jumlah} anak`}
        onClick={() => {
          if (terpilih !== null) taruh(terpilih, j);
          else if (!semua) setKabar({ teks: "Pilih dulu satu anak di bawah, lalu ketuk barisannya.", ok: false });
        }}
        className={`block w-full rounded-2xl border-4 bg-white px-1 py-1.5 ${goyang === j ? "igil-goyang" : ""} ${
          semua ? "border-solid border-[#7FCB96]" : "border-dashed border-[#1C01A5]"
        }`}
      >
        <span className="block text-center text-sm font-black text-[#1C01A5]">Barisan {NAMA_BARIS[j]}</span>
        <span className="grid min-h-[38px] items-center" style={{ gridTemplateColumns: `repeat(${maks}, minmax(0, 1fr))` }}>
          {Array.from({ length: maks }, (_, c) => {
            const idx = urut[c];
            const lebihnya = sisaCincin && c >= Math.min(d0.L, d0.P);
            return (
              <span key={c} className={`flex h-9 items-center justify-center text-2xl leading-none ${lebihnya ? "rounded-xl bg-[#FFF7CC] ring-2 ring-[#F0AB00]" : ""}`}>
                {idx !== undefined ? IKON_ANAK[j] : <span className="text-sm text-[#1C01A5]/25">·</span>}
              </span>
            );
          })}
        </span>
      </button>
    );
  };

  const sisaAnak = anak.map((_, i) => i).filter((i) => !masuk[i]);
  const opsiSiapa: { v: Jenis; teks: string }[] = [
    { v: "L", teks: "Barisan laki-laki" },
    { v: "P", teks: "Barisan perempuan" },
  ];

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara
            ? "Ucapkan: selisihnya"
            : suara
              ? "Hebat!"
              : beres
                ? "Barisanmu rapi!"
                : semua
                  ? jawabSiapa
                    ? "Berapa selisihnya?"
                    : "Barisan mana lebih panjang?"
                  : "Bariskan anak-anak"
        }
        teks={`Ada anak laki-laki dan anak perempuan. Seret setiap anak ke barisannya, atau ketuk anaknya lalu ketuk barisannya. Setelah semua berbaris, bandingkan panjang kedua barisan.${akhir ? " Di akhir, ucapkan selisih banyak anak laki-laki dan anak perempuan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        {baris("L", barisL)}
        {baris("P", barisP)}
        {!semua ? (
          <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-1.5 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
            <span className="w-full text-center text-sm font-black text-[#1C01A5]">🧒 Anak-anak yang belum berbaris</span>
            {sisaAnak.map((i) => (
              <BendaSeret
                key={i}
                id={`a${i}`}
                label={`Anak ${NAMA_BARIS[anak[i]]} ke-${i + 1}`}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z === "a6-baris-L") taruh(i, "L");
                  else if (z === "a6-baris-P") taruh(i, "P");
                }}
                gaya={letakMeja(i)}
                kelas="rounded-full"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-full text-3xl leading-none ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`} aria-hidden="true">
                  {IKON_ANAK[anak[i]]}
                </span>
              </BendaSeret>
            ))}
          </div>
        ) : null}
        {semua && !jawabSiapa ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Barisan mana yang lebih panjang?</p>
            <div className="grid grid-cols-2 gap-2">
              {opsiSiapa.map((o) => (
                <button
                  key={`${o.v}-${salahSiapa === o.v ? "x" : "o"}`}
                  type="button"
                  aria-label={`Pilih ${o.teks}`}
                  onClick={() => pilihSiapa(o.v)}
                  className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${salahSiapa === o.v ? "igil-goyang" : ""}`}
                >
                  {o.teks}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        {jawabSiapa && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Berapa selisih banyak anak laki-laki dan anak perempuan?</p>
            <PilihAngka opsi={opsiSekitar(d)} keliru={salahSelisih} onPilih={pilihSelisih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisihnya: ?" : `${d0.L} dan ${d0.P}: selisih ${d}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBarisan({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_BARISAN[RONDE_BARISAN.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Dua Barisan Anak"
      warna="#BFDBFE"
      petunjuk="Seperti Ayo Bermain di buku. Seret setiap anak ke barisan laki-laki atau barisan perempuan. Setelah semua berbaris, pilih barisan yang lebih panjang, lalu pilih selisih banyak anaknya. Pada ronde terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-barisan"
      jumlahRonde={RONDE_BARISAN.length}
      kunciAkhir={Math.abs(terakhir.L - terakhir.P)}
      belumSiap="Bariskan dan jawab dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBarisan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kalimat Selisih ----------------------------------- */

type KataSel = "lebihnya" | "kurangnya" | "beda";

const RONDE_KALIMAT: { besar: Kelompok; kecil: Kelompok }[] = [
  { besar: { nama: "kupu-kupu", n: 7, ikon: "🦋" }, kecil: { nama: "bunga", n: 5, ikon: "🌸" } },
  { besar: { nama: "pesawat", n: 9, ikon: "✈️" }, kecil: { nama: "mobil-mobilan", n: 6, ikon: "🚗" } },
  { besar: { nama: "apel", n: 8, ikon: "🍎" }, kecil: { nama: "mangga", n: 4, ikon: "🥭" } },
];

function RondeKalimat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const { besar, kecil } = RONDE_KALIMAT[ronde];
  const akhir = ronde === RONDE_KALIMAT.length - 1;
  const d = besar.n - kecil.n;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [salahSelisih, setSalahSelisih] = useState<number | null>(null);
  const [terpasang, setTerpasang] = useState<Record<number, KataSel>>({});
  const [terpilih, setTerpilih] = useState<KataSel | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = Object.keys(terpasang).length === 3;
  const suara = panel.suara["a6-kalimat"] === true && akhir;
  const angka = tahap === 1 ? String(d) : "?";
  const KUNCI: KataSel[] = ["lebihnya", "kurangnya", "beda"];
  const kartuSisa = KUNCI.filter((k) => !Object.values(terpasang).includes(k));
  useBicara(akhir ? suara : beres, kalimatSelisih(besar.nama, kecil.nama, d));

  const pilihSelisih = (v: number) => {
    if (tahap !== 0) return;
    if (v === d) {
      setSalahSelisih(null);
      setKabar(null);
      setTahap(1);
      ucap(`${sebut(besar.n)} dikurangi ${sebut(kecil.n)} sama dengan ${sebut(d)}. Sekarang lengkapi kalimatnya dengan kartu kata.`);
    } else {
      setSalahSelisih(v);
      setKabar({ teks: `Hitung ${besar.nama} dan ${kecil.nama} dengan teliti. Selisihnya adalah bilangan yang besar dikurangi bilangan yang kecil.`, ok: false });
    }
  };

  const taruh = (kata: KataSel, i: number) => {
    if (tahap !== 1 || terpasang[i] || Object.values(terpasang).includes(kata)) return;
    if (kata !== KUNCI[i]) {
      setGoyang(i);
      setTerpilih(null);
      setKabar({
        teks:
          i === 0
            ? `Banyak ${besar.nama} lebih banyak. Jadi ${besar.nama} lebihnya dari ${kecil.nama}.`
            : i === 1
              ? `Banyak ${kecil.nama} lebih sedikit. Jadi ${kecil.nama} kurangnya dari ${besar.nama}.`
              : "Kalimat ini menyebut beda kedua kelompok. Gunakan kartu beda.",
        ok: false,
      });
      return;
    }
    const baru = { ...terpasang, [i]: kata };
    setTerpasang(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(kata === "beda" ? "Beda." : `${kata}.`);
    if (Object.keys(baru).length === 3) {
      letusan.picu();
      onBeres();
    }
  };

  const slot = (i: number) => (
    <button
      key={`${i}-${goyang === i ? "x" : "o"}`}
      type="button"
      data-zona={`a6-kal-${i}`}
      aria-label={`Tempat kata kalimat ${i + 1}${terpasang[i] ? `, berisi ${terpasang[i]}` : ", kosong"}`}
      onClick={() => {
        if (tahap !== 1 || terpasang[i]) return;
        if (terpilih !== null) taruh(terpilih, i);
        else setKabar({ teks: "Pilih dulu satu kartu kata di bawah, lalu ketuk tempatnya.", ok: false });
      }}
      className={`inline-flex min-w-[5.2rem] items-center justify-center rounded-xl border-4 px-1.5 py-0.5 text-base font-black text-[#1C01A5] ${
        terpasang[i] ? "border-solid border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5] bg-[#FFF7CC]"
      } ${goyang === i ? "igil-goyang" : ""}`}
    >
      {terpasang[i] ?? "..."}
    </button>
  );

  return (
    <>
      <IgilBicara
        pendek={
          akhir && beres && !suara ? "Ucapkan: selisihnya" : suara ? "Hebat!" : beres ? "Kalimatmu lengkap!" : tahap === 0 ? "Berapa bedanya?" : "Lengkapi kalimat"
        }
        teks={`Hitung ${besar.nama} dan ${kecil.nama}. Cari berapa bedanya. Lalu seret kartu lebihnya, kurangnya, dan beda ke kalimat yang tepat, atau ketuk kartunya lalu ketuk tempatnya.${akhir ? " Di akhir, ucapkan selisihnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
            <p className="text-center text-xs font-black text-[#1C01A5]">{besar.nama}</p>
            <KumpulanBenda n={besar.n} ikon={besar.ikon} kelas="text-xl" />
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1.5">
            <p className="text-center text-xs font-black text-[#1C01A5]">{kecil.nama}</p>
            <KumpulanBenda n={kecil.n} ikon={kecil.ikon} kelas="text-xl" />
          </div>
        </div>
        {tahap === 0 ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Berapa beda banyak {besar.nama} dan {kecil.nama}?</p>
            <PilihAngka opsi={opsiSekitar(d)} keliru={salahSelisih} onPilih={pilihSelisih} />
          </div>
        ) : (
          <>
            <div className="space-y-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2 text-base font-black leading-[2.4rem] text-[#1C01A5]">
              <p>
                Banyak {besar.nama} {angka} {slot(0)} dari banyak {kecil.nama}.
              </p>
              <p>
                Banyak {kecil.nama} {angka} {slot(1)} dari banyak {besar.nama}.
              </p>
              <p>
                {slot(2)} banyak {kecil.nama} dan {besar.nama} adalah {angka}.
              </p>
            </div>
            <div className="flex min-h-[68px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
              <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu kata</span>
              {kartuSisa.map((k) => (
                <BendaSeret
                  key={k}
                  id={k}
                  label={`Kartu ${k}`}
                  onKetuk={() => setTerpilih(k)}
                  onLepas={(_, x, y) => {
                    const z = zonaDi(x, y);
                    if (z && z.startsWith("a6-kal-")) taruh(k, Number(z.slice(7)));
                  }}
                  kelas="rounded-2xl"
                >
                  <span
                    className={`block rounded-2xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-base font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${
                      terpilih === k ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""
                    }`}
                  >
                    {k}
                  </span>
                </BendaSeret>
              ))}
              {beres ? <span className="text-3xl">✅</span> : null}
            </div>
          </>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Selisihnya: ?" : `${besar.n} – ${kecil.n} = ${d}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKalimat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KALIMAT[RONDE_KALIMAT.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kalimat Selisih"
      warna="#FDE68A"
      petunjuk="Hitung dua kelompok benda dan cari berapa bedanya. Lalu lengkapi tiga kalimat dengan kartu kata lebihnya, kurangnya, dan beda. Seret kartu ke kalimat yang tepat. Pada ronde terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a6-kalimat"
      jumlahRonde={RONDE_KALIMAT.length}
      kunciAkhir={terakhir.besar.n - terakhir.kecil.n}
      belumSiap="Lengkapi kalimatnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKalimat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
