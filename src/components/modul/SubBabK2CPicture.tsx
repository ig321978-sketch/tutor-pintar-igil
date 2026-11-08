"use client";

import React, { useState } from "react";
import { KERTAS_GAMBAR, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { KabarChip, Letusan, useLetusan, type Kabar, type PanelSuara } from "./SubBabBBanding";
import { CatatanTempel, useBicara } from "./tahap-b-gaya";
import { ModelBatang, TabelNilaiTempat, sebut } from "./dasar-k2";
import {
  RONDE_JARAK_K2,
  RONDE_TABELBANDING_K2,
  RONDE_TUKARBANDING_K2,
  alasanBanding,
  bandingkan,
  kataBanding,
  ringkasK2,
  tandaBanding,
  uraiK2,
  type JenisBanding,
} from "./data-k2";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab C, Tahap 5 Picture: diagram saja. Tidak ada gambar    */
/* benda. Model batang polos, tabel nilai tempat, dan jalur kotak bilangan.    */
/* Anak memilih, menandai, mengisi, dan menghitung loncatan. Anak tidak        */
/* memindahkan benda.                                                          */
/*  5 Banding di Tabel Nilai Tempat (puluhan dulu, lalu satuan)                */
/*  6 Jarak di Jalur Bilangan (hitung loncatan, tebakan siapa lebih dekat)     */
/*  7 Tukar Dulu, Baru Banding (isi tabel setelah ditukar, lalu bandingkan)    */
/* ------------------------------------------------------------------------ */

const TOMBOL_PILIH =
  "rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-sm font-black leading-tight text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] disabled:opacity-50";

const TOMBOL_PERIKSA =
  "mx-auto block rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-2 text-base font-black text-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.35)]";

/** Tiga pilihan sejajar: kiri, sama, kanan. */
function TigaPilihan({
  label,
  teks,
  keliru,
  onPilih,
}: {
  label: string;
  teks: [string, string, string];
  keliru: JenisBanding | null;
  onPilih: (j: JenisBanding) => void;
}) {
  const daftar: JenisBanding[] = ["kiri", "sama", "kanan"];
  return (
    <div className="grid grid-cols-3 gap-1.5" role="group" aria-label={label}>
      {daftar.map((j, i) => (
        <button
          key={`${j}-${keliru === j ? "x" : "o"}`}
          type="button"
          aria-label={`${label}: ${teks[i].toLowerCase()}`}
          onClick={() => onPilih(j)}
          className={`${TOMBOL_PILIH} ${keliru === j ? "igil-goyang" : ""}`}
        >
          {teks[i]}
        </button>
      ))}
    </div>
  );
}

/** Kartu satu bilangan untuk diagram: model batang dan tabel nilai tempat. */
function KartuBilangan({ nama, p, s, nyala, total }: { nama: string; p: number; s: number; nyala?: "p" | "s" | null; total?: number | string | null }) {
  return (
    <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
      <p className="text-center text-sm font-black text-[#1C01A5]">{nama}</p>
      <ModelBatang p={p} s={s} />
      <TabelNilaiTempat p={p} s={s} total={total} nyala={nyala ?? null} kecil />
    </div>
  );
}

/* --------- Permainan 5. Banding di Tabel Nilai Tempat --------------------- */

function RondeTabelBanding({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const [a, b] = RONDE_TABELBANDING_K2[ronde];
  const akhir = ronde === RONDE_TABELBANDING_K2.length - 1;
  const ua = uraiK2(a);
  const ub = uraiK2(b);
  const alasan = alasanBanding(a, b);
  const [tahap, setTahap] = useState<"puluhan" | "satuan">("puluhan");
  const [keliru, setKeliru] = useState<JenisBanding | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2c-tabel"] === true && akhir;
  /** Pada soal terakhir, bilangan yang lebih besar disembunyikan sampai anak mengucapkannya. */
  const tutupBesar = (n: number, lain: number): number | string => (akhir && !suara && n > lain ? "?" : n);
  useBicara(
    akhir ? suara : beres,
    `${sebut(a)} ${kataBanding(a, b)} ${sebut(b)}. ${
      alasan === "puluhan" ? `Puluhannya ${sebut(ua.puluhan)} dibanding ${sebut(ub.puluhan)}.` : alasan === "satuan" ? `Puluhannya sama, satuannya ${sebut(ua.satuan)} dibanding ${sebut(ub.satuan)}.` : "Puluhan dan satuannya sama."
    }`
  );

  const jawab = (j: JenisBanding) => {
    if (beres) return;
    const kunci = tahap === "puluhan" ? bandingkan(ua.puluhan, ub.puluhan) : bandingkan(ua.satuan, ub.satuan);
    if (j !== kunci) {
      setKeliru(j);
      setKabar({
        teks: tahap === "puluhan" ? `Lihat kolom Puluhan: ${sebut(ua.puluhan)} dan ${sebut(ub.puluhan)}. Mana yang lebih banyak?` : `Puluhannya sama. Lihat kolom Satuan: ${sebut(ua.satuan)} dan ${sebut(ub.satuan)}. Mana yang lebih banyak?`,
        ok: false,
      });
      return;
    }
    setKeliru(null);
    setKabar(null);
    if (tahap === "puluhan" && ua.puluhan === ub.puluhan) {
      setTahap("satuan");
      return;
    }
    setBeres(true);
    letusan.picu();
    onBeres();
  };

  return (
    <>
      <CatatanTempel
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: yang lebih besar" : "Perbandinganmu tepat!") : tahap === "puluhan" ? "Banding kolom Puluhan" : "Puluhan sama, banding Satuan"}
        teks={`Dua bilangan ditulis di tabel nilai tempat. Bandingkan kolom Puluhan lebih dulu. Mana yang punya puluhan lebih banyak? Kalau puluhannya sama, bandingkan kolom Satuan.${akhir ? " Terakhir, ucapkan bilangan yang lebih besar." : ""}`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          <KartuBilangan nama="Kiri" p={ua.puluhan} s={ua.satuan} nyala={beres ? null : tahap === "puluhan" ? "p" : "s"} total={beres ? tutupBesar(a, b) : undefined} />
          <KartuBilangan nama="Kanan" p={ub.puluhan} s={ub.satuan} nyala={beres ? null : tahap === "puluhan" ? "p" : "s"} total={beres ? tutupBesar(b, a) : undefined} />
        </div>
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? `Bilangan yang lebih besar: ?` : `${a} ${tandaBanding(a, b)} ${b}: ${a} ${kataBanding(a, b)} ${b}`}
          </p>
        ) : (
          <div className="space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">{tahap === "puluhan" ? "Kolom Puluhan: mana yang lebih banyak?" : "Puluhan sama. Kolom Satuan: mana yang lebih banyak?"}</p>
            <TigaPilihan label={tahap === "puluhan" ? "Puluhan" : "Satuan"} teks={["Kiri lebih banyak", "Sama banyak", "Kanan lebih banyak"]} keliru={keliru} onPilih={jawab} />
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuBandingTabelK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TABELBANDING_K2[RONDE_TABELBANDING_K2.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Banding di Tabel"
      warna="#FBCFE8"
      petunjuk="Dua bilangan ditulis di tabel nilai tempat. Bandingkan kolom Puluhan lebih dulu: mana yang lebih banyak. Kalau puluhannya sama, bandingkan kolom Satuan. Pada soal terakhir, ucapkan bilangan yang lebih besar."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-tabel"
      jumlahRonde={RONDE_TABELBANDING_K2.length}
      kunciAkhir={Math.max(terakhir[0], terakhir[1])}
      belumSiap="Bandingkan tabelnya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTabelBanding ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 6. Jarak di Jalur Bilangan --------------------------- */

function RondeJarak({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_JARAK_K2[ronde];
  const [nama0, nama1] = d.tokoh;
  const langkah0 = d.n - d.dari;
  const langkah1 = d.sampai - d.n;
  const daftar = Array.from({ length: d.sampai - d.dari + 1 }, (_, i) => d.dari + i);
  const [jejak0, setJejak0] = useState<number[]>([]);
  const [jejak1, setJejak1] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [keliru, setKeliru] = useState<JenisBanding | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const tahap: 0 | 1 | 2 = jejak0.length < langkah0 ? 0 : jejak1.length < langkah1 ? 1 : 2;
  const kunci: JenisBanding = langkah0 < langkah1 ? "kiri" : langkah0 > langkah1 ? "kanan" : "sama";
  useBicara(
    beres,
    `Dari ${sebut(d.dari)} ke ${sebut(d.n)} ada ${sebut(langkah0)} langkah. Dari ${sebut(d.sampai)} ke ${sebut(d.n)} ada ${sebut(langkah1)} langkah. ${
      kunci === "sama" ? "Kedua tebakan sama dekat." : `Tebakan ${kunci === "kiri" ? nama0 : nama1} lebih dekat, karena loncatannya lebih sedikit.`
    }`
  );

  const harapan = tahap === 0 ? d.dari + 1 + jejak0.length : tahap === 1 ? d.sampai - 1 - jejak1.length : null;

  const ketuk = (n: number) => {
    if (beres || tahap === 2) return;
    if (n !== harapan) {
      setGoyang(n);
      setKabar({
        teks:
          tahap === 0
            ? `Hitung selangkah demi selangkah dari ${sebut(d.dari)} maju ke ${sebut(d.n)}. Berikutnya bilangan ${sebut(harapan ?? 0)}.`
            : `Hitung selangkah demi selangkah dari ${sebut(d.sampai)} mundur ke ${sebut(d.n)}. Berikutnya bilangan ${sebut(harapan ?? 0)}.`,
        ok: false,
      });
      return;
    }
    setGoyang(null);
    setKabar(null);
    if (tahap === 0) setJejak0([...jejak0, n]);
    else setJejak1([...jejak1, n]);
  };

  const pilih = (j: JenisBanding) => {
    if (beres || tahap !== 2) return;
    if (j === kunci) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(j);
      setKabar({ teks: `Bandingkan banyak loncatan: ${sebut(langkah0)} dan ${sebut(langkah1)}. Loncatan yang lebih sedikit berarti tebakan lebih dekat. Kalau sama banyak, sama dekat.`, ok: false });
    }
  };

  return (
    <>
      <CatatanTempel
        pendek={beres ? "Jaraknya sudah dibandingkan!" : tahap === 0 ? `Hitung loncatan ${nama0}` : tahap === 1 ? `Hitung loncatan ${nama1}` : "Siapa lebih dekat?"}
        teks={`Tebakan ${nama0} ${sebut(d.dari)}, tebakan ${nama1} ${sebut(d.sampai)}, dan hitungannya ${sebut(d.n)}. Hitung loncatan dari tebakan ${nama0} ke hitungan: ketuk bilangan berikutnya satu per satu. Lalu hitung loncatan dari tebakan ${nama1} mundur ke hitungan. Loncatan yang lebih sedikit berarti tebakan lebih dekat.`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-black text-[#1C01A5]">
          <span className="rounded-full border-2 border-[#1C01A5] bg-[#F9A8D4] px-2 py-0.5">
            Tebakan {nama0} {d.dari}
          </span>
          <span className="rounded-full border-2 border-[#1C01A5] bg-[#FDE68A] px-2 py-0.5">Hitungan {d.n}</span>
          <span className="rounded-full border-2 border-[#1C01A5] bg-[#7DD3FC] px-2 py-0.5">
            Tebakan {nama1} {d.sampai}
          </span>
        </div>
        <div className="grid grid-cols-11 gap-0.5" role="group" aria-label={`Jalur bilangan ${d.dari} sampai ${d.sampai}`}>
          {daftar.map((n, i) => {
            const k0 = jejak0.indexOf(n);
            const k1 = jejak1.indexOf(n);
            const dasar = i === 0 ? "bg-[#F9A8D4]" : i === daftar.length - 1 ? "bg-[#7DD3FC]" : n === d.n ? "bg-[#FDE68A]" : "bg-[#EDE9FE]";
            const ditandai = k0 >= 0 ? "ring-4 ring-[#2563EB]" : k1 >= 0 ? "ring-4 ring-[#E53E3E]" : "";
            return (
              <button
                key={`${n}-${goyang === n ? "x" : "o"}`}
                type="button"
                aria-label={`Kotak ${n}`}
                onClick={() => ketuk(n)}
                className={`relative flex h-11 items-center justify-center rounded-md border-2 border-[#1C01A5] text-[12px] font-black text-[#1C01A5] ${dasar} ${ditandai} ${goyang === n ? "igil-goyang" : ""}`}
              >
                {n}
                {k0 >= 0 || k1 >= 0 ? (
                  <span className="absolute -top-2 left-1/2 flex h-4 min-w-4 -translate-x-1/2 items-center justify-center rounded-full border border-[#1C01A5] px-0.5 text-[9px] font-black text-white" style={{ backgroundColor: k0 >= 0 ? "#2563EB" : "#E53E3E" }}>
                    {k0 >= 0 ? k0 + 1 : k1 + 1}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <p className="text-center text-base font-black text-[#1C01A5]" aria-live="polite">
          {tahap === 0 ? `Loncatan ${nama0}: ${jejak0.length}` : tahap === 1 ? `Loncatan ${nama1}: ${jejak1.length}` : `${nama0}: ${langkah0} langkah • ${nama1}: ${langkah1} langkah`}
        </p>
        {tahap === 2 && !beres ? (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Tebakan siapa yang lebih dekat?</p>
            <TigaPilihan label="Lebih dekat" teks={[nama0, "Sama dekat", nama1]} keliru={keliru} onPilih={pilih} />
          </div>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {kunci === "sama" ? `${langkah0} langkah dan ${langkah1} langkah: sama dekat` : `${Math.min(langkah0, langkah1)} langkah lebih sedikit: tebakan ${kunci === "kiri" ? nama0 : nama1} lebih dekat`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuJarakK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Jarak di Jalur Bilangan"
      warna="#BAE6FD"
      petunjuk="Dua teman menebak banyak permen. Hitung loncatan dari tebakan pertama ke hitungan, lalu dari tebakan kedua ke hitungan. Ketuk bilangan berikutnya satu per satu. Loncatan yang lebih sedikit berarti tebakan lebih dekat. Lalu pilih siapa yang lebih dekat."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-jarak"
      jumlahRonde={RONDE_JARAK_K2.length}
      belumSiap="Hitung loncatannya dan pilih yang lebih dekat dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeJarak ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 7. Tukar Dulu, Baru Banding -------------------------- */

function RondeTukarBanding({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TUKARBANDING_K2[ronde];
  const nilaiKiri = d.kiri.p * 10 + d.kiri.s;
  const nilaiKanan = d.kanan.p * 10 + d.kanan.s;
  const ubah = d.ubah === "kiri" ? d.kiri : d.kanan;
  const hasil = ringkasK2(ubah.p, ubah.s);
  const [isiP, setIsiP] = useState<number | null>(null);
  const [isiS, setIsiS] = useState<number | null>(null);
  const [aktif, setAktif] = useState<"p" | "s">("p");
  const [tukarSelesai, setTukarSelesai] = useState(false);
  const [keliru, setKeliru] = useState<JenisBanding | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const kunci = bandingkan(nilaiKiri, nilaiKanan);
  useBicara(
    beres,
    `${sebut(ubah.p)} puluhan ${sebut(ubah.s)} satuan ditukar menjadi ${sebut(hasil.puluhan)} puluhan ${sebut(hasil.satuan)} satuan. ${sebut(nilaiKiri)} ${kataBanding(nilaiKiri, nilaiKanan)} ${sebut(nilaiKanan)}.`
  );

  const taruhAngka = (a: number) => {
    if (tukarSelesai) return;
    if (aktif === "p") {
      setIsiP(a);
      setAktif("s");
    } else {
      setIsiS(a);
    }
    setKabar(null);
  };

  const periksaTukar = () => {
    if (isiP === null || isiS === null) {
      setKabar({ teks: "Isi dua kolomnya dulu: puluhan baru dan satuan baru.", ok: false });
      return;
    }
    if (isiP === hasil.puluhan && isiS === hasil.satuan) {
      setTukarSelesai(true);
      setKabar(null);
      return;
    }
    setKabar({
      teks: `Sepuluh satuan ditukar menjadi satu puluhan. Dari ${sebut(ubah.p)} puluhan ${sebut(ubah.s)} satuan, tukar satu puluhan dan kurangi sepuluh satuan, sampai satuannya kurang dari sepuluh.`,
      ok: false,
    });
  };

  const pilih = (j: JenisBanding) => {
    if (beres || !tukarSelesai) return;
    if (j === kunci) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(j);
      setKabar({ teks: `Sekarang kedua bilangan sudah ditulis dengan satuan kurang dari sepuluh. Bandingkan puluhannya dulu: ${sebut(hasil.puluhan)} puluhan dan ${sebut(d.ubah === "kiri" ? d.kanan.p : d.kiri.p)} puluhan. Kalau sama, bandingkan satuannya.`, ok: false });
    }
  };

  const kartu = (sisi: "kiri" | "kanan") => {
    const isi = sisi === "kiri" ? d.kiri : d.kanan;
    const diubah = d.ubah === sisi;
    const pTampil = diubah && tukarSelesai ? hasil.puluhan : isi.p;
    const sTampil = diubah && tukarSelesai ? hasil.satuan : isi.s;
    return (
      <KartuBilangan
        nama={sisi === "kiri" ? "Kiri" : "Kanan"}
        p={pTampil}
        s={sTampil}
        total={beres ? (sisi === "kiri" ? nilaiKiri : nilaiKanan) : undefined}
      />
    );
  };

  return (
    <>
      <CatatanTempel
        pendek={beres ? "Perbandinganmu tepat!" : tukarSelesai ? "Sekarang bandingkan" : "Tukar dulu satuannya"}
        teks={`Salah satu tabel punya satuan sepuluh atau lebih. Tukar dulu sepuluh satuan menjadi satu puluhan, supaya satuannya kurang dari sepuluh. Isi puluhan baru dan satuan baru di tabel kosong. Setelah itu, bandingkan kedua bilangan.`}
      />
      <div className={KERTAS_GAMBAR}>
        <div className="grid grid-cols-2 gap-2">
          {kartu("kiri")}
          {kartu("kanan")}
        </div>
        {!tukarSelesai ? (
          <div className="space-y-1.5">
            <p className="text-center text-sm font-black text-[#1C01A5]">
              Tabel {d.ubah} punya {ubah.s} satuan. Tukar dulu, lalu isi: ... puluhan dan ... satuan
            </p>
            <TabelNilaiTempat p={isiP === null ? "?" : isiP} s={isiS === null ? "?" : isiS} nyala={aktif} onKlik={(kolom) => setAktif(kolom)} kecil />
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 10 }, (_, a) => (
                <button key={a} type="button" aria-label={`Angka ${a}`} onClick={() => taruhAngka(a)} className="rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] py-2 text-2xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5">
                  {a}
                </button>
              ))}
            </div>
            <button type="button" onClick={periksaTukar} className={TOMBOL_PERIKSA}>
              ✔ Periksa tukar
            </button>
          </div>
        ) : beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {nilaiKiri} {tandaBanding(nilaiKiri, nilaiKanan)} {nilaiKanan}: {nilaiKiri} {kataBanding(nilaiKiri, nilaiKanan)} {nilaiKanan}
          </p>
        ) : (
          <div className="igil-muncul space-y-1.5">
            <p className="text-center text-base font-black text-[#1C01A5]">Sudah ditukar. Bilangan mana yang lebih besar?</p>
            <TigaPilihan label="Setelah ditukar" teks={["Kiri lebih besar", "Sama besar", "Kanan lebih besar"]} keliru={keliru} onPilih={pilih} />
          </div>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

export function KartuTukarBandingK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tukar Dulu, Baru Banding"
      warna="#FDE68A"
      petunjuk="Salah satu tabel punya satuan sepuluh atau lebih. Tukar dulu sepuluh satuan menjadi satu puluhan, lalu isi puluhan baru dan satuan baru. Setelah itu bandingkan kedua bilangan: mana yang lebih besar."
      speakGuru={speakGuru}
      panel={panel}
      id="k2c-tukarbanding"
      jumlahRonde={RONDE_TUKARBANDING_K2.length}
      belumSiap="Tukar dan bandingkan dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTukarBanding ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}
