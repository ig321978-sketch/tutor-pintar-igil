"use client";

import { useMemo, useState } from "react";
import { KepalaHalaman, SpanduContoh, angkaId, rupiah } from "@/components/rapor/umum";
import {
  DATA_LAPORAN,
  NAMA_FASE,
  URUTAN_FASE,
  buatCsvLaporan,
  hitungLaporan,
  type HasilLaporan,
} from "@/lib/laporan-transparansi";

function Persen({ nilai, total }: { nilai: number; total: number }) {
  return <>{total > 0 ? Math.round((nilai / total) * 1000) / 10 : 0}%</>;
}

function Ubin({ ikon, judul, nilai, catatan, emas = false }: { ikon: string; judul: string; nilai: string; catatan: string; emas?: boolean }) {
  return (
    <div className={`rounded-2xl border-2 border-indigo-100 p-3 shadow-sm ${emas ? "bg-amber-400" : "bg-white"}`}>
      <p className="text-2xl leading-none" aria-hidden="true">
        {ikon}
      </p>
      <p className="mt-1 text-xs font-black leading-tight text-indigo-950/80">{judul}</p>
      <p className="mt-1 break-words text-lg font-black leading-tight text-indigo-950">{nilai}</p>
      <p className="mt-0.5 text-[11px] font-semibold leading-snug text-indigo-950/70">{catatan}</p>
    </div>
  );
}

function BilahPembagian({ label, bagian }: { label: string; bagian: { nama: string; nilai: number; warna: string }[] }) {
  const total = bagian.reduce((n, b) => n + b.nilai, 0);
  return (
    <div>
      <div className="flex h-10 overflow-hidden rounded-full ring-1 ring-indigo-100" role="img" aria-label={label}>
        {bagian
          .filter((b) => b.nilai > 0)
          .map((b) => (
            <div
              key={b.nama}
              className={`flex items-center justify-center text-[11px] font-black ${b.warna}`}
              style={{ width: `${(b.nilai / total) * 100}%` }}
            >
              {b.nilai / total >= 0.12 ? <Persen nilai={b.nilai} total={total} /> : null}
            </div>
          ))}
      </div>
      <ul className="mt-3 space-y-1.5">
        {bagian.map((b) => (
          <li key={b.nama} className="flex items-center gap-2 text-sm font-bold text-indigo-950">
            <span aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 rounded-full ${b.warna.split(" ")[0]}`} />
            <span className="min-w-0 flex-1">{b.nama}</span>
            <span className="shrink-0 tabular-nums">{rupiah(b.nilai)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BagianJudul({ ikon, judul, isi }: { ikon: string; judul: string; isi?: string }) {
  return (
    <div>
      <h3 className="text-lg font-black leading-snug text-indigo-950">
        <span aria-hidden="true">{ikon} </span>
        {judul}
      </h3>
      {isi ? <p className="mt-0.5 text-sm font-semibold leading-relaxed text-slate-600">{isi}</p> : null}
    </div>
  );
}

function KartuFase({ h, fase }: { h: HasilLaporan; fase: (typeof URUTAN_FASE)[number] }) {
  const info = NAMA_FASE[fase];
  const ditutup = h.masukan.status === "ditutup";
  const p = h.penyaluran;
  const baris: [string, string][] = [
    ["Pemasukan langganan fase ini", rupiah(h.masukan.pemasukan[fase])],
    ["90% masuk kantong fase", rupiah(h.kantong90[fase])],
    [`Limpahan surplus (${angkaId(h.masukan.pelangganAktif[fase])} pelanggan)`, ditutup ? rupiah(h.limpahan[fase]) : "Dihitung saat tutup bulan"],
  ];
  return (
    <article className="overflow-hidden rounded-3xl border-2 border-indigo-100 bg-white shadow-sm">
      <header className="flex items-center gap-2 bg-[#1C01A5] px-4 py-3 text-white">
        <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-black text-indigo-950">FASE {info.huruf}</span>
        <span className="text-base font-black">{info.kelas}</span>
      </header>
      <dl className="space-y-1.5 p-3">
        {baris.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-2 text-sm">
            <dt className="min-w-0 flex-1 font-semibold text-slate-600">{k}</dt>
            <dd className="shrink-0 text-right font-black tabular-nums text-indigo-950">{v}</dd>
          </div>
        ))}
        <div className="flex items-start justify-between gap-2 rounded-xl bg-amber-400 p-2 text-sm">
          <dt className="min-w-0 flex-1 font-black text-indigo-950">{ditutup ? "Kantong beasiswa akhir" : "Kantong sementara"}</dt>
          <dd className="shrink-0 text-right font-black tabular-nums text-indigo-950">{rupiah(h.kantongAkhir[fase])}</dd>
        </div>
        {p ? (
          <>
            <div className="flex items-start justify-between gap-2 text-sm">
              <dt className="min-w-0 flex-1 font-semibold text-slate-600">Disalurkan ({angkaId(p.penerima[fase])} penerima)</dt>
              <dd className="shrink-0 text-right font-black tabular-nums text-emerald-800">{rupiah(p.disalurkan[fase])}</dd>
            </div>
            <div className="flex items-start justify-between gap-2 text-sm">
              <dt className="min-w-0 flex-1 font-semibold text-slate-600">Sisa dibawa ke bulan depan</dt>
              <dd className="shrink-0 text-right font-black tabular-nums text-indigo-950">{rupiah(p.sisaBawaBulanDepan[fase])}</dd>
            </div>
          </>
        ) : null}
      </dl>
    </article>
  );
}

function unduhCsv(h: HasilLaporan) {
  const blob = new Blob(["\uFEFF", buatCsvLaporan(h)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `laporan-transparansi-igil-${h.masukan.id}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function LaporanTransparansi() {
  const semua = useMemo(() => DATA_LAPORAN.map(hitungLaporan), []);
  const [idAktif, setIdAktif] = useState(semua[0].masukan.id);
  const h = semua.find((x) => x.masukan.id === idAktif) ?? semua[0];
  const ditutup = h.masukan.status === "ditutup";
  const semuaCocok = h.cekHitung.every((c) => c.cocok);
  const tersedia = Math.max(0, h.operasional10 - h.totalBiayaServer);

  return (
    <main className="flex-1 bg-white text-slate-700">
      <div className="mx-auto w-full max-w-4xl space-y-5 px-2 py-4 sm:py-8">
        <KepalaHalaman
          ikon="🔍"
          lencana="Laporan Terbuka Setiap Bulan"
          judul="Ke Mana Uang Langganan Pergi?"
          subjudul="Setiap rupiah langganan dicatat dan dibuka untuk semua pelanggan: berapa masuk, berapa ke beasiswa, berapa untuk server, dan berapa yang sudah disalurkan ke anak-anak."
        />
        <SpanduContoh>
          Angka di halaman ini masih contoh dengan nama dan nominal rekaan. Laporan asli tersambung setelah fungsi baca
          laporan di server siap, dengan bentuk yang sama persis.
        </SpanduContoh>

        <div role="tablist" aria-label="Pilih bulan laporan" className="grid grid-cols-3 gap-2">
          {semua.map((x) => {
            const menyala = x.masukan.id === idAktif;
            return (
              <button
                key={x.masukan.id}
                type="button"
                role="tab"
                aria-selected={menyala}
                onClick={() => setIdAktif(x.masukan.id)}
                className={`rounded-2xl p-2.5 text-center ${
                  menyala
                    ? "border-amber-400 bg-[#1C01A5] text-white shadow-md"
                    : "border-indigo-100 bg-white text-indigo-950 hover:border-amber-400"
                }`}
              >
                <span className="block text-sm font-black leading-tight">{x.masukan.label}</span>
                <span className={`block text-[11px] font-bold ${menyala ? "text-amber-300" : "text-slate-500"}`}>
                  {x.masukan.status === "berjalan" ? "Sedang berjalan" : "Sudah ditutup"}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs font-semibold text-slate-500">{h.masukan.keteranganPeriode}</p>

        <section aria-label="Ringkasan" className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Ubin ikon="💰" judul="Pemasukan langganan" nilai={rupiah(h.totalPemasukan)} catatan="Seluruh langganan bulan ini" />
          <Ubin ikon="🎓" judul="Kantong Beasiswa (90%)" nilai={rupiah(h.beasiswa90)} catatan="Langsung ke kantong tiap fase" />
          <Ubin ikon="🖥️" judul="Kolam Operasional (10%)" nilai={rupiah(h.operasional10)} catatan="Server, biaya hidup, lalu sisanya kembali" />
          {h.penyaluran ? (
            <Ubin emas ikon="✅" judul="Sudah disalurkan" nilai={rupiah(h.penyaluran.totalDisalurkan)} catatan={`${angkaId(h.penyaluran.totalPenerima)} anak penerima`} />
          ) : (
            <Ubin emas ikon="⏳" judul="Penyaluran" nilai="Akhir bulan" catatan="Setelah uji lisan selesai" />
          )}
        </section>

        <section className="space-y-3 rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
          <BagianJudul ikon="1️⃣" judul="Langkah 1 · Pembagian 90 : 10" />
          <BilahPembagian
            label="Pembagian 90 persen beasiswa dan 10 persen operasional"
            bagian={[
              { nama: "Kantong Beasiswa (90%)", nilai: h.beasiswa90, warna: "bg-amber-400 text-indigo-950" },
              { nama: "Kolam Operasional (10%)", nilai: h.operasional10, warna: "bg-[#1C01A5] text-white" },
            ]}
          />
        </section>

        <section className="space-y-3 rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
          <BagianJudul
            ikon="2️⃣"
            judul="Langkah 2 · Pemakaian Kolam Operasional (10%)"
            isi="Hanya dua hal yang boleh dibayar dari kolam ini. Sisa yang ada 100% kembali ke beasiswa."
          />
          {ditutup ? (
            <BilahPembagian
              label="Pemakaian kolam operasional"
              bagian={[
                { nama: "Biaya server yang sebenarnya", nilai: h.totalBiayaServer, warna: "bg-indigo-300 text-indigo-950" },
                { nama: "Biaya hidup layak founder (ada plafon)", nilai: h.plafonDiambil, warna: "bg-[#1C01A5] text-white" },
                { nama: "Surplus kembali ke Kantong Beasiswa", nilai: h.surplus, warna: "bg-amber-400 text-indigo-950" },
              ]}
            />
          ) : (
            <p className="rounded-2xl bg-amber-50 p-3 text-sm font-bold leading-snug text-indigo-950">
              Bulan masih berjalan. Biaya server sampai hari ini sudah tercatat di bawah. Biaya hidup founder dan surplus
              baru dihitung saat bulan ditutup.
            </p>
          )}

          <div className="rounded-2xl bg-indigo-50/40 p-3">
            <p className="text-sm font-black text-indigo-950">🧾 Rincian biaya server{ditutup ? "" : " sampai hari ini"}</p>
            <ul className="mt-2 space-y-2">
              {h.masukan.biayaServer.map((b) => (
                <li key={b.nama} className="flex items-start gap-2 text-sm">
                  <span className="min-w-0 flex-1">
                    <span className="block font-black text-indigo-950">{b.nama}</span>
                    <span className="block text-xs font-semibold text-slate-500">{b.keterangan}</span>
                  </span>
                  <span className="shrink-0 font-black tabular-nums text-indigo-950">{rupiah(b.rupiah)}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 rounded-xl bg-emerald-50 p-2 text-sm">
                <span className="min-w-0 flex-1">
                  <span className="block font-black text-emerald-900">Panggilan AI saat siswa belajar</span>
                  <span className="block text-xs font-semibold text-emerald-800">
                    Materi, Latihan, dan Ujian dibuat sekali lalu disimpan, tidak memanggil AI.
                  </span>
                </span>
                <span className="shrink-0 font-black tabular-nums text-emerald-900">{rupiah(0)}</span>
              </li>
              <li className="flex items-center gap-2 border-t border-indigo-100 pt-2 text-sm font-black text-indigo-950">
                <span className="min-w-0 flex-1">Total biaya server</span>
                <span className="shrink-0 tabular-nums">{rupiah(h.totalBiayaServer)}</span>
              </li>
            </ul>
          </div>

          {ditutup ? (
            <div className="rounded-2xl bg-indigo-50/40 p-3">
              <p className="text-sm font-black text-indigo-950">🏠 Biaya hidup layak founder</p>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
                Diambil hanya dari yang tersisa setelah biaya server ({rupiah(tersedia)}), dan tidak pernah melewati
                plafon bulanan {rupiah(h.masukan.plafonFounder)}.
              </p>
              <div
                className="mt-2 h-3 overflow-hidden rounded-full bg-white ring-1 ring-indigo-100"
                role="img"
                aria-label={`Terpakai ${rupiah(h.plafonDiambil)} dari plafon ${rupiah(h.masukan.plafonFounder)}`}
              >
                <div
                  className="h-full rounded-full bg-[#1C01A5]"
                  style={{ width: `${Math.min(100, (h.plafonDiambil / h.masukan.plafonFounder) * 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs font-black text-indigo-950">
                Terpakai {rupiah(h.plafonDiambil)} dari plafon {rupiah(h.masukan.plafonFounder)}
              </p>
            </div>
          ) : null}
        </section>

        <section className="space-y-3">
          <BagianJudul
            ikon="3️⃣"
            judul="Langkah 3 · Kantong Beasiswa tiap fase"
            isi="Setiap fase punya kantong sendiri. Surplus operasional dibagi menurut jumlah pelanggan aktif di tiap fase."
          />
          <div className="grid gap-3 md:grid-cols-3">
            {URUTAN_FASE.map((f) => (
              <KartuFase key={f} h={h} fase={f} />
            ))}
          </div>
          {h.penyaluran ? (
            <p className="rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 p-3 text-sm font-semibold leading-relaxed text-indigo-950">
              Disalurkan {h.penyaluran.tanggal} lewat payment gateway · kode batch{" "}
              <span className="break-all font-mono font-black text-[#1C01A5]">{h.penyaluran.rujukanBatch}</span>. Dana
              yang tidak punya penerima tidak hilang. Ia dibawa ke kantong fase yang sama bulan depan (sisa:{" "}
              {rupiah(h.penyaluran.totalSisa)}).
            </p>
          ) : null}
        </section>

        <section className="space-y-3 rounded-3xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm sm:p-5">
          <BagianJudul ikon="✅" judul="Bukti IGIL benar-benar berjalan" />
          <ul className="grid gap-2 sm:grid-cols-2">
            {h.masukan.bukti.map((b) => (
              <li key={b.label} className="rounded-2xl bg-white p-3">
                <p className="text-[11px] font-black uppercase text-indigo-950/60">{b.label}</p>
                <p className="text-lg font-black text-[#1C01A5]">{b.nilai}</p>
                <p className="text-xs font-semibold text-slate-500">{b.catatan}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3 rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
          <BagianJudul ikon="🧮" judul="Cek hitung otomatis" isi="Setiap angka di atas dihitung dari rumus yang sama, lalu diperiksa silang." />
          <ul className="space-y-2">
            {h.cekHitung.map((c) => (
              <li key={c.label} className="flex items-start gap-3 rounded-2xl bg-indigo-50/40 p-3">
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    c.cocok ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {c.cocok ? "✓" : "!"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-black text-indigo-950">{c.label}</span>
                  <span className="block text-xs font-semibold text-slate-500">{c.rumus}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className={`rounded-2xl p-3 text-sm font-black ${semuaCocok ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}>
            {semuaCocok ? "Semua pemeriksaan cocok." : "Ada angka yang tidak cocok. Laporan ini perlu diperiksa."}
          </p>
          <button
            type="button"
            onClick={() => unduhCsv(h)}
            className="w-full rounded-2xl border-amber-400 bg-amber-400 px-4 py-3 text-base font-black text-indigo-950 shadow-md hover:bg-amber-300 sm:w-auto"
          >
            ⬇️ Unduh laporan {h.masukan.label} (CSV)
          </button>
          <p className="text-xs font-semibold text-slate-500">
            Berkas dibuat di perangkatmu, bisa dibuka di Excel atau Google Sheets dan dihitung ulang sendiri.
          </p>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-5">
          <h3 className="text-lg font-black">Yang tidak ada di laporan ini</h3>
          <ul className="mt-2 space-y-1.5 text-sm font-semibold leading-snug text-indigo-100">
            <li>• Kolam Operasional hanya dipakai untuk biaya server dan biaya hidup layak founder (ada plafon). Sisanya kembali ke beasiswa.</li>
            <li>• Poin Kualifikasi bukan uang. Nominal beasiswa ditentukan dari isi kantong fase, bukan jumlah poin.</li>
            <li>• Laporan ini tidak memuat data pribadi anak, nomor rekening, maupun NISN.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
