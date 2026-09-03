import type { ReactNode } from "react";

export default function PageShell({
  judul,
  subjudul,
  children,
}: {
  judul: string;
  subjudul?: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 bg-white text-slate-700">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#F0AB00]">
          $IGIL · Kurikulum Merdeka
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1C01A5] sm:text-4xl">
          {judul}
        </h1>
        {subjudul ? (
          <p className="mt-3 max-w-3xl text-base text-slate-600">{subjudul}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
