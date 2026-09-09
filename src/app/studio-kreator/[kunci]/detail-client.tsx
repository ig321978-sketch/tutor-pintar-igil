"use client";

import Link from "next/link";
import { useState } from "react";
import EditorNaskahMateri from "@/components/EditorNaskahMateri";
import PageShell from "@/components/PageShell";
import type { DetailCacheMateri, IsiCacheMateri } from "@/lib/cache-materi-tutor";
import { pecahKunciMateri } from "@/lib/cache-materi-tutor";
import { naskahLatihanSaja, kunciLatihanSaja } from "@/lib/kuis";
import { formatWaktuCache } from "@/lib/studio-kreator";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

type StatusAksi = "idle" | "simpan" | "hapus" | "kunci" | "generate";

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
  const [dialogBukaKunci, setDialogBukaKunci] = useState(false);

  const jalurApi = `/api/studio-kreator/${encodeURIComponent(kunci)}`;
  const terkunci = Boolean(meta?.isLocked);

  function terapkan(data: DetailCacheMateri) {
    setMeta(data);
    setIsi(isiDariDetail(data));
  }

  async function aturKunciNaskah(nilai: boolean) {
    setAksi("kunci");
    setPesan("");
    setGalat("");
    try {
      const res = await fetch(`${jalurApi}/kunci`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_locked: nilai }),
      });
      const json = (await res.json()) as {
        berhasil?: boolean;
        data?: DetailCacheMateri;
        pesan?: string;
      };
      if (!res.ok || !json.berhasil || !json.data) {
        setGalat(json.pesan || "Gagal mengubah status kunci naskah.");
        return;
      }
      terapkan(json.data);
      setPesan(
        json.data.isLocked
          ? "Naskah terkunci. Edit dan generate AI diblokir."
          : "Naskah terbuka. Editor dan aksi aktif kembali.",
      );
    } catch {
      setGalat("Tidak bisa mengubah status kunci naskah.");
    } finally {
      setAksi("idle");
      setDialogBukaKunci(false);
    }
  }

  function klikToggleKunci() {
    if (!meta) return;
    if (meta.isLocked) {
      setDialogBukaKunci(true);
      return;
    }
    void aturKunciNaskah(true);
  }

  async function muatNaskahTersimpan() {
    const ulang = await fetch(jalurApi, { cache: "no-store" });
    const detail = (await ulang.json()) as {
      berhasil?: boolean;
      data?: DetailCacheMateri;
    };
    if (detail.berhasil && detail.data) {
      terapkan(detail.data);
      return detail.data;
    }
    return null;
  }

  async function generateDenganAi() {
    const ident = meta
      ? { kelas: meta.kelas, mapel: meta.mapel, materi: meta.materi }
      : pecahKunciMateri(kunci);
    if (!ident) return;
    if (terkunci) return;
    const naskahAda = Boolean(
      isi.curriculum_view.trim() ||
        isi.global_best_view.trim() ||
        meta?.curriculum_view.trim() ||
        meta?.global_best_view.trim(),
    );
    const yakin = window.confirm(
      naskahAda
        ? "Naskah sudah ada. Generate ulang dengan AI akan menimpa naskah tersimpan. Lanjutkan?"
        : "Belum ada naskah tersimpan. Generate dengan AI untuk mengisi modul kosong?",
    );
    if (!yakin) return;
    setAksi("generate");
    setPesan("");
    setGalat("");
    try {
      const res = await fetch("/api/modul", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: "Siswa",
          kelas: ident.kelas,
          mapel: ident.mapel,
          materi: ident.materi,
          forceRegenerate: true,
        }),
      });
      const json = (await res.json()) as {
        berhasil?: boolean;
        pesan?: string;
        terkunci?: boolean;
        dariCache?: boolean;
      };
      if (!res.ok || !json.berhasil) {
        setGalat(json.pesan || "Gagal generate dengan AI.");
        return;
      }
      await muatNaskahTersimpan();
      setPesan(
        json.dariCache
          ? "Generate selesai, tetapi server masih mengembalikan cache lama."
          : "Generate AI selesai. Naskah baru tersimpan ke cache modul.",
      );
    } catch {
      setGalat("Tidak bisa memanggil generate AI.");
    } finally {
      setAksi("idle");
    }
  }

  async function simpanPerubahan() {
    if (terkunci) return;
    setAksi("simpan");
    setPesan("");
    setGalat("");
    try {
      const res = await fetch(jalurApi, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...isi,
          pertanyaan: naskahLatihanSaja(isi.pertanyaan),
          kunciJawaban: kunciLatihanSaja(isi.kunciJawaban),
        }),
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
    if (terkunci) {
      setGalat("Materi terkunci dan tidak dapat diubah. Buka gembok terlebih dahulu.");
      return;
    }
    const yakin = window.confirm(
      "Yakin ingin menghapus cache Materi dan cache Latihan modul ini? Cache tutor ikut terhapus. Website tidak akan menampilkan cache yang sudah dihapus. Ujian tetap acak tanpa cache.",
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
        "Cache Materi dan cache Latihan terhapus dari database dan tutor. Website tidak menampilkan cache ini lagi. Generate baru hanya jika siswa membuka Materi/Latihan.",
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
      subjudul="Cache Materi dan cache Latihan tersimpan di database. Hapus di sini langsung menghapus cache tutor. Ujian acak tanpa cache."
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
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={klikToggleKunci}
              disabled={sibuk}
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-extrabold ${
                terkunci
                  ? "bg-[#1C01A5] text-white"
                  : "border border-[#1C01A5]/20 bg-white text-[#1C01A5]"
              }`}
            >
              {terkunci ? "🔒 Terkunci" : "🔓 Terbuka"}
            </button>
            <span className="text-sm font-semibold text-slate-600">
              {terkunci
                ? "Buka gembok untuk mengedit atau generate ulang."
                : "Kunci naskah agar tidak tertimpa AI atau suntingan tak sengaja."}
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-6 rounded-3xl border border-dashed border-[#1C01A5]/25 bg-[#F8F7FF] px-5 py-8">
          <p className="text-xl font-extrabold text-[#1C01A5]">Kosong / Belum Ada</p>
          <p className="mt-2 font-semibold text-slate-600">
            Cache modul ini belum ada. Generate dengan AI di bawah, atau biarkan
            siswa membuka Materi di Ruang Belajar.
          </p>
          <button
            type="button"
            onClick={() => void generateDenganAi()}
            disabled={sibuk}
            className={`${kelasTombolUtama} mt-5 inline-flex items-center justify-center rounded-2xl px-5 py-3 font-extrabold disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {aksi === "generate" ? "Menghubungi AI..." : "Generate dengan AI"}
          </button>
        </div>
      )}

      {terkunci ? (
        <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 font-extrabold text-amber-800">
          🔒 Naskah Terkunci. Buka gembok untuk mengedit atau generate ulang.
        </p>
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

      {meta ? (
        <>
      <div className="space-y-8">
        <section className="space-y-5">
          <h2 className="text-lg font-black text-[#1C01A5]">Cache Materi</h2>
          <p className="text-sm font-semibold text-slate-600">
            Naskah Kurikulum Sekolah, Trik Percepatan, dan sketsa doodle.
          </p>
          <EditorNaskahMateri
            label="Kurikulum Sekolah"
            nilai={isi.curriculum_view}
            disabled={sibuk || terkunci}
            onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, curriculum_view: nilai }))}
          />
          <EditorNaskahMateri
            label="Trik Percepatan (Mode Global)"
            nilai={isi.global_best_view}
            disabled={sibuk || terkunci}
            onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, global_best_view: nilai }))}
          />
          <KolomTeks
            label="Sketsa kartu doodle"
            nilai={isi.sketsaKartu}
            tinggi="min-h-32"
            disabled={sibuk || terkunci}
            onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, sketsaKartu: nilai }))}
          />
          <KolomTeks
            label="Motivasi"
            nilai={isi.motivasi}
            tinggi="min-h-24"
            disabled={sibuk || terkunci}
            onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, motivasi: nilai }))}
          />
        </section>
        <section className="space-y-5">
          <h2 className="text-lg font-black text-[#1C01A5]">Cache Latihan</h2>
          <p className="text-sm font-semibold text-slate-600">
            Bank soal pilihan ganda yang dipakai di Latihan. Ujian uraian tidak di-cache.
          </p>
          <KolomTeks
            label="Bank soal pilihan ganda"
            nilai={naskahLatihanSaja(isi.pertanyaan)}
            tinggi="min-h-40"
            disabled={sibuk || terkunci}
            onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, pertanyaan: nilai }))}
          />
          <KolomTeks
            label="Kunci jawaban PG"
            nilai={kunciLatihanSaja(isi.kunciJawaban)}
            tinggi="min-h-24"
            disabled={sibuk || terkunci}
            onChange={(nilai) => setIsi((sekarang) => ({ ...sekarang, kunciJawaban: nilai }))}
          />
        </section>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => void simpanPerubahan()}
          disabled={sibuk || terkunci}
          className={`${kelasTombolUtama} inline-flex items-center justify-center rounded-2xl px-5 py-4 text-lg font-extrabold shadow-lg shadow-[#1C01A5]/20 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {aksi === "simpan" ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        <button
          type="button"
          onClick={() => void generateDenganAi()}
          disabled={sibuk || terkunci}
          className="inline-flex items-center justify-center rounded-2xl border-2 border-[#1C01A5] bg-white px-5 py-4 text-lg font-extrabold text-[#1C01A5] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {aksi === "generate" ? "Menghubungi AI..." : "Generate dengan AI"}
        </button>
        <button
          type="button"
          onClick={() => void hapusModul()}
          disabled={sibuk || terkunci}
          className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-4 text-lg font-extrabold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {aksi === "hapus" ? "Menghapus cache..." : "Hapus cache Materi & Latihan"}
        </button>
      </div>
        </>
      ) : null}

      {dialogBukaKunci ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <p className="text-lg font-black text-[#1C01A5]">Buka kunci naskah?</p>
            <p className="mt-2 font-semibold text-slate-600">
              Setelah terbuka, naskah bisa disunting atau di-generate ulang. Perubahan
              bisa merusak format Markdown, LaTeX, atau SVG.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => void aturKunciNaskah(false)}
                disabled={sibuk}
                className={`${kelasTombolUtama} rounded-2xl px-4 py-3 font-extrabold`}
              >
                {aksi === "kunci" ? "Membuka..." : "Ya, buka kunci"}
              </button>
              <button
                type="button"
                onClick={() => setDialogBukaKunci(false)}
                disabled={sibuk}
                className="rounded-2xl border border-[#1C01A5]/20 px-4 py-3 font-extrabold text-[#1C01A5]"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
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
        readOnly={disabled}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${kelasKotak} ${tinggi} resize-y font-medium leading-relaxed ${
          disabled ? "cursor-not-allowed bg-slate-50 text-slate-600" : ""
        }`}
      />
    </label>
  );
}
