"use client";

import { useEffect, useState, type ReactNode } from "react";
import { BookOpen, CheckCircle2, Sparkles, Target, Trophy, XCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import {
  bacaProgres,
  ringkasanRapor,
  sesiSudahBelajar,
  simpanRaporHarian,
  type ProgresIgil,
  type SesiModul,
} from "@/lib/progres";
import {
  badgeRapor,
  sidikAktivitasHarian,
  tanggalIsoSesi,
  tanggalLokalIso,
  type IsiRaporHarian,
} from "@/lib/rapor-harian";

function tanggalHariIni(): string {
  const sekarang = new Date();
  return sekarang.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isoHariIni(): string {
  return tanggalLokalIso();
}

function jawabanLatihan(kunci: Record<string, string>): string[] {
  return Object.entries(kunci)
    .filter(([nomor]) => {
      const nilai = Number(nomor);
      return Number.isFinite(nilai) && nilai > 0 && nilai < 100;
    })
    .map(([, isi]) => isi);
}

function jawabanEsai(kunci: Record<string, string>): string[] {
  return Object.entries(kunci)
    .filter(([nomor]) => Number(nomor) >= 100)
    .map(([, isi]) => isi)
    .filter((isi) => isi.trim());
}

function alasanBelum(sesi: SesiModul): string {
  if (!sesi.audioCompleted && !sesi.latihanSelesai) {
    return "Belum tuntas dengar penjelasan dan belum merampungkan latihan soal.";
  }
  if (!sesi.audioCompleted) {
    return "Belum tuntas mendengarkan audio penjelasan sampai akhir.";
  }
  return "Belum merampungkan seluruh Soal Latihan.";
}

function susunBabHarian(data: ProgresIgil, hariIni: string) {
  const sesiHariIni = data.sesi.filter((s) => tanggalIsoSesi(s.waktu) === hariIni);
  return sesiHariIni.map((sesi) => {
    const kunci = data.jawabanKuis[sesi.id] ?? {};
    return {
      id: sesi.id,
      mapel: sesi.mapel,
      materi: sesi.materi,
      audioCompleted: sesi.audioCompleted,
      latihanSelesai: sesi.latihanSelesai,
      sudahBelajar: sesiSudahBelajar(sesi),
      kuisBenar: sesi.kuisBenar,
      jumlahLatihan: sesi.jumlahLatihan,
      latihanDijawab: jawabanLatihan(kunci).length,
      esai: jawabanEsai(kunci),
      alasan: sesiSudahBelajar(sesi) ? "" : alasanBelum(sesi),
    };
  });
}

export default function RaporSiswaPage() {
  const [data, setData] = useState<ProgresIgil | null>(null);
  const [tanggal, setTanggal] = useState("");
  const [raporHarian, setRaporHarian] = useState<IsiRaporHarian | null>(null);
  const [memuatRapor, setMemuatRapor] = useState(false);
  const [pesanRapor, setPesanRapor] = useState("");

  useEffect(() => {
    const progres = bacaProgres();
    setData(progres);
    setTanggal(tanggalHariIni());

    const hariIni = isoHariIni();
    const bab = susunBabHarian(progres, hariIni);
    if (bab.length === 0) return;

    const cuplikan = JSON.stringify(
      bab.map((item) => ({
        id: item.id,
        audio: item.audioCompleted,
        latihan: item.latihanSelesai,
        benar: item.kuisBenar,
        esai: item.esai.length,
      })),
    );
    const sidik = sidikAktivitasHarian(hariIni, cuplikan);
    const cache = progres.raporHarian?.[hariIni];
    if (
      cache &&
      cache.sidik === sidik &&
      typeof cache.skor === "number"
    ) {
      setRaporHarian({
        tanggal: hariIni,
        skor: cache.skor,
        predikat: badgeRapor(cache.skor).predikat,
        ringkasan: cache.ringkasan,
        pemahaman: cache.pemahaman,
        esai: cache.esai,
        konsistensi: cache.konsistensi,
        sidik,
        dariAi: Boolean(cache.dariAi),
      });
      return;
    }

    setMemuatRapor(true);
    void (async () => {
      try {
        const respons = await fetch("/api/rapor-harian", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: progres.profil.nama || "Siswa",
            kelas: progres.profil.kelas || "-",
            tanggal: hariIni,
            bab,
          }),
        });
        const hasil = (await respons.json()) as {
          berhasil?: boolean;
          pesan?: string;
          skor?: number;
          predikat?: string;
          ringkasan?: string;
          pemahaman?: string;
          esai?: string;
          konsistensi?: string;
          dariAi?: boolean;
        };
        if (!hasil.berhasil || typeof hasil.skor !== "number") {
          setPesanRapor(hasil.pesan || "Rapor harian belum bisa disusun.");
          return;
        }
        const isi: IsiRaporHarian = {
          tanggal: hariIni,
          skor: hasil.skor,
          predikat: badgeRapor(hasil.skor).predikat,
          ringkasan: hasil.ringkasan || "",
          pemahaman: hasil.pemahaman || "",
          esai: hasil.esai || "",
          konsistensi: hasil.konsistensi || "",
          sidik,
          dariAi: Boolean(hasil.dariAi),
        };
        setRaporHarian(isi);
        simpanRaporHarian(hariIni, isi);
        setData(bacaProgres());
      } catch {
        setPesanRapor("Koneksi terputus saat menyusun rapor harian.");
      } finally {
        setMemuatRapor(false);
      }
    })();
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

  const hariIni = isoHariIni();
  const babHariIni = data ? susunBabHarian(data, hariIni) : [];
  const babTuntas = babHariIni.filter((item) => item.sudahBelajar);
  const sudahBelajarHariIni = babTuntas.length > 0;
  const badge = raporHarian ? badgeRapor(raporHarian.skor) : null;

  return (
    <PageShell
      judul="📊 Rapor Siswa"
      subjudul={`Rekap kemajuan belajar ${nama} (${kelas}): modul, kuis, ketepatan pengerjaan, dan catatan evaluasi Tutor AI.`}
    >
      <section className="mb-8 rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm">
        <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
          Aktivitas Hari Ini
        </p>
        <p className="text-sm font-bold text-slate-500">{tanggal}</p>
        <div className="mt-4 flex items-center gap-3">
          {sudahBelajarHariIni ? (
            <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-500" />
          ) : (
            <XCircle className="h-7 w-7 shrink-0 text-rose-500" />
          )}
          <p className="font-extrabold text-[#1C01A5]">
            {sudahBelajarHariIni
              ? `${nama} sudah belajar hari ini`
              : `${nama} belum belajar hari ini`}
          </p>
        </div>
        <p className="mt-2 text-sm font-medium text-slate-600">
          Status Sudah Belajar per bab hanya jika audio TTS tuntas dan seluruh Soal Latihan dirampungkan.
        </p>
        {babHariIni.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {babHariIni.map((item) => (
              <li
                key={item.id}
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  item.sudahBelajar
                    ? "border-emerald-200 bg-emerald-50 text-slate-700"
                    : "border-rose-100 bg-rose-50 text-slate-700"
                }`}
              >
                <p className="font-extrabold text-[#1C01A5]">
                  {item.mapel} — {item.materi}
                </p>
                <p className="mt-1 font-bold">
                  {item.sudahBelajar ? "Status: Sudah Belajar" : "Status: Belum Belajar"}
                </p>
                {item.alasan ? (
                  <p className="mt-1 text-slate-600">{item.alasan}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="mb-8 rounded-3xl border-2 border-[#1C01A5]/15 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
            Rapor Harian
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-[#1C01A5]">
            Penilaian holistik Tutor AI
          </h2>
        </div>
        {memuatRapor ? (
          <p className="text-sm font-bold text-[#1C01A5]/70">
            AI sedang merangkum aktivitas harian...
          </p>
        ) : null}
        {pesanRapor ? (
          <p className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {pesanRapor}
          </p>
        ) : null}
        {!memuatRapor && !raporHarian && babHariIni.length === 0 ? (
          <p className="text-sm text-slate-600">
            Belum ada aktivitas hari ini. Selesaikan dengar penjelasan dan Soal Latihan di AI Tutor.
          </p>
        ) : null}
        {raporHarian ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end gap-4">
              <p className="text-5xl font-extrabold text-[#1C01A5]">
                {raporHarian.skor}
              </p>
              {badge ? (
                <span
                  className={`mb-1 rounded-full border-2 px-4 py-1.5 text-sm font-extrabold ${badge.kelas}`}
                >
                  {badge.predikat}
                </span>
              ) : null}
              <p className="pb-1 text-sm font-bold text-slate-500">
                dari 100 · {raporHarian.dariAi ? "dinilai AI" : "penilaian sementara"}
              </p>
            </div>
            <p className="text-sm font-medium text-slate-700">{raporHarian.ringkasan}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <KartuAspek judul="Pemahaman" isi={raporHarian.pemahaman} />
              <KartuAspek judul="Kualitas esai" isi={raporHarian.esai} />
              <KartuAspek judul="Konsistensi" isi={raporHarian.konsistensi} />
            </div>
            <p className="text-xs font-bold text-slate-500">
              0–50 Merah KURANG · 51–70 Kuning CUKUP · 71–90 Hijau BAIK · 91–100 Biru SANGAT BAIK
            </p>
          </div>
        ) : null}
      </section>

      <section className="grid gap-4">
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
          label="Ketepatan jawaban"
          nilai={`${ringkas.ketepatan}%`}
        />
        <KartuStat
          ikon={<Trophy className="h-5 w-5" />}
          label="Total XP"
          nilai={String(ringkas.xpTotal)}
        />
      </section>

      <section className="mt-8 grid gap-6">
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
                      {sesi.mapel} · {sesi.kuisBenar ?? 0}/{sesi.kuisDijawab} benar
                      {" · "}
                      {sesiSudahBelajar(sesi) ? "Sudah Belajar" : "Belum Belajar"}
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

function KartuAspek({ judul, isi }: { judul: string; isi: string }) {
  return (
    <div className="rounded-2xl border border-[#1C01A5]/10 bg-[#EEE9FF]/40 p-4">
      <p className="mb-1 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#1C01A5]">
        <Sparkles className="h-3.5 w-3.5 text-[#F0AB00]" />
        {judul}
      </p>
      <p className="text-sm font-medium text-slate-700">
        {isi || "Belum ada catatan untuk aspek ini."}
      </p>
    </div>
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
