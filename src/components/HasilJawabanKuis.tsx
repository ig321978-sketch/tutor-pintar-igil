import type { StatusJawabanKuis } from "@/lib/hasil-kuis";

export default function HasilJawabanKuis({
  status,
  cuplikan,
  pesanSalah = "Jawaban belum tepat. Coba lagi.",
}: {
  status: StatusJawabanKuis;
  cuplikan?: string;
  pesanSalah?: string;
}) {
  if (status === "benar") {
    return (
      <div className="rounded-2xl border-4 border-emerald-600 bg-emerald-50 px-4 py-4">
        <p className="text-2xl font-black tracking-wide text-emerald-700">
          BENAR
        </p>
        {cuplikan ? (
          <p className="mt-1 text-sm font-bold text-emerald-800">
            Jawabanmu: {cuplikan}
          </p>
        ) : null}
      </div>
    );
  }
  if (status === "salah") {
    return (
      <div className="rounded-2xl border-4 border-rose-600 bg-rose-50 px-4 py-4">
        <p className="text-2xl font-black tracking-wide text-rose-700">
          SALAH
        </p>
        {cuplikan ? (
          <p className="mt-1 text-sm font-bold text-rose-800">
            Jawabanmu: {cuplikan}
          </p>
        ) : null}
        <p className="mt-2 text-sm font-semibold text-rose-700">{pesanSalah}</p>
      </div>
    );
  }
  return null;
}
