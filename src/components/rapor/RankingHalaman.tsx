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
const kolam = skema.currentMonthPoolSummary;
const ekonomi = data.tokenEconomy;
const bab1 = data.raporPage.sampleChaptersProgress[0];

type BarisPapan = {
  rank: number;
  nama: string;
  kelas: string;
  kota: string;
  provinsi: string;
  lencana: number;
  praktikumSiap: boolean;
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

  const tokenSaya = bab1.practiceTokens + bab1.examTokens + (bab1.practicumSubmitted ? bab1.practicumTokens : 0);
  const lencanaSaya = bab1.siPalingPintar ? 1 : 0;

  const papan = useMemo<BarisPapan[]>(() => {
    const dasar = ranking.leaderboardSample.map((s) => ({
      nama: s.studentName,
      kelas: s.grade,
      kota: s.city,
      provinsi: s.province,
      lencana: s.siPalingPintarCount,
      praktikumSiap: s.hiddenGradingReady,
      token: s.totalMonthlyTokens,
      milikPengguna: false,
    }));
    const saya = {
      nama,
      kelas,
      kota,
      provinsi: "",
      lencana: lencanaSaya,
      praktikumSiap: bab1.practicumSubmitted,
      token: tokenSaya,
      milikPengguna: true,
    };
    return [...dasar, saya]
      .sort((a, b) => b.token - a.token || b.lencana - a.lencana)
      .map((b, i) => ({ ...b, rank: i + 1 }));
  }, [nama, kelas, kota, tokenSaya, lencanaSaya]);

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
            <p className="text-[11px] font-black uppercase text-indigo-100">Token</p>
            <p className="text-3xl font-black text-amber-300">{angkaId(tokenSaya)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[11px] font-black uppercase text-indigo-100">Si Pintar</p>
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
          <span className="text-right">Token</span>
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
                    title="Lencana Si Paling Pintar"
                  >
                    🌟 {b.lencana}
                  </span>
                  <span
                    className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-black ${
                      b.praktikumSiap ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {b.praktikumSiap ? "✓ Diserahkan" : "Belum"}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <p className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-3 text-sm font-semibold leading-relaxed text-indigo-950">
        <span aria-hidden="true">📌 </span>
        Pada akhir bulan, peringkat pemenang beasiswa ditentukan dari gabungan Token Kualifikasi Bulanan (30/70/50),
        lencana Si Paling Pintar (lulus 100% percobaan pertama dengan kamera valid 1 wajah), dan pembukaan skor
        tersembunyi Praktikum (Hidden Grading).
      </p>
    </div>
  );
}

function AliranDana() {
  const plafon = kolam.operational10PercentRupiah - kolam.realServerCostRupiah - kolam.operationalSurplusReturnedRupiah;
  const potong = [
    { label: "Biaya server riil", nilai: kolam.realServerCostRupiah, warna: "bg-indigo-300 text-indigo-950" },
    { label: "Plafon hidup layak founder", nilai: plafon, warna: "bg-[#1C01A5] text-white" },
    { label: "Surplus kembali ke beasiswa", nilai: kolam.operationalSurplusReturnedRupiah, warna: "bg-amber-400 text-indigo-950" },
  ];
  const jumlah = kolam.operational10PercentRupiah;
  return (
    <section className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-base font-black text-indigo-950">🔎 Ke mana 10% Kolam Operasional pergi?</h3>
      <div className="mt-3 flex h-10 overflow-hidden rounded-full ring-1 ring-indigo-100" role="img" aria-label="Pembagian kolam operasional">
        {potong.map((p) => (
          <div
            key={p.label}
            className={`flex items-center justify-center text-[11px] font-black ${p.warna}`}
            style={{ width: `${(p.nilai / jumlah) * 100}%` }}
          >
            {Math.round((p.nilai / jumlah) * 100)}%
          </div>
        ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {potong.map((p) => (
          <li key={p.label} className="flex items-center gap-2 text-sm font-bold text-indigo-950">
            <span aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 rounded-full ${p.warna.split(" ")[0]}`} />
            <span className="min-w-0 flex-1">{p.label}</span>
            <span className="shrink-0 tabular-nums">{rupiah(p.nilai)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs font-semibold text-slate-500">
        Status plafon biaya hidup layak founder: {kolam.founderLivingCapStatus}.
      </p>
    </section>
  );
}

function TabBeasiswa() {
  const [p90, p10] = skema.pillars;
  const metrik = [
    { ikon: "🎯", judul: "Dana Langsung 90%", nilai: rupiah(kolam.DirectScholarship90PercentRupiah), warna: "bg-white" },
    {
      ikon: "🖥️",
      judul: "Biaya Server Riil & Operasional",
      nilai: rupiah(kolam.operational10PercentRupiah - kolam.operationalSurplusReturnedRupiah),
      warna: "bg-white",
    },
    {
      ikon: "♻️",
      judul: "Surplus Operasional Dikembalikan",
      nilai: rupiah(kolam.operationalSurplusReturnedRupiah),
      warna: "bg-white",
    },
    {
      ikon: "🏆",
      judul: "Total Kolam Beasiswa Aktif",
      nilai: rupiah(kolam.totalActiveScholarshipPoolRupiah),
      warna: "bg-amber-400",
    },
  ];
  return (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-6">
        <h2 className="text-lg font-black leading-snug">{skema.title}</h2>
        <div
          className="mt-4 flex h-14 overflow-hidden rounded-2xl text-xl font-black"
          role="img"
          aria-label="Diagram pembagian 90 persen beasiswa dan 10 persen operasional"
        >
          <div className="flex items-center justify-center bg-amber-400 text-indigo-950" style={{ width: "90%" }}>
            90%
          </div>
          <div className="flex items-center justify-center bg-white text-sm text-[#1C01A5]" style={{ width: "10%" }}>
            10%
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {[p90, p10].map((p, i) => (
            <div key={p.percentage} className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
              <p className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-0.5 text-lg font-black ${i === 0 ? "bg-amber-400 text-indigo-950" : "bg-white text-[#1C01A5]"}`}
                >
                  {p.percentage}
                </span>
                <span className="min-w-0 flex-1 text-sm font-black leading-snug">{p.title}</span>
              </p>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-indigo-100">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-label="Metrik kolam bulan berjalan" className="space-y-2">
        <h3 className="text-base font-black text-indigo-950">📅 {kolam.periodLabel}</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {metrik.map((m) => (
            <div key={m.judul} className={`rounded-2xl border-2 border-indigo-100 p-3 shadow-sm ${m.warna}`}>
              <p className="text-2xl leading-none" aria-hidden="true">
                {m.ikon}
              </p>
              <p className="mt-1 text-xs font-black leading-tight text-indigo-950/80">{m.judul}</p>
              <p className="mt-1 break-words text-base font-black leading-tight text-indigo-950 sm:text-lg">{m.nilai}</p>
            </div>
          ))}
        </div>
        <p className="rounded-2xl bg-amber-50 p-3 text-sm font-black text-indigo-950">
          <Koin kelas="mr-1 h-5 w-5" />
          Setara {angkaId(kolam.equivalentTokens)} token ({rupiah(ekonomi.tokenValueRupiah)} per token)
        </p>
      </section>

      <AliranDana />

      <section aria-label="Arsip penyaluran beasiswa" className="space-y-3">
        <h3 className="text-base font-black text-indigo-950">📚 Arsip Penyaluran Bulanan</h3>
        {ranking.scholarshipDisbursementReports.map((r) => (
          <article key={r.batchId} className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm">
            <header className="flex flex-wrap items-center gap-2 bg-[#1C01A5] p-4 text-white">
              <div className="min-w-0 flex-1">
                <p className="text-lg font-black">{r.periodLabel}</p>
                <p className="text-xs font-semibold text-indigo-200">
                  Disalurkan {r.disbursementDate} · {r.batchId}
                </p>
              </div>
              <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-emerald-950">
                ✓ {r.status}
              </span>
            </header>
            <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-4">
              {[
                ["Total kolam", rupiah(r.totalPoolRupiah)],
                ["Dari 90%", rupiah(r.from90PercentRupiah)],
                ["Dari surplus", rupiah(r.fromOperationalSurplusRupiah)],
                ["Penerima", `${angkaId(r.totalRecipients)} siswa`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-indigo-50/40 p-2.5">
                  <p className="text-[11px] font-black uppercase text-indigo-950/60">{k}</p>
                  <p className="text-sm font-black text-indigo-950">{v}</p>
                </div>
              ))}
            </div>
            <ul className="space-y-2 p-3 pt-0">
              {r.topRecipientsHighlight.map((s, i) => (
                <li key={s.verificationCode} className="rounded-2xl border-2 border-indigo-100 p-3">
                  <div className="flex items-start gap-3">
                    <Medali rank={i + 1} />
                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-black text-indigo-950">{s.studentName}</p>
                      <p className="text-xs font-semibold text-slate-500">
                        {s.grade} · {s.city}
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#1C01A5]">{s.category}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-indigo-950">
                      {rupiah(s.scholarshipAmountRupiah)}
                    </span>
                  </div>
                  <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-indigo-50/40 p-2">
                      <dt className="font-bold text-slate-500">Total token</dt>
                      <dd className="font-black text-indigo-950">
                        <Koin kelas="mr-1 h-4 w-4" />
                        {angkaId(s.tokensAchieved)}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-indigo-50/40 p-2">
                      <dt className="font-bold text-slate-500">Skor akhir Praktikum</dt>
                      <dd className="font-black text-indigo-950">{s.hiddenPracticumScore}</dd>
                    </div>
                  </dl>
                  <p className="mt-2 break-all rounded-xl bg-[#1C01A5] px-2.5 py-1.5 font-mono text-xs font-black text-amber-300">
                    {s.verificationCode}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
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
