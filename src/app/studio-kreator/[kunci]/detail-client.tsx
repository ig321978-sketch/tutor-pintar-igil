"use client";

import Link from "next/link";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import type { DetailCacheMateri, IsiCacheMateri } from "@/lib/cache-materi-tutor";
import { formatWaktuCache } from "@/lib/studio-kreator";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

type StatusAksi = "idle" | "simpan" | "regenerate";

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
  const [galat, setGalat] = useState(awal ? "" : "Cache modul tidak ditemukan.");

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

  async function regenerateModul() {
    const yakin = window.confirm(
      "Ini akan menghapus paksa baris cache modul di Supabase, lalu memanggil Gemini Pro untuk membuat versi baru dari nol. Proses ini memakai kuota AI dan tidak bisa dibatalkan. Lanjutkan?",
    );
    if (!yakin) return;
    setAksi("regenerate");
    setPesan("");
    setGalat("");
    try {
      const res = await fetch(`${jalurApi}/regenerate`, { method: "POST" });
      const json = (await res.json()) as {
        berhasil?: boolean;
        data?: DetailCacheMateri;
        pesan?: string;
      };
      if (!res.ok || !json.berhasil) {
        setGalat(json.pesan || "Gagal regenerate modul.");
        return;
      }
      if (json.data) terapkan(json.data);
      setPesan("Modul baru dari Gemini Pro sudah menggantikan cache lama.");
    } catch {
      setGalat("Tidak bisa memanggil regenerate AI.");
    } finally {
      setAksi("idle");
    }
  }

  const sibuk = aksi !== "idle";

  return (
    <PageShell
      judul="🎨 Detail Studio Kreator"
      subjudul="Edit naskah cache secara manual, atau hapus cache lalu generate ulang dengan Gemini Pro."
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
            {meta.audioSiap ? "audio siap" : "audio belum"} ·{" "}
            {formatWaktuCache(meta.updatedAt)}
          </p>
        </div>
      ) : null}

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
        <KolomTeks
          label="Kode SVG (opsional)"
          nilai={isi.svgCode}
          tinggi="min-h-24"
          disabled={sibuk}
          onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, svgCode: nilai }))}
        />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void simpanPerubahan()}
          disabled={sibuk || !meta}
          className={`${kelasTombolUtama} inline-flex items-center justify-center rounded-2xl px-5 py-4 text-lg font-extrabold shadow-lg shadow-[#1C01A5]/20`}
        >
          {aksi === "simpan" ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <button
          type="button"
          onClick={() => void regenerateModul()}
          disabled={sibuk}
          className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-4 text-lg font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:opacity-70"
        >
          {aksi === "regenerate" ? "Menghapus & generate ulang..." : "Regenerate Modul (AI)"}
        </button>
      </div>
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
