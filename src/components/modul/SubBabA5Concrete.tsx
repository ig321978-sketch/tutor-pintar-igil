"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, Persamaan, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { Kelereng, Pensil, sebut } from "./belas-a5-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab A, Tahap 4 Concrete: benda nyata. Anak memegang, menyeret,   */
/* mengikat, dan menghitung benda satu-satu.                                  */
/*  1 Isi Kotak Sepuluh (seret kelereng: sepuluh dulu, lalu sisanya)           */
/*  2 Hitung Satu per Satu (ketuk benda, hitungan terakhir = jumlah)          */
/*  3 Ikat Sepuluh Pensil (pilih tepat sepuluh, ikat, hitung sisanya)         */
/*  4 Tebak Isi Stoples (menebak, menghitung, membandingkan)                  */
/* ------------------------------------------------------------------------ */

/** Tiga pilihan di sekitar kunci, urutan diputar supaya kunci tidak selalu di tengah. */
function opsiBelas(n: number): number[] {
  const dasar = [n - 1, n, n + 1];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/* --------- Permainan 1. Isi Kotak Sepuluh --------------------------------- */

const RONDE_KOTAK = [12, 15, 18];

function RondeKotak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_KOTAK[ronde];
  const akhir = ronde === RONDE_KOTAK.length - 1;
  const [asal, setAsal] = useState<number[]>(() => Array.from({ length: n }, (_, i) => i));
  const [dalam, setDalam] = useState<number[]>([]);
  const [luar, setLuar] = useState<number[]>([]);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [goyang, setGoyang] = useState(0);
  const letusan = useLetusan();
  const beres = asal.length === 0;
  const suara = panel.suara["a5-kotak"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Kotak berisi sepuluh. Di luar kotak ada ${sebut(n - 10)}. Sepuluh ditambah ${sebut(n - 10)} menjadi ${sebut(n)}.`
  );

  const taruh = (m: number, zona: "a5-kotak" | "a5-luar") => {
    if (!asal.includes(m)) return;
    if (zona === "a5-kotak" && dalam.length >= 10) {
      setKabar({ teks: "Kotak sepuluh sudah penuh. Taruh sisanya di luar kotak.", ok: false });
      setGoyang((g) => g + 1);
      setTerpilih(null);
      return;
    }
    if (zona === "a5-luar" && dalam.length < 10) {
      setKabar({ teks: "Isi dulu kotak sampai penuh sepuluh. Sepuluh dulu, baru sisanya.", ok: false });
      setGoyang((g) => g + 1);
      setTerpilih(null);
      return;
    }
    const baru = asal.filter((x) => x !== m);
    setAsal(baru);
    if (zona === "a5-kotak") {
      const k = [...dalam, m];
      setDalam(k);
      if (k.length === 10) ucap("Kotak sudah penuh. Isinya sepuluh.");
    } else {
      setLuar([...luar, m]);
    }
    setTerpilih(null);
    setKabar(null);
    if (baru.length === 0) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? `Ucapkan: jumlahnya` : "Sepuluh dan sisanya!") : "Isi kotak sepuluh dulu"}
        teks={`Ada ${sebut(n)} kelereng di nampan. Seret kelereng ke kotak sepuluh sampai penuh, atau ketuk kelerengnya lalu ketuk kotaknya. Setelah kotak penuh, taruh sisanya di luar kotak.${akhir ? " Setelah semua rapi, ucapkan berapa banyak kelereng seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[64px] flex-wrap items-center justify-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {asal.map((m) => (
            <BendaSeret
              key={m}
              id={String(m)}
              label={`Kelereng ${m + 1}`}
              onKetuk={() => setTerpilih(m)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z === "a5-kotak" || z === "a5-luar") taruh(m, z);
              }}
              kelas="rounded-full"
            >
              <span className={`block rounded-full p-0.5 ${terpilih === m ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                <Kelereng warna={m} kelas="h-10 w-10" />
              </span>
            </BendaSeret>
          ))}
          {beres ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <button
          key={`kotak-${goyang}`}
          type="button"
          data-zona="a5-kotak"
          aria-label={`Kotak sepuluh, berisi ${dalam.length}`}
          onClick={() => {
            if (terpilih !== null) taruh(terpilih, "a5-kotak");
            else ucap(`Kotak sepuluh berisi ${sebut(dalam.length)}.`);
          }}
          className={`igil-tanpa-tepi block w-full rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2 ${goyang > 0 && dalam.length >= 10 ? "igil-goyang" : ""}`}
        >
          <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
            <span>📦 Kotak sepuluh</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{dalam.length} / 10</span>
          </span>
          <span className="grid grid-cols-5 gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className="flex h-12 items-center justify-center rounded-xl border-2 border-dashed border-[#A8672D]/60 bg-white/70">
                {i < dalam.length ? <Kelereng warna={dalam[i]} kelas="h-9 w-9" /> : null}
              </span>
            ))}
          </span>
        </button>
        <button
          type="button"
          data-zona="a5-luar"
          aria-label={`Di luar kotak, berisi ${luar.length}`}
          onClick={() => {
            if (terpilih !== null) taruh(terpilih, "a5-luar");
            else ucap(`Di luar kotak ada ${sebut(luar.length)}.`);
          }}
          className="igil-tanpa-tepi block min-h-[64px] w-full rounded-3xl border-4 border-dashed border-[#1C01A5] bg-white px-2 py-2"
        >
          <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
            <span>➕ Di luar kotak</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2">{luar.length}</span>
          </span>
          <span className="flex flex-wrap items-center justify-center gap-1">
            {luar.map((m) => (
              <span key={m} className="igil-muncul">
                <Kelereng warna={m} kelas="h-9 w-9" />
              </span>
            ))}
          </span>
        </button>
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2">
            <Persamaan a={10} b={n - 10} c={akhir && !suara ? "?" : n} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKotak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Kotak Sepuluh"
      warna="#FFE566"
      petunjuk="Seret kelereng ke kotak sepuluh sampai penuh. Setelah penuh, taruh sisanya di luar kotak. Sepuluh dulu, baru sisanya. Pada ronde terakhir, ucapkan berapa banyak kelereng seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-kotak"
      jumlahRonde={RONDE_KOTAK.length}
      kunciAkhir={RONDE_KOTAK[RONDE_KOTAK.length - 1]}
      belumSiap="Rapikan semua kelereng dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKotak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Hitung Satu per Satu ------------------------------ */

const RONDE_HITUNG: { ikon: string; nama: string; n: number }[] = [
  { ikon: "⚽", nama: "bola", n: 11 },
  { ikon: "🚗", nama: "mobil", n: 14 },
  { ikon: "🍎", nama: "apel", n: 17 },
];

function RondeHitung({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_HITUNG[ronde];
  const akhir = ronde === RONDE_HITUNG.length - 1;
  const [urut, setUrut] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = urut.length === d.n;
  const suara = panel.suara["a5-hitung"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Ada ${sebut(d.n)} ${d.nama}. Sepuluh ditambah ${sebut(d.n - 10)} menjadi ${sebut(d.n)}. Bilangan terakhir yang kita sebut menunjukkan banyak semuanya.`
  );

  const ketuk = (i: number) => {
    if (semua) return;
    if (urut.includes(i)) {
      setGoyang(i);
      setKabar({ teks: "Benda ini sudah kamu hitung. Cari yang belum ada angkanya.", ok: false });
      return;
    }
    const baru = [...urut, i];
    setUrut(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(baru.length));
  };

  const pilih = (j: number) => {
    if (j === d.n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(j);
      setKabar({ teks: "Lihat angka pada benda yang terakhir kamu hitung. Itulah jumlah semuanya.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? `Ucapkan: jumlahnya` : "Hitunganmu tepat!") : semua ? "Berapa semuanya?" : `Ketuk setiap ${d.nama} satu kali`}
        teks={`Ketuk setiap ${d.nama} satu kali sambil menyebut bilangannya. Benda yang sudah dihitung diberi angka, supaya tidak terhitung dua kali. Setelah semua dihitung, pilih jumlah seluruhnya.${akhir ? " Lalu ucapkan jumlahnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          {Array.from({ length: d.n }, (_, i) => {
            const no = urut.indexOf(i) + 1;
            return (
              <button
                key={`${i}-${goyang === i ? "x" : "o"}`}
                type="button"
                aria-label={no ? `${d.nama} ke-${no}, sudah dihitung` : `${d.nama}, belum dihitung`}
                onClick={() => ketuk(i)}
                style={letakMeja(i)}
                className={`igil-tanpa-tepi relative flex h-14 w-14 items-center justify-center rounded-2xl border-4 ${
                  no ? (no <= 10 ? "border-[#16A34A] bg-[#E8F7EE]" : "border-[#2563EB] bg-[#DBEAFE]") : "border-dashed border-[#93C5FD] bg-white"
                } ${goyang === i ? "igil-goyang" : ""}`}
              >
                <span className="text-3xl leading-none" aria-hidden="true">
                  {d.ikon}
                </span>
                {no ? (
                  <span className="absolute -right-1.5 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-xs font-black text-[#1C01A5]">
                    {no}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]">
          Hitunganku: {urut.length > 10 ? `10 + ${urut.length - 10}` : urut.length}
        </p>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa {d.nama} semuanya?</p>
            <PilihAngka opsi={opsiBelas(d.n)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2">
            <Persamaan a={10} b={d.n - 10} c={akhir && !suara ? "?" : d.n} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahHitung({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung Satu per Satu"
      warna="#BBF7D0"
      petunjuk="Ketuk setiap benda satu kali sambil menyebut bilangannya. Benda yang sudah dihitung diberi angka. Sepuluh benda pertama bertepi hijau, sisanya bertepi biru. Setelah semua dihitung, pilih jumlahnya. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-hitung"
      jumlahRonde={RONDE_HITUNG.length}
      kunciAkhir={RONDE_HITUNG[RONDE_HITUNG.length - 1].n}
      belumSiap="Hitung semua benda dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeHitung ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Ikat Sepuluh Pensil ------------------------------- */

const RONDE_IKAT = [13, 16, 19];

function RondeIkat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_IKAT[ronde];
  const sisa = n - 10;
  const akhir = ronde === RONDE_IKAT.length - 1;
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [terikat, setTerikat] = useState<number[] | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["a5-ikat"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Satu ikat berisi sepuluh pensil. Pensil yang tidak diikat ada ${sebut(sisa)}. Sepuluh ditambah ${sebut(sisa)} menjadi ${sebut(n)}.`
  );

  const longgar = Array.from({ length: n }, (_, i) => i).filter((i) => !terikat?.includes(i));

  const ketuk = (i: number) => {
    if (terikat) return;
    setKabar(null);
    setDipilih((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  };

  const ikat = () => {
    if (dipilih.length !== 10) {
      setKabar({
        teks: dipilih.length < 10 ? `Baru terpilih ${sebut(dipilih.length)}. Satu ikat harus tepat sepuluh pensil.` : `Terpilih ${sebut(dipilih.length)}. Satu ikat harus tepat sepuluh, kurangi dulu.`,
        ok: false,
      });
      return;
    }
    setTerikat(dipilih);
    setDipilih([]);
    setKabar(null);
  };

  const pilih = (j: number) => {
    if (j === sisa) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(j);
      setKabar({ teks: "Hitung pensil yang tidak ikut diikat. Pensil di dalam ikatan tidak dihitung lagi.", ok: false });
    }
  };

  const opsiSisa = [sisa - 1, sisa, sisa + 1];
  const putar = sisa % 3;
  const urutOpsi = [...opsiSisa.slice(putar), ...opsiSisa.slice(0, putar)];

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? `Ucapkan: jumlahnya` : "Sepuluh dan sisanya!") : terikat ? "Sisa pensil ada berapa?" : "Pilih tepat 10 pensil"}
        teks={`Ada ${sebut(n)} pensil. Ketuk pensil untuk memilih tepat sepuluh, lalu tekan tombol Ikat Sepuluh. Setelah itu, hitung pensil yang tidak diikat.${akhir ? " Terakhir, ucapkan berapa banyak pensil seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        {terikat ? (
          <div className="igil-muncul flex items-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-2">
            <span className="text-3xl" aria-hidden="true">
              🎀
            </span>
            <span className="flex flex-1 items-end justify-center gap-0.5">
              {terikat.map((p) => (
                <Pensil key={p} warna={p} kelas="h-12 w-4" />
              ))}
            </span>
            <span className="rounded-full border-4 border-[#1C01A5] bg-white px-2 py-0.5 text-2xl font-black text-[#1C01A5]">10</span>
          </div>
        ) : null}
        <div className="flex min-h-[88px] flex-wrap items-end justify-center gap-1.5 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          {longgar.map((p) => {
            const pilihIni = dipilih.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-label={`Pensil ${p + 1}${pilihIni ? ", terpilih" : ""}`}
                aria-pressed={pilihIni}
                onClick={() => ketuk(p)}
                disabled={terikat !== null}
                className={`igil-tanpa-tepi rounded-xl border-2 px-1 py-1 transition-transform ${
                  pilihIni ? "-translate-y-2 border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-transparent"
                }`}
              >
                <Pensil warna={p} kelas="h-14 w-5" />
              </button>
            );
          })}
        </div>
        {terikat ? (
          <p className="text-center text-base font-black text-[#1C01A5]">Pensil yang tidak diikat: {beres ? sisa : "?"}</p>
        ) : (
          <>
            <p className="text-center text-xl font-black text-[#1C01A5]">Terpilih: {dipilih.length} / 10</p>
            <button type="button" onClick={ikat} className={TOMBOL_KECIL}>
              🎀 Ikat Sepuluh
            </button>
          </>
        )}
        {terikat && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Pensil yang tidak diikat ada berapa?</p>
            <PilihAngka opsi={urutOpsi} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2">
            <Persamaan a={10} b={sisa} c={akhir && !suara ? "?" : n} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahIkat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Ikat Sepuluh Pensil"
      warna="#FDE68A"
      petunjuk="Ketuk pensil untuk memilih tepat sepuluh, lalu tekan Ikat Sepuluh. Hitung pensil yang tidak diikat. Sepuluh ditambah sisanya adalah jumlah seluruhnya. Pada soal terakhir, ucapkan jumlah seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-ikat"
      jumlahRonde={RONDE_IKAT.length}
      kunciAkhir={RONDE_IKAT[RONDE_IKAT.length - 1]}
      belumSiap="Ikat sepuluh pensil dan hitung sisanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeIkat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Tebak Isi Stoples --------------------------------- */

const RONDE_TEBAK = [12, 17, 15];

function RondeTebak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_TEBAK[ronde];
  const akhir = ronde === RONDE_TEBAK.length - 1;
  const [fase, setFase] = useState<0 | 1 | 2>(0);
  const [tebakan, setTebakan] = useState(10);
  const [urut, setUrut] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["a5-tebak"] === true && akhir;
  const selisih = Math.abs(tebakan - n);
  const hasil =
    selisih === 0
      ? "Tebakanmu tepat sekali!"
      : selisih <= 2
        ? `Hampir tepat! Selisihnya hanya ${sebut(selisih)}.`
        : `Tebakanmu meleset ${sebut(selisih)}. Tidak apa-apa, menebak melatih perasaan bilangan.`;
  useBicara(
    akhir ? suara : fase === 2,
    `Tebakanmu ${sebut(tebakan)}. Hitunganmu ${sebut(n)}. ${hasil} Banyak kelereng dalam stoples adalah ${sebut(n)}.`
  );

  const ketuk = (i: number) => {
    if (fase !== 1) return;
    if (urut.includes(i)) {
      setGoyang(i);
      setKabar({ teks: "Kelereng ini sudah kamu hitung. Cari yang belum ada angkanya.", ok: false });
      return;
    }
    const baru = [...urut, i];
    setUrut(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(baru.length));
    if (baru.length === n) {
      setFase(2);
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : fase === 2 ? (akhir ? `Ucapkan: jumlahnya` : "Tebakan dan hitungan!") : fase === 1 ? "Buktikan: hitung kelerengnya" : "Tebak dulu, ya"}
        teks={`Lihat stoples ini. Tebak dulu berapa banyak kelerengnya. Atur tebakanmu dengan tombol plus dan minus, lalu tekan Tebakanku. Setelah itu, ketuk setiap kelereng satu kali untuk membuktikannya.${akhir ? " Di akhir, ucapkan banyak kelereng sebenarnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="mx-auto max-w-[300px] rounded-b-[2.5rem] rounded-t-xl border-4 border-[#1C01A5] bg-[#E0F2FE] px-2 pb-3 pt-2">
          <div className="mx-auto mb-2 h-3 w-24 rounded-full border-2 border-[#1C01A5] bg-[#F0AB00]" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: n }, (_, i) => {
              const no = urut.indexOf(i) + 1;
              return (
                <button
                  key={`${i}-${goyang === i ? "x" : "o"}`}
                  type="button"
                  disabled={fase !== 1}
                  aria-label={no ? `Kelereng ke-${no}, sudah dihitung` : `Kelereng, belum dihitung`}
                  onClick={() => ketuk(i)}
                  style={letakMeja(i)}
                  className={`igil-tanpa-tepi relative rounded-full ${goyang === i ? "igil-goyang" : ""} ${no ? "opacity-70" : ""}`}
                >
                  <Kelereng warna={i} kelas="h-10 w-10" />
                  {no ? (
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-white" style={{ textShadow: `0 0 3px ${BIRU}, 0 0 3px ${BIRU}` }}>
                      {no}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
        {fase === 0 ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Tebakanku: kira-kira berapa kelereng?</p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label="Kurangi tebakan"
                onClick={() => setTebakan((t) => Math.max(5, t - 1))}
                className="h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-white text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
              >
                −
              </button>
              <span className="flex h-16 w-24 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-4xl font-black text-[#1C01A5]">{tebakan}</span>
              <button
                type="button"
                aria-label="Tambah tebakan"
                onClick={() => setTebakan((t) => Math.min(25, t + 1))}
                className="h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-white text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setFase(1);
                ucap(`Tebakanmu ${sebut(tebakan)} kelereng. Sekarang buktikan dengan menghitung. Ketuk setiap kelereng satu kali.`);
              }}
              className={TOMBOL_KECIL}
            >
              🔍 Tebakanku
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <p className="text-lg font-black text-[#1C01A5]">Tebakanku: {tebakan}</p>
            <p className="text-lg font-black text-[#1C01A5]">Hitunganku: {fase === 2 ? n : urut.length > 10 ? `10 + ${urut.length - 10}` : urut.length}</p>
          </div>
        )}
        {fase === 2 ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black text-[#14532D]">{hasil}</div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTebak({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tebak Isi Stoples"
      warna="#C7D2FE"
      petunjuk="Tebak dulu berapa banyak kelereng di stoples. Atur tebakanmu, lalu hitung kelerengnya satu per satu untuk membuktikan. Bandingkan tebakan dengan hitunganmu. Pada soal terakhir, ucapkan banyak kelereng sebenarnya."
      speakGuru={speakGuru}
      panel={panel}
      id="a5-tebak"
      jumlahRonde={RONDE_TEBAK.length}
      kunciAkhir={RONDE_TEBAK[RONDE_TEBAK.length - 1]}
      belumSiap="Buktikan tebakanmu dengan menghitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTebak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
