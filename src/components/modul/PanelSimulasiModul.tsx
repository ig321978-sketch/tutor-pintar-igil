"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ExternalLink, Loader2, Send, Sparkles } from "lucide-react";
import type { BahanSimulasi } from "@/lib/simulasi-global";
import { kelasKotak, kelasLabel, kelasTombolUtama } from "@/lib/tema";

type MisiSimulasi = {
  misi: string;
  langkah: string;
  pertanyaan: string;
};

type EvaluasiSimulasi = {
  lulus: boolean;
  umpanBalik: string;
};

function kunciCacheMisi(kelas: string, mapel: string, materi: string) {
  return `igil-misi-simulasi:${kelas}|${mapel}|${materi}`;
}

function bacaCacheMisi(kunci: string): MisiSimulasi | null {
  try {
    const mentah = sessionStorage.getItem(kunci);
    if (!mentah) return null;
    const data = JSON.parse(mentah) as Partial<MisiSimulasi>;
    if (
      typeof data.misi === "string" &&
      data.misi.trim().length >= 16 &&
      typeof data.pertanyaan === "string" &&
      data.pertanyaan.trim().length >= 12
    ) {
      return {
        misi: data.misi.trim(),
        langkah: typeof data.langkah === "string" ? data.langkah.trim() : "",
        pertanyaan: data.pertanyaan.trim(),
      };
    }
  } catch {
    /* abaikan cache rusak */
  }
  return null;
}

function simpanCacheMisi(kunci: string, misi: MisiSimulasi) {
  try {
    sessionStorage.setItem(kunci, JSON.stringify(misi));
  } catch {
    /* kuota penuh: lanjut tanpa cache */
  }
}

function bacaGambarBukti(berkas: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (berkas.size > 1.5 * 1024 * 1024) {
      reject(new Error("Foto terlalu besar. Maksimal 1,5 MB."));
      return;
    }
    if (!/^image\/(png|jpe?g|webp)$/i.test(berkas.type)) {
      reject(new Error("Unggah PNG, JPG, atau WebP."));
      return;
    }
    const pembaca = new FileReader();
    pembaca.onload = () => resolve(String(pembaca.result || ""));
    pembaca.onerror = () => reject(new Error("Gagal membaca foto."));
    pembaca.readAsDataURL(berkas);
  });
}

export default function PanelSimulasiModul({
  nama,
  kelas,
  mapel,
  materi,
  sudahLulus = false,
  onSelesai,
}: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  sudahLulus?: boolean;
  onSelesai?: (lulus: boolean, catatan: string) => void;
}) {
  const [bahan, setBahan] = useState<BahanSimulasi[]>([]);
  const [misi, setMisi] = useState<MisiSimulasi | null>(null);
  const [memuat, setMemuat] = useState(true);
  const [menilai, setMenilai] = useState(false);
  const [pesan, setPesan] = useState("");
  const [bukti, setBukti] = useState("");
  const [gambar, setGambar] = useState("");
  const [namaGambar, setNamaGambar] = useState("");
  const [evaluasi, setEvaluasi] = useState<EvaluasiSimulasi | null>(null);
  const [ulangMisi, setUlangMisi] = useState(0);
  const sedangKirim = useRef(false);
  const inputGambarRef = useRef<HTMLInputElement>(null);

  const tuntas = sudahLulus || Boolean(evaluasi?.lulus);

  useEffect(() => {
    let hidup = true;
    setMemuat(true);
    setPesan("");
    if (!sudahLulus) {
      setMisi(null);
      setEvaluasi(null);
    }

    void (async () => {
      const kunci = kunciCacheMisi(kelas, mapel, materi);
      const cache = sudahLulus ? null : bacaCacheMisi(kunci);

      if (sudahLulus || cache) {
        try {
          const respons = await fetch("/api/praktikum", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nama,
              kelas,
              mapel,
              materi,
              ide: "",
              pratinjau: true,
            }),
          });
          const data = (await respons.json()) as {
            berhasil?: boolean;
            pesan?: string;
            bahan?: BahanSimulasi[];
          };
          if (!hidup) return;
          if (!data.berhasil) {
            setPesan(data.pesan || "Simulasi belum tersedia untuk bab ini.");
            setBahan([]);
            return;
          }
          setBahan(data.bahan ?? []);
          if (cache) setMisi(cache);
        } catch {
          if (hidup) setPesan("Tidak bisa memuat simulasi interaktif.");
        } finally {
          if (hidup) setMemuat(false);
        }
        return;
      }

      try {
        const respons = await fetch("/api/simulasi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aksi: "misi",
            nama,
            kelas,
            mapel,
            materi,
          }),
        });
        const data = (await respons.json()) as {
          berhasil?: boolean;
          pesan?: string;
          misi?: MisiSimulasi | null;
          bahan?: BahanSimulasi[];
        };
        if (!hidup) return;
        const daftar = data.bahan ?? [];
        setBahan(daftar);
        if (!data.berhasil || !data.misi) {
          setPesan(
            data.pesan ||
              (daftar.length === 0
                ? "Belum ketemu simulasi yang cocok untuk materi ini."
                : "Gagal menyusun misi, silakan klik lagi."),
          );
          setMisi(null);
          return;
        }
        setMisi(data.misi);
        simpanCacheMisi(kunci, data.misi);
      } catch {
        if (hidup) setPesan("Gagal menyusun misi, silakan klik lagi.");
      } finally {
        if (hidup) setMemuat(false);
      }
    })();

    return () => {
      hidup = false;
    };
  }, [nama, kelas, mapel, materi, sudahLulus, ulangMisi]);

  const pilihGambar = async (berkas: File | undefined) => {
    if (!berkas) return;
    setPesan("");
    try {
      const dataUrl = await bacaGambarBukti(berkas);
      setGambar(dataUrl);
      setNamaGambar(berkas.name);
    } catch (error) {
      setGambar("");
      setNamaGambar("");
      setPesan(error instanceof Error ? error.message : "Gagal membaca foto.");
    }
  };

  const kirimBukti = async () => {
    if (sedangKirim.current || menilai || tuntas || !misi) return;
    setPesan("");
    if (bukti.trim().length < 12 && !gambar) {
      setPesan(
        "Tulis pengamatanmu, atau unggah tangkapan layar lab, lalu kirim bukti.",
      );
      return;
    }
    sedangKirim.current = true;
    setMenilai(true);
    try {
      const respons = await fetch("/api/simulasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aksi: "nilai",
          nama,
          kelas,
          mapel,
          materi,
          misi: misi.misi,
          pertanyaan: misi.pertanyaan,
          bukti: bukti.trim(),
          gambar: gambar || null,
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        pesan?: string;
        evaluasi?: EvaluasiSimulasi;
      };
      if (!data.berhasil || !data.evaluasi) {
        setPesan(data.pesan || "Gagal menilai simulasi, silakan kirim lagi.");
        return;
      }
      setEvaluasi(data.evaluasi);
      if (data.evaluasi.lulus) {
        onSelesai?.(true, data.evaluasi.umpanBalik);
      }
    } catch {
      setPesan("Gagal menilai simulasi, silakan kirim lagi.");
    } finally {
      sedangKirim.current = false;
      setMenilai(false);
    }
  };

  if (memuat) {
    return (
      <div className="flex items-center justify-center gap-3 py-10">
        <Loader2 className="h-6 w-6 animate-spin text-[#1C01A5]" />
        <p className="font-extrabold text-[#1C01A5]">
          {sudahLulus
            ? "Memuat lab simulasi..."
            : "Menyusun misi dan mencari lab..."}
        </p>
      </div>
    );
  }

  if (bahan.length === 0) {
    return (
      <div className="space-y-4">
        <p className="font-semibold text-slate-600">
          {pesan || "Belum ketemu simulasi yang cocok untuk materi ini."}
        </p>
        {pesan.includes("klik lagi") ? (
          <button
            type="button"
            onClick={() => setUlangMisi((n) => n + 1)}
            className={`${kelasTombolUtama} inline-flex items-center justify-center rounded-2xl px-5 py-3 font-extrabold`}
          >
            Coba susun misi lagi
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {misi ? (
        <section className="rounded-2xl border-2 border-[#F0AB00] bg-[#FFF8E8] p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-[#F0AB00]">
            Misi simulasi
          </p>
          <p className="mt-2 text-lg font-extrabold text-[#1C01A5]">{misi.misi}</p>
          {misi.langkah ? (
            <div className="mt-4 whitespace-pre-wrap text-slate-700">
              <p className="mb-1 font-extrabold text-[#1C01A5]">Langkah</p>
              {misi.langkah}
            </div>
          ) : null}
          <p className="mt-4 text-slate-700">
            <span className="font-extrabold text-[#1C01A5]">
              Yang harus kamu buktikan:{" "}
            </span>
            {misi.pertanyaan}
          </p>
        </section>
      ) : !sudahLulus ? (
        <div className="space-y-3">
          <p className="font-semibold text-rose-600">
            {pesan || "Gagal menyusun misi, silakan klik lagi."}
          </p>
          <button
            type="button"
            onClick={() => setUlangMisi((n) => n + 1)}
            className={`${kelasTombolUtama} inline-flex items-center justify-center rounded-2xl px-5 py-3 font-extrabold`}
          >
            Coba susun misi lagi
          </button>
        </div>
      ) : null}

      {bahan.map((item, indeks) => (
        <section
          key={item.url}
          className={indeks > 0 ? "border-t border-[#1C01A5]/10 pt-6" : ""}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[#F0AB00]">
            {item.sumber}
          </p>
          <p className="mt-2 font-extrabold text-[#1C01A5]">{item.judul}</p>
          <p className="mt-2 text-sm text-slate-600">{item.ringkasan}</p>
          {item.jenis === "simulasi" ? (
            <iframe
              title={item.judul}
              src={item.url}
              className="mt-4 h-[28rem] w-full rounded-2xl border border-[#1C01A5]/10 bg-slate-50"
              loading="lazy"
              allow="fullscreen; autoplay; xr-spatial-tracking; clipboard-write"
              allowFullScreen
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.url}
              alt={item.judul}
              className="mt-4 max-h-72 w-full rounded-2xl object-cover"
            />
          )}
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#1C01A5] hover:text-[#F0AB00]"
          >
            <ExternalLink className="h-4 w-4" />
            Buka layar penuh
          </a>
        </section>
      ))}

      {tuntas ? (
        <section className="rounded-2xl border-2 border-[#1C01A5]/15 bg-white p-5">
          <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-[#1C01A5]">
            <Sparkles className="h-4 w-4 text-[#F0AB00]" />
            Misi tuntas
          </p>
          <p className="mt-2 text-lg font-medium text-slate-700">
            {evaluasi?.umpanBalik ||
              "Kamu sudah menuntaskan misi simulasi bab ini."}
          </p>
        </section>
      ) : misi ? (
        <section className="border-t border-[#1C01A5]/10 pt-6">
          <label className={kelasLabel} htmlFor="bukti-simulasi">
            Kirim bukti pengamatan
          </label>
          <p className="mb-3 text-sm font-medium text-slate-600">
            Mainkan lab dulu, lalu tulis angka atau yang kamu lihat. Boleh
            tambah tangkapan layar.
          </p>
          <textarea
            id="bukti-simulasi"
            value={bukti}
            onChange={(e) => setBukti(e.target.value)}
            rows={5}
            placeholder="Contoh: Saya naikkan massa jadi 2 kg, waktu ayunan jadi 1,4 detik."
            className={`${kelasKotak} min-h-32 resize-y text-lg`}
            disabled={menilai}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input
              ref={inputGambarRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
              onChange={(e) => {
                void pilihGambar(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => inputGambarRef.current?.click()}
              disabled={menilai}
              className="igil-tombol inline-flex items-center gap-2 rounded-2xl border-2 border-[#1C01A5]/20 bg-white px-4 py-3 font-extrabold text-[#1C01A5]"
            >
              <Camera className="h-4 w-4" />
              {namaGambar || "Unggah tangkapan layar"}
            </button>
            {gambar ? (
              <button
                type="button"
                onClick={() => {
                  setGambar("");
                  setNamaGambar("");
                }}
                className="text-sm font-bold text-rose-700"
              >
                Hapus foto
              </button>
            ) : null}
          </div>
          {gambar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={gambar}
              alt="Tangkapan layar bukti"
              className="mt-4 max-h-48 rounded-xl border border-[#1C01A5]/15 object-contain"
            />
          ) : null}
          {pesan ? (
            <p className="mt-4 font-semibold text-rose-600">{pesan}</p>
          ) : null}
          {evaluasi && !evaluasi.lulus ? (
            <p className="mt-4 font-medium text-slate-700">
              <span className="font-extrabold text-[#1C01A5]">Belum lulus. </span>
              {evaluasi.umpanBalik}
            </p>
          ) : null}
          <button
            type="button"
            onClick={() => void kirimBukti()}
            disabled={menilai}
            className={`${kelasTombolUtama} mt-5 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-lg font-extrabold shadow-lg shadow-[#1C01A5]/20`}
          >
            {menilai ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            {menilai ? "Guru AI sedang menilai..." : "Kirim bukti ke guru AI"}
          </button>
        </section>
      ) : null}
    </div>
  );
}
