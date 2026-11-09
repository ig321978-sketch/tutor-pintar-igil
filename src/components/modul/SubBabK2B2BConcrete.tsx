"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";
import { BatangPuluhan, KubusSatuan, sebut } from "./dasar-k2";
import { BarisJambu, JambuAir, KotakSoal } from "./dasar-k2b2";
import { Berhasil, PilihanAngka, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { RONDE_BERI_B, RONDE_SELISIH_B, RONDE_TAMBAHPAS_B, RONDE_URAI_B, opsiB2, puluhanDari, satuanDari } from "./data-k2b2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab B, Tahap 4 Concrete: benda nyata untuk pengurangan.   */
/*  1 Beri Jambu ke Lili (seret jambu, hitung mundur)                         */
/*  2 Pasangkan Selisih (pasangkan satu-satu)                                 */
/*  3 Urai Satu Puluhan (balok Dienes, satuan tidak cukup)                    */
/*  4 Tambah Sampai Pas (menghitung maju untuk mencari selisih)               */
/* ------------------------------------------------------------------------ */

type Ronde = { ronde: number; panel: PanelSuara; onBeres: () => void };

/* --------- Permainan 1. Beri Jambu ke Lili -------------------------------- */

function RondeBeri({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_BERI_B[ronde];
  const akhir = ronde === RONDE_BERI_B.length - 1;
  const [diberi, setDiberi] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2b-beri"] === true && akhir;
  const cukup = diberi >= b;
  useBicara(akhir ? suara : beres, `${sebut(a)} dikurangi ${sebut(b)} sama dengan ${sebut(a - b)}. Kita menghitung mundur dari ${sebut(a)}.`);

  const beri = () => {
    if (beres) return;
    if (cukup) {
      setKabar({ teks: `Cukup! Lili hanya menerima ${sebut(b)} jambu. Sekarang hitung sisa jambu Tika.`, ok: false });
      return;
    }
    const n = diberi + 1;
    setDiberi(n);
    setKabar(null);
    ucap(sebut(a - n));
  };
  const jawab = (n: number) => {
    if (n === a - b) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Mulai dari ${sebut(a)}, hitung mundur ${sebut(b)} kali. Dengarkan hitungan saat jambu diberikan.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: sisanya" : "Hitung mundurmu tepat!") : cukup ? "Berapa sisanya?" : `Beri ${b} jambu ke Lili`}
        teks={`Tika punya ${sebut(a)} jambu air. Tika memberikan ${sebut(b)} jambu kepada Lili. Seret jambu dari keranjang Tika ke piring Lili, satu per satu, atau ketuk jambunya. Dengarkan hitungan mundurnya. Setelah cukup, pilih sisa jambu Tika.${akhir ? " Terakhir, ucapkan sisanya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {a} − {b} = ?
        </KotakSoal>
        <div className="rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2" role="group" aria-label={`Keranjang Tika berisi ${a - diberi} jambu`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#7C2D12]">
            <span>🧺 Keranjang Tika</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{a - diberi}</span>
          </p>
          <div className="flex min-h-[60px] flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: a - diberi }, (_, i) => (
              <BendaSeret key={`${diberi}-${i}`} id={`j-${i}`} label={`Jambu Tika, beri ke Lili`} onKetuk={beri} onLepas={(_, x, y) => (zonaDi(x, y) === "k2b2b-lili" ? beri() : undefined)} kelas="rounded-lg">
                <JambuAir kelas="h-7 w-7" />
              </BendaSeret>
            ))}
          </div>
        </div>
        <div data-zona="k2b2b-lili" className="rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2" role="group" aria-label={`Piring Lili berisi ${diberi} jambu`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#831843]">
            <span>🍽️ Piring Lili</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{diberi}</span>
          </p>
          <div className="min-h-[44px]">{diberi > 0 ? <BarisJambu n={diberi} kelas="h-6 w-6" sorot={[diberi - 1]} /> : <p className="py-2 text-center text-sm font-black text-[#831843]/70">Seret jambu ke sini</p>}</div>
        </div>
        <p className="text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
          Hitung mundur: {a}
          {Array.from({ length: diberi }, (_, i) => ` → ${a - i - 1}`).join("")}
        </p>
        {cukup && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa sisa jambu Tika?</p>
            <PilihanAngka opsi={opsiB2(a - b)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {a} − {b} = {akhir && !suara ? "?" : a - b}. Hitung mundur dari {a}.
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBeriK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_BERI_B[RONDE_BERI_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Beri Jambu ke Lili"
      warna="#FBCFE8"
      petunjuk="Seret jambu dari keranjang Tika ke piring Lili, satu per satu, sebanyak yang diberikan. Dengarkan hitungan mundurnya. Lalu pilih sisa jambu Tika. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-beri"
      jumlahRonde={RONDE_BERI_B.length}
      kunciAkhir={akhir.a - akhir.b}
      belumSiap="Beri jambu ke Lili dan pilih sisanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBeri ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Pasangkan Selisih --------------------------------- */

function RondeSelisih({ ronde, panel, onBeres }: Ronde) {
  const { besar, kecil } = RONDE_SELISIH_B[ronde];
  const selisih = besar - kecil;
  const akhir = ronde === RONDE_SELISIH_B.length - 1;
  const [pasang, setPasang] = useState<boolean[]>(() => Array.from({ length: kecil }, () => false));
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2b-selisih"] === true && akhir;
  const banyakPasang = pasang.filter(Boolean).length;
  const semua = banyakPasang === kecil;
  const sisaBelum = pasang.filter((x) => !x).length;
  useBicara(akhir ? suara : beres, `Jambu Kira yang tidak berpasangan ada ${sebut(selisih)}. Jadi selisih ${sebut(besar)} dan ${sebut(kecil)} adalah ${sebut(selisih)}.`);

  const pasangkan = (i: number) => {
    if (beres || pasang[i]) return;
    setPasang(pasang.map((x, j) => (j === i ? true : x)));
    setKabar(null);
  };
  const pasangkanSepuluh = () => {
    if (beres) return;
    let sisa = 10;
    setPasang(
      pasang.map((x) => {
        if (!x && sisa > 0) {
          sisa -= 1;
          return true;
        }
        return x;
      }),
    );
  };
  const jawab = (n: number) => {
    if (n === selisih) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Hitung jambu Kira yang menyala dan tidak berpasangan.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: selisihnya" : "Selisihmu tepat!") : semua ? "Berapa yang tidak berpasangan?" : "Pasangkan jambunya"}
        teks={`Kira punya ${sebut(besar)} jambu, Tika punya ${sebut(kecil)} jambu. Ketuk jambu Tika di baris bawah supaya berpasangan dengan jambu Kira di atasnya. Kalau ada sepuluh yang bisa dipasangkan sekaligus, tekan tombol Pasangkan sepuluh. Jambu Kira yang tidak berpasangan itulah selisihnya.${akhir ? " Terakhir, ucapkan selisihnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          Jambu Kira {besar} dan jambu Tika {kecil}. Selisihnya?
        </KotakSoal>
        <div className="grid grid-cols-6 gap-x-1 gap-y-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-2" role="group" aria-label={`${banyakPasang} dari ${kecil} jambu sudah berpasangan`}>
          {Array.from({ length: besar }, (_, i) => {
            const adaPasangan = i < kecil;
            const sudah = adaPasangan && pasang[i];
            const menyala = semua && !adaPasangan;
            return (
              <div key={i} className="flex flex-col items-center">
                <span className={`rounded-lg p-0.5 ${menyala ? "igil-denyut bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : ""}`}>
                  <JambuAir kelas="h-7 w-7" warna="#DB2777" />
                </span>
                <span className={`my-0.5 block h-4 w-1 rounded-full ${sudah ? "bg-[#1C01A5]" : "bg-transparent"}`} aria-hidden="true" />
                {adaPasangan ? (
                  <button type="button" aria-label={`Pasangkan jambu Tika ke-${i + 1}${sudah ? ", sudah berpasangan" : ""}`} onClick={() => pasangkan(i)} className={`igil-tanpa-tepi rounded-lg p-0.5 ${sudah ? "bg-[#DBEAFE]" : "igil-lompat"}`}>
                    <JambuAir kelas="h-7 w-7" warna="#F59E0B" />
                  </button>
                ) : (
                  <span className="block h-8 w-8 rounded-lg border-2 border-dashed border-[#1C01A5]/25" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Atas: jambu Kira (merah muda). Bawah: jambu Tika (kuning).</p>
        {!semua && !beres ? (
          <button type="button" onClick={pasangkanSepuluh} disabled={sisaBelum < 10} className={`${TOMBOL_PUTIH} w-full`}>
            🔗 Pasangkan sepuluh sekaligus
          </button>
        ) : null}
        {semua && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Berapa jambu Kira yang tidak berpasangan?</p>
            <PilihanAngka opsi={opsiB2(selisih)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            Selisih {besar} dan {kecil} adalah {akhir && !suara ? "?" : selisih}. {besar} − {kecil} = {akhir && !suara ? "?" : selisih}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSelisihK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_SELISIH_B[RONDE_SELISIH_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Pasangkan Selisih"
      warna="#BBF7D0"
      petunjuk="Ketuk jambu Tika supaya berpasangan dengan jambu Kira. Jambu Kira yang tidak berpasangan menunjukkan selisihnya. Lalu pilih selisihnya. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-selisih"
      jumlahRonde={RONDE_SELISIH_B.length}
      kunciAkhir={akhir.besar - akhir.kecil}
      belumSiap="Pasangkan jambunya dan pilih selisihnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSelisih ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Urai Satu Puluhan --------------------------------- */

function RondeUrai({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const { a, b } = RONDE_URAI_B[ronde];
  const akhir = ronde === RONDE_URAI_B.length - 1;
  const [p, setP] = useState(puluhanDari(a));
  const [s, setS] = useState(satuanDari(a));
  const [diberi, setDiberi] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [goyang, setGoyang] = useState(0);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2b-urai"] === true && akhir;
  const kurang = b - diberi;
  const cukup = diberi >= b;
  const perluUrai = s < kurang && p > 0;
  useBicara(akhir ? suara : beres, `${sebut(a)} dikurangi ${sebut(b)} sama dengan ${sebut(a - b)}.`);

  const beri = (zona?: string | null) => {
    if (beres) return;
    if (zona !== undefined && zona !== "k2b2b-urai-lili") return;
    if (cukup) {
      setKabar({ teks: `Cukup! Lili menerima ${sebut(b)} kubus. Sekarang hitung sisanya.`, ok: false });
      return;
    }
    if (s === 0) {
      setGoyang((g) => g + 1);
      setKabar({ teks: "Satuannya habis. Urai satu puluhan menjadi sepuluh satuan dulu.", ok: false });
      return;
    }
    setS(s - 1);
    setDiberi(diberi + 1);
    setKabar(null);
  };
  const urai = () => {
    if (!perluUrai) {
      setKabar({ teks: p === 0 ? "Puluhannya sudah nol, tidak ada yang bisa diurai." : "Satuannya masih cukup, jadi belum perlu diurai.", ok: false });
      return;
    }
    setP(p - 1);
    setS(s + 10);
    setKabar(null);
    ucap(`Satu puluhan diurai menjadi sepuluh satuan. Sekarang ada ${sebut(s + 10)} satuan.`);
  };
  const sisa = p * 10 + s;
  const jawab = (n: number) => {
    if (n === a - b) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Lihat papan: ${sebut(p)} puluhan dan ${sebut(s)} satuan. Gabungkan nilainya.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: sisanya" : "Urai dan kurangmu tepat!") : cukup ? "Berapa sisanya?" : perluUrai ? "Satuan tidak cukup. Urai!" : `Beri ${b} kubus ke Lili`}
        teks={`Papan berisi bilangan ${sebut(a)}. Beri ${sebut(b)} kubus satuan kepada Lili, satu per satu. Seret kubus ke piring Lili atau ketuk kubusnya. Kalau satuan tidak cukup, tekan tombol urai supaya satu puluhan menjadi sepuluh satuan. Lalu pilih sisanya.${akhir ? " Terakhir, ucapkan sisanya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {a} − {b} = ?
        </KotakSoal>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-h-[132px] rounded-3xl border-4 border-[#1C01A5] bg-[#FECACA] px-2 py-2" role="group" aria-label={`Kolom Puluhan berisi ${p} batang`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Puluhan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{p}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-1">
              {Array.from({ length: p }, (_, i) => (
                <BatangPuluhan key={i} kelas="h-16 w-4" />
              ))}
            </div>
          </div>
          <div key={`s-${goyang}`} className={`min-h-[132px] rounded-3xl border-4 border-[#1C01A5] bg-[#BFDBFE] px-2 py-2 ${goyang > 0 ? "igil-goyang" : ""}`} role="group" aria-label={`Kolom Satuan berisi ${s} kubus`}>
            <p className="mb-1 flex items-center justify-between text-sm font-black text-[#1C01A5]">
              <span>Satuan</span>
              <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2">{s}</span>
            </p>
            <div className="flex flex-wrap items-end justify-center gap-0.5">
              {Array.from({ length: s }, (_, i) => (
                <BendaSeret key={`${s}-${i}`} id={`k-${i}`} label="Kubus satuan, beri ke Lili" onKetuk={() => beri()} onLepas={(_, x, y) => beri(zonaDi(x, y) ?? null)} kelas="rounded-lg">
                  <KubusSatuan kelas="h-8 w-8" />
                </BendaSeret>
              ))}
            </div>
          </div>
        </div>
        <div data-zona="k2b2b-urai-lili" className="rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2" role="group" aria-label={`Piring Lili berisi ${diberi} kubus`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#831843]">
            <span>🍽️ Piring Lili (butuh {b})</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{diberi}</span>
          </p>
          <div className="flex min-h-[40px] flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: diberi }, (_, i) => (
              <KubusSatuan key={i} kelas="h-6 w-6" warna="#EC4899" />
            ))}
            {diberi === 0 ? <span className="text-sm font-black text-[#831843]/70">Seret kubus ke sini</span> : null}
          </div>
        </div>
        {!cukup && !beres ? (
          <button type="button" onClick={urai} className={`${TOMBOL_BESAR} w-full ${perluUrai ? "igil-lompat !bg-[#F0AB00]" : ""}`}>
            🧱 Urai 1 puluhan jadi 10 satuan
          </button>
        ) : null}
        {cukup && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">
              {p} puluhan dan {s} satuan. Berapa sisanya?
            </p>
            <PilihanAngka opsi={opsiB2(a - b)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {a} − {b} = {akhir && !suara ? "?" : sisa}. {perluUrai || a % 10 < b % 10 ? "Satu puluhan sudah diurai." : "Satuannya cukup, tidak perlu urai."}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahUraiK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_URAI_B[RONDE_URAI_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Urai Satu Puluhan"
      warna="#FECACA"
      petunjuk="Beri kubus satuan kepada Lili, satu per satu. Kalau satuan tidak cukup, tekan tombol urai supaya satu puluhan menjadi sepuluh satuan. Lalu pilih sisanya. Satuan yang masih cukup tidak perlu diurai. Pada soal terakhir, ucapkan sisanya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-urai"
      jumlahRonde={RONDE_URAI_B.length}
      kunciAkhir={akhir.a - akhir.b}
      belumSiap="Beri kubus ke Lili dan pilih sisanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeUrai ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Tambah Sampai Pas --------------------------------- */

function RondeTambahPas({ ronde, panel, onBeres }: Ronde) {
  const ucap = useContext(SuaraCtx);
  const { kecil, besar } = RONDE_TAMBAHPAS_B[ronde];
  const selisih = besar - kecil;
  const akhir = ronde === RONDE_TAMBAHPAS_B.length - 1;
  const [k, setK] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b2b-tambahpas"] === true && akhir;
  const pas = kecil + k === besar;
  useBicara(akhir ? suara : beres, `Dari ${sebut(kecil)} ditambah ${sebut(selisih)} sampai ${sebut(besar)}. Jadi ${sebut(besar)} dikurangi ${sebut(kecil)} sama dengan ${sebut(selisih)}.`);

  const tambah = () => {
    if (pas || beres) return;
    const n = k + 1;
    setK(n);
    setKabar(null);
    ucap(sebut(kecil + n));
  };
  const jawab = (n: number) => {
    if (n === selisih) {
      setBeres(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: `Hitung jambu baru yang menyala. Dari ${sebut(kecil)} sampai ${sebut(besar)}.`, ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: selisihnya" : "Tambahmu pas!") : pas ? "Berapa kali menambah?" : "Tambah sampai pas"}
        teks={`Keranjang Tika berisi ${sebut(kecil)} jambu. Keranjang Kira berisi ${sebut(besar)} jambu. Tekan tombol tambah satu jambu sampai keranjang Tika sama banyak dengan keranjang Kira. Dengarkan hitungannya, dan perhatikan berapa jambu baru yang menyala. Itulah selisihnya.${akhir ? " Terakhir, ucapkan selisihnya." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <KotakSoal>
          {besar} − {kecil} = ?
        </KotakSoal>
        <div className="rounded-3xl border-4 border-[#DB2777] bg-[#FDF2F8] px-2 py-2" role="group" aria-label={`Keranjang Kira berisi ${besar} jambu`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#831843]">
            <span>🧺 Keranjang Kira (target)</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{besar}</span>
          </p>
          <BarisJambu n={besar} kelas="h-5 w-5" warna="#DB2777" />
        </div>
        <div className="rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2" role="group" aria-label={`Keranjang Tika berisi ${kecil + k} jambu`}>
          <p className="mb-1 flex items-center justify-between text-xs font-black text-[#7C2D12]">
            <span>🧺 Keranjang Tika</span>
            <span className="rounded-full border-2 border-[#1C01A5] bg-white px-2 text-sm text-[#1C01A5]">{kecil + k}</span>
          </p>
          <span className="flex flex-wrap items-center justify-center gap-0.5">
            {Array.from({ length: besar }, (_, i) => (
              <span key={i} className={i < kecil ? "" : i < kecil + k ? "igil-muncul rounded-lg bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : "opacity-20"}>
                <JambuAir kelas="h-5 w-5" warna="#F59E0B" />
              </span>
            ))}
          </span>
        </div>
        {!pas && !beres ? (
          <button type="button" onClick={tambah} className={`${TOMBOL_BESAR} w-full`}>
            ➕ Tambah 1 jambu
          </button>
        ) : null}
        {pas && !beres ? (
          <div className="space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Keranjang sudah pas. Berapa jambu yang kamu tambahkan?</p>
            <PilihanAngka opsi={opsiB2(selisih)} keliru={keliru} onPilih={jawab} />
          </div>
        ) : null}
        {beres ? (
          <Berhasil>
            {kecil} + {akhir && !suara ? "?" : selisih} = {besar}, jadi {besar} − {kecil} = {akhir && !suara ? "?" : selisih}
          </Berhasil>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahTambahPasK2B2B({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_TAMBAHPAS_B[RONDE_TAMBAHPAS_B.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tambah Sampai Pas"
      warna="#FDE68A"
      petunjuk="Tekan tambah satu jambu sampai keranjang Tika sama banyak dengan keranjang Kira. Dengarkan hitungannya, dan perhatikan jambu baru yang menyala. Banyaknya adalah selisih. Lalu pilih selisihnya. Pada soal terakhir, ucapkan selisihnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2b-tambahpas"
      jumlahRonde={RONDE_TAMBAHPAS_B.length}
      kunciAkhir={akhir.besar - akhir.kecil}
      belumSiap="Tambah jambu sampai pas dan pilih selisihnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTambahPas ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
