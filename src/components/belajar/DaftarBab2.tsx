"use client";

import Link from "next/link";
import { KONFIGURASI } from "./konfig";
import { useSiap, useSimpanan } from "./pakai-simpanan";
import { EMAS, ROYAL } from "./Pelabuhan";

const IDS = Object.keys(KONFIGURASI) as Array<keyof typeof KONFIGURASI>;
const SUB = [
  { kode: "A", judul: "Sub-Bab A · Cerita Penjumlahan", ringkas: "Menggabungkan, ada yang datang lagi, dan menulis kalimat penjumlahan." },
  { kode: "B", judul: "Sub-Bab B · Berbagai Cara Menjumlahkan", ringkas: "Pasangan bilangan, tukar tempat, garis bilangan, penjumlahan berulang, dan pasangan sepuluh." },
  { kode: "C", judul: "Sub-Bab C · Soal Cerita Penjumlahan", ringkas: "Menyelesaikan soal cerita, termasuk cerita roda kendaraan." },
];

const tanggal = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long" }) : "");

/** Halaman awal Bab 2: semua materi per Sub-Bab, status penguasaan, ulangan harian, dan laporan. */
export default function DaftarBab2() {
  const siap = useSiap();
  const simpan = useSimpanan(IDS.map((i) => KONFIGURASI[i].skillId));
  const status = IDS.map((id) => {
    const k = KONFIGURASI[id];
    const s = simpan[k.skillId];
    const lulus = s.status.lulusTerakhir !== null;
    const sudahCoba = s.catatan.length > 0;
    return { id, k, lulus, sudahCoba, jatuhTempo: s.status.jatuhTempo };
  });
  if (!siap) return <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}><p className="mx-auto max-w-2xl text-center font-bold">Memuat…</p></main>;
  const lulusSemua = status.filter((x) => x.lulus).length;
  const berikut = status.find((x) => !x.lulus)?.id;
  return (
    <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-extrabold" style={{ color: ROYAL }}>
          Bab 2 · Penjumlahan sampai 10
        </h1>
        <p className="mt-1 text-sm">Draf perlu review. Ada 3 Sub-Bab dan 10 materi. Tiap materi diakhiri cek 5 soal.</p>
        <p className="mt-2 font-bold" aria-live="polite">
          {lulusSemua} dari {IDS.length} materi sudah lulus
        </p>
        <div className="mt-2 h-3 rounded-full bg-[#cfc6f5]" role="progressbar" aria-valuemin={0} aria-valuemax={IDS.length} aria-valuenow={lulusSemua}>
          <div className="h-3 rounded-full" style={{ width: `${(lulusSemua / IDS.length) * 100}%`, background: EMAS }} />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/ruang-belajar/mtk-1-bab2-ulangan" className="min-h-12 rounded-2xl px-5 py-3 text-lg font-bold shadow" style={{ background: EMAS, color: "#2a1f66" }}>
            Ulangan harian
          </Link>
          <Link href="/ruang-belajar/mtk-1-bab2-laporan" className="min-h-12 rounded-2xl border-2 bg-white px-5 py-3 text-lg font-bold" style={{ borderColor: ROYAL, color: ROYAL }}>
            Laporan
          </Link>
        </div>
        {SUB.map((sb) => (
          <section key={sb.kode} className="mt-6 rounded-3xl p-4 text-white" style={{ background: ROYAL }}>
            <h2 className="text-xl font-extrabold" style={{ color: EMAS }}>
              {sb.judul}
            </h2>
            <p className="mb-3 text-sm">{sb.ringkas}</p>
            <ul className="space-y-2">
              {status
                .filter((x) => x.k.sub.startsWith(`Sub-Bab ${sb.kode}`))
                .map((x) => {
                  const label = x.lulus ? `Lulus${x.jatuhTempo ? ` · ulang ${tanggal(x.jatuhTempo)}` : ""}` : x.sudahCoba ? "Belum lulus, coba lagi" : "Belum dicoba";
                  return (
                    <li key={x.id} className="rounded-2xl bg-white p-3 text-[#2a1f66]">
                      <Link href={`/ruang-belajar/mtk-1-bab2-p${x.k.nomor}`} className="flex min-h-12 items-center justify-between gap-3">
                        <span>
                          <span className="block font-bold">
                            Materi {x.k.nomor}: {x.k.judulPendek}
                          </span>
                          <span className="block text-sm">
                            {x.id === berikut ? "Berikutnya untukmu · " : ""}
                            {label}
                          </span>
                        </span>
                        <span aria-hidden className="text-2xl">
                          {x.lulus ? "✅" : "▶"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
