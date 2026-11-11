"use client";

import Link from "next/link";
import { angkaId, rupiah } from "@/components/rapor/umum";
import {
  LABEL_JENJANG,
  WARNA_JENJANG,
  komunitasData,
  sisaKeAmbang,
  type JenjangId,
  type Sekolah,
} from "./komunitas-data";

export default function ProfilSekolah({ sekolah }: { sekolah: Sekolah }) {
  const ambang = komunitasData.aturan.ambangSekolah;
  const jenjang = sekolah.jenjangRanking as JenjangId;
  const siapPartner = jenjang === "sekolah" && sekolah.partner;
  const kurang = sisaKeAmbang(sekolah.pelanggan, ambang);
  const progres = Math.min(100, Math.round((sekolah.pelanggan / ambang) * 100));

  return (
    <div className="space-y-4">
      <Link
        href="/komunitas"
        className="inline-flex items-center gap-2 rounded-full border-2 border-[#1C01A5] bg-white px-4 py-2 text-sm font-black text-[#1C01A5] hover:bg-indigo-50"
      >
        ← Kembali ke daftar komunitas
      </Link>

      <article className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 px-4 py-4 text-white sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Profil sekolah</p>
              <h1 className="break-words text-2xl font-black leading-tight sm:text-3xl">{sekolah.nama}</h1>
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
              <span key={fase} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-950">
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
                Membimbing singkat bab target minggu depan (±{komunitasData.partner.durasiPerKelasMenit} menit per
                kelas). Honor {rupiah(komunitasData.partner.honorMingguan)} / minggu · dibayar bulanan{" "}
                {rupiah(komunitasData.partner.honorBulanan)}.
              </p>
            </section>
          ) : (
            <section className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-4">
              <p className="text-sm font-black text-indigo-950">Partner IGIL belum aktif</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
                Slot Partner Guru terbuka setelah sekolah mencapai minimal {angkaId(ambang)} siswa berlangganan.
                Sementara ini siswa masuk arena {LABEL_JENJANG[jenjang].toLowerCase()}.
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
    </div>
  );
}
