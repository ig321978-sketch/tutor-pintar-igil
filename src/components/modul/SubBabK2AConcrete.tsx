"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, Persamaan, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { Kelereng, Pensil } from "./belas-a5-dasar";
import { Balok, Tas, sebut } from "./dasar-k2";
import { RONDE_IKAT_K2, RONDE_LOKER_K2, RONDE_SUSUN_K2, RONDE_TEBAK_K2, opsiSekitar } from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab A, Tahap 4 Concrete: benda nyata. Anak memegang,     */
/* memilih, menyeret, dan menghitung benda satu-satu atau sepuluh-sepuluh.    */
/*  1 Ikat Sepuluh Pensil (pilih tepat sepuluh, ikat berkali-kali)            */
/*  2 Hitung Tas di Loker (ketuk tas satu per satu, hitung 10 + 10 + sisa)    */
/*  3 Susun Balok Jadi Puluhan (seret ke susun sepuluh dan ke sisa)           */
/*  4 Tebak Isi Kantong Kelereng (menebak, menghitung, membandingkan)         */
/* ------------------------------------------------------------------------ */

const WARNA_PULUHAN = ["border-[#16A34A] bg-[#E8F7EE]", "border-[#2563EB] bg-[#DBEAFE]", "border-[#D97706] bg-[#FEF3C7]", "border-[#9333EA] bg-[#F3E8FF]", "border-[#DB2777] bg-[#FCE7F3]"];

const pilihBilangan = (n: number) => opsiSekitar(n, [10, 50]);

/** Uraian "10 + 10 + 3" untuk n: puluhan sebagai sepuluh-sepuluh lalu sisanya. */
function uraianSepuluh(n: number): string {
  const p = Math.floor(n / 10);
  const s = n % 10;
  const bagian = Array.from({ length: p }, () => "10");
  if (s > 0) bagian.push(String(s));
  return `${bagian.join(" + ")} = ${n}`;
}

/* --------- Permainan 1. Ikat Sepuluh Pensil ------------------------------- */

function RondeIkat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_IKAT_K2[ronde];
  const akhir = ronde === RONDE_IKAT_K2.length - 1;
  const [dipilih, setDipilih] = useState<number[]>([]);
  const [ikat, setIkat] = useState<number[][]>([]);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const terikatSemua = ikat.flat();
  const longgar = Array.from({ length: n }, (_, i) => i).filter((i) => !terikatSemua.includes(i));
  const selesaiIkat = longgar.length < 10;
  const suara = panel.suara["k2a-ikat"] === true && akhir;
  useBicara(akhir ? suara : beres, `Ada ${sebut(ikat.length)} ikat, masing-masing sepuluh pensil, dan ${sebut(longgar.length)} pensil lepas. ${uraianSepuluh(n).replace(/\+/g, "ditambah").replace("=", "sama dengan")}. Banyak pensil seluruhnya ${sebut(n)}.`);

  const ketuk = (i: number) => {
    if (selesaiIkat) return;
    setKabar(null);
    setDipilih((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  };

  const lakukanIkat = () => {
    if (dipilih.length !== 10) {
      setKabar({
        teks: dipilih.length < 10 ? `Baru terpilih ${sebut(dipilih.length)}. Satu ikat harus tepat sepuluh pensil.` : `Terpilih ${sebut(dipilih.length)}. Satu ikat harus tepat sepuluh, kurangi dulu.`,
        ok: false,
      });
      return;
    }
    setIkat([...ikat, dipilih]);
    setDipilih([]);
    setKabar(null);
  };

  const pilih = (j: number) => {
    if (j === n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(j);
      setKabar({ teks: `Hitung ikatnya dulu: ${sebut(ikat.length)} ikat berarti ${sebut(ikat.length * 10)}. Lalu tambahkan pensil yang lepas.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: jumlahnya" : "Sepuluh-sepuluh!") : selesaiIkat ? "Berapa semuanya?" : "Pilih tepat 10 pensil"}
        teks={`Ada ${sebut(n)} pensil. Ketuk pensil untuk memilih tepat sepuluh, lalu tekan Ikat Sepuluh. Ikat lagi dan lagi, selama masih ada sepuluh pensil lepas. Setelah itu, hitung semua pensil. Hitung ikatnya sepuluh-sepuluh, lalu tambah pensil yang lepas.${akhir ? " Terakhir, ucapkan banyak pensil seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        {ikat.length > 0 ? (
          <div className="flex flex-wrap items-end justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-2" role="group" aria-label={`${ikat.length} ikat sepuluh pensil`}>
            {ikat.map((b, k) => (
              <span key={k} className="igil-muncul flex flex-col items-center gap-0.5">
                <span className="flex items-end gap-px rounded-xl border-4 border-[#F0AB00] bg-white px-1 pb-1 pt-1">
                  {b.slice(0, 10).map((p) => (
                    <Pensil key={p} warna={p} kelas="h-9 w-2.5" />
                  ))}
                </span>
                <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm font-black text-[#1C01A5]">{(k + 1) * 10}</span>
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex min-h-[88px] flex-wrap items-end justify-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          {longgar.map((p) => {
            const terpilih = dipilih.includes(p);
            return (
              <button
                key={p}
                type="button"
                aria-label={`Pensil ${p + 1}${terpilih ? ", terpilih" : ""}`}
                aria-pressed={terpilih}
                onClick={() => ketuk(p)}
                disabled={selesaiIkat}
                className={`rounded-xl border-2 px-0.5 py-0.5 transition-transform ${terpilih ? "-translate-y-2 border-[#F0AB00] bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : "border-transparent"}`}
              >
                <Pensil warna={p} kelas="h-12 w-4" />
              </button>
            );
          })}
        </div>
        {selesaiIkat ? (
          <p className="text-center text-base font-black text-[#1C01A5]">
            {ikat.length} ikat dan {longgar.length} pensil lepas
          </p>
        ) : (
          <>
            <p className="text-center text-xl font-black text-[#1C01A5]">
              Terpilih: {dipilih.length} / 10 • Ikat: {ikat.length}
            </p>
            <button type="button" onClick={lakukanIkat} className={TOMBOL_KECIL}>
              🎀 Ikat Sepuluh
            </button>
          </>
        )}
        {selesaiIkat && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa pensil semuanya?</p>
            <PilihAngka opsi={pilihBilangan(n)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-xl font-black text-[#14532D]">{akhir && !suara ? "? = " + uraianSepuluh(n).split(" = ")[0] : uraianSepuluh(n)}</p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahIkatK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Ikat Sepuluh Pensil"
      warna="#FDE68A"
      petunjuk="Ketuk pensil untuk memilih tepat sepuluh, lalu tekan Ikat Sepuluh. Ikat berkali-kali selama masih ada sepuluh pensil lepas. Lalu hitung semuanya: ikat sepuluh-sepuluh, ditambah pensil yang lepas. Pada soal terakhir, ucapkan jumlah seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-ikat"
      jumlahRonde={RONDE_IKAT_K2.length}
      kunciAkhir={RONDE_IKAT_K2[RONDE_IKAT_K2.length - 1]}
      belumSiap="Ikat sepuluh-sepuluh dan hitung semuanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeIkat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Hitung Tas di Loker ------------------------------- */

function RondeLoker({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_LOKER_K2[ronde];
  const akhir = ronde === RONDE_LOKER_K2.length - 1;
  const [urut, setUrut] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = urut.length === n;
  const suara = panel.suara["k2a-loker"] === true && akhir;
  useBicara(akhir ? suara : beres, `Ada ${sebut(n)} tas di dalam loker. ${uraianSepuluh(n).replace(/\+/g, "ditambah").replace("=", "sama dengan")}. Banyak tas sama dengan banyak siswa, jadi ada ${sebut(n)} siswa.`);

  const ketuk = (i: number) => {
    if (semua) return;
    if (urut.includes(i)) {
      setGoyang(i);
      setKabar({ teks: "Tas ini sudah kamu hitung. Cari tas yang belum ada angkanya.", ok: false });
      return;
    }
    const baru = [...urut, i];
    setUrut(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(baru.length));
  };

  const pilih = (j: number) => {
    if (j === n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(j);
      setKabar({ teks: "Lihat angka pada tas yang terakhir kamu hitung. Itulah banyak tas seluruhnya.", ok: false });
    }
  };

  const banyakBaris = Math.ceil(n / 10);

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak tas" : "Hitunganmu tepat!") : semua ? "Berapa tas semuanya?" : "Ketuk setiap tas satu kali"}
        teks={`Ada tas di dalam loker. Ketuk setiap tas satu kali sambil menyebut bilangannya. Tas yang sudah dihitung diberi angka, supaya tidak terhitung dua kali. Sepuluh tas pertama bertepi hijau, sepuluh berikutnya biru, lalu kuning. Setelah semua dihitung, pilih banyak tas seluruhnya.${akhir ? " Lalu ucapkan banyak tasnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-3xl border-4 border-[#A8672D] bg-[#E9B872] p-1.5">
          <div className="grid grid-cols-5 gap-1 min-[400px]:grid-cols-10">
            {Array.from({ length: banyakBaris * 10 }, (_, i) => {
              if (i >= n) return <span key={i} className="hidden min-[400px]:block" />;
              const no = urut.indexOf(i) + 1;
              return (
                <button
                  key={`${i}-${goyang === i ? "x" : "o"}`}
                  type="button"
                  aria-label={no ? `Tas ke-${no}, sudah dihitung` : "Tas, belum dihitung"}
                  onClick={() => ketuk(i)}
                  className={`relative flex h-12 items-center justify-center rounded-lg border-[3px] ${no ? WARNA_PULUHAN[Math.floor((no - 1) / 10) % 5] : "border-[#C9A06A] bg-[#FFF3DB]"} ${goyang === i ? "igil-goyang" : ""}`}
                >
                  <Tas warna={i % 3 === 0 ? 2 : i % 3 === 1 ? 1 : 0} kelas={`h-9 w-9 ${no ? "opacity-70" : ""}`} />
                  {no ? (
                    <span className="absolute -right-1 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-0.5 text-[10px] font-black text-[#1C01A5]">{no}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]">Hitunganku: {urut.length > 10 ? `${Math.floor((urut.length - 1) / 10) * 10} + ${urut.length - Math.floor((urut.length - 1) / 10) * 10}` : urut.length}</p>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa tas semuanya?</p>
            <PilihAngka opsi={pilihBilangan(n)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center">
            <Persamaan a={Math.floor(n / 10) * 10} b={n % 10} c={akhir && !suara ? "?" : n} />
            <p className="pt-1 text-sm font-black text-[#14532D]">{uraianSepuluh(n)}</p>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahLokerK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung Tas di Loker"
      warna="#BBF7D0"
      petunjuk="Ketuk setiap tas satu kali sambil menyebut bilangannya. Tas yang sudah dihitung diberi angka. Sepuluh tas pertama bertepi hijau, sepuluh berikutnya biru, lalu kuning. Setelah semua dihitung, pilih banyak tas seluruhnya. Pada soal terakhir, ucapkan banyak tasnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-loker"
      jumlahRonde={RONDE_LOKER_K2.length}
      kunciAkhir={RONDE_LOKER_K2[RONDE_LOKER_K2.length - 1]}
      belumSiap="Hitung semua tas dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeLoker ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Susun Balok Jadi Puluhan -------------------------- */

function RondeSusun({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_SUSUN_K2[ronde];
  const akhir = ronde === RONDE_SUSUN_K2.length - 1;
  const banyakSusun = Math.floor(n / 10);
  const [asal, setAsal] = useState<number[]>(() => Array.from({ length: n }, (_, i) => i));
  const [susun, setSusun] = useState<number[][]>(() => Array.from({ length: banyakSusun }, () => []));
  const [sisa, setSisa] = useState<number[]>([]);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [goyang, setGoyang] = useState(0);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const kosong = asal.length === 0;
  const suara = panel.suara["k2a-susun"] === true && akhir;
  useBicara(akhir ? suara : beres, `Ada ${sebut(banyakSusun)} susun penuh dan ${sebut(n % 10)} balok lepas. ${uraianSepuluh(n).replace(/\+/g, "ditambah").replace("=", "sama dengan")}. Banyak balok seluruhnya ${sebut(n)}.`);

  const tolak = (teks: string) => {
    setKabar({ teks, ok: false });
    setGoyang((g) => g + 1);
    setTerpilih(null);
  };

  const taruh = (m: number, zona: string) => {
    if (!asal.includes(m)) return;
    if (zona === "k2a-sisa") {
      if (!susun.every((s) => s.length >= 10)) return tolak("Isi dulu semua susun sampai penuh sepuluh. Sepuluh dulu, baru sisanya.");
      setSisa([...sisa, m]);
    } else {
      const j = Number(zona.replace("k2a-susun-", ""));
      if (Number.isNaN(j) || j < 0 || j >= banyakSusun) return;
      if (susun[j].length >= 10) return tolak("Susun ini sudah penuh sepuluh. Pakai susun yang lain atau taruh sisanya di luar.");
      if (j > 0 && susun[j - 1].length < 10) return tolak("Penuhi susun sebelumnya dulu, ya.");
      const baru = susun.map((s, k) => (k === j ? [...s, m] : s));
      setSusun(baru);
      if (baru[j].length === 10) ucap(`Susun ${sebut(j + 1)} sudah penuh. Isinya sepuluh.`);
    }
    const sisaAsal = asal.filter((x) => x !== m);
    setAsal(sisaAsal);
    setTerpilih(null);
    setKabar(null);
  };

  const pilih = (j: number) => {
    if (j === n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(j);
      setKabar({ teks: `Hitung susunnya sepuluh-sepuluh, lalu tambahkan balok yang lepas. ${sebut(banyakSusun)} susun berarti ${sebut(banyakSusun * 10)}.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak balok" : "Puluhan dan sisanya!") : kosong ? "Berapa balok semuanya?" : "Susun sepuluh dulu"}
        teks={`Ada ${sebut(n)} balok di nampan. Seret balok ke susun sampai penuh sepuluh, atau ketuk baloknya lalu ketuk susunnya. Penuhi susun pertama dulu, lalu susun berikutnya. Setelah semua susun penuh, taruh balok yang tersisa di kotak sisa. Lalu hitung balok seluruhnya.${akhir ? " Terakhir, ucapkan banyak balok seluruhnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex min-h-[60px] flex-wrap items-center justify-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {asal.map((m) => (
            <BendaSeret
              key={m}
              id={String(m)}
              label={`Balok ${m + 1}`}
              onKetuk={() => setTerpilih(m)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("k2a-")) taruh(m, z);
              }}
              kelas="rounded-lg"
            >
              <span className={`block rounded-lg p-0.5 ${terpilih === m ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`} style={letakMeja(m)}>
                <Balok warna={m} kelas="h-9 w-9" />
              </span>
            </BendaSeret>
          ))}
          {kosong ? (
            <span className="text-3xl" aria-hidden="true">
              ✅
            </span>
          ) : null}
        </div>
        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          {susun.map((s, j) => (
            <button
              key={`${j}-${goyang}`}
              type="button"
              data-zona={`k2a-susun-${j}`}
              aria-label={`Susun ${j + 1}, berisi ${s.length}`}
              onClick={() => {
                if (terpilih !== null) taruh(terpilih, `k2a-susun-${j}`);
                else ucap(`Susun ${sebut(j + 1)} berisi ${sebut(s.length)}.`);
              }}
              className={`block w-full rounded-3xl border-4 px-2 py-2 ${s.length >= 10 ? "border-[#16A34A] bg-[#E8F7EE]" : "border-[#A8672D] bg-[#FDE9C4]"} ${goyang > 0 && s.length >= 10 ? "igil-goyang" : ""}`}
            >
              <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
                <span>📦 Susun {j + 1}</span>
                <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{s.length} / 10</span>
              </span>
              <span className="grid grid-cols-5 gap-1">
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="flex h-9 items-center justify-center rounded-lg border-2 border-dashed border-[#A8672D]/60 bg-white/70">
                    {i < s.length ? <Balok warna={s[i]} kelas="h-7 w-7" /> : null}
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
        <button
          key={`sisa-${goyang}`}
          type="button"
          data-zona="k2a-sisa"
          aria-label={`Balok sisa, berisi ${sisa.length}`}
          onClick={() => {
            if (terpilih !== null) taruh(terpilih, "k2a-sisa");
            else ucap(`Balok sisa ada ${sebut(sisa.length)}.`);
          }}
          className="block min-h-[56px] w-full rounded-3xl border-4 border-dashed border-[#1C01A5] bg-white px-2 py-2"
        >
          <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
            <span>➕ Balok sisa (lepas)</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-2">{sisa.length}</span>
          </span>
          <span className="flex flex-wrap items-center justify-center gap-1">
            {sisa.map((m) => (
              <span key={m} className="igil-muncul">
                <Balok warna={m} kelas="h-8 w-8" />
              </span>
            ))}
          </span>
        </button>
        {kosong && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {banyakSusun} susun dan {n % 10} balok lepas. Semuanya berapa?
            </p>
            <PilihAngka opsi={pilihBilangan(n)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center">
            <Persamaan a={banyakSusun * 10} b={n % 10} c={akhir && !suara ? "?" : n} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSusunK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Balok Jadi Puluhan"
      warna="#FDBA74"
      petunjuk="Seret balok ke susun sampai penuh sepuluh. Penuhi susun pertama dulu, lalu susun berikutnya. Setelah semua susun penuh, taruh balok yang tersisa di kotak sisa. Lalu hitung semuanya. Pada soal terakhir, ucapkan banyak balok seluruhnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-susun"
      jumlahRonde={RONDE_SUSUN_K2.length}
      kunciAkhir={RONDE_SUSUN_K2[RONDE_SUSUN_K2.length - 1]}
      belumSiap="Susun semua balok dan hitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusun ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Tebak Isi Kantong Kelereng ------------------------ */

function RondeTebak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_TEBAK_K2[ronde];
  const akhir = ronde === RONDE_TEBAK_K2.length - 1;
  const [fase, setFase] = useState<0 | 1 | 2>(0);
  const [tebakan, setTebakan] = useState(20);
  const [urut, setUrut] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["k2a-tebak"] === true && akhir;
  const selisih = Math.abs(tebakan - n);
  const hasil =
    selisih === 0 ? "Tebakanmu tepat sekali!" : selisih <= 3 ? `Hampir tepat! Selisihnya hanya ${sebut(selisih)}.` : `Tebakanmu meleset ${sebut(selisih)}. Tidak apa-apa, menebak melatih perasaan bilangan.`;
  useBicara(akhir ? suara : fase === 2, `Tebakanmu ${sebut(tebakan)}. Hitunganmu ${sebut(n)}. ${hasil} Banyak kelereng seluruhnya ${sebut(n)}.`);

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
        pendek={suara ? "Hebat!" : fase === 2 ? (akhir ? "Ucapkan: jumlahnya" : "Tebakan dan hitungan!") : fase === 1 ? "Buktikan: hitung kelerengnya" : "Tebak dulu, ya"}
        teks={`Lihat kantong ini. Tebak dulu berapa banyak kelerengnya. Kira-kira ada berapa kelompok sepuluh? Atur tebakanmu dengan tombol plus dan minus, lalu tekan Tebakanku. Setelah itu, ketuk setiap kelereng satu kali untuk membuktikannya. Setiap sepuluh kelereng punya warna tepi yang sama.${akhir ? " Di akhir, ucapkan banyak kelereng sebenarnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="mx-auto max-w-[320px] rounded-b-[2.5rem] rounded-t-xl border-4 border-[#1C01A5] bg-[#E0F2FE] px-2 pb-3 pt-2">
          <div className="mx-auto mb-2 h-3 w-24 rounded-full border-2 border-[#1C01A5] bg-[#F0AB00]" aria-hidden="true" />
          <div className="flex flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: n }, (_, i) => {
              const no = urut.indexOf(i) + 1;
              return (
                <button
                  key={`${i}-${goyang === i ? "x" : "o"}`}
                  type="button"
                  disabled={fase !== 1}
                  aria-label={no ? `Kelereng ke-${no}, sudah dihitung` : "Kelereng, belum dihitung"}
                  onClick={() => ketuk(i)}
                  style={letakMeja(i)}
                  className={`relative rounded-full border-[3px] ${no ? WARNA_PULUHAN[Math.floor((no - 1) / 10) % 5] : "border-transparent"} ${goyang === i ? "igil-goyang" : ""}`}
                >
                  <Kelereng warna={i} kelas="h-9 w-9" />
                  {no ? (
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white" style={{ textShadow: `0 0 3px ${BIRU}, 0 0 3px ${BIRU}` }}>
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
              <button type="button" aria-label="Kurangi tebakan" onClick={() => setTebakan((t) => Math.max(10, t - 1))} className="h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-white text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]">
                −
              </button>
              <span className="flex h-16 w-24 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-4xl font-black text-[#1C01A5]">{tebakan}</span>
              <button type="button" aria-label="Tambah tebakan" onClick={() => setTebakan((t) => Math.min(50, t + 1))} className="h-14 w-14 rounded-2xl border-4 border-[#1C01A5] bg-white text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]">
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
            <p className="text-lg font-black text-[#1C01A5]">Hitunganku: {fase === 2 ? n : urut.length}</p>
          </div>
        )}
        {fase === 2 ? (
          <div className="igil-muncul space-y-1 rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black text-[#14532D]">
            <p>{hasil}</p>
            <p>{uraianSepuluh(n)}</p>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTebakK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tebak Isi Kantong Kelereng"
      warna="#C7D2FE"
      petunjuk="Tebak dulu berapa banyak kelereng di kantong. Atur tebakanmu, lalu hitung kelerengnya satu per satu untuk membuktikan. Setiap sepuluh kelereng punya warna tepi yang sama. Bandingkan tebakan dengan hitunganmu. Pada soal terakhir, ucapkan banyak kelereng sebenarnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2a-tebak"
      jumlahRonde={RONDE_TEBAK_K2.length}
      kunciAkhir={RONDE_TEBAK_K2[RONDE_TEBAK_K2.length - 1]}
      belumSiap="Buktikan tebakanmu dengan menghitung dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTebak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
