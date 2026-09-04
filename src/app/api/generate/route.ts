import { NextResponse } from "next/server";
import { hasilkanTeksGemini, pesanGalatGemini } from "@/lib/klien-gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, kelas, mapel, materi } = body;

    const teks = await hasilkanTeksGemini(`
      Kamu adalah "Tutor $IGIL", guru privat AI yang pintar dan ramah.
      Siswa: ${nama} (Jenjang: ${kelas}).
      Mata Pelajaran: ${mapel}.
      Topik/Materi: ${materi}.

      Tugas: Berikan sapaan, jelaskan materi dengan bahasa yang mudah dipahami sesuai umur/kelas, dan berikan 1 contoh soal beserta jawabannya. Gunakan pemformatan yang rapi.
    `);

    return NextResponse.json({ berhasil: true, teks });
  } catch (error: unknown) {
    console.error("Error Detail dari Sistem:", error);
    return NextResponse.json(
      { berhasil: false, pesan: pesanGalatGemini(error) },
      { status: 500 },
    );
  }
}
