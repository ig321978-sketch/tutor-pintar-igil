"use client";

import { useMemo, useState } from "react";
import data from "@/data/rapor-dan-ranking.json";
import {
  JUDUL_MTK_1_BAB2,
  JUDUL_MTK_1_BAB3,
  JUDUL_MTK_1_BAB4,
  JUDUL_MTK_1_BAB5,
  JUDUL_MTK_1_BAB6,
  JUDUL_MTK_1_BAB7,
} from "@/lib/kurikulum";
import {
  KepalaHalaman,
  Koin,
  LencanaToken,
  SpanduContoh,
  SubTabBar,
  angkaId,
  useHariIni,
  useProfilSiswa,
} from "./umum";
import { SertifikatDigital, kodeVerifikasi, type PenerimaSertifikat } from "./SertifikatDigital";

const rapor = data.raporPage;
const ekonomi = data.pointEconomy;
const bab1 = rapor.sampleChaptersProgress[0];

type BabRapor = {
  id: string;
  judul: string;
  subBab: string[];
  totalSubBab: number;
  skorLatihan: number | null;
  tokenLatihan: number;
  skorUjian: number | null;
  percobaan: number;
  tokenUjian: number;
  lulusPertama: boolean;
};

const BAB_KELAS1: BabRapor[] = [
  {
    id: bab1.chapterId,
    judul: bab1.title,
    subBab: [...bab1.subBabsCompleted],
    totalSubBab: bab1.totalSubBabs,
    skorLatihan: bab1.practiceScore,
    tokenLatihan: bab1.practicePoints,
    skorUjian: bab1.examScore,
    percobaan: bab1.examAttempts,
    tokenUjian: bab1.examPoints,
    lulusPertama: bab1.firstTryPerfect,
  },
  ...[
    ["k1-mat-bab2", JUDUL_MTK_1_BAB2],
    ["k1-mat-bab3", JUDUL_MTK_1_BAB3],
    ["k1-mat-bab4", JUDUL_MTK_1_BAB4],
    ["k1-mat-bab5", JUDUL_MTK_1_BAB5],
    ["k1-mat-bab6", JUDUL_MTK_1_BAB6],
    ["k1-mat-bab7", JUDUL_MTK_1_BAB7],
  ].map(([id, judul]) => ({
    id,
    judul,
    subBab: [],
    totalSubBab: id === "k1-mat-bab7" ? 2 : id === "k1-mat-bab6" ? 3 : 4,
    skorLatihan: null,
    tokenLatihan: 0,
    skorUjian: null,
    percobaan: 0,
    tokenUjian: 0,
    lulusPertama: false,
  })),
];

/**
 * Model poin: Latihan 30 dan Ujian 70 terbit di tiap bab. Praktikum 50 terbit SEKALI per blok 4 bab
 * (tugas sintesis lintas-4-bab), terbuka setelah keempat bab lulus Ujian 100%.
 */
const BAB_PER_BLOK = ekonomi.perBlockChapters;
const POIN_PRAKTIKUM = ekonomi.perChapterPoints.practicum;
const POIN_PER_BLOK_PENUH = (ekonomi.perChapterPoints.practice + ekonomi.perChapterPoints.exam) * BAB_PER_BLOK + POIN_PRAKTIKUM;
const BAB_BLOK_1 = BAB_KELAS1.slice(0, BAB_PER_BLOK);
const UJIAN_SEMPURNA_BLOK_1 = BAB_BLOK_1.filter((b) => b.skorUjian === 100).length;
const PRAKTIKUM_BLOK_1_TERBUKA = UJIAN_SEMPURNA_BLOK_1 === BAB_PER_BLOK;
const PRAKTIKUM_BLOK_1_SELESAI = PRAKTIKUM_BLOK_1_TERBUKA && bab1.practicumSubmitted;

function predikatUntuk(skor: number) {
  return rapor.predikatScale.find((p) => skor >= p.minScore && skor <= p.maxScore) ?? rapor.predikatScale[3];
}

const WARNA_PREDIKAT: Record<string, string> = {
  "indigo-amber": "bg-amber-400 text-indigo-950",
  emerald: "bg-emerald-100 text-emerald-900",
  amber: "bg-amber-100 text-amber-900",
  rose: "bg-rose-100 text-rose-900",
};

function Ubin({ ikon, judul, nilai, catatan }: { ikon: string; judul: string; nilai: string; catatan: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/20">
      <p className="text-2xl leading-none" aria-hidden="true">
        {ikon}
      </p>
      <p className="mt-1 text-[11px] font-black uppercase tracking-wide text-indigo-100">{judul}</p>
      <p className="mt-0.5 text-2xl font-black text-amber-300">{nilai}</p>
      <p className="text-[11px] font-semibold text-indigo-200">{catatan}</p>
    </div>
  );
}

function KartuDompet({ profil, tokenSaatIni }: { profil: PenerimaSertifikat; tokenSaatIni: { latihan: number; ujian: number; praktikum: number } }) {
  const total = tokenSaatIni.latihan + tokenSaatIni.ujian + tokenSaatIni.praktikum;
  const penuh = POIN_PER_BLOK_PENUH;
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-6">
      <div className="flex items-center gap-3">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-amber-300 bg-white text-3xl"
          aria-hidden="true"
        >
          🧒
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Poin Kualifikasi Bulan Ini</p>
          <p className="break-words text-xl font-black leading-tight sm:text-2xl">{profil.nama}</p>
          <p className="text-sm font-semibold text-indigo-100">
            {profil.kelas} · {profil.kota}
          </p>
        </div>
        <LencanaToken kelas="shrink-0 text-base">{angkaId(total)}</LencanaToken>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Ubin ikon="✏️" judul="Latihan" nilai={angkaId(tokenSaatIni.latihan)} catatan={`${ekonomi.perChapterPoints.practice} / bab`} />
        <Ubin ikon="📝" judul="Ujian" nilai={angkaId(tokenSaatIni.ujian)} catatan={`${ekonomi.perChapterPoints.exam} / bab`} />
        <Ubin ikon="🧪" judul="Praktikum" nilai={angkaId(tokenSaatIni.praktikum)} catatan={`${ekonomi.perChapterPoints.practicum} / ${ekonomi.perBlockChapters} bab`} />
      </div>

      <div className="mt-4 rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
        <div className="flex items-center justify-between gap-2 text-sm font-black">
          <span>{angkaId(total)} Poin Kualifikasi</span>
          <span className="text-amber-300">Bukan uang tunai</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-indigo-950/60" role="img" aria-label={`${total} dari ${penuh} Poin Kualifikasi`}>
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${Math.min(100, (total / penuh) * 100)}%` }} />
        </div>
        <p className="mt-1 text-[11px] font-semibold text-indigo-200">
          {penuh} Poin Kualifikasi penuh per blok {BAB_PER_BLOK} bab ({ekonomi.perChapterPoints.practice + ekonomi.perChapterPoints.exam} per bab
          + {POIN_PRAKTIKUM} Praktikum). Poin tidak punya nilai tukar tetap dan dipakai untuk peringkat beasiswa.
        </p>
      </div>

      <p className="mt-3 flex items-start gap-2 rounded-2xl bg-amber-400 p-3 text-sm font-black leading-snug text-indigo-950">
        <span aria-hidden="true">♻️</span>
        <span>
          Poin kualifikasi di-reset ke 0 setiap akhir bulan saat pengumuman beasiswa, tetapi status ketuntasan bab dan
          Sertifikat Kelulusanmu tersimpan selamanya!
        </span>
      </p>
    </section>
  );
}

function Langkah({ aktif, label, token, catatan }: { aktif: boolean; label: string; token?: number; catatan: string }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl p-2 ${aktif ? "bg-emerald-50" : "bg-slate-50"}`}
    >
      <span
        aria-hidden="true"
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${
          aktif ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        {aktif ? "✓" : "•"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-indigo-950">{label}</p>
        <p className="text-xs font-semibold text-slate-600">{catatan}</p>
      </div>
      {token !== undefined ? (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-black ${
            aktif ? "bg-amber-400 text-indigo-950" : "bg-slate-200 text-slate-500"
          }`}
        >
          {aktif ? `+${token}` : `${token}`} <Koin kelas="h-3.5 w-3.5" />
        </span>
      ) : null}
    </div>
  );
}

function KartuBab({ bab, nomor }: { bab: BabRapor; nomor: number }) {
  const mulai = bab.subBab.length > 0 || bab.skorLatihan !== null;
  const materiPersen = Math.round((bab.subBab.length / bab.totalSubBab) * 100);
  const ujianSempurna = bab.skorUjian === 100;
  const skorGabungan = mulai
    ? Math.round(((bab.skorLatihan ?? 0) + (bab.skorUjian ?? 0) + materiPersen) / 3)
    : 0;
  const pred = predikatUntuk(skorGabungan);
  return (
    <article
      className={`rounded-3xl border-2 bg-white p-4 shadow-sm ${mulai ? "border-indigo-100" : "border-slate-200"}`}
    >
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black ${
            mulai ? "bg-[#1C01A5] text-amber-300" : "bg-slate-200 text-slate-500"
          }`}
        >
          {nomor}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-black leading-snug text-indigo-950">{bab.judul}</h3>
          {mulai ? (
            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-black ${WARNA_PREDIKAT[pred.colorTheme] ?? ""}`}>
              {pred.code} · {pred.label}
            </span>
          ) : (
            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-black text-slate-500">
              Belum dimulai
            </span>
          )}
        </div>
        {bab.lulusPertama ? (
          <span
            title="Papan Kualifikasi Beasiswa"
            className="shrink-0 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-black text-indigo-950 shadow"
          >
            🌟 Kualifikasi
          </span>
        ) : null}
      </header>

      <div className="mt-3 space-y-2">
        <div className="rounded-xl bg-indigo-50/40 p-2">
          <div className="flex items-center justify-between text-sm font-black text-indigo-950">
            <span>📚 Silabus & Materi SMICPA</span>
            <span>{materiPersen}%</span>
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {["A", "B", "C", "D"].map((huruf) => {
              const selesai = bab.subBab.includes(huruf);
              return (
                <span
                  key={huruf}
                  className={`flex h-8 flex-1 items-center justify-center rounded-lg text-sm font-black ${
                    selesai ? "bg-[#1C01A5] text-amber-300" : "bg-white text-slate-400 ring-1 ring-slate-200"
                  }`}
                >
                  {selesai ? "✓ " : ""}
                  {huruf}
                </span>
              );
            })}
          </div>
        </div>

        <Langkah
          aktif={bab.skorLatihan !== null}
          label="✏️ Latihan Terbimbing"
          token={ekonomi.perChapterPoints.practice}
          catatan={bab.skorLatihan !== null ? `Skor ${bab.skorLatihan}/100 · poin sudah diklaim` : "10 soal dengan pembahasan guru"}
        />
        <Langkah
          aktif={ujianSempurna}
          label="📝 Ujian Mandiri"
          token={ekonomi.perChapterPoints.exam}
          catatan={
            bab.skorUjian !== null
              ? `Skor terbaik ${bab.skorUjian}/100 · ${bab.percobaan}x percobaan`
              : "Wajib 100/100 untuk membuka Praktikum blok 4 bab"
          }
        />
      </div>

      {bab.lulusPertama ? (
        <p className="mt-3 rounded-xl bg-amber-50 p-2 text-xs font-bold leading-snug text-indigo-950">
          🌟 Lulus Ujian 100% di percobaan pertama · Sesi Belajar Sah (Tervalidasi Server).
        </p>
      ) : null}
    </article>
  );
}

function KartuPraktikumBlok() {
  const selesai = PRAKTIKUM_BLOK_1_SELESAI;
  const terbuka = PRAKTIKUM_BLOK_1_TERBUKA;
  return (
    <article className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm">
      <header className="flex items-start gap-3">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-lg">
          🧪
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-black leading-snug text-indigo-950">
            Praktikum Blok 1 · Bab 1–{BAB_PER_BLOK}
          </h3>
          <p className="text-xs font-semibold leading-snug text-slate-600">
            Satu tugas sintesis untuk {BAB_PER_BLOK} bab sekaligus. Poinnya terbit sekali per blok.
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
            selesai ? "bg-emerald-100 text-emerald-900" : terbuka ? "bg-amber-400 text-indigo-950" : "bg-slate-200 text-slate-600"
          }`}
        >
          {selesai ? "✓ Sudah dikirim" : terbuka ? "Terbuka" : "🔒 Terkunci"}
        </span>
      </header>
      <div className="mt-3 rounded-xl bg-white p-2">
        <div className="flex items-center justify-between text-sm font-black text-indigo-950">
          <span>Bab lulus Ujian 100%</span>
          <span>
            {UJIAN_SEMPURNA_BLOK_1} dari {BAB_PER_BLOK}
          </span>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-indigo-100">
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${(UJIAN_SEMPURNA_BLOK_1 / BAB_PER_BLOK) * 100}%` }} />
        </div>
      </div>
      <div className="mt-2">
        <Langkah
          aktif={selesai}
          label="🧪 Serahkan Praktikum"
          token={POIN_PRAKTIKUM}
          catatan={
            selesai
              ? "Sudah dikirim · skor menunggu pengumuman akhir bulan"
              : terbuka
                ? "Terbuka! Ayo serahkan"
                : `🔒 Terbuka setelah ${BAB_PER_BLOK} bab lulus Ujian 100%`
          }
        />
      </div>
    </article>
  );
}

function PanelPenilaianRahasia({ terkunci }: { terkunci: boolean }) {
  const spek = rapor.hiddenGradingSpec;
  return (
    <section className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="min-w-0 flex-1 text-lg font-black leading-snug text-indigo-950">🧪 {spek.title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${
            terkunci ? "bg-[#1C01A5] text-amber-300" : "bg-emerald-100 text-emerald-900"
          }`}
        >
          {terkunci ? "🔒 Rahasia hingga Pengumuman Akhir Bulan" : spek.unlockedStatusBadge}
        </span>
      </div>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{spek.explanation}</p>

      <ul className="mt-4 space-y-3">
        {spek.parameters.map((p) => (
          <li key={p.id} className="rounded-2xl bg-indigo-50/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 flex-1 text-sm font-black text-indigo-950">{p.label}</p>
              <span className="shrink-0 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-indigo-950">
                {p.weightPercent}%
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white ring-1 ring-indigo-100">
              <div
                className={`h-full rounded-full ${terkunci ? "bg-[repeating-linear-gradient(45deg,#1C01A5,#1C01A5_6px,#4c1d95_6px,#4c1d95_12px)]" : "bg-amber-400"}`}
                style={{ width: `${p.weightPercent * 3.3}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs font-semibold leading-snug text-slate-600">
              {p.id === "independence"
                ? "Kejujuran pengerjaan mandiri berdasarkan rekam jejak percobaan dan sesi belajar yang Tervalidasi Server."
                : p.desc}
            </p>
            <p className="mt-1 text-xs font-black text-[#1C01A5]">{terkunci ? "🔒 Skor tersembunyi" : "Skor terbuka"}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-semibold text-slate-500">
        Penilaian AI dilakukan tepat 1 kali saat tombol &quot;Serahkan Praktikum&quot; ditekan. Selama belajar, tidak ada
        panggilan AI.
      </p>
    </section>
  );
}

const SYARAT_PAPAN_KUALIFIKASI = [
  "Lulus Ujian Mandiri mutlak 100/100 pada percobaan pertama (First-Try Perfect).",
  "Sesi belajar dan jawaban Ujian tercatat sah dan Tervalidasi Server, tanpa bantuan kamera.",
  "Seluruh 4 sub-bab pada modul Materi SMICPA telah tercentang tuntas.",
] as const;

function PanelPintar() {
  return (
    <section className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm sm:p-5">
      <h3 className="text-lg font-black text-indigo-950">🌟 Papan Kualifikasi Beasiswa</h3>
      <p className="mt-1 text-sm font-semibold text-slate-600">Lencana emas menyala kalau kamu memenuhi semua syarat ini:</p>
      <ol className="mt-3 space-y-2">
        {SYARAT_PAPAN_KUALIFIKASI.map((syarat, i) => (
          <li key={syarat} className="flex items-start gap-3 rounded-2xl bg-white p-3">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-sm font-black text-amber-300"
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-indigo-950">{syarat}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-start gap-2 rounded-2xl bg-[#1C01A5] p-3 text-xs font-bold leading-snug text-white">
        <span aria-hidden="true">🛡️</span>
        <span>
          Tervalidasi Server: jawaban dan sesi belajar dicek oleh server IGIL. Tidak ada kamera dan tidak ada data
          biometrik yang dipakai untuk belajar maupun ujian.
        </span>
      </p>
    </section>
  );
}

function SyaratSertifikat({ ok, teks }: { ok: boolean; teks: string }) {
  return (
    <li className="flex items-start gap-2 text-sm font-semibold text-indigo-950">
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
          ok ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
        }`}
      >
        {ok ? "✓" : "•"}
      </span>
      <span className="min-w-0 flex-1">{teks}</span>
    </li>
  );
}

function TabSertifikat({ profil, babTuntas }: { profil: PenerimaSertifikat; babTuntas: Set<string> }) {
  const tingkat = rapor.certificateTemplate.levels;
  const [pilih, setPilih] = useState(tingkat[0].id);
  const tanggal = useHariIni();
  const aktif = tingkat.find((t) => t.id === pilih) ?? tingkat[0];
  const terbuka = aktif.requiredChapters.every((id) => babTuntas.has(id));
  const tuntasJumlah = aktif.requiredChapters.filter((id) => babTuntas.has(id)).length;
  const kode = useMemo(
    () => (tanggal ? kodeVerifikasi(rapor.certificateTemplate.verificationPrefix, profil, aktif.id, tanggal) : ""),
    [tanggal, profil, aktif.id],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {tingkat.map((t) => {
          const buka = t.requiredChapters.every((id) => babTuntas.has(id));
          const jumlah = t.requiredChapters.filter((id) => babTuntas.has(id)).length;
          const menyala = t.id === pilih;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setPilih(t.id)}
              aria-pressed={menyala}
              className={`rounded-2xl p-3 text-left ${
                menyala ? "border-amber-400 bg-amber-50 shadow-md" : "border-indigo-100 bg-white hover:border-amber-400"
              }`}
            >
              <span className="flex items-start gap-2">
                <span aria-hidden="true" className="text-2xl leading-none">
                  {buka ? "🎓" : "🔒"}
                </span>
                <span className="min-w-0 flex-1 text-sm font-black leading-snug text-indigo-950">{t.title}</span>
              </span>
              <span className="mt-2 block h-2.5 overflow-hidden rounded-full bg-indigo-100">
                <span
                  className="block h-full rounded-full bg-amber-400"
                  style={{ width: `${(jumlah / t.requiredChapters.length) * 100}%` }}
                />
              </span>
              <span className="mt-1 block text-xs font-bold text-indigo-950/70">
                {jumlah} dari {t.requiredChapters.length} bab tuntas
              </span>
            </button>
          );
        })}
      </div>

      <section className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
        <h3 className="text-base font-black text-indigo-950">Syarat membuka kunci</h3>
        <ul className="mt-2 space-y-1.5">
          <SyaratSertifikat
            ok={tuntasJumlah === aktif.requiredChapters.length}
            teks={`Lulus Ujian 100% pada ${aktif.requiredChapters.length} bab (${tuntasJumlah} sudah tuntas)`}
          />
          <SyaratSertifikat
            ok={terbuka && aktif.requirePracticum && PRAKTIKUM_BLOK_1_SELESAI}
            teks="Menyerahkan Praktikum Sintesis lintas-bab"
          />
        </ul>
        <p
          className={`mt-3 rounded-2xl p-3 text-sm font-black leading-snug ${
            terbuka ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-indigo-950"
          }`}
        >
          {terbuka
            ? "🎉 Sertifikat terbuka! Cetak atau unduh sekarang."
            : "👀 Ini Mode Pratinjau. Selesaikan bab-babnya supaya sertifikat asli terbuka dan tanda PRATINJAU hilang."}
        </p>
      </section>

      {tanggal ? (
        <SertifikatDigital
          penerima={profil}
          tingkat={aktif}
          tanggal={tanggal}
          kode={kode}
          penerbit={rapor.certificateTemplate.issuerName.split(" — ")[0]}
          pendiri={rapor.certificateTemplate.founderTitle.split(" — ")[0]}
          pratinjau={!terbuka}
        />
      ) : (
        <div className="h-64 animate-pulse rounded-3xl bg-indigo-50" />
      )}
    </div>
  );
}

export default function RaporHalaman() {
  const [tab, setTab] = useState(rapor.subTabs[0].id);
  const profil = useProfilSiswa();

  const tokenSaatIni = BAB_KELAS1.reduce(
    (acc, b) => ({
      latihan: acc.latihan + b.tokenLatihan,
      ujian: acc.ujian + b.tokenUjian,
      praktikum: acc.praktikum,
    }),
    { latihan: 0, ujian: 0, praktikum: PRAKTIKUM_BLOK_1_SELESAI ? POIN_PRAKTIKUM : 0 },
  );

  const babTuntas = new Set(BAB_KELAS1.filter((b) => b.skorUjian === 100).map((b) => b.id));

  return (
    <main className="flex-1 bg-white text-slate-700">
      <div className="mx-auto w-full max-w-4xl space-y-4 px-2 py-4 sm:py-8">
        <KepalaHalaman
          ikon="📊"
          lencana={rapor.header.badge}
          judul={rapor.header.title}
          subjudul={rapor.header.subtitle}
        />

        <SpanduContoh>
          Tampilan contoh dengan data bab 1. Angka asli tersambung otomatis setelah penyimpanan progres ke Supabase
          (lewat RPC) siap.
        </SpanduContoh>

        <SubTabBar tabs={rapor.subTabs} aktif={tab} onPilih={setTab} />

        {tab === "rapor-ketuntasan" ? (
          <div className="space-y-4">
            <KartuDompet profil={profil} tokenSaatIni={tokenSaatIni} />

            <section aria-labelledby="judul-bab" className="space-y-3">
              <h2 id="judul-bab" className="text-xl font-black text-indigo-950">
                📖 Ketuntasan Per Bab · Matematika Kelas 1 SD
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {BAB_KELAS1.map((b, i) => (
                  <KartuBab key={b.id} bab={b} nomor={i + 1} />
                ))}
              </div>
              <KartuPraktikumBlok />
            </section>

            <PanelPenilaianRahasia terkunci={bab1.hiddenGrading.isHidden} />
            <PanelPintar />

            <section className="rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-4">
              <h3 className="text-base font-black text-indigo-950">🏅 Arti Predikat</h3>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {rapor.predikatScale.map((p) => (
                  <li key={p.code} className="flex items-start gap-2 rounded-2xl bg-white p-3">
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-sm font-black ${WARNA_PREDIKAT[p.colorTheme] ?? ""}`}
                    >
                      {p.code}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black text-indigo-950">
                        {p.label} <span className="font-semibold text-slate-500">({p.minScore}–{p.maxScore})</span>
                      </span>
                      <span className="block text-xs font-semibold leading-snug text-slate-600">{p.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <TabSertifikat profil={profil} babTuntas={babTuntas} />
        )}
      </div>
    </main>
  );
}
