import { NextResponse } from "next/server";
import {
  adalahGalatMateriTerkunci,
  cacheModulSedangDihapus,
  gabungCacheMateri,
  materiSedangTerkunci,
  muatDaftarCacheAdmin,
} from "@/lib/cache-materi-tutor";
import { responsMateriTerkunci } from "@/lib/respons-materi-terkunci";
import { isiDariBadanStudio, sebagaiTeksStudio } from "@/lib/studio-kreator";
import { bentukModulTutor, keIsiCache } from "@/lib/susun-modul-tutor";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TANPA_CACHE = {
  "Cache-Control": "no-store, max-age=0",
};

export async function GET() {
  const hasil = await muatDaftarCacheAdmin();
  return NextResponse.json(
    {
      berhasil: hasil.siap,
      daftar: hasil.daftar,
      penyimpananSiap: hasil.siap,
      pesan: hasil.pesan,
    },
    { headers: TANPA_CACHE, status: hasil.siap ? 200 : 503 },
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { berhasil: false, pesan: "Request JSON tidak valid." },
      { status: 400, headers: TANPA_CACHE },
    );
  }

  const nama = sebagaiTeksStudio(body.nama, "Siswa");
  const kelas = sebagaiTeksStudio(body.kelas);
  const mapel = sebagaiTeksStudio(body.mapel);
  const materi = sebagaiTeksStudio(body.materi);
  if (!kelas || !mapel || !materi) {
    return NextResponse.json(
      { berhasil: false, pesan: "kelas, mapel, dan materi wajib diisi." },
      { status: 400, headers: TANPA_CACHE },
    );
  }

  const mentah =
    body.data && typeof body.data === "object"
      ? (body.data as Record<string, unknown>)
      : body;
  const dariModul = keIsiCache(bentukModulTutor(nama, mentah, { mapel, materi }));
  const isiManual = isiDariBadanStudio(mentah);
  const isi = {
    curriculum_view: dariModul.curriculum_view || isiManual.curriculum_view,
    global_best_view: dariModul.global_best_view || isiManual.global_best_view,
    sketsaKartu: dariModul.sketsaKartu || isiManual.sketsaKartu,
    svgCode: dariModul.svgCode || isiManual.svgCode,
    pertanyaan: dariModul.pertanyaan || isiManual.pertanyaan,
    kunciJawaban: dariModul.kunciJawaban || isiManual.kunciJawaban,
    motivasi: dariModul.motivasi || isiManual.motivasi,
  };
  if (
    !isi.curriculum_view.trim() &&
    !isi.global_best_view.trim() &&
    !isi.pertanyaan.trim()
  ) {
    return NextResponse.json(
      { berhasil: false, pesan: "Naskah modul kosong, cache tidak disimpan." },
      { status: 400, headers: TANPA_CACHE },
    );
  }

  if (await materiSedangTerkunci(kelas, mapel, materi)) {
    return responsMateriTerkunci();
  }

  const sedangDihapus = await cacheModulSedangDihapus(kelas, mapel, materi);
  if (sedangDihapus) {
    return NextResponse.json(
      {
        berhasil: true,
        tersimpan: false,
        dilewati: true,
        pesan: "Cache modul ini sudah dihapus admin. Tidak ditulis ulang dari klien.",
      },
      { headers: TANPA_CACHE },
    );
  }

  let tersimpan = false;
  try {
    tersimpan = await gabungCacheMateri(kelas, mapel, materi, nama, isi);
  } catch (error) {
    if (adalahGalatMateriTerkunci(error)) return responsMateriTerkunci();
    throw error;
  }
  if (!tersimpan) {
    return NextResponse.json(
      {
        berhasil: false,
        pesan:
          "Gagal menulis cache modul ke Supabase. Cek koneksi dan tabel cache_materi_tutor.",
      },
      { status: 500, headers: TANPA_CACHE },
    );
  }
  return NextResponse.json(
    { berhasil: true, tersimpan: true },
    { headers: TANPA_CACHE },
  );
}
