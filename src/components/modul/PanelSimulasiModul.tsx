"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import type { BahanSimulasi } from "@/lib/simulasi-global";

export default function PanelSimulasiModul({
  nama,
  kelas,
  mapel,
  materi,
  onSelesai,
}: {
  nama: string;
  kelas: string;
  mapel: string;
  materi: string;
  onSelesai?: () => void;
}) {
  const [bahan, setBahan] = useState<BahanSimulasi[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [pesan, setPesan] = useState("");
  const sudahLapor = useRef(false);

  useEffect(() => {
    let hidup = true;
    setMemuat(true);
    setPesan("");
    void (async () => {
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
        const daftar = data.bahan ?? [];
        setBahan(daftar);
        if (daftar.length > 0 && !sudahLapor.current) {
          sudahLapor.current = true;
          onSelesai?.();
        }
      } catch {
        if (hidup) setPesan("Tidak bisa memuat simulasi interaktif.");
      } finally {
        if (hidup) setMemuat(false);
      }
    })();
    return () => {
      hidup = false;
    };
  }, [nama, kelas, mapel, materi]);

  if (memuat) {
    return (
      <div className="flex items-center justify-center gap-3 py-10">
        <Loader2 className="h-6 w-6 animate-spin text-[#1C01A5]" />
        <p className="font-extrabold text-[#1C01A5]">
          Mencari simulasi PhET, GeoGebra, dan Desmos...
        </p>
      </div>
    );
  }

  if (pesan || bahan.length === 0) {
    return (
      <p className="font-semibold text-slate-600">
        {pesan || "Belum ketemu simulasi yang cocok untuk materi ini."}
      </p>
    );
  }

  return (
    <div className="space-y-8">
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
    </div>
  );
}
