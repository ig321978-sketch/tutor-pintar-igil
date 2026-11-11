"use client";

import { useMemo, useState } from "react";
import data from "@/data/komunitas-igil.json";
import { KepalaHalaman, angkaId, rupiah } from "@/components/rapor/umum";

type JenjangId = "sekolah" | "kecamatan" | "kabupaten" | "provinsi" | "nasional";

type Sekolah = (typeof data.sekolah)[number];

const LABEL_JENJANG: Record<JenjangId, string> = {
  sekolah: "Ranking sekolah",
  kecamatan: "Ranking kecamatan",
  kabupaten: "Ranking kabupaten/kota",
  provinsi: "Ranking provinsi",
  nasional: "Ranking nasional",
};

const WARNA_JENJANG: Record<JenjangId, string> = {
  sekolah: "bg-amber-400 text-indigo-950",
  kecamatan: "bg-emerald-100 text-emerald-900",
  kabupaten: "bg-sky-100 text-sky-900",
  provinsi: "bg-violet-100 text-violet-950",
  nasional: "bg-indigo-100 text-indigo-950",
};

function sisaKeAmbang(pelanggan: number, ambang: number): number {
  return Math.max(0, ambang - pelanggan);
}

function KartuSekolah({ sekolah, ambang }: { sekolah: Sekolah; ambang: number }) {
  const jenjang = sekolah.jenjangRanking as JenjangId;
  const siapPartner = jenjang === "sekolah" && sekolah.partner;
  const kurang = sisaKeAmbang(sekolah.pelanggan, ambang);
  const progres = Math.min(100, Math.round((sekolah.pelanggan / ambang) * 100));

  return (
    <article className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4 py-4 text-white sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Profil sekolah</p>
            <h3 className="break-words text-xl font-black leading-tight">{sekolah.nama}</h3>
            <p className="mt-1 text-sm font-semibold text-indigo-100">
              {sekolah.kecamatan}, {sekolah.kota} · {sekolah.provinsi}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-black ${WARNA_JENJANG[jenjang]}`}>
            {LABEL_JENJANG[jenjang]}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[10px] font-black uppercase text-indigo-100">Pelanggan</p>
            <p className="text-2xl font-black text-amber-300">{angkaId(sekolah.pelanggan)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[10px] font-black uppercase text-indigo-100">Poin bulan ini</p>
            <p className="text-2xl font-black text-amber-300">{angkaId(sekolah.capaian.poinBulanIni)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[10px] font-black uppercase text-indigo-100">Bab selesai</p>
            <p className="text-2xl font-black text-amber-300">{angkaId(sekolah.capaian.babSelesaiBulanIni)}</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
            <p className="text-[10px] font-black uppercase text-indigo-100">🌟 Sempurna</p>
            <p className="text-2xl font-black text-amber-300">{angkaId(sekolah.capaian.ujianSempurna)}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <div className="mb-1 flex items-center justify-between gap-2 text-xs font-black text-indigo-950">
            <span>Menuju ambang {angkaId(ambang)} pelanggan</span>
            <span>{progres}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-indigo-50">
            <div
              className="h-full rounded-full bg-amber-400 transition-all"
              style={{ width: `${progres}%` }}
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {kurang === 0
              ? "Sudah membuka ranking per-sekolah dan slot Partner IGIL."
              : `Kurang ${angkaId(kurang)} pelanggan lagi untuk ranking per-sekolah + Partner IGIL.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {sekolah.faseAktif.map((fase) => (
            <span
              key={fase}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-950"
            >
              {fase.replace("_", " ")}
            </span>
          ))}
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-900">
            Praktikum terkirim {angkaId(sekolah.capaian.praktikumTerkirim)}
          </span>
        </div>

        {siapPartner && sekolah.partner ? (
          <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-wider text-amber-700">Partner IGIL</p>
            <p className="mt-1 text-lg font-black text-indigo-950">{sekolah.partner.nama}</p>
            <p className="text-sm font-semibold text-slate-600">
              {sekolah.partner.mapel} · {sekolah.partner.jadwal}
            </p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-indigo-950">
              Membimbing singkat bab target minggu depan (±{data.partner.durasiPerKelasMenit} menit per kelas).
              Honor {rupiah(data.partner.honorMingguan)} / minggu · dibayar bulanan {rupiah(data.partner.honorBulanan)}.
            </p>
          </section>
        ) : (
          <section className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-4">
            <p className="text-sm font-black text-indigo-950">Partner IGIL belum aktif</p>
            <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
              Slot Partner Guru terbuka setelah sekolah mencapai minimal {angkaId(ambang)} siswa berlangganan.
              Sementara ini siswa ikut ranking {LABEL_JENJANG[jenjang].toLowerCase()}.
            </p>
          </section>
        )}

        {sekolah.siswaUnggulan.length > 0 ? (
          <section>
            <p className="mb-2 text-[11px] font-black uppercase tracking-wider text-indigo-900">
              Siswa unggulan (nama depan + inisial)
            </p>
            <ul className="space-y-2">
              {sekolah.siswaUnggulan.map((s) => (
                <li
                  key={`${sekolah.id}-${s.nama}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-indigo-950">{s.nama}</p>
                    <p className="text-xs font-semibold text-slate-500">
                      {s.kelas} · {s.fase.replace("_", " ")}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-indigo-950">
                    {angkaId(s.poin)} poin
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}

export default function KomunitasHalaman() {
  const [filterProvinsi, setFilterProvinsi] = useState(data.filterWilayah[0]);
  const [filterJenjang, setFilterJenjang] = useState<"Semua" | JenjangId>("Semua");
  const ambang = data.aturan.ambangSekolah;

  const daftar = useMemo(() => {
    return data.sekolah
      .filter((s) => filterProvinsi === "Semua" || s.provinsi === filterProvinsi)
      .filter((s) => filterJenjang === "Semua" || s.jenjangRanking === filterJenjang)
      .sort((a, b) => b.pelanggan - a.pelanggan || b.capaian.poinBulanIni - a.capaian.poinBulanIni);
  }, [filterProvinsi, filterJenjang]);

  const ringkas = useMemo(() => {
    const totalSekolah = data.sekolah.length;
    const totalPelanggan = data.sekolah.reduce((n, s) => n + s.pelanggan, 0);
    const siapPartner = data.sekolah.filter((s) => s.jenjangRanking === "sekolah").length;
    return { totalSekolah, totalPelanggan, siapPartner };
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl space-y-5 px-2 py-6 sm:px-4 sm:py-8">
      <KepalaHalaman
        lencana={data.header.badge}
        judul={data.header.title}
        subjudul={data.header.subtitle}
        ikon="🏫"
      />

      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Sekolah komunitas</p>
          <p className="mt-1 text-3xl font-black text-indigo-950">{angkaId(ringkas.totalSekolah)}</p>
        </div>
        <div className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Siswa berlangganan</p>
          <p className="mt-1 text-3xl font-black text-indigo-950">{angkaId(ringkas.totalPelanggan)}</p>
        </div>
        <div className="rounded-3xl border-2 border-amber-300 bg-amber-50 p-4 shadow-sm">
          <p className="text-[11px] font-black uppercase tracking-wider text-amber-800">Siap Partner IGIL</p>
          <p className="mt-1 text-3xl font-black text-indigo-950">{angkaId(ringkas.siapPartner)}</p>
        </div>
      </section>

      <section className="rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-lg font-black text-indigo-950">Aturan perankingan berjenjang</h2>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{data.aturan.catatanFase}</p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.aturan.jenjang.map((j, i) => (
            <li key={j.id} className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3">
              <p className="text-sm font-black text-indigo-950">
                <span aria-hidden="true">{j.ikon} </span>
                {i + 1}. {j.nama}
              </p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">{j.syarat}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="overflow-hidden rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-4 shadow-sm sm:p-5">
        <p className="text-[11px] font-black uppercase tracking-wider text-amber-700">{data.partner.judul}</p>
        <h2 className="mt-1 text-xl font-black text-indigo-950">{data.partner.ringkas}</h2>
        <ul className="mt-3 space-y-2">
          {data.partner.isiBimbingan.map((isi) => (
            <li key={isi} className="flex gap-2 text-sm font-semibold text-indigo-950">
              <span className="mt-0.5 text-amber-500" aria-hidden="true">
                ✓
              </span>
              <span>{isi}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-3 ring-1 ring-amber-200">
            <p className="text-[10px] font-black uppercase text-slate-500">Durasi</p>
            <p className="text-sm font-black text-indigo-950">
              {data.partner.durasiPerKelasMenit} menit / kelas
            </p>
            <p className="text-xs font-semibold text-slate-500">
              Contoh {data.partner.contohKelas} kelas ≈ {data.partner.durasiPerKelasMenit * data.partner.contohKelas}{" "}
              menit
            </p>
          </div>
          <div className="rounded-2xl bg-white p-3 ring-1 ring-amber-200">
            <p className="text-[10px] font-black uppercase text-slate-500">Honor mingguan</p>
            <p className="text-sm font-black text-indigo-950">{rupiah(data.partner.honorMingguan)}</p>
          </div>
          <div className="rounded-2xl bg-amber-400 p-3 text-indigo-950">
            <p className="text-[10px] font-black uppercase">Dibayar bulanan</p>
            <p className="text-lg font-black">{rupiah(data.partner.honorBulanan)}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter komunitas">
        {data.filterWilayah.map((wilayah) => {
          const aktif = wilayah === filterProvinsi;
          return (
            <button
              key={wilayah}
              type="button"
              aria-pressed={aktif}
              onClick={() => setFilterProvinsi(wilayah)}
              className={`rounded-full px-4 py-2 text-sm font-black ${
                aktif
                  ? "bg-amber-400 text-indigo-950"
                  : "border border-[#1C01A5] bg-white text-[#1C01A5] hover:bg-indigo-50"
              }`}
            >
              {wilayah}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter jenjang ranking">
        {(["Semua", "sekolah", "kecamatan", "kabupaten", "provinsi", "nasional"] as const).map((j) => {
          const aktif = j === filterJenjang;
          const label = j === "Semua" ? "Semua jenjang" : LABEL_JENJANG[j];
          return (
            <button
              key={j}
              type="button"
              aria-pressed={aktif}
              onClick={() => setFilterJenjang(j)}
              className={`rounded-full px-4 py-2 text-sm font-black ${
                aktif
                  ? "bg-[#1C01A5] text-amber-300"
                  : "border border-indigo-200 bg-white text-indigo-950 hover:bg-indigo-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {daftar.length === 0 ? (
        <p className="rounded-3xl border-2 border-indigo-100 bg-white p-6 text-center text-sm font-bold text-slate-500">
          Belum ada sekolah pada filter ini.
        </p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {daftar.map((sekolah) => (
            <KartuSekolah key={sekolah.id} sekolah={sekolah} ambang={ambang} />
          ))}
        </div>
      )}

      <p className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-3 text-sm font-semibold leading-relaxed text-indigo-950">
        <span aria-hidden="true">📌 </span>
        Data di halaman ini menampilkan contoh komunitas untuk pratinjau konsep. Nama siswa publik memakai format Nama
        Depan + Inisial. Poin Kualifikasi tetap indikator belajar (bukan uang). Honor Partner IGIL adalah pembayaran
        terpisah kepada guru pembimbing komunitas.
      </p>
    </main>
  );
}
