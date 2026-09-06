import { after, NextResponse } from "next/server";
import { siapkanAudioModulPermanen } from "@/lib/audio-modul";
import {
  ambilDetailCacheMateri,
  hapusCacheMateri,
  pecahKunciMateri,
  topicIdMateri,
} from "@/lib/cache-materi-tutor";
import { pesanGalatGemini } from "@/lib/klien-gemini";
import { kunciRuteStudio } from "@/lib/studio-kreator";
import {
  generateModuleFirstTime,
  keIsiCache,
} from "@/lib/susun-modul-tutor";

export const maxDuration = 120;

export async function POST(
  _req: Request,
  konteks: { params: Promise<{ kunci: string }> | { kunci: string } },
) {
  const kunci = await kunciRuteStudio(konteks.params);
  if (!kunci) {
    return NextResponse.json(
      { berhasil: false, pesan: "Kunci modul wajib diisi." },
      { status: 400 },
    );
  }

  const lama = await ambilDetailCacheMateri(kunci);
  const pecahan = pecahKunciMateri(kunci);
  const kelas = lama?.kelas || pecahan?.kelas || "";
  const mapel = lama?.mapel || pecahan?.mapel || "";
  const materi = lama?.materi || pecahan?.materi || "";
  if (!kelas || !mapel || !materi) {
    return NextResponse.json(
      { berhasil: false, pesan: "Kelas, mapel, atau materi pada cache tidak lengkap." },
      { status: 400 },
    );
  }

  const terhapus = await hapusCacheMateri(kunci);
  if (!terhapus) {
    return NextResponse.json(
      { berhasil: false, pesan: "Gagal menghapus cache modul di Supabase." },
      { status: 500 },
    );
  }

  try {
    const hasil = await generateModuleFirstTime({
      nama: "Siswa",
      kelas,
      mapel,
      materi,
    });
    after(() => {
      void siapkanAudioModulPermanen({
        kelas,
        mapel,
        materi,
        curriculum_view: hasil.curriculum_view,
        global_best_view: hasil.global_best_view,
      });
    });

    const topicId = topicIdMateri(kelas, mapel, materi);
    const data = (await ambilDetailCacheMateri(topicId)) ?? {
      kunci: topicId,
      topicId,
      kelas,
      mapel,
      materi,
      modelSumber: "gemini-3.1-pro",
      isDraft: true,
      audioSiap: false,
      updatedAt: new Date().toISOString(),
      ...keIsiCache(hasil),
    };

    return NextResponse.json({
      berhasil: true,
      dariAi: true,
      data,
    });
  } catch (error: unknown) {
    console.error("STUDIO REGENERATE:", error);
    const pesan = pesanGalatGemini(error);
    const timeout = /waktu lebih lama|TIMEOUT_GEMINI|timeout/i.test(pesan);
    return NextResponse.json(
      { berhasil: false, pesan },
      { status: timeout ? 504 : 500 },
    );
  }
}
