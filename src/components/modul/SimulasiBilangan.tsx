"use client";

import React, { useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { BendaSvg } from "./data-8-dasar";
import { Cek, CobaIni, KARTU } from "./simulasi-bersama";
import { BIRU, Bingkai, BaganPasangan, GarisAngka, KalimatBesar, MERAH, Pengatur, eja } from "./komponen-lab";
import { MAKS, batas, batasPecah, hubungan, kalimatPasangan, ketukKotak, pasangan, selBingkai, ucapanLab } from "./lab-bilangan-bab1";

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

export default function SimulasiBilangan({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [n, setN] = useState(6);
  const [m, setM] = useState(4);
  const [a, setA] = useState(2);
  const [lihat, setLihat] = useState({ benda: true, bingkai: true, garis: true, pasangan: true, banding: false });

  const ubahN = (nilai: number) => {
    const baru = batas(nilai);
    setN(baru);
    setA((x) => batasPecah(baru, x));
  };
  const pas = pasangan(n, a);
  const h = hubungan(n, m);
  const ganti = (k: keyof typeof lihat) => setLihat((x) => ({ ...x, [k]: !x[k] }));

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Laboratorium Bilangan</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Ubah satu bilangan. Lihat semua gambar ikut berubah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan bilangan ini" onClick={() => speakGuru(eja(ucapanLab(n, a, lihat.banding, m)))} />
      </div>

      <div className={`${KARTU} space-y-2`}>
        <div className="flex items-center justify-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-4xl font-black text-[#1C01A5]" aria-live="polite" aria-label={`Bilangan ${n}`}>
            {n}
          </span>
        </div>
        <Pengatur nama="Bilangan" nilai={n} onKurang={() => ubahN(n - 1)} onTambah={() => ubahN(n + 1)} kurangMati={n <= 0} tambahMati={n >= MAKS} />
        {lihat.banding ? (
          <Pengatur nama="Bilangan kedua" nilai={m} warna="#DBEAFE" onKurang={() => setM(batas(m - 1))} onTambah={() => setM(batas(m + 1))} kurangMati={m <= 0} tambahMati={m >= MAKS} />
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-1.5" role="group" aria-label="Pilih tampilan">
          <Cek aktif={lihat.benda} onKlik={() => ganti("benda")}>Benda</Cek>
          <Cek aktif={lihat.bingkai} onKlik={() => ganti("bingkai")}>Bingkai sepuluh</Cek>
          <Cek aktif={lihat.garis} onKlik={() => ganti("garis")}>Garis bilangan</Cek>
          <Cek aktif={lihat.pasangan} onKlik={() => ganti("pasangan")}>Pasangan</Cek>
          <Cek aktif={lihat.banding} onKlik={() => ganti("banding")}>Bandingkan</Cek>
        </div>
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
            "Coba ini. Satu, ketuk kotak ketujuh di bingkai sepuluh. Lihat garis bilangan ikut pindah. Dua, geser bagian merah. Lihat bilangan itu terdiri dari dua bagian. Tiga, nyalakan Bandingkan. Atur dua bilangan, lalu lihat tanda lebih besar atau lebih kecil."
          )
        }
        langkah={[
          "Ketuk kotak ke-7 di bingkai sepuluh. Lihat garis bilangan ikut pindah.",
          "Tekan + atau – pada Bagian merah. Bilangan itu terdiri dari dua bagian.",
          "Nyalakan Bandingkan. Atur dua bilangan, lalu lihat tanda >, <, atau =.",
        ]}
      />
    </div>
  );
}
