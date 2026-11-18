"use client";

import { useState, type ComponentType } from "react";
import type { SimulasiMateriProps } from "@/components/modul/registri-simulasi";

export type SubGabungan = { id: string; judul: string; terbuka: boolean };

/**
 * Tab Simulasi: gabungan semua simulasi per Sub-Bab dalam satu bab.
 * Satu simulasi per layar (standar simulasi-phet). Siswa menjelajah Sub-Bab A, B, C, ... berurutan,
 * atau melompat lewat tombol Sub-Bab. Sub-Bab yang belum sampai tahap Simulasi di Materi masih terkunci.
 * Tanpa skor, waktu, atau benar-salah: hanya eksplorasi.
 */
export default function SimulasiGabungan({
  Simulasi,
  subs,
  speakGuru,
  misiAwal,
  onKeLatihan,
  onKeMateri,
}: {
  Simulasi: ComponentType<SimulasiMateriProps>;
  subs: readonly SubGabungan[];
  speakGuru: (teks: string) => void;
  misiAwal?: (sub: string) => string;
  onKeLatihan: () => void;
  onKeMateri: (sub: string) => void;
}) {
  const pertamaTerbuka = subs.find((s) => s.terbuka)?.id ?? subs[0]?.id ?? "A";
  const [aktif, setAktif] = useState<string>(pertamaTerbuka);
  const [dijelajahi, setDijelajahi] = useState<string[]>([]);

  const indeks = subs.findIndex((s) => s.id === aktif);
  const sub = subs[indeks];
  const berikut = subs.slice(indeks + 1).find((s) => s.terbuka);
  const jumlahTerbuka = subs.filter((s) => s.terbuka).length;

  const pilih = (id: string) => {
    setAktif(id);
    const tujuan = subs.find((s) => s.id === id);
    if (tujuan?.terbuka) {
      const misi = misiAwal?.(id) ?? "";
      speakGuru(`Simulasi Sub-Bab ${id}. ${misi}`.trim());
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selesai = () => {
    setDijelajahi((p) => (p.includes(aktif) ? p : [...p, aktif]));
    if (berikut) {
      pilih(berikut.id);
    } else {
      speakGuru("Semua simulasi di bab ini sudah kamu jelajahi. Hebat! Sekarang ayo coba Latihan.");
      onKeLatihan();
    }
  };

  return (
    <section className="mx-auto mt-4 w-[98%] space-y-4">
      <div className="rounded-3xl border-2 border-[#FFE566] bg-[#1C01A5] p-4 text-white md:p-6">
        <p className="text-xs font-black uppercase tracking-widest text-[#FFE566]">🧪 Lab Simulasi Gabungan</p>
        <h2 className="mt-1 text-xl font-black md:text-2xl">Semua simulasi bab ini di satu tempat</h2>
        <p className="mt-1 text-sm font-semibold text-indigo-100">
          Jelajahi simulasi tiap Sub-Bab berurutan. Bebas mencoba: tidak ada skor dan tidak ada waktu.
        </p>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Pilih simulasi Sub-Bab">
          {subs.map((s) => {
            const menyala = s.id === aktif;
            const sudah = dijelajahi.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={menyala}
                onClick={() => pilih(s.id)}
                className={`min-h-[44px] rounded-2xl px-3 py-2 text-left text-sm font-black ${
                  menyala ? "border-[#FFE566] bg-[#FFE566] text-[#1C01A5]" : "border-white/40 bg-white/10 text-white"
                }`}
              >
                <span aria-hidden="true">{!s.terbuka ? "🔒 " : sudah ? "✅ " : "🧪 "}</span>
                Sub-Bab {s.id}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs font-bold text-indigo-100">
          {dijelajahi.length} dari {jumlahTerbuka} simulasi terbuka sudah dijelajahi
          {jumlahTerbuka < subs.length ? ` · ${subs.length - jumlahTerbuka} masih terkunci` : ""}
        </p>
      </div>

      {sub && sub.terbuka ? (
        <div>
          <p className="mb-2 px-1 text-base font-black text-[#1C01A5]">
            Sub-Bab {sub.id}: {sub.judul}
          </p>
          <Simulasi
            key={sub.id}
            sub={sub.id}
            speakGuru={speakGuru}
            teksAkhir={berikut ? `LANJUT KE SIMULASI SUB-BAB ${berikut.id} ➡️` : "LANJUT KE LATIHAN ➡️"}
            onSelesai={selesai}
          />
        </div>
      ) : sub ? (
        <div className="rounded-3xl border-2 border-dashed border-[#1C01A5]/30 bg-white p-6 text-center">
          <p className="text-4xl" aria-hidden="true">
            🔒
          </p>
          <p className="mt-2 text-lg font-black text-[#1C01A5]">Simulasi Sub-Bab {sub.id} belum terbuka</p>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Pelajari dulu Story, Mind-map, dan Infografis Sub-Bab {sub.id} di tab Materi. Simulasinya terbuka setelah itu.
          </p>
          <button
            type="button"
            onClick={() => onKeMateri(sub.id)}
            className="mt-4 min-h-[44px] rounded-full border-4 border-[#FFE566] bg-[#1C01A5] px-5 text-sm font-black text-[#FFE566]"
          >
            📚 Buka Materi Sub-Bab {sub.id}
          </button>
        </div>
      ) : null}
    </section>
  );
}
