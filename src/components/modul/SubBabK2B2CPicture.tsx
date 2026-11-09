"use client";

import React, { useContext, useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar } from "./SubBabBBanding";
import { CatatanTempel, SuaraCtx, useBicara } from "./tahap-b-gaya";
import { sebut } from "./dasar-k2";
import { BatangBanding, KotakSoal } from "./dasar-k2b2";
import { Berhasil, LompatGaris, PilihanAngka, TOMBOL_BESAR } from "./permainan-k2b2";
import { RONDE_ALUR_C, RONDE_MODEL_C, RONDE_PANAH_C, URUTAN_KARTU_ALUR, bilanganPembanding, hasilPanah, jumlahBanding, opsiB2 } from "./data-k2b2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 2 Sub-Bab C, Tahap 5 Picture: diagram polos, tanpa gambar benda.*/
/* Cerita ditulis sebagai teks. Model batang, diagram alur, dan jalur bilangan.*/
/*  5 Model Batang Cerita (batang pendek, batang panjang, selisih)            */
/*  6 Susun Alur Penyelesaian (diketahui, ditanya, solusi, kesimpulan)        */
/*  7 Panah di Jalur Bilangan (maju atau mundur menurut cerita)               */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 5. Model Batang Cerita ------------------------------- */

function RondeModel({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const r = RONDE_MODEL_C[ronde];
  const b = bilanganPembanding(r);
  const jumlah = jumlahBanding(r);
  const kata = r.jenis === "lebih" ? "lebihnya" : "kurangnya";
  const [tahap, setTahap] = useState<0 | 1 | 2>(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const ucap = useContext(SuaraCtx);
  useBicara(tahap === 2, `Batang ${r.pembanding} ${sebut(b)}. Kedua batang digabung menjadi ${sebut(jumlah)}.`);

  const jawab = (n: number) => {
    const kunci = tahap === 0 ? b : jumlah;
    if (n !== kunci) {
      setKeliru(n);
      setKabar({
        teks: tahap === 0 ? `Lihat batang ${r.acuan} yang ${sebut(r.a)}. ${r.pembanding} punya ${sebut(r.d)} ${kata}, jadi batangnya ${r.jenis === "lebih" ? "lebih panjang" : "lebih pendek"}.` : "Jumlah berarti kedua batang digabung. Tambahkan kedua bilangan.",
        ok: false,
      });
      return;
    }
    setKeliru(null);
    setKabar(null);
    if (tahap === 0) {
      setTahap(1);
      ucap(`${r.pembanding} punya ${sebut(b)}. Sekarang cari jumlah kedua batang.`);
      return;
    }
    setTahap(2);
    letusan.picu();
    onBeres();
  };

  return (
    <>
      <CatatanTempel
        pendek={`${r.acuan} ${r.a} • ${r.pembanding}: ${r.d} ${kata}`}
        teks={`Model batang. ${r.acuan} punya ${sebut(r.a)} ${r.benda}. ${r.pembanding} punya ${sebut(r.d)} ${kata} dari ${r.acuan}. Lihat panjang kedua batang. Bagian emas adalah selisihnya. Cari bilangan yang bertanda tanya, lalu cari jumlah kedua batang.`}
      />
      <div className={`${KERTAS_GAMBAR} relative space-y-2 rounded-lg p-3`}>
        <BatangBanding a={r.a} b={b} namaA={r.acuan} namaB={r.pembanding} tandaiB={tahap === 0} jumlah={tahap >= 1} tandaiJumlah={tahap === 1} />
        {tahap < 2 ? (
          <>
            <KotakSoal>{tahap === 0 ? `Berapa ${r.benda} milik ${r.pembanding}?` : `Berapa jumlah ${r.benda} ${r.acuan} dan ${r.pembanding}?`}</KotakSoal>
            <PilihanAngka key={tahap} opsi={opsiB2(tahap === 0 ? b : jumlah)} keliru={keliru} onPilih={jawab} />
          </>
        ) : (
          <Berhasil>
            {r.a} {r.jenis === "lebih" ? "+" : "−"} {r.d} = {b}. {r.a} + {b} = {jumlah}
          </Berhasil>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuModelK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_MODEL_C[RONDE_MODEL_C.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Model Batang Cerita"
      warna="#BBF7D0"
      petunjuk="Lihat model batang dua tokoh. Bagian emas adalah selisihnya. Pilih bilangan batang yang bertanda tanya, lalu pilih jumlah kedua batang. Pada soal terakhir, ucapkan jumlahnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-model"
      jumlahRonde={RONDE_MODEL_C.length}
      kunciAkhir={jumlahBanding(akhir)}
      belumSiap="Cari bilangan batang dan jumlahnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeModel ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Susun Alur Penyelesaian --------------------------- */

const PETUNJUK_LANGKAH: Record<string, string> = {
  Diketahui: "Diketahui memuat bilangan yang sudah ada di cerita.",
  Ditanya: "Ditanya adalah pertanyaan yang harus dicari jawabannya.",
  Solusi: "Solusi berisi hitungan dengan tanda tambah atau kurang.",
  Kesimpulan: "Kesimpulan diawali kata Jadi dan memakai hasil hitungan.",
};

function RondeAlur({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const s = RONDE_ALUR_C[ronde];
  const urut = URUTAN_KARTU_ALUR[ronde];
  const [terpasang, setTerpasang] = useState(0);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const ucap = useContext(SuaraCtx);
  const beres = terpasang >= s.langkah.length;
  useBicara(beres, "Alurnya sudah benar. Diketahui, ditanya, solusi, lalu kesimpulan.");

  const ketuk = (i: number) => {
    if (beres) return;
    if (i !== terpasang) {
      setKeliru(i);
      setKabar({ teks: `Sekarang langkah ${sebut(terpasang + 1)}, yaitu ${s.langkah[terpasang].nama}. ${PETUNJUK_LANGKAH[s.langkah[terpasang].nama]}`, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    ucap(`${s.langkah[i].nama}. ${s.langkah[i].isi}`);
    const baru = terpasang + 1;
    setTerpasang(baru);
    if (baru >= s.langkah.length) {
      letusan.picu();
      onBeres();
    }
  };

  return (
    <>
      <CatatanTempel pendek={beres ? "Alurnya benar!" : `Langkah ${terpasang + 1}: ${s.langkah[Math.min(terpasang, 3)].nama}`} teks={`Susun alur penyelesaian soal cerita. Ketuk kartu yang cocok dengan langkah yang sedang ditunjuk. ${s.cerita}`} />
      <div className={`${KERTAS_GAMBAR} relative space-y-3 rounded-lg p-3`}>
        <KotakSoal>{s.cerita}</KotakSoal>
        <div className="space-y-1" role="list" aria-label="Diagram alur penyelesaian">
          {s.langkah.map((l, i) => (
            <React.Fragment key={l.nama}>
              <div role="listitem" className={`flex items-center gap-2 rounded-2xl border-4 px-2 py-1.5 ${i < terpasang ? "border-[#16A34A] bg-[#F0FDF4]" : i === terpasang ? "igil-denyut border-[#F0AB00] bg-[#FFF7CC]" : "border-dashed border-[#1C01A5]/40 bg-white"}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#1C01A5] bg-[#FFE566] text-base font-black text-[#1C01A5]">{i + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-black uppercase text-[#1C01A5]/70">{l.nama}</span>
                  <span className="block text-base font-black leading-snug text-[#1C01A5]">{i < terpasang ? l.isi : "…"}</span>
                </span>
              </div>
              {i < s.langkah.length - 1 ? (
                <p className="text-center text-xl font-black leading-none text-[#1C01A5]/60" aria-hidden="true">
                  ⬇
                </p>
              ) : null}
            </React.Fragment>
          ))}
        </div>
        {!beres ? (
          <div className="grid gap-2" role="group" aria-label="Kartu langkah">
            {urut.filter((i) => i >= terpasang).map((i) => (
              <button
                key={`${i}-${keliru === i ? "x" : "o"}`}
                type="button"
                aria-label={`Kartu: ${s.langkah[i].isi}`}
                onClick={() => ketuk(i)}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-2 text-left text-base font-black leading-snug text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === i ? "igil-goyang" : ""}`}
              >
                {s.langkah[i].isi}
              </button>
            ))}
          </div>
        ) : (
          <Berhasil>Diketahui → Ditanya → Solusi → Kesimpulan. Alurnya sudah benar.</Berhasil>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuAlurK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Susun Alur Penyelesaian"
      warna="#FDE68A"
      petunjuk="Ketuk kartu yang cocok dengan langkah yang sedang ditunjuk: diketahui, ditanya, solusi, lalu kesimpulan. Kartu masuk ke diagram alur dengan panah."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-alur"
      jumlahRonde={RONDE_ALUR_C.length}
      belumSiap="Susun semua langkah dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeAlur ronde={r} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Panah di Jalur Bilangan --------------------------- */

function RondePanah({ ronde, onBeres }: { ronde: number; onBeres: () => void }) {
  const s = RONDE_PANAH_C[ronde];
  const [arah, setArah] = useState<"maju" | "mundur" | null>(null);
  const [keliru, setKeliru] = useState<"maju" | "mundur" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const ucap = useContext(SuaraCtx);

  const pilihArah = (a: "maju" | "mundur") => {
    if (a !== s.arah) {
      setKeliru(a);
      setKabar({ teks: s.petunjuk, ok: false });
      return;
    }
    setKeliru(null);
    setKabar(null);
    setArah(a);
    ucap(`Betul, lompat ${a}. Mulai dari ${sebut(s.mulai)}, lompat ${sebut(s.langkah)} kali.`);
  };

  return (
    <>
      <CatatanTempel pendek={arah ? `${s.mulai} ${s.arah === "maju" ? "+" : "−"} ${s.langkah} = ?` : "Maju atau mundur?"} teks={`Baca cerita ini. ${s.cerita} Pilih arah lompatan di jalur bilangan, lalu lompat sebanyak yang diceritakan.`} />
      <div className={`${KERTAS_GAMBAR} relative space-y-3 rounded-lg p-3`}>
        <KotakSoal>{s.cerita}</KotakSoal>
        {arah === null ? (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => pilihArah("mundur")} className={`${TOMBOL_BESAR} ${keliru === "mundur" ? "igil-goyang" : ""}`} key={`m-${keliru === "mundur"}`}>
              ⬅ Mundur
            </button>
            <button type="button" onClick={() => pilihArah("maju")} className={`${TOMBOL_BESAR} ${keliru === "maju" ? "igil-goyang" : ""}`} key={`j-${keliru === "maju"}`}>
              Maju ➡
            </button>
          </div>
        ) : null}
      </div>
      <KabarChip kabar={kabar} />
      {arah !== null ? <LompatGaris dari={s.dari} sampai={s.sampai} mulai={s.mulai} arah={arah} langkah={s.langkah} kataKerja={arah === "maju" ? "ditambah" : "dikurangi"} onBeres={() => onBeres()} /> : null}
    </>
  );
}

export function KartuPanahK2B2C({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const akhir = RONDE_PANAH_C[RONDE_PANAH_C.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Panah di Jalur Bilangan"
      warna="#FBCFE8"
      petunjuk="Baca ceritanya, lalu pilih arah lompatan: maju kalau bertambah, mundur kalau berkurang. Setelah itu lompat di jalur bilangan sebanyak yang diceritakan dan tekan Berhenti. Pada soal terakhir, ucapkan hasilnya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b2c-panah"
      jumlahRonde={RONDE_PANAH_C.length}
      kunciAkhir={hasilPanah(akhir)}
      belumSiap="Pilih arah, lompat, dan tekan Berhenti dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondePanah ronde={r} onBeres={beres} />}
    />
  );
}
