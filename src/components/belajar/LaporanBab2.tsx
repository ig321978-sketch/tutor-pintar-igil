"use client";

import Link from "next/link";
import { CEK } from "@/lib/belajar/skema";
import { KONFIGURASI, type KonfigPelabuhan } from "./konfig";
import { useSiap, useSimpanan } from "./pakai-simpanan";
import { EMAS, ROYAL } from "./Pelabuhan";

const KONFIGS: KonfigPelabuhan[] = Object.values(KONFIGURASI);
const IDS = KONFIGS.map((k) => k.skillId);

const SARAN: Record<string, string> = {
  "m-ambil-satu": "Taruh benda di dua tempat (misalnya sendok di dua laci), lalu minta anak menghitung semuanya, bukan satu tempat saja.",
  "m-hitung-dobel": "Minta anak memindahkan benda yang sudah dihitung ke satu sisi, supaya tidak terhitung dua kali.",
  "m-lewat-satu": "Hitung bersama pelan-pelan sambil menyentuh tiap benda satu per satu.",
  "m-tanda-tukar": "Tulis satu kalimat penjumlahan bersama, lalu baca keras-keras: hasilnya selalu di akhir, setelah tanda sama dengan.",
  "m-hitung-kendaraan": "Lihat sepeda atau motor di rumah, lalu tanyakan: yang dihitung kendaraannya atau rodanya?",
};

const tanggal = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-");

/** Laporan untuk orang tua dan guru: materi yang dikuasai, yang perlu dibantu, kekeliruan yang sering muncul, dan saran di rumah. */
export default function LaporanBab2() {
  const siap = useSiap();
  const simpan = useSimpanan(IDS);
  const baris = KONFIGS.map((k) => {
    const s = simpan[k.skillId];
    const cek = [...s.catatan].reverse().find((c) => c.benar >= 0 && c.miskonsepsiTerdeteksi !== undefined && c.benar <= CEK.jumlahSoal);
    return { k, lulus: s.status.lulusTerakhir !== null, coba: s.catatan.length > 0, kotak: s.status.kotak, lulusTerakhir: s.status.lulusTerakhir, jatuhTempo: s.status.jatuhTempo, cek };
  });
  const dikuasai = baris.filter((b) => b.lulus);
  const dibantu = baris.filter((b) => !b.lulus && b.coba);
  const belum = baris.filter((b) => !b.lulus && !b.coba);
  const hitung = new Map<string, { jumlah: number; deskripsi: string }>();
  for (const b of baris) for (const c of simpan[b.k.skillId].catatan) for (const m of c.miskonsepsiTerdeteksi) {
    const lama = hitung.get(m);
    hitung.set(m, { jumlah: (lama?.jumlah ?? 0) + 1, deskripsi: b.k.miskonsepsi[m]?.deskripsi ?? lama?.deskripsi ?? m });
  }
  const sering = [...hitung.entries()].sort((a, b) => b[1].jumlah - a[1].jumlah).slice(0, 3);
  if (!siap) return <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}><p className="mx-auto max-w-2xl text-center font-bold">Memuat…</p></main>;
  return (
    <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}>
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-4 text-[#2a1f66] sm:p-6">
        <h1 className="text-2xl font-extrabold" style={{ color: ROYAL }}>
          Laporan Bab 2 · Penjumlahan sampai 10
        </h1>
        <p className="mt-1 text-sm">Data tersimpan di perangkat ini. Waktu belajar belum dicatat. Laporan ini bukan nilai rapor dan tidak dipakai untuk peringkat.</p>
        <h2 className="mt-4 text-lg font-extrabold">Ringkasan</h2>
        <ul className="list-disc pl-5">
          <li>{dikuasai.length} dari {baris.length} materi sudah lulus cek.</li>
          <li>{dibantu.length} materi perlu dibantu (sudah dicoba, belum lulus).</li>
          <li>{belum.length} materi belum dicoba.</li>
        </ul>
        {dibantu.length > 0 && (
          <>
            <h2 className="mt-4 text-lg font-extrabold">Perlu dibantu</h2>
            <ul className="list-disc pl-5">
              {dibantu.map((b) => (
                <li key={b.k.skillId}>
                  Materi {b.k.nomor}: {b.k.judulPendek}
                  {b.cek ? ` (cek terakhir ${b.cek.benar} dari ${CEK.jumlahSoal})` : ""}
                </li>
              ))}
            </ul>
          </>
        )}
        <h2 className="mt-4 text-lg font-extrabold">Kekeliruan yang paling sering</h2>
        {sering.length === 0 ? (
          <p>Belum ada data kekeliruan.</p>
        ) : (
          <ol className="list-decimal pl-5">
            {sering.map(([kode, d]) => (
              <li key={kode} className="mb-2">
                <b>{d.deskripsi}</b> ({d.jumlah} kali)
                <br />
                <span className="text-sm">Saran di rumah: {SARAN[kode] ?? "Ajak anak berlatih dengan benda yang ada di rumah, sambil menyentuh satu per satu."}</span>
              </li>
            ))}
          </ol>
        )}
        <h2 className="mt-4 text-lg font-extrabold">Rincian untuk guru</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2" style={{ borderColor: ROYAL }}>
                <th className="py-1 pr-2">Materi</th>
                <th className="pr-2">Status</th>
                <th className="pr-2">Lulus terakhir</th>
                <th>Ulang</th>
              </tr>
            </thead>
            <tbody>
              {baris.map((b) => (
                <tr key={b.k.skillId} className="border-b">
                  <td className="py-1 pr-2">{b.k.nomor}. {b.k.judulPendek}</td>
                  <td className="pr-2">{b.lulus ? "Lulus" : b.coba ? "Belum lulus" : "Belum dicoba"}</td>
                  <td className="pr-2">{tanggal(b.lulusTerakhir)}</td>
                  <td>{tanggal(b.jatuhTempo)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={() => window.print()} className="min-h-12 rounded-2xl px-5 py-2 text-lg font-bold" style={{ background: EMAS, color: "#2a1f66" }}>
            Cetak laporan
          </button>
          <Link href="/ruang-belajar/mtk-1-bab2-baru" className="min-h-12 rounded-2xl border-2 px-5 py-3 text-lg font-bold" style={{ borderColor: ROYAL, color: ROYAL }}>
            Kembali ke daftar materi
          </Link>
        </div>
      </div>
    </main>
  );
}
