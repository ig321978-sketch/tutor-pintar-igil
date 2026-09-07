"use client";

import Link from "next/link";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import type { DetailCacheMateri, IsiCacheMateri } from "@/lib/cache-materi-tutor";
import { formatWaktuCache } from "@/lib/studio-kreator";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

type StatusAksi = "idle" | "simpan" | "hapus";

const KOSONG: IsiCacheMateri = {
  curriculum_view: "",
  global_best_view: "",
  sketsaKartu: "",
  svgCode: "",
  pertanyaan: "",
  kunciJawaban: "",
  motivasi: "",
};

function isiDariDetail(data: DetailCacheMateri): IsiCacheMateri {
  return {
    curriculum_view: data.curriculum_view,
    global_best_view: data.global_best_view,
    sketsaKartu: data.sketsaKartu,
    svgCode: data.svgCode,
    pertanyaan: data.pertanyaan,
    kunciJawaban: data.kunciJawaban,
    motivasi: data.motivasi,
    referensiUrl: data.referensiUrl,
  };
}

export default function StudioKreatorDetail({
  kunci,
  awal,
}: {
  kunci: string;
  awal: DetailCacheMateri | null;
}) {
  const [meta, setMeta] = useState<DetailCacheMateri | null>(awal);
  const [isi, setIsi] = useState<IsiCacheMateri>(awal ? isiDariDetail(awal) : KOSONG);
  const [aksi, setAksi] = useState<StatusAksi>("idle");
  const [pesan, setPesan] = useState("");
  const [galat, setGalat] = useState("");

  const jalurApi = `/api/studio-kreator/${encodeURIComponent(kunci)}`;

  function terapkan(data: DetailCacheMateri) {
    setMeta(data);
    setIsi(isiDariDetail(data));
  }

  async function simpanPerubahan() {
    setAksi("simpan");
    setPesan("");
    setGalat("");
    try {
      const res = await fetch(jalurApi, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isi),
      });
      const json = (await res.json()) as {
        berhasil?: boolean;
        data?: DetailCacheMateri;
        pesan?: string;
      };
      if (!res.ok || !json.berhasil || !json.data) {
        setGalat(json.pesan || "Gagal menyimpan perubahan.");
        return;
      }
      terapkan(json.data);
      setPesan("Perubahan tersimpan ke cache modul tanpa memanggil AI.");
    } catch {
      setGalat("Tidak bisa menyimpan perubahan.");
    } finally {
      setAksi("idle");
    }
  }

  async function hapusModul() {
    const yakin = window.confirm(
      "Yakin ingin menghapus modul ini? Modul akan di-generate ulang oleh AI ketika diakses melalui tombol Memulai Pembelajaran.",
    );
    if (!yakin) return;
    setAksi("hapus");
    setPesan("");
    setGalat("");
    try {
      const res = await fetch(jalurApi, { method: "DELETE" });
      const json = (await res.json()) as {
        berhasil?: boolean;
        terhapus?: boolean;
        pesan?: string;
      };
      if (!res.ok || !json.berhasil) {
        setGalat(json.pesan || "Gagal menghapus cache modul.");
        return;
      }
      setMeta(null);
      setIsi(KOSONG);
      setPesan(
        "Modul berhasil dihapus. Cache kosong. Generate ulang terjadi saat siswa menekan Memulai Pembelajaran.",
      );
    } catch {
      setGalat("Tidak bisa menghapus cache modul.");
    } finally {
      setAksi("idle");
    }
  }

  const sibuk = aksi !== "idle";

  return (
    <PageShell
      judul="🎨 Detail Studio Kreator"
      subjudul="Edit naskah cache secara manual, atau hapus cache. Generate ulang hanya terjadi di alur Memulai Pembelajaran."
    >
      <Link
        href="/studio-kreator"
        className="mb-6 inline-flex font-bold text-[#1C01A5] hover:text-[#F0AB00]"
      >
        ← Daftar cache modul
      </Link>

      {meta ? (
        <div className="mb-6 rounded-3xl border border-[#1C01A5]/15 bg-[#F8F7FF] px-5 py-4">
          <p className="text-xl font-extrabold text-[#1C01A5]">{meta.materi}</p>
          <p className="mt-1 font-semibold text-slate-600">
            {meta.kelas} · {meta.mapel}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            {meta.modelSumber || "model tidak tercatat"} ·{" "}
            voice nonaktif ·{" "}
            {formatWaktuCache(meta.updatedAt)}
          </p>
        </div>
      ) : (
        <div className="mb-6 rounded-3xl border border-dashed border-[#1C01A5]/25 bg-[#F8F7FF] px-5 py-8">
          <p className="text-xl font-extrabold text-[#1C01A5]">Kosong / Belum Ada</p>
          <p className="mt-2 font-semibold text-slate-600">
            Cache modul ini belum ada. AI akan menyusun naskah saat siswa menekan
            Memulai Pembelajaran di Ruang Belajar.
          </p>
        </div>
      )}

      {galat ? (
        <p className="mb-4 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 font-semibold text-rose-600">
          {galat}
        </p>
      ) : null}
      {pesan ? (
        <p className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 font-semibold text-emerald-700">
          {pesan}
        </p>
      ) : null}

      {meta ? (
        <>
      <div className="space-y-5">
        <KolomTeks
          label="Kurikulum Sekolah"
          nilai={isi.curriculum_view}
          tinggi="min-h-48"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, curriculum_view: nilai }))}
        />
        <KolomTeks
          label="Cara Jenius Dunia"
          nilai={isi.global_best_view}
          tinggi="min-h-48"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, global_best_view: nilai }))}
        />
        <KolomTeks
          label="Bank soal"
          nilai={isi.pertanyaan}
          tinggi="min-h-40"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, pertanyaan: nilai }))}
        />
        <KolomTeks
          label="Kunci jawaban"
          nilai={isi.kunciJawaban}
          tinggi="min-h-32"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, kunciJawaban: nilai }))}
        />
        <KolomTeks
          label="Sketsa kartu"
          nilai={isi.sketsaKartu}
          tinggi="min-h-32"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, sketsaKartu: nilai }))}
        />
        <KolomTeks
          label="Motivasi"
          nilai={isi.motivasi}
          tinggi="min-h-24"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, motivasi: nilai }))}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void simpanPerubahan()}
          disabled={sibuk}
          className={`${kelasTombolUtama} inline-flex items-center justify-center rounded-2xl px-5 py-4 text-lg font-extrabold shadow-lg shadow-[#1C01A5]/20`}
        >
          {aksi === "simpan" ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <button
          type="button"
          onClick={() => void hapusModul()}
          disabled={sibuk}
          className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-4 text-lg font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:opacity-70"
        >
          {aksi === "hapus" ? "Menghapus cache..." : "Hapus Modul (Clear Cache)"}
        </button>
      </div>
        </>
      ) : null}
    </PageShell>
  );
}

function KolomTeks({
  label,
  nilai,
  tinggi,
  disabled,
  onChange,
}: {
  label: string;
  nilai: string;
  tinggi: string;
  disabled: boolean;
  onChange: (nilai: string) => void;
}) {
  return (
    <label className="block">
      <span className={kelasLabel}>{label}</span>
      <textarea
        value={nilai}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${kelasKotak} ${tinggi} resize-y font-medium leading-relaxed`}
      />
    </label>
  );
}
