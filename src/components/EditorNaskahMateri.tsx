"use client";

import { useMemo, useState } from "react";
import {
  gabungNaskahDariEditor,
  pecahNaskahUntukEditor,
  type BagianNaskahEditor,
} from "@/lib/batas-naskah";
import { kelasKotak, kelasLabel } from "@/lib/tema";

const WARNA = [
  "border-[#1D4ED8] bg-[#EFF6FF]",
  "border-[#15803D] bg-[#F0FDF4]",
  "border-[#7C3AED] bg-[#F5F3FF]",
  "border-[#C2410C] bg-[#FFF7ED]",
  "border-[#0F766E] bg-[#F0FDFA]",
  "border-[#B91C1C] bg-[#FEF2F2]",
  "border-[#D97706] bg-[#FFFBEB]",
  "border-[#1C01A5] bg-[#F8F7FF]",
];

function pitaBatas(teks: string, posisi: "atas" | "bawah") {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide text-[#1C01A5] ${
        posisi === "atas"
          ? "border-b border-current/20"
          : "border-t border-current/20"
      }`}
    >
      <span className="h-px flex-1 bg-[#1C01A5]/40" />
      <span>{teks}</span>
      <span className="h-px flex-1 bg-[#1C01A5]/40" />
    </div>
  );
}

export default function EditorNaskahMateri({
  label,
  nilai,
  disabled,
  onChange,
}: {
  label: string;
  nilai: string;
  disabled: boolean;
  onChange: (nilai: string) => void;
}) {
  const [mentah, setMentah] = useState(false);
  const pecah = useMemo(() => pecahNaskahUntukEditor(nilai), [nilai]);
  const pakaiBagian = !mentah && pecah.bagian.length > 0;

  function tulis(berikutnya: {
    kepala?: string;
    bagian?: BagianNaskahEditor[];
  }) {
    onChange(
      gabungNaskahDariEditor({
        kepala: berikutnya.kepala ?? pecah.kepala,
        bagian: berikutnya.bagian ?? pecah.bagian,
      }),
    );
  }

  return (
    <div className="block">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <span className={kelasLabel}>{label}</span>
        <button
          type="button"
          onClick={() => setMentah((nilai) => !nilai)}
          className="text-xs font-extrabold text-[#1C01A5] underline-offset-2 hover:underline"
        >
          {mentah ? "Tampil per bagian" : "Edit naskah utuh"}
        </button>
      </div>
      <p className="mb-3 text-xs font-semibold text-slate-600">
        Pita warna adalah batas bagian. Edit teks di dalam kotak. Jangan hapus
        baris <span className="font-black">Kiri:</span>,{" "}
        <span className="font-black">Kanan:</span>,{" "}
        <span className="font-black">Isi:</span>, atau penanda{" "}
        <span className="font-black">&lt;&lt;&lt;BAGIAN&gt;&gt;&gt;</span> agar
        tampilan infografis tidak terpotong.
      </p>

      {pakaiBagian ? (
        <div className="space-y-4">
          {pecah.kepala.trim() ? (
            <label className="block overflow-hidden rounded-2xl border-4 border-[#1C01A5]/30 bg-white">
              {pitaBatas("Batas kepala naskah", "atas")}
              <span className="sr-only">Kepala naskah</span>
              <textarea
                value={pecah.kepala}
                readOnly={disabled}
                disabled={disabled}
                onChange={(e) => tulis({ kepala: e.target.value })}
                className={`${kelasKotak} min-h-20 resize-y rounded-none border-0 font-medium leading-relaxed ${
                  disabled ? "cursor-not-allowed bg-slate-50 text-slate-600" : ""
                }`}
              />
              {pitaBatas("Akhir kepala · jangan hapus INFOGRAFIS / Judul", "bawah")}
            </label>
          ) : null}

          {pecah.bagian.map((item, indeks) => {
            const warna = WARNA[indeks % WARNA.length];
            return (
              <label
                key={`bagian-${indeks}`}
                className={`block overflow-hidden rounded-2xl border-4 ${warna}`}
              >
                {pitaBatas(
                  `Batas mulai bagian ${item.nomor} · ${item.judul}`,
                  "atas",
                )}
                <span className="sr-only">
                  Bagian {item.nomor}: {item.judul}
                </span>
                <textarea
                  value={item.tubuh}
                  readOnly={disabled}
                  disabled={disabled}
                  onChange={(e) => {
                    const bagian = pecah.bagian.map((lama, i) =>
                      i === indeks ? { ...lama, tubuh: e.target.value } : lama,
                    );
                    tulis({ bagian });
                  }}
                  className={`${kelasKotak} min-h-36 resize-y rounded-none border-0 bg-white/80 font-medium leading-relaxed ${
                    disabled ? "cursor-not-allowed bg-slate-50 text-slate-600" : ""
                  }`}
                />
                {pitaBatas(
                  `Batas akhir bagian ${item.nomor} · jangan hapus Kiri:/Isi:`,
                  "bawah",
                )}
              </label>
            );
          })}
        </div>
      ) : (
        <label className="block overflow-hidden rounded-2xl border-4 border-[#1C01A5]/30 bg-white">
          {pitaBatas("Batas mulai naskah materi", "atas")}
          <textarea
            value={nilai}
            readOnly={disabled}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className={`${kelasKotak} min-h-48 resize-y rounded-none border-0 font-medium leading-relaxed ${
              disabled ? "cursor-not-allowed bg-slate-50 text-slate-600" : ""
            }`}
          />
          {pitaBatas("Batas akhir naskah materi", "bawah")}
        </label>
      )}
    </div>
  );
}
