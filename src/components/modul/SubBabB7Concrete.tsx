"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { BukuG, NAMA_SATUAN, PilihKata, PohonG, SatuanG, StikG, type JenisSatuan } from "./ukur-7-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 7 Sub-Bab B, Tahap 4 Concrete: benda nyata. Anak menebak lalu mengukur */
/* dengan stik es krim, menyusun sedotan di meja, menghitung dua alat ukur    */
/* yang berbeda, dan menumpuk balok setinggi pohon.                           */
/*  1 Tebak, Lalu Ukur (tebak, taruh stik es krim satu per satu)              */
/*  2 Susun Sedotan (seret sedotan dari ujung meja)                           */
/*  3 Dua Alat Ukur, Hasil Berbeda (ketuk dan hitung dua rantai)              */
/*  4 Tumpuk Balok (seret balok setinggi pohon)                               */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 1. Tebak, Lalu Ukur ---------------------------------- */

type RondeTebak = { benda: "buku" | "kotak" | "papan"; nama: string; n: number; opsi: number[] };

const RONDE_TEBAK: RondeTebak[] = [
  { benda: "buku", nama: "buku", n: 4, opsi: [3, 5, 6] },
  { benda: "kotak", nama: "kotak pensil", n: 5, opsi: [4, 6, 7] },
  { benda: "papan", nama: "papan nama", n: 6, opsi: [5, 7, 8] },
];

const SATU_STIK = 38;

function BendaUkur({ jenis, x, y, w, h }: { jenis: RondeTebak["benda"]; x: number; y: number; w: number; h: number }) {
  if (jenis === "buku") return <BukuG x={x} y={y} w={w} h={h} />;
  if (jenis === "kotak") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="0" y="0" width={w} height={h} rx="10" fill="#A78BFA" stroke={BIRU} strokeWidth="2.4" />
        <path d={`M8 ${h / 2} H${w - 8}`} stroke="#EDE9FE" strokeWidth="2.4" strokeDasharray="5 4" strokeLinecap="round" />
        <rect x={w - 26} y={h / 2 - 5} width="14" height="10" rx="3" fill="#FDE047" stroke={BIRU} strokeWidth="1.6" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="0" width={w} height={h} rx="6" fill="#C98B4E" stroke={BIRU} strokeWidth="2.4" />
      <rect x="10" y={h / 2 - 7} width={w - 20} height="14" rx="3" fill="#FDE9C4" stroke={BIRU} strokeWidth="1.6" />
      <path d={`M16 ${h / 2} H${w - 16}`} stroke={BIRU} strokeWidth="1.6" opacity="0.5" strokeLinecap="round" />
    </g>
  );
}

function RondeTebakUkur({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TEBAK[ronde];
  const akhir = ronde === RONDE_TEBAK.length - 1;
  const [tebak, setTebak] = useState<number | null>(null);
  const [taruh, setTaruh] = useState(0);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const ucap = useContext(SuaraCtx);
  const suara = panel.suara["b7-tebak"] === true && akhir;
  const x0 = (300 - d.n * SATU_STIK) / 2;
  const penuh = taruh === d.n;
  const kalimatTebak = tebak === null ? "" : tebak === d.n ? `Tebakanmu ${sebut(tebak)} tepat.` : tebak < d.n ? `Tebakanmu ${sebut(tebak)}, kurang ${sebut(d.n - tebak)} dari hasil ukur.` : `Tebakanmu ${sebut(tebak)}, lebih ${sebut(tebak - d.n)} dari hasil ukur.`;
  useBicara(akhir ? suara : beres, `Panjang ${d.nama} adalah ${sebut(d.n)} stik es krim. ${kalimatTebak}`);

  const pilihTebak = (v: number) => {
    setTebak(v);
    setKabar(null);
  };
  const taruhStik = () => {
    if (tebak === null || penuh) return;
    setTaruh((t) => t + 1);
    ucap(sebut(taruh + 1));
  };
  const pilihHasil = (v: number) => {
    if (!penuh || beres) return;
    if (v === d.n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung lagi stik es krim yang menutupi benda dari ujung kiri sampai ujung kanan.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: panjangnya" : suara ? "Hebat!" : beres ? "Ukuranmu tepat!" : tebak === null ? "Tebak dulu" : penuh ? "Berapa stik es krim?" : "Taruh stik satu per satu"}
        teks={`Berapa panjang ${d.nama} dalam stik es krim? Tebak dulu, pilih angka. Lalu taruh stik es krim satu per satu dari ujung kiri, rapat tanpa celah. Hitung semuanya, lalu pilih hasilnya.${akhir ? " Di akhir, ucapkan panjang benda itu." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 112" className="block h-auto w-full" role="img" aria-label={`${d.nama} diukur dengan stik es krim, sudah ditaruh ${taruh} stik`}>
            <path d={`M${x0} 12 V100 M${x0 + d.n * SATU_STIK} 12 V100`} stroke="#DC2626" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
            <BendaUkur jenis={d.benda} x={x0} y={22} w={d.n * SATU_STIK} h={44} />
            {Array.from({ length: taruh }, (_, i) => (
              <g key={i} className="igil-muncul">
                <StikG x={x0 + i * SATU_STIK} y={76} w={SATU_STIK} h={16} />
              </g>
            ))}
          </svg>
        </div>
        {tebak === null ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">🤔 Tebakanku: berapa stik es krim?</p>
            <PilihAngka opsi={d.opsi} keliru={null} onPilih={pilihTebak} />
          </div>
        ) : (
          <p className="text-center text-sm font-black text-[#1C01A5]">Tebakanku: {tebak} stik es krim</p>
        )}
        {tebak !== null && !penuh ? (
          <button
            type="button"
            aria-label="Taruh satu stik es krim"
            onClick={taruhStik}
            className="mx-auto flex items-center gap-2 rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-6 py-3 text-lg font-black text-[#FFE566] shadow-[0_5px_0_rgba(28,1,165,0.35)]"
          >
            ➕ Taruh stik
          </button>
        ) : null}
        {penuh && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Panjang {d.nama} = ? stik es krim</p>
            <PilihAngka opsi={opsiSekitar(d.n)} keliru={salah} onPilih={pilihHasil} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `Tebakanku ${tebak} • panjang ${d.nama} = ? stik es krim` : `Tebakanku ${tebak} • panjang ${d.nama} = ${d.n} stik es krim`}
          </p>
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
      judul="Tebak, Lalu Ukur"
      warna="#FDE68A"
      petunjuk="Mengukur dengan stik es krim. Tebak dulu berapa panjangnya. Lalu taruh stik es krim satu per satu dari ujung benda, rapat tanpa celah. Hitung stiknya dan pilih hasilnya. Pada ronde terakhir, ucapkan panjang benda dalam stik es krim."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-tebak"
      jumlahRonde={RONDE_TEBAK.length}
      kunciAkhir={RONDE_TEBAK[RONDE_TEBAK.length - 1].n}
      belumSiap="Tebak dan ukur dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTebakUkur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Susun Sedotan ------------------------------------- */

const RONDE_SUSUN = [3, 5, 4];

const WARNA_SEDOTAN = ["#60A5FA", "#F87171"];

function RondeSusunSedotan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_SUSUN[ronde];
  const akhir = ronde === RONDE_SUSUN.length - 1;
  const [terisi, setTerisi] = useState(0);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = terisi === n;
  const suara = panel.suara["b7-susun"] === true && akhir;
  useBicara(akhir ? suara : beres, `Mulai dari ujung meja, sedotan rapat, tidak bertumpuk, dan tidak miring. Panjang meja adalah ${sebut(n)} sedotan.`);

  const taruh = (k: number) => {
    if (penuh) return;
    if (k < terisi) {
      setKabar({ teks: "Tempat ini sudah terisi sedotan. Isi tempat berikutnya.", ok: false });
      return;
    }
    if (k > terisi) {
      setGoyang(k);
      setTerpilih(null);
      setKabar({ teks: "Mulai dari ujung meja dan jangan ada celah. Taruh sedotan di tempat pertama yang masih kosong.", ok: false });
      return;
    }
    setTerisi((t) => t + 1);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(sebut(k + 1));
  };

  const pilihHasil = (v: number) => {
    if (!penuh || beres) return;
    if (v === n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung sedotan yang menutupi meja satu per satu dari ujung kiri.", ok: false });
    }
  };

  const sisa = n + 2 - terisi;

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: panjang meja" : suara ? "Hebat!" : beres ? "Mejamu terukur!" : penuh ? "Berapa sedotan?" : "Mulai dari ujung meja"}
        teks={`Ukur panjang meja dengan sedotan. Seret sedotan ke tempat kosong pertama dari ujung kiri meja, atau ketuk sedotannya lalu ketuk tempatnya. Sedotan harus rapat, tanpa celah.${akhir ? " Di akhir, ucapkan panjang meja." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-1 rounded-2xl border-4 border-[#A8672D] bg-[#FDBA74] px-2 pb-2 pt-1">
          <p className="text-center text-xs font-black text-[#1C01A5]">Meja • mulai dari ujung kiri ➜</p>
          <div className="flex overflow-hidden rounded-lg border-4 border-[#1C01A5] bg-white/80">
            {Array.from({ length: n }, (_, k) => (
              <button
                key={`${k}-${goyang === k ? "x" : "o"}`}
                type="button"
                data-zona={`b7-slot-${k}`}
                aria-label={`Tempat sedotan ke-${k + 1}${k < terisi ? ", sudah terisi" : ", kosong"}`}
                onClick={() => {
                  if (terpilih !== null) taruh(k);
                  else if (k >= terisi) setKabar({ teks: "Pilih dulu satu sedotan di bawah, lalu ketuk tempatnya.", ok: false });
                }}
                className={`flex h-12 flex-1 items-center justify-center border-r-2 border-dashed border-[#1C01A5]/40 last:border-r-0 ${goyang === k ? "igil-goyang" : ""}`}
              >
                {k < terisi ? <span className="igil-muncul block h-4 w-full border-y-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_SEDOTAN[k % 2] }} /> : <span className="text-sm font-black text-[#1C01A5]/30">{k + 1}</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Sedotan • seret ke meja</p>
          <div className="flex min-h-[48px] flex-wrap items-center justify-center gap-2 pt-1">
            {Array.from({ length: Math.max(sisa, 0) }, (_, i) => i).map((i) => (
              <BendaSeret
                key={i}
                id={`sd${i}`}
                label={`Sedotan ke-${i + 1}`}
                aktif={!penuh}
                onKetuk={() => setTerpilih(i)}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("b7-slot-")) taruh(Number(z.slice(8)));
                }}
                gaya={letakMeja(i)}
                kelas="rounded-full"
              >
                <span className={`block rounded-full p-1 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <span className="block h-4 w-24 rounded-full border-2 border-[#1C01A5]" style={{ backgroundColor: WARNA_SEDOTAN[(terisi + i) % 2] }} />
                </span>
              </BendaSeret>
            ))}
          </div>
        </div>
        {penuh && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Panjang meja = ? sedotan</p>
            <PilihAngka opsi={opsiSekitar(n)} keliru={salah} onPilih={pilihHasil} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Panjang meja = ? sedotan" : `Panjang meja = ${n} sedotan`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSusun({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Sedotan"
      warna="#BFDBFE"
      petunjuk="Cara mengukur yang benar. Seret sedotan ke tempat kosong pertama dari ujung kiri meja. Sedotan harus rapat dan tidak ada celah. Setelah penuh, pilih panjang meja. Pada ronde terakhir, ucapkan panjang meja dalam sedotan."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-susun"
      jumlahRonde={RONDE_SUSUN.length}
      kunciAkhir={RONDE_SUSUN[RONDE_SUSUN.length - 1]}
      belumSiap="Susun sedotannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSusunSedotan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Dua Alat Ukur, Hasil Berbeda ----------------------- */

type RondeBeda = {
  benda: string;
  warnaBenda: string;
  a: { jenis: JenisSatuan; n: number };
  b: { jenis: JenisSatuan; n: number };
  alasan: string[];
  benar: number;
};

const RONDE_BEDA: RondeBeda[] = [
  {
    benda: "buku",
    warnaBenda: "#4CAF6A",
    a: { jenis: "stik", n: 2 },
    b: { jenis: "koin", n: 12 },
    alasan: ["karena panjang stik es krim dan koin berbeda", "karena bukunya berubah menjadi lebih panjang", "karena ada yang menghitung dengan salah"],
    benar: 0,
  },
  {
    benda: "meja",
    warnaBenda: "#FDBA74",
    a: { jenis: "sedotan", n: 4 },
    b: { jenis: "klip", n: 8 },
    alasan: ["karena mejanya bertambah panjang", "karena penjepit kertas lebih berat", "karena panjang sedotan dan penjepit kertas berbeda"],
    benar: 2,
  },
  {
    benda: "pita",
    warnaBenda: "#F472B6",
    a: { jenis: "stik", n: 3 },
    b: { jenis: "koin", n: 6 },
    alasan: ["karena pita memendek kalau diukur dengan koin", "karena alat ukur yang lebih panjang menghasilkan angka yang lebih sedikit", "karena koin lebih berat dari stik es krim"],
    benar: 1,
  },
];

const LEBAR_BENDA = 240;

function RondeDuaAlat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_BEDA[ronde];
  const akhir = ronde === RONDE_BEDA.length - 1;
  const [hitung, setHitung] = useState<[number, number]>([0, 0]);
  const [jawabA, setJawabA] = useState(false);
  const [jawabB, setJawabB] = useState(false);
  const [salahA, setSalahA] = useState<number | null>(null);
  const [salahB, setSalahB] = useState<number | null>(null);
  const [salahAlasan, setSalahAlasan] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const rantai = [d.a, d.b];
  const suara = panel.suara["b7-beda"] === true && akhir;
  useBicara(
    akhir ? suara : beres,
    `Panjang ${d.benda} adalah ${sebut(d.a.n)} ${NAMA_SATUAN[d.a.jenis]}. Panjang ${d.benda} juga ${sebut(d.b.n)} ${NAMA_SATUAN[d.b.jenis]}. ${d.alasan[d.benar]}.`
  );
  const kelengkapan = [hitung[0] === d.a.n, hitung[1] === d.b.n];

  const ketuk = (c: 0 | 1, i: number) => {
    if (i !== hitung[c]) {
      if (i > hitung[c]) setKabar({ teks: "Hitung dari ujung kiri satu per satu. Jangan ada yang terlewat.", ok: false });
      return;
    }
    const baru: [number, number] = [hitung[0], hitung[1]];
    baru[c] = i + 1;
    setHitung(baru);
    setKabar(null);
    ucap(sebut(i + 1));
  };

  const pilihAngka = (c: 0 | 1, v: number) => {
    if (v === rantai[c].n) {
      if (c === 0) {
        setSalahA(null);
        setJawabA(true);
      } else {
        setSalahB(null);
        setJawabB(true);
      }
      setKabar(null);
    } else {
      if (c === 0) setSalahA(v);
      else setSalahB(v);
      setKabar({ teks: "Hitung lagi alat ukur yang menutupi benda dari ujung kiri sampai ujung kanan.", ok: false });
    }
  };

  const pilihAlasan = (t: string) => {
    if (beres) return;
    if (t === d.alasan[d.benar]) {
      setSalahAlasan(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalahAlasan(t);
      setKabar({ teks: "Benda yang diukur tetap sama panjang. Yang berbeda adalah panjang alat ukurnya.", ok: false });
    }
  };

  const lebar = (c: 0 | 1) => LEBAR_BENDA / rantai[c].n;
  const yRantai = (c: 0 | 1) => 54 + c * 50;

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: hasil dengan stik" : suara ? "Hebat!" : beres ? "Alasanmu tepat!" : "Hitung dua rantai"}
        teks={`${d.benda} yang sama diukur dengan dua alat ukur. Ketuk setiap alat ukur dari kiri untuk menghitungnya. Lalu pilih hasil ukur, dan pilih alasan mengapa hasilnya berbeda.${akhir ? " Di akhir, ucapkan hasil ukur dengan stik es krim." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-1">
          <svg viewBox="0 0 300 152" className="block h-auto w-full" role="group" aria-label={`${d.benda} diukur dengan ${NAMA_SATUAN[d.a.jenis]} dan dengan ${NAMA_SATUAN[d.b.jenis]}`}>
            <path d="M30 8 V146 M270 8 V146" stroke="#DC2626" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
            {d.benda === "buku" ? <BukuG x={30} y={10} w={LEBAR_BENDA} h={30} /> : <rect x={30} y={10} width={LEBAR_BENDA} height="30" rx="5" fill={d.warnaBenda} stroke={BIRU} strokeWidth="2.4" />}
            {([0, 1] as const).map((c) => (
              <g key={c}>
                {Array.from({ length: rantai[c].n }, (_, i) => {
                  const sudah = i < hitung[c];
                  return (
                    <g
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`${NAMA_SATUAN[rantai[c].jenis]} ke-${i + 1}${sudah ? ", sudah dihitung" : ""}`}
                      onClick={() => ketuk(c, i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          ketuk(c, i);
                        }
                      }}
                      style={{ cursor: "pointer", outline: "none" }}
                    >
                      <SatuanG jenis={rantai[c].jenis} x={30 + i * lebar(c)} y={yRantai(c)} w={lebar(c)} h={32} urut={i} />
                      {sudah ? (
                        <g>
                          <rect x={30 + i * lebar(c)} y={yRantai(c)} width={lebar(c)} height="32" rx="3" fill="#FDE047" opacity="0.55" />
                          {lebar(c) >= 18 ? (
                            <text x={30 + i * lebar(c) + lebar(c) / 2} y={yRantai(c) + 20} textAnchor="middle" fontSize={lebar(c) >= 26 ? 14 : 10.5} fontWeight="900" fill={BIRU}>
                              {i + 1}
                            </text>
                          ) : null}
                        </g>
                      ) : null}
                    </g>
                  );
                })}
                <text x="150" y={yRantai(c) + 46} textAnchor="middle" fontSize="11" fontWeight="900" fill={BIRU}>
                  {NAMA_SATUAN[rantai[c].jenis]}: {hitung[c]} dari {rantai[c].n}
                </text>
              </g>
            ))}
          </svg>
        </div>
        {kelengkapan[0] && !jawabA ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Panjang {d.benda} = ? {NAMA_SATUAN[d.a.jenis]}</p>
            <PilihAngka opsi={opsiSekitar(d.a.n)} keliru={salahA} onPilih={(v) => pilihAngka(0, v)} />
          </div>
        ) : null}
        {kelengkapan[1] && !jawabB ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Panjang {d.benda} = ? {NAMA_SATUAN[d.b.jenis]}</p>
            <PilihAngka opsi={opsiSekitar(d.b.n)} keliru={salahB} onPilih={(v) => pilihAngka(1, v)} />
          </div>
        ) : null}
        {jawabA && jawabB && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
              {d.a.n} {NAMA_SATUAN[d.a.jenis]} dan {d.b.n} {NAMA_SATUAN[d.b.jenis]}. Mengapa hasilnya berbeda?
            </p>
            <PilihKata opsi={d.alasan} keliru={salahAlasan} onPilih={pilihAlasan} kolom={1} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.benda} = ${d.b.n} ${NAMA_SATUAN[d.b.jenis]} • ${d.benda} = ? ${NAMA_SATUAN[d.a.jenis]}` : `${d.benda} = ${d.a.n} ${NAMA_SATUAN[d.a.jenis]} • ${d.benda} = ${d.b.n} ${NAMA_SATUAN[d.b.jenis]}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahDuaAlat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Dua Alat Ukur, Hasil Berbeda"
      warna="#FBCFE8"
      petunjuk="Benda yang sama diukur dengan dua alat ukur yang berbeda. Ketuk setiap alat ukur dari kiri untuk menghitungnya, lalu pilih hasilnya dan pilih alasan mengapa hasilnya berbeda. Pada ronde terakhir, ucapkan hasil ukur dengan stik es krim."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-beda"
      jumlahRonde={RONDE_BEDA.length}
      kunciAkhir={RONDE_BEDA[RONDE_BEDA.length - 1].a.n}
      belumSiap="Hitung dan pilih alasannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeDuaAlat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Tumpuk Balok --------------------------------------- */

const RONDE_BALOK = [4, 6, 7];
const TINGGI_BALOK = 18;
const WARNA_BALOK = ["#F9A8D4", "#93C5FD", "#86EFAC", "#FDE68A"];

function Balok({ i, kelas = "" }: { i: number; kelas?: string }) {
  return <span className={`block box-border border-2 border-[#1C01A5] ${kelas}`} style={{ height: TINGGI_BALOK, backgroundColor: WARNA_BALOK[i % WARNA_BALOK.length] }} />;
}

function RondeTumpukBalok({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const n = RONDE_BALOK[ronde];
  const akhir = ronde === RONDE_BALOK.length - 1;
  const maks = n + 3;
  const [menara, setMenara] = useState(0);
  const [terpilih, setTerpilih] = useState<number | null>(null);
  const [cocok, setCocok] = useState(false);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b7-balok"] === true && akhir;
  useBicara(akhir ? suara : beres, `Menara balok sama tinggi dengan pohon. Tinggi pohon adalah ${sebut(n)} balok.`);
  const tinggiPohon = n * TINGGI_BALOK;

  const tambah = () => {
    if (menara >= maks || cocok) return;
    setMenara((m) => m + 1);
    setTerpilih(null);
    setKabar(null);
    ucap(sebut(menara + 1));
  };
  const ambil = () => {
    if (menara <= 0 || cocok) return;
    setMenara((m) => m - 1);
    setKabar(null);
  };
  const periksa = () => {
    if (cocok) return;
    if (menara === n) {
      setCocok(true);
      setKabar(null);
    } else {
      setKabar({
        teks: menara < n ? "Menaranya masih lebih pendek dari pohon. Tambahkan balok." : "Menaranya lebih tinggi dari pohon. Ambil satu balok.",
        ok: false,
      });
    }
  };
  const pilihHasil = (v: number) => {
    if (!cocok || beres) return;
    if (v === n) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Hitung balok pada menara dari bawah sampai atas.", ok: false });
    }
  };

  const sisa = maks - menara;

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: tinggi pohon" : suara ? "Hebat!" : beres ? "Menaramu pas!" : cocok ? "Berapa balok?" : "Tumpuk balok setinggi pohon"}
        teks={`Berapa tinggi pohon pisang dalam balok? Seret balok ke menara di sebelah pohon sampai ujung atasnya sama tinggi. Tekan periksa untuk memastikan. Lalu hitung baloknya.${akhir ? " Di akhir, ucapkan tinggi pohon." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="flex items-end justify-center gap-8 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 pt-2" style={{ paddingBottom: 4 }}>
          <svg
            viewBox={`-34 ${-tinggiPohon - 4} 68 ${tinggiPohon + 8}`}
            style={{ width: 68, height: tinggiPohon + 8 }}
            className="block shrink-0"
            role="img"
            aria-label={`Pohon pisang setinggi ${n} balok`}
          >
            <PohonG x={0} y={0} tinggi={tinggiPohon} />
          </svg>
          <button
            type="button"
            data-zona="b7-menara"
            aria-label={`Menara balok, tinggi ${menara} balok`}
            onClick={() => {
              if (terpilih !== null) tambah();
              else if (!cocok) setKabar({ teks: "Pilih dulu satu balok di bawah, lalu ketuk menara.", ok: false });
            }}
            className={`flex w-16 flex-col-reverse justify-start rounded-t-md border-x-4 border-dashed ${cocok ? "border-[#7FCB96]" : "border-[#1C01A5]/50"}`}
            style={{ minHeight: Math.max(tinggiPohon, TINGGI_BALOK * 3) }}
          >
            {Array.from({ length: menara }, (_, i) => (
              <Balok key={i} i={i} kelas="igil-muncul" />
            ))}
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button type="button" onClick={ambil} aria-label="Ambil satu balok dari menara" className="rounded-full border-4 border-[#1C01A5] bg-white px-4 py-1.5 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.22)] disabled:opacity-40" disabled={menara === 0 || cocok}>
            ↩ Ambil satu
          </button>
          <button type="button" onClick={periksa} aria-label="Periksa menara" className="rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-5 py-1.5 text-sm font-black text-[#FFE566] shadow-[0_3px_0_rgba(28,1,165,0.35)] disabled:opacity-40" disabled={menara === 0 || cocok}>
            ✔ Periksa menara
          </button>
        </div>
        <div className="rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1.5 py-2">
          <p className="text-center text-sm font-black text-[#1C01A5]">Balok • seret ke menara</p>
          <div className="flex min-h-[30px] flex-wrap items-center justify-center gap-1.5 pt-1">
            {Array.from({ length: Math.max(sisa, 0) }, (_, i) => i).map((i) => (
              <BendaSeret
                key={i}
                id={`bl${i}`}
                label={`Balok ke-${i + 1}`}
                aktif={!cocok}
                onKetuk={() => {
                  setTerpilih(i);
                }}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "b7-menara") tambah();
                }}
                gaya={letakMeja(i)}
                kelas="rounded-md"
              >
                <span className={`block rounded-md p-0.5 ${terpilih === i ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>
                  <Balok i={i} kelas="w-12" />
                </span>
              </BendaSeret>
            ))}
          </div>
        </div>
        {cocok && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black leading-snug text-[#1C01A5]">Tinggi pohon = ? balok</p>
            <PilihAngka opsi={opsiSekitar(n)} keliru={salah} onPilih={pilihHasil} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Tinggi pohon = ? balok" : `Tinggi pohon = ${n} balok`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBalok({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tumpuk Balok"
      warna="#C7D2FE"
      petunjuk="Mengukur tinggi dengan balok. Seret balok ke menara di sebelah pohon sampai ujung atasnya sama tinggi, lalu tekan periksa. Hitung balok untuk mengetahui tinggi pohon. Pada ronde terakhir, ucapkan tinggi pohon dalam balok."
      speakGuru={speakGuru}
      panel={panel}
      id="b7-balok"
      jumlahRonde={RONDE_BALOK.length}
      kunciAkhir={RONDE_BALOK[RONDE_BALOK.length - 1]}
      belumSiap="Tumpuk balok dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTumpukBalok ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
