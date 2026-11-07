type Props = { className?: string };

const POIN = [
  { ikon: "📵", teks: "IGIL tidak pernah mengirim pesan ke WhatsApp, Email, maupun SMS." },
  { ikon: "🔔", teks: "Semua kabar (status poin, jeda ujian, pengumuman, jadwal panggilan) hanya muncul di dalam aplikasi ini." },
  { ikon: "⚠️", teks: "Ada pesan atas nama IGIL di luar aplikasi yang meminta kode, PIN, atau uang? Itu bukan dari kami. Abaikan." },
] as const;

/** Penegasan bahwa seluruh informasi IGIL hanya tampil di dalam aplikasi (Bagian 7 .cursorrules). */
export default function PenegasanDalamAplikasi({ className = "" }: Props) {
  return (
    <section
      aria-label="Penegasan komunikasi IGIL"
      className={`mx-auto w-full max-w-5xl rounded-3xl border-2 border-amber-400 bg-white p-4 shadow-sm sm:p-5 ${className}`}
    >
      <p className="inline-block rounded-full bg-[#1C01A5] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-300">
        Hanya di dalam aplikasi
      </p>
      <h3 className="mt-2 text-xl font-black leading-tight text-indigo-950 sm:text-2xl">
        IGIL Tidak Pernah Mengirim Pesan ke WhatsApp atau Email
      </h3>
      <ul className="mt-3 space-y-2">
        {POIN.map((p) => (
          <li key={p.teks} className="flex items-start gap-3 rounded-2xl bg-indigo-50/40 p-3">
            <span aria-hidden="true" className="text-2xl leading-none">
              {p.ikon}
            </span>
            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-indigo-950">{p.teks}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
