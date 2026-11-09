"use client";

import React, { useContext, useState } from "react";
import { Bagan, type Sel } from "./gambar-pasangan-d";
import { KERTAS_GAMBAR } from "./SubBabA2Penjumlahan";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { SuaraCtx } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { JalurKotakB2, Kalimat, KotakSoal, SusunTabel, type SelSusun } from "./dasar-k2b2";
import { langkahBaganKurang, langkahBaganTambah, opsiB2, puluhanDari, satuanDari, susunKurang, susunTambah } from "./data-k2b2";

/* ------------------------------------------------------------------------ */
/* Mesin permainan bersama Matematika Kelas 2 Bab 2: jalur lompat, susun ke   */
/* bawah, bagan pasangan, pilihan jawaban, dan penghitung besar. Dipakai oleh */
/* permainan Sub-Bab A, B, dan C. Tanpa API dan tanpa acak (aman untuk SSR).  */
/* ------------------------------------------------------------------------ */

export const TOMBOL_BESAR =
  "rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-4 py-2 text-lg font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] active:translate-y-0.5 disabled:opacity-40";
export const TOMBOL_PUTIH =
  "rounded-2xl border-4 border-[#1C01A5] bg-white px-4 py-2 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] active:translate-y-0.5 disabled:opacity-40";

/* ------------------------------ Pilihan jawaban ------------------------------ */

/** Tiga pilihan angka dalam satu baris. Pilihan yang salah bergoyang. */
export function PilihanAngka({ opsi, keliru, onPilih, mati = false }: { opsi: number[]; keliru: number | null; onPilih: (n: number) => void; mati?: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {opsi.map((n) => (
        <button
          key={`${n}-${keliru === n ? "x" : "o"}`}
          type="button"
          aria-label={`Pilih angka ${n}`}
          onClick={() => onPilih(n)}
          disabled={mati}
          className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${keliru === n ? "igil-goyang" : ""}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

/** Pilihan jawaban berupa kalimat pendek, satu per baris. */
export function PilihanTeks({ opsi, keliru, onPilih, mati = false }: { opsi: string[]; keliru: number | null; onPilih: (i: number) => void; mati?: boolean }) {
  return (
    <div className="grid gap-2">
      {opsi.map((t, i) => (
        <button
          key={`${i}-${keliru === i ? "x" : "o"}`}
          type="button"
          aria-label={`Pilih: ${t}`}
          onClick={() => onPilih(i)}
          disabled={mati}
          className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-left text-base font-black leading-snug text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-40 ${keliru === i ? "igil-goyang" : ""}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/** Penghitung besar dengan tombol kurang dan tambah. */
export function Pencacah({
  nilai,
  min,
  max,
  onUbah,
  label,
  mati = false,
}: {
  nilai: number;
  min: number;
  max: number;
  onUbah: (n: number) => void;
  label: string;
  mati?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-3" role="group" aria-label={label}>
      <button type="button" aria-label={`Kurangi ${label}`} disabled={mati || nilai <= min} onClick={() => onUbah(nilai - 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
        −
      </button>
      <span className="flex h-14 min-w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-white px-2 text-4xl font-black text-[#1C01A5]" aria-live="polite">
        {nilai}
      </span>
      <button type="button" aria-label={`Tambah ${label}`} disabled={mati || nilai >= max} onClick={() => onUbah(nilai + 1)} className={`${TOMBOL_BESAR} h-14 w-14 !px-0 text-3xl`}>
        +
      </button>
    </div>
  );
}

/** Pesan sukses kecil di bawah sebuah permainan. */
export function Berhasil({ children }: { children: React.ReactNode }) {
  return <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">{children}</p>;
}

/* ------------------------------ Lompat di jalur bilangan ------------------------------ */

/**
 * Jalur kotak bilangan untuk melompat. Siswa mengetuk kotak berikutnya (maju) atau sebelumnya (mundur) satu per satu,
 * lalu menekan Berhenti. Banyak lompatan harus sama dengan `langkah`. Dipakai Picture A5, Picture B5, dan Picture C7.
 */
export function LompatGaris({
  dari,
  sampai,
  mulai,
  arah,
  langkah,
  onBeres,
  kataKerja,
}: {
  dari: number;
  sampai: number;
  mulai: number;
  arah: "maju" | "mundur";
  langkah: number;
  onBeres: (hasil: number) => void;
  /** Kata untuk kalimat hasil, misalnya "ditambah" atau "dikurangi". */
  kataKerja: string;
}) {
  const ucap = useContext(SuaraCtx);
  const [pos, setPos] = useState(mulai);
  const [busur, setBusur] = useState<[number, number][]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const hop = busur.length;
  const geser = arah === "maju" ? 1 : -1;

  const lompat = (n: number) => {
    if (beres) return;
    setKabar(null);
    setBusur([...busur, [pos, n]]);
    setPos(n);
    ucap(sebut(n));
  };
  const ulang = () => {
    setPos(mulai);
    setBusur([]);
    setKabar(null);
  };
  const berhenti = () => {
    if (beres) return;
    if (hop === langkah) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      ucap(`${sebut(mulai)} ${kataKerja} ${sebut(langkah)} sama dengan ${sebut(pos)}.`);
      onBeres(pos);
      return;
    }
    if (hop < langkah) setKabar({ teks: `Kamu baru melompat ${sebut(hop)} kali. Kita butuh ${sebut(langkah)} lompatan. Lanjutkan ke ${arah === "maju" ? "kanan" : "kiri"}.`, ok: false });
    else setKabar({ teks: `Kamu sudah melompat ${sebut(hop)} kali, padahal cukup ${sebut(langkah)}. Tekan Ulangi, lalu hitung lompatannya pelan-pelan.`, ok: false });
  };

  return (
    <>
      <div className={`${KERTAS_GAMBAR} relative space-y-2 rounded-lg p-2`}>
        <JalurKotakB2
          dari={dari}
          sampai={sampai}
          mulai={mulai}
          sorot={[pos]}
          lompat={busur}
          onPilih={lompat}
          bisaDipilih={(n) => !beres && n === pos + geser && n >= dari && n <= sampai}
          label={`Jalur bilangan ${dari} sampai ${sampai}. Kamu berada di ${pos}.`}
        />
        <div className="flex items-center justify-center gap-2 text-center">
          <span className="rounded-full border-2 border-[#1C01A5] bg-white px-3 py-0.5 text-sm font-black text-[#1C01A5]">Lompatan: {hop}</span>
          <span className="rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 text-sm font-black text-[#1C01A5]">Kamu di: {pos}</span>
        </div>
        {beres ? (
          <Kalimat a={mulai} op={arah === "maju" ? "+" : "−"} b={langkah} c={pos} />
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={ulang} disabled={hop === 0} className={TOMBOL_PUTIH}>
              ↩ Ulangi
            </button>
            <button type="button" onClick={berhenti} disabled={hop === 0} className={TOMBOL_BESAR}>
              ✋ Berhenti di sini
            </button>
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Susun ke bawah ------------------------------ */

type TahapSusun = "susun" | "satuan" | "pindah" | "urai" | "puluhan" | "selesai";

const sel = (n: SelSusun["n"], atas?: string, bawah?: string): SelSusun => ({ n, atas, bawah });

/**
 * Susun ke bawah, langkah demi langkah. Penjumlahan: susun, jumlahkan satuan, pindah sepuluh bila perlu, jumlahkan puluhan.
 * Pengurangan: susun, urai satu puluhan bila satuan tidak cukup, kurangkan satuan, kurangkan puluhan.
 * Angka soal biru besar, angka jawaban hijau besar, catatan pindah dan urai merah kecil. Dipakai Picture A6 dan B6.
 */
export function SusunBawah({ op, a, b, onBeres }: { op: "+" | "−"; a: number; b: number; onBeres: (hasil: number) => void }) {
  const ucap = useContext(SuaraCtx);
  const tambah = op === "+";
  const t = tambah ? susunTambah(a, b) : null;
  const k = tambah ? null : susunKurang(a, b);
  const perluKhusus = tambah ? t!.pindah : k!.urai;
  const [tahap, setTahap] = useState<TahapSusun>("susun");
  const [satuanOk, setSatuanOk] = useState(false);
  const [khususOk, setKhususOk] = useState(false);
  const [puluhanOk, setPuluhanOk] = useState(false);
  const [bawahTaruh, setBawahTaruh] = useState(false);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();

  const pa = puluhanDari(a);
  const sa = satuanDari(a);
  const sb = satuanDari(b);
  const kata = tambah ? "ditambah" : "dikurangi";

  const salah = (teks: string, n: number | null) => {
    setKeliru(n);
    setKabar({ teks, ok: false });
  };
  const benar = (lanjut: TahapSusun, ucapan: string) => {
    setKeliru(null);
    setKabar(null);
    setTahap(lanjut);
    ucap(ucapan);
  };

  const taruh = (kolom: "p" | "s") => {
    if (kolom !== "s") return salah("Satuan harus lurus dengan satuan. Taruh angkanya di kolom Satuan.", null);
    setBawahTaruh(true);
    if (tambah) benar("satuan", `Satuan lurus dengan satuan. Sekarang jumlahkan satuannya: ${sebut(sa)} ditambah ${sebut(sb)}.`);
    else benar(k!.urai ? "urai" : "satuan", k!.urai ? `Satuan atas ${sebut(sa)} lebih kecil dari ${sebut(sb)}. Satuannya tidak cukup.` : `Sekarang kurangkan satuannya: ${sebut(sa)} dikurangi ${sebut(sb)}.`);
  };

  const jawabSatuan = (n: number) => {
    const kunci = tambah ? t!.jumlahSatuan : k!.satuanHasil;
    if (n !== kunci) {
      return salah(tambah ? `${sebut(sa)} ditambah ${sebut(sb)} bukan ${sebut(n)}. Hitung maju dari ${sebut(sa)}.` : `Hitung mundur dari ${sebut(k!.satuanAtas)} sebanyak ${sebut(sb)}.`, n);
    }
    setSatuanOk(true);
    if (tambah && t!.pindah) benar("pindah", `${sebut(sa)} ditambah ${sebut(sb)} sama dengan sepuluh. Sepuluh satuan sama dengan satu puluhan. Pindahkan ke kolom puluhan.`);
    else benar("puluhan", tambah ? `Satuannya ${sebut(kunci)}. Sekarang jumlahkan puluhannya.` : `Satuannya ${sebut(kunci)}. Sekarang kurangkan puluhannya.`);
  };

  const khusus = () => {
    setKhususOk(true);
    if (tambah) benar("puluhan", "Sepuluh satuan ditukar menjadi satu puluhan dan dipindahkan ke kolom puluhan. Satuan di jawaban menjadi nol.");
    else benar("satuan", `Satu puluhan diurai menjadi sepuluh satuan. Sekarang ada ${sebut(sa)} ditambah sepuluh, yaitu ${sebut(sa + 10)} satuan.`);
  };

  const jawabPuluhan = (n: number) => {
    const kunci = tambah ? t!.jumlahPuluhan : k!.puluhanHasil;
    if (n !== kunci) {
      return salah(tambah ? `Jumlahkan puluhannya: ${pa}${t!.pindah ? " ditambah 1 pindahan" : ""}.` : `Kurangkan puluhannya: ${k!.puluhanAtas} dikurangi ${k!.puluhanB}.`, n);
    }
    setPuluhanOk(true);
    setKeliru(null);
    setKabar(null);
    setTahap("selesai");
    letusan.picu();
    ucap(`${sebut(a)} ${kata} ${sebut(b)} sama dengan ${sebut(a + (tambah ? b : -b))}.`);
    onBeres(tambah ? t!.hasil : k!.hasil);
  };

  /* Isi tabel menurut keadaan. */
  const atas: [SelSusun, SelSusun] = tambah
    ? [sel(pa, khususOk ? "+1" : undefined), sel(sa)]
    : [sel(pa, khususOk ? "−1" : undefined, khususOk ? String(k!.puluhanAtas) : undefined), sel(sa, undefined, khususOk ? String(k!.satuanAtas) : undefined)];
  const bawah: [SelSusun, SelSusun] = [sel(null), sel(bawahTaruh ? sb : null)];
  const hasilSatuan = tambah ? (satuanOk && (!t!.pindah || khususOk) ? t!.satuanHasil : "?") : satuanOk ? k!.satuanHasil : "?";
  const hasilPuluhan = puluhanOk ? (tambah ? t!.jumlahPuluhan : k!.puluhanHasil) : "?";
  const hasil: [SelSusun, SelSusun] = [sel(hasilPuluhan), sel(hasilSatuan, tambah && khususOk && t!.pindah ? String(t!.jumlahSatuan) : undefined)];
  const nyala = tahap === "satuan" || tahap === "pindah" || tahap === "urai" ? "s" : tahap === "puluhan" ? "p" : null;

  const petunjuk: Record<TahapSusun, string> = {
    susun: `Langkah 1. Susun ${b} di bawah ${a}. Satuan harus lurus dengan satuan.`,
    satuan: tambah ? `Langkah 2. Jumlahkan satuan dengan satuan: ${sa} + ${sb} = ?` : `Langkah 2. Kurangkan satuan dengan satuan: ${k!.satuanAtas} − ${sb} = ?`,
    pindah: "Satuannya sepuluh. Tukar 10 satuan menjadi 1 puluhan, lalu pindahkan.",
    urai: `${sa} dikurangi ${sb} tidak cukup. Urai 1 puluhan menjadi 10 satuan.`,
    puluhan: tambah ? `Langkah 3. Jumlahkan puluhan: ${pa}${t!.pindah ? " + 1" : ""} = ?` : `Langkah 3. Kurangkan puluhan: ${k!.puluhanAtas} − ${k!.puluhanB} = ?`,
    selesai: `${a} ${op} ${b} = ${tambah ? t!.hasil : k!.hasil}`,
  };

  return (
    <>
      <div className={`${KERTAS_GAMBAR} relative space-y-3 rounded-lg p-3`}>
        <KotakSoal>
          {a} {op} {b} = ?
        </KotakSoal>
        <SusunTabel op={op} atas={atas} bawah={bawah} hasil={hasil} nyala={nyala} />
        <p className="rounded-2xl border-4 border-[#1C01A5]/30 bg-white px-2 py-1.5 text-center text-base font-black leading-snug text-[#1C01A5]" aria-live="polite">
          {petunjuk[tahap]}
        </p>
        {tahap === "susun" ? (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => taruh("p")} className={TOMBOL_PUTIH}>
              Taruh {b} di Puluhan
            </button>
            <button type="button" onClick={() => taruh("s")} className={TOMBOL_BESAR}>
              Taruh {b} di Satuan
            </button>
          </div>
        ) : null}
        {tahap === "satuan" ? <PilihanAngka opsi={opsiB2(tambah ? t!.jumlahSatuan : k!.satuanHasil, [0, 18])} keliru={keliru} onPilih={jawabSatuan} /> : null}
        {tahap === "pindah" || tahap === "urai" ? (
          <button type="button" onClick={khusus} className={`${TOMBOL_BESAR} w-full`}>
            {tahap === "pindah" ? "🔁 Pindahkan 1 puluhan ke kolom Puluhan" : "🧱 Urai 1 puluhan jadi 10 satuan"}
          </button>
        ) : null}
        {tahap === "puluhan" ? <PilihanAngka opsi={opsiB2(tambah ? t!.jumlahPuluhan : k!.puluhanHasil, [0, 9])} keliru={keliru} onPilih={jawabPuluhan} /> : null}
        {tahap === "selesai" ? <Berhasil>{`${a} ${op} ${b} = ${tambah ? t!.hasil : k!.hasil}. ${perluKhusus ? (tambah ? "Sepuluh satuan sudah dipindah." : "Satu puluhan sudah diurai.") : "Tanpa pindah dan tanpa urai."}`}</Berhasil> : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

/* ------------------------------ Bagan pasangan ------------------------------ */

/**
 * Bagan pasangan langkah demi langkah. Penjumlahan: pisah bilangan pertama jadi 10 dan satuan, jumlahkan satuan,
 * tambahkan sepuluh. Pengurangan: pisah kedua bilangan, kurangkan sepuluh, kurangkan satuan, tulis hasil.
 * Dipakai Picture A7 dan B7.
 */
export function LangkahBagan({ mode, a, b, onBeres }: { mode: "tambah" | "kurang"; a: number; b: number; onBeres: (hasil: number) => void }) {
  const ucap = useContext(SuaraCtx);
  const langkah = mode === "tambah" ? langkahBaganTambah(a, b) : langkahBaganKurang(a, b);
  const [i, setI] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const selesai = i >= langkah.length;
  const tanda = mode === "tambah" ? "+" : "−";
  const kata = mode === "tambah" ? "ditambah" : "dikurangi";
  const x = satuanDari(a);
  const y = satuanDari(b);

  const sudah = (bagian: string) => langkah.findIndex((l) => l.bagian === bagian) < i && langkah.findIndex((l) => l.bagian === bagian) >= 0;

  const jawab = (n: number) => {
    const l = langkah[i];
    if (n !== l.jawab) {
      setKeliru(n);
      setKabar({ teks: l.bagian === "a" || l.bagian === "b" ? "Pisahkan menjadi sepuluh dan satuannya. Angka kanan adalah satuan." : "Hitung lagi pelan-pelan. Gunakan jari atau jalur bilangan kalau perlu.", ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    const berikut = i + 1;
    setI(berikut);
    const baca: Record<string, string> = {
      a: `${sebut(a)} dipisah menjadi sepuluh dan ${sebut(l.jawab)}.`,
      b: `${sebut(b)} dipisah menjadi sepuluh dan ${sebut(l.jawab)}.`,
      puluhan: "Sepuluh dikurangi sepuluh sama dengan nol.",
      satuan: mode === "tambah" ? `${sebut(x)} ditambah ${sebut(b)} sama dengan ${sebut(l.jawab)}.` : `${sebut(x)} dikurangi ${sebut(y)} sama dengan ${sebut(l.jawab)}.`,
      hasil: `${sebut(a)} ${kata} ${sebut(b)} sama dengan ${sebut(l.jawab)}.`,
    };
    ucap(baca[l.bagian]);
    if (berikut >= langkah.length) {
      letusan.picu();
      onBeres(l.jawab);
    }
  };

  const bagianA: [Sel, Sel, Sel] = [a, 10, sudah("a") ? x : "?"];
  const bagianB: [Sel, Sel, Sel] = [b, 10, sudah("b") ? y : "?"];

  return (
    <>
      <div className={`${KERTAS_GAMBAR} relative space-y-2 rounded-lg p-3`}>
        <KotakSoal>
          {a} {tanda} {b} = ?
        </KotakSoal>
        {mode === "tambah" ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-1/2">
              <Bagan gabungan={bagianA[0]} a={bagianA[1]} b={bagianA[2]} nyala={langkah[i]?.bagian === "a" ? ["b"] : []} kelas="w-full max-w-[190px]" />
            </div>
            <div className="w-1/2 space-y-1 text-center text-2xl font-black text-[#1C01A5]">
              <p>
                <span className="text-[#2563EB]">{b}</span> tetap
              </p>
              {sudah("satuan") ? (
                <p>
                  {x} + {b} = <span className="text-[#16A34A]">{x + b}</span>
                </p>
              ) : null}
              {sudah("hasil") ? (
                <p>
                  10 + {x + b} = <span className="text-[#16A34A]">{a + b}</span>
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-1">
              <div className="w-1/2">
                <Bagan gabungan={bagianA[0]} a={bagianA[1]} b={bagianA[2]} nyala={langkah[i]?.bagian === "a" ? ["b"] : []} kelas="w-full max-w-[160px]" />
              </div>
              <span className="text-3xl font-black text-[#1C01A5]">−</span>
              <div className="w-1/2">
                <Bagan gabungan={bagianB[0]} a={bagianB[1]} b={bagianB[2]} nyala={langkah[i]?.bagian === "b" ? ["b"] : []} kelas="w-full max-w-[160px]" />
              </div>
            </div>
            <div className="space-y-0.5 text-center text-2xl font-black text-[#1C01A5]">
              {sudah("puluhan") ? <p>10 − 10 = <span className="text-[#16A34A]">0</span></p> : null}
              {sudah("satuan") ? (
                <p>
                  {x} − {y} = <span className="text-[#16A34A]">{x - y}</span>
                </p>
              ) : null}
              {sudah("hasil") ? (
                <p>
                  {a} − {b} = <span className="text-[#16A34A]">{a - b}</span>
                </p>
              ) : null}
            </div>
          </>
        )}
        {selesai ? (
          <Berhasil>
            {a} {tanda} {b} = {mode === "tambah" ? a + b : a - b}. Semua bagian bagan sudah terisi.
          </Berhasil>
        ) : (
          <>
            <p className="rounded-2xl border-4 border-[#1C01A5]/30 bg-white px-2 py-1.5 text-center text-lg font-black leading-snug text-[#1C01A5]" aria-live="polite">
              Langkah {i + 1} dari {langkah.length}: {langkah[i].tanya}
            </p>
            <PilihanAngka opsi={opsiB2(langkah[i].jawab, [0, 20])} keliru={keliru} onPilih={jawab} />
          </>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}
