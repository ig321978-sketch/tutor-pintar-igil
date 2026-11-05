"use client";

import React, { useCallback, useRef, useState } from "react";
import { IkonMainan } from "./ikon-mainan";
import { GarisBilanganKatak, MulutBuaya, type ArahBuaya } from "./gambar-banding-b";
import {
  DottedNumberTracingCanvas,
  KepalaConcrete,
  RakBendaNyata,
  SEBUTAN_ANGKA,
  TombolJawabanSuara,
  TombolLanjutConcrete,
} from "./elemen-kelas1";

/* ------------------------------------------------------------------------ */
/* Sub-Bab B: Membandingkan Banyak Benda. Semua di klien, tanpa API.          */
/* Naskah: naskah/mtk-1-bab1-sub-b-membandingkan.md                           */
/* ------------------------------------------------------------------------ */

export type PanelSuara = {
  sedang: boolean;
  pesan: string;
  suara: Record<string, boolean>;
  mulai: (id: string, jumlah: number) => void;
  bersih: () => void;
};

type Umum = {
  speakGuru: (teks: string) => void;
  panel: PanelSuara;
  hentikan: () => void;
  gulir: () => void;
  onSelesai: () => void;
};

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

function TandaBuaya({ kiri, kanan }: { kiri: number; kanan: number }) {
  const { tanda, arah } = hubungan(kiri, kanan);
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-3 leading-none">
        <span className="text-4xl font-black text-[#1C01A5]">{kiri}</span>
        <span className="rounded-xl bg-[#1C01A5] px-3 py-1 text-3xl font-black text-[#FFE566]">{tanda}</span>
        <span className="text-4xl font-black text-[#1C01A5]">{kanan}</span>
      </div>
      <MulutBuaya arah={arah} kelas="h-11 w-24" />
    </div>
  );
}

function KelompokBenda({ jenis, jumlah }: { jenis: string; jumlah: number }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {Array.from({ length: jumlah }, (_, i) => (
        <IkonMainan key={i} jenis={jenis} kelas="h-8 w-8 shrink-0" />
      ))}
    </div>
  );
}

function Pesan({ teks }: { teks: string }) {
  return teks ? <p className="text-center text-xs font-bold text-[#1C01A5]">{teks}</p> : null;
}

function Bantuan({ teks, warna }: { teks: string; warna: string }) {
  return (
    <p className="text-xs font-bold" style={{ color: warna }}>
      {teks}
    </p>
  );
}

function KepalaKartu({
  judul,
  onSuara,
  garis,
  warnaTeks,
}: {
  judul: string;
  onSuara: () => void;
  garis: string;
  warnaTeks: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">{judul}</h3>
      <button
        type="button"
        onClick={onSuara}
        className="shrink-0 rounded-xl border bg-white px-3 py-1 text-xs font-black"
        style={{ borderColor: garis, color: warnaTeks }}
      >
        🔊 Suara Guru
      </button>
    </div>
  );
}

function TombolLanjut({ teks, onClick }: { teks: string; onClick: () => void }) {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClick}
        className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-6 py-2.5 text-xs font-black text-[#FFE566] shadow-md"
      >
        {teks}
      </button>
    </div>
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
  const [lokal, setLokal] = useState("");
  const sudah = panel.suara[id] === true;
  return (
    <>
      <TombolJawabanSuara
        sudah={sudah}
        jumlah={jumlah}
        kata={kata(jumlah)}
        sedang={panel.sedang}
        pesan={panel.pesan}
        onTekan={() => {
          if (!siap) {
            setLokal(belumSiap);
            return;
          }
          setLokal("");
          panel.mulai(id, jumlah);
        }}
      />
      {sudah ? null : <Pesan teks={panel.sedang ? "" : lokal || panel.pesan} />}
    </>
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

  const sel = (kunci: string, jenis: string, target: number) => {
    const n = angka[kunci] ?? 0;
    const buka = n > 0;
    return (
      <div className="flex min-w-0 flex-col gap-2">
        <button
          type="button"
          aria-label={`${NAMA[jenis]} ${buka ? n : ""}`}
          aria-pressed={buka}
          onClick={() => ketuk(kunci, target)}
          className={`flex min-w-0 items-center gap-2 rounded-2xl border-2 bg-white px-2 py-2 text-left ${
            buka ? "border-[#1C01A5]" : "border-[#86EFAC]"
          }`}
        >
          <IkonMainan jenis={jenis} />
          <span className="min-w-0 text-[11px] font-black leading-tight text-[#1C01A5]">{NAMA[jenis]}</span>
        </button>
        <div
          className={`flex min-h-14 flex-col items-center justify-center rounded-2xl border-2 bg-white py-1 ${
            buka ? "border-solid border-[#1C01A5]" : "border-dashed border-[#86EFAC]"
          }`}
        >
          {buka ? (
            <>
              <span className="text-3xl font-black leading-none text-[#1C01A5]">{n}</span>
              <span className="text-sm font-black leading-tight text-[#1C01A5]">{kata(n)}</span>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3 rounded-3xl border-2 border-[#22C55E] bg-[#F0FDF4] p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="min-w-0 text-base font-black leading-snug text-[#1C01A5]">Dua Kelompok dan Hasilnya</h3>
        <button
          type="button"
          onClick={() => speakGuru(SUARA_INFO)}
          className="shrink-0 rounded-xl border border-[#22C55E] bg-white px-3 py-1 text-xs font-black text-[#166534]"
        >
          🔊 Suara Guru
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-center text-xs font-black tracking-wide text-[#166534]">KELOMPOK KIRI</div>
        <div className="text-center text-xs font-black tracking-wide text-[#166534]">KELOMPOK KANAN</div>
      </div>
      <div className="flex flex-col gap-3">
        {BARIS_INFO.map((b, i) => {
          const kk = `${i}k`;
          const kr = `${i}r`;
          const penuh = (angka[kk] ?? 0) >= b.kiri.jumlah && (angka[kr] ?? 0) >= b.kanan.jumlah;
          return (
            <div key={i} className="space-y-2 rounded-2xl border border-[#BBF7D0] bg-[#F7FEF9] p-2">
              <div className="grid grid-cols-2 gap-2">
                {sel(kk, b.kiri.jenis, b.kiri.jumlah)}
                {sel(kr, b.kanan.jenis, b.kanan.jumlah)}
              </div>
              <div
                className={`flex min-h-24 flex-col items-center justify-center gap-1 rounded-2xl border-2 bg-white px-2 py-2 text-center ${
                  penuh ? "border-solid border-[#1C01A5]" : "border-dashed border-[#86EFAC]"
                }`}
              >
                <span className="text-[10px] font-black tracking-wide text-[#166534]">HASIL</span>
                {penuh ? (
                  <>
                    <span className="text-sm font-black leading-snug text-[#1C01A5]">
                      {kalimatHubungan(NAMA[b.kiri.jenis], NAMA[b.kanan.jenis], b.kiri.jumlah, b.kanan.jumlah)}
                    </span>
                    <TandaBuaya kiri={b.kiri.jumlah} kanan={b.kanan.jumlah} />
                  </>
                ) : null}
              </div>
            </div>
          );
        })}
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
const BIRU_GARIS = "#93C5FD";

const SUARA_BILANG = "Hitung bendanya satu per satu. Lalu ucapkan jumlahnya sekali saja.";
const SUARA_PASANG = "Satu kursi, satu balon. Pasangkan sampai ada yang habis. Lalu cari yang tidak punya pasangan.";
const SUARA_BANDING = "Lihat dua kelompok. Baca perintahnya, lalu ketuk jawabannya.";
const SUARA_URUT = "Susun kelompok dari yang paling sedikit sampai yang paling banyak.";
const SUARA_CERITA =
  "Kira punya layang-layang. Tika juga punya. Wei memberi lagi pada Kira. Hitung milik Kira, lalu bandingkan dengan Tika.";
const SUARA_TULIS = "Hitung kedua kelompok. Pilih yang lebih banyak, lalu tulis jumlahnya.";

function LangkahBilang({
  langkah,
  speakGuru,
  panel,
  lanjut,
}: {
  langkah: Langkah;
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const jenis = langkah.jenis ?? "kursi";
  const jumlah = langkah.jumlah ?? 1;
  const [hitung, setHitung] = useState(0);
  const hitungRef = useRef(0);
  const id = `b-bilang-${jenis}`;
  const suara = panel.suara[id] === true;
  const penuh = hitung >= jumlah;
  const ketuk = () => {
    if (hitungRef.current >= jumlah) return;
    hitungRef.current += 1;
    setHitung(hitungRef.current);
  };
  return (
    <>
      <KepalaConcrete judul="Membilang" onSuara={() => speakGuru(SUARA_BILANG)} />
      <Bantuan
        warna="#1E3A8A"
        teks={
          suara
            ? "Jumlahnya sudah diucapkan."
            : penuh
              ? "Tempatnya penuh. Hitung bendanya, lalu ucapkan sekali."
              : "Ketuk tempat kosong sampai penuh. Hitung bendanya, lalu ucapkan sekali."
        }
      />
      <button
        type="button"
        aria-label={penuh ? `${NAMA[jenis]} sudah penuh` : `Tambah ${NAMA[jenis]}`}
        aria-pressed={penuh}
        onClick={ketuk}
        className="w-full rounded-2xl border-2 bg-white px-3 py-3"
        style={{ borderColor: BIRU_GARIS }}
      >
        <RakBendaNyata jenis={jenis} terisi={hitung} kapasitas={jumlah} />
      </button>
      <JawabSuara
        id={id}
        jumlah={jumlah}
        panel={panel}
        siap={penuh}
        belumSiap="Isi tempatnya sampai penuh dulu."
      />
      <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
    </>
  );
}

function SelBenda({
  jenis,
  nomor,
  status,
  onKetuk,
  label,
}: {
  jenis: string;
  nomor?: number;
  status: "biasa" | "dipilih" | "pasang" | "sisa";
  onKetuk: () => void;
  label: string;
}) {
  const gaya =
    status === "pasang"
      ? "border-[#1C01A5] bg-[#DBEAFE]"
      : status === "dipilih"
        ? "border-[#F0AB00] bg-[#FFE566]"
        : status === "sisa"
          ? "border-[#F0AB00] bg-[#FFE566]"
          : "border-[#93C5FD] bg-white";
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onKetuk}
      className={`relative flex h-14 w-full items-center justify-center rounded-2xl border-2 ${gaya}`}
    >
      <IkonMainan jenis={jenis} kelas="h-9 w-9 shrink-0" />
      {nomor ? (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1C01A5] text-[10px] font-black text-[#FFE566]">
          {nomor}
        </span>
      ) : null}
    </button>
  );
}

function LangkahPasang({ speakGuru, lanjut }: { speakGuru: (t: string) => void; lanjut: () => void }) {
  const KURSI = 6;
  const BALON = 4;
  const [pilihKursi, setPilihKursi] = useState<number | null>(null);
  const [pasangan, setPasangan] = useState<{ k: number; b: number }[]>([]);
  const [sisa, setSisa] = useState<number[]>([]);
  const [pesan, setPesan] = useState("");
  const kursiTerpasang = pasangan.map((p) => p.k);
  const balonTerpasang = pasangan.map((p) => p.b);
  const fase = balonTerpasang.length >= BALON ? (sisa.length >= KURSI - BALON ? "selesai" : "sisa") : "pasang";

  const ketukKursi = (k: number) => {
    if (fase === "selesai") return;
    if (fase === "sisa") {
      if (kursiTerpasang.includes(k)) {
        setPesan("Belum. Cari benda yang tidak punya pasangan.");
        return;
      }
      if (sisa.includes(k)) return;
      const baru = [...sisa, k];
      setSisa(baru);
      setPesan(
        baru.length >= KURSI - BALON
          ? "Pas. Kursi yang tidak berpasangan masih ada. Jadi kursi lebih banyak."
          : "Betul, ini tidak punya pasangan. Masih ada satu lagi."
      );
      return;
    }
    if (kursiTerpasang.includes(k)) return;
    setPilihKursi(k);
    setPesan("");
  };
  const ketukBalon = (b: number) => {
    if (fase !== "pasang") return;
    if (balonTerpasang.includes(b)) return;
    if (pilihKursi === null) {
      setPesan("Ketuk satu kursi dulu.");
      return;
    }
    setPasangan((prev) => [...prev, { k: pilihKursi, b }]);
    setPilihKursi(null);
    setPesan("");
  };

  return (
    <>
      <KepalaConcrete judul="Memasangkan" onSuara={() => speakGuru(SUARA_PASANG)} />
      <Bantuan
        warna="#1E3A8A"
        teks="Pasangkan satu kursi dengan satu balon. Lalu ketuk benda yang tidak punya pasangan."
      />
      <div className="space-y-2 rounded-2xl border-2 bg-white p-2" style={{ borderColor: BIRU_GARIS }}>
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: KURSI }, (_, k) => {
            const nomor = kursiTerpasang.indexOf(k);
            const status = nomor >= 0 ? "pasang" : sisa.includes(k) ? "sisa" : pilihKursi === k ? "dipilih" : "biasa";
            return (
              <SelBenda
                key={k}
                jenis="kursi"
                nomor={nomor >= 0 ? nomor + 1 : undefined}
                status={status}
                label={`Kursi ${k + 1}`}
                onKetuk={() => ketukKursi(k)}
              />
            );
          })}
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {Array.from({ length: BALON }, (_, b) => {
            const nomor = balonTerpasang.indexOf(b);
            return (
              <SelBenda
                key={b}
                jenis="balon"
                nomor={nomor >= 0 ? nomor + 1 : undefined}
                status={nomor >= 0 ? "pasang" : "biasa"}
                label={`Balon ${b + 1}`}
                onKetuk={() => ketukBalon(b)}
              />
            );
          })}
        </div>
      </div>
      <Pesan teks={pesan} />
      <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
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

function LangkahBanding({ speakGuru, lanjut }: { speakGuru: (t: string) => void; lanjut: () => void }) {
  const [putaran, setPutaran] = useState(0);
  const [benar, setBenar] = useState(false);
  const [pesan, setPesan] = useState("");
  const data = PUTARAN_BANDING[putaran];
  const terakhir = putaran >= PUTARAN_BANDING.length - 1;

  const jawab = (pilihan: string) => {
    if (benar) return;
    if (pilihan === data.kunci) {
      setBenar(true);
      setPesan("Betul.");
    } else {
      setPesan("Coba lihat lagi pasangannya.");
    }
  };
  const lanjutPutaran = () => {
    setPesan("");
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
    return (
      <button
        type="button"
        aria-label={`Kelompok ${sisi}: ${NAMA[kelompok.jenis]}`}
        disabled={!bisaKetuk}
        onClick={() => jawab(sisi)}
        className={`flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 bg-white px-2 py-3 ${
          terpilih ? "border-[#1C01A5] bg-[#DBEAFE]" : "border-[#93C5FD]"
        }`}
      >
        <span className="text-[11px] font-black text-[#1C01A5]">{NAMA[kelompok.jenis]}</span>
        <KelompokBenda jenis={kelompok.jenis} jumlah={kelompok.jumlah} />
      </button>
    );
  };

  return (
    <>
      <KepalaConcrete judul="Membandingkan" onSuara={() => speakGuru(SUARA_BANDING)} />
      <Bantuan warna="#1E3A8A" teks={`Putaran ${putaran + 1} dari ${PUTARAN_BANDING.length}. ${data.perintah}`} />
      <div key={putaran} className="grid grid-cols-2 gap-2">
        {kotak("kiri", data.kiri)}
        {kotak("kanan", data.kanan)}
      </div>
      {data.kunci === "sama" ? (
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => jawab("sama")}
            className="rounded-2xl border-2 border-[#1C01A5] bg-white px-2 py-3 text-sm font-black text-[#1C01A5]"
          >
            Sama banyak
          </button>
          <button
            type="button"
            onClick={() => jawab("tidak")}
            className="rounded-2xl border-2 border-[#1C01A5] bg-white px-2 py-3 text-sm font-black text-[#1C01A5]"
          >
            Tidak sama banyak
          </button>
        </div>
      ) : null}
      <Pesan teks={pesan} />
      <TombolLanjutConcrete pictorial={false} onClick={lanjutPutaran} />
    </>
  );
}

const KELOMPOK_URUT = [
  { id: "balon", jenis: "balon", jumlah: 9 },
  { id: "kursi", jenis: "kursi", jumlah: 2 },
  { id: "buku", jenis: "buku", jumlah: 4 },
  { id: "bola", jenis: "bola", jumlah: 6 },
];

function LangkahUrut({ speakGuru, lanjut }: { speakGuru: (t: string) => void; lanjut: () => void }) {
  const terurut = [...KELOMPOK_URUT].sort((a, b) => a.jumlah - b.jumlah);
  const [pilih, setPilih] = useState<string[]>([]);
  const [pesan, setPesan] = useState("");
  const selesai = pilih.length >= terurut.length;
  const ketuk = (id: string) => {
    if (selesai || pilih.includes(id)) return;
    if (terurut[pilih.length].id === id) {
      const baru = [...pilih, id];
      setPilih(baru);
      setPesan(
        baru.length >= terurut.length ? "Urutannya pas. Dari sedikit ke banyak." : "Benar. Lanjut ke kelompok berikutnya."
      );
    } else {
      setPesan("Belum. Cari kelompok yang lebih sedikit.");
    }
  };
  return (
    <>
      <KepalaConcrete judul="Mengurutkan" onSuara={() => speakGuru(SUARA_URUT)} />
      <Bantuan warna="#1E3A8A" teks="Ketuk dari kelompok yang paling sedikit." />
      <div className="grid grid-cols-2 gap-2">
        {KELOMPOK_URUT.map((k) => {
          const nomor = pilih.indexOf(k.id);
          return (
            <button
              key={k.id}
              type="button"
              aria-label={`Kelompok ${NAMA[k.jenis]}`}
              onClick={() => ketuk(k.id)}
              className={`relative flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 px-2 py-3 ${
                nomor >= 0 ? "border-[#1C01A5] bg-[#DBEAFE]" : "border-[#93C5FD] bg-white"
              }`}
            >
              <span className="text-[11px] font-black text-[#1C01A5]">{NAMA[k.jenis]}</span>
              <KelompokBenda jenis={k.jenis} jumlah={k.jumlah} />
              {nomor >= 0 ? (
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#1C01A5] text-xs font-black text-[#FFE566]">
                  {nomor + 1}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <Pesan teks={pesan} />
      <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
    </>
  );
}

function LangkahCerita({
  speakGuru,
  panel,
  lanjut,
}: {
  speakGuru: (t: string) => void;
  panel: PanelSuara;
  lanjut: () => void;
}) {
  const [datang, setDatang] = useState(false);
  const [pilih, setPilih] = useState<"Kira" | "Tika" | null>(null);
  const [pesan, setPesan] = useState("");
  const suara = panel.suara["b-cerita"] === true;
  const benar = pilih === "Kira";
  const jumlahKira = datang ? 5 : 3;

  const kelompok = (nama: string, jumlah: number) => (
    <div className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 border-[#93C5FD] bg-white px-2 py-3">
      <span className="text-sm font-black text-[#1C01A5]">{nama}</span>
      <KelompokBenda jenis="layangan" jumlah={jumlah} />
    </div>
  );

  return (
    <>
      <KepalaConcrete judul="Cerita" onSuara={() => speakGuru(SUARA_CERITA)} />
      <p className="rounded-2xl bg-white px-3 py-2 text-sm font-bold leading-snug text-[#1C01A5]">
        Kira punya tiga layang-layang. Tika punya empat layang-layang. Lalu Wei memberi Kira dua layang-layang lagi.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {kelompok("Kira", jumlahKira)}
        {kelompok("Tika", 4)}
      </div>
      {!datang ? (
        <>
          <Bantuan warna="#1E3A8A" teks="Tekan tombol supaya Wei memberi layang-layang." />
          <button
            type="button"
            onClick={() => setDatang(true)}
            className="w-full rounded-2xl border-2 border-[#1C01A5] bg-white px-3 py-3 text-sm font-black text-[#1C01A5]"
          >
            Wei memberi layang-layang
          </button>
        </>
      ) : (
        <>
          <Bantuan warna="#1E3A8A" teks="Hitung layang-layang Kira, lalu ucapkan sekali." />
          <JawabSuara id="b-cerita" jumlah={5} panel={panel} />
          {suara ? (
            <>
              <Bantuan warna="#1E3A8A" teks="Siapa yang punya lebih banyak layang-layang?" />
              <div className="grid grid-cols-2 gap-2">
                {(["Kira", "Tika"] as const).map((nama) => (
                  <button
                    key={nama}
                    type="button"
                    onClick={() => {
                      if (benar) return;
                      setPilih(nama);
                      setPesan(
                        nama === "Kira"
                          ? "Betul. Kira punya lebih banyak dari Tika."
                          : "Hitung lagi layang-layang Kira. Bandingkan dengan Tika."
                      );
                    }}
                    className={`rounded-2xl border-2 px-3 py-3 text-sm font-black text-[#1C01A5] ${
                      pilih === nama && nama === "Kira" ? "border-[#1C01A5] bg-[#DBEAFE]" : "border-[#93C5FD] bg-white"
                    }`}
                  >
                    {nama}
                  </button>
                ))}
              </div>
              <Pesan teks={pesan} />
            </>
          ) : null}
        </>
      )}
      <TombolLanjutConcrete pictorial={false} onClick={lanjut} />
    </>
  );
}

function LangkahTulis({ speakGuru, lanjut }: { speakGuru: (t: string) => void; lanjut: () => void }) {
  const [lulus, setLulus] = useState(false);
  return (
    <>
      <KepalaConcrete judul="Menulis" onSuara={() => speakGuru(SUARA_TULIS)} />
      <Bantuan warna="#1E3A8A" teks="Lihat dua kelompok. Tulis jumlah yang lebih banyak." />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 border-[#93C5FD] bg-white px-2 py-3">
          <span className="text-[11px] font-black text-[#1C01A5]">Balon</span>
          <KelompokBenda jenis="balon" jumlah={7} />
        </div>
        <div className="flex min-w-0 flex-col items-center gap-2 rounded-2xl border-2 border-[#93C5FD] bg-white px-2 py-3">
          <span className="text-[11px] font-black text-[#1C01A5]">Buku</span>
          <KelompokBenda jenis="buku" jumlah={4} />
        </div>
      </div>
      <p className="text-center text-sm font-black text-[#1C01A5]">Tulis jumlah kelompok yang lebih banyak.</p>
      <div className="flex flex-col items-center gap-2 rounded-2xl border bg-white p-3" style={{ borderColor: BIRU_GARIS }}>
        <div className="text-xs font-black text-[#1E3A8A]">Tulis angka di atas, kata di bawah</div>
        <DottedNumberTracingCanvas key="b-tulis" digit={7} kata={kata(7)} onCompletedTrace={() => setLulus(true)} />
        <p className="text-xs font-bold text-[#1C01A5]">{lulus ? "Tulisanmu pas." : "Ikuti titik sampai mirip."}</p>
      </div>
      <TombolLanjutConcrete pictorial onClick={lanjut} />
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

  return (
    <div className="space-y-3 rounded-3xl border-2 border-[#3B82F6] bg-[#EFF6FF] p-4">
      <p className="text-xs font-bold text-[#1E3A8A]">
        Kegiatan {langkah.kegiatan} dari {JUMLAH_KEGIATAN}.
      </p>
      <div key={indeks} className="space-y-3">
        {langkah.tipe === "bilang" ? (
          <LangkahBilang langkah={langkah} speakGuru={speakGuru} panel={panel} lanjut={lanjut} />
        ) : null}
        {langkah.tipe === "pasang" ? <LangkahPasang speakGuru={speakGuru} lanjut={lanjut} /> : null}
        {langkah.tipe === "banding" ? <LangkahBanding speakGuru={speakGuru} lanjut={lanjut} /> : null}
        {langkah.tipe === "urut" ? <LangkahUrut speakGuru={speakGuru} lanjut={lanjut} /> : null}
        {langkah.tipe === "cerita" ? <LangkahCerita speakGuru={speakGuru} panel={panel} lanjut={lanjut} /> : null}
        {langkah.tipe === "tulis" ? <LangkahTulis speakGuru={speakGuru} lanjut={lanjut} /> : null}
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

function PetakIsi({ baris, terisi }: { baris: "atas" | "bawah"; terisi: boolean }) {
  if (!terisi) return <span className="aspect-square w-full rounded-lg border-2 border-dashed border-[#F0AB00] bg-white" />;
  return baris === "atas" ? (
    <span className="aspect-square w-full rounded-lg border-2 border-[#1C01A5] bg-[#93C5FD]" />
  ) : (
    <span className="aspect-square w-full rounded-full border-2 border-[#F0AB00] bg-[#FDE68A]" />
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
  const suara = panel.suara[kartu.id] === true;
  const penuh = hAtas >= kapAtas && hBawah >= kapBawah;
  const terakhir = indeks >= total - 1;

  const tambahAtas = () => {
    if (refAtas.current >= kapAtas) return;
    refAtas.current += 1;
    setHAtas(refAtas.current);
  };
  const tambahBawah = () => {
    if (refBawah.current >= kapBawah) return;
    refBawah.current += 1;
    setHBawah(refBawah.current);
  };

  const kolomPasangan = Math.max(kartu.atas.jumlah, kartu.bawah.jumlah);
  const gayaKolom = { gridTemplateColumns: `repeat(${kolomPasangan}, minmax(0, 1fr))` };

  return (
    <>
      <KepalaKartu judul={kartu.judul} onSuara={() => speakGuru(kartu.suara)} garis="#F59E0B" warnaTeks="#92400E" />
      <Bantuan
        warna="#92400E"
        teks={`Diagram ${indeks + 1} dari ${total}. ${
          suara ? "Jumlahnya sudah diucapkan." : kartu.bantuan
        }`}
      />

      {kartu.bentuk === "pasangan" ? (
        <div className="space-y-1 rounded-2xl border-2 border-[#F0AB00] bg-white p-2">
          <button
            type="button"
            aria-label={`Baris atas ${kartu.atas.nama}`}
            onClick={tambahAtas}
            className="block w-full space-y-1 text-left"
          >
            <span className="text-[11px] font-black text-[#1C01A5]">{kartu.atas.nama}</span>
            <span className="grid gap-1.5" style={gayaKolom}>
              {Array.from({ length: kartu.atas.jumlah }, (_, i) => (
                <PetakIsi key={i} baris="atas" terisi={i < hAtas} />
              ))}
            </span>
          </button>
          <div className="grid h-5 gap-1.5" style={gayaKolom}>
            {Array.from({ length: kolomPasangan }, (_, i) => (
              <span key={i} className="flex justify-center">
                {penuh && i < Math.min(kartu.atas.jumlah, kartu.bawah.jumlah) ? (
                  <span className="h-full w-0.5 bg-[#1C01A5]" />
                ) : penuh && i >= kartu.bawah.jumlah ? (
                  <span className="mt-1 h-3 w-3 rounded-full bg-[#F0AB00]" />
                ) : null}
              </span>
            ))}
          </div>
          <button
            type="button"
            aria-label={`Baris bawah ${kartu.bawah.nama}`}
            onClick={tambahBawah}
            className="block w-full space-y-1 text-left"
          >
            <span className="text-[11px] font-black text-[#1C01A5]">{kartu.bawah.nama}</span>
            <span className="grid gap-1.5" style={gayaKolom}>
              {Array.from({ length: kartu.bawah.jumlah }, (_, i) => (
                <PetakIsi key={i} baris="bawah" terisi={i < hBawah} />
              ))}
            </span>
          </button>
        </div>
      ) : null}

      {kartu.bentuk === "batang" ? (
        <div className="space-y-2 rounded-2xl border-2 border-[#F0AB00] bg-white p-2">
          {[
            { sisi: "atas" as const, data: kartu.atas, h: hAtas, ketuk: tambahAtas },
            { sisi: "bawah" as const, data: kartu.bawah, h: hBawah, ketuk: tambahBawah },
          ].map((b) => (
            <button
              key={b.sisi}
              type="button"
              aria-label={`Batang ${b.data.nama}`}
              onClick={b.ketuk}
              className="block w-full space-y-1 text-left"
            >
              <span className="text-[11px] font-black text-[#1C01A5]">Batang {b.data.nama}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: b.data.jumlah }, (_, i) => (
                  <span
                    key={i}
                    className={`h-8 w-7 shrink-0 rounded-md border-2 ${
                      i < b.h
                        ? b.sisi === "atas"
                          ? "border-[#1C01A5] bg-[#93C5FD]"
                          : "border-[#F0AB00] bg-[#FDE68A]"
                        : "border-dashed border-[#F0AB00] bg-white"
                    }`}
                  />
                ))}
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
              className="space-y-1 rounded-2xl border-2 border-[#F0AB00] bg-white p-2 text-left"
            >
              <span className="block text-[11px] font-black text-[#1C01A5]">Bingkai {b.data.nama}</span>
              <span className="grid grid-cols-4 gap-1">
                {Array.from({ length: b.data.jumlah }, (_, i) => (
                  <PetakIsi key={i} baris={b.sisi} terisi={i < b.h} />
                ))}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {kartu.bentuk === "garis" ? (
        <div className="space-y-2 rounded-2xl border-2 border-[#F0AB00] bg-white p-2">
          <GarisBilanganKatak posisiBiru={1 + hAtas} posisiJingga={1 + hBawah} />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={tambahAtas}
              className="rounded-xl border-2 border-[#1C01A5] bg-[#93C5FD] px-2 py-2 text-xs font-black text-[#1C01A5]"
            >
              Ketuk katak biru
            </button>
            <button
              type="button"
              onClick={tambahBawah}
              className="rounded-xl border-2 border-[#1C01A5] bg-[#FDBA74] px-2 py-2 text-xs font-black text-[#1C01A5]"
            >
              Ketuk katak jingga
            </button>
          </div>
        </div>
      ) : null}

      <p className="text-center text-sm font-black text-[#1C01A5]">{kartu.tugas}</p>
      <JawabSuara
        id={kartu.id}
        jumlah={kartu.kunci}
        panel={panel}
        siap={penuh}
        belumSiap="Bangun diagramnya dulu."
      />

      {suara ? (
        <div className="space-y-2 rounded-2xl border-2 border-[#1C01A5] bg-white p-3 text-center">
          <p className="text-sm font-black leading-snug text-[#1C01A5]">{kartu.hasil}</p>
          <TandaBuaya kiri={kartu.atas.jumlah} kanan={kartu.bawah.jumlah} />
          {kartu.catatan ? <p className="text-xs font-bold text-[#92400E]">{kartu.catatan}</p> : null}
        </div>
      ) : null}

      {kartu.bentuk === "bingkai" ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#F0AB00] bg-white p-3">
          <div className="text-xs font-black text-[#92400E]">Tulis angka di atas, kata di bawah</div>
          <DottedNumberTracingCanvas
            key={`gambar-${kartu.id}`}
            digit={kartu.kunci}
            kata={kata(kartu.kunci)}
            onCompletedTrace={() => setLulus(true)}
          />
          <p className="text-xs font-bold text-[#1C01A5]">{lulus ? "Tulisanmu pas." : "Ikuti titik sampai mirip."}</p>
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
    <div className="space-y-3 rounded-3xl border-2 border-[#F59E0B] bg-[#FFFBEB] p-4">
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
  const [pesan, setPesan] = useState("");
  const [lulus, setLulus] = useState(false);
  const benar = pilih === kunciTanda;
  const suara = panel.suara[kartu.id] === true;

  const ketukTanda = (tanda: string) => {
    if (benar) return;
    setPilih(tanda);
    setPesan(tanda === kunciTanda ? "" : kartu.salahTanda);
  };

  return (
    <>
      <KepalaKartu judul={`Lambang ${indeks + 1}`} onSuara={() => speakGuru(kartu.suara)} garis="#1C01A5" warnaTeks="#1C01A5" />
      <Bantuan
        warna="#1C01A5"
        teks={`Lambang ${indeks + 1} dari ${total}. ${suara ? "Lambangnya sudah diucapkan." : kartu.bantuan}`}
      />

      <div className="flex items-center justify-center gap-3 rounded-2xl border-2 border-[#1C01A5] bg-white py-4">
        <span className="text-6xl font-black leading-none text-[#1C01A5]">{kartu.kiri}</span>
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-4xl font-black ${
            pilih === null
              ? "border-dashed border-[#1C01A5] text-[#1C01A5]"
              : benar
                ? "border-solid border-[#7FCB96] bg-[#E8F7EE] text-[#166534]"
                : "border-solid border-[#E98989] bg-[#FDECEC] text-[#991B1B]"
          }`}
          aria-label="Kotak tanda"
        >
          {pilih ?? ""}
        </span>
        <span className="text-6xl font-black leading-none text-[#1C01A5]">{kartu.kanan}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PILIHAN_TANDA.map((p) => (
          <button
            key={p.tanda}
            type="button"
            aria-label={`Tanda ${p.nama}`}
            onClick={() => ketukTanda(p.tanda)}
            className="flex flex-col items-center gap-1 rounded-2xl border-2 border-[#1C01A5] bg-white px-2 py-2"
          >
            <span className="text-3xl font-black leading-none text-[#1C01A5]">{p.tanda}</span>
            <MulutBuaya arah={p.arah} kelas="h-8 w-16" />
          </button>
        ))}
      </div>

      {benar && !suara ? <Pesan teks="Tanda sudah pas. Sekarang ucapkan." /> : <Pesan teks={pesan} />}

      <p className="text-center text-sm font-black text-[#1C01A5]">{kartu.tugas}</p>
      <JawabSuara
        id={kartu.id}
        jumlah={kartu.kunciSuara}
        panel={panel}
        siap={benar}
        belumSiap="Pilih tandanya dulu."
      />

      {suara ? (
        <div className="space-y-2 rounded-2xl border-2 border-[#1C01A5] bg-white p-3 text-center">
          <TandaBuaya kiri={kartu.kiri} kanan={kartu.kanan} />
          <p className="text-sm font-black leading-snug text-[#1C01A5]">{kartu.kalimat}</p>
        </div>
      ) : null}

      {suara && kartu.tulis ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#1C01A5] bg-white p-3">
          <div className="text-xs font-black text-[#1C01A5]">Tulis lambang di atas, kata di bawah</div>
          <DottedNumberTracingCanvas
            key={`lambang-${kartu.id}`}
            digit={kartu.kunciSuara}
            kata={kata(kartu.kunciSuara)}
            onCompletedTrace={() => setLulus(true)}
          />
          <p className="text-xs font-bold text-[#1C01A5]">{lulus ? "Lambangmu sudah pas." : "Ikuti titik lambangnya."}</p>
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
    <div className="space-y-3 rounded-3xl border-2 border-[#1C01A5] bg-slate-50 p-4">
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
