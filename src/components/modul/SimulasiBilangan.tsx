"use client";

import React, { useEffect, useRef, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU, sebut } from "./simulasi-bersama";
import { BIRU, Bingkai, BaganPasangan, GarisAngka, KalimatBesar, MERAH, Pengatur, eja } from "./komponen-lab";
import type { KeadaanBilangan } from "./misi-bab1";
import { MAKS, batas, batasPecah, hubungan, kalimatPasangan, ketukKotak, pasangan, selBingkai } from "./lab-bilangan-bab1";

/**
 * Perwakilan yang boleh tampil. Di dalam Materi, tiap sub-bab hanya membuka perwakilan yang sudah diajarkan
 * (mis. Bingkai Sepuluh dan Garis Bilangan baru di Sub-Bab B), jadi pembungkus memilih `tampil` per sub-bab.
 */
export type TampilBilangan = "benda" | "bingkai" | "garis" | "pasangan" | "banding";
export const SEMUA_TAMPIL: TampilBilangan[] = ["benda", "bingkai", "garis", "pasangan", "banding"];

const LABEL_TAMPIL: Record<TampilBilangan, string> = {
  benda: "Benda",
  bingkai: "Bingkai sepuluh",
  garis: "Garis bilangan",
  pasangan: "Pasangan",
  banding: "Bandingkan",
};

const AWAL_LIHAT: Record<TampilBilangan, boolean> = { benda: true, bingkai: true, garis: true, pasangan: true, banding: false };

/** Langkah selidik "Coba ini!" yang cocok dengan perwakilan yang tampil. Tanpa kunci jawaban. */
function langkahCoba(tampil: TampilBilangan[], awalBanding: boolean): string[] {
  const ada = (k: TampilBilangan) => tampil.includes(k);
  const hasil: string[] = [];
  if (ada("bingkai")) {
    hasil.push(ada("garis") ? "Ketuk kotak ke-7 di bingkai sepuluh. Lihat garis bilangan ikut pindah." : "Ketuk kotak ke-7 di bingkai sepuluh. Lihat benda ikut berubah.");
  } else if (ada("garis")) {
    hasil.push("Ketuk satu angka di garis bilangan. Lihat benda ikut berubah.");
  } else if (ada("benda")) {
    hasil.push("Ketuk satu kotak benda. Lihat angka dan nama bilangannya ikut berubah.");
  }
  if (ada("benda") && (ada("bingkai") || ada("garis"))) hasil.push("Tekan + beberapa kali. Lihat angka dan nama bilangannya ikut berubah.");
  if (ada("pasangan")) hasil.push("Tekan + atau – pada Bagian merah. Bilangan itu terdiri dari dua bagian.");
  if (ada("banding")) hasil.push(awalBanding ? "Atur dua bilangan, lalu lihat tanda >, <, atau =." : "Nyalakan Bandingkan. Atur dua bilangan, lalu lihat tanda >, <, atau =.");
  if (hasil.length === 1 && ada("benda") && !ada("bingkai") && !ada("garis")) hasil.push("Tekan – sampai bilangannya nol. Apa yang terlihat?");
  return hasil;
}

const URUT_KATA = ["Satu", "Dua", "Tiga", "Empat", "Lima"];

/* ------------------------------------------------------------------------ */
/* Simulasi 1 (Bab 1): Laboratorium Bilangan, metode PhET.                    */
/* Satu bilangan, empat tampilan yang saling terhubung. Logika di             */
/* lab-bilangan-bab1.ts. Tanpa jaringan.                                      */
/* ------------------------------------------------------------------------ */

function BarisBenda({ n, jenis, nama, onKetuk }: { n: number; jenis: "apel" | "jeruk"; nama: string; onKetuk?: (i: number) => void }) {
  return (
    <div className="grid grid-cols-5 gap-1.5 min-[420px]:grid-cols-10" role="group" aria-label={nama}>
      {Array.from({ length: MAKS }, (_, i) => {
        const ada = i < n;
        const isi = (
          <>
            <span className={ada ? "igil-muncul" : "opacity-15"}>
              <BendaSvg jenis={jenis} kelas="h-8 w-8" />
            </span>
            <span className={`text-xs font-black ${ada ? "text-[#1C01A5]" : "text-[#1C01A5]/25"}`}>{i + 1}</span>
          </>
        );
        const gaya = `flex flex-col items-center rounded-lg border-2 px-0.5 py-0.5 ${ada ? "border-[#1C01A5]/40 bg-white" : "border-dashed border-[#1C01A5]/20 bg-[#F5F3FF]"}`;
        return onKetuk ? (
          <button key={i} type="button" aria-label={`Benda ke-${i + 1}${ada ? "" : ", kosong"}`} onClick={() => onKetuk(i)} className={gaya}>
            {isi}
          </button>
        ) : (
          <span key={i} className={gaya}>
            {isi}
          </span>
        );
      })}
    </div>
  );
}

export default function SimulasiBilangan({
  speakGuru,
  tampil = SEMUA_TAMPIL,
  awal,
  onKeadaan,
}: {
  speakGuru: (t: string) => void;
  /** Perwakilan yang tersedia. Bawaan: semuanya (tab Simulasi lama). */
  tampil?: TampilBilangan[];
  /** Perwakilan yang menyala saat simulasi dibuka. Bawaan: benda, bingkai, garis, pasangan. */
  awal?: Partial<Record<TampilBilangan, boolean>>;
  /** Melapor keadaan ke papan misi (bila ada). */
  onKeadaan?: (k: KeadaanBilangan) => void;
}) {
  const [n, setN] = useState(6);
  const [m, setM] = useState(4);
  const [a, setA] = useState(2);
  const [lihatMentah, setLihat] = useState<Record<TampilBilangan, boolean>>({ ...AWAL_LIHAT, ...awal });
  // Perwakilan di luar `tampil` tidak pernah menyala.
  const lihat = Object.fromEntries(SEMUA_TAMPIL.map((k) => [k, tampil.includes(k) && lihatMentah[k]])) as Record<TampilBilangan, boolean>;
  const bisaDiatur = tampil.length > 1;
  const coba = langkahCoba(tampil, awal?.banding ?? false);

  const ubahN = (nilai: number) => {
    const baru = batas(nilai);
    setN(baru);
    setA((x) => batasPecah(baru, x));
  };
  const pas = pasangan(n, a);
  const h = hubungan(n, m);
  const lapor = useRef(onKeadaan);
  lapor.current = onKeadaan;
  useEffect(() => {
    lapor.current?.({ alat: "bilangan", n, m, a: pas.a, benda: lihat.benda, bingkai: lihat.bingkai, garis: lihat.garis, pasangan: lihat.pasangan, banding: lihat.banding });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, m, pas.a, lihat.benda, lihat.bingkai, lihat.garis, lihat.pasangan, lihat.banding]);
  const ganti = (k: TampilBilangan) => setLihat((x) => ({ ...x, [k]: !x[k] }));
  // Ucapan mengikuti perwakilan yang tampil: pasangan dan perbandingan hanya disebut bila sudah diajarkan dan menyala.
  const ucapanTampil = [`Bilangan ${n}. Ada ${n} benda.`, lihat.pasangan ? `${n} terdiri dari ${pas.a} dan ${pas.b}.` : "", lihat.banding ? h.kalimat : ""].filter(Boolean).join(" ");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Bilangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ubah satu bilangan. Lihat semua gambar ikut berubah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bilangan ini" onClick={() => speakGuru(eja(ucapanTampil))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-4xl font-black text-[#1C01A5]" aria-live="polite" aria-label={`Bilangan ${n}`}>
            {n}
          </span>
          <span className="text-2xl font-black text-[#1C01A5]">{sebut(n)}</span>
        </div>
        <Pengatur nama="Bilangan" nilai={n} onKurang={() => ubahN(n - 1)} onTambah={() => ubahN(n + 1)} kurangMati={n <= 0} tambahMati={n >= MAKS} />
        {lihat.banding ? (
          <Pengatur nama="Bilangan kedua" nilai={m} warna="#DBEAFE" onKurang={() => setM(batas(m - 1))} onTambah={() => setM(batas(m + 1))} kurangMati={m <= 0} tambahMati={m >= MAKS} />
        ) : null}
        {bisaDiatur ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
            {SEMUA_TAMPIL.filter((k) => tampil.includes(k)).map((k) => (
              <Cek key={k} aktif={lihatMentah[k]} onKlik={() => ganti(k)}>
                {LABEL_TAMPIL[k]}
              </Cek>
            ))}
          </div>
        ) : null}
      </div>

      {lihat.benda ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Benda bernomor • ketuk kotak untuk mengatur</p>
          <BarisBenda n={n} jenis="apel" nama={`Benda bernomor: ${n} apel`} onKetuk={(i) => ubahN(ketukKotak(n, i))} />
          {lihat.banding ? <BarisBenda n={m} jenis="jeruk" nama={`Benda bernomor: ${m} jeruk`} /> : null}
        </div>
      ) : null}

      {lihat.bingkai ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Bingkai sepuluh • ketuk kotak untuk mengatur</p>
          <Bingkai sel={selBingkai(n, lihat.pasangan ? a : 0)} nama={`Bingkai sepuluh berisi ${n}`} onPilih={(i) => ubahN(ketukKotak(n, i))} />
          {lihat.banding ? <Bingkai sel={selBingkai(m, 0)} nama={`Bingkai sepuluh kedua berisi ${m}`} /> : null}
          <p className="text-center text-sm font-black text-[#1C01A5]">
            {n} kotak terisi, {MAKS - n} kotak kosong. {n} + {MAKS - n} = {MAKS}
          </p>
        </div>
      ) : null}

      {lihat.garis ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Garis bilangan • ketuk angka untuk mengatur</p>
          <GarisAngka
            maks={MAKS}
            nama={`Garis bilangan, bilangan pertama ${n}${lihat.banding ? `, bilangan kedua ${m}` : ""}`}
            sorot={[n]}
            penanda={[{ n, warna: MERAH }, ...(lihat.banding ? [{ n: m, warna: BIRU }] : [])]}
            onPilih={ubahN}
          />
          <p className="text-center text-xs font-black text-[#1C01A5]/70">Makin ke kanan, makin besar. Makin ke kiri, makin kecil.</p>
        </div>
      ) : null}

      {lihat.pasangan ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Pasangan bilangan</p>
          <BaganPasangan total={n} a={pas.a} b={pas.b} />
          <Pengatur nama="Bagian merah" nilai={pas.a} warna="#FEE2E2" onKurang={() => setA(batasPecah(n, a - 1))} onTambah={() => setA(batasPecah(n, a + 1))} kurangMati={pas.a <= 0} tambahMati={pas.a >= n} />
          <KalimatBesar teks={kalimatPasangan(n, a)} />
        </div>
      ) : null}

      {lihat.banding ? (
        <div className={`${KARTU} space-y-2`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">Membandingkan</p>
          <KalimatBesar teks={`${n} ${h.simbol} ${m}`} warna="bg-[#FFE566]" />
          <p className="text-center text-sm font-black text-[#1C01A5]">{h.kalimat}</p>
        </div>
      ) : null}

      <CobaIni
        judul="Coba ini!"
        onDengar={() =>
          speakGuru(
            `Coba ini. ${coba
              .map((t, i) => `${URUT_KATA[i]}, ${t.replace(/ \+ /g, " plus ").replace(/ – /g, " minus ").replace(">, <, atau =", "lebih besar, lebih kecil, atau sama dengan")}`)
              .join(" ")}`
          )
        }
        langkah={coba}
      />
    </div>
  );
}
