"use client";

import React, { useState } from "react";
import { JawabTulis } from "../lemari-k1b1a/Jawab";
import {
  NAMA_KOTAK,
  angkaJawab,
  isiSel,
  jumlahHitung,
  kalimatKunci,
  kalimatTanya,
  kata,
  kotakBenar,
  namaJawab,
  besar,
  petunjukNama,
  petunjukPilah,
  petunjukSalah,
  pilihanAngka,
  urutTampilUrut,
  type Bangun,
  type LangkahBS,
  type LangkahCetak,
  type LangkahHitung,
  type LangkahPilah,
  type LangkahSalah,
  type LangkahSoal,
  type LangkahTabel,
  type LangkahUrut,
  type Rupa,
} from "./logika";
import { Bentuk, DeretBenda, GambarBangun, KartuBenda, PetunjukNama } from "./Gbr";
import { JawabSuaraNama, PilihanAngka, PilihanNama } from "./JawabGudang";

/**
 * Satu soal CPA Kelas 2 Bab 3 Sub-Bab C. Kegiatan menurut metode (Metode IGIL: tanya bisa diisi dan menggelinding lalu memilah; Mystery Bag: ciri tas;
 * Face Printing: hasil cetak; Top and Side Views: tampak atas dan samping), soal Cari kesalahan (putuskan benar atau salah, pilih alasan), lalu menjawab
 * dengan caranya: Klik (memilah, memilih nama, benar atau salah, mengurutkan, melengkapi tabel), Tulis di kanvas (satu angka), Rekam suara (nama bangun).
 * Rupa: benda berwarna dengan emoji (Concrete), bentuk polos (Pictorial), kata saja (Abstract). Tanpa skor: salah = goyang dan petunjuk yang menunjuk kesalahannya.
 */
type P = { ls: LangkahSoal; rupa: Rupa; bicara: (t: string) => void; onBenar: () => void };
type PK = { rupa: Rupa; salah: (p: string) => void; tuntas: (p: string) => void; info: (p: string) => void };

const TOMBOL = "min-h-[48px] rounded-2xl border-4 border-[#1C01A5] bg-white px-3 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.3)] disabled:opacity-30";
const URUTAN = ["pertama", "kedua", "ketiga"];

/* ------------------------------ Memilah ke dua kotak ------------------------------ */
function Pilah({ l, rupa, salah, tuntas }: PK & { l: LangkahPilah }) {
  const [pilih, setPilih] = useState(-1);
  const [taruh, setTaruh] = useState<Record<number, 0 | 1>>({});
  const sisa = l.isi.map((_, i) => i).filter((i) => taruh[i] === undefined);
  const ketukKotak = (k: 0 | 1) => {
    if (pilih < 0) {
      salah("Ketuk satu benda dulu, lalu ketuk kotaknya.");
      return;
    }
    if (kotakBenar(l.pasang, l.isi[pilih]) !== k) {
      salah(petunjukPilah(l.pasang, l.isi[pilih]));
      return;
    }
    const baru = { ...taruh, [pilih]: k };
    setTaruh(baru);
    setPilih(-1);
    if (Object.keys(baru).length === l.isi.length) tuntas(kalimatKunci(l));
  };
  return (
    <div className="space-y-2">
      {sisa.length ? (
        <div className="flex flex-wrap justify-center gap-2">
          {sisa.map((i) => (
            <KartuBenda key={i} id={l.isi[i]} rupa={rupa} nomor={i} sorot={pilih === i} onKlik={() => setPilih(pilih === i ? -1 : i)} />
          ))}
        </div>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        {([0, 1] as const).map((k) => (
          <button key={k} type="button" onClick={() => ketukKotak(k)} aria-label={`Kotak ${NAMA_KOTAK[l.pasang][k]}`} className="min-h-[110px] rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#F5F3FF] p-1.5 text-center">
            <span className="block text-sm font-black text-[#7C3AED]">{besar(NAMA_KOTAK[l.pasang][k])}</span>
            <span className="mt-1 flex flex-wrap justify-center gap-1">
              {l.isi.map((id, i) => (taruh[i] === k ? <KartuBenda key={i} id={id} rupa={rupa} nomor={i} ukuran={36} /> : null))}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Memilih benda yang menghasilkan cetakan ------------------------------ */
function CetakPilih({ l, rupa, salah, tuntas }: PK & { l: LangkahCetak }) {
  const [mati, setMati] = useState<Bangun[]>([]);
  const benar = namaJawab(l) as Bangun;
  const ketuk = (b: Bangun) => {
    if (b === benar) tuntas(`Betul! ${kalimatKunci(l)}`);
    else {
      setMati((m) => [...m, b]);
      salah(petunjukNama(l, b));
    }
  };
  return (
    <div className="space-y-2">
      <div className="mx-auto flex max-w-xs flex-col items-center gap-1 rounded-2xl border-4 border-[#1C01A5] bg-white p-2">
        <p className="text-xs font-black text-[#7C3AED]">Hasil cetak di kertas</p>
        {rupa === "diagram" ? <Bentuk datar={l.hasil} ukuran={64} /> : rupa === "benda" ? <span className="text-4xl" aria-hidden="true">{"\u{1F4C4}"}</span> : null}
        <p className="text-base font-black text-[#1C01A5]">{besar(l.hasil)}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Pilih bendanya">
        {l.pilihan.map((b) => (
          <button key={b} type="button" disabled={mati.includes(b)} onClick={() => ketuk(b)} className="rounded-2xl disabled:opacity-30" aria-label={b}>
            <GambarBangun bangun={b} rupa={rupa} ukuran={60} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Mengurutkan langkah ------------------------------ */
function Urut({ l, salah, tuntas }: PK & { l: LangkahUrut }) {
  const [dipilih, setDipilih] = useState<number[]>([]);
  const urut = urutTampilUrut(l.langkah.length);
  const ketuk = (i: number) => {
    if (dipilih.includes(i)) return;
    if (i !== dipilih.length) {
      salah(`Itu belum waktunya. Langkah ${URUTAN[dipilih.length]} adalah: ${l.langkah[dipilih.length]}.`);
      return;
    }
    const baru = [...dipilih, i];
    setDipilih(baru);
    if (baru.length === l.langkah.length) tuntas(kalimatKunci(l));
  };
  return (
    <div className="space-y-2">
      <div className="space-y-1.5" role="group" aria-label="Ketuk langkah satu per satu">
        {urut.map((i) => (
          <button key={i} type="button" disabled={dipilih.includes(i)} onClick={() => ketuk(i)} className={`${TOMBOL} flex w-full items-center gap-2 text-left text-sm`}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FDE68A] text-xs">{dipilih.includes(i) ? dipilih.indexOf(i) + 1 : "?"}</span>
            {l.langkah[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Benar atau salah ------------------------------ */
function BenarSalah({ l, rupa, salah, tuntas }: PK & { l: LangkahBS }) {
  const [mati, setMati] = useState<boolean[]>([]);
  const putus = (b: boolean) => {
    if (b === l.benar) tuntas(`Betul! ${kalimatKunci(l)}`);
    else {
      setMati((m) => [...m, b]);
      salah(l.keliru);
    }
  };
  return (
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <GambarBangun bangun={l.bangun} rupa={rupa} ukuran={72} />
      </div>
      <p className="mx-auto max-w-sm rounded-2xl border-2 border-[#1C01A5] bg-white px-3 py-1.5 text-sm font-black text-[#1C01A5]">{l.pernyataan}</p>
      <div className="flex justify-center gap-2" role="group" aria-label="Benar atau salah">
        {[true, false].map((b) => (
          <button key={String(b)} type="button" disabled={mati.includes(b)} onClick={() => putus(b)} className={`${TOMBOL} min-w-[110px]`}>
            {b ? "\u{2705} Benar" : "\u{274C} Salah"}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Melengkapi tabel ------------------------------ */
function Tabel({ l, salah, tuntas }: PK & { l: LangkahTabel }) {
  const [isi, setIsi] = useState<(number | undefined)[]>(l.baris.map(() => undefined));
  const [mati, setMati] = useState<Record<number, number[]>>({});
  const pilih = (i: number, n: number) => {
    if (n !== isiSel(l, i)) {
      setMati((m) => ({ ...m, [i]: [...(m[i] ?? []), n] }));
      salah(`Itu belum tepat untuk ${l.baris[i]}. Hitung permukaan ${l.jenis}nya satu per satu.`);
      return;
    }
    const baru = isi.map((x, q) => (q === i ? n : x));
    setIsi(baru);
    if (baru.every((x) => x !== undefined)) tuntas(kalimatKunci(l));
  };
  return (
    <div className="mx-auto max-w-sm space-y-1.5">
      <p className="rounded-lg bg-[#EDE9FE] px-2 py-1 text-center text-xs font-black text-[#1C01A5]">Bangun ruang · banyak permukaan {l.jenis}</p>
      {l.baris.map((b, i) => (
        <div key={b} className="flex items-center gap-2 rounded-xl border-2 border-[#1C01A5] bg-white p-1.5">
          <span className="w-20 shrink-0 text-sm font-black text-[#1C01A5]">{besar(b)}</span>
          <div className="flex flex-1 justify-end gap-1.5" role="group" aria-label={`Banyak permukaan ${b}`}>
            {[0, 1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                disabled={isi[i] !== undefined || (mati[i] ?? []).includes(n)}
                onClick={() => pilih(i, n)}
                className={`min-h-[44px] min-w-[44px] rounded-xl border-4 text-lg font-black ${isi[i] === n ? "border-[#15803D] bg-[#DCFCE7] text-[#15803D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5] disabled:opacity-30"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ Soal hitung (tampilan) ------------------------------ */
function TampilHitung({ l, rupa }: { l: LangkahHitung; rupa: Rupa }) {
  if (l.dari === "daftar") return <DeretBenda isi={l.isi} rupa={rupa} />;
  return (
    <div className="flex justify-center">
      <GambarBangun bangun={l.bangun} rupa={rupa} ukuran={84} />
    </div>
  );
}

/* ------------------------------ Cari kesalahan ------------------------------ */
function CariSalah({ l, rupa, salah, tuntas, info }: PK & { l: LangkahSalah }) {
  const [tahap, setTahap] = useState<"putus" | "alasan" | "selesai">("putus");
  const [mati, setMati] = useState<number[]>([]);
  /** Urutan tombol alasan diputar tetap (bukan acak) supaya alasan benar tidak pernah di tombol pertama. */
  const geser = (l.benar + 1 + (l.alasan[l.benar].length % 2)) % 3;
  const urut = [0, 1, 2].map((i) => (i + geser) % 3);
  const putus = (benar: boolean) => {
    if (benar === !!l.betul) {
      setTahap("alasan");
      info(l.betul ? `Betul, jawaban ${l.tokoh} benar. Kenapa benar? Pilih alasannya.` : `Betul, jawaban ${l.tokoh} salah. Kenapa salah? Pilih alasannya.`);
    } else salah(`Lihat lagi. ${l.keliru}`);
  };
  const alasan = (i: number) => {
    if (i === l.benar) {
      setTahap("selesai");
      tuntas(`Betul! ${l.alasan[i]}`);
    } else {
      setMati((m) => [...m, i]);
      salah(`Alasan itu belum tepat. ${l.keliru}`);
    }
  };
  return (
    <div className="space-y-2">
      <DeretBenda isi={l.tampil} rupa={rupa} />
      <div className="flex items-start gap-2 rounded-2xl border-4 border-[#DB2777] bg-[#FDF2F8] p-2">
        <span className="text-2xl" aria-hidden="true">
          {"\u{1F4AC}"}
        </span>
        <p className="text-sm font-black text-[#831843]">
          {l.tokoh}: &ldquo;{l.kataTokoh}&rdquo;
        </p>
      </div>
      {tahap === "putus" ? (
        <div className="space-y-1 text-center">
          <p className="text-sm font-black text-[#1C01A5]">Jawaban {l.tokoh} benar atau salah?</p>
          <div className="flex justify-center gap-2">
            <button type="button" className={TOMBOL} onClick={() => putus(true)}>
              {"\u{2705} benar"}
            </button>
            <button type="button" className={TOMBOL} onClick={() => putus(false)}>
              {"\u{274C} salah"}
            </button>
          </div>
        </div>
      ) : tahap === "alasan" ? (
        <div className="space-y-1.5" role="group" aria-label="Pilih alasan">
          <p className="text-center text-sm font-black text-[#1C01A5]">Pilih alasan yang tepat:</p>
          {urut.map((i) => (
            <button key={l.alasan[i]} type="button" disabled={mati.includes(i)} onClick={() => alasan(i)} className={`${TOMBOL} block w-full py-1.5 text-left text-sm`}>
              {l.alasan[i]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ Satu soal ------------------------------ */
export function LangkahGudang({ ls, rupa, bicara, onBenar }: P) {
  const l = ls.langkah;
  const cara = ls.cara;
  const [selesai, setSelesai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [goyang, setGoyang] = useState(false);
  const [mati, setMati] = useState<number[]>([]);
  const [matiNama, setMatiNama] = useState<Bangun[]>([]);
  const salah = (p: string) => {
    setGoyang(true);
    window.setTimeout(() => setGoyang(false), 480);
    setPesan(p);
    bicara(p);
  };
  const info = (p: string) => {
    setPesan(p);
    bicara(p);
  };
  const tuntas = (p: string) => {
    setSelesai(true);
    setPesan(p);
    bicara(p);
    onBenar();
  };
  const pk: PK = { rupa, salah, tuntas, info };
  const kunciNama = namaJawab(l);
  const kunciAngka = angkaJawab(l);

  const jawabNama = (b: Bangun, terdengar = false, ditunjukkan = false) => {
    bicara(b);
    if (b === kunciNama) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${b}. ${kalimatKunci(l)}`);
    else {
      setMatiNama((s) => [...s, b]);
      salah(`${terdengar ? `Terdengar ${b}. ` : ""}${petunjukSalah(l, b)}`);
    }
  };
  const jawabAngka = (m: number, ditunjukkan = false) => {
    bicara(kata(m));
    if (m === kunciAngka) tuntas(`${ditunjukkan ? "Ini jawaban yang benar." : "Betul!"} Jawabannya ${kata(m)}. ${kalimatKunci(l)}`);
    else {
      setMati((s) => [...s, m]);
      salah(petunjukSalah(l, m));
    }
  };

  let badan: React.ReactNode;
  if (l.tipe === "salah") badan = <CariSalah {...pk} l={l} />;
  else if (l.tipe === "pilah") badan = <Pilah {...pk} l={l} />;
  else if (l.tipe === "cetakPilih") badan = <CetakPilih {...pk} l={l} />;
  else if (l.tipe === "urut") badan = <Urut {...pk} l={l} />;
  else if (l.tipe === "bs") badan = <BenarSalah {...pk} l={l} />;
  else if (l.tipe === "tabel") badan = <Tabel {...pk} l={l} />;
  else if (l.tipe === "nama")
    badan = (
      <div className="space-y-2">
        <PetunjukNama l={l} rupa={rupa} />
        {!selesai ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">Nama bangun ruangnya apa?</p>
            {cara === "suara" ? <JawabSuaraNama kunci={l.bangun} mati={matiNama} onJawab={(b, terdengar, t) => jawabNama(b, terdengar && b !== l.bangun, t)} onPesan={setPesan} /> : <PilihanNama mati={matiNama} onPilih={(b) => jawabNama(b)} />}
          </div>
        ) : null}
      </div>
    );
  else
    badan = (
      <div className="space-y-2">
        <TampilHitung l={l} rupa={rupa} />
        {!selesai ? (
          <div className="space-y-2">
            <p className="text-center text-sm font-black text-[#1C01A5]">{kalimatTanya(l)}</p>
            {cara === "kanvas" && jumlahHitung(l) <= 9 ? <JawabTulis kunci={jumlahHitung(l)} onBenar={(t) => jawabAngka(jumlahHitung(l), t)} onSalah={salah} /> : <PilihanAngka pilihan={pilihanAngka(l)} mati={mati} onPilih={(m) => jawabAngka(m)} />}
          </div>
        ) : null}
      </div>
    );
  return (
    <div className="space-y-3">
      <div className={goyang ? "lm-goyang" : ""}>{badan}</div>
      <p role="status" aria-live="polite" className={`min-h-[1.5rem] rounded-xl bg-white/85 px-2 text-center text-sm font-black ${selesai ? "text-[#15803D]" : "text-[#B45309]"}`}>
        {pesan}
      </p>
    </div>
  );
}
