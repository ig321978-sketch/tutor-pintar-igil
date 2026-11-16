// Memuat sumber/kutipan.json (di luar git) ke globalThis.__kutipanLokal sebelum modul Story dimuat.
// Dipakai sebagai impor pertama skrip uji Story Kelas 4 sampai 6. Bila berkas tidak ada, pemeriksaan kutipan dilewati.
import fs from "node:fs";
const jalur = new URL("../sumber/kutipan.json", import.meta.url);
if (fs.existsSync(jalur)) {
  globalThis.__kutipanLokal = JSON.parse(fs.readFileSync(jalur, "utf8"));
  globalThis.__KUTIPAN_LOKAL_ADA = true;
} else {
  globalThis.__KUTIPAN_LOKAL_ADA = false;
  console.log("sumber/kutipan.json tidak ada: pemeriksaan kutipan buku dilewati");
}
