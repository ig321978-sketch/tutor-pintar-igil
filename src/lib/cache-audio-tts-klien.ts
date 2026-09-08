import type { KataWaktu } from "@/lib/tts";

const NAMA_DB = "igil-tts-klien-v1";
const NAMA_TOKO = "audio";
const VERSI_DB = 1;
const BATAS_BYTE_SIMPAN = 2_500_000;

export type ItemCacheAudioTts = {
  mime: string;
  audioBase64: string;
  durasiDetik: number;
  kata: KataWaktu[];
};

const memori = new Map<string, ItemCacheAudioTts>();

export function kunciCacheAudioTts(
  teks: string,
  kelamin: string,
  kelas: string,
): string {
  return `v2|${kelamin}|${kelas}|${teks.replace(/\s+/g, " ").trim()}`;
}

function bukaDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((selesai) => {
    const permintaan = indexedDB.open(NAMA_DB, VERSI_DB);
    permintaan.onerror = () => selesai(null);
    permintaan.onupgradeneeded = () => {
      const db = permintaan.result;
      if (!db.objectStoreNames.contains(NAMA_TOKO)) {
        db.createObjectStore(NAMA_TOKO);
      }
    };
    permintaan.onsuccess = () => selesai(permintaan.result);
  });
}

export async function ambilCacheAudioTts(
  kunci: string,
): Promise<ItemCacheAudioTts | null> {
  const dariMemori = memori.get(kunci);
  if (dariMemori) return dariMemori;
  const db = await bukaDb();
  if (!db) return null;
  return new Promise((selesai) => {
    try {
      const tx = db.transaction(NAMA_TOKO, "readonly");
      const permintaan = tx.objectStore(NAMA_TOKO).get(kunci);
      permintaan.onerror = () => {
        db.close();
        selesai(null);
      };
      permintaan.onsuccess = () => {
        db.close();
        const nilai = permintaan.result as ItemCacheAudioTts | undefined;
        if (!nilai?.audioBase64) {
          selesai(null);
          return;
        }
        memori.set(kunci, nilai);
        selesai(nilai);
      };
    } catch {
      db.close();
      selesai(null);
    }
  });
}

export async function simpanCacheAudioTts(
  kunci: string,
  item: ItemCacheAudioTts,
): Promise<void> {
  if (!kunci || !item.audioBase64) return;
  if (item.audioBase64.length > BATAS_BYTE_SIMPAN) return;
  memori.set(kunci, item);
  const db = await bukaDb();
  if (!db) return;
  await new Promise<void>((selesai) => {
    try {
      const tx = db.transaction(NAMA_TOKO, "readwrite");
      tx.oncomplete = () => {
        db.close();
        selesai();
      };
      tx.onerror = () => {
        db.close();
        selesai();
      };
      tx.objectStore(NAMA_TOKO).put(item, kunci);
    } catch {
      db.close();
      selesai();
    }
  });
}

export function blobDariCacheAudio(item: ItemCacheAudioTts): Blob {
  const biner = Uint8Array.from(atob(item.audioBase64), (huruf) =>
    huruf.charCodeAt(0),
  );
  return new Blob([biner], { type: item.mime || "audio/wav" });
}
