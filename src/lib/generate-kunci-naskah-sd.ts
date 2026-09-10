import { daftarBabSd, type BabSd } from "@/lib/bab-buku-siswa";
import {
  aturKunciNaskahMateri,
  gabungCacheMateri,
  materiSedangTerkunci,
  topicIdMateri,
} from "@/lib/cache-materi-tutor";
import { lengkapiVisualNaskahSd, naskahKerangkaKartuSd } from "@/lib/naskah-kartu-sd";
import { naskahResmiJikaAda } from "@/lib/naskah-resmi";
import {
  cachePunyaBagian,
  generateBagianModul,
  getModule,
} from "@/lib/susun-modul-tutor";

export type { BabSd };

export type HasilKunciNaskahSd = BabSd & {
  status: "sudah" | "resmi" | "baru" | "gagal";
  kurikulum: boolean;
  global: boolean;
  latihan: boolean;
  terkunci: boolean;
  pesan?: string;
};

export function semuaBabNaskahSd(): BabSd[] {
  return daftarBabSd();
}

async function kunciTopic(
  kelas: string,
  mapel: string,
  materi: string,
  terkunci: boolean,
): Promise<void> {
  const topicId = topicIdMateri(kelas, mapel, materi);
  await aturKunciNaskahMateri(topicId, terkunci);
}

export async function generateDanKunciNaskahSd(opsi: {
  kelas: string;
  mapel: string;
  materi: string;
  nama?: string;
}): Promise<HasilKunciNaskahSd> {
  const { kelas, mapel, materi } = opsi;
  const nama = opsi.nama?.trim() || "Siswa";
  const dasar: BabSd = { kelas, mapel, materi };

  try {
    if (naskahResmiJikaAda(kelas, mapel, materi)) {
      await getModule(kelas, mapel, materi);
      await kunciTopic(kelas, mapel, materi, true);
      return {
        ...dasar,
        status: "resmi",
        kurikulum: true,
        global: true,
        latihan: true,
        terkunci: true,
      };
    }

    let cache = await getModule(kelas, mapel, materi);
    let kurOk = cachePunyaBagian(cache, "kurikulum", kelas);
    let globOk = cachePunyaBagian(cache, "global", kelas);
    let latOk = cachePunyaBagian(cache, "latihan", kelas);
    const sudahTerkunci = await materiSedangTerkunci(kelas, mapel, materi);

    if (kurOk && globOk && latOk) {
      if (!sudahTerkunci) await kunciTopic(kelas, mapel, materi, true);
      return {
        ...dasar,
        status: sudahTerkunci ? "sudah" : "baru",
        kurikulum: true,
        global: true,
        latihan: true,
        terkunci: true,
      };
    }

    if (sudahTerkunci) await kunciTopic(kelas, mapel, materi, false);

    if (cache && (!kurOk || !globOk)) {
      await gabungCacheMateri(kelas, mapel, materi, nama, {
        curriculum_view: lengkapiVisualNaskahSd(cache.curriculum_view, kelas, {
          mapel,
          materi,
        }),
        global_best_view: lengkapiVisualNaskahSd(cache.global_best_view, kelas, {
          mapel,
          materi,
          global: true,
        }),
      });
      cache = await getModule(kelas, mapel, materi);
      kurOk = cachePunyaBagian(cache, "kurikulum", kelas);
      globOk = cachePunyaBagian(cache, "global", kelas);
    }

    if (!kurOk) {
      try {
        await generateBagianModul({
          nama,
          kelas,
          mapel,
          materi,
          bagian: "kurikulum",
        });
      } catch (error) {
        console.warn("[naskah-sd] kurikulum AI gagal, pakai kerangka kartu", error);
        await gabungCacheMateri(kelas, mapel, materi, nama, {
          curriculum_view: naskahKerangkaKartuSd(kelas, mapel, materi),
        });
      }
      cache = await getModule(kelas, mapel, materi);
      if (cache) {
        cache = {
          ...cache,
          curriculum_view: lengkapiVisualNaskahSd(cache.curriculum_view, kelas, {
            mapel,
            materi,
          }),
        };
        await gabungCacheMateri(kelas, mapel, materi, nama, {
          curriculum_view: cache.curriculum_view,
        });
      }
      cache = await getModule(kelas, mapel, materi);
      kurOk = cachePunyaBagian(cache, "kurikulum", kelas);
      if (!kurOk) throw new Error("Naskah kurikulum kartu SD tidak utuh.");
    }

    if (!globOk) {
      try {
        await generateBagianModul({
          nama,
          kelas,
          mapel,
          materi,
          bagian: "global",
          naskahKurikulum: cache?.curriculum_view,
        });
      } catch (error) {
        console.warn("[naskah-sd] global AI gagal, pakai kerangka kartu", error);
        await gabungCacheMateri(kelas, mapel, materi, nama, {
          global_best_view: naskahKerangkaKartuSd(kelas, mapel, materi, true),
        });
      }
      cache = await getModule(kelas, mapel, materi);
      globOk = cachePunyaBagian(cache, "global", kelas);
      if (!globOk && cache) {
        const globalRapikan = lengkapiVisualNaskahSd(cache.global_best_view, kelas, {
          mapel,
          materi,
          global: true,
        });
        await gabungCacheMateri(kelas, mapel, materi, nama, {
          global_best_view: globalRapikan,
        });
        cache = await getModule(kelas, mapel, materi);
        globOk = cachePunyaBagian(cache, "global", kelas);
      }
      if (!globOk) throw new Error("Naskah global kartu SD tidak utuh.");
    }

    if (!latOk) {
      await generateBagianModul({
        nama,
        kelas,
        mapel,
        materi,
        bagian: "latihan",
      });
      cache = await getModule(kelas, mapel, materi);
      latOk = cachePunyaBagian(cache, "latihan", kelas);
      if (!latOk) throw new Error("Bank soal latihan tidak utuh.");
    }

    await kunciTopic(kelas, mapel, materi, true);
    return {
      ...dasar,
      status: "baru",
      kurikulum: true,
      global: true,
      latihan: true,
      terkunci: true,
    };
  } catch (error) {
    const pesan = error instanceof Error ? error.message : "Gagal generate naskah SD.";
    const cache = await getModule(kelas, mapel, materi);
    return {
      ...dasar,
      status: "gagal",
      kurikulum: cachePunyaBagian(cache, "kurikulum", kelas),
      global: cachePunyaBagian(cache, "global", kelas),
      latihan: cachePunyaBagian(cache, "latihan", kelas),
      terkunci: await materiSedangTerkunci(kelas, mapel, materi),
      pesan,
    };
  }
}
