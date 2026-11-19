import Link from "next/link";

import { TEKS_KUNCI_JADWAL, type AlasanPagar, type AnakLangganan } from "@/lib/pembayaran-qris";

const tombol =
  "inline-flex min-h-[44px] items-center justify-center rounded-full border-4 border-amber-400 bg-amber-400 px-5 py-2 text-sm font-black text-indigo-950";

/** Pengganti isi Praktikum bila langganan belum aktif. Isi tugas tidak dikirim bersama kartu ini. */
export function KartuPagarLangganan({
  alasan,
  anak,
  anakDipilih,
  kembali,
}: {
  alasan: AlasanPagar;
  anak: readonly AnakLangganan[];
  anakDipilih?: string | null;
  kembali: string;
}) {
  const masuk = `/login?next=${encodeURIComponent(kembali)}`;
  const sasaran = anak.find((a) => a.id === anakDipilih) ?? anak.find((a) => !a.aktif) ?? anak[0];
  const menunggu = alasan === "nonaktif" && sasaran?.menunggu === true;
  let judul = "Praktikum terkunci sampai langganan aktif";
  let isi =
    "Praktikum hanya untuk siswa berlangganan. Setelah langganan aktif, Praktikum tiap bab terbuka bila Ujian bab itu sudah lulus 100%. Materi dan Simulasi tetap gratis.";
  if (alasan === "belum_masuk") {
    judul = "Praktikum terbuka setelah kamu masuk";
    isi =
      "Masuk ke akun orang tua dulu. Praktikum hanya untuk siswa berlangganan yang sudah lulus Ujian 100%.";
  } else if (alasan === "belum_ada_anak") {
    judul = "Praktikum terbuka setelah profil anak dibuat";
    isi =
      "Daftarkan profil anak, aktifkan langganan, lalu luluskan Ujian 100% agar Praktikum terbuka.";
  } else if (alasan === "pilih_anak") {
    judul = "Pilih anak yang langganannya aktif";
    isi = "Setiap anak punya masa aktif sendiri. Pilih anak yang sudah berlangganan, atau bayar untuk anak yang belum.";
  } else if (menunggu) {
    judul = "Langganan Bulan Depan Sudah Lunas!";
    isi = TEKS_KUNCI_JADWAL;
  } else if (alasan === "galat") {
    judul = "Status langganan belum terbaca";
    isi = "Server belum bisa memeriksa langganan. Muat ulang halaman sebentar lagi.";
  }

  return (
    <main className="mx-auto w-full max-w-xl px-3 py-8">
      <section className="space-y-4 rounded-3xl border-4 border-dashed border-amber-400 bg-white p-6 text-center shadow-sm">
        <div className="text-5xl" aria-hidden="true">
          🔒
        </div>
        <h1 className="text-xl font-black text-indigo-950">{judul}</h1>
        <p className="text-base leading-relaxed text-slate-700">{isi}</p>
        {alasan === "belum_masuk" ? (
          <Link href={masuk} className={tombol}>
            MASUK
          </Link>
        ) : null}
        {alasan === "belum_ada_anak" ? (
          <Link href="/daftar" className={tombol}>
            DAFTARKAN PROFIL ANAK
          </Link>
        ) : null}
        {alasan === "nonaktif" && !menunggu ? (
          <Link href={sasaran ? `/langganan?anak=${sasaran.id}` : "/langganan"} className={tombol}>
            Buka pembayaran Rp 50.000
          </Link>
        ) : null}
        {menunggu ? (
          <Link href="/ruang-belajar" className={tombol}>
            Pelajari Materi
          </Link>
        ) : null}
        {alasan === "pilih_anak" ? (
          <ul className="space-y-2 text-left">
            {anak.map((a) => (
              <li key={a.id}>
                {a.aktif ? (
                  <Link href={`${kembali}?anak=${a.id}`} className={`${tombol} w-full`}>
                    Lanjut sebagai {a.nama}
                  </Link>
                ) : a.menunggu ? (
                  <p className="rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-950">
                    {a.nama}: {TEKS_KUNCI_JADWAL}
                  </p>
                ) : (
                  <Link href={`/langganan?anak=${a.id}`} className={`${tombol} w-full bg-white`}>
                    Bayar untuk {a.nama}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}
