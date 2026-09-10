import { pecahNaskahUntukEditor } from "@/lib/batas-naskah";
import { susunKonsepMateri } from "@/lib/konsep-materi";
import { subbabBukuSiswa } from "@/lib/subbab-buku-siswa";

export type TingkatSilabus = "kurang" | "cukup" | "baik";

export type PoinSilabus = {
  id: string;
  kelompok: "kerangka";
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

function adaContohDiNaskah(teks: string): boolean {
  return /\bcontoh\b/i.test(teks);
}

function adaPraktikDiNaskah(teks: string): boolean {
  return (
    /LENGKAP:/i.test(teks) ||
    /\b(latihan|quiz|soal)\b/i.test(teks) ||
    /\[Soal\s+\d+/i.test(teks) ||
    /\bhijaiyah\b/i.test(teks) ||
    /\bharakat\b/i.test(teks) ||
    /\bfatihah\b/i.test(teks)
  );
}

function tingkatKartu(naskah: string): TingkatSilabus {
  const teks = naskah.trim();
  const panjang = teks.replace(/\s+/g, " ").length;
  const adaContoh = adaContohDiNaskah(teks);
  const adaPraktik = adaPraktikDiNaskah(teks);
  if (panjang < 50) return "kurang";
  if ((adaContoh || adaPraktik) && panjang >= 80) return "baik";
  if (panjang >= 120) return "baik";
  if (panjang >= 70) return "cukup";
  return "kurang";
}

function kartuDariNaskah(
  materi: string,
  naskahKurikulum: string,
  kelas: string,
): { judul: string; naskah: string }[] {
  const editor = pecahNaskahUntukEditor(naskahKurikulum);
  if (editor.bagian.length >= 2) {
    return editor.bagian.map((item) => ({
      judul: item.judul,
      naskah: item.tubuh,
    }));
  }
  return susunKonsepMateri(materi, naskahKurikulum, kelas).kartu.map((item) => ({
    judul: item.judul,
    naskah: item.naskah,
  }));
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

function jpDariNaskah(naskah: string): number | null {
  const cocok = naskah.match(/(\d{1,3})\s*(?:jp|jam pelajaran)\b/i);
  if (!cocok) return null;
  const jp = Number(cocok[1]);
  return Number.isFinite(jp) && jp > 0 ? jp : null;
}

function susunWaktuPembelajaran(opsi: {
  jumlahTujuan: number;
  jumlahKartu: number;
  naskah: string;
}): { keterangan: string; tingkat: TingkatSilabus } {
  const jpNaskah = jpDariNaskah(opsi.naskah);
  if (jpNaskah) {
    const pertemuan = Math.max(1, Math.ceil(jpNaskah / 2));
    return {
      keterangan: `${jpNaskah} JP · ${pertemuan} pertemuan, sesuai alokasi pada naskah modul.`,
      tingkat: "baik",
    };
  }
  if (opsi.jumlahTujuan > 0) {
    const jp = Math.max(4, opsi.jumlahTujuan * 2);
    const pertemuan = Math.max(2, Math.ceil(jp / 2));
    return {
      keterangan: `${jp} JP · ${pertemuan} pertemuan, perkiraan dari ${opsi.jumlahTujuan} tujuan buku siswa.`,
      tingkat: "baik",
    };
  }
  if (opsi.jumlahKartu > 0) {
    const jp = Math.max(4, opsi.jumlahKartu * 2);
    const pertemuan = Math.max(2, Math.ceil(jp / 2));
    return {
      keterangan: `Sekitar ${jp} JP · ${pertemuan} pertemuan. Alokasi resmi bab ini belum terpetakan.`,
      tingkat: "cukup",
    };
  }
  return {
    keterangan: "Waktu pembelajaran belum dapat ditentukan karena naskah bab belum tersedia.",
    tingkat: "kurang",
  };
}

export function susunSilabusMerdeka(opsi: {
  kelas: string;
  mapel: string;
  materi: string;
  naskahKurikulum: string;
  naskahLatihan?: string;
}): PoinSilabus[] {
  const kartu = kartuDariNaskah(opsi.materi, opsi.naskahKurikulum, opsi.kelas);
  const ideUtama = opsi.materi.trim() || "Materi hari ini";
  const subbab = subbabBukuSiswa(opsi.kelas, opsi.mapel, opsi.materi);
  const materiPokok = subbab.length > 0 ? subbab : kartu.map((item) => item.judul);
  const naskahGabung = [
    opsi.naskahKurikulum,
    ...kartu.map((item) => item.naskah),
    opsi.naskahLatihan ?? "",
  ].join("\n");
  const adaContoh = adaContohDiNaskah(naskahGabung);
  const adaPraktik = adaPraktikDiNaskah(naskahGabung);
  const adaKunci =
    /\bkunci\b/i.test(naskahGabung) || /\[Soal\s+\d+/i.test(opsi.naskahLatihan ?? "");
  const identitasSiap = Boolean(
    opsi.kelas.trim() && opsi.mapel.trim() && opsi.materi.trim(),
  );

  const poinMateri = materiPokok.map((nama) => {
    let terbaik = { skor: 0, naskah: "" };
    for (const item of kartu) {
      const skor = Math.max(
        tumpangTindih(nama, item.judul),
        tumpangTindih(nama, item.naskah.slice(0, 280)),
      );
      if (skor > terbaik.skor) terbaik = { skor, naskah: item.naskah };
    }
    const tingkat =
      terbaik.skor < 0.28 ? "kurang" : tingkatKartu(terbaik.naskah);
    return { tingkat };
  });
  const waktu = susunWaktuPembelajaran({
    jumlahTujuan: subbab.length,
    jumlahKartu: kartu.length,
    naskah: opsi.naskahKurikulum || naskahGabung,
  });

  const tingkatTujuan = rataTingkat(poinMateri.map((item) => item.tingkat));
  const tingkatAsesmen =
    (adaContoh && adaPraktik) || (adaPraktik && adaKunci) || (adaContoh && adaKunci)
      ? "baik"
      : adaContoh || adaPraktik
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
      id: "waktu",
      kelompok: "kerangka",
      judul: "Waktu Pembelajaran",
      keterangan: waktu.keterangan,
      tingkat: waktu.tingkat,
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
          ? "Ada contoh, latihan/quiz, atau soal formatif sesuai Kurikulum Merdeka."
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

  return kerangka;
}
