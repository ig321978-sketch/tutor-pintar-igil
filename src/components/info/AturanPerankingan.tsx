import { komunitasData as data } from "@/components/komunitas/komunitas-data";

/** Aturan perankingan berjenjang (sekolah sampai nasional). Dulu di halaman Komunitas. */
export default function AturanPerankingan() {
  return (
    <section
      className="mx-auto w-full max-w-5xl rounded-3xl border-2 border-indigo-100 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Aturan perankingan berjenjang"
      data-testid="aturan-perankingan"
    >
      <h2 className="text-lg font-black text-indigo-950">Aturan perankingan berjenjang</h2>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">{data.aturan.catatanFase}</p>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.aturan.jenjang.map((j, i) => (
          <li key={j.id} className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-3">
            <p className="text-sm font-black text-indigo-950">
              <span aria-hidden="true">{j.ikon} </span>
              {i + 1}. {j.nama}
            </p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">{j.syarat}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
