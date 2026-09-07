import type { KelaminGuru } from "@/lib/guru";

type HasilAudioTts = {
  url: string;
  durasi: number;
  mime: string;
};

let elemenPendek: HTMLAudioElement | null = null;
let urlPendek: string | null = null;

export async function mintaAudioTts(
  teks: string,
  kelamin: KelaminGuru,
  kelas = "3 SD",
): Promise<HasilAudioTts | null> {
  const naskah = teks.replace(/\s+/g, " ").trim();
  if (!naskah) return null;
  try {
    const respons = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(90_000),
      body: JSON.stringify({
        teks: naskah,
        kelamin: kelamin === "pria" ? "male" : "female",
        kelas,
      }),
    });
    const data = (await respons.json()) as {
      berhasil?: boolean;
      mime?: string;
      audioBase64?: string;
      durasiDetik?: number;
    };
    if (!data.berhasil || !data.audioBase64) return null;
    const biner = Uint8Array.from(atob(data.audioBase64), (huruf) =>
      huruf.charCodeAt(0),
    );
    return {
      url: URL.createObjectURL(
        new Blob([biner], { type: data.mime || "audio/wav" }),
      ),
      durasi:
        typeof data.durasiDetik === "number" && data.durasiDetik > 0
          ? data.durasiDetik
          : 1,
      mime: data.mime || "audio/wav",
    };
  } catch {
    return null;
  }
}

export async function putarTtsPendek(
  teks: string,
  kelamin: KelaminGuru,
  kelas = "3 SD",
): Promise<boolean> {
  const hasil = await mintaAudioTts(teks, kelamin, kelas);
  if (!hasil) return false;
  if (urlPendek) URL.revokeObjectURL(urlPendek);
  urlPendek = hasil.url;
  if (!elemenPendek) {
    elemenPendek = new Audio();
    elemenPendek.preload = "auto";
  }
  elemenPendek.src = hasil.url;
  try {
    await elemenPendek.play();
    return true;
  } catch {
    return false;
  }
}
