import { susunKonsepMateri } from "@/lib/konsep-materi";
import { subbabBukuSiswa } from "@/lib/subbab-buku-siswa";

export type TingkatSilabus = "kurang" | "cukup" | "baik";

export type PoinSilabus = {
  id: string;
  kelompok: "kerangka" | "materi";
  judul: string;
  keterangan: string;
  tingkat: TingkatSilabus;
};

export const LABEL_TINGKAT: Record<
  TingkatSilabus,
  { teks: string; ringkas: string }
> = {
  kurang: { teks: "KURANG", ringkas: "Belum lengkap" },
  cukup: { teks: "CUKUP", ringkas: "Sudah ada, perlu diperkaya" },
  baik: { teks: "BAIK", ringkas: "Lengkap sesuai kurikulum" },
};

function normalisasi(teks: string): string {
  return teks
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tumpangTindih(a: string, b: string): number {
  const kataA = new Set(
    normalisasi(a)
      .split(" ")
      .filter((kata) => kata.length > 2),
  );
  const kataB = new Set(
    normalisasi(b)
      .split(" ")
      .filter((kata) => kata.length > 2),
  );
  if (kataA.size === 0 || kataB.size === 0) return 0;
  let sama = 0;
  for (const kata of kataA) {
    if (kataB.has(kata)) sama += 1;
  }
  return sama / Math.min(kataA.size, kataB.size);
}

function tingkatKartu(naskah: string): TingkatSilabus {
  const teks = naskah.trim();
  const panjang = teks.replace(/\s+/g, " ").length;
  const adaContoh = /(?:^|\n)\s*contoh\b/i.test(teks);
  const adaLatihan = /(?:^|\n)\s*latihan\b/i.test(teks);
  const adaKunci = /(?:^|\n)\s*kunci\b/i.test(teks);
  if (panjang < 60) return "kurang";
  if (adaContoh && adaLatihan && adaKunci && panjang >= 140) return "baik";
  if ((adaContoh || adaLatihan) && panjang >= 100) return "baik";
  if (panjang >= 90) return "cukup";
  return "kurang";
}

function rataTingkat(daftar: TingkatSilabus[]): TingkatSilabus {
  if (daftar.length === 0) return "kurang";
  const angka = { kurang: 0, cukup: 1, baik: 2 };
  const mean =
    daftar.reduce((jumlah, item) => jumlah + angka[item], 0) / daftar.length;
  if (mean >= 1.5) return "baik";
  if (mean >= 0.7) return "cukup";
  return "kurang";
}

export function susunSilabusMerdeka(opsi: {
  kelas: string;
  mapel: string;
  materi: string;
  naskahKurikulum: string;
}): PoinSilabus[] {
  const { ideUtama, kartu } = susunKonsepMateri(
    opsi.materi,
    opsi.naskahKurikulum,
    opsi.kelas,
  );
  const subbab = subbabBukuSiswa(opsi.kelas, opsi.mapel, opsi.materi);
  const materiPokok = subbab.length > 0 ? subbab : kartu.map((item) => item.judul);
  const naskahGabung = kartu.map((item) => item.naskah).join("\n");
  const adaContoh = /(?:^|\n)\s*contoh\b/i.test(naskahGabung);
  const adaLatihan = /(?:^|\n)\s*latihan\b/i.test(naskahGabung);
  const adaKunci = /(?:^|\n)\s*kunci\b/i.test(naskahGabung);
  const identitasSiap = Boolean(
    opsi.kelas.trim() && opsi.mapel.trim() && opsi.materi.trim(),
  );

  const poinMateri: PoinSilabus[] = materiPokok.map((nama, indeks) => {
    let terbaik = { skor: 0, naskah: "" };
    for (const item of kartu) {
      const skor = Math.max(
        tumpangTindih(nama, item.judul),
        tumpangTindih(nama, item.naskah.slice(0, 180)),
      );
      if (skor > terbaik.skor) terbaik = { skor, naskah: item.naskah };
    }
    const tingkat =
      terbaik.skor < 0.4 ? "kurang" : tingkatKartu(terbaik.naskah);
    return {
      id: `materi-${indeks}`,
      kelompok: "materi" as const,
      judul: nama.replace(/\.$/, ""),
      keterangan:
        tingkat === "baik"
          ? "Uraian, contoh, dan latihan sudah mengikuti subbab buku siswa."
          : tingkat === "cukup"
            ? "Konsep sudah muncul, tapi contoh atau latihan masih perlu dilengkapi."
            : "Komponen ini belum tampak jelas di modul pembahasan.",
      tingkat,
    };
  });

  const tingkatTujuan = rataTingkat(poinMateri.map((item) => item.tingkat));
  const tingkatAsesmen =
    adaContoh && adaLatihan && adaKunci
      ? "baik"
      : adaContoh || adaLatihan
        ? "cukup"
        : "kurang";
  const tingkatKegiatan =
    naskahGabung.replace(/\s+/g, " ").length >= 400
      ? "baik"
      : naskahGabung.replace(/\s+/g, " ").length >= 160
        ? "cukup"
        : "kurang";

  const kerangka: PoinSilabus[] = [
    {
      id: "identitas",
      kelompok: "kerangka",
      judul: "Identitas pembelajaran",
      keterangan: identitasSiap
        ? `${opsi.kelas} · ${opsi.mapel} · ${ideUtama}`
        : "Kelas, mapel, atau bab belum lengkap.",
      tingkat: identitasSiap ? "baik" : "kurang",
    },
    {
      id: "capaian",
      kelompok: "kerangka",
      judul: "Capaian Pembelajaran",
      keterangan:
        subbab.length > 0
          ? `Selaras daftar isi buku siswa Pusat Perbukuan (${subbab.length} tujuan).`
          : kartu.length > 0
            ? "Modul ada, tetapi daftar isi resmi bab ini belum terpetakan."
            : "Capaian bab belum terbaca di modul.",
      tingkat: subbab.length > 0 ? "baik" : kartu.length > 0 ? "cukup" : "kurang",
    },
    {
      id: "tujuan",
      kelompok: "kerangka",
      judul: "Tujuan Pembelajaran",
      keterangan:
        tingkatTujuan === "baik"
          ? "Hampir semua tujuan subbab sudah terurai di modul."
          : tingkatTujuan === "cukup"
            ? "Sebagian tujuan sudah ada; beberapa masih tipis."
            : "Tujuan pembelajaran belum terpenuhi di naskah.",
      tingkat: tingkatTujuan,
    },
    {
      id: "kegiatan",
      kelompok: "kerangka",
      judul: "Kegiatan pembelajaran",
      keterangan:
        tingkatKegiatan === "baik"
          ? "Ada alur mengamati, uraian konsep, dan latihan di kartu."
          : tingkatKegiatan === "cukup"
            ? "Uraian sudah ada, tetapi alur kegiatan masih ringkas."
            : "Kegiatan belajar belum cukup untuk memandu siswa.",
      tingkat: tingkatKegiatan,
    },
    {
      id: "asesmen",
      kelompok: "kerangka",
      judul: "Asesmen formatif",
      keterangan:
        tingkatAsesmen === "baik"
          ? "Ada contoh, latihan, dan kunci sesuai asesmen Kurikulum Merdeka."
          : tingkatAsesmen === "cukup"
            ? "Ada sebagian asesmen, belum lengkap contoh–latihan–kunci."
            : "Belum ada asesmen formatif di naskah.",
      tingkat: tingkatAsesmen,
    },
    {
      id: "sumber",
      kelompok: "kerangka",
      judul: "Sumber belajar",
      keterangan:
        subbab.length > 0
          ? "Buku siswa Kurikulum Merdeka, Pusat Perbukuan Kemendikbudristek."
          : "Sumber resmi bab ini belum terhubung ke daftar isi buku siswa.",
      tingkat: subbab.length > 0 ? "baik" : "cukup",
    },
  ];

  return [...kerangka, ...poinMateri];
}
