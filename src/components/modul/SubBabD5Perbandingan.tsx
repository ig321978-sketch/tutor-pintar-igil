"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useState } from "react";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, Kotak, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import {
  JawabSuara,
  JudulGame,
  KABAR_TULIS_OK,
  KabarChip,
  Letusan,
  PanelPoster,
  STIKER,
  TombolLanjut,
  kata,
  useLetusan,
  type Kabar,
  type PanelSuara,
  type Umum,
} from "./SubBabBBanding";
import { CatatanPensil, LencanaSuara, PitaTahap, SuaraCtx, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { BingkaiGanda, sebut } from "./belas-a5-dasar";
import { TabelNilai } from "./nilai-c5-dasar";
import { DiagramPasangan, GarisBanding, kalimatBanyak, tanda } from "./perbandingan-d5-dasar";
import { LangkahKartu, LangkahKeranjang, LangkahPasang, LangkahTimbang } from "./SubBabD5Concrete";
import { KartuGambar, KartuKalimat, KartuLetak } from "./SubBabD5Picture";

/* ------------------------------------------------------------------------ */
/* Bab 5 Sub-Bab D: Membandingkan Bilangan (Buku Siswa Kelas 1 hlm. 165-173). */
/* Semua di klien, tanpa API.                                                 */
/* Naskah: naskah/mtk-1-bab5-sub-d-membandingkan-bilangan.md                  */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Pasangkan Kelereng (ketuk dan pasangkan), 2 Susun Keranjang   */
/*            Jeruk (seret), 3 Timbangan Kelereng (tambah dan kurangi),       */
/*            4 Pasang Kartu Kata (seret kartu).                              */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Lengkapi Kalimat, 6 Gambar Mana?,                             */
/*            7 Letakkan di Garis Bilangan.                                   */
/*  Abstract: 8 Tanda Pembanding, 9 Urutkan Bilangan,                         */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman membandingkan bilangan. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const INGAT_D5 = [
  {
    ikon: "🔢",
    nama: "Hitung dulu, baru bandingkan",
    ket: "Jangan menebak dari kelihatannya",
    suara: "Hitung dulu banyak benda di setiap kelompok, baru bandingkan. Jangan menebak dari kelihatannya saja.",
  },
  {
    ikon: "🔗",
    nama: "Sisa pasangan = lebihnya",
    ket: "Yang punya sisa lebih banyak",
    suara: "Kalau benda dipasangkan satu-satu, kelompok yang masih punya sisa adalah kelompok yang lebih banyak. Banyak sisanya adalah lebihnya.",
  },
];

/** Alasan membandingkan lewat puluhan lalu satuan. Dipakai untuk bilangan 10 sampai 20. */
function alasanPuluhan(a: number, b: number): string {
  const pa = Math.floor(a / 10);
  const pb = Math.floor(b / 10);
  const sa = a % 10;
  const sb = b % 10;
  if (a === b) return `${a} dan ${b} sama persis, jadi sama besar.`;
  if (pa !== pb) return `${a} punya ${pa} puluhan dan ${b} punya ${pb} puluhan. ${Math.max(pa, pb)} puluhan lebih besar, jadi ${Math.max(a, b)} lebih besar.`;
  return `Sama-sama ${pa} puluhan. Bandingkan satuannya: ${sa} dan ${sb}. ${Math.max(sa, sb)} lebih besar, jadi ${Math.max(a, b)} lebih besar.`;
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

export function InfografisPerbandinganD({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Membandingkan Bilangan</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="BANDINGKAN DUA KELOMPOK"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Halim memiliki lima belas kelereng. Upe memiliki sebelas kelereng. Lima belas lebih banyak dari sebelas. Sebelas lebih sedikit dari lima belas. Jadi kelereng Halim lebih banyak dari kelereng Upe, dan kelereng Upe lebih sedikit dari kelereng Halim."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Kelereng Halim</p>
            <BingkaiGanda isi={15} sepuluhDulu={false} kelas="h-16 w-full max-w-[200px]" />
            <p className="text-2xl font-black text-[#B91C1C]">15</p>
          </div>
          <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2 text-center">
            <p className="text-sm font-black text-[#1C01A5]">Kelereng Upe</p>
            <BingkaiGanda isi={11} sepuluhDulu={false} kelas="h-16 w-full max-w-[200px]" />
            <p className="text-2xl font-black text-[#B91C1C]">11</p>
          </div>
        </div>
        <p className="rounded-xl border-4 border-[#F0AB00] bg-[#FFF7CC] px-2 py-1 text-center text-base font-black leading-snug text-[#1C01A5]">
          15 lebih banyak dari 11
          <br />
          11 lebih sedikit dari 15
        </p>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="PASANGKAN SATU-SATU"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Cara lain untuk membandingkan adalah memasangkan satu-satu. Setiap titik merah dipasangkan dengan satu titik biru. Titik yang tidak punya pasangan adalah sisanya. Titik merah masih punya sisa tiga, jadi titik merah lebih banyak tiga daripada titik biru."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <DiagramPasangan a={8} b={5} />
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="PALING BANYAK, PALING SEDIKIT"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Kira mempunyai sepuluh jeruk. Tika mempunyai empat belas jeruk. Wei mempunyai dua belas jeruk. Tika mempunyai jeruk paling banyak. Kira mempunyai jeruk paling sedikit. Wei ada di tengah. Kata paling banyak dan paling sedikit dipakai untuk tiga kelompok atau lebih."
      >
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { nama: "Kira", n: 10, ket: "paling sedikit", warna: "#DBEAFE" },
            { nama: "Tika", n: 14, ket: "paling banyak", warna: "#FECACA" },
            { nama: "Wei", n: 12, ket: "di tengah", warna: "#F3F4F6" },
          ].map((k) => (
            <div key={k.nama} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-1.5 text-center">
              <p className="text-sm font-black text-[#1C01A5]">
                {k.nama} {k.n}
              </p>
              <BingkaiGanda isi={k.n} sepuluhDulu={false} kelas="h-14 w-full" />
              <p className="rounded-full px-1 text-[10px] font-black leading-tight text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.ket}
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="URUTKAN BILANGAN"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Bilangan sepuluh, empat belas, dan dua belas dapat kita urutkan. Urutan dari bilangan terkecil adalah sepuluh, dua belas, empat belas. Urutan dari bilangan terbesar adalah empat belas, dua belas, sepuluh."
      >
        <div className="space-y-2">
          {[
            { judul: "Dari terkecil", daftar: [10, 12, 14], warna: "#BFDBFE" },
            { judul: "Dari terbesar", daftar: [14, 12, 10], warna: "#FECACA" },
          ].map((u) => (
            <div key={u.judul} className="rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
              <p className="text-center text-xs font-black text-[#1C01A5]">{u.judul}</p>
              <div className="flex items-center justify-center gap-1.5">
                {u.daftar.map((n, i) => (
                  <React.Fragment key={n}>
                    {i > 0 ? <span className="text-xl font-black text-[#1C01A5]">→</span> : null}
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-2xl font-black text-[#1C01A5]" style={{ backgroundColor: u.warna }}>
                      {n}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="KATA PEMBANDING"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Ada lima kata untuk membandingkan. Lebih banyak dan lebih sedikit dipakai untuk dua kelompok. Sama banyak dipakai kalau jumlahnya sama. Paling banyak dan paling sedikit dipakai untuk tiga kelompok atau lebih."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          {[
            ["lebih banyak", "15 lebih banyak dari 11", "dua kelompok"],
            ["lebih sedikit", "11 lebih sedikit dari 15", "dua kelompok"],
            ["sama banyak", "12 sama banyak dengan 12", "jumlahnya sama"],
            ["paling banyak", "14 paling banyak", "tiga kelompok atau lebih"],
            ["paling sedikit", "10 paling sedikit", "tiga kelompok atau lebih"],
          ].map(([k, contoh, ket], i) => (
            <div key={k} className={`px-2 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
              <p className="text-base font-black leading-tight text-[#1C01A5]">{k}</p>
              <p className="text-xs font-black leading-tight text-[#7C3AED]">
                {contoh} • {ket}
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="TANDA LEBIH DARI, KURANG DARI, SAMA DENGAN"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Kita juga bisa memakai tanda. Tanda lebih dari terbuka menghadap bilangan yang lebih besar. Lima belas lebih dari sebelas. Tanda kurang dari juga terbuka menghadap bilangan yang lebih besar. Sebelas kurang dari lima belas. Tanda sama dengan dipakai kalau kedua bilangan sama besar. Dua belas sama dengan dua belas."
      >
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { a: 15, b: 11, nama: "lebih dari" },
            { a: 11, b: 15, nama: "kurang dari" },
            { a: 12, b: 12, nama: "sama dengan" },
          ].map((c) => (
            <div key={c.nama} className="space-y-0.5 rounded-2xl border-4 border-[#1C01A5] bg-white px-0.5 py-2 text-center">
              <p className="text-xl font-black text-[#1C01A5]">
                {c.a} {tanda(c.a, c.b)} {c.b}
              </p>
              <p className="text-[11px] font-black leading-tight text-[#B91C1C]">{c.nama}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs font-black text-[#1C01A5]/80">Tanda yang terbuka menghadap bilangan yang lebih besar.</p>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="PULUHAN DULU, BARU SATUAN"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Untuk membandingkan dengan cepat, lihat puluhannya dulu. Tiga belas dan tujuh belas sama-sama satu puluhan. Jadi kita bandingkan satuannya. Tiga lebih kecil dari tujuh, jadi tiga belas lebih kecil dari tujuh belas. Dua belas dan dua puluh berbeda puluhannya. Satu puluhan lebih kecil dari dua puluhan, jadi dua belas lebih kecil dari dua puluh."
      >
        <div className="grid grid-cols-1 gap-2">
          {[
            { a: 13, b: 17, ket: "Puluhan sama (1). Satuan: 3 < 7." },
            { a: 12, b: 20, ket: "Puluhan beda: 1 < 2. Selesai." },
          ].map((c) => (
            <div key={c.a} className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
              <div className="flex items-center justify-center gap-1">
                <TabelNilai puluhan={Math.floor(c.a / 10)} satuan={c.a % 10} kecil kelas="max-w-[116px]" />
                <TabelNilai puluhan={Math.floor(c.b / 10)} satuan={c.b % 10} kecil kelas="max-w-[116px]" />
              </div>
              <p className="text-center text-sm font-black text-[#1C01A5]">
                {c.a} {tanda(c.a, c.b)} {c.b}
              </p>
              <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]/80">{c.ket}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="GARIS BILANGAN"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Di garis bilangan, bilangan yang berada lebih ke kanan lebih besar. Lima belas berada di sebelah kanan sebelas, jadi lima belas lebih besar dari sebelas. Sebelas berada di sebelah kiri lima belas, jadi sebelas lebih kecil dari lima belas."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisBanding tanda1={11} tanda2={15} />
          <p className="text-center text-sm font-black text-[#1C01A5]">15 di kanan 11, jadi 15 lebih besar</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="SAMA BANYAK"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Kadang dua kelompok sama banyak. Dua belas kelereng dan dua belas kelereng. Kalau dipasangkan satu-satu, semuanya punya pasangan dan tidak ada sisa. Kita katakan dua belas sama banyak dengan dua belas."
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <BingkaiGanda isi={12} sepuluhDulu={false} kelas="h-16 w-full max-w-[200px]" />
            <p className="text-center text-xl font-black text-[#1C01A5]">12</p>
          </div>
          <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
            <BingkaiGanda isi={12} sepuluhDulu={false} kelas="h-16 w-full max-w-[200px]" />
            <p className="text-center text-xl font-black text-[#1C01A5]">12</p>
          </div>
        </div>
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <DiagramPasangan a={6} b={6} kelas="h-28 w-full max-w-[260px]" />
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_D5.map((i) => (
          <button
            key={i.nama}
            type="button"
            aria-label={`Dengarkan: ${i.nama}`}
            onClick={() => speakGuru(i.suara)}
            className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFF7CC] px-2 py-3 text-center shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="block text-3xl" aria-hidden="true">
              {i.ikon}
            </span>
            <span className="block text-lg font-black leading-tight text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete                                                          */
/* ------------------------------------------------------------------------ */

type TipeConcrete = "pasang" | "keranjang" | "timbang" | "kartu";
const LANGKAH_CONCRETE: { nomor: number; tipe: TipeConcrete }[] = [
  { nomor: 1, tipe: "pasang" },
  { nomor: 2, tipe: "keranjang" },
  { nomor: 3, tipe: "timbang" },
  { nomor: 4, tipe: "kartu" },
];

export function ConcretePerbandinganD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <ConcreteIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function ConcreteIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const langkah = LANGKAH_CONCRETE[indeks];
  const terakhir = indeks >= LANGKAH_CONCRETE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: langkah.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE PICTURE ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pasangkan, susun, dan timbang!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Permainan ${langkah.nomor} dari ${LANGKAH_CONCRETE.length}`}>
        {LANGKAH_CONCRETE.map((l, i) => (
          <span key={l.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "pasang" ? <LangkahPasang {...dasar} /> : null}
        {langkah.tipe === "keranjang" ? <LangkahKeranjang {...dasar} /> : null}
        {langkah.tipe === "timbang" ? <LangkahTimbang {...dasar} /> : null}
        {langkah.tipe === "kartu" ? <LangkahKartu {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture. Diagram polos saja. Tidak ada gambar benda.              */
/* ------------------------------------------------------------------------ */

type TipePicture = "kalimat" | "gambar" | "letak";
const KARTU_PICTURE: { nomor: number; tipe: TipePicture }[] = [
  { nomor: 5, tipe: "kalimat" },
  { nomor: 6, tipe: "gambar" },
  { nomor: 7, tipe: "letak" },
];

export function PicturePerbandinganD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_PICTURE[indeks];
  const terakhir = indeks >= KARTU_PICTURE.length - 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    if (terakhir) {
      onSelesai();
      return;
    }
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat diagram dan pilih" warna="#B45309" />
      <div className="flex items-center gap-1.5" aria-label={`Kartu ${indeks + 1} dari ${KARTU_PICTURE.length}`}>
        {KARTU_PICTURE.map((k, i) => (
          <span key={k.nomor} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      <div key={kartu.tipe} className="space-y-3">
        {kartu.tipe === "kalimat" ? <KartuKalimat {...dasar} /> : null}
        {kartu.tipe === "gambar" ? <KartuGambar {...dasar} /> : null}
        {kartu.tipe === "letak" ? <KartuLetak {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Tanda Pembanding ---------------------------------- */

const RONDE_TANDA: { a: number; b: number }[] = [
  { a: 15, b: 11 },
  { a: 12, b: 17 },
  { a: 14, b: 14 },
  { a: 10, b: 13 },
  { a: 19, b: 16 },
];

const PILIHAN_TANDA: { t: string; nama: string }[] = [
  { t: ">", nama: "lebih dari" },
  { t: "<", nama: "kurang dari" },
  { t: "=", nama: "sama dengan" },
];

function RondeTanda({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_TANDA[ronde];
  const akhir = ronde === RONDE_TANDA.length - 1;
  const benar = tanda(d.a, d.b);
  const [keliru, setKeliru] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["d5-tanda"] === true && akhir;
  useBicara(akhir ? suara : beres, `${sebut(d.a)} ${PILIHAN_TANDA.find((p) => p.t === benar)?.nama} ${sebut(d.b)}. ${alasanPuluhan(d.a, d.b)}`);

  const pilih = (t: string) => {
    if (beres) return;
    if (t === benar) {
      setKeliru(null);
      setKabar(null);
      setBeres(true);
      letusan.picu();
      onBeres();
    } else {
      setKeliru(t);
      setKabar({ teks: "Bandingkan puluhannya dulu. Kalau sama, bandingkan satuannya. Tanda yang terbuka menghadap bilangan yang lebih besar.", ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: yang lebih besar" : suara ? "Hebat!" : beres ? "Tandamu tepat!" : "Pilih tanda yang tepat"}
        teks={`Bandingkan dua bilangan ini. Pilih tanda yang tepat: lebih dari, kurang dari, atau sama dengan. Bandingkan puluhannya dulu, lalu satuannya.${akhir ? " Di akhir, ucapkan bilangan yang lebih besar." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="flex items-center justify-center gap-2">
          <Kotak v={d.a} />
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#1C01A5] text-4xl font-black text-[#1C01A5] ${beres ? "bg-[#7FCB96]" : "border-dashed bg-[#FFF7CC]"}`}>
            {beres ? benar : "?"}
          </span>
          <Kotak v={d.b} />
        </div>
        {!beres ? (
          <div className="grid grid-cols-3 gap-2">
            {PILIHAN_TANDA.map((p) => (
              <button
                key={`${p.t}-${keliru === p.t ? "x" : "o"}`}
                type="button"
                aria-label={`Pilih tanda ${p.nama}`}
                onClick={() => pilih(p.t)}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-2 text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === p.t ? "igil-goyang" : ""}`}
              >
                <span className="block text-4xl font-black leading-none">{p.t}</span>
                <span className="block text-xs font-black leading-tight">{p.nama}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-base font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `${d.a} ? ${d.b}: bilangan yang lebih besar adalah ?` : `${d.a} ${benar} ${d.b}. ${alasanPuluhan(d.a, d.b)}`}
          </p>
        )}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTanda({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_TANDA[RONDE_TANDA.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Tanda Pembanding"
      warna="#BBF7D0"
      petunjuk="Bandingkan dua bilangan, lalu pilih tanda yang tepat: lebih dari, kurang dari, atau sama dengan. Bandingkan puluhannya dulu. Kalau puluhannya sama, bandingkan satuannya. Tanda terbuka menghadap bilangan yang lebih besar. Pada soal terakhir, ucapkan bilangan yang lebih besar."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-tanda"
      jumlahRonde={RONDE_TANDA.length}
      kunciAkhir={Math.max(terakhir.a, terakhir.b)}
      belumSiap="Pilih tandanya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTanda ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Urutkan Bilangan ---------------------------------- */

const RONDE_URUT: { ns: number[]; arah: "naik" | "turun" }[] = [
  { ns: [13, 11, 18], arah: "naik" },
  { ns: [14, 11, 10], arah: "turun" },
  { ns: [18, 10, 13], arah: "naik" },
  { ns: [16, 12, 19], arah: "turun" },
];

function RondeUrut({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const d = RONDE_URUT[ronde];
  const akhir = ronde === RONDE_URUT.length - 1;
  const naik = d.arah === "naik";
  const urut = d.ns.slice().sort((a, b) => (naik ? a - b : b - a));
  const terbesar = Math.max(...d.ns);
  const [isi, setIsi] = useState<number[]>([]);
  const [keliru, setKeliru] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["d5-urut"] === true && akhir;
  useBicara(akhir ? suara : beres, `Urutan dari ${naik ? "terkecil" : "terbesar"}: ${urut.map(sebut).join(", ")}.`);

  const pilih = (n: number) => {
    if (beres || isi.includes(n)) return;
    const berikut = urut[isi.length];
    if (n !== berikut) {
      setKeliru(n);
      setKabar({
        teks: naik ? "Kita menyusun dari yang terkecil. Cari bilangan yang paling kecil di antara yang tersisa." : "Kita menyusun dari yang terbesar. Cari bilangan yang paling besar di antara yang tersisa.",
        ok: false,
      });
      return;
    }
    const baru = [...isi, n];
    setIsi(baru);
    setKeliru(null);
    setKabar(null);
    if (baru.length === d.ns.length) {
      setBeres(true);
      letusan.picu();
      onBeres();
    }
  };

  const sisa = d.ns.filter((n) => !isi.includes(n));

  return (
    <>
      <CatatanPensil
        pendek={akhir && beres && !suara ? "Ucapkan: yang terbesar" : suara ? "Hebat!" : beres ? "Urutanmu benar!" : naik ? "Mulai dari terkecil" : "Mulai dari terbesar"}
        teks={`Ketuk bilangan satu per satu untuk menyusun urutan mulai dari bilangan ${naik ? "terkecil" : "terbesar"}.${akhir ? " Di akhir, ucapkan bilangan yang terbesar." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <p className="rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-1.5 text-center text-base font-black text-[#1C01A5]">
          Urutan mulai dari bilangan {naik ? "terkecil" : "terbesar"}
        </p>
        <div className="flex items-center justify-center gap-1.5">
          {d.ns.map((_, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <span className="text-xl font-black text-[#1C01A5]">,</span> : null}
              <Kotak v={isi[i] ?? null} nyala={!beres && i === isi.length} />
            </React.Fragment>
          ))}
        </div>
        {!beres ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sisa.map((n) => (
              <button
                key={`${n}-${keliru === n ? "x" : "o"}`}
                type="button"
                aria-label={`Bilangan ${n}`}
                onClick={() => pilih(n)}
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] text-4xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${keliru === n ? "igil-goyang" : ""}`}
              >
                {n}
              </button>
            ))}
          </div>
        ) : null}
        {isi.length > 0 && !beres ? (
          <button type="button" onClick={() => { setIsi([]); setKabar(null); }} className={TOMBOL_KECIL}>
            ↩ Ulangi
          </button>
        ) : null}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black leading-snug text-[#14532D]">
            {akhir && !suara ? `Urutan: ${urut.map((n) => (n === terbesar ? "?" : n)).join(", ")}` : `Urutan: ${urut.join(", ")}`}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuUrut({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const terakhir = RONDE_URUT[RONDE_URUT.length - 1];
  return (
    <GameBentuk
      nomor={nomor}
      judul="Urutkan Bilangan"
      warna="#FDE68A"
      petunjuk="Ketuk bilangan satu per satu untuk menyusun urutan. Ada soal yang meminta mulai dari bilangan terkecil, ada yang mulai dari bilangan terbesar. Pada soal terakhir, ucapkan bilangan yang terbesar."
      speakGuru={speakGuru}
      panel={panel}
      id="d5-urut"
      jumlahRonde={RONDE_URUT.length}
      kunciAkhir={Math.max(...terakhir.ns)}
      belumSiap="Susun urutannya dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeUrut ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

type PasanganTulis = { id: string; a: number; b: number };
const AWAL_TULIS: PasanganTulis = { id: "awal", a: 13, b: 17 };
const PILIHAN_TULIS: PasanganTulis[] = [
  { id: "p1", a: 11, b: 15 },
  { id: "p2", a: 19, b: 14 },
  { id: "p3", a: 12, b: 20 },
];

function KartuTulis({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<string | null>(null);
  const [lulus, setLulus] = useState(false);
  const pil = PILIHAN_TULIS.find((x) => x.id === pilih) ?? null;
  const soal: PasanganTulis | null = tahap === 0 ? AWAL_TULIS : pil;
  const n = soal ? Math.max(soal.a, soal.b) : null;
  const id = tahap === 0 ? "d5-tulis-0" : `d5-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  useBicara(suara && n !== null && soal !== null, n !== null && soal ? `${kalimatBanyak(soal.a, soal.b)}. Bilangan yang lebih besar adalah ${kata(n)}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Bandingkan dua bilangan, ucapkan bilangan yang lebih besar, lalu guratkan angkanya di kanvas. Setelah itu, pilih pasangan bilanganmu sendiri.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Mana yang lebih besar?" : soal ? "Ucapkan yang lebih besar" : "Pilih satu pasangan bilangan"}
          teks={
            tahap === 0
              ? "Bandingkan tiga belas dan tujuh belas. Ucapkan bilangan yang lebih besar, lalu guratkan lambangnya di kanvas."
              : "Ayo mencoba. Pilih satu pasangan bilangan sesukamu. Ucapkan bilangan yang lebih besar, lalu guratkan lambangnya di kanvas."
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 1 && pilih === null ? (
            <div className="grid grid-cols-3 gap-2">
              {PILIHAN_TULIS.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={`Pilih ${x.a} dan ${x.b}`}
                  onClick={() => setPilih(x.id)}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] px-1 py-3 text-2xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {x.a} dan {x.b}
                </button>
              ))}
            </div>
          ) : soal ? (
            <>
              <div className="flex items-center justify-center gap-2">
                <Kotak v={soal.a} />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFF7CC] text-3xl font-black text-[#1C01A5]">{suara ? tanda(soal.a, soal.b) : "?"}</span>
                <Kotak v={soal.b} />
              </div>
              <p className="text-center text-xl font-black text-[#1C01A5]">Yang lebih besar: {suara && n !== null ? `${n} (${kata(n)})` : "?"}</p>
            </>
          ) : null}
        </div>
        {n !== null ? <JawabSuara id={id} jumlah={n} panel={panel} siap belumSiap="" /> : null}
        {suara && n !== null ? (
          <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
            <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
            <DottedNumberTracingCanvas key={`tulis-${id}`} digit={n} kata={kata(n)} onCompletedTrace={() => setLulus(true)} />
            <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
          </div>
        ) : null}
        {suara && tahap === 0 ? (
          <button
            type="button"
            onClick={() => {
              panel.bersih();
              setLulus(false);
              setTahap(1);
            }}
            className={TOMBOL_KECIL}
          >
            ▶ Ayo Mencoba
          </button>
        ) : null}
        {suara && tahap === 1 ? <TombolLanjut teks={teksLanjut} onClick={lanjut} /> : null}
      </div>
    </>
  );
}

/* --------- Poin Penting --------------------------------------------------- */

const SUARA_POIN =
  "Ingat selalu! Hitung dulu banyak benda di setiap kelompok. Dua kelompok dibandingkan dengan kata lebih banyak dan lebih sedikit. Tiga kelompok atau lebih memakai kata paling banyak dan paling sedikit. Kalau dipasangkan satu-satu, kelompok yang punya sisa lebih banyak. Bilangan bisa diurutkan dari terkecil atau dari terbesar. Bandingkan puluhannya dulu, lalu satuannya. Di garis bilangan, bilangan yang lebih ke kanan lebih besar.";

const POIN_D5: { ikon: string; nama: string; isi: React.ReactNode; suara: string }[] = [
  {
    ikon: "⚖️",
    nama: "Lebih banyak, lebih sedikit",
    isi: (
      <p className="text-center text-base font-black leading-snug text-[#1C01A5]">
        15 lebih banyak dari 11
        <br />
        11 lebih sedikit dari 15
      </p>
    ),
    suara: "Lima belas lebih banyak dari sebelas. Sebelas lebih sedikit dari lima belas.",
  },
  {
    ikon: "🏆",
    nama: "Paling banyak, paling sedikit",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">10, 12, 14: paling banyak 14, paling sedikit 10</p>,
    suara: "Pada sepuluh, dua belas, dan empat belas, empat belas paling banyak dan sepuluh paling sedikit.",
  },
  {
    ikon: "🔗",
    nama: "Pasangkan satu-satu",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">yang punya sisa = lebih banyak</p>,
    suara: "Kalau dipasangkan satu-satu, kelompok yang punya sisa tanpa pasangan adalah kelompok yang lebih banyak.",
  },
  {
    ikon: "📶",
    nama: "Urutkan bilangan",
    isi: (
      <p className="text-center text-sm font-black leading-snug text-[#1C01A5]">
        terkecil: 10, 12, 14
        <br />
        terbesar: 14, 12, 10
      </p>
    ),
    suara: "Urutan dari terkecil adalah sepuluh, dua belas, empat belas. Urutan dari terbesar adalah empat belas, dua belas, sepuluh.",
  },
  {
    ikon: "🔣",
    nama: "Tanda pembanding",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">15 &gt; 11 • 11 &lt; 15 • 12 = 12</p>,
    suara: "Lima belas lebih dari sebelas. Sebelas kurang dari lima belas. Dua belas sama dengan dua belas. Tanda yang terbuka menghadap bilangan yang lebih besar.",
  },
  {
    ikon: "🔟",
    nama: "Puluhan dulu, baru satuan",
    isi: <p className="text-center text-sm font-black text-[#1C01A5]">13 dan 17: puluhan sama, 3 lebih kecil dari 7</p>,
    suara: "Bandingkan puluhannya dulu. Kalau puluhannya sama, bandingkan satuannya. Tiga belas lebih kecil dari tujuh belas karena tiga lebih kecil dari tujuh.",
  },
];

const REFLEKSI = [
  "Aku bisa menghitung, membaca, dan menulis bilangan sampai 20.",
  "Aku bisa menghitung maju dan mundur.",
  "Aku bisa memahami nilai tempat.",
  "Aku bisa membandingkan bilangan.",
];

function Refleksi({ speakGuru }: { speakGuru: (t: string) => void }) {
  const [iya, setIya] = useState<boolean[]>(() => REFLEKSI.map(() => false));
  return (
    <div className="space-y-1.5 rounded-3xl border-4 border-[#1C01A5] bg-[#F5F3FF] px-2 py-2">
      <p className="text-center text-base font-black text-[#1C01A5]">📝 Catatanku</p>
      <p className="text-center text-xs font-black text-[#1C01A5]/70">Ketuk kotak kalau jawabanmu iya.</p>
      {REFLEKSI.map((tx, i) => (
        <button
          key={tx}
          type="button"
          aria-pressed={iya[i]}
          aria-label={`${tx} ${iya[i] ? "Iya" : "Belum dicentang"}`}
          onClick={() => {
            const baru = iya.slice();
            baru[i] = !baru[i];
            setIya(baru);
            speakGuru(baru[i] ? `${tx} Iya.` : tx);
          }}
          className="flex w-full items-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-1 text-left"
        >
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-4 border-[#1C01A5] text-xl ${iya[i] ? "bg-[#FFE566]" : "bg-white"}`}>{iya[i] ? "😊" : ""}</span>
          <span className="min-w-0 flex-1 text-sm font-black leading-tight text-[#1C01A5]">{tx}</span>
        </button>
      ))}
    </div>
  );
}

function PoinPentingD5({ speakGuru, onSelesai }: { speakGuru: (t: string) => void; onSelesai: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 flex-1 text-xl font-black text-[#1C01A5]">⭐ Poin Penting</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_POIN)} />
      </div>
      <div className="space-y-2">
        {POIN_D5.map((p) => (
          <button
            key={p.nama}
            type="button"
            aria-label={`Dengarkan: ${p.nama}`}
            onClick={() => speakGuru(p.suara)}
            className="block w-full space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 text-left shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
                <span className="text-3xl">{p.ikon}</span>
                {p.nama}
              </span>
              <LencanaSuara />
            </span>
            {p.isi}
          </button>
        ))}
        <div className="space-y-1 rounded-3xl border-4 border-[#1C01A5] bg-white px-3 py-2 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
          <button
            type="button"
            aria-label="Dengarkan: Cara menyebutkan perbandingan"
            onClick={() => speakGuru("Cara menyebutkan perbandingan. Kelereng Halim lebih banyak dari kelereng Upe. Kelereng Upe lebih sedikit dari kelereng Halim.")}
            className="igil-tanpa-tepi flex w-full items-center justify-between gap-2 text-left"
          >
            <span className="flex items-center gap-2 text-lg font-black leading-tight text-[#1C01A5]">
              <span className="text-3xl">🗣️</span>
              Cara menyebutkan
            </span>
            <LencanaSuara />
          </button>
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {[
              { teks: "Kelereng Halim", warna: "#FFFFFF" },
              { teks: "lebih banyak", warna: "#FECACA" },
              { teks: "dari", warna: "#FFFFFF" },
              { teks: "kelereng Upe", warna: "#BFDBFE" },
            ].map((k) => (
              <span key={k.teks} className="rounded-full border-4 border-[#1C01A5] px-3 py-0.5 text-base font-black text-[#1C01A5]" style={{ backgroundColor: k.warna }}>
                {k.teks}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-[#16A34A] bg-white px-3 py-2">
          <span className="text-3xl" aria-hidden="true">
            🏠
          </span>
          <p className="text-sm font-black leading-snug text-[#14532D]">
            Ayo Bermain di rumah: siapkan dua stoples atau dua kantong. Masukkan kelereng, biji, atau benda kecil ke dalamnya. Hitung isi setiap stoples, tulis nama dan nilai bilangannya, lalu bandingkan. Ceritakan hasilnya dengan kata lebih banyak dan lebih sedikit.
          </p>
        </div>
        <Refleksi speakGuru={speakGuru} />
      </div>
      <TombolLanjut teks="SELESAIKAN SUB-BAB D ➡️" onClick={onSelesai} />
    </>
  );
}

/* --------- Pembungkus Abstract -------------------------------------------- */

type TipeAbstract = "tanda" | "urut" | "tulis";
const KARTU_ABSTRACT: { nomor: number; tipe: TipeAbstract }[] = [
  { nomor: 8, tipe: "tanda" },
  { nomor: 9, tipe: "urut" },
  { nomor: 10, tipe: "tulis" },
];

export function AbstractPerbandinganD(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const poin = indeks >= KARTU_ABSTRACT.length;
  const kartu = KARTU_ABSTRACT[Math.min(indeks, KARTU_ABSTRACT.length - 1)];
  const langkahTotal = KARTU_ABSTRACT.length + 1;

  const lanjut = () => {
    hentikan();
    panel.bersih();
    setIndeks((n) => n + 1);
    gulir();
  };
  const dasar = {
    speakGuru,
    lanjut,
    nomor: kartu.nomor,
    panel,
    teksLanjut: indeks >= KARTU_ABSTRACT.length - 1 ? "LANJUTKAN KE POIN PENTING ⬇️" : "LANJUTKAN ⬇️",
  };

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Kata dan angka" warna={BIRU} />
      <div className="flex items-center gap-1.5" aria-label={`Langkah ${Math.min(indeks + 1, langkahTotal)} dari ${langkahTotal}`}>
        {Array.from({ length: langkahTotal }, (_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`} />
        ))}
      </div>
      {poin ? (
        <PoinPentingD5
          speakGuru={speakGuru}
          onSelesai={() => {
            hentikan();
            panel.bersih();
            onSelesai();
          }}
        />
      ) : (
        <div key={kartu.tipe} className="space-y-3">
          {kartu.tipe === "tanda" ? <KartuTanda {...dasar} /> : null}
          {kartu.tipe === "urut" ? <KartuUrut {...dasar} /> : null}
          {kartu.tipe === "tulis" ? <KartuTulis {...dasar} /> : null}
        </div>
      )}
    </BingkaiTahap>
  );
}
