"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";

/** Detik sekarang (0 di server agar tidak terjadi selisih hidrasi). */
function useDetikSekarang(aktif: boolean): number {
  return useSyncExternalStore(
    (kabar) => {
      if (!aktif) return () => {};
      const t = window.setInterval(kabar, 1000);
      return () => window.clearInterval(t);
    },
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}

function formatSisa(detik: number): string {
  const jam = Math.floor(detik / 3600);
  const menit = Math.floor((detik % 3600) / 60);
  const sisaDetik = detik % 60;
  const dua = (n: number) => String(n).padStart(2, "0");
  return jam > 0 ? `${jam} jam ${dua(menit)} menit` : `${dua(menit)}:${dua(sisaDetik)}`;
}

function KerangkaBanner({
  ikon,
  judul,
  children,
  gaya,
  role,
}: {
  ikon: string;
  judul: string;
  children: ReactNode;
  gaya: "emas" | "biru" | "putih";
  role?: "status" | "alert";
}) {
  const kelas =
    gaya === "emas"
      ? "border-amber-400 bg-amber-50"
      : gaya === "biru"
        ? "border-indigo-900 bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 text-white"
        : "border-indigo-100 bg-white";
  return (
    <section role={role} className={`overflow-hidden rounded-3xl border-2 p-4 shadow-md sm:p-5 ${kelas}`}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-3xl ${
            gaya === "biru" ? "bg-white/15 ring-2 ring-amber-300" : "bg-[#1C01A5]"
          }`}
        >
          {ikon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`break-words text-lg font-black leading-tight sm:text-xl ${gaya === "biru" ? "text-white" : "text-indigo-950"}`}>
            {judul}
          </h3>
          <div className="mt-2 space-y-3">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* a) Ujian cooldown aktif                                             */
/* ------------------------------------------------------------------ */

export type BannerCooldownUjianProps = {
  /** Waktu percobaan berikutnya diizinkan (`next_retry_allowed_at` dari server). */
  nextRetryAllowedAt: Date | string | number;
  /** Dipanggil saat anak menekan "Buka Materi". */
  onBukaMateri?: () => void;
  /** Dipanggil saat hitung mundur selesai dan anak menekan "Coba Lagi". */
  onCobaLagi?: () => void;
  className?: string;
};

export function BannerCooldownUjian({ nextRetryAllowedAt, onBukaMateri, onCobaLagi, className = "" }: BannerCooldownUjianProps) {
  const target = useMemo(() => Math.floor(new Date(nextRetryAllowedAt).getTime() / 1000), [nextRetryAllowedAt]);
  const sekarang = useDetikSekarang(true);
  const siap = sekarang > 0;
  const sisa = siap ? Math.max(0, target - sekarang) : 0;
  const selesai = siap && sisa === 0;

  return (
    <div className={className}>
      <KerangkaBanner
        role="status"
        gaya="emas"
        ikon={selesai ? "🎉" : "🦉"}
        judul={selesai ? "Waktunya mencoba lagi, kamu pasti bisa!" : "Hampir! Yuk belajar sebentar dulu"}
      >
        {selesai ? (
          <>
            <p className="text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
              Waktu istirahatmu sudah habis. Kamu sudah membaca ulang materinya, sekarang saatnya menunjukkan hasilnya.
            </p>
            {onCobaLagi ? (
              <button
                type="button"
                onClick={onCobaLagi}
                className="w-full rounded-2xl border-amber-400 bg-amber-400 px-4 py-3 text-base font-black text-indigo-950 shadow-md hover:bg-amber-300 sm:w-auto"
              >
                📝 Coba Ujian Lagi
              </button>
            ) : null}
          </>
        ) : (
          <>
            <p className="text-sm font-semibold leading-relaxed text-slate-700 sm:text-base">
              Belum semua jawabanmu tepat, dan itu tidak apa-apa. Nomor soal yang salah sengaja tidak ditampilkan supaya
              kamu belajar memahami konsepnya, bukan hanya mengganti jawaban. Baca lagi materi SMICPA sambil menunggu,
              ya!
            </p>
            <div className="rounded-2xl bg-[#1C01A5] p-3 text-center text-white">
              <p className="text-[11px] font-black uppercase tracking-wider text-amber-300">Ujian bisa dicoba lagi dalam</p>
              <p className="text-3xl font-black tabular-nums text-amber-300" aria-live="off">
                {siap ? formatSisa(sisa) : "…"}
              </p>
            </div>
            {onBukaMateri ? (
              <button
                type="button"
                onClick={onBukaMateri}
                className="w-full rounded-2xl border-[#1C01A5] bg-white px-4 py-3 text-base font-black text-[#1C01A5] shadow-md hover:bg-indigo-50 sm:w-auto"
              >
                📚 Buka Materi SMICPA
              </button>
            ) : null}
          </>
        )}
      </KerangkaBanner>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* b) Batas poin harian tercapai                                      */
/* ------------------------------------------------------------------ */

export type BannerBatasTokenHarianProps = {
  /** Jumlah bab penghasil token per hari (opsional, untuk ditampilkan). */
  batasBabPerHari?: number;
  /** Dipanggil saat anak menekan "Lanjut Belajar Bab Berikutnya". */
  onLanjutBab?: () => void;
  className?: string;
};

export function BannerBatasTokenHarian({ batasBabPerHari, onLanjutBab, className = "" }: BannerBatasTokenHarianProps) {
  return (
    <div className={className}>
      <KerangkaBanner role="status" gaya="biru" ikon="🌟" judul="Hebat! Kamu rajin sekali hari ini">
        <p className="text-sm font-semibold leading-relaxed text-indigo-100 sm:text-base">
          {batasBabPerHari
            ? `Poin dari ${batasBabPerHari} bab hari ini sudah penuh. `
            : "Batas poin hari ini sudah tercapai. "}
          Kamu tetap boleh lanjut belajar bab berikutnya sekarang juga. Poin baru akan terbuka besok pagi.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li className="rounded-2xl bg-white/10 p-3 text-sm font-bold ring-1 ring-white/20">
            ✅ Belajar bab berikutnya <span className="text-amber-300">boleh sekarang</span>
          </li>
          <li className="rounded-2xl bg-white/10 p-3 text-sm font-bold ring-1 ring-white/20">
            🌅 Poin baru terbuka <span className="text-amber-300">besok pagi</span>
          </li>
        </ul>
        {onLanjutBab ? (
          <button
            type="button"
            onClick={onLanjutBab}
            className="w-full rounded-2xl border-amber-400 bg-amber-400 px-4 py-3 text-base font-black text-indigo-950 shadow-md hover:bg-amber-300 sm:w-auto"
          >
            ➡️ Lanjut Belajar Bab Berikutnya
          </button>
        ) : null}
      </KerangkaBanner>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* c) Kartu persiapan panggilan 2 menit                                */
/* ------------------------------------------------------------------ */

const POIN_PERSIAPAN = [
  {
    ikon: "📒",
    judul: "Siapkan Rapor (5 detik)",
    isi: "Khusus untuk pemenang perdana. Cukup diperlihatkan sebentar di layar. IGIL tidak memotret dan tidak menyimpan fotonya.",
  },
  {
    ikon: "🗣️",
    judul: "Anak siap menjelaskan 1 soal",
    isi: "Ia cukup bercerita cara dan alasannya dengan kata-kata sendiri. Gugup? Ada 1 kesempatan cadangan dengan soal lain dari bab yang sama.",
  },
  {
    ikon: "📶",
    judul: "Terkendala sinyal? Pindah slot",
    isi: "Orang tua berhak memindahkan jadwal 1 kali kalau sinyal atau keadaan sedang tidak mendukung.",
  },
] as const;

export type KartuPersiapanPanggilanProps = {
  /** Dipanggil saat orang tua menekan "Pilih Jadwal". Jika tidak diisi, tombol tidak ditampilkan. */
  onPilihJadwal?: () => void;
  className?: string;
};

export function KartuPersiapanPanggilan({ onPilihJadwal, className = "" }: KartuPersiapanPanggilanProps) {
  return (
    <section
      aria-label="Persiapan panggilan 2 menit"
      className={`overflow-hidden rounded-3xl border-2 border-amber-400 bg-white shadow-md ${className}`}
    >
      <header className="bg-gradient-to-br from-indigo-900 via-violet-900 to-indigo-950 p-4 text-white sm:p-5">
        <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-indigo-950">
          Selamat, beasiswa menunggu!
        </span>
        <h3 className="mt-2 text-xl font-black leading-tight">Persiapan Panggilan 2 Menit</h3>
        <p className="mt-1 text-sm font-semibold leading-relaxed text-indigo-100">
          Pilih satu slot jadwal di kalender 3 hari. Baca 3 hal ini dulu supaya tenang.
        </p>
        <ol className="mt-3 grid grid-cols-3 gap-2" aria-label="Jendela 3 hari">
          {[1, 2, 3].map((n) => (
            <li key={n} className="rounded-2xl bg-white/10 py-2 text-center ring-1 ring-white/20">
              <span className="block text-[11px] font-black uppercase text-indigo-200">Hari</span>
              <span className="block text-2xl font-black text-amber-300">{n}</span>
            </li>
          ))}
        </ol>
      </header>

      <ol className="space-y-3 p-4 sm:p-5">
        {POIN_PERSIAPAN.map((p, i) => (
          <li key={p.judul} className="flex items-start gap-3 rounded-2xl bg-indigo-50/40 p-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1C01A5] text-base font-black text-amber-300"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 text-base font-black leading-tight text-indigo-950">
                <span aria-hidden="true">{p.ikon}</span>
                <span className="min-w-0 flex-1 break-words">{p.judul}</span>
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-slate-600">{p.isi}</p>
            </div>
          </li>
        ))}
        {onPilihJadwal ? (
          <li className="list-none pt-1">
            <button
              type="button"
              onClick={onPilihJadwal}
              className="w-full rounded-2xl border-amber-400 bg-amber-400 px-4 py-3.5 text-lg font-black text-indigo-950 shadow-md hover:bg-amber-300"
            >
              📅 Pilih Jadwal Panggilan
            </button>
          </li>
        ) : null}
      </ol>
    </section>
  );
}
