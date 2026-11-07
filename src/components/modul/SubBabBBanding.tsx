"use client";

import { BingkaiTahap } from "@/components/modul/BingkaiTahap";
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IkonMainan } from "./ikon-mainan";
import { GarisBilanganKatak, MulutBuaya, type ArahBuaya } from "./gambar-banding-b";
import { DottedNumberTracingCanvas, SEBUTAN_ANGKA } from "./elemen-kelas1";
import {
  ALAS,
  BendaSeret,
  CatatanPensil,
  CatatanTempel,
  LencanaSuara,
  PitaTahap,
  SuaraCtx,
  TombolSuaraGuru,
  letakMeja,
  useBicara,
  zonaDi,
} from "./tahap-b-gaya";

/* ------------------------------------------------------------------------ */
/* Sub-Bab B: Membandingkan Banyak Benda. Semua di klien, tanpa API.          */
/* Naskah: naskah/mtk-1-bab1-sub-b-membandingkan.md                           */
/* Gaya: permainan anak. Stiker tebal, buaya yang bicara, bintang, goyangan.  */
/* ------------------------------------------------------------------------ */

export type PanelSuara = {
  sedang: boolean;
  pesan: string;
  suara: Record<string, boolean>;
  mulai: (id: string, jumlah: number) => void;
  tandai: (id: string) => void;
  bersih: () => void;
};

export type Umum = {
  speakGuru: (teks: string) => void;
  panel: PanelSuara;
  hentikan: () => void;
  gulir: () => void;
  onSelesai: () => void;
};

export type Kabar = { teks: string; ok: boolean } | null;

const BIRU = "#1C01A5";
const EMAS_TUA = "#F0AB00";
const HIJAU = "#7FCB96";
const MERAH_MUDA = "#E98989";

export const STIKER = "rounded-3xl border-4 border-[#1C01A5] bg-white shadow-[0_5px_0_rgba(28,1,165,0.22)]";

export const kata = (n: number) => (n === 0 ? "Nol" : (SEBUTAN_ANGKA[n - 1] ?? String(n)));

const NAMA: Record<string, string> = {
  sepeda: "Sepeda",
  balon: "Balon",
  kursi: "Kursi",
  buku: "Buku",
  bola: "Bola",
  layangan: "Layangan",
  kelereng: "Kelereng",
};

function hubungan(kiri: number, kanan: number): { tanda: string; arah: ArahBuaya } {
  if (kiri === kanan) return { tanda: "=", arah: "tutup" };
  return kiri > kanan ? { tanda: ">", arah: "kiri" } : { tanda: "<", arah: "kanan" };
}

/* ------------------------------ Perangkat ------------------------------- */

export function useLetusan() {
  const [id, setId] = useState(0);
  const picu = useCallback(() => setId((n) => n + 1), []);
  return { id, picu };
}

const ARAH_BINTANG = [
  [-70, -60],
  [0, -80],
  [70, -60],
  [85, 0],
  [70, 60],
  [0, 80],
  [-70, 60],
  [-85, 0],
];

export function Letusan({ id }: { id: number }) {
  if (!id) return null;
  return (
    <span key={id} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {ARAH_BINTANG.map(([dx, dy], i) => (
        <span
          key={i}
          className="igil-bintang absolute left-1/2 top-1/2 text-2xl"
          style={{ "--dx": `${dx}px`, "--dy": `${dy}px`, animationDelay: `${i * 20}ms` } as React.CSSProperties}
        >
          {i % 2 === 0 ? "⭐" : "✨"}
        </span>
      ))}
    </span>
  );
}

/** Umpan balik: layar hanya "Hebat!" atau "Coba lagi". Isi pesan dibacakan Suara Guru. */
export function KabarChip({ kabar, bicara = true }: { kabar: Kabar; bicara?: boolean }) {
  const ucap = useContext(SuaraCtx);
  useEffect(() => {
    if (bicara && kabar?.teks) ucap(kabar.teks);
  }, [kabar, bicara, ucap]);
  if (!kabar || !kabar.teks) return null;
  return (
    <p
      key={kabar.teks}
      role="status"
      aria-label={kabar.teks}
      className={`igil-muncul rounded-2xl border-4 px-3 py-2 text-center text-xl font-black leading-snug ${
        kabar.ok
          ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
          : "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"
      }`}
    >
      {kabar.ok ? "🌟 Hebat!" : "🤔 Coba lagi"}
    </p>
  );
}

export const KABAR_TULIS_OK: Kabar = { teks: "Tulisanmu sudah pas.", ok: true };

/** Buaya dan gelembung kata pendek. Diketuk, buaya membacakan petunjuk lengkapnya. */
function BuayaBicara({ pendek, teks, arah = "kiri" }: { pendek: string; teks?: string; arah?: ArahBuaya }) {
  const ucap = useContext(SuaraCtx);
  const isi = teks ?? pendek;
  return (
    <button
      type="button"
      aria-label={`Dengarkan: ${isi}`}
      onClick={() => ucap(isi)}
      className="igil-tanpa-tepi flex w-full items-end gap-2 text-left"
    >
      <MulutBuaya arah={arah} kelas="h-14 w-24 shrink-0 igil-lompat" />
      <span className="relative flex min-w-0 flex-1 items-center justify-between gap-2 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-lg font-black leading-snug text-[#1C01A5]">
        <span className="min-w-0">{pendek}</span>
        <LencanaSuara />
      </span>
    </button>
  );
}

export function JudulGame({
  nomor,
  total,
  judul,
  onSuara,
  warna,
}: {
  nomor: number;
  total: number;
  judul: string;
  onSuara: () => void;
  warna: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-4 border-[#1C01A5] text-lg font-black text-[#1C01A5]"
          style={{ backgroundColor: warna }}
        >
          {nomor}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-black uppercase tracking-wide text-[#1C01A5]/70">
            {nomor} dari {total}
          </p>
          <h3 className="break-words text-xl font-black leading-tight text-[#1C01A5]">{judul}</h3>
        </div>
      </div>
      <TombolSuaraGuru onClick={onSuara} />
    </div>
  );
}

export function TombolLanjut({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <div className="flex justify-end pt-1">
      <button
        type="button"
        onClick={onClick}
        className="rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-7 py-3 text-sm font-black text-[#FFE566] shadow-[0_5px_0_rgba(28,1,165,0.35)]"
      >
        {teks}
      </button>
    </div>
  );
}

function KelompokBenda({
  jenis,
  jumlah,
  baruDari = 999,
  nyata = false,
  kecil = false,
}: {
  jenis: string;
  jumlah: number;
  baruDari?: number;
  nyata?: boolean;
  kecil?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center justify-center ${kecil ? "gap-0.5" : "gap-1.5"}`}>
      {Array.from({ length: jumlah }, (_, i) => (
        <span key={i} className={i >= baruDari ? "igil-muncul" : ""}>
          {kecil ? (
            <IkonMainan jenis={jenis} kelas="h-5 w-5 shrink-0" />
          ) : nyata ? (
            <span className="block" style={letakMeja(i)}>
              <IkonMainan jenis={jenis} besar kelas="h-9 w-9 shrink-0 drop-shadow-[0_3px_2px_rgba(90,50,10,0.45)]" />
            </span>
          ) : (
            <IkonMainan jenis={jenis} kelas="h-9 w-9 shrink-0" />
          )}
        </span>
      ))}
    </div>
  );
}

function TandaBuaya({ kiri, kanan }: { kiri: number; kanan: number }) {
  const { tanda, arah } = hubungan(kiri, kanan);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-3 leading-none">
        <span className="text-5xl font-black text-[#1C01A5]">{kiri}</span>
        <span className="igil-muncul rounded-2xl border-4 border-[#FFE566] bg-[#1C01A5] px-4 py-1 text-4xl font-black text-[#FFE566]">
          {tanda}
        </span>
        <span className="text-5xl font-black text-[#1C01A5]">{kanan}</span>
      </div>
      <MulutBuaya arah={arah} kelas="h-14 w-28" />
    </div>
  );
}

/* ------------------------------ Jawab suara ----------------------------- */

function TombolSuara({
  sudah,
  jumlah,
  sedang,
  pesan,
  onTekan,
}: {
  sudah: boolean;
  jumlah: number;
  sedang: boolean;
  pesan: string;
  onTekan: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={sudah ? `${jumlah} ${kata(jumlah)}` : "Jawab dengan suara"}
      onClick={() => {
        if (sudah) return;
        onTekan();
      }}
      className={`flex min-h-20 w-full flex-col items-center justify-center rounded-3xl border-4 px-3 py-2 ${
        sudah
          ? "igil-muncul border-solid border-[#7FCB96] bg-[#E8F7EE]"
          : sedang
            ? "igil-lompat border-solid border-[#F0AB00] bg-[#FFF7CC]"
            : "border-dashed border-[#1C01A5] bg-white"
      }`}
    >
      {sudah ? (
        <>
          <span className="text-4xl font-black leading-none text-[#1C01A5]">{jumlah}</span>
          <span className="text-base font-black leading-tight text-[#1C01A5]">{kata(jumlah)}</span>
        </>
      ) : (
        <span className="text-center text-base font-black leading-tight text-[#1C01A5]">
          🎤 {sedang ? (pesan.startsWith("Memeriksa") ? "Memeriksa..." : "Mendengarkan...") : "Jawab dengan suara"}
        </span>
      )}
    </button>
  );
}

export function JawabSuara({
  id,
  jumlah,
  panel,
  siap = true,
  belumSiap = "",
}: {
  id: string;
  jumlah: number;
  panel: PanelSuara;
  siap?: boolean;
  belumSiap?: string;
}) {
  const [lokal, setLokal] = useState<Kabar>(null);
  const [pilihan, setPilihan] = useState(false);
  const sudah = panel.suara[id] === true;
  const opsi = Array.from(
    new Set([jumlah, jumlah > 1 ? jumlah - 1 : jumlah + 2, jumlah < 10 ? jumlah + 1 : jumlah - 2])
  ).sort((a, b) => a - b);
  const tampilPesan = panel.sedang ? "" : panel.pesan;
  const kabarPesan = useMemo<Kabar>(() => (tampilPesan ? { teks: tampilPesan, ok: false } : null), [tampilPesan]);

  return (
    <div className="space-y-2">
      <TombolSuara
        sudah={sudah}
        jumlah={jumlah}
        sedang={panel.sedang}
        pesan={panel.pesan}
        onTekan={() => {
          if (!siap) {
            setLokal({ teks: belumSiap, ok: false });
            return;
          }
          setLokal(null);
          panel.mulai(id, jumlah);
        }}
      />
      {sudah ? null : (
        <>
          <KabarChip kabar={lokal ?? kabarPesan} />
          <button
            type="button"
            onClick={() => setPilihan((b) => !b)}
            className="mx-auto block rounded-full border-2 border-dashed border-[#1C01A5]/50 bg-white px-4 py-1 text-xs font-black text-[#1C01A5]"
          >
            🔢 Pilih angka
          </button>
          {pilihan ? (
            <div className="grid grid-cols-3 gap-2">
              {opsi.map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`Pilih angka ${n}`}
                  onClick={() => {
                    if (!siap) {
                      setLokal({ teks: belumSiap, ok: false });
                      return;
                    }
                    if (n === jumlah) {
                      setLokal(null);
                      panel.tandai(id);
                    } else {
                      setLokal({ teks: "Hitung lagi, ya. Kamu pasti bisa.", ok: false });
                    }
                  }}
                  className="rounded-2xl border-4 border-[#1C01A5] bg-[#FFE566] py-3 text-3xl font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                >
                  {n}
                </button>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 3: Infografis. Poster untuk dibaca dan didengar. Bukan permainan.    */
/* ------------------------------------------------------------------------ */

const SUARA_INFO =
  "Ini poster rangkuman. Baca dan dengarkan setiap bagian. Belum ada yang perlu diketuk untuk menjawab. Kita akan bermain di tahap berikutnya.";

export function PanelPoster({
  nomor,
  judul,
  warna,
  suara,
  speakGuru,
  children,
}: {
  nomor: number;
  judul: string;
  warna: string;
  suara: string;
  speakGuru: (t: string) => void;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border-4 bg-white shadow-[0_4px_0_rgba(22,101,52,0.25)]" style={{ borderColor: warna }}>
      <header className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: warna }}>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-lg font-black text-[#1C01A5]">
          {nomor}
        </span>
        <h4 className="min-w-0 flex-1 text-base font-black leading-tight tracking-wide text-white">{judul}</h4>
        <TombolSuaraGuru kecil label={`Dengarkan: ${judul}`} onClick={() => speakGuru(suara)} />
      </header>
      <div className="space-y-2 p-3">{children}</div>
    </section>
  );
}

function BadgeJumlah({ n, kelas = "" }: { n: number; kelas?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-1 rounded-full border-2 border-[#1C01A5] bg-[#FFE566] px-3 py-0.5 ${kelas}`}
    >
      <span className="text-xl font-black text-[#1C01A5]">{n}</span>
      <span className="text-[11px] font-black text-[#1C01A5]">{kata(n)}</span>
    </span>
  );
}

function BarisPasangan({
  atas,
  bawah,
  jenisAtas,
  jenisBawah,
}: {
  atas: number;
  bawah: number;
  jenisAtas: string;
  jenisBawah: string;
}) {
  const kolom = Math.max(atas, bawah);
  const gaya = { gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))` };
  const pasang = Math.min(atas, bawah);
  return (
    <div className="space-y-0.5">
      <div className="grid gap-1" style={gaya}>
        {Array.from({ length: atas }, (_, i) => (
          <span
            key={i}
            className={`flex justify-center rounded-lg ${i >= bawah ? "bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : ""}`}
          >
            <IkonMainan jenis={jenisAtas} kelas="h-8 w-8 shrink-0" />
          </span>
        ))}
      </div>
      <div className="grid h-5 gap-1" style={gaya}>
        {Array.from({ length: kolom }, (_, i) => (
          <span key={i} className="flex justify-center">
            {i < pasang ? <span className="h-full w-0.5 rounded-full bg-[#1C01A5]" /> : null}
          </span>
        ))}
      </div>
      <div className="grid gap-1" style={gaya}>
        {Array.from({ length: bawah }, (_, i) => (
          <span
            key={i}
            className={`flex justify-center rounded-lg ${i >= atas ? "bg-[#FFF3C4] ring-2 ring-[#F0AB00]" : ""}`}
          >
            <IkonMainan jenis={jenisBawah} kelas="h-8 w-8 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function InfografisBandingB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  return (
    <BingkaiTahap tahap={3} className="space-y-3">
      <PitaTahap ikon="📰" nama="INFOGRAFIS" cara="Lihat dan dengar" warna="#16A34A" />
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Cara Membandingkan Benda</h3>
        <TombolSuaraGuru onClick={() => speakGuru(SUARA_INFO)} />
      </div>

      <PanelPoster
        nomor={1}
        judul="LIHAT DUA KELOMPOK"
        warna="#2563EB"
        speakGuru={speakGuru}
        suara="Ada enam kursi dan empat buku. Enam lebih banyak dari empat. Empat lebih sedikit dari enam."
      >
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="space-y-1">
            <p className="text-xs font-black text-[#1C01A5]">Kursi</p>
            <KelompokBenda jenis="kursi" jumlah={6} />
            <BadgeJumlah n={6} />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-[#1C01A5]">Buku</p>
            <KelompokBenda jenis="buku" jumlah={4} />
            <BadgeJumlah n={4} />
          </div>
        </div>
      </PanelPoster>

      <PanelPoster
        nomor={2}
        judul="PASANGKAN SATU-SATU"
        warna="#D97706"
        speakGuru={speakGuru}
        suara="Satu kursi, satu balon. Balon habis, tapi dua kursi tidak punya pasangan. Jadi kursi lebih banyak."
      >
        <BarisPasangan atas={6} bawah={4} jenisAtas="kursi" jenisBawah="balon" />
      </PanelPoster>

      <PanelPoster
        nomor={3}
        judul="SAMA BANYAK"
        warna="#7C3AED"
        speakGuru={speakGuru}
        suara="Tiga sepeda dan tiga balon. Semua punya pasangan. Tidak ada sisa. Jadi sama banyak."
      >
        <BarisPasangan atas={3} bawah={3} jenisAtas="sepeda" jenisBawah="balon" />
      </PanelPoster>

      <PanelPoster
        nomor={4}
        judul="GARIS BILANGAN"
        warna="#0891B2"
        speakGuru={speakGuru}
        suara="Di garis bilangan, makin ke kanan makin banyak. Katak jingga berhenti di tujuh. Katak biru di tiga. Tujuh lebih banyak dari tiga."
      >
        <GarisBilanganKatak posisiBiru={3} posisiJingga={7} />
      </PanelPoster>

      <PanelPoster
        nomor={5}
        judul="TANDA MULUT BUAYA"
        warna="#DC2626"
        speakGuru={speakGuru}
        suara="Mulut buaya selalu terbuka ke bilangan yang lebih banyak. Sembilan lebih banyak dari enam. Empat lebih sedikit dari delapan. Enam sama dengan enam, mulut buaya menutup."
      >
        <div className="grid grid-cols-3 gap-1.5 text-center">
          {[
            { a: 9, b: 6, nama: "lebih banyak dari" },
            { a: 4, b: 8, nama: "lebih sedikit dari" },
            { a: 6, b: 6, nama: "sama dengan" },
          ].map((c) => {
            const h = hubungan(c.a, c.b);
            return (
              <div key={c.nama} className="space-y-1 rounded-xl bg-[#FEF2F2] px-1 py-2">
                <div className="flex items-center justify-center gap-1 text-2xl font-black leading-none text-[#1C01A5]">
                  <span>{c.a}</span>
                  <span className="rounded-lg bg-[#1C01A5] px-1.5 text-[#FFE566]">{h.tanda}</span>
                  <span>{c.b}</span>
                </div>
                <MulutBuaya arah={h.arah} kelas="mx-auto h-9 w-[4.5rem]" />
              </div>
            );
          })}
        </div>
      </PanelPoster>

      <div className="flex items-center justify-around gap-2 rounded-2xl border-4 border-dashed border-[#16A34A] bg-white px-2 py-3 text-center text-base font-black leading-tight text-[#14532D]">
        <span>
          <span className="block text-3xl">🔗</span>1 Pasangkan
        </span>
        <span>
          <span className="block text-3xl">🔎</span>2 Lihat sisa
        </span>
        <span>
          <span className="block text-3xl">🐊</span>3 Pilih tanda
        </span>
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 4: Concrete (enam kegiatan)                                          */
/* ------------------------------------------------------------------------ */

type Langkah = {
  kegiatan: number;
  tipe: "bilang" | "pasang" | "banding" | "urut" | "cerita" | "tulis";
  judul: string;
  jenis?: string;
  jumlah?: number;
};

const LANGKAH_CONCRETE: Langkah[] = [
  { kegiatan: 1, tipe: "bilang", judul: "Membilang", jenis: "kursi", jumlah: 6 },
  { kegiatan: 1, tipe: "bilang", judul: "Membilang", jenis: "balon", jumlah: 4 },
  { kegiatan: 2, tipe: "pasang", judul: "Memasangkan" },
  { kegiatan: 3, tipe: "banding", judul: "Membandingkan" },
  { kegiatan: 4, tipe: "urut", judul: "Mengurutkan" },
  { kegiatan: 5, tipe: "cerita", judul: "Cerita" },
  { kegiatan: 6, tipe: "tulis", judul: "Menulis" },
];

const JUMLAH_KEGIATAN = 6;

const SUARA_BILANG =
  "Pegang bendanya satu per satu. Pindahkan ke keranjang sambil menghitung. Lalu ucapkan jumlahnya sekali saja.";
const SUARA_PASANG =
  "Pegang balon, lalu letakkan di kursi. Satu kursi, satu balon. Pasangkan sampai ada yang habis. Lalu cari kursi yang tidak punya pasangan.";
const SUARA_BANDING = "Lihat dua kelompok. Baca perintahnya, lalu ketuk jawabannya.";
const SUARA_URUT = "Seret kelompok ke kotak bernomor. Mulai dari yang paling sedikit sampai yang paling banyak.";
const SUARA_CERITA =
  "Kira punya layang-layang. Tika juga punya. Wei memberi lagi pada Kira. Hitung milik Kira, lalu bandingkan dengan Tika.";
const SUARA_TULIS = "Hitung kedua kelompok. Pilih yang lebih banyak, lalu tulis jumlahnya.";

type PropsLangkah = { speakGuru: (t: string) => void; lanjut: () => void; nomor: number; judul: string };

function LangkahBilang({
  langkah,
  speakGuru,
  panel,
  lanjut,
  nomor,
}: PropsLangkah & { langkah: Langkah; panel: PanelSuara }) {
  const jenis = langkah.jenis ?? "kursi";
  const jumlah = langkah.jumlah ?? 1;
  const [pindah, setPindah] = useState<number[]>([]);
  const letusan = useLetusan();
  const id = `b-bilang-${jenis}`;
  const suara = panel.suara[id] === true;
  const penuh = pindah.length >= jumlah;

  const pindahkan = (i: number) => {
    if (pindah.includes(i)) return;
    const baru = [...pindah, i];
    setPindah(baru);
    if (baru.length >= jumlah) letusan.picu();
  };
  const kolom = jumlah <= 4 ? 2 : 3;
  const sisaDiMeja = jumlah - pindah.length;

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Membilang" onSuara={() => speakGuru(SUARA_BILANG)} warna="#FDE68A" />
      <BuayaBicara
        pendek={suara ? "Hebat!" : penuh ? "Ucapkan jumlahnya" : "Pindahkan satu-satu"}
        teks={
          suara
            ? "Hebat! Jumlahnya sudah kamu ucapkan."
            : penuh
              ? "Semua sudah di keranjang! Lihat nomor terakhir, lalu ucapkan jumlahnya."
              : `Pegang ${NAMA[jenis].toLowerCase()}-nya satu per satu. Pindahkan ke keranjang sambil menghitung!`
        }
      />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        <p className="text-xs font-black tracking-wide text-[#6B3F12]">
          🪑 DI MEJA: {sisaDiMeja}
        </p>
        <div
          className="mx-auto grid w-full gap-2"
          style={{ gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))`, maxWidth: 320 }}
        >
          {Array.from({ length: jumlah }, (_, i) =>
            pindah.includes(i) ? (
              <span
                key={i}
                className="flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-dashed border-[#A8672D]/50"
              />
            ) : (
              <BendaSeret
                key={i}
                id={`o${i}`}
                label={`${NAMA[jenis]} ${i + 1}, pindahkan ke keranjang`}
                onKetuk={() => pindahkan(i)}
                onLepas={(_, x, y) => {
                  if (zonaDi(x, y) === "keranjang") pindahkan(i);
                }}
                kelas="flex aspect-[4/3] items-center justify-center"
              >
                <span className="block" style={letakMeja(i)}>
                  <IkonMainan jenis={jenis} besar kelas="h-16 w-16 drop-shadow-[0_5px_3px_rgba(90,50,10,0.45)]" />
                </span>
              </BendaSeret>
            )
          )}
        </div>
        <div
          data-zona="keranjang"
          className="min-h-24 rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2"
        >
          <p className="mb-1 text-xs font-black tracking-wide text-[#6B3F12]">🧺 KERANJANG</p>
          <div className="flex flex-wrap gap-2">
            {pindah.map((idx, n) => (
              <span key={idx} className="igil-muncul relative">
                <IkonMainan jenis={jenis} kelas="h-11 w-11 shrink-0" />
                <span className="absolute -right-1 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#1C01A5] text-xs font-black text-[#FFE566]">
                  {n + 1}
                </span>
              </span>
            ))}
          </div>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <JawabSuara id={id} jumlah={jumlah} panel={panel} siap={penuh} belumSiap="Pindahkan semua benda ke keranjang dulu, ya." />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

const WARNA_PASANG = [MERAH_MUDA, "#A78BFA", HIJAU, "#60A5FA"];

function LangkahPasang({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const KURSI = 6;
  const BALON = 4;
  const [pilihBalon, setPilihBalon] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<{ k: number; b: number }[]>([]);
  const [sisa, setSisa] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const kursiTerpasang = pasangan.map((p) => p.k);
  const balonTerpasang = pasangan.map((p) => p.b);
  const fase = balonTerpasang.length >= BALON ? (sisa.length >= KURSI - BALON ? "selesai" : "sisa") : "pasang";

  const pasangkan = (b: number, k: number) => {
    if (fase !== "pasang") return;
    if (balonTerpasang.includes(b) || kursiTerpasang.includes(k)) return;
    const baru = [...pasangan, { k, b }];
    setPasangan(baru);
    setPilihBalon(null);
    setKabar(baru.length >= BALON ? { teks: "Balonnya habis! Sekarang cari kursi yang sendirian.", ok: true } : null);
  };

  const ketukKursi = (k: number) => {
    if (fase === "selesai") return;
    if (fase === "sisa") {
      if (kursiTerpasang.includes(k)) {
        setKabar({ teks: "Belum. Cari benda yang tidak punya pasangan.", ok: false });
        return;
      }
      if (sisa.includes(k)) return;
      const baru = [...sisa, k];
      setSisa(baru);
      if (baru.length >= KURSI - BALON) {
        setKabar({ teks: "Pas. Kursi yang tidak berpasangan masih ada. Jadi kursi lebih banyak.", ok: true });
        letusan.picu();
      } else {
        setKabar({ teks: "Betul, kursi ini sendirian. Masih ada satu lagi.", ok: true });
      }
      return;
    }
    if (kursiTerpasang.includes(k)) return;
    if (pilihBalon === null) {
      setKabar({ teks: "Pegang satu balon dulu. Seret ke kursi, atau ketuk balon lalu ketuk kursi.", ok: false });
      return;
    }
    pasangkan(pilihBalon, k);
  };

  const hint =
    fase === "pasang"
      ? "Seret balon ke kursi. Satu balon untuk satu kursi!"
      : fase === "sisa"
        ? "Balonnya habis. Siapa kursi yang tidak punya balon? Ketuk dia!"
        : "Hore! Semua sudah ketemu.";
  const hintPendek = fase === "pasang" ? "Pasangkan!" : fase === "sisa" ? "Mana yang sendiri?" : "Hore!";

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Memasangkan" onSuara={() => speakGuru(SUARA_PASANG)} warna="#FBCFE8" />
      <BuayaBicara pendek={hintPendek} teks={hint} />
      <div className={`relative space-y-3 p-3 ${ALAS}`}>
        <div className="grid grid-cols-6 gap-1.5 pt-3">
          {Array.from({ length: KURSI }, (_, k) => {
            const idx = kursiTerpasang.indexOf(k);
            const warna = idx >= 0 ? WARNA_PASANG[idx] : sisa.includes(k) ? EMAS_TUA : null;
            const sendiri = fase === "sisa" && idx < 0 && !sisa.includes(k);
            return (
              <button
                key={k}
                type="button"
                data-zona={`kursi-${k}`}
                aria-label={`Kursi ${k + 1}`}
                onClick={() => ketukKursi(k)}
                className={`relative flex h-16 w-full items-center justify-center rounded-2xl border-4 bg-[#FFF6E5] ${
                  pilihBalon !== null && idx < 0 && fase === "pasang" ? "igil-lompat" : ""
                } ${sendiri ? "igil-goyang" : ""}`}
                style={{ borderColor: warna ?? "#A8672D" }}
              >
                <IkonMainan jenis="kursi" kelas="h-10 w-10 shrink-0" />
                {idx >= 0 ? (
                  <>
                    <span className="igil-muncul pointer-events-none absolute -right-2 -top-4 block">
                      <IkonMainan jenis="balon" kelas="h-8 w-8" />
                    </span>
                    <span
                      className="absolute -bottom-2 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-black text-white"
                      style={{ backgroundColor: warna ?? BIRU }}
                    >
                      {idx + 1}
                    </span>
                  </>
                ) : null}
                {sisa.includes(k) ? <span className="absolute -bottom-3 text-lg">😮</span> : null}
              </button>
            );
          })}
        </div>
        <div className="rounded-2xl border-2 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2">
          <p className="mb-1 text-xs font-black tracking-wide text-[#6B3F12]">🎈 BALON</p>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: BALON }, (_, b) => {
              const idx = balonTerpasang.indexOf(b);
              if (idx >= 0) {
                return (
                  <span
                    key={b}
                    className="flex h-16 items-center justify-center rounded-2xl border-2 border-dashed border-[#A8672D]/50"
                  />
                );
              }
              return (
                <BendaSeret
                  key={b}
                  id={`b${b}`}
                  aktif={fase === "pasang"}
                  label={`Balon ${b + 1}`}
                  onKetuk={() => {
                    setPilihBalon((p) => (p === b ? null : b));
                    setKabar(null);
                  }}
                  onLepas={(_, x, y) => {
                    const z = zonaDi(x, y);
                    if (z && z.startsWith("kursi-")) pasangkan(b, Number(z.slice(6)));
                  }}
                  kelas={`flex h-16 items-center justify-center rounded-2xl ${
                    pilihBalon === b ? "igil-lompat bg-[#FFF2B8] ring-4 ring-[#F0AB00]" : ""
                  }`}
                >
                  <span className="block" style={letakMeja(b + 2)}>
                    <IkonMainan jenis="balon" besar kelas="h-14 w-14 drop-shadow-[0_5px_3px_rgba(90,50,10,0.45)]" />
                  </span>
                </BendaSeret>
              );
            })}
          </div>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

const PUTARAN_BANDING = [
  {
    kiri: { jenis: "buku", jumlah: 5 },
    kanan: { jenis: "sepeda", jumlah: 5 },
    perintah: "Ketuk tombol: apakah sama banyak?",
    kunci: "sama" as const,
  },
  {
    kiri: { jenis: "bola", jumlah: 8 },
    kanan: { jenis: "kelereng", jumlah: 3 },
    perintah: "Ketuk kelompok yang lebih banyak.",
    kunci: "kiri" as const,
  },
  {
    kiri: { jenis: "kursi", jumlah: 2 },
    kanan: { jenis: "balon", jumlah: 6 },
    perintah: "Ketuk kelompok yang lebih sedikit.",
    kunci: "kiri" as const,
  },
];

function LangkahBanding({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [putaran, setPutaran] = useState(0);
  const [benar, setBenar] = useState(false);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [salah, setSalah] = useState<string | null>(null);
  const letusan = useLetusan();
  const data = PUTARAN_BANDING[putaran];
  const terakhir = putaran >= PUTARAN_BANDING.length - 1;

  const jawab = (pilihan: string) => {
    if (benar) return;
    if (pilihan === data.kunci) {
      setBenar(true);
      setSalah(null);
      setKabar({ teks: "Betul.", ok: true });
      letusan.picu();
    } else {
      setSalah(pilihan);
      setKabar({ teks: "Coba lihat lagi pasangannya.", ok: false });
    }
  };
  const lanjutPutaran = () => {
    setKabar(null);
    setSalah(null);
    if (terakhir) {
      lanjut();
      return;
    }
    setPutaran((n) => n + 1);
    setBenar(false);
  };
  const kotak = (sisi: "kiri" | "kanan", kelompok: { jenis: string; jumlah: number }) => {
    const bisaKetuk = data.kunci !== "sama";
    const terpilih = benar && data.kunci === sisi;
    const keliru = salah === sisi;
    return (
      <button
        type="button"
        aria-label={`Kelompok ${sisi}: ${NAMA[kelompok.jenis]}`}
        disabled={!bisaKetuk}
        onClick={() => jawab(sisi)}
        className={`flex min-w-0 flex-col items-center gap-2 rounded-3xl border-4 px-2 py-3 ${
          terpilih
            ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]"
            : keliru
              ? "igil-goyang border-[#E98989] bg-[#FDECEC]"
              : "border-[#A8672D] bg-[#FFF1D6] shadow-[0_4px_0_rgba(120,70,20,0.35)]"
        }`}
      >
        <span className="rounded-full bg-[#6B3F12] px-3 py-0.5 text-xs font-black text-[#FFE9B8]">
          {NAMA[kelompok.jenis]}
        </span>
        <KelompokBenda jenis={kelompok.jenis} jumlah={kelompok.jumlah} nyata />
      </button>
    );
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Membandingkan" onSuara={() => speakGuru(SUARA_BANDING)} warna="#FDE68A" />
      <BuayaBicara
        pendek={data.kunci === "sama" ? "Sama banyak?" : data.perintah.includes("sedikit") ? "Pilih paling sedikit" : "Pilih paling banyak"}
        teks={`Putaran ${putaran + 1} dari ${PUTARAN_BANDING.length}. ${data.perintah}`}
      />
      <div key={putaran} className="relative grid grid-cols-2 gap-2">
        {kotak("kiri", data.kiri)}
        {kotak("kanan", data.kanan)}
        <Letusan id={letusan.id} />
      </div>
      {data.kunci === "sama" ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => jawab("sama")}
            className={`rounded-2xl border-4 px-2 py-4 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] ${
              benar ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-[#FFE566]"
            }`}
          >
            Sama banyak
          </button>
          <button
            type="button"
            onClick={() => jawab("tidak")}
            className={`rounded-2xl border-4 px-2 py-4 text-base font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.22)] ${
              salah === "tidak" ? "igil-goyang border-[#E98989] bg-[#FDECEC]" : "border-[#1C01A5] bg-white"
            }`}
          >
            Tidak sama banyak
          </button>
        </div>
      ) : null}
      <KabarChip kabar={kabar} />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjutPutaran} />
    </>
  );
}

const KELOMPOK_URUT = [
  { id: "balon", jenis: "balon", jumlah: 9 },
  { id: "kursi", jenis: "kursi", jumlah: 2 },
  { id: "buku", jenis: "buku", jumlah: 4 },
  { id: "bola", jenis: "bola", jumlah: 6 },
];

function LangkahUrut({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const terurut = [...KELOMPOK_URUT].sort((a, b) => a.jumlah - b.jumlah);
  const [slot, setSlot] = useState<(string | null)[]>(() => terurut.map(() => null));
  const [kabar, setKabar] = useState<Kabar>(null);
  const [keliru, setKeliru] = useState<string | null>(null);
  const letusan = useLetusan();
  const terisi = slot.filter(Boolean).length;
  const selesai = terisi >= terurut.length;

  const taruh = (id: string, i: number) => {
    if (selesai || slot.includes(id) || slot[i]) return;
    if (terurut[i].id === id) {
      const baru = [...slot];
      baru[i] = id;
      setSlot(baru);
      setKeliru(null);
      if (baru.filter(Boolean).length >= terurut.length) {
        setKabar({ teks: "Urutannya pas. Dari sedikit ke banyak.", ok: true });
        letusan.picu();
      } else {
        setKabar({ teks: "Benar. Letakkan kelompok berikutnya.", ok: true });
      }
    } else {
      setKeliru(id);
      setKabar({ teks: "Belum di tempat yang pas. Hitung dulu, mana yang lebih sedikit.", ok: false });
    }
  };
  const ketuk = (id: string) => {
    const i = slot.findIndex((s) => s === null);
    if (i >= 0) taruh(id, i);
  };

  const kartu = (k: (typeof KELOMPOK_URUT)[number]) => (
    <div className="flex min-w-0 flex-col items-center gap-1 rounded-2xl border-4 border-[#A8672D] bg-[#FFF1D6] px-1 py-2 shadow-[0_4px_0_rgba(120,70,20,0.35)]">
      <span className="rounded-full bg-[#6B3F12] px-3 py-0.5 text-xs font-black text-[#FFE9B8]">{NAMA[k.jenis]}</span>
      <KelompokBenda jenis={k.jenis} jumlah={k.jumlah} nyata />
    </div>
  );

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Mengurutkan" onSuara={() => speakGuru(SUARA_URUT)} warna="#BBF7D0" />
      <BuayaBicara pendek="Sedikit ke banyak" teks="Seret kelompok ke kotak bernomor. Kotak 1 untuk yang paling sedikit!" />
      <div className="relative space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {KELOMPOK_URUT.map((k) =>
            slot.includes(k.id) ? (
              <span
                key={k.id}
                className="flex min-h-24 items-center justify-center rounded-2xl border-2 border-dashed border-[#A8672D]/50"
              />
            ) : (
              <BendaSeret
                key={k.id}
                id={k.id}
                label={`Kelompok ${NAMA[k.jenis]}`}
                onKetuk={ketuk}
                onLepas={(_, x, y) => {
                  const z = zonaDi(x, y);
                  if (z && z.startsWith("slot-")) taruh(k.id, Number(z.slice(5)));
                }}
                kelas={keliru === k.id ? "igil-goyang" : ""}
              >
                {kartu(k)}
              </BendaSeret>
            )
          )}
        </div>
        <div className="rounded-2xl border-4 border-dashed border-[#7C4A1D] bg-[#F3C98A] p-2">
          <p className="mb-2 text-xs font-black tracking-wide text-[#6B3F12]">📏 SEDIKIT → BANYAK</p>
          <div className="grid grid-cols-4 gap-1.5">
            {terurut.map((_, i) => {
              const isi = KELOMPOK_URUT.find((k) => k.id === slot[i]);
              return (
                <div
                  key={i}
                  data-zona={`slot-${i}`}
                  className={`relative flex min-h-20 items-center justify-center rounded-xl border-4 px-0.5 py-2 ${
                    isi ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]" : "border-dashed border-[#7C4A1D]/60 bg-[#FFF6E5]"
                  }`}
                >
                  <span className="absolute -left-2 -top-3 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#1C01A5] text-base font-black text-[#FFE566]">
                    {i + 1}
                  </span>
                  {isi ? <KelompokBenda jenis={isi.jenis} jumlah={isi.jumlah} kecil /> : null}
                </div>
              );
            })}
          </div>
        </div>
        <Letusan id={letusan.id} />
      </div>
      <KabarChip kabar={kabar} />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

function LangkahCerita({
  speakGuru,
  panel,
  lanjut,
  nomor,
}: PropsLangkah & { panel: PanelSuara }) {
  const [datang, setDatang] = useState(false);
  const [pilih, setPilih] = useState<"Kira" | "Tika" | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const suara = panel.suara["b-cerita"] === true;
  const benar = pilih === "Kira";
  const jumlahKira = datang ? 5 : 3;

  const kelompok = (nama: string, jumlah: number, baruDari?: number) => (
    <div className="flex min-w-0 flex-col items-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FFF1D6] px-2 py-3 shadow-[0_4px_0_rgba(120,70,20,0.35)]">
      <span className="rounded-full bg-[#6B3F12] px-4 py-0.5 text-sm font-black text-[#FFE9B8]">{nama}</span>
      <KelompokBenda jenis="layangan" jumlah={jumlah} baruDari={baruDari} nyata />
    </div>
  );

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Cerita" onSuara={() => speakGuru(SUARA_CERITA)} warna="#E9D5FF" />
      <BuayaBicara
        pendek={!datang ? "Wei memberi Kira" : suara ? "Siapa lebih banyak?" : "Ucapkan jumlah Kira"}
        teks={
          !datang
            ? "Kira punya tiga layang-layang. Tika punya empat. Lalu Wei memberi Kira dua lagi."
            : suara
              ? "Sekarang bandingkan Kira dan Tika!"
              : "Hitung layang-layang Kira, lalu ucapkan sekali."
        }
      />
      <div className="relative grid grid-cols-2 gap-2">
        {kelompok("Kira", jumlahKira, datang ? 3 : undefined)}
        {kelompok("Tika", 4)}
        <Letusan id={letusan.id} />
      </div>
      {!datang ? (
        <button
          type="button"
          onClick={() => setDatang(true)}
          className="igil-lompat w-full rounded-3xl border-4 border-[#1C01A5] bg-[#FFE566] px-3 py-4 text-base font-black text-[#1C01A5] shadow-[0_5px_0_rgba(28,1,165,0.3)]"
        >
          🎁 Wei memberi layang-layang
        </button>
      ) : (
        <>
          <JawabSuara id="b-cerita" jumlah={5} panel={panel} />
          {suara ? (
            <>
              
              <div className="grid grid-cols-2 gap-2">
                {(["Kira", "Tika"] as const).map((nama) => (
                  <button
                    key={nama}
                    type="button"
                    onClick={() => {
                      if (benar) return;
                      setPilih(nama);
                      if (nama === "Kira") {
                        setKabar({ teks: "Betul. Kira punya lebih banyak dari Tika.", ok: true });
                        letusan.picu();
                      } else {
                        setKabar({ teks: "Hitung lagi layang-layang Kira. Bandingkan dengan Tika.", ok: false });
                      }
                    }}
                    className={`rounded-2xl border-4 px-3 py-4 text-xl font-black text-[#1C01A5] ${
                      pilih === nama
                        ? nama === "Kira"
                          ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]"
                          : "igil-goyang border-[#E98989] bg-[#FDECEC]"
                        : "border-[#1C01A5] bg-[#FFE566] shadow-[0_4px_0_rgba(28,1,165,0.25)]"
                    }`}
                  >
                    {nama}
                  </button>
                ))}
              </div>
              <KabarChip kabar={kabar} />
            </>
          ) : null}
        </>
      )}
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

function LangkahTulis({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const [lulus, setLulus] = useState(false);
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Menulis" onSuara={() => speakGuru(SUARA_TULIS)} warna="#FED7AA" />
      <BuayaBicara pendek="Tulis yang banyak" teks="Lihat dua kelompok. Tulis jumlah yang lebih banyak, ya!" />
      <div className="grid grid-cols-2 gap-2">
        {[
          { jenis: "balon", jumlah: 7 },
          { jenis: "buku", jumlah: 4 },
        ].map((k) => (
          <div
            key={k.jenis}
            className="flex min-w-0 flex-col items-center gap-2 rounded-3xl border-4 border-[#A8672D] bg-[#FFF1D6] px-2 py-3 shadow-[0_4px_0_rgba(120,70,20,0.35)]"
          >
            <span className="rounded-full bg-[#6B3F12] px-3 py-0.5 text-xs font-black text-[#FFE9B8]">{NAMA[k.jenis]}</span>
            <KelompokBenda jenis={k.jenis} jumlah={k.jumlah} nyata />
          </div>
        ))}
      </div>
      <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
        <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
        <DottedNumberTracingCanvas key="b-tulis" digit={7} kata={kata(7)} onCompletedTrace={() => setLulus(true)} />
        <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
      </div>
      <TombolLanjut teks="LANJUTKAN KE PICTORIAL ⬇️" onClick={lanjut} />
    </>
  );
}

export function ConcreteBandingB(props: Umum) {
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
  const dasar = { speakGuru, lanjut, nomor: langkah.kegiatan, judul: langkah.judul };

  return (
    <BingkaiTahap tahap={4} className="space-y-3">
      <PitaTahap ikon="🧸" nama="CONCRETE" cara="Pegang dan pindahkan!" warna="#8A5322" />
      <div className="flex items-center gap-1.5" aria-label={`Kegiatan ${langkah.kegiatan} dari ${JUMLAH_KEGIATAN}`}>
        {Array.from({ length: JUMLAH_KEGIATAN }, (_, i) => (
          <span
            key={i}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${
              i < langkah.kegiatan ? "bg-[#FFE566]" : "bg-white"
            }`}
          />
        ))}
      </div>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "bilang" ? <LangkahBilang langkah={langkah} panel={panel} {...dasar} /> : null}
        {langkah.tipe === "pasang" ? <LangkahPasang {...dasar} /> : null}
        {langkah.tipe === "banding" ? <LangkahBanding {...dasar} /> : null}
        {langkah.tipe === "urut" ? <LangkahUrut {...dasar} /> : null}
        {langkah.tipe === "cerita" ? <LangkahCerita panel={panel} {...dasar} /> : null}
        {langkah.tipe === "tulis" ? <LangkahTulis {...dasar} /> : null}
      </div>
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 5: Picture (empat kartu diagram)                                     */
/* ------------------------------------------------------------------------ */

type KartuGambar = {
  id: string;
  bentuk: "pasangan" | "batang" | "bingkai" | "garis";
  judul: string;
  atas: { nama: string; jumlah: number };
  bawah: { nama: string; jumlah: number };
  kunci: number;
  tugas: string;
  tugasPendek: string;
  hasil: string;
  catatan?: string;
  suara: string;
  bantuan: string;
};

const KARTU_GAMBAR_B: KartuGambar[] = [
  {
    id: "b-gambar-p1",
    bentuk: "pasangan",
    judul: "Pasangan Baris",
    atas: { nama: "Kursi", jumlah: 5 },
    bawah: { nama: "Balon", jumlah: 3 },
    kunci: 5,
    tugas: "Ucapkan jumlah baris yang lebih banyak.",
    tugasPendek: "Siapa lebih banyak?",
    hasil: "Baris atas punya sisa. Baris atas lebih banyak.",
    suara: "Warnai dua baris petak. Kotak biru untuk kursi, bulat jingga untuk balon. Lihat garis pasangannya. Lalu ucapkan jumlah baris yang lebih banyak.",
    bantuan: "Ketuk tiap baris untuk mewarnai petaknya. Lihat petak yang tidak punya pasangan.",
  },
  {
    id: "b-gambar-p2",
    bentuk: "batang",
    judul: "Batang Panjang dan Pendek",
    atas: { nama: "Buku", jumlah: 9 },
    bawah: { nama: "Bola", jumlah: 6 },
    kunci: 6,
    tugas: "Ucapkan jumlah batang yang lebih pendek.",
    tugasPendek: "Siapa lebih pendek?",
    hasil: "Batang buku lebih panjang. Buku lebih banyak dari bola.",
    suara: "Warnai dua batang. Lihat mana yang lebih pendek. Lalu ucapkan jumlah batang yang pendek.",
    bantuan: "Ketuk tiap batang untuk mewarnainya. Batang yang lebih pendek berarti lebih sedikit.",
  },
  {
    id: "b-gambar-p3",
    bentuk: "bingkai",
    judul: "Dua Bingkai Sama",
    atas: { nama: "Layangan", jumlah: 8 },
    bawah: { nama: "Kelereng", jumlah: 8 },
    kunci: 8,
    tugas: "Ucapkan jumlah di salah satu bingkai.",
    tugasPendek: "Berapa banyaknya?",
    hasil: "Tidak ada petak sisa. Sama banyak.",
    suara: "Warnai dua bingkai. Lalu ucapkan jumlah di salah satu bingkai, dan tulis.",
    bantuan: "Warnai dua bingkai sampai penuh. Lihat apakah ada petak sisa.",
  },
  {
    id: "b-gambar-p4",
    bentuk: "garis",
    judul: "Garis Bilangan",
    atas: { nama: "Katak biru", jumlah: 3 },
    bawah: { nama: "Katak jingga", jumlah: 7 },
    kunci: 7,
    tugas: "Ucapkan bilangan katak yang lebih jauh ke kanan.",
    tugasPendek: "Siapa lebih jauh?",
    hasil: "Katak jingga lebih jauh ke kanan. Jumlahnya lebih banyak.",
    catatan: "Ke kanan berarti lebih banyak. Ke kiri berarti lebih sedikit.",
    suara:
      "Dua katak melompat di garis bilangan. Lihat siapa yang berhenti lebih jauh ke kanan. Lalu ucapkan bilangannya.",
    bantuan: "Ketuk katak sampai berhenti. Lihat siapa yang lebih jauh ke kanan.",
  },
];

/** Petak gambar: kotak untuk baris atas, bulat untuk baris bawah. Diwarnai dengan krayon. */
function Petak({ baris, terisi }: { baris: "atas" | "bawah"; terisi: boolean }) {
  const bulat = baris === "bawah";
  const warna = bulat ? "#FB923C" : "#60A5FA";
  const bentuk = (props: {
    fill: string;
    fillOpacity?: number;
    stroke: string;
    strokeWidth: number;
    strokeDasharray?: string;
  }) =>
    bulat ? (
      <circle cx="20" cy="20" r="16" {...props} />
    ) : (
      <rect x="4" y="4" width="32" height="32" rx="5" {...props} />
    );
  return (
    <svg viewBox="0 0 40 40" className={`block w-full ${terisi ? "igil-muncul" : ""}`} aria-hidden="true">
      {terisi ? (
        <>
          {bentuk({ fill: warna, fillOpacity: 0.8, stroke: "#374151", strokeWidth: 2.2 })}
          <path
            d="M11 29 L29 11 M11 21 L21 11 M19 29 L29 19"
            stroke="#FFFFFF"
            strokeOpacity="0.55"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      ) : (
        bentuk({ fill: "none", stroke: "#9CA3AF", strokeWidth: 2.4, strokeDasharray: "4 3" })
      )}
    </svg>
  );
}

function LegendaGambar({ atas, bawah }: { atas: string; bawah: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-lg border-2 border-dashed border-[#9CA3AF] bg-white px-2 py-1 text-xs font-black text-[#374151]">
      <span className="flex items-center gap-1">
        <span className="block h-4 w-4 rounded-sm border-2 border-[#374151] bg-[#60A5FA]" aria-hidden="true" />= 1 {atas}
      </span>
      <span className="flex items-center gap-1">
        <span className="block h-4 w-4 rounded-full border-2 border-[#374151] bg-[#FB923C]" aria-hidden="true" />= 1 {bawah}
      </span>
    </div>
  );
}

function IsiKartuGambar({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: {
  kartu: KartuGambar;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const garis = kartu.bentuk === "garis";
  const kapAtas = garis ? kartu.atas.jumlah - 1 : kartu.atas.jumlah;
  const kapBawah = garis ? kartu.bawah.jumlah - 1 : kartu.bawah.jumlah;
  const [hAtas, setHAtas] = useState(0);
  const [hBawah, setHBawah] = useState(0);
  const refAtas = useRef(0);
  const refBawah = useRef(0);
  const [lulus, setLulus] = useState(false);
  const letusan = useLetusan();
  const suara = panel.suara[kartu.id] === true;
  const penuh = hAtas >= kapAtas && hBawah >= kapBawah;
  const terakhir = indeks >= total - 1;
  const sudahPenuh = useRef(false);
  useBicara(suara, `${kartu.hasil}${kartu.catatan ? " " + kartu.catatan : ""}`);

  const cekPenuh = () => {
    if (!sudahPenuh.current && refAtas.current >= kapAtas && refBawah.current >= kapBawah) {
      sudahPenuh.current = true;
      letusan.picu();
    }
  };
  const tambahAtas = () => {
    if (refAtas.current >= kapAtas) return;
    refAtas.current += 1;
    setHAtas(refAtas.current);
    cekPenuh();
  };
  const tambahBawah = () => {
    if (refBawah.current >= kapBawah) return;
    refBawah.current += 1;
    setHBawah(refBawah.current);
    cekPenuh();
  };

  const kolomPasangan = Math.max(kartu.atas.jumlah, kartu.bawah.jumlah);
  const gayaKolom = { gridTemplateColumns: `repeat(${kolomPasangan}, minmax(0, 3.4rem))` };

  const hint = suara
    ? "Hebat! Lihat tandanya di bawah."
    : penuh
      ? kartu.tugas
      : kartu.bantuan;

  return (
    <>
      <JudulGame
        nomor={indeks + 1}
        total={total}
        judul={kartu.judul}
        onSuara={() => speakGuru(kartu.suara)}
        warna="#FDE68A"
      />
      <CatatanTempel pendek={suara ? "Hebat!" : penuh ? kartu.tugasPendek : "Warnai petaknya!"} teks={hint} />

      <div className="relative space-y-2 rounded-lg border-[3px] border-[#6B7280] bg-white/90 p-3 shadow-[3px_4px_0_rgba(0,0,0,0.12)]">
        {kartu.bentuk === "garis" ? null : <LegendaGambar atas={kartu.atas.nama} bawah={kartu.bawah.nama} />}
        {kartu.bentuk === "pasangan" ? (
          <div className="space-y-1">
            <button
              type="button"
              aria-label={`Baris atas ${kartu.atas.nama}`}
              onClick={tambahAtas}
              className="igil-tanpa-tepi block w-full space-y-1 text-left"
            >
              <span className="inline-block border-b-2 border-[#6B7280] px-1 text-sm font-black text-[#374151]">
                {kartu.atas.nama}
              </span>
              <span className="grid justify-center gap-1.5" style={gayaKolom}>
                {Array.from({ length: kartu.atas.jumlah }, (_, i) => (
                  <span
                    key={i}
                    className={penuh && i >= kartu.bawah.jumlah ? "igil-goyang rounded-xl ring-4 ring-[#F0AB00]" : ""}
                  >
                    <Petak baris="atas" terisi={i < hAtas} />
                  </span>
                ))}
              </span>
            </button>
            <div className="grid h-7 justify-center gap-1.5" style={gayaKolom}>
              {Array.from({ length: kolomPasangan }, (_, i) => (
                <span key={i} className="flex justify-center">
                  {penuh && i < Math.min(kartu.atas.jumlah, kartu.bawah.jumlah) ? (
                    <span className="h-full w-1 rounded-full bg-[#1C01A5]" />
                  ) : null}
                </span>
              ))}
            </div>
            <button
              type="button"
              aria-label={`Baris bawah ${kartu.bawah.nama}`}
              onClick={tambahBawah}
              className="igil-tanpa-tepi block w-full space-y-1 text-left"
            >
              <span className="inline-block border-b-2 border-[#6B7280] px-1 text-sm font-black text-[#374151]">
                {kartu.bawah.nama}
              </span>
              <span className="grid justify-center gap-1.5" style={gayaKolom}>
                {Array.from({ length: kartu.bawah.jumlah }, (_, i) => (
                  <Petak key={i} baris="bawah" terisi={i < hBawah} />
                ))}
              </span>
            </button>
          </div>
        ) : null}

        {kartu.bentuk === "batang" ? (
          <div className="space-y-3">
            {[
              { sisi: "atas" as const, data: kartu.atas, h: hAtas, ketuk: tambahAtas },
              { sisi: "bawah" as const, data: kartu.bawah, h: hBawah, ketuk: tambahBawah },
            ].map((b) => (
              <button
                key={b.sisi}
                type="button"
                aria-label={`Batang ${b.data.nama}`}
                onClick={b.ketuk}
                className="igil-tanpa-tepi block w-full space-y-1 text-left"
              >
                <span className="inline-block border-b-2 border-[#6B7280] px-1 text-sm font-black text-[#374151]">
                  Batang {b.data.nama}
                </span>
                <span className="flex gap-1">
                  {Array.from({ length: b.data.jumlah }, (_, i) =>
                    i < b.h ? (
                      <span key={i} className="block w-8 shrink-0">
                        <Petak baris={b.sisi} terisi />
                      </span>
                    ) : (
                      <span
                        key={i}
                        className="block aspect-square w-8 shrink-0 rounded-lg border-4 border-dashed border-[#F0AB00] bg-white"
                      />
                    )
                  )}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {kartu.bentuk === "bingkai" ? (
          <div className="grid grid-cols-2 gap-2">
            {[
              { sisi: "atas" as const, data: kartu.atas, h: hAtas, ketuk: tambahAtas },
              { sisi: "bawah" as const, data: kartu.bawah, h: hBawah, ketuk: tambahBawah },
            ].map((b) => (
              <button
                key={b.sisi}
                type="button"
                aria-label={`Bingkai ${b.data.nama}`}
                onClick={b.ketuk}
                className="space-y-1 rounded-lg border-[3px] border-[#6B7280] bg-white p-2 text-left"
              >
                <span className="block border-b-2 border-[#6B7280] px-1 text-center text-sm font-black text-[#374151]">
                  {b.data.nama}
                </span>
                <span className="grid grid-cols-[repeat(4,minmax(0,2.5rem))] justify-center gap-1">
                  {Array.from({ length: b.data.jumlah }, (_, i) => (
                    <Petak key={i} baris={b.sisi} terisi={i < b.h} />
                  ))}
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {kartu.bentuk === "garis" ? (
          <div className="space-y-2">
            <GarisBilanganKatak posisiBiru={1 + hAtas} posisiJingga={1 + hBawah} />
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={tambahAtas}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#93C5FD] px-2 py-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                  hAtas < kapAtas ? "igil-lompat" : ""
                }`}
              >
                🐸 Biru
              </button>
              <button
                type="button"
                onClick={tambahBawah}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FDBA74] px-2 py-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                  hBawah < kapBawah ? "igil-lompat" : ""
                }`}
              >
                🐸 Jingga
              </button>
            </div>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>

      <JawabSuara id={kartu.id} jumlah={kartu.kunci} panel={panel} siap={penuh} belumSiap="Warnai diagramnya dulu, ya." />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-3xl">🌟</p>
          <TandaBuaya kiri={kartu.atas.jumlah} kanan={kartu.bawah.jumlah} />
        </div>
      ) : null}

      {kartu.bentuk === "bingkai" ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
          <DottedNumberTracingCanvas
            key={`gambar-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
        </div>
      ) : null}

      <TombolLanjut teks={terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} />
    </>
  );
}

export function PictureBandingB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <PictureIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function PictureIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_GAMBAR_B[indeks];
  const terakhir = indeks >= KARTU_GAMBAR_B.length - 1;

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

  return (
    <BingkaiTahap tahap={5} className="space-y-3">
      <PitaTahap ikon="🖍️" nama="PICTURE" cara="Lihat dan warnai" warna="#B45309" />
      <div className="flex items-center gap-1.5">
        {KARTU_GAMBAR_B.map((k, i) => (
          <span
            key={k.id}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <IsiKartuGambar
        key={kartu.id}
        kartu={kartu}
        indeks={indeks}
        total={KARTU_GAMBAR_B.length}
        speakGuru={speakGuru}
        panel={panel}
        lanjut={lanjut}
      />
    </BingkaiTahap>
  );
}

/* ------------------------------------------------------------------------ */
/* Tahap 6: Abstract (tiga kartu lambang)                                     */
/* ------------------------------------------------------------------------ */

type KartuLambang = {
  id: string;
  kiri: number;
  kanan: number;
  tugas: string;
  kunciSuara: number;
  bantuan: string;
  suara: string;
  salahTanda: string;
  kalimat: string;
  pendek: string;
  tulis: boolean;
  tambahan: "kilat" | "urut" | null;
};

const KARTU_LAMBANG_B: KartuLambang[] = [
  {
    id: "b-lambang-l1",
    kiri: 9,
    kanan: 6,
    tugas: "Ucapkan bilangan yang lebih banyak.",
    kunciSuara: 9,
    bantuan: "Pilih tandanya. Mulut tanda selalu terbuka ke bilangan yang lebih banyak. Lalu ucapkan sekali.",
    suara:
      "Lihat dua bilangan. Pilih tandanya. Ingat, mulut buaya menghadap yang lebih banyak. Lalu ucapkan bilangan yang lebih banyak.",
    salahTanda: "Belum. Mulut buaya menghadap bilangan yang lebih banyak.",
    kalimat: "Sembilan lebih banyak dari enam. Enam lebih sedikit dari sembilan.",
    pendek: "Pilih tanda",
    tulis: false,
    tambahan: "kilat",
  },
  {
    id: "b-lambang-l2",
    kiri: 4,
    kanan: 8,
    tugas: "Ucapkan bilangan yang lebih sedikit.",
    kunciSuara: 4,
    bantuan: "Pilih tandanya. Mulut tanda selalu terbuka ke bilangan yang lebih banyak. Lalu ucapkan sekali.",
    suara: "Lihat dua bilangan. Pilih tandanya. Lalu ucapkan bilangan yang lebih sedikit.",
    salahTanda: "Belum. Mulut buaya menghadap bilangan yang lebih banyak.",
    kalimat: "Empat lebih sedikit dari delapan. Delapan lebih banyak dari empat.",
    pendek: "Pilih tanda",
    tulis: false,
    tambahan: "urut",
  },
  {
    id: "b-lambang-l3",
    kiri: 6,
    kanan: 6,
    tugas: "Ucapkan dan tulis bilangannya.",
    kunciSuara: 6,
    bantuan: "Pilih tandanya. Lalu ucapkan dan tulis bilangannya.",
    suara: "Lihat dua bilangan. Pilih tandanya. Lalu ucapkan dan tulis bilangannya.",
    salahTanda: "Belum. Kalau sama banyak, buaya menutup mulut.",
    kalimat: "Enam sama dengan enam. Enam sama banyak dengan enam.",
    pendek: "Pilih tanda",
    tulis: true,
    tambahan: null,
  },
];

const PILIHAN_TANDA: { tanda: string; arah: ArahBuaya; nama: string }[] = [
  { tanda: ">", arah: "kiri", nama: "lebih banyak dari" },
  { tanda: "<", arah: "kanan", nama: "lebih sedikit dari" },
  { tanda: "=", arah: "tutup", nama: "sama dengan" },
];

const SOAL_KILAT: [number, number][] = [
  [2, 8],
  [7, 7],
  [5, 1],
];

function LatihanKilat() {
  const [jawab, setJawab] = useState<(string | null)[]>(() => SOAL_KILAT.map(() => null));
  return (
    <div className="igil-muncul space-y-2 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-3">
      <p className="text-sm font-black text-[#1C01A5]">✏️ Isi tanda</p>
      {SOAL_KILAT.map(([a, b], i) => {
        const kunci = hubungan(a, b).tanda;
        const j = jawab[i];
        const benar = j === kunci;
        return (
          <div key={i} className="flex items-center justify-center gap-2">
            <span className="w-9 text-center text-4xl font-black text-[#1C01A5]">{a}</span>
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-lg border-[3px] text-3xl font-black ${
                j === null
                  ? "border-dashed border-[#1C01A5]/50 text-[#1C01A5]/30"
                  : benar
                    ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE] text-[#166534]"
                    : "igil-goyang border-[#E98989] bg-[#FDECEC] text-[#991B1B]"
              }`}
            >
              {j ?? "?"}
            </span>
            <span className="w-9 text-center text-4xl font-black text-[#1C01A5]">{b}</span>
            <span className="flex gap-1">
              {[">", "<", "="].map((tt) => (
                <button
                  key={tt}
                  type="button"
                  aria-label={`Tanda ${tt} untuk ${a} dan ${b}`}
                  onClick={() => {
                    if (benar) return;
                    setJawab((prev) => prev.map((x, n) => (n === i ? tt : x)));
                  }}
                  className="h-11 w-11 rounded-lg border-[3px] border-[#1C01A5] bg-[#FFE566] text-2xl font-black text-[#1C01A5]"
                >
                  {tt}
                </button>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const DERET_URUT = [7, 3, 9, 5];

function UrutAngka() {
  const urut = [...DERET_URUT].sort((a, b) => a - b);
  const [pilih, setPilih] = useState<number[]>([]);
  const [salah, setSalah] = useState<number | null>(null);
  const selesai = pilih.length >= urut.length;
  useBicara(selesai, "Urutannya pas. Dari kecil ke besar.");
  return (
    <div className="igil-muncul space-y-2 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-3">
      <p className="text-sm font-black text-[#1C01A5]">✏️ Kecil ke besar</p>
      <div className="flex items-center justify-center gap-2">
        {DERET_URUT.map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`Angka ${n}`}
            onClick={() => {
              if (selesai || pilih.includes(n)) return;
              if (urut[pilih.length] === n) {
                setPilih((p) => [...p, n]);
                setSalah(null);
              } else {
                setSalah(n);
              }
            }}
            className={`h-16 w-16 rounded-lg border-[3px] text-4xl font-black text-[#1C01A5] ${
              pilih.includes(n)
                ? "border-[#7FCB96] bg-[#E8F7EE] opacity-60"
                : salah === n
                  ? "igil-goyang border-[#E98989] bg-[#FDECEC]"
                  : "border-[#1C01A5] bg-[#FFE566]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex min-h-12 items-center justify-center gap-2 text-4xl font-black text-[#1C01A5]">
        {pilih.length === 0 ? <span className="text-base text-[#1C01A5]/50">... &lt; ... &lt; ... &lt; ...</span> : null}
        {pilih.map((n, i) => (
          <React.Fragment key={n}>
            {i > 0 ? <span className="text-[#166534]">&lt;</span> : null}
            <span className="igil-muncul">{n}</span>
          </React.Fragment>
        ))}
      </div>
      {selesai ? <p className="text-center text-xl font-black text-[#166534]">🌟 Hebat!</p> : null}
    </div>
  );
}

function IsiKartuLambang({
  kartu,
  indeks,
  total,
  speakGuru,
  panel,
  lanjut,
}: {
  kartu: KartuLambang;
  indeks: number;
  total: number;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const kunciTanda = hubungan(kartu.kiri, kartu.kanan).tanda;
  const [pilih, setPilih] = useState<string | null>(null);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [lulus, setLulus] = useState(false);
  const letusan = useLetusan();
  const benar = pilih === kunciTanda;
  const suara = panel.suara[kartu.id] === true;
  useBicara(suara, kartu.kalimat);

  const ketukTanda = (tanda: string) => {
    if (benar) return;
    setPilih(tanda);
    if (tanda === kunciTanda) {
      setKabar({ teks: "Tanda sudah pas. Sekarang ucapkan.", ok: true });
      letusan.picu();
    } else {
      setKabar({ teks: kartu.salahTanda, ok: false });
    }
  };

  return (
    <>
      <JudulGame
        nomor={indeks + 1}
        total={total}
        judul={`Lambang ${indeks + 1}`}
        onSuara={() => speakGuru(kartu.suara)}
        warna="#C7D2FE"
      />
      <CatatanPensil pendek={suara ? "Hebat!" : benar ? "Ucapkan!" : kartu.pendek} teks={suara ? "Hebat! Kamu pintar sekali." : kartu.bantuan} />

      <div className="relative flex items-center justify-center gap-4 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 py-6 shadow-[3px_4px_0_rgba(28,1,165,0.18)]">
        <span className="w-16 text-center text-8xl font-black leading-none text-[#1C01A5]">{kartu.kiri}</span>
        <span
          key={pilih ?? "kosong"}
          className={`flex h-20 w-20 items-center justify-center rounded-lg border-[3px] text-6xl font-black ${
            pilih === null
              ? "border-dashed border-[#1C01A5]/60 text-[#1C01A5]/30"
              : benar
                ? "igil-muncul border-solid border-[#7FCB96] bg-[#E8F7EE] text-[#166534]"
                : "igil-goyang border-solid border-[#E98989] bg-[#FDECEC] text-[#991B1B]"
          }`}
          aria-label="Kotak tanda"
        >
          {pilih ?? "?"}
        </span>
        <span className="w-16 text-center text-8xl font-black leading-none text-[#1C01A5]">{kartu.kanan}</span>
        <Letusan id={letusan.id} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PILIHAN_TANDA.map((p) => (
          <button
            key={p.tanda}
            type="button"
            aria-label={`Tanda ${p.nama}`}
            onClick={() => ketukTanda(p.tanda)}
            className="flex flex-col items-center gap-0.5 rounded-lg border-[3px] border-[#1C01A5] bg-[#FFE566] px-1 py-2 shadow-[0_4px_0_rgba(28,1,165,0.3)]"
          >
            <span className="text-6xl font-black leading-none text-[#1C01A5]">{p.tanda}</span>
          </button>
        ))}
      </div>

      <KabarChip kabar={kabar} />

      <JawabSuara
        id={kartu.id}
        jumlah={kartu.kunciSuara}
        panel={panel}
        siap={benar}
        belumSiap="Pilih tandanya dulu, ya."
      />

      {suara ? (
        <div className="igil-muncul space-y-1 rounded-lg border-[3px] border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-5xl font-black leading-tight text-[#1C01A5]">
            {kartu.kiri} {kunciTanda} {kartu.kanan}
          </p>
          <p className="text-3xl">🌟</p>
        </div>
      ) : null}

      {suara && kartu.tambahan === "kilat" ? <LatihanKilat /> : null}
      {suara && kartu.tambahan === "urut" ? <UrutAngka /> : null}

      {suara && kartu.tulis ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border-[3px] border-[#1C01A5] bg-white/90 p-3">
          <div className="text-lg font-black text-[#1C01A5]">✏️ Tulis</div>
          <DottedNumberTracingCanvas
            key={`lambang-${kartu.id}`}
            digit={kartu.kunciSuara}
            kata={kata(kartu.kunciSuara)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? KABAR_TULIS_OK : null} />
        </div>
      ) : null}

      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

export function AbstractBandingB(props: Umum) {
  return (
    <SuaraCtx.Provider value={props.speakGuru}>
      <AbstractIsi {...props} />
    </SuaraCtx.Provider>
  );
}

function AbstractIsi({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
  const [indeks, setIndeks] = useState(0);
  const kartu = KARTU_LAMBANG_B[indeks];
  const terakhir = indeks >= KARTU_LAMBANG_B.length - 1;

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

  return (
    <BingkaiTahap tahap={6} className="space-y-3">
      <PitaTahap ikon="✏️" nama="ABSTRACT" cara="Angka dan tanda" warna="#1C01A5" />
      <div className="flex items-center gap-1.5">
        {KARTU_LAMBANG_B.map((k, i) => (
          <span
            key={k.id}
            className={`h-3 flex-1 rounded-full border-2 border-[#1C01A5] ${i <= indeks ? "bg-[#FFE566]" : "bg-white"}`}
          />
        ))}
      </div>
      <IsiKartuLambang
        key={kartu.id}
        kartu={kartu}
        indeks={indeks}
        total={KARTU_LAMBANG_B.length}
        speakGuru={speakGuru}
        panel={panel}
        lanjut={lanjut}
      />
    </BingkaiTahap>
  );
}
