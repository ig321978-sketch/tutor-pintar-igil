import Link from "next/link";

import type { AlasanPagar, AnakLangganan } from "@/lib/pembayaran-qris";

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
  let judul = "Praktikum terbuka setelah langganan aktif";
  let isi =
    "Latihan, Ujian, dan Praktikum terbuka setelah langganan 30 hari aktif. Materi dan Simulasi tetap gratis. Tidak ada batas kuota siswa.";
  if (alasan === "belum_masuk") {
    judul = "Praktikum terbuka setelah kamu masuk";
    isi = "Masuk ke akun orang tua dulu. Setelah langganan 30 hari aktif, Praktikum bisa dikerjakan.";
  } else if (alasan === "belum_ada_anak") {
    judul = "Praktikum terbuka setelah profil anak dibuat";
    isi = "Daftarkan profil anak dulu, lalu aktifkan langganan 30 hari untuk membuka Praktikum.";
  } else if (alasan === "pilih_anak") {
    judul = "Pilih anak yang langganannya aktif";
    isi = "Setiap anak punya masa aktif sendiri. Pilih anak yang sudah berlangganan, atau bayar untuk anak yang belum.";
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
        {alasan === "nonaktif" ? (
          <Link href={sasaran ? `/langganan?anak=${sasaran.id}` : "/langganan"} className={tombol}>
            Buka pembayaran Rp 50.000
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
