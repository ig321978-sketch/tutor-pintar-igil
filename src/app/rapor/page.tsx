"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, CheckCircle2, Target, Trophy } from "lucide-react";
import PageShell from "@/components/PageShell";
import {
  bacaProgres,
  ringkasanRapor,
  type ProgresIgil,
} from "@/lib/progres";

export default function RaporSiswaPage() {
  const [data, setData] = useState<ProgresIgil | null>(null);

  useEffect(() => {
    setData(bacaProgres());
  }, []);

  const ringkas = data
    ? ringkasanRapor(data)
    : {
        totalModul: 0,
        totalKuis: 0,
        totalSoal: 0,
        ketepatan: 0,
        catatan: [] as string[],
        xpTotal: 0,
      };
  const nama = data?.profil.nama || "Siswa $IGIL";
  const kelas = data?.profil.kelas || "-";

  return (
    <PageShell
      judul="📊 Rapor Siswa"
      subjudul={`Rekap kemajuan belajar ${nama} (${kelas}): modul, kuis, ketepatan pengerjaan, dan catatan evaluasi Tutor AI.`}
    >
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KartuStat
          ikon={<BookOpen className="h-5 w-5" />}
          label="Total modul"
          nilai={String(ringkas.totalModul)}
        />
        <KartuStat
          ikon={<CheckCircle2 className="h-5 w-5" />}
          label="Kuis dikerjakan"
          nilai={`${ringkas.totalKuis}/${ringkas.totalSoal || 0}`}
        />
        <KartuStat
          ikon={<Target className="h-5 w-5" />}
          label="Ketepatan pengerjaan"
          nilai={`${ringkas.ketepatan}%`}
        />
        <KartuStat
          ikon={<Trophy className="h-5 w-5" />}
          label="Total XP"
          nilai={String(ringkas.xpTotal)}
        />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">
            Catatan evaluasi Tutor AI
          </h2>
          {ringkas.catatan.length === 0 ? (
            <p className="text-sm text-slate-600">
              Belum ada catatan. Selesaikan satu modul di AI Tutor untuk mendapat evaluasi.
            </p>
          ) : (
            <ul className="space-y-3">
              {ringkas.catatan.map((isi, indeks) => (
                <li
                  key={`${indeks}-${isi.slice(0, 12)}`}
                  className="rounded-2xl border border-[#F0AB00]/40 bg-[#FFF8E8] px-4 py-3 text-sm text-slate-700"
                >
                  {isi}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-extrabold text-[#1C01A5]">
            Riwayat modul
          </h2>
          {!data || data.sesi.length === 0 ? (
            <p className="text-sm text-slate-600">
              Riwayat kosong. Mulai sesi dari Ruang Belajar atau AI Tutor.
            </p>
          ) : (
            <ul className="space-y-3">
              {data.sesi.slice(0, 8).map((sesi) => (
                <li
                  key={sesi.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-[#1C01A5]/10 px-4 py-3"
                >
                  <div>
                    <p className="font-bold text-[#1C01A5]">{sesi.materi}</p>
                    <p className="text-sm text-slate-500">
                      {sesi.mapel} · {sesi.mode === "gambar" ? "Pindai buku" : "Ketik manual"}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-extrabold text-[#F0AB00]">
                    {sesi.xp} XP
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function KartuStat({
  ikon,
  label,
  nilai,
}: {
  ikon: ReactNode;
  label: string;
  nilai: string;
}) {
  return (
    <div className="rounded-3xl border border-[#1C01A5]/15 bg-white p-5 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F0AB00]/20 text-[#1C01A5]">
        {ikon}
      </div>
      <p className="text-sm font-bold text-[#F0AB00]">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-[#1C01A5]">{nilai}</p>
    </div>
  );
}
