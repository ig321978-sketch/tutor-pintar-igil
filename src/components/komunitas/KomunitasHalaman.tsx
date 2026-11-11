"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { KepalaHalaman, angkaId, rupiah } from "@/components/rapor/umum";
import {
  LABEL_JENJANG,
  WARNA_JENJANG,
  komunitasData as data,
  type JenjangId,
} from "./komunitas-data";

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

      <div>
        <h2 className="mb-3 text-lg font-black text-indigo-950">Daftar komunitas</h2>
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

        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter jenjang ranking">
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
      </div>

      {daftar.length === 0 ? (
        <p className="rounded-3xl border-2 border-indigo-100 bg-white p-6 text-center text-sm font-bold text-slate-500">
          Belum ada sekolah pada filter ini.
        </p>
      ) : (
        <section
          aria-label="Tabel daftar komunitas sekolah"
          className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#1C01A5] text-xs font-black uppercase tracking-wide text-white">
                  <th scope="col" className="px-3 py-3 sm:px-4">
                    No.
                  </th>
                  <th scope="col" className="px-3 py-3 sm:px-4">
                    Sekolah
                  </th>
                  <th scope="col" className="hidden px-3 py-3 sm:table-cell sm:px-4">
                    Wilayah
                  </th>
                  <th scope="col" className="px-3 py-3 text-right sm:px-4">
                    Pelanggan
                  </th>
                  <th scope="col" className="hidden px-3 py-3 text-right md:table-cell md:px-4">
                    Poin
                  </th>
                  <th scope="col" className="px-3 py-3 sm:px-4">
                    Arena
                  </th>
                  <th scope="col" className="hidden px-3 py-3 lg:table-cell lg:px-4">
                    Partner
                  </th>
                </tr>
              </thead>
              <tbody>
                {daftar.map((sekolah, i) => {
                  const jenjang = sekolah.jenjangRanking as JenjangId;
                  const partnerAktif = jenjang === "sekolah" && !!sekolah.partner;
                  const kurang = Math.max(0, ambang - sekolah.pelanggan);
                  return (
                    <tr
                      key={sekolah.id}
                      className={`border-t border-indigo-100 ${i % 2 === 0 ? "bg-white" : "bg-indigo-50/30"}`}
                    >
                      <td className="px-3 py-3 align-top text-sm font-black text-indigo-950 sm:px-4">
                        {i + 1}
                      </td>
                      <td className="px-3 py-3 align-top sm:px-4">
                        <Link
                          href={`/komunitas/${sekolah.id}`}
                          className="text-sm font-black text-[#1C01A5] underline decoration-amber-400 decoration-2 underline-offset-2 hover:text-amber-600"
                        >
                          {sekolah.nama}
                        </Link>
                        <p className="mt-0.5 text-xs font-semibold text-slate-500 sm:hidden">
                          {sekolah.kota}, {sekolah.provinsi}
                        </p>
                      </td>
                      <td className="hidden px-3 py-3 align-top text-sm font-semibold text-slate-600 sm:table-cell sm:px-4">
                        {sekolah.kecamatan}
                        <br />
                        <span className="text-xs">
                          {sekolah.kota} · {sekolah.provinsi}
                        </span>
                      </td>
                      <td className="px-3 py-3 align-top text-right sm:px-4">
                        <span className="text-sm font-black text-indigo-950">{angkaId(sekolah.pelanggan)}</span>
                        {kurang > 0 ? (
                          <p className="text-[10px] font-semibold text-slate-500">−{angkaId(kurang)} ke {ambang}</p>
                        ) : (
                          <p className="text-[10px] font-semibold text-emerald-700">Ambang tercapai</p>
                        )}
                      </td>
                      <td className="hidden px-3 py-3 align-top text-right text-sm font-black text-indigo-950 md:table-cell md:px-4">
                        {angkaId(sekolah.capaian.poinBulanIni)}
                      </td>
                      <td className="px-3 py-3 align-top sm:px-4">
                        <span
                          className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-black ${WARNA_JENJANG[jenjang]}`}
                        >
                          {LABEL_JENJANG[jenjang].replace("Ranking ", "")}
                        </span>
                      </td>
                      <td className="hidden px-3 py-3 align-top text-sm font-semibold lg:table-cell lg:px-4">
                        {partnerAktif && sekolah.partner ? (
                          <span className="text-indigo-950">{sekolah.partner.nama}</span>
                        ) : (
                          <span className="text-slate-400">Belum aktif</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="border-t border-indigo-100 bg-indigo-50/40 px-4 py-3 text-xs font-semibold text-slate-600">
            Ketuk nama sekolah untuk membuka profil dan data capaian.
          </p>
        </section>
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
