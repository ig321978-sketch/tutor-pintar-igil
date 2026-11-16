"use client";

import Link from "next/link";
import { useState } from "react";
import { kataBilangan } from "@/lib/belajar/kata";
import { acakSesi } from "@/lib/belajar/ulangan";
import { catatUlangan } from "@/lib/belajar/simpan";
import type { Soal } from "@/lib/belajar/tipe";
import { periksa } from "@/lib/belajar/umum";
import { KONFIGURASI, type KonfigPelabuhan } from "./konfig";
import { useSiap, useSimpanan } from "./pakai-simpanan";
import { Bingkai, Gambar, PilihanJawab, Tombol, bicara } from "./Pelabuhan";

const KONFIGS: KonfigPelabuhan[] = Object.values(KONFIGURASI);
const IDS = KONFIGS.map((k) => k.skillId);

type Butir = { k: KonfigPelabuhan; soal: Soal };

function SatuButir({ butir, selesai }: { butir: Butir; selesai: () => void }) {
  const { k, soal } = butir;
  const [mati, setMati] = useState<string[]>([]);
  const [salah, setSalah] = useState(0);
  const [pesan, setPesan] = useState("");
  const [benar, setBenar] = useState(false);
  const [kode, setKode] = useState<string | null>(null);
  const pilih = (id: string) => {
    const h = periksa(soal, id);
    if (h.benar) {
      setBenar(true);
      setPesan(salah > 0 ? "Kamu mencoba lagi dan berhasil!" : "Tepat sekali!");
      bicara(`Hasilnya ${kataBilangan(soal.kunci)}.`);
      catatUlangan(window.localStorage, k.skillId, salah === 0, kode ?? h.miskonsepsi);
    } else {
      setMati((m) => [...m, id]);
      setSalah((s) => s + 1);
      if (h.miskonsepsi) setKode((c) => c ?? h.miskonsepsi);
      setPesan(h.miskonsepsi ? k.miskonsepsi[h.miskonsepsi].pesan : "Coba lagi pelan-pelan.");
    }
  };
  const habis = mati.length >= soal.pilihan.length - 1;
  return (
    <Bingkai judul={`Materi ${k.nomor}: ${k.judulPendek}`}>
      <p className="text-xl font-bold">{soal.suara}</p>
      <Gambar soal={soal} penghubung={k.penghubung} />
      <div className="mt-2 flex justify-center">
        <Tombol onClick={() => bicara(soal.suara)} label="dengar soal">
          🔊 Dengar
        </Tombol>
      </div>
      <PilihanJawab soal={soal} mati={mati} onPilih={benar ? () => {} : pilih} sorotKunci={habis && !benar} />
      {pesan && (
        <p role="status" className="mt-3 text-center text-lg font-bold">
          {pesan}
        </p>
      )}
      {(benar || habis) && (
        <div className="mt-3 flex justify-center">
          <Tombol
            utama
            onClick={() => {
              // Kehabisan pilihan tanpa menjawab benar: dicatat sebagai lupa supaya diulang besok.
              if (!benar) catatUlangan(window.localStorage, k.skillId, false, kode);
              selesai();
            }}
          >
            Lanjut
          </Tombol>
        </div>
      )}
    </Bingkai>
  );
}

/** Ulangan harian: satu soal tiap materi yang sudah lulus, urutan dicampur. Tanpa skor; hanya jadwal ulang. */
export default function UlanganHarian() {
  const siap = useSiap();
  const simpan = useSimpanan(IDS);
  const [sesi, setSesi] = useState<Butir[] | null>(null);
  const [n, setN] = useState(0);
  const [sekarang] = useState(() => Date.now());
  const lulus = KONFIGS.filter((k) => simpan[k.skillId].status.lulusTerakhir !== null);
  const jatuh = lulus.filter((k) => {
    const t = simpan[k.skillId].status.jatuhTempo;
    return t !== null && new Date(t).getTime() <= sekarang;
  });
  const mulai = (pakai: KonfigPelabuhan[]) => {
    const benih = Math.floor(Math.random() * 1_000_000) + 1;
    const urut = acakSesi(pakai, benih, 8);
    setSesi(urut.map((k, i) => ({ k, soal: k.buatSoal((["benda", "diagram", "lambang"] as const)[(benih + i) % 3], benih + i * 7919) })));
    setN(0);
  };
  if (!siap) return <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}><p className="mx-auto max-w-2xl text-center font-bold">Memuat…</p></main>;
  if (sesi && n < sesi.length) return <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}><p className="mx-auto mb-2 max-w-2xl text-sm font-bold">Ulangan harian · soal {n + 1} dari {sesi.length}</p><SatuButir key={n} butir={sesi[n]} selesai={() => setN(n + 1)} /></main>;
  return (
    <main className="min-h-screen p-3 sm:p-6" style={{ background: "#efeaff" }}>
      <Bingkai judul="Ulangan harian">
        {sesi ? (
          <>
            <p className="text-xl font-bold">Selesai! Kamu mengulang {sesi.length} soal.</p>
            <p className="mt-2">Materi yang masih terasa sulit akan muncul lagi besok. Itu wajar, ingatan butuh diulang.</p>
          </>
        ) : lulus.length === 0 ? (
          <p className="text-lg font-bold">Belum ada materi yang lulus. Selesaikan satu materi dulu, lalu ulangan harian akan muncul di sini.</p>
        ) : jatuh.length > 0 ? (
          <p className="text-lg font-bold">{jatuh.length} materi waktunya diulang hari ini. Soalnya dicampur, angkanya baru.</p>
        ) : (
          <p className="text-lg font-bold">Belum ada yang jatuh tempo. Kamu boleh latihan campur dari {lulus.length} materi yang sudah lulus.</p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          {!sesi && lulus.length > 0 && (
            <Tombol utama onClick={() => mulai(jatuh.length > 0 ? jatuh : lulus)}>
              {jatuh.length > 0 ? "Mulai ulangan" : "Latihan campur"}
            </Tombol>
          )}
          <Link href="/ruang-belajar/mtk-1-bab2-baru" className="min-h-12 rounded-2xl border-2 bg-white px-5 py-3 text-lg font-bold" style={{ borderColor: "#3b2a8c", color: "#3b2a8c" }}>
            Kembali ke daftar materi
          </Link>
        </div>
      </Bingkai>
    </main>
  );
}
