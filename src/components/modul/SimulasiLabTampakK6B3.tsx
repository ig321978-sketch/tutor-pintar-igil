"use client";

import React, { useEffect, useReducer, useState } from "react";
import { TombolSuaraGuru } from "./tahap-b-gaya";
import { CobaIni, KARTU, Pilihan, TOMBOL_BIASA } from "./simulasi-bersama";
import { PesanLabK4 } from "./papan-k4b1";
import { ejaK6B3 } from "./eja-k6b3";
import { KisiTinggi, PilihTiga, Tampak, TumpukanTinggi } from "./model-tampak-k6b3";
import {
  SOAL_ATAS,
  SOAL_MATRIKS,
  SOAL_TAMPAK,
  awalTampakK6B3B,
  garisTampak,
  idAtas,
  idMatriks,
  idTampak,
  keadaanTampakK6B3B,
  langkahTampakK6B3B,
  namaGaris,
  opsiAtas,
  opsiBelakangM,
  opsiDepanM,
  opsiGaris,
  opsiJumlahTampak,
  opsiRekonstruksi,
  opsiTotalAtas,
  opsiTotalM,
  soalAtas,
  soalMatriks,
  soalTampak,
  teksTiga,
  tigaTampak,
  ucapAtasK6B3B,
  ucapMatriksK6B3B,
  ucapTampakK6B3B,
  type KeadaanTampakK6B3B,
} from "./lab-tampak-k6b3b";

/* ------------------------------------------------------------------------ */
/* Simulasi (K6B3 Sub-Bab B): Lab Tampak. Satu alat, tiga tampilan.            */
/*  Matriks : catat tinggi tiap petak alas, lalu hitung seluruh kubus.         */
/*  Tampak  : dari depan tiap kolom, dari samping tiap baris, ambil terbesar.  */
/*  Atas    : dari atas hanya petak terisi, lalu cocokkan tiga tampak.         */
/* Logika: lab-tampak-k6b3b.ts.                                                */
/* ------------------------------------------------------------------------ */

const CATATAN = [
  "Di Matriks, catat tinggi tiap petak. Apa arti angka pada matriks?",
  "Di Tampak, ambil tinggi terbesar tiap kolom atau baris. Mengapa tumpukan yang rendah tidak ikut dihitung?",
  "Di Atas, hitung petak yang terisi. Mengapa tinggi tumpukan tidak terlihat dari atas?",
];
const SEBUT = ["Satu", "Dua", "Tiga"];

export default function SimulasiLabTampakK6B3({ speakGuru, onKeadaan }: { speakGuru: (t: string) => void; onKeadaan?: (k: KeadaanTampakK6B3B) => void }) {
  const [x, kirim] = useReducer(langkahTampakK6B3B, undefined, awalTampakK6B3B);
  const [lihat, setLihat] = useState<"matriks" | "tampak" | "atas">("matriks");

  const pilihTampilan = (v: typeof lihat) => {
    setLihat(v);
    kirim({ t: "PESAN_KOSONG" });
  };

  useEffect(() => {
    onKeadaan?.(keadaanTampakK6B3B(x));
  }, [onKeadaan, x]);

  const ucap = lihat === "matriks" ? ucapMatriksK6B3B(x) : lihat === "tampak" ? ucapTampakK6B3B(x) : ucapAtasK6B3B(x);
  const ma = soalMatriks(x);
  const ta = soalTampak(x);
  const at = soalAtas(x);
  const tanda = (id: string) => (x.pernah.includes(id) ? "✅ " : "");
  const [td, ts, tt] = tigaTampak(at.m);
  const kataGaris = ta.arah === "depan" ? "kolom" : "baris";

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-black text-[#1C01A5]">Lab Tampak</h3>
          <p className="text-sm font-bold text-[#1C01A5]/80">Catat tinggi, baca tampak, dan cocokkan tiga arah.</p>
        </div>
        <TombolSuaraGuru label="Dengarkan langkahnya" onClick={() => speakGuru(ejaK6B3(ucap))} />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih tampilan lab">
        <Pilihan aktif={lihat === "matriks"} onKlik={() => pilihTampilan("matriks")}>
          🔢 Matriks
        </Pilihan>
        <Pilihan aktif={lihat === "tampak"} onKlik={() => pilihTampilan("tampak")}>
          👀 Tampak
        </Pilihan>
        <Pilihan aktif={lihat === "atas"} onKlik={() => pilihTampilan("atas")}>
          ⬆️ Atas
        </Pilihan>
      </div>

      {lihat === "matriks" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal matriks">
            {SOAL_MATRIKS.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.matriks.data === i} onKlik={() => kirim({ t: "M_DATA", i })} label={`Pilih soal matriks ${s.nama}`}>
                {tanda(idMatriks(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Catat tinggi tiap petak dari gambar, baris depan dulu.</p>
          <TumpukanTinggi m={ma.m} label={`Susunan kubus ${ma.nama}`} />
          <KisiTinggi m={ma.m} terbuka={Math.min(x.matriks.tahap, 2)} />
          {x.matriks.tahap === 0 ? <PilihTiga judul="Tinggi tiap petak di baris depan, dari kiri ke kanan?" awalan="Baris depan" opsi={opsiDepanM(x.matriks.data).opsi} onPilih={(o) => kirim({ t: "M_DEPAN", o })} /> : null}
          {x.matriks.tahap === 1 ? <PilihTiga judul="Tinggi tiap petak di baris belakang, dari kiri ke kanan?" awalan="Baris belakang" opsi={opsiBelakangM(x.matriks.data).opsi} onPilih={(o) => kirim({ t: "M_BELAKANG", o })} /> : null}
          {x.matriks.tahap === 2 ? <PilihTiga judul="Berapa seluruh kubus pada susunan ini?" awalan="Seluruh kubus" opsi={opsiTotalM(x.matriks.data).opsi} onPilih={(o) => kirim({ t: "M_TOTAL", o })} /> : null}
        </div>
      ) : null}

      {lihat === "tampak" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal tampak">
            {SOAL_TAMPAK.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.tampak.data === i} onKlik={() => kirim({ t: "T_DATA", i })} label={`Pilih soal tampak ${s.nama}`}>
                {tanda(idTampak(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          <p className="text-center text-sm font-black text-[#1C01A5]">Dilihat dari {ta.arah}: tiap {kataGaris} menampilkan tinggi terbesarnya.</p>
          <TumpukanTinggi m={ta.m} label={`Susunan kubus ${ta.nama}`} />
          <KisiTinggi m={ta.m} terbuka={2} />
          {x.tampak.tahap === 3 ? <Tampak m={ta.m} arah={ta.arah} /> : null}
          {x.tampak.tahap === 0 ? (
            <PilihTiga
              judul={`Tinggi yang terlihat dari ${ta.arah} pada ${kataGaris} ${namaGaris(ta, 0)} (tinggi ${garisTampak(ta, 0).join(" dan ")})?`}
              awalan={`Tinggi ${kataGaris} ${namaGaris(ta, 0)}`}
              opsi={opsiGaris(x.tampak.data, 0).opsi}
              onPilih={(o) => kirim({ t: "T_PERTAMA", o })}
            />
          ) : null}
          {x.tampak.tahap === 1 ? (
            <PilihTiga
              judul={`Tinggi yang terlihat dari ${ta.arah} pada ${kataGaris} ${namaGaris(ta, 1)} (tinggi ${garisTampak(ta, 1).join(" dan ")})?`}
              awalan={`Tinggi ${kataGaris} ${namaGaris(ta, 1)}`}
              opsi={opsiGaris(x.tampak.data, 1).opsi}
              onPilih={(o) => kirim({ t: "T_KEDUA", o })}
            />
          ) : null}
          {x.tampak.tahap === 2 ? <PilihTiga judul={`Berapa petak yang tampak dari ${ta.arah}?`} awalan="Petak tampak" opsi={opsiJumlahTampak(x.tampak.data).opsi} onPilih={(o) => kirim({ t: "T_JUMLAH", o })} /> : null}
        </div>
      ) : null}

      {lihat === "atas" ? (
        <div className={`${KARTU} space-y-3`}>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Pilih soal atas">
            {SOAL_ATAS.map((s, i) => (
              <Pilihan key={s.nama} aktif={x.atas.data === i} onKlik={() => kirim({ t: "U_DATA", i })} label={`Pilih soal atas ${s.nama}`}>
                {tanda(idAtas(i))}
                {s.nama}
              </Pilihan>
            ))}
          </div>
          {x.atas.tahap !== 2 ? (
            <>
              <TumpukanTinggi m={at.m} label={`Susunan kubus ${at.nama}`} />
              {x.atas.tahap >= 1 ? <Tampak m={at.m} arah="atas" /> : null}
            </>
          ) : (
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Tiga tampak: {teksTiga(at.m)}. Cocokkan dengan susunan yang benar.
            </p>
          )}
          {x.atas.tahap === 3 ? (
            <div className="flex flex-wrap items-end justify-center gap-3">
              <Tampak m={at.m} arah="depan" />
              <Tampak m={at.m} arah="samping" />
              <Tampak m={at.m} arah="atas" />
            </div>
          ) : null}
          {x.atas.tahap === 3 ? (
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Depan {td}, samping {ts}, atas {tt}.
            </p>
          ) : null}
          {x.atas.tahap === 0 ? <PilihTiga judul="Berapa petak yang terisi dilihat dari atas?" awalan="Petak terisi" opsi={opsiAtas(x.atas.data).opsi} onPilih={(o) => kirim({ t: "U_ATAS", o })} /> : null}
          {x.atas.tahap === 1 ? <PilihTiga judul="Berapa seluruh kubus pada susunan ini, termasuk yang tertumpuk?" awalan="Seluruh kubus" opsi={opsiTotalAtas(x.atas.data).opsi} onPilih={(o) => kirim({ t: "U_TOTAL", o })} /> : null}
          {x.atas.tahap === 2 ? <PilihTiga judul="Susunan mana yang cocok dengan ketiga tampak?" awalan="Susunan" opsi={opsiRekonstruksi(x.atas.data).opsi} onPilih={(o) => kirim({ t: "U_REKON", o })} /> : null}
        </div>
      ) : null}

      <PesanLabK4 pesan={x.pesan} />

      <button
        type="button"
        className={TOMBOL_BIASA}
        onClick={() => {
          kirim({ t: "RESET" });
          setLihat("matriks");
        }}
      >
        🔁 Reset Semua
      </button>

      <CobaIni judul="Coba ini!" onDengar={() => speakGuru(`Coba ini. ${CATATAN.map((c, i) => `${SEBUT[i]}, ${ejaK6B3(c)}`).join(" ")}`)} langkah={CATATAN} />
    </div>
  );
}
