"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { catatUjianLulus } from "@/lib/praktikum-blok";
import { TombolSuaraGuru } from "@/components/modul/tahap-b-gaya";

/**
 * Penilaian Latihan dan Ujian di server.
 * Browser hanya menampilkan soal dan mengirim pilihan. Kunci jawaban tidak pernah ada di
 * perangkat: Latihan dinilai oleh RPC kirim_jawaban_latihan, Ujian oleh mulai_ujian
 * (lembar soal dari server) dan serahkan_ujian (nilai akhir saja).
 */

export interface AnakBelajar {
  id: string;
  nama: string;
  kelas: number;
  fase: string;
}

export type StatusProfil = "memuat" | "belum_siap" | "belum_masuk" | "belum_ada_anak" | "siap";

export interface ProfilBelajar {
  status: StatusProfil;
  anak: AnakBelajar[];
  aktif: AnakBelajar | null;
  pilih: (id: string) => void;
}

const KUNCI_ANAK_AKTIF = "igil_anak_aktif";

async function panggil<T>(url: string, isi?: unknown): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: isi === undefined ? "GET" : "POST",
      headers: isi === undefined ? undefined : { "Content-Type": "application/json" },
      body: isi === undefined ? undefined : JSON.stringify(isi),
      cache: "no-store",
    });
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function useProfilBelajar(): ProfilBelajar {
  const [status, setStatus] = useState<StatusProfil>("memuat");
  const [anak, setAnak] = useState<AnakBelajar[]>([]);
  const [idAktif, setIdAktif] = useState<string | null>(null);

  useEffect(() => {
    let batal = false;
    (async () => {
      const hasil = await panggil<{ status: StatusProfil; anak?: AnakBelajar[] }>("/api/belajar/profil");
      if (batal) return;
      if (!hasil || !hasil.status) {
        setStatus("belum_siap");
        return;
      }
      setStatus(hasil.status);
      const daftar = hasil.anak ?? [];
      setAnak(daftar);
      let simpan: string | null = null;
      try {
        simpan = window.localStorage.getItem(KUNCI_ANAK_AKTIF);
      } catch {
        simpan = null;
      }
      setIdAktif(daftar.find((a) => a.id === simpan)?.id ?? daftar[0]?.id ?? null);
    })();
    return () => {
      batal = true;
    };
  }, []);

  const pilih = useCallback((id: string) => {
    setIdAktif(id);
    try {
      window.localStorage.setItem(KUNCI_ANAK_AKTIF, id);
    } catch {
      // Penyimpanan diblokir. Pilihan hanya berlaku di halaman ini.
    }
  }, []);

  const aktif = anak.find((a) => a.id === idAktif) ?? null;
  return { status, anak, aktif, pilih };
}

export interface HasilLatihanServer {
  benar: boolean;
  pembahasan: string;
}

export type BalasanLatihan =
  | { jenis: "ok"; hasil: HasilLatihanServer }
  | { jenis: "belum_siap" }
  | { jenis: "galat"; pesan: string };

/** Kirim satu jawaban Latihan. Server menilai dan mengembalikan benar atau salah beserta pembahasan. */
export async function kirimJawabanLatihan(
  anak: string,
  bab: string,
  soal: number | string,
  pilihan: number,
): Promise<BalasanLatihan> {
  const res = await panggil<{ status: string; benar?: boolean; pembahasan?: string; pesan?: string }>(
    "/api/belajar/latihan",
    { anak, bab, soal: String(soal), pilihan },
  );
  if (!res) return { jenis: "galat", pesan: "Tidak ada sinyal. Coba pilih lagi." };
  if (res.status === "ok" && typeof res.benar === "boolean" && typeof res.pembahasan === "string") {
    return { jenis: "ok", hasil: { benar: res.benar, pembahasan: res.pembahasan } };
  }
  if (res.status === "belum_siap" || res.status === "belum_masuk") return { jenis: "belum_siap" };
  return { jenis: "galat", pesan: res.pesan ?? "Jawaban belum bisa dikirim." };
}

const GAYA_PANEL =
  "mx-auto mt-4 w-[98%] rounded-3xl border-2 border-[#FFE566] bg-[#FFFDF2] p-4 text-sm font-bold text-[#334155] md:text-base";

/** Penjelasan status penilaian server di atas Latihan dan Ujian. */
export function PanelProfilBelajar({ profil, kembaliKe }: { profil: ProfilBelajar; kembaliKe: string }) {
  if (profil.status === "memuat") {
    return <div className={GAYA_PANEL}>⏳ Menyiapkan penilaian di server...</div>;
  }
  if (profil.status === "belum_masuk") {
    return (
      <div className={`${GAYA_PANEL} flex flex-wrap items-center justify-between gap-3`}>
        <span>🔐 Jawabanmu dinilai di server. Masuk dulu supaya benar-salah, pembahasan, dan Poin Kualifikasi tercatat.</span>
        <Link
          href={`/login?next=${encodeURIComponent(kembaliKe)}`}
          className="rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-5 py-2 text-xs font-black text-[#FFE566] md:text-sm"
        >
          MASUK ➡️
        </Link>
      </div>
    );
  }
  if (profil.status === "belum_ada_anak") {
    return (
      <div className={`${GAYA_PANEL} flex flex-wrap items-center justify-between gap-3`}>
        <span>
          👧 Akun ini belum punya profil anak. Profil anak diperlukan agar jawaban bisa dinilai dan poin tercatat.
        </span>
        <Link
          href="/daftar"
          className="rounded-full border-2 border-[#FFE566] bg-[#1C01A5] px-5 py-2 text-xs font-black text-[#FFE566] md:text-sm"
        >
          DAFTARKAN ANAK ➡️
        </Link>
      </div>
    );
  }
  if (profil.status === "belum_siap") {
    return (
      <div className={GAYA_PANEL}>
        🛠️ Penilaian server belum aktif. Soal tetap bisa dibaca, tetapi benar-salah dan poin belum dihitung.
      </div>
    );
  }
  return (
    <div className={`${GAYA_PANEL} flex flex-wrap items-center gap-3`}>
      <span>🧒 Belajar sebagai:</span>
      {profil.anak.length > 1 ? (
        <select
          value={profil.aktif?.id ?? ""}
          onChange={(e) => profil.pilih(e.target.value)}
          className="rounded-full border-2 border-[#1C01A5] bg-white px-3 py-1 text-sm font-black text-[#1C01A5]"
          aria-label="Pilih profil anak"
        >
          {profil.anak.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nama} (Kelas {a.kelas})
            </option>
          ))}
        </select>
      ) : (
        <strong className="text-[#1C01A5]">
          {profil.aktif?.nama} (Kelas {profil.aktif?.kelas})
        </strong>
      )}
      <span className="text-xs font-bold text-[#334155]">Jawaban dinilai di server.</span>
    </div>
  );
}

// ============================================================================
// UJIAN: lembar soal dikirim dari server, nilai dihitung di server
// ============================================================================

interface SoalUjian {
  id: string;
  pertanyaan: string;
  pilihan: string[];
}

interface StatusBab {
  status: string;
  ujianLulus?: boolean;
  ujianBerjalan?: boolean;
  jedaSampai?: string | null;
}

type FaseUjian = "awal" | "memuat" | "berjalan" | "menyerahkan" | "selesai";

function teksJeda(iso: string): string {
  try {
    return new Date(iso).toLocaleString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function UjianServer({
  bab,
  chapterId,
  profil,
  bacakan,
  onNilai,
}: {
  /** Kode bab di aplikasi (mtk-1-bab1) untuk membuka Praktikum Blok. */
  bab: string;
  /** Kode bab di server (k1-mat-bab1). */
  chapterId: string;
  profil: ProfilBelajar;
  bacakan: (teks: string) => void;
  onNilai: (nilai: number) => void;
}) {
  const [fase, setFase] = useState<FaseUjian>("awal");
  const [statusBab, setStatusBab] = useState<StatusBab | null>(null);
  const [sesi, setSesi] = useState<string | null>(null);
  const [soal, setSoal] = useState<SoalUjian[]>([]);
  const [jawaban, setJawaban] = useState<Record<string, number>>({});
  const [indeks, setIndeks] = useState(0);
  const [nilai, setNilai] = useState<number | null>(null);
  const [pesan, setPesan] = useState("");
  const [percobaan, setPercobaan] = useState(1);

  const idAnak = profil.status === "siap" ? (profil.aktif?.id ?? null) : null;

  const muatStatus = useCallback(async () => {
    if (!idAnak) return;
    const res = await panggil<StatusBab>(
      `/api/belajar/profil?anak=${encodeURIComponent(idAnak)}&bab=${encodeURIComponent(chapterId)}`,
    );
    if (res && res.status === "siap") setStatusBab(res);
  }, [idAnak, chapterId]);

  useEffect(() => {
    // Memuat status bab dari server saat profil anak siap. setState terjadi setelah await.
    let batal = false;
    (async () => {
      if (!idAnak) return;
      const res = await panggil<StatusBab>(
        `/api/belajar/profil?anak=${encodeURIComponent(idAnak)}&bab=${encodeURIComponent(chapterId)}`,
      );
      if (!batal && res && res.status === "siap") setStatusBab(res);
    })();
    return () => {
      batal = true;
    };
  }, [idAnak, chapterId]);

  const mulai = useCallback(async () => {
    if (!idAnak) return;
    setFase("memuat");
    setPesan("");
    const res = await panggil<{
      status: string;
      sesi?: string;
      soal?: SoalUjian[];
      pesan?: string;
    }>("/api/belajar/ujian/mulai", { anak: idAnak, bab: chapterId });
    if (!res) {
      setFase("awal");
      setPesan("Tidak ada sinyal. Coba lagi sebentar.");
      return;
    }
    if (res.status === "ok" && res.sesi && res.soal) {
      setSesi(res.sesi);
      setSoal(res.soal);
      setJawaban({});
      setIndeks(0);
      setNilai(null);
      setFase("berjalan");
      return;
    }
    setFase("awal");
    setPesan(
      res.status === "belum_siap" || res.status === "belum_masuk"
        ? "Penilaian server belum aktif untuk akun ini."
        : (res.pesan ?? "Ujian belum bisa dimulai."),
    );
    void muatStatus();
  }, [idAnak, chapterId, muatStatus]);

  const serahkan = useCallback(async () => {
    if (!sesi) return;
    setFase("menyerahkan");
    setPesan("");
    const res = await panggil<{ status: string; nilai?: number; pesan?: string }>(
      "/api/belajar/ujian/serahkan",
      { sesi, jawaban },
    );
    if (!res) {
      setFase("berjalan");
      setPesan("Tidak ada sinyal. Lembarmu masih tersimpan di layar, coba serahkan lagi.");
      return;
    }
    if (res.status === "ok" && typeof res.nilai === "number") {
      setNilai(res.nilai);
      setFase("selesai");
      onNilai(res.nilai);
      if (res.nilai === 100) catatUjianLulus(bab);
      void muatStatus();
      return;
    }
    if (res.status === "ditolak") {
      setNilai(null);
      setFase("selesai");
      setPesan(res.pesan ?? "Lembar ditolak server.");
      void muatStatus();
      return;
    }
    setFase("berjalan");
    setPesan(res.pesan ?? "Lembar belum bisa diserahkan.");
  }, [sesi, jawaban, bab, onNilai, muatStatus]);

  const jumlahJawab = useMemo(() => soal.filter((s) => jawaban[s.id] !== undefined).length, [soal, jawaban]);
  // Server hanya mengirim jedaSampai bila jeda masih berlaku saat status dibaca.
  const jedaAktif = Boolean(statusBab?.jedaSampai);

  // ---------- Belum bisa dinilai server ----------
  if (profil.status !== "siap" || !idAnak) {
    return (
      <section className="mx-auto mt-4 w-[98%] space-y-3 rounded-3xl border-4 border-dashed border-[#EF4444] bg-[#FFF1F2] p-6 text-center">
        <div className="text-5xl" aria-hidden="true">🔒</div>
        <h2 className="text-lg font-black text-[#1C01A5] md:text-xl">Ujian dinilai di server</h2>
        <p className="mx-auto max-w-xl text-sm font-bold leading-relaxed text-[#334155] md:text-base">
          Lembar soal dan kunci jawaban ada di server, tidak ada di perangkat. Ujian terbuka setelah kamu masuk dan akunmu
          punya profil anak.
        </p>
      </section>
    );
  }

  // ---------- Sudah lulus ----------
  if (statusBab?.ujianLulus && fase !== "selesai") {
    return (
      <section className="mx-auto mt-4 w-[98%] space-y-3 rounded-3xl border-2 border-[#22C55E] bg-[#F0FDF4] p-6 text-center">
        <div className="text-5xl" aria-hidden="true">🏅</div>
        <h2 className="text-lg font-black text-[#166534] md:text-xl">Ujian bab ini sudah lulus 100%</h2>
        <p className="text-sm font-bold text-[#334155] md:text-base">Poin Ujian sudah dicatat server. Lanjutkan ke bab berikutnya atau Praktikum Blok.</p>
        <Link
          href="/praktikum/mtk-1-blok1"
          className="inline-block rounded-2xl bg-[#1C01A5] px-5 py-2 text-xs font-black text-[#FFE566] md:text-sm"
        >
          LIHAT PRAKTIKUM BLOK ➡️
        </Link>
      </section>
    );
  }

  // ---------- Layar awal ----------
  if (fase === "awal" || fase === "memuat") {
    return (
      <section className="mx-auto mt-4 w-[98%] space-y-4 rounded-3xl border-2 border-[#EF4444] bg-[#FFF1F2] p-6 md:p-8">
        <div className="rounded-2xl bg-[#1C01A5] p-4 text-white">
          <span className="text-xs font-black uppercase text-[#FFE566]">Lembar Ujian Formal • 10 soal HOTS • wajib 100%</span>
          <h2 className="text-lg font-black md:text-xl">Soal dikirim dari server saat ujian dimulai</h2>
        </div>
        <ul className="list-disc space-y-1 pl-6 text-sm font-bold text-[#334155] md:text-base">
          <li>Kerjakan dengan tenang dan teliti. Semua jawaban diserahkan sekaligus di akhir.</li>
          <li>Server hanya memberi tahu nilai akhir, tidak memberi tahu nomor soal yang salah.</li>
          <li>Lembar yang diserahkan terlalu cepat tidak dihitung.</li>
          <li>Jika belum 100%, ujian bisa diulang setelah masa jeda.</li>
        </ul>
        {jedaAktif && statusBab?.jedaSampai ? (
          <p className="rounded-2xl bg-white p-3 text-sm font-black text-[#991B1B]">
            ⏳ Ujian bisa diulang mulai {teksJeda(statusBab.jedaSampai)}. Pelajari lagi materinya dulu, ya.
          </p>
        ) : null}
        {pesan ? <p className="rounded-2xl bg-white p-3 text-sm font-black text-[#991B1B]">{pesan}</p> : null}
        <button
          type="button"
          disabled={fase === "memuat" || jedaAktif}
          onClick={() => void mulai()}
          className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-8 py-3 text-sm font-black text-[#FFE566] shadow-md disabled:opacity-50"
        >
          {fase === "memuat" ? "Memuat lembar..." : statusBab?.ujianBerjalan ? "LANJUTKAN UJIAN ➡️" : "MULAI UJIAN ➡️"}
        </button>
      </section>
    );
  }

  // ---------- Hasil ----------
  if (fase === "selesai") {
    const lulus = nilai === 100;
    return (
      <section className="mx-auto mt-4 w-[98%] space-y-4 rounded-3xl border-2 border-[#EF4444] bg-[#FFF1F2] p-6 text-center md:p-8">
        <div className="text-5xl" aria-hidden="true">{lulus ? "🎉" : nilai === null ? "⚠️" : "💪"}</div>
        {nilai === null ? (
          <p className="text-base font-black text-[#991B1B]">{pesan || "Lembar tidak dihitung."}</p>
        ) : (
          <h2 className="text-xl font-black text-[#1C01A5] md:text-2xl">
            Nilai Ujian Formal: {nilai} / 100 {lulus ? "• Lulus mutlak 100%!" : "• Wajib 100/100 untuk lulus"}
          </h2>
        )}
        {!lulus && jedaAktif && statusBab?.jedaSampai ? (
          <p className="text-sm font-bold text-[#334155]">
            Ujian bisa diulang mulai {teksJeda(statusBab.jedaSampai)}. Sambil menunggu, ulangi materi dan Latihan.
          </p>
        ) : null}
        <div className="flex flex-wrap justify-center gap-2">
          {lulus ? (
            <Link
              href="/praktikum/mtk-1-blok1"
              className="rounded-xl bg-[#1C01A5] px-5 py-2 text-xs font-black text-[#FFE566] md:text-sm"
            >
              LIHAT PRAKTIKUM BLOK ➡️
            </Link>
          ) : (
            <button
              type="button"
              disabled={jedaAktif}
              onClick={() => {
                setPercobaan((p) => p + 1);
                setFase("awal");
                setPesan("");
              }}
              className="rounded-xl bg-[#EF4444] px-5 py-2 text-xs font-black text-white disabled:opacity-50 md:text-sm"
            >
              🔄 SIAPKAN UJIAN ULANG
            </button>
          )}
        </div>
      </section>
    );
  }

  // ---------- Lembar berjalan ----------
  const q = soal[indeks];
  const terakhir = indeks === soal.length - 1;
  const semuaTerjawab = jumlahJawab === soal.length;
  return (
    <section className="mx-auto mt-4 w-[98%] space-y-5 rounded-3xl border-2 border-[#EF4444] bg-[#FFF1F2] p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#1C01A5] p-4 text-white">
        <div>
          <span className="text-xs font-black uppercase text-[#FFE566]">Lembar Ujian Formal • HOTS • wajib 100%</span>
          <h2 className="text-base font-black md:text-lg">Sesi belajar sah, dinilai di server</h2>
        </div>
        <span className="rounded-xl bg-white/15 px-3 py-1 text-xs font-black text-[#FFE566]">
          Percobaan ke-{percobaan} • terjawab {jumlahJawab}/{soal.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Nomor soal">
        {soal.map((s, i) => {
          const sudah = jawaban[s.id] !== undefined;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndeks(i)}
              aria-label={`Soal ${i + 1}${sudah ? ", sudah dijawab" : ", belum dijawab"}`}
              className={`h-9 w-9 rounded-full border-2 text-xs font-black ${
                i === indeks
                  ? "border-[#FFE566] bg-[#1C01A5] text-[#FFE566]"
                  : sudah
                    ? "border-[#1C01A5] bg-[#DDD8FF] text-[#1C01A5]"
                    : "border-slate-300 bg-white text-[#334155]"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="space-y-4 rounded-3xl border-2 border-[#FCA5A5] bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <span className="rounded-full bg-[#FEE2E2] px-3 py-1 text-xs font-black text-[#991B1B]">
            Soal Formal #{indeks + 1} / {soal.length} • HOTS
          </span>
          <TombolSuaraGuru kecil label="Bacakan Soal" onClick={() => bacakan(`${q.pertanyaan}. ${q.pilihan.join(". ")}`)} />
        </div>
        <p className="text-base font-black leading-relaxed text-[#1C01A5] md:text-lg">{q.pertanyaan}</p>
        <div className="grid grid-cols-1 gap-2.5">
          {q.pilihan.map((opt, i) => {
            const dipilih = jawaban[q.id] === i;
            return (
              <button
                key={`${q.id}-${i}`}
                type="button"
                disabled={fase === "menyerahkan"}
                onClick={() => setJawaban((prev) => ({ ...prev, [q.id]: i }))}
                className={`rounded-2xl border-2 p-3 text-left text-sm font-black transition-all md:text-base ${
                  dipilih
                    ? "border-[#FFE566] bg-[#1C01A5] text-[#FFE566]"
                    : "border-slate-300 bg-white text-[#334155] hover:bg-[#FFF1F2]"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {pesan ? <p className="rounded-2xl bg-white p-3 text-sm font-black text-[#991B1B]">{pesan}</p> : null}

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          disabled={indeks === 0}
          onClick={() => setIndeks((i) => Math.max(0, i - 1))}
          className="rounded-2xl border-2 border-slate-300 bg-white px-6 py-3 text-xs font-black text-[#334155] disabled:opacity-40"
        >
          ⬅️ KEMBALI
        </button>
        {terakhir ? (
          <button
            type="button"
            disabled={!semuaTerjawab || fase === "menyerahkan"}
            onClick={() => void serahkan()}
            className="rounded-2xl bg-[#22C55E] px-8 py-3 text-xs font-black text-white shadow-md disabled:opacity-50"
          >
            {fase === "menyerahkan"
              ? "Menyerahkan..."
              : semuaTerjawab
                ? "✅ SERAHKAN LEMBAR UJIAN"
                : `Jawab semua soal dulu (${jumlahJawab}/${soal.length})`}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndeks((i) => i + 1)}
            className="rounded-2xl border-2 border-[#FFE566] bg-[#1C01A5] px-7 py-3 text-xs font-black text-[#FFE566]"
          >
            SOAL BERIKUTNYA ➡️
          </button>
        )}
      </div>
    </section>
  );
}
