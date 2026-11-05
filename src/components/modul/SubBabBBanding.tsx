"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { IkonMainan } from "./ikon-mainan";
import { GarisBilanganKatak, MulutBuaya, type ArahBuaya } from "./gambar-banding-b";
import { DottedNumberTracingCanvas, SEBUTAN_ANGKA } from "./elemen-kelas1";

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

type Umum = {
  speakGuru: (teks: string) => void;
  panel: PanelSuara;
  hentikan: () => void;
  gulir: () => void;
  onSelesai: () => void;
};

type Kabar = { teks: string; ok: boolean } | null;

const BIRU = "#1C01A5";
const EMAS_TUA = "#F0AB00";
const HIJAU = "#7FCB96";
const MERAH_MUDA = "#E98989";

const STIKER = "rounded-3xl border-4 border-[#1C01A5] bg-white shadow-[0_5px_0_rgba(28,1,165,0.22)]";

const kata = (n: number) => SEBUTAN_ANGKA[n - 1] ?? String(n);

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

function kalimatHubungan(a: string, b: string, kiri: number, kanan: number): string {
  if (kiri === kanan) return `${a} sama banyak dengan ${b.toLowerCase()}.`;
  return kiri > kanan
    ? `${a} lebih banyak dari ${b.toLowerCase()}.`
    : `${a} lebih sedikit dari ${b.toLowerCase()}.`;
}

/* ------------------------------ Perangkat ------------------------------- */

function useLetusan() {
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

function Letusan({ id }: { id: number }) {
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

function KabarChip({ kabar }: { kabar: Kabar }) {
  if (!kabar || !kabar.teks) return null;
  return (
    <p
      key={kabar.teks}
      role="status"
      className={`igil-muncul rounded-2xl border-4 px-3 py-2 text-center text-sm font-black leading-snug ${
        kabar.ok
          ? "border-[#7FCB96] bg-[#E8F7EE] text-[#14532D]"
          : "border-[#E98989] bg-[#FDECEC] text-[#7F1D1D]"
      }`}
    >
      {kabar.ok ? "🌟 " : "🤔 "}
      {kabar.teks}
    </p>
  );
}

function BuayaBicara({ teks, arah = "kiri" }: { teks: string; arah?: ArahBuaya }) {
  return (
    <div className="flex items-end gap-2">
      <MulutBuaya arah={arah} kelas="h-14 w-24 igil-lompat" />
      <div className="relative min-w-0 flex-1 rounded-3xl rounded-bl-md border-4 border-[#1C01A5] bg-white px-3 py-2 text-sm font-black leading-snug text-[#1C01A5]">
        {teks}
      </div>
    </div>
  );
}

function JudulGame({
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
          <h3 className="truncate text-xl font-black leading-tight text-[#1C01A5]">{judul}</h3>
        </div>
      </div>
      <button
        type="button"
        onClick={onSuara}
        className="shrink-0 rounded-full border-[3px] border-[#FFE566] bg-[#1C01A5] px-3 py-2 text-xs font-black text-[#FFE566] shadow-md"
      >
        🔊 Suara Guru
      </button>
    </div>
  );
}

function TombolLanjut({ teks, onClick }: { teks: string; onClick: () => void }) {
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
}: {
  jenis: string;
  jumlah: number;
  baruDari?: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {Array.from({ length: jumlah }, (_, i) => (
        <span key={i} className={i >= baruDari ? "igil-muncul" : ""}>
          <IkonMainan jenis={jenis} kelas="h-9 w-9 shrink-0" />
        </span>
      ))}
    </div>
  );
}

function PetakWajah({ baris }: { baris: "atas" | "bawah" }) {
  const isi = baris === "atas" ? "#93C5FD" : "#FDE68A";
  const garis = baris === "atas" ? BIRU : EMAS_TUA;
  return (
    <svg viewBox="0 0 40 40" className="igil-muncul block w-full" aria-hidden="true">
      {baris === "atas" ? (
        <rect x="3" y="3" width="34" height="34" rx="10" fill={isi} stroke={garis} strokeWidth="3" />
      ) : (
        <circle cx="20" cy="20" r="17" fill={isi} stroke={garis} strokeWidth="3" />
      )}
      <circle cx="14" cy="17" r="2.6" fill={BIRU} />
      <circle cx="26" cy="17" r="2.6" fill={BIRU} />
      <path d="M13 25 Q20 32 27 25" fill="none" stroke={BIRU} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
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

function JawabSuara({
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
          <KabarChip kabar={lokal ?? (tampilPesan ? { teks: tampilPesan, ok: false } : null)} />
          <button
            type="button"
            onClick={() => setPilihan((b) => !b)}
            className="mx-auto block rounded-full border-2 border-dashed border-[#1C01A5]/50 bg-white px-4 py-1 text-xs font-black text-[#1C01A5]"
          >
            Tidak bisa bicara? Pilih angkanya
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
/* Tahap 3: Infografis                                                        */
/* ------------------------------------------------------------------------ */

const BARIS_INFO = [
  { kiri: { jenis: "sepeda", jumlah: 3 }, kanan: { jenis: "balon", jumlah: 3 } },
  { kiri: { jenis: "kursi", jumlah: 6 }, kanan: { jenis: "buku", jumlah: 4 } },
  { kiri: { jenis: "bola", jumlah: 5 }, kanan: { jenis: "layangan", jumlah: 8 } },
  { kiri: { jenis: "buku", jumlah: 7 }, kanan: { jenis: "kelereng", jumlah: 7 } },
  { kiri: { jenis: "kelereng", jumlah: 10 }, kanan: { jenis: "bola", jumlah: 9 } },
];

const SUARA_INFO =
  "Dua kelompok dan hasilnya. Ketuk ikon di kiri, lalu di kanan. Setiap ketuk, angkanya naik satu. Setelah kedua kelompok penuh, lihat hasilnya dan tandanya.";

const POLA_TITIK = (warna: string) => ({
  backgroundImage: `radial-gradient(${warna} 2px, transparent 2px)`,
  backgroundSize: "22px 22px",
});

function BarisInfo({
  b,
  nomor,
  angka,
  ketuk,
}: {
  b: (typeof BARIS_INFO)[number];
  nomor: number;
  angka: Record<string, number>;
  ketuk: (kunci: string, target: number) => void;
}) {
  const kk = `${nomor}k`;
  const kr = `${nomor}r`;
  const n1 = angka[kk] ?? 0;
  const n2 = angka[kr] ?? 0;
  const penuh = n1 >= b.kiri.jumlah && n2 >= b.kanan.jumlah;
  const letusan = useLetusan();
  const picuLetusan = letusan.picu;
  useEffect(() => {
    if (penuh) picuLetusan();
  }, [penuh, picuLetusan]);

  const sel = (kunci: string, jenis: string, n: number, target: number) => (
    <button
      type="button"
      aria-label={`${NAMA[jenis]}${n > 0 ? ` ${n}` : ""}`}
      aria-pressed={n > 0}
      onClick={() => ketuk(kunci, target)}
      className={`flex min-w-0 flex-col items-center gap-1 rounded-3xl border-4 px-2 py-2 ${
        n >= target ? "border-[#7FCB96] bg-[#E8F7EE]" : "border-[#1C01A5] bg-white"
      } ${n === 0 ? "igil-lompat" : ""}`}
    >
      <IkonMainan jenis={jenis} besar kelas="h-14 w-14 shrink-0" />
      <span className="text-xs font-black text-[#1C01A5]">{NAMA[jenis]}</span>
      <span
        key={n}
        className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 ${
          n > 0 ? "igil-muncul border-[#1C01A5] bg-[#FFE566]" : "border-dashed border-[#1C01A5]/40 bg-white"
        }`}
      >
        {n > 0 ? (
          <>
            <span className="text-3xl font-black leading-none text-[#1C01A5]">{n}</span>
            <span className="text-[10px] font-black leading-tight text-[#1C01A5]">{kata(n)}</span>
          </>
        ) : (
          <span className="text-2xl font-black text-[#1C01A5]/30">?</span>
        )}
      </span>
    </button>
  );

  return (
    <div className={`relative space-y-3 p-3 ${STIKER}`}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        {sel(kk, b.kiri.jenis, n1, b.kiri.jumlah)}
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1C01A5] text-xs font-black text-[#FFE566]">
          VS
        </span>
        {sel(kr, b.kanan.jenis, n2, b.kanan.jumlah)}
      </div>
      <div
        className={`flex min-h-28 flex-col items-center justify-center gap-1 rounded-2xl border-4 px-2 py-2 text-center ${
          penuh ? "igil-muncul border-solid border-[#1C01A5] bg-[#FFFBEB]" : "border-dashed border-[#1C01A5]/40 bg-white"
        }`}
      >
        <span className="text-[10px] font-black tracking-widest text-[#1C01A5]/70">HASIL</span>
        {penuh ? (
          <>
            <span className="text-base font-black leading-snug text-[#1C01A5]">
              {kalimatHubungan(NAMA[b.kiri.jenis], NAMA[b.kanan.jenis], b.kiri.jumlah, b.kanan.jumlah)}
            </span>
            <TandaBuaya kiri={b.kiri.jumlah} kanan={b.kanan.jumlah} />
          </>
        ) : (
          <span className="text-sm font-black text-[#1C01A5]/50">Ketuk dua kelompok sampai penuh</span>
        )}
      </div>
      <Letusan id={letusan.id} />
    </div>
  );
}

export function InfografisBandingB({ speakGuru }: { speakGuru: (teks: string) => void }) {
  const [angka, setAngka] = useState<Record<string, number>>({});
  const angkaRef = useRef<Record<string, number>>({});

  const ketuk = useCallback(
    (kunci: string, target: number) => {
      const sekarang = angkaRef.current[kunci] ?? 0;
      if (sekarang >= target) return;
      const berikut = sekarang + 1;
      angkaRef.current[kunci] = berikut;
      setAngka((prev) => ({ ...prev, [kunci]: berikut }));
      speakGuru(kata(berikut));
    },
    [speakGuru]
  );

  return (
    <div
      className="space-y-3 rounded-[2rem] border-4 border-[#22C55E] bg-[#F0FDF4] p-3"
      style={POLA_TITIK("#BBF7D0")}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="min-w-0 text-xl font-black leading-tight text-[#1C01A5]">Dua Kelompok dan Hasilnya</h3>
        <button
          type="button"
          onClick={() => speakGuru(SUARA_INFO)}
          className="shrink-0 rounded-full border-[3px] border-[#FFE566] bg-[#1C01A5] px-3 py-2 text-xs font-black text-[#FFE566] shadow-md"
        >
          🔊 Suara Guru
        </button>
      </div>
      <BuayaBicara teks="Ketuk gambarnya satu per satu. Angkanya naik sendiri. Kalau dua-duanya penuh, lihat siapa yang menang!" />
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-full bg-[#1C01A5] py-1 text-center text-xs font-black tracking-wide text-[#FFE566]">
          KELOMPOK KIRI
        </div>
        <div className="rounded-full bg-[#1C01A5] py-1 text-center text-xs font-black tracking-wide text-[#FFE566]">
          KELOMPOK KANAN
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {BARIS_INFO.map((b, i) => (
          <BarisInfo key={i} b={b} nomor={i} angka={angka} ketuk={ketuk} />
        ))}
      </div>
    </div>
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

const SUARA_BILANG = "Hitung bendanya satu per satu. Lalu ucapkan jumlahnya sekali saja.";
const SUARA_PASANG = "Satu kursi, satu balon. Pasangkan sampai ada yang habis. Lalu cari yang tidak punya pasangan.";
const SUARA_BANDING = "Lihat dua kelompok. Baca perintahnya, lalu ketuk jawabannya.";
const SUARA_URUT = "Susun kelompok dari yang paling sedikit sampai yang paling banyak.";
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
  const [hitung, setHitung] = useState(0);
  const hitungRef = useRef(0);
  const letusan = useLetusan();
  const id = `b-bilang-${jenis}`;
  const suara = panel.suara[id] === true;
  const penuh = hitung >= jumlah;
  const ketuk = () => {
    if (hitungRef.current >= jumlah) return;
    hitungRef.current += 1;
    setHitung(hitungRef.current);
    if (hitungRef.current >= jumlah) letusan.picu();
  };
  const kolom = jumlah <= 3 ? jumlah : jumlah <= 4 ? 2 : 3;
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Membilang" onSuara={() => speakGuru(SUARA_BILANG)} warna="#BFDBFE" />
      <BuayaBicara
        teks={
          suara
            ? "Hebat! Jumlahnya sudah kamu ucapkan."
            : penuh
              ? "Penuh! Hitung bendanya, lalu ucapkan sekali."
              : `Ketuk kotak kosong sampai penuh. Ada ${NAMA[jenis].toLowerCase()} yang menunggu!`
        }
      />
      <button
        type="button"
        aria-label={penuh ? `${NAMA[jenis]} sudah penuh` : `Tambah ${NAMA[jenis]}`}
        aria-pressed={penuh}
        onClick={ketuk}
        className={`relative block w-full p-3 ${STIKER}`}
      >
        <span
          className="mx-auto grid w-full gap-2"
          style={{ gridTemplateColumns: `repeat(${kolom}, minmax(0, 1fr))`, maxWidth: 300 }}
        >
          {Array.from({ length: jumlah }, (_, i) => (
            <span
              key={i}
              className={`flex aspect-square items-center justify-center rounded-2xl border-4 ${
                i < hitung ? "border-[#1C01A5] bg-[#EFF6FF]" : "border-dashed border-[#93C5FD] bg-white"
              }`}
            >
              {i < hitung ? (
                <span className="igil-muncul">
                  <IkonMainan jenis={jenis} besar kelas="h-14 w-14" />
                </span>
              ) : (
                <span className="text-3xl font-black text-[#93C5FD]">+</span>
              )}
            </span>
          ))}
        </span>
        <Letusan id={letusan.id} />
      </button>
      <JawabSuara id={id} jumlah={jumlah} panel={panel} siap={penuh} belumSiap="Isi semua kotak sampai penuh dulu, ya." />
      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

const WARNA_PASANG = [MERAH_MUDA, EMAS_TUA, HIJAU, "#60A5FA"];

function LangkahPasang({ speakGuru, lanjut, nomor }: PropsLangkah) {
  const KURSI = 6;
  const BALON = 4;
  const [pilihKursi, setPilihKursi] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<{ k: number; b: number }[]>([]);
  const [sisa, setSisa] = useState<number[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const letusan = useLetusan();
  const kursiTerpasang = pasangan.map((p) => p.k);
  const balonTerpasang = pasangan.map((p) => p.b);
  const fase = balonTerpasang.length >= BALON ? (sisa.length >= KURSI - BALON ? "selesai" : "sisa") : "pasang";

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
    setPilihKursi(k);
    setKabar(null);
  };
  const ketukBalon = (b: number) => {
    if (fase !== "pasang") return;
    if (balonTerpasang.includes(b)) return;
    if (pilihKursi === null) {
      setKabar({ teks: "Ketuk satu kursi dulu.", ok: false });
      return;
    }
    const baru = [...pasangan, { k: pilihKursi, b }];
    setPasangan(baru);
    setPilihKursi(null);
    setKabar(
      baru.length >= BALON ? { teks: "Balonnya habis! Sekarang cari kursi yang sendirian.", ok: true } : null
    );
  };

  const hint =
    fase === "pasang"
      ? "Ketuk satu kursi, lalu satu balon. Mereka jadi sepasang!"
      : fase === "sisa"
        ? "Balonnya habis. Siapa kursi yang tidak punya pasangan? Ketuk dia!"
        : "Hore! Semua sudah ketemu.";

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Memasangkan" onSuara={() => speakGuru(SUARA_PASANG)} warna="#FBCFE8" />
      <BuayaBicara teks={hint} />
      <div className={`relative space-y-3 p-3 ${STIKER}`}>
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: KURSI }, (_, k) => {
            const idx = kursiTerpasang.indexOf(k);
            const warna = idx >= 0 ? WARNA_PASANG[idx] : sisa.includes(k) ? EMAS_TUA : null;
            const sendiri = fase === "sisa" && idx < 0 && !sisa.includes(k);
            return (
              <button
                key={k}
                type="button"
                aria-label={`Kursi ${k + 1}`}
                onClick={() => ketukKursi(k)}
                className={`relative flex h-16 w-full items-center justify-center rounded-2xl border-4 bg-white ${
                  pilihKursi === k ? "igil-lompat bg-[#FFF7CC]" : ""
                } ${sendiri ? "igil-goyang" : ""}`}
                style={{ borderColor: warna ?? (pilihKursi === k ? EMAS_TUA : "#93C5FD") }}
              >
                <IkonMainan jenis="kursi" kelas="h-10 w-10 shrink-0" />
                {idx >= 0 ? (
                  <span
                    className="absolute -right-1.5 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-black text-white"
                    style={{ backgroundColor: warna ?? BIRU }}
                  >
                    {idx + 1}
                  </span>
                ) : null}
                {sisa.includes(k) ? <span className="absolute -bottom-3 text-lg">😮</span> : null}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: BALON }, (_, b) => {
            const idx = balonTerpasang.indexOf(b);
            return (
              <button
                key={b}
                type="button"
                aria-label={`Balon ${b + 1}`}
                onClick={() => ketukBalon(b)}
                className={`relative flex h-16 w-full items-center justify-center rounded-2xl border-4 bg-white ${
                  idx < 0 && pilihKursi !== null ? "igil-lompat" : ""
                }`}
                style={{ borderColor: idx >= 0 ? WARNA_PASANG[idx] : "#93C5FD" }}
              >
                <IkonMainan jenis="balon" kelas="h-10 w-10 shrink-0" />
                {idx >= 0 ? (
                  <span
                    className="absolute -right-1.5 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-black text-white"
                    style={{ backgroundColor: WARNA_PASANG[idx] }}
                  >
                    {idx + 1}
                  </span>
                ) : null}
              </button>
            );
          })}
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
              : "border-[#1C01A5] bg-white shadow-[0_4px_0_rgba(28,1,165,0.22)]"
        }`}
      >
        <span className="rounded-full bg-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#FFE566]">
          {NAMA[kelompok.jenis]}
        </span>
        <KelompokBenda jenis={kelompok.jenis} jumlah={kelompok.jumlah} />
      </button>
    );
  };

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Membandingkan" onSuara={() => speakGuru(SUARA_BANDING)} warna="#FDE68A" />
      <BuayaBicara teks={`Putaran ${putaran + 1} dari ${PUTARAN_BANDING.length}. ${data.perintah}`} />
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
  const [pilih, setPilih] = useState<string[]>([]);
  const [kabar, setKabar] = useState<Kabar>(null);
  const [keliru, setKeliru] = useState<string | null>(null);
  const letusan = useLetusan();
  const selesai = pilih.length >= terurut.length;
  const ketuk = (id: string) => {
    if (selesai || pilih.includes(id)) return;
    if (terurut[pilih.length].id === id) {
      const baru = [...pilih, id];
      setPilih(baru);
      setKeliru(null);
      if (baru.length >= terurut.length) {
        setKabar({ teks: "Urutannya pas. Dari sedikit ke banyak.", ok: true });
        letusan.picu();
      } else {
        setKabar({ teks: "Benar. Lanjut ke kelompok berikutnya.", ok: true });
      }
    } else {
      setKeliru(id);
      setKabar({ teks: "Belum. Cari kelompok yang lebih sedikit.", ok: false });
    }
  };
  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Mengurutkan" onSuara={() => speakGuru(SUARA_URUT)} warna="#BBF7D0" />
      <BuayaBicara teks="Ketuk dari kelompok yang paling sedikit. Nomor 1, 2, 3, 4!" />
      <div className="relative grid grid-cols-2 gap-3">
        {KELOMPOK_URUT.map((k) => {
          const nomorUrut = pilih.indexOf(k.id);
          return (
            <button
              key={k.id}
              type="button"
              aria-label={`Kelompok ${NAMA[k.jenis]}`}
              onClick={() => ketuk(k.id)}
              className={`relative flex min-w-0 flex-col items-center gap-2 rounded-3xl border-4 px-2 py-3 ${
                nomorUrut >= 0
                  ? "igil-muncul border-[#7FCB96] bg-[#E8F7EE]"
                  : keliru === k.id
                    ? "igil-goyang border-[#E98989] bg-[#FDECEC]"
                    : "border-[#1C01A5] bg-white shadow-[0_4px_0_rgba(28,1,165,0.22)]"
              }`}
            >
              <span className="rounded-full bg-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#FFE566]">
                {NAMA[k.jenis]}
              </span>
              <KelompokBenda jenis={k.jenis} jumlah={k.jumlah} />
              {nomorUrut >= 0 ? (
                <span className="absolute -right-2 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#1C01A5] text-lg font-black text-[#FFE566]">
                  {nomorUrut + 1}
                </span>
              ) : null}
            </button>
          );
        })}
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
    <div className="flex min-w-0 flex-col items-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]">
      <span className="rounded-full bg-[#1C01A5] px-4 py-0.5 text-sm font-black text-[#FFE566]">{nama}</span>
      <KelompokBenda jenis="layangan" jumlah={jumlah} baruDari={baruDari} />
    </div>
  );

  return (
    <>
      <JudulGame nomor={nomor} total={JUMLAH_KEGIATAN} judul="Cerita" onSuara={() => speakGuru(SUARA_CERITA)} warna="#E9D5FF" />
      <BuayaBicara
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
              <p className="text-center text-base font-black text-[#1C01A5]">Siapa yang punya lebih banyak?</p>
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
      <BuayaBicara teks="Lihat dua kelompok. Tulis jumlah yang lebih banyak, ya!" />
      <div className="grid grid-cols-2 gap-2">
        {[
          { jenis: "balon", jumlah: 7 },
          { jenis: "buku", jumlah: 4 },
        ].map((k) => (
          <div
            key={k.jenis}
            className="flex min-w-0 flex-col items-center gap-2 rounded-3xl border-4 border-[#1C01A5] bg-white px-2 py-3 shadow-[0_4px_0_rgba(28,1,165,0.22)]"
          >
            <span className="rounded-full bg-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#FFE566]">{NAMA[k.jenis]}</span>
            <KelompokBenda jenis={k.jenis} jumlah={k.jumlah} />
          </div>
        ))}
      </div>
      <p className="text-center text-base font-black text-[#1C01A5]">Tulis jumlah kelompok yang lebih banyak.</p>
      <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
        <div className="text-sm font-black text-[#1C01A5]">✏️ Tulis angka di atas, kata di bawah</div>
        <DottedNumberTracingCanvas key="b-tulis" digit={7} kata={kata(7)} onCompletedTrace={() => setLulus(true)} />
        <KabarChip kabar={lulus ? { teks: "Tulisanmu pas.", ok: true } : null} />
        {lulus ? null : <p className="text-xs font-bold text-[#1C01A5]">Ikuti titik sampai mirip.</p>}
      </div>
      <TombolLanjut teks="LANJUTKAN KE PICTORIAL ⬇️" onClick={lanjut} />
    </>
  );
}

export function ConcreteBandingB({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
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
    <div
      className="space-y-3 rounded-[2rem] border-4 border-[#3B82F6] bg-[#EFF6FF] p-3"
      style={POLA_TITIK("#BFDBFE")}
    >
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
    </div>
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
    hasil: "Baris atas punya sisa. Baris atas lebih banyak.",
    suara: "Bangun dua baris. Lihat garis pasangannya. Lalu ucapkan jumlah baris yang lebih banyak.",
    bantuan: "Ketuk baris atas dan baris bawah sampai petaknya pas. Lihat petak yang tidak punya pasangan.",
  },
  {
    id: "b-gambar-p2",
    bentuk: "batang",
    judul: "Batang Panjang dan Pendek",
    atas: { nama: "Buku", jumlah: 9 },
    bawah: { nama: "Bola", jumlah: 6 },
    kunci: 6,
    tugas: "Ucapkan jumlah batang yang lebih pendek.",
    hasil: "Batang buku lebih panjang. Buku lebih banyak dari bola.",
    suara: "Bangun dua batang. Lihat mana yang lebih pendek. Lalu ucapkan jumlah batang yang pendek.",
    bantuan: "Ketuk dua batang sampai pas. Batang yang lebih pendek berarti lebih sedikit.",
  },
  {
    id: "b-gambar-p3",
    bentuk: "bingkai",
    judul: "Dua Bingkai Sama",
    atas: { nama: "Layangan", jumlah: 8 },
    bawah: { nama: "Kelereng", jumlah: 8 },
    kunci: 8,
    tugas: "Ucapkan jumlah di salah satu bingkai.",
    hasil: "Tidak ada petak sisa. Sama banyak.",
    suara: "Isi dua bingkai. Lalu ucapkan jumlah di salah satu bingkai, dan tulis.",
    bantuan: "Isi dua bingkai sampai penuh. Lihat apakah ada petak sisa.",
  },
  {
    id: "b-gambar-p4",
    bentuk: "garis",
    judul: "Garis Bilangan",
    atas: { nama: "Katak biru", jumlah: 3 },
    bawah: { nama: "Katak jingga", jumlah: 7 },
    kunci: 7,
    tugas: "Ucapkan bilangan katak yang lebih jauh ke kanan.",
    hasil: "Katak jingga lebih jauh ke kanan. Jumlahnya lebih banyak.",
    catatan: "Ke kanan berarti lebih banyak. Ke kiri berarti lebih sedikit.",
    suara:
      "Dua katak melompat di garis bilangan. Lihat siapa yang berhenti lebih jauh ke kanan. Lalu ucapkan bilangannya.",
    bantuan: "Ketuk katak sampai berhenti. Lihat siapa yang lebih jauh ke kanan.",
  },
];

function Petak({ baris, terisi }: { baris: "atas" | "bawah"; terisi: boolean }) {
  return terisi ? (
    <span className="block w-full">
      <PetakWajah baris={baris} />
    </span>
  ) : (
    <span className="block aspect-square w-full rounded-xl border-4 border-dashed border-[#F0AB00] bg-white" />
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
      <BuayaBicara teks={hint} />

      <div className={`relative p-3 ${STIKER}`}>
        {kartu.bentuk === "pasangan" ? (
          <div className="space-y-1">
            <button
              type="button"
              aria-label={`Baris atas ${kartu.atas.nama}`}
              onClick={tambahAtas}
              className="igil-tanpa-tepi block w-full space-y-1 text-left"
            >
              <span className="inline-block rounded-full bg-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#FFE566]">
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
              <span className="inline-block rounded-full bg-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#FFE566]">
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
                <span className="inline-block rounded-full bg-[#1C01A5] px-3 py-0.5 text-xs font-black text-[#FFE566]">
                  Batang {b.data.nama}
                </span>
                <span className="flex gap-1">
                  {Array.from({ length: b.data.jumlah }, (_, i) =>
                    i < b.h ? (
                      <span key={i} className="block w-8 shrink-0">
                        <PetakWajah baris={b.sisi} />
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
                className="space-y-1 rounded-2xl border-4 border-[#F0AB00] bg-[#FFFBEB] p-2 text-left"
              >
                <span className="block rounded-full bg-[#1C01A5] px-2 py-0.5 text-center text-xs font-black text-[#FFE566]">
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
                🐸 Ketuk katak biru
              </button>
              <button
                type="button"
                onClick={tambahBawah}
                className={`rounded-2xl border-4 border-[#1C01A5] bg-[#FDBA74] px-2 py-3 text-sm font-black text-[#1C01A5] shadow-[0_4px_0_rgba(28,1,165,0.25)] ${
                  hBawah < kapBawah ? "igil-lompat" : ""
                }`}
              >
                🐸 Ketuk katak jingga
              </button>
            </div>
          </div>
        ) : null}
        <Letusan id={letusan.id} />
      </div>

      <p className="text-center text-base font-black text-[#1C01A5]">{kartu.tugas}</p>
      <JawabSuara id={kartu.id} jumlah={kartu.kunci} panel={panel} siap={penuh} belumSiap="Bangun diagramnya dulu, ya." />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <p className="text-base font-black leading-snug text-[#1C01A5]">🌟 {kartu.hasil}</p>
          <TandaBuaya kiri={kartu.atas.jumlah} kanan={kartu.bawah.jumlah} />
          {kartu.catatan ? <p className="text-sm font-black text-[#92400E]">{kartu.catatan}</p> : null}
        </div>
      ) : null}

      {kartu.bentuk === "bingkai" ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-sm font-black text-[#1C01A5]">✏️ Tulis angka di atas, kata di bawah</div>
          <DottedNumberTracingCanvas
            key={`gambar-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? { teks: "Tulisanmu pas.", ok: true } : null} />
          {lulus ? null : <p className="text-xs font-bold text-[#1C01A5]">Ikuti titik sampai mirip.</p>}
        </div>
      ) : null}

      <TombolLanjut teks={terakhir ? "LANJUTKAN KE ABSTRACT ⬇️" : "LANJUTKAN ⬇️"} onClick={lanjut} />
    </>
  );
}

export function PictureBandingB({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
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
    <div
      className="space-y-3 rounded-[2rem] border-4 border-[#F59E0B] bg-[#FFFBEB] p-3"
      style={POLA_TITIK("#FDE68A")}
    >
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
    </div>
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
  tulis: boolean;
};

const KARTU_LAMBANG_B: KartuLambang[] = [
  {
    id: "b-lambang-l1",
    kiri: 9,
    kanan: 6,
    tugas: "Ucapkan bilangan yang lebih banyak.",
    kunciSuara: 9,
    bantuan: "Pilih tandanya. Mulut buaya menghadap bilangan yang lebih banyak. Lalu ucapkan sekali.",
    suara:
      "Lihat dua bilangan. Pilih tandanya. Ingat, mulut buaya menghadap yang lebih banyak. Lalu ucapkan bilangan yang lebih banyak.",
    salahTanda: "Belum. Mulut buaya menghadap bilangan yang lebih banyak.",
    kalimat: "Sembilan lebih banyak dari enam. Enam lebih sedikit dari sembilan.",
    tulis: false,
  },
  {
    id: "b-lambang-l2",
    kiri: 4,
    kanan: 8,
    tugas: "Ucapkan bilangan yang lebih sedikit.",
    kunciSuara: 4,
    bantuan: "Pilih tandanya. Mulut buaya menghadap bilangan yang lebih banyak. Lalu ucapkan sekali.",
    suara: "Lihat dua bilangan. Pilih tandanya. Lalu ucapkan bilangan yang lebih sedikit.",
    salahTanda: "Belum. Mulut buaya menghadap bilangan yang lebih banyak.",
    kalimat: "Empat lebih sedikit dari delapan. Delapan lebih banyak dari empat.",
    tulis: false,
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
    tulis: true,
  },
];

const PILIHAN_TANDA: { tanda: string; arah: ArahBuaya; nama: string }[] = [
  { tanda: ">", arah: "kiri", nama: "lebih banyak dari" },
  { tanda: "<", arah: "kanan", nama: "lebih sedikit dari" },
  { tanda: "=", arah: "tutup", nama: "sama dengan" },
];

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
      <BuayaBicara teks={suara ? "Hebat! Kamu pintar sekali." : kartu.bantuan} />

      <div className={`relative flex items-center justify-center gap-3 py-5 ${STIKER}`}>
        <span className="flex h-24 w-20 items-center justify-center rounded-3xl bg-[#EFF6FF] text-7xl font-black leading-none text-[#1C01A5]">
          {kartu.kiri}
        </span>
        <span
          key={pilih ?? "kosong"}
          className={`flex h-20 w-20 items-center justify-center rounded-3xl border-4 text-5xl font-black ${
            pilih === null
              ? "border-dashed border-[#1C01A5] bg-white text-[#1C01A5]/30"
              : benar
                ? "igil-muncul border-solid border-[#7FCB96] bg-[#E8F7EE] text-[#166534]"
                : "igil-goyang border-solid border-[#E98989] bg-[#FDECEC] text-[#991B1B]"
          }`}
          aria-label="Kotak tanda"
        >
          {pilih ?? "?"}
        </span>
        <span className="flex h-24 w-20 items-center justify-center rounded-3xl bg-[#EFF6FF] text-7xl font-black leading-none text-[#1C01A5]">
          {kartu.kanan}
        </span>
        <Letusan id={letusan.id} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PILIHAN_TANDA.map((p) => (
          <button
            key={p.tanda}
            type="button"
            aria-label={`Tanda ${p.nama}`}
            onClick={() => ketukTanda(p.tanda)}
            className="flex flex-col items-center gap-1 rounded-3xl border-4 border-[#1C01A5] bg-[#FFE566] px-2 py-2 shadow-[0_5px_0_rgba(28,1,165,0.3)]"
          >
            <span className="text-4xl font-black leading-none text-[#1C01A5]">{p.tanda}</span>
            <MulutBuaya arah={p.arah} kelas="h-9 w-[4.5rem]" />
          </button>
        ))}
      </div>

      <KabarChip kabar={kabar} />

      <p className="text-center text-base font-black text-[#1C01A5]">{kartu.tugas}</p>
      <JawabSuara
        id={kartu.id}
        jumlah={kartu.kunciSuara}
        panel={panel}
        siap={benar}
        belumSiap="Pilih tandanya dulu, ya."
      />

      {suara ? (
        <div className="igil-muncul space-y-2 rounded-3xl border-4 border-[#7FCB96] bg-[#E8F7EE] p-3 text-center">
          <TandaBuaya kiri={kartu.kiri} kanan={kartu.kanan} />
          <p className="text-base font-black leading-snug text-[#1C01A5]">🌟 {kartu.kalimat}</p>
        </div>
      ) : null}

      {suara && kartu.tulis ? (
        <div className={`flex flex-col items-center gap-2 p-3 ${STIKER}`}>
          <div className="text-sm font-black text-[#1C01A5]">✏️ Tulis lambang di atas, kata di bawah</div>
          <DottedNumberTracingCanvas
            key={`lambang-${kartu.id}`}
            digit={kartu.kunciSuara}
            kata={kata(kartu.kunciSuara)}
            onCompletedTrace={() => setLulus(true)}
          />
          <KabarChip kabar={lulus ? { teks: "Lambangmu sudah pas.", ok: true } : null} />
          {lulus ? null : <p className="text-xs font-bold text-[#1C01A5]">Ikuti titik lambangnya.</p>}
        </div>
      ) : null}

      <TombolLanjut teks="LANJUTKAN ⬇️" onClick={lanjut} />
    </>
  );
}

export function AbstractBandingB({ speakGuru, panel, hentikan, gulir, onSelesai }: Umum) {
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
    <div
      className="space-y-3 rounded-[2rem] border-4 border-[#1C01A5] bg-slate-50 p-3"
      style={POLA_TITIK("#C7D2FE")}
    >
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
    </div>
  );
}
