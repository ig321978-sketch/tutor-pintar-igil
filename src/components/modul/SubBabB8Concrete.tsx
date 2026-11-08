"use client";

import React, { useContext, useState } from "react";
import { IgilBicara, PilihAngka, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { ALAS, BendaSeret, SuaraCtx, letakMeja, useBicara, zonaDi } from "./tahap-b-gaya";
import { Anak } from "./CeritaBandingB";
import { sebut } from "./belas-a5-dasar";
import { opsiSekitar } from "./urut-b5-dasar";
import { PilihKata } from "./ukur-7-dasar";
import { BendaSvg, NAMA_BENDA, type JenisBenda } from "./data-8-dasar";

/* ------------------------------------------------------------------------ */
/* Bab 8 Sub-Bab B, Tahap 4 Concrete: benda nyata. Anak mencatat suara teman  */
/* menjadi diagram dari benda nyata, memberi nama kolom diagram, menempel     */
/* kartu kalimat, dan mengatur isi kandang menurut petunjuk.                  */
/*  1 Survei Sayur Kesukaan (ketuk teman, sayurnya masuk diagram)             */
/*  2 Beri Nama Diagram (seret kartu nama ke kolom)                           */
/*  3 Kartu Kalimat Data (seret kartu kalimat ke nama)                        */
/*  4 Kandang Pak Budi (tambah dan kurangi hewan menurut petunjuk)            */
/* ------------------------------------------------------------------------ */

/** Kolom benda nyata ditumpuk dari bawah. Dipakai di beberapa permainan Concrete. */
function KolomBenda({ jenis, n, tinggi, kelas = "h-6 w-6" }: { jenis: JenisBenda; n: number; tinggi: number; kelas?: string }) {
  return (
    <div className="flex flex-col-reverse overflow-hidden rounded-md border-2 border-[#1C01A5]/50 bg-white" role="img" aria-label={`${n} ${NAMA_BENDA[jenis]}`}>
      {Array.from({ length: tinggi }, (_, i) => (
        <span key={i} className="flex h-7 items-center justify-center border-t border-[#C4B5FD] first:border-t-0">
          {i < n ? (
            <span className="igil-muncul">
              <BendaSvg jenis={jenis} kelas={kelas} />
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

/* --------- Permainan 1. Survei Sayur Kesukaan ------------------------------ */

type Sayur = "jagung" | "wortel" | "brokoli" | "kol";
type RondeSurvei = { sayur: Sayur[]; teman: Sayur[] };

const RONDE_SURVEI: RondeSurvei[] = [
  { sayur: ["jagung", "wortel", "kol"], teman: ["jagung", "wortel", "wortel", "jagung", "kol", "wortel"] },
  { sayur: ["jagung", "wortel", "brokoli", "kol"], teman: ["wortel", "jagung", "brokoli", "jagung", "kol", "wortel", "jagung", "brokoli"] },
  { sayur: ["jagung", "wortel", "brokoli", "kol"], teman: ["jagung", "brokoli", "kol", "wortel", "brokoli", "kol", "wortel", "jagung", "wortel", "jagung", "wortel", "brokoli"] },
];

const RAMBUT = ["#1F2937", "#7A4A1E", "#111827", "#4B2E1A"];

const NAMA_SAYUR = (s: Sayur) => NAMA_BENDA[s];

function RondeSurveiSayur({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_SURVEI[ronde];
  const akhir = ronde === RONDE_SURVEI.length - 1;
  const [dicatat, setDicatat] = useState<boolean[]>(() => d.teman.map(() => false));
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const semua = dicatat.every(Boolean);
  const hitung = (s: Sayur) => d.teman.filter((t, i) => t === s && dicatat[i]).length;
  const total = (s: Sayur) => d.teman.filter((t) => t === s).length;
  const tinggi = Math.max(...d.sayur.map(total));
  const terbanyak = d.sayur.reduce((a, b) => (total(b) > total(a) ? b : a));
  const suara = panel.suara["b8-survei"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.sayur.map((s) => `${NAMA_SAYUR(s)} ${sebut(total(s))}`).join(", ")}. Sayur yang paling disukai adalah ${NAMA_SAYUR(terbanyak)}.${akhir ? ` Ada ${sebut(total("wortel"))} anak yang suka wortel.` : ""}`);

  const catat = (i: number) => {
    if (dicatat[i]) return;
    const baru = dicatat.slice();
    baru[i] = true;
    setDicatat(baru);
    setKabar(null);
    ucap(NAMA_SAYUR(d.teman[i]));
  };

  const pilih = (t: string) => {
    if (!semua || beres) return;
    if (t === NAMA_SAYUR(terbanyak)) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(t);
      setKabar({ teks: "Lihat diagram. Cari kolom yang paling tinggi.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: yang suka wortel" : suara ? "Hebat!" : beres ? "Surveimu selesai!" : semua ? "Sayur apa paling disukai?" : "Ketuk teman untuk mencatat"}
        teks={`Setiap teman menyebutkan satu sayur kesukaannya. Ketuk temanmu satu per satu untuk mencatat pilihannya. Sayurnya akan masuk ke diagram. Setelah semua tercatat, cari sayur yang paling disukai.${akhir ? " Di akhir, ucapkan berapa anak yang suka wortel." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="grid grid-cols-6 gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2" role="group" aria-label="Teman-teman yang ditanya">
          {d.teman.map((t, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Teman ke-${i + 1}, suka ${NAMA_SAYUR(t)}${dicatat[i] ? ", sudah dicatat" : ""}`}
              onClick={() => catat(i)}
              className={`flex flex-col items-center rounded-xl py-0.5 ${dicatat[i] ? "bg-[#E8F7EE] opacity-50" : "bg-[#FFF7CC]"}`}
            >
              <svg viewBox="-24 -28 48 50" className="block h-9 w-9" aria-hidden="true">
                <Anak x={0} y={0} rambut={RAMBUT[i % RAMBUT.length]} pita={i % 3 === 1} />
              </svg>
              <BendaSvg jenis={t} kelas="h-6 w-6" />
              <span className="text-[9px] font-black leading-none text-[#1C01A5]">{dicatat[i] ? "✔" : "·"}</span>
            </button>
          ))}
        </div>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-1.5 py-2">
          <p className="pb-1 text-center text-sm font-black text-[#1C01A5]">Diagram Sayur Kesukaan • tercatat {dicatat.filter(Boolean).length} dari {d.teman.length}</p>
          <div className="grid items-end gap-1.5" style={{ gridTemplateColumns: `repeat(${d.sayur.length}, minmax(0, 1fr))` }}>
            {d.sayur.map((s) => (
              <div key={s} className="space-y-1 text-center">
                <KolomBenda jenis={s} n={hitung(s)} tinggi={tinggi} />
                <BendaSvg jenis={s} kelas="mx-auto h-6 w-6" />
                <p className="text-[11px] font-black leading-none text-[#1C01A5]">{NAMA_SAYUR(s)}</p>
              </div>
            ))}
          </div>
        </div>
        {semua && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Sayur apa yang paling disukai?</p>
            <PilihKata opsi={d.sayur.map(NAMA_SAYUR)} keliru={salah} onPilih={pilih} kolom={d.sayur.length > 3 ? 2 : 3} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Anak yang suka wortel = ?" : `Paling disukai: ${NAMA_SAYUR(terbanyak)}, ${total(terbanyak)} anak`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahSurvei({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_SURVEI[RONDE_SURVEI.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Survei Sayur Kesukaan"
      warna="#BBF7D0"
      petunjuk="Mencatat data menjadi diagram. Ketuk teman satu per satu untuk mencatat sayur kesukaannya, dan sayurnya masuk ke diagram. Setelah semua tercatat, cari sayur yang paling disukai. Pada ronde terakhir, ucapkan berapa anak yang suka wortel."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-survei"
      jumlahRonde={RONDE_SURVEI.length}
      kunciAkhir={terakhir.teman.filter((t) => t === "wortel").length}
      belumSiap="Catat semua temanmu dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeSurveiSayur ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 2. Beri Nama Diagram ---------------------------------- */

type KolomNama = { j: JenisBenda; n: number };
type RondeNama = { kolom: KolomNama[]; judul: string; opsiJudul: string[] };

const RONDE_NAMA: RondeNama[] = [
  {
    kolom: [
      { j: "jagung", n: 3 },
      { j: "wortel", n: 4 },
      { j: "brokoli", n: 3 },
      { j: "kol", n: 2 },
    ],
    judul: "Diagram Sayur Kesukaan",
    opsiJudul: ["Diagram Sayur Kesukaan", "Diagram Hewan Kesukaan", "Diagram Warna Bola"],
  },
  {
    kolom: [
      { j: "pesawat", n: 4 },
      { j: "mobil", n: 3 },
      { j: "boneka", n: 2 },
      { j: "bola", n: 5 },
    ],
    judul: "Diagram Mainan Kesukaan",
    opsiJudul: ["Diagram Buah Kesukaan", "Diagram Mainan Kesukaan", "Diagram Sayur Kesukaan"],
  },
  {
    kolom: [
      { j: "jeruk", n: 6 },
      { j: "apel", n: 3 },
      { j: "mangga", n: 4 },
    ],
    judul: "Diagram Buah Kesukaan",
    opsiJudul: ["Diagram Mainan Kesukaan", "Diagram Hewan Kesukaan", "Diagram Buah Kesukaan"],
  },
];

function RondeBeriNama({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_NAMA[ronde];
  const akhir = ronde === RONDE_NAMA.length - 1;
  const total = d.kolom.reduce((a, b) => a + b.n, 0);
  const tinggi = Math.max(...d.kolom.map((k) => k.n));
  const kartu = React.useMemo(() => [...d.kolom].map((k, i) => ({ nama: NAMA_BENDA[k.j], k: i })).reverse(), [d]);
  const [isi, setIsi] = useState<(string | null)[]>(() => d.kolom.map(() => null));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [salah, setSalah] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const penuh = isi.every((v) => v !== null);
  const suara = panel.suara["b8-beri-nama"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.kolom.map((k) => `${NAMA_BENDA[k.j]} ${sebut(k.n)}`).join(", ")}. Judulnya ${d.judul}.${akhir ? ` Jumlah semua anak ada ${sebut(total)}.` : ""}`);

  const taruh = (nama: string, k: number) => {
    if (isi[k] !== null || isi.includes(nama)) return;
    if (NAMA_BENDA[d.kolom[k].j] !== nama) {
      setGoyang(k);
      setTerpilih(null);
      setKabar({ teks: "Lihat gambar benda pada kolom itu. Nama kolom harus sama dengan gambar bendanya.", ok: false });
      return;
    }
    const baru = isi.slice();
    baru[k] = nama;
    setIsi(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(nama);
  };

  const pilihJudul = (t: string) => {
    if (!penuh || beres) return;
    if (t === d.judul) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(t);
      setKabar({ teks: "Judul harus cocok dengan benda yang didata pada diagram.", ok: false });
    }
  };

  const sisa = kartu.filter((c) => !isi.includes(c.nama));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Diagrammu lengkap!" : penuh ? "Pilih judul diagram" : "Beri nama setiap kolom"}
        teks={`Lihat gambar benda pada setiap kolom. Seret kartu nama ke bawah kolom yang cocok, atau ketuk kartunya lalu ketuk bawah kolomnya. Setelah itu, pilih judul diagramnya.${akhir ? " Di akhir, ucapkan jumlah semua anak pada diagram." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-1.5 py-2">
          <p className="pb-1 text-center text-sm font-black text-[#1C01A5]">{penuh ? d.judul : "Diagram (belum ada judul)"}</p>
          <div className="grid items-end gap-1.5" style={{ gridTemplateColumns: `repeat(${d.kolom.length}, minmax(0, 1fr))` }}>
            {d.kolom.map((k, c) => (
              <div key={c} className="space-y-1">
                <KolomBenda jenis={k.j} n={k.n} tinggi={tinggi} />
                <button
                  key={`${c}-${goyang === c ? "x" : "o"}`}
                  type="button"
                  data-zona={`b8-kol-${c}`}
                  aria-label={`Nama kolom ke-${c + 1}${isi[c] ? `, ${isi[c]}` : ", belum diisi"}`}
                  onClick={() => {
                    if (isi[c] !== null) return;
                    if (terpilih !== null) taruh(terpilih, c);
                    else setKabar({ teks: "Pilih dulu satu kartu nama di bawah, lalu ketuk kolomnya.", ok: false });
                  }}
                  className={`flex min-h-[34px] w-full items-center justify-center rounded-lg border-2 px-0.5 text-[11px] font-black leading-tight text-[#1C01A5] ${isi[c] ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/60 bg-white"} ${goyang === c ? "igil-goyang" : ""}`}
                >
                  {isi[c] ?? "?"}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-[56px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🏷️ Kartu nama</span>
          {sisa.map((c) => (
            <BendaSeret
              key={c.nama}
              id={`kn-${c.nama}`}
              label={`Kartu nama ${c.nama}`}
              onKetuk={() => setTerpilih(c.nama)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("b8-kol-")) taruh(c.nama, Number(z.slice(7)));
              }}
              gaya={letakMeja(c.k + 1)}
              kelas="rounded-xl"
            >
              <span className={`block rounded-xl border-4 border-[#1C01A5] bg-white px-2.5 py-1 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${terpilih === c.nama ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>{c.nama}</span>
            </BendaSeret>
          ))}
          {sisa.length === 0 ? <span className="text-2xl">✅</span> : null}
        </div>
        {penuh && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Judul diagram yang cocok adalah ...</p>
            <PilihKata opsi={d.opsiJudul} keliru={salah} onPilih={pilihJudul} kolom={1} kecil />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua anak = ?" : d.judul}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahBeriNama({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_NAMA[RONDE_NAMA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Beri Nama Diagram"
      warna="#FDE68A"
      petunjuk="Mengenal bagian diagram gambar. Seret kartu nama ke bawah kolom yang bendanya cocok, lalu pilih judul diagramnya. Pada ronde terakhir, ucapkan jumlah semua anak pada diagram."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-beri-nama"
      jumlahRonde={RONDE_NAMA.length}
      kunciAkhir={terakhir.kolom.reduce((a, b) => a + b.n, 0)}
      belumSiap="Beri nama semua kolomnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeBeriNama ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 3. Kartu Kalimat Data --------------------------------- */

type RondeKalimat = {
  judul: string;
  kolom: { nama: string; j: JenisBenda; n: number }[];
  kartu: { teks: string; ke: string }[];
};

const RONDE_KALIMAT: RondeKalimat[] = [
  {
    judul: "Diagram Banyak Karet Gelang",
    kolom: [
      { nama: "Malosi", j: "karet", n: 5 },
      { nama: "Halim", j: "karet", n: 3 },
      { nama: "Upe", j: "karet", n: 4 },
    ],
    kartu: [
      { teks: "paling banyak", ke: "Malosi" },
      { teks: "paling sedikit", ke: "Halim" },
      { teks: "1 lebih sedikit dari Malosi", ke: "Upe" },
    ],
  },
  {
    judul: "Diagram Banyak Buah",
    kolom: [
      { nama: "Jeruk", j: "jeruk", n: 6 },
      { nama: "Apel", j: "apel", n: 3 },
      { nama: "Mangga", j: "mangga", n: 4 },
    ],
    kartu: [
      { teks: "paling banyak", ke: "Jeruk" },
      { teks: "paling sedikit", ke: "Apel" },
      { teks: "1 lebih banyak dari Apel", ke: "Mangga" },
    ],
  },
  {
    judul: "Diagram Banyak Kelereng",
    kolom: [
      { nama: "Merah", j: "kelereng-merah", n: 5 },
      { nama: "Biru", j: "kelereng-biru", n: 3 },
      { nama: "Kuning", j: "kelereng-kuning", n: 5 },
      { nama: "Hijau", j: "kelereng-hijau", n: 6 },
    ],
    kartu: [
      { teks: "paling banyak", ke: "Hijau" },
      { teks: "paling sedikit", ke: "Biru" },
      { teks: "sama banyak dengan Kuning", ke: "Merah" },
      { teks: "1 kurang dari Hijau", ke: "Kuning" },
    ],
  },
];

function RondeKartuKalimat({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_KALIMAT[ronde];
  const akhir = ronde === RONDE_KALIMAT.length - 1;
  const total = d.kolom.reduce((a, b) => a + b.n, 0);
  const tinggi = Math.max(...d.kolom.map((k) => k.n));
  const [isi, setIsi] = useState<(string | null)[]>(() => d.kolom.map(() => null));
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = isi.every((v) => v !== null);
  const suara = panel.suara["b8-kartu-kalimat"] === true && akhir;
  useBicara(akhir ? suara : beres, `${d.kartu.map((c) => `${c.ke} ${c.teks}`).join(". ")}.${akhir ? ` Semuanya ada ${sebut(total)}.` : ""}`);

  const taruh = (teks: string, c: number) => {
    if (isi[c] !== null || isi.includes(teks)) return;
    const kartu = d.kartu.find((x) => x.teks === teks)!;
    if (kartu.ke !== d.kolom[c].nama) {
      setGoyang(c);
      setTerpilih(null);
      setKabar({ teks: "Hitung gambar pada kolom itu dan bandingkan dengan kolom yang lain. Kalimat itu belum cocok.", ok: false });
      return;
    }
    const baru = isi.slice();
    baru[c] = teks;
    setIsi(baru);
    setTerpilih(null);
    setGoyang(null);
    setKabar(null);
    ucap(`${d.kolom[c].nama} ${teks}.`);
    if (baru.every((v) => v !== null)) {
      letusan.picu();
      onBeres();
    }
  };

  const sisa = d.kartu.filter((c) => !isi.includes(c.teks));

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua" : suara ? "Hebat!" : beres ? "Semua kalimat cocok!" : "Tempel kartu kalimat"}
        teks={`Hitung gambar pada setiap kolom. Seret kartu kalimat ke nama yang cocok, atau ketuk kartunya lalu ketuk namanya.${akhir ? " Di akhir, ucapkan jumlah semua kelereng." : ""}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-[#FEF2F2] px-1.5 py-2">
          <p className="pb-1 text-center text-sm font-black text-[#1C01A5]">{d.judul}</p>
          <div className="grid items-end gap-1.5" style={{ gridTemplateColumns: `repeat(${d.kolom.length}, minmax(0, 1fr))` }}>
            {d.kolom.map((k, c) => (
              <div key={k.nama} className="space-y-1">
                <KolomBenda jenis={k.j} n={k.n} tinggi={tinggi} kelas="h-6 w-6" />
                <button
                  key={`${c}-${goyang === c ? "x" : "o"}`}
                  type="button"
                  data-zona={`b8-nama-${c}`}
                  aria-label={`${k.nama}${isi[c] ? `, ${isi[c]}` : ", belum ada kalimat"}`}
                  onClick={() => {
                    if (isi[c] !== null) return;
                    if (terpilih !== null) taruh(terpilih, c);
                    else setKabar({ teks: "Pilih dulu satu kartu kalimat di bawah, lalu ketuk namanya.", ok: false });
                  }}
                  className={`flex min-h-[58px] w-full flex-col items-center justify-start rounded-lg border-2 px-0.5 py-0.5 ${isi[c] ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#1C01A5]/60 bg-white"} ${goyang === c ? "igil-goyang" : ""}`}
                >
                  <span className="text-xs font-black leading-tight text-[#1C01A5]">{k.nama}</span>
                  <span className="igil-muncul text-[10px] font-black leading-tight text-[#14532D]">{isi[c] ?? ""}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-h-[56px] flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FDE9C4] px-2 py-2">
          <span className="w-full text-center text-sm font-black text-[#1C01A5]">🃏 Kartu kalimat</span>
          {sisa.map((c, i) => (
            <BendaSeret
              key={c.teks}
              id={`kk-${c.teks}`}
              label={`Kartu kalimat ${c.teks}`}
              onKetuk={() => setTerpilih(c.teks)}
              onLepas={(_, x, y) => {
                const z = zonaDi(x, y);
                if (z && z.startsWith("b8-nama-")) taruh(c.teks, Number(z.slice(8)));
              }}
              gaya={letakMeja(i + 2)}
              kelas="rounded-xl"
            >
              <span className={`block rounded-xl border-4 border-[#1C01A5] bg-white px-2.5 py-1 text-sm font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.3)] ${terpilih === c.teks ? "bg-[#FFF7CC] ring-4 ring-[#F0AB00]" : ""}`}>{c.teks}</span>
            </BendaSeret>
          ))}
          {sisa.length === 0 ? <span className="text-2xl">✅</span> : null}
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua kelereng = ?" : `Semuanya ada ${total}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKartuKalimat({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KALIMAT[RONDE_KALIMAT.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kartu Kalimat Data"
      warna="#FBCFE8"
      petunjuk="Membaca diagram dengan kalimat. Hitung gambar pada setiap kolom, lalu seret kartu kalimat seperti paling banyak, paling sedikit, atau sama banyak ke nama yang cocok. Pada ronde terakhir, ucapkan jumlah semua kelereng."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-kartu-kalimat"
      jumlahRonde={RONDE_KALIMAT.length}
      kunciAkhir={terakhir.kolom.reduce((a, b) => a + b.n, 0)}
      belumSiap="Tempel semua kartunya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKartuKalimat ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 4. Kandang Pak Budi ----------------------------------- */

type Hewan = "ayam" | "bebek" | "kelinci";
type RondeKandang = { petunjuk: string[]; target: Record<Hewan, number> };

const HEWAN: Hewan[] = ["ayam", "bebek", "kelinci"];

const RONDE_KANDANG: RondeKandang[] = [
  { petunjuk: ["Ada 4 ayam.", "Banyak bebek 2 kurangnya dari ayam.", "Banyak kelinci 1 lebihnya dari ayam."], target: { ayam: 4, bebek: 2, kelinci: 5 } },
  { petunjuk: ["Ada 3 kelinci.", "Banyak ayam 2 lebihnya dari kelinci.", "Banyak bebek 1 kurangnya dari ayam."], target: { ayam: 5, bebek: 4, kelinci: 3 } },
  { petunjuk: ["Ada 4 bebek.", "Banyak ayam 1 kurangnya dari bebek.", "Banyak kelinci 3 lebihnya dari ayam."], target: { ayam: 3, bebek: 4, kelinci: 6 } },
];

function RondeKandangHewan({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const ucap = useContext(SuaraCtx);
  const d = RONDE_KANDANG[ronde];
  const akhir = ronde === RONDE_KANDANG.length - 1;
  const total = HEWAN.reduce((a, h) => a + d.target[h], 0);
  const [isi, setIsi] = useState<Record<Hewan, number>>({ ayam: 0, bebek: 0, kelinci: 0 });
  const [cocok, setCocok] = useState(false);
  const [salah, setSalah] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["b8-kandang"] === true && akhir;
  useBicara(akhir ? suara : beres, `${HEWAN.map((h) => `${sebut(d.target[h])} ${NAMA_BENDA[h]}`).join(", ")}. Jumlah semua hewan ${sebut(total)}.`);

  const ubah = (h: Hewan, delta: number) => {
    if (cocok) return;
    const baru = Math.min(9, Math.max(0, isi[h] + delta));
    if (baru === isi[h]) return;
    setIsi({ ...isi, [h]: baru });
    setKabar(null);
    if (delta > 0) ucap(sebut(baru));
  };

  const periksa = () => {
    if (cocok) return;
    const salahH = HEWAN.find((h) => isi[h] !== d.target[h]);
    if (!salahH) {
      setKabar(null);
      setCocok(true);
      if (akhir) {
        setBeres(true);
        letusan.picu();
        onBeres();
      }
      return;
    }
    setKabar({
      teks: `Baca petunjuk lagi. Banyak ${NAMA_BENDA[salahH]} masih ${isi[salahH] < d.target[salahH] ? "kurang" : "kelebihan"}. Kata lebihnya berarti ditambah dan kata kurangnya berarti dikurangi.`,
      ok: false,
    });
  };

  const pilihTotal = (v: number) => {
    if (!cocok || beres) return;
    if (v === total) {
      setSalah(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setSalah(v);
      setKabar({ teks: "Jumlahkan banyak ayam, bebek, dan kelinci satu per satu.", ok: false });
    }
  };

  return (
    <>
      <IgilBicara
        pendek={akhir && beres && !suara ? "Ucapkan: jumlah semua hewan" : suara ? "Hebat!" : beres ? "Kandangmu pas!" : cocok ? "Berapa jumlah semuanya?" : "Atur isi kandang"}
        teks={`Baca petunjuk Pak Budi. Tekan plus dan minus untuk mengatur banyak hewan di setiap kandang, lalu tekan periksa.${akhir ? " Di akhir, ucapkan jumlah semua hewan." : " Setelah itu, cari jumlah semua hewan."}`}
      />
      <div className={`${ALAS} relative space-y-3 p-3`}>
        <div className="space-y-0.5 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-3 py-2 text-base font-black leading-snug text-[#1C01A5]">
          {d.petunjuk.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {HEWAN.map((h) => (
            <div key={h} className="space-y-1 rounded-2xl border-4 border-[#A8672D] bg-[#FDE9C4] px-1 py-1.5 text-center">
              <p className="text-sm font-black text-[#1C01A5]">{NAMA_BENDA[h]}</p>
              <div className="flex min-h-[78px] flex-wrap content-start items-start justify-center gap-0.5 rounded-xl bg-white/80 p-1" role="img" aria-label={`${isi[h]} ${NAMA_BENDA[h]} di kandang`}>
                {Array.from({ length: isi[h] }, (_, i) => (
                  <span key={i} className="igil-muncul">
                    <BendaSvg jenis={h} kelas="h-6 w-6" />
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <button type="button" aria-label={`Kurangi ${NAMA_BENDA[h]}`} onClick={() => ubah(h, -1)} disabled={cocok} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-white text-xl font-black leading-none text-[#1C01A5] disabled:opacity-40">
                  –
                </button>
                <span className="w-6 text-2xl font-black text-[#1C01A5]">{isi[h]}</span>
                <button type="button" aria-label={`Tambah ${NAMA_BENDA[h]}`} onClick={() => ubah(h, 1)} disabled={cocok} className="h-9 w-9 rounded-full border-4 border-[#1C01A5] bg-[#FFE566] text-xl font-black leading-none text-[#1C01A5] disabled:opacity-40">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        {!cocok ? (
          <button type="button" aria-label="Periksa kandang" onClick={periksa} className="mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]">
            ✔ Periksa kandang
          </button>
        ) : null}
        {cocok && !akhir && !beres ? (
          <div className="igil-muncul space-y-2">
            <p className="text-center text-base font-black text-[#1C01A5]">Jumlah semua hewan = ?</p>
            <PilihAngka opsi={opsiSekitar(total)} keliru={salah} onPilih={pilihTotal} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? "Jumlah semua hewan = ?" : `Jumlah semua hewan = ${total}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function LangkahKandang({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_KANDANG[RONDE_KANDANG.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Kandang Pak Budi"
      warna="#C7D2FE"
      petunjuk="Mengolah data dari petunjuk. Kata lebihnya berarti ditambah dan kata kurangnya berarti dikurangi. Atur banyak hewan di setiap kandang dengan tombol plus dan minus, lalu tekan periksa. Pada ronde terakhir, ucapkan jumlah semua hewan."
      speakGuru={speakGuru}
      panel={panel}
      id="b8-kandang"
      jumlahRonde={RONDE_KANDANG.length}
      kunciAkhir={HEWAN.reduce((a, h) => a + terakhir.target[h], 0)}
      belumSiap="Atur kandangnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeKandangHewan ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
