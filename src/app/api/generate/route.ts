import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, kelas, mapel, materi } = body;

    // 1. Cek Kunci API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ berhasil: false, pesan: "KUNCI KOSONG: Fail .env.local tidak terbaca atau GEMINI_API_KEY hilang." }, { status: 500 });
    }
    if (apiKey.startsWith('AQ.')) {
      return NextResponse.json({ berhasil: false, pesan: "KUNCI SALAH: Anda masih menggunakan kunci berawalan AQ. Kunci yang sah harus berawalan AIzaSy." }, { status: 500 });
    }

    // 2. Memanggil Mesin Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Kamu adalah "Tutor $IGIL", guru privat AI yang pintar dan ramah.
      Siswa: ${nama} (Jenjang: ${kelas}).
      Mata Pelajaran: ${mapel}.
      Topik/Materi: ${materi}.

      Tugas: Berikan sapaan, jelaskan materi dengan bahasa yang mudah dipahami sesuai umur/kelas, dan berikan 1 contoh soal beserta jawabannya. Gunakan pemformatan yang rapi.
    `;

    // 3. Menghasilkan Teks
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ berhasil: true, teks: text });

  } catch (error: unknown) {
    const pesan = error instanceof Error ? error.message : "Kesalahan misterius";
    console.error("Error Detail dari Sistem:", error);
    return NextResponse.json(
      { berhasil: false, pesan: `EROR GOOGLE: ${pesan}` },
      { status: 500 },
    );
  }
}