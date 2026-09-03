"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FlaskConical } from "lucide-react";
import PageShell from "@/components/PageShell";
import { bacaProgres } from "@/lib/progres";
import { kelasTombolUtama } from "@/lib/tema";

const PRAKTIKUM = [
  {
    mapel: "Ilmu Pengetahuan Alam dan Sosial (IPAS)",
    materi: "Bab 3: Benda dan Sifatnya",
    judul: "Sifat benda padat, cair, dan gas",
    jenjang: "Cocok SD",
  },
  {
    mapel: "Ilmu Pengetahuan Alam",
    materi: "Bab 2: Zat dan Perubahannya",
    judul: "Perubahan wujud zat",
    jenjang: "Cocok SMP",
  },
  {
    mapel: "Fisika",
    materi: "Bab 2: Gerak Lurus",
    judul: "Praktikum gerak lurus beraturan",
    jenjang: "Cocok SMA",
  },
  {
    mapel: "Kimia",
    materi: "Bab 3: Ikatan Kimia",
    judul: "Model ikatan ion dan kovalen",
    jenjang: "Cocok SMA",
  },
  {
    mapel: "Biologi",
    materi: "Bab 2: Sel",
    judul: "Mengamati sel tumbuhan dan hewan",
    jenjang: "Cocok SMA",
  },
  {
    mapel: "Informatika",
    materi: "Bab 2: Berpikir Komputasional",
    judul: "Simulasi algoritma langkah demi langkah",
    jenjang: "Cocok SMP–SMA",
  },
];

export default function LaboratoriumPage() {
  const [nama, setNama] = useState("Siswa");
  const [kelas, setKelas] = useState("8 SMP");
  const [guru, setGuru] = useState("wanita");

  useEffect(() => {
    const profil = bacaProgres().profil;
    if (profil.nama) setNama(profil.nama);
    if (profil.kelas) setKelas(profil.kelas);
    if (profil.guruKelamin) setGuru(profil.guruKelamin);
  }, []);

  return (
    <PageShell
      judul="🧪 Laboratorium Praktikum"
      subjudul="Pilih praktikum virtual, lalu lanjut ke AI Tutor untuk penjelasan, sketsa, dan latihan soal tanpa meninggalkan alur belajar."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PRAKTIKUM.map((item) => {
          const query = new URLSearchParams({
            nama,
            kelas,
            mapel: item.mapel,
            materi: item.judul,
            mode: "teks",
            mulai: "1",
            guru,
          });
          return (
            <article
              key={item.judul}
              className="flex flex-col rounded-3xl border border-[#1C01A5]/15 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0AB00]/20 text-[#1C01A5]">
                <FlaskConical className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#F0AB00]">
                {item.jenjang}
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-[#1C01A5]">{item.judul}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">
                {item.mapel} · {item.materi}
              </p>
              <Link
                href={`/tutor?${query.toString()}`}
                className={`${kelasTombolUtama} mt-4 rounded-xl px-4 py-2 text-center text-sm font-extrabold`}
              >
                Buka di AI Tutor
              </Link>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
