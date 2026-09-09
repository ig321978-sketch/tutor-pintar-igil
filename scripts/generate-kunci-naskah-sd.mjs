import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const akar = resolve(fileURLToPath(new URL("..", import.meta.url)));
const berkasProgres = resolve(akar, "scripts", "naskah-sd-progress.json");
const dasar = process.env.NASKAH_BASE || "http://localhost:3000";
const paralel = Math.max(1, Number(process.env.NASKAH_PARALEL || 2));

function bacaProgres() {
  if (!existsSync(berkasProgres)) {
    return { selesai: {}, gagal: {}, mulai: new Date().toISOString() };
  }
  try {
    return JSON.parse(readFileSync(berkasProgres, "utf8"));
  } catch {
    return { selesai: {}, gagal: {}, mulai: new Date().toISOString() };
  }
}

function tulisProgres(data) {
  writeFileSync(berkasProgres, `${JSON.stringify(data, null, 2)}\n`);
}

function idBab(item) {
  return `${item.kelas}|${item.mapel}|${item.materi}`;
}

async function jsonFetch(url, opsi = {}) {
  const respons = await fetch(url, {
    ...opsi,
    headers: {
      "Content-Type": "application/json",
      ...(opsi.headers || {}),
    },
  });
  const data = await respons.json().catch(() => ({}));
  return { ok: respons.ok, status: respons.status, data };
}

async function jalankanAntrean(daftar, pekerja) {
  let indeks = 0;
  async function kerja() {
    while (indeks < daftar.length) {
      const sekarang = indeks;
      indeks += 1;
      await pekerja(daftar[sekarang], sekarang);
    }
  }
  await Promise.all(Array.from({ length: Math.min(paralel, daftar.length) }, kerja));
}

async function main() {
  const daftarRes = await jsonFetch(`${dasar}/api/admin/naskah-sd`);
  if (!daftarRes.ok) {
    console.error("Gagal membaca daftar bab:", daftarRes.status, daftarRes.data);
    process.exit(1);
  }
  const semua = daftarRes.data.daftar || [];
  const progres = bacaProgres();
  const sisa = semua.filter((item) => {
    const id = idBab(item);
    const selesai = progres.selesai[id];
    return !selesai || selesai.status === "gagal";
  });

  console.log(
    `Naskah SD: ${semua.length} bab, sisa ${sisa.length}, paralel ${paralel}, base ${dasar}`,
  );

  await jalankanAntrean(sisa, async (item, indeks) => {
    const id = idBab(item);
    const nomor = indeks + 1;
    process.stdout.write(`[${nomor}/${sisa.length}] ${id} ... `);
    try {
      const hasil = await jsonFetch(`${dasar}/api/admin/naskah-sd`, {
        method: "POST",
        body: JSON.stringify({ ...item, nama: "Siswa" }),
        signal: AbortSignal.timeout(280_000),
      });
      const data = hasil.data?.data || { status: "gagal", pesan: hasil.data?.pesan };
      if (!hasil.ok || data.status === "gagal") {
        progres.gagal[id] = {
          ...item,
          pesan: data.pesan || `HTTP ${hasil.status}`,
          waktu: new Date().toISOString(),
        };
        delete progres.selesai[id];
        tulisProgres(progres);
        console.log("GAGAL", data.pesan || hasil.status);
        return;
      }
      progres.selesai[id] = {
        status: data.status,
        waktu: new Date().toISOString(),
      };
      delete progres.gagal[id];
      tulisProgres(progres);
      console.log(data.status);
    } catch (error) {
      progres.gagal[id] = {
        ...item,
        pesan: error instanceof Error ? error.message : String(error),
        waktu: new Date().toISOString(),
      };
      tulisProgres(progres);
      console.log("GAGAL", error instanceof Error ? error.message : error);
    }
  });

  const gagal = Object.keys(progres.gagal).length;
  const selesai = Object.keys(progres.selesai).length;
  console.log(`Selesai. Terkunci/siap: ${selesai}. Gagal: ${gagal}.`);
  if (gagal) process.exit(2);
}

main();
