"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import data from "@/data/rapor-dan-ranking.json";
import * as KURIKULUM from "@/lib/kurikulum";
import { TOTAL_SUBBAB, babDariCapaian, hurufSubBab, labelBab, uraiKodeBab, type BabRapor } from "@/lib/bab-rapor";
import {
  BAB_PER_BLOK,
  POIN_LATIHAN,
  POIN_PER_BLOK_PENUH,
  POIN_PRAKTIKUM,
  POIN_UJIAN,
  babUjianSempurna,
  bulanJakarta,
  kodeAplikasiDariServer,
  poinBulanIni,
  sertifikatTerbuka,
  type BlokPraktikum,
  type PoinBulan,
  type RingkasBab,
} from "@/lib/capaian";
import { useCapaian } from "@/lib/capaian-klien";
import { usePraktikumTerkirim, useUjianLulus } from "@/lib/praktikum-blok";
import {
  KepalaHalaman,
  Koin,
  LencanaToken,
  SubTabBar,
  angkaId,
  useHariIni,
  useProfilSiswa,
} from "./umum";
import { SertifikatDigital, kodeVerifikasi, type PenerimaSertifikat } from "./SertifikatDigital";

const rapor = data.raporPage;

/** Judul bab dari kurikulum: JUDUL_MTK_<kelas>_BAB<nomor> menjadi kode "mtk-<kelas>-bab<nomor>". Bab baru ikut otomatis. */
const JUDUL_BAB: Record<string, string> = Object.fromEntries(
  Object.entries(KURIKULUM).flatMap(([nama, nilai]) => {
    const m = /^JUDUL_MTK_(\d+)_BAB(\d+)$/.exec(nama);
    return m && typeof nilai === "string" ? [[`mtk-${m[1]}-bab${m[2]}`, nilai]] : [];
  }),
);
const judulBab = (kode: string): string => JUDUL_BAB[kode] ?? labelBab(kode);

/** Praktikum per blok 4 bab yang sudah punya tugas (src/data/praktikum-blok.json). Tambahkan di sini saat blok berikutnya terbit. */
const BLOK_PRAKTIKUM: BlokPraktikum[] = [{ id: "mtk-1-blok1", bab: ["mtk-1-bab1", "mtk-1-bab2", "mtk-1-bab3", "mtk-1-bab4"].slice(0, BAB_PER_BLOK) }];
const BLOK_1 = BLOK_PRAKTIKUM[0];

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

function KartuDompet({ profil, poin }: { profil: PenerimaSertifikat; poin: PoinBulan }) {
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
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Perkiraan Poin Kualifikasi Bulan Ini</p>
          <p className="break-words text-xl font-black leading-tight sm:text-2xl">{profil.nama}</p>
          <p className="text-sm font-semibold text-indigo-100">
            {profil.kelas} · {profil.kota}
          </p>
        </div>
        <LencanaToken kelas="shrink-0 text-base">{angkaId(poin.total)}</LencanaToken>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Ubin ikon="✏️" judul="Latihan" nilai={angkaId(poin.latihan)} catatan={`${POIN_LATIHAN} / bab`} />
        <Ubin ikon="📝" judul="Ujian" nilai={angkaId(poin.ujian)} catatan={`${POIN_UJIAN} / bab`} />
        <Ubin ikon="🧪" judul="Praktikum" nilai={angkaId(poin.praktikum)} catatan={`${POIN_PRAKTIKUM} / ${BAB_PER_BLOK} bab`} />
      </div>

      <div className="mt-4 rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
        <div className="flex items-center justify-between gap-2 text-sm font-black">
          <span>{angkaId(poin.total)} Poin Kualifikasi</span>
          <span className="text-amber-300">Bukan uang tunai</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-indigo-950/60" role="img" aria-label={`${poin.total} dari ${POIN_PER_BLOK_PENUH} Poin Kualifikasi`}>
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${Math.min(100, (poin.total / POIN_PER_BLOK_PENUH) * 100)}%` }} />
        </div>
        <p className="mt-1 text-[11px] font-semibold text-indigo-200">
          {POIN_PER_BLOK_PENUH} Poin Kualifikasi penuh per blok {BAB_PER_BLOK} bab ({POIN_LATIHAN + POIN_UJIAN} per bab + {POIN_PRAKTIKUM} Praktikum). Poin tidak
          punya nilai tukar tetap dan dipakai untuk peringkat beasiswa.
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

/** Catatan jujur tentang asal data, menggantikan spanduk "tampilan contoh". */
function CatatanData({ adaCatatan }: { adaCatatan: boolean }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-3 text-sm font-bold text-indigo-950">
      <span aria-hidden="true" className="text-xl leading-none">
        📱
      </span>
      <p className="min-w-0 flex-1 leading-snug">
        {adaCatatan
          ? "Rapor ini dibaca dari catatan belajar di perangkat ini. Poin Kualifikasi resmi dicatat server saat jawabanmu dinilai, jadi angka poin di sini adalah perkiraan."
          : "Belum ada catatan belajar di perangkat ini. Selesaikan Sub-Bab, Latihan, atau Ujian di Ruang Belajar, nanti rapornya terisi sendiri."}{" "}
        {adaCatatan ? null : (
          <Link href="/ruang-belajar" className="font-black text-[#1C01A5] underline">
            Mulai belajar
          </Link>
        )}
      </p>
    </div>
  );
}

function Langkah({ aktif, label, token, catatan }: { aktif: boolean; label: string; token?: number; catatan: string }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl p-2 ${aktif ? "bg-emerald-50" : "bg-slate-50"}`}>
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

function KartuBab({ kode, judul, r, urutanSub, subSelesai }: { kode: string; judul: string; r: RingkasBab; urutanSub: string[]; subSelesai: readonly string[] }) {
  const nomor = uraiKodeBab(kode)?.nomor ?? 0;
  const skorGabungan = r.mulai ? Math.round(((r.skorLatihan ?? 0) + (r.skorUjian ?? 0) + r.materiPersen) / 3) : 0;
  const pred = predikatUntuk(skorGabungan);
  return (
    <article className={`rounded-3xl border-2 bg-white p-4 shadow-sm ${r.mulai ? "border-indigo-100" : "border-slate-200"}`}>
      <header className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-black ${
            r.mulai ? "bg-[#1C01A5] text-amber-300" : "bg-slate-200 text-slate-500"
          }`}
        >
          {nomor}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-black uppercase tracking-wide text-indigo-500">{labelBab(kode)}</p>
          <h3 className="break-words text-base font-black leading-snug text-indigo-950">{judul}</h3>
          {r.mulai ? (
            <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-black ${WARNA_PREDIKAT[pred.colorTheme] ?? ""}`}>
              {pred.code} · {pred.label}
            </span>
          ) : (
            <span className="mt-1 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-black text-slate-500">Belum dimulai</span>
          )}
        </div>
        {r.kualifikasi ? (
          <span title="Papan Kualifikasi Beasiswa" className="shrink-0 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-black text-indigo-950 shadow">
            🌟 Kualifikasi
          </span>
        ) : null}
      </header>

      <div className="mt-3 space-y-2">
        <div className="rounded-xl bg-indigo-50/40 p-2">
          <div className="flex items-center justify-between text-sm font-black text-indigo-950">
            <span>📚 Silabus & Materi SMISCPA</span>
            <span>{TOTAL_SUBBAB[kode] ? `${r.materiPersen}%` : `${subSelesai.length} Sub-Bab selesai`}</span>
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {urutanSub.map((huruf) => {
              const selesai = subSelesai.includes(huruf);
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
          aktif={r.latihanSelesai}
          label="✏️ Latihan Terbimbing"
          token={POIN_LATIHAN}
          catatan={r.latihanSelesai ? `Skor ${r.skorLatihan}/100 · sepuluh soal sudah dijawab` : r.latihanTerjawab > 0 ? `${r.latihanTerjawab} dari 10 soal sudah dijawab` : "10 soal dengan pembahasan guru"}
        />
        <Langkah
          aktif={r.ujianSempurna}
          label="📝 Ujian Mandiri"
          token={POIN_UJIAN}
          catatan={r.skorUjian !== null ? `Skor terbaik ${r.skorUjian}/100 · ${r.percobaan}x percobaan` : "Wajib 100/100 untuk membuka Praktikum blok 4 bab"}
        />
      </div>

      {r.kualifikasi ? (
        <p className="mt-3 rounded-xl bg-amber-50 p-2 text-xs font-bold leading-snug text-indigo-950">
          🌟 Lulus Ujian 100% di percobaan pertama dan semua Sub-Bab tuntas · Sesi Belajar Sah (Tervalidasi Server).
        </p>
      ) : null}

      <Link
        href={`/ruang-belajar/${kode}`}
        className={`mt-3 flex min-h-[44px] w-full items-center justify-center rounded-full border-4 px-4 text-sm font-black ${
          r.ujianSempurna ? "border-indigo-100 bg-white text-indigo-950" : "border-amber-400 bg-[#1C01A5] text-amber-300"
        }`}
      >
        {r.ujianSempurna ? "Buka lagi materinya" : r.mulai ? "Lanjutkan belajar" : "Mulai belajar"}
      </Link>
    </article>
  );
}

/** Kartu "Langkah berikutnya": lanjutkan bab yang terakhir dikerjakan, dengan hitungan bab tuntas. Siswa bebas memilih bab apa pun. */
function KartuLanjut({ terakhir, aktif, tuntas }: { terakhir: BabRapor | null; aktif: number; tuntas: number }) {
  return (
    <section className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-black text-indigo-950">
        <span>🎯 Capaian Belajarmu</span>
        <span>
          {tuntas} bab Ujian 100% · {aktif} bab sedang dipelajari
        </span>
      </div>
      {terakhir ? (
        <Link href={`/ruang-belajar/${terakhir.kode}`} className="mt-3 flex min-h-[48px] items-center justify-between gap-2 rounded-2xl bg-[#1C01A5] px-4 py-2 text-white">
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wide text-amber-300">Lanjutkan bab terakhir · {labelBab(terakhir.kode)}</span>
            <span className="block break-words text-sm font-black leading-snug">{judulBab(terakhir.kode)}</span>
          </span>
          <span aria-hidden="true" className="shrink-0 text-xl text-amber-300">
            ➜
          </span>
        </Link>
      ) : (
        <Link href="/ruang-belajar" className="mt-3 flex min-h-[48px] items-center justify-between gap-2 rounded-2xl bg-[#1C01A5] px-4 py-2 text-white">
          <span className="min-w-0">
            <span className="block text-[11px] font-black uppercase tracking-wide text-amber-300">Mulai dari mana saja</span>
            <span className="block break-words text-sm font-black leading-snug">Pilih bab yang ingin kamu pelajari di Ruang Belajar</span>
          </span>
          <span aria-hidden="true" className="shrink-0 text-xl text-amber-300">
            ➜
          </span>
        </Link>
      )}
    </section>
  );
}

function KartuPraktikumBlok({ tuntasBlok, terkirim }: { tuntasBlok: number; terkirim: boolean }) {
  const terbuka = tuntasBlok === BAB_PER_BLOK;
  return (
    <article className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm">
      <header className="flex items-start gap-3">
        <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-lg">
          🧪
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="break-words text-base font-black leading-snug text-indigo-950">Praktikum Blok 1 · Bab 1–{BAB_PER_BLOK}</h3>
          <p className="text-xs font-semibold leading-snug text-slate-600">Satu tugas sintesis untuk {BAB_PER_BLOK} bab sekaligus. Poinnya terbit sekali per blok.</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${
            terkirim ? "bg-emerald-100 text-emerald-900" : terbuka ? "bg-amber-400 text-indigo-950" : "bg-slate-200 text-slate-600"
          }`}
        >
          {terkirim ? "✓ Sudah dikirim" : terbuka ? "Terbuka" : "🔒 Terkunci"}
        </span>
      </header>
      <div className="mt-3 rounded-xl bg-white p-2">
        <div className="flex items-center justify-between text-sm font-black text-indigo-950">
          <span>Bab lulus Ujian 100%</span>
          <span>
            {tuntasBlok} dari {BAB_PER_BLOK}
          </span>
        </div>
        <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-indigo-100">
          <div className="h-full rounded-full bg-amber-400" style={{ width: `${(tuntasBlok / BAB_PER_BLOK) * 100}%` }} />
        </div>
      </div>
      <div className="mt-2">
        <Langkah
          aktif={terkirim}
          label="🧪 Serahkan Praktikum"
          token={POIN_PRAKTIKUM}
          catatan={terkirim ? "Sudah dikirim · skor menunggu pengumuman akhir bulan" : terbuka ? "Terbuka! Ayo serahkan" : `🔒 Terbuka setelah ${BAB_PER_BLOK} bab lulus Ujian 100%`}
        />
      </div>
      {terbuka && !terkirim ? (
        <Link href={`/praktikum/${BLOK_1.id}`} className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-full border-4 border-amber-400 bg-[#1C01A5] px-4 text-sm font-black text-amber-300">
          Kerjakan Praktikum
        </Link>
      ) : null}
    </article>
  );
}

function PanelPenilaianRahasia({ terkirim }: { terkirim: boolean }) {
  const spek = rapor.hiddenGradingSpec;
  return (
    <details className="group rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-2">
        <h3 className="min-w-0 flex-1 text-lg font-black leading-snug text-indigo-950">🧪 Cara Praktikum dinilai</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-black ${terkirim ? "bg-[#1C01A5] text-amber-300" : "bg-slate-100 text-slate-600"}`}>
          {terkirim ? "🔒 Rahasia hingga Pengumuman Akhir Bulan" : "Belum diserahkan"}
        </span>
      </summary>
      <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{spek.explanation}</p>

      <ul className="mt-4 space-y-3">
        {spek.parameters.map((p) => (
          <li key={p.id} className="rounded-2xl bg-indigo-50/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="min-w-0 flex-1 text-sm font-black text-indigo-950">{p.label}</p>
              <span className="shrink-0 rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-indigo-950">{p.weightPercent}%</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white ring-1 ring-indigo-100">
              <div
                className={`h-full rounded-full ${terkirim ? "bg-[repeating-linear-gradient(45deg,#1C01A5,#1C01A5_6px,#4c1d95_6px,#4c1d95_12px)]" : "bg-amber-400"}`}
                style={{ width: `${p.weightPercent * 3.3}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs font-semibold leading-snug text-slate-600">
              {p.id === "independence" ? "Kejujuran pengerjaan mandiri berdasarkan rekam jejak percobaan dan sesi belajar yang Tervalidasi Server." : p.desc}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs font-semibold text-slate-500">
        Penilaian AI dilakukan tepat 1 kali saat tombol &quot;Serahkan Praktikum&quot; ditekan. Selama belajar, tidak ada panggilan AI.
      </p>
    </details>
  );
}

function PanelPapanKualifikasi({ jumlahBabKualifikasi }: { jumlahBabKualifikasi: number }) {
  const syarat = [
    "Lulus Ujian Mandiri mutlak 100/100 pada percobaan pertama (First-Try Perfect).",
    "Sesi belajar dan jawaban Ujian tercatat sah dan Tervalidasi Server, tanpa bantuan kamera.",
    "Semua Sub-Bab pada modul Materi SMISCPA bab itu sudah tuntas.",
  ];
  return (
    <section className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="min-w-0 flex-1 text-lg font-black text-indigo-950">🌟 Papan Kualifikasi Beasiswa</h3>
        <span className="rounded-full bg-[#1C01A5] px-3 py-1 text-xs font-black text-amber-300">
          Menyala di {jumlahBabKualifikasi} bab
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold text-slate-600">Lencana emas menyala di sebuah bab kalau kamu memenuhi semua syarat ini:</p>
      <ol className="mt-3 space-y-2">
        {syarat.map((s, i) => (
          <li key={s} className="flex items-start gap-3 rounded-2xl bg-white p-3">
            <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-sm font-black text-amber-300">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-indigo-950">{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-start gap-2 rounded-2xl bg-[#1C01A5] p-3 text-xs font-bold leading-snug text-white">
        <span aria-hidden="true">🛡️</span>
        <span>
          Tervalidasi Server: jawaban dan sesi belajar dicek oleh server IGIL. Tidak ada kamera dan tidak ada data biometrik yang dipakai untuk belajar maupun
          ujian.
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

function TabSertifikat({ profil, tuntas, praktikumTerkirim }: { profil: PenerimaSertifikat; tuntas: ReadonlySet<string>; praktikumTerkirim: ReadonlySet<string> }) {
  const tingkat = rapor.certificateTemplate.levels;
  const [pilih, setPilih] = useState(tingkat[0].id);
  const tanggal = useHariIni();
  const aktif = tingkat.find((t) => t.id === pilih) ?? tingkat[0];

  const status = (t: (typeof tingkat)[number]) => {
    const babWajib = t.requiredChapters.map(kodeAplikasiDariServer);
    const jumlah = babWajib.filter((b) => tuntas.has(b)).length;
    return {
      babWajib,
      jumlah,
      semuaBab: jumlah === babWajib.length,
      praktikumOk: sertifikatTerbuka({ babWajib, tuntas, wajibPraktikum: true, blok: BLOK_PRAKTIKUM, praktikumTerkirim }),
      terbuka: sertifikatTerbuka({ babWajib, tuntas, wajibPraktikum: t.requirePracticum, blok: BLOK_PRAKTIKUM, praktikumTerkirim }),
    };
  };
  const sa = status(aktif);
  const kode = useMemo(
    () => (tanggal ? kodeVerifikasi(rapor.certificateTemplate.verificationPrefix, profil, aktif.id, tanggal) : ""),
    [tanggal, profil, aktif.id],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {tingkat.map((t) => {
          const s = status(t);
          const menyala = t.id === pilih;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setPilih(t.id)}
              aria-pressed={menyala}
              className={`rounded-2xl p-3 text-left ${menyala ? "border-amber-400 bg-amber-50 shadow-md" : "border-indigo-100 bg-white hover:border-amber-400"}`}
            >
              <span className="flex items-start gap-2">
                <span aria-hidden="true" className="text-2xl leading-none">
                  {s.terbuka ? "🎓" : "🔒"}
                </span>
                <span className="min-w-0 flex-1 text-sm font-black leading-snug text-indigo-950">{t.title}</span>
              </span>
              <span className="mt-2 block h-2.5 overflow-hidden rounded-full bg-indigo-100">
                <span className="block h-full rounded-full bg-amber-400" style={{ width: `${(s.jumlah / s.babWajib.length) * 100}%` }} />
              </span>
              <span className="mt-1 block text-xs font-bold text-indigo-950/70">
                {s.jumlah} dari {s.babWajib.length} bab tuntas
              </span>
            </button>
          );
        })}
      </div>

      <section className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
        <h3 className="text-base font-black text-indigo-950">Syarat membuka kunci</h3>
        <ul className="mt-2 space-y-1.5">
          <SyaratSertifikat ok={sa.semuaBab} teks={`Lulus Ujian 100% pada ${sa.babWajib.length} bab (${sa.jumlah} sudah tuntas)`} />
          {aktif.requirePracticum ? <SyaratSertifikat ok={sa.praktikumOk} teks="Menyerahkan Praktikum Sintesis lintas-bab" /> : null}
        </ul>
        <p className={`mt-3 rounded-2xl p-3 text-sm font-black leading-snug ${sa.terbuka ? "bg-emerald-50 text-emerald-900" : "bg-amber-50 text-indigo-950"}`}>
          {sa.terbuka
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
          pratinjau={!sa.terbuka}
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
  const capaian = useCapaian();
  const ujianLama = useUjianLulus();
  const praktikumBlok1 = usePraktikumTerkirim(BLOK_1.id);
  const hariIni = useHariIni();

  const siap = capaian !== null && ujianLama !== null && praktikumBlok1 !== null && hariIni !== null;

  const tuntas = useMemo(() => babUjianSempurna(capaian ?? {}, ujianLama ?? []), [capaian, ujianLama]);
  const praktikumTerkirim = useMemo(() => new Set(praktikumBlok1 ? [BLOK_1.id] : []), [praktikumBlok1]);
  const poin = useMemo(
    () => (hariIni ? poinBulanIni(capaian ?? {}, bulanJakarta(hariIni), [praktikumBlok1 ? bulanJakarta(new Date(praktikumBlok1.dikirimPada)) : null]) : poinBulanIni({}, "", [])),
    [capaian, hariIni, praktikumBlok1],
  );
  const bab = useMemo(() => babDariCapaian(capaian ?? {}, tuntas), [capaian, tuntas]);
  const tuntasBlok1 = BLOK_1.bab.filter((b) => tuntas.has(b)).length;
  const adaCatatan = Object.keys(capaian ?? {}).length > 0 || (ujianLama?.length ?? 0) > 0;

  return (
    <main className="flex-1 bg-white text-slate-700">
      <div className="mx-auto w-full max-w-4xl space-y-4 px-2 py-4 sm:py-8">
        <KepalaHalaman ikon="📊" lencana={rapor.header.badge} judul={rapor.header.title} subjudul={rapor.header.subtitle} />

        {siap ? <CatatanData adaCatatan={adaCatatan} /> : null}

        <SubTabBar tabs={rapor.subTabs} aktif={tab} onPilih={setTab} />

        {!siap ? (
          <div className="space-y-3" role="status" aria-label="Membaca catatan belajarmu">
            <div className="h-56 animate-pulse rounded-3xl bg-indigo-50" />
            <div className="h-32 animate-pulse rounded-3xl bg-indigo-50" />
          </div>
        ) : tab === "rapor-ketuntasan" ? (
          <div className="space-y-4">
            <KartuDompet profil={profil} poin={poin} />

            <KartuLanjut terakhir={bab.aktif[0] ?? null} aktif={bab.aktif.length} tuntas={bab.selesai.length} />

            <section aria-labelledby="judul-bab" className="space-y-3">
              <h2 id="judul-bab" className="text-xl font-black text-indigo-950">
                📖 Bab yang Sedang Kamu Pelajari
              </h2>
              <p className="text-sm font-semibold text-slate-600">Kamu bebas memilih bab dari pelajaran dan kelas mana saja. Rapor hanya menampilkan bab yang sudah kamu mulai.</p>
              {bab.aktif.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {bab.aktif.map((b) => (
                    <KartuBab key={b.kode} kode={b.kode} judul={judulBab(b.kode)} r={b.ringkas} urutanSub={hurufSubBab(b.kode, b.subSelesai)} subSelesai={b.subSelesai} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-4 text-center">
                  <p className="text-sm font-black text-indigo-950">{bab.selesai.length > 0 ? "Semua bab yang kamu mulai sudah tuntas. Hebat!" : "Belum ada bab yang kamu mulai."}</p>
                  <Link href="/ruang-belajar" className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-full border-4 border-amber-400 bg-[#1C01A5] px-4 text-sm font-black text-amber-300">
                    Pilih bab di Ruang Belajar
                  </Link>
                </div>
              )}

              {bab.selesai.length > 0 ? (
                <details className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/50 p-4">
                  <summary className="cursor-pointer list-none text-base font-black text-indigo-950">✅ Bab yang Sudah Tuntas ({bab.selesai.length})</summary>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {bab.selesai.map((b) => (
                      <KartuBab key={b.kode} kode={b.kode} judul={judulBab(b.kode)} r={b.ringkas} urutanSub={hurufSubBab(b.kode, b.subSelesai)} subSelesai={b.subSelesai} />
                    ))}
                  </div>
                </details>
              ) : null}

              {tuntasBlok1 > 0 || praktikumBlok1 ? <KartuPraktikumBlok tuntasBlok={tuntasBlok1} terkirim={Boolean(praktikumBlok1)} /> : null}
            </section>

            <PanelPapanKualifikasi jumlahBabKualifikasi={[...bab.aktif, ...bab.selesai].filter((b) => b.ringkas.kualifikasi).length} />
            <PanelPenilaianRahasia terkirim={Boolean(praktikumBlok1)} />

            <details className="rounded-3xl border-2 border-indigo-100 bg-indigo-50/40 p-4">
              <summary className="cursor-pointer list-none text-base font-black text-indigo-950">🏅 Arti Predikat</summary>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {rapor.predikatScale.map((p) => (
                  <li key={p.code} className="flex items-start gap-2 rounded-2xl bg-white p-3">
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-sm font-black ${WARNA_PREDIKAT[p.colorTheme] ?? ""}`}>{p.code}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black text-indigo-950">
                        {p.label} <span className="font-semibold text-slate-500">({p.minScore}–{p.maxScore})</span>
                      </span>
                      <span className="block text-xs font-semibold leading-snug text-slate-600">{p.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ) : (
          <TabSertifikat profil={profil} tuntas={tuntas} praktikumTerkirim={praktikumTerkirim} />
        )}
      </div>
    </main>
  );
}
