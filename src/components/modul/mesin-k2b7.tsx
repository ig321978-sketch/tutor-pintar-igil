"use client";

import React, { useContext, useState } from "react";
import { KERTAS_ANGKA } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanPensil, SuaraCtx } from "./tahap-b-gaya";
import { Berhasil, Pencacah, PilihanAngka, TOMBOL_BESAR, TOMBOL_PUTIH } from "./permainan-k2b2";
import { GridSeratus, PapanNilai, StripAngka } from "./diagram-k2b7";
import { hasilKartu, hasilLangkah, opsiBilangan, selisihTebakan, tebakanPilihan, type SoalKartu, type SoalLangkah } from "./data-k2b7";

/* ------------------------------------------------------------------------ */
/* Mesin permainan Matematika Kelas 2 Bab 7 yang aman untuk tahap Picture:     */
/* menulis angka, papan dua angka, tabel seratus, tebak lalu hitung, langkah    */
/* maju dan mundur, serta menyusun dua kartu. Gambar diberikan dari luar lewat  */
/* props, jadi mesin ini tidak mengimpor gambar benda. Tanpa API dan tanpa acak. */
/* ------------------------------------------------------------------------ */

/* ------------------------------ Menulis satu angka ------------------------------ */

export type SoalTulis = { visual?: React.ReactNode; tanya: string; jawab: number; min: number; max: number; label: string; petunjuk: string; pesan: string };

/** Atur penghitung besar sampai sama dengan jawaban, lalu tekan Periksa. */
export function TulisAngka({ soal, onBeres, pesanBeres }: { soal: SoalTulis[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [nilai, setNilai] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];

  const periksa = () => {
    if (nilai !== s.jawab) {
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${s.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: s.pesan, ok: true });
      setNomor(nomor + 1);
      setNilai(0);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            {s.visual ? <div className="flex justify-center">{s.visual}</div> : null}
            <CatatanPensil pendek={s.tanya} />
            <Pencacah nilai={nilai} min={s.min} max={s.max} onUbah={setNilai} label={s.label} />
            <button type="button" aria-label="Periksa jawaban" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Papan dua angka ------------------------------ */

export type SoalPapan = { visual?: React.ReactNode; tanya: string; jawab: number; petunjuk: string; pesan: string };

/** Atur angka puluhan dan angka satuan pada papan nilai tempat sampai sama dengan jawaban. Jawaban 1 sampai 99. */
export function PapanDigit({ soal, onBeres, pesanBeres }: { soal: SoalPapan[]; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [p, setP] = useState(0);
  const [s, setS] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const q = soal[Math.min(nomor, soal.length - 1)];

  const periksa = () => {
    if (p * 10 + s !== q.jawab) {
      setKabar({ teks: q.petunjuk, ok: false });
      return;
    }
    if (nomor + 1 >= soal.length) {
      setKabar(null);
      letusan.picu();
      ucap(`${q.pesan} ${pesanBeres}`);
      setNomor(nomor + 1);
      onBeres();
    } else {
      setKabar({ teks: q.pesan, ok: true });
      setNomor(nomor + 1);
      setP(0);
      setS(0);
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            {q.visual ? <div className="flex justify-center">{q.visual}</div> : null}
            <CatatanPensil pendek={q.tanya} />
            <PapanNilai p={p} s={s} />
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-center text-xs font-black text-[#1C01A5]">Angka puluhan</p>
                <Pencacah nilai={p} min={0} max={9} onUbah={setP} label="puluhan" />
              </div>
              <div className="space-y-1">
                <p className="text-center text-xs font-black text-[#1C01A5]">Angka satuan</p>
                <Pencacah nilai={s} min={0} max={9} onUbah={setS} label="satuan" />
              </div>
            </div>
            <button type="button" aria-label="Periksa papan" onClick={periksa} className={`${TOMBOL_BESAR} w-full`}>
              Periksa
            </button>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Tabel seratus ------------------------------ */

/** Isi sel yang kosong pada tabel bilangan 51 sampai 100 dengan memilih satu dari tiga angka. */
export function TabelSeratus({ tersembunyi, nomorAwal = 0, dari = 51, sampai = 100, onBeres, pesanBeres }: { tersembunyi: number[]; nomorAwal?: number; dari?: number; sampai?: number; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [terisi, setTerisi] = useState<number[]>([]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const urut = [...tersembunyi].sort((a, b) => a - b);
  const aktif = urut.find((x) => !terisi.includes(x)) ?? null;
  const beres = aktif === null;

  const pilih = (n: number) => {
    if (aktif === null) return;
    if (n !== aktif) {
      setKeliru(n);
      setKabar({ teks: `Belum tepat. Bilangan sebelum kotak itu ${aktif - 1}, dan sesudahnya ${aktif + 1}. Cari bilangan di antaranya.`, ok: false });
      return;
    }
    setKeliru(null);
    const baru = [...terisi, aktif];
    setTerisi(baru);
    if (urut.every((x) => baru.includes(x))) {
      setKabar(null);
      letusan.picu();
      ucap(`${aktif}. ${pesanBeres}`);
      onBeres();
    } else {
      setKabar({ teks: `${aktif}.`, ok: true });
    }
  };

  const opsi = aktif === null ? [] : opsiBilangan(aktif, nomorAwal + terisi.length);
  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <GridSeratus dari={dari} sampai={sampai} tersembunyi={tersembunyi} terisi={terisi} aktif={aktif} />
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <CatatanPensil pendek={`Bilangan apa yang cocok di kotak yang menyala?`} />
            <PilihanAngka opsi={opsi} keliru={keliru} onPilih={pilih} />
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Tebak lalu hitung ------------------------------ */

/**
 * Dua tahap. Pertama menebak kira-kira banyaknya (tidak ada salah, hanya tebakan). Lalu benda dikelompokkan
 * sepuluh-sepuluh dan siswa memilih banyak yang sebenarnya. Umpan balik menyebut selisih tebakan.
 */
export function TebakHitung({
  n,
  sebar,
  kelompok,
  nama,
  nomor,
  onBeres,
  pesanBeres,
}: {
  n: number;
  sebar: React.ReactNode;
  kelompok: React.ReactNode;
  nama: string;
  nomor: number;
  onBeres: () => void;
  pesanBeres: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [tebak, setTebak] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const pilihan = tebakanPilihan(n);
  const opsi = opsiBilangan(n, nomor);

  const pilihHitung = (x: number) => {
    if (x !== n) {
      setKeliru(x);
      setKabar({ teks: "Belum tepat. Hitung kelompok sepuluh dulu, misalnya sepuluh, dua puluh, tiga puluh. Lalu tambahkan yang lepas.", ok: false });
      return;
    }
    setKeliru(null);
    setSelesai(true);
    const d = selisihTebakan(tebak ?? n, n);
    const komentar = d === 0 ? "Tebakanmu tepat sekali." : d <= 10 ? `Tebakanmu berbeda ${d}. Dekat sekali.` : `Tebakanmu berbeda ${d}. Dengan kelompok sepuluh, tebakan makin dekat.`;
    setKabar(null);
    letusan.picu();
    ucap(`Banyak ${nama} adalah ${n}. ${komentar} ${pesanBeres}`);
    onBeres();
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {tebak === null ? (
          <>
            <div className="flex justify-center">{sebar}</div>
            <CatatanPensil pendek={`Tebak dulu: kira-kira ada berapa ${nama}?`} />
            <div className="grid grid-cols-3 gap-2" role="group" aria-label="Pilih tebakanmu">
              {pilihan.map((x) => (
                <button key={x} type="button" aria-label={`Tebakanku sekitar ${x}`} onClick={() => setTebak(x)} className={`${TOMBOL_PUTIH} !px-1 !text-2xl`}>
                  {x}
                </button>
              ))}
            </div>
            <p className="text-center text-xs font-black text-[#1C01A5]/70">Tidak ada yang salah. Ini baru tebakan.</p>
          </>
        ) : (
          <>
            <div className="flex justify-center">{kelompok}</div>
            <p className="rounded-xl bg-[#FFF7CC] px-2 py-1 text-center text-sm font-black text-[#1C01A5]">Tebakanku: {tebak}</p>
            <CatatanPensil pendek={`Sekarang hitung per kelompok sepuluh. Berapa banyak ${nama} sebenarnya?`} />
            {selesai ? <Berhasil>{`Banyaknya ${n}. ${pesanBeres}`}</Berhasil> : <PilihanAngka opsi={opsi} keliru={keliru} onPilih={pilihHitung} />}
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Langkah maju dan mundur ------------------------------ */

/**
 * Penanda berada di sebuah bilangan pada garis angka. Tekan Maju atau Mundur satu langkah demi satu langkah
 * sesuai perintah. Selesai bila penanda berhenti di bilangan tujuan.
 */
export function LangkahMaju({ soal, penanda, onBeres, pesanBeres }: { soal: SoalLangkah[]; penanda: React.ReactNode | ((s: SoalLangkah) => React.ReactNode); onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [nomor, setNomor] = useState(0);
  const [pos, setPos] = useState(soal[0].mulai);
  const [langkahDiambil, setLangkahDiambil] = useState(0);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = nomor >= soal.length;
  const s = soal[Math.min(nomor, soal.length - 1)];
  const tujuan = hasilLangkah(s);
  const dari = Math.max(1, Math.min(s.mulai, tujuan) - 3);
  const sampai = Math.min(100, Math.max(s.mulai, tujuan) + 3);
  const kata = s.arah === "maju" ? "maju" : "mundur";

  const gerak = (arah: 1 | -1) => {
    const baru = pos + arah;
    if (baru < 1 || baru > 100) return;
    const n = langkahDiambil + 1;
    setPos(baru);
    setLangkahDiambil(n);
    if (baru === tujuan && n === s.langkah) {
      const pesan = `${s.arah === "maju" ? `${s.langkah} lebihnya dari ${s.mulai} adalah ${tujuan}.` : `${s.langkah} kurangnya dari ${s.mulai} adalah ${tujuan}.`}`;
      if (nomor + 1 >= soal.length) {
        setKabar(null);
        letusan.picu();
        ucap(`${pesan} ${pesanBeres}`);
        setNomor(nomor + 1);
        onBeres();
      } else {
        setKabar({ teks: pesan, ok: true });
        setNomor(nomor + 1);
        setPos(soal[nomor + 1].mulai);
        setLangkahDiambil(0);
      }
    } else if (n >= s.langkah) {
      setKabar({ teks: `Perintahnya ${kata} ${s.langkah} langkah dari ${s.mulai}. Tekan Ulang, lalu hitung langkahnya lagi.`, ok: false });
    }
  };
  const ulang = () => {
    setPos(s.mulai);
    setLangkahDiambil(0);
    setKabar(null);
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        {beres ? (
          <Berhasil>{pesanBeres}</Berhasil>
        ) : (
          <>
            <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">
              Soal {nomor + 1} dari {soal.length}
            </p>
            <CatatanPensil pendek={`Penanda di bilangan ${s.mulai}. ${kata === "maju" ? "Maju" : "Mundur"} ${s.langkah} langkah.`} />
            <StripAngka dari={dari} sampai={sampai} tandai={pos} penanda={typeof penanda === "function" ? penanda(s) : penanda} />
            <p className="text-center text-lg font-black text-[#1C01A5]" aria-live="polite">
              Langkah: {langkahDiambil}
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button type="button" aria-label="Mundur satu langkah" onClick={() => gerak(-1)} className={`${TOMBOL_PUTIH} !px-1`}>
                ◀ Mundur
              </button>
              <button type="button" aria-label="Maju satu langkah" onClick={() => gerak(1)} className={`${TOMBOL_BESAR} !px-1`}>
                Maju ▶
              </button>
              <button type="button" aria-label="Ulang dari awal" onClick={ulang} className={`${TOMBOL_PUTIH} !px-1`}>
                ↺ Ulang
              </button>
            </div>
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Menyusun dua kartu ------------------------------ */

/** Dua kartu angka disusun pada tempat puluhan dan satuan menjadi bilangan terbesar atau terkecil. Diperiksa otomatis. */
export function SusunDuaKartu({ soal, onBeres, pesanBeres }: { soal: SoalKartu; onBeres: () => void; pesanBeres: string }) {
  const ucap = useContext(SuaraCtx);
  const [dipilih, setDipilih] = useState<number | null>(null);
  const [slot, setSlot] = useState<[number | null, number | null]>([null, null]);
  const [selesai, setSelesai] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const target = hasilKartu(soal);
  const kata = soal.arah === "besar" ? "paling besar" : "paling kecil";
  const dipakai = slot.filter((x): x is number => x !== null);

  const taruh = (i: 0 | 1) => {
    if (selesai || dipilih === null || slot[i] !== null) return;
    const baru: [number | null, number | null] = [slot[0], slot[1]];
    baru[i] = dipilih;
    setSlot(baru);
    setDipilih(null);
    if (baru[0] !== null && baru[1] !== null) {
      const hasil = soal.kartu[baru[0]] * 10 + soal.kartu[baru[1]];
      if (hasil === target) {
        setSelesai(true);
        setKabar(null);
        letusan.picu();
        ucap(`Bilangan yang ${kata} adalah ${target}. ${pesanBeres}`);
        onBeres();
      } else {
        setKabar({ teks: `Itu ${hasil}. Untuk bilangan ${soal.arah === "besar" ? "paling besar" : "paling kecil"}, taruh kartu yang ${soal.arah === "besar" ? "lebih besar" : "lebih kecil"} di tempat puluhan.`, ok: false });
        setSlot([null, null]);
      }
    }
  };

  return (
    <>
      <div className={`${KERTAS_ANGKA} space-y-3`}>
        <CatatanPensil pendek={`Susun dua kartu menjadi bilangan yang ${kata}.`} />
        <div className="flex items-end justify-center gap-3">
          {([0, 1] as const).map((i) => (
            <button
              key={i}
              type="button"
              aria-label={`Tempat ${i === 0 ? "puluhan" : "satuan"}${slot[i] !== null ? `, berisi ${soal.kartu[slot[i] as number]}` : ", kosong"}`}
              disabled={selesai || slot[i] !== null}
              onClick={() => taruh(i)}
              className={`flex flex-col items-center overflow-hidden rounded-xl border-[3px] border-[#1C01A5] bg-white disabled:opacity-100 ${dipilih !== null && slot[i] === null ? "ring-4 ring-[#F0AB00]/70" : ""}`}
            >
              <span className="w-full px-3 py-0.5 text-xs font-black text-[#1C01A5]" style={{ backgroundColor: i === 0 ? "#BAE6FD" : "#FDE68A" }}>
                {i === 0 ? "Puluhan" : "Satuan"}
              </span>
              <span className="flex h-14 w-16 items-center justify-center text-4xl font-black text-[#1C01A5]">{slot[i] !== null ? soal.kartu[slot[i] as number] : ""}</span>
            </button>
          ))}
        </div>
        {selesai ? (
          <Berhasil>{`${target} adalah bilangan yang ${kata}. ${pesanBeres}`}</Berhasil>
        ) : (
          <div className="flex justify-center gap-3" role="group" aria-label="Kartu angka">
            {soal.kartu.map((angka, i) =>
              dipakai.includes(i) ? null : (
                <button key={i} type="button" aria-label={`Kartu ${angka}`} aria-pressed={dipilih === i} onClick={() => setDipilih(dipilih === i ? null : i)} className={`flex h-20 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-5xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${dipilih === i ? "ring-4 ring-[#F0AB00]" : ""}`}>
                  {angka}
                </button>
              ),
            )}
          </div>
        )}
        {!selesai ? <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kartu, lalu ketuk tempatnya.</p> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
