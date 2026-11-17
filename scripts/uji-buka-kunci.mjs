// Uji mode periksa pemilik (src/lib/buka-semua-kunci.ts): kunci tahap dibuka hanya untuk dev/localhost dan admin yang masuk,
// tidak untuk siswa di situs produksi; dan semua kunci tahap/Praktikum memakai satu aturan yang sama.
// Jalankan: node --no-warnings scripts/uji-buka-kunci.mjs
import { readFileSync } from "node:fs";
import { bukaSemuaKunciDari } from "../src/lib/buka-semua-kunci.ts";

let lulus = 0;
let gagal = 0;
const cek = (ok, pesan) => {
  if (ok) lulus += 1;
  else {
    gagal += 1;
    console.log("GAGAL:", pesan);
  }
};
const A = (dev, host, admin) => bukaSemuaKunciDari({ dev, host, admin });

cek(!A(false, "igiligil.xyz", false), "siswa di situs produksi: kunci tetap aktif");
cek(!A(false, "tutoraiigil.vercel.app", false), "siswa di domain Vercel: kunci tetap aktif");
cek(A(false, "igiligil.xyz", true), "admin yang masuk di situs produksi: semua kunci terbuka");
cek(A(true, "igiligil.xyz", false), "server pengembangan: terbuka");
for (const h of ["localhost", "127.0.0.1", "[::1]"]) cek(A(false, h, false), `dibuka dari ${h}: terbuka`);
cek(!A(false, "localhost.evil.com", false) && !A(false, "evil-localhost", false), "nama host yang hanya mirip localhost tidak membuka kunci");

const baca = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const h = baca("src/lib/buka-semua-kunci.ts");
cek(/adalahAdmin === true/.test(h) && /\/api\/auth\/saya/.test(h), "peran admin dibaca dari server (/api/auth/saya), bukan dari penyimpanan perangkat");
cek(/catch\(\(\) => \{\s*admin = false;/.test(h), "gagal membaca peran: kunci tetap aktif (aman)");
cek(/sudahMinta/.test(h) && /pendengar/.test(h), "peran dibaca sekali per muat halaman dan dibagi ke semua pemakai hook");
const player = baca("src/components/IgilModulePlayer.tsx");
cek(/useBukaSemuaKunci\(\)/.test(player) && /periksaBebas \? 99 : unlockedSmicpaStage/.test(player), "pemutar modul: semua tahap terbuka di mode periksa");
cek(/materiSelesai = periksaBebas/.test(player), "pemutar modul: tab Latihan dan Ujian terbuka di mode periksa");
const popup = baca("src/components/modul/popup-tahap-smicpa.tsx");
cek(/useBukaSemuaKunci\(\)/.test(popup) && !/hostname === "localhost"/.test(popup), "kartu tahap memakai aturan bersama (bukan cek localhost sendiri)");
const prak = baca("src/components/praktikum/PraktikumBlok.tsx");
cek(/bukaSemua \|\| jumlahLulus === blok\.chapters\.length/.test(prak), "Praktikum blok terbuka di mode periksa");
const sim = baca("src/components/modul/simulasi-alur.tsx");
cek(/useBukaSemuaKunci/.test(sim), "Simulasi memakai aturan yang sama");
cek(!/\r/.test(h), "buka-semua-kunci.ts: akhir baris LF");

console.log(`Lulus ${lulus}, gagal ${gagal}`);
process.exit(gagal ? 1 : 0);
