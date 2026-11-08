"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, Persamaan, TOMBOL_KECIL, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { Kelereng } from "./belas-a5-dasar";
import { BatangPuluhan, KantongKelereng, KubusSatuan, RakTelur, TabelNilaiTempat, Telur, sebut } from "./dasar-k2";
import { RONDE_PAPAN_K2, RONDE_RAK_K2, RONDE_TOKO_K2, RONDE_TUKAR_K2, opsiSekitar, uraiK2 } from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab B, Tahap 4 Concrete: benda nyata untuk nilai tempat. */
/* Batang puluhan dan kubus satuan (balok Dienes), kantong kelereng, rak telur.*/
/*  1 Papan Nilai Tempat (seret batang dan kubus ke kolom)                    */
/*  2 Mesin Tukar (tukar 10 satuan jadi 1 puluhan dan sebaliknya)             */
/*  3 Pesanan Toko Kelereng (seret kantong penuh dan kelereng lepas)          */
/*  4 Hitung Loncat Sepuluh (ketuk rak sepuluh-sepuluh, lalu telur lepas)     */
/* ------------------------------------------------------------------------ */

const pilihBilangan = (n: number) => opsiSekitar(n, [10, 50]);

/* --------- Permainan 1. Papan Nilai Tempat -------------------------------- */

function RondePapan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_PAPAN_K2[ronde];
  const { puluhan, satuan } = uraiK2(n);
  const akhir = ronde === RONDE_PAPAN_K2.length - 1;
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [pilihSumber, setPilihSumber] = useState<"p" | "s" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [goyang, setGoyang] = useState(0);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b-papan"] === true && akhir;
  useBicara(akhir ? suara : beres, `${sebut(n)} adalah ${sebut(puluhan)} puluhan dan ${sebut(satuan)} satuan. ${puluhan * 10} ditambah ${satuan} sama dengan ${n}.`);

  const tolak = (teks: string) => {
    setKabar({ teks, ok: false });
    setGoyang((g) => g + 1);
    setPilihSumber(null);
  };

  const taruh = (jenis: "p" | "s", zona: string) => {
    if (beres) return;
    if (zona !== "k2b-papan-p" && zona !== "k2b-papan-s") return;
    const kolomP = zona === "k2b-papan-p";
    if (jenis === "p" && !kolomP) return tolak("Batang puluhan harus ada di kolom Puluhan, di sebelah kiri.");
    if (jenis === "s" && kolomP) return tolak("Kubus satuan harus ada di kolom Satuan, di sebelah kanan.");
    if (jenis === "s" && s >= 9) return tolak("Satuan sudah sembilan. Sepuluh satuan bisa ditukar menjadi satu puluhan, jadi pakai batang puluhan.");
    if (jenis === "p" && p >= 5) return tolak("Papan ini paling banyak lima puluhan.");
    if (jenis === "p") setP(p + 1);
    else setS(s + 1);
    setPilihSumber(null);
    setKabar(null);
  };

  const buang = (jenis: "p" | "s") => {
    if (beres) return;
    if (jenis === "p") setP(Math.max(0, p - 1));
    else setS(Math.max(0, s - 1));
    setKabar(null);
  };

  const periksa = () => {
    if (p === puluhan && s === satuan) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    const bagian: string[] = [];
    if (p !== puluhan) bagian.push(p < puluhan ? `Puluhan kurang ${sebut(puluhan - p)}.` : `Puluhan kelebihan ${sebut(p - puluhan)}.`);
    if (s !== satuan) bagian.push(s < satuan ? `Satuan kurang ${sebut(satuan - s)}.` : `Satuan kelebihan ${sebut(s - satuan)}.`);
    setKabar({ teks: `Nilai di papanmu ${sebut(p * 10 + s)}, belum sama dengan ${sebut(n)}. ${bagian.join(" ")} Angka kiri pada ${n} adalah puluhan, angka kanan adalah satuan.`, ok: false });
  };

  const sumber = (jenis: "p" | "s") => (
    <BendaSeret
      id={jenis}
      label={jenis === "p" ? "Batang puluhan" : "Kubus satuan"}
      onKetuk={() => {
        setPilihSumber(jenis);
        ucap(jenis === "p" ? "Batang puluhan. Satu batang berisi sepuluh." : "Kubus satuan. Satu kubus bernilai satu.");
      }}
      onLepas={(_, x, y) => {
        const z = zonaDi(x, y);
        if (z) taruh(jenis, z);
      }}
      kelas="rounded-2xl"
    >
      <span className={`flex items-end gap-1 rounded-2xl border-4 bg-white px-3 py-2 ${pilihSumber === jenis ? "border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]"}`}>
        {jenis === "p" ? <BatangPuluhan kelas="h-16 w-4" /> : <KubusSatuan kelas="h-8 w-8" />}
        <span className="text-xs font-black leading-tight text-[#1C01A5]">{jenis === "p" ? "1 puluhan" : "1 satuan"}</span>
      </span>
    </BendaSeret>
  );

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangannya" : "Papanmu tepat!") : `Buat bilangan ${n}`}
        teks={`Buat bilangan ${sebut(n)} di papan nilai tempat. Seret batang puluhan ke kolom Puluhan, dan seret kubus satuan ke kolom Satuan. Atau ketuk bendanya dulu, lalu ketuk kolomnya. Ketuk benda di papan untuk mengeluarkannya. Setelah itu tekan Periksa.${akhir ? " Terakhir, ucapkan bilangan yang kamu buat." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-lg font-black text-[#1C01A5]">Buat bilangan {n}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {sumber("p")}
          {sumber("s")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              ["p", "Puluhan", "#FECACA", p],
              ["s", "Satuan", "#BFDBFE", s],
            ] as const
          ).map(([jenis, nama, warna, banyak]) => (
            <button
              key={`${jenis}-${goyang}`}
              type="button"
              data-zona={jenis === "p" ? "k2b-papan-p" : "k2b-papan-s"}
              aria-label={`Kolom ${nama}, berisi ${banyak}`}
              onClick={() => {
                if (pilihSumber !== null) taruh(pilihSumber, jenis === "p" ? "k2b-papan-p" : "k2b-papan-s");
                else ucap(`Kolom ${nama} berisi ${sebut(banyak)}.`);
              }}
              className={`igil-tanpa-tepi block min-h-[132px] rounded-3xl border-4 border-[#1C01A5] px-2 py-2 ${goyang > 0 ? "igil-goyang" : ""}`}
              style={{ backgroundColor: warna }}
            >
              <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
                <span>{nama}</span>
                <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{banyak}</span>
              </span>
              <span className="flex flex-wrap items-end justify-center gap-1">
                {jenis === "p"
                  ? Array.from({ length: p }, (_, i) => (
                      <span
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Batang puluhan ke-${i + 1}, ketuk untuk mengeluarkan`}
                        onClick={(e) => {
                          e.stopPropagation();
                          buang("p");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            buang("p");
                          }
                        }}
                        className="igil-muncul cursor-pointer"
                      >
                        <BatangPuluhan kelas="h-16 w-4" />
                      </span>
                    ))
                  : Array.from({ length: s }, (_, i) => (
                      <span
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Kubus satuan ke-${i + 1}, ketuk untuk mengeluarkan`}
                        onClick={(e) => {
                          e.stopPropagation();
                          buang("s");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            e.stopPropagation();
                            buang("s");
                          }
                        }}
                        className="igil-muncul cursor-pointer"
                      >
                        <KubusSatuan kelas="h-7 w-7" />
                      </span>
                    ))}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
          {p} puluhan + {s} satuan = {beres ? n : p * 10 + s}
        </p>
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2">
            <TabelNilaiTempat p={puluhan} s={akhir && !suara ? "?" : satuan} total={akhir && !suara ? "?" : n} kecil />
          </div>
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

export function LangkahPapanK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Papan Nilai Tempat"
      warna="#FECACA"
      petunjuk="Buat bilangan yang diminta di papan nilai tempat. Seret batang puluhan ke kolom Puluhan dan kubus satuan ke kolom Satuan. Ketuk benda di papan untuk mengeluarkannya. Lalu tekan Periksa. Pada soal terakhir, ucapkan bilangan yang kamu buat."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-papan"
      jumlahRonde={RONDE_PAPAN_K2.length}
      kunciAkhir={RONDE_PAPAN_K2[RONDE_PAPAN_K2.length - 1]}
      belumSiap="Buat bilangannya di papan dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePapan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Mesin Tukar --------------------------------------- */

function RondeTukar({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_TUKAR_K2[ronde];
  const n = d.awal[0] * 10 + d.awal[1];
  const [p, setP] = useState(d.awal[0]);
  const [s, setS] = useState(d.awal[1]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [langkah, setLangkah] = useState(0);
  const letusan = useLetusan();
  const tercapai = p === d.tujuan[0] && s === d.tujuan[1];
  useBicara(tercapai, `${sebut(n)} adalah ${sebut(p)} puluhan dan ${sebut(s)} satuan. Nilainya tetap ${sebut(n)}, walaupun cara menuliskannya berubah.`);

  const selesaiCek = (baruP: number, baruS: number) => {
    if (baruP === d.tujuan[0] && baruS === d.tujuan[1]) {
      letusan.picu();
      onBeres();
    }
  };

  const ikat = () => {
    if (tercapai) return;
    if (s < 10) {
      setKabar({ teks: `Satuannya baru ${sebut(s)}. Untuk ditukar jadi satu puluhan, harus ada sepuluh satuan.`, ok: false });
      return;
    }
    setP(p + 1);
    setS(s - 10);
    setLangkah(langkah + 1);
    setKabar(null);
    ucap("Sepuluh satuan ditukar menjadi satu puluhan.");
    selesaiCek(p + 1, s - 10);
  };

  const buka = () => {
    if (tercapai) return;
    if (p < 1) {
      setKabar({ teks: "Tidak ada puluhan yang bisa dibuka. Puluhannya sudah nol.", ok: false });
      return;
    }
    setP(p - 1);
    setS(s + 10);
    setLangkah(langkah + 1);
    setKabar(null);
    ucap("Satu puluhan dibuka menjadi sepuluh satuan.");
    selesaiCek(p - 1, s + 10);
  };

  return (
    <>
      <IgilBicara
        pendek={tercapai ? "Nilainya tetap sama!" : `Ubah jadi ${d.tujuan[0]} puluhan ${d.tujuan[1]} satuan`}
        teks={`Bilangan ini ${sebut(n)}. Ubah cara menulisnya menjadi ${sebut(d.tujuan[0])} puluhan dan ${sebut(d.tujuan[1])} satuan. Tekan Tukar Sepuluh Satuan untuk mengikat sepuluh satuan menjadi satu puluhan. Tekan Buka Satu Puluhan untuk membukanya lagi menjadi sepuluh satuan. Perhatikan, nilainya tidak pernah berubah.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Nilainya tetap {n}. Tujuan: {d.tujuan[0]} puluhan {d.tujuan[1]} satuan
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-h-[120px] rounded-3xl border-4 border-[#1C01A5] bg-[#FECACA] px-2 py-2" role="img" aria-label={`${p} batang puluhan`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Puluhan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{p}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-1">
              {Array.from({ length: p }, (_, i) => (
                <span key={i} className="igil-muncul">
                  <BatangPuluhan kelas="h-14 w-3.5" />
                </span>
              ))}
            </div>
          </div>
          <div className="min-h-[120px] rounded-3xl border-4 border-[#1C01A5] bg-[#BFDBFE] px-2 py-2" role="img" aria-label={`${s} kubus satuan`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Satuan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{s}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-0.5">
              {Array.from({ length: s }, (_, i) => (
                <span key={i} className="igil-muncul">
                  <KubusSatuan kelas="h-5 w-5" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <TabelNilaiTempat p={p} s={s} total={p * 10 + s} kecil />
        <div className="grid grid-cols-2 gap-2">
          <button type="button" aria-label="Tukar sepuluh satuan menjadi satu puluhan" onClick={ikat} className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-2 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] active:translate-y-0.5">
            🔁 Tukar 10 satuan → 1 puluhan
          </button>
          <button type="button" aria-label="Buka satu puluhan menjadi sepuluh satuan" onClick={buka} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] active:translate-y-0.5">
            🔓 Buka 1 puluhan → 10 satuan
          </button>
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]/80">Langkah tukar: {langkah}</p>
        {tercapai ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {n} = {p} puluhan + {s} satuan
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTukarK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Mesin Tukar"
      warna="#FDE68A"
      petunjuk="Ubah cara menulis bilangan dengan menukar. Tekan Tukar untuk mengikat sepuluh satuan menjadi satu puluhan. Tekan Buka untuk membuka satu puluhan menjadi sepuluh satuan. Nilai bilangannya tidak pernah berubah. Capai tujuan yang diminta."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-tukar"
      jumlahRonde={RONDE_TUKAR_K2.length}
      belumSiap="Capai tujuan tukar dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTukar ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Pesanan Toko Kelereng ----------------------------- */

function RondeToko({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_TOKO_K2[ronde];
  const akhir = ronde === RONDE_TOKO_K2.length - 1;
  const [kantong, setKantong] = useState(0);
  const [lepas, setLepas] = useState(0);
  const [pilihSumber, setPilihSumber] = useState<"k" | "l" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const total = kantong * 10 + lepas;
  const suara = panel.suara["k2b-toko"] === true && akhir;
  useBicara(akhir ? suara : beres, `Pesanan ${sebut(n)} kelereng: ${sebut(Math.floor(n / 10))} kantong penuh dan ${sebut(n % 10)} kelereng lepas. ${Math.floor(n / 10) * 10} ditambah ${n % 10} sama dengan ${n}.`);

  const taruh = (jenis: "k" | "l", zona: string) => {
    if (beres || zona !== "k2b-keranjang") return;
    if (total + (jenis === "k" ? 10 : 1) > 50) {
      setKabar({ teks: "Keranjang ini paling banyak lima puluh kelereng.", ok: false });
      return;
    }
    if (jenis === "k") setKantong(kantong + 1);
    else setLepas(lepas + 1);
    setPilihSumber(null);
    setKabar(null);
  };

  const keluarkan = (jenis: "k" | "l") => {
    if (beres) return;
    if (jenis === "k") setKantong(Math.max(0, kantong - 1));
    else setLepas(Math.max(0, lepas - 1));
    setKabar(null);
  };

  const periksa = () => {
    if (total === n && lepas < 10) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else if (total === n) {
      setKabar({ teks: "Jumlahnya sudah pas, tetapi masih ada sepuluh kelereng lepas. Ganti sepuluh kelereng lepas dengan satu kantong penuh.", ok: false });
    } else if (total < n) {
      setKabar({ teks: `Isi keranjang baru ${sebut(total)}. Pesanannya ${sebut(n)}, jadi kurang ${sebut(n - total)}. Ambil kantong penuh dulu, baru kelereng lepas.`, ok: false });
    } else {
      setKabar({ teks: `Isi keranjang ${sebut(total)}, kelebihan ${sebut(total - n)}. Ketuk kantong atau kelereng di keranjang untuk mengeluarkannya.`, ok: false });
    }
  };

  const sumber = (jenis: "k" | "l") => (
    <BendaSeret
      id={jenis}
      label={jenis === "k" ? "Kantong sepuluh kelereng" : "Kelereng lepas"}
      onKetuk={() => {
        setPilihSumber(jenis);
        ucap(jenis === "k" ? "Kantong penuh. Isinya sepuluh kelereng." : "Kelereng lepas. Satu kelereng.");
      }}
      onLepas={(_, x, y) => {
        const z = zonaDi(x, y);
        if (z) taruh(jenis, z);
      }}
      kelas="rounded-2xl"
    >
      <span className={`flex flex-col items-center rounded-2xl border-4 bg-white px-3 py-1.5 ${pilihSumber === jenis ? "border-[#F0AB00] ring-4 ring-[#F0AB00]" : "border-[#1C01A5]"}`}>
        {jenis === "k" ? <KantongKelereng kelas="h-14 w-14" /> : <Kelereng warna={2} kelas="h-9 w-9" />}
        <span className="text-xs font-black leading-tight text-[#1C01A5]">{jenis === "k" ? "kantong = 10" : "1 kelereng"}</span>
      </span>
    </BendaSeret>
  );

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak kelereng" : "Pesanan tepat!") : `Pesanan: ${n} kelereng`}
        teks={`Pak Ali memesan ${sebut(n)} kelereng. Ambil kantong penuh lebih dulu, karena satu kantong berisi sepuluh kelereng. Lalu tambahkan kelereng lepas untuk sisanya. Seret ke keranjang, atau ketuk bendanya lalu ketuk keranjang. Ketuk benda di keranjang untuk mengeluarkannya. Setelah itu tekan Periksa.${akhir ? " Terakhir, ucapkan banyak kelereng pesanan." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-lg font-black text-[#1C01A5]">Pesanan Pak Ali: {n} kelereng</p>
        <div className="flex flex-wrap items-center justify-center gap-4 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          {sumber("k")}
          {sumber("l")}
        </div>
        <button
          type="button"
          data-zona="k2b-keranjang"
          aria-label={`Keranjang, berisi ${kantong} kantong dan ${lepas} kelereng lepas`}
          onClick={() => {
            if (pilihSumber !== null) taruh(pilihSumber, "k2b-keranjang");
            else ucap(`Keranjang berisi ${sebut(total)} kelereng.`);
          }}
          className="igil-tanpa-tepi block min-h-[110px] w-full rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2"
        >
          <span className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
            <span>🧺 Keranjang</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{total}</span>
          </span>
          <span className="flex flex-wrap items-end justify-center gap-1">
            {Array.from({ length: kantong }, (_, i) => (
              <span
                key={`k${i}`}
                role="button"
                tabIndex={0}
                aria-label={`Kantong ke-${i + 1}, ketuk untuk mengeluarkan`}
                onClick={(e) => {
                  e.stopPropagation();
                  keluarkan("k");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    keluarkan("k");
                  }
                }}
                className="igil-muncul cursor-pointer"
                style={letakMeja(i)}
              >
                <KantongKelereng kelas="h-14 w-14" />
              </span>
            ))}
            {Array.from({ length: lepas }, (_, i) => (
              <span
                key={`l${i}`}
                role="button"
                tabIndex={0}
                aria-label={`Kelereng lepas ke-${i + 1}, ketuk untuk mengeluarkan`}
                onClick={(e) => {
                  e.stopPropagation();
                  keluarkan("l");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    keluarkan("l");
                  }
                }}
                className="igil-muncul cursor-pointer"
                style={letakMeja(i + 7)}
              >
                <Kelereng warna={i} kelas="h-8 w-8" />
              </span>
            ))}
          </span>
        </button>
        <p className="text-center text-xl font-black text-[#1C01A5]" aria-live="polite">
          {kantong} kantong + {lepas} lepas = {beres ? n : total}
        </p>
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2">
            <Persamaan a={kantong * 10} b={lepas} c={akhir && !suara ? "?" : n} />
          </div>
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

export function LangkahTokoK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pesanan Toko Kelereng"
      warna="#FDBA74"
      petunjuk="Pak Ali memesan kelereng. Ambil kantong penuh lebih dulu, satu kantong berisi sepuluh kelereng. Lalu tambahkan kelereng lepas untuk sisanya. Seret ke keranjang, lalu tekan Periksa. Pada soal terakhir, ucapkan banyak kelereng pesanan."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-toko"
      jumlahRonde={RONDE_TOKO_K2.length}
      kunciAkhir={RONDE_TOKO_K2[RONDE_TOKO_K2.length - 1]}
      belumSiap="Isi keranjang sesuai pesanan dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeToko ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Hitung Loncat Sepuluh ----------------------------- */

function RondeRak({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_RAK_K2[ronde];
  const n = d.rak * 10 + d.lepas;
  const akhir = ronde === RONDE_RAK_K2.length - 1;
  const [rakTerhitung, setRakTerhitung] = useState(0);
  const [lepasTerhitung, setLepasTerhitung] = useState(0);
  const [goyang, setGoyang] = useState<string | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = rakTerhitung === d.rak && lepasTerhitung === d.lepas;
  const suara = panel.suara["k2b-rak"] === true && akhir;
  useBicara(akhir ? suara : beres, `Hitung loncat sepuluh: ${Array.from({ length: d.rak }, (_, i) => sebut((i + 1) * 10)).join(", ")}. Lalu satu per satu: ${Array.from({ length: d.lepas }, (_, i) => sebut(d.rak * 10 + i + 1)).join(", ")}. Telurnya ada ${sebut(n)}.`);

  const ketukRak = (i: number) => {
    if (semua) return;
    if (i !== rakTerhitung) {
      setGoyang(`r${i}`);
      setKabar({ teks: i < rakTerhitung ? "Rak ini sudah kamu hitung. Cari rak berikutnya." : "Hitung rak dari kiri, satu per satu, jangan melompat.", ok: false });
      return;
    }
    const baru = rakTerhitung + 1;
    setRakTerhitung(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(baru * 10));
  };

  const ketukLepas = (i: number) => {
    if (semua) return;
    if (rakTerhitung < d.rak) {
      setGoyang(`l${i}`);
      setKabar({ teks: "Hitung dulu semua rak dengan loncat sepuluh. Telur lepas dihitung sesudahnya.", ok: false });
      return;
    }
    if (i !== lepasTerhitung) {
      setGoyang(`l${i}`);
      setKabar({ teks: i < lepasTerhitung ? "Telur ini sudah kamu hitung. Cari telur berikutnya." : "Hitung telur lepas dari kiri, satu per satu.", ok: false });
      return;
    }
    const baru = lepasTerhitung + 1;
    setLepasTerhitung(baru);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(d.rak * 10 + baru));
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
      setKabar({ teks: `Bilangan terakhir yang kamu sebut adalah banyak telur seluruhnya. Rak dihitung ${Array.from({ length: d.rak }, (_, i) => (i + 1) * 10).join(", ")}, lalu lanjut satu per satu.`, ok: false });
    }
  };

  const hitunganTeks = (() => {
    const bagian: string[] = [];
    for (let i = 1; i <= rakTerhitung; i += 1) bagian.push(String(i * 10));
    for (let i = 1; i <= lepasTerhitung; i += 1) bagian.push(String(d.rak * 10 + i));
    return bagian.length ? bagian.join(", ") : "…";
  })();

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: banyak telur" : "Hitunganmu tepat!") : semua ? "Berapa telur semuanya?" : "Loncat sepuluh dulu"}
        teks={`Satu rak berisi sepuluh telur. Ketuk rak dari kiri, satu per satu, sambil menghitung loncat sepuluh: sepuluh, dua puluh, tiga puluh. Setelah itu ketuk telur lepas, dan lanjutkan menghitung satu per satu. Lalu pilih banyak telur seluruhnya.${akhir ? " Terakhir, ucapkan banyak telurnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3" role="group" aria-label="Rak telur penuh">
          {Array.from({ length: d.rak }, (_, i) => {
            const sudah = i < rakTerhitung;
            return (
              <button
                key={`${i}-${goyang === `r${i}` ? "x" : "o"}`}
                type="button"
                aria-label={sudah ? `Rak ke-${i + 1}, sudah dihitung ${(i + 1) * 10}` : `Rak ke-${i + 1}, belum dihitung`}
                onClick={() => ketukRak(i)}
                className={`igil-tanpa-tepi relative rounded-2xl border-4 px-1 py-1 ${sudah ? "border-[#16A34A] bg-[#E8F7EE]" : "border-dashed border-[#93C5FD] bg-white"} ${goyang === `r${i}` ? "igil-goyang" : ""}`}
              >
                <span className={sudah ? "opacity-70" : ""}>
                  <RakTelur kelas="h-14 w-24" />
                </span>
                {sudah ? <span className="absolute -right-1.5 -top-2.5 flex h-7 min-w-7 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-sm font-black text-[#1C01A5]">{(i + 1) * 10}</span> : null}
              </button>
            );
          })}
        </div>
        <div className="flex min-h-[56px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2" role="group" aria-label="Telur lepas">
          {Array.from({ length: d.lepas }, (_, i) => {
            const sudah = i < lepasTerhitung;
            return (
              <button
                key={`${i}-${goyang === `l${i}` ? "x" : "o"}`}
                type="button"
                aria-label={sudah ? `Telur lepas ke-${i + 1}, sudah dihitung ${d.rak * 10 + i + 1}` : `Telur lepas ke-${i + 1}, belum dihitung`}
                onClick={() => ketukLepas(i)}
                className={`igil-tanpa-tepi relative rounded-xl border-4 px-1.5 py-1 ${sudah ? "border-[#2563EB] bg-[#DBEAFE]" : "border-dashed border-[#93C5FD] bg-white"} ${goyang === `l${i}` ? "igil-goyang" : ""}`}
                style={letakMeja(i)}
              >
                <Telur kelas="h-9 w-8" />
                {sudah ? <span className="absolute -right-1.5 -top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-1 text-xs font-black text-[#1C01A5]">{d.rak * 10 + i + 1}</span> : null}
              </button>
            );
          })}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          Hitunganku: {hitunganTeks}
        </p>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa telur semuanya?</p>
            <PilihAngka opsi={pilihBilangan(n)} keliru={salah} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <div className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2">
            <Persamaan a={d.rak * 10} b={d.lepas} c={akhir && !suara ? "?" : n} />
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahRakK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Hitung Loncat Sepuluh"
      warna="#C7D2FE"
      petunjuk="Satu rak berisi sepuluh telur. Ketuk rak dari kiri sambil menghitung loncat sepuluh. Lalu ketuk telur lepas dan hitung satu per satu. Setelah itu pilih banyak telur seluruhnya. Pada soal terakhir, ucapkan banyak telurnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-rak"
      jumlahRonde={RONDE_RAK_K2.length}
      kunciAkhir={RONDE_RAK_K2[RONDE_RAK_K2.length - 1].rak * 10 + RONDE_RAK_K2[RONDE_RAK_K2.length - 1].lepas}
      belumSiap="Hitung semua rak dan telur dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeRak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
