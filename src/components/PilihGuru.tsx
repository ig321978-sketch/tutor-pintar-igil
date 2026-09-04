"use client";

import { useEffect } from "react";
import { Volume2 } from "lucide-react";
import {
  pasanganGuru,
  putarContohSuaraGuru,
  type KelaminGuru,
  type ProfilGuru,
} from "@/lib/guru";
import { kelasLabel } from "@/lib/tema";

type EntriAudio = {
  audio: HTMLAudioElement;
};

const cacheContoh = new Map<string, EntriAudio>();
const inflightContoh = new Map<string, Promise<EntriAudio | null>>();

function kunciContoh(kelas: string, kelamin: KelaminGuru) {
  return `${kelas}:${kelamin}`;
}

function hentikanSemuaContoh() {
  cacheContoh.forEach((entri) => {
    entri.audio.pause();
    entri.audio.currentTime = 0;
  });
  if (typeof window !== "undefined") window.speechSynthesis.cancel();
}

async function muatContohGuru(
  guru: ProfilGuru,
  kelas: string,
): Promise<EntriAudio | null> {
  const kunci = kunciContoh(kelas, guru.kelamin);
  const siap = cacheContoh.get(kunci);
  if (siap) return siap;
  const berjalan = inflightContoh.get(kunci);
  if (berjalan) return berjalan;

  const permintaan = (async () => {
    try {
      const respons = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teks: guru.sapaanContoh,
          kelamin: guru.kelamin === "pria" ? "male" : "female",
          kelas,
        }),
      });
      const data = (await respons.json()) as {
        berhasil?: boolean;
        cadangan?: boolean;
        mime?: string;
        audioBase64?: string;
      };
      if (!data.berhasil || data.cadangan || !data.audioBase64) return null;
      const biner = Uint8Array.from(atob(data.audioBase64), (huruf) =>
        huruf.charCodeAt(0),
      );
      const url = URL.createObjectURL(
        new Blob([biner], { type: data.mime || "audio/wav" }),
      );
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.load();
      const entri = { audio };
      cacheContoh.set(kunci, entri);
      return entri;
    } catch {
      return null;
    } finally {
      inflightContoh.delete(kunci);
    }
  })();

  inflightContoh.set(kunci, permintaan);
  return permintaan;
}

async function putarContohSiap(guru: ProfilGuru, kelas: string) {
  const kunci = kunciContoh(kelas, guru.kelamin);
  const siap = cacheContoh.get(kunci);
  hentikanSemuaContoh();
  if (siap) {
    siap.audio.currentTime = 0;
    await siap.audio.play();
    return;
  }
  const entri = await muatContohGuru(guru, kelas);
  if (!entri) {
    putarContohSuaraGuru(guru);
    return;
  }
  hentikanSemuaContoh();
  entri.audio.currentTime = 0;
  await entri.audio.play();
}

type PropsPilihGuru = {
  kelas: string;
  nilai: KelaminGuru;
  onGanti: (kelamin: KelaminGuru) => void;
};

export default function PilihGuru({ kelas, nilai, onGanti }: PropsPilihGuru) {
  useEffect(() => {
    for (const guru of pasanganGuru(kelas)) {
      void muatContohGuru(guru, kelas);
    }
  }, [kelas]);

  return (
    <div>
      <p className={kelasLabel}>Pilih guru pengajar</p>
      <div className="grid gap-3">
        {pasanganGuru(kelas).map((guru) => {
          const aktif = nilai === guru.kelamin;
          return (
            <div
              key={guru.kelamin}
              className={`rounded-2xl border-2 p-4 transition-all ${
                aktif
                  ? "border-[#1C01A5] bg-[#1C01A5]/5"
                  : "border-[#1C01A5]/15 bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => onGanti(guru.kelamin)}
                className="w-full text-left"
              >
                <p className="text-3xl" aria-hidden>
                  {guru.kelamin === "wanita" ? "👩‍🏫" : "👨‍🏫"}
                </p>
                <p className="mt-2 font-extrabold text-[#1C01A5]">{guru.nama}</p>
                <p className="text-sm text-slate-600">{guru.peran}</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  void putarContohSiap(guru, kelas).catch(() => {
                    putarContohSuaraGuru(guru);
                  });
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-[#F0AB00] bg-[#F0AB00] px-3 py-2 text-sm font-extrabold text-[#1C01A5] hover:bg-[#e09e00]"
              >
                <Volume2 className="h-4 w-4" />
                Putar suara
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
