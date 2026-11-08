"use client";

import React, { useState } from "react";
import { BingkaiTahap } from "./BingkaiTahap";
import { DottedNumberTracingCanvas } from "./elemen-kelas1";
import { KERTAS_ANGKA, TOMBOL_KECIL, TOTAL_GAME, type PropsLangkah } from "./SubBabA2Penjumlahan";
import { GameBentuk } from "./SubBabA4Bentuk";
import { JawabSuara, JudulGame, KABAR_TULIS_OK, KabarChip, Letusan, PanelPoster, STIKER, TombolLanjut, kata, useLetusan, type Kabar, type PanelSuara, type Umum } from "./SubBabBBanding";
import { CatatanPensil, LencanaSuara, PitaTahap, TombolSuaraGuru, useBicara } from "./tahap-b-gaya";
import { BIRU } from "./CeritaBandingB";
import { PoinPentingK2, TahapPermainan, type ItemPoin, type KartuTahap } from "./kit-k2";
import { BatangPuluhan, GarisBilanganK2, KubusSatuan, ModelBatang, SusunBalok, TabelNilaiTempat, sebut } from "./dasar-k2";
import { RONDE_TITIK_K2, RONDE_URUT_K2, TULIS_B_PILIHAN, TULIS_B_RONDE1, nilaiKandidat, semuaCara, uraiK2 } from "./data-k2";
import { LangkahPapanK2, LangkahRakK2, LangkahTokoK2, LangkahTukarK2 } from "./SubBabK2BConcrete";
import { KartuCaraK2, KartuGarisBK2, KartuTabelK2 } from "./SubBabK2BPicture";

/* ------------------------------------------------------------------------ */
/* Kelas 2 Bab 1 Sub-Bab B: Nilai Tempat (Buku Siswa Kelas II hlm. 17-22).    */
/* Semua di klien, tanpa API. Naskah: naskah/mtk-2-bab1-sub-b-nilai-tempat.md */
/*                                                                            */
/* Sepuluh permainan, semuanya beda cara main:                                */
/*  Concrete: 1 Papan Nilai Tempat (seret batang dan kubus), 2 Mesin Tukar    */
/*            (tukar sepuluh satuan), 3 Pesanan Toko Kelereng (seret ke       */
/*            keranjang), 4 Hitung Loncat Sepuluh (ketuk rak telur).          */
/*  Picture:  (diagram polos, tanpa gambar benda)                             */
/*            5 Isi Tabel dari Batang, 6 Tempatkan di Garis Bilangan,         */
/*            7 Pilih Semua Cara yang Benar.                                  */
/*  Abstract: 8 Isi Titik-Titik, 9 Urutkan Kartu Nilai Tempat,                */
/*            10 Kanvas Guratan dan Suara.                                    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman nilai tempat. Tekan tombol suara di setiap panel untuk mendengarkan penjelasannya. Belum ada yang perlu dijawab. Kita akan bermain di tahap berikutnya.";

const SEL = "space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2";

const INGAT_K2B = [
  {
    ikon: "📋",
    nama: "Puluhan kiri, satuan kanan",
    ket: "Angka kiri puluhan, angka kanan satuan",
    suara: "Pada bilangan dua angka, angka di sebelah kiri menunjukkan banyak puluhan, dan angka di sebelah kanan menunjukkan banyak satuan. Pada dua puluh enam, angka dua adalah dua puluhan, dan angka enam adalah enam satuan.",
  },
  {
    ikon: "🔁",
    nama: "10 satuan = 1 puluhan",
    ket: "Boleh ditukar, nilainya tetap",
    suara: "Sepuluh satuan sama dengan satu puluhan. Kita boleh menukarnya, dan nilai bilangannya tidak berubah. Itu sebabnya satu bilangan bisa ditulis dengan beberapa cara.",
  },
];

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

function ManikMontessori({ baris }: { baris: number }) {
  return (
    <svg viewBox="0 0 130 44" className="mx-auto block h-11 w-full max-w-[200px]" role="img" aria-label={`Manik emas: satu batang ${baris} manik`}>
      <path d="M6 22 H124" stroke="#A8672D" strokeWidth="2" />
      {Array.from({ length: baris }, (_, i) => (
        <circle key={i} cx={13 + i * 11.5} cy="22" r="5.4" fill="#F0AB00" stroke="#B45309" strokeWidth="1.4" />
      ))}
    </svg>
  );
}

export function InfografisNilaiK2B({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Nilai Tempat</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="TABEL NILAI TEMPAT"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Kita bisa menghitung banyak benda dengan nilai tempat. Ini tabel nilai tempat. Kolom kiri untuk puluhan, kolom kanan untuk satuan. Satu puluhan dan empat satuan sama dengan empat belas. Dua puluhan dan delapan satuan sama dengan dua puluh delapan. Sepuluh balok yang disusun menjadi satu puluhan. Balok yang tersisa adalah satuan."
      >
        <div className="grid grid-cols-2 gap-2">
          {[14, 28].map((n) => {
            const u = uraiK2(n);
            return (
              <div key={n} className={SEL}>
                <ModelBatang p={u.puluhan} s={u.satuan} />
                <TabelNilaiTempat p={u.puluhan} s={u.satuan} kecil />
                <p className="text-center text-xs font-black text-[#1C01A5]">
                  {u.puluhan} puluhan dan {u.satuan} satuan = {n}
                </p>
              </div>
            );
          })}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="BERAPA PULUHAN, BERAPA SATUAN?"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Untuk membaca nilai tempat, lihat dua angkanya. Angka di kiri adalah banyak puluhan. Angka di kanan adalah banyak satuan. Dua belas, satu puluhan dan dua satuan. Dua puluh lima, dua puluhan dan lima satuan. Tiga puluh tiga, tiga puluhan dan tiga satuan. Empat puluh satu, empat puluhan dan satu satuan. Lima puluh, lima puluhan dan nol satuan."
      >
        <div className="overflow-hidden rounded-2xl border-4 border-[#1C01A5] bg-white">
          <div className="grid grid-cols-[3rem_1fr_1fr] bg-[#FFE566] px-1 py-1 text-[10px] font-black text-[#1C01A5]">
            <span>Bilangan</span>
            <span>Puluhan (kiri)</span>
            <span>Satuan (kanan)</span>
          </div>
          {[12, 25, 33, 41, 50].map((n, i) => (
            <div key={n} className={`grid grid-cols-[3rem_1fr_1fr] items-center px-1 py-1 ${i % 2 ? "bg-[#F5F3FF]" : "bg-white"}`}>
              <span className="text-2xl font-black text-[#1C01A5]">{n}</span>
              <span className="text-sm font-black text-[#B91C1C]">{uraiK2(n).puluhan} puluhan</span>
              <span className="text-sm font-black text-[#1D4ED8]">{uraiK2(n).satuan} satuan</span>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="BALOK DIENES: BATANG DAN KUBUS"
        warna="#0F766E"
        speakGuru={speakGuru}
        suara="Banyak guru di dunia memakai balok Dienes untuk belajar nilai tempat. Alat ini dibuat oleh Zoltan Dienes, seorang ahli matematika. Satu kubus kecil berarti satu satuan. Satu batang yang terdiri dari sepuluh kubus berarti satu puluhan. Sepuluh kubus kecil dan satu batang sama nilainya. Kita bisa memegang dan menyusunnya sendiri."
      >
        <div className="flex items-end justify-center gap-4 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="text-center">
            <KubusSatuan kelas="mx-auto h-9 w-9" />
            <p className="pt-1 text-xs font-black text-[#1C01A5]">kubus = 1 satuan</p>
          </div>
          <span className="pb-6 text-xl font-black text-[#1C01A5]">×10 =</span>
          <div className="text-center">
            <BatangPuluhan kelas="mx-auto h-20 w-5" />
            <p className="pt-1 text-xs font-black text-[#1C01A5]">batang = 1 puluhan</p>
          </div>
          <div className="text-center">
            <SusunBalok kelas="mx-auto h-12 w-20" />
            <p className="pt-1 text-xs font-black text-[#1C01A5]">susun = 10 balok</p>
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="TIGA CARA MENULIS 26"
        warna="#DB2777"
        speakGuru={speakGuru}
        suara="Malosi mempunyai dua puluh enam balok. Ia bisa menuliskannya dengan banyak cara. Cara pertama, nol puluhan dan dua puluh enam satuan. Cara kedua, satu puluhan dan enam belas satuan. Cara ketiga, dua puluhan dan enam satuan. Semuanya sama dengan dua puluh enam. Kita dapat menuliskan bilangan dua puluh enam dengan berbagai cara."
      >
        <div className="grid grid-cols-3 gap-1">
          {semuaCara(26).map((c, i) => (
            <div key={c.p} className={SEL}>
              <p className="text-center text-[10px] font-black text-[#DB2777]">Cara {i + 1}</p>
              <TabelNilaiTempat p={c.p} s={c.s} kecil />
              <p className="text-center text-[11px] font-black leading-tight text-[#1C01A5]">
                {c.p} puluhan
                <br />
                {c.s} satuan
              </p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="TUKAR SEPULUH SATUAN"
        warna="#B45309"
        speakGuru={speakGuru}
        suara="Sepuluh satuan bisa ditukar menjadi satu puluhan. Sebaliknya, satu puluhan bisa dibuka menjadi sepuluh satuan. Nilainya tetap sama. Karena itu, dua puluhan dan enam satuan sama dengan satu puluhan dan enam belas satuan. Pertukaran ini membuat satu bilangan bisa ditulis dengan beberapa cara."
      >
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3">
          <div className="grid grid-cols-5 gap-0.5">
            {Array.from({ length: 10 }, (_, i) => (
              <KubusSatuan key={i} kelas="h-5 w-5" />
            ))}
          </div>
          <span className="text-2xl font-black text-[#1C01A5]">⇄</span>
          <BatangPuluhan kelas="h-16 w-4" />
        </div>
        <p className="text-center text-sm font-black text-[#1C01A5]">10 satuan ⇄ 1 puluhan</p>
      </PanelPoster>

      <PanelPoster
        nomor={6}
        judul="NILAI ANGKA ADA DI TEMPATNYA"
        warna="#4338CA"
        speakGuru={speakGuru}
        suara="Letak angka menentukan nilainya. Pada dua puluh enam, angka dua ada di tempat puluhan, jadi nilainya dua puluh. Angka enam ada di tempat satuan, jadi nilainya enam. Karena itu dua puluh empat berbeda dengan empat puluh dua. Pada dua puluh empat, angka dua bernilai dua puluh. Pada empat puluh dua, angka dua bernilai dua."
      >
        <div className="grid grid-cols-2 gap-2">
          {[
            [26, "2 → 20", "6 → 6"],
            [24, "2 → 20", "4 → 4"],
            [42, "4 → 40", "2 → 2"],
            [35, "3 → 30", "5 → 5"],
          ].map(([n, a, b]) => (
            <div key={String(n)} className={SEL}>
              <p className="text-center text-3xl font-black text-[#1C01A5]">{n}</p>
              <p className="text-center text-xs font-black text-[#B91C1C]">angka {a}</p>
              <p className="text-center text-xs font-black text-[#1D4ED8]">angka {b}</p>
            </div>
          ))}
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={7}
        judul="MANIK EMAS MONTESSORI"
        warna="#EA580C"
        speakGuru={speakGuru}
        suara="Maria Montessori, seorang guru dari Italia, membuat manik emas untuk belajar bilangan. Satu manik berarti satu satuan. Sepuluh manik yang dirangkai menjadi satu batang berarti satu puluhan. Anak-anak menukar sepuluh manik dengan satu batang. Idenya sama dengan tabel nilai tempat kita: sepuluh satuan menjadi satu puluhan."
      >
        <div className="space-y-1 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-2">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" className="h-6 w-6" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" fill="#F0AB00" stroke="#B45309" strokeWidth="1.6" />
            </svg>
            <span className="text-sm font-black text-[#1C01A5]">1 manik = 1 satuan</span>
          </div>
          <ManikMontessori baris={10} />
          <p className="text-center text-sm font-black text-[#1C01A5]">1 batang 10 manik = 1 puluhan</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={8}
        judul="GARIS BILANGAN PULUHAN"
        warna="#16A34A"
        speakGuru={speakGuru}
        suara="Di garis bilangan, kita bisa melompat sepuluh-sepuluh: nol, sepuluh, dua puluh, tiga puluh, empat puluh, lima puluh. Untuk mencari tiga puluh empat, mulai dari tiga puluh, lalu maju empat langkah. Tiga puluh ditambah empat sama dengan tiga puluh empat. Puluhan dulu, baru satuan."
      >
        <div className="rounded-2xl border-4 border-[#1C01A5] bg-white px-1 py-2">
          <GarisBilanganK2 dari={30} sampai={40} lompat={[[30, 34]]} tandai={[34]} langkah={1} />
          <p className="text-center text-sm font-black text-[#1C01A5]">30 + 4 = 34</p>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={9}
        judul="CARA PALING RINGKAS"
        warna="#0E7490"
        speakGuru={speakGuru}
        suara="Satu bilangan bisa ditulis dengan beberapa cara, tetapi cara yang paling ringkas adalah menukar semua sepuluh satuan sampai satuannya kurang dari sepuluh. Empat puluh enam bisa ditulis tiga puluhan dan enam belas satuan, tetapi lebih ringkas empat puluhan dan enam satuan. Periksa selalu dengan menghitung nilainya: empat puluh ditambah enam sama dengan empat puluh enam."
      >
        <div className="flex items-center justify-center gap-2 rounded-2xl border-4 border-[#1C01A5] bg-white px-2 py-3 text-center">
          <div>
            <p className="text-sm font-black text-[#1C01A5]">3 puluhan 16 satuan</p>
            <p className="text-[11px] font-black text-[#B91C1C]">satuan masih lebih dari 9</p>
          </div>
          <span className="text-2xl font-black text-[#1C01A5]">➜</span>
          <div>
            <p className="text-sm font-black text-[#14532D]">4 puluhan 6 satuan</p>
            <p className="text-[11px] font-black text-[#14532D]">paling ringkas</p>
          </div>
        </div>
      </PanelPoster>

      <div className="grid grid-cols-2 gap-2">
        {INGAT_K2B.map((i) => (
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
            <span className="block text-base font-black leading-tight text-[#1C01A5]">{i.nama}</span>
            <span className="block text-[11px] font-black leading-tight text-[#1C01A5]/80">{i.ket}</span>
            <LencanaSuara />
          </button>
        ))}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract. Kata dan angka. Tidak ada gambar.                       */
/* ------------------------------------------------------------------------ */

/* --------- Permainan 8. Isi Titik-Titik ----------------------------------- */

function RondeTitik({ ronde, panel, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const n = RONDE_TITIK_K2[ronde];
  const { puluhan, satuan } = uraiK2(n);
  const akhir = ronde === RONDE_TITIK_K2.length - 1;
  const [isiP, setIsiP] = useState<number | null>(null);
  const [isiS, setIsiS] = useState<number | null>(null);
  const [aktif, setAktif] = useState<"p" | "s">("p");
  const [kabar, setKabar] = useState<Kabar>(null);
  const [beres, setBeres] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara["k2b-titik"] === true && akhir;
  useBicara(akhir ? suara : beres, `${sebut(n)} sama dengan ${sebut(puluhan)} puluhan ditambah ${sebut(satuan)} satuan.`);

  const taruh = (a: number) => {
    if (beres) return;
    if (aktif === "p") {
      setIsiP(a);
      setAktif("s");
    } else {
      setIsiS(a);
    }
    setKabar(null);
  };

  const periksa = () => {
    if (isiP === null || isiS === null) {
      setKabar({ teks: "Isi kedua titik-titiknya dulu: puluhan dan satuan.", ok: false });
      return;
    }
    if (isiP === puluhan && isiS === satuan) {
      setBeres(true);
      setKabar(null);
      letusan.picu();
      onBeres();
      return;
    }
    const bagian: string[] = [];
    if (isiP !== puluhan) bagian.push("Angka di kiri bilangan itu menunjukkan banyak puluhan.");
    if (isiS !== satuan) bagian.push("Angka di kanan bilangan itu menunjukkan banyak satuan.");
    setKabar({ teks: bagian.join(" "), ok: false });
  };

  const kotak = (jenis: "p" | "s", nilai: number | null) => (
    <button
      type="button"
      aria-label={`${jenis === "p" ? "Titik puluhan" : "Titik satuan"}${nilai === null ? ", kosong" : `, ${nilai}`}`}
      onClick={() => !beres && setAktif(jenis)}
      className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 text-4xl font-black text-[#1C01A5] ${nilai === null ? "border-dashed border-[#1C01A5] bg-white" : "border-[#1C01A5] bg-[#FFE566]"} ${!beres && aktif === jenis ? "igil-denyut ring-4 ring-[#F0AB00]" : ""}`}
    >
      {nilai === null ? "…" : nilai}
    </button>
  );

  return (
    <>
      <CatatanPensil
        pendek={suara ? "Hebat!" : beres ? (akhir ? "Ucapkan: bilangannya" : "Isianmu benar!") : "Isi titik-titiknya"}
        teks={`Isi titik-titik ini. ${sebut(n)} sama dengan berapa puluhan ditambah berapa satuan? Ketuk titik, lalu pilih angkanya. Angka kiri adalah puluhan, angka kanan adalah satuan.${akhir ? " Terakhir, ucapkan bilangannya." : ""}`}
      />
      <div className={KERTAS_ANGKA}>
        <div className="flex flex-wrap items-center justify-center gap-2 text-3xl font-black text-[#1C01A5]">
          <span>{n} =</span>
          {kotak("p", isiP)}
          <span className="text-base">puluhan +</span>
          {kotak("s", isiS)}
          <span className="text-base">satuan</span>
        </div>
        {beres ? null : (
          <div className="space-y-1.5">
            <p className="text-center text-sm font-black text-[#1C01A5]">Pilih angka untuk titik {aktif === "p" ? "puluhan" : "satuan"}</p>
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 10 }, (_, a) => (
                <button key={a} type="button" aria-label={`Angka ${a}`} onClick={() => taruh(a)} className="rounded-xl border-4 border-[#1C01A5] bg-[#FFE566] py-2 text-2xl font-black text-[#1C01A5] shadow-[0_3px_0_rgba(28,1,165,0.25)] active:translate-y-0.5">
                  {a}
                </button>
              ))}
            </div>
            <button type="button" onClick={periksa} className={TOMBOL_KECIL}>
              ✔ Periksa
            </button>
          </div>
        )}
        {beres ? (
          <p className="igil-muncul rounded-2xl border-4 border-[#7FCB96] bg-[#E8F7EE] px-2 py-2 text-center text-lg font-black text-[#14532D]">
            {akhir && !suara ? "? = " : `${n} = `}
            {puluhan * 10} + {satuan}
          </p>
        ) : null}
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuTitikK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Isi Titik-Titik"
      warna="#BBF7D0"
      petunjuk="Isi titik-titik: bilangan sama dengan berapa puluhan ditambah berapa satuan. Ketuk titik, lalu pilih angkanya. Angka kiri adalah puluhan, angka kanan adalah satuan. Pada soal terakhir, ucapkan bilangannya."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-titik"
      jumlahRonde={RONDE_TITIK_K2.length}
      kunciAkhir={RONDE_TITIK_K2[RONDE_TITIK_K2.length - 1]}
      belumSiap="Isi titik-titiknya dan periksa dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeTitik ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 9. Urutkan Kartu Nilai Tempat ------------------------ */

function RondeUrut({ ronde, onBeres }: { ronde: number; panel: PanelSuara; onBeres: () => void }) {
  const kartu = RONDE_URUT_K2[ronde];
  const urutBenar = kartu.map((_, i) => i).sort((a, b) => nilaiKandidat(kartu[a]) - nilaiKandidat(kartu[b]));
  const [terambil, setTerambil] = useState<number[]>([]);
  const [goyang, setGoyang] = useState<number | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const beres = terambil.length === kartu.length;
  useBicara(beres, `Urutan dari yang terkecil: ${urutBenar.map((i) => sebut(nilaiKandidat(kartu[i]))).join(", lalu ")}. Ubah dulu setiap kartu menjadi satu bilangan: puluhan dikali sepuluh ditambah satuan.`);

  const ketuk = (i: number) => {
    if (beres || terambil.includes(i)) return;
    if (i === urutBenar[terambil.length]) {
      const baru = [...terambil, i];
      setTerambil(baru);
      setGoyang(null);
      setKabar(null);
      if (baru.length === kartu.length) {
        letusan.picu();
        onBeres();
      }
    } else {
      setGoyang(i);
      setKabar({ teks: `Belum yang terkecil. Ubah dulu setiap kartu menjadi satu bilangan: puluhan dikali sepuluh, lalu tambah satuannya. Kartu ini bernilai ${sebut(nilaiKandidat(kartu[i]))}.`, ok: false });
    }
  };

  return (
    <>
      <CatatanPensil
        pendek={beres ? "Urutanmu benar!" : "Ketuk dari yang terkecil"}
        teks="Urutkan kartu nilai tempat dari bilangan yang paling kecil. Ubah dulu setiap kartu menjadi satu bilangan. Puluhan dikali sepuluh, lalu tambah satuannya. Ketuk kartu yang paling kecil dulu, lalu yang berikutnya."
      />
      <div className={KERTAS_ANGKA}>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Kartu nilai tempat">
          {kartu.map((k, i) => {
            const sudah = terambil.includes(i);
            return (
              <button
                key={`${i}-${goyang === i ? "x" : "o"}`}
                type="button"
                aria-label={`Kartu ${k.p} puluhan ${k.s} satuan${sudah ? `, urutan ke-${terambil.indexOf(i) + 1}` : ""}`}
                disabled={sudah}
                onClick={() => ketuk(i)}
                className={`rounded-2xl border-4 px-2 py-3 text-center text-lg font-black leading-tight ${sudah ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]" : "border-[#1C01A5] bg-[#FFE566] text-[#1C01A5]"} ${goyang === i ? "igil-goyang" : ""}`}
              >
                {k.p} puluhan
                <br />
                {k.s} satuan
              </button>
            );
          })}
        </div>
        <div className="flex min-h-[3.2rem] flex-wrap items-center justify-center gap-2 rounded-2xl border-4 border-dashed border-[#1C01A5] bg-[#FFFDF2] px-2 py-2" aria-label="Urutan dari terkecil">
          {terambil.length === 0 ? <span className="text-sm font-black text-[#1C01A5]/50">terkecil → terbesar</span> : null}
          {terambil.map((i, k) => (
            <React.Fragment key={i}>
              {k > 0 ? <span className="text-2xl font-black text-[#1C01A5]">&lt;</span> : null}
              <span className="igil-muncul rounded-xl border-4 border-[#1C01A5] bg-white px-2 text-2xl font-black text-[#1C01A5]">{nilaiKandidat(kartu[i])}</span>
            </React.Fragment>
          ))}
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
    </>
  );
}

function KartuUrutK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  return (
    <GameBentuk
      nomor={nomor}
      judul="Urutkan Kartu"
      warna="#FDE68A"
      petunjuk="Urutkan kartu nilai tempat dari bilangan yang paling kecil. Ubah dulu setiap kartu menjadi satu bilangan: puluhan dikali sepuluh, lalu tambah satuannya. Ketuk kartu yang paling kecil dulu."
      speakGuru={speakGuru}
      panel={panel}
      id="k2b-urut"
      jumlahRonde={RONDE_URUT_K2.length}
      belumSiap="Urutkan semua kartu dulu, ya."
      teksLanjut={teksLanjut}
      lanjut={lanjut}
      isi={(r, beres) => <RondeUrut ronde={r} panel={panel} onBeres={beres} />}
    />
  );
}

/* --------- Permainan 10. Kanvas Guratan dan Suara ------------------------- */

function KartuTulisK2({ speakGuru, lanjut, nomor, panel, teksLanjut }: PropsLangkah) {
  const awal = TULIS_B_RONDE1.p * 10 + TULIS_B_RONDE1.s;
  const [tahap, setTahap] = useState<0 | 1>(0);
  const [pilih, setPilih] = useState<number | null>(null);
  const [lulus, setLulus] = useState(false);
  const n = tahap === 0 ? awal : pilih;
  const id = tahap === 0 ? "k2b-tulis-0" : `k2b-tulis-1-${pilih ?? "x"}`;
  const suara = panel.suara[id] === true;
  const u = n !== null ? uraiK2(n) : null;
  useBicara(suara && n !== null, n !== null && u ? `${u.puluhan} puluhan dan ${u.satuan} satuan sama dengan ${kata(n).toLowerCase()}. Lambangnya ${n}. Sekarang guratkan angkanya di kanvas.` : "");

  return (
    <>
      <JudulGame
        nomor={nomor}
        total={TOTAL_GAME}
        judul="Kanvas Guratan dan Suara"
        onSuara={() => speakGuru("Baca nilai tempatnya, ucapkan bilangannya, lalu guratkan angkanya di kanvas. Setelah itu, pilih bilangan yang kamu suka.")}
        warna="#C7D2FE"
      />
      <p className="text-center text-xs font-black uppercase tracking-wide text-[#1C01A5]/70">{tahap === 0 ? "Ronde 1 dari 2" : "Ronde 2 dari 2 • Ayo Mencoba"}</p>
      <div key={id} className="space-y-3">
        <CatatanPensil
          pendek={suara ? "Hebat! Guratkan angkanya." : tahap === 0 ? "Baca dan ucapkan bilangannya" : n ? `Ucapkan: ${kata(n)}` : "Pilih satu bilangan"}
          teks={
            tahap === 0
              ? `${sebut(TULIS_B_RONDE1.p)} puluhan dan ${sebut(TULIS_B_RONDE1.s)} satuan. Bilangan apakah itu? Ucapkan bilangannya, lalu guratkan lambangnya di kanvas.`
              : `Ayo mencoba. Pilih satu bilangan sesukamu: ${TULIS_B_PILIHAN.map(sebut).join(", ")}. Sebutkan puluhan dan satuannya, ucapkan bilangannya, lalu guratkan lambangnya di kanvas.`
          }
        />
        <div className={KERTAS_ANGKA}>
          {tahap === 0 ? (
            <p className="text-center text-xl font-black leading-snug text-[#1C01A5]">
              {TULIS_B_RONDE1.p} puluhan dan {TULIS_B_RONDE1.s} satuan
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {TULIS_B_PILIHAN.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-label={`Pilih ${kata(p)}`}
                  disabled={pilih !== null}
                  onClick={() => setPilih(p)}
                  className={`rounded-2xl border-4 border-[#1C01A5] px-1 py-3 text-base font-black leading-tight text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] disabled:opacity-60 ${pilih === p ? "bg-[#7FCB96]" : "bg-[#FFE566]"}`}
                >
                  {kata(p)}
                </button>
              ))}
            </div>
          )}
          {n !== null && u ? (
            <p className="text-center text-xl font-black text-[#1C01A5]">
              {u.puluhan} puluhan + {u.satuan} satuan = {suara ? n : "?"}
            </p>
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

const POIN_K2B: ItemPoin[] = [
  {
    ikon: "📋",
    nama: "Puluhan kiri, satuan kanan",
    isi: <TabelNilaiTempat p={2} s={6} total={26} kecil />,
    suara: "Angka di kiri adalah banyak puluhan. Angka di kanan adalah banyak satuan. Dua puluh enam adalah dua puluhan dan enam satuan.",
  },
  {
    ikon: "🔁",
    nama: "Tukar sepuluh satuan",
    isi: <p className="text-center text-xl font-black text-[#1C01A5]">10 satuan = 1 puluhan</p>,
    suara: "Sepuluh satuan sama dengan satu puluhan. Kita boleh menukar dan membukanya lagi. Nilai bilangannya tidak berubah.",
  },
  {
    ikon: "🔍",
    nama: "Nilai angka",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">26: angka 2 bernilai 20, angka 6 bernilai 6</p>,
    suara: "Letak angka menentukan nilainya. Pada dua puluh enam, angka dua bernilai dua puluh dan angka enam bernilai enam. Dua puluh empat tidak sama dengan empat puluh dua.",
  },
  {
    ikon: "🧮",
    nama: "Berbagai cara menulis",
    isi: (
      <p className="text-center text-sm font-black leading-snug text-[#1C01A5]">
        26 = 26 satuan
        <br />= 1 puluhan 16 satuan
        <br />= 2 puluhan 6 satuan
      </p>
    ),
    suara: "Dua puluh enam bisa ditulis sebagai dua puluh enam satuan, satu puluhan dan enam belas satuan, atau dua puluhan dan enam satuan. Semuanya bernilai dua puluh enam.",
  },
  {
    ikon: "⭐",
    nama: "Cara paling ringkas",
    isi: <p className="text-center text-base font-black text-[#1C01A5]">tukar sampai satuan kurang dari 10</p>,
    suara: "Cara menulis yang paling ringkas adalah menukar semua sepuluh satuan sampai satuannya kurang dari sepuluh. Dua puluh enam menjadi dua puluhan dan enam satuan.",
  },
];

const SUARA_POIN_K2B =
  "Ingat selalu! Angka di kiri adalah puluhan dan angka di kanan adalah satuan. Sepuluh satuan sama dengan satu puluhan. Letak angka menentukan nilainya. Satu bilangan bisa ditulis dengan beberapa cara, dan cara yang paling ringkas adalah menukar semua sepuluh satuan sampai satuannya kurang dari sepuluh.";

const REFLEKSI_K2B = [
  "Aku sudah bisa menuliskan bilangan dalam tabel nilai tempat.",
  "Aku bisa menyebutkan banyak puluhan dan banyak satuan.",
  "Aku bisa menulis satu bilangan dengan beberapa cara.",
  "Aku menyampaikan pendapat dengan percaya diri.",
];

/* --------- Pembungkus tiga tahap ------------------------------------------ */

const KARTU_CONCRETE: KartuTahap[] = [
  { nomor: 1, render: (d) => <LangkahPapanK2 {...d} /> },
  { nomor: 2, render: (d) => <LangkahTukarK2 {...d} /> },
  { nomor: 3, render: (d) => <LangkahTokoK2 {...d} /> },
  { nomor: 4, render: (d) => <LangkahRakK2 {...d} /> },
];

const KARTU_PICTURE: KartuTahap[] = [
  { nomor: 5, render: (d) => <KartuTabelK2 {...d} /> },
  { nomor: 6, render: (d) => <KartuGarisBK2 {...d} /> },
  { nomor: 7, render: (d) => <KartuCaraK2 {...d} /> },
];

const KARTU_ABSTRACT: KartuTahap[] = [
  { nomor: 8, render: (d) => <KartuTitikK2 {...d} /> },
  { nomor: 9, render: (d) => <KartuUrutK2 {...d} /> },
  { nomor: 10, render: (d) => <KartuTulisK2 {...d} /> },
];

export function ConcreteNilaiK2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={4} pita={{ ikon: "🧱", nama: "CONCRETE", cara: "Pegang, seret, dan tukar!", warna: "#8A5322" }} kartu={KARTU_CONCRETE} teksAkhir="LANJUTKAN KE PICTURE ⬇️" />;
}

export function PictureNilaiK2B(props: Umum) {
  return <TahapPermainan umum={props} tahap={5} pita={{ ikon: "🖍️", nama: "PICTURE", cara: "Lihat diagram dan isi", warna: "#B45309" }} kartu={KARTU_PICTURE} teksAkhir="LANJUTKAN KE ABSTRACT ⬇️" labelKartu="Kartu" />;
}

export function AbstractNilaiK2B(props: Umum) {
  return (
    <TahapPermainan
      umum={props}
      tahap={6}
      pita={{ ikon: "✏️", nama: "ABSTRACT", cara: "Kata dan angka", warna: BIRU }}
      kartu={KARTU_ABSTRACT}
      teksAkhir="LANJUTKAN KE POIN PENTING ⬇️"
      labelKartu="Langkah"
      poin={(selesai) => (
        <PoinPentingK2
          speakGuru={props.speakGuru}
          onSelesai={selesai}
          suaraPoin={SUARA_POIN_K2B}
          poin={POIN_K2B}
          cara={{
            suara: "Cara menyebutkan nilai tempat. Dua puluh enam sama dengan dua puluhan dan enam satuan.",
            potongan: [
              { teks: "26", warna: "#FFE566" },
              { teks: "sama dengan", warna: "#FFFFFF" },
              { teks: "2 puluhan", warna: "#FECACA" },
              { teks: "dan", warna: "#FFFFFF" },
              { teks: "6 satuan", warna: "#BFDBFE" },
            ],
          }}
          rumah="Ayo Mencoba di rumah: ambil benda yang banyaknya lebih dari dua puluh, misalnya kancing atau sendok. Susun menjadi kelompok sepuluh, lalu tulis banyaknya di tabel nilai tempat dengan tiga cara yang berbeda. Ceritakan kepada keluargamu."
          refleksi={REFLEKSI_K2B}
          teksSelesai="SELESAIKAN SUB-BAB B ➡️"
        />
      )}
    />
  );
}

