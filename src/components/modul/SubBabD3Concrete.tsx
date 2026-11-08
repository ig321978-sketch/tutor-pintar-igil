"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { BAJU_SISWA, BolaSVG, BurungSVG, KardusSVG, KelerengSVG, RAMBUT_SISWA, SiswaSVG } from "./gambar-soal-cerita-d3";
import { GameRonde, IgilBicara, PilihAngka, kataK, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { opsiKurang, ucapKurang } from "./SubBabA3Pengurangan";
import { KabarChip, Letusan, useLetusan, kata, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { Kurang, Rangkai, kurangTok } from "./soal-cerita-d3-umum";
import { ALAS, BendaSeret, PitaTahap, SuaraCtx, useBicara, zonaDi } from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Bab 3 Sub-Bab D, Tahap 4: Concrete. Empat permainan dengan benda nyata.    */
/*  1 Burung Terbang (ketuk), 2 Siswa Pergi dari Kelas (ketuk yang tinggal),  */
/*  3 Bola ke Dalam Kardus (seret), 4 Kelereng untuk Dua Teman (beri dua kali) */
/* ------------------------------------------------------------------------ */

type Props = { ronde: number; panel: PanelSuara; onBeres: () => void };

/* --------- Permainan 1. Burung Terbang (hlm. 106) ------------------------- */

const RONDE_BURUNG = [
  { mula: 8, pergi: 2 },
  { mula: 7, pergi: 3 },
  { mula: 9, pergi: 4 },
];

function RondeBurung({ ronde, panel, onBeres }: Props) {
  const d = RONDE_BURUNG[ronde];
  const sisa = d.mula - d.pergi;
  const [nTerbang, setNTerbang] = useState(0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_BURUNG.length - 1;
  const semua = nTerbang === d.pergi;
  const suara = panel.suara["d3-burung"] === true && akhir;
  const buka = akhir ? suara : benar;
  useBicara(buka, `${ucapKurang(d.mula, d.pergi, sisa)}. Sekarang ada ${kataK(sisa)} burung tersisa.`);

  const terbangkan = () => {
    if (semua) return;
    const n = nTerbang + 1;
    setNTerbang(n);
    setKabar(null);
    if (n === d.pergi && akhir) {
      letusan.picu();
      onBeres();
    }
  };
  const pilih = (n: number) => {
    if (benar) return;
    if (n === sisa) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung burung yang masih hinggap di dahan.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={buka ? "Hebat!" : semua ? (akhir ? "Ucapkan: sisa burung" : "Berapa sisanya?") : `Ketuk ${d.pergi} burung!`}
        teks={`Mula-mula ada ${kataK(d.mula)} burung di pohon. Sebanyak ${kataK(d.pergi)} burung akan terbang. Ketuk burungnya satu per satu supaya terbang. Setelah itu hitung burung yang masih hinggap.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Mula-mula {d.mula} burung. {d.pergi} burung terbang.
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#DFF1FF] px-2 pb-2 pt-1">
          <p className="text-[11px] font-black uppercase text-[#1C01A5]/70">☁️ Langit · terbang {nTerbang}</p>
          <div className="flex min-h-[46px] flex-wrap items-end justify-center gap-1">
            {Array.from({ length: nTerbang }, (_, i) => (
              <span key={i} className="igil-muncul">
                <BurungSVG kelas="h-9 w-9" terbang />
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#E7F8E1] px-2 pb-1 pt-1">
          <p className="text-[11px] font-black uppercase text-[#1C01A5]/70">🌳 Dahan pohon</p>
          <div className="flex min-h-[52px] flex-wrap items-end justify-center gap-1">
            {Array.from({ length: d.mula - nTerbang }, (_, i) => (
              <button
                key={i}
                type="button"
                disabled={semua}
                aria-label={`Burung ke-${i + 1} di dahan, ketuk supaya terbang`}
                onClick={terbangkan}
                className="igil-tanpa-tepi rounded-xl px-0.5 active:scale-90"
              >
                <BurungSVG kelas="h-11 w-11" />
              </button>
            ))}
          </div>
          <div className="mx-auto mt-0.5 h-2.5 rounded-full bg-[#8A5322]" />
        </div>
        {semua ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <Kurang a={d.mula} b={d.pergi} c={buka ? sisa : "?"} nyala={buka ? [] : [4]} />
            </div>
            {!akhir && !benar ? (
              <>
                <p className="text-center text-sm font-black text-[#1C01A5]">Berapa burung yang masih di pohon?</p>
                <PilihAngka opsi={opsiKurang(sisa)} keliru={keliru} onPilih={pilih} />
              </>
            ) : null}
            {buka ? <p className="text-center text-base font-black text-[#14532D]">Sisa {sisa} burung ✅</p> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahBurung({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Burung Terbang"
      warna="#BAE6FD"
      petunjuk="Ada burung di dahan pohon. Ketuk burung satu per satu supaya terbang sebanyak yang ada di soal. Lalu hitung burung yang masih hinggap. Pada soal terakhir, ucapkan sisa burung di pohon."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-burung"
      jumlahRonde={RONDE_BURUNG.length}
      kunciAkhir={5}
      belumSiap="Terbangkan semua burungnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBurung ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Siswa Pergi dari Kelas (hlm. 107) ----------------- */

const RONDE_SISWA = [
  { total: 7, tinggal: 5 },
  { total: 9, tinggal: 6 },
  { total: 8, tinggal: 3 },
];

function RondeSiswa({ ronde, panel, onBeres }: Props) {
  const d = RONDE_SISWA[ronde];
  const pergi = d.total - d.tinggal;
  const [tinggal, setTinggal] = useState<boolean[]>(() => Array.from({ length: d.total }, () => false));
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_SISWA.length - 1;
  const nTinggal = tinggal.filter(Boolean).length;
  const siap = nTinggal === d.tinggal;
  const suara = panel.suara["d3-siswa"] === true && akhir;
  const buka = akhir ? suara : benar;
  useBicara(buka, `${ucapKurang(d.total, d.tinggal, pergi)}. Ada ${kataK(pergi)} siswa yang pergi.`);

  const ketuk = (i: number) => {
    if (siap && !tinggal[i]) return;
    if (siap && akhir) return;
    if (benar) return;
    const baru = tinggal.slice();
    if (!baru[i] && nTinggal >= d.tinggal) return;
    baru[i] = !baru[i];
    setTinggal(baru);
    setKabar(null);
    if (baru.filter(Boolean).length === d.tinggal && akhir) {
      letusan.picu();
      onBeres();
    }
  };
  const pilih = (n: number) => {
    if (benar) return;
    if (n === pergi) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung siswa yang keluar lewat pintu.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={buka ? "Hebat!" : siap ? (akhir ? "Ucapkan: yang pergi" : "Berapa yang pergi?") : `Ketuk ${d.tinggal} siswa yang tinggal`}
        teks={`Di kelas ada ${kataK(d.total)} siswa. ${kata(d.tinggal)} siswa masih di kelas. Ketuk siswa yang masih di kelas. Siswa yang lain pergi lewat pintu. Lalu hitung berapa yang pergi.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Ada {d.total} siswa. {d.tinggal} masih di kelas.
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7ED] px-2 pb-2 pt-1">
          <p className="text-[11px] font-black uppercase text-[#1C01A5]/70">🏫 Di kelas · tinggal {nTinggal}</p>
          <div className="flex min-h-[64px] flex-wrap items-end justify-center gap-1">
            {tinggal.map((t, i) =>
              siap && !t ? null : (
                <button
                  key={i}
                  type="button"
                  aria-pressed={t}
                  aria-label={`Siswa ke-${i + 1}, ${t ? "tinggal di kelas" : "belum dipilih"}`}
                  onClick={() => ketuk(i)}
                  className={`rounded-xl border-4 px-0.5 pt-0.5 ${t ? "border-[#16A34A] bg-[#DCFCE7]" : "border-transparent"}`}
                >
                  <SiswaSVG baju={BAJU_SISWA[i % BAJU_SISWA.length]} rambut={RAMBUT_SISWA[i % RAMBUT_SISWA.length]} />
                </button>
              )
            )}
          </div>
        </div>
        {siap ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-3xl border-4 border-dashed border-[#F0AB00] bg-[#FFF8D6] px-2 pb-2 pt-1">
              <p className="text-[11px] font-black uppercase text-[#1C01A5]/70">🚪 Pergi lewat pintu</p>
              <div className="flex min-h-[64px] flex-wrap items-end justify-center gap-1">
                {tinggal.map((t, i) =>
                  t ? null : (
                    <span key={i} className="igil-muncul opacity-70">
                      <SiswaSVG baju={BAJU_SISWA[i % BAJU_SISWA.length]} rambut={RAMBUT_SISWA[i % RAMBUT_SISWA.length]} />
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <Kurang a={d.total} b={d.tinggal} c={buka ? pergi : "?"} nyala={buka ? [] : [4]} />
            </div>
            {!akhir && !benar ? (
              <>
                <p className="text-center text-sm font-black text-[#1C01A5]">Berapa siswa yang pergi?</p>
                <PilihAngka opsi={opsiKurang(pergi)} keliru={keliru} onPilih={pilih} />
              </>
            ) : null}
            {buka ? <p className="text-center text-base font-black text-[#14532D]">{pergi} siswa pergi ✅</p> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahSiswa({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Siswa Pergi dari Kelas"
      warna="#FDE68A"
      petunjuk="Ada beberapa siswa di kelas. Ketuk siswa yang masih tinggal di kelas. Siswa yang lain pergi lewat pintu. Lalu hitung siswa yang pergi. Pada soal terakhir, ucapkan banyak siswa yang pergi."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-siswa"
      jumlahRonde={RONDE_SISWA.length}
      kunciAkhir={5}
      belumSiap="Pilih siswa yang tinggal dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSiswa ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Bola ke Dalam Kardus (hlm. 107) ------------------- */

const RONDE_KARDUS = [
  { total: 10, luar: 3 },
  { total: 9, luar: 4 },
  { total: 8, luar: 5 },
];

function RondeKardus({ ronde, panel, onBeres }: Props) {
  const d = RONDE_KARDUS[ronde];
  const dalam = d.total - d.luar;
  const [nMasuk, setNMasuk] = useState(0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_KARDUS.length - 1;
  const siap = nMasuk === dalam;
  const suara = panel.suara["d3-kardus"] === true && akhir;
  const buka = akhir ? suara : benar;
  useBicara(buka, `${ucapKurang(d.total, d.luar, dalam)}. Ada ${kataK(dalam)} bola di dalam kardus.`);

  const masukkan = () => {
    if (siap) return;
    const n = nMasuk + 1;
    setNMasuk(n);
    setKabar(null);
    if (n === dalam && akhir) {
      letusan.picu();
      onBeres();
    }
  };
  const pilih = (n: number) => {
    if (benar) return;
    if (n === dalam) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Hitung bola yang ada di dalam kardus.", ok: false });
    }
  };
  const diLantai = d.total - nMasuk;

  return (
    <>
      <IgilBicara
        pendek={buka ? "Hebat!" : siap ? (akhir ? "Ucapkan: bola di kardus" : "Berapa di dalam?") : "Seret bola ke kardus!"}
        teks={`Kira mempunyai ${kataK(d.total)} bola. Seret bola ke dalam kardus sampai yang tertinggal di luar hanya ${kataK(d.luar)}. Ketuk bola juga boleh. Lalu hitung bola di dalam kardus.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Ada {d.total} bola. Sisakan {d.luar} bola di luar.
        </p>
        <div className="rounded-3xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
          <p className="text-[11px] font-black uppercase text-[#1C01A5]/70">⚽ Di luar · {diLantai}</p>
          <div className="flex min-h-[52px] flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: diLantai }, (_, i) => (
              <BendaSeret
                key={`${nMasuk}-${i}`}
                id={`b${i}`}
                aktif={!siap}
                label={`Bola ke-${i + 1} di luar kardus, seret atau ketuk untuk memasukkan ke kardus`}
                onKetuk={masukkan}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "d3-kardus") masukkan();
                }}
              >
                <BolaSVG kelas="h-11 w-11" />
              </BendaSeret>
            ))}
            {diLantai === 0 ? <span className="text-2xl">✅</span> : null}
          </div>
        </div>
        <div
          data-zona="d3-kardus"
          aria-label={`Kardus berisi ${nMasuk} bola`}
          className="relative flex flex-col items-center rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7ED] px-2 pb-2 pt-1"
        >
          <p className="self-start text-[11px] font-black uppercase text-[#1C01A5]/70">📦 Dalam kardus · {nMasuk}</p>
          <div className="relative z-0 flex min-h-[28px] flex-wrap items-end justify-center gap-0.5 translate-y-4">
            {Array.from({ length: nMasuk }, (_, i) => (
              <span key={i} className="igil-muncul">
                <BolaSVG kelas="h-8 w-8" />
              </span>
            ))}
          </div>
          <KardusSVG kelas="relative z-10 h-20 w-[120px]" />
        </div>
        {siap ? (
          <div className="igil-muncul space-y-2">
            <div className="rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2">
              <Kurang a={d.total} b={d.luar} c={buka ? dalam : "?"} nyala={buka ? [] : [4]} />
            </div>
            {!akhir && !benar ? (
              <>
                <p className="text-center text-sm font-black text-[#1C01A5]">Berapa bola di dalam kardus?</p>
                <PilihAngka opsi={opsiKurang(dalam)} keliru={keliru} onPilih={pilih} />
              </>
            ) : null}
            {buka ? <p className="text-center text-base font-black text-[#14532D]">{dalam} bola di dalam kardus ✅</p> : null}
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKardus({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Bola ke Dalam Kardus"
      warna="#FED7AA"
      petunjuk="Kira mempunyai beberapa bola. Seret bola ke dalam kardus sampai di luar kardus hanya tersisa sebanyak yang tertulis. Lalu hitung bola di dalam kardus. Pada soal terakhir, ucapkan banyak bola di dalam kardus."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-kardus"
      jumlahRonde={RONDE_KARDUS.length}
      kunciAkhir={3}
      belumSiap="Masukkan bola ke kardus dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKardus ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kelereng untuk Dua Teman (hlm. 108) --------------- */

const RONDE_KELERENG = [
  { mula: 9, a: 2, b: 4 },
  { mula: 10, a: 3, b: 2 },
  { mula: 8, a: 3, b: 4 },
];
const WARNA_KELERENG = ["#EF4444", "#38BDF8", "#FACC15", "#22C55E"];

function RondeKelereng({ ronde, panel, onBeres }: Props) {
  const d = RONDE_KELERENG[ronde];
  const tengah = d.mula - d.a;
  const sisa = d.mula - d.a - d.b;
  const [nKira, setNKira] = useState(0);
  const [nUpe, setNUpe] = useState(0);
  const [benar, setBenar] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const akhir = ronde === RONDE_KELERENG.length - 1;
  const tahap = nKira < d.a ? 0 : nUpe < d.b ? 1 : 2;
  const suara = panel.suara["d3-kelereng"] === true && akhir;
  const buka = akhir ? suara : benar;
  useBicara(
    buka,
    `${ucapKurang(d.mula, d.a, tengah)}. ${ucapKurang(tengah, d.b, sisa)}. Sisa kelereng Malosi ada ${kataK(sisa)}.`
  );

  const beri = () => {
    if (tahap === 2) return;
    setKabar(null);
    if (tahap === 0) {
      setNKira(nKira + 1);
      return;
    }
    const n = nUpe + 1;
    setNUpe(n);
    if (n === d.b && akhir) {
      letusan.picu();
      onBeres();
    }
  };
  const pilih = (n: number) => {
    if (benar) return;
    if (n === sisa) {
      setBenar(true);
      setKeliru(null);
      setKabar(null);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(n);
      setKabar({ teks: "Belum tepat. Kurangi dua kali: dulu untuk Kira, lalu untuk Upe.", ok: false });
    }
  };
  const diKantong = d.mula - nKira - nUpe;

  return (
    <>
      <IgilBicara
        pendek={buka ? "Hebat!" : tahap === 2 ? (akhir ? "Ucapkan: sisa kelereng" : "Berapa sisanya?") : tahap === 0 ? `Beri Kira ${d.a}` : `Beri Upe ${d.b}`}
        teks={`Malosi mempunyai ${kataK(d.mula)} kelereng. Malosi memberi Kira ${kataK(d.a)} kelereng. Lalu Malosi memberi Upe ${kataK(d.b)} kelereng. Ketuk kelereng untuk memberikannya. Mulai dari Kira, lalu Upe. Setelah itu hitung sisa kelereng Malosi.`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <p className="text-center text-sm font-black text-[#1C01A5]">
          Malosi punya {d.mula} kelereng. Beri Kira {d.a}, beri Upe {d.b}.
        </p>
        <div className="rounded-3xl border-4 border-[#1C01A5] bg-[#F0FDF4] px-2 pb-2 pt-1">
          <p className="text-[11px] font-black uppercase text-[#1C01A5]/70">👦 Kantong Malosi · {diKantong}</p>
          <div className="flex min-h-[44px] flex-wrap items-center justify-center gap-1">
            {Array.from({ length: diKantong }, (_, i) => (
              <button
                key={i}
                type="button"
                disabled={tahap === 2}
                aria-label={`Kelereng ke-${i + 1}, ketuk untuk memberikan kepada ${tahap === 0 ? "Kira" : "Upe"}`}
                onClick={beri}
                className="igil-tanpa-tepi active:scale-90"
              >
                <KelerengSVG warna={WARNA_KELERENG[(i + nKira + nUpe) % 4]} kelas="h-9 w-9" />
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className={`rounded-2xl border-4 px-2 py-1 ${tahap === 0 ? "border-[#F0AB00] bg-[#FFF8D6]" : "border-[#1C01A5] bg-white"}`}>
            <p className="text-xs font-black text-[#1C01A5]">👧 Kira · {nKira}</p>
            <div className="flex min-h-[32px] flex-wrap gap-0.5">
              {Array.from({ length: nKira }, (_, i) => (
                <span key={i} className="igil-muncul">
                  <KelerengSVG warna={WARNA_KELERENG[i % 4]} kelas="h-6 w-6" />
                </span>
              ))}
            </div>
          </div>
          <div className={`rounded-2xl border-4 px-2 py-1 ${tahap === 1 ? "border-[#F0AB00] bg-[#FFF8D6]" : "border-[#1C01A5] bg-white"}`}>
            <p className="text-xs font-black text-[#1C01A5]">🧒 Upe · {nUpe}</p>
            <div className="flex min-h-[32px] flex-wrap gap-0.5">
              {Array.from({ length: nUpe }, (_, i) => (
                <span key={i} className="igil-muncul">
                  <KelerengSVG warna={WARNA_KELERENG[(i + 2) % 4]} kelas="h-6 w-6" />
                </span>
              ))}
            </div>
          </div>
        </div>
        {tahap >= 1 ? (
          <div className="igil-muncul space-y-1.5 rounded-2xl border-4 border-dashed border-[#9CA3AF] bg-white px-2 py-2 text-center">
            <p className="text-xs font-black text-[#1C01A5]/70">Kurangi dua kali</p>
            <Rangkai tok={kurangTok(d.mula, d.a, tengah)} />
            {tahap === 2 ? <Rangkai tok={[tengah, "−", d.b, "=", buka ? sisa : "?"]} nyala={buka ? [] : [4]} /> : null}
          </div>
        ) : null}
        {tahap === 2 && !akhir && !benar ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">Berapa kelereng sisa Malosi?</p>
            <PilihAngka opsi={opsiKurang(sisa)} keliru={keliru} onPilih={pilih} />
          </div>
        ) : null}
        {buka ? <p className="text-center text-base font-black text-[#14532D]">Sisa {sisa} kelereng ✅</p> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function LangkahKelereng({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameRonde
      nomor={nomor}
      judul="Kelereng untuk Dua Teman"
      warna="#DDD6FE"
      petunjuk="Malosi memberi kelereng kepada dua teman. Ketuk kelereng untuk memberi Kira dulu, lalu Upe. Setelah itu kurangi dua kali dan hitung sisa kelereng Malosi. Pada soal terakhir, ucapkan sisa kelereng Malosi."
      speakGuru={speakGuru}
      panel={panel}
      id="d3-kelereng"
      jumlahRonde={RONDE_KELERENG.length}
      kunciAkhir={1}
      belumSiap="Beri kelereng untuk Kira dan Upe dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKelereng ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Pembungkus Concrete -------------------------------------------- */

type TipeConcrete = "burung" | "siswa" | "kardus" | "kelereng";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "burung" },
  { nomor: 2, tipe: "siswa" },
  { nomor: 3, tipe: "kardus" },
  { nomor: 4, tipe: "kelereng" },
];

export function ConcreteSoalCeritaD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <ConcreteIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function ConcreteIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const langkah = LANGKAH_CONCRETE[indeks];
  const terakhir = indeks >= LANGKAH_CONCRETE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: langkah.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE PICTURE ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Ketuk, seret, dan beri!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "burung" ? <LangkahBurung {...dasar} /> : null}
        {langkah.tipe === "siswa" ? <LangkahSiswa {...dasar} /> : null}
        {langkah.tipe === "kardus" ? <LangkahKardus {...dasar} /> : null}
        {langkah.tipe === "kelereng" ? <LangkahKelereng {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}
