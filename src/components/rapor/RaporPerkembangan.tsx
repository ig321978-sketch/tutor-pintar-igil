"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import * as KURIKULUM from "@/lib/kurikulum";
import { TOTAL_SUBBAB } from "@/lib/bab-rapor";
import { bulanJakarta, type GudangCapaian } from "@/lib/capaian";
import { gabungJejak, uraiJejak, type JejakBab } from "@/lib/jejak-tahap";
import { akunPerangkat } from "@/lib/jejak-tahap-klien";
import { useSemuaPraktikumTerkirim } from "@/lib/praktikum-blok";
import {
  DETIK_CEPAT,
  DETIK_LAMBAT,
  JUMLAH_TAHAP,
  LABEL_KECEPATAN,
  LABEL_STATUS,
  NAMA_TAHAP,
  PARAMETER_PRAKTIKUM,
  diagnosisBab,
  faseKelas,
  hitungAktivitas,
  jejakSmiscpa,
  kelasDariTeks,
  lencanaSiswa,
  namaTahap,
  panduanRumah,
  persenEksplorasi,
  praktikumTerbuka,
  statusBab,
  telemetriBab,
  type BabKelas,
  type KeadaanBab,
  type StatusBab,
  type Telemetri,
  type Tren,
} from "@/lib/rapor-perkembangan";
import type { ProfilTampil } from "./umum";

/* ------------------------------ Data bab per kelas (dari kurikulum) ------------------------------ */

/** JUDUL_MTK_<kelas>_BAB<nomor> menjadi daftar bab per kelas. Bab baru ikut otomatis. */
const BAB_PER_KELAS: Record<number, BabKelas[]> = (() => {
  const hasil: Record<number, BabKelas[]> = {};
  for (const [nama, nilai] of Object.entries(KURIKULUM)) {
    const m = /^JUDUL_MTK_(\d)_BAB(\d+)$/.exec(nama);
    if (!m || typeof nilai !== "string") continue;
    const kelas = Number(m[1]);
    const nomor = Number(m[2]);
    (hasil[kelas] ??= []).push({ kode: `mtk-${kelas}-bab${nomor}`, nomor, judul: nilai.replace(/^Bab \d+:\s*/, "") });
  }
  for (const daftar of Object.values(hasil)) daftar.sort((a, b) => a.nomor - b.nomor);
  return hasil;
})();
const KELAS_TERSEDIA = Object.keys(BAB_PER_KELAS).map(Number).sort((a, b) => a - b);

/* ------------------------------ Jejak tahap SMISCPA di perangkat ------------------------------ */

const KUNCI_JEJAK = "igil_jejak_tahap_v1";

function bacaJejakMentah(): string {
  try {
    return window.localStorage.getItem(KUNCI_JEJAK) ?? "{}";
  } catch {
    return "{}";
  }
}

function langganStorage(panggil: () => void): () => void {
  window.addEventListener("storage", panggil);
  return () => window.removeEventListener("storage", panggil);
}

/** Jejak tahap per bab untuk anak aktif di perangkat ini, digabung dengan jejak tamu (yang lebih jauh menang). */
function useJejakSemuaBab(): Record<string, JejakBab> | null {
  const mentah = useSyncExternalStore(langganStorage, bacaJejakMentah, () => "");
  return useMemo(() => {
    if (mentah === "") return null;
    let gudang: Record<string, Record<string, unknown>> = {};
    try {
      const x = JSON.parse(mentah) as unknown;
      if (x && typeof x === "object" && !Array.isArray(x)) gudang = x as typeof gudang;
    } catch {
      /* data rusak: anggap kosong */
    }
    const akun = akunPerangkat();
    const hasil: Record<string, JejakBab> = {};
    for (const ruang of [gudang.tamu, gudang[akun]]) {
      if (!ruang || typeof ruang !== "object") continue;
      for (const [bab, j] of Object.entries(ruang)) {
        const jejak = uraiJejak(j);
        hasil[bab] = hasil[bab] ? gabungJejak(hasil[bab], jejak) : jejak;
      }
    }
    return hasil;
  }, [mentah]);
}

/* ------------------------------ Potongan tampilan ------------------------------ */

const WARNA_STATUS: Record<StatusBab, string> = {
  lulus: "bg-emerald-100 text-emerald-900",
  mengulang: "bg-amber-100 text-amber-900",
  belajar: "bg-indigo-100 text-indigo-950",
  belum: "bg-slate-100 text-slate-600",
};
const IKON_STATUS: Record<StatusBab, string> = { lulus: "✅", mengulang: "🔁", belajar: "📖", belum: "⚪" };
const TEKS_TREN: Record<Tren, string> = {
  naik: "📈 Nilai naik",
  turun: "📉 Nilai turun",
  stabil: "➖ Stabil",
  satu: "Baru 1 percobaan",
  belum: "Belum Ujian",
};

function Bagian({ nomor, judul, sub, children }: { nomor: number; judul: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="break-inside-avoid rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-[11px] font-black uppercase tracking-wider text-amber-600">Bagian {nomor}</p>
      <h2 className="text-lg font-black leading-snug text-indigo-950">{judul}</h2>
      <p className="mt-0.5 text-xs font-semibold leading-snug text-slate-600">{sub}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function detikTeks(d: number | null): string {
  if (d === null) return "belum tercatat";
  if (d < 60) return `${d} detik`;
  const m = Math.floor(d / 60);
  const s = d % 60;
  return s ? `${m} menit ${s} detik` : `${m} menit`;
}

function TahapBar({ tahapTerbuka, selesai }: { tahapTerbuka: number; selesai: boolean }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {NAMA_TAHAP.map((nama, i) => {
        const nomor = i + 1;
        const tuntas = selesai || nomor < tahapTerbuka;
        const kini = !selesai && nomor === tahapTerbuka;
        return (
          <span
            key={nama}
            title={nama}
            className={`h-2.5 flex-1 rounded-full ${tuntas ? "bg-emerald-500" : kini ? "bg-amber-400" : "bg-slate-200"}`}
          />
        );
      })}
    </div>
  );
}

function KartuTelemetri({ t }: { t: Telemetri }) {
  return (
    <div className="grid gap-2 text-xs font-semibold text-slate-700 sm:grid-cols-2">
      <div className="rounded-2xl bg-indigo-50/60 p-3">
        <p className="font-black text-indigo-950">✏️ Latihan</p>
        <p>
          {t.latihanTerjawab} soal dijawab · {t.latihanBenar} tepat
        </p>
        <p>Waktu per soal: {detikTeks(t.detikLatihan)}</p>
      </div>
      <div className="rounded-2xl bg-indigo-50/60 p-3">
        <p className="font-black text-indigo-950">📝 Ujian Kualifikasi</p>
        <p>
          {t.percobaanUjian} percobaan · skor terbaik {t.skorTerbaik ?? "–"} · {TEKS_TREN[t.tren]}
        </p>
        <p>Waktu per soal: {detikTeks(t.detikUjianPerSoal)}</p>
      </div>
      {t.riwayat.length > 0 ? (
        <div className="rounded-2xl bg-white p-3 ring-1 ring-indigo-100 sm:col-span-2">
          <p className="font-black text-indigo-950">Riwayat percobaan Ujian</p>
          <ol className="mt-1 flex flex-wrap gap-1.5">
            {t.riwayat.map((p, i) => (
              <li
                key={`${p.waktu}-${i}`}
                className={`rounded-full px-2 py-0.5 font-black ${p.nilai === 100 ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700"}`}
              >
                #{i + 1}: {p.nilai}
                {p.detik ? ` · ${Math.round(p.detik / 60)}m` : ""}
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      <p className="rounded-2xl bg-amber-50 p-3 sm:col-span-2">
        <span className="font-black text-indigo-950">⏱️ Kecepatan & konsistensi nalar: </span>
        {LABEL_KECEPATAN[t.kecepatan]}
      </p>
    </div>
  );
}

/* ------------------------------ Komponen utama ------------------------------ */

export default function RaporPerkembangan({
  profil,
  capaian,
  tuntas,
  hariIni,
}: {
  profil: ProfilTampil;
  capaian: GudangCapaian;
  tuntas: ReadonlySet<string>;
  hariIni: Date;
}) {
  const jejakSemua = useJejakSemuaBab();
  const praktikum = useSemuaPraktikumTerkirim();
  const kelasProfil = kelasDariTeks(profil.kelas);
  const [kelasPilih, setKelasPilih] = useState<number | null>(null);
  const kelas = kelasPilih ?? (kelasProfil && BAB_PER_KELAS[kelasProfil] ? kelasProfil : (KELAS_TERSEDIA[0] ?? 1));
  const bulanIni = bulanJakarta(hariIni);

  const daftar = useMemo(() => {
    return (BAB_PER_KELAS[kelas] ?? []).map((bab) => {
      const c = capaian[bab.kode];
      const jejak = jejakSemua?.[bab.kode];
      const lulus = tuntas.has(bab.kode);
      const sub = jejakSmiscpa(c, jejak, TOTAL_SUBBAB[bab.kode] ?? 0);
      return {
        bab,
        status: statusBab(c, jejak, lulus),
        sub,
        eksplorasi: persenEksplorasi(sub),
        telemetri: telemetriBab(c),
        saran: diagnosisBab(c, sub, lulus),
      };
    });
  }, [kelas, capaian, jejakSemua, tuntas]);

  const keadaan: KeadaanBab[] = daftar.map(({ bab, status, saran }) => ({ bab, status, saran }));
  const ditempuh = daftar.filter((d) => d.status !== "belum");
  const babLulus = daftar.filter((d) => d.status === "lulus").length;
  const aktivitas = hitungAktivitas(capaian);
  const adaJejak = Object.keys(jejakSemua ?? {}).length > 0;
  const lencana = lencanaSiswa({
    babLulus,
    babKelas: daftar.length,
    lulusPertama: aktivitas.lulusPertama,
    percobaanTotal: aktivitas.percobaanTotal,
    adaAktivitas: aktivitas.adaAktivitas || adaJejak,
  });
  const persenKelas = daftar.length ? Math.round((babLulus / daftar.length) * 100) : 0;
  const daftarPraktikum = Object.entries(praktikum ?? {}).sort(([, a], [, b]) => (a.dikirimPada < b.dikirimPada ? 1 : -1));

  if (jejakSemua === null || praktikum === null) {
    return <div className="h-56 animate-pulse rounded-3xl bg-indigo-50" role="status" aria-label="Menyusun rapor" />;
  }

  return (
    <div id="rapor-perkembangan" className="space-y-4">
      <style>{`@media print{body *{visibility:hidden}#rapor-perkembangan,#rapor-perkembangan *{visibility:visible}#rapor-perkembangan{position:absolute;left:0;top:0;width:100%}.tanpa-cetak{display:none!important}#rapor-perkembangan section{box-shadow:none}*{-webkit-print-color-adjust:exact;print-color-adjust:exact}}`}</style>

      {/* Kepala rapor */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white shadow-lg sm:p-6">
        <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Rapor Perkembangan Ilmu & Logika · {bulanIni}</p>
        <h2 className="mt-1 break-words text-2xl font-black leading-tight">{profil.nama}</h2>
        <p className="text-sm font-semibold text-indigo-100">
          {profil.kelas} · {profil.kota} · Fase {faseKelas(kelas)}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {lencana.length > 0 ? (
            lencana.map((l) => (
              <span key={l.kode} className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-indigo-950" title={l.alasan}>
                <span aria-hidden="true">{l.ikon}</span> {l.nama}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-bold">Lencana pertama menunggu di bab pertamamu</span>
          )}
        </div>
        <p className="mt-3 text-xs font-semibold leading-snug text-indigo-100">
          Bukan sekadar angka: rapor ini menunjukkan apa yang sudah dikuasai Ananda, bagaimana ia bernalar, dan apa yang perlu didampingi bulan depan.
        </p>
      </section>

      <div className="tanpa-cetak flex flex-wrap items-center gap-2">
        <label className="text-sm font-black text-indigo-950" htmlFor="pilih-kelas">
          Kelas:
        </label>
        <select
          id="pilih-kelas"
          value={kelas}
          onChange={(e) => setKelasPilih(Number(e.target.value))}
          className="min-h-[44px] rounded-xl border-2 border-indigo-100 bg-white px-3 text-sm font-bold text-indigo-950"
        >
          {KELAS_TERSEDIA.map((k) => (
            <option key={k} value={k}>
              Kelas {k} (Fase {faseKelas(k)})
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => window.print()}
          className="ml-auto flex min-h-[44px] items-center gap-2 rounded-2xl border-amber-400 bg-amber-400 px-4 text-sm font-black text-indigo-950 shadow-md hover:bg-amber-300"
        >
          <span aria-hidden="true">🖨️</span> Cetak / Simpan PDF
        </button>
      </div>

      {/* 1. Peta ketuntasan dan eksplorasi */}
      <Bagian nomor={1} judul="🗺️ Peta Ketuntasan Silabus & Eksplorasi" sub="Status setiap bab Kurikulum Merdeka dan jejak 7 tahap SMISCPA (Story sampai Abstract) di setiap Sub-Bab.">
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {daftar.map((d) => (
            <li key={d.bab.kode} className="flex items-center gap-2 rounded-2xl border border-indigo-100 px-3 py-2">
              <span aria-hidden="true">{IKON_STATUS[d.status]}</span>
              <span className="min-w-0 flex-1 text-sm font-bold leading-snug text-indigo-950">
                Bab {d.bab.nomor}: {d.bab.judul}
              </span>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${WARNA_STATUS[d.status]}`}>{LABEL_STATUS[d.status]}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs font-semibold text-slate-600">
          🔁 Mengulang tetap berhak meraih Poin Kualifikasi beasiswa begitu Ujian mencapai 100.
        </p>

        {ditempuh.length > 0 ? (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-black text-indigo-950">Jejak eksplorasi SMISCPA & Simulasi</p>
            {ditempuh.map((d) => (
              <div key={d.bab.kode} className="break-inside-avoid rounded-2xl bg-indigo-50/50 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-black text-indigo-950">Bab {d.bab.nomor}</p>
                  <p className="text-xs font-black text-indigo-700">{d.eksplorasi}% tahap dijelajahi</p>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {d.sub.map((s) => (
                    <li key={s.huruf} className="grid grid-cols-[4.5rem_1fr] items-center gap-2 text-xs font-semibold text-slate-700">
                      <span>
                        Sub-Bab {s.huruf}
                        {s.simulasiDibuka ? " 🎛️" : ""}
                      </span>
                      <span>
                        <TahapBar tahapTerbuka={s.tahapTerbuka} selesai={s.selesai} />
                        <span className="sr-only">
                          {s.selesai ? "Semua tahap selesai" : `Sampai tahap ${namaTahap(s.tahapTerbuka)}`}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-[11px] font-semibold text-slate-500">
              Urutan tahap: {NAMA_TAHAP.join(" → ")}. Hijau = tuntas, kuning = sedang dikerjakan. 🎛️ = alat peraga Simulasi sudah dibuka.
            </p>
          </div>
        ) : null}
      </Bagian>

      {/* 2. Telemetri */}
      <Bagian
        nomor={2}
        judul="⏱️ Telemetri Latihan & Ujian Kualifikasi"
        sub={`Berapa kali Ananda berlatih dan menguji diri pada bank soal acak, berapa lama tiap soal dikerjakan (di bawah ${DETIK_CEPAT} detik terlalu cepat, di atas ${Math.round(DETIK_LAMBAT / 60)} menit belum lancar), dan kartu yang perlu diulang.`}
      >
        {ditempuh.length === 0 ? (
          <p className="text-sm font-semibold text-slate-600">Belum ada Latihan atau Ujian di kelas ini.</p>
        ) : (
          <div className="space-y-4">
            {ditempuh.map((d) => (
              <div key={d.bab.kode} className="break-inside-avoid">
                <p className="mb-2 text-sm font-black text-indigo-950">
                  Bab {d.bab.nomor}: {d.bab.judul}
                </p>
                <KartuTelemetri t={d.telemetri} />
                {d.saran.length > 0 ? (
                  <div className="mt-2 rounded-2xl border-2 border-dashed border-amber-300 p-3">
                    <p className="text-xs font-black text-indigo-950">🩺 Diagnosis: kartu yang perlu dipelajari ulang</p>
                    <ul className="mt-1 space-y-1 text-xs font-semibold text-slate-700">
                      {d.saran.map((s, i) => (
                        <li key={i}>
                          <span className="font-black text-indigo-950">
                            Kartu {namaTahap(s.tahap)}
                            {s.subBab ? ` · Sub-Bab ${s.subBab}` : " · semua Sub-Bab"}
                          </span>{" "}
                          — {s.alasan}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-[11px] font-semibold text-slate-500">Diagnosis tidak pernah menyebut soal atau kuncinya.</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </Bagian>

      {/* 3. Praktikum */}
      <Bagian nomor={3} judul="🧪 Rincian 4 Parameter Praktikum" sub="Kualitas logika dinilai satu kali saat Praktikum diserahkan. Nilainya disembunyikan sampai pengumuman akhir bulan.">
        <ul className="grid gap-2 sm:grid-cols-2">
          {PARAMETER_PRAKTIKUM.map((p) => (
            <li key={p.kode} className="rounded-2xl bg-indigo-50/60 p-3">
              <p className="text-sm font-black text-indigo-950">
                {p.nama} <span className="text-amber-600">({p.bobot}%)</span>
              </p>
              <p className="text-xs font-semibold leading-snug text-slate-600">{p.arti}</p>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-2">
          {daftarPraktikum.length === 0 ? (
            <p className="text-sm font-semibold text-slate-600">
              Belum ada Praktikum yang diserahkan.{" "}
              <Link href="/praktikum" className="tanpa-cetak font-black text-[#1C01A5] underline underline-offset-4">
                Lihat tab Praktikum
              </Link>
            </p>
          ) : (
            daftarPraktikum.map(([id, k]) => {
              const bulanKirim = bulanJakarta(new Date(k.dikirimPada));
              const terbuka = praktikumTerbuka(bulanKirim, bulanIni);
              return (
                <div key={id} className="flex flex-wrap items-center gap-2 rounded-2xl border border-indigo-100 p-3 text-sm">
                  <span className="min-w-0 flex-1 font-black text-indigo-950">
                    {id.replace(/^pilot-/, "").replace(/^mtk-(\d)-bab(\d+)/, "Kelas $1 Bab $2").replace(/^mtk-1-blok1$/, "Blok 1 Kelas 1")}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">Diserahkan {new Date(k.dikirimPada).toLocaleDateString("id-ID")}</span>
                  <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-black text-indigo-950">
                    {terbuka ? "⏳ Menunggu nilai dari server" : "🔒 Rahasia hingga akhir bulan"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </Bagian>

      {/* 4. Evaluasi suara */}
      <Bagian nomor={4} judul="🎙️ Kartu Bukti Evaluasi Suara AI" sub="Khusus nominator Live Test: rekaman asli Ananda menjelaskan 'bagaimana' dan 'mengapa', beserta catatan analisis Blind AI.">
        <div className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-4 text-center">
          <p className="text-3xl" aria-hidden="true">
            🔒
          </p>
          <p className="mt-1 text-sm font-black text-indigo-950">Belum ada Live Test</p>
          <p className="mt-1 text-xs font-semibold leading-snug text-slate-600">
            Kartu ini terisi bila Ananda terpilih sebagai nominator beasiswa. Orang tua dapat memutar ulang rekaman suaranya dan membaca skor serta
            ulasan logika lisan yang dinilai AI tanpa campur tangan staf pengawas.
          </p>
        </div>
      </Bagian>

      {/* 5. Misi bulan depan */}
      <Bagian nomor={5} judul="🚀 Rekomendasi Misi Bulan Depan & Lencana" sub={`Posisi kesiapan Ananda di Fase ${faseKelas(kelas)} dan satu saran pendampingan di rumah.`}>
        <div className="rounded-2xl bg-indigo-50/60 p-3">
          <div className="flex items-center justify-between text-sm font-black text-indigo-950">
            <span>
              Kesiapan Kelas {kelas} · Fase {faseKelas(kelas)}
            </span>
            <span>
              {babLulus} dari {daftar.length} bab ({persenKelas}%)
            </span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-indigo-100">
            <div className="h-full rounded-full bg-amber-400" style={{ width: `${persenKelas}%` }} />
          </div>
        </div>
        {lencana.length > 0 ? (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {lencana.map((l) => (
              <li key={l.kode} className="flex items-start gap-2 rounded-2xl border-2 border-amber-300 bg-amber-50 p-3">
                <span className="text-2xl" aria-hidden="true">
                  {l.ikon}
                </span>
                <span>
                  <span className="block text-sm font-black text-indigo-950">{l.nama}</span>
                  <span className="block text-xs font-semibold text-slate-600">{l.alasan}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-3 rounded-2xl border-2 border-[#1C01A5] bg-white p-3">
          <p className="text-xs font-black uppercase tracking-wider text-[#1C01A5]">🏡 Panduan Pendampingan Rumah</p>
          <p className="mt-1 text-sm font-bold leading-snug text-indigo-950">{panduanRumah(keadaan, kelas)}</p>
        </div>
      </Bagian>

      <p className="rounded-2xl bg-amber-50 p-3 text-xs font-semibold leading-snug text-indigo-950">
        Setiap bulan orang tua menerima diagnosis perkembangan nalar anak. Beasiswa 90% adalah bonus prestasi yang transparan, bukan syarat
        untuk mendapatkan manfaat belajar. Tahap SMISCPA: {JUMLAH_TAHAP} kartu per Sub-Bab.
      </p>
    </div>
  );
}
