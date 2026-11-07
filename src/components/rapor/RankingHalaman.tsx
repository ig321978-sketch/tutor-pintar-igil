"use client";

import { useMemo, useState } from "react";
import data from "@/data/rapor-dan-ranking.json";
import {
  KepalaHalaman,
  Koin,
  SpanduContoh,
  SubTabBar,
  angkaId,
  rupiah,
  usePenandaMenit,
  useProfilSiswa,
} from "./umum";

const ranking = data.rankingPage;
const skema = ranking.scholarshipScheme9010;
const bab1 = data.raporPage.sampleChaptersProgress[0];
const BAB_PER_BLOK = data.tokenEconomy.perBlockChapters;
const POIN_LATIHAN = data.tokenEconomy.perChapterTokens.practice;
const POIN_UJIAN = data.tokenEconomy.perChapterTokens.exam;
const POIN_PRAKTIKUM = data.tokenEconomy.perChapterTokens.practicum;
const POIN_BLOK_PENUH = (POIN_LATIHAN + POIN_UJIAN) * BAB_PER_BLOK + POIN_PRAKTIKUM;
/** Praktikum hanya bisa dikirim setelah satu blok penuh (4 bab) lulus Ujian 100%. */
const PRAKTIKUM_SAYA_DIKIRIM =
  bab1.practicumSubmitted && data.raporPage.sampleChaptersProgress.length >= BAB_PER_BLOK;

type BarisPapan = {
  rank: number;
  nama: string;
  kelas: string;
  kota: string;
  provinsi: string;
  lencana: number;
  praktikumSiap: boolean;
  latihan: number;
  ujian: number;
  praktikum: number;
  token: number;
  milikPengguna: boolean;
};

function sisaWaktu(): { hari: number; jam: number; menit: number } {
  const WIB = 7 * 3600 * 1000;
  const sekarang = Date.now();
  const w = new Date(sekarang + WIB);
  const akhir = Date.UTC(w.getUTCFullYear(), w.getUTCMonth() + 1, 1) - WIB - 60 * 1000;
  const selisih = Math.max(0, akhir - sekarang);
  return {
    hari: Math.floor(selisih / 86400000),
    jam: Math.floor((selisih % 86400000) / 3600000),
    menit: Math.floor((selisih % 3600000) / 60000),
  };
}

function Medali({ rank }: { rank: number }) {
  const gaya =
    rank === 1
      ? "bg-amber-400 text-indigo-950 ring-amber-200"
      : rank === 2
        ? "bg-slate-300 text-slate-800 ring-slate-100"
        : rank === 3
          ? "bg-orange-400 text-white ring-orange-200"
          : "bg-indigo-50 text-indigo-950 ring-indigo-100";
  return (
    <span
      className={`flex h-11 w-11 shrink-0 self-start md:self-center items-center justify-center rounded-full text-lg font-black ring-4 ${gaya}`}
      aria-label={`Peringkat ${rank}`}
    >
      {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : rank}
    </span>
  );
}

function TabPeringkat() {
  const [filter, setFilter] = useState<string>(ranking.gradeFilters[0]);
  const { nama, kelas, kota } = useProfilSiswa();
  const menit = usePenandaMenit();
  const sisa = useMemo(() => (menit ? sisaWaktu() : null), [menit]);

  const praktikumSaya = PRAKTIKUM_SAYA_DIKIRIM ? POIN_PRAKTIKUM : 0;
  const tokenSaya = bab1.practiceTokens + bab1.examTokens + praktikumSaya;
  const lencanaSaya = bab1.firstTryPerfect ? 1 : 0;

  const papan = useMemo<BarisPapan[]>(() => {
    const dasar = ranking.leaderboardSample.map((s) => ({
      nama: s.studentName,
      kelas: s.grade,
      kota: s.city,
      provinsi: s.province,
      lencana: s.firstTryPerfectCount,
      praktikumSiap: s.hiddenGradingReady,
      latihan: s.practiceTokens,
      ujian: s.examTokens,
      praktikum: s.practicumTokens,
      token: s.practiceTokens + s.examTokens + s.practicumTokens,
      milikPengguna: false,
    }));
    const saya = {
      nama,
      kelas,
      kota,
      provinsi: "",
      lencana: lencanaSaya,
      praktikumSiap: PRAKTIKUM_SAYA_DIKIRIM,
      latihan: bab1.practiceTokens,
      ujian: bab1.examTokens,
      praktikum: praktikumSaya,
      token: tokenSaya,
      milikPengguna: true,
    };
    return [...dasar, saya]
      .sort((a, b) => b.token - a.token || b.lencana - a.lencana)
      .map((b, i) => ({ ...b, rank: i + 1 }));
  }, [nama, kelas, kota, tokenSaya, lencanaSaya, praktikumSaya]);

  const saya = papan.find((b) => b.milikPengguna);
  const tampil = papan.filter((b) => filter === ranking.gradeFilters[0] || b.kelas === filter);

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-6">
        <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Posisimu Bulan Ini</p>
        <p className="break-words text-xl font-black leading-tight">{nama}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[11px] font-black uppercase text-indigo-100">Peringkat</p>
            <p className="text-3xl font-black text-amber-300">#{saya?.rank ?? "–"}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[11px] font-black uppercase text-indigo-100">Poin</p>
            <p className="text-3xl font-black text-amber-300">{angkaId(tokenSaya)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[11px] font-black uppercase text-indigo-100">Kualifikasi</p>
            <p className="text-3xl font-black text-amber-300">🌟{lencanaSaya}</p>
          </div>
        </div>
        <div className="mt-3 rounded-2xl bg-amber-400 p-3 text-center text-indigo-950">
          <p className="text-xs font-black uppercase tracking-wide">⏳ Pengumuman beasiswa dalam</p>
          <p className="text-2xl font-black tabular-nums">
            {sisa ? `${sisa.hari} hari · ${sisa.jam} jam · ${sisa.menit} menit` : "…"}
          </p>
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter jenjang kelas">
        {ranking.gradeFilters.map((f) => {
          const menyala = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={menyala}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                menyala
                  ? "border-amber-400 bg-amber-400 text-indigo-950"
                  : "border-[#1C01A5] bg-white text-[#1C01A5] hover:bg-indigo-50"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <section aria-label="Papan peringkat nasional" className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm">
        <div className="hidden grid-cols-[3.5rem_1fr_6rem_4rem_8rem_6rem] items-center gap-3 bg-[#1C01A5] px-4 py-3 text-xs font-black uppercase tracking-wide text-white md:grid">
          <span aria-label="Peringkat">No.</span>
          <span>Siswa</span>
          <span>Kelas</span>
          <span className="text-center">🌟</span>
          <span>Praktikum</span>
          <span className="text-right">Poin</span>
        </div>
        {tampil.length === 0 ? (
          <p className="p-6 text-center text-sm font-bold text-slate-500">Belum ada siswa di jenjang ini bulan ini.</p>
        ) : (
          <ol>
            {tampil.map((b) => (
              <li
                key={`${b.nama}-${b.rank}`}
                className={`grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-t border-indigo-100 px-3 py-3 first:border-t-0 md:grid-cols-[3.5rem_1fr_6rem_4rem_8rem_6rem] md:px-4 ${
                  b.milikPengguna ? "bg-amber-50" : b.rank <= 3 ? "bg-indigo-50/40" : "bg-white"
                }`}
              >
                <Medali rank={b.rank} />
                <div className="min-w-0">
                  <p className="break-words text-sm font-black leading-tight text-indigo-950">
                    {b.nama}
                    {b.milikPengguna ? (
                      <span className="ml-1.5 rounded-full bg-[#1C01A5] px-2 py-0.5 text-[10px] font-black text-amber-300">
                        KAMU
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    {b.kota}
                    {b.provinsi ? `, ${b.provinsi}` : ""}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-snug text-slate-500">
                    Latihan {angkaId(b.latihan)} + Ujian {angkaId(b.ujian)} + Praktikum {angkaId(b.praktikum)} ={" "}
                    <span className="font-black text-indigo-950">{angkaId(b.token)}</span>
                  </p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-indigo-950 md:order-last md:justify-self-end">
                  <Koin kelas="mr-1 h-4 w-4" />
                  {angkaId(b.token)}
                </span>
                <div className="col-span-3 flex flex-wrap items-center gap-2 pl-[3.5rem] md:contents">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-black text-indigo-950 md:bg-transparent md:px-0 md:text-sm">
                    {b.kelas}
                  </span>
                  <span
                    className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-black text-indigo-950 md:bg-transparent md:px-0 md:text-center md:text-sm"
                    title="Papan Kualifikasi Beasiswa"
                  >
                    🌟 {b.lencana}
                  </span>
                  <span
                    className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-black ${
                      b.praktikumSiap ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <span className="md:hidden">Praktikum: </span>
                    {b.praktikumSiap ? "✓ Sudah dikirim" : "Belum dikirim"}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <p className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-3 text-sm font-semibold leading-relaxed text-indigo-950">
        <span aria-hidden="true">📌 </span>
        Cara membaca poin: Latihan {POIN_LATIHAN} dan Ujian {POIN_UJIAN} didapat di setiap bab. Praktikum {POIN_PRAKTIKUM}{" "}
        didapat sekali per blok {BAB_PER_BLOK} bab, setelah keempat bab lulus Ujian 100%. Jadi satu blok penuh ={" "}
        {(POIN_LATIHAN + POIN_UJIAN) * BAB_PER_BLOK} + {POIN_PRAKTIKUM} = {POIN_BLOK_PENUH} Poin Kualifikasi. &quot;Sudah dikirim&quot; hanya
        berarti Praktikum sudah diserahkan. Skornya masih tersembunyi sampai pengumuman.
        <br />
        Jika poin sama, urutan ditentukan oleh jumlah 🌟 (Ujian 100% di percobaan pertama). Pada akhir bulan, kandidat
        penerima beasiswa ditentukan dari peringkat ini dan pembukaan skor tersembunyi Praktikum (Hidden Grading).
      </p>
    </div>
  );
}

type Penerima = { nama: string; kelas: string; kota: string; nominalRupiah: number };
type LaporanBulan = {
  id: string;
  periodLabel: string;
  status: string;
  jumlahSiswa: number;
  totalDanaRupiah: number;
  kolamBeasiswaRupiah: number;
  penerima: Penerima[];
  alasanBelumTerdistribusi: string;
};
const LAPORAN = ranking.laporanBeasiswa as LaporanBulan[];

function KartuAngka({ ikon, judul, nilai, catatan, sorot }: { ikon: string; judul: string; nilai: string; catatan?: string; sorot?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 border-indigo-100 p-3 shadow-sm ${sorot ? "bg-amber-400" : "bg-white"}`}>
      <p className="text-2xl leading-none" aria-hidden="true">
        {ikon}
      </p>
      <p className="mt-1 text-xs font-black leading-tight text-indigo-950/80">{judul}</p>
      <p className="mt-1 break-words text-lg font-black leading-tight text-indigo-950">{nilai}</p>
      {catatan ? <p className="mt-1 text-[11px] font-bold leading-snug text-indigo-950/70">{catatan}</p> : null}
    </div>
  );
}

function TabBeasiswa() {
  const [p90, p10] = skema.pillars;
  const [idAktif, setIdAktif] = useState(LAPORAN[0].id);
  const lap = LAPORAN.find((l) => l.id === idAktif) ?? LAPORAN[0];

  const kolamBeasiswa = lap.kolamBeasiswaRupiah;
  const terdistribusi = lap.penerima.reduce((n, p) => n + p.nominalRupiah, 0);
  const belum = kolamBeasiswa - terdistribusi;

  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-6">
        <h2 className="text-lg font-black leading-snug">{skema.title}</h2>
        <div
          className="mt-4 flex h-14 overflow-hidden rounded-2xl text-xl font-black"
          role="img"
          aria-label="Diagram pembagian 90 persen Kolam Beasiswa dan 10 persen Kolam Operasional"
        >
          <div className="flex items-center justify-center bg-amber-400 text-indigo-950" style={{ width: "90%" }}>
            90%
          </div>
          <div className="flex items-center justify-center bg-white text-sm text-[#1C01A5]" style={{ width: "10%" }}>
            10%
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {[p90, p10].map((p, i) => (
            <p key={p.percentage} className="flex items-center gap-2 rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
              <span
                className={`rounded-full px-3 py-0.5 text-lg font-black ${i === 0 ? "bg-amber-400 text-indigo-950" : "bg-white text-[#1C01A5]"}`}
              >
                {p.percentage}
              </span>
              <span className="min-w-0 flex-1 text-sm font-black leading-snug">{p.title}</span>
            </p>
          ))}
        </div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Pilih bulan laporan">
        {LAPORAN.map((l) => {
          const menyala = l.id === lap.id;
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={menyala}
              onClick={() => setIdAktif(l.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                menyala
                  ? "border-amber-400 bg-amber-400 text-indigo-950"
                  : "border-[#1C01A5] bg-white text-[#1C01A5] hover:bg-indigo-50"
              }`}
            >
              {l.periodLabel}
              {l.status === "berjalan" ? " (berjalan)" : ""}
            </button>
          );
        })}
      </div>

      <section aria-label={`Ringkasan dana ${lap.periodLabel}`} className="space-y-2">
        <h3 className="text-base font-black text-indigo-950">📅 {lap.periodLabel}</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <KartuAngka ikon="👧" judul="Jumlah Siswa" nilai={`${angkaId(lap.jumlahSiswa)} siswa`} />
          <KartuAngka ikon="💰" judul="Total Dana" nilai={rupiah(lap.totalDanaRupiah)} />
          <div className="col-span-2 md:col-span-1">
            <KartuAngka
              ikon="🏆"
              judul="Kolam Beasiswa"
              nilai={rupiah(kolamBeasiswa)}
              sorot
            />
          </div>
        </div>
      </section>

      <section aria-label="Beasiswa terdistribusikan" className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm">
        <header className="flex items-center gap-2 bg-[#1C01A5] p-4 text-white">
          <p className="min-w-0 flex-1 text-base font-black leading-tight">✅ Beasiswa Terdistribusikan</p>
          <span className="shrink-0 rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-indigo-950">
            {rupiah(terdistribusi)}
          </span>
        </header>
        {lap.penerima.length === 0 ? (
          <p className="p-4 text-sm font-bold text-slate-500">Belum ada penerima. Daftar muncul setelah bulan ditutup.</p>
        ) : (
          <ul>
            {lap.penerima.map((p) => (
              <li key={p.nama + p.kota} className="flex items-center gap-3 border-t border-indigo-100 px-4 py-3 first:border-t-0">
                <div className="min-w-0 flex-1">
                  <p className="break-words text-sm font-black leading-tight text-indigo-950">{p.nama}</p>
                  <p className="text-xs font-semibold text-slate-500">
                    {p.kelas} · {p.kota}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-black tabular-nums text-indigo-950">{rupiah(p.nominalRupiah)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Beasiswa belum terdistribusikan" className="rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 text-base font-black leading-tight text-indigo-950">⏳ Beasiswa Belum Terdistribusikan</p>
          <span className="shrink-0 rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-indigo-950">{rupiah(belum)}</span>
        </div>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-indigo-950">
          <span className="font-black">Alasan: </span>
          {lap.alasanBelumTerdistribusi}
        </p>
      </section>

      <p className="rounded-2xl bg-amber-50 p-3 text-sm font-black text-indigo-950">
        <Koin kelas="mr-1 h-5 w-5" />
        Poin Kualifikasi bukan uang tunai dan tidak punya nilai tukar tetap. Poin hanya menentukan peringkat kandidat di
        fase ini.
      </p>
    </div>
  );
}

export default function RankingHalaman() {
  const [tab, setTab] = useState(ranking.subTabs[0].id);
  return (
    <main className="flex-1 bg-white text-slate-700">
      <div className="mx-auto w-full max-w-4xl space-y-4 px-2 py-4 sm:py-8">
        <KepalaHalaman
          ikon="🏆"
          lencana={ranking.header.badge}
          judul={ranking.header.title}
          subjudul={ranking.header.subtitle}
        />
        <SpanduContoh>
          Tampilan contoh dengan nama dan angka rekaan. Data nasional asli tersambung setelah fungsi RPC dan jadwal akhir
          bulan di Supabase siap.
        </SpanduContoh>
        <SubTabBar tabs={ranking.subTabs} aktif={tab} onPilih={setTab} />
        {tab === "papan-peringkat" ? <TabPeringkat /> : <TabBeasiswa />}
      </div>
    </main>
  );
}
