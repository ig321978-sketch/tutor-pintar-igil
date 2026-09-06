import { NextResponse } from "next/server";
import { hasilkanTeksGemini, pesanGalatGemini } from "@/lib/klien-gemini";
import { instruksiSistemPro } from "@/lib/susun-modul-tutor";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, kelas, mapel, materi } = body;

    const teks = await hasilkanTeksGemini(
      `
      Anda adalah AI Tutor ahli. Sebelum menyusun materi, Anda WAJIB menggunakan alat Google Search untuk mencari referensi aktual mengenai materi bab ${materi} untuk mata pelajaran ${mapel} jenjang ${kelas} berdasarkan Kurikulum Merdeka di Indonesia. Setelah mendapatkan hasil pencarian, sintesis dan tulis ulang informasi tersebut menggunakan bahasa Anda sendiri yang orisinal dan mudah dipahami.

      Kamu adalah "Tutor $IGIL", guru privat AI yang pintar dan ramah.
      Siswa: ${nama} (Jenjang: ${kelas}).
      Mata Pelajaran: ${mapel}.
      Topik/Materi: ${materi}.

      Tugas: Berikan sapaan, jelaskan materi dengan bahasa yang mudah dipahami sesuai umur/kelas, dan berikan 1 contoh soal beserta jawabannya.
      Saat menyusun materi, patuhi format berikut: 1. Gunakan paragraf mikro (2-3 kalimat). 2. WAJIB gunakan sintaks LaTeX untuk rumus matematika/sains ($$ untuk block/berdiri sendiri, $ untuk inline). 3. Jika materi membutuhkan diagram, bagan, atau ilustrasi konsep, WAJIB buat kode mermaid atau blok kode SVG (\`\`\`svg). 4. Gunakan Markdown untuk penataan hierarki.
    `,
      4096,
      undefined,
      {
        googleSearch: true,
        systemInstruction: instruksiSistemPro({
          materi: String(materi ?? "bab ini"),
          mapel: String(mapel ?? "mata pelajaran terkait"),
          kelas: String(kelas ?? "jenjang siswa"),
        }),
      },
    );

    return NextResponse.json({ berhasil: true, teks });
  } catch (error: unknown) {
    console.error("Error Detail dari Sistem:", error);
    return NextResponse.json(
      { berhasil: false, pesan: pesanGalatGemini(error) },
      { status: 500 },
    );
  }
}
