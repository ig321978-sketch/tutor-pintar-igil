"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import type { RingkasCacheMateri } from "@/lib/cache-materi-tutor";
import { formatWaktuCache } from "@/lib/studio-kreator";
import { kelasKotak } from "@/lib/tema";

export default function StudioKreatorPage() {
  const [daftar, setDaftar] = useState<RingkasCacheMateri[]>([]);
  const [cari, setCari] = useState("");
  const [pesan, setPesan] = useState("");
  const [penyimpananSiap, setPenyimpananSiap] = useState(true);
  const [memuat, setMemuat] = useState(true);

  useEffect(() => {
    let hidup = true;
    void (async () => {
      try {
        const res = await fetch("/api/studio-kreator", { cache: "no-store" });
        const json = (await res.json()) as {
          berhasil?: boolean;
          daftar?: RingkasCacheMateri[];
          pesan?: string;
          penyimpananSiap?: boolean;
        };
        if (!hidup) return;
        setPenyimpananSiap(json.penyimpananSiap !== false);
        if (json.pesan && json.penyimpananSiap === false) {
          setPesan(json.pesan);
        } else if (!res.ok && !json.berhasil) {
          setPesan(json.pesan || "Gagal memuat daftar cache modul.");
        }
        setDaftar(json.daftar ?? []);
      } catch {
        if (hidup) setPesan("Tidak bisa menghubungi server Studio Kreator.");
      } finally {
        if (hidup) setMemuat(false);
      }
    })();
    return () => {
      hidup = false;
    };
  }, []);

  const tersaring = useMemo(() => {
    const q = cari.trim().toLowerCase();
    if (!q) return daftar;
    return daftar.filter((item) =>
      [item.kelas, item.mapel, item.materi, item.kunci, item.modelSumber]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [cari, daftar]);

  return (
    <PageShell
      judul="🎨 Studio Kreator"
      subjudul="Kelola cache Materi dan cache Latihan dari database. Hapus cache di sini langsung menghapus cache tutor. Ujian dibuat acak tanpa cache."
    >
      <label className="mb-6 block">
        <span className="sr-only">Cari modul</span>
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari kelas, mapel, atau materi..."
          className={kelasKotak}
        />
      </label>

      {pesan ? (
        <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 font-semibold text-rose-600">
          {pesan}
        </p>
      ) : null}

      {memuat ? (
        <p className="font-semibold text-slate-500">Memuat cache modul...</p>
      ) : tersaring.length === 0 ? (
        <p className="rounded-3xl border border-[#1C01A5]/15 bg-[#F8F7FF] px-6 py-8 font-semibold text-slate-600">
          {penyimpananSiap
            ? "Belum ada cache modul. Cache tersimpan otomatis saat loading modul di AI Tutor selesai — tidak perlu menyimak VOICE sampai habis."
            : "Server belum bisa menulis/membaca cache. Perbaiki koneksi Supabase, lalu buka AI Tutor sekali lagi."}
        </p>
      ) : (
        <ul className="space-y-3">
          {tersaring.map((item) => (
            <li key={item.kunci}>
              <Link
                href={`/studio-kreator/${encodeURIComponent(item.kunci)}`}
                className="block rounded-3xl border border-[#1C01A5]/15 bg-white px-5 py-4 shadow-sm transition hover:border-[#F0AB00]"
              >
                <p className="text-lg font-extrabold text-[#1C01A5]">
                  {item.materi || "Tanpa judul materi"}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {item.kelas} · {item.mapel}
                </p>
                <p className="mt-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
                  <span className="rounded-full bg-[#1C01A5]/10 px-2 py-0.5 text-[#1C01A5]">
                    Cache Materi{item.adaCacheMateri ? "" : " kosong"}
                  </span>
                  <span className="rounded-full bg-[#F0AB00]/20 px-2 py-0.5 text-[#1C01A5]">
                    Cache Latihan {item.jumlahLatihan} soal
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                    Ujian acak · tanpa cache
                  </span>
                  <span className="rounded-full bg-[#1C01A5]/10 px-2 py-0.5 text-[#1C01A5]">
                    {item.isDraft ? "Draf" : "Terbit"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                    {item.modelSumber || "model tidak tercatat"}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                    {formatWaktuCache(item.updatedAt)}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
